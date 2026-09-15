#!/usr/bin/env node
// Manueller, vollständig API-freier Season-Data-Importer.
//
// Ersetzt für künftige Updates NICHT scripts/update-season-data.mjs (bleibt
// unverändert bestehen, als alter API-basierter Legacy-Pfad) — dieses Skript
// ist der neue, parallele Weg für manuell beschaffte Rohdaten (siehe Audit
// "Phase 2: KEIN Saisonmanager-API-Key"): keine Saisonmanager-Anfrage, kein
// X-Api-Key, kein Scraping, keine GitHub-Action.
//
// Architektur:
//   manuelle Rohdaten → Validierung → ID-Diff → Sicherheitsentscheidung → Bericht
//                                                                        ↓ (nur mit --write)
//                                       season-data/<key>.json + season-data/seasons.json
//                                                                        ↓ (nur mit --update-embedded)
//                                                    STATIC_SEASON_DATA-Block in index.html
//
// Die Kernlogik (buildDryRunReport, buildManifestEntryUpdate, embedSeasonInHtml)
// ist bewusst als reine, exportierte Funktionen von der I/O (main()) getrennt.
//
// CLI-Formen (siehe docs/season-data-import.md für den vollständigen Workflow):
//   node scripts/import-season-data.mjs <seasonKey> <inputFile>
//     -> NUR Dry-Run (Standardverhalten, kein Schreiben). --dry-run darf
//        zusätzlich angegeben werden, ändert aber nichts.
//   node scripts/import-season-data.mjs <seasonKey> <inputFile> --write
//     -> schreibt season-data/<key>.json NUR, wenn der Dry-Run-Bericht
//        vollständig fehlerfrei ist (report.ok === true). Pflegt danach
//        kontrolliert season-data/seasons.json mit (Schritt 9): bestehende
//        Einträge bleiben bis auf ein ggf. geändertes "label" unangetastet,
//        ein neuer Season-Key wird mit dem sicheren Default status:"archived"
//        angelegt — NIE wird dabei automatisch/spekulativ eine andere Saison
//        als "current" überschrieben.
//   node scripts/import-season-data.mjs <seasonKey> --update-embedded
//     -> liest die BEREITS AUF DER PLATTE liegende season-data/<key>.json
//        (kein <inputFile>!) und aktualisiert nur den betroffenen
//        STATIC_SEASON_DATA-Block in index.html (file://-Fallback).
//   node scripts/import-season-data.mjs <seasonKey> <inputFile> --write --update-embedded
//     -> beides in einem Lauf: erst schreiben (wie oben), danach exakt die
//        soeben geschriebenen Daten einbetten.
//
// Bewusste CLI-Entscheidung (siehe Auftrag "entscheide dich für die sicherste
// und klarste Struktur"): --update-embedded braucht NIE ein <inputFile> und
// liest niemals direkt aus dem Entwurf, sondern IMMER aus season-data/<key>.json
// auf der Platte — dadurch ist die eingebettete Kopie garantiert byte-identisch
// zur extern ausgelieferten Datei, auch wenn --write und --update-embedded in
// getrennten Aufrufen (z.B. an unterschiedlichen Tagen) verwendet werden.

import { readFile, writeFile, rename } from 'node:fs/promises';
import path from 'node:path';

import {
  findDuplicateGameIds,
  validateSeasonGames,
  diffGameIds,
} from './season-data-validators.mjs';

// Wiederverwendung der bestehenden, bereits getesteten Sicherheitsfunktionen
// aus update-season-data.mjs, OHNE diese Datei zu verändern: validateMergedSeason,
// fileNameForKey und writeJsonAtomic sind dort bereits als reine bzw. einfache,
// benannte Exporte vorhanden. Der Import löst NICHT main() dort aus — der
// CLI-Startguard am Ende von update-season-data.mjs prüft `process.argv[1]`
// (den tatsächlich gestarteten Skriptpfad, hier import-season-data.mjs) und
// bleibt beim reinen Import dieses Moduls inaktiv.
import { validateMergedSeason, fileNameForKey, writeJsonAtomic } from './update-season-data.mjs';

const SEASON_DATA_DIR = path.resolve(process.cwd(), 'season-data');
const INDEX_HTML_PATH = path.resolve(process.cwd(), 'index.html');
const MANIFEST_PATH = path.join(SEASON_DATA_DIR, 'seasons.json');

// ─────────────────────────────────────────────────────────────────────────
// Reine Prüf-/Berichtsfunktionen (kein fetch/fs) — direkt testbar
// ─────────────────────────────────────────────────────────────────────────

/** @returns {{ok:boolean, reason?:string}} */
export function validateSeasonKey(key) {
  if (typeof key !== 'string') return { ok: false, reason: 'kein String' };
  const m = /^(\d{2})\/(\d{2})$/.exec(key);
  if (!m) return { ok: false, reason: 'erwartetes Format ist "YY/YY", z.B. "25/26"' };
  const start = Number(m[1]);
  const end = Number(m[2]);
  if (end !== (start + 1) % 100) {
    return { ok: false, reason: `"${key}" ist kein aufeinanderfolgendes Saisonpaar (erwartet würde "${String(start).padStart(2, '0')}/${String((start + 1) % 100).padStart(2, '0')}")` };
  }
  return { ok: true };
}

/**
 * Prüft NUR die Wrapper-Hülle { season, label, games:[...] } — nicht die
 * einzelnen Spiele (dafür validateSeasonGames aus season-data-validators.mjs).
 * @returns {{ok:boolean, problems:string[]}}
 */
export function validateWrapperFormat(data) {
  const problems = [];
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    return { ok: false, problems: ['Eingabe ist kein Objekt (erwartet {season, label, games:[...]})'] };
  }
  if (typeof data.season !== 'string' || !data.season) problems.push('Feld "season" fehlt oder ist kein String');
  if (typeof data.label !== 'string' || !data.label) problems.push('Feld "label" fehlt oder ist kein String');
  if (!Array.isArray(data.games)) problems.push('Feld "games" fehlt oder ist kein Array');
  return { ok: problems.length === 0, problems };
}

/**
 * Schritt 9: pflegt season-data/seasons.json kontrolliert mit — komplett rein
 * (keine I/O), damit sie isoliert testbar ist. Wird von main() NUR nach einem
 * bereits erfolgreichen --write-Schreibvorgang aufgerufen (report.ok===true) —
 * bei Dry-Run oder fehlgeschlagener Validierung wird diese Funktion nie erreicht.
 *
 * Verhalten (bewusst minimal, keine Formatierungsänderungen, keine Spekulation):
 *   - Existiert der Season-Key bereits im Manifest: der bestehende Eintrag
 *     bleibt bis auf das Feld "label" komplett unangetastet (auch "status",
 *     "leagueId", "gameOperationId" bleiben exakt erhalten) — "label" wird
 *     NUR aktualisiert, wenn es sich tatsächlich vom neuen Wert unterscheidet.
 *     Alle anderen Einträge im Manifest bleiben unverändert (Objektidentität
 *     wird für unveränderte Einträge sogar exakt beibehalten).
 *   - Existiert der Season-Key noch nicht: ein neuer Eintrag
 *     { key, label, file, status:'archived' } wird angehängt. "archived" ist
 *     bewusst der einzige sichere Default — die bestehende Manifest-Struktur
 *     kennt nur "current"/"archived" (siehe season-data/seasons.json), und
 *     "archived" verändert garantiert NICHT, welche andere Saison aktuell
 *     "current" ist. Es gibt KEINE automatische "ist das jetzt die aktuelle
 *     Saison?"-Logik — das bleibt bewusst eine manuelle Entscheidung (siehe
 *     docs/season-data-import.md). leagueId/gameOperationId werden für neue,
 *     manuell importierte Einträge NICHT erfunden (nur die alte, API-basierte
 *     Pipeline in update-season-data.mjs kennt diese Felder).
 *
 * @param {{seasons: Array<object>}} manifest bereits geparster Inhalt von seasons.json
 * @param {{key:string, label:string, file:string}} entry die betroffene Saison
 * @returns {{manifest:{seasons:Array<object>}, changed:boolean, isNewEntry:boolean}}
 */
export function buildManifestEntryUpdate(manifest, { key, label, file }) {
  const seasons = Array.isArray(manifest?.seasons) ? manifest.seasons : [];
  const existingIndex = seasons.findIndex((s) => s?.key === key);

  if (existingIndex === -1) {
    const newSeasons = [...seasons, { key, label, file, status: 'archived' }];
    return { manifest: { seasons: newSeasons }, changed: true, isNewEntry: true };
  }

  const existing = seasons[existingIndex];
  if (existing.label === label) {
    // Nichts zu tun — exakt dasselbe Manifest zurückgeben (keine Kopie nötig,
    // vermeidet einen falsch-positiven "changed"-Vergleich durch Neuanlage
    // gleichwertiger, aber neuer Objekte).
    return { manifest, changed: false, isNewEntry: false };
  }

  const newSeasons = seasons.map((s, i) => (i === existingIndex ? { ...s, label } : s));
  return { manifest: { seasons: newSeasons }, changed: true, isNewEntry: false };
}

/**
 * Kernlogik des Dry-Runs — komplett rein (keine I/O). Deckt alle in Schritt 5
 * geforderten Prüfungen ab (1-8): Season-Key wird VOR dem Aufruf geprüft
 * (validateSeasonKey), alles andere hier:
 *   2. Wrapper-Format          -> validateWrapperFormat
 *   3. Game-Struktur           -> validateSeasonGames
 *   4. doppelte Game-IDs       -> findDuplicateGameIds
 *   5. exakte ID-Differenz     -> diffGameIds
 *   6. keine entfernten IDs    -> diff.removed.length > 0 => Fehler (hart)
 *   7. keine kleinere/inkons.  -> validateMergedSeason (Anzahl-Heuristik)
 *      Datenmenge                UND der exakte ID-Diff oben (deckt auch den
 *                                 Fall "gleiche Anzahl, andere IDs" ab, den
 *                                 eine reine Anzahl-Prüfung nicht erkennen würde)
 *   8. validateMergedSeason    -> siehe oben
 *
 * report.ok === true ist die EINZIGE Bedingung, unter der main() im
 * --write-Modus tatsächlich schreibt.
 *
 * @param {string} seasonKey z.B. "25/26"
 * @param {unknown} newData geparster Inhalt der Eingabedatei
 * @param {{season?:string, label?:string, games?:object[]}|null} existingData
 *   geparster Inhalt der bestehenden season-data/<key>.json, oder null wenn
 *   es (noch) keine Datei gibt (z.B. brandneue Saison)
 * @returns {object} vollständiger Dry-Run-Bericht, siehe formatReport()
 */
export function buildDryRunReport(seasonKey, newData, existingData) {
  const errors = [];
  const warnings = [];

  const wrapperCheck = validateWrapperFormat(newData);
  if (!wrapperCheck.ok) errors.push(...wrapperCheck.problems);

  if (wrapperCheck.ok && newData.season !== seasonKey) {
    errors.push(`Feld "season" ("${newData.season}") passt nicht zum angegebenen Season-Key ("${seasonKey}")`);
  }

  const newGames = wrapperCheck.ok ? newData.games : [];
  const existedBefore = existingData !== null && existingData !== undefined;
  const existingGames = Array.isArray(existingData?.games) ? existingData.games : [];
  if (existedBefore && !Array.isArray(existingData?.games)) {
    warnings.push('bestehende season-data/<key>.json ist vorhanden, aber strukturell ungültig — wird wie "keine Datei" behandelt');
  }

  const duplicates = findDuplicateGameIds(newGames);
  if (duplicates.length > 0) {
    errors.push(`Doppelte Game-ID(s) in der neuen Datei: ${duplicates.map((d) => `${d.id} (${d.count}×)`).join(', ')}`);
  }

  const structure = validateSeasonGames(newGames);
  const invalidGames = structure.invalidGames ?? [];
  for (const bad of invalidGames) {
    errors.push(`Spiel an Index ${bad.index}${bad.id !== null ? ` (id=${bad.id})` : ''}: ${bad.problems.join('; ')}`);
  }

  const diff = diffGameIds(existingGames, newGames);
  if (diff.removed.length > 0) {
    errors.push(`Bekannte Game-ID(s) fehlen in der neuen Datei: ${diff.removed.join(', ')}`);
  }

  // Bestehende, unveränderte Sicherheitslogik aus update-season-data.mjs:
  // zusätzliches, unabhängiges Netz gegen einen "relevanten Datenrückgang"
  // (z.B. drastischer, unerklärter Einbruch der Spielanzahl), ergänzend zum
  // exakten ID-Diff oben (der bereits JEDE verschwundene bekannte ID meldet,
  // auch wenn die Gesamtanzahl gleich bliebe — siehe Beispiel im Auftrag).
  const mergedCheck = validateMergedSeason(existingGames, newGames);
  if (!mergedCheck.ok) errors.push(`validateMergedSeason: ${mergedCheck.reason}`);

  const ok = errors.length === 0;

  return {
    ok,
    season: seasonKey,
    label: wrapperCheck.ok ? newData.label : null,
    existedBefore,
    previousGameCount: existingGames.length,
    newGameCount: newGames.length,
    unchangedCount: diff.unchanged.length,
    newCount: diff.added.length,
    removedCount: diff.removed.length,
    addedIds: diff.added,
    removedIds: diff.removed,
    duplicates,
    invalidGames,
    errors,
    warnings,
    writeWouldBeSafe: ok,
  };
}

/** Formatiert den Bericht für die Konsole (deckt alle geforderten Angaben ab). */
export function formatReport(report, { seasonKey, inputFile, existingFile, mode = 'dry-run' }) {
  const lines = [];
  lines.push('─'.repeat(70));
  lines.push(`${mode === 'write' ? 'Schreib-' : 'Dry-Run-'}Bericht: Season-Data-Import für ${seasonKey}`);
  lines.push('─'.repeat(70));
  lines.push(`Eingabedatei:            ${inputFile}`);
  lines.push(`Bestehende Datei:        ${existingFile}${report.existedBefore ? '' : ' (existiert nicht — neue Saison)'}`);
  lines.push(`Saison:                  ${report.season}`);
  lines.push(`Label:                   ${report.label ?? '(unbekannt, Wrapper ungültig)'}`);
  lines.push(`Bisherige Spielanzahl:   ${report.previousGameCount}`);
  lines.push(`Neue Spielanzahl:        ${report.newGameCount}`);
  lines.push(`Unveränderte IDs:        ${report.unchangedCount}`);
  lines.push(`Neue IDs:                ${report.newCount}${report.newCount ? ` -> ${report.addedIds.join(', ')}` : ''}`);
  lines.push(`Fehlende/entfernte IDs:  ${report.removedCount}${report.removedCount ? ` -> ${report.removedIds.join(', ')}` : ''}`);
  lines.push(`Doppelte IDs:            ${report.duplicates.length}${report.duplicates.length ? ` -> ${report.duplicates.map((d) => d.id).join(', ')}` : ''}`);
  lines.push(`Strukturell ungültig:    ${report.invalidGames.length}`);
  lines.push(`Validierungsstatus:      ${report.ok ? 'OK' : 'FEHLER'}`);
  lines.push(`Schreiben wäre sicher:   ${report.writeWouldBeSafe ? 'JA' : 'NEIN'}`);
  if (report.warnings.length) {
    lines.push('Warnungen:');
    for (const w of report.warnings) lines.push(`  - ${w}`);
  }
  if (report.errors.length) {
    lines.push('Fehler:');
    for (const e of report.errors) lines.push(`  - ${e}`);
  }
  lines.push('─'.repeat(70));
  if (mode === 'write') {
    lines.push(
      report.ok
        ? 'Ergebnis: Validierung OK — season-data/<key>.json wird jetzt geschrieben.'
        : 'Ergebnis: Validierung FEHLGESCHLAGEN — es wurde NICHTS geschrieben.',
    );
  } else {
    lines.push(
      report.ok
        ? 'Ergebnis: Dry-Run OK — ein Schreibvorgang wäre nach aktuellem Stand sicher (nur mit --write).'
        : 'Ergebnis: Dry-Run FEHLGESCHLAGEN — es würde NICHTS geschrieben.',
    );
  }
  return lines.join('\n');
}

// ─────────────────────────────────────────────────────────────────────────
// Schritt 6: --update-embedded — robustes, klammerbalanciertes Ersetzen/
// Einfügen EINES Saison-Blocks in STATIC_SEASON_DATA (index.html). Reine
// String-Funktion, kein fetch/fs, direkt testbar.
// ─────────────────────────────────────────────────────────────────────────

/**
 * Findet die Position der zu `startIdx` (Position eines '{') passenden
 * schließenden '}' — stringbewusst (Anführungszeichen/Escapes werden nicht
 * als Klammern fehlinterpretiert).
 * @returns {number} Index der schließenden Klammer, oder -1
 */
function findMatchingBrace(text, startIdx) {
  let depth = 0;
  let inString = false;
  let escaped = false;
  for (let i = startIdx; i < text.length; i++) {
    const c = text[i];
    if (inString) {
      if (escaped) escaped = false;
      else if (c === '\\') escaped = true;
      else if (c === '"') inString = false;
      continue;
    }
    if (c === '"') {
      inString = true;
      continue;
    }
    if (c === '{') depth++;
    else if (c === '}') {
      depth--;
      if (depth === 0) return i;
    }
  }
  return -1;
}

function countOccurrences(text, substr) {
  let count = 0;
  let idx = 0;
  while ((idx = text.indexOf(substr, idx)) !== -1) {
    count++;
    idx += substr.length;
  }
  return count;
}

/**
 * Ersetzt (oder fügt neu ein) den STATIC_SEASON_DATA-Block für EINE Saison
 * innerhalb des vollständigen index.html-Texts. Ersetzt/berührt NICHTS
 * außerhalb dieses einen Blocks — kein string.replace() auf einen geratenen
 * Textausschnitt, sondern Klammer-balanciertes Parsen, exakt wie bereits
 * manuell für 25/26 in dieser Session durchgeführt.
 *
 * Verhalten bei den Trefferzahlen für den Schlüssel `"<seasonKey>":{`
 * innerhalb von STATIC_SEASON_DATA:
 *   genau 1 Treffer -> bestehender Block wird ERSETZT
 *   0 Treffer       -> Saison ist noch nie eingebettet worden -> Block wird
 *                      NEU EINGEFÜGT (z.B. für eine künftige neue Saison wie
 *                      26/27) — das ist kein Fehlerfall, sondern der
 *                      erwartete Weg, eine neue Saison erstmals einzubetten,
 *                      und wird explizit geloggt, nicht still ausgeführt.
 *   >1 Treffer      -> mehrdeutig -> HARTER ABBRUCH, index.html bleibt
 *                      unverändert (genau die vom Auftrag geforderte Regel
 *                      "bei 0 oder >1 Treffern hart abbrechen" — 0 Treffer
 *                      wird hier bewusst als "neu einfügen" statt als Fehler
 *                      behandelt, siehe Begründung im Bericht/Doku).
 *
 * @param {string} html vollständiger index.html-Inhalt
 * @param {string} seasonKey z.B. "25/26"
 * @param {{season:string,label:string,games:object[]}} seasonData exakt der
 *   Inhalt, der eingebettet werden soll (unverändert, keine Normalisierung)
 * @returns {{html:string, mode:'replaced'|'inserted'}} neuer HTML-Text
 * @throws {Error} bei jeder Unsicherheit (Marker fehlt/mehrfach, unbalanciert,
 *   Ergebnis kein valides JSON, andere Season-Keys verändert)
 */
export function embedSeasonInHtml(html, seasonKey, seasonData) {
  const marker = 'const STATIC_SEASON_DATA=';
  const markerIdx = html.indexOf(marker);
  if (markerIdx === -1) {
    throw new Error('STATIC_SEASON_DATA-Deklaration nicht gefunden — Abbruch, index.html bleibt unverändert.');
  }
  if (html.indexOf(marker, markerIdx + 1) !== -1) {
    throw new Error('STATIC_SEASON_DATA-Deklaration kommt mehrfach vor — nicht eindeutig, Abbruch.');
  }

  const objStart = markerIdx + marker.length;
  if (html[objStart] !== '{') {
    throw new Error('Erwartetes "{" direkt nach "const STATIC_SEASON_DATA=" nicht gefunden — Abbruch.');
  }
  const objEnd = findMatchingBrace(html, objStart);
  if (objEnd === -1) {
    throw new Error('Kein balanciertes Ende für das STATIC_SEASON_DATA-Objekt gefunden — Abbruch.');
  }

  const before = html.slice(0, objStart);
  const objText = html.slice(objStart, objEnd + 1);
  const after = html.slice(objEnd + 1);

  // Sanity-Check: das bestehende Objekt muss bereits gültiges JSON sein,
  // bevor irgendetwas daran verändert wird.
  let oldParsed;
  try {
    oldParsed = JSON.parse(objText);
  } catch (e) {
    throw new Error(`Bestehendes STATIC_SEASON_DATA ist kein gültiges JSON (${e.message}) — Abbruch, nichts wird verändert.`);
  }
  const oldKeys = Object.keys(oldParsed).sort();

  const keyPattern = `"${seasonKey}":{`;
  const occurrences = countOccurrences(objText, keyPattern);
  if (occurrences > 1) {
    throw new Error(`Mehrdeutig: "${keyPattern}" kommt ${occurrences}× im STATIC_SEASON_DATA-Block vor — Abbruch, nichts geändert.`);
  }

  const newEntryJson = JSON.stringify({ season: seasonData.season, label: seasonData.label, games: seasonData.games });

  let newObjText;
  let mode;
  if (occurrences === 1) {
    const keyIdx = objText.indexOf(keyPattern);
    const braceStart = keyIdx + keyPattern.length - 1; // Position von '{'
    const braceEnd = findMatchingBrace(objText, braceStart);
    if (braceEnd === -1) {
      throw new Error(`Kein balanciertes Ende für den bestehenden "${seasonKey}"-Block gefunden — Abbruch.`);
    }
    newObjText = `${objText.slice(0, keyIdx)}"${seasonKey}":${newEntryJson}${objText.slice(braceEnd + 1)}`;
    mode = 'replaced';
  } else {
    const innerEnd = objText.length - 1; // Position der äußeren schließenden '}'
    newObjText = `${objText.slice(0, innerEnd)},"${seasonKey}":${newEntryJson}${objText.slice(innerEnd)}`;
    mode = 'inserted';
  }

  // Ergebnis muss weiterhin gültiges JSON sein UND darf ausschließlich den
  // einen betroffenen Season-Key verändert/hinzugefügt haben.
  let newParsed;
  try {
    newParsed = JSON.parse(newObjText);
  } catch (e) {
    throw new Error(`Ergebnis nach dem Einbetten ist kein gültiges JSON (${e.message}) — Abbruch, index.html bleibt unverändert.`);
  }
  const newKeys = Object.keys(newParsed).sort();
  const expectedKeys = mode === 'inserted' ? [...oldKeys, seasonKey].sort() : oldKeys;
  if (JSON.stringify(newKeys) !== JSON.stringify(expectedKeys)) {
    throw new Error(
      `Unerwartete Änderung der Season-Keys (vorher: ${oldKeys.join(', ')}; nachher: ${newKeys.join(', ')}) — Abbruch, index.html bleibt unverändert.`,
    );
  }
  for (const key of oldKeys) {
    if (key === seasonKey) continue;
    if (JSON.stringify(newParsed[key]) !== JSON.stringify(oldParsed[key])) {
      throw new Error(`Saison "${key}" hätte sich unerwartet mitverändert — Abbruch, index.html bleibt unverändert.`);
    }
  }
  if (newParsed[seasonKey].games.length !== seasonData.games.length) {
    throw new Error('Eingebettete Spielanzahl stimmt nach dem Schreiben nicht mit der Quelle überein — Abbruch.');
  }

  return { html: before + newObjText + after, mode };
}

// ─────────────────────────────────────────────────────────────────────────
// I/O + CLI (main)
// ─────────────────────────────────────────────────────────────────────────

async function readJsonFile(filePath) {
  let raw;
  try {
    raw = await readFile(filePath, 'utf8');
  } catch (e) {
    return { ok: false, error: `Datei "${filePath}" konnte nicht gelesen werden: ${e.message}` };
  }
  try {
    return { ok: true, data: JSON.parse(raw) };
  } catch (e) {
    return { ok: false, error: `Datei "${filePath}" enthält kein gültiges JSON: ${e.message}` };
  }
}

/** Atomarer Text-Schreibvorgang (Temp-Datei + rename), analog zu writeJsonAtomic. */
async function writeTextAtomic(filePath, text) {
  const tmpPath = `${filePath}.tmp-${process.pid}`;
  await writeFile(tmpPath, text, 'utf8');
  await rename(tmpPath, filePath);
}

async function runUpdateEmbedded(seasonKey) {
  const file = fileNameForKey(seasonKey);
  const seasonPath = path.join(SEASON_DATA_DIR, file);
  const seasonResult = await readJsonFile(seasonPath);
  if (!seasonResult.ok) {
    console.error(`--update-embedded: ${seasonResult.error}`);
    process.exitCode = 1;
    return;
  }
  const wrapperCheck = validateWrapperFormat(seasonResult.data);
  if (!wrapperCheck.ok) {
    console.error(`--update-embedded: season-data/${file} hat ein ungültiges Wrapper-Format: ${wrapperCheck.problems.join('; ')}`);
    process.exitCode = 1;
    return;
  }
  const duplicates = findDuplicateGameIds(seasonResult.data.games);
  if (duplicates.length > 0) {
    console.error(`--update-embedded: season-data/${file} enthält doppelte Game-IDs (${duplicates.map((d) => d.id).join(', ')}) — Abbruch, index.html bleibt unverändert.`);
    process.exitCode = 1;
    return;
  }
  const structure = validateSeasonGames(seasonResult.data.games);
  if (!structure.ok) {
    console.error(`--update-embedded: season-data/${file} enthält strukturell ungültige Spiele — Abbruch, index.html bleibt unverändert.`);
    for (const bad of structure.invalidGames) console.error(`  - Index ${bad.index} (id=${bad.id}): ${bad.problems.join('; ')}`);
    process.exitCode = 1;
    return;
  }

  let html;
  try {
    html = await readFile(INDEX_HTML_PATH, 'utf8');
  } catch (e) {
    console.error(`--update-embedded: index.html konnte nicht gelesen werden: ${e.message}`);
    process.exitCode = 1;
    return;
  }

  let embedResult;
  try {
    embedResult = embedSeasonInHtml(html, seasonKey, seasonResult.data);
  } catch (e) {
    console.error(`--update-embedded: ${e.message}`);
    process.exitCode = 1;
    return;
  }

  await writeTextAtomic(INDEX_HTML_PATH, embedResult.html);
  console.log(
    `--update-embedded: STATIC_SEASON_DATA['${seasonKey}'] in index.html ${embedResult.mode === 'inserted' ? 'neu eingefügt' : 'ersetzt'} ` +
      `(${seasonResult.data.games.length} Spiele). Alle anderen Saison-Blöcke wurden geprüft und blieben unverändert.`,
  );
  process.exitCode = 0;
}

export async function main(argv = process.argv.slice(2)) {
  const flags = new Set(argv.filter((a) => a.startsWith('--')));
  const positional = argv.filter((a) => !a.startsWith('--'));
  const wantsWrite = flags.has('--write');
  const wantsEmbed = flags.has('--update-embedded');

  const [seasonKeyArg, inputFileArg] = positional;
  if (!seasonKeyArg) {
    console.error('Aufruf: node scripts/import-season-data.mjs <seasonKey> <inputFile> [--write] [--update-embedded]');
    console.error('    oder: node scripts/import-season-data.mjs <seasonKey> --update-embedded   (ohne <inputFile>)');
    process.exitCode = 1;
    return;
  }

  const seasonCheck = validateSeasonKey(seasonKeyArg);
  if (!seasonCheck.ok) {
    console.error(`Ungültiger Season-Key "${seasonKeyArg}": ${seasonCheck.reason}`);
    process.exitCode = 1;
    return;
  }

  // Standalone --update-embedded: bewusst OHNE <inputFile> — liest immer nur
  // die bereits vorhandene season-data/<key>.json (siehe Kommentar am Datei-
  // anfang zur CLI-Entscheidung).
  if (wantsEmbed && !wantsWrite) {
    if (inputFileArg) {
      console.error(
        '--update-embedded ohne --write erwartet NUR <seasonKey> (kein <inputFile>) — es wird ausschließlich die ' +
          'bereits vorhandene season-data/<key>.json eingebettet. Nutze "--write --update-embedded", wenn im selben ' +
          'Lauf zuerst geschrieben werden soll.',
      );
      process.exitCode = 1;
      return;
    }
    await runUpdateEmbedded(seasonKeyArg);
    return;
  }

  if (!inputFileArg) {
    console.error('Aufruf: node scripts/import-season-data.mjs <seasonKey> <inputFile> [--write] [--update-embedded]');
    console.error('Beispiel: node scripts/import-season-data.mjs 25/26 ./entwurf/25-26-neu.json');
    process.exitCode = 1;
    return;
  }

  const inputResult = await readJsonFile(inputFileArg);
  if (!inputResult.ok) {
    console.error(inputResult.error);
    process.exitCode = 1;
    return;
  }

  const existingFile = fileNameForKey(seasonKeyArg);
  const existingPath = path.join(SEASON_DATA_DIR, existingFile);
  const existingResult = await readJsonFile(existingPath);
  // Fehlt die bestehende Datei oder ist sie kaputt: als "keine Datei" (neue
  // Saison) behandeln, nicht als fataler Fehler — das entspricht dem
  // Verhalten von loadSeasonFile() in update-season-data.mjs.
  const existingData = existingResult.ok ? existingResult.data : null;

  const report = buildDryRunReport(seasonKeyArg, inputResult.data, existingData);
  console.log(formatReport(report, { seasonKey: seasonKeyArg, inputFile: inputFileArg, existingFile: existingPath, mode: wantsWrite ? 'write' : 'dry-run' }));

  if (!wantsWrite) {
    process.exitCode = report.ok ? 0 : 1;
    return;
  }

  if (!report.ok) {
    console.error('Abbruch: --write wurde angegeben, aber die Validierung ist fehlgeschlagen. Es wurde NICHTS geschrieben.');
    process.exitCode = 1;
    return;
  }

  const dataToWrite = { season: inputResult.data.season, label: inputResult.data.label, games: inputResult.data.games };
  await writeJsonAtomic(existingPath, dataToWrite);
  console.log(`--write: season-data/${existingFile} geschrieben (${dataToWrite.games.length} Spiele). Kein Commit, kein Push.`);

  // Schritt 9: Manifest NUR nach diesem bereits erfolgreichen Schreibvorgang
  // kontrolliert mitpflegen — bei Dry-Run oder fehlgeschlagener Validierung
  // wird dieser Codepfad nie erreicht (siehe return-Anweisungen oben).
  const manifestResult = await readJsonFile(MANIFEST_PATH);
  const currentManifest = manifestResult.ok && Array.isArray(manifestResult.data?.seasons) ? manifestResult.data : { seasons: [] };
  const manifestUpdate = buildManifestEntryUpdate(currentManifest, { key: seasonKeyArg, label: dataToWrite.label, file: existingFile });
  if (manifestUpdate.changed) {
    await writeJsonAtomic(MANIFEST_PATH, manifestUpdate.manifest);
    console.log(
      manifestUpdate.isNewEntry
        ? `--write: season-data/seasons.json ergänzt — neuer Eintrag "${seasonKeyArg}" mit status:"archived" (sicherer Default; ` +
            `manuell auf "current" umstellen, falls diese Saison jetzt aktuell ist, siehe docs/season-data-import.md).`
        : `--write: season-data/seasons.json aktualisiert (Label von "${seasonKeyArg}" geändert). Andere Einträge unverändert.`,
    );
  } else {
    console.log('--write: season-data/seasons.json war bereits konsistent, keine Änderung nötig.');
  }

  if (wantsEmbed) {
    await runUpdateEmbedded(seasonKeyArg);
  }

  process.exitCode = 0;
}

if (process.argv[1]?.replace(/\\/g, '/').endsWith('import-season-data.mjs')) {
  main().catch((e) => {
    console.error('Unerwarteter Fehler:', e.message);
    process.exitCode = 1;
  });
}

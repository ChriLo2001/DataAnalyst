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
//                                        window.STATIC_SEASON_DATA-Block in season-data-embedded.js
//
// Die Kernlogik (buildDryRunReport, buildManifestEntryUpdate, embedSeasonInEmbeddedFile)
// ist bewusst als reine, exportierte Funktionen von der I/O (main()) getrennt.
//
// Token-Diät Teil 2: season-data-embedded.js (klassisches Skript, setzt
// window.STATIC_SEASON_DATA) ersetzt den früher in index.html eingebetteten
// STATIC_SEASON_DATA-Block. --update-embedded schreibt seitdem AUSSCHLIESSLICH
// diese Datei — index.html bleibt von --update-embedded unberührt.
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
//        window.STATIC_SEASON_DATA-Block in season-data-embedded.js
//        (file://-Fallback; index.html bleibt unberührt). Zieht dabei IMMER
//        zusätzlich window.STATIC_CURRENT_SEASON_KEY aus season-data/seasons.json
//        nach (Aufgabe 13) — der einzige Weg, wie index.html die aktuelle
//        Saison auch unter file:// ohne fetch() kennt.
//   node scripts/import-season-data.mjs <seasonKey> <inputFile> --write --update-embedded
//     -> beides in einem Lauf: erst schreiben (wie oben), danach exakt die
//        soeben geschriebenen Daten einbetten.
//   node scripts/import-season-data.mjs <seasonKey> <teilDatei> --merge
//     -> Aufgabe 14 — NUR Dry-Run: <teilDatei> muss NICHT die komplette Saison
//        enthalten, sondern darf nur die Spiele EINES Spieltags (oder
//        beliebig weniger Spiele) tragen (gleicher Wrapper {season,label,
//        games:[...]}). Spiele mit bereits bekannter ID werden ERSETZT
//        (z.B. Postponed -> echter Endstand), neue IDs werden ANGEHÄNGT —
//        kein bestehendes Spiel verschwindet je. Siehe docs/season-data-import.md,
//        Abschnitt "Ein Spieltag ist gespielt" für den vollständigen Weg.
//   node scripts/import-season-data.mjs <seasonKey> <teilDatei> --merge --write --update-embedded
//     -> schreibt das Merge-Ergebnis (nur mit grünem Dry-Run) und bettet es
//        anschließend ein — der in der Praxis verwendete Befehl nach einem
//        Spieltag.
//   ... --merge --allow-downgrade [--write] [--update-embedded]
//     -> Aufgabe 14b: --merge bricht normalerweise ab, wenn ein ERSETZTES
//        Spiel (bekannte ID) inhaltlich ärmer würde als der bisherige Stand
//        (weniger Events, weniger gemeldete Spieler je Seite, oder ein
//        verschwindender Endstand) — Schutz gegen eine versehentlich über
//        ein vollständiges Spiel gelegte ältere/halbfertige Teildatei. Rein
//        additive/verbessernde Ersetzungen sind davon nie betroffen.
//        --allow-downgrade erzwingt die Übernahme trotzdem (für eine bewusste
//        Korrektur), gilt nur für diesen einen Lauf und wird im Bericht als
//        Warnung genannt, nie stillschweigend.
//
// Bewusste CLI-Entscheidung (siehe Auftrag "entscheide dich für die sicherste
// und klarste Struktur"): --update-embedded braucht NIE ein <inputFile> und
// liest niemals direkt aus dem Entwurf, sondern IMMER aus season-data/<key>.json
// auf der Platte — dadurch ist die eingebettete Kopie garantiert byte-identisch
// zur extern ausgelieferten Datei, auch wenn --write und --update-embedded in
// getrennten Aufrufen (z.B. an unterschiedlichen Tagen) verwendet werden.

import { readFile, writeFile, rename } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  findDuplicateGameIds,
  validateSeasonGames,
  diffGameIds,
  getGameId,
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
const EMBEDDED_JS_PATH = path.resolve(process.cwd(), 'season-data-embedded.js');
const MANIFEST_PATH = path.join(SEASON_DATA_DIR, 'seasons.json');

// Kopf von season-data-embedded.js, falls die Datei neu angelegt werden muss
// (siehe runUpdateEmbedded weiter unten) — bewusst als reiner String, nicht
// als eigene .js-Vorlagendatei, analog zum bisherigen einzeiligen
// STATIC_SEASON_DATA-Muster in index.html. Klassisches Skript (kein
// import/export), damit es auch unter file:// per <script src="…"> lädt.
const EMBEDDED_JS_HEADER =
  '// Automatisch erzeugt/gepflegt von scripts/import-season-data.mjs --update-embedded.\n' +
  '// file://-Fallback: setzt window.STATIC_SEASON_DATA, bevor der Anwendungscode läuft\n' +
  '// (siehe <script src="season-data-embedded.js"> vor dem Haupt-<script> in index.html).\n' +
  '// Nicht von Hand bearbeiten — siehe docs/season-data-import.md.\n';
const EMPTY_EMBEDDED_JS = `${EMBEDDED_JS_HEADER}window.STATIC_SEASON_DATA={};\n`;

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

// ─────────────────────────────────────────────────────────────────────────
// Aufgabe 14 — Teilimport (--merge): die Eingabedatei muss NICHT mehr die
// komplette Saison enthalten, sondern darf nur die Spiele EINES Spieltags
// (oder beliebig weniger Spiele) tragen. Reine Ergänzung zum bestehenden
// Vollimport-Pfad oben (buildDryRunReport/main ohne --merge bleiben
// unverändert, byte-identisches Verhalten) — kein bestehender Codepfad wird
// geändert, nur ein neuer, paralleler hinzugefügt.
// ─────────────────────────────────────────────────────────────────────────

/**
 * Führt bestehende Saison-Spiele mit einer Teildatei zusammen: Spiele mit
 * bereits bekannter ID werden durch die Version aus der Teildatei ERSETZT
 * (z.B. ein zuvor als "Postponed" importiertes Spiel, das jetzt den echten
 * Endstand trägt), Spiele mit neuer ID werden ANGEHÄNGT. Kein bestehendes
 * Spiel wird je entfernt — die bestehende Reihenfolge bleibt für alle
 * unveränderten/aktualisierten Spiele erhalten, neue Spiele kommen ans Ende
 * (Anzeige-Reihenfolge ist an keiner Stelle der App von der Reihenfolge in
 * der Rohdatei abhängig, siehe compareGamesChronologically in index.html).
 * Rein, kein fs/Zeitabhängigkeit.
 * @param {Array<object>} existingGames
 * @param {Array<object>} partialGames
 * @returns {{mergedGames:object[], addedIds:string[], updatedIds:string[]}}
 */
export function mergeGamesById(existingGames, partialGames) {
  const byId = new Map((existingGames ?? []).map((g) => [getGameId(g), g]));
  const addedIds = [];
  const updatedIds = [];
  for (const g of partialGames ?? []) {
    const id = getGameId(g);
    if (id === null) continue; // Strukturfehler ohne ID wird separat per validateSeasonGames gemeldet
    if (byId.has(id)) updatedIds.push(id);
    else addedIds.push(id);
    byId.set(id, g); // Version aus der Teildatei gewinnt bei bekannter ID
  }
  const addedIdSet = new Set(addedIds);
  const mergedGames = [
    ...(existingGames ?? []).map((g) => byId.get(getGameId(g))),
    ...(partialGames ?? []).filter((g) => addedIdSet.has(getGameId(g))),
  ];
  return { mergedGames, addedIds: addedIds.sort(), updatedIds: updatedIds.sort() };
}

/** Misst den "Reichtum" eines Spielobjekts anhand der Felder, die ein echter
 * Spielbericht füllt — rein lesend, keine Bewertung von Inhalt/Richtigkeit. */
function gameRichness(game) {
  return {
    events: Array.isArray(game?.events) ? game.events.length : 0,
    homePlayers: Array.isArray(game?.players?.home) ? game.players.home.length : 0,
    guestPlayers: Array.isArray(game?.players?.guest) ? game.players.guest.length : 0,
    hasResult: !!(game?.result || game?.result_string),
  };
}

/**
 * Aufgabe 14b: die bestehende "keine ID verschwindet"-Prüfung sichert nicht,
 * dass ein ERSETZTES Spiel inhaltlich nicht ärmer wird — eine ältere oder
 * halbfertige Teildatei könnte über einem bereits vollständig importierten
 * Spiel landen, ohne dass sich die Spielanzahl ändert. Prüft für jede ID, die
 * sowohl in existingGames als auch in partialGames vorkommt (= würde ersetzt
 * werden), ob Events, Spieler je Seite oder ein vorhandener Endstand
 * zurückgehen bzw. verschwinden. Rein additive Ergänzungen (gleich viel oder
 * mehr überall) lösen NICHTS aus. Reine Prüf-Funktion, keine Entscheidung,
 * was mit einem Fund geschieht (siehe buildMergeDryRunReport).
 * @returns {Array<{id:string, problems:string[], before:object, after:object}>}
 */
export function detectGameDowngrades(existingGames, partialGames) {
  const byId = new Map((existingGames ?? []).map((g) => [getGameId(g), g]));
  const downgrades = [];
  for (const newGame of partialGames ?? []) {
    const id = getGameId(newGame);
    if (id === null) continue;
    const oldGame = byId.get(id);
    if (!oldGame) continue; // neue ID -> kein "Vorher" zum Vergleichen
    const before = gameRichness(oldGame);
    const after = gameRichness(newGame);
    const problems = [];
    if (after.events < before.events) problems.push(`Events: ${before.events} -> ${after.events}`);
    if (after.homePlayers < before.homePlayers) problems.push(`Heim-Spieler: ${before.homePlayers} -> ${after.homePlayers}`);
    if (after.guestPlayers < before.guestPlayers) problems.push(`Gast-Spieler: ${before.guestPlayers} -> ${after.guestPlayers}`);
    if (before.hasResult && !after.hasResult) problems.push('Endstand verschwindet (war vorhanden, ist es in der Teildatei nicht mehr)');
    if (problems.length) downgrades.push({ id, problems, before, after });
  }
  return downgrades;
}

/**
 * Dry-Run-Kernlogik für den Teilimport-Pfad (--merge) — Pendant zu
 * buildDryRunReport, aber: die Sicherheitsprüfung "keine bekannte Game-ID
 * darf verschwinden" wird gegen das TATSÄCHLICHE Merge-Ergebnis geprüft
 * (existingGames ∪ partialGames-by-id), nicht gegen die Teildatei allein —
 * sonst würde jeder Teilimport fälschlich an "fehlende IDs" scheitern, weil
 * die Teildatei naturgemäß nur einen Bruchteil der Saison enthält. Da Merge
 * ausschließlich ergänzt/aktualisiert, kann dabei konstruktionsbedingt keine
 * bestehende ID verschwinden — die Prüfung bleibt trotzdem aktiv (siehe
 * Auftrag: "Die bestehende Sicherheitsprüfung... bleibt dabei unverändert"),
 * als Netz gegen einen Fehler in mergeGamesById selbst, nicht als Vertrauen
 * auf die eigene Korrektheit.
 * @param {{allowDowngrade?:boolean}} [options] allowDowngrade (Aufgabe 14b):
 *   lässt inhaltlich ärmere Ersatz-Spiele dennoch zu (Warnung statt Fehler) —
 *   gilt nur für diesen einen Aufruf, siehe formatMergeReport().
 * @returns {object} Bericht, siehe formatMergeReport()
 */
export function buildMergeDryRunReport(seasonKey, newData, existingData, options = {}) {
  const allowDowngrade = !!options.allowDowngrade;
  const errors = [];
  const warnings = [];

  const wrapperCheck = validateWrapperFormat(newData);
  if (!wrapperCheck.ok) errors.push(...wrapperCheck.problems);

  if (wrapperCheck.ok && newData.season !== seasonKey) {
    errors.push(`Feld "season" ("${newData.season}") passt nicht zum angegebenen Season-Key ("${seasonKey}")`);
  }

  const partialGames = wrapperCheck.ok ? newData.games : [];
  const existedBefore = existingData !== null && existingData !== undefined;
  const existingGames = Array.isArray(existingData?.games) ? existingData.games : [];
  if (existedBefore && !Array.isArray(existingData?.games)) {
    warnings.push('bestehende season-data/<key>.json ist vorhanden, aber strukturell ungültig — wird wie "keine Datei" behandelt');
  }
  if (!existedBefore) {
    warnings.push('Für diese Saison existiert noch keine season-data/<key>.json — der Teilimport entspricht hier einem Vollimport (alle Spiele der Teildatei sind neu).');
  }

  // Duplikat-/Strukturprüfung gilt nur für die Teildatei — das ist alles, was
  // an neuem Inhalt hereinkommt.
  const duplicates = findDuplicateGameIds(partialGames);
  if (duplicates.length > 0) {
    errors.push(`Doppelte Game-ID(s) in der Teildatei: ${duplicates.map((d) => `${d.id} (${d.count}×)`).join(', ')}`);
  }
  const structure = validateSeasonGames(partialGames);
  const invalidGames = structure.invalidGames ?? [];
  for (const bad of invalidGames) {
    errors.push(`Spiel an Index ${bad.index}${bad.id !== null ? ` (id=${bad.id})` : ''}: ${bad.problems.join('; ')}`);
  }

  const merge = mergeGamesById(existingGames, partialGames);

  // Sicherheitsnetz: nach dem Merge darf keine zuvor bekannte ID fehlen (siehe
  // Dokumentationskommentar oben an der Funktion).
  const diff = diffGameIds(existingGames, merge.mergedGames);
  if (diff.removed.length > 0) {
    errors.push(`Interner Fehler: Merge hätte bekannte Game-ID(s) entfernt (${diff.removed.join(', ')}) — Abbruch, nichts wird geschrieben.`);
  }

  // Unveränderte, bestehende Sicherheitslogik — geprüft gegen das Merge-
  // Ergebnis, nicht gegen die (naturgemäß viel kleinere) Teildatei.
  const mergedCheck = validateMergedSeason(existingGames, merge.mergedGames);
  if (!mergedCheck.ok) errors.push(`validateMergedSeason: ${mergedCheck.reason}`);

  // Aufgabe 14b: Verschlechterungsschutz — eine ältere/halbfertige Teildatei
  // darf ein bereits vollständig importiertes Spiel nicht stillschweigend
  // ärmer machen (gleiche Spielanzahl, aber weniger Inhalt wäre sonst
  // unsichtbar). Rein additive/verbessernde Ersetzungen lösen nichts aus.
  const downgrades = detectGameDowngrades(existingGames, partialGames);
  if (downgrades.length) {
    if (allowDowngrade) {
      for (const d of downgrades) {
        warnings.push(`--allow-downgrade: Spiel ${d.id} wurde trotz inhaltlicher Verarmung übernommen (${d.problems.join('; ')}).`);
      }
    } else {
      for (const d of downgrades) {
        errors.push(`Spiel ${d.id} würde durch die Teildatei inhaltlich ärmer werden (${d.problems.join('; ')}) — Abbruch. Nur mit --allow-downgrade erzwingbar (für eine bewusste Korrektur).`);
      }
    }
  }

  const ok = errors.length === 0;

  return {
    ok,
    season: seasonKey,
    label: wrapperCheck.ok ? newData.label : null,
    existedBefore,
    previousGameCount: existingGames.length,
    partialFileGameCount: partialGames.length,
    mergedGameCount: merge.mergedGames.length,
    addedIds: merge.addedIds,
    updatedIds: merge.updatedIds,
    downgrades,
    allowDowngrade,
    duplicates,
    invalidGames,
    mergedGames: merge.mergedGames,
    errors,
    warnings,
    writeWouldBeSafe: ok,
  };
}

/** Formatiert den Teilimport-Bericht für die Konsole (Pendant zu formatReport). */
export function formatMergeReport(report, { seasonKey, inputFile, existingFile, mode = 'dry-run' }) {
  const lines = [];
  lines.push('─'.repeat(70));
  lines.push(`${mode === 'write' ? 'Schreib-' : 'Dry-Run-'}Bericht: Teilimport (--merge) für ${seasonKey}`);
  lines.push('─'.repeat(70));
  lines.push(`Eingabedatei (Teildatei): ${inputFile}`);
  lines.push(`Bestehende Datei:         ${existingFile}${report.existedBefore ? '' : ' (existiert nicht — Teilimport entspricht Vollimport)'}`);
  lines.push(`Saison:                   ${report.season}`);
  lines.push(`Label:                    ${report.label ?? '(unbekannt, Wrapper ungültig)'}`);
  lines.push(`Bisherige Spielanzahl:    ${report.previousGameCount}`);
  lines.push(`Spiele in der Teildatei:  ${report.partialFileGameCount}`);
  lines.push(`Spielanzahl nach Merge:   ${report.mergedGameCount}`);
  lines.push(`Neue Game-ID(s):          ${report.addedIds.length}${report.addedIds.length ? ` -> ${report.addedIds.join(', ')}` : ''}`);
  lines.push(`Aktualisierte Game-ID(s): ${report.updatedIds.length}${report.updatedIds.length ? ` -> ${report.updatedIds.join(', ')}` : ''}`);
  lines.push(`Inhaltlich ärmer ersetzt: ${report.downgrades.length}${report.downgrades.length ? ` -> ${report.downgrades.map((d) => d.id).join(', ')}${report.allowDowngrade ? ' (mit --allow-downgrade zugelassen)' : ''}` : ''}`);
  lines.push(`Doppelte IDs (Teildatei): ${report.duplicates.length}${report.duplicates.length ? ` -> ${report.duplicates.map((d) => d.id).join(', ')}` : ''}`);
  lines.push(`Strukturell ungültig:     ${report.invalidGames.length}`);
  lines.push(`Validierungsstatus:       ${report.ok ? 'OK' : 'FEHLER'}`);
  lines.push(`Schreiben wäre sicher:    ${report.writeWouldBeSafe ? 'JA' : 'NEIN'}`);
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
        ? 'Ergebnis: Validierung OK — season-data/<key>.json wird jetzt mit dem Merge-Ergebnis überschrieben.'
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
// Einfügen EINES Saison-Blocks in window.STATIC_SEASON_DATA
// (season-data-embedded.js, NICHT mehr index.html — siehe Token-Diät Teil 2).
// Reine String-Funktion, kein fetch/fs, direkt testbar.
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
 * Ersetzt (oder fügt neu ein) den Saison-Block für EINE Saison innerhalb des
 * vollständigen Texts von season-data-embedded.js (`window.STATIC_SEASON_DATA=
 * {...};`). Ersetzt/berührt NICHTS außerhalb dieses einen Blocks — kein
 * string.replace() auf einen geratenen Textausschnitt, sondern
 * Klammer-balanciertes Parsen (identische Technik wie die vormalige
 * index.html-Variante dieser Funktion, nur auf die neue Zieldatei/den neuen
 * Marker übertragen — index.html wird von dieser Funktion nicht mehr
 * angefasst).
 *
 * Verhalten bei den Trefferzahlen für den Schlüssel `"<seasonKey>":{`
 * innerhalb von window.STATIC_SEASON_DATA:
 *   genau 1 Treffer -> bestehender Block wird ERSETZT
 *   0 Treffer       -> Saison ist noch nie eingebettet worden -> Block wird
 *                      NEU EINGEFÜGT (z.B. für eine künftige neue Saison wie
 *                      26/27) — das ist kein Fehlerfall, sondern der
 *                      erwartete Weg, eine neue Saison erstmals einzubetten,
 *                      und wird explizit geloggt, nicht still ausgeführt.
 *   >1 Treffer      -> mehrdeutig -> HARTER ABBRUCH, die Datei bleibt
 *                      unverändert (genau die vom Auftrag geforderte Regel
 *                      "bei 0 oder >1 Treffern hart abbrechen" — 0 Treffer
 *                      wird hier bewusst als "neu einfügen" statt als Fehler
 *                      behandelt, siehe Begründung im Bericht/Doku).
 *
 * @param {string} fileText vollständiger Inhalt von season-data-embedded.js
 * @param {string} seasonKey z.B. "25/26"
 * @param {{season:string,label:string,games:object[]}} seasonData exakt der
 *   Inhalt, der eingebettet werden soll (unverändert, keine Normalisierung)
 * @returns {{text:string, mode:'replaced'|'inserted'}} neuer Dateiinhalt
 * @throws {Error} bei jeder Unsicherheit (Marker fehlt/mehrfach, unbalanciert,
 *   Ergebnis kein valides JSON, andere Season-Keys verändert)
 */
export function embedSeasonInEmbeddedFile(fileText, seasonKey, seasonData) {
  const marker = 'window.STATIC_SEASON_DATA=';
  const markerIdx = fileText.indexOf(marker);
  if (markerIdx === -1) {
    throw new Error('window.STATIC_SEASON_DATA-Zuweisung nicht gefunden — Abbruch, season-data-embedded.js bleibt unverändert.');
  }
  if (fileText.indexOf(marker, markerIdx + 1) !== -1) {
    throw new Error('window.STATIC_SEASON_DATA-Zuweisung kommt mehrfach vor — nicht eindeutig, Abbruch.');
  }

  const objStart = markerIdx + marker.length;
  if (fileText[objStart] !== '{') {
    throw new Error('Erwartetes "{" direkt nach "window.STATIC_SEASON_DATA=" nicht gefunden — Abbruch.');
  }
  const objEnd = findMatchingBrace(fileText, objStart);
  if (objEnd === -1) {
    throw new Error('Kein balanciertes Ende für das window.STATIC_SEASON_DATA-Objekt gefunden — Abbruch.');
  }

  const before = fileText.slice(0, objStart);
  const objText = fileText.slice(objStart, objEnd + 1);
  const after = fileText.slice(objEnd + 1);

  // Sanity-Check: das bestehende Objekt muss bereits gültiges JSON sein,
  // bevor irgendetwas daran verändert wird.
  let oldParsed;
  try {
    oldParsed = JSON.parse(objText);
  } catch (e) {
    throw new Error(`Bestehendes window.STATIC_SEASON_DATA ist kein gültiges JSON (${e.message}) — Abbruch, nichts wird verändert.`);
  }
  const oldKeys = Object.keys(oldParsed).sort();

  const keyPattern = `"${seasonKey}":{`;
  const occurrences = countOccurrences(objText, keyPattern);
  if (occurrences > 1) {
    throw new Error(`Mehrdeutig: "${keyPattern}" kommt ${occurrences}× im window.STATIC_SEASON_DATA-Block vor — Abbruch, nichts geändert.`);
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
    // Kein führendes Komma, wenn das Objekt bisher komplett leer war ("{}",
    // z.B. beim Neuanlegen von season-data-embedded.js) — sonst entstünde
    // "{,"key":…}", kein gültiges JSON. Bei mindestens einem bestehenden
    // Eintrag bleibt das Komma nötig.
    const separator = oldKeys.length === 0 ? '' : ',';
    newObjText = `${objText.slice(0, innerEnd)}${separator}"${seasonKey}":${newEntryJson}${objText.slice(innerEnd)}`;
    mode = 'inserted';
  }

  // Ergebnis muss weiterhin gültiges JSON sein UND darf ausschließlich den
  // einen betroffenen Season-Key verändert/hinzugefügt haben.
  let newParsed;
  try {
    newParsed = JSON.parse(newObjText);
  } catch (e) {
    throw new Error(`Ergebnis nach dem Einbetten ist kein gültiges JSON (${e.message}) — Abbruch, season-data-embedded.js bleibt unverändert.`);
  }
  const newKeys = Object.keys(newParsed).sort();
  const expectedKeys = mode === 'inserted' ? [...oldKeys, seasonKey].sort() : oldKeys;
  if (JSON.stringify(newKeys) !== JSON.stringify(expectedKeys)) {
    throw new Error(
      `Unerwartete Änderung der Season-Keys (vorher: ${oldKeys.join(', ')}; nachher: ${newKeys.join(', ')}) — Abbruch, season-data-embedded.js bleibt unverändert.`,
    );
  }
  for (const key of oldKeys) {
    if (key === seasonKey) continue;
    if (JSON.stringify(newParsed[key]) !== JSON.stringify(oldParsed[key])) {
      throw new Error(`Saison "${key}" hätte sich unerwartet mitverändert — Abbruch, season-data-embedded.js bleibt unverändert.`);
    }
  }
  if (newParsed[seasonKey].games.length !== seasonData.games.length) {
    throw new Error('Eingebettete Spielanzahl stimmt nach dem Schreiben nicht mit der Quelle überein — Abbruch.');
  }

  return { text: before + newObjText + after, mode };
}

/**
 * Aufgabe 13: bettet die laut season-data/seasons.json aktuelle Saison (status:"current") als
 * `window.STATIC_CURRENT_SEASON_KEY='…';` synchron in season-data-embedded.js ein — direkt nach der
 * window.STATIC_SEASON_DATA-Zuweisung. Das ist der einzige Weg, wie index.html den bisher hartcodierten
 * CURRENT_SEASON_KEY-Fallback korrekt auflösen kann, OHNE fetch() — also auch unter file:// (Doppelklick),
 * wo das bisherige, rein asynchrone resolveCurrentSeasonKey() (fetch auf season-data/seasons.json) nie
 * ankommt. Reine String-Funktion, kein fetch/fs; wird von runUpdateEmbedded() bei JEDEM --update-embedded
 * aufgerufen (unabhängig davon, welche einzelne Saison dabei eingebettet wird), damit der Wert nie hinter
 * dem echten Manifest zurückbleibt.
 * @param {string} fileText vollständiger Inhalt von season-data-embedded.js (nach embedSeasonInEmbeddedFile)
 * @param {string} currentKey z.B. "26/27" — der Key mit status:"current" im Manifest
 * @returns {string} neuer Dateiinhalt
 * @throws {Error} wenn window.STATIC_SEASON_DATA nicht gefunden/nicht balanciert ist
 */
export function embedCurrentSeasonKeyInEmbeddedFile(fileText, currentKey) {
  const lineRe = /window\.STATIC_CURRENT_SEASON_KEY\s*=\s*'[^']*';\n?/;
  const line = `window.STATIC_CURRENT_SEASON_KEY='${currentKey}';\n`;
  if (lineRe.test(fileText)) {
    return fileText.replace(lineRe, line);
  }
  const marker = 'window.STATIC_SEASON_DATA=';
  const markerIdx = fileText.indexOf(marker);
  if (markerIdx === -1) {
    throw new Error('window.STATIC_SEASON_DATA-Zuweisung nicht gefunden — kann STATIC_CURRENT_SEASON_KEY nicht einfügen.');
  }
  const objStart = markerIdx + marker.length;
  const objEnd = findMatchingBrace(fileText, objStart);
  if (objEnd === -1) {
    throw new Error('Kein balanciertes Ende für das window.STATIC_SEASON_DATA-Objekt gefunden — kann STATIC_CURRENT_SEASON_KEY nicht einfügen.');
  }
  // objEnd ist die Position von '}'; direkt danach kommt noch ';' — dahinter einfügen.
  const afterSemi = fileText[objEnd + 1] === ';' ? objEnd + 2 : objEnd + 1;
  return `${fileText.slice(0, afterSemi)}\n${line}${fileText.slice(afterSemi)}`;
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
    console.error(`--update-embedded: season-data/${file} enthält doppelte Game-IDs (${duplicates.map((d) => d.id).join(', ')}) — Abbruch, season-data-embedded.js bleibt unverändert.`);
    process.exitCode = 1;
    return;
  }
  const structure = validateSeasonGames(seasonResult.data.games);
  if (!structure.ok) {
    console.error(`--update-embedded: season-data/${file} enthält strukturell ungültige Spiele — Abbruch, season-data-embedded.js bleibt unverändert.`);
    for (const bad of structure.invalidGames) console.error(`  - Index ${bad.index} (id=${bad.id}): ${bad.problems.join('; ')}`);
    process.exitCode = 1;
    return;
  }

  // Fehlt season-data-embedded.js (z.B. frisch geklonter Checkout ohne jede
  // eingebettete Saison, oder die Datei wurde versehentlich gelöscht): NICHT
  // fataler Fehler, sondern Start von einem leeren, aber validen Objekt aus —
  // embedSeasonInEmbeddedFile() fügt die erste Saison dann per "inserted" ein.
  let fileText;
  try {
    fileText = await readFile(EMBEDDED_JS_PATH, 'utf8');
  } catch (e) {
    if (e.code !== 'ENOENT') {
      console.error(`--update-embedded: season-data-embedded.js konnte nicht gelesen werden: ${e.message}`);
      process.exitCode = 1;
      return;
    }
    fileText = EMPTY_EMBEDDED_JS;
    console.log('--update-embedded: season-data-embedded.js existierte noch nicht — wird neu angelegt.');
  }

  let embedResult;
  try {
    embedResult = embedSeasonInEmbeddedFile(fileText, seasonKey, seasonResult.data);
  } catch (e) {
    console.error(`--update-embedded: ${e.message}`);
    process.exitCode = 1;
    return;
  }

  // Aufgabe 13: bei jedem --update-embedded zusätzlich STATIC_CURRENT_SEASON_KEY aus dem echten Manifest
  // nachziehen — unabhängig davon, welche einzelne Saison gerade eingebettet wurde. Fehlt das Manifest oder
  // hat keine Saison status:"current", bleibt der zuletzt eingebettete Wert stehen (kein Rateversuch).
  let finalText = embedResult.text;
  let currentKeyNote = '';
  const manifestResult = await readJsonFile(MANIFEST_PATH);
  const currentEntry = manifestResult.ok ? (manifestResult.data?.seasons || []).find((s) => s?.status === 'current') : null;
  if (currentEntry?.key) {
    finalText = embedCurrentSeasonKeyInEmbeddedFile(finalText, currentEntry.key);
    currentKeyNote = ` STATIC_CURRENT_SEASON_KEY='${currentEntry.key}' (aus season-data/seasons.json).`;
  }

  await writeTextAtomic(EMBEDDED_JS_PATH, finalText);
  console.log(
    `--update-embedded: window.STATIC_SEASON_DATA['${seasonKey}'] in season-data-embedded.js ${embedResult.mode === 'inserted' ? 'neu eingefügt' : 'ersetzt'} ` +
      `(${seasonResult.data.games.length} Spiele). Alle anderen Saison-Blöcke wurden geprüft und blieben unverändert. index.html wurde nicht angefasst.${currentKeyNote}`,
  );
  process.exitCode = 0;
}

export async function main(argv = process.argv.slice(2)) {
  const flags = new Set(argv.filter((a) => a.startsWith('--')));
  const positional = argv.filter((a) => !a.startsWith('--'));
  const wantsWrite = flags.has('--write');
  const wantsEmbed = flags.has('--update-embedded');
  const wantsMerge = flags.has('--merge');
  const allowDowngrade = flags.has('--allow-downgrade');

  const [seasonKeyArg, inputFileArg] = positional;
  if (!seasonKeyArg) {
    console.error('Aufruf: node scripts/import-season-data.mjs <seasonKey> <inputFile> [--write] [--update-embedded] [--merge]');
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
    console.error('Aufruf: node scripts/import-season-data.mjs <seasonKey> <inputFile> [--write] [--update-embedded] [--merge]');
    console.error('Beispiel: node scripts/import-season-data.mjs 25/26 ./entwurf/25-26-neu.json');
    console.error('Beispiel (Teilimport eines Spieltags): node scripts/import-season-data.mjs 26/27 ./entwurf/26-27-spieltag1.json --merge');
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

  // Aufgabe 14: --merge nimmt eine Teildatei (z.B. nur ein Spieltag) entgegen
  // und ergänzt/aktualisiert statt zu ersetzen — ansonsten (ohne --merge)
  // bleibt der bestehende Vollimport-Pfad unten unverändert.
  if (wantsMerge) {
    const mergeReport = buildMergeDryRunReport(seasonKeyArg, inputResult.data, existingData, { allowDowngrade });
    console.log(formatMergeReport(mergeReport, { seasonKey: seasonKeyArg, inputFile: inputFileArg, existingFile: existingPath, mode: wantsWrite ? 'write' : 'dry-run' }));

    if (!wantsWrite) {
      process.exitCode = mergeReport.ok ? 0 : 1;
      return;
    }
    if (!mergeReport.ok) {
      console.error('Abbruch: --write wurde angegeben, aber die Merge-Validierung ist fehlgeschlagen. Es wurde NICHTS geschrieben.');
      process.exitCode = 1;
      return;
    }

    // Label: die bestehende Saison-Beschriftung hat Vorrang (eine Teildatei
    // für einen einzelnen Spieltag definiert die Saison nicht neu) — nur wenn
    // es noch keine bestehende Datei gibt, kommt das Label aus der Teildatei.
    const mergedLabel = existingData?.label || inputResult.data.label;
    const dataToWrite = { season: seasonKeyArg, label: mergedLabel, games: mergeReport.mergedGames };
    await writeJsonAtomic(existingPath, dataToWrite);
    console.log(`--write: season-data/${existingFile} geschrieben (${dataToWrite.games.length} Spiele, davon ${mergeReport.addedIds.length} neu/${mergeReport.updatedIds.length} aktualisiert durch diesen Teilimport). Kein Commit, kein Push.`);

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
    return;
  }

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

// CLI-Startguard: EXAKTER Pfadvergleich, nicht mehr endsWith() (siehe ausführliche Begründung im
// identischen Guard in scripts/update-season-data.mjs). Hier betraf die alte Fassung konkret
// scripts/test-import-season-data.mjs, dessen eigener Dateiname zufällig auf "import-season-data.mjs"
// endet — jeder Lauf des Tests löste dadurch beim bloßen Import dieses Moduls main() im Hintergrund
// aus (ohne Argumente -> Nutzungshinweis + process.exitCode = 1), unabhängig vom eigentlichen
// Testergebnis. Erklärt das zuvor beobachtete Exit-Code-Artefakt ("Alle Tests erfolgreich", aber
// Exit-Code 1).
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((e) => {
    console.error('Unerwarteter Fehler:', e.message);
    process.exitCode = 1;
  });
}

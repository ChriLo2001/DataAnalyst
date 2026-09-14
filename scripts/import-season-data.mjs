#!/usr/bin/env node
// Manueller, vollständig API-freier Season-Data-Importer (Phase: NUR Dry-Run).
//
// Ersetzt für künftige Updates NICHT scripts/update-season-data.mjs (bleibt
// unverändert bestehen, für den hypothetischen Fall eines künftigen
// autorisierten API-Keys) — dieses Skript ist der neue, parallele Weg für
// manuell beschaffte Rohdaten (siehe Audit "Phase 2: KEIN Saisonmanager-
// API-Key"): keine Saisonmanager-Anfrage, kein X-Api-Key, kein Scraping.
//
// Architektur laut Plan: diese Phase deckt ausschließlich
//   manuelle Rohdaten → Validierung → ID-Diff → Sicherheitsentscheidung → Dry-Run-Bericht
// ab. Es gibt in dieser Datei absichtlich KEINEN Schreibpfad (kein writeFile,
// kein rename, kein unlink, keine Änderung an season-data/, index.html oder
// seasons.json) — das kommt in einer separaten, späteren Phase (--write, dann
// --update-embedded) hinzu. Die Kernlogik (buildDryRunReport) ist deshalb
// bewusst als reine, exportierte Funktion von der I/O (main()) getrennt, um
// dort ohne Umbau andocken zu können.
//
// Aufruf: node scripts/import-season-data.mjs <seasonKey> <inputFile> [--dry-run]
//   node scripts/import-season-data.mjs 25/26 ./entwurf/25-26-neu.json
// --dry-run wird akzeptiert, ändert aber nichts: Dry-Run ist in dieser Phase
// so oder so das einzige Verhalten.

import { readFile } from 'node:fs/promises';
import path from 'node:path';

import {
  getGameId,
  findDuplicateGameIds,
  validateSeasonGames,
  diffGameIds,
} from './season-data-validators.mjs';

// Wiederverwendung der bestehenden, bereits getesteten Sicherheitsfunktion
// aus update-season-data.mjs, OHNE diese Datei zu verändern: validateMergedSeason
// und fileNameForKey sind dort bereits als reine, benannte Exporte vorhanden.
// Der Import löst NICHT main() dort aus — der CLI-Startguard am Ende von
// update-season-data.mjs prüft `process.argv[1]` (den tatsächlich gestarteten
// Skriptpfad, hier import-season-data.mjs) und bleibt beim reinen Import
// dieses Moduls inaktiv.
import { validateMergedSeason, fileNameForKey } from './update-season-data.mjs';

const SEASON_DATA_DIR = path.resolve(process.cwd(), 'season-data');

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
 * Kernlogik des Dry-Runs — komplett rein (keine I/O), damit sie isoliert
 * getestet werden kann und später unverändert vom --write-Pfad wiederverwendet
 * werden kann (schreiben darf erst passieren, wenn report.ok === true).
 *
 * @param {string} seasonKey z.B. "25/26"
 * @param {unknown} newData geparster Inhalt der Eingabedatei
 * @param {{season?:string, label?:string, games?:object[]}|null} existingData
 *   geparster Inhalt der bestehenden season-data/<key>.json, oder null wenn
 *   es (noch) keine Datei gibt (z.B. brandneue Saison)
 * @returns {object} vollständiger Dry-Run-Bericht, siehe printReport()
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
export function formatReport(report, { seasonKey, inputFile, existingFile }) {
  const lines = [];
  lines.push('─'.repeat(70));
  lines.push(`Dry-Run-Bericht: Season-Data-Import für ${seasonKey}`);
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
  lines.push(
    report.ok
      ? 'Ergebnis: Dry-Run OK — ein Schreibvorgang wäre nach aktuellem Stand sicher (Schreiben ist in dieser Phase des Tools noch nicht implementiert).'
      : 'Ergebnis: Dry-Run FEHLGESCHLAGEN — es würde NICHTS geschrieben.',
  );
  return lines.join('\n');
}

// ─────────────────────────────────────────────────────────────────────────
// I/O + CLI (main) — bewusst dünn, ausschließlich LESEND. Kein writeFile,
// kein rename, kein unlink, keine Zieldatei wird berührt.
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

export async function main(argv = process.argv.slice(2)) {
  const flags = new Set(argv.filter((a) => a.startsWith('--')));
  const positional = argv.filter((a) => !a.startsWith('--'));

  if (flags.has('--write') || flags.has('--update-embedded')) {
    console.error(
      '--write/--update-embedded sind in dieser Phase des Tools absichtlich noch nicht implementiert ' +
        '(nur Dry-Run). Es wurde nichts gelesen oder geschrieben — Abbruch.',
    );
    process.exitCode = 1;
    return;
  }

  const [seasonKeyArg, inputFileArg] = positional;
  if (!seasonKeyArg || !inputFileArg) {
    console.error('Aufruf: node scripts/import-season-data.mjs <seasonKey> <inputFile> [--dry-run]');
    console.error('Beispiel: node scripts/import-season-data.mjs 25/26 ./entwurf/25-26-neu.json');
    process.exitCode = 1;
    return;
  }

  const seasonCheck = validateSeasonKey(seasonKeyArg);
  if (!seasonCheck.ok) {
    console.error(`Ungültiger Season-Key "${seasonKeyArg}": ${seasonCheck.reason}`);
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
  console.log(formatReport(report, { seasonKey: seasonKeyArg, inputFile: inputFileArg, existingFile: existingPath }));

  process.exitCode = report.ok ? 0 : 1;
}

if (process.argv[1]?.replace(/\\/g, '/').endsWith('import-season-data.mjs')) {
  main().catch((e) => {
    console.error('Unerwarteter Fehler:', e.message);
    process.exitCode = 1;
  });
}

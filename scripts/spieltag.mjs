#!/usr/bin/env node
// Spieltag-Befehl (Liga-Analytics-Spezifikation, Abschnitt 3.6.6) — P0c.1.
//
// Orchestriert die bestehenden Importer als Funktionen (keine Kopie ihrer
// Logik):
//   - scripts/import-season-data.mjs  (main, buildDryRunReport)
//   - scripts/import-lineup-data.mjs  (main, buildImportPlan)
//
// Ablauf zwingend "alle Dry-Runs zuerst, dann alle Writes" (siehe Auftrag):
// PHASE 1 prüft ausschließlich, schreibt nichts. PHASE 2 schreibt nur, wenn
// PHASE 1 vollständig erfolgreich war — in fester Reihenfolge Season, dann
// Lineup (siehe Kommentar bei checkLineupDryRun() zur Begründung dieser
// Reihenfolge).
//
// Bewusst NICHT Teil dieses Scripts (siehe P0c-Vorbereitung / Abschnitt 9
// der Spezifikation "Nicht-Ziele" sowie das explizite Scoping dieses
// Auftrags): kein Modell-Build, keine model-data/snapshots/<season>.json,
// kein manifest.json/inputHash, kein Vorschau-Modus, kein Browser-Import,
// kein localStorage/Draft-Autosave, kein getEffectiveLineupData(), keine
// M1–M10-Fachlogik. Commit/Push bleiben manuell — dieses Script führt
// selbst KEINE Git-Befehle aus, es schlägt lediglich eine Commit-Message vor.
//
// Aufruf:
//   node scripts/spieltag.mjs <seasonKey> --games <gamesFile> --lineup <lineupDraftFile>            (Dry-Run)
//   node scripts/spieltag.mjs <seasonKey> --games <gamesFile> --lineup <lineupDraftFile> --write     (schreibt nach bestandenen Prüfungen)
//
// Kernlogik (checkLineupDryRun, buildCommitMessageSuggestion) ist bewusst
// von main() getrennt gehalten, wo sinnvoll — vollständige Trennung wie bei
// den bestehenden Importern ist hier aber nicht möglich, da dieses Script
// selbst ausschließlich Ablaufsteuerung (I/O + Orchestrierung) ist.

import { readFile } from 'node:fs/promises';
import path from 'node:path';

import { main as seasonMain, buildDryRunReport } from './import-season-data.mjs';
import { main as lineupMain, buildImportPlan } from './import-lineup-data.mjs';
import { fileNameForKey } from './update-season-data.mjs';
import { LINEUP_SCHEMA_VERSION } from './lineup-data-validators.mjs';

// cwd-relativ, exakt wie SEASON_DATA_DIR/LINEUP_DATA_DIR in
// import-season-data.mjs/import-lineup-data.mjs (dieselbe Konvention: alle
// scripts/*.mjs gehen von einem Aufruf aus dem Repo-Root aus).
const SEASON_DATA_DIR = path.resolve(process.cwd(), 'season-data');
const LINEUP_DATA_DIR = path.resolve(process.cwd(), 'lineup-data');
const REGISTRY_PATH = path.join(LINEUP_DATA_DIR, 'groups.json');

/** Lokale Kopie des in jedem scripts/*.mjs bereits identisch vorhandenen
 * Musters (siehe import-season-data.mjs/import-lineup-data.mjs) — bewusst
 * nicht importiert, da dort nicht exportiert und eine reine I/O-Hilfsfunktion
 * ohne fachliche Logik ist. */
async function readJsonFile(filePath) {
  let raw;
  try {
    raw = await readFile(filePath, 'utf8');
  } catch (e) {
    return { ok: false, exists: false, error: `Datei "${filePath}" konnte nicht gelesen werden: ${e.message}` };
  }
  try {
    return { ok: true, exists: true, data: JSON.parse(raw) };
  } catch (e) {
    return { ok: false, exists: true, error: `Datei "${filePath}" enthält kein gültiges JSON: ${e.message}` };
  }
}

/**
 * Prüft den Lineup-Draft per Dry-Run — bewusst NICHT über lineupMain()
 * (Black-Box), sondern über die bereits exportierte, unveränderte
 * buildImportPlan()-Funktion direkt.
 *
 * Grund: lineupMain() liest die Referenz-Spiele (sourceSeasonGames) beim
 * echten CLI-Aufruf immer von der aktuell auf der Platte liegenden
 * season-data/<key>.json. Ein Spieltag-Befehl bringt aber typischerweise
 * NEUE Spiele UND deren Lineup im selben Aufruf ein (siehe Spezifikation
 * 3.6.6, CLI-Beispiel) — die neuen Spiele stehen aber erst nach dem
 * Season-Write (Phase 2) wirklich auf der Platte. Ein naiver
 * lineupMain()-Dry-Run in Phase 1 würde daher jede Lineup-Zeile für ein noch
 * nicht geschriebenes neues Spiel fälschlich als "gameId existiert nicht"
 * ablehnen.
 *
 * Deshalb wird hier derselbe, unveränderte buildImportPlan() stattdessen mit
 * sourceSeasonGames = den Spielen aus der EINGEHENDEN --games-Datei
 * aufgerufen (dem Stand, der NACH dem geplanten Season-Write vorliegen wird)
 * statt mit dem aktuell noch alten Stand auf der Platte. existingSeasonData/
 * existingRegistry (lineup-data selbst) sind von der Season-Write-Reihenfolge
 * unabhängig und werden weiterhin ganz normal von der Platte gelesen —
 * exakt wie in lineupMain(), inklusive derselben "vorhanden, aber
 * unlesbar" -> Abbruch-Regel.
 */
async function checkLineupDryRun({ seasonKeyArg, lineupFileArg, incomingSeasonGames }) {
  const draftResult = await readJsonFile(path.resolve(process.cwd(), lineupFileArg));
  if (!draftResult.ok) return { ok: false, errors: [draftResult.error] };

  const seasonFile = fileNameForKey(seasonKeyArg);
  const existingSeasonResult = await readJsonFile(path.join(LINEUP_DATA_DIR, seasonFile));
  if (existingSeasonResult.exists && !existingSeasonResult.ok) {
    return {
      ok: false,
      errors: [`${existingSeasonResult.error} — bestehende lineup-data/${seasonFile} ist vorhanden, aber nicht lesbar. Es wird nichts geschrieben.`],
    };
  }
  const existingSeasonData = existingSeasonResult.ok
    ? existingSeasonResult.data
    : { schemaVersion: LINEUP_SCHEMA_VERSION, season: seasonKeyArg, games: [] };

  const registryResult = await readJsonFile(REGISTRY_PATH);
  if (registryResult.exists && !registryResult.ok) {
    return {
      ok: false,
      errors: [`${registryResult.error} — bestehende lineup-data/groups.json ist vorhanden, aber nicht lesbar. Es wird nichts geschrieben.`],
    };
  }
  const existingRegistry = registryResult.ok ? registryResult.data : { schemaVersion: LINEUP_SCHEMA_VERSION, groups: [] };

  const plan = await buildImportPlan({
    seasonKey: seasonKeyArg,
    draft: draftResult.data,
    existingSeasonData,
    existingRegistry,
    sourceSeasonGames: incomingSeasonGames,
  });

  return { ok: plan.ok, errors: plan.errors ?? [] };
}

/** Reine Bau-Funktion für den Commit-Message-Vorschlag (kein Git-Aufruf).
 * Nennt den/die Spieltag(e) nur, wenn sich die neu hinzugekommenen Spiele
 * (laut derselben, bereits vorhandenen buildDryRunReport()-Diff-Logik wie
 * import-season-data.mjs) eindeutig einer game_day.game_day_number zuordnen
 * lassen — sonst ein neutraler Season-Bezug, statt etwas zu erfinden. */
export function buildCommitMessageSuggestion(seasonKeyArg, incomingSeasonData, seasonReportForLabel) {
  const addedIds = new Set((seasonReportForLabel?.addedIds ?? []).map(String));
  const games = Array.isArray(incomingSeasonData?.games) ? incomingSeasonData.games : [];
  const matchdayNumbers = new Set();
  for (const g of games) {
    if (!addedIds.has(String(g?.id))) continue;
    const n = g?.game_day?.game_day_number;
    if (n !== undefined && n !== null && n !== '') matchdayNumbers.add(Number(n));
  }
  if (matchdayNumbers.size === 0) return `data: Spieltag-Import (${seasonKeyArg})`;
  const sorted = [...matchdayNumbers].sort((a, b) => a - b);
  const label = sorted.length === 1 ? `Spieltag ${sorted[0]}` : `Spieltage ${sorted.join(', ')}`;
  return `data: ${label} (${seasonKeyArg})`;
}

export async function main(argv = process.argv.slice(2)) {
  const flags = new Set(argv.filter((a) => a.startsWith('--')));
  const positional = argv.filter((a) => !a.startsWith('--'));
  const wantsWrite = flags.has('--write');

  const gamesIdx = argv.indexOf('--games');
  const gamesFileArg = gamesIdx !== -1 ? argv[gamesIdx + 1] : undefined;
  const lineupIdx = argv.indexOf('--lineup');
  const lineupFileArg = lineupIdx !== -1 ? argv[lineupIdx + 1] : undefined;
  const [seasonKeyArg] = positional;

  if (!seasonKeyArg || !gamesFileArg || !lineupFileArg) {
    console.error('Aufruf: node scripts/spieltag.mjs <seasonKey> --games <gamesFile> --lineup <lineupDraftFile> [--write]');
    console.error('Beispiel: node scripts/spieltag.mjs 25/26 --games ./entwurf/spieltag-7.json --lineup ./entwurf/lineup-draft.json');
    process.exitCode = 1;
    return;
  }

  console.log(`=== Spieltag-Befehl: ${seasonKeyArg} ===`);
  console.log(`  Games:  ${gamesFileArg}`);
  console.log(`  Lineup: ${lineupFileArg}`);
  console.log(`  Modus:  ${wantsWrite ? 'WRITE' : 'Dry-Run'}`);

  // ── PHASE 1: ausschließlich prüfen, NICHTS schreiben ──────────────────
  console.log('\n--- Phase 1/2: Dry-Run (Season) ---');
  process.exitCode = undefined;
  await seasonMain([seasonKeyArg, gamesFileArg]);
  if (process.exitCode !== 0) {
    console.error('\nAbbruch: Season-Dry-Run fehlgeschlagen. Es wurde nichts geschrieben (auch nicht Lineup).');
    process.exitCode = 1;
    return;
  }
  process.exitCode = undefined;

  const existingSeasonOnDisk = await readJsonFile(path.join(SEASON_DATA_DIR, fileNameForKey(seasonKeyArg)));
  const incomingSeasonFile = await readJsonFile(path.resolve(process.cwd(), gamesFileArg));
  if (!incomingSeasonFile.ok) {
    // Kann hier eigentlich nicht mehr auftreten (Season-Dry-Run oben hat
    // dieselbe Datei bereits erfolgreich gelesen) — defensiv trotzdem klar
    // behandelt statt stillschweigend weiterzumachen.
    console.error(`\nAbbruch: ${incomingSeasonFile.error}`);
    process.exitCode = 1;
    return;
  }
  const seasonReportForLabel = buildDryRunReport(
    seasonKeyArg,
    incomingSeasonFile.data,
    existingSeasonOnDisk.ok ? existingSeasonOnDisk.data : null,
  );

  console.log('\n--- Phase 1/2: Dry-Run (Lineup, gegen den nach Phase 2 geplanten Season-Stand) ---');
  const lineupPreCheck = await checkLineupDryRun({
    seasonKeyArg,
    lineupFileArg,
    incomingSeasonGames: incomingSeasonFile.data?.games ?? [],
  });
  if (!lineupPreCheck.ok) {
    for (const e of lineupPreCheck.errors) console.error(`  - ${e}`);
    console.error('\nAbbruch: Lineup-Dry-Run fehlgeschlagen. Es wurde nichts geschrieben (auch nicht Season).');
    process.exitCode = 1;
    return;
  }
  console.log('Lineup-Dry-Run OK.');

  const commitMessage = buildCommitMessageSuggestion(seasonKeyArg, incomingSeasonFile.data, seasonReportForLabel);

  if (!wantsWrite) {
    console.log('\nDry-Run abgeschlossen: beide Prüfungen erfolgreich. Kein --write angegeben — es wurde nichts geschrieben.');
    console.log(`Vorgeschlagene Commit-Message (bei --write): "${commitMessage}"`);
    process.exitCode = 0;
    return;
  }

  // ── PHASE 2: erst jetzt schreiben — feste Reihenfolge Season -> Lineup ─
  console.log('\n--- Phase 2/2: Write (Season) ---');
  process.exitCode = undefined;
  await seasonMain([seasonKeyArg, gamesFileArg, '--write']);
  if (process.exitCode !== 0) {
    console.error('\nAbbruch: Season-Write ist unerwartet fehlgeschlagen (bestand zuvor den Dry-Run). Lineup wurde NICHT geschrieben.');
    process.exitCode = 1;
    return;
  }
  process.exitCode = undefined;

  console.log('\n--- Phase 2/2: Write (Lineup) ---');
  await lineupMain([seasonKeyArg, '--input', lineupFileArg, '--write']);
  if (process.exitCode !== 0) {
    console.error(
      '\nWARNUNG: Season wurde bereits geschrieben, der Lineup-Write ist danach unerwartet fehlgeschlagen (bestand zuvor ' +
        'den Dry-Run, aber nicht den echten Write — z.B. durch eine Änderung der Dateien zwischen Prüfung und Schreiben). ' +
        'Bitte den Zustand von lineup-data/ manuell prüfen.',
    );
    process.exitCode = 1;
    return;
  }

  console.log(`\nVorgeschlagene Commit-Message: "${commitMessage}"`);
  console.log('Commit und Push bleiben manuell — dieses Script führt keine Git-Befehle aus.');
  process.exitCode = 0;
}

// Exakter Dateiname (nicht endsWith): sonst würde auch test-spieltag.mjs den CLI-Start auslösen.
if (/(^|\/)spieltag\.mjs$/.test(process.argv[1]?.replace(/\\/g, '/') ?? '')) {
  main().catch((e) => {
    console.error('Unerwarteter Fehler:', e.message);
    process.exitCode = 1;
  });
}

#!/usr/bin/env node
// Offline-Testharness für scripts/spieltag.mjs — kein Netzwerk, kein API-Key.
//
// Arbeitet in einer isolierten Sandbox (temp-Verzeichnis mit eigenem
// season-data/ + lineup-data/), NICHT im echten Repo — es wird an keiner
// Stelle season-data/*.json, lineup-data/*.json oder index.html des Repos
// gelesen oder geschrieben.
//
// Technischer Hinweis: SEASON_DATA_DIR/LINEUP_DATA_DIR in spieltag.mjs (und
// in import-season-data.mjs/import-lineup-data.mjs) werden als Modul-Level-
// const EINMALIG beim ersten Import aus process.cwd() berechnet. Deshalb wird
// hier per process.chdir() in die Sandbox gewechselt, BEVOR diese Module das
// erste Mal per dynamischem import() geladen werden — und danach für alle
// Testfälle dieselbe Sandbox wiederverwendet (Dateien werden zwischen den
// Fällen gezielt zurückgesetzt, statt eine neue Sandbox zu erzeugen, da ein
// erneuter Modul-Import ohnehin denselben gecachten Modul-Zustand liefern würde).
//
// Aufruf: node scripts/test-spieltag.mjs

import { mkdtemp, mkdir, writeFile, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';

let failures = 0;

function assertEqual(actual, expected, label) {
  const a = JSON.stringify(actual);
  const e = JSON.stringify(expected);
  if (a === e) {
    console.log(`  ok   ${label}`);
  } else {
    failures++;
    console.log(`  FAIL ${label}\n       erwartet: ${e}\n       erhalten: ${a}`);
  }
}

function assertTrue(cond, label) {
  assertEqual(Boolean(cond), true, label);
}

/** Fängt console.log/console.error während fn() ab und gibt die Zeilen zurück. */
async function captureConsole(fn) {
  const originalLog = console.log;
  const originalError = console.error;
  const lines = [];
  console.log = (...a) => lines.push(a.join(' '));
  console.error = (...a) => lines.push(a.join(' '));
  try {
    await fn();
  } finally {
    console.log = originalLog;
    console.error = originalError;
  }
  return lines;
}

// Bewusst identisch zur bereits in test-import-season-data.mjs bestätigt
// gültigen Fixture-Form (samplePostponedGame) — nur id/date/matchday
// parametrisiert, keine neue, ungeprüfte Spiel-Form erfunden.
function sampleGame(id, gameDayNumber = 1) {
  return {
    id,
    game_number: String(id),
    date: '2026-01-10',
    game_day: { game_day_number: gameDayNumber, title: `${gameDayNumber}. Spieltag` },
    home_team_name: 'VfB Ulm',
    guest_team_name: 'FBC Testgegner',
    started: false,
    ended: false,
    result_string: null,
    result: null,
    league_id: 1897,
    league_name: 'Verbandsliga BW (KF)',
    events: [],
    players: {},
    starting_players: {},
    awards: {},
    period_titles: [{ period: 1, title: '1. Hälfte' }],
    notice_type: 'Postponed',
  };
}

const BASELINE_SEASON = { season: '25/26', label: '2025/26', games: [sampleGame(1, 1), sampleGame(2, 1)] };
const BASELINE_LINEUP_SEASON = { schemaVersion: 1, season: '25/26', games: [] };
const BASELINE_REGISTRY = { schemaVersion: 1, groups: [] };

const sandboxDir = await mkdtemp(path.join(tmpdir(), 'spieltag-test-'));
const seasonDataPath = path.join(sandboxDir, 'season-data', '25-26.json');
const lineupDataPath = path.join(sandboxDir, 'lineup-data', '25-26.json');
const registryPath = path.join(sandboxDir, 'lineup-data', 'groups.json');
const gamesFileValid = path.join(sandboxDir, 'games-valid.json');
const gamesFileRemoved = path.join(sandboxDir, 'games-removed.json');
const lineupFileValid = path.join(sandboxDir, 'lineup-valid.json');
const lineupFileUnknownGame = path.join(sandboxDir, 'lineup-unknown-game.json');

async function resetSandboxFiles() {
  await mkdir(path.join(sandboxDir, 'season-data'), { recursive: true });
  await mkdir(path.join(sandboxDir, 'lineup-data'), { recursive: true });
  await writeFile(seasonDataPath, JSON.stringify(BASELINE_SEASON, null, 2));
  await writeFile(lineupDataPath, JSON.stringify(BASELINE_LINEUP_SEASON, null, 2));
  await writeFile(registryPath, JSON.stringify(BASELINE_REGISTRY, null, 2));
}

await resetSandboxFiles();

const originalCwd = process.cwd();
process.chdir(sandboxDir);

try {
  const { main: spieltagMain, buildCommitMessageSuggestion } = await import('./spieltag.mjs');
  const { computeBaseHash } = await import('./lineup-data-hash.mjs');

  const baseHash = await computeBaseHash(BASELINE_LINEUP_SEASON, BASELINE_REGISTRY);

  // Gültige neue Season-Datei: bestehende 2 Spiele + neues Spiel 3 (Spieltag 2).
  await writeFile(gamesFileValid, JSON.stringify({ season: '25/26', label: '2025/26', games: [sampleGame(1, 1), sampleGame(2, 1), sampleGame(3, 2)] }));
  // Ungültige neue Season-Datei: Spiel 2 verschwindet -> muss Season-Dry-Run scheitern lassen.
  await writeFile(gamesFileRemoved, JSON.stringify({ season: '25/26', label: '2025/26', games: [sampleGame(1, 1)] }));
  // Gültiger Lineup-Draft für das NEUE Spiel 3 (existiert erst nach dem geplanten Season-Write).
  await writeFile(
    lineupFileValid,
    JSON.stringify({ schemaVersion: 1, season: '25/26', baseHash, games: [{ gameId: 3, roster: { field: [], goalies: [] }, groups: [], confirmedCombinations: [], note: '' }] }),
  );
  // Lineup-Draft, der eine nirgends existierende gameId referenziert.
  await writeFile(
    lineupFileUnknownGame,
    JSON.stringify({ schemaVersion: 1, season: '25/26', baseHash, games: [{ gameId: 999, roster: { field: [], goalies: [] }, groups: [], confirmedCombinations: [], note: '' }] }),
  );

  // ── A — Importer werden als Funktionen verwendet, kein CLI-Side-Effect ──
  console.log('== A: Import löst main() nicht aus, Exporte sind Funktionen ==');
  assertTrue(typeof spieltagMain === 'function', 'main ist exportiert und eine Funktion');
  assertTrue(typeof buildCommitMessageSuggestion === 'function', 'buildCommitMessageSuggestion ist exportiert und eine Funktion');
  assertEqual(process.exitCode, undefined, 'reiner Import von spieltag.mjs setzt process.exitCode nicht (main() wurde nicht automatisch ausgeführt)');

  // ── B — Dry-Run-Reihenfolge: Season zuerst, bricht VOR dem Lineup-Check ab ──
  console.log('');
  console.log('== B: Season-Dry-Run-Fehler bricht ab, BEVOR der Lineup-Dry-Run überhaupt läuft ==');
  await resetSandboxFiles();
  process.exitCode = undefined;
  const linesB = await captureConsole(() => spieltagMain(['25/26', '--games', gamesFileRemoved, '--lineup', lineupFileValid]));
  assertEqual(process.exitCode, 1, 'exitCode 1 bei fehlgeschlagenem Season-Dry-Run');
  assertTrue(linesB.some((l) => l.includes('Dry-Run (Season)')), 'Season-Dry-Run-Phase wurde protokolliert');
  assertTrue(!linesB.some((l) => l.includes('Dry-Run (Lineup')), 'Lineup-Dry-Run-Phase wurde NICHT erreicht (Abbruch vorher)');
  const seasonAfterB = JSON.parse(await readFile(seasonDataPath, 'utf8'));
  assertEqual(seasonAfterB.games.length, 2, 'season-data bleibt bei fehlgeschlagenem Dry-Run unverändert (2 Spiele)');

  // ── C — Fehler im ZWEITEN Dry-Run-Schritt darf NICHTS geschrieben haben,
  //        auch nicht den (für sich genommen gültigen) ersten Schritt ──────
  console.log('');
  console.log('== C: Season-Dry-Run OK, Lineup-Dry-Run scheitert -> auch Season wird NICHT geschrieben ==');
  await resetSandboxFiles();
  process.exitCode = undefined;
  const linesC = await captureConsole(() => spieltagMain(['25/26', '--games', gamesFileValid, '--lineup', lineupFileUnknownGame, '--write']));
  assertEqual(process.exitCode, 1, 'exitCode 1, wenn der Lineup-Dry-Run fehlschlägt');
  assertTrue(linesC.some((l) => l.includes('existiert nicht in season-data')), 'Fehlermeldung nennt die unbekannte gameId konkret');
  assertTrue(linesC.some((l) => l.toLowerCase().includes('auch nicht season')), 'Abbruchmeldung macht klar, dass auch Season nicht geschrieben wurde');
  const seasonAfterC = JSON.parse(await readFile(seasonDataPath, 'utf8'));
  assertEqual(seasonAfterC.games.length, 2, 'season-data bleibt UNVERÄNDERT (kein Teil-Import), obwohl der Season-Dry-Run allein erfolgreich gewesen wäre');
  const lineupAfterC = JSON.parse(await readFile(lineupDataPath, 'utf8'));
  assertEqual(lineupAfterC.games.length, 0, 'lineup-data bleibt unverändert');

  // ── D — Erfolgreicher Ablauf: beide Dry-Runs OK, dann Writes in fester
  //        Reihenfolge Season -> Lineup, danach Commit-Message-Vorschlag ──
  console.log('');
  console.log('== D: erfolgreicher Ablauf (Dry-Run OK, dann --write in der Reihenfolge Season -> Lineup) ==');
  await resetSandboxFiles();
  process.exitCode = undefined;
  const linesD = await captureConsole(() => spieltagMain(['25/26', '--games', gamesFileValid, '--lineup', lineupFileValid, '--write']));
  assertEqual(process.exitCode, 0, 'exitCode 0 bei vollständigem Erfolg');
  const seasonAfterD = JSON.parse(await readFile(seasonDataPath, 'utf8'));
  assertEqual(seasonAfterD.games.map((g) => g.id), [1, 2, 3], 'season-data enthält jetzt auch das neue Spiel 3');
  const lineupAfterD = JSON.parse(await readFile(lineupDataPath, 'utf8'));
  assertEqual(lineupAfterD.games.map((g) => g.gameId), [3], 'lineup-data enthält jetzt den Lineup-Eintrag für Spiel 3');
  const writeSeasonIdx = linesD.findIndex((l) => l.includes('Write (Season)'));
  const writeLineupIdx = linesD.findIndex((l) => l.includes('Write (Lineup)'));
  assertTrue(writeSeasonIdx !== -1 && writeLineupIdx !== -1 && writeSeasonIdx < writeLineupIdx, 'Write (Season) wird VOR Write (Lineup) protokolliert (feste Reihenfolge)');
  assertTrue(linesD.some((l) => l.includes('Vorgeschlagene Commit-Message: "data: Spieltag 2 (25/26)"')), 'Commit-Message-Vorschlag nennt korrekt Spieltag 2 (game_day_number des neuen Spiels 3)');

  // ── E — Commit-Message ist reiner Vorschlag, kein Git-Aufruf ───────────
  console.log('');
  console.log('== E: Commit-Message wird nur vorgeschlagen, kein Git-Befehl im Script ==');
  assertEqual(
    buildCommitMessageSuggestion('25/26', { games: [{ id: 7, game_day: { game_day_number: 5 } }] }, { addedIds: ['7'] }),
    'data: Spieltag 5 (25/26)',
    'buildCommitMessageSuggestion ist rein und liefert das erwartete Format',
  );
  assertEqual(
    buildCommitMessageSuggestion('25/26', { games: [] }, { addedIds: [] }),
    'data: Spieltag-Import (25/26)',
    'ohne eindeutig zuordenbare neue Spieltag-Nummer wird ein neutraler Fallback verwendet, nichts erfunden',
  );
  const spieltagSource = await readFile(path.join(import.meta.dirname, 'spieltag.mjs'), 'utf8');
  assertTrue(!spieltagSource.includes('child_process'), 'spieltag.mjs importiert node:child_process nicht (keine Möglichkeit, Git-Befehle auszuführen)');
  assertTrue(!/\bgit\s+(commit|add|push)\b/i.test(spieltagSource), 'spieltag.mjs enthält keinen konstruierten git-Befehl im Quelltext');
  assertTrue(linesD.some((l) => l.includes('Commit und Push bleiben manuell')), 'die tatsächliche Laufzeit-Ausgabe weist explizit auf manuelles Commit/Push hin');

  // ── F — CLI: gültiger vs. ungültiger/fehlender Aufruf, korrekter Exit-Code ──
  console.log('');
  console.log('== F: CLI-Argumentprüfung ==');
  await resetSandboxFiles();
  process.exitCode = undefined;
  const linesF1 = await captureConsole(() => spieltagMain([]));
  assertEqual(process.exitCode, 1, 'kein Argument -> exitCode 1');
  assertTrue(linesF1.some((l) => l.includes('Aufruf: node scripts/spieltag.mjs')), 'Usage-Hinweis wird ausgegeben');

  process.exitCode = undefined;
  const linesF2 = await captureConsole(() => spieltagMain(['25/26']));
  assertEqual(process.exitCode, 1, 'nur seasonKey ohne --games/--lineup -> exitCode 1');
  assertTrue(linesF2.some((l) => l.includes('Aufruf: node scripts/spieltag.mjs')), 'Usage-Hinweis auch hier');

  process.exitCode = undefined;
  const linesF3 = await captureConsole(() => spieltagMain(['25/26', '--games', gamesFileValid]));
  assertEqual(process.exitCode, 1, 'nur --games ohne --lineup -> exitCode 1');

  const seasonAfterF = JSON.parse(await readFile(seasonDataPath, 'utf8'));
  assertEqual(seasonAfterF.games.length, 2, 'ungültige CLI-Aufrufe schreiben nichts');

  process.exitCode = undefined;
  const linesF4 = await captureConsole(() => spieltagMain(['25/26', '--games', gamesFileValid, '--lineup', lineupFileValid]));
  assertEqual(process.exitCode, 0, 'gültiger Dry-Run-Aufruf (ohne --write) -> exitCode 0');
  const seasonAfterF4 = JSON.parse(await readFile(seasonDataPath, 'utf8'));
  assertEqual(seasonAfterF4.games.length, 2, 'gültiger Aufruf OHNE --write schreibt weiterhin nichts');
  assertTrue(linesF4.some((l) => l.includes('Kein --write angegeben')), 'Dry-Run-Abschluss wird klar als solcher gekennzeichnet');
} finally {
  process.chdir(originalCwd);
  await rm(sandboxDir, { recursive: true, force: true });
}

console.log('');
if (failures > 0) {
  console.log(`${failures} Test(s) fehlgeschlagen.`);
  process.exitCode = 1;
} else {
  console.log('Alle Tests erfolgreich.');
  process.exitCode = 0;
}

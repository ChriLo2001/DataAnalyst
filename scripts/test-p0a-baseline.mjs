#!/usr/bin/env node
// Struktureller Regressionstest für die P0a.2-Golden-Value-Baseline
// (scripts/p0a-baseline-golden-values.json). Prüft NICHT die fachliche
// Korrektheit der Werte (das leisten die bestehenden Dashboard-Funktionen
// selbst, siehe scripts/collect-p0a-baseline.mjs) — sondern ausschließlich,
// dass die Baseline-Datei vollständig, strukturell gültig und für alle
// geforderten Saisons vorhanden ist. Reine Datei-/JSON-Prüfung, kein Browser
// nötig.
//
// Aufruf: node scripts/test-p0a-baseline.mjs

import { readFile } from 'node:fs/promises';
import path from 'node:path';

const REPO_ROOT = path.resolve(import.meta.dirname, '..');
const BASELINE_PATH = path.join(REPO_ROOT, 'scripts', 'p0a-baseline-golden-values.json');
const EXPECTED_SEASONS = ['21/22', '22/23', '23/24', '24/25', '25/26'];

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

console.log('== P0a.2 Baseline: Datei vorhanden und valides JSON ==');
const raw = (await readFile(BASELINE_PATH, 'utf8')).replace(/^\uFEFF/, '');
let baseline;
try {
  baseline = JSON.parse(raw);
  assertTrue(true, 'Datei ist valides JSON');
} catch (e) {
  assertTrue(false, `Datei ist valides JSON (Fehler: ${e.message})`);
  console.log('\nAbbruch — ohne valides JSON sind weitere Prüfungen sinnlos.');
  process.exitCode = 1;
  process.exit(1);
}

console.log('== Top-Level-Struktur ==');
assertEqual(
  Object.keys(baseline).sort(),
  ['allTime', 'generatedFrom', 'seasons'].sort(),
  'genau die erwarteten Top-Level-Felder (keine erfundenen Zusatzfelder)',
);

console.log('== Saisons ==');
assertEqual(Object.keys(baseline.seasons || {}).sort(), [...EXPECTED_SEASONS].sort(), 'genau die 5 geforderten Saisons vorhanden');

for (const seasonKey of EXPECTED_SEASONS) {
  const season = baseline.seasons?.[seasonKey];
  assertTrue(!!season, `Saison ${seasonKey}: Eintrag vorhanden`);
  if (!season) continue;
  assertTrue(Array.isArray(season.standings) && season.standings.length === season.standingsCount, `Saison ${seasonKey}: standings[] vorhanden, standingsCount stimmt (${season.standingsCount})`);
  assertTrue(season.standings.every((row) => Number.isFinite(row.pts) && Number.isFinite(row.sp) && typeof row.name === 'string'), `Saison ${seasonKey}: jede Standings-Zeile hat pts/sp/name`);
  assertTrue(Array.isArray(season.goalies) && season.goalies.length === season.goalieCount, `Saison ${seasonKey}: goalies[] vorhanden, goalieCount stimmt (${season.goalieCount})`);
  assertTrue(season.goalies.every((g) => g.playerId && g.model && typeof g.model === 'object'), `Saison ${seasonKey}: jeder Goalie hat playerId + model`);
  assertEqual(season.opponentCount, 3, `Saison ${seasonKey}: genau 3 Matchcenter-Gegner erfasst`);
  assertTrue(Array.isArray(season.matchcenter) && season.matchcenter.length === 3, `Saison ${seasonKey}: matchcenter[] hat 3 Einträge`);
  assertTrue(season.matchcenter.every((m) => m.opponentKey && m.intel && typeof m.intel === 'object'), `Saison ${seasonKey}: jeder Matchcenter-Eintrag hat opponentKey + intel`);
}

console.log('== All-Time ==');
assertTrue(!!baseline.allTime?.snapshot && typeof baseline.allTime.snapshot === 'object', 'All-Time-Snapshot vorhanden');
assertTrue(Number.isInteger(baseline.allTime?.hallOfFameRankingCount) && baseline.allTime.hallOfFameRankingCount > 0, 'Hall-of-Fame-Rankingzahl vorhanden und > 0');
assertTrue(Array.isArray(baseline.allTime?.hallOfFameRankingTop20) && baseline.allTime.hallOfFameRankingTop20.length > 0, 'Hall-of-Fame-Top-20-Liste vorhanden und nicht leer');
assertTrue(baseline.allTime.hallOfFameRankingTop20.length <= 20, 'Hall-of-Fame-Top-20-Liste hat maximal 20 Einträge');
assertEqual(baseline.allTime?.comparisonPlayerIds?.length, 3, 'genau 3 Vergleichszentrum-Spieler ausgewählt');
assertTrue(Array.isArray(baseline.allTime?.comparisonDataset) && baseline.allTime.comparisonDataset.length === 3, 'Vergleichszentrum-Datensatz hat 3 Einträge');
assertTrue(baseline.allTime.comparisonDataset.every((c) => c.playerId && c.hasData === true), 'jeder Vergleichszentrum-Eintrag hat playerId und hasData:true');

console.log('');
if (failures > 0) {
  console.log(`${failures} Test(s) fehlgeschlagen.`);
  process.exitCode = 1;
} else {
  console.log('Alle Tests erfolgreich.');
}

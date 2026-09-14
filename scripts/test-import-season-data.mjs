#!/usr/bin/env node
// Offline-Testharness für scripts/import-season-data.mjs (nur die reine
// Kernlogik buildDryRunReport() — kein Netzwerk, kein API-Key, keine
// Schreibpfade vorhanden, die getestet werden könnten).
//
// Alle Fälle nutzen die ECHTEN Inhalte von season-data/25-26.json als
// Ausgangsbasis (nur lesend eingelesen, per JSON.parse tief kopiert — die
// Originaldatei wird nirgends verändert).
//
// Aufruf: node scripts/test-import-season-data.mjs

import { readFile } from 'node:fs/promises';
import path from 'node:path';

import { buildDryRunReport, validateSeasonKey, validateWrapperFormat } from './import-season-data.mjs';

const REPO_ROOT = path.resolve(import.meta.dirname, '..');
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

function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function samplePostponedGame(id) {
  return {
    id,
    game_number: '99',
    date: '2026-05-01',
    game_day: { game_day_number: 9, title: '9. Spieltag' },
    home_team_name: 'VfB Ulm',
    guest_team_name: 'FBC Heidelberg',
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

// ─────────────────────────────────────────────────────────────────────────
// Echte 25/26-Daten laden (read-only, nur als In-Memory-Ausgangsbasis)
// ─────────────────────────────────────────────────────────────────────────

const realRaw = await readFile(path.join(REPO_ROOT, 'season-data', '25-26.json'), 'utf8');
const real2526 = JSON.parse(realRaw);
console.log(`Basis geladen: season-data/25-26.json (${real2526.games.length} Spiele, unverändert auf der Platte).`);

// ─────────────────────────────────────────────────────────────────────────
// Fall 1: identische Kopie von 25/26 -> OK
// ─────────────────────────────────────────────────────────────────────────
console.log('');
console.log('== Fall 1: identische Kopie von 25/26 ==');
{
  const existing = clone(real2526);
  const incoming = clone(real2526);
  const report = buildDryRunReport('25/26', incoming, existing);
  assertTrue(report.ok, 'Dry-Run OK bei identischer Kopie');
  assertEqual(report.addedIds, [], 'keine neuen IDs');
  assertEqual(report.removedIds, [], 'keine entfernten IDs');
  assertEqual(report.unchangedCount, real2526.games.length, 'alle IDs unverändert');
}

// ─────────────────────────────────────────────────────────────────────────
// Fall 2: zusätzliche Game-ID -> OK
// ─────────────────────────────────────────────────────────────────────────
console.log('');
console.log('== Fall 2: zusätzliche Game-ID ==');
{
  const existing = clone(real2526);
  const incoming = clone(real2526);
  incoming.games.push(samplePostponedGame(999001)); // neue, plausible ID außerhalb des bekannten Bereichs
  const report = buildDryRunReport('25/26', incoming, existing);
  assertTrue(report.ok, 'Dry-Run OK: zusätzliches Spiel ist kein Fehler');
  assertEqual(report.addedIds, ['999001'], 'neue ID 999001 erkannt');
  assertEqual(report.removedIds, [], 'keine entfernten IDs');
  assertEqual(report.newGameCount, real2526.games.length + 1, 'neue Gesamtanzahl korrekt');
}

// ─────────────────────────────────────────────────────────────────────────
// Fall 3: verschwundene Game-ID -> FEHLER
// ─────────────────────────────────────────────────────────────────────────
console.log('');
console.log('== Fall 3: verschwundene Game-ID ==');
{
  const existing = clone(real2526);
  const incoming = clone(real2526);
  const removedGame = incoming.games.pop(); // letztes Spiel entfernen
  const report = buildDryRunReport('25/26', incoming, existing);
  assertTrue(!report.ok, 'Dry-Run FEHLER bei verschwundener ID');
  assertEqual(report.removedIds, [String(removedGame.id)], 'die konkret entfernte ID wird gemeldet');
  assertTrue(
    report.errors.some((e) => e.includes(String(removedGame.id))),
    'Fehlermeldung nennt die verschwundene ID konkret',
  );
}

// ─────────────────────────────────────────────────────────────────────────
// Beispiel aus dem Auftrag: gleiche Anzahl, aber eine ID ausgetauscht
// ([100,101,102] -> [100,101,999]) muss trotz gleicher Anzahl FEHLER sein.
// ─────────────────────────────────────────────────────────────────────────
console.log('');
console.log('== Sonderfall: gleiche Spielanzahl, aber eine bekannte ID gegen eine neue getauscht ==');
{
  const existing = { season: '25/26', label: '2025/26', games: [samplePostponedGame(100), samplePostponedGame(101), samplePostponedGame(102)] };
  const incoming = { season: '25/26', label: '2025/26', games: [samplePostponedGame(100), samplePostponedGame(101), samplePostponedGame(999)] };
  const report = buildDryRunReport('25/26', incoming, existing);
  assertTrue(!report.ok, 'FEHLER trotz identischer Gesamtanzahl (102 verschwunden, 999 neu)');
  assertEqual(report.previousGameCount, report.newGameCount, 'Anzahl bleibt gleich (3 vs. 3) — Fehler kommt NICHT aus einem Anzahl-Rückgang');
  assertEqual(report.removedIds, ['102'], 'ID 102 korrekt als verschwunden erkannt');
  assertEqual(report.addedIds, ['999'], 'ID 999 korrekt als neu erkannt');
}
console.log('');
console.log('== Gegenprobe: rein additiver Fall aus dem Auftrag ([100,101,102] -> [100,101,102,103]) ist OK ==');
{
  const existing = { season: '25/26', label: '2025/26', games: [samplePostponedGame(100), samplePostponedGame(101), samplePostponedGame(102)] };
  const incoming = { season: '25/26', label: '2025/26', games: [samplePostponedGame(100), samplePostponedGame(101), samplePostponedGame(102), samplePostponedGame(103)] };
  const report = buildDryRunReport('25/26', incoming, existing);
  assertTrue(report.ok, 'Dry-Run OK: rein additive Änderung');
  assertEqual(report.addedIds, ['103'], 'nur 103 ist neu');
  assertEqual(report.removedIds, [], 'nichts verschwunden');
}

// ─────────────────────────────────────────────────────────────────────────
// Fall 4: doppelte Game-ID -> FEHLER
// ─────────────────────────────────────────────────────────────────────────
console.log('');
console.log('== Fall 4: doppelte Game-ID ==');
{
  const existing = clone(real2526);
  const incoming = clone(real2526);
  incoming.games.push(clone(incoming.games[0])); // erstes Spiel dupliziert
  const report = buildDryRunReport('25/26', incoming, existing);
  assertTrue(!report.ok, 'Dry-Run FEHLER bei doppelter ID');
  assertEqual(report.duplicates.length, 1, 'genau eine Duplikat-ID gemeldet');
  assertEqual(report.duplicates[0].id, String(real2526.games[0].id), 'die korrekte ID wird als Duplikat gemeldet');
}

// ─────────────────────────────────────────────────────────────────────────
// Fall 5: ungültige Game-Struktur -> FEHLER
// ─────────────────────────────────────────────────────────────────────────
console.log('');
console.log('== Fall 5: ungültige Game-Struktur ==');
{
  const existing = clone(real2526);
  const incoming = clone(real2526);
  delete incoming.games[0].date; // Pflichtfeld entfernen
  incoming.games[1].league_id = 'nicht-mehr-numerisch'; // falscher Typ
  const report = buildDryRunReport('25/26', incoming, existing);
  assertTrue(!report.ok, 'Dry-Run FEHLER bei strukturell ungültigen Spielen');
  assertEqual(report.invalidGames.length, 2, 'genau zwei ungültige Spiele erkannt (Index 0 und 1)');
}

// ─────────────────────────────────────────────────────────────────────────
// Fall 6: Postponed-artiges Spiel mit result:null -> OK
// ─────────────────────────────────────────────────────────────────────────
console.log('');
console.log('== Fall 6: neues Postponed-artiges Spiel (result:null, leere events/players) ist kein Fehler ==');
{
  const existing = clone(real2526);
  const incoming = clone(real2526);
  incoming.games.push(samplePostponedGame(999002));
  const report = buildDryRunReport('25/26', incoming, existing);
  assertTrue(report.ok, 'Postponed-artiges Spiel wird als strukturell gültig akzeptiert');
  assertEqual(report.invalidGames, [], 'keine Strukturfehler durch das neue Postponed-Spiel');
  assertEqual(report.addedIds, ['999002'], 'neue Postponed-ID korrekt als Zugang erkannt');
}
// Regressionstest: die 4 ECHTEN, bereits vorhandenen Postponed-Spiele in
// 25/26 (identische Kopie, Fall 1) dürfen selbstverständlich nie einen
// Strukturfehler auslösen.
{
  const postponedInReal = real2526.games.filter((g) => g.notice_type === 'Postponed');
  assertEqual(postponedInReal.length, 4, 'reale 25/26-Datei enthält weiterhin genau 4 Postponed-Spiele (Ausgangslage bestätigt)');
}

// ─────────────────────────────────────────────────────────────────────────
// Fall 7: komplett ungültige Eingabedatei -> FEHLER
// ─────────────────────────────────────────────────────────────────────────
console.log('');
console.log('== Fall 7: komplett ungültige Eingabedatei ==');
{
  const existing = clone(real2526);
  const casesInvalid = [null, 'ein-string', 42, [], {}, { season: '25/26' }, { season: '25/26', label: '2025/26' }];
  for (const invalid of casesInvalid) {
    const report = buildDryRunReport('25/26', invalid, existing);
    assertTrue(!report.ok, `Dry-Run FEHLER für ungültige Eingabe: ${JSON.stringify(invalid)}`);
  }
}
console.log('== Zusatz: validateSeasonKey / validateWrapperFormat direkt ==');
assertTrue(validateSeasonKey('25/26').ok, '"25/26" ist ein gültiger Season-Key');
assertTrue(!validateSeasonKey('2025/26').ok, '"2025/26" wird abgelehnt (falsches Format)');
assertTrue(!validateSeasonKey('25/28').ok, '"25/28" wird abgelehnt (keine aufeinanderfolgenden Jahre)');
assertTrue(validateWrapperFormat({ season: '25/26', label: '2025/26', games: [] }).ok, 'minimaler gültiger Wrapper wird akzeptiert');
assertTrue(!validateWrapperFormat({ season: '25/26', label: '2025/26' }).ok, 'Wrapper ohne games[] wird abgelehnt');

console.log('');
if (failures > 0) {
  console.log(`${failures} Test(s) fehlgeschlagen.`);
  process.exitCode = 1;
} else {
  console.log('Alle Tests erfolgreich.');
}

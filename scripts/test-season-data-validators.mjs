#!/usr/bin/env node
// Offline-Testharness für scripts/season-data-validators.mjs — kein Netzwerk,
// kein API-Key. Teil 1 validiert die fünf tatsächlich vorhandenen
// season-data/*.json-Dateien (nur lesend, keine Datei wird verändert).
// Teil 2 prüft die Validatoren gegen künstliche, in-memory erzeugte
// Testfälle (Duplikat, fehlende ID, kaputtes Objekt, neue/verschwundene ID,
// identische Datei).
//
// Aufruf: node scripts/test-season-data-validators.mjs

import { readFile } from 'node:fs/promises';
import path from 'node:path';

import {
  getGameId,
  findDuplicateGameIds,
  assertNoDuplicateGameIds,
  validateGameStructure,
  validateSeasonGames,
  diffGameIds,
} from './season-data-validators.mjs';

const REPO_ROOT = path.resolve(import.meta.dirname, '..');
const SEASON_DATA_DIR = path.join(REPO_ROOT, 'season-data');
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

// ─────────────────────────────────────────────────────────────────────────
// Teil 1: die fünf tatsächlich vorhandenen season-data/*.json-Dateien
// (nur lesend — keine der Dateien wird hier verändert)
// ─────────────────────────────────────────────────────────────────────────

const REAL_SEASON_FILES = [
  ['21-22.json', 42],
  ['22-23.json', 42],
  ['23-24.json', 42],
  ['24-25.json', 51],
  ['25-26.json', 60],
];

console.log('== Reale season-data/*.json-Dateien: Duplikat- + Strukturprüfung ==');
for (const [file, expectedCount] of REAL_SEASON_FILES) {
  const raw = await readFile(path.join(SEASON_DATA_DIR, file), 'utf8');
  const data = JSON.parse(raw);

  assertEqual(data.games.length, expectedCount, `${file}: erwartete Spielanzahl (${expectedCount})`);

  const duplicates = findDuplicateGameIds(data.games);
  assertEqual(duplicates, [], `${file}: keine doppelten Game-IDs`);

  const structure = validateSeasonGames(data.games);
  assertTrue(structure.ok, `${file}: alle Spiele strukturell gültig`);
  if (!structure.ok) {
    for (const bad of structure.invalidGames) {
      console.log(`       -> Index ${bad.index} (id=${bad.id}): ${bad.problems.join('; ')}`);
    }
  }
}

// ─────────────────────────────────────────────────────────────────────────
// Teil 2: künstliche Testfälle
// ─────────────────────────────────────────────────────────────────────────

function sampleGame(overrides = {}) {
  return {
    id: 1001,
    game_number: '1',
    date: '2026-01-01',
    game_day: { game_day_number: 1, title: '1. Spieltag' },
    home_team_name: 'VfB Ulm',
    guest_team_name: 'FBC Heidelberg',
    started: true,
    ended: true,
    result_string: '5:4',
    result: { home_goals: 5, guest_goals: 4 },
    league_id: 1897,
    league_name: 'Verbandsliga BW (KF)',
    events: [{ event_id: 1, event_type: 'goal' }],
    players: { home: [], guest: [] },
    starting_players: { home: [], guest: [] },
    awards: { home: [], guest: [] },
    period_titles: [{ period: 1, title: '1. Hälfte' }],
    notice_type: null,
    ...overrides,
  };
}

console.log('');
console.log('== Künstlicher Fall: doppelte Game-ID ==');
{
  const games = [sampleGame({ id: 2001 }), sampleGame({ id: 2001 }), sampleGame({ id: 2002 })];
  const duplicates = findDuplicateGameIds(games);
  assertEqual(duplicates, [{ id: '2001', count: 2 }], 'Duplikat 2001 wird erkannt, 2002 nicht');
  let threw = false;
  let message = '';
  try {
    assertNoDuplicateGameIds(games, 'test-datei.json');
  } catch (e) {
    threw = true;
    message = e.message;
  }
  assertTrue(threw, 'assertNoDuplicateGameIds wirft bei Duplikaten');
  assertTrue(message.includes('2001'), 'Fehlermeldung nennt die betroffene ID (kein stilles Verhalten)');
}

console.log('');
console.log('== Künstlicher Fall: fehlende Game-ID ==');
{
  const game = sampleGame({ id: undefined });
  delete game.id;
  const result = validateGameStructure(game);
  assertTrue(!result.ok, 'Spiel ohne id/game_id wird als ungültig erkannt');
  assertEqual(result.id, null, 'getGameId liefert null');
  assertTrue(
    result.problems.some((p) => p.includes('id')),
    'Fehlermeldung erwähnt die fehlende ID',
  );
}
assertEqual(getGameId({ game_id: 555 }), '555', 'getGameId erkennt Fallback-Feld "game_id"');
assertEqual(getGameId({ id: 777 }), '777', 'getGameId erkennt "id"');
assertEqual(getGameId({}), null, 'getGameId liefert null ohne id/game_id');

console.log('');
console.log('== Künstlicher Fall: ungültiges Game-Objekt (fehlende/falsche Pflichtfelder) ==');
{
  const broken = sampleGame({ date: null, events: 'kein-array', league_id: '1897' });
  const result = validateGameStructure(broken);
  assertTrue(!result.ok, 'Objekt mit null-Datum/kaputtem events-Feld/falschem Typ wird abgelehnt');
  assertTrue(result.problems.some((p) => p.includes('date')), 'nennt das kaputte "date"-Feld');
  assertTrue(result.problems.some((p) => p.includes('events')), 'nennt das kaputte "events"-Feld');
  assertTrue(result.problems.some((p) => p.includes('league_id')), 'nennt den falschen Typ von "league_id"');

  const seasonResult = validateSeasonGames([sampleGame(), broken]);
  assertTrue(!seasonResult.ok, 'validateSeasonGames erkennt das kaputte Spiel innerhalb einer Liste');
  assertEqual(seasonResult.invalidGames.length, 1, 'genau ein ungültiges Spiel gemeldet');
  assertEqual(seasonResult.invalidGames[0].index, 1, 'meldet den korrekten Index');
}

console.log('');
console.log('== Künstlicher Fall: Postponed-artiges Spiel (leere events/players, result:null) bleibt GÜLTIG ==');
{
  const postponed = sampleGame({
    started: false,
    ended: false,
    result: null,
    result_string: null,
    events: [],
    players: {},
    notice_type: 'Postponed',
  });
  const result = validateGameStructure(postponed);
  assertTrue(result.ok, 'leere events/players + result:null sind kein Strukturfehler (siehe reale 25/26-Postponed-Spiele)');
}

console.log('');
console.log('== ID-Set-Vergleich: neue ID ==');
{
  const oldGames = [sampleGame({ id: 3001 }), sampleGame({ id: 3002 })];
  const newGames = [sampleGame({ id: 3001 }), sampleGame({ id: 3002 }), sampleGame({ id: 3003 })];
  const diff = diffGameIds(oldGames, newGames);
  assertEqual(diff.added, ['3003'], 'neue ID 3003 erkannt');
  assertEqual(diff.removed, [], 'keine ID verschwunden');
  assertEqual(diff.unchanged, ['3001', '3002'], 'bestehende IDs unverändert erkannt');
}

console.log('');
console.log('== ID-Set-Vergleich: verschwundene ID ==');
{
  const oldGames = [sampleGame({ id: 4001 }), sampleGame({ id: 4002 }), sampleGame({ id: 4003 })];
  const newGames = [sampleGame({ id: 4001 }), sampleGame({ id: 4003 })];
  const diff = diffGameIds(oldGames, newGames);
  assertEqual(diff.added, [], 'keine neue ID');
  assertEqual(diff.removed, ['4002'], 'verschwundene ID 4002 erkannt');
  assertEqual(diff.unchanged, ['4001', '4003'], 'verbleibende IDs korrekt erkannt');
}

console.log('');
console.log('== ID-Set-Vergleich: identische alte/neue Datei ==');
{
  const games = [sampleGame({ id: 5001 }), sampleGame({ id: 5002 }), sampleGame({ id: 5003 })];
  const diff = diffGameIds(games, games);
  assertEqual(diff.added, [], 'keine neuen IDs bei identischer Datei');
  assertEqual(diff.removed, [], 'keine verschwundenen IDs bei identischer Datei');
  assertEqual(diff.unchanged, ['5001', '5002', '5003'], 'alle IDs als unverändert erkannt');
}

console.log('');
if (failures > 0) {
  console.log(`${failures} Test(s) fehlgeschlagen.`);
  process.exitCode = 1;
} else {
  console.log('Alle Tests erfolgreich.');
}

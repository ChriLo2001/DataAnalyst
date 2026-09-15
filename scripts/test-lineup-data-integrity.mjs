#!/usr/bin/env node
// Offline-Testharness für scripts/check-lineup-data-integrity.mjs (Phase 3.5)
// — kein Netzwerk, kein API-Key.
//
// Teil 1: Grundbausteine (seasonKeyFromFileName, fileNameFromSeasonKey,
//         normalizeSeasonArg).
// Teil 2: checkLineupDataIntegrity() end-to-end (synthetisch) — Tests A-M.
// Teil 3: N (Quelltext-Verifikation: kein Schreibzugriff) + O (echter
//         Smoke-Test gegen die tatsächlich vorhandenen Dateien).
//
// Node.js ist in dieser Umgebung nicht installiert — Ausführung über die
// etablierte Browser-/V8-Methode (siehe Abschlussbericht).
//
// Aufruf: node scripts/test-lineup-data-integrity.mjs

import { readFile } from 'node:fs/promises';
import path from 'node:path';

import { checkLineupDataIntegrity, seasonKeyFromFileName, fileNameFromSeasonKey, normalizeSeasonArg } from './check-lineup-data-integrity.mjs';

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
function assertTrue(cond, label) { assertEqual(Boolean(cond), true, label); }
function assertFalse(cond, label) { assertEqual(Boolean(cond), false, label); }

// ─────────────────────────────────────────────────────────────────────────
// Synthetische Fixtures
// ─────────────────────────────────────────────────────────────────────────

const SEASON_A = '25/26';
const SEASON_B = '26/27';
const GROUP_1 = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa';
const GROUP_2 = 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb';

function sourceGame(id, overrides = {}) {
  return {
    id, date: '2026-01-01', league_id: 1, league_name: 'Liga',
    home_team_name: 'VfB Ulm', guest_team_name: 'Gegner',
    started: true, ended: true, notice_type: null,
    players: {
      home: [
        { player_id: 90001, player_name: 'A' },
        { player_id: 90002, player_name: 'B' },
        { player_id: 90003, player_name: 'C' },
        { player_id: 90004, player_name: 'D' },
        { player_id: 90010, player_name: 'GK' },
      ],
      guest: [],
    },
    ...overrides,
  };
}
const SOURCE_A = { season: SEASON_A, games: [sourceGame(80001), sourceGame(80002), sourceGame(80003, { notice_type: 'Postponed' })] };
const SOURCE_B = { season: SEASON_B, games: [sourceGame(81001)] };

function lineupFileA(overrides = {}) {
  return {
    seasonKey: SEASON_A, fileName: '25-26.json', readError: null,
    data: {
      schemaVersion: 1, season: SEASON_A,
      games: [{
        gameId: 80001,
        roster: { field: ['api:90001', 'api:90002', 'api:90003'], goalies: ['api:90010'] },
        groups: [{ groupId: GROUP_1, name: 'Reihe', type: 'trio', players: [{ playerId: 'api:90001' }, { playerId: 'api:90002' }, { playerId: 'api:90003' }], notes: '' }],
        confirmedCombinations: [{ players: ['api:90001', 'api:90002', 'api:90003'], groupId: GROUP_1, note: '' }],
        note: '',
      }],
      ...overrides,
    },
  };
}
function lineupFileB() {
  return {
    seasonKey: SEASON_B, fileName: '26-27.json', readError: null,
    data: {
      schemaVersion: 1, season: SEASON_B,
      games: [{
        gameId: 81001,
        roster: { field: ['api:90001'], goalies: [] },
        groups: [{ groupId: GROUP_1, name: 'Reihe (andere Saison, gleiche Gruppe)', type: 'trio', players: [{ playerId: 'api:90001' }], notes: '' }],
        confirmedCombinations: [],
        note: '',
      }],
    },
  };
}
function registryFixture() {
  return {
    data: {
      schemaVersion: 1,
      groups: [{
        groupId: GROUP_1, currentName: 'Reihe', createdInSeason: SEASON_A, createdInGame: 80001,
        nameHistory: [{ name: 'Reihe', since: { season: SEASON_A, gameId: 80001 } }],
      }],
    },
    readError: null,
  };
}
function seasonDataMap({ includeB = true } = {}) {
  const m = new Map();
  m.set(SEASON_A, { data: SOURCE_A, readError: null });
  if (includeB) m.set(SEASON_B, { data: SOURCE_B, readError: null });
  return m;
}

// ═════════════════════════════════════════════════════════════════════════
// Teil 1: Grundbausteine
// ═════════════════════════════════════════════════════════════════════════
console.log('== Grundbausteine ==');
assertEqual(seasonKeyFromFileName('25-26.json'), '25/26', 'seasonKeyFromFileName: gültiger Dateiname');
assertEqual(seasonKeyFromFileName('groups.json'), null, 'seasonKeyFromFileName: groups.json liefert null');
assertEqual(seasonKeyFromFileName('irgendwas.txt'), null, 'seasonKeyFromFileName: unpassender Dateiname liefert null');
assertEqual(fileNameFromSeasonKey('25/26'), '25-26.json', 'fileNameFromSeasonKey: Umkehrfunktion');
assertEqual(normalizeSeasonArg('25-26'), '25/26', 'normalizeSeasonArg: CLI-Form (Bindestrich) wird normalisiert');
assertEqual(normalizeSeasonArg('25/26'), '25/26', 'normalizeSeasonArg: interne Form bleibt gültig');
assertEqual(normalizeSeasonArg('nonsense'), null, 'normalizeSeasonArg: ungültiger Wert liefert null');

// ═════════════════════════════════════════════════════════════════════════
// Teil 2: checkLineupDataIntegrity() — Tests A-M
// ═════════════════════════════════════════════════════════════════════════
console.log('');
console.log('== A) komplett konsistente Daten -> PASS ==');
{
  const report = checkLineupDataIntegrity({ lineupFiles: [lineupFileA()], registry: registryFixture(), seasonDataBySeason: seasonDataMap() });
  assertTrue(report.ok, 'konsistente Daten sind PASS');
  assertEqual(report.errors, [], 'keine Fehler');
  assertEqual(report.warnings, [], 'keine Warnungen');
  assertEqual(report.summary.seasonsChecked, 1, 'summary.seasonsChecked korrekt');
  assertEqual(report.summary.gamesChecked, 1, 'summary.gamesChecked korrekt');
}

console.log('');
console.log('== B) unbekannte gameId -> ERROR ==');
{
  const file = lineupFileA({ games: [{ gameId: 99999, roster: { field: ['api:90001'], goalies: [] }, groups: [], confirmedCombinations: [], note: '' }] });
  const report = checkLineupDataIntegrity({ lineupFiles: [file], registry: registryFixture(), seasonDataBySeason: seasonDataMap() });
  assertFalse(report.ok, 'unbekannte gameId -> nicht ok');
  assertTrue(report.errors.some((e) => e.code === 'UNKNOWN_GAME_ID' && e.gameId === 99999 && e.season === SEASON_A), 'Fehlercode UNKNOWN_GAME_ID mit korrekten Feldern');
}

console.log('');
console.log('== C) unbekannte playerId -> ERROR ==');
{
  const file = lineupFileA({ games: [{ gameId: 80001, roster: { field: ['api:90001', 'api:77777'], goalies: ['api:90010'] }, groups: [], confirmedCombinations: [], note: '' }] });
  const report = checkLineupDataIntegrity({ lineupFiles: [file], registry: registryFixture(), seasonDataBySeason: seasonDataMap() });
  assertFalse(report.ok, 'unbekannte playerId -> nicht ok');
  assertTrue(report.errors.some((e) => e.code === 'UNKNOWN_PLAYER_ID' && e.playerId === 'api:77777'), 'Fehlercode UNKNOWN_PLAYER_ID mit korrekter playerId');
}

console.log('');
console.log('== D) unbekannte groupId -> ERROR ==');
{
  const file = lineupFileA({
    games: [{
      gameId: 80001,
      roster: { field: ['api:90001', 'api:90002', 'api:90003'], goalies: ['api:90010'] },
      groups: [{ groupId: GROUP_2, name: 'X', type: 'trio', players: [{ playerId: 'api:90001' }, { playerId: 'api:90002' }, { playerId: 'api:90003' }], notes: '' }],
      confirmedCombinations: [], note: '',
    }],
  });
  const report = checkLineupDataIntegrity({ lineupFiles: [file], registry: registryFixture(), seasonDataBySeason: seasonDataMap() });
  assertFalse(report.ok, 'unbekannte groupId -> nicht ok');
  assertTrue(report.errors.some((e) => e.code === 'UNKNOWN_GROUP_ID' && e.groupId === GROUP_2), 'Fehlercode UNKNOWN_GROUP_ID mit korrekter groupId');
}

console.log('');
console.log('== E) ungültiges createdInSeason -> ERROR ==');
{
  const registry = { data: { schemaVersion: 1, groups: [{ groupId: GROUP_1, currentName: 'X', createdInSeason: '99/00', createdInGame: 1, nameHistory: [] }] }, readError: null };
  const report = checkLineupDataIntegrity({ lineupFiles: [], registry, seasonDataBySeason: seasonDataMap() });
  assertFalse(report.ok, 'createdInSeason ohne season-data -> nicht ok');
  assertTrue(report.errors.some((e) => e.code === 'REGISTRY_UNKNOWN_CREATED_SEASON'), 'Fehlercode REGISTRY_UNKNOWN_CREATED_SEASON');
}
{
  const registry = { data: { schemaVersion: 1, groups: [{ groupId: GROUP_1, currentName: 'X', createdInSeason: 'nicht-mal-eine-saison', createdInGame: 1, nameHistory: [] }] }, readError: null };
  const report = checkLineupDataIntegrity({ lineupFiles: [], registry, seasonDataBySeason: seasonDataMap() });
  assertFalse(report.ok, 'strukturell ungültiges createdInSeason-Format -> nicht ok');
  assertTrue(report.errors.some((e) => e.code === 'REGISTRY_INVALID_CREATED_SEASON_FORMAT'), 'Fehlercode REGISTRY_INVALID_CREATED_SEASON_FORMAT');
}

console.log('');
console.log('== F) ungültiges createdInGame -> ERROR ==');
{
  const registry = { data: { schemaVersion: 1, groups: [{ groupId: GROUP_1, currentName: 'X', createdInSeason: SEASON_A, createdInGame: 99999, nameHistory: [] }] }, readError: null };
  const report = checkLineupDataIntegrity({ lineupFiles: [], registry, seasonDataBySeason: seasonDataMap() });
  assertFalse(report.ok, 'createdInGame nicht in season-data -> nicht ok');
  assertTrue(report.errors.some((e) => e.code === 'REGISTRY_UNKNOWN_CREATED_GAME'), 'Fehlercode REGISTRY_UNKNOWN_CREATED_GAME');
}

console.log('');
console.log('== G) ungültige nameHistory-Saison -> ERROR ==');
{
  const registry = { data: { schemaVersion: 1, groups: [{ groupId: GROUP_1, currentName: 'X', createdInSeason: SEASON_A, createdInGame: 80001, nameHistory: [{ name: 'X', since: { season: '99/00', gameId: 1 } }] }] }, readError: null };
  const report = checkLineupDataIntegrity({ lineupFiles: [], registry, seasonDataBySeason: seasonDataMap() });
  assertFalse(report.ok, 'nameHistory referenziert unbekannte Saison -> nicht ok');
  assertTrue(report.errors.some((e) => e.code === 'REGISTRY_UNKNOWN_HISTORY_SEASON'), 'Fehlercode REGISTRY_UNKNOWN_HISTORY_SEASON');
}
{
  const registry = { data: { schemaVersion: 1, groups: [{ groupId: GROUP_1, currentName: 'X', createdInSeason: SEASON_A, createdInGame: 80001, nameHistory: [{ name: 'X', since: { season: SEASON_A, gameId: 99999 } }] }] }, readError: null };
  const report = checkLineupDataIntegrity({ lineupFiles: [], registry, seasonDataBySeason: seasonDataMap() });
  assertFalse(report.ok, 'nameHistory referenziert unbekannte gameId (bekannte Saison) -> nicht ok');
  assertTrue(report.errors.some((e) => e.code === 'REGISTRY_UNKNOWN_HISTORY_GAME'), 'Fehlercode REGISTRY_UNKNOWN_HISTORY_GAME');
}

console.log('');
console.log('== H) Cross-Season-Wiederverwendung derselben Gruppe -> PASS ==');
{
  const report = checkLineupDataIntegrity({ lineupFiles: [lineupFileA(), lineupFileB()], registry: registryFixture(), seasonDataBySeason: seasonDataMap() });
  assertTrue(report.ok, 'dieselbe groupId in zwei verschiedenen Saisons verwendet -> PASS (clubweite Registry, keine createdInSeason-Beschränkung)');
}

console.log('');
console.log('== I) Gruppe in mehreren Spielen -> PASS ==');
{
  const file = lineupFileA({
    games: [
      { gameId: 80001, roster: { field: ['api:90001', 'api:90002', 'api:90003'], goalies: ['api:90010'] }, groups: [{ groupId: GROUP_1, name: 'Reihe', type: 'trio', players: [{ playerId: 'api:90001' }, { playerId: 'api:90002' }, { playerId: 'api:90003' }], notes: '' }], confirmedCombinations: [], note: '' },
      { gameId: 80002, roster: { field: ['api:90001', 'api:90004'], goalies: ['api:90010'] }, groups: [{ groupId: GROUP_1, name: 'Reihe', type: 'trio', players: [{ playerId: 'api:90001' }, { playerId: 'api:90004' }], notes: '' }], confirmedCombinations: [], note: '' },
    ],
  });
  const report = checkLineupDataIntegrity({ lineupFiles: [file], registry: registryFixture(), seasonDataBySeason: seasonDataMap() });
  assertTrue(report.ok, 'dieselbe groupId in mehreren Spielen derselben Saison -> PASS');
}

console.log('');
console.log('== J) Spieler in mehreren Gruppen -> PASS ==');
{
  const file = lineupFileA({
    games: [{
      gameId: 80001,
      roster: { field: ['api:90001', 'api:90002', 'api:90003', 'api:90004'], goalies: ['api:90010'] },
      groups: [
        { groupId: GROUP_1, name: 'Reihe1', type: 'trio', players: [{ playerId: 'api:90001' }, { playerId: 'api:90002' }, { playerId: 'api:90003' }], notes: '' },
        { groupId: GROUP_2, name: 'Reihe2', type: 'trio', players: [{ playerId: 'api:90001' }, { playerId: 'api:90004' }], notes: '' },
      ],
      confirmedCombinations: [], note: '',
    }],
  });
  const registry = {
    data: {
      schemaVersion: 1,
      groups: [
        { groupId: GROUP_1, currentName: 'Reihe1', createdInSeason: SEASON_A, createdInGame: 80001, nameHistory: [{ name: 'Reihe1', since: { season: SEASON_A, gameId: 80001 } }] },
        { groupId: GROUP_2, currentName: 'Reihe2', createdInSeason: SEASON_A, createdInGame: 80001, nameHistory: [{ name: 'Reihe2', since: { season: SEASON_A, gameId: 80001 } }] },
      ],
    },
    readError: null,
  };
  const report = checkLineupDataIntegrity({ lineupFiles: [file], registry, seasonDataBySeason: seasonDataMap() });
  assertTrue(report.ok, 'Spieler A gleichzeitig in zwei Gruppen -> PASS');
}

console.log('');
console.log('== K) fehlender/kaputter season-data-Bezug -> ERROR ==');
{
  const report = checkLineupDataIntegrity({ lineupFiles: [lineupFileA()], registry: registryFixture(), seasonDataBySeason: new Map() });
  assertFalse(report.ok, 'fehlende season-data -> nicht ok');
  assertTrue(report.errors.some((e) => e.code === 'MISSING_SEASON_DATA'), 'Fehlercode MISSING_SEASON_DATA bei komplett fehlender Datei');
}
{
  const map = new Map([[SEASON_A, { data: null, readError: 'ungültiges JSON' }]]);
  const report = checkLineupDataIntegrity({ lineupFiles: [lineupFileA()], registry: registryFixture(), seasonDataBySeason: map });
  assertFalse(report.ok, 'kaputte season-data-Datei -> nicht ok');
  assertTrue(report.errors.some((e) => e.code === 'MISSING_SEASON_DATA'), 'Fehlercode MISSING_SEASON_DATA bei readError');
}

console.log('');
console.log('== L) mehrere Fehler gleichzeitig -> alle werden gesammelt ==');
{
  const file = lineupFileA({
    games: [{
      gameId: 99999,
      roster: { field: ['api:90001', 'api:77777'], goalies: [] },
      groups: [{ groupId: GROUP_2, name: 'X', type: 'trio', players: [{ playerId: 'api:90001' }, { playerId: 'api:77777' }, { playerId: 'api:90002' }], notes: '' }],
      confirmedCombinations: [], note: '',
    }],
  });
  const report = checkLineupDataIntegrity({ lineupFiles: [file], registry: registryFixture(), seasonDataBySeason: seasonDataMap() });
  assertFalse(report.ok, 'mehrere gleichzeitige Fehler -> nicht ok');
  const codes = new Set(report.errors.map((e) => e.code));
  assertTrue(codes.has('UNKNOWN_GAME_ID'), 'enthält UNKNOWN_GAME_ID');
  assertTrue(codes.has('UNKNOWN_PLAYER_ID'), 'enthält UNKNOWN_PLAYER_ID');
  assertTrue(codes.has('UNKNOWN_GROUP_ID'), 'enthält UNKNOWN_GROUP_ID');
  assertTrue(report.errors.length >= 3, 'mindestens 3 unterschiedliche Fehler gesammelt, kein Abbruch beim ersten');
}

console.log('');
console.log('== M) Checker verändert keine Eingabeobjekte ==');
{
  const file = lineupFileA();
  const registry = registryFixture();
  const seasonData = seasonDataMap();
  const beforeFile = JSON.stringify(file);
  const beforeRegistry = JSON.stringify(registry);
  const beforeSeasonA = JSON.stringify(seasonData.get(SEASON_A));
  checkLineupDataIntegrity({ lineupFiles: [file], registry, seasonDataBySeason: seasonData });
  assertEqual(JSON.stringify(file), beforeFile, 'lineupFile-Eingabe unverändert');
  assertEqual(JSON.stringify(registry), beforeRegistry, 'registry-Eingabe unverändert');
  assertEqual(JSON.stringify(seasonData.get(SEASON_A)), beforeSeasonA, 'seasonDataBySeason-Eintrag unverändert');
}

// ═════════════════════════════════════════════════════════════════════════
// Teil 3: N (Quelltext-Verifikation) + O (echter Smoke-Test)
// ═════════════════════════════════════════════════════════════════════════
console.log('');
console.log('== N) Checker verändert keine Dateien (Quelltext-Verifikation) ==');
{
  const src = await readFile(path.join(REPO_ROOT, 'scripts', 'check-lineup-data-integrity.mjs'), 'utf8');
  assertFalse(src.includes('writeFile'), 'Quelltext enthält keinen writeFile-Aufruf');
  assertFalse(src.includes('rename('), 'Quelltext enthält keinen rename-Aufruf');
  assertFalse(src.includes("mkdir("), 'Quelltext enthält keinen mkdir-Aufruf');
  assertFalse(src.includes("'--fix'") || src.includes('"--fix"'), 'Quelltext kennt keine --fix-Option');
}

console.log('');
console.log('== O) echter Smoke-Test gegen die tatsächlich vorhandenen Dateien ==');
{
  const realLineupData = JSON.parse(await readFile(path.join(REPO_ROOT, 'lineup-data', '25-26.json'), 'utf8'));
  const realRegistryData = JSON.parse(await readFile(path.join(REPO_ROOT, 'lineup-data', 'groups.json'), 'utf8'));
  const realSourceData = JSON.parse(await readFile(path.join(REPO_ROOT, 'season-data', '25-26.json'), 'utf8'));

  const lineupFiles = [{ seasonKey: '25/26', fileName: '25-26.json', data: realLineupData, readError: null }];
  const registry = { data: realRegistryData, readError: null };
  const seasonDataBySeason = new Map([['25/26', { data: realSourceData, readError: null }]]);

  const report = checkLineupDataIntegrity({ lineupFiles, registry, seasonDataBySeason });

  assertFalse(
    report.ok,
    'echter Smoke-Test: erwartungsgemäß FEHLER, da lineup-data/25-26.json bewusst synthetische Phase-1-Platzhalterdaten ' +
      '(gameId 99999001, Spieler api:9000xx) enthält, die nicht in der echten season-data existieren',
  );
  assertTrue(report.errors.some((e) => e.code === 'UNKNOWN_GAME_ID' && e.gameId === 99999001), 'Checker erkennt konkret die bekannte Platzhalter-gameId 99999001 als UNKNOWN_GAME_ID');
  assertTrue(report.errors.some((e) => e.code === 'REGISTRY_UNKNOWN_CREATED_GAME'), 'Checker erkennt, dass die Registry ebenfalls auf die Platzhalter-gameId verweist (REGISTRY_UNKNOWN_CREATED_GAME)');
  assertTrue(report.summary.gamesChecked >= 1, 'Checker hat die echte Datei tatsächlich geladen und mindestens 1 Spiel geprüft');
  assertEqual(report.summary.seasonsChecked, 1, 'genau 1 Saison geprüft (25/26)');
}

// ─────────────────────────────────────────────────────────────────────────
console.log('');
if (failures > 0) {
  console.log(`${failures} Test(s) fehlgeschlagen.`);
  process.exitCode = 1;
} else {
  console.log('Alle Tests erfolgreich.');
}

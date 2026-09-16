#!/usr/bin/env node
// Tests für scripts/matchday-derivation.mjs (P0a.5). Reine Logik, kein
// Netzwerk, keine Mutation — liest lediglich die echten season-data/*.json
// (read-only) sowie ein paar synthetische Games für Grenzfälle (geplant),
// die real in keiner der 5 Saisons vorkommen.
//
// Aufruf: node scripts/test-matchday-derivation.mjs

import { readFile } from 'node:fs/promises';
import path from 'node:path';

import { buildMatchdays } from './matchday-derivation.mjs';
import { compareGamesChronologically } from './game-ordering.mjs';

const REPO_ROOT = path.resolve(import.meta.dirname, '..');
const SEASON_FILES = ['21-22.json', '22-23.json', '23-24.json', '24-25.json', '25-26.json'];
const EXPECTED_MATCHDAY_COUNTS = { '21-22.json': 11, '22-23.json': 9, '23-24.json': 9, '24-25.json': 7, '25-26.json': 8 };
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

async function loadSeason(file) {
  const raw = await readFile(path.join(REPO_ROOT, 'season-data', file), 'utf8');
  return JSON.parse(raw);
}

console.log('== 1+2: alle 5 realen Saisons, erwartete Matchday-Anzahl ==');
const loadedSeasons = {};
for (const file of SEASON_FILES) {
  const seasonData = await loadSeason(file);
  loadedSeasons[file] = seasonData;
  const matchdays = buildMatchdays(seasonData);
  assertEqual(matchdays.length, EXPECTED_MATCHDAY_COUNTS[file], `${file}: ${EXPECTED_MATCHDAY_COUNTS[file]} Matchdays (game_day.game_day_number-Gruppen)`);
}

console.log('== 3+4+5+6: key/seasonKey/number/date korrekt ==');
{
  const seasonData = loadedSeasons['25-26.json'];
  const matchdays = buildMatchdays(seasonData);
  const keys = matchdays.map((m) => m.key);
  assertEqual(new Set(keys).size, keys.length, 'alle keys sind untereinander eindeutig');
  assertTrue(matchdays.every((m) => m.seasonKey === '25/26'), 'seasonKey ist für jeden Matchday exakt "25/26" (aus seasonData.season)');
  assertTrue(matchdays.every((m) => m.key === `25/26#${m.number}`), 'key hat exakt die Form "<seasonKey>#<number>"');
  const md4 = matchdays.find((m) => m.number === 4);
  assertTrue(!!md4, 'Matchday Nummer 4 gefunden');
  assertEqual(md4.date, '2026-01-25', 'Matchday 4: date ist das früheste Datum der Gruppe');
  assertEqual(md4.games.length, 8, 'Matchday 4: 8 Spiele (bestätigt gegen reale Daten)');
}

console.log('== 7+8+9: jedes Spiel genau einmal, keine verloren, keine dupliziert ==');
for (const file of SEASON_FILES) {
  const seasonData = loadedSeasons[file];
  const matchdays = buildMatchdays(seasonData);
  const allIdsInMatchdays = matchdays.flatMap((m) => m.games.map((g) => g.id));
  const originalIds = seasonData.games.map((g) => g.id);
  assertEqual(allIdsInMatchdays.length, originalIds.length, `${file}: Gesamtzahl Spiele über alle Matchdays === Gesamtzahl Original-Spiele`);
  assertEqual([...allIdsInMatchdays].sort((a, b) => a - b), [...originalIds].sort((a, b) => a - b), `${file}: exakt dieselbe Menge an Game-IDs, keine verloren/dupliziert`);
  assertEqual(new Set(allIdsInMatchdays).size, allIdsInMatchdays.length, `${file}: keine Game-ID taucht in mehr als einem Matchday auf`);
}

console.log('== 10: Spiele innerhalb eines Matchdays chronologisch sortiert ==');
for (const file of SEASON_FILES) {
  const matchdays = buildMatchdays(loadedSeasons[file]);
  const allOrdered = matchdays.every((m) => {
    for (let i = 0; i < m.games.length - 1; i++) {
      if (compareGamesChronologically(m.games[i], m.games[i + 1]) > 0) return false;
    }
    return true;
  });
  assertTrue(allOrdered, `${file}: in jedem Matchday sind die Spiele chronologisch (compareGamesChronologically) sortiert`);
}

console.log('== 11: Gruppierung unabhängig von Eingabereihenfolge ==');
{
  const seasonData = loadedSeasons['25-26.json'];
  const shuffled = { ...seasonData, games: [...seasonData.games].reverse() };
  const a = buildMatchdays(seasonData);
  const b = buildMatchdays(shuffled);
  const normalize = (mds) => mds.map((m) => ({ ...m, games: m.games.map((g) => g.id) })).sort((x, y) => (x.number ?? 0) - (y.number ?? 0));
  assertEqual(JSON.stringify(normalize(a)), JSON.stringify(normalize(b)), '25-26.json: umgekehrte Eingabereihenfolge liefert identisches Ergebnis (Matchdays + Spielzuordnung + Sortierung)');
}

console.log('== 12: game_day_id wird NICHT zur Gruppierung verwendet (game_day.game_day_number ist maßgeblich) ==');
{
  // Gegenprobe: game_day_id existiert als Feld ueberhaupt nur in 25-26.json.
  // In den anderen 4 Saisons kommt der Schluessel im Rohtext kein einziges
  // Mal vor - eine Gruppierung danach waere dort technisch unmoeglich bzw.
  // wuerde (bei einem einzigen impliziten "undefined"-Bucket) faelschlich
  // ALLE Spiele einer Saison in einen einzigen Matchday zusammenfassen.
  for (const file of ['21-22.json', '22-23.json', '23-24.json', '24-25.json']) {
    const seasonData = loadedSeasons[file];
    const anyHasGameDayId = seasonData.games.some((g) => g.game_day_id !== undefined);
    assertTrue(!anyHasGameDayId, `${file}: Gegenprobe — game_day_id ist im Rohtext ueberhaupt nicht vorhanden (0 Spiele mit diesem Feld)`);
    const matchdays = buildMatchdays(seasonData);
    assertTrue(matchdays.length > 1 && matchdays.length < seasonData.games.length, `${file}: buildMatchdays gruppiert dennoch korrekt in mehrere plausible Matchdays (${matchdays.length}) statt in 1 (waere die Folge einer game_day_id-Gruppierung) oder ${seasonData.games.length} (ein Matchday pro Spiel) — bestätigt game_day.game_day_number als tatsächlich verwendetes Feld`);
  }
  // Positivprobe: in 25-26.json existiert game_day_id auf jedem Spiel, gruppiert
  // aber feiner (12 Werte) als der echte Spieltag (8) - buildMatchdays darf
  // trotzdem exakt 8 liefern.
  const seasonData2526 = loadedSeasons['25-26.json'];
  const uniqueGameDayIds2526 = new Set(seasonData2526.games.map((g) => g.game_day_id));
  assertTrue(seasonData2526.games.every((g) => g.game_day_id !== undefined), '25-26.json: game_day_id ist dort auf jedem Spiel vorhanden');
  assertEqual(uniqueGameDayIds2526.size, 12, '25-26.json: game_day_id hat 12 unterschiedliche Werte (feiner als der echte Spieltag)');
  assertEqual(buildMatchdays(seasonData2526).length, 8, '25-26.json: buildMatchdays liefert trotzdem korrekt 8 Matchdays (game_day.game_day_number), nicht 12 (game_day_id)');
}

console.log('== 13: abgeschlossene Matchdays (reale Daten) ==');
{
  const matchdays = buildMatchdays(loadedSeasons['25-26.json']);
  const md3 = matchdays.find((m) => m.number === 3);
  assertTrue(!!md3 && md3.status === 'abgeschlossen', 'Matchday 3 (25/26): alle Spiele ended:true -> "abgeschlossen"', md3?.status);
}

console.log('== 14: geplanter Matchday (synthetisch, da in den 5 realen Saisons kein volltändig ungespielter Matchday existiert) ==');
{
  const synthetic = {
    season: '99/00',
    games: [
      { id: 1, date: '2099-01-01', start_time: '11:00', game_number: '1', ended: false, home_team_name: 'A', guest_team_name: 'B', game_day: { game_day_number: 1 } },
      { id: 2, date: '2099-01-01', start_time: '13:00', game_number: '2', ended: false, home_team_name: 'C', guest_team_name: 'D', game_day: { game_day_number: 1 } },
    ],
  };
  const matchdays = buildMatchdays(synthetic);
  assertEqual(matchdays.length, 1, 'synthetischer Matchday: genau 1 Gruppe');
  assertEqual(matchdays[0].status, 'geplant', 'kein Spiel ended:true -> Status "geplant"');
}

console.log('== 15: postponed Matchday anhand realer Daten (25/26 Matchday 1 und 2 enthalten je 2 Postponed-Spiele) ==');
{
  const matchdays = buildMatchdays(loadedSeasons['25-26.json']);
  const md1 = matchdays.find((m) => m.number === 1);
  const md2 = matchdays.find((m) => m.number === 2);
  const postponedIn = (m) => m.games.filter((g) => g.notice_type === 'Postponed').length;
  assertTrue(postponedIn(md1) === 2 && md1.status === 'unvollstaendig', 'Matchday 1 (25/26): 2 Postponed-Spiele (ended:false) unter sonst beendeten Spielen -> "unvollstaendig", nicht "abgeschlossen"', { postponed: postponedIn(md1), status: md1.status });
  assertTrue(postponedIn(md2) === 2 && md2.status === 'unvollstaendig', 'Matchday 2 (25/26): ebenso "unvollstaendig" statt fälschlich "abgeschlossen"', { postponed: postponedIn(md2), status: md2.status });
}

console.log('== 16: Matchdays mit mehreren Spielen am selben Datum (Regelfall) ==');
{
  const matchdays = buildMatchdays(loadedSeasons['25-26.json']);
  const md3 = matchdays.find((m) => m.number === 3);
  assertTrue(md3.games.every((g) => g.date === md3.date), 'Matchday 3 (25/26): alle 8 Spiele tatsächlich am selben Datum wie matchday.date');
}

console.log('== 17: reale Matchdays mit identischem date+start_time auf Spielebene (echte Gleichzeitigkeit) ==');
{
  const matchdays = buildMatchdays(loadedSeasons['25-26.json']);
  const md4 = matchdays.find((m) => m.number === 4);
  const at1450 = md4.games.filter((g) => g.start_time === '14:50');
  assertEqual(at1450.map((g) => g.id).sort((a, b) => a - b), [44400, 44704], 'Matchday 4 (25/26): beide real zeitgleichen Spiele (14:50 Uhr, IDs 44400+44704) sind im selben Matchday enthalten, keines geht verloren');
}

console.log('== 18: Ulm-/SG-Team-Zuordnung anhand bestehender Teamlogik nutzbar (buildMatchdays liefert nur Rohnamen, Erkennung bleibt Sache des Aufrufers) ==');
{
  // Minimaler, lokal nachgebauter Ausschnitt der bestehenden Logik aus index.html
  // NUR zur Verifikation, dass die von buildMatchdays gelieferten Rohnamen mit
  // ihr kompatibel sind — keine neue/parallele Team-Erkennung, reiner Test.
  function normalizeTeamNameLike(name) {
    return String(name || '')
      .toLowerCase()
      .normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9]+/g, ' ')
      .trim();
  }
  const ULM_ALIASES = ['vfb ulm', 'sg sparks ulm tubingen', 'sg sparks tubingen ulm'].map(normalizeTeamNameLike);
  function isUlmTeamNameLike(name) {
    const n = normalizeTeamNameLike(name);
    return ULM_ALIASES.includes(n) || (n.includes('vfb') && n.includes('ulm'));
  }

  const md25 = buildMatchdays(loadedSeasons['25-26.json']).find((m) => m.number === 1);
  const ulmKeys = Object.keys(md25.teamGames).filter(isUlmTeamNameLike);
  assertEqual(ulmKeys, ['VfB Ulm'], 'Matchday 1 (25/26): genau der teamGames-Schlüssel "VfB Ulm" wird von der bestehenden Ulm-Erkennung als Ulm identifiziert');

  const md21 = buildMatchdays(loadedSeasons['21-22.json']).find((m) => m.number === 1);
  const sgKeys = Object.keys(md21.teamGames).filter(isUlmTeamNameLike);
  assertEqual(sgKeys, ['SG Sparks Tübingen-Ulm'], '21/22 (SG-Saison) Matchday 1: der SG-Teamname wird ebenfalls korrekt als Ulm-zugehörig erkannt, ohne dass buildMatchdays selbst SG-Logik enthält');
}

console.log('== 19: Input-Daten werden nicht mutiert ==');
{
  const seasonData = loadedSeasons['25-26.json'];
  const beforeGamesSnapshot = JSON.stringify(seasonData.games);
  const beforeSeasonSnapshot = JSON.stringify(seasonData);
  buildMatchdays(seasonData);
  assertEqual(JSON.stringify(seasonData), beforeSeasonSnapshot, 'seasonData insgesamt unverändert nach buildMatchdays()');
  assertEqual(JSON.stringify(seasonData.games), beforeGamesSnapshot, 'seasonData.games[] (inkl. aller einzelnen Game-Objekte) unverändert nach buildMatchdays()');
}

console.log('== 20: wiederholte Ausführung ist byte-/reihenfolgen-identisch ==');
for (const file of SEASON_FILES) {
  const seasonData = loadedSeasons[file];
  const run1 = JSON.stringify(buildMatchdays(seasonData));
  const run2 = JSON.stringify(buildMatchdays(seasonData));
  const run3 = JSON.stringify(buildMatchdays(JSON.parse(JSON.stringify(seasonData))));
  assertEqual(run1, run2, `${file}: zwei aufeinanderfolgende Aufrufe liefern byte-identisches JSON`);
  assertEqual(run1, run3, `${file}: Aufruf auf einer unabhängigen tiefen Kopie derselben Daten liefert dasselbe Ergebnis`);
}

console.log('');
if (failures > 0) {
  console.log(`${failures} Test(s) fehlgeschlagen.`);
  process.exitCode = 1;
} else {
  console.log('Alle Tests erfolgreich.');
}

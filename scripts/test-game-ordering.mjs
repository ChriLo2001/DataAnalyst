#!/usr/bin/env node
// Tests für scripts/game-ordering.mjs (P0a.3). Reine Logik, kein Netzwerk,
// keine Mutation — liest lediglich die echten season-data/*.json-Dateien als
// reale Beispiel-Spiele (read-only) für Fall 8.
//
// Aufruf: node scripts/test-game-ordering.mjs

import { readFile } from 'node:fs/promises';
import path from 'node:path';

import { compareGamesChronologically } from './game-ordering.mjs';

const REPO_ROOT = path.resolve(import.meta.dirname, '..');
const SEASON_FILES = ['21-22.json', '22-23.json', '23-24.json', '24-25.json', '25-26.json'];
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

function game(overrides = {}) {
  return { id: 1, date: '2025-10-05', start_time: '11:00', game_number: '1', ...overrides };
}

console.log('== 1+2: date entscheidet (symmetrisch) ==');
{
  const early = game({ date: '2025-10-04' });
  const late = game({ date: '2025-10-05' });
  assertTrue(compareGamesChronologically(early, late) < 0, 'früheres date < späteres date -> negativ');
  assertTrue(compareGamesChronologically(late, early) > 0, 'späteres date > früheres date -> positiv');
}

console.log('== 3: identisches date -> start_time entscheidet ==');
{
  const a = game({ start_time: '11:00' });
  const b = game({ start_time: '14:30' });
  assertTrue(compareGamesChronologically(a, b) < 0, '11:00 vor 14:30 am selben Tag');
  assertTrue(compareGamesChronologically(b, a) > 0, '14:30 nach 11:00 am selben Tag');
}

console.log('== 4: identisches date+start_time -> game_number entscheidet (NUMERISCH, nicht String!) ==');
{
  const a = game({ game_number: '2' });
  const b = game({ game_number: '10' });
  assertTrue(compareGamesChronologically(a, b) < 0, 'game_number 2 vor 10 (numerischer Vergleich, nicht "10" < "2" wie bei String-Vergleich)');
  assertTrue(compareGamesChronologically(b, a) > 0, 'game_number 10 nach 2');
}

console.log('== 5: identisches date+start_time+game_number -> id entscheidet ==');
{
  const a = game({ id: 100 });
  const b = game({ id: 200 });
  assertTrue(compareGamesChronologically(a, b) < 0, 'id 100 vor 200 bei sonst identischen Werten');
}

console.log('== 6: vollständig identische Spiele -> 0 ==');
{
  const a = game();
  const b = game();
  assertEqual(compareGamesChronologically(a, b), 0, 'zwei inhaltlich identische, aber verschiedene Objekte -> 0');
  assertEqual(compareGamesChronologically(a, a), 0, 'dasselbe Objekt mit sich selbst -> 0');
}

console.log('== 7: fehlende/abweichende optionale Werte (definiertes Sicherheitsnetz, keine erfundene Fachsemantik) ==');
{
  const withDate = game({ start_time: undefined, game_number: undefined, id: undefined });
  const withoutAnything = { date: '2025-10-05' };
  assertEqual(compareGamesChronologically(withDate, withoutAnything), 0, 'fehlende start_time/game_number/id werden auf beiden Seiten gleich (leerer String bzw. 0) behandelt -> 0 bei sonst gleichem date');
  const missingDate = { start_time: '11:00' };
  const realDate = game();
  assertTrue(compareGamesChronologically(missingDate, realDate) < 0, 'fehlendes date sortiert als leerer String vor jedem echten "YYYY-MM-DD"-Datum');
  assertEqual(compareGamesChronologically({}, {}), 0, 'zwei vollständig leere Objekte -> 0 (kein Absturz)');
  assertEqual(compareGamesChronologically(null, undefined), 0, 'null/undefined als Eingabe -> kein Absturz, 0 (beide "leer")');
}

console.log('== 9: Sortieren mutiert weder Array-Kopie-Quelle noch die Spiel-Objekte ==');
{
  const original = [game({ id: 3, date: '2025-10-06' }), game({ id: 1, date: '2025-10-04' }), game({ id: 2, date: '2025-10-05' })];
  const originalSnapshotIds = original.map((g) => g.id);
  const originalObjectsSnapshot = original.map((g) => JSON.stringify(g));
  const copy = [...original].sort(compareGamesChronologically);
  assertEqual(original.map((g) => g.id), originalSnapshotIds, 'Original-Array-Reihenfolge unverändert nach Sortieren einer Kopie');
  assertEqual(original.map((g) => JSON.stringify(g)), originalObjectsSnapshot, 'kein einziges Original-Spiel-Objekt wurde inhaltlich verändert (Mutationsfreiheit)');
  assertEqual(copy.map((g) => g.id), [1, 2, 3], 'die sortierte Kopie selbst hat die korrekte chronologische Reihenfolge');
}

console.log('== 10: wiederholtes Sortieren liefert identisches Ergebnis (Determinismus) ==');
{
  const input = [game({ id: 5, date: '2025-10-06' }), game({ id: 1, date: '2025-10-04', start_time: '10:00' }), game({ id: 4, date: '2025-10-06', start_time: '09:00' }), game({ id: 2, date: '2025-10-04', start_time: '18:00' })];
  const sortedOnce = [...input].sort(compareGamesChronologically).map((g) => g.id);
  const sortedTwice = [...input].sort(compareGamesChronologically).sort(compareGamesChronologically).map((g) => g.id);
  const sortedAgainFreshCopy = JSON.parse(JSON.stringify(input)).sort(compareGamesChronologically).map((g) => g.id);
  assertEqual(sortedOnce, sortedTwice, 'erneutes Sortieren eines bereits sortierten Arrays ändert die Reihenfolge nicht');
  assertEqual(sortedOnce, sortedAgainFreshCopy, 'Sortieren einer unabhängigen tiefen Kopie derselben Daten liefert dieselbe Reihenfolge');
}

console.log('== 8: reale Spiele aus allen 5 season-data-Dateien ==');
let totalRealGames = 0;
for (const file of SEASON_FILES) {
  const raw = await readFile(path.join(REPO_ROOT, 'season-data', file), 'utf8');
  const parsed = JSON.parse(raw);
  const games = parsed.games;
  totalRealGames += games.length;

  const shuffled = [...games].reverse();
  const sorted = [...shuffled].sort(compareGamesChronologically);
  assertEqual(sorted.length, games.length, `${file}: Sortieren verändert die Anzahl der Spiele nicht (${games.length})`);

  let ordered = true;
  for (let i = 0; i < sorted.length - 1; i++) {
    if (compareGamesChronologically(sorted[i], sorted[i + 1]) > 0) {
      ordered = false;
      break;
    }
  }
  assertTrue(ordered, `${file}: nach dem Sortieren ist jedes Spiel <= dem nächsten (echte Daten, keine Verletzung der Ordnung)`);

  const originalIdsUntouched = games.map((g) => g.id).join(',');
  assertEqual(shuffled.slice().sort(compareGamesChronologically).map((g) => g.id).join(','), sorted.map((g) => g.id).join(','), `${file}: erneutes Sortieren derselben (umgekehrten) Ausgangsliste liefert identische Reihenfolge`);
  assertTrue(originalIdsUntouched === games.map((g) => g.id).join(','), `${file}: Original-games[]-Array aus der Datei bleibt durch alle obigen Sortiervorgänge unverändert`);
}
console.log(`  (insgesamt ${totalRealGames} reale Spiele aus 5 Saisons geprüft)`);

console.log('');
if (failures > 0) {
  console.log(`${failures} Test(s) fehlgeschlagen.`);
  process.exitCode = 1;
} else {
  console.log('Alle Tests erfolgreich.');
}

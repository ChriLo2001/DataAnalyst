#!/usr/bin/env node
// Tests für scripts/game-clock.mjs (S2e-Auftrag "Spielzeit normalisieren", Teil A,
// nachgeschärfte Fassung — Mehrheitsregel statt Spiel-weitem Ausschluss bei jedem Widerspruch).
//
// Prüft (1) die Kernfunktionen direkt (Parser, Mehrheitsregel, Umrechnung), inklusive der
// fünf im Auftrag benannten echten Fälle, und (2) gegen ALLE echten season-data/*.json-
// Dateien, dass über das gesamte Archiv genau EIN Spiel unklar ist und genau VIER
// Einzelereignisse verworfen werden — das ist die eigentliche Absicherung, dass hier nichts
// neu geraten wurde.
//
// Aufruf: node scripts/test-game-clock.mjs

import { readFile } from 'node:fs/promises';
import path from 'node:path';
import {
  HALF_LENGTH_SEC, GAME_LENGTH_SEC,
  parseGameClock, detectSecondHalfConvention, classifyGameClock, gameClockToAbsoluteSeconds,
  resolveGameClockSeconds, findUnclearSecondHalfGames, countDiscardedSecondHalfEvents,
} from './game-clock.mjs';

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

console.log('== Konstanten ==');
assertEqual(HALF_LENGTH_SEC, 1200, 'HALF_LENGTH_SEC = 20:00');
assertEqual(GAME_LENGTH_SEC, 2400, 'GAME_LENGTH_SEC = 40:00');

console.log('== parseGameClock() — nur noch m:ss/mm:ss mit Doppelpunkt oder Punkt, OHNE Längenprüfung ==');
assertEqual(parseGameClock('3:25'), 205, 'Doppelpunkt wird gelesen');
assertEqual(parseGameClock('3.25'), 205, 'Punkt statt Doppelpunkt wird genauso gelesen (Befund 21/22, Spiel 25661)');
assertEqual(parseGameClock('2.10'), 130, 'Spiel 25664: "2.10" -> 130s');
assertEqual(parseGameClock('31.41'), 1901, 'Spiel 25693: "31.41" -> 1901s');
assertEqual(parseGameClock('10.12'), 612, 'Spiel 25694: "10.12" -> 612s');
assertEqual(parseGameClock('0:00'), 0, '0:00 -> 0');
assertEqual(parseGameClock('19:59'), 1199, '19:59 -> 1199');
assertEqual(parseGameClock('40:00'), 2400, '40:00 (= GAME_LENGTH_SEC) ist lesbar');
// Nachschärfung: die Längengrenze ist periodenbewusst und gehört deshalb NICHT in parseGameClock() (das
// kennt die Periode nicht) — "41:00" ist als Zeitstring für sich genommen völlig lesbar (65 gültige
// Minuten:Sekunden), nur in Halbzeit 1/2 ist sie unplausibel. Siehe classifyGameClock() für die Prüfung.
assertEqual(parseGameClock('41:00'), 2460, '41:00 ist als Zeitstring lesbar — die Längenprüfung ist Sache von classifyGameClock(), nicht von parseGameClock()');
assertEqual(parseGameClock('12'), null, 'bloße Zahl ohne Trenner -> null (nicht als "12 Minuten" geraten)');
assertEqual(parseGameClock(41), null, 'bloße Zahl (Number-Typ) ohne Trenner -> ebenfalls null');
assertEqual(parseGameClock(''), null, 'leerer String -> null');
assertEqual(parseGameClock(null), null, 'null -> null');
assertEqual(parseGameClock(undefined), null, 'undefined -> null');
assertEqual(parseGameClock('abc'), null, 'unlesbarer Text -> null');
assertEqual(parseGameClock('12:60'), null, 'Sekunden >= 60 -> null (kein NaN)');
assertEqual(parseGameClock('12:-5'), null, 'negative Sekunden -> null');
assertTrue(!Number.isNaN(parseGameClock('murks') ?? 0), 'kein Eingabewert liefert NaN (immer null oder eine endliche Zahl)');

console.log('== detectSecondHalfConvention() — Mehrheitsregel, > statt >= an der 20:00-Schwelle ==');
const g = (events) => ({ id: 1, events });
assertEqual(detectSecondHalfConvention(g([{ period: 2, time: '5:00' }, { period: 2, time: '15:00' }])), 'relativ', 'alle P2-Zeiten <= 20:00 -> relativ');
assertEqual(detectSecondHalfConvention(g([{ period: 2, time: '25:00' }, { period: 2, time: '38:00' }])), 'durchlaufend', 'alle P2-Zeiten > 20:00 -> durchlaufend');
assertEqual(detectSecondHalfConvention(g([{ period: 2, time: '20:00' }])), 'relativ', 'exakt 20:00 spricht NICHT für durchlaufend (echtes Größer nötig) -> relativ, kein Widerspruch');
assertEqual(detectSecondHalfConvention(g([{ period: 2, time: '20:00' }, { period: 2, time: '25:00' }])), 'unklar', '20:00 zählt als relativ-Stimme (nicht echt größer), 25:00 als durchlaufend-Stimme: 1:1 -> unklar');
assertEqual(detectSecondHalfConvention(g([{ period: 2, time: '5:00' }, { period: 2, time: '25:00' }])), 'unklar', 'genauer Gleichstand (1 relativ-Stimme, 1 durchlaufend-Stimme) -> unklar, nicht geraten');
assertEqual(detectSecondHalfConvention(g([{ period: 2, time: '5:00' }, { period: 2, time: '6:00' }, { period: 2, time: '25:00' }])), 'relativ', 'Mehrheit relativ (2:1) -> relativ, die eine abweichende Zeit wird einzeln verworfen (siehe gameClockToAbsoluteSeconds)');
assertEqual(detectSecondHalfConvention(g([{ period: 1, time: '5:00' }])), null, 'keine P2-Zeit vorhanden -> null (keine Entscheidung nötig)');
assertEqual(detectSecondHalfConvention(g([])), null, 'keine Ereignisse -> null');
assertEqual(detectSecondHalfConvention(null), null, 'kein Spiel-Objekt -> null, kein Absturz');
assertEqual(detectSecondHalfConvention(g([{ period: 2, time: 'murks' }])), null, 'unlesbare P2-Zeit alleine -> null (zählt nicht als Stimme)');

console.log('== classifyGameClock() — jeder Grund für ein fehlendes Ergebnis hat einen eigenen Namen ==');
assertEqual(classifyGameClock(1, '5:00', 'relativ'), { status: 'ok', absSec: 300 }, 'Halbzeit 1, gültig -> ok');
assertEqual(classifyGameClock(2, '5:00', 'relativ'), { status: 'ok', absSec: 1500 }, 'Halbzeit 2, passt zur Mehrheit -> ok');
assertEqual(classifyGameClock(2, '25:00', 'durchlaufend'), { status: 'ok', absSec: 1500 }, 'Halbzeit 2, durchlaufend, passt zur Mehrheit -> ok');
assertEqual(classifyGameClock(1, 'murks', 'relativ'), { status: 'unparseable', absSec: null }, 'unlesbare Zeit -> unparseable, nicht nur null');
assertEqual(classifyGameClock(null, '5:00', 'relativ'), { status: 'unknownPeriod', absSec: null }, 'unlesbare/fehlende Halbzeit -> unknownPeriod');
assertEqual(classifyGameClock(3, '5:00', 'relativ'), { status: 'unsupportedPeriod', absSec: null }, 'Halbzeit 3 (Verlängerung/Penalty-Schießen, kommt in den Saisondaten nicht vor) -> unsupportedPeriod, expliziter Abbruch statt stillem null');
assertEqual(classifyGameClock(99, '5:00', 'relativ'), { status: 'unsupportedPeriod', absSec: null }, 'jede Periode >= 3 -> unsupportedPeriod');
assertEqual(classifyGameClock(1, '41:00', 'relativ'), { status: 'outOfRange', absSec: null }, 'Halbzeit 1, lesbar, aber jenseits von GAME_LENGTH_SEC -> outOfRange, NICHT dieselbe Kategorie wie "unlesbar"');
assertEqual(classifyGameClock(2, '41:00', 'durchlaufend'), { status: 'outOfRange', absSec: null }, 'Halbzeit 2, durchlaufend, jenseits von GAME_LENGTH_SEC -> outOfRange');
assertEqual(classifyGameClock(1, '5:00', 'unklar'), { status: 'gameExcluded', absSec: null }, 'convention="unklar": gameExcluded, auch für Halbzeit 1');
assertEqual(classifyGameClock(2, '25:00', 'relativ'), { status: 'discardedByMajority', absSec: null }, 'Halbzeit 2, widerspricht der Mehrheit "relativ" -> discardedByMajority, NICHT auf 41:40 gerechnet');
assertEqual(classifyGameClock(2, '5:00', 'durchlaufend'), { status: 'discardedByMajority', absSec: null }, 'Halbzeit 2, widerspricht der Mehrheit "durchlaufend" -> discardedByMajority');
assertEqual(classifyGameClock(2, '20:00', 'relativ'), { status: 'ok', absSec: 2400 }, 'Halbzeit 2, exakt 20:00 passt zur Mehrheit "relativ" -> ok, Spielende');
assertEqual(classifyGameClock(2, '20:00', 'durchlaufend'), { status: 'discardedByMajority', absSec: null }, 'Halbzeit 2, exakt 20:00 widerspricht "durchlaufend" (nicht echt größer) -> discardedByMajority');
assertEqual(classifyGameClock(2, '5:00', null), { status: 'unknownConvention', absSec: null }, 'Halbzeit 2 ohne bekannte convention -> unknownConvention');
assertEqual(classifyGameClock(1, '3.25', 'relativ'), { status: 'ok', absSec: 205 }, 'Punkt-Variante geht durch dieselbe Klassifikation');

console.log('== gameClockToAbsoluteSeconds() — dünne Hülle um classifyGameClock(), nur der Wert ==');
assertEqual(gameClockToAbsoluteSeconds(1, '5:00', 'relativ'), 300, 'Halbzeit 1 ist immer relativ zum Spielbeginn, unabhängig von convention');
assertEqual(gameClockToAbsoluteSeconds(2, '25:00', 'durchlaufend'), 1500, 'Halbzeit 2, durchlaufend, passt zur Mehrheit: Zeitstring ist bereits absolut');
assertEqual(gameClockToAbsoluteSeconds(2, '25:00', 'relativ'), null, 'Widerspruch -> null (siehe classifyGameClock für den Grund)');
assertEqual(gameClockToAbsoluteSeconds(1, '41:00', 'relativ'), null, 'außerhalb der Reichweite -> ebenfalls null (siehe classifyGameClock für den Grund)');
assertEqual(gameClockToAbsoluteSeconds(3, '5:00', 'relativ'), null, 'Halbzeit 3 -> null (siehe classifyGameClock für den Grund)');

console.log('== resolveGameClockSeconds() (Bequemlichkeits-Kombination) ==');
const relGame = g([{ period: 2, time: '5:00' }]);
const durchGame = g([{ period: 2, time: '25:00' }]);
const unklarGame = g([{ period: 2, time: '5:00' }, { period: 2, time: '25:00' }]);
assertEqual(resolveGameClockSeconds(relGame, 2, '5:00'), 1500, 'relativ-Spiel: identisches Ergebnis wie direkter Aufruf mit convention');
assertEqual(resolveGameClockSeconds(durchGame, 2, '25:00'), 1500, 'durchlaufend-Spiel: identisches Ergebnis wie direkter Aufruf mit convention');
assertEqual(resolveGameClockSeconds(unklarGame, 1, '5:00'), null, 'unklar-Spiel: null, auch für Halbzeit 1');
assertEqual(resolveGameClockSeconds(relGame, 1, '5:00'), 300, 'Halbzeit 1 unverändert, auch über die Kombinationsfunktion');

console.log('== findUnclearSecondHalfGames() / countDiscardedSecondHalfEvents() ==');
assertEqual(findUnclearSecondHalfGames([relGame, unklarGame, durchGame]), [1], 'genau das unklare Spiel wird gemeldet (hier zufällig dieselbe id=1 je Fixture, siehe echte Saisondaten unten für verschiedene ids)');
assertEqual(findUnclearSecondHalfGames([]), [], 'leere Liste -> leere Liste');
assertEqual(findUnclearSecondHalfGames(null), [], 'kein Array -> leere Liste, kein Absturz');
assertEqual(countDiscardedSecondHalfEvents(unklarGame), 0, 'unklar-Spiel zählt nicht als "verworfene Einzelereignisse" — das ist die andere Kategorie (ganzes Spiel ausgeschlossen)');
assertEqual(countDiscardedSecondHalfEvents(g([{ period: 2, time: '5:00' }, { period: 2, time: '6:00' }, { period: 2, time: '25:00' }])), 1, 'Mehrheit relativ (2:1): genau die eine abweichende Zeit wird verworfen');
assertEqual(countDiscardedSecondHalfEvents(g([{ period: 2, time: 'murks' }])), 0, 'unlesbare Zeiten zählen nicht als "verworfen" (eigene Kategorie)');

console.log('== Gegen ALLE echten season-data/*.json: fünf im Auftrag benannte reale Fälle ==');
{
  const cases = [
    { seasonFile: '21-22', gameId: 25682, convention: 'relativ', discarded: 1 },
    { seasonFile: '21-22', gameId: 25693, convention: 'durchlaufend', discarded: 1 },
    { seasonFile: '22-23', gameId: 29268, convention: 'durchlaufend', discarded: 2 },
    { seasonFile: '23-24', gameId: 32748, convention: 'relativ', discarded: 0 },
  ];
  for (const c of cases) {
    const raw = JSON.parse(await readFile(path.join(REPO_ROOT, 'season-data', `${c.seasonFile}.json`), 'utf8'));
    const games = Array.isArray(raw) ? raw : (raw.games || []);
    const game = games.find((gg) => gg.id === c.gameId);
    assertTrue(!!game, `${c.seasonFile}.json: Spiel ${c.gameId} existiert`);
    assertEqual(detectSecondHalfConvention(game), c.convention, `${c.seasonFile} Spiel ${c.gameId}: convention = ${c.convention}`);
    assertEqual(countDiscardedSecondHalfEvents(game), c.discarded, `${c.seasonFile} Spiel ${c.gameId}: ${c.discarded} verworfene(s) Einzelereignis(se)`);
  }
  // Das fünfte benannte Spiel: echter Gleichstand, komplett ausgeschlossen.
  const raw2122 = JSON.parse(await readFile(path.join(REPO_ROOT, 'season-data', '21-22.json'), 'utf8'));
  const games2122 = Array.isArray(raw2122) ? raw2122 : (raw2122.games || []);
  const game25661 = games2122.find((gg) => gg.id === 25661);
  assertTrue(!!game25661, '21-22.json: Spiel 25661 existiert');
  assertEqual(detectSecondHalfConvention(game25661), 'unklar', '21-22 Spiel 25661: convention = unklar (Gleichstand)');
  assertEqual(findUnclearSecondHalfGames(games2122).includes(25661), true, '21-22 Spiel 25661 erscheint in findUnclearSecondHalfGames()');
}

console.log('== Gegen ALLE echten season-data/*.json: Gesamtbilanz über das Archiv ==');
{
  const seasonFiles = ['21-22', '22-23', '23-24', '24-25', '25-26', '26-27'];
  let totalUnklar = 0;
  let totalDiscarded = 0;
  for (const seasonFile of seasonFiles) {
    const raw = JSON.parse(await readFile(path.join(REPO_ROOT, 'season-data', `${seasonFile}.json`), 'utf8'));
    const games = Array.isArray(raw) ? raw : (raw.games || []);
    totalUnklar += findUnclearSecondHalfGames(games).length;
    for (const game of games) totalDiscarded += countDiscardedSecondHalfEvents(game);
  }
  assertEqual(totalUnklar, 1, 'über das gesamte Archiv genau EIN unklares (ganz ausgeschlossenes) Spiel');
  assertEqual(totalDiscarded, 4, 'über das gesamte Archiv genau VIER verworfene Einzelereignisse');
}

console.log('== Gegen ALLE echten season-data/*.json: outOfRange/unsupportedPeriod kommen nicht vor ==');
{
  // Beleg für die Begründung im Modul-Kommentar: period >= 3 und Zeiten jenseits von GAME_LENGTH_SEC sind
  // in den sechs geprüften Saisondateien nicht belegt — die beiden neuen Status sind ein bewusster,
  // expliziter Auffangmechanismus für künftige Daten, keine rückwirkende Korrektur bestehender Fälle.
  const seasonFiles = ['21-22', '22-23', '23-24', '24-25', '25-26', '26-27'];
  let outOfRangeCount = 0;
  let unsupportedPeriodCount = 0;
  for (const seasonFile of seasonFiles) {
    const raw = JSON.parse(await readFile(path.join(REPO_ROOT, 'season-data', `${seasonFile}.json`), 'utf8'));
    const games = Array.isArray(raw) ? raw : (raw.games || []);
    for (const game of games) {
      const convention = detectSecondHalfConvention(game);
      for (const ev of (game.events || [])) {
        const status = classifyGameClock(ev?.period, ev?.time, convention).status;
        if (status === 'outOfRange') outOfRangeCount++;
        if (status === 'unsupportedPeriod') unsupportedPeriodCount++;
      }
    }
  }
  assertEqual(outOfRangeCount, 0, 'über das gesamte Archiv: kein einziges "outOfRange"-Ereignis (keine Zeit jenseits von GAME_LENGTH_SEC belegt)');
  assertEqual(unsupportedPeriodCount, 0, 'über das gesamte Archiv: kein einziges Ereignis mit period >= 3 (Verlängerung/Penalty-Schießen kommt nicht vor)');
}

console.log('== Spieltag 1 (26/27) — reale Prüfwerte aus dem ursprünglichen Auftrag ==');
{
  const raw = JSON.parse(await readFile(path.join(REPO_ROOT, 'season-data', '26-27.json'), 'utf8'));
  const games = Array.isArray(raw) ? raw : (raw.games || []);
  const g63384 = games.find((gg) => gg.id === 63384);
  const g63386 = games.find((gg) => gg.id === 63386);
  assertTrue(!!g63384 && !!g63386, 'Spiele 63384 und 63386 sind im echten 26-27.json vorhanden');
  assertEqual(resolveGameClockSeconds(g63384, 1, '12:41'), 761, 'Spiel 63384, 1. HZ 12:41 -> 761s');
  assertEqual(resolveGameClockSeconds(g63384, 1, '15:55'), 955, 'Spiel 63384, 1. HZ 15:55 -> 955s');
  assertEqual(resolveGameClockSeconds(g63386, 2, '1:40'), 1300, 'Spiel 63386, 2. HZ 1:40 -> 1300s (relativ-Konvention: + 1200)');
}

console.log('== Saisondateien bleiben unverändert (Normalisierung passiert beim Lesen, nicht beim Schreiben) ==');
{
  const raw1 = await readFile(path.join(REPO_ROOT, 'season-data', '21-22.json'), 'utf8');
  JSON.parse(raw1); // nur parsen, nicht schreiben
  const raw2 = await readFile(path.join(REPO_ROOT, 'season-data', '21-22.json'), 'utf8');
  assertEqual(raw1, raw2, '21-22.json ist nach dem Lesen/Auswerten byte-identisch (kein Schreibzugriff durch dieses Modul)');
}

console.log('');
if (failures > 0) {
  console.log(`${failures} Test(s) fehlgeschlagen.`);
  process.exitCode = 1;
} else {
  console.log('Alle Tests erfolgreich.');
}

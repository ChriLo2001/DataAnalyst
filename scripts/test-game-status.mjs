#!/usr/bin/env node
// Tests für scripts/game-status.mjs (ended-Vereinheitlichungs-Phase).
//
// Prüft (1) resultScore()/isEffectivelyEnded() als reine Funktionen direkt,
// und (2) — das eigentliche Ziel dieser Phase — dass M0 (normalizeSeason()
// aus scripts/model/normalize.mjs) UND buildMatchdays() aus
// scripts/matchday-derivation.mjs dasselbe synthetische Spiel identisch
// behandeln, weil beide isEffectivelyEnded() aus genau diesem Modul nutzen.
// Vorher driftete matchday-derivation.mjs ab, weil es nur das rohe
// `ended`-Feld las (siehe Build-Bericht).
//
// Aufruf: node scripts/test-game-status.mjs

import { resultScore, isEffectivelyEnded } from './game-status.mjs';
import { buildMatchdays } from './matchday-derivation.mjs';
import { normalizeSeason } from './model/normalize.mjs';

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

function game(overrides = {}) {
  return {
    id: 1,
    date: '2099-01-01',
    start_time: '11:00',
    game_number: '1',
    home_team_name: 'A',
    guest_team_name: 'B',
    game_day: { game_day_number: 1 },
    ended: false,
    notice_type: null,
    result: null,
    events: [],
    ...overrides,
  };
}

console.log('== resultScore() ==');
assertEqual(resultScore(game({ result: { home_goals: 5, guest_goals: 3 } })), { home: 5, guest: 3 }, 'vollständiges numerisches Ergebnis -> {home,guest}');
assertEqual(resultScore(game({ result: { home_goals: null, guest_goals: 3 } })), null, 'home_goals null -> null');
assertEqual(resultScore(game({ result: null })), null, 'result fehlt -> null');
assertEqual(resultScore(game({ result: { home_goals: '5', guest_goals: '3' } })), { home: 5, guest: 3 }, 'String-Zahlen werden numerisch gelesen');

console.log('== isEffectivelyEnded() ==');
assertTrue(isEffectivelyEnded(game({ ended: true, result: null, events: [] })), 'ended:true (ohne result/events) -> effektiv beendet');
assertTrue(isEffectivelyEnded(game({ ended: false, result: { home_goals: 2, guest_goals: 17 }, events: [{ event_type: 'goal' }] })), 'ended:false, aber vollständiges result + mindestens ein Event -> effektiv beendet (Datenqualitäts-Ausnahme)');
assertEqual(isEffectivelyEnded(game({ ended: false, result: { home_goals: 2, guest_goals: 17 }, events: [] })), false, 'ended:false, result vollständig, aber KEINE Events -> NICHT effektiv beendet');
assertEqual(isEffectivelyEnded(game({ ended: false, result: null, events: [{ event_type: 'goal' }] })), false, 'ended:false, Events vorhanden, aber KEIN vollständiges result -> NICHT effektiv beendet');
assertEqual(isEffectivelyEnded(game({ ended: false, result: null, events: [] })), false, 'ended:false ohne result/Events (echtes offenes Spiel) -> NICHT effektiv beendet');

console.log('== Konsistenz zwischen M0 (normalizeSeason) und matchday-derivation.mjs (buildMatchdays) ==');
{
  // Fall A: ended:false, vollständiges result + Events (Datenqualitäts-Ausnahme) — muss an
  // BEIDEN Aufrufstellen als beendet zählen.
  const exceptionGame = game({
    id: 101, ended: false, result: { home_goals: 2, guest_goals: 17 },
    events: [{ event_id: 1, event_type: 'goal', event_team: 'home', period: 1, home_goals: 1, guest_goals: 0, time: '5:00', number: 7 }],
  });
  const seasonA = { season: '99/00', games: [exceptionGame] };

  const matchdaysA = buildMatchdays(seasonA);
  assertEqual(matchdaysA[0].status, 'abgeschlossen', 'Fall A (ended:false + result + Events): buildMatchdays() -> Spieltag "abgeschlossen"');

  const modelA = normalizeSeason(seasonA);
  assertTrue(modelA.quality.ended === 1 && modelA.quality.notEnded === 0, 'Fall A: normalizeSeason() zählt das Spiel ebenfalls als beendet (quality.ended=1, notEnded=0)');
  assertTrue(modelA.quality.endedFalseIncludedByException.some((e) => e.gameId === 101), 'Fall A: normalizeSeason() führt es in endedFalseIncludedByException');

  // Fall B: ended:false, KEINE Events (trotz vollständigem result) — muss an BEIDEN
  // Aufrufstellen NICHT als beendet zählen.
  const openGame = game({ id: 102, ended: false, result: { home_goals: 2, guest_goals: 17 }, events: [] });
  const seasonB = { season: '99/00', games: [openGame] };

  const matchdaysB = buildMatchdays(seasonB);
  assertEqual(matchdaysB[0].status, 'geplant', 'Fall B (ended:false, result ohne Events): buildMatchdays() -> Spieltag NICHT "abgeschlossen" ("geplant")');

  const modelB = normalizeSeason(seasonB);
  assertTrue(modelB.quality.ended === 0 && modelB.quality.notEnded === 1, 'Fall B: normalizeSeason() zählt das Spiel NICHT als beendet (quality.ended=0, notEnded=1)');
  assertEqual(modelB.quality.endedFalseIncludedByException.length, 0, 'Fall B: normalizeSeason() führt es NICHT in endedFalseIncludedByException');

  // Fall C: rohes ended-Feld bleibt in beiden Aufrufstellen unverändert erhalten (keine Mutation).
  assertEqual(exceptionGame.ended, false, 'Fall A: das rohe ended-Feld am ursprünglichen Game-Objekt bleibt false (nicht überschrieben)');
  assertTrue(matchdaysA[0].games[0].ended === false, 'Fall A: buildMatchdays() liefert dasselbe Game-Objekt mit unverändertem rohen ended-Feld');
  const teamGameA = modelA.teamGames.find((t) => t.gameId === 101);
  assertEqual(teamGameA.ended, false, 'Fall A: normalizeSeason() führt den rohen ended-Rohmarker (false) im Team-Spiel weiter, überschreibt ihn nicht');
}

console.log('');
if (failures > 0) {
  console.log(`${failures} Test(s) fehlgeschlagen.`);
  process.exitCode = 1;
} else {
  console.log('Alle Tests erfolgreich.');
}

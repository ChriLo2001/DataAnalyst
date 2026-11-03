#!/usr/bin/env node
// Tests für scripts/no-goal-streak.mjs (S2e-Auftrag "Spielzeit normalisieren", Teil B —
// spielübergreifende "Längste Zeit ohne Gegentor").
//
// Prüft (1) die drei im Auftrag benannten Prüfwerte gegen das echte season-data/26-27.json
// (VfB Ulm, nach Spieltag 1), (2) einen synthetischen Fall mit fehlendem Zwischenspiel, und
// (3) den echten Fall Spiel 29268 (22/23), wo die Serie wegen eines durch die Mehrheitsregel
// verworfenen Gegentors abbrechen MUSS statt durchzulaufen.
//
// Aufruf: node scripts/test-no-goal-streak.mjs

import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { buildCrossGameNoGoalStreak, ULM_TEAM_NAMES } from './no-goal-streak.mjs';

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

// ── Synthetische Fixtures ────────────────────────────────────────────────
// "A" ist das betrachtete Team (eigener Name, damit die Fixtures nichts mit echten Ulm-Aliassen
// verwechseln) — buildCrossGameNoGoalStreak(games, teamNames) nimmt teamNames als Argument.
const TEAM = new Set(['A']);
const goal = (period, time, team) => ({ event_type: 'goal', event_team: team, period, time });
const game = (id, date, startTime, { home = 'A', guest = 'B', ended = true, events = [] } = {}) => ({
  id, date, start_time: startTime, home_team_name: home, guest_team_name: guest,
  ended, result: ended ? { home_goals: 0, guest_goals: 0 } : null, events,
});

console.log('== Grundfall: zwei Spiele, keine Brüche ==');
{
  // A ist "home" in Spiel 1 (Gegentore = Ereignisse von "guest"), "guest" in Spiel 2 (Gegentore = "home").
  const g1 = game(1, '2026-01-01', '10:00', { home: 'A', guest: 'B', events: [goal(1, '5:00', 'guest')] });
  const g2 = game(2, '2026-01-08', '10:00', { home: 'C', guest: 'A', events: [goal(1, '3:00', 'home')] });
  const r = buildCrossGameNoGoalStreak([g1, g2], TEAM);
  // Spiel 1: 300s bis zum Gegentor (-> running), danach 2400-300=2100s Rest-Tail.
  // Spiel 2: running(2100) + 180s bis zum Gegentor = 2280s (Kandidat für longestOverall).
  assertEqual(r.breaks, [], 'keine Brüche bei zwei lückenlosen, sauberen Spielen');
  assertEqual(r.longestOverall, 2280, 'spielübergreifend: 2100 (Rest Spiel 1) + 180 (Anfang Spiel 2) = 2280s');
  // Nicht 2100 (der Rest aus Spiel 1): Spiel 2 hat seinerseits einen Rest von 2400-180=2220s (vom
  // einzigen Gegentor bei "3:00" bis zum Spielende), und 2220 > 2100 — auch das ist "innerhalb eines
  // Spiels", unabhängig davon, dass von VORHER (Spiel 1) noch etwas in Spiel 2 hineinlief.
  assertEqual(r.longestWithinGame, 2220, 'innerhalb eines Spiels: der 2220s-Rest aus Spiel 2 (nicht der 2100s-Rest aus Spiel 1) ist der größte rein innerhalb eines Spiels liegende Abschnitt');
  assertEqual(r.current, 2220, 'laufend: 2400 - 180 = 2220s (Rest von Spiel 2, noch kein weiteres Spiel)');
}

console.log('== Spiel ohne Gegentor trägt volle GAME_LENGTH_SEC bei ==');
{
  const g1 = game(1, '2026-01-01', '10:00', { home: 'A', guest: 'B', events: [] });
  const g2 = game(2, '2026-01-08', '10:00', { home: 'A', guest: 'C', events: [goal(1, '1:00', 'guest')] });
  const r = buildCrossGameNoGoalStreak([g1, g2], TEAM);
  assertEqual(r.breaks, [], 'keine Brüche');
  assertEqual(r.longestOverall, 2460, 'Spiel 1 komplett sauber (2400s) + 60s Anfang Spiel 2 = 2460s, bevor das erste Gegentor fällt');
  assertEqual(r.longestWithinGame, 2400, 'Spiel 1 (clean sheet) trägt als Ganzes GAME_LENGTH_SEC zu "innerhalb eines Spiels" bei');
}

console.log('== Fall 1: fehlendes Zwischenspiel bricht ab, überspringt nicht ==');
{
  // Spiel 2 ist chronologisch zwischen 1 und 3, aber noch nicht beendet (ended:false) — "gespielt, aber
  // nicht importiert" (z.B. Ergebnis fehlt noch). Spiel 3 danach ist beendet -> Spiel 2 ist eine echte
  // Lücke, keine bloß zukünftige, noch nicht gespielte Partie.
  const g1 = game(1, '2026-01-01', '10:00', { home: 'A', guest: 'B', events: [] }); // clean sheet, 2400s
  const g2 = game(2, '2026-01-08', '10:00', { home: 'A', guest: 'C', ended: false, events: [] }); // Lücke
  const g3 = game(3, '2026-01-15', '10:00', { home: 'A', guest: 'D', events: [goal(1, '2:00', 'guest')] });
  const r = buildCrossGameNoGoalStreak([g1, g2, g3], TEAM);
  assertEqual(r.breaks, [{ reason: 'missingGame', gameId: 2, date: '2026-01-08' }], 'Spiel 2 wird als fehlendes Zwischenspiel gemeldet, nicht übersprungen');
  // OHNE den Bruch wäre longestOverall faelschlich 2400 (Spiel1) + 120 (Spiel3-Anfang) = 2520 gewesen.
  assertEqual(r.longestOverall, 2400, 'Serie bricht NACH Spiel 1 ab (2400s) statt über die Lücke hinweg bis in Spiel 3 (120s) weiterzuzählen (das wäre 2520s gewesen)');
  assertEqual(r.current, 2280, 'laufende Serie startet nach der Lücke neu: 2400 - 120 (Gegentor in Spiel 3) = 2280s');
}

console.log('== Gegenprobe: nicht beendetes Spiel am ENDE der Saison ist KEIN Bruch ==');
{
  const g1 = game(1, '2026-01-01', '10:00', { home: 'A', guest: 'B', events: [goal(1, '5:00', 'guest')] });
  const g2 = game(2, '2026-01-08', '10:00', { home: 'A', guest: 'C', ended: false, events: [] }); // einfach noch nicht gespielt
  const r = buildCrossGameNoGoalStreak([g1, g2], TEAM);
  assertEqual(r.breaks, [], 'ein lediglich noch nicht gespieltes Spiel am Ende ist kein Abbruch');
  assertEqual(r.current, 2100, 'laufende Serie endet am letzten BEENDETEN Spiel (Spiel 2 wird ignoriert, nicht als Lücke gezählt)');
}

console.log('== Fall 3: Gegentor ohne verwertbare Zeit macht das GANZE Spiel unbrauchbar ==');
{
  // "murks" ist unparseable -> classifyGameClock liefert 'unparseable', nicht 'ok'. Ein sauber auswertbares
  // zweites Gegentor im selben Spiel darf das nicht verschleiern — das GANZE Spiel wird unbrauchbar.
  const g1 = game(1, '2026-01-01', '10:00', { home: 'A', guest: 'B', events: [] }); // clean sheet, 2400s
  const g2 = game(2, '2026-01-08', '10:00', { home: 'A', guest: 'C', events: [goal(1, 'murks', 'guest'), goal(1, '5:00', 'guest')] });
  const g3 = game(3, '2026-01-15', '10:00', { home: 'A', guest: 'D', events: [goal(1, '2:00', 'guest')] });
  const r = buildCrossGameNoGoalStreak([g1, g2, g3], TEAM);
  assertEqual(r.breaks, [{ reason: 'unresolvableClock', gameId: 2, date: '2026-01-08' }], 'Spiel 2 wird als unauswertbar gemeldet (nicht nur das eine schlechte Ereignis übersprungen)');
  assertEqual(r.longestOverall, 2400, 'Serie bricht nach Spiel 1 ab, überspringt Spiel 2 NICHT bis zum sauberen Teil ("5:00") hinein');
}

console.log('== Mehrheits-Widerspruch (discardedByMajority) ist ebenfalls Fall 3 ==');
{
  // Halbzeit-2-Mehrheit "durchlaufend" (>20:00) in diesem einen Spiel, ein widersprechendes Gegentor
  // bei "5:00" (<=20:00) wird deshalb verworfen -> macht das Spiel für die Serie unbrauchbar.
  const g1 = game(1, '2026-01-01', '10:00', { home: 'A', guest: 'B', events: [
    goal(2, '25:00', 'home'), goal(2, '30:00', 'home'), // Mehrheit: durchlaufend
    goal(2, '5:00', 'guest'), // widerspricht, event_team='guest' -> Gegentor für A als "home"
  ] });
  const r = buildCrossGameNoGoalStreak([g1], TEAM);
  assertEqual(r.breaks, [{ reason: 'unresolvableClock', gameId: 1, date: '2026-01-01' }], 'discardedByMajority-Gegentor macht das Spiel ebenfalls unbrauchbar');
}

console.log('== Konvention "unklar" (gameExcluded) ist ebenfalls Fall 3 ==');
{
  const g1 = game(1, '2026-01-01', '10:00', { home: 'A', guest: 'B', events: [
    goal(2, '25:00', 'home'), goal(2, '5:00', 'home'), // 1:1 Gleichstand -> unklar, auch Halbzeit 1 betroffen
    goal(1, '2:00', 'guest'),
  ] });
  const r = buildCrossGameNoGoalStreak([g1], TEAM);
  assertEqual(r.breaks, [{ reason: 'unresolvableClock', gameId: 1, date: '2026-01-01' }], 'ein "unklares" Spiel macht sich über classifyGameClock -> gameExcluded automatisch als unresolvableClock bemerkbar');
}

console.log('== Beschriftung/Form: keine Labels in diesem Modul (nur Zahlen) ==');
{
  const r = buildCrossGameNoGoalStreak([], TEAM);
  assertEqual(r, { longestOverall: 0, longestOverallGames: [], longestWithinGame: 0, current: 0, currentGames: [], breaks: [] }, 'leere Spieleliste -> alles 0, keine Brüche');
}

// ── Gegen die echten Saisondateien ───────────────────────────────────────
console.log('== Spieltag 1 (26/27), VfB Ulm — die drei Prüfwerte aus dem Auftrag ==');
{
  const raw = JSON.parse(await readFile(path.join(REPO_ROOT, 'season-data', '26-27.json'), 'utf8'));
  const games = Array.isArray(raw) ? raw : (raw.games || []);
  const r = buildCrossGameNoGoalStreak(games, ULM_TEAM_NAMES);
  assertEqual(r.breaks, [], 'keine Brüche nach Spieltag 1 (nur zwei Spiele, beide beendet und sauber auswertbar)');
  assertEqual(r.longestOverall, 2745, 'spielübergreifend: 45:45 = 2745s');
  assertEqual(r.longestWithinGame, 1445, 'innerhalb eines Spiels: 24:05 = 1445s');
  assertEqual(r.current, 1100, 'laufend: 18:20 = 1100s');
}

console.log('== Echter Fall: Spiel 29268 (22/23) muss die Serie der SG abbrechen, nicht durchlaufen lassen ==');
{
  const raw = JSON.parse(await readFile(path.join(REPO_ROOT, 'season-data', '22-23.json'), 'utf8'));
  const games = Array.isArray(raw) ? raw : (raw.games || []);
  const game29268 = games.find((g) => g.id === 29268);
  assertTrue(!!game29268, 'Spiel 29268 existiert in 22-23.json');
  assertEqual(game29268.home_team_name, 'FBC Heidelberg', 'Vorbedingung: FBC Heidelberg ist Heimteam');
  assertEqual(game29268.guest_team_name, 'SG Sparks Ulm-Tübingen', 'Vorbedingung: SG Sparks Ulm-Tübingen ist Gastteam (eine der ULM_TEAM_NAMES-Schreibweisen)');
  const r = buildCrossGameNoGoalStreak(games, ULM_TEAM_NAMES);
  assertTrue(r.breaks.some((b) => b.gameId === 29268 && b.reason === 'unresolvableClock'), 'Spiel 29268 erscheint als unresolvableClock-Bruch in der 22/23-Serie der SG');
  // Gegenprobe: ohne den Bruch (d.h. würde das verworfene Gegentor bei "13:11" einfach übersprungen)
  // entstünde eine zu lange, falsche Serie. Das wird hier nicht separat nachgebaut (keine zweite,
  // bewusst falsche Implementierung) — die obige Assertion ist der direkte Beleg, dass der Bruch
  // tatsächlich auftritt und nicht nur theoretisch vorgesehen ist.
}

console.log('== Schreibweisen-Befund: beide "SG Sparks ...-Ulm/Ulm-..." treten nie in derselben Saison auf ==');
{
  const seasonFiles = ['21-22', '22-23', '23-24', '24-25', '25-26', '26-27'];
  for (const seasonFile of seasonFiles) {
    const raw = JSON.parse(await readFile(path.join(REPO_ROOT, 'season-data', `${seasonFile}.json`), 'utf8'));
    const games = Array.isArray(raw) ? raw : (raw.games || []);
    const names = new Set();
    for (const g of games) { names.add(g.home_team_name); names.add(g.guest_team_name); }
    const hasA = names.has('SG Sparks Ulm-Tübingen');
    const hasB = names.has('SG Sparks Tübingen-Ulm');
    assertTrue(!(hasA && hasB), `${seasonFile}.json: "SG Sparks Ulm-Tübingen" und "SG Sparks Tübingen-Ulm" treten nicht gemeinsam auf (Befund aus dem Bericht, hier als Dauerbeleg)`);
  }
}

console.log('');
if (failures > 0) {
  console.log(`${failures} Test(s) fehlgeschlagen.`);
  process.exitCode = 1;
} else {
  console.log('Alle Tests erfolgreich.');
}

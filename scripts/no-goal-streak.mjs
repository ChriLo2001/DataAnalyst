// Längste zusammenhängende Spielzeit ohne Gegentor einer Mannschaft, über die Spiele EINER Saison hinweg,
// in chronologischer Reihenfolge — "spielübergreifend" (S2e-Auftrag "Spielzeit normalisieren", Teil B).
// Nicht über Saisongrenzen (die Definition verlangt das ausdrücklich; der Aufruf dieses Moduls entscheidet
// pro Saison, siehe buildCrossGameNoGoalStreak()'s `games`-Argument).
//
// Baut auf drei bereits bestehenden, unabhängigen Bausteinen auf, erfindet keine eigene Sortierung/
// Statusregel:
//   - compareGamesChronologically aus scripts/game-ordering.mjs für die Reihenfolge.
//   - isEffectivelyEnded aus scripts/game-status.mjs für "beendet".
//   - classifyGameClock/detectSecondHalfConvention/GAME_LENGTH_SEC aus scripts/game-clock.mjs (Teil A)
//     für die Zeit-Umrechnung je Gegentor.
//
// Die Serie bricht (schließt den laufenden Abschnitt ab, beginnt bei 0 neu), statt stillschweigend
// darüber hinwegzuspringen, in drei Fällen:
//   1. Ein dazwischenliegendes Spiel ist gespielt, aber nicht importiert: in der VOLLSTÄNDIGEN,
//      chronologisch sortierten Reihe der Spiele dieses Teams (nicht nur der beendeten!) kommt ein noch
//      nicht `isEffectivelyEnded`-Spiel vor einem SPÄTEREN, bereits beendeten Spiel. Ein lediglich noch
//      nicht gespieltes Spiel am ENDE der Saison ist dagegen kein Abbruch — das ist einfach "die Saison
//      ist noch nicht fertig" und wird ignoriert (siehe "laufende Serie" unten).
//   2. Ein Spiel hat `detectSecondHalfConvention === 'unklar'`: classifyGameClock liefert dafür für JEDES
//      Ereignis (auch Halbzeit 1) den Status 'gameExcluded' — das Spiel fällt automatisch in Fall 3
//      (siehe dort), kein eigener Code-Pfad nötig.
//   3. Ein Gegentor des betrachteten Teams hat keine verwertbare Zeit (`classifyGameClock`-Status
//      ungleich 'ok': 'discardedByMajority', 'unparseable', 'unsupportedPeriod', 'outOfRange', oder —
//      siehe Fall 2 — 'gameExcluded'). Belegt an Spiel 29268 (22/23, FBC Heidelberg 17:7 SG Sparks
//      Ulm-Tübingen): eines der beiden durch die Mehrheitsregel verworfenen Ereignisse ist ein Gegentor
//      der Gäste (SG) bei 13:11. Würde dieses Ereignis einfach übersprungen statt das Spiel als Ganzes
//      für die Serie unbrauchbar zu machen, verschwände ein echtes Gegentor — dieselbe stille Aufblähung
//      wie bei Fall 1, nur eine Ebene tiefer. Deshalb macht EIN nicht verwertbares Gegentor das GANZE
//      Spiel für die Serie unbrauchbar (nicht nur das eine Ereignis): wir wissen nicht, wo im Spiel es
//      lag, können also auch die übrigen, scheinbar sauberen Abschnitte dieses Spiels nicht mehr sicher
//      datieren.
//
// Schreibweisen-Befund (vor der Rechnung geprüft, siehe Bericht): "SG Sparks Ulm-Tübingen" und
// "SG Sparks Tübingen-Ulm" treten NIE in derselben Saison gemeinsam auf (21/22 ausschließlich
// "Tübingen-Ulm", 22/23 und 23/24 ausschließlich "Ulm-Tübingen", ab 24/25 "VfB Ulm") — die vermutete
// Mehrdeutigkeit entsteht hier nicht, weil diese Funktion ohnehin pro Saison rechnet. Trotzdem werden
// beide Schreibweisen (plus "VfB Ulm") als dieselbe Mannschaft erkannt, siehe ULM_TEAM_NAMES — bewusst
// eine eigene, lokale Liste statt eines Imports aus matchcenter-core.js (kein Browser-Code) oder
// scripts/model/normalize.mjs (bewusst nicht angefasst, siehe Teil-A-Bericht).
//
// Reine Funktionen: lesen nur ihre Argumente, verändern nichts.

import { compareGamesChronologically } from './game-ordering.mjs';
import { isEffectivelyEnded } from './game-status.mjs';
import { classifyGameClock, detectSecondHalfConvention, GAME_LENGTH_SEC } from './game-clock.mjs';

export const ULM_TEAM_NAMES = new Set(['VfB Ulm', 'SG Sparks Ulm-Tübingen', 'SG Sparks Tübingen-Ulm']);

function sideFor(game, teamNames) {
  if (teamNames.has(game?.home_team_name)) return 'home';
  if (teamNames.has(game?.guest_team_name)) return 'guest';
  return null;
}

/**
 * Sortierte absolute Sekunden aller Gegentore des betrachteten Teams in EINEM Spiel, oder `null`, wenn
 * mindestens eines davon keine verwertbare Zeit hat (siehe Fall 3 oben — macht das GANZE Spiel
 * unbrauchbar, kein Teilergebnis).
 */
function goalsAgainstAbsSeconds(game, side) {
  const convention = detectSecondHalfConvention(game);
  const opponentSide = side === 'home' ? 'guest' : 'home';
  const result = [];
  for (const ev of (game?.events || [])) {
    if (ev?.event_type !== 'goal' || ev?.event_team !== opponentSide) continue;
    const { status, absSec } = classifyGameClock(ev?.period, ev?.time, convention);
    if (status !== 'ok') return null;
    result.push(absSec);
  }
  result.sort((a, b) => a - b);
  return result;
}

/**
 * Baut die spielübergreifende Serie für EINE Saison und EIN Team (Default: Ulm/SG, siehe
 * ULM_TEAM_NAMES). `games` ist die VOLLSTÄNDIGE Spieleliste der Saison (alle Teams, auch nicht beendete
 * Spiele — nötig, um Fall 1 überhaupt erkennen zu können).
 *
 * Liefert:
 *   longestOverall   — längste Serie spielübergreifend (Sekunden).
 *   longestWithinGame — längste Serie, die vollständig innerhalb EINES Spiels liegt (Sekunden) — das ist
 *                       dieselbe Größe, die eine Spielseite für "in diesem Spiel" zeigen würde (siehe
 *                       buildGoalieGameRecord/noGoalStretches in index.html, dieselbe Definition).
 *   current          — die am Ende des letzten verarbeiteten Spiels noch laufende, nicht abgeschlossene
 *                       Serie (Sekunden) — SEPARAT ausgewiesen, nicht automatisch Teil von longestOverall.
 *   longestOverallGames — Game-IDs (chronologisch), die die Serie mit longestOverall tatsächlich berührt
 *                       (ein Eintrag, wenn sie vollständig in einem Spiel liegt; mehrere, wenn sie über
 *                       Spiele hinweg reicht) — für die Torhüterzuordnung (wer stand während GENAU dieser
 *                       Serie im Tor), nicht Teil der Zahl selbst.
 *   currentGames     — dieselbe Zuordnung für die laufende Serie (`current`).
 *   breaks           — jeder Abbruchpunkt mit Grund ('missingGame' | 'unresolvableClock'), Game-ID, Datum.
 */
export function buildCrossGameNoGoalStreak(games, teamNames = ULM_TEAM_NAMES) {
  const rows = (games || []).filter((g) => sideFor(g, teamNames) !== null);
  const sorted = [...rows].sort(compareGamesChronologically);

  let running = 0;
  let runningGames = [];
  let longestOverall = 0;
  let longestOverallGames = [];
  let longestWithinGame = 0;
  const breaks = [];

  const closeRunning = () => {
    if (running > longestOverall) { longestOverall = running; longestOverallGames = runningGames.slice(); }
    running = 0;
    runningGames = [];
  };

  for (let i = 0; i < sorted.length; i++) {
    const game = sorted[i];

    if (!isEffectivelyEnded(game)) {
      const hasLaterEnded = sorted.slice(i + 1).some((other) => isEffectivelyEnded(other));
      if (!hasLaterEnded) continue; // nur noch nicht gespielt, Saison einfach noch nicht fertig -> kein Abbruch.
      closeRunning();
      breaks.push({ reason: 'missingGame', gameId: game?.id ?? null, date: game?.date ?? '' });
      continue;
    }

    const side = sideFor(game, teamNames);
    const goals = goalsAgainstAbsSeconds(game, side);
    if (goals === null) {
      closeRunning();
      breaks.push({ reason: 'unresolvableClock', gameId: game?.id ?? null, date: game?.date ?? '' });
      continue;
    }

    if (!goals.length) {
      running += GAME_LENGTH_SEC;
      runningGames.push(game?.id ?? null);
      longestWithinGame = Math.max(longestWithinGame, GAME_LENGTH_SEC);
      continue;
    }

    running += goals[0];
    runningGames.push(game?.id ?? null);
    if (running > longestOverall) { longestOverall = running; longestOverallGames = runningGames.slice(); }
    longestWithinGame = Math.max(longestWithinGame, goals[0]);
    for (let j = 1; j < goals.length; j++) {
      const gap = goals[j] - goals[j - 1];
      if (gap > longestOverall) { longestOverall = gap; longestOverallGames = [game?.id ?? null]; }
      longestWithinGame = Math.max(longestWithinGame, gap);
    }
    const tail = GAME_LENGTH_SEC - goals[goals.length - 1];
    longestWithinGame = Math.max(longestWithinGame, tail);
    running = tail;
    runningGames = [game?.id ?? null];
  }
  if (running > longestOverall) { longestOverall = running; longestOverallGames = runningGames.slice(); }
  const currentGames = runningGames.slice();

  return { longestOverall, longestOverallGames, longestWithinGame, current: running, currentGames, breaks };
}

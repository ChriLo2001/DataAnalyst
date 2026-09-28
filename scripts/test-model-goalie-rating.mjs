#!/usr/bin/env node
// P3 Runde 1 · Test für scripts/model/goalie-rating.mjs (M3 Goalie-Bewertung, Variante A, keine Build-Integration).
//
// Erwartungswerte stammen aus Handrechnung (kleine, von Hand gebaute Fit-Objekte für expectedGoalsAgainst/TvE),
// eigenen Bisektions-/Zähl-Nachrechnungen für Momentum-Fenster, unabhängiger Nachrechnung mit fitShooterQuality/
// fitTeamStrength direkt im Test (nicht aus dem getesteten Modul) oder aus dem Rohzähler der echten M0-Daten —
// nicht aus dem getesteten Code selbst. Alle Zufallswerte haben feste Seeds.
//
// Aufruf: node scripts/test-model-goalie-rating.mjs

import * as S from './model/stats.mjs';
import * as T1 from './model/team-strength.mjs';
import * as M2 from './model/shooter-quality.mjs';
import * as G from './model/goalie-rating.mjs';
import { buildLeagueModel } from './build-league-model.mjs';

let failures = 0;

function assertEqual(actual, expected, label) {
  const a = JSON.stringify(actual);
  const e = JSON.stringify(expected);
  if (a === e) console.log(`  ok   ${label}`);
  else { failures++; console.log(`  FAIL ${label}\n       erwartet: ${e}\n       erhalten: ${a}`); }
}
function assertTrue(cond, label) { assertEqual(Boolean(cond), true, label); }
function assertNear(actual, expected, tol, label) {
  if (Number.isFinite(actual) && Math.abs(actual - expected) <= tol) console.log(`  ok   ${label} (Toleranz ${tol})`);
  else { failures++; console.log(`  FAIL ${label} (Toleranz ${tol})\n       erwartet: ${expected}\n       erhalten: ${actual}`); }
}
function throwsCode(fn, code, label) {
  try { fn(); failures++; console.log(`  FAIL ${label}\n       kein Fehler geworfen`); } catch (e) {
    if (e instanceof S.NumericError && e.code === code) console.log(`  ok   ${label}`);
    else { failures++; console.log(`  FAIL ${label}\n       erwartet: NumericError ${code}\n       erhalten: ${e?.name} ${e?.code ?? ''} ${e?.message}`); }
  }
}
const clone = (v) => JSON.parse(JSON.stringify(v));
const finiteEverywhere = (v) => (typeof v === 'number' ? Number.isFinite(v) : Array.isArray(v) ? v.every(finiteEverywhere) : v && typeof v === 'object' ? Object.values(v).every(finiteEverywhere) : true);
const shuffle = (arr, rng) => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = rng.nextInt(i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const D = (n) => new Date(Date.UTC(2025, 3, 11) + n * 86400000).toISOString().slice(0, 10);
const byId = (res) => Object.fromEntries(res.players.map((p) => [p.playerId, p]));

// ── Kleiner Fixture-Baukasten (M0-Format, nur die von M3 gelesenen Felder) ──────────────────────────────
function makeFx() {
  const fx = { teamGames: [], goalEvents: [], rosterEntries: [] };
  let nextGame = 1;
  const evIdx = new Map();
  const rowOf = (g, side) => fx.teamGames.find((t) => t.seasonKey === g.seasonKey && t.gameId === g.gameId && t.side === side);
  const api = {
    fx,
    game(date, { seasonKey = 'S1', matchdayNumber = 1, home = 'A', guest = 'B', gameId, orderHome = 1, orderGuest = 1, fpHome = 8, fpGuest = 8, hostHome = null, hostGuest = null, goalieCountHome = 1, goalieCountGuest = 1 } = {}) {
      const id = gameId ?? nextGame++;
      const mk = (side, teamKey, opp, order, fp, host, gc) => ({
        seasonKey, gameId: id, side, teamKey, opponentKey: opp, date, matchdayNumber,
        goalsFor: 0, goalsAgainst: 0, fieldPlayerCount: fp, goalieCount: gc,
        derived: { gameOrderOfDay: order, isHostingTeam: host },
      });
      fx.teamGames.push(mk('home', home, guest, orderHome, fpHome, hostHome, goalieCountHome));
      fx.teamGames.push(mk('guest', guest, home, orderGuest, fpGuest, hostGuest, goalieCountGuest));
      evIdx.set(`${seasonKey}#${id}`, 0);
      return { seasonKey, gameId: id, home, guest };
    },
    goalie(g, side, playerId, name) {
      fx.rosterEntries.push({ seasonKey: g.seasonKey, gameId: g.gameId, side, teamKey: side === 'home' ? g.home : g.guest, playerId, playerName: name, isGoalie: true, position: 'Tor' });
    },
    field(g, side, playerId, name) {
      fx.rosterEntries.push({ seasonKey: g.seasonKey, gameId: g.gameId, side, teamKey: side === 'home' ? g.home : g.guest, playerId, playerName: name, isGoalie: false, position: 'Feld' });
    },
    goal(g, side, { period = 1, absSec = null, own = false, na = false, scorer = null } = {}) {
      const key = `${g.seasonKey}#${g.gameId}`;
      const idx = evIdx.get(key); evIdx.set(key, idx + 1);
      fx.goalEvents.push({
        seasonKey: g.seasonKey, gameId: g.gameId, eventKey: `${g.gameId}#${idx}`, teamSide: side, teamKey: side === 'home' ? g.home : g.guest,
        isOwnGoal: own, isNotAssigned: na, isPenaltyShot: false, period, absSec,
        derived: { scorerPlayerId: scorer, scorerMatch: own || na ? 'placeholder' : 'roster', assistKind: 'none', assistPlayerId: null },
      });
      const home = rowOf(g, 'home'); const guest = rowOf(g, 'guest');
      if (side === 'home') { home.goalsFor++; guest.goalsAgainst++; } else { guest.goalsFor++; home.goalsAgainst++; }
    },
  };
  return api;
}

/** Kleine, aber für einen M1-Fit ausreichende Hintergrundliga (4 Teams, randomisierte Paarungen, 2 Saisons). */
function background(seed = 1, { games = 24, dateOf = (i) => D(-400 + i * 10) } = {}) {
  const rng = S.createRng(seed);
  const b = makeFx();
  const teams = ['A', 'B', 'C', 'D'];
  for (let i = 0; i < games; i++) {
    const ta = rng.nextInt(4); let tb = rng.nextInt(3); if (tb >= ta) tb++;
    const order = 1 + rng.nextInt(2);
    const fpH = [5, 7, 9][rng.nextInt(3)]; const fpG = [5, 7, 9][rng.nextInt(3)];
    const host = rng.nextFloat() < 0.5 ? 'home' : rng.nextFloat() < 0.5 ? 'guest' : null;
    const g = b.game(dateOf(i), { seasonKey: 'S1', matchdayNumber: i + 1, home: teams[ta], guest: teams[tb], orderHome: order, orderGuest: order, fpHome: fpH, fpGuest: fpG, hostHome: host === 'home', hostGuest: host === 'guest' });
    for (let k = 0; k < 1 + rng.nextInt(4); k++) b.goal(g, rng.nextFloat() < 0.5 ? 'home' : 'guest', { period: 1 + rng.nextInt(2), absSec: rng.nextInt(2400) });
  }
  return b;
}

// ══ A. Variante-A-Handrechnung ═══════════════════════════════════════════
console.log('== A. expectedGoalsAgainst: Handrechnung, kein defense[eigenesTeam]-Einfluss ==');
{
  // mu=0.5, attack[O]=0.3, order-Effekt=0.1 (Gegner spielt 2. Spiel), le6-Effekt=0.2 (Gegner Kader<=6), betaHost=0.25 (Gegner ist Ausrichter)
  const fit = { stage1: { mu: 0.5, effects: { order: 0.1, fieldPlayers: { le6: 0.2, ge9: -0.15 } }, teams: [{ teamKey: 'O', attack: 0.3, defense: 99 }, { teamKey: 'X', attack: -5, defense: -5 }] }, stage2: { estimable: true, betaHost: 0.25 } };
  const opp = { teamKey: 'O', fieldPlayerCount: 5, derived: { gameOrderOfDay: 2, isHostingTeam: true } };
  const handrechnung = Math.exp(0.5 + 0.3 + 0.1 + 0.2) * Math.exp(0.25);
  assertNear(G.expectedGoalsAgainst(fit, opp), handrechnung, 1e-12, 'exp(mu+attack[O]+order+le6)·exp(betaHost) exakt (Gegner: 2. Spiel, Kader<=6, Ausrichter)');
  // dasselbe fit, aber defense[X] extrem verändert (-5 -> +500): Ergebnis darf sich NICHT ändern (kein defense-Term)
  const fitDefChanged = clone(fit); fitDefChanged.stage1.teams[1].defense = 500;
  assertEqual(G.expectedGoalsAgainst(fitDefChanged, opp), G.expectedGoalsAgainst(fit, opp), 'defense[eigenesTeam] hat KEINEN Einfluss auf expectedGA (bewusst kein Term)');
  // Gegner nicht Ausrichter -> kein Host-Faktor
  const opp2 = { ...opp, derived: { ...opp.derived, isHostingTeam: false } };
  assertNear(G.expectedGoalsAgainst(fit, opp2), Math.exp(0.5 + 0.3 + 0.1 + 0.2), 1e-12, 'isHostingTeam=false: kein Host-Faktor');
  const opp3 = { ...opp, derived: { ...opp.derived, isHostingTeam: null } };
  assertNear(G.expectedGoalsAgainst(fit, opp3), Math.exp(0.5 + 0.3 + 0.1 + 0.2), 1e-12, 'isHostingTeam=null: kein Host-Faktor');
  // Stufe 2 nicht schätzbar -> kein Host-Faktor, selbst wenn Gegner Ausrichter ist
  const fitNoStage2 = clone(fit); fitNoStage2.stage2 = { estimable: false, betaHost: null };
  assertNear(G.expectedGoalsAgainst(fitNoStage2, opp), Math.exp(0.5 + 0.3 + 0.1 + 0.2), 1e-12, 'stage2 nicht schätzbar: kein Host-Faktor, obwohl Gegner Ausrichter');
  // Gegner order=1 (Referenz) und Kader 7-8 (Referenz): keine Zusatzterme
  const oppRef = { teamKey: 'O', fieldPlayerCount: 7, derived: { gameOrderOfDay: 1, isHostingTeam: false } };
  assertNear(G.expectedGoalsAgainst(fit, oppRef), Math.exp(0.5 + 0.3), 1e-12, 'Gegner 1. Spiel + Kader 7-8 (Referenz): nur mu+attack');
  // Gegner Kader >=9
  const oppGe9 = { teamKey: 'O', fieldPlayerCount: 9, derived: { gameOrderOfDay: 1, isHostingTeam: false } };
  assertNear(G.expectedGoalsAgainst(fit, oppGe9), Math.exp(0.5 + 0.3 - 0.15), 1e-12, 'Gegner Kader>=9: ge9-Effekt');
  // Team nicht im Fit -> attack=0 (Ligaschnitt)
  const oppUnknown = { teamKey: 'ZZZ', fieldPlayerCount: 7, derived: { gameOrderOfDay: 1, isHostingTeam: false } };
  assertNear(G.expectedGoalsAgainst(fit, oppUnknown), Math.exp(0.5), 1e-12, 'unbekanntes Gegner-Team: attack=0 (Ligaschnitt)');
  // effects null (Spalte im Fit gedroppt) -> wie 0 behandelt
  const fitNullEff = clone(fit); fitNullEff.stage1.effects.order = null; fitNullEff.stage1.effects.fieldPlayers.le6 = null;
  assertNear(G.expectedGoalsAgainst(fitNullEff, opp2), Math.exp(0.5 + 0.3), 1e-12, 'effects=null (gedroppte Spalte) wirkt wie 0');
  // Eingabevalidierung
  throwsCode(() => G.expectedGoalsAgainst({ stage1: { mu: null, teams: [] } }, opp), 'invalid-input', 'mu fehlt/NaN -> Fehler');
  throwsCode(() => G.expectedGoalsAgainst(fit, { teamKey: 123 }), 'invalid-input', 'opponentRow.teamKey fehlt -> Fehler');
}

// ══ B. TvE-Vorzeichen ════════════════════════════════════════════════════
console.log('== B. TvE-Vorzeichen ==');
{
  const fit = { stage1: { mu: 0, effects: { order: 0, fieldPlayers: { le6: 0, ge9: 0 } }, teams: [{ teamKey: 'O', attack: Math.log(2) }] }, stage2: { estimable: false, betaHost: null } };
  const opp = { teamKey: 'O', fieldPlayerCount: 7, derived: { gameOrderOfDay: 1, isHostingTeam: null } };
  const expected = G.expectedGoalsAgainst(fit, opp);
  assertNear(expected, 2, 1e-12, 'Vorbedingung: expectedGA = 2');
  assertTrue(expected - 1 > 0, 'expected(2) > actual(1) => (expected-actual) positiv: weniger Gegentore als erwartet');
  assertTrue(expected - 5 < 0, 'expected(2) < actual(5) => (expected-actual) negativ: mehr Gegentore als erwartet');
}

// ══ B2. TvE/tvePerGame: Handrechnung über den kompletten fitGoalieRating-Pfad ═══
console.log('== B2. tve = Σ(expectedGA − actualGA), tvePerGame = tve / games (Handrechnung) ==');
{
  const b = background(19, { games: 24 });
  const g1 = b.game(D(-20), { home: 'A', guest: 'B' }); b.goalie(g1, 'home', 990, 'TvE-Goalie'); b.goal(g1, 'guest', { period: 1, absSec: 50 }); b.goal(g1, 'guest', { period: 1, absSec: 100 });
  const g2 = b.game(D(-10), { home: 'A', guest: 'C' }); b.goalie(g2, 'home', 990, 'TvE-Goalie'); b.goal(g2, 'guest', { period: 2, absSec: 1500 });
  const asOf = { date: D(0) };
  const r = G.fitGoalieRating(b.fx, { asOf });
  const p = byId(r)[990];
  // unabhängige Nachrechnung: exakt dieselbe Formel wie in expectedGoalsAgainst, aber im Test selbst aus dem M1-Fit gezogen
  const fit = T1.fitTeamStrength(b.fx.teamGames, { asOf });
  const opp1 = b.fx.teamGames.find((t) => t.seasonKey === g1.seasonKey && t.gameId === g1.gameId && t.side === 'guest');
  const opp2 = b.fx.teamGames.find((t) => t.seasonKey === g2.seasonKey && t.gameId === g2.gameId && t.side === 'guest');
  const e1 = G.expectedGoalsAgainst(fit, opp1); const e2 = G.expectedGoalsAgainst(fit, opp2);
  assertNear(p.expectedGA, e1 + e2, 1e-9, 'expectedGA = Σ der beiden unabhängig nachgerechneten Spiel-Erwartungen');
  assertNear(p.tve, (e1 - 2) + (e2 - 1), 1e-9, 'tve = Σ(expectedGA_i − actualGA_i), NICHT Σ(actualGA_i − expectedGA_i) (Vorzeichen)');
  assertNear(p.tvePerGame, p.tve / 2, 1e-12, 'tvePerGame = tve / games (echte Division, nicht tve selbst)');
  assertTrue(Math.abs(p.tve) > 1e-6 && Math.abs(p.tvePerGame - p.tve) > 1e-6, 'Vorbedingung: tve ≠ 0 und tvePerGame ≠ tve (Division macht tatsächlich einen Unterschied)');
}

// ══ H. Momentum: eigenes Tor -> chronologisch nächstes Tor ═══════════════
console.log('== H. momentumWindowsForGame: Richtung, Fenster, absSec=null, Reihenfolge über eventKey ==');
{
  const ev = (side, absSec, idx) => ({ eventKey: `9#${idx}`, teamSide: side, absSec });
  // eigenes Tor (home) bei 100s, Gegentor bei 160s (Differenz 60) -> within60 true
  assertEqual(G.momentumWindowsForGame([ev('home', 100, 0), ev('guest', 160, 1)], 'home'), { within60: 1, within120: 1, ownGoalsConsidered: 1, excludedOwnNullAbsSec: 0, excludedNextNullAbsSec: 0 }, '60 Sekunden später: within60 UND within120 (60 ⊂ 120)');
  // 61 Sekunden -> within60 false, within120 true
  assertEqual(G.momentumWindowsForGame([ev('home', 100, 0), ev('guest', 161, 1)], 'home'), { within60: 0, within120: 1, ownGoalsConsidered: 1, excludedOwnNullAbsSec: 0, excludedNextNullAbsSec: 0 }, '61 Sekunden: within60=false, within120=true');
  // 121 Sekunden -> beide false
  assertEqual(G.momentumWindowsForGame([ev('home', 100, 0), ev('guest', 221, 1)], 'home'), { within60: 0, within120: 0, ownGoalsConsidered: 1, excludedOwnNullAbsSec: 0, excludedNextNullAbsSec: 0 }, '121 Sekunden: beide Fenster false');
  // exakt 120 Sekunden -> within120 true, within60 false (Grenze eingeschlossen, <=, nicht <)
  assertEqual(G.momentumWindowsForGame([ev('home', 100, 0), ev('guest', 220, 1)], 'home'), { within60: 0, within120: 1, ownGoalsConsidered: 1, excludedOwnNullAbsSec: 0, excludedNextNullAbsSec: 0 }, 'exakt 120 Sekunden: within120=true (Grenze eingeschlossen), within60=false');
  // widersprüchliche Zeiten (eventKey-Reihenfolge und absSec-Reihenfolge stimmen nicht überein): negative Differenz wird NICHT gezählt
  assertEqual(G.momentumWindowsForGame([ev('home', 500, 0), ev('guest', 400, 1)], 'home'), { within60: 0, within120: 0, ownGoalsConsidered: 1, excludedOwnNullAbsSec: 0, excludedNextNullAbsSec: 0 }, 'widersprüchliche Zeiten (nächstes Tor laut eventKey später, aber absSec kleiner): negative Differenz wird defensiv nicht gezählt');
  // Gegentor VOR eigenem Tor: nicht zählen (Blickrichtung nur vorwärts)
  assertEqual(G.momentumWindowsForGame([ev('guest', 50, 0), ev('home', 100, 1)], 'home'), { within60: 0, within120: 0, ownGoalsConsidered: 1, excludedOwnNullAbsSec: 0, excludedNextNullAbsSec: 0 }, 'Gegentor vor eigenem Tor zählt nicht (kein Blick zurück)');
  // nächstes Tor ist wieder eigenes -> kein Gegentor, keine Zählung, kein Fehlerfall (beide eigenen Tore werden "considered")
  assertEqual(G.momentumWindowsForGame([ev('home', 100, 0), ev('home', 130, 1)], 'home'), { within60: 0, within120: 0, ownGoalsConsidered: 2, excludedOwnNullAbsSec: 0, excludedNextNullAbsSec: 0 }, 'nächstes Tor ist wieder eigenes: keine Zählung (beide eigenen Tore ohne Gegentor-Folge)');
  // eigenes Tor ist letztes Tor des Spiels -> kein Fehlerfall
  assertEqual(G.momentumWindowsForGame([ev('guest', 50, 0), ev('home', 200, 1)], 'home'), { within60: 0, within120: 0, ownGoalsConsidered: 1, excludedOwnNullAbsSec: 0, excludedNextNullAbsSec: 0 }, 'eigenes Tor als letztes Tor des Spiels: kein Fehlerfall, keine Zählung');
  // eigenes Tor mit absSec=null -> ausgeschlossen und gezählt
  assertEqual(G.momentumWindowsForGame([ev('home', null, 0), ev('guest', 30, 1)], 'home'), { within60: 0, within120: 0, ownGoalsConsidered: 0, excludedOwnNullAbsSec: 1, excludedNextNullAbsSec: 0 }, 'eigenes Tor absSec=null: ausgeschlossen und gezählt, keine Schätzung');
  // nächstes Tor mit absSec=null -> ausgeschlossen und gezählt (NICHT weiterspringen zum übernächsten)
  assertEqual(G.momentumWindowsForGame([ev('home', 100, 0), ev('guest', null, 1), ev('guest', 130, 2)], 'home'), { within60: 0, within120: 0, ownGoalsConsidered: 1, excludedOwnNullAbsSec: 0, excludedNextNullAbsSec: 1 }, 'nächstes Tor absSec=null: ausgeschlossen, KEIN Sprung zum übernächsten Tor');
  // Reihenfolge über eventKey (Index), unabhängig von absSec-Sortierbarkeit oder Array-Reihenfolge der Eingabe
  const evs = [ev('guest', 500, 2), ev('home', 100, 0), ev('guest', 130, 1)]; // Array-Reihenfolge NICHT chronologisch
  assertEqual(G.momentumWindowsForGame(evs, 'home'), { within60: 1, within120: 1, ownGoalsConsidered: 1, excludedOwnNullAbsSec: 0, excludedNextNullAbsSec: 0 }, 'Sortierung über eventKey-Index, nicht über Eingabe-Array-Reihenfolge oder absSec-Wert selbst');
  // zwei eigene Tore hintereinander, dann ein Gegentor: nur das direkt vorangehende eigene Tor bekommt die Zählung
  const evs2 = [ev('home', 0, 0), ev('home', 30, 1), ev('guest', 80, 2)];
  assertEqual(G.momentumWindowsForGame(evs2, 'home'), { within60: 1, within120: 1, ownGoalsConsidered: 2, excludedOwnNullAbsSec: 0, excludedNextNullAbsSec: 0 }, 'zwei eigene Tore hintereinander: erstes hat "eigenes Tor" als Nächstes (keine Zählung), zweites hat das Gegentor als Nächstes (zählt)');
  throwsCode(() => G.momentumWindowsForGame([{ eventKey: 'kaputt', teamSide: 'home', absSec: 1 }, ev('guest', 2, 0)], 'home'), 'invalid-input', 'eventKey ohne laufenden Index -> Fehler');
}

// ══ C. Solo/Shared ═══════════════════════════════════════════════════════
console.log('== C. Solo zählt voll, Shared ausschließlich als Zähler ==');
{
  const b = background(11);
  const g1 = b.game(D(-5), { home: 'A', guest: 'B', goalieCountHome: 1, goalieCountGuest: 1 });
  b.goalie(g1, 'home', 900, 'Solo-Goalie'); b.goal(g1, 'guest', { period: 1, absSec: 100 }); b.goal(g1, 'guest', { period: 2, absSec: 1300 });
  const g2 = b.game(D(-3), { home: 'A', guest: 'C', goalieCountHome: 2, goalieCountGuest: 1 });
  b.goalie(g2, 'home', 900, 'Solo-Goalie'); b.goalie(g2, 'home', 901, 'Zweiter Goalie'); b.goal(g2, 'guest', { period: 1, absSec: 200 }); b.goal(g2, 'guest', { period: 1, absSec: 260 }); b.goal(g2, 'guest', { period: 2, absSec: 1500 });
  const r = G.fitGoalieRating(b.fx, { asOf: { date: D(0) } });
  const p = byId(r);
  assertEqual([p[900].games, p[900].goalsAgainst, p[900].sharedGames], [1, 2, 1], 'Solo-Spiel zählt games/goalsAgainst voll, Shared-Spiel nur als sharedGames-Zähler');
  assertEqual([p[901].games, p[901].goalsAgainst, p[901].sharedGames], [0, 0, 1], 'zweiter Goalie im Shared-Spiel: games=0, goalsAgainst=0, sharedGames=1');
  assertEqual(r.quality.teamGames.solo, r.quality.teamGames.solo, 'Vorbedingung erreichbar'); // Platzhalter für Lesbarkeit
  assertTrue(p[900].expectedGA !== null && p[900].tve !== null, 'Solo-Goalie hat berechnete expectedGA/tve (nur aus dem Solo-Spiel)');
  // Shared-Spiel darf goalsAgainst NICHT verändert haben (nur die 2 Tore aus g1)
  assertEqual(p[900].goalsAgainst, 2, 'Shared-Spiel beeinflusst goalsAgainst des Solo-Goalies nicht (bereits geprüft, hier erneut explizit)');
}

// ══ D. 0-Spiele-Goalie ═══════════════════════════════════════════════════
console.log('== D. Goalie ohne Solo-Spiel bleibt enthalten ==');
{
  const b = background(12);
  const g1 = b.game(D(-5), { home: 'A', guest: 'B', goalieCountHome: 2, goalieCountGuest: 1 });
  b.goalie(g1, 'home', 910, 'Nur Shared'); b.goalie(g1, 'home', 911, 'Auch Shared'); b.goal(g1, 'guest', { period: 1, absSec: 10 });
  const r = G.fitGoalieRating(b.fx, { asOf: { date: D(0) } });
  const p = byId(r);
  assertTrue(r.players.some((x) => x.playerId === 910), '0-Spiele-Goalie ist in players[] enthalten (nicht entfernt)');
  assertEqual([p[910].games, p[910].sharedGames, p[910].expectedGA, p[910].tve, p[910].tvePerGame, p[910].tveCI90, p[910].weakShooterGA, p[910].weakShooterGAExpected, p[910].goalsAgainst], [0, 1, null, null, null, null, null, null, 0], '0 Spiele: alle numerischen Metriken null, goalsAgainst 0, confidence separat geprüft');
  assertEqual(p[910].confidence, 'insufficient', '0 Spiele: confidence = insufficient');
  assertEqual([p[910].splits.hz1vsHz2, p[910].splits.concededShortlyAfterOwnGoal], [null, null], '0 Spiele: Splits, die Spielereignisse voraussetzen, sind null');
  assertTrue(p[910].teams.length === 1 && p[910].teams[0] === 'A', '0 Spiele: teams[] bleibt erhalten (aus der Shared-Kaderzeile)');
  assertTrue(!r.rankList.some((x) => x.playerId === 910), '0-Spiele-Goalie ist nicht in rankList');
}

// ══ E/F. <4 gegenüber >=4 Spiele ═════════════════════════════════════════
console.log('== E/F. <4 Spiele: Werte vorhanden, insufficient, nicht in rankList; >=4: ok, kann in rankList stehen ==');
{
  const b = background(13);
  const gids = [];
  for (let i = 0; i < 3; i++) { const g = b.game(D(-30 + i * 2), { home: 'A', guest: 'B' }); b.goalie(g, 'home', 920, 'Wenig-Spiele'); b.goal(g, 'guest', { period: 1, absSec: 50 }); gids.push(g); }
  for (let i = 0; i < 5; i++) { const g = b.game(D(-20 + i * 2), { home: 'A', guest: 'C' }); b.goalie(g, 'home', 921, 'Viel-Spiele'); b.goal(g, 'guest', { period: 1, absSec: 50 }); }
  const r = G.fitGoalieRating(b.fx, { asOf: { date: D(0) } });
  const p = byId(r);
  assertEqual([p[920].games, p[920].confidence], [3, 'insufficient'], '3 Spiele: confidence insufficient');
  assertTrue(p[920].expectedGA !== null && p[920].tve !== null && p[920].tvePerGame !== null, '3 Spiele: numerische Werte trotzdem vorhanden (kein null wegen Sichtbarkeit)');
  assertTrue(!r.rankList.some((x) => x.playerId === 920), '3 Spiele: nicht in rankList');
  assertEqual([p[921].games, p[921].confidence], [5, 'ok'], '5 Spiele: confidence ok');
  assertTrue(r.rankList.some((x) => x.playerId === 921), '5 Spiele: kann in rankList stehen');
  assertEqual(r.options.minGamesForRank, 4, 'Schwelle 4 im Optionsblock dokumentiert');
}

// ══ G. Bootstrap ═════════════════════════════════════════════════════════
console.log('== G. Bootstrap: Determinismus, Seed, Spielebene ==');
{
  const b = background(21, { games: 30 });
  const g = b.game(D(-15), { home: 'A', guest: 'B' }); b.goalie(g, 'home', 930, 'Boot-Goalie');
  for (let i = 0; i < 6; i++) { const gg = b.game(D(-40 + i * 4), { home: 'A', guest: ['B', 'C', 'D'][i % 3] }); b.goalie(gg, 'home', 930, 'Boot-Goalie'); b.goal(gg, 'guest', { period: 1, absSec: 100 + i * 50 }); }
  const opts = { asOf: { date: D(0) }, replicates: 25, seed: 42 };
  const r1 = G.fitGoalieRating(b.fx, opts);
  const r2 = G.fitGoalieRating(b.fx, opts);
  assertEqual(JSON.stringify(r1), JSON.stringify(r2), 'gleicher Seed: byte-/wertgleiches Ergebnis (inkl. tveCI90)');
  const p1 = byId(r1)[930];
  assertTrue(Array.isArray(p1.tveCI90) && p1.tveCI90.length === 2 && p1.tveCI90[0] <= p1.tveCI90[1], 'tveCI90 ist ein geordnetes 2er-Intervall');
  const rOther = G.fitGoalieRating(b.fx, { ...opts, seed: 4242 });
  assertTrue(JSON.stringify(byId(rOther)[930].tveCI90) !== JSON.stringify(p1.tveCI90), 'anderer Seed kann ein anderes CI erzeugen');
  const rNoBoot = G.fitGoalieRating(b.fx, { asOf: { date: D(0) } });
  assertEqual(byId(rNoBoot)[930].tveCI90, null, 'ohne replicates/seed: tveCI90 = null (kein Bootstrap angefordert)');
  assertEqual(r1.options.bootstrap, { replicates: 25, seed: 42, level: 0.9, unit: 'game' }, 'Options dokumentieren Bootstrap-Parameter inkl. unit=game');
  throwsCode(() => G.fitGoalieRating(b.fx, { asOf: { date: D(0) }, replicates: 25 }), 'invalid-input', 'replicates ohne seed -> Fehler');
  throwsCode(() => G.fitGoalieRating(b.fx, { asOf: { date: D(0) }, seed: 1 }), 'invalid-input', 'seed ohne replicates -> Fehler');
  // Game-Level-Resampling, beide Seiten gemeinsam: unabhängig über bootstrapTeamStrength nachgewiesen (M1-eigener Mechanismus, hier nur Body des Vertrags geprüft)
  const bs = T1.bootstrapTeamStrength(b.fx.teamGames, { asOf: { date: D(0) }, replicates: 25, seed: 42, keepReplicates: true });
  assertEqual(bs.bootstrap.unit, 'game', 'Vorbedingung: M1s eigenes Bootstrap (von fitGoalieRating verwendet) resampled auf Spielebene');
}

// ══ I. Halbzeit ══════════════════════════════════════════════════════════
console.log('== I. HZ1/HZ2 ausschließlich über period, robust gegenüber kumulierter Zeit ==');
{
  const b = background(14);
  const g = b.game(D(-5), { home: 'A', guest: 'B' }); b.goalie(g, 'home', 940, 'HZ-Goalie');
  b.goal(g, 'guest', { period: 1, absSec: 300 });
  b.goal(g, 'guest', { period: 2, absSec: 1350 }); // normales Format: HZ2
  b.goal(g, 'guest', { period: 2, absSec: 1444 }); // "kumuliertes" Beispiel (siehe echte Daten): period=2, absSec>1200 -> weiterhin HZ2, NICHT HZ1
  const r = G.fitGoalieRating(b.fx, { asOf: { date: D(0) } });
  const p = byId(r)[940];
  assertEqual(p.splits.hz1vsHz2, { hz1: 1, hz2: 2 }, 'period bestimmt HZ, kumulierte Zeit (absSec>1200 bei period=2) wird korrekt weiterhin HZ2 zugeordnet, nicht fälschlich HZ1');
}

// ══ J. Weak Shooter (gegnerspezifisch, nicht zirkulär) ═══════════════════
console.log('== J. weakShooterGAExpected: gegnerspezifisch, unabhängig vom betrachteten Spiel, nicht zirkulär ==');
{
  const b = background(15, { games: 20 });
  // Gegner-Team WEAK: 3 Feldspieler, sehr ungleiche Torraten (damit eine Schrumpfungs-Rangfolge/Stufen entstehen) über viele Spiele -> mind. 1 Spieler landet in tier 'weak'
  const teamWeakGames = [];
  for (let i = 0; i < 8; i++) { const gg = b.game(D(-200 + i * 5), { home: 'WEAK', guest: 'X', fpHome: 8, fpGuest: 8 }); b.field(gg, 'home', 5001, 'Vielschütze'); b.field(gg, 'home', 5002, 'Wenigschütze'); for (let k = 0; k < 4; k++) b.goal(gg, 'home', { scorer: 5001, period: 1, absSec: 100 + k * 10 }); teamWeakGames.push(gg); }
  { const gg = b.game(D(-190), { home: 'WEAK', guest: 'X' }); b.field(gg, 'home', 5001, 'Vielschütze'); b.field(gg, 'home', 5002, 'Wenigschütze'); b.goal(gg, 'home', { scorer: 5002, period: 1, absSec: 100 }); }
  // Gegner-Team TOP: ein einzelner sehr guter Schütze über viele Spiele -> tier 'top'
  for (let i = 0; i < 8; i++) { const gg = b.game(D(-200 + i * 5), { home: 'TOPT', guest: 'X', fpHome: 8, fpGuest: 8 }); b.field(gg, 'home', 5010, 'Topschütze'); for (let k = 0; k < 5; k++) b.goal(gg, 'home', { scorer: 5010, period: 1, absSec: 100 + k * 10 }); }
  // zwei Goalies, jeweils GENAU EIN eigenes Solo-Spiel gegen je einen der beiden Gegner, mit IDENTISCHER Roh-Gegentorzahl und identischen Torzeitpunkten (aber ohne bestimmbaren Torschützen -> tierUnknown im eigenen Spiel)
  const gA = b.game(D(-10), { home: 'Y', guest: 'WEAK' }); b.goalie(gA, 'home', 950, 'Goalie-vs-Weak'); b.goal(gA, 'guest', { period: 1, absSec: 500 }); b.goal(gA, 'guest', { period: 2, absSec: 1500 });
  const gB = b.game(D(-10), { home: 'Y', guest: 'TOPT' }); b.goalie(gB, 'home', 951, 'Goalie-vs-Top'); b.goal(gB, 'guest', { period: 1, absSec: 500 }); b.goal(gB, 'guest', { period: 2, absSec: 1500 });
  const asOf = { date: D(0) };
  const r = G.fitGoalieRating(b.fx, asOf);
  const p = byId(r);
  assertEqual([p[950].goalsAgainst, p[951].goalsAgainst], [2, 2], 'Vorbedingung: identische Roh-Gegentorzahl (2) bei beiden Goalies');
  assertEqual([p[950].weakShooterGA, p[951].weakShooterGA], [0, 0], 'eigenes weakShooterGA=0 bei beiden (die konkreten Gegentore im jeweils eigenen Spiel haben keinen bestimmbaren Torschützen -> tierUnknown, nicht weak)');
  assertTrue(p[950].weakShooterGAExpected > p[951].weakShooterGAExpected, `weakShooterGAExpected unterscheidet sich trotz identischem Rohwert (Gegner WEAK: ${p[950].weakShooterGAExpected}, Gegner TOP: ${p[951].weakShooterGAExpected})`);
  // Unabhängige Nachrechnung: Referenz kommt NICHT aus dem eigenen Spiel (dort gibt es gar keine zuordenbaren Tore), sondern aus fitShooterQuality auf denselben Daten
  const sq = M2.fitShooterQuality(b.fx, asOf);
  const tierOf = new Map(sq.players.map((x) => [x.playerId, x.tier]));
  let weakCountWeak = 0, totalWeak = 0, weakCountTop = 0, totalTop = 0;
  for (const e of b.fx.goalEvents) {
    if (e.derived.scorerMatch !== 'roster') continue;
    const t = tierOf.get(e.derived.scorerPlayerId);
    if (t === undefined || t === null) continue;
    if (e.teamKey === 'WEAK') { totalWeak++; if (t === 'weak') weakCountWeak++; }
    if (e.teamKey === 'TOPT') { totalTop++; if (t === 'weak') weakCountTop++; }
  }
  const shareWeak = totalWeak > 0 ? weakCountWeak / totalWeak : null;
  const shareTop = totalTop > 0 ? weakCountTop / totalTop : null;
  assertTrue(shareWeak !== null && shareTop !== null, `Vorbedingung: beide Gegner haben tier-bekannte Tore (WEAK ${weakCountWeak}/${totalWeak}, TOP ${weakCountTop}/${totalTop})`);
  assertNear(p[950].weakShooterGAExpected, 2 * shareWeak, 1e-9, 'weakShooterGAExpected(WEAK) = eigenes goalsAgainst · unabhängig nachgerechnete Weak-Share des Gegners WEAK');
  assertNear(p[951].weakShooterGAExpected, 2 * shareTop, 1e-9, 'weakShooterGAExpected(TOP) = eigenes goalsAgainst · unabhängig nachgerechnete Weak-Share des Gegners TOP');
  assertTrue(shareWeak > shareTop, 'Vorbedingung bestätigt: Gegner WEAK hat höhere Weak-Share als Gegner TOP');
  // tierUnknown darf nicht als weak/top gezählt werden: eigene Konsistenzprüfung
  assertTrue(r.quality.scoring.tierUnknown >= 1, 'mindestens ein Tor ohne Torschützen (own/na-lose "roster ohne Spieler" o.ä.) erzeugt tierUnknown > 0');
}

// ══ K. asOf-Konsistenz/Leakage ═══════════════════════════════════════════
console.log('== K. asOf: kein Leakage, identisches asOf an M1 und M2 ==');
{
  const b = background(16, { games: 30 });
  const g = b.game(D(-10), { home: 'A', guest: 'B' }); b.goalie(g, 'home', 960, 'AsOf-Goalie'); b.goal(g, 'guest', { period: 1, absSec: 100, scorer: null });
  const asOfDate = D(0);
  const before = G.fitGoalieRating(b.fx, { asOf: { date: asOfDate } });
  const tampered = clone(b.fx);
  for (const t of tampered.teamGames) if (t.date > asOfDate) { t.teamKey = 'ZUKUNFT'; t.goalsAgainst += 500; t.goalsFor += 500; }
  for (const e of tampered.goalEvents) { const gm = tampered.teamGames.find((t) => t.seasonKey === e.seasonKey && t.gameId === e.gameId); if (gm && gm.date > asOfDate) e.derived.scorerPlayerId = 999999; }
  const g2 = { seasonKey: 'S1', gameId: 99999, home: 'A', guest: 'B' };
  tampered.teamGames.push({ seasonKey: 'S1', gameId: 99999, side: 'home', teamKey: 'A', opponentKey: 'B', date: D(5), goalsFor: 0, goalsAgainst: 50, fieldPlayerCount: 8, goalieCount: 1, derived: { gameOrderOfDay: 1, isHostingTeam: null } });
  tampered.teamGames.push({ seasonKey: 'S1', gameId: 99999, side: 'guest', teamKey: 'B', opponentKey: 'A', date: D(5), goalsFor: 50, goalsAgainst: 0, fieldPlayerCount: 8, goalieCount: 1, derived: { gameOrderOfDay: 1, isHostingTeam: null } });
  tampered.rosterEntries.push({ seasonKey: 'S1', gameId: 99999, side: 'home', teamKey: 'A', playerId: 960, playerName: 'AsOf-Goalie', isGoalie: true, position: 'Tor' });
  void g2;
  const after = G.fitGoalieRating(tampered, { asOf: { date: asOfDate } });
  assertEqual(JSON.stringify(after.players), JSON.stringify(before.players), 'Manipulation und Ergänzung von Daten NACH asOf ändert kein Spieler-Ergebnis (kein Leakage)');
  assertEqual(after.rankList, before.rankList, 'rankList unverändert durch Daten nach asOf');
  // identisches asOf an M1 und M2
  const fitAsOf = T1.fitTeamStrength(b.fx.teamGames, { asOf: { date: asOfDate } }).asOf;
  const sqAsOf = M2.fitShooterQuality(b.fx, { asOf: { date: asOfDate } }).asOf;
  assertEqual([fitAsOf, sqAsOf, before.asOf], [{ date: asOfDate, inclusive: true }, { date: asOfDate, inclusive: true }, { date: asOfDate, inclusive: true }], 'M1, M2 und M3 erhalten identisches asOf (Datum und inclusive)');
}

// ══ L. Goalie-Team-Historie ══════════════════════════════════════════════
console.log('== L. Ein Goalie mit zwei tatsächlichen Teams: eine playerId-Zeile, teams[] beide, keine SG-Aufteilung ==');
{
  const b = background(17);
  const g1 = b.game(D(-300), { seasonKey: 'S0', home: 'ALT-TEAM', guest: 'X' }); b.goalie(g1, 'home', 970, 'Wanderer'); b.goal(g1, 'guest', { period: 1, absSec: 50 });
  const g2 = b.game(D(-10), { seasonKey: 'S1', home: 'NEU-TEAM', guest: 'X' }); b.goalie(g2, 'home', 970, 'Wanderer'); b.goal(g2, 'guest', { period: 1, absSec: 60 });
  const r = G.fitGoalieRating(b.fx, { asOf: { date: D(0) } });
  const p = byId(r)[970];
  assertEqual(p.teams, ['NEU-TEAM', 'ALT-TEAM'], 'teams[] enthält beide tatsächlichen teamKeys, neuestes Datum zuerst (M2-Sortierregel)');
  assertEqual(p.games, 2, 'beide Spiele in EINER playerId-Aggregation (kein separates Team-Record)');
  assertTrue(!('team' in p) && !('statisticalClub' in p) && !('statisticalClubKeys' in p) && !('clubKeys' in p), 'kein Vereins-/SG-Feld, nur teams[] mit tatsächlichen teamKeys');
}

// ══ M. Reihenfolge ═══════════════════════════════════════════════════════
console.log('== M. Eingabereihenfolge ändert das Ergebnis nicht ==');
{
  const b = background(18, { games: 24 });
  const g = b.game(D(-8), { home: 'A', guest: 'B' }); b.goalie(g, 'home', 980, 'Order-Goalie'); b.goal(g, 'guest', { period: 1, absSec: 40 }); b.goal(g, 'guest', { period: 2, absSec: 1300 });
  const asOf = { date: D(0) };
  const ref = JSON.stringify(G.fitGoalieRating(b.fx, asOf));
  const rng = S.createRng(99);
  let same = true;
  for (let i = 0; i < 15; i++) {
    const shuffled = { teamGames: shuffle(b.fx.teamGames, rng), goalEvents: shuffle(b.fx.goalEvents, rng), rosterEntries: shuffle(b.fx.rosterEntries, rng) };
    if (JSON.stringify(G.fitGoalieRating(shuffled, asOf)) !== ref) same = false;
  }
  assertTrue(same, 'Eingabereihenfolge (15 Permutationen aller drei Arrays) ändert das Ergebnis nicht (bitgleich)');
  const before = clone(b.fx);
  G.fitGoalieRating(b.fx, asOf);
  assertEqual(b.fx, before, 'Eingabe wird nicht verändert');
}

// ══ N. Realdaten-Rauchtest ═══════════════════════════════════════════════
console.log('== N. Reale M0-Daten: Rauchtest gegen erwartete Plausibilitätswerte ==');
{
  const model = await buildLeagueModel();
  const data = { teamGames: model.seasons.flatMap((s) => s.teamGames), goalEvents: model.seasons.flatMap((s) => s.goalEvents), rosterEntries: model.seasons.flatMap((s) => s.rosterEntries) };
  const r = G.fitGoalieRating(data);
  assertEqual(r.status, 'ok', 'echte Daten: M1 schätzbar, Status ok');
  assertEqual(r.players.length, 43, '43 Goalies');
  assertEqual(r.quality.teamGames.total, 428, '428 Team-Spiel-Zeilen im Fenster');
  assertEqual(r.quality.teamGames.solo, 365, '365 Solo-Goalie-Zeilen');
  assertEqual(r.quality.teamGames.shared, 61, '61 Shared-Goalie-Zeilen');
  assertEqual(r.quality.teamGames.none, 2, '2 Team-Spiele ohne Goalie');
  assertEqual(r.players.filter((p) => p.games > 0).length, 39, '39 Goalies mit mindestens einem Solo-Spiel');
  assertEqual(r.players.filter((p) => p.games > 0 && p.games < 4).length, 16, '16 Goalies mit 1–3 Solo-Spielen');
  assertEqual(r.players.filter((p) => p.games === 0).length, 4, '4 Goalies ganz ohne Solo-Spiel');
  assertTrue(finiteEverywhere(r), 'echte Daten: keine NaN/Infinity im Ergebnis');
  assertTrue(r.players.every((p) => p.highLeverageGA === null), 'highLeverageGA ist für alle Goalies null');
  assertTrue(r.warnings.some((w) => w.code === 'team-games-without-goalie' && w.count === 2), 'Warnung team-games-without-goalie ×2');
  assertTrue(r.warnings.some((w) => w.code === 'shorthanded-split-not-available'), 'Warnung shorthanded-split-not-available (bewusst nicht implementiert, siehe Kopfkommentar)');
  assertTrue(r.players.every((p) => p.splits.shorthandedVsEqual === null), 'shorthandedVsEqual ist ligaweit null (kein erfundener Wert), andere Splits unabhängig davon vorhanden');
  assertTrue(r.players.some((p) => p.splits.order1vs2.order1.games > 0) && r.players.some((p) => p.splits.order1vs2.order2.games > 0), 'order1vs2-Split hat auf echten Daten tatsächlich beide Gruppen belegt');
  const rng = S.createRng(3);
  const shuffled = { teamGames: shuffle(data.teamGames, rng), goalEvents: shuffle(data.goalEvents, rng), rosterEntries: shuffle(data.rosterEntries, rng) };
  assertEqual(JSON.stringify(G.fitGoalieRating(shuffled)) === JSON.stringify(r), true, 'echte Daten: vertauschte Eingabereihenfolge ändert das Ergebnis nicht');
}

// ══ Leerzustand / Eingabevalidierung ═════════════════════════════════════
console.log('== Leerzustand und Eingabevalidierung ==');
{
  const empty = G.fitGoalieRating({ teamGames: [], goalEvents: [], rosterEntries: [] });
  assertEqual([empty.status, empty.players, empty.rankList, empty.asOf.date], ['empty', [], [], null], 'ganz ohne Daten: gültiger Leerzustand');
  assertTrue(finiteEverywhere(empty), 'Leerzustand: keine NaN/Infinity');
  for (const bad of [null, undefined, {}, { teamGames: [] }, { teamGames: 'x', goalEvents: [], rosterEntries: [] }]) throwsCode(() => G.fitGoalieRating(bad), 'invalid-input', `ungültige Eingabe ${JSON.stringify(bad)} -> Fehler`);
  for (const bad of [0, -1, NaN, Infinity]) throwsCode(() => G.fitGoalieRating({ teamGames: [], goalEvents: [], rosterEntries: [] }, { halfLifeDays: bad }), 'invalid-input', `halfLifeDays=${bad} -> Fehler`);
}

// ══ Determinismus (zwei Läufe) ════════════════════════════════════════════
console.log('== Determinismus: zwei identische Läufe ==');
{
  const model = await buildLeagueModel();
  const data = { teamGames: model.seasons.flatMap((s) => s.teamGames), goalEvents: model.seasons.flatMap((s) => s.goalEvents), rosterEntries: model.seasons.flatMap((s) => s.rosterEntries) };
  assertEqual(JSON.stringify(G.fitGoalieRating(data)), JSON.stringify(G.fitGoalieRating(data)), 'zwei Läufe auf echten Daten: byte-identisch');
}

console.log('');
if (failures > 0) {
  console.log(`${failures} Test(s) fehlgeschlagen.`);
  process.exitCode = 1;
} else {
  console.log('Alle Tests erfolgreich.');
  process.exitCode = 0;
}

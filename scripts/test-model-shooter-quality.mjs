#!/usr/bin/env node
// P3 Runde 2 · Test für scripts/model/shooter-quality.mjs (M2 Torschützen-Qualität, Gamma-Poisson im Pseudo-Spiele-Modell).
//
// Erwartungswerte stammen aus Handrechnung (kleine Fixtures), aus einer UNABHÄNGIGEN Nachrechnung im Test (eigene Gewichte über
// Date.parse, eigene Summen aus den Wahrheitswerten des Generators, Prior/Posterior über stats.mjs auf diesen unabhängigen Zählern)
// oder aus dem Rohzähler der echten M0-Daten (eigene Schleifen) — nicht aus dem getesteten Modul. Alle Zufallswerte haben feste Seeds.
// Die numerischen Grundlagen (Gamma-Funktionen, Prior-Momente) sind in test-model-stats.mjs geprüft; hier geht es um Aufbau der
// Spieler-Spiel-Zeilen, Zeitachse, Aggregation, Stufen, Identität, Leerzustände und Determinismus.
//
// Aufruf: node scripts/test-model-shooter-quality.mjs

import * as S from './model/stats.mjs';
import * as T1 from './model/team-strength.mjs';
import * as Q from './model/shooter-quality.mjs';
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

// ── Unabhängige Hilfen ──────────────────────────────────────────────────
/** Datum: 2025-04-11 plus n Tage (UTC), unabhängig von dayNumber. */
const D = (n) => new Date(Date.UTC(2025, 3, 11) + n * 86400000).toISOString().slice(0, 10);
/** Gewicht 2^(−Alter/H), Alter in Tagen über Date.parse (unabhängig von timeWeight). */
const refWeight = (dateIso, refIso, H = 365) => 2 ** (-((Date.parse(refIso) - Date.parse(dateIso)) / 86400000) / H);
const shuffle = (arr, rng) => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = rng.nextInt(i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const refPoisson = (rng, lambda) => { const u = rng.nextFloat(); let k = 0; let p = Math.exp(-lambda); let cum = p; while (u > cum && k < 100) { k++; p *= lambda / k; cum += p; } return k; };
const byId = (res) => Object.fromEntries(res.players.map((p) => [p.playerId, p]));

/** Kleiner Fixture-Baukasten im M0-Format (nur die Felder, die M2 liest). */
function makeFx() {
  const fx = { teamGames: [], goalEvents: [], rosterEntries: [], penaltyShotEvents: [] };
  let nextGame = 1;
  const api = {
    fx,
    game(date, { seasonKey = 'S1', matchdayNumber = 1, home = 'A', guest = 'B', gameId } = {}) {
      const id = gameId ?? nextGame++;
      for (const [side, teamKey, opp] of [['home', home, guest], ['guest', guest, home]]) fx.teamGames.push({ seasonKey, gameId: id, side, teamKey, opponentKey: opp, date, matchdayNumber });
      return { seasonKey, gameId: id, home, guest };
    },
    roster(g, side, playerId, name, isGoalie = false) {
      fx.rosterEntries.push({ seasonKey: g.seasonKey, gameId: g.gameId, side, teamKey: side === 'home' ? g.home : g.guest, playerId, playerName: name, isGoalie, position: isGoalie ? 'Tor' : 'Feld' });
    },
    goal(g, side, { scorer = null, match = 'roster', assist = null, kind = null, own = false, na = false, pen = false } = {}) {
      const assistKind = kind ?? (assist === null ? 'none' : 'player');
      const ev = {
        seasonKey: g.seasonKey, gameId: g.gameId, eventKey: `${g.seasonKey}-${g.gameId}-${fx.goalEvents.length}`, teamSide: side, teamKey: side === 'home' ? g.home : g.guest,
        isOwnGoal: own, isNotAssigned: na, isPenaltyShot: pen,
        derived: { scorerPlayerId: scorer, scorerMatch: own || na ? 'placeholder' : match, assistKind, assistPlayerId: assist },
      };
      fx.goalEvents.push(ev);
      if (pen) fx.penaltyShotEvents.push({ seasonKey: g.seasonKey, gameId: g.gameId, eventKey: ev.eventKey, teamSide: side });
    },
  };
  return api;
}

/** Synthetische Liga (feste Seeds): 4 Teams à 10 Feldspieler, je Spiel 8 im Kader + 1 Goalie; Tore ~ Poisson(λᵢ), Assists auf zufällige Mitspieler. */
function synthetic({ seed, games = 40, dateOf = (i) => D(-i * 9) }) {
  const rng = S.createRng(seed);
  const b = makeFx();
  const teams = ['A', 'B', 'C', 'D'];
  const lambda = {}; const nu = {}; // nu = Assist-Neigung (ungleich verteilt, damit die Assists überdispers sind)
  const truth = {}; // playerId → [{ date, goals, assists }]
  for (let t = 0; t < 4; t++) for (let k = 0; k < 10; k++) { lambda[t * 100 + k + 1] = 0.9 * Math.exp((rng.nextFloat() - 0.5) * 2.4); nu[t * 100 + k + 1] = 0.15 + 3 * rng.nextFloat() ** 2; }
  for (let i = 0; i < games; i++) {
    const ta = rng.nextInt(4);
    let tb = rng.nextInt(3); if (tb >= ta) tb++;
    const date = dateOf(i);
    const g = b.game(date, { seasonKey: 'S1', matchdayNumber: i + 1, home: teams[ta], guest: teams[tb] });
    for (const [side, t] of [['home', ta], ['guest', tb]]) {
      const pool = shuffle(Array.from({ length: 10 }, (_, k) => t * 100 + k + 1), rng).slice(0, 8);
      for (const id of pool) { b.roster(g, side, id, `Spieler ${id}`); (truth[id] ??= []).push({ date, goals: 0, assists: 0 }); }
      b.roster(g, side, 900 + t, `Goalie ${t}`, true);
      for (const id of pool) {
        const n = refPoisson(rng, lambda[id]);
        for (let j = 0; j < n; j++) {
          let assist = null;
          if (rng.nextFloat() < 0.7) { const cands = pool.filter((x) => x !== id); const tot = cands.reduce((a, x) => a + nu[x], 0); let u = rng.nextFloat() * tot; assist = cands.find((x) => (u -= nu[x]) < 0) ?? cands[cands.length - 1]; }
          b.goal(g, side, { scorer: id, assist });
          truth[id].at(-1).goals++;
          if (assist !== null) truth[assist].at(-1).assists++;
        }
      }
    }
  }
  return { data: { teamGames: b.fx.teamGames, goalEvents: b.fx.goalEvents, rosterEntries: b.fx.rosterEntries }, truth };
}

/** Unabhängige Nachrechnung eines Standes aus den Wahrheitswerten: Gewichte über Date.parse, Prior/Posterior über stats.mjs. */
function refFit(truth, asOfDate, { inclusive = true, H = 365 } = {}) {
  const ok = (d) => (inclusive ? d <= asOfDate : d < asOfDate);
  const agg = {};
  for (const [id, rows] of Object.entries(truth)) {
    const inside = rows.filter((r) => ok(r.date));
    if (!inside.length) continue;
    const w = inside.map((r) => refWeight(r.date, asOfDate, H));
    agg[id] = {
      games: inside.length, goals: inside.reduce((a, r) => a + r.goals, 0), assists: inside.reduce((a, r) => a + r.assists, 0),
      exposure: S.sum(w), goalsW: S.sum(inside.map((r, i) => w[i] * r.goals)), assistsW: S.sum(inside.map((r, i) => w[i] * r.assists)), pointsW: S.sum(inside.map((r, i) => w[i] * (r.goals + r.assists))),
    };
  }
  const ids = Object.keys(agg).sort((a, b) => a - b);
  const priors = {};
  for (const [t, key] of [['goals', 'goalsW'], ['assists', 'assistsW'], ['points', 'pointsW']]) priors[t] = S.estimateGammaPrior(ids.map((id) => ({ count: agg[id][key], exposure: agg[id].exposure })));
  return { agg, ids, priors };
}

// ══ A. Spieler-Spiel-Aggregation ═════════════════════════════════════════
console.log('== A. Kaderplatz = 1 Spieler-Spiel; Tore und Exposure ==');
{
  const b = makeFx();
  const g1 = b.game(D(0)); const g2 = b.game(D(0));
  for (const g of [g1, g2]) { b.roster(g, 'home', 11, 'Anna'); b.roster(g, 'home', 12, 'Berta'); b.roster(g, 'guest', 21, 'Cora'); }
  b.goal(g1, 'home', { scorer: 11 }); b.goal(g1, 'home', { scorer: 11 }); // zwei Tore im selben Spiel
  b.goal(g1, 'home', { scorer: 12 }); b.goal(g2, 'guest', { scorer: 21 });
  const before = clone(b.fx);
  const r = Q.fitShooterQuality(b.fx, { asOf: { date: D(0) } });
  const p = byId(r);
  assertEqual([p[11].games, p[11].goals], [2, 2], 'zwei Tore in einem Spiel, zwei Kaderspiele: goals = 2, games = 2 (nicht 3)');
  assertEqual([p[12].games, p[12].goals, p[21].games, p[21].goals], [2, 1, 2, 1], 'zwei Spieler im selben Spiel werden getrennt gezählt');
  assertEqual([p[11].weightedExposure, p[12].weightedExposure], [2, 2], 'Exposure = Σ Gewichte = Anzahl Kaderspiele bei Gewicht 1 (alle Spiele am asOf-Datum)');
  assertEqual([r.quality.roster.playerGames, r.quality.goals.events, r.quality.goals.attributed], [6, 4, 4], 'Zählung: 6 Kaderplätze, 4 Tore, alle zugeordnet');
  assertEqual(r.players.map((x) => x.playerId), [11, 12, 21], 'Spieler nach playerId aufsteigend');
  assertEqual(b.fx, before, 'Eingabe wird nicht verändert');
  // doppelte Kaderzeile: nur eine Exposure, Tor nur einmal
  const d = makeFx();
  const dg = d.game(D(0));
  d.roster(dg, 'home', 11, 'Anna'); d.roster(dg, 'home', 11, 'Anna'); d.roster(dg, 'home', 12, 'Berta');
  d.goal(dg, 'home', { scorer: 11 });
  const rd = Q.fitShooterQuality(d.fx, { asOf: { date: D(0) } });
  assertEqual([byId(rd)[11].games, byId(rd)[11].goals, rd.quality.roster.duplicate, rd.quality.roster.playerGames], [1, 1, 1, 2], 'doppelte Kaderzeile (gleiche playerId im selben Spiel): Exposure und Tor genau einmal, Warnzähler 1');
  assertTrue(rd.warnings.some((w) => w.code === 'roster-duplicate-row' && w.count === 1), 'doppelte Kaderzeile erzeugt Warnung roster-duplicate-row');
  // widersprüchliche Duplikate (anderes Team/andere Schreibweise): das Ergebnis hängt nicht von der Eingabereihenfolge ab
  const dd = makeFx(); const ddg = dd.game(D(0), { home: 'A', guest: 'B' });
  const rowZ = { seasonKey: 'S1', gameId: ddg.gameId, side: 'home', teamKey: 'Z-team', playerId: 11, playerName: 'Zed', isGoalie: false }; const rowA = { ...rowZ, side: 'guest', teamKey: 'A-team', playerName: 'Abel' };
  const fwd = Q.fitShooterQuality({ ...dd.fx, rosterEntries: [rowZ, rowA] }, { asOf: { date: D(0) } }); const rev = Q.fitShooterQuality({ ...dd.fx, rosterEntries: [rowA, rowZ] }, { asOf: { date: D(0) } });
  assertEqual([JSON.stringify(fwd) === JSON.stringify(rev), byId(fwd)[11].games, byId(fwd)[11].teams], [true, 1, ['A-team']], 'widersprüchliche Duplikate: kanonisch gewinnt die Zeile mit dem kleineren Schlüssel (Seite/teamKey), unabhängig von der Eingabereihenfolge; Exposure 1');
}

// ══ B. Goalie ═════════════════════════════════════════════════════════════
console.log('== B. Goalies: Kaderzeilen ausgeschlossen, Goalie-Assists nicht zugerechnet ==');
{
  const b = makeFx();
  const g = b.game(D(0));
  b.roster(g, 'home', 11, 'Anna'); b.roster(g, 'home', 12, 'Berta'); b.roster(g, 'home', 900, 'Gina Goalie', true);
  b.goal(g, 'home', { scorer: 11, assist: 900 }); // Assist vom Goalie
  b.goal(g, 'home', { scorer: 11, assist: 12 });
  const r = Q.fitShooterQuality(b.fx, { asOf: { date: D(0) } });
  const p = byId(r);
  assertEqual(r.players.map((x) => x.playerId), [11, 12], 'Goalie erhält keine Spielerzeile');
  assertEqual([p[11].assists, p[12].assists], [0, 1], 'Assist des Goalies wird keinem Feldspieler zugerechnet; der Feldspieler-Assist zählt');
  assertEqual([r.quality.roster.goalieExcluded, r.quality.assists.byGoalie, r.quality.assists.attributed], [1, 1, 1], 'Zähler: 1 Goalie-Zeile ausgeschlossen, 1 Goalie-Assist, 1 zugeordneter Assist');
  assertTrue(r.warnings.some((w) => w.code === 'assists-by-goalies-not-attributed' && w.count === 1), 'Goalie-Assist erzeugt Warnung');
  // Fehlendes/ungültiges Goalie-Flag ist kein Feldspieler
  const c = makeFx();
  const cg = c.game(D(0));
  c.roster(cg, 'home', 11, 'Anna'); c.fx.rosterEntries.push({ seasonKey: 'S1', gameId: cg.gameId, side: 'home', teamKey: 'A', playerId: 13, playerName: 'Ohne Flag' });
  const rc = Q.fitShooterQuality(c.fx, { asOf: { date: D(0) } });
  assertEqual([rc.players.map((x) => x.playerId), rc.quality.roster.invalidGoalieFlag], [[11], 1], 'isGoalie fehlt (nicht === false): keine Spielerzeile, Zähler und Warnung');
}

// ══ C. Eigentor / not_assigned ═══════════════════════════════════════════
console.log('== C. Eigentor und not_assigned sind keine Spielertore ==');
{
  const b = makeFx();
  const g = b.game(D(0));
  b.roster(g, 'home', 11, 'Anna'); b.roster(g, 'home', 12, 'Berta');
  b.goal(g, 'home', { scorer: null, own: true });
  b.goal(g, 'home', { scorer: null, na: true });
  b.goal(g, 'home', { scorer: 11, own: true, assist: 12 }); // adversarial: Schützen-ID trotz Eigentor-Kennzeichen
  b.goal(g, 'home', { scorer: 11, na: true, assist: 12 }); // adversarial: not_assigned mit Schützen-ID
  b.goal(g, 'home', { scorer: 11 });
  const r = Q.fitShooterQuality(b.fx, { asOf: { date: D(0) } });
  const p = byId(r);
  assertEqual([p[11].goals, p[12].goals, p[11].assists, p[12].assists], [1, 0, 0, 0], 'nur das normale Tor zählt; Eigentor/not_assigned zählen weder als Tor noch als Assist');
  assertEqual([r.quality.goals.events, r.quality.goals.own, r.quality.goals.notAssigned, r.quality.goals.attributed], [5, 2, 2, 1], 'Zähler: 5 Ereignisse, 2 Eigentore, 2 not_assigned, 1 zugeordnet');
  assertTrue(!r.warnings.some((w) => /own|assigned/.test(w.code)) && r.warnings.every((w) => !w.code.startsWith('goals-')), 'Eigentore und not_assigned sind keine Warnung/kein Fehler');
}

// ══ D. Strafschuss ═════════════════════════════════════════════════════════
console.log('== D. Strafschuss-Tore: normale Tore, genau einmal ==');
{
  const b = makeFx();
  const g = b.game(D(0));
  b.roster(g, 'home', 11, 'Anna'); b.roster(g, 'home', 12, 'Berta');
  b.goal(g, 'home', { scorer: 11, pen: true });
  b.goal(g, 'home', { scorer: 11 });
  b.goal(g, 'home', { scorer: 12, pen: true, assist: null });
  assertEqual(b.fx.penaltyShotEvents.length, 2, 'Vorbedingung: penaltyShotEvents enthält dieselben 2 Ereignisse zusätzlich');
  const r = Q.fitShooterQuality(b.fx, { asOf: { date: D(0) } });
  const p = byId(r);
  assertEqual([p[11].goals, p[12].goals, r.quality.goals.penaltyShot, r.quality.goals.attributed], [2, 1, 2, 3], 'Strafschuss-Tore zählen genau einmal als normale Tore (keine Addition der penaltyShotEvents)');
  const noPen = clone(b.fx); delete noPen.penaltyShotEvents;
  assertEqual(JSON.stringify(Q.fitShooterQuality(noPen, { asOf: { date: D(0) } })), JSON.stringify(r), 'Ergebnis unabhängig davon, ob penaltyShotEvents mitgegeben wird');
}

// ══ E. Assists ═════════════════════════════════════════════════════════════
console.log('== E. Assist-Arten: player = 1, none = 0, placeholder/unmatched = kein Spielerassist ==');
{
  const b = makeFx();
  const g = b.game(D(0));
  b.roster(g, 'home', 11, 'Anna'); b.roster(g, 'home', 12, 'Berta'); b.roster(g, 'home', 13, 'Clara');
  b.goal(g, 'home', { scorer: 11, assist: 12 });
  b.goal(g, 'home', { scorer: 11, assist: null }); // none
  b.goal(g, 'home', { scorer: 11, kind: 'placeholder', assist: 13 }); // adversarial: ID vorhanden, Art ≠ player
  b.goal(g, 'home', { scorer: 11, kind: 'unmatched', assist: 13 });
  b.goal(g, 'home', { scorer: 11, assist: 777 }); // Assistgeber ohne Kaderplatz in diesem Spiel
  const r = Q.fitShooterQuality(b.fx, { asOf: { date: D(0) } });
  const p = byId(r);
  assertEqual([p[11].assists, p[12].assists, p[13].assists, p[11].points, p[12].points], [0, 1, 0, 5, 1], 'nur assistKind player mit Feldspieler-Kaderplatz zählt (12: 1 Assist); Punkte = Tore + Assists');
  assertEqual([r.quality.assists.attributed, r.quality.assists.none, r.quality.assists.placeholder, r.quality.assists.unmatched, r.quality.assists.withoutPlayerRow], [1, 1, 1, 1, 1], 'Zähler: 1 zugeordnet, 1 none, 1 Platzhalter, 1 unmatched, 1 ohne Spielerzeile');
  for (const code of ['assists-placeholder', 'assists-unmatched', 'assists-without-player-row']) assertTrue(r.warnings.some((w) => w.code === code && w.count === 1), `Warnung ${code}`);
  assertTrue(!r.warnings.some((w) => w.code === 'assists-none'), 'none = 0 Assist ist keine Warnung');
  // Assist-Ereignis in einem anderen Spiel darf nicht zugeordnet werden
  const c = makeFx();
  const cg1 = c.game(D(0)); const cg2 = c.game(D(0));
  c.roster(cg1, 'home', 11, 'Anna'); c.roster(cg2, 'home', 12, 'Berta');
  c.goal(cg1, 'home', { scorer: 11, assist: 12 });
  const rc = Q.fitShooterQuality(c.fx, { asOf: { date: D(0) } });
  assertEqual([byId(rc)[12].assists, rc.quality.assists.withoutPlayerRow], [0, 1], 'Assist-Zuordnung nur innerhalb desselben Spiels');
}

// ══ F. asOf / Leakage / Spieltag ═════════════════════════════════════════
console.log('== F. asOf: kein Leakage, inclusive/exclusive, Spieltag-Helfer aus M1 ==');
{
  const { data, truth } = synthetic({ seed: 11, games: 24, dateOf: (i) => D(-i * 12) });
  const asOfDate = D(-120);
  const base = Q.fitShooterQuality(data, { asOf: { date: asOfDate } });
  const ref = refFit(truth, asOfDate);
  assertEqual(base.players.map((p) => p.playerId), ref.ids.map(Number), 'nur Spieler mit Spielen im Fenster');
  const dateOfGame = new Map(data.teamGames.map((t) => [t.gameId, t.date]));
  assertEqual([base.quality.goals.events, base.quality.roster.inWindow], [data.goalEvents.filter((ev) => dateOfGame.get(ev.gameId) <= asOfDate).length, data.rosterEntries.filter((r) => dateOfGame.get(r.gameId) <= asOfDate).length], 'Zähler zählen nur Ereignisse und Kaderzeilen im Fenster (unabhängige Zählung)');
  // Zukunft manipulieren: Tore verändern, Kaderzeilen und Spieler nach asOf hinzufügen, Datumsfremdes ändern
  const tampered = clone(data);
  for (const ev of tampered.goalEvents) { const d = tampered.teamGames.find((t) => t.gameId === ev.gameId).date; if (d > asOfDate) ev.derived.scorerPlayerId = 999; }
  for (const t of tampered.teamGames) if (t.date > asOfDate) t.teamKey = 'ZUKUNFT';
  for (const r of tampered.rosterEntries.slice()) { const d = tampered.teamGames.find((t) => t.gameId === r.gameId).date; if (d > asOfDate) tampered.rosterEntries.push({ ...r, playerId: 5000 + r.gameId, playerName: 'Zukunftsspieler' }); }
  const after = Q.fitShooterQuality(tampered, { asOf: { date: asOfDate } });
  const strip = (x) => JSON.stringify({ players: x.players, priors: x.priors, tiers: x.tiers, asOf: x.asOf, asOfGameDate: x.asOfGameDate });
  assertEqual(strip(after), strip(base), 'Manipulation aller Daten NACH asOf (Tore, Teams, zusätzliche Kaderzeilen/Spieler) ändert Spieler, Prior, Stufen nicht');
  assertTrue(after.quality.roster.afterAsOf > base.quality.roster.afterAsOf && base.players.every((p) => p.playerId !== 999), 'Zeilen nach asOf werden nur als afterAsOf gezählt, nie aufgenommen');
  assertTrue(base.asOfGameDate <= asOfDate && base.players.every((p) => !String(p.playerId).startsWith('5000')), 'asOfGameDate liegt im Fenster');
  // inclusive / exclusive
  const day = base.asOfGameDate;
  const incl = Q.fitShooterQuality(data, { asOf: { date: day, inclusive: true } });
  const excl = Q.fitShooterQuality(data, { asOf: { date: day, inclusive: false } });
  assertTrue(incl.quality.roster.playerGames > excl.quality.roster.playerGames && excl.asOfGameDate < day && incl.asOfGameDate === day, 'inclusive schließt das asOf-Datum ein, exclusive nicht');
  assertEqual(incl.asOf, { date: day, inclusive: true }, 'asOf-Ausgabe: Datum und inclusive');
  const dflt = Q.fitShooterQuality(data);
  const latest = data.teamGames.map((t) => t.date).sort().at(-1);
  assertEqual([dflt.asOf, dflt.quality.roster.afterAsOf], [{ date: latest, inclusive: true }, 0], 'asOf fehlt: letztes Datum, inclusive (wie M1)');
  // Spieltag-Helfer aus M1 (mit Etikett → Datum)
  const b = makeFx();
  const md = [[1, D(-14)], [2, D(-7)], [2, D(-6)], [3, D(0)]];
  for (const [n, date] of md) { const g = b.game(date, { matchdayNumber: n }); b.roster(g, 'home', 11, 'Anna'); b.roster(g, 'guest', 21, 'Cora'); b.goal(g, 'home', { scorer: 11 }); }
  const after2 = T1.asOfAfterMatchday(b.fx.teamGames, 'S1', 2);
  const before2 = T1.asOfBeforeMatchday(b.fx.teamGames, 'S1', 2);
  assertEqual([after2, before2], [{ date: D(-6), inclusive: true }, { date: D(-7), inclusive: false }], 'Vorbedingung: M1-Helfer liefern (Ende MD2, inclusive) und (Beginn MD2, exclusive)');
  const ra = Q.fitShooterQuality(b.fx, { asOf: after2 }); const rb = Q.fitShooterQuality(b.fx, { asOf: before2 });
  assertEqual([byId(ra)[11].games, ra.asOfGameDate, byId(rb)[11].games, rb.asOfGameDate], [3, D(-6), 1, D(-14)], 'matchday-after: MD1 + MD2 (3 Spiele); matchday-before: nur MD1 (Spiele vor dem ersten MD2-Datum)');
  assertNear(byId(rb)[11].weightedExposure, refWeight(D(-14), D(-7)), 1e-15, 'matchday-before: Gewicht relativ zum exclusive-asOf-Datum (T_ref = asOf.date)');
  // asOf vor allen Spielen und ungültige asOf-Angaben
  throwsCode(() => Q.fitShooterQuality(b.fx, { asOf: { date: '2025-13-40' } }), 'invalid-input', 'ungültiges asOf-Datum → Fehler');
  throwsCode(() => Q.fitShooterQuality(b.fx, { asOf: { date: D(0), inclusive: 'ja' } }), 'invalid-input', 'inclusive nicht boolesch → Fehler');
}

// ══ G. Gewichtung ═════════════════════════════════════════════════════════
console.log('== G. Zeitgewicht wie M1 (Pseudo-Spiele), keine Rundung vor der Aggregation ==');
{
  assertEqual(Q.DEFAULTS.halfLifeDays, T1.DEFAULTS.halfLifeDays, 'H = M1-Default (365)');
  assertEqual(Q.PLACEHOLDER_OPTIONS, ['halfLifeDays'], 'H ist als unabgestimmter Platzhalter gekennzeichnet');
  const b = makeFx();
  const dates = [D(0), D(-365), D(-731)];
  const goalsPer = [1, 2, 4];
  dates.forEach((date, i) => { const g = b.game(date); b.roster(g, 'home', 11, 'Anna'); b.roster(g, 'home', 12, 'Berta'); for (let k = 0; k < goalsPer[i]; k++) b.goal(g, 'home', { scorer: 11, assist: k % 2 === 0 ? 12 : null }); });
  const r = Q.fitShooterQuality(b.fx, { asOf: { date: D(0) } });
  const w = dates.map((d) => refWeight(d, D(0)));
  const p = byId(r);
  assertNear(w[1], 0.5, 1e-15, 'Vorbedingung: 365 Tage Abstand = Halbwertszeit → Gewicht 0.5');
  assertNear(p[11].weightedExposure, S.sum(w), 1e-15, 'weightedExposure = Σ 2^(−Alter/365) (vergangene Spiele bekommen weniger Gewicht); dient NUR der Prior-/Posterior-Schätzung');
  assertEqual([p[11].games, p[11].goals], [3, 7], 'games und goals bleiben ungewichtet (3 Kaderspiele, 7 Tore)');
  assertNear(p[11].goalsPerGameRaw, 7 / 3, 1e-15, 'goalsPerGameRaw = goals / games (UNGEWICHTET), nicht Σw·Tore / Σw');
  assertNear(p[12].assistsPerGameRaw, p[12].assists / p[12].games, 1e-15, 'assistsPerGameRaw = assists / games (ungewichtet)');
  assertNear(p[11].pointsPerGameRaw, (p[11].goals + p[11].assists) / p[11].games, 1e-15, 'pointsPerGameRaw = points / games (ungewichtet)');
  assertEqual(p[11].pointsPerGameRaw, p[11].goalsPerGameRaw + p[11].assistsPerGameRaw, 'pointsPerGameRaw = goalsPerGameRaw + assistsPerGameRaw (gleicher Nenner games)');
  // Expliziter Nachweis: gewichtete und ungewichtete Rohquote unterscheiden sich hier, und PerGameRaw ist die ungewichtete
  const weightedRate = (w[0] * 1 + w[1] * 2 + w[2] * 4) / S.sum(w); // was PerGameRaw vor der Korrektur war (Σw·y/Σw)
  assertTrue(Math.abs(weightedRate - p[11].goalsPerGameRaw) > 0.1, `gewichtete Quote (${weightedRate.toFixed(4)}) und goalsPerGameRaw (${p[11].goalsPerGameRaw.toFixed(4)}) unterscheiden sich deutlich (ungleiche Zeitgewichte)`);
  assertTrue(p[11].goalsPerGameRaw !== S.roundOutput(p[11].goalsPerGameRaw) && p[11].weightedExposure !== S.roundOutput(p[11].weightedExposure), 'Ausgabe des Moduls ist ungerundet (Rundung erst in roundOutput)');
  assertTrue(w[0] > w[1] && w[1] > w[2], 'jüngere Spiele wiegen stärker (Vorzeichen des Exponenten)');
  const r2 = Q.fitShooterQuality(b.fx, { asOf: { date: D(0) }, halfLifeDays: 730 });
  assertNear(byId(r2)[11].weightedExposure, S.sum(dates.map((d) => refWeight(d, D(0), 730))), 1e-15, 'halfLifeDays ist konfigurierbar (730)');
  assertEqual(r2.options, { halfLifeDays: 730, placeholders: ['halfLifeDays'] }, 'Optionen im Ergebnis');
  for (const bad of [0, -5, NaN, Infinity]) throwsCode(() => Q.fitShooterQuality(b.fx, { halfLifeDays: bad }), 'invalid-input', `halfLifeDays = ${bad} → Fehler`);
  const later = Q.fitShooterQuality(b.fx, { asOf: { date: D(365) } });
  assertNear(byId(later)[11].weightedExposure, S.sum(w) / 2, 1e-15, 'späteres asOf: alle Gewichte halbiert (T_ref = asOf.date)');
}

// ══ H. Prior ════════════════════════════════════════════════════════════
console.log('== H. drei getrennte Priors, Pseudo-Spiele-Modell, nur asOf-Fenster ==');
{
  // Handrechnung: P1 und P2 in denselben 2 Spielen (Gewicht 1), P1: 3 + 3 Tore, P2: 1 + 1 Tor → (6, 2), (2, 2): m = 2, τ² = 1, α = 4, β = 2
  const b = makeFx();
  const g1 = b.game(D(0)); const g2 = b.game(D(0));
  for (const g of [g1, g2]) { b.roster(g, 'home', 11, 'Anna'); b.roster(g, 'home', 12, 'Berta'); }
  for (const g of [g1, g2]) { for (let k = 0; k < 3; k++) b.goal(g, 'home', { scorer: 11 }); b.goal(g, 'home', { scorer: 12 }); }
  const r = Q.fitShooterQuality(b.fx, { asOf: { date: D(0) } });
  const gp = r.priors.goals;
  assertEqual([gp.estimable, gp.alpha, gp.beta, gp.mean, gp.tau2, gp.n, gp.totalCount, gp.totalExposure], [true, 4, 2, 2, 1, 2, 8, 4], 'Handrechnung Tore-Prior: α = 4, β = 2, Ø = 2, τ² = 1 (Spieler 2, Σcount 8, Σexposure 4)');
  assertEqual([r.priors.points.alpha, r.priors.points.beta], [4, 2], 'Punkte-Prior ohne Assists = Tore-Prior (eigener Prior, gleiche Zähler)');
  assertEqual([r.priors.assists.estimable, r.priors.assists.reason, r.priors.assists.alpha, r.priors.assists.n, r.status], [false, 'prior-not-estimable', null, 2, 'partial'], 'Assists ohne Assist-Ereignisse: Prior nicht schätzbar (Gesamtzähler 0), Status partial');
  const p = byId(r);
  assertEqual([p[11].goalsPerGameShrunk, p[12].goalsPerGameShrunk, p[11].goalsPerGameRaw, p[12].goalsPerGameRaw], [2.5, 1.5, 3, 1], 'Posterior-Mittel (α + count)/(β + exposure) = 10/4 und 6/4; Rohquoten = goals/games = 6/2 und 2/2 (hier gleich der gewichteten Quote, da beide Spiele auf dem asOf-Datum liegen)');
  assertEqual([p[11].assistsPerGameShrunk, p[11].assistsCi90, p[11].assistsTier, p[11].assistsPerGameRaw], [null, null, null, 0], 'nicht schätzbarer Assist-Prior: geschrumpfte Quote, ci90 und Stufe = null (kein Clamping, keine Vollschrumpfung); Rohquote 0 bleibt');
  // O2: keine Mindestgröße — mit nur 2 schätzbaren Spielern werden trotzdem Stufen berechnet (Typ-7-Quantil mit n = 2)
  assertEqual([r.tiers.goals.status, r.tiers.goals.n, r.tiers.goals.q20, r.tiers.goals.q80, p[11].tier, p[12].tier], ['ok', 2, 1.7, 2.3, 'top', 'weak'], 'nur 2 schätzbare Spieler: Stufen werden trotzdem berechnet (keine Mindestgröße), q20/q80 nach Typ 7 mit n = 2');
  assertEqual(r.tiers.assists.status, 'prior-not-estimable', 'Assists: keine Stufen, weil der Prior nicht schätzbar ist (nicht wegen der Populationsgröße)');
  assertTrue(r.warnings.some((w) => w.code === 'prior-not-estimable' && w.target === 'assists') && !r.warnings.some((w) => w.code === 'tiers-not-computed'), 'Warnung nur prior-not-estimable (assists); keine tiers-not-computed-Warnung mehr (Mindestgröße entfernt)');
  assertTrue(finiteEverywhere(r), 'keine NaN/Infinity in einem Ergebnis mit nicht schätzbaren Feldern');

  // Unabhängige Nachrechnung auf synthetischen Daten mit ungleichen Zeitgewichten
  const { data, truth } = synthetic({ seed: 5, games: 40 });
  { // ein Spieler mit nur einem sehr alten Spiel: kleine gewichtete Exposure (2^(−1500/365) ≈ 0.06), bleibt in der Grundgesamtheit
    const og = makeFx(); const old = og.game(D(-1500), { seasonKey: 'S0', matchdayNumber: 1 });
    data.teamGames.push(...og.fx.teamGames); data.rosterEntries.push({ seasonKey: 'S0', gameId: old.gameId, side: 'home', teamKey: 'A', playerId: 8888, playerName: 'Altspieler', isGoalie: false });
    truth[8888] = [{ date: D(-1500), goals: 0, assists: 0 }];
  }
  const asOfDate = D(-30);
  const res = Q.fitShooterQuality(data, { asOf: { date: asOfDate } });
  const ref = refFit(truth, asOfDate);
  for (const t of Q.TARGETS) {
    const a = res.priors[t]; const e = ref.priors[t];
    assertTrue(a.estimable && Math.abs(a.alpha - e.alpha) < 1e-10 && Math.abs(a.beta - e.beta) < 1e-10 && Math.abs(a.tau2 - e.tau2) < 1e-10 && a.n === ref.ids.length, `Prior ${t}: entspricht der unabhängigen Nachrechnung (α ${a.alpha.toFixed(4)}, β ${a.beta.toFixed(4)}, ${a.n} Spieler)`);
  }
  assertTrue(res.priors.goals.alpha !== res.priors.assists.alpha && res.priors.goals.alpha !== res.priors.points.alpha && res.priors.assists.beta !== res.priors.points.beta, 'drei getrennte Priors mit verschiedenen Parametern');
  // Posterior und Rohquote je Spieler
  let worst = 0; let ciOk = true;
  for (const pl of res.players) {
    const a = ref.agg[pl.playerId];
    for (const [t, keyW, pre, unweighted] of [['goals', 'goalsW', 'goals', a.goals], ['assists', 'assistsW', 'assists', a.assists], ['points', 'pointsW', 'points', a.goals + a.assists]]) {
      const po = S.gammaPoissonPosterior({ alpha: ref.priors[t].alpha, beta: ref.priors[t].beta, count: a[keyW], exposure: a.exposure });
      worst = Math.max(worst, Math.abs(pl[`${pre}PerGameShrunk`] - po.mean), Math.abs(pl[`${pre}PerGameRaw`] - unweighted / a.games));
      if (Math.abs(pl[`${pre}Ci90`][0] - po.ci90[0]) > 1e-9 || Math.abs(pl[`${pre}Ci90`][1] - po.ci90[1]) > 1e-9) ciOk = false;
    }
    if (pl.games !== a.games || pl.goals !== a.goals || pl.assists !== a.assists || pl.points !== a.goals + a.assists) ciOk = false;
  }
  assertTrue(worst < 1e-10 && ciOk, `Spielerwerte (${res.players.length} Spieler): games/goals/assists/points, Rohquote, geschrumpfte Quote und ci90 stimmen mit der Nachrechnung überein (größte Abweichung ${worst.toExponential(1)})`);
  // Prior nur aus dem Fenster: ein früheres asOf ergibt einen anderen Prior, der genau den Fensterdaten entspricht
  const early = Q.fitShooterQuality(data, { asOf: { date: D(-250) } });
  const refEarly = refFit(truth, D(-250));
  assertTrue(Math.abs(early.priors.goals.alpha - refEarly.priors.goals.alpha) < 1e-10 && early.priors.goals.n === refEarly.ids.length && early.priors.goals.n === 1 + 40 && Math.abs(early.priors.goals.alpha - res.priors.goals.alpha) > 1e-6, 'Prior am früheren asOf nutzt nur dessen Fenster (weniger Spieler, andere Parameter)');
  // Grundgesamtheit: auch Spieler mit sehr kleiner gewichteter Exposure zählen (keine Mindest-Exposure)
  const tiny = Math.min(...res.players.map((p) => p.weightedExposure));
  assertTrue(tiny < 0.2 && res.priors.goals.n === res.players.length, `Grundgesamtheit = alle Spieler im Fenster, auch mit sehr kleiner Exposure (kleinste ${tiny.toFixed(3)})`);
}

// ══ I. Shrinkage ═════════════════════════════════════════════════════════
console.log('== I. Shrinkage: n = 1 gegenüber n = 50 ==');
{
  const { data } = synthetic({ seed: 21, games: 40, dateOf: () => D(0) }); // alle Spiele am asOf-Datum: Gewicht 1
  const b = { fx: clone(data) };
  const X = 7001; const Y = 7002; const Z = 7003;
  const g0 = b.fx.teamGames.find((t) => t.side === 'home');
  const addRow = (gameId, id, name) => b.fx.rosterEntries.push({ seasonKey: 'S1', gameId, side: 'home', teamKey: 'A', playerId: id, playerName: name, isGoalie: false, position: 'Feld' });
  const addGoals = (gameId, id, n) => { for (let k = 0; k < n; k++) b.fx.goalEvents.push({ seasonKey: 'S1', gameId, eventKey: `x-${gameId}-${id}-${k}`, teamSide: 'home', teamKey: 'A', isOwnGoal: false, isNotAssigned: false, isPenaltyShot: false, derived: { scorerPlayerId: id, scorerMatch: 'roster', assistKind: 'none', assistPlayerId: null } }); };
  const gameIds = [...new Set(b.fx.teamGames.map((t) => t.gameId))];
  addRow(g0.gameId, X, 'Einzelspiel'); addGoals(g0.gameId, X, 2); // 1 Spiel, 2 Tore (Rohquote 2)
  gameIds.slice(0, 40).forEach((id) => { addRow(id, Y, 'Vielspieler'); addGoals(id, Y, 0); }); // 40 Spiele
  gameIds.slice(0, 40).forEach((id, i) => { if (i % 4 === 0) addGoals(id, Y, 3); }); // 30 Tore in 40 Spielen (Rohquote 0.75)
  gameIds.slice(0, 40).forEach((id) => addRow(id, Z, 'Mittelspieler')); gameIds.slice(0, 40).forEach((id, i) => addGoals(id, Z, i % 2 === 0 ? 3 : 0)); // 60 Tore in 40 Spielen (Rohquote 1.5)
  const r = Q.fitShooterQuality(b.fx, { asOf: { date: D(0) } });
  const p = byId(r);
  const pr = r.priors.goals;
  assertEqual([p[X].games, p[X].goals, p[Y].games, p[Y].goals, p[Z].games, p[Z].goals], [1, 2, 40, 30, 40, 60], 'Fixture: X 1 Spiel/2 Tore, Y 40/30, Z 40/60');
  assertNear(p[X].goalsPerGameShrunk, (pr.alpha + 2) / (pr.beta + 1), 1e-12, 'Posterior X = (α + 2)/(β + 1)');
  assertNear(p[Z].goalsPerGameShrunk, (pr.alpha + 60) / (pr.beta + 40), 1e-12, 'Posterior Z = (α + 60)/(β + 40)');
  const fracX = (p[X].goalsPerGameShrunk - pr.mean) / (p[X].goalsPerGameRaw - pr.mean);
  const fracZ = (p[Z].goalsPerGameShrunk - pr.mean) / (p[Z].goalsPerGameRaw - pr.mean);
  assertTrue(fracX < fracZ && fracX < 0.35 && fracZ > 0.9, `n = 1 schrumpft stärker zum Prior (Anteil ${fracX.toFixed(2)}) als n = 40 (Anteil ${fracZ.toFixed(2)}) bei Rohquote > Prior-Mittel`);
  const ranked = [...r.players].sort((a, c) => c.goalsPerGameShrunk - a.goalsPerGameShrunk);
  assertTrue(ranked[0].playerId !== X && ranked.findIndex((x) => x.playerId === X) > ranked.findIndex((x) => x.playerId === Z), 'Akzeptanz: ein Spieler mit 1 Spiel und 2 Toren steht nicht auf Platz 1 und hinter dem Spieler mit 40 Spielen und Rohquote 1.5');
  assertTrue(p[X].goalsCi90[1] - p[X].goalsCi90[0] > 2 * (p[Z].goalsCi90[1] - p[Z].goalsCi90[0]), 'ci90 bei n = 1 deutlich breiter als bei n = 40');
  const po = S.gammaPoissonPosterior({ alpha: pr.alpha, beta: pr.beta, count: 2, exposure: 1 });
  assertEqual(p[X].goalsCi90, po.ci90, 'ci90 wird unverändert aus dem Posterior (q05/q95) weitergereicht');
  assertTrue(p[X].goalsCi90[0] < p[X].goalsPerGameShrunk && p[X].goalsPerGameShrunk < p[X].goalsCi90[1], 'geschrumpftes Mittel liegt im ci90');
}

// ══ J. Stufen ═════════════════════════════════════════════════════════════
console.log('== J. Stufen: Type-7-Quintile, > q80 top, < q20 weak, Gleichstand middle ==');
{
  const v = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const t = Q.assignTiers(v);
  assertNear(t.q20, 2.8, 1e-15, 'q20 (Typ 7, Handrechnung h = 9·0.2 = 1.8) = 2.8');
  assertNear(t.q80, 8.2, 1e-15, 'q80 (Typ 7, h = 7.2) = 8.2');
  assertEqual(t.tiers, ['weak', 'weak', 'middle', 'middle', 'middle', 'middle', 'middle', 'middle', 'top', 'top'], 'Werte 1,2 weak; 3–8 middle; 9,10 top');
  assertEqual([t.q20, t.q80], [S.quantile(v, 0.2), S.quantile(v, 0.8)], 'q20/q80 = stats.quantile (bestehende Typ-7-Definition)');
  const ties = Q.assignTiers([1, 1, 1, 1, 2, 3, 4, 4, 4, 4]);
  assertEqual([ties.q20, ties.q80, ties.tiers], [1, 4, ['middle', 'middle', 'middle', 'middle', 'middle', 'middle', 'middle', 'middle', 'middle', 'middle']], 'Werte exakt auf q20/q80 landen in middle (nicht weak/top); kein Tie-Break');
  const mixed = Q.assignTiers([1, 2, 2, 2, 2, 2, 2, 2, 2, 3]);
  assertEqual([mixed.q20, mixed.q80, mixed.tiers[0], mixed.tiers[1], mixed.tiers[9]], [2, 2, 'weak', 'middle', 'top'], 'Gleichstand an beiden Grenzen: der Wert auf der Grenze ist middle, darunter weak, darüber top');
  const eps = 1e-12;
  const fine = Q.assignTiers([0, 0, 0, 1, 1, 1, 1, 1, 1 + eps, 1 + eps]);
  assertTrue(fine.tiers[4] === 'middle' && fine.tiers[8] === 'top' && S.roundOutput(1) === S.roundOutput(1 + eps), 'Vergleich auf ungerundeten Werten: 1 und 1 + 1e-12 sind gerundet gleich, erhalten aber verschiedene Stufen');
  assertEqual(Q.assignTiers([5]).tiers, ['middle'], 'ein einzelner Wert: q20 = q80 = Wert → middle');
  assertEqual(Q.assignTiers([3, 1, 2, 5, 4]).tiers, ['middle', 'weak', 'middle', 'top', 'middle'], 'Ergebnis in Eingabereihenfolge');
  throwsCode(() => Q.assignTiers([]), 'invalid-input', 'leere Liste → Fehler');
  throwsCode(() => Q.assignTiers([1, NaN]), 'non-finite', 'NaN → Fehler');
  // Ende-zu-Ende: Stufen aus dem Fit stimmen mit einer Neuberechnung aus den (ungerundeten) geschrumpften Quoten überein
  const { data } = synthetic({ seed: 8, games: 50 });
  const r = Q.fitShooterQuality(data, { asOf: { date: D(-20) } });
  let ok = true;
  for (const [t2, field, tierField] of [['goals', 'goalsPerGameShrunk', 'tier'], ['assists', 'assistsPerGameShrunk', 'assistsTier'], ['points', 'pointsPerGameShrunk', 'pointsTier']]) {
    const vals = r.players.map((p) => p[field]);
    const q20 = S.quantile(vals, 0.2); const q80 = S.quantile(vals, 0.8);
    if (r.tiers[t2].q20 !== q20 || r.tiers[t2].q80 !== q80 || r.tiers[t2].status !== 'ok' || r.tiers[t2].n !== vals.length) ok = false;
    r.players.forEach((p) => { const e = p[field] > q80 ? 'top' : p[field] < q20 ? 'weak' : 'middle'; if (p[tierField] !== e) ok = false; });
  }
  assertTrue(ok, 'Ende-zu-Ende: q20/q80 und Stufe je Zielvariable (Tore, Assists, Punkte) entsprechen der Neuberechnung aus den ungerundeten Quoten');
  const cnt = (f) => r.players.filter((p) => p.tier === f).length;
  assertTrue(cnt('top') > 0 && cnt('weak') > 0 && cnt('top') + cnt('weak') + cnt('middle') === r.players.length, `alle Spieler haben eine Tore-Stufe (top ${cnt('top')}, middle ${cnt('middle')}, weak ${cnt('weak')})`);
  // O2: keine Mindestgröße für die Stufen-Grundgesamtheit (weder Mindestspiele noch Mindest-Exposure, weder Konstante noch Warnung)
  assertEqual(Q.MIN_TIER_POPULATION, undefined, 'keine Mindestpopulation mehr exportiert oder erzwungen');
  const small = (() => {
    const c = makeFx(); const g = c.game(D(0));
    c.roster(g, 'home', 61, 'S1'); c.roster(g, 'home', 62, 'S2'); c.roster(g, 'home', 63, 'S3');
    c.goal(g, 'home', { scorer: 61 }); c.goal(g, 'home', { scorer: 61 }); c.goal(g, 'home', { scorer: 61 }); c.goal(g, 'home', { scorer: 62 });
    return Q.fitShooterQuality(c.fx, { asOf: { date: D(0) } });
  })();
  assertEqual([small.tiers.goals.status, small.tiers.goals.n, small.players.length, small.players.filter((p) => p.tier !== null).length], ['ok', 3, 3, 3], 'nur 3 schätzbare Spieler: Stufen werden trotzdem berechnet (früher ab < 5 verweigert; O2 kennt keine Mindestgröße), kein Spieler entfernt');
  assertEqual([small.tiers.goals.q20, small.tiers.goals.q80], [S.quantile(small.players.map((p) => p.goalsPerGameShrunk), 0.2), S.quantile(small.players.map((p) => p.goalsPerGameShrunk), 0.8)], 'q20/q80 bei n = 3 weiterhin exakt Typ-7-Quantile über die vorhandenen schätzbaren Werte');
  assertTrue(!small.warnings.some((w) => w.code === 'tiers-not-computed'), 'keine „zu kleine Population“-Warnung mehr (Code entfernt)');
}

// ══ K. Identität ═════════════════════════════════════════════════════════
console.log('== K. Identität: nur playerId ==');
{
  const b = makeFx();
  const g1 = b.game(D(-10)); const g2 = b.game(D(-5)); const g3 = b.game(D(0));
  b.roster(g1, 'home', 7, 'Denys Striukov'); b.roster(g2, 'home', 7, 'Denis Striukov'); b.roster(g3, 'home', 7, 'Denys Striukov');
  b.roster(g1, 'home', 31, 'Max Muster'); b.roster(g1, 'guest', 32, 'Max Muster'); // gleicher Name, zwei playerIds
  b.roster(g1, 'home', null, 'Ohne ID'); b.roster(g2, 'home', undefined, 'Auch ohne ID');
  b.goal(g1, 'home', { scorer: 7 }); b.goal(g2, 'home', { scorer: 7 }); b.goal(g3, 'home', { scorer: 7 });
  b.goal(g1, 'home', { scorer: null, match: 'roster' }); // Schütze ohne playerId: kein Spieler, Warnung
  const r = Q.fitShooterQuality(b.fx, { asOf: { date: D(0) } });
  const p = byId(r);
  assertEqual([p[7].games, p[7].goals, r.players.length], [3, 3, 3], 'gleiche playerId mit verschiedenen Namen = ein Spieler (3 Spiele, 3 Tore); Spieler 7, 31, 32');
  assertEqual([p[31].name, p[32].name, p[31].playerId !== p[32].playerId], ['Max Muster', 'Max Muster', true], 'verschiedene playerIds mit gleichem Namen = zwei Spieler (keine Zusammenführung)');
  assertEqual([r.quality.roster.noPlayerId, r.players.some((x) => x.name === 'Ohne ID' || x.name === 'Auch ohne ID')], [2, false], 'Kaderzeilen ohne playerId (null/fehlend) erhalten keine Spielerzeile');
  assertTrue(r.warnings.some((w) => w.code === 'roster-missing-player-id' && w.count === 2) && r.warnings.some((w) => w.code === 'goals-without-player-row' && w.count === 1), 'Warnungen: 2 Kaderzeilen ohne playerId, 1 Tor ohne Spielerzeile');
  assertEqual(p[7].name, 'Denys Striukov', 'Namensregel: Schreibweise des jüngsten Spiels im Fenster (hier g3)');
  const r2 = Q.fitShooterQuality(b.fx, { asOf: { date: D(-5) } });
  assertEqual(byId(r2)[7].name, 'Denis Striukov', 'Namensregel bezieht sich auf das Fenster: bis D(−5) ist „Denis“ die jüngste Schreibweise');
  // gleiches Datum, zwei Schreibweisen: lexikographisch kleinste
  const c = makeFx();
  const cg = c.game(D(0)); const cg2 = c.game(D(0));
  c.roster(cg, 'home', 9, 'Zed'); c.roster(cg2, 'home', 9, 'Abel');
  assertEqual(byId(Q.fitShooterQuality(c.fx, { asOf: { date: D(0) } }))[9].name, 'Abel', 'gleiches Datum: lexikographisch kleinste Schreibweise (deterministisch)');
  // leere Namen werden nicht gewählt
  const d = makeFx();
  const dg = d.game(D(0)); d.roster(dg, 'home', 9, ''); const dg2 = d.game(D(-1)); d.roster(dg2, 'home', 9, 'Alt');
  assertEqual(byId(Q.fitShooterQuality(d.fx, { asOf: { date: D(0) } }))[9].name, 'Alt', 'leere Schreibweise wird übersprungen');
}

// ══ L. Teamwechsel ═══════════════════════════════════════════════════════
console.log('== L. teams[]: alle Teams im Fenster, deterministisch sortiert ==');
{
  const b = makeFx();
  const g1 = b.game(D(-400), { home: 'alt-team', guest: 'X' }); const g2 = b.game(D(-200), { home: 'mitte-team', guest: 'X' }); const g3 = b.game(D(0), { home: 'neu-team', guest: 'X' }); const g4 = b.game(D(-200), { home: 'aaa-team', guest: 'X' });
  b.roster(g1, 'home', 5, 'Wanderer'); b.roster(g2, 'home', 5, 'Wanderer'); b.roster(g3, 'home', 5, 'Wanderer'); b.roster(g4, 'home', 5, 'Wanderer'); b.roster(g4, 'home', 6, 'Bleiber');
  const r = Q.fitShooterQuality(b.fx, { asOf: { date: D(0) } });
  assertEqual(byId(r)[5].teams, ['neu-team', 'aaa-team', 'mitte-team', 'alt-team'], 'teams[]: nach letztem Spieldatum im Fenster absteigend, bei gleichem Datum nach teamKey aufsteigend');
  assertEqual(byId(r)[6].teams, ['aaa-team'], 'Spieler mit einem Team: Liste mit einem Eintrag');
  const early = Q.fitShooterQuality(b.fx, { asOf: { date: D(-250) } });
  assertEqual(byId(early)[5].teams, ['alt-team'], 'teams[] enthält nur Teams aus Spielen im asOf-Fenster');
  const rng = S.createRng(3);
  let same = true;
  for (let i = 0; i < 20; i++) { const sh = { teamGames: shuffle(b.fx.teamGames, rng), goalEvents: b.fx.goalEvents, rosterEntries: shuffle(b.fx.rosterEntries, rng) }; if (JSON.stringify(Q.fitShooterQuality(sh, { asOf: { date: D(0) } })) !== JSON.stringify(r)) same = false; }
  assertTrue(same, 'teams[] und Ergebnis unabhängig von der Eingabereihenfolge (20 Permutationen)');
  assertTrue(!('team' in byId(r)[5]), 'kein künstliches Einzelfeld team (verlustfrei: teams[])');
}

// ══ M. Leerzustände ══════════════════════════════════════════════════════
console.log('== M. Leere und nicht schätzbare Zustände sind gültige Ergebnisse ==');
{
  const { data } = synthetic({ seed: 2, games: 20 });
  const first = data.teamGames.map((t) => t.date).sort()[0];
  const e = Q.fitShooterQuality(data, { asOf: { date: '2000-01-01' } });
  assertEqual([e.status, e.players, e.asOfGameDate, e.warnings[0], e.priors.goals.estimable, e.priors.goals.reason, e.tiers.goals.status], ['empty', [], null, { code: 'empty-asof', reason: 'no-rows-in-cutoff' }, false, 'no-data', 'no-data'], 'asOf vor dem ersten Spieltag: gültiges leeres Ergebnis, Warnung empty-asof (no-rows-in-cutoff)');
  assertTrue(finiteEverywhere(e), 'leeres Ergebnis: keine NaN/Infinity');
  assertEqual(Q.fitShooterQuality(data, { asOf: { date: first, inclusive: false } }).status, 'empty', 'exclusive am ersten Spieldatum: leer');
  const none = Q.fitShooterQuality({ teamGames: [], goalEvents: [], rosterEntries: [] });
  assertEqual([none.status, none.asOf.date, none.players.length, none.warnings.map((w) => w.code)], ['empty', null, 0, ['empty-asof']], 'ganz ohne Daten: asOf.date = null, gültig leer');
  const goaliesOnly = makeFx(); const gg = goaliesOnly.game(D(0)); goaliesOnly.roster(gg, 'home', 900, 'Torwart', true);
  assertEqual([Q.fitShooterQuality(goaliesOnly.fx, { asOf: { date: D(0) } }).status, Q.fitShooterQuality(goaliesOnly.fx, { asOf: { date: D(0) } }).warnings[0].reason], ['empty', 'no-eligible-rows'], 'nur Goalies im Fenster: leer mit Grund no-eligible-rows');
  // nicht schätzbarer Prior in allen Zielvariablen: 2 Spieler mit identischen Raten
  const b = makeFx(); const g = b.game(D(0));
  b.roster(g, 'home', 11, 'Anna'); b.roster(g, 'home', 12, 'Berta'); b.goal(g, 'home', { scorer: 11, assist: 12 }); b.goal(g, 'home', { scorer: 12, assist: 11 });
  const n = Q.fitShooterQuality(b.fx, { asOf: { date: D(0) } });
  assertEqual([n.status, n.priors.goals.reason, n.priors.assists.reason, n.priors.points.reason, n.players.every((p) => p.goalsPerGameShrunk === null && p.goalsCi90 === null && p.tier === null && p.goalsPerGameRaw === 1)], ['not-estimable', 'prior-not-estimable', 'prior-not-estimable', 'prior-not-estimable', true], 'identische Raten (keine Überdispersion): status not-estimable, geschätzte Felder null, Rohquote bleibt');
  assertTrue(finiteEverywhere(n) && n.warnings.filter((w) => w.code === 'prior-not-estimable').length === 3, 'nicht schätzbar: keine NaN/Infinity, drei Warnungen');
  // partial: Tore schätzbar, Assists nicht
  const p = Q.fitShooterQuality((() => { const c = makeFx(); const cg = c.game(D(0)); for (let i = 0; i < 6; i++) c.roster(cg, 'home', 20 + i, `S${i}`); [0, 1, 3, 6, 9, 12].forEach((k, i) => { for (let j = 0; j < k; j++) c.goal(cg, 'home', { scorer: 20 + i }); }); return c.fx; })(), { asOf: { date: D(0) } });
  assertEqual([p.status, p.priors.goals.estimable, p.tiers.goals.status, p.tiers.goals.n, p.players.filter((x) => x.tier !== null).length], ['partial', true, 'ok', 6, 6], 'partial: Tore-Prior schätzbar (6 Spieler → Stufen), Assist-Prior nicht');
  // weniger als 5 schätzbare Spieler: keine Stufen
  // O2: keine Mindestgröße — auch 4 schätzbare Spieler bekommen Stufen (früher: < 5 ⇒ keine Stufen)
  const q4 = (() => { const c = makeFx(); const cg = c.game(D(0)); for (let i = 0; i < 4; i++) c.roster(cg, 'home', 20 + i, `S${i}`); [0, 1, 6, 9].forEach((k, i) => { for (let j = 0; j < k; j++) c.goal(cg, 'home', { scorer: 20 + i }); }); return Q.fitShooterQuality(c.fx, { asOf: { date: D(0) } }); })();
  const q4vals = q4.players.map((x) => x.goalsPerGameShrunk);
  assertEqual([q4.priors.goals.estimable, q4.tiers.goals.status, q4.tiers.goals.n, q4.tiers.goals.q20, q4.tiers.goals.q80, q4.players.every((x) => x.goalsPerGameShrunk !== null)], [true, 'ok', 4, S.quantile(q4vals, 0.2), S.quantile(q4vals, 0.8), true], '4 schätzbare Spieler: Prior, geschrumpfte Quoten UND Stufen vorhanden (keine Mindestgröße mehr)');
  assertTrue(q4.players.some((x) => x.tier === 'top') && q4.players.some((x) => x.tier === 'weak'), '4-Spieler-Fixture erzeugt tatsächlich top- und weak-Stufen');
  // Fehlende/ungültige Datumswerte
  const dt = makeFx(); const dg = dt.game(D(0)); const bad = dt.game('2025-02-30'); const dg3 = dt.game(D(0));
  dt.roster(dg, 'home', 11, 'Anna'); dt.roster(bad, 'home', 11, 'Anna'); dt.fx.rosterEntries.push({ seasonKey: 'S1', gameId: 999, side: 'home', teamKey: 'A', playerId: 11, playerName: 'Anna', isGoalie: false });
  dt.roster(dg3, 'home', 12, 'Berta');
  const rdt = Q.fitShooterQuality(dt.fx, { asOf: { date: D(0) } });
  assertEqual([byId(rdt)[11].games, rdt.quality.roster.invalidDate, rdt.quality.roster.missingDate], [1, 1, 1], 'Kaderzeilen mit ungültigem oder fehlendem Spieldatum werden ausgeschlossen und gezählt');
  assertTrue(rdt.warnings.some((w) => w.code === 'roster-invalid-date') && rdt.warnings.some((w) => w.code === 'roster-missing-date'), 'Warnungen roster-invalid-date und roster-missing-date');
  // widersprüchliche Spieldaten (Heim/Gast)
  const cf = makeFx(); const cg2 = cf.game(D(0)); cf.fx.teamGames[1].date = D(-1); cf.roster(cg2, 'home', 11, 'Anna');
  assertEqual(Q.fitShooterQuality(cf.fx, { asOf: { date: D(0) } }).quality.roster.invalidDate, 1, 'widersprüchliches Datum beider Team-Zeilen eines Spiels = ungültig');
  // Eingabevalidierung
  for (const badData of [null, undefined, {}, { teamGames: [], goalEvents: [] }, { teamGames: 'x', goalEvents: [], rosterEntries: [] }]) throwsCode(() => Q.fitShooterQuality(badData), 'invalid-input', `ungültige Eingabe ${JSON.stringify(badData)} → Fehler`);
}

// ══ N. Determinismus ═════════════════════════════════════════════════════
console.log('== N. Determinismus und Eingabereihenfolge ==');
{
  const { data } = synthetic({ seed: 33, games: 30 });
  const asOf = { date: D(-15) };
  const ref = JSON.stringify(Q.fitShooterQuality(data, { asOf }));
  assertEqual(JSON.stringify(Q.fitShooterQuality(data, { asOf })), ref, 'wiederholter Aufruf: byte-identisch');
  const before = clone(data);
  Q.fitShooterQuality(data, { asOf });
  assertEqual(data, before, 'Eingabe wird nicht verändert');
  const rng = S.createRng(77);
  let same = true;
  for (let i = 0; i < 25; i++) if (JSON.stringify(Q.fitShooterQuality({ teamGames: shuffle(data.teamGames, rng), goalEvents: shuffle(data.goalEvents, rng), rosterEntries: shuffle(data.rosterEntries, rng) }, { asOf })) !== ref) same = false;
  assertTrue(same, 'Eingabereihenfolge (25 Permutationen aller drei Arrays) ändert das Ergebnis nicht (bitgleich)');
  assertTrue(finiteEverywhere(JSON.parse(ref)) && !/NaN|Infinity|undefined/.test(ref), 'keine NaN/Infinity/undefined im Ergebnis');
}

// ══ O. Reale Daten (nur Zählungen und Struktur, keine Koeffizienten-Pins) ═══
console.log('== O. Reale M0-Daten: Rauchtest ==');
{
  const model = await buildLeagueModel();
  const data = { teamGames: model.seasons.flatMap((s) => s.teamGames), goalEvents: model.seasons.flatMap((s) => s.goalEvents), rosterEntries: model.seasons.flatMap((s) => s.rosterEntries) };
  const r = Q.fitShooterQuality(data);
  // unabhängige Zählung aus den M0-Ereignissen
  const ev = data.goalEvents;
  const own = ev.filter((e) => e.isOwnGoal).length; const na = ev.filter((e) => e.isNotAssigned).length; const pen = ev.filter((e) => e.isPenaltyShot).length;
  const rosterGoals = ev.filter((e) => !e.isOwnGoal && !e.isNotAssigned && e.derived.scorerMatch === 'roster').length;
  assertEqual([ev.length, own, na, pen, rosterGoals], [3127, 22, 3, 23, 3102], 'Vorbedingung (eigene Zählung): 3127 Tore, 22 Eigentore, 3 not_assigned, 23 Strafschuss-Tore, 3102 Tore mit Kaderschützen');
  assertEqual(data.rosterEntries.length > 0 && model.seasons.reduce((a, s) => a + s.penaltyShotEvents.length, 0), 23, 'penaltyShotEvents: 23 Ereignisse (dieselben wie die Strafschuss-Tore in goalEvents)');
  const sumGoals = r.players.reduce((a, p) => a + p.goals, 0);
  assertEqual([sumGoals, r.quality.goals.withoutPlayerRow, sumGoals + r.quality.goals.withoutPlayerRow], [3101, 1, 3102], 'Σ Spielertore = 3101; 1 Tor eines Kaderspielers ohne playerId hat keine Spielerzeile; 3101 + 1 = 3102 Tore mit Kaderschützen');
  assertEqual([r.quality.goals.own, r.quality.goals.notAssigned, r.quality.goals.penaltyShot, r.quality.goals.attributed, r.quality.goals.unmatched], [22, 3, 23, 3101, 0], '22 Eigentore und 3 not_assigned fließen nicht in Spielertore; 23 Strafschuss-Tore genau einmal (in den 3101 enthalten)');
  const fieldRows = data.rosterEntries.filter((x) => x.isGoalie === false && x.playerId !== null && x.playerId !== undefined).length;
  assertEqual([r.players.reduce((a, p) => a + p.games, 0), r.quality.roster.playerGames, fieldRows], [3547, 3547, 3547], 'Σ Kaderspiele = 3547 = Feldspieler-Kaderzeilen mit playerId (eigene Zählung)');
  assertEqual([r.players.length, r.quality.roster.goalieExcluded, r.quality.roster.noPlayerId, r.quality.roster.duplicate], [268, 487, 2, 0], '268 Spieler; 487 Goalie-Zeilen und 2 Zeilen ohne playerId ausgeschlossen; keine Duplikate');
  const fieldIds = new Set(data.rosterEntries.filter((x) => x.isGoalie === false && x.playerId !== null && x.playerId !== undefined).map((x) => `${x.seasonKey}#${x.gameId}#${x.playerId}`));
  const assistsExpected = ev.filter((e) => !e.isOwnGoal && !e.isNotAssigned && e.derived.assistKind === 'player' && fieldIds.has(`${e.seasonKey}#${e.gameId}#${e.derived.assistPlayerId}`)).length;
  assertEqual([r.players.reduce((a, p) => a + p.assists, 0), assistsExpected, r.quality.assists.byGoalie], [2102, 2102, 74], 'Σ Assists = 2102 (eigene Zählung), 74 Goalie-Assists nicht zugerechnet');
  assertEqual([r.status, r.priors.goals.estimable, r.priors.assists.estimable, r.priors.points.estimable, r.tiers.goals.status, r.tiers.assists.status, r.tiers.points.status], ['ok', true, true, true, 'ok', 'ok', 'ok'], 'echte Daten: alle drei Priors schätzbar, Stufen berechnet');
  assertEqual(r.warnings.map((w) => w.code), ['roster-missing-player-id', 'goals-without-player-row', 'assists-by-goalies-not-attributed', 'assists-without-player-row', 'assists-placeholder'], 'Datenqualitäts-Warnungen der echten Daten (Eigentore, not_assigned und Strafschüsse sind keine Warnungen)');
  assertTrue(finiteEverywhere(r), 'echte Daten: keine NaN/Infinity');
  // Gleichstände: identische geschrumpfte Quote ⇒ identische Stufe (kein Tie-Break)
  let tiesConsistent = true; let tieGroups = 0;
  for (const [field, tierField] of [['goalsPerGameShrunk', 'tier'], ['assistsPerGameShrunk', 'assistsTier'], ['pointsPerGameShrunk', 'pointsTier']]) {
    const groups = new Map();
    for (const p of r.players) { const k = p[field]; if (!groups.has(k)) groups.set(k, new Set()); groups.get(k).add(p[tierField]); }
    for (const s of groups.values()) if (s.size !== 1) tiesConsistent = false;
    tieGroups += [...groups.values()].length;
  }
  assertTrue(tiesConsistent, 'Spieler mit exakt gleichem Wert haben immer dieselbe Stufe (kein Tie-Break)');
  // Spieltag-Stände der echten Daten: asOf am Ende von 22/23 enthält nur bis dahin bekannte Spieler
  const asOf2223 = T1.asOfAfterMatchday(data.teamGames, '22/23', Math.max(...data.teamGames.filter((t) => t.seasonKey === '22/23').map((t) => t.matchdayNumber)));
  const r2223 = Q.fitShooterQuality(data, { asOf: asOf2223 });
  assertTrue(r2223.asOfGameDate === asOf2223.date && r2223.players.length < r.players.length && r2223.status === 'ok', `asOf Ende 22/23 (${asOf2223.date}): weniger Spieler (${r2223.players.length}), Status ok`);
  const rng = S.createRng(5);
  const shuffled = { teamGames: shuffle(data.teamGames, rng), goalEvents: shuffle(data.goalEvents, rng), rosterEntries: shuffle(data.rosterEntries, rng) };
  assertEqual(JSON.stringify(Q.fitShooterQuality(shuffled)) === JSON.stringify(r), true, 'echte Daten: vertauschte Eingabereihenfolge ändert das Ergebnis nicht');
  const noFuture = Q.fitShooterQuality(data, { asOf: { date: '2020-01-01' } });
  assertEqual([noFuture.status, noFuture.players.length], ['empty', 0], 'echte Daten: asOf vor dem ersten Spieltag = leer');
}

console.log('');
if (failures > 0) {
  console.log(`${failures} Test(s) fehlgeschlagen.`);
  process.exitCode = 1;
} else {
  console.log('Alle Tests erfolgreich.');
  process.exitCode = 0;
}

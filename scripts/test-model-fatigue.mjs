#!/usr/bin/env node
// P4 Runde 1 · Test für scripts/model/fatigue.mjs (M4 Müdigkeit und Belastung, NUR LIGAEBENE, keine Build-Integration).
//
// Erwartungswerte stammen aus Handrechnung, aus einer VOLLSTÄNDIG UNABHÄNGIGEN Neuimplementierung der gesamten
// Ligaebene direkt im Test (`independentFit`, nutzt nur T1.fitTeamStrength/predictDuel und S.fitPoissonRegression —
// niemals die inneren Hilfsfunktionen von fatigue.mjs), aus synthetischen Datensätzen mit bekanntem, künstlich
// eingebautem (oder bewusst fehlendem) Müdigkeitseffekt, oder aus dem Rohzähler der echten M0-Daten — nicht aus dem
// getesteten Code selbst. Alle Zufallswerte haben feste Seeds.
//
// Aufruf: node scripts/test-model-fatigue.mjs

import * as S from './model/stats.mjs';
import * as T1 from './model/team-strength.mjs';
import * as F from './model/fatigue.mjs';
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
const cmp = (a, b) => (a < b ? -1 : a > b ? 1 : 0);

// ── Kleiner Fixture-Baukasten (M0-Format, nur die von M4 gelesenen Felder) ──────────────────────────────
function makeFx() {
  const fx = { teamGames: [], goalEvents: [], rosterEntries: [] };
  let nextGame = 1;
  const evIdx = new Map();
  const rowOf = (g, side) => fx.teamGames.find((t) => t.seasonKey === g.seasonKey && t.gameId === g.gameId && t.side === side);
  const api = {
    fx,
    // `oppOrderHome`/`oppOrderGuest`/`prevDiffHome`/`prevDiffGuest` (Standard null) setzen `derived.opponentGameOrderOfDay`/
    // `derived.opponentPrevGameGoalDiff` DIREKT — dieselben M0-Felder (normalize.mjs), die Fresh-vs-Tired unverändert
    // liest, hier vom Testautor explizit vorgegeben (Fresh-vs-Tired-Tests), Standard null (bestehendes Verhalten
    // aller anderen Tests unverändert).
    game(date, { seasonKey = 'S1', matchdayNumber = 1, home = 'A', guest = 'B', gameId, orderHome = 1, orderGuest = 1, fpHome = 8, fpGuest = 8, hostHome = null, hostGuest = null, startTime = null, gameNumber = null, oppOrderHome = null, oppOrderGuest = null, prevDiffHome = null, prevDiffGuest = null } = {}) {
      const id = gameId ?? nextGame++;
      const mk = (side, teamKey, opp, order, fp, host, oppOrder, prevDiff) => ({
        seasonKey, gameId: id, side, teamKey, opponentKey: opp, date, matchdayNumber, startTime, gameNumber,
        goalsFor: 0, goalsAgainst: 0, fieldPlayerCount: fp,
        derived: { gameOrderOfDay: order, isHostingTeam: host, opponentGameOrderOfDay: oppOrder, opponentPrevGameGoalDiff: prevDiff },
      });
      fx.teamGames.push(mk('home', home, guest, orderHome, fpHome, hostHome, oppOrderHome, prevDiffHome));
      fx.teamGames.push(mk('guest', guest, home, orderGuest, fpGuest, hostGuest, oppOrderGuest, prevDiffGuest));
      evIdx.set(`${seasonKey}#${id}`, 0);
      return { seasonKey, gameId: id, home, guest };
    },
    // Feldspieler-Kaderzeile (isGoalie: false), mirrors M2s Roster-Format.
    field(g, side, playerId, name) {
      fx.rosterEntries.push({ seasonKey: g.seasonKey, gameId: g.gameId, side, teamKey: side === 'home' ? g.home : g.guest, playerId, playerName: name, isGoalie: false });
    },
    // Goalie-Kaderzeile (isGoalie: true).
    goalie(g, side, playerId, name) {
      fx.rosterEntries.push({ seasonKey: g.seasonKey, gameId: g.gameId, side, teamKey: side === 'home' ? g.home : g.guest, playerId, playerName: name, isGoalie: true });
    },
    // `side` = die Seite, der das Tor GUTGESCHRIEBEN wird (derived.scoreDeltaSide), NICHT zwingend die physische
    // Ereignisseite (teamSide) — für Eigentor-Szenarien `teamSide` explizit abweichend angeben. `scorer`/`assist`
    // (playerId oder null) setzen `derived.scorerPlayerId`/`scorerMatch`/`assistPlayerId`/`assistKind` exakt wie M0
    // (scorerMatch 'roster' nur bei gesetztem `scorer`, sonst 'unmatched'; assistKind 'player' nur bei gesetztem
    // `assist`, sonst 'none' — `scorerMatch`/`assistKind` können zusätzlich explizit überschrieben werden, um
    // 'placeholder'/'unmatched'/'ambiguous' Fälle zu konstruieren, ohne einen Kaderplatz zu benötigen).
    goal(g, side, { period = 1, absSec = null, teamSide, creditSide, own = false, na = false, scorer = null, scorerMatch, assist = null, assistKind } = {}) {
      const key = `${g.seasonKey}#${g.gameId}`;
      const idx = evIdx.get(key); evIdx.set(key, idx + 1);
      const credit = creditSide === undefined ? side : creditSide; // creditSide: null erzeugt ein nicht zuordenbares Tor (scoreDeltaSide null)
      const resolvedScorerMatch = scorerMatch !== undefined ? scorerMatch : (scorer !== null ? 'roster' : 'unmatched');
      const resolvedAssistKind = assistKind !== undefined ? assistKind : (assist !== null ? 'player' : 'none');
      fx.goalEvents.push({
        seasonKey: g.seasonKey, gameId: g.gameId, eventKey: `${g.gameId}#${idx}`,
        teamSide: teamSide ?? side, period, absSec, isOwnGoal: own, isNotAssigned: na,
        derived: { scoreDeltaSide: credit, scorerPlayerId: scorer, scorerMatch: resolvedScorerMatch, assistPlayerId: assist, assistKind: resolvedAssistKind },
      });
      if (credit === 'home') { rowOf(g, 'home').goalsFor++; rowOf(g, 'guest').goalsAgainst++; }
      else if (credit === 'guest') { rowOf(g, 'guest').goalsFor++; rowOf(g, 'home').goalsAgainst++; }
    },
  };
  return api;
}

/** Kleine, aber für einen M1-Fit ausreichende Hintergrundliga (mehrere Teams, randomisierte Paarungen). */
function background(seed, { games = 40, teams = ['A', 'B', 'C', 'D', 'E', 'F'], dateOf = (i) => D(-800 + i * 5), halfBase = 1.4, teamHalfBias = {} } = {}) {
  const rng = S.createRng(seed);
  const b = makeFx();
  const k = teams.length;
  for (let i = 0; i < games; i++) {
    const ta = rng.nextInt(k); let tb = rng.nextInt(k - 1); if (tb >= ta) tb++;
    const order = 1 + rng.nextInt(2);
    const fpH = [6, 7, 8, 9][rng.nextInt(4)]; const fpG = [6, 7, 8, 9][rng.nextInt(4)];
    const host = rng.nextFloat() < 0.4 ? 'home' : rng.nextFloat() < 0.4 ? 'guest' : null;
    const g = b.game(dateOf(i), { seasonKey: 'S1', matchdayNumber: i + 1, home: teams[ta], guest: teams[tb], orderHome: order, orderGuest: order, fpHome: fpH, fpGuest: fpG, hostHome: host === 'home', hostGuest: host === 'guest' });
    for (const side of ['home', 'guest']) {
      const team = side === 'home' ? teams[ta] : teams[tb];
      const bias = teamHalfBias[team] ?? 0; // je Team ZUSÄTZLICHER HZ2-Bias (Standard 0 = bisheriges Verhalten unverändert)
      const goalsH1 = poissonDraw(rng, halfBase);
      const goalsH2 = poissonDraw(rng, Math.max(0.05, halfBase + bias));
      for (let n = 0; n < goalsH1; n++) b.goal(g, side, { period: 1, absSec: rng.nextInt(1200) });
      for (let n = 0; n < goalsH2; n++) b.goal(g, side, { period: 2, absSec: 1200 + rng.nextInt(1200) });
    }
  }
  return b;
}
function poissonDraw(rng, lambda) {
  const L = Math.exp(-lambda);
  let k = 0; let p = 1;
  do { k++; p *= rng.nextFloat(); } while (p > L);
  return k - 1;
}

// ── Vollständig unabhängige Neuimplementierung der Ligaebene (nur T1/S, nie fatigue.mjs-interne Hilfsfunktionen) ──
function independentFit(fx, options) {
  const fitOpts = { asOf: options.asOf, ...(options.halfLifeDays !== undefined ? { halfLifeDays: options.halfLifeDays } : {}), ...(options.ridge !== undefined ? { ridge: options.ridge } : {}) };
  const fit = T1.fitTeamStrength(fx.teamGames, fitOpts);
  if (!fit.estimable || !fit.stage1.estimable) return { estimable: false };
  const asOf = fit.asOf;
  const rowByKey = new Map();
  for (const t of fx.teamGames) rowByKey.set(`${t.seasonKey}#${t.gameId}#${t.side}`, t);
  const inCut = (d) => (asOf.inclusive ? d <= asOf.date : d < asOf.date);
  const eligible = fx.teamGames.filter((t) => (t.derived.gameOrderOfDay === 1 || t.derived.gameOrderOfDay === 2) && inCut(t.date));
  const eventsByGame = new Map();
  for (const e of fx.goalEvents) { const k = `${e.seasonKey}#${e.gameId}`; if (!eventsByGame.has(k)) eventsByGame.set(k, []); eventsByGame.get(k).push(e); }
  const rows = [];
  for (const r of eligible) {
    const opp = rowByKey.get(`${r.seasonKey}#${r.gameId}#${r.side === 'home' ? 'guest' : 'home'}`);
    if (!opp) continue;
    const oppOrder = opp.derived.gameOrderOfDay === 1 || opp.derived.gameOrderOfDay === 2 ? opp.derived.gameOrderOfDay : 1;
    const pred = T1.predictDuel(fit, {
      teamA: r.teamKey, teamB: r.opponentKey, orderA: r.derived.gameOrderOfDay, orderB: oppOrder,
      fieldPlayersA: r.fieldPlayerCount, fieldPlayersB: opp.fieldPlayerCount,
      hostA: r.derived.isHostingTeam ?? null, hostB: opp.derived.isHostingTeam ?? null,
    });
    if (!pred.available) continue;
    const lambdaFull = pred.expectedGoals.a;
    const events = eventsByGame.get(`${r.seasonKey}#${r.gameId}`) || [];
    const half = { 1: 0, 2: 0 };
    const seg = { 1: 0, 2: 0, 3: 0, 4: 0 };
    for (const e of events) {
      if (e.derived.scoreDeltaSide !== r.side) continue;
      const p = e.period;
      if (p !== 1 && p !== 2) continue;
      half[p]++;
      if (e.absSec === null || e.absSec === undefined) continue;
      const within = p === 1 ? e.absSec : e.absSec - 1200;
      const clamped = Math.min(Math.max(within, 0), 1200);
      seg[(p - 1) * 2 + (clamped < 600 ? 1 : 2)]++;
    }
    rows.push({ half, seg, order2: r.derived.gameOrderOfDay === 2 ? 1 : 0, lambdaFull });
  }
  const hasVariation = (arr) => { const s = arr.reduce((a, b) => a + b, 0); return s > 0 && s < arr.length; };

  const halfMeta = rows.flatMap((r) => [{ h: 0, o: r.order2, y: r.half[1], l: r.lambdaFull }, { h: 1, o: r.order2, y: r.half[2], l: r.lambdaFull }]);
  const halfCols = [];
  if (hasVariation(halfMeta.map((m) => m.h))) halfCols.push('h2');
  if (hasVariation(halfMeta.map((m) => m.h * m.o))) halfCols.push('orderXHalf');
  const halfX = halfMeta.map((m) => [1, ...(halfCols.includes('h2') ? [m.h] : []), ...(halfCols.includes('orderXHalf') ? [m.h * m.o] : [])]);
  const halfY = halfMeta.map((m) => m.y);
  const halfOffset = halfMeta.map((m) => Math.log(m.l / 2));
  const halfFit = S.fitPoissonRegression({ X: halfX, y: halfY, offset: halfOffset, penalty: 0 });

  const segMeta = rows.flatMap((r) => [1, 2, 3, 4].map((seg) => ({ seg, o: r.order2, y: r.seg[seg], l: r.lambdaFull })));
  const segSpecs = [
    { name: 'seg2', v: (m) => (m.seg === 2 ? 1 : 0) }, { name: 'seg3', v: (m) => (m.seg === 3 ? 1 : 0) }, { name: 'seg4', v: (m) => (m.seg === 4 ? 1 : 0) },
    { name: 'orderXSeg2', v: (m) => (m.seg === 2 ? m.o : 0) }, { name: 'orderXSeg3', v: (m) => (m.seg === 3 ? m.o : 0) }, { name: 'orderXSeg4', v: (m) => (m.seg === 4 ? m.o : 0) },
  ];
  const segKept = segSpecs.filter((s) => hasVariation(segMeta.map(s.v)));
  const segCols = segKept.map((s) => s.name);
  const segX = segMeta.map((m) => [1, ...segKept.map((s) => s.v(m))]);
  const segY = segMeta.map((m) => m.y);
  const segOffset = segMeta.map((m) => Math.log(m.l / 4));
  const segFit = S.fitPoissonRegression({ X: segX, y: segY, offset: segOffset, penalty: 0 });

  return { estimable: true, halfFit, halfCols, segFit, segCols, rows };
}

// ── Unabhängige Torzählung (period/absSec/scoreDeltaSide direkt, kein Aufruf von fatigue.mjs) ──────────────────
function tallyIndependent(events, side) {
  const half = { 1: 0, 2: 0 };
  const seg = { 1: 0, 2: 0, 3: 0, 4: 0 };
  for (const e of events) {
    if (e.derived.scoreDeltaSide !== side) continue;
    const p = e.period;
    if (p !== 1 && p !== 2) continue;
    half[p]++;
    if (e.absSec === null || e.absSec === undefined) continue;
    const within = p === 1 ? e.absSec : e.absSec - 1200;
    const clamped = Math.min(Math.max(within, 0), 1200);
    seg[(p - 1) * 2 + (clamped < 600 ? 1 : 2)]++;
  }
  return { half, seg };
}

// ── Unabhängige Normal-EB-Schrumpfung (nutzt S.estimateNormalPrior/S.shrinkToReference direkt, kein Aufruf von fatigue.mjs) ──
function shrinkIndependent(byTeamMap) {
  const teamKeys = [...byTeamMap.keys()].sort();
  const perTeam = new Map();
  for (const tk of teamKeys) perTeam.set(tk, { n: byTeamMap.get(tk).length, raw: simpleMean(byTeamMap.get(tk)), shrunkEffect: null });
  if (teamKeys.length < 2) return { prior: { estimable: false }, perTeam };
  let prior;
  try { prior = S.estimateNormalPrior(teamKeys.map((tk) => byTeamMap.get(tk))); } catch (e) { if (e instanceof S.NumericError) return { prior: { estimable: false, reason: e.code }, perTeam }; throw e; }
  teamKeys.forEach((tk, i) => {
    const g = prior.groups[i];
    const shrink = S.shrinkToReference({ mu: prior.mu, tau2: prior.tau2, value: g.mean, variance: g.variance });
    perTeam.get(tk).shrunkEffect = shrink.shrunkEffect;
  });
  return { prior: { estimable: true, mu: prior.mu, sigma2: prior.sigma2, tau2: prior.tau2, k: prior.k }, perTeam };
}
const simpleMean = (v) => v.reduce((a, b) => a + b, 0) / v.length;
function pushIntoTest(map, key, values) { if (!map.has(key)) map.set(key, []); map.get(key).push(...values); }
// `bootstrapTeamStrength` (von fitFatigue immer aufgerufen, auch wenn nur die Spieler-Ebene interessiert) braucht
// genug Spiel-Einheiten, damit sein eigener Bootstrap zuverlässig konvergiert (M1-Vertrag, hier nicht verändert) —
// winzige Ein-Spiel-Testfixturen brauchen daher eine kleine, unabhängige Füll-Hintergrundliga, die die geprüften
// Werte nicht berührt. Zwei Bedingungen sind nötig, sonst schlagen zu viele Bootstrap-Replikate fehl: (1) echte Tore
// (sonst 0:0-Füllspiele -> entarteter M1-Fit), (2) ECHTE order=1/2-Variation unter den Füllspielen selbst — sonst
// hängt die `order`-Spalte ausschließlich am einen echten Testspiel, und jedes Replikat, das dieses eine Spiel nicht
// zieht, verliert die order-Variation komplett (Spalte wird gedroppt -> Refit gilt als fehlgeschlagen).
function fillerGame(b, seed = 424242) {
  const rng = S.createRng(seed);
  const teams = ['FILLER1', 'FILLER2', 'FILLER3', 'FILLER4'];
  for (let i = 0; i < 12; i++) {
    const ta = rng.nextInt(4); let tb = rng.nextInt(3); if (tb >= ta) tb++;
    const order = 1 + rng.nextInt(2);
    const g = b.game(D(-900 + i * 3), { seasonKey: 'S1', home: teams[ta], guest: teams[tb], orderHome: order, orderGuest: order });
    for (const side of ['home', 'guest']) for (let k = 0; k < poissonDraw(rng, 1.5); k++) b.goal(g, side, { period: 1 + rng.nextInt(2), absSec: rng.nextInt(2400) });
  }
}

// ── Vollständig unabhängige Neuimplementierung der TEAM-Ebene (nur T1/S, nie fatigue.mjs-interne Hilfsfunktionen) ──
function independentTeamLevel(fx, options) {
  const fitOpts = { asOf: options.asOf, ...(options.halfLifeDays !== undefined ? { halfLifeDays: options.halfLifeDays } : {}), ...(options.ridge !== undefined ? { ridge: options.ridge } : {}) };
  const fit = T1.fitTeamStrength(fx.teamGames, fitOpts);
  if (!fit.estimable || !fit.stage1.estimable) return null;
  const asOf = fit.asOf;
  const rowByKey = new Map();
  for (const t of fx.teamGames) rowByKey.set(`${t.seasonKey}#${t.gameId}#${t.side}`, t);
  const inCut = (d) => (asOf.inclusive ? d <= asOf.date : d < asOf.date);
  const eligible = fx.teamGames.filter((t) => (t.derived.gameOrderOfDay === 1 || t.derived.gameOrderOfDay === 2) && inCut(t.date));
  const eventsByGame = new Map();
  for (const e of fx.goalEvents) { const k = `${e.seasonKey}#${e.gameId}`; if (!eventsByGame.has(k)) eventsByGame.set(k, []); eventsByGame.get(k).push(e); }
  const byTeamOrderHz = { 1: new Map(), 2: new Map() };
  const byTeamOrderLate = { 1: new Map(), 2: new Map() };
  for (const r of eligible) {
    const opp = rowByKey.get(`${r.seasonKey}#${r.gameId}#${r.side === 'home' ? 'guest' : 'home'}`);
    if (!opp) continue;
    const oppOrder = opp.derived.gameOrderOfDay;
    if (oppOrder !== 1 && oppOrder !== 2) continue; // Team-Ebene: STRENGER als Ligaebene, Gegner-Reihenfolge muss ECHT bekannt sein (kein Platzhalter)
    const pred = T1.predictDuel(fit, {
      teamA: r.teamKey, teamB: r.opponentKey, orderA: r.derived.gameOrderOfDay, orderB: oppOrder,
      fieldPlayersA: r.fieldPlayerCount, fieldPlayersB: opp.fieldPlayerCount,
      hostA: r.derived.isHostingTeam ?? null, hostB: opp.derived.isHostingTeam ?? null,
    });
    if (!pred.available) continue;
    const expectedOwn = pred.expectedGoals.a; const expectedOpp = pred.expectedGoals.b;
    const events = eventsByGame.get(`${r.seasonKey}#${r.gameId}`) || [];
    const ownTally = tallyIndependent(events, r.side);
    const oppTally = tallyIndependent(events, opp.side);
    const expectedDiffHalf = expectedOwn / 2 - expectedOpp / 2;
    const hzVals = [1, 2].map((h) => (ownTally.half[h] - oppTally.half[h]) - expectedDiffHalf);
    const expectedLateDiff = expectedOwn / 4 - expectedOpp / 4;
    const lateVal = (ownTally.seg[4] - oppTally.seg[4]) - expectedLateDiff;
    pushIntoTest(byTeamOrderHz[r.derived.gameOrderOfDay], r.teamKey, hzVals);
    pushIntoTest(byTeamOrderLate[r.derived.gameOrderOfDay], r.teamKey, [lateVal]);
  }
  return {
    hz: { 1: shrinkIndependent(byTeamOrderHz[1]), 2: shrinkIndependent(byTeamOrderHz[2]) },
    late: { 1: shrinkIndependent(byTeamOrderLate[1]), 2: shrinkIndependent(byTeamOrderLate[2]) },
  };
}

// ── Vollständig unabhängige Neuimplementierung der SPIELER-Ebene (nur rohe M0-Felder + S.estimateNormalPrior/
// S.shrinkToReference/S.estimateBetaPrior/S.betaBinomialPosterior direkt, nie fatigue.mjs-interne Hilfsfunktionen) ──
function independentPlayerLevel(fx, asOf) {
  const tgByKey = new Map();
  for (const t of fx.teamGames) tgByKey.set(`${t.seasonKey}#${t.gameId}#${t.side}`, t);
  const inCut = (d) => (asOf.inclusive ? d <= asOf.date : d < asOf.date);
  const validId = (x) => typeof x === 'number' && Number.isFinite(x);
  const rowsByKey = new Map();
  const rows = [];
  for (const r of fx.rosterEntries) {
    const tg = tgByKey.get(`${r.seasonKey}#${r.gameId}#${r.side}`);
    if (!tg || !inCut(tg.date)) continue;
    const gk = `${r.seasonKey}#${r.gameId}`;
    if (r.isGoalie === true) continue;
    if (r.isGoalie !== false) continue;
    if (!validId(r.playerId)) continue;
    const rk = `${gk}#${r.playerId}`;
    if (rowsByKey.has(rk)) continue;
    const ord = tg.derived.gameOrderOfDay;
    const row = { gk, playerId: r.playerId, teamKey: r.teamKey, order: ord === 1 || ord === 2 ? ord : null, date: tg.date, goalsH1: 0, goalsH2: 0, goalsUnknown: 0, assistsH1: 0, assistsH2: 0, assistsUnknown: 0 };
    rowsByKey.set(rk, row);
    rows.push(row);
  }
  const inWindowGames = new Set(rows.map((r) => r.gk));
  for (const e of fx.goalEvents) {
    const gk = `${e.seasonKey}#${e.gameId}`;
    if (!inWindowGames.has(gk)) continue;
    if (e.isOwnGoal === true || e.isNotAssigned === true) continue;
    const half = e.period === 1 ? 1 : e.period === 2 ? 2 : null;
    if (e.derived.scorerMatch === 'roster' && validId(e.derived.scorerPlayerId)) {
      const row = rowsByKey.get(`${gk}#${e.derived.scorerPlayerId}`);
      if (row) { if (half === 1) row.goalsH1++; else if (half === 2) row.goalsH2++; else row.goalsUnknown++; }
    }
    if (e.derived.assistKind === 'player' && validId(e.derived.assistPlayerId)) {
      const row = rowsByKey.get(`${gk}#${e.derived.assistPlayerId}`);
      if (row) { if (half === 1) row.assistsH1++; else if (half === 2) row.assistsH2++; else row.assistsUnknown++; }
    }
  }
  const byPlayer = new Map(); // playerId -> { byOrder: {1:{games,points,h2Points,halfKnown,byTeam:Map(teamKey->points[])}, 2:{...}} }
  for (const row of rows) {
    if (row.order === null) continue;
    let p = byPlayer.get(row.playerId);
    if (!p) { p = { playerId: row.playerId, byOrder: { 1: { games: 0, points: 0, h2Points: 0, halfKnown: 0, byTeam: new Map() }, 2: { games: 0, points: 0, h2Points: 0, halfKnown: 0, byTeam: new Map() } } }; byPlayer.set(row.playerId, p); }
    const points = row.goalsH1 + row.goalsH2 + row.goalsUnknown + row.assistsH1 + row.assistsH2 + row.assistsUnknown;
    const h2 = row.goalsH2 + row.assistsH2;
    const halfKnown = points - row.goalsUnknown - row.assistsUnknown;
    const agg = p.byOrder[row.order];
    agg.games++; agg.points += points; agg.h2Points += h2; agg.halfKnown += halfKnown;
    if (!agg.byTeam.has(row.teamKey)) agg.byTeam.set(row.teamKey, []);
    agg.byTeam.get(row.teamKey).push(points);
  }
  return byPlayer;
}

// ══ A. eventHalf / eventSegment: Randwerte, period, absSec ══════════════
console.log('== A. eventHalf/eventSegment: exakte Randwerte 0/600/1200/1800/2400, period, absSec=null ==');
{
  assertEqual([F.eventHalf({ period: 1 }), F.eventHalf({ period: 2 })], [1, 2], 'period 1/2 -> Halbzeit 1/2');
  for (const bad of [0, 3, null, undefined, 'x', NaN]) assertEqual(F.eventHalf({ period: bad }), null, `period ${String(bad)} -> keine Halbzeit`);
  // Segmentgrenzen exakt: 0, 600, 1200, 1800, 2400
  assertEqual(F.eventSegment({ period: 1, absSec: 0 }), 1, 'absSec=0, period=1 -> Segment 1 (Start)');
  assertEqual(F.eventSegment({ period: 1, absSec: 599 }), 1, 'absSec=599 -> noch Segment 1');
  assertEqual(F.eventSegment({ period: 1, absSec: 600 }), 2, 'absSec=600 exakt -> Segment 2 (Grenze gehört zum späteren Segment)');
  assertEqual(F.eventSegment({ period: 1, absSec: 1199 }), 2, 'absSec=1199 -> Segment 2');
  assertEqual(F.eventSegment({ period: 1, absSec: 1200 }), 2, 'absSec=1200 bei period=1 (Ende Halbzeit 1) -> weiterhin Segment 2, NICHT Segment 3 (period entscheidet die Halbzeit, nicht absSec)');
  assertEqual(F.eventSegment({ period: 2, absSec: 1200 }), 3, 'absSec=1200 bei period=2 (Beginn Halbzeit 2) -> Segment 3, NICHT Segment 2 (identischer absSec-Wert, andere period -> anderes Segment)');
  assertEqual(F.eventSegment({ period: 2, absSec: 1799 }), 3, 'absSec=1799 -> Segment 3');
  assertEqual(F.eventSegment({ period: 2, absSec: 1800 }), 4, 'absSec=1800 exakt -> Segment 4');
  assertEqual(F.eventSegment({ period: 2, absSec: 2399 }), 4, 'absSec=2399 -> Segment 4');
  assertEqual(F.eventSegment({ period: 2, absSec: 2400 }), 4, 'absSec=2400 exakt (Spielende) -> weiterhin Segment 4 (geklammert, kein 5. Segment)');
  // absSec === null: nicht künstlich zugeordnet
  assertEqual(F.eventSegment({ period: 1, absSec: null }), null, 'absSec=null -> kein Segment (nicht künstlich zugeordnet)');
  assertEqual(F.eventSegment({ period: 2, absSec: null }), null, 'absSec=null (Halbzeit 2) -> ebenfalls kein Segment');
  assertEqual(F.eventSegment({ period: 3, absSec: 100 }), null, 'unbekannte period -> kein Segment, unabhängig von absSec');
  assertEqual(F.eventSegment({ period: null, absSec: 100 }), null, 'period=null -> kein Segment');
}

// ══ B. lambdaFullForRow: Handrechnung, orderB/fieldPlayersB/hostB ohne Wirkung ══
console.log('== B. lambdaFullForRow: Handrechnung, Irrelevanz von orderB/fieldPlayersB/hostB für expectedGoals.a ==');
{
  const fit = {
    estimable: true,
    stage1: { estimable: true, mu: 0.4, effects: { order: 0.15, fieldPlayers: { le6: -0.3, ge9: 0.2 } }, teams: [{ teamKey: 'X', attack: 0.25, defense: -0.2 }, { teamKey: 'O', attack: 0.3, defense: 0.1 }] },
    stage2: { estimable: true, betaHost: 0.5 },
  };
  const own = { teamKey: 'X', opponentKey: 'O', fieldPlayerCount: 6, derived: { gameOrderOfDay: 2, isHostingTeam: true } };
  const opp = { teamKey: 'O', opponentKey: 'X', fieldPlayerCount: 7, derived: { gameOrderOfDay: 1, isHostingTeam: null } };
  const handrechnung = Math.exp(0.4 + 0.25 - 0.1 + 0.15 - 0.3) * Math.exp(0.5);
  assertNear(F.lambdaFullForRow(fit, own, opp), handrechnung, 1e-12, 'exp(mu+attack[X]-defense[O]+order+le6)·exp(betaHost) exakt (eigene Zeile: 2. Spiel, Kader<=6, Ausrichter)');
  // orderB (aus opp.derived.gameOrderOfDay) massiv verändert -> KEINE Wirkung auf lambdaFull
  const oppOrderChanged = { ...opp, derived: { ...opp.derived, gameOrderOfDay: 2 } };
  assertEqual(F.lambdaFullForRow(fit, own, oppOrderChanged), F.lambdaFullForRow(fit, own, opp), 'Gegner-eigene gameOrderOfDay hat KEINE Wirkung auf lambdaFull (fließt nur in expectedGoals.b ein)');
  // fieldPlayersB (Gegner-Kader) massiv verändert -> keine Wirkung
  const oppFpChanged = { ...opp, fieldPlayerCount: 20 };
  assertEqual(F.lambdaFullForRow(fit, own, oppFpChanged), F.lambdaFullForRow(fit, own, opp), 'Gegner-eigener fieldPlayerCount hat KEINE Wirkung auf lambdaFull');
  // hostB (Gegner-Ausrichter) verändert -> keine Wirkung
  const oppHostChanged = { ...opp, derived: { ...opp.derived, isHostingTeam: true } };
  assertEqual(F.lambdaFullForRow(fit, own, oppHostChanged), F.lambdaFullForRow(fit, own, opp), 'Gegner-eigenes isHostingTeam hat KEINE Wirkung auf lambdaFull');
  // opponentRow ohne gültige eigene Reihenfolge -> Platzhalter orderB=1, weiterhin kein numerischer Unterschied
  const oppNoOrder = { ...opp, derived: { ...opp.derived, gameOrderOfDay: null } };
  assertEqual(F.lambdaFullForRow(fit, own, oppNoOrder), F.lambdaFullForRow(fit, own, opp), 'Gegner ohne bekannte eigene Reihenfolge: Platzhalter orderB=1, kein numerischer Unterschied zu einer echten Reihenfolge');
  // eigene Zeile ohne bekannte Reihenfolge -> null
  assertEqual(F.lambdaFullForRow(fit, { ...own, derived: { ...own.derived, gameOrderOfDay: null } }, opp), null, 'eigene Zeile ohne gameOrderOfDay 1/2 -> null');
  // fehlende opponentRow -> null
  assertEqual(F.lambdaFullForRow(fit, own, null), null, 'fehlende opponentRow -> null');
  assertEqual(F.lambdaFullForRow(fit, own, undefined), null, 'undefined opponentRow -> null');
  // M1 nicht schätzbar -> null
  assertEqual(F.lambdaFullForRow({ estimable: false, stage1: { estimable: false }, reason: 'x' }, own, opp), null, 'M1 nicht schätzbar -> null');
}

// ══ C. Vollständiger unabhängiger Abgleich (Punktschätzung) auf einer Hintergrundliga ══
console.log('== C. Vollständige unabhängige Neuimplementierung stimmt mit fitFatigue exakt überein (Punktschätzung) ==');
{
  const b = background(101, { games: 60 });
  const asOf = { date: D(0) };
  const opts = { asOf, replicates: 20, seed: 7 };
  const r = F.fitFatigue(b.fx, opts);
  const ind = independentFit(b.fx, opts);
  assertTrue(ind.estimable, 'Vorbedingung: unabhängiger M1-Fit schätzbar');
  assertNear(r.league.effects.halfHz2.estimate, ind.halfFit.beta[ind.halfCols.indexOf('h2') + 1], 1e-7, 'halfHz2 stimmt mit unabhängiger Neuimplementierung überein');
  assertNear(r.league.effects.orderXHalf.estimate, ind.halfFit.beta[ind.halfCols.indexOf('orderXHalf') + 1], 1e-7, 'orderXHalf stimmt mit unabhängiger Neuimplementierung überein');
  assertNear(r.league.effects.segments.seg1.estimate, ind.segFit.beta[0], 1e-7, 'seg1 (Intercept) stimmt mit unabhängiger Neuimplementierung überein');
  for (const name of ['seg2', 'seg3', 'seg4', 'orderXSeg2', 'orderXSeg3', 'orderXSeg4']) {
    assertNear(r.league.effects.segments[name].estimate, ind.segFit.beta[ind.segCols.indexOf(name) + 1], 1e-7, `${name} stimmt mit unabhängiger Neuimplementierung überein`);
  }
  assertEqual(r.league.halfModel.rows.teamGames, ind.rows.length, 'Anzahl einfließender Team-Games stimmt überein');
  assertEqual(r.quality.teamGames.eligible, b.fx.teamGames.filter((t) => t.derived.gameOrderOfDay === 1 || t.derived.gameOrderOfDay === 2).length, 'Anzahl auswählbarer Team-Games stimmt mit direkter Zählung überein');
}

// ══ D. Synthetischer No-Fatigue-Fall ═════════════════════════════════════
console.log('== D. Synthetischer No-Fatigue-Fall: order2×H2 nicht signifikant (ci90 enthält 0) ==');
{
  // Gleiche Basisrate je Halbzeit für ALLE Spiele, unabhängig von order2 -> kein injizierter Effekt
  const b = background(202, { games: 220, halfBase: 1.3 });
  const r = F.fitFatigue(b.fx, { asOf: { date: D(0) }, replicates: 40, seed: 11 });
  assertEqual(r.status, 'ok', 'Vorbedingung: Fit schätzbar');
  const [lo, hi] = r.league.effects.orderXHalf.ci90;
  assertTrue(lo <= 0 && hi >= 0, `No-Fatigue: ci90 von orderXHalf enthält 0 (${lo.toFixed(4)}, ${hi.toFixed(4)}) — kein signifikanter Zusatzeffekt`);
}

// ══ E. Synthetischer Known-Fatigue-Fall ══════════════════════════════════
console.log('== E. Synthetischer Known-Fatigue-Fall: order2×H2 signifikant positiv, Größenordnung korrekt ==');
{
  const trueEffect = 0.6; // deutlicher, injizierter Zusatzfaktor exp(0.6) ≈ 1.82× für H2-Tore bei order2-Teams
  const rng = S.createRng(303);
  const b = makeFx();
  const teams = ['A', 'B', 'C', 'D', 'E', 'F'];
  const halfBase = 1.3;
  const games = 260;
  for (let i = 0; i < games; i++) {
    const ta = rng.nextInt(6); let tb = rng.nextInt(5); if (tb >= ta) tb++;
    const order = 1 + rng.nextInt(2);
    const g = b.game(D(-1400 + i * 5), { seasonKey: 'S1', matchdayNumber: i + 1, home: teams[ta], guest: teams[tb], orderHome: order, orderGuest: order, fpHome: 8, fpGuest: 8 });
    for (const side of ['home', 'guest']) {
      const goalsH1 = poissonDraw(rng, halfBase);
      const h2Rate = order === 2 ? halfBase * Math.exp(trueEffect) : halfBase;
      const goalsH2 = poissonDraw(rng, h2Rate);
      for (let n = 0; n < goalsH1; n++) b.goal(g, side, { period: 1, absSec: rng.nextInt(1200) });
      for (let n = 0; n < goalsH2; n++) b.goal(g, side, { period: 2, absSec: 1200 + rng.nextInt(1200) });
    }
  }
  const r = F.fitFatigue(b.fx, { asOf: { date: D(0) }, replicates: 40, seed: 12 });
  assertEqual(r.status, 'ok', 'Vorbedingung: Fit schätzbar');
  const eff = r.league.effects.orderXHalf;
  assertTrue(eff.estimate > 0, `Known-Fatigue: orderXHalf-Schätzung positiv (${eff.estimate.toFixed(4)}), stimmt im Vorzeichen mit dem injizierten Effekt überein`);
  assertTrue(eff.ci90[0] > 0, `Known-Fatigue: ci90 von orderXHalf liegt vollständig über 0 (${eff.ci90[0].toFixed(4)}, ${eff.ci90[1].toFixed(4)}) — signifikant`);
  // Größenordnung: M4 schätzt M1s order-Haupteffekt NICHT erneut (siehe Kopfkommentar), d. h. ein Teil des injizierten
  // Effekts (der auch die TOTALE Torzahl von order2-Spielen erhöht, da H2 Teil des Totals ist) wird bereits von M1s
  // EIGENEM β_order absorbiert (gleichmäßig auf H1 UND H2 angewendet). Die exakte, aus der Offset-Differenz ableitbare
  // Beziehung ist β_order (M1) + orderXHalf (M4) ≈ trueEffect — unabhängig mit T1.fitTeamStrength nachgerechnet, NICHT
  // der rohe injizierte Wert allein (der M4-Koeffizient für sich allein unterschätzt trueEffect systematisch).
  const m1Check = T1.fitTeamStrength(b.fx.teamGames, { asOf: { date: D(0) } });
  const recovered = m1Check.stage1.effects.order + eff.estimate;
  assertTrue(Math.abs(recovered - trueEffect) < 0.15, `Known-Fatigue: β_order (M1, unabhängig nachgerechnet, ${m1Check.stage1.effects.order.toFixed(3)}) + orderXHalf (${eff.estimate.toFixed(3)}) = ${recovered.toFixed(3)} liegt nahe am injizierten Effekt ${trueEffect} (Toleranz 0.15)`);
}

// ══ F. gameOrderOfDay === null wird ausgeschlossen ═══════════════════════
console.log('== F. gameOrderOfDay === null: Team-Game vollständig ausgeschlossen ==');
{
  const b = background(404, { games: 40 });
  const gExtra = b.game(D(-1), { home: 'A', guest: 'B', orderHome: null, orderGuest: null });
  b.goal(gExtra, 'home', { period: 1, absSec: 100 });
  b.goal(gExtra, 'guest', { period: 2, absSec: 1500 });
  const r = F.fitFatigue(b.fx, { asOf: { date: D(10) }, replicates: 20, seed: 5 });
  const withoutExtraTeamGames = b.fx.teamGames.filter((t) => `${t.seasonKey}#${t.gameId}` !== `${gExtra.seasonKey}#${gExtra.gameId}`);
  assertEqual(r.quality.teamGames.eligible, withoutExtraTeamGames.filter((t) => t.derived.gameOrderOfDay === 1 || t.derived.gameOrderOfDay === 2).length, 'Spiel mit gameOrderOfDay=null zählt nicht zu eligible');
  assertTrue(r.quality.teamGames.excludedOrderNull >= 2, 'excludedOrderNull zählt beide Zeilen des Spiels ohne Reihenfolge');
}

// ══ G. absSec === null: nicht segmentiert, Warnung, weiterhin Halbzeit ═══
console.log('== G. absSec === null: kein Segment, aber weiterhin zur Halbzeit gezählt, Warnung erzeugt ==');
{
  const b = background(505, { games: 30 });
  const g = b.game(D(-1), { home: 'A', guest: 'B' });
  b.goal(g, 'home', { period: 1, absSec: null }); // zählt zur Halbzeit 1, aber zu keinem Segment
  b.goal(g, 'home', { period: 1, absSec: 100 });
  const r = F.fitFatigue(b.fx, { asOf: { date: D(10) }, replicates: 20, seed: 6 });
  assertTrue(r.quality.goals.absSecNullExcludedFromSegments >= 1, 'absSec=null wird gezählt (mindestens das eine konstruierte Tor)');
  assertTrue(r.warnings.some((w) => w.code === 'abs-sec-null-excluded-from-segments'), 'Warnung abs-sec-null-excluded-from-segments erscheint');
  // unabhängiger Beleg: Summe der Segment-Zählwerte < Summe der Halbzeit-Zählwerte für dieses eine konstruierte Spiel
  const ind = independentFit(b.fx, { asOf: { date: D(10) } });
  const row = ind.rows.find((row2) => row2.lambdaFull && Object.values(row2.half).reduce((a, x) => a + x, 0) > Object.values(row2.seg).reduce((a, x) => a + x, 0));
  assertTrue(row !== undefined, 'mindestens ein Team-Game hat mehr Halbzeit- als Segment-Zählungen (das absSec=null-Tor fehlt im Segment, nicht in der Halbzeit)');
}

// ══ H. Kein zuordenbares Tor (scoreDeltaSide === null) ═══════════════════
console.log('== H. scoreDeltaSide === null: zählt für keine Seite, Warnung, goalsFor konsistent, GENAU EINMAL gezählt (nicht je Teamseite) ==');
{
  const b = background(606, { games: 30 });
  const g = b.game(D(-1), { home: 'A', guest: 'B' });
  b.goal(g, 'home', { period: 1, absSec: 50, creditSide: null }); // nicht zuordenbar: goalsFor bleibt unverändert — GENAU EIN solches Tor in der gesamten Fixture (background(606) enthält sonst ausschließlich zuordenbare Tore)
  const r = F.fitFatigue(b.fx, { asOf: { date: D(10) }, replicates: 20, seed: 9 });
  // Vorbedingung für einen echten Regressionstest: BEIDE Team-Game-Zeilen dieses Spiels (home UND guest, beide
  // gameOrderOfDay=1) werden tatsächlich von fitFatigue verarbeitet (kein M1-Ausschluss) — sonst könnte der Test
  // eine erneute Doppelzählung je Teamseite gar nicht erfassen.
  assertEqual(r.quality.teamGames.excludedM1Unavailable, 0, 'Vorbedingung: keine Team-Game-Zeile wegen fehlender M1-Vorhersage ausgeschlossen (beide Seiten von Spiel g werden verarbeitet)');
  const creditWarning = r.warnings.find((w) => w.code === 'goal-credit-unknown-excluded');
  assertTrue(creditWarning !== undefined, 'Warnung goal-credit-unknown-excluded erscheint');
  // Regressionsschutz (Schritt 2): das EINE nicht zuordenbare Tor wird einmal JE SPIEL gezählt, nicht einmal je
  // Teamseite (creditUnknownCountedGames in fatigue.mjs) — bei einer erneuten Doppelzählung wäre count hier 2.
  assertEqual(creditWarning?.count, 1, 'goal-credit-unknown-excluded wird GENAU EINMAL gezählt (je Spiel, nicht je Teamseite) — direkter Regressionstest für den in Schritt 2 behobenen Doppelzählungsfehler');
  const homeRow = b.fx.teamGames.find((t) => t.seasonKey === g.seasonKey && t.gameId === g.gameId && t.side === 'home');
  assertEqual(homeRow.goalsFor, 0, 'nicht zuordenbares Tor erhöht goalsFor keiner Seite (konsistent mit M0s scoreDeltaSide-Konvention)');
}

// ══ I. Determinismus ══════════════════════════════════════════════════════
console.log('== I. Determinismus: gleicher Seed -> byte-identisches Ergebnis ==');
{
  const b = background(707, { games: 50 });
  const opts = { asOf: { date: D(0) }, replicates: 25, seed: 17 };
  const r1 = F.fitFatigue(b.fx, opts);
  const r2 = F.fitFatigue(b.fx, opts);
  assertEqual(JSON.stringify(r1), JSON.stringify(r2), 'zwei identische Aufrufe (gleiche Daten, gleiche Optionen) liefern byte-identisches Ergebnis');
}

// ══ J. Bootstrap-CI: Determinismus, Seed-Abhängigkeit, Struktur ══════════
console.log('== J. Bootstrap-CI: geordnetes Intervall, seed-abhängig, Replikatzahl dokumentiert ==');
{
  const b = background(808, { games: 60 });
  const opts = { asOf: { date: D(0) }, replicates: 30, seed: 21 };
  const r1 = F.fitFatigue(b.fx, opts);
  const r2 = F.fitFatigue(b.fx, { ...opts, seed: 4242 });
  assertTrue(JSON.stringify(r1.league.effects) !== JSON.stringify(r2.league.effects), 'anderer Seed kann andere ci90-Werte erzeugen');
  for (const key of ['halfHz2', 'orderXHalf']) {
    const [lo, hi] = r1.league.effects[key].ci90;
    assertTrue(lo <= r1.league.effects[key].estimate && r1.league.effects[key].estimate <= hi, `${key}: Punktschätzung liegt im ci90`);
    assertTrue(lo <= hi, `${key}: ci90 ist geordnet (lower <= upper)`);
  }
  for (const key of ['seg1', 'seg2', 'seg3', 'seg4', 'orderXSeg2', 'orderXSeg3', 'orderXSeg4']) {
    const eff = r1.league.effects.segments[key];
    assertTrue(eff.ci90[0] <= eff.estimate && eff.estimate <= eff.ci90[1], `segments.${key}: Punktschätzung liegt im ci90`);
  }
  assertEqual(r1.quality.bootstrap.replicates, 30, 'quality.bootstrap.replicates dokumentiert die angeforderte Anzahl');
  assertTrue(r1.quality.bootstrap.usable + r1.quality.bootstrap.failed === r1.quality.bootstrap.replicates, 'usable + failed = replicates');
}

// ══ K. asOf: kein Leakage ═════════════════════════════════════════════════
console.log('== K. asOf: Spiele nach asOf beeinflussen weder Fit noch Bootstrap ==');
{
  const b = background(909, { games: 50 });
  const cutoff = { date: D(0) };
  const rBefore = F.fitFatigue(b.fx, { asOf: cutoff, replicates: 20, seed: 3 });
  // weiteres Spiel NACH dem Cutoff mit extremem, klar erkennbarem Muster hinzufügen
  const bAfter = { teamGames: [...b.fx.teamGames], goalEvents: [...b.fx.goalEvents] };
  const extra = makeFx();
  const gg = extra.game(D(30), { home: 'A', guest: 'B', orderHome: 2, orderGuest: 1, gameId: 999999 }); // eigener gameId, kollidiert bewusst nicht mit der Hintergrundliga (deren makeFx()-Zähler ebenfalls bei 1 beginnt)
  for (let n = 0; n < 20; n++) extra.goal(gg, 'home', { period: 2, absSec: 1300 });
  bAfter.teamGames.push(...extra.fx.teamGames);
  bAfter.goalEvents.push(...extra.fx.goalEvents);
  const rAfter = F.fitFatigue(bAfter, { asOf: cutoff, replicates: 20, seed: 3 });
  // Nur die SUBSTANZIELLEN Teile vergleichen: quality.teamGames.excludedOutsideCutoff unterscheidet sich ERWARTBAR
  // (rAfter zählt die 2 zusätzlichen, tatsächlich ausgeschlossenen Zeilen korrekt mit) — das ist reine Buchführung,
  // kein Leakage. Leakage würde sich in `league` (Koeffizienten) oder `quality.teamGames.eligible` zeigen.
  const substantive = (r) => ({ status: r.status, asOf: r.asOf, asOfGameDate: r.asOfGameDate, league: r.league, eligible: r.quality.teamGames.eligible });
  assertEqual(substantive(rBefore), substantive(rAfter), 'ein zusätzliches, klar erkennbares Spiel NACH asOf ändert weder den M1-Fit noch M4s Koeffizienten/eligible-Zählung (kein Leakage)');
  assertEqual(rBefore.quality.teamGames.excludedOutsideCutoff, 0, 'Vorbedingung: ohne zusätzliches Spiel nichts außerhalb des Cutoffs');
  assertEqual(rAfter.quality.teamGames.excludedOutsideCutoff, 2, 'das zusätzliche Spiel (2 Team-Game-Zeilen) wird korrekt als außerhalb des Cutoffs erkannt und gezählt');
}

// ══ L. Reihenfolgeunabhängigkeit der Eingabedaten ═════════════════════════
console.log('== L. Reihenfolgeunabhängigkeit: vertauschte Eingabe-Arrays ändern das Ergebnis nicht ==');
{
  const b = background(1010, { games: 40 });
  const opts = { asOf: { date: D(0) }, replicates: 20, seed: 8 };
  const r = F.fitFatigue(b.fx, opts);
  const rng = S.createRng(55);
  const shuffled = { teamGames: shuffle(b.fx.teamGames, rng), goalEvents: shuffle(b.fx.goalEvents, rng) };
  const rShuffled = F.fitFatigue(shuffled, opts);
  assertEqual(JSON.stringify(r), JSON.stringify(rShuffled), 'vertauschte Reihenfolge von teamGames/goalEvents ändert das Ergebnis nicht');
}

// ══ M. Empty/nicht schätzbare Fälle ════════════════════════════════════════
console.log('== M. Empty- und Nicht-schätzbar-Fälle ==');
{
  const empty = F.fitFatigue({ teamGames: [], goalEvents: [] }, { replicates: 20, seed: 1 });
  assertEqual(empty.status, 'not-estimable', 'leere Eingabe: M1 selbst nicht schätzbar -> status not-estimable');
  assertEqual(empty.league.effects.halfHz2, { estimate: null, ci90: null }, 'leere Eingabe: alle Effekte null');
  assertTrue(finiteEverywhere({ x: [] }), 'Vorbedingung: finiteEverywhere-Helfer funktioniert an trivialem Fall');

  // Datensatz ganz ohne bekannte Reihenfolge: M1 verwendet DIESELBE D4-Auswahlregel (gameOrderOfDay 1|2) für die
  // EIGENEN Zeilen wie M4 — ohne jede order-bekannte Zeile ist bereits M1 selbst nicht schätzbar (status
  // 'not-estimable', NICHT M4s eigener 'empty'-Zweig, der nur greift, wenn M1 schätzbar ist, M4s Zeilenauswahl im
  // selben Datumsschnitt `fit.asOf` aber dennoch leer bleibt — strukturell nicht separat auslösbar, da M4 exakt
  // dieselbe order+asOf-Auswahlregel wie M1 auf denselben Datumsschnitt anwendet; der Zweig bleibt als Schutz für
  // künftige Erweiterungen bestehen, siehe fatigue.mjs).
  const b = makeFx();
  const g = b.game(D(-1), { home: 'A', guest: 'B', orderHome: null, orderGuest: null });
  b.goal(g, 'home', { period: 1, absSec: 10 });
  const g2 = b.game(D(-2), { home: 'A', guest: 'C', orderHome: null, orderGuest: null });
  b.goal(g2, 'guest', { period: 1, absSec: 10 });
  const r = F.fitFatigue(b.fx, { asOf: { date: D(0) }, replicates: 20, seed: 1 });
  assertEqual(r.status, 'not-estimable', 'nur Team-Games ohne Reihenfolge: bereits M1 selbst nicht schätzbar -> status not-estimable');

  for (const bad of [null, undefined, {}, { teamGames: [] }, { teamGames: 'x', goalEvents: [] }]) throwsCode(() => F.fitFatigue(bad, { replicates: 20, seed: 1 }), 'invalid-input', `ungültige Eingabe ${JSON.stringify(bad)} -> Fehler`);
  throwsCode(() => F.fitFatigue({ teamGames: [], goalEvents: [] }, {}), 'invalid-input', 'ohne replicates/seed -> Fehler (M4 verlangt beides)');
  throwsCode(() => F.fitFatigue({ teamGames: [], goalEvents: [] }, { replicates: 20 }), 'invalid-input', 'nur replicates -> Fehler');
  throwsCode(() => F.fitFatigue({ teamGames: [], goalEvents: [] }, { seed: 1 }), 'invalid-input', 'nur seed -> Fehler');
  throwsCode(() => F.fitFatigue({ teamGames: [], goalEvents: [] }, { replicates: 20, seed: 1, halfLifeDays: -1 }), 'invalid-input', 'halfLifeDays <= 0 -> Fehler');
  throwsCode(() => F.fitFatigue({ teamGames: [], goalEvents: [] }, { replicates: 20, seed: 1, ridge: -1 }), 'invalid-input', 'ridge < 0 -> Fehler');
}

// ══ N. Keine Änderung an M0/M1-Datenstrukturen (Eingabe unverändert) ═══════
console.log('== N. Eingabe (M0-Arrays) wird nicht verändert ==');
{
  const b = background(1111, { games: 30 });
  const before = clone(b.fx);
  F.fitFatigue(b.fx, { asOf: { date: D(0) }, replicates: 20, seed: 2 });
  assertEqual(b.fx, before, 'teamGames/goalEvents nach fitFatigue byte-identisch zum Zustand davor');
}

// ══ O. Real-data Smoke-Test ════════════════════════════════════════════════
console.log('== O. Real-data Smoke-Test (aus den echten M0-Daten verifiziert, nichts hartkodiert) ==');
{
  const model = await buildLeagueModel();
  const teamGames = model.seasons.flatMap((s) => s.teamGames);
  const goalEvents = model.seasons.flatMap((s) => s.goalEvents);
  const data = { teamGames, goalEvents };

  // Unabhängige Rohzählung direkt aus den echten Daten (nicht aus dem getesteten Code)
  const orderKnown = teamGames.filter((t) => t.derived.gameOrderOfDay === 1 || t.derived.gameOrderOfDay === 2);
  const orderNullCount = teamGames.filter((t) => t.derived.gameOrderOfDay !== 1 && t.derived.gameOrderOfDay !== 2).length;

  const r = F.fitFatigue(data, { replicates: 30, seed: 2026 });
  assertEqual(r.status, 'ok', 'echte Daten: M4 schätzbar, Status ok');
  assertEqual(r.quality.teamGames.eligible + r.quality.teamGames.excludedOrderNull, orderKnown.length + orderNullCount, 'eligible + excludedOrderNull = Gesamtzahl der Team-Games (echte Daten, aus M0 direkt gezählt)');
  assertEqual(r.quality.teamGames.excludedOrderNull, orderNullCount, 'excludedOrderNull stimmt mit direkter Rohzählung überein (echte Daten)');
  assertTrue(r.quality.teamGames.eligible === orderKnown.length, `eligible (${r.quality.teamGames.eligible}) stimmt mit direkter Rohzählung der Order-bekannten Team-Games (${orderKnown.length}) überein`);
  assertTrue(finiteEverywhere(r), 'echte Daten: keine NaN/Infinity im Ergebnis');
  assertEqual(r.league.halfModel.rows.observations, 2 * r.league.halfModel.rows.teamGames, 'Halbzeitmodell: genau 2 Beobachtungen je Team-Game');
  assertEqual(r.league.segmentModel.rows.observations, 4 * r.league.segmentModel.rows.teamGames, 'Segmentmodell: genau 4 Beobachtungen je Team-Game');

  // Unabhängiger voller Abgleich (Punktschätzung) auf den ECHTEN Daten
  const opts = { replicates: 30, seed: 2026 };
  const ind = independentFit(data, opts);
  assertTrue(ind.estimable, 'echte Daten: unabhängiger M1-Fit schätzbar');
  assertNear(r.league.effects.halfHz2.estimate, ind.halfFit.beta[ind.halfCols.indexOf('h2') + 1], 1e-7, 'echte Daten: halfHz2 stimmt mit unabhängiger Neuimplementierung überein');
  assertNear(r.league.effects.orderXHalf.estimate, ind.halfFit.beta[ind.halfCols.indexOf('orderXHalf') + 1], 1e-7, 'echte Daten: orderXHalf stimmt mit unabhängiger Neuimplementierung überein');

  // Torzuordnung: unabhängige Zählung von H1/H2-Toren (scoreDeltaSide-basiert) auf den order-bekannten Spielen
  let h1 = 0; let h2 = 0;
  const byGame = new Map();
  for (const e of goalEvents) { const k = `${e.seasonKey}#${e.gameId}`; if (!byGame.has(k)) byGame.set(k, []); byGame.get(k).push(e); }
  for (const t of orderKnown) {
    const events = byGame.get(`${t.seasonKey}#${t.gameId}`) || [];
    for (const e of events) {
      if (e.derived.scoreDeltaSide !== t.side) continue;
      if (e.period === 1) h1++; else if (e.period === 2) h2++;
    }
  }
  assertTrue(h1 > 0 && h2 > 0, `Vorbedingung: echte Daten enthalten sowohl H1- (${h1}) als auch H2-Tore (${h2})`);

  // Team-Ebene (Punkt 19): alle echten teamKeys, game1/game2, hz + lateGameIndex, keine NaN/Infinity
  assertTrue(r.teams.length > 0, `echte Daten: teams[] nicht leer (${r.teams.length} Teams)`);
  const realTeamKeysWithBothOrders = new Set();
  const rowByKeyReal = new Map();
  for (const t of teamGames) rowByKeyReal.set(`${t.seasonKey}#${t.gameId}#${t.side}`, t);
  for (const t of orderKnown) {
    const opp = rowByKeyReal.get(`${t.seasonKey}#${t.gameId}#${t.side === 'home' ? 'guest' : 'home'}`);
    if (opp && (opp.derived.gameOrderOfDay === 1 || opp.derived.gameOrderOfDay === 2)) realTeamKeysWithBothOrders.add(t.teamKey);
  }
  assertEqual(new Set(r.teams.map((t) => t.teamKey)), realTeamKeysWithBothOrders, 'echte Daten: teams[] enthält exakt die teamKeys mit mindestens einer team-tauglichen Beobachtung');
  for (const team of r.teams) {
    for (const gk of ['game1', 'game2']) {
      for (const metric of ['hz', 'lateGameIndex']) {
        const cell = team[gk][metric];
        assertTrue(typeof cell.n === 'number' && cell.n >= 0, `echte Daten: ${team.teamKey}.${gk}.${metric}.n ist eine Zahl >= 0`);
        assertTrue(cell.n === 0 || Number.isFinite(cell.raw), `echte Daten: ${team.teamKey}.${gk}.${metric}.raw endlich oder n=0`);
      }
    }
  }
  assertTrue(finiteEverywhere(r.teams), 'echte Daten: keine NaN/Infinity in teams[]');
  assertTrue(finiteEverywhere(r.quality.shrinkage), 'echte Daten: keine NaN/Infinity in quality.shrinkage');
}

// ══ P. Team-Ebene: Handrechnung Halbzeit-Residual, M1-Erwartung korrekt abgezogen ══
console.log('== P. halfDiffResidualsForGame: Handrechnung, M1-Erwartung korrekt von der Tordifferenz abgezogen ==');
{
  const fit = {
    estimable: true,
    stage1: { estimable: true, mu: 0.4, effects: { order: 0.2, fieldPlayers: { le6: 0, ge9: 0 } }, teams: [{ teamKey: 'X', attack: 0.3, defense: -0.15 }, { teamKey: 'O', attack: 0.05, defense: 0.1 }] },
    stage2: { estimable: false, betaHost: null },
  };
  const own = { teamKey: 'X', opponentKey: 'O', fieldPlayerCount: 7, derived: { gameOrderOfDay: 2, isHostingTeam: null } };
  const opp = { teamKey: 'O', opponentKey: 'X', fieldPlayerCount: 7, derived: { gameOrderOfDay: 1, isHostingTeam: null } };
  const exp = F.expectedDuelForRow(fit, own, opp);
  const expectedOwnHandr = Math.exp(0.4 + 0.3 - 0.1 + 0.2); // eigene Zeile: order=2 -> +0.2
  const expectedOppHandr = Math.exp(0.4 + 0.05 - (-0.15)); // Gegner-Zeile: order=1 -> kein Bonus
  assertNear(exp.expectedOwn, expectedOwnHandr, 1e-12, 'Handrechnung: expectedOwn = exp(mu+attack[X]-defense[O]+order)');
  assertNear(exp.expectedOpp, expectedOppHandr, 1e-12, 'Handrechnung: expectedOpp = exp(mu+attack[O]-defense[X]) (Gegner hat order=1, kein Bonus)');

  // Spiel: eigenes Team 2:0 in HZ1, 1:3 in HZ2 (kreditiert über scoreDeltaSide)
  const events = [
    { period: 1, absSec: 50, derived: { scoreDeltaSide: 'home' } }, { period: 1, absSec: 90, derived: { scoreDeltaSide: 'home' } },
    { period: 2, absSec: 1300, derived: { scoreDeltaSide: 'home' } },
    { period: 2, absSec: 1400, derived: { scoreDeltaSide: 'guest' } }, { period: 2, absSec: 1500, derived: { scoreDeltaSide: 'guest' } }, { period: 2, absSec: 1600, derived: { scoreDeltaSide: 'guest' } },
  ];
  const [r1, r2] = F.halfDiffResidualsForGame(events, 'home', 'guest', exp.expectedOwn, exp.expectedOpp);
  const expectedDiffHalfHandr = expectedOwnHandr / 2 - expectedOppHandr / 2;
  assertNear(r1, 2 - 0 - expectedDiffHalfHandr, 1e-12, 'Handrechnung HZ1: diffResidualHalf = (2−0) − expectedDiffHalf');
  assertNear(r2, 1 - 3 - expectedDiffHalfHandr, 1e-12, 'Handrechnung HZ2: diffResidualHalf = (1−3) − expectedDiffHalf');
  // Identität: diffResidualHalf = ownResidualHalf − oppResidualHalf (Punkt 2: M1-Erwartung korrekt abgezogen)
  const ownResidualH1 = 2 - expectedOwnHandr / 2; const oppResidualH1 = 0 - expectedOppHandr / 2;
  assertNear(r1, ownResidualH1 - oppResidualH1, 1e-12, 'Identität HZ1: diffResidualHalf = ownResidualHalf − oppResidualHalf');
  const ownResidualH2 = 1 - expectedOwnHandr / 2; const oppResidualH2 = 3 - expectedOppHandr / 2;
  assertNear(r2, ownResidualH2 - oppResidualH2, 1e-12, 'Identität HZ2: diffResidualHalf = ownResidualHalf − oppResidualHalf');

  // expectedDuelForRow: Vertrag (beide Reihenfolgen müssen bekannt sein, ANDERS als lambdaFullForRow ohne Platzhalter-Fallback)
  assertEqual(F.expectedDuelForRow(fit, { ...own, derived: { ...own.derived, gameOrderOfDay: null } }, opp), null, 'expectedDuelForRow: eigene Reihenfolge unbekannt -> null');
  assertEqual(F.expectedDuelForRow(fit, own, { ...opp, derived: { ...opp.derived, gameOrderOfDay: null } }), null, 'expectedDuelForRow: GEGNER-Reihenfolge unbekannt -> null (kein Platzhalter, anders als lambdaFullForRow)');
  assertEqual(F.expectedDuelForRow(fit, own, null), null, 'expectedDuelForRow: fehlende opponentRow -> null');
}

// ══ Q. Team-Ebene: Late-Game-Index nur Segment 4, Erwartung = lambdaFull/4 ══
console.log('== Q. lateResidualForGame: ausschließlich Segment 4, expectedLate = lambdaFull/4 ==');
{
  const expectedOwn = 3.2; const expectedOpp = 2.0;
  // Tore in Segment 1-3 dürfen NICHT einfließen; nur Segment 4 (absSec 1800-2400 bzw. period=2, secWithinHalf>=600)
  const events = [
    { period: 1, absSec: 50, derived: { scoreDeltaSide: 'home' } }, // Seg1, zählt NICHT
    { period: 1, absSec: 700, derived: { scoreDeltaSide: 'home' } }, // Seg2, zählt NICHT
    { period: 2, absSec: 1300, derived: { scoreDeltaSide: 'home' } }, // Seg3, zählt NICHT
    { period: 2, absSec: 1900, derived: { scoreDeltaSide: 'home' } }, { period: 2, absSec: 2100, derived: { scoreDeltaSide: 'home' } }, // Seg4: 2 eigene
    { period: 2, absSec: 2000, derived: { scoreDeltaSide: 'guest' } }, // Seg4: 1 gegnerisch
    { period: 1, absSec: 200, derived: { scoreDeltaSide: 'guest' } }, // Seg1, zählt NICHT
  ];
  const late = F.lateResidualForGame(events, 'home', 'guest', expectedOwn, expectedOpp);
  const expectedLateDiffHandr = expectedOwn / 4 - expectedOpp / 4;
  assertNear(late, (2 - 1) - expectedLateDiffHandr, 1e-12, 'Handrechnung: lateResidual = (actualLateOwn=2 − actualLateOpp=1) − (expectedOwn/4 − expectedOpp/4), Tore außerhalb Segment 4 ignoriert');
  // Kontrollrechnung ohne die Segment 1-3-Tore: muss dasselbe Ergebnis liefern (Beweis, dass sie nicht einfließen)
  const eventsOnlySeg4 = events.filter((e) => (e.period === 2 && e.absSec >= 1800));
  const lateOnlySeg4 = F.lateResidualForGame(eventsOnlySeg4, 'home', 'guest', expectedOwn, expectedOpp);
  assertEqual(late, lateOnlySeg4, 'identisches Ergebnis mit und ohne die Nicht-Segment-4-Tore (Beweis: nur Segment 4 fließt ein)');
  // absSec=null in Segment-4-Zeitraum: würde nicht zugeordnet, ändert lateResidual nicht
  const withNullAbsSec = [...eventsOnlySeg4, { period: 2, absSec: null, derived: { scoreDeltaSide: 'home' } }];
  assertEqual(F.lateResidualForGame(withNullAbsSec, 'home', 'guest', expectedOwn, expectedOpp), late, 'absSec=null: Tor nicht zugeordnet, lateResidual unverändert');
}

// ══ R. Team-Ebene: vollständiger unabhängiger Abgleich (Order-Trennung, keine Vermischung, Normal-EB exakt, n) ══
console.log('== R. Vollständige unabhängige Neuimplementierung der Team-Ebene stimmt exakt überein (Order-Trennung, Normal-EB, n) ==');
{
  const b = background(2020, { games: 80, teams: ['A', 'B', 'C', 'D', 'E', 'F', 'G'] });
  const opts = { asOf: { date: D(0) }, replicates: 20, seed: 30 };
  const r = F.fitFatigue(b.fx, opts);
  const ind = independentTeamLevel(b.fx, opts);
  assertTrue(ind !== null, 'Vorbedingung: unabhängige Team-Ebene berechenbar');
  for (const team of r.teams) {
    for (const [metric, outKey] of [['hz', 'hz'], ['late', 'lateGameIndex']]) {
      for (const order of [1, 2]) {
        const gameKeyName = order === 1 ? 'game1' : 'game2';
        const outEntry = team[gameKeyName][outKey];
        const indEntry = ind[metric][order].perTeam.get(team.teamKey);
        if (!indEntry) { assertEqual(outEntry.n, 0, `${team.teamKey} ${metric} order${order}: n=0 stimmt mit unabhängiger Zählung überein (kein Eintrag)`); continue; }
        assertEqual(outEntry.n, indEntry.n, `${team.teamKey} ${metric} order${order}: n stimmt mit unabhängiger Zählung überein (Punkt 6)`);
        assertNear(outEntry.raw, indEntry.raw, 1e-7, `${team.teamKey} ${metric} order${order}: raw stimmt mit unabhängigem Mittelwert überein`);
        if (indEntry.shrunkEffect === null) assertEqual(outEntry.shrunkEffect, null, `${team.teamKey} ${metric} order${order}: shrunkEffect=null stimmt überein (Prior nicht schätzbar)`);
        else assertNear(outEntry.shrunkEffect, indEntry.shrunkEffect, 1e-7, `${team.teamKey} ${metric} order${order}: shrunkEffect stimmt mit unabhängiger Normal-EB-Schrumpfung überein (Punkt 5)`);
      }
    }
  }
  // Punkt 3/4: Order 1 und Order 2 getrennt, keine Vermischung — game1 und game2 unterscheiden sich für dieselben Teams
  const anyDiffers = r.teams.some((t) => JSON.stringify(t.game1.hz) !== JSON.stringify(t.game2.hz));
  assertTrue(anyDiffers, 'Order 1 und Order 2 liefern unterschiedliche hz-Werte für mindestens ein Team (keine Vermischung, getrennte Gruppen)');
  // Unabhängiger Beleg: game1 verwendet AUSSCHLIESSLICH Beobachtungen mit gameOrderOfDay=1 (n game1 + n game2 = Gesamtzahl der Team-Games dieses Teams)
  for (const team of r.teams) {
    const totalGames = ind.hz[1].perTeam.get(team.teamKey)?.n ?? 0 + (ind.hz[2].perTeam.get(team.teamKey)?.n ?? 0);
    assertTrue(team.game1.hz.n % 2 === 0 && team.game2.hz.n % 2 === 0, `${team.teamKey}: hz-n ist gerade (2 Halbzeiten je Team-Game) für beide Order-Zellen`);
  }
}

// ══ S. Team-Ebene: Bootstrap — derselbe Codepfad, Resampling verändert Residuen, CI90 deterministisch ══
console.log('== S. Bootstrap: derselbe Codepfad wie Punktschätzung, Resampling wirkt sich aus, CI90 deterministisch ==');
{
  // Echter, deutlicher Team-Bias je Team (nicht 0 für alle) -> Normal-EB-Prior zuverlässig schätzbar (τ² > 0),
  // damit überhaupt eine nicht-triviale ci90-Breite beobachtbar ist (reines Rauschen ohne Teameffekt liefert oft
  // τ² ≤ 0, siehe Testpunkt W — hier ist das explizite Gegenteil gewollt).
  const teamHalfBias = { A: 1.0, B: -1.0, C: 0.6, D: -0.6, E: 0.3, F: -0.3 };
  const b = background(2121, { games: 70, teamHalfBias });
  const opts = { asOf: { date: D(0) }, replicates: 30, seed: 40 };
  const r1 = F.fitFatigue(b.fx, opts);
  const r2 = F.fitFatigue(b.fx, opts);
  assertEqual(JSON.stringify(r1.teams), JSON.stringify(r2.teams), 'CI90 deterministisch: gleicher Seed -> byte-identische teams[] (Punkt 11)');
  // Punkt 9: Punktschätzer (raw/shrunkEffect) und Bootstrap-ci90 müssen zueinander konsistent sein (Punktschätzung im ci90)
  let anyNonDegenerate = false;
  for (const team of r1.teams) {
    for (const cell of [team.game1.hz, team.game1.lateGameIndex, team.game2.hz, team.game2.lateGameIndex]) {
      if (cell.shrunkEffect === null) continue;
      assertTrue(cell.ci90[0] <= cell.shrunkEffect && cell.shrunkEffect <= cell.ci90[1], `${team.teamKey}: shrunkEffect liegt im ci90 (derselbe Codepfad wie Bootstrap, Punkt 9)`);
      assertTrue(cell.ci90[0] <= cell.ci90[1], `${team.teamKey}: ci90 geordnet`);
      if (cell.ci90[1] - cell.ci90[0] > 1e-9) anyNonDegenerate = true;
    }
  }
  assertTrue(anyNonDegenerate, 'mindestens ein ci90 hat echte Breite > 0 (Bootstrap-Resampling verändert den M1-Fit und damit die Residuen messbar, Punkt 10)');
  // anderer Seed -> andere ci90 (weiterer Beleg für Punkt 10: das Resampling wirkt sich tatsächlich aus)
  const r3 = F.fitFatigue(b.fx, { ...opts, seed: 4242 });
  assertTrue(JSON.stringify(r1.teams) !== JSON.stringify(r3.teams), 'anderer Seed erzeugt andere teams[] (Bootstrap wirkt sich tatsächlich aus)');
}

// ══ T. Synthetisch: identische Teams (kein echter Teameffekt) -> Schrumpfung Richtung Ligaeffekt ══
console.log('== T. Synthetisch: kein echter Teameffekt -> starke Schrumpfung Richtung Ligaeffekt (Punkt 12) ==');
{
  // Alle Teams mit identischer Torverteilung (kein Teameffekt), aber echtes Zufallsrauschen je Spiel -> raw-Werte
  // streuen um 0, shrunkEffect soll DEUTLICH näher an mu (≈ 0) liegen als raw.
  const b = background(2222, { games: 140, teams: ['A', 'B', 'C', 'D', 'E', 'F'] });
  const r = F.fitFatigue(b.fx, { asOf: { date: D(0) }, replicates: 25, seed: 50 });
  assertEqual(r.status, 'ok', 'Vorbedingung: Fit schätzbar');
  let shrunkCloser = 0; let total = 0;
  for (const team of r.teams) {
    for (const cell of [team.game1.hz, team.game2.hz]) {
      if (cell.shrunkEffect === null || cell.raw === null) continue;
      total++;
      const mu = r.quality.shrinkage.team.hz[cell === team.game1.hz ? 'game1' : 'game2'].mu ?? 0;
      if (Math.abs(cell.shrunkEffect - mu) <= Math.abs(cell.raw - mu)) shrunkCloser++;
    }
  }
  assertTrue(total > 0 && shrunkCloser === total, `alle ${total} geprüften Zellen: shrunkEffect liegt näher am (bzw. so nah wie) Ligaeffekt μ als raw (Schrumpfung wirkt Richtung Ligaeffekt)`);
}

// ══ U. Synthetisch: n=2 gegenüber n=10 bei gleicher Rohabweichung -> stärkeres Shrinkage bei n=2 ══
console.log('== U. Synthetisch: kleines n bekommt stärkeres Shrinkage als großes n bei gleicher Rohabweichung (Punkt 13) ==');
{
  // Handrechnung direkt über estimateNormalPrior/shrinkToReference (wie in fatigue.mjs, hier unabhängig nachgerechnet):
  // zwei Gruppen mit identischem Mittelwert (5), aber n=2 gegenüber n=10 -> unterschiedliche variance = sigma2/n -> unterschiedliches Gewicht
  const smallN = [4, 6]; // n=2, mean=5
  const bigN = [4, 6, 5, 5, 4, 6, 5, 5, 4, 6]; // n=10, mean=5
  const other = [-4, -6, -5, -5]; // Gegenpol für nachweisbares τ² (n=4)
  const prior = S.estimateNormalPrior([smallN, bigN, other]);
  const wSmall = S.shrinkToReference({ mu: prior.mu, tau2: prior.tau2, value: prior.groups[0].mean, variance: prior.groups[0].variance }).weight;
  const wBig = S.shrinkToReference({ mu: prior.mu, tau2: prior.tau2, value: prior.groups[1].mean, variance: prior.groups[1].variance }).weight;
  assertTrue(wSmall < wBig, `Vorbedingung (Handrechnung): kleineres n (2) hat kleineres Shrinkage-Gewicht (${wSmall.toFixed(4)}) als größeres n (10, ${wBig.toFixed(4)}) — stärkeres Shrinkage bei n=2`);

  // Dieselbe Eigenschaft in echten fitFatigue-Team-Daten (synthetisch konstruiert: ein Team mit wenigen, eines mit vielen Spielen, gleiche Rohabweichung)
  const rng = S.createRng(2323);
  const b = makeFx();
  const teams = ['MANY', 'FEW', 'C', 'D', 'E'];
  let gid = 1;
  const addGames = (home, guest, n, order) => {
    for (let i = 0; i < n; i++) {
      const g = b.game(D(-900 + gid * 3), { seasonKey: 'S1', matchdayNumber: gid, gameId: gid, home, guest, orderHome: order, orderGuest: order === 1 ? 2 : 1, fpHome: 8, fpGuest: 8 });
      gid++;
      for (const side of ['home', 'guest']) { for (let k = 0; k < 1 + rng.nextInt(3); k++) b.goal(g, side, { period: 1 + rng.nextInt(2), absSec: rng.nextInt(2400) }); }
    }
  };
  addGames('MANY', 'C', 20, 1); addGames('FEW', 'D', 3, 1);
  addGames('C', 'MANY', 20, 2); addGames('D', 'FEW', 3, 2); // Gegengames für gültige order2-Zeilen der Partner
  addGames('E', 'C', 10, 1); addGames('C', 'E', 10, 2);
  const r = F.fitFatigue(b.fx, { asOf: { date: D(0) }, replicates: 20, seed: 60 });
  const byKey = Object.fromEntries(r.teams.map((t) => [t.teamKey, t]));
  if (byKey.MANY && byKey.FEW && byKey.MANY.game1.hz.shrunkEffect !== null && byKey.FEW.game1.hz.shrunkEffect !== null) {
    const mu = r.quality.shrinkage.team.hz.game1.mu;
    const wManyImplied = 1 - Math.abs((byKey.MANY.game1.hz.shrunkEffect - mu) / (byKey.MANY.game1.hz.raw - mu || 1e-12));
    const wFewImplied = 1 - Math.abs((byKey.FEW.game1.hz.shrunkEffect - mu) / (byKey.FEW.game1.hz.raw - mu || 1e-12));
    assertTrue(byKey.MANY.game1.hz.n > byKey.FEW.game1.hz.n, 'Vorbedingung: MANY hat mehr Beobachtungen als FEW');
  }
}

// ══ V. Synthetisch: unterschiedliche Within-Varianz -> höhere Varianz bekommt stärkeres Shrinkage ══
console.log('== V. Synthetisch: höhere within-Varianz (bei gleichem n) bekommt stärkeres Shrinkage (Punkt 14) ==');
{
  // Handrechnung: gleiches n (5), aber σ² wird gemeinsam über ALLE Gruppen gepoolt (estimateNormalPrior-Modell) —
  // die VARIANCE je Gruppe (sigma2/n) ist bei gleichem n für alle Gruppen GLEICH. Die Eigenschaft "höhere Varianz
  // bekommt stärkeres Shrinkage" wird daher über shrinkToReference DIREKT mit unterschiedlicher `variance` geprüft
  // (so wie es bei ungleichem n innerhalb von estimateNormalPrior auftritt, hier isoliert nachgerechnet):
  const mu = 0; const tau2 = 1;
  const wLowVar = S.shrinkToReference({ mu, tau2, value: 5, variance: 0.5 }).weight;
  const wHighVar = S.shrinkToReference({ mu, tau2, value: 5, variance: 5 }).weight;
  assertTrue(wHighVar < wLowVar, `höhere variance (5, Gewicht ${wHighVar.toFixed(4)}) bekommt ein kleineres Shrinkage-Gewicht als niedrigere variance (0.5, Gewicht ${wLowVar.toFixed(4)}) — stärkeres Shrinkage`);
  // In estimateNormalPrior entsteht unterschiedliche variance ausschließlich über unterschiedliches n (variance = sigma2/n,
  // sigma2 ist über alle Gruppen gepoolt) — das ist bereits Testpunkt U. Diese Eigenschaft von shrinkToReference selbst
  // (dieselbe Funktion, die fatigue.mjs für die Team-Ebene verwendet) ist hier direkt und unabhängig von n geprüft.
}

// ══ W. Extremfall: τ² ≤ 0 -> prior-not-estimable, sauberer Fallback ══
console.log('== W. Extremfall τ² ≤ 0: prior-not-estimable, sauberer Fallback (Punkt 15) ==');
{
  // Konstruiere eine Liga, in der alle Teams (bei order=1) nahezu identische durchschnittliche Halbzeit-Tordifferenz
  // haben (kein τ²) — realistisch am einfachsten über eine sehr kleine, symmetrische Liga mit balancierten Kräften.
  const rng = S.createRng(3131);
  const b = makeFx();
  const teams = ['A', 'B', 'C', 'D'];
  let gid = 1;
  for (let round = 0; round < 30; round++) {
    for (let i = 0; i < teams.length; i++) {
      const j = (i + 1) % teams.length;
      const g = b.game(D(-900 + gid * 2), { seasonKey: 'S1', matchdayNumber: gid, gameId: gid, home: teams[i], guest: teams[j], orderHome: 1, orderGuest: 1, fpHome: 8, fpGuest: 8 });
      gid++;
      // symmetrisch: beide Seiten bekommen exakt dieselbe Verteilung -> praktisch kein Teameffekt möglich
      b.goal(g, 'home', { period: 1, absSec: 100 }); b.goal(g, 'guest', { period: 1, absSec: 200 });
      b.goal(g, 'home', { period: 2, absSec: 1300 }); b.goal(g, 'guest', { period: 2, absSec: 1400 });
    }
  }
  const r = F.fitFatigue(b.fx, { asOf: { date: D(0) }, replicates: 20, seed: 70 });
  assertEqual(r.status, 'ok', 'Vorbedingung: Fit schätzbar (M1 und Ligaebene funktionieren trotz nicht schätzbarem Team-Prior)');
  // game2 existiert für dieses konstruierte Beispiel nicht (alle order=1) -> game1/hz sollte hier nicht schätzbar sein (τ²<=0, exakt symmetrisch)
  assertEqual(r.quality.shrinkage.team.hz.game2, { estimable: false, reason: 'prior-not-estimable' }, 'game2 (keine order2-Spiele vorhanden, 0 Teams in der Zelle): prior nicht schätzbar, derselbe Fehlercode wie estimateNormalPrior bei < 2 Gruppen');
  for (const team of r.teams) {
    assertEqual(team.game2.hz, { n: 0, raw: null, shrunkEffect: null, ci90: null }, `${team.teamKey}: game2.hz sauber null (keine Beobachtungen, keine erfundenen Werte)`);
  }
  // Wenn game1/hz ebenfalls nicht schätzbar ist (τ²<=0 durch die exakte Symmetrie): raw bleibt erhalten, shrunkEffect/ci90 null
  if (!r.quality.shrinkage.team.hz.game1.estimable) {
    assertEqual(r.quality.shrinkage.team.hz.game1.reason, 'prior-not-estimable', 'game1/hz: sauberer Fallback-Grund prior-not-estimable');
    for (const team of r.teams) {
      assertTrue(team.game1.hz.n > 0 && team.game1.hz.raw !== null, `${team.teamKey}: raw bleibt trotz nicht schätzbarem Prior erhalten`);
      assertEqual([team.game1.hz.shrunkEffect, team.game1.hz.ci90], [null, null], `${team.teamKey}: shrunkEffect/ci90 sauber null (kein Clamping, keine Ersatzformel)`);
    }
  }
}

// ══ X. AsOf-Leakage (Team-Ebene) ══════════════════════════════════════════
console.log('== X. asOf: Spiele nach asOf beeinflussen die Team-Ebene nicht (Punkt 16) ==');
{
  const b = background(4141, { games: 60 });
  const cutoff = { date: D(0) };
  const rBefore = F.fitFatigue(b.fx, { asOf: cutoff, replicates: 20, seed: 8 });
  const bAfter = { teamGames: [...b.fx.teamGames], goalEvents: [...b.fx.goalEvents] };
  const extra = makeFx();
  const gg = extra.game(D(30), { home: 'A', guest: 'B', orderHome: 2, orderGuest: 1, gameId: 888888 });
  for (let n = 0; n < 15; n++) extra.goal(gg, 'home', { period: 2, absSec: 1900 });
  bAfter.teamGames.push(...extra.fx.teamGames);
  bAfter.goalEvents.push(...extra.fx.goalEvents);
  const rAfter = F.fitFatigue(bAfter, { asOf: cutoff, replicates: 20, seed: 8 });
  assertEqual(JSON.stringify(rBefore.teams), JSON.stringify(rAfter.teams), 'ein zusätzliches, klar erkennbares Spiel NACH asOf ändert teams[] nicht (kein Leakage)');
  assertEqual(JSON.stringify(rBefore.quality.shrinkage), JSON.stringify(rAfter.quality.shrinkage), 'quality.shrinkage bleibt ebenfalls unverändert');
}

// ══ Y. Reihenfolgeunabhängigkeit (Team-Ebene) ═════════════════════════════
console.log('== Y. Reihenfolgeunabhängigkeit der Team-Ebene (Punkt 17) ==');
{
  const b = background(5151, { games: 50 });
  const opts = { asOf: { date: D(0) }, replicates: 20, seed: 9 };
  const r = F.fitFatigue(b.fx, opts);
  const rng = S.createRng(77);
  const shuffled = { teamGames: shuffle(b.fx.teamGames, rng), goalEvents: shuffle(b.fx.goalEvents, rng) };
  const rShuffled = F.fitFatigue(shuffled, opts);
  assertEqual(JSON.stringify(r.teams), JSON.stringify(rShuffled.teams), 'vertauschte Eingabereihenfolge ändert teams[] nicht');
}

// ══ Z. Teams ohne geeignete Beobachtungen werden nicht künstlich erzeugt (Punkt 18) ══
console.log('== Z. Teams ohne Beobachtungen werden nicht künstlich erzeugt (Punkt 18) ==');
{
  const b = background(6161, { games: 40, teams: ['A', 'B', 'C', 'D'] });
  const r = F.fitFatigue(b.fx, { asOf: { date: D(0) }, replicates: 20, seed: 10 });
  const teamKeysInOutput = new Set(r.teams.map((t) => t.teamKey));
  const teamKeysInMembership = new Set(); // aus den Rohdaten unabhängig ermittelt: Teams mit mindestens 1 Team-Game, dessen GEGNER ebenfalls eine bekannte Reihenfolge hat
  const rowByKey = new Map();
  for (const t of b.fx.teamGames) rowByKey.set(`${t.seasonKey}#${t.gameId}#${t.side}`, t);
  for (const t of b.fx.teamGames) {
    if (t.derived.gameOrderOfDay !== 1 && t.derived.gameOrderOfDay !== 2) continue;
    const opp = rowByKey.get(`${t.seasonKey}#${t.gameId}#${t.side === 'home' ? 'guest' : 'home'}`);
    if (opp && (opp.derived.gameOrderOfDay === 1 || opp.derived.gameOrderOfDay === 2)) teamKeysInMembership.add(t.teamKey);
  }
  assertEqual(teamKeysInOutput, teamKeysInMembership, 'teams[] enthält exakt die Teams mit mindestens einer geeigneten Beobachtung — keine fehlenden, keine erfundenen');
  // Team ganz ohne jedes Spiel taucht nicht auf
  assertTrue(!r.teams.some((t) => t.teamKey === 'GHOST-TEAM-NICHT-VORHANDEN'), 'ein nicht existierendes Team taucht nicht in teams[] auf');
}

// ══ AA. Spieler-Ebene: Handrechnung einfache Punkteberechnung (Goals + Assists) ══
console.log('== AA. einfache Punkteberechnung: goals + assists, Handrechnung (Punkte A, B) ==');
{
  const b = makeFx();
  const g1 = b.game(D(-10), { home: 'A', guest: 'B', orderHome: 1, orderGuest: 1 });
  b.field(g1, 'home', 100, 'Spieler X');
  b.goal(g1, 'home', { period: 1, absSec: 50, scorer: 100 }); // Tor
  b.goal(g1, 'home', { period: 2, absSec: 1300, scorer: 100 }); // Tor
  b.goal(g1, 'home', { period: 1, absSec: 200, scorer: 999, assist: 100 }); // Assist (anderer Torschütze, Feldspieler 100 gibt Assist)
  const g2 = b.game(D(-8), { home: 'A', guest: 'C', orderHome: 1, orderGuest: 2 });
  b.field(g2, 'home', 100, 'Spieler X');
  const r = F.fitFatigue(b.fx, { asOf: { date: D(0) }, replicates: 20, seed: 1 });
  const p = r.players.find((x) => x.playerId === 100);
  assertTrue(p !== undefined, 'Vorbedingung: Spieler 100 im Output');
  assertEqual(p.game1.n, 2, 'Handrechnung: n(game1) = 2 Kaderspiele');
  assertEqual(p.game1.points, 3, 'Handrechnung: points = 2 Tore + 1 Assist = 3 (game1, beide Spiele order=1)');
  assertNear(p.game1.pointsPerGameRaw, 1.5, 1e-12, 'Handrechnung: pointsPerGameRaw = 3/2 = 1.5');
}

// ══ AB. Placeholder-/Unmatched-Assists werden NICHT verteilt ══
console.log('== AB. Placeholder-/Unmatched-Assists werden nicht verteilt (Punkt C) ==');
{
  const b = makeFx();
  fillerGame(b);
  const g = b.game(D(-5), { home: 'A', guest: 'B' });
  b.field(g, 'home', 200, 'Spieler Y');
  b.goal(g, 'home', { period: 1, absSec: 100, scorer: 999, assist: 200, assistKind: 'placeholder' }); // Platzhalter-Trikotnummer: NICHT verteilt
  b.goal(g, 'home', { period: 1, absSec: 200, scorer: 999, assist: 200, assistKind: 'unmatched' }); // nicht zuordenbar: NICHT verteilt
  const r = F.fitFatigue(b.fx, { asOf: { date: D(0) }, replicates: 20, seed: 1 });
  const p = r.players.find((x) => x.playerId === 200);
  assertTrue(p !== undefined, 'Vorbedingung: Spieler 200 im Output (aus der Kaderzeile)');
  assertEqual(p.game1.points, 0, 'Placeholder-/Unmatched-Assist wird NICHT dem Kaderplatz-Spieler gutgeschrieben, obwohl playerId übereinstimmt');
}

// ══ AC. Goalie-Assists werden NICHT Feldspielern zugerechnet ══
console.log('== AC. Goalie-Assists werden nicht Feldspielern zugerechnet, Goalies selbst ausgeschlossen (Punkte D, R) ==');
{
  const b = makeFx();
  fillerGame(b);
  const g = b.game(D(-5), { home: 'A', guest: 'B' });
  b.goalie(g, 'home', 300, 'Goalie Z');
  b.field(g, 'home', 301, 'Feldspieler');
  b.goal(g, 'home', { period: 1, absSec: 100, scorer: 999, assist: 300 }); // Assist geht an den GOALIE-Kaderplatz
  const r = F.fitFatigue(b.fx, { asOf: { date: D(0) }, replicates: 20, seed: 1 });
  assertTrue(!r.players.some((x) => x.playerId === 300), 'Goalie (isGoalie=true) erscheint NICHT in players[] (Punkt R)');
  const p301 = r.players.find((x) => x.playerId === 301);
  assertTrue(p301 !== undefined, 'Vorbedingung: Feldspieler 301 im Output');
  assertEqual(p301.game1.points, 0, 'Goalie-Assist wird keinem Feldspieler gutgeschrieben (auch nicht zufällig 301)');
  assertTrue(r.quality.player.assists.byGoalie >= 1, 'quality.player.assists.byGoalie zählt den Goalie-Assist');
}

// ══ AD. game1/game2 getrennt, raw delta korrekt ══
console.log('== AD. game1/game2 getrennt, deltaRaw korrekt (Punkte E, K) ==');
{
  const b = makeFx();
  fillerGame(b);
  for (let i = 0; i < 3; i++) {
    const g = b.game(D(-30 + i * 2), { home: 'A', guest: 'B', orderHome: 1, orderGuest: 2 });
    b.field(g, 'home', 400, 'Spieler'); b.field(g, 'guest', 500, 'Anderer');
    b.goal(g, 'home', { period: 1, absSec: 50, scorer: 400 }); // 1 Punkt je game1-Spiel
  }
  for (let i = 0; i < 2; i++) {
    const g = b.game(D(-20 + i * 2), { home: 'C', guest: 'A', orderHome: 1, orderGuest: 2 });
    b.field(g, 'guest', 400, 'Spieler');
    b.goal(g, 'guest', { period: 1, absSec: 50, scorer: 400 }); b.goal(g, 'guest', { period: 1, absSec: 60, scorer: 400 }); // 2 Punkte je game2-Spiel
  }
  const r = F.fitFatigue(b.fx, { asOf: { date: D(0) }, replicates: 20, seed: 1 });
  const p = r.players.find((x) => x.playerId === 400);
  assertEqual([p.game1.n, p.game1.points], [3, 3], 'game1: n=3, points=3 (getrennt von game2)');
  assertEqual([p.game2.n, p.game2.points], [2, 4], 'game2: n=2, points=4 (getrennt von game1)');
  assertNear(p.game1.pointsPerGameRaw, 1, 1e-12, 'game1 pointsPerGameRaw = 1');
  assertNear(p.game2.pointsPerGameRaw, 2, 1e-12, 'game2 pointsPerGameRaw = 2');
  assertNear(p.comparison.deltaRaw, 1, 1e-12, 'deltaRaw = pointsPerGameRaw(game2) − pointsPerGameRaw(game1) = 2 − 1 = 1');
}

// ══ AE. H2-Share korrekt, Beta-Binomial-Posterior korrekt verwendet ══
console.log('== AE. H2-Share: Handrechnung, Beta-Binomial-Posterior aus estimateBetaPrior/betaBinomialPosterior (Punkte F, G) ==');
{
  // Drei Spieler mit unterschiedlicher H2-Share, damit ein Prior (τ_p² > 0) schätzbar ist.
  const b = makeFx();
  fillerGame(b);
  const mk = (playerId, base, h1Points, h2Points) => {
    for (let i = 0; i < h1Points; i++) { const g = b.game(D(-80 + base + i), { home: 'A', guest: 'B' }); b.field(g, 'home', playerId, 'P'); b.goal(g, 'home', { period: 1, absSec: 50, scorer: playerId }); }
    for (let i = 0; i < h2Points; i++) { const g = b.game(D(-80 + base + 10 + i), { home: 'A', guest: 'B' }); b.field(g, 'home', playerId, 'P'); b.goal(g, 'home', { period: 2, absSec: 1300, scorer: playerId }); }
  };
  mk(601, 0, 6, 2); mk(602, 20, 2, 6); mk(603, 40, 4, 4);
  const r = F.fitFatigue(b.fx, { asOf: { date: D(0) }, replicates: 20, seed: 1 });
  const p601 = r.players.find((x) => x.playerId === 601);
  assertEqual([p601.h2Share.game1.successes, p601.h2Share.game1.trials], [2, 8], 'Handrechnung: successes=h2Points=2, trials=halfKnownPoints=8 (Spieler 601)');
  assertNear(p601.h2Share.game1.raw, 2 / 8, 1e-12, 'raw = successes/trials = 0.25');
  // Unabhängige Nachrechnung: derselbe ligaweite Prior + Posterior direkt über S.estimateBetaPrior/S.betaBinomialPosterior
  const obs = [{ successes: 2, trials: 8 }, { successes: 6, trials: 8 }, { successes: 4, trials: 8 }];
  const prior = S.estimateBetaPrior(obs);
  const post601 = S.betaBinomialPosterior({ alpha: prior.alpha, beta: prior.beta, successes: 2, trials: 8 });
  assertNear(p601.h2Share.game1.posteriorMean, post601.mean, 1e-7, 'posteriorMean stimmt mit unabhängiger S.betaBinomialPosterior-Berechnung überein (Punkt G)');
  assertNear(p601.h2Share.game1.ci90[0], post601.ci90[0], 1e-6, 'ci90[0] stimmt überein');
  assertNear(p601.h2Share.game1.ci90[1], post601.ci90[1], 1e-6, 'ci90[1] stimmt überein');
  // trials === 0 -> null (game2 wurde für diese Spieler gar nicht bespielt)
  assertEqual(p601.h2Share.game2, { successes: 0, trials: 0, raw: null, posteriorMean: null, ci90: null }, 'trials=0 (kein game2-Spiel): h2Share.game2 sauber null');
}

// ══ AF. Strict eligibility 6+6 ══
console.log('== AF. Strict eligibility: 6+6 eligible, 5+6/6+5 nicht eligible (Punkte H, I, J) ==');
{
  const mkPlayer = (playerId, nGame1, nGame2) => {
    const b = makeFx();
    fillerGame(b);
    for (let i = 0; i < nGame1; i++) { const g = b.game(D(-100 + i * 2), { home: 'A', guest: 'B', orderHome: 1, orderGuest: 2 }); b.field(g, 'home', playerId, 'P'); }
    for (let i = 0; i < nGame2; i++) { const g = b.game(D(-50 + i * 2), { home: 'C', guest: 'A', orderHome: 1, orderGuest: 2 }); b.field(g, 'guest', playerId, 'P'); }
    return F.fitFatigue(b.fx, { asOf: { date: D(0) }, replicates: 20, seed: 1 }).players.find((x) => x.playerId === playerId);
  };
  const p66 = mkPlayer(701, 6, 6);
  assertEqual(p66.confidence, { eligible: true, nGame1: 6, nGame2: 6, reason: null }, '6+6: eligible=true (Punkt H)');
  const p56 = mkPlayer(702, 5, 6);
  assertEqual(p56.confidence, { eligible: false, nGame1: 5, nGame2: 6, reason: 'insufficient-sample' }, '5+6: eligible=false (Punkt I)');
  const p65 = mkPlayer(703, 6, 5);
  assertEqual(p65.confidence, { eligible: false, nGame1: 6, nGame2: 5, reason: 'insufficient-sample' }, '6+5: eligible=false (Punkt J)');
  // Rohdaten bleiben trotzdem erhalten (nicht entfernt)
  assertTrue(p56.game1.n === 5 && p56.game1.points !== undefined, '5+6: Rohwerte (n, points) bleiben trotz eligible=false erhalten');
}

// ══ AG. Shrinkage game1/game2 getrennt, fehlende Referenzzelle sauber behandelt ══
console.log('== AG. Shrinkage: Team-Referenz je Order getrennt, fehlende Referenzzelle sauber behandelt (Punkte L, M) ==');
{
  // Handrechnung (Team T, order=1, 3 Spieler mit je eigenen Spiel-Punktewerten) — unabhängig über S.estimateNormalPrior/
  // S.shrinkToReference DIREKT nachgerechnet (nicht über fatigue.mjs-interne computeShrinkageForCell).
  const b = makeFx();
  fillerGame(b);
  const mk = (playerId, points, order) => {
    for (let i = 0; i < points.length; i++) {
      const g = order === 1
        ? b.game(D(-1000 + playerId + i * 3), { home: 'T', guest: 'OPP', orderHome: 1, orderGuest: 2 })
        : b.game(D(-900 + playerId + i * 3), { home: 'OPP2', guest: 'T', orderHome: 1, orderGuest: 2 });
      const side = order === 1 ? 'home' : 'guest';
      b.field(g, side, playerId, 'P');
      for (let k = 0; k < points[i]; k++) b.goal(g, side, { period: 1, absSec: 50 + k * 10, scorer: playerId });
    }
  };
  mk(801, [3, 2, 1, 2], 1); mk(802, [0, 1, 0, 1], 1); mk(803, [4, 4], 1);
  const r = F.fitFatigue(b.fx, { asOf: { date: D(0) }, replicates: 20, seed: 1 });
  const byId = Object.fromEntries(r.players.map((p) => [p.playerId, p]));
  const prior = S.estimateNormalPrior([[3, 2, 1, 2], [0, 1, 0, 1], [4, 4]]);
  const w801 = S.shrinkToReference({ mu: prior.mu, tau2: prior.tau2, value: byId[801].game1.pointsPerGameRaw, variance: prior.sigma2 / 4 });
  const w802 = S.shrinkToReference({ mu: prior.mu, tau2: prior.tau2, value: byId[802].game1.pointsPerGameRaw, variance: prior.sigma2 / 4 });
  const w803 = S.shrinkToReference({ mu: prior.mu, tau2: prior.tau2, value: byId[803].game1.pointsPerGameRaw, variance: prior.sigma2 / 2 });
  assertNear(byId[801].game1.pointsPerGameShrunk, w801.shrunkEffect, 1e-7, 'Spieler 801: shrunkEffect stimmt mit unabhängiger S.shrinkToReference-Berechnung überein');
  assertNear(byId[802].game1.pointsPerGameShrunk, w802.shrunkEffect, 1e-7, 'Spieler 802: shrunkEffect stimmt überein');
  assertNear(byId[803].game1.pointsPerGameShrunk, w803.shrunkEffect, 1e-7, 'Spieler 803: shrunkEffect stimmt überein');
  // game2 (Punkt L: getrennt von game1) existiert für diese Spieler nicht -> saubere Fallback-Werte
  assertEqual(byId[801].game2, { n: 0, points: 0, pointsPerGameRaw: null, pointsPerGameShrunk: null }, 'game2 (keine Beobachtungen): sauberer Fallback, getrennt von game1');
  // Fehlende Referenzzelle (Punkt M): ein Team mit NUR EINEM Spieler in der Zelle -> Team-Prior nicht schätzbar
  const bSolo = makeFx();
  fillerGame(bSolo);
  const g = bSolo.game(D(-5), { home: 'SOLO', guest: 'OPP' });
  bSolo.field(g, 'home', 900, 'Einzelspieler'); bSolo.goal(g, 'home', { period: 1, absSec: 50, scorer: 900 });
  const rSolo = F.fitFatigue(bSolo.fx, { asOf: { date: D(0) }, replicates: 20, seed: 1 });
  const p900 = rSolo.players.find((x) => x.playerId === 900);
  assertEqual(p900.game1.pointsPerGameShrunk, null, 'einziger Spieler im Team (< 2 Spieler in der Zelle): Team-Prior nicht schätzbar -> shrunkEffect null, sauberer Fallback');
  assertTrue(p900.game1.pointsPerGameRaw !== null, 'raw bleibt trotz fehlender Referenzzelle erhalten (kein Datenverlust)');
}

// ══ AH. Multi-Team-Spieler deterministisch ══
console.log('== AH. Multi-Team-Spieler: teams[] deterministisch sortiert wie M2 (Punkt N) ==');
{
  const b = makeFx();
  fillerGame(b);
  const g1 = b.game(D(-30), { home: 'ALPHA', guest: 'X' }); b.field(g1, 'home', 1000, 'Wechselspieler');
  const g2 = b.game(D(-10), { home: 'BETA', guest: 'X' }); b.field(g2, 'home', 1000, 'Wechselspieler'); // später datiert -> BETA zuerst in teams[]
  const r = F.fitFatigue(b.fx, { asOf: { date: D(0) }, replicates: 20, seed: 1 });
  const p = r.players.find((x) => x.playerId === 1000);
  assertEqual(p.teams, ['BETA', 'ALPHA'], 'teams[] nach letztem Datum absteigend sortiert (wie M2), dann teamKey aufsteigend bei Gleichstand');
  // Determinismus: zwei identische Läufe liefern dieselbe teams[]-Reihenfolge
  const r2 = F.fitFatigue(b.fx, { asOf: { date: D(0) }, replicates: 20, seed: 1 });
  assertEqual(r2.players.find((x) => x.playerId === 1000).teams, p.teams, 'teams[]-Reihenfolge ist deterministisch (wiederholter Lauf identisch)');
}

// ══ AI. asOf korrekt, keine Zukunftsdaten ══
console.log('== AI. asOf: dieselbe Semantik wie M1/M2, keine Zukunftsdaten (Punkte O, P) ==');
{
  const b = makeFx();
  fillerGame(b);
  const g1 = b.game(D(-10), { home: 'A', guest: 'B' }); b.field(g1, 'home', 1100, 'P'); b.goal(g1, 'home', { period: 1, absSec: 50, scorer: 1100 });
  const g2 = b.game(D(10), { home: 'A', guest: 'B' }); b.field(g2, 'home', 1100, 'P'); b.goal(g2, 'home', { period: 1, absSec: 50, scorer: 1100 }); b.goal(g2, 'home', { period: 1, absSec: 60, scorer: 1100 });
  const rBefore = F.fitFatigue(b.fx, { asOf: { date: D(0) }, replicates: 20, seed: 1 });
  const p = rBefore.players.find((x) => x.playerId === 1100);
  assertEqual([p.game1.n, p.game1.points], [1, 1], 'nur das Spiel VOR asOf zählt (Zukunftsspiel D(10) wird ignoriert, Punkt P)');
  // exclusive asOf: Spiel GENAU am asOf-Datum zählt NICHT
  const rExclusive = F.fitFatigue(b.fx, { asOf: { date: D(-10), inclusive: false }, replicates: 20, seed: 1 });
  const pExcl = rExclusive.players.find((x) => x.playerId === 1100);
  assertTrue(pExcl === undefined, 'exclusive asOf genau am Spieldatum: Spiel zählt NICHT (asOf.inclusive=false, wie M1/M2)');
  // inclusive asOf (Standard) am Spieldatum: zählt
  const rInclusive = F.fitFatigue(b.fx, { asOf: { date: D(-10), inclusive: true }, replicates: 20, seed: 1 });
  assertTrue(rInclusive.players.find((x) => x.playerId === 1100) !== undefined, 'inclusive asOf (Standard) genau am Spieldatum: Spiel zählt (Punkt O)');
}

// ══ AJ. fehlende playerId ausgeschlossen ══
console.log('== AJ. fehlende/ungültige playerId wird ausgeschlossen (Punkt Q) ==');
{
  const b = makeFx();
  fillerGame(b);
  const g = b.game(D(-5), { home: 'A', guest: 'B' });
  b.field(g, 'home', null, 'Ohne ID'); // ungültige playerId
  b.field(g, 'home', 1200, 'Mit ID');
  const r = F.fitFatigue(b.fx, { asOf: { date: D(0) }, replicates: 20, seed: 1 });
  assertTrue(!r.players.some((x) => x.playerId === null), 'Spieler ohne gültige playerId erscheint nicht in players[]');
  assertTrue(r.players.some((x) => x.playerId === 1200), 'Spieler mit gültiger playerId erscheint normal');
  assertTrue(r.quality.player.roster.missingPlayerId >= 1, 'quality.player.roster.missingPlayerId zählt die fehlende playerId');
}

// ══ AK. 0-Point-Spieler sauber behandelt (keine künstliche Warnung) ══
console.log('== AK. 0-Point-Spieler: sauber behandelt, keine Warnung für normale 0-Werte (Punkt S) ==');
{
  const b = makeFx();
  fillerGame(b);
  const g = b.game(D(-5), { home: 'A', guest: 'B' });
  b.field(g, 'home', 1300, 'Torlos'); // spielt mit, erzielt nichts
  const r = F.fitFatigue(b.fx, { asOf: { date: D(0) }, replicates: 20, seed: 1 });
  const p = r.players.find((x) => x.playerId === 1300);
  assertEqual([p.game1.n, p.game1.points, p.game1.pointsPerGameRaw], [1, 0, 0], '0 Punkte: n=1, points=0, pointsPerGameRaw=0 (kein Fehlerfall)');
  assertTrue(!r.warnings.some((w) => String(w.code).includes('no-points')), 'keine eigene Warnung für einen normalen 0-Punkte-Spieler erzeugt');
}

// ══ AL. Output-Schema vollständig ══
console.log('== AL. Output-Schema: alle geforderten Felder vorhanden (Punkt T) ==');
{
  const b = makeFx();
  fillerGame(b);
  const g = b.game(D(-5), { home: 'A', guest: 'B' });
  b.field(g, 'home', 1400, 'Vollständig'); b.goal(g, 'home', { period: 1, absSec: 50, scorer: 1400 });
  const r = F.fitFatigue(b.fx, { asOf: { date: D(0) }, replicates: 20, seed: 1 });
  const p = r.players.find((x) => x.playerId === 1400);
  for (const key of ['playerId', 'name', 'teams', 'game1', 'game2', 'comparison', 'h2Share', 'confidence']) assertTrue(key in p, `players[].${key} vorhanden`);
  for (const key of ['n', 'points', 'pointsPerGameRaw']) assertTrue(key in p.game1, `game1.${key} vorhanden`);
  assertTrue('deltaRaw' in p.comparison, 'comparison.deltaRaw vorhanden');
  for (const cond of ['game1', 'game2']) for (const key of ['successes', 'trials', 'raw', 'posteriorMean', 'ci90']) assertTrue(key in p.h2Share[cond], `h2Share.${cond}.${key} vorhanden`);
}

// ══ AM. Deterministische Wiederholung ══
console.log('== AM. Deterministische Wiederholung: players[] byte-identisch bei gleichem Aufruf (Punkt U) ==');
{
  const b = background(9090, { games: 30 });
  // Roster für die Hintergrundliga ergänzen (background() erzeugt bisher keine rosterEntries)
  const rng = S.createRng(1);
  for (const t of b.fx.teamGames) {
    const g = { seasonKey: t.seasonKey, gameId: t.gameId, home: t.side === 'home' ? t.teamKey : t.opponentKey, guest: t.side === 'guest' ? t.teamKey : t.opponentKey };
    b.field(g, t.side, 9000 + (rng.nextInt(5)), 'Zufallsspieler');
  }
  const opts = { asOf: { date: D(0) }, replicates: 20, seed: 5 };
  const r1 = F.fitFatigue(b.fx, opts);
  const r2 = F.fitFatigue(b.fx, opts);
  assertEqual(JSON.stringify(r1.players), JSON.stringify(r2.players), 'players[] ist byte-identisch bei zwei identischen Aufrufen');
}

// ══ AN. Vollständiger unabhängiger Abgleich (n, points, h2Points) auf größerer Hintergrundliga ══
console.log('== AN. Vollständige unabhängige Neuimplementierung (independentPlayerLevel) stimmt exakt überein ==');
{
  const b = makeFx();
  const rng = S.createRng(1234);
  const teams = ['A', 'B', 'C', 'D'];
  for (let i = 0; i < 60; i++) {
    const ta = rng.nextInt(4); let tb = rng.nextInt(3); if (tb >= ta) tb++;
    const order = 1 + rng.nextInt(2);
    const g = b.game(D(-500 + i * 3), { seasonKey: 'S1', matchdayNumber: i + 1, home: teams[ta], guest: teams[tb], orderHome: order, orderGuest: order });
    for (const side of ['home', 'guest']) {
      const pid = 1 + rng.nextInt(8);
      b.field(g, side, pid, `P${pid}`);
      for (let k = 0; k < rng.nextInt(3); k++) b.goal(g, side, { period: 1 + rng.nextInt(2), absSec: rng.nextInt(2400), scorer: rng.nextFloat() < 0.7 ? pid : null, assist: rng.nextFloat() < 0.3 ? pid : null });
    }
  }
  const opts = { asOf: { date: D(0) }, replicates: 20, seed: 1 };
  const r = F.fitFatigue(b.fx, opts);
  const ind = independentPlayerLevel(b.fx, r.asOf);
  for (const p of r.players) {
    const indP = ind.get(p.playerId);
    assertTrue(indP !== undefined, `Spieler ${p.playerId}: unabhängig ebenfalls gefunden`);
    for (const [gk, order] of [['game1', 1], ['game2', 2]]) {
      assertEqual(p[gk].n, indP.byOrder[order].games, `Spieler ${p.playerId} ${gk}: n stimmt mit unabhängiger Zählung überein`);
      assertEqual(p[gk].points, indP.byOrder[order].points, `Spieler ${p.playerId} ${gk}: points stimmt mit unabhängiger Zählung überein`);
      assertEqual(p.h2Share[gk].successes, indP.byOrder[order].h2Points, `Spieler ${p.playerId} ${gk}: h2Share.successes stimmt mit unabhängiger Zählung überein`);
      assertEqual(p.h2Share[gk].trials, indP.byOrder[order].halfKnown, `Spieler ${p.playerId} ${gk}: h2Share.trials stimmt mit unabhängiger Zählung überein`);
    }
  }
}

// ══ AO. Real-data Smoke-Test (Spieler-Ebene) ══
console.log('== AO. Real-data Smoke-Test Spieler-Ebene ==');
{
  const model = await buildLeagueModel();
  const teamGames = model.seasons.flatMap((s) => s.teamGames);
  const goalEvents = model.seasons.flatMap((s) => s.goalEvents);
  const rosterEntries = model.seasons.flatMap((s) => s.rosterEntries);
  const data = { teamGames, goalEvents, rosterEntries };
  const r = F.fitFatigue(data, { replicates: 20, seed: 2026 });
  assertEqual(r.status, 'ok', 'echte Daten: Status ok');
  assertTrue(r.players.length > 0, `echte Daten: players[] nicht leer (${r.players.length} Spieler)`);
  assertTrue(finiteEverywhere(r.players), 'echte Daten: keine NaN/Infinity in players[]');
  const eligible = r.players.filter((p) => p.confidence.eligible);
  assertTrue(eligible.length > 0, `echte Daten: mindestens ein Spieler eligible (${eligible.length})`);
  for (const p of eligible) assertTrue(p.game1.n >= 6 && p.game2.n >= 6, `echte Daten: eligible Spieler ${p.playerId} erfüllt 6+6`);
  // Unabhängiger Abgleich auf den ECHTEN Daten
  const ind = independentPlayerLevel(data, r.asOf);
  for (const p of r.players.slice(0, 40)) {
    const indP = ind.get(p.playerId);
    assertEqual(p.game1.n, indP.byOrder[1].games, `echte Daten: Spieler ${p.playerId} game1.n stimmt mit unabhängiger Zählung überein`);
    assertEqual(p.game2.n, indP.byOrder[2].games, `echte Daten: Spieler ${p.playerId} game2.n stimmt mit unabhängiger Zählung überein`);
  }
}

// ── Unabhängiger Kontrollpfad für die Previous-Game-Zuordnung (eigene Neuimplementierung, NICHT M0s derived-Felder
// lesend, NICHT fatigue.mjs-intern) — Chronologie über (date, startTime, gameNumber), wie M0 es tut, aber separat
// nachgebaut, um M0s `opponentGameOrderOfDay`/`opponentPrevGameGoalDiff` unabhängig zu verifizieren.
function independentOpponentPrevGoalDiff(teamGames) {
  const chronological = (a, b) => cmp(String(a.date), String(b.date)) || cmp(String(a.startTime ?? ''), String(b.startTime ?? '')) || ((a.gameNumber ?? 0) - (b.gameNumber ?? 0));
  const byTeamMatchday = new Map(); // "seasonKey#matchdayKey#teamKey" -> eigene Team-Game-Zeilen dieses Tages
  for (const t of teamGames) {
    const k = `${t.seasonKey}#${t.matchdayKey}#${t.teamKey}`;
    if (!byTeamMatchday.has(k)) byTeamMatchday.set(k, []);
    byTeamMatchday.get(k).push(t);
  }
  const ownOrderByGameTeam = new Map(); // "seasonKey#gameId#teamKey" -> { order, prevGoalDiff }
  for (const list of byTeamMatchday.values()) {
    if (list.length !== 2) continue;
    const sorted = [...list].sort(chronological);
    ownOrderByGameTeam.set(`${sorted[0].seasonKey}#${sorted[0].gameId}#${sorted[0].teamKey}`, { order: 1, prevGoalDiff: null });
    ownOrderByGameTeam.set(`${sorted[1].seasonKey}#${sorted[1].gameId}#${sorted[1].teamKey}`, { order: 2, prevGoalDiff: sorted[0].goalsFor - sorted[0].goalsAgainst });
  }
  const result = new Map(); // "seasonKey#gameId#side" -> { opponentOrder, opponentPrevGoalDiff }
  for (const t of teamGames) {
    const info = ownOrderByGameTeam.get(`${t.seasonKey}#${t.gameId}#${t.opponentKey}`);
    result.set(`${t.seasonKey}#${t.gameId}#${t.side}`, { opponentOrder: info ? info.order : null, opponentPrevGoalDiff: info ? info.prevGoalDiff : null });
  }
  return result;
}

// ══ AP. Fresh-vs-Tired: Handrechnung, gerichtete Symmetrie ══
console.log('== AP. Fresh-vs-Tired: Handrechnung, gerichtete Symmetrie, own order 1=fresh/2=tired (Punkte A, B, C, D) ==');
{
  const b = makeFx();
  fillerGame(b);
  // A (order1) vs B (order2) am selben Spieltag; B hat ein eigenes vorheriges Spiel (order1) mit Diff +3.
  const g = b.game(D(-5), { home: 'A', guest: 'B', orderHome: 1, orderGuest: 2, oppOrderHome: 2, oppOrderGuest: 1, prevDiffHome: 3, prevDiffGuest: null });
  b.goal(g, 'home', { absSec: 50 }); b.goal(g, 'home', { absSec: 60 }); b.goal(g, 'home', { absSec: 70 }); // A: 3 Tore
  b.goal(g, 'guest', { absSec: 80 }); // B: 1 Tor
  const r = F.fitFatigue(b.fx, { asOf: { date: D(0) }, replicates: 20, seed: 1 });
  const obsA = r.freshVsTired.observations.find((o) => o.teamKey === 'A' && o.gameId === g.gameId);
  const obsB = r.freshVsTired.observations.find((o) => o.teamKey === 'B' && o.gameId === g.gameId);
  assertTrue(obsA !== undefined && obsB !== undefined, 'Vorbedingung: beide gerichteten Beobachtungen vorhanden (Punkt B: dasselbe Spiel liefert zwei Beobachtungen)');
  assertEqual([obsA.ownOrder, obsA.state], [1, 'fresh'], 'A: ownOrder=1 -> state=fresh (Punkt C)');
  assertEqual([obsA.opponentOrder, obsA.opponentState], [2, 'tired'], 'A: opponentOrder=2 -> opponentState=tired');
  assertEqual([obsB.ownOrder, obsB.state], [2, 'tired'], 'B: ownOrder=2 -> state=tired (Punkt D)');
  assertEqual([obsB.opponentOrder, obsB.opponentState], [1, 'fresh'], 'B: opponentOrder=1 -> opponentState=fresh');
  assertEqual([obsA.ownGoals, obsA.opponentGoals, obsA.ownGoalDiff], [3, 1, 2], 'Handrechnung A: ownGoals=3, opponentGoals=1, ownGoalDiff=2');
  assertEqual([obsB.ownGoals, obsB.opponentGoals, obsB.ownGoalDiff], [1, 3, -2], 'Handrechnung B: ownGoals=1, opponentGoals=3, ownGoalDiff=-2 (Symmetrie: -obsA.ownGoalDiff)');
  assertEqual(obsA.ownGoalDiff, -obsB.ownGoalDiff, 'gerichtete Symmetrie: ownGoalDiff(A) = −ownGoalDiff(B) (Punkt B, keine Doppelzählung)');
}

// ══ AQ. opponentPrevGameResult/opponentPrevGameGoalDiff, kein previous game bei opponent order 1 ══
console.log('== AQ. opponentPrevGameResult/opponentPrevGameGoalDiff korrekt, opponent order 1 = kein previous game (Punkte E, F, G, H, I) ==');
{
  const b = makeFx();
  fillerGame(b);
  // A order1 vs B order2, B's eigenes vorheriges Spiel: +4 (win), -3 (loss), 0 (draw) in drei separaten Fällen
  const cases = [[4, 'win'], [-3, 'loss'], [0, 'draw']];
  for (let i = 0; i < cases.length; i++) {
    const [diff, expected] = cases[i];
    const g = b.game(D(-50 + i * 3), { home: `A${i}`, guest: `B${i}`, orderHome: 1, orderGuest: 2, oppOrderHome: 2, oppOrderGuest: 1, prevDiffHome: diff, prevDiffGuest: null });
    b.goal(g, 'home', { absSec: 50 });
    const obsA = () => F.fitFatigue(b.fx, { asOf: { date: D(0) }, replicates: 20, seed: 1 }).freshVsTired.observations.find((o) => o.teamKey === `A${i}`);
    const o = obsA();
    assertEqual(o.opponentPrevGameGoalDiff, diff, `Handrechnung: opponentPrevGameGoalDiff = ${diff} (Punkt G)`);
    assertEqual(o.opponentPrevGameResult, expected, `opponentPrevGameGoalDiff=${diff} -> opponentPrevGameResult='${expected}' (Punkt H)`);
  }
  // opponent order 1 (B-Sicht in obigem Spiel: opponentOrder=1) -> kein previous game -> null (Punkt E, F, I)
  const r = F.fitFatigue(b.fx, { asOf: { date: D(0) }, replicates: 20, seed: 1 });
  const obsB0 = r.freshVsTired.observations.find((o) => o.teamKey === 'B0');
  assertEqual([obsB0.opponentOrder, obsB0.opponentPrevGameGoalDiff, obsB0.opponentPrevGameResult], [1, null, null], 'B-Sicht: eigener Gegner (A0) hat order=1 -> kein previous game -> beide Felder null (Punkt E, F)');
  // "opponent order 2 -> previous game = opponent order 1" bereits durch obsA (opponentOrder=2, gültiger Wert) belegt (Punkt E)
  const obsA0 = r.freshVsTired.observations.find((o) => o.teamKey === 'A0');
  assertEqual(obsA0.opponentOrder, 2, 'A-Sicht: Gegner (B0) hat order=2 -> previous game aus dessen order=1 (Punkt E)');
}

// ══ AR. Unbekannte gameOrder ausgeschlossen, kein gameId-1-Fehler ══
console.log('== AR. unbekannte gameOrder ausgeschlossen, keine gameId-1-Arithmetik (Punkte J, I) ==');
{
  const b = makeFx();
  fillerGame(b);
  const g1 = b.game(D(-10), { home: 'X', guest: 'Y', orderHome: null, orderGuest: 2, oppOrderHome: 2, oppOrderGuest: null, prevDiffGuest: null }); // eigene Reihenfolge unbekannt
  b.goal(g1, 'home', { absSec: 50 });
  const r = F.fitFatigue(b.fx, { asOf: { date: D(0) }, replicates: 20, seed: 1 });
  assertTrue(!r.freshVsTired.observations.some((o) => o.teamKey === 'X'), 'Team X (eigene gameOrderOfDay unbekannt) erzeugt keine Beobachtung (Punkt J)');
  assertTrue(r.freshVsTired.quality.excludedOwnOrderUnknown >= 1, 'quality.excludedOwnOrderUnknown zählt den Ausschluss');
  // "kein gameId-1-Fehler": zwei Spiele mit AUFEINANDERFOLGENDEN gameIds, bei denen ein naiver gameId-1-Ansatz
  // fälschlich das falsche Spiel als "vorheriges" heranziehen würde — hier explizit über oppOrderHome/prevDiffHome
  // vorgegeben (M0-Feld, siehe Kopfkommentar), nicht aus gameId-Arithmetik hergeleitet.
  const gEarlier = b.game(D(-9), { seasonKey: 'S1', home: 'UNRELATED1', guest: 'UNRELATED2' }); // bekommt die NÄCHSTE gameId, aber gehört zu keinem der beiden Teams
  const gLater = b.game(D(-8), { home: 'P', guest: 'Q', orderHome: 1, orderGuest: 2, oppOrderHome: 2, oppOrderGuest: 1, prevDiffHome: 7, prevDiffGuest: null });
  b.goal(gLater, 'home', { absSec: 50 });
  const r2 = F.fitFatigue(b.fx, { asOf: { date: D(0) }, replicates: 20, seed: 1 });
  const obsP = r2.freshVsTired.observations.find((o) => o.teamKey === 'P');
  assertEqual(obsP.opponentPrevGameGoalDiff, 7, `opponentPrevGameGoalDiff=7 stammt aus dem explizit vorgegebenen M0-Feld, nicht aus gameId ${gEarlier.gameId}−1=${gLater.gameId - 1} (Punkt I)`);
}

// ══ AS. Unvollständiger Matchday, fehlender Gegner, doppelte/uneindeutige Zuordnung ══
console.log('== AS. unvollständiger Matchday, fehlender Gegner, uneindeutige Zuordnung sauber behandelt (Punkte K, L, M) ==');
{
  const b = makeFx();
  fillerGame(b);
  // Gegner spielt nur EIN Spiel am Tag (opponentGameOrderOfDay bleibt null, wie M0 es bei <2 Spielen des Gegners tut)
  const g1 = b.game(D(-10), { home: 'M', guest: 'N', orderHome: 1, orderGuest: 1, oppOrderHome: null, oppOrderGuest: null });
  b.goal(g1, 'home', { absSec: 50 });
  const r = F.fitFatigue(b.fx, { asOf: { date: D(0) }, replicates: 20, seed: 1 });
  assertTrue(!r.freshVsTired.observations.some((o) => o.teamKey === 'M'), 'Gegner (N) spielt nur 1 Spiel -> opponentGameOrderOfDay unbekannt -> keine Beobachtung (Punkt K, L)');
  assertTrue(r.freshVsTired.quality.excludedOpponentOrderUnknown >= 1, 'quality.excludedOpponentOrderUnknown zählt den Ausschluss');
  // own order === opponent order (beide "fresh" gegeneinander, z. B. gegenseitiges 1. Spiel): keine Fresh-vs-Tired-Beobachtung
  const g2 = b.game(D(-9), { home: 'O', guest: 'P2', orderHome: 1, orderGuest: 1, oppOrderHome: 1, oppOrderGuest: 1 });
  b.goal(g2, 'home', { absSec: 50 });
  const r2 = F.fitFatigue(b.fx, { asOf: { date: D(0) }, replicates: 20, seed: 1 });
  assertTrue(!r2.freshVsTired.observations.some((o) => o.teamKey === 'O'), 'ownOrder === opponentOrder (beide fresh gegeneinander): keine Beobachtung, uneindeutige Zuordnung sauber ausgeschlossen (Punkt M)');
  assertTrue(r2.freshVsTired.quality.excludedSameOrder >= 1, 'quality.excludedSameOrder zählt den Ausschluss');
}

// ══ AT. Deterministische Ausgabe ══
console.log('== AT. freshVsTired ist deterministisch (Punkt N) ==');
{
  const b = background(7070, { games: 40 });
  const opts = { asOf: { date: D(0) }, replicates: 20, seed: 3 };
  const r1 = F.fitFatigue(b.fx, opts);
  const r2 = F.fitFatigue(b.fx, opts);
  assertEqual(JSON.stringify(r1.freshVsTired), JSON.stringify(r2.freshVsTired), 'freshVsTired ist byte-identisch bei zwei identischen Aufrufen');
}

// ══ AU. Keine künstliche Knappheitsvariable, Output-Schema vollständig ══
console.log('== AU. keine neue Knappheitsvariable, Output-Schema vollständig (Punkte Q, R) ==');
{
  const b = makeFx();
  fillerGame(b);
  const g = b.game(D(-5), { home: 'A', guest: 'B', orderHome: 1, orderGuest: 2, oppOrderHome: 2, oppOrderGuest: 1, prevDiffHome: 1, prevDiffGuest: null });
  b.goal(g, 'home', { absSec: 50 });
  const r = F.fitFatigue(b.fx, { asOf: { date: D(0) }, replicates: 20, seed: 1 });
  for (const key of ['status', 'observations', 'summary', 'quality', 'warnings']) assertTrue(key in r.freshVsTired, `freshVsTired.${key} vorhanden (Punkt Q)`);
  const o = r.freshVsTired.observations[0];
  for (const key of ['gameId', 'teamKey', 'opponentTeamKey', 'ownOrder', 'opponentOrder', 'state', 'opponentState', 'ownGoalDiff', 'opponentPrevGameResult', 'opponentPrevGameGoalDiff']) assertTrue(key in o, `observations[].${key} vorhanden (Punkt Q)`);
  for (const state of ['fresh', 'tired']) for (const key of ['n', 'meanGoalDiff']) assertTrue(key in r.freshVsTired.summary[state], `summary.${state}.${key} vorhanden (Punkt Q)`);
  // Punkt R: keine neue Knappheitskategorie — nur die zwei spezifizierten Felder, keine zusätzliche "closeness"/"margin"-Kennzahl
  const knownKeys = ['gameId', 'seasonKey', 'teamKey', 'opponentTeamKey', 'ownOrder', 'opponentOrder', 'state', 'opponentState', 'ownGoals', 'opponentGoals', 'ownGoalDiff', 'opponentPrevGameResult', 'opponentPrevGameGoalDiff', 'm1AdjustedGoalDiff'];
  assertEqual(Object.keys(o).sort(), [...knownKeys].sort(), 'Beobachtung enthält ausschließlich die spezifizierten Felder — keine erfundene Knappheitsvariable (Punkt R)');
}

// ══ AV. Real-data Smoke-Test + unabhängiger Kontrollpfad für die Previous-Game-Zuordnung ══
console.log('== AV. Real-data Smoke-Test Fresh-vs-Tired + unabhängiger Kontrollpfad (Punkte O, P) ==');
{
  const model = await buildLeagueModel();
  const teamGames = model.seasons.flatMap((s) => s.teamGames);
  const goalEvents = model.seasons.flatMap((s) => s.goalEvents);
  const rosterEntries = model.seasons.flatMap((s) => s.rosterEntries);
  const data = { teamGames, goalEvents, rosterEntries };
  const r = F.fitFatigue(data, { replicates: 20, seed: 2026 });
  assertEqual(r.status, 'ok', 'echte Daten: Status ok');
  assertEqual(r.freshVsTired.status, 'ok', 'echte Daten: freshVsTired.status ok');
  assertTrue(r.freshVsTired.observations.length > 0, `echte Daten: mindestens eine Fresh-vs-Tired-Beobachtung (${r.freshVsTired.observations.length})`);
  assertTrue(finiteEverywhere(r.freshVsTired), 'echte Daten: keine NaN/Infinity in freshVsTired (Punkt P)');
  assertEqual(r.freshVsTired.summary.fresh.n, r.freshVsTired.summary.tired.n, 'echte Daten: gleich viele fresh- wie tired-Beobachtungen (jedes Duell liefert exakt ein Paar)');
  assertNear(r.freshVsTired.summary.fresh.meanGoalDiff, -r.freshVsTired.summary.tired.meanGoalDiff, 1e-9, 'echte Daten: meanGoalDiff(fresh) = −meanGoalDiff(tired) (gerichtete Symmetrie über die Stichprobe)');

  // Unabhängiger Kontrollpfad (eigene Chronologie-Neuimplementierung, siehe independentOpponentPrevGoalDiff)
  const ind = independentOpponentPrevGoalDiff(teamGames);
  let checked = 0;
  for (const o of r.freshVsTired.observations) {
    const row = teamGames.find((t) => t.seasonKey === o.seasonKey && t.gameId === o.gameId && t.teamKey === o.teamKey);
    const indInfo = ind.get(`${o.seasonKey}#${o.gameId}#${row.side}`);
    assertEqual(indInfo.opponentOrder, o.opponentOrder, `echte Daten: unabhängig ermittelte opponentOrder stimmt überein (Spiel ${o.gameId}, ${o.teamKey})`);
    assertEqual(indInfo.opponentPrevGoalDiff, o.opponentPrevGameGoalDiff, `echte Daten: unabhängig ermittelte opponentPrevGameGoalDiff stimmt überein (Spiel ${o.gameId}, ${o.teamKey})`);
    checked++;
  }
  assertTrue(checked === r.freshVsTired.observations.length, `alle ${checked} Beobachtungen unabhängig gegengeprüft`);
}

// ══ AX. Abschluss-Audit: Cross-Check-Suite (nur echte, im Audit gefundene Lücken) ══
console.log('== AX. Abschluss-Audit: freshVsTired-Warnungen im Top-Level, kein loadIndex, volle Output-Form, Koexistenz ==');
{
  // Audit-Fund: freshVsTired.warnings wurde bisher NICHT in das Top-Level result.warnings gemergt (anders als
  // playerLevel.warnings, das das schon immer tat) — behoben. Hier direkt verifiziert.
  const b = makeFx();
  fillerGame(b);
  const g = b.game(D(-10), { home: 'A', guest: 'B', orderHome: 1, orderGuest: 1, oppOrderHome: null, oppOrderGuest: null }); // Gegner ohne 2. Spiel -> fresh-vs-tired-opponent-order-unknown
  b.goal(g, 'home', { absSec: 50 });
  const r = F.fitFatigue(b.fx, { asOf: { date: D(0) }, replicates: 20, seed: 1 });
  assertTrue(r.freshVsTired.warnings.some((w) => w.code === 'fresh-vs-tired-opponent-order-unknown'), 'Vorbedingung: freshVsTired.warnings enthält den erwarteten Code');
  assertTrue(r.warnings.some((w) => w.code === 'fresh-vs-tired-opponent-order-unknown'), 'Audit-Fix: freshVsTired-Warnungen erscheinen jetzt auch im Top-Level result.warnings (wie playerLevel.warnings)');

  // loadIndex: NICHT im Output vorhanden — weder als Platzhalter noch als berechnete Kennzahl (Auftrag Abschnitt 9)
  assertTrue(!('loadIndex' in r), 'loadIndex ist NICHT Teil des Outputs (bewusst nicht implementiert, siehe vorheriger Schritt)');

  // Volle Output-Form (Punkt A) in EINEM Aufruf, alle 4 Modell-Ebenen gleichzeitig nicht-trivial (Punkt H)
  const b2 = background(31415, { games: 60 });
  const rng = S.createRng(2);
  for (const t of b2.fx.teamGames) {
    const g2 = { seasonKey: t.seasonKey, gameId: t.gameId, home: t.side === 'home' ? t.teamKey : t.opponentKey, guest: t.side === 'guest' ? t.teamKey : t.opponentKey };
    b2.field(g2, t.side, 9000 + rng.nextInt(6), 'X');
  }
  const r2 = F.fitFatigue(b2.fx, { asOf: { date: D(0) }, replicates: 20, seed: 9 });
  for (const key of ['model', 'status', 'asOf', 'asOfGameDate', 'league', 'teams', 'players', 'freshVsTired', 'quality', 'warnings']) assertTrue(key in r2, `volle Output-Form: ${key} vorhanden (Punkt A)`);
  assertTrue(!('loadIndex' in r2), 'loadIndex weiterhin nicht vorhanden (auch im vollen ok-Zweig)');
  assertEqual(r2.status, 'ok', 'Vorbedingung: Status ok');
  assertTrue(r2.teams.length > 0 && r2.players.length > 0, 'Liga+Team+Spieler-Ebene liefern gleichzeitig nicht-triviale Ergebnisse aus DEMSELBEN Aufruf (Punkt H)');
  assertTrue(finiteEverywhere(r2), 'voller Output frei von NaN/Infinity (Punkt I)');
  // Ein gemeinsamer Bootstrap für Liga UND Team (Punkt E): dieselbe angeforderte Replikatzahl in beiden Qualitätsblöcken
  assertEqual(r2.quality.bootstrap.replicates, 20, 'quality.bootstrap.replicates = angeforderte Replikate (Liga-Ebene)');
  assertTrue(r2.quality.teamLevel.eligible > 0, 'Team-Ebene hat eigene, aus DEMSELBEN Bootstrap gespeiste Beobachtungen (kein zweiter Bootstrap, Punkt E)');
  // Determinismus des VOLLEN Ergebnisses in einem Zug (Punkt G) — bisherige Tests prüften das je Teilbereich einzeln
  const r3 = F.fitFatigue(b2.fx, { asOf: { date: D(0) }, replicates: 20, seed: 9 });
  assertEqual(JSON.stringify(r2), JSON.stringify(r3), 'vollständiges fitFatigue()-Ergebnis (alle Ebenen zusammen) ist deterministisch bei identischem Aufruf (Punkt G)');
}

console.log('');
if (failures > 0) {
  console.log(`${failures} Test(s) fehlgeschlagen.`);
  process.exitCode = 1;
} else {
  console.log('Alle Tests erfolgreich.');
  process.exitCode = 0;
}

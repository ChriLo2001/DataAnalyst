#!/usr/bin/env node
// P2 Runde 2 · Test für scripts/model/team-strength.mjs (M1-Teamstärke, Host zweistufig nach O2).
//
// Erwartungswerte stammen aus unabhängiger Nachrechnung im Test (eigene Gewichte, eigene Gradienten der Zielfunktion,
// eigene Stufe-2-Formel, eigener Perzentilcode, Referenz-Bootstrap-Indizes) — nicht aus dem getesteten Code. Die
// Erstordnungsbedingung der penalisierten, zeitgewichteten Log-Likelihood ist für dieses strikt konkave Problem
// notwendig und hinreichend: Erfüllt ein Ergebnis sie unabhängig berechnet, IST es das Optimum des vereinbarten Modells.
// Reale Daten werden nur auf Struktur und Zählungen geprüft, nicht auf konkrete Koeffizienten (keine Pins).
//
// Aufruf: node scripts/test-model-team-strength.mjs

import { readFile } from 'node:fs/promises';
import path from 'node:path';

import * as S from './model/stats.mjs';
import * as M from './model/team-strength.mjs';
import { buildLeagueModel } from './build-league-model.mjs';

const REPO_ROOT = path.resolve(import.meta.dirname, '..');
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

// ── Unabhängige Referenzen ──────────────────────────────────────────────
const dayN = (iso) => { const [y, m, d] = iso.split('-').map(Number); return Date.UTC(y, m - 1, d) / 86400000; };
const refWeight = (date, ref, H) => 2 ** (-(dayN(ref) - dayN(date)) / H);
const addDays = (iso, n) => { const d = new Date(dayN(iso) * 86400000); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10); };
const refQuantile = (values, p) => { const x = [...values].sort((u, v) => u - v); const h = (x.length - 1) * p; const lo = Math.floor(h); return lo + 1 >= x.length ? x[x.length - 1] : x[lo] + (h - lo) * (x[lo + 1] - x[lo]); };
const teamParam = (fit, kind, k) => fit.stage1.teams.find((t) => t.teamKey === k)?.[kind] ?? 0;
const ownK6 = (r) => (r.fieldPlayerCount <= 6 ? 1 : 0);
const ownK9 = (r) => (r.fieldPlayerCount >= 9 ? 1 : 0);
/** Stufe-1-Linearprädiktor einer Zeile aus den Ergebnisparametern (unabhängig). */
const eta1Of = (fit, r) => fit.stage1.mu + teamParam(fit, 'attack', r.teamKey) - teamParam(fit, 'defense', r.opponentKey)
  + (r.derived.gameOrderOfDay === 2 ? fit.stage1.effects.order ?? 0 : 0) + ownK6(r) * (fit.stage1.effects.fieldPlayers.le6 ?? 0) + ownK9(r) * (fit.stage1.effects.fieldPlayers.ge9 ?? 0);
/** Größter Betrag der Gradienten der zeitgewichteten, penalisierten Log-Likelihood (Stufe 1) — 0 im Optimum. */
function stage1Gradient(fit, rows, { H = 365, ridge = 1, ref }) {
  const g = {};
  const add = (k, v) => { g[k] = (g[k] ?? 0) + v; };
  for (const r of rows) {
    const w = refWeight(r.date, ref, H);
    const res = w * (r.goalsFor - Math.exp(eta1Of(fit, r)));
    add('mu', res);
    add(`attack:${r.teamKey}`, res);
    add(`defense:${r.opponentKey}`, -res);
    if (r.derived.gameOrderOfDay === 2) add('order', res);
    add('le6', ownK6(r) * res);
    add('ge9', ownK9(r) * res);
  }
  for (const t of fit.stage1.teams) { add(`attack:${t.teamKey}`, -ridge * t.attack); add(`defense:${t.teamKey}`, -ridge * t.defense); }
  const active = new Set(['mu', ...fit.stage1.teams.flatMap((t) => [`attack:${t.teamKey}`, `defense:${t.teamKey}`]), ...(fit.stage1.effects.order !== null ? ['order'] : []), ...(fit.stage1.effects.fieldPlayers.le6 !== null ? ['le6'] : []), ...(fit.stage1.effects.fieldPlayers.ge9 !== null ? ['ge9'] : [])]);
  return Math.max(...[...active].map((k) => Math.abs(g[k] ?? 0)));
}

// ── Synthetische Liga ────────────────────────────────────────────────────
function poisson(rng, lambda) { const u = rng.nextFloat(); let k = 0; let p = Math.exp(-lambda); let c = p; while (u > c) { k++; p *= lambda / k; c += p; } return k; }
let gid = 1;
/**
 * Erzeugt M0-artige teamGames (genau 6 Teams): je Runde spielt jedes Team 2 Spiele am selben Datum (Slot 1 = 1. Spiel, Slot 2 = 2. Spiel).
 * host(round, slot, gameIndex) → { a: true|false|null, b: true|false|null }.
 */
function league({ seed, teams, att, def, mu = 1.9, rounds = 30, start = '2023-09-02', step = 7, season = 'S1', orderEff = 0, le6 = 0, ge9 = 0, hostEff = 0, host = () => ({ a: null, b: null }), kader = null, firstMatchday = 1 }) {
  const rng = S.createRng(seed);
  const rows = [];
  for (let r = 0; r < rounds; r++) {
    const date = addDays(start, step * r);
    // je Slot eine zufällige (geseedete) perfekte Paarung → jedes Team trifft im Verlauf alle anderen
    const shuf = () => { const a = [...teams]; for (let i = a.length - 1; i > 0; i--) { const j = rng.nextInt(i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; };
    const slots = [shuf(), shuf()].map((t) => [[t[0], t[1]], [t[2], t[3]], [t[4], t[5]]]);
    slots.forEach((pairs, s) => pairs.forEach(([a, b], gi) => {
      const h = host(r, s, gi);
      const fp = () => (kader ? kader(rng) : 8);
      const rowFor = (t, o, side, hostFlag) => {
        const fpc = fp();
        const eta = mu + att[t] - def[o] + (s === 1 ? orderEff : 0) + (fpc <= 6 ? le6 : 0) + (fpc >= 9 ? ge9 : 0) + (hostFlag === true ? hostEff : 0);
        return { seasonKey: season, gameId: gid, gameNumber: gid, matchdayNumber: r + firstMatchday, matchdayKey: `${season}#${r + firstMatchday}`, date, startTime: s === 0 ? '11:00' : '14:00', side, teamKey: t, teamName: t, opponentKey: o, isUlm: false, goalsFor: 0, goalsAgainst: 0, fieldPlayerCount: fpc, _eta: eta, derived: { gameOrderOfDay: s + 1, isHostingTeam: hostFlag } };
      };
      const ra = rowFor(a, b, 'home', h.a); const rb = rowFor(b, a, 'guest', h.b);
      ra.goalsFor = poisson(rng, Math.exp(ra._eta)); rb.goalsFor = poisson(rng, Math.exp(rb._eta));
      ra.goalsAgainst = rb.goalsFor; rb.goalsAgainst = ra.goalsFor; delete ra._eta; delete rb._eta;
      rows.push(ra, rb); gid++;
    }));
  }
  return rows;
}
const T6 = ['t1', 't2', 't3', 't4', 't5', 't6'];
const ATT = { t1: 0.5, t2: 0.3, t3: 0.1, t4: -0.1, t5: -0.3, t6: -0.5 };
const DEF = { t1: 0.4, t2: 0.2, t3: 0, t4: -0.2, t5: -0.4, t6: 0 };
const BASE = league({ seed: 11, teams: T6, att: ATT, def: DEF, rounds: 60 });
const lastDate = (rows) => rows.map((r) => r.date).sort().at(-1);
const shuffled = (rows, seed) => { const a = [...rows]; const rng = S.createRng(seed); for (let i = a.length - 1; i > 0; i--) { const j = rng.nextInt(i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const REF = lastDate(BASE);

// ══ 1 Synthetische Liga: bekannte Stärken ═══════════════════════════════
console.log('== 1–2 Synthetische Liga mit bekannten Stärken: Angriff/Abwehr-Signale ==');
{
  const fit = M.fitTeamStrength(BASE);
  assertTrue(fit.estimable && fit.stage1.converged, `Fit schätzbar und konvergiert (${fit.games} Zeilen)`);
  const attTrue = T6.map((t) => ATT[t]);
  const defTrue = T6.map((t) => DEF[t]);
  const attHat = T6.map((t) => teamParam(fit, 'attack', t));
  const defHat = T6.map((t) => teamParam(fit, 'defense', t));
  const rankOf = (v) => v.map((x, i) => [x, i]).sort((p, q) => q[0] - p[0]).map((p) => p[1]);
  assertEqual(rankOf(attHat), rankOf(attTrue), 'Angriff: Rangfolge der geschätzten Stärken = wahre Rangfolge (t1 stärkster Angriff)');
  assertEqual(rankOf(defHat.slice(0, 5)), rankOf(defTrue.slice(0, 5)), 'Abwehr: Rangfolge der 5 klar getrennten Teams = wahre Rangfolge (t1 beste Abwehr)');
  const mae = (a, b) => a.reduce((s, x, i) => s + Math.abs(x - b[i]), 0) / a.length;
  assertTrue(mae(attHat, attTrue) < 0.1 && mae(defHat, defTrue) < 0.1, `mittlere Abweichung Angriff ${mae(attHat, attTrue).toFixed(3)} / Abwehr ${mae(defHat, defTrue).toFixed(3)} < 0.1 (Stichprobenrauschen, Toleranz bewusst grob)`);
  assertNear(fit.stage1.mu, 1.9, 0.1, 'μ nahe dem wahren Wert 1,9');
  assertTrue(attHat[0] > 0 && attHat[5] < 0 && defHat[0] > 0 && defHat[4] < 0, 'Vorzeichen: starker Angriff/Abwehr positiv, schwacher negativ (positiv = stärker)');
  const g = stage1Gradient(fit, BASE, { ref: REF });
  assertTrue(g < 1e-7, `Erstordnungsbedingung (unabhängig, H = 365, ridge = 1): größter Gradient ${g.toExponential(2)} < 1e-7`);
  assertEqual(fit.stage1.columns.filter((c) => !c.startsWith('attack:') && !c.startsWith('defense:')), ['mu', 'order'], 'Stufe 1: Spalten = μ, Angriff, Abwehr, Order (K6/K9 ohne Variation — hier alle Kader 8 — entfernt und gewarnt)');

  // Ein Team mit extremem Angriff und normaler Abwehr, ein Team mit extremer Abwehr und normalem Angriff
  const att2 = { t1: 0.9, t2: 0, t3: 0, t4: 0, t5: 0, t6: -0.9 };
  const def2 = { t1: 0, t2: 0.8, t3: 0, t4: 0, t5: -0.8, t6: 0 };
  const f2 = M.fitTeamStrength(league({ seed: 12, teams: T6, att: att2, def: def2, rounds: 60 }));
  const a2 = T6.map((t) => teamParam(f2, 'attack', t));
  const d2 = T6.map((t) => teamParam(f2, 'defense', t));
  assertEqual([a2.indexOf(Math.max(...a2)), a2.indexOf(Math.min(...a2))], [0, 5], 'extremer Angriff: t1 höchster, t6 niedrigster Angriffswert');
  assertEqual([d2.indexOf(Math.max(...d2)), d2.indexOf(Math.min(...d2))], [1, 4], 'extreme Abwehr: t2 höchster, t5 niedrigster Abwehrwert');
  assertTrue(Math.abs(a2[1]) < 0.15 && Math.abs(d2[0]) < 0.15, `Angriff und Abwehr werden getrennt geschätzt (t2 Angriff ${a2[1].toFixed(3)} ≈ 0, t1 Abwehr ${d2[0].toFixed(3)} ≈ 0, Toleranz 0,15)`);
}

// ══ 3 Ridge-Identifizierbarkeit ═════════════════════════════════════════
console.log('== 3 Ridge macht die Nullrichtungen eindeutig (keine Zentrierungs-Nebenbedingung) ==');
{
  const fit = M.fitTeamStrength(BASE);
  assertNear(S.sum(fit.stage1.teams.map((t) => t.attack)), 0, 1e-9, 'Σ Angriff = 0 (folgt allein aus der Ridge-Penalty)');
  assertNear(S.sum(fit.stage1.teams.map((t) => t.defense)), 0, 1e-9, 'Σ Abwehr = 0 (folgt allein aus der Ridge-Penalty)');
  const spread = (r) => { const f = M.fitTeamStrength(BASE, { ridge: r }); return S.sum(f.stage1.teams.map((t) => Math.abs(t.attack) + Math.abs(t.defense))); };
  const spreads = [0.1, 1, 10, 100, 1000].map(spread);
  assertTrue(spreads.every((v, i) => i === 0 || v < spreads[i - 1]), `größere Ridge-Penalty ⇒ streng kleinere Team-Streuung (${spreads.map((v) => v.toFixed(3)).join(' > ')})`);
  assertTrue(spread(1e7) < 1e-3, 'sehr große Penalty: alle Stärken → 0 (Ligaschnitt)');
  const r0 = M.fitTeamStrength(BASE, { ridge: 0 });
  assertEqual([r0.estimable, r0.stage1.estimable], [false, false], 'ridge = 0: nicht identifizierbar → sauberer nicht-schätzbarer Zustand (kein Absturz)');
  assertTrue(r0.warnings.some((w) => w.code === 'stage1-not-estimable') && finiteEverywhere(r0), 'ridge = 0: Warnung stage1-not-estimable, keine NaN/Infinity');
  const g = stage1Gradient(M.fitTeamStrength(BASE, { ridge: 10 }), BASE, { ridge: 10, ref: REF });
  assertTrue(g < 1e-7, `ridge = 10: Erstordnungsbedingung erfüllt (${g.toExponential(2)})`);
  const ridgeGrad = stage1Gradient(M.fitTeamStrength(BASE), BASE, { ridge: 0, ref: REF });
  assertTrue(ridgeGrad > 1e-3, 'Gegenprobe: gleicher Fit gegen die UNpenalisierte Bedingung ist NICHT stationär (die Penalty wirkt wirklich)');
  throwsCode(() => M.fitTeamStrength(BASE, { ridge: -1 }), 'invalid-input', 'ridge < 0 → Fehler');
}

// ══ 4 Zeitgewichtung H = 365 ═════════════════════════════════════════════
console.log('== 4 Zeitgewichte: w = 2^(−(T_ref − Datum)/H), H = 365, nicht normiert ==');
{
  assertEqual([M.timeWeight('2025-01-01', '2025-01-01', 365), M.timeWeight('2024-01-01', '2025-01-01', 365), M.timeWeight('2023-01-01', '2025-01-01', 365)], [1, 0.5 ** (366 / 365), 0.5 ** (731 / 365)], 'Gewichte für 0, 366 (Schaltjahr 2024) und 731 Tage Alter');
  assertEqual(M.timeWeight('2024-01-01', '2024-12-31', 365), 0.5, 'genau 365 Tage Alter ⇒ Gewicht 0.5');
  assertEqual(M.timeWeight('2023-01-01', '2024-01-01', 365), 0.5, '365 Tage (2023 ist kein Schaltjahr) ⇒ 0.5');
  assertEqual(M.timeWeight('2022-01-01', '2024-01-01', 365 * 2), 0.5, 'H = 730: 730 Tage ⇒ 0.5');
  assertEqual(M.DEFAULTS.halfLifeDays, 365, 'Standard-Halbwertszeit = 365 Tage (Platzhalter)');
  assertEqual(M.PLACEHOLDER_OPTIONS, ['halfLifeDays', 'ridge'], 'halfLifeDays und ridge sind ausdrücklich als Platzhalter gekennzeichnet');
  assertEqual(M.fitTeamStrength(BASE).options.placeholders, ['halfLifeDays', 'ridge'], 'Fit-Ergebnis weist die Platzhalter aus');
  throwsCode(() => M.timeWeight('2024-01-01', '2025-01-01', 0), 'invalid-input', 'H = 0 → Fehler');
  throwsCode(() => M.timeWeight('2024-13-01', '2025-01-01', 365), 'invalid-input', 'ungültiges Datum → Fehler');
  const fit = M.fitTeamStrength(BASE);
  const wsum = S.sum(BASE.map((r) => refWeight(r.date, REF, 365)));
  assertNear(fit.quality.weights.sum, wsum, 1e-9, 'Σ Gewichte = unabhängig berechnete Summe (nicht normiert)');
  assertTrue(fit.quality.weights.max === 1 && fit.quality.weights.sum < BASE.length, 'Gewichte nicht normiert: Maximum 1, Summe < Zeilenzahl');
  const g365 = stage1Gradient(fit, BASE, { H: 365, ref: REF });
  const gWrong = stage1Gradient(fit, BASE, { H: 100, ref: REF });
  assertTrue(g365 < 1e-7 && gWrong > 1e-2, 'der Fit ist nur für H = 365 stationär (mit H = 100 nicht) — Zeitgewicht wirkt');
  const fH = M.fitTeamStrength(BASE, { halfLifeDays: 100 });
  assertTrue(stage1Gradient(fH, BASE, { H: 100, ref: REF }) < 1e-7, 'H konfigurierbar: halfLifeDays = 100 liefert das Optimum für H = 100');
  const flat = M.fitTeamStrength(BASE, { halfLifeDays: 1e12 });
  assertTrue(flat.stage1.teams.some((t, i) => Math.abs(t.attack - fit.stage1.teams[i].attack) > 1e-4), 'H = 365 vs. praktisch unendlich: Ergebnisse unterscheiden sich');
  assertNear(fit.weightedLeagueAvgGoalsPerTeamGame, S.sum(BASE.map((r) => r.goalsFor * refWeight(r.date, REF, 365))) / wsum, 1e-9, 'zeitgewichtetes Ligamittel = unabhängige Rechnung');
  assertNear(fit.leagueAvgGoalsPerTeamGame, S.sum(BASE.map((r) => r.goalsFor)) / BASE.length, 1e-12, 'leagueAvgGoalsPerTeamGame = ungewichtetes Mittel der Zeilen im Fit');
}

// ══ 5–9 asOf: Datumsschnitt ═════════════════════════════════════════════
console.log('== 5–9 asOf: Datumsschnitt, kein Zukunftsleck, Vollfit, leerer Zustand, mehrtägiger Spieltag ==');
{
  const dates = [...new Set(BASE.map((r) => r.date))].sort();
  const cut = dates[29];
  const before = BASE.filter((r) => r.date <= cut);
  const fInc = M.fitTeamStrength(BASE, { asOf: { date: cut, inclusive: true } });
  const fOnly = M.fitTeamStrength(before, { asOf: { date: cut, inclusive: true } });
  const noInput = (f) => ({ ...f, quality: { ...f.quality, rows: { ...f.quality.rows, input: 0 } } });
  assertEqual(noInput(fInc), noInput(fOnly), '5 Datumsschnitt inclusive: Fit auf allen Daten mit asOf = Fit nur auf den Zeilen ≤ Datum (identisch; nur die Eingabezeilenzahl der Qualitätsangabe unterscheidet sich)');
  assertEqual([fInc.quality.rows.input, fOnly.quality.rows.input, fInc.quality.rows.inCutoff], [BASE.length, before.length, before.length], 'Qualität: Eingabe- und Schnittzeilen getrennt gezählt');
  assertEqual([fInc.games, fInc.asOfGameDate], [before.length, cut], 'inclusive: Zeilen am Stichtag sind enthalten, asOfGameDate = Stichtag');
  const fExc = M.fitTeamStrength(BASE, { asOf: { date: cut, inclusive: false } });
  const strictly = BASE.filter((r) => r.date < cut);
  assertEqual([fExc.games, fExc.asOfGameDate], [strictly.length, dates[28]], 'exclusive: Zeilen am Stichtag sind NICHT enthalten (Vorhersage eines Spieltags)');
  assertTrue(stage1Gradient(fExc, strictly, { ref: cut }) < 1e-7, 'exclusive: Optimum für die Zeilen < Datum mit T_ref = Stichtag (Alter ≥ 1 Tag)');
  assertNear(fExc.quality.weights.max, 2 ** (-7 / 365), 1e-15, 'exclusive: jüngste Zeilen sind 7 Tage alt → Gewicht 2^(−7/365)');
  // 6 kein Zukunftsleck: Änderungen NACH dem Stichtag ändern den Fit nicht
  const mutated = BASE.map((r) => (r.date > cut ? { ...r, goalsFor: r.goalsFor + 25, teamKey: r.teamKey === 't1' ? 'tX' : r.teamKey } : r));
  assertEqual(M.fitTeamStrength(mutated, { asOf: { date: cut, inclusive: true } }), fInc, '6 kein Zukunftsleck: massive Änderungen an späteren Zeilen lassen den Fit unverändert');
  assertEqual(M.fitTeamStrength(BASE.filter((r) => r.date > cut), { asOf: { date: cut } }).estimable, false, 'nur spätere Zeilen ⇒ leerer Zustand (nichts von später wird benutzt)');
  // 7 Vollfit = Stand am letzten Datum
  assertEqual(M.fitTeamStrength(BASE), M.fitTeamStrength(BASE, { asOf: { date: lastDate(BASE), inclusive: true } }), '7 Vollfit (ohne asOf) = Stand am letzten Datum');
  assertEqual(M.fitTeamStrength(BASE, { asOf: { date: '2100-01-01' } }).games, BASE.length, 'asOf weit in der Zukunft = alle Zeilen');
  // 8 leerer asOf
  const first = dates[0];
  for (const [label, asOf, rows] of [['Datum vor dem ersten Spiel', { date: '2000-01-01' }, BASE], ['exclusive am ersten Datum', { date: first, inclusive: false }, BASE], ['leere Eingabe', { date: '2024-01-01' }, []], ['leere Eingabe ohne asOf', undefined, []]]) {
    const e = M.fitTeamStrength(rows, { asOf });
    assertTrue(!e.estimable && e.games === 0 && e.stage1.teams.length === 0 && e.leagueAvgGoalsPerTeamGame === null && e.warnings.some((w) => w.code === 'empty-asof') && finiteEverywhere(e), `8 leerer Zustand (${label}): gültig, ohne NaN/Infinity, Warnung empty-asof`);
  }
  assertEqual(M.predictDuel(M.fitTeamStrength([], {}), { teamA: 'a', teamB: 'b', orderA: 1, orderB: 1, fieldPlayersA: 8, fieldPlayersB: 8 }).available, false, '8 Vorhersage im leeren Zustand: available false (keine erfundenen Werte)');
  throwsCode(() => M.fitTeamStrength(BASE, { asOf: { date: '2024-02-30' } }), 'invalid-input', 'ungültiges asOf-Datum → Fehler');
  throwsCode(() => M.fitTeamStrength(BASE, { asOf: { date: '2024-01-01', inclusive: 'ja' } }), 'invalid-input', 'inclusive kein Boolean → Fehler');

  // 9 mehrtägiger Spieltag (Spieltag 2 an zwei Terminen) und nicht chronologische Spieltagsnummern
  const mk = (id, md, date, extra = {}) => ({ seasonKey: 'X', gameId: id, gameNumber: id, matchdayNumber: md, matchdayKey: `X#${md}`, date, startTime: '10:00', side: 'home', teamKey: `a${id}`, teamName: 'a', opponentKey: `b${id}`, goalsFor: 5, goalsAgainst: 4, fieldPlayerCount: 8, derived: { gameOrderOfDay: 1, isHostingTeam: null }, ...extra });
  const rows = [mk(1, 1, '2024-11-09'), mk(2, 2, '2024-10-27'), mk(3, 2, '2024-12-07'), mk(4, 9, '2022-01-29'), mk(5, 8, '2022-02-27')];
  assertEqual(M.asOfAfterMatchday(rows, 'X', 2), { date: '2024-12-07', inclusive: true }, '9 mehrtägiger Spieltag 2: „Stand nach“ = LETZTES Datum (07.12.), inclusive');
  assertEqual(M.asOfBeforeMatchday(rows, 'X', 2), { date: '2024-10-27', inclusive: false }, '9 mehrtägiger Spieltag 2: „Vorhersage“ = ERSTES Datum (27.10.), exclusive');
  assertEqual(M.asOfBeforeMatchday(rows, 'X', 1), { date: '2024-11-09', inclusive: false }, '9 Spieltag 1 (09.11.) liegt zeitlich zwischen den zwei Terminen von Spieltag 2');
  assertEqual(M.asOfAfterMatchday(rows, 'X', 9), { date: '2022-01-29', inclusive: true }, '9 Spieltag 9 wurde VOR Spieltag 8 gespielt: „Stand nach 9“ = 29.01. (Spieltagsnummer ist keine Zeitachse)');
  assertEqual(M.asOfBeforeMatchday(rows, 'X', 8), { date: '2022-02-27', inclusive: false }, '9 Spieltag 8 (27.02.): „Vorhersage“ = 27.02. exclusive (Daten von Spieltag 9 gehören dazu)');
  assertEqual(M.asOfAfterMatchday(rows, 'X', 99), null, 'unbekannter Spieltag → null');
  assertEqual(M.asOfAfterMatchday(rows, 'Y', 2), null, 'unbekannte Saison → null');
  const cutAfter9 = M.asOfAfterMatchday(rows, 'X', 9);
  assertEqual(M.fitTeamStrength(rows, { asOf: cutAfter9 }).games, 1, '„Stand nach Spieltag 9“ enthält nur das Spiel vom 29.01. — Spieltag 8 (27.02.) noch nicht');
  const before8 = M.fitTeamStrength(rows, { asOf: M.asOfBeforeMatchday(rows, 'X', 8) });
  assertEqual(before8.games, 1, 'Vorhersage von Spieltag 8 nutzt Spieltag 9 (früher gespielt) — kein Zukunftsleck, kein Verlust');
  const afterDay1 = M.fitTeamStrength(rows, { asOf: { date: '2024-10-27', inclusive: true } });
  assertEqual(afterDay1.games, 3, 'Zwischenstand am 1. Termin von Spieltag 2 (27.10.2024): Zeilen ≤ 27.10. (Spiel 2 sowie die beiden 2022er Zeilen); Spiel 1 (09.11.) und Spiel 3 (07.12.) nicht');
  const real = (await buildLeagueModel()).seasons.flatMap((s) => s.teamGames);
  const r21 = M.asOfAfterMatchday(real, '21/22', 9);
  assertEqual(r21, { date: '2022-01-29', inclusive: true }, '9 echte Daten 21/22: „Stand nach Spieltag 9“ = 29.01.2022');
  const inCut = real.filter((r) => r.seasonKey === '21/22' && r.date <= r21.date);
  assertTrue(!inCut.some((r) => r.matchdayNumber === 8) && inCut.some((r) => r.matchdayNumber === 9), '9 echte Daten 21/22: Spieltag 8 (27.02.2022) ist in „Stand nach Spieltag 9“ nicht enthalten');
  assertEqual(M.asOfBeforeMatchday(real, '24/25', 2), { date: '2024-10-27', inclusive: false }, '9 echte Daten 24/25: Spieltag 2 beginnt am 27.10.2024 (vor Spieltag 1 am 09.11.)');
  assertEqual(M.asOfAfterMatchday(real, '24/25', 2), { date: '2024-12-07', inclusive: true }, '9 echte Daten 24/25: Spieltag 2 endet am 07.12.2024');
}

// ══ 10 gameOrderOfDay = null ═════════════════════════════════════════════
console.log('== 10 gameOrderOfDay = null: ganze Zeile ausschließen, nie als 1. Spiel ==');
{
  const base = league({ seed: 21, teams: T6, att: ATT, def: DEF, rounds: 30 });
  const nulled = base.map((r, i) => (i % 40 === 3 ? { ...r, derived: { ...r.derived, gameOrderOfDay: null } } : r));
  const nNull = nulled.filter((r) => r.derived.gameOrderOfDay === null).length;
  const kept = nulled.filter((r) => r.derived.gameOrderOfDay !== null);
  const f = M.fitTeamStrength(nulled);
  assertEqual([f.games, f.quality.rows.excludedOrderNull, f.quality.rows.input], [kept.length, nNull, nulled.length], 'Zeilen mit null sind ausgeschlossen und gezählt');
  assertEqual(f.warnings.filter((w) => w.code === 'order-null-excluded'), [{ code: 'order-null-excluded', seasonKey: 'S1', count: nNull }], 'Warnung mit Saison und Anzahl');
  const fk = M.fitTeamStrength(kept);
  assertEqual([f.stage1, f.stage2], [fk.stage1, fk.stage2], 'Fit = Fit ohne diese Zeilen (die Zeilen tragen nichts bei)');
  const inflated = nulled.map((r) => (r.derived.gameOrderOfDay === null ? { ...r, goalsFor: r.goalsFor + 40 } : r));
  assertEqual(M.fitTeamStrength(inflated).stage1, f.stage1, 'Tore der ausgeschlossenen Zeilen haben keinen Einfluss');
  const asFirst = M.fitTeamStrength(nulled.map((r) => (r.derived.gameOrderOfDay === null ? { ...r, derived: { ...r.derived, gameOrderOfDay: 1 } } : r)));
  assertTrue(JSON.stringify(asFirst.stage1) !== JSON.stringify(f.stage1), 'Gegenprobe: null → „1. Spiel“ würde ein anderes Ergebnis liefern (wird nicht getan)');
  assertEqual(M.fitTeamStrength(base.map((r, i) => (i === 0 ? { ...r, derived: { ...r.derived, gameOrderOfDay: 3 } } : r))).quality.rows.excludedInvalid, 1, 'ungültige Reihenfolge (3) wird ausgeschlossen und als ungültig gezählt, nicht als 2. Spiel gelesen');
  assertTrue(!f.warnings.some((w) => w.code === 'invalid-rows-excluded'), 'null zählt nicht als „ungültig“, sondern als eigener Ausschlussgrund');
}

// ══ 12–14 Kader ═════════════════════════════════════════════════════════
console.log('== 12–14 Kader: drei Stufen, Referenz 7–8 = 0, nur eigener Kader ==');
{
  assertEqual([3, 5, 6, 7, 8, 9, 12].map(M.kaderStage), ['le6', 'le6', 'le6', '7to8', '7to8', 'ge9', 'ge9'], 'Stufengrenzen: ≤6 → le6, 7 und 8 → Referenz, ≥9 → ge9');
  assertEqual(M.kaderStage(NaN), null, 'kaderStage(NaN) = null');
  const pick = (rng) => [5, 6, 7, 8, 9, 10][rng.nextInt(6)];
  const rows = league({ seed: 31, teams: T6, att: ATT, def: DEF, rounds: 120, le6: -0.3, ge9: 0.25, kader: pick });
  const fit = M.fitTeamStrength(rows, { halfLifeDays: 1e6 });
  const fp = fit.stage1.effects.fieldPlayers;
  assertEqual(fp['7to8'], 0, '13 Referenz 7–8 = 0 (fest)');
  assertTrue(Math.abs(fp.le6 + 0.3) < 0.15 && Math.abs(fp.ge9 - 0.25) < 0.15, `Kadereffekte nahe den wahren Werten: le6 ${fp.le6.toFixed(3)} (−0,3), ge9 ${fp.ge9.toFixed(3)} (+0,25) (Toleranz 0,15, Stichprobenrauschen)`);
  assertEqual(fit.stage1.columns.filter((c) => !c.startsWith('attack:') && !c.startsWith('defense:')), ['mu', 'order', 'le6', 'ge9'], '12 Spalten: μ, Order, K6, K9 — keine weitere Kaderspalte, kein Gegner-Kader');
  const g = stage1Gradient(fit, rows, { H: 1e6, ref: lastDate(rows) });
  assertTrue(g < 1e-6, `14 Erstordnungsbedingung mit NUR eigenem Kader (K6, K9 der eigenen Zeile) erfüllt: ${g.toExponential(2)} < 1e-6 — ein Gegner-Kader-Term im Modell würde sie verletzen`);
  // nur Kader 7–8: le6/ge9 nicht schätzbar, Referenz bleibt 0
  const only78 = league({ seed: 32, teams: T6, att: ATT, def: DEF, rounds: 30, kader: (rng) => 7 + rng.nextInt(2) });
  const f78 = M.fitTeamStrength(only78);
  assertEqual([f78.stage1.effects.fieldPlayers.le6, f78.stage1.effects.fieldPlayers['7to8'], f78.stage1.effects.fieldPlayers.ge9], [null, 0, null], '13 nur Kader 7–8: le6/ge9 leer (nicht schätzbar), Referenz 0');
  assertEqual(f78.warnings.filter((w) => w.code === 'effect-not-estimable').map((w) => w.effect).sort(), ['ge9', 'le6'], 'Warnung effect-not-estimable für le6 und ge9');
  assertTrue(f78.estimable && finiteEverywhere(f78), 'kein Absturz, keine NaN/Infinity ohne Kadervariation');
  // Vorhersage: Kader des Gegners ändert die eigene Erwartung nicht
  const pA = M.predictDuel(fit, { teamA: 't1', teamB: 't2', orderA: 1, orderB: 1, fieldPlayersA: 8, fieldPlayersB: 5 });
  const pB = M.predictDuel(fit, { teamA: 't1', teamB: 't2', orderA: 1, orderB: 1, fieldPlayersA: 8, fieldPlayersB: 10 });
  assertEqual(pA.lambdaStage1.a, pB.lambdaStage1.a, '14 Vorhersage: der Kader des Gegners (5 vs. 10) ändert λ von Team A nicht');
  const pC = M.predictDuel(fit, { teamA: 't1', teamB: 't2', orderA: 1, orderB: 1, fieldPlayersA: 5, fieldPlayersB: 8 });
  assertNear(pC.lambdaStage1.a / pA.lambdaStage1.a, Math.exp(fp.le6), 1e-12, 'eigener Kader ≤6 multipliziert λ mit exp(β_le6)');
  const pD = M.predictDuel(fit, { teamA: 't1', teamB: 't2', orderA: 1, orderB: 1, fieldPlayersA: 10, fieldPlayersB: 8 });
  assertNear(pD.lambdaStage1.a / pA.lambdaStage1.a, Math.exp(fp.ge9), 1e-12, 'eigener Kader ≥9 multipliziert λ mit exp(β_ge9)');
  const p78 = M.predictDuel(fit, { teamA: 't1', teamB: 't2', orderA: 1, orderB: 1, fieldPlayersA: 7, fieldPlayersB: 8 });
  assertEqual(p78.lambdaStage1.a, pA.lambdaStage1.a, 'Kader 7 und 8 sind beide Referenz (gleiches λ)');
}

// ══ D3 / O2: Host zweistufig ═══════════════════════════════════════════
console.log('== D3 / O2: null-Host bleibt in Stufe 1, Stufe 2 nur bekannte Zeilen ==');
{
  // 3 Runden früher ohne Host-Information (null), spätere Runden mit bekannter Ausrichter-Information
  const hostFn = (r, s, gi) => (r < 30 ? { a: null, b: null } : { a: gi === 0, b: false });
  const rows = league({ seed: 41, teams: T6, att: ATT, def: DEF, rounds: 60, hostEff: 0.25, host: hostFn });
  const dist = { true: 0, false: 0, null: 0 };
  rows.forEach((r) => { dist[String(r.derived.isHostingTeam)]++; });
  const fit = M.fitTeamStrength(rows);
  assertEqual(fit.quality.hostDistribution, dist, 'Host-Verteilung im Fit = true/false/null der Eingabe');
  assertEqual(fit.stage2.rows, { host: dist.true, notHost: dist.false, unknownExcluded: dist.null }, 'Stufe 2 verwendet true UND false; null wird gezählt und nicht verwendet (nicht als false)');
  assertEqual(fit.games, rows.length, '1 null-Host-Zeilen bleiben in Stufe 1 enthalten (alle Zeilen im Fit)');
  assertEqual(S.sum(fit.stage1.teams.map((t) => t.games)), rows.length, '1 Team-Spiel-Zeilen der Teams = alle Zeilen (auch die mit null)');
  assertTrue(stage1Gradient(fit, rows, { ref: lastDate(rows) }) < 1e-7, '1 Stufe 1 ist das Optimum über ALLE Zeilen ohne Host-Term (unabhängige Erstordnungsbedingung)');
  assertTrue(fit.stage1.columns.every((c) => c === 'mu' || c.startsWith('attack:') || c.startsWith('defense:') || ['order', 'le6', 'ge9'].includes(c)) && !fit.stage1.columns.some((c) => /host/i.test(c)), '3 kein Host- und kein hostUnknown-Term in Stufe 1 (Spaltenliste)');
  // 6 Stufe 1 unverändert bei Änderung der Hostwerte
  const flipped = rows.map((r) => ({ ...r, derived: { ...r.derived, isHostingTeam: r.derived.isHostingTeam === true ? false : r.derived.isHostingTeam === false ? true : true } }));
  const allNull = rows.map((r) => ({ ...r, derived: { ...r.derived, isHostingTeam: null } }));
  assertEqual(M.fitTeamStrength(flipped).stage1, fit.stage1, '6 Stufe 1 bleibt bei völlig anderen Hostwerten (true↔false, null → true) exakt gleich');
  assertEqual(M.fitTeamStrength(allNull).stage1, fit.stage1, '6 Stufe 1 bleibt gleich, wenn alle Hostwerte null sind');
  assertTrue(M.fitTeamStrength(flipped).stage2.betaHost !== fit.stage2.betaHost, '6 Gegenprobe: Stufe 2 reagiert auf die Hostwerte');
  // 2 null nicht als false: Zählung
  const nullAsFalse = rows.map((r) => ({ ...r, derived: { ...r.derived, isHostingTeam: r.derived.isHostingTeam === null ? false : r.derived.isHostingTeam } }));
  const fnf = M.fitTeamStrength(nullAsFalse);
  assertEqual(fnf.stage2.rows.notHost, dist.false + dist.null, '2 Gegenprobe: würde null als false behandelt, wären die Stufe-2-Zeilen „kein Ausrichter“ um die null-Zeilen größer — ist hier nicht der Fall');
  assertEqual(fit.stage2.rows.notHost, dist.false, '2 null-Zeilen zählen NICHT zu „kein Ausrichter“');
  assertEqual(fit.stage2.rows.unknownExcluded, dist.null, '4 Stufe 2 verwendet nur bekannte Host-Zeilen (null ausgeschlossen)');
  // Stufe 2 unabhängig: β = ln(Σ w y / Σ w μ₁) über Ausrichter-Zeilen
  const hostRows = rows.filter((r) => r.derived.isHostingTeam === true);
  const num = S.sum(hostRows.map((r) => refWeight(r.date, lastDate(rows), 365) * r.goalsFor));
  const den = S.sum(hostRows.map((r) => refWeight(r.date, lastDate(rows), 365) * Math.exp(eta1Of(fit, r))));
  assertNear(fit.stage2.betaHost, Math.log(num / den), 1e-9, '8 β_host = ln(Σw·y / Σw·μ_Stufe1) über die Ausrichter-Zeilen (unabhängige geschlossene Form; Stufe-1-Offset wirkt)');
  assertTrue(Math.abs(fit.stage2.betaHost - 0.25) < 0.25, 'β_host liegt in der Größenordnung des wahren Effekts 0,25 (grobe Plausibilität; Stichprobe klein)');
  // Vorhersage: bekannter Host wendet β an; unbekannter/false exakt Stufe 1
  const base = { teamA: 't1', teamB: 't2', orderA: 1, orderB: 1, fieldPlayersA: 8, fieldPlayersB: 8 };
  const pNull = M.predictDuel(fit, { ...base, hostA: null, hostB: null });
  const pDefault = M.predictDuel(fit, base);
  const pFalse = M.predictDuel(fit, { ...base, hostA: false, hostB: false });
  const pTrue = M.predictDuel(fit, { ...base, hostA: true, hostB: false });
  assertEqual([pNull.lambdaFinal, pNull.lambdaStage1], [pNull.lambdaStage1, pNull.lambdaStage1], '7 unbekannter Host (null): finale Erwartung = Stufe 1 exakt');
  assertEqual(pDefault.lambdaFinal, pNull.lambdaStage1, '7 ohne Hostangabe (Standard null): Stufe 1 unverändert');
  assertEqual(pFalse.lambdaFinal, pNull.lambdaStage1, '7 bekannt „kein Ausrichter“: Stufe 1 unverändert');
  assertEqual(pTrue.lambdaFinal.a, pNull.lambdaStage1.a * Math.exp(fit.stage2.betaHost), '8 bekannter Ausrichter: λ_final = λ_Stufe1 · exp(β_host) exakt');
  assertEqual(pTrue.lambdaFinal.b, pNull.lambdaStage1.b, '8 Gegner ohne Ausrichter-Rolle bleibt unverändert');
  assertEqual(pTrue.hostEffectUnavailable, false, 'Host-Effekt verfügbar');

  // 9 keine bekannten Host-Zeilen: sauberer Stage-2-empty-Zustand
  const noHost = M.fitTeamStrength(allNull);
  assertEqual([noHost.estimable, noHost.stage1.estimable, noHost.stage2.estimable, noHost.stage2.reason, noHost.stage2.betaHost], [true, true, false, 'no-known-host-rows', null], '9 keine bekannten Host-Zeilen: Stufe 1 ok, Stufe 2 leer (kein Absturz)');
  assertTrue(noHost.warnings.some((w) => w.code === 'stage2-not-estimable' && w.reason === 'no-known-host-rows') && finiteEverywhere(noHost), '9 Warnung stage2-not-estimable, keine NaN/Infinity');
  const pNoHost = M.predictDuel(noHost, { ...base, hostA: true });
  assertEqual([pNoHost.hostEffectUnavailable, pNoHost.lambdaFinal], [true, pNoHost.lambdaStage1], '9 Vorhersage mit hostA = true ohne β_host: Stufe 1, Hinweis hostEffectUnavailable');
  const noTrue = rows.map((r) => ({ ...r, derived: { ...r.derived, isHostingTeam: r.derived.isHostingTeam === true ? false : r.derived.isHostingTeam } }));
  assertEqual([M.fitTeamStrength(noTrue).stage2.estimable, M.fitTeamStrength(noTrue).stage2.reason], [false, 'no-host-true-rows'], '9 nur „kein Ausrichter“ bekannt: Stufe 2 leer (no-host-true-rows)');
  const zeroGoals = rows.map((r) => (r.derived.isHostingTeam === true ? { ...r, goalsFor: 0 } : r));
  assertEqual(M.fitTeamStrength(zeroGoals).stage2.reason, 'host-rows-zero-goals', '9 Ausrichter-Zeilen ohne Tore: β_host nicht schätzbar, keine Divergenz');
  throwsCode(() => M.predictDuel(fit, { ...base, hostA: 'ja' }), 'invalid-input', 'hostA muss true/false/null sein');
  throwsCode(() => M.predictDuel(fit, { teamA: 't1', teamB: 't2', orderA: 1, orderB: 3, fieldPlayersA: 8, fieldPlayersB: 8 }), 'invalid-input', 'orderB muss 1 oder 2 sein (kein stilles „1. Spiel“)');
  throwsCode(() => M.predictDuel(fit, { teamA: 't1', teamB: 't2', orderA: 1, orderB: 1, fieldPlayersA: 8 }), 'invalid-input', 'fieldPlayersB fehlt → Fehler');
}

console.log('== D3 an den echten Daten: Verteilung 312 / 24 / 88 (ohne Kopplung an Koeffizienten) ==');
const realModel = await buildLeagueModel();
const realRows = realModel.seasons.flatMap((s) => s.teamGames);
{
  const fit = M.fitTeamStrength(realRows);
  assertEqual(fit.quality.hostDistribution, { true: 24, false: 88, null: 312 }, 'Host-Verteilung im Fit: true 24, false 88, null 312');
  assertEqual([fit.games, fit.quality.rows.input, fit.quality.rows.excludedOrderNull], [424, 428, 4], '424 Zeilen im Fit (428 M0-Zeilen, 4 mit gameOrderOfDay = null)');
  assertEqual(fit.quality.orderNullBySeason, { '21/22': 2, '24/25': 2 }, 'ausgeschlossene Zeilen nach Saison: 21/22 ×2, 24/25 ×2');
  assertEqual(fit.warnings.filter((w) => w.code === 'order-null-excluded').map((w) => [w.seasonKey, w.count]), [['21/22', 2], ['24/25', 2]], 'Warnungen order-null-excluded mit Saison und Anzahl');
  assertEqual(fit.stage2.rows, { host: 24, notHost: 88, unknownExcluded: 312 }, 'Stufe 2 verwendet alle 112 bekannten Host-Zeilen (24 Ausrichter + 88 kein Ausrichter)');
  assertEqual(fit.stage2.rows.host + fit.stage2.rows.notHost, 112, 'Stufe 2: 112 Zeilen (nicht „24 Zeilen“)');
  assertTrue(fit.stage2.estimable && fit.stage1.converged, 'Stufe 1 und Stufe 2 schätzbar');
  const bySeason = {};
  for (const r of realRows) { const k = r.seasonKey; bySeason[k] = bySeason[k] || { true: 0, false: 0, null: 0 }; bySeason[k][String(r.derived.isHostingTeam)]++; }
  assertEqual(Object.fromEntries(Object.entries(bySeason).map(([k, v]) => [k, v.null === 0 ? 'known' : v.true + v.false === 0 ? 'unknown' : 'mixed'])), { '21/22': 'unknown', '22/23': 'unknown', '23/24': 'unknown', '24/25': 'unknown', '25/26': 'known' }, 'null kommt ausschließlich in 21/22–24/25 vor, 25/26 ist vollständig bekannt');
  const endOf = (season) => { const d = realRows.filter((r) => r.seasonKey === season).map((r) => r.date).sort().at(-1); return { date: d, inclusive: true }; };
  for (const season of ['21/22', '22/23', '23/24', '24/25']) {
    const f = M.fitTeamStrength(realRows, { asOf: endOf(season) });
    assertTrue(f.estimable && !f.stage2.estimable && f.stage2.reason === 'no-known-host-rows' && finiteEverywhere(f), `Stand Ende ${season}: Stufe 1 ok, Stufe 2 leer (no-known-host-rows), kein Absturz`);
  }
  const f26 = M.fitTeamStrength(realRows, { asOf: endOf('25/26') });
  assertEqual(f26, fit, 'Stand Ende 25/26 = Vollfit');
  const ids = new Set(realRows.map((r) => r.gameId));
  for (const excluded of [26644, 25677, 26613, 25679, 25681, 25682, 25683, 26478, 40512, 40514]) assertTrue(!ids.has(excluded), `21 M0-ausgeschlossenes Spiel ${excluded} ist keine Eingabezeile und fließt nicht ein`);
  assertTrue(!fit.stage1.teams.some((t) => t.teamKey === 'sg-freiburg-tuebingen'), 'keine zusätzliche Identitätslogik: nur M0-teamKeys');
  assertEqual(fit.stage1.teams.map((t) => t.teamKey), [...new Set(realRows.map((r) => r.teamKey))].sort(), 'Teams = M0-teamKeys (sortiert), keine Fusion und keine Vererbung');
  assertTrue(finiteEverywhere(fit) && finiteEverywhere(M.fitTeamStrength(realRows, { asOf: endOf('22/23') })), '24 keine NaN/Infinity im gültigen Output (echte Daten)');
  const ulm = M.predictDuel(fit, { teamA: 'vfb-ulm', teamB: 'fbc-heidelberg', orderA: 1, orderB: 1, fieldPlayersA: 8, fieldPlayersB: 8, hostA: true });
  assertNear(ulm.wdl.win + ulm.wdl.draw + ulm.wdl.loss, 1, 1e-12, '22 echte Daten: W/D/L-Summe = 1');
}

// ══ 15–17 Bootstrap ═════════════════════════════════════════════════════
console.log('== 15–17 Bootstrap auf Spielebene (beide Teamzeilen gemeinsam, beide O2-Stufen neu) ==');
{
  const hostFn = (r, s, gi) => (r < 12 ? { a: null, b: null } : { a: gi === 0, b: false });
  const rows = league({ seed: 51, teams: T6, att: ATT, def: DEF, rounds: 24, hostEff: 0.2, host: hostFn });
  const opts = { halfLifeDays: 365, ridge: 1 };
  const R = 30;
  const b = M.bootstrapTeamStrength(rows, { ...opts, replicates: R, seed: 5, keepReplicates: true });
  const alphaLo = (1 - 0.9) / 2;
  const alphaHi = 1 - alphaLo;
  assertTrue(b.bootstrap.available && b.bootstrap.unit === 'game' && b.bootstrap.replicates === R && b.bootstrap.seed === 5 && b.bootstrap.level === 0.9, 'Bootstrap: Einheit game, 30 Wiederholungen, Seed 5, Niveau 0,90');
  const units = M.gameUnits(rows);
  assertTrue(units.length === rows.length / 2 && units.every((u) => u.length === 2 && u[0].gameId === u[1].gameId), '15 Spiel-Einheiten: jede enthält BEIDE Teamzeilen desselben Spiels');
  assertEqual(b.bootstrap.games, units.length, 'Bootstrap zieht aus den Spielen (nicht aus den Zeilen)');
  assertEqual(b.bootstrap.failedReplicates, 0, 'keine fehlgeschlagenen Refits');
  // unabhängige Referenz: Indizes aus dem geprüften RNG, Einheiten in kanonischer Reihenfolge (Schlüssel Saison#gameId als Text)
  const refUnits = Object.values(rows.reduce((m, r) => { const k = `${r.seasonKey}#${r.gameId}`; (m[k] = m[k] || []).push(r); return m; }, {}));
  const keysSorted = Object.keys(rows.reduce((m, r) => { m[`${r.seasonKey}#${r.gameId}`] = 1; return m; }, {})).sort();
  const byKey = rows.reduce((m, r) => { const k = `${r.seasonKey}#${r.gameId}`; (m[k] = m[k] || []).push(r); return m; }, {});
  const orderedUnits = keysSorted.map((k) => byKey[k]);
  assertEqual(refUnits.length, orderedUnits.length, 'Referenzgruppierung: gleiche Anzahl Spiele');
  const idx = S.bootstrapSampleIndices(orderedUnits.length, R, 5);
  const valueOf = (fit, key) => (key === 'mu' ? fit.stage1.mu : key === 'order' ? fit.stage1.effects.order : key === 'le6' || key === 'ge9' ? fit.stage1.effects.fieldPlayers[key] : key === 'betaHost' ? fit.stage2.betaHost : teamParam(fit, key.split(':')[0], key.split(':')[1]));
  const lastD = lastDate(rows);
  let allEqual = true;
  for (let r = 0; r < R; r++) {
    const sampleRows = idx[r].flatMap((i) => orderedUnits[i]);
    const refit = M.fitTeamStrength(sampleRows, { ...opts, asOf: { date: lastD, inclusive: true } });
    const expected = b.bootstrap.keys.map((k) => valueOf(refit, k));
    if (JSON.stringify(expected) !== JSON.stringify(b.bootstrap.replicateEstimates[r])) allEqual = false;
  }
  assertTrue(allEqual, '15 jede Wiederholung = unabhängiger Vollrefit (BEIDE Stufen) auf den gezogenen Spielen, jeweils beide Teamzeilen gemeinsam (exakt)');
  assertTrue(b.bootstrap.keys.includes('betaHost') && b.bootstrap.keys.includes('mu'), 'Schätzvektor enthält Stufe 1 (μ, Teams) und Stufe 2 (β_host)');
  const col = (key) => b.bootstrap.replicateEstimates.map((e) => e[b.bootstrap.keys.indexOf(key)]);
  assertTrue(new Set(col('betaHost')).size > 10 && new Set(col('mu')).size > 10 && new Set(col('attack:t1')).size > 10, '10 Stufe 1 UND Stufe 2 werden pro Wiederholung neu geschätzt (β_host, μ und Angriff streuen)');
  // 17 Intervalle = Quantile (unabhängig)
  const ivMu = b.bootstrap.intervals.mu;
  assertEqual([ivMu.lower, ivMu.upper], [refQuantile(col('mu'), alphaLo), refQuantile(col('mu'), alphaHi)], '17 90-%-Perzentilintervall μ = 5 %- und 95 %-Quantil der Wiederholungen (Typ 7)');
  const ivH = b.bootstrap.intervals.betaHost;
  assertEqual([ivH.lower, ivH.upper], [refQuantile(col('betaHost'), alphaLo), refQuantile(col('betaHost'), alphaHi)], '17 Intervall β_host = Quantile der Wiederholungen');
  const t3 = b.bootstrap.intervals.teams.find((t) => t.teamKey === 't3');
  assertEqual([t3.attack.lower, t3.defense.upper], [refQuantile(col('attack:t3'), alphaLo), refQuantile(col('defense:t3'), alphaHi)], '17 Team-Intervalle (Angriff/Abwehr) = Quantile');
  assertTrue(ivH.upper - ivH.lower > 0 && ivMu.upper - ivMu.lower > 0, '17 Intervalle haben positive Breite (echter Refit, kein Originalfit)');
  assertTrue(b.stage2.betaHost !== undefined && b.stage1.mu === M.fitTeamStrength(rows, opts).stage1.mu, 'Der Punktschätzer bleibt der Originalfit');
  // 16 deterministisch
  const b2 = M.bootstrapTeamStrength(rows, { ...opts, replicates: R, seed: 5, keepReplicates: true });
  assertEqual(JSON.stringify(b2), JSON.stringify(b), '16 gleicher Seed ⇒ byte-identisches Ergebnis');
  const b3 = M.bootstrapTeamStrength(rows, { ...opts, replicates: R, seed: 6, keepReplicates: true });
  assertTrue(JSON.stringify(b3.bootstrap.replicateEstimates) !== JSON.stringify(b.bootstrap.replicateEstimates), '16 anderer Seed ⇒ andere Wiederholungen');
  const shuf = M.bootstrapTeamStrength(shuffled(rows, 3), { ...opts, replicates: R, seed: 5, keepReplicates: true });
  assertEqual(JSON.stringify(shuf), JSON.stringify(b), '16/20 gemischte Eingabereihenfolge ⇒ identisches Bootstrap-Ergebnis');
  const b20 = M.bootstrapTeamStrength(rows, { ...opts, replicates: 20, seed: 5 });
  assertEqual([b20.bootstrap.replicates, b20.bootstrap.replicateEstimates], [20, undefined], 'Wiederholungszahl konfigurierbar (20); ohne keepReplicates keine Rohwiederholungen im Ergebnis');
  const b45 = M.bootstrapTeamStrength(rows, { ...opts, replicates: 45, seed: 5 });
  assertEqual(b45.bootstrap.replicates, 45, 'Wiederholungszahl 45 wird übernommen');
  assertEqual(M.bootstrapTeamStrength(rows, { ...opts, replicates: R, seed: 5, level: 0.8 }).bootstrap.level, 0.8, 'level konfigurierbar');
  throwsCode(() => M.bootstrapTeamStrength(rows, { replicates: 10, seed: 1 }), 'invalid-input', 'weniger als 20 Wiederholungen → Fehler (Regel aus stats.mjs)');
  throwsCode(() => M.bootstrapTeamStrength(rows, { replicates: 30 }), 'invalid-input', 'ohne Seed → Fehler (kein versteckter Seed)');
  const emptyB = M.bootstrapTeamStrength([], { replicates: 30, seed: 1 });
  assertEqual([emptyB.bootstrap.available, emptyB.estimable], [false, false], 'leerer Zustand: Bootstrap nicht verfügbar, kein Absturz');
  assertTrue(finiteEverywhere(b) && finiteEverywhere(emptyB), '24 keine NaN/Infinity im Bootstrap-Ergebnis');
  const noHostB = M.bootstrapTeamStrength(rows.map((r) => ({ ...r, derived: { ...r.derived, isHostingTeam: null } })), { ...opts, replicates: 20, seed: 2 });
  assertTrue(noHostB.bootstrap.available && noHostB.bootstrap.intervals.betaHost === null, 'ohne bekannte Host-Zeilen: Bootstrap läuft, β_host-Intervall leer (null)');
}

// ══ 18–20 neue Teams, dünne Daten, Reihenfolge ══════════════════════════
console.log('== 18–20 neue Teams, dünne Daten, Eingabereihenfolge ==');
{
  const teams7 = [...T6, 'neu'];
  const rows = league({ seed: 61, teams: T6, att: ATT, def: DEF, rounds: 40 });
  // Team „neu“ spielt nur die letzten 2 Spiele (Vorsaison ohne Daten) gegen t1
  const lastD = lastDate(rows);
  const mk = (id, team, opp, gf, ga, side) => ({ seasonKey: 'S1', gameId: id, gameNumber: id, matchdayNumber: 99, matchdayKey: 'S1#99', date: addDays(lastD, 7), startTime: '11:00', side, teamKey: team, teamName: team, opponentKey: opp, goalsFor: gf, goalsAgainst: ga, fieldPlayerCount: 8, derived: { gameOrderOfDay: 1, isHostingTeam: null } });
  const extra = [mk(90001, 'neu', 't1', 9, 3, 'home'), mk(90001, 't1', 'neu', 3, 9, 'guest'), mk(90002, 'neu', 't2', 8, 5, 'home'), mk(90002, 't2', 'neu', 5, 8, 'guest')];
  const all = [...rows, ...extra];
  const fit = M.fitTeamStrength(all);
  const neu = fit.stage1.teams.find((t) => t.teamKey === 'neu');
  assertTrue(neu && neu.games === 2 && Number.isFinite(neu.attack) && Number.isFinite(neu.defense), '18 neues Team ohne Vorsaison: Werte ausgegeben (nicht null), games = 2');
  assertTrue(fit.warnings.some((w) => w.code === 'thin-data' && w.teamKey === 'neu' && w.games === 2), '19 geringe Datenbasis: Warnung thin-data mit games');
  assertTrue(!fit.warnings.some((w) => w.code === 'thin-data' && w.teamKey === 't3'), '19 Teams mit genug Spielen: keine thin-data-Warnung');
  const strong = M.fitTeamStrength(all, { ridge: 1 }).stage1.teams.find((t) => t.teamKey === 'neu');
  const weak = M.fitTeamStrength(all, { ridge: 50 }).stage1.teams.find((t) => t.teamKey === 'neu');
  assertTrue(Math.abs(weak.attack) < Math.abs(strong.attack), '18 wenige Spiele werden mit stärkerer Penalty stärker Richtung Ligaschnitt (0) geschrumpft');
  assertEqual(M.fitTeamStrength(all, { minGamesWarning: 2 }).warnings.filter((w) => w.code === 'thin-data').length, 0, '19 Warnschwelle konfigurierbar: minGamesWarning = 2 ⇒ keine Warnung für 2 Spiele');
  assertEqual(M.fitTeamStrength(all, { minGamesWarning: 0 }).warnings.filter((w) => w.code === 'thin-data').length, 0, '19 minGamesWarning = 0 ⇒ Warnungen aus');
  assertEqual(M.fitTeamStrength(all, { minGamesWarning: 3 }).warnings.filter((w) => w.code === 'thin-data').map((w) => w.teamKey), ['neu'], '19 minGamesWarning = 3 ⇒ genau das Team mit 2 Spielen');
  assertTrue(neu.weightedGames > 0 && neu.weightedGames <= neu.games, 'weightedGames ≤ games (Gewichte ≤ 1)');
  const p = M.predictDuel(fit, { teamA: 'ganz-neu', teamB: 't1', orderA: 1, orderB: 1, fieldPlayersA: 8, fieldPlayersB: 8 });
  assertEqual(p.newTeams, ['ganz-neu'], '18 Team ohne Daten im Fit: als newTeams markiert');
  assertEqual(p.lambdaStage1.a, Math.exp(fit.stage1.mu + 0 - teamParam(fit, 'defense', 't1')), '18 unbekanntes Team: Angriff = 0 (Ligaschnitt), keine Vererbung');
  assertTrue(teams7.length === 7 && fit.stage1.teams.length === 7, 'Teamliste enthält das neue Team');
  // 20 Eingabereihenfolge
  const ref = JSON.stringify(M.fitTeamStrength(all));
  let same = true;
  for (const seed of [1, 2, 3, 4]) if (JSON.stringify(M.fitTeamStrength(shuffled(all, seed))) !== ref) same = false;
  assertTrue(same && JSON.stringify(M.fitTeamStrength([...all].reverse())) === ref, '20 Eingabereihenfolge (4 zufällige Reihenfolgen + umgekehrt) ⇒ byte-identisches Ergebnis');
  const cutA = { asOf: { date: addDays(lastD, -60), inclusive: false } };
  assertEqual(JSON.stringify(M.fitTeamStrength(shuffled(all, 9), cutA)), JSON.stringify(M.fitTeamStrength(all, cutA)), '20 auch mit Datumsschnitt reihenfolgeunabhängig');
  assertTrue(!Object.isFrozen(all) && all.length === rows.length + 4, 'Eingabe wird nicht verändert (Länge unverändert)');
  const inputCopy = clone(all);
  M.fitTeamStrength(all);
  assertEqual(all, inputCopy, 'Eingabe wird nicht verändert (Inhalt)');
}

// ══ 22–24 Vorhersage ════════════════════════════════════════════════════
console.log('== 22–24 Vorhersage: W/D/L, erwartete Tordifferenz, keine NaN ==');
{
  const fit = M.fitTeamStrength(BASE);
  let worst = 0;
  let gdOk = true;
  let strongerOk = true;
  for (const a of T6) for (const b of T6) {
    if (a === b) continue;
    const p = M.predictDuel(fit, { teamA: a, teamB: b, orderA: 1, orderB: 2, fieldPlayersA: 8, fieldPlayersB: 8 });
    worst = Math.max(worst, Math.abs(p.wdl.win + p.wdl.draw + p.wdl.loss - 1));
    if (p.expectedGoalDifference !== p.lambdaFinal.a - p.lambdaFinal.b) gdOk = false;
    if (!finiteEverywhere(p)) gdOk = false;
    const ref = S.matchOutcomeProbabilities(p.lambdaFinal.a, p.lambdaFinal.b);
    if (p.wdl.win !== ref.win || p.wdl.draw !== ref.draw || p.wdl.loss !== ref.loss) gdOk = false;
  }
  assertTrue(worst < 1e-12, `22 W/D/L-Summe = 1 für alle 30 Duelle (größte Abweichung ${worst.toExponential(2)} < 1e-12)`);
  assertTrue(gdOk, '23 erwartete Tordifferenz = λ_A − λ_B (exakt), W/D/L = Skellam der finalen λ, alles endlich');
  const strong = M.predictDuel(fit, { teamA: 't1', teamB: 't6', orderA: 1, orderB: 1, fieldPlayersA: 8, fieldPlayersB: 8 });
  const weak = M.predictDuel(fit, { teamA: 't6', teamB: 't1', orderA: 1, orderB: 1, fieldPlayersA: 8, fieldPlayersB: 8 });
  assertTrue(strong.expectedGoalDifference > 0 && weak.expectedGoalDifference < 0 && strong.wdl.win > strong.wdl.loss && weak.wdl.loss > weak.wdl.win, '23 starkes Team hat positive erwartete Tordifferenz und höhere Siegwahrscheinlichkeit; Vertauschen kehrt das Vorzeichen um');
  assertNear(strong.expectedGoalDifference, -weak.expectedGoalDifference, 0, 'Vertauschen der Teams: erwartete Tordifferenz spiegelt sich exakt');
  assertNear(strong.wdl.win, weak.wdl.loss, 1e-15, 'Vertauschen der Teams: P(Sieg) = P(Niederlage) des Gegenstücks');
  assertTrue(finiteEverywhere(fit) && finiteEverywhere(strong), '24 keine NaN/Infinity in Fit und Vorhersage');
  const order2 = M.predictDuel(fit, { teamA: 't1', teamB: 't2', orderA: 2, orderB: 1, fieldPlayersA: 8, fieldPlayersB: 8 });
  const order1 = M.predictDuel(fit, { teamA: 't1', teamB: 't2', orderA: 1, orderB: 1, fieldPlayersA: 8, fieldPlayersB: 8 });
  assertNear(order2.lambdaStage1.a / order1.lambdaStage1.a, Math.exp(fit.stage1.effects.order), 1e-12, 'Order-Effekt: 2. Spiel multipliziert λ mit exp(β_order)');
}

// ══ Quelltext ═══════════════════════════════════════════════════════════
console.log('== Quelltext: Grenzen des Moduls ==');
{
  const src = await readFile(path.join(REPO_ROOT, 'scripts', 'model', 'team-strength.mjs'), 'utf8');
  const code = src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*$/gm, '');
  assertTrue(!/node:fs|node:http|fetch\(|Math\.random|Date\.now|new Date\(\)|process\.|writeFile|localStorage/.test(code), 'kein Dateisystem, Netzwerk, Zufall, Uhrzeit, Persistenz');
  assertTrue(!/hostUnknown|gamma|matchdayNumber\s*[<>]=?|\.matchdayNumber\s*<=|alias|Alias|fusion/i.test(code.replace(/r\.matchdayNumber === matchdayNumber/g, '')), 'kein hostUnknown-Term, keine Alias-/Fusionslogik, keine Spieltagsnummer als Zeitachse');
  assertTrue(!/opponentFieldPlayerCount|oppK|oppLe6|oppGe9/.test(code), 'kein Gegner-Kader-Term im Code');
  assertTrue(/DEFAULTS = Object\.freeze\(\{ halfLifeDays: 365, ridge: 1, minGamesWarning: 6 \}\)/.test(src), 'Platzhalter-Defaults an einer Stelle (365 / 1 / 6), konfigurierbar');
  assertTrue(!/toFixed\(|Math\.round\(/.test(code), 'keine Rundung im Modul (nur an der Ausgabegrenze)');
}

console.log('');
if (failures > 0) { console.log(`${failures} Test(s) fehlgeschlagen.`); process.exitCode = 1; } else { console.log('Alle Tests erfolgreich.'); process.exitCode = 0; }

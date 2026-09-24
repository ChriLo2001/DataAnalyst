// M1 · Teamstärke-Modell (P2 Runde 2) — Node/Dry-Run, KEINE Persistenz.
//
// Eingabe: M0-`teamGames[]` (scripts/model/normalize.mjs), beliebig viele Saisons. Ausgabe: ungerundete Zahlen
// (Rundung erst an der Ausgabegrenze, siehe stats.roundOutput). Reine Funktionen, deterministisch.
//
// ── Modell (Owner-Entscheidungen zu Runde 2) ────────────────────────────────────────────────────────────────
// Zeile i = ein Team-Spiel (Team a, Gegner b, Ziel y_i = goalsFor). Gewicht w_i = 2^(−(T_ref − Datum_i)/H), Alter in
// Kalendertagen, NICHT normiert. T_ref = asOf.date. H (halfLifeDays, Standard 365) und ridge (Standard 1) sind
// KONFIGURIERBARE PLATZHALTER; die Abstimmung erfolgt später über M9. Dieses Modul erfüllt keine M9-Akzeptanz.
//
// STUFE 1 (auf allen zulässigen Zeilen, KEIN Host-Term):
//   log λ_i = μ + attack[a] − defense[b] + β_order·O_i + β_le6·K6_i + β_ge9·K9_i
//   O_i = 1[gameOrderOfDay = 2]; K6_i = 1[fieldPlayerCount ≤ 6]; K9_i = 1[fieldPlayerCount ≥ 9]; Referenz 7–8 (Effekt 0).
//   Es zählt AUSSCHLIESSLICH der eigene Kader der Zeile (kein Gegner-Kader-Term).
//   Penalty: ein gemeinsames `ridge` NUR auf attack[·] und defense[·] (Richtung 0 = Ligaschnitt); μ, Order und Kader
//   sind unpenalisiert. Keine Zentrierungs-Nebenbedingung: die Ridge-Penalty macht die Nullrichtungen des Modells
//   eindeutig (Σ attack = 0 und Σ defense = 0 im Optimum).
//
// STUFE 2 (Host, O2 — bewusst NICHT identisch mit einer gemeinsamen Regression):
//   Nur Zeilen mit bekanntem isHostingTeam (true → H = 1, false → H = 0). Zeilen mit null werden in Stufe 2 nicht
//   verwendet und NICHT als false behandelt; es gibt keinen hostUnknown-Term. Ein-Parameter-Poisson-Fit ohne
//   Achsenabschnitt mit dem Stufe-1-Linearprädiktor als Offset:  λ_final = λ_Stufe1 · exp(β_host · H).
//   Bei unbekanntem Host bleibt λ_final = λ_Stufe1 unverändert. Hinweis: Ohne Stufe-2-Achsenabschnitt tragen Zeilen
//   mit H = 0 rechnerisch nichts zur Schätzung von β_host bei (sie gehen als „bekannt, kein Ausrichter“ in die
//   Zeilenzahlen ein); β_host = ln(Σ w·y / Σ w·μ_Stufe1) über die Ausrichter-Zeilen.
//   Grund für O2: hosting_club fehlt in 21/22–24/25 vollständig; die Zeilen sollen im Teamstärke-Fit bleiben, ohne
//   dass fehlende Information als false gilt und ohne einen Saison-Indikator „vor 25/26“ einzuführen.
//
// asOf ist datumsgesteuert (nie Spieltagsnummer): { date: 'YYYY-MM-DD', inclusive: true|false }.
//   „Stand nach Spieltag“: inclusive, Datum = letztes Datum des Spieltags (asOfAfterMatchday).
//   „Vorhersage eines Spieltags“: exclusive, Datum = erstes Datum des Spieltags (asOfBeforeMatchday).
//   Die Spieltagsnummer wird nur nachgeschlagen, um ein Datum zu bestimmen, nie als Zeitachse verwendet.
//
// Ausschluss (D4): gameOrderOfDay === null (oder nicht 1/2) → ganze Zeile aus dem M1-Fit; nie als „1. Spiel“ gelesen.
// Bootstrap: seeded, auf SPIELEBENE (beide Zeilen eines Spiels immer gemeinsam), 90-%-Perzentilintervall,
// beide Stufen werden in jedem gültigen Refit neu geschätzt, Hyperparameter und T_ref bleiben fest.

import * as S from './stats.mjs';

/** Platzhalter-Standardwerte (KEINE abgestimmten Hyperparameter). minGamesWarning = Warnschwelle, konfigurierbar. */
export const DEFAULTS = Object.freeze({ halfLifeDays: 365, ridge: 1, minGamesWarning: 6 });
/** Namen der Konfigurationswerte, die ausdrücklich unabgestimmte Platzhalter sind. */
export const PLACEHOLDER_OPTIONS = Object.freeze(['halfLifeDays', 'ridge']);

// ─────────────────────────────────────────────────────────────────────────
// Datum und Gewichte
// ─────────────────────────────────────────────────────────────────────────

/** Tage seit 1970-01-01 (UTC) für 'YYYY-MM-DD'; ungültige Datumsangaben → NumericError. */
export function dayNumber(iso) {
  if (typeof iso !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(iso)) throw new S.NumericError('invalid-input', `Datum im Format YYYY-MM-DD erwartet: ${String(iso)}`);
  const [y, m, d] = iso.split('-').map(Number);
  const ms = Date.UTC(y, m - 1, d);
  if (new Date(ms).toISOString().slice(0, 10) !== iso) throw new S.NumericError('invalid-input', `ungültiges Datum: ${iso}`);
  return ms / 86400000;
}

/** Zeitgewicht 2^(−Alter/H) mit Alter in Tagen (referenceIso − dateIso); nicht normiert. */
export function timeWeight(dateIso, referenceIso, halfLifeDays) {
  if (!Number.isFinite(halfLifeDays) || halfLifeDays <= 0) throw new S.NumericError('invalid-input', 'halfLifeDays muss endlich und > 0 sein');
  return 2 ** (-(dayNumber(referenceIso) - dayNumber(dateIso)) / halfLifeDays);
}

/** Stufe des eigenen Kaders: 'le6' (≤ 6), '7to8' (Referenz), 'ge9' (≥ 9). */
export function kaderStage(fieldPlayerCount) {
  if (!Number.isFinite(fieldPlayerCount)) return null;
  return fieldPlayerCount <= 6 ? 'le6' : fieldPlayerCount >= 9 ? 'ge9' : '7to8';
}

const cmpStr = (a, b) => (a < b ? -1 : a > b ? 1 : 0);
/** Kanonische Zeilenordnung (Eingabereihenfolge darf das Ergebnis nicht beeinflussen). */
function compareRows(a, b) {
  return cmpStr(a.date, b.date) || cmpStr(String(a.startTime ?? ''), String(b.startTime ?? '')) || (Number(a.gameNumber) || 0) - (Number(b.gameNumber) || 0)
    || cmpStr(String(a.seasonKey), String(b.seasonKey)) || (Number(a.gameId) || 0) - (Number(b.gameId) || 0)
    || cmpStr(String(a.side), String(b.side)) || cmpStr(String(a.teamKey), String(b.teamKey));
}

/** Datumsschnitt für „Stand nach Spieltag“: inclusive, letztes Datum des Spieltags (Etikett → Datum, keine Zeitachse). */
export function asOfAfterMatchday(teamGames, seasonKey, matchdayNumber) {
  const dates = teamGames.filter((r) => r.seasonKey === seasonKey && r.matchdayNumber === matchdayNumber).map((r) => r.date).sort();
  return dates.length ? { date: dates[dates.length - 1], inclusive: true } : null;
}
/** Datumsschnitt für „Vorhersage eines Spieltags“: exclusive, erstes Datum des Spieltags. */
export function asOfBeforeMatchday(teamGames, seasonKey, matchdayNumber) {
  const dates = teamGames.filter((r) => r.seasonKey === seasonKey && r.matchdayNumber === matchdayNumber).map((r) => r.date).sort();
  return dates.length ? { date: dates[0], inclusive: false } : null;
}

// ─────────────────────────────────────────────────────────────────────────
// Konfiguration und Zeilenauswahl
// ─────────────────────────────────────────────────────────────────────────

function normalizeOptions(options = {}) {
  const halfLifeDays = options.halfLifeDays ?? DEFAULTS.halfLifeDays;
  const ridge = options.ridge ?? DEFAULTS.ridge;
  const minGamesWarning = options.minGamesWarning ?? DEFAULTS.minGamesWarning;
  if (!Number.isFinite(halfLifeDays) || halfLifeDays <= 0) throw new S.NumericError('invalid-input', 'halfLifeDays muss endlich und > 0 sein');
  if (!Number.isFinite(ridge) || ridge < 0) throw new S.NumericError('invalid-input', 'ridge muss endlich und ≥ 0 sein');
  if (!Number.isInteger(minGamesWarning) || minGamesWarning < 0) throw new S.NumericError('invalid-input', 'minGamesWarning muss eine ganze Zahl ≥ 0 sein');
  return { halfLifeDays, ridge, minGamesWarning };
}

function normalizeAsOf(asOf, rows) {
  if (asOf === undefined || asOf === null) {
    const dates = rows.map((r) => r.date).sort();
    return { date: dates.length ? dates[dates.length - 1] : null, inclusive: true, source: 'latest' };
  }
  dayNumber(asOf.date);
  if (asOf.inclusive !== undefined && typeof asOf.inclusive !== 'boolean') throw new S.NumericError('invalid-input', 'asOf.inclusive muss true oder false sein');
  return { date: asOf.date, inclusive: asOf.inclusive ?? true, source: 'given' };
}

/** Zulässige Zeilen im Datumsschnitt; Ausschlüsse werden gezählt (nichts wird still korrigiert). */
function selectRows(teamGames, asOf) {
  const sorted = [...teamGames].sort(compareRows);
  const inside = (r) => (asOf.inclusive ? r.date <= asOf.date : r.date < asOf.date);
  const inCutoff = asOf.date === null ? [] : sorted.filter(inside);
  const eligible = [];
  const orderNullBySeason = {};
  let orderNull = 0;
  let invalid = 0;
  for (const r of inCutoff) {
    const order = r.derived?.gameOrderOfDay;
    if (order === null || order === undefined) { orderNull++; orderNullBySeason[r.seasonKey] = (orderNullBySeason[r.seasonKey] || 0) + 1; continue; }
    if (order !== 1 && order !== 2) { invalid++; continue; }
    if (!Number.isFinite(r.goalsFor) || r.goalsFor < 0 || !Number.isFinite(r.fieldPlayerCount) || typeof r.teamKey !== 'string' || typeof r.opponentKey !== 'string') { invalid++; continue; }
    eligible.push(r);
  }
  return { sorted, inCutoff, eligible, orderNull, orderNullBySeason, invalid };
}

/** Kovariaten der Stufe 1 (nur der EIGENE Kader und die eigene Reihenfolge der Zeile). */
function covariateSpecs() {
  return [
    { name: 'order', value: (r) => (r.derived.gameOrderOfDay === 2 ? 1 : 0) },
    { name: 'le6', value: (r) => (r.fieldPlayerCount <= 6 ? 1 : 0) },
    { name: 'ge9', value: (r) => (r.fieldPlayerCount >= 9 ? 1 : 0) },
  ];
}

const isTeamParam = (name) => name.startsWith('attack:') || name.startsWith('defense:');
const hostFlag = (r) => (r.derived?.isHostingTeam === true ? 1 : r.derived?.isHostingTeam === false ? 0 : null);

// ─────────────────────────────────────────────────────────────────────────
// Fit (beide Stufen)
// ─────────────────────────────────────────────────────────────────────────

function emptyResult(asOf, ctx, sel, reason) {
  return {
    model: 'M1-team-strength-O2', estimable: false, reason, options: { ...ctx, placeholders: [...PLACEHOLDER_OPTIONS] },
    asOf: { date: asOf.date, inclusive: asOf.inclusive }, asOfGameDate: null, games: 0,
    leagueAvgGoalsPerTeamGame: null, weightedLeagueAvgGoalsPerTeamGame: null,
    stage1: { estimable: false, converged: false, mu: null, effects: { order: null, fieldPlayers: { le6: null, '7to8': 0, ge9: null } }, teams: [], columns: [], droppedEffects: [] },
    stage2: { estimable: false, reason: 'no-rows', betaHost: null, rows: { host: 0, notHost: 0, unknownExcluded: 0 } },
    warnings: [{ code: 'empty-asof', reason }, ...selectionWarnings(sel)],
    quality: { rows: { input: sel.sorted.length, inCutoff: sel.inCutoff.length, excludedOrderNull: sel.orderNull, excludedInvalid: sel.invalid, inFit: 0 }, hostDistribution: { true: 0, false: 0, null: 0 }, weights: null, orderNullBySeason: sel.orderNullBySeason },
  };
}
function selectionWarnings(sel) {
  const out = [];
  for (const season of Object.keys(sel.orderNullBySeason).sort()) out.push({ code: 'order-null-excluded', seasonKey: season, count: sel.orderNullBySeason[season] });
  if (sel.invalid > 0) out.push({ code: 'invalid-rows-excluded', count: sel.invalid });
  return out;
}

/** Kern: Fit beider Stufen auf bereits ausgewählten (zulässigen) Zeilen. `ctx` = { halfLifeDays, ridge, minGamesWarning, referenceDate }. */
function fitCore(rowsIn, ctx, asOf, sel) {
  const rows = [...rowsIn].sort(compareRows);
  if (rows.length === 0) return emptyResult(asOf, ctx, sel, sel.inCutoff.length === 0 ? 'no-rows-in-cutoff' : 'no-eligible-rows');
  const n = rows.length;
  const weights = rows.map((r) => timeWeight(r.date, ctx.referenceDate, ctx.halfLifeDays));
  const teams = [...new Set(rows.flatMap((r) => [r.teamKey, r.opponentKey]))].sort();
  const T = teams.length;
  const ti = Object.fromEntries(teams.map((k, i) => [k, i]));
  const warnings = selectionWarnings(sel);

  // Kovariaten ohne Variation (nur Nullen bzw. nur Einsen) sind gegen den Achsenabschnitt nicht schätzbar → entfernen und warnen
  const specs = covariateSpecs();
  const kept = [];
  const dropped = [];
  for (const spec of specs) {
    const ones = rows.reduce((s, r) => s + spec.value(r), 0);
    if (ones === 0 || ones === n) { dropped.push({ effect: spec.name, reason: 'no-variation' }); warnings.push({ code: 'effect-not-estimable', effect: spec.name, reason: 'no-variation' }); } else kept.push(spec);
  }
  const names = ['mu', ...teams.map((k) => `attack:${k}`), ...teams.map((k) => `defense:${k}`), ...kept.map((s) => s.name)];
  const X = rows.map((r) => {
    const row = new Array(names.length).fill(0);
    row[0] = 1;
    row[1 + ti[r.teamKey]] = 1;
    row[1 + T + ti[r.opponentKey]] = -1;
    kept.forEach((spec, j) => { row[1 + 2 * T + j] = spec.value(r); });
    return row;
  });
  const penalty = names.map((name) => (isTeamParam(name) ? ctx.ridge : 0));
  const y = rows.map((r) => r.goalsFor);

  const hostDistribution = { true: 0, false: 0, null: 0 };
  for (const r of rows) hostDistribution[String(hostFlag(r) === 1 ? true : hostFlag(r) === 0 ? false : null)]++;
  const games = {};
  for (const r of rows) games[r.teamKey] = (games[r.teamKey] || 0) + 1;
  const weighted = {};
  rows.forEach((r, i) => { weighted[r.teamKey] = (weighted[r.teamKey] || 0) + weights[i]; });
  const wsum = S.sum(weights);
  const quality = {
    rows: { input: sel.sorted.length, inCutoff: sel.inCutoff.length, excludedOrderNull: sel.orderNull, excludedInvalid: sel.invalid, inFit: n },
    hostDistribution, weights: { min: Math.min(...weights), max: Math.max(...weights), sum: wsum }, orderNullBySeason: sel.orderNullBySeason,
  };
  const base = {
    model: 'M1-team-strength-O2', options: { halfLifeDays: ctx.halfLifeDays, ridge: ctx.ridge, minGamesWarning: ctx.minGamesWarning, placeholders: [...PLACEHOLDER_OPTIONS] },
    asOf: { date: asOf.date, inclusive: asOf.inclusive }, asOfGameDate: rows[rows.length - 1].date, games: n,
    leagueAvgGoalsPerTeamGame: S.sum(y) / n, weightedLeagueAvgGoalsPerTeamGame: S.sum(y.map((v, i) => v * weights[i])) / wsum,
  };
  const fail = (reason) => ({
    ...base, estimable: false, reason,
    stage1: { estimable: false, converged: false, reason, mu: null, effects: { order: null, fieldPlayers: { le6: null, '7to8': 0, ge9: null } }, teams: [], columns: names, droppedEffects: dropped },
    stage2: { estimable: false, reason: 'stage1-not-estimable', betaHost: null, rows: { host: 0, notHost: 0, unknownExcluded: 0 } },
    warnings: [...warnings, { code: 'stage1-not-estimable', reason }], quality,
  });

  // ── Stufe 1 ──
  let f1;
  try {
    f1 = S.fitPoissonRegression({ X, y, weights, penalty });
  } catch (e) {
    if (e instanceof S.NumericError) return fail(e.code);
    throw e;
  }
  if (!f1.converged) warnings.push({ code: 'stage1-not-converged', reason: f1.reason });
  const beta = Object.fromEntries(names.map((name, i) => [name, f1.beta[i]]));
  const eta1 = X.map((row) => S.sum(row.map((v, j) => v * f1.beta[j])));
  const teamRows = teams.map((k) => ({ teamKey: k, attack: beta[`attack:${k}`], defense: beta[`defense:${k}`], games: games[k] || 0, weightedGames: weighted[k] || 0 }));
  for (const t of teamRows) if (t.games < ctx.minGamesWarning) warnings.push({ code: 'thin-data', teamKey: t.teamKey, games: t.games, threshold: ctx.minGamesWarning });
  const effect = (name) => (name in beta ? beta[name] : null);

  // ── Stufe 2 (nur bekannte Host-Zeilen, Stufe-1-Linearprädiktor als Offset) ──
  const known = rows.map((r, i) => i).filter((i) => hostFlag(rows[i]) !== null);
  const nHost = known.filter((i) => hostFlag(rows[i]) === 1).length;
  const stage2 = { estimable: false, reason: null, betaHost: null, converged: false, rows: { host: nHost, notHost: known.length - nHost, unknownExcluded: n - known.length }, method: 'offset-poisson-without-intercept' };
  if (known.length === 0) stage2.reason = 'no-known-host-rows';
  else if (nHost === 0) stage2.reason = 'no-host-true-rows';
  else {
    const hostGoals = S.sum(known.filter((i) => hostFlag(rows[i]) === 1).map((i) => weights[i] * y[i]));
    if (hostGoals === 0) stage2.reason = 'host-rows-zero-goals';
    else {
      try {
        const f2 = S.fitPoissonRegression({ X: known.map((i) => [hostFlag(rows[i])]), y: known.map((i) => y[i]), offset: known.map((i) => eta1[i]), weights: known.map((i) => weights[i]) });
        stage2.converged = f2.converged;
        if (f2.converged) { stage2.estimable = true; stage2.betaHost = f2.beta[0]; } else stage2.reason = f2.reason;
      } catch (e) {
        if (!(e instanceof S.NumericError)) throw e;
        stage2.reason = e.code;
      }
    }
  }
  if (!stage2.estimable) warnings.push({ code: 'stage2-not-estimable', reason: stage2.reason });

  return {
    ...base, estimable: true, reason: null,
    stage1: {
      estimable: true, converged: f1.converged, iterations: f1.iterations, mu: beta.mu,
      effects: { order: effect('order'), fieldPlayers: { le6: effect('le6'), '7to8': 0, ge9: effect('ge9') } },
      teams: teamRows, columns: names, droppedEffects: dropped,
    },
    stage2, warnings, quality,
  };
}

/**
 * Fit des Teamstärke-Modells (Stufe 1 + Stufe 2) zu einem Datumsschnitt.
 * @param {object[]} teamGames  M0-teamGames (mehrere Saisons)
 * @param {{asOf?:{date:string, inclusive?:boolean}, halfLifeDays?:number, ridge?:number, minGamesWarning?:number}} [options]
 *   asOf fehlt → alle Zeilen (inclusive am letzten Datum). halfLifeDays/ridge sind unabgestimmte Platzhalter.
 */
export function fitTeamStrength(teamGames, options = {}) {
  const prep = prepare(teamGames, options);
  return fitCore(prep.sel.eligible, prep.ctx, prep.asOf, prep.sel);
}

function prepare(teamGames, options) {
  if (!Array.isArray(teamGames)) throw new S.NumericError('invalid-input', 'teamGames muss ein Array sein');
  const cfg = normalizeOptions(options);
  const asOf = normalizeAsOf(options.asOf, teamGames);
  const sel = selectRows(teamGames, asOf);
  return { ctx: { ...cfg, referenceDate: asOf.date }, asOf, sel };
}

// ─────────────────────────────────────────────────────────────────────────
// Vorhersage eines Duells
// ─────────────────────────────────────────────────────────────────────────

/**
 * Erwartete Tore, W/D/L und erwartete Tordifferenz für ein Duell. Pflichtangaben: teamA, teamB, orderA/orderB (1 oder 2),
 * fieldPlayersA/fieldPlayersB (Anzahl Feldspieler des EIGENEN Teams). hostA/hostB: true | false | null (Standard null).
 * Unbekannter Host (null) und false lassen λ_Stufe1 unverändert; nur hostX === true multipliziert mit exp(β_host).
 * Teams ohne Daten im Fit erhalten attack = defense = 0 (Ligaschnitt) und stehen in `newTeams`.
 */
export function predictDuel(result, spec) {
  if (!result.estimable || !result.stage1.estimable) return { available: false, reason: result.reason ?? 'stage1-not-estimable' };
  for (const key of ['teamA', 'teamB']) if (typeof spec[key] !== 'string') throw new S.NumericError('invalid-input', `${key} fehlt`);
  for (const key of ['orderA', 'orderB']) if (spec[key] !== 1 && spec[key] !== 2) throw new S.NumericError('invalid-input', `${key} muss 1 oder 2 sein`);
  for (const key of ['fieldPlayersA', 'fieldPlayersB']) if (!Number.isFinite(spec[key])) throw new S.NumericError('invalid-input', `${key} muss eine Zahl sein`);
  const hosts = { A: spec.hostA ?? null, B: spec.hostB ?? null };
  for (const k of ['A', 'B']) if (hosts[k] !== true && hosts[k] !== false && hosts[k] !== null) throw new S.NumericError('invalid-input', `host${k} muss true, false oder null sein`);
  const byKey = Object.fromEntries(result.stage1.teams.map((t) => [t.teamKey, t]));
  const newTeams = [spec.teamA, spec.teamB].filter((k) => !(k in byKey));
  const val = (k, field) => (k in byKey ? byKey[k][field] : 0);
  const eff = result.stage1.effects;
  const own = (order, fp) => (order === 2 ? eff.order ?? 0 : 0) + (kaderStage(fp) === 'le6' ? eff.fieldPlayers.le6 ?? 0 : kaderStage(fp) === 'ge9' ? eff.fieldPlayers.ge9 ?? 0 : 0);
  const eta = (a, b, order, fp) => result.stage1.mu + val(a, 'attack') - val(b, 'defense') + own(order, fp);
  const stage1 = { a: Math.exp(eta(spec.teamA, spec.teamB, spec.orderA, spec.fieldPlayersA)), b: Math.exp(eta(spec.teamB, spec.teamA, spec.orderB, spec.fieldPlayersB)) };
  const factor = (h) => (h === true && result.stage2.estimable ? Math.exp(result.stage2.betaHost) : 1);
  const final = { a: stage1.a * factor(hosts.A), b: stage1.b * factor(hosts.B) };
  const hostEffectUnavailable = (hosts.A === true || hosts.B === true) && !result.stage2.estimable;
  const outcome = S.matchOutcomeProbabilities(final.a, final.b);
  return {
    available: true, teamA: spec.teamA, teamB: spec.teamB, newTeams, hostEffectUnavailable,
    lambdaStage1: stage1, lambdaFinal: final, expectedGoals: { a: final.a, b: final.b },
    wdl: { win: outcome.win, draw: outcome.draw, loss: outcome.loss }, expectedGoalDifference: final.a - final.b, residualMass: outcome.residualMass,
  };
}

// ─────────────────────────────────────────────────────────────────────────
// Bootstrap auf Spielebene
// ─────────────────────────────────────────────────────────────────────────

/** Spiel-Einheiten: alle zulässigen Zeilen desselben Spiels (normalerweise beide Teamzeilen) gemeinsam. */
export function gameUnits(rows) {
  const map = new Map();
  for (const r of [...rows].sort(compareRows)) {
    const key = `${r.seasonKey}#${r.gameId}`;
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(r);
  }
  return [...map.entries()].sort((x, y) => cmpStr(x[0], y[0])).map(([, list]) => list);
}

/** Schlüsselreihenfolge des Schätzvektors (aus dem Originalfit) und Werteauslese aus einem Fit. */
function vectorLayout(fit) {
  const keys = ['mu'];
  for (const name of ['order', 'le6', 'ge9']) {
    const v = name === 'order' ? fit.stage1.effects.order : fit.stage1.effects.fieldPlayers[name];
    if (v !== null) keys.push(name);
  }
  if (fit.stage2.estimable) keys.push('betaHost');
  for (const t of fit.stage1.teams) keys.push(`attack:${t.teamKey}`, `defense:${t.teamKey}`);
  return keys;
}
function vectorValue(fit, key) {
  if (key === 'mu') return fit.stage1.mu;
  if (key === 'order') return fit.stage1.effects.order;
  if (key === 'le6' || key === 'ge9') return fit.stage1.effects.fieldPlayers[key];
  if (key === 'betaHost') return fit.stage2.betaHost;
  const [kind, team] = [key.slice(0, key.indexOf(':')), key.slice(key.indexOf(':') + 1)];
  const t = fit.stage1.teams.find((x) => x.teamKey === team);
  return t ? t[kind] : 0; // Team in der Stichprobe nicht vorhanden → Schrumpfziel 0 (Ligaschnitt)
}

/**
 * Fit plus seeded 90-%-Bootstrap auf SPIELEBENE. Pro Wiederholung werden Spiele mit Zurücklegen gezogen (beide Zeilen eines
 * Spiels gemeinsam) und BEIDE Stufen neu geschätzt; halfLifeDays, ridge und T_ref bleiben fest. Refits, in denen eine im
 * Originalfit vorhandene Größe nicht schätzbar ist oder Stufe 1 nicht konvergiert, gelten als fehlgeschlagen (Regel von
 * stats.seededBootstrap). Ist der Originalfit nicht schätzbar, ist `bootstrap.available` false.
 * @param {object[]} teamGames
 * @param {object} options wie fitTeamStrength plus { replicates (Pflicht, konfigurierbar), seed (Pflicht), level = 0.90,
 *   maxFailedFraction (Standard von stats), keepReplicates = false }
 */
export function bootstrapTeamStrength(teamGames, options = {}) {
  const prep = prepare(teamGames, options);
  const original = fitCore(prep.sel.eligible, prep.ctx, prep.asOf, prep.sel);
  if (!original.estimable) return { ...original, bootstrap: { available: false, reason: original.reason } };
  const units = gameUnits(prep.sel.eligible);
  const layout = vectorLayout(original);
  const refit = (sample) => {
    const fit = fitCore(sample.flat(), prep.ctx, prep.asOf, prep.sel);
    if (!fit.estimable || !fit.stage1.converged) throw new S.NumericError('not-positive-definite', 'Refit nicht schätzbar');
    const out = layout.map((key) => vectorValue(fit, key));
    if (out.some((v) => v === null)) throw new S.NumericError('not-positive-definite', 'Refit: Größe nicht schätzbar');
    return out;
  };
  const args = { data: units, refit, replicates: options.replicates, seed: options.seed };
  if (options.level !== undefined) args.level = options.level;
  if (options.maxFailedFraction !== undefined) args.maxFailedFraction = options.maxFailedFraction;
  const bs = S.seededBootstrap(args);
  const at = (key) => bs.intervals[layout.indexOf(key)];
  const optional = (key) => (layout.includes(key) ? at(key) : null);
  const intervals = {
    mu: at('mu'), order: optional('order'), fieldPlayers: { le6: optional('le6'), ge9: optional('ge9') }, betaHost: optional('betaHost'),
    teams: original.stage1.teams.map((t) => ({ teamKey: t.teamKey, attack: at(`attack:${t.teamKey}`), defense: at(`defense:${t.teamKey}`) })),
  };
  const bootstrap = { available: true, unit: 'game', games: units.length, level: bs.level, replicates: bs.replicates, seed: bs.seed, failedReplicates: bs.failedReplicates, keys: layout, intervals };
  if (options.keepReplicates) bootstrap.replicateEstimates = bs.estimates;
  return { ...original, bootstrap };
}

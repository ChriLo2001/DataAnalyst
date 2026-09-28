// M2 · Torschützen-Qualität (P3 Runde 2) — Node/Dry-Run, KEINE Persistenz, KEINE UI.
//
// Eingabe: M0-Arrays `{ teamGames, goalEvents, rosterEntries }` (scripts/model/normalize.mjs), beliebig viele Saisons.
// Ausgabe: ungerundete Zahlen (Rundung erst an der Ausgabegrenze, siehe stats.roundOutput). Reine Funktionen, deterministisch.
//
// ── Modell (Owner-Entscheidungen O1–O6 zu M2) ───────────────────────────────────────────────────────────────
// Einheit = Feldspieler (Identität ausschließlich `playerId`). Ein Kaderplatz (rosterEntries-Zeile mit isGoalie === false und
// gültiger playerId in einem Modellspiel) ist genau EIN Spieler-Spiel (Kaderpräsenz, NICHT Einsatzzeit; es gibt keine Eiszeit).
// Zeitgewicht wie M1: w = 2^(−(T_ref − Datum)/H) mit T_ref = asOf.date und H = M1-Platzhalter (365 Tage, unabgestimmt);
// nur Spiele im asOf-Schnitt (inclusive/exclusive wie M1) fließen ein — Spielerwerte UND Prior. Pseudo-Spiele-Modell P
// (siehe stats.mjs, Abschnitt 8) je Zielvariable:
//   count = Σ w·y,  exposure = Σ w,  Prior = estimateGammaPrior(alle Feldspieler im Fenster),  Posterior = Gamma(α + count, β + exposure).
// Drei Zielvariablen mit DREI getrennten Priors: goals, assists, points (= goals + assists je Spieler-Spiel).
// `games` = Anzahl Kaderspiele im Fenster (ungewichtet), `goals`/`assists`/`points` = ungewichtete Summen über diese Spiele.
// `…PerGameRaw` = ungewichtete Rohquote = Summe / games (NICHT weightedCount/weightedExposure — das Pseudo-Spiele-Paar dient
// ausschließlich der Prior-/Posterior-Schätzung und steht als `weightedExposure` separat im Output). `…PerGameShrunk` = Posterior-
// Mittel aus dem Pseudo-Spiele-Modell. ci90 = Posterior [q05, q95] ohne Prior-Unsicherheit.
// Stufen je Zielvariable auf der ungerundeten geschrumpften Quote: top (> q80), weak (< q20), sonst middle; q20/q80 = Quantil Typ 7
// aus stats.quantile über ALLE schätzbaren Spieler im Fenster (keine Mindestgröße, keine Mindest-Exposure — O2); Gleichstand an
// der Grenze = middle, KEIN Tie-Break.
//
// Tore/Assists (nur aus goalEvents; penaltyShotEvents werden nie gelesen, sie sind dieselben Ereignisse):
//   • Eigentor (isOwnGoal) und not_assigned: kein Spielertor, kein Assist.
//   • Strafschuss-Tore (isPenaltyShot) sind normale Tore (genau einmal gezählt).
//   • assistKind 'player' → 1 Assist für den Assistgeber, sofern er einen Feldspieler-Kaderplatz in diesem Spiel hat; 'none' → 0;
//     'placeholder'/'unmatched' → kein Assist. Assists von Goalies werden keinem Feldspieler zugerechnet (gezählt und gewarnt).
//   • Nichts wird imputiert; nicht zuordenbare Tore/Assists werden gezählt und als Warnung ausgegeben.
// Nicht schätzbare Zustände (Prior oder Spieler) sind GÜLTIGE Ergebnisse: Felder null + status/warnings, nie NaN/Infinity, nie Clamping.
// Nicht enthalten: Gegnerbereinigung, Heißphase (M8), Persistenz, UI.

import * as S from './stats.mjs';
import { DEFAULTS as M1_DEFAULTS, dayNumber, timeWeight } from './team-strength.mjs';

/** Platzhalter-Standardwert: derselbe unabgestimmte H wie M1 (Abstimmung erst über M9). */
export const DEFAULTS = Object.freeze({ halfLifeDays: M1_DEFAULTS.halfLifeDays });
/** Namen der Konfigurationswerte, die ausdrücklich unabgestimmte Platzhalter sind. */
export const PLACEHOLDER_OPTIONS = Object.freeze(['halfLifeDays']);
/** Zielvariablen; jede hat einen eigenen Gamma-Prior. */
export const TARGETS = Object.freeze(['goals', 'assists', 'points']);

const cmp = (a, b) => (a < b ? -1 : a > b ? 1 : 0);
const validId = (x) => typeof x === 'number' && Number.isFinite(x);
const gameKey = (seasonKey, gameId) => `${seasonKey}#${gameId}`;
const rowKey = (gk, playerId) => `${gk}#${playerId}`;

// ─────────────────────────────────────────────────────────────────────────
// Konfiguration, Zeitachse (M1: dayNumber, timeWeight; asOf = { date, inclusive })
// ─────────────────────────────────────────────────────────────────────────

function normalizeOptions(options) {
  const halfLifeDays = options.halfLifeDays ?? DEFAULTS.halfLifeDays;
  if (!Number.isFinite(halfLifeDays) || halfLifeDays <= 0) throw new S.NumericError('invalid-input', 'halfLifeDays muss endlich und > 0 sein');
  return { halfLifeDays };
}

/** Spieldatum je Spiel (Text 'YYYY-MM-DD'); undefined = Spiel unbekannt, null = ungültiges oder widersprüchliches Datum. */
function buildGameDates(teamGames) {
  const dates = new Map();
  for (const t of [...teamGames].sort((a, b) => cmp(String(a.seasonKey), String(b.seasonKey)) || cmp(Number(a.gameId), Number(b.gameId)) || cmp(String(a.side), String(b.side)))) {
    const key = gameKey(t.seasonKey, t.gameId);
    let date = null;
    try { dayNumber(t.date); date = t.date; } catch (e) { if (!(e instanceof S.NumericError)) throw e; }
    if (!dates.has(key)) dates.set(key, date);
    else if (dates.get(key) !== date) dates.set(key, null);
  }
  return dates;
}

function normalizeAsOf(asOf, gameDates) {
  if (asOf === undefined || asOf === null) {
    const valid = [...gameDates.values()].filter((d) => d !== null).sort();
    return { date: valid.length ? valid[valid.length - 1] : null, inclusive: true, source: 'latest' };
  }
  dayNumber(asOf.date);
  if (asOf.inclusive !== undefined && typeof asOf.inclusive !== 'boolean') throw new S.NumericError('invalid-input', 'asOf.inclusive muss true oder false sein');
  return { date: asOf.date, inclusive: asOf.inclusive ?? true, source: 'given' };
}

// ─────────────────────────────────────────────────────────────────────────
// Stufen
// ─────────────────────────────────────────────────────────────────────────

/**
 * Stufen aus ungerundeten Werten: q20/q80 = Quantil Typ 7 (`stats.quantile`); value > q80 → 'top', value < q20 → 'weak', sonst 'middle'.
 * Gleichstand an q20/q80 → 'middle'; kein Tie-Break. Werte: nicht leeres Array endlicher Zahlen (sonst NumericError aus `quantile`).
 * @returns {{q20:number, q80:number, tiers:string[]}} tiers in Eingabereihenfolge
 */
export function assignTiers(values) {
  const q20 = S.quantile(values, 0.2);
  const q80 = S.quantile(values, 0.8);
  return { q20, q80, tiers: values.map((v) => (v > q80 ? 'top' : v < q20 ? 'weak' : 'middle')) };
}

// ─────────────────────────────────────────────────────────────────────────
// Fit
// ─────────────────────────────────────────────────────────────────────────

const newQuality = () => ({
  roster: { inWindow: 0, afterAsOf: 0, missingDate: 0, invalidDate: 0, goalieExcluded: 0, invalidGoalieFlag: 0, noPlayerId: 0, duplicate: 0, playerGames: 0 },
  goals: { events: 0, own: 0, notAssigned: 0, attributed: 0, penaltyShot: 0, withoutPlayerRow: 0, unmatched: 0 },
  assists: { attributed: 0, none: 0, placeholder: 0, unmatched: 0, byGoalie: 0, withoutPlayerRow: 0, unknownKind: 0 },
});

/**
 * M2-Fit für einen Datumsschnitt.
 * @param {{teamGames:object[], goalEvents:object[], rosterEntries:object[]}} data M0-Arrays (alle Saisons zusammen)
 * @param {{asOf?:{date:string, inclusive?:boolean}, halfLifeDays?:number}} [options]
 *   asOf fehlt → alle Spiele (inclusive am letzten Datum), wie M1. Spieltag-Etiketten werden vorher über M1
 *   (asOfAfterMatchday/asOfBeforeMatchday) in ein Datum übersetzt. halfLifeDays ist ein unabgestimmter Platzhalter.
 * @returns {object} { model, status: 'ok'|'partial'|'not-estimable'|'empty', asOf, asOfGameDate, options, players[], priors, tiers, quality, warnings }
 *   Spieler sortiert nach playerId (aufsteigend). Ungültige Optionen/Eingabe-Arrays → NumericError; Datenprobleme → warnings.
 */
export function fitShooterQuality(data, options = {}) {
  if (!data || !Array.isArray(data.teamGames) || !Array.isArray(data.goalEvents) || !Array.isArray(data.rosterEntries)) {
    throw new S.NumericError('invalid-input', 'fitShooterQuality: { teamGames, goalEvents, rosterEntries } (M0-Arrays) erwartet');
  }
  const cfg = normalizeOptions(options);
  const gameDates = buildGameDates(data.teamGames);
  const asOf = normalizeAsOf(options.asOf, gameDates);
  const inWindow = (date) => asOf.date !== null && (asOf.inclusive ? date <= asOf.date : date < asOf.date);
  const q = newQuality();

  // 1. Spieler-Spiel-Zeilen (Kaderplatz = 1 Exposure-Spiel, je Spiel und playerId höchstens eine Zeile)
  const rowsByKey = new Map();
  const goalieKeys = new Set();
  const rows = [];
  const rosterOrder = (a, b) => cmp(String(a.seasonKey), String(b.seasonKey)) || cmp(Number(a.gameId), Number(b.gameId)) || cmp(String(a.side), String(b.side))
    || cmp(String(a.teamKey), String(b.teamKey)) || cmp(Number(a.playerId), Number(b.playerId)) || cmp(String(a.playerName ?? ''), String(b.playerName ?? ''));
  for (const r of [...data.rosterEntries].sort(rosterOrder)) {
    const gk = gameKey(r.seasonKey, r.gameId);
    const date = gameDates.get(gk);
    if (date === undefined) { q.roster.missingDate++; continue; }
    if (date === null) { q.roster.invalidDate++; continue; }
    if (!inWindow(date)) { q.roster.afterAsOf++; continue; }
    q.roster.inWindow++;
    if (r.isGoalie === true) {
      q.roster.goalieExcluded++;
      if (validId(r.playerId)) goalieKeys.add(rowKey(gk, r.playerId));
      continue;
    }
    if (r.isGoalie !== false) { q.roster.invalidGoalieFlag++; continue; }
    if (!validId(r.playerId)) { q.roster.noPlayerId++; continue; }
    const rk = rowKey(gk, r.playerId);
    if (rowsByKey.has(rk)) { q.roster.duplicate++; continue; }
    const row = { gk, seasonKey: r.seasonKey, gameId: r.gameId, side: r.side, teamKey: r.teamKey, playerId: r.playerId, name: r.playerName, date, goals: 0, assists: 0 };
    rowsByKey.set(rk, row);
    rows.push(row);
  }
  q.roster.playerGames = rows.length;

  // 2. Tore und Assists (nur goalEvents; jedes Ereignis genau einmal)
  for (const e of data.goalEvents) {
    const gk = gameKey(e.seasonKey, e.gameId);
    const date = gameDates.get(gk);
    if (typeof date !== 'string' || !inWindow(date)) continue;
    q.goals.events++;
    const d = e.derived ?? {};
    if (e.isOwnGoal === true) { q.goals.own++; continue; }
    if (e.isNotAssigned === true) { q.goals.notAssigned++; continue; }
    if (d.scorerMatch === 'roster') {
      const row = validId(d.scorerPlayerId) ? rowsByKey.get(rowKey(gk, d.scorerPlayerId)) : undefined;
      if (row) {
        row.goals++;
        q.goals.attributed++;
        if (e.isPenaltyShot === true) q.goals.penaltyShot++;
      } else q.goals.withoutPlayerRow++;
    } else q.goals.unmatched++;
    if (d.assistKind === 'player') {
      const row = validId(d.assistPlayerId) ? rowsByKey.get(rowKey(gk, d.assistPlayerId)) : undefined;
      if (row) { row.assists++; q.assists.attributed++; }
      else if (validId(d.assistPlayerId) && goalieKeys.has(rowKey(gk, d.assistPlayerId))) q.assists.byGoalie++;
      else q.assists.withoutPlayerRow++;
    } else if (d.assistKind === 'none') q.assists.none++;
    else if (d.assistKind === 'placeholder') q.assists.placeholder++;
    else if (d.assistKind === 'unmatched') q.assists.unmatched++;
    else q.assists.unknownKind++;
  }

  // 3. Aggregation je playerId (Zeilen in kanonischer Reihenfolge; Gewichte aus M1-timeWeight, ungerundet)
  rows.sort((a, b) => cmp(a.date, b.date) || cmp(String(a.seasonKey), String(b.seasonKey)) || cmp(Number(a.gameId), Number(b.gameId)) || cmp(String(a.side), String(b.side)) || cmp(a.playerId, b.playerId));
  const byPlayer = new Map();
  for (const row of rows) {
    const w = timeWeight(row.date, asOf.date, cfg.halfLifeDays);
    let p = byPlayer.get(row.playerId);
    if (!p) { p = { playerId: row.playerId, games: 0, goals: 0, assists: 0, w: [], wGoals: [], wAssists: [], wPoints: [], teamLast: new Map(), name: null, nameDate: null }; byPlayer.set(row.playerId, p); }
    p.games++;
    p.goals += row.goals;
    p.assists += row.assists;
    p.w.push(w);
    p.wGoals.push(w * row.goals);
    p.wAssists.push(w * row.assists);
    p.wPoints.push(w * (row.goals + row.assists));
    if (!p.teamLast.has(row.teamKey) || row.date > p.teamLast.get(row.teamKey)) p.teamLast.set(row.teamKey, row.date);
    if (typeof row.name === 'string' && row.name !== '' && (p.nameDate === null || row.date > p.nameDate || (row.date === p.nameDate && row.name < p.name))) { p.name = row.name; p.nameDate = row.date; }
  }
  const aggregates = [...byPlayer.values()].sort((a, b) => a.playerId - b.playerId).map((p) => ({
    playerId: p.playerId,
    name: p.name,
    teams: [...p.teamLast.entries()].sort((a, b) => cmp(b[1], a[1]) || cmp(a[0], b[0])).map(([teamKey]) => teamKey),
    games: p.games,
    goals: p.goals,
    assists: p.assists,
    points: p.goals + p.assists,
    exposure: S.sum(p.w),
    count: { goals: S.sum(p.wGoals), assists: S.sum(p.wAssists), points: S.sum(p.wPoints) },
  }));

  const options0 = { halfLifeDays: cfg.halfLifeDays, placeholders: [...PLACEHOLDER_OPTIONS] };
  const asOfOut = { date: asOf.date, inclusive: asOf.inclusive };
  const warnings = [];
  const qualityWarnings = () => {
    const out = [];
    const add = (code, count) => { if (count > 0) out.push({ code, count }); };
    add('roster-missing-date', q.roster.missingDate);
    add('roster-invalid-date', q.roster.invalidDate);
    add('roster-invalid-goalie-flag', q.roster.invalidGoalieFlag);
    add('roster-missing-player-id', q.roster.noPlayerId);
    add('roster-duplicate-row', q.roster.duplicate);
    add('goals-without-player-row', q.goals.withoutPlayerRow);
    add('goals-unmatched', q.goals.unmatched);
    add('assists-by-goalies-not-attributed', q.assists.byGoalie);
    add('assists-without-player-row', q.assists.withoutPlayerRow);
    add('assists-placeholder', q.assists.placeholder);
    add('assists-unmatched', q.assists.unmatched);
    add('assists-unknown-kind', q.assists.unknownKind);
    return out;
  };

  if (aggregates.length === 0) {
    const empty = () => ({ estimable: false, reason: 'no-data', alpha: null, beta: null, mean: null, tau2: null, n: 0, totalCount: 0, totalExposure: 0 });
    return {
      model: 'M2-shooter-quality', status: 'empty', asOf: asOfOut, asOfGameDate: null, options: options0, players: [],
      priors: { goals: empty(), assists: empty(), points: empty() },
      tiers: Object.fromEntries(TARGETS.map((t) => [t, { status: 'no-data', n: 0, q20: null, q80: null }])),
      quality: q,
      warnings: [{ code: 'empty-asof', reason: q.roster.inWindow === 0 ? 'no-rows-in-cutoff' : 'no-eligible-rows' }, ...qualityWarnings()],
    };
  }

  // 4. Priors (je Zielvariable getrennt, Grundgesamtheit = alle Feldspieler im Fenster) und Posteriors
  const priors = {};
  for (const t of TARGETS) {
    const obs = aggregates.map((p) => ({ count: p.count[t], exposure: p.exposure }));
    try {
      const pr = S.estimateGammaPrior(obs);
      priors[t] = { estimable: true, reason: null, alpha: pr.alpha, beta: pr.beta, mean: pr.mean, tau2: pr.tau2, n: pr.n, totalCount: pr.totalCount, totalExposure: pr.totalExposure };
    } catch (e) {
      if (!(e instanceof S.NumericError)) throw e;
      priors[t] = { estimable: false, reason: e.code, alpha: null, beta: null, mean: null, tau2: null, n: obs.length, totalCount: S.sum(obs.map((o) => o.count)), totalExposure: S.sum(obs.map((o) => o.exposure)) };
      warnings.push({ code: 'prior-not-estimable', target: t, reason: e.code });
    }
  }
  const post = {};
  for (const t of TARGETS) {
    post[t] = aggregates.map((p) => {
      if (!priors[t].estimable) return null;
      try { return S.gammaPoissonPosterior({ alpha: priors[t].alpha, beta: priors[t].beta, count: p.count[t], exposure: p.exposure }); } catch (e) { if (e instanceof S.NumericError) return null; throw e; }
    });
    const failed = priors[t].estimable ? post[t].filter((x) => x === null).length : 0;
    if (failed > 0) warnings.push({ code: 'player-not-estimable', target: t, count: failed });
  }

  // 5. Stufen je Zielvariable (nur schätzbare Spieler; ungerundete geschrumpfte Quote)
  const tiers = {};
  const tierOf = {};
  for (const t of TARGETS) {
    const idx = post[t].map((x, i) => (x === null ? -1 : i)).filter((i) => i >= 0);
    tierOf[t] = new Array(aggregates.length).fill(null);
    if (!priors[t].estimable) { tiers[t] = { status: 'prior-not-estimable', n: 0, q20: null, q80: null }; continue; }
    if (idx.length === 0) {
      // Prior schätzbar, aber kein einziger Spieler hat einen schätzbaren Posterior (z. B. adversarial exposure = 0 mit count > 0
      // bei einzelnen Spielern). Rein informativ: entfernt niemanden aus players[] (dort ist die Tier-Spalte ohnehin schon null).
      tiers[t] = { status: 'no-estimable-players', n: 0, q20: null, q80: null };
      continue;
    }
    const res = assignTiers(idx.map((i) => post[t][i].mean));
    idx.forEach((i, k) => { tierOf[t][i] = res.tiers[k]; });
    tiers[t] = { status: 'ok', n: idx.length, q20: res.q20, q80: res.q80 };
  }

  // 6. Ausgabe
  const players = aggregates.map((p, i) => {
    const raw = { goals: p.goals, assists: p.assists, points: p.points };
    const rate = (t) => raw[t] / p.games; // ungewichtete Rohquote = Summe / games (NICHT weightedCount/weightedExposure, siehe Kopfkommentar)
    const shrunk = (t) => (post[t][i] === null ? null : post[t][i].mean);
    const ci = (t) => (post[t][i] === null ? null : [...post[t][i].ci90]);
    return {
      playerId: p.playerId, name: p.name, teams: p.teams, games: p.games, weightedExposure: p.exposure,
      goals: p.goals, goalsPerGameRaw: rate('goals'), goalsPerGameShrunk: shrunk('goals'), goalsCi90: ci('goals'),
      assists: p.assists, assistsPerGameRaw: rate('assists'), assistsPerGameShrunk: shrunk('assists'), assistsCi90: ci('assists'),
      points: p.points, pointsPerGameRaw: rate('points'), pointsPerGameShrunk: shrunk('points'), pointsCi90: ci('points'),
      tier: tierOf.goals[i], assistsTier: tierOf.assists[i], pointsTier: tierOf.points[i],
    };
  });
  const nOk = TARGETS.filter((t) => priors[t].estimable).length;
  return {
    model: 'M2-shooter-quality',
    status: nOk === TARGETS.length ? 'ok' : nOk === 0 ? 'not-estimable' : 'partial',
    asOf: asOfOut, asOfGameDate: rows[rows.length - 1].date, options: options0, players, priors, tiers, quality: q,
    warnings: [...qualityWarnings(), ...warnings],
  };
}

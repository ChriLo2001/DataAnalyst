// M3 · Goalie-Bewertung (P3 Runde 1) — Node/Dry-Run, KEINE Persistenz, KEINE UI, KEINE Build-Integration.
//
// Eingabe: M0-Arrays `{ teamGames, goalEvents, rosterEntries }` (scripts/model/normalize.mjs), beliebig viele Saisons,
// plus die bereits vorhandenen öffentlichen Exporte aus `team-strength.mjs` (M1) und `shooter-quality.mjs` (M2).
// Ausgabe: ungerundete Zahlen (Rundung erst an der Ausgabegrenze, siehe stats.roundOutput). Reine Funktionen, deterministisch.
// KEINE Änderung an normalize.mjs, team-strength.mjs, shooter-quality.mjs oder stats.mjs. KEINE SG-/Vereinszuordnungslogik:
// `teamKey`/`teams[]` sind ausschließlich die tatsächliche Spielseite (Ebene 1), wie in M1/M2.
//
// ── Modell (Owner-Entscheidungen O-M3-1 bis O-M3-10) ────────────────────────────────────────────────────────────
//
// ZUORDNUNG (O-M3-2): Ein Kaderplatz `isGoalie === true` in einem Modellspiel wird über `teamGames[].goalieCount`
// derselben Saison/Spiel/Seite eingeteilt: `goalieCount === 1` → SOLO (zählt voll in allen individuellen Metriken),
// `goalieCount === 2` → SHARED (zählt ausschließlich als `sharedGames`-Zähler, KEIN Beitrag zu games/goalsAgainst/
// expectedGA/tve/tvePerGame/tveCI90/weakShooterGA/weakShooterGAExpected/Kontext-Splits), jeder andere Wert (0 oder
// > 2; in den echten Daten nicht beobachtet) → weder solo noch shared, nur gezählt/gewarnt. Nicht zu verwechseln mit
// M0s `isNotAssigned` bei Toren (andere Sache, andere Ebene — siehe `goalsAgainst`-Zählung unten).
//
// EXPECTED GA, NUR VARIANTE A (O-M3-1): Für ein Solo-Spiel des Goalies (eigenes Team X gegen Gegner O) ist
//   η_A = μ + attack[O] + β_order·O_i + β_le6·K6_i + β_ge9·K9_i + (β_host, falls O in diesem Spiel Ausrichter ist)
// mit O_i/K6_i/K9_i aus der EIGENEN Zeile des GEGNERS O in genau diesem Spiel (Gegner-Kontext, nicht der eigene).
// BEWUSST KEIN `defense[X]`-Term (anders als `predictDuel`, das für ein Duell A-vs-B immer `− defense[B]` enthält):
// laut Spezifikation ist „eigene Abwehr ohne Goalie-Anteil … nicht trennbar“ — genau das ist die Kennzahl, die TvE
// messen soll, sie darf nicht durch das Abziehen der bereits gefitteten Team-Abwehr vorab neutralisiert werden.
// `expectedGA = exp(η_A)`. Alle Werte (μ, attack, effects, betaHost) kommen unverändert aus den ÖFFENTLICHEN Feldern
// von `fitTeamStrength`/`bootstrapTeamStrength` (`result.stage1.*`, `result.stage2.*`) — keine neue Regression, keine
// Änderung an team-strength.mjs. Team ohne Eintrag im Fit → attack = 0 (Ligaschnitt, wie bei `predictDuel`).
//
// TvE (O-M3-1 Punkt 3): `tve = Σ (expectedGA_i − actualGA_i)` über die Solo-Spiele des Goalies (Neumaier-Summe).
// Positives TvE = weniger Gegentore als erwartet (gut). `tvePerGame = tve / games` (games = Anzahl Solo-Spiele).
//
// BOOTSTRAP (O-M3-7): AUSSCHLIESSLICH `bootstrapTeamStrength(teamGames, { asOf, replicates, seed, keepReplicates:
// true })` — keine eigene Refit-/Resampling-Logik. Einheit = ganze Liga-Spiele (`gameUnits`, beide Team-Seiten
// gemeinsam, M1s eigenes Bootstrap-Verfahren), weil `attack[O]` eine ligaweite Größe ist und ohne vollständigen
// M1-Refit pro Wiederholung nicht sinnvoll neu geschätzt werden kann. Für jedes Replikat wird aus dem von M1 bereits
// zurückgegebenen Koeffizientenvektor (`bootstrap.keys`/`bootstrap.replicateEstimates`) ein minimales Fit-Objekt
// rekonstruiert und dieselbe η_A-Formel auf die UNVERÄNDERTEN, echten Solo-Spiele des Goalies angewendet — nur die
// Koeffizienten variieren, nie die Spiele selbst. `tveCI90 = [quantile(0.05), quantile(0.95)]` der Replikat-TvE-Werte.
//
// SCHÜTZENQUALITÄT DER GEGENTORE (O-M3-8, O-M3-10): `fitShooterQuality(data, { asOf, halfLifeDays })` mit demselben
// `asOf` wie M1. `playerId → tier` aus `result.players[]`. Ein Gegentor ohne bestimmbaren Tier (kein Kaderplatz mit
// playerId, oder M2-Prior für Tore nicht schätzbar) zählt als `tierUnknown`, NIE als `weak` oder `top`, bleibt aber
// Teil von `goalsAgainst`. `weakShooterGA` = tatsächliche Anzahl `weak`-getierter Gegentore des Goalies (nur Solo-
// Spiele). `weakShooterGAExpected`: je Gegner-Team der `weak`-Anteil ALLER seiner zuordenbaren Tore im selben
// `asOf`-Fenster (unabhängig vom einzelnen Spiel, nicht ligaweit, nicht zirkulär), angewendet auf die tatsächlichen
// Gegentore je Spiel dieses Gegners gegen den Goalie, summiert.
//
// HALBZEIT (O-M3-9): ausschließlich `goalEvents[].period` (1/2) — robust gegenüber kumulierten Zeitformaten, in
// denen `absSec` allein die Halbzeit nicht mehr zuverlässig anzeigt. Rein deskriptiv (Rohzahlen je Halbzeit), kein
// halbzeitspezifisches Erwartungsmodell (das M1-Modell kennt keine Halbzeit-Rate — keine neue Kennzahl erfunden).
//
// GEGENTORE KURZ NACH EIGENEM TOR (O-M3-5): für jedes eigene Tor eines Solo-Spiels das CHRONOLOGISCH NÄCHSTE Tor-
// Ereignis desselben Spiels (Reihenfolge über `eventKey`s laufenden Index „<gameId>#<n>“ — quellgetreu, unabhängig
// von Eingabe-Array-Reihenfolge und unabhängig davon, ob `absSec` lesbar ist). Ist es ein Gegentor UND liegt die
// `absSec`-Differenz ≤ 60 s bzw. ≤ 120 s, zählt `within60`/`within120` (60 s ⊂ 120 s). Eigenes Tor oder nächstes Tor
// mit `absSec === null` → ausgeschlossen, gezählt/gewarnt, KEINE Schätzung. Kein nächstes Tor (letztes Tor des
// Spiels) oder nächstes Tor ist wieder ein eigenes Tor → keine Zählung, kein Fehlerfall. NICHT die alte
// `index.html`-Response-Momentum-Logik (andere Richtung, andere Fenster 120 s/300 s).
//
// KONTEXT-SPLITS (nur Solo-Spiele): `order1vs2` (eigene `derived.gameOrderOfDay`), `kaderStufe` (eigene
// `fieldPlayerCount` über `kaderStage` aus M1, le6/7to8/ge9), `hz1vsHz2` (rein deskriptiv, siehe oben),
// `concededShortlyAfterOwnGoal` (siehe oben). `shorthandedVsEqual` ist mit den vorhandenen, bereits abgeleiteten M0-
// Feldern NICHT robust bestimmbar (Unterzahl im Sinne einer Strafzeit-Situation zum Torzeitpunkt erfordert eine neue
// Verknüpfung von `penaltyEvents` und `absSec`, die M0 nicht bereitstellt und die hier NICHT neu erfunden wird) —
// bleibt bewusst `null`, mit Warnung, alle anderen Splits unabhängig davon berechnet.
//
// SICHTBARKEIT (O-M3-6): `assigned games` = Solo-Spiele. 0 Spiele: Goalie bleibt in `players[]`, alle numerischen
// Felder `null`, `confidence: 'insufficient'`. 1–3 Spiele: numerische Werte soweit berechenbar, `confidence:
// 'insufficient'`, nicht in `rankList`. ≥ 4 Spiele: `confidence: 'ok'`, kann in `rankList` stehen (zusätzlich nur,
// wenn `tve` tatsächlich nicht `null` ist).
//
// TEAM-HISTORIE (O-M3-3): Aggregation ausschließlich über `playerId`, `teams[]` = alle tatsächlichen `teamKey`s aus
// JEDER Kaderzeile im Fenster (solo, shared und sonstige), sortiert wie in M2 (letztes Datum absteigend, dann
// `teamKey` aufsteigend). Keine SG-Aufteilung, kein `statisticalClub`-Feld.
//
// HIGH-LEVERAGE-GA (O-M3-4): immer `null` (M6 existiert nicht), Warnung `high-leverage-not-available`.

import * as S from './stats.mjs';
import { fitTeamStrength, bootstrapTeamStrength, dayNumber, kaderStage } from './team-strength.mjs';
import { fitShooterQuality } from './shooter-quality.mjs';

/** Technisch feste Schwelle aus dem Akzeptanzkriterium der Spezifikation (kein Fachwert zur freien Wahl). */
export const MIN_GAMES_FOR_RANK = 4;
/** 90-%-Bootstrap-Niveau für `tveCI90` (fest, analog M1). */
export const BOOTSTRAP_LEVEL = 0.9;

const cmp = (a, b) => (a < b ? -1 : a > b ? 1 : 0);
const validId = (x) => typeof x === 'number' && Number.isFinite(x);
const gameKey = (seasonKey, gameId) => `${seasonKey}#${gameId}`;
const otherSide = (side) => (side === 'home' ? 'guest' : 'home');

// ─────────────────────────────────────────────────────────────────────────
// Zeitachse (identisches Muster zu shooter-quality.mjs; M1/M2 nicht verändert, nur wiederverwendbare Konvention)
// ─────────────────────────────────────────────────────────────────────────

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
// Variante-A-Erwartung (öffentlich testbar, kein Zugriff auf M1-Interna)
// ─────────────────────────────────────────────────────────────────────────

/**
 * Erwartete Gegentore (Variante A) für EIN Solo-Spiel: `opponentRow` ist die eigene teamGames-Zeile des GEGNERS in
 * genau diesem Spiel (liefert dessen `teamKey`, `derived.gameOrderOfDay`, `fieldPlayerCount`, `derived.isHostingTeam`).
 * `fit` ist ein M1-Fit-ähnliches Objekt mit `stage1.{mu, effects, teams}` und `stage2.{estimable, betaHost}` — sowohl
 * ein echtes `fitTeamStrength`-Ergebnis als auch ein aus einem Bootstrap-Replikat rekonstruiertes Objekt (siehe
 * `fitLikeFromReplicate`). BEWUSST kein `defense[eigenesTeam]`-Term (siehe Kopfkommentar). `MAX_LAMBDA`-Schutz wie
 * in stats.mjs: ein nicht endliches Ergebnis ist ein Fehler, kein stiller NaN/Infinity-Wert.
 * @returns {number} expectedGA, ungerundet, > 0
 */
export function expectedGoalsAgainst(fit, opponentRow) {
  if (!fit || !fit.stage1 || !Number.isFinite(fit.stage1.mu)) throw new S.NumericError('invalid-input', 'expectedGoalsAgainst: fit.stage1.mu fehlt oder nicht endlich');
  if (!opponentRow || typeof opponentRow.teamKey !== 'string') throw new S.NumericError('invalid-input', 'expectedGoalsAgainst: opponentRow.teamKey fehlt');
  const teamsByKey = Object.fromEntries((fit.stage1.teams || []).map((t) => [t.teamKey, t]));
  const attack = teamsByKey[opponentRow.teamKey]?.attack ?? 0;
  const eff = fit.stage1.effects || {};
  const order = opponentRow.derived?.gameOrderOfDay === 2 ? (eff.order ?? 0) : 0;
  const stage = kaderStage(opponentRow.fieldPlayerCount);
  const kader = stage === 'le6' ? (eff.fieldPlayers?.le6 ?? 0) : stage === 'ge9' ? (eff.fieldPlayers?.ge9 ?? 0) : 0;
  const eta = fit.stage1.mu + attack + order + kader;
  const hostTrue = opponentRow.derived?.isHostingTeam === true;
  const factor = hostTrue && fit.stage2?.estimable && Number.isFinite(fit.stage2.betaHost) ? Math.exp(fit.stage2.betaHost) : 1;
  const result = Math.exp(eta) * factor;
  if (!Number.isFinite(result) || result <= 0) throw new S.NumericError('non-finite', 'expectedGoalsAgainst: Ergebnis nicht endlich/positiv');
  return result;
}

/** Rekonstruiert ein minimales, mit `expectedGoalsAgainst` kompatibles Fit-Objekt aus einem Bootstrap-Replikat von `bootstrapTeamStrength`. */
function fitLikeFromReplicate(keys, vec) {
  const idx = Object.fromEntries(keys.map((k, i) => [k, i]));
  const teamKeys = new Set();
  for (const k of keys) if (k.startsWith('attack:')) teamKeys.add(k.slice('attack:'.length));
  const teams = [...teamKeys].sort().map((teamKey) => ({ teamKey, attack: vec[idx[`attack:${teamKey}`]], defense: vec[idx[`defense:${teamKey}`]] }));
  return {
    stage1: { mu: vec[idx.mu], effects: { order: idx.order !== undefined ? vec[idx.order] : null, fieldPlayers: { le6: idx.le6 !== undefined ? vec[idx.le6] : null, ge9: idx.ge9 !== undefined ? vec[idx.ge9] : null } }, teams },
    stage2: { estimable: idx.betaHost !== undefined, betaHost: idx.betaHost !== undefined ? vec[idx.betaHost] : null },
  };
}

// ─────────────────────────────────────────────────────────────────────────
// Gegentore kurz nach eigenem Tor (öffentlich testbar)
// ─────────────────────────────────────────────────────────────────────────

/** Chronologischer Index aus `eventKey` ("<gameId>#<n>"), quellgetreu, unabhängig von Eingabereihenfolge und `absSec`. */
function eventOrderIndex(e) {
  const m = /#(\d+)$/.exec(String(e?.eventKey ?? ''));
  if (!m) throw new S.NumericError('invalid-input', `eventOrderIndex: eventKey ohne laufenden Index: ${e?.eventKey}`);
  return Number(m[1]);
}

/**
 * Zählt für EIN Spiel (alle goalEvents dieses Spiels, beide Seiten) „Gegentore kurz nach eigenem Tor“ aus Sicht von
 * `ownSide`. Für jedes eigene Tor wird ausschließlich das chronologisch NÄCHSTE Tor-Ereignis geprüft (kein Weiterspringen).
 * @param {object[]} gameGoalEvents alle goalEvents genau eines Spiels (unsortiert erlaubt)
 * @param {'home'|'guest'} ownSide
 * @returns {{within60:number, within120:number, ownGoalsConsidered:number, excludedOwnNullAbsSec:number, excludedNextNullAbsSec:number}}
 */
export function momentumWindowsForGame(gameGoalEvents, ownSide) {
  const sorted = [...gameGoalEvents].sort((a, b) => eventOrderIndex(a) - eventOrderIndex(b));
  let within60 = 0;
  let within120 = 0;
  let ownGoalsConsidered = 0;
  let excludedOwnNullAbsSec = 0;
  let excludedNextNullAbsSec = 0;
  for (let i = 0; i < sorted.length; i++) {
    const g = sorted[i];
    if (g.teamSide !== ownSide) continue;
    if (g.absSec === null) { excludedOwnNullAbsSec++; continue; }
    ownGoalsConsidered++;
    const nxt = sorted[i + 1];
    if (!nxt) continue; // letztes Tor des Spiels: kein Fehlerfall, keine Zählung
    if (nxt.absSec === null) { excludedNextNullAbsSec++; continue; }
    if (nxt.teamSide === ownSide) continue; // nächstes Tor ist wieder eigenes: kein Gegentor, keine Zählung
    const dt = nxt.absSec - g.absSec;
    if (dt < 0) continue; // widersprüchliche Zeiten (sollte laut M0 nicht vorkommen): defensiv nicht zählen
    if (dt <= 60) within60++;
    if (dt <= 120) within120++;
  }
  return { within60, within120, ownGoalsConsidered, excludedOwnNullAbsSec, excludedNextNullAbsSec };
}

// ─────────────────────────────────────────────────────────────────────────
// Fit
// ─────────────────────────────────────────────────────────────────────────

const newQuality = () => ({
  roster: { goalieRowsInWindow: 0, missingDate: 0, invalidDate: 0, noPlayerId: 0, duplicate: 0, solo: 0, shared: 0, other: 0 },
  teamGames: { total: 0, solo: 0, shared: 0, none: 0, other: 0 },
  scoring: { tierUnknown: 0, weak: 0, tierKnown: 0 },
  momentum: { ownGoalNullAbsSec: 0, nextGoalNullAbsSec: 0 },
});

function emptyPriors() {
  return { m1: { estimable: false, reason: 'no-data' }, m2: { estimable: false, reason: 'no-data' } };
}

/**
 * M3-Fit (Goalie-Bewertung, Variante A) für einen Datumsschnitt.
 * @param {{teamGames:object[], goalEvents:object[], rosterEntries:object[]}} data M0-Arrays (alle Saisons zusammen)
 * @param {{asOf?:{date:string, inclusive?:boolean}, halfLifeDays?:number, ridge?:number, replicates?:number, seed?:number}} [options]
 *   asOf fehlt → alle Spiele (inclusive am letzten Datum), wie M1/M2. halfLifeDays/ridge werden unverändert an M1
 *   (und halfLifeDays zusätzlich an M2) durchgereicht. replicates/seed sind optional und NUR gemeinsam gültig
 *   (wie bei M1); ohne sie bleibt `tveCI90` überall `null` (kein Bootstrap angefordert).
 * @returns {object} { model, status: 'ok'|'not-estimable'|'empty', asOf, asOfGameDate, options, players[], rankList[],
 *   priors, quality, warnings }
 */
export function fitGoalieRating(data, options = {}) {
  if (!data || !Array.isArray(data.teamGames) || !Array.isArray(data.goalEvents) || !Array.isArray(data.rosterEntries)) {
    throw new S.NumericError('invalid-input', 'fitGoalieRating: { teamGames, goalEvents, rosterEntries } (M0-Arrays) erwartet');
  }
  const halfLifeDays = options.halfLifeDays;
  const ridge = options.ridge;
  if (halfLifeDays !== undefined && (!Number.isFinite(halfLifeDays) || halfLifeDays <= 0)) throw new S.NumericError('invalid-input', 'halfLifeDays muss endlich und > 0 sein');
  if (ridge !== undefined && (!Number.isFinite(ridge) || ridge < 0)) throw new S.NumericError('invalid-input', 'ridge muss endlich und ≥ 0 sein');
  if ((options.replicates !== undefined) !== (options.seed !== undefined)) throw new S.NumericError('invalid-input', 'replicates und seed sind nur gemeinsam gültig (kein versteckter Standard-Seed)');

  const gameDates = buildGameDates(data.teamGames);
  const asOf = normalizeAsOf(options.asOf, gameDates);
  const inWindow = (date) => asOf.date !== null && (asOf.inclusive ? date <= asOf.date : date < asOf.date);
  const asOfOut = { date: asOf.date, inclusive: asOf.inclusive };
  const q = newQuality();
  const warnings = [];

  // 1. Team-Spiel-Zeilen nach (Saison,Spiel,Seite) indiziert; Klassifikation solo/shared/none/other
  const rowByKey = new Map(); // "season#game#side" -> teamGames row
  for (const t of data.teamGames) rowByKey.set(`${t.seasonKey}#${t.gameId}#${t.side}`, t);
  for (const t of data.teamGames) {
    const date = gameDates.get(gameKey(t.seasonKey, t.gameId));
    if (date === undefined || date === null || !inWindow(date)) continue;
    q.teamGames.total++;
    if (t.goalieCount === 1) q.teamGames.solo++;
    else if (t.goalieCount === 2) q.teamGames.shared++;
    else if (t.goalieCount === 0) q.teamGames.none++;
    else q.teamGames.other++;
  }

  // 2. M2-Tier je playerId (dasselbe asOf, siehe O-M3-10)
  const sq = fitShooterQuality(data, { asOf: options.asOf, halfLifeDays });
  const tierByPlayer = new Map(sq.players.map((p) => [p.playerId, p.tier]));
  const m2Estimable = sq.priors.goals.estimable === true;

  // 3. Gegnerspezifische Weak-Shooter-Share je Team (ligaweit im Fenster, unabhängig vom einzelnen Spiel; O-M3-8)
  const teamWeak = new Map(); // teamKey -> { weak, known }
  for (const e of data.goalEvents) {
    const date = gameDates.get(gameKey(e.seasonKey, e.gameId));
    if (typeof date !== 'string' || !inWindow(date)) continue;
    if (e.isOwnGoal || e.isNotAssigned) continue;
    if (e.derived.scorerMatch !== 'roster') continue;
    const tier = tierByPlayer.get(e.derived.scorerPlayerId);
    if (tier === undefined || tier === null) continue; // Tier unbekannt fließt NICHT in die Gegner-Referenz ein
    const row = teamWeak.get(e.teamKey) || { weak: 0, known: 0 };
    row.known++;
    if (tier === 'weak') row.weak++;
    teamWeak.set(e.teamKey, row);
  }
  const weakShareOf = (teamKey) => { const r = teamWeak.get(teamKey); return r && r.known > 0 ? r.weak / r.known : null; };

  // 4. goalEvents je Spiel gruppieren (für Tier-Zuordnung der Gegentore und Momentum)
  const eventsByGame = new Map(); // "season#game" -> events[]
  for (const e of data.goalEvents) {
    const date = gameDates.get(gameKey(e.seasonKey, e.gameId));
    if (typeof date !== 'string' || !inWindow(date)) continue;
    const gk = gameKey(e.seasonKey, e.gameId);
    if (!eventsByGame.has(gk)) eventsByGame.set(gk, []);
    eventsByGame.get(gk).push(e);
  }

  // 5. Goalie-Kaderzeilen im Fenster (kanonisch sortiert, Duplikate wie in M2 behandelt)
  const rosterOrder = (a, b) => cmp(String(a.seasonKey), String(b.seasonKey)) || cmp(Number(a.gameId), Number(b.gameId)) || cmp(String(a.side), String(b.side))
    || cmp(Number(a.playerId), Number(b.playerId)) || cmp(String(a.playerName ?? ''), String(b.playerName ?? ''));
  const seenRow = new Set();
  const rows = []; // { playerId, name, teamKey, date, gk, side, assignment, ownRow, opponentRow }
  for (const r of [...data.rosterEntries].filter((x) => x.isGoalie === true).sort(rosterOrder)) {
    const gk = gameKey(r.seasonKey, r.gameId);
    const date = gameDates.get(gk);
    if (date === undefined || date === null || !inWindow(date)) continue;
    q.roster.goalieRowsInWindow++;
    if (!validId(r.playerId)) { q.roster.noPlayerId++; continue; }
    const rk = `${gk}#${r.playerId}`;
    if (seenRow.has(rk)) { q.roster.duplicate++; continue; }
    seenRow.add(rk);
    const ownRow = rowByKey.get(`${gk}#${r.side}`);
    const opponentRow = rowByKey.get(`${gk}#${otherSide(r.side)}`);
    const gc = ownRow?.goalieCount;
    const assignment = gc === 1 ? 'solo' : gc === 2 ? 'shared' : 'other';
    if (assignment === 'solo') q.roster.solo++; else if (assignment === 'shared') q.roster.shared++; else q.roster.other++;
    rows.push({ playerId: r.playerId, name: r.playerName, teamKey: r.teamKey, date, gk, side: r.side, assignment, ownRow, opponentRow });
  }

  if (rows.length === 0) {
    return {
      model: 'M3-goalie-rating', status: 'empty', asOf: asOfOut, asOfGameDate: null,
      options: buildOptions(halfLifeDays, ridge, options), players: [], rankList: [], priors: emptyPriors(), quality: q,
      warnings: [{ code: 'empty-asof', reason: q.roster.goalieRowsInWindow === 0 ? 'no-rows-in-cutoff' : 'no-eligible-rows' }, ...qualityWarnings(q)],
    };
  }

  // 6. M1-Fit (mit oder ohne Bootstrap) — genau EIN Aufruf, für alle Goalies wiederverwendet (O-M3-7)
  const wantsBootstrap = options.replicates !== undefined;
  const fitOptions = { asOf: options.asOf, ...(halfLifeDays !== undefined ? { halfLifeDays } : {}), ...(ridge !== undefined ? { ridge } : {}) };
  const fit = wantsBootstrap
    ? bootstrapTeamStrength(data.teamGames, { ...fitOptions, replicates: options.replicates, seed: options.seed, level: BOOTSTRAP_LEVEL, keepReplicates: true })
    : fitTeamStrength(data.teamGames, fitOptions);
  const m1Estimable = fit.estimable === true && fit.stage1?.estimable === true;
  if (!m1Estimable) warnings.push({ code: 'm1-not-estimable', reason: fit.reason ?? null });
  if (!m2Estimable) warnings.push({ code: 'm2-tier-not-estimable', reason: sq.priors.goals.reason ?? null });
  const replicateVectors = wantsBootstrap && fit.bootstrap?.available ? fit.bootstrap.replicateEstimates : null;
  const replicateKeys = wantsBootstrap && fit.bootstrap?.available ? fit.bootstrap.keys : null;

  // 7. Aggregation je playerId (kanonisch sortierte Zeilen)
  rows.sort((a, b) => cmp(a.date, b.date) || cmp(a.gk, b.gk) || cmp(a.side, b.side) || cmp(a.playerId, b.playerId));
  const byPlayer = new Map();
  for (const row of rows) {
    let p = byPlayer.get(row.playerId);
    if (!p) p = { playerId: row.playerId, name: null, nameDate: null, teamLast: new Map(), soloRows: [], sharedGames: 0 };
    byPlayer.set(row.playerId, p);
    if (typeof row.name === 'string' && row.name !== '' && (p.nameDate === null || row.date > p.nameDate || (row.date === p.nameDate && row.name < p.name))) { p.name = row.name; p.nameDate = row.date; }
    if (!p.teamLast.has(row.teamKey) || row.date > p.teamLast.get(row.teamKey)) p.teamLast.set(row.teamKey, row.date);
    if (row.assignment === 'shared') p.sharedGames++;
    else if (row.assignment === 'solo') p.soloRows.push(row);
  }

  const players = [...byPlayer.values()].sort((a, b) => a.playerId - b.playerId).map((p) => buildPlayer(p, fit, m1Estimable, fitLikeFromReplicate, replicateKeys, replicateVectors, weakShareOf, tierByPlayer, eventsByGame, q, warnings));

  const rankList = players
    .filter((pl) => pl.confidence === 'ok' && pl.tve !== null)
    .map((pl) => ({ playerId: pl.playerId, name: pl.name, tve: pl.tve, tvePerGame: pl.tvePerGame }))
    .sort((a, b) => b.tvePerGame - a.tvePerGame || b.tve - a.tve || a.playerId - b.playerId);

  const status = m1Estimable ? 'ok' : 'not-estimable';
  return {
    model: 'M3-goalie-rating', status, asOf: asOfOut, asOfGameDate: rows[rows.length - 1].date,
    options: buildOptions(halfLifeDays, ridge, options),
    players, rankList,
    priors: { m1: m1Estimable ? { estimable: true, reason: null } : { estimable: false, reason: fit.reason ?? null }, m2: m2Estimable ? { estimable: true, reason: null } : { estimable: false, reason: sq.priors.goals.reason ?? null } },
    quality: q,
    warnings: [...qualityWarnings(q), ...warnings],
  };
}

function buildOptions(halfLifeDays, ridge, options) {
  return {
    halfLifeDays: halfLifeDays ?? null, ridge: ridge ?? null,
    minGamesForRank: MIN_GAMES_FOR_RANK,
    bootstrap: options.replicates !== undefined ? { replicates: options.replicates, seed: options.seed, level: BOOTSTRAP_LEVEL, unit: 'game' } : null,
  };
}

function qualityWarnings(q) {
  const out = [];
  const add = (code, count, extra) => { if (count > 0) out.push({ code, count, ...extra }); };
  add('roster-duplicate-row', q.roster.duplicate);
  add('team-games-without-goalie', q.teamGames.none);
  add('team-games-goalie-count-other', q.teamGames.other);
  add('momentum-time-unavailable', q.momentum.ownGoalNullAbsSec + q.momentum.nextGoalNullAbsSec);
  add('shorthanded-split-not-available', 1, { reason: 'no-derived-penalty-timeline-in-M0' });
  return out;
}

// ─────────────────────────────────────────────────────────────────────────
// Spieler-Aggregat aufbauen
// ─────────────────────────────────────────────────────────────────────────

function splitBucket() { return { games: 0, goalsAgainst: 0, expectedGAs: [] }; }
function finalizeBucket(b) {
  if (b.games === 0) return { games: 0, goalsAgainst: 0, expectedGA: null, tve: null };
  const expectedGA = b.expectedGAs.every((x) => x !== null) ? S.sum(b.expectedGAs) : null;
  const tve = expectedGA === null ? null : S.sum(b.expectedGAs.map((e, i) => e - b.goalsAgainstList[i]));
  return { games: b.games, goalsAgainst: b.goalsAgainst, expectedGA, tve };
}

function buildPlayer(p, fit, m1Estimable, fitLikeFromReplicate_, replicateKeys, replicateVectors, weakShareOf, tierByPlayer, eventsByGame, q, warnings) {
  const games = p.soloRows.length;
  const teams = [...p.teamLast.entries()].sort((a, b) => cmp(b[1], a[1]) || cmp(a[0], b[0])).map(([teamKey]) => teamKey);

  // Splits (Solo-Spiele), unabhängig voneinander berechnet
  const order = { order1: splitBucket(), order2: splitBucket() };
  const kader = { le6: splitBucket(), ref: splitBucket(), ge9: splitBucket() };
  const hz = { hz1: 0, hz2: 0, unknownPeriod: 0 };
  const momentum = { within60: 0, within120: 0 };

  const initList = (b) => { b.goalsAgainstList = []; return b; };
  [order.order1, order.order2, kader.le6, kader.ref, kader.ge9].forEach(initList);

  let goalsAgainst = 0;
  const expectedGAs = [];
  const actualGAs = [];
  let weakShooterGA = 0;
  let weakShooterGAExpected = 0;
  let anyExpectedNull = false;

  for (const row of p.soloRows) {
    const actual = row.ownRow.goalsAgainst;
    goalsAgainst += actual;
    actualGAs.push(actual);
    let expected = null;
    if (m1Estimable) {
      try { expected = expectedGoalsAgainst(fit, row.opponentRow); } catch (e) { if (!(e instanceof S.NumericError)) throw e; expected = null; }
    }
    if (expected === null) anyExpectedNull = true;
    expectedGAs.push(expected);

    // Kontext-Splits: order
    const ob = row.ownRow.derived?.gameOrderOfDay === 2 ? order.order2 : order.order1;
    ob.games++; ob.goalsAgainst += actual; ob.expectedGAs.push(expected); ob.goalsAgainstList.push(actual);
    // Kontext-Splits: kaderStufe
    const stage = kaderStage(row.ownRow.fieldPlayerCount);
    const kb = stage === 'le6' ? kader.le6 : stage === 'ge9' ? kader.ge9 : kader.ref;
    kb.games++; kb.goalsAgainst += actual; kb.expectedGAs.push(expected); kb.goalsAgainstList.push(actual);

    // Schützenqualität der Gegentore + HZ + tierUnknown
    const events = eventsByGame.get(row.gk) || [];
    const oppSide = otherSide(row.side);
    let gameWeak = 0;
    const weakShare = weakShareOf(row.ownRow.opponentKey ?? row.opponentRow?.teamKey);
    for (const e of events) {
      if (e.teamSide !== oppSide) continue;
      if (e.period === 1) hz.hz1++; else if (e.period === 2) hz.hz2++; else hz.unknownPeriod++;
      if (e.isOwnGoal || e.isNotAssigned) continue;
      if (e.derived.scorerMatch !== 'roster') continue;
      const tier = tierByPlayer.get(e.derived.scorerPlayerId);
      if (tier === undefined || tier === null) { q.scoring.tierUnknown++; continue; }
      q.scoring.tierKnown++;
      if (tier === 'weak') { gameWeak++; q.scoring.weak++; }
    }
    weakShooterGA += gameWeak;
    if (weakShare !== null) weakShooterGAExpected += actual * weakShare;

    // Momentum
    const mw = momentumWindowsForGame(events, row.side);
    momentum.within60 += mw.within60;
    momentum.within120 += mw.within120;
    q.momentum.ownGoalNullAbsSec += mw.excludedOwnNullAbsSec;
    q.momentum.nextGoalNullAbsSec += mw.excludedNextNullAbsSec;
  }

  const expectedGA = games === 0 ? null : anyExpectedNull ? null : S.sum(expectedGAs);
  const tve = expectedGA === null ? null : S.sum(expectedGAs.map((e, i) => e - actualGAs[i]));
  const tvePerGame = tve === null || games === 0 ? null : tve / games;

  // Bootstrap: nur wenn angefordert, M1 im Original schätzbar, und dieser Goalie mindestens 1 Solo-Spiel hat
  let tveCI90 = null;
  if (replicateVectors && games > 0 && !anyExpectedNull) {
    const replicateTve = [];
    for (const vec of replicateVectors) {
      const fitLike = fitLikeFromReplicate_(replicateKeys, vec);
      let ok = true;
      const repExpected = [];
      for (const row of p.soloRows) {
        try { repExpected.push(expectedGoalsAgainst(fitLike, row.opponentRow)); } catch (e) { if (!(e instanceof S.NumericError)) throw e; ok = false; break; }
      }
      if (!ok) continue;
      replicateTve.push(S.sum(repExpected.map((e, i) => e - actualGAs[i])));
    }
    if (replicateTve.length > 0) tveCI90 = [S.quantile(replicateTve, 0.05), S.quantile(replicateTve, 0.95)];
  }

  const confidence = games >= MIN_GAMES_FOR_RANK ? 'ok' : 'insufficient';

  return {
    playerId: p.playerId, name: p.name, teams, games, sharedGames: p.sharedGames, goalsAgainst: games === 0 ? 0 : goalsAgainst,
    expectedGA, tve, tvePerGame, tveCI90,
    weakShooterGA: games === 0 ? null : weakShooterGA,
    weakShooterGAExpected: games === 0 ? null : weakShooterGAExpected,
    highLeverageGA: null,
    splits: {
      order1vs2: { order1: finalizeBucket(order.order1), order2: finalizeBucket(order.order2) },
      hz1vsHz2: games === 0 ? null : { hz1: hz.hz1, hz2: hz.hz2 },
      kaderStufe: { le6: finalizeBucket(kader.le6), ref: finalizeBucket(kader.ref), ge9: finalizeBucket(kader.ge9) },
      shorthandedVsEqual: null,
      concededShortlyAfterOwnGoal: games === 0 ? null : { within60: momentum.within60, within120: momentum.within120 },
    },
    confidence,
  };
}

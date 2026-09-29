#!/usr/bin/env node
// P1a · CLI für die Liga-Modell-Datenaufbereitung (M0) — Dry-Run-Bericht.
//
//   node scripts/build-league-model.mjs          # Dry-Run (Standard): liest season-data, druckt den Datenqualitätsbericht
//   node scripts/build-league-model.mjs --json   # derselbe Bericht als kanonisches JSON (deterministisch)
//   node scripts/build-league-model.mjs --only M1                          # M1-Teamstärke (Dry-Run, ohne Bootstrap)
//   node scripts/build-league-model.mjs --only M1 --replicates 200 --seed 1 # zusätzlich seeded 90-%-Bootstrap auf Spielebene
//   (--json wirkt auch mit --only M1)
//   node scripts/build-league-model.mjs --only M2                          # M2-Torschützen-Qualität (Dry-Run, kein Bootstrap; --json möglich)
//   node scripts/build-league-model.mjs --only M3                          # M3-Goalie-Bewertung (Dry-Run, ohne Bootstrap)
//   node scripts/build-league-model.mjs --only M3 --replicates 200 --seed 1 # zusätzlich seeded 90-%-Bootstrap (Spielebene, wie M1)
//   node scripts/build-league-model.mjs --only M4 --replicates 200 --seed 1 # M4-Müdigkeit und Belastung (Liga/Team/Spieler/Fresh-vs-Tired)
//   (--replicates/--seed sind bei --only M4 PFLICHT, anders als bei M1/M3 — fitFatigue liefert ausschließlich
//   Bootstrap-ci90, keinen Nur-Punktschätzung-Pfad; Load Index ist bewusst NICHT implementiert)
//
//   node scripts/build-league-model.mjs --write --replicates 200 --seed 1  # P4b: rechnet + schreibt model-data/ atomisch
//   (--write erfordert IMMER --replicates/--seed, kein versteckter Standardwert, und berechnet/schreibt IMMER alle
//   vier Module gemeinsam — --only zusammen mit --write wird abgelehnt, siehe docs/league-model.md)
//
// Schreibt ohne `--write` NICHTS ins Repository (Dry-Run bleibt der Standard). Kein Netzwerk, keine Uhrzeit
// in der Ausgabe (gleiche Eingabedaten → byte-identische Ausgabe), keine externen Pakete.

import { readFile, mkdir, writeFile, rename } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { normalizeSeason } from './model/normalize.mjs';
import { canonicalJson, sha256Hex } from './lineup-data-hash.mjs';
import { roundOutput, NumericError } from './model/stats.mjs';
import { DEFAULTS, PLACEHOLDER_OPTIONS, fitTeamStrength, bootstrapTeamStrength, asOfAfterMatchday } from './model/team-strength.mjs';
import { DEFAULTS as M2_DEFAULTS, PLACEHOLDER_OPTIONS as M2_PLACEHOLDER_OPTIONS, fitShooterQuality } from './model/shooter-quality.mjs';
import { MIN_GAMES_FOR_RANK as M3_MIN_GAMES_FOR_RANK, BOOTSTRAP_LEVEL as M3_BOOTSTRAP_LEVEL, fitGoalieRating } from './model/goalie-rating.mjs';
import { fitFatigue } from './model/fatigue.mjs';
import { buildMatchdays } from './matchday-derivation.mjs';

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

/** Liest season-data/seasons.json und alle dort gelisteten Saisondateien (BOM-tolerant). */
export async function loadSeasonFiles(repoRoot = REPO_ROOT) {
  const dir = path.join(repoRoot, 'season-data');
  const parse = async (file) => JSON.parse((await readFile(path.join(dir, file), 'utf8')).replace(/^﻿/, ''));
  const manifest = await parse('seasons.json');
  const seasons = [];
  for (const entry of manifest.seasons) seasons.push(await parse(entry.file));
  return seasons;
}

/** Normalisiert alle Saisons und liefert das Ergebnis samt Hash der Eingabedaten (kanonisch serialisiert). */
export async function buildLeagueModel(repoRoot = REPO_ROOT) {
  const seasonData = await loadSeasonFiles(repoRoot);
  return {
    inputHash: await sha256Hex(canonicalJson(seasonData)),
    seasons: seasonData.map((s) => normalizeSeason(s)),
  };
}

const pad = (s, n) => String(s).padEnd(n);
const list = (items) => (items.length ? items.join('; ') : '–');

/** Menschenlesbarer Bericht (deterministisch, ohne Zeitstempel). */
export function formatReport(model) {
  const lines = [];
  lines.push('Liga-Modell · M0-Datenaufbereitung (P1a) — Dry-Run, es wird nichts geschrieben');
  lines.push(`Eingabe-Hash (SHA-256 der kanonischen Saisondaten): ${model.inputHash}`);
  lines.push('Spielfilter: strikt ended === true (Abweichung zum Dashboard siehe „Ausgeschlossene Spiele“).');
  for (const s of model.seasons) {
    const q = s.quality;
    lines.push('');
    lines.push(`══ Saison ${s.seasonKey} ══`);
    lines.push(`Spiele: ${q.games} · beendet: ${q.ended} · nicht beendet: ${q.notEnded} · Modell-Spiele: ${q.modelGames}` +
      ` (ausgeschlossen: Forfait ${q.excluded.forfeit}, verschoben ${q.excluded.postponed}, Jugend ${q.excluded.youth}, ohne Endstand ${q.excluded.noResult})`);
    lines.push(`Team-Spiele im Modell: ${s.teamGames.length} · Roster-Einträge: ${s.rosterEntries.length}`);
    lines.push(`Tore (beendete Spiele): ${q.goals} · Torarten: regular ${q.goalTypes.regular}, penalty_shot ${q.goalTypes.penalty_shot}, owngoal ${q.goalTypes.owngoal}, not_assigned ${q.goalTypes.not_assigned}, andere ${q.goalTypes.other}`);
    lines.push(`Eigentore: ${q.ownGoals.events} Events in ${q.ownGoals.games} Spielen, davon mit Ulm-Beteiligung ${q.ownGoals.eventsUlm} Events in ${q.ownGoals.gamesUlm} Spielen (Eigentor-Gutschrift wird in M0 nicht entschieden)`);
    lines.push(`Penalty-Schüsse (goal_type penalty_shot): ${q.penaltyShots} · Strafen-Events: ${q.penaltyEvents} · Timeouts: ${q.timeouts}`);
    lines.push(`Zeit: Spiele mit kumulierter HZ2-Zeit ${q.time.h2CumulatedGames} (davon widersprüchlich/gemischt ${q.time.h2MixedGames}) · HZ1 > 20:00: ${q.time.h1OverLengthGames} Spiele · nicht lesbare Zeit: ${q.time.eventsUnparsable} Events (${q.time.goalsUnparsable} Tore) · widersprüchliche HZ2-Zeit: ${q.time.eventsAmbiguous} Events`);
    lines.push(`Assists (Rohform): Nummer ${q.assists.number}, 0 ${q.assists.zero}, null ${q.assists.null}, Schlüssel fehlt ${q.assists.missing}, Platzhalter ${q.assists.placeholder} · „kein Assist“ durch null/fehlend: ${q.assists.nullish}`);
    lines.push(`Torschützen: zugeordnet ${q.scorers.matched}, Platzhalternummer ${q.scorers.placeholder}, nicht zuordenbar ${q.scorers.unmatched}, mehrdeutig ${q.scorers.ambiguous} · Platzhalter-Nummern: ${list(q.placeholderNumbers)}`);
    lines.push(`Torsumme ≠ Endstand: ${q.goalSumMismatch.length} Spiele ${q.goalSumMismatch.length ? '(' + q.goalSumMismatch.map((m) => `${m.gameId}: ${m.events} Events ≠ ${m.result}`).join('; ') + ')' : ''}`.trimEnd());
    lines.push(`Spielstandketten: Brüche ${q.scoreChainBreaks} (Tore ohne eindeutige Änderung um genau 1), Stand fehlt ${q.scoreMissing} · scoreDeltaSide ≠ event_team: ${q.scoreDeltaSideConflicts.length}${q.scoreDeltaSideConflicts.length ? ' (' + q.scoreDeltaSideConflicts.map((c) => `Spiel ${c.gameId} ${c.eventKey} ${c.goalType}: event_team ${c.teamSide}, Stand steigt für ${c.scoreDeltaSide}`).join('; ') + ')' : ''}`);
    lines.push(`hosting_club: fehlt in ${q.hosting.missingGames} beendeten Spielen, vorhanden in ${q.hosting.presentGames}${q.hosting.unresolvedClubs.length ? ` (nicht zuordenbar: ${q.hosting.unresolvedClubs.join(', ')})` : ''} → isHostingTeam ${q.hosting.presentGames > 0 ? 'bestimmt' : 'null'}`);
    lines.push(`Goalies (Team-Spiele beendeter Spiele: ${q.goalies.teamGames}): ohne Goalie im Kader ${q.goalies.withoutGoalie} (davon ganz ohne Kader ${q.goalies.withoutRoster}) · mit zwei Goalies ${q.goalies.twoGoalies} · Tor/goalkeeper-Flag-Widersprüche ${q.goalies.flagMismatch}`);
    lines.push(`Team-Spieltage (beendete Spiele): ${Object.keys(q.teamMatchdays.dist).map((k) => `${q.teamMatchdays.dist[k]}× ${k} Spiel(e)`).join(', ') || '–'}${q.teamMatchdays.notTwo.length ? ` · ≠ 2 Spiele: ${q.teamMatchdays.notTwo.map((t) => `${t.matchday} ${t.teamKey} (${t.games})`).join('; ')}` : ''}`);
    const relevant = q.excludedGames.filter((e) => e.reason !== 'not_ended' || e.events > 0 || e.score !== null);
    const quietGames = q.excludedGames.filter((e) => !relevant.includes(e));
    const quiet = quietGames.length;
    const quietNotices = {};
    for (const e of quietGames) { const k = JSON.stringify(e.noticeType); quietNotices[k] = (quietNotices[k] || 0) + 1; }
    lines.push(`Ausgeschlossene Spiele: ${q.excludedGames.length} (beendet, aber ausgeschlossen: ${q.excluded.forfeit + q.excluded.postponed + q.excluded.youth + q.excluded.noResult}; ended ≠ true mit Events/Endstand: ${q.endedFalseWithEvidence.length}; ended ≠ true ohne Events/Endstand: ${quiet}${quiet ? ' — notice_type ' + Object.entries(quietNotices).map(([k, n]) => `${k}×${n}`).join(', ') : ''})`);
    if (q.endedFalseWithEvidence.length) lines.push('   Hinweis: Das Dashboard (isGamePlayed) zählt Spiele mit Tor-Events als gespielt, das Modell strikt nur ended === true.');
    for (const e of relevant) lines.push(`   · Spiel ${e.gameId} (${e.seasonKey}, ${e.date}${e.ulmInvolved ? ', Ulm' : ''}) ${e.home} – ${e.guest}: Grund ${e.reasons.join('+')} · ended=${JSON.stringify(e.ended)}, notice_type=${JSON.stringify(e.noticeType)}, result.forfait=${JSON.stringify(e.resultForfait)} · Endstand ${e.score ?? '–'}, ${e.events} Events`);
    lines.push(`Warnungen: ${s.warnings.length}`);
  }
  return lines.join('\n') + '\n';
}

// ── M1 · Teamstärke (Dry-Run) ──────────────────────────────────────────────

/** Berechnet die M1-Schnappschüsse: Stand über alle Daten und Stand am Ende jeder Saison (asOf = letztes Datum, inclusive). */
export function buildM1(model, { replicates, seed } = {}) {
  const teamGames = model.seasons.flatMap((s) => s.teamGames);
  const run = (rows, asOf) => (replicates ? bootstrapTeamStrength(rows, { asOf, replicates, seed }) : fitTeamStrength(rows, { asOf }));
  const latest = teamGames.map((r) => r.date).sort().at(-1) ?? null;
  const snapshots = [{ label: 'all', asOf: latest ? { date: latest, inclusive: true } : undefined, fit: run(teamGames, latest ? { date: latest, inclusive: true } : undefined) }];
  for (const s of model.seasons) {
    const last = s.teamGames.map((r) => r.date).sort().at(-1);
    if (last) snapshots.push({ label: s.seasonKey, asOf: { date: last, inclusive: true }, fit: fitTeamStrength(teamGames, { asOf: { date: last, inclusive: true } }) });
  }
  return { options: { ...DEFAULTS, placeholders: [...PLACEHOLDER_OPTIONS], bootstrap: replicates ? { replicates, seed, level: 0.9, unit: 'game' } : null }, snapshots };
}

const f3 = (x) => (x === null || x === undefined ? '–' : (x >= 0 ? '+' : '') + x.toFixed(3));
const ci = (iv) => (iv ? ` [${f3(iv.lower)}; ${f3(iv.upper)}]` : '');

/** Menschenlesbarer M1-Bericht (deterministisch, ohne Zeitstempel). */
export function formatM1Report(m1) {
  const o = m1.options;
  const lines = [];
  lines.push('Liga-Modell · M1-Teamstärke (P2 Runde 2) — Dry-Run, es wird nichts geschrieben');
  lines.push(`Hyperparameter (UNABGESTIMMTE PLATZHALTER, Abstimmung erst über M9): halfLifeDays=${o.halfLifeDays}, ridge=${o.ridge}; Warnschwelle games < ${o.minGamesWarning} (konfigurierbar)`);
  lines.push('Hinweis: M1 erfüllt hier keine M9-Akzeptanz. Host wird zweistufig (O2) behandelt und ist bewusst NICHT mit einer gemeinsamen Regression identisch: Stufe 1 ohne Host-Term auf allen zulässigen Zeilen, Stufe 2 verarbeitet nur Zeilen mit bekanntem Host (null wird nicht als false gelesen); β_host wird dort allein durch die Ausrichter-Zeilen bestimmt.');
  lines.push(o.bootstrap ? `Bootstrap: ${o.bootstrap.replicates} Wiederholungen, Seed ${o.bootstrap.seed}, 90-%-Perzentilintervall, Spielebene (beide Teamzeilen gemeinsam), Hyperparameter fest` : 'Bootstrap: aus (--replicates N --seed S aktiviert ihn)');
  const main = m1.snapshots[0].fit;
  lines.push('');
  lines.push(`══ Stand: alle Daten bis ${main.asOf.date ?? '–'} ══`);
  const q = main.quality;
  lines.push(`Zeilen im Fit: ${main.games} (Eingabe ${q.rows.input}; ausgeschlossen gameOrderOfDay = null: ${q.rows.excludedOrderNull}${Object.keys(q.orderNullBySeason).length ? ' [' + Object.keys(q.orderNullBySeason).sort().map((k) => `${k}: ${q.orderNullBySeason[k]}`).join(', ') + ']' : ''}; ungültig: ${q.rows.excludedInvalid})`);
  lines.push(`Host-Verteilung im Fit (Team-Spiel-Zeilen): true ${q.hostDistribution.true}, false ${q.hostDistribution.false}, null ${q.hostDistribution.null}`);
  lines.push(`Ø Tore je Team-Spiel (Zeilen im Fit; VORLÄUFIGE Definition, Owner-Entscheidung offen): ${main.leagueAvgGoalsPerTeamGame === null ? '–' : main.leagueAvgGoalsPerTeamGame.toFixed(3)} ungewichtet, ${main.weightedLeagueAvgGoalsPerTeamGame === null ? '–' : main.weightedLeagueAvgGoalsPerTeamGame.toFixed(3)} zeitgewichtet`);
  const b = main.bootstrap && main.bootstrap.available ? main.bootstrap.intervals : null;
  const e = main.stage1.effects;
  lines.push(`Stufe 1 (alle zulässigen Zeilen, ohne Host-Term): μ ${f3(main.stage1.mu)}${ci(b?.mu)} · Order(2. Spiel) ${f3(e.order)}${ci(b?.order)} · Kader ≤6 ${f3(e.fieldPlayers.le6)}${ci(b?.fieldPlayers.le6)} · Kader ≥9 ${f3(e.fieldPlayers.ge9)}${ci(b?.fieldPlayers.ge9)} · Referenz 7–8 = 0 · konvergiert: ${main.stage1.converged}`);
  const s2 = main.stage2;
  lines.push(`Stufe 2 (Input: ${s2.rows.host + s2.rows.notHost} bekannte Host-Zeilen = ${s2.rows.host} Ausrichter + ${s2.rows.notHost} kein Ausrichter; β_host wird nur durch die Ausrichter-Zeilen bestimmt; ${s2.rows.unknownExcluded} Zeilen mit null nicht verwendet): β_host ${s2.estimable ? f3(s2.betaHost) + ci(b?.betaHost) : 'nicht schätzbar (' + s2.reason + ')'}`);
  lines.push('Teams (Angriff / Abwehr, positiv = stärker; games = Team-Spiel-Zeilen im Fit):');
  const ivs = b ? Object.fromEntries(main.bootstrap.intervals.teams.map((t) => [t.teamKey, t])) : {};
  for (const t of main.stage1.teams) lines.push(`   ${t.teamKey.padEnd(26)} ${f3(t.attack)}${ci(ivs[t.teamKey]?.attack)} / ${f3(t.defense)}${ci(ivs[t.teamKey]?.defense)}  games ${t.games}`);
  if (b) lines.push(`Bootstrap: ${main.bootstrap.games} Spiele gezogen, fehlgeschlagene Refits ${main.bootstrap.failedReplicates}/${main.bootstrap.replicates}`);
  lines.push(`Warnungen: ${main.warnings.length}`);
  for (const w of main.warnings) lines.push(`   · ${w.code}${w.seasonKey ? ' ' + w.seasonKey : ''}${w.teamKey ? ' ' + w.teamKey : ''}${w.count !== undefined ? ' ×' + w.count : ''}${w.games !== undefined ? ' games ' + w.games : ''}${w.reason ? ' (' + w.reason + ')' : ''}`);
  lines.push('');
  lines.push('══ Stand am Ende jeder Saison (asOf = letztes Datum der Saison, inclusive) ══');
  for (const sn of m1.snapshots.slice(1)) {
    const fit = sn.fit;
    lines.push(`${sn.label} (bis ${fit.asOf.date}): Zeilen ${fit.games} · Host true/false/null ${fit.quality.hostDistribution.true}/${fit.quality.hostDistribution.false}/${fit.quality.hostDistribution.null} · β_host ${fit.stage2.estimable ? f3(fit.stage2.betaHost) : 'nicht schätzbar (' + fit.stage2.reason + ')'} · Teams ${fit.stage1.teams.length} · Warnungen ${fit.warnings.length}`);
  }
  return lines.join('\n') + '\n';
}

// ── M2 · Torschützen-Qualität (Dry-Run) ────────────────────────────────────

/** Berechnet die M2-Schnappschüsse: Stand über alle Daten und Stand am Ende jeder Saison (asOf = letztes Datum, inclusive). */
export function buildM2(model) {
  const data = {
    teamGames: model.seasons.flatMap((s) => s.teamGames),
    goalEvents: model.seasons.flatMap((s) => s.goalEvents),
    rosterEntries: model.seasons.flatMap((s) => s.rosterEntries),
  };
  const latest = data.teamGames.map((r) => r.date).sort().at(-1) ?? null;
  const snapshots = [{ label: 'all', fit: fitShooterQuality(data, { asOf: latest ? { date: latest, inclusive: true } : undefined }) }];
  for (const s of model.seasons) {
    const last = s.teamGames.map((r) => r.date).sort().at(-1);
    if (last) snapshots.push({ label: s.seasonKey, fit: fitShooterQuality(data, { asOf: { date: last, inclusive: true } }) });
  }
  return { options: { ...M2_DEFAULTS, placeholders: [...M2_PLACEHOLDER_OPTIONS] }, snapshots };
}

const r3 = (x) => (x === null || x === undefined ? '–' : x.toFixed(3));
const TARGET_LABELS = { goals: 'Tore   ', assists: 'Assists', points: 'Punkte ' };

/** Menschenlesbarer M2-Bericht (deterministisch, ohne Zeitstempel). */
export function formatM2Report(m2) {
  const o = m2.options;
  const lines = [];
  lines.push('Liga-Modell · M2-Torschützen-Qualität (P3 Runde 2) — Dry-Run, es wird nichts geschrieben');
  lines.push(`Hyperparameter (UNABGESTIMMTER PLATZHALTER, gemeinsam mit M1, Abstimmung erst über M9): halfLifeDays=${o.halfLifeDays}`);
  lines.push('Hinweis: Quoten je KADERSPIEL (Kaderpräsenz, nicht Einsatzzeit). Zeitgewichtung als Pseudo-Spiele-Modell: Prior, Posterior und ci90 (Posterior q05/q95) verwenden dieselben gewichteten Zähler und Exposure; Prior-Unsicherheit ist nicht im ci90. Drei getrennte Gamma-Priors (Tore, Assists, Punkte). Keine Gegnerbereinigung, keine UI.');
  const main = m2.snapshots[0].fit;
  const q = main.quality;
  lines.push('');
  lines.push(`══ Stand: alle Daten bis ${main.asOf.date ?? '–'} ══`);
  lines.push(`Status: ${main.status} · Spieler: ${main.players.length} · Kaderplätze (Spieler-Spiele): ${q.roster.playerGames}`);
  lines.push('Prior je Zielvariable (Gamma, Rate-Parametrisierung; Ø = α/β, τ² = α/β²):');
  for (const t of ['goals', 'assists', 'points']) {
    const p = main.priors[t];
    lines.push(`   ${TARGET_LABELS[t]} ${p.estimable ? `α ${r3(p.alpha)}  β ${r3(p.beta)}  Ø ${r3(p.mean)}  τ² ${r3(p.tau2)}` : `nicht schätzbar (${p.reason})`}  (Spieler ${p.n})`);
  }
  lines.push('Stufen (Quintile der ungerundeten geschrumpften Quote, Typ 7; top > q80, weak < q20, Gleichstand = middle):');
  for (const t of ['goals', 'assists', 'points']) {
    const s = main.tiers[t];
    lines.push(`   ${TARGET_LABELS[t]} ${s.status === 'ok' ? `q20 ${r3(s.q20)}  q80 ${r3(s.q80)}` : `keine Stufen (${s.status})`}  (Spieler ${s.n})`);
  }
  lines.push(`Kader: im Fenster ${q.roster.inWindow} · Goalies ausgeschlossen ${q.roster.goalieExcluded} · ohne playerId ausgeschlossen ${q.roster.noPlayerId} · doppelt ${q.roster.duplicate} · nach asOf ${q.roster.afterAsOf} · Datum fehlt/ungültig ${q.roster.missingDate}/${q.roster.invalidDate}`);
  lines.push(`Tore: Ereignisse ${q.goals.events} · Spielern zugeordnet ${q.goals.attributed} (davon Strafschuss ${q.goals.penaltyShot}) · Eigentore ${q.goals.own} · not_assigned ${q.goals.notAssigned} · ohne Spielerzeile ${q.goals.withoutPlayerRow} · nicht zuordenbar ${q.goals.unmatched}`);
  lines.push(`Assists: Spielern zugeordnet ${q.assists.attributed} · kein Assist ${q.assists.none} · Platzhalter ${q.assists.placeholder} · unmatched ${q.assists.unmatched} · von Goalies (keinem Feldspieler zugerechnet) ${q.assists.byGoalie} · ohne Spielerzeile ${q.assists.withoutPlayerRow}`);
  lines.push(`Warnungen: ${main.warnings.length}`);
  for (const w of main.warnings) lines.push(`   · ${w.code}${w.target ? ' ' + w.target : ''}${w.count !== undefined ? ' ×' + w.count : ''}${w.reason ? ' (' + w.reason + ')' : ''}`);
  lines.push('Top 10 nach geschrumpfter Torquote (Tore je Kaderspiel, zeitgewichtet; games = Kaderspiele im Fenster):');
  const top = main.players.filter((p) => p.goalsPerGameShrunk !== null).sort((a, b) => b.goalsPerGameShrunk - a.goalsPerGameShrunk || a.playerId - b.playerId).slice(0, 10);
  for (const p of top) lines.push(`   ${String(p.name ?? p.playerId).padEnd(26)} games ${String(p.games).padStart(3)}  Tore ${String(p.goals).padStart(3)}  roh ${r3(p.goalsPerGameRaw)}  geschrumpft ${r3(p.goalsPerGameShrunk)}  ci90 [${r3(p.goalsCi90[0])}; ${r3(p.goalsCi90[1])}]  Stufe ${p.tier}  Teams ${p.teams.join(', ')}`);
  lines.push('');
  lines.push('══ Stand am Ende jeder Saison (asOf = letztes Datum der Saison, inclusive) ══');
  for (const sn of m2.snapshots.slice(1)) {
    const fit = sn.fit;
    const g = fit.priors.goals;
    lines.push(`${sn.label} (bis ${fit.asOf.date}): Status ${fit.status} · Spieler ${fit.players.length} · Prior Tore ${g.estimable ? `α ${r3(g.alpha)} β ${r3(g.beta)}` : 'nicht schätzbar'} · Warnungen ${fit.warnings.length}`);
  }
  return lines.join('\n') + '\n';
}

// ── M3 · Goalie-Bewertung (Dry-Run) ────────────────────────────────────────

/**
 * Berechnet die M3-Schnappschüsse: Stand über alle Daten (optional mit Bootstrap) und Stand am Ende jeder Saison
 * (ohne Bootstrap, wie bei M1). Ruft ausschließlich die öffentliche `fitGoalieRating` aus goalie-rating.mjs auf —
 * keine M3-Fachlogik hier. asOf identisch zum M1/M2-Muster (letztes Datum, inclusive).
 */
export function buildM3(model, { replicates, seed } = {}) {
  const data = {
    teamGames: model.seasons.flatMap((s) => s.teamGames),
    goalEvents: model.seasons.flatMap((s) => s.goalEvents),
    rosterEntries: model.seasons.flatMap((s) => s.rosterEntries),
  };
  const run = (asOf) => (replicates ? fitGoalieRating(data, { asOf, replicates, seed }) : fitGoalieRating(data, { asOf }));
  const latest = data.teamGames.map((r) => r.date).sort().at(-1) ?? null;
  const snapshots = [{ label: 'all', fit: run(latest ? { date: latest, inclusive: true } : undefined) }];
  for (const s of model.seasons) {
    const last = s.teamGames.map((r) => r.date).sort().at(-1);
    if (last) snapshots.push({ label: s.seasonKey, fit: fitGoalieRating(data, { asOf: { date: last, inclusive: true } }) });
  }
  return { options: { minGamesForRank: M3_MIN_GAMES_FOR_RANK, bootstrap: replicates ? { replicates, seed, level: M3_BOOTSTRAP_LEVEL, unit: 'game' } : null }, snapshots };
}

/** Menschenlesbarer M3-Bericht (deterministisch, ohne Zeitstempel). */
export function formatM3Report(m3) {
  const o = m3.options;
  const lines = [];
  lines.push('Liga-Modell · M3-Goalie-Bewertung (P3 Runde 2) — Dry-Run, es wird nichts geschrieben');
  lines.push(`Mindestspiele für Rang (Akzeptanzkriterium): ${o.minGamesForRank}`);
  lines.push(o.bootstrap ? `Bootstrap: ${o.bootstrap.replicates} Wiederholungen, Seed ${o.bootstrap.seed}, 90-%-Perzentilintervall, Spielebene (beide Teamzeilen gemeinsam, wie M1)` : 'Bootstrap: aus (--replicates N --seed S aktiviert ihn, wie bei --only M1)');
  lines.push('Hinweis: expectedGA ausschließlich Variante A (μ + attack[Gegner] + Kontext des Gegners + Host-Faktor nur für den Gegner, BEWUSST ohne defense[eigenesTeam]-Term). Shared-Goalie-Spiele (goalieCount = 2) fließen in keine individuelle Metrik ein, nur in sharedGames. weakShooterGAExpected ist gegnerspezifisch (Weak-Anteil des Gegners im selben asOf-Fenster, nicht ligaweit). HZ-Split ausschließlich über period. highLeverageGA ist aktuell immer null (M6 existiert nicht), shorthandedVsEqual ist aktuell immer null (M0 liefert keine passende abgeleitete Information). Keine UI, keine Gegner-Vereinszuordnung.');
  const main = m3.snapshots[0].fit;
  const q = main.quality;
  lines.push('');
  lines.push(`══ Stand: alle Daten bis ${main.asOf.date ?? '–'} ══`);
  lines.push(`Status: ${main.status} · Goalies: ${main.players.length} · Rangliste: ${main.rankList.length}`);
  lines.push(`Team-Spiele im Fenster: ${q.teamGames.total} · Solo ${q.teamGames.solo} · Shared ${q.teamGames.shared} · ohne Goalie ${q.teamGames.none}`);
  lines.push(`Kaderzeilen: ${q.roster.goalieRowsInWindow} (Solo ${q.roster.solo}, Shared ${q.roster.shared}, sonstige ${q.roster.other}, doppelt ${q.roster.duplicate})`);
  lines.push(`Schützenqualität der Gegentore: bekannter Tier ${q.scoring.tierKnown} (davon weak ${q.scoring.weak}) · unbekannter Tier ${q.scoring.tierUnknown}`);
  lines.push(`Momentum (Gegentor kurz nach eigenem Tor): Zeit nicht bestimmbar bei ${q.momentum.ownGoalNullAbsSec + q.momentum.nextGoalNullAbsSec} Ereignissen (eigenes Tor ${q.momentum.ownGoalNullAbsSec}, nächstes Tor ${q.momentum.nextGoalNullAbsSec})`);
  lines.push(`Warnungen: ${main.warnings.length}`);
  for (const w of main.warnings) lines.push(`   · ${w.code}${w.count !== undefined ? ' ×' + w.count : ''}${w.reason ? ' (' + w.reason + ')' : ''}`);
  lines.push(`Rangliste nach TvE je Spiel (nur Goalies mit confidence = ok, mindestens ${o.minGamesForRank} Solo-Spiele):`);
  for (const r of main.rankList.slice(0, 10)) lines.push(`   ${String(r.name ?? r.playerId).padEnd(26)} tve ${f3(r.tve)}  tvePerGame ${f3(r.tvePerGame)}`);
  lines.push('');
  lines.push('══ Stand am Ende jeder Saison (asOf = letztes Datum der Saison, inclusive) ══');
  for (const sn of m3.snapshots.slice(1)) {
    const fit = sn.fit;
    lines.push(`${sn.label} (bis ${fit.asOf.date}): Status ${fit.status} · Goalies ${fit.players.length} · Rangliste ${fit.rankList.length} · Warnungen ${fit.warnings.length}`);
  }
  return lines.join('\n') + '\n';
}

// ── M4 · Müdigkeit und Belastung (Dry-Run) ─────────────────────────────────

/**
 * Berechnet den M4-Stand über alle Daten (asOf = letztes Datum, inclusive). Ruft ausschließlich die öffentliche
 * `fitFatigue` aus fatigue.mjs auf — keine M4-Fachlogik hier, keine zweite Normalisierung. Anders als M1/M3 gibt es
 * KEINE Saisonende-Schnappschüsse: `fitFatigue` verlangt IMMER `replicates`/`seed` (kein Nur-Punktschätzung-Pfad,
 * siehe fatigue.mjs), ein zusätzlicher Bootstrap-Lauf je Saison wäre daher kein „billiger" Zusatzstand wie bei
 * M1/M3 (dort läuft die Saisonende-Schleife bewusst OHNE Bootstrap) und wurde hier nicht angefordert.
 */
export function buildM4(model, { replicates, seed }) {
  const data = {
    teamGames: model.seasons.flatMap((s) => s.teamGames),
    goalEvents: model.seasons.flatMap((s) => s.goalEvents),
    rosterEntries: model.seasons.flatMap((s) => s.rosterEntries),
  };
  const fit = fitFatigue(data, { replicates, seed });
  return { options: { replicates, seed, bootstrap: { replicates, seed, level: 0.9, unit: 'game' } }, snapshots: [{ label: 'all', fit }] };
}

const ciArr = (iv) => (iv ? ` [${f3(iv[0])}; ${f3(iv[1])}]` : '');

/** Menschenlesbarer M4-Bericht (deterministisch, ohne Zeitstempel). */
export function formatM4Report(m4) {
  const o = m4.options;
  const lines = [];
  lines.push('Liga-Modell · M4-Müdigkeit und Belastung (P4) — Dry-Run, es wird nichts geschrieben');
  lines.push(`Bootstrap: ${o.replicates} Wiederholungen, Seed ${o.seed}, 90-%-Perzentilintervall, Spielebene (beide Teamzeilen gemeinsam, wie M1) — bei M4 PFLICHT (kein Nur-Punktschätzung-Pfad, ein gemeinsamer Bootstrap für Liga- und Team-Ebene)`);
  lines.push('Hinweis: Load Index ist NICHT implementiert (M0 liefert keine belastbare Information über gleichzeitig auf dem Feld stehende Feldspieler). Fresh-vs-Tired-Kernmodell und Spieler-Ebene sind M1-unabhängig; m1AdjustedGoalDiff (Fresh-vs-Tired) ist ein rein optionaler Zusatz.');
  const main = m4.snapshots[0].fit;
  lines.push('');
  lines.push(`══ Stand: alle Daten bis ${main.asOf.date ?? '–'} ══`);
  lines.push(`Status: ${main.status}`);
  const le = main.league.effects;
  lines.push(`Liga-Effekte: HZ2 ${f3(le.halfHz2.estimate)}${ciArr(le.halfHz2.ci90)} · order2×HZ2 ${f3(le.orderXHalf.estimate)}${ciArr(le.orderXHalf.ci90)}`);
  lines.push(`Teams: ${main.teams.length} · Spieler: ${main.players.length} · Fresh-vs-Tired-Beobachtungen: ${main.freshVsTired.observations.length}`);
  lines.push(`Fresh-vs-Tired: fresh n=${main.freshVsTired.summary.fresh.n} Ø-Tordifferenz ${f3(main.freshVsTired.summary.fresh.meanGoalDiff)} · tired n=${main.freshVsTired.summary.tired.n} Ø-Tordifferenz ${f3(main.freshVsTired.summary.tired.meanGoalDiff)}`);
  lines.push(`Warnungen: ${main.warnings.length}`);
  for (const w of main.warnings) lines.push(`   · ${w.code}${w.count !== undefined ? ' ×' + w.count : ''}${w.reason ? ' (' + w.reason + ')' : ''}`);
  return lines.join('\n') + '\n';
}

// ── Persistenz (model-data/, P4b) ───────────────────────────────────────────
//
// Reine Aufbau-Funktionen ohne Dateisystemzugriff (Konvention wie überall sonst in diesem Modul); das tatsächliche
// Schreiben passiert ausschließlich in main() hinter --write (siehe dort). --write erfordert IMMER --replicates/
// --seed (kein versteckter Standardwert, wie bei --only M4) und berechnet/schreibt IMMER alle vier Module gemeinsam
// (kein --only zusammen mit --write — bewusste Abweichung von der Spezifikation, siehe docs/league-model.md).
//
// Zwei getrennte Bootstrap-Konfigurationen: alltime.json und <season>.json verwenden die von --replicates/--seed
// angeforderten Werte (volle Präzision, Owner-Entscheidung). model-data/snapshots/<season>.json verwendet dagegen
// IMMER SNAPSHOT_REPLICATES (20, die technische Mindestzahl) mit dem GLEICHEN --seed — nicht, weil 20 Replikate
// statistisch ausreichen, sondern weil M4 keinen bootstrap-losen Pfad kennt (jeder der 35 Spieltag-Snapshots
// braucht zwingend einen Bootstrap-Lauf) und 200 Replikate × 35 Spieltage das 2-Minuten-Laufzeitziel sprengen würden
// (siehe Laufzeitmessung im Schritt-1-Plan). Snapshots enthalten ohnehin keine ci90-Werte (Owner-Entscheidung),
// die Replikatzahl wirkt sich dort NUR auf den intern verwendeten Punktschätzer-Pfad aus, nicht auf ein sichtbares
// Intervall. Kein zweiter, versteckter Seed: derselbe --seed wie für alltime/<season>.json.
const SNAPSHOT_REPLICATES = 20;

/** M4 je Saisonende (asOf = letztes Datum der Saison, inclusive) — analog zum bestehenden M1/M2/M3-Saisonschleifen-
 * Muster, aber NEU (buildM4() kennt bewusst keine Saisonende-Stände, siehe dortiger Kommentar) und in einer
 * eigenen Funktion, damit --only M4 (ruft ausschließlich buildM4() auf) unverändert bleibt. */
function buildM4SeasonEnd(model, data, { replicates, seed }) {
  const out = {};
  for (const s of model.seasons) {
    const last = s.teamGames.map((r) => r.date).sort().at(-1);
    if (last) out[s.seasonKey] = fitFatigue(data, { asOf: { date: last, inclusive: true }, replicates, seed });
  }
  return out;
}

/** manifest.json — kein Zeitstempel (Determinismus), Bootstrap-Konfiguration beider Präzisionsstufen dokumentiert. */
function buildManifest(model, { allTimeReplicates, allTimeSeed, snapshotReplicates, snapshotSeed }) {
  return {
    schemaVersion: 1,
    inputHash: model.inputHash,
    modules: ['teamStrength', 'shooterQuality', 'goalieRatings', 'fatigue'],
    seasons: model.seasons.map((s) => s.seasonKey),
    bootstrap: {
      alltime: { replicates: allTimeReplicates, seed: allTimeSeed },
      snapshots: { replicates: snapshotReplicates, seed: snapshotSeed, intervals: false },
    },
  };
}

/** model-data/<season>.json je Saison — Saisonende-Stand aller vier Module, volle (ungeschmälerte) Objekte. */
function buildSeasonFiles(model, m1, m2, m3, m4SeasonEnd) {
  const out = {};
  for (const s of model.seasons) {
    const key = s.seasonKey;
    const m1snap = m1.snapshots.find((sn) => sn.label === key);
    const m2snap = m2.snapshots.find((sn) => sn.label === key);
    const m3snap = m3.snapshots.find((sn) => sn.label === key);
    const fatigueFit = m4SeasonEnd[key];
    if (!m1snap || !m2snap || !m3snap || !fatigueFit) continue; // Saison ohne beendetes Spiel (in den echten Daten nicht der Fall)
    out[key] = { seasonKey: key, asOf: m1snap.fit.asOf, teamStrength: m1snap.fit, shooterQuality: m2snap.fit, goalieRatings: m3snap.fit, fatigue: fatigueFit };
  }
  return out;
}

/** model-data/alltime.json — aktueller Gesamtstand ("all") aller vier Module, volle (ungeschmälerte) Objekte. */
function buildAlltimeFile(m1, m2, m3, m4All) {
  return { asOf: m1.snapshots[0].fit.asOf, teamStrength: m1.snapshots[0].fit, shooterQuality: m2.snapshots[0].fit, goalieRatings: m3.snapshots[0].fit, fatigue: m4All };
}

// ── Schlanke „Kernwerte" für model-data/snapshots/ (Punktschätzer, KEINE ci90/Intervalle, Owner-Entscheidung) ────
//
// Regel: nur, was eine Verlaufskurve über Spieltage speisen kann, sonst nichts (siehe Schritt-1-Plan-Freigabe).

/** M1: nur Teams, die in DIESER Saison tatsächlich mindestens ein Spiel bestritten haben (activeTeamKeys) — nicht
 * alle Teams des multi-saisonalen, zeitgewichteten Fits. Das Modell selbst rechnet unverändert über alle Saisons;
 * gefiltert wird ausschließlich die Ausgabe dieses einen Saison-Snapshots (Owner-Entscheidung, Variante A). */
function slimTeamStrength(fit, activeTeamKeys) {
  return { estimable: fit.estimable, teams: fit.estimable ? fit.stage1.teams.filter((t) => activeTeamKeys.has(t.teamKey)).map((t) => ({ teamKey: t.teamKey, attack: t.attack, defense: t.defense })) : [] };
}

/** M2: nur Prior-Kennzahlen und Tier-Schwellen, kein vollständiges players[]. */
function slimShooterQuality(fit) {
  const slimPrior = (p) => (p.estimable ? { estimable: true, alpha: p.alpha, beta: p.beta, mean: p.mean, tau2: p.tau2 } : { estimable: false, reason: p.reason });
  const slimTier = (t) => (t.status === 'ok' ? { status: 'ok', q20: t.q20, q80: t.q80 } : { status: t.status });
  return {
    status: fit.status,
    priors: { goals: slimPrior(fit.priors.goals), assists: slimPrior(fit.priors.assists), points: slimPrior(fit.priors.points) },
    tiers: { goals: slimTier(fit.tiers.goals), assists: slimTier(fit.tiers.assists), points: slimTier(fit.tiers.points) },
  };
}

/** M3: nur die Rangliste mit tvePerGame je Goalie (kein tve, keine tveCI90, kein volles players[]). */
function slimGoalieRatings(fit) {
  return { status: fit.status, rankList: fit.rankList.map((r) => ({ playerId: r.playerId, name: r.name, tvePerGame: r.tvePerGame })) };
}

/** M4: nur Liga-Effekte (Punktschätzer, kein ci90) und je Team die Kernwerte (hz/lateGameIndex je Spiel 1/2,
 * NUR shrunkEffect). shrunkEffect bleibt explizit `null`, wenn der Prior nicht schätzbar ist (kein Ersatzwert,
 * kein Clamping) — insbesondere bei frühen Spieltagen häufig für game1.lateGameIndex (kleine Stichprobe). */
function slimFatigue(fit) {
  const est = (e) => e.estimate;
  const metric = (m) => ({ shrunkEffect: m.shrunkEffect });
  const seg = fit.league.effects.segments;
  return {
    status: fit.status,
    league: { effects: { halfHz2: est(fit.league.effects.halfHz2), orderXHalf: est(fit.league.effects.orderXHalf), segments: { seg1: est(seg.seg1), seg2: est(seg.seg2), seg3: est(seg.seg3), seg4: est(seg.seg4), orderXSeg2: est(seg.orderXSeg2), orderXSeg3: est(seg.orderXSeg3), orderXSeg4: est(seg.orderXSeg4) } } },
    teams: fit.teams.map((t) => ({ teamKey: t.teamKey, game1: { hz: metric(t.game1.hz), lateGameIndex: metric(t.game1.lateGameIndex) }, game2: { hz: metric(t.game2.hz), lateGameIndex: metric(t.game2.lateGameIndex) } })),
  };
}

/** Leerer, strukturell zu slimFatigue() identischer Zustand für den Fall, dass der (bei M4 zwingende) Bootstrap an
 * einem frühen Spieltag mit wenigen Zeilen die eigene Fehlschlagsquote-Schwelle reißt (`bootstrap-failed`,
 * stats.mjs, unverändert) — kein Absturz des gesamten Schreibvorgangs, sondern ein gültiger, ehrlicher
 * "nicht schätzbar"-Zustand (kein Clamping, kein Ersatzwert), analog zu fitFatigue()s eigenen not-estimable-Zweigen. */
function emptySlimFatigue() {
  return {
    status: 'not-estimable',
    league: { effects: { halfHz2: null, orderXHalf: null, segments: { seg1: null, seg2: null, seg3: null, seg4: null, orderXSeg2: null, orderXSeg3: null, orderXSeg4: null } } },
    teams: [],
  };
}

/** Kernwerte aller vier Module für EINEN Spieltag (asOf = asOfAfterMatchday, M1-Helfer unverändert wiederverwendet,
 * keine zweite asOf-Auflösung). `null`, wenn der Spieltag keine Zeilen hat (in der Praxis nicht der Fall, da nur
 * bereits über buildMatchdays gefilterte, tatsächlich vorhandene Spieltage aufgerufen werden). */
function buildMatchdaySnapshot(data, teamGames, seasonKey, matchdayNumber, activeTeamKeys, { snapshotReplicates, snapshotSeed }) {
  const asOf = asOfAfterMatchday(teamGames, seasonKey, matchdayNumber);
  if (!asOf) return null;
  const m1 = fitTeamStrength(teamGames, { asOf });
  const m2 = fitShooterQuality(data, { asOf });
  const m3 = fitGoalieRating(data, { asOf });
  let fatigue;
  try {
    fatigue = slimFatigue(fitFatigue(data, { asOf, replicates: snapshotReplicates, seed: snapshotSeed }));
  } catch (e) {
    if (!(e instanceof NumericError)) throw e;
    fatigue = emptySlimFatigue(); // z. B. bootstrap-failed: zu wenige Zeilen für 20 stabile Replikate an diesem frühen Spieltag
  }
  return { number: matchdayNumber, asOf, teamStrength: slimTeamStrength(m1, activeTeamKeys), shooterQuality: slimShooterQuality(m2), goalieRatings: slimGoalieRatings(m3), fatigue };
}

/** model-data/snapshots/<season>.json — NUR abgeschlossene Spieltage (buildMatchdays, Status "abgeschlossen", wie
 * spezifiziert); `rawSeason` ist der unnormalisierte Saisonobjekt aus loadSeasonFiles() (buildMatchdays erwartet
 * dessen Rohformat, nicht das normalisierte M0-Ergebnis). */
function buildSnapshotsFile(data, teamGames, seasonKey, rawSeason, activeTeamKeys, options) {
  const mds = buildMatchdays(rawSeason).filter((md) => md.status === 'abgeschlossen' && md.number !== null);
  const matchdaySnapshots = mds.map((md) => buildMatchdaySnapshot(data, teamGames, seasonKey, md.number, activeTeamKeys, options)).filter(Boolean);
  return { seasonKey, matchdays: matchdaySnapshots };
}

/** Dateiname für einen Saisonschlüssel wie "21/22" -> "21-22" (Konvention identisch zu season-data/21-22.json). */
function fileNameForSeasonKey(seasonKey) {
  return seasonKey.replace('/', '-');
}

/** Atomarer Text-Schreibvorgang (Temp-Datei + rename), analog zum bestehenden Muster in import-season-data.mjs/
 * update-season-data.mjs. Schreibt die kanonische JSON-Form (canonicalJson, nicht JSON.stringify) für Determinismus
 * unabhängig von der zufälligen Objektschlüssel-Erzeugungsreihenfolge. */
async function writeJsonCanonicalAtomic(filePath, value) {
  await mkdir(path.dirname(filePath), { recursive: true });
  const tmpPath = `${filePath}.tmp-${process.pid}`;
  await writeFile(tmpPath, canonicalJson(value) + '\n', 'utf8');
  await rename(tmpPath, filePath);
}

function parseArgs(argv) {
  const out = { json: false, write: false, only: null, replicates: null, seed: null, unknown: [], errors: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    const valued = ['--only', '--replicates', '--seed'].find((k) => a === k || a.startsWith(k + '='));
    if (a === '--json') out.json = true;
    else if (a === '--write') out.write = true;
    else if (valued) {
      const v = a.includes('=') ? a.slice(a.indexOf('=') + 1) : argv[++i];
      if (v === undefined) out.errors.push(`${valued} braucht einen Wert`);
      else if (valued === '--only') out.only = v;
      else if (valued === '--replicates') out.replicates = /^\d+$/.test(v) ? Number(v) : NaN;
      else out.seed = /^\d+$/.test(v) ? Number(v) : NaN;
    } else out.unknown.push(a);
  }
  return out;
}

export async function main(argv = process.argv.slice(2), { stdout = process.stdout, stderr = process.stderr, repoRoot = REPO_ROOT } = {}) {
  const args = parseArgs(argv);
  const usage = 'Aufruf: node scripts/build-league-model.mjs [--json] [--only M1 [--replicates N --seed S] | --only M2 | --only M3 [--replicates N --seed S] | --only M4 --replicates N --seed S | --write --replicates N --seed S]\n';
  if (args.unknown.length) {
    stderr.write(`Unbekannte Option(en): ${args.unknown.join(' ')}\n${usage}`);
    return 2;
  }
  const problems = [...args.errors];
  if (args.only !== null && args.only !== 'M1' && args.only !== 'M2' && args.only !== 'M3' && args.only !== 'M4') problems.push('nur --only M1, --only M2, --only M3 und --only M4 sind implementiert');
  if ((args.replicates !== null || args.seed !== null) && args.only !== 'M1' && args.only !== 'M3' && args.only !== 'M4' && !args.write) problems.push('--replicates und --seed gehören zu --only M1, --only M3, --only M4 oder --write');
  if (args.replicates !== null && !(Number.isInteger(args.replicates) && args.replicates >= 20)) problems.push('--replicates muss eine ganze Zahl ≥ 20 sein');
  if (args.seed !== null && !(Number.isInteger(args.seed) && args.seed < 2 ** 32)) problems.push('--seed muss eine ganze Zahl in [0, 2^32) sein');
  if (args.replicates !== null && args.seed === null) problems.push('--replicates braucht ausdrücklich --seed (kein versteckter Standard-Seed)');
  if (args.seed !== null && args.replicates === null) problems.push('--seed ohne --replicates hat keine Wirkung');
  if (args.only === 'M4' && (args.replicates === null || args.seed === null)) problems.push('--only M4 erfordert --replicates und --seed (M4 liefert ausschließlich Bootstrap-ci90, kein Nur-Punktschätzung-Pfad)');
  if (args.write && args.only !== null) problems.push('--write und --only schließen sich aus (--write berechnet und schreibt immer alle vier Module gemeinsam, siehe docs/league-model.md)');
  if (args.write && (args.replicates === null || args.seed === null)) problems.push('--write erfordert --replicates und --seed (Modelldaten-Persistenz liefert ausschließlich Bootstrap-gestützte Werte, kein Nur-Punktschätzung-Pfad, kein versteckter Standard-Seed)');
  if (problems.length) {
    stderr.write(`Ungültige Optionen: ${problems.join('; ')}\n${usage}`);
    return 2;
  }
  const model = await buildLeagueModel(repoRoot);
  if (args.only === 'M1') {
    const m1 = buildM1(model, { replicates: args.replicates ?? undefined, seed: args.seed ?? undefined });
    if (args.json) {
      const strip = (fit) => { const { bootstrap, ...rest } = fit; return bootstrap ? { ...rest, bootstrap } : rest; };
      stdout.write(canonicalJson(roundOutput({ inputHash: model.inputHash, options: m1.options, snapshots: m1.snapshots.map((sn) => ({ label: sn.label, fit: strip(sn.fit) })) })) + '\n');
    } else stdout.write(formatM1Report(m1));
    return 0;
  }
  if (args.only === 'M2') {
    const m2 = buildM2(model);
    if (args.json) {
      // Spielerliste nur im Hauptstand (alle Daten); die Saisonende-Stände enthalten die Zusammenfassung ohne Spielerliste (playerCount).
      const slim = (fit, keepPlayers) => { const { players, ...rest } = fit; return keepPlayers ? fit : { ...rest, playerCount: players.length }; };
      stdout.write(canonicalJson(roundOutput({ inputHash: model.inputHash, options: m2.options, snapshots: m2.snapshots.map((sn, i) => ({ label: sn.label, fit: slim(sn.fit, i === 0) })) })) + '\n');
    } else stdout.write(formatM2Report(m2));
    return 0;
  }
  if (args.only === 'M3') {
    const m3 = buildM3(model, { replicates: args.replicates ?? undefined, seed: args.seed ?? undefined });
    if (args.json) {
      // Goalie-Liste (players) und rankList nur im Hauptstand; die Saisonende-Stände enthalten playerCount/rankListCount statt der Listen.
      const slim = (fit, keepPlayers) => { const { players, rankList, ...rest } = fit; return keepPlayers ? fit : { ...rest, playerCount: players.length, rankListCount: rankList.length }; };
      stdout.write(canonicalJson(roundOutput({ inputHash: model.inputHash, options: m3.options, snapshots: m3.snapshots.map((sn, i) => ({ label: sn.label, fit: slim(sn.fit, i === 0) })) })) + '\n');
    } else stdout.write(formatM3Report(m3));
    return 0;
  }
  if (args.only === 'M4') {
    const m4 = buildM4(model, { replicates: args.replicates, seed: args.seed });
    if (args.json) {
      stdout.write(canonicalJson(roundOutput({ inputHash: model.inputHash, options: m4.options, snapshots: m4.snapshots })) + '\n');
    } else stdout.write(formatM4Report(m4));
    return 0;
  }
  if (args.write) {
    const data = {
      teamGames: model.seasons.flatMap((s) => s.teamGames),
      goalEvents: model.seasons.flatMap((s) => s.goalEvents),
      rosterEntries: model.seasons.flatMap((s) => s.rosterEntries),
    };
    const m1 = buildM1(model, { replicates: args.replicates, seed: args.seed });
    const m2 = buildM2(model);
    const m3 = buildM3(model, { replicates: args.replicates, seed: args.seed });
    const m4All = fitFatigue(data, { replicates: args.replicates, seed: args.seed });
    const m4SeasonEnd = buildM4SeasonEnd(model, data, { replicates: args.replicates, seed: args.seed });

    const manifest = buildManifest(model, { allTimeReplicates: args.replicates, allTimeSeed: args.seed, snapshotReplicates: SNAPSHOT_REPLICATES, snapshotSeed: args.seed });
    const seasonFiles = buildSeasonFiles(model, m1, m2, m3, m4SeasonEnd);
    const alltimeFile = buildAlltimeFile(m1, m2, m3, m4All);

    const rawSeasons = await loadSeasonFiles(repoRoot);
    const snapshotOptions = { snapshotReplicates: SNAPSHOT_REPLICATES, snapshotSeed: args.seed };
    const snapshotFiles = {};
    for (const s of model.seasons) {
      const raw = rawSeasons.find((r) => r.season === s.seasonKey);
      const activeTeamKeys = new Set(s.teamGames.map((t) => t.teamKey));
      snapshotFiles[s.seasonKey] = buildSnapshotsFile(data, data.teamGames, s.seasonKey, raw, activeTeamKeys, snapshotOptions);
    }

    const modelDataDir = path.join(repoRoot, 'model-data');
    const written = [];
    const manifestPath = path.join(modelDataDir, 'manifest.json');
    await writeJsonCanonicalAtomic(manifestPath, manifest);
    written.push(manifestPath);
    const alltimePath = path.join(modelDataDir, 'alltime.json');
    await writeJsonCanonicalAtomic(alltimePath, roundOutput(alltimeFile));
    written.push(alltimePath);
    for (const [key, content] of Object.entries(seasonFiles)) {
      const p = path.join(modelDataDir, `${fileNameForSeasonKey(key)}.json`);
      await writeJsonCanonicalAtomic(p, roundOutput(content));
      written.push(p);
    }
    for (const [key, content] of Object.entries(snapshotFiles)) {
      const p = path.join(modelDataDir, 'snapshots', `${fileNameForSeasonKey(key)}.json`);
      await writeJsonCanonicalAtomic(p, roundOutput(content));
      written.push(p);
    }

    stdout.write(`Modelldaten geschrieben (${written.length} Dateien) nach ${path.relative(repoRoot, modelDataDir)}\n`);
    for (const p of written) stdout.write(`   · ${path.relative(repoRoot, p)}\n`);
    return 0;
  }
  if (args.json) {
    const report = { inputHash: model.inputHash, seasons: model.seasons.map((s) => ({ seasonKey: s.seasonKey, quality: s.quality, warnings: s.warnings })) };
    stdout.write(canonicalJson(report) + '\n');
  } else {
    stdout.write(formatReport(model));
  }
  return 0;
}

if (/(^|\/)build-league-model\.mjs$/.test(process.argv[1]?.replace(/\\/g, '/') ?? '')) {
  main().then((code) => { process.exitCode = code; });
}

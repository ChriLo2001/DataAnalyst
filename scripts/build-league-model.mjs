#!/usr/bin/env node
// P1a · CLI für die Liga-Modell-Datenaufbereitung (M0) — Dry-Run-Bericht.
//
//   node scripts/build-league-model.mjs          # Dry-Run (Standard): liest season-data, druckt den Datenqualitätsbericht
//   node scripts/build-league-model.mjs --json   # derselbe Bericht als kanonisches JSON (deterministisch)
//   node scripts/build-league-model.mjs --only M1                          # M1-Teamstärke (Dry-Run, ohne Bootstrap)
//   node scripts/build-league-model.mjs --only M1 --replicates 200 --seed 1 # zusätzlich seeded 90-%-Bootstrap auf Spielebene
//   (--json wirkt auch mit --only M1)
//
// Schreibt NICHTS ins Repository. Einen Schreibmodus (`--write`, model-data/) gibt es in P1a
// bewusst noch nicht; der Aufruf wird mit einer Meldung abgelehnt. Kein Netzwerk, keine Uhrzeit
// in der Ausgabe (gleiche Eingabedaten → byte-identische Ausgabe), keine externen Pakete.

import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { normalizeSeason } from './model/normalize.mjs';
import { canonicalJson, sha256Hex } from './lineup-data-hash.mjs';
import { roundOutput } from './model/stats.mjs';
import { DEFAULTS, PLACEHOLDER_OPTIONS, fitTeamStrength, bootstrapTeamStrength } from './model/team-strength.mjs';

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

function parseArgs(argv) {
  const out = { json: false, only: null, replicates: null, seed: null, unknown: [], errors: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    const valued = ['--only', '--replicates', '--seed'].find((k) => a === k || a.startsWith(k + '='));
    if (a === '--json') out.json = true;
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
  if (args.unknown.length) {
    if (args.unknown.includes('--write')) stderr.write('--write ist nicht implementiert: es werden keine model-data-Dateien geschrieben (nur Dry-Run).\n');
    else stderr.write(`Unbekannte Option(en): ${args.unknown.join(' ')}\nAufruf: node scripts/build-league-model.mjs [--json] [--only M1 [--replicates N --seed S]]\n`);
    return 2;
  }
  const problems = [...args.errors];
  if (args.only !== null && args.only !== 'M1') problems.push('nur --only M1 ist implementiert');
  if ((args.replicates !== null || args.seed !== null) && args.only !== 'M1') problems.push('--replicates und --seed gehören zu --only M1');
  if (args.replicates !== null && !(Number.isInteger(args.replicates) && args.replicates >= 20)) problems.push('--replicates muss eine ganze Zahl ≥ 20 sein');
  if (args.seed !== null && !(Number.isInteger(args.seed) && args.seed < 2 ** 32)) problems.push('--seed muss eine ganze Zahl in [0, 2^32) sein');
  if (args.replicates !== null && args.seed === null) problems.push('--replicates braucht ausdrücklich --seed (kein versteckter Standard-Seed)');
  if (args.seed !== null && args.replicates === null) problems.push('--seed ohne --replicates hat keine Wirkung');
  if (problems.length) {
    stderr.write(`Ungültige Optionen: ${problems.join('; ')}\nAufruf: node scripts/build-league-model.mjs [--json] [--only M1 [--replicates N --seed S]]\n`);
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

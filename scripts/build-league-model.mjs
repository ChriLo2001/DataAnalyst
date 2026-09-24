#!/usr/bin/env node
// P1a · CLI für die Liga-Modell-Datenaufbereitung (M0) — Dry-Run-Bericht.
//
//   node scripts/build-league-model.mjs          # Dry-Run (Standard): liest season-data, druckt den Datenqualitätsbericht
//   node scripts/build-league-model.mjs --json   # derselbe Bericht als kanonisches JSON (deterministisch)
//
// Schreibt NICHTS ins Repository. Einen Schreibmodus (`--write`, model-data/) gibt es in P1a
// bewusst noch nicht; der Aufruf wird mit einer Meldung abgelehnt. Kein Netzwerk, keine Uhrzeit
// in der Ausgabe (gleiche Eingabedaten → byte-identische Ausgabe), keine externen Pakete.

import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { normalizeSeason } from './model/normalize.mjs';
import { canonicalJson, sha256Hex } from './lineup-data-hash.mjs';

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

export async function main(argv = process.argv.slice(2), { stdout = process.stdout, stderr = process.stderr, repoRoot = REPO_ROOT } = {}) {
  const known = new Set(['--json']);
  const unknown = argv.filter((a) => !known.has(a));
  if (unknown.length) {
    if (unknown.includes('--write')) stderr.write('--write ist in P1a nicht implementiert: es werden keine model-data-Dateien geschrieben (nur Dry-Run).\n');
    else stderr.write(`Unbekannte Option(en): ${unknown.join(' ')}\nAufruf: node scripts/build-league-model.mjs [--json]\n`);
    return 2;
  }
  const model = await buildLeagueModel(repoRoot);
  if (argv.includes('--json')) {
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

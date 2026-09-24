#!/usr/bin/env node
// P1a · Test für scripts/build-league-model.mjs (Dry-Run-CLI) und die Normalisierung der fünf echten Saisons.
//
// Prüft (1) die aus der READ-ONLY-Analyse verifizierten Qualitätskennzahlen je Saison als Pins,
// (2) Spiel 26644 (21/22 MD11) gemäß Spielfilter `ended === true`, (3) Determinismus, (4) dass der
// Dry-Run nichts ins Repository schreibt und bestehende Dateien unverändert lässt, (5) keine
// Netzwerkzugriffe, (6) den Drift der Team-Normalisierung gegen die echten Funktionen aus index.html
// für alle echten Teamnamen, (7) Wiederverwendung der bestehenden Module (Ordnung, Spieltage).
//
// Zusätzlich werden Verlustfreiheit und scoreDeltaSide UNABHÄNGIG aus den Rohdateien nachgerechnet (nicht aus dem Modell).
//
// Torsumme-vs-Endstand-Abweichungen sind KEIN Fehler dieses Tests: sie werden exakt gepinnt (gemeldet).
//
// Aufruf: node scripts/test-build-league-model.mjs

import { readFile, readdir, stat } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import crypto from 'node:crypto';
import path from 'node:path';
import vm from 'node:vm';

import { buildLeagueModel, formatReport, main, loadSeasonFiles } from './build-league-model.mjs';
import * as N from './model/normalize.mjs';
import { buildMatchdays } from './matchday-derivation.mjs';
import { compareGamesChronologically } from './game-ordering.mjs';
import { canonicalJson } from './lineup-data-hash.mjs';

const REPO_ROOT = path.resolve(import.meta.dirname, '..');
let failures = 0;

function assertEqual(actual, expected, label) {
  const a = JSON.stringify(actual);
  const e = JSON.stringify(expected);
  if (a === e) {
    console.log(`  ok   ${label}`);
  } else {
    failures++;
    console.log(`  FAIL ${label}\n       erwartet: ${e}\n       erhalten: ${a}`);
  }
}
function assertTrue(cond, label) {
  assertEqual(Boolean(cond), true, label);
}

const sha = (buf) => crypto.createHash('sha256').update(buf).digest('hex');

/** Fingerabdruck des Repos (ohne .git/node_modules): Pfad, Größe, mtime. */
async function repoSnapshot() {
  const entries = await readdir(REPO_ROOT, { recursive: true });
  const out = [];
  for (const rel of entries.sort()) {
    const norm = rel.replace(/\\/g, '/');
    if (norm === '.git' || norm.startsWith('.git/') || norm.startsWith('node_modules')) continue;
    const s = await stat(path.join(REPO_ROOT, rel));
    if (s.isFile()) out.push(`${norm}|${s.size}|${s.mtimeMs}`);
  }
  return out;
}
async function fileHashes(rels) {
  const out = {};
  for (const rel of rels) out[rel] = sha(await readFile(path.join(REPO_ROOT, rel)));
  return out;
}
const SEASON_FILES = ['21-22', '22-23', '23-24', '24-25', '25-26'].map((k) => `season-data/${k}.json`);
const GUARDED = [...SEASON_FILES, 'season-data/seasons.json', 'index.html', 'scripts/p0a-baseline-golden-values.json', 'scripts/game-ordering.mjs', 'scripts/matchday-derivation.mjs'];

const snapBefore = await repoSnapshot();
const hashBefore = await fileHashes(GUARDED);
const capture = () => { let text = ''; return { stream: { write: (s) => { text += s; } }, get text() { return text; } }; };

let fetchCalls = 0;
const realFetch = globalThis.fetch;
globalThis.fetch = () => { fetchCalls++; throw new Error('Netzwerkzugriff im Test verboten'); };

const model = await buildLeagueModel();
const bySeason = Object.fromEntries(model.seasons.map((s) => [s.seasonKey, s]));

console.log('== Qualitätskennzahlen der fünf echten Saisons (Pins aus der READ-ONLY-Analyse) ==');
{
  assertEqual(model.seasons.map((s) => s.seasonKey), ['21/22', '22/23', '23/24', '24/25', '25/26'], 'fünf Saisons in Manifest-Reihenfolge');
  const P = {
    '21/22': { games: 42, ended: 34, notEnded: 8, model: 34, goals: 495, cum: 11, mixed: 2, own: [6, 6, 1], assists: { number: 340, zero: 0, null: 0, missing: 138, placeholder: 17, nullish: 138 }, host: [34, 0], noGoalie: [0, 0], two: 5, notTwo: 2, timeouts: 13, ps: 3, pen: 36, na: 2, mismatch: [25663] },
    '22/23': { games: 42, ended: 42, notEnded: 0, model: 42, goals: 613, cum: 13, mixed: 1, own: [4, 4, 2], assists: { number: 430, zero: 183, null: 0, missing: 0, placeholder: 0, nullish: 0 }, host: [42, 0], noGoalie: [1, 0], two: 14, notTwo: 0, timeouts: 19, ps: 5, pen: 69, na: 1, mismatch: [] },
    '23/24': { games: 42, ended: 42, notEnded: 0, model: 42, goals: 583, cum: 6, mixed: 0, own: [5, 5, 0], assists: { number: 416, zero: 167, null: 0, missing: 0, placeholder: 0, nullish: 0 }, host: [42, 0], noGoalie: [0, 0], two: 18, notTwo: 0, timeouts: 24, ps: 5, pen: 62, na: 0, mismatch: [] },
    '24/25': { games: 51, ended: 42, notEnded: 9, model: 40, goals: 576, cum: 13, mixed: 0, own: [3, 3, 1], assists: { number: 383, zero: 193, null: 0, missing: 0, placeholder: 0, nullish: 0 }, host: [42, 0], noGoalie: [5, 4], two: 17, notTwo: 0, timeouts: 29, ps: 4, pen: 31, na: 0, mismatch: [40512, 40514] },
    '25/26': { games: 60, ended: 56, notEnded: 4, model: 56, goals: 860, cum: 7, mixed: 0, own: [4, 4, 1], assists: { number: 611, zero: 249, null: 0, missing: 0, placeholder: 0, nullish: 0 }, host: [0, 56], noGoalie: [0, 0], two: 7, notTwo: 0, timeouts: 36, ps: 6, pen: 66, na: 0, mismatch: [] },
  };
  for (const [key, p] of Object.entries(P)) {
    const q = bySeason[key].quality;
    assertEqual([q.games, q.ended, q.notEnded, q.modelGames], [p.games, p.ended, p.notEnded, p.model], `${key}: Spiele / beendet / nicht beendet / Modell-Spiele`);
    assertEqual(q.goals, p.goals, `${key}: Tore`);
    assertEqual([q.time.h2CumulatedGames, q.time.h2MixedGames], [p.cum, p.mixed], `${key}: Spiele mit kumulierter HZ2-Zeit (davon gemischt)`);
    assertEqual([q.ownGoals.events, q.ownGoals.games, q.ownGoals.gamesUlm], p.own, `${key}: Eigentore (Events, Spiele, Spiele mit Ulm)`);
    assertEqual(q.assists, p.assists, `${key}: Assist-Rohformen (Nummer/0/null/fehlend/Platzhalter)`);
    assertEqual([q.hosting.missingGames, q.hosting.presentGames], p.host, `${key}: hosting_club fehlt/vorhanden (beendete Spiele)`);
    assertEqual([q.goalies.withoutGoalie, q.goalies.withoutRoster], p.noGoalie, `${key}: Team-Spiele ohne Goalie (davon ohne Kader)`);
    assertEqual(q.goalies.twoGoalies, p.two, `${key}: Team-Spiele mit zwei Goalies`);
    assertEqual(q.teamMatchdays.notTwo.length, p.notTwo, `${key}: Team-Spieltage mit ≠ 2 Spielen`);
    assertEqual([q.timeouts, q.penaltyShots, q.penaltyEvents, q.goalTypes.not_assigned], [p.timeouts, p.ps, p.pen, p.na], `${key}: Timeouts / Penalty-Schüsse / Strafen-Events / not_assigned`);
    assertEqual(q.goalSumMismatch.map((m) => m.gameId).sort((a, b) => a - b), p.mismatch, `${key}: Torsumme ≠ Endstand (exakt gemeldet, kein Fehler)`);
    assertEqual([bySeason[key].goalEvents.length, bySeason[key].timeoutEvents.length, bySeason[key].penaltyShotEvents.length], [p.goals, p.timeouts, p.ps], `${key}: normalisierte Ereignisse entsprechen den Zählungen`);
  }
  const q26 = bySeason['25/26'].quality;
  assertEqual(q26.teamMatchdays.dist, { 2: 56 }, '25/26: 56/56 Team-Spieltage mit genau 2 Spielen');
  assertEqual([q26.goalTypes.owngoal, q26.penaltyShots, q26.timeouts, q26.goalies.twoGoalies], [4, 6, 36, 7], '25/26: 4 Eigentore, 6 Penalty-Schüsse, 36 Timeouts, 7 Spiele mit zwei Goalies');
  assertEqual([q26.scorers.matched, q26.scorers.placeholder, q26.scorers.unmatched, q26.scorers.ambiguous], [856, 4, 0, 0], '25/26: 856 von 860 Toren einem Kaderspieler zugeordnet, 4 Eigentor-Platzhalter, keine sonstigen');
  assertEqual([q26.hosting.unresolvedClubs, q26.scoreDeltaSideConflicts.length, q26.scoreChainBreaks, q26.scoreMissing], [[], 0, 0, 0], '25/26: alle Ausrichter zuordenbar, keine Spielstandbrüche, keine event_team/Spielstand-Konflikte');
  assertEqual(bySeason['21/22'].quality.teamMatchdays.notTwo, [{ matchday: '21/22#11', teamKey: 'tv-schriesheim', games: 1 }, { matchday: '21/22#11', teamKey: 'vfb-ulm', games: 1 }], '21/22: die 2 Team-Spieltage mit nur 1 beendetem Spiel (MD11)');
  assertEqual(bySeason['21/22'].quality.time.goalsUnparsable, 4, '21/22: 4 Tore mit nicht lesbarer Zeit (z. B. "3.25") → absSec null');
  const q21 = bySeason['21/22'].quality;
  assertEqual([q21.scoreChainBreaks, q21.scoreMissing, q21.scorers.unmatched], [4, 0, 0], '21/22: 4 Spielstandketten-Brüche (kein Stand fehlt, keine sonstigen unzuordenbaren Schützen)');
  assertEqual(bySeason['21/22'].warnings.filter((w) => w.code === 'score_chain_break').map((w) => w.gameId), [25663, 25693, 25693, 25693], '21/22: die vier Brüche liegen in Spiel 25663 (1) und 25693 (3)');
  assertEqual(q21.scoreDeltaSideConflicts, [
    { gameId: 25663, eventKey: '25663#7', goalType: 'owngoal', teamSide: 'home', scoreDeltaSide: 'guest' },
    { gameId: 25696, eventKey: '25696#21', goalType: 'owngoal', teamSide: 'guest', scoreDeltaSide: 'home' },
  ], '21/22: die zwei event_team/Spielstand-Konflikte (beides Eigentore) bleiben als Qualitätseinträge und Warnungen sichtbar');
  assertEqual(bySeason['21/22'].warnings.filter((w) => w.code === 'score_delta_side_differs_from_event_team').length, 2, '21/22: zwei Warnungen score_delta_side_differs_from_event_team');
  for (const key of ['22/23', '23/24', '24/25']) assertEqual([bySeason[key].quality.scoreChainBreaks, bySeason[key].quality.scoreDeltaSideConflicts.length, bySeason[key].quality.scoreMissing], [0, 0, 0], `${key}: keine Spielstandbrüche, keine Seitenkonflikte, kein fehlender Stand`);
  // Zeitnormalisierung (Tor-, Strafen- und Timeout-Events zusammen): Verteilung der Zeitformate je Saison
  const fmtDist = (s) => {
    const d = {};
    for (const e of [...s.goalEvents, ...s.penaltyEvents, ...s.timeoutEvents]) d[e.timeFormat] = (d[e.timeFormat] || 0) + 1;
    return Object.fromEntries(Object.entries(d).sort());
  };
  assertEqual(fmtDist(bySeason['21/22']), { ambiguousInCumulated: 3, cumulated: 81, perPeriod: 456, unparseable: 4 }, '21/22: Zeitformate der Events (kumuliert 81, widersprüchlich 3, nicht lesbar 4)');
  assertEqual(fmtDist(bySeason['22/23']), { ambiguousInCumulated: 2, cumulated: 106, perPeriod: 593 }, '22/23: Zeitformate der Events');
  assertEqual(fmtDist(bySeason['23/24']), { cumulated: 65, perPeriod: 604 }, '23/24: Zeitformate der Events');
  assertEqual(fmtDist(bySeason['24/25']), { cumulated: 129, perPeriod: 507 }, '24/25: Zeitformate der Events');
  assertEqual(fmtDist(bySeason['25/26']), { cumulated: 74, perPeriod: 888 }, '25/26: Zeitformate der Events');
  for (const s of model.seasons) {
    const goals = s.goalEvents.filter((e) => e.absSec !== null);
    assertTrue(goals.filter((e) => e.period === 1).every((e) => e.absSec < 1200) && goals.filter((e) => e.period === 2).every((e) => e.absSec >= 1200), `${s.seasonKey}: Halbzeit-1-Tore < 1200 s, Halbzeit-2-Tore (normal und kumuliert) ≥ 1200 s`);
  }
  assertEqual(bySeason['24/25'].quality.excluded, { forfeit: 2, postponed: 0, youth: 0, noResult: 0 }, '24/25: 2 Forfait-Spiele vom Modell ausgeschlossen (die 2 Torsumme-Abweichungen)');
  assertEqual(model.seasons.map((s) => s.quality.placeholderNumbers), [[1000, 2000], [1000, 2000], [1000], [1000], [1000]], 'Platzhalter-Nummern der Quelldaten je Saison');
}

console.log('== Spielfilter ended === true: Spiel 26644 (21/22 MD11) ==');
{
  const s = bySeason['21/22'];
  assertTrue(!s.teamGames.some((t) => t.gameId === 26644) && !s.goalEvents.some((e) => e.gameId === 26644) && !s.rosterEntries.some((e) => e.gameId === 26644), 'Spiel 26644 ist nicht im Modell (teamGames, goalEvents, rosterEntries)');
  const hit = s.quality.endedFalseWithEvidence.find((e) => e.gameId === 26644);
  assertEqual(hit && [hit.seasonKey, hit.reason, hit.ended, hit.noticeType, hit.resultForfait, hit.score, hit.events, hit.date, hit.home, hit.guest, hit.ulmInvolved], ['21/22', 'not_ended', false, null, false, '2:17', 22, '2022-04-03', 'SG Sparks Tübingen-Ulm', 'TV Schriesheim', true], 'Ausschlussbericht: 26644 mit ID, Saison, Grund und Rohmarkern (ended false, notice_type null, forfait false), Endstand 2:17, 22 Events');
  assertEqual(s.quality.endedFalseWithEvidence.map((e) => e.gameId).sort((a, b) => a - b), [25677, 25679, 25681, 25682, 25683, 26478, 26613, 26644], '21/22: alle 8 Spiele mit ended ≠ true und vorhandenen Events/Endstand');
  for (const key of ['22/23', '23/24', '24/25', '25/26']) assertEqual(bySeason[key].quality.endedFalseWithEvidence, [], `${key}: keine Spiele mit ended ≠ true und Events/Endstand`);
  assertTrue(s.warnings.some((w) => w.code === 'ended_false_with_evidence' && w.gameId === 26644), 'Warnung für 26644');
  const report = formatReport(model);
  assertTrue(report.includes('Spiel 26644 (21/22, 2022-04-03, Ulm) SG Sparks Tübingen-Ulm – TV Schriesheim: Grund not_ended · ended=false, notice_type=null, result.forfait=false · Endstand 2:17, 22 Events'), 'Terminal-Bericht nennt Spiel 26644 mit ID, Saison, Ulm-Markierung, Grund und Rohmarkern');
  assertTrue(report.includes('Das Dashboard (isGamePlayed) zählt Spiele mit Tor-Events als gespielt'), 'Terminal-Bericht benennt die Abweichung zum Dashboard');
  assertEqual(s.quality.excludedGames.filter((e) => e.ulmInvolved).map((e) => [e.gameId, e.date, e.score, e.events, e.ended, e.reason]), [[25677, '2022-03-19', '9:10', 23, false, 'not_ended'], [26613, '2022-03-19', '17:3', 20, false, 'not_ended'], [26644, '2022-04-03', '2:17', 22, false, 'not_ended']], 'die drei ausgeschlossenen Ulm-Spiele 21/22 (25677, 26613, 26644) sind eindeutig auffindbar');
  for (const id of [25677, 26613, 26644]) assertTrue((report.split(String.fromCharCode(10)).find((l) => l.includes(`Spiel ${id} (21/22,`)) || '').includes(', Ulm)'), `Bericht: Spiel ${id} mit Ulm-Markierung`);
  const ex = Object.fromEntries(model.seasons.map((x) => [x.seasonKey, x.quality.excludedGames]));
  assertEqual(Object.values(ex).map((l) => l.length), [8, 0, 0, 11, 4], 'Ausgeschlossene Spiele je Saison: 8 / 0 / 0 / 11 / 4');
  assertEqual(ex['24/25'].filter((e) => e.reason === 'forfeit').map((e) => [e.gameId, e.ended, e.resultForfait, e.score, e.events]).sort(), [[40512, true, true, '0:8', 0], [40514, true, true, '8:0', 0]], '24/25: die zwei Forfait-Spiele mit Rohmarkern');
  const notices = (l) => l.filter((e) => e.reason === 'not_ended').map((e) => e.noticeType).sort().join(',');
  assertEqual([notices(ex['24/25']), notices(ex['25/26'])], ['Canceled,Canceled,Postponed,Postponed,Postponed,Postponed,Postponed,Postponed,Postponed', 'Postponed,Postponed,Postponed,Postponed'], 'nicht beendete Spiele 24/25 und 25/26: notice_type-Rohwerte im Ausschlussbericht');
  const raw = JSON.parse((await readFile(path.join(REPO_ROOT, 'season-data', '21-22.json'), 'utf8')).replace(/^\uFEFF/, ''));
  const g = raw.games.find((x) => x.id === 26644);
  assertEqual([g.ended, g.events.length, g.events.filter((e) => e.event_type === 'goal').length], [false, 22, 19], 'Rohdaten bestätigen: ended=false, 22 Events (davon 19 Tore = Endstand 2:17)');
}

console.log('== hosting_club und Ausrichter ==');
{
  for (const key of ['21/22', '22/23', '23/24', '24/25']) {
    assertTrue(bySeason[key].teamGames.every((t) => t.derived.isHostingTeam === null && t.hostingClub === null && t.derived.hostingStatus === 'missing'), `${key}: hosting_club fehlt → isHostingTeam überall null (nicht abgeleitet), Rohwert null`);
  }
  const t = bySeason['25/26'].teamGames;
  assertTrue(t.every((x) => x.derived.isHostingTeam === true || x.derived.isHostingTeam === false), '25/26: isHostingTeam überall bestimmt');
  assertEqual([t.filter((x) => x.derived.isHostingTeam === true).length, t.filter((x) => x.derived.isHostingTeam === false).length], [24, 88], '25/26: 24 Team-Spiele des Ausrichters (in 32 Spielen nimmt der Ausrichter nicht teil)');
  const perGame = new Map();
  for (const x of t) perGame.set(x.gameId, (perGame.get(x.gameId) || 0) + (x.derived.isHostingTeam ? 1 : 0));
  assertTrue([...perGame.values()].every((n) => n <= 1), '25/26: höchstens ein Ausrichter pro Spiel');
}

console.log('== Struktur, Wiederverwendung bestehender Module ==');
{
  const seasons = await loadSeasonFiles();
  for (const s of model.seasons) {
    const raw = seasons.find((x) => x.season === s.seasonKey);
    const mdNumberByGameId = new Map();
    for (const md of buildMatchdays(raw)) for (const g of md.games) mdNumberByGameId.set(g.id, md.number);
    assertTrue(s.teamGames.every((t) => t.matchdayNumber === mdNumberByGameId.get(t.gameId)), `${s.seasonKey}: Spieltag-Nummern stammen aus buildMatchdays()`);
    const games = s.teamGames.filter((t) => t.side === 'home').map((t) => raw.games.find((g) => g.id === t.gameId));
    assertTrue(games.every((g, i) => i === 0 || compareGamesChronologically(games[i - 1], g) <= 0), `${s.seasonKey}: Spiele in chronologischer Reihenfolge (compareGamesChronologically)`);
    assertEqual(s.teamGames.length, s.quality.modelGames * 2, `${s.seasonKey}: zwei Team-Spiele je Modell-Spiel`);
    assertTrue(s.goalEvents.every((e) => e.absSec === null || (e.absSec >= 0 && e.absSec <= 2400)), `${s.seasonKey}: absSec im Bereich 0–2400 oder null`);
    assertTrue(s.teamGames.every((t) => t.teamKey && t.opponentKey && t.goalsFor !== null), `${s.seasonKey}: Team-Spiele vollständig (Schlüssel, Tore)`);
  }
  assertEqual(model.seasons.map((s) => s.teamGames.filter((t) => t.isUlm).length), [9, 12, 12, 12, 14], 'Ulm-Team-Spiele im Modell: 9 / 12 / 12 / 12 / 14 (SG Sparks bis 23/24 als Ulm)');
  assertEqual(model.seasons.map((s) => [...new Set(s.teamGames.map((t) => t.teamKey))].length), [7, 7, 7, 7, 8], 'Teams je Saison: 7 / 7 / 7 / 7 / 8');
  assertTrue(bySeason['22/23'].teamGames.some((t) => t.teamKey === 'sportvg-feuerbach') && bySeason['22/23'].teamGames.some((t) => t.teamKey === 'sportvg-feuerbach-2'), '22/23: Feuerbach 1 und 2 sind getrennte Teams');
  assertTrue(model.seasons.every((s) => s.teamGames.filter((t) => t.isUlm).every((t) => t.teamKey === 'vfb-ulm')), 'Ulm und SG Sparks Ulm-Tübingen laufen unter demselben Teamschlüssel vfb-ulm');
  const src = await readFile(path.join(REPO_ROOT, 'scripts', 'model', 'normalize.mjs'), 'utf8');
  assertTrue(src.includes("from '../game-ordering.mjs'") && src.includes("from '../matchday-derivation.mjs'"), 'normalize.mjs nutzt game-ordering.mjs und matchday-derivation.mjs');
  const cli = await readFile(path.join(REPO_ROOT, 'scripts', 'build-league-model.mjs'), 'utf8');
  assertTrue(cli.includes("from './lineup-data-hash.mjs'") && cli.includes('canonicalJson'), 'CLI nutzt canonicalJson/sha256Hex aus lineup-data-hash.mjs');
}

console.log('== Drift: Team-Normalisierung gegen die echten Funktionen aus index.html (alle echten Teamnamen) ==');
{
  const html = (await readFile(path.join(REPO_ROOT, 'index.html'), 'utf8')).replace(/\r\n/g, '\n');
  const fnSource = (name) => {
    const m = new RegExp(`(^|\\n)function ${name}\\(`).exec(html);
    const from = m.index + m[1].length;
    return html.slice(from, html.indexOf('\n}', from) + 2);
  };
  const constSource = (name) => {
    const from = html.indexOf(`\nconst ${name}=`) + 1;
    const head = html.slice(from, html.indexOf('\n', from));
    if (/[\[{]$/.test(head)) { const close = head.endsWith('[') ? '\n];' : '\n};'; return html.slice(from, html.indexOf(close, from) + close.length); }
    return head;
  };
  const keys = {};
  for (const m of html.slice(html.indexOf('const SEASON_CONFIG={'), html.indexOf('\n};', html.indexOf('const SEASON_CONFIG={'))).matchAll(/^ {2}'(\d\d\/\d\d)':\{/gm)) keys[m[1]] = {};
  const code = [
    ...['MOJIBAKE_RUN_RE', 'CP1252_REVERSE_BYTES', 'UI_TEXT_REPLACEMENTS', 'ULM_TEAM_ALIASES', 'TEAM_ALIAS_RULES'].map(constSource),
    ...['mojibakeScore', 'decodeCp1252AsUtf8', 'repairMojibake', 'fixKnownUiTransliterations', 'cleanText', 'normalizeTeamName', 'normalizeOpponentNameForAllTime', 'isFreiburgTuebingenSgName', 'isMannheimLudwigshafenSgName'].map(fnSource),
    constSource('ULM_TEAM_ALIAS_KEYS'),
    ...['isUlmTeamName', 'seasonOrderIndex', 'matchcenterSeasonLabel', 'matchcenterSeasonIsUlmTuebingenSgEra', 'teamAliasSeasonMatches', 'normalizeTeamKey', 'teamAliasRuleMatches', 'isOwnTeam', 'getCanonicalTeamName'].map(fnSource),
  ].join('\n');
  const ctx = vm.createContext({ console, SEASON_CONFIG: keys, STATIC_SEASON_DATA: {}, TextDecoder });
  vm.runInContext(code, ctx);
  const seasons = await loadSeasonFiles();
  let compared = 0;
  const diffs = [];
  const names = new Set();
  for (const s of seasons) {
    for (const g of s.games) for (const n of [g.home_team_name, g.guest_team_name, g.hosting_club]) {
      if (!n) continue;
      names.add(`${s.season}|${n}`);
    }
  }
  for (const entry of [...names].sort()) {
    const [season, name] = entry.split('|');
    compared++;
    const realCanon = vm.runInContext('getCanonicalTeamName', ctx)(name, season, 'season');
    const realUlm = vm.runInContext('isUlmTeamName', ctx)(name);
    const realOwn = vm.runInContext('isOwnTeam', ctx)(name, season);
    if (realCanon !== N.canonicalTeamName(name, season) || realUlm !== N.isUlmTeamName(name) || realOwn !== N.isOwnTeam(name, season)) diffs.push(entry);
  }
  assertTrue(compared >= 35, `Drift: ${compared} (Saison, Name)-Paare verglichen`);
  assertEqual(diffs, [], 'Drift: canonicalTeamName / isUlmTeamName / isOwnTeam stimmen für alle echten Teamnamen mit index.html überein');
  assertEqual(vm.runInContext('getCanonicalTeamName', ctx)('SG Sparks Tübingen-Ulm', '21/22', 'season'), 'VfB Ulm', 'index.html: SG Sparks Tübingen-Ulm (21/22) → VfB Ulm');
  assertEqual(N.canonicalTeamName('SG Sparks Tübingen-Ulm', '21/22'), 'VfB Ulm', 'Node: SG Sparks Tübingen-Ulm (21/22) → VfB Ulm');
}

console.log('== Verlustfreiheit und Ebenen an den echten Daten (unabhängig aus den Rohdateien geprüft) ==');
{
  const seasons = await loadSeasonFiles();
  let checkedGoals = 0, checkedPenalties = 0, checkedGames = 0;
  const bad = { goals: [], deltas: [], penalties: [], games: [] };
  for (const raw of seasons) {
    const s = bySeason[raw.season];
    const goalByKey = new Map(s.goalEvents.map((e) => [e.eventKey, e]));
    const penByKey = new Map(s.penaltyEvents.map((e) => [e.eventKey, e]));
    const tgByGame = new Map();
    for (const t of s.teamGames) { if (!tgByGame.has(t.gameId)) tgByGame.set(t.gameId, []); tgByGame.get(t.gameId).push(t); }
    for (const g of raw.games) {
      if (g.ended !== true || g.result?.forfait === true) continue;
      const tgs = tgByGame.get(g.id);
      checkedGames++;
      if (!tgs || tgs.length !== 2 || tgs.some((t) => t.ended !== true || t.noticeType !== (g.notice_type ?? null) || t.resultForfait !== (g.result?.forfait ?? null) || t.hostingClub !== (g.hosting_club ?? null) || t.teamName !== g.home_team_name && t.teamName !== g.guest_team_name)) bad.games.push(g.id);
      // Spielstandkette unabhängig neu berechnet
      let ph = 0, pg = 0;
      (g.events || []).forEach((ev, index) => {
        const key = g.id + '#' + index;
        if (ev.event_type === 'goal') {
          const e = goalByKey.get(key);
          checkedGoals++;
          const dh = ev.home_goals - ph, dg = ev.guest_goals - pg;
          const expected = dh === 1 && dg === 0 ? 'home' : dh === 0 && dg === 1 ? 'guest' : null;
          ph = ev.home_goals; pg = ev.guest_goals;
          if (!e || e.derived.scoreDeltaSide !== expected) bad.deltas.push(key);
          if (!e || e.teamSide !== ev.event_team || e.goalType !== (ev.goal_type ?? null) || e.goalTypeString !== (ev.goal_type_string ?? null) || e.sortkey !== (ev.sortkey ?? null)
            || e.timeRaw !== (ev.time ?? null) || e.period !== ev.period || e.scorerNumber !== Number(ev.number) || e.scoreAfter?.home !== ev.home_goals || e.scoreAfter?.guest !== ev.guest_goals
            || e.eventId !== (ev.event_id ?? null)) bad.goals.push(key);
        } else if (ev.event_type === 'penalty') {
          const e = penByKey.get(key);
          checkedPenalties++;
          if (!e || e.penaltyType !== (ev.penalty_type ?? null) || e.penaltyTypeString !== (ev.penalty_type_string ?? null) || e.penaltyId !== (ev.penalty_id ?? null) || e.penaltyCodeId !== (ev.penalty_code_id ?? null)
            || e.reasonId !== (ev.penalty_reason ?? null) || e.reason !== (ev.penalty_reason_string ?? null) || e.sortkey !== (ev.sortkey ?? null) || 'penaltyMinutes' in e) bad.penalties.push(key);
        }
      });
    }
  }
  assertEqual(checkedGoals, 3127, 'Verlustfreiheit: alle 3127 Tor-Events der Modell-Spiele gegen die Rohdaten verglichen');
  assertTrue(checkedPenalties > 0, 'Strafen-Events geprüft');
  assertEqual(checkedGames, 34 + 42 + 42 + 40 + 56, 'Verlustfreiheit: 214 Modell-Spiele (ended, nicht Forfait) geprüft');
  assertEqual(bad.goals, [], 'Tor-Events: event_team, goal_type, goal_type_string, sortkey, Periode, Rohzeit, Trikotnummer, Spielstand nach dem Tor und event_id stimmen mit den Rohdaten überein');
  assertEqual(bad.deltas, [], 'scoreDeltaSide stimmt für alle Tor-Events mit einer unabhängig neu berechneten Spielstandkette überein');
  assertEqual(bad.penalties, [], 'Strafen: Typ, Typtext, penalty_id, penalty_code_id, Grund und sortkey roh erhalten, kein penaltyMinutes');
  assertEqual(bad.games, [], 'Team-Spiele: ended, notice_type, result.forfait, hosting_club (unverändert) und Teamnamen stimmen mit den Rohdaten überein');
  const all = canonicalJson(model);
  assertTrue(!/credit/i.test(all), 'keine Eigentor-Gutschrift-Felder im gesamten Modell (creditedSide, creditedSideSource, creditedTeamKey, credit-Zähler)');
  assertTrue(!all.includes('penaltyMinutes'), 'kein penaltyMinutes im gesamten Modell');
  const types = new Set(model.seasons.flatMap((x) => x.penaltyEvents.map((e) => e.penaltyType)));
  assertEqual([...types].sort(), ['penalty_10', 'penalty_2', 'penalty_2and2', 'penalty_ms_full'], 'echte Strafarten bleiben als Rohwerte erhalten (keine Umrechnung)');
  assertEqual(model.seasons.map((x) => x.goalEvents.filter((e) => e.isOwnGoal).length), [6, 4, 5, 3, 4], 'Eigentor-Events bleiben als goalType/isOwnGoal erhalten (6/4/5/3/4)');
  const own = model.seasons.flatMap((x) => x.goalEvents.filter((e) => e.isOwnGoal));
  assertTrue(own.every((e) => e.teamSide === 'home' || e.teamSide === 'guest') && own.every((e) => e.derived.scorerPlayerId === null && e.derived.scorerMatch === 'placeholder'), 'Eigentore: teamSide roh, kein Spieler zugeordnet');
}

console.log('== Determinismus ==');
{
  const model2 = await buildLeagueModel();
  assertEqual(canonicalJson(model2), canonicalJson(model), 'zwei Läufe: normalisierte Ausgabe byte-identisch');
  assertEqual(formatReport(model2), formatReport(model), 'zwei Läufe: Terminal-Bericht identisch');
  assertTrue(!/\b20\d\d-\d\d-\d\dT\d\d:\d\d|\bGMT\b|\bUTC\b/.test(formatReport(model)), 'Bericht enthält keinen Zeitstempel');
  assertEqual(model.inputHash, model2.inputHash, 'Eingabe-Hash stabil');
  assertTrue(/^[0-9a-f]{64}$/.test(model.inputHash), 'Eingabe-Hash ist ein SHA-256-Hex');
  const a = capture(); const b = capture();
  assertEqual(await main(['--json'], { stdout: a.stream }), 0, '--json: Exit 0');
  await main(['--json'], { stdout: b.stream });
  assertEqual(a.text, b.text, '--json: zwei Läufe byte-identisch');
  const parsed = JSON.parse(a.text);
  assertEqual([parsed.seasons.length, parsed.inputHash], [5, model.inputHash], '--json: fünf Saisons, Eingabe-Hash');
}

console.log('== Dry-Run: nichts geschrieben, nichts verändert, kein Netzwerk ==');
{
  const out = capture();
  const err = capture();
  const code = await main([], { stdout: out.stream, stderr: err.stream });
  assertEqual([code, out.text === formatReport(model), err.text], [0, true, ''], 'Standardlauf ohne Optionen = Dry-Run-Bericht, Exit 0, keine Fehlerausgabe');
  const w = capture();
  assertEqual([await main(['--write'], { stdout: w.stream, stderr: w.stream }), /nicht implementiert/.test(w.text)], [2, true], '--write wird in P1a abgelehnt (Exit 2)');
  const u = capture();
  assertEqual(await main(['--unbekannt'], { stdout: u.stream, stderr: u.stream }), 2, 'unbekannte Option → Exit 2');
  const cliOut = execFileSync(process.execPath, [path.join(REPO_ROOT, 'scripts', 'build-league-model.mjs')], { encoding: 'utf8' });
  assertEqual(cliOut, formatReport(model), 'echter CLI-Aufruf (Prozess) liefert denselben Bericht');
  let writeExit = null;
  try { execFileSync(process.execPath, [path.join(REPO_ROOT, 'scripts', 'build-league-model.mjs'), '--write'], { encoding: 'utf8', stdio: 'pipe' }); writeExit = 0; } catch (e) { writeExit = e.status; }
  assertEqual(writeExit, 2, 'echter CLI-Aufruf mit --write: Exit 2');
  // ── M1 (Teamstärke, Dry-Run): gleiche Garantien — deterministisch, schreibt nichts, kein Netzwerk ──
  const m1a = capture(); const m1b = capture(); const m1c = capture();
  assertEqual(await main(['--only', 'M1'], { stdout: m1a.stream }), 0, '--only M1: Exit 0');
  await main(['--only=M1'], { stdout: m1b.stream });
  assertEqual(m1a.text, m1b.text, '--only M1: zwei Läufe (auch als --only=M1) byte-identisch');
  assertTrue(m1a.text.includes('UNABGESTIMMTE PLATZHALTER') && m1a.text.includes('halfLifeDays=365, ridge=1') && m1a.text.includes('keine M9-Akzeptanz'), 'M1-Bericht kennzeichnet H = 365 und Ridge als unabgestimmte Platzhalter und behauptet keine M9-Akzeptanz');
  assertTrue(m1a.text.includes('Host-Verteilung im Fit (Team-Spiel-Zeilen): true 24, false 88, null 312') && m1a.text.includes('Zeilen im Fit: 424 (Eingabe 428'), 'M1-Bericht: 424 Zeilen im Fit, Host-Verteilung true 24 / false 88 / null 312');
  assertTrue(m1a.text.includes('Input: 112 bekannte Host-Zeilen = 24 Ausrichter + 88 kein Ausrichter; β_host wird nur durch die Ausrichter-Zeilen bestimmt; 312 Zeilen mit null nicht verwendet'), 'M1-Bericht: Stufe 2 nimmt 112 bekannte Host-Zeilen als Input (24 + 88), β_host wird nur durch die Ausrichter-Zeilen bestimmt, 312 null-Zeilen nicht verwendet');
  assertTrue(m1a.text.includes('zweistufig (O2)') && m1a.text.includes('null wird nicht als false gelesen') && m1a.text.includes('NICHT mit einer gemeinsamen Regression identisch'), 'M1-Bericht dokumentiert die O2-Konsequenz ausdrücklich');
  assertTrue(m1a.text.includes('order-null-excluded 21/22 ×2') && m1a.text.includes('order-null-excluded 24/25 ×2'), 'M1-Bericht: gameOrderOfDay-null-Ausschlüsse mit Saison und Anzahl');
  await main(['--only', 'M1', '--json'], { stdout: m1c.stream });
  const m1json = JSON.parse(m1c.text);
  assertEqual(canonicalJson([m1json.snapshots[0].fit.quality.hostDistribution, m1json.snapshots[0].fit.stage2.rows, m1json.options.placeholders]), canonicalJson([{ true: 24, false: 88, null: 312 }, { host: 24, notHost: 88, unknownExcluded: 312 }, ['halfLifeDays', 'ridge']]), '--only M1 --json: Host-Verteilung, Stufe-2-Zeilen und Platzhalter-Kennzeichnung');
  assertTrue(!/NaN|Infinity/.test(m1c.text) && !/-?d+.d{9,}/.test(m1c.text), '--only M1 --json: keine NaN/Infinity und höchstens 8 Nachkommastellen (Rundung an der Ausgabegrenze)');
  const b1 = capture(); const b2 = capture();
  assertEqual(await main(['--only', 'M1', '--replicates', '20', '--seed', '3'], { stdout: b1.stream }), 0, '--only M1 --replicates 20 --seed 3: Exit 0');
  await main(['--only', 'M1', '--replicates=20', '--seed=3'], { stdout: b2.stream });
  assertEqual(b1.text, b2.text, 'M1-Bootstrap (seeded): zwei Läufe byte-identisch');
  assertTrue(b1.text.includes('Bootstrap: 20 Wiederholungen, Seed 3, 90-%-Perzentilintervall, Spielebene (beide Teamzeilen gemeinsam)') && b1.text.includes('Spiele gezogen'), 'M1-Bootstrap-Bericht nennt Spielebene und Seed');
  for (const [args, label] of [[['--only', 'M2'], '--only M2 (nicht implementiert)'], [['--replicates', '30', '--seed', '1'], '--replicates ohne --only M1'], [['--only', 'M1', '--replicates', '30'], '--replicates ohne --seed (kein versteckter Seed)'], [['--only', 'M1', '--seed', '3'], '--seed ohne --replicates'], [['--only', 'M1', '--replicates', '5', '--seed', '1'], '--replicates < 20'], [['--only', 'M1', '--seed', '-1', '--replicates', '30'], 'ungültiger Seed'], [['--only'], '--only ohne Wert']]) {
    const e = capture();
    assertEqual(await main(args, { stdout: e.stream, stderr: e.stream }), 2, `${label}: Exit 2 mit Meldung`);
  }
  const w1 = capture();
  assertEqual([await main(['--only', 'M1', '--write'], { stdout: w1.stream, stderr: w1.stream }), /nicht implementiert/.test(w1.text)], [2, true], '--write bleibt auch mit --only M1 abgelehnt');
  const m1proc = execFileSync(process.execPath, [path.join(REPO_ROOT, 'scripts', 'build-league-model.mjs'), '--only', 'M1'], { encoding: 'utf8' });
  assertEqual(m1proc, m1a.text, 'echter CLI-Aufruf --only M1 liefert denselben Bericht');
  const snapAfter = await repoSnapshot();
  assertEqual(snapAfter, snapBefore, 'Repository unverändert (Dateiliste, Größen, Änderungszeiten) — Dry-Run schreibt nichts');
  assertEqual(await fileHashes(GUARDED), hashBefore, 'season-data, index.html, Golden-Baseline und die wiederverwendeten Module sind unverändert (SHA-256)');
  assertTrue(!snapAfter.some((l) => l.startsWith('model-data/')), 'kein model-data/ erzeugt');
  assertEqual(fetchCalls, 0, 'kein fetch-Aufruf');
  for (const f of ['scripts/build-league-model.mjs', 'scripts/model/normalize.mjs']) {
    const s = (await readFile(path.join(REPO_ROOT, f), 'utf8')).replace(/\/\/.*$/gm, '');
    assertTrue(!/\bfetch\(|node:http|node:https|node:net|node:dns|WebSocket|XMLHttpRequest|writeFile|appendFile|createWriteStream|rename\(|mkdir/.test(s), `${f}: kein Netzwerk- und kein Schreibzugriff im Code`);
  }
}
globalThis.fetch = realFetch;

console.log('');
if (failures > 0) {
  console.log(`${failures} Test(s) fehlgeschlagen.`);
  process.exitCode = 1;
} else {
  console.log('Alle Tests erfolgreich.');
  process.exitCode = 0;
}

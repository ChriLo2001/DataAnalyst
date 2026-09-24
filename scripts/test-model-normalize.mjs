#!/usr/bin/env node
// P1a · Test für scripts/model/normalize.mjs (M0-Datenaufbereitung).
//
// 1) Drift-Test: die Node-Fassung der Team-/Zeit-/Jugendspiel-Regeln wird gegen die ECHTEN Funktionen aus
//    index.html verglichen (aus dem Quelltext geschnitten und in node:vm ausgeführt, index.html wird nur gelesen).
// 2) Synthetische Fälle und Negativ-/Invariantentests: normales Tor, Eigentor, not_assigned, Assist null/0/fehlend,
//    scoreDeltaSide (home/guest/null, gebrochene Kette, fehlender Stand), keine Eigentor-Gutschrift, Zeitformate,
//    Strafdaten ohne Minutenumrechnung (inkl. unbekannter/geerbter Schlüssel), Spielfilter mit mehreren Gründen und
//    Ausschlussbericht, Platzhalternummern (999/1000/2000), Verlustfreiheit der Rohfelder, Ebenentrennung (`derived`),
//    Roster/Goalie "Tor", hosting_club (fehlend, leer, Aliase, `constructor`/`toString`-Schutz).
//
// Aufruf: node scripts/test-model-normalize.mjs

import { readFile } from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';

import * as N from './model/normalize.mjs';
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

// ── Echte Funktionen aus index.html ────────────────────────────────────
const html = (await readFile(path.join(REPO_ROOT, 'index.html'), 'utf8')).replace(/\r\n/g, '\n');
function fnSource(name) {
  const m = new RegExp(`(^|\\n)function ${name}\\(`).exec(html);
  if (!m) throw new Error(`Funktion nicht gefunden: ${name}`);
  const from = m.index + m[1].length;
  return html.slice(from, html.indexOf('\n}', from) + 2);
}
function constSource(name) {
  const from = html.indexOf(`\nconst ${name}=`) + 1;
  if (from === 0) throw new Error(`const nicht gefunden: ${name}`);
  const lineEnd = html.indexOf('\n', from);
  const head = html.slice(from, lineEnd);
  if (/[\[{]$/.test(head)) {
    const close = head.endsWith('[') ? '\n];' : '\n};';
    return html.slice(from, html.indexOf(close, from) + close.length);
  }
  return head;
}
const seasonConfigStub = {};
for (const m of html.slice(html.indexOf('const SEASON_CONFIG={'), html.indexOf('\n};', html.indexOf('const SEASON_CONFIG={'))).matchAll(/^ {2}'(\d\d\/\d\d)':\{/gm)) seasonConfigStub[m[1]] = {};
const real = (() => {
  const code = [
    ...['MOJIBAKE_RUN_RE', 'CP1252_REVERSE_BYTES', 'UI_TEXT_REPLACEMENTS', 'ULM_TEAM_ALIASES', 'TEAM_ALIAS_RULES'].map(constSource),
    ...['mojibakeScore', 'decodeCp1252AsUtf8', 'repairMojibake', 'fixKnownUiTransliterations', 'cleanText', 'normalizeTeamName',
      'normalizeOpponentNameForAllTime', 'isFreiburgTuebingenSgName', 'isMannheimLudwigshafenSgName'].map(fnSource),
    constSource('ULM_TEAM_ALIAS_KEYS'),
    ...['isUlmTeamName', 'detectUlmSide', 'seasonOrderIndex', 'matchcenterSeasonLabel', 'matchcenterSeasonIsUlmTuebingenSgEra',
      'teamAliasSeasonMatches', 'normalizeTeamKey', 'teamAliasRuleMatches', 'isOwnTeam', 'getCanonicalTeamName', 'isYouthGame', 'parseGameClock'].map(fnSource),
  ].join('\n');
  const ctx = vm.createContext({ console, SEASON_CONFIG: seasonConfigStub, STATIC_SEASON_DATA: {}, TextDecoder });
  vm.runInContext(code, ctx);
  return ctx;
})();

console.log('== Drift-Test: Node-Regeln gegen die echten Funktionen aus index.html ==');
{
  const names = [
    'VfB Ulm', 'vfb ulm', '  VfB   Ulm  ', 'SG Sparks Ulm-Tübingen', 'SG Sparks Tübingen-Ulm', 'SG Sparks Ulm-Tuebingen', 'SG Ulm-Tübingen', 'SG Tübingen-Ulm',
    'Ulm', 'Ulm / SG', 'Ulm-Tübingen', 'TSV Ulm', 'SG Freiburg-Tübingen', 'SG Tübingen-Freiburg', 'Freiburg', 'Breisgau Bandits', 'PTSV Freiburg',
    'SV Tübingen Sharks', 'SV Tuebingen Sharks', 'SV 03 Tübingen', 'Tübingen', 'Sportvg Feuerbach', 'Sportvg Feuerbach 1', 'Sportvg Feuerbach 2',
    'SG Mannheim-Ludwigshafen', 'Floorball Mannheim', 'VBC Olympia Ludwigshafen', 'FBC Heidelberg', 'TV Schriesheim', 'DJK Giants Karlsruhe-Ost', 'Élan Ulm', 'Café Freiburg', 'Ünited SG', '', '   ', null, undefined,
  ];
  const seasons = ['', '19/20', '21/22', '22/23', '23/24', '24/25', '25/26', '26/27', '27/28'];
  const diffs = { normalize: [], isUlm: [], detectSide: [], isOwn: [], canonical: [], clock: [], youth: [] };
  for (const n of names) {
    const rn = vm.runInContext('normalizeTeamName', real)(n);
    if (rn !== N.normalizeTeamText(n)) diffs.normalize.push(n);
    if (vm.runInContext('isUlmTeamName', real)(n) !== N.isUlmTeamName(n)) diffs.isUlm.push(n);
    for (const s of seasons) {
      if (vm.runInContext('isOwnTeam', real)(n, s) !== N.isOwnTeam(n, s)) diffs.isOwn.push(`${n}@${s}`);
      if (vm.runInContext('getCanonicalTeamName', real)(n, s, 'season') !== N.canonicalTeamName(n, s)) diffs.canonical.push(`${n}@${s}`);
    }
  }
  for (const [h, g] of [['VfB Ulm', 'X'], ['X', 'SG Sparks Ulm-Tübingen'], ['X', 'Y'], ['SG Sparks Tübingen-Ulm', 'VfB Ulm'], ['', '']]) {
    const game = { home_team_name: h, guest_team_name: g };
    if (vm.runInContext('detectUlmSide', real)(game) !== N.detectUlmSide(game)) diffs.detectSide.push(`${h}|${g}`);
  }
  for (const t of ['0:41', '20:00', '12', '5:60', '3.25', '', null, undefined, ' 9:05 ', '1:2', '100:00', '31.41', 'abc', 41, '00:00']) {
    if (vm.runInContext('parseGameClock', real)(t) !== N.parseClockSeconds(t)) diffs.clock.push(String(t));
  }
  for (const f of [{}, { league_name: 'Verbandsliga' }, { league_name: 'U15 Meisterschaft' }, { competition_name: 'Jugend' }, { season: { name: 'Junior Cup' } }, { spielplan_name: 'Nachwuchs' }, { game_type: 'U 17' }]) {
    if (vm.runInContext('isYouthGame', real)(f) !== N.isYouthGame(f)) diffs.youth.push(JSON.stringify(f));
  }
  for (const [k, v] of Object.entries(diffs)) assertEqual(v, [], `Drift ${k}: keine Abweichung zu index.html`);
  assertEqual(N.SEASON_KEYS_ORDER, Object.keys(seasonConfigStub), 'SEASON_KEYS_ORDER entspricht den Schlüsseln von SEASON_CONFIG in index.html');
  for (const a of ['VfB Ulm', 'SG Sparks Ulm-Tübingen', 'SG Sparks Tübingen-Ulm']) assertTrue(N.isUlmTeamName(a), `isUlmTeamName("${a}")`);
  assertEqual(['21/22', '22/23', '23/24'].map((s) => N.teamKeyFor('SG Sparks Tübingen-Ulm', s)), ['vfb-ulm', 'vfb-ulm', 'vfb-ulm'], 'SG Sparks Tübingen-Ulm → vfb-ulm (SG-Ära)');
  assertEqual(N.teamKeyFor('SG Sparks Ulm-Tübingen', '22/23'), 'vfb-ulm', 'SG Sparks Ulm-Tübingen → vfb-ulm (22/23)');
  assertEqual(N.isOwnTeam('SG Sparks Ulm-Tübingen', '25/26'), vm.runInContext('isOwnTeam', real)('SG Sparks Ulm-Tübingen', '25/26'), 'SG-Name nach der SG-Ära: gleiche Entscheidung wie index.html');
  assertEqual(N.teamKeyFor('Sportvg Feuerbach 1', '22/23'), 'sportvg-feuerbach', 'Feuerbach 1 (22/23) → sportvg-feuerbach');
  assertEqual(N.teamKeyFor('Sportvg Feuerbach 2', '22/23'), 'sportvg-feuerbach-2', 'Feuerbach 2 bleibt eigenes Team');
  assertEqual(N.teamKeyFor('SV Tübingen Sharks', '25/26'), 'sv-tuebingen-sharks', 'SV Tübingen Sharks → sv-tuebingen-sharks');
}

// ── Synthetische Spiele ─────────────────────────────────────────────────
let nextId = 1000;
function roster(base, { goalie = true, extraGoalie = false, goalieFlag = true } = {}) {
  const list = [
    { player_id: base + 11, player_name: `F${base + 11}`, player_firstname: 'A', trikot_number: 11, position: 'Feld' },
    { player_id: base + 12, player_name: `F${base + 12}`, player_firstname: 'B', trikot_number: 12, position: 'Feld' },
    { player_id: base + 13, player_name: `F${base + 13}`, trikot_number: 13, position: 'Feld', captain: true },
  ];
  if (goalie) list.push({ player_id: base + 1, player_name: `G${base + 1}`, trikot_number: 1, position: 'Tor', ...(goalieFlag ? { goalkeeper: true } : {}) });
  if (extraGoalie) list.push({ player_id: base + 2, player_name: `G${base + 2}`, trikot_number: 2, position: 'Tor', goalkeeper: true });
  return list;
}
const goal = (team, period, time, number, extra = {}) => ({ event_id: null, event_type: 'goal', event_team: team, period, time, number, goal_type: 'regular', ...extra });
function game(o = {}) {
  const id = o.id ?? ++nextId;
  const hg = o.hg ?? 0;
  const gg = o.gg ?? 0;
  const g = {
    id, game_number: String(o.gameNumber ?? id), date: o.date ?? '2026-01-10', game_day: { game_day_number: o.day ?? 1 },
    home_team_name: o.home ?? 'VfB Ulm', guest_team_name: o.guest ?? 'FBC Heidelberg', ended: o.ended ?? true, started: true,
    result: o.result === null ? null : { home_goals: hg, guest_goals: gg, forfait: o.forfait ?? false, overtime: false },
    players: o.players ?? { home: roster(100, o.homeRoster), guest: roster(200, o.guestRoster) }, events: o.events ?? [],
  };
  if (o.time !== null) g.start_time = o.time ?? '11:00';
  if ('host' in o) g.hosting_club = o.host;
  if (o.notice !== undefined) g.notice_type = o.notice;
  if (o.league !== undefined) g.league_name = o.league;
  if (o.endedRaw !== undefined) g.ended = o.endedRaw === 'DELETE' ? undefined : o.endedRaw;
  return g;
}
const season = (games, key = '25/26') => ({ season: key, label: key, games });
const run = (games, key) => N.normalizeSeason(season(games, key));
/** Alle Werte (rekursiv) — prüft, dass nirgends eine Funktion oder ein geerbter Wert in der Ausgabe landet. */
const containsFunction = (v) => typeof v === 'function' || (v && typeof v === 'object' && Object.values(v).some(containsFunction));

console.log('== Tore: normal, Eigentor, not_assigned, Assists ==');
{
  const r = run([game({
    hg: 3, gg: 1,
    events: [
      goal('home', 1, '0:41', 11, { assist: 12, home_goals: 1, guest_goals: 0 }),
      goal('guest', 1, '9:05', 12, { assist: 0, home_goals: 1, guest_goals: 1 }),
      goal('home', 1, '12:00', 1000, { assist: 2000, goal_type: 'owngoal', home_goals: 2, guest_goals: 1 }),
      goal('home', 2, '5:30', 2000, { goal_type: 'not_assigned', home_goals: 3, guest_goals: 1 }),
    ],
  }), game({ hg: 1, gg: 0, home: 'X', guest: 'Y', events: [goal('home', 1, '3:00', 11, { assist: null, home_goals: 1, guest_goals: 0 })], players: { home: roster(300), guest: roster(400) } })]);
  const [g1, g2, g3, g4] = r.goalEvents;
  assertEqual(r.goalEvents.length, 5, 'alle 5 Tor-Events übernommen (auch Eigentor und not_assigned)');
  assertEqual([g1.goalType, g1.isOwnGoal, g1.isNotAssigned, g1.isPenaltyShot, g1.derived.scorerPlayerId, g1.derived.scorerMatch, g1.absSec, g1.timeFormat], ['regular', false, false, false, 111, 'roster', 41, 'perPeriod'], 'normales Tor: Schütze über event_team + Nummer, absSec 41');
  assertEqual([g1.assistRaw, g1.derived.assistKind, g1.derived.assistPlayerId, g1.assistNumber], ['number', 'player', 112, 12], 'Assist mit Nummer → Kaderspieler');
  assertEqual([g1.derived.scoreBefore, g1.scoreAfter], [{ home: 0, guest: 0 }, { home: 1, guest: 0 }], 'Spielstand vor (abgeleitet) und nach (roh) dem Tor');
  assertEqual([g2.assistRaw, g2.derived.assistKind, g2.derived.assistPlayerId, g2.assistNumber], ['zero', 'none', null, null], 'Assist 0 = kein Assist (Rohform zero)');
  assertEqual([g3.goalType, g3.isOwnGoal, g3.derived.scorerPlayerId, g3.derived.scorerMatch, g3.scorerNumber], ['owngoal', true, null, 'placeholder', 1000], 'Eigentor: Information und Rohnummer erhalten, keinem Spieler zugeschrieben');
  assertEqual([g3.derived.assistKind, g3.derived.assistPlayerId, g3.assistNumber], ['placeholder', null, 2000], 'Eigentor: Assist-Platzhalter 2000 erzeugt keinen Assist, Rohnummer bleibt');
  assertEqual([g4.goalType, g4.isNotAssigned, g4.derived.scorerPlayerId, g4.derived.scorerMatch], ['not_assigned', true, null, 'placeholder'], 'not_assigned bleibt eigene Torart ohne Spielerzuordnung');
  assertEqual([g4.assistRaw, g4.derived.assistKind], ['missing', 'none'], 'fehlender assist-Schlüssel = kein Assist (Rohform missing)');
  assertEqual([r.goalEvents[4].assistRaw, r.goalEvents[4].derived.assistKind], ['null', 'none'], 'assist null: Rohform null, = kein Assist');
  const q = r.quality;
  assertEqual([q.assists.number, q.assists.zero, q.assists.null, q.assists.missing, q.assists.placeholder, q.assists.nullish], [1, 1, 1, 1, 1, 2], 'Qualität: Assist-Rohformen getrennt gezählt (null 1, fehlend 1, 0 1)');
  assertEqual([q.goals, q.goalTypes.regular, q.goalTypes.owngoal, q.goalTypes.not_assigned, q.ownGoals.events, q.ownGoals.games, q.ownGoals.eventsUlm, q.ownGoals.gamesUlm], [5, 3, 1, 1, 1, 1, 1, 1], 'Qualität: Torarten und Eigentore mit Ulm-Beteiligung');
  assertEqual(q.placeholderNumbers, [1000, 2000], 'Qualität: Platzhalternummern 1000/2000 ausgewiesen');
}

console.log('== scoreDeltaSide: beobachtbarer Datenfakt aus der Spielstandkette ==');
{
  const r = run([game({ hg: 4, gg: 3, events: [
    goal('home', 1, '1:00', 11, { home_goals: 1, guest_goals: 0 }),                          // 0:0 → 1:0  home
    goal('guest', 1, '2:00', 12, { home_goals: 1, guest_goals: 1 }),                         // 1:0 → 1:1  guest
    goal('home', 1, '3:00', 11, { home_goals: 3, guest_goals: 1 }),                          // 1:1 → 3:1  gebrochen → null
    goal('guest', 1, '4:00', 12, { home_goals: 3, guest_goals: 2 }),                         // Kette läuft ab 3:1 weiter → guest
    goal('home', 1, '5:00', 11, { home_goals: 3, guest_goals: 2 }),                          // keine Änderung → null
    goal('home', 1, '6:00', 11),                                                             // Spielstand fehlt → null
    goal('home', 1, '7:00', 11, { home_goals: 4 }),                                          // nur eine Seite vorhanden → null
    goal('home', 1, '8:00', 11, { home_goals: 4, guest_goals: 2 }),                          // seit letztem bekannten Stand 3:2 → 4:2 home
    goal('home', 1, '9:00', 1000, { goal_type: 'owngoal', home_goals: 4, guest_goals: 3 }),  // event_team home, Stand steigt für guest
  ] })]);
  const d = r.goalEvents.map((e) => e.derived.scoreDeltaSide);
  assertEqual(d, ['home', 'guest', null, 'guest', null, null, null, 'home', 'guest'], 'scoreDeltaSide: home / guest / null (gebrochene Kette, keine Änderung, fehlender oder halber Stand)');
  assertEqual(r.goalEvents.map((e) => e.derived.scoreBefore), [{ home: 0, guest: 0 }, { home: 1, guest: 0 }, { home: 1, guest: 1 }, { home: 3, guest: 1 }, { home: 3, guest: 2 }, { home: 3, guest: 2 }, { home: 3, guest: 2 }, { home: 3, guest: 2 }, { home: 4, guest: 2 }], 'scoreBefore: Kette läuft nach einem Bruch vom Rohstand weiter, fehlende Stände lassen sie unverändert');
  assertEqual(r.goalEvents.map((e) => e.scoreAfter), [{ home: 1, guest: 0 }, { home: 1, guest: 1 }, { home: 3, guest: 1 }, { home: 3, guest: 2 }, { home: 3, guest: 2 }, null, null, { home: 4, guest: 2 }, { home: 4, guest: 3 }], 'scoreAfter: Roh-Spielstände unverändert (fehlend/halb → null)');
  assertEqual([r.quality.scoreChainBreaks, r.quality.scoreMissing], [2, 2], 'Qualität: 2 Brüche (Sprung und keine Änderung), 2 fehlende Stände');
  assertEqual(r.quality.scoreDeltaSideConflicts, [{ gameId: r.goalEvents[0].gameId, eventKey: `${r.goalEvents[0].gameId}#8`, goalType: 'owngoal', teamSide: 'home', scoreDeltaSide: 'guest' }], 'Konfliktfall (Eigentor: event_team home, Stand steigt für guest) bleibt als Qualitätseintrag sichtbar');
  const codes = r.warnings.map((w) => w.code);
  assertEqual([codes.filter((c) => c === 'score_chain_break').length, codes.filter((c) => c === 'score_missing').length, codes.filter((c) => c === 'score_delta_side_differs_from_event_team').length], [2, 2, 1], 'Qualitätswarnungen: Bruch, fehlender Stand, event_team-Konflikt');
  assertTrue(r.goalEvents.slice(0, 8).every((e, i) => e.teamSide === 'home' || i === 1 || i === 3), 'teamSide bleibt der Rohwert event_team (nie durch scoreDeltaSide ersetzt)');
  const og = r.goalEvents[8];
  assertEqual([og.teamSide, og.teamKey, og.goalType, og.isOwnGoal, og.scoreAfter], ['home', 'vfb-ulm', 'owngoal', true, { home: 4, guest: 3 }], 'Eigentor: teamSide/teamKey = Rohwert event_team, goalType, isOwnGoal und Roh-Spielstand erhalten');
}

console.log('== Keine Eigentor-Gutschrift in M0 ==');
{
  const r = run([game({ hg: 1, gg: 1, events: [
    goal('home', 1, '2:00', 1000, { goal_type: 'owngoal', home_goals: 0, guest_goals: 1 }),
    goal('guest', 1, '5:00', 1000, { goal_type: 'owngoal', home_goals: 1, guest_goals: 1 }),
  ] })]);
  const flat = JSON.stringify(r);
  assertTrue(!/credit/i.test(flat), 'Ausgabe enthält nirgends ein credit…-Feld (creditedSide, creditedSideSource, creditedTeamKey, credit-Zähler)');
  assertEqual(r.goalEvents.map((e) => [e.teamSide, e.derived.scoreDeltaSide]), [['home', 'guest'], ['guest', 'home']], 'Eigentore: nur Rohseite und beobachteter Spielstandfakt — beide bleiben nebeneinander');
  assertEqual(Object.keys(r.quality.ownGoals).sort(), ['events', 'eventsUlm', 'games', 'gamesUlm'], 'ownGoals-Zähler: nur Fakten (Events/Spiele/Ulm), keine Gutschrift-Zähler');
  assertEqual(r.quality.scoreDeltaSideConflicts.length, 2, 'beide Konflikte als Qualitätseinträge sichtbar');
  assertEqual(r.goalEvents.map((e) => [e.teamKey]), [['vfb-ulm'], ['fbc-heidelberg']], 'teamKey folgt event_team (Rohseite), nicht dem Spielstand');
}

console.log('== Zeit: normale HZ2, kumulierte HZ2, HZ1 > 20:00, unlesbar ==');
{
  const normal = run([game({ hg: 1, gg: 0, events: [goal('home', 1, '19:59', 11, { home_goals: 1, guest_goals: 0 }), { event_type: 'timeout', event_team: 'guest', period: 2, time: '16:34' }] })]);
  assertEqual([normal.goalEvents[0].absSec, normal.timeoutEvents[0].absSec, normal.timeoutEvents[0].timeFormat], [1199, 2194, 'perPeriod'], 'normale HZ2: absSec = 1200 + Sekunden (16:34 → 2194)');
  assertEqual([normal.quality.time.h2CumulatedGames, normal.quality.time.h1OverLengthGames], [0, 0], 'normales Spiel: nicht kumuliert');

  const cum = run([game({ hg: 2, gg: 0, events: [
    goal('home', 1, '10:00', 11, { home_goals: 1, guest_goals: 0 }),
    goal('home', 2, '25:10', 12, { home_goals: 2, guest_goals: 0 }),
    { event_type: 'penalty', event_team: 'guest', period: 2, time: '31:00', number: 12, penalty_type: 'penalty_2' },
  ] })]);
  assertEqual(cum.goalEvents.map((e) => [e.absSec, e.timeFormat]), [[600, 'perPeriod'], [1510, 'cumulated']], 'kumulierte HZ2: 25:10 → absSec 1510 (nicht +1200)');
  assertEqual([cum.penaltyEvents[0].absSec, cum.quality.time.h2CumulatedGames, cum.quality.time.h2MixedGames], [1860, 1, 0], 'kumuliert: Strafe 31:00 → 1860; Spiel als kumuliert gezählt, nicht gemischt');

  const mixed = run([game({ hg: 2, gg: 0, events: [
    goal('home', 2, '25:10', 11, { home_goals: 1, guest_goals: 0 }),
    goal('home', 2, '10:00', 12, { home_goals: 2, guest_goals: 0 }),
  ] })]);
  assertEqual(mixed.goalEvents.map((e) => [e.absSec, e.timeFormat, e.timeRaw]), [[1510, 'cumulated', '25:10'], [null, 'ambiguousInCumulated', '10:00']], 'HZ2-Zeit ≤ 20:00 in kumuliertem Spiel: absSec null (nicht rekonstruiert), Rohzeit bleibt');
  assertEqual([mixed.quality.time.h2CumulatedGames, mixed.quality.time.h2MixedGames, mixed.quality.time.eventsAmbiguous], [1, 1, 1], 'Qualität: gemischtes Spiel ausgewiesen');

  const h1 = run([game({ hg: 1, gg: 0, events: [goal('home', 1, '21:00', 11, { home_goals: 1, guest_goals: 0 }), goal('home', 2, '5:00', 11, { home_goals: 2, guest_goals: 0 })] })]);
  assertEqual(h1.goalEvents.map((e) => [e.absSec, e.timeFormat]), [[1260, 'h1OverLength'], [1500, 'perPeriod']], 'HZ1 > 20:00 (Negativfall): nicht kumuliert, HZ2 bleibt perPeriod');
  assertEqual([h1.quality.time.h1OverLengthGames, h1.quality.time.h2CumulatedGames], [1, 0], 'Qualität: HZ1 > 20:00 gemeldet, kein kumuliertes Spiel');

  const bad = run([game({ hg: 1, gg: 0, events: [goal('home', 1, '3.25', 11, { home_goals: 1, guest_goals: 0 }), goal('home', null, '3:00', 11, { home_goals: 2, guest_goals: 0 })] })]);
  assertEqual(bad.goalEvents.map((e) => [e.absSec, e.timeFormat, e.timeRaw]), [[null, 'unparseable', '3.25'], [null, 'unknownPeriod', '3:00']], 'Zeit "3.25" bzw. fehlende Periode: absSec null, Rohzeit bleibt (keine Schätzung)');
  assertEqual([bad.quality.time.goalsUnparsable, bad.quality.time.eventsUnparsable], [2, 2], 'Qualität: nicht lesbare Zeiten gezählt');
  assertEqual(N.parseClockSeconds('20:00'), 1200, 'parseClockSeconds("20:00") = 1200');
  assertEqual(N.eventTiming({ period: 3, time: '1:00' }, { h2Cumulated: false }), { absSec: 2460, timeFormat: 'perPeriod' }, 'Verlängerung (period 3, 1:00): 2 · 1200 + 60 Sekunden');
}

console.log('== Strafdaten: Rohwerte statt Minutenumrechnung; Penalty-Schuss, Timeout ==');
{
  const types = ['penalty_2', 'penalty_10', 'penalty_2and2', 'penalty_ms_full', 'penalty_xyz', undefined, null, '', 'constructor', 'toString', '__proto__', 'hasOwnProperty'];
  const events = [goal('home', 1, '4:00', 11, { goal_type: 'penalty_shot', home_goals: 1, guest_goals: 0 })];
  types.forEach((t, i) => {
    const e = { event_id: 100 + i, event_type: 'penalty', event_team: 'guest', period: 1, time: `${i + 5}:00`, number: 12, penalty_id: 40 + i, penalty_code_id: i % 2 ? undefined : 13, penalty_type_string: `S${i}`, penalty_reason: 915, penalty_reason_string: 'x' };
    if (t !== undefined) e.penalty_type = t;
    events.push(e);
  });
  events.push({ event_id: 9002, event_type: 'timeout', event_team: 'guest', period: 2, time: '16:34' });
  const r = run([game({ hg: 1, gg: 0, events })]);
  assertEqual(r.penaltyEvents.length, 12, 'alle 12 Strafen-Events übernommen');
  assertEqual(r.penaltyEvents.map((e) => e.penaltyType), types.map((t) => (t === undefined ? null : t)), 'Strafart: Rohwert unverändert (fehlend → null); unbekannte und geerbte Namen (constructor, toString, __proto__, hasOwnProperty) bleiben Rohtext');
  assertTrue(r.penaltyEvents.every((e) => !('penaltyMinutes' in e) && !('minutes' in e)), 'keine Minutenumrechnung: kein penaltyMinutes-Feld (auch nicht für penalty_2 / penalty_10 / penalty_2and2)');
  assertTrue(!containsFunction(r), 'nirgends ein Funktionsobjekt in der Ausgabe (kein Prototyp-Zugriff)');
  assertEqual(r.penaltyEvents.slice(0, 3).map((e) => [e.penaltyType, e.penaltyTypeString]), [['penalty_2', 'S0'], ['penalty_10', 'S1'], ['penalty_2and2', 'S2']], 'penalty_2 / penalty_10 / penalty_2and2: Typ und Typtext roh, keine Klassifikation');
  assertEqual(r.penaltyEvents.map((e) => [e.penaltyId, e.penaltyCodeId]).slice(0, 3), [[40, 13], [41, null], [42, 13]], 'penalty_id / penalty_code_id roh (fehlend → null)');
  assertEqual([r.penaltyEvents[0].derived.playerId, r.penaltyEvents[0].teamKey, r.penaltyEvents[0].reason, r.penaltyEvents[0].reasonId, r.penaltyEvents[0].playerNumber], [212, 'fbc-heidelberg', 'x', 915, 12], 'Strafe: Grund roh, Spieler nur abgeleitet (event_team + Nummer)');
  assertEqual([r.goalEvents[0].isPenaltyShot, r.penaltyShotEvents.length, r.quality.penaltyShots], [true, 1, 1], 'Penalty-Schuss = Tor mit goal_type penalty_shot (penaltyShotEvents), nicht aus Strafen-Events abgeleitet');
  assertEqual([r.penaltyEvents.length, r.quality.penaltyEvents], [12, 12], 'Strafen-Events getrennt von Penalty-Schüssen (12 Strafen erzeugen keinen Penalty-Schuss)');
  assertEqual(r.timeoutEvents.map((e) => [e.eventId, e.teamKey, e.absSec, e.homeGoals]), [[9002, 'fbc-heidelberg', 2194, null]], 'Timeout: Team, absSec, kein erfundener Spielstand');
  assertEqual(r.quality.timeouts, 1, 'Qualität: Timeouts gezählt');
}

console.log('== Spielfilter: Reihenfolge, mehrere Gründe, Rohmarker ==');
{
  assertEqual(N.EXCLUSION_REASON_ORDER, ['not_ended', 'youth', 'forfeit', 'postponed', 'no_result'], 'feste Reihenfolge der Ausschlussgründe');
  assertEqual(N.classifyModelGame(game({})), { included: true, reason: null, reasons: [] }, 'beendetes Spiel wird aufgenommen');
  assertEqual(N.classifyModelGame(game({ ended: false })).reason, 'not_ended', 'ended false → not_ended');
  assertEqual(N.classifyModelGame({ ...game({}), ended: undefined }).reason, 'not_ended', 'ended fehlt → not_ended');
  assertEqual(N.classifyModelGame({ ...game({}), ended: 'true' }).reason, 'not_ended', 'ended "true" (String) zählt nicht (strikt === true)');
  assertEqual(N.classifyModelGame(game({ forfait: true })).reason, 'forfeit', 'Forfait ausgeschlossen');
  assertEqual(N.classifyModelGame(game({ notice: 'Postponed' })).reason, 'postponed', 'verschoben (Postponed) ausgeschlossen');
  assertEqual(N.classifyModelGame(game({ notice: 'verlegt' })).reason, 'postponed', 'verlegt ausgeschlossen (Spezifikation 3.6.3)');
  assertEqual(N.classifyModelGame(game({ notice: 'Canceled' })).included, true, 'Canceled wird NICHT interpretiert (keine nicht spezifizierte Statusregel)');
  assertEqual(N.classifyModelGame(game({ notice: 'abgesagt' })).included, true, 'abgesagt wird NICHT interpretiert');
  assertEqual(N.classifyModelGame(game({ notice: '' })).included, true, 'leerer notice_type schließt nicht aus');
  assertEqual(N.classifyModelGame(game({ league: 'U15 Meisterschaft' })).reason, 'youth', 'Jugendspiel ausgeschlossen');
  assertEqual(N.classifyModelGame(game({ result: null })).reason, 'no_result', 'ohne Endstand ausgeschlossen');
  assertEqual(N.classifyModelGame({ ...game({}), result: { home_goals: 'x', guest_goals: 2, forfait: false } }).reason, 'no_result', 'nicht numerischer Endstand ausgeschlossen');
  // Kombinationen: Hauptgrund = erster in der Reihenfolge, alle zutreffenden Gründe stehen in reasons
  const all = N.classifyModelGame({ ...game({ ended: false, league: 'U15', notice: 'Postponed' }), result: { home_goals: null, guest_goals: null, forfait: true } });
  assertEqual([all.reason, all.reasons], ['not_ended', ['not_ended', 'youth', 'forfeit', 'postponed', 'no_result']], 'alle fünf Gründe gleichzeitig: Hauptgrund not_ended, alle in fester Reihenfolge');
  const yfp = N.classifyModelGame(game({ league: 'U13', forfait: true, notice: 'Postponed' }));
  assertEqual([yfp.reason, yfp.reasons], ['youth', ['youth', 'forfeit', 'postponed']], 'Jugend + Forfait + verschoben: Hauptgrund youth');
  const fp = N.classifyModelGame(game({ forfait: true, notice: 'Postponed' }));
  assertEqual([fp.reason, fp.reasons], ['forfeit', ['forfeit', 'postponed']], 'Forfait + verschoben: Hauptgrund forfeit');
  const pn = N.classifyModelGame({ ...game({ notice: 'Postponed' }), result: null });
  assertEqual([pn.reason, pn.reasons], ['postponed', ['postponed', 'no_result']], 'verschoben + ohne Endstand: Hauptgrund postponed');

  const r = run([
    game({ id: 501, ended: false, hg: 2, gg: 17, notice: 'Postponed', events: [goal('home', 1, '1:00', 11, { home_goals: 1, guest_goals: 0 })] }),
    game({ id: 502, forfait: true, hg: 8, gg: 0 }),
    game({ id: 503, league: 'U13' }),
    game({ id: 504, notice: 'verlegt' }),
    game({ id: 505, result: null }),
    game({ id: 506, result: null, endedRaw: 'DELETE' }),
    game({ id: 507, result: null, endedRaw: 'true' }),
    game({ id: 508, notice: 'Canceled', hg: 3, gg: 1 }),
  ]);
  const q = r.quality;
  assertEqual([q.games, q.ended, q.notEnded, q.modelGames], [8, 5, 3, 1], 'Zählung Spiele / beendet / nicht beendet / Modell');
  assertEqual(q.excluded, { forfeit: 1, postponed: 1, youth: 1, noResult: 1 }, 'Ausschlüsse beendeter Spiele getrennt nach Hauptgrund gezählt');
  assertEqual(q.excludedGames.map((e) => [e.gameId, e.seasonKey, e.reason, e.ended, e.noticeType, e.resultForfait, e.score, e.events]), [
    [501, '25/26', 'not_ended', false, 'Postponed', false, '2:17', 1],
    [502, '25/26', 'forfeit', true, null, true, '8:0', 0],
    [503, '25/26', 'youth', true, null, false, '0:0', 0],
    [504, '25/26', 'postponed', true, 'verlegt', false, '0:0', 0],
    [505, '25/26', 'no_result', true, null, null, null, 0],
    [506, '25/26', 'not_ended', null, null, null, null, 0],
    [507, '25/26', 'not_ended', 'true', null, null, null, 0],
  ], 'Ausschlussbericht: ID, Saison, Grund und Rohmarker (ended, notice_type, result.forfait), Endstand, Eventzahl');
  assertEqual(q.excludedGames.map((e) => e.reasons), [['not_ended', 'postponed'], ['forfeit'], ['youth'], ['postponed'], ['no_result'], ['not_ended', 'no_result'], ['not_ended', 'no_result']], 'Ausschlussbericht: alle zutreffenden Gründe je Spiel');
  assertTrue(q.excludedGames.every((e) => e.ulmInvolved === true), 'Ausschlussbericht: Ulm-Beteiligung markiert (VfB Ulm im Test)');
  assertEqual(q.endedFalseWithEvidence.map((e) => e.gameId), [501], 'ended ≠ true mit Events/Endstand: nur 501 (Untermenge der Ausschlüsse)');
  assertEqual(r.teamGames.length, 2, 'nur das beendete Modell-Spiel (508, Canceled) erzeugt Team-Spiele');
  assertEqual(r.teamGames[0].noticeType, 'Canceled', 'Canceled-Rohwert bleibt am Team-Spiel erhalten (keine Interpretation)');
  assertEqual(r.goalEvents.length, 0, 'Tore aus ausgeschlossenen Spielen fließen nicht ein');
  const codes = r.warnings.map((w) => w.code);
  assertEqual([codes.filter((c) => c === 'ended_false_with_evidence').length, codes.filter((c) => c === 'game_excluded').length], [1, 3 + 1], 'Warnungen: ended_false_with_evidence für 501, game_excluded für die 4 beendeten Ausschlüsse');
}

console.log('== Fehlende Anstoßzeit und Reihenfolge am Spieltag (abgeleitet) ==');
{
  const r = run([
    game({ id: 1, gameNumber: 6, time: null, hg: 3, gg: 1, home: 'A', guest: 'B' }),
    game({ id: 2, gameNumber: 5, time: null, hg: 1, gg: 4, home: 'C', guest: 'A' }),
    game({ id: 3, gameNumber: 7, time: null, hg: 0, gg: 2, home: 'B', guest: 'C' }),
  ]);
  const a = r.teamGames.filter((t) => t.teamKey === 'a');
  assertEqual(a.map((t) => [t.gameId, t.startTime, t.derived.gameOrderOfDay]), [[2, null, 1], [1, null, 2]], 'ohne Anstoßzeit: Reihenfolge über game_number (5 vor 6)');
  assertEqual(a.map((t) => t.derived.ownPrevGameGoalDiff), [null, 3], 'ownPrevGameGoalDiff: Tordifferenz des 1. Spiels (A: 4:1 → +3)');
  const c = r.teamGames.filter((t) => t.teamKey === 'c');
  assertEqual(c.map((t) => [t.gameId, t.derived.gameOrderOfDay, t.derived.opponentGameOrderOfDay]), [[2, 1, 1], [3, 2, 2]], 'Gegner-Reihenfolge am Spieltag (Gegner A: 1. Spiel, Gegner B: 2. Spiel)');
  const cSecond = c.find((t) => t.derived.gameOrderOfDay === 2);
  assertEqual([cSecond.opponentKey, cSecond.derived.opponentPrevGameGoalDiff], ['b', -2], 'Gegner im 2. Spiel: Tordifferenz seines 1. Spiels (B verlor 1:3 → -2)');
  const cFirst = c.find((t) => t.derived.gameOrderOfDay === 1);
  assertEqual([cFirst.opponentKey, cFirst.derived.opponentPrevGameGoalDiff], ['a', null], 'Gegner im 1. Spiel: keine Vorspiel-Tordifferenz');
  const bFirst = r.teamGames.find((t) => t.teamKey === 'b' && t.derived.gameOrderOfDay === 1);
  assertEqual([bFirst.opponentKey, bFirst.derived.opponentGameOrderOfDay, bFirst.derived.opponentPrevGameGoalDiff], ['a', 2, 3], 'Gegner A im 2. Spiel: Tordifferenz seines 1. Spiels (A gewann 4:1 → +3)');
  const single = run([game({ id: 10, home: 'A', guest: 'B', hg: 1, gg: 0 })]);
  assertEqual(single.teamGames.map((t) => t.derived.gameOrderOfDay), [null, null], 'nur 1 Modell-Spiel des Teams am Spieltag: Reihenfolge nicht bestimmbar (null)');
}

console.log('== Roster und Goalies ("Tor"), Rohfelder ==');
{
  const r = run([game({ hg: 0, gg: 0, homeRoster: { extraGoalie: true }, guestRoster: { goalieFlag: false } })]);
  const home = r.teamGames.find((t) => t.side === 'home');
  const guest = r.teamGames.find((t) => t.side === 'guest');
  assertEqual([home.goalieCount, home.fieldPlayerCount, home.goalieIds], [2, 3, [101, 102]], 'zwei Goalies (position "Tor") erkannt, Feldspieler ohne Goalies');
  assertEqual([guest.goalieCount, guest.goalieIds], [1, [201]], 'position "Tor" genügt auch ohne goalkeeper-Flag');
  assertEqual(r.rosterEntries.filter((e) => e.isGoalie).length, 3, 'Roster-Einträge: 3 Goalies markiert');
  assertEqual(r.rosterEntries.filter((e) => e.side === 'home' && e.isCaptain).length, 1, 'Kapitän übernommen');
  const first = r.rosterEntries[0];
  assertEqual([first.playerId, first.firstName, first.lastName, first.playerName, first.position, first.trikotNumber, first.goalkeeperFlag, first.captainFlag], [111, 'A', 'F111', 'A F111', 'Feld', 11, null, null], 'Roster: Vor- und Nachname getrennt roh, zusätzlich zusammengesetzter Anzeigename; fehlende Flags → null');
  const cap = r.rosterEntries.find((e) => e.playerId === 113);
  assertEqual([cap.firstName, cap.lastName, cap.playerName, cap.captainFlag, cap.isCaptain], [null, 'F113', 'F113', true, true], 'Roster: fehlender Vorname bleibt null, captain-Rohflag erhalten');
  const g1 = r.rosterEntries.find((e) => e.playerId === 101);
  assertEqual([g1.position, g1.goalkeeperFlag, g1.isGoalie], ['Tor', true, true], 'Roster: position "Tor" und goalkeeper-Rohflag erhalten, isGoalie normalisiert');
  const noFlag = r.rosterEntries.find((e) => e.playerId === 201);
  assertEqual([noFlag.position, noFlag.goalkeeperFlag, noFlag.isGoalie], ['Tor', null, true], 'Roster: Tor ohne goalkeeper-Flag → Rohflag null, isGoalie true');
  assertEqual([r.quality.goalies.twoGoalies, r.quality.goalies.withoutGoalie, r.quality.goalies.flagMismatch], [1, 0, 1], 'Qualität: 2 Goalies gezählt, Flag-Widerspruch (Tor ohne goalkeeper) gemeldet');
  const none = run([game({ hg: 0, gg: 0, players: { home: roster(100, { goalie: false }), guest: [] } })]);
  assertEqual([none.quality.goalies.withoutGoalie, none.quality.goalies.withoutRoster], [2, 1], 'Team-Spiele ohne Goalie bzw. ganz ohne Kader gezählt');
}

console.log('== hosting_club: fehlend → null, Rohwert erhalten, Alias-Lookup geschützt ==');
{
  const one = (host, extra = {}) => run([game({ id: 1, home: 'VfB Ulm', guest: 'FBC Heidelberg', hg: 1, gg: 0, ...('none' === host ? {} : { host }), ...extra })]);
  const iht = (r) => r.teamGames.map((t) => t.derived.isHostingTeam);
  const missing = one('none');
  assertEqual([iht(missing), missing.teamGames.map((t) => t.hostingClub), missing.teamGames.map((t) => t.derived.hostingStatus)], [[null, null], [null, null], ['missing', 'missing']], 'hosting_club fehlt: isHostingTeam null (nicht aus Heim/Gast abgeleitet), Rohwert null');
  assertEqual([missing.quality.hosting.missingGames, missing.quality.hosting.presentGames], [1, 0], 'Qualität: fehlendes hosting_club ausgewiesen');
  assertEqual([iht(one(null)), one(null).teamGames[0].hostingClub], [[null, null], null], 'hosting_club null: isHostingTeam null');
  assertEqual([iht(one(undefined)), one(undefined).teamGames[0].hostingClub], [[null, null], null], 'hosting_club undefined: isHostingTeam null');
  const blank = one('  ');
  assertEqual([iht(blank), blank.teamGames[0].hostingClub, blank.teamGames[0].derived.hostingStatus], [[null, null], '  ', 'missing'], 'leeres/Leerraum-hosting_club: isHostingTeam null, Rohwert bleibt unverändert ("  ")');
  assertEqual(iht(one('')), [null, null], 'leerer String: isHostingTeam null');
  const spaced = one('  VfB Ulm ');
  assertEqual([iht(spaced), spaced.teamGames[0].hostingClub, spaced.teamGames[0].derived.hostingClubTeamKey], [[true, false], '  VfB Ulm ', 'vfb-ulm'], 'Rohwert mit Leerraum bleibt unverändert; nur der abgeleitete Schlüssel ist normalisiert');
  assertEqual(iht(one('FBC Heidelberg')), [false, true], 'Ausrichter = Gastteam (nicht an Heim/Gast gekoppelt)');
  const third = run([game({ id: 5, home: 'A', guest: 'B', host: 'C', hg: 1, gg: 0 }), game({ id: 6, home: 'C', guest: 'A', hg: 0, gg: 1 }), game({ id: 7, home: 'B', guest: 'C', hg: 0, gg: 1 })]);
  assertEqual(third.teamGames.filter((t) => t.gameId === 5).map((t) => t.derived.isHostingTeam), [false, false], 'Ausrichter nimmt am Spiel nicht teil: beide false');
  const alias = run([game({ id: 8, home: 'SV Tübingen Sharks', guest: 'Breisgau Bandits', host: 'SV 03 Tübingen', hg: 1, gg: 0 }), game({ id: 9, home: 'Breisgau Bandits', guest: 'SV Tübingen Sharks', host: 'PTSV Freiburg', hg: 1, gg: 0, day: 2 })]);
  assertEqual(alias.teamGames.map((t) => [t.gameId, t.teamKey, t.derived.isHostingTeam, t.hostingClub]), [[8, 'sv-tuebingen-sharks', true, 'SV 03 Tübingen'], [8, 'breisgau-bandits', false, 'SV 03 Tübingen'], [9, 'breisgau-bandits', true, 'PTSV Freiburg'], [9, 'sv-tuebingen-sharks', false, 'PTSV Freiburg']], 'bekannte Aliase (M0.7): SV 03 Tübingen / PTSV Freiburg; Rohwert bleibt erhalten');
  assertEqual(Object.keys(N.HOSTING_CLUB_ALIASES_V1).sort(), ['ptsv freiburg', 'sv 03 tuebingen'], 'genau die zwei Aliase aus M0.7');
  const unknown = one('Unbekannter Verein e.V.');
  assertEqual([iht(unknown), unknown.quality.hosting.unresolvedClubs, unknown.teamGames[0].derived.hostingStatus], [[null, null], ['Unbekannter Verein e.V.'], 'unresolved'], 'unbekannter Club: null, im Bericht gelistet');
  const noTarget = run([game({ id: 11, home: 'A', guest: 'B', host: 'PTSV Freiburg', hg: 1, gg: 0 })]);
  assertEqual([noTarget.teamGames.map((t) => t.derived.isHostingTeam), noTarget.quality.hosting.unresolvedClubs], [[null, null], ['PTSV Freiburg']], 'Alias, dessen Ziel-Team in der Saison fehlt: null (keine Identität erfunden)');
  for (const bad of ['constructor', 'toString', '__proto__', 'hasOwnProperty', 'valueOf']) {
    const r = one(bad);
    assertEqual([iht(r), r.teamGames[0].hostingClub, r.quality.hosting.unresolvedClubs, containsFunction(r)], [[null, null], bad, [bad], false], `Schutztest "${bad}": kein Prototyp-/Inherited-Lookup, isHostingTeam null, Rohwert erhalten`);
  }
  for (const odd of [123, {}, ['VfB Ulm'], true]) {
    const r = one(odd);
    assertEqual([iht(r), r.teamGames[0].derived.hostingStatus], [[null, null], 'unresolved'], `hosting_club ${JSON.stringify(odd)} (kein Text): unresolved, isHostingTeam null`);
  }
}

console.log('== Platzhalternummern (Quellformat-Erkennung) ==');
{
  const players = { home: [
    { player_id: 9990, player_name: 'P999', trikot_number: 999, position: 'Feld' },
    { player_id: 1001, player_name: 'P1000', trikot_number: 1000, position: 'Feld' },
    { player_id: 2001, player_name: 'P2000', trikot_number: 2000, position: 'Feld' },
    { player_id: 12, player_name: 'P12', trikot_number: 12, position: 'Feld' },
  ], guest: roster(200) };
  const r = run([game({ hg: 8, gg: 0, players, events: [
    goal('home', 1, '1:00', 999, { assist: 999, home_goals: 1, guest_goals: 0 }),
    goal('home', 1, '2:00', 1000, { assist: 1000, home_goals: 2, guest_goals: 0 }),
    goal('home', 1, '3:00', 2000, { assist: 2000, home_goals: 3, guest_goals: 0 }),
    goal('home', 1, '4:00', 12, { assist: 12, home_goals: 4, guest_goals: 0 }),
  ] })]);
  const s = r.goalEvents.map((e) => [e.scorerNumber, e.derived.scorerMatch, e.derived.scorerPlayerId]);
  assertEqual(s, [[999, 'roster', 9990], [1000, 'placeholder', null], [2000, 'placeholder', null], [12, 'roster', 12]], 'Schütze: 999 und 12 normale Spielernummern (Kader), 1000/2000 Quellplatzhalter — Rohnummer bleibt, keine Spieleridentität (auch wenn der Kader eine Nummer 1000 führt)');
  const a = r.goalEvents.map((e) => [e.assistNumber, e.derived.assistKind, e.derived.assistPlayerId]);
  assertEqual(a, [[999, 'player', 9990], [1000, 'placeholder', null], [2000, 'placeholder', null], [12, 'player', 12]], 'Assist: 999/12 Kaderspieler, 1000/2000 Platzhalter mit Rohnummer, ohne Identität');
  assertEqual(r.quality.placeholderNumbers, [1000, 2000], 'Qualität: ausgewiesene Platzhalternummern 1000, 2000 (999 nicht)');
  assertEqual(N.SOURCE_PLACEHOLDER_NUMBER_MIN, 1000, 'Platzhalter-Erkennung ab 1000 (Quellformat, dokumentiert)');
}

console.log('== Verlustfreiheit: Rohfelder bleiben neben normalisierten Feldern erhalten ==');
{
  const g = game({ id: 77, hg: 1, gg: 0, notice: '', host: '  VfB Ulm ', events: [
    goal('home', 1, '0:41', 1000, { event_id: 5, sortkey: '1-00:41', goal_type: 'owngoal', goal_type_string: 'Eigentor', home_goals: 1, guest_goals: 0 }),
    { event_id: 6, event_type: 'penalty', event_team: 'guest', period: 1, time: '5:00', sortkey: '1-05:00', number: 12, penalty_id: 7, penalty_code_id: 13, penalty_type: 'penalty_2', penalty_type_string: "2'", penalty_reason: 915, penalty_reason_string: 'unkorrekter Abstand' },
  ] });
  const r = run([g]);
  const e = r.goalEvents[0];
  assertEqual([e.teamSide, e.goalType, e.goalTypeString, e.sortkey, e.period, e.timeRaw, e.scorerNumber, e.scoreAfter, e.eventId], ['home', 'owngoal', 'Eigentor', '1-00:41', 1, '0:41', 1000, { home: 1, guest: 0 }, 5], 'Tor: event_team, goal_type, goal_type_string, sortkey, Periode, Rohzeit, Nummer, Spielstand nach dem Tor, event_id roh');
  assertEqual([r.penaltyEvents[0].sortkey, r.penaltyEvents[0].penaltyId, r.penaltyEvents[0].penaltyCodeId, r.penaltyEvents[0].penaltyType, r.penaltyEvents[0].penaltyTypeString, r.penaltyEvents[0].reasonId, r.penaltyEvents[0].reason], ['1-05:00', 7, 13, 'penalty_2', "2'", 915, 'unkorrekter Abstand'], 'Strafe: sortkey, penalty_id, penalty_code_id, Typ, Typtext, Grund roh');
  const t = r.teamGames[0];
  assertEqual([t.ended, t.noticeType, t.resultForfait, t.hostingClub, t.teamName, t.opponentName], [true, '', false, '  VfB Ulm ', 'VfB Ulm', 'FBC Heidelberg'], 'Team-Spiel: ended, notice_type (leerer String bleibt ""), result.forfait, hosting_club unverändert, Teamnamen roh');
  const plain = run([game({ id: 78, hg: 1, gg: 0, events: [goal('home', 1, '1:00', 11, { home_goals: 1, guest_goals: 0 })] })]);
  assertEqual([plain.goalEvents[0].goalTypeString, plain.goalEvents[0].sortkey, plain.teamGames[0].noticeType, plain.teamGames[0].hostingClub], [null, null, null, null], 'fehlende Rohfelder → null (nichts erfunden)');
}

console.log('== Ebenen: abgeleitete Felder nur unter `derived` ==');
{
  const r = run([game({ hg: 1, gg: 0, host: 'VfB Ulm', events: [
    goal('home', 1, '1:00', 11, { goal_type: 'penalty_shot', assist: 12, home_goals: 1, guest_goals: 0 }),
    { event_id: 6, event_type: 'penalty', event_team: 'guest', period: 1, time: '5:00', number: 12, penalty_type: 'penalty_2' },
  ] })]);
  const derivedGoal = ['assistKind', 'assistPlayerId', 'scoreBefore', 'scoreDeltaSide', 'scorerMatch', 'scorerPlayerId'];
  assertEqual(Object.keys(r.goalEvents[0].derived).sort(), derivedGoal, 'goalEvents: abgeleitet = scoreBefore, scoreDeltaSide, Spielerzuordnung');
  assertTrue(derivedGoal.every((k) => !(k in r.goalEvents[0])), 'goalEvents: abgeleitete Felder nicht auf der Rohebene');
  const derivedTg = ['gameOrderOfDay', 'hostingClubTeamKey', 'hostingStatus', 'isHostingTeam', 'opponentGameOrderOfDay', 'opponentPrevGameGoalDiff', 'ownPrevGameGoalDiff'];
  assertEqual(Object.keys(r.teamGames[0].derived).sort(), derivedTg, 'teamGames: abgeleitet = gameOrderOfDay, opponentPrevGameGoalDiff, isHostingTeam …');
  assertTrue(derivedTg.every((k) => !(k in r.teamGames[0])), 'teamGames: abgeleitete Felder nicht auf der Rohebene');
  assertEqual([Object.keys(r.penaltyEvents[0].derived), Object.keys(r.penaltyShotEvents[0].derived)], [['playerId'], ['scorerPlayerId']], 'Strafen/Penalty-Schüsse: Spielerzuordnung nur unter derived');
  assertTrue(!('playerId' in r.penaltyEvents[0]) && !('scorerPlayerId' in r.penaltyShotEvents[0]), 'Strafen/Penalty-Schüsse: keine Spielerzuordnung auf der Rohebene');
}

console.log('== Reinheit, Determinismus, Struktur ==');
{
  const games = [game({ hg: 1, gg: 0, events: [goal('home', 1, '1:00', 11, { assist: 12, home_goals: 1, guest_goals: 0 })], host: 'VfB Ulm' }), game({ home: 'A', guest: 'B', hg: 2, gg: 2 })];
  const input = season(games);
  const before = canonicalJson(input);
  const a = N.normalizeSeason(input);
  const b = N.normalizeSeason(JSON.parse(before));
  assertEqual(canonicalJson(input), before, 'Eingabe wird nicht verändert');
  assertEqual(canonicalJson(a), canonicalJson(b), 'gleiche Eingabe → byte-identische Ausgabe');
  assertEqual(Object.keys(a).sort(), ['goalEvents', 'label', 'penaltyEvents', 'penaltyShotEvents', 'quality', 'rosterEntries', 'schemaVersion', 'seasonKey', 'teamGames', 'timeoutEvents', 'warnings'], 'Ausgabestruktur: teamGames, goalEvents, penaltyEvents, timeoutEvents, rosterEntries (+ penaltyShotEvents, quality, warnings)');
  assertEqual(a.schemaVersion, N.MODEL_SCHEMA_VERSION, 'schemaVersion gesetzt');
  assertEqual(N.normalizeSeason({}).teamGames, [], 'leere Eingabe: leere, gültige Ausgabe');
  const src = await readFile(path.join(REPO_ROOT, 'scripts', 'model', 'normalize.mjs'), 'utf8');
  const code = src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*$/gm, '');
  assertTrue(!/\bfetch\(|node:fs|node:http|node:https|Date\.now|new Date|Math\.random|process\./.test(code), 'normalize.mjs: kein Dateisystem, Netzwerk, Uhrzeit, Zufall, process');
  assertTrue(!/credited|penaltyMinutes|PENALTY_MINUTES/.test(code), 'normalize.mjs: keine Eigentor-Gutschrift, keine Strafminuten-Tabelle im Code');
  assertEqual(/const NOTICE_EXCLUDE_RE = (.*);/.exec(code)[1], '/postpone|verschoben|verlegt/i', 'verschoben-Regel exakt wie freigegeben (kein cancel/abgesagt)');
  assertEqual((code.match(/HOSTING_CLUB_ALIASES_V1\[/g) || []).length, 1, 'Alias-Tabelle wird an genau einer Stelle indexiert');
  assertTrue(/Object\.hasOwn\(HOSTING_CLUB_ALIASES_V1, key\) \? HOSTING_CLUB_ALIASES_V1\[key\]/.test(code), 'Alias-Lookup ausschließlich mit Object.hasOwn');
}

console.log('');
if (failures > 0) {
  console.log(`${failures} Test(s) fehlgeschlagen.`);
  process.exitCode = 1;
} else {
  console.log('Alle Tests erfolgreich.');
  process.exitCode = 0;
}

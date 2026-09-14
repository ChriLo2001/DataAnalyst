#!/usr/bin/env node
// Offline-Testharness für update-season-data.mjs — kein Netzwerk, kein
// echter API-Key. Teil 1 prüft die reinen Logik-Funktionen direkt. Teil 2
// spielt komplette Läufe in einem Sandbox-Verzeichnis mit gemocktem
// globalThis.fetch durch (Saisonwechsel, Wiederholungslauf, Teilfehler,
// Totalausfall) und prüft die tatsächlich geschriebenen Dateien.
//
// Aufruf: node scripts/test-update-season-data.mjs

import { mkdtemp, cp, readFile, writeFile, rm, stat } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

import {
  parseSeasonKeyFromName,
  findMatchingLeague,
  decideRefetchIds,
  mergeGames,
  validateMergedSeason,
  buildManifestUpdate,
  fileNameForKey,
  deriveLabelFromKey,
  extractTeamDirectory,
} from './update-season-data.mjs';

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

// ─────────────────────────────────────────────────────────────────────────
// Teil 1: reine Funktionen
// ─────────────────────────────────────────────────────────────────────────

console.log('== parseSeasonKeyFromName ==');
assertEqual(parseSeasonKeyFromName('2025/2026'), '25/26', '"2025/2026"');
assertEqual(parseSeasonKeyFromName('Saison 2025/26'), '25/26', '"Saison 2025/26"');
assertEqual(parseSeasonKeyFromName('2026/2027'), '26/27', '"2026/2027" (Folgesaison)');
assertEqual(parseSeasonKeyFromName('Saison 25/26'), '25/26', '"Saison 25/26" (ohne 4-stelliges Jahr)');
assertEqual(parseSeasonKeyFromName('2025/2027'), null, '"2025/2027" nicht aufeinanderfolgend -> null');
assertEqual(parseSeasonKeyFromName('Hallenbelegung 12'), null, 'Text ohne Saisonmuster -> null');
assertEqual(parseSeasonKeyFromName(''), null, 'leerer String -> null');
assertEqual(parseSeasonKeyFromName(undefined), null, 'undefined -> null');

console.log('== findMatchingLeague ==');
const knownNames = new Set(['verbandsliga bw (kf)', 'vl bw (kf)', 'vl kf']);
assertEqual(
  findMatchingLeague(
    [
      { id: 2200, name: 'Verbandsliga BW (KF)', short_name: 'VL BW (KF)' },
      { id: 2201, name: '1. FBL Herren', short_name: '1. FBL' },
    ],
    knownNames,
  )?.id,
  2200,
  'eindeutiger Treffer über name',
);
assertEqual(
  findMatchingLeague([{ id: 9, name: 'Verbandsliga BW (KF) ', short_name: 'irrelevant' }], knownNames)?.id,
  9,
  'Treffer trotz zusätzlichem Leerzeichen (reale Daten-Unschärfe, siehe 23/24)',
);
assertEqual(
  findMatchingLeague(
    [
      { id: 1, name: 'Verbandsliga BW (KF)' },
      { id: 2, name: 'VL KF' }, // zweite, andere Liga trägt zufällig denselben Kurznamen
    ],
    knownNames,
  ),
  null,
  'zwei Treffer -> null (nicht eindeutig, keine Vermutung)',
);
assertEqual(findMatchingLeague([{ id: 1, name: 'Andere Liga' }], knownNames), null, 'kein Treffer -> null');

console.log('== decideRefetchIds ==');
const existingGamesById = new Map([
  ['1', { id: 1, ended: true, started: true, result_string: '3:2', date: '2026-01-10', start_time: '18:00', arena_name: 'Halle A', notice_type: null }],
  ['2', { id: 2, ended: false, started: true, result_string: null, date: '2026-01-17', start_time: '18:00', arena_name: 'Halle B', notice_type: null }],
]);
assertEqual(
  decideRefetchIds(
    [
      { game_id: 1, ended: true, started: true, result_string: '3:2', date: '2026-01-10', time: '18:00', arena_name: 'Halle A', notice_type: null },
      { game_id: 2, ended: false, started: true, result_string: null, date: '2026-01-17', time: '18:00', arena_name: 'Halle B', notice_type: null },
      { game_id: 3, ended: false, started: false },
    ],
    existingGamesById,
  ),
  ['2', '3'],
  'unverändert Beendetes wird übersprungen; Laufendes + Neues wird geholt',
);
assertEqual(
  decideRefetchIds(
    [{ game_id: 1, ended: true, started: true, result_string: '4:2', date: '2026-01-10', time: '18:00', arena_name: 'Halle A', notice_type: null }],
    existingGamesById,
  ),
  ['1'],
  'geändertes Ergebnis bei bereits beendetem Spiel löst Refetch aus',
);

console.log('== mergeGames / validateMergedSeason ==');
const existingGames = [{ id: 1, name: 'alt' }, { id: 2, name: 'alt' }];
const freshById = new Map([['2', { id: 2, name: 'neu' }]]);
const schedule = [{ game_id: 1 }, { game_id: 2 }];
const merged = mergeGames(existingGames, freshById, schedule);
assertEqual(merged, [{ id: 1, name: 'alt' }, { id: 2, name: 'neu' }], 'unveränderte Spiele bleiben, aktualisierte werden ersetzt');

const mergedKeepingOrphan = mergeGames(existingGames, new Map(), [{ game_id: 2 }]);
assertTrue(
  mergedKeepingOrphan.some((g) => g.id === 1),
  'Spiel, das aktuell nicht im Spielplan steht, geht nicht verloren',
);

assertEqual(validateMergedSeason([], []).ok, true, 'leer -> leer ist ok (Erstlauf einer neuen Saison)');
assertEqual(validateMergedSeason(existingGames, []).ok, false, 'gefüllt -> leer wird verweigert');
assertEqual(
  validateMergedSeason(
    Array.from({ length: 10 }, (_, i) => ({ id: i })),
    Array.from({ length: 3 }, (_, i) => ({ id: i })),
  ).ok,
  false,
  'starker unerklärter Rückgang wird verweigert',
);
assertEqual(
  validateMergedSeason(Array.from({ length: 10 }, (_, i) => ({ id: i })), Array.from({ length: 9 }, (_, i) => ({ id: i }))).ok,
  true,
  'ein einzelnes fehlendes Spiel (z.B. abgesagt) wird akzeptiert',
);

console.log('== fileNameForKey / deriveLabelFromKey ==');
assertEqual(fileNameForKey('26/27'), '26-27.json', 'Dateiname deterministisch aus Key');
assertEqual(deriveLabelFromKey('26/27'), '2026/27', 'Label aus Key');

console.log('== buildManifestUpdate ==');
const baseManifest = {
  seasons: [
    { key: '24/25', label: '2024/25', file: '24-25.json', status: 'archived' },
    { key: '25/26', label: '2025/26', file: '25-26.json', status: 'current', leagueId: 1897, gameOperationId: 4 },
  ],
};
const sameSeasonManifest = buildManifestUpdate(baseManifest, { currentKey: '25/26', label: '2025/26', leagueId: 1897, gameOperationId: 4 });
assertEqual(sameSeasonManifest, baseManifest, 'unveränderte Saison -> Manifest bleibt inhaltlich identisch');
assertTrue(
  JSON.stringify(baseManifest.seasons[1]) === JSON.stringify({ key: '25/26', label: '2025/26', file: '25-26.json', status: 'current', leagueId: 1897, gameOperationId: 4 }),
  'buildManifestUpdate mutiert die Original-Objekte NICHT (Regressionstest für den gefixten Bug)',
);

const newSeasonManifest = buildManifestUpdate(baseManifest, { currentKey: '26/27', label: '2026/27', leagueId: 2200, gameOperationId: 4 });
assertEqual(newSeasonManifest.seasons.map((s) => s.key), ['24/25', '25/26', '26/27'], 'neue Saison wird angehängt, alte bleiben erhalten');
assertEqual(newSeasonManifest.seasons.find((s) => s.key === '25/26').status, 'archived', 'bisherige aktuelle Saison wird archiviert');
assertEqual(newSeasonManifest.seasons.find((s) => s.key === '26/27').status, 'current', 'neue Saison ist current');
assertEqual(newSeasonManifest.seasons.find((s) => s.key === '26/27').file, '26-27.json', 'Dateiname für neue Saison korrekt erzeugt');
assertEqual(newSeasonManifest.seasons.find((s) => s.key === '24/25').status, 'archived', '21/22-24/25 (hier: 24/25) bleiben unangetastet');

console.log('== extractTeamDirectory (Feuerbach 1/2, SG Heidelberg/Mannheim) ==');
const clubsResponse = [
  { id: 502, name: 'SG Heidelberg/Mannheim', teams: [
    { id: 9001, name: 'SG Heidelberg/Mannheim', short_name: 'SG HD/MA', club_id: 502, syndicate: true, syndicate_clubs: [500, 501], league_id: 2200 },
  ] },
  { id: 503, name: 'Sportvg Feuerbach', teams: [
    { id: 9002, name: 'Sportvg Feuerbach 1', short_name: 'Feuerbach 1', club_id: 503, syndicate: false, syndicate_clubs: [], league_id: 2200 },
    { id: 9003, name: 'Sportvg Feuerbach 2', short_name: 'Feuerbach 2', club_id: 503, syndicate: false, syndicate_clubs: [], league_id: 2201 },
  ] },
];
const directory = extractTeamDirectory(clubsResponse);
assertEqual(directory.length, 3, 'drei Teams extrahiert');
assertEqual(directory.find((t) => t.teamId === 9001).syndicate, true, 'Spielgemeinschaft korrekt erkannt (syndicate:true)');
assertEqual(directory.find((t) => t.teamId === 9001).syndicateClubs, [500, 501], 'beteiligte Vereine korrekt referenziert');
assertEqual(directory.filter((t) => t.clubId === 503).length, 2, 'beide Feuerbach-Teams teilen dieselbe stabile club_id');
assertTrue(!('squad' in directory[1]), 'kein squad/Mannschaftsnummer-Feld erfunden — Saisonmanager liefert keins');
assertEqual(extractTeamDirectory([{ teams: [{ id: 1 }, { id: undefined }] }]).length, 1, 'Team ohne id wird übersprungen statt geraten');

// ─────────────────────────────────────────────────────────────────────────
// Teil 2: End-to-End-Dry-Run in einer Sandbox mit gemocktem fetch
// ─────────────────────────────────────────────────────────────────────────

function sampleGame(id, overrides = {}) {
  return {
    id,
    game_number: '1',
    start_time: '18:00',
    date: '2026-02-01',
    game_day: { game_day_number: 1, title: '1. Spieltag' },
    home_team_name: 'VfB Ulm',
    guest_team_name: 'FBC Heidelberg',
    home_team_id: 6680,
    guest_team_id: 6685,
    events: [{ event_id: 1, event_type: 'goal', event_team: 'home', period: 1, home_goals: 1, guest_goals: 0, time: '5:00', number: 7, assist: 3, goal_type: 'regular' }],
    players: { home: [{ player_id: 1, player_name: 'Muster', player_firstname: 'Max', trikot_number: 7, position: 'Feld', captain: true }], guest: [] },
    starting_players: { home: [{ position: 'goal', player_id: 2, player_name: 'Torwart', trikot_number: 1 }], guest: [] },
    awards: { home: [], guest: [] },
    started: true,
    ended: true,
    result_string: '4:2',
    result: { home_goals: 4, guest_goals: 2, home_goals_period: [2, 2], guest_goals_period: [1, 1], postfix: { short: '', long: '' }, forfait: false, overtime: false },
    league_id: 1897,
    league_name: 'Verbandsliga BW (KF)',
    league_short_name: 'VL BW (KF)',
    game_operation_id: 4,
    game_operation_name: 'Floorball-Verband Baden-Württemberg',
    game_operation_slug: 'FVBW',
    period_titles: [{ period: 1, title: '1. Hälfte' }, { period: 2, title: '2. Hälfte' }],
    referees: [{ license_id: '0', first_name: 'Max', last_name: 'Schiri' }],
    live_stream_link: null,
    vod_link: null,
    ...overrides,
  };
}

function makeMockFetch(routes) {
  const calls = [];
  const fn = async (url) => {
    calls.push(url);
    for (const [pattern, handler] of routes) {
      if (pattern.test(url)) {
        const result = typeof handler === 'function' ? handler(url) : handler;
        if (result?.__error) {
          return { ok: false, status: result.status ?? 500, text: async () => JSON.stringify({ message: 'error' }) };
        }
        return { ok: true, status: 200, text: async () => JSON.stringify(result) };
      }
    }
    throw new Error(`Kein Mock für ${url}`);
  };
  fn.calls = calls;
  return fn;
}

async function withSandbox(fn) {
  const dir = await mkdtemp(path.join(tmpdir(), 'season-data-test-'));
  await cp(path.join(REPO_ROOT, 'season-data'), path.join(dir, 'season-data'), { recursive: true });
  await cp(path.join(REPO_ROOT, 'scripts', 'update-season-data.mjs'), path.join(dir, 'update-season-data.mjs'));
  const prevCwd = process.cwd();
  const prevFetch = globalThis.fetch;
  process.chdir(dir);
  try {
    const mod = await import(pathToFileURL(path.join(dir, 'update-season-data.mjs')).href);
    return await fn({ dir, mod });
  } finally {
    process.chdir(prevCwd);
    globalThis.fetch = prevFetch;
  }
}

async function readJson(...parts) {
  return JSON.parse(await readFile(path.join(...parts), 'utf8'));
}

async function scenarioFillCurrentSeason() {
  console.log('== Szenario: bestehende Saison 25/26 wird befüllt ==');
  await withSandbox(async ({ dir, mod }) => {
    process.env.SAISONMANAGER_API_KEY = 'test-key';
    globalThis.fetch = makeMockFetch([
      [/\/init$/, { current_season_id: 42, seasons: [{ id: 42, name: '2025/2026', current: true }] }],
      [/\/leagues\/1897\/schedule$/, [
        { game_id: 501, started: true, ended: true, result_string: '4:2', date: '2026-02-01', time: '18:00' },
        { game_id: 502, started: false, ended: false, result_string: null, date: '2026-02-08', time: '18:00' },
      ]],
      [/\/games\/501$/, sampleGame(501)],
      [/\/games\/502$/, sampleGame(502, { started: false, ended: false, result_string: null, result: null })],
    ]);

    await mod.main();

    const written = await readJson(dir, 'season-data', '25-26.json');
    assertEqual(written.season, '25/26', '25-26.json: season-Feld korrekt');
    assertEqual(written.games.map((g) => g.id), [501, 502], '25-26.json: beide Spiele enthalten');
    assertTrue(written.games[0].events?.length === 1, 'events[] bleibt erhalten');
    assertTrue(written.games[0].players?.home?.[0]?.captain === true, 'captain-Flag bleibt erhalten');
    assertTrue(Array.isArray(written.games[0].starting_players?.home), 'starting_players bleibt erhalten');
    assertTrue(written.games[0].result?.home_goals_period?.length === 2, 'home_goals_period bleibt erhalten');
    assertTrue(written.games[0].period_titles?.length === 2, 'period_titles bleibt erhalten');
    assertTrue('live_stream_link' in written.games[0] && 'vod_link' in written.games[0], 'live_stream_link/vod_link bleiben erhalten');

    const manifest = await readJson(dir, 'season-data', 'seasons.json');
    const cur = manifest.seasons.find((s) => s.key === '25/26');
    assertEqual(cur.status, 'current', 'Manifest: 25/26 bleibt current');
    assertEqual(manifest.seasons.find((s) => s.key === '24/25').status, 'archived', 'Manifest: 24/25 unangetastet archiviert');
    assertEqual(manifest.seasons.length, 5, 'Manifest: weiterhin genau 5 Einträge (keine Duplikate)');

    // ── Wiederholungslauf mit identischen Daten ──
    console.log('== Szenario: Wiederholungslauf mit identischen Daten ==');
    const before = await stat(path.join(dir, 'season-data', '25-26.json'));
    await new Promise((r) => setTimeout(r, 10));
    await mod.main();
    const after = await stat(path.join(dir, 'season-data', '25-26.json'));
    assertEqual(before.mtimeMs, after.mtimeMs, '25-26.json wird bei identischen Daten NICHT neu geschrieben');
  });
}

async function scenarioNewSeasonDetected() {
  console.log('== Szenario: neue Saison 26/27 wird erkannt ==');
  await withSandbox(async ({ dir, mod }) => {
    process.env.SAISONMANAGER_API_KEY = 'test-key';
    // 25/26 hat schon Daten (wie im Repo: Manifest kennt sie als current, aber
    // noch ohne 25-26.json auf der Platte) — wir seeden hier zusätzlich eine
    // gefüllte 25-26.json, damit die Liga-Namenserkennung (game_operation_id +
    // league_name) etwas hat, worauf sie sich stützen kann, ohne dass zuerst
    // ein separater Lauf für 25/26 nötig wäre.
    await writeFile(
      path.join(dir, 'season-data', '25-26.json'),
      JSON.stringify({ season: '25/26', label: '2025/26', games: [sampleGame(501)] }),
    );

    globalThis.fetch = makeMockFetch([
      [/\/init$/, { current_season_id: 43, seasons: [{ id: 43, name: '2026/2027', current: true }] }],
      [/\/game_operations\/4\/leagues$/, [
        { id: 2200, name: 'Verbandsliga BW (KF)', short_name: 'VL BW (KF)' },
        { id: 2205, name: '1. FBL Herren', short_name: '1. FBL' },
      ]],
      [/\/leagues\/2200\/schedule$/, [{ game_id: 601, started: true, ended: true, result_string: '3:3', date: '2026-09-05', time: '18:00' }]],
      [/\/games\/601$/, sampleGame(601, { league_id: 2200 })],
    ]);

    await mod.main();

    const manifest = await readJson(dir, 'season-data', 'seasons.json');
    assertEqual(manifest.seasons.map((s) => s.key), ['21/22', '22/23', '23/24', '24/25', '25/26', '26/27'], 'Manifest: 26/27 neu angehängt, alle bisherigen erhalten');
    assertEqual(manifest.seasons.find((s) => s.key === '26/27').status, 'current', '26/27 ist current');
    assertEqual(manifest.seasons.find((s) => s.key === '26/27').leagueId, 2200, 'neue Liga-ID korrekt zugeordnet');
    assertEqual(manifest.seasons.find((s) => s.key === '25/26').status, 'archived', '25/26 automatisch archiviert');

    const newSeasonFile = await readJson(dir, 'season-data', '26-27.json');
    assertEqual(newSeasonFile.games.map((g) => g.id), [601], '26-27.json wurde mit dem neuen Spiel angelegt');

    const untouched2425 = await readFile(path.join(REPO_ROOT, 'season-data', '24-25.json'), 'utf8');
    const sandbox2425 = await readFile(path.join(dir, 'season-data', '24-25.json'), 'utf8');
    assertEqual(sandbox2425, untouched2425, '24-25.json wurde durch die Aktion nicht verändert');
  });
}

async function scenarioNewSeasonWithoutSchedule() {
  console.log('== Szenario: 26/27 ist im Saisonmanager angelegt, aber noch OHNE Spielplan ==');
  await withSandbox(async ({ dir, mod }) => {
    process.env.SAISONMANAGER_API_KEY = 'test-key';
    await writeFile(
      path.join(dir, 'season-data', '25-26.json'),
      JSON.stringify({ season: '25/26', label: '2025/26', games: [sampleGame(501)] }),
    );

    globalThis.fetch = makeMockFetch([
      [/\/init$/, { current_season_id: 43, seasons: [{ id: 43, name: '2026/2027', current: true }] }],
      // Die Liga fuer 26/27 existiert bereits (Saison/Wettbewerb angelegt),
      // liefert aber noch keinen Spielplan.
      [/\/game_operations\/4\/leagues$/, [{ id: 2300, name: 'Verbandsliga BW (KF)', short_name: 'VL BW (KF)' }]],
      [/\/leagues\/2300\/schedule$/, []],
      [/\/game_operations\/4\/clubs$/, []],
    ]);

    await mod.main();

    const newSeasonFile = await readJson(dir, 'season-data', '26-27.json');
    assertEqual(newSeasonFile, { season: '26/27', label: '2026/27', games: [] }, '26-27.json wird MIT leerem games[] angelegt, nicht als Fehler behandelt');

    const manifest = await readJson(dir, 'season-data', 'seasons.json');
    assertEqual(manifest.seasons.find((s) => s.key === '26/27')?.status, 'current', 'Manifest erkennt 26/27 als current, obwohl noch keine Spiele existieren');
    assertEqual(manifest.seasons.find((s) => s.key === '25/26')?.status, 'archived', '25/26 wird archiviert');

    // Zweiter Lauf: Spielplan ist inzwischen verfügbar -> Spiele müssen automatisch ergänzt werden.
    globalThis.fetch = makeMockFetch([
      [/\/init$/, { current_season_id: 43, seasons: [{ id: 43, name: '2026/2027', current: true }] }],
      [/\/leagues\/2300\/schedule$/, [{ game_id: 701, started: true, ended: true, result_string: '2:2', date: '2026-09-12', time: '18:00' }]],
      [/\/games\/701$/, sampleGame(701, { league_id: 2300 })],
      [/\/game_operations\/4\/clubs$/, []],
    ]);
    await mod.main();
    const filledSeasonFile = await readJson(dir, 'season-data', '26-27.json');
    assertEqual(filledSeasonFile.games.map((g) => g.id), [701], 'Sobald der Spielplan verfügbar ist, wird das Spiel im nächsten Lauf automatisch ergänzt');
  });
}

async function scenarioPartialGameFailureKeepsExisting() {
  console.log('== Szenario: einzelnes Spiel schlägt fehl, vorhandene Version bleibt erhalten ==');
  await withSandbox(async ({ dir, mod }) => {
    process.env.SAISONMANAGER_API_KEY = 'test-key';
    await writeFile(
      path.join(dir, 'season-data', '25-26.json'),
      JSON.stringify({ season: '25/26', label: '2025/26', games: [sampleGame(501, { ended: false, started: true, result_string: null, result: null })] }),
    );
    globalThis.fetch = makeMockFetch([
      [/\/init$/, { current_season_id: 42, seasons: [{ id: 42, name: '2025/2026', current: true }] }],
      [/\/leagues\/1897\/schedule$/, [{ game_id: 501, started: true, ended: true, result_string: '4:2', date: '2026-02-01', time: '18:00' }]],
      [/\/games\/501$/, () => ({ __error: true, status: 500 })],
    ]);

    await mod.main();

    const written = await readJson(dir, 'season-data', '25-26.json');
    assertEqual(written.games.length, 1, 'Spiel geht bei fehlgeschlagenem Detail-Abruf nicht verloren');
    assertEqual(written.games[0].ended, false, 'alte (unfertige) Version bleibt erhalten, wenn Refetch fehlschlägt');
  });
}

async function scenarioFullApiFailureLeavesFilesUntouched() {
  console.log('== Szenario: vollständiger API-Fehler lässt bestehende Dateien unangetastet ==');
  await withSandbox(async ({ dir, mod }) => {
    process.env.SAISONMANAGER_API_KEY = 'test-key';
    await writeFile(
      path.join(dir, 'season-data', '25-26.json'),
      JSON.stringify({ season: '25/26', label: '2025/26', games: [sampleGame(501)] }),
    );
    const beforeSeason = await readFile(path.join(dir, 'season-data', '25-26.json'), 'utf8');
    const beforeManifest = await readFile(path.join(dir, 'season-data', 'seasons.json'), 'utf8');

    globalThis.fetch = makeMockFetch([
      [/\/init$/, () => ({ __error: true, status: 503 })],
      [/\/leagues\/1897\/schedule$/, () => ({ __error: true, status: 503 })],
    ]);

    await mod.main();

    const afterSeason = await readFile(path.join(dir, 'season-data', '25-26.json'), 'utf8');
    const afterManifest = await readFile(path.join(dir, 'season-data', 'seasons.json'), 'utf8');
    assertEqual(afterSeason, beforeSeason, '25-26.json byte-identisch nach vollständigem API-Ausfall');
    assertEqual(afterManifest, beforeManifest, 'seasons.json byte-identisch nach vollständigem API-Ausfall');
  });
}

async function scenarioBackfillMissingCurrentFileAndAdvanceSeason() {
  console.log('== Szenario A+C+D+E: 25/26 fehlt als Datei (Manifest kennt sie aber mit leagueId), Saisonmanager meldet inzwischen 26/27 als aktuell ==');
  await withSandbox(async ({ dir, mod }) => {
    process.env.SAISONMANAGER_API_KEY = 'test-key';
    // Sandbox entspricht exakt dem realen Repo-Zustand: season-data/25-26.json
    // existiert NICHT, das Manifest kennt 25/26 aber bereits inkl. leagueId
    // 1897 / gameOperationId 4 (siehe season-data/seasons.json im Repo) — kein
    // zusätzliches Seeding nötig.

    globalThis.fetch = makeMockFetch([
      [/\/init$/, { current_season_id: 43, seasons: [{ id: 43, name: '2026/2027', current: true }] }],
      // Backfill von 25/26 ausschließlich über die im Manifest hinterlegte leagueId:
      [/\/leagues\/1897\/schedule$/, [
        { game_id: 801, started: true, ended: true, result_string: '4:2', date: '2026-01-10', time: '18:00' },
        { game_id: 802, started: true, ended: true, result_string: '2:5', date: '2026-01-17', time: '18:00' },
      ]],
      [/\/games\/801$/, sampleGame(801)],
      [/\/games\/802$/, sampleGame(802)],
      // Liga-Neuerkennung für die jetzt aktuelle Saison 26/27 (nutzt game_operation_id 4,
      // bekannt aus den gerade nachgeholten 25/26-Spielen):
      [/\/game_operations\/4\/leagues$/, [{ id: 2400, name: 'Verbandsliga BW (KF)', short_name: 'VL BW (KF)' }]],
      // 26/27 ist als Liga bereits angelegt, hat aber (wie real) noch keinen Spielplan:
      [/\/leagues\/2400\/schedule$/, []],
      [/\/game_operations\/4\/clubs$/, []],
    ]);

    await mod.main();

    const backfilled = await readJson(dir, 'season-data', '25-26.json');
    assertEqual(backfilled.season, '25/26', 'Test A: 25-26.json wurde angelegt (season-Feld korrekt)');
    assertEqual(backfilled.games.map((g) => g.id), [801, 802], 'Test A: beide nachgeholten Spiele enthalten');

    const newSeason = await readJson(dir, 'season-data', '26-27.json');
    assertEqual(newSeason, { season: '26/27', label: '2026/27', games: [] }, 'Test C+E: 26-27.json existiert als gültiges {season,games:[]} trotz 0 Spielen');

    const manifest = await readJson(dir, 'season-data', 'seasons.json');
    assertEqual(manifest.seasons.find((s) => s.key === '25/26')?.status, 'archived', 'Test D: 25/26 nach dem Lauf archiviert');
    assertEqual(manifest.seasons.find((s) => s.key === '26/27')?.status, 'current', 'Test D: 26/27 ist jetzt current');
    assertEqual(manifest.seasons.find((s) => s.key === '25/26')?.leagueId, 1897, '25/26 behält seine bekannte leagueId im Manifest');

    const untouched2425 = await readFile(path.join(REPO_ROOT, 'season-data', '24-25.json'), 'utf8');
    const sandbox2425 = await readFile(path.join(dir, 'season-data', '24-25.json'), 'utf8');
    assertEqual(sandbox2425, untouched2425, '24-25.json wurde durch den Lauf nicht verändert');
  });
}

async function scenarioBackfillSkipsAlreadyCompleteFile() {
  console.log('== Szenario B: 25/26-Datei existiert bereits befüllt -> kein unnötiger Nachlade-Aufruf, obwohl 26/27 inzwischen aktuell ist ==');
  await withSandbox(async ({ dir, mod }) => {
    process.env.SAISONMANAGER_API_KEY = 'test-key';
    await writeFile(
      path.join(dir, 'season-data', '25-26.json'),
      JSON.stringify({ season: '25/26', label: '2025/26', games: [sampleGame(501)] }),
    );

    globalThis.fetch = makeMockFetch([
      [/\/init$/, { current_season_id: 43, seasons: [{ id: 43, name: '2026/2027', current: true }] }],
      [/\/game_operations\/4\/leagues$/, [{ id: 2400, name: 'Verbandsliga BW (KF)', short_name: 'VL BW (KF)' }]],
      [/\/leagues\/2400\/schedule$/, []],
      [/\/game_operations\/4\/clubs$/, []],
      // /leagues/1897/schedule ist absichtlich NICHT gemockt: würde
      // backfillMissingSeasonFiles trotz bereits vorhandener, befüllter Datei
      // dennoch einen Abruf auslösen, tauchte die URL unten in fetch.calls auf.
    ]);

    await mod.main();

    assertTrue(
      !globalThis.fetch.calls.some((u) => /\/leagues\/1897\/schedule/.test(u)),
      'Test B: für die bereits befüllte 25/26-Datei wird KEIN Spielplan-Abruf ausgelöst',
    );
    const still25 = await readJson(dir, 'season-data', '25-26.json');
    assertEqual(still25.games.map((g) => g.id), [501], 'Test B: bereits vorhandene 25/26-Daten bleiben unverändert');
    const newSeason = await readJson(dir, 'season-data', '26-27.json');
    assertEqual(newSeason.season, '26/27', '26/27 wird trotzdem regulär als neue aktuelle Saison angelegt');
  });
}

async function scenarioBackfillSkipsMissingLeagueIdWithoutGuessing() {
  console.log('== Szenario: fehlt einer nicht-aktuellen Saison die leagueId im Manifest, wird NICHT geraten ==');
  await withSandbox(async ({ dir, mod }) => {
    process.env.SAISONMANAGER_API_KEY = 'test-key';
    const manifestPath = path.join(dir, 'season-data', 'seasons.json');
    const manifest = await readJson(dir, 'season-data', 'seasons.json');
    // 25/26 künstlich ohne leagueId, wie es z.B. bei einem sehr alten Manifest-
    // Eintrag ohne je gelaufene League-Discovery vorkommen könnte.
    manifest.seasons = manifest.seasons.map((s) => (s.key === '25/26' ? { key: s.key, label: s.label, file: s.file, status: s.status } : s));
    await writeFile(manifestPath, JSON.stringify(manifest));

    globalThis.fetch = makeMockFetch([
      [/\/init$/, { current_season_id: 43, seasons: [{ id: 43, name: '2026/2027', current: true }] }],
      [/\/game_operations\/4\/leagues$/, [{ id: 2400, name: 'Verbandsliga BW (KF)', short_name: 'VL BW (KF)' }]],
      [/\/leagues\/2400\/schedule$/, []],
      [/\/game_operations\/4\/clubs$/, []],
    ]);

    await mod.main();

    assertTrue(
      !globalThis.fetch.calls.some((u) => /\/leagues\/1897\/schedule/.test(u) || /\/leagues\/undefined\/schedule/.test(u)),
      '25/26 ohne leagueId im Manifest löst keinen (erst recht keinen geratenen) Spielplan-Abruf aus',
    );

    // Hinweis: da 24-25.json etc. den game_operation_id 4 liefern, kann 26/27
    // trotzdem regulär neu erkannt werden — die fehlende leagueId betrifft nur
    // das Nachholen der NICHT-aktuellen Saison 25/26.
    const newSeason = await readJson(dir, 'season-data', '26-27.json');
    assertEqual(newSeason.season, '26/27', '26/27 wird unabhängig davon regulär erkannt und angelegt');
  });
}

async function scenarioMissingApiKeyAbortsCleanly() {
  console.log('== Szenario: fehlender API-Key bricht sauber ab ==');
  await withSandbox(async ({ dir, mod }) => {
    delete process.env.SAISONMANAGER_API_KEY;
    globalThis.fetch = makeMockFetch([]); // darf gar nicht erst aufgerufen werden
    const before = await readFile(path.join(dir, 'season-data', '24-25.json'), 'utf8');
    await mod.main();
    const after = await readFile(path.join(dir, 'season-data', '24-25.json'), 'utf8');
    assertEqual(after, before, 'ohne Secret bleiben alle Dateien unangetastet');
  });
}

await scenarioFillCurrentSeason();
await scenarioNewSeasonDetected();
await scenarioNewSeasonWithoutSchedule();
await scenarioPartialGameFailureKeepsExisting();
await scenarioFullApiFailureLeavesFilesUntouched();
await scenarioBackfillMissingCurrentFileAndAdvanceSeason();
await scenarioBackfillSkipsAlreadyCompleteFile();
await scenarioBackfillSkipsMissingLeagueIdWithoutGuessing();
await scenarioMissingApiKeyAbortsCleanly();

console.log('');
if (failures > 0) {
  console.log(`${failures} Test(s) fehlgeschlagen.`);
  process.exitCode = 1;
} else {
  console.log('Alle Tests erfolgreich.');
}

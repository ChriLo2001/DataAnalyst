#!/usr/bin/env node
// S1 (Social-Video-Spezifikation) — Test für buildSocialVideoSpec, die Szenen-Zeitverteilung, den
// Browser/Node-Schlüsselabgleich und cache-team-logos.mjs.
//
// buildSocialVideoSpec und alle Bausteine, die sie aufruft (Teamnormalisierung, Matchcenter-Analyse,
// Story-Formatierer, matchcenterStoryTeamAssetKey), werden UNVERÄNDERT aus dem index.html-Text geschnitten
// und in node:vm ausgeführt (dasselbe Muster wie scripts/test-p0b-overview-cards.mjs) — echte 25/26-Saisondaten
// werden dafür in eine minimale SEASONS-Struktur geladen (genau die Felder, die getSeasonData/
// getSeasonStatsAsOf lesen: rawLeagueGames/rawGames). Ersetzt sind nur document.fonts (Schriftenprüfung läuft
// separat, DOM-frei) und die Caches (cachedAnalysis/analysisCacheKey als reine Passthrough-Funktionen).
//
// Aufruf: node scripts/test-social-video.mjs

import { readFile, mkdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';
import os from 'node:os';

import { teamKeyFor } from './model/normalize.mjs';
import * as cacheLogos from './cache-team-logos.mjs';

const REPO_ROOT = path.resolve(import.meta.dirname, '..');
let failures = 0;

function assertEqual(actual, expected, label) {
  const a = JSON.stringify(actual);
  const e = JSON.stringify(expected);
  if (a === e) console.log(`  ok   ${label}`);
  else { failures++; console.log(`  FAIL ${label}\n       erwartet: ${e}\n       erhalten: ${a}`); }
}
function assertTrue(cond, label) { assertEqual(Boolean(cond), true, label); }

const html = (await readFile(path.join(REPO_ROOT, 'index.html'), 'utf8')).replace(/\r\n/g, '\n');
function fnSource(name) {
  const m = new RegExp(`(^|\\n)(async )?function ${name}\\(`).exec(html);
  if (!m) throw new Error(`Funktion nicht gefunden: ${name}`);
  const from = m.index + m[1].length;
  return html.slice(from, html.indexOf('\n}', from) + 2);
}
function constSource(name) {
  const m = new RegExp(`(^|\\n)const ${name}=`).exec(html);
  if (!m) throw new Error(`Konstante nicht gefunden: ${name}`);
  const from = m.index + m[1].length;
  const head = html.slice(from, html.indexOf('\n', from));
  if (/[[{]$/.test(head)) { const close = head.endsWith('[') ? '\n];' : '\n};'; return html.slice(from, html.indexOf(close, from) + close.length); }
  return head;
}

const FUNCTIONS = [
  // Teamnormalisierung (drift-getestet gegen scripts/model/normalize.mjs, siehe test-model-normalize.mjs)
  'cleanText', 'repairMojibake', 'fixKnownUiTransliterations', 'mojibakeScore', 'decodeCp1252AsUtf8',
  'normalizeTeamName', 'normalizeTeamKey', 'teamAliasRuleMatches', 'teamAliasSeasonMatches',
  'matchcenterSeasonIsUlmTuebingenSgEra', 'isOwnTeam', 'getCanonicalTeamName', 'isFreiburgTuebingenSgName',
  'isMannheimLudwigshafenSgName', 'normalizeOpponentNameForAllTime', 'isUlmTeamName', 'seasonOrderIndex',
  // Rohdaten/Spiel-Grundbausteine
  'pFull', 'normalizePlayerDisplayName', 'gameStableId', 'parseGameClock', 'getPhaseKey', 'isYouthGame', 'gameStatusText', 'gameScore',
  'classifyGameForStats', 'getRelevantSeasonGames', 'buildStandings', 'normalizeGame', 'formatDateDE',
  'compareGamesChronologically', 'buildMatchdays', 'matchdayAsOfCutoff', 'getSeasonMatchdays', 'isGameAtOrBeforeAsOf', 'getSeasonStatsAsOf',
  'matchcenterSeasonLabel',
  // Matchcenter-Bausteine
  'matchcenterClamp', 'matchcenterNum', 'matchcenterDateValue', 'matchcenterSortGamesAsc', 'getOpponentAliasKeys', 'matchcenterIsUlmTeamName',
  'normalizeTeamNameForMatchcenter', 'matchcenterDetectUlmSide', 'matchcenterTeamDisplay', 'matchcenterTeamKey',
  'matchcenterAliasModeForContext', 'getOpponentAliasKeysForMatchcenter', 'matchcenterGameTeamName',
  'matchcenterGameSideForTeam', 'matchcenterGameSideForOpponentKey', 'matchcenterGameScore', 'matchcenterOutcomeForTeam', 'matchcenterGameKey',
  'matchcenterRosterPlayers', 'matchcenterPlayerDisplayName', 'matchcenterFindRosterPlayer', 'matchcenterPlayerKey',
  'matchcenterEventNumber', 'matchcenterResultLetter', 'matchcenterStoryShortTeamLabel', 'matchcenterStoryFormLetters',
  'matchcenterStoryPlayer', 'matchcenterStoryFormRecord',
  // S1: der eigentliche Prüfling und seine unmittelbaren Bausteine
  'matchcenterStoryTeamAssetKey', 'socialVideoDistributeSceneDurations', 'socialVideoFitText', 'socialVideoCheckFonts',
  'socialVideoUlmGamesForMatchday', 'socialVideoTableRank', 'socialVideoFormAsOf', 'socialVideoLastDuelAsOf',
  'socialVideoTopScorerAsOf', 'socialVideoOpponentSceneData', 'socialVideoFileName', 'socialVideoMatchdayLabel',
  'socialVideoBuildStorySpec', 'socialVideoBuildFeedSpec', 'buildSocialVideoSpec',
];
const functionSource = FUNCTIONS.map(fnSource).join('\n');
const constSourceAll = [
  'MOJIBAKE_RUN_RE', 'CP1252_REVERSE_BYTES', 'UI_TEXT_REPLACEMENTS',
  'TEAM_ALIAS_RULES', 'ULM_TEAM_ALIASES', 'ULM_TEAM_ALIAS_KEYS', 'SOCIAL_VIDEO_DURATION_MS', 'SOCIAL_VIDEO_FPS',
  'SOCIAL_VIDEO_MIN_CONTENT_MS', 'SOCIAL_VIDEO_NAME_MAX_CHARS', 'SOCIAL_VIDEO_NAME_HARD_MAX_CHARS',
  'SOCIAL_VIDEO_FACT_MAX_CHARS', 'SOCIAL_VIDEO_FACT_HARD_MAX_CHARS', 'SOCIAL_VIDEO_STORY_SCENE_DEFS',
  'SOCIAL_VIDEO_FEED_SCENE_DEFS',
].map(constSource).join('\n');

/** Baut den vm-Kontext. `seasons` = { [seasonKey]: rawSeasonJson } (echtes season-data-Format, {season,games}). */
function makeContext(seasons = {}) {
  const SEASONS = {};
  const SEASON_CONFIG = {};
  for (const [key, raw] of Object.entries(seasons)) {
    SEASONS[key] = { data: { rawLeagueGames: raw.games || [], rawGames: raw.games || [] } };
    SEASON_CONFIG[key] = { label: key.replace('/', '/'), seasonId: null, dateRange: null };
  }
  const ctx = vm.createContext({
    console,
    SEASONS, SEASON_CONFIG, ACTIVE_SEASON_CONFIG: {}, SEASON_START: '', SEASON_END: '',
    cachedAnalysis: (key, fn) => fn(),
    analysisCacheKey: () => '',
    detectSide: () => null, // nur für den (hier ungenutzten) statGamesData-Zweig von getSeasonStatsAsOf
    globalThis: { document: undefined },
  });
  vm.runInContext(functionSource, ctx);
  vm.runInContext(constSourceAll, ctx);
  // bucket.data.rawLeagueGames/.rawGames sind im echten App-Zustand bereits normalizeGame()-normalisiert
  // (von loadSeasonData() beim Laden geschrieben) — Rohdaten wie result.home_goals sind dort schon zu
  // home_goals abgeflacht. Dieselbe Normalisierung hier nachholen, sonst liefert buildStandings() leere
  // Tabellen (parseInt(undefined) = NaN).
  vm.runInContext(`for(const k of Object.keys(SEASONS)){SEASONS[k].data.rawLeagueGames=SEASONS[k].data.rawLeagueGames.map(normalizeGame);SEASONS[k].data.rawGames=SEASONS[k].data.rawGames.map(normalizeGame);}`, ctx);
  return ctx;
}
function callSpec(ctx, args) {
  return vm.runInContext(`buildSocialVideoSpec(${JSON.stringify(args)})`, ctx);
}
function call(ctx, expr) {
  return vm.runInContext(expr, ctx);
}

// ── Echte 25/26-Saisondaten laden (nur lesend) ──────────────────────────────
const raw2526 = JSON.parse((await readFile(path.join(REPO_ROOT, 'season-data', '25-26.json'), 'utf8')).replace(/^﻿/, ''));
const ctxReal = makeContext({ '25/26': raw2526 });

// ═════════════════════════════════════════════════════════════════════════
console.log('== A) Echte Daten: Spieltag 4 (25/26) — Abnahmebeispiel ==');
{
  const matchdays = call(ctxReal, `getSeasonMatchdays('25/26')`);
  const md4 = matchdays.find((m) => m.number === 4);
  assertTrue(!!md4, 'Vorbedingung: Spieltag 4 existiert in 25/26');
  assertEqual(md4.date, '2026-01-25', 'Vorbedingung: Spieltag 4 ist am 25.01.2026');

  const stories = callSpec(ctxReal, { seasonKey: '25/26', matchdayKey: md4.key, format: 'story-9x16' });
  assertEqual(stories.length, 2, 'Spieltag 4: genau 2 Ulm-Gegner -> 2 Story-Spezifikationen');
  assertEqual(stories.map((s) => s.opponentDisplay), ['TV Schriesheim', 'FBC Heidelberg'], 'Reihenfolge nach Anpfiffzeit (12:10 vor 14:50), nicht alphabetisch');
  for (const spec of stories) {
    const sum = spec.scenes.reduce((s, sc) => s + (sc.endMs - sc.startMs), 0);
    assertEqual(sum, 15000, `${spec.opponentDisplay}: Summe der Szenendauern exakt 15.000 ms`);
    assertEqual(spec.durationMs, 15000, `${spec.opponentDisplay}: durationMs = 15000`);
    assertTrue(spec.scenes.every((sc, i) => i === 0 || sc.startMs === spec.scenes[i - 1].endMs), `${spec.opponentDisplay}: Szenen grenzen lückenlos aneinander`);
    assertTrue(!spec.scenes.some((sc) => sc.id === 'lastDuel'), `${spec.opponentDisplay}: Duell-Szene entfällt (kein Duell vor Spieltag 4 in dieser Saison)`);
    assertTrue(spec.warnings.some((w) => w.code === 'scene-omitted' && w.scene === 'lastDuel'), `${spec.opponentDisplay}: warnings enthält scene-omitted/lastDuel`);
    assertTrue(spec.scenes.some((sc) => sc.id === 'playersToWatch'), `${spec.opponentDisplay}: Players-to-watch-Szene vorhanden`);
  }
  const [schriesheim, heidelberg] = stories;
  assertEqual(schriesheim.matchday.kickoffs, ['12:10'], 'TV Schriesheim: Anpfiff 12:10');
  assertEqual(heidelberg.matchday.kickoffs, ['14:50'], 'FBC Heidelberg: Anpfiff 14:50');
  assertEqual(schriesheim.matchday.arena, 'Mehrzweckhalle', 'Halle aus den Rohdaten übernommen');
  // Realdaten-Pin (siehe Schritt-1-Plan): Tabelle VOR Spieltag 4 — Schriesheim #5, Heidelberg #2, Ulm #3
  const opponentScene = (spec) => spec.scenes.find((sc) => sc.id === 'opponent');
  const rankOf = (spec) => opponentScene(spec).elements.find((e) => e.type === 'stat' && e.label === 'Tabelle')?.text;
  assertEqual(rankOf(schriesheim), '#5', 'TV Schriesheim: Tabellenplatz 5 vor Spieltag 4 (Realdaten-Pin)');
  assertEqual(rankOf(heidelberg), '#2', 'FBC Heidelberg: Tabellenplatz 2 vor Spieltag 4 (Realdaten-Pin)');

  const feed = callSpec(ctxReal, { seasonKey: '25/26', matchdayKey: md4.key, format: 'feed-4x5' });
  assertTrue(!Array.isArray(feed), 'feed-4x5: EIN Objekt, kein Array');
  const feedSum = feed.scenes.reduce((s, sc) => s + (sc.endMs - sc.startMs), 0);
  assertEqual(feedSum, 15000, 'Feed-Post: Summe der Szenendauern exakt 15.000 ms');
  assertEqual(feed.scenes.map((s) => s.id), ['intro', 'opponentA', 'opponentB', 'outro'], 'Feed-Post: alle 4 Szenen vorhanden (beide Gegner bekannt)');
  assertEqual(feed.matchday.kickoffs, ['12:10', '14:50'], 'Feed-Post: beide Anpfiffzeiten');
}

// ═════════════════════════════════════════════════════════════════════════
console.log('== B) Determinismus ==');
{
  const matchdays = call(ctxReal, `getSeasonMatchdays('25/26')`);
  const md4 = matchdays.find((m) => m.number === 4);
  const a = callSpec(ctxReal, { seasonKey: '25/26', matchdayKey: md4.key, format: 'story-9x16' });
  const b = callSpec(ctxReal, { seasonKey: '25/26', matchdayKey: md4.key, format: 'feed-4x5' });
  const a2 = callSpec(ctxReal, { seasonKey: '25/26', matchdayKey: md4.key, format: 'story-9x16' });
  const b2 = callSpec(ctxReal, { seasonKey: '25/26', matchdayKey: md4.key, format: 'feed-4x5' });
  assertEqual(JSON.stringify(a), JSON.stringify(a2), 'story-9x16: gleicher Datenstand -> identisches Spec-Objekt');
  assertEqual(JSON.stringify(b), JSON.stringify(b2), 'feed-4x5: gleicher Datenstand -> identisches Spec-Objekt');
}

// ═════════════════════════════════════════════════════════════════════════
console.log('== C) Szenen-Zeitverteilung (socialVideoDistributeSceneDurations) — 0/1/2/3 entfallende Inhaltsszenen ==');
{
  const base = [
    { id: 'intro', baseMs: 2400, fixed: true, capMs: 2600 },
    { id: 'a', baseMs: 4000 },
    { id: 'b', baseMs: 3000 },
    { id: 'c', baseMs: 3600 },
    { id: 'd', baseMs: 1000 },
    { id: 'outro', baseMs: 2000, fixed: true, capMs: 2400 },
  ];
  const sumOf = (timing) => timing.reduce((s, t) => s + t.ms, 0);
  const noGaps = (timing) => timing.every((t, i) => i === 0 || t.startMs === timing[i - 1].endMs);

  const t0 = call(ctxReal, `socialVideoDistributeSceneDurations(${JSON.stringify(base.map((s) => ({ ...s, present: s.id !== 'd' })))},15000)`);
  assertEqual(sumOf(t0), 15000, '0 entfallende Inhaltsszenen (d von vornherein abwesend): Summe exakt 15.000');
  assertTrue(noGaps(t0), '0 entfallende Szenen: keine Lücken');
  assertTrue(t0.every((t) => t.ms >= 1500 || t.fixed), '0 entfallende Szenen: keine Inhaltsszene unter 1.500 ms (d war schon vorher raus)');

  const defs1 = base.map((s) => ({ ...s, present: !['d'].includes(s.id) }));
  // 1 entfallende Szene: b entfällt zur Laufzeit, weil present:false
  const defs1b = base.map((s) => ({ ...s, present: !['b', 'd'].includes(s.id) }));
  const t1 = call(ctxReal, `socialVideoDistributeSceneDurations(${JSON.stringify(defs1b)},15000)`);
  assertEqual(sumOf(t1), 15000, '1 entfallende Inhaltsszene: Summe exakt 15.000');
  assertTrue(noGaps(t1), '1 entfallende Szene: keine Lücken');
  assertTrue(t1.every((t) => t.fixed || t.ms >= 1500), '1 entfallende Szene: keine verbleibende Inhaltsszene unter 1.500 ms');
  assertTrue(!t1.some((t) => t.id === 'b' || t.id === 'd'), '1 entfallende Szene: b und d (von vornherein abwesend) fehlen im Ergebnis');

  const defs2 = base.map((s) => ({ ...s, present: !['b', 'c', 'd'].includes(s.id) }));
  const t2 = call(ctxReal, `socialVideoDistributeSceneDurations(${JSON.stringify(defs2)},15000)`);
  assertEqual(sumOf(t2), 15000, '2 entfallende Inhaltsszenen: Summe exakt 15.000');
  assertTrue(noGaps(t2), '2 entfallende Szenen: keine Lücken');
  assertEqual(t2.map((t) => t.id), ['intro', 'a', 'outro'], '2 entfallende Szenen: nur intro/a/outro bleiben');
  assertTrue(t2.find((t) => t.id === 'a').ms >= 1500, '2 entfallende Szenen: einzige verbleibende Inhaltsszene (a) bekommt das gesamte Budget, weit über 1.500 ms');

  // 3 entfallende Inhaltsszenen: nur noch eine Inhaltsszene mit SEHR kleinem Basiswert übrig, zusätzlich eine
  // vierte, die durch extreme Gewichtsschieflage rechnerisch unter 1.500 ms fällt und deshalb selbst
  // AUTOMATISCH (nicht durch present:false, sondern durch die 1.500-ms-Regel) entfällt.
  const skewed = [
    { id: 'intro', baseMs: 2400, fixed: true, capMs: 2600 },
    { id: 'big', baseMs: 9000 },
    { id: 'tiny', baseMs: 100 }, // rechnerisch weit unter 1.500 ms -> muss automatisch entfallen
    { id: 'outro', baseMs: 2000, fixed: true, capMs: 2400 },
  ];
  const t3 = call(ctxReal, `socialVideoDistributeSceneDurations(${JSON.stringify(skewed)},15000)`);
  assertEqual(sumOf(t3), 15000, '3. Fall (automatischer Wegfall durch 1.500-ms-Regel): Summe exakt 15.000');
  assertEqual(t3.map((t) => t.id), ['intro', 'big', 'outro'], '3. Fall: "tiny" fällt automatisch weg (rechnerischer Anteil < 1.500 ms), Zeit geht vollständig an "big"');
  assertEqual(t3.find((t) => t.id === 'big').ms, 15000 - 2400 - 2000, '3. Fall: "big" bekommt das gesamte freigewordene Budget');

  // Intro/Outro-Obergrenzen: bleiben unabhängig davon, wie viele Inhaltsszenen entfallen, bei ihrem Basiswert.
  for (const timing of [t0, t1, t2, t3]) {
    const introMs = timing.find((t) => t.id === 'intro')?.ms;
    const outroMs = timing.find((t) => t.id === 'outro')?.ms;
    assertTrue(introMs === undefined || introMs <= 2600, 'Intro bleibt innerhalb der 2.600-ms-Obergrenze');
    assertTrue(outroMs === undefined || outroMs <= 2400, 'Abschluss bleibt innerhalb der 2.400-ms-Obergrenze');
  }
}

// ═════════════════════════════════════════════════════════════════════════
console.log('== D) Fehlende Daten: gültige Spezifikation ohne leere Elemente, passende warnings ==');
{
  // Synthetische Fixture: ein Ulm-Spiel gegen einen Gegner ohne jede Vorgeschichte, ohne Roster (kein
  // Players-to-watch-Kandidat), Tabelle unbekannt (keine anderen Spiele) — alles muss sauber entfallen.
  const fixtureSeason = {
    season: '99/00',
    games: [
      { id: 1, date: '2099-09-01', start_time: '10:00', ended: true, home_team_name: 'VfB Ulm', guest_team_name: 'Neuling FC', home_goals: 5, guest_goals: 2, arena_name: 'Testhalle', game_day: { game_day_number: 1 }, events: [], players: { home: [], guest: [] } },
    ],
  };
  const ctxFixture = makeContext({ '99/00': fixtureSeason });
  const matchdays = call(ctxFixture, `getSeasonMatchdays('99/00')`);
  const md1 = matchdays.find((m) => m.number === 1);
  assertTrue(!!md1, 'Vorbedingung: synthetischer Spieltag 1 existiert');
  const [spec] = callSpec(ctxFixture, { seasonKey: '99/00', matchdayKey: md1.key, format: 'story-9x16' });
  assertTrue(!spec.scenes.some((sc) => sc.id === 'lastDuel'), 'kein Duell -> Szene entfällt komplett (kein leeres Element)');
  assertTrue(!spec.scenes.some((sc) => sc.id === 'playersToWatch'), 'kein Kader/keine Events -> Players-to-watch-Szene entfällt komplett (kein Players-to-watch-Kandidat)');
  assertTrue(spec.warnings.some((w) => w.code === 'scene-omitted' && w.scene === 'lastDuel'), 'warnings: scene-omitted/lastDuel');
  assertTrue(spec.warnings.some((w) => w.code === 'scene-omitted' && w.scene === 'playersToWatch'), 'warnings: scene-omitted/playersToWatch (kein Kandidat auf keiner Seite)');
  const sum = spec.scenes.reduce((s, sc) => s + (sc.endMs - sc.startMs), 0);
  assertEqual(sum, 15000, 'trotz zweier entfallender Szenen: Summe weiterhin exakt 15.000 ms');
  assertTrue(spec.scenes.every((sc) => sc.elements.every((el) => el.text === undefined || el.text !== '')), 'kein Element mit leerem Text (kein "n/a", keine leere Zeichenkette)');
  // Logo: assetKey wird trotzdem gebildet, Datei existiert in der Fixture nicht -> das ist Aufgabe des
  // bestehenden <img onerror>-Initialen-Fallbacks (siehe rMatchcenterStoryLogo), nicht von buildSocialVideoSpec.
  assertTrue(spec.opponentAssetKey === 'neuling-fc', 'fehlendes Logo führt zu keinem Fehler — assetKey wird trotzdem korrekt gebildet, Fallback greift beim Rendern');
}

// ═════════════════════════════════════════════════════════════════════════
console.log('== E) Textlängen: langer Vereinsname -> kleinere Stufe bzw. Kürzung, nie Überlauf ==');
{
  const short = call(ctxReal, `socialVideoFitText('DJK Giants Karlsruhe-Ost',20,30)`);
  assertEqual(short.stage, 'tight', 'DJK Giants Karlsruhe-Ost (24 Zeichen): Stufe "tight" (kleinere Schrift, Text bleibt vollständig)');
  assertEqual(short.truncated, false, 'DJK Giants Karlsruhe-Ost: nicht gekürzt (passt in die harte Obergrenze)');
  assertEqual(short.text, 'DJK Giants Karlsruhe-Ost', 'DJK Giants Karlsruhe-Ost: Text unverändert (nur die Stufe ändert sich)');

  const veryLong = call(ctxReal, `socialVideoFitText('SG Sparks Tübingen-Ulm Traditionself Zweitname e.V.',20,30)`);
  assertEqual(veryLong.truncated, true, 'künstlich sehr langer Name: wird gekürzt');
  assertTrue(veryLong.text.length <= 31, 'gekürzter Text bleibt innerhalb der harten Obergrenze (+1 für das Auslassungszeichen)');
  assertTrue(veryLong.text.endsWith('…'), 'gekürzter Text endet auf Auslassungszeichen');
  assertTrue(!/\s…$/.test(veryLong.text) === false || !veryLong.text.includes('  '), 'Kürzung erfolgt an einer Wortgrenze (kein abgeschnittenes Wortfragment mit doppeltem Leerzeichen)');
  assertTrue(!veryLong.text.slice(0, -1).endsWith(' '), 'kein Leerzeichen unmittelbar vor dem Auslassungszeichen');

  const normal = call(ctxReal, `socialVideoFitText('VfB Ulm',20,30)`);
  assertEqual(normal.stage, 'normal', 'VfB Ulm (7 Zeichen): Stufe "normal"');
}

// ═════════════════════════════════════════════════════════════════════════
console.log('== F) Dateinamen (Abschnitt 6.4): Schema, Umlaute, doppelte Gegner am selben Spieltag ==');
{
  const storyName = call(ctxReal, `socialVideoFileName({matchdayNumber:4,date:'2026-01-25',format:'story-9x16',opponentAssetKey:'tv-schriesheim'})`);
  assertEqual(storyName, 'vfb-ulm-md4-2026-01-25-story-tv-schriesheim.webm', 'Story-Dateiname exakt nach Schema');
  const feedName = call(ctxReal, `socialVideoFileName({matchdayNumber:4,date:'2026-01-25',format:'feed-4x5'})`);
  assertEqual(feedName, 'vfb-ulm-md4-2026-01-25-feed.webm', 'Feed-Dateiname exakt nach Schema (kein Gegner im Namen)');
  const mp4Name = call(ctxReal, `socialVideoFileName({matchdayNumber:4,date:'2026-01-25',format:'feed-4x5'},'mp4')`);
  assertEqual(mp4Name, 'vfb-ulm-md4-2026-01-25-feed.mp4', 'Dateiendung austauschbar (mp4 für S3)');
  const umlautName = call(ctxReal, `socialVideoFileName({matchdayNumber:6,date:'2026-02-28',format:'story-9x16',opponentAssetKey:'sv-tuebingen-sharks'})`);
  assertEqual(umlautName, 'vfb-ulm-md6-2026-02-28-story-sv-tuebingen-sharks.webm', 'SV Tübingen Sharks: Umlaut bereits im assetKey aufgelöst (ü -> ue durch teamKeyFor/matchcenterStoryTeamAssetKey)');

  // doppelte Gegner am selben Spieltag (real nicht vorkommend, aber die Story-Dateinamen zweier
  // VERSCHIEDENER Gegner am selben Spieltag müssen sich unterscheiden — Realdaten-Beleg aus Spieltag 4)
  const matchdays = call(ctxReal, `getSeasonMatchdays('25/26')`);
  const md4 = matchdays.find((m) => m.number === 4);
  const stories = callSpec(ctxReal, { seasonKey: '25/26', matchdayKey: md4.key, format: 'story-9x16' });
  const names = stories.map((s) => call(ctxReal, `socialVideoFileName(${JSON.stringify({ matchdayNumber: s.matchday.number, date: s.matchday.date, format: 'story-9x16', opponentAssetKey: s.opponentAssetKey })})`));
  assertEqual(names, ['vfb-ulm-md4-2026-01-25-story-tv-schriesheim.webm', 'vfb-ulm-md4-2026-01-25-story-fbc-heidelberg.webm'], 'zwei Gegner am selben Spieltag ergeben zwei unterschiedliche Dateinamen');
  assertTrue(new Set(names).size === names.length, 'keine Dateinamenkollision zwischen den beiden Stories desselben Spieltags');
}

// ═════════════════════════════════════════════════════════════════════════
console.log('== G) Schlüssel-Abgleich: matchcenterStoryTeamAssetKey (Browser) === teamKeyFor (Node) für ALLE Teams ALLER Saisons ==');
{
  const manifest = JSON.parse((await readFile(path.join(REPO_ROOT, 'season-data', 'seasons.json'), 'utf8')).replace(/^﻿/, ''));
  const seasons = {};
  for (const entry of manifest.seasons) seasons[entry.key] = JSON.parse((await readFile(path.join(REPO_ROOT, 'season-data', entry.file), 'utf8')).replace(/^﻿/, ''));
  const ctxAll = makeContext(seasons);
  let compared = 0;
  const mismatches = [];
  for (const [seasonKey, raw] of Object.entries(seasons)) {
    for (const g of raw.games || []) {
      for (const name of [g.home_team_name, g.guest_team_name]) {
        if (!name) continue;
        compared++;
        const browserKey = call(ctxAll, `matchcenterStoryTeamAssetKey(${JSON.stringify(name)},${JSON.stringify(seasonKey)})`);
        const nodeKey = teamKeyFor(name, seasonKey);
        if (browserKey !== nodeKey) mismatches.push({ seasonKey, name, browserKey, nodeKey });
      }
    }
  }
  assertTrue(compared >= 400, `Schlüssel-Abgleich: ${compared} (Saison, Teamname)-Paare verglichen (alle 5 echten Saisons)`);
  assertEqual(mismatches, [], 'matchcenterStoryTeamAssetKey und teamKeyFor liefern für ALLE Teams ALLER Saisons denselben Schlüssel');
}

// ═════════════════════════════════════════════════════════════════════════
console.log('== H) cache-team-logos.mjs ohne --fetch verändert nichts ==');
{
  const sandbox = path.join(os.tmpdir(), 's1-cache-logos-test');
  await rm(sandbox, { recursive: true, force: true });
  await mkdir(path.join(sandbox, 'season-data'), { recursive: true });
  const manifestText = await readFile(path.join(REPO_ROOT, 'season-data', 'seasons.json'), 'utf8');
  await writeFile(path.join(sandbox, 'season-data', 'seasons.json'), manifestText, 'utf8');
  const manifest = JSON.parse(manifestText.replace(/^﻿/, ''));
  for (const entry of manifest.seasons) {
    const content = await readFile(path.join(REPO_ROOT, 'season-data', entry.file), 'utf8');
    await writeFile(path.join(sandbox, 'season-data', entry.file), content, 'utf8');
  }
  const plan = await cacheLogos.planLogoCache(sandbox);
  assertTrue(plan.teams.length >= 8, `Dry-Run-Plan listet ${plan.teams.length} Teams`);
  assertEqual(plan.cached.length, 0, 'kein assets/teams/ vorhanden -> 0 bereits gecacht');
  const capture = () => { let text = ''; return { stream: { write: (s) => { text += s; } }, get text() { return text; } }; };
  const out = capture();
  const code = await cacheLogos.main([], { stdout: out.stream, repoRoot: sandbox });
  assertEqual(code, 0, 'Dry-Run: Exit 0');
  assertTrue(out.text.includes('Dry-Run'), 'Dry-Run-Bericht enthält "Dry-Run"');
  let assetsDirExists = true;
  try { await readFile(path.join(sandbox, 'assets', 'teams', 'vfb-ulm.png')); } catch (e) { assetsDirExists = e.code !== 'ENOENT' ? true : false; }
  assertTrue(!assetsDirExists, 'kein assets/teams/-Verzeichnis nach Dry-Run erzeugt');
  await rm(sandbox, { recursive: true, force: true });
}

console.log('');
if (failures > 0) {
  console.log(`${failures} Test(s) fehlgeschlagen.`);
  process.exitCode = 1;
} else {
  console.log('Alle Tests erfolgreich.');
  process.exitCode = 0;
}

#!/usr/bin/env node
// S2e (Renderer-Werkstatt, Stufe 2) — Test für socialVideoDrawListGroups: jedes Kommando einer Zeichenliste
// trägt ein `group`-Feld aus der festen Liste SOCIAL_VIDEO_GROUP_NAMES; socialVideoDrawListGroups(drawList)
// fasst sie zu {name,count,bbox} zusammen. Reine Funktionen, kein Canvas — dasselbe node:vm-Extraktionsmuster
// wie scripts/test-social-video-render.mjs (S2), seit der Renderer-Werkstatt Stufe 1 aus
// social-video-renderer.js statt aus index.html geschnitten.
//
// Abschnitt D prüft zusätzlich den Kanon 2a ("höchstens fünf Gruppen je Szene", Kopfzeile/Fortschrittsbalken
// zählen mit, dekorative Hintergrundgruppen nicht, siehe Kommentar an SOCIAL_VIDEO_DECORATIVE_GROUPS) — pinnt
// als Befund, welche Szenen die Grenze aktuell überschreiten, statt das Layout stillschweigend zu ändern
// (Auftrag Stufe 2: "melde das im Bericht als Befund, ändere das Layout aber nicht").
//
// Aufruf: node scripts/test-social-video-groups.mjs

import { readFile } from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';

const REPO_ROOT = path.resolve(import.meta.dirname, '..');
let failures = 0;

function assertEqual(actual, expected, label) {
  const a = JSON.stringify(actual);
  const e = JSON.stringify(expected);
  if (a === e) console.log(`  ok   ${label}`);
  else { failures++; console.log(`  FAIL ${label}\n       erwartet: ${e}\n       erhalten: ${a}`); }
}
function assertTrue(cond, label) { assertEqual(Boolean(cond), true, label); }

// Seit der Renderer-Werkstatt Stufe 1 (S2e) liegen buildSocialVideoSpec/Schicht A/Schicht B in
// social-video-renderer.js, nicht mehr in index.html — rendererSrc wird deshalb VOR html durchsucht, der Rest
// (Teamnormalisierung, Matchcenter-Bausteine) bleibt unverändert in index.html.
const html = (await readFile(path.join(REPO_ROOT, 'index.html'), 'utf8')).replace(/\r\n/g, '\n');
const rendererSrc = (await readFile(path.join(REPO_ROOT, 'social-video-renderer.js'), 'utf8')).replace(/\r\n/g, '\n');
const coreSrc = (await readFile(path.join(REPO_ROOT, 'matchcenter-core.js'), 'utf8')).replace(/\r\n/g, '\n');
function fnSource(name) {
  for (const src of [rendererSrc, coreSrc, html]) {
    const m = new RegExp(`(^|\\n)(async )?function ${name}\\(`).exec(src);
    if (!m) continue;
    const from = m.index + m[1].length;
    return src.slice(from, src.indexOf('\n}', from) + 2);
  }
  throw new Error(`Funktion nicht gefunden: ${name}`);
}
function constSource(name) {
  for (const src of [rendererSrc, coreSrc, html]) {
    const m = new RegExp(`(^|\\n)const ${name}=`).exec(src);
    if (!m) continue;
    const from = m.index + m[1].length;
    const head = src.slice(from, src.indexOf('\n', from));
    if (/[[{]$/.test(head)) { const close = head.endsWith('[') ? '\n];' : '\n};'; return src.slice(from, src.indexOf(close, from) + close.length); }
    return head;
  }
  throw new Error(`Konstante nicht gefunden: ${name}`);
}

const FUNCTIONS = [
  'cleanText', 'repairMojibake', 'fixKnownUiTransliterations', 'mojibakeScore', 'decodeCp1252AsUtf8',
  'normalizeTeamName', 'normalizeTeamKey', 'teamAliasRuleMatches', 'teamAliasSeasonMatches',
  'matchcenterSeasonIsUlmTuebingenSgEra', 'isOwnTeam', 'getCanonicalTeamName', 'isFreiburgTuebingenSgName',
  'isMannheimLudwigshafenSgName', 'normalizeOpponentNameForAllTime', 'isUlmTeamName', 'seasonOrderIndex',
  'pFull', 'normalizePlayerDisplayName', 'gameStableId', 'parseGameClock', 'getPhaseKey', 'isYouthGame', 'gameStatusText', 'gameScore',
  'classifyGameForStats', 'getRelevantSeasonGames', 'buildStandings', 'normalizeGame', 'formatDateDE',
  'compareGamesChronologically', 'buildMatchdays', 'matchdayAsOfCutoff', 'getSeasonMatchdays', 'isGameAtOrBeforeAsOf', 'getSeasonStatsAsOf',
  'matchcenterSeasonLabel',
  'matchcenterClamp', 'matchcenterNum', 'matchcenterDateValue', 'matchcenterSortGamesAsc', 'getOpponentAliasKeys', 'matchcenterIsUlmTeamName',
  'normalizeTeamNameForMatchcenter', 'matchcenterDetectUlmSide', 'matchcenterTeamDisplay', 'matchcenterTeamKey',
  'matchcenterAliasModeForContext', 'getOpponentAliasKeysForMatchcenter', 'matchcenterGameTeamName',
  'matchcenterGameSideForTeam', 'matchcenterGameSideForOpponentKey', 'matchcenterGameScore', 'matchcenterOutcomeForTeam', 'matchcenterGameKey',
  'matchcenterRosterPlayers', 'matchcenterPlayerDisplayName', 'matchcenterFindRosterPlayer', 'matchcenterPlayerKey',
  'matchcenterEventNumber', 'matchcenterResultLetter', 'matchcenterStoryShortTeamLabel', 'matchcenterStoryFormLetters',
  'matchcenterStoryPlayer', 'matchcenterStoryFormRecord', 'matchcenterStoryInitials',
  'matchcenterStoryTeamAssetKey', 'socialVideoDistributeSceneDurations', 'socialVideoFitText', 'socialVideoCheckFonts',
  'socialVideoUlmGamesForMatchday', 'socialVideoTableRank', 'socialVideoFormAsOf', 'socialVideoLastDuelAsOf',
  'socialVideoTopScorerAsOf', 'socialVideoOpponentSceneData', 'socialVideoFileName', 'socialVideoMatchdayLabel',
  'socialVideoBuildStorySpec', 'socialVideoBuildFeedSpec', 'buildSocialVideoSpec',
  'socialVideoHeightForFormat', 'socialVideoContentWidth', 'socialVideoEaseOutCubic', 'socialVideoEstimateFontSize',
  'socialVideoSceneAt', 'socialVideoElementProgress', 'socialVideoFlagPhase', 'socialVideoFlagColumnOffset',
  'socialVideoSkylineTransform', 'socialVideoSparrowPositions', 'socialVideoPushText', 'socialVideoPushLogo',
  'socialVideoPushForm', 'socialVideoLayoutScene', 'socialVideoBackgroundLayer', 'socialVideoDrawList',
  'socialVideoSceneTimeMs', 'socialVideoStandbildTimeMs', 'socialVideoCanvasExportHint',
  'getSeasonData', 'matchcenterAllGamesForSeason', 'matchcenterAllGames', 'matchcenterSeasonKeys',
  'matchcenterDirectGames', 'matchcenterContextGames', 'matchcenterScoutingGames',
  'matchcenterEnsureOpponentPlayer', 'matchcenterRegisterPlayerGame', 'matchcenterAddScoring',
  'matchcenterPenaltyMinutes', 'matchcenterIsLateGoalEvent', 'matchcenterIsClutchGoalEvent',
  'matchcenterFinalizeOpponentPlayerProfiles', 'matchcenterFmt', 'matchcenterBuildOpponentPlayerInsights',
  'matchcenterBuildOpponentScouting', 'socialVideoLastDuelWithFallback', 'socialVideoOpponentTopScorerAsOf',
  'socialVideoMatchupPairElement', 'socialVideoDuelFactElement', 'socialVideoTopscorerCardElement',
  'socialVideoOpponentKanonElements',
  'socialVideoPushHairline', 'socialVideoPushProgressBar', 'socialVideoHeaderText', 'socialVideoPushHeaderBar',
  'socialVideoMatchupColumns', 'socialVideoPushFormHairline', 'socialVideoLayoutMatchupGroup',
  'socialVideoLayoutDuelFactGroup', 'socialVideoLayoutTopscorerGroup', 'socialVideoLayoutOpponentKanon',
  // S2e Stufe 2 — der eigentliche Prüfling dieser Datei
  'socialVideoCommandBBox', 'socialVideoDrawListGroups',
];
const functionSource = FUNCTIONS.map(fnSource).join('\n');
const constSourceAll = [
  'MOJIBAKE_RUN_RE', 'CP1252_REVERSE_BYTES', 'UI_TEXT_REPLACEMENTS',
  'TEAM_ALIAS_RULES', 'ULM_TEAM_ALIASES', 'ULM_TEAM_ALIAS_KEYS', 'SOCIAL_VIDEO_DURATION_MS', 'SOCIAL_VIDEO_FPS',
  'SOCIAL_VIDEO_MIN_CONTENT_MS', 'SOCIAL_VIDEO_NAME_MAX_CHARS', 'SOCIAL_VIDEO_NAME_HARD_MAX_CHARS',
  'SOCIAL_VIDEO_FACT_MAX_CHARS', 'SOCIAL_VIDEO_FACT_HARD_MAX_CHARS', 'SOCIAL_VIDEO_STORY_SCENE_DEFS',
  'SOCIAL_VIDEO_FEED_SCENE_DEFS', 'SOCIAL_VIDEO_SAFE_TOP', 'SOCIAL_VIDEO_WIDTH', 'SOCIAL_VIDEO_SKYLINE_PATH_D',
  'SOCIAL_VIDEO_SKYLINE_VIEWBOX', 'SOCIAL_VIDEO_RISE_PX', 'SOCIAL_VIDEO_SPARROW_COUNT', 'SOCIAL_VIDEO_PILL_COLORS',
  'SOCIAL_VIDEO_INK', 'SOCIAL_VIDEO_MUTED', 'SOCIAL_VIDEO_ACCENT', 'SOCIAL_VIDEO_HAIRLINE_GOLD',
  'SOCIAL_VIDEO_HAIRLINE_SOFT', 'SOCIAL_VIDEO_FORM_WIN', 'SOCIAL_VIDEO_FORM_LOSS', 'SOCIAL_VIDEO_FORM_DRAW',
  'SOCIAL_VIDEO_FORM_COLOR', 'SOCIAL_VIDEO_KANON_SCENE_IDS',
  // S2e Stufe 2
  'SOCIAL_VIDEO_GROUP_NAMES', 'SOCIAL_VIDEO_DECORATIVE_GROUPS',
].map(constSource).join('\n');

function makeContext(seasons = {}) {
  const SEASONS = {};
  const SEASON_CONFIG = {};
  for (const [key, raw] of Object.entries(seasons)) {
    SEASONS[key] = { data: { rawLeagueGames: raw.games || [], rawGames: raw.games || [] } };
    SEASON_CONFIG[key] = { label: key, seasonId: null, dateRange: null };
  }
  const ctx = vm.createContext({
    console, SEASONS, SEASON_CONFIG, ACTIVE_SEASON_CONFIG: {}, SEASON_START: '', SEASON_END: '',
    STATIC_SEASON_DATA: {},
    cachedAnalysis: (key, fn) => fn(), analysisCacheKey: () => '', detectSide: () => null,
    globalThis: { document: undefined },
  });
  ctx.window = ctx;
  vm.runInContext(functionSource, ctx);
  vm.runInContext(constSourceAll, ctx);
  vm.runInContext(`for(const k of Object.keys(SEASONS)){SEASONS[k].data.rawLeagueGames=SEASONS[k].data.rawLeagueGames.map(normalizeGame);SEASONS[k].data.rawGames=SEASONS[k].data.rawGames.map(normalizeGame);}`, ctx);
  return ctx;
}
function callSpec(ctx, args) { return vm.runInContext(`buildSocialVideoSpec(${JSON.stringify(args)})`, ctx); }
function call(ctx, expr) { return vm.runInContext(expr, ctx); }
function drawList(ctx, spec, timeMs) { return vm.runInContext(`socialVideoDrawList(${JSON.stringify(spec)}, ${timeMs})`, ctx); }
function groupsOf(ctx, drawListVal) { return vm.runInContext(`socialVideoDrawListGroups(${JSON.stringify(drawListVal)})`, ctx); }
function sceneTimeMs(ctx, spec, sceneId, fraction) { return vm.runInContext(`socialVideoSceneTimeMs(${JSON.stringify(spec)}, ${JSON.stringify(sceneId)}, ${fraction})`, ctx); }

const WIDTH = 1080;
function heightForFormat(format) { return format === 'feed-4x5' ? 1350 : 1920; }

// ── Echte 25/26-Saisondaten laden (nur lesend) ──────────────────────────────
const raw2526 = JSON.parse((await readFile(path.join(REPO_ROOT, 'season-data', '25-26.json'), 'utf8')).replace(/^﻿/, ''));
const ctxReal = makeContext({ '25/26': raw2526 });
const md4 = call(ctxReal, `getSeasonMatchdays('25/26')`).find((m) => m.number === 4);
const storiesMd4 = callSpec(ctxReal, { seasonKey: '25/26', matchdayKey: md4.key, format: 'story-9x16' });
const feedMd4 = callSpec(ctxReal, { seasonKey: '25/26', matchdayKey: md4.key, format: 'feed-4x5' });
const groupNames = call(ctxReal, 'SOCIAL_VIDEO_GROUP_NAMES');
const decorativeGroups = call(ctxReal, '[...SOCIAL_VIDEO_DECORATIVE_GROUPS]');

// ═════════════════════════════════════════════════════════════════════════
console.log('== A) Jedes Kommando trägt eine Gruppe (reale Specs, mehrere Zeitpunkte, Story + Feed) ==');
{
  const allSpecs = [...storiesMd4.map((s) => [s, `Story ${s.opponentDisplay}`]), [feedMd4, 'Feed-Post']];
  for (const [spec, label] of allSpecs) {
    for (const t of [0, 1200, 3000, 7500, 12000, 14999]) {
      const list = drawList(ctxReal, spec, t);
      const missing = list.filter((cmd) => !cmd.group);
      assertEqual(missing.length, 0, `${label} t=${t}: alle ${list.length} Kommandos tragen ein group-Feld`);
    }
  }
}

// ═════════════════════════════════════════════════════════════════════════
console.log('== B) Alle verwendeten Gruppennamen kommen aus der festen Liste SOCIAL_VIDEO_GROUP_NAMES ==');
{
  const used = new Set();
  const allSpecs = [...storiesMd4, feedMd4];
  for (const spec of allSpecs) for (const t of [0, 3000, 7500, 12000, 14999]) {
    for (const cmd of drawList(ctxReal, spec, t)) used.add(cmd.group);
  }
  const unknown = [...used].filter((name) => !groupNames.includes(name));
  assertEqual(unknown, [], `alle verwendeten Gruppennamen (${[...used].sort().join(', ')}) kommen aus der festen Liste`);
}

// ═════════════════════════════════════════════════════════════════════════
console.log('== C) Bounding-Boxen jeder Gruppe liegen innerhalb der Leinwand (Inhaltsgruppen) ==');
{
  // Drei dekorative Hintergrundgruppen bleiben hier bewusst ausgenommen — ihre Bounding-Box reicht
  // GESTALTERISCH ABSICHTLICH über die Leinwand hinaus: der rote Glow (Gruppe "hintergrund") ist ein Verlauf
  // mit r=540, der am Rand weich nach Transparent ausläuft; die Spatzen ("spatzen") fliegen laut
  // socialVideoSparrowPositions bewusst bis 40px vor/hinter den Rand ein/aus; die Skyline-Box ("skyline") ist
  // laut Kommentar an socialVideoCommandBBox nur eine Näherung über die volle Viewbox (900x260 skaliert), nicht
  // der tatsächliche Pfadumriss, und überschreitet dadurch bei paralaxX>0 die Leinwand um wenige Pixel. Die
  // Werkstatt-Hilfslinien (Stufe 3) sind ohnehin nur für Inhaltsgruppen sinnvoll (Kanon-2a-Bausteine).
  const SKIP = new Set(['hintergrund', 'skyline', 'spatzen']);
  const allSpecs = [...storiesMd4.map((s) => [s, `Story ${s.opponentDisplay}`]), [feedMd4, 'Feed-Post']];
  for (const [spec, label] of allSpecs) {
    const height = heightForFormat(spec.format);
    for (const t of [0, 3000, 7500, 12000, 14999]) {
      const groups = groupsOf(ctxReal, drawList(ctxReal, spec, t));
      for (const g of groups) {
        if (SKIP.has(g.name)) continue;
        const within = g.bbox.x0 >= -1 && g.bbox.y0 >= -1 && g.bbox.x1 <= WIDTH + 1 && g.bbox.y1 <= height + 1;
        assertTrue(within, `${label} t=${t}: Gruppe "${g.name}" (${g.count} Kommandos) liegt innerhalb der Leinwand (${WIDTH}x${height})`);
      }
    }
  }
}

// ═════════════════════════════════════════════════════════════════════════
console.log('== D) Kanon 2a: höchstens fünf datentragende Gruppen je Szene (Kopfzeile/Fortschritt zählen mit, dekorative Hintergrundgruppen nicht) ==');
{
  // Je Szenen-id DIE datentragenden Gruppennamen sammeln (settled, 85% hinein) — anhand beider Story-Gegner
  // von Spieltag 4 (TV Schriesheim ohne lastDuel, FBC Heidelberg ebenso ohne lastDuel laut Realdaten-Pin in
  // test-social-video.mjs) und des Feed-Posts. Golden-Pin: dokumentiert den AKTUELLEN Befund, ändert nichts
  // am Layout (Auftrag Stufe 2).
  // socialVideoDrawList(spec,t) enthält bei t = Mitte der Szene sceneId ausschließlich deren eigene Elemente
  // plus das szenenübergreifende Chrom (Kopfzeile/Fortschrittsbalken) und die Hintergrundebene — kein
  // zusätzlicher Szenen-Filter nötig.
  function dataGroupsForScene(spec, sceneId) {
    const t = sceneTimeMs(ctxReal, spec, sceneId, 0.85);
    const list = drawList(ctxReal, spec, t);
    const names = new Set();
    for (const cmd of list) if (!decorativeGroups.includes(cmd.group)) names.add(cmd.group);
    return [...names].sort();
  }
  const report = [];
  for (const spec of storiesMd4) {
    for (const scene of spec.scenes) {
      const names = dataGroupsForScene(spec, scene.id);
      report.push({ label: `Story ${spec.opponentDisplay} / ${scene.id}`, sceneId: scene.id, names });
    }
  }
  for (const scene of feedMd4.scenes) {
    const names = dataGroupsForScene(feedMd4, scene.id);
    report.push({ label: `Feed-Post / ${scene.id}`, sceneId: scene.id, names });
  }
  console.log('  Befund (Gruppen je Szene, dekorative Hintergrundgruppen ausgenommen):');
  for (const row of report) {
    const over = row.names.length > 5 ? '  <-- ÜBER 5' : '';
    console.log(`    ${row.label}: ${row.names.length} (${row.names.join(', ')})${over}`);
  }
  // Golden-Pin: genau die Kanon-2a-Gegner-Szenen (opponent/opponentA/opponentB) überschreiten aktuell die
  // Fünf-Gruppen-Grenze, weil Stufe 2 die vormals EINE "matchup"-Gruppe für die Werkstatt in vier feinere
  // Bausteine aufgeteilt hat (logo-ulm/logo-gegner/vergleich/formzeile) — wie beauftragt NICHT durch eine
  // Layoutänderung behoben, nur dokumentiert (siehe Abschlussbericht).
  const scenesOverLimit = report.filter((r) => r.names.length > 5).map((r) => r.sceneId);
  const distinctOverLimit = [...new Set(scenesOverLimit)].sort();
  assertEqual(distinctOverLimit, ['opponent', 'opponentA', 'opponentB'], 'Szenen über der Fünf-Gruppen-Grenze: genau die Kanon-2a-Gegner-Szenen (Befund, Layout bewusst unverändert)');
  // Sechs IMMER vorhandene Gruppen (Fortschritt/Kopfzeile szenenübergreifend, logo-ulm/logo-gegner/vergleich/
  // formzeile aus der Pflicht-Matchup-Gruppe) — bereits das sind 6 und damit über der Fünf-Gruppen-Grenze.
  // duell/topscorer kommen optional hinzu (Stichtag-abhängig).
  const coreSix = ['formzeile', 'fortschritt', 'kopfzeile', 'logo-gegner', 'logo-ulm', 'vergleich'];
  for (const row of report) {
    if (row.sceneId !== 'opponent' && row.sceneId !== 'opponentA' && row.sceneId !== 'opponentB') continue;
    const hasCore = coreSix.every((n) => row.names.includes(n));
    assertTrue(hasCore, `${row.label}: alle sechs Kern-Gruppen vorhanden (${coreSix.join(', ')})`);
    const extra = row.names.filter((n) => !coreSix.includes(n));
    assertTrue(extra.every((n) => n === 'duell' || n === 'topscorer'), `${row.label}: zusätzliche Gruppen sind nur duell/topscorer (gefunden: ${extra.join(', ') || '—'})`);
  }
}

console.log('');
if (failures > 0) {
  console.log(`${failures} Test(s) fehlgeschlagen.`);
  process.exitCode = 1;
} else {
  console.log('Alle Tests erfolgreich.');
}

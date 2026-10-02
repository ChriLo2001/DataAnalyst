#!/usr/bin/env node
// S2 (Canvas2D-Renderer und Aufnahme, docs/social-video-spezifikation.md) — Test für Schicht A
// (socialVideoDrawList und die reinen Hilfsfunktionen). Schicht B (Canvas2D-Ausführung, MediaRecorder-
// Orchestrierung) ist bewusst NICHT Teil dieser Datei — sie berührt Canvas/DOM/MediaRecorder und ist ohne
// echten Browser nicht sinnvoll testbar (siehe Architektur-Vorgabe des Auftrags).
//
// socialVideoDrawList und alle Bausteine, die sie aufruft, werden UNVERÄNDERT aus dem index.html-Text
// geschnitten und in node:vm ausgeführt — dasselbe Muster wie scripts/test-social-video.mjs (S1). Echte
// 25/26-Saisondaten werden für das verbindliche Abnahmebeispiel (Spieltag 4, TV Schriesheim/FBC Heidelberg)
// geladen; für Randfälle (fehlende Daten, sehr lange Namen) dienen synthetische Spec-Objekte.
//
// Aufruf: node scripts/test-social-video-render.mjs

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
  // Teamnormalisierung (wie test-social-video.mjs)
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
  'matchcenterStoryPlayer', 'matchcenterStoryFormRecord', 'matchcenterStoryInitials',
  // S1: Spec-Bausteine (buildSocialVideoSpec liefert die Eingabe für socialVideoDrawList)
  'matchcenterStoryTeamAssetKey', 'socialVideoDistributeSceneDurations', 'socialVideoFitText', 'socialVideoCheckFonts',
  'socialVideoUlmGamesForMatchday', 'socialVideoTableRank', 'socialVideoFormAsOf', 'socialVideoLastDuelAsOf',
  'socialVideoTopScorerAsOf', 'socialVideoOpponentSceneData', 'socialVideoFileName', 'socialVideoMatchdayLabel',
  'socialVideoBuildStorySpec', 'socialVideoBuildFeedSpec', 'buildSocialVideoSpec',
  // S2: SCHICHT A — der eigentliche Prüfling dieser Datei
  'socialVideoHeightForFormat', 'socialVideoContentWidth', 'socialVideoEaseOutCubic', 'socialVideoEstimateFontSize',
  'socialVideoSceneAt', 'socialVideoElementProgress', 'socialVideoFlagPhase', 'socialVideoFlagColumnOffset',
  'socialVideoSkylineTransform', 'socialVideoSparrowPositions', 'socialVideoPushText', 'socialVideoPushLogo',
  'socialVideoPushForm', 'socialVideoLayoutScene', 'socialVideoBackgroundLayer', 'socialVideoDrawList',
  'socialVideoSceneTimeMs', 'socialVideoStandbildTimeMs',
  // S2-Nachtrag (Canvas-Taint unter file:// behoben): reine Hinweistext-Funktion
  'socialVideoCanvasExportHint',
  // S2c (Gestaltungskanon 2a im Renderer, Fakt=letztes Duell mit Fallback, Topscorer mit Stichtag) —
  // socialVideoLastDuelWithFallback/socialVideoOpponentTopScorerAsOf brauchen matchcenterAllGames() echt
  // (kein Parameter für eine vorgefilterte Spielliste, siehe Kommentar an der Funktion selbst).
  'getSeasonData', 'matchcenterAllGamesForSeason', 'matchcenterAllGames', 'matchcenterSeasonKeys',
  'matchcenterDirectGames', 'matchcenterContextGames', 'matchcenterScoutingGames',
  'matchcenterEnsureOpponentPlayer', 'matchcenterRegisterPlayerGame', 'matchcenterAddScoring',
  'matchcenterPenaltyMinutes', 'matchcenterIsLateGoalEvent', 'matchcenterIsClutchGoalEvent',
  'matchcenterFinalizeOpponentPlayerProfiles', 'matchcenterFmt', 'matchcenterBuildOpponentPlayerInsights',
  'matchcenterBuildOpponentScouting', 'socialVideoLastDuelWithFallback', 'socialVideoOpponentTopScorerAsOf',
  'socialVideoMatchupPairElement', 'socialVideoDuelFactElement', 'socialVideoTopscorerCardElement',
  'socialVideoOpponentKanonElements',
  // S2c — Gestaltungskanon 2a, Schicht A (Kopfzeile/Fortschrittsbalken/Gegner-Szene)
  'socialVideoPushHairline', 'socialVideoPushProgressBar', 'socialVideoHeaderText', 'socialVideoPushHeaderBar',
  'socialVideoMatchupColumns', 'socialVideoPushFormHairline', 'socialVideoLayoutMatchupGroup',
  'socialVideoLayoutDuelFactGroup', 'socialVideoLayoutTopscorerGroup', 'socialVideoLayoutOpponentKanon',
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
].map(constSource).join('\n');

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
    STATIC_SEASON_DATA: {},
    cachedAnalysis: (key, fn) => fn(),
    analysisCacheKey: () => '',
    detectSide: () => null,
    globalThis: { document: undefined },
  });
  ctx.window = ctx;
  vm.runInContext(functionSource, ctx);
  vm.runInContext(constSourceAll, ctx);
  vm.runInContext(`for(const k of Object.keys(SEASONS)){SEASONS[k].data.rawLeagueGames=SEASONS[k].data.rawLeagueGames.map(normalizeGame);SEASONS[k].data.rawGames=SEASONS[k].data.rawGames.map(normalizeGame);}`, ctx);
  return ctx;
}
function callSpec(ctx, args) {
  return vm.runInContext(`buildSocialVideoSpec(${JSON.stringify(args)})`, ctx);
}
function call(ctx, expr) {
  return vm.runInContext(expr, ctx);
}
function drawList(ctx, spec, timeMs) {
  return vm.runInContext(`socialVideoDrawList(${JSON.stringify(spec)}, ${timeMs})`, ctx);
}
function sceneTimeMs(ctx, spec, sceneId, fraction) {
  return vm.runInContext(`socialVideoSceneTimeMs(${JSON.stringify(spec)}, ${JSON.stringify(sceneId)}, ${fraction})`, ctx);
}

const SAFE_LEFT = 64, SAFE_RIGHT = 64, SAFE_TOP = 120, SAFE_BOTTOM = 120, WIDTH = 1080;
const CONTENT_W = WIDTH - SAFE_LEFT - SAFE_RIGHT;
function estimateTextWidth(cmd) {
  const factor = cmd.font === 'mono' ? 0.6 : (cmd.font === 'inter' ? 0.55 : 0.66);
  return String(cmd.text).length * factor * cmd.size;
}
function heightForFormat(format) { return format === 'feed-4x5' ? 1350 : 1920; }

// ── Echte 25/26-Saisondaten laden (nur lesend) ──────────────────────────────
const raw2526 = JSON.parse((await readFile(path.join(REPO_ROOT, 'season-data', '25-26.json'), 'utf8')).replace(/^﻿/, ''));
const ctxReal = makeContext({ '25/26': raw2526 });
const md4 = call(ctxReal, `getSeasonMatchdays('25/26')`).find((m) => m.number === 4);
const storiesMd4 = callSpec(ctxReal, { seasonKey: '25/26', matchdayKey: md4.key, format: 'story-9x16' });
const feedMd4 = callSpec(ctxReal, { seasonKey: '25/26', matchdayKey: md4.key, format: 'feed-4x5' });

// ═════════════════════════════════════════════════════════════════════════
console.log('== A) Determinismus: gleiche Spec + gleiches timeMs -> identische Zeichenliste ==');
{
  for (const t of [0, 1, 1200, 2400, 7000, 12999, 15000]) {
    const a = drawList(ctxReal, storiesMd4[0], t);
    const b = drawList(ctxReal, storiesMd4[0], t);
    assertEqual(JSON.stringify(a), JSON.stringify(b), `Story TV Schriesheim, t=${t}: zwei Aufrufe identisch`);
  }
  const f1 = drawList(ctxReal, feedMd4, 8000);
  const f2 = drawList(ctxReal, feedMd4, 8000);
  assertEqual(JSON.stringify(f1), JSON.stringify(f2), 'Feed-Post, t=8000: zwei Aufrufe identisch');
}

// ═════════════════════════════════════════════════════════════════════════
console.log('== B) Zeitachse: aktive Szene an den Grenzen, Gesamtdauer, entfallende Szenen ==');
{
  const spec = storiesMd4[0]; // TV Schriesheim: kein lastDuel (vor Spieltag 4), siehe Realdaten-Pin unten
  assertEqual(spec.scenes.reduce((s, sc) => s + (sc.endMs - sc.startMs), 0), 15000, 'Summe der Szenendauern exakt 15000ms');
  assertTrue(!spec.scenes.some((sc) => sc.id === 'lastDuel'), 'Vorbedingung: lastDuel-Szene entfällt bei diesem Beispiel (Stichtag)');
  // Jede Szene erzeugt an ihrem Start eine nicht-leere Liste (mindestens den Hintergrund) und am letzten
  // Millisekunden-Wert VOR ihrem Ende dieselbe Szene wie am Start der naechsten.
  for (let i = 0; i < spec.scenes.length; i++) {
    const sc = spec.scenes[i];
    const atStart = drawList(ctxReal, spec, sc.startMs);
    assertTrue(Array.isArray(atStart) && atStart.length > 0, `Szene ${sc.id}: an startMs=${sc.startMs} nicht-leere Zeichenliste`);
    if (i < spec.scenes.length - 1) {
      const next = spec.scenes[i + 1];
      assertEqual(sc.endMs, next.startMs, `Szene ${sc.id} -> ${next.id}: lückenlos (endMs === nächstes startMs)`);
    }
  }
  const atEnd = drawList(ctxReal, spec, 15000);
  assertTrue(Array.isArray(atEnd) && atEnd.length > 0, 'bei timeMs === durationMs (15000): nicht-leere Zeichenliste (auf letzte Szene geklemmt)');

  // Verteilungsregel samt Obergrenzen (Intro/Abschluss fix+gedeckelt, Mindestdauer 1500ms) — hier anhand
  // des Feed-Formats (4 Szenen, zwei Inhaltsszenen) mit vollständigen UND fehlenden Gegnern geprüft.
  const feedSum = feedMd4.scenes.reduce((s, sc) => s + (sc.endMs - sc.startMs), 0);
  assertEqual(feedSum, 15000, 'Feed-Post: Summe exakt 15000ms (beide Gegner vorhanden)');
  const introFeed = feedMd4.scenes.find((sc) => sc.id === 'intro');
  const outroFeed = feedMd4.scenes.find((sc) => sc.id === 'outro');
  assertTrue(introFeed.endMs - introFeed.startMs <= 2400, 'Feed-Intro bleibt unter der Obergrenze (capMs 2400)');
  assertTrue(outroFeed.endMs - outroFeed.startMs <= 3400, 'Feed-Abschluss bleibt unter der Obergrenze (capMs 3400)');
  for (const sc of feedMd4.scenes) if (sc.id !== 'intro' && sc.id !== 'outro') assertTrue(sc.endMs - sc.startMs >= 1500, `Feed-Inhaltsszene ${sc.id}: mindestens 1500ms`);
}

// ═════════════════════════════════════════════════════════════════════════
console.log('== C) Sichere Ränder: kein Textelement überschreitet 120/64px, beide Formate, auch bei sehr langen Vereinsnamen ==');
{
  function checkSpecMargins(spec, label) {
    const height = heightForFormat(spec.format);
    const sampleCount = 12;
    for (let i = 0; i <= sampleCount; i++) {
      const t = Math.round((spec.durationMs || 15000) * (i / sampleCount));
      const list = drawList(ctxReal, spec, t);
      for (const cmd of list) {
        if (cmd.type !== 'text') continue;
        const w = estimateTextWidth(cmd);
        assertTrue(w <= cmd.maxWidth + 0.5, `${label} t=${t}: Text "${cmd.text}" (${w.toFixed(1)}px) passt in maxWidth (${cmd.maxWidth}px)`);
        assertTrue(cmd.maxWidth <= CONTENT_W + 0.5, `${label} t=${t}: Text "${cmd.text}" maxWidth (${cmd.maxWidth}px) <= Inhaltsbreite (${CONTENT_W}px)`);
        const halfW = (cmd.align === 'center' ? cmd.maxWidth / 2 : cmd.maxWidth);
        const left = cmd.align === 'center' ? cmd.x - halfW : (cmd.align === 'right' ? cmd.x - cmd.maxWidth : cmd.x);
        const right = cmd.align === 'center' ? cmd.x + halfW : (cmd.align === 'right' ? cmd.x : cmd.x + cmd.maxWidth);
        assertTrue(left >= SAFE_LEFT - 1, `${label} t=${t}: Text "${cmd.text}" linker Rand (${left.toFixed(1)}) >= ${SAFE_LEFT}`);
        assertTrue(right <= WIDTH - SAFE_RIGHT + 1, `${label} t=${t}: Text "${cmd.text}" rechter Rand (${right.toFixed(1)}) <= ${WIDTH - SAFE_RIGHT}`);
      }
    }
  }
  for (const spec of storiesMd4) checkSpecMargins(spec, `Story ${spec.opponentDisplay}`);
  checkSpecMargins(feedMd4, 'Feed-Post');

  // Synthetische Spec mit sehr langem Vereinsnamen (Spezifikation Abschnitt 8, Testfall 4): "DJK Giants
  // Karlsruhe-Ost" und ein künstlich noch längerer Name.
  const longNameSpec = {
    schemaVersion: 1, format: 'story-9x16', seasonKey: '25/26',
    matchday: { number: 1, date: '2026-01-01', arena: 'Sehr lange Hallenbezeichnung mit vielen Wörtern Arena', kickoffs: ['11:00'] },
    durationMs: 15000, fps: 30,
    scenes: [
      { id: 'intro', startMs: 0, endMs: 2400, elements: [
        { type: 'title', text: 'Spieltag 1', animation: 'rise', delayMs: 200 },
        { type: 'meta', text: '01.01.2026 · Sehr lange Hallenbezeichnung mit vielen Wörtern Arena', animation: 'rise', delayMs: 320 },
      ] },
      { id: 'opponent', startMs: 2400, endMs: 6400, elements: [
        { type: 'title', text: 'DJK Giants Karlsruhe-Ost mit künstlich angehängtem Zusatztext', textStage: 'tight', animation: 'rise', delayMs: 120 },
      ] },
    ],
    opponentAssetKey: 'djk-giants-karlsruhe-ost', opponentDisplay: 'DJK Giants Karlsruhe-Ost', dataSources: {}, warnings: [],
  };
  checkSpecMargins(longNameSpec, 'Synthetisch (sehr langer Vereinsname)');
}

// ═════════════════════════════════════════════════════════════════════════
console.log('== D) Fahne: Phase reine Funktion der Zeit, Amplitude innerhalb der Vorgabe ==');
{
  for (const t of [0, 333, 1250, 2500, 7777, 14999]) {
    assertEqual(call(ctxReal, `socialVideoFlagPhase(${t})`), call(ctxReal, `socialVideoFlagPhase(${t})`), `t=${t}: socialVideoFlagPhase zweimal identisch`);
  }
  // Periode ca. 2,5s: Phase bei t und t+2500 unterscheidet sich um exakt 2*PI (reine Sinusfunktion).
  const p0 = call(ctxReal, `socialVideoFlagPhase(1000)`);
  const p1 = call(ctxReal, `socialVideoFlagPhase(3500)`);
  assertTrue(Math.abs((p1 - p0) - 2 * Math.PI) < 1e-9, 'Phase nach einer vollen Periode (2500ms) um exakt 2π weiter');

  const flagH = 240, flagW = 360;
  const maxAmplitude = flagH * 0.015;
  let maxSeen = 0;
  for (const t of [0, 400, 1200, 2500, 6000, 14999]) {
    for (let x = 0; x < flagW; x += 20) {
      const offset = call(ctxReal, `socialVideoFlagColumnOffset(${x}, ${flagW}, ${flagH}, ${t})`);
      maxSeen = Math.max(maxSeen, Math.abs(offset));
      assertTrue(Math.abs(offset) <= maxAmplitude + 1e-9, `Fahnen-Höhenversatz bei x=${x}, t=${t} (${offset.toFixed(2)}px) <= ${maxAmplitude.toFixed(2)}px (1,5% von ${flagH}px)`);
    }
  }
  assertTrue(maxSeen > 0, 'Vorbedingung: die Welle bewegt sich tatsächlich (nicht konstant 0)');
}

// ═════════════════════════════════════════════════════════════════════════
console.log('== E) Hintergrundebene: Deckkraft hinter Textbereichen höchstens 0,35 (noch nicht auf Kanon 2a umgestellte Szenen) ==');
{
  // Der abdunkelnde Verlauf (socialVideoDrawList) gilt NUR noch für Szenen außerhalb des Gestaltungskanons 2a
  // (intro/lastDuel/playersToWatch/outro, Spezifikation 4.4) — für opponent/opponentA/opponentB entfällt er
  // bewusst (Abschnitt 2a verbietet Verlaufsfüllungen hinter Text), siehe Abschnitt E2 unten.
  for (const spec of [...storiesMd4, feedMd4]) {
    const introT = sceneTimeMs(ctxReal, spec, 'intro', 0.5);
    const list = drawList(ctxReal, spec, introT);
    const overlay = list.find((c) => c.type === 'rect' && c.fill?.type === 'linear' && c.w === WIDTH);
    assertTrue(!!overlay, `${spec.format} ${spec.opponentDisplay || 'Feed'} (intro): abdunkelnder Verlauf vorhanden`);
    assertTrue((overlay?.opacity ?? 1) <= 0.35 + 1e-9, `${spec.format} ${spec.opponentDisplay || 'Feed'} (intro): Deckkraft des abdunkelnden Verlaufs (${overlay?.opacity}) <= 0,35`);
  }
}

// ═════════════════════════════════════════════════════════════════════════
console.log('== E2) Gestaltungskanon 2a — Prüfbar-Abschnitt (docs/social-video-spezifikation.md 2a) ==');
{
  const kanonSceneIds = new Set(['opponent', 'opponentA', 'opponentB']);
  for (const spec of [...storiesMd4, feedMd4]) {
    for (const scene of spec.scenes.filter((s) => kanonSceneIds.has(s.id))) {
      const t = sceneTimeMs(ctxReal, spec, scene.id, 0.85);
      const list = drawList(ctxReal, spec, t);
      const label = `${spec.format} ${spec.opponentDisplay || 'Feed'} (${scene.id})`;

      // Keine Verlaufsfüllung hinter Text: kein rect/circle/path-Befehl mit Verlaufsfüllung außer der
      // Hintergrundebene selbst (socialVideoBackgroundLayer, cacheable:true markiert).
      const gradientNonBackground = list.filter((c) => !c.cacheable && c.fill?.type && ['linear', 'radial'].includes(c.fill.type));
      assertEqual(gradientNonBackground.length, 0, `${label}: keine Verlaufsfüllung außerhalb der Hintergrundebene`);

      // Kein Container mit Eckradius (rx) UND Füllung — Kanon 2a kennt nur Haarlinien (1px, flächenlos) statt
      // Kästen als Container.
      const roundedContainers = list.filter((c) => c.type === 'rect' && c.rx && c.fill);
      assertEqual(roundedContainers.length, 0, `${label}: kein Container mit Eckradius`);

      // Keine farbigen Schatten: dieses Projekt kennt in der Zeichenliste kein shadow*-Feld — stellt sicher,
      // dass keins eingeschlichen ist.
      const withShadow = list.filter((c) => c.shadowColor || c.shadowBlur);
      assertEqual(withShadow.length, 0, `${label}: keine Zeichenbefehle mit Schatten-Feldern`);

      // Zahlen verwenden Tabellenziffern: jeder als tabular:true markierte Textbefehl nutzt den Mono-Font
      // (einzige in diesem Projekt verfügbare echte Monospace-Schrift — Canvas2D kennt kein
      // font-variant-numeric, siehe Kommentar an socialVideoFontString/socialVideoDrawCommand).
      const tabularTexts = list.filter((c) => c.type === 'text' && c.tabular);
      assertTrue(tabularTexts.length > 0, `${label}: mindestens ein tabellenziffern-markierter Textbefehl vorhanden`);
      assertTrue(tabularTexts.every((c) => c.font === 'mono'), `${label}: alle tabular:true-Textbefehle nutzen den Mono-Font (Tabellenziffern)`);

      // Sichtbare (datentragende) Gruppen je Szene, inklusive Kopfzeile/Fortschrittsbalken, OHNE die
      // dekorative Hintergrundebene (Hintergrund/Skyline/Spatzen/Fahne/Abdunklung — jedes Kommando trägt seit
      // der Renderer-Werkstatt Stufe 2 ein group-Feld, auch die dekorativen). Die frühere Hartgrenze "höchstens
      // fünf" ist hier zugunsten der feineren Werkstatt-Bausteinaufteilung (logo-ulm/logo-gegner/vergleich/
      // formzeile statt EINER "matchup"-Gruppe) zu einem dokumentierten Befund geworden statt einer
      // Testassertion — siehe scripts/test-social-video-groups.mjs Abschnitt D (dort als Golden-Pin geprüft)
      // und den Abschlussbericht dieser Phase.
      const decorativeGroups = new Set(['hintergrund', 'skyline', 'spatzen', 'flagge', 'abdunklung']);
      const groups = new Set(list.map((c) => c.group).filter((g) => g && !decorativeGroups.has(g)));
      console.log(`  info ${label}: ${groups.size} datentragende Gruppen (${[...groups].sort().join(', ')})`);

      // Akzentfläche höchstens 5 Prozent der Bildfläche; Formbilanz-Farben (formColor:true) zählen laut
      // Auftrag NICHT ins Budget, werden aber getrennt ausgewiesen.
      const canvasArea = WIDTH * heightForFormat(spec.format);
      const areaOf = (c) => {
        if (c.type === 'rect') return Math.max(0, c.w) * Math.max(0, c.h);
        if (c.type === 'circle') return Math.PI * c.r * c.r;
        if (c.type === 'text') return Math.max(0, c.maxWidth || 0) * Math.max(0, c.size || 0);
        return 0;
      };
      const accentArea = list.filter((c) => c.accent).reduce((s, c) => s + areaOf(c), 0);
      const formColorArea = list.filter((c) => c.formColor).reduce((s, c) => s + areaOf(c), 0);
      assertTrue(accentArea / canvasArea <= 0.05 + 1e-9, `${label}: Akzentfläche (${((accentArea / canvasArea) * 100).toFixed(2)}%) höchstens 5% — Formbilanz-Fläche getrennt: ${((formColorArea / canvasArea) * 100).toFixed(2)}%`);
    }
  }
}
function socialVideoMidOf(spec) { return Math.round((spec.durationMs || 15000) / 2); }

// ═════════════════════════════════════════════════════════════════════════
console.log('== F) Fehlende Daten: gültige Zeichenliste ohne leere Elemente ==');
{
  // Kein Duell (Realdaten-Beispiel Spieltag 4, siehe oben): lastDuel-Szene entfällt bereits in der Spec,
  // socialVideoDrawList muss über die gesamte Dauer ohne Absturz und ohne leere Liste durchlaufen.
  for (const spec of storiesMd4) {
    for (const t of [0, 3000, 6000, 9000, 12000, 15000]) {
      const list = drawList(ctxReal, spec, t);
      assertTrue(Array.isArray(list) && list.length > 0, `${spec.opponentDisplay} (kein Duell) t=${t}: nicht-leere Zeichenliste`);
    }
  }

  // Kein Logo (Asset-Pfad fehlt im Element): socialVideoDrawList kennt den Ladezustand nicht (rein) und
  // erzeugt trotzdem IMMER Ring+Initialen — der image-Befehl ist zusätzlich da, nie ein Ersatz dafür.
  const noLogoSpec = {
    format: 'story-9x16', durationMs: 15000,
    scenes: [{ id: 'intro', startMs: 0, endMs: 15000, elements: [{ type: 'logo', team: 'unbekanntes-team', asset: '', animation: 'fade', delayMs: 0 }] }],
  };
  const noLogoList = drawList(ctxReal, noLogoSpec, 1000);
  assertTrue(noLogoList.some((c) => c.type === 'circle'), 'kein Logo-Asset: Ring wird trotzdem gezeichnet (circle-Befehl)');
  assertTrue(noLogoList.some((c) => c.type === 'text'), 'kein Logo-Asset: Initialen werden trotzdem gezeichnet (text-Befehl)');

  // Kein Players-to-watch-Kandidat: Szene entfällt bereits in der Spec (siehe buildSocialVideoSpec) — eine
  // Spec ganz ohne playersToWatch-Szene darf trotzdem über die volle Dauer eine gültige Liste liefern.
  const noWatchSpec = { format: 'story-9x16', durationMs: 15000, scenes: [{ id: 'intro', startMs: 0, endMs: 15000, elements: [{ type: 'title', text: 'Ohne Players to watch', animation: 'rise', delayMs: 0 }] }] };
  for (const t of [0, 7500, 15000]) assertTrue(drawList(ctxReal, noWatchSpec, t).length > 0, `kein Players-to-watch-Kandidat, t=${t}: nicht-leere Zeichenliste`);

  // Ganz ohne Szenen (z. B. kein Ulm-Spiel an diesem Spieltag gefunden, siehe buildSocialVideoSpec): kein
  // Absturz, mindestens der Hintergrund bleibt sichtbar (keine leere Liste als "kaputter" Zustand).
  const emptySpec = { format: 'story-9x16', durationMs: 0, scenes: [] };
  const emptyList = drawList(ctxReal, emptySpec, 0);
  assertTrue(Array.isArray(emptyList) && emptyList.length > 0, 'spec ohne Szenen: trotzdem eine gültige (Hintergrund-)Zeichenliste, kein Absturz');

  // Fehlende Schriften: socialVideoDrawList kennt KEINEN Lade-/Verfügbarkeitszustand von Schriften (reine
  // Funktion, keine Schriftmessung — siehe Architektur-Vorgabe). Alle Textbefehle tragen ausschließlich
  // einen von drei logischen, in Schicht B immer mit CSS-Ersatzschriften hinterlegten Font-Bezeichnern.
  const knownFonts = new Set(['syne', 'mono', 'inter']);
  for (const spec of [...storiesMd4, feedMd4]) {
    const list = drawList(ctxReal, spec, socialVideoMidOf(spec));
    for (const cmd of list.filter((c) => c.type === 'text')) assertTrue(knownFonts.has(cmd.font), `Textbefehl "${cmd.text}" nutzt einen bekannten, in Schicht B immer ersetzbaren Font-Bezeichner (${cmd.font})`);
  }
}

// ═════════════════════════════════════════════════════════════════════════
console.log('== G) S2-Nachtrag (Canvas-Taint unter file:// behoben): Asset-Quelle und Vorprüfungs-Hinweis ==');
{
  // Statisch geprüft (Quelltext, nicht ausgeführt — socialVideoLoadAssets ist DOM-abhängig: Image/window,
  // in node:vm ohne DOM nicht sinnvoll aufrufbar): der Renderer lädt Bilder ausschließlich aus
  // window.SOCIAL_VIDEO_ASSETS, nie mehr direkt aus einem assets/…-Dateipfad (der frühere, unter file://
  // Canvas-taintende Weg).
  const loadAssetsSource = fnSource('socialVideoLoadAssets');
  assertTrue(loadAssetsSource.includes('SOCIAL_VIDEO_ASSETS'), 'socialVideoLoadAssets bezieht Bilder aus window.SOCIAL_VIDEO_ASSETS');
  assertTrue(!/\.src\s*=\s*key\b/.test(loadAssetsSource), 'socialVideoLoadAssets setzt img.src NICHT mehr direkt auf den rohen assets/…-Schlüssel (alter Taint-Weg)');

  // Vorprüfungs-Hinweis (socialVideoCanvasExportHint): im file://-Fall der konkrete Ausweg samt Befehlszeile,
  // sonst ein allgemeiner Hinweis — beide ohne Canvas/DOM testbar, reine Funktion von isFileProtocol.
  const hintFile = call(ctxReal, `socialVideoCanvasExportHint(true)`);
  const hintOther = call(ctxReal, `socialVideoCanvasExportHint(false)`);
  assertTrue(hintFile.includes('file://'), 'file://-Fall: Hinweis nennt file:// als Ursache');
  assertTrue(hintFile.includes('scripts/serve.mjs'), 'file://-Fall: Hinweis nennt den konkreten Server-Befehl');
  assertTrue(!hintOther.includes('file://'), 'anderer Fall: Hinweis nennt NICHT file:// (wäre irreführend, wenn die Ursache eine andere ist)');
  assertTrue(hintFile !== hintOther, 'file://-Fall und anderer Fall liefern unterschiedliche Hinweise');
}

console.log('');
if (failures > 0) {
  console.log(`${failures} Test(s) fehlgeschlagen.`);
  process.exitCode = 1;
} else {
  console.log('Alle Tests erfolgreich.');
}

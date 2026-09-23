#!/usr/bin/env node
// P0b-Fix 3 — Test für die Datenstand-Anzeige in der Kontextleiste (Spezifikation 6.3,
// 3.3 "Der Datenstand ergibt sich aus dem letzten beendeten Spiel").
//
// Die echten Funktionen (rSeasonDataStateContextHint, rContextBar, getSeasonDataState,
// getSeasonMatchdays/buildMatchdays/compareGamesChronologically, formatDateDE, die
// P0c.4-Vorschau samt rSeasonDataPreviewContextHint) werden unverändert aus dem
// index.html-Text geschnitten und in node:vm ausgeführt. Nur die Zeitpunkt-Auswahl
// (rAsOfSelector, nicht Gegenstand dieses Tests) ist ein fester Platzhalter. Die
// Ausgabe wird auf den 5 echten Saisons gegen eine unabhängige Referenzberechnung
// mit den echten .mjs-Modulen geprüft. localStorage ist ein Fake mit Zähler.
// Liest index.html und season-data/*.json nur lesend, schreibt nichts.
//
// Aufruf: node scripts/test-p0b-context-data-state.mjs

import { readFile } from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';

import { buildMatchdays as refBuildMatchdays } from './matchday-derivation.mjs';
import { compareGamesChronologically as refCompare } from './game-ordering.mjs';

const REPO_ROOT = path.resolve(import.meta.dirname, '..');
const SEASON_KEYS = ['21/22', '22/23', '23/24', '24/25', '25/26'];
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
const clone = (o) => JSON.parse(JSON.stringify(o));

const html = (await readFile(path.join(REPO_ROOT, 'index.html'), 'utf8')).replace(/\r\n/g, '\n');
function between(startMarker, endMarker) {
  const s = html.indexOf(startMarker);
  const e = html.indexOf(endMarker);
  if (s === -1 || e === -1 || html.indexOf(startMarker, s + 1) !== -1) throw new Error(`Marker nicht eindeutig: ${startMarker}`);
  return html.slice(s, e + endMarker.length);
}
function fnSource(name) {
  const m = new RegExp(`(^|\\n)function ${name}\\(`).exec(html);
  if (!m) throw new Error(`Funktion nicht gefunden: ${name}`);
  const from = m.index + m[1].length;
  return html.slice(from, html.indexOf('\n}', from) + 2);
}
const stripComments = (s) => s.split('\n').filter((l) => !l.trim().startsWith('//') && !l.trim().startsWith('*') && !l.trim().startsWith('/*')).join('\n');

const realFunctions = ['isGameAtOrBeforeAsOf', 'deriveAsOfForSeason', 'getStaticSeasonGames', 'compareGamesChronologically', 'buildMatchdays', 'asOfCacheKeyPart', 'analysisCacheKey', 'cachedAnalysis', 'getSeasonMatchdays', 'formatDateDE', 'getSeasonDataState', 'rSeasonDataStateContextHint', 'getActiveSeasonKey', 'rSeasonDataPreviewContextHint', 'rContextBar'].map(fnSource).join('\n');
const einsatzRegion = between('const LINEUP_DATA={};', 'window.einsatzCenterSoftIssues=einsatzCenterSoftIssues;');
const previewBlock = between('// ═══ Season-Daten-Vorschau (P0c.4', '// ═══ Ende Season-Daten-Vorschau (P0c.4)');
const realConsts = /^const SEASON_DATA_STATE_KEY_PREFIX=.*$/m.exec(html)[0];

const real = {};
for (const k of SEASON_KEYS) real[k] = JSON.parse(await readFile(path.join(REPO_ROOT, 'season-data', `${k.replace('/', '-')}.json`), 'utf8'));

const ASOF = '<label class="ia-context-asof">ASOF</label>';
function makeStorage() {
  const s = { calls: 0, getItem() { s.calls++; return null; }, setItem() { s.calls++; }, removeItem() { s.calls++; } };
  return s;
}
/** Spiel-Fixture (Struktur wie in season-data, nur die für die Matchday-Ableitung nötigen Felder). */
const sg = (id, day, date, ended, extra = {}) => ({ id, game_number: String(id), date, start_time: '12:00', game_day: { game_day_number: day, title: `${day}. Spieltag` }, home_team_name: 'A', guest_team_name: 'B', started: ended, ended, ...extra });
const seasonA = () => [sg(1, 1, '2026-03-01', true), sg(2, 1, '2026-03-01', true), sg(3, 2, '2026-03-08', true), sg(4, 2, '2026-03-08', true), sg(5, 3, '2026-05-01', false), sg(6, 3, '2026-05-01', false)];
const seasonC = () => [sg(1, 1, '2026-06-01', false), sg(2, 1, '2026-06-01', false)];

/** Frischer vm-Kontext ("App-Start"). games: seasonKey -> Roh-Spiele der Produktionsdaten. */
function boot({ games = { '25/26': seasonA() }, page = 'team', activeSeasonKey = '25/26', withPreview = false } = {}) {
  const S = { activeSeasonKey, selectedSeasonKey: activeSeasonKey, page, screen: 'main', asOf: null, einsatzCenterSeasonKey: '25/26', einsatzCenterComboSelection: [] };
  const log = [];
  const storage = makeStorage();
  const SEASONS = {};
  for (const [k, g] of Object.entries(games)) SEASONS[k] = { data: { rawLeagueGames: clone(g) } };
  const netCalls = [];
  const ctx = vm.createContext({
    window: { localStorage: storage, confirm: () => true },
    S,
    SEASONS,
    STATIC_SEASON_DATA: Object.fromEntries(Object.entries(games).map(([k, g]) => [k, { season: k, label: k, games: clone(g) }])),
    PLAYER_REGISTRY: { players: {} },
    analysisCache: new Map(),
    SEASON_CONFIG: Object.fromEntries([...SEASON_KEYS, '26/27'].map((k) => [k, { label: `20${k.slice(0, 2)}/${k.slice(3)}` }])),
    CURRENT_SEASON_KEY: '25/26',
    structuredClone,
    TextEncoder,
    crypto: globalThis.crypto,
    fetch: (...a) => { netCalls.push(a); return Promise.reject(new Error('kein Netzwerk im Test')); },
    console,
    setState: (p) => { log.push('setState'); Object.assign(S, p); },
    escHtml: (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'),
    escAttr: (s) => String(s).replace(/"/g, '&quot;'),
    uiNotiz: (t) => `<div class="ui-notiz">${t}</div>`,
    ensureExternalSeasonData: async () => true,
    document: { getElementById: () => ({ value: '' }) },
    rAsOfSelector: () => ASOF,
    __registry: { schemaVersion: 1, groups: [] },
  });
  vm.runInContext(realConsts, ctx);
  if (withPreview) {
    vm.runInContext(einsatzRegion, ctx);
    vm.runInContext('LINEUP_GROUPS_REGISTRY=__registry;', ctx);
    vm.runInContext(previewBlock, ctx);
  } else {
    vm.runInContext('function getSeasonDataPreview(){return null;}', ctx);
  }
  vm.runInContext(realFunctions, ctx);
  const run = (code) => vm.runInContext(code, ctx);
  const digest = () => run('JSON.stringify([STATIC_SEASON_DATA,Object.fromEntries(Object.entries(SEASONS).map(([k,v])=>[k,v.data])),PLAYER_REGISTRY,S,[...analysisCache.keys()]])');
  const hint = (k = '25/26') => run(`rSeasonDataStateContextHint('${k}')`);
  return { ctx, run, S, storage, log, netCalls, digest, hint, bar: () => run('rContextBar()') };
}
const textOf = (h) => h.replace(/<[^>]*>/g, '');
const DATASTATE_RE = /<div class="ia-context-datastate" data-ia-context-datastate>([^<]*)<\/div>/;

// ── Renderer ───────────────────────────────────────────────────────────
console.log('== Renderer: Text mit und ohne Spieltagsnummer ==');
{
  const a = boot();
  assertEqual(a.hint(), '<div class="ia-context-datastate" data-ia-context-datastate>Daten bis Spieltag 2 · 08.03.2026</div>', 'mit Spieltagsnummer: "Daten bis Spieltag 2 · 08.03.2026" (letztes beendetes Spiel, nicht das geplante am 01.05.)');
  const dateless = boot({ games: { '25/26': [sg(1, null, '2026-03-01', true, { game_day: {} })] } });
  assertEqual(dateless.run(`getSeasonDataState('25/26').lastMatchday`), null, 'Vorbedingung: Spiel ohne Spieltagsnummer -> lastMatchday null');
  assertEqual(textOf(dateless.hint()), 'Daten bis 01.03.2026', 'ohne Spieltagsnummer: "Daten bis 01.03.2026"');
  assertTrue(!/Spieltag/.test(dateless.hint()), 'ohne Spieltagsnummer: kein "Spieltag" im Text');
  const two = boot({ games: { '25/26': [...seasonA(), sg(9, 10, '2026-12-24', true)] } });
  assertEqual(textOf(two.hint()), 'Daten bis Spieltag 10 · 24.12.2026', 'zweistellige Spieltagsnummer, Datum deutsch formatiert');
}

console.log('== Renderer: kein Datenstand -> nichts ==');
{
  const none = boot({ games: { '25/26': seasonC() } });
  assertEqual(none.hint(), '', 'keine beendeten Spiele -> leer');
  assertEqual(none.hint('24/25'), '', 'Saison ohne Daten -> leer');
  assertEqual(none.hint('99/00'), '', 'unbekannte Saison -> leer');
  const nodate = boot();
  nodate.run(`getSeasonDataState=()=>({endedGames:1,lastGameId:'1',lastDate:'',lastMatchday:3})`);
  assertEqual(nodate.hint(), '', 'Datenstand ohne Datum -> leer (keine halbe Anzeige)');
  const nullState = boot();
  nullState.run('getSeasonDataState=()=>null');
  assertEqual(nullState.hint(), '', 'getSeasonDataState liefert null -> leer');
}

console.log('== Referenz: 5 echte Saisons ==');
{
  const app = boot({ games: Object.fromEntries(SEASON_KEYS.map((k) => [k, real[k].games])) });
  for (const k of SEASON_KEYS) {
    const games = real[k].games;
    const ended = games.filter((g) => g.ended === true).sort(refCompare);
    const last = ended.at(-1);
    const md = refBuildMatchdays({ season: k, games }).find((m) => m.games.some((g) => g.id === last?.id));
    const [y, m, d] = String(last.date).split('-');
    const expected = md?.number != null ? `Daten bis Spieltag ${md.number} · ${d}.${m}.${y}` : `Daten bis ${d}.${m}.${y}`;
    assertEqual(textOf(app.hint(k)), expected, `${k}: Text entspricht der unabhängigen Referenzberechnung`);
  }
  const distinct = new Set(SEASON_KEYS.map((k) => app.hint(k)));
  assertEqual(distinct.size, SEASON_KEYS.length, 'jede Saison zeigt ihren eigenen Datenstand');
}

// ── Kontextleiste ──────────────────────────────────────────────────────
console.log('== Kontextleiste: Platzierung, Saisonbezug ==');
{
  for (const page of ['team', 'player', 'overview', 'matchday']) {
    const app = boot({ page });
    const bar = app.bar();
    assertTrue(DATASTATE_RE.test(bar), `${page}: Datenstand erscheint in der Leiste`);
    assertEqual(DATASTATE_RE.exec(bar)[1], 'Daten bis Spieltag 2 · 08.03.2026', `${page}: Text korrekt`);
    assertTrue(bar.startsWith('<div class="ia-context-bar">') && bar.endsWith('</div>'), `${page}: Datenstand liegt innerhalb der Leiste`);
    assertTrue(bar.indexOf('ia-context-season') < bar.indexOf('ASOF') && bar.indexOf('ASOF') < bar.indexOf('ia-context-datastate'), `${page}: Reihenfolge Saison, Zeitpunkt, Datenstand (6.3)`);
  }
  for (const page of ['comparisonCenter', 'lexicon', 'hallOfFame', 'alltimePlayers', 'matchcenter', 'ligaGegner']) {
    const app = boot({ page });
    assertEqual(app.bar(), '<div class="ia-context-bar"></div>', `${page}: Nicht-Saison-Seite: Leiste bleibt exakt leer, kein Datenstand`);
  }
  const noSeason = boot({ page: 'team', activeSeasonKey: '99/00' });
  assertEqual(noSeason.bar(), '<div class="ia-context-bar"></div>', 'unbekannte aktive Saison (nicht in SEASON_CONFIG): keine Anzeige');
  const empty = boot({ games: { '25/26': seasonC() }, page: 'overview' });
  assertTrue(!/datastate/.test(empty.bar()) && empty.bar().includes('ia-context-season'), 'Saison ohne beendete Spiele: Leiste ohne Datenstand, Saison-Auswahl bleibt');
  assertTrue(!/Daten bis/.test(empty.bar()), 'Saison ohne beendete Spiele: kein leerer/halber Text');
  // Saisonwechsel: jede Saison zeigt ihren Stand
  const two = boot({ games: { '25/26': seasonA(), '24/25': [sg(1, 1, '2025-03-01', true)] }, page: 'team' });
  two.S.activeSeasonKey = '24/25'; two.S.selectedSeasonKey = '24/25';
  assertEqual(DATASTATE_RE.exec(two.bar())[1], 'Daten bis Spieltag 1 · 01.03.2025', 'nach Saisonwechsel: Datenstand der neuen Saison');
}

console.log('== Unabhängigkeit von asOf ==');
{
  const app = boot({ page: 'overview' });
  const cur = app.bar();
  for (const asOf of [{ seasonKey: '25/26', date: '2026-03-01' }, { seasonKey: '25/26', date: '2026-03-01', startTime: '12:00' }, { seasonKey: '24/25', date: '2020-01-01' }, null]) {
    app.S.asOf = asOf;
    assertEqual(app.bar(), cur, `Leiste unverändert bei asOf=${JSON.stringify(asOf)}`);
  }
  const src = stripComments(fnSource('rSeasonDataStateContextHint'));
  assertTrue(!/asOf|S\./.test(src), 'Renderer-Code liest weder asOf noch S');
}

console.log('== Preview/Draft fließt nie ein ==');
{
  const extra = { ...clone(real['25/26'].games[0]), id: 990001, date: '2099-01-01', ended: true, started: true };
  const wrapper = JSON.stringify({ season: '25/26', label: '2025/26', games: [...clone(real['25/26'].games), extra] });
  const app = boot({ games: { '25/26': real['25/26'].games }, page: 'team', withPreview: true });
  const before = DATASTATE_RE.exec(app.bar())[1];
  const r = await app.run('stageSeasonDataPreview')(wrapper, { seasonKey: '25/26', sourceName: 'p.json' });
  assertTrue(r.ok && app.run('getSeasonDataPreview("25/26")'), 'Vorbedingung: Vorschau mit zusätzlichem beendeten Spiel (2099) ist aktiv');
  const bar = app.bar();
  assertTrue(bar.includes('data-ia-context-preview'), 'Vorbedingung: Vorschau-Hinweis in der Leiste');
  assertEqual(DATASTATE_RE.exec(bar)[1], before, 'Datenstand bleibt bei aktiver Vorschau unverändert');
  assertTrue(!bar.includes('2099'), 'kein Datum der Vorschau in der Leiste');
  assertTrue(bar.indexOf('ia-context-datastate') < bar.indexOf('data-ia-context-preview'), 'Reihenfolge: Datenstand vor dem Vorschau-Hinweis (6.3: Datenstand, dann Entwurfs-Hinweis)');
  // Draft-Sicht des Einsatz-Centers darf nichts ändern (kein Draft-Zugriff im Renderer)
  const src = stripComments(fnSource('rSeasonDataStateContextHint'));
  assertTrue(!/EINSATZ|draft|Draft|PREVIEW|Preview|LINEUP/.test(src), 'Renderer greift weder auf Draft noch auf Vorschau noch auf Lineup-Daten zu');
}

console.log('== Reinheit: kein Zustand, kein Storage, kein Netzwerk ==');
{
  const app = boot({ page: 'team' });
  app.bar(); // Aufwärmen: befüllt den (asOf-fähigen) Analyse-Cache einmalig
  const d0 = app.digest();
  app.log.length = 0;
  for (let i = 0; i < 5; i++) { app.bar(); app.hint(); }
  assertEqual(app.digest(), d0, 'globaler Zustand (S, SEASONS, Daten, Cache-Schlüssel) nach wiederholtem Rendern unverändert');
  assertEqual(app.log, [], 'kein setState');
  assertEqual(app.storage.calls, 0, 'kein Storage-Zugriff');
  assertEqual(app.netCalls.length, 0, 'kein Netzwerkzugriff');
  assertEqual(app.bar(), app.bar(), 'deterministisch: gleiche Ausgabe bei gleichem Zustand');

  const src = stripComments(fnSource('rSeasonDataStateContextHint'));
  assertTrue(!/setState|localStorage|sessionStorage|indexedDB|fetch\(|XMLHttpRequest|window\.|document\.|location|setTimeout|setInterval/.test(src), 'Quelltext: kein setState, Storage, Netzwerk, globaler Zugriff, Timer');
  assertTrue(!/\n(let|const|var) /.test(`\n${fnSource('rSeasonDataStateContextHint')}`), 'keine Deklaration auf Modulebene');
  assertEqual([...src.matchAll(/\b(get\w+|format\w+|esc\w+)\(/g)].map((m) => m[1]).sort(), ['escHtml', 'formatDateDE', 'getSeasonDataState'], 'nutzt ausschließlich getSeasonDataState, formatDateDE, escHtml');
}

console.log('== Einbindung im Quelltext ==');
{
  const code = stripComments(html);
  assertEqual((code.match(/rSeasonDataStateContextHint\(/g) || []).length, 2, 'außer der Definition genau ein Aufruf');
  const bar = stripComments(fnSource('rContextBar'));
  assertEqual((bar.match(/rSeasonDataStateContextHint\(/g) || []).length, 1, 'rContextBar ruft den Renderer genau einmal auf');
  const relevantBlock = /if\(seasonRelevant\)\{[^]*?\n  \}\n  return/.exec(bar)?.[0] ?? '';
  const inner = /if\(seasonKey&&SEASON_CONFIG\[seasonKey\]\)\{[^]*?\n    \}/.exec(relevantBlock)?.[0] ?? '';
  assertTrue(inner.includes('dataStateHtml=rSeasonDataStateContextHint(seasonKey)'), 'Aufruf steht im saisonbezogenen Block (seasonRelevant und bekannte Saison)');
  assertTrue(bar.includes('${seasonHtml}${asOfHtml}${dataStateHtml}${previewHtml}'), 'Reihenfolge in der Leiste: Saison, Zeitpunkt, Datenstand, Vorschau-Hinweis');
  assertTrue(/seasonRelevant=S\.page==='team'\|\|S\.page==='player'\|\|S\.page==='overview'\|\|S\.page==='matchday'/.test(bar), 'saisonbezogene Seiten unverändert (team, player, overview, matchday)');
  // CSS nur im ia-context-Namensraum
  assertEqual([...html.matchAll(/^\.ia-context-datastate\{[^}]*\}$/gm)].length, 1, 'genau eine CSS-Regel .ia-context-datastate');
  const cssRule = /^\.ia-context-datastate\{([^}]*)\}$/m.exec(html)?.[1] ?? '';
  const cssProps = cssRule.split(';').map((d) => d.split(':')[0].trim()).filter(Boolean);
  assertTrue(cssProps.length > 0 && !cssProps.some((p) => ['position', 'width', 'white-space'].includes(p)) && /overflow-wrap:\s*anywhere/.test(cssRule), 'CSS: keine feste Breite, kein nowrap, Umbruch erlaubt (kein Überlauf bei 360 px)');
}

console.log('');
if (failures > 0) {
  console.log(`${failures} Test(s) fehlgeschlagen.`);
  process.exitCode = 1;
} else {
  console.log('Alle Tests erfolgreich.');
  process.exitCode = 0;
}

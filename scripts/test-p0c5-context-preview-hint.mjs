#!/usr/bin/env node
// P0c.5 — Test für den Vorschau-Hinweis der Kontextleiste.
//
// Wie test-p0c4-season-preview.mjs: der echte P0c.4-Block und der
// Einsatz-Center-Bereich sowie die echten Funktionen rContextBar,
// rSeasonDataPreviewContextHint und getActiveSeasonKey werden unverändert aus
// dem index.html-Text geschnitten und in node:vm ausgeführt. Der Vorschau-Zustand
// wird NICHT gesetzt, sondern über das echte stageSeasonDataPreview()/
// discardSeasonDataPreview() erzeugt — der Test prüft also den Zusammenhang von
// echtem P0c.4-State und Kontextleiste, nicht nur den Renderer isoliert.
// Liest index.html und season-data/*.json nur lesend, schreibt nichts.
//
// Aufruf: node scripts/test-p0c5-context-preview-hint.mjs

import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
import vm from 'node:vm';

const REPO_ROOT = path.resolve(import.meta.dirname, '..');
const SEASON_KEYS = ['21/22', '22/23', '23/24', '24/25', '25/26'];
const labelOf = (k) => `20${k.slice(0, 2)}/${k.slice(3)}`;
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
const sha = (s) => createHash('sha256').update(s).digest('hex');

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
const previewBlock = between('// ═══ Season-Daten-Vorschau (P0c.4', '// ═══ Ende Season-Daten-Vorschau (P0c.4)');
const einsatzRegion = between('const LINEUP_DATA={};', 'window.einsatzCenterSoftIssues=einsatzCenterSoftIssues;');
const realFunctions = ['isGameAtOrBeforeAsOf', 'deriveAsOfForSeason', 'getStaticSeasonGames', 'getActiveSeasonKey', 'rSeasonDataPreviewContextHint', 'rContextBar'].map(fnSource).join('\n');
const hintSource = fnSource('rSeasonDataPreviewContextHint');
const barSource = fnSource('rContextBar');

const real = {};
for (const k of ['24/25', '25/26']) real[k] = JSON.parse(await readFile(path.join(REPO_ROOT, 'season-data', `${k.replace('/', '-')}.json`), 'utf8'));
const realRegistry = JSON.parse(await readFile(path.join(REPO_ROOT, 'lineup-data', 'groups.json'), 'utf8'));

function makeStorage() {
  const s = { m: new Map(), calls: 0, getItem() { s.calls++; return null; }, setItem() { s.calls++; }, removeItem() { s.calls++; } };
  return s;
}

/** Frischer vm-Kontext ("App-Start") mit echtem P0c.4-State und echter Kontextleiste. */
function boot({ page = 'team', activeSeasonKey = '25/26', seasonLabels = {}, externalOk = true } = {}) {
  const STATIC = Object.fromEntries(['24/25', '25/26'].map((k) => [k, clone(real[k])]));
  const storage = makeStorage();
  const patches = [];
  const S = { page, activeSeasonKey, selectedSeasonKey: activeSeasonKey, asOf: null, einsatzCenterSeasonKey: '25/26', einsatzCenterComboSelection: [] };
  const seasonConfig = Object.fromEntries([...SEASON_KEYS, '26/27'].map((k) => [k, { label: seasonLabels[k] ?? labelOf(k) }]));
  const ctx = vm.createContext({
    window: { localStorage: storage, confirm: () => true },
    S,
    STATIC_SEASON_DATA: STATIC,
    SEASONS: { '25/26': { data: { rawGames: [{ id: 1 }] } } },
    PLAYER_REGISTRY: { players: {} },
    analysisCache: new Map([['x', 1]]),
    SEASON_CONFIG: seasonConfig,
    CURRENT_SEASON_KEY: '25/26',
    structuredClone,
    TextEncoder,
    crypto: globalThis.crypto,
    fetch: () => Promise.reject(new Error('kein Netzwerk im Test')),
    console,
    setState: (p) => { patches.push(p); },
    alert: () => {},
    document: { getElementById: () => ({ value: '' }) },
    escHtml: (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'),
    escAttr: (s) => String(s).replace(/"/g, '&quot;').replace(/'/g, '&#39;'),
    uiNotiz: (t) => `<div class="ui-notiz">${t}</div>`,
    // Bestehende Zeitpunkt-Auswahl bleibt unverändert; hier nur ein Platzhalter mit fester Position in der Leiste
    rAsOfSelector: () => '<label class="ia-context-asof">ASOF</label>',
    // P0b-Fix 3: Datenstand-Renderer ist nicht Gegenstand von P0c.5 (eigener Test: test-p0b-context-data-state); hier leer, damit die Leiste byte-identisch zu vorher bleibt
    rSeasonDataStateContextHint: () => '',
    ensureExternalSeasonData: async () => externalOk,
    __registry: clone(realRegistry),
  });
  vm.runInContext(realFunctions, ctx);
  vm.runInContext(einsatzRegion, ctx);
  vm.runInContext('LINEUP_GROUPS_REGISTRY=__registry;', ctx);
  vm.runInContext(previewBlock, ctx);
  const run = (code) => vm.runInContext(code, ctx);
  const digest = () => sha(run('JSON.stringify([STATIC_SEASON_DATA,SEASONS,PLAYER_REGISTRY,LINEUP_DATA,LINEUP_GROUPS_REGISTRY,S,[...analysisCache.entries()]])'));
  const bar = () => run('rContextBar()');
  const setPage = (p, key = S.activeSeasonKey) => { S.page = p; S.activeSeasonKey = key; S.selectedSeasonKey = key; };
  const stage = (wrapper, seasonKey = '25/26') => run('stageSeasonDataPreview')(JSON.stringify(wrapper), { seasonKey, sourceName: 'test.json' });
  return { ctx, run, S, storage, patches, digest, bar, setPage, stage, STATIC };
}

const wrapperOf = (key, mutate) => { const w = clone(real[key]); mutate?.(w); return w; };
const withExtraGame = (key) => wrapperOf(key, (w) => { const g = clone(w.games[0]); g.id = 990001; g.date = '2099-01-01'; g.game_number = '990001'; w.games.push(g); });
const firstImportWrapper = () => wrapperOf('25/26', (w) => { w.season = '26/27'; w.label = '2026/27'; w.games = w.games.slice(0, 3); });
const HINT = 'data-ia-context-preview';
const NORMAL_TEXT = 'VORSCHAU AKTIV · Saison 2025/26 · noch nicht importiert. Tabellen und Statistiken zeigen weiterhin die Produktionsdaten.';
const FIRST_TEXT = 'ERSTIMPORT-VORSCHAU · Saison 2026/27 · keine Produktionsdaten vorhanden · noch nicht importiert. Tabellen und Statistiken zeigen weiterhin die Produktionsdaten.';
const SEASON_PAGES = ['team', 'player', 'overview', 'matchday'];
const NON_SEASON_PAGES = ['seasonLanding', 'matchcenter', 'lineupBuilder', 'einsatzCenter', 'comparisonCenter', 'hallOfFame', 'alltimePlayers', 'lexicon', 'ligaGegner'];
const hintOf = (bar) => /<div class="wrn-box" data-ia-context-preview[^>]*>[^]*?<\/div>/.exec(bar)?.[0] ?? null;
const textOf = (hint) => hint?.replace(/<[^>]+>/g, '') ?? null;

// ═════════════════════════════════════════════════════════════════════════
console.log('== Keine Preview -> kein Hinweis ==');
{
  for (const page of SEASON_PAGES) {
    const app = boot({ page });
    assertTrue(!app.bar().includes(HINT), `${page}: ohne Vorschau kein Hinweis`);
    assertEqual(app.run('getSeasonDataPreview("25/26")'), null, `${page}: Accessor liefert null`);
  }
  const app = boot();
  assertTrue(app.bar().startsWith('<div class="ia-context-bar">') && app.bar().includes('ia-context-season') && app.bar().includes('ASOF'), 'Leiste ohne Vorschau enthält weiterhin Saison- und Zeitpunkt-Auswahl');
}

console.log('');
console.log('== Preview der aktuellen Saison (normale Saison mit Produktionsdaten) -> Standard-Hinweis ==');
{
  for (const page of SEASON_PAGES) {
    const app = boot({ page });
    const before = app.bar();
    const r = await app.stage(withExtraGame('25/26'));
    assertTrue(r.ok, `${page}: echte Vorschau gestaged (stageSeasonDataPreview)`);
    const bar = app.bar();
    const hint = hintOf(bar);
    assertTrue(hint, `${page}: Hinweis erscheint`);
    assertEqual(textOf(hint), NORMAL_TEXT, `${page}: Text exakt wie freigegeben`);
    assertEqual((bar.match(new RegExp(HINT, 'g')) || []).length, 1, `${page}: genau ein Hinweis in der Leiste`);
    assertTrue(bar.indexOf('ia-context-season') < bar.indexOf('ASOF') && bar.indexOf('ASOF') < bar.indexOf(HINT), `${page}: Reihenfolge Saison, Zeitpunkt, Hinweis`);
    assertTrue(bar.replace(hint, '') === before, `${page}: ohne den Hinweis ist die Leiste byte-identisch zu vorher`);
  }
  const app = boot();
  await app.stage(withExtraGame('25/26'));
  const hint = hintOf(app.bar());
  assertTrue(hint.includes('class="wrn-box"'), 'bestehende Warnkomponente (wrn-box) wiederverwendet');
  assertTrue(!/<a\s|href=|onclick=|<button|<input|<select|<textarea/.test(hint), 'kein Link, keine Navigation, keine Bedienelemente im Hinweis');
  assertTrue(!hint.includes('Erstimport') && !hint.includes('ERSTIMPORT'), 'normale Saison zeigt nicht die Erstimport-Variante');
}

console.log('');
console.log('== Preview einer anderen Saison -> kein Hinweis ==');
{
  const app = boot({ page: 'team', activeSeasonKey: '25/26' });
  await app.stage(withExtraGame('24/25'), '24/25');
  assertEqual(app.run('SEASON_DATA_PREVIEW.seasonKey'), '24/25', 'Vorbedingung: Vorschau gehört zu 24/25');
  assertTrue(!app.bar().includes(HINT), 'aktive Saison 25/26: kein falscher Hinweis');
  app.setPage('team', '24/25');
  assertEqual(textOf(hintOf(app.bar())), NORMAL_TEXT.replace('2025/26', '2024/25'), 'aktive Saison 24/25: Hinweis mit Saison 2024/25');
}

console.log('');
console.log('== Saisonwechsel weg/vor ==');
{
  const app = boot({ page: 'matchday', activeSeasonKey: '25/26' });
  await app.stage(withExtraGame('25/26'));
  const states = [];
  for (const key of ['25/26', '24/25', '25/26', '21/22', '25/26']) {
    app.setPage('matchday', key);
    states.push([key, app.bar().includes(HINT)]);
  }
  assertEqual(states, [['25/26', true], ['24/25', false], ['25/26', true], ['21/22', false], ['25/26', true]], 'Hinweis folgt der aktiven Saison: erscheint nur bei 25/26');
  app.setPage('overview', '25/26');
  assertTrue(app.bar().includes(HINT), 'Seitenwechsel innerhalb der Saison-Seiten behält den Hinweis');
  app.setPage('team', '99/99');
  assertTrue(!app.bar().includes(HINT), 'unbekannte aktive Saison (nicht in SEASON_CONFIG): kein Hinweis');
}

console.log('');
console.log('== Verwerfen ==');
{
  const app = boot();
  const before = app.bar();
  await app.stage(withExtraGame('25/26'));
  assertTrue(app.bar().includes(HINT), 'Vorbedingung: Hinweis sichtbar');
  app.run('discardSeasonDataPreview()');
  assertTrue(!app.bar().includes(HINT), 'nach dem Verwerfen kein Hinweis');
  assertEqual(app.bar(), before, 'Leiste nach dem Verwerfen byte-identisch zu vorher');
}

console.log('');
console.log('== Reload ==');
{
  const app = boot();
  await app.stage(withExtraGame('25/26'));
  assertTrue(app.bar().includes(HINT), 'Vorbedingung: Hinweis sichtbar');
  const reloaded = boot();
  assertTrue(!reloaded.bar().includes(HINT) && reloaded.run('SEASON_DATA_PREVIEW') === null, 'nach "Reload" (neuer App-Start) kein Hinweis');
  assertEqual(app.storage.calls, 0, 'nichts persistiert, das ein Reload wiederherstellen könnte');
}

console.log('');
console.log('== 26/27-Erstimport -> Erstimport-Text ==');
{
  const app = boot({ page: 'matchday', activeSeasonKey: '26/27', externalOk: false });
  const r = await app.stage(firstImportWrapper(), '26/27');
  assertTrue(r.ok && app.run('SEASON_DATA_PREVIEW.firstImport') === true, 'Vorbedingung: echter Erstimport gestaged');
  const hint = hintOf(app.bar());
  assertEqual(textOf(hint), FIRST_TEXT, 'Erstimport-Text exakt wie freigegeben');
  assertTrue(hint.includes('class="wrn-box"'), 'Erstimport: ebenfalls die bestehende Warnkomponente');
  app.setPage('matchday', '25/26');
  assertTrue(!app.bar().includes(HINT), 'Erstimport-Vorschau 26/27 erscheint nicht bei aktiver Saison 25/26');
}

console.log('');
console.log('== Stale Preview -> keine Sonderdarstellung ==');
{
  const app = boot();
  await app.stage(withExtraGame('25/26'));
  const before = app.bar();
  app.run(`STATIC_SEASON_DATA['25/26']=JSON.parse(JSON.stringify(STATIC_SEASON_DATA['25/26']))`);
  assertTrue(app.run(`isSeasonDataPreviewStale(SEASON_DATA_PREVIEW)`), 'Vorbedingung: Vorschau ist jetzt veraltet (P0c.4-Logik)');
  assertEqual(app.bar(), before, 'Leiste unverändert: keine Stale-Sonderdarstellung');
  assertTrue(!/stale|veraltet/i.test(app.bar()), 'Leiste erwähnt "veraltet" nicht');
  const fi = boot({ activeSeasonKey: '26/27', externalOk: false });
  await fi.stage(firstImportWrapper(), '26/27');
  const beforeFi = fi.bar();
  fi.run(`STATIC_SEASON_DATA['26/27']={season:'26/27',label:'2026/27',games:[JSON.parse(JSON.stringify(STATIC_SEASON_DATA['25/26'].games[0]))]}`);
  assertTrue(fi.run(`isSeasonDataPreviewStale(SEASON_DATA_PREVIEW)`) && fi.bar() === beforeFi, 'Erstimport mit nachträglichen Produktionsdaten: Leiste ebenfalls unverändert');
}

console.log('');
console.log('== Injection im Saison-Label ==');
{
  const evil = '<img src=x onerror=alert(1)>"&\'';
  const app = boot({ seasonLabels: { '25/26': evil } });
  await app.stage(withExtraGame('25/26'));
  const hint = hintOf(app.bar());
  assertTrue(hint && !hint.includes('<img') && hint.includes('&lt;img src=x onerror=alert(1)&gt;&quot;&amp;'), 'Label im Hinweis ist escaped (kein <img>-Tag, Entities vorhanden)');
  assertEqual((hint.match(/<[a-z][^>]*>/gi) || []).length, 1, 'im Hinweis existiert nur das eine umschließende Element');
}

console.log('');
console.log('== Nicht-Saison-Seiten -> kein Hinweis ==');
{
  const app = boot();
  await app.stage(withExtraGame('25/26'));
  for (const page of NON_SEASON_PAGES) {
    app.setPage(page, '25/26');
    assertTrue(!app.bar().includes(HINT), `${page}: kein Preview-Hinweis`);
  }
  assertEqual(app.bar(), '<div class="ia-context-bar"></div>', 'Nicht-Saison-Seite: Leiste bleibt exakt leer wie bisher');
  for (const page of SEASON_PAGES) {
    app.setPage(page, '25/26');
    assertTrue(app.bar().includes(HINT), `${page}: Kontrolle, Hinweis wieder da`);
  }
}

console.log('');
console.log('== Produktionsdaten und State unverändert, kein Storage, kein neuer State ==');
{
  const app = boot({ page: 'matchday' });
  const d0 = app.digest();
  await app.stage(withExtraGame('25/26'));
  const d1 = app.digest();
  for (const page of [...SEASON_PAGES, ...NON_SEASON_PAGES]) { app.setPage(page, '25/26'); app.bar(); }
  app.setPage('matchday', '25/26');
  app.run('discardSeasonDataPreview()');
  app.setPage('matchday', '25/26');
  const before = app.digest();
  assertEqual(d1, d0, 'Staging verändert STATIC_SEASON_DATA, SEASONS, PLAYER_REGISTRY, LINEUP_DATA, S, analysisCache nicht');
  assertEqual(before, d0, 'auch nach Rendern aller Seiten und Verwerfen ist alles unverändert');
  assertEqual(app.storage.calls, 0, 'kein Storage-Zugriff (weder durch den Hinweis noch durch Staging)');
  assertTrue(app.patches.every((p) => Object.keys(p).length === 0), 'setState nur als reiner Re-Render ({}) — der Hinweis setzt nichts');
  const renderOnly = boot();
  await renderOnly.stage(withExtraGame('25/26'));
  const sBefore = renderOnly.run('JSON.stringify(S)');
  const patchesBefore = renderOnly.patches.length;
  for (let i = 0; i < 5; i++) renderOnly.bar();
  assertEqual([renderOnly.run('JSON.stringify(S)'), renderOnly.patches.length], [sBefore, patchesBefore], 'Rendern der Leiste mit Hinweis mutiert S nicht und ruft setState nicht auf');
}

console.log('');
console.log('== Statisch: Zugriff nur über den Accessor, kein neuer State, ein Aufruf ==');
{
  const stripComments = (s) => s.split('\n').filter((l) => !l.trim().startsWith('//') && !l.trim().startsWith('*') && !l.trim().startsWith('/*')).join('\n');
  const hintCode = stripComments(hintSource);
  assertTrue(hintCode.includes('getSeasonDataPreview(seasonKey)'), 'Renderer liest über getSeasonDataPreview(seasonKey)');
  assertTrue(!/SEASON_DATA_PREVIEW/.test(hintCode), 'kein direkter Zugriff auf SEASON_DATA_PREVIEW / _LAST_ERROR / _UI');
  assertTrue(!/setState|localStorage|sessionStorage|indexedDB|fetch\(|window\.|document\./.test(hintCode), 'Renderer: kein setState, kein Storage, kein Netzwerk, kein globaler Zugriff');
  assertTrue(!/\n(let|const|var) /.test(`\n${hintSource}`), 'Renderer: keine Deklaration auf Modulebene (Spalte 0)');
  assertTrue(!/#\/|href|hash|page:/.test(hintCode), 'Renderer: keine Route, kein Link, keine Navigation');
  // Alles zwischen dem Ende von setContextAsOf und rContextBar (inkl. Doc-Kommentare): nur die beiden Renderer-Funktionen (P0c.5-Vorschau-Hinweis, P0b-Fix 3-Datenstand)
  const afterAsOf = html.indexOf('\n};', html.indexOf('window.setContextAsOf=function')) + 3;
  const between2 = html.slice(afterAsOf, html.indexOf('function rContextBar('));
  const topLevel = stripComments(between2).split('\n').filter((l) => /^\S/.test(l) && !/^\s*\*/.test(l));
  assertEqual(topLevel.filter((l) => /^(let|const|var) |^window\./.test(l)), [], 'zwischen setContextAsOf und rContextBar: keine Modulvariable, kein window-Export');
  assertEqual(topLevel.filter((l) => /^function /.test(l)), ['function rSeasonDataPreviewContextHint(seasonKey){', 'function rSeasonDataStateContextHint(seasonKey){'], 'zwischen setContextAsOf und rContextBar gibt es genau zwei Funktionen: den P0c.5-Renderer und den Datenstand-Renderer (P0b-Fix 3)');
  const previewGlobals = [...html.matchAll(/^(?:let|const|var) (\w*(?:PREVIEW|[Pp]review)\w*)/gm)].map((m) => m[1]).sort();
  assertEqual(previewGlobals, ['SEASON_DATA_PREVIEW', 'SEASON_DATA_PREVIEW_LAST_ERROR', 'SEASON_DATA_PREVIEW_UI', '_seasonDataPreviewBusy'].sort(), 'die Preview-bezogenen globalen Variablen sind exakt die vier aus P0c.4 (kein neuer globaler State)');
  const barCode = stripComments(barSource);
  assertEqual((barCode.match(/rSeasonDataPreviewContextHint\(/g) || []).length, 1, 'rContextBar ruft den Renderer genau einmal auf');
  assertEqual((stripComments(html).match(/rSeasonDataPreviewContextHint\(/g) || []).length, 2, 'außer Definition und dem einen Aufruf in rContextBar gibt es keine Verwendung');
  const relevantBlock = /if\(seasonRelevant\)\{[^]*?\n  \}\n  return/.exec(barCode)?.[0] ?? '';
  const inner = /if\(seasonKey&&SEASON_CONFIG\[seasonKey\]\)\{[^]*?\n    \}/.exec(relevantBlock)?.[0] ?? '';
  assertTrue(inner.includes('previewHtml=rSeasonDataPreviewContextHint(seasonKey)'), 'Aufruf steht innerhalb des saisonbezogenen Blocks (seasonRelevant und bekannte Saison)');
  assertTrue(barCode.includes('${seasonHtml}${asOfHtml}${dataStateHtml}${previewHtml}'), 'previewHtml wird in die Leiste eingesetzt');
  assertTrue(!/localStorage|sessionStorage|indexedDB/.test(hintSource), 'kein Storage-Wort im Renderer (P0c.3-Guard)');
  const storageLines = html.split('\n').filter((l) => /(local|session)Storage|indexedDB/.test(l) && !l.trim().startsWith('//'));
  assertEqual(storageLines.length, 3, 'in index.html weiterhin nur die 3 Storage-Zeilen aus P0c.3');
  assertEqual(previewBlock, between('// ═══ Season-Daten-Vorschau (P0c.4', '// ═══ Ende Season-Daten-Vorschau (P0c.4)'), 'Kontrolle: P0c.4-Block eindeutig gefunden');
  assertTrue(!/rSeasonDataPreviewContextHint|ia-context/.test(previewBlock), 'der P0c.4-Block enthält keinen P0c.5-Code');
}

console.log('');
if (failures > 0) {
  console.log(`${failures} Test(s) fehlgeschlagen.`);
  process.exitCode = 1;
} else {
  console.log('Alle Tests erfolgreich.');
  process.exitCode = 0;
}

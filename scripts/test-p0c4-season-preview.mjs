#!/usr/bin/env node
// P0c.4 — Test für die Season-Daten-Vorschau (Spezifikation 3.6.5, dritter Punkt).
//
// Wie test-p0c2/p0c3: der Vorschau-Block ("Season-Daten-Vorschau (P0c.4)") und
// der Einsatz-Center-Bereich werden unverändert aus dem echten index.html-Text
// geschnitten und in node:vm mit minimalen Stubs ausgeführt. Zusätzlich:
//   - Quelltext-Parität: die portierten Funktionen sind wortgleich zu den
//     Node-Modulen (scripts/season-data-validators.mjs, import-season-data.mjs,
//     update-season-data.mjs).
//   - Verhaltens-Parität: Differentialtest Port gegen die echten Module.
// Liest index.html, season-data/*.json und lineup-data/groups.json nur lesend,
// schreibt nichts.
//
// Aufruf: node scripts/test-p0c4-season-preview.mjs

import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
import vm from 'node:vm';

import { buildDryRunReport as refBuildDryRunReport, validateSeasonKey as refValidateSeasonKey, validateWrapperFormat as refValidateWrapperFormat } from './import-season-data.mjs';
import * as refValidators from './season-data-validators.mjs';
import { validateMergedSeason as refValidateMergedSeason } from './update-season-data.mjs';
import { canonicalJson as refCanonicalJson, sha256Hex as refSha256Hex } from './lineup-data-hash.mjs';

const REPO_ROOT = path.resolve(import.meta.dirname, '..');
const SEASON_KEYS = ['21/22', '22/23', '23/24', '24/25', '25/26'];
const fileFor = (k) => `${k.replace('/', '-')}.json`;
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
const previewBlock = between('// ═══ Season-Daten-Vorschau (P0c.4', '// ═══ Ende Season-Daten-Vorschau (P0c.4)');
const einsatzRegion = between('const LINEUP_DATA={};', 'window.einsatzCenterSoftIssues=einsatzCenterSoftIssues;');
function mainFn(name) {
  const m = new RegExp(`(^|\\n)function ${name}\\(`).exec(html);
  if (!m) throw new Error(`Funktion nicht gefunden: ${name}`);
  const from = m.index + m[1].length;
  return html.slice(from, html.indexOf('\n}', from) + 2);
}
const mainFunctions = ['isGameAtOrBeforeAsOf', 'deriveAsOfForSeason', 'getStaticSeasonGames'].map(mainFn).join('\n');

const real = {};
for (const k of SEASON_KEYS) real[k] = JSON.parse(await readFile(path.join(REPO_ROOT, 'season-data', fileFor(k)), 'utf8'));
const realRegistry = JSON.parse(await readFile(path.join(REPO_ROOT, 'lineup-data', 'groups.json'), 'utf8'));

function makeStorage() {
  const m = new Map();
  const s = {
    m, getCalls: 0, setCalls: 0, removeCalls: 0,
    getItem(k) { s.getCalls++; return m.has(k) ? m.get(k) : null; },
    setItem(k, v) { s.setCalls++; m.set(k, String(v)); },
    removeItem(k) { s.removeCalls++; m.delete(k); },
  };
  return s;
}

/** Frischer vm-Kontext ("App-Start"). production: seasonKey -> Wrapper (STATIC_SEASON_DATA). */
function boot({ seasons = ['25/26'], production, externalOk = true, confirmAnswer = true, storage = makeStorage(), onEnsureExternal } = {}) {
  const STATIC = production ?? Object.fromEntries(seasons.map((k) => [k, clone(real[k])]));
  const patches = [];
  const calls = { ensure: [], fetch: 0, confirm: [] };
  const win = { localStorage: storage, confirm: (msg) => { calls.confirm.push(msg); return confirmAnswer; } };
  const pasteEl = { value: '' };
  const S = { einsatzCenterSeasonKey: '25/26', einsatzCenterComboSelection: [], asOf: null };
  const ctx = vm.createContext({
    window: win,
    S,
    STATIC_SEASON_DATA: STATIC,
    SEASONS: { '25/26': { data: { rawGames: [{ id: 1 }] } } },
    PLAYER_REGISTRY: { players: {} },
    analysisCache: new Map([['x', 1]]),
    SEASON_CONFIG: Object.fromEntries([...SEASON_KEYS, '26/27'].map((k) => [k, { label: k }])),
    CURRENT_SEASON_KEY: '25/26',
    structuredClone,
    TextEncoder,
    crypto: globalThis.crypto,
    fetch: () => { calls.fetch++; return Promise.reject(new Error('kein Netzwerk im Test')); },
    console,
    setState: (p) => { patches.push(p); },
    alert: () => {},
    document: { getElementById: (id) => (id === 'sd-preview-paste' ? pasteEl : { value: '' }) },
    escHtml: (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'),
    escAttr: (s) => String(s).replace(/"/g, '&quot;').replace(/'/g, '&#39;'),
    uiNotiz: (t) => `<div class="ui-notiz">${t}</div>`,
    detectUlmSide: () => 'home',
    ensureExternalSeasonData: async (key) => { calls.ensure.push(key); await onEnsureExternal?.(STATIC, key); return externalOk; },
    __registry: clone(realRegistry),
  });
  vm.runInContext(mainFunctions, ctx);
  vm.runInContext(einsatzRegion, ctx);
  vm.runInContext('LINEUP_GROUPS_REGISTRY=__registry;', ctx);
  vm.runInContext(previewBlock, ctx);
  const run = (code) => vm.runInContext(code, ctx);
  const productionDigest = () => sha(run('JSON.stringify([STATIC_SEASON_DATA,SEASONS,PLAYER_REGISTRY,LINEUP_DATA,LINEUP_GROUPS_REGISTRY,S,[...analysisCache.entries()],SEASON_CONFIG])'));
  return { ctx, run, S, STATIC, storage, patches, calls, pasteEl, productionDigest, win };
}

// Testdaten-Bausteine (aus echten Spielen abgeleitet, damit sie strukturell gültig sind)
function wrapperOf(key, mutate) {
  const w = clone(real[key]);
  mutate?.(w);
  return w;
}
function extraGame(key, id, date) {
  const g = clone(real[key].games[0]);
  g.id = id;
  g.date = date;
  g.game_number = String(id);
  return g;
}
const stage = (app, w, opts = {}) => app.run('stageSeasonDataPreview')(typeof w === 'string' ? w : JSON.stringify(w), { seasonKey: '25/26', sourceName: 'test.json', ...opts });

// ═════════════════════════════════════════════════════════════════════════
console.log('== Parität 1: portierte Funktionen sind wortgleich zu den Node-Modulen ==');
{
  const norm = (s) => s.replace(/\r/g, '').trim();
  const srcOf = async (file) => (await readFile(path.join(REPO_ROOT, file), 'utf8')).replace(/\r\n/g, '\n');
  const sources = {
    'scripts/season-data-validators.mjs': await srcOf('scripts/season-data-validators.mjs'),
    'scripts/import-season-data.mjs': await srcOf('scripts/import-season-data.mjs'),
    'scripts/update-season-data.mjs': await srcOf('scripts/update-season-data.mjs'),
  };
  const fnFromSource = (src, name, exported) => {
    const start = src.indexOf(`${exported ? 'export ' : ''}function ${name}(`);
    return start === -1 ? null : src.slice(start, src.indexOf('\n}\n', start) + 2).replace(/^export /, '');
  };
  const constFromSource = (src, name) => new RegExp(`^const ${name} = [\\s\\S]*?;\\n`, 'm').exec(src)?.[0].trimEnd() ?? null;
  const ported = [
    ['getGameId', 'scripts/season-data-validators.mjs'], ['findDuplicateGameIds', 'scripts/season-data-validators.mjs'],
    ['validateGameStructure', 'scripts/season-data-validators.mjs'], ['validateSeasonGames', 'scripts/season-data-validators.mjs'],
    ['diffGameIds', 'scripts/season-data-validators.mjs'], ['validateSeasonKey', 'scripts/import-season-data.mjs'],
    ['validateWrapperFormat', 'scripts/import-season-data.mjs'], ['buildDryRunReport', 'scripts/import-season-data.mjs'],
    ['validateMergedSeason', 'scripts/update-season-data.mjs'],
  ];
  for (const [name, file] of ported) {
    const ref = fnFromSource(sources[file], name, true);
    const inHtml = fnFromSource(previewBlock, name, false);
    assertTrue(ref && inHtml && norm(ref) === norm(inHtml), `${name}: Funktionstext identisch zu ${file}`);
    assertEqual((html.match(new RegExp(`(^|\\n)function ${name}\\(`, 'g')) || []).length, 1, `${name}: genau eine Definition in index.html`);
  }
  for (const c of ['PRIMITIVE_REQUIRED_FIELDS', 'OBJECT_REQUIRED_FIELDS', 'ARRAY_REQUIRED_FIELDS', 'NULLABLE_PRESENT_FIELDS']) {
    const ref = constFromSource(sources['scripts/season-data-validators.mjs'], c);
    assertTrue(ref && previewBlock.includes(ref), `${c}: Konstante identisch zur Quelle`);
  }
}

console.log('');
console.log('== Parität 2: Ergebnis-Parität Port gegen die echten Module (Differentialtest) ==');
{
  const app = boot({ seasons: SEASON_KEYS });
  const call = (name, ...args) => app.run(`(${name})`)(...args);
  const same = (label, refValue, portValue) => assertEqual(JSON.stringify(portValue), JSON.stringify(refValue), label);
  let cases = 0;
  const reportCases = [];
  for (const k of SEASON_KEYS) {
    const existing = real[k];
    reportCases.push([`${k}: identische Kopie`, k, clone(existing), existing]);
    reportCases.push([`${k}: neues Spiel`, k, wrapperOf(k, (w) => w.games.push(extraGame(k, 990001, '2099-01-01'))), existing]);
    reportCases.push([`${k}: Spiel entfernt`, k, wrapperOf(k, (w) => w.games.pop()), existing]);
    reportCases.push([`${k}: Duplikat`, k, wrapperOf(k, (w) => w.games.push(clone(w.games[0]))), existing]);
    reportCases.push([`${k}: Pflichtfeld fehlt + falscher Typ`, k, wrapperOf(k, (w) => { delete w.games[0].date; w.games[1].league_id = 'x'; }), existing]);
    reportCases.push([`${k}: falscher season-Wert`, k, wrapperOf(k, (w) => { w.season = '99/00'; }), existing]);
    reportCases.push([`${k}: Spiel getauscht (gleiche Anzahl)`, k, wrapperOf(k, (w) => { w.games[0] = extraGame(k, 990002, '2099-01-02'); }), existing]);
    reportCases.push([`${k}: Inhalt eines bekannten Spiels geändert`, k, wrapperOf(k, (w) => { w.games[0].ended = !w.games[0].ended; }), existing]);
    reportCases.push([`${k}: neue Saison (existing=null)`, k, clone(existing), null]);
    reportCases.push([`${k}: bestehende Datei strukturell ungültig`, k, clone(existing), { season: k, label: 'x' }]);
    reportCases.push([`${k}: drastischer Rückgang (<50 %)`, k, wrapperOf(k, (w) => { w.games = w.games.slice(0, Math.floor(w.games.length / 3)); }), existing]);
    reportCases.push([`${k}: leer gegen vorhanden`, k, wrapperOf(k, (w) => { w.games = []; }), existing]);
  }
  for (const garbage of [null, 'text', 42, [], {}, { season: '25/26' }, { season: '25/26', label: '2025/26' }, { season: '25/26', label: '2025/26', games: 'x' }, { season: 5, label: 'x', games: [] }]) {
    reportCases.push([`Wrapper-Müll ${JSON.stringify(garbage)}`, '25/26', garbage, real['25/26']]);
  }
  for (const [label, key, incoming, existing] of reportCases) {
    cases++;
    same(`buildDryRunReport: ${label}`, refBuildDryRunReport(key, incoming, existing), call('buildDryRunReport', key, incoming, existing));
  }
  for (const key of ['25/26', '2025/26', '25/28', '', null, undefined, 42, '99/00', '00/01', 'ab/cd']) {
    same(`validateSeasonKey(${JSON.stringify(key)})`, refValidateSeasonKey(key), call('validateSeasonKey', key));
  }
  for (const w of [null, [], {}, { season: 'a', label: 'b', games: [] }, { season: 'a', label: '', games: [] }, { season: 'a', label: 'b' }]) {
    same(`validateWrapperFormat(${JSON.stringify(w)})`, refValidateWrapperFormat(w), call('validateWrapperFormat', w));
  }
  for (const [before, after] of [[[], []], [[{ id: 1 }], []], [Array.from({ length: 6 }, (_, i) => ({ id: i })), [{ id: 1 }, { id: 2 }]], [[{ id: 1 }], [{ id: 1 }, {}]], [[], [{ id: 1 }]], [[{ id: 1 }], 'x']]) {
    same(`validateMergedSeason(${JSON.stringify(before).slice(0, 30)}…)`, refValidateMergedSeason(before, after), call('validateMergedSeason', before, after));
  }
  const sampleGames = [...real['25/26'].games.slice(0, 5), null, 'x', [], { id: 1 }, { game_id: 7 }, { id: '' }, { id: 3, date: 5 }, { id: 4, game_day: [] }];
  for (const fnName of ['getGameId', 'validateGameStructure']) {
    for (const g of sampleGames) same(`${fnName}(${JSON.stringify(g)?.slice(0, 25)}…)`, refValidators[fnName](g), call(fnName, g));
  }
  same('findDuplicateGameIds', refValidators.findDuplicateGameIds([...sampleGames, { id: 1 }, { id: '1' }]), call('findDuplicateGameIds', [...sampleGames, { id: 1 }, { id: '1' }]));
  same('validateSeasonGames', refValidators.validateSeasonGames(sampleGames), call('validateSeasonGames', sampleGames));
  same('validateSeasonGames(kein Array)', refValidators.validateSeasonGames('x'), call('validateSeasonGames', 'x'));
  same('diffGameIds', refValidators.diffGameIds(real['25/26'].games, real['24/25'].games), call('diffGameIds', real['25/26'].games, real['24/25'].games));
  console.log(`  ${cases} buildDryRunReport-Vergleiche über 5 echte Saisons + Sonderfälle`);
}

// ═════════════════════════════════════════════════════════════════════════
console.log('');
console.log('== A: gültige Season-Datei -> Vorschau wird aktiviert ==');
{
  const app = boot();
  const incoming = wrapperOf('25/26', (w) => {
    w.games.push(extraGame('25/26', 999001, '2099-01-01'));
    const scheduled = w.games.find((g) => g.ended === false) ?? w.games[0];
    scheduled.ended = true;
    scheduled.result_string = '3:2';
    app.changedId = scheduled.id;
  });
  const result = await stage(app, incoming);
  assertEqual([result.ok, result.errors], [true, []], 'Staging erfolgreich');
  const p = app.run('getSeasonDataPreview')('25/26');
  assertTrue(p, 'getSeasonDataPreview liefert den aktiven Slot');
  assertEqual([p.seasonKey, p.sourceName, p.report.ok], ['25/26', 'test.json', true], 'Slot trägt Saison, Quelle und gültigen Bericht');
  assertEqual(p.changes.added.map((r) => r.id), ['999001'], 'added stammt aus report.addedIds');
  assertEqual(p.changes.changed.map((r) => r.id), [String(app.changedId)], 'changed: bekannte ID mit abweichendem Inhalt (kanonisch erkannt)');
  assertEqual(p.changes.changed[0].before.ended, false, 'changed enthält den Vorher-Status');
  assertTrue(/^[0-9a-f]{64}$/.test(p.productionFingerprint), 'productionFingerprint ist ein SHA-256-Hex');
  assertEqual(p.report.unchangedCount, real['25/26'].games.length, 'Bericht: alle bekannten IDs unverändert (nur ID-Diff)');
  assertEqual(app.run('SEASON_DATA_PREVIEW_LAST_ERROR'), null, 'kein Fehlerstand');
  const card = app.run(`rSeasonDataPreviewCard('25/26')`);
  assertTrue(card.includes('data-sd-preview="active"') && card.includes('VORSCHAU — noch nicht importiert') && card.includes('Fließt nicht in Tabellen und Statistiken ein'), 'Karte kennzeichnet die Vorschau als "noch nicht importiert"');
  assertTrue(card.includes('2099-01-01') && card.includes('3:2') && card.includes('vorher: Postponed'), 'Karte listet neues Spiel (Datum) und geändertes Spiel (neuer Stand und Vorher-Status)');
}

console.log('');
console.log('== B/C: ungültige Eingaben -> keine Vorschau, verständliche Fehler ==');
{
  const cases = [
    ['kaputtes JSON', '{"season":', 'kein gültiges JSON'],
    ['leere Eingabe', '   ', 'Keine Daten eingegeben'],
    ['Wrapper ohne games', { season: '25/26', label: '2025/26' }, 'Feld "games" fehlt'],
    ['Array statt Objekt', [], 'kein Objekt'],
    ['verschwundene Spiel-ID', wrapperOf('25/26', (w) => w.games.pop()), 'Bekannte Game-ID(s) fehlen'],
    ['doppelte Spiel-ID', wrapperOf('25/26', (w) => w.games.push(clone(w.games[0]))), 'Doppelte Game-ID'],
    ['Pflichtfeld fehlt', wrapperOf('25/26', (w) => { delete w.games[0].date; }), 'Feld "date" fehlt'],
    ['falsche Saison im Wrapper', wrapperOf('25/26', (w) => { w.season = '24/25'; }), 'passt nicht zum angegebenen Season-Key'],
  ];
  for (const [label, input, expectedPart] of cases) {
    const app = boot();
    const before = app.productionDigest();
    const r = await stage(app, input);
    assertEqual(r.ok, false, `${label}: nicht aktiviert`);
    assertEqual(app.run('SEASON_DATA_PREVIEW'), null, `${label}: kein Preview-Zustand`);
    assertTrue(r.errors.length > 0 && r.errors.every((e) => typeof e === 'string' && e.length > 5), `${label}: lesbare Fehlertexte`);
    assertTrue(r.errors.some((e) => e.includes(expectedPart)), `${label}: Fehler nennt "${expectedPart}"`);
    assertEqual(app.run('SEASON_DATA_PREVIEW_LAST_ERROR.errors').length > 0, true, `${label}: letzter Fehler für die Anzeige gemerkt`);
    assertTrue(app.run(`rSeasonDataPreviewCard('25/26')`).includes('data-sd-preview="error"'), `${label}: Karte zeigt den Fehler`);
    assertEqual(app.productionDigest(), before, `${label}: Produktions-/App-Zustand unverändert`);
  }
  const app = boot();
  const many = wrapperOf('25/26', (w) => { for (const g of w.games) delete g.date; });
  const r = await stage(app, many);
  assertTrue(r.errors.length > 20, 'viele Fehler werden vollständig gemeldet');
  assertTrue(/… und \d+ weitere/.test(app.run(`rSeasonDataPreviewCard('25/26')`)), 'Karte kürzt lange Fehlerlisten mit "… und N weitere"');
}

console.log('');
console.log('== Season-Key: unbekannte/ungültige Keys werden abgelehnt (keine Saison-Registrierung) ==');
{
  for (const key of ['27/28', '2025/26', '25/28', 'xx', '', undefined]) {
    const app = boot();
    const keysBefore = app.run('Object.keys(SEASON_CONFIG)');
    const before = app.productionDigest();
    const r = await stage(app, wrapperOf('25/26'), { seasonKey: key });
    assertEqual([r.ok, app.run('SEASON_DATA_PREVIEW')], [false, null], `Season-Key ${JSON.stringify(key)}: abgelehnt`);
    assertEqual([app.run('Object.keys(SEASON_CONFIG)'), app.run('Object.keys(STATIC_SEASON_DATA)')], [keysBefore, ['25/26']], `Season-Key ${JSON.stringify(key)}: keine neue SEASON_CONFIG/Saison`);
    assertEqual(app.productionDigest(), before, `Season-Key ${JSON.stringify(key)}: Zustand unverändert`);
    if (key === '27/28') assertTrue(r.errors[0].includes('nicht registriert'), '27/28: Fehler nennt "nicht registriert"');
  }
}

console.log('');
console.log('== D/E: Produktionsdaten unverändert, nichts geschrieben, kein Cache-/State-Einfluss ==');
{
  const storage = makeStorage();
  const app = boot({ storage });
  const before = app.productionDigest();
  const incoming = wrapperOf('25/26', (w) => w.games.push(extraGame('25/26', 999001, '2099-01-01')));
  await stage(app, incoming);
  await stage(app, wrapperOf('25/26', (w) => w.games.pop()));
  app.run('discardSeasonDataPreview()');
  await stage(app, incoming);
  assertEqual(app.productionDigest(), before, 'STATIC_SEASON_DATA, SEASONS, PLAYER_REGISTRY, LINEUP_DATA, Registry, S, analysisCache, SEASON_CONFIG nach Staging/Fehler/Verwerfen/Staging unverändert');
  assertTrue(app.patches.length > 0 && app.patches.every((p) => Object.keys(p).length === 0), 'setState wird nur als reiner Re-Render ({}) aufgerufen — kein State-Feld gesetzt');
  assertEqual([app.calls.fetch, storage.getCalls, storage.setCalls, storage.removeCalls, storage.m.size], [0, 0, 0, 0, 0], 'kein Netzwerk-Request, kein Browser-Speicher-Zugriff (nichts persistiert)');
  const p = app.run('getSeasonDataPreview')('25/26');
  assertTrue(p.data !== app.STATIC['25/26'] && p.data.games[0] !== app.STATIC['25/26'].games[0], 'Vorschau-Daten teilen keine Objekte mit den Produktionsdaten');
  assertEqual(app.run(`STATIC_SEASON_DATA['25/26'].games.length`), real['25/26'].games.length, 'Produktionsspielzahl unverändert (kein Merge)');
  const block = previewBlock.split('\n').filter((l) => !l.trim().startsWith('//') && !l.trim().startsWith('*') && !l.trim().startsWith('/*')).join('\n');
  assertTrue(!/localStorage|sessionStorage|indexedDB/.test(block), 'E: Block enthält keinen Zugriff auf Browser-Speicher');
  assertTrue(!/fetch\(|XMLHttpRequest|sendBeacon|showSaveFilePicker|createObjectURL|new Blob|\.download\b/.test(block), 'E: Block enthält keine Netzwerk-/Schreib-/Download-API');
  assertTrue(!/STATIC_SEASON_DATA\s*\[[^\]]*\]\s*=[^=]/.test(block), 'E: STATIC_SEASON_DATA wird im Block nie beschrieben');
  assertTrue(!/\b(cachedAnalysis|analysisCache|clearAnalysisCache|loadSeasonData|SEASONS|PLAYER_REGISTRY|LINEUP_DATA)\b/.test(block), 'D: Block referenziert weder Analyse-Cache, loadSeasonData, SEASONS, PLAYER_REGISTRY noch LINEUP_DATA');
  const setStateCalls = block.match(/setState\([^)]*\)/g) || [];
  assertTrue(setStateCalls.length > 0 && setStateCalls.every((c) => c === 'setState({})'), 'D: setState wird im Block ausschließlich als setState({}) verwendet');
  const storageLines = html.split('\n').filter((l) => /(local|session)Storage|indexedDB/.test(l) && !l.trim().startsWith('//'));
  assertEqual(storageLines.length, 3, 'E: keine zusätzliche Storage-Zeile in index.html (weiterhin nur die 3 Kapsel-Funktionen aus P0c.3)');
}

console.log('');
console.log('== F/G/K: Verwerfen, danach exakt wie ohne Vorschau ==');
{
  const app = boot();
  const digest = app.productionDigest();
  const cardBefore = app.run(`rSeasonDataPreviewCard('25/26')`);
  assertEqual(app.run(`getSeasonDataPreview('25/26')`), null, 'K: ohne Vorschau liefert der Accessor null (es gilt nur der Produktionsstand)');
  assertTrue(!cardBefore.includes('data-sd-preview="active"') && !/<details open/.test(cardBefore), 'Karte ohne Vorschau: eingeklappt, kein aktiver Bericht');
  assertTrue(cardBefore.includes('<details ') && cardBefore.includes('type="file"') && cardBefore.includes('<textarea'), 'Karte bietet Datei-Eingabe und Einfügen-Feld');
  await stage(app, wrapperOf('25/26', (w) => w.games.push(extraGame('25/26', 999001, '2099-01-01'))));
  assertTrue(app.run(`getSeasonDataPreview('25/26')`), 'Vorbedingung: Vorschau aktiv');
  assertTrue(/<details open/.test(app.run(`rSeasonDataPreviewCard('25/26')`)), 'nach erfolgreichem Staging ist die Karte geöffnet');
  app.run('discardSeasonDataPreview()');
  assertEqual([app.run('SEASON_DATA_PREVIEW'), app.run('SEASON_DATA_PREVIEW_LAST_ERROR'), app.run('SEASON_DATA_PREVIEW_UI.pasteText')], [null, null, ''], 'F: Slot, letzter Fehler und Eingabetext sind weg');
  app.run('window.setSeasonDataPreviewOpen(false)');
  assertEqual(app.run(`rSeasonDataPreviewCard('25/26')`), cardBefore, 'G: Karte nach dem Verwerfen identisch zur Karte vor dem Staging');
  assertEqual(app.productionDigest(), digest, 'G: gesamter Zustand identisch zum Produktionszustand');
  const dup = boot();
  const r = await stage(dup, clone(real['25/26']));
  assertEqual([r.ok, dup.run('SEASON_DATA_PREVIEW.changes.added.length'), dup.run('SEASON_DATA_PREVIEW.changes.changed.length'), dup.run('SEASON_DATA_PREVIEW.report.unchangedCount')], [true, 0, 0, real['25/26'].games.length], 'K: Vorschau == Produktionsdatei ergibt ein leeres Diff');
}

console.log('');
console.log('== H: Vorschau anderer Saison, einzelner Slot, Ersetzen nur nach Bestätigung ==');
{
  const app = boot({ seasons: ['24/25', '25/26'] });
  const inc2526 = wrapperOf('25/26', (w) => w.games.push(extraGame('25/26', 999001, '2099-01-01')));
  await stage(app, inc2526);
  assertEqual(app.run(`getSeasonDataPreview('24/25')`), null, 'Accessor: für 24/25 gibt es keine Vorschau');
  const other = app.run(`rSeasonDataPreviewCard('24/25')`);
  assertTrue(other.includes('data-sd-preview="other-season"') && other.includes('discardSeasonDataPreview()'), 'Karte 24/25 weist auf die aktive Vorschau einer anderen Saison hin');
  const slot = app.run('SEASON_DATA_PREVIEW');
  const inc2425 = JSON.stringify(wrapperOf('24/25', (w) => w.games.push(extraGame('24/25', 999002, '2099-01-02'))));
  // Ersetzen abgelehnt
  const declined = boot({ seasons: ['24/25', '25/26'], confirmAnswer: false });
  await stage(declined, inc2526);
  const oldSlot = declined.run('SEASON_DATA_PREVIEW');
  const digest = declined.productionDigest();
  const rd = await declined.run('stageSeasonDataPreview')(inc2425, { seasonKey: '24/25', sourceName: 'neu.json' });
  assertEqual([rd.ok, rd.cancelled], [false, true], 'Ersetzen abgebrochen: cancelled');
  assertTrue(declined.run('SEASON_DATA_PREVIEW') === oldSlot, 'abgebrochenes Ersetzen: alter Slot bleibt dieselbe Instanz');
  assertEqual(declined.run('SEASON_DATA_PREVIEW_LAST_ERROR'), null, 'abgebrochenes Ersetzen erzeugt keinen Fehlerstand');
  assertEqual(declined.calls.confirm.length, 1, 'genau eine Bestätigungsfrage');
  assertTrue(declined.calls.confirm[0].includes('25/26') && declined.calls.confirm[0].includes('ersetzen'), 'Bestätigungsfrage nennt die bestehende Vorschau');
  assertEqual(declined.productionDigest(), digest, 'abgebrochenes Ersetzen: Zustand unverändert');
  // Ersetzen bestätigt
  const okAns = await app.run('stageSeasonDataPreview')(inc2425, { seasonKey: '24/25', sourceName: 'neu.json' });
  assertEqual(okAns.ok, true, 'Ersetzen bestätigt: erfolgreich');
  assertEqual([app.run('SEASON_DATA_PREVIEW.seasonKey'), app.run('SEASON_DATA_PREVIEW.sourceName'), app.calls.confirm.length], ['24/25', 'neu.json', 1], 'Slot enthält jetzt die neue Vorschau (genau ein Slot)');
  assertTrue(app.run('SEASON_DATA_PREVIEW') !== slot, 'neuer Slot ist eine neue Instanz');
  // Erstes Staging ohne bestehende Vorschau fragt nicht
  const first = boot();
  await stage(first, inc2526);
  assertEqual(first.calls.confirm.length, 0, 'ohne bestehende Vorschau keine Rückfrage');
  // Fehlgeschlagener Ladeversuch lässt bestehende Vorschau unangetastet
  const keep = boot();
  await stage(keep, inc2526);
  const keptSlot = keep.run('SEASON_DATA_PREVIEW');
  const failed = await stage(keep, wrapperOf('25/26', (w) => w.games.pop()), { sourceName: 'kaputt.json' });
  assertEqual(failed.ok, false, 'fehlgeschlagener neuer Ladeversuch');
  assertTrue(keep.run('SEASON_DATA_PREVIEW') === keptSlot, 'bestehende Vorschau bleibt dieselbe Instanz');
  assertEqual(keep.run('SEASON_DATA_PREVIEW.sourceName'), 'test.json', 'bestehende Vorschau inhaltlich unverändert');
  assertEqual(keep.calls.confirm.length, 0, 'bei ungültiger Eingabe wird nicht einmal nach dem Ersetzen gefragt');
  const cardKeep = keep.run(`rSeasonDataPreviewCard('25/26')`);
  assertTrue(cardKeep.includes('data-sd-preview="active"') && cardKeep.includes('die bisherige Vorschau bleibt unverändert'), 'Karte zeigt weiter die alte Vorschau und den Fehler des neuen Versuchs');
  // Datei für falsche Saison
  const mismatch = boot({ seasons: ['24/25', '25/26'] });
  const rm = await stage(mismatch, clone(real['24/25']), { seasonKey: '25/26' });
  assertTrue(!rm.ok && rm.errors.some((e) => e.includes('passt nicht zum angegebenen Season-Key')), 'Datei einer anderen Saison wird gegen den Karten-Season-Key abgelehnt');
}

console.log('');
console.log('== I: Vorschau + asOf deterministisch ==');
{
  const build = () => boot();
  const incoming = wrapperOf('25/26', (w) => {
    w.games.push(extraGame('25/26', 999001, '2099-01-01'));
    w.games.push(extraGame('25/26', 999002, '2000-01-01'));
  });
  const withAsOf = build();
  withAsOf.S.asOf = { seasonKey: '25/26', date: '2026-01-01' };
  await stage(withAsOf, incoming);
  const c1 = withAsOf.run(`rSeasonDataPreviewCard('25/26')`);
  const c2 = withAsOf.run(`rSeasonDataPreviewCard('25/26')`);
  assertEqual(c1, c2, 'wiederholtes Rendern liefert byte-identisches HTML');
  const rowFor = (card, dateText) => card.split('</div>').find((chunk) => chunk.includes(`${dateText} ·`)) ?? '';
  assertTrue(rowFor(c1, '2099-01-01').includes('nach dem gewählten Stichtag'), 'Spiel nach dem Stichtag ist markiert');
  assertTrue(!rowFor(c1, '2000-01-01').includes('nach dem gewählten Stichtag'), 'Spiel vor dem Stichtag ist nicht markiert');
  const again = build();
  again.S.asOf = { seasonKey: '25/26', date: '2026-01-01' };
  await stage(again, incoming);
  const withoutLoadTime = (card) => card.replace(/geladen .*? Fließt/, 'geladen X Fließt');
  assertEqual(withoutLoadTime(again.run(`rSeasonDataPreviewCard('25/26')`)), withoutLoadTime(c1), 'unabhängiger zweiter App-Start: identischer Bericht (bis auf die Ladezeit)');
  for (const [label, asOf] of [['ohne asOf', null], ['asOf einer anderen Saison', { seasonKey: '24/25', date: '2026-01-01' }]]) {
    const other = build();
    other.S.asOf = asOf;
    await stage(other, incoming);
    assertTrue(!other.run(`rSeasonDataPreviewCard('25/26')`).includes('nach dem gewählten Stichtag'), `${label}: keine Markierung`);
  }
  const cardAt = (date) => { withAsOf.S.asOf = { seasonKey: '25/26', date }; return withAsOf.run(`rSeasonDataPreviewCard('25/26')`); };
  const marked = (card, dateText) => rowFor(card, dateText).includes('nach dem gewählten Stichtag');
  assertEqual([marked(cardAt('2030-01-01'), '2099-01-01'), marked(cardAt('2030-01-01'), '2000-01-01')], [true, false], 'asOf 2030: nur das Spiel von 2099 liegt danach');
  assertEqual([marked(cardAt('2100-01-01'), '2099-01-01'), marked(cardAt('1999-12-31'), '2000-01-01')], [false, true], 'Stichtag verschoben: die Markierung folgt ausschließlich dem asOf (2100: nichts danach, 1999: 2000er Spiel danach)');
}

console.log('');
console.log('== Produktions-Vergleichsbasis: ensureExternalSeasonData vorher, file://-Fall nur Warnung ==');
{
  const partial = { '25/26': { season: '25/26', label: '2025/26', games: real['25/26'].games.slice(0, 2) } };
  const app = boot({
    production: partial,
    onEnsureExternal: async (STATIC) => { STATIC['25/26'] = clone(real['25/26']); },
  });
  const incoming = wrapperOf('25/26', (w) => w.games.push(extraGame('25/26', 999001, '2099-01-01')));
  const r = await stage(app, incoming);
  assertEqual([r.ok, app.run('SEASON_DATA_PREVIEW.changes.added.map(x=>x.id)'), app.calls.ensure], [true, ['999001'], ['25/26']], 'ensureExternalSeasonData läuft VOR der Vergleichsbasis (nur 1 neues Spiel statt 59)');
  assertEqual(app.run('SEASON_DATA_PREVIEW.notes'), [], 'externe Datei geladen: keine Zusatzwarnung');
  const embedded = boot({ externalOk: false });
  const re = await stage(embedded, wrapperOf('25/26', (w) => w.games.push(extraGame('25/26', 999001, '2099-01-01'))));
  assertEqual(re.ok, true, 'file://-Fall (externe Datei fehlt, eingebettete Daten vorhanden): kein Fehler');
  assertEqual(embedded.run('SEASON_DATA_PREVIEW.notes').length, 1, 'stattdessen genau eine Warnung');
  assertTrue(embedded.run(`rSeasonDataPreviewCard('25/26')`).includes('data-sd-preview="warnings"') && embedded.run(`rSeasonDataPreviewCard('25/26')`).includes('eingebetteten Produktionsdaten'), 'Karte zeigt die Warnung zur Vergleichsbasis');
  // ── Erstimport: registrierte Saison OHNE Produktionsdaten (real: 26/27) ──
  const firstImportWrapper = () => wrapperOf('25/26', (w) => { w.season = '26/27'; w.label = '2026/27'; w.games = w.games.slice(0, 3); });
  const stage2627 = (app, w, opts = {}) => app.run('stageSeasonDataPreview')(typeof w === 'string' ? w : JSON.stringify(w), { seasonKey: '26/27', sourceName: 'erst.json', ...opts });
  for (const [variant, cfg, note] of [
    ['real: kein Eintrag in den Produktionsdaten, season-data/… nicht ladbar', { externalOk: false }, true],
    ['leerer Wrapper geladen (season-data/26-27.json mit games:[])', { externalOk: true, production: { '25/26': clone(real['25/26']), '26/27': { season: '26/27', label: '2026/27', games: [] } } }, false],
  ]) {
    const app = boot(cfg);
    const digest = app.productionDigest();
    const configBefore = app.run('JSON.stringify(SEASON_CONFIG)');
    const incoming = firstImportWrapper();
    const r = await stage2627(app, incoming);
    const p = app.run('SEASON_DATA_PREVIEW');
    assertEqual([r.ok, p?.seasonKey, p?.firstImport], [true, '26/27', true], `Erstimport (${variant}): Vorschau aktiviert, als firstImport markiert`);
    assertEqual([p.productionFingerprint, p.productionRef], [null, null], 'Erstimport: productionFingerprint und productionRef sind null (keine künstliche Basis)');
    assertEqual([p.report.ok, p.report.existedBefore, p.report.previousGameCount, p.report.newGameCount], [true, false, 0, 3], 'Erstimport: Bericht wie der CLI-Fall "keine season-data-Datei"');
    assertEqual(JSON.stringify(p.report), JSON.stringify(refBuildDryRunReport('26/27', incoming, null)), 'Erstimport: Bericht identisch zu buildDryRunReport(…, null) der echten Importer-Funktion');
    assertEqual([p.changes.added.length, p.changes.changed.length], [3, 0], 'Erstimport: alle Spiele sind "neu", keine "geändert"');
    assertEqual(p.notes.length, note ? 1 : 0, note ? 'Erstimport ohne ladbare season-data: eine Warnung zur Unsicherheit' : 'Erstimport mit geladenem leerem Wrapper: keine Zusatzwarnung');
    const card = app.run(`rSeasonDataPreviewCard('26/27')`);
    assertTrue(card.includes('data-sd-preview="first-import"') && card.includes('ERSTIMPORT — keine Produktionsdaten vorhanden'), 'Erstimport: Karte kennzeichnet eindeutig "Erstimport / keine Produktionsdaten vorhanden"');
    assertTrue(card.includes('Erstimport · Vorschau 3 Spiele · 3 neu') && !card.includes('Bisher '), 'Erstimport: Zusammenfassung ohne Vergleich mit "Bisher"-Spielen');
    assertTrue(card.includes('VORSCHAU — noch nicht importiert') && !card.includes('data-sd-preview="stale"'), 'Erstimport: weiterhin als Vorschau markiert, nicht veraltet');
    assertEqual(app.productionDigest(), digest, 'Erstimport: STATIC_SEASON_DATA, SEASONS, PLAYER_REGISTRY, LINEUP_DATA, S, Cache unverändert (keine künstliche Produktionsbasis)');
    assertEqual([app.run('JSON.stringify(SEASON_CONFIG)'), app.run(`getStaticSeasonGames('26/27').length`)], [configBefore, 0], 'Erstimport: keine SEASON_CONFIG-Änderung, Produktionsspiele bleiben leer');
    // Stale-Erkennung: nur relevant, wenn tatsächlich Produktionsdaten auftauchen
    app.run(`STATIC_SEASON_DATA['26/27']={season:'26/27',label:'2026/27',games:[]}`);
    assertTrue(!app.run(`rSeasonDataPreviewCard('26/27')`).includes('data-sd-preview="stale"'), 'Erstimport: Austausch durch einen weiteren leeren Wrapper ist nicht "veraltet"');
    app.run(`STATIC_SEASON_DATA['26/27']={season:'26/27',label:'2026/27',games:[JSON.parse(JSON.stringify(STATIC_SEASON_DATA['25/26'].games[0]))]}`);
    assertTrue(app.run(`rSeasonDataPreviewCard('26/27')`).includes('data-sd-preview="stale"'), 'Erstimport: tauchen nachträglich Produktionsdaten auf, wird der Bericht als veraltet gekennzeichnet');
  }
  // ungültige Erstimport-Daten: unverändertes Verhalten, bestehende Vorschau bleibt
  {
    const app = boot({ externalOk: false });
    await stage(app, wrapperOf('25/26', (w) => w.games.push(extraGame('25/26', 999001, '2099-01-01'))));
    const kept = app.run('SEASON_DATA_PREVIEW');
    const digest = app.productionDigest();
    for (const [label, input, part] of [
      ['kaputtes JSON', '{"season":', 'kein gültiges JSON'],
      ['Pflichtfeld fehlt', wrapperOf('25/26', (w) => { w.season = '26/27'; w.games = w.games.slice(0, 2); delete w.games[0].date; }), 'Feld "date" fehlt'],
      ['doppelte ID', wrapperOf('25/26', (w) => { w.season = '26/27'; w.games = [clone(w.games[0]), clone(w.games[0])]; }), 'Doppelte Game-ID'],
      ['falsche Saison im Wrapper', wrapperOf('25/26', (w) => { w.games = w.games.slice(0, 2); }), 'passt nicht zum angegebenen Season-Key'],
      ['Wrapper ohne games', { season: '26/27', label: '2026/27' }, 'Feld "games" fehlt'],
    ]) {
      const r = await stage2627(app, input);
      assertTrue(!r.ok && r.errors.some((e) => e.includes(part)), `Erstimport ungültig (${label}): abgelehnt mit "${part}"`);
      assertTrue(app.run('SEASON_DATA_PREVIEW') === kept, `Erstimport ungültig (${label}): bestehende Vorschau bleibt dieselbe Instanz`);
    }
    assertEqual(app.productionDigest(), digest, 'ungültige Erstimport-Daten: Zustand unverändert');
    assertEqual(app.calls.confirm.length, 0, 'ungültige Erstimport-Daten lösen keine Ersetzen-Rückfrage aus');
  }
  // Nicht registrierter Key bleibt abgelehnt, auch mit Erstimport-Daten
  {
    const app = boot({ externalOk: false });
    const r = await app.run('stageSeasonDataPreview')(JSON.stringify({ season: '27/28', label: '2027/28', games: [] }), { seasonKey: '27/28', sourceName: 'x' });
    assertTrue(!r.ok && r.errors[0].includes('nicht registriert') && app.run('SEASON_DATA_PREVIEW') === null, '27/28 (nicht registriert): weiterhin abgelehnt');
  }
  // Erstimport-Vorschau wird nur nach Bestätigung durch eine andere ersetzt
  {
    const app = boot({ externalOk: false });
    await stage2627(app, firstImportWrapper());
    const slot = app.run('SEASON_DATA_PREVIEW');
    const r = await stage(app, wrapperOf('25/26', (w) => w.games.push(extraGame('25/26', 999001, '2099-01-01'))));
    assertEqual([r.ok, app.calls.confirm.length, app.run('SEASON_DATA_PREVIEW.firstImport'), app.run('SEASON_DATA_PREVIEW') !== slot], [true, 1, false, true], 'Ersetzen einer Erstimport-Vorschau: genau eine Rückfrage, danach normale Vorschau mit firstImport=false');
    assertTrue(/^[0-9a-f]{64}$/.test(app.run('SEASON_DATA_PREVIEW.productionFingerprint')), 'normale Saison behält ihren SHA-256-productionFingerprint');
  }
  // productionFingerprint: SHA-256 der kanonischen Produktions-Rohspiele, nicht der Lineup-baseHash
  const fp = boot();
  await stage(fp, clone(real['25/26']));
  const expected = await refSha256Hex(refCanonicalJson(real['25/26'].games));
  assertEqual([fp.run('SEASON_DATA_PREVIEW.firstImport'), fp.run('SEASON_DATA_PREVIEW.productionRef') !== null], [false, true], 'Saison mit Produktionsdaten: firstImport=false, Produktionsreferenz gesetzt (bisherige Logik)');
  assertEqual(fp.run('SEASON_DATA_PREVIEW.productionFingerprint'), expected, 'productionFingerprint == SHA-256(canonicalJson(Produktions-Spiele)) (Node-Referenz)');
  const lineupHash = await fp.run(`einsatzCenterComputeBaseHash({schemaVersion:1,season:'25/26',games:[]},LINEUP_GROUPS_REGISTRY)`);
  assertTrue(lineupHash !== expected, 'klar getrennt vom Lineup-baseHash');
  // Veraltete Vorschau (Produktionsdaten später ausgetauscht)
  const stale = boot();
  await stage(stale, clone(real['25/26']));
  assertTrue(!stale.run(`rSeasonDataPreviewCard('25/26')`).includes('data-sd-preview="stale"'), 'frische Vorschau: kein Veraltet-Hinweis');
  stale.run(`STATIC_SEASON_DATA['25/26']=JSON.parse(JSON.stringify(STATIC_SEASON_DATA['25/26']))`);
  assertTrue(stale.run(`rSeasonDataPreviewCard('25/26')`).includes('data-sd-preview="stale"'), 'späterer Austausch der Produktionsdaten: Veraltet-Hinweis');
  // Gleichzeitiges Laden
  const busy = boot();
  const [a, b] = await Promise.all([stage(busy, clone(real['25/26'])), stage(busy, clone(real['25/26']), { sourceName: 'zweite.json' })]);
  assertEqual([a.ok, b.ok, b.busy], [true, false, true], 'zweiter gleichzeitiger Ladeversuch wird abgewiesen');
  assertEqual(busy.run('SEASON_DATA_PREVIEW.sourceName'), 'test.json', 'der abgewiesene Versuch ändert nichts');
}

console.log('');
console.log('== Eingabewege: Datei und Einfügen nutzen denselben stageSeasonDataPreview()-Pfad ==');
{
  const incoming = JSON.stringify(wrapperOf('25/26', (w) => w.games.push(extraGame('25/26', 999001, '2099-01-01'))));
  const viaPaste = boot();
  viaPaste.pasteEl.value = incoming;
  const rp = await viaPaste.run(`stageSeasonDataPreviewFromPaste('25/26')`);
  const viaFile = boot();
  const input = { files: [{ name: 'spieltag.json', text: async () => incoming }], value: 'C:\\fake\\spieltag.json' };
  viaFile.ctx.__input = input;
  const rf = await viaFile.run(`stageSeasonDataPreviewFromFile(__input,'25/26')`);
  assertEqual([rp.ok, rf.ok], [true, true], 'beide Wege erfolgreich');
  assertEqual(viaPaste.run('JSON.stringify(SEASON_DATA_PREVIEW.report)'), viaFile.run('JSON.stringify(SEASON_DATA_PREVIEW.report)'), 'identischer Bericht für Datei und Einfügen');
  assertEqual([viaPaste.run('SEASON_DATA_PREVIEW.sourceName'), viaFile.run('SEASON_DATA_PREVIEW.sourceName')], ['Einfügen', 'spieltag.json'], 'Quelle: "Einfügen" bzw. Dateiname');
  assertEqual(input.value, '', 'Datei-Eingabe wird zurückgesetzt (gleiche Datei erneut wählbar)');
  assertEqual(viaPaste.run('SEASON_DATA_PREVIEW_UI.pasteText'), '', 'Einfüge-Feld nach Erfolg geleert');
  const bad = boot();
  bad.pasteEl.value = '{kaputt';
  const rb = await bad.run(`stageSeasonDataPreviewFromPaste('25/26')`);
  assertEqual([rb.ok, bad.run('SEASON_DATA_PREVIEW'), bad.run('SEASON_DATA_PREVIEW_UI.pasteText')], [false, null, '{kaputt'], 'Einfügen fehlerhaft: keine Vorschau, Text bleibt zum Korrigieren erhalten');
  const unreadable = boot();
  unreadable.ctx.__input = { files: [{ name: 'x.json', text: async () => { throw new Error('gesperrt'); } }], value: 'x' };
  const ru = await unreadable.run(`stageSeasonDataPreviewFromFile(__input,'25/26')`);
  assertTrue(!ru.ok && ru.errors[0].includes('nicht gelesen') && unreadable.run('SEASON_DATA_PREVIEW') === null, 'nicht lesbare Datei: verständlicher Fehler, keine Vorschau');
  assertEqual((await unreadable.run(`stageSeasonDataPreviewFromFile({files:[]},'25/26')`)).ok, false, 'keine Datei gewählt: No-op mit Fehlerhinweis');
  for (const name of ['stageSeasonDataPreviewFromFile', 'stageSeasonDataPreviewFromPaste']) {
    const src = previewBlock.slice(previewBlock.indexOf(`function ${name}(`), previewBlock.indexOf('\n}', previewBlock.indexOf(`function ${name}(`)));
    assertTrue(src.includes('stageSeasonDataPreview('), `${name} ruft stageSeasonDataPreview() auf`);
  }
}

console.log('');
console.log('== J: Vorschau und Einsatz-Center-Draft/Autosave bleiben getrennt ==');
{
  const storage = makeStorage();
  const app = boot({ storage });
  app.run(`LINEUP_DATA['25/26']={schemaVersion:1,season:'25/26',games:[{gameId:1,roster:{field:['api:1'],goalies:[]},groups:[],confirmedCombinations:[],note:''}]}`);
  await app.run(`ensureEinsatzCenterDraft('25/26')`);
  app.run(`window.setEinsatzCenterGameNote(1,'Draft-Notiz')`);
  const autosaveKey = 'vfbulm.einsatzCenter.draftAutosave.25/26';
  const autosaveBefore = storage.getItem(autosaveKey);
  const draftBefore = app.run('JSON.stringify(einsatzCenterSerializeDraft(EINSATZ_CENTER_DRAFT).draft)');
  const effectiveBefore = app.run(`JSON.stringify(getEffectiveLineupData('25/26'))`);
  const setCallsBefore = storage.setCalls;
  assertTrue(autosaveBefore !== null, 'Vorbedingung: Draft ist autosaved');
  await stage(app, wrapperOf('25/26', (w) => w.games.push(extraGame('25/26', 999001, '2099-01-01'))));
  await stage(app, wrapperOf('25/26', (w) => w.games.pop()));
  assertEqual(storage.getItem(autosaveKey), autosaveBefore, 'Staging/Fehler lassen den Autosave-Eintrag byte-identisch');
  assertEqual(storage.setCalls, setCallsBefore, 'Staging schreibt keinen Browser-Speicher');
  assertEqual(app.run('JSON.stringify(einsatzCenterSerializeDraft(EINSATZ_CENTER_DRAFT).draft)'), draftBefore, 'Runtime-Draft unverändert');
  assertEqual(app.run(`JSON.stringify(getEffectiveLineupData('25/26'))`), effectiveBefore, 'Effective-Lineup-Stand unverändert');
  assertEqual(storage.m.size, 1, 'im Speicher liegt weiterhin nur der Draft-Eintrag (keine Preview-Daten)');
  assertTrue(!autosaveBefore.includes('999001'), 'Autosave-Eintrag enthält keine Preview-Daten');
  // Draft verwerfen lässt die Vorschau unberührt
  const slot = app.run('SEASON_DATA_PREVIEW');
  app.run('window.cancelEinsatzCenterEdit()');
  assertEqual([app.run('EINSATZ_CENTER_DRAFT'), storage.getItem(autosaveKey)], [null, null], 'Draft verwerfen entfernt Draft und Autosave');
  assertTrue(app.run('SEASON_DATA_PREVIEW') === slot, 'Vorschau bleibt davon unberührt');
  // Vorschau verwerfen lässt Draft/Autosave unberührt
  await app.run(`ensureEinsatzCenterDraft('25/26')`);
  app.run(`window.setEinsatzCenterGameNote(1,'Neu')`);
  const autosave2 = storage.getItem(autosaveKey);
  app.run('discardSeasonDataPreview()');
  assertEqual([storage.getItem(autosaveKey), app.run('EINSATZ_CENTER_DRAFT.games.get(1).note')], [autosave2, 'Neu'], 'Vorschau verwerfen lässt Draft und Autosave unberührt');
  assertEqual(app.run(`LINEUP_DATA['25/26'].games[0].note`), '', 'LINEUP_DATA bleibt unverändert');
}

console.log('');
console.log('== L: Neuladen ohne Persistenz verliert die Vorschau ==');
{
  const storage = makeStorage();
  const app = boot({ storage });
  await stage(app, wrapperOf('25/26', (w) => w.games.push(extraGame('25/26', 999001, '2099-01-01'))));
  assertTrue(app.run('SEASON_DATA_PREVIEW'), 'Vorbedingung: Vorschau aktiv');
  assertEqual(storage.m.size, 0, 'nichts persistiert');
  const reloaded = boot({ storage });
  assertEqual([reloaded.run('SEASON_DATA_PREVIEW'), reloaded.run('SEASON_DATA_PREVIEW_LAST_ERROR'), reloaded.run('SEASON_DATA_PREVIEW_UI.open')], [null, null, false], '"Reload" (neuer Kontext, gleicher Speicher): keine Vorschau, kein Fehler, Karte eingeklappt');
}

console.log('');
console.log('== Verdrahtung: Karte nur auf der Spieltage-Timeline, keine neue Seite/Navigation ==');
{
  const timeline = mainFn('rMatchdayTimelinePage');
  assertEqual((timeline.match(/rSeasonDataPreviewCard\(/g) || []).length, 1, 'rMatchdayTimelinePage bindet die Karte genau einmal ein');
  assertEqual((html.match(/rSeasonDataPreviewCard\(/g) || []).length, 2, 'Karte wird außer Definition und Timeline nirgends eingebunden');
  assertTrue(!/S\.page\s*===?\s*'seasonDataPreview'|page:'seasonDataPreview'/.test(html), 'keine neue Seite');
  assertTrue(!/HASH_(GLOBAL|SEASON)_PAGE/.test(previewBlock), 'keine Routing-Änderung im Block');
}

console.log('');
if (failures > 0) {
  console.log(`${failures} Test(s) fehlgeschlagen.`);
  process.exitCode = 1;
} else {
  console.log('Alle Tests erfolgreich.');
  process.exitCode = 0;
}

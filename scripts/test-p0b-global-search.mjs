#!/usr/bin/env node
// P0b-Fix 4 — Test für die Globale Suche v1 (Spezifikation 6.3; Entscheidung D2/D3:
// NUR Spieler und Spieltage, keine Lexikon-Einträge/-Aliasse).
//
// Die echten Funktionen (globalSearch*, rGlobalSearch*, paintGlobalSearchResults,
// moveGlobalSearch, openGlobalSearch/closeGlobalSearch/onGlobalSearchInput/
// activateGlobalSearchResult, initGlobalSearch, rIaShell, normalizePlayerName, escHtml/escAttr,
// formatDateDE, overviewOpponentLabel, uiNotiz) werden unverändert aus dem index.html-Text
// geschnitten und in node:vm ausgeführt. Ersetzt sind nur die Datenquellen (getAllTimePlayerRows,
// getSeasonMatchdays, getActiveSeasonKey), die Navigations-Öffner (setGlobalPlayer/openMatchday,
// als Spione) und cleanText (Identität; Mojibake-Reparatur ist nicht Gegenstand). document ist ein
// minimales Fake-DOM mit Fokusverfolgung. rContextBar/rMainNav sind im Kontext NICHT definiert
// (Beweis: die Suche hängt nicht von rContextBar ab); nur der Zusammenbau in rIaShell wird mit
// Platzhaltern geprüft. Liest index.html nur lesend, schreibt nichts.
//
// Aufruf: node scripts/test-p0b-global-search.mjs

import { readFile } from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';

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
const clone = (o) => JSON.parse(JSON.stringify(o));

const html = (await readFile(path.join(REPO_ROOT, 'index.html'), 'utf8')).replace(/\r\n/g, '\n');
function fnSource(name) {
  const m = new RegExp(`(^|\\n)function ${name}\\(`).exec(html);
  if (!m) throw new Error(`Funktion nicht gefunden: ${name}`);
  const from = m.index + m[1].length;
  return html.slice(from, html.indexOf('\n}', from) + 2);
}
function winSource(name) {
  const from = html.indexOf(`window.${name}=`);
  if (from === -1) throw new Error(`window.${name} nicht gefunden`);
  return html.slice(from, html.indexOf('\n};', from) + 3);
}
const lineOf = (re) => re.exec(html)?.[0] ?? (() => { throw new Error(`Zeile fehlt: ${re}`); })();
const stripComments = (s) => s.split('\n').filter((l) => !l.trim().startsWith('//') && !l.trim().startsWith('*') && !l.trim().startsWith('/*')).join('\n');

const SEARCH_FUNCTIONS = ['globalSearchTokens', 'globalSearchEntries', 'globalSearchPlayerScore', 'globalSearchMatchdayScore', 'globalSearchMatch', 'globalSearchIsEditableTarget', 'globalSearchKeyAction', 'rGlobalSearchToggle', 'rGlobalSearchResultsHtml', 'rGlobalSearchPanelHtml', 'paintGlobalSearchResults', 'moveGlobalSearch', 'globalSearchOnKeydown', 'initGlobalSearch'];
const SEARCH_WINDOW = ['openGlobalSearch', 'closeGlobalSearch', 'onGlobalSearchInput', 'activateGlobalSearchResult'];
const searchSources = [...SEARCH_FUNCTIONS.map(fnSource), ...SEARCH_WINDOW.map(winSource)];
const searchCode = stripComments(searchSources.join('\n'));
const helperFunctions = ['normalizePlayerName', 'escHtml', 'escAttr', 'formatDateDE', 'overviewOpponentLabel', 'uiNotiz', 'rIaShell'].map(fnSource).join('\n');
const searchConsts = [lineOf(/^const GLOBAL_SEARCH_LIMITS=.*$/m), lineOf(/^const GLOBAL_SEARCH_MAX_QUERY=.*$/m), lineOf(/^let GLOBAL_SEARCH=.*$/m), lineOf(/^let GLOBAL_SEARCH_INITIALIZED=.*$/m), lineOf(/^const MATCHDAY_STATUS_LABELS=.*$/m)].join('\n');

// ── Fake-DOM ────────────────────────────────────────────────────────────
function makeDom() {
  const doc = { listeners: {}, activeElement: null, body: { children: [], appendChild(el) { this.children.push(el); el.inDoc = true; } }, log: [] };
  const makeEl = (id = '') => {
    const el = { id, attrs: {}, hidden: false, inDoc: false, focusCount: 0, scrolled: 0, _html: '', className: '', tagName: 'DIV' };
    el.focus = () => { doc.activeElement = el; el.focusCount++; };
    el.setAttribute = (k, v) => { el.attrs[k] = String(v); if (k === 'id') el.id = String(v); };
    el.scrollIntoView = () => { el.scrolled++; };
    return el;
  };
  let overlay = null;
  let stubs = new Map();
  let resultsHtml = '';
  const define = (el, prop, get, set) => Object.defineProperty(el, prop, { get, set, configurable: true });
  doc.createElement = () => {
    const el = makeEl();
    define(el, 'innerHTML', () => el._html, (v) => {
      el._html = String(v);
      stubs = new Map();
      const m = /<div id="ia-search-results"[^>]*>([^]*?)<\/div><div class="ia-search-hint">/.exec(el._html);
      resultsHtml = m ? m[1] : '';
    });
    overlay = el;
    return el;
  };
  doc.getElementById = (id) => {
    if (id === 'ia-search-overlay') return overlay && overlay.id === id ? overlay : null;
    if (!overlay || !overlay._html) return null;
    if (stubs.has(id)) return stubs.get(id);
    let el = null;
    if (id === 'ia-search-results') {
      el = makeEl(id);
      define(el, 'innerHTML', () => resultsHtml, (v) => { resultsHtml = String(v); stubs.forEach((s, k) => { if (k.startsWith('ia-search-opt-')) stubs.delete(k); }); });
    } else if (id === 'ia-search-input') {
      el = makeEl(id); el.tagName = 'INPUT';
    } else if (id.startsWith('ia-search-opt-') && resultsHtml.includes(`id="${id}"`)) {
      el = makeEl(id);
    }
    if (el) stubs.set(id, el);
    return el;
  };
  doc.querySelector = (sel) => (sel === '[data-ia-search-toggle]' ? doc.toggle : null);
  doc.contains = (el) => Boolean(el && (el.inDoc || el === doc.toggle));
  doc.addEventListener = (type, fn) => { (doc.listeners[type] ??= []).push(fn); };
  doc.toggle = makeEl('toggle'); doc.toggle.tagName = 'BUTTON'; doc.toggle.inDoc = true;
  doc.pageEl = makeEl('page-el'); doc.pageEl.tagName = 'BUTTON'; doc.pageEl.inDoc = true;
  doc.getOverlay = () => overlay;
  doc.results = () => resultsHtml;
  doc.input = () => doc.getElementById('ia-search-input');
  return doc;
}

// ── Fixtures ────────────────────────────────────────────────────────────
const PLAYERS = [
  ['api:1', 'Aivars Klavins'], ['api:2', 'Björn Müller'], ['api:3', 'Bjoern Meier'], ['api:4', 'Christian Loser'], ['api:5', 'Christian Löwe'],
  ['api:6', 'Daniel Schröder'], ['api:7', 'Loser Lars'], ...Array.from({ length: 10 }, (_, i) => [`api:${20 + i}`, `Max Muster ${String.fromCharCode(65 + i)}`]),
].map(([playerId, name]) => ({ playerId, name }));
const OPP = ['FBC Heidelberg', 'Karlsruhe Giants', 'SV Tuebingen Sharks', 'Breisgau Bandits'];
const md = (number, date, opp, status = 'abgeschlossen') => ({ number, date, status, teamGames: { 'VfB Ulm': [number * 10], [opp]: [number * 10] }, games: [] });
const MATCHDAYS = {
  '25/26': [
    ...Array.from({ length: 8 }, (_, i) => md(i + 1, i === 7 ? '2026-04-11' : `2025-10-${String(10 + i).padStart(2, '0')}`, OPP[i % 2 === 0 ? 0 : 1])),
    md(9, '2026-05-02', OPP[2], 'geplant'),
    { number: null, date: '2026-06-06', status: 'geplant', teamGames: { 'VfB Ulm': [1], [OPP[3]]: [1] }, games: [] },
  ],
  '24/25': [md(1, '2025-01-05', 'Alt Team'), md(2, '2025-01-12', 'Alt Team')],
};

function boot({ players = PLAYERS, matchdays = MATCHDAYS, screen = 'main', activeSeasonKey = '25/26', rejectMatchday = false } = {}) {
  const S = { screen, page: 'team', activeSeasonKey, selectedSeasonKey: activeSeasonKey, asOf: null, activeMatchday: null, globalPlayerId: null };
  const calls = { player: [], matchday: [], setState: 0, storage: 0, net: 0, warn: [] };
  const doc = makeDom();
  doc.activeElement = doc.pageEl;
  const frozenPlayers = clone(players);
  const frozenMatchdays = clone(matchdays);
  const win = {
    setGlobalPlayer: (id) => { calls.player.push(id); },
    openMatchday: (k, n) => { calls.matchday.push([k, n]); return rejectMatchday ? Promise.reject(new Error('boom')) : Promise.resolve(); },
  };
  for (const k of ['localStorage', 'sessionStorage', 'indexedDB']) Object.defineProperty(win, k, { get() { calls.storage++; return null; } });
  const ctx = vm.createContext({
    window: win,
    S,
    document: doc,
    SEASON_CONFIG: { '24/25': { label: '2024/25' }, '25/26': { label: '2025/26' } },
    cleanText: (v) => String(v ?? ''),
    getAllTimePlayerRows: () => players,
    getSeasonMatchdays: (k) => matchdays[k] || [],
    getActiveSeasonKey: () => S.activeSeasonKey,
    isUlmTeamName: (n) => /ulm/i.test(String(n)),
    setState: () => { calls.setState++; },
    fetch: () => { calls.net++; return Promise.reject(new Error('kein Netzwerk')); },
    console: { warn: (...a) => calls.warn.push(a.join(' ')), log() {}, error() {} },
    Promise,
  });
  vm.runInContext(searchConsts, ctx);
  vm.runInContext(helperFunctions, ctx);
  vm.runInContext(SEARCH_FUNCTIONS.map(fnSource).join('\n'), ctx);
  vm.runInContext(SEARCH_WINDOW.map(winSource).join('\n'), ctx);
  const run = (code) => vm.runInContext(code, ctx);
  const key = (init) => {
    const e = { key: '', ctrlKey: false, metaKey: false, altKey: false, shiftKey: false, isComposing: false, target: doc.pageEl, prevented: false, ...init, preventDefault() { e.prevented = true; } };
    for (const fn of doc.listeners.keydown || []) fn(e);
    return e;
  };
  const digest = () => JSON.stringify([S, players, matchdays]);
  const state = () => run('JSON.stringify({open:GLOBAL_SEARCH.open,query:GLOBAL_SEARCH.query,active:GLOBAL_SEARCH.active,n:GLOBAL_SEARCH.results.length})');
  const type = (q) => { win.onGlobalSearchInput(q); return run('GLOBAL_SEARCH.results'); };
  const search = (q) => run(`globalSearchMatch(${JSON.stringify(q)},globalSearchEntries())`);
  return { ctx, S, doc, win, calls, run, key, digest, state, type, search, frozen: { players: frozenPlayers, matchdays: frozenMatchdays }, players, matchdays };
}
const labels = (rs) => rs.map((r) => r.label);
const ids = (rs) => rs.map((r) => r.playerId ?? r.number);

// ── Spielersuche ───────────────────────────────────────────────────────
console.log('== Spieler: Treffer, Teilstrings, Umlaute ==');
{
  const a = boot();
  assertEqual(a.search('klavins').map((r) => [r.kind, r.playerId]), [['player', 'api:1']], 'Vollname-Teil "klavins" -> genau Aivars Klavins');
  assertEqual(ids(a.search('lavi')), ['api:1'], 'Teilstring "lavi" innerhalb des Namens');
  assertEqual(ids(a.search('KLAVINS')), ['api:1'], 'Groß-/Kleinschreibung egal');
  assertEqual(ids(a.search('  klavins  ')), ['api:1'], 'Leerzeichen am Rand egal');
  assertEqual(ids(a.search('müller')), ['api:2'], '"müller" findet Björn Müller');
  assertEqual(ids(a.search('mueller')), ['api:2'], '"mueller" (Transliteration) findet ebenfalls Björn Müller');
  assertEqual(ids(a.search('bjoern')).sort(), ['api:2', 'api:3'], '"bjoern" findet Björn Müller und Bjoern Meier');
  assertEqual(ids(a.search('björn')).sort(), ['api:2', 'api:3'], '"björn" (mit Umlaut) findet dieselben zwei');
  assertEqual(ids(a.search('schröder')), ['api:6'], '"schröder" (ö -> oe) findet Daniel Schröder');
  assertEqual(ids(a.search('schroeder')), ['api:6'], '"schroeder" findet Daniel Schröder');
  assertEqual(ids(a.search('christian l')).sort(), ['api:4', 'api:5'], 'mehrere Wörter ("christian l") -> beide Christians');
  assertEqual(ids(a.search('l christian')).sort(), ['api:4', 'api:5'], 'Wortreihenfolge egal');
  assertEqual(ids(a.search('christian klavins')), [], 'alle Wörter müssen passen (kein Treffer)');
}

console.log('== Reihenfolge und Trefferlimit ==');
{
  const a = boot();
  assertEqual(labels(a.search('loser')), ['Loser Lars', 'Christian Loser'], 'Namensanfang vor Wortanfang ("Loser Lars" vor "Christian Loser")');
  assertEqual(labels(a.search('christian loser')), ['Christian Loser'], 'exakter Name');
  assertEqual(labels(a.search('christian')), ['Christian Loser', 'Christian Löwe'], 'gleicher Score: alphabetisch (de), Loser vor Löwe');
  const rev = boot({ players: [...PLAYERS].reverse() });
  assertEqual(rev.search('christian').map((r) => r.playerId), a.search('christian').map((r) => r.playerId), 'Reihenfolge unabhängig von der Eingabereihenfolge der Quelle');
  assertEqual(rev.search('max').map((r) => r.playerId), a.search('max').map((r) => r.playerId), 'Reihenfolge bei vielen Treffern deterministisch');
  const max = a.search('max');
  assertEqual(max.length, 6, '10 Treffer werden auf das Spielerlimit (6) begrenzt');
  assertEqual(labels(max), ['Max Muster A', 'Max Muster B', 'Max Muster C', 'Max Muster D', 'Max Muster E', 'Max Muster F'], 'Limit behält die alphabetisch ersten Treffer');
  const sp = a.search('spieltag');
  assertEqual(sp.length, 5, '9 Spieltage werden auf das Spieltag-Limit (5) begrenzt');
  assertEqual(sp.map((r) => r.number), [1, 2, 3, 4, 5], 'Spieltage aufsteigend nach Nummer');
  assertEqual(a.run('GLOBAL_SEARCH_LIMITS'), { player: 6, matchday: 5 }, 'Limits sind feste Konstanten');
  const mixed = a.search('a');
  assertTrue(mixed.every((r, i, arr) => i === 0 || !(arr[i - 1].kind === 'matchday' && r.kind === 'player')), 'Spieler stehen immer vor Spieltagen');
}

console.log('== Leere Eingabe / kein Treffer ==');
{
  const a = boot();
  for (const q of ['', '   ', '!!!', '...', null, undefined]) assertEqual(a.search(q ?? ''), [], `Eingabe ${JSON.stringify(q)} -> keine Treffer`);
  assertEqual(a.run(`rGlobalSearchResultsHtml([],'',0)`), '', 'leere Anfrage -> keine Trefferliste (leerer String)');
  assertEqual(a.run(`rGlobalSearchResultsHtml([],'   ',0)`), '', 'Leerzeichen -> keine Trefferliste');
  const none = a.run(`rGlobalSearchResultsHtml(globalSearchMatch('zzzz',globalSearchEntries()),'zzzz',0)`);
  assertEqual(none, '<div class="ui-notiz">Keine Treffer für „zzzz“.</div>', 'kein Treffer -> bestehende uiNotiz-Meldung');
  const xss = a.run(`rGlobalSearchResultsHtml([], '<b>x</b>', 0)`);
  assertTrue(!xss.includes('<b>') && xss.includes('&lt;b&gt;'), 'Suchtext wird in der Meldung maskiert');
  assertTrue(a.search('x'.repeat(500)).length === 0, 'sehr lange Anfrage: keine Treffer, kein Fehler');
  assertEqual(a.run(`globalSearchTokens('a'.repeat(200)).join('').length`), 60, 'Anfrage wird auf 60 Zeichen begrenzt');
}

// ── Spieltagssuche ─────────────────────────────────────────────────────
console.log('== Spieltage ==');
{
  const a = boot();
  assertEqual(a.search('7').map((r) => [r.kind, r.number]), [['matchday', 7]], 'Zahl "7" -> Spieltag 7 (keine Datumsteile wie 07)');
  assertEqual(a.search('spieltag 7').map((r) => r.number), [7], '"spieltag 7"');
  assertEqual(a.search('Spieltag 3').map((r) => r.number), [3], 'Groß-/Kleinschreibung');
  assertEqual(a.search('9').map((r) => r.number), [9], 'Zahl 9 (geplanter Spieltag)');
  assertEqual(a.search('10'), [], 'unbekannte Nummer 10 -> kein Treffer (kein Monatstreffer bei einer einzelnen Zahl)');
  assertEqual(a.search('11'), [], 'einzelne Zahl 11 -> kein Treffer (Tag 11 zählt nur bei datumsartiger Anfrage)');
  assertEqual(a.search('11.04.2026').map((r) => r.number), [8], 'Datum TT.MM.JJJJ -> Spieltag 8');
  assertEqual(a.search('2026-04-11').map((r) => r.number), [8], 'Datum ISO -> Spieltag 8');
  assertEqual(a.search('04').map((r) => r.number), [4], 'führende Null: "04" = Spieltag 4 (kein Monatstreffer bei einer einzelnen Zahl)');
  assertEqual(a.search('11.04').map((r) => r.number), [8], 'datumsartig "11.04" (Tag.Monat) -> Spieltag 8');
  assertEqual(a.search('10.2025').map((r) => r.number), [1, 2, 3, 4, 5], 'datumsartig "10.2025" -> Oktober 2025 (Limit 5)');
  assertEqual(a.search('2026').map((r) => r.number), [8, 9], 'Jahr 2026 -> Spieltage 8, 9');
  assertEqual(a.search('202').map((r) => r.number), [1, 2, 3, 4, 5], 'Jahrespräfix (3 Ziffern), auf das Limit begrenzt');
  assertEqual(a.search('heidelberg').map((r) => r.number), [1, 3, 5, 7], 'Gegnername (Teilstring) -> Spieltage mit diesem Gegner');
  assertEqual(a.search('karlsruhe').map((r) => r.number), [2, 4, 6, 8], 'anderer Gegner');
  assertEqual(a.search('geplant').map((r) => r.number), [9], 'Status "geplant" -> Spieltag 9');
  assertEqual(a.search('vfb'), [], 'Ulm-Team zählt nicht als Gegner');
  assertTrue(!a.search('spieltag').some((r) => r.number === null), 'Spieltag ohne Nummer erscheint nie');
  assertEqual(a.search('alt team'), [], 'Spieltage anderer Saisons werden nicht durchsucht');
  const s8 = a.search('11.04.2026')[0];
  assertEqual([s8.seasonKey, s8.label, s8.meta], ['25/26', 'Spieltag 8 · 11.04.2026', '2025/26 · Karlsruhe Giants · Abgeschlossen'], 'Eintrag: Saison, Bezeichnung mit deutschem Datum, Meta (Saison · Gegner · Status)');
  a.S.activeSeasonKey = '24/25'; a.S.selectedSeasonKey = '24/25';
  assertEqual(a.search('spieltag').map((r) => [r.seasonKey, r.number]), [['24/25', 1], ['24/25', 2]], 'aktive Saison bestimmt die Spieltage');
  const noSeason = boot({ activeSeasonKey: '' });
  assertEqual(noSeason.search('spieltag'), [], 'keine aktive Saison -> keine Spieltage');
  const none = boot({ players: [] });
  assertEqual(none.search('klavins'), [], 'keine Spielerdaten -> keine Spielertreffer, kein Fehler');
}

// ── Navigation ─────────────────────────────────────────────────────────
console.log('== Navigation über die bestehenden Öffner ==');
{
  const a = boot(); a.run('initGlobalSearch()');
  a.win.openGlobalSearch();
  a.type('klavins');
  a.key({ key: 'Enter', target: a.doc.input() });
  assertEqual([a.calls.player, a.calls.matchday], [['api:1'], []], 'Enter auf Spielertreffer -> setGlobalPlayer("api:1"), kein openMatchday');
  assertEqual(a.state(), '{"open":false,"query":"","active":0,"n":0}', 'nach der Aktivierung ist die Suche geschlossen und zurückgesetzt');
  assertTrue(a.doc.getOverlay().hidden && a.doc.getOverlay()._html === '', 'Overlay ausgeblendet und leer');

  const b = boot(); b.run('initGlobalSearch()');
  b.win.openGlobalSearch();
  b.type('7');
  b.key({ key: 'Enter', target: b.doc.input() });
  assertEqual([b.calls.player, b.calls.matchday], [[], [['25/26', 7]]], 'Enter auf Spieltagstreffer -> openMatchday("25/26", 7), kein setGlobalPlayer');

  const c = boot();
  c.win.openGlobalSearch();
  c.type('christian');
  c.win.activateGlobalSearchResult(1);
  assertEqual(c.calls.player, ['api:5'], 'Klick auf den zweiten Treffer aktiviert genau diesen (Christian Löwe)');
  c.win.activateGlobalSearchResult(0);
  assertEqual(c.calls.player, ['api:5'], 'nach dem Schließen ist ein weiterer Klick wirkungslos');

  const d = boot();
  d.win.openGlobalSearch();
  d.type('spieltag');
  d.win.activateGlobalSearchResult(2);
  assertEqual(d.calls.matchday, [['25/26', 3]], 'Klick auf dritten Spieltagstreffer -> openMatchday("25/26", 3)');

  const e = boot();
  e.win.openGlobalSearch();
  e.type('christian');
  e.win.activateGlobalSearchResult(99);
  assertEqual([e.calls.player.length, e.state()], [0, '{"open":true,"query":"christian","active":0,"n":2}'], 'ungültiger Index: keine Navigation, Suche bleibt offen');

  const f = boot({ rejectMatchday: true }); f.run('initGlobalSearch()');
  f.win.openGlobalSearch();
  f.type('7');
  f.key({ key: 'Enter', target: f.doc.input() });
  await new Promise((r) => setTimeout(r, 10));
  assertEqual([f.calls.matchday, f.calls.warn.length], [[['25/26', 7]], 1], 'abgelehntes openMatchday: Warnung, kein unbehandeltes Promise');
}

// ── Tastatur ───────────────────────────────────────────────────────────
console.log('== Tastatur: "/" ==');
{
  const a = boot();
  a.run('initGlobalSearch()');
  const e1 = a.key({ key: '/', target: a.doc.pageEl });
  assertEqual([e1.prevented, a.state() === '{"open":true,"query":"","active":0,"n":0}', a.doc.activeElement === a.doc.input()], [true, true, true], '"/" auf normaler Seite: öffnet und fokussiert das Suchfeld');
  a.win.closeGlobalSearch();
  for (const tag of ['INPUT', 'TEXTAREA', 'SELECT']) {
    const b = boot();
    b.run('initGlobalSearch()');
    const e = b.key({ key: '/', target: { tagName: tag } });
    assertEqual([e.prevented, JSON.parse(b.state()).open, b.doc.getOverlay()], [false, false, null], `"/" in <${tag.toLowerCase()}> löst nicht aus (kein preventDefault, kein Overlay)`);
  }
  const ce = boot(); ce.run('initGlobalSearch()');
  assertEqual([ce.key({ key: '/', target: { tagName: 'DIV', isContentEditable: true } }).prevented, JSON.parse(ce.state()).open], [false, false], '"/" in contenteditable löst nicht aus');
  for (const mod of [{ ctrlKey: true }, { metaKey: true }, { altKey: true }]) {
    const b = boot(); b.run('initGlobalSearch()');
    assertEqual(JSON.parse((b.key({ key: '/', ...mod }), b.state())).open, false, `"/" mit ${Object.keys(mod)[0]} löst nicht aus`);
  }
  const open = boot(); open.run('initGlobalSearch()');
  open.win.openGlobalSearch();
  const e2 = open.key({ key: '/', target: open.doc.input() });
  assertEqual([e2.prevented, JSON.parse(open.state()).open], [false, true], '"/" im offenen Suchfeld wird normal eingegeben (kein preventDefault)');
  const cover = boot({ screen: 'cover' }); cover.run('initGlobalSearch()');
  assertEqual([cover.key({ key: '/' }).prevented, cover.key({ key: 'k', ctrlKey: true }).prevented, cover.doc.getOverlay()], [false, false, null], 'Cover (screen != main): keine Kürzel, kein Overlay');
  const comp = boot(); comp.run('initGlobalSearch()');
  assertEqual([comp.key({ key: '/', isComposing: true }).prevented, JSON.parse(comp.state()).open], [false, false], 'IME-Komposition wird ignoriert');
}

console.log('== Tastatur: Strg+K / Cmd+K / Escape / Pfeile / Enter / Tab ==');
{
  for (const mod of [{ ctrlKey: true }, { metaKey: true }]) {
    const a = boot(); a.run('initGlobalSearch()');
    const e = a.key({ key: 'k', ...mod });
    assertEqual([e.prevented, JSON.parse(a.state()).open, a.doc.activeElement === a.doc.input()], [true, true, true], `${Object.keys(mod)[0] === 'ctrlKey' ? 'Strg' : 'Cmd'}+K öffnet und fokussiert`);
    const up = boot(); up.run('initGlobalSearch()');
    assertEqual(JSON.parse((up.key({ key: 'K', ...mod }), up.state())).open, true, `${Object.keys(mod)[0]}+K auch mit großem K`);
  }
  const inField = boot(); inField.run('initGlobalSearch()');
  assertEqual([inField.key({ key: 'k', ctrlKey: true, target: { tagName: 'INPUT' } }).prevented, JSON.parse(inField.state()).open], [true, true], 'Strg+K funktioniert auch aus einem Eingabefeld');
  const sh = boot(); sh.run('initGlobalSearch()');
  assertEqual([sh.key({ key: 'k', ctrlKey: true, shiftKey: true }).prevented, sh.key({ key: 'k', ctrlKey: true, altKey: true }).prevented, JSON.parse(sh.state()).open], [false, false, false], 'Strg+Shift+K / Strg+Alt+K lösen nicht aus');
  const plain = boot(); plain.run('initGlobalSearch()');
  assertEqual([plain.key({ key: 'k' }).prevented, JSON.parse(plain.state()).open], [false, false], 'einfaches "k" löst nicht aus');

  // erneutes Strg+K bei offener Suche behält die Eingabe
  const re = boot(); re.run('initGlobalSearch()');
  re.key({ key: 'k', ctrlKey: true }); re.type('kla');
  re.doc.pageEl.focus();
  re.key({ key: 'k', ctrlKey: true });
  assertEqual([JSON.parse(re.state()).query, re.doc.activeElement === re.doc.input()], ['kla', true], 'Strg+K bei offener Suche: Eingabe bleibt, Fokus zurück ins Feld');

  // Escape: schließt, setzt zurück, gibt Fokus zurück
  const esc = boot(); esc.run('initGlobalSearch()');
  esc.doc.pageEl.focus();
  esc.key({ key: '/' });
  esc.type('klavins');
  const eEsc = esc.key({ key: 'Escape', target: esc.doc.input() });
  assertEqual([eEsc.prevented, esc.state(), esc.doc.getOverlay().hidden, esc.doc.getOverlay()._html, esc.doc.activeElement === esc.doc.pageEl], [true, '{"open":false,"query":"","active":0,"n":0}', true, '', true], 'Escape: schließt, Suchzustand zurückgesetzt, Overlay leer, Fokus zurück auf das vorherige Element');
  esc.key({ key: '/' });
  assertEqual(JSON.parse(esc.state()).query, '', 'erneutes Öffnen startet leer');
  const esc2 = boot(); esc2.run('initGlobalSearch()');
  assertEqual(esc2.key({ key: 'Escape' }).prevented, false, 'Escape bei geschlossener Suche: kein preventDefault (Hall-of-Fame-Intro etc. unberührt)');
  const gone = boot(); gone.run('initGlobalSearch()');
  gone.doc.pageEl.focus(); gone.key({ key: '/' });
  gone.doc.pageEl.inDoc = false; // Element durch render() ersetzt
  gone.key({ key: 'Escape' });
  assertEqual(gone.doc.activeElement === gone.doc.toggle, true, 'ist das vorherige Element verschwunden (Neuaufbau), geht der Fokus auf die Such-Schaltfläche');

  // Pfeile / Enter / Tab
  const nav = boot(); nav.run('initGlobalSearch()');
  nav.key({ key: '/' });
  nav.type('christian');
  assertEqual(nav.state(), '{"open":true,"query":"christian","active":0,"n":2}', 'Vorbedingung: 2 Treffer, erster aktiv');
  let m = nav.doc.results();
  assertTrue(/ia-search-item active" role="option" tabindex="-1" id="ia-search-opt-0" aria-selected="true"/.test(m) && /id="ia-search-opt-1" aria-selected="false"/.test(m), 'aktiver Treffer erkennbar (Klasse active, aria-selected=true)');
  assertEqual(nav.doc.input().attrs['aria-activedescendant'], 'ia-search-opt-0', 'aria-activedescendant zeigt auf den aktiven Treffer');
  const down = nav.key({ key: 'ArrowDown', target: nav.doc.input() });
  assertEqual([down.prevented, JSON.parse(nav.state()).active, nav.doc.input().attrs['aria-activedescendant']], [true, 1, 'ia-search-opt-1'], 'Pfeil runter: zweiter Treffer aktiv');
  nav.key({ key: 'ArrowDown', target: nav.doc.input() });
  assertEqual(JSON.parse(nav.state()).active, 0, 'Pfeil runter am Ende springt an den Anfang');
  nav.key({ key: 'ArrowUp', target: nav.doc.input() });
  assertEqual(JSON.parse(nav.state()).active, 1, 'Pfeil hoch am Anfang springt ans Ende');
  nav.key({ key: 'Enter', target: nav.doc.input() });
  assertEqual(nav.calls.player, ['api:5'], 'Enter aktiviert den markierten (zweiten) Treffer');
  const tab = boot(); tab.run('initGlobalSearch()');
  tab.key({ key: '/' }); tab.type('christian');
  tab.doc.pageEl.focus();
  const eTab = tab.key({ key: 'Tab', target: tab.doc.pageEl });
  assertEqual([eTab.prevented, tab.doc.activeElement === tab.doc.input()], [true, true], 'Tab bleibt im Dialog (Fokus zurück ins Suchfeld)');
  const noRes = boot(); noRes.run('initGlobalSearch()');
  noRes.key({ key: '/' }); noRes.type('zzzz');
  noRes.key({ key: 'Enter', target: noRes.doc.input() });
  noRes.key({ key: 'ArrowDown', target: noRes.doc.input() });
  assertEqual([noRes.calls.player.length, noRes.calls.matchday.length, JSON.parse(noRes.state()).open], [0, 0, true], 'ohne Treffer: Enter/Pfeile bewirken nichts, Suche bleibt offen');
  const empty = boot(); empty.run('initGlobalSearch()');
  empty.key({ key: '/' });
  empty.key({ key: 'Enter', target: empty.doc.input() });
  assertEqual([empty.calls.player.length, JSON.parse(empty.state()).open], [0, true], 'leere Eingabe: Enter bewirkt nichts');
  const closedKeys = boot(); closedKeys.run('initGlobalSearch()');
  assertEqual(['ArrowDown', 'ArrowUp', 'Enter', 'Tab'].map((k) => closedKeys.key({ key: k }).prevented), [false, false, false, false], 'bei geschlossener Suche werden Pfeile/Enter/Tab nicht abgefangen');
}

console.log('== Bestehende Handler bleiben unberührt ==');
{
  const a = boot(); a.run('initGlobalSearch()');
  let hof = 0;
  a.doc.addEventListener('keydown', (e) => { if (e.key === 'Escape') hof++; }); // wie der HoF-Intro-Handler
  a.key({ key: 'Escape' });
  assertEqual(hof, 1, 'Escape bei geschlossener Suche erreicht weiterhin andere Handler');
  a.key({ key: '/' });
  a.key({ key: 'Escape' });
  assertEqual(hof, 2, 'Escape bei offener Suche wird nicht verschluckt (kein stopPropagation)');
  assertTrue(!/stopPropagation|stopImmediatePropagation/.test(searchCode), 'Suchcode ruft weder stopPropagation noch stopImmediatePropagation auf');
  assertTrue(/keyHandler:e=>\{\n\s*if\(e\.key==='Escape'\)cancelHallOfFameIntro\(\);\n\s*\},/.test(html), 'Hall-of-Fame-Tastaturhandler im Quelltext unverändert');
  a.run('initGlobalSearch()'); a.run('initGlobalSearch()');
  assertEqual(a.doc.listeners.keydown.length, 2, 'initGlobalSearch ist idempotent: genau ein Such-Listener (plus der Test-Listener)');
  assertEqual((stripComments(html).match(/document\.addEventListener\('DOMContentLoaded',initGlobalSearch\);/g) || []).length, 1, 'initGlobalSearch wird genau einmal an DOMContentLoaded gehängt');
}

// ── Reinheit / Unabhängigkeit ──────────────────────────────────────────
console.log('== Reinheit: kein State, Storage, Netzwerk; keine Datenmutation ==');
{
  const a = boot(); a.run('initGlobalSearch()');
  const d0 = a.digest();
  a.key({ key: '/' });
  for (const q of ['k', 'kl', 'klavins', 'christian', '7', 'spieltag', 'zzzz', '', 'müller']) a.type(q);
  a.key({ key: 'ArrowDown' }); a.key({ key: 'ArrowUp' });
  a.key({ key: 'Escape' });
  a.key({ key: 'k', ctrlKey: true }); a.type('heidelberg'); a.key({ key: 'Escape' });
  assertEqual(a.digest(), d0, 'S, Spielerdaten und Spieltagsdaten nach Öffnen/Tippen/Schließen unverändert');
  assertEqual([a.calls.setState, a.calls.storage, a.calls.net, a.calls.player.length, a.calls.matchday.length], [0, 0, 0, 0, 0], 'kein setState, kein Storage-Zugriff, kein Netzwerk, keine Navigation durch die reine Suche');
  assertEqual([JSON.stringify(a.players) === JSON.stringify(a.frozen.players), JSON.stringify(a.matchdays) === JSON.stringify(a.frozen.matchdays)], [true, true], 'Quelldaten byte-identisch');
  assertEqual(a.state(), '{"open":false,"query":"","active":0,"n":0}', 'Suchzustand nach dem Schließen leer (Anfrage wird nicht behalten)');
  assertTrue(!/localStorage|sessionStorage|indexedDB|fetch\(|XMLHttpRequest|setState\(|location|history\./.test(searchCode), 'Quelltext: kein Storage, Netzwerk, setState, Routing');
  assertTrue(!/\bS\.[A-Za-z]+\s*=[^=]|\bS\s*=[^=]|\bS=\{/.test(searchCode.replace(/GLOBAL_SEARCH\s*=/g, '')), 'Quelltext schreibt nicht in S');
  assertTrue(!/getGlobalAllTime|LINEUP_DATA|EINSATZ|SEASON_DATA_PREVIEW/.test(searchCode), 'kein Zugriff auf Einsatz-Center-, Vorschau- oder Lineup-Daten');
}

console.log('== Umfang v1: nur Spieler und Spieltage ==');
{
  assertTrue(!/Lexik|lexicon|aliases|ALIAS|rLexiconPage|coreCriteria|CORE_ROLE_LABELS|TRAIT_LABELS|standings|gamesData/i.test(searchCode), 'kein Lexikon, keine Aliasse, keine Teams/Spiele im Suchcode');
  const called = [...searchCode.matchAll(/\b(get[A-Z]\w+)\(/g)].map((m) => m[1]).filter((v, i, arr) => v !== 'getElementById' && arr.indexOf(v) === i).sort();
  assertEqual(called, ['getActiveSeasonKey', 'getAllTimePlayerRows', 'getSeasonMatchdays'], 'Datenquellen: nur getAllTimePlayerRows, getSeasonMatchdays, getActiveSeasonKey');
  const nav = [...searchCode.matchAll(/window\.(set\w+|open\w+)\(/g)].map((m) => m[1]).filter((v, i, arr) => arr.indexOf(v) === i).sort();
  assertEqual(nav, ['openGlobalSearch', 'openMatchday', 'setGlobalPlayer'], 'Navigation ausschließlich über setGlobalPlayer und openMatchday');
  const kinds = new Set(boot().search('a').map((r) => r.kind));
  assertTrue([...kinds].every((k) => k === 'player' || k === 'matchday'), 'Trefferarten: nur player und matchday');
}

console.log('== Keine Abhängigkeit von rContextBar / Einbindung in rIaShell ==');
{
  assertTrue(!/rContextBar|rAsOfSelector|rMainNav|getSeasonDataState/.test(searchCode), 'Suchcode nennt rContextBar/rAsOfSelector/rMainNav/getSeasonDataState nicht');
  const a = boot();
  assertEqual(a.run('typeof rContextBar'), 'undefined', 'Vorbedingung: rContextBar existiert im Testkontext nicht');
  a.win.openGlobalSearch();
  assertEqual(labels(a.type('klavins')), ['Aivars Klavins'], 'Suche funktioniert vollständig ohne rContextBar');
  const barSrc = stripComments(fnSource('rContextBar'));
  assertTrue(!/Search|search/.test(barSrc), 'rContextBar enthält nichts von der Suche');
  const shell = stripComments(fnSource('rIaShell'));
  assertEqual(shell.replace(/\s+/g, ''), 'functionrIaShell(){return`<divclass="ia-search-row">${rGlobalSearchToggle()}${rToolMenu()}</div>${rContextBar()}${rMainNav()}${rMainNavBottom()}`;}', 'rIaShell: Such-Zeile (Suche, Werkzeugmenü), dann unveränderte Kontextleiste und Hauptnavigation, zuletzt die mobile untere Leiste');
  const b = boot();
  b.ctx.rContextBar = () => '<BAR/>'; b.ctx.rMainNav = () => '<NAV/>'; b.ctx.rToolMenu = () => '<TOOLS/>'; b.ctx.rMainNavBottom = () => '<BOTTOM/>';
  assertEqual(b.run('rIaShell()'), `<div class="ia-search-row">${b.run('rGlobalSearchToggle()')}<TOOLS/></div><BAR/><NAV/><BOTTOM/>`, 'rIaShell-Zusammenbau (mit Platzhaltern)');
  const toggle = b.run('rGlobalSearchToggle()');
  assertTrue(/<button type="button" class="ia-search-toggle" data-ia-search-toggle aria-label="[^"]+" aria-haspopup="dialog" onclick="openGlobalSearch\(\)">/.test(toggle), 'Schaltfläche: button, aria-label, aria-haspopup, onclick');
  assertEqual((stripComments(html).match(/rGlobalSearchToggle\(\)/g) || []).length, 2, 'Schaltfläche: nur Definition und der eine Aufruf in rIaShell');
}

console.log('== Accessibility-Markup ==');
{
  const a = boot();
  a.win.openGlobalSearch();
  const ov = a.doc.getOverlay();
  assertEqual([ov.attrs.role, ov.attrs['aria-modal'], ov.attrs['aria-label'], ov.id], ['dialog', 'true', 'Suche', 'ia-search-overlay'], 'Overlay: role=dialog, aria-modal, aria-label, eindeutige ID');
  assertTrue(/<input type="search" id="ia-search-input" class="ia-search-input" role="combobox" aria-expanded="true" aria-controls="ia-search-results" aria-autocomplete="list" aria-label="Suche nach Spielern und Spieltagen"/.test(ov._html), 'Suchfeld: type=search, combobox, aria-controls, beschriftet');
  assertTrue(/id="ia-search-results" class="ia-search-results" role="listbox" aria-label="Suchergebnisse" aria-live="polite"/.test(ov._html), 'Trefferliste: listbox, beschriftet, aria-live=polite');
  a.type('christian');
  assertTrue(/role="presentation">Spieler<\/div>/.test(a.doc.results()) && /role="option"/.test(a.doc.results()), 'Gruppenüberschrift "Spieler" und option-Einträge');
  a.type('spieltag');
  assertTrue(/role="presentation">Spieltage<\/div>/.test(a.doc.results()), 'Gruppenüberschrift "Spieltage"');
  a.type('a');
  const html2 = a.doc.results();
  assertEqual((html2.match(/role="presentation"/g) || []).length, 2, 'gemischte Treffer: je Art genau eine Gruppenüberschrift');
  assertEqual(ov.attrs.onclick, 'if(event.target===this)closeGlobalSearch()', 'Klick auf den Hintergrund schließt (nur direkter Klick)');
  a.win.openGlobalSearch();
  assertEqual(a.doc.body.children.length, 1, 'wiederholtes Öffnen erzeugt kein zweites Overlay');
}

console.log('== CSS: nur .ia-search-* ==');
{
  const start = html.indexOf('/* ═══ P0b-Fix 4');
  const end = html.indexOf('  .ia-search-overlay{padding-top:8vh}\n}', start);
  assertTrue(start > 0 && end > start, 'CSS-Block gefunden');
  const block = html.slice(start, end + '  .ia-search-overlay{padding-top:8vh}\n}'.length);
  const selectors = [...block.replace(/\/\*[^]*?\*\//g, '').matchAll(/(^|\n|\{)\s*([.@][^{}\n]+?)\s*\{/g)].map((m) => m[2]).filter((s) => !s.startsWith('@media'));
  assertTrue(selectors.length >= 10 && selectors.every((s) => s.startsWith('.ia-search')), `alle ${selectors.length} Selektoren im Namensraum .ia-search*`);
  const rule = (sel) => new RegExp(`^${sel.replace(/[.[\]()]/g, '\\$&')}\\{([^}]*)\\}`, 'm').exec(block)?.[1] ?? '';
  for (const sel of ['.ia-search-toggle', '.ia-search-input', '.ia-search-item']) assertTrue(/min-height:44px/.test(rule(sel)), `${sel}: Tippfläche min-height 44px`);
  assertTrue(!/overflow-x|white-space:\s*nowrap/.test(block), 'kein overflow-x, kein nowrap');
  assertTrue(/width:100%/.test(rule('.ia-search-panel')) && /max-width:520px/.test(rule('.ia-search-panel')) && /box-sizing:border-box/.test(rule('.ia-search-panel')), 'Panel: 100% Breite mit max-width, border-box (kein Überlauf bei 360 px)');
  assertTrue(/\.ia-search-overlay\[hidden\]\{display:none\}/.test(block), 'hidden blendet das Overlay wirklich aus');
}

console.log('');
if (failures > 0) {
  console.log(`${failures} Test(s) fehlgeschlagen.`);
  process.exitCode = 1;
} else {
  console.log('Alle Tests erfolgreich.');
  process.exitCode = 0;
}

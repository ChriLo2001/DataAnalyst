#!/usr/bin/env node
// P0b-Fix 5 — Test für das Werkzeugmenü v1 (Spezifikation 6.3, Entscheidung 11):
// additiv, genau drei Einträge (Lexikon, Excel-Export, Cover), die ausschließlich die bestehenden
// Öffner openLexicon() / exportExcel() / backToHome() aufrufen.
//
// Die echten Funktionen (rToolMenu, toolMenu*, openToolMenu/closeToolMenu/toggleToolMenu/
// activateToolMenuItem, initToolMenu, TOOL_MENU_ITEMS, globalSearchKeyAction, escHtml) werden
// unverändert aus dem index.html-Text geschnitten und in node:vm ausgeführt. Das Fake-DOM wird aus
// dem echten Markup von rToolMenu() aufgebaut (Auslöser, Liste, Einträge samt Attributen) und
// verfolgt Fokus und Listener (Capture vor Bubble). Die drei Öffner sind Spione. Liest index.html
// nur lesend, schreibt nichts.
//
// Aufruf: node scripts/test-p0b-tool-menu.mjs

import { readFile } from 'node:fs/promises';
import crypto from 'node:crypto';
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
const stripComments = (s) => s.split('\n').filter((l) => !l.trim().startsWith('//') && !l.trim().startsWith('*') && !l.trim().startsWith('/*')).join('\n');
const sha = (s) => crypto.createHash('sha256').update(s).digest('hex').slice(0, 16);

const constStart = html.indexOf('const TOOL_MENU_ITEMS=[');
const constSource = html.slice(constStart, html.indexOf('\n];', constStart) + 3);
const TOOL_FUNCTIONS = ['rToolMenu', 'toolMenuElements', 'toolMenuItemElements', 'isToolMenuOpen', 'toolMenuOnKeydown', 'toolMenuOnClick', 'initToolMenu'];
const TOOL_WINDOW = ['openToolMenu', 'closeToolMenu', 'toggleToolMenu', 'activateToolMenuItem'];
const toolSource = [constSource, ...TOOL_FUNCTIONS.map(fnSource), ...TOOL_WINDOW.map(winSource)].join('\n');
const toolCode = stripComments(toolSource);
const helpers = ['escHtml', 'cleanText', 'globalSearchKeyAction', 'globalSearchIsEditableTarget'].map((n) => (n === 'cleanText' ? 'function cleanText(v){return String(v??"");}' : fnSource(n))).join('\n');

// ── Fake-DOM aus dem echten Markup ──────────────────────────────────────
function parseAttrs(tag) {
  const attrs = {};
  for (const m of tag.matchAll(/\s([a-z-]+)(?:="([^"]*)")?/g)) attrs[m[1]] = m[2] ?? '';
  return attrs;
}
function makeDom(markup) {
  const doc = { listeners: [], activeElement: null, body: { tagName: 'BODY' } };
  const mkEl = (tag, attrsIn, extra = {}) => {
    const attrs = { ...attrsIn };
    const el = { tagName: tag, attrs, hidden: 'hidden' in attrs, inMenu: false, focusable: true, focusCount: 0, ...extra };
    delete attrs.hidden;
    el.focus = () => { doc.activeElement = el; el.focusCount++; };
    el.setAttribute = (k, v) => { attrs[k] = String(v); };
    el.getAttribute = (k) => (k in attrs ? attrs[k] : null);
    el.closest = (sel) => (sel === '[data-ia-tool-menu]' && el.inMenu ? doc.wrapper : null);
    return el;
  };
  doc.mkEl = mkEl;
  const tags = [...markup.matchAll(/<(div|button)\b([^>]*)>/g)].map((m) => ({ tag: m[1].toUpperCase(), attrs: parseAttrs(` ${m[2]}`) }));
  const wrapperTag = tags.find((t) => 'data-ia-tool-menu' in t.attrs);
  const toggleTag = tags.find((t) => t.attrs.id === 'ia-tool-menu-toggle');
  const listTag = tags.find((t) => t.attrs.id === 'ia-tool-menu-list');
  const itemTags = tags.filter((t) => t.attrs.role === 'menuitem');
  doc.wrapper = mkEl('DIV', wrapperTag?.attrs || {});
  doc.toggle = mkEl('BUTTON', toggleTag?.attrs || {}, { inMenu: true });
  doc.list = mkEl('DIV', listTag?.attrs || {}, { inMenu: true, focusable: false });
  doc.items = itemTags.map((t) => mkEl('BUTTON', t.attrs, { inMenu: true }));
  doc.list.querySelectorAll = (sel) => (sel === '[role="menuitem"]' ? doc.items : []);
  doc.getElementById = (id) => (id === 'ia-tool-menu-toggle' ? doc.toggle : id === 'ia-tool-menu-list' ? doc.list : null);
  doc.addEventListener = (type, fn, capture = false) => { doc.listeners.push({ type, fn, capture: capture === true }); };
  doc.outside = mkEl('BUTTON', { id: 'other' });
  doc.pageBg = mkEl('DIV', {}, { focusable: false });
  doc.dispatch = (type, ev) => {
    const ls = doc.listeners.filter((l) => l.type === type);
    for (const l of [...ls.filter((x) => x.capture), ...ls.filter((x) => !x.capture)]) l.fn(ev);
  };
  return doc;
}

// Markup einmal aus dem echten Quelltext erzeugen
const markupCtx = vm.createContext({ console });
vm.runInContext('function cleanText(v){return String(v??"");}', markupCtx);
vm.runInContext(fnSource('escHtml'), markupCtx);
vm.runInContext(constSource, markupCtx);
vm.runInContext(fnSource('rToolMenu'), markupCtx);
const MARKUP = vm.runInContext('rToolMenu()', markupCtx);

function bootApp({ withMenu = true } = {}) {
  const doc = makeDom(withMenu ? MARKUP : '');
  if (!withMenu) { doc.getElementById = () => null; }
  doc.activeElement = doc.pageBg;
  const calls = { lexicon: 0, export: 0, cover: 0, setState: 0, storage: 0, net: 0, warn: [] };
  const win = {
    openLexicon: () => { calls.lexicon++; },
    exportExcel: () => { calls.export++; },
    backToHome: () => { calls.cover++; },
  };
  for (const k of ['localStorage', 'sessionStorage', 'indexedDB']) Object.defineProperty(win, k, { get() { calls.storage++; return null; } });
  const ctx = vm.createContext({
    window: win, document: doc, Promise,
    setState: () => { calls.setState++; },
    fetch: () => { calls.net++; return Promise.reject(new Error('kein Netzwerk')); },
    console: { warn: (...a) => calls.warn.push(a.join(' ')), log() {}, error() {} },
  });
  vm.runInContext(helpers, ctx);
  vm.runInContext(toolSource, ctx);
  const run = (code) => vm.runInContext(code, ctx);
  const key = (init) => {
    const e = { key: '', ctrlKey: false, metaKey: false, altKey: false, shiftKey: false, isComposing: false, target: doc.pageBg, prevented: false, ...init, preventDefault() { e.prevented = true; } };
    doc.dispatch('keydown', e);
    return e;
  };
  const click = (target) => {
    doc.activeElement = target.focusable ? target : doc.body;
    const e = { target };
    doc.dispatch('click', e);
    return e;
  };
  return { ctx, doc, win, calls, run, key, click, open: () => win.openToolMenu(), isOpen: () => !doc.list.hidden };
}

// ── Vorhandensein und Markup ────────────────────────────────────────────
console.log('== Vorhandensein und Markup ==');
{
  for (const n of TOOL_FUNCTIONS) assertTrue(new RegExp(`\\nfunction ${n}\\(`).test(html), `Funktion ${n} existiert`);
  for (const n of TOOL_WINDOW) assertTrue(html.includes(`window.${n}=function`), `window.${n} existiert`);
  const app = bootApp();
  const d = app.doc;
  assertEqual(d.items.map((i) => i.attrs['data-ia-tool-menu-item']), ['lexicon', 'export', 'cover'], 'genau drei Einträge: lexicon, export, cover (in dieser Reihenfolge)');
  assertEqual(app.run('TOOL_MENU_ITEMS.map(i=>i.label)'), ['Lexikon', 'Excel-Export', 'Cover'], 'Beschriftungen: Lexikon, Excel-Export, Cover');
  assertTrue(d.items.length === 3 && d.items.every((i) => i.attrs.role === 'menuitem' && i.attrs.tabindex === '-1' && i.attrs.type === 'button'), 'alle Einträge: type=button, role=menuitem, tabindex=-1 (Fokus per Tastatur gesteuert)');
  assertEqual([...MARKUP.matchAll(/class="ia-tool-menu-item"[^>]*>([^<]*)</g)].map((m) => m[1]), ['Lexikon', 'Excel-Export', 'Cover'], 'sichtbarer Text der Einträge');
  assertTrue(!/Daten und Import|Einstellungen|Import/.test(MARKUP), 'kein Eintrag "Daten und Import" / "Einstellungen" (bewusst noch nicht aufgenommen)');
  assertEqual([d.toggle.attrs['aria-haspopup'], d.toggle.attrs['aria-expanded'], d.toggle.attrs['aria-controls'], d.toggle.attrs.type], ['menu', 'false', 'ia-tool-menu-list', 'button'], 'Auslöser: aria-haspopup=menu, aria-expanded=false, aria-controls, type=button');
  assertEqual([d.list.attrs.role, d.list.attrs['aria-label'], d.list.hidden, d.list.attrs.id], ['menu', 'Werkzeuge', true, 'ia-tool-menu-list'], 'Liste: role=menu, beschriftet, initial hidden');
  assertTrue(/onclick="toggleToolMenu\(\)"/.test(MARKUP) && [...MARKUP.matchAll(/onclick="activateToolMenuItem\('(\w+)'\)"/g)].map((m) => m[1]).join() === 'lexicon,export,cover', 'Inline-Handler: toggleToolMenu() und activateToolMenuItem(key) je Eintrag');
  assertTrue(/<span class="ia-tool-menu-icon" aria-hidden="true">[^<]+<\/span>Werkzeuge<\/button>/.test(MARKUP), 'Auslöser: dekoratives Symbol (aria-hidden) plus sichtbarer Text "Werkzeuge"');
  assertEqual(app.run('escHtml("<b>")'), '&lt;b&gt;', 'Vorbedingung: Beschriftungen laufen durch escHtml');
}

// ── Öffnen / Schließen / aria-expanded ─────────────────────────────────
console.log('== Öffnen, Schließen, aria-expanded, Fokus ==');
{
  const a = bootApp();
  assertEqual([a.isOpen(), a.doc.toggle.attrs['aria-expanded']], [false, 'false'], 'Ausgangszustand: geschlossen');
  a.win.toggleToolMenu();
  assertEqual([a.isOpen(), a.doc.toggle.attrs['aria-expanded'], a.doc.activeElement === a.doc.items[0]], [true, 'true', true], 'Klick auf den Auslöser öffnet: aria-expanded=true, Fokus auf dem ersten Eintrag (nicht verloren)');
  a.win.toggleToolMenu();
  assertEqual([a.isOpen(), a.doc.toggle.attrs['aria-expanded'], a.doc.activeElement === a.doc.toggle], [false, 'false', true], 'zweiter Klick schließt: aria-expanded=false, Fokus zurück auf dem Auslöser');
  a.win.openToolMenu(); a.win.openToolMenu();
  assertEqual([a.isOpen(), a.doc.items[0].focusCount], [true, 3], 'wiederholtes Öffnen bleibt offen (Fokus jeweils auf dem ersten Eintrag)');
  a.win.closeToolMenu(false);
  assertEqual([a.isOpen(), a.doc.activeElement === a.doc.toggle], [false, false], 'closeToolMenu(false) schließt ohne Fokus zurückzugeben');
  a.win.closeToolMenu();
  assertEqual(a.doc.activeElement === a.doc.toggle, true, 'closeToolMenu() gibt den Fokus standardmäßig zurück');
  const none = bootApp({ withMenu: false });
  none.win.openToolMenu(); none.win.closeToolMenu(); none.win.toggleToolMenu(); none.win.activateToolMenuItem('lexicon');
  assertEqual([none.calls.lexicon, none.calls.warn.length], [1, 0], 'ohne Menü im DOM (z.B. Cover): Öffnen/Schließen wirkungslos und fehlerfrei');
}

console.log('== Einträge rufen genau die bestehenden Öffner auf ==');
{
  for (const [key, expected] of [['lexicon', [1, 0, 0]], ['export', [0, 1, 0]], ['cover', [0, 0, 1]]]) {
    const a = bootApp();
    a.win.openToolMenu();
    a.win.activateToolMenuItem(key);
    assertEqual([a.calls.lexicon, a.calls.export, a.calls.cover], expected, `${key}: genau der zugehörige Öffner wird einmal aufgerufen`);
    assertEqual([a.isOpen(), a.doc.toggle.attrs['aria-expanded'], a.doc.activeElement === a.doc.toggle], [false, 'false', true], `${key}: Menü schließt nach der Aktivierung, Fokus auf dem Auslöser`);
  }
  const u = bootApp();
  u.win.openToolMenu(); u.win.activateToolMenuItem('unbekannt');
  assertEqual([u.calls.lexicon + u.calls.export + u.calls.cover, u.isOpen()], [0, false], 'unbekannter Schlüssel: kein Öffner, Menü schließt trotzdem');
  const t = bootApp();
  t.win.exportExcel = () => { throw new Error('XLSX fehlt'); };
  t.win.activateToolMenuItem('export');
  assertEqual(t.calls.warn, ['Werkzeugmenü: XLSX fehlt'], 'werfender Öffner: Warnung statt Absturz');
  const r = bootApp();
  r.win.openLexicon = () => Promise.reject(new Error('lädt nicht'));
  r.win.activateToolMenuItem('lexicon');
  await new Promise((res) => setTimeout(res, 10));
  assertEqual(r.calls.warn, ['Werkzeugmenü: lädt nicht'], 'abgelehntes Promise: Warnung, kein unbehandeltes Promise');
  assertEqual(bootApp().run('typeof window.openLexicon+typeof window.exportExcel+typeof window.backToHome'), 'functionfunctionfunction', 'Vorbedingung: Öffner sind über window erreichbar');
}

// ── Tastatur ───────────────────────────────────────────────────────────
console.log('== Tastatur ==');
{
  const a = bootApp(); a.run('initToolMenu()');
  a.win.openToolMenu();
  const e1 = a.key({ key: 'Escape', target: a.doc.items[0] });
  assertEqual([e1.prevented, a.isOpen(), a.doc.toggle.attrs['aria-expanded'], a.doc.activeElement === a.doc.toggle], [true, false, 'false', true], 'Escape schließt, aria-expanded=false, Fokus zurück auf den Auslöser');
  const e2 = a.key({ key: 'Escape' });
  assertEqual(e2.prevented, false, 'Escape bei geschlossenem Menü: kein preventDefault (Hall-of-Fame-Intro/Suche unberührt)');

  const b = bootApp(); b.run('initToolMenu()');
  b.win.openToolMenu();
  b.key({ key: 'ArrowDown', target: b.doc.items[0] });
  assertEqual(b.doc.activeElement === b.doc.items[1], true, 'Pfeil runter: nächster Eintrag');
  b.key({ key: 'ArrowDown', target: b.doc.items[1] }); b.key({ key: 'ArrowDown', target: b.doc.items[2] });
  assertEqual(b.doc.activeElement === b.doc.items[0], true, 'Pfeil runter am Ende springt an den Anfang');
  b.key({ key: 'ArrowUp', target: b.doc.items[0] });
  assertEqual(b.doc.activeElement === b.doc.items[2], true, 'Pfeil hoch am Anfang springt ans Ende');
  b.key({ key: 'Home', target: b.doc.items[2] });
  assertEqual(b.doc.activeElement === b.doc.items[0], true, 'Home: erster Eintrag');
  const eEnd = b.key({ key: 'End', target: b.doc.items[0] });
  assertEqual([eEnd.prevented, b.doc.activeElement === b.doc.items[2]], [true, true], 'End: letzter Eintrag (preventDefault gegen Seiten-Scroll)');
  const eOther = b.key({ key: 'a', target: b.doc.items[2] });
  assertEqual([eOther.prevented, b.isOpen()], [false, true], 'andere Tasten bleiben unberührt');
  const eTab = b.key({ key: 'Tab', target: b.doc.items[2] });
  assertEqual([eTab.prevented, b.isOpen(), b.doc.activeElement === b.doc.toggle], [false, false, false], 'Tab schließt das Menü, ohne den Fokus zu verschieben oder Tab zu blockieren');

  const c = bootApp(); c.run('initToolMenu()');
  const eDown = c.key({ key: 'ArrowDown', target: c.doc.toggle });
  assertEqual([eDown.prevented, c.isOpen(), c.doc.activeElement === c.doc.items[0]], [true, true, true], 'Pfeil runter auf dem Auslöser öffnet das Menü (Fokus auf den ersten Eintrag)');
  const c2 = bootApp(); c2.run('initToolMenu()');
  assertEqual([c2.key({ key: 'ArrowDown' }).prevented, c2.key({ key: 'Home' }).prevented, c2.isOpen()], [false, false, false], 'Pfeile/Home außerhalb des Auslösers bei geschlossenem Menü: nichts');
  const c3 = bootApp(); c3.run('initToolMenu()'); c3.win.openToolMenu();
  assertEqual([c3.key({ key: 'Escape', isComposing: true }).prevented, c3.isOpen()], [false, true], 'IME-Komposition wird ignoriert');
  const none = bootApp({ withMenu: false }); none.run('initToolMenu()');
  assertEqual([none.key({ key: 'Escape' }).prevented, none.key({ key: 'ArrowDown' }).prevented], [false, false], 'ohne Menü im DOM: Handler tut nichts');
}

console.log('== Klick außerhalb ==');
{
  const a = bootApp(); a.run('initToolMenu()');
  a.win.openToolMenu();
  a.click(a.doc.pageBg);
  assertEqual([a.isOpen(), a.doc.toggle.attrs['aria-expanded'], a.doc.activeElement === a.doc.toggle], [false, 'false', true], 'Klick auf den Seitenhintergrund schließt; Fokus geht auf den Auslöser (kein anderes Element hat ihn)');
  const b = bootApp(); b.run('initToolMenu()');
  b.win.openToolMenu();
  b.click(b.doc.outside);
  assertEqual([b.isOpen(), b.doc.activeElement === b.doc.outside], [false, true], 'Klick auf ein anderes fokussierbares Element schließt; der Fokus bleibt dort (wird nicht gestohlen)');
  const c = bootApp(); c.run('initToolMenu()');
  c.win.openToolMenu();
  const beforeFocus = c.doc.items[0].focusCount;
  c.click(c.doc.items[0]);
  assertEqual([c.isOpen(), c.doc.items[0].focusCount], [true, beforeFocus], 'Klick innerhalb des Menüs schließt nicht (der Eintrag selbst aktiviert)');
  const d = bootApp(); d.run('initToolMenu()');
  d.click(d.doc.pageBg);
  assertEqual([d.isOpen(), d.doc.toggle.focusCount], [false, 0], 'Klick bei geschlossenem Menü: keine Wirkung, kein Fokuswechsel');
  const e = bootApp(); e.run('initToolMenu()');
  e.win.openToolMenu(); e.click(e.doc.toggle);
  assertEqual(e.isOpen(), true, 'Klick auf den Auslöser zählt als innen (das Umschalten übernimmt onclick)');
}

console.log('== Zusammenspiel mit der Suche ==');
{
  const a = bootApp();
  const seen = [];
  a.doc.addEventListener('keydown', (ev) => { seen.push({ key: ev.key, menuOpen: a.isOpen(), focusOnToggle: a.doc.activeElement === a.doc.toggle }); }); // wie der Such-Handler: Bubble, VOR dem Menü registriert
  a.run('initToolMenu()');
  const caps = a.doc.listeners.filter((l) => l.type === 'keydown');
  assertEqual(caps.map((l) => l.capture), [false, true], 'Menü-Keydown ist als Capture-Listener registriert (läuft vor dem Such-Handler)');
  assertEqual(a.doc.listeners.filter((l) => l.type === 'click').map((l) => l.capture), [false], 'Klick-Listener im Bubble');
  for (const init of [{ key: '/' }, { key: 'k', ctrlKey: true }, { key: 'K', metaKey: true }]) {
    seen.length = 0;
    a.win.openToolMenu();
    const ev = a.key({ ...init, target: a.doc.items[0] });
    assertEqual([seen[0].menuOpen, seen[0].focusOnToggle, a.isOpen(), ev.prevented], [false, true, false, false], `${init.ctrlKey ? 'Strg+K' : init.metaKey ? 'Cmd+K' : '"/"'}: Menü ist bereits geschlossen (Fokus auf dem Auslöser), bevor der Such-Handler läuft; kein preventDefault durch das Menü`);
  }
  seen.length = 0;
  a.win.openToolMenu();
  a.key({ key: 'Escape', target: a.doc.items[0] });
  assertEqual(seen.length, 1, 'Escape erreicht weiterhin Handler in der Bubble-Phase (Hall-of-Fame-Intro, Suche)');
  assertTrue(!/stopPropagation|stopImmediatePropagation/.test(toolCode), 'Menücode ruft weder stopPropagation noch stopImmediatePropagation auf');
  assertTrue(!/GLOBAL_SEARCH|openGlobalSearch|closeGlobalSearch|onGlobalSearchInput|activateGlobalSearchResult|globalSearchOnKeydown|initGlobalSearch/.test(toolCode), 'Menücode berührt keinen Suchzustand und keine Suchfunktion');
  assertEqual([...toolCode.matchAll(/\bglobalSearch\w+\(/g)].map((m) => m[0]), ['globalSearchKeyAction('], 'einzige Abhängigkeit: lesend globalSearchKeyAction() (Erkennung der Such-Kürzel)');
  const css = html.slice(html.indexOf('/* ═══ P0b-Fix 5'), html.indexOf('.ia-tool-menu-item:hover'));
  assertTrue(/\.ia-tool-menu-list\{[^}]*z-index:500/.test(css) && 500 < 1000, 'z-index des Menüs (500) liegt unter dem Such-Overlay (1000)');
  assertTrue(/\.ia-search-overlay\{[^}]*z-index:1000/.test(html), 'Vorbedingung: Such-Overlay hat z-index 1000');
  assertTrue(!/z-index:(9\d{3}|[1-9]\d{4})/.test(css), 'kein z-index im Bereich des Hall-of-Fame-Intros (9000)');
}

// ── Rendering / Reinheit ───────────────────────────────────────────────
console.log('== Rendering, Zustand, Reinheit ==');
{
  const a = bootApp(); a.run('initToolMenu()');
  a.win.openToolMenu();
  const fresh = bootApp(); // render() baut den Bereich neu auf: frisches Markup ist geschlossen
  assertEqual([fresh.isOpen(), fresh.doc.toggle.attrs['aria-expanded']], [false, 'false'], 'ein vollständiger Neuaufbau (frisches Markup) ist geschlossen');
  assertEqual(MARKUP.includes(' hidden>') || /class="ia-tool-menu-list"[^>]*\shidden>/.test(MARKUP), true, 'Quelltext-Markup liefert die Liste immer mit hidden');
  a.key({ key: 'Escape' }); a.click(a.doc.pageBg); a.win.toggleToolMenu(); a.win.activateToolMenuItem('export');
  assertEqual([a.calls.setState, a.calls.storage, a.calls.net], [0, 0, 0], 'kein setState, kein Storage-Zugriff, kein Netzwerk');
  assertTrue(!/setState|localStorage|sessionStorage|indexedDB|fetch\(|XMLHttpRequest|history\.|location|\bS\.[A-Za-z]|\bS\s*=/.test(toolCode), 'Quelltext: kein setState, Storage, Netzwerk, Routing, kein Zugriff auf S');
  const topLevel = stripComments(toolSource).split('\n').filter((l) => /^(let|var|const) /.test(l)).map((l) => l.replace(/=.*/, '').trim());
  assertEqual(topLevel, ['const TOOL_MENU_ITEMS'], 'einziger Top-Level-Wert: die konstante Eintragsliste (kein neuer Zustand)');
  assertEqual(a.doc.listeners.map((l) => `${l.type}:${l.capture}`).sort(), ['click:false', 'keydown:true'], 'initToolMenu registriert genau einen Keydown- und einen Klick-Listener');
  assertEqual((stripComments(html).match(/document\.addEventListener\('DOMContentLoaded',initToolMenu\);/g) || []).length, 1, 'initToolMenu wird genau einmal an DOMContentLoaded gehängt');
}

// ── Einbindung in rIaShell / Unveränderte Teile ────────────────────────
console.log('== Einbindung und unveränderte Bestandteile ==');
{
  const shell = stripComments(fnSource('rIaShell')).replace(/\s+/g, '');
  assertEqual(shell, 'functionrIaShell(){return`<divclass="ia-search-row">${rGlobalSearchToggle()}${rToolMenu()}</div>${rContextBar()}${rMainNav()}`;}', 'rIaShell: Suche und Werkzeugmenü nebeneinander in .ia-search-row, dann unveränderte Kontextleiste und Hauptnavigation');
  assertEqual((stripComments(html).match(/rToolMenu\(\)/g) || []).length, 2, 'rToolMenu(): Definition und der eine Aufruf in rIaShell');
  assertTrue(!/Werkzeug|ToolMenu|tool-menu/.test(stripComments(fnSource('rContextBar'))), 'rContextBar enthält nichts vom Werkzeugmenü');
  // Fingerprints der Quelltexte, die dieser Fix ausdrücklich nicht verändern darf (Stand P0b-Fix 4)
  const pinned = {
    rContextBar: ['fn', '8efff4b4a0d75054'], rGlobalSearchToggle: ['fn', '44051ef40d0c9c05'], globalSearchKeyAction: ['fn', 'a5b1d5edb1afd856'],
    globalSearchOnKeydown: ['fn', 'f00e205d446d4362'], initGlobalSearch: ['fn', 'c3d113c0988121f7'], globalSearchIsEditableTarget: ['fn', 'df3b03a7aae567dc'],
    exportExcel: ['fn', 'fb67952e9ff2dd32'], openLexicon: ['win', 'a2bee718c173adf3'], backToHome: ['win', '189c1cf2b15d7b86'],
    openGlobalSearch: ['win', 'f9764bf44087ed75'], closeGlobalSearch: ['win', '8c0759309c57450e'],
  };
  for (const [name, [kind, hash]] of Object.entries(pinned)) assertEqual(sha(kind === 'fn' ? fnSource(name) : winSource(name)), hash, `${name} unverändert (Quelltext-Fingerprint)`);
  const a = html.indexOf('  const hdrHtml=`');
  const endMarker = '</div>\n  </div>`;';
  const hdr = html.slice(a, html.indexOf(endMarker, a) + endMarker.length);
  assertEqual(sha(hdr.replace('${rIaShell()}', '')), 'f6e68cf15548d02e', 'Legacy-Kopfzeile (hdr/hdr-nav) unverändert');
  assertTrue(hdr.includes('<button class="btn-back" onclick="backToHome()">&larr; Cover</button>') && hdr.includes('<button class="btn-exp" onclick="exportExcel()">📥 Excel</button>'), 'Legacy-Buttons Cover und Excel weiterhin vorhanden');
  assertEqual(sha(/^const HASH_GLOBAL_PAGES=.*$/m.exec(html)[0]), '8381155d5a8c43a4', 'HASH_GLOBAL_PAGES unverändert (keine neue Route)');
  assertTrue(!/tool|werkzeug/i.test(/^const HASH_GLOBAL_PAGES=.*$/m.exec(html)[0]), 'keine Werkzeugmenü-Route');
  // Such-Handler: Tastenauswertung liefert weiterhin dieselben Aktionen
  const ctx = vm.createContext({});
  vm.runInContext(`${fnSource('globalSearchIsEditableTarget')}\n${fnSource('globalSearchKeyAction')}`, ctx);
  const act = (e, open) => vm.runInContext(`globalSearchKeyAction(${JSON.stringify(e)},${open})`, ctx);
  assertEqual([act({ key: '/', target: {} }, false), act({ key: 'k', ctrlKey: true }, false), act({ key: 'k', metaKey: true }, true), act({ key: 'Escape' }, true), act({ key: 'ArrowDown' }, true), act({ key: 'Enter' }, true), act({ key: '/', target: { tagName: 'INPUT' } }, false)], ['open', 'open', 'open', 'close', 'next', 'activate', null], 'Such-Kürzel (/, Strg/Cmd+K, Escape, Pfeile, Enter) unverändert');
}

// ── CSS ────────────────────────────────────────────────────────────────
console.log('== CSS: nur .ia-tool-menu* ==');
{
  const start = html.indexOf('/* ═══ P0b-Fix 5');
  const endRule = '.ia-tool-menu-item:hover,.ia-tool-menu-item:focus{';
  const end = html.indexOf('}\n', html.indexOf(endRule)) + 2;
  assertTrue(start > 0 && end > start, 'CSS-Block gefunden');
  const block = html.slice(start, end);
  const selectors = [...block.replace(/\/\*[^]*?\*\//g, '').matchAll(/(^|\n)([^{}\n]+?)\s*\{/g)].map((m) => m[2]);
  assertTrue(selectors.length >= 7 && selectors.every((s) => s.split(',').every((p) => p.trim().startsWith('.ia-tool-menu'))), `alle ${selectors.length} Selektoren im Namensraum .ia-tool-menu*`);
  const rule = (sel) => new RegExp(`^${sel.replace(/[.[\]()]/g, '\\$&')}\\{([^}]*)\\}`, 'm').exec(block)?.[1] ?? '';
  assertTrue(/min-height:44px/.test(rule('.ia-tool-menu-toggle')) && /min-width:44px/.test(rule('.ia-tool-menu-toggle')), 'Auslöser: Tippfläche mindestens 44 x 44 px');
  assertTrue(/min-height:44px/.test(rule('.ia-tool-menu-item')), 'Einträge: Tippfläche min-height 44px');
  const list = rule('.ia-tool-menu-list');
  assertTrue(/position:absolute/.test(list) && /right:0/.test(list) && /top:calc\(100% \+ 6px\)/.test(list), 'Popover: rechts am Auslöser verankert (position:absolute; right:0; unterhalb)');
  assertTrue(/width:max-content/.test(list) && /max-width:calc\(100vw - 24px\)/.test(list) && /box-sizing:border-box/.test(list), 'Popover: Inhaltsbreite, höchstens Viewport minus Rand (viewporttauglich bei 360 px)');
  assertTrue(!/(^|[;{\s])width:\s*\d+(px|rem|em)/.test(block) && !/min-width:\s*(?!44px)\d+/.test(block), 'keine feste Breite in px/rem/em');
  assertTrue(!/white-space:\s*nowrap|overflow-x/.test(block), 'kein nowrap, kein overflow-x');
  assertTrue(/\.ia-tool-menu-list\[hidden\]\{display:none\}/.test(block), 'hidden blendet die Liste wirklich aus');
  assertTrue(/\.ia-tool-menu\{[^}]*position:relative/.test(block), 'Wrapper ist der Ankerpunkt (position:relative)');
}

console.log('');
if (failures > 0) {
  console.log(`${failures} Test(s) fehlgeschlagen.`);
  process.exitCode = 1;
} else {
  console.log('Alle Tests erfolgreich.');
  process.exitCode = 0;
}

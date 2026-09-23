#!/usr/bin/env node
// P0b-Fix 9 — Test für Kontrast (WCAG AA) der neuen P0b-Texte und aria-current in der oberen
// Hauptnavigation (Spezifikation 6.11: Kontrast WCAG AA, aria-Beschriftungen, Tastaturbedienung der
// Navigation).
//
// Die 14 im Audit identifizierten P0b-Regeln (.ia-… und .ui-…) verwenden --text-muted statt
// --text-faint. Geprüft werden die Regeln selbst, die berechneten Kontrastverhältnisse aus den
// tatsächlichen Variablenwerten, dass --text-faint und alles übrige CSS unverändert ist (Fingerprint
// des Style-Blocks nach Rückübersetzung der 14 Regeln) und das Verhalten der echten rMainNav()
// (aria-current="page" genau beim aktiven Punkt, dieselbe Aktiv-Logik und dieselben onclick-Aktionen).
// Liest index.html nur lesend, schreibt nichts.
//
// Aufruf: node scripts/test-p0b-accessibility.mjs

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
const sha = (s) => crypto.createHash('sha256').update(s).digest('hex').slice(0, 16);
const stripComments = (s) => s.split('\n').filter((l) => !l.trim().startsWith('//') && !l.trim().startsWith('*') && !l.trim().startsWith('/*')).join('\n');
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
function constSource(name, endMarker) {
  const from = html.indexOf(`const ${name}=`);
  if (from === -1) throw new Error(`const ${name} nicht gefunden`);
  return html.slice(from, html.indexOf(endMarker, from) + endMarker.length);
}

const styleStart = html.indexOf('<style>');
const style = html.slice(styleStart, html.indexOf('</style>', styleStart));
const styleLines = style.split('\n');

// ── Kontrast ───────────────────────────────────────────────────────────
const TARGETS = [
  ['ia', '.ia-context-label'], ['ia', '.ia-search-kbd'], ['ia', '.ia-search-group'], ['ia', '.ia-search-item-meta'], ['ia', '.ia-search-hint'],
  ['ui', '.ui-kpi-label'], ['ui', '.ui-kpi-meta'], ['ui', '.ui-info-icon'], ['ui', '.ui-delta-neutral'], ['ui', '.ui-reliability-low'],
  ['ui', '.ui-methodenbox-heading'], ['ui', '.ui-notiz'], ['ui', '.ui-objektseite-context'], ['ui', '.ui-objektseite-tab'],
];
const ruleLine = (sel) => {
  const hits = styleLines.filter((l) => l.startsWith(`${sel}{`));
  if (hits.length !== 1) throw new Error(`${sel}: ${hits.length} Regeln`);
  return hits[0];
};
const textColor = (line) => /(?:^|[{;])color:([^;}]+)/.exec(line)?.[1];

console.log('== Regeln: --text-muted statt --text-faint ==');
for (const [, sel] of TARGETS) {
  const line = ruleLine(sel);
  assertEqual([textColor(line), /var\(--text-faint\)/.test(line)], ['var(--text-muted)', false], `${sel}: color:var(--text-muted), kein --text-faint mehr`);
}
assertEqual(TARGETS.length, 14, 'genau 14 Regeln (5 ia-…, 9 ui-…) laut Audit');

console.log('== Berechneter Kontrast (aus den tatsächlichen Variablenwerten) ==');
{
  const root = /:root\{([^}]*)\}/.exec(style)[1];
  const v = (name) => new RegExp(`--${name}:([^;]+);`).exec(root)?.[1];
  const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
  const rgba = (s) => { const m = /rgba\((\d+),(\d+),(\d+),([\d.]+)\)/.exec(s); return { rgb: [+m[1], +m[2], +m[3]], a: +m[4] }; };
  const lin = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
  const lum = (r) => 0.2126 * lin(r[0]) + 0.7152 * lin(r[1]) + 0.0722 * lin(r[2]);
  const blend = (fg, a, bg) => fg.map((x, i) => Math.round(x * a + bg[i] * (1 - a)));
  const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
  const muted = rgba(v('text-muted')), faint = rgba(v('text-faint'));
  for (const bgName of ['bg', 'surf', 'surf2']) {
    const bg = hex(v(bgName));
    const rMuted = ratio(blend(muted.rgb, muted.a, bg), bg);
    const rFaint = ratio(blend(faint.rgb, faint.a, bg), bg);
    assertTrue(rMuted >= 4.5, `--text-muted auf --${bgName}: ${rMuted.toFixed(2)}:1 >= 4.5:1 (AA, kleiner Text)`);
    assertTrue(rFaint < 4.5, `Kontrollwert: --text-faint auf --${bgName}: ${rFaint.toFixed(2)}:1 liegt unter 4.5:1 (Grund für den Fix)`);
  }
}

console.log('== Unverändert: Variablen und übriges CSS ==');
{
  assertTrue(style.includes('--text-faint:rgba(148,163,184,.72);'), '--text-faint global unverändert (rgba(148,163,184,.72))');
  assertTrue(style.includes('--text-muted:rgba(226,232,240,.68);'), '--text-muted unverändert (rgba(226,232,240,.68))');
  assertTrue(style.includes('--tx3:#64748b;') && style.includes('--tx2:#94a3b8;'), '--tx2/--tx3 unverändert');
  // Rückübersetzung der 14 Regeln -> Style-Block muss dem Stand vor P0b-Fix 9 entsprechen (keine weitere CSS-Änderung)
  const reverted = styleLines.map((l) => (TARGETS.some(([, s]) => l.startsWith(`${s}{`)) ? l.replace(/(^|[{;])color:var\(--text-muted\)/, '$1color:var(--text-faint)') : l)).join('\n');
  assertEqual(sha(reverted), 'cf65d487a73ee848', 'Style-Block außerhalb der 14 Regeln byte-identisch zum Stand vor dem Fix (Fingerprint)');
  assertEqual(style.length, 170218, 'Länge des Style-Blocks unverändert (nur gleich lange Variablennamen getauscht)');
  const remaining = styleLines.filter((l) => /var\(--text-faint\)/.test(l));
  assertEqual(remaining.length, 4, 'verbleibende --text-faint-Verwendungen: genau 4 Zeilen (nur die bewusst unberührten Hover-Regeln)');
  assertTrue(remaining.every((l) => !/(?:^|[{;\s])color:var\(--text-faint\)/.test(l.replace(/border-color:var\(--text-faint\)/g, ''))), 'diese 4 setzen ausschließlich border-color (kein Text)');
  assertTrue(remaining.every((l) => /:hover|aria-expanded/.test(l)), 'es sind ausschließlich Hover-/Expanded-Regeln');
  const mutedCount = (style.match(/var\(--text-muted\)/g) || []).length;
  assertEqual(mutedCount, 11 + 14, 'var(--text-muted) genau um die 14 geänderten Regeln vermehrt (11 -> 25)');
  const statusPill = styleLines.filter((l) => l.startsWith('.ia-matchday-status-geplant '));
  assertEqual(statusPill, ['.ia-matchday-status-geplant .ia-matchday-row-status{background:rgba(59,130,246,.14);color:var(--info)}'], 'Status-Pille (4.50:1) unverändert');
}

// ── aria-current ───────────────────────────────────────────────────────
console.log('== rMainNav: aria-current="page" genau beim aktiven Punkt ==');
const pointsSrc = constSource('MAIN_NAV_POINTS', '\n];');
const activeSrc = constSource('MAIN_NAV_ACTIVE_PAGES', '\n};');
const iconsSrc = constSource('MAIN_NAV_ICONS', '\n};');
const navSrc = fnSource('rMainNav');
function boot(page) {
  const S = { page };
  const calls = { setState: 0, storage: 0, net: 0, opened: [] };
  const win = {
    openOverview: () => calls.opened.push('openOverview'), openLigaGegner: () => calls.opened.push('openLigaGegner'), openMatchdayTimeline: () => calls.opened.push('openMatchdayTimeline'),
  };
  for (const k of ['localStorage', 'sessionStorage', 'indexedDB']) Object.defineProperty(win, k, { get() { calls.storage++; return null; } });
  const ctx = vm.createContext({ S, window: win, setPage: (p) => calls.opened.push(`setPage:${p}`), setState: () => { calls.setState++; }, fetch: () => { calls.net++; return Promise.reject(new Error('kein Netzwerk')); }, console });
  vm.runInContext('function cleanText(v){return String(v??"");}', ctx);
  vm.runInContext(fnSource('escHtml'), ctx);
  vm.runInContext([pointsSrc, activeSrc, iconsSrc, fnSource('mainNavActiveKeyForPage'), winSource('goToMainNavPoint'), navSrc, fnSource('rMainNavBottom')].join('\n'), ctx);
  const run = (code) => vm.runInContext(code, ctx);
  const buttons = (markup) => [...markup.matchAll(/<button\b([^>]*)>([^]*?)<\/button>/g)].map((m) => ({ attrs: m[1], text: m[2], key: /goToMainNavPoint\('(\w+)'\)/.exec(m[1])?.[1], active: /class="[^"]*\bactive\b/.test(m[1]), current: /aria-current="page"/.test(m[1]), currentAttr: /aria-current/.test(m[1]) }));
  return { S, calls, run, buttons, top: () => run('rMainNav()'), bottom: () => run('rMainNavBottom()') };
}
{
  const map = boot('overview').run('MAIN_NAV_ACTIVE_PAGES');
  let pages = 0;
  for (const [key, list] of Object.entries(map)) {
    for (const page of list) {
      const a = boot(page);
      const btns = a.buttons(a.top());
      assertEqual([btns.filter((b) => b.current).map((b) => b.key), btns.filter((b) => b.active).map((b) => b.key)], [[key], [key]], `Seite "${page}": aria-current und Klasse active genau bei "${key}"`);
      assertEqual(btns.filter((b) => !b.active).some((b) => b.currentAttr), false, `Seite "${page}": nicht aktive Punkte haben kein aria-current`);
      pages++;
    }
  }
  assertTrue(pages >= 9, `alle ${pages} zugeordneten Seiten geprüft`);
  for (const page of ['lexicon', 'seasonLanding', 'unbekannteSeite', '']) {
    const a = boot('overview'); a.S.page = page;
    assertEqual([a.top().includes('aria-current'), a.buttons(a.top()).some((b) => b.active)], [false, false], `Seite ${JSON.stringify(page)}: kein aktiver Punkt, kein aria-current`);
  }
  const a = boot('team');
  const btns = a.buttons(a.top());
  assertEqual(btns.length, 5, 'weiterhin genau 5 Punkte');
  assertEqual(btns.map((b) => b.key), ['uebersicht', 'spieltage', 'team', 'ligaGegner', 'labor'], 'Reihenfolge unverändert');
  assertTrue(/<nav class="ia-mainnav" aria-label="Hauptnavigation">/.test(a.top()), 'nav und aria-label der oberen Leiste unverändert');
  assertEqual((a.top().match(/aria-current="page"/g) || []).length, 1, 'genau ein aria-current="page" in der Leiste');
}

console.log('== Navigationslogik, Bottom-Navigation, Reinheit unverändert ==');
{
  // dieselbe Ausgabe wie vor dem Fix, sobald aria-current entfernt wird (nur diese Attributzeile kam hinzu)
  for (const page of ['overview', 'matchday', 'team', 'lexicon']) {
    const a = boot(page);
    const points = a.run('MAIN_NAV_POINTS');
    const key = a.run(`mainNavActiveKeyForPage(${JSON.stringify(page)})`);
    const reference = `<nav class="ia-mainnav" aria-label="Hauptnavigation">${points.map((p) => `<button type="button" class="ia-mainnav-btn${p.key === key ? ' active' : ''}" onclick="goToMainNavPoint('${p.key}')">${p.label.replace(/&/g, '&amp;')}</button>`).join('')}</nav>`;
    assertEqual(a.top().replace(' aria-current="page"', ''), reference, `Seite "${page}": Ausgabe ohne aria-current identisch zur bisherigen Leiste (Klassen, onclick, Beschriftung)`);
  }
  const expectedOpeners = { uebersicht: 'openOverview', ligaGegner: 'openLigaGegner', spieltage: 'openMatchdayTimeline', team: 'setPage:team', labor: 'setPage:comparisonCenter' };
  for (const [key, act] of Object.entries(expectedOpeners)) {
    const a = boot('team');
    a.run(`window.goToMainNavPoint('${key}')`);
    assertEqual(a.calls.opened, [act], `${key}: goToMainNavPoint ruft weiterhin ${act}`);
  }
  const oldSource = navSrc.replace(`\${p.key===activeKey?' aria-current="page"':''}`, '');
  assertEqual(sha(oldSource), 'e06d0bd56b91da1d', 'rMainNav-Quelltext ohne das eingefügte aria-current-Fragment == Stand vor dem Fix (Fingerprint)');
  assertEqual((navSrc.match(/aria-current/g) || []).length, 1, 'rMainNav enthält aria-current genau einmal');
  const pinned = { mainNavActiveKeyForPage: ['fn', 'dc489f9476da36b3'], rMainNavBottom: ['fn', '1ade76645df4da89'], goToMainNavPoint: ['win', '59d2de50a5f03cda'], rContextBar: ['fn', '8efff4b4a0d75054'], rIaShell: ['fn', '16a2d20a6a21ed7e'] };
  for (const [name, [kind, hash]] of Object.entries(pinned)) assertEqual(sha(kind === 'fn' ? fnSource(name) : winSource(name)), hash, `${name} unverändert (Fingerprint)`);
  assertEqual(sha(pointsSrc), '043d35c5a0019043', 'MAIN_NAV_POINTS unverändert');
  assertEqual(sha(activeSrc), 'b3625d372ebad81e', 'MAIN_NAV_ACTIVE_PAGES unverändert');
  const s6 = html.indexOf('/* ═══ P0b-Fix 6');
  const e6 = '  html{scroll-padding-bottom:88px}\n}\n';
  assertEqual(sha(html.slice(s6, html.indexOf(e6, s6) + e6.length)), 'a59c49d98a680f10', 'CSS der Bottom-Navigation unverändert');
  const b = boot('team');
  assertEqual(b.buttons(b.bottom()).filter((x) => x.current).map((x) => x.key), ['team'], 'Bottom-Navigation: aria-current weiterhin genau beim aktiven Punkt');
  const c = boot('team');
  c.top(); c.bottom();
  assertEqual([c.calls.setState, c.calls.storage, c.calls.net, c.calls.opened.length], [0, 0, 0, 0], 'Rendern: kein setState, Storage, Netzwerk, keine Navigation');
  assertTrue(!/setState|localStorage|sessionStorage|indexedDB|fetch\(|XMLHttpRequest|history\.|location|document\.|window\./.test(stripComments(navSrc)), 'rMainNav-Quelltext: kein setState, Storage, Netzwerk, DOM- oder window-Zugriff');
  assertTrue(!/\bS\.[A-Za-z]+\s*=[^=]|\bS\s*=[^=]/.test(stripComments(navSrc)), 'rMainNav schreibt nicht in S');
  assertEqual(sha(/^const HASH_GLOBAL_PAGES=.*$/m.exec(html)[0]), '8381155d5a8c43a4', 'HASH_GLOBAL_PAGES unverändert (kein Routing-Eingriff)');
}

console.log('');
if (failures > 0) {
  console.log(`${failures} Test(s) fehlgeschlagen.`);
  process.exitCode = 1;
} else {
  console.log('Alle Tests erfolgreich.');
  process.exitCode = 0;
}

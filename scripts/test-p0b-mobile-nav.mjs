#!/usr/bin/env node
// P0b-Fix 6 — Test für die mobile Bottom-Navigation (Spezifikation 6.7: "Hauptnavigation auf dem
// Smartphone als untere Leiste mit 5 Symbolen"; Entscheidungen D-B1 bis D-B3).
//
// Die echten Bestandteile (MAIN_NAV_POINTS, MAIN_NAV_ACTIVE_PAGES, mainNavActiveKeyForPage,
// goToMainNavPoint, rMainNav, MAIN_NAV_ICONS, rMainNavBottom, escHtml) werden unverändert aus dem
// index.html-Text geschnitten und in node:vm ausgeführt. Die Öffner (openOverview, openLigaGegner,
// openMatchdayTimeline, setPage) sind Spione. Das CSS wird aus dem Quelltext gelesen und
// strukturell geprüft (Namensraum, Breakpoint, Positionierung, Tippflächen, Abstände, z-index).
// Browserverhalten (Rendering, Überlauf bei 360 px, Cover) wird im Browser-Smoke-Test geprüft.
// Liest index.html nur lesend, schreibt nichts.
//
// Aufruf: node scripts/test-p0b-mobile-nav.mjs

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

const pointsSrc = constSource('MAIN_NAV_POINTS', '\n];');
const activeSrc = constSource('MAIN_NAV_ACTIVE_PAGES', '\n};');
const iconsSrc = constSource('MAIN_NAV_ICONS', '\n};');
const bottomSrc = fnSource('rMainNavBottom');
const bottomCode = stripComments(`${iconsSrc}\n${bottomSrc}`);

function boot(page = 'overview') {
  const S = { page };
  const calls = { opened: [], setState: 0, storage: 0, net: 0 };
  const win = {
    openOverview: () => { calls.opened.push('openOverview'); },
    openLigaGegner: () => { calls.opened.push('openLigaGegner'); },
    openMatchdayTimeline: () => { calls.opened.push('openMatchdayTimeline'); },
  };
  for (const k of ['localStorage', 'sessionStorage', 'indexedDB']) Object.defineProperty(win, k, { get() { calls.storage++; return null; } });
  const ctx = vm.createContext({
    S, window: win,
    setPage: (p) => { calls.opened.push(`setPage:${p}`); },
    setState: () => { calls.setState++; },
    fetch: () => { calls.net++; return Promise.reject(new Error('kein Netzwerk')); },
    console,
  });
  vm.runInContext('function cleanText(v){return String(v??"");}', ctx);
  vm.runInContext(fnSource('escHtml'), ctx);
  vm.runInContext([pointsSrc, activeSrc, iconsSrc, fnSource('mainNavActiveKeyForPage'), winSource('goToMainNavPoint'), fnSource('rMainNav'), bottomSrc].join('\n'), ctx);
  const run = (code) => vm.runInContext(code, ctx);
  const parse = (markup) => {
    const btns = [...markup.matchAll(/<button\b([^>]*)>([^]*?)<\/button>/g)].map((m) => ({
      attrs: m[1], inner: m[2],
      key: /goToMainNavPoint\('(\w+)'\)/.exec(m[1])?.[1],
      active: /class="[^"]*\bactive\b/.test(m[1]),
      current: /aria-current="page"/.test(m[1]),
      text: m[2].replace(/<svg[^]*?<\/svg>/g, '').replace(/<[^>]+>/g, ''),
    }));
    return btns;
  };
  return { S, calls, run, parse, bottom: () => run('rMainNavBottom()'), top: () => run('rMainNav()'), go: (k) => run(`window.goToMainNavPoint('${k}')`) };
}

// ── Struktur, Reihenfolge, gemeinsame Quelle ───────────────────────────
console.log('== Fünf Einträge in der Reihenfolge von MAIN_NAV_POINTS ==');
{
  const a = boot();
  const points = a.run('MAIN_NAV_POINTS');
  assertEqual(points.map((p) => p.key), ['uebersicht', 'spieltage', 'team', 'ligaGegner', 'labor'], 'Vorbedingung: MAIN_NAV_POINTS liefert die 5 Punkte in der Spezifikationsreihenfolge (6.3)');
  assertEqual(points.map((p) => p.label), ['Übersicht', 'Spieltage', 'Team', 'Liga & Gegner', 'Labor'], 'Vorbedingung: Beschriftungen');
  const btns = a.parse(a.bottom());
  assertEqual(btns.length, 5, 'genau 5 Navigationselemente');
  assertEqual(btns.map((b) => b.key), points.map((p) => p.key), 'Reihenfolge entspricht MAIN_NAV_POINTS');
  assertEqual(btns.map((b) => b.text), ['Übersicht', 'Spieltage', 'Team', 'Liga &amp; Gegner', 'Labor'], 'sichtbare Beschriftungen (Liga & Gegner HTML-maskiert)');
  assertTrue(btns.every((b) => /type="button"/.test(b.attrs)), 'alle Elemente sind <button type="button">');
  const top = a.parse(a.top());
  assertEqual([btns.map((b) => b.key), btns.map((b) => b.text)], [top.map((b) => b.key), top.map((b) => b.text)], 'gleiche Punkte, Reihenfolge und Beschriftung wie die obere Hauptnavigation (rMainNav)');
  assertTrue(/<nav class="ia-mainnav-bottom" aria-label="Hauptnavigation, untere Leiste">/.test(a.bottom()), 'semantisches <nav> mit eigenem aria-label');
  assertTrue(!/aria-label="Hauptnavigation"/.test(a.bottom()) && /<nav class="ia-mainnav" aria-label="Hauptnavigation">/.test(a.top()), 'aria-label unterscheidet sich von der oberen Leiste (eindeutige Landmarken)');
  assertEqual((a.bottom().match(/<nav\b/g) || []).length, 1, 'genau ein <nav>');
  // gemeinsame Quelle im Quelltext
  assertTrue(/MAIN_NAV_POINTS\.map/.test(bottomCode) && /mainNavActiveKeyForPage\(S\.page\)/.test(bottomCode) && /goToMainNavPoint\('\$\{p\.key\}'\)/.test(bottomCode), 'rMainNavBottom nutzt MAIN_NAV_POINTS, mainNavActiveKeyForPage(S.page) und goToMainNavPoint');
  assertTrue(!/key:'|label:'/.test(stripComments(bottomSrc)), 'rMainNavBottom definiert keine eigene Punktliste');
}

console.log('== Aktive Seite / aria-current ==');
{
  const map = boot().run('MAIN_NAV_ACTIVE_PAGES');
  let n = 0;
  for (const [key, pages] of Object.entries(map)) {
    for (const page of pages) {
      const a = boot(page);
      const btns = a.parse(a.bottom());
      const active = btns.filter((b) => b.active).map((b) => b.key);
      const current = btns.filter((b) => b.current).map((b) => b.key);
      assertEqual([active, current], [[key], [key]], `Seite "${page}" -> aktiv und aria-current genau bei "${key}"`);
      assertEqual(a.parse(a.top()).filter((b) => b.active).map((b) => b.key), [key], `Seite "${page}": gleiche aktive Zuordnung wie die obere Leiste`);
      n++;
    }
  }
  assertTrue(n >= 9, `alle ${n} zugeordneten Seiten geprüft`);
  for (const page of ['lexicon', 'seasonLanding', 'unbekannteSeite', undefined, '']) {
    const a = boot();
    a.S.page = page;
    const m = a.bottom();
    assertEqual([a.parse(m).filter((b) => b.active).length, /aria-current/.test(m)], [0, false], `Seite ${JSON.stringify(page)}: kein aktiver Punkt, kein aria-current`);
  }
}

console.log('== Aktionen: dieselbe goToMainNavPoint-Logik ==');
{
  const expected = { uebersicht: 'openOverview', ligaGegner: 'openLigaGegner', spieltage: 'openMatchdayTimeline', team: 'setPage:team', labor: 'setPage:comparisonCenter' };
  for (const [key, act] of Object.entries(expected)) {
    const a = boot();
    const onclick = a.parse(a.bottom()).find((b) => b.key === key);
    assertEqual(/onclick="goToMainNavPoint\('(\w+)'\)"/.exec(onclick.attrs)[1], key, `${key}: onclick ruft goToMainNavPoint('${key}')`);
    a.go(key);
    assertEqual(a.calls.opened, [act], `${key}: bestehender Öffner ${act}`);
    const b = boot();
    const topOnclick = b.parse(b.top()).find((x) => x.key === key).attrs.match(/onclick="([^"]*)"/)[1];
    const botOnclick = b.parse(b.bottom()).find((x) => x.key === key).attrs.match(/onclick="([^"]*)"/)[1];
    assertEqual(botOnclick, topOnclick, `${key}: identischer onclick wie die obere Leiste`);
  }
  const a = boot();
  a.go('unbekannt');
  assertEqual(a.calls.opened, [], 'unbekannter Schlüssel: keine Aktion (unverändertes Verhalten)');
}

console.log('== Symbole (Inline-SVG) ==');
{
  const a = boot();
  const markup = a.bottom();
  const svgs = [...markup.matchAll(/<svg\b([^>]*)>([^]*?)<\/svg>/g)];
  assertEqual(svgs.length, 5, 'genau 5 Inline-SVGs');
  assertTrue(svgs.every((m) => /aria-hidden="true"/.test(m[1]) && /focusable="false"/.test(m[1])), 'jedes SVG: aria-hidden="true", focusable="false"');
  assertTrue(svgs.every((m) => /stroke="currentColor"/.test(m[1]) && /fill="none"/.test(m[1]) && /viewBox="0 0 24 24"/.test(m[1])), 'jedes SVG: stroke="currentColor", fill="none", viewBox 24x24');
  assertTrue(!/#[0-9a-fA-F]{3,8}\b|rgb\(|hsl\(|fill="(?!none)/.test(markup.replace(/&#\d+;/g, '')), 'keine festen Farben (nur currentColor)');
  assertTrue(!/<image|<use|href=|xlink|url\(|<script|<style|<img|data:/.test(markup), 'keine externen Ressourcen, keine Bilder, kein Skript/Style');
  assertTrue(![...markup.matchAll(/<button\b([^>]*)>/g)].some((m) => /aria-label=/.test(m[1])), 'kein aria-label an den Buttons: die sichtbare Beschriftung ist der zugängliche Name');
  assertEqual(a.parse(markup).map((b) => /class="ia-mainnav-bottom-label"/.test(b.inner)), [true, true, true, true, true], 'jede Beschriftung steckt in .ia-mainnav-bottom-label');
  assertEqual(a.parse(markup).every((b) => b.inner.indexOf('<svg') < b.inner.indexOf('ia-mainnav-bottom-label')), true, 'Symbol steht vor der Beschriftung');
  assertTrue(!/[\u{1F300}-\u{1FAFF}☀-➿]/u.test(markup), 'keine Emoji');
  assertEqual(boot().run('Object.keys(MAIN_NAV_ICONS)'), ['uebersicht', 'spieltage', 'team', 'ligaGegner', 'labor'], 'Symbolzuordnung: genau ein Symbol je Navigationspunkt (getrennt von MAIN_NAV_POINTS)');
  assertTrue(markup.includes('Liga &amp; Gegner'), 'Beschriftung wird per escHtml maskiert (Liga &amp; Gegner)');
}

// ── Reinheit ───────────────────────────────────────────────────────────
console.log('== Reinheit: kein State, Storage, Netzwerk ==');
{
  const a = boot('team');
  const before = JSON.stringify(a.S);
  const m1 = a.bottom(); const m2 = a.bottom();
  assertEqual([m1 === m2, JSON.stringify(a.S) === before], [true, true], 'deterministisch, S unverändert');
  assertEqual([a.calls.setState, a.calls.storage, a.calls.net, a.calls.opened.length], [0, 0, 0, 0], 'Rendern: kein setState, Storage, Netzwerk und keine Navigation');
  assertTrue(!/setState|localStorage|sessionStorage|indexedDB|fetch\(|XMLHttpRequest|history\.|location|addEventListener|document\.|window\./.test(stripComments(bottomSrc)), 'Quelltext von rMainNavBottom: kein setState, Storage, Netzwerk, Listener, DOM- oder window-Zugriff');
  assertTrue(!/\bS\.[A-Za-z]+\s*=[^=]|\bS\s*=[^=]/.test(bottomCode), 'schreibt nicht in S');
  const topLevel = stripComments(`${iconsSrc}\n${bottomSrc}`).split('\n').filter((l) => /^(let|var|const) /.test(l)).map((l) => l.replace(/=.*/, '').trim());
  assertEqual(topLevel, ['const MAIN_NAV_ICONS'], 'einzige neue Top-Level-Deklaration: die konstante Symbolzuordnung (kein neuer Zustand, kein globales Icon-System)');
}

// ── CSS ────────────────────────────────────────────────────────────────
console.log('== CSS ==');
{
  const start = html.indexOf('/* ═══ P0b-Fix 6');
  const endMarker = '  html{scroll-padding-bottom:88px}\n}\n';
  const end = html.indexOf(endMarker, start) + endMarker.length;
  assertTrue(start > 0 && end > start, 'CSS-Block gefunden');
  const block = html.slice(start, end).replace(/\/\*[^]*?\*\//g, '');
  const mediaAt = block.indexOf('@media(max-width:600px){');
  assertTrue(mediaAt > 0 && (block.match(/@media/g) || []).length === 1, 'genau ein Media-Block: @media(max-width:600px)');
  const base = block.slice(0, mediaAt).trim();
  const media = block.slice(mediaAt);
  assertEqual(base, '.ia-mainnav-bottom{display:none}', 'außerhalb des Breakpoints: Bottom-Navigation vollständig display:none (einzige Regel)');
  const rule = (sel) => new RegExp(`^\\s*${sel.replace(/[.[\]()#:]/g, '\\$&')}\\{([^}]*)\\}`, 'm').exec(media)?.[1] ?? '';
  const nav = rule('.ia-mainnav-bottom');
  assertTrue(/position:fixed/.test(nav) && /left:0/.test(nav) && /right:0/.test(nav) && /bottom:0/.test(nav) && /display:flex/.test(nav) && /box-sizing:border-box/.test(nav), 'Leiste: position:fixed; left:0; right:0; bottom:0; display:flex; border-box');
  const z = Number(/z-index:(\d+)/.exec(nav)?.[1]);
  assertTrue(z > 0 && z < 500, `z-index ${z} liegt unter dem Werkzeugmenü (500)`);
  assertTrue(z > 100 || z >= 1, 'z-index positiv (über normalem Seiteninhalt)');
  assertTrue(/\.ia-tool-menu-list\{[^}]*z-index:500/.test(html) && /\.ia-search-overlay\{[^}]*z-index:1000/.test(html) && /\.vfb-hof-intro-overlay\{[^}]*z-index:9000/.test(html), 'Vorbedingung: Werkzeugmenü 500, Such-Overlay 1000, Hall-of-Fame-Intro 9000 liegen darüber');
  assertEqual(rule('.ia-mainnav'), 'display:none', 'bis 600px: obere .ia-mainnav display:none');
  const btn = rule('.ia-mainnav-bottom-btn');
  assertTrue(/flex:1 1 0/.test(btn) && /min-width:0/.test(btn), 'fünf gleichmäßig verteilte Elemente (flex:1 1 0, min-width:0)');
  const minH = Number(/min-height:(\d+)px/.exec(btn)?.[1]);
  assertTrue(minH >= 44, `Tippfläche: min-height ${minH}px >= 44px (Breite bei 360px: ca. 70px)`);
  assertTrue(/border:0/.test(btn) && /background:transparent/.test(btn) && /cursor:pointer/.test(btn), 'Button-Grundstil (ohne Rahmen, transparent, Zeiger)');
  assertTrue(/focus-visible/.test(media) && /outline:2px solid/.test(rule('.ia-mainnav-bottom-btn:focus-visible')), 'sichtbarer Fokus (:focus-visible mit Outline)');
  const act = rule('.ia-mainnav-bottom-btn.active');
  assertTrue(/color:/.test(act) && /background:/.test(act) && /box-shadow:inset/.test(act), 'aktive Seite: Farbe, Hintergrund und Unterstreichung (nicht nur Farbe)');
  const icon = rule('.ia-mainnav-bottom-icon');
  assertTrue(/width:22px/.test(icon) && /height:22px/.test(icon), 'Symbolgröße 22px');
  assertTrue(!/(^|[;{\s])width:\s*\d/.test(nav) && !/(^|[;{\s])width:\s*\d+px/.test(btn) && !/(^|[;{\s])min-width:\s*[1-9]/.test(btn), 'keine feste Breite an Leiste und Buttons');
  assertTrue(!/white-space:\s*nowrap|overflow-x|overflow:\s*(auto|scroll)/.test(block), 'kein nowrap, kein Überlauf-Scrollen');
  assertTrue(/overflow-wrap:anywhere/.test(rule('.ia-mainnav-bottom-label')), 'Beschriftung darf umbrechen (kein Überlauf bei langen Texten)');
  const navPad = Number(/#main\{padding-bottom:(\d+)px\}/.exec(media)?.[1]);
  const scrollPad = Number(/html\{scroll-padding-bottom:(\d+)px\}/.exec(media)?.[1]);
  const navHeight = minH + 2 * Number(/padding:(\d+)px;/.exec(nav)?.[1] ?? 0) + 1;
  assertTrue(navPad >= navHeight + 8, `#main padding-bottom ${navPad}px >= Leistenhöhe ${navHeight}px + Sicherheitsabstand`);
  assertTrue(scrollPad >= navHeight, `scroll-padding-bottom ${scrollPad}px >= Leistenhöhe ${navHeight}px (Fokus nicht verdeckt)`);
  // Namensraum: alle Selektoren im Media-Block sind ia-mainnav-bottom*, die Ausblendung der oberen Leiste oder die zwei Abstandsregeln
  const selectors = [...media.matchAll(/(^|\n)\s*([^{}\n@]+?)\s*\{/g)].map((m) => m[2]);
  const allowed = new Set(['.ia-mainnav', '#main', 'html']);
  assertTrue(selectors.length >= 8 && selectors.every((s) => s.startsWith('.ia-mainnav-bottom') || allowed.has(s)), `alle ${selectors.length} Selektoren: .ia-mainnav-bottom*, .ia-mainnav (Ausblenden), #main und html (Abstand)`);
  assertEqual((html.match(/\.ia-mainnav\{display:none\}/g) || []).length, 1, 'die Ausblendung der oberen Leiste steht genau einmal (im Media-Block)');
  assertTrue(!/@media\(min-width/.test(block) && !/pointer:\s*coarse/.test(block), 'Breakpoint ausschließlich max-width:600px (kein pointer/min-width)');
  assertEqual(sha(html.split('\n').filter((l) => /^\.ia-mainnav(-btn)?[{:.]/.test(l)).join('\n')), '5301d9c4c524d4b0', 'Desktop-Styles der oberen Leiste (.ia-mainnav, .ia-mainnav-btn*) unverändert');
}

// ── Einbau und unveränderte Bestandteile ───────────────────────────────
console.log('== Einbau in rIaShell und unveränderte Bestandteile ==');
{
  const shell = stripComments(fnSource('rIaShell')).replace(/\s+/g, '');
  assertEqual(shell, 'functionrIaShell(){return`<divclass="ia-search-row">${rGlobalSearchToggle()}${rToolMenu()}</div>${rContextBar()}${rMainNav()}${rMainNavBottom()}`;}', 'rIaShell: Suche/Werkzeugmenü, Kontextleiste, obere Navigation, dann die Bottom-Navigation');
  assertEqual((stripComments(html).match(/rMainNavBottom\(\)/g) || []).length, 2, 'rMainNavBottom(): Definition und der eine Aufruf in rIaShell');
  const bar = stripComments(fnSource('rContextBar'));
  assertTrue(!/mainnav|MainNav|Bottom/i.test(bar), 'rContextBar enthält nichts von der Bottom-Navigation');
  const pinned = {
    rContextBar: ['fn', '8efff4b4a0d75054'], rMainNav: ['fn', '5d960fde923cc354'], mainNavActiveKeyForPage: ['fn', 'dc489f9476da36b3'],
    rGlobalSearchToggle: ['fn', '44051ef40d0c9c05'], globalSearchKeyAction: ['fn', 'a5b1d5edb1afd856'], globalSearchOnKeydown: ['fn', 'f00e205d446d4362'],
    initGlobalSearch: ['fn', 'c3d113c0988121f7'], globalSearchIsEditableTarget: ['fn', 'df3b03a7aae567dc'],
    rToolMenu: ['fn', '762229fde03b2031'], toolMenuOnKeydown: ['fn', 'ab4998be9b395079'], toolMenuOnClick: ['fn', '740b6602a1112dc7'], initToolMenu: ['fn', 'af656ee1210707f7'],
    goToMainNavPoint: ['win', '59d2de50a5f03cda'], openLexicon: ['win', 'a2bee718c173adf3'], backToHome: ['win', '189c1cf2b15d7b86'],
    openGlobalSearch: ['win', 'f9764bf44087ed75'], closeGlobalSearch: ['win', '8c0759309c57450e'],
    openToolMenu: ['win', 'b816957ddf35608f'], closeToolMenu: ['win', '9661a3bcb6518d0b'], toggleToolMenu: ['win', '14aae5fecae3c188'], activateToolMenuItem: ['win', '305d226939e1c2e0'],
  };
  for (const [name, [kind, hash]] of Object.entries(pinned)) assertEqual(sha(kind === 'fn' ? fnSource(name) : winSource(name)), hash, `${name} unverändert (Quelltext-Fingerprint)`);
  assertEqual(sha(pointsSrc), '043d35c5a0019043', 'MAIN_NAV_POINTS unverändert');
  assertEqual(sha(activeSrc), 'b3625d372ebad81e', 'MAIN_NAV_ACTIVE_PAGES unverändert');
  const a = html.indexOf('  const hdrHtml=`');
  const endMarker = '</div>\n  </div>`;';
  assertEqual(sha(html.slice(a, html.indexOf(endMarker, a) + endMarker.length).replace('${rIaShell()}', '')), 'f6e68cf15548d02e', 'Legacy-Kopfzeile (.hdr) unverändert');
  assertEqual(sha(/^const HASH_GLOBAL_PAGES=.*$/m.exec(html)[0]), '8381155d5a8c43a4', 'HASH_GLOBAL_PAGES unverändert (keine neue Route)');
  const s4 = html.indexOf('/* ═══ P0b-Fix 4');
  const e4 = '  .ia-search-overlay{padding-top:8vh}\n}';
  assertEqual(sha(html.slice(s4, html.indexOf(e4, s4) + e4.length)), '8108aa7e5351b405', 'CSS der globalen Suche unverändert');
  const s5 = html.indexOf('/* ═══ P0b-Fix 5');
  const e5 = html.indexOf('.ia-tool-menu-item:hover,.ia-tool-menu-item:focus{');
  assertEqual(sha(html.slice(s5, html.indexOf('}\n', e5) + 2)), '7184178c46e9bba6', 'CSS des Werkzeugmenüs unverändert');
  assertTrue(html.includes('<div id="main"><div id="root"></div></div>') && /#main\{display:none;/.test(html), 'Bottom-Navigation liegt in #root innerhalb #main (auf dem Cover mit #main ausgeblendet)');
}

console.log('');
if (failures > 0) {
  console.log(`${failures} Test(s) fehlgeschlagen.`);
  process.exitCode = 1;
} else {
  console.log('Alle Tests erfolgreich.');
  process.exitCode = 0;
}

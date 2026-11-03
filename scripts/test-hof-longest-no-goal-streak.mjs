#!/usr/bin/env node
// Test für die Hall-of-Fame-Karte "Längste Nullphase" (S2e-Auftrag "Spielzeit normalisieren" —
// Ersetzung der Berechnung durch den spielübergreifenden Rekord aus buildCrossGameNoGoalStreak,
// siehe scripts/no-goal-streak.mjs und der Browser-Port in matchcenter-core.js).
//
// Lädt die echte App (matchcenter-core.js + index.html-Skript + echte eingebettete Saisondaten) in einen
// node:vm-Kontext — dieselbe Technik wie in den Verifikations-Probes dieser Phase, nötig, weil die
// Hall-of-Fame-Zuordnung (isHallOfFameEligiblePlayer, getPlayerRegistryProfile, Spielerregistrierung)
// viele echte, nur im Browser-Kontext aufgebaute Datenstrukturen braucht, die sich nicht sinnvoll isoliert
// extrahieren lassen (anders als die reinen Funktionen in scripts/game-clock.mjs/no-goal-streak.mjs).
//
// Aufruf: node scripts/test-hof-longest-no-goal-streak.mjs

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
function assertTrue(cond, label) { assertEqual(Boolean(cond), true, label); }

function makeEl() {
  return { style: {}, classList: { add() {}, remove() {}, contains: () => false, toggle() {} }, addEventListener() {}, removeEventListener() {}, appendChild() {}, setAttribute() {}, removeAttribute() {}, getAttribute: () => null, querySelector: () => null, querySelectorAll: () => [], children: [], dataset: {}, focus() {}, blur() {}, click() {}, value: '', innerHTML: '', textContent: '' };
}

const html = await readFile(path.join(REPO_ROOT, 'index.html'), 'utf8');
const core = await readFile(path.join(REPO_ROOT, 'matchcenter-core.js'), 'utf8');
const embedded = await readFile(path.join(REPO_ROOT, 'season-data-embedded.js'), 'utf8');
const m = html.match(/<script>([\s\S]*)<\/script>\s*<\/body>/);
const src = core + '\n' + m[1];

const sandbox = {
  console, window: {},
  document: { addEventListener() {}, removeEventListener() {}, getElementById: () => makeEl(), createElement: () => makeEl(), querySelector: () => null, querySelectorAll: () => [], body: makeEl(), documentElement: { style: {}, classList: makeEl().classList }, title: '' },
  location: { hash: '', href: 'http://localhost/', search: '', protocol: 'http:' },
  localStorage: { getItem: () => null, setItem() {}, removeItem() {} },
  sessionStorage: { getItem: () => null, setItem() {}, removeItem() {} },
  fetch: () => Promise.reject(new Error('no net')),
  navigator: { userAgent: 'node-test' },
  requestAnimationFrame: (cb) => setTimeout(cb, 0), cancelAnimationFrame() {},
  setTimeout, clearTimeout, setInterval, clearInterval,
  performance, TextDecoder, TextEncoder, URLSearchParams,
  history: { pushState() {}, replaceState() {} }, addEventListener() {},
  CustomEvent: class CustomEvent { constructor(type, opts) { this.type = type; Object.assign(this, opts); } },
  alert() {}, confirm: () => false, prompt: () => null,
  Image: class { constructor() { this.onload = null; this.onerror = null; } set src(_v) {} },
};
sandbox.self = sandbox; sandbox.globalThis = sandbox;
vm.createContext(sandbox);
vm.runInContext(embedded, sandbox, { timeout: 15000 });
vm.runInContext(src, sandbox, { timeout: 15000 });
await vm.runInContext('ensureGlobalDataLoaded()', sandbox, { timeout: 60000 });

console.log('== buildCrossGameNoGoalStreak() (Browser-Port) — die sechs Prüfwerte je Saison aus dem Auftrag ==');
{
  const expected = { '21/22': 1457, '22/23': 2133, '23/24': 1767, '24/25': 1832, '25/26': 2051, '26/27': 2745 };
  const got = vm.runInContext(`(function(){
    const out = {};
    for (const seasonKey of Object.keys(SEASONS)) {
      const games = SEASONS[seasonKey]?.data?.rawGames || [];
      out[seasonKey] = buildCrossGameNoGoalStreak(games).longestOverall;
    }
    return out;
  })()`, sandbox, { timeout: 30000 });
  for (const [seasonKey, value] of Object.entries(expected)) {
    assertEqual(got[seasonKey], value, `${seasonKey}: longestOverall = ${value}s`);
  }
}

console.log('== Befund (Auftrag Punkt 6): Jannis Löhmann (22/23-Torhüter der 35:33-Phase) ist NICHT Hall-of-Fame-berechtigt ==');
{
  const loehmann = vm.runInContext(`(function(){
    const reg = toPublicPlayerRegistry();
    const p = Object.values(reg.players||{}).find(x => x.name === 'Jannis Löhmann');
    if (!p) return null;
    return { name: p.name, seasons: p.seasons, isHofEligible: isHallOfFameEligiblePlayer(p) };
  })()`, sandbox, { timeout: 15000 });
  assertTrue(!!loehmann, 'Jannis Löhmann ist im Spielerregister vorhanden');
  assertEqual(loehmann?.seasons, ['22/23'], 'Jannis Löhmann hat ausschließlich die Saison 22/23 (nie unter "VfB Ulm")');
  assertEqual(loehmann?.isHofEligible, false, 'Jannis Löhmann ist "reiner SG-Spieler" und damit nicht Hall-of-Fame-berechtigt — das erklärt, warum 22/23 trotz des größeren Rohwerts (2133s) nicht zählte');
}

console.log('== buildHallOfFameLongestNoGoalStreak() — Angezeigter Rekord ==');
{
  const record = vm.runInContext(`buildHallOfFameLongestNoGoalStreak()`, sandbox, { timeout: 30000 });
  assertTrue(!!record, 'ein Rekord wird gefunden');
  assertEqual(record?.seasonKey, '26/27', 'Saison: 26/27');
  assertEqual(record?.value, 2745, 'Wert: 2745s = 45:45');
  assertEqual(record?.goalieNames, ['Kirsten Nicolas Knott'], 'Torhüter: durchgehend Kirsten Nicolas Knott (ein Torhüter, kein Wechsel)');
  assertEqual(record?.games, [63384, 63386], 'die Serie berührt genau die Spiele 63384 und 63386');
}

console.log('== Rendering: Karte zeigt Wert, Name, und die Pflicht-Untertitelformel ==');
{
  const cardHtml = vm.runInContext(`(function(){
    const {alltimeRows,seasonRows}=getHallGoalieData();
    const gamesRows=alltimeRows.slice().sort((a,b)=>b.games-a.games||a.name.localeCompare(b.name));
    const gaaRows=alltimeRows.filter(r=>r.games>=HOF_GOALIE_LIMITS.gaaGames).sort((a,b)=>a.gaa-b.gaa||b.games-a.games||a.name.localeCompare(b.name));
    const maxFirstRows=seasonRows.filter(r=>Number.isFinite(r.maxTimeToFirstGA)).sort((a,b)=>b.maxTimeToFirstGA-a.maxTimeToFirstGA||b.games-a.games||a.name.localeCompare(b.name));
    const pkRows=alltimeRows.filter(r=>r.pk.situations>=HOF_GOALIE_LIMITS.pkSituations).sort((a,b)=>b.pk.rate-a.pk.rate||b.pk.situations-a.pk.situations||a.name.localeCompare(b.name));
    const topteamRows=seasonRows.filter(r=>r.topteam.games>=HOF_GOALIE_LIMITS.topteamGames&&Number.isFinite(r.topteam.gaa)).sort((a,b)=>a.topteam.gaa-b.topteam.gaa||b.topteam.games-a.topteam.games||a.name.localeCompare(b.name));
    const longestNoGoalRows=seasonRows.filter(r=>Number.isFinite(r.longestNoGoalStretch)&&r.longestNoGoalStretch>0).sort((a,b)=>b.longestNoGoalStretch-a.longestNoGoalStretch||b.games-a.games||a.name.localeCompare(b.name));
    return rHallGoalieAwardCards({gamesRows,gaaRows,longestNoGoalRows,maxFirstRows,pkRows,topteamRows});
  })()`, sandbox, { timeout: 30000 });
  const idx = cardHtml.indexOf('Nullphase</div>');
  const block = idx >= 0 ? cardHtml.slice(idx, idx + 260) : '';
  assertTrue(idx >= 0, 'die Karte "Längste Nullphase" wird gerendert (genau einmal, keine zweite Karte)');
  assertEqual(cardHtml.split('hof-goalie-award-kicker">Längste Nullphase').length - 1, 1, 'genau EIN Kicker-Div "Längste Nullphase" im Markup — keine zweite Karte');
  assertTrue(block.includes('45:45'), 'Wert 45:45 steht auf der Karte');
  assertTrue(block.includes('Kirsten Nicolas Knott'), 'Name Kirsten Nicolas Knott steht auf der Karte');
  assertTrue(block.includes('Am Stück ohne Gegentor, spielübergreifend · Saison 2026/27'), 'Untertitel exakt: "Am Stück ohne Gegentor, spielübergreifend" + Saison 2026/27');
}

console.log('');
if (failures > 0) {
  console.log(`${failures} Test(s) fehlgeschlagen.`);
  process.exitCode = 1;
} else {
  console.log('Alle Tests erfolgreich.');
}

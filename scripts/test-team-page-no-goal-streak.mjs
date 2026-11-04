#!/usr/bin/env node
// Test für den S2h-Auftrag "laufende Nullphase auf die Saisonseite": rTeamNoGoalStreakCard() in
// index.html zeigt buildCrossGameNoGoalStreak().current (die seit dem letzten Gegentor laufende,
// spielübergreifende Serie) auf der Team-/Saisonseite — nur für die laufende Saison, immer mit "läuft
// noch" UND "spielübergreifend" in der Beschriftung, nie leer bei current=0. Lädt die echte App
// (matchcenter-core.js + index.html-Skript + echte eingebettete Saisondaten) in einen node:vm-Kontext,
// dieselbe Technik wie die übrigen S2e/S2f/S2g-Tests dieser Phase.
//
// Aufruf: node scripts/test-team-page-no-goal-streak.mjs

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

console.log('== Punkt 4, Prüfwert: 26/27 nach Spieltag 1 -> 18:20 ==');
{
  const out = vm.runInContext(`(function(){
    const games = SEASONS['26/27']?.data?.rawGames || [];
    const r = buildCrossGameNoGoalStreak(games);
    const card = rTeamNoGoalStreakCard('26/27', games);
    return { current: r.current, card };
  })()`, sandbox, { timeout: 15000 });
  assertEqual(out.current, 1100, '26/27 current = 1100s (18:20)');
  assertTrue(out.card.includes('18:20'), 'Karte zeigt 18:20');
  assertTrue(out.card.toLowerCase().includes('läuft noch'), 'Beschriftung enthält "läuft noch" (oder gleichwertig)');
  assertTrue(out.card.includes('spielübergreifend'), 'Beschriftung enthält "spielübergreifend"');
  assertTrue(out.card.includes('Basis: 2 Spiele'), 'Datenstandsband unter dem Wert: Basis: 2 Spiele — noch nicht aussagekräftig (Punkt 5)');
}

console.log('== Punkt 3: nur für die laufende Saison — archivierte Saison zeigt die Karte nicht ==');
{
  const out = vm.runInContext(`(function(){
    const games25 = SEASONS['25/26']?.data?.rawGames || [];
    return { card: rTeamNoGoalStreakCard('25/26', games25), currentSeasonKey: CURRENT_SEASON_KEY };
  })()`, sandbox, { timeout: 15000 });
  assertEqual(out.currentSeasonKey, '26/27', 'Vorbedingung: 26/27 ist die laufende Saison');
  assertEqual(out.card, '', '25/26 (archiviert): Karte entfällt vollständig, keine "laufend"-Aussage für eine abgeschlossene Saison');
}

console.log('== Punkt 4, Fall "Saison ohne Gegentor": laufende Serie = Summe aller Spielzeiten ==');
{
  const out = vm.runInContext(`(function(){
    const g1 = { id: 900001, date: '2026-10-01', home_team_name: 'VfB Ulm', guest_team_name: 'Testgegner A', home_goals: '5', guest_goals: '0', ended: true, events: [] };
    const g2 = { id: 900002, date: '2026-10-08', home_team_name: 'Testgegner B', guest_team_name: 'VfB Ulm', home_goals: '0', guest_goals: '4', ended: true, events: [] };
    const games = [g1, g2];
    const r = buildCrossGameNoGoalStreak(games);
    const card = rTeamNoGoalStreakCard(CURRENT_SEASON_KEY, games);
    return { current: r.current, expected: 2 * GAME_LENGTH_SEC, card };
  })()`, sandbox, { timeout: 15000 });
  assertEqual(out.current, out.expected, `laufende Serie ohne jedes Gegentor = Summe aller Spielzeiten (${out.expected}s = 2x40min)`);
  assertTrue(out.card.includes('80:00'), 'Karte zeigt 80:00 (zwei Spiele ohne Gegentor)');
}

console.log('== Punkt 4, Fall "Gegentor in der Schlusssekunde": laufende Serie = 0:00, Karte bleibt nicht leer ==');
{
  const out = vm.runInContext(`(function(){
    const g = {
      id: 900003, date: '2026-10-15', home_team_name: 'VfB Ulm', guest_team_name: 'Testgegner C',
      home_goals: '3', guest_goals: '1', ended: true,
      events: [ { event_id: 1, event_type: 'goal', event_team: 'guest', period: 2, time: '20:00', home_goals: 3, guest_goals: 1 } ],
    };
    const games = [g];
    const r = buildCrossGameNoGoalStreak(games);
    const card = rTeamNoGoalStreakCard(CURRENT_SEASON_KEY, games);
    return { current: r.current, card, cardLength: card.length };
  })()`, sandbox, { timeout: 15000 });
  assertEqual(out.current, 0, 'letztes (einziges) Gegentor in Minute 40:00 -> laufende Serie = 0 Sekunden');
  assertTrue(out.cardLength > 0, 'Karte bleibt NICHT leer bei current=0 (Vorbedingung)');
  assertTrue(out.card.includes('0:00'), 'Karte zeigt ausdrücklich 0:00, nicht leer');
}

console.log('');
if (failures > 0) {
  console.log(`${failures} Test(s) fehlgeschlagen.`);
  process.exitCode = 1;
} else {
  console.log('Alle Tests erfolgreich.');
}

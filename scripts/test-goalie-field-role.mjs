#!/usr/bin/env node
// Test für den S2f-Auftrag "Rollenzuordnung korrigieren": EINE gemeinsame Rollenquelle
// (playerRoleInGame/getPlayerGameRole in index.html) statt drei unabhängiger Scorerereignis-Annahmen
// (applySeasonScoringToRegistry, getSeasonPlayerFieldBasis, computeMetrics — siehe Bestandsaufnahme vom
// selben Tag). Lädt die echte App (matchcenter-core.js + index.html-Skript + echte eingebettete
// Saisondaten) in einen node:vm-Kontext, wie die übrigen S2e/S2f-Tests dieser Phase.
//
// Aufruf: node scripts/test-goalie-field-role.mjs

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

const capturedWarnings = [];
const sandbox = {
  console: { ...console, warn: (...a) => { capturedWarnings.push(a.join(' ')); }, error: (...a) => { capturedWarnings.push(a.join(' ')); } },
  window: {},
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

console.log('== Punkt 6, Feldspieler-Reiter: Knott je Saison (fieldStatsBySeason.games) ==');
{
  const got = vm.runInContext(`(function(){
    const profile = Object.values(PLAYER_REGISTRY.players).find(p => p.name === 'Kirsten Nicolas Knott');
    return Object.fromEntries(['21/22','22/23','23/24','26/27'].map(sk => [sk, profile.fieldStatsBySeason?.[sk]?.games || 0]));
  })()`, sandbox, { timeout: 15000 });
  assertEqual(got, { '21/22': 1, '22/23': 1, '23/24': 0, '26/27': 0 }, 'Knott: 21/22 1, 22/23 1 (unveraendert), 23/24 0 (vorher 1), 26/27 0 (vorher 1)');
}

console.log('== Punkt 6: Daucher/Hopfe 25/26 — 0 Feldspiele, Torhüterspiele, 1 Vorlage als Torhüter ==');
{
  const got = vm.runInContext(`(function(){
    const names = ['Andreas Daucher', 'Christian  Hopfe'];
    return names.map(name => {
      const profile = Object.values(PLAYER_REGISTRY.players).find(p => p.name === name);
      const field = profile.fieldStatsBySeason?.['25/26']?.games || 0;
      const goalie = profile.goalieStatsBySeason?.['25/26'];
      return { name, field, goalieGames: goalie?.games || 0, scoring: goalie?.scoring || { goals: 0, assists: 0 } };
    });
  })()`, sandbox, { timeout: 15000 });
  assertEqual(got, [
    { name: 'Andreas Daucher', field: 0, goalieGames: 6, scoring: { goals: 0, assists: 1 } },
    { name: 'Christian  Hopfe', field: 0, goalieGames: 4, scoring: { goals: 0, assists: 1 } },
  ], 'Daucher 0/6/1 Vorlage, Hopfe 0/4/1 Vorlage (je Feld/Torhüter-Spiele/Scoring)');
}

console.log('== Punkt 6: echte Mischfälle — Feldzahlen unveraendert ==');
{
  const got = vm.runInContext(`(function(){
    const names = ['Mareike Will', 'Michael Staněk', 'Lars Pottgüter'];
    return names.map(name => {
      const profile = Object.values(PLAYER_REGISTRY.players).find(p => p.name === name);
      const field = Object.values(profile.fieldStatsBySeason||{}).reduce((s,st)=>s+(st.games||0),0);
      const goalie = Object.values(profile.goalieStatsBySeason||{}).reduce((s,st)=>s+(st.games||0),0);
      return { name, field, goalie };
    });
  })()`, sandbox, { timeout: 15000 });
  assertEqual(got, [
    { name: 'Mareike Will', field: 16, goalie: 2 },
    { name: 'Michael Staněk', field: 7, goalie: 16 },
    { name: 'Lars Pottgüter', field: 7, goalie: 5 },
  ], 'Will Feld 16/Tor 2, Staněk Feld 7/Tor 16, Pottgüter Feld 7/Tor 5 — unveraendert gegenüber vor der Korrektur');
}

console.log('== Punkt 6: Archivsumme Torhüter-Scorerpunkte — 9 Punkte, alle Vorlagen, kein Tor ==');
{
  const got = vm.runInContext(`(function(){
    let goals = 0, assists = 0;
    for (const profile of Object.values(PLAYER_REGISTRY.players)) {
      for (const stats of Object.values(profile.goalieStatsBySeason || {})) {
        goals += stats.scoring?.goals || 0;
        assists += stats.scoring?.assists || 0;
      }
    }
    return { goals, assists, total: goals + assists };
  })()`, sandbox, { timeout: 15000 });
  assertEqual(got, { goals: 0, assists: 9, total: 9 }, 'Archivsumme: 9 Torhüterpunkte, 0 Tore, 9 Vorlagen');
}

console.log('== Punkt 5: Rolle nicht anbieten, wenn es sie nicht gibt ==');
{
  const got = vm.runInContext(`(function(){
    const knott = Object.values(PLAYER_REGISTRY.players).find(p => p.name === 'Kirsten Nicolas Knott');
    const daucher = Object.values(PLAYER_REGISTRY.players).find(p => p.name === 'Andreas Daucher');
    const will = Object.values(PLAYER_REGISTRY.players).find(p => p.name === 'Mareike Will');
    return {
      knott2627: getPlayerRoleAvailability(knott.playerId, { name: knott.name, seasonKey: '26/27', context: 'season' }).field,
      daucher2526: getPlayerRoleAvailability(daucher.playerId, { name: daucher.name, seasonKey: '25/26', context: 'season' }).field,
      willField: getPlayerRoleAvailability(will.playerId, { name: will.name, context: 'alltime' }).field,
      willDual: will.isDualRolePlayer,
    };
  })()`, sandbox, { timeout: 15000 });
  assertEqual(got, { knott2627: false, daucher2526: false, willField: true, willDual: true }, 'Knott 26/27 und Daucher 25/26 ohne Feldspieler-Rolle; Will (echter Mischfall) weiterhin mit Feldspieler-Rolle und Dual-Role');
}

console.log('== Punkt 7: Rollenprofil bei dünner Datenbasis (Schwelle wie Duo-Analyse, gamesTogether<5) ==');
{
  assertEqual(vm.runInContext('ROLE_PROFILE_MIN_GAMES', sandbox, { timeout: 5000 }), 5, 'Schwelle ist 5 (dieselbe wie bei der Duo-Analyse)');
  const got = vm.runInContext(`(function(){
    const pott = Object.values(PLAYER_REGISTRY.players).find(p => p.name === 'Lars Pottgüter');
    const stanek = Object.values(PLAYER_REGISTRY.players).find(p => p.name === 'Michael Staněk');
    const pottPd = { playerId: pott.playerId, key: '', label: pott.name, analysisProfile: null };
    const stanekPd = { playerId: stanek.playerId, key: '', label: stanek.name, analysisProfile: null };
    const pottLow = getSeasonScopedIdentityProfile(pottPd, '21/22'); // 1 Feldspiel, unter der Schwelle
    const stanekOk = getSeasonScopedIdentityProfile(stanekPd, '21/22'); // 6 Feldspiele, über der Schwelle
    return {
      pott: { fieldCount: pottLow.radarBasis.fieldCount, lowDataBasis: pottLow.lowDataBasis, coreRole: pottLow.coreRole, roles: pottLow.roles },
      stanek: { fieldCount: stanekOk.radarBasis.fieldCount, lowDataBasis: stanekOk.lowDataBasis },
    };
  })()`, sandbox, { timeout: 15000 });
  assertEqual(got, {
    pott: { fieldCount: 1, lowDataBasis: true, coreRole: null, roles: [] },
    stanek: { fieldCount: 6, lowDataBasis: false },
  }, 'unter 5 Feldspielen: kein Rollentyp (coreRole:null, roles:[]); ab 5: normales Profil');
}

console.log('== Punkt 8: Eigentor in Spiel 44379 (Rückennummer 1000) löst keine Warnung mehr aus ==');
{
  const matches = capturedWarnings.filter(w => w.includes('44379') || w.includes('auflösbaren Schützen'));
  assertEqual(matches, [], 'keine "Tor-Event ohne auflösbaren Schützen übersprungen"-Warnung während des gesamten Ladevorgangs');
}

console.log('== Punkt 1/6 letzter Testfall: Torhüter erzielt ein echtes Tor (noch nie vorgekommen, Pfad muss es trotzdem können) ==');
{
  const got = vm.runInContext(`(function(){
    const game = {
      id: 999001, date: '2026-01-01',
      home_team_name: 'VfB Ulm', guest_team_name: 'Testgegner',
      home_goals: '1', guest_goals: '0', ended: true,
      players: {
        home: [ { player_firstname: 'Theo', player_name: 'Testhueter', trikot_number: 1, position: 'Tor', goalkeeper: true } ],
        guest: [],
      },
      events: [
        { event_id: 1, event_type: 'goal', event_team: 'home', period: 1, time: '5:00', number: 1, assist: 0, goal_type: 'regular', goal_type_string: 'Tor', home_goals: 1, guest_goals: 0 },
      ],
    };
    const role = playerRoleInGame(game.players.home[0], game, '');
    const result = buildPlayerEvents('Theo Testhueter', [game]);
    return { role, eventCount: result.events.length, event: result.events[0] ? { type: result.events[0].type, role: result.events[0].role } : null };
  })()`, sandbox, { timeout: 15000 });
  assertEqual(got, { role: 'goalie', eventCount: 1, event: { type: 'Tor', role: 'goalie' } }, 'ein von einem Torhüter erzieltes echtes Tor wird korrekt als role:"goalie" markiert, nicht verworfen');
}

console.log('== Eigentor wird weiterhin korrekt als "kein Schütze" behandelt (Punkt 8, Funktionstest) ==');
{
  const got = vm.runInContext(`isOwnGoalEvent({goal_type:'owngoal'})&&!isOwnGoalEvent({goal_type:'regular'})`, sandbox, { timeout: 5000 });
  assertTrue(got, 'isOwnGoalEvent erkennt Eigentore und nur diese');
}

console.log('');
if (failures > 0) {
  console.log(`${failures} Test(s) fehlgeschlagen.`);
  process.exitCode = 1;
} else {
  console.log('Alle Tests erfolgreich.');
}

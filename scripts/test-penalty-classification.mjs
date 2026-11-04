#!/usr/bin/env node
// Test für den S2i-Auftrag "Strafenklassifikation zusammenführen": EINE Funktion (classifyPenaltyType),
// die isMatchPenaltyEvent, isTwoPlusTwoPenaltyEvent, getPenaltyDisciplineType und
// getSpecialTeamsPenaltyChunks aufrufen — vorher entschieden isMatchPenaltyEvent und
// getSpecialTeamsPenaltyChunks dieselbe Frage unterschiedlich ("MS" traf \bms\b, aber nicht
// includes('match')). Primär auf penalty_type geschlüsselt, Text nur als Rückfallebene; ein
// unbekannter Typ fällt nicht mehr still auf [120] durch, sondern wird über den bestehenden
// stats.diagnostics.unknownPenaltyDurations-Kanal gemeldet. Lädt die echte App (matchcenter-core.js +
// index.html-Skript + echte eingebettete Saisondaten) in einen node:vm-Kontext, dieselbe Technik wie die
// übrigen S2-Tests dieser Phase.
//
// Aufruf: node scripts/test-penalty-classification.mjs

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

console.log('== Eine Klassifikation: isMatchPenaltyEvent/isTwoPlusTwoPenaltyEvent/getPenaltyDisciplineType/getSpecialTeamsPenaltyChunks stimmen für alle 288 echten Strafen mit classifyPenaltyType ueberein ==');
{
  const out = vm.runInContext(`(function(){
    let total = 0;
    const mismatches = [];
    for (const seasonKey of Object.keys(SEASONS)) {
      const games = SEASONS[seasonKey]?.data?.rawGames || [];
      for (const g of games) {
        for (const ev of (g.events||[])) {
          if (ev.event_type !== 'penalty') continue;
          total++;
          const type = classifyPenaltyType(ev).type;
          const consistent = isMatchPenaltyEvent(ev) === (type === 'match')
            && isTwoPlusTwoPenaltyEvent(ev) === (type === '2+2')
            && getPenaltyDisciplineType(ev) === (type === 'unknown' ? '2min' : type);
          if (!consistent) mismatches.push({ gameId: g.id, type, penalty_type: ev.penalty_type });
        }
      }
    }
    return { total, mismatches };
  })()`, sandbox, { timeout: 30000 });
  assertEqual(out.total, 288, 'Vorbedingung: 288 Strafereignisse im Archiv geprüft');
  assertEqual(out.mismatches, [], 'alle vier Klassifikationsfunktionen stimmen für jede einzelne Strafe überein (eine Quelle der Wahrheit)');
}

console.log('== Reale Prüffälle: penalty_type je Fall, Chunks, Discipline-Minuten ==');
{
  const out = vm.runInContext(`(function(){
    const find = (gameId, penaltyType) => {
      for (const seasonKey of Object.keys(SEASONS)) {
        const games = SEASONS[seasonKey]?.data?.rawGames || [];
        const g = games.find(x => String(x.id) === String(gameId));
        if (!g) continue;
        const ev = (g.events||[]).find(e => e.event_type === 'penalty' && e.penalty_type === penaltyType);
        if (ev) return { seasonKey, ev };
      }
      return null;
    };
    const msCase = find(44415, 'penalty_ms_full');
    return {
      ms: msCase ? { penalty_type: msCase.ev.penalty_type, type: classifyPenaltyType(msCase.ev).type, chunks: getSpecialTeamsPenaltyChunks(msCase.ev), personalMinutes: getPenaltyBasePersonalMinutes(msCase.ev) } : null,
    };
  })()`, sandbox, { timeout: 15000 });
  assertEqual(out.ms, { penalty_type: 'penalty_ms_full', type: 'match', chunks: [120, 120], personalMinutes: 4 }, '25/26 Spiel 44415 (MS, Rückennummer 17): klassifiziert als match, Special-Teams-Häppchen [120,120] (vorher [120] — der behobene Fehler), Basis-Personalminuten unverändert 4');
}

console.log('== Beide Schreibweisen (2\'/2 Minuten, 2+2/2+2 Minuten) klassifizieren identisch ==');
{
  const out = vm.runInContext(`(function(){
    const rows = [];
    for (const seasonKey of Object.keys(SEASONS)) {
      const games = SEASONS[seasonKey]?.data?.rawGames || [];
      for (const g of games) {
        for (const ev of (g.events||[])) {
          if (ev.event_type !== 'penalty') continue;
          rows.push({ penalty_type: ev.penalty_type, penalty_type_string: ev.penalty_type_string, type: classifyPenaltyType(ev).type, chunks: getSpecialTeamsPenaltyChunks(ev) });
        }
      }
    }
    const byCode = {};
    for (const r of rows) {
      if (!byCode[r.penalty_type]) byCode[r.penalty_type] = new Set();
      byCode[r.penalty_type].add(JSON.stringify([r.type, r.chunks]));
    }
    return Object.fromEntries(Object.entries(byCode).map(([k, v]) => [k, [...v]]));
  })()`, sandbox, { timeout: 15000 });
  assertEqual(Object.values(out).every((variants) => variants.length === 1), true, 'je penalty_type-Code (unabhängig von der penalty_type_string-Schreibweise) immer genau ein Klassifikations-/Chunk-Ergebnis');
  assertEqual(out.penalty_2, ['["2min",[120]]'], 'penalty_2 ("2\'" und "2 Minuten", 280 Fälle): immer 2min/[120]');
  assertEqual(out.penalty_2and2, ['["2+2",[120,120]]'], 'penalty_2and2 ("2+2" und "2+2 Minuten", 4 Fälle): immer 2+2/[120,120]');
}

console.log('== Die drei penalty_10-Fälle: 2min-Überzahlchance, 10 Personalminuten ==');
{
  const out = vm.runInContext(`(function(){
    const ids = ['29301', '32748', '44423'];
    const results = [];
    for (const seasonKey of Object.keys(SEASONS)) {
      const games = SEASONS[seasonKey]?.data?.rawGames || [];
      for (const id of ids) {
        const g = games.find(x => String(x.id) === id);
        if (!g) continue;
        const ev = (g.events||[]).find(e => e.event_type === 'penalty' && e.penalty_type === 'penalty_10');
        if (ev) results.push({ gameId: id, seasonKey, type: classifyPenaltyType(ev).type, chunks: getSpecialTeamsPenaltyChunks(ev), personalMinutes: getPenaltyBasePersonalMinutes(ev) });
      }
    }
    return results;
  })()`, sandbox, { timeout: 15000 });
  assertEqual(out.length, 3, 'alle drei penalty_10-Spiele gefunden (22/23 29301, 23/24 32748, 25/26 44423)');
  assertTrue(out.every((r) => r.type === '10min' && JSON.stringify(r.chunks) === '[120]' && r.personalMinutes === 10), '10min ueberall: EINE 2-Minuten-Ueberzahlchance, 10 Personalminuten (Ist-Zustand, unveraendert)');
}

console.log('== Unbekannter penalty_type: keine stille [120]-Vermutung, sondern Meldung ==');
{
  const out = vm.runInContext(`(function(){
    const ev = { event_type: 'penalty', penalty_type: 'penalty_99', penalty_type_string: '', penalty_reason_string: '', event_team: 'home', period: 1, time: '5:00', number: 9 };
    const classified = classifyPenaltyType(ev);
    const chunks = getSpecialTeamsPenaltyChunks(ev);
    const game = {
      id: 900010, date: '2026-01-01', home_team_name: 'VfB Ulm', guest_team_name: 'Testgegner',
      home_goals: '1', guest_goals: '0', ended: true,
      events: [ev],
    };
    const stats = buildSpecialTeamsForGame(game, '26/27');
    return { classified, chunks, unknownPenaltyDurations: stats.diagnostics.unknownPenaltyDurations };
  })()`, sandbox, { timeout: 15000 });
  assertEqual(out.classified.type, 'unknown', 'ein unbekannter penalty_type ohne erkennbaren Text klassifiziert als "unknown"');
  assertEqual(out.chunks, [], 'getSpecialTeamsPenaltyChunks liefert [] statt geraten [120]');
  assertEqual(out.unknownPenaltyDurations.length, 1, 'buildSpecialTeamsForGame meldet den Fall über stats.diagnostics.unknownPenaltyDurations, statt ihn stillschweigend als 2 Minuten zu werten');
}

console.log('== getPenaltyBasePersonalMinutes: Ist-Zustand je Typ unveraendert (2min=2, 2+2=4, 10min=10, 5min=5, match=4 als Platzhalter) ==');
{
  const out = vm.runInContext(`([
    getPenaltyBasePersonalMinutes({penalty_type:'penalty_2'}),
    getPenaltyBasePersonalMinutes({penalty_type:'penalty_2and2'}),
    getPenaltyBasePersonalMinutes({penalty_type:'penalty_10'}),
    getPenaltyBasePersonalMinutes({penalty_type:'penalty_5'}),
    getPenaltyBasePersonalMinutes({penalty_type:'penalty_ms_full'}),
  ])`, sandbox, { timeout: 15000 });
  assertEqual(out, [2, 4, 10, 5, 4], 'Basis-Personalminuten je Typ: 2/4/10/5/4 — die "4" bei Matchstrafe ist nur der Rückfallwert von getPenaltyPersonalMinutes bei unlesbarer Zeit, nicht "ganzes Spiel" als Zahl (siehe Bericht)');
}

console.log('');
if (failures > 0) {
  console.log(`${failures} Test(s) fehlgeschlagen.`);
  process.exitCode = 1;
} else {
  console.log('Alle Tests erfolgreich.');
}

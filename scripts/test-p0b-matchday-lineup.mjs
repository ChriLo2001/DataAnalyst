#!/usr/bin/env node
// Aufgabe 12 — Test für die auf der Spieltag-Detailseite sichtbare Einsatz-Center-Aufstellung
// (matchdayLineupInfo, matchdayLineupCardHtml, matchdayGameCardHtml). Reine Anzeige: Anzahl
// Feldspieler/Torwart plus Namen, KEINE Auswertung/Kennzahl, nur solange kein Ergebnis vorliegt.
//
// Die echten Funktionen werden unverändert aus dem index.html-Text geschnitten und in node:vm
// ausgeführt (gleiches Muster wie scripts/test-p0b-matchday-headline.mjs). Ersetzt sind nur die
// UI-Primitiven (uiNotiz/uiHinweisKarte, fangen die Kernaussage ab) — getEffectiveLineupData,
// resolveLineupPlayerName, matchdayLineupInfo und matchdayLineupCardHtml sind der echte Code.
//
// Aufruf: node scripts/test-p0b-matchday-lineup.mjs

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

const html = (await readFile(path.join(REPO_ROOT, 'index.html'), 'utf8')).replace(/\r\n/g, '\n');
function fnSource(name) {
  const m = new RegExp(`(^|\\n)function ${name}\\(`).exec(html);
  if (!m) throw new Error(`Funktion nicht gefunden: ${name}`);
  const from = m.index + m[1].length;
  return html.slice(from, html.indexOf('\n}', from) + 2);
}

const HELPERS = ['getEffectiveLineupData', 'resolveLineupPlayerName', 'matchdayLineupInfo', 'matchdayLineupCardHtml'];
const code = [
  // Minimaler, realitätsnaher Zustand: zwei Draft-Spieler + ein importierter Torwart, exakt im Schema
  // von getEinsatzCenterGameDraft()/LINEUP_DATA (roster:{field:[],goalies:[]}, Spieler-IDs als Strings).
  'let LINEUP_DATA={};',
  'let EINSATZ_CENTER_DRAFT=null;',
  'let EINSATZ_CENTER_DRAFT_EXCLUDED=null;',
  'let S={playerRegistry:{players:{}}};',
  'const PLAYER_REGISTRY={players:{}};',
  'function escHtml(s){return String(s);}',
  "const uiHinweisKarte=({observation})=>`<card>${observation}</card>`;",
  ...HELPERS.map(fnSource),
].join('\n');

function makeCtx() {
  const ctx = vm.createContext({ console });
  vm.runInContext(code, ctx);
  return ctx;
}

console.log('== Fall 1: kein Eintrag für dieses Spiel -> matchdayLineupInfo/-CardHtml liefern nichts ==');
{
  const ctx = makeCtx();
  vm.runInContext("LINEUP_DATA['26/27']={schemaVersion:1,season:'26/27',games:[]};", ctx);
  assertEqual(vm.runInContext("matchdayLineupInfo('26/27', 63384)", ctx), null, 'matchdayLineupInfo liefert null ohne Eintrag');
  assertEqual(vm.runInContext("matchdayLineupCardHtml('26/27', 63384)", ctx), '', 'matchdayLineupCardHtml liefert leeren String ohne Eintrag');
}

console.log('== Fall 2: leerer Eintrag (roster.field/goalies beide leer) -> ebenfalls nichts ==');
{
  const ctx = makeCtx();
  vm.runInContext("LINEUP_DATA['26/27']={schemaVersion:1,season:'26/27',games:[{gameId:63384,roster:{field:[],goalies:[]},groups:[],confirmedCombinations:[],note:''}]};", ctx);
  assertEqual(vm.runInContext("matchdayLineupInfo('26/27', 63384)", ctx), null, 'leerer Kader zählt wie kein Eintrag');
}

console.log('== Fall 3: echte Aufstellung (importiert, via LINEUP_DATA) -> Anzahl + Namen korrekt ==');
{
  const ctx = makeCtx();
  vm.runInContext(`
    S.playerRegistry.players = {
      'api:1': { playerId: 'api:1', name: 'Christian Loser' },
      'api:2': { playerId: 'api:2', name: 'Thomas Büchler' },
      'api:99': { playerId: 'api:99', name: 'Christian Hopfe' },
    };
    LINEUP_DATA['26/27'] = { schemaVersion: 1, season: '26/27', games: [
      { gameId: 63384, roster: { field: ['api:1','api:2'], goalies: ['api:99'] }, groups: [], confirmedCombinations: [], note: '' },
    ]};
  `, ctx);
  const info = vm.runInContext("matchdayLineupInfo('26/27', 63384)", ctx);
  assertEqual(info.fieldCount, 2, 'fieldCount korrekt');
  assertEqual(info.goalieCount, 1, 'goalieCount korrekt');
  assertEqual(info.fieldNames, ['Christian Loser', 'Thomas Büchler'], 'Feldspieler-Namen korrekt und in Kader-Reihenfolge');
  assertEqual(info.goalieNames, ['Christian Hopfe'], 'Torwart-Name korrekt');

  const cardHtml = vm.runInContext("matchdayLineupCardHtml('26/27', 63384)", ctx);
  assertTrue(cardHtml.includes('2 Feldspieler'), 'Karte nennt die Feldspieler-Anzahl');
  assertTrue(cardHtml.includes('1 Torwart'), 'Karte nennt die Torwart-Anzahl');
  assertTrue(cardHtml.includes('Christian Loser') && cardHtml.includes('Thomas Büchler') && cardHtml.includes('Christian Hopfe'), 'Karte nennt alle drei Namen');
  assertTrue(!/\d+[.,]\d|Quote|Score|Punkte\/Spiel|%/.test(cardHtml), 'Karte enthält keine Auswertung/Kennzahl (nur Anzahl + Namen, wie beauftragt)');
}

console.log('== Fall 4: unbekannte Spieler-ID (kein Registry-Eintrag) -> Platzhalter statt Absturz ==');
{
  const ctx = makeCtx();
  vm.runInContext("LINEUP_DATA['26/27']={schemaVersion:1,season:'26/27',games:[{gameId:63384,roster:{field:['api:900001'],goalies:[]},groups:[],confirmedCombinations:[],note:''}]};", ctx);
  const info = vm.runInContext("matchdayLineupInfo('26/27', 63384)", ctx);
  assertTrue(info.fieldNames[0].includes('api:900001'), 'unbekannte ID wird als Platzhalter mit der ID selbst angezeigt, nicht erraten');
}

console.log('== Fall 5: nur im Entwurf (EINSATZ_CENTER_DRAFT), noch nicht importiert -> wird trotzdem angezeigt ==');
{
  const ctx = makeCtx();
  vm.runInContext(`
    S.playerRegistry.players = { 'api:5': { playerId: 'api:5', name: 'Ole Birnbaum' } };
    LINEUP_DATA['26/27'] = { schemaVersion: 1, season: '26/27', games: [] };
    const draftMap = new Map();
    draftMap.set(63384, { gameId: 63384, roster: { field: ['api:5'], goalies: [] }, groups: [], confirmedCombinations: [], note: '' });
    EINSATZ_CENTER_DRAFT = { seasonKey: '26/27', baseHash: 'x', games: draftMap, newGroups: new Map(), renamedGroups: new Map() };
  `, ctx);
  const info = vm.runInContext("matchdayLineupInfo('26/27', 63384)", ctx);
  assertTrue(!!info, 'Entwurf (noch nicht exportiert/importiert) wird ebenfalls angezeigt — "eingetragen" deckt beide Zustände ab');
  assertEqual(info.fieldNames, ['Ole Birnbaum'], 'Name aus dem Entwurf korrekt aufgelöst');
}

console.log('== Fall 6: Entwurf für eine ANDERE Saison wird nicht fälschlich mitgezeigt ==');
{
  const ctx = makeCtx();
  vm.runInContext(`
    LINEUP_DATA['26/27'] = { schemaVersion: 1, season: '26/27', games: [] };
    const draftMap = new Map();
    draftMap.set(63384, { gameId: 63384, roster: { field: ['api:5'], goalies: [] }, groups: [], confirmedCombinations: [], note: '' });
    EINSATZ_CENTER_DRAFT = { seasonKey: '25/26', baseHash: 'x', games: draftMap, newGroups: new Map(), renamedGroups: new Map() };
  `, ctx);
  assertEqual(vm.runInContext("matchdayLineupInfo('26/27', 63384)", ctx), null, 'Entwurf einer anderen Saison bleibt unberücksichtigt');
}

console.log('');
if (failures > 0) {
  console.log(`${failures} Test(s) fehlgeschlagen.`);
  process.exitCode = 1;
} else {
  console.log('Alle Tests erfolgreich.');
}

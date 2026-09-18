#!/usr/bin/env node
// P0c.2 — Test für getEffectiveLineupData() (Spezifikation 3.6.5, Punkt 2).
//
// index.html ist ein klassisches <script>; der Einsatz-Center-Bereich
// (von "const LINEUP_DATA={};" bis "window.einsatzCenterSoftIssues=…") enthält
// nur Deklarationen und window.*-Zuweisungen und wird hier unverändert aus dem
// echten index.html-Text herausgeschnitten und in einem node:vm-Kontext mit
// minimalen Stubs ausgeführt (kein Browser, keine Kopie der Logik).
// Liest index.html/lineup-data nur lesend, schreibt nichts.
//
// Aufruf: node scripts/test-p0c2-effective-lineup.mjs

import { readFile } from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';

import { computeBaseHash } from './lineup-data-hash.mjs';

const REPO_ROOT = path.resolve(import.meta.dirname, '..');
const SEASON_KEYS = ['21/22', '22/23', '23/24', '24/25', '25/26'];
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

const html = await readFile(path.join(REPO_ROOT, 'index.html'), 'utf8');
const START = 'const LINEUP_DATA={};';
const END = 'window.einsatzCenterSoftIssues=einsatzCenterSoftIssues;';
const startIdx = html.indexOf(START);
const endIdx = html.indexOf(END);
if (startIdx === -1 || endIdx === -1 || html.indexOf(START, startIdx + 1) !== -1) {
  console.log('FAIL Einsatz-Center-Bereich in index.html nicht eindeutig gefunden');
  process.exit(1);
}
const region = html.slice(startIdx, endIdx + END.length);

const realSeason = JSON.parse(await readFile(path.join(REPO_ROOT, 'lineup-data', '25-26.json'), 'utf8'));
const realRegistry = JSON.parse(await readFile(path.join(REPO_ROOT, 'lineup-data', 'groups.json'), 'utf8'));

function syntheticGame(gameId, playerIds = []) {
  return { gameId, roster: { field: [...playerIds], goalies: [] }, groups: [], confirmedCombinations: [], note: '' };
}
function syntheticSeason(seasonKey, ids) {
  return { schemaVersion: 1, season: seasonKey, games: ids.map((id) => syntheticGame(id, [`api:${id}`])) };
}

/** Frischer vm-Kontext mit dem unveränderten Einsatz-Center-Code. */
function boot({ lineup = {}, registry = realRegistry } = {}) {
  const S = { einsatzCenterSeasonKey: '25/26' };
  const SEASONS = {};
  for (const k of SEASON_KEYS) SEASONS[k] = { data: { rawGames: [{ id: 1, date: '2026-01-01', home_team_name: 'VfB Ulm', guest_team_name: 'X' }] } };
  const ctx = vm.createContext({
    window: {},
    S,
    SEASONS,
    PLAYER_REGISTRY: { players: {} },
    SEASON_CONFIG: Object.fromEntries(SEASON_KEYS.map((k) => [k, { label: k }])),
    CURRENT_SEASON_KEY: '25/26',
    structuredClone,
    TextEncoder,
    crypto: globalThis.crypto,
    fetch: () => Promise.reject(new Error('kein Netzwerk im Test')),
    console,
    setState: () => {},
    escHtml: (s) => String(s),
    escAttr: (s) => String(s),
    detectUlmSide: () => 'home',
    __lineup: lineup,
    __registry: registry,
  });
  vm.runInContext(region, ctx);
  vm.runInContext('for(const k of Object.keys(__lineup))LINEUP_DATA[k]=__lineup[k];LINEUP_GROUPS_REGISTRY=__registry;', ctx);
  return { ctx, run: (code) => vm.runInContext(code, ctx) };
}

// ── A ──────────────────────────────────────────────────────────────────
console.log('== A: getEffectiveLineupData existiert und ist aufrufbar ==');
{
  const { ctx, run } = boot();
  assertEqual(run('typeof getEffectiveLineupData'), 'function', 'getEffectiveLineupData ist eine Funktion');
  assertEqual(typeof ctx.window.getEffectiveLineupData, 'function', 'als window.getEffectiveLineupData exportiert');
  assertEqual(run("getEffectiveLineupData('25/26')"), undefined, 'aufrufbar; ohne geladene Daten und ohne Draft undefined (wie LINEUP_DATA[key])');
}

// ── B ──────────────────────────────────────────────────────────────────
console.log('');
console.log('== B: kein Draft / leerer Draft -> Effective == Raw-Importzustand (alle 5 Saisons) ==');
for (const [label, lineup] of [
  ['echte lineup-data (nur 25/26 vorhanden)', { '25/26': realSeason }],
  ['synthetische Daten für alle 5 Saisons', Object.fromEntries(SEASON_KEYS.map((k, i) => [k, syntheticSeason(k, [10 + i, 20 + i, 30 + i])]))],
]) {
  console.log(`  -- ${label}`);
  const { run } = boot({ lineup });
  for (const key of SEASON_KEYS) {
    const before = run(`JSON.stringify(LINEUP_DATA['${key}'])`);
    assertTrue(run(`getEffectiveLineupData('${key}')===LINEUP_DATA['${key}']`), `${key}: ohne Draft referenzgleich zum Raw-Stand`);
    assertEqual(run(`JSON.stringify(getEffectiveLineupData('${key}'))`), before, `${key}: ohne Draft inhaltlich identisch`);
    run(`EINSATZ_CENTER_DRAFT=null`);
    // Draft einer ANDEREN Saison ändert diese Saison nicht
    const other = SEASON_KEYS.find((k) => k !== key);
    run(`EINSATZ_CENTER_DRAFT={seasonKey:'${other}',baseHash:'x',games:new Map([[1,{gameId:1}]]),newGroups:new Map(),renamedGroups:new Map()}`);
    assertTrue(run(`getEffectiveLineupData('${key}')===LINEUP_DATA['${key}']`), `${key}: Draft einer anderen Saison beeinflusst nichts`);
    run(`EINSATZ_CENTER_DRAFT=null`);
    // Leerer Draft (echt über ensureEinsatzCenterDraft erzeugt)
    await run(`ensureEinsatzCenterDraft('${key}')`);
    assertEqual(run('EINSATZ_CENTER_DRAFT.games.size'), 0, `${key}: frischer Draft ist leer`);
    assertTrue(run(`getEffectiveLineupData('${key}')===LINEUP_DATA['${key}']`), `${key}: leerer Draft -> referenzgleich zum Raw-Stand`);
    assertEqual(run(`JSON.stringify(getEffectiveLineupData('${key}'))`), before, `${key}: leerer Draft -> inhaltlich identisch`);
    run(`EINSATZ_CENTER_DRAFT=null`);
  }
}

// ── C / D / E ──────────────────────────────────────────────────────────
console.log('');
console.log('== C: künstlicher Draft verändert den Effective-State ==');
const rawSeason = syntheticSeason('25/26', [1, 2, 3]);
const rawSnapshot = clone(rawSeason);
const registrySnapshot = clone(realRegistry);
const { ctx, run } = boot({ lineup: { '25/26': rawSeason, '24/25': syntheticSeason('24/25', [7]) } });
await run(`ensureEinsatzCenterDraft('25/26')`);
const baseHashAtStart = run('EINSATZ_CENTER_DRAFT.baseHash');
const expectedRawHash = await computeBaseHash(rawSnapshot, registrySnapshot);

// Änderungen ausschließlich über die bestehenden Mutationsfunktionen
run(`window.setEinsatzCenterGameNote(2,'Entwurfsnotiz')`);
run(`window.addEinsatzCenterRosterPlayer(2,'field','api:999')`);
run(`window.addEinsatzCenterRosterPlayer(9999,'goalies','api:888')`);
{
  const eff = run(`getEffectiveLineupData('25/26')`);
  assertTrue(run(`getEffectiveLineupData('25/26')!==LINEUP_DATA['25/26']`), 'Effective ist bei nicht-leerem Draft ein neues Objekt');
  assertEqual(eff.games.map((g) => g.gameId), [1, 2, 3, 9999], 'Reihenfolge wie mergeGames(): bekannte IDs an Ort ersetzt, neue angehängt');
  assertEqual(eff.games[1].note, 'Entwurfsnotiz', 'geänderte Notiz von Spiel 2 ist im Effective-State sichtbar');
  assertEqual(eff.games[1].roster.field, ['api:2', 'api:999'], 'ergänzter Feldspieler in Spiel 2 sichtbar');
  assertEqual(eff.games[3].roster.goalies, ['api:888'], 'neues Spiel 9999 (nur im Draft) erscheint im Effective-State');
  assertTrue(run(`getEffectiveLineupData('25/26').games[0]===LINEUP_DATA['25/26'].games[0]`), 'unberührtes Spiel 1 bleibt dieselbe Raw-Referenz');
  assertEqual(eff.schemaVersion, 1, 'schemaVersion bleibt erhalten');
  assertEqual(eff.season, '25/26', 'season bleibt erhalten');
  assertTrue(run(`getEffectiveLineupData('24/25')===LINEUP_DATA['24/25']`), 'andere Saison bleibt unberührt (referenzgleich)');
}
{
  const { run: run2 } = boot({ lineup: {} });
  await run2(`ensureEinsatzCenterDraft('23/24')`);
  run2(`window.setEinsatzCenterGameNote(5,'nur Draft')`);
  const eff = run2(`getEffectiveLineupData('23/24')`);
  assertEqual([eff.schemaVersion, eff.season, eff.games.map((g) => g.gameId)], [1, '23/24', [5]], 'Saison ohne Raw-Daten + Draft: Effective = Gerüst + Draft-Spiel (wie ensureEinsatzCenterDraft-Fallback)');
}

console.log('');
console.log('== D: Raw-State LINEUP_DATA bleibt unverändert ==');
assertEqual(run(`JSON.stringify(LINEUP_DATA['25/26'])`), JSON.stringify(rawSnapshot), 'LINEUP_DATA[25/26] nach Draft-Änderungen inhaltlich unverändert');
assertEqual(run(`LINEUP_DATA['25/26'].games.map(g=>g.note)`), ['', '', ''], 'keine Entwurfsnotiz im Raw-Stand');
assertEqual(run(`LINEUP_DATA['25/26'].games.length`), 3, 'kein Draft-Spiel im Raw-Stand');
assertEqual(run('JSON.stringify(LINEUP_GROUPS_REGISTRY)'), JSON.stringify(registrySnapshot), 'Registry ebenfalls unverändert');
assertTrue(run(`LINEUP_DATA['25/26']===__lineup['25/26']`), 'Raw-Objekt ist dieselbe Instanz (nicht ersetzt)');

console.log('');
console.log('== E: baseHash/Draft-Basiszustand bleibt auf dem Raw-State ==');
assertEqual(baseHashAtStart, expectedRawHash, 'baseHash beim Draft-Start == Node-computeBaseHash(Raw, Registry) (Browser-Port byte-identisch)');
assertEqual(run('EINSATZ_CENTER_DRAFT.baseHash'), baseHashAtStart, 'baseHash nach Draft-Änderungen unverändert (Snapshot)');
{
  const exported = await run('window.buildEinsatzCenterDraftExport()');
  assertEqual(exported.baseHash, expectedRawHash, 'Export-baseHash == Hash des Raw-Stands');
  assertEqual(exported.games.map((g) => g.gameId), [2, 9999], 'Export enthält weiterhin nur die vom Draft berührten Spiele');
  const effectiveHash = await run(`einsatzCenterComputeBaseHash(getEffectiveLineupData('25/26'),LINEUP_GROUPS_REGISTRY)`);
  assertTrue(effectiveHash !== expectedRawHash, 'Kontrolle: ein Hash über den Effective-State wäre ein anderer Wert (baseHash ist nicht darauf umgestellt)');
  // getEinsatzCenterGameDraft seedet weiter aus dem RAW-Stand, nicht aus dem Effective-State
  run(`window.setEinsatzCenterGameNote(3,'x')`);
  assertEqual(run('EINSATZ_CENTER_DRAFT.games.get(3).roster.field'), ['api:3'], 'Draft-Seed für Spiel 3 stammt aus dem Raw-Stand');
}

// ── F ──────────────────────────────────────────────────────────────────
console.log('');
console.log('== F: migrierte Funktionen nutzen den Accessor, Raw-Zugriffe nur an erlaubten Stellen ==');
function functionSource(name) {
  const m = new RegExp(`(^|\\n)(async )?function ${name}\\(`).exec(region);
  if (!m) return null;
  const from = m.index + m[1].length;
  const end = region.indexOf('\n}', from);
  return region.slice(from, end + 2);
}
for (const name of ['rEinsatzCenterPage', 'computeEinsatzCenterStats', 'rEinsatzCenterEditPage']) {
  const src = functionSource(name);
  assertTrue(src && src.includes('getEffectiveLineupData('), `${name} verwendet getEffectiveLineupData()`);
  assertTrue(src && !src.includes('LINEUP_DATA'), `${name} liest LINEUP_DATA nicht mehr direkt`);
}
{
  // einsatzCenterCurrentRawBaseHash (P0c.3): baseHash-Vergleich des Autosave-Eintrags braucht den Raw-Stand.
  const allowed = new Set(['ensureLineupDataLoaded', 'getEffectiveLineupData', 'ensureEinsatzCenterDraft', 'getEinsatzCenterGameDraft', 'einsatzCenterCurrentRawBaseHash']);
  const fnRegex = /(^|\n)(?:async )?function (\w+)\(/g;
  const offenders = [];
  const readers = [];
  let m;
  while ((m = fnRegex.exec(region))) {
    const name = m[2];
    const src = functionSource(name);
    // Kommentarzeilen ignorieren
    const code = src.split('\n').filter((l) => !l.trim().startsWith('//') && !l.trim().startsWith('*') && !l.trim().startsWith('/*')).join('\n');
    if (/LINEUP_DATA\s*\[/.test(code)) {
      readers.push(name);
      if (!allowed.has(name)) offenders.push(name);
    }
  }
  assertEqual(offenders, [], 'kein weiterer Code außerhalb der erlaubten Raw-Leser greift direkt auf LINEUP_DATA[...] zu');
  assertEqual([...readers].sort(), [...allowed].sort(), 'die erlaubten Raw-Leser sind genau Loader, Accessor, Draft-Start (baseHash), Draft-Seed und Raw-baseHash-Vergleich (P0c.3)');
}

// ── G ──────────────────────────────────────────────────────────────────
console.log('');
console.log('== G: bestehende Einsatz-Center-Funktionen bleiben funktionsfähig ==');
{
  const { run: r } = boot({ lineup: { '25/26': syntheticSeason('25/26', [1, 2, 3]) } });
  const statsBefore = JSON.stringify(r(`computeEinsatzCenterStats('25/26')`));
  assertEqual(r(`computeEinsatzCenterStats('25/26').gamesCounted`), 3, 'Stats ohne Draft: 3 Spiele');
  assertTrue(r(`computeEinsatzCenterStats('25/26')===computeEinsatzCenterStats('25/26')`), 'Stats-Cache greift ohne Draft weiterhin (gleiche Referenz)');

  await r(`ensureEinsatzCenterDraft('25/26')`);
  assertEqual(JSON.stringify(r(`computeEinsatzCenterStats('25/26')`)), statsBefore, 'Stats mit leerem Draft == Stats ohne Draft');
  r(`window.addEinsatzCenterRosterPlayer(9999,'field','api:1')`);
  assertEqual(r(`computeEinsatzCenterStats('25/26').gamesCounted`), 4, 'Stats berücksichtigen das Draft-Spiel (Effective-State)');
  assertEqual(r(`computeEinsatzCenterStats('25/26').players.find(p=>p.playerId==='api:1').totalGames`), 2, 'Spieler api:1 zählt jetzt 2 Spiele (Raw + Draft)');
  r(`window.addEinsatzCenterRosterPlayer(9999,'field','api:1')`);
  assertEqual(r(`computeEinsatzCenterStats('25/26').players.find(p=>p.playerId==='api:1').totalGames`), 2, 'wiederholtes Hinzufügen bleibt idempotent');

  const page = r(`rEinsatzCenterPage()`);
  assertTrue(page.includes('Einsätze &amp; Reihen') && page.includes('Kennzahlen aus den gespeicherten Einsatzdaten'), 'rEinsatzCenterPage rendert (Ansicht + Kennzahlen)');
  assertTrue(page.includes('Spiel-ID 9999'), 'rEinsatzCenterPage zeigt das Draft-Spiel über den Effective-State');
  const editPage = r(`rEinsatzCenterEditPage()`);
  assertTrue(editPage.includes('Entwurf bearbeiten') && editPage.includes('1 Spiel(e)'), 'rEinsatzCenterEditPage rendert mit Draft-Zusammenfassung');

  r('window.cancelEinsatzCenterEdit()');
  assertEqual(r('EINSATZ_CENTER_DRAFT'), null, 'cancelEinsatzCenterEdit verwirft den Draft weiterhin');
  assertEqual(JSON.stringify(r(`computeEinsatzCenterStats('25/26')`)), statsBefore, 'nach Verwerfen wieder exakt die Stats des Raw-Stands');
  assertTrue(r(`getEffectiveLineupData('25/26')===LINEUP_DATA['25/26']`), 'nach Verwerfen wieder referenzgleich zum Raw-Stand');
  assertTrue(!r(`rEinsatzCenterPage()`).includes('Spiel-ID 9999'), 'nach Verwerfen ist das Draft-Spiel aus der Ansicht verschwunden');
  assertEqual(r(`rEinsatzCenterEditPage()`).includes('Kein Entwurf aktiv.'), true, 'Edit-Seite ohne Draft zeigt weiterhin "Kein Entwurf aktiv."');
}
{
  // Draft-Export -> echter Importer-Roundtrip-Kern: Export enthält nur Draft-Spiele und den Raw-Hash
  const { run: r } = boot({ lineup: { '25/26': realSeason } });
  await r(`ensureEinsatzCenterDraft('25/26')`);
  const firstId = realSeason.games[0].gameId;
  r(`window.setEinsatzCenterGameNote(${firstId},'Roundtrip')`);
  const exported = await r('window.buildEinsatzCenterDraftExport()');
  assertEqual(exported.baseHash, await computeBaseHash(realSeason, realRegistry), 'echte lineup-data: Export-baseHash == Node-Hash des echten Raw-Stands');
  assertEqual(r(`getEffectiveLineupData('25/26').games.find(g=>g.gameId===${firstId}).note`), 'Roundtrip', 'echte lineup-data: Draft-Änderung im Effective-State sichtbar');
  assertEqual(r(`LINEUP_DATA['25/26'].games.find(g=>g.gameId===${firstId}).note`), realSeason.games[0].note, 'echte lineup-data: Raw-Stand unverändert');
}

console.log('');
if (failures > 0) {
  console.log(`${failures} Test(s) fehlgeschlagen.`);
  process.exitCode = 1;
} else {
  console.log('Alle Tests erfolgreich.');
  process.exitCode = 0;
}

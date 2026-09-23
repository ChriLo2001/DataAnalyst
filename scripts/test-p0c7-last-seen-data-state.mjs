#!/usr/bin/env node
// P0c.7 — Test für den zuletzt gesehenen Datenstand (Spezifikation 6.3.1,
// Entscheidung 10b).
//
// Die echten Funktionen (getSeasonDataState, parseSeasonDataState,
// isNewSeasonDataState, recordOverviewVisit, detectOverviewPhase,
// buildOverviewCards, rOverviewPage, openOverview, switchOverviewSeason,
// getSeasonMatchdays/buildMatchdays/compareGamesChronologically, uiNotiz, die
// Speicher-Kapseln) werden unverändert aus dem index.html-Text geschnitten und
// in node:vm ausgeführt. Nur die rechenintensiven Karteninhalte der Übersicht
// (Tabelle, Form, ...) sind durch Platzhalter ersetzt. Der Datenstand wird
// gegen eine unabhängige Referenzberechnung mit den echten .mjs-Modulen auf den
// 5 echten Saisons geprüft. localStorage ist ein Fake mit Zähler.
// Liest index.html und season-data/*.json nur lesend, schreibt nichts.
//
// Aufruf: node scripts/test-p0c7-last-seen-data-state.mjs

import { readFile } from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';

import { buildMatchdays as refBuildMatchdays } from './matchday-derivation.mjs';
import { compareGamesChronologically as refCompare } from './game-ordering.mjs';

const REPO_ROOT = path.resolve(import.meta.dirname, '..');
const SEASON_KEYS = ['21/22', '22/23', '23/24', '24/25', '25/26'];
const KEY = (k) => `vfbulm.comfort.lastSeenDataState.${k}`;
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
function between(startMarker, endMarker) {
  const s = html.indexOf(startMarker);
  const e = html.indexOf(endMarker);
  if (s === -1 || e === -1 || html.indexOf(startMarker, s + 1) !== -1) throw new Error(`Marker nicht eindeutig: ${startMarker}`);
  return html.slice(s, e + endMarker.length);
}
function fnSource(name) {
  const m = new RegExp(`(^|\\n)(async )?function ${name}\\(`).exec(html);
  if (!m) throw new Error(`Funktion nicht gefunden: ${name}`);
  const from = m.index + m[1].length;
  return html.slice(from, html.indexOf('\n}', from) + 2);
}
function winSource(name) {
  const from = html.indexOf(`window.${name}=`);
  if (from === -1) throw new Error(`window.${name} nicht gefunden`);
  return html.slice(from, html.indexOf('\n};', from) + 3);
}
const constLine = (name) => new RegExp(`^const ${name}=.*$`, 'm').exec(html)?.[0] ?? (() => { throw new Error(`const ${name} fehlt`); })();
const stripComments = (s) => s.split('\n').filter((l) => !l.trim().startsWith('//') && !l.trim().startsWith('*') && !l.trim().startsWith('/*')).join('\n');

const realFunctions = ['isGameAtOrBeforeAsOf', 'deriveAsOfForSeason', 'getStaticSeasonGames', 'compareGamesChronologically', 'buildMatchdays', 'asOfCacheKeyPart', 'analysisCacheKey', 'cachedAnalysis', 'getSeasonMatchdays', 'matchdayAsOfCutoff', 'formatDateDE', 'overviewMatchdayStartMs', 'overviewMatchdayEndMs', 'detectOverviewPhase', 'getSeasonDataState', 'parseSeasonDataState', 'isNewSeasonDataState', 'recordOverviewVisit', 'overviewLastMatchdayText', 'buildOverviewCards', 'rOverviewPage', 'getActiveSeasonKey', 'uiNotiz', 'einsatzCenterStorageRead', 'einsatzCenterStorageWrite', 'einsatzCenterStorageRemove'].map(fnSource).join('\n');
const realConsts = [constLine('SEASON_DATA_STATE_KEY_PREFIX'), constLine('OVERVIEW_SESSION_DATA_STATE'), constLine('OVERVIEW_PHASE_LABELS')].join('\n');
const openOverviewSrc = winSource('openOverview');
const switchOverviewSrc = winSource('switchOverviewSeason');
const einsatzRegion = between('const LINEUP_DATA={};', 'window.einsatzCenterSoftIssues=einsatzCenterSoftIssues;');
const previewBlock = between('// ═══ Season-Daten-Vorschau (P0c.4', '// ═══ Ende Season-Daten-Vorschau (P0c.4)');

const real = {};
for (const k of SEASON_KEYS) real[k] = JSON.parse(await readFile(path.join(REPO_ROOT, 'season-data', `${k.replace('/', '-')}.json`), 'utf8'));

const readStored = (st, season) => (st.m.has(KEY(season)) ? JSON.parse(st.m.get(KEY(season))) : null);
function makeStorage() {
  const m = new Map();
  const s = {
    m, gets: 0, sets: 0, removes: 0, failGet: false, failSet: false,
    getItem(k) { s.gets++; if (s.failGet) throw new Error('getItem blockiert'); return m.has(k) ? m.get(k) : null; },
    setItem(k, v) { s.sets++; if (s.failSet) throw new Error('QuotaExceededError'); m.set(k, String(v)); },
    removeItem(k) { s.removes++; m.delete(k); },
  };
  return s;
}

/** Spiel-Fixture (Struktur wie in season-data, nur die für die Matchday-Ableitung nötigen Felder). */
const sg = (id, day, date, ended, extra = {}) => ({ id, game_number: String(id), date, start_time: '12:00', game_day: { game_day_number: day, title: `${day}. Spieltag` }, home_team_name: 'A', guest_team_name: 'B', started: ended, ended, ...extra });
const seasonA = () => [sg(1, 1, '2026-03-01', true), sg(2, 1, '2026-03-01', true), sg(3, 2, '2026-03-08', true), sg(4, 2, '2026-03-08', true), sg(5, 3, '2026-05-01', false), sg(6, 3, '2026-05-01', false)];
const seasonB = () => [sg(1, 1, '2026-03-01', true), sg(2, 2, '2026-03-08', true)];
const seasonC = () => [sg(1, 1, '2026-06-01', false), sg(2, 1, '2026-06-01', false)];

/** Frischer vm-Kontext ("App-Start"). games: seasonKey -> Roh-Spiele der Produktionsdaten. */
function boot({ games = { '25/26': seasonA() }, storage = makeStorage(), storageMode = 'fake', withPreview = false } = {}) {
  const S = { activeSeasonKey: '25/26', selectedSeasonKey: '25/26', page: 'overview', screen: 'main', asOf: null, einsatzCenterSeasonKey: '25/26', einsatzCenterComboSelection: [] };
  const log = [];
  const patches = [];
  const SEASONS = {};
  for (const [k, g] of Object.entries(games)) SEASONS[k] = { data: { rawLeagueGames: clone(g) } };
  const win = {};
  if (storageMode === 'fake') win.localStorage = storage;
  else if (storageMode === 'throwing-getter') Object.defineProperty(win, 'localStorage', { get() { throw new Error('SecurityError'); } });
  win.confirm = () => true;
  const card = (name) => () => `<div data-card="${name}"></div>`;
  const ctx = vm.createContext({
    window: win,
    S,
    SEASONS,
    STATIC_SEASON_DATA: Object.fromEntries(Object.entries(games).map(([k, g]) => [k, { season: k, label: k, games: clone(g) }])),
    PLAYER_REGISTRY: { players: {} },
    analysisCache: new Map(),
    SEASON_CONFIG: Object.fromEntries([...SEASON_KEYS, '26/27'].map((k) => [k, { label: `20${k.slice(0, 2)}/${k.slice(3)}` }])),
    CURRENT_SEASON_KEY: '25/26',
    UI_OBJEKTSEITE_MAX_TILES: 4,
    structuredClone,
    TextEncoder,
    crypto: globalThis.crypto,
    fetch: () => Promise.reject(new Error('kein Netzwerk im Test')),
    console,
    setState: (p) => { log.push('setState'); patches.push(p); Object.assign(S, p); },
    escHtml: (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'),
    escAttr: (s) => String(s).replace(/"/g, '&quot;'),
    loadSeason: async () => { log.push('loadSeason'); },
    showMainShell: () => { log.push('showMainShell'); },
    ensureExternalSeasonData: async () => true,
    // Platzhalter für die rechenintensiven Karteninhalte (nicht Gegenstand dieses Tests)
    uiObjektseite: ({ contextLine, headline }) => `<div data-shell>${String(contextLine).replace(/</g, '&lt;')}|${String(headline).replace(/</g, '&lt;')}</div>`,
    uiHinweisKarte: ({ observation }) => `<div data-hint>${String(observation).replace(/</g, '&lt;')}</div>`,
    overviewRankChangeTile: () => null,
    overviewCompactTableHtml: card('table'), overviewNextMatchdayHtml: card('next'), overviewFormHtml: card('form'),
    overviewOpponentPreviewHtml: card('opp'), overviewMatchcenterLinkHtml: card('mc'), overviewLineupLinkHtml: card('lu'),
    overviewSeasonBilanzHtml: card('bilanz'), overviewSeasonAwardHtml: card('award'), overviewRecordHtml: card('rec'), overviewCrossSeasonTrendHtml: card('trend'),
    document: { getElementById: () => ({ value: '' }) },
    detectUlmSide: () => 'home',
    __registry: { schemaVersion: 1, groups: [] },
  });
  vm.runInContext(realConsts, ctx);
  vm.runInContext(realFunctions, ctx);
  vm.runInContext(openOverviewSrc, ctx);
  vm.runInContext(switchOverviewSrc, ctx);
  ctx.window.openSeason = async (v) => { log.push('openSeason'); S.activeSeasonKey = v; S.selectedSeasonKey = v; };
  if (withPreview) {
    vm.runInContext(einsatzRegion, ctx);
    vm.runInContext('LINEUP_GROUPS_REGISTRY=__registry;', ctx);
    vm.runInContext(previewBlock, ctx);
  }
  const run = (code) => vm.runInContext(code, ctx);
  const digest = () => run('JSON.stringify([STATIC_SEASON_DATA,Object.fromEntries(Object.entries(SEASONS).map(([k,v])=>[k,v.data])),PLAYER_REGISTRY,S,[...analysisCache.keys()]])');
  return { ctx, run, S, storage, log, patches, digest, page: (k = '25/26') => run(`rOverviewPage('${k}')`), phase: (k, now, opts) => run(`detectOverviewPhase('${k}',new Date('${now}')${opts === undefined ? '' : `,${JSON.stringify(opts)}`})`) };
}

// ── Datenstand ─────────────────────────────────────────────────────────
console.log('== Datenstand aus dem letzten beendeten Produktionsspiel ==');
{
  const app = boot({ games: Object.fromEntries(SEASON_KEYS.map((k) => [k, real[k].games])) });
  for (const k of SEASON_KEYS) {
    const games = real[k].games;
    const ended = games.filter((g) => g.ended === true).sort(refCompare);
    const last = ended.at(-1);
    const md = refBuildMatchdays({ season: k, games }).find((m) => m.games.some((g) => g.id === last?.id));
    const expected = last ? { endedGames: ended.length, lastGameId: String(last.id), lastDate: String(last.date), lastMatchday: md?.number ?? null } : null;
    assertEqual(app.run(`getSeasonDataState('${k}')`), expected, `${k}: Datenstand entspricht der unabhängigen Referenzberechnung (echte Daten)`);
  }
  assertEqual(app.run(`getSeasonDataState('25/26').lastMatchday`) >= 1, true, '25/26: letzter beendeter Spieltag ist eine Spieltagsnummer');
  const distinct = new Set(SEASON_KEYS.map((k) => JSON.stringify(app.run(`getSeasonDataState('${k}')`))));
  assertEqual(distinct.size, SEASON_KEYS.length, 'unterschiedliche Saisons liefern getrennte, unterschiedliche Stände');
  const none = boot({ games: { '25/26': seasonC() } });
  assertEqual(none.run(`getSeasonDataState('25/26')`), null, 'kein beendetes Spiel -> null');
  assertEqual(none.run(`getSeasonDataState('24/25')`), null, 'unbekannte Saison ohne Daten -> null');
  const a = boot();
  assertEqual(a.run(`getSeasonDataState('25/26')`), { endedGames: 4, lastGameId: '4', lastDate: '2026-03-08', lastMatchday: 2 }, 'Fixture: 4 beendete Spiele, letztes Spiel 4, Spieltag 2, 2026-03-08');
  const shuffled = boot({ games: { '25/26': seasonA().reverse() } });
  assertEqual(shuffled.run(`getSeasonDataState('25/26')`), a.run(`getSeasonDataState('25/26')`), 'unabhängig von der Reihenfolge der Eingabe (chronologische Ableitung)');
  const before = JSON.stringify(a.run('SEASONS'));
  a.run(`getSeasonDataState('25/26')`);
  assertEqual(JSON.stringify(a.run('SEASONS')), before, 'reine Funktion: Produktionsdaten unverändert');
  const dateless = boot({ games: { '25/26': [sg(1, null, '2026-03-01', true, { game_day: {} })] } });
  assertEqual(dateless.run(`getSeasonDataState('25/26')`), { endedGames: 1, lastGameId: '1', lastDate: '2026-03-01', lastMatchday: null }, 'Spiel ohne Spieltagsnummer: lastMatchday null');
}

// ── Validierung / Vergleich ────────────────────────────────────────────
console.log('');
console.log('== Gespeicherter Stand: Validierung und Vergleich ==');
{
  const { run } = boot();
  const good = { v: 1, endedGames: 4, lastGameId: '4', lastDate: '2026-03-08', lastMatchday: 2 };
  assertEqual(run(`parseSeasonDataState(${JSON.stringify(JSON.stringify(good))})`), { endedGames: 4, lastGameId: '4', lastDate: '2026-03-08', lastMatchday: 2 }, 'gültiger Eintrag wird gelesen');
  assertEqual(run(`parseSeasonDataState(${JSON.stringify(JSON.stringify({ ...good, lastMatchday: null }))})`)?.lastMatchday, null, 'lastMatchday darf null sein');
  for (const [label, text] of [
    ['kaputtes JSON', '{"v":1,'], ['kein Objekt', '[]'], ['null', 'null'], ['Version 2', JSON.stringify({ ...good, v: 2 })], ['ohne Version', JSON.stringify({ ...good, v: undefined })],
    ['negative Anzahl', JSON.stringify({ ...good, endedGames: -1 })], ['Anzahl keine Ganzzahl', JSON.stringify({ ...good, endedGames: 1.5 })], ['Datum kein ISO', JSON.stringify({ ...good, lastDate: '08.03.2026' })],
    ['Datum fehlt', JSON.stringify({ ...good, lastDate: undefined })], ['ID keine Zeichenkette', JSON.stringify({ ...good, lastGameId: 4 })], ['Spieltag keine Zahl', JSON.stringify({ ...good, lastMatchday: 'x' })],
  ]) {
    assertEqual(run(`parseSeasonDataState(${JSON.stringify(text)})`), null, `ungültig (${label}): kein Vorstand`);
  }
  const cur = { endedGames: 4, lastGameId: '4', lastDate: '2026-03-08', lastMatchday: 2 };
  const isNew = (p, c) => run(`isNewSeasonDataState(${JSON.stringify(p)},${JSON.stringify(c)})`);
  assertEqual(isNew(cur, cur), false, 'unveränderter Stand: nicht neu');
  assertEqual(isNew({ ...cur, endedGames: 3 }, cur), true, 'mehr beendete Spiele: neu');
  assertEqual(isNew({ ...cur, lastDate: '2026-03-01' }, cur), true, 'späteres letztes Spiel: neu');
  assertEqual(isNew({ ...cur, lastGameId: '3' }, cur), false, 'nur andere Spiel-ID bei gleichem Datum und gleicher Anzahl (Korrektur): nicht neu');
  assertEqual(isNew(cur, { ...cur, endedGames: 3 }), false, 'weniger beendete Spiele (Datenrückgang): nicht neu');
  assertEqual(isNew(null, cur), false, 'ohne Vorstand: nicht neu');
  assertEqual(isNew(cur, null), false, 'ohne aktuellen Stand: nicht neu');
  assertEqual(isNew(null, null), false, 'beides null: nicht neu');
}

// ── Erster Besuch / neue Daten / Sitzung ───────────────────────────────
console.log('');
console.log('== Erster Besuch, neue Daten, Sitzungslogik ==');
{
  const storage = makeStorage();
  const s1 = boot({ storage });
  const v1 = s1.run(`recordOverviewVisit('25/26')`);
  assertEqual([v1.previous, v1.isNew], [null, false], 'Erster Besuch: kein Vorstand, nicht "neu"');
  assertEqual(readStored(storage, '25/26'), { v: 1, endedGames: 4, lastGameId: '4', lastDate: '2026-03-08', lastMatchday: 2 }, 'Erster Besuch: aktueller Stand wird als zuletzt gesehen gespeichert');
  assertEqual([...storage.m.keys()], [KEY('25/26')], 'genau ein Schlüssel im Namensraum vfbulm.comfort.lastSeenDataState.<Saison>');
  const setsAfterFirst = storage.sets; const getsAfterFirst = storage.gets;
  const again = s1.run(`recordOverviewVisit('25/26')`);
  assertTrue(again === v1 || JSON.stringify(again) === JSON.stringify(v1), 'zweiter Aufruf derselben Sitzung liefert das gehaltene Ergebnis');
  assertEqual([storage.gets, storage.sets], [getsAfterFirst, setsAfterFirst], 'zweiter Aufruf liest und schreibt nicht erneut');
  for (let i = 0; i < 5; i++) s1.page();
  assertEqual([storage.gets, storage.sets], [getsAfterFirst, setsAfterFirst], 'mehrfaches Rendern (rOverviewPage) liest und schreibt nichts');
  // zweiter Besuch (neue Sitzung), gleicher Stand
  const s2 = boot({ storage });
  const v2 = s2.run(`recordOverviewVisit('25/26')`);
  assertEqual([v2.previous?.endedGames, v2.isNew], [4, false], 'zweiter Besuch mit gleichem Stand: Vorstand gelesen, nicht "neu"');
  // neue Sitzung mit neuem beendeten Spieltag
  const more = seasonA().map((g) => (g.game_day.game_day_number === 3 ? { ...g, ended: true, started: true } : g));
  const s3 = boot({ storage, games: { '25/26': more } });
  const v3 = s3.run(`recordOverviewVisit('25/26')`);
  assertEqual([v3.previous?.endedGames, v3.current.endedGames, v3.isNew], [4, 6, true], 'neuer beendeter Spieltag: mehr beendete Spiele -> "neu"');
  assertEqual(readStored(storage, '25/26')?.endedGames, 6, 'nach dem Besuch ist der neue Stand als zuletzt gesehen gespeichert');
  // Sitzung hält das Ergebnis, auch wenn extern (anderer Tab) etwas ändert
  storage.m.set(KEY('25/26'), JSON.stringify({ v: 1, endedGames: 99, lastGameId: '9', lastDate: '2099-01-01', lastMatchday: 9 }));
  const getsS3 = storage.gets;
  assertEqual([s3.run(`recordOverviewVisit('25/26')`).isNew, s3.page().includes('Neu seit deinem letzten Besuch')], [true, true], 'Sitzung: "neu" bleibt trotz Renders und externer Speicheränderung erhalten');
  assertEqual(storage.gets, getsS3, 'Sitzung: Renders lesen den Speicher nicht erneut');
  // späteres letztes Spiel bei gleicher Anzahl
  const st4 = makeStorage(); st4.m.set(KEY('25/26'), JSON.stringify({ v: 1, endedGames: 4, lastGameId: '4', lastDate: '2026-03-01', lastMatchday: 1 }));
  assertEqual(boot({ storage: st4 }).run(`recordOverviewVisit('25/26')`).isNew, true, 'gleiche Anzahl, aber späteres letztes Spiel: "neu"');
  // Korrektur an vorhandenem Spiel
  const st5 = makeStorage();
  boot({ storage: st5 }).run(`recordOverviewVisit('25/26')`);
  const corrected = seasonA().map((g) => (g.id === 4 ? { ...g, result_string: '9:9', goals: 9 } : g));
  assertEqual(boot({ storage: st5, games: { '25/26': corrected } }).run(`recordOverviewVisit('25/26')`).isNew, false, 'Korrektur am letzten Spiel (gleiche Anzahl, gleiches Datum): nicht "neu"');
  // Saison-Trennung
  const st6 = makeStorage();
  const both = { '25/26': seasonA(), '24/25': seasonB() };
  const b1 = boot({ storage: st6, games: both });
  b1.run(`recordOverviewVisit('25/26')`);
  assertEqual([...st6.m.keys()], [KEY('25/26')], 'nur die geöffnete Saison wird gespeichert');
  const newerB = { '25/26': seasonA(), '24/25': [...seasonB(), sg(3, 3, '2026-03-15', true)] };
  const b2 = boot({ storage: st6, games: newerB });
  b2.run(`recordOverviewVisit('24/25')`); // Saison B: erster Besuch
  const va = b2.run(`recordOverviewVisit('25/26')`);
  const vb = b2.run(`recordOverviewVisit('24/25')`);
  assertEqual([va.isNew, vb.isNew], [false, false], 'Saison A (unverändert) und B (erster Besuch) getrennt: beide nicht "neu"');
  const b3 = boot({ storage: st6, games: { '25/26': [...seasonA().slice(0, 4), sg(7, 3, '2026-03-15', true)], '24/25': newerB['24/25'] } });
  assertEqual([b3.run(`recordOverviewVisit('25/26')`).isNew, b3.run(`recordOverviewVisit('24/25')`).isNew], [true, false], 'Saison A hat neue Daten, Saison B nicht: Stände sind getrennt');
  // ungültiger Speicherinhalt
  for (const bad of ['{kaputt', '[]', JSON.stringify({ v: 2 }), JSON.stringify({ v: 1, endedGames: -3, lastGameId: '1', lastDate: '2026-03-01', lastMatchday: 1 })]) {
    const st = makeStorage(); st.m.set(KEY('25/26'), bad);
    const r = boot({ storage: st }).run(`recordOverviewVisit('25/26')`);
    assertEqual([r.previous, r.isNew, readStored(st, '25/26')?.v], [null, false, 1], `ungültiger Eintrag (${bad.slice(0, 18)}): kein Vorstand, nicht "neu", danach gültig überschrieben`);
  }
  // kein ableitbarer Stand: nichts schreiben, nichts halten
  const stN = makeStorage();
  const bn = boot({ storage: stN, games: { '25/26': seasonC() } });
  const rn = bn.run(`recordOverviewVisit('25/26')`);
  assertEqual([rn.current, rn.isNew, stN.sets, bn.run(`Object.keys(OVERVIEW_SESSION_DATA_STATE)`)], [null, false, 0, []], 'kein beendetes Spiel: nichts gespeichert, nichts gehalten');
  bn.run(`SEASONS['25/26'].data.rawLeagueGames=${JSON.stringify(seasonA())};analysisCache.clear()`);
  assertEqual(bn.run(`recordOverviewVisit('25/26')`).current?.endedGames, 4, 'später verfügbare Daten werden beim nächsten Öffnen nachgeholt');
}

// ── Speicherfehler ─────────────────────────────────────────────────────
console.log('');
console.log('== Speicherfehler: App läuft weiter ==');
{
  for (const [label, opts] of [['setItem wirft', { failSet: true }], ['getItem wirft', { failGet: true }], ['beides wirft', { failGet: true, failSet: true }]]) {
    const st = makeStorage(); Object.assign(st, opts);
    const app = boot({ storage: st });
    let threw = null; let v; let page;
    try { v = app.run(`recordOverviewVisit('25/26')`); page = app.page(); } catch (e) { threw = e; }
    assertEqual([threw && String(threw.message), v?.isNew, typeof page], [null, false, 'string'], `${label}: kein Fehler, nicht "neu", Übersicht rendert`);
  }
  for (const mode of ['undefined', 'throwing-getter']) {
    const app = boot({ storageMode: mode });
    let threw = null; let v; let page;
    try { v = app.run(`recordOverviewVisit('25/26')`); page = app.page(); } catch (e) { threw = e; }
    assertEqual([threw && String(threw.message), v?.isNew, page.includes('Neu seit')], [null, false, false], `Speicher ${mode}: kein Fehler, kein Hinweis`);
  }
}

// ── Phase ──────────────────────────────────────────────────────────────
console.log('');
console.log('== detectOverviewPhase: ODER-Bedingung ==');
{
  const app = boot({ games: { A: seasonA(), B: seasonB(), C: seasonC() } });
  const ph = (k, now, opts) => app.phase(k, now, opts);
  const only = (r) => r.phase;
  // bestehende 3-Tage-Regel
  assertEqual(only(ph('A', '2026-03-09T12:00:00')), 'nachDemSpieltag', '3-Tage-Regel: 1 Tag nach dem Spieltag -> nachDemSpieltag');
  assertEqual(only(ph('A', '2026-03-11T00:00:00')), 'nachDemSpieltag', '3-Tage-Regel: knapp unter 3 Tagen -> nachDemSpieltag');
  assertEqual(only(ph('A', '2026-03-12T00:00:00')), 'unterDerWoche', '3-Tage-Regel: nach 3 Tagen und weit vor dem nächsten Spieltag -> unterDerWoche');
  assertEqual(only(ph('A', '2026-04-28T12:00:00')), 'vorDemSpieltag', 'bestehend: höchstens 5 Tage vor dem Spieltag -> vorDemSpieltag');
  assertEqual(only(ph('B', '2026-06-01T12:00:00')), 'saisonpause', 'bestehend: keine offenen Spiele -> saisonpause');
  // ohne Parameter unverändert
  const nows = ['2026-02-01T00:00:00', '2026-03-01T13:00:00', '2026-03-09T12:00:00', '2026-03-12T00:00:00', '2026-04-10T12:00:00', '2026-04-28T12:00:00', '2026-05-02T12:00:00', '2026-09-01T00:00:00'];
  let same = true;
  for (const k of ['A', 'B', 'C']) for (const n of nows) same = same && JSON.stringify(ph(k, n)) === JSON.stringify(ph(k, n, {})) && JSON.stringify(ph(k, n)) === JSON.stringify(ph(k, n, { newDataSinceLastVisit: false }));
  assertTrue(same, 'ohne Parameter / mit {} / mit false: Ergebnis byte-identisch (3 Saisons x 8 Zeitpunkte)');
  // neuer Datenstand löst nachDemSpieltag aus
  assertEqual(only(ph('A', '2026-04-10T12:00:00', { newDataSinceLastVisit: true })), 'nachDemSpieltag', 'neu + unterDerWoche-Zeitpunkt -> nachDemSpieltag');
  assertEqual(only(ph('A', '2026-04-28T12:00:00', { newDataSinceLastVisit: true })), 'nachDemSpieltag', 'neu hat Vorrang vor vorDemSpieltag (erste Zeile der Tabelle)');
  assertEqual(only(ph('B', '2026-06-01T12:00:00', { newDataSinceLastVisit: true })), 'nachDemSpieltag', 'neu + Saisonpause -> nachDemSpieltag');
  assertEqual(ph('A', '2026-04-10T12:00:00', { newDataSinceLastVisit: true }).lastMatchday.number, 2, 'nachDemSpieltag zeigt den letzten abgeschlossenen Spieltag (2)');
  // ohne abgeschlossenen Spieltag darf "neu" die Phasenlogik nicht umgehen
  for (const n of nows) assertEqual(JSON.stringify(ph('C', n, { newDataSinceLastVisit: true })), JSON.stringify(ph('C', n)), `kein letzter Spieltag: "neu" ändert nichts (${n.slice(0, 10)})`);
  // unvollständiger Spieltag: beendete Spiele, aber kein abgeschlossener Spieltag
  const partial = boot({ games: { P: [sg(1, 1, '2026-03-01', true), sg(2, 1, '2026-03-01', false), sg(3, 2, '2026-05-01', false)] } });
  assertEqual(JSON.stringify(partial.phase('P', '2026-04-10T12:00:00', { newDataSinceLastVisit: true })), JSON.stringify(partial.phase('P', '2026-04-10T12:00:00')), 'nur unvollständiger Spieltag: "neu" umgeht die Phasenlogik nicht');
  assertTrue(stripComments(fnSource('detectOverviewPhase')).includes('daysSince>=0&&daysSince<3'), 'die 3-Tage-Regel steht unverändert im Quelltext');
  assertTrue(/if\(lastMatchday\)\{[^]*?newDataSinceLastVisit[^]*?\n  \}\n  if\(nextMatchday\)/.test(fnSource('detectOverviewPhase')), 'die ODER-Bedingung steht innerhalb des Blocks if(lastMatchday)');
}

// ── UI ─────────────────────────────────────────────────────────────────
console.log('');
console.log('== Übersicht: Hinweis ==');
{
  const NOTE = (n, d) => `<div class="ui-notiz">Neu seit deinem letzten Besuch: Spieltag ${n} (${d})</div>`;
  const storage = makeStorage();
  const first = boot({ storage });
  first.run(`recordOverviewVisit('25/26')`);
  assertTrue(!first.page().includes('Neu seit'), 'erster Besuch: kein Hinweis');
  const more = seasonA().map((g) => (g.game_day.game_day_number === 3 ? { ...g, ended: true, started: true, date: '2026-05-02' } : g));
  const app = boot({ storage, games: { '25/26': more } });
  app.run(`recordOverviewVisit('25/26')`);
  const page = app.page();
  assertTrue(page.includes(NOTE(3, '02.05.2026')), 'neuer Datenstand: Hinweis "Neu seit deinem letzten Besuch: Spieltag 3 (02.05.2026)" über uiNotiz');
  assertTrue(page.includes('Nach dem Spieltag'), 'neuer Datenstand: Phase nachDemSpieltag in der Übersicht');
  assertEqual((page.match(/Neu seit deinem letzten Besuch/g) || []).length, 1, 'genau ein Hinweis');
  assertEqual(app.page(), page, 'wiederholtes Rendern liefert byte-identisches HTML (Hinweis verschwindet nicht)');
  assertTrue(!page.includes('data-mark') && !page.includes('class="ia-new') , 'kein zusätzliches Marker-Element');
  const noNew = boot({ storage: (() => { const s = makeStorage(); boot({ storage: s }).run(`recordOverviewVisit('25/26')`); return s; })() });
  noNew.run(`recordOverviewVisit('25/26')`);
  const basePage = noNew.page();
  assertTrue(!basePage.includes('Neu seit'), 'unveränderter Stand: kein Hinweis');
  assertEqual(basePage, boot().page(), 'unveränderter Stand: Seite identisch zur Seite ohne jede Besuchslogik');
  // Spieltag ohne Nummer
  const stD = makeStorage(); stD.m.set(KEY('25/26'), JSON.stringify({ v: 1, endedGames: 0, lastGameId: '0', lastDate: '2020-01-01', lastMatchday: null }));
  const dl = boot({ storage: stD, games: { '25/26': [sg(1, null, '2026-03-01', true, { game_day: {} })] } });
  dl.run(`recordOverviewVisit('25/26')`);
  assertTrue(dl.page().includes('Neu seit deinem letzten Besuch: Daten bis 01.03.2026'), 'ohne Spieltagsnummer: "Daten bis <Datum>"');
  // Escaping
  const stE = makeStorage(); stE.m.set(KEY('25/26'), JSON.stringify({ v: 1, endedGames: 0, lastGameId: '0', lastDate: '2020-01-01', lastMatchday: 1 }));
  const ev = boot({ storage: stE, games: { '25/26': [sg(1, 1, '<img src=x onerror=alert(1)>', true)] } });
  ev.run(`recordOverviewVisit('25/26')`);
  const evPage = ev.page();
  assertTrue(!evPage.includes('<img') && evPage.includes('&lt;img src=x onerror=alert(1)&gt;'), 'Datum im Hinweis wird escaped');
  // Saison-Scoping der Anzeige
  const stS = makeStorage();
  boot({ storage: stS, games: { '25/26': seasonA(), '24/25': seasonB() } }).run(`recordOverviewVisit('24/25')`);
  const sc = boot({ storage: stS, games: { '25/26': seasonA(), '24/25': [...seasonB(), sg(3, 3, '2026-03-15', true)] } });
  sc.run(`recordOverviewVisit('24/25')`); sc.run(`recordOverviewVisit('25/26')`);
  assertEqual([sc.page('24/25').includes('Neu seit'), sc.page('25/26').includes('Neu seit')], [true, false], 'Hinweis nur für die Saison mit neuem Datenstand');
  // Timeline: kein "Neu"-Marker
  for (const n of ['rMatchdayTimelineRow', 'rMatchdayTimelinePage', 'rMatchdayDetailPage']) {
    assertTrue(!/OVERVIEW_SESSION_DATA_STATE|recordOverviewVisit|isNewSeasonDataState|Neu seit|lastSeenDataState/.test(fnSource(n)), `${n}: kein Neu-Marker, kein Zugriff auf den Besuchsstand`);
  }
}

// ── Preview wird ignoriert ─────────────────────────────────────────────
console.log('== Preview fließt nie ein ==');
{
  const realGames = { '25/26': real['25/26'].games };
  const extra = { ...clone(real['25/26'].games[0]), id: 990001, date: '2099-01-01', ended: true, started: true };
  const wrapper = JSON.stringify({ season: '25/26', label: '2025/26', games: [...clone(real['25/26'].games), extra] });

  const base = boot({ withPreview: true, games: realGames });
  const realState = base.run(`getSeasonDataState('25/26')`);
  const r = await base.run('stageSeasonDataPreview')(wrapper, { seasonKey: '25/26', sourceName: 'p.json' });
  assertTrue(r.ok && base.run('getSeasonDataPreview("25/26")'), 'Vorbedingung: echte Vorschau mit zusätzlichem beendeten Spiel (2099) ist aktiv');
  assertEqual(base.run('getSeasonDataPreview("25/26").changes.added.length'), 1, 'Vorbedingung: die Vorschau enthält das zusätzliche Spiel als neu');
  assertEqual(base.run(`getSeasonDataState('25/26')`), realState, 'Datenstand ignoriert die Vorschau (unverändert, kein Datum 2099)');
  assertTrue(realState.lastDate < '2099', 'Kontrolle: der Produktionsstand endet vor 2099');

  const storage = makeStorage();
  storage.m.set(KEY('25/26'), JSON.stringify({ v: 1, ...realState }));
  const viaPreview = boot({ storage, withPreview: true, games: realGames });
  await viaPreview.run('stageSeasonDataPreview')(wrapper, { seasonKey: '25/26', sourceName: 'p.json' });
  assertTrue(viaPreview.run('getSeasonDataPreview("25/26")'), 'Vorbedingung: Vorschau in der zweiten Sitzung aktiv');
  const rv = viaPreview.run(`recordOverviewVisit('25/26')`);
  assertEqual([rv.isNew, viaPreview.page().includes('Neu seit')], [false, false], 'aktive Vorschau erzeugt weder "neu" noch einen Hinweis');
  assertEqual(readStored(storage, '25/26')?.lastDate, realState.lastDate, 'der gespeicherte Stand enthält keine Vorschau-Daten');
  assertTrue(!/SEASON_DATA_PREVIEW|getSeasonDataPreview|STATIC_SEASON_DATA/.test(stripComments(fnSource('getSeasonDataState') + fnSource('recordOverviewVisit') + fnSource('isNewSeasonDataState'))), 'Quelltext der Datenstand-Funktionen referenziert weder Vorschau noch Rohdaten-Konstante');
}


// ── Einbindung, Isolation, Guards ──────────────────────────────────────
console.log('');
console.log('== Einbindung und Isolation ==');
{
  const app = boot();
  await app.run('window.openOverview()');
  assertEqual(app.log, ['loadSeason', 'showMainShell', 'setState'], 'openOverview: Reihenfolge Laden, Besuch aufzeichnen (ohne Logeintrag), Shell, setState');
  assertTrue(openOverviewSrc.indexOf('await loadSeason(seasonKey)') < openOverviewSrc.indexOf('recordOverviewVisit(seasonKey)') && openOverviewSrc.indexOf('recordOverviewVisit(seasonKey)') < openOverviewSrc.indexOf('setState('), 'openOverview: recordOverviewVisit nach dem Laden und vor setState');
  assertEqual(app.run('Object.keys(OVERVIEW_SESSION_DATA_STATE)'), ['25/26'], 'openOverview hält den Besuch der Saison');
  const sw = boot({ games: { '25/26': seasonA(), '24/25': seasonB() } });
  await sw.run(`window.switchOverviewSeason('24/25')`);
  assertEqual([sw.log, sw.run('Object.keys(OVERVIEW_SESSION_DATA_STATE)')], [['openSeason', 'setState'], ['24/25']], 'switchOverviewSeason: zeichnet die NEUE Saison auf');
  assertTrue(switchOverviewSrc.indexOf('openSeason(value)') < switchOverviewSrc.indexOf('recordOverviewVisit(getActiveSeasonKey())') && switchOverviewSrc.indexOf('recordOverviewVisit(getActiveSeasonKey())') < switchOverviewSrc.indexOf('setState('), 'switchOverviewSeason: Aufzeichnung nach dem Saisonwechsel und vor setState');
  // Isolation
  const iso = boot({ games: { '25/26': seasonA() } });
  iso.run(`getSeasonMatchdays('25/26')`); // normale Ableitung wärmt den Matchday-Cache vor
  const d0 = iso.digest();
  iso.run(`recordOverviewVisit('25/26')`); iso.page(); iso.page();
  assertEqual(iso.digest(), d0, 'SEASONS, STATIC_SEASON_DATA, PLAYER_REGISTRY, S und Analyse-Cache nach Besuch und Rendern unverändert');
}
{
  // Storage-Guards
  const fns = ['getSeasonDataState', 'parseSeasonDataState', 'isNewSeasonDataState', 'recordOverviewVisit'].map((n) => stripComments(fnSource(n)));
  assertTrue(fns.every((s) => !/localStorage|sessionStorage|indexedDB/.test(s)), 'P0c.7-Funktionen: keine direkte Storage-Nutzung');
  const rec = fns[3];
  assertEqual([(rec.match(/einsatzCenterStorageRead\(/g) || []).length, (rec.match(/einsatzCenterStorageWrite\(/g) || []).length, /einsatzCenterStorageRemove/.test(rec)], [1, 1, false], 'recordOverviewVisit nutzt genau je einmal die vorhandenen Kapseln Read und Write');
  const storageLines = html.split('\n').filter((l) => /(local|session)Storage|indexedDB/.test(l) && !l.trim().startsWith('//'));
  assertEqual(storageLines.length, 3, 'in index.html weiterhin genau die 3 Storage-Zeilen (keine vierte)');
  assertEqual(constLine('SEASON_DATA_STATE_KEY_PREFIX'), "const SEASON_DATA_STATE_KEY_PREFIX='vfbulm.comfort.lastSeenDataState.';", 'Schlüssel-Namensraum vfbulm.comfort.lastSeenDataState.<Saison>');
  // P0c.7 und P0c.8 (zuletzt geöffnete Ansicht, eigener Key vfbulm.comfort.lastView)
  // bleiben getrennte Namensräume: keine P0c.7-Funktion kennt/verwendet lastView als
  // Datenstand, recordOverviewVisit liest/schreibt ausschließlich seinen eigenen Key.
  assertTrue(!/lastView/i.test(fns.join('\n')), 'lastView (P0c.8, "zuletzt geöffnete Ansicht") wird von keiner P0c.7-Funktion als Datenstand verwendet');
  assertEqual([...rec.matchAll(/SEASON_DATA_STATE_KEY_PREFIX\+seasonKey/g)].length, 1, 'recordOverviewVisit liest/schreibt ausschließlich über den eigenen Datenstands-Key (SEASON_DATA_STATE_KEY_PREFIX+seasonKey), keinen anderen');
  const p8KeyLine = /const LAST_VIEW_STORAGE_KEY='([^']+)';/.exec(html)?.[1];
  assertTrue(!!p8KeyLine && !p8KeyLine.startsWith('vfbulm.comfort.lastSeenDataState'), 'P0c.8-Schlüssel (lastView) bleibt vom P0c.7-Namensraum (lastSeenDataState.<Saison>) getrennt');
  assertTrue(!/vfbulm\.einsatzCenter/.test(fns.join('\n')), 'kein Autosave-Schlüssel im P0c.7-Code');
  // unberührte Bereiche
  for (const n of ['syncHashFromState', 'initHashRouting', 'rContextBar', 'rSeasonDataPreviewContextHint', 'computeCurrentAppHash', 'applyAppHash']) {
    assertTrue(!/recordOverviewVisit|OVERVIEW_SESSION_DATA_STATE|lastSeenDataState|comfort|isNewSeasonDataState/.test(fnSource(n)), `${n}: unberührt (kein P0c.7-Bezug)`);
  }
  assertTrue(!/recordOverviewVisit|lastSeenDataState|OVERVIEW_SESSION|getSeasonDataState/.test(previewBlock + einsatzRegion), 'P0c.4-Block und Einsatz-Center-Bereich (P0c.2/3/6) enthalten keinen P0c.7-Bezug');
  assertTrue(!/window\.cover|showCover|openCover|ersten Besuch/i.test(fns.join('\n')), 'kein Cover-Bezug');
  // kein neuer globaler State außer den zwei Konstanten
  const zone = html.slice(html.indexOf('function detectOverviewPhase('), html.indexOf('function buildOverviewCards('));
  const tops = [...stripComments(zone).matchAll(/^(?:let|const|var) ([A-Za-z_$][\w$]*)/gm)].map((m) => m[1]);
  assertEqual(tops, ['SEASON_DATA_STATE_KEY_PREFIX', 'OVERVIEW_SESSION_DATA_STATE'], 'zwischen detectOverviewPhase und buildOverviewCards: genau die zwei vorgesehenen Konstanten, kein neues let/var');
  assertEqual((stripComments(html).match(/OVERVIEW_SESSION_DATA_STATE/g) || []).length, 5, 'Sitzungsspeicher wird nur in Definition, recordOverviewVisit (3x) und rOverviewPage (1x) verwendet');
  assertTrue(!/setState/.test(fns.join('\n')), 'Datenstand-Funktionen rufen kein setState auf');
  assertTrue(/getSeasonMatchdays\(seasonKey\)/.test(fns[0]) && /compareGamesChronologically\(/.test(fns[0]), 'Datenstand nutzt ausschließlich getSeasonMatchdays und compareGamesChronologically');
  assertTrue(!/sha256|canonicalJson|crypto/i.test(fns.join('\n')), 'keine Hash-Berechnung der Rohdaten');
}

console.log('');
if (failures > 0) {
  console.log(`${failures} Test(s) fehlgeschlagen.`);
  process.exitCode = 1;
} else {
  console.log('Alle Tests erfolgreich.');
  process.exitCode = 0;
}

#!/usr/bin/env node
// P0c.8 — Test für die zuletzt geöffnete Ansicht / 1-Stunden-Routing (Spezifikation
// 6.3.1, Entscheidung 10b).
//
// Die echten Funktionen (parseAppHash, buildAppHash/buildGlobalPageHash/
// buildHashStringFromParsed, computeCurrentAppHash, syncHashFromState,
// applyGlobalPageFromHash, applyAppHash, initHashRouting, setState,
// parseLastViewState, getStoredLastView, getSeasonMatchdays-Kette, die
// Speicher-Kapseln) werden unverändert aus dem index.html-Text geschnitten und in
// node:vm ausgeführt. render() sowie alle window.open*()-Funktionen (loadSeason,
// Netzwerk, echtes DOM-Rendering) sind NICHT Gegenstand von P0c.8 und durch
// leichte Platzhalter ersetzt, die genau die für das Routing relevanten
// S-Felder setzen — exakt das bereits in test-p0c7 etablierte Muster (dort u.a.
// loadSeason/showMainShell/uiObjektseite als Platzhalter). location ist ein
// Fake-Objekt mit veränderlichem .hash, localStorage ein Fake mit Zähler.
// initHashRouting() selbst ist "fire-and-forget" (die interne Promise-Kette wird
// nicht zurückgegeben) — settle() räumt die Mikrotask-Warteschlange leer, bis sie
// vollständig abgearbeitet ist (alle Stubs lösen sofort auf, keine echten Timer).
// Liest nur index.html, schreibt nichts.
//
// Aufruf: node scripts/test-p0c8-last-view.mjs

import { readFile } from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';

const REPO_ROOT = path.resolve(import.meta.dirname, '..');
const LAST_VIEW_KEY = 'vfbulm.comfort.lastView';
const ONE_HOUR_MS = 3600000;
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
/** Flusht die Mikrotask-Warteschlange, bis eine fire-and-forget-Promise-Kette (initHashRouting) vollständig abgearbeitet ist. Alle Stubs lösen ohne echte Timer/I-O auf. */
async function settle(n = 40) { for (let i = 0; i < n; i++) await Promise.resolve(); }

const html = (await readFile(path.join(REPO_ROOT, 'index.html'), 'utf8')).replace(/\r\n/g, '\n');
function fnSource(name) {
  const m = new RegExp(`(^|\\n)(async )?function ${name}\\(`).exec(html);
  if (!m) throw new Error(`Funktion nicht gefunden: ${name}`);
  const from = m.index + m[1].length;
  return html.slice(from, html.indexOf('\n}', from) + 2);
}
function constArrowSource(name) {
  const from = html.indexOf(`const ${name}=`);
  if (from === -1) throw new Error(`const ${name} nicht gefunden`);
  return html.slice(from, html.indexOf('\n};', from) + 3);
}
const declLine = (name) => new RegExp(`^(?:const|let) ${name}=.*$`, 'm').exec(html)?.[0] ?? (() => { throw new Error(`Deklaration ${name} fehlt`); })();
const stripComments = (s) => s.split('\n').filter((l) => !l.trim().startsWith('//') && !l.trim().startsWith('*') && !l.trim().startsWith('/*')).join('\n');

const REAL_FN_NAMES = [
  'decodeHashSegmentSafe', 'parseAsOfQueryValue', 'isValidAsOfDate', 'isValidAsOfStartTime',
  'hashSegmentToSeasonKey', 'seasonKeyToHashSegment', 'asOfEquals', 'deriveAsOfForSeason',
  'parseAppHash', 'buildAppHash', 'buildGlobalPageHash', 'buildHashStringFromParsed',
  'computeCurrentAppHash', 'syncHashFromState', 'withoutHashSync', 'applyGlobalPageFromHash', 'applyAppHash',
  'initHashRouting', 'getActiveSeasonKey', 'clearAnalysisCache',
  'parseLastViewState', 'getStoredLastView', 'saveLastView',
  'einsatzCenterStorageRead', 'einsatzCenterStorageWrite', 'einsatzCenterStorageRemove',
  'isGameAtOrBeforeAsOf', 'compareGamesChronologically', 'buildMatchdays', 'asOfCacheKeyPart',
  'analysisCacheKey', 'cachedAnalysis', 'getSeasonMatchdays', 'matchdayAsOfCutoff',
];
const realFunctions = REAL_FN_NAMES.map(fnSource).join('\n');
const realConsts = [declLine('HASH_GLOBAL_PAGES'), declLine('HASH_SEASON_PAGE_SEGMENTS'), declLine('LAST_VIEW_STORAGE_KEY'), declLine('LAST_VIEW_MAX_AGE_MS'), declLine('LAST_VIEW_RESTORE_IN_PROGRESS'), declLine('HASH_SYNC_SUSPENDED')].join('\n');
const setStateSrc = constArrowSource('setState');

const SEASON_KEYS = ['25/26', '24/25'];
const readStored = (st) => (st.m.has(LAST_VIEW_KEY) ? JSON.parse(st.m.get(LAST_VIEW_KEY)) : null);
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
const sg = (id, day, date, ended) => ({ id, game_number: String(id), date, start_time: '12:00', game_day: { game_day_number: day, title: `${day}. Spieltag` }, home_team_name: 'A', guest_team_name: 'B', started: ended, ended });
const GAMES_2526 = [sg(1, 1, '2026-03-01', true), sg(2, 1, '2026-03-01', true), sg(3, 2, '2026-03-08', true)];
const GAMES_2425 = [sg(11, 1, '2025-03-01', true)];
const PLAYERS = [{ key: 'p1', name: 'Spieler Eins' }, { key: 'p2', name: 'Spieler Zwei' }];

/**
 * Frischer vm-Kontext ("App-Start"). initialHash simuliert eine beim Laden bereits
 * vorhandene Adresse (leer = kein Hash). openSeason/openOverview/alle globalen
 * open*()-Funktionen sind Platzhalter, die exakt die für computeCurrentAppHash()
 * relevanten S-Felder setzen (dasselbe Prinzip wie loadSeason/showMainShell in
 * test-p0c7) — Gegenstand von P0c.8 ist ausschließlich die Routing-/
 * Speicherschicht, nicht das Laden/Rendern einzelner Seiten.
 */
function boot({ storage = makeStorage(), storageMode = 'fake', initialHash = '' } = {}) {
  const S = { screen: 'cover', page: null, activeSeasonKey: null, selectedSeasonKey: null, asOf: null, activeP: null, activeMatchday: null, globalPlayerId: null, players: PLAYERS };
  const log = [];
  const listeners = {};
  const loc = { hash: initialHash };
  const win = { addEventListener: (type, fn) => { listeners[type] = fn; } };
  if (storageMode === 'fake') win.localStorage = storage;
  else if (storageMode === 'throwing-getter') Object.defineProperty(win, 'localStorage', { get() { throw new Error('SecurityError'); } });
  const SEASONS = {
    '25/26': { data: { rawLeagueGames: clone(GAMES_2526) } },
    '24/25': { data: { rawLeagueGames: clone(GAMES_2425) } },
  };
  const ctx = vm.createContext({
    window: win,
    location: loc,
    S,
    SEASONS,
    analysisCache: new Map(),
    CURRENT_SEASON_KEY: '25/26',
    SEASON_CONFIG: Object.fromEntries(SEASON_KEYS.map((k) => [k, { label: k }])),
    console,
    URLSearchParams,
    log,
    render: () => { log.push('render'); },
    ensureGlobalDataLoaded: async () => { log.push('ensureGlobalDataLoaded'); },
  });
  const run = (code) => vm.runInContext(code, ctx);
  vm.runInContext(realConsts, ctx);
  vm.runInContext(realFunctions, ctx);
  vm.runInContext(setStateSrc, ctx);
  // Platzhalter für alle window.open*()-Funktionen: NICHT Gegenstand von P0c.8 (siehe
  // Kopfkommentar), setzen aber exakt die für computeCurrentAppHash() relevanten
  // S-Felder über die ECHTE setState()-Quelle (nicht host-seitig, sondern als Code
  // im selben Kontext ausgeführt, da setState eine lexikalische const-Bindung ist).
  run(`
    window.openOverview = async () => { log.push('openOverview'); setState({screen:'main',page:'overview'}); };
    window.openSeason = async (key) => { log.push('openSeason:'+key); setState({screen:'main',activeSeasonKey:key,selectedSeasonKey:key,page:'seasonLanding'}); };
    window.openAllTimePlayers = async () => { log.push('openAllTimePlayers'); setState({screen:'main',page:'alltimePlayers'}); };
    window.openHallOfFame = async () => { log.push('openHallOfFame'); setState({screen:'main',page:'hallOfFame'}); };
    window.openComparisonCenter = async () => { log.push('openComparisonCenter'); setState({screen:'main',page:'comparisonCenter'}); };
    window.openMatchcenter = async () => { log.push('openMatchcenter'); setState({screen:'main',page:'matchcenter'}); };
    window.openLineupBuilder = async () => { log.push('openLineupBuilder'); setState({screen:'main',page:'lineupBuilder'}); };
    window.openEinsatzCenter = async () => { log.push('openEinsatzCenter'); setState({screen:'main',page:'einsatzCenter'}); };
    window.openLexicon = async () => { log.push('openLexicon'); setState({screen:'main',page:'lexicon'}); };
    window.openLigaGegner = async () => { log.push('openLigaGegner'); setState({screen:'main',page:'ligaGegner'}); };
  `);
  // WICHTIG: die echte setState()-Quelle weist S NEU zu (S={...S,...p}), statt es zu
  // mutieren (siehe index.html) — ein einmal vom Host gehaltener Objektverweis würde
  // nach dem ersten setState() veralten. state() liest S deshalb bei jedem Aufruf
  // frisch aus dem laufenden Kontext.
  const state = () => run('S');
  return { ctx, run, storage, loc, log, listeners, state, snapshot: () => run('JSON.stringify(S)') };
}

// ── Speicherung ───────────────────────────────────────────────────────────
console.log('== Speicherung: setState -> syncHashFromState -> lastView ==');
{
  const storage = makeStorage();
  const app = boot({ storage });
  await app.run("setState({screen:'main',activeSeasonKey:'25/26',selectedSeasonKey:'25/26',page:'seasonLanding'})");
  const entry = readStored(storage);
  assertEqual(Object.keys(entry).sort(), ['hash', 'savedAt', 'v'], 'echte Navigation: gespeicherter Eintrag enthält ausschließlich v/hash/savedAt');
  assertEqual([entry.v, entry.hash], [1, '#/25-26'], 'echte Navigation: v:1 und der von computeCurrentAppHash() erzeugte Hash');
  assertTrue(!Number.isNaN(Date.parse(entry.savedAt)) && Math.abs(Date.now() - Date.parse(entry.savedAt)) < 2000, 'savedAt ist ein gültiger, aktueller ISO-Zeitstempel');
  const setsAfterNav = storage.sets;
  await app.run('setState({})'); // reines Rerender (Muster von P0c.4/P0c.6: setState({}))
  assertEqual(storage.sets, setsAfterNav, 'reines Rerender (setState({})) schreibt lastView nicht erneut');
  await app.run("setState({activeTab:'matrix'})"); // Feld ohne Einfluss auf computeCurrentAppHash()
  assertEqual(storage.sets, setsAfterNav, 'Zustandsänderung ohne Einfluss auf den Hash schreibt lastView nicht erneut');
  // keine Produktionsdaten im gespeicherten Objekt
  assertTrue(!/Spieler|game_day|rawLeagueGames|home_team|guest_team/.test(storage.m.get(LAST_VIEW_KEY)), 'gespeicherter Eintrag enthält keine Spiel-/Spielerdaten (nur v/hash/savedAt)');
  // Rückkehr zum Cover (computeCurrentAppHash() liefert '' solange S.screen!=='main'): lastView bleibt unverändert stehen
  const beforeCover = readStored(storage);
  await app.run("setState({screen:'cover',page:null,activeSeasonKey:null,selectedSeasonKey:null})");
  assertEqual([app.run('location.hash'), readStored(storage)], ['#/25-26', beforeCover], 'Rückkehr zum Cover (kein Hash) verändert weder die Adresse noch den gespeicherten lastView-Eintrag');
}

// ── Wiederherstellung ───────────────────────────────────────────────────────
console.log('');
console.log('== Wiederherstellung beim hashlosen Start ==');
{
  const seed = (ageMs, hash = '#/25-26') => { const st = makeStorage(); st.m.set(LAST_VIEW_KEY, JSON.stringify({ v: 1, hash, savedAt: new Date(Date.now() - ageMs).toISOString() })); return st; };
  const cases = [
    ['0 min alt', seed(0), true],
    ['30 min alt', seed(30 * 60000), true],
    // Grenze knapp UNTER 1h statt exakt 1h: eine auf die Millisekunde exakte Prüfung wäre
    // durch die reale (wenn auch geringe) Laufzeit zwischen dem Anlegen von savedAt und der
    // späteren Date.now()-Auswertung in parseLastViewState() unvermeidlich flakig. Die
    // Inklusivität der Grenze selbst (>, nicht >=) wird weiter unten als Quelltext-Beweis
    // exakt und deterministisch geprüft.
    ['knapp unter 1h alt (nahe der inklusiven Grenze, D1)', seed(ONE_HOUR_MS - 250), true],
    ['1h + 1ms alt', seed(ONE_HOUR_MS + 1), false],
    ['61 min alt', seed(61 * 60000), false],
  ];
  for (const [label, storage, expectRestore] of cases) {
    const app = boot({ storage });
    await app.run('initHashRouting()'); await settle();
    assertEqual([app.state().screen, app.state().page], expectRestore ? ['main', 'seasonLanding'] : ['main', 'overview'], `${label}: ${expectRestore ? 'wird wiederhergestellt' : 'Overview-Fallback'}`);
  }
  assertTrue(/Date\.now\(\)-savedMs>LAST_VIEW_MAX_AGE_MS/.test(fnSource('parseLastViewState')), 'Grenze exakt inklusive: Vergleich ist ">", nicht ">=" (Entscheidung D1 — exakt 1h alt wird noch akzeptiert)');
  const noEntry = boot({ storage: makeStorage() });
  await noEntry.run('initHashRouting()'); await settle();
  assertEqual(noEntry.log.includes('openOverview'), true, 'fehlender lastView-Eintrag: Overview-Fallback');
  const throwing = boot({ storageMode: 'throwing-getter' });
  await throwing.run('initHashRouting()'); await settle();
  assertEqual([throwing.log.includes('openOverview'), throwing.state().screen], [true, 'main'], 'Storage blockiert (SecurityError): kein Absturz, Overview-Fallback');
  const failGet = makeStorage(); failGet.failGet = true;
  const failing = boot({ storage: failGet });
  await failing.run('initHashRouting()'); await settle();
  assertEqual(failing.log.includes('openOverview'), true, 'getItem wirft: Overview-Fallback');
  for (const [label, raw] of [['kaputtes JSON', '{"v":1,'], ['kein Objekt', '[]'], ['ohne hash', JSON.stringify({ v: 1, savedAt: new Date().toISOString() })], ['ohne savedAt', JSON.stringify({ v: 1, hash: '#/25-26' })], ['savedAt kein Datum', JSON.stringify({ v: 1, hash: '#/25-26', savedAt: 'nicht-iso' })], ['Version 2', JSON.stringify({ v: 2, hash: '#/25-26', savedAt: new Date().toISOString() })]]) {
    const st = makeStorage(); st.m.set(LAST_VIEW_KEY, raw);
    const app = boot({ storage: st });
    await app.run('initHashRouting()'); await settle();
    assertEqual(app.log.includes('openOverview'), true, `ungültiger Eintrag (${label}): Overview-Fallback`);
  }
  // gültiger Wrapper, aber von parseAppHash abgelehnter Hash-Inhalt (z.B. unbekannte Saison)
  const badHash = seed(0, '#/99-99');
  const badApp = boot({ storage: badHash });
  await badApp.run('initHashRouting()'); await settle();
  assertEqual(badApp.log.includes('openOverview'), true, 'strukturell gültiger, aber von parseAppHash() abgelehnter Hash: Overview-Fallback');
  // gültiger Hash -> identisches Ergebnis wie eine echte URL mit demselben Hash
  const direct = boot({ initialHash: '#/24-25/player/p2' });
  await direct.run('initHashRouting()'); await settle();
  const viaLastView = boot({ storage: seed(0, '#/24-25/player/p2') });
  await viaLastView.run('initHashRouting()'); await settle();
  assertEqual(viaLastView.snapshot(), direct.snapshot(), 'Wiederherstellung über lastView ergibt denselben Endzustand wie dieselbe Adresse direkt beim Start');
}

// ── D2: kein Sliding-Freshness ──────────────────────────────────────────────
console.log('');
console.log('== D2: Restore erneuert savedAt NICHT ==');
{
  const storage = makeStorage();
  const nav = boot({ storage });
  await nav.run("setState({screen:'main',activeSeasonKey:'25/26',selectedSeasonKey:'25/26',page:'seasonLanding'})");
  const original = readStored(storage);
  // "14:00 gespeichert" simulieren: savedAt künstlich auf 59 Minuten zurückdatieren
  storage.m.set(LAST_VIEW_KEY, JSON.stringify({ ...original, savedAt: new Date(Date.now() - 59 * 60000).toISOString() }));
  const before = readStored(storage);
  const restore1 = boot({ storage });
  await restore1.run('initHashRouting()'); await settle();
  assertEqual([restore1.state().screen, restore1.state().page], ['main', 'seasonLanding'], '"14:59": 59 Minuten alter Stand wird wiederhergestellt');
  assertEqual(readStored(storage), before, 'Restore selbst verändert den gespeicherten Eintrag (insbesondere savedAt) NICHT');
  // "15:01" simulieren: derselbe (unveränderte) Eintrag ist jetzt künstlich >1h alt
  storage.m.set(LAST_VIEW_KEY, JSON.stringify({ ...before, savedAt: new Date(Date.now() - (ONE_HOUR_MS + 60000)).toISOString() }));
  const restore2 = boot({ storage });
  await restore2.run('initHashRouting()'); await settle();
  assertEqual(restore2.state().page, 'overview', '"15:01": derselbe, nie erneuerte Stand ist jetzt >1h alt -> Overview-Fallback');
  // normale Navigation NACH einem Restore aktualisiert lastView weiterhin (Flag wird zurückgesetzt)
  const setsBeforePostNav = storage.sets;
  await restore1.run("setState({page:'player',activeP:'p1'})");
  const after = readStored(storage);
  assertTrue(storage.sets > setsBeforePostNav, 'normale Navigation NACH einem Restore schreibt lastView weiterhin');
  assertEqual(after.hash, '#/25-26/player/p1', 'nach dem Restore aktualisiert echte Navigation lastView korrekt');
  assertTrue(Date.parse(after.savedAt) > Date.parse(before.savedAt), 'savedAt der neuen, echten Navigation ist neuer als der alte, wiederhergestellte Stand');
}

// ── Explizite Adresse ────────────────────────────────────────────────────
console.log('');
console.log('== Explizite Adresse gewinnt immer ==');
{
  const storage = makeStorage();
  storage.m.set(LAST_VIEW_KEY, JSON.stringify({ v: 1, hash: '#/25-26', savedAt: new Date().toISOString() }));
  const app = boot({ storage, initialHash: '#/24-25/player/p2' });
  await app.run('initHashRouting()'); await settle();
  assertEqual(storage.gets, 0, 'bei vorhandener expliziter Adresse wird lastView gar nicht erst gelesen');
  assertEqual([app.state().activeSeasonKey, app.state().page, app.state().activeP], ['24/25', 'player', 'p2'], 'explizite Adresse wird angewendet, nicht der vorhandene (andere) lastView');
  assertEqual(readStored(storage)?.hash, '#/24-25/player/p2', 'die explizite Navigation selbst aktualisiert lastView korrekt (normaler Navigationspfad)');
  // A -> reload ohne Hash -> B (nach explizitem Öffnen von B) wird wiederhergestellt, nicht das alte A
  const reload = boot({ storage, initialHash: '' });
  await reload.run('initHashRouting()'); await settle();
  assertEqual([reload.state().activeSeasonKey, reload.state().page, reload.state().activeP], ['24/25', 'player', 'p2'], 'Reload ohne Hash nach expliziter Navigation zu B stellt B wieder her, nicht das ursprüngliche A');
  // Reproduziert exakt den gemeldeten Befund: eine einzelne setState()-Änderung, deren Hash
  // von Anfang an bereits mit location.hash übereinstimmt (kein "desired!==current" bei
  // syncHashFromState()) -> ohne die gezielte Ergänzung in initHashRouting() bliebe lastView
  // hier leer/veraltet.
  const singleStorage = makeStorage();
  const single = boot({ storage: singleStorage, initialHash: '#/overview' });
  await single.run('initHashRouting()'); await settle();
  assertEqual(readStored(singleStorage)?.hash, '#/overview', 'direkter Start-Hash ohne jede Zwischenänderung von location.hash wird trotzdem als lastView gespeichert');
  const setsAfterStart = singleStorage.sets;
  await single.run('setState({})');
  assertEqual(singleStorage.sets, setsAfterStart, 'die Sicherung passiert einmalig beim Start, nicht bei jedem weiteren Rerender');
  // Reload ohne Hash danach stellt exakt diese direkt aufgerufene Ansicht wieder her
  const singleReload = boot({ storage: singleStorage, initialHash: '' });
  await singleReload.run('initHashRouting()'); await settle();
  assertEqual([singleReload.state().screen, singleReload.state().page], ['main', 'overview'], 'Reload ohne Hash stellt die zuvor direkt aufgerufene Ansicht korrekt wieder her');
}

// ── Navigation (mehrere Seitenarten) ─────────────────────────────────────
console.log('');
console.log('== Navigation: Speichern + Wiederherstellen je Seitenart ==');
{
  const cases = [
    ['Übersicht', "setState({screen:'main',page:'overview'})", { page: 'overview' }],
    ['Team/Saisonlandingpage', "setState({screen:'main',activeSeasonKey:'25/26',selectedSeasonKey:'25/26',page:'seasonLanding'})", { page: 'seasonLanding', activeSeasonKey: '25/26' }],
    ['Spieler', "setState({screen:'main',activeSeasonKey:'25/26',selectedSeasonKey:'25/26',page:'player',activeP:'p1'})", { page: 'player', activeP: 'p1' }],
    ['Spieltag', "setState({screen:'main',activeSeasonKey:'25/26',selectedSeasonKey:'25/26',page:'matchday',activeMatchday:1})", { page: 'matchday', activeMatchday: 1 }],
    ['Ewige Bestenliste (globale Seite)', "setState({screen:'main',page:'alltimePlayers',globalPlayerId:'p1'})", { page: 'alltimePlayers', globalPlayerId: 'p1' }],
  ];
  for (const [label, code, expected] of cases) {
    const storage = makeStorage();
    const a = boot({ storage });
    await a.run(code);
    assertTrue(readStored(storage) !== null, `${label}: Navigation erzeugt einen gültigen lastView-Eintrag`);
    const b = boot({ storage, initialHash: '' });
    await b.run('initHashRouting()'); await settle();
    for (const [k, v] of Object.entries(expected)) assertEqual(b.state()[k], v, `${label}: nach Neustart ohne Hash wiederhergestellt (${k})`);
  }
  // Saisonwechsel
  const storage = makeStorage();
  const a = boot({ storage });
  await a.run("setState({screen:'main',activeSeasonKey:'25/26',selectedSeasonKey:'25/26',page:'seasonLanding'})");
  await a.run("setState({activeSeasonKey:'24/25',selectedSeasonKey:'24/25'})");
  const b = boot({ storage, initialHash: '' });
  await b.run('initHashRouting()'); await settle();
  assertEqual([b.log.includes('openSeason:24/25'), b.state().activeSeasonKey], [true, '24/25'], 'Saisonwechsel: nach Neustart wird die zuletzt gewählte Saison wiederhergestellt');
}

// ── Regression: bestehende Routing-Funktionen unverändert ───────────────
console.log('');
console.log('== Regression: bestehendes Routing unverändert ==');
{
  const app = boot({ initialHash: '#/25-26/player/p1?asOf=2026-03-01' });
  assertEqual(app.run("parseAppHash('#/25-26/player/p1?asOf=2026-03-01')"), { kind: 'season', seasonKey: '25/26', asOf: { seasonKey: '25/26', date: '2026-03-01' }, page: 'player', objectId: 'p1' }, 'parseAppHash: unveränderte Semantik (Saison/Seite/Objekt/asOf)');
  assertEqual(app.run("buildAppHash('25/26',null,'player','p1')"), '#/25-26/player/p1', 'buildAppHash: unverändert');
  assertEqual(app.run("parseAppHash('#/overview')"), { kind: 'global', page: 'overview', objectId: null, asOf: null }, 'parseAppHash: globale Form unverändert');
  await app.run('initHashRouting()'); await settle();
  assertEqual([app.state().activeSeasonKey, app.state().page, app.state().activeP, app.state().asOf], ['25/26', 'player', 'p1', { seasonKey: '25/26', date: '2026-03-01' }], 'asOf-Query im Hash wird weiterhin korrekt übernommen (unabhängig von lastView)');
}

// ── Guards ────────────────────────────────────────────────────────────────
console.log('');
console.log('== Guards ==');
{
  const storageLines = html.split('\n').filter((l) => /(local|session)Storage|indexedDB/.test(l) && !l.trim().startsWith('//'));
  assertEqual(storageLines.length, 3, 'in index.html weiterhin genau die 3 Storage-Zeilen (keine vierte)');
  assertEqual(declLine('LAST_VIEW_STORAGE_KEY'), "const LAST_VIEW_STORAGE_KEY='vfbulm.comfort.lastView';", 'Storage-Schlüssel exakt vfbulm.comfort.lastView');
  const p8Fns = ['parseLastViewState', 'getStoredLastView'].map((n) => stripComments(fnSource(n)));
  assertTrue(p8Fns.every((s) => !/localStorage|sessionStorage|indexedDB/.test(s)), 'parseLastViewState/getStoredLastView: keine direkte Storage-Nutzung');
  assertEqual((stripComments(fnSource('getStoredLastView')).match(/einsatzCenterStorageRead\(/g) || []).length, 1, 'getStoredLastView nutzt genau einmal die vorhandene Kapsel Read');
  assertEqual((stripComments(fnSource('saveLastView')).match(/einsatzCenterStorageWrite\(/g) || []).length, 1, 'saveLastView (der einzige Schreibpunkt für lastView) nutzt genau einmal die vorhandene Kapsel Write');
  assertTrue(!/einsatzCenterStorageWrite/.test(stripComments(fnSource('syncHashFromState')) + stripComments(fnSource('initHashRouting'))), 'syncHashFromState/initHashRouting schreiben nicht direkt über die Kapsel, sondern ausschließlich über saveLastView()');
  assertEqual([(stripComments(fnSource('syncHashFromState')).match(/saveLastView\(/g) || []).length, (stripComments(fnSource('initHashRouting')).match(/saveLastView\(/g) || []).length], [1, 1], 'saveLastView() wird genau je einmal aus syncHashFromState (echte Navigation) und initHashRouting (einmalig bei explizitem Start-Hash) aufgerufen');
  assertTrue(!/einsatzCenterStorageRemove/.test(fnSource('syncHashFromState') + fnSource('getStoredLastView') + fnSource('parseLastViewState') + fnSource('initHashRouting') + fnSource('saveLastView')), 'P0c.8-Code nutzt einsatzCenterStorageRemove nicht');
  assertTrue(!/vfbulm\.einsatzCenter|vfbulm\.comfort\.lastSeenDataState/.test(fnSource('syncHashFromState') + fnSource('initHashRouting') + fnSource('parseLastViewState') + fnSource('getStoredLastView')), 'kein Zugriff auf den Autosave- oder P0c.7-Namensraum aus dem P0c.8-Code');
  // "lastView -> parseAppHash -> bestehende Logik", NICHT: parseAppHash/buildAppHash/applyAppHash kennen lastView
  for (const n of ['parseAppHash', 'buildAppHash', 'buildGlobalPageHash', 'buildHashStringFromParsed', 'computeCurrentAppHash', 'applyGlobalPageFromHash', 'applyAppHash']) {
    assertTrue(!/LAST_VIEW|lastView/i.test(fnSource(n)), `${n}: kein eigener lastView-Bezug (Wiederverwendung, keine zweite Routinglogik)`);
  }
  // P0c.7 bleibt unberührt / keine Vermischung der Namensräume
  for (const n of ['getSeasonDataState', 'parseSeasonDataState', 'isNewSeasonDataState', 'recordOverviewVisit', 'detectOverviewPhase']) {
    assertTrue(!/LAST_VIEW|lastView/i.test(fnSource(n)), `${n} (P0c.7): kein P0c.8-Bezug`);
  }
  assertEqual((html.match(/vfbulm\.comfort\.lastSeenDataState/g) || []).length, 1, 'P0c.7-Namensraum vfbulm.comfort.lastSeenDataState unverändert (weiterhin genau 1 Vorkommen, die Definition)');
  // harte Grenzen: keine neue Route, keine Umbenennung der bestehenden Seitenlisten
  assertEqual(declLine('HASH_GLOBAL_PAGES'), "const HASH_GLOBAL_PAGES=['matchcenter','lineupBuilder','einsatzCenter','comparisonCenter','hallOfFame','alltimePlayers','lexicon','overview','ligaGegner'];", 'HASH_GLOBAL_PAGES unverändert, keine neue Seite eingeführt');
  assertEqual(declLine('HASH_SEASON_PAGE_SEGMENTS'), "const HASH_SEASON_PAGE_SEGMENTS=['player','matchday'];", 'HASH_SEASON_PAGE_SEGMENTS unverändert');
  // Autosave/Draft/Preview unberührt
  assertTrue(!/LAST_VIEW|lastView/i.test(html.slice(html.indexOf('const EINSATZ_CENTER_AUTOSAVE_PREFIX'), html.indexOf('window.einsatzCenterSoftIssues=einsatzCenterSoftIssues;'))), 'Einsatz-Center-Region (Autosave/Draft/Preview, P0c.2/3/4/6) enthält keinen P0c.8-Bezug');
}

console.log('');
if (failures > 0) {
  console.log(`${failures} Test(s) fehlgeschlagen.`);
  process.exitCode = 1;
} else {
  console.log('Alle Tests erfolgreich.');
  process.exitCode = 0;
}

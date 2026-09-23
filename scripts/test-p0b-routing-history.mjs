#!/usr/bin/env node
// P0b-Fix 8 — Test für die History-Einträge saisongebundener Navigation (Spezifikation 6.8: Zurück,
// Lesezeichen, geteilte Links) und den seitenlosen Saison-Hash bei gleicher Saison.
//
// Die echten Funktionen (syncHashFromState, withoutHashSync, applyAppHash, initHashRouting,
// computeCurrentAppHash, parseAppHash …, setState, openSeason, openOverview, openMatchdayTimeline,
// openMatchday, switchOverviewSeason, switchMatchdaySeason, die lastView-Kapseln) werden unverändert
// aus dem index.html-Text geschnitten und in node:vm ausgeführt. Nachgebildet sind nur loadSeason()
// und applySeasonContext() (dieselbe Wirkung auf den State wie im Original: erst die Standardseite
// "team" bzw. "seasonLanding" der Saison setzen, danach — nach einem echten await — gibt der Öffner
// seine Zielseite vor) sowie render() und die übrigen open*()-Platzhalter. Als Adressleiste dient ein
// Mini-Browser: jede Änderung von location.hash erzeugt genau einen History-Eintrag (und ein
// asynchrones hashchange), Zurück/Vor bewegen den History-Zeiger. Gezählt werden die echten
// Hash-Schreibvorgänge (= History-Einträge). Liest index.html nur lesend, schreibt nichts.
//
// Aufruf: node scripts/test-p0b-routing-history.mjs

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
const clone = (o) => JSON.parse(JSON.stringify(o));
const sha = (s) => crypto.createHash('sha256').update(s).digest('hex').slice(0, 16);

const html = (await readFile(process.env.P0B_ROUTING_TEST_INDEX || path.join(REPO_ROOT, 'index.html'), 'utf8')).replace(/\r\n/g, '\n');
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
function constArrowSource(name) {
  const from = html.indexOf(`const ${name}=`);
  if (from === -1) throw new Error(`const ${name} nicht gefunden`);
  return html.slice(from, html.indexOf('\n};', from) + 3);
}
const declLine = (name) => new RegExp(`^(?:const|let) ${name}=.*$`, 'm').exec(html)?.[0] ?? (() => { throw new Error(`Deklaration ${name} fehlt`); })();
const stripComments = (s) => s.split('\n').filter((l) => !l.trim().startsWith('//') && !l.trim().startsWith('*') && !l.trim().startsWith('/*')).join('\n');

const REAL_FN_NAMES = [
  'decodeHashSegmentSafe', 'parseAsOfQueryValue', 'isValidAsOfDate', 'isValidAsOfStartTime', 'hashSegmentToSeasonKey', 'seasonKeyToHashSegment', 'asOfEquals', 'deriveAsOfForSeason',
  'parseAppHash', 'buildAppHash', 'buildGlobalPageHash', 'buildHashStringFromParsed', 'computeCurrentAppHash', 'syncHashFromState', 'withoutHashSync', 'applyGlobalPageFromHash', 'applyAppHash', 'initHashRouting',
  'getActiveSeasonKey', 'clearAnalysisCache', 'parseLastViewState', 'getStoredLastView', 'saveLastView', 'einsatzCenterStorageRead', 'einsatzCenterStorageWrite', 'einsatzCenterStorageRemove',
  'isGameAtOrBeforeAsOf', 'compareGamesChronologically', 'buildMatchdays', 'asOfCacheKeyPart', 'analysisCacheKey', 'cachedAnalysis', 'getSeasonMatchdays', 'matchdayAsOfCutoff',
];
const realFunctions = REAL_FN_NAMES.map(fnSource).join('\n');
const realConsts = [declLine('HASH_GLOBAL_PAGES'), declLine('HASH_SEASON_PAGE_SEGMENTS'), declLine('LAST_VIEW_STORAGE_KEY'), declLine('LAST_VIEW_MAX_AGE_MS'), declLine('LAST_VIEW_RESTORE_IN_PROGRESS'), declLine('HASH_SYNC_SUSPENDED')].join('\n');
const setStateSrc = constArrowSource('setState');
const openers = ['openSeason', 'openOverview', 'openMatchdayTimeline', 'openMatchday', 'switchOverviewSeason', 'switchMatchdaySeason'].map(winSource).join('\n');

const LAST_VIEW_KEY = 'vfbulm.comfort.lastView';
const sg = (id, day, date, ended) => ({ id, game_number: String(id), date, start_time: '12:00', game_day: { game_day_number: day, title: `${day}. Spieltag` }, home_team_name: 'A', guest_team_name: 'B', started: ended, ended });
const GAMES_2526 = [sg(1, 1, '2026-03-01', true), sg(2, 1, '2026-03-01', true), sg(3, 2, '2026-03-08', true), sg(4, 3, '2026-03-15', true)];
const GAMES_2425 = [sg(11, 1, '2025-03-01', true)];
const PLAYERS = [{ key: 'p1', name: 'Spieler Eins' }, { key: 'p2', name: 'Spieler Zwei' }];
const settle = async () => { for (let i = 0; i < 14; i++) await new Promise((r) => setTimeout(r, 4)); };

/** Frischer vm-Kontext mit Mini-Browser. loadFails: 'before' | 'after' (nach Setzen der Standardseite) | null. */
function boot({ initialHash = '', loadFails = null, storedLastView = null } = {}) {
  const S = { screen: 'cover', page: null, activeSeasonKey: null, selectedSeasonKey: null, asOf: null, activeP: null, activeMatchday: null, globalPlayerId: null, players: PLAYERS };
  const log = [];
  const writes = [];
  const listeners = {};
  const hist = { entries: [initialHash], index: 0 };
  let hashVal = initialHash;
  const fire = () => setTimeout(() => { try { listeners.hashchange?.(); } catch (e) { /* wie im Browser: Listener-Fehler brechen nichts ab */ } }, 0);
  const loc = {
    get hash() { return hashVal; },
    set hash(v) {
      const n = String(v).startsWith('#') ? String(v) : `#${v}`;
      if (n === hashVal) return;
      hashVal = n;
      hist.entries.splice(hist.index + 1);
      hist.entries.push(n);
      hist.index++;
      writes.push(n);
      fire();
    },
  };
  const browser = {
    back() { hist.index--; hashVal = hist.entries[hist.index]; fire(); },
    forward() { hist.index++; hashVal = hist.entries[hist.index]; fire(); },
  };
  const stored = [];
  const store = new Map(storedLastView ? [[LAST_VIEW_KEY, storedLastView]] : []);
  const storage = { getItem: (k) => (store.has(k) ? store.get(k) : null), setItem: (k, v) => { stored.push(JSON.parse(v).hash); store.set(k, String(v)); }, removeItem: (k) => store.delete(k) };
  const win = { addEventListener: (type, fn) => { listeners[type] = fn; }, localStorage: storage };
  const SEASONS = { '25/26': { data: { rawLeagueGames: clone(GAMES_2526) } }, '24/25': { data: { rawLeagueGames: clone(GAMES_2425) } } };
  const ctx = vm.createContext({
    window: win, location: loc, S, SEASONS, analysisCache: new Map(), CURRENT_SEASON_KEY: '25/26',
    SEASON_CONFIG: { '25/26': { label: '25/26' }, '24/25': { label: '24/25' } },
    console, URLSearchParams, setTimeout, log, loadFails,
    render: () => { log.push('render'); },
    ensureGlobalDataLoaded: async () => {},
    showMainShell: () => { log.push('showMainShell'); },
    recordOverviewVisit: () => { log.push('recordOverviewVisit'); },
  });
  const run = (code) => vm.runInContext(code, ctx);
  vm.runInContext(realConsts, ctx);
  vm.runInContext(realFunctions, ctx);
  vm.runInContext(setStateSrc, ctx);
  vm.runInContext(openers, ctx);
  // loadSeason()/applySeasonContext(): gleiche Wirkung auf den State wie im Original (Standardseite der Saison),
  // mit echtem await davor (Netzwerk/Laden). Die restlichen open*()-Öffner sind Platzhalter.
  run(`
    function applySeasonContext(seasonKey,page=S.page){
      setState({screen:'main',activeSeasonKey:seasonKey,selectedSeasonKey:seasonKey,page,players:${JSON.stringify(PLAYERS)}});
    }
    async function loadSeason(seasonKey){
      log.push('loadSeason:'+seasonKey);
      await Promise.resolve();
      await new Promise(r=>setTimeout(r,1));
      if(loadFails==='before')throw new Error('Laden fehlgeschlagen');
      applySeasonContext(seasonKey,'team');
      if(loadFails==='after')throw new Error('Laden fehlgeschlagen (nach Standardseite)');
    }
    window.openAllTimePlayers = async () => { log.push('openAllTimePlayers'); setState({screen:'main',page:'alltimePlayers'}); };
    window.openHallOfFame = async () => { log.push('openHallOfFame'); setState({screen:'main',page:'hallOfFame'}); };
    window.openLexicon = async () => { log.push('openLexicon'); setState({screen:'main',page:'lexicon'}); };
    window.openMatchcenter = async () => { log.push('openMatchcenter'); setState({screen:'main',page:'matchcenter'}); };
    window.openComparisonCenter = async () => { log.push('openComparisonCenter'); setState({screen:'main',page:'comparisonCenter'}); };
    window.openLineupBuilder = async () => { log.push('openLineupBuilder'); setState({screen:'main',page:'lineupBuilder'}); };
    window.openEinsatzCenter = async () => { log.push('openEinsatzCenter'); setState({screen:'main',page:'einsatzCenter'}); };
    window.openLigaGegner = async () => { log.push('openLigaGegner'); setState({screen:'main',page:'ligaGegner'}); };
  `);
  const state = () => run('S');
  const reset = () => { writes.length = 0; stored.length = 0; log.length = 0; };
  return { ctx, run, S: state, state, log, writes, stored, hist, loc, browser, listeners, storage, reset };
}
/** Ausgangslage: Alltime-Seite (globale Seite) in Saison 25/26, Adresse und History entsprechend. */
async function baseAt(app, page = 'alltimePlayers') {
  await app.run(`setState({screen:'main',activeSeasonKey:'25/26',selectedSeasonKey:'25/26',page:${JSON.stringify(page)}})`);
  await settle();
  app.reset();
}
const st = (app) => { const s = app.state(); return { page: s.page, season: s.activeSeasonKey, md: s.activeMatchday }; };

// ── A: genau ein Hash-Schreibvorgang je Navigation ─────────────────────
console.log('== A: genau ein History-Eintrag je Navigation ==');
{
  const cases = [
    ['openOverview', 'window.openOverview()', ['#/overview'], { page: 'overview', season: '25/26', md: null }],
    ['openMatchdayTimeline', "window.openMatchdayTimeline('25/26')", ['#/25-26/matchday'], { page: 'matchday', season: '25/26', md: null }],
    ['openMatchday(25/26,2)', "window.openMatchday('25/26',2)", ['#/25-26/matchday/2'], { page: 'matchday', season: '25/26', md: 2 }],
    ['openMatchday(25/26,99) ungültig', "window.openMatchday('25/26',99)", ['#/25-26/matchday'], { page: 'matchday', season: '25/26', md: null }],
    ['openMatchday(24/25,1) andere Saison', "window.openMatchday('24/25',1)", ['#/24-25/matchday/1'], { page: 'matchday', season: '24/25', md: 1 }],
  ];
  for (const [label, code, expectedWrites, expectedState] of cases) {
    const app = boot();
    await baseAt(app);
    await app.run(code); await settle();
    assertEqual(app.writes, expectedWrites, `${label}: genau ein Hash-Schreibvorgang (${expectedWrites[0]}), kein Zwischenhash`);
    assertEqual(st(app), expectedState, `${label}: State stimmt`);
    assertEqual(app.run('computeCurrentAppHash()'), app.loc.hash, `${label}: Adresse == aus dem State abgeleiteter Hash`);
    assertEqual(app.run('HASH_SYNC_SUSPENDED'), 0, `${label}: Zähler steht wieder auf 0`);
  }
  const sw = boot();
  await baseAt(sw, 'overview');
  await sw.run("setState({page:'overview'})");
  sw.reset();
  await sw.run("window.switchOverviewSeason('24/25')"); await settle();
  assertEqual([sw.writes, st(sw)], [[], { page: 'overview', season: '24/25', md: null }], 'switchOverviewSeason: kein Hash-Schreibvorgang (der Übersichts-Hash enthält die Saison nicht), vorher entstand "#/24-25" als Zwischeneintrag');
  const sm = boot();
  await baseAt(sm, 'matchday');
  await sm.run("setState({page:'matchday',activeMatchday:null})");
  sm.reset();
  await sm.run("window.switchMatchdaySeason('24/25')"); await settle();
  assertEqual([sm.writes, st(sm)], [['#/24-25/matchday'], { page: 'matchday', season: '24/25', md: null }], 'switchMatchdaySeason: genau ein Schreibvorgang für den Zielhash');
  // nur Saison wechseln bleibt unverändert: ein Eintrag für die Team-Seite
  const os = boot();
  await baseAt(os);
  await os.run("window.openSeason('24/25')"); await settle();
  assertEqual([os.writes, st(os).page], [['#/24-25'], 'team'], 'openSeason (nur Saison wechseln): weiterhin genau ein Eintrag "#/24-25" (Team-Seite ist das Ziel)');
}

// ── B: Deep-Link ───────────────────────────────────────────────────────
console.log('== B: Deep-Link / Start mit expliziter Adresse ==');
{
  const app = boot({ initialHash: '#/25-26/matchday/3' });
  await app.run('initHashRouting()'); await settle();
  assertEqual(app.writes, [], 'Deep-Link #/25-26/matchday/3: kein Hash-Schreibvorgang (kein Zwischenhash "#/25-26")');
  assertEqual(app.hist.entries, ['#/25-26/matchday/3'], 'kein zusätzlicher History-Eintrag');
  assertEqual([st(app), app.loc.hash], [{ page: 'matchday', season: '25/26', md: 3 }, '#/25-26/matchday/3'], 'State und Adresse stimmen');
  assertEqual(app.stored, ['#/25-26/matchday/3'], 'lastView: genau ein Speichern, für den Zielhash (kein Zwischenhash)');
  const bad = boot({ initialHash: '#/25-26/matchday/99' });
  await bad.run('initHashRouting()'); await settle();
  assertEqual([bad.writes, st(bad).md, bad.loc.hash], [['#/25-26/matchday'], null, '#/25-26/matchday'], 'ungültiger Spieltag im Deep-Link: einmalige Korrektur auf den Zeitleisten-Hash (wie bisher), kein Zwischenhash');
  const player = boot({ initialHash: '#/25-26/player/p2' });
  await player.run('initHashRouting()'); await settle();
  assertEqual([player.writes, st(player).page, player.state().activeP], [[], 'player', 'p2'], 'Deep-Link auf einen Spieler: kein Schreibvorgang');
  const other = boot({ initialHash: '#/24-25' });
  await other.run('initHashRouting()'); await settle();
  assertEqual([other.writes, st(other)], [[], { page: 'team', season: '24/25', md: null }], 'seitenloser Saison-Hash beim Start: Team-Seite der Saison, kein Schreibvorgang');
  const global = boot({ initialHash: '#/lexicon' });
  await global.run('initHashRouting()'); await settle();
  assertEqual([global.writes, st(global).page], [[], 'lexicon'], 'globale Seite beim Start unverändert');
  const start = boot({ initialHash: '' });
  await start.run('initHashRouting()'); await settle();
  assertEqual([start.writes, st(start).page], [['#/overview'], 'overview'], 'hashloser Start: openOverview schreibt genau einen Eintrag (vorher zwei: #/25-26 und #/overview)');
}

// ── C: seitenloser Saison-Hash bei gleicher Saison ─────────────────────
console.log('== C: "#/25-26" bei gleicher Saison zeigt die Standardansicht ==');
{
  for (const page of ['player', 'matchday', 'lexicon', 'overview', 'comparisonCenter', 'hallOfFame']) {
    const app = boot();
    await baseAt(app, page);
    app.loc.hash = '#/25-26'; app.writes.length = 0; // wie ein Zurück auf einen Team-Eintrag: Adresse steht schon
    app.log.length = 0;
    await app.run("applyAppHash(parseAppHash('#/25-26'))"); await settle();
    assertEqual([st(app).page, app.log.filter((l) => l.startsWith('loadSeason')).length, app.writes], ['team', 1, []], `aktuelle Seite "${page}" + #/25-26 -> Team-Seite (ein openSeason, kein Schreibvorgang)`);
  }
  for (const page of ['team', 'seasonLanding']) {
    const app = boot();
    await baseAt(app, page);
    app.loc.hash = '#/25-26'; app.writes.length = 0;
    app.log.length = 0;
    await app.run("applyAppHash(parseAppHash('#/25-26'))"); await settle();
    assertEqual([st(app).page, app.log.filter((l) => l.startsWith('loadSeason')).length, app.writes], [page, 0, []], `aktuelle Seite "${page}" + #/25-26 -> kein unnötiger openSeason-Aufruf`);
  }
  const otherSeason = boot();
  await baseAt(otherSeason, 'matchday');
  otherSeason.loc.hash = '#/24-25'; otherSeason.writes.length = 0; otherSeason.log.length = 0;
  await otherSeason.run("applyAppHash(parseAppHash('#/24-25'))"); await settle();
  assertEqual([st(otherSeason), otherSeason.log.filter((l) => l.startsWith('loadSeason')), otherSeason.writes], [{ page: 'team', season: '24/25', md: null }, ['loadSeason:24/25'], []], 'andere Saison: bestehende Logik unverändert (ein openSeason, Team-Seite)');
  const withPage = boot();
  await baseAt(withPage, 'lexicon');
  withPage.loc.hash = '#/25-26/matchday/2'; withPage.writes.length = 0;
  await withPage.run("applyAppHash(parseAppHash('#/25-26/matchday/2'))"); await settle();
  assertEqual([st(withPage), withPage.writes], [{ page: 'matchday', season: '25/26', md: 2 }, []], 'Hash mit Seitensegment bei gleicher Saison: wie bisher, genau eine Anwendung ohne Zwischenhash');
  const same = boot();
  await baseAt(same, 'matchday');
  same.run("setState({activeMatchday:2})"); same.reset();
  await same.run("applyAppHash(parseAppHash('#/25-26/matchday/2'))"); await settle();
  assertEqual(same.log.filter((l) => l.startsWith('loadSeason')).length, 0, 'Hash entspricht bereits dem State: früher Rückkehrzweig, kein Laden');
}

// ── D: Zurück / Vor ────────────────────────────────────────────────────
console.log('== D: Zurück/Vor: Übersicht -> Team -> Spieltage ==');
{
  const app = boot({ initialHash: '' });
  await app.run('initHashRouting()'); await settle();
  await app.run("setState({page:'team'})"); await settle();
  await app.run("window.openMatchdayTimeline('25/26')"); await settle();
  assertEqual(app.hist.entries, ['', '#/overview', '#/25-26', '#/25-26/matchday'], 'History nach drei Navigationen: genau ein Eintrag je Schritt (kein Zwischeneintrag)');
  assertEqual(st(app).page, 'matchday', 'Vorbedingung: Spieltage-Seite sichtbar');
  const before = app.hist.entries.length;
  app.browser.back(); await settle();
  assertEqual([app.loc.hash, st(app).page], ['#/25-26', 'team'], 'Zurück -> Teamseite wird tatsächlich angezeigt (nicht nur der Hash ändert sich)');
  app.browser.back(); await settle();
  assertEqual([app.loc.hash, st(app).page], ['#/overview', 'overview'], 'Zurück -> Übersicht');
  app.browser.forward(); await settle();
  assertEqual([app.loc.hash, st(app).page], ['#/25-26', 'team'], 'Vor -> Teamseite');
  app.browser.forward(); await settle();
  assertEqual([app.loc.hash, st(app).page, st(app).md], ['#/25-26/matchday', 'matchday', null], 'Vor -> Spieltage-Zeitleiste');
  assertEqual(app.hist.entries.length, before, 'Zurück/Vor erzeugen keine zusätzlichen History-Einträge');
  // Spieltag-Detail: ein Schritt zurück führt auf die Zeitleiste
  await app.run("window.openMatchday('25/26',3)"); await settle();
  assertEqual([app.loc.hash, st(app).md], ['#/25-26/matchday/3', 3], 'Detail geöffnet');
  app.browser.back(); await settle();
  assertEqual([app.loc.hash, st(app).page, st(app).md], ['#/25-26/matchday', 'matchday', null], 'ein einziges Zurück vom Detail führt zur Zeitleiste (vorher: erst "#/25-26" ohne Wirkung)');
  // Zurück von einer globalen Seite auf einen Team-Eintrag
  const g = boot({ initialHash: '' });
  await g.run('initHashRouting()'); await settle();
  await g.run("setState({page:'team'})"); await settle();
  await g.run('window.openLexicon()'); await settle();
  g.browser.back(); await settle();
  assertEqual([g.loc.hash, st(g).page], ['#/25-26', 'team'], 'Team -> Lexikon -> Zurück: Teamseite (vorher blieb das Lexikon sichtbar)');
}

// ── E: Fehlerpfad ──────────────────────────────────────────────────────
console.log('== E: Fehlerpfad ==');
{
  const early = boot({ loadFails: 'before' });
  await baseAt(early);
  let err = null;
  try { await early.run("window.openMatchday('25/26',2)"); } catch (e) { err = e.message; }
  assertEqual([err, early.run('HASH_SYNC_SUSPENDED')], ['Laden fehlgeschlagen', 0], 'loadSeason wirft: Fehler wird durchgereicht, Zähler steht wieder auf 0');
  assertEqual(early.writes, [], 'kein Hash geschrieben, State unverändert');
  await early.run("setState({page:'lexicon'})"); await settle();
  assertEqual(early.writes, ['#/lexicon'], 'danach funktioniert die Hash-Synchronisation wieder normal');
  const late = boot({ loadFails: 'after' });
  await baseAt(late);
  err = null;
  try { await late.run("window.openOverview()"); } catch (e) { err = e.message; }
  assertEqual([err, late.run('HASH_SYNC_SUSPENDED')], ['Laden fehlgeschlagen (nach Standardseite)', 0], 'Fehler nach dem Setzen der Standardseite: Zähler 0');
  assertEqual([st(late).page, late.loc.hash, late.run('computeCurrentAppHash()')], ['team', '#/25-26', '#/25-26'], 'abschließender Abgleich: Adresse stimmt mit dem erreichten State überein (kein dauerhaftes Auseinanderlaufen)');
  assertEqual(late.writes, ['#/25-26'], 'genau ein Schreibvorgang für den tatsächlich erreichten Zustand');
  const hash = boot({ initialHash: '#/25-26/matchday/2', loadFails: 'before' });
  await hash.run('initHashRouting()'); await settle();
  assertEqual([hash.run('HASH_SYNC_SUSPENDED'), hash.loc.hash], [0, '#/25-26/matchday/2'], 'applyAppHash mit fehlschlagendem Laden: Zähler 0, Adresse bleibt die angeforderte');
}

// ── F: Verschachtelung ─────────────────────────────────────────────────
console.log('== F: Verschachtelung von withoutHashSync ==');
{
  const app = boot();
  await baseAt(app);
  const trace = [];
  await app.run(`(async()=>{
    await withoutHashSync(async()=>{
      await withoutHashSync(async()=>{ setState({page:'lexicon'}); });
      globalThis.__afterInner={counter:HASH_SYNC_SUSPENDED,hash:location.hash};
      await Promise.resolve();
    });
    globalThis.__afterOuter={counter:HASH_SYNC_SUSPENDED,hash:location.hash};
  })()`);
  await settle();
  assertEqual(app.run('globalThis.__afterInner'), { counter: 1, hash: '#/alltimePlayers' }, 'nach der inneren Ebene: Zähler 1, Adresse noch unverändert (innen wird nicht abgeglichen)');
  assertEqual(app.run('globalThis.__afterOuter'), { counter: 0, hash: '#/lexicon' }, 'nach der äußeren Ebene: Zähler 0, Adresse abgeglichen');
  assertEqual(app.writes, ['#/lexicon'], 'genau ein Schreibvorgang für die gesamte Verschachtelung');
  const err = boot();
  await baseAt(err);
  let msg = null;
  try {
    await err.run(`withoutHashSync(async()=>{ await withoutHashSync(async()=>{ setState({page:'lexicon'}); throw new Error('innen'); }); })`);
  } catch (e) { msg = e.message; }
  assertEqual([msg, err.run('HASH_SYNC_SUSPENDED'), err.writes], ['innen', 0, ['#/lexicon']], 'Fehler in der inneren Ebene: durchgereicht, Zähler 0, Abgleich genau einmal');
  const ret = boot();
  assertEqual(await ret.run('withoutHashSync(async()=>42)'), 42, 'withoutHashSync reicht den Rückgabewert durch');
  const guard = boot();
  await baseAt(guard);
  await guard.run('HASH_SYNC_SUSPENDED=2');
  await guard.run("setState({page:'lexicon'})");
  assertEqual([guard.writes, guard.stored], [[], []], 'syncHashFromState während der Unterdrückung: weder Adresse noch lastView');
  await guard.run('HASH_SYNC_SUSPENDED=0; syncHashFromState()');
  assertEqual([guard.writes, guard.stored], [['#/lexicon'], ['#/lexicon']], 'nach der Freigabe: ein Abgleich schreibt Adresse und lastView für den erreichten Zustand');
}

// ── G: lastView ────────────────────────────────────────────────────────
console.log('== G: lastView nur für Zielhashes ==');
{
  for (const [label, code, target] of [
    ['openOverview', 'window.openOverview()', '#/overview'],
    ['openMatchdayTimeline', "window.openMatchdayTimeline('25/26')", '#/25-26/matchday'],
    ['openMatchday', "window.openMatchday('25/26',2)", '#/25-26/matchday/2'],
    ['switchMatchdaySeason', "window.switchMatchdaySeason('24/25')", '#/24-25/matchday'],
  ]) {
    const app = boot();
    await baseAt(app, label === 'switchMatchdaySeason' ? 'matchday' : 'alltimePlayers');
    await app.run(code); await settle();
    assertEqual(app.stored, [target], `${label}: lastView genau einmal, für den Zielhash (kein "#/25-26"/"#/24-25" als Zwischenstand)`);
  }
  const back = boot({ initialHash: '' });
  await back.run('initHashRouting()'); await settle();
  await back.run("setState({page:'team'})"); await settle();
  await back.run("window.openMatchdayTimeline('25/26')"); await settle();
  back.stored.length = 0;
  back.browser.back(); await settle();
  assertEqual(back.stored, [], 'Zurück/Vor: keine erneute lastView-Speicherung (Adresse stimmt bereits mit dem State überein)');
  // Restore aus lastView: kein Zwischenhash, kein neues Speichern
  const restored = boot({ initialHash: '', storedLastView: JSON.stringify({ v: 1, hash: '#/25-26/matchday/2', savedAt: new Date().toISOString() }) });
  await restored.run('initHashRouting()'); await settle();
  assertEqual([st(restored), restored.stored], [{ page: 'matchday', season: '25/26', md: 2 }, []], 'lastView-Restore (D2): richtige Ansicht, kein Sliding-Freshness-Speichern, kein Zwischenhash');
  assertEqual(restored.writes, ['#/25-26/matchday/2'], 'lastView-Restore: genau ein Adress-Schreibvorgang (die hashlose Startadresse erhält den wiederhergestellten Hash)');
}

// ── H: Quelltext und unveränderte Bestandteile ─────────────────────────
console.log('== H: Quelltext, Abgrenzung ==');
{
  const sync = fnSource('syncHashFromState');
  assertTrue(/^function syncHashFromState\(\)\{\n  if\(HASH_SYNC_SUSPENDED>0\)return;\n  try\{/.test(sync), 'syncHashFromState prüft den Zähler als allererste Anweisung');
  assertEqual((stripComments(sync).match(/saveLastView\(/g) || []).length, 1, 'syncHashFromState enthält weiterhin genau ein saveLastView(');
  const helper = stripComments(fnSource('withoutHashSync'));
  assertTrue(!/localStorage|sessionStorage|lastView|saveLastView|einsatzCenterStorage|S\./.test(helper), 'withoutHashSync: keine Storage-/lastView-Logik, kein Zugriff auf S');
  assertEqual((stripComments(html).match(/await withoutHashSync\(/g) || []).length, 6, 'withoutHashSync wird an genau 6 Stellen verwendet: 5 Öffner und applyAppHash');
  for (const n of ['openOverview', 'openMatchdayTimeline', 'openMatchday', 'switchOverviewSeason', 'switchMatchdaySeason']) assertTrue(/withoutHashSync\(/.test(winSource(n)), `${n} nutzt withoutHashSync`);
  assertTrue(/withoutHashSync\(/.test(fnSource('applyAppHash')), 'applyAppHash nutzt withoutHashSync');
  const writes = stripComments(html).split('\n').filter((l) => /\blocation\.hash\s*=[^=]/.test(l));
  assertEqual(writes.length, 1, 'location.hash wird weiterhin nur an einer Stelle geschrieben (syncHashFromState)');
  assertTrue(/history\.(push|replace)State/.test(stripComments(html)) === false, 'weiterhin kein pushState/replaceState');
  // Fingerprints (Stand vor P0b-Fix 8): dieser Fix darf diese Funktionen ausdrücklich nicht verändern
  const pinned = {
    parseAppHash: 'a41f0760de39e83c', computeCurrentAppHash: '3c9bad5a17ccbdfe', buildAppHash: 'af3fc925644456bc', buildGlobalPageHash: '7597cffc76f63110', buildHashStringFromParsed: 'ccaf4edb9bda3223',
    saveLastView: '154e4e3394c4f032', getStoredLastView: 'a833ec8246fb89dc', loadSeason: '220ad357b6492e08', applySeasonContext: '9546b774ca9b29ad', initHashRouting: '44e6d108af2064a9',
  };
  for (const [name, hash] of Object.entries(pinned)) assertEqual(sha(fnSource(name)), hash, `${name} unverändert (Fingerprint)`);
  assertEqual(sha(constArrowSource('setState')), 'ca857f41ba10d01a', 'setState unverändert (Fingerprint)');
  assertEqual(declLine('HASH_GLOBAL_PAGES'), "const HASH_GLOBAL_PAGES=['matchcenter','lineupBuilder','einsatzCenter','comparisonCenter','hallOfFame','alltimePlayers','lexicon','overview','ligaGegner'];", 'HASH_GLOBAL_PAGES unverändert');
  assertEqual(declLine('HASH_SEASON_PAGE_SEGMENTS'), "const HASH_SEASON_PAGE_SEGMENTS=['player','matchday'];", 'HASH_SEASON_PAGE_SEGMENTS unverändert');
  const apply = stripComments(fnSource('applyAppHash'));
  assertTrue(!/LAST_VIEW|lastView/i.test(apply), 'applyAppHash kennt weiterhin kein lastView');
  assertTrue(/else if\(parsed\.page===null&&S\.page!=='team'&&S\.page!=='seasonLanding'\)await window\.openSeason\(parsed\.seasonKey\)/.test(apply), 'Seitenlos-Zweig: nur bei gleicher Saison und einer anderen Seite als team/seasonLanding');
}

console.log('');
if (failures > 0) {
  console.log(`${failures} Test(s) fehlgeschlagen.`);
  process.exitCode = 1;
} else {
  console.log('Alle Tests erfolgreich.');
  process.exitCode = 0;
}

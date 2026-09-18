#!/usr/bin/env node
// P0c.3 — Test für den Draft-Autosave mit baseHash (Spezifikation 3.6.5 /
// Entscheidung 10).
//
// Wie test-p0c2-effective-lineup.mjs: der Einsatz-Center-Bereich von
// index.html ("const LINEUP_DATA={};" bis "window.einsatzCenterSoftIssues=…")
// wird unverändert aus dem echten Text geschnitten und in node:vm mit
// minimalen Stubs ausgeführt. localStorage ist ein Fake (Map), der gezielt
// fehlschlagen kann. Ein "Reload" wird als neuer vm-Kontext mit demselben
// Storage-Inhalt simuliert. Liest index.html/lineup-data nur lesend.
//
// Aufruf: node scripts/test-p0c3-draft-autosave.mjs

import { readFile } from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';

import { computeBaseHash } from './lineup-data-hash.mjs';

const REPO_ROOT = path.resolve(import.meta.dirname, '..');
const SEASON_KEYS = ['21/22', '22/23', '23/24', '24/25', '25/26'];
const KEY = (season) => `vfbulm.einsatzCenter.draftAutosave.${season}`;
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
if (startIdx === -1 || endIdx === -1) {
  console.log('FAIL Einsatz-Center-Bereich in index.html nicht gefunden');
  process.exit(1);
}
const region = html.slice(startIdx, endIdx + END.length);
const realRegistry = JSON.parse(await readFile(path.join(REPO_ROOT, 'lineup-data', 'groups.json'), 'utf8'));
const REG_GROUP_ID = realRegistry.groups[0].groupId;

function syntheticGame(gameId, playerIds = []) {
  return { gameId, roster: { field: [...playerIds], goalies: [] }, groups: [], confirmedCombinations: [], note: '' };
}
function syntheticSeason(seasonKey, ids) {
  return { schemaVersion: 1, season: seasonKey, games: ids.map((id) => syntheticGame(id, [`api:${id}`])) };
}

function makeStorage({ failSet = false, failGet = false, failRemove = false } = {}) {
  const m = new Map();
  const s = {
    m,
    setCalls: 0,
    removeCalls: 0,
    getItem(k) {
      if (failGet) throw new Error('getItem blockiert');
      return m.has(k) ? m.get(k) : null;
    },
    setItem(k, v) {
      s.setCalls++;
      if (failSet) throw new Error('QuotaExceededError');
      m.set(k, String(v));
    },
    removeItem(k) {
      s.removeCalls++;
      if (failRemove) throw new Error('removeItem blockiert');
      m.delete(k);
    },
  };
  return s;
}

/** Frischer vm-Kontext ("App-Start"). storageMode: 'fake' | 'undefined' | 'throwing-getter'. */
function boot({ lineup = { '25/26': syntheticSeason('25/26', [1, 2, 3]) }, registry = realRegistry, storage = makeStorage(), storageMode = 'fake', confirmAnswer = true } = {}) {
  const S = { einsatzCenterSeasonKey: '25/26', einsatzCenterComboSelection: [] };
  const SEASONS = {};
  for (const k of SEASON_KEYS) SEASONS[k] = { data: { rawGames: [{ id: 1, date: '2026-01-01', home_team_name: 'VfB Ulm', guest_team_name: 'X' }] } };
  const inputs = {};
  const patches = [];
  const win = {};
  if (storageMode === 'fake') win.localStorage = storage;
  else if (storageMode === 'throwing-getter') Object.defineProperty(win, 'localStorage', { get() { throw new Error('SecurityError'); } });
  win.confirm = () => confirmAnswer;
  const ctx = vm.createContext({
    window: win,
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
    setState: (p) => { patches.push(p); },
    alert: () => {},
    document: { getElementById: (id) => ({ value: inputs[id] ?? '' }) },
    escHtml: (s) => String(s),
    escAttr: (s) => String(s),
    detectUlmSide: () => 'home',
    __lineup: clone(lineup),
    __registry: clone(registry),
  });
  vm.runInContext(region, ctx);
  vm.runInContext('for(const k of Object.keys(__lineup))LINEUP_DATA[k]=__lineup[k];LINEUP_GROUPS_REGISTRY=__registry;', ctx);
  const run = (code) => vm.runInContext(code, ctx);
  return { ctx, run, S, storage, inputs, patches, win, rawJson: () => run('JSON.stringify([LINEUP_DATA,LINEUP_GROUPS_REGISTRY])') };
}

/** Führt eine breite Folge bestehender Draft-Mutationen aus (Kern der Autosave-Tests). */
function mutateEverything(app, { onStep } = {}) {
  const { run, S, inputs } = app;
  const step = (label, code) => { run(code); onStep?.(label); };
  step('note', `window.setEinsatzCenterGameNote(2,'Notiz A')`);
  step('roster-add', `window.addEinsatzCenterRosterPlayer(2,'field','api:900')`);
  step('roster-add-goalie', `window.addEinsatzCenterRosterPlayer(2,'goalies','api:901')`);
  step('group-existing', `window.addEinsatzCenterExistingGroup(2,'${REG_GROUP_ID}')`);
  inputs['ec-new-group-name-3'] = 'Neue Reihe';
  inputs['ec-new-group-type-3'] = 'custom';
  step('group-new', `window.addEinsatzCenterNewGroup(3)`);
  step('group-rename', `window.renameEinsatzCenterGroup(2,'${REG_GROUP_ID}','Umbenannt')`);
  step('group-player', `window.addEinsatzCenterGroupPlayer(2,'${REG_GROUP_ID}','api:900')`);
  step('group-player-position', `window.setEinsatzCenterGroupPlayerPosition(2,'${REG_GROUP_ID}','api:900','LW')`);
  S.einsatzCenterComboSelection = ['api:2', 'api:900', 'api:901'];
  inputs['ec-combo-group-2'] = REG_GROUP_ID;
  step('combo-confirm', `window.confirmEinsatzCenterCombo(2)`);
  step('roster-remove', `window.removeEinsatzCenterRosterPlayer(2,'goalies','api:901')`);
}

// ── A ──────────────────────────────────────────────────────────────────
console.log('== A: Storage nicht verfügbar -> Draft funktioniert unverändert weiter ==');
for (const mode of ['undefined', 'throwing-getter']) {
  const app = boot({ storageMode: mode });
  let threw = null;
  try {
    await app.run(`ensureEinsatzCenterDraft('25/26')`);
    mutateEverything(app);
    const status = await app.run(`einsatzCenterInspectAutosave('25/26')`);
    assertEqual(status.kind, 'none', `[${mode}] Inspect ohne Storage -> none`);
    app.run('window.cancelEinsatzCenterEdit()');
  } catch (e) {
    threw = e;
  }
  assertEqual(threw && String(threw.message), null, `[${mode}] kein Fehler/App-Abbruch bei Mutationen, Inspect und Verwerfen`);
}
{
  const app = boot({ storageMode: 'undefined' });
  await app.run(`ensureEinsatzCenterDraft('25/26')`);
  mutateEverything(app);
  assertEqual(app.run('EINSATZ_CENTER_DRAFT.games.get(2).note'), 'Notiz A', 'Runtime-Draft trägt die Mutationen (Notiz)');
  assertEqual(app.run('EINSATZ_CENTER_DRAFT.games.get(2).roster.field.includes("api:900")'), true, 'Runtime-Draft trägt die Mutationen (Spieler)');
  assertEqual(app.run('EINSATZ_CENTER_AUTOSAVE_INFO.state'), 'failed', 'Autosave-Info meldet "failed"');
  assertTrue(app.run('rEinsatzCenterEditPage()').includes('Browser-Speicher nicht verfügbar'), 'Entwurfs-Seite weist verständlich auf fehlenden Speicher hin');
}

// ── B ──────────────────────────────────────────────────────────────────
console.log('');
console.log('== B: Storage wirft beim Schreiben (Quota) ==');
{
  const storage = makeStorage({ failSet: true });
  const app = boot({ storage });
  let threw = null;
  try {
    await app.run(`ensureEinsatzCenterDraft('25/26')`);
    mutateEverything(app);
  } catch (e) { threw = e; }
  assertEqual(threw && String(threw.message), null, 'kein Fehler/App-Abbruch');
  assertTrue(storage.setCalls > 0, 'Schreibversuche fanden statt');
  assertEqual(storage.m.size, 0, 'nichts im Storage');
  assertEqual(app.run('EINSATZ_CENTER_DRAFT.games.get(2).note'), 'Notiz A', 'Runtime-Draft bleibt korrekt (Notiz)');
  assertEqual(app.run('EINSATZ_CENTER_DRAFT.newGroups.size'), 1, 'Runtime-Draft bleibt korrekt (neue Gruppe)');
  assertEqual(app.run('EINSATZ_CENTER_AUTOSAVE_INFO.state'), 'failed', 'Autosave-Info meldet "failed"');
  assertEqual(app.run('EINSATZ_CENTER_AUTOSAVE_OWNER'), null, 'kein Besitz eines Eintrags nach fehlgeschlagenem Schreiben');
  const withBrokenGet = boot({ storage: makeStorage({ failGet: true, failSet: true, failRemove: true }) });
  await withBrokenGet.run(`ensureEinsatzCenterDraft('25/26')`);
  mutateEverything(withBrokenGet);
  withBrokenGet.run('window.cancelEinsatzCenterEdit()');
  assertEqual(withBrokenGet.run('EINSATZ_CENTER_DRAFT'), null, 'auch bei komplett blockiertem Storage: Verwerfen funktioniert');
}

// ── H / I / J / K — Session 1 schreibt, Reload liest ────────────────────
console.log('');
console.log('== H/I/J/K: Autosave nach mehreren Mutationen (Speicherstand == aktueller Draft) ==');
const storage1 = makeStorage();
const s1 = boot({ storage: storage1 });
const rawBefore = s1.rawJson();
await s1.run(`ensureEinsatzCenterDraft('25/26')`);
const expectedRawHash = await computeBaseHash(syntheticSeason('25/26', [1, 2, 3]), realRegistry);
const stepChecks = [];
mutateEverything(s1, {
  onStep: (label) => {
    const stored = storage1.getItem(KEY('25/26'));
    const same = stored !== null && JSON.stringify(JSON.parse(stored).draft) === s1.run('JSON.stringify(einsatzCenterSerializeDraft(EINSATZ_CENTER_DRAFT).draft)');
    stepChecks.push([label, same]);
  },
});
assertEqual(stepChecks.filter(([, ok]) => !ok).map(([l]) => l), [], `Speicherstand == aktueller Draft nach jeder der ${stepChecks.length} verschiedenen Mutationen`);
assertEqual(stepChecks.map(([l]) => l), ['note', 'roster-add', 'roster-add-goalie', 'group-existing', 'group-new', 'group-rename', 'group-player', 'group-player-position', 'combo-confirm', 'roster-remove'], 'alle Mutationsarten (Notiz, Spieler, bestehende/neue Gruppe, Umbenennen, Gruppenspieler, Position, Kombination, Entfernen) wurden geprüft');
// removeGroup / removeGroupPlayer / removeCombo ebenfalls
s1.run(`window.removeEinsatzCenterGroupPlayer(2,'${REG_GROUP_ID}','api:900')`);
s1.run(`window.removeEinsatzCenterCombo(2,0)`);
s1.run(`window.removeEinsatzCenterGroup(2,'${REG_GROUP_ID}')`);
assertEqual(JSON.stringify(JSON.parse(storage1.getItem(KEY('25/26'))).draft), s1.run('JSON.stringify(einsatzCenterSerializeDraft(EINSATZ_CENTER_DRAFT).draft)'), 'auch nach removeGroupPlayer/removeCombo/removeGroup entspricht der Speicherstand dem Draft');
assertEqual(s1.run('EINSATZ_CENTER_AUTOSAVE_INFO.state'), 'saved', 'Info: saved');
assertEqual([...storage1.m.keys()], [KEY('25/26')], 'genau ein klar benannter Schlüssel, saisonspezifisch');

const record1 = JSON.parse(storage1.getItem(KEY('25/26')));
assertEqual(Object.keys(record1), ['version', 'seasonKey', 'baseHash', 'savedAt', 'draft'], 'Eintrag enthält version, seasonKey, baseHash, savedAt, draft');
assertEqual([record1.version, record1.seasonKey], [1, '25/26'], 'version 1, seasonKey passend');
assertTrue(!Number.isNaN(Date.parse(record1.savedAt)), 'savedAt ist ein gültiger Zeitstempel');
console.log('  -- I: Maps explizit serialisiert');
assertEqual(s1.run('JSON.stringify(new Map([[1,{a:1}]]))'), '{}', 'Kontrolle: JSON.stringify auf einer Map verliert den Inhalt (deshalb explizite Paarlisten)');
assertTrue(Array.isArray(record1.draft.games) && Array.isArray(record1.draft.newGroups) && Array.isArray(record1.draft.renamedGroups), 'games/newGroups/renamedGroups liegen als Paarlisten vor');
assertTrue(record1.draft.games.every((p) => Array.isArray(p) && p.length === 2 && Number.isInteger(p[0])), 'games: [gameId, Eintrag]-Paare');
assertEqual(record1.draft.games.map((p) => p[0]), [2, 3], 'games enthält genau die berührten Spiele (2, 3)');
assertEqual(record1.draft.newGroups.length, 1, 'newGroups enthält die neue Gruppe');
console.log('  -- J: baseHash bleibt der Raw-Hash');
assertEqual(record1.baseHash, expectedRawHash, 'gespeicherter baseHash == Node-computeBaseHash(Raw, Registry)');
assertEqual(s1.run('EINSATZ_CENTER_DRAFT.baseHash'), expectedRawHash, 'Runtime-baseHash unverändert der Raw-Hash');
assertTrue((await s1.run(`einsatzCenterComputeBaseHash(getEffectiveLineupData('25/26'),LINEUP_GROUPS_REGISTRY)`)) !== expectedRawHash, 'Kontrolle: Hash über den Effective-State wäre ein anderer Wert (nicht verwendet)');
assertEqual((await s1.run('window.buildEinsatzCenterDraftExport()')).baseHash, expectedRawHash, 'Export-baseHash unverändert der Raw-Hash');
console.log('  -- K: Autosave verändert LINEUP_DATA nicht');
assertEqual(s1.rawJson(), rawBefore, 'LINEUP_DATA und Registry nach allen Mutationen/Autosaves unverändert');

// ── C — Reload mit gültigem, passendem Eintrag ─────────────────────────
console.log('');
console.log('== C: gültiger Eintrag mit passendem baseHash -> erkannt, bewusst wiederherstellbar ==');
const draftJsonSession1 = s1.run('JSON.stringify(einsatzCenterSerializeDraft(EINSATZ_CENTER_DRAFT).draft)');
const effectiveSession1 = s1.run(`JSON.stringify(getEffectiveLineupData('25/26'))`);
const storage2 = makeStorage();
storage2.m.set(KEY('25/26'), storage1.getItem(KEY('25/26')));
const s2 = boot({ storage: storage2 });
const rawBefore2 = s2.rawJson();
assertEqual(s2.run('EINSATZ_CENTER_DRAFT'), null, 'nach "Reload" existiert zunächst kein Runtime-Draft (keine Auto-Wiederherstellung)');
const status2 = await s2.run(`einsatzCenterInspectAutosave('25/26')`);
assertEqual([status2.kind, status2.games, status2.newGroups, status2.renamedGroups], ['restorable', 2, 1, 1], 'Eintrag erkannt: restorable (2 Spiele, 1 neue, 1 umbenannte Gruppe)');
assertEqual(s2.run('EINSATZ_CENTER_DRAFT'), null, 'Erkennen allein stellt NICHT wieder her');
assertEqual(s2.rawJson(), rawBefore2, 'Erkennen verändert LINEUP_DATA nicht');
const banner = s2.run(`rEinsatzCenterAutosaveBanner('25/26')`);
assertTrue(banner.includes('data-ec-autosave="restorable"') && banner.includes('restoreEinsatzCenterAutosave()') && banner.includes('discardEinsatzCenterAutosave()'), 'Ansicht bietet Wiederherstellen und Verwerfen an');
assertEqual(s2.run(`rEinsatzCenterAutosaveBanner('24/25')`), '', 'kein Hinweis für eine andere Saison');
assertTrue(s2.run('rEinsatzCenterPage()').includes('data-ec-autosave="restorable"'), 'rEinsatzCenterPage bindet den Hinweis ein');
const restored = await s2.run('restoreEinsatzCenterAutosave()');
assertEqual(restored, true, 'Wiederherstellung (Nutzeraktion) erfolgreich');
assertEqual(s2.run('JSON.stringify(einsatzCenterSerializeDraft(EINSATZ_CENTER_DRAFT).draft)'), draftJsonSession1, 'wiederhergestellter Draft == ursprünglicher Draft (inhaltlich)');
assertTrue(s2.run('EINSATZ_CENTER_DRAFT.games instanceof Map && EINSATZ_CENTER_DRAFT.newGroups instanceof Map && EINSATZ_CENTER_DRAFT.renamedGroups instanceof Map'), 'I: Runtime-Struktur besteht wieder aus Maps');
assertEqual(s2.run(`JSON.stringify(getEffectiveLineupData('25/26'))`), effectiveSession1, 'Effective-State == Effective-State der ursprünglichen Session');
assertEqual(s2.run('EINSATZ_CENTER_DRAFT.baseHash'), expectedRawHash, 'wiederhergestellter baseHash == Raw-Hash');
assertEqual(s2.rawJson(), rawBefore2, 'Wiederherstellen verändert LINEUP_DATA nicht (K)');
assertEqual(s2.run('EINSATZ_CENTER_AUTOSAVE_OWNER'), '25/26', 'wiederhergestellter Draft besitzt den Eintrag');
assertEqual(s2.run('EINSATZ_CENTER_AUTOSAVE_STATUS.kind'), 'none', 'Entscheidung getroffen -> kein Hinweis mehr');
assertEqual(s2.patches.at(-1).einsatzCenterMode, 'edit', 'nach Wiederherstellung im Entwurfsmodus');
s2.run(`window.setEinsatzCenterGameNote(3,'nach Restore')`);
assertEqual(JSON.parse(storage2.getItem(KEY('25/26'))).draft.games.find((p) => p[0] === 3)[1].note, 'nach Restore', 'weitere Mutationen werden nach der Wiederherstellung wieder gesichert');

// ── D — passender Eintrag, aber baseHash passt nicht mehr ───────────────
console.log('');
console.log('== D: gültiger Eintrag, aber baseHash passt NICHT zum aktuellen Raw-Stand ==');
const changedRaw = { '25/26': syntheticSeason('25/26', [1, 2, 3, 4]) };
const storage3 = makeStorage();
storage3.m.set(KEY('25/26'), storage1.getItem(KEY('25/26')));
const storedBeforeD = storage3.getItem(KEY('25/26'));
const s3 = boot({ storage: storage3, lineup: changedRaw });
const rawBefore3 = s3.rawJson();
const status3 = await s3.run(`einsatzCenterInspectAutosave('25/26')`);
assertEqual(status3.kind, 'mismatch', 'Status: mismatch');
assertEqual(s3.run('EINSATZ_CENTER_DRAFT'), null, 'keine automatische Wiederherstellung');
assertEqual(s3.rawJson(), rawBefore3, 'Raw-State unverändert');
assertEqual(storage3.getItem(KEY('25/26')), storedBeforeD, 'gespeicherter Eintrag unangetastet (nicht gelöscht, nicht gemerged)');
const bannerD = s3.run(`rEinsatzCenterAutosaveBanner('25/26')`);
assertTrue(bannerD.includes('data-ec-autosave="mismatch"') && bannerD.includes('NICHT') && bannerD.includes('discardEinsatzCenterAutosave()') && !bannerD.includes('restoreEinsatzCenterAutosave()'), 'sichtbare Warnung mit Entscheidung "Verwerfen", ohne Wiederherstellen-Angebot');
assertEqual(await s3.run('restoreEinsatzCenterAutosave()'), false, 'Wiederherstellen wird bei mismatch verweigert');
assertEqual(s3.run('EINSATZ_CENTER_DRAFT'), null, 'auch der Versuch stellt nichts wieder her');
// neuer Draft während die Entscheidung offen ist: Autosave pausiert, fremder Eintrag bleibt
await s3.run(`ensureEinsatzCenterDraft('25/26')`);
s3.run(`window.setEinsatzCenterGameNote(2,'neuer Entwurf')`);
assertEqual(storage3.getItem(KEY('25/26')), storedBeforeD, 'ein neuer Entwurf überschreibt den unentschiedenen Eintrag NICHT');
assertEqual(s3.run('EINSATZ_CENTER_AUTOSAVE_INFO.state'), 'paused', 'Autosave-Info: paused');
assertTrue(s3.run('rEinsatzCenterEditPage()').includes('Autosave pausiert'), 'Entwurfs-Seite erklärt die Pause');
s3.run('window.cancelEinsatzCenterEdit()');
assertEqual(storage3.getItem(KEY('25/26')), storedBeforeD, 'Verwerfen des frischen Drafts löscht den fremden, unentschiedenen Eintrag nicht');
assertEqual(s3.rawJson(), rawBefore3, 'Raw-State nach dem ganzen Ablauf unverändert');
s3.run('discardEinsatzCenterAutosave()');
assertEqual(storage3.getItem(KEY('25/26')), null, 'erst die ausdrückliche Nutzerentscheidung "Verwerfen" entfernt den veralteten Eintrag');
assertEqual(s3.run(`rEinsatzCenterAutosaveBanner('25/26')`), '', 'danach kein Hinweis mehr');

// ── E / F — ungültige Einträge ──────────────────────────────────────────
console.log('');
console.log('== E/F: kaputtes JSON, falsche Struktur, unbekannte Version ==');
const good = JSON.parse(storage1.getItem(KEY('25/26')));
const mutate = (f) => { const r = clone(good); f(r); return JSON.stringify(r); };
const invalidCases = [
  ['E: kaputtes JSON', '{"version":1,"seasonKey":'],
  ['E: kein JSON-Objekt (Array)', '[]'],
  ['E: Leerstring', ''],
  ['F: unbekannte Version 2', mutate((r) => { r.version = 2; })],
  ['F: fehlende Version', mutate((r) => { delete r.version; })],
  ['E: seasonKey passt nicht zum Schlüssel', mutate((r) => { r.seasonKey = '24/25'; })],
  ['E: baseHash fehlt', mutate((r) => { delete r.baseHash; })],
  ['E: draft.games kein Array', mutate((r) => { r.draft.games = {}; })],
  ['E: Spiel ohne roster (würde die UI zum Absturz bringen)', mutate((r) => { delete r.draft.games[0][1].roster; })],
  ['E: gameId passt nicht zum Paar-Schlüssel', mutate((r) => { r.draft.games[0][1].gameId = 999; })],
  ['E: doppelte gameId', mutate((r) => { r.draft.games.push(clone(r.draft.games[0])); })],
  ['E: Gruppe ohne currentName', mutate((r) => { delete r.draft.newGroups[0][1].currentName; })],
];
for (const [label, text] of invalidCases) {
  const st = makeStorage();
  st.m.set(KEY('25/26'), text);
  const app = boot({ storage: st });
  const raw = app.rawJson();
  let threw = null;
  let status;
  try { status = await app.run(`einsatzCenterInspectAutosave('25/26')`); } catch (e) { threw = e; }
  assertEqual([threw && String(threw.message), status?.kind], [null, 'none'], `${label}: ignoriert, App funktionsfähig (kein Fehler, kein Hinweis)`);
  assertEqual(app.run('EINSATZ_CENTER_DRAFT'), null, `${label}: nicht blind importiert`);
  assertEqual(app.rawJson(), raw, `${label}: keine Datenüberschreibung (LINEUP_DATA unverändert)`);
  assertEqual(st.getItem(KEY('25/26')), null, `${label}: ungültiger Eintrag sicher entfernt`);
  assertEqual(await app.run('restoreEinsatzCenterAutosave()'), false, `${label}: Wiederherstellen ohne gültigen Eintrag ist ein No-op`);
  // App bleibt voll funktionsfähig: normaler Draft + Autosave danach
  await app.run(`ensureEinsatzCenterDraft('25/26')`);
  app.run(`window.setEinsatzCenterGameNote(2,'ok')`);
  assertEqual(JSON.parse(st.getItem(KEY('25/26'))).draft.games[0][1].note, 'ok', `${label}: danach normaler Autosave möglich`);
}

// ── G — Verwerfen ──────────────────────────────────────────────────────
console.log('');
console.log('== G: Draft verwerfen entfernt Runtime-Draft UND Autosave ==');
{
  const st = makeStorage();
  const app = boot({ storage: st });
  const raw = app.rawJson();
  await app.run(`ensureEinsatzCenterDraft('25/26')`);
  app.run(`window.setEinsatzCenterGameNote(2,'weg damit')`);
  assertTrue(st.getItem(KEY('25/26')) !== null, 'Vorbedingung: Autosave-Eintrag existiert');
  app.run('window.cancelEinsatzCenterEdit()');
  assertEqual(app.run('EINSATZ_CENTER_DRAFT'), null, 'Runtime-Draft entfernt');
  assertEqual(st.getItem(KEY('25/26')), null, 'Autosave-Eintrag entfernt');
  assertEqual(app.run('EINSATZ_CENTER_AUTOSAVE_OWNER'), null, 'kein Besitz mehr');
  assertEqual(app.rawJson(), raw, 'Raw-State unverändert');
  assertTrue(app.run(`getEffectiveLineupData('25/26')===LINEUP_DATA['25/26']`), 'Effective == Raw nach Verwerfen');
  assertEqual(app.patches.at(-1).einsatzCenterMode, 'view', 'zurück in die Ansicht (bisheriges Verhalten)');
  // "Reload" nach Verwerfen: nichts mehr zu erkennen
  const app2 = boot({ storage: st });
  assertEqual((await app2.run(`einsatzCenterInspectAutosave('25/26')`)).kind, 'none', 'nach Reload wird nichts mehr angeboten');
  // Wiederhergestellter Draft wird ebenfalls samt Eintrag verworfen
  assertEqual(s2.run('EINSATZ_CENTER_AUTOSAVE_OWNER'), '25/26', 'Vorbedingung: wiederhergestellter Draft besitzt Eintrag');
  s2.run('window.cancelEinsatzCenterEdit()');
  assertEqual([s2.run('EINSATZ_CENTER_DRAFT'), storage2.getItem(KEY('25/26'))], [null, null], 'wiederhergestellter Draft: Verwerfen entfernt Draft und Eintrag');
  assertEqual(s2.rawJson(), rawBefore2, 'Raw-State auch nach Restore+Verwerfen unverändert');
}

// ── L — leerer / No-op-Draft ───────────────────────────────────────────
console.log('');
console.log('== L: leerer Draft == Raw-State, kein Autosave ==');
{
  const st = makeStorage();
  const app = boot({ storage: st });
  await app.run(`ensureEinsatzCenterDraft('25/26')`);
  assertEqual(app.run('einsatzCenterDraftIsEmpty(EINSATZ_CENTER_DRAFT)'), true, 'frischer Draft gilt als leer');
  app.run('einsatzCenterAutosaveDraft()');
  assertEqual([st.setCalls, st.m.size], [0, 0], 'leerer Draft: kein Speicherzugriff, kein Eintrag');
  assertTrue(app.run(`getEffectiveLineupData('25/26')===LINEUP_DATA['25/26']`), 'leerer Draft: Effective referenzgleich zum Raw-State');
  app.run(`window.selectEinsatzCenterEditGame(2)`);
  assertEqual([st.setCalls, st.m.size], [0, 0], 'reines Auswählen eines Spiels (Gerüst ohne Änderung) erzeugt keinen Eintrag');
  app.run(`window.setEinsatzCenterGameNote(2,'x')`);
  assertEqual(st.m.size, 1, 'erst eine echte Mutation erzeugt den Eintrag');
  assertTrue(app.run('rEinsatzCenterEditPage()').includes('Wird automatisch im Browser-Speicher gesichert'), 'Entwurfs-Seite meldet die Sicherung');
  const app2 = boot({ storage: makeStorage() });
  await app2.run(`ensureEinsatzCenterDraft('25/26')`);
  assertTrue(app2.run('rEinsatzCenterEditPage()').includes('Noch keine Änderungen'), 'leerer Draft: Hinweis "Noch keine Änderungen"');
  assertEqual(await computeBaseHash(syntheticSeason('25/26', [1, 2, 3]), realRegistry), app2.run('EINSATZ_CENTER_DRAFT.baseHash'), 'leerer Draft trägt den Raw-Hash');
  // saisonübergreifend: Einträge verschiedener Saisons überschreiben sich nicht
  const st2 = makeStorage();
  const app3 = boot({ storage: st2, lineup: { '25/26': syntheticSeason('25/26', [1, 2, 3]), '24/25': syntheticSeason('24/25', [7]) } });
  await app3.run(`ensureEinsatzCenterDraft('25/26')`);
  app3.run(`window.setEinsatzCenterGameNote(2,'A')`);
  const recA = st2.getItem(KEY('25/26'));
  await app3.run(`ensureEinsatzCenterDraft('24/25')`);
  app3.run(`window.setEinsatzCenterGameNote(7,'B')`);
  assertEqual([st2.getItem(KEY('25/26')), st2.m.size], [recA, 2], 'Draft einer anderen Saison überschreibt den Eintrag der ersten Saison nicht (getrennte Schlüssel)');
  app3.run('window.cancelEinsatzCenterEdit()');
  assertEqual([st2.getItem(KEY('25/26')), st2.getItem(KEY('24/25'))], [recA, null], 'Verwerfen entfernt nur den Eintrag der verworfenen Saison');
}

// ── Zusatz: Bestätigung beim Ersetzen eines laufenden Drafts ────────────
console.log('');
console.log('== Zusatz: Wiederherstellen ersetzt keinen laufenden, nicht leeren Draft ohne Bestätigung ==');
for (const answer of [false, true]) {
  const st = makeStorage();
  st.m.set(KEY('25/26'), storage1.getItem(KEY('25/26')));
  const app = boot({ storage: st, confirmAnswer: answer });
  await app.run(`einsatzCenterInspectAutosave('25/26')`);
  await app.run(`ensureEinsatzCenterDraft('25/26')`);
  app.run(`window.setEinsatzCenterGameNote(1,'laufend')`);
  const ok = await app.run('restoreEinsatzCenterAutosave()');
  assertEqual(ok, answer, `confirm=${answer}: Wiederherstellung ${answer ? 'wird ausgeführt' : 'wird abgelehnt'}`);
  assertEqual(app.run('EINSATZ_CENTER_DRAFT.games.has(1)'), !answer, `confirm=${answer}: laufender Draft ${answer ? 'ersetzt' : 'bleibt erhalten'}`);
}

// ── Statische Prüfungen ────────────────────────────────────────────────
console.log('');
console.log('== Statisch: Kapselung, Verdrahtung, Einstiegspunkte ==');
function blockSource(startRe) {
  const m = startRe.exec(region);
  if (!m) return null;
  const end = region.indexOf('\n}', m.index);
  return region.slice(m.index, end + 2);
}
const mutators = ['addEinsatzCenterRosterPlayer', 'removeEinsatzCenterRosterPlayer', 'addEinsatzCenterExistingGroup', 'addEinsatzCenterNewGroup', 'removeEinsatzCenterGroup', 'renameEinsatzCenterGroup', 'addEinsatzCenterGroupPlayer', 'removeEinsatzCenterGroupPlayer', 'setEinsatzCenterGroupPlayerPosition', 'confirmEinsatzCenterCombo', 'removeEinsatzCenterCombo', 'setEinsatzCenterGameNote'];
for (const name of mutators) {
  const src = blockSource(new RegExp(`window\\.${name}=`));
  const wiredBeforeSetState = src && /einsatzCenterAutosaveDraft\(\);\s*\n\s*setState\(/.test(src.replace(/\r/g, ''));
  assertTrue(wiredBeforeSetState, `${name}: Autosave direkt vor setState (nach der Runtime-Mutation)`);
}
{
  const storageLines = region.split('\n').filter((l) => /localStorage|sessionStorage|indexedDB/.test(l) && !l.trim().startsWith('//'));
  assertEqual(storageLines.length, 3, 'Browser-Speicher wird ausschließlich in den drei Kapsel-Funktionen (read/write/remove) angesprochen');
  for (const fn of ['einsatzCenterStorageRead', 'einsatzCenterStorageWrite', 'einsatzCenterStorageRemove']) {
    const src = blockSource(new RegExp(`function ${fn}\\(`));
    assertTrue(src && /try\{/.test(src) && /catch\(/.test(src), `${fn} ist mit try/catch gekapselt`);
  }
  const wholeHtmlStorage = html.split('\n').filter((l) => /(local|session)Storage|indexedDB/.test(l) && !l.trim().startsWith('//'));
  assertEqual(wholeHtmlStorage.length, 3, 'in der gesamten index.html gibt es keine weitere Storage-Nutzung');
  for (const name of ['openEinsatzCenter', 'setEinsatzCenterSeason']) {
    const src = blockSource(new RegExp(`window\\.${name}=`));
    assertTrue(src && src.includes('einsatzCenterInspectAutosave('), `${name} prüft beim Einstieg einen vorhandenen Autosave`);
  }
  const cancelSrc = blockSource(/window\.cancelEinsatzCenterEdit=/);
  assertTrue(cancelSrc.includes('einsatzCenterStorageRemove('), 'cancelEinsatzCenterEdit entfernt den Autosave-Eintrag');
  const ensureSrc = blockSource(/async function ensureEinsatzCenterDraft\(/);
  assertEqual(/EINSATZ_CENTER_DRAFT\.baseHash|einsatzCenterCurrentRawBaseHash/.test(ensureSrc), false, 'ensureEinsatzCenterDraft: baseHash-Snapshot-Logik unverändert (kein Bezug zu Autosave-Hash)');
}

console.log('');
if (failures > 0) {
  console.log(`${failures} Test(s) fehlgeschlagen.`);
  process.exitCode = 1;
} else {
  console.log('Alle Tests erfolgreich.');
  process.exitCode = 0;
}

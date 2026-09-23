#!/usr/bin/env node
// P0c.6 — Test für Kennzeichnung und Umschaltbarkeit der zusammengeführten Sicht
// (Spezifikation 3.6.5, Punkt 2).
//
// Wie test-p0c2/p0c3: der Einsatz-Center-Bereich von index.html
// ("const LINEUP_DATA={};" bis "window.einsatzCenterSoftIssues=…") wird
// unverändert aus dem echten Text geschnitten und in node:vm mit minimalen Stubs
// ausgeführt — mit dem echten Draft, den echten Mutatoren, dem echten Autosave
// und den echten Renderern. localStorage ist ein Fake mit Zähler. setState wendet
// den Patch auf S an (nötig für den Wechsel Edit <-> View).
// Liest index.html/lineup-data nur lesend, schreibt nichts.
//
// Aufruf: node scripts/test-p0c6-merged-view-marking.mjs

import { readFile } from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';

import { computeBaseHash } from './lineup-data-hash.mjs';

const REPO_ROOT = path.resolve(import.meta.dirname, '..');
const SEASON_KEYS = ['21/22', '22/23', '23/24', '24/25', '25/26'];
const MARK = 'Entwurf – noch nicht importiert';
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

const html = (await readFile(path.join(REPO_ROOT, 'index.html'), 'utf8')).replace(/\r\n/g, '\n');
function between(startMarker, endMarker) {
  const s = html.indexOf(startMarker);
  const e = html.indexOf(endMarker);
  if (s === -1 || e === -1 || html.indexOf(startMarker, s + 1) !== -1) throw new Error(`Marker nicht eindeutig: ${startMarker}`);
  return html.slice(s, e + endMarker.length);
}
const region = between('const LINEUP_DATA={};', 'window.einsatzCenterSoftIssues=einsatzCenterSoftIssues;');
const previewBlock = between('// ═══ Season-Daten-Vorschau (P0c.4', '// ═══ Ende Season-Daten-Vorschau (P0c.4)');
function fnSource(name, src = region) {
  const m = new RegExp(`(^|\\n)(async )?function ${name}\\(`).exec(src);
  if (!m) throw new Error(`Funktion nicht gefunden: ${name}`);
  const from = m.index + m[1].length;
  return src.slice(from, src.indexOf('\n}', from) + 2);
}
const stripComments = (s) => s.split('\n').filter((l) => !l.trim().startsWith('//') && !l.trim().startsWith('*') && !l.trim().startsWith('/*')).join('\n');

const realRegistry = JSON.parse(await readFile(path.join(REPO_ROOT, 'lineup-data', 'groups.json'), 'utf8'));
const REG_GROUP_ID = realRegistry.groups[0].groupId;
const REG_GROUP_NAME = realRegistry.groups[0].currentName;

function syntheticGame(gameId, playerIds = []) {
  return { gameId, roster: { field: [...playerIds], goalies: [] }, groups: [], confirmedCombinations: [], note: '' };
}
const syntheticSeason = (seasonKey, ids) => ({ schemaVersion: 1, season: seasonKey, games: ids.map((id) => syntheticGame(id, [`api:${id}`])) });

function makeStorage() {
  const m = new Map();
  const s = {
    m, getCalls: 0, setCalls: 0, removeCalls: 0,
    getItem(k) { s.getCalls++; return m.has(k) ? m.get(k) : null; },
    setItem(k, v) { s.setCalls++; m.set(k, String(v)); },
    removeItem(k) { s.removeCalls++; m.delete(k); },
  };
  return s;
}

/** Frischer vm-Kontext ("App-Start"). */
function boot({ lineup = { '25/26': syntheticSeason('25/26', [1, 2, 3]) }, storage = makeStorage(), seasonLabels = {} } = {}) {
  const S = { einsatzCenterSeasonKey: '25/26', einsatzCenterMode: 'view', einsatzCenterEditingGameId: null, einsatzCenterComboSelection: [] };
  const patches = [];
  const inputs = {};
  const SEASONS = {};
  for (const k of SEASON_KEYS) SEASONS[k] = { data: { rawGames: [] } };
  const ctx = vm.createContext({
    window: { localStorage: storage, confirm: () => true },
    S,
    SEASONS,
    PLAYER_REGISTRY: { players: {} },
    SEASON_CONFIG: Object.fromEntries(SEASON_KEYS.map((k) => [k, { label: seasonLabels[k] ?? k }])),
    CURRENT_SEASON_KEY: '25/26',
    structuredClone,
    TextEncoder,
    crypto: globalThis.crypto,
    fetch: () => Promise.reject(new Error('kein Netzwerk im Test')),
    console,
    setState: (p) => { patches.push(p); Object.assign(S, p); },
    alert: () => {},
    document: { getElementById: (id) => ({ value: inputs[id] ?? '' }) },
    escHtml: (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'),
    escAttr: (s) => String(s).replace(/"/g, '&quot;').replace(/'/g, '&#39;'),
    detectUlmSide: () => 'home',
    __lineup: clone(lineup),
    __registry: clone(realRegistry),
  });
  vm.runInContext(region, ctx);
  vm.runInContext('for(const k of Object.keys(__lineup))LINEUP_DATA[k]=__lineup[k];LINEUP_GROUPS_REGISTRY=__registry;', ctx);
  const run = (code) => vm.runInContext(code, ctx);
  return { ctx, run, S, storage, patches, inputs, rawJson: () => run('JSON.stringify([LINEUP_DATA,LINEUP_GROUPS_REGISTRY])'), page: () => run('rEinsatzCenterPage()'), edit: () => run('rEinsatzCenterEditPage()') };
}

/** Draft mit einer Änderung an einem bestehenden Spiel (2), einem neuen Spiel (9999) und einer neuen Gruppe samt bestätigter Kombination. */
async function buildDraft(app) {
  await app.run(`ensureEinsatzCenterDraft('25/26')`);
  app.run(`window.setEinsatzCenterGameNote(2,'Entwurfsnotiz')`);
  app.run(`window.addEinsatzCenterRosterPlayer(9999,'field','api:900')`);
  app.inputs['ec-new-group-name-9999'] = 'Neue Reihe';
  app.inputs['ec-new-group-type-9999'] = 'custom';
  app.run(`window.addEinsatzCenterNewGroup(9999)`);
  const newGroupId = app.run('[...EINSATZ_CENTER_DRAFT.newGroups.keys()][0]');
  app.S.einsatzCenterComboSelection = ['api:900', 'api:1', 'api:2'];
  app.inputs['ec-combo-group-9999'] = newGroupId;
  app.run(`window.confirmEinsatzCenterCombo(9999)`);
  return newGroupId;
}
const cardsOf = (page) => page.split('<div class="mc-card">').slice(1);
const cardFor = (page, id) => cardsOf(page).find((c) => new RegExp(`Spiel-ID ${id}(?![0-9])`).test(c)) ?? null;
const markCount = (s) => (s.match(/data-ec-draft-mark/g) || []).length;

// ── Herkunft / Kennzeichnung ───────────────────────────────────────────
console.log('== Herkunft und Kennzeichnung ==');
{
  const none = boot();
  const basePage = none.page();
  assertTrue(!basePage.includes('data-ec-draft') && !basePage.includes(MARK) && !basePage.includes('enthält'), 'ohne Draft: keine Kennzeichnung, kein Banner, kein Statistik-Hinweis');

  const app = boot();
  const newGroupId = await buildDraft(app);
  const page = app.page();
  assertEqual(app.run(`isEinsatzCenterGameFromDraft('25/26',2)`), true, 'Herkunft: Spiel 2 (im Draft geändert) stammt aus dem Draft');
  assertEqual(app.run(`isEinsatzCenterGameFromDraft('25/26',9999)`), true, 'Herkunft: Spiel 9999 (nur im Draft) stammt aus dem Draft');
  assertEqual([app.run(`isEinsatzCenterGameFromDraft('25/26',1)`), app.run(`isEinsatzCenterGameFromDraft('25/26','1')`), app.run(`isEinsatzCenterGameFromDraft('24/25',2)`), app.run(`isEinsatzCenterGameFromDraft('25/26',null)`)], [false, false, false, false], 'Herkunft: Raw-Spiel, andere Saison, ungültige ID -> false');
  assertTrue(cardFor(page, 2)?.includes('data-ec-draft-mark') && cardFor(page, 9999)?.includes('data-ec-draft-mark'), 'Draft-Spiele (2 und 9999) sind gekennzeichnet');
  assertTrue(!cardFor(page, 1)?.includes('data-ec-draft') && !cardFor(page, 3)?.includes('data-ec-draft'), 'Produktionsspiele (1 und 3) haben keine Kennzeichnung');
  assertEqual(markCount(page), 2, 'genau zwei Kennzeichnungen in der Sicht');
  assertEqual(cardsOf(page).length, 5, 'Sicht zeigt 3 Produktionsspiele + neues Draft-Spiel + Statistikkarte');
  const markText = /data-ec-draft-mark[^>]*>([^<]*)</.exec(page)?.[1];
  assertEqual(markText, MARK, 'exakter Kennzeichnungstext "Entwurf – noch nicht importiert" (mit Gedankenstrich U+2013)');
  assertEqual(markText.charCodeAt(8), 0x2013, 'Gedankenstrich ist U+2013 (kein Bindestrich)');
  // leerer Draft
  const empty = boot();
  await empty.run(`ensureEinsatzCenterDraft('25/26')`);
  assertEqual(empty.page(), basePage, 'leerer Draft: Sicht byte-identisch zur Sicht ohne Draft (keine Kennzeichnung, kein Banner)');
  // Draft mit Inhalt, aber ohne Spiele (nur neue Gruppe): Banner ja, Kennzeichnungen nein
  const groupsOnly = boot();
  await groupsOnly.run(`ensureEinsatzCenterDraft('25/26')`);
  groupsOnly.ctx.__c = 'x';
  groupsOnly.run(`EINSATZ_CENTER_DRAFT.newGroups.set('g-1',{groupId:'g-1',currentName:'Nur Gruppe',createdInSeason:'25/26',createdInGame:1,nameHistory:[]})`);
  const gp = groupsOnly.page();
  assertTrue(gp.includes('data-ec-draft-banner') && markCount(gp) === 0 && !gp.includes('data-ec-draft-stats'), 'Draft nur mit Gruppe: Banner sichtbar, aber keine Spiel-Kennzeichnung und kein Statistik-Hinweis');
  // Draft einer anderen Saison
  const other = boot({ lineup: { '25/26': syntheticSeason('25/26', [1, 2, 3]), '24/25': syntheticSeason('24/25', [7]) } });
  await other.run(`ensureEinsatzCenterDraft('24/25')`);
  other.run(`window.setEinsatzCenterGameNote(7,'andere Saison')`);
  assertEqual(other.page(), basePage, 'Draft einer anderen Saison: Sicht der Saison 25/26 byte-identisch zur Sicht ohne Draft');
  // Neutrale Kennzeichnung für Entwurfs-Gruppen (D2), keine Registry-Überlagerung
  assertEqual(app.run(`lineupGroupDisplayName('${newGroupId}')`), 'neue Gruppe im Entwurf', 'Statistik: neue Draft-Gruppe wird neutral als "neue Gruppe im Entwurf" bezeichnet');
  assertEqual(app.run(`lineupGroupDisplayName('${REG_GROUP_ID}')`), REG_GROUP_NAME, 'registrierte Gruppe: unverändert der Registry-Name');
  assertEqual(app.run(`lineupGroupDisplayName('unbekannte-id')`), 'Unbekannte Gruppe (unbekannte-id)', 'unbekannte, nicht im Draft stehende Gruppe: unveränderter Text');
  assertTrue(page.includes('neue Gruppe im Entwurf') && !page.includes('nicht in groups.json registriert'), 'Karte: Draft-Gruppe ohne irreführenden Registry-Hinweis');
  app.run(`window.renameEinsatzCenterGroup(2,'${REG_GROUP_ID}','Umbenannt im Entwurf')`);
  assertEqual(app.run(`lineupGroupDisplayName('${REG_GROUP_ID}')`), REG_GROUP_NAME, 'keine Registry-Überlagerung: umbenannte Gruppe zeigt weiter den importierten Registry-Namen');
  assertEqual(app.run('JSON.stringify(LINEUP_GROUPS_REGISTRY)'), JSON.stringify(realRegistry), 'Registry unverändert');
  // HTML-Escaping der eigenen Ausgabe
  const evil = boot({ seasonLabels: { '25/26': '<img src=x onerror=alert(1)>"&' } });
  await buildDraft(evil);
  const banner = /<div class="wrn-box" data-ec-draft-banner>[^]*?<\/label>/.exec(evil.page())?.[0] ?? '';
  assertTrue(banner && !banner.includes('<img') && banner.includes('&lt;img src=x onerror=alert(1)&gt;&quot;&amp;'), 'Saison-Label im Banner ist escaped');
  const evilGame = boot();
  await evilGame.run(`ensureEinsatzCenterDraft('25/26')`);
  evilGame.run(`window.setEinsatzCenterGameNote(2,'<b onclick=x>fett</b>')`);
  assertTrue(!evilGame.page().includes('<b onclick=x>') && evilGame.page().includes('&lt;b onclick=x&gt;'), 'Entwurfsnotiz in der Karte bleibt escaped');
}

// ── Statistik-Hinweis ─────────────────────────────────────────────────
console.log('');
console.log('== Statistik: "enthält N Spiel(e) aus dem Entwurf" ==');
{
  const app = boot();
  await buildDraft(app);
  const page = app.page();
  const hint = /data-ec-draft-stats[^>]*>([^<]*)</.exec(page)?.[1];
  assertEqual(hint, 'enthält 2 Spiel(e) aus dem Entwurf', 'Hinweis nennt die Anzahl der Entwurfsspiele (2)');
  assertEqual(app.run(`computeEinsatzCenterStats('25/26').gamesCounted`), 4, 'Statistik zählt 3 Produktions- + 1 neues Entwurfsspiel');
  assertTrue(!(boot().page()).includes('data-ec-draft-stats'), 'ohne Draft kein Hinweis');
}

// ── Schalter ───────────────────────────────────────────────────────────
console.log('');
console.log('== Globaler Schalter ==');
{
  const raw = boot();
  const rawPage = raw.page();
  const rawStats = JSON.stringify(raw.run(`computeEinsatzCenterStats('25/26')`));

  const app = boot();
  await buildDraft(app);
  assertEqual(app.run('EINSATZ_CENTER_DRAFT_EXCLUDED'), null, 'Standard: Entwurf wird einbezogen (kein Draft ausgeblendet)');
  assertTrue(app.run(`getEffectiveLineupData('25/26')!==LINEUP_DATA['25/26']`), 'Standard EIN: Effective ist die zusammengeführte Sicht (neues Objekt)');
  assertEqual(app.run(`getEffectiveLineupData('25/26').games.map(g=>g.gameId)`), [1, 2, 3, 9999], 'Standard EIN: 1, 2 (Draft), 3, 9999 (nur Draft)');
  const pageOn = app.page();
  const statsOn = JSON.stringify(app.run(`computeEinsatzCenterStats('25/26')`));
  const banner = /<div class="wrn-box" data-ec-draft-banner>[^]*?<\/button><\/div><\/div>/.exec(pageOn)?.[0] ?? '';
  assertTrue(banner.includes('ENTWURF AKTIV') && banner.includes('type="checkbox" checked') && banner.includes('Zurück zur Bearbeitung') && banner.includes('setEinsatzCenterIncludeDraft(this.checked)'), 'Banner: "ENTWURF AKTIV", Schalter (an) und Rückweg');

  // Schalter AUS
  app.run('window.setEinsatzCenterIncludeDraft(false)');
  const pageOff = app.page();
  assertTrue(app.run(`getEffectiveLineupData('25/26')===LINEUP_DATA['25/26']`), 'AUS: getEffectiveLineupData === LINEUP_DATA[seasonKey] (dieselbe Referenz)');
  assertEqual(app.run('EINSATZ_CENTER_DRAFT_EXCLUDED===EINSATZ_CENTER_DRAFT'), true, 'AUS: der aktuelle Draft ist als ausgeblendet vermerkt');
  assertTrue(!pageOff.includes(MARK) && markCount(pageOff) === 0 && !pageOff.includes('data-ec-draft-stats') && !pageOff.includes('enthält') && !pageOff.includes('neue Gruppe im Entwurf') && !pageOff.includes('Entwurfsnotiz') && !pageOff.includes('Spiel-ID 9999'), 'AUS: keinerlei Entwurfsspur in der Sicht (Kennzeichnung, Hinweis, Notiz, Draft-Spiel, Draft-Gruppe)');
  const offBanner = /<div class="wrn-box" data-ec-draft-banner>[^]*?<\/button><\/div><\/div>/.exec(pageOff)?.[0] ?? '';
  assertTrue(offBanner.includes('ausgeblendet') && !offBanner.includes('type="checkbox" checked') && offBanner.includes('Zurück zur Bearbeitung'), 'AUS: Banner bleibt (Schalter aus, Rückweg vorhanden)');
  assertEqual(pageOff.replace(offBanner, ''), rawPage, 'AUS: Sicht (ohne Banner) byte-identisch zur Sicht ohne Draft');
  assertEqual(JSON.stringify(app.run(`computeEinsatzCenterStats('25/26')`)), rawStats, 'AUS: Statistik entspricht dem Raw-Zustand');
  assertEqual(app.run(`lineupGroupDisplayName('${app.run('[...EINSATZ_CENTER_DRAFT.newGroups.keys()][0]')}')`).startsWith('Unbekannte Gruppe'), true, 'AUS: Draft-Gruppe erscheint nicht mehr neutral gekennzeichnet');

  // Schalter wieder EIN
  app.run('window.setEinsatzCenterIncludeDraft(true)');
  assertEqual(app.page(), pageOn, 'EIN: Sicht byte-identisch zum Zustand vor dem Ausschalten');
  assertEqual(JSON.stringify(app.run(`computeEinsatzCenterStats('25/26')`)), statsOn, 'EIN: Statistik identisch zu vorher');
  assertEqual(app.run('EINSATZ_CENTER_DRAFT_EXCLUDED'), null, 'EIN: kein Draft mehr als ausgeblendet vermerkt');

  // Statistik-Cache: wiederholtes Umschalten liefert immer den passenden Stand
  const seq = [];
  for (const v of [false, true, false, true]) { app.run(`window.setEinsatzCenterIncludeDraft(${v})`); seq.push(JSON.stringify(app.run(`computeEinsatzCenterStats('25/26')`)) === (v ? statsOn : rawStats)); }
  assertEqual(seq, [true, true, true, true], 'mehrfaches Umschalten: Statistik entspricht jeweils dem Schalterzustand (kein verschleppter Cache)');
}

// ── Datenisolation ─────────────────────────────────────────────────────
console.log('');
console.log('== Umschalten verändert nichts außer der Ansicht ==');
{
  const storage = makeStorage();
  const app = boot({ storage });
  await buildDraft(app);
  const autosave = storage.getItem(KEY('25/26'));
  const snap = async () => ({
    draft: app.run('JSON.stringify(einsatzCenterSerializeDraft(EINSATZ_CENTER_DRAFT).draft)'),
    baseHash: app.run('EINSATZ_CENTER_DRAFT.baseHash'),
    exportJson: JSON.stringify(await app.run('window.buildEinsatzCenterDraftExport()')),
    raw: app.rawJson(),
    S: JSON.stringify(app.S),
    autosave: storage.m.get(KEY('25/26')),
    owner: app.run('EINSATZ_CENTER_AUTOSAVE_OWNER'),
    info: app.run('JSON.stringify(EINSATZ_CENTER_AUTOSAVE_INFO)'),
  });
  const before = await snap();
  const counters = [storage.getCalls, storage.setCalls, storage.removeCalls];
  const draftInstance = app.run('EINSATZ_CENTER_DRAFT');
  const patchesBefore = app.patches.length;
  for (const v of [false, true, false, true, false]) app.run(`window.setEinsatzCenterIncludeDraft(${v})`);
  const afterOff = await snap();
  app.run('window.setEinsatzCenterIncludeDraft(true)');
  const after = await snap();
  assertEqual(afterOff, before, 'AUS: Draft, baseHash, Export, LINEUP_DATA/Registry, S, Autosave-Eintrag, Besitz und Info unverändert');
  assertEqual(after, before, 'EIN: ebenfalls alles unverändert');
  assertEqual([storage.getCalls, storage.setCalls, storage.removeCalls], counters, 'kein Storage-Zugriff durch das Umschalten (0 get/set/remove)');
  assertTrue(app.run('EINSATZ_CENTER_DRAFT') === draftInstance, 'gleiche Draft-Instanz');
  assertTrue(app.patches.slice(patchesBefore).every((p) => Object.keys(p).length === 0), 'setState wird nur als reiner Re-Render ({}) aufgerufen');
  assertEqual(before.baseHash, await computeBaseHash(syntheticSeason('25/26', [1, 2, 3]), realRegistry), 'baseHash bleibt der Hash des Raw-Zustands');
  assertEqual(before.autosave, autosave, 'Kontrolle: Autosave-Eintrag vor dem Umschalten vorhanden');
  // Autosave-Verhalten bei Mutationen im AUS-Zustand bleibt unabhängig vom Schalter
  app.run('window.setEinsatzCenterIncludeDraft(false)');
  app.run(`window.setEinsatzCenterGameNote(2,'geändert im AUS-Zustand')`);
  assertEqual(JSON.parse(storage.getItem(KEY('25/26'))).draft.games.find((p) => p[0] === 2)[1].note, 'geändert im AUS-Zustand', 'Mutationen und Autosave funktionieren unabhängig vom Schalter');
}

// ── Edit <-> View ──────────────────────────────────────────────────────
console.log('');
console.log('== Edit -> View ohne Draft-Verlust, Rückweg, cancel ==');
{
  const storage = makeStorage();
  const app = boot({ storage });
  await app.run('window.startEinsatzCenterDraftMode()');
  await buildDraft(app);
  app.run(`window.selectEinsatzCenterEditGame(2)`);
  assertEqual(app.S.einsatzCenterMode, 'edit', 'Vorbedingung: Entwurfsmodus');
  const edit = app.edit();
  assertTrue(edit.includes('viewEinsatzCenterMergedView()') && edit.includes('Zusammengeführte Sicht ansehen'), 'Edit-Seite hat den Button "Zusammengeführte Sicht ansehen"');
  assertTrue(edit.includes('cancelEinsatzCenterEdit()') && edit.includes('Entwurf verwerfen'), 'Edit-Seite: Verwerfen-Button unverändert vorhanden');
  const inst = app.run('EINSATZ_CENTER_DRAFT');
  const autosave = storage.getItem(KEY('25/26'));
  const rawBefore = app.rawJson();
  const counters = [storage.setCalls, storage.removeCalls];
  const editingBefore = app.S.einsatzCenterEditingGameId;
  const draftJsonBefore = app.run('JSON.stringify(einsatzCenterSerializeDraft(EINSATZ_CENTER_DRAFT).draft)');

  app.run('window.viewEinsatzCenterMergedView()');
  assertEqual(app.patches.at(-1), { einsatzCenterMode: 'view' }, 'Button setzt ausschließlich den Modus auf "view"');
  assertEqual(app.S.einsatzCenterMode, 'view', 'Modus ist "view"');
  assertTrue(app.run('EINSATZ_CENTER_DRAFT') === inst, 'Draft nicht verworfen: gleiche Instanz');
  assertEqual([storage.getItem(KEY('25/26')), storage.setCalls, storage.removeCalls], [autosave, counters[0], counters[1]], 'Autosave-Eintrag unverändert, kein Schreiben/Löschen');
  assertEqual(app.run('JSON.stringify(einsatzCenterSerializeDraft(EINSATZ_CENTER_DRAFT).draft)'), draftJsonBefore, 'Draft-Inhalt unverändert');
  assertEqual(app.rawJson(), rawBefore, 'LINEUP_DATA unverändert');
  const view = app.page();
  assertTrue(view.includes('data-ec-draft-banner') && view.includes('ENTWURF AKTIV') && view.includes('setEinsatzCenterIncludeDraft(this.checked)') && view.includes('returnToEinsatzCenterEdit()'), 'View zeigt Banner "ENTWURF AKTIV" mit Schalter und Rückweg');
  assertEqual(markCount(view), 2, 'View zeigt die Entwurfs-Kennzeichnungen');

  app.run('window.returnToEinsatzCenterEdit()');
  assertEqual(app.patches.at(-1), { einsatzCenterMode: 'edit' }, 'Rückweg setzt ausschließlich den Modus auf "edit"');
  assertEqual([app.S.einsatzCenterMode, app.S.einsatzCenterEditingGameId], ['edit', editingBefore], 'zurück im Entwurfsmodus, gewähltes Spiel bleibt erhalten');
  assertTrue(app.run('EINSATZ_CENTER_DRAFT') === inst && app.edit().includes('Entwurf bearbeiten'), 'Draft unverändert vorhanden, Edit-Seite rendert');

  // Edit-Seite ist vom Schalter unabhängig
  const editOn = app.edit();
  app.run('window.setEinsatzCenterIncludeDraft(false)');
  const editOff = app.edit();
  app.run('window.setEinsatzCenterIncludeDraft(true)');
  assertEqual(editOff, editOn, 'Edit-Seite ist bei Schalter AUS byte-identisch zu Schalter EIN');
  assertTrue(!/EINSATZ_CENTER_DRAFT_EXCLUDED|einsatzCenterDraftInView|rEinsatzCenterDraft/.test(fnSource('rEinsatzCenterEditPage')), 'Quelltext der Edit-Seite referenziert den Schalter nicht');

  // cancel behält sein Verhalten (auch bei ausgeblendetem Draft) und setzt den Standard zurück
  app.run('window.setEinsatzCenterIncludeDraft(false)');
  app.run('window.viewEinsatzCenterMergedView()');
  app.run('window.cancelEinsatzCenterEdit()');
  assertEqual([app.run('EINSATZ_CENTER_DRAFT'), storage.getItem(KEY('25/26')), app.S.einsatzCenterMode, app.run('EINSATZ_CENTER_AUTOSAVE_OWNER')], [null, null, 'view', null], 'cancel: Draft weg, Autosave weg, Modus "view", kein Besitz — wie bisher');
  assertEqual(app.rawJson(), rawBefore, 'cancel: LINEUP_DATA unverändert');
  assertTrue(!app.page().includes('data-ec-draft') && !app.page().includes(MARK), 'nach cancel keine Draft-Spur mehr in der Sicht');
  await app.run(`ensureEinsatzCenterDraft('25/26')`);
  app.run(`window.setEinsatzCenterGameNote(2,'neuer Draft')`);
  assertEqual([app.run('EINSATZ_CENTER_DRAFT_EXCLUDED===EINSATZ_CENTER_DRAFT'), app.page().includes(MARK)], [false, true], 'neuer Draft nach einem ausgeblendeten: Standard EIN (Draft wieder einbezogen)');

  // Wiederherstellung aus dem Autosave liefert eine neue Instanz -> ebenfalls Standard EIN
  const st2 = makeStorage();
  const s1 = boot({ storage: st2 });
  await s1.run(`ensureEinsatzCenterDraft('25/26')`);
  s1.run(`window.setEinsatzCenterGameNote(2,'gesichert')`);
  s1.run('window.setEinsatzCenterIncludeDraft(false)');
  const s2 = boot({ storage: st2 });
  await s2.run(`einsatzCenterInspectAutosave('25/26')`);
  await s2.run('restoreEinsatzCenterAutosave()');
  assertEqual([s2.run('EINSATZ_CENTER_DRAFT_EXCLUDED'), s2.S.einsatzCenterMode, s2.run(`getEffectiveLineupData('25/26')!==LINEUP_DATA['25/26']`)], [null, 'edit', true], 'Reload + Wiederherstellung (P0c.3): Schalter wieder Standard EIN, Draft einbezogen');
  assertEqual(s1.run('EINSATZ_CENTER_DRAFT_EXCLUDED===EINSATZ_CENTER_DRAFT'), true, 'Kontrolle: in der ersten Sitzung war der Draft ausgeblendet (Schalter wird nicht persistiert)');
}

// ── Guards (statisch) ─────────────────────────────────────────────────
console.log('');
console.log('== Guards ==');
{
  const p6Functions = ['isEinsatzCenterGameFromDraft', 'einsatzCenterDraftInView', 'rEinsatzCenterDraftMark', 'rEinsatzCenterDraftStatsHint', 'rEinsatzCenterDraftBanner'];
  for (const name of p6Functions) {
    const src = stripComments(fnSource(name));
    assertTrue(!/LINEUP_DATA|LINEUP_GROUPS_REGISTRY/.test(src), `${name}: liest weder LINEUP_DATA noch die Registry`);
    assertTrue(!/localStorage|sessionStorage|indexedDB|einsatzCenterStorage/.test(src), `${name}: keine Storage-Nutzung`);
    assertTrue(!/setState|EINSATZ_CENTER_DRAFT=|EINSATZ_CENTER_DRAFT_EXCLUDED=/.test(src), `${name}: mutiert weder Draft noch State`);
  }
  assertTrue(!/SEASONS|PLAYER_REGISTRY|STATIC_SEASON_DATA|cachedAnalysis|loadSeasonData/.test(p6Functions.map((n) => stripComments(fnSource(n))).join('\n')), 'P0c.6-Renderer berühren SEASONS, PLAYER_REGISTRY, STATIC_SEASON_DATA, Analyse-Cache und loadSeasonData nicht');
  const handlers = ['viewEinsatzCenterMergedView', 'returnToEinsatzCenterEdit', 'setEinsatzCenterIncludeDraft'].map((n) => {
    const m = new RegExp(`window\\.${n}=.*`).exec(region);
    return m ? m[0] : '';
  });
  assertEqual(handlers.map((h) => h.length > 0), [true, true, true], 'die drei Handler sind vorhanden');
  assertTrue(handlers.every((h) => !/localStorage|sessionStorage|indexedDB|einsatzCenterStorage/.test(h)), 'Handler: keine Storage-Nutzung');
  assertEqual(handlers[0], "window.viewEinsatzCenterMergedView=()=>{setState({einsatzCenterMode:'view'});};", 'Edit->View setzt nur den Modus');
  assertEqual(handlers[1], "window.returnToEinsatzCenterEdit=()=>{setState({einsatzCenterMode:'edit'});};", 'View->Edit setzt nur den Modus');
  assertEqual(handlers[2], 'window.setEinsatzCenterIncludeDraft=(include)=>{EINSATZ_CENTER_DRAFT_EXCLUDED=include?null:EINSATZ_CENTER_DRAFT;setState({});};', 'Schalter: nur Modulvariable und Re-Render');

  // Raw-Leser exakt wie in P0c.2 (+ einsatzCenterCurrentRawBaseHash aus P0c.3): keine neuen
  const allowed = ['ensureLineupDataLoaded', 'getEffectiveLineupData', 'ensureEinsatzCenterDraft', 'getEinsatzCenterGameDraft', 'einsatzCenterCurrentRawBaseHash'];
  const readers = [];
  for (const m of region.matchAll(/(^|\n)(?:async )?function (\w+)\(/g)) {
    if (/LINEUP_DATA\s*\[/.test(stripComments(fnSource(m[2])))) readers.push(m[2]);
  }
  assertEqual(readers.sort(), [...allowed].sort(), 'Raw-Leser von LINEUP_DATA[...] unverändert (keine neuen, Liste nicht erweitert)');
  assertTrue(fnSource('getEffectiveLineupData').includes('draft===EINSATZ_CENTER_DRAFT_EXCLUDED'), 'Schalterbedingung steht im zentralen Accessor');
  for (const name of ['rEinsatzCenterPage', 'computeEinsatzCenterStats']) {
    assertTrue(fnSource(name).includes('getEffectiveLineupData(') && !fnSource(name).includes('EINSATZ_CENTER_DRAFT_EXCLUDED'), `${name}: nutzt weiter den zentralen Accessor, keine verteilte Schalterlogik`);
  }
  // kein neuer globaler State außer dem vorgesehenen Schalter
  const names = [...region.matchAll(/^(?:let|const|var) ([A-Za-z_$][\w$]*)/gm)].map((m) => m[1]);
  // EINSATZ_CENTER_DRAFT_STALE (P0c.9, ausdrücklich freigegebenes Runtime-Flag für den
  // Stale-Draft-Hinweis, nicht persistiert) kommt bewusst zur bisherigen Liste hinzu.
  assertEqual(names, ['LINEUP_DATA', 'LINEUP_GROUPS_REGISTRY', '_lineupDataLoadPromises', '_lineupGroupsRegistryPromise', 'EINSATZ_CENTER_STATS_CACHE', 'EINSATZ_CENTER_DRAFT', 'EINSATZ_CENTER_DRAFT_EXCLUDED', 'EINSATZ_CENTER_DRAFT_STALE', 'EINSATZ_CENTER_AUTOSAVE_PREFIX', 'EINSATZ_CENTER_AUTOSAVE_VERSION', 'EINSATZ_CENTER_AUTOSAVE_OWNER', 'EINSATZ_CENTER_AUTOSAVE_STATUS', 'EINSATZ_CENTER_AUTOSAVE_INFO'], 'Top-Level-Variablen der Einsatz-Center-Region: bisherige 11 + der P0c.6-Schalter + das P0c.9-Stale-Flag, sonst nichts');
  const sInit = /\nlet S=\{[^]*?\n\};/.exec(html)?.[0] ?? '';
  assertTrue(sInit.length > 100 && !/EXCLUDED|includeDraft|IncludeDraft/.test(sInit), 'kein neues Feld in der S-Initialisierung (Schalter liegt außerhalb von S)');
  // Storage-Guard der ganzen Datei
  const storageLines = html.split('\n').filter((l) => /(local|session)Storage|indexedDB/.test(l) && !l.trim().startsWith('//'));
  assertEqual(storageLines.length, 3, 'in index.html weiterhin genau die 3 Storage-Zeilen aus P0c.3');
  // P0c.4 / P0c.5 unberührt
  assertTrue(!/EINSATZ_CENTER|MergedView|IncludeDraft/.test(previewBlock), 'P0c.4-Block enthält keinen P0c.6-Bezug');
  const ctxSources = fnSource('rContextBar', html) + fnSource('rSeasonDataPreviewContextHint', html);
  assertTrue(!/EINSATZ_CENTER|einsatzCenter|IncludeDraft|Entwurf/.test(stripComments(ctxSources)), 'rContextBar und der P0c.5-Renderer enthalten keinen P0c.6-Bezug');
  assertEqual((stripComments(html).match(/rEinsatzCenterDraftBanner\(/g) || []).length, 2, 'Banner: nur Definition und die eine Einbindung in rEinsatzCenterPage');
  assertEqual((stripComments(fnSource('rEinsatzCenterPage')).match(/rEinsatzCenterDraftBanner\(/g) || []).length, 1, 'rEinsatzCenterPage bindet das Banner genau einmal ein');
  assertTrue(!/rEinsatzCenterDraftBanner|rEinsatzCenterDraftMark|rEinsatzCenterDraftStatsHint/.test(fnSource('rEinsatzCenterEditPage')), 'Edit-Seite bindet keine der P0c.6-Sichtelemente ein');
}

console.log('');
if (failures > 0) {
  console.log(`${failures} Test(s) fehlgeschlagen.`);
  process.exitCode = 1;
} else {
  console.log('Alle Tests erfolgreich.');
  process.exitCode = 0;
}

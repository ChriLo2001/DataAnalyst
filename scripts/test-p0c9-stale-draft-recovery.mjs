#!/usr/bin/env node
// P0c.9 — Test für Stale Draft Recovery bei baseHash-Mismatch (Spezifikation
// 3.6.5: "Entwurf bleibt lesbar, Export wie bisher, Import-Validierung
// entscheidet").
//
// Wie test-p0c3/p0c6: der Einsatz-Center-Bereich von index.html
// ("const LINEUP_DATA={};" bis "window.einsatzCenterSoftIssues=…") wird
// unverändert aus dem echten Text geschnitten und in node:vm mit minimalen
// Stubs ausgeführt — mit dem echten Draft, den echten Mutatoren, dem echten
// Autosave, der echten neuen Ladefunktion und den echten Renderern.
// localStorage ist ein Fake mit Zähler. Ein "Reload" wird als neuer
// vm-Kontext mit demselben Storage-Inhalt simuliert. Liest index.html/
// lineup-data nur lesend, schreibt nichts.
//
// Aufruf: node scripts/test-p0c9-stale-draft-recovery.mjs

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
function fnSource(name, src = region) {
  const m = new RegExp(`(^|\\n)(async )?function ${name}\\(`).exec(src);
  if (!m) throw new Error(`Funktion nicht gefunden: ${name}`);
  const from = m.index + m[1].length;
  return src.slice(from, src.indexOf('\n}', from) + 2);
}
const stripComments = (s) => s.split('\n').filter((l) => !l.trim().startsWith('//') && !l.trim().startsWith('*') && !l.trim().startsWith('/*')).join('\n');

const realRegistry = JSON.parse(await readFile(path.join(REPO_ROOT, 'lineup-data', 'groups.json'), 'utf8'));

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

/** Frischer vm-Kontext ("App-Start"). confirmAnswer steuert window.confirm() (Ersetzen-Rückfrage). */
function boot({ lineup = { '25/26': syntheticSeason('25/26', [1, 2, 3]) }, storage = makeStorage(), confirmAnswer = true } = {}) {
  const S = { einsatzCenterSeasonKey: '25/26', einsatzCenterMode: 'view', einsatzCenterEditingGameId: null, einsatzCenterComboSelection: [] };
  const patches = [];
  const inputs = {};
  const SEASONS = {};
  for (const k of SEASON_KEYS) SEASONS[k] = { data: { rawGames: [] } };
  const ctx = vm.createContext({
    window: { localStorage: storage, confirm: () => confirmAnswer },
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

// ── Grundszenario: Session 1 legt einen Draft an und speichert ihn; Session 3
// lädt mit geänderten Rohdaten (anderer baseHash) -> mismatch ────────────────
const rawA = { '25/26': syntheticSeason('25/26', [1, 2, 3]) };
const rawB = { '25/26': syntheticSeason('25/26', [1, 2, 3, 4]) }; // "neu importiert": ein zusätzliches Spiel
const hashA = await computeBaseHash(rawA['25/26'], realRegistry);
const hashB = await computeBaseHash(rawB['25/26'], realRegistry);
assertTrue(hashA !== hashB, 'Vorbedingung: rawA und rawB ergeben unterschiedliche baseHash-Werte');

async function buildStaleScenario() {
  const storage1 = makeStorage();
  const s1 = boot({ lineup: rawA, storage: storage1 });
  await s1.run(`ensureEinsatzCenterDraft('25/26')`);
  s1.run(`window.setEinsatzCenterGameNote(2,'Alte Notiz')`);
  s1.run(`window.addEinsatzCenterRosterPlayer(2,'field','api:900')`);
  s1.inputs['ec-new-group-name-3'] = 'Alte Reihe';
  s1.inputs['ec-new-group-type-3'] = 'custom';
  s1.run(`window.addEinsatzCenterNewGroup(3)`);
  const originalDraftJson = s1.run('JSON.stringify(einsatzCenterSerializeDraft(EINSATZ_CENTER_DRAFT).draft)');
  const storedRecord = storage1.getItem(KEY('25/26'));
  assertEqual(JSON.parse(storedRecord).baseHash, hashA, 'Vorbedingung: gespeicherter Eintrag trägt den baseHash der ursprünglichen (alten) Rohdaten');
  const storage3 = makeStorage();
  storage3.m.set(KEY('25/26'), storedRecord);
  const s3 = boot({ lineup: rawB, storage: storage3 });
  const status = await s3.run(`einsatzCenterInspectAutosave('25/26')`);
  assertEqual(status.kind, 'mismatch', 'Vorbedingung: Status ist mismatch (Rohdaten haben sich geändert)');
  return { s3, storage3, originalDraftJson, storedRecord };
}

// ── 1/2: Laden, Inhalt bleibt vollständig erhalten ──────────────────────────
console.log('== 1/2: Mismatch-Draft laden, Inhalt bleibt vollständig erhalten ==');
{
  const { s3, storage3, originalDraftJson } = await buildStaleScenario();
  const rawBefore = s3.rawJson();
  assertEqual(s3.run('EINSATZ_CENTER_DRAFT'), null, 'vor dem Laden: kein Runtime-Draft (wie bisher)');
  const loaded = await s3.run('loadEinsatzCenterMismatchedAutosave()');
  assertEqual(loaded, true, 'loadEinsatzCenterMismatchedAutosave() meldet Erfolg');
  assertTrue(s3.run('EINSATZ_CENTER_DRAFT') !== null, 'Runtime-Draft ist nach dem Laden gesetzt');
  assertEqual(s3.run('JSON.stringify(einsatzCenterSerializeDraft(EINSATZ_CENTER_DRAFT).draft)'), originalDraftJson, 'Inhalt (Spiele, neue/umbenannte Gruppen) ist inhaltlich identisch zum ursprünglich gespeicherten Entwurf');
  assertEqual(s3.run('EINSATZ_CENTER_DRAFT.games.get(2).note'), 'Alte Notiz', 'einzelne Notiz bleibt erhalten');
  assertTrue(s3.run('EINSATZ_CENTER_DRAFT.games instanceof Map && EINSATZ_CENTER_DRAFT.newGroups instanceof Map'), 'Runtime-Struktur besteht aus Maps (wie bei restoreEinsatzCenterAutosave)');
  assertEqual(s3.run('EINSATZ_CENTER_DRAFT.baseHash'), hashA, 'der geladene Draft trägt weiterhin seinen ursprünglichen (alten) baseHash-Snapshot');
  assertEqual(s3.rawJson(), rawBefore, 'LINEUP_DATA/Registry (Rohdaten) durch das Laden unverändert');
  assertEqual([...storage3.m.keys()], [KEY('25/26')], 'Storage unverändert (kein neuer Schlüssel, kein Löschen)');
  assertEqual(s3.run('EINSATZ_CENTER_AUTOSAVE_STATUS.kind'), 'none', 'Entscheidung getroffen -> Status zurückgesetzt (wie bei restoreEinsatzCenterAutosave)');
  assertEqual(s3.run(`rEinsatzCenterAutosaveBanner('25/26')`), '', 'die Mismatch-Banner ("Entwurf laden"/"Verwerfen") verschwindet nach erfolgreichem Laden');
  assertEqual(s3.run('EINSATZ_CENTER_AUTOSAVE_OWNER'), '25/26', 'der geladene Draft besitzt fortan den Autosave-Eintrag (wie bei restoreEinsatzCenterAutosave)');
  assertEqual(s3.patches.at(-1).einsatzCenterMode, 'edit', 'nach dem Laden im Entwurfsmodus (Editor sichtbar)');
}

// ── 3/4: Standardmäßig ausgeschlossen, getEffectiveLineupData() bleibt rein ──
console.log('');
console.log('== 3/4: Standardmäßig aus der zusammengeführten Sicht ausgeschlossen ==');
{
  const { s3 } = await buildStaleScenario();
  await s3.run('loadEinsatzCenterMismatchedAutosave()');
  assertEqual(s3.run('EINSATZ_CENTER_DRAFT_EXCLUDED===EINSATZ_CENTER_DRAFT'), true, 'EINSATZ_CENTER_DRAFT_EXCLUDED zeigt unmittelbar auf den geladenen Draft (Default: ausgeschlossen)');
  const effective = s3.run(`JSON.stringify(getEffectiveLineupData('25/26'))`);
  const rawOnly = s3.run(`JSON.stringify(LINEUP_DATA['25/26'])`);
  assertEqual(effective, rawOnly, 'getEffectiveLineupData() liefert unmittelbar nach dem Laden weiterhin exakt die reinen aktuellen Rohdaten');
  assertTrue(!s3.page().includes('Alte Notiz') && !s3.page().includes(MARK), 'die zusammengeführte Sicht (rEinsatzCenterPage) enthält keine Spuren des geladenen Mismatch-Drafts');
}

// ── 5/6: bestehende P0c.6-Checkbox kann bewusst einschließen ────────────────
console.log('');
console.log('== 5/6: bestehende Checkbox schließt den Draft bewusst ein ==');
{
  const { s3 } = await buildStaleScenario();
  await s3.run('loadEinsatzCenterMismatchedAutosave()');
  s3.run('setState({einsatzCenterMode:\'view\'})');
  const bannerBefore = s3.run(`rEinsatzCenterDraftBanner('25/26')`);
  assertTrue(bannerBefore.includes('data-ec-draft-banner') && bannerBefore.includes('checkbox') && !bannerBefore.includes('type="checkbox" checked'), 'Banner zeigt die bestehende Checkbox, unmarkiert (nicht einbezogen)');
  s3.run('window.setEinsatzCenterIncludeDraft(true)');
  assertEqual(s3.run('EINSATZ_CENTER_DRAFT_EXCLUDED'), null, 'bewusstes Einschalten setzt EINSATZ_CENTER_DRAFT_EXCLUDED zurück auf null (dieselbe, unveränderte P0c.6-Logik)');
  const effectiveAfter = s3.run(`getEffectiveLineupData('25/26').games.find(g=>g.gameId===2).note`);
  assertEqual(effectiveAfter, 'Alte Notiz', 'nach bewusstem Einschließen ist der Draft-Inhalt (Spiel 2) korrekt in der zusammengeführten Sicht');
  const pageAfter = s3.page();
  assertTrue(pageAfter.includes(MARK), `nach dem Einschließen erscheint die unveränderte P0c.6-Markierung "${MARK}" (Wiederverwendung, keine neue Logik)`);
}

// ── 7/8: Export funktioniert unverändert, verwendet den gespeicherten baseHash ─
console.log('');
console.log('== 7/8: Export unverändert, baseHash bleibt der gespeicherte Snapshot ==');
{
  const { s3 } = await buildStaleScenario();
  await s3.run('loadEinsatzCenterMismatchedAutosave()');
  const exportObj = await s3.run('window.buildEinsatzCenterDraftExport()');
  assertEqual(exportObj.baseHash, hashA, 'Export-baseHash ist der ursprünglich gespeicherte Snapshot, NICHT live neu berechnet');
  assertTrue(exportObj.baseHash !== hashB, 'Export-baseHash unterscheidet sich bewusst vom aktuellen Raw-Hash (das entscheidet ausschließlich die echte Import-Validierung)');
  assertEqual(exportObj.games.some((g) => g.gameId === 2 && g.note === 'Alte Notiz'), true, 'Export enthält den vollständigen Draft-Inhalt');
  assertEqual(exportObj.season, '25/26', 'Export trägt die korrekte Saison');
}

// ── 9: Mismatch-Hinweis erscheint ───────────────────────────────────────────
console.log('');
console.log('== 9: Hinweis auf abweichenden Datenstand ==');
{
  const { s3 } = await buildStaleScenario();
  assertEqual(s3.run('EINSATZ_CENTER_DRAFT_STALE'), false, 'vor dem Laden: kein Stale-Flag gesetzt');
  await s3.run('loadEinsatzCenterMismatchedAutosave()');
  assertEqual(s3.run('EINSATZ_CENTER_DRAFT_STALE'), true, 'nach dem Laden eines Mismatch-Drafts: Stale-Flag gesetzt');
  const editPage = s3.edit();
  assertTrue(editPage.includes('data-ec-draft-stale'), 'Editor-Seite zeigt den Stale-Hinweis (dort landet der Nutzer nach dem Laden)');
  const hint = s3.run('einsatzCenterDraftStaleHint()');
  assertTrue(/lesbar/i.test(hint) && /export/i.test(hint) && /baseHash/i.test(hint) && /(nicht automatisch|ausgeschlossen)/i.test(hint), 'Hinweistext vermittelt: lesbar, exportierbar, baseHash-Bezug, keine automatische Übernahme in die Analyse');
  s3.run('setState({einsatzCenterMode:\'view\'})');
  assertTrue(s3.page().includes('data-ec-draft-stale'), 'auch die zusammengeführte Sicht (Banner) zeigt den Stale-Hinweis, solange der Draft geladen ist');
  s3.run('window.setEinsatzCenterIncludeDraft(true)');
  assertTrue(s3.page().includes('data-ec-draft-stale'), 'Stale-Hinweis bleibt auch nach bewusstem Einschließen sichtbar (weiterhin ein abweichender Datenstand)');
}

// ── 10: "Verwerfen" funktioniert weiterhin ──────────────────────────────────
console.log('');
console.log('== 10: Verwerfen bleibt unverändert nutzbar ==');
{
  // a) Verwerfen OHNE vorheriges Laden (unveränderter P0c.3-Pfad)
  const { s3, storage3 } = await buildStaleScenario();
  const bannerD = s3.run(`rEinsatzCenterAutosaveBanner('25/26')`);
  assertTrue(bannerD.includes('data-ec-autosave="mismatch"') && bannerD.includes('loadEinsatzCenterMismatchedAutosave()') && bannerD.includes('discardEinsatzCenterAutosave()') && !bannerD.includes('restoreEinsatzCenterAutosave()'), 'Mismatch-Banner bietet "Entwurf laden" UND "Verwerfen" an, weiterhin kein "Wiederherstellen"');
  s3.run('discardEinsatzCenterAutosave()');
  assertEqual(storage3.getItem(KEY('25/26')), null, 'Verwerfen ohne vorheriges Laden entfernt den Eintrag wie bisher');
  assertEqual(s3.run('EINSATZ_CENTER_DRAFT'), null, 'kein Runtime-Draft nach reinem Verwerfen');
  // b) restoreEinsatzCenterAutosave() bleibt bei mismatch weiterhin verweigert (P0c.3-Semantik unangetastet)
  const { s3: s3b } = await buildStaleScenario();
  assertEqual(await s3b.run('restoreEinsatzCenterAutosave()'), false, 'restoreEinsatzCenterAutosave() lehnt mismatch weiterhin ab (nicht umfunktioniert)');
  assertEqual(s3b.run('EINSATZ_CENTER_DRAFT'), null, 'auch der Versuch stellt nichts wieder her');
}

// ── 11: frischer Draft setzt das Flag zurück ────────────────────────────────
console.log('');
console.log('== 11: frischer Draft setzt EINSATZ_CENTER_DRAFT_STALE zurück ==');
{
  const { s3 } = await buildStaleScenario();
  await s3.run('loadEinsatzCenterMismatchedAutosave()');
  assertEqual(s3.run('EINSATZ_CENTER_DRAFT_STALE'), true, 'Vorbedingung: Stale-Flag gesetzt');
  s3.run('window.cancelEinsatzCenterEdit()');
  await s3.run(`ensureEinsatzCenterDraft('25/26')`);
  assertEqual(s3.run('EINSATZ_CENTER_DRAFT_STALE'), false, 'ein frischer Draft (nach Verwerfen + neu erzeugt) setzt das Stale-Flag zurück');
  assertTrue(!s3.edit().includes('data-ec-draft-stale'), 'der frische Entwurf zeigt keinen Stale-Hinweis mehr');
}

// ── 12: Reload-/Status-Verhalten bleibt konsistent ──────────────────────────
console.log('');
console.log('== 12: Konsistenz über "Reload" hinweg ==');
{
  const { s3, storage3 } = await buildStaleScenario();
  await s3.run('loadEinsatzCenterMismatchedAutosave()');
  s3.run(`window.setEinsatzCenterGameNote(2,'nach dem Laden bearbeitet')`);
  const recordAfterEdit = JSON.parse(storage3.getItem(KEY('25/26')));
  assertEqual(recordAfterEdit.baseHash, hashA, 'weitere Bearbeitung sichert weiterhin unter dem ursprünglichen (alten) baseHash');
  assertEqual(recordAfterEdit.draft.games.find((p) => p[0] === 2)[1].note, 'nach dem Laden bearbeitet', 'weitere Bearbeitung wird wie gewohnt automatisch gesichert');
  // "Reload": neue Session mit demselben (weiterhin abweichenden) Storage-Inhalt
  const storage4 = makeStorage();
  storage4.m.set(KEY('25/26'), storage3.getItem(KEY('25/26')));
  const s4 = boot({ lineup: rawB, storage: storage4 });
  const status4 = await s4.run(`einsatzCenterInspectAutosave('25/26')`);
  assertEqual(status4.kind, 'mismatch', 'nach einem Reload wird derselbe, weiterhin abweichende Stand erneut konsistent als mismatch erkannt');
  assertEqual(s4.run('EINSATZ_CENTER_DRAFT'), null, 'nach dem Reload erneut kein automatischer Runtime-Draft');
  assertEqual(s4.run('EINSATZ_CENTER_DRAFT_STALE'), false, 'das Stale-Flag ist pro Sitzung/Runtime-Draft, nicht persistiert (neue Sitzung startet sauber)');
}

// ── zusätzlich: Guard-Symmetrie und Rückfrage bei laufendem Entwurf ─────────
console.log('');
console.log('== Zusätzlich: Guards und Bestätigungsdialog ==');
{
  // loadEinsatzCenterMismatchedAutosave() ohne mismatch-Status tut nichts
  const s5 = boot({ lineup: rawA, storage: makeStorage() });
  assertEqual(await s5.run('loadEinsatzCenterMismatchedAutosave()'), false, 'ohne jeden Autosave-Eintrag (kind=none): keine Wirkung');
  assertEqual(s5.run('EINSATZ_CENTER_DRAFT'), null, 'kein Runtime-Draft entstanden');
  // Rückfrage, wenn bereits ein nicht-leerer Runtime-Draft existiert
  const { s3: s6proto } = await buildStaleScenario();
  const sharedStorage = s6proto.storage;
  const s6deny = boot({ lineup: rawB, storage: sharedStorage, confirmAnswer: false });
  await s6deny.run(`einsatzCenterInspectAutosave('25/26')`); // wie beim echten Einstieg: Status je Sitzung neu ermitteln
  await s6deny.run(`ensureEinsatzCenterDraft('25/26')`);
  s6deny.run(`window.setEinsatzCenterGameNote(3,'laufender neuer Entwurf')`);
  const declined = await s6deny.run('loadEinsatzCenterMismatchedAutosave()');
  assertEqual(declined, false, 'bei abgelehnter Rückfrage (window.confirm -> false): kein Laden');
  assertEqual(s6deny.run('EINSATZ_CENTER_DRAFT.games.get(3).note'), 'laufender neuer Entwurf', 'der laufende, noch nicht ersetzte Entwurf bleibt unverändert erhalten');
  const s6accept = boot({ lineup: rawB, storage: sharedStorage, confirmAnswer: true });
  await s6accept.run(`einsatzCenterInspectAutosave('25/26')`);
  await s6accept.run(`ensureEinsatzCenterDraft('25/26')`);
  s6accept.run(`window.setEinsatzCenterGameNote(3,'laufender neuer Entwurf')`);
  const accepted = await s6accept.run('loadEinsatzCenterMismatchedAutosave()');
  assertEqual(accepted, true, 'bei bestätigter Rückfrage: Laden ersetzt den laufenden Entwurf');
  assertEqual(s6accept.run('EINSATZ_CENTER_DRAFT.games.get(2)?.note'), 'Alte Notiz', 'nach dem Ersetzen liegt der geladene Mismatch-Draft vor, nicht der vorherige laufende Entwurf');
}

// ── Guards / Regression-relevante Quelltextprüfungen ────────────────────────
console.log('');
console.log('== Guards ==');
{
  const storageLines = html.split('\n').filter((l) => /(local|session)Storage|indexedDB/.test(l) && !l.trim().startsWith('//'));
  assertEqual(storageLines.length, 3, 'in index.html weiterhin genau die 3 Storage-Zeilen (kein neuer Storage-Key für P0c.9)');
  assertTrue(!/localStorage|sessionStorage|indexedDB/.test(stripComments(fnSource('loadEinsatzCenterMismatchedAutosave'))), 'loadEinsatzCenterMismatchedAutosave(): keine direkte Storage-Nutzung (ausschließlich über bestehende Kapseln/Funktionen)');
  assertTrue(!/localStorage|sessionStorage|indexedDB/.test(stripComments(fnSource('einsatzCenterDraftStaleHint'))), 'einsatzCenterDraftStaleHint(): keine Storage-Nutzung, rein lesend');
  // getEffectiveLineupData() textlich unverändert von P0c.9 (keine eigene Mismatch-/Stale-Logik dort)
  assertTrue(!/STALE|Mismatch|mismatch/.test(fnSource('getEffectiveLineupData')), 'getEffectiveLineupData(): kein eigener P0c.9-Bezug — die bestehende EINSATZ_CENTER_DRAFT_EXCLUDED-Weiche genügt unverändert');
  assertTrue(fnSource('getEffectiveLineupData').includes('EINSATZ_CENTER_DRAFT_EXCLUDED'), 'getEffectiveLineupData() nutzt weiterhin exakt dieselbe (unveränderte) Ausschluss-Prüfung');
  // restoreEinsatzCenterAutosave() unverändert (Gate weiterhin exakt auf 'restorable')
  assertTrue(fnSource('restoreEinsatzCenterAutosave').includes("kind!=='restorable'"), "restoreEinsatzCenterAutosave() bleibt exakt auf kind==='restorable' begrenzt (nicht auf mismatch erweitert)");
  assertTrue(!/mismatch/i.test(fnSource('restoreEinsatzCenterAutosave')), 'restoreEinsatzCenterAutosave() referenziert "mismatch" nicht — eigene, getrennte Funktion für P0c.9');
  // discardEinsatzCenterAutosave() unverändert
  assertTrue(!/STALE|loadEinsatzCenterMismatchedAutosave/.test(fnSource('discardEinsatzCenterAutosave')), 'discardEinsatzCenterAutosave() unverändert, kein P0c.9-Bezug');
  // ensureEinsatzCenterDraft() setzt das Flag zurück
  assertTrue(fnSource('ensureEinsatzCenterDraft').includes('EINSATZ_CENTER_DRAFT_STALE=false'), 'ensureEinsatzCenterDraft() setzt EINSATZ_CENTER_DRAFT_STALE beim frischen Draft zurück');
  // die neue Ladefunktion setzt EXCLUDED unmittelbar auf den geladenen Draft
  assertTrue(/EINSATZ_CENTER_DRAFT_EXCLUDED=EINSATZ_CENTER_DRAFT;/.test(stripComments(fnSource('loadEinsatzCenterMismatchedAutosave'))), 'loadEinsatzCenterMismatchedAutosave() setzt EINSATZ_CENTER_DRAFT_EXCLUDED unmittelbar auf den geladenen Draft (Default-Ausschluss)');
  // rContextBar/P0c.4/P0c.6-Marker/P0c.7/P0c.8 unberührt
  assertTrue(!/EINSATZ_CENTER_DRAFT_STALE|loadEinsatzCenterMismatchedAutosave/.test(fnSource('rContextBar', html)), 'rContextBar unberührt (kein P0c.9-Bezug)');
  for (const n of ['isEinsatzCenterGameFromDraft', 'einsatzCenterDraftInView', 'rEinsatzCenterDraftMark']) {
    assertTrue(!/EINSATZ_CENTER_DRAFT_STALE|loadEinsatzCenterMismatchedAutosave/.test(fnSource(n)), `${n} (P0c.6): unverändert, kein P0c.9-Bezug`);
  }
  assertEqual((html.match(/vfbulm\.comfort\.lastSeenDataState|vfbulm\.comfort\.lastView/g) || []).length, 2, 'P0c.7-/P0c.8-Namensräume unverändert (je eine Definition), kein Bezug zu P0c.9');
}

console.log('');
if (failures > 0) {
  console.log(`${failures} Test(s) fehlgeschlagen.`);
  process.exitCode = 1;
} else {
  console.log('Alle Tests erfolgreich.');
  process.exitCode = 0;
}

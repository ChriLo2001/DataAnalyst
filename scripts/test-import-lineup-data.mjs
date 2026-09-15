#!/usr/bin/env node
// Offline-Testharness für scripts/import-lineup-data.mjs (Phase 3) und
// scripts/lineup-data-hash.mjs — kein Netzwerk, kein API-Key.
//
// Teil 1: Grundbausteine (canonicalJson, computeBaseHash, validateDraftShape,
//         mergeGames, mergeRegistryGroups) mit künstlichen, synthetischen
//         Fixtures.
// Teil 2: buildImportPlan() end-to-end (synthetisch) — Tests A-T aus dem
//         Auftrag plus Registry-Unveränderlichkeit.
// Teil 3: struktureller/Cross-File-Smoke-Test gegen die TATSÄCHLICH
//         vorhandenen Dateien (lineup-data/25-26.json, lineup-data/groups.json,
//         season-data/25-26.json) — nur lesend.
//
// WICHTIG: Alle Spieler-/Gruppen-/Spiel-Daten in Teil 1+2 sind rein
// synthetisch. Teil 3 verwendet zwar eine ECHTE gameId und ECHTE Spieler-IDs
// aus season-data/25-26.json als Cross-File-Referenz, behauptet damit aber
// NICHTS über tatsächliche Einsätze — es wird nichts geschrieben, nur
// buildImportPlan() rein im Speicher ausgeführt.
//
// Node.js ist in dieser Umgebung nicht installiert. Tests, die einen
// tatsächlichen node:fs-Schreibvorgang voraussetzen würden (N/O/P), sind
// deshalb als Prüfung der ENTSCHEIDUNGSLOGIK umgesetzt (buildImportPlan()
// wird echt ausgeführt), NICHT als Ende-zu-Ende-Dateisystemtest — das ist
// explizit so gekennzeichnet, siehe Kommentare dort.
//
// Aufruf: node scripts/test-import-lineup-data.mjs

import { readFile } from 'node:fs/promises';
import path from 'node:path';

import {
  validateDraftShape,
  mergeGames,
  mergeRegistryGroups,
  buildImportPlan,
  formatImportReport,
  seasonFileForKey,
} from './import-lineup-data.mjs';

import { canonicalJson, computeBaseHash } from './lineup-data-hash.mjs';

import { derivePlayerIdsFromSeasonGames } from './lineup-data-validators.mjs';

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
function assertFalse(cond, label) { assertEqual(Boolean(cond), false, label); }
function assertContains(arr, needle, label) {
  const hit = (arr ?? []).some((s) => String(s).includes(needle));
  assertTrue(hit, `${label} (enthält "${needle}")`);
}

// ─────────────────────────────────────────────────────────────────────────
// Synthetische Fixtures
// ─────────────────────────────────────────────────────────────────────────

const SEASON_KEY = '25/26';
const GROUP_1 = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa';
const GROUP_2 = 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb';

function sourceGame(id) {
  return {
    id,
    date: '2026-01-01',
    league_id: 1897,
    league_name: 'Test-Liga',
    home_team_name: 'VfB Ulm',
    guest_team_name: 'Gegner',
    started: true,
    ended: true,
    players: {
      home: [
        { player_id: 90001, player_name: 'Spieler A' },
        { player_id: 90002, player_name: 'Spieler B' },
        { player_id: 90003, player_name: 'Spieler C' },
        { player_id: 90004, player_name: 'Spieler D' },
        { player_id: 90010, player_name: 'Torwart' },
      ],
      guest: [],
    },
  };
}
const SOURCE_SEASON_GAMES = [sourceGame(80001), sourceGame(80002), sourceGame(80003)];

function existingSeasonDataFixture() {
  return {
    schemaVersion: 1,
    season: SEASON_KEY,
    games: [
      {
        gameId: 80001,
        roster: { field: ['api:90001', 'api:90002', 'api:90003'], goalies: ['api:90010'] },
        groups: [{
          groupId: GROUP_1, name: 'Reihe Eins', type: 'trio',
          players: [
            { playerId: 'api:90001', position: 'Verteidiger' },
            { playerId: 'api:90002', position: 'Verteidiger' },
            { playerId: 'api:90003', position: 'Flügel' },
          ],
          notes: '',
        }],
        confirmedCombinations: [{ players: ['api:90001', 'api:90002', 'api:90003'], groupId: GROUP_1, note: '' }],
        note: '',
      },
    ],
  };
}
function existingRegistryFixture() {
  return {
    schemaVersion: 1,
    groups: [{
      groupId: GROUP_1, currentName: 'Reihe Eins', createdInSeason: SEASON_KEY, createdInGame: 80001,
      nameHistory: [{ name: 'Reihe Eins', since: { season: SEASON_KEY, gameId: 80001 } }],
    }],
  };
}
async function baseDraft(existingSeasonData, existingRegistry, overrides = {}) {
  const baseHash = await computeBaseHash(existingSeasonData, existingRegistry);
  return { schemaVersion: 1, season: SEASON_KEY, baseHash, games: [], groups: [], ...overrides };
}

// ═════════════════════════════════════════════════════════════════════════
// Teil 1: Grundbausteine
// ═════════════════════════════════════════════════════════════════════════
console.log('== Hash-Grundfunktionen (scripts/lineup-data-hash.mjs) ==');
{
  const a = { season: '25/26', games: [{ gameId: 1 }] };
  const b = { games: [{ gameId: 1 }], season: '25/26' };
  assertEqual(canonicalJson(a), canonicalJson(b), 'canonicalJson ist unabhängig von der Objektschlüssel-Reihenfolge');
}
{
  const h1 = await computeBaseHash({ season: '25/26', games: [] }, { groups: [] });
  const h2 = await computeBaseHash({ season: '25/26', games: [] }, { groups: [] });
  assertEqual(h1, h2, 'computeBaseHash ist deterministisch: gleicher Inhalt -> gleicher Hash, kein Zufall/Timestamp');
  const h3 = await computeBaseHash({ season: '25/26', games: [{ gameId: 1 }] }, { groups: [] });
  assertFalse(h1 === h3, 'computeBaseHash: geänderter Inhalt -> anderer Hash');
  assertTrue(/^[0-9a-f]{64}$/.test(h1), 'computeBaseHash liefert einen 64-stelligen Hex-SHA-256-Digest');
  const h4 = await computeBaseHash({ season: '25/26', games: [] }, { groups: [{ groupId: 'x' }] });
  assertFalse(h1 === h4, 'computeBaseHash reagiert auch auf Änderungen an der Registry, nicht nur an der Season-Datei');
}

console.log('');
console.log('== validateDraftShape ==');
{
  const draft = await baseDraft(existingSeasonDataFixture(), existingRegistryFixture());
  assertTrue(validateDraftShape(draft, { expectedSeasonKey: SEASON_KEY }).ok, 'leerer, ansonsten valider Draft ist strukturell gültig');
}
{
  const r = validateDraftShape({ schemaVersion: 1, season: '25/26', baseHash: 'x', games: [], irgendwas: 'y' });
  assertFalse(r.ok, 'unbekanntes Top-Level-Feld im Draft -> Fehler');
  assertContains(r.errors, 'irgendwas', 'Fehlermeldung nennt das unbekannte Feld');
}
{
  const r = validateDraftShape({ schemaVersion: 1, season: '25/26', games: [] });
  assertFalse(r.ok, 'fehlender baseHash -> Fehler');
  assertContains(r.errors, 'baseHash fehlt', 'Fehlermeldung nennt fehlenden baseHash');
}
{
  const r = validateDraftShape({ schemaVersion: 2, season: '25/26', baseHash: 'x', games: [] });
  assertFalse(r.ok, 'schemaVersion 2 -> Fehler');
}
{
  const r = validateDraftShape({ schemaVersion: 1, season: '24/25', baseHash: 'x', games: [] }, { expectedSeasonKey: '25/26' });
  assertFalse(r.ok, 'draft.season != erwartete Season -> Fehler');
}

console.log('');
console.log('== mergeGames (pure) ==');
{
  const existing = [{ gameId: 1, note: 'a' }, { gameId: 2, note: 'b' }];
  const r = mergeGames(existing, [{ gameId: 2, note: 'b' }]); // identisch erneut gesendet
  assertEqual(r.added, [], 'mergeGames: kein "added" bei identisch erneut gesendetem Spiel');
  assertEqual(r.changed, [], 'mergeGames: kein "changed" bei identisch erneut gesendetem Spiel');
  assertEqual(r.unchanged.sort(), [1, 2].sort(), 'mergeGames: beide Spiele als unverändert erkannt (eines touched-aber-identisch, eines gar nicht erwähnt)');
  assertEqual(r.mergedGames.length, 2, 'mergeGames: Gesamtzahl bleibt 2');
}
{
  const existing = [{ gameId: 1, note: 'a' }];
  const r = mergeGames(existing, [{ gameId: 1, note: 'GEÄNDERT' }]);
  assertEqual(r.changed, [1], 'mergeGames: geändertes bestehendes Spiel korrekt erkannt');
  assertEqual(r.mergedGames[0].note, 'GEÄNDERT', 'mergeGames: kompletter Ersatz, kein Feld-Merge');
}
{
  const existing = [{ gameId: 1 }];
  const r = mergeGames(existing, [{ gameId: 2 }]);
  assertEqual(r.added, [2], 'mergeGames: neues Spiel korrekt erkannt');
  assertTrue(r.mergedGames.some((g) => g.gameId === 1), 'mergeGames: bestehendes, nicht erwähntes Spiel bleibt erhalten');
}

console.log('');
console.log('== mergeRegistryGroups (pure) ==');
{
  const existing = [{ groupId: GROUP_1, currentName: 'X', createdInSeason: SEASON_KEY, createdInGame: 1 }];
  const r = mergeRegistryGroups(existing, [{ groupId: GROUP_2, currentName: 'Y', createdInSeason: SEASON_KEY, createdInGame: 1 }]);
  assertEqual(r.added.map((g) => g.groupId), [GROUP_2], 'mergeRegistryGroups: neue Gruppe korrekt erkannt');
  assertEqual(r.errors, [], 'mergeRegistryGroups: keine Fehler bei legitimer neuer Gruppe');
}
{
  const existing = [{ groupId: GROUP_1, currentName: 'X', createdInSeason: SEASON_KEY, createdInGame: 1 }];
  const r = mergeRegistryGroups(existing, [{ groupId: GROUP_1, currentName: 'X neu', createdInSeason: SEASON_KEY, createdInGame: 1 }]);
  assertEqual(r.changed.map((g) => g.groupId), [GROUP_1], 'mergeRegistryGroups: Namensänderung als "changed" erkannt');
}
{
  const existing = [{ groupId: GROUP_1, currentName: 'X', createdInSeason: SEASON_KEY, createdInGame: 1 }];
  const r = mergeRegistryGroups(existing, [{ groupId: GROUP_1, currentName: 'X', createdInSeason: SEASON_KEY, createdInGame: 999 }]);
  assertTrue(r.errors.length > 0, 'mergeRegistryGroups: Änderung von createdInGame bei bestehender groupId -> Fehler');
  assertEqual(r.mergedGroups[0].createdInGame, 1, 'mergeRegistryGroups: bestehender Eintrag bleibt bei einem Verstoß unangetastet erhalten');
}

// ═════════════════════════════════════════════════════════════════════════
// Teil 2: buildImportPlan() end-to-end (synthetisch) — Tests A-T
// ═════════════════════════════════════════════════════════════════════════
console.log('');
console.log('== A) identischer Draft -> keine Änderung ==');
{
  const existing = existingSeasonDataFixture();
  const registry = existingRegistryFixture();
  const draft = await baseDraft(existing, registry, { games: [JSON.parse(JSON.stringify(existing.games[0]))] });
  const plan = await buildImportPlan({ seasonKey: SEASON_KEY, draft, existingSeasonData: existing, existingRegistry: registry, sourceSeasonGames: SOURCE_SEASON_GAMES });
  assertTrue(plan.ok, 'identischer Draft ist gültig');
  assertEqual(plan.diff.games.added, [], 'keine neuen Spiele');
  assertEqual(plan.diff.games.changed, [], 'keine geänderten Spiele');
  assertEqual(plan.diff.games.unchanged, [80001], 'Spiel 80001 als unverändert erkannt');
}

console.log('');
console.log('== B) gültiges neues Spiel -> added ==');
{
  const existing = existingSeasonDataFixture();
  const registry = existingRegistryFixture();
  const newGame = { gameId: 80002, roster: { field: ['api:90001', 'api:90004'], goalies: ['api:90010'] }, groups: [], confirmedCombinations: [], note: '' };
  const draft = await baseDraft(existing, registry, { games: [newGame] });
  const plan = await buildImportPlan({ seasonKey: SEASON_KEY, draft, existingSeasonData: existing, existingRegistry: registry, sourceSeasonGames: SOURCE_SEASON_GAMES });
  assertTrue(plan.ok, 'neues gültiges Spiel wird akzeptiert');
  assertEqual(plan.diff.games.added, [80002], 'Spiel 80002 als neu erkannt');
  assertEqual(plan.mergedSeasonData.games.length, 2, 'Gesamtzahl Spiele steigt auf 2');
}

console.log('');
console.log('== C) gültiges bestehendes Spiel -> changed / kompletter Ersatz ==');
{
  const existing = existingSeasonDataFixture();
  const registry = existingRegistryFixture();
  const changedGame = { gameId: 80001, roster: { field: ['api:90001', 'api:90002', 'api:90003', 'api:90004'], goalies: ['api:90010'] }, groups: [], confirmedCombinations: [], note: 'aktualisiert' };
  const draft = await baseDraft(existing, registry, { games: [changedGame] });
  const plan = await buildImportPlan({ seasonKey: SEASON_KEY, draft, existingSeasonData: existing, existingRegistry: registry, sourceSeasonGames: SOURCE_SEASON_GAMES });
  assertTrue(plan.ok, 'geändertes bestehendes Spiel wird akzeptiert');
  assertEqual(plan.diff.games.changed, [80001], 'Spiel 80001 als geändert erkannt');
  const merged = plan.mergedSeasonData.games.find((g) => g.gameId === 80001);
  assertEqual(merged.groups, [], 'alte Gruppen des Spiels sind komplett verschwunden (kompletter Ersatz, kein Feld-Merge)');
  assertEqual(merged.note, 'aktualisiert', 'neue Note übernommen');
}

console.log('');
console.log('== D) Draft mit entferntem bestehendem Spiel -> HARD FAIL ==');
{
  const existing = existingSeasonDataFixture();
  existing.games.push({ gameId: 80002, roster: { field: ['api:90004'], goalies: ['api:90010'] }, groups: [], confirmedCombinations: [], note: '' });
  const registry = existingRegistryFixture();
  const draft = await baseDraft(existing, registry, { games: [existing.games[0]], removedGameIds: [80002] });
  const plan = await buildImportPlan({ seasonKey: SEASON_KEY, draft, existingSeasonData: existing, existingRegistry: registry, sourceSeasonGames: SOURCE_SEASON_GAMES });
  assertFalse(plan.ok, 'Versuch, ein bestehendes Spiel explizit zu entfernen (undokumentiertes Feld "removedGameIds") -> HARD FAIL');
  assertContains(plan.errors, 'unbekanntes Feld', 'Fehlermeldung nennt unbekanntes Feld "removedGameIds"');
}
{
  // Kontrast: ein Spiel im Draft einfach NICHT zu erwähnen ist der normale,
  // erwartete Fall (Teil-Draft) und KEIN Löschversuch.
  const existing = existingSeasonDataFixture();
  existing.games.push({ gameId: 80002, roster: { field: ['api:90004'], goalies: ['api:90010'] }, groups: [], confirmedCombinations: [], note: '' });
  const registry = existingRegistryFixture();
  const draft = await baseDraft(existing, registry, { games: [existing.games[0]] });
  const plan = await buildImportPlan({ seasonKey: SEASON_KEY, draft, existingSeasonData: existing, existingRegistry: registry, sourceSeasonGames: SOURCE_SEASON_GAMES });
  assertTrue(plan.ok, 'Kontrast: Spiel 80002 im Draft einfach nicht erwähnt -> bleibt erhalten, kein Fehler');
  assertTrue(plan.mergedSeasonData.games.some((g) => g.gameId === 80002), 'Spiel 80002 ist weiterhin im gemergten Endzustand vorhanden');
}

console.log('');
console.log('== E) unbekannte gameId -> HARD FAIL ==');
{
  const existing = existingSeasonDataFixture();
  const registry = existingRegistryFixture();
  const draft = await baseDraft(existing, registry, { games: [{ gameId: 999999, roster: { field: ['api:90001'], goalies: ['api:90010'] }, groups: [], confirmedCombinations: [], note: '' }] });
  const plan = await buildImportPlan({ seasonKey: SEASON_KEY, draft, existingSeasonData: existing, existingRegistry: registry, sourceSeasonGames: SOURCE_SEASON_GAMES });
  assertFalse(plan.ok, 'unbekannte gameId (nicht in season-data) -> HARD FAIL');
  assertContains(plan.errors, 'existiert nicht in season-data', 'Fehlermeldung benennt fehlende season-data-Referenz');
}

console.log('');
console.log('== F) falscher baseHash -> HARD FAIL ==');
{
  const existing = existingSeasonDataFixture();
  const registry = existingRegistryFixture();
  const draft = await baseDraft(existing, registry, { baseHash: 'deadbeef'.repeat(8) });
  const plan = await buildImportPlan({ seasonKey: SEASON_KEY, draft, existingSeasonData: existing, existingRegistry: registry, sourceSeasonGames: SOURCE_SEASON_GAMES });
  assertFalse(plan.ok, 'falscher baseHash -> HARD FAIL');
  assertContains(plan.errors, 'baseHash stimmt nicht überein', 'Fehlermeldung benennt baseHash-Mismatch');
}

console.log('');
console.log('== G) fehlender baseHash -> HARD FAIL ==');
{
  const existing = existingSeasonDataFixture();
  const registry = existingRegistryFixture();
  const draft = await baseDraft(existing, registry, {});
  delete draft.baseHash;
  const plan = await buildImportPlan({ seasonKey: SEASON_KEY, draft, existingSeasonData: existing, existingRegistry: registry, sourceSeasonGames: SOURCE_SEASON_GAMES });
  assertFalse(plan.ok, 'fehlender baseHash -> HARD FAIL');
  assertContains(plan.errors, 'baseHash fehlt', 'Fehlermeldung benennt fehlenden baseHash');
}

console.log('');
console.log('== H) ungültiger Player -> HARD FAIL ==');
{
  const existing = existingSeasonDataFixture();
  const registry = existingRegistryFixture();
  const game = { gameId: 80002, roster: { field: ['api:90001', 'api:77777'], goalies: ['api:90010'] }, groups: [], confirmedCombinations: [], note: '' };
  const draft = await baseDraft(existing, registry, { games: [game] });
  const plan = await buildImportPlan({ seasonKey: SEASON_KEY, draft, existingSeasonData: existing, existingRegistry: registry, sourceSeasonGames: SOURCE_SEASON_GAMES });
  assertFalse(plan.ok, 'ungültige/unbekannte Player-ID -> HARD FAIL');
}

console.log('');
console.log('== I) ungültige Gruppe -> HARD FAIL ==');
{
  const existing = existingSeasonDataFixture();
  const registry = existingRegistryFixture();
  const game = { gameId: 80002, roster: { field: ['api:90001', 'api:90002'], goalies: ['api:90010'] }, groups: [{ groupId: GROUP_2, name: 'X', type: 'trio', players: [], notes: '' }], confirmedCombinations: [], note: '' };
  const draft = await baseDraft(existing, registry, { games: [game] });
  const plan = await buildImportPlan({ seasonKey: SEASON_KEY, draft, existingSeasonData: existing, existingRegistry: registry, sourceSeasonGames: SOURCE_SEASON_GAMES });
  assertFalse(plan.ok, 'ungültige Gruppe (leer) -> HARD FAIL');
}

console.log('');
console.log('== J) ungültige Kombination -> HARD FAIL ==');
{
  const existing = existingSeasonDataFixture();
  const registry = existingRegistryFixture();
  const game = { gameId: 80002, roster: { field: ['api:90001', 'api:90002'], goalies: ['api:90010'] }, groups: [], confirmedCombinations: [{ players: ['api:90001', 'api:90002'], groupId: null, note: '' }], note: '' };
  const draft = await baseDraft(existing, registry, { games: [game] });
  const plan = await buildImportPlan({ seasonKey: SEASON_KEY, draft, existingSeasonData: existing, existingRegistry: registry, sourceSeasonGames: SOURCE_SEASON_GAMES });
  assertFalse(plan.ok, 'ungültige Kombination (nur 2 Spieler) -> HARD FAIL');
}

console.log('');
console.log('== K) neuer groupId -> added group ==');
{
  const existing = existingSeasonDataFixture();
  const registry = existingRegistryFixture();
  const newGroup = { groupId: GROUP_2, currentName: 'Neue Gruppe', createdInSeason: SEASON_KEY, createdInGame: 80001, nameHistory: [{ name: 'Neue Gruppe', since: { season: SEASON_KEY, gameId: 80001 } }] };
  const draft = await baseDraft(existing, registry, { groups: [newGroup] });
  const plan = await buildImportPlan({ seasonKey: SEASON_KEY, draft, existingSeasonData: existing, existingRegistry: registry, sourceSeasonGames: SOURCE_SEASON_GAMES });
  assertTrue(plan.ok, 'neue Registry-Gruppe wird akzeptiert');
  assertEqual(plan.diff.groups.added.map((g) => g.groupId), [GROUP_2], 'neue Gruppe als "added" erkannt');
  assertTrue(plan.registryChanged, 'registryChanged=true');
}

console.log('');
console.log('== L) bestehende groupId + Namensänderung -> changed group ==');
{
  const existing = existingSeasonDataFixture();
  const registry = existingRegistryFixture();
  const renamed = {
    groupId: GROUP_1, currentName: 'Reihe Eins NEU', createdInSeason: SEASON_KEY, createdInGame: 80001,
    nameHistory: [
      { name: 'Reihe Eins', since: { season: SEASON_KEY, gameId: 80001 } },
      { name: 'Reihe Eins NEU', since: { season: SEASON_KEY, gameId: 80001 } },
    ],
  };
  const draft = await baseDraft(existing, registry, { groups: [renamed] });
  const plan = await buildImportPlan({ seasonKey: SEASON_KEY, draft, existingSeasonData: existing, existingRegistry: registry, sourceSeasonGames: SOURCE_SEASON_GAMES });
  assertTrue(plan.ok, 'Namensänderung einer bestehenden Gruppe wird akzeptiert');
  assertEqual(plan.diff.groups.changed.map((g) => g.groupId), [GROUP_1], 'Gruppe als "changed" erkannt');
}

console.log('');
console.log('== M) bestehende groupId + geänderte Besetzung -> groupId bleibt unverändert ==');
{
  const existing = existingSeasonDataFixture();
  const registry = existingRegistryFixture();
  const gameWithNewComposition = {
    gameId: 80001,
    roster: { field: ['api:90001', 'api:90002', 'api:90004'], goalies: ['api:90010'] },
    groups: [{
      groupId: GROUP_1, name: 'Reihe Eins', type: 'trio',
      players: [
        { playerId: 'api:90001', position: 'Verteidiger' },
        { playerId: 'api:90002', position: 'Verteidiger' },
        { playerId: 'api:90004', position: 'Flügel' },
      ],
      notes: 'Besetzung geändert',
    }],
    confirmedCombinations: [],
    note: '',
  };
  const draft = await baseDraft(existing, registry, { games: [gameWithNewComposition] });
  const plan = await buildImportPlan({ seasonKey: SEASON_KEY, draft, existingSeasonData: existing, existingRegistry: registry, sourceSeasonGames: SOURCE_SEASON_GAMES });
  assertTrue(plan.ok, 'geänderte Besetzung derselben Gruppe (gleiche groupId) wird akzeptiert');
  const mergedGroup = plan.mergedSeasonData.games.find((g) => g.gameId === 80001).groups[0];
  assertEqual(mergedGroup.groupId, GROUP_1, 'groupId bleibt trotz geänderter Besetzung unverändert');
  assertEqual(mergedGroup.players.map((p) => p.playerId).sort(), ['api:90001', 'api:90002', 'api:90004'].sort(), 'neue Besetzung übernommen');
}

console.log('');
console.log('== Registry: createdInSeason/createdInGame sind unveränderlich für bestehende Einträge ==');
{
  const existing = existingSeasonDataFixture();
  const registry = existingRegistryFixture();
  const tampered = { groupId: GROUP_1, currentName: 'Reihe Eins', createdInSeason: SEASON_KEY, createdInGame: 80002, nameHistory: registry.groups[0].nameHistory };
  const draft = await baseDraft(existing, registry, { groups: [tampered] });
  const plan = await buildImportPlan({ seasonKey: SEASON_KEY, draft, existingSeasonData: existing, existingRegistry: registry, sourceSeasonGames: SOURCE_SEASON_GAMES });
  assertFalse(plan.ok, 'createdInGame-Änderung an bestehendem Registry-Eintrag -> HARD FAIL');
  assertContains(plan.errors, 'dürfen bei einem bestehenden Eintrag nicht verändert werden', 'Fehlermeldung benennt die verletzte Unveränderlichkeit');
}

console.log('');
console.log('== N) Dry-Run: Entscheidungslogik verhindert jeden Schreibvorgang ==');
{
  // Kann in dieser Umgebung NICHT den echten node:fs-Schreibvorgang testen
  // (kein Node.js installiert, Browser hat keinen Dateisystemzugriff). Diese
  // Prüfung verifiziert stattdessen ECHT AUSGEFÜHRT die Planberechnung, die
  // main() zugrunde legt: main() ruft writeJsonAtomic() ausschließlich hinter
  // `if (!wantsWrite) { ...; return; }` auf (siehe scripts/import-lineup-data.mjs) —
  // ohne --write wird dieser Codepfad nie erreicht, unabhängig vom Ergebnis.
  const existing = existingSeasonDataFixture();
  const registry = existingRegistryFixture();
  const draft = await baseDraft(existing, registry, { games: [JSON.parse(JSON.stringify(existing.games[0]))] });
  const plan = await buildImportPlan({ seasonKey: SEASON_KEY, draft, existingSeasonData: existing, existingRegistry: registry, sourceSeasonGames: SOURCE_SEASON_GAMES });
  assertTrue(plan.ok, 'gültiger Plan wird korrekt berechnet, unabhängig vom --write-Flag (das main() separat prüft)');
}

console.log('');
console.log('== O) Write-Modus: der Plan liefert ein vollständiges, konsistentes Schreibziel ==');
{
  // Ebenfalls kein echter node:fs-Test (siehe N). Bestätigt wird, dass ein
  // gültiger Plan main() ein VOLLSTÄNDIGES Dokument zum Schreiben übergibt
  // (kein Diff/Patch) — main() reicht mergedSeasonData/mergedRegistry
  // unverändert an writeJsonAtomic() (Temp-Datei + rename) weiter.
  const existing = existingSeasonDataFixture();
  const registry = existingRegistryFixture();
  const newGroup = { groupId: GROUP_2, currentName: 'Weitere Gruppe', createdInSeason: SEASON_KEY, createdInGame: 80001, nameHistory: [{ name: 'Weitere Gruppe', since: { season: SEASON_KEY, gameId: 80001 } }] };
  const draft = await baseDraft(existing, registry, { groups: [newGroup] });
  const plan = await buildImportPlan({ seasonKey: SEASON_KEY, draft, existingSeasonData: existing, existingRegistry: registry, sourceSeasonGames: SOURCE_SEASON_GAMES });
  assertTrue(plan.ok, 'gültiger Plan für Write-Modus berechnet');
  assertEqual(plan.mergedSeasonData.schemaVersion, 1, 'mergedSeasonData ist ein vollständiges, valides Dokument');
  assertEqual(plan.mergedRegistry.groups.length, 2, 'mergedRegistry enthält bestehenden + neuen Eintrag vollständig');
  assertTrue(plan.registryChanged, 'registryChanged korrekt erkannt (main() würde also auch groups.json schreiben)');
}

console.log('');
console.log('== P) Fehlschlagende Validierung -> main() erreicht writeJsonAtomic gar nicht erst ==');
{
  const existing = existingSeasonDataFixture();
  const registry = existingRegistryFixture();
  const badGame = { gameId: 999999, roster: { field: ['api:90001'], goalies: ['api:90010'] }, groups: [], confirmedCombinations: [], note: '' };
  const draft = await baseDraft(existing, registry, { games: [badGame] });
  const plan = await buildImportPlan({ seasonKey: SEASON_KEY, draft, existingSeasonData: existing, existingRegistry: registry, sourceSeasonGames: SOURCE_SEASON_GAMES });
  assertFalse(plan.ok, 'ungültiger Draft (unbekannte gameId) liefert plan.ok=false');
  // main() prüft "if (!plan.ok) { ...; return; }" UNMITTELBAR vor dem
  // einzigen writeJsonAtomic-Aufruf für die Season-Datei — bei
  // plan.ok===false wird dieser Codepfad nie erreicht, die bestehende Datei
  // bliebe dadurch unverändert. Der echte node:fs-Aufruf selbst ist in
  // dieser Umgebung nicht ausführbar (siehe N).
}

console.log('');
console.log('== Q) finaler Cross-File-Check: Gruppenreferenz ohne Registry-Eintrag ==');
{
  const existing = existingSeasonDataFixture();
  const registry = existingRegistryFixture();
  const game = {
    gameId: 80002,
    roster: { field: ['api:90001', 'api:90002', 'api:90004'], goalies: ['api:90010'] },
    groups: [{ groupId: GROUP_2, name: 'Unregistrierte Gruppe', type: 'trio', players: [{ playerId: 'api:90001' }, { playerId: 'api:90002' }, { playerId: 'api:90004' }], notes: '' }],
    confirmedCombinations: [],
    note: '',
  };
  const draft = await baseDraft(existing, registry, { games: [game] }); // KEIN draft.groups-Eintrag für GROUP_2
  const plan = await buildImportPlan({ seasonKey: SEASON_KEY, draft, existingSeasonData: existing, existingRegistry: registry, sourceSeasonGames: SOURCE_SEASON_GAMES });
  assertFalse(plan.ok, 'Spiel referenziert eine groupId, die nach dem Merge nicht in der Registry existiert -> HARD FAIL');
  assertContains(plan.errors, 'nicht in lineup-data/groups.json registriert', 'Fehlermeldung benennt die fehlende Registry-Referenz');
}

console.log('');
console.log('== R) schemaVersion > 1 -> HARD FAIL ==');
{
  const existing = existingSeasonDataFixture();
  const registry = existingRegistryFixture();
  const draft = await baseDraft(existing, registry, { schemaVersion: 2 });
  const plan = await buildImportPlan({ seasonKey: SEASON_KEY, draft, existingSeasonData: existing, existingRegistry: registry, sourceSeasonGames: SOURCE_SEASON_GAMES });
  assertFalse(plan.ok, 'schemaVersion 2 (höher als unterstützt) -> HARD FAIL');
}

console.log('');
console.log('== S) Draft season != Zielseason -> HARD FAIL ==');
{
  const existing = existingSeasonDataFixture();
  const registry = existingRegistryFixture();
  const draft = await baseDraft(existing, registry, { season: '24/25' });
  const plan = await buildImportPlan({ seasonKey: SEASON_KEY, draft, existingSeasonData: existing, existingRegistry: registry, sourceSeasonGames: SOURCE_SEASON_GAMES });
  assertFalse(plan.ok, 'draft.season weicht vom angegebenen Ziel-Season-Key ab -> HARD FAIL');
}

console.log('');
console.log('== T) mehrere Games, nur eines geändert -> alle anderen bleiben unverändert ==');
{
  const existing = existingSeasonDataFixture();
  existing.games.push({ gameId: 80002, roster: { field: ['api:90004'], goalies: ['api:90010'] }, groups: [], confirmedCombinations: [], note: '' });
  existing.games.push({ gameId: 80003, roster: { field: ['api:90003'], goalies: ['api:90010'] }, groups: [], confirmedCombinations: [], note: '' });
  const registry = existingRegistryFixture();
  const changedGame80002 = { gameId: 80002, roster: { field: ['api:90004', 'api:90001'], goalies: ['api:90010'] }, groups: [], confirmedCombinations: [], note: 'geändert' };
  const draft = await baseDraft(existing, registry, { games: [changedGame80002] });
  const plan = await buildImportPlan({ seasonKey: SEASON_KEY, draft, existingSeasonData: existing, existingRegistry: registry, sourceSeasonGames: SOURCE_SEASON_GAMES });
  assertTrue(plan.ok, 'Draft mit 3 bestehenden Spielen, nur eines geändert, ist gültig');
  assertEqual(plan.diff.games.changed, [80002], 'nur 80002 als geändert erkannt');
  assertEqual(plan.diff.games.unchanged.sort(), [80001, 80003].sort(), '80001 und 80003 bleiben unverändert');
  const g80001 = plan.mergedSeasonData.games.find((g) => g.gameId === 80001);
  const g80003 = plan.mergedSeasonData.games.find((g) => g.gameId === 80003);
  assertEqual(canonicalJson(g80001), canonicalJson(existing.games.find((g) => g.gameId === 80001)), 'Spiel 80001 im Endzustand identisch zum ursprünglichen Eintrag');
  assertEqual(canonicalJson(g80003), canonicalJson(existing.games.find((g) => g.gameId === 80003)), 'Spiel 80003 im Endzustand identisch zum ursprünglichen Eintrag');
}

// ═════════════════════════════════════════════════════════════════════════
// Teil 3: struktureller/Cross-File-Smoke-Test gegen die echten Dateien
// (nur lesend, kein Schreiben, keine Behauptung über echte Einsatzdaten)
// ═════════════════════════════════════════════════════════════════════════
console.log('');
console.log('== Realer Smoke-Test gegen die tatsächlich vorhandenen Dateien ==');
{
  const realSeasonData = JSON.parse(await readFile(path.join(REPO_ROOT, 'lineup-data', '25-26.json'), 'utf8'));
  const realRegistry = JSON.parse(await readFile(path.join(REPO_ROOT, 'lineup-data', 'groups.json'), 'utf8'));
  const realSourceSeasonData = JSON.parse(await readFile(path.join(REPO_ROOT, 'season-data', '25-26.json'), 'utf8'));

  const noOpDraft = await baseDraft(realSeasonData, realRegistry, { season: '25/26', games: [], groups: [] });
  const plan = await buildImportPlan({ seasonKey: '25/26', draft: noOpDraft, existingSeasonData: realSeasonData, existingRegistry: realRegistry, sourceSeasonGames: realSourceSeasonData.games });
  assertFalse(
    plan.ok,
    'Leer-Draft (keine Änderungen) gegen die echten Dateien: erwartungsgemäß FEHLER, weil die vorhandene lineup-data/25-26.json ' +
      'selbst nur synthetische Phase-1-Platzhalterdaten (gameId 99999001) enthält, die nicht in der echten season-data existieren ' +
      '— bestätigt NUR, dass der finale Cross-File-Check auch gegen echte Dateien korrekt greift',
  );
  assertContains(plan.errors, 'existiert nicht in season-data', 'Fehlermeldung benennt die bekannte, erwartete Platzhalter-Diskrepanz');

  const realPlayerIds = derivePlayerIdsFromSeasonGames(realSourceSeasonData.games);
  const twoRealPlayerIds = [...realPlayerIds].slice(0, 2);
  assertEqual(twoRealPlayerIds.length, 2, 'Vorbedingung: mindestens 2 echte Spieler-IDs aus season-data/25-26.json verfügbar');

  const realGameId = realSourceSeasonData.games[0].id;
  const freshExisting = { schemaVersion: 1, season: '25/26', games: [] };
  const freshRegistry = { schemaVersion: 1, groups: [] };
  const testGame = {
    gameId: realGameId,
    roster: { field: twoRealPlayerIds, goalies: [] },
    groups: [],
    confirmedCombinations: [],
    note: 'rein synthetischer Testfall für den Importer — KEINE echte Einsatzbehauptung',
  };
  const positiveDraft = await baseDraft(freshExisting, freshRegistry, { games: [testGame] });
  const positivePlan = await buildImportPlan({ seasonKey: '25/26', draft: positiveDraft, existingSeasonData: freshExisting, existingRegistry: freshRegistry, sourceSeasonGames: realSourceSeasonData.games });
  assertTrue(positivePlan.ok, `positiver Cross-File-Smoke-Test: synthetisches Testspiel mit echter gameId (${realGameId}) und zwei echten Spieler-IDs aus season-data/25-26.json wird korrekt akzeptiert`);
}

// ─────────────────────────────────────────────────────────────────────────
console.log('');
if (failures > 0) {
  console.log(`${failures} Test(s) fehlgeschlagen.`);
  process.exitCode = 1;
} else {
  console.log('Alle Tests erfolgreich.');
}

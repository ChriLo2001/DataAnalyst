#!/usr/bin/env node
// Offline-Testharness für scripts/lineup-data-validators.mjs — kein Netzwerk,
// kein API-Key. Teil 1 prüft künstliche, in-memory erzeugte Testfälle
// (gültig / mehrere Spiele / Fehler / Warnungen / kein Auto-Reparieren).
// Teil 2 prüft die Validatoren strukturell gegen die tatsächlich vorhandenen
// Dateien lineup-data/25-26.json, lineup-data/groups.json und (nur lesend,
// nur als Kontextquelle für gültige Player-/Game-IDs) season-data/25-26.json.
//
// WICHTIG: lineup-data/25-26.json enthält ausschließlich synthetische
// Platzhalterdaten (gameId 99999001, Spieler-IDs api:9000xx). Das sind KEINE
// echten VfB-Ulm-Einsatzdaten. Ein Cross-Check gegen die echte
// season-data/25-26.json meldet deshalb ERWARTET einen unbekannten gameId/
// Player-ID-Fehler — das beweist, dass der Cross-Checker echte Abweichungen
// tatsächlich erkennt, keine Behauptung über reale Einsätze.
//
// Aufruf: node scripts/test-lineup-data-validators.mjs

import { readFile } from 'node:fs/promises';
import path from 'node:path';

import {
  LINEUP_SCHEMA_VERSION,
  isValidUuidV4,
  isValidLineupPlayerIdFormat,
  isValidSeasonKeyFormat,
  getCanonicalCombinationKey,
  findDuplicates,
  findDuplicatePlayerIds,
  findDuplicateGroupIds,
  findDuplicateLineupGameIds,
  derivePlayerIdsFromSeasonGames,
  validateRoster,
  validateGroup,
  validateCombination,
  validateLineupGame,
  validateLineupSeasonData,
  validateGroupRegistry,
  crossValidateGamesAgainstSeasonData,
  crossValidateGroupReferences,
} from './lineup-data-validators.mjs';

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
function assertFalse(cond, label) {
  assertEqual(Boolean(cond), false, label);
}
function assertContains(arr, needleSubstring, label) {
  const hit = (arr ?? []).some((s) => String(s).includes(needleSubstring));
  assertTrue(hit, `${label} (enthält "${needleSubstring}")`);
}

// ─────────────────────────────────────────────────────────────────────────
// Feste Testwerte
// ─────────────────────────────────────────────────────────────────────────

const P1 = 'api:9001';
const P2 = 'api:9002';
const P3 = 'api:9003';
const P4 = 'api:9004';
const P5 = 'api:9005';
const P6 = 'api:9006';
const P7 = 'api:9007';
const GK = 'api:9010';
const GK2 = 'api:9011';

const VALID_IDS = new Set([P1, P2, P3, P4, P5, P6, P7, GK, GK2]);

const UUID_A = '11111111-1111-4111-8111-111111111111';
const UUID_B = '22222222-2222-4222-8222-222222222222';
const UUID_C = '33333333-3333-4333-8333-333333333333';
const UUID_D = '44444444-4444-4444-8444-444444444444';

function sampleRoster(overrides = {}) {
  return { field: [P1, P2, P3, P4, P5], goalies: [GK], ...overrides };
}
function sampleTrioGroup(overrides = {}) {
  return {
    groupId: UUID_A,
    name: 'Trio Gruppe',
    type: 'trio',
    players: [
      { playerId: P1, position: 'Verteidiger' },
      { playerId: P2, position: 'Verteidiger' },
      { playerId: P3, position: 'Flügel' },
    ],
    notes: '',
    ...overrides,
  };
}
function sampleRotation4Group(overrides = {}) {
  return {
    groupId: UUID_B,
    name: 'Rotation Vier',
    type: 'rotation4',
    players: [
      { playerId: P1, position: 'Center' },
      { playerId: P2, position: 'Flügel 1' },
      { playerId: P3, position: 'Flügel 2' },
      { playerId: P4, position: 'Flex' },
    ],
    notes: '',
    ...overrides,
  };
}
function sampleRotation5Group(overrides = {}) {
  return {
    groupId: UUID_C,
    name: 'Rotation Fünf',
    type: 'rotation5',
    players: [
      { playerId: P1, position: 'Verteidiger' },
      { playerId: P2, position: 'Verteidiger' },
      { playerId: P3, position: 'Center' },
      { playerId: P4, position: 'Flügel' },
      { playerId: P5, position: 'Flügel' },
    ],
    notes: '',
    ...overrides,
  };
}
function sampleCombination(overrides = {}) {
  return { players: [P1, P2, P3], groupId: UUID_A, note: '', ...overrides };
}
function sampleGame(overrides = {}) {
  return {
    gameId: 50001,
    roster: sampleRoster(),
    groups: [sampleTrioGroup()],
    confirmedCombinations: [sampleCombination()],
    note: '',
    ...overrides,
  };
}

// ═════════════════════════════════════════════════════════════════════════
// Teil 1a: Grundbausteine
// ═════════════════════════════════════════════════════════════════════════
console.log('== Grundbausteine ==');
assertTrue(isValidUuidV4(UUID_A), 'gültige UUIDv4 wird erkannt');
assertFalse(isValidUuidV4('not-a-uuid'), 'ungültige UUID wird abgelehnt');
assertFalse(isValidUuidV4('11111111-1111-1111-8111-111111111111'), 'UUID ohne Versions-Nibble "4" wird abgelehnt');
assertFalse(isValidUuidV4('11111111-1111-4111-1111-111111111111'), 'UUID mit ungültigem Varianten-Nibble wird abgelehnt');

assertTrue(isValidLineupPlayerIdFormat('api:324'), '"api:324" ist gültiges Format');
assertFalse(isValidLineupPlayerIdFormat('name:mustermann'), '"name:..." ist NICHT erlaubt');
assertFalse(isValidLineupPlayerIdFormat('api:'), '"api:" ohne Zahl ist ungültig');
assertFalse(isValidLineupPlayerIdFormat(324), 'nicht-String ist ungültig');

assertTrue(isValidSeasonKeyFormat('25/26'), '"25/26" ist gültiges Season-Format');
assertFalse(isValidSeasonKeyFormat('2025/26'), '"2025/26" ist ungültiges Season-Format');

assertEqual(getCanonicalCombinationKey([P3, P1, P2]), 'api:9001|api:9002|api:9003', 'kanonischer Key sortiert unabhängig von Eingabereihenfolge');
assertEqual(findDuplicates(['a', 'b', 'a', 'c', 'b', 'b']), [{ value: 'a', count: 2 }, { value: 'b', count: 3 }], 'findDuplicates zählt korrekt');
assertEqual(findDuplicatePlayerIds([P1, P2, P1]), [{ value: P1, count: 2 }], 'findDuplicatePlayerIds');
assertEqual(findDuplicateGroupIds([{ groupId: UUID_A }, { groupId: UUID_A }]), [{ value: UUID_A, count: 2 }], 'findDuplicateGroupIds');
assertEqual(findDuplicateLineupGameIds([{ gameId: 1 }, { gameId: 1 }, { gameId: 2 }]), [{ value: '1', count: 2 }], 'findDuplicateLineupGameIds');
assertEqual(findDuplicateGroupIds([{ groupId: undefined }, { groupId: undefined }, { name: 'ohne id' }]), [], 'findDuplicateGroupIds meldet ID-lose Einträge NICHT als doppelte "undefined"-ID (Hardening)');
assertEqual(findDuplicateLineupGameIds([{}, {}, { gameId: 1 }]), [], 'findDuplicateLineupGameIds meldet ID-lose Einträge NICHT als doppelte "undefined"-ID (Hardening)');

{
  const derived = derivePlayerIdsFromSeasonGames([
    { players: { home: [{ player_id: 324 }, { player_id: '' }, { player_id: null }], guest: [{ player_id: 18720 }] } },
    { players: { home: [{ player_id: 324 }], guest: [] } },
  ]);
  assertEqual([...derived].sort(), ['api:18720', 'api:324'], 'derivePlayerIdsFromSeasonGames: leere/null-IDs ignoriert, Duplikate zusammengeführt, kein "name:"-Fallback');
}

// ═════════════════════════════════════════════════════════════════════════
// Teil 1b: Fall A — gültige Einzel-Bausteine
// ═════════════════════════════════════════════════════════════════════════
console.log('');
console.log('== Fall A: gültige Bausteine ==');
{
  const r = validateRoster(sampleRoster(), { validPlayerIds: VALID_IDS });
  assertTrue(r.ok, 'gültiger Kader ist ok');
  assertEqual(r.errors, [], 'gültiger Kader hat keine Fehler');
}
{
  const r = validateGroup(sampleTrioGroup(), { rosterFieldSet: new Set([P1, P2, P3]) });
  assertTrue(r.ok, '3er-Gruppe (trio) ist gültig');
}
{
  const r = validateGroup(sampleRotation4Group(), { rosterFieldSet: new Set([P1, P2, P3, P4]) });
  assertTrue(r.ok, '4er-Wechselgruppe (rotation4) ist gültig');
}
{
  const r = validateGroup(sampleRotation5Group(), { rosterFieldSet: new Set([P1, P2, P3, P4, P5]) });
  assertTrue(r.ok, '5er-Wechselgruppe (rotation5) ist gültig');
}
{
  // mehrere Gruppen + Spieler in mehreren Gruppen: P1 ist in Trio UND Rotation4
  const game = sampleGame({
    roster: sampleRoster({ field: [P1, P2, P3, P4, P5] }),
    groups: [sampleTrioGroup(), sampleRotation4Group()],
    confirmedCombinations: [],
  });
  const r = validateLineupGame(game, { validPlayerIds: VALID_IDS });
  assertTrue(r.ok, 'mehrere Gruppen + Spieler (P1) in mehreren Gruppen gleichzeitig ist gültig');
}
{
  // Spieler im Kader, aber in keiner Gruppe (P5 taucht in keiner Gruppe auf)
  const game = sampleGame({
    roster: sampleRoster({ field: [P1, P2, P3, P4, P5] }),
    groups: [sampleTrioGroup()],
    confirmedCombinations: [],
  });
  const r = validateLineupGame(game, { validPlayerIds: VALID_IDS });
  assertTrue(r.ok, 'Spieler im Kader ohne jede Gruppenzugehörigkeit ist ausdrücklich erlaubt');
}
{
  const group = sampleTrioGroup({ players: [{ playerId: P1, position: 'Verteidiger' }, { playerId: P2 }, { playerId: P3, position: null }] });
  const r = validateGroup(group, { rosterFieldSet: new Set([P1, P2, P3]) });
  assertTrue(r.ok, 'fehlende/null Position ist erlaubt');
}
{
  const group = sampleTrioGroup({ players: [{ playerId: P1, position: 'Top' }, { playerId: P2, position: 'Irgendwas Freies' }, { playerId: P3, position: 'XYZ' }] });
  const r = validateGroup(group, { rosterFieldSet: new Set([P1, P2, P3]) });
  assertTrue(r.ok, 'völlig freie, nicht vordefinierte Positionswerte sind erlaubt (kein Enum)');
}
{
  const r = validateCombination(sampleCombination({ groupId: UUID_A }), {
    rosterFieldSet: new Set([P1, P2, P3]),
    rosterGoalieSet: new Set([GK]),
    groupIdsInGame: new Set([UUID_A]),
  });
  assertTrue(r.ok, 'Kombination MIT groupId ist gültig');
  assertEqual(r.warnings, [], 'Kombination mit groupId erzeugt keine "ohne groupId"-Warnung');
}
{
  const r = validateCombination(sampleCombination({ groupId: undefined }), {
    rosterFieldSet: new Set([P1, P2, P3]),
    rosterGoalieSet: new Set([GK]),
  });
  assertTrue(r.ok, 'Kombination OHNE groupId ist strukturell gültig (nur Warnung, siehe Fall D)');
}

// ═════════════════════════════════════════════════════════════════════════
// Teil 1c: Fall B — mehrere Spiele
// ═════════════════════════════════════════════════════════════════════════
console.log('');
console.log('== Fall B: mehrere Spiele, saisonweite Gruppen-Historie ==');
{
  const seasonData = {
    schemaVersion: 1,
    season: '25/26',
    games: [
      sampleGame({ gameId: 50001 }),
      sampleGame({
        gameId: 50002,
        roster: sampleRoster({ field: [P1, P2, P6, P4, P5] }),
        // gleiche groupId (UUID_A) wie in Spiel 50001, aber andere Besetzung:
        // P3 raus, P6 rein — Gruppenidentität bleibt trotz Besetzungswechsel stabil.
        groups: [sampleTrioGroup({ players: [{ playerId: P1, position: 'Verteidiger' }, { playerId: P2, position: 'Verteidiger' }, { playerId: P6, position: 'Flügel' }] })],
        confirmedCombinations: [sampleCombination({ players: [P1, P2, P6] })],
      }),
    ],
  };
  const r = validateLineupSeasonData(seasonData, { validPlayerIds: VALID_IDS });
  assertTrue(r.ok, 'mehrere Spiele mit gleicher groupId, unterschiedlicher Besetzung: strukturell gültig');
  assertEqual(r.errors, [], 'keine Fehler bei legitimer Besetzungsänderung derselben Gruppe über Spiele hinweg');
}

// ═════════════════════════════════════════════════════════════════════════
// Teil 1d: Fall C — Fehlerfälle (harter Abbruch)
// ═════════════════════════════════════════════════════════════════════════
console.log('');
console.log('== Fall C: Fehlerfälle ==');

{
  const data = { schemaVersion: 1, season: '25/26', games: [sampleGame({ gameId: 1 }), sampleGame({ gameId: 1, roster: sampleRoster({ field: [P6, P7], goalies: [GK2] }), groups: [], confirmedCombinations: [] })] };
  const r = validateLineupSeasonData(data, { validPlayerIds: VALID_IDS });
  assertFalse(r.ok, 'doppelte gameId → Fehler');
  assertContains(r.errors, 'doppelte gameId', 'Fehlermeldung nennt doppelte gameId');
}
{
  const r = crossValidateGamesAgainstSeasonData({ games: [{ gameId: 999999 }] }, [{ id: 1 }, { id: 2 }]);
  assertFalse(r.ok, 'unbekannte gameId (Cross-Check gegen season-data) → Fehler');
}
{
  const r = validateRoster(sampleRoster({ field: [P1, 'api:77777'] }), { validPlayerIds: VALID_IDS });
  assertFalse(r.ok, 'unbekannte Player-ID (nicht in season-data der Saison) → Fehler');
}
{
  const r = validateRoster(sampleRoster({ field: [P1, 'name:mustermann'] }), { validPlayerIds: VALID_IDS });
  assertFalse(r.ok, '"name:"-ID ist in lineup-data grundsätzlich verboten → Fehler');
  assertContains(r.errors, 'ungültiges Player-ID-Format', 'Fehlermeldung nennt ungültiges Format');
}
{
  const r = validateRoster(sampleRoster({ field: [P1, P2, P1] }), { validPlayerIds: VALID_IDS });
  assertFalse(r.ok, 'doppelter Spieler im roster.field → Fehler');
}
{
  const r = validateRoster(sampleRoster({ field: [P1, P2, GK], goalies: [GK] }), { validPlayerIds: VALID_IDS });
  assertFalse(r.ok, 'Spieler gleichzeitig field UND goalie → Fehler');
}
{
  const group = sampleTrioGroup({ players: [{ playerId: P1 }, { playerId: P2 }, { playerId: P1 }] });
  const r = validateGroup(group, { rosterFieldSet: new Set([P1, P2, P3]) });
  assertFalse(r.ok, 'doppelter Spieler innerhalb einer Gruppe → Fehler');
}
{
  const group = sampleTrioGroup({ players: [{ playerId: P1 }, { playerId: P2 }, { playerId: P6 }] });
  const r = validateGroup(group, { rosterFieldSet: new Set([P1, P2, P3]) }); // P6 NICHT im Kader
  assertFalse(r.ok, 'Gruppe enthält Nicht-Kaderspieler → Fehler');
}
{
  const r = validateGroup(sampleTrioGroup({ players: [] }), { rosterFieldSet: new Set([P1, P2, P3]) });
  assertFalse(r.ok, 'leere Gruppe (0 Spieler) → Fehler');
}
{
  const r = validateCombination(sampleCombination({ players: [P1, P2] }), { rosterFieldSet: new Set([P1, P2, P3]), rosterGoalieSet: new Set([GK]) });
  assertFalse(r.ok, 'Kombination mit 2 Spielern → Fehler');
}
{
  const r = validateCombination(sampleCombination({ players: [P1, P2, P3, P4] }), { rosterFieldSet: new Set([P1, P2, P3, P4]), rosterGoalieSet: new Set([GK]) });
  assertFalse(r.ok, 'Kombination mit 4 Spielern → Fehler');
}
{
  const r = validateCombination(sampleCombination({ players: [P1, P1, P2] }), { rosterFieldSet: new Set([P1, P2, P3]), rosterGoalieSet: new Set([GK]) });
  assertFalse(r.ok, 'Kombination mit doppeltem Spieler → Fehler');
}
{
  const r = validateCombination(sampleCombination({ players: [P1, P2, GK] }), { rosterFieldSet: new Set([P1, P2, P3]), rosterGoalieSet: new Set([GK]) });
  assertFalse(r.ok, 'Kombination enthält Torwart → Fehler');
}
{
  const r = validateCombination(sampleCombination({ players: [P1, P2, P6] }), { rosterFieldSet: new Set([P1, P2, P3]), rosterGoalieSet: new Set([GK]) });
  assertFalse(r.ok, 'Kombination enthält Nicht-Kaderspieler → Fehler');
}
{
  const game = sampleGame({
    roster: sampleRoster({ field: [P1, P2, P3, P4] }),
    groups: [sampleTrioGroup()],
    confirmedCombinations: [sampleCombination({ players: [P1, P2, P3] }), sampleCombination({ players: [P3, P1, P2] })], // gleiche Menge, andere Reihenfolge
  });
  const r = validateLineupGame(game, { validPlayerIds: VALID_IDS });
  assertFalse(r.ok, 'doppelte Kombination (gleiche Spielermenge, andere Reihenfolge) → Fehler');
  assertContains(r.errors, 'doppelte bestätigte Kombination', 'Fehlermeldung nennt doppelte Kombination');
}
{
  const r = validateCombination(sampleCombination({ groupId: UUID_D }), { rosterFieldSet: new Set([P1, P2, P3]), rosterGoalieSet: new Set([GK]), groupIdsInGame: new Set([UUID_A]) });
  assertFalse(r.ok, 'Kombination referenziert groupId, die in diesem Spiel nicht existiert → Fehler');
}
{
  const game = sampleGame({ groups: [sampleTrioGroup({ groupId: UUID_A }), sampleRotation4Group({ groupId: UUID_A })] });
  const r = validateLineupGame(game, { validPlayerIds: VALID_IDS });
  assertFalse(r.ok, 'doppelte groupId innerhalb desselben Spiels → Fehler');
}
{
  const r = validateGroup(sampleTrioGroup({ groupId: 'nicht-mal-eine-uuid' }), { rosterFieldSet: new Set([P1, P2, P3]) });
  assertFalse(r.ok, 'ungültige UUID als groupId → Fehler');
}
{
  const data = { schemaVersion: 1, season: '25/26', games: [], unbekanntesFeld: 'x' };
  const r = validateLineupSeasonData(data, {});
  assertFalse(r.ok, 'unbekanntes Top-Level-Feld → Fehler');
  assertContains(r.errors, 'unbekanntesFeld', 'Fehlermeldung nennt das unbekannte Feld beim Namen');
}
{
  const r = validateLineupSeasonData({ schemaVersion: 2, season: '25/26', games: [] }, {});
  assertFalse(r.ok, 'falsche schemaVersion → Fehler');
}
{
  const r = validateLineupSeasonData({ schemaVersion: 1, season: '24/25', games: [] }, { expectedSeasonKey: '25/26' });
  assertFalse(r.ok, 'season passt nicht zur erwarteten Saison → Fehler');
}
{
  const r = validateGroupRegistry({ schemaVersion: 1, groups: 'kaputt' });
  assertFalse(r.ok, 'kaputte Registry (groups kein Array) → Fehler');
}
{
  const registry = {
    schemaVersion: 1,
    groups: [{ groupId: UUID_A, currentName: 'X', createdInSeason: '25/26', createdInGame: 1, nameHistory: 'kaputt' }],
  };
  const r = validateGroupRegistry(registry);
  assertFalse(r.ok, 'kaputte nameHistory (kein Array) → Fehler');
}
{
  const registry = {
    schemaVersion: 1,
    groups: [
      { groupId: UUID_A, currentName: 'X', createdInSeason: '25/26', createdInGame: 1, nameHistory: [{ name: 'X', since: { season: '25/26', gameId: 1 } }, { name: 'X', since: { season: '25/26', gameId: 1 } }] },
    ],
  };
  const r = validateGroupRegistry(registry);
  assertFalse(r.ok, 'identischer nameHistory-Eintrag doppelt → Fehler');
}
{
  const registry = { schemaVersion: 1, groups: [{ groupId: UUID_A, currentName: 'X', createdInSeason: '25/26', createdInGame: 1, nameHistory: [] }, { groupId: UUID_A, currentName: 'Y', createdInSeason: '25/26', createdInGame: 2, nameHistory: [] }] };
  const r = validateGroupRegistry(registry);
  assertFalse(r.ok, 'doppelte groupId in der Registry → Fehler');
}
{
  const r = crossValidateGroupReferences({ games: [{ gameId: 1, groups: [{ groupId: UUID_D }], confirmedCombinations: [] }] }, { schemaVersion: 1, groups: [{ groupId: UUID_A }] });
  assertFalse(r.ok, 'groupId in lineup-data ohne passenden Registry-Eintrag → Fehler');
}
{
  const registry = { schemaVersion: 1, groups: [{ groupId: UUID_A, currentName: 'X', createdInSeason: '25/26', createdInGame: 999999, nameHistory: [] }] };
  const known = new Map([['25/26', new Set([1, 2, 3])]]);
  const r = validateGroupRegistry(registry, { knownGameIdsBySeason: known });
  assertFalse(r.ok, 'Registry createdInGame existiert nicht in season-data (Saison bekannt) → Fehler');
  assertContains(r.errors, 'createdInGame', 'Fehlermeldung nennt createdInGame');
}
{
  // Hardening (Punkt 1): createdInSeason referenziert eine Saison, für die
  // knownGameIdsBySeason gar keinen Eintrag hat (z.B. Tippfehler) — darf NICHT
  // stillschweigend übersprungen werden, sondern muss hart abbrechen.
  const registry = { schemaVersion: 1, groups: [{ groupId: UUID_A, currentName: 'X', createdInSeason: '99/00', createdInGame: 1, nameHistory: [] }] };
  const known = new Map([['25/26', new Set([1, 2, 3])]]);
  const r = validateGroupRegistry(registry, { knownGameIdsBySeason: known });
  assertFalse(r.ok, 'Hardening: createdInSeason ohne Eintrag in knownGameIdsBySeason → Fehler statt stillem Überspringen');
  assertContains(r.errors, 'ist keiner bekannten Saison zuordenbar', 'Fehlermeldung nennt die nicht zuordenbare Saison');
}
{
  // Ohne knownGameIdsBySeason bleibt das Verhalten unverändert: reine
  // Formatprüfung, keine Existenzprüfung möglich/gefordert.
  const registry = { schemaVersion: 1, groups: [{ groupId: UUID_A, currentName: 'X', createdInSeason: '99/00', createdInGame: 1, nameHistory: [] }] };
  const r = validateGroupRegistry(registry);
  assertTrue(r.ok, 'ohne knownGameIdsBySeason wird createdInSeason nur formal geprüft (unverändertes Verhalten)');
}
{
  // Hardening (Punkt 5): game.roster fehlt komplett → harter Fehler, kein Crash,
  // keine automatische Reparatur (kein synthetisch ergänztes leeres roster).
  const game = { gameId: 1, groups: [], confirmedCombinations: [] };
  const before = JSON.stringify(game);
  const r = validateLineupGame(game, { validPlayerIds: VALID_IDS });
  assertFalse(r.ok, 'Hardening: game.roster fehlt komplett → Fehler, kein Crash');
  assertContains(r.errors, 'roster fehlt', 'Fehlermeldung nennt fehlendes roster');
  assertEqual(JSON.stringify(game), before, 'game-Objekt bleibt unverändert (kein automatisch ergänztes roster)');
}
{
  // Hardening (Punkt 2): unbekanntes Feld auf roster-Ebene
  const r = validateRoster({ field: [P1], goalies: [GK], unbekannt: 'x' }, { validPlayerIds: VALID_IDS });
  assertFalse(r.ok, 'Hardening: unbekanntes Feld auf roster-Ebene → Fehler');
  assertContains(r.errors, 'unbekanntes Feld', 'Fehlermeldung nennt unbekanntes Feld (roster)');
}
{
  // Hardening (Punkt 2): unbekanntes Feld auf group.players[i]-Ebene
  const group = sampleTrioGroup({ players: [{ playerId: P1, position: 'Verteidiger', unbekannt: 'x' }, { playerId: P2, position: 'Verteidiger' }, { playerId: P3, position: 'Flügel' }] });
  const r = validateGroup(group, { rosterFieldSet: new Set([P1, P2, P3]) });
  assertFalse(r.ok, 'Hardening: unbekanntes Feld auf group.players[i]-Ebene → Fehler');
  assertContains(r.errors, 'unbekanntes Feld', 'Fehlermeldung nennt unbekanntes Feld (group.players[i])');
}
{
  // Hardening (Punkt 2): unbekanntes Feld auf nameHistory-Eintrags-Ebene
  const registry = { schemaVersion: 1, groups: [{ groupId: UUID_A, currentName: 'X', createdInSeason: '25/26', createdInGame: 1, nameHistory: [{ name: 'X', since: { season: '25/26', gameId: 1 }, unbekannt: 'x' }] }] };
  const r = validateGroupRegistry(registry);
  assertFalse(r.ok, 'Hardening: unbekanntes Feld auf nameHistory-Eintrags-Ebene → Fehler');
  assertContains(r.errors, 'unbekanntes Feld', 'Fehlermeldung nennt unbekanntes Feld (nameHistory)');
}
{
  // Hardening (Punkt 2): unbekanntes Feld auf since-Ebene
  const registry = { schemaVersion: 1, groups: [{ groupId: UUID_A, currentName: 'X', createdInSeason: '25/26', createdInGame: 1, nameHistory: [{ name: 'X', since: { season: '25/26', gameId: 1, unbekannt: 'x' } }] }] };
  const r = validateGroupRegistry(registry);
  assertFalse(r.ok, 'Hardening: unbekanntes Feld auf since-Ebene → Fehler');
  assertContains(r.errors, 'unbekanntes Feld', 'Fehlermeldung nennt unbekanntes Feld (since)');
}

// ═════════════════════════════════════════════════════════════════════════
// Teil 1e: Fall D — Warnungen (Speicherung bleibt möglich)
// ═════════════════════════════════════════════════════════════════════════
console.log('');
console.log('== Fall D: Warnungen ==');
{
  const group = sampleRotation5Group({ players: sampleRotation5Group().players.slice(0, 4) });
  const r = validateGroup(group, { rosterFieldSet: new Set([P1, P2, P3, P4]) });
  assertTrue(r.ok, 'rotation5 mit nur 4 Spielern bleibt gültig (nur Warnung)');
  assertContains(r.warnings, 'erwartet üblicherweise', 'Warnung nennt Typ/Spielerzahl-Diskrepanz');
}
{
  const r = validateRoster(sampleRoster({ goalies: [] }));
  assertTrue(r.ok, 'Kader ohne Torwart bleibt gültig (nur Warnung)');
  assertContains(r.warnings, 'kein Torwart', 'Warnung nennt fehlenden Torwart');
}
{
  const bigField = Array.from({ length: 25 }, (_, i) => `api:${80000 + i}`);
  const r = validateRoster({ field: bigField, goalies: [GK] });
  assertTrue(r.ok, 'ungewöhnlich großer Kader bleibt gültig (nur Warnung)');
  assertContains(r.warnings, 'ungewöhnlich großer Kader', 'Warnung nennt Kadergröße');
}
{
  const data = {
    schemaVersion: 1,
    season: '25/26',
    games: [
      sampleGame({ gameId: 1, groups: [sampleTrioGroup({ groupId: UUID_A, name: 'Die Haie' })] }),
      sampleGame({ gameId: 2, roster: sampleRoster({ field: [P1, P2, P6] }), groups: [sampleTrioGroup({ groupId: UUID_B, name: 'Die Haie', players: [{ playerId: P1 }, { playerId: P2 }, { playerId: P6 }] })], confirmedCombinations: [] }),
    ],
  };
  const r = validateLineupSeasonData(data, { validPlayerIds: VALID_IDS });
  assertTrue(r.ok, 'gleicher Gruppenname mit unterschiedlichen groupId bleibt gültig (nur Warnung)');
  assertContains(r.warnings, 'unterschiedliche groupId-Werte', 'Warnung nennt Namenskollision');
}
{
  const r = validateCombination(sampleCombination({ groupId: undefined }), { rosterFieldSet: new Set([P1, P2, P3]), rosterGoalieSet: new Set([GK]) });
  assertTrue(r.ok, 'Kombination ohne groupId bleibt gültig (nur Warnung)');
  assertContains(r.warnings, 'ohne groupId', 'Warnung nennt fehlende groupId-Zuordnung');
}

// ═════════════════════════════════════════════════════════════════════════
// Teil 1f: kein automatisches Reparieren
// ═════════════════════════════════════════════════════════════════════════
console.log('');
console.log('== Kein automatisches Reparieren ==');
{
  const original = [P3, P1, P2];
  const combo = { players: [...original], groupId: UUID_A, note: '' };
  const before = JSON.stringify(combo.players);
  const result = validateCombination(combo, { rosterFieldSet: new Set([P1, P2, P3]), rosterGoalieSet: new Set([GK]), groupIdsInGame: new Set([UUID_A]) });
  assertEqual(combo.players, original, 'unsortierte, aber gültige Kombination wird vom Validator NICHT umsortiert');
  assertTrue(result.ok, 'unsortierte Kombination ist trotzdem gültig (Reihenfolge ist analytisch irrelevant)');
  assertEqual(JSON.stringify(combo.players), before, 'Eingabeobjekt bleibt byte-identisch nach der Validierung');
}
{
  // getCanonicalCombinationKey ist eine separate, rein lesende Ableitung —
  // sie verändert die Eingabe nicht und wird nicht automatisch in die
  // Rohdaten zurückgeschrieben.
  const players = [P3, P1, P2];
  const key = getCanonicalCombinationKey(players);
  assertEqual(players, [P3, P1, P2], 'getCanonicalCombinationKey verändert das übergebene Array nicht (Kopie, kein In-Place-Sort)');
  assertEqual(key, 'api:9001|api:9002|api:9003', 'abgeleiteter Key ist trotzdem korrekt sortiert');
}
{
  const data = { schemaVersion: 1, season: '25/26', games: [sampleGame()] };
  const before = JSON.stringify(data);
  validateLineupSeasonData(data, { validPlayerIds: VALID_IDS });
  assertEqual(JSON.stringify(data), before, 'validateLineupSeasonData verändert das Eingabeobjekt nicht');
}
{
  // Registry-Immutability (Hardening Punkt 3): kein Sortieren, Normalisieren,
  // keine ID-Änderung, keine automatische Ergänzung fehlender Einträge.
  const registry = {
    schemaVersion: 1,
    groups: [
      { groupId: UUID_B, currentName: 'Zweite Gruppe', createdInSeason: '25/26', createdInGame: 50002, nameHistory: [{ name: 'Zweite Gruppe', since: { season: '25/26', gameId: 50002 } }] },
      { groupId: UUID_A, currentName: 'Erste Gruppe', createdInSeason: '25/26', createdInGame: 50001, nameHistory: [{ name: 'Erste Gruppe', since: { season: '25/26', gameId: 50001 } }] },
    ],
  };
  const before = JSON.stringify(registry);
  const result = validateGroupRegistry(registry, { knownGameIdsBySeason: new Map([['25/26', new Set([50001, 50002])]]) });
  assertTrue(result.ok, 'gültige Registry (absichtlich unsortiert: UUID_B vor UUID_A) bleibt gültig');
  assertEqual(JSON.stringify(registry), before, 'validateGroupRegistry verändert das Eingabeobjekt nicht (keine Sortierung/Normalisierung/ID-Änderung/Ergänzung)');
}

// ═════════════════════════════════════════════════════════════════════════
// Teil 2: strukturelle Prüfung gegen die tatsächlich vorhandenen Dateien
// (nur lesend — keine der Dateien wird hier verändert)
// ═════════════════════════════════════════════════════════════════════════
console.log('');
console.log('== Reale Dateien: lineup-data/25-26.json, lineup-data/groups.json, season-data/25-26.json ==');
{
  const lineupRaw = await readFile(path.join(REPO_ROOT, 'lineup-data', '25-26.json'), 'utf8');
  const lineupData = JSON.parse(lineupRaw);
  const registryRaw = await readFile(path.join(REPO_ROOT, 'lineup-data', 'groups.json'), 'utf8');
  const registry = JSON.parse(registryRaw);
  const seasonRaw = await readFile(path.join(REPO_ROOT, 'season-data', '25-26.json'), 'utf8');
  const seasonData = JSON.parse(seasonRaw);

  const structural = validateLineupSeasonData(lineupData, { expectedSeasonKey: '25/26' });
  assertTrue(structural.ok, 'lineup-data/25-26.json ist strukturell gültig (ohne externen Player-ID-Kontext)');
  assertEqual(structural.warnings, [], 'lineup-data/25-26.json erzeugt keine unerwarteten Warnungen');

  const registryStructural = validateGroupRegistry(registry);
  assertTrue(registryStructural.ok, 'lineup-data/groups.json ist strukturell gültig');

  const registryCrossCheck = crossValidateGroupReferences(lineupData, registry);
  assertTrue(registryCrossCheck.ok, 'jede in lineup-data/25-26.json verwendete groupId ist in lineup-data/groups.json registriert');

  const realPlayerIds = derivePlayerIdsFromSeasonGames(seasonData.games);
  assertTrue(realPlayerIds.size > 50, `derivePlayerIdsFromSeasonGames liefert eine plausible Menge echter Spieler-IDs aus season-data/25-26.json (${realPlayerIds.size} gefunden)`);

  // ERWARTETER Mismatch: die synthetischen Platzhalter-IDs/gameId aus
  // lineup-data/25-26.json kommen in der echten season-data/25-26.json nicht
  // vor — das ist beabsichtigt (Phase 1 enthält keine echten Einsatzdaten)
  // und beweist nur, dass der Cross-Checker eine echte Abweichung erkennt.
  const gameCrossCheck = crossValidateGamesAgainstSeasonData(lineupData, seasonData.games);
  assertFalse(gameCrossCheck.ok, 'Cross-Check erkennt erwartungsgemäß, dass die synthetische gameId 99999001 nicht in der echten season-data vorkommt');

  const structuralAgainstReal = validateLineupSeasonData(lineupData, { expectedSeasonKey: '25/26', validPlayerIds: realPlayerIds });
  assertFalse(structuralAgainstReal.ok, 'Cross-Check erkennt erwartungsgemäß, dass die synthetischen Spieler-IDs nicht in der echten season-data vorkommen');

  // Hardening (Punkt 4): echte, aus season-data/25-26.json abgeleitete
  // Game-IDs als knownGameIdsBySeason gegen die echte lineup-data/groups.json
  // prüfen. Kein Node erforderlich — läuft über denselben fetch()-basierten
  // Mechanismus wie der Rest dieses Testlaufs.
  const realGameIds = new Set(
    (seasonData.games ?? []).map((g) => g?.id).filter((id) => id !== undefined && id !== null).map(Number),
  );
  assertTrue(realGameIds.size === 60, `echte season-data/25-26.json liefert 60 bekannte Game-IDs (${realGameIds.size} gefunden)`);
  const knownGameIdsBySeason = new Map([['25/26', realGameIds]]);
  const registryAgainstRealGames = validateGroupRegistry(registry, { knownGameIdsBySeason });
  assertFalse(
    registryAgainstRealGames.ok,
    'Cross-Check erkennt erwartungsgemäß, dass die synthetische createdInGame 99999001 in lineup-data/groups.json nicht zu den echten 25/26-Spielen gehört',
  );
  assertContains(registryAgainstRealGames.errors, 'createdInGame', 'Fehlermeldung nennt createdInGame beim echten Cross-Check');
}

// ═════════════════════════════════════════════════════════════════════════
// PHASE 2: realistische synthetische Floorball-Kleinfeld-Szenarien
// ═════════════════════════════════════════════════════════════════════════
// Diese Sektion testet ausschließlich das bereits beschlossene Datenmodell
// und die bestehenden (Phase-1-)Validatoren gegen realistische Szenarien.
// Sie ändert weder Schema noch Validatorlogik. Zwei Stellen, an denen ein
// Test eine Auslegungsfrage berührt statt einen echten Fehler aufzudecken,
// sind bewusst als DOKUMENTIERT markiert (siehe I) und M)) — dort wird das
// tatsächliche Verhalten geprüft und erklärt, nicht stillschweigend
// "repariert". Alle Spieler-/Gruppen-Daten sind rein synthetisch.
{
  console.log('');
  console.log('== PHASE 2: realistische synthetische Floorball-Kleinfeld-Szenarien ==');

  const PA = 'api:91001', PB = 'api:91002', PC = 'api:91003', PD = 'api:91004';
  const PE = 'api:91005', PF = 'api:91006', PG = 'api:91007', PH = 'api:91008';
  const GK_A = 'api:91010', GK_B = 'api:91011';
  const ALL_PHASE2_IDS = new Set([PA, PB, PC, PD, PE, PF, PG, PH, GK_A, GK_B]);

  const G_TRIO = '55555555-5555-4555-8555-555555555555';
  const G_ROT4 = '66666666-6666-4666-8666-666666666666';
  const G_ROT5 = '77777777-7777-4777-8777-777777777777';
  const G_CUSTOM = '88888888-8888-4888-8888-888888888888';
  const G_ALT = '99999999-9999-4999-8999-999999999999';

  console.log('-- A) Trio / klassische Reihe --');
  {
    const game = {
      gameId: 70001,
      roster: { field: [PA, PB, PC], goalies: [GK_A] },
      groups: [{
        groupId: G_TRIO, name: 'Erste Reihe', type: 'trio',
        players: [
          { playerId: PA, position: 'Verteidiger' },
          { playerId: PB, position: 'Verteidiger' },
          { playerId: PC, position: 'Flügel' },
        ],
        notes: '',
      }],
      confirmedCombinations: [{ players: [PA, PB, PC], groupId: G_TRIO, note: '' }],
      note: '',
    };
    const r = validateLineupGame(game, { validPlayerIds: ALL_PHASE2_IDS });
    assertTrue(r.ok, 'A) klassische Trio-Reihe mit bestätigter Kombination ist gültig');
    assertEqual(r.errors, [], 'A) keine Fehler');
  }

  console.log('-- B) 4er-Wechselgruppe (rotation4) --');
  {
    const game = {
      gameId: 70002,
      roster: { field: [PA, PB, PC, PD], goalies: [GK_A] },
      groups: [{
        groupId: G_ROT4, name: 'Rotationsblock Vier', type: 'rotation4',
        players: [
          { playerId: PA, position: 'Verteidiger' },
          { playerId: PB, position: 'Verteidiger' },
          { playerId: PC, position: 'Flügel' },
          { playerId: PD, position: 'Flügel' },
        ],
        notes: '',
      }],
      confirmedCombinations: [
        { players: [PA, PB, PC], groupId: G_ROT4, note: '' },
        { players: [PA, PB, PD], groupId: G_ROT4, note: '' },
      ],
      note: '',
    };
    const r = validateLineupGame(game, { validPlayerIds: ALL_PHASE2_IDS });
    assertTrue(r.ok, 'B) rotation4 mit zwei expliziten 3er-Kombinationen ist gültig');

    const confirmedKeys = new Set(game.confirmedCombinations.map((c) => getCanonicalCombinationKey(c.players)));
    assertEqual(confirmedKeys.size, 2, 'B) es existieren exakt 2 bestätigte Kombinationen, keine automatisch ergänzten');
    assertFalse(confirmedKeys.has(getCanonicalCombinationKey([PA, PC, PD])), 'B) A+C+D wurde NICHT automatisch als bestätigt erzeugt');
    assertFalse(confirmedKeys.has(getCanonicalCombinationKey([PB, PC, PD])), 'B) B+C+D wurde NICHT automatisch als bestätigt erzeugt');
  }

  console.log('-- C) 5er-Rotation --');
  {
    const game = {
      gameId: 70003,
      roster: { field: [PA, PB, PC, PD, PE], goalies: [GK_A] },
      groups: [{
        groupId: G_ROT5, name: 'Rotationsblock Fünf', type: 'rotation5',
        players: [
          { playerId: PA, position: 'Verteidiger' },
          { playerId: PB, position: 'Verteidiger' },
          { playerId: PC, position: 'Flügel 1' },
          { playerId: PD, position: 'Flügel 2' },
          { playerId: PE, position: 'Flügel 3' },
        ],
        notes: '',
      }],
      confirmedCombinations: [
        { players: [PA, PB, PC], groupId: G_ROT5, note: '' },
        { players: [PA, PB, PD], groupId: G_ROT5, note: '' },
        { players: [PA, PB, PE], groupId: G_ROT5, note: '' },
      ],
      note: '',
    };
    const r = validateLineupGame(game, { validPlayerIds: ALL_PHASE2_IDS });
    assertTrue(r.ok, 'C) rotation5 mit drei expliziten 3er-Kombinationen ist gültig');
    assertEqual(game.confirmedCombinations.length, 3, 'C) exakt 3 gespeicherte Kombinationen, nicht alle 10 theoretisch möglichen (C(5,3)=10)');
    for (const combo of [[PC, PD, PE], [PA, PC, PD], [PB, PC, PE]]) {
      const key = getCanonicalCombinationKey(combo);
      const isConfirmed = game.confirmedCombinations.some((c) => getCanonicalCombinationKey(c.players) === key);
      assertFalse(isConfirmed, `C) ${combo.join('+')} gilt NICHT automatisch als bestätigt`);
    }
  }

  console.log('-- D) Spieler in mehreren Gruppen --');
  {
    const game = {
      gameId: 70004,
      roster: { field: [PA, PB, PC, PD, PE], goalies: [GK_A] },
      groups: [
        { groupId: G_TRIO, name: 'Gruppe 1', type: 'trio', players: [{ playerId: PA, position: 'Verteidiger' }, { playerId: PB, position: 'Verteidiger' }, { playerId: PC, position: 'Flügel' }], notes: '' },
        { groupId: G_ROT4, name: 'Gruppe 2', type: 'trio', players: [{ playerId: PA, position: 'Center' }, { playerId: PD, position: 'Flügel' }, { playerId: PE, position: 'Flügel' }], notes: '' },
      ],
      confirmedCombinations: [],
      note: '',
    };
    const r = validateLineupGame(game, { validPlayerIds: ALL_PHASE2_IDS });
    assertTrue(r.ok, 'D) Spieler A gleichzeitig Mitglied zweier verschiedener Gruppen ist ausdrücklich erlaubt');
  }

  console.log('-- E) Spieler im Kader, aber in keiner Gruppe --');
  {
    const game = {
      gameId: 70005,
      roster: { field: [PA, PB, PC, PD], goalies: [GK_A] },
      groups: [{ groupId: G_TRIO, name: 'Reihe', type: 'trio', players: [{ playerId: PA, position: 'Verteidiger' }, { playerId: PB, position: 'Verteidiger' }, { playerId: PC, position: 'Flügel' }], notes: '' }],
      confirmedCombinations: [],
      note: '',
    };
    const r = validateLineupGame(game, { validPlayerIds: ALL_PHASE2_IDS });
    assertTrue(r.ok, 'E) Spieler D im Kader ohne jede Gruppenzugehörigkeit bleibt gültig');
  }

  console.log('-- F) Gruppe ohne bestätigte Kombination --');
  {
    const game = {
      gameId: 70006,
      roster: { field: [PA, PB, PC], goalies: [GK_A] },
      groups: [{ groupId: G_TRIO, name: 'Reihe ohne Bestätigung', type: 'trio', players: [{ playerId: PA }, { playerId: PB }, { playerId: PC }], notes: '' }],
      confirmedCombinations: [],
      note: '',
    };
    const r = validateLineupGame(game, { validPlayerIds: ALL_PHASE2_IDS });
    assertTrue(r.ok, 'F) dokumentierte Gruppe ohne jede bestätigte Kombination bleibt gültig');
  }

  console.log('-- G) mehrere unterschiedliche bestätigte Kombinationen derselben Gruppe --');
  {
    const game = {
      gameId: 70007,
      roster: { field: [PA, PB, PC, PD, PE], goalies: [GK_A] },
      groups: [{ groupId: G_ROT5, name: 'Rotationsblock Fünf', type: 'rotation5', players: [{ playerId: PA }, { playerId: PB }, { playerId: PC }, { playerId: PD }, { playerId: PE }], notes: '' }],
      confirmedCombinations: [
        { players: [PA, PB, PC], groupId: G_ROT5, note: '' },
        { players: [PA, PB, PD], groupId: G_ROT5, note: '' },
        { players: [PA, PB, PE], groupId: G_ROT5, note: '' },
        { players: [PC, PD, PE], groupId: G_ROT5, note: '' },
      ],
      note: '',
    };
    const r = validateLineupGame(game, { validPlayerIds: ALL_PHASE2_IDS });
    assertTrue(r.ok, 'G) vier unterschiedliche bestätigte Kombinationen derselben rotation5-Gruppe sind alle gültig, keine als Duplikat erkannt');
  }

  console.log('-- H) Reihenfolge ist für Duplikaterkennung irrelevant --');
  {
    const combos = [
      { players: [PA, PB, PC], groupId: G_TRIO, note: '' },
      { players: [PC, PA, PB], groupId: G_TRIO, note: '' },
    ];
    const before = JSON.stringify(combos);
    const game = {
      gameId: 70008,
      roster: { field: [PA, PB, PC], goalies: [GK_A] },
      groups: [{ groupId: G_TRIO, name: 'Reihe', type: 'trio', players: [{ playerId: PA }, { playerId: PB }, { playerId: PC }], notes: '' }],
      confirmedCombinations: combos,
      note: '',
    };
    const r = validateLineupGame(game, { validPlayerIds: ALL_PHASE2_IDS });
    assertFalse(r.ok, 'H) [A,B,C] und [C,A,B] werden als doppelte Kombination erkannt');
    assertContains(r.errors, 'doppelte bestätigte Kombination', 'H) Fehlermeldung benennt die doppelte Kombination');
    assertEqual(JSON.stringify(combos), before, 'H) Eingabeobjekt (confirmedCombinations) bleibt unverändert — keine Umsortierung, keine Entfernung');
  }

  console.log('-- I) gleiche Spielermenge in verschiedenen Gruppen (unterschiedliche groupIds) --');
  {
    // Zwei GRUPPEN-Definitionen mit identischer Spielermenge, aber
    // unterschiedlicher groupId: Gruppenidentität ist die groupId, nicht die
    // Spielerliste — beide sind unabhängig voneinander gültig.
    const game = {
      gameId: 70009,
      roster: { field: [PA, PB, PC], goalies: [GK_A] },
      groups: [
        { groupId: G_TRIO, name: 'Reihe X', type: 'trio', players: [{ playerId: PA }, { playerId: PB }, { playerId: PC }], notes: '' },
        { groupId: G_ALT, name: 'Reihe Y (anderer Name, gleiche Spieler)', type: 'trio', players: [{ playerId: PA }, { playerId: PB }, { playerId: PC }], notes: '' },
      ],
      confirmedCombinations: [{ players: [PA, PB, PC], groupId: G_TRIO, note: '' }],
      note: '',
    };
    const r = validateLineupGame(game, { validPlayerIds: ALL_PHASE2_IDS });
    assertTrue(r.ok, 'I) zwei Gruppen mit identischer Spielermenge, aber unterschiedlicher groupId, sind beide unabhängig gültig');
  }
  {
    // DOKUMENTIERT, keine Validatoränderung: "Zwei identische Kombinationen
    // innerhalb desselben Spiels -> harter Fehler" wurde in Phase 1
    // ausdrücklich SPIEL-weit (nicht groupId-weit) festgelegt. Dieselbe
    // Spielerkombination A+B+C bleibt deshalb innerhalb EINES Spiels nur
    // einmal bestätigbar, auch wenn sie an zwei unterschiedliche groupIds
    // gehängt wird — die reale, objektive Tatsache "diese drei Spieler
    // wurden als Kombination bestätigt" existiert in einem Spiel nur einmal,
    // unabhängig vom optional angehängten Gruppen-Tag. Das entspricht dem
    // bereits beschlossenen Konzept, keine Abweichung.
    const game = {
      gameId: 70009,
      roster: { field: [PA, PB, PC], goalies: [GK_A] },
      groups: [
        { groupId: G_TRIO, name: 'Reihe X', type: 'trio', players: [{ playerId: PA }, { playerId: PB }, { playerId: PC }], notes: '' },
        { groupId: G_ALT, name: 'Reihe Y', type: 'trio', players: [{ playerId: PA }, { playerId: PB }, { playerId: PC }], notes: '' },
      ],
      confirmedCombinations: [
        { players: [PA, PB, PC], groupId: G_TRIO, note: '' },
        { players: [PA, PB, PC], groupId: G_ALT, note: '' },
      ],
      note: '',
    };
    const r = validateLineupGame(game, { validPlayerIds: ALL_PHASE2_IDS });
    assertFalse(r.ok, 'I) DOKUMENTIERT: dieselbe Kombination A+B+C zweimal (an zwei verschiedene groupIds gehängt) bestätigt bleibt spielweiter Fehler — entspricht der bereits in Phase 1 beschlossenen, spielweiten Duplikat-Regel');
  }

  console.log('-- J) Torwart darf nicht Gruppenmitglied/Kombinationsbestandteil sein --');
  {
    const groupWithGoalie = { groupId: G_TRIO, name: 'Fehlerhafte Reihe', type: 'trio', players: [{ playerId: PA }, { playerId: PB }, { playerId: GK_A }], notes: '' };
    const r1 = validateGroup(groupWithGoalie, { rosterFieldSet: new Set([PA, PB]) });
    assertFalse(r1.ok, 'J) Torwart als Gruppenmitglied → Fehler (Torwart ist nicht in roster.field)');
  }
  {
    const r2 = validateCombination({ players: [PA, PB, GK_A], groupId: null, note: '' }, { rosterFieldSet: new Set([PA, PB]), rosterGoalieSet: new Set([GK_A]) });
    assertFalse(r2.ok, 'J) Torwart als Bestandteil einer confirmedCombination → Fehler');
    assertContains(r2.errors, 'Torwart', 'J) Fehlermeldung benennt den Torwart explizit');
  }

  console.log('-- K) Gruppentyp/Spielerzahl-Warnungen --');
  {
    const group = { groupId: G_ROT5, name: 'Fünfer, aber nur vier da', type: 'rotation5', players: [{ playerId: PA }, { playerId: PB }, { playerId: PC }, { playerId: PD }], notes: '' };
    const r = validateGroup(group, { rosterFieldSet: new Set([PA, PB, PC, PD]) });
    assertTrue(r.ok, 'K) rotation5 mit 4 Spielern bleibt PASS (nur Warnung)');
    assertContains(r.warnings, 'erwartet üblicherweise', 'K) Warnung für rotation5/4 Spieler');
  }
  {
    const group = { groupId: G_TRIO, name: 'Trio mit vier Spielern', type: 'trio', players: [{ playerId: PA }, { playerId: PB }, { playerId: PC }, { playerId: PD }], notes: '' };
    const r = validateGroup(group, { rosterFieldSet: new Set([PA, PB, PC, PD]) });
    assertTrue(r.ok, 'K) trio mit 4 Spielern bleibt PASS (nur Warnung, kein HARD ERROR)');
    assertContains(r.warnings, 'erwartet üblicherweise', 'K) Warnung für trio/4 Spieler');
  }
  {
    const group = { groupId: G_CUSTOM, name: 'Freie Gruppe', type: 'custom', players: [{ playerId: PA }, { playerId: PB }, { playerId: PC }, { playerId: PD }, { playerId: PE }, { playerId: PF }, { playerId: PG }], notes: '' };
    const r = validateGroup(group, { rosterFieldSet: new Set([PA, PB, PC, PD, PE, PF, PG]) });
    assertTrue(r.ok, 'K) custom mit 7 Spielern bleibt PASS');
    assertEqual(r.warnings, [], 'K) custom erzeugt KEINE Typgrößen-Warnung, unabhängig von der Spielerzahl');
  }

  console.log('-- L) Keine implizite Kombinationserzeugung (Deep-Clone-Vergleich) --');
  {
    const game = {
      gameId: 70010,
      roster: { field: [PA, PB, PC, PD, PE], goalies: [GK_A] },
      groups: [{ groupId: G_ROT5, name: 'Rotationsblock Fünf', type: 'rotation5', players: [{ playerId: PA, position: 'Verteidiger' }, { playerId: PB, position: 'Verteidiger' }, { playerId: PC, position: 'Flügel 1' }, { playerId: PD, position: 'Flügel 2' }, { playerId: PE, position: 'Flügel 3' }], notes: '' }],
      confirmedCombinations: [{ players: [PA, PB, PC], groupId: G_ROT5, note: '' }],
      note: '',
    };
    const before = JSON.parse(JSON.stringify(game));
    const r = validateLineupGame(game, { validPlayerIds: ALL_PHASE2_IDS });
    assertTrue(r.ok, 'L) rotation5 mit genau einer bestätigten Kombination ist gültig');
    assertEqual(game, before, 'L) game-Objekt ist nach der Validierung strukturell identisch zum Deep-Clone davor (kein Hinzufügen, keine Gruppenänderung, kein Sortieren, keine Ergänzung)');
    assertEqual(game.confirmedCombinations.length, 1, 'L) weiterhin exakt eine gespeicherte Kombination, nicht automatisch ergänzt');
  }

  console.log('-- M) Positionsmodell: freie Positionswerte --');
  {
    for (const pos of ['Verteidiger', 'Flügel 1', 'Flügel 2', 'Center', 'Top', 'Flex']) {
      const group = { groupId: G_TRIO, name: 'Reihe', type: 'trio', players: [{ playerId: PA, position: pos }, { playerId: PB, position: 'Verteidiger' }, { playerId: PC, position: 'Flügel' }], notes: '' };
      const r = validateGroup(group, { rosterFieldSet: new Set([PA, PB, PC]) });
      assertTrue(r.ok, `M) freie Position "${pos}" ist gültig`);
    }
  }
  {
    const group = { groupId: G_TRIO, name: 'Reihe', type: 'trio', players: [{ playerId: PA }, { playerId: PB, position: 'Verteidiger' }, { playerId: PC, position: 'Flügel' }], notes: '' };
    assertTrue(validateGroup(group, { rosterFieldSet: new Set([PA, PB, PC]) }).ok, 'M) komplett fehlende Position ist gültig');
  }
  {
    const group = { groupId: G_TRIO, name: 'Reihe', type: 'trio', players: [{ playerId: PA, position: null }, { playerId: PB, position: 'Verteidiger' }, { playerId: PC, position: 'Flügel' }], notes: '' };
    assertTrue(validateGroup(group, { rosterFieldSet: new Set([PA, PB, PC]) }).ok, 'M) position:null ist gültig');
  }
  {
    // DOKUMENTIERT, keine Validatoränderung: position:"" (leerer String) wird
    // von der aktuellen Logik als Fehler behandelt ("nicht-leerer String,
    // wenn vorhanden"). Das kollidiert NICHT mit dem Konzept "Position ist
    // optional/frei" — "frei" betrifft den WERT bei Angabe; "keine Position"
    // wird bereits durch Weglassen des Felds oder position:null ausgedrückt.
    // Ein zusätzlicher, bedeutungsgleicher dritter Weg (leerer String) ist
    // nicht gefordert. Kein Implementierungsfehler, nur hier dokumentiert.
    const group = { groupId: G_TRIO, name: 'Reihe', type: 'trio', players: [{ playerId: PA, position: '' }, { playerId: PB, position: 'Verteidiger' }, { playerId: PC, position: 'Flügel' }], notes: '' };
    const r = validateGroup(group, { rosterFieldSet: new Set([PA, PB, PC]) });
    assertFalse(r.ok, 'M) DOKUMENTIERT: position:"" (leerer String) wird aktuell als Fehler behandelt — "keine Position" wird stattdessen durch Weglassen/null ausgedrückt, kein Konzeptkonflikt');
  }

  console.log('-- N) gameDay darf NICHT in lineup-data gespeichert werden --');
  {
    const game = { gameId: 70011, gameDay: 3, roster: { field: [PA, PB, PC], goalies: [GK_A] }, groups: [], confirmedCombinations: [], note: '' };
    const r = validateLineupGame(game, { validPlayerIds: ALL_PHASE2_IDS });
    assertFalse(r.ok, 'N) gameDay-Feld in einem lineup-game → HARD ERROR (unbekanntes Feld)');
    assertContains(r.errors, 'gameDay', 'N) Fehlermeldung benennt das unbekannte Feld "gameDay" explizit');
  }

  console.log('-- O) Saisonmanager bleibt einzige objektive Datenquelle --');
  {
    for (const field of ['shiftSeconds', 'onFieldAtEvent', 'plusMinus', 'goalAttributionGroupId', 'eventAssignment']) {
      const game = { gameId: 70012, roster: { field: [PA, PB, PC], goalies: [GK_A] }, groups: [], confirmedCombinations: [], note: '', [field]: 'x' };
      const r = validateLineupGame(game, { validPlayerIds: ALL_PHASE2_IDS });
      assertFalse(r.ok, `O) Feld "${field}" ist auf Spiel-Ebene NICHT Teil des Datenmodells → Fehler (unbekanntes Feld)`);
    }
    for (const field of ['shiftSeconds', 'onFieldAtEvent', 'plusMinus']) {
      const combo = { players: [PA, PB, PC], groupId: null, note: '', [field]: 'x' };
      const r = validateCombination(combo, { rosterFieldSet: new Set([PA, PB, PC]), rosterGoalieSet: new Set([GK_A]) });
      assertFalse(r.ok, `O) Feld "${field}" ist auf Kombinations-Ebene NICHT Teil des Datenmodells → Fehler (unbekanntes Feld)`);
    }
  }

  console.log('-- P) mehrere Torhüter, getrennt von Feldspieler-Gruppen --');
  {
    assertTrue(validateRoster({ field: [PA, PB, PC], goalies: [GK_A, GK_B] }, { validPlayerIds: ALL_PHASE2_IDS }).ok, 'P) zwei unterschiedliche Torhüter im roster.goalies-Array sind gültig');
    assertFalse(validateRoster({ field: [PA, PB, PC], goalies: [GK_A, GK_A] }, { validPlayerIds: ALL_PHASE2_IDS }).ok, 'P) doppelter Torhüter im roster.goalies-Array → Fehler');
    assertFalse(validateRoster({ field: [PA, PB, PC, GK_A], goalies: [GK_A, GK_B] }, { validPlayerIds: ALL_PHASE2_IDS }).ok, 'P) Torhüter gleichzeitig in roster.field → Fehler (Überschneidung)');
    const group = { groupId: G_TRIO, name: 'Reihe', type: 'trio', players: [{ playerId: PA }, { playerId: PB }, { playerId: GK_B }], notes: '' };
    assertFalse(validateGroup(group, { rosterFieldSet: new Set([PA, PB, PC]) }).ok, 'P) zweiter Torhüter (GK_B) als Gruppenmitglied → Fehler');
  }

  console.log('-- Q) realistische vollständige Spiel-Situation --');
  {
    const game = {
      gameId: 70099,
      roster: { field: [PA, PB, PC, PD, PE, PF, PG, PH], goalies: [GK_A, GK_B] },
      groups: [
        { groupId: G_TRIO, name: 'Erste Reihe', type: 'trio', players: [{ playerId: PA, position: 'Verteidiger' }, { playerId: PB, position: 'Verteidiger' }, { playerId: PC, position: 'Flügel' }], notes: '' },
        { groupId: G_ROT4, name: 'Zweiter Rotationsblock', type: 'rotation4', players: [{ playerId: PD, position: 'Center' }, { playerId: PE, position: 'Flügel' }, { playerId: PF, position: 'Flügel' }, { playerId: PA, position: 'Flex' }], notes: 'A rotiert zusätzlich in diesen Block' },
        { groupId: G_ROT5, name: 'Breiter Rotationspool', type: 'rotation5', players: [{ playerId: PC, position: 'Flügel' }, { playerId: PD, position: 'Center' }, { playerId: PE, position: 'Flügel' }, { playerId: PG, position: 'Verteidiger' }, { playerId: PH, position: 'Verteidiger' }], notes: '' },
      ],
      confirmedCombinations: [
        { players: [PA, PB, PC], groupId: G_TRIO, note: 'Standard-Trio' },
        { players: [PD, PE, PF], groupId: G_ROT4, note: '' },
        { players: [PA, PD, PE], groupId: G_ROT4, note: 'A statt F' },
        { players: [PC, PD, PE], groupId: G_ROT5, note: '' },
        { players: [PC, PG, PH], groupId: G_ROT5, note: '' },
        { players: [PD, PG, PH], groupId: G_ROT5, note: '' },
      ],
      note: 'Vollständiges synthetisches Testspiel für Phase 2, Szenario Q',
    };
    const r = validateLineupGame(game, { validPlayerIds: ALL_PHASE2_IDS });
    assertTrue(r.ok, 'Q) vollständiges realistisches Spiel (8 Feldspieler, 2 Torhüter, 3 Gruppen, 6 bestätigte Kombinationen, Mehrfachzugehörigkeit) ist insgesamt gültig');
    assertEqual(r.errors, [], 'Q) keine Fehler im vollständigen Spiel');
  }
}

// ─────────────────────────────────────────────────────────────────────────
console.log('');
if (failures > 0) {
  console.log(`${failures} Test(s) fehlgeschlagen.`);
  process.exitCode = 1;
} else {
  console.log('Alle Tests erfolgreich.');
}

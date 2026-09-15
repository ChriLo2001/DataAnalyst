#!/usr/bin/env node
// API-freier, sicherer Importer für lineup-data (Einsatz-Center, Phase 3).
//
// Architektur (siehe docs/lineup-data-import.md für den vollständigen
// Workflow):
//   Browser Einsatz-Center (existiert noch nicht, spätere Phase)
//     → Export-Draft (JSON-Datei, siehe Draft-Schema unten)
//     → node scripts/import-lineup-data.mjs <seasonKey> --input <draft.json>
//     → Validierung (Phase-1-Validatoren, UNVERÄNDERT wiederverwendet)
//     → baseHash-Prüfung (siehe scripts/lineup-data-hash.mjs)
//     → ID-/Cross-File-Integritätsprüfung gegen season-data + groups.json
//     → Diff-Bericht (Dry-Run, Standard)
//     → NUR mit --write: atomisches Schreiben
//     → manuelle Git-Kontrolle (kein Auto-Commit, kein Auto-Push)
//
// Diese Datei liest scripts/lineup-data-validators.mjs UND
// lineup-data/25-26.json / lineup-data/groups.json ausschließlich lesend
// bzw. importiert daraus — keine dieser Dateien wird von diesem Skript
// verändert (siehe Auftrag Phase 3).
//
// Bekannter, nicht behobener Altbestand-Fund (außerhalb des Scopes dieser
// Phase, deshalb bewusst NICHT repariert): scripts/update-season-data.mjs
// exportiert writeJsonAtomic NICHT (kein "export" vor der Funktion, Zeile
// ~87), obwohl scripts/import-season-data.mjs genau das per
// `import { writeJsonAtomic } from './update-season-data.mjs'` versucht
// (Zeile 63) — das würde unter echtem Node.js beim Laden des Moduls mit
// einem SyntaxError fehlschlagen ("does not provide an export named
// 'writeJsonAtomic'"), wurde aber bisher nie bemerkt, weil dieses Projekt
// bislang nie mit echtem Node.js ausgeführt wurde. Dieses neue Importer-
// Skript hängt deshalb bewusst NICHT von diesem Import ab, sondern bringt
// eine eigene, kleine, lokale writeJsonAtomic()-Implementierung mit (siehe
// unten) — unabhängig von diesem vorbestehenden, nicht in Scope liegenden
// Bug.
//
// Kernlogik (validateDraftShape, mergeGames, mergeRegistryGroups,
// buildImportPlan, formatImportReport) ist bewusst als reine, exportierte
// Funktionen von der I/O (main()) getrennt — direkt testbar ohne Dateisystem.

import { readFile, writeFile, rename, mkdir } from 'node:fs/promises';
import path from 'node:path';

import {
  LINEUP_SCHEMA_VERSION,
  isValidSeasonKeyFormat,
  derivePlayerIdsFromSeasonGames,
  findDuplicateLineupGameIds,
  findDuplicateGroupIds,
  validateLineupSeasonData,
  validateGroupRegistry,
  crossValidateGamesAgainstSeasonData,
  crossValidateGroupReferences,
} from './lineup-data-validators.mjs';

import { canonicalJson, computeBaseHash } from './lineup-data-hash.mjs';

const LINEUP_DATA_DIR = path.resolve(process.cwd(), 'lineup-data');
const SEASON_DATA_DIR = path.resolve(process.cwd(), 'season-data');
const REGISTRY_PATH = path.join(LINEUP_DATA_DIR, 'groups.json');

export function seasonFileForKey(key) {
  return `${key.replace('/', '-')}.json`;
}

// ─────────────────────────────────────────────────────────────────────────
// Draft-Schema (siehe docs/lineup-data-import.md für das vollständige,
// kommentierte Beispiel):
//
//   {
//     "schemaVersion": 1,
//     "season": "25/26",
//     "baseHash": "<sha256-hex, siehe scripts/lineup-data-hash.mjs>",
//     "games": [ { gameId, roster, groups, confirmedCombinations, note }, ... ],
//     "groups": [ { groupId, currentName, createdInSeason, createdInGame, nameHistory }, ... ]
//   }
//
// - "games" enthält NUR die vom Browser-Draft neuen/geänderten Spiele, NICHT
//   zwingend die komplette Datei — nicht erwähnte, bestehende Spiele bleiben
//   unangetastet erhalten (siehe mergeGames()).
// - "groups" ist optional (kann fehlen oder [] sein) und enthält NUR
//   neue/geänderte Registry-Einträge, in exakt derselben Form wie ein Eintrag
//   in lineup-data/groups.json — kein separates, abweichendes Format, um das
//   Modell einfach zu halten (siehe Auftrag).
// - Sowohl "games"- als auch "groups"-Einträge werden bei bekannter ID
//   VOLLSTÄNDIG ersetzt, es gibt KEIN Feld-Merge (siehe mergeGames()/
//   mergeRegistryGroups()).
// ─────────────────────────────────────────────────────────────────────────

const DRAFT_TOP_LEVEL_FIELDS = ['schemaVersion', 'season', 'baseHash', 'games', 'groups'];

function checkUnknownFields(obj, allowedFields, path_, errors) {
  if (!obj || typeof obj !== 'object' || Array.isArray(obj)) return;
  const allowed = new Set(allowedFields);
  for (const key of Object.keys(obj)) {
    if (!allowed.has(key)) errors.push(`${path_}: unbekanntes Feld "${key}"`);
  }
}

/**
 * Rein strukturelle Prüfung der Draft-Hülle — NICHT der einzelnen Spiele
 * (dafür validateLineupGame() aus lineup-data-validators.mjs, angewendet auf
 * den gemergten Endzustand, siehe buildImportPlan()).
 * @param {unknown} draft
 * @param {{expectedSeasonKey?:string}} [context]
 * @returns {{ok:boolean, errors:string[]}}
 */
export function validateDraftShape(draft, { expectedSeasonKey } = {}) {
  const errors = [];
  if (!draft || typeof draft !== 'object' || Array.isArray(draft)) {
    return { ok: false, errors: ['Draft fehlt oder ist kein Objekt'] };
  }
  checkUnknownFields(draft, DRAFT_TOP_LEVEL_FIELDS, 'draft', errors);

  if (draft.schemaVersion !== LINEUP_SCHEMA_VERSION) {
    errors.push(`draft.schemaVersion muss ${LINEUP_SCHEMA_VERSION} sein, war "${draft.schemaVersion}"`);
  }
  if (!isValidSeasonKeyFormat(draft.season)) {
    errors.push(`draft.season fehlt oder hat ungültiges Format: "${draft.season}"`);
  } else if (expectedSeasonKey && draft.season !== expectedSeasonKey) {
    errors.push(`draft.season ("${draft.season}") passt nicht zum angegebenen Ziel-Season-Key ("${expectedSeasonKey}")`);
  }
  if (draft.baseHash === undefined || draft.baseHash === null || draft.baseHash === '') {
    errors.push('draft.baseHash fehlt');
  } else if (typeof draft.baseHash !== 'string') {
    errors.push('draft.baseHash muss ein String sein');
  }
  if (!Array.isArray(draft.games)) errors.push('draft.games fehlt oder ist kein Array');
  if (draft.groups !== undefined && !Array.isArray(draft.groups)) {
    errors.push('draft.groups muss, wenn vorhanden, ein Array sein');
  }

  return { ok: errors.length === 0, errors };
}

// ─────────────────────────────────────────────────────────────────────────
// Merge-Logik (rein, kein fetch/fs) — Update-Semantik: bekannte ID wird
// VOLLSTÄNDIG ersetzt (kein Feld-Merge), unbekannte ID wird hinzugefügt,
// bestehende, im Draft nicht erwähnte Einträge bleiben unangetastet erhalten
// (KEINE Löschung in Phase 3 — siehe Auftrag).
// ─────────────────────────────────────────────────────────────────────────

/**
 * @param {Array<object>} existingGames
 * @param {Array<object>} draftGames
 * @returns {{mergedGames:object[], existingIds:Set<number>, added:number[], changed:number[], unchanged:number[]}}
 */
export function mergeGames(existingGames, draftGames) {
  const existingList = Array.isArray(existingGames) ? existingGames : [];
  const draftList = Array.isArray(draftGames) ? draftGames : [];

  const byId = new Map(existingList.map((g) => [g?.gameId, g]));
  const existingIds = new Set(byId.keys());

  const added = [];
  const changed = [];
  const unchanged = [];

  for (const game of draftList) {
    const id = game?.gameId;
    if (byId.has(id)) {
      const before = byId.get(id);
      if (canonicalJson(before) === canonicalJson(game)) {
        unchanged.push(id);
      } else {
        changed.push(id);
      }
    } else {
      added.push(id);
    }
    byId.set(id, game); // vollständiger Ersatz, kein Feld-Merge
  }

  for (const id of existingIds) {
    if (!draftList.some((g) => g?.gameId === id)) unchanged.push(id);
  }

  return { mergedGames: [...byId.values()], existingIds, added, changed, unchanged };
}

/**
 * @param {Array<object>} existingGroups
 * @param {Array<object>} draftGroups
 * @returns {{mergedGroups:object[], existingIds:Set<string>, added:Array<{groupId,name}>, changed:Array<{groupId,name}>, unchanged:Array<{groupId,name}>, errors:string[]}}
 */
export function mergeRegistryGroups(existingGroups, draftGroups) {
  const errors = [];
  const existingList = Array.isArray(existingGroups) ? existingGroups : [];
  const draftList = Array.isArray(draftGroups) ? draftGroups : [];

  const byId = new Map(existingList.map((g) => [g?.groupId, g]));
  const existingIds = new Set(byId.keys());

  const added = [];
  const changed = [];
  const unchanged = [];

  for (const group of draftList) {
    const id = group?.groupId;
    if (byId.has(id)) {
      const before = byId.get(id);
      // groupId bleibt unverändert (per Konstruktion), aber die "Erschaffungs-
      // Fakten" createdInSeason/createdInGame dürfen bei einem bestehenden
      // Eintrag NICHT rückwirkend verändert werden — nur currentName/
      // nameHistory dürfen sich ändern (siehe Auftrag: "keine automatische
      // neue groupId bei Namensänderung", "UUIDs niemals aus Namen/Besetzung
      // ableiten").
      if (before?.createdInSeason !== group?.createdInSeason || before?.createdInGame !== group?.createdInGame) {
        errors.push(
          `Registry-Gruppe "${id}": createdInSeason/createdInGame dürfen bei einem bestehenden Eintrag nicht verändert ` +
            `werden (bisher: ${before?.createdInSeason}/${before?.createdInGame}, Draft: ${group?.createdInSeason}/${group?.createdInGame})`,
        );
        continue; // bestehender Eintrag bleibt unangetastet, Draft-Eintrag wird verworfen
      }
      if (canonicalJson(before) === canonicalJson(group)) {
        unchanged.push({ groupId: id, name: group?.currentName });
      } else {
        changed.push({ groupId: id, name: group?.currentName });
      }
    } else {
      added.push({ groupId: id, name: group?.currentName });
    }
    byId.set(id, group);
  }

  for (const id of existingIds) {
    if (!draftList.some((g) => g?.groupId === id)) {
      unchanged.push({ groupId: id, name: byId.get(id)?.currentName });
    }
  }

  return { mergedGroups: [...byId.values()], existingIds, added, changed, unchanged, errors };
}

// ─────────────────────────────────────────────────────────────────────────
// Zentrale, reine Orchestrierung — nimmt bereits geladene/geparste Objekte
// entgegen, liest selbst keine Dateien. async wegen computeBaseHash()
// (Web-Crypto-API ist promise-basiert).
// ─────────────────────────────────────────────────────────────────────────

/**
 * @param {object} params
 * @param {string} params.seasonKey
 * @param {object} params.draft geparster Draft
 * @param {object} params.existingSeasonData vollständiger, bereits geparster
 *   Inhalt von lineup-data/<seasonKey>.json (oder synthetisches leeres
 *   Dokument, falls die Datei noch nicht existiert)
 * @param {object} params.existingRegistry vollständiger, bereits geparster
 *   Inhalt von lineup-data/groups.json
 * @param {Array<object>} params.sourceSeasonGames rohe games[] aus
 *   season-data/<seasonKey>.json (einzige Referenzquelle für gültige
 *   gameId/playerId dieser Saison)
 * @returns {Promise<object>} vollständiger Plan/Bericht
 */
export async function buildImportPlan({ seasonKey, draft, existingSeasonData, existingRegistry, sourceSeasonGames }) {
  const shapeCheck = validateDraftShape(draft, { expectedSeasonKey: seasonKey });
  if (!shapeCheck.ok) {
    return { ok: false, errors: shapeCheck.errors, warnings: [], diff: null, mergedSeasonData: null, mergedRegistry: null, registryChanged: false };
  }

  const currentBaseHash = await computeBaseHash(existingSeasonData, existingRegistry);
  if (draft.baseHash !== currentBaseHash) {
    return {
      ok: false,
      errors: [
        `baseHash stimmt nicht überein — der Draft wurde auf einem anderen Stand von lineup-data/${seasonKey}.json bzw. ` +
          `lineup-data/groups.json erstellt, als aktuell auf der Platte liegt. Erwartet (aktueller Stand): "${currentBaseHash}", ` +
          `Draft enthält: "${draft.baseHash}". Bitte den Draft auf Basis des aktuellen Stands neu erzeugen.`,
      ],
      warnings: [],
      diff: null,
      mergedSeasonData: null,
      mergedRegistry: null,
      registryChanged: false,
    };
  }

  const errors = [];
  const warnings = [];

  const draftGameDupes = findDuplicateLineupGameIds(draft.games);
  for (const d of draftGameDupes) errors.push(`draft.games: doppelte gameId "${d.value}" (${d.count}x) innerhalb des Drafts`);
  const draftGroupDupes = findDuplicateGroupIds(draft.groups ?? []);
  for (const d of draftGroupDupes) errors.push(`draft.groups: doppelte groupId "${d.value}" (${d.count}x) innerhalb des Drafts`);

  const knownGameIds = new Set(
    (sourceSeasonGames ?? [])
      .map((g) => g?.id)
      .filter((id) => id !== undefined && id !== null)
      .map(Number),
  );
  for (const game of draft.games) {
    if (!knownGameIds.has(Number(game?.gameId))) {
      errors.push(`draft.games: gameId ${game?.gameId} existiert nicht in season-data/${seasonFileForKey(seasonKey)}`);
    }
  }

  const gamesMerge = mergeGames(existingSeasonData?.games, draft.games);
  const registryMerge = mergeRegistryGroups(existingRegistry?.groups, draft.groups ?? []);
  errors.push(...registryMerge.errors);

  // Löschschutz, defense-in-depth: strukturell kann mergeGames()/
  // mergeRegistryGroups() ohnehin nie eine bestehende ID entfernen (reines
  // Hinzufügen/Ersetzen über eine Map) — diese Prüfung ist ein zusätzliches,
  // explizites Sicherheitsnetz, falls sich das jemals ändern sollte.
  for (const id of gamesMerge.existingIds) {
    if (!gamesMerge.mergedGames.some((g) => g?.gameId === id)) {
      errors.push(`bestehende gameId ${id} würde durch diesen Import entfernt — in Phase 3 nicht erlaubt`);
    }
  }
  for (const id of registryMerge.existingIds) {
    if (!registryMerge.mergedGroups.some((g) => g?.groupId === id)) {
      errors.push(`bestehende groupId ${id} würde durch diesen Import aus der Registry entfernt — in Phase 3 nicht erlaubt`);
    }
  }

  const mergedSeasonData = { schemaVersion: LINEUP_SCHEMA_VERSION, season: seasonKey, games: gamesMerge.mergedGames };
  const mergedRegistry = { schemaVersion: LINEUP_SCHEMA_VERSION, groups: registryMerge.mergedGroups };

  // Finalen Zustand mit den bestehenden, UNVERÄNDERTEN Phase-1-Validatoren
  // erneut vollständig prüfen (siehe Auftrag: bestehende Validatoren nutzen,
  // nicht unnötig erweitern).
  const validPlayerIds = derivePlayerIdsFromSeasonGames(sourceSeasonGames);
  const seasonResult = validateLineupSeasonData(mergedSeasonData, { expectedSeasonKey: seasonKey, validPlayerIds });
  errors.push(...seasonResult.errors);
  warnings.push(...seasonResult.warnings);

  const registryResult = validateGroupRegistry(mergedRegistry);
  errors.push(...registryResult.errors);
  warnings.push(...registryResult.warnings);

  const gameCrossResult = crossValidateGamesAgainstSeasonData(mergedSeasonData, sourceSeasonGames);
  errors.push(...gameCrossResult.errors);

  const groupCrossResult = crossValidateGroupReferences(mergedSeasonData, mergedRegistry);
  errors.push(...groupCrossResult.errors);

  // createdInGame-Existenzprüfung NUR für Registry-Einträge dieser einen
  // Saison (createdInSeason === seasonKey) — der Importer lädt bewusst keine
  // season-data anderer Saisons; ein pauschaler knownGameIdsBySeason-Check
  // über die GESAMTE Registry würde Einträge anderer Saisons fälschlich als
  // "unbekannte Saison" ablehnen (siehe validateGroupRegistry()-Hardening in
  // Phase 1). Für die aktuelle Saison wird hier direkt und vollständig
  // geprüft.
  for (const entry of mergedRegistry.groups) {
    if (entry?.createdInSeason === seasonKey && !knownGameIds.has(Number(entry?.createdInGame))) {
      errors.push(`Registry-Gruppe "${entry.groupId}": createdInGame ${entry.createdInGame} existiert nicht in season-data/${seasonFileForKey(seasonKey)}`);
    }
  }

  const ok = errors.length === 0;
  const registryChanged = registryMerge.added.length > 0 || registryMerge.changed.length > 0;

  return {
    ok,
    errors,
    warnings,
    mergedSeasonData,
    mergedRegistry,
    registryChanged,
    diff: {
      games: { added: gamesMerge.added, changed: gamesMerge.changed, unchanged: gamesMerge.unchanged },
      groups: { added: registryMerge.added, changed: registryMerge.changed, unchanged: registryMerge.unchanged },
    },
  };
}

/** Formatiert den Bericht für die Konsole — nur IDs/Namen/Kurzzusammenfassungen, keine JSON-Dumps. */
export function formatImportReport(plan, { seasonKey, inputFile, mode = 'dry-run' }) {
  const lines = [];
  lines.push('─'.repeat(70));
  lines.push(`${mode === 'write' ? 'Schreib-' : 'Dry-Run-'}Bericht: Lineup-Data-Import für ${seasonKey}`);
  lines.push('─'.repeat(70));
  lines.push(`Draft-Datei:             ${inputFile}`);
  lines.push(`Validierungsstatus:      ${plan.ok ? 'OK' : 'FEHLER'}`);
  if (plan.diff) {
    lines.push('');
    lines.push('Spiele (lineup-data/<season>.json):');
    lines.push(`  neu:          ${plan.diff.games.added.length}${plan.diff.games.added.length ? ` -> ${plan.diff.games.added.join(', ')}` : ''}`);
    lines.push(`  geändert:     ${plan.diff.games.changed.length}${plan.diff.games.changed.length ? ` -> ${plan.diff.games.changed.join(', ')}` : ''}`);
    lines.push(`  unverändert:  ${plan.diff.games.unchanged.length}`);
    lines.push('Gruppen (lineup-data/groups.json):');
    lines.push(`  neu:          ${plan.diff.groups.added.length}${plan.diff.groups.added.length ? ` -> ${plan.diff.groups.added.map((g) => `${g.name} (${g.groupId})`).join(', ')}` : ''}`);
    lines.push(`  geändert:     ${plan.diff.groups.changed.length}${plan.diff.groups.changed.length ? ` -> ${plan.diff.groups.changed.map((g) => `${g.name} (${g.groupId})`).join(', ')}` : ''}`);
    lines.push(`  unverändert:  ${plan.diff.groups.unchanged.length}`);
  }
  if (plan.warnings?.length) {
    lines.push('');
    lines.push('Warnungen:');
    for (const w of plan.warnings) lines.push(`  - ${w}`);
  }
  if (plan.errors?.length) {
    lines.push('');
    lines.push('Fehler:');
    for (const e of plan.errors) lines.push(`  - ${e}`);
  }
  lines.push('─'.repeat(70));
  lines.push(
    mode === 'write'
      ? plan.ok
        ? 'Ergebnis: Validierung OK — wird jetzt geschrieben.'
        : 'Ergebnis: FEHLGESCHLAGEN — es wurde NICHTS geschrieben.'
      : plan.ok
        ? 'Ergebnis: Dry-Run OK — ein Schreibvorgang wäre nach aktuellem Stand sicher (nur mit --write).'
        : 'Ergebnis: Dry-Run FEHLGESCHLAGEN — es würde NICHTS geschrieben.',
  );
  return lines.join('\n');
}

// ─────────────────────────────────────────────────────────────────────────
// I/O + CLI (main)
// ─────────────────────────────────────────────────────────────────────────

async function readJsonFile(filePath) {
  let raw;
  try {
    raw = await readFile(filePath, 'utf8');
  } catch (e) {
    return { ok: false, exists: false, error: `Datei "${filePath}" konnte nicht gelesen werden: ${e.message}` };
  }
  try {
    return { ok: true, exists: true, data: JSON.parse(raw) };
  } catch (e) {
    return { ok: false, exists: true, error: `Datei "${filePath}" enthält kein gültiges JSON: ${e.message}` };
  }
}

/**
 * Eigener, lokaler atomarer Schreibvorgang (Temp-Datei + rename) — bewusst
 * NICHT aus scripts/update-season-data.mjs importiert, siehe Kommentar am
 * Dateianfang zum dort nicht exportierten writeJsonAtomic.
 */
async function writeJsonAtomic(filePath, data) {
  await mkdir(path.dirname(filePath), { recursive: true });
  const tmpPath = `${filePath}.tmp-${process.pid}`;
  await writeFile(tmpPath, JSON.stringify(data), 'utf8');
  await rename(tmpPath, filePath);
}

export async function main(argv = process.argv.slice(2)) {
  const flags = new Set(argv.filter((a) => a.startsWith('--')));
  const positional = argv.filter((a) => !a.startsWith('--'));
  const wantsWrite = flags.has('--write');

  const inputIdx = argv.indexOf('--input');
  const inputFileArg = inputIdx !== -1 ? argv[inputIdx + 1] : undefined;
  const [seasonKeyArg] = positional;

  if (!seasonKeyArg || !inputFileArg) {
    console.error('Aufruf: node scripts/import-lineup-data.mjs <seasonKey> --input <draftFile> [--write]');
    console.error('Beispiel: node scripts/import-lineup-data.mjs 25/26 --input ./entwurf/25-26-draft.json');
    process.exitCode = 1;
    return;
  }
  if (!isValidSeasonKeyFormat(seasonKeyArg)) {
    console.error(`Ungültiger Season-Key "${seasonKeyArg}" (erwartetes Format "YY/YY").`);
    process.exitCode = 1;
    return;
  }

  const draftResult = await readJsonFile(path.resolve(process.cwd(), inputFileArg));
  if (!draftResult.ok) {
    console.error(draftResult.error);
    process.exitCode = 1;
    return;
  }

  const seasonFile = seasonFileForKey(seasonKeyArg);
  const seasonPath = path.join(LINEUP_DATA_DIR, seasonFile);
  const seasonResult = await readJsonFile(seasonPath);
  if (seasonResult.exists && !seasonResult.ok) {
    console.error(`Abbruch: ${seasonResult.error} — bestehende lineup-data/${seasonFile} ist vorhanden, aber nicht lesbar. Es wurde NICHTS geschrieben.`);
    process.exitCode = 1;
    return;
  }
  const existingSeasonData = seasonResult.ok
    ? seasonResult.data
    : { schemaVersion: LINEUP_SCHEMA_VERSION, season: seasonKeyArg, games: [] };
  if (seasonResult.ok) {
    const existingStructural = validateLineupSeasonData(existingSeasonData, { expectedSeasonKey: seasonKeyArg });
    if (!existingStructural.ok) {
      console.error(`Abbruch: bestehende lineup-data/${seasonFile} ist bereits strukturell ungültig — Import verweigert, bevor irgendetwas verändert wird:`);
      for (const e of existingStructural.errors) console.error(`  - ${e}`);
      process.exitCode = 1;
      return;
    }
  }

  const registryResult = await readJsonFile(REGISTRY_PATH);
  if (registryResult.exists && !registryResult.ok) {
    console.error(`Abbruch: ${registryResult.error} — bestehende lineup-data/groups.json ist vorhanden, aber nicht lesbar. Es wurde NICHTS geschrieben.`);
    process.exitCode = 1;
    return;
  }
  const existingRegistry = registryResult.ok ? registryResult.data : { schemaVersion: LINEUP_SCHEMA_VERSION, groups: [] };
  if (registryResult.ok) {
    const existingRegistryStructural = validateGroupRegistry(existingRegistry);
    if (!existingRegistryStructural.ok) {
      console.error('Abbruch: bestehende lineup-data/groups.json ist bereits strukturell ungültig — Import verweigert:');
      for (const e of existingRegistryStructural.errors) console.error(`  - ${e}`);
      process.exitCode = 1;
      return;
    }
  }

  const sourceSeasonResult = await readJsonFile(path.join(SEASON_DATA_DIR, seasonFile));
  if (!sourceSeasonResult.ok) {
    console.error(`Abbruch: season-data/${seasonFile} konnte nicht geladen werden (${sourceSeasonResult.error}) — ohne Referenzdaten kann nicht validiert werden.`);
    process.exitCode = 1;
    return;
  }

  const plan = await buildImportPlan({
    seasonKey: seasonKeyArg,
    draft: draftResult.data,
    existingSeasonData,
    existingRegistry,
    sourceSeasonGames: sourceSeasonResult.data?.games ?? [],
  });

  console.log(formatImportReport(plan, { seasonKey: seasonKeyArg, inputFile: inputFileArg, mode: wantsWrite ? 'write' : 'dry-run' }));

  if (!wantsWrite) {
    process.exitCode = plan.ok ? 0 : 1;
    return;
  }
  if (!plan.ok) {
    console.error('Abbruch: --write wurde angegeben, aber die Validierung ist fehlgeschlagen. Es wurde NICHTS geschrieben.');
    process.exitCode = 1;
    return;
  }

  await writeJsonAtomic(seasonPath, plan.mergedSeasonData);
  console.log(`--write: lineup-data/${seasonFile} geschrieben (${plan.mergedSeasonData.games.length} Spiele gesamt). Kein Commit, kein Push.`);

  if (plan.registryChanged) {
    await writeJsonAtomic(REGISTRY_PATH, plan.mergedRegistry);
    console.log(`--write: lineup-data/groups.json aktualisiert (${plan.diff.groups.added.length} neu, ${plan.diff.groups.changed.length} geändert).`);
  } else {
    console.log('--write: lineup-data/groups.json war bereits konsistent, keine Änderung nötig.');
  }

  process.exitCode = 0;
}

if (process.argv[1]?.replace(/\\/g, '/').endsWith('import-lineup-data.mjs')) {
  main().catch((e) => {
    console.error('Unerwarteter Fehler:', e.message);
    process.exitCode = 1;
  });
}

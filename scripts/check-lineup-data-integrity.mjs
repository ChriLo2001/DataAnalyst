#!/usr/bin/env node
// Read-only Integrity Checker: lineup-data/*.json <-> season-data/*.json <->
// lineup-data/groups.json (Phase 3.5).
//
// Findet Inkonsistenzen zwischen der manuellen Einsatzdaten-Ebene
// (lineup-data) und der objektiven Saisonmanager-Datenbasis (season-data)
// bzw. der clubweiten Gruppen-Registry (lineup-data/groups.json). Meldet nur
// — repariert, migriert, ergänzt oder löscht NIE etwas. Es gibt bewusst
// keine --fix-Option.
//
// Nutzt die bestehenden, UNVERÄNDERTEN Phase-1-Validatoren
// (scripts/lineup-data-validators.mjs) für Grundbausteine (Format-Checks,
// Spieler-ID-Ableitung) statt sie zu duplizieren — implementiert aber neue,
// eigene Cross-File-Logik (Mehr-Dateien-/Mehr-Saisons-übergreifend), die es
// dort noch nicht gab.
//
// Kernlogik (checkLineupDataIntegrity, formatIntegrityReport,
// seasonKeyFromFileName, fileNameFromSeasonKey) ist rein (kein fetch/fs) und
// direkt testbar — I/O ist ausschließlich in main().

import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

import {
  isValidSeasonKeyFormat,
  isValidUuidV4,
  isValidLineupPlayerIdFormat,
  derivePlayerIdsFromSeasonGames,
} from './lineup-data-validators.mjs';

const LINEUP_DATA_DIR = path.resolve(process.cwd(), 'lineup-data');
const SEASON_DATA_DIR = path.resolve(process.cwd(), 'season-data');
const REGISTRY_PATH = path.join(LINEUP_DATA_DIR, 'groups.json');

const SEASON_FILE_REGEX = /^(\d{2})-(\d{2})\.json$/;

/** "25-26.json" -> "25/26", oder null falls der Dateiname nicht passt. */
export function seasonKeyFromFileName(fileName) {
  const m = SEASON_FILE_REGEX.exec(fileName);
  return m ? `${m[1]}/${m[2]}` : null;
}

/** "25/26" -> "25-26.json" */
export function fileNameFromSeasonKey(seasonKey) {
  return `${seasonKey.replace('/', '-')}.json`;
}

/** Akzeptiert sowohl "25-26" (CLI-Form, wie im Auftrag "--season 25-26") als auch "25/26". */
export function normalizeSeasonArg(value) {
  if (typeof value !== 'string') return null;
  if (isValidSeasonKeyFormat(value)) return value;
  const m = /^(\d{2})-(\d{2})$/.exec(value);
  return m ? `${m[1]}/${m[2]}` : null;
}

// ─────────────────────────────────────────────────────────────────────────
// Kernprüfung — rein, kein fetch/fs. Nimmt bereits geladene/geparste Objekte
// entgegen (siehe main() für den I/O-Teil).
// ─────────────────────────────────────────────────────────────────────────

/**
 * @param {object} params
 * @param {Array<{seasonKey:string, fileName:string, data:object|null, readError:string|null}>} params.lineupFiles
 *   alle (ggf. per --season gefilterten) lineup-data/<season>.json-Dateien
 * @param {{data:object|null, readError:string|null}} params.registry
 *   lineup-data/groups.json
 * @param {Map<string, {data:object|null, readError:string|null}>} params.seasonDataBySeason
 *   season-data/<key>.json für JEDE referenzierte Saison (lineupFiles-Saisons
 *   + registry.createdInSeason + registry.nameHistory[].since.season) — vom
 *   Aufrufer bereitzustellen, siehe main().
 * @param {string|null} [params.onlySeason] optionaler --season-Filter; schränkt
 *   NUR ein, welche lineup-data-Datei geprüft wird — die Registry (Punkte 5+6)
 *   wird davon unabhängig immer vollständig geprüft, da groups.json clubweit
 *   ist (Punkt 7) und ein Teilcheck sonst Probleme in nicht betrachteten
 *   Saisons verdecken könnte. Die "ungenutzte Gruppe"-Warnung wird bei
 *   gesetztem onlySeason unterdrückt, weil sie sonst bei jeder Gruppe
 *   anschlagen würde, die (legitim) nur in einer anderen, nicht geprüften
 *   Saison verwendet wird.
 * @returns {{ok:boolean, errors:object[], warnings:object[], summary:object}}
 */
export function checkLineupDataIntegrity({ lineupFiles, registry, seasonDataBySeason, onlySeason = null }) {
  const errors = [];
  const warnings = [];
  const summary = { seasonsChecked: 0, gamesChecked: 0, groupsChecked: 0, combinationsChecked: 0, playersChecked: 0 };

  const err = (code, fields, message) => errors.push({ code, ...fields, message });
  const warn = (code, fields, message) => warnings.push({ code, ...fields, message });

  if (!registry || registry.readError || !registry.data) {
    err('MISSING_GROUPS_REGISTRY', {}, `lineup-data/groups.json konnte nicht geladen werden: ${registry?.readError ?? 'unbekannter Fehler'}`);
  }
  const registryGroups = Array.isArray(registry?.data?.groups) ? registry.data.groups : [];
  const registryGroupIds = new Set(registryGroups.map((g) => g?.groupId).filter((id) => typeof id === 'string'));
  const usedGroupIds = new Set();

  const relevantLineupFiles = onlySeason ? (lineupFiles ?? []).filter((f) => f.seasonKey === onlySeason) : (lineupFiles ?? []);

  for (const file of relevantLineupFiles) {
    summary.seasonsChecked++;
    const { seasonKey, fileName } = file;

    if (file.readError) {
      err('INVALID_LINEUP_FILE', { season: seasonKey }, `lineup-data/${fileName} konnte nicht geladen werden: ${file.readError}`);
      continue;
    }
    const data = file.data;
    if (!data || typeof data !== 'object' || !Array.isArray(data.games)) {
      err('INVALID_LINEUP_FILE', { season: seasonKey }, `lineup-data/${fileName} hat keine gültige Grundstruktur ({season, games:[...]})`);
      continue;
    }

    // 1. Season
    if (data.season !== seasonKey) {
      err('SEASON_MISMATCH', { season: seasonKey }, `Feld "season" ("${data.season}") in lineup-data/${fileName} passt nicht zum Dateinamen (erwartet "${seasonKey}")`);
    }
    const sourceEntry = seasonDataBySeason.get(seasonKey);
    if (!sourceEntry || sourceEntry.readError || !sourceEntry.data) {
      err('MISSING_SEASON_DATA', { season: seasonKey }, `season-data/${fileNameFromSeasonKey(seasonKey)} existiert nicht oder ist nicht lesbar — lineup-data/${fileName} kann nicht gegengeprüft werden`);
      continue; // ohne Referenzdaten sind Game-/Player-Checks für DIESE Saison nicht sinnvoll möglich
    }
    const sourceGames = Array.isArray(sourceEntry.data.games) ? sourceEntry.data.games : [];
    const knownGameIds = new Set(sourceGames.map((g) => g?.id).filter((id) => id !== undefined && id !== null).map(Number));
    const postponedGameIds = new Set(sourceGames.filter((g) => g?.notice_type === 'Postponed').map((g) => Number(g?.id)));
    const validPlayerIds = derivePlayerIdsFromSeasonGames(sourceGames);

    const checkPlayerId = (pid, gameId, contextLabel) => {
      summary.playersChecked++;
      if (!isValidLineupPlayerIdFormat(pid)) {
        err('INVALID_PLAYER_ID_FORMAT', { season: seasonKey, gameId, playerId: pid }, `${contextLabel}: ungültiges Player-ID-Format "${pid}"`);
        return;
      }
      if (!validPlayerIds.has(pid)) {
        err('UNKNOWN_PLAYER_ID', { season: seasonKey, gameId, playerId: pid }, `${contextLabel}: Player-ID "${pid}" ist nicht aus season-data/${fileNameFromSeasonKey(seasonKey)} ableitbar`);
      }
    };
    const checkGroupIdRef = (groupId, gameId, contextLabel) => {
      if (typeof groupId !== 'string') return;
      usedGroupIds.add(groupId);
      if (!isValidUuidV4(groupId)) {
        err('INVALID_GROUP_UUID', { season: seasonKey, gameId, groupId }, `${contextLabel}: groupId "${groupId}" ist keine gültige UUIDv4`);
      } else if (!registryGroupIds.has(groupId)) {
        err('UNKNOWN_GROUP_ID', { season: seasonKey, gameId, groupId }, `${contextLabel}: groupId "${groupId}" existiert nicht in lineup-data/groups.json`);
      }
    };

    for (const game of data.games) {
      summary.gamesChecked++;
      const gameId = game?.gameId;

      // 2. Game-IDs
      if (!knownGameIds.has(Number(gameId))) {
        err('UNKNOWN_GAME_ID', { season: seasonKey, gameId }, `gameId ${gameId} existiert nicht in season-data/${fileNameFromSeasonKey(seasonKey)}`);
        // bewusst KEIN "continue" — Player-/Group-Referenzen dieses Spiels
        // sind unabhängig davon trotzdem prüfbar (siehe "L. mehrere Fehler
        // gleichzeitig -> alle werden gesammelt").
      } else if (postponedGameIds.has(Number(gameId))) {
        // Bewusste, dokumentierte Entscheidung (siehe docs/lineup-data-integrity.md):
        // eine gameId, die in season-data existiert, aber als "Postponed"
        // markiert ist, ist kein Fehler (das Spiel existiert ja), aber
        // erwähnenswert — nur zur Kenntnisnahme, keine automatische Aktion.
        warn('POSTPONED_GAME_REFERENCED', { season: seasonKey, gameId }, `gameId ${gameId} ist in season-data als "Postponed" markiert, wird aber in lineup-data referenziert`);
      }

      // 3. Player-IDs (roster)
      for (const pid of Array.isArray(game?.roster?.field) ? game.roster.field : []) checkPlayerId(pid, gameId, 'roster.field');
      for (const pid of Array.isArray(game?.roster?.goalies) ? game.roster.goalies : []) checkPlayerId(pid, gameId, 'roster.goalies');

      // 3+4. groups[].players[].playerId + groups[].groupId
      for (const group of Array.isArray(game?.groups) ? game.groups : []) {
        for (const entry of Array.isArray(group?.players) ? group.players : []) {
          checkPlayerId(entry?.playerId, gameId, `groups[].players[] (Gruppe ${group?.groupId})`);
        }
        checkGroupIdRef(group?.groupId, gameId, 'groups[].groupId');
      }

      // 3+4. confirmedCombinations[].players + confirmedCombinations[].groupId
      for (const combo of Array.isArray(game?.confirmedCombinations) ? game.confirmedCombinations : []) {
        summary.combinationsChecked++;
        for (const pid of Array.isArray(combo?.players) ? combo.players : []) {
          checkPlayerId(pid, gameId, 'confirmedCombinations[].players');
        }
        checkGroupIdRef(combo?.groupId, gameId, 'confirmedCombinations[].groupId');
      }
    }
  }

  // ── 5+6. Registry: createdInSeason/createdInGame + nameHistory ──
  // Bewusst UNABHÄNGIG von onlySeason immer vollständig geprüft (siehe
  // Kommentar oben) — Cross-Season-Wiederverwendung derselben Gruppe ist
  // laut Konzept ausdrücklich zulässig (Punkt 7): es gibt HIER keine Prüfung,
  // die verlangt, dass eine Gruppe nur innerhalb ihrer createdInSeason
  // verwendet wird.
  for (const entry of registryGroups) {
    summary.groupsChecked++;
    const groupId = entry?.groupId;
    const createdInSeason = entry?.createdInSeason;
    const createdInGame = entry?.createdInGame;

    if (!isValidSeasonKeyFormat(createdInSeason)) {
      err('REGISTRY_INVALID_CREATED_SEASON_FORMAT', { groupId }, `groups.json: Eintrag "${groupId}" hat ein ungültiges createdInSeason-Format ("${createdInSeason}")`);
    } else {
      const sourceEntry = seasonDataBySeason.get(createdInSeason);
      if (!sourceEntry || sourceEntry.readError || !sourceEntry.data) {
        err('REGISTRY_UNKNOWN_CREATED_SEASON', { groupId, season: createdInSeason }, `groups.json: Eintrag "${groupId}" referenziert createdInSeason "${createdInSeason}", für die keine season-data existiert`);
      } else {
        const sourceGames = Array.isArray(sourceEntry.data.games) ? sourceEntry.data.games : [];
        const knownIds = new Set(sourceGames.map((g) => g?.id).filter((id) => id !== undefined && id !== null).map(Number));
        if (!Number.isInteger(createdInGame) || !knownIds.has(Number(createdInGame))) {
          err('REGISTRY_UNKNOWN_CREATED_GAME', { groupId, season: createdInSeason, gameId: createdInGame }, `groups.json: Eintrag "${groupId}" referenziert createdInGame ${createdInGame}, das nicht in season-data/${fileNameFromSeasonKey(createdInSeason)} existiert`);
        }
      }
    }

    const history = entry?.nameHistory;
    if (!Array.isArray(history)) {
      err('REGISTRY_INVALID_NAME_HISTORY', { groupId }, `groups.json: Eintrag "${groupId}" hat kein gültiges nameHistory-Array`);
    } else {
      history.forEach((h, idx) => {
        const histSeason = h?.since?.season;
        const histGameId = h?.since?.gameId;
        if (!isValidSeasonKeyFormat(histSeason)) {
          err('REGISTRY_INVALID_NAME_HISTORY', { groupId }, `groups.json: nameHistory[${idx}] von "${groupId}" hat ein ungültiges since.season-Format ("${histSeason}")`);
          return;
        }
        const sourceEntry = seasonDataBySeason.get(histSeason);
        if (!sourceEntry || sourceEntry.readError || !sourceEntry.data) {
          err('REGISTRY_UNKNOWN_HISTORY_SEASON', { groupId, season: histSeason }, `groups.json: nameHistory[${idx}] von "${groupId}" referenziert Saison "${histSeason}", für die keine season-data existiert`);
          return;
        }
        const sourceGames = Array.isArray(sourceEntry.data.games) ? sourceEntry.data.games : [];
        const knownIds = new Set(sourceGames.map((g) => g?.id).filter((id) => id !== undefined && id !== null).map(Number));
        if (!Number.isInteger(histGameId) || !knownIds.has(Number(histGameId))) {
          err('REGISTRY_UNKNOWN_HISTORY_GAME', { groupId, season: histSeason, gameId: histGameId }, `groups.json: nameHistory[${idx}] von "${groupId}" referenziert gameId ${histGameId}, das nicht in season-data/${fileNameFromSeasonKey(histSeason)} existiert`);
        }
      });
    }

    // Bewusste, dokumentierte Zusatz-Warnung (siehe docs/lineup-data-integrity.md):
    // rein informativ, blockiert nichts, ändert nichts. Nur bei ungefiltertem
    // Lauf aussagekräftig (siehe onlySeason-Kommentar oben).
    if (!onlySeason && typeof groupId === 'string' && !usedGroupIds.has(groupId)) {
      warn('UNUSED_REGISTRY_GROUP', { groupId }, `groups.json: Eintrag "${groupId}" ("${entry?.currentName}") wird in keiner geprüften lineup-data-Datei referenziert`);
    }
  }

  return { ok: errors.length === 0, errors, warnings, summary };
}

/** Formatiert den Bericht für die Konsole — kompakt, code-basiert. */
export function formatIntegrityReport(report) {
  const lines = [];
  lines.push('─'.repeat(70));
  lines.push('Lineup-Data Integrity Check (read-only, keine Reparatur)');
  lines.push('─'.repeat(70));
  lines.push(`Saisons geprüft:        ${report.summary.seasonsChecked}`);
  lines.push(`Spiele geprüft:         ${report.summary.gamesChecked}`);
  lines.push(`Gruppen geprüft:        ${report.summary.groupsChecked}`);
  lines.push(`Kombinationen geprüft:  ${report.summary.combinationsChecked}`);
  lines.push(`Spieler-Referenzen:     ${report.summary.playersChecked}`);
  lines.push(`Status:                 ${report.ok ? 'OK' : 'FEHLER GEFUNDEN'}`);
  if (report.warnings.length) {
    lines.push('');
    lines.push(`Warnungen (${report.warnings.length}):`);
    for (const w of report.warnings) lines.push(`  [${w.code}] ${w.message}`);
  }
  if (report.errors.length) {
    lines.push('');
    lines.push(`Fehler (${report.errors.length}):`);
    for (const e of report.errors) lines.push(`  [${e.code}] ${e.message}`);
  }
  lines.push('─'.repeat(70));
  return lines.join('\n');
}

// ─────────────────────────────────────────────────────────────────────────
// I/O + CLI (main) — KEINE Schreiboption, absichtlich kein --fix.
// ─────────────────────────────────────────────────────────────────────────

async function readJsonFile(filePath) {
  let raw;
  try {
    raw = await readFile(filePath, 'utf8');
  } catch (e) {
    return { data: null, readError: e.message };
  }
  try {
    return { data: JSON.parse(raw), readError: null };
  } catch (e) {
    return { data: null, readError: `ungültiges JSON: ${e.message}` };
  }
}

async function discoverLineupSeasonFiles(onlySeasonKey) {
  let entries;
  try {
    entries = await readdir(LINEUP_DATA_DIR);
  } catch {
    return [];
  }
  const files = [];
  for (const fileName of entries) {
    if (fileName === 'groups.json') continue;
    const seasonKey = seasonKeyFromFileName(fileName);
    if (!seasonKey) continue; // andere Dateien im Verzeichnis werden ignoriert, nicht als Fehler gewertet
    if (onlySeasonKey && seasonKey !== onlySeasonKey) continue;
    const { data, readError } = await readJsonFile(path.join(LINEUP_DATA_DIR, fileName));
    files.push({ seasonKey, fileName, data, readError });
  }
  return files.sort((a, b) => a.seasonKey.localeCompare(b.seasonKey));
}

export async function main(argv = process.argv.slice(2)) {
  const seasonIdx = argv.indexOf('--season');
  const seasonArg = seasonIdx !== -1 ? argv[seasonIdx + 1] : undefined;
  const wantsJson = argv.includes('--json');

  let onlySeasonKey = null;
  if (seasonArg !== undefined) {
    onlySeasonKey = normalizeSeasonArg(seasonArg);
    if (!onlySeasonKey) {
      console.error(`Ungültiger --season-Wert "${seasonArg}" (erwartet z.B. "25-26" oder "25/26").`);
      process.exitCode = 1;
      return;
    }
  }

  const lineupFiles = await discoverLineupSeasonFiles(onlySeasonKey);
  const registry = await readJsonFile(REGISTRY_PATH);

  const neededSeasons = new Set(lineupFiles.map((f) => f.seasonKey));
  for (const g of Array.isArray(registry.data?.groups) ? registry.data.groups : []) {
    if (typeof g?.createdInSeason === 'string') neededSeasons.add(g.createdInSeason);
    for (const h of Array.isArray(g?.nameHistory) ? g.nameHistory : []) {
      if (typeof h?.since?.season === 'string') neededSeasons.add(h.since.season);
    }
  }

  const seasonDataBySeason = new Map();
  for (const key of neededSeasons) {
    seasonDataBySeason.set(key, await readJsonFile(path.join(SEASON_DATA_DIR, fileNameFromSeasonKey(key))));
  }

  const report = checkLineupDataIntegrity({ lineupFiles, registry, seasonDataBySeason, onlySeason: onlySeasonKey });

  if (wantsJson) {
    console.log(JSON.stringify(report, null, 2));
  } else {
    console.log(formatIntegrityReport(report));
  }
  process.exitCode = report.ok ? 0 : 1;
}

if (process.argv[1]?.replace(/\\/g, '/').endsWith('check-lineup-data-integrity.mjs')) {
  main().catch((e) => {
    console.error('Unerwarteter Fehler:', e.message);
    process.exitCode = 1;
  });
}

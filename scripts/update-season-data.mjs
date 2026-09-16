#!/usr/bin/env node
// Aktualisiert season-data/*.json aus der Saisonmanager-API.
//
// Reine Datenpipeline: kein Mapping auf ein eigenes Schema, keine Analytics-
// Berechnung. Jede geschriebene Saisondatei bleibt { season, label, games:[...] },
// und jedes games[]-Element ist die unveränderte Antwort von GET /games/:id —
// genau das Format, das index.html/normalizeGame() bereits für die vier
// archivierten Saisons erwartet.
//
// Alle Funktionen mit reiner Logik (kein fetch/fs) sind benannt exportiert,
// damit scripts/test-update-season-data.mjs sie ohne Netzwerk/API-Key prüfen
// kann (siehe dort für den Dry-Run mit aufgezeichneten Beispiel-Antworten).

import { readFile, writeFile, rename, mkdir } from 'node:fs/promises';
import path from 'node:path';

const API_BASE = 'https://saisonmanager.de/api/v2';
const SEASON_DATA_DIR = path.resolve(process.cwd(), 'season-data');
const MANIFEST_PATH = path.join(SEASON_DATA_DIR, 'seasons.json');

// Anfragen pro Minute deutlich unter dem dokumentierten Limit (60/min) halten,
// auch beim vollständigen Erstbefüllen einer neuen Saison mit ~50 Spielen.
const REQUEST_DELAY_MS = 1100;

// ─────────────────────────────────────────────────────────────────────────
// HTTP
// ─────────────────────────────────────────────────────────────────────────

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * @param {string} apiKey
 * @param {string} pathAndQuery z.B. "leagues/1897/schedule"
 */
async function fetchApiJson(apiKey, pathAndQuery) {
  const url = `${API_BASE}/${pathAndQuery.replace(/^\/+/, '')}`;
  const res = await fetch(url, {
    headers: { Accept: 'application/json', 'X-Api-Key': apiKey },
  });
  const text = await res.text();
  if (!res.ok) {
    const err = new Error(`HTTP ${res.status} für ${pathAndQuery}`);
    err.status = res.status;
    err.body = text.slice(0, 300);
    throw err;
  }
  try {
    return JSON.parse(text);
  } catch (e) {
    const err = new Error(`Ungültiges JSON von ${pathAndQuery}: ${e.message}`);
    err.body = text.slice(0, 300);
    throw err;
  }
}

// ─────────────────────────────────────────────────────────────────────────
// Manifest & Saisondateien (I/O)
// ─────────────────────────────────────────────────────────────────────────

async function loadManifest() {
  try {
    const raw = await readFile(MANIFEST_PATH, 'utf8');
    const json = JSON.parse(raw);
    if (!Array.isArray(json?.seasons)) throw new Error('seasons.json: kein seasons[]-Array');
    return json;
  } catch (e) {
    if (e.code === 'ENOENT') return { seasons: [] };
    throw e;
  }
}

async function loadSeasonFile(file) {
  try {
    const raw = await readFile(path.join(SEASON_DATA_DIR, file), 'utf8');
    const json = JSON.parse(raw);
    if (!Array.isArray(json?.games)) return null;
    return json;
  } catch (e) {
    if (e.code === 'ENOENT') return null;
    return null; // kaputte lokale Datei zählt wie "nicht vorhanden", nicht wie ein Fataler Fehler
  }
}

/** Schreibt zuerst in eine Temp-Datei und ersetzt danach atomar (rename). */
export async function writeJsonAtomic(filePath, data) {
  await mkdir(path.dirname(filePath), { recursive: true });
  const tmpPath = `${filePath}.tmp-${process.pid}`;
  await writeFile(tmpPath, JSON.stringify(data), 'utf8');
  await rename(tmpPath, filePath);
}

// ─────────────────────────────────────────────────────────────────────────
// Saison-Erkennung — KEIN Raten. Siehe Bericht: current_season_id ist bei
// Saisonmanager ein interner, für uns bedeutungsloser Zähler; die einzige für
// uns nutzbare Information ist der Freitext-Saisonname aus /api/v2/init.
// Lässt sich daraus kein eindeutiges "YY/YY" ableiten, wird NICHTS vermutet —
// die Funktion liefert dann null und der Aufrufer behält die bisherige
// Saison bei.
// ─────────────────────────────────────────────────────────────────────────

/**
 * @param {string} name Freitext-Saisonname von Saisonmanager, z.B. "2025/2026",
 *   "Saison 2025/26", "25/26" (siehe Setting#season_name im Backend: es gibt
 *   keine feste Schreibweise).
 * @returns {string|null} "25/26"-Format oder null, wenn nicht eindeutig.
 */
export function parseSeasonKeyFromName(name) {
  if (typeof name !== 'string') return null;

  let m = name.match(/(20\d{2})\D{0,3}(20\d{2})/);
  if (m) {
    const start = Number(m[1]);
    const end = Number(m[2]);
    if (end === start + 1) return `${String(start).slice(-2)}/${String(end).slice(-2)}`;
    return null; // zwei 4-stellige Jahre, aber nicht aufeinanderfolgend -> zweideutig
  }

  m = name.match(/(20\d{2})\D{0,3}(\d{2})\b/);
  if (m) {
    const start = Number(m[1]);
    const endShort = Number(m[2]);
    const expectedEndShort = (start + 1) % 100;
    if (endShort === expectedEndShort) return `${String(start).slice(-2)}/${String(endShort).padStart(2, '0')}`;
    return null;
  }

  m = name.match(/\b(\d{2})\D{0,3}(\d{2})\b/);
  if (m) {
    const startShort = Number(m[1]);
    const endShort = Number(m[2]);
    if (endShort === (startShort + 1) % 100) {
      return `${String(startShort).padStart(2, '0')}/${String(endShort).padStart(2, '0')}`;
    }
    return null;
  }

  return null;
}

/**
 * Liest current_season_id + die Saisonliste aus /api/v2/init und übersetzt
 * die aktuell aktive Saison in unser "YY/YY"-Schlüsselformat.
 * @returns {Promise<{key:string, rawName:string}|null>}
 */
export async function detectCurrentSeasonKey(apiKey) {
  const init = await fetchApiJson(apiKey, 'init');
  const currentId = init?.current_season_id;
  const seasons = Array.isArray(init?.seasons) ? init.seasons : [];
  const entry = seasons.find((s) => s?.id === currentId) ?? seasons.find((s) => s?.current === true);
  if (!entry?.name) {
    console.warn(`[season-detect] /api/v2/init lieferte keinen lesbaren Saisonnamen für current_season_id=${currentId}.`);
    return null;
  }
  const key = parseSeasonKeyFromName(entry.name);
  if (!key) {
    console.warn(`[season-detect] Saisonname "${entry.name}" lässt sich nicht eindeutig in "YY/YY" übersetzen — breche Saisonerkennung ab, rate nicht.`);
    return null;
  }
  return { key, rawName: entry.name };
}

// ─────────────────────────────────────────────────────────────────────────
// Liga-Zuordnung — ebenfalls ohne Raten: wir suchen in der aktuellen
// Ligaliste unseres Verbands (game_operation_id) nach EXAKT der Liga, deren
// Name/Kurzname wir aus unseren eigenen, bereits gespeicherten Saisons
// kennen. Mehrdeutige oder fehlende Treffer -> null, keine Vermutung.
// ─────────────────────────────────────────────────────────────────────────

/**
 * @param {{name:string, short_name:string, id:number}[]} leagues
 * @param {Set<string>} knownNames bereits normalisierte (trim+lowercase) Namen/Kurznamen
 */
export function findMatchingLeague(leagues, knownNames) {
  const norm = (s) => String(s ?? '').trim().toLowerCase();
  const matches = (leagues || []).filter(
    (l) => knownNames.has(norm(l.name)) || knownNames.has(norm(l.short_name)),
  );
  if (matches.length === 1) return matches[0];
  return null; // 0 oder >1 Treffer: nicht eindeutig
}

// ─────────────────────────────────────────────────────────────────────────
// Team-/Vereins-Rohdaten (NICHT games[]) — reine Beobachtung, keine
// Interpretation. Saisonmanager unterscheidet strukturell:
//   - club_id: die stabile Vereinsidentität über Saisons hinweg
//   - team_id (aus den Spielen bekannt): eine an EINE Liga/Saison gebundene
//     Mannschafts-Instanz (neu je Saison)
//   - syndicate/syndicate_clubs: ob/aus welchen Vereinen eine Mannschaft eine
//     Spielgemeinschaft ist — von Saisonmanager selbst gepflegt, kein Text-Raten
// Für "1. Mannschaft" vs. "2. Mannschaft" (z.B. zwei Feuerbach-Teams) gibt es
// dagegen KEIN strukturiertes Feld im Schema (siehe db/schema.rb: teams hat
// weder squad_number noch team_number o.ä.) — nur name/short_name als Freitext.
// Das wird deshalb absichtlich unverändert durchgereicht und NICHT geraten
// (siehe Bericht, Abschnitt zu Feuerbach/SG Heidelberg-Mannheim).
// ─────────────────────────────────────────────────────────────────────────

/**
 * @param {Array<{teams?: Array<object>}>} clubs Antwort von
 *   GET /game_operations/:id/clubs (jeder Club mit seinen Team#full_hash-Objekten)
 */
export function extractTeamDirectory(clubs) {
  const teams = [];
  for (const club of clubs ?? []) {
    for (const t of club?.teams ?? []) {
      if (t?.id === undefined || t?.id === null) continue;
      teams.push({
        teamId: t.id,
        name: t.name ?? null,
        shortName: t.short_name ?? null,
        clubId: t.club_id ?? null,
        syndicate: Boolean(t.syndicate),
        syndicateClubs: Array.isArray(t.syndicate_clubs) ? t.syndicate_clubs : [],
        leagueId: t.league_id ?? null,
      });
    }
  }
  return teams;
}

function collectKnownLeagueNames(seasonFiles) {
  const names = new Set();
  for (const data of seasonFiles) {
    for (const g of data?.games ?? []) {
      if (g.league_name) names.add(String(g.league_name).trim().toLowerCase());
      if (g.league_short_name) names.add(String(g.league_short_name).trim().toLowerCase());
    }
  }
  return names;
}

// ─────────────────────────────────────────────────────────────────────────
// Diff: welche Spiele müssen (neu) geladen werden?
// ─────────────────────────────────────────────────────────────────────────

/**
 * @param {Array<object>} schedule ScheduleItem[] von GET /leagues/:id/schedule
 * @param {Map<string, object>} existingGamesById id(String) -> gespeichertes full_hash-Objekt
 * @returns {string[]} IDs (als String), die per GET /games/:id (neu) geladen werden sollen
 */
export function decideRefetchIds(schedule, existingGamesById) {
  const ids = [];
  for (const item of schedule ?? []) {
    const id = String(item.game_id ?? item.id ?? '');
    if (!id) continue;
    const existing = existingGamesById.get(id);
    if (!existing) {
      ids.push(id);
      continue;
    }
    // Noch nicht abgeschlossen -> bei jedem Lauf aktualisieren.
    if (existing.ended !== true) {
      ids.push(id);
      continue;
    }
    // Abgeschlossen: nur bei tatsächlicher Änderung neu laden.
    const scheduleTime = item.time ?? null;
    const existingTime = existing.start_time ?? null;
    const changed =
      Boolean(item.started) !== Boolean(existing.started) ||
      Boolean(item.ended) !== Boolean(existing.ended) ||
      (item.result_string ?? null) !== (existing.result_string ?? null) ||
      (item.date ?? null) !== (existing.date ?? null) ||
      scheduleTime !== existingTime ||
      (item.arena_name ?? null) !== (existing.arena_name ?? null) ||
      (item.notice_type ?? null) !== (existing.notice_type ?? null);
    if (changed) ids.push(id);
  }
  return ids;
}

// ─────────────────────────────────────────────────────────────────────────
// Zusammenführen + Schutz vor kaputten/leeren API-Antworten
// ─────────────────────────────────────────────────────────────────────────

/**
 * @param {object[]} existingGames bisherige games[] (kann leer sein)
 * @param {Map<string, object>} freshById frisch geladene Spiele dieser Ausführung
 * @param {Array<object>} schedule aktueller Spielplan (bestimmt die Reihenfolge/Vollständigkeit)
 */
export function mergeGames(existingGames, freshById, schedule) {
  const existingById = new Map(existingGames.map((g) => [String(g.id), g]));
  const scheduleIds = new Set((schedule ?? []).map((s) => String(s.game_id ?? s.id ?? '')).filter(Boolean));

  const merged = [];
  const seen = new Set();
  for (const id of scheduleIds) {
    const game = freshById.get(id) ?? existingById.get(id);
    if (game) {
      merged.push(game);
      seen.add(id);
    }
  }
  // Spiele, die wir bereits kennen, aber die (aus welchem Grund auch immer)
  // aktuell nicht im Spielplan auftauchen, NICHT verwerfen (siehe Bericht:
  // lieber veraltete korrekte Daten behalten als etwas zu verlieren).
  for (const g of existingGames) {
    const id = String(g.id);
    if (!seen.has(id)) {
      merged.push(g);
      seen.add(id);
    }
  }
  return merged;
}

/**
 * @returns {{ok:true}|{ok:false, reason:string}}
 */
export function validateMergedSeason(existingGames, mergedGames) {
  if (!Array.isArray(mergedGames)) return { ok: false, reason: 'games ist kein Array' };
  if (mergedGames.some((g) => !g || g.id === undefined || g.id === null)) {
    return { ok: false, reason: 'mindestens ein Spiel ohne id' };
  }
  const before = existingGames.length;
  const after = mergedGames.length;
  if (before > 0 && after === 0) {
    return { ok: false, reason: `Ergebnis wäre leer, vorher ${before} Spiele — verweigert` };
  }
  // Grober Schutz vor einem drastischen, unerklärten Einbruch (z.B. API liefert
  // nur einen Teil-Spielplan zurück). Ein legitimer Rückgang (abgesagtes Spiel)
  // betrifft immer nur einzelne Spiele, keinen zweistelligen Anteil auf einmal.
  if (before >= 6 && after < before * 0.5) {
    return { ok: false, reason: `Rückgang von ${before} auf ${after} Spiele wirkt unplausibel — verweigert` };
  }
  return { ok: true };
}

// ─────────────────────────────────────────────────────────────────────────
// Manifest-Pflege
// ─────────────────────────────────────────────────────────────────────────

export function fileNameForKey(key) {
  return `${key.replace('/', '-')}.json`;
}

/** "25/26" -> "2025/26", passend zum Format bestehender label-Werte (siehe STATIC_SEASON_DATA). */
export function deriveLabelFromKey(key) {
  const m = /^(\d{2})\/(\d{2})$/.exec(key);
  if (!m) return key;
  return `20${m[1]}/${m[2]}`;
}

/**
 * Reine Funktion: baut das neue Manifest aus dem alten + der erkannten
 * aktuellen Saison. Bestehende Einträge werden nie gelöscht, nur die
 * status-Flags (current/archived) und optionale leagueId/gameOperationId
 * werden gepflegt.
 */
export function buildManifestUpdate(manifest, { currentKey, label, leagueId, gameOperationId }) {
  // Eigene Kopien der Einträge, nicht nur des Arrays: der Aufrufer vergleicht
  // das Ergebnis später per JSON.stringify gegen das alte Manifest, um zu
  // entscheiden, ob geschrieben werden muss — ein In-Place-Mutieren der
  // Original-Objekte würde diesen Vergleich verfälschen (Alt == Neu, weil
  // dieselben Objektreferenzen).
  const seasons = (manifest.seasons ?? []).map((s) => ({ ...s }));
  const byKey = new Map(seasons.map((s, i) => [s.key, i]));

  for (const s of seasons) {
    if (s.status === 'current' && s.key !== currentKey) s.status = 'archived';
  }

  if (byKey.has(currentKey)) {
    const idx = byKey.get(currentKey);
    seasons[idx] = {
      ...seasons[idx],
      status: 'current',
      file: seasons[idx].file || fileNameForKey(currentKey),
      label: seasons[idx].label || label,
      leagueId: leagueId ?? seasons[idx].leagueId,
      gameOperationId: gameOperationId ?? seasons[idx].gameOperationId,
    };
  } else {
    seasons.push({
      key: currentKey,
      label,
      file: fileNameForKey(currentKey),
      status: 'current',
      leagueId,
      gameOperationId,
    });
  }

  return { seasons };
}

// ─────────────────────────────────────────────────────────────────────────
// Orchestrierung (I/O) — bewusst dünn, die eigentliche Logik steht oben rein.
// ─────────────────────────────────────────────────────────────────────────

export async function resolveLeagueForCurrentSeason(apiKey, manifest, currentKey) {
  const existingEntry = manifest.seasons.find((s) => s.key === currentKey);
  if (existingEntry?.leagueId) {
    return { leagueId: existingEntry.leagueId, gameOperationId: existingEntry.gameOperationId };
  }

  // Neue Saison: gameOperationId + bekannte Liganamen aus allen lokal
  // vorhandenen Saisondateien sammeln (nicht nur der letzten), da sich
  // Kurznamen zwischen Saisons leicht unterscheiden (Leerzeichen, Abkürzung).
  const allFiles = [];
  for (const s of manifest.seasons) {
    if (!s.file) continue;
    const data = await loadSeasonFile(s.file);
    if (data) allFiles.push(data);
  }
  const gameOperationId = allFiles
    .flatMap((d) => d.games ?? [])
    .map((g) => g.game_operation_id)
    .find((v) => v !== undefined && v !== null);

  if (!gameOperationId) {
    console.error('[league-detect] Kein game_operation_id in vorhandenen Saisondaten gefunden — Liga kann nicht sicher bestimmt werden.');
    return null;
  }

  const knownNames = collectKnownLeagueNames(allFiles);
  const leagues = await fetchApiJson(apiKey, `game_operations/${gameOperationId}/leagues`);
  const match = findMatchingLeague(Array.isArray(leagues) ? leagues : [], knownNames);
  if (!match) {
    console.error(
      `[league-detect] Keine eindeutige Liga in game_operations/${gameOperationId}/leagues gefunden ` +
        `(bekannte Namen: ${[...knownNames].join(', ')}). Breche ab, rate nicht.`,
    );
    return null;
  }
  return { leagueId: match.id, gameOperationId };
}

/**
 * Bestenfalls-Anreicherung, NICHT Teil der eigentlichen Spieldaten-Pipeline:
 * schreibt die Rohstruktur (Team-ID, Name in dieser Saison, club_id,
 * syndicate/syndicate_clubs) für die aktuelle Saison in eine separate Datei.
 * Dient als Grundlage für eine spätere, von Menschen gepflegte
 * Identitäts-/Mannschaftsnummer-Zuordnung (siehe Bericht) — legt selbst aber
 * keine Interpretation fest und wird von index.html nicht gelesen. Ein
 * Fehler hier darf die eigentliche Spieldaten-Aktualisierung nie verhindern,
 * deshalb wird er nur gewarnt, nicht propagiert.
 */
async function updateTeamDirectory(apiKey, { key, gameOperationId }) {
  const file = `teams-${fileNameForKey(key).replace('.json', '')}.json`;
  try {
    const clubs = await fetchApiJson(apiKey, `game_operations/${gameOperationId}/clubs`);
    const teams = extractTeamDirectory(Array.isArray(clubs) ? clubs : []);
    const data = { season: key, teams };
    let existing = null;
    try {
      existing = JSON.parse(await readFile(path.join(SEASON_DATA_DIR, file), 'utf8'));
    } catch (_e) {
      existing = null; // Datei fehlt oder ist kaputt -> wie "noch nicht vorhanden" behandeln
    }
    if (existing && JSON.stringify(existing) === JSON.stringify(data)) return;
    await writeJsonAtomic(path.join(SEASON_DATA_DIR, file), data);
    console.log(`[${key}] season-data/${file} aktualisiert (${teams.length} Teams, reine Rohdaten, keine Identitätszuordnung).`);
  } catch (e) {
    console.warn(`[teams] Team-/Vereinsverzeichnis für ${key} konnte nicht aktualisiert werden (${e.message}) — unkritisch, Spieldaten sind davon nicht betroffen.`);
  }
}

export async function updateSeason(apiKey, manifest, { key, label, leagueId, gameOperationId }) {
  const file = manifest.seasons.find((s) => s.key === key)?.file || fileNameForKey(key);
  const existingFile = await loadSeasonFile(file);
  const fileExistedBefore = existingFile !== null;
  const existingData = existingFile ?? { season: key, label, games: [] };
  const existingGames = existingData.games ?? [];
  const existingGamesById = new Map(existingGames.map((g) => [String(g.id), g]));

  let rawSchedule;
  try {
    rawSchedule = await fetchApiJson(apiKey, `leagues/${leagueId}/schedule`);
  } catch (e) {
    console.error(`[schedule] Abruf fehlgeschlagen für Liga ${leagueId}: ${e.message} — season-data/${file} bleibt unverändert.`);
    return { changed: false };
  }
  // Eine Liga/Saison kann bereits existieren, bevor ein Spielplan angelegt
  // wurde (siehe Bericht: 26/27 ist im Saisonmanager bereits als Saison
  // geführt, aber noch ohne Spiele). `[]` ist dafür der erwartete Normalfall;
  // `null`/`undefined` wird defensiv genauso behandelt (nicht dokumentiert,
  // aber ebenso plausibel für "keine Einträge"). Nur ein tatsächlich falscher
  // Typ (z.B. ein Fehlerobjekt statt eines Arrays) gilt als Fehler.
  const schedule = Array.isArray(rawSchedule) ? rawSchedule : rawSchedule == null ? [] : null;
  if (schedule === null) {
    console.error(`[schedule] Unerwartetes Format (kein Array) für Liga ${leagueId} — season-data/${file} bleibt unverändert.`);
    return { changed: false };
  }

  const refetchIds = decideRefetchIds(schedule, existingGamesById);
  console.log(`[${key}] Spielplan: ${schedule.length} Spiele, davon ${refetchIds.length} zu (neu) laden.`);

  const freshById = new Map();
  const failedIds = [];
  for (const id of refetchIds) {
    try {
      const raw = await fetchApiJson(apiKey, `games/${id}`);
      if (!raw || typeof raw !== 'object' || raw.id === undefined) {
        throw new Error('Antwort ohne id-Feld');
      }
      freshById.set(String(raw.id), raw);
    } catch (e) {
      failedIds.push(id);
      console.warn(`[games/${id}] fehlgeschlagen (${e.message}) — behalte vorhandene Version, falls vorhanden.`);
    }
    await sleep(REQUEST_DELAY_MS);
  }
  if (failedIds.length) {
    console.warn(`[${key}] ${failedIds.length} Spiel(e) konnten nicht geladen werden: ${failedIds.join(', ')}`);
  }

  const merged = mergeGames(existingGames, freshById, schedule);
  const validation = validateMergedSeason(existingGames, merged);
  if (!validation.ok) {
    console.error(`[${key}] Validierung fehlgeschlagen: ${validation.reason} — season-data/${file} bleibt unverändert.`);
    return { changed: false };
  }

  const finalData = { season: key, label: label || existingData.label || key, games: merged };
  // Nicht nur inhaltlich vergleichen: Existierte noch KEINE Datei, muss sie
  // angelegt werden, selbst wenn das Ergebnis (z.B. eine brandneue Saison
  // ohne Spielplan) zufällig mit dem synthetisierten Leer-Default
  // übereinstimmt ({season,label,games:[]}). Sonst bliebe
  // season-data/<neue-saison>.json für immer ungeschrieben.
  const unchanged = fileExistedBefore && JSON.stringify(finalData) === JSON.stringify(existingData);
  if (unchanged) {
    console.log(`[${key}] Keine inhaltliche Änderung.`);
    return { changed: false };
  }

  await writeJsonAtomic(path.join(SEASON_DATA_DIR, file), finalData);
  console.log(`[${key}] season-data/${file} aktualisiert (${merged.length} Spiele).`);
  return { changed: true, file, leagueId, gameOperationId };
}

/**
 * Holt fehlende oder leere season-data/*.json-Dateien für Saisons nach, die
 * bereits im Manifest stehen, aber (noch) keine lokale Datei mit Spielen
 * haben — z.B. weil dieses Skript zum ersten Mal mit einem echten API-Key
 * läuft und die Datei nie geschrieben wurde. Läuft NACH der Erkennung der
 * aktuellen Saison und lässt `skipKey` (die aktuelle Saison) aus, da diese
 * gleich danach ohnehin regulär über updateSeason() behandelt wird.
 *
 * Wichtige Einschränkung (siehe Bericht): game_operations/:id/leagues
 * liefert bei Saisonmanager ohne season_id-Parameter ausschließlich die
 * Ligen der SERVERSEITIG aktuellen Saison. Für jede andere (nicht-aktuelle)
 * Saison lässt sich eine leagueId deshalb nicht automatisch neu entdecken —
 * nötig ist eine bereits im Manifest hinterlegte leagueId (z.B. 25/26:
 * leagueId 1897, gameOperationId 4). Fehlt sie, wird NICHT geraten, sondern
 * der Eintrag übersprungen und klar geloggt.
 */
export async function backfillMissingSeasonFiles(apiKey, manifest, skipKey) {
  for (const entry of manifest.seasons ?? []) {
    if (entry.key === skipKey) continue;
    if (!entry.file) continue;

    const existing = await loadSeasonFile(entry.file);
    const hasGames = Array.isArray(existing?.games) && existing.games.length > 0;
    if (hasGames) continue; // bereits vorhanden und befüllt -> kein unnötiger API-Aufruf

    if (!entry.leagueId) {
      console.warn(
        `[backfill] ${entry.key}: keine leagueId im Manifest hinterlegt — kann nicht sicher nachgeholt werden ` +
          `(automatische Liga-Neuerkennung ist nur für die aktuelle Saison möglich), überspringe.`,
      );
      continue;
    }

    console.log(`[backfill] ${entry.key}: season-data/${entry.file} fehlt oder ist leer — hole vollständig nach.`);
    await updateSeason(apiKey, manifest, {
      key: entry.key,
      label: entry.label,
      leagueId: entry.leagueId,
      gameOperationId: entry.gameOperationId,
    });
  }
}

export async function main() {
  const apiKey = process.env.SAISONMANAGER_API_KEY;
  if (!apiKey) {
    console.error('SAISONMANAGER_API_KEY fehlt (erwartet als GitHub-Secret über die Umgebung) — breche ab, ändere nichts.');
    process.exitCode = 1;
    return;
  }

  const manifest = await loadManifest();

  let currentKey = manifest.seasons.find((s) => s.status === 'current')?.key ?? null;
  let currentLabel = manifest.seasons.find((s) => s.key === currentKey)?.label ?? currentKey;

  try {
    const detected = await detectCurrentSeasonKey(apiKey);
    if (detected && detected.key !== currentKey) {
      console.log(`[season-detect] Saisonmanager meldet aktuelle Saison "${detected.rawName}" -> Schlüssel ${detected.key} (bisher: ${currentKey ?? 'keine'}).`);
      currentKey = detected.key;
      currentLabel = deriveLabelFromKey(detected.key);
    } else if (!detected) {
      console.warn('[season-detect] Konnte aktuelle Saison nicht sicher bestimmen — verwende bisherige Manifest-Angabe unverändert.');
    }
  } catch (e) {
    console.warn(`[season-detect] /api/v2/init nicht erreichbar (${e.message}) — verwende bisherige Manifest-Angabe unverändert.`);
  }

  if (!currentKey) {
    console.error('Keine aktuelle Saison bekannt (weder im Manifest noch von der API erkennbar) — breche ab.');
    process.exitCode = 1;
    return;
  }

  // Fehlende/leere Dateien für bereits im Manifest bekannte, nicht-aktuelle
  // Saisons nachholen (z.B. 25/26), bevor die aktuelle Saison (z.B. 26/27)
  // unten wie gehabt regulär aktualisiert wird.
  await backfillMissingSeasonFiles(apiKey, manifest, currentKey);

  const league = await resolveLeagueForCurrentSeason(apiKey, manifest, currentKey);
  if (!league) {
    console.error(`Liga für Saison ${currentKey} konnte nicht sicher bestimmt werden — breche ab, bestehende Dateien bleiben unverändert.`);
    process.exitCode = 1;
    return;
  }

  const result = await updateSeason(apiKey, manifest, {
    key: currentKey,
    label: currentLabel,
    leagueId: league.leagueId,
    gameOperationId: league.gameOperationId,
  });

  // Bei einer neu erkannten Saison (noch kein Manifest-Eintrag) darf das
  // Manifest nur dann auf sie verweisen, wenn tatsächlich eine Datei
  // existiert — sonst zeigte seasons.json auf eine 404 und index.html hätte
  // für diese Saison keinerlei Fallback (anders als bei den vier archivierten
  // Saisons, die immer eine eingebettete Kopie besitzen). Schlägt der erste
  // Versuch fehl, bleibt schlicht die bisherige Saison "current"; der nächste
  // Lauf versucht es erneut.
  const isNewSeasonKey = !manifest.seasons.some((s) => s.key === currentKey);
  if (isNewSeasonKey && !(await loadSeasonFile(fileNameForKey(currentKey)))) {
    console.error(`Neue Saison ${currentKey} erkannt, aber season-data/${fileNameForKey(currentKey)} konnte nicht angelegt werden — Manifest bleibt unverändert, nächster Lauf versucht es erneut.`);
    process.exitCode = 1;
    return;
  }

  const newManifest = buildManifestUpdate(manifest, {
    currentKey,
    label: currentLabel,
    leagueId: league.leagueId,
    gameOperationId: league.gameOperationId,
  });
  if (JSON.stringify(newManifest) !== JSON.stringify(manifest)) {
    await writeJsonAtomic(MANIFEST_PATH, newManifest);
    console.log('[manifest] season-data/seasons.json aktualisiert.');
  }

  await updateTeamDirectory(apiKey, { key: currentKey, gameOperationId: league.gameOperationId });

  console.log(result.changed ? 'Fertig: Daten wurden aktualisiert.' : 'Fertig: keine Änderungen.');
}

if (process.argv[1]?.replace(/\\/g, '/').endsWith('update-season-data.mjs')) {
  main().catch((e) => {
    console.error('Unerwarteter Fehler:', e.message);
    process.exitCode = 1;
  });
}

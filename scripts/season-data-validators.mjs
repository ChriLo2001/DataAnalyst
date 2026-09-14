// Neue, API-unabhängige Validatoren für das künftige manuelle Season-Data-
// Import-System (siehe Audit-Bericht "Phase 2: KEIN Saisonmanager-API-Key").
//
// Bewusst als eigenständiges Modul, getrennt von scripts/update-season-data.mjs:
// dieses Skript (inkl. seiner bestehenden validateMergedSeason()) bleibt
// unverändert. Hier entstehen ausschließlich neue, zusätzliche Prüfungen, die
// später von einem manuellen Import-Werkzeug verwendet werden können.
//
// Die geprüften Felder orientieren sich ausschließlich an der tatsächlich in
// season-data/21-22.json bis season-data/25-26.json vorhandenen Struktur
// (per grep gegengeprüft, siehe Bericht) — keine erfundenen Pflichtfelder.
// Reine Funktionen, kein fetch/fs, keine Saisonmanager-Anbindung.

// ─────────────────────────────────────────────────────────────────────────
// Game-ID: in den gespeicherten Rohdaten heißt das Feld durchgehend "id"
// (per grep bestätigt: "game_id" kommt in keiner der fünf Dateien vor). Die
// bestehende Pipeline (decideRefetchIds in update-season-data.mjs) erwartet
// aber auch für Spielplan-Objekte "game_id" — deshalb wird hier defensiv
// zuerst "id", dann "game_id" akzeptiert, um mit beiden Rohformaten kompatibel
// zu sein, ohne etwas zu erfinden.
// ─────────────────────────────────────────────────────────────────────────

/** @returns {string|null} Game-ID als String, oder null wenn keine vorhanden. */
export function getGameId(game) {
  const raw = game?.id ?? game?.game_id;
  if (raw === undefined || raw === null || raw === '') return null;
  return String(raw);
}

// ─────────────────────────────────────────────────────────────────────────
// 1. Duplikatprüfung
// ─────────────────────────────────────────────────────────────────────────

/**
 * @param {Array<object>} games
 * @returns {Array<{id:string, count:number}>} betroffene IDs mit Anzahl der
 *   Vorkommen (leer = keine Duplikate). Spiele ohne erkennbare ID werden hier
 *   NICHT gezählt — das ist ein Strukturfehler, siehe validateGameStructure().
 */
export function findDuplicateGameIds(games) {
  const counts = new Map();
  for (const g of games ?? []) {
    const id = getGameId(g);
    if (id === null) continue;
    counts.set(id, (counts.get(id) ?? 0) + 1);
  }
  return [...counts.entries()]
    .filter(([, count]) => count > 1)
    .map(([id, count]) => ({ id, count }));
}

/**
 * Wirft eine aussagekräftige Fehlermeldung mit allen betroffenen IDs, statt
 * still zu überschreiben oder nur die erste Duplikat-ID zu nennen.
 * @param {Array<object>} games
 * @param {string} [context] z.B. Dateiname, für die Fehlermeldung
 */
export function assertNoDuplicateGameIds(games, context = '') {
  const duplicates = findDuplicateGameIds(games);
  if (duplicates.length > 0) {
    const label = context ? `${context}: ` : '';
    const detail = duplicates.map((d) => `${d.id} (${d.count}×)`).join(', ');
    throw new Error(`${label}Doppelte Game-ID(s) gefunden: ${detail}`);
  }
}

// ─────────────────────────────────────────────────────────────────────────
// 2. Strukturprüfung pro Spielobjekt
// ─────────────────────────────────────────────────────────────────────────
//
// Feld-Kategorien (per grep gegen alle 5 vorhandenen Dateien geprüft):
//   - PRIMITIVE_REQUIRED: Feld muss existieren, nicht null sein, korrekter Typ
//     (in allen 195 vorhandenen Spielen ausnahmslos so vorhanden, auch bei
//     den 4 "Postponed"-Platzhaltern in 25/26).
//   - OBJECT_REQUIRED / ARRAY_REQUIRED: Feld muss den passenden Typ haben,
//     darf aber LEER sein (z.B. "events":[] oder "players":{} bei
//     Postponed-Spielen ohne Spielverlauf).
//   - NULLABLE_PRESENT: Feld muss als Schlüssel existieren, Wert darf aber
//     null sein (z.B. "result":null bei einem verschobenen Spiel).

const PRIMITIVE_REQUIRED_FIELDS = {
  date: 'string',
  league_id: 'number',
  league_name: 'string',
  home_team_name: 'string',
  guest_team_name: 'string',
  started: 'boolean',
  ended: 'boolean',
};

const OBJECT_REQUIRED_FIELDS = ['game_day', 'players', 'starting_players', 'awards'];
const ARRAY_REQUIRED_FIELDS = ['events', 'period_titles'];
const NULLABLE_PRESENT_FIELDS = ['result', 'result_string', 'notice_type'];

/**
 * Prüft EIN Spielobjekt gegen die tatsächlich vorhandene Rohdatenstruktur.
 * @returns {{ok:boolean, id:string|null, problems:string[]}}
 */
export function validateGameStructure(game) {
  const problems = [];

  if (!game || typeof game !== 'object' || Array.isArray(game)) {
    return { ok: false, id: null, problems: ['ist kein gültiges Objekt'] };
  }

  const id = getGameId(game);
  if (id === null) problems.push('weder "id" noch "game_id" vorhanden');

  for (const [field, expectedType] of Object.entries(PRIMITIVE_REQUIRED_FIELDS)) {
    const value = game[field];
    if (value === undefined || value === null) {
      problems.push(`Feld "${field}" fehlt oder ist null`);
    } else if (typeof value !== expectedType) {
      problems.push(`Feld "${field}" hat falschen Typ (erwartet ${expectedType}, war ${typeof value})`);
    }
  }

  for (const field of OBJECT_REQUIRED_FIELDS) {
    const value = game[field];
    if (value === undefined || value === null || typeof value !== 'object' || Array.isArray(value)) {
      problems.push(`Feld "${field}" fehlt oder ist kein Objekt`);
    }
  }

  for (const field of ARRAY_REQUIRED_FIELDS) {
    if (!Array.isArray(game[field])) {
      problems.push(`Feld "${field}" fehlt oder ist kein Array`);
    }
  }

  for (const field of NULLABLE_PRESENT_FIELDS) {
    if (!(field in game)) {
      problems.push(`Feld "${field}" fehlt komplett (Wert darf null sein, der Schlüssel muss aber existieren)`);
    }
  }

  return { ok: problems.length === 0, id, problems };
}

/**
 * Prüft alle Spiele einer Saison-Datei strukturell.
 * @param {Array<object>} games
 * @returns {{ok:boolean, invalidGames:Array<{index:number, id:string|null, problems:string[]}>}}
 */
export function validateSeasonGames(games) {
  if (!Array.isArray(games)) {
    return { ok: false, invalidGames: [{ index: -1, id: null, problems: ['games ist kein Array'] }] };
  }
  const invalidGames = [];
  games.forEach((game, index) => {
    const result = validateGameStructure(game);
    if (!result.ok) invalidGames.push({ index, id: result.id, problems: result.problems });
  });
  return { ok: invalidGames.length === 0, invalidGames };
}

// ─────────────────────────────────────────────────────────────────────────
// 3. ID-Set-Vergleich zwischen alter und neuer Saison-Datei
// ─────────────────────────────────────────────────────────────────────────

/**
 * Vergleicht zwei games[]-Arrays exakt anhand der Game-ID (nicht nur der
 * Anzahl) — deckt z.B. den Fall auf, dass gleich viele, aber teils andere
 * IDs vorhanden sind.
 * @returns {{added:string[], removed:string[], unchanged:string[]}}
 */
export function diffGameIds(oldGames, newGames) {
  const oldIds = new Set((oldGames ?? []).map(getGameId).filter((id) => id !== null));
  const newIds = new Set((newGames ?? []).map(getGameId).filter((id) => id !== null));

  const added = [...newIds].filter((id) => !oldIds.has(id)).sort();
  const removed = [...oldIds].filter((id) => !newIds.has(id)).sort();
  const unchanged = [...oldIds].filter((id) => newIds.has(id)).sort();

  return { added, removed, unchanged };
}

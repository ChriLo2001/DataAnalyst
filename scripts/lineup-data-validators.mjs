// Validatoren für die künftige manuelle Einsatzdaten-Ebene ("Einsatz-Center").
// Getrennt von scripts/season-data-validators.mjs (objektive Saisonmanager-
// Daten) und von index.html (Was-wäre-wenn-Lineup-Builder). Reine Funktionen,
// kein fetch/fs, keine Saisonmanager-Anbindung. Dateisystemzugriff gehört
// bewusst NICHT hierher — Aufrufer (künftiger Importer, Tests) lesen Dateien
// und übergeben bereits geparste Objekte.
//
// Entscheidungen aus der Planungsphase, die dieses Modul strikt umsetzt:
// - playerId ausschließlich im Format "api:<saisonmanager_player_id>".
//   "name:<normalizedName>" (bestehender Fallback in index.html) ist für
//   lineup-data NICHT erlaubt.
// - groupId ist eine UUIDv4, unabhängig von Name/Besetzung.
// - Unbekannte Felder sind ein harter Fehler (kein stilles Verschlucken von
//   Tippfehlern).
// - gameDay wird NICHT gespeichert (season-data bleibt alleinige Quelle).
// - combinationKey ist niemals ein von Menschen gepflegtes Rohfeld — nur
//   getCanonicalCombinationKey() darf ihn ableiten, bei Bedarf zur Laufzeit.
// - Validatoren korrigieren NIEMALS automatisch. Sie finden und melden.

export const LINEUP_SCHEMA_VERSION = 1;

const SEASON_KEY_REGEX = /^\d{2}\/\d{2}$/;
const UUID_V4_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const LINEUP_PLAYER_ID_REGEX = /^api:\d+$/;

const KNOWN_GROUP_TYPE_COUNTS = { trio: 3, rotation4: 4, rotation5: 5 };

// ─────────────────────────────────────────────────────────────────────────
// Grundbausteine
// ─────────────────────────────────────────────────────────────────────────

export function isValidUuidV4(value) {
  return typeof value === 'string' && UUID_V4_REGEX.test(value);
}

/** Einzige zulässige Spieler-ID-Form für lineup-data: "api:<id>". */
export function isValidLineupPlayerIdFormat(value) {
  return typeof value === 'string' && LINEUP_PLAYER_ID_REGEX.test(value);
}

export function isValidSeasonKeyFormat(value) {
  return typeof value === 'string' && SEASON_KEY_REGEX.test(value);
}

/**
 * Sortiert eine Liste von Player-IDs kanonisch und verbindet sie zu einem
 * Schlüssel. Wird nie als Rohdatenfeld gespeichert, nur zur Laufzeit
 * (Duplikaterkennung, Analyse-Indizierung) abgeleitet.
 * @param {string[]} players
 * @returns {string}
 */
export function getCanonicalCombinationKey(players) {
  return [...(players ?? [])].map(String).sort().join('|');
}

/**
 * Generischer Duplikat-Finder.
 * @returns {Array<{value:string, count:number}>}
 */
export function findDuplicates(values) {
  const counts = new Map();
  for (const v of values ?? []) {
    const key = String(v);
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  return [...counts.entries()]
    .filter(([, count]) => count > 1)
    .map(([value, count]) => ({ value, count }));
}

export function findDuplicatePlayerIds(playerIds) {
  return findDuplicates(playerIds);
}

/** ID-lose Einträge (undefined/null) werden ausgeschlossen — dafür ist die
 * jeweilige Pflichtfeld-Validierung zuständig, nicht die Duplikaterkennung. */
export function findDuplicateGroupIds(groups) {
  const ids = (groups ?? []).map((g) => g?.groupId).filter((id) => id !== undefined && id !== null);
  return findDuplicates(ids);
}

export function findDuplicateLineupGameIds(games) {
  const ids = (games ?? []).map((g) => g?.gameId).filter((id) => id !== undefined && id !== null);
  return findDuplicates(ids);
}

/**
 * Leitet aus rohen season-data-Spielen (games[].players.home/guest[].player_id)
 * die Menge gültiger "api:<id>"-Referenzen für eine Saison ab. Absichtlich
 * eine kleine, eigenständige Funktion — kein Import aus index.html, kein
 * Nachbau von PLAYER_REGISTRY. Erzeugt niemals einen "name:"-Fallback.
 * @param {Array<object>} seasonGames rohe games[] aus season-data/<key>.json
 * @returns {Set<string>}
 */
export function derivePlayerIdsFromSeasonGames(seasonGames) {
  const ids = new Set();
  for (const game of seasonGames ?? []) {
    for (const side of ['home', 'guest']) {
      const list = game?.players?.[side];
      if (!Array.isArray(list)) continue;
      for (const p of list) {
        const raw = p?.player_id;
        if (raw === undefined || raw === null || raw === '') continue;
        ids.add(`api:${raw}`);
      }
    }
  }
  return ids;
}

// ─────────────────────────────────────────────────────────────────────────
// Interne Hilfsfunktionen
// ─────────────────────────────────────────────────────────────────────────

function emptyResult() {
  return { ok: true, errors: [], warnings: [] };
}

function finalize(errors, warnings) {
  return { ok: errors.length === 0, errors, warnings };
}

/** Meldet jedes Feld in obj, das nicht in allowedFields steht, als Fehler. */
function checkUnknownFields(obj, allowedFields, path, errors) {
  if (!obj || typeof obj !== 'object' || Array.isArray(obj)) return;
  const allowed = new Set(allowedFields);
  for (const key of Object.keys(obj)) {
    if (!allowed.has(key)) {
      errors.push(`${path}: unbekanntes Feld "${key}"`);
    }
  }
}

function mergeInto(errorsTarget, warningsTarget, result, pathPrefix) {
  for (const e of result.errors) errorsTarget.push(pathPrefix ? `${pathPrefix}: ${e}` : e);
  for (const w of result.warnings) warningsTarget.push(pathPrefix ? `${pathPrefix}: ${w}` : w);
}

// ─────────────────────────────────────────────────────────────────────────
// Kader (roster)
// ─────────────────────────────────────────────────────────────────────────

/**
 * @param {{field:string[], goalies:string[]}} roster
 * @param {{validPlayerIds?:Set<string>}} [context]
 */
export function validateRoster(roster, { validPlayerIds } = {}) {
  const errors = [];
  const warnings = [];

  if (!roster || typeof roster !== 'object' || Array.isArray(roster)) {
    return finalize(['roster fehlt oder ist kein Objekt'], []);
  }
  checkUnknownFields(roster, ['field', 'goalies'], 'roster', errors);

  const field = roster.field;
  const goalies = roster.goalies;
  if (!Array.isArray(field)) errors.push('roster.field fehlt oder ist kein Array');
  if (!Array.isArray(goalies)) errors.push('roster.goalies fehlt oder ist kein Array');
  if (!Array.isArray(field) || !Array.isArray(goalies)) return finalize(errors, warnings);

  const checkIdList = (list, label) => {
    list.forEach((id, idx) => {
      if (!isValidLineupPlayerIdFormat(id)) {
        errors.push(`roster.${label}[${idx}]: ungültiges Player-ID-Format "${id}" (nur "api:<id>" erlaubt)`);
        return;
      }
      if (validPlayerIds && !validPlayerIds.has(id)) {
        errors.push(`roster.${label}[${idx}]: unbekannte Player-ID "${id}" (nicht in season-data dieser Saison gefunden)`);
      }
    });
  };
  checkIdList(field, 'field');
  checkIdList(goalies, 'goalies');

  for (const dup of findDuplicatePlayerIds(field)) {
    errors.push(`roster.field: doppelte Player-ID "${dup.value}" (${dup.count}x)`);
  }
  for (const dup of findDuplicatePlayerIds(goalies)) {
    errors.push(`roster.goalies: doppelte Player-ID "${dup.value}" (${dup.count}x)`);
  }

  const fieldSet = new Set(field);
  const overlap = [...new Set(goalies.filter((id) => fieldSet.has(id)))];
  if (overlap.length) {
    errors.push(`Spieler gleichzeitig in roster.field und roster.goalies: ${overlap.join(', ')}`);
  }

  if (goalies.length === 0) warnings.push('kein Torwart im Kader erfasst');
  if (field.length > 0 && field.length < 3) {
    warnings.push(`ungewöhnlich kleiner Kader (${field.length} Feldspieler)`);
  }
  if (field.length > 20) {
    warnings.push(`ungewöhnlich großer Kader (${field.length} Feldspieler)`);
  }

  return finalize(errors, warnings);
}

// ─────────────────────────────────────────────────────────────────────────
// Gruppen
// ─────────────────────────────────────────────────────────────────────────

/**
 * @param {object} group
 * @param {{rosterFieldSet?:Set<string>}} [context]
 */
export function validateGroup(group, { rosterFieldSet } = {}) {
  const errors = [];
  const warnings = [];

  if (!group || typeof group !== 'object' || Array.isArray(group)) {
    return finalize(['Gruppe fehlt oder ist kein Objekt'], []);
  }
  checkUnknownFields(group, ['groupId', 'name', 'type', 'players', 'notes'], 'group', errors);

  if (!isValidUuidV4(group.groupId)) {
    errors.push(`group.groupId ist keine gültige UUIDv4: "${group.groupId}"`);
  }
  if (typeof group.name !== 'string' || group.name.trim() === '') {
    errors.push('group.name fehlt oder ist leer');
  }
  if (typeof group.type !== 'string' || group.type.trim() === '') {
    errors.push('group.type fehlt oder ist leer');
  }
  if (group.notes !== undefined && typeof group.notes !== 'string') {
    errors.push('group.notes muss ein String sein, wenn vorhanden');
  }

  if (!Array.isArray(group.players)) {
    errors.push('group.players fehlt oder ist kein Array');
    return finalize(errors, warnings);
  }
  if (group.players.length === 0) {
    errors.push('Gruppe enthält keine Spieler');
  }

  const playerIds = [];
  group.players.forEach((entry, idx) => {
    const path = `group.players[${idx}]`;
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) {
      errors.push(`${path} ist kein gültiges Objekt`);
      return;
    }
    checkUnknownFields(entry, ['playerId', 'position'], path, errors);

    if (!isValidLineupPlayerIdFormat(entry.playerId)) {
      errors.push(`${path}.playerId ungültig: "${entry.playerId}"`);
    } else {
      playerIds.push(entry.playerId);
      if (rosterFieldSet && !rosterFieldSet.has(entry.playerId)) {
        errors.push(`${path}: Spieler "${entry.playerId}" ist nicht im Kader (roster.field) dieses Spiels`);
      }
    }

    if (entry.position !== undefined && entry.position !== null) {
      if (typeof entry.position !== 'string' || entry.position.trim() === '') {
        errors.push(`${path}.position muss ein nicht-leerer String sein, wenn vorhanden (sonst weglassen oder null)`);
      }
    }
  });

  for (const dup of findDuplicatePlayerIds(playerIds)) {
    errors.push(`Gruppe enthält Spieler "${dup.value}" mehrfach`);
  }

  if (typeof group.type === 'string' && KNOWN_GROUP_TYPE_COUNTS[group.type] !== undefined) {
    const expected = KNOWN_GROUP_TYPE_COUNTS[group.type];
    if (group.players.length !== expected) {
      warnings.push(
        `group.type "${group.type}" erwartet üblicherweise ${expected} Spieler, tatsächlich ${group.players.length} (kein Fehler — Typ ist nur ein Vorschlagswert)`,
      );
    }
  }

  return finalize(errors, warnings);
}

// ─────────────────────────────────────────────────────────────────────────
// Bestätigte Kombinationen
// ─────────────────────────────────────────────────────────────────────────

/**
 * @param {object} combo
 * @param {{rosterFieldSet?:Set<string>, rosterGoalieSet?:Set<string>, groupIdsInGame?:Set<string>}} [context]
 */
export function validateCombination(combo, { rosterFieldSet, rosterGoalieSet, groupIdsInGame } = {}) {
  const errors = [];
  const warnings = [];

  if (!combo || typeof combo !== 'object' || Array.isArray(combo)) {
    return finalize(['Kombination fehlt oder ist kein Objekt'], []);
  }
  checkUnknownFields(combo, ['players', 'groupId', 'note'], 'combination', errors);

  if (!Array.isArray(combo.players)) {
    errors.push('combination.players fehlt oder ist kein Array');
    return finalize(errors, warnings);
  }
  if (combo.players.length !== 3) {
    errors.push(`combination.players muss genau 3 Spieler enthalten, hat ${combo.players.length}`);
  }

  const validIds = [];
  combo.players.forEach((id, idx) => {
    if (!isValidLineupPlayerIdFormat(id)) {
      errors.push(`combination.players[${idx}] ungültige Player-ID: "${id}"`);
      return;
    }
    validIds.push(id);
    if (rosterGoalieSet && rosterGoalieSet.has(id)) {
      errors.push(`combination.players enthält Torwart "${id}"`);
    }
    if (rosterFieldSet && !rosterFieldSet.has(id)) {
      errors.push(`combination.players: Spieler "${id}" ist nicht im Kader (roster.field) dieses Spiels`);
    }
  });
  for (const dup of findDuplicatePlayerIds(validIds)) {
    errors.push(`combination.players enthält "${dup.value}" mehrfach`);
  }

  if (combo.groupId !== undefined && combo.groupId !== null) {
    if (!isValidUuidV4(combo.groupId)) {
      errors.push(`combination.groupId ist keine gültige UUIDv4: "${combo.groupId}"`);
    } else if (groupIdsInGame && !groupIdsInGame.has(combo.groupId)) {
      errors.push(`combination.groupId "${combo.groupId}" referenziert keine Gruppe innerhalb dieses Spiels`);
    }
  } else {
    warnings.push('Kombination ohne groupId (nicht explizit einer Gruppe zugeordnet)');
  }

  if (combo.note !== undefined && typeof combo.note !== 'string') {
    errors.push('combination.note muss ein String sein, wenn vorhanden');
  }

  return finalize(errors, warnings);
}

// ─────────────────────────────────────────────────────────────────────────
// Ein Spiel (game) innerhalb einer lineup-data/<season>.json
// ─────────────────────────────────────────────────────────────────────────

/**
 * @param {object} game
 * @param {{validPlayerIds?:Set<string>}} [context]
 */
export function validateLineupGame(game, { validPlayerIds } = {}) {
  const errors = [];
  const warnings = [];

  if (!game || typeof game !== 'object' || Array.isArray(game)) {
    return finalize(['Spiel-Eintrag fehlt oder ist kein Objekt'], []);
  }
  checkUnknownFields(game, ['gameId', 'roster', 'groups', 'confirmedCombinations', 'note'], 'game', errors);

  if (!Number.isInteger(game.gameId)) {
    errors.push(`game.gameId fehlt oder ist keine Ganzzahl: "${game.gameId}"`);
  }
  if (game.note !== undefined && typeof game.note !== 'string') {
    errors.push('game.note muss ein String sein, wenn vorhanden');
  }

  const gameLabel = Number.isInteger(game.gameId) ? `game(${game.gameId})` : 'game(?)';

  const rosterResult = validateRoster(game.roster, { validPlayerIds });
  mergeInto(errors, warnings, rosterResult, gameLabel);

  const rosterFieldSet = new Set(Array.isArray(game.roster?.field) ? game.roster.field : []);
  const rosterGoalieSet = new Set(Array.isArray(game.roster?.goalies) ? game.roster.goalies : []);

  if (!Array.isArray(game.groups)) {
    errors.push(`${gameLabel}: groups fehlt oder ist kein Array`);
  } else {
    game.groups.forEach((group, idx) => {
      const r = validateGroup(group, { rosterFieldSet });
      mergeInto(errors, warnings, r, `${gameLabel}.groups[${idx}]`);
    });
    for (const dup of findDuplicateGroupIds(game.groups)) {
      errors.push(`${gameLabel}: doppelte groupId "${dup.value}" innerhalb desselben Spiels (${dup.count}x)`);
    }
  }

  const groupIdsInGame = new Set(
    Array.isArray(game.groups)
      ? game.groups.map((g) => g?.groupId).filter((id) => typeof id === 'string')
      : [],
  );

  if (!Array.isArray(game.confirmedCombinations)) {
    errors.push(`${gameLabel}: confirmedCombinations fehlt oder ist kein Array`);
  } else {
    const canonicalKeys = [];
    game.confirmedCombinations.forEach((combo, idx) => {
      const r = validateCombination(combo, { rosterFieldSet, rosterGoalieSet, groupIdsInGame });
      mergeInto(errors, warnings, r, `${gameLabel}.confirmedCombinations[${idx}]`);
      if (Array.isArray(combo?.players) && combo.players.length === 3 && combo.players.every((id) => typeof id === 'string')) {
        canonicalKeys.push(getCanonicalCombinationKey(combo.players));
      }
    });
    for (const dup of findDuplicates(canonicalKeys)) {
      errors.push(
        `${gameLabel}: doppelte bestätigte Kombination (${dup.value.replace(/\|/g, ' + ')}) (${dup.count}x)`,
      );
    }
  }

  return finalize(errors, warnings);
}

// ─────────────────────────────────────────────────────────────────────────
// Gesamte Saison-Datei
// ─────────────────────────────────────────────────────────────────────────

/**
 * @param {object} data geparster Inhalt von lineup-data/<season>.json
 * @param {{expectedSeasonKey?:string, validPlayerIds?:Set<string>}} [context]
 */
export function validateLineupSeasonData(data, { expectedSeasonKey, validPlayerIds } = {}) {
  const errors = [];
  const warnings = [];

  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    return finalize(['lineup-data Season-Datei fehlt oder ist kein Objekt'], []);
  }
  checkUnknownFields(data, ['schemaVersion', 'season', 'games'], 'lineup-data', errors);

  if (data.schemaVersion !== LINEUP_SCHEMA_VERSION) {
    errors.push(`schemaVersion muss ${LINEUP_SCHEMA_VERSION} sein, war "${data.schemaVersion}"`);
  }
  if (!isValidSeasonKeyFormat(data.season)) {
    errors.push(`season fehlt oder hat ungültiges Format: "${data.season}"`);
  } else if (expectedSeasonKey && data.season !== expectedSeasonKey) {
    errors.push(`season "${data.season}" passt nicht zum erwarteten Wert "${expectedSeasonKey}"`);
  }

  if (!Array.isArray(data.games)) {
    errors.push('games fehlt oder ist kein Array');
    return finalize(errors, warnings);
  }

  data.games.forEach((game, idx) => {
    const r = validateLineupGame(game, { validPlayerIds });
    mergeInto(errors, warnings, r, `games[${idx}]`);
  });

  for (const dup of findDuplicateLineupGameIds(data.games)) {
    errors.push(`doppelte gameId "${dup.value}" (${dup.count}x) in games[]`);
  }

  // Gleichnamige Gruppen mit unterschiedlichen IDs — saisonweit, nur Warnung:
  // ein Name darf mehrfach vorkommen, aber ein Mensch sollte es sehen.
  const nameToIds = new Map();
  for (const game of data.games) {
    if (!Array.isArray(game?.groups)) continue;
    for (const group of game.groups) {
      if (!group || typeof group.name !== 'string' || typeof group.groupId !== 'string') continue;
      if (!nameToIds.has(group.name)) nameToIds.set(group.name, new Set());
      nameToIds.get(group.name).add(group.groupId);
    }
  }
  for (const [name, ids] of nameToIds.entries()) {
    if (ids.size > 1) {
      warnings.push(
        `Gruppenname "${name}" wird für ${ids.size} unterschiedliche groupId-Werte verwendet (${[...ids].sort().join(', ')})`,
      );
    }
  }

  return finalize(errors, warnings);
}

// ─────────────────────────────────────────────────────────────────────────
// Gruppen-Registry (lineup-data/groups.json) — clubweit, saisonübergreifend
// ─────────────────────────────────────────────────────────────────────────

/**
 * @param {object} registry geparster Inhalt von lineup-data/groups.json
 * @param {{knownGameIdsBySeason?:Map<string,Set<number>>}} [context]
 *   knownGameIdsBySeason: z.B. Map { "25/26" => Set{44372,44373,...} },
 *   vom Aufrufer aus den jeweiligen season-data/*.json-Dateien gebaut.
 *   Optional — ohne diese Map wird createdInGame nur auf Typ geprüft, nicht
 *   auf tatsächliche Existenz.
 */
export function validateGroupRegistry(registry, { knownGameIdsBySeason } = {}) {
  const errors = [];
  const warnings = [];

  if (!registry || typeof registry !== 'object' || Array.isArray(registry)) {
    return finalize(['groups-registry fehlt oder ist kein Objekt'], []);
  }
  checkUnknownFields(registry, ['schemaVersion', 'groups'], 'groups-registry', errors);

  if (registry.schemaVersion !== LINEUP_SCHEMA_VERSION) {
    errors.push(`schemaVersion muss ${LINEUP_SCHEMA_VERSION} sein, war "${registry.schemaVersion}"`);
  }
  if (!Array.isArray(registry.groups)) {
    errors.push('groups fehlt oder ist kein Array');
    return finalize(errors, warnings);
  }

  registry.groups.forEach((entry, idx) => {
    const path = `groups-registry.groups[${idx}]`;
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) {
      errors.push(`${path} ist kein gültiges Objekt`);
      return;
    }
    checkUnknownFields(
      entry,
      ['groupId', 'currentName', 'createdInSeason', 'createdInGame', 'nameHistory'],
      path,
      errors,
    );

    if (!isValidUuidV4(entry.groupId)) {
      errors.push(`${path}.groupId ist keine gültige UUIDv4: "${entry.groupId}"`);
    }
    if (typeof entry.currentName !== 'string' || entry.currentName.trim() === '') {
      errors.push(`${path}.currentName fehlt oder ist leer`);
    }
    if (!isValidSeasonKeyFormat(entry.createdInSeason)) {
      errors.push(`${path}.createdInSeason fehlt oder hat ungültiges Format: "${entry.createdInSeason}"`);
    }
    if (!Number.isInteger(entry.createdInGame)) {
      errors.push(`${path}.createdInGame fehlt oder ist keine Ganzzahl: "${entry.createdInGame}"`);
    }
    if (
      isValidSeasonKeyFormat(entry.createdInSeason) &&
      Number.isInteger(entry.createdInGame) &&
      knownGameIdsBySeason
    ) {
      if (!knownGameIdsBySeason.has(entry.createdInSeason)) {
        // Bewusst ein harter Fehler statt stillem Überspringen: eine Saison,
        // für die der Aufrufer keine season-data-Referenz mitgibt, kann nicht
        // stillschweigend als "unprüfbar, also ok" behandelt werden.
        errors.push(
          `${path}.createdInSeason "${entry.createdInSeason}" ist keiner bekannten Saison zuordenbar (nicht in den übergebenen season-data-Referenzen enthalten)`,
        );
      } else {
        const known = knownGameIdsBySeason.get(entry.createdInSeason);
        if (!known.has(entry.createdInGame)) {
          errors.push(
            `${path}.createdInGame ${entry.createdInGame} existiert nicht in season-data für Saison "${entry.createdInSeason}"`,
          );
        }
      }
    }

    if (!Array.isArray(entry.nameHistory)) {
      errors.push(`${path}.nameHistory fehlt oder ist kein Array`);
    } else {
      const seenEntries = [];
      entry.nameHistory.forEach((h, hIdx) => {
        const hPath = `${path}.nameHistory[${hIdx}]`;
        if (!h || typeof h !== 'object' || Array.isArray(h)) {
          errors.push(`${hPath} ist kein gültiges Objekt`);
          return;
        }
        checkUnknownFields(h, ['name', 'since'], hPath, errors);

        if (typeof h.name !== 'string' || h.name.trim() === '') {
          errors.push(`${hPath}.name fehlt oder ist leer`);
        }
        if (!h.since || typeof h.since !== 'object' || Array.isArray(h.since)) {
          errors.push(`${hPath}.since fehlt oder ist kein Objekt`);
        } else {
          checkUnknownFields(h.since, ['season', 'gameId'], `${hPath}.since`, errors);
          if (!isValidSeasonKeyFormat(h.since.season)) {
            errors.push(`${hPath}.since.season fehlt oder hat ungültiges Format: "${h.since.season}"`);
          }
          if (!Number.isInteger(h.since.gameId)) {
            errors.push(`${hPath}.since.gameId fehlt oder ist keine Ganzzahl: "${h.since.gameId}"`);
          }
        }
        seenEntries.push(JSON.stringify({ name: h.name, since: h.since }));
      });
      for (const dup of findDuplicates(seenEntries)) {
        errors.push(`${path}.nameHistory enthält identischen Eintrag mehrfach (${dup.count}x)`);
      }
    }
  });

  for (const dup of findDuplicateGroupIds(registry.groups)) {
    errors.push(`groups-registry: doppelte groupId "${dup.value}" (${dup.count}x)`);
  }

  return finalize(errors, warnings);
}

// ─────────────────────────────────────────────────────────────────────────
// Cross-File-Validierung (nimmt bereits geparste Objekte entgegen, liest
// selbst keine Dateien)
// ─────────────────────────────────────────────────────────────────────────

/**
 * Prüft, dass jede in lineup-data/<season>.json referenzierte gameId
 * tatsächlich in den zugehörigen season-data-Spielen existiert.
 * @param {object} lineupSeasonData
 * @param {Array<object>} seasonGames rohe games[] aus season-data/<key>.json
 */
export function crossValidateGamesAgainstSeasonData(lineupSeasonData, seasonGames) {
  const errors = [];
  const warnings = [];
  const knownIds = new Set(
    (seasonGames ?? [])
      .map((g) => g?.id)
      .filter((id) => id !== undefined && id !== null)
      .map(Number),
  );
  const games = Array.isArray(lineupSeasonData?.games) ? lineupSeasonData.games : [];
  for (const game of games) {
    if (!knownIds.has(Number(game?.gameId))) {
      errors.push(`gameId ${game?.gameId} existiert nicht in season-data dieser Saison`);
    }
  }
  return finalize(errors, warnings);
}

/**
 * Prüft, dass jede in lineup-data/<season>.json verwendete groupId in der
 * clubweiten Registry (lineup-data/groups.json) registriert ist.
 * @param {object} lineupSeasonData
 * @param {object} groupRegistry geparster Inhalt von lineup-data/groups.json
 */
export function crossValidateGroupReferences(lineupSeasonData, groupRegistry) {
  const errors = [];
  const warnings = [];
  const registryIds = new Set(
    Array.isArray(groupRegistry?.groups)
      ? groupRegistry.groups.map((g) => g?.groupId).filter((id) => typeof id === 'string')
      : [],
  );
  const games = Array.isArray(lineupSeasonData?.games) ? lineupSeasonData.games : [];
  for (const game of games) {
    for (const group of Array.isArray(game?.groups) ? game.groups : []) {
      if (typeof group?.groupId === 'string' && !registryIds.has(group.groupId)) {
        errors.push(`game(${game.gameId}): groupId "${group.groupId}" ist nicht in lineup-data/groups.json registriert`);
      }
    }
    for (const combo of Array.isArray(game?.confirmedCombinations) ? game.confirmedCombinations : []) {
      if (typeof combo?.groupId === 'string' && !registryIds.has(combo.groupId)) {
        errors.push(
          `game(${game.gameId}): confirmedCombinations-groupId "${combo.groupId}" ist nicht in lineup-data/groups.json registriert`,
        );
      }
    }
  }
  return finalize(errors, warnings);
}

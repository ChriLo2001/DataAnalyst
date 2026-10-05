#!/usr/bin/env node
// Offline-Spielplan-Importer für den öffentlichen Kalender-Export des Saisonmanagers.
//
// Hintergrund (siehe docs/spec/module/M0b.md und docs/season-data-import.md):
// /api/v2/-Endpunkte verlangen bestätigt einen API-Key (401 "API key required",
// anonym nicht nutzbar). Der Kalender-Export derselben Liga antwortet dagegen
// OHNE Schlüssel mit 200 — ein veröffentlichter .ics-Feed ist dafür gedacht,
// maschinell abonniert zu werden (z.B. von Kalender-Apps). Das ist der neue
// "Weg A" für Spielpläne; ein Schlüssel wird nur noch für Spielberichte
// (Ergebnisse/Events/Aufstellungen) gebraucht, die der Kalender nicht enthält.
//
// Architektur, analog zu import-season-data.mjs:
//   .ics (lokal ODER --fetch von GENAU einer URL) → Parsen → Validieren/Prüfsummen
//     → Bericht (Dry-Run per Default) → ./entwurf/<SEASON_KEY>.json (nur --write)
//                                                              ↓
//                          danach der übliche Weg: scripts/import-season-data.mjs
//
// Diese Datei ist bewusst für GENAU den Übergang auf 26/27 geschrieben (Liga 2614,
// league_id/league_name wie von Chris vorgegeben, bekannte Teamliste nach dem
// Zusammenschluss/der Aufspaltung — siehe Aufgabe 5). Für eine künftige Saison
// müssten CALENDAR_URL, SEASON_KEY, LEAGUE_ID, LEAGUE_NAME und KNOWN_TEAMS neu
// gesetzt werden — keine Verallgemeinerung auf Vorrat.
//
// CLI-Formen:
//   node scripts/import-schedule.mjs --fetch [--out <pfad>]
//     -> ruft GENAU CALENDAR_URL ab und speichert die Rohantwort unverändert.
//        Sonst nichts: kein Parsen, kein Entwurf. Eng begrenzte, dokumentierte
//        Ausnahme vom Netzwerkverbot (siehe CLAUDE.md). Läuft NIE automatisch
//        in Tests.
//   node scripts/import-schedule.mjs <icsPfad> [--out <entwurfPfad>] [--write]
//     -> liest ausschließlich lokal (kein Netzzugriff), parst, prüft gegen die
//        unabhängig abgelesenen Prüfsummen und schreibt NUR mit --write einen
//        season-data-förmigen Entwurf nach ./entwurf/. Abweichungen von den
//        Prüfsummen werden gemeldet, nie automatisch angeglichen — --write
//        wird dann verweigert, bis die Abweichung geklärt ist.

import { readFile, writeFile, mkdir, rename } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { writeJsonAtomic } from './update-season-data.mjs';

// ─────────────────────────────────────────────────────────────────────────
// Feste Eckdaten für den 26/27-Übergang (siehe Kopfkommentar)
// ─────────────────────────────────────────────────────────────────────────

export const CALENDAR_URL = 'https://saisonmanager.de/api/v2/calendar/leagues/2614.ics';
export const SEASON_KEY = '26/27';
export const SEASON_LABEL = '2026/27';
export const LEAGUE_ID = 2614;
export const LEAGUE_NAME = 'Verbandsliga Baden-Württemberg';

const DEFAULT_ICS_PATH = './entwurf/26-27-kalender.ics';
const DEFAULT_DRAFT_PATH = './entwurf/26-27.json';

// Bekannte Mannschaften der Liga 2614 in 26/27 — aus dem Kalender selbst
// bestätigt (8 eindeutige Namen) UND deckungsgleich mit Aufgabe 5 (Fusion
// FBC Heidelberg + Floorball Mannheim -> SG Heidelberg-Mannheim, Umbenennung
// Breisgau Bandits -> PTSV Freiburg, Aufspaltung Sportvg Feuerbach -> Biber +
// Rössle). Dient NUR als Prüfliste gegen Tippfehler/unerwartete Namen im
// Kalender — keine Identitätszuordnung, die bleibt Aufgabe 5.
export const KNOWN_TEAMS_26_27 = [
  'DJK Giants Karlsruhe-Ost',
  'PTSV Freiburg',
  'SG Heidelberg-Mannheim',
  'SV Tübingen Sharks',
  'Sportvg Feuerbach Biber',
  'Sportvg Feuerbach Rössle',
  'TV Schriesheim',
  'VfB Ulm',
];

// Unabhängig von der Ligaseite abgelesene Prüfsummen (siehe Auftrag) — werden
// NIE benutzt, um Daten anzugleichen, nur um Abweichungen zu melden.
const EXPECTED = {
  totalGames: 56,
  matchdayCount: 9,
  teamCount: 8,
  gamesPerTeam: 14,
  gamesPerMatchday: { 1: 6, 2: 6, 3: 4, 4: 6, 5: 8, 6: 6, 7: 8, 8: 4, 9: 8 },
  dates: [
    '2026-10-11', '2026-11-07', '2026-11-21', '2026-12-20', '2027-01-17',
    '2027-01-24', '2027-02-06', '2027-03-07', '2027-04-17',
  ],
  vfbUlmGames: 14,
  vfbUlmFreeMatchdays: [3, 4],
  matchday1FirstId: 63383,
  matchday1ArenaName: 'Hermann-Hepper-Turnhalle',
};

// ─────────────────────────────────────────────────────────────────────────
// Reines Parsen (kein fetch/fs) — direkt testbar
// ─────────────────────────────────────────────────────────────────────────

/**
 * RFC5545-Zeilenentfaltung: eine Fortsetzungszeile beginnt direkt nach einem
 * Zeilenumbruch mit genau einem Leerzeichen oder Tab und gehört zur vorigen
 * Zeile. Leitungsende-agnostisch (CRLF/LF).
 * @returns {string[]}
 */
export function unfoldIcsLines(rawText) {
  const normalized = String(rawText ?? '').replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  const rawLines = normalized.split('\n');
  const lines = [];
  for (const line of rawLines) {
    if ((line.startsWith(' ') || line.startsWith('\t')) && lines.length > 0) {
      lines[lines.length - 1] += line.slice(1);
    } else {
      lines.push(line);
    }
  }
  return lines;
}

/** Entfernt die in RFC5545 TEXT-Werten vorkommenden Escapes \, \; \\ \n/\N. */
export function unescapeIcsText(value) {
  if (typeof value !== 'string') return '';
  let out = '';
  for (let i = 0; i < value.length; i++) {
    if (value[i] === '\\' && i + 1 < value.length) {
      const next = value[i + 1];
      if (next === ',') { out += ','; i++; continue; }
      if (next === ';') { out += ';'; i++; continue; }
      if (next === '\\') { out += '\\'; i++; continue; }
      if (next === 'n' || next === 'N') { out += ' '; i++; continue; }
    }
    out += value[i];
  }
  return out;
}

/**
 * Zerlegt den entfalteten Kalendertext in VEVENT-Blöcke mit den vier
 * benötigten Feldern. Unbekannte Zeilen (DTSTAMP, CLASS, SEQUENCE, …) werden
 * ignoriert — es wird nichts aus ihnen abgeleitet.
 * @returns {Array<{uid:string|null, dtstartKey:string|null, dtstart:string|null, summary:string|null, location:string|null}>}
 */
export function parseIcsEvents(rawText) {
  const lines = unfoldIcsLines(rawText);
  const events = [];
  let cur = null;
  for (const line of lines) {
    if (line === 'BEGIN:VEVENT') { cur = { uid: null, dtstartKey: null, dtstart: null, summary: null, location: null }; continue; }
    if (line === 'END:VEVENT') { if (cur) events.push(cur); cur = null; continue; }
    if (!cur) continue;
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    const key = line.slice(0, idx);
    const value = line.slice(idx + 1);
    if (key === 'UID') cur.uid = value;
    else if (key.startsWith('DTSTART')) { cur.dtstartKey = key; cur.dtstart = value; }
    else if (key === 'SUMMARY') cur.summary = value;
    else if (key === 'LOCATION') cur.location = value;
  }
  return events;
}

const GAME_ID_PREFIX = 'sm_game_';

/** @returns {number|null} Spiel-ID, oder null wenn das Präfix nicht sauber erkannt wird — nie geraten. */
export function parseGameId(uid) {
  if (typeof uid !== 'string' || !uid.startsWith(GAME_ID_PREFIX)) return null;
  const rest = uid.slice(GAME_ID_PREFIX.length);
  if (!/^\d+$/.test(rest)) return null;
  return Number(rest);
}

const SUMMARY_RE = /^(\d+)\.\s*Spieltag,\s*(.+)$/;
const SUMMARY_SUFFIX_RE = /\s*\(Verbandsliga Baden-Württemberg,\s*FVBW\)\s*$/;

/**
 * @returns {{matchday:number, homeTeamRaw:string, guestTeamRaw:string}|null}
 *   null, wenn Spieltagsnummer oder Mannschaftstrennung nicht eindeutig sind
 *   (fehlender Suffix UND vorhandener Suffix müssen beide funktionieren).
 */
export function parseSummary(summaryRaw) {
  const summary = unescapeIcsText(summaryRaw);
  const mdMatch = SUMMARY_RE.exec(summary);
  if (!mdMatch) return null;
  const matchday = Number(mdMatch[1]);
  const rest = mdMatch[2].replace(SUMMARY_SUFFIX_RE, '').trim();
  // Trennzeichen ist EXAKT " - " (Leerzeichen-Bindestrich-Leerzeichen) — ein
  // Team wie "DJK Giants Karlsruhe-Ost" enthält selbst einen Bindestrich ohne
  // umgebende Leerzeichen und bleibt dadurch unangetastet.
  const teams = rest.split(' - ').map((t) => t.trim()).filter(Boolean);
  if (teams.length !== 2) return null;
  return { matchday, homeTeamRaw: teams[0], guestTeamRaw: teams[1] };
}

/**
 * Liest den lokalen Uhrzeit-Anteil direkt aus den Ziffern der DTSTART-Zeile —
 * bewusst OHNE Date/Date.parse/new Date(...), also ohne jede UTC-Umrechnung.
 * Verlangt exakt den Parameter TZID=Europe/Berlin; jede andere Form (UTC "Z",
 * anderes TZID, kein TZID) wird abgelehnt statt geraten. So kann die Uhrzeit
 * nie "nach UTC verrutschen" und die Zeitumstellung zwischen Spieltag 1 und 2
 * spielt für das Parsen keine Rolle.
 * @returns {{date:string, startTime:string}|null}
 */
export function parseDtstart(dtstartKey, dtstartValue) {
  if (dtstartKey !== 'DTSTART;TZID=Europe/Berlin') return null;
  const m = /^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})$/.exec(dtstartValue || '');
  if (!m) return null;
  const [, y, mo, d, h, mi] = m;
  return { date: `${y}-${mo}-${d}`, startTime: `${h}:${mi}` };
}

/** LOCATION trägt Hallenname und Anschrift in einem Feld, getrennt durch das erste Komma. */
export function parseLocation(locationRaw) {
  const location = unescapeIcsText(locationRaw);
  if (!location) return { arenaName: '', arenaAddress: '' };
  const commaIdx = location.indexOf(',');
  if (commaIdx === -1) return { arenaName: location.trim(), arenaAddress: '' };
  return { arenaName: location.slice(0, commaIdx).trim(), arenaAddress: location.slice(commaIdx + 1).trim() };
}

/**
 * Baut aus einem geparsten ICS-Event ein season-data-förmiges Spielobjekt.
 * Ergebnis-/Ereignisfelder bleiben leer (started/ended:false), siehe
 * scripts/season-data-validators.mjs für die Pflichtfelder.
 * @returns {{errors:string[], game:object|null}}
 */
export function buildGameFromEvent(event, { leagueId, leagueName, knownTeams }) {
  const errors = [];

  const id = parseGameId(event.uid);
  if (id === null) errors.push(`UID "${event.uid}" enthält keine erkennbare Spiel-ID nach dem Präfix "${GAME_ID_PREFIX}"`);

  const summaryParsed = event.summary ? parseSummary(event.summary) : null;
  if (!summaryParsed) errors.push(`SUMMARY nicht erkannt (UID ${event.uid}): ${JSON.stringify(event.summary)}`);

  let homeTeam = null;
  let guestTeam = null;
  if (summaryParsed) {
    if (!knownTeams.includes(summaryParsed.homeTeamRaw)) errors.push(`Unbekannte Mannschaft "${summaryParsed.homeTeamRaw}" (UID ${event.uid})`);
    else homeTeam = summaryParsed.homeTeamRaw;
    if (!knownTeams.includes(summaryParsed.guestTeamRaw)) errors.push(`Unbekannte Mannschaft "${summaryParsed.guestTeamRaw}" (UID ${event.uid})`);
    else guestTeam = summaryParsed.guestTeamRaw;
  }

  const dt = parseDtstart(event.dtstartKey, event.dtstart);
  if (!dt) errors.push(`DTSTART nicht erkannt oder keine Europe/Berlin-Ortszeit (UID ${event.uid}): "${event.dtstartKey}:${event.dtstart}"`);

  if (errors.length) return { errors, game: null };

  const { arenaName, arenaAddress } = parseLocation(event.location);

  const game = {
    id,
    date: dt.date,
    start_time: dt.startTime,
    game_day: { game_day_number: summaryParsed.matchday, title: `${summaryParsed.matchday}. Spieltag` },
    league_id: leagueId,
    league_name: leagueName,
    home_team_name: homeTeam,
    guest_team_name: guestTeam,
    arena_name: arenaName,
    arena_address: arenaAddress,
    started: false,
    ended: false,
    events: [],
    players: {},
    starting_players: {},
    awards: {},
    period_titles: [],
    result: null,
    result_string: null,
    notice_type: null,
  };
  return { errors: [], game };
}

/**
 * Baut alle Spiele aus den geparsten ICS-Events. Sammelt ALLE Parse-Fehler
 * über alle Events hinweg (statt beim ersten abzubrechen), damit ein Lauf
 * genügt, um alle Probleme zu sehen.
 * @returns {{games:object[], errors:string[]}}
 */
export function buildGamesFromEvents(events, options) {
  const games = [];
  const errors = [];
  for (const event of events) {
    const result = buildGameFromEvent(event, options);
    if (result.errors.length) errors.push(...result.errors);
    else games.push(result.game);
  }
  return { games, errors };
}

/**
 * Eigene Konsistenzprüfungen (unabhängig von den mitgelieferten Prüfsummen):
 * doppelte IDs, eine Mannschaft zweimal zur selben Uhrzeit, Spieltagsnummern
 * lückenhaft. Das sind harte Fehler — bei irgendeinem Treffer ist der Entwurf
 * strukturell kaputt, nicht nur "anders als erwartet".
 * @returns {string[]} Fehler, leer wenn alles konsistent ist.
 */
export function selfCheckGames(games) {
  const errors = [];

  const idCounts = new Map();
  for (const g of games) idCounts.set(g.id, (idCounts.get(g.id) || 0) + 1);
  for (const [id, count] of idCounts) {
    if (count > 1) errors.push(`Spiel-ID ${id} kommt ${count}× vor (doppelt)`);
  }

  const slotSeen = new Map();
  for (const g of games) {
    for (const team of [g.home_team_name, g.guest_team_name]) {
      const key = `${team}|${g.date}T${g.start_time}`;
      if (slotSeen.has(key)) errors.push(`Mannschaft "${team}" spielt am ${g.date} um ${g.start_time} laut Kalender zweimal gleichzeitig (Spiele ${slotSeen.get(key)} und ${g.id})`);
      slotSeen.set(key, g.id);
    }
  }

  const matchdays = [...new Set(games.map((g) => g.game_day.game_day_number))].sort((a, b) => a - b);
  for (let i = 0; i < matchdays.length; i++) {
    if (matchdays[i] !== i + 1) {
      errors.push(`Spieltagsnummern sind nicht lückenlos 1..${matchdays.length > 0 ? Math.max(...matchdays) : '?'} (gefunden: ${matchdays.join(', ')})`);
      break;
    }
  }

  return errors;
}

/**
 * Vergleicht die geparsten Spiele gegen die unabhängig abgelesenen
 * Prüfsummen (siehe EXPECTED oben). Meldet JEDE Abweichung als Text, gleicht
 * nie etwas an — der Aufrufer entscheidet, was mit Abweichungen passiert.
 * @returns {string[]}
 */
export function compareAgainstExpected(games) {
  const deviations = [];

  if (games.length !== EXPECTED.totalGames) {
    deviations.push(`Gesamtzahl Spiele: erwartet ${EXPECTED.totalGames}, gefunden ${games.length}`);
  }

  const byMatchday = {};
  for (const g of games) {
    const md = g.game_day.game_day_number;
    byMatchday[md] = (byMatchday[md] || 0) + 1;
  }
  const matchdayKeys = Object.keys(byMatchday).map(Number);
  if (matchdayKeys.length !== EXPECTED.matchdayCount) {
    deviations.push(`Anzahl Spieltage: erwartet ${EXPECTED.matchdayCount}, gefunden ${matchdayKeys.length}`);
  }
  for (const [mdStr, expectedCount] of Object.entries(EXPECTED.gamesPerMatchday)) {
    const md = Number(mdStr);
    const found = byMatchday[md] || 0;
    if (found !== expectedCount) deviations.push(`Spiele an Spieltag ${md}: erwartet ${expectedCount}, gefunden ${found}`);
  }

  const teamCounts = {};
  for (const g of games) {
    teamCounts[g.home_team_name] = (teamCounts[g.home_team_name] || 0) + 1;
    teamCounts[g.guest_team_name] = (teamCounts[g.guest_team_name] || 0) + 1;
  }
  const teamNames = Object.keys(teamCounts);
  if (teamNames.length !== EXPECTED.teamCount) {
    deviations.push(`Anzahl Mannschaften: erwartet ${EXPECTED.teamCount}, gefunden ${teamNames.length} (${teamNames.join(', ')})`);
  }
  for (const [team, count] of Object.entries(teamCounts)) {
    if (count !== EXPECTED.gamesPerTeam) deviations.push(`Spiele von "${team}": erwartet ${EXPECTED.gamesPerTeam}, gefunden ${count}`);
  }

  const dates = [...new Set(games.map((g) => g.date))].sort();
  const expectedDatesSorted = [...EXPECTED.dates].sort();
  if (JSON.stringify(dates) !== JSON.stringify(expectedDatesSorted)) {
    deviations.push(`Termine weichen ab — erwartet: ${expectedDatesSorted.join(', ')}; gefunden: ${dates.join(', ')}`);
  }

  const vfbGames = games.filter((g) => g.home_team_name === 'VfB Ulm' || g.guest_team_name === 'VfB Ulm');
  if (vfbGames.length !== EXPECTED.vfbUlmGames) {
    deviations.push(`Spiele von VfB Ulm: erwartet ${EXPECTED.vfbUlmGames}, gefunden ${vfbGames.length}`);
  }
  const vfbMatchdays = new Set(vfbGames.map((g) => g.game_day.game_day_number));
  const vfbFreeFound = matchdayKeys.filter((md) => !vfbMatchdays.has(md)).sort((a, b) => a - b);
  if (JSON.stringify(vfbFreeFound) !== JSON.stringify(EXPECTED.vfbUlmFreeMatchdays)) {
    deviations.push(`Spielfreie Spieltage für VfB Ulm: erwartet ${EXPECTED.vfbUlmFreeMatchdays.join(', ')}, gefunden ${vfbFreeFound.join(', ') || '(keine)'}`);
  }

  const md1Games = games.filter((g) => g.game_day.game_day_number === 1).sort((a, b) => a.id - b.id);
  if (md1Games.length > 0) {
    if (md1Games[0].id !== EXPECTED.matchday1FirstId) {
      deviations.push(`Erste Spiel-ID an Spieltag 1: erwartet ${EXPECTED.matchday1FirstId}, gefunden ${md1Games[0].id}`);
    }
    const otherArenas = md1Games.filter((g) => g.arena_name !== EXPECTED.matchday1ArenaName);
    if (otherArenas.length > 0) {
      deviations.push(`Spieltag 1 nicht durchgehend in "${EXPECTED.matchday1ArenaName}": ${otherArenas.map((g) => `${g.id} (${g.arena_name})`).join(', ')}`);
    }
  }

  return deviations;
}

/**
 * Gesamter Parse-Schritt aus dem rohen .ics-Text: Events extrahieren, Spiele
 * bauen, Eigenprüfungen und Prüfsummen-Vergleich. Rein (kein fetch/fs).
 * @returns {{games:object[], parseErrors:string[], selfCheckErrors:string[], deviations:string[]}}
 */
export function parseIcsCalendar(rawText, { leagueId = LEAGUE_ID, leagueName = LEAGUE_NAME, knownTeams = KNOWN_TEAMS_26_27 } = {}) {
  const events = parseIcsEvents(rawText);
  const { games, errors: parseErrors } = buildGamesFromEvents(events, { leagueId, leagueName, knownTeams });
  if (parseErrors.length) return { games: [], parseErrors, selfCheckErrors: [], deviations: [] };
  const selfCheckErrors = selfCheckGames(games);
  if (selfCheckErrors.length) return { games, parseErrors, selfCheckErrors, deviations: [] };
  const deviations = compareAgainstExpected(games);
  return { games, parseErrors, selfCheckErrors, deviations };
}

// ─────────────────────────────────────────────────────────────────────────
// I/O / CLI
// ─────────────────────────────────────────────────────────────────────────

async function atomicWriteTextFile(targetPath, content) {
  await mkdir(path.dirname(targetPath), { recursive: true });
  const tmpPath = `${targetPath}.tmp-${process.pid}`;
  await writeFile(tmpPath, content, 'utf8');
  await rename(tmpPath, targetPath);
}

async function runFetch(outPath) {
  console.log(`Rufe ${CALENDAR_URL} ab (einzige erlaubte Netzwerk-Ausnahme dieses Skripts) ...`);
  let res;
  try {
    res = await fetch(CALENDAR_URL);
  } catch (e) {
    console.error(`Abbruch: Abruf fehlgeschlagen (${e.message}). Nichts gespeichert.`);
    process.exitCode = 1;
    return;
  }
  console.log(`Statuscode: ${res.status}`);
  if (res.status !== 200) {
    console.error('Abbruch: Kalender-Export antwortete nicht mit 200. Nichts gespeichert.');
    process.exitCode = 1;
    return;
  }
  const text = await res.text();
  await atomicWriteTextFile(outPath, text);
  console.log(`Gespeichert: ${outPath} (${text.length} Zeichen).`);
  console.log('Keine Verarbeitung in diesem Lauf — zum Parsen erneut OHNE --fetch mit diesem Pfad aufrufen.');
}

async function runParse(icsPath, { write, outPath }) {
  let raw;
  try {
    raw = await readFile(icsPath, 'utf8');
  } catch (e) {
    console.error(`Abbruch: "${icsPath}" konnte nicht gelesen werden (${e.message}).`);
    process.exitCode = 1;
    return;
  }

  const { games, parseErrors, selfCheckErrors, deviations } = parseIcsCalendar(raw);

  if (parseErrors.length) {
    console.error(`${parseErrors.length} Parse-Fehler — kein Entwurf wird geschrieben:`);
    parseErrors.forEach((e) => console.error(`  - ${e}`));
    process.exitCode = 1;
    return;
  }

  if (selfCheckErrors.length) {
    console.error(`${selfCheckErrors.length} Konsistenzfehler — kein Entwurf wird geschrieben:`);
    selfCheckErrors.forEach((e) => console.error(`  - ${e}`));
    process.exitCode = 1;
    return;
  }

  console.log(`${games.length} Spiele geparst, Eigenprüfungen (doppelte IDs, Doppelbelegung, lückenlose Spieltage) bestanden.`);

  if (deviations.length > 0) {
    console.log(`${deviations.length} Abweichung(en) von den unabhängig abgelesenen Prüfsummen (siehe Auftrag) — werden gemeldet, nicht angeglichen:`);
    deviations.forEach((d) => console.log(`  - ${d}`));
  } else {
    console.log('Alle Prüfsummen stimmen mit den erwarteten Werten überein.');
  }

  if (!write) {
    console.log('Dry-Run — kein Entwurf geschrieben (--write fehlt).');
    process.exitCode = deviations.length > 0 ? 1 : 0;
    return;
  }

  if (deviations.length > 0) {
    console.error('Abbruch: --write verweigert, solange Abweichungen von den Prüfsummen bestehen. Erst klären, dann erneut versuchen.');
    process.exitCode = 1;
    return;
  }

  const draft = { season: SEASON_KEY, label: SEASON_LABEL, games };
  await writeJsonAtomic(outPath, draft);
  console.log(`Entwurf geschrieben: ${outPath} (${games.length} Spiele, Saison ${SEASON_KEY}).`);
  console.log(`Nächster Schritt (üblicher Weg): node scripts/import-season-data.mjs ${SEASON_KEY} ${outPath}`);
}

function printUsage() {
  console.error('Aufruf: node scripts/import-schedule.mjs --fetch [--out <pfad>]');
  console.error('    oder: node scripts/import-schedule.mjs <icsPfad> [--out <entwurfPfad>] [--write]');
}

export async function main(argv = process.argv.slice(2)) {
  const flags = new Set(argv.filter((a) => a.startsWith('--')));
  const positional = argv.filter((a) => !a.startsWith('--'));
  const outIdx = argv.indexOf('--out');
  const outArg = outIdx !== -1 ? argv[outIdx + 1] : null;

  if (flags.has('--fetch')) {
    await runFetch(outArg || DEFAULT_ICS_PATH);
    return;
  }

  const [icsPathArg] = positional;
  if (!icsPathArg) {
    printUsage();
    process.exitCode = 1;
    return;
  }

  await runParse(icsPathArg, { write: flags.has('--write'), outPath: outArg || DEFAULT_DRAFT_PATH });
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((e) => {
    console.error('Unerwarteter Fehler:', e.message);
    process.exitCode = 1;
  });
}

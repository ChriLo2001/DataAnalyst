// M0 · Datenaufbereitung (P1a der Liga-Analytics-Spezifikation, Abschnitt 4/M0).
//
// Reine, deterministische Normalisierung der Rohdaten aus season-data/*.json in
// die Strukturen teamGames[], goalEvents[], penaltyEvents[], timeoutEvents[],
// penaltyShotEvents[] und rosterEntries[] — plus ein Datenqualitätsbericht
// (`quality`). Kein Dateisystemzugriff, kein Netzwerk, keine Uhrzeit, keine
// Zufallswerte: gleiche Eingabe → byte-identische Ausgabe.
//
// Wiederverwendet (nicht kopiert): compareGamesChronologically
// (game-ordering.mjs) und buildMatchdays (matchday-derivation.mjs).
//
// Team-Regeln: normalizeTeamName / isUlmTeamName / getCanonicalTeamName liegen
// nur in index.html (klassisches <script>, nicht importierbar). Hier steht die
// tatsächlich benötigte Regel als kleine, gleichbedeutende Node-Fassung; ein
// Drift-Test (scripts/test-model-normalize.mjs) vergleicht sie mit den echten
// Funktionen aus index.html. Bewusst NICHT übernommen: cleanText()
// (Mojibake-/UI-Transliteration) — die Teamnamen der Saisondaten sind sauber.
//
// Ebenen der Ausgabe:
//   • Rohfelder stehen unverändert bzw. nah am Rohfeld in den Objekten (z. B. teamSide = event_team,
//     goalType, goalTypeString, timeRaw, sortkey, scoreAfter, penaltyType, hostingClub, ended, noticeType).
//   • Normalisierte Felder sind deterministisch aus genau einem Rohfeld bestimmt (absSec, timeFormat,
//     teamKey, isOwnGoal, assistRaw …).
//   • Fachlich abgeleitete Felder stehen ausschließlich im Unterobjekt `derived` (z. B. scoreDeltaSide,
//     scoreBefore, gameOrderOfDay, opponentPrevGameGoalDiff, isHostingTeam, Spielerzuordnung über die
//     Trikotnummer). M0 trifft keine späteren fachlichen Entscheidungen (z. B. keine Eigentor-Gutschrift,
//     keine Strafminuten-Umrechnung).
//
// Grundsätze (Entscheidungen zu P1a):
//   • Modell-Spielfilter strikt `ended === true` (weicht bewusst von
//     isGamePlayed() im Dashboard ab; siehe quality.excludedGames).
//   • Fehlt `hosting_club`, bleibt `isHostingTeam` null (keine Ableitung aus
//     Halle, Heim/Gast oder anderen Indizien); der Rohwert bleibt unverändert erhalten.
//   • goal_type "not_assigned" bleibt eigene Torart, keine Spielerzuordnung.
//   • assist null / fehlend / 0 = „kein Assist“; die Rohform wird getrennt
//     gezählt (assistRaw).
//   • Keine stillen Korrekturen: Auffälligkeiten erscheinen als Warnung bzw.
//     im Qualitätsbericht, nicht bestimmbare Werte sind null.

import { compareGamesChronologically } from '../game-ordering.mjs';
import { buildMatchdays } from '../matchday-derivation.mjs';

export const MODEL_SCHEMA_VERSION = 2;
/** Länge einer Halbzeit in Sekunden (Kleinfeld: 2 × 20 Minuten). */
export const HALF_SECONDS = 1200;
/**
 * Quellformat-/Platzhaltererkennung (KEINE fachliche Regel): In den Quelldaten stehen für Eigentore (1000) und
 * nicht zugeordnete Tore bzw. „kein Assist“ (2000) Platzhalter-Trikotnummern. Nummern ab diesem Wert werden nicht
 * als Kaderspieler aufgelöst; die Rohnummer bleibt erhalten, eine Spieleridentität wird daraus nicht abgeleitet.
 */
export const SOURCE_PLACEHOLDER_NUMBER_MIN = 1000;

// ─────────────────────────────────────────────────────────────────────────
// 1. Teams (Node-Fassung der Regeln aus index.html)
// ─────────────────────────────────────────────────────────────────────────

/** Reihenfolge der Saisonschlüssel wie in index.html SEASON_CONFIG (für die SG-Ära-Regel). */
export const SEASON_KEYS_ORDER = ['21/22', '22/23', '23/24', '24/25', '25/26', '26/27'];
const SG_ERA_LAST_SEASON = '23/24';
const ULM_TEAM_ALIASES = ['VfB Ulm', 'SG Sparks Ulm-Tübingen', 'SG Sparks Tübingen-Ulm'];

/** Gleichbedeutend mit normalizeTeamName() (ohne cleanText). */
export function normalizeTeamText(name) {
  return String(name ?? '')
    .trim()
    .toLowerCase()
    .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .replace(/\s+/g, ' ');
}

const ULM_TEAM_ALIAS_KEYS = ULM_TEAM_ALIASES.map(normalizeTeamText);

/** Gleichbedeutend mit isUlmTeamName(): VfB Ulm und beide SG-Sparks-Schreibweisen. */
export function isUlmTeamName(name) {
  const n = normalizeTeamText(name);
  if (!n) return false;
  return ULM_TEAM_ALIAS_KEYS.some((alias) => n === alias || n.includes(alias)) || (n.includes('vfb') && n.includes('ulm'));
}

/** Gleichbedeutend mit detectUlmSide(): 'home' | 'guest' | null. */
export function detectUlmSide(game) {
  if (isUlmTeamName(game?.home_team_name ?? '')) return 'home';
  if (isUlmTeamName(game?.guest_team_name ?? '')) return 'guest';
  return null;
}

const TEAM_ALIAS_RULES = [
  { canonical: 'VfB Ulm', aliases: ['VfB Ulm', 'Ulm', 'Ulm / SG'], role: 'ownTeam' },
  { canonical: 'VfB Ulm', aliases: ['SG Sparks Ulm-Tuebingen', 'SG Sparks Tuebingen-Ulm', 'SG Ulm-Tuebingen', 'SG Tuebingen-Ulm'], seasons: ['21/22', '22/23', '23/24'], role: 'ownTeam' },
  { canonical: 'Breisgau Bandits', aliases: ['SG Freiburg-Tuebingen', 'SG Tuebingen-Freiburg', 'Freiburg-Tuebingen', 'Freiburg Tuebingen'], seasons: ['24/25', '25/26', '26/27'], role: 'opponentAlias' },
  { canonical: 'SV Tuebingen Sharks', aliases: ['SG Freiburg-Tuebingen', 'SG Tuebingen-Freiburg', 'Freiburg-Tuebingen', 'Freiburg Tuebingen'], seasons: ['24/25', '25/26', '26/27'], role: 'opponentAlias' },
  { canonical: 'SV Tuebingen Sharks', aliases: ['SV Tuebingen Sharks', 'Tuebingen Sharks', 'Tuebingen'], role: 'opponentAlias' },
  { canonical: 'Breisgau Bandits', aliases: ['Breisgau Bandits', 'Freiburg', 'Breisgau'], role: 'opponentAlias' },
];

function ruleMatches(rule, name, seasonKey) {
  const key = normalizeTeamText(name);
  if (!key) return false;
  if (rule.seasons?.length && !rule.seasons.includes(seasonKey)) return false;
  return [rule.canonical, ...(rule.aliases || [])].some((alias) => normalizeTeamText(alias) === key);
}

function seasonIsSgEra(seasonKey) {
  if (!seasonKey) return true;
  const idx = SEASON_KEYS_ORDER.indexOf(seasonKey);
  return (idx === -1 ? 999 : idx) <= SEASON_KEYS_ORDER.indexOf(SG_ERA_LAST_SEASON);
}

/** Gleichbedeutend mit isOwnTeam(): eigenes Team = VfB Ulm bzw. (SG-Ära bis 23/24) SG Sparks Ulm-Tübingen. */
export function isOwnTeam(name, seasonKey = '') {
  const key = normalizeTeamText(name);
  if (!key) return false;
  if (TEAM_ALIAS_RULES.some((rule) => rule.role === 'ownTeam' && ruleMatches(rule, name, seasonKey))) return true;
  if (key.includes('freiburg') && (key.includes('tubingen') || key.includes('tuebingen'))) return false;
  if (key === 'ulm' || key === 'ulm sg' || (key.includes('vfb') && key.includes('ulm'))) return true;
  if (key.includes('ulm') && (key.includes('tubingen') || key.includes('tuebingen'))) return seasonIsSgEra(seasonKey);
  if (key.includes('sg sparks') && key.includes('ulm')) return seasonIsSgEra(seasonKey);
  return false;
}

function isFreiburgTuebingenSgName(n) {
  return !!n && n.includes('sg') && n.includes('freiburg') && (n.includes('tubingen') || n.includes('tuebingen'));
}
function isMannheimLudwigshafenSgName(n) {
  return !!n && n.includes('sg') && n.includes('mannheim') && n.includes('ludwigshafen');
}
function normalizeOpponentName(name, seasonKey) {
  const raw = String(name ?? '').trim();
  const n = normalizeTeamText(raw);
  if (!raw) return '?';
  if (isFreiburgTuebingenSgName(n)) return 'SG Freiburg-Tübingen';
  if (isMannheimLudwigshafenSgName(n)) return 'SG Mannheim-Ludwigshafen';
  if (n === 'freiburg' || n === 'breisgau bandits') return 'Breisgau Bandits';
  if (n === 'tubingen' || n === 'tuebingen' || n === 'sv tubingen sharks' || n === 'sv tuebingen sharks') return 'SV Tübingen Sharks';
  if (seasonKey === '22/23' && n === 'sportvg feuerbach 1') return 'Sportvg Feuerbach';
  return raw;
}

/** Gleichbedeutend mit getCanonicalTeamName(name, seasonKey, 'season'). */
export function canonicalTeamName(name, seasonKey = '') {
  if (isOwnTeam(name, seasonKey)) return 'VfB Ulm';
  const rule = TEAM_ALIAS_RULES.find((row) => row.role === 'opponentAlias' && ruleMatches(row, name, seasonKey));
  if (rule) return rule.canonical;
  return normalizeOpponentName(name, seasonKey);
}

/** Stabiler Teamschlüssel (Spezifikation: z. B. "vfb-ulm"): kanonischer Name, normalisiert, mit Bindestrichen. */
export function teamKeyFor(name, seasonKey = '') {
  return normalizeTeamText(canonicalTeamName(name, seasonKey)).replace(/ /g, '-');
}

// Ausrichter-Zuordnung: genau die zwei in M0.7 der Spezifikation genannten Sonderfälle ("kleine, versionierte
// Zuordnungstabelle"). Vorläufig; laut Entscheidung 2 später nach data/club-aliases.json überführen.
// Schlüssel = normalizeTeamText(hosting_club), Wert = kanonischer Teamname. Zugriff nur über Object.hasOwn.
export const HOSTING_CLUB_ALIASES_V1 = Object.freeze({
  'sv 03 tuebingen': 'SV Tuebingen Sharks',
  'ptsv freiburg': 'Breisgau Bandits',
});

// ─────────────────────────────────────────────────────────────────────────
// 2. Zeit
// ─────────────────────────────────────────────────────────────────────────

/** Gleichbedeutend mit parseGameClock(): "m:ss" oder "m" → Sekunden, sonst null. */
export function parseClockSeconds(time) {
  if (time === undefined || time === null || time === '') return null;
  const match = String(time).trim().match(/^(\d{1,2})(?::(\d{1,2}))?$/);
  if (!match) return null;
  const minutes = Number(match[1]);
  const seconds = match[2] === undefined ? 0 : Number(match[2]);
  if (!Number.isFinite(minutes) || !Number.isFinite(seconds) || seconds < 0 || seconds >= 60) return null;
  return minutes * 60 + seconds;
}

/**
 * Zeitformate eines Spiels (Spezifikation M0.3): Existiert ein Event mit period 2 und Zeit > 20:00, gilt Halbzeit 2
 * des ganzen Spiels als kumuliert. Halbzeit 1 über 20:00 ist ein Negativfall (kein Kumuliertformat) und wird nur gemeldet.
 */
export function detectGameTimeFormat(events) {
  let h2Cumulated = false;
  let h1OverLength = false;
  for (const ev of Array.isArray(events) ? events : []) {
    const sec = parseClockSeconds(ev?.time);
    if (sec === null) continue;
    const period = Number(ev?.period);
    if (period === 2 && sec > HALF_SECONDS) h2Cumulated = true;
    if (period === 1 && sec > HALF_SECONDS) h1OverLength = true;
  }
  return { h2Cumulated, h1OverLength };
}

/**
 * absSec + timeFormat für ein Event.
 *   perPeriod            (period − 1) · 1200 + Sekunden
 *   cumulated            Halbzeit 2 eines kumulierten Spiels: Sekunden = absSec
 *   h1OverLength         Halbzeit 1 mit Zeit > 20:00: gerechnet wie perPeriod, aber markiert
 *   ambiguousInCumulated Halbzeit-2-Zeit ≤ 20:00 in einem kumulierten Spiel: Zeitbasis widersprüchlich → absSec null
 *   unparseable          Zeit nicht lesbar (z. B. "3.25") → absSec null
 *   unknownPeriod        Periode fehlt/ungültig → absSec null
 */
export function eventTiming(ev, gameFormat) {
  const period = Number(ev?.period);
  if (!Number.isFinite(period) || period < 1) return { absSec: null, timeFormat: 'unknownPeriod' };
  const sec = parseClockSeconds(ev?.time);
  if (sec === null) return { absSec: null, timeFormat: 'unparseable' };
  if (period === 2 && gameFormat.h2Cumulated) {
    return sec > HALF_SECONDS ? { absSec: sec, timeFormat: 'cumulated' } : { absSec: null, timeFormat: 'ambiguousInCumulated' };
  }
  const absSec = (period - 1) * HALF_SECONDS + sec;
  return { absSec, timeFormat: period === 1 && sec > HALF_SECONDS ? 'h1OverLength' : 'perPeriod' };
}

// ─────────────────────────────────────────────────────────────────────────
// 3. Spielfilter
// ─────────────────────────────────────────────────────────────────────────

const YOUTH_RE = /\bU\s*\d{2}\b|Jugend|Junior|Youth|Nachwuchs/i;
/** Gleichbedeutend mit isYouthGame() aus index.html. */
export function isYouthGame(g) {
  const fields = [
    g?.competition_type, g?.match_type, g?.game_type, g?.spielplan_name, g?.league_name, g?.competition_name,
    g?.season_name, g?.league?.name, g?.season?.name, g?.spielplan?.name,
  ].filter(Boolean);
  return fields.some((f) => YOUTH_RE.test(String(f)));
}

// Spezifikation M0.1: "Verschobene Spiele (notice_type) ausschließen" (Rohwert der Daten: "Postponed"; 3.6.3 nennt „verlegt“).
// Keine weitere Interpretation von Statusfeldern (z. B. wird "Canceled" NICHT als Ausschlussgrund gewertet).
const NOTICE_EXCLUDE_RE = /postpone|verschoben|verlegt/i;

function resultScore(game) {
  const h = game?.result?.home_goals;
  const g = game?.result?.guest_goals;
  const home = h === null || h === undefined || h === '' ? NaN : Number(h);
  const guest = g === null || g === undefined || g === '' ? NaN : Number(g);
  return Number.isFinite(home) && Number.isFinite(guest) ? { home, guest } : null;
}

/** Ausschlussgründe in fester Reihenfolge; der erste zutreffende ist der Hauptgrund (`reason`). */
export const EXCLUSION_REASON_ORDER = ['not_ended', 'youth', 'forfeit', 'postponed', 'no_result'];

/**
 * Modell-Spielfilter (Spezifikation M0.1 und Entscheidung zu P1a):
 *   not_ended  `ended !== true` (strikt)          youth     isYouthGame()-Regel
 *   forfeit    `result.forfait === true`          postponed `notice_type` verschoben/verlegt
 *   no_result  kein numerischer Endstand
 * @returns {{included:boolean, reason:string|null, reasons:string[]}} `reasons` = alle zutreffenden Gründe in
 *   EXCLUSION_REASON_ORDER, `reason` = der erste davon.
 */
export function classifyModelGame(game) {
  const hits = {
    not_ended: game?.ended !== true,
    youth: isYouthGame(game),
    forfeit: game?.result?.forfait === true,
    postponed: NOTICE_EXCLUDE_RE.test(String(game?.notice_type ?? '')),
    no_result: !resultScore(game),
  };
  const reasons = EXCLUSION_REASON_ORDER.filter((r) => hits[r]);
  return { included: reasons.length === 0, reason: reasons[0] ?? null, reasons };
}

// ─────────────────────────────────────────────────────────────────────────
// 4. Roster
// ─────────────────────────────────────────────────────────────────────────

function isGoalieEntry(p) {
  return p?.position === 'Tor' || p?.goalkeeper === true;
}
function playerDisplayName(p) {
  return [p?.player_firstname, p?.player_name].filter((x) => x !== undefined && x !== null && String(x).trim() !== '').map((x) => String(x).trim()).join(' ') || null;
}
function rosterOf(game, side) {
  const list = game?.players?.[side];
  return Array.isArray(list) ? list : [];
}

// ─────────────────────────────────────────────────────────────────────────
// 5. Ausrichter
// ─────────────────────────────────────────────────────────────────────────

/**
 * Ordnet einen VORHANDENEN hosting_club-Rohwert einem Team der Saison zu (nur zur Bestimmung von isHostingTeam).
 * Der Rohwert wird nicht verändert; getrimmt/normalisiert wird nur intern für den Vergleich.
 *   missing     Wert fehlt, ist null, leer oder nur Leerraum → kein Ableiten, isHostingTeam bleibt null
 *   unresolved  Wert vorhanden, aber kein Text oder kein Team der Saison (auch nach Alias) → null
 *   resolved    Team der Saison gefunden
 * @returns {{status:'missing'|'resolved'|'unresolved', teamKey:string|null}}
 */
export function resolveHostingClub(hostingClub, seasonKey, knownTeamKeys) {
  if (hostingClub === undefined || hostingClub === null) return { status: 'missing', teamKey: null };
  if (typeof hostingClub !== 'string') return { status: 'unresolved', teamKey: null };
  const text = hostingClub.trim();
  if (!text) return { status: 'missing', teamKey: null };
  const key = normalizeTeamText(text);
  const alias = Object.hasOwn(HOSTING_CLUB_ALIASES_V1, key) ? HOSTING_CLUB_ALIASES_V1[key] : undefined;
  const teamKey = teamKeyFor(alias ?? text, seasonKey);
  return knownTeamKeys.has(teamKey) ? { status: 'resolved', teamKey } : { status: 'unresolved', teamKey: null };
}

// ─────────────────────────────────────────────────────────────────────────
// 6. Saison normalisieren
// ─────────────────────────────────────────────────────────────────────────

function assistRawKind(ev) {
  if (!('assist' in ev) || ev.assist === undefined) return 'missing';
  if (ev.assist === null) return 'null';
  return Number(ev.assist) === 0 ? 'zero' : 'number';
}

function emptyQuality() {
  return {
    games: 0, ended: 0, notEnded: 0, modelGames: 0,
    excluded: { forfeit: 0, postponed: 0, youth: 0, noResult: 0 },
    excludedGames: [],
    endedFalseWithEvidence: [],
    goals: 0,
    goalTypes: { regular: 0, penalty_shot: 0, owngoal: 0, not_assigned: 0, other: 0 },
    ownGoals: { events: 0, games: 0, eventsUlm: 0, gamesUlm: 0 },
    penaltyShots: 0, penaltyEvents: 0, timeouts: 0,
    time: { h2CumulatedGames: 0, h2MixedGames: 0, h1OverLengthGames: 0, goalsUnparsable: 0, eventsUnparsable: 0, eventsAmbiguous: 0 },
    assists: { number: 0, zero: 0, null: 0, missing: 0, placeholder: 0, nullish: 0 },
    scorers: { matched: 0, placeholder: 0, unmatched: 0, ambiguous: 0 },
    placeholderNumbers: [],
    goalSumMismatch: [],
    scoreChainBreaks: 0,
    scoreMissing: 0,
    scoreDeltaSideConflicts: [],
    hosting: { missingGames: 0, presentGames: 0, unresolvedClubs: [] },
    goalies: { teamGames: 0, withoutGoalie: 0, withoutRoster: 0, twoGoalies: 0, flagMismatch: 0 },
    teamMatchdays: { dist: {}, notTwo: [] },
  };
}

/**
 * Normalisiert eine Saison (Eingabe: geparstes season-data/<season>.json).
 * @param {{season:string, label?:string, games:object[]}} seasonData
 */
export function normalizeSeason(seasonData) {
  const seasonKey = String(seasonData?.season ?? '');
  const games = Array.isArray(seasonData?.games) ? seasonData.games : [];
  const matchdays = buildMatchdays({ season: seasonKey, games });
  const matchdayOfGame = new Map();
  for (const md of matchdays) for (const g of md.games) matchdayOfGame.set(g, md);

  const sorted = [...games].sort(compareGamesChronologically);
  const knownTeamKeys = new Set();
  for (const g of sorted) for (const name of [g?.home_team_name, g?.guest_team_name]) if (name) knownTeamKeys.add(teamKeyFor(name, seasonKey));

  const q = emptyQuality();
  const warnings = [];
  const warn = (code, gameId, message) => warnings.push({ code, gameId: gameId ?? null, message });
  const placeholders = new Set();
  const unresolvedClubs = new Set();

  const out = { teamGames: [], goalEvents: [], penaltyShotEvents: [], penaltyEvents: [], timeoutEvents: [], rosterEntries: [] };
  const included = [];
  const endedPerMatchdayTeam = new Map();

  for (const g of sorted) {
    q.games++;
    const cls = classifyModelGame(g);
    const gameId = g?.id ?? null;
    const events = Array.isArray(g?.events) ? g.events : [];

    // Nachvollziehbarer Ausschlusseintrag mit Rohmarkern (ended, notice_type, result.forfait)
    const exclusionEntry = () => {
      const s = resultScore(g);
      return {
        seasonKey, gameId, date: String(g?.date ?? ''), home: String(g?.home_team_name ?? ''), guest: String(g?.guest_team_name ?? ''),
        ulmInvolved: detectUlmSide(g) !== null,
        reason: cls.reason, reasons: cls.reasons,
        ended: g?.ended ?? null, noticeType: g?.notice_type ?? null, resultForfait: g?.result?.forfait ?? null,
        score: s ? `${s.home}:${s.guest}` : null, events: events.length,
      };
    };

    if (g?.ended !== true) {
      q.notEnded++;
      const entry = exclusionEntry();
      q.excludedGames.push(entry);
      if (events.length > 0 || entry.score !== null) {
        q.endedFalseWithEvidence.push(entry);
        warn('ended_false_with_evidence', gameId, `ended !== true (${JSON.stringify(entry.ended)}), aber ${events.length} Events${entry.score ? ` und Endstand ${entry.score}` : ''} — vom Modell ausgeschlossen`);
      }
      continue;
    }

    // ── Qualitätsumfang: alle beendeten Spiele (auch später ausgeschlossene) ──
    q.ended++;
    if (cls.reason === 'forfeit') q.excluded.forfeit++;
    else if (cls.reason === 'postponed') q.excluded.postponed++;
    else if (cls.reason === 'youth') q.excluded.youth++;
    else if (cls.reason === 'no_result') q.excluded.noResult++;
    if (cls.included) q.modelGames++;
    else {
      const entry = exclusionEntry();
      q.excludedGames.push(entry);
      warn('game_excluded', gameId, `beendet, aber vom Modell ausgeschlossen: ${cls.reasons.join(', ')}`);
    }

    const md = matchdayOfGame.get(g);
    const mdKey = md ? md.key : `${seasonKey}#date:${String(g?.date ?? '')}`;
    const teams = {
      home: { name: String(g?.home_team_name ?? ''), key: teamKeyFor(g?.home_team_name, seasonKey) },
      guest: { name: String(g?.guest_team_name ?? ''), key: teamKeyFor(g?.guest_team_name, seasonKey) },
    };
    for (const side of ['home', 'guest']) {
      const k = `${mdKey}|${teams[side].key}`;
      endedPerMatchdayTeam.set(k, (endedPerMatchdayTeam.get(k) || 0) + 1);
      const roster = rosterOf(g, side);
      const goalies = roster.filter(isGoalieEntry).length;
      q.goalies.teamGames++;
      if (roster.length === 0) q.goalies.withoutRoster++;
      if (goalies === 0) q.goalies.withoutGoalie++;
      if (goalies === 2) q.goalies.twoGoalies++;
      q.goalies.flagMismatch += roster.filter((p) => (p?.position === 'Tor') !== (p?.goalkeeper === true)).length;
    }

    const hosting = resolveHostingClub(g?.hosting_club, seasonKey, knownTeamKeys);
    if (hosting.status === 'missing') q.hosting.missingGames++;
    else {
      q.hosting.presentGames++;
      if (hosting.status === 'unresolved') unresolvedClubs.add(typeof g.hosting_club === 'string' ? g.hosting_club : JSON.stringify(g.hosting_club));
    }

    const fmt = detectGameTimeFormat(events);
    let mixed = false;
    const ulmInGame = detectUlmSide(g) !== null;
    if (fmt.h2Cumulated) q.time.h2CumulatedGames++;
    if (fmt.h1OverLength) {
      q.time.h1OverLengthGames++;
      warn('h1_over_length', gameId, 'Halbzeit 1 enthält Zeiten über 20:00 (kein Kumuliertformat)');
    }

    // ── Events ──
    const goalIndexes = [];
    let prev = { home: 0, guest: 0 };
    let goalCount = 0;
    let hadOwnGoal = false;
    events.forEach((ev, index) => {
      const type = ev?.event_type;
      const timing = eventTiming(ev, fmt);
      if (timing.timeFormat === 'unparseable' || timing.timeFormat === 'unknownPeriod') {
        q.time.eventsUnparsable++;
        if (type === 'goal') q.time.goalsUnparsable++;
        warn('time_unparseable', gameId, `Event ${index} (${type}): Zeit "${ev?.time}" nicht lesbar — absSec null`);
      }
      if (timing.timeFormat === 'ambiguousInCumulated') {
        q.time.eventsAmbiguous++;
        mixed = true;
        warn('time_ambiguous_in_cumulated_game', gameId, `Event ${index} (${type}): Zeit "${ev?.time}" in Halbzeit 2 eines kumulierten Spiels — Zeitbasis widersprüchlich, absSec null`);
      }
      const eventKey = `${gameId}#${index}`;
      const side = ev?.event_team === 'home' || ev?.event_team === 'guest' ? ev.event_team : null;
      const team = side ? teams[side] : null;
      const base = {
        seasonKey, gameId, eventKey, eventId: ev?.event_id ?? null, sortkey: ev?.sortkey ?? null,
        period: ev?.period ?? null, timeRaw: ev?.time ?? null,
        absSec: timing.absSec, timeFormat: timing.timeFormat, teamSide: side, teamKey: team ? team.key : null,
      };

      if (type === 'goal') {
        goalIndexes.push(index);
        q.goals++;
        goalCount++;
        const goalType = ev?.goal_type ?? null;
        if (goalType === 'regular' || goalType === 'penalty_shot' || goalType === 'owngoal' || goalType === 'not_assigned') q.goalTypes[goalType]++;
        else q.goalTypes.other++;
        const isOwnGoal = goalType === 'owngoal';
        const isNotAssigned = goalType === 'not_assigned';
        const isPenaltyShot = goalType === 'penalty_shot';
        if (isOwnGoal) { q.ownGoals.events++; hadOwnGoal = true; if (ulmInGame) q.ownGoals.eventsUlm++; }
        if (isPenaltyShot) q.penaltyShots++;

        const roster = side ? rosterOf(g, side) : [];
        const number = ev?.number === undefined || ev?.number === null ? null : Number(ev.number);
        let scorer = { playerId: null, match: 'none' };
        if (number !== null && Number.isFinite(number)) {
          if (number >= SOURCE_PLACEHOLDER_NUMBER_MIN) { scorer = { playerId: null, match: 'placeholder' }; placeholders.add(number); }
          else if (!isOwnGoal && !isNotAssigned) {
            const found = roster.filter((p) => Number(p?.trikot_number) === number);
            if (found.length === 1) scorer = { playerId: found[0].player_id ?? null, match: 'roster' };
            else scorer = { playerId: null, match: found.length > 1 ? 'ambiguous' : 'unmatched' };
          } else scorer = { playerId: null, match: 'unmatched' };
        }
        if (scorer.match === 'roster') q.scorers.matched++;
        else if (scorer.match === 'placeholder') q.scorers.placeholder++;
        else if (scorer.match === 'ambiguous') q.scorers.ambiguous++;
        else if (scorer.match === 'unmatched' && !isOwnGoal && !isNotAssigned) q.scorers.unmatched++;

        const rawKind = assistRawKind(ev);
        const assistNumber = rawKind === 'number' ? Number(ev.assist) : null;
        let assistKind = 'none';
        let assistPlayerId = null;
        if (rawKind === 'number') {
          if (assistNumber >= SOURCE_PLACEHOLDER_NUMBER_MIN) { assistKind = 'placeholder'; placeholders.add(assistNumber); q.assists.placeholder++; }
          else {
            const found = roster.filter((p) => Number(p?.trikot_number) === assistNumber);
            if (found.length === 1 && !isOwnGoal && !isNotAssigned) { assistKind = 'player'; assistPlayerId = found[0].player_id ?? null; }
            else assistKind = 'unmatched';
            q.assists.number++;
          }
        } else q.assists[rawKind]++;
        if (rawKind === 'null' || rawKind === 'missing') q.assists.nullish++;

        // Spielstandkette: vor dem Tor = Stand nach dem vorigen Tor (Anfang 0:0)
        const afterHome = ev?.home_goals === undefined || ev?.home_goals === null ? null : Number(ev.home_goals);
        const afterGuest = ev?.guest_goals === undefined || ev?.guest_goals === null ? null : Number(ev.guest_goals);
        const scoreBefore = { home: prev.home, guest: prev.guest };
        // scoreDeltaSide: beobachtbarer Datenfakt — die Seite, deren Spielstand seit dem vorigen Tor-Event um genau 1
        // steigt (die andere unverändert). null, wenn das aus den Spielständen nicht eindeutig ermittelbar ist
        // (Stand fehlt, keine oder mehr als eine Änderung). KEINE fachliche Gutschrift: welchem Team ein Eigentor
        // zählt, entscheidet erst ein späteres Analysemodul. teamSide (= event_team) bleibt unverändert erhalten.
        let scoreDeltaSide = null;
        if (afterHome !== null && afterGuest !== null) {
          const dHome = afterHome - prev.home;
          const dGuest = afterGuest - prev.guest;
          if (dHome === 1 && dGuest === 0) scoreDeltaSide = 'home';
          else if (dHome === 0 && dGuest === 1) scoreDeltaSide = 'guest';
          else {
            q.scoreChainBreaks++;
            warn('score_chain_break', gameId, `Tor-Event ${index}: Spielstand ${afterHome}:${afterGuest} folgt nicht mit genau einem Tor auf ${prev.home}:${prev.guest} — scoreDeltaSide null`);
          }
          prev = { home: afterHome, guest: afterGuest };
        } else {
          q.scoreMissing++;
          warn('score_missing', gameId, `Tor-Event ${index}: Spielstand fehlt — scoreDeltaSide null`);
        }
        if (scoreDeltaSide !== null && side !== null && scoreDeltaSide !== side) {
          q.scoreDeltaSideConflicts.push({ gameId, eventKey, goalType, teamSide: side, scoreDeltaSide });
          warn('score_delta_side_differs_from_event_team', gameId, `Tor-Event ${index} (${goalType}): Spielstand steigt für ${scoreDeltaSide}, event_team ist ${side}`);
        }

        const goalEvent = {
          ...base,
          goalType, goalTypeString: ev?.goal_type_string ?? null, isOwnGoal, isNotAssigned, isPenaltyShot,
          scorerNumber: number, assistRaw: rawKind, assistNumber,
          scoreAfter: afterHome !== null && afterGuest !== null ? { home: afterHome, guest: afterGuest } : null,
          derived: {
            scoreBefore, scoreDeltaSide,
            scorerPlayerId: scorer.playerId, scorerMatch: scorer.match, assistKind, assistPlayerId,
          },
        };
        if (cls.included) {
          out.goalEvents.push(goalEvent);
          if (isPenaltyShot) {
            out.penaltyShotEvents.push({
              seasonKey, gameId, eventKey, teamSide: side, teamKey: base.teamKey, scorerNumber: number,
              absSec: timing.absSec, timeFormat: timing.timeFormat, derived: { scorerPlayerId: scorer.playerId },
            });
          }
        }
      } else if (type === 'penalty') {
        q.penaltyEvents++;
        const number = ev?.number === undefined || ev?.number === null ? null : Number(ev.number);
        const found = side && number !== null ? rosterOf(g, side).filter((p) => Number(p?.trikot_number) === number) : [];
        if (cls.included) {
          // Rohdaten der Strafe; keine Umrechnung in Minuten und keine Klassifikation (M0 definiert keine
          // allgemeingültige Minutenabbildung — Interpretation bleibt einem späteren Modul überlassen).
          out.penaltyEvents.push({
            ...base,
            playerNumber: number,
            penaltyType: ev?.penalty_type ?? null, penaltyTypeString: ev?.penalty_type_string ?? null,
            penaltyId: ev?.penalty_id ?? null, penaltyCodeId: ev?.penalty_code_id ?? null,
            reasonId: ev?.penalty_reason ?? null, reason: ev?.penalty_reason_string ?? null,
            derived: { playerId: found.length === 1 ? found[0].player_id ?? null : null },
          });
        }
      } else if (type === 'timeout') {
        q.timeouts++;
        if (cls.included) {
          out.timeoutEvents.push({
            ...base,
            homeGoals: ev?.home_goals ?? null, guestGoals: ev?.guest_goals ?? null,
          });
        }
      }
    });
    if (mixed) q.time.h2MixedGames++;
    if (hadOwnGoal) { q.ownGoals.games++; if (ulmInGame) q.ownGoals.gamesUlm++; }

    const score = resultScore(g);
    if (score && goalCount !== score.home + score.guest) {
      q.goalSumMismatch.push({ gameId, events: goalCount, result: score.home + score.guest });
      warn('goal_sum_mismatch', gameId, `Tor-Events ${goalCount} ≠ Endstand ${score.home + score.guest}`);
    }
    if (!score && !cls.reasons.includes('forfeit')) warn('ended_without_result', gameId, 'ended === true, aber kein Endstand');

    if (!cls.included) continue;

    // ── Team-Spiele und Roster (nur Modell-Spiele) ──
    for (const side of ['home', 'guest']) {
      const roster = rosterOf(g, side);
      const goalies = roster.filter(isGoalieEntry);
      const field = roster.filter((p) => !isGoalieEntry(p));
      const opp = side === 'home' ? 'guest' : 'home';
      const goalsFor = score[side];
      const goalsAgainst = score[opp];
      const tg = {
        seasonKey, gameId, matchdayKey: mdKey, matchdayNumber: md?.number ?? null,
        date: String(g?.date ?? ''), startTime: g?.start_time ? String(g.start_time) : null, gameNumber: g?.game_number ?? null,
        side, teamKey: teams[side].key, teamName: teams[side].name,
        opponentKey: teams[opp].key, opponentName: teams[opp].name,
        isUlm: isUlmTeamName(teams[side].name),
        goalsFor, goalsAgainst,
        // Rohmarker des Spiels (unverändert)
        ended: g.ended, noticeType: g?.notice_type ?? null, resultForfait: g?.result?.forfait ?? null,
        hostingClub: g?.hosting_club ?? null,
        fieldPlayerCount: field.length, goalieCount: goalies.length,
        fieldPlayerIds: field.map((p) => p.player_id ?? null), goalieIds: goalies.map((p) => p.player_id ?? null),
        derived: {
          hostingStatus: hosting.status, hostingClubTeamKey: hosting.teamKey,
          isHostingTeam: hosting.status === 'resolved' ? hosting.teamKey === teams[side].key : null,
          gameOrderOfDay: null, opponentGameOrderOfDay: null, ownPrevGameGoalDiff: null, opponentPrevGameGoalDiff: null,
        },
      };
      out.teamGames.push(tg);
      included.push(tg);
      for (const p of roster) {
        out.rosterEntries.push({
          seasonKey, gameId, side, teamKey: teams[side].key,
          playerId: p?.player_id ?? null, firstName: p?.player_firstname ?? null, lastName: p?.player_name ?? null,
          playerName: playerDisplayName(p), trikotNumber: p?.trikot_number ?? null,
          position: p?.position ?? null, goalkeeperFlag: p?.goalkeeper ?? null, captainFlag: p?.captain ?? null,
          isGoalie: isGoalieEntry(p), isCaptain: p?.captain === true,
        });
      }
    }
  }

  q.hosting.unresolvedClubs = [...unresolvedClubs].sort();
  q.placeholderNumbers = [...placeholders].sort((a, b) => a - b);

  // Team-Spieltage (beendete Spiele, Umfang wie Qualitätsbericht)
  const dist = {};
  for (const [k, n] of [...endedPerMatchdayTeam.entries()].sort((a, b) => (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0))) {
    dist[n] = (dist[n] || 0) + 1;
    if (n !== 2) {
      const [matchday, teamKey] = k.split('|');
      q.teamMatchdays.notTwo.push({ matchday, teamKey, games: n });
    }
  }
  q.teamMatchdays.dist = dist;

  // Reihenfolge am Spieltag (Modell-Spiele): nur bei genau 2 Modell-Spielen eines Teams am Spieltag bestimmbar
  const byKey = new Map();
  for (const tg of included) {
    const k = `${tg.matchdayKey}|${tg.teamKey}`;
    if (!byKey.has(k)) byKey.set(k, []);
    byKey.get(k).push(tg);
  }
  const lookup = new Map();
  for (const list of byKey.values()) for (const tg of list) lookup.set(`${tg.gameId}|${tg.teamKey}`, list);
  for (const list of byKey.values()) {
    if (list.length !== 2) continue;
    list[0].derived.gameOrderOfDay = 1;
    list[1].derived.gameOrderOfDay = 2;
    list[1].derived.ownPrevGameGoalDiff = list[0].goalsFor - list[0].goalsAgainst;
  }
  for (const tg of included) {
    const oppList = lookup.get(`${tg.gameId}|${tg.opponentKey}`);
    if (!oppList || oppList.length !== 2) continue;
    const oppSelf = oppList.find((x) => x.gameId === tg.gameId);
    tg.derived.opponentGameOrderOfDay = oppSelf ? oppSelf.derived.gameOrderOfDay : null;
    if (oppSelf && oppSelf.derived.gameOrderOfDay === 2) tg.derived.opponentPrevGameGoalDiff = oppSelf.derived.ownPrevGameGoalDiff;
  }

  return { schemaVersion: MODEL_SCHEMA_VERSION, seasonKey, label: seasonData?.label ?? null, ...out, warnings, quality: q };
}

/** Normalisiert mehrere Saisons (Reihenfolge der Eingabe bleibt erhalten). */
export function normalizeSeasons(seasonDataList) {
  return (Array.isArray(seasonDataList) ? seasonDataList : []).map((s) => normalizeSeason(s));
}

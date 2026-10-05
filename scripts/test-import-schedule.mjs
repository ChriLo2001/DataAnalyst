#!/usr/bin/env node
// Tests für scripts/import-schedule.mjs (offline ICS-Kalender-Parser, Aufgabe 3).
//
// Prüft die reinen Parse-/Validierungsfunktionen mit synthetischen, aber
// realistisch geformten VEVENT-Blöcken (Zeilenfaltung, Escapes, beide
// SUMMARY-Varianten, Karlsruhe-Ost-Bindestrich, Zeitzonen-Strenge) sowie die
// Eigenprüfungen und den Prüfsummen-Vergleich. Kein Netzzugriff — dieser
// Test ruft --fetch nie auf (siehe CLAUDE.md: Kalenderabruf läuft nie
// automatisch in Tests).
//
// Aufruf: node scripts/test-import-schedule.mjs

import {
  unfoldIcsLines,
  unescapeIcsText,
  parseIcsEvents,
  parseGameId,
  parseSummary,
  parseDtstart,
  parseLocation,
  buildGameFromEvent,
  buildGamesFromEvents,
  selfCheckGames,
  compareAgainstExpected,
  parseIcsCalendar,
  KNOWN_TEAMS_26_27,
  LEAGUE_ID,
  LEAGUE_NAME,
} from './import-schedule.mjs';

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

function vevent({ uid, dtstartLine, summary, location }) {
  return [
    'BEGIN:VEVENT',
    'DTSTAMP:20261003T002756Z',
    `UID:${uid}`,
    dtstartLine,
    'DTEND;TZID=Europe/Berlin:20261011T110000',
    'CLASS:PUBLIC',
    `SUMMARY:${summary}`,
    `LOCATION:${location}`,
    'END:VEVENT',
  ].join('\r\n');
}

const OPTS = { leagueId: LEAGUE_ID, leagueName: LEAGUE_NAME, knownTeams: KNOWN_TEAMS_26_27 };

// ── A) Zeilenentfaltung (RFC5545 Folding) ──────────────────────────────────
console.log('== A) unfoldIcsLines: Fortsetzungszeilen ==');
{
  const folded = 'SUMMARY:1. Spieltag\\, DJK Giants Karlsruhe-Ost - Sportvg Feuerbach Rössle \r\n (Verbandsliga Baden-Württemberg\\, FVBW)\r\nEND:VEVENT';
  const lines = unfoldIcsLines(folded);
  assertEqual(lines.length, 2, 'zwei gefaltete Zeilen werden zu einer zusammengeführt');
  assertTrue(lines[0].includes('FVBW)'), 'die zusammengeführte Zeile enthält den vollständigen Suffix');
}

// ── B) Escapes ──────────────────────────────────────────────────────────
console.log('== B) unescapeIcsText ==');
{
  assertEqual(unescapeIcsText('A\\, B\\; C\\\\D'), 'A, B; C\\D', 'Komma/Semikolon/Backslash werden entschärft');
  assertEqual(unescapeIcsText('A\\nB'), 'A B', '\\n wird zu einem Leerzeichen (Zeilenumbruch im Fließtext)');
}

// ── C) Spiel-ID aus UID ──────────────────────────────────────────────────
console.log('== C) parseGameId: Präfix sm_game_, nie geraten ==');
{
  assertEqual(parseGameId('sm_game_63383'), 63383, 'korrektes Präfix liefert die Zahl');
  assertEqual(parseGameId('sm_game_'), null, 'Präfix ohne Ziffern liefert null');
  assertEqual(parseGameId('spiel_63383'), null, 'falsches Präfix liefert null, keine Rate');
  assertEqual(parseGameId(null), null, 'fehlende UID liefert null');
}

// ── D) SUMMARY: beide Varianten, Karlsruhe-Ost-Bindestrich ─────────────────
console.log('== D) parseSummary: mit/ohne Suffix, interner Bindestrich bleibt erhalten ==');
{
  const withSuffix = parseSummary('1. Spieltag\\, DJK Giants Karlsruhe-Ost - Sportvg Feuerbach Rössle (Verbandsliga Baden-Württemberg\\, FVBW)');
  assertEqual(withSuffix, { matchday: 1, homeTeamRaw: 'DJK Giants Karlsruhe-Ost', guestTeamRaw: 'Sportvg Feuerbach Rössle' }, 'Suffix wird entfernt, Karlsruhe-Ost bleibt ein Name');

  const withoutSuffix = parseSummary('2. Spieltag\\, SV Tübingen Sharks - VfB Ulm');
  assertEqual(withoutSuffix, { matchday: 2, homeTeamRaw: 'SV Tübingen Sharks', guestTeamRaw: 'VfB Ulm' }, 'auch ohne Suffix funktioniert die Trennung');

  assertEqual(parseSummary('Spieltag ohne Nummer - X - Y'), null, 'fehlende Spieltagsnummer -> null, nicht geraten');
  assertEqual(parseSummary('1. Spieltag, Nur ein Team'), null, 'nur ein Teamname (keine Trennung gefunden) -> null');
}

// ── E) DTSTART: nur Europe/Berlin, nie über Date/UTC ────────────────────────
console.log('== E) parseDtstart: strikt Europe/Berlin, Ziffern direkt gelesen ==');
{
  assertEqual(parseDtstart('DTSTART;TZID=Europe/Berlin', '20261011T100000'), { date: '2026-10-11', startTime: '10:00' }, 'Sommerzeit-Datum (vor der Umstellung) bleibt 10:00');
  assertEqual(parseDtstart('DTSTART;TZID=Europe/Berlin', '20261107T100000'), { date: '2026-11-07', startTime: '10:00' }, 'Winterzeit-Datum (nach der Umstellung) bleibt ebenfalls 10:00 — keine Verschiebung');
  assertEqual(parseDtstart('DTSTART', '20261011T100000Z'), null, 'UTC-Form ("Z", kein TZID) wird abgelehnt statt umgerechnet');
  assertEqual(parseDtstart('DTSTART;TZID=America/New_York', '20261011T100000'), null, 'andere Zeitzone wird abgelehnt statt geraten');
  assertEqual(parseDtstart('DTSTART;TZID=Europe/Berlin', 'nonsense'), null, 'unlesbare Ziffern -> null');
}

// ── F) LOCATION: Hallenname + Anschrift trennen ─────────────────────────────
console.log('== F) parseLocation ==');
{
  assertEqual(
    parseLocation('Hermann-Hepper-Turnhalle\\, Westbahnhofstraße 23\\, 72070 Tübingen'),
    { arenaName: 'Hermann-Hepper-Turnhalle', arenaAddress: 'Westbahnhofstraße 23, 72070 Tübingen' },
    'erstes Komma trennt Hallenname von Anschrift',
  );
  assertEqual(parseLocation(''), { arenaName: '', arenaAddress: '' }, 'leeres LOCATION liefert leere Felder, nichts erfunden');
}

// ── G) buildGameFromEvent: Happy Path + jede Fehlerart einzeln ─────────────
console.log('== G) buildGameFromEvent ==');
{
  const okEvent = { uid: 'sm_game_63383', dtstartKey: 'DTSTART;TZID=Europe/Berlin', dtstart: '20261011T100000', summary: '1. Spieltag\\, DJK Giants Karlsruhe-Ost - Sportvg Feuerbach Rössle (Verbandsliga Baden-Württemberg\\, FVBW)', location: 'Hermann-Hepper-Turnhalle\\, Westbahnhofstraße 23\\, 72070 Tübingen' };
  const okResult = buildGameFromEvent(okEvent, OPTS);
  assertEqual(okResult.errors, [], 'vollständiges Event erzeugt keine Fehler');
  assertEqual(okResult.game.id, 63383, 'Spiel-ID korrekt übernommen');
  assertEqual(okResult.game.date, '2026-10-11', 'Datum korrekt übernommen');
  assertEqual(okResult.game.start_time, '10:00', 'Startzeit korrekt übernommen');
  assertEqual(okResult.game.home_team_name, 'DJK Giants Karlsruhe-Ost', 'Heimteam korrekt');
  assertEqual(okResult.game.guest_team_name, 'Sportvg Feuerbach Rössle', 'Gastteam korrekt');
  assertEqual(okResult.game.game_day, { game_day_number: 1, title: '1. Spieltag' }, 'game_day korrekt gebaut');
  assertEqual(okResult.game.league_id, LEAGUE_ID, 'league_id gesetzt');
  assertEqual(okResult.game.league_name, LEAGUE_NAME, 'league_name gesetzt');
  assertEqual(okResult.game.started, false, 'started:false');
  assertEqual(okResult.game.ended, false, 'ended:false');
  assertEqual(okResult.game.events, [], 'events leer');
  assertEqual(okResult.game.result, null, 'result:null');

  const unknownTeamEvent = { ...okEvent, summary: '1. Spieltag\\, Erfundenes Team - VfB Ulm' };
  const unknownResult = buildGameFromEvent(unknownTeamEvent, OPTS);
  assertTrue(unknownResult.errors.some((e) => e.includes('Erfundenes Team')), 'unbekannte Mannschaft bricht mit konkreter Fehlermeldung ab');
  assertEqual(unknownResult.game, null, 'kein Spiel bei unbekannter Mannschaft');

  const badUidEvent = { ...okEvent, uid: 'anders_63383' };
  assertTrue(buildGameFromEvent(badUidEvent, OPTS).errors.some((e) => e.includes('UID')), 'falsches UID-Präfix erzeugt Fehler');

  const badSummaryEvent = { ...okEvent, summary: 'kein erkennbares Format' };
  assertTrue(buildGameFromEvent(badSummaryEvent, OPTS).errors.some((e) => e.includes('SUMMARY')), 'unlesbares SUMMARY erzeugt Fehler');

  const badTzEvent = { ...okEvent, dtstartKey: 'DTSTART', dtstart: '20261011T100000Z' };
  assertTrue(buildGameFromEvent(badTzEvent, OPTS).errors.some((e) => e.includes('DTSTART')), 'UTC-DTSTART erzeugt Fehler statt stiller Umrechnung');
}

// ── H) buildGamesFromEvents: sammelt ALLE Fehler, bricht nicht beim ersten ──
console.log('== H) buildGamesFromEvents: sammelt alle Fehler in einem Lauf ==');
{
  const events = [
    { uid: 'sm_game_1', dtstartKey: 'DTSTART;TZID=Europe/Berlin', dtstart: '20261011T100000', summary: '1. Spieltag, Unbekannt A - VfB Ulm', location: 'Halle, Adresse' },
    { uid: 'kaputt', dtstartKey: 'DTSTART;TZID=Europe/Berlin', dtstart: '20261011T111000', summary: '1. Spieltag, SV Tübingen Sharks - TV Schriesheim', location: 'Halle, Adresse' },
    { uid: 'sm_game_3', dtstartKey: 'DTSTART;TZID=Europe/Berlin', dtstart: '20261011T122000', summary: '1. Spieltag, PTSV Freiburg - Sportvg Feuerbach Biber', location: 'Halle, Adresse' },
  ];
  const { games, errors } = buildGamesFromEvents(events, OPTS);
  assertEqual(games.length, 1, 'nur das fehlerfreie Event wird zu einem Spiel');
  assertEqual(errors.length, 2, 'beide Fehler (unbekanntes Team, falsches UID-Präfix) werden gesammelt, nicht nur der erste');
}

// ── I) selfCheckGames: doppelte IDs, Doppelbelegung, lückenhafte Spieltage ──
console.log('== I) selfCheckGames ==');
{
  const base = (overrides) => ({
    id: 1, date: '2026-10-11', start_time: '10:00',
    game_day: { game_day_number: 1, title: '1. Spieltag' },
    home_team_name: 'A', guest_team_name: 'B',
    ...overrides,
  });
  assertEqual(selfCheckGames([base({ id: 1 }), base({ id: 2, home_team_name: 'C', guest_team_name: 'D' })]), [], 'zwei saubere, verschiedene Spiele -> keine Fehler');

  const dup = selfCheckGames([base({ id: 1 }), base({ id: 1, home_team_name: 'C', guest_team_name: 'D' })]);
  assertTrue(dup.some((e) => e.includes('doppelt')), 'doppelte Spiel-ID wird erkannt');

  const doubleBooked = selfCheckGames([base({ id: 1, home_team_name: 'A', guest_team_name: 'B' }), base({ id: 2, home_team_name: 'A', guest_team_name: 'C' })]);
  assertTrue(doubleBooked.some((e) => e.includes('zweimal gleichzeitig')), 'Mannschaft zweimal zur selben Uhrzeit wird erkannt');

  const gap = selfCheckGames([
    base({ id: 1, game_day: { game_day_number: 1, title: '1. Spieltag' } }),
    base({ id: 2, home_team_name: 'C', guest_team_name: 'D', game_day: { game_day_number: 3, title: '3. Spieltag' } }),
  ]);
  assertTrue(gap.some((e) => e.includes('lückenlos')), 'Lücke in den Spieltagsnummern (1, 3 ohne 2) wird erkannt');
}

// ── J) compareAgainstExpected: meldet Abweichungen, gleicht nichts an ──────
console.log('== J) compareAgainstExpected ==');
{
  // 55 statt 56 Spiele -> mindestens eine Abweichung, exakter Text nicht relevant
  const incomplete = Array.from({ length: 55 }, (_, i) => ({
    id: 63383 + i, date: '2026-10-11', start_time: '10:00',
    game_day: { game_day_number: 1, title: '1. Spieltag' },
    home_team_name: 'VfB Ulm', guest_team_name: 'TV Schriesheim',
    arena_name: 'Hermann-Hepper-Turnhalle',
  }));
  const deviations = compareAgainstExpected(incomplete);
  assertTrue(deviations.some((d) => d.includes('Gesamtzahl Spiele')), 'abweichende Gesamtzahl wird als Abweichung gemeldet');
  assertTrue(deviations.length > 0, 'bei falscher Datenlage ist die Abweichungsliste nicht leer (nichts wird stillschweigend akzeptiert)');
}

// ── K) parseIcsCalendar: Ende-zu-Ende an synthetischem, vollständigem Kalender ──
console.log('== K) parseIcsCalendar: synthetischer Mini-Kalender (3 Spiele, 1 Spieltag) ==');
{
  const synthCalendar = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    vevent({ uid: 'sm_game_1', dtstartLine: 'DTSTART;TZID=Europe/Berlin:20261011T100000', summary: '1. Spieltag\\, DJK Giants Karlsruhe-Ost - Sportvg Feuerbach Rössle (Verbandsliga Baden-Württemberg\\, FVBW)', location: 'Hermann-Hepper-Turnhalle\\, Westbahnhofstraße 23\\, 72070 Tübingen' }),
    vevent({ uid: 'sm_game_2', dtstartLine: 'DTSTART;TZID=Europe/Berlin:20261011T111000', summary: '1. Spieltag\\, SV Tübingen Sharks - VfB Ulm', location: 'Hermann-Hepper-Turnhalle\\, Westbahnhofstraße 23\\, 72070 Tübingen' }),
    'END:VCALENDAR',
  ].join('\r\n');
  const result = parseIcsCalendar(synthCalendar);
  assertEqual(result.parseErrors, [], 'synthetischer Kalender parst ohne Fehler');
  assertEqual(result.selfCheckErrors, [], 'synthetischer Kalender besteht die Eigenprüfungen');
  assertEqual(result.games.length, 2, 'beide Spiele werden übernommen');
  assertTrue(result.deviations.length > 0, 'ein 2-Spiele-Kalender weicht erwartungsgemäß von den 56/9/8/14-Prüfsummen ab (wird gemeldet, nicht verschwiegen)');
}

console.log('');
if (failures > 0) {
  console.log(`${failures} Test(s) fehlgeschlagen.`);
  process.exitCode = 1;
} else {
  console.log('Alle Tests erfolgreich.');
}

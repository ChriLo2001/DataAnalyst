// P0a.5 — reine, read-only Ableitung von matchdays[] aus den bestehenden
// season-data-Rohdaten (Liga-Analytics-Spezifikation, Abschnitt 3.6.3).
//
// buildMatchdays(seasonData) mutiert weder seasonData noch dessen games[]
// (jede Rückgabe entsteht ausschließlich über neue Arrays/Objekte bzw. über
// unveränderte Referenzen auf die ursprünglichen Game-Objekte — es werden
// keine Felder an den Game-Objekten geschrieben). Deterministisch: gleiche
// Eingabe erzeugt byte-identische Ausgabe, unabhängig von der Reihenfolge
// der Eingabe-games[].
//
// ── Gruppierungsfeld (anhand echter Daten geprüft, nicht angenommen) ──────
// Geprüft wurden alle 5 vorhandenen season-data/<season>.json (Rohtext-Suche,
// nicht nur geparst):
// - `game_day_id` existiert als Feld überhaupt NUR in 25-26.json (dort auf
//   jedem der 60 Spiele vorhanden). In 21-22.json, 22-23.json, 23-24.json
//   und 24-25.json kommt der Schlüssel "game_day_id" kein einziges Mal im
//   Rohtext vor — das Feld ist dort schlicht nicht Teil der Datenstruktur,
//   kein Sonderfall mit spezifischen Werten.
// - Selbst dort, wo `game_day_id` existiert (25-26.json), ist sie FEINER als
//   der eigentliche Spieltag: der laut `game_day.title` menschenlesbar als
//   "1. Spieltag" bezeichnete Termin zerfällt in zwei verschiedene
//   game_day_id-Werte über zwei Kalendertage (2025-10-04 und 2025-10-05).
//   game_day_id ist damit in keiner der 5 Saisons die korrekte, mit der
//   Spezifikation und der menschenlesbaren Bezeichnung übereinstimmende
//   Spieltag-Gruppierung.
// - `game_day.game_day_number` ist dagegen in ALLEN 5 Saisons konsistent die
//   korrekte, mit dem menschenlesbaren game_day.title ("1. Spieltag" usw.)
//   übereinstimmende Spieltag-Gruppierung — bestätigt durch 11/9/9/7/8
//   plausible Gruppen (statt 42/42/42/51/12 bei game_day_id).
// - game_day.game_day_number ist in 100% der 237 geprüften Spiele über alle
//   5 Saisons vorhanden (keine fehlenden Werte in der Praxis) — der in der
//   Spezifikation vorgesehene Fallback auf `date` greift daher nur
//   defensiv/synthetisch, nicht bei echten Daten.
// - Ein einzelner Spieltag kann real mehrere Kalendertage umfassen (z.B.
//   22/23 Spieltag 2: 2022-11-12 UND 2022-11-13; 24/25 Spieltag 2: sogar
//   2024-10-27 UND 2024-12-07 — beide Spiele dort haben KEIN notice_type
//   und sind ended:true, also keine Verschiebung, sondern von vornherein
//   auf zwei getrennte Termine verteilter Spieltag). `date` des Matchdays
//   ist deshalb bewusst das FRÜHESTE Datum der Gruppe (deterministisch,
//   keine erfundene "Haupt-Datum"-Semantik).
//
// ── `key` ────────────────────────────────────────────────────────────────
// Die Spezifikation legt kein exaktes String-Format für `key` fest. Gewählt:
// `${seasonKey}#${number}` (Fallback ohne game_day_number: `${seasonKey}#date:${date}`).
// Begründung: deterministisch, ohne Zeitstempel/Zufall, direkt aus
// seasonKey+number rekonstruierbar — passend zum in Abschnitt 6.8 der
// Spezifikation gezeigten Routing-Muster (`#/25-26/spieltage/7`), ohne der
// dortigen URL-Kodierung (P0a.8) vorzugreifen.
//
// ── `status` ───────────────────────────────────────────────────────────
// Ausschließlich aus dem vorhandenen rohen `game.ended`-Feld abgeleitet
// (spiegelt exakt den Spezifikationstext "beendet"):
//   - alle Spiele ended===true  -> "abgeschlossen"
//   - kein Spiel ended===true   -> "geplant"
//   - gemischt                  -> "unvollstaendig"
// Bewusst NICHT verwendet: classifyGameForStats()/countsForStats — das ist
// die bestehende STATISTIK-Relevanz-Logik (cancelled/postponed/played/...),
// eine andere Fragestellung als "ist dieser Termin ausgetragen". Die
// Spezifikation nennt für den Matchday-Status ausdrücklich nur "beendet".
// Konsequenz (bewusst dokumentiert, nicht stillschweigend anders gelöst):
// ein dauerhaft abgesagtes Spiel (notice_type "Canceled") hat ended:false
// und real GENAU DAS FÜR IMMER — ein Matchday mit einem solchen Spiel
// erreicht mit dieser Definition nie "abgeschlossen", sondern bleibt
// "unvollstaendig". Die Spezifikation definiert für "abgeschlossen" keine
// Ausnahme für abgesagte Spiele, daher wird hier keine erfunden.
// "verlegt" aus der Spezifikation wird NICHT implementiert: die realen
// Rohdaten enthalten für verschobene Spiele (notice_type "Postponed") kein
// Feld, das ein neues Zieldatum benennt — das Spiel bleibt unter seinem
// ursprünglichen date/game_day_number stehen. Eine Zuordnung "zum neuen
// Datum" wäre ohne ein solches Feld erfunden, nicht abgeleitet.
//
// ── `teamGames` ────────────────────────────────────────────────────────
// { [teamName]: gameId[] } — jede an mindestens einem Spiel dieses Matchdays
// beteiligte Mannschaft (Heim ODER Gast), Schlüssel = home_team_name bzw.
// guest_team_name, NUR mit trim() bereinigt (kein Aufruf der bestehenden
// normalizeTeamName()/isUlmTeamName() aus index.html — diese sind dort
// definiert und aus einem separaten .mjs-Modul nicht importierbar; ein
// erneuter Zeilen-Port hätte hier keinen fachlichen Mehrwert, weil
// innerhalb EINER Saison dieselbe Mannschaft real konsistent gleich
// geschrieben wird — geprüft: 0 Whitespace-/Schreibvarianten innerhalb
// aller 5 Saisons). Ulm-/SG-Erkennung bleibt bewusst Aufgabe des
// Aufrufers: `isUlmTeamName(teamKey)`/`detectUlmSide(game)` funktionieren
// unverändert auf den hier gelieferten, unveränderten Original-Teamnamen.

import { compareGamesChronologically } from './game-ordering.mjs';

export function buildMatchdays(seasonData) {
  const seasonKey = seasonData?.season ?? '';
  const games = Array.isArray(seasonData?.games) ? seasonData.games : [];

  const groups = new Map();
  for (const game of games) {
    const gameDayNumber = game?.game_day?.game_day_number;
    const hasNumber = gameDayNumber !== undefined && gameDayNumber !== null && gameDayNumber !== '';
    const groupKey = hasNumber ? `num:${gameDayNumber}` : `date:${String(game?.date ?? '')}`;
    if (!groups.has(groupKey)) groups.set(groupKey, []);
    groups.get(groupKey).push(game);
  }

  const matchdays = [];
  for (const groupGames of groups.values()) {
    const sortedGames = [...groupGames].sort(compareGamesChronologically);

    const rawNumber = sortedGames[0]?.game_day?.game_day_number;
    const number = rawNumber !== undefined && rawNumber !== null && rawNumber !== '' ? Number(rawNumber) : null;
    const date = String(sortedGames[0]?.date ?? '');

    const teamGames = {};
    for (const g of sortedGames) {
      for (const rawName of [g?.home_team_name, g?.guest_team_name]) {
        if (!rawName) continue;
        const teamKey = String(rawName).trim();
        if (!teamKey) continue;
        if (!teamGames[teamKey]) teamGames[teamKey] = [];
        teamGames[teamKey].push(g.id);
      }
    }

    const endedFlags = sortedGames.map((g) => g?.ended === true);
    const allEnded = endedFlags.length > 0 && endedFlags.every(Boolean);
    const noneEnded = endedFlags.every((f) => !f);
    const status = allEnded ? 'abgeschlossen' : noneEnded ? 'geplant' : 'unvollstaendig';

    matchdays.push({
      key: `${seasonKey}#${number !== null ? number : `date:${date}`}`,
      seasonKey,
      number,
      date,
      games: sortedGames,
      teamGames,
      status,
    });
  }

  matchdays.sort((a, b) => {
    if (a.number !== null && b.number !== null && a.number !== b.number) return a.number - b.number;
    return a.date < b.date ? -1 : a.date > b.date ? 1 : 0;
  });

  return matchdays;
}

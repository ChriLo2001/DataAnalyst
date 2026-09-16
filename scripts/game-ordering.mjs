// Reine, deterministische chronologische Vergleichsfunktion für Spiel-
// Objekte aus season-data/*.json (P0a.3 der Liga-Analytics-Spezifikation).
//
// Sortierreihenfolge (aufsteigend), jede Stufe nur als Tie-Breaker der
// vorherigen:
//   1. date          — String "YYYY-MM-DD" (ISO), lexikographisch korrekt sortierbar
//   2. start_time     — String "HH:MM" (24h, durchgängig zweistellig), lexikographisch korrekt sortierbar
//   3. game_number    — in den Rohdaten ein String, aber saisonweit fortlaufend
//                        über den einstelligen Bereich hinaus (siehe season-data/25-26.json:
//                        Werte 1..56) — MUSS deshalb numerisch verglichen werden,
//                        sonst sortiert z.B. "10" vor "2" (String-Vergleich).
//   4. id             — bereits numerisch (Number) in allen season-data/*.json
//
// Grundlage: alle 5 vorhandenen season-data/<season>.json (21/22, 22/23,
// 23/24, 24/25, 25/26) wurden vor der Implementierung geprüft. date,
// start_time und game_number sind in JEDEM der 197 geprüften Spiele
// lückenlos vorhanden und konsistent formatiert — keine erfundene Annahme,
// sondern verifizierter Ist-Zustand. Für den unwahrscheinlichen Fall
// fehlender/abweichender Werte (z.B. synthetische Testdaten) wird bewusst
// KEINE zusätzliche Fachsemantik erfunden: fehlende date/start_time werden
// als leerer String, fehlende/ungültige game_number/id als 0 behandelt
// (sortieren dadurch an den Anfang) — ein reines Sicherheitsnetz gegen
// Abstürze, keine Aussage über deren fachliche Bedeutung.
//
// Reine Funktion: liest ausschließlich die beiden Argumente, mutiert weder
// sie noch sonst irgendeinen Zustand.

export function compareGamesChronologically(a, b) {
  const dateA = String(a?.date ?? '');
  const dateB = String(b?.date ?? '');
  if (dateA !== dateB) return dateA < dateB ? -1 : 1;

  const startA = String(a?.start_time ?? '');
  const startB = String(b?.start_time ?? '');
  if (startA !== startB) return startA < startB ? -1 : 1;

  const numA = Number(a?.game_number) || 0;
  const numB = Number(b?.game_number) || 0;
  if (numA !== numB) return numA - numB;

  const idA = Number(a?.id) || 0;
  const idB = Number(b?.id) || 0;
  return idA - idB;
}

// P0a.4 — Reine Zeitpunkt-Filterfunktion: "liegt dieses Spiel bei/vor asOf?"
//
// WICHTIG, Unterschied zu compareGamesChronologically(): asOf ist ein reiner
// Zeitpunkt-Cutoff (kein vollständiges Spiel mit game_number/id), deshalb
// KEIN einfacher compareGamesChronologically(game, asOf)-Aufruf — das würde
// bei identischem date+start_time fälschlich ausschließen, weil asOf keine
// game_number/id besitzt und dadurch als "früher" gälte (siehe P0a.4-Test 5:
// asOf exakt auf einem Spielzeitpunkt MUSS dieses Spiel einschließen).
//
// asOf-Form (bewusst minimal, nur die zwei Felder, die diese Funktion
// tatsächlich braucht — NICHT die {seasonKey,date}-Hülle aus Abschnitt 3.6.2
// der Spezifikation, die ist Sache der P0a.7-Verdrahtung):
//   { date: "YYYY-MM-DD", startTime?: "HH:MM" }
// - date (Pflicht, falls asOf überhaupt gesetzt ist): Tagesgrenze, INKLUSIVE.
// - startTime (optional): zusätzliche Uhrzeitgrenze INNERHALB von date,
//   INKLUSIVE. Fehlt startTime, zählt der gesamte Tag von date.
// asOf === null/undefined bzw. asOf.date leer => keine Einschränkung (exakt
// bisheriges Verhalten, siehe P0a.4-Test 1).
//
// Fehlende game.date/game.start_time werden — konsistent mit
// compareGamesChronologically() — als leerer String behandelt (sortiert vor
// jedem echten Datum, wird also eingeschlossen). Keine erfundene Zusatzsemantik.
export function isGameAtOrBeforeAsOf(game, asOf) {
  const asOfDate = String(asOf?.date ?? '');
  if (!asOfDate) return true;

  const gameDate = String(game?.date ?? '');
  if (gameDate !== asOfDate) return gameDate < asOfDate;

  const hasAsOfTime = asOf?.startTime !== undefined && asOf?.startTime !== null && asOf?.startTime !== '';
  if (!hasAsOfTime) return true;

  const gameTime = String(game?.start_time ?? '');
  const asOfTime = String(asOf.startTime);
  return gameTime <= asOfTime;
}

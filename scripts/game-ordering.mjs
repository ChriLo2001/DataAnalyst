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

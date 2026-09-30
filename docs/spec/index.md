# Spezifikation: Liga-Analytics-Layer für das VfB Ulm Analytics Center

**Status:** Entwurf zur Umsetzung
**Ablage im Repo:** `docs/spec/` (bis zum Token-Diät-Umbau: `docs/liga-analytics-spezifikation.md`, eine einzelne ~108-KB-Datei)
**Zielgruppe:** Umsetzung mit Claude Code

Dieses Dokument war ursprünglich eine einzelne Datei. Sie wurde ohne inhaltliche Änderung in die Dateien unten aufgeteilt, damit ein Phasenauftrag nur noch die Abschnitte lesen muss, die er tatsächlich braucht. **Bestehende Abschnittsnummern (z. B. „Abschnitt 6.3“, „Entscheidung 10“) sind in den Zieldateien unverändert erhalten** — die Tabelle unten löst sie auf Dateien auf.

## 4. Module

> Die Module M0–M10 selbst liegen als eigene Dateien in [module/](module/) (siehe Zuordnungstabelle unten). Dieser Abschnitt enthält nur die ursprüngliche Einleitung von Abschnitt 4.

Jedes Modul ist beschrieben mit **Ziel**, **Methode**, **Output**, **UI** und **Akzeptanzkriterien**.

(Der zugehörige „Hinweis zu den UI-Abschnitten“ steht, wie im Original, direkt vor dem ersten Modul: [module/M0.md](module/M0.md).)

## Inhaltsverzeichnis

| Datei | Inhalt |
|---|---|
| [00-grundlagen.md](00-grundlagen.md) | Kontext und Ziel · Leitprinzipien · Datenbasis und bekannte Befunde |
| [05-datenqualitaet.md](05-datenqualitaet.md) | Datenqualitäts-Korrekturen im bestehenden Dashboard |
| [10-architektur.md](10-architektur.md) | Architektur (neue Dateien, CLI, Reproduzierbarkeit) · Zeitachse und Spieltag-Zyklus |
| [20-ui.md](20-ui.md) | Benutzeroberfläche und Informationsarchitektur |
| [30-statistik.md](30-statistik.md) | Statistische Leitlinien |
| [40-phasen.md](40-phasen.md) | Umsetzungsphasen · Nicht-Ziele |
| [50-entscheidungen.md](50-entscheidungen.md) | Entscheidungstabelle (1–14) |
| [90-anhang-methoden.md](90-anhang-methoden.md) | Anhang A: Methoden aus anderen Sportarten (Ideen-Backlog) |
| [module/M0.md](module/M0.md) | M0 · Datenaufbereitung |
| [module/M0b.md](module/M0b.md) | M0b · Spielplan-Import für die neue Saison |
| [module/M1.md](module/M1.md) | M1 · Teamstärke-Modell |
| [module/M1v.md](module/M1v.md) | M1v · Team-Nachfolge und Vererbung |
| [module/M2.md](module/M2.md) | M2 · Torschützen-Qualität |
| [module/M3.md](module/M3.md) | M3 · Goalie-Bewertung |
| [module/M4.md](module/M4.md) | M4 · Müdigkeit und Belastung |
| [module/M5.md](module/M5.md) | M5 · Spielereffekt (Plus-Minus) |
| [module/M6.md](module/M6.md) | M6 · Siegwahrscheinlichkeit und WPA |
| [module/M7.md](module/M7.md) | M7 · Erweiterte Gegneranalyse |
| [module/M8.md](module/M8.md) | M8 · Auffälligkeiten-Feed |
| [module/M9.md](module/M9.md) | M9 · Backtesting und Modellgüte |
| [module/M10.md](module/M10.md) | M10 · Psychologie im Spiel (eigene Phase P9a/P9b) |

## Zuordnungstabelle: alte Abschnittsnummer → Datei

| Alte Abschnittsnummer | Titel | Datei |
|---|---|---|
| (Kopf) | Titel, Status, Ablage, Zielgruppe | index.md (diese Datei) |
| 0 | Kontext und Ziel | [00-grundlagen.md](00-grundlagen.md) |
| 1 | Leitprinzipien (verbindlich) | [00-grundlagen.md](00-grundlagen.md) |
| 2, 2.1–2.3 | Datenbasis und bekannte Befunde | [00-grundlagen.md](00-grundlagen.md) |
| 3, 3.1–3.5 | Architektur | [10-architektur.md](10-architektur.md) |
| 3.6, 3.6.1–3.6.7 | Zeitachse und Spieltag-Zyklus | [10-architektur.md](10-architektur.md) |
| 4 (Einleitung) | „Module“ — Ziel/Methode/Output/UI/Akzeptanzkriterien-Schema, UI-Hinweis | index.md (diese Datei, Abschnitt „Modul-Übersicht“) |
| 4 → M0 | Datenaufbereitung | [module/M0.md](module/M0.md) |
| 4 → M1 | Teamstärke-Modell | [module/M1.md](module/M1.md) |
| 4 → M1v | Team-Nachfolge und Vererbung | [module/M1v.md](module/M1v.md) |
| 4 → M0b | Spielplan-Import für die neue Saison | [module/M0b.md](module/M0b.md) |
| 4 → M2 | Torschützen-Qualität | [module/M2.md](module/M2.md) |
| 4 → M3 | Goalie-Bewertung | [module/M3.md](module/M3.md) |
| 4 → M4 | Müdigkeit und Belastung | [module/M4.md](module/M4.md) |
| 4 → M5 | Spielereffekt (Plus-Minus) | [module/M5.md](module/M5.md) |
| 4 → M6 | Siegwahrscheinlichkeit und WPA | [module/M6.md](module/M6.md) |
| 4 → M7 | Erweiterte Gegneranalyse | [module/M7.md](module/M7.md) |
| 4 → M8 | Auffälligkeiten-Feed | [module/M8.md](module/M8.md) |
| 4 → M9 | Backtesting und Modellgüte | [module/M9.md](module/M9.md) |
| 4 → M10, M10.1–M10.12 | Psychologie im Spiel | [module/M10.md](module/M10.md) |
| 5 | Datenqualitäts-Korrekturen im bestehenden Dashboard | [05-datenqualitaet.md](05-datenqualitaet.md) |
| 6, 6.1–6.11 | Benutzeroberfläche und Informationsarchitektur | [20-ui.md](20-ui.md) |
| 7 | Statistische Leitlinien | [30-statistik.md](30-statistik.md) |
| 8 | Umsetzungsphasen | [40-phasen.md](40-phasen.md) |
| 9 | Nicht-Ziele | [40-phasen.md](40-phasen.md) |
| 10 | Entscheidungen | [50-entscheidungen.md](50-entscheidungen.md) |
| Anhang A, A.1–A.7 | Methoden aus Eishockey, Basketball, Fußball und Baseball | [90-anhang-methoden.md](90-anhang-methoden.md) |

**Hinweis zu Abschnitt 5:** Die ursprüngliche Auftragsliste für diesen Split nannte keine eigene Datei für Abschnitt 5 (Datenqualitäts-Korrekturen). Er liegt inhaltlich zwischen den Modulen und der UI und bekam `05-datenqualitaet.md`, passend zur `00`/`10`/`20`/…-Nummerierung der übrigen Dateien.

## Lesehinweis: welche Dateien braucht eine Phase?

Jede Phase braucht zusätzlich immer [00-grundlagen.md](00-grundlagen.md) (Leitprinzipien) und die für sie einschlägigen Zeilen aus [50-entscheidungen.md](50-entscheidungen.md) — das ist unten nicht wiederholt.

| Phase | Zusätzlich lesen |
|---|---|
| P0a | [10-architektur.md](10-architektur.md) (Abschnitt 3.6) |
| P0b | [20-ui.md](20-ui.md) |
| P0c | [10-architektur.md](10-architektur.md) (3.6.5, 3.6.6) |
| P1 | [module/M0.md](module/M0.md), [05-datenqualitaet.md](05-datenqualitaet.md), [30-statistik.md](30-statistik.md) |
| P1b | [module/M0b.md](module/M0b.md) |
| P2 | [module/M1.md](module/M1.md), [module/M9.md](module/M9.md) |
| P2v | [module/M1v.md](module/M1v.md) |
| P3 | [module/M2.md](module/M2.md), [module/M3.md](module/M3.md) |
| P4 | [module/M4.md](module/M4.md) |
| P5 | [module/M5.md](module/M5.md) |
| P6 | [module/M6.md](module/M6.md) |
| P7 | [module/M7.md](module/M7.md) |
| P8 | [module/M8.md](module/M8.md) |
| P9a/P9b | [module/M10.md](module/M10.md) |
| P10 | [20-ui.md](20-ui.md), [40-phasen.md](40-phasen.md) |

Die vollständige Phasentabelle mit Definition of Done steht in [40-phasen.md](40-phasen.md).

## Zugehörige Dokumente außerhalb dieses Ordners

- [docs/social-video-spezifikation.md](../social-video-spezifikation.md) — eigenständige Spezifikation für die Social-Media-Vorschauvideos (S1–S4), nicht Teil dieses Splits.
- [docs/index-map.md](../index-map.md) — Code-Karte für `index.html` (Funktionen, CSS-Blöcke, Zeilenbereiche).
- [CLAUDE.md](../../CLAUDE.md) — Leseregeln und Schutzregeln fürs Projekt insgesamt.

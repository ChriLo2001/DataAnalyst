# Umsetzungsphasen und Nicht-Ziele

> Teil von [docs/spec/index.md](index.md). Enthält Abschnitt 8 (Umsetzungsphasen) und Abschnitt 9 (Nicht-Ziele) der ursprünglichen Spezifikation.

---

## 8. Umsetzungsphasen

Jede Phase endet mit grünen Tests, Einordnung aller neuen Inhalte gemäß Abschnitt 6.3.2, aktualisierter `docs/league-model.md`, Build-Bericht und manuellem Review im Browser.

| Phase | Inhalt | Definition of Done |
|---|---|---|
| **P0a** | Fundament Zeitachse (3.6): `writeJsonAtomic`-Export reparieren, Spiel-Ordnung, `asOf` + Fortschreibung, Spieltag-Struktur, Cache-Schlüssel mit `asOf`, Hash-Routing (6.8) | Invarianten aus 3.6.2 grün, bestehende Ansichten unverändert, Links auf Seiten funktionieren |
| **P0b** | Informationsarchitektur und Komponenten (Abschnitt 6): `docs/ui-inventar.md`, Kontextleiste, 5-Punkte-Navigation, Seitenvorlage, Komponentenbibliothek, Übersicht (zunächst mit vorhandenen Inhalten), Spieltagsseite (zunächst mit vorhandenen Inhalten), Aufgabentest „vorher“ | Inventar vollständig, Akzeptanzkriterien 6.11 (ohne Modulinhalte) erfüllt |
| **P0c** | Vorschau-Modus und Spieltag-Befehl (3.6.5, 3.6.6) gemäß Entscheidung 10 | Autosave, zusammengeführte Sicht, `spieltag.mjs` mit Dry-Run; Invariante „leerer Entwurf = importierter Zustand“ grün |
| **P1** | M0 Datenaufbereitung, Abschnitt 5 (Datenqualität), `stats.mjs`-Grundlagen, CLI-Gerüst, `manifest.json` | Bericht über alle Saisons, Befunde aus 2.2 verifiziert, Eigentor-Korrektur mit Diff |
| **P1b** | M0b Spielplan-Import (Weg B, und Weg A sobald der Key vorliegt) | vorläufiger Spielplan sichtbar und als vorläufig gekennzeichnet, für Modelle gesperrt |
| **P2** | M1 Teamstärke + M9 Backtest | Walk-forward schlägt Baseline, Matchcenter zeigt Ergebniswahrscheinlichkeiten |
| **P2v** | M1v Team-Nachfolge und Vererbung | `data/team-lineage.json`, Übergangsgewicht getestet, Kennzeichnung im UI |
| **P3** | M2 Schützenqualität + M3 Goalie-Bewertung | Goalie-Seite und ligaweite Goalie-Rangliste mit Intervallen |
| **P4** | M4 Müdigkeit | Müdigkeitsprofile für Teams und Spieler, Hinweis im Matchcenter |
| **P5** | M5 Spielereffekte (Stufe 1, dann Stufe 2) | Spielerprofil-Karte, Gegner-Schlüsselspieler im Matchcenter |
| **P6** | M6 Siegwahrscheinlichkeit/WPA | Kurve pro Spiel, WPA im Spielerprofil, Kalibrierung im Bericht |
| **P7** | M7 Gegneranalyse-Bausteine | neue Matchcenter-Abschnitte, Speisung der bestehenden Hinweise |
| **P8** | M8 Auffälligkeiten-Feed | Karte auf der Übersicht und der Spieltagsseite |
| **P9a** | M10 Präregistrierung, Zeitscheiben, Artefakt-Behandlung, Simulationstests, Teststärke auf Explorationssaisons | `docs/m10-hypothesen.md` committet, alle synthetischen Akzeptanztests grün, Status konfirmatorisch/explorativ festgelegt |
| **P9b** | M10 Bestätigung auf Hold-out-Saisons, finale Schätzung, Psychologie-Labor, Team-Profile | Urteile pro Hypothese, Forest-Plot, Einbindung in Matchcenter/Coach-Report gemäß M10.8 |
| **P10** | Abschluss UI: Aufgabentest „nachher“, Entfernen verbliebener Legacy-Funktionen, Performance-Ziele (3.6.7) | keine Aufgabe schlechter als vorher, Ziel „interaktiv < 2 s“ erreicht |

Innerhalb einer Phase klein committen. Keine Phase verändert bestehende Kennzahlen ohne dokumentierten Vorher/nachher-Vergleich.

*(Welche Modul-Datei zu M0/M0b/M1/M1v/M2… gehört, steht in der Zuordnungstabelle in [index.md](index.md).)*

---

## 9. Nicht-Ziele

- Keine neuen manuellen Eingaben (Schüsse, Einsatzzeiten, Strichlisten).
- Keine Save-%, xG, Corsi/Fenwick oder andere schussbasierte Kennzahlen.
- Keine Abfrage von `saisonmanager.de` (kein API-Key vorhanden).
- Keine öffentliche Fan-Ansicht in dieser Spezifikation.
- Kein fachlicher Umbau des Einsatz-Centers (Datenmodell, Importer, Validierung bleiben); erlaubt sind Autosave (Entscheidung 10) und die Einbettung in die Spieltagsseite.
- Kein zweiter „Einfach“- oder „Experten“-Modus (siehe 6.2).
- Keine GitHub-Actions-Automatisierung des Modell-Builds in dieser Phase.

---

**Weiter:** [50-entscheidungen.md](50-entscheidungen.md) · **Zurück:** [30-statistik.md](30-statistik.md)

# Entscheidungen

> Teil von [docs/spec/index.md](index.md). Enthält Abschnitt 10 der ursprünglichen Spezifikation.

---

## 10. Entscheidungen

Stand: Empfehlungen übernommen am 16.09.2026 (Entscheidungen 1–12). **Verbindlich** heißt: so umsetzen. **Verschoben** heißt: das Feature bleibt bis zur Entscheidung ausgeblendet bzw. im genannten Default.

| # | Thema | Entscheidung | Status | Fällig |
|---|---|---|---|---|
| 1 | `file://`-Fallback für Modelldaten | **Nur unter HTTP.** Kein Einbetten in die `index.html`. Unter `file://` zeigen neue Bereiche einen Hinweis. Umstellung auf Einbetten später möglich. | verbindlich | P2 |
| 2 | Zuordnung `hosting_club` → Team | **Claude Code legt `data/club-aliases.json` an**, Chris prüft sie einmalig. Nicht zuordenbare Vereine listet der Build-Bericht. | verbindlich | P2 |
| 3 | SG-Saisons Ulm-Tübingen | **Bestehende Dashboard-Logik übernehmen.** Spielereffekte rechnen ohnehin über `player_id`. | verbindlich | P5 |
| 4 | Hallenkoordinaten (`data/arenas.json`) | **Verschoben.** Anreise-Analyse in M4 bleibt ausgeblendet. Wieder aufgreifen, wenn die übrigen M4-Ergebnisse vorliegen. | verschoben | nach P4 |
| 5 | Halbwertszeit der Zeitgewichtung | **Per Walk-forward-Backtest (M9) bestimmen**, Startwert eine Saison. Gewählter Wert wird im Build-Bericht und in `docs/league-model.md` dokumentiert. | verbindlich | P2 |
| 6 | Remis-Gewichtung in WPA | **0,5.** | verbindlich | P6 |
| 7 | M10 Hold-out-Split | **Vorläufig:** Exploration 21/22 und 25/26, Bestätigung 22/23–24/25. Grund: 25/26 wurde bereits für Müdigkeit, Kadergröße, First Goal Against Effect und Deficit Resilience ausgewertet. **Endgültig festlegen nach P1**, wenn feststeht, dass die älteren Saisons vergleichbar vollständig sind (Spiele mit Events, Kader, Zeitformat). Bis zur Fixierung in `docs/m10-hypothesen.md` keine M10-artigen Analysen auf 22/23–24/25. | vorläufig | nach P1, vor P9a |
| 8 | M10 Hauptvariante | **Scheiben 60 s, Fenster 120 s, Bully-Totzeit 20 s, letzte 2 Minuten ausgeschlossen.** Die Variante mit den letzten 2 Minuten läuft als Robustheitsprüfung mit. | verbindlich (in Präregistrierung übernehmen) | P9a |
| 9 | Zugriff auf Psychologie-Labor und spielerbezogene M10-Werte | **Verschoben.** Bis zur Entscheidung werden in M10 **nur Liga- und Team-Ergebnisse** angezeigt; spielerbezogene M10-Werte (z. B. H8 Hot Hand) werden berechnet, aber nicht im UI dargestellt. Hinweis: Das Portal liegt vermutlich öffentlich auf GitHub Pages; echter Zugriffsschutz erfordert anderes Hosting oder ein privates Repository. Mit den Trainern klären. | verschoben | vor P9b |
| 10 | Browser-Speicher (`localStorage`/IndexedDB) | **Erlaubt** für (a) Autosave des Einsatz-Center-Entwurfs mit `baseHash`, (b) Komfort: zuletzt gesehener Datenstand, zuletzt geöffnete Ansicht. Nie als Quelle der Wahrheit; alle Zugriffe in `try/catch`; App funktioniert vollständig ohne. Hebt die bisherige Regel „kein localStorage“ im Einsatz-Center auf. | verbindlich | P0c |
| 11 | Cover-Seite | Übersicht wird Startseite; das Cover bleibt als optionaler Intro-Screen beim allerersten Besuch bzw. über das Werkzeugmenü erreichbar. | verbindlich | P0b |
| 12 | Hauptnavigation | **5 Punkte** gemäß 6.3 (Übersicht, Spieltage, Team, Liga & Gegner, Labor); Matchcenter, Lineup Builder und Einsatz-Center unter „Spieltage“. | verbindlich | P0b |
| 13 | Vererbung bei neuen Teams | **Neue, fusionierte oder umbenannte Teams erben die Werte ihrer Vorgänger**, bis eigene belastbare Daten vorliegen (M1v, Übergangsgewicht `k = 6`). Zuordnung von Hand in `data/team-lineage.json`, niemals geraten. Geerbte Werte sind im UI immer gekennzeichnet. **Getrennte Reichweite:** für Berechnungen darf auch alte Vorgeschichte erben (`scope.models`), für Anzeige und Social Media nur die unmittelbar vorangehende Saison (`scope.display`). **Offen bleibt die konkrete Zuordnung je Team** — insbesondere, welche der beiden Feuerbach-Mannschaften („Biber", „Rössle") Nachfolgerin der bisherigen ersten bzw. zweiten Mannschaft ist. | verbindlich (Regel), Zuordnung offen | vor P2 bzw. vor der ersten 26/27-Auswertung |
| 14 | Spielplan-Import | **Ziel: automatisch.** Dafür wird ein API-Key bei Floorball Deutschland angefragt (it@floorball.de) und der vorhandene Workflow wieder mit `schedule` aktiviert (M0b Weg A). Bis der Key da ist, gilt Weg B: ein halbautomatischer Import aus dem offiziellen Spielplan-Export, vorläufige Termine getrennt von `season-data` und für Modelle gesperrt. | verbindlich | Key-Anfrage sofort; Weg B vor dem ersten 26/27-Spieltag |

---

**Weiter:** [90-anhang-methoden.md](90-anhang-methoden.md) · **Zurück:** [40-phasen.md](40-phasen.md)

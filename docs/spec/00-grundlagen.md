# Grundlagen

> Teil von [docs/spec/index.md](index.md). Enthält Abschnitte 0–2 der ursprünglichen Spezifikation (Kontext, Leitprinzipien, Datenbasis und Befunde). Abschnittsnummern sind unverändert, damit bestehende Verweise wie „Abschnitt 1.3“ weiter stimmen.

---

## 0. Kontext und Ziel

Das Analytics Center (`index.html`) wertet heute vor allem **Spiele mit VfB-Ulm-Beteiligung** aus. Die Saisondateien in `season-data/*.json` enthalten aber **alle Spiele der Liga**: in 25/26 sind es 60 Spiele, 56 davon beendet und mit Events. Nur 14 davon sind Ulmer Spiele.

Das Portal soll sich zu einem **internen Analyse- und Statistikportal** entwickeln. Dafür soll es:

1. **alle Ligaspiele aller Saisons** als Datenbasis nutzen,
2. daraus **statistisch belastbare Ableitungen** berechnen (Teamstärke, Spielereffekte, Goalie-Bewertung, Müdigkeit, Siegwahrscheinlichkeit),
3. die **Goalie-Analyse** auf das Niveau der Feldspieler-Analyse heben,
4. die **Gegneranalyse** deutlich ausbauen,
5. dabei **keinerlei zusätzliche manuelle Eingaben am Spieltag** erfordern.

---

## 1. Leitprinzipien (verbindlich)

1. **Keine neuen manuellen Eingaben.** Alle Features basieren ausschließlich auf den bestehenden Rohdaten in `season-data/*.json`. Keine Strichlisten, keine Schusszahlen, keine Pflichtfelder im Einsatz-Center.
   - Einzige erlaubte Ausnahme: **einmalig gepflegte Stammdaten**, die nicht am Spieltag anfallen (z. B. Hallenkoordinaten), und nur für optionale Features.
2. **Automatisch nach dem Import.** Die Modelle werden per Skript aus den Saisondaten berechnet. Ablauf: Rohdaten importieren → Modellskript starten → fertig.
3. **Berechnung außerhalb der `index.html`.** Neue Modelle werden in Node-Modulen berechnet und als fertige JSON-Dateien abgelegt. Das Dashboard liest nur noch Ergebnisse ein. Die `index.html` (aktuell ca. 3,8 MB) soll dadurch nicht weiter wachsen.
4. **Konventionen der bestehenden Skripte übernehmen** (siehe `docs/season-data-import.md`, `docs/lineup-data-import.md`):
   - reine, exportierte Funktionen ohne Dateisystemzugriff für die Kernlogik,
   - Dry-Run als Standard, Schreiben nur mit `--write`,
   - atomisches Schreiben (Temp-Datei + `rename`),
   - kein Netzwerkzugriff, kein API-Key, kein Auto-Commit, kein Auto-Push,
   - Tests als `scripts/test-*.mjs` ohne externe Test-Frameworks.
5. **Deterministisch.** Gleiche Eingabedaten ergeben byte-identische Ausgaben. Zufallsverfahren (z. B. Bootstrap, Simulation) nutzen einen festen Seed.
6. **Statistische Ehrlichkeit.** Jede angezeigte Kennzahl hat eine Stichprobengröße (`n`) und, wo sinnvoll, ein Unsicherheitsintervall. Kleine Stichproben werden geschrumpft und im UI als unsicher markiert (Details in Abschnitt 7).
7. **`file://`-Fallback nicht brechen.** Das Dashboard muss ohne Modelldaten weiter vollständig funktionieren. Fehlen die Modelldateien, zeigen neue Bereiche einen verständlichen Hinweis statt eines Fehlers.
8. **UI-Sprache Deutsch**, Begriffe konsistent mit dem bestehenden Lexikon (`rLexiconPage`). Neue Kennzahlen bekommen einen Lexikoneintrag.
9. **Zeitachse von Anfang an.** Jede Kennzahl ist für jeden Spieltag abrufbar (`asOf`, Abschnitt 3.6). Es gibt keine Analyse, die nur „Saison gesamt“ kann.
10. **Übersicht vor Vollständigkeit.** Neue Inhalte werden in die Informationsarchitektur aus Abschnitt 6 eingeordnet. Keine neue Hauptnavigation, keine Karte ohne klare Frage, die sie beantwortet. Im Zweifel eine Ebene tiefer statt eine Karte mehr.

---

## 2. Datenbasis und bekannte Befunde

### 2.1 Relevante Felder pro Spiel (`games[]`)

| Feld | Nutzung |
|---|---|
| `id`, `date`, `start_time`, `game_day` | Identität, Reihenfolge am Spieltag |
| `home_team_name/_id`, `guest_team_name/_id` | Teams |
| `result.home_goals`, `result.guest_goals`, `result.overtime`, `result.forfait` | Ergebnis |
| `events[]` | Tore (`goal`), Strafen (`penalty`), Timeouts (`timeout`) mit `period`, `time`, `event_team`, `number`, `assist`, Spielstand |
| `events[].goal_type` | `regular`, `penalty_shot`, `owngoal` |
| `events[].penalty_type`, `penalty_reason_string` | Strafart und -grund |
| `players.home/guest[]` | Kader mit `player_id`, `trikot_number`, `goalkeeper`, `captain` |
| `hosting_club`, `arena_name`, `arena_address` | Ausrichter und Halle |
| `audience` | Zuschauer (teilweise gefüllt) |
| `notice_type` | z. B. `Postponed` |

In der Kleinfeld-Verbandsliga **nicht gepflegt** (leer oder Platzhalter): `referees`, `home_coaches`/`guest_coaches`, `awards` (MVP), `starting_players`, `live_stream_link`, `vod_link`. **Darauf nichts aufbauen.**

### 2.2 Geprüfte Befunde aus 25/26

Die folgenden Befunde stammen aus einer Prüfung von `season-data/25-26.json`. Für die anderen Saisons sind sie **vor der Umsetzung zu verifizieren** (siehe M0-Akzeptanzkriterien).

- **Turnierformat:** Jedes Team spielt an jedem Spieltag **genau 2 Spiele** (56 von 56 Team-Spieltagen).
- **Zwei Halbzeiten** (`period` 1 und 2) von je 20 Minuten. In 25/26 keine Verlängerungen, 2 Unentschieden.
- **Uneinheitliches Zeitformat:** In **7 Spielen** ist die Zeit in Halbzeit 2 kumuliert (bis `40:00`) statt pro Halbzeit (bis `20:00`). Muss pro Spiel erkannt und normalisiert werden.
- **Torschützen-Zuordnung:** 856 von 860 Toren lassen sich über `event_team` + `number` eindeutig einem Kaderspieler zuordnen.
- **Assists:** `assist` ist eine einzelne Trikotnummer (keine Zweit-Assists). 611 von 860 Toren haben einen Assist. Werte ohne Assist sind zu prüfen (vermutlich `0`).
- **Torarten:** 850 `regular`, 6 `penalty_shot`, 4 `owngoal`. Das Dashboard wertet `goal_type` derzeit praktisch nicht aus.
- **Timeouts:** 36 Timeout-Events, im Dashboard bisher ungenutzt.
- **Goalies:** Pro Team-Spiel 1 Goalie im Kader (105×) oder 2 Goalies (7×). Bei 2 Goalies ist nicht bekannt, wer wann gespielt hat.
- **VfB Ulm 25/26:** 14 Spiele, 4 verschiedene Goalies, 5 bis 10 Feldspieler pro Spiel. Drei Feldspieler waren in allen 14 Spielen dabei (für sie gibt es innerhalb der Saison keine „ohne“-Spiele).
- **Kadergröße (ligaweit):** ≤6 Feldspieler: Ø Tordifferenz −5,1 (n = 31); 7–8: +1,4 (n = 41); 9+: +2,5 (n = 40). **Konfundiert mit Teamstärke.**
- **Müdigkeitssignal (ligaweit, Tore pro Team):**
  - 1. Spiel des Tages: HZ1 3,38 / HZ2 4,45
  - 2. Spiel des Tages: HZ1 3,62 / HZ2 3,91
- **Ausrichter:** `hosting_club` ist immer gesetzt. Ob der Ausrichter ein Spiel bestreitet, ist pro Spiel ableitbar. Grundlage für den Test auf einen Ausrichter-Vorteil.

### 2.3 Bereits vorhandene Logik, die wiederverwendet werden soll

Nicht neu erfinden, sondern prüfen und wo möglich in Module auslagern:

- Team-Namens-Normalisierung und SG-Logik: `normalizeTeamName`, `isUlmTeamName`, `detectUlmSide`, `normalizeOpponentNameForAllTime`, `getCanonicalTeamName`
- Spieler-Identität: `buildPlayerIdentity`, `registerPlayerIdentity`, `getPlayerSourceId`, `resolveGoalScorerPlayer`, `resolveAssistPlayer`
- Zeit: `parseGameClock`, `goalieEventAbsSeconds`, `getPhaseKey`
- Special Teams: `buildSpecialTeamsForGame`, `buildSpecialTeamsForSeason`
- Goalies: `buildGoalieGameRecord`, `buildGoalieStatsForSeason`, `buildGoalieAnalysisModel`
- Spieltag: `getFurtherSameDayUlmGames`
- Matchcenter: `matchcenterBuildOpponentDNA`, `matchcenterBuildOpponentScouting`, `buildMatchIntelligence`
- Confidence: `buildConfidence`, `rosterImpactConfidence`

Wenn eine Funktion aus der `index.html` in ein Modul ausgelagert wird, muss das Verhalten im Dashboard **unverändert** bleiben (Regressionstest oder Vergleich vorher/nachher).

---

**Weiter:** [10-architektur.md](10-architektur.md)

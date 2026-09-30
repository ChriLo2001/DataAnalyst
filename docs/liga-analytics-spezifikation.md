# Spezifikation: Liga-Analytics-Layer für das VfB Ulm Analytics Center

**Status:** Entwurf zur Umsetzung
**Ablage im Repo:** `docs/liga-analytics-spezifikation.md`
**Zielgruppe:** Umsetzung mit Claude Code

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

## 3. Architektur

### 3.1 Neue Dateien

```
scripts/
  build-league-model.mjs          # CLI: liest season-data, rechnet alle Module, schreibt model-data
  test-build-league-model.mjs
  model/
    normalize.mjs                 # M0 Datenaufbereitung
    team-strength.mjs             # M1
    shooter-quality.mjs           # M2
    goalie-rating.mjs             # M3
    fatigue.mjs                   # M4
    player-impact.mjs             # M5
    win-probability.mjs           # M6
    opponent-intel.mjs            # M7
    anomaly-feed.mjs              # M8
    backtest.mjs                  # M9
    psychology.mjs                # M10
    psychology-simulate.mjs       # M10: synthetische Ligen, Serien-Simulation, Teststärke
    stats.mjs                     # gemeinsame Statistik-Helfer (Shrinkage, Ridge, Poisson, Bootstrap, BH-Korrektur)
  test-model-*.mjs                # Tests pro Modul
model-data/
  manifest.json                   # Version, Build-Zeitpunkt der Daten (nicht Uhrzeit!), Hash der Eingaben, Module
  <season>.json                   # Ergebnisse pro Saison (z. B. 25-26.json)
  alltime.json                    # saisonübergreifende Modelle (M5, Spielerentwicklung)
docs/
  liga-analytics-spezifikation.md # dieses Dokument
  league-model.md                 # technische Doku der Modelle (während der Umsetzung pflegen)
```

Alle Module sind **ESM ohne externe Abhängigkeiten** (analog zu den bestehenden Skripten). Lineare Algebra für Ridge-Regression wird in `stats.mjs` selbst implementiert (Cholesky oder konjugierte Gradienten; die Dimensionen sind klein).

### 3.2 CLI

```bash
node scripts/build-league-model.mjs              # Dry-Run: rechnet alles, zeigt Bericht, schreibt nichts
node scripts/build-league-model.mjs --write      # schreibt model-data/ atomisch
node scripts/build-league-model.mjs --only M1,M3 # nur ausgewählte Module (für Entwicklung)
```

Der Bericht zeigt pro Modul: Anzahl verwendeter Spiele, Warnungen (z. B. nicht zuordenbare Torschützen), Kernergebnisse in Kurzform und Backtest-Kennzahlen (M9).

### 3.3 Reproduzierbarkeit

- `manifest.json` enthält `inputHash`: SHA-256 über die kanonisch serialisierten Saisondateien (vorhandenes `canonicalJson`-Muster aus `scripts/lineup-data-hash.mjs` wiederverwenden).
- Das Dashboard zeigt **„Modelle berechnet auf Datenstand …“**. Weicht der `inputHash` von den geladenen Saisondaten ab, erscheint der Hinweis „Modelldaten veraltet, bitte neu berechnen“.
- Kein Zeitstempel in den Ergebnisdateien (Determinismus). Der Datenstand ergibt sich aus dem letzten beendeten Spiel.

### 3.4 Einbindung ins Dashboard

- Laden per `fetch('model-data/…')`, analog zu `ensureExternalSeasonData()`.
- **`file://`-Fallback:** Modelldaten nur unter HTTP (Entscheidung 1, Abschnitt 10). Unter `file://` erscheint ein Hinweis in den neuen Bereichen.
- Neue Render-Funktionen folgen dem bestehenden Präfix-Muster (`r…`).

### 3.5 Workflow

Optional ein zweiter Schritt im bestehenden Import-Ablauf, der nach `import-season-data.mjs --write` ausgeführt wird. Kein GitHub-Actions-Automatismus in dieser Phase.

---

### 3.6 Zeitachse und Spieltag-Zyklus (Querschnitt für alle Module)

Die App wird heute vor allem nach Saisonende oder punktuell genutzt. Ziel ist eine App, die man **zwischen den Spieltagen** öffnet: direkt nach dem Spieltag zur Auswertung, unter der Woche für Entwicklungen, vor dem Spieltag zur Vorbereitung. Dafür werden Zeitachse und Spieltag zu Grundkonzepten. **Alle Module M0–M10 werden von Anfang an mit dieser Zeitachse gebaut.**

#### 3.6.1 Ausgangslage im Code

| Befund | Folge |
|---|---|
| `loadSeason` und `getRelevantSeasonGames` laden und rechnen immer die ganze Saison. Cache-Schlüssel (`analysisCacheKey`, `setState` → `cacheRelevant`) kennen nur die Saison. | Kein Stand zu einem Zeitpunkt, keine Verläufe, keine Veränderung seit dem letzten Spieltag. |
| `game_day` (`game_day_number`, `game_day_id`) wird nur als Sortier-Fallback genutzt. | Kein Spieltag-Konzept. |
| `EINSATZ_CENTER_DRAFT` liegt nur im Arbeitsspeicher (bewusst ohne `localStorage`). | Eingaben gehen beim Neuladen verloren. |
| Lineup-Auswertung erst nach Export → `import-lineup-data.mjs --write` → Commit → Push → Neuladen. | Keine Auswertung direkt nach dem Eintragen. |
| Keine URL-Navigation (`location.hash`/`pushState` werden nicht verwendet). | Keine teilbaren Links, Zurück-Button wirkungslos, nach Neuladen wieder Cover. |
| `scripts/import-season-data.mjs` importiert `writeJsonAtomic` aus `update-season-data.mjs`, das diese Funktion nicht exportiert (dokumentiert in `docs/lineup-data-import.md`). | Saison-Import scheitert unter Node vermutlich beim Laden – genau der Schritt nach jedem Spieltag. |

#### 3.6.2 Prinzip: Saison als geordnete Folge von Spielen

- Alle saisonbezogenen Kennzahlen werden als **Fortschreibung** implementiert: `zustand[n] = schritt(zustand[n−1], spiel[n])` (Reducer-Prinzip, „Event Sourcing light“). Spiele sind nach `date`, `start_time`, `game_number`, `id` geordnet.
- Jede Analysefunktion erhält einen Zeitparameter **`asOf`**: `{ seasonKey, matchday }` oder `{ seasonKey, date }`. Default: aktueller Stand.
- `asOf` wird an **einer zentralen Stelle** angewendet (Filter in `getRelevantSeasonGames` bzw. dessen Nachfolger) und ist **Teil jedes Cache-Schlüssels**.
- Modelle, die nicht fortschreibbar sind (Ridge, Poisson-Fits), werden im Build pro Spieltag vorberechnet (siehe 3.6.6).
- **Invarianten (Tests):**
  1. Stand nach dem letzten Spieltag = heutige Saisonwerte (byte- bzw. wertgleich).
  2. Summe der Spieltags-Veränderungen = Veränderung über die Saison.
  3. `asOf` vor dem ersten Spieltag = leere, gültige Zustände (keine Fehler, keine NaN).

#### 3.6.3 Spieltag als Einheit

- **Liga-Spieltag:** `game_day_id` bzw. `game_day_number` aus den Rohdaten. Fehlt das Feld, Gruppierung nach `date`.
- **Team-Spieltag:** alle Spiele eines Teams an einem Datum (im Kleinfeld-Turnierformat: 2 Spiele).
- **Status eines Team-Spieltags:** `geplant` (keine Spiele beendet), `unvollständig` (mind. ein, aber nicht alle Spiele beendet bzw. importiert), `abgeschlossen`, `verlegt` (Spiel mit `notice_type` wird dem neuen Datum zugeordnet, der ursprüngliche Spieltag gilt ohne dieses Spiel als abgeschlossen).
- Vergleiche mit dem Vorspieltag und „Veränderungen durch diesen Spieltag“ nur für `abgeschlossen`. Bei `unvollständig` klarer Hinweis.
- Neue Datenstruktur (im Browser berechnet, nicht als Datei): `matchdays[]` mit `{ key, seasonKey, number, date, games[], teamGames{teamKey: [gameIds]}, status }`.

#### 3.6.4 Spieltagsseite

Für jeden Ulmer Spieltag (und analog für jedes andere Team, reduziert):

1. **Kopf:** Datum, Halle, beide Ergebnisse, Punkte des Tages, Status.
2. **Kernaussage:** ein generierter Satz, z. B. „4 Punkte, +3 Tore über Erwartung – starkes 2. Spiel nach knapper Niederlage.“
3. **Bilanz:** Punkte und Tordifferenz gegenüber Erwartung (M1), Spiel 1 gegen Spiel 2 (M4).
4. **Spielberichte** beider Spiele als kompakte Karten mit Link zum vollständigen Spielbericht (Spielverlauf, Siegwahrscheinlichkeit M6, Tore und Strafen auf Zeitleiste).
5. **Spieler des Tages:** Spielnote pro Spieler für beide Spiele und den Tag (Game Score, Anhang A.3).
6. **Aufstellung:** eingetragenes Lineup mit Eingabe direkt auf der Seite (Einsatz-Center-Editor für die Spiele dieses Tages).
7. **Durch diesen Spieltag verändert:** Tabellenplatz, Power Ranking, Formkurve, erreichte Meilensteine, neue Auffälligkeiten (M8), jeweils als Delta zum Vorspieltag.

#### 3.6.5 Vorschau-Modus: sofort auswerten vor dem formalen Import

- **Autosave des Einsatz-Center-Entwurfs** in IndexedDB (Fallback `localStorage`), inklusive `baseHash` (Entscheidung 10). Beim Öffnen: „Ungespeicherter Entwurf vom … gefunden – fortsetzen / verwerfen“. Stimmt `baseHash` nicht mehr mit den geladenen Daten überein: Warnung, Entwurf bleibt lesbar, Export wie bisher, Import-Validierung entscheidet. 
- **Zusammengeführte Sicht:** Analysen lesen `importierte Daten ⊕ lokaler Entwurf`. Umsetzung als eine Funktion `getEffectiveLineupData(seasonKey)`; kein Analysecode greift direkt auf `LINEUP_DATA` zu. Alles aus dem Entwurf ist in der UI markiert („Entwurf – noch nicht importiert“), global schaltbar.
- **Spieldaten-Vorschau:** Rohdaten neuer Spiele (gleiches Format wie für `import-season-data.mjs`) per Datei oder Einfügen im Browser laden. Validierung mit denselben Validatoren (`season-data-validators.mjs` wird so geschrieben, dass es im Browser lauffähig ist). Die Spiele werden nur im Arbeitsspeicher bzw. im Entwurfsspeicher ergänzt und markiert.
- **Invariante:** Vorschau-Modus mit leerem Entwurf erzeugt exakt den importierten Zustand.
- Die bestehenden Schutzmechanismen der Importer (Dry-Run, `baseHash`, keine Löschungen, kein Auto-Commit) bleiben unverändert die einzige Quelle der Wahrheit.

#### 3.6.6 Spieltag-Befehl und Snapshots

```bash
node scripts/spieltag.mjs 25/26 --games ./entwurf/spieltag-7.json --lineup ./entwurf/lineup-draft.json          # Dry-Run: Saison-Import + Lineup-Import + Modell-Build + Tests, ein Bericht
node scripts/spieltag.mjs 25/26 --games ./entwurf/spieltag-7.json --lineup ./entwurf/lineup-draft.json --write  # schreibt alles nach bestandenen Prüfungen
```

- Ruft die bestehenden Importer als Funktionen auf (keine Kopie ihrer Logik). Bricht beim ersten Fehler ab, ohne irgendetwas zu schreiben (erst alle Dry-Runs, dann alle Writes).
- Commit und Push bleiben manuell; der Bericht schlägt eine Commit-Nachricht vor („data: Spieltag 7 (25/26)“).
- `build-league-model.mjs` schreibt zusätzlich **`model-data/snapshots/<season>.json`**: pro abgeschlossenem Spieltag die Kernwerte aller Module (Teamstärken, Power Ranking, Tabellen-Wahrscheinlichkeiten, Goalie-Werte, Spielereffekte, Auffälligkeiten), jeweils nur mit Daten bis zu diesem Spieltag gerechnet (identisch zur Walk-forward-Logik aus M9, Code wiederverwenden).

#### 3.6.7 Performance

- Übersicht und Spieltagsseite nutzen vorberechnete Snapshots und sind **ohne Neuberechnung der Saison** darstellbar. Ziel: interaktiv in unter 2 Sekunden nach Laden über HTTP (auf einem durchschnittlichen Smartphone).
- Rechenintensive Browser-Analysen (Vergleiche über viele `asOf`-Zeitpunkte, Vorschau-Modus) laufen in einem **Web Worker**.
- **Berechnung nur für sichtbare Bereiche:** Tabs und eingeklappte Abschnitte berechnen erst beim Öffnen; Karten zeigen bis dahin Platzhalter.
- Die eingebetteten `STATIC_SEASON_DATA` bleiben als `file://`-Fallback, werden aber unter HTTP nicht mehr geparst, wenn externe Daten erfolgreich geladen wurden (prüfen, ob das heute schon so ist).

---

## 4. Module

Jedes Modul ist beschrieben mit **Ziel**, **Methode**, **Output**, **UI** und **Akzeptanzkriterien**.

**Hinweis zu den UI-Abschnitten:** Ortsangaben wie „Teamseite“, „Goalie-Seite“, „Spielerprofil“ oder „Matchcenter“ bezeichnen Inhalte, nicht Seiten. Wo sie in der App erscheinen, legt die Informationsarchitektur in Abschnitt 6.3 fest (Zuordnung in 6.3.2). Alle Kennzahlen sind zusätzlich über die Zeitachse (`asOf`, Abschnitt 3.6) abrufbar.

### M0 · Datenaufbereitung (Grundlage für alle Module)

**Ziel:** Aus den Rohdaten aller Saisons eine saubere, einheitliche Tabellenstruktur erzeugen.

**Methode und Regeln:**

1. **Spielfilter:** Nur `ended === true`, `result` vorhanden, nicht `forfait`. Verschobene Spiele (`notice_type`) ausschließen. Jugend- oder Fremdliga-Spiele nach bestehender Logik (`isYouthGame`) ausschließen.
2. **Team-Identität:** Kanonischer Team-Schlüssel pro Saison, bestehende Normalisierung und SG-Regeln wiederverwenden.
3. **Zeit-Normalisierung:** Absolute Sekunde `absSec` pro Event (0–2400, bei Verlängerung darüber).
   - Pro Spiel erkennen, ob Halbzeit 2 kumuliert ist: Existiert ein Event mit `period === 2` und Zeit > 20:00, gilt das ganze Spiel als kumuliert.
   - Sonst `absSec = (period − 1) · 1200 + Sekunden`.
   - Halbzeitlänge als Konstante mit Prüfung. Weicht die maximale Zeit in Halbzeit 1 deutlich ab, Warnung im Bericht.
4. **Tore:**
   - Schütze über `event_team` + `number` → `player_id` aus dem Kader.
   - Assist analog über `assist` (Wert `0` oder fehlend = kein Assist; zu verifizieren).
   - `owngoal`: Tor zählt für das Team, **nicht** als Spielertor, kein Assist.
   - `penalty_shot`: zählt als Spielertor, wird aber mit `isPenaltyShot` markiert.
   - Spielstand vor und nach dem Tor aus `home_goals`/`guest_goals`.
5. **Strafen:** Typ, Grund, Minuten, Spieler (falls zuordenbar), Start `absSec`. Aktive Unter- und Überzahlphasen aus der bestehenden Special-Teams-Logik übernehmen.
6. **Timeouts:** Team, `absSec`, Spielstand zum Zeitpunkt.
7. **Spieltag-Kontext pro Team-Spiel:**
   - `gameOrderOfDay` (1 oder 2), aus `date` + `start_time`; bei fehlender Zeit über `game_number`.
   - `opponentGameOrderOfDay` und `opponentPrevGameResult` (Tordifferenz des vorherigen Spiels des Gegners am selben Tag, falls vorhanden).
   - `ownPrevGameResult` analog.
   - `isHostingTeam` (Team gehört zum `hosting_club`; Abgleich über normalisierte Namen, Sonderfälle wie „SV 03 Tübingen“ vs. „SV Tübingen Sharks“ und „PTSV Freiburg“ vs. „Breisgau Bandits“ über eine kleine, versionierte Zuordnungstabelle).
8. **Kader pro Team-Spiel:** Feldspieler-IDs, Goalie-IDs, `fieldPlayerCount`, `goalieCount`.
9. **Spieler-Identität:** `player_id` ist saison- und teamübergreifend der Schlüssel. Namen nur zur Anzeige.

**Output (intern, nicht zwingend geschrieben):** `teamGames[]`, `goalEvents[]`, `penaltyEvents[]`, `timeoutEvents[]`, `rosterEntries[]`.

**Akzeptanzkriterien:**

- Bericht listet pro Saison: Anzahl Spiele, Team-Spiele, Tore, zugeordnete Tore (Quote), kumulierte Zeitformate, Team-Spieltage mit ≠ 2 Spielen.
- Summe der Tore aus Events = Ergebnis laut `result` für jedes Spiel; Abweichungen werden als Warnung gelistet, nicht still korrigiert.
- Die Befunde aus Abschnitt 2.2 werden für alle Saisons geprüft und im Bericht ausgewiesen.
- Tests mit synthetischen Spielen: kumuliertes Zeitformat, Eigentor, Penalty, Tor ohne Assist, Spieltag mit fehlender Anstoßzeit.

---

### M1 · Teamstärke-Modell

**Ziel:** Für jedes Team eine Angriffs- und Abwehrstärke schätzen. Daraus erwartete Tore für jedes Duell ableiten.

**Methode:**

- **Poisson-Regression** auf Team-Spiel-Ebene:
  `log(λ_tore) = μ + angriff[team] − abwehr[gegner] + β_host · isHostingTeam + β_order · (gameOrderOfDay = 2) + β_kader · f(fieldPlayerCount)`
- **Ridge-Penalty** auf Team-Parameter (Stärken Richtung 0 = Ligaschnitt). λ per zeitlich geordneter Kreuzvalidierung wählen.
- **Zeitgewichtung:** Spiele früherer Saisons mit exponentiellem Abklingen (Halbwertszeit als Parameter, z. B. eine Saison) einbeziehen. So sind Stärken zu Saisonbeginn nicht leer.
- **Ergebniswahrscheinlichkeiten:** Aus zwei unabhängigen Poisson-Verteilungen (Skellam) → P(Sieg), P(Unentschieden), P(Niederlage), erwartete Tordifferenz.
- `f(fieldPlayerCount)`: zunächst drei Stufen (≤6, 7–8, 9+), später ggf. linear.

**Output (`model-data/<season>.json` → `teamStrength`):**

```json
{
  "asOfGameDate": "2026-04-11",
  "leagueAvgGoalsPerTeamGame": 7.68,
  "effects": { "host": 0.0, "secondGameOfDay": 0.0, "fieldPlayers": { "le6": 0.0, "7to8": 0.0, "ge9": 0.0 } },
  "teams": [
    { "teamKey": "vfb-ulm", "name": "VfB Ulm", "attack": 0.0, "defense": 0.0, "attackCI": [0.0, 0.0], "defenseCI": [0.0, 0.0], "games": 14 }
  ]
}
```

**UI:**

- Teamseite: Angriffs-/Abwehrstärke im Ligavergleich (Streudiagramm: x = Angriff, y = Abwehr).
- Matchcenter: erwartete Tore und Ergebniswahrscheinlichkeiten für das gewählte Duell.
- Bestehende Gegner-Tiers (`getGoalieOpponentTier`, `getOppStrength`) optional auf M1 umstellen. **Nur nach Vergleich** und hinter einem klaren Schalter, damit sich bestehende Kennzahlen nicht unbemerkt verschieben.

**Akzeptanzkriterien:**

- Walk-forward-Backtest (M9) zeigt eine bessere Log-Loss als die Baseline „Ligaschnitt für alle“.
- Effekte für Ausrichter, 2. Spiel und Kadergröße werden mit Intervall ausgegeben, auch wenn sie nicht signifikant sind.
- Tests: synthetische Liga mit bekannten Stärken → Modell findet die Rangfolge wieder.

---

### M1v · Team-Nachfolge und Vererbung (neue, fusionierte und umbenannte Teams)

**Ziel:** Ein Team, das neu in der Liga antritt, aber faktisch Nachfolger eines oder mehrerer bestehender Teams ist, startet nicht bei null. Es **erbt die Werte seiner Vorgänger, bis es genug eigene Daten hat** — und die Herkunft ist jederzeit sichtbar.

Anlass: In 26/27 tritt „SG Heidelberg-Mannheim" an, offenbar als Zusammenschluss von FBC Heidelberg und Floorball Mannheim (je 14 Spiele Historie in 25/26). Sportvg Feuerbach stellt zwei Mannschaften („Biber", „Rössle"), während in den Daten bereits ein zweites Feuerbach-Team aus 22/23 existiert.

**Nachfolge-Tabelle** (`data/team-lineage.json`, von Hand gepflegt, versioniert):

```json
{
  "schemaVersion": 1,
  "lineage": [
    { "teamKey": "sg-heidelberg-mannheim", "sinceSeason": "26/27",
      "predecessors": [
        { "teamKey": "fbc-heidelberg", "weight": 0.5, "scope": { "models": true, "display": true } },
        { "teamKey": "floorball-mannheim", "weight": 0.5, "scope": { "models": true, "display": true } }
      ],
      "note": "Zusammenschluss, bestätigt durch Chris" }
  ]
}
```

- Gewichte je Vorgänger summieren sich zu 1. Bei einer Umbenennung ein Vorgänger mit Gewicht 1.
- Die Tabelle wird **nie automatisch** ergänzt. Ein unbekanntes neues Team erzeugt eine Warnung im Build-Bericht und im UI, nie eine geratene Zuordnung.
- **`scope` je Vorgänger — verbindlich:** `{"models": true|false, "display": true|false}`.
  - `models`: Vererbung in Berechnungen (M1 und die davon abhängigen Module). Hier ist auch eine weit zurückliegende Vorgeschichte zulässig; die bestehende Zeitgewichtung entwertet sie ohnehin automatisch.
  - `display`: Vererbung in allem, was nach außen sichtbar wird (Form, letztes Duell, Vorschauvideos, Social-Media-Inhalte). **Erlaubt nur, wenn die Vorgängersaison unmittelbar vorangeht** (höchstens eine Saison Lücke). Alles Ältere bleibt `display: false`.
  Beispiel: „Sportvg Feuerbach 2" aus 22/23 wäre für eine heutige zweite Feuerbach-Mannschaft `models: true`, `display: false` — für interne Rechnungen brauchbar, für einen Instagram-Post zu alt.

**Team-IDs sind für die Nachfolge nicht verwendbar** (geprüfter Befund): `home_team_id`/`guest_team_id` werden jede Saison neu vergeben (DJK Giants Karlsruhe-Ost: 4838 → 5512 → 5708 → 6684 → 7694). Sie identifizieren eine Saison-Registrierung, nicht ein Team über Zeit. Nachfolge lässt sich damit nicht ableiten.

**Zuordnungsvorschlag per Spielerüberschneidung (Werkzeug, kein Automatismus):** `scripts/suggest-team-lineage.mjs` vergleicht die Kader eines neuen Teams mit den Kadern aller Teams der Vorsaison über `player_id` und berichtet die Überschneidungsquoten. Das Skript **schreibt nichts** und ändert `data/team-lineage.json` nie selbst; es liefert nur eine Empfehlung mit Zahlen, die ein Mensch bestätigt. Vor dem ersten Spieltag einer Saison gibt es keine Kader, dann gibt das Skript das ehrlich als „noch nicht entscheidbar" aus.

**Übergangsgewicht:** Für jede geerbte Kennzahl gilt
`wert = w · eigener Wert + (1 − w) · Vorgängerwert`, mit `w = n / (n + k)`, `n` = eigene gezählte Spiele, `k` = Halbwertsstichprobe (Default **6** Spiele, konfigurierbar, per M9 überprüfbar).
Nach 6 eigenen Spielen zählt die eigene Leistung zur Hälfte, nach 18 zu drei Vierteln. Der Vorgängeranteil verschwindet, er wird nur klein.

**Wo Vererbung gilt:**

| Modul | Verhalten |
|---|---|
| M1 Teamstärke | Vorgängerstärke als **Prior** statt Ligamittel; zusätzlich zur bestehenden Zeitgewichtung. Die eigene Schätzung bleibt unverändert berechnet, die Vererbung wirkt nur auf den angezeigten und weitergegebenen Wert. |
| M3, M4, M7 | erben über die von M1 gelieferte Erwartung automatisch mit; teamspezifische Profile (Müdigkeit, Rückstandsreaktion, DNA) erben nach derselben Formel |
| M5 Spielereffekte | **keine** Vererbung auf Teamebene; Spieler tragen ihre Historie über `player_id` ohnehin selbst |
| M10 | keine Vererbung; Hypothesentests laufen nur auf eigenen Beobachtungen |

**Darstellung (verbindlich):** Für die Anzeige zählen nur Vorgänger mit `scope.display = true`. Ein geerbter Wert ist immer als solcher gekennzeichnet — Kurzform „teilweise geerbt von FBC Heidelberg und Floorball Mannheim (6 eigene Spiele)", im Tooltip die Gewichte. Historische Einzelheiten wie Ergebnisse und Duelle werden **nie umgeschrieben**: Ein Duell aus 25/26 erscheint mit dem damaligen Namen und dem Zusatz „als FBC Heidelberg".

**Akzeptanzkriterien:**

- Ohne Eintrag in `data/team-lineage.json` verhält sich alles wie heute (keine stille Verhaltensänderung).
- `w = 0` bei 0 eigenen Spielen, `w → 1` bei vielen; Test mit n = 0, 3, 6, 18.
- Ein geerbter Wert ohne Kennzeichnung im UI gilt als Fehler.
- Gewichtssumme ≠ 1 oder unbekannter Vorgänger-Key: harter Abbruch im Build mit klarer Meldung.
- `scope.display = true` bei einer Vorgängersaison, die mehr als eine Saison zurückliegt: harter Abbruch mit Hinweis auf diese Regel.
- Test: derselbe Vorgänger mit `models: true, display: false` wirkt in den Modellwerten, erscheint aber in keinem angezeigten Form- oder Duell-Element.

---

### M0b · Spielplan-Import für die neue Saison

**Ziel:** Sobald der Spielplan einer neuen Saison auf saisonmanager.de erscheint, ist er **ohne Handarbeit** in der App — Grundlage für Spieltagsvorschau, Vorschauvideos und Terminanzeige.

**Ehrliche Lage:** Ein vollautomatischer Abruf setzt einen **API-Key** voraus (`X-Api-Key`; ein Test auf `leagues/<id>/table.json` ergab HTTP 401). Ohne Key kann kein Skript des Projekts die Daten holen — das Verbot von Netzwerkzugriffen in Skripten bleibt bestehen. Deshalb zwei Wege:

**Weg A (Ziel, mit API-Key):**
- Key als GitHub-Secret `SAISONMANAGER_API_KEY` hinterlegen (Anfrage an it@floorball.de).
- Der vorhandene, heute deaktivierte Workflow `.github/workflows/update-season-data.yml` wird wieder mit `schedule` versehen (einmal täglich reicht) und ruft `scripts/update-season-data.mjs` auf.
- Ergänzung dort: Erkennt der Lauf eine **neue Liga-ID für die Folgesaison** mit mindestens einem Spiel, legt er `season-data/<neu>.json` an und trägt die Saison mit `status:"archived"` ins Manifest ein. Das Umschalten auf `"current"` bleibt ein bewusster manueller Schritt (bestehende Regel).
- Sicherheitsregeln des Importers bleiben unangetastet: keine bekannte Game-ID darf verschwinden, kein Auto-Merge über Prüfungen hinweg.

**Weg B (Übergang, ohne Key):** halbautomatisch in einem Schritt.
- `scripts/import-schedule.mjs` liest den **offiziellen Spielplan-Export** der Liga (XLSX oder CSV, seit Kurzem im Saisonmanager verfügbar) oder eine manuell gespeicherte JSON-Antwort und erzeugt daraus einen gültigen `season-data`-Entwurf.
- Spiele ohne Events sind zulässig (bestehende Validatoren), daher genügt ein reiner Terminplan.
- Fehlen echte Spiel-IDs im Export, werden **keine** Ersatz-IDs erfunden: Der Entwurf wird als `provisional: true` markiert, landet in `data/schedule-provisional.json` (nicht in `season-data/`) und speist ausschließlich Anzeige und Videos. Beim ersten echten Import ersetzt der offizielle Stand ihn vollständig.

**Akzeptanzkriterien:** Ein vorläufiger Spielplan ist in der App überall als vorläufig gekennzeichnet; er fließt in **keine** Modellberechnung ein; nach dem echten Import existiert die vorläufige Datei nicht mehr.

---

### M2 · Torschützen-Qualität

**Ziel:** Für jeden Spieler der Liga eine belastbare Torquote, um die Qualität von Schützen einordnen zu können.

**Methode:**

- Tore pro Spiel über alle Ligaspiele, in denen der Spieler im Kader stand.
- **Empirical-Bayes-Schrinkage:** Gamma-Poisson-Modell. Prior aus der Verteilung aller Feldspieler (Momentenschätzung), Posterior-Mittel = geschrumpfte Torquote.
- Zeitgewichtung wie M1 (aktuelle Saison zählt stärker).
- Optional bereinigt um Gegnerstärke: erwartete Tore des Spielers relativ zur Abwehr der jeweiligen Gegner (M1).
- Einteilung in **Schützen-Stufen**: Top (oberes Quintil), Mittel, Schwach.
- Analog für Scorerpunkte (Tore + Assists) und Assists allein.

**Output (`shooterQuality`):**

```json
{ "players": [ { "playerId": 2424, "name": "…", "team": "…", "games": 14, "goals": 12, "goalsPerGameRaw": 0.86, "goalsPerGameShrunk": 0.71, "ci90": [0.45, 1.02], "tier": "top" } ] }
```

**UI:**

- Ligaweite Torschützen-Übersicht mit Roh- und geschrumpfter Quote.
- „Heißphase“-Hinweis: Letzte 4 Spiele deutlich über der geschrumpften Quote (Poisson-Test, BH-korrigiert über alle Spieler, siehe M8). Formulierung als „aktuell über seinem Niveau“, nicht als Prognose.

**Akzeptanzkriterien:**

- Spieler mit 1–2 Spielen landen nie auf Platz 1 der geschrumpften Rangliste, nur weil sie einmal getroffen haben.
- Tests: Schrinkage-Verhalten bei n = 1 gegenüber n = 50.

---

### M3 · Goalie-Bewertung

**Ziel:** Goalies aller Teams fair vergleichen, obwohl keine Schussdaten vorliegen.

**Methode:**

1. **Zuordnung:** Nur Team-Spiele mit genau einem Goalie im Kader zählen voll. Spiele mit zwei Goalies werden separat ausgewiesen und nicht zugeordnet (bestehende `sharedGoalieGames`-Logik).
2. **Erwartete Gegentore** pro Spiel aus M1 (Angriff des Gegners, eigene Abwehr **ohne** Goalie-Anteil ist mit diesen Daten nicht trennbar; deshalb zwei Varianten):
   - **Variante A „gegen Gegnerschnitt“:** Erwartung nur aus Angriffsstärke des Gegners und Kontext (Kader, 2. Spiel). Misst Goalie + Mannschaft.
   - **Variante B „Goalie-Anteil“:** Goalie als eigener Effekt in der M1-Regression für Gegentore (Ridge). Trennt Goalie und Team, soweit Goalie-Wechsel in einem Team vorkommen. Nur anzeigen, wenn genügend Variation vorhanden ist.
3. **Tore verhindert gegenüber Erwartung (TvE):** `Σ (erwartet − tatsächlich)`, pro Spiel und gesamt, mit Bootstrap-Intervall (Resampling der Spiele).
4. **Schützenqualität der Gegentore:** Anteil der Gegentore nach Schützen-Stufe (M2). Kennzahl **„Gegentore durch schwache Schützen je Spiel“** im Vergleich zur Erwartung (Anteil schwacher Schützen an den Toren der jeweiligen Gegner).
5. **Folgenschwere Gegentore:** Gegentore, die laut M6 die Siegwahrscheinlichkeit um mehr als einen Schwellwert senken (Standard: 10 Prozentpunkte). Summe des Verlusts an Siegwahrscheinlichkeit.
6. **Kontext-Splits:** 1. gegenüber 2. Spiel, HZ1 gegenüber HZ2, Kadergröße, Unterzahl gegenüber gleicher Anzahl.
7. **Gegentore kurz nach eigenem Tor** (≤ 60 s und ≤ 120 s), bestehende Response-Momentum-Logik wiederverwenden.

**Output (`goalieRatings`):** pro Goalie `games`, `sharedGames`, `goalsAgainst`, `expectedGA`, `tve`, `tvePerGame`, `tveCI90`, `weakShooterGA`, `weakShooterGAExpected`, `highLeverageGA`, `splits{…}`, `confidence`.

**UI:**

- Goalie-Seite: neue Karten „Tore verhindert gegenüber Erwartung“, „Wer trifft gegen ihn?“, „Folgenschwere Gegentore“, Kontext-Splits.
- Ligaweite Goalie-Rangliste (alle Teams), sortierbar, mit Intervallen.
- Matchcenter: **Gegner-Goalie-Scouting** (voraussichtlicher Goalie aus M7, seine Schwächen nach Halbzeit, Spielstand, 2. Spiel).
- Bestehende Goalie-Kennzahlen bleiben erhalten. Neue Werte ergänzen, nicht ersetzen.

**Akzeptanzkriterien:**

- Bei weniger als 4 zugeordneten Spielen wird kein Rang angezeigt, nur Werte mit Hinweis „zu wenige Spiele“.
- Summe der erwarteten Gegentore über alle Goalies eines Teams ≈ Summe aus M1 (Plausibilitätstest).
- Tests: synthetisches Szenario, in dem ein Goalie nur gegen starke Gegner spielt → TvE ist besser als die rohe Gegentorquote.

---

### M4 · Müdigkeit und Belastung

**Ziel:** Messen, ob und wie Leistung im 2. Spiel des Tages, in der 2. Halbzeit und bei kleinem Kader nachlässt, für Liga, Teams und Spieler.

**Methode:**

1. **Ligaebene:** Tore pro Team nach `gameOrderOfDay` × Halbzeit und × 10-Minuten-Abschnitt. Poisson-Regression mit Teamstärke (M1) als Offset, Interaktion `gameOrder × halbzeit` und `gameOrder × kaderstufe`.
2. **Teamebene (für jeden Gegner und Ulm):**
   - Tordifferenz pro Halbzeit im 1. und 2. Spiel, bereinigt um Erwartung aus M1.
   - **Schlussphasen-Index:** Tore/Gegentore in den letzten 10 Minuten relativ zur Erwartung, getrennt nach Spiel 1 und 2.
   - Mit Schrinkage Richtung Ligaeffekt (hierarchisch: Team-Effekt = Ligaeffekt + geschrumpfte Abweichung).
3. **Spielerebene:**
   - Scorerpunkte pro Spiel im 1. gegenüber 2. Spiel.
   - Anteil der Scorerpunkte in HZ2.
   - Schrinkage Richtung Teamwert. Anzeige nur ab Mindeststichprobe (Standard: 6 Spiele je Bedingung).
4. **Belastungsindex:** `40 · (Feldspieler auf dem Feld) / fieldPlayerCount` als grober Proxy für Minuten pro Feldspieler. Anzahl gleichzeitiger Feldspieler als Konstante (Kleinfeld: 3) konfigurierbar. Effekt des Index auf HZ2-Leistung im 2. Spiel.
5. **Frisch gegen müde:** Duelle, in denen ein Team sein 1. und das andere sein 2. Spiel bestreitet; zusätzlich Einfluss des Ergebnisses/der Knappheit des vorherigen Spiels (`opponentPrevGameResult`).
6. **Anreise (optional, Phase später):** Nur wenn `data/arenas.json` mit einmalig gepflegten Koordinaten existiert. Luftlinie zur Heimatstadt des Teams als Kovariate. Ohne diese Datei wird das Feature ausgeblendet.

**Output (`fatigue`):** `league{effects, CI}`, `teams[{teamKey, game1, game2, lateGameIndex…}]`, `players[{playerId, game1PPG, game2PPG, h2Share, n…}]`.

**UI:**

- Teamseite und Matchcenter: „Müdigkeitsprofil“ (Tordifferenz HZ1/HZ2 × Spiel 1/2 als kleine Matrix).
- Matchcenter-Hinweis, wenn das Duell „frisch gegen müde“ ist, inklusive des Ligaeffekts mit Intervall.
- Spielerprofil: „Spiel 1 / Spiel 2“-Vergleich.
- Coach-Report (`buildDigitalCoachReport`): einen Hinweis ergänzen, wenn der Gegner einen deutlichen, abgesicherten Schlussphasen-Einbruch im 2. Spiel hat.

**Akzeptanzkriterien:**

- Alle Aussagen im UI enthalten `n` und ein Intervall oder eine Einstufung („deutlich“, „leicht“, „nicht belastbar“).
- Test: synthetische Liga ohne Müdigkeitseffekt → Ligaeffekt nicht signifikant.

---

### M5 · Spielereffekt auf Tore und Gegentore (Plus-Minus)

**Ziel:** Messen, wie sich die Anwesenheit eines Spielers auf eigene Tore und Gegentore des Teams auswirkt.

**Methode in zwei Stufen:**

**Stufe 1: Mit/Ohne (einfach, transparent)**

- Pro Spieler und Saison: Ø Tore, Ø Gegentore, Ø Tordifferenz des Teams mit und ohne Spieler.
- Zusätzlich **bereinigt**: Differenz zur M1-Erwartung statt Rohwerte.
- Nur anzeigen, wenn mindestens 3 Spiele „ohne“ vorliegen. Sonst Hinweis „immer dabei – keine Vergleichsspiele“.

**Stufe 2: Regularisiertes Plus-Minus (RAPM, Spielebene)**

- Beobachtung = Team-Spiel. Zwei getrennte Modelle:
  - Offensive: `tore ~ μ + Σ offEffekt[spieler im Kader] + gegnerAbwehr + kontext`
  - Defensive: `gegentore ~ μ + Σ defEffekt[spieler im Kader] + gegnerAngriff + kontext`
- Kontext: Kadergröße, `gameOrderOfDay`, Ausrichter.
- **Alle Ligaspiele aller Saisons**, damit Stammspieler durch Saisons mit Ausfällen und Teamwechsler identifizierbar werden.
- **Ridge-Regression** (Gauß-Approximation auf Tore pro Spiel oder Poisson mit L2), λ per zeitlich geordneter Kreuzvalidierung.
- **Prior aus Scorer-Statistik** (optional, Stufe 2b): Statt Richtung 0 Richtung einer Vorhersage aus Toren/Assists pro Spiel schrumpfen (Idee aus Box Plus-Minus im Basketball). Nur wenn der Backtest (M9) eine Verbesserung zeigt.
- Goalies separat (M3), nicht in den Feldspieler-Effekten.
- Intervalle per Bootstrap über Spiele (fester Seed, Standard 500 Wiederholungen).
- Einheit für die Anzeige: **Tore pro Spiel** gegenüber einem durchschnittlichen Ligaspieler.

**Abgeleitete Kategorien (nur bei ausreichender Sicherheit):**

- **Stille Stütze:** Defensiveffekt im oberen Bereich, Scorerpunkte unterdurchschnittlich.
- **Leere Punkte:** Scorerpunkte hoch, Gesamteffekt nahe 0 oder negativ.
- **Gegner-Schlüsselspieler:** höchster Gesamteffekt beim Gegner (fließt in M7).

**Output (`model-data/alltime.json` → `playerImpact`):**

```json
{
  "method": "ridge-game-level",
  "lambda": { "off": 0.0, "def": 0.0 },
  "players": [
    { "playerId": 2424, "name": "…", "teamsBySeason": { "25/26": "…" }, "games": 40, "gamesWithout": 6,
      "off": 0.0, "offCI90": [0.0, 0.0], "def": 0.0, "defCI90": [0.0, 0.0], "total": 0.0, "category": null }
  ],
  "withWithout": { "25/26": [ { "playerId": 2424, "gamesWith": 11, "gamesWithout": 3, "gdWithAdj": 0.0, "gdWithoutAdj": 0.0 } ] }
}
```

**UI:**

- Spielerprofil: Karte „Einfluss aufs Team“ mit Offensive, Defensive, Gesamt und Intervall. Klarer Hinweis: „Basiert auf Kaderanwesenheit, nicht auf Einsatzzeit.“
- Kaderübersicht: Rangliste der Spielereffekte für Ulm mit Kategorien.
- Matchcenter: Top-3 Gegner-Schlüsselspieler nach Gesamteffekt, neben den Topscorern.
- Bestehende Roster-Impact- und Anti-Synergie-Logik (`buildRosterImpactAnalysis`, `buildDuoAntiSynergy`) bleibt bestehen. Späterer Abgleich mit M5 in `docs/league-model.md` dokumentieren.

**Akzeptanzkriterien:**

- Synthetischer Test: Spieler mit bekanntem Effekt wird in Vorzeichen und Größenordnung wiedergefunden.
- Spieler, die ausschließlich gemeinsam auftreten (perfekte Kollinearität), bekommen stabile, geteilte Effekte statt explodierender Werte.
- Die Kategorie wird nur vergeben, wenn das 90-%-Intervall die Null nicht enthält.

---

### M6 · Siegwahrscheinlichkeit im Spielverlauf und Win Probability Added

**Ziel:** Für jeden Zeitpunkt eines Spiels die Siegwahrscheinlichkeit schätzen und jedem Tor seinen Einfluss zuordnen.

**Methode:**

- Zustand: `(absSec, Tordifferenz aus Sicht Team A, erwartete Torraten beider Teams aus M1)`.
- **Poisson-Restspiel-Modell:** Resttore beider Teams ~ Poisson(λ · verbleibende Zeit / 2400). Zeitabhängige Torrate aus M4 (Liga-Profil pro 10-Minuten-Abschnitt) berücksichtigen. Daraus P(Sieg/Remis/Niederlage) analytisch.
- Kalibrierung prüfen: Vorhergesagte gegenüber beobachteter Siegquote in Bins (M9).
- **WPA pro Tor:** Differenz der Siegwahrscheinlichkeit (Remis mit 0,5 gewichtet, konfigurierbar) direkt vor und nach dem Tor.
- **Leverage pro Tor:** Wie stark hätte ein Tor zu diesem Zeitpunkt die Wahrscheinlichkeit bewegt (unabhängig davon, wer trifft).
- Aggregation pro Spieler: Σ WPA für Tore, Σ WPA für Assists (Anteil konfigurierbar, Standard 50 %), Σ negativer WPA bei Gegentoren für Goalies (M3).

**Output (`winProbability`):** pro Spiel eine kompakte Kurve (Stützpunkte bei jedem Tor sowie alle 60 s), pro Tor `wpBefore`, `wpAfter`, `wpa`, `leverage`; pro Spieler `wpaGoals`, `wpaAssists`, `wpaTotal`, `n`.

**UI:**

- Spielansicht: Siegwahrscheinlichkeits-Kurve mit Tor-Markern.
- Spielerprofil: „Wichtigkeit der Tore“ (WPA) neben dem bestehenden Clutch-Index. Den Clutch-Index **nicht ersetzen**, sondern im Lexikon den Unterschied erklären.
- Social-Media-Center: „Wendepunkt des Spiels“ = Tor mit dem höchsten |WPA|.

**Akzeptanzkriterien:**

- Kalibrierungstabelle im Build-Bericht (mindestens 5 Bins).
- Test: Bei 0:0 zu Beginn zweier gleich starker Teams ist P(Sieg) ≈ P(Niederlage).

---

### M7 · Erweiterte Gegneranalyse

**Ziel:** Das Matchcenter um automatisch berechnete Gegnerprofile aus allen Ligaspielen erweitern.

**Bausteine:**

1. **Verhalten nach Spielstand:**
   - Quote „Führung zum Sieg“ (nach erster Führung und nach 2-Tore-Führung), Quote „Rückstand gedreht“.
   - Tordifferenz in engen Spielen (|Differenz| ≤ 2 mit 10 min Restzeit) gegenüber der Erwartung aus M6.
2. **Abhängigkeit von Schlüsselspielern:**
   - Anteil der Tore und Scorerpunkte der Top-2-Spieler.
   - Ergebnisse mit gegenüber ohne diese Spieler (M5 Stufe 1, bereinigt).
   - Hinweis im Matchcenter, wenn ein Schlüsselspieler in den letzten Spielen fehlte.
3. **Voraussichtlicher Kader:**
   - Anwesenheitsquote pro Spieler in den letzten 4 Spieltagen (gewichtet, jüngster Spieltag am stärksten).
   - Markierung: neu (erstes Ligaspiel in dieser Saison), Rückkehrer, zuletzt fehlend.
   - Voraussichtlicher Goalie (höchste gewichtete Anwesenheit unter Goalies).
4. **Assist-Netzwerk:**
   - Gerichteter Graph Vorlage → Tor pro Team (Saison und All-time mit Zeitgewicht).
   - Kennzahlen pro Spieler: gewichteter Grad (Vorlagen gegeben/erhalten), **Betweenness** oder einfacher: Anteil der Tore, an denen der Spieler beteiligt ist („Beteiligungsquote“).
   - Hinweis „Über wen läuft das Spiel?“ = Spieler mit höchster Beteiligungsquote, falls nicht Topscorer.
5. **Strafen mit Folgen:**
   - Ligaweite Basiswerte Überzahl- und Unterzahlquote.
   - Pro Team: Strafminuten pro Spiel nach Strafgrund, Tore in Überzahl/Unterzahl gegenüber Ligaschnitt.
   - Pro Spieler: Strafminuten und **Gegentore während eigener Strafen**.
6. **Timeout-Verhalten:**
   - Typischer Zeitpunkt und Spielstand bei Timeouts.
   - Tordifferenz in den 5 Minuten vor gegenüber nach dem Timeout (ligaweit und pro Team, geschrumpft). Nur deskriptiv anzeigen.
7. **Bereinigte Form:**
   - Letzte 4 Spiele: Punkte und Tordifferenz relativ zur M1-Erwartung.
   - Anzeige „Form besser/schlechter als Gegner erwarten ließen“.
8. **Ähnliche Gegner:**
   - Clustering der Teams (alle Saisons, Team-Saison als Einheit) auf standardisierten Merkmalen: Angriff/Abwehr (M1), Schlussphasen-Index (M4), Führungsquote, Strafminuten, Abhängigkeit von Top-2, Überzahlquote.
   - k-Means mit festem Seed, k per Silhouette zwischen 3 und 5.
   - Ulms Bilanz gegen den Cluster des aktuellen Gegners.
9. **Direkte Duelle mit Kaderkontinuität:**
   - Bestehende Duell-Historie ergänzen um den Anteil der damaligen Gegner-Spieler, die heute noch im Kader stehen (nach `player_id`).
   - Ältere Duelle mit geringer Kontinuität im UI abschwächen.

**Output (`opponentIntel`):** pro Team-Saison ein Objekt mit den Bausteinen 1–9.

**UI:** Neue Tabs oder Abschnitte im bestehenden Matchcenter (`rMatchcenterTabs`). Die bestehenden Bereiche (DNA, Alarm, Scouting, Duos, Special Teams, Goalie-Matchup, Timing, Coach-Report, Kabinenblatt) bleiben. Wo sinnvoll speisen die neuen Werte die bestehenden Hinweise (`matchcenterBuildOpponentAlarm`, `matchcenterBuildCoachHints`).

**Akzeptanzkriterien:**

- Jeder Baustein funktioniert auch für einen Gegner mit nur 2 Spielen in der Saison (dann Zeitgewichtung mit Vorsaison oder Hinweis „zu wenige Daten“).
- Kein Baustein erzeugt einen Hinweis im Coach-Report, wenn die zugrunde liegende Stichprobe unter dem Mindestwert liegt.

---

### M8 · Auffälligkeiten-Feed

**Ziel:** Nach jedem Modell-Build automatisch eine kurze Liste statistisch auffälliger Veränderungen erzeugen.

**Methode:**

- Kandidaten-Tests (erweiterbar), jeweils mit Effektgröße, `n` und p-Wert:
  - Spieler: Scorerquote letzte 4 Spiele gegenüber geschrumpfter Quote (M2).
  - Spieler: Spiel 1 gegenüber Spiel 2 (M4).
  - Team/Gegner: Schlussphasen-Einbruch der letzten 3 Spieltage.
  - Goalie: TvE der letzten 4 Spiele gegenüber Saison.
  - Team: Strafminuten der letzten 3 Spieltage gegenüber Saison.
- **Benjamini-Hochberg-Korrektur** über alle Tests eines Builds (FDR 10 %, konfigurierbar).
- Mindeststichprobe pro Testart. Maximal 10 Einträge, sortiert nach Effektgröße.
- Formulierung als Beobachtung, nicht als Ursache („trifft seit 4 Spielen deutlich häufiger als üblich“).

**Output (`anomalies[]`):** `type`, `subject`, `text`, `effect`, `n`, `pAdjusted`, `since`.

**UI:** Übersicht und Spieltagsseite: Karte „Auffällig seit dem letzten Spieltag“ (siehe 6.3.1).

**Akzeptanzkriterien:** Test mit reinen Zufallsdaten ergibt im Mittel höchstens die erwartete Zahl an Falschmeldungen.

---

### M9 · Backtesting und Modellgüte

**Ziel:** Nachweisen, dass die Modelle wirklich vorhersagen, ohne dass Prognosen manuell gespeichert werden müssen.

**Methode:**

- **Walk-forward:** Für jeden Spieltag werden M1 (und abgeleitete Wahrscheinlichkeiten) **nur mit Daten vor diesem Datum** gefittet und die Spiele dieses Spieltags vorhergesagt. Das geht rückwirkend für alle Saisons.
- Kennzahlen: Log-Loss und Brier-Score für Sieg/Remis/Niederlage, mittlerer absoluter Fehler der Tordifferenz, Kalibrierung in Bins.
- Baselines: „Ligaschnitt für alle“, „Tabellenplatz-Tiers“ (bestehende Logik), „letzte Saison“.
- Parameter-Tuning (λ, Halbwertszeit) ausschließlich über diesen Walk-forward, nie über In-Sample-Fit.

**Output (`backtest`):** Kennzahlen pro Modell und Baseline, pro Saison.

**UI:** Neue Seite oder Lexikon-Abschnitt „Wie gut sind die Modelle?“ mit Kennzahlen und Kalibrierungsdiagramm.

**Akzeptanzkriterien:** Build-Bericht zeigt Backtest-Ergebnisse. Ein Modell, das die Baseline nicht schlägt, wird im UI mit Warnhinweis angezeigt oder deaktiviert.

---

### M10 · Psychologie im Spiel

**Ziel:** Psychologische Annahmen aus dem Floorball-Alltag („Momentum“, „Druck“, „Trotzreaktion“, „Timeout bricht die Serie“) mit den Event-Daten aller Ligaspiele **wissenschaftlich sauber prüfen**. Ergebnisse sollen für Trainer nutzbar sein und gleichzeitig methodisch einer Prüfung wie in einer empirischen Studie standhalten.

M10 ist das anspruchsvollste Modul. Es setzt M0, M1, M4 und M6 voraus und wird als eigene Phase (P9) umgesetzt.

#### M10.1 Grundsätze

1. **Hypothesen vor der Auswertung festlegen.** Die Hypothesen in M10.3 werden vor der ersten Auswertung in `docs/m10-hypothesen.md` fixiert (Präregistrierung im Repo, per Git-Historie nachvollziehbar). Spätere Änderungen werden dort mit Begründung dokumentiert.
2. **Konfirmatorisch vs. explorativ.** Nur Hypothesen mit ausreichender Teststärke (siehe M10.6) sind konfirmatorisch. Alle anderen werden im UI ausdrücklich als „explorativ“ gekennzeichnet.
3. **Hold-out:** Modellspezifikation und Exploration nur auf den Explorationssaisons, konfirmatorische Tests nur auf den Bestätigungssaisons, erst danach finale Schätzung auf allen Saisons. **Vorläufiger Default:** Exploration **21/22 und 25/26**, Bestätigung **22/23–24/25** (siehe Entscheidung 7; 25/26 wurde für H10/H11 bereits ausgewertet). Der Split ist in `docs/m10-hypothesen.md` festzuhalten, bevor die Bestätigungssaisons ausgewertet werden. Bis dahin darf auf 22/23–24/25 **keine** Momentum-, Serien-, Timeout-, Erstgegentor- oder Rückstandsanalyse laufen.
4. **Innerhalb des Spiels vergleichen.** Die zentrale Gefahr ist, Teamstärke mit Psychologie zu verwechseln: Ein starkes Team schießt ohnehin mehr Tore hintereinander. Deshalb vergleicht jedes Modell ein Team **mit sich selbst im selben Spiel** (Fixed Effects pro Team-Spiel).
5. **Mechanische Artefakte ausschließen**, bevor etwas psychologisch interpretiert wird (siehe M10.5).
6. **Neutral und verantwortungsvoll formulieren.** Psychologische Zuschreibungen zu einzelnen Spielern („bricht unter Druck ein“) sind sensibel. Regeln in M10.8.

#### M10.2 Datenstruktur: Zeitscheiben

Aus M0 wird pro Team-Spiel eine Zeitreihe in **Scheiben von 60 Sekunden** erzeugt (Länge konfigurierbar, Default 60 s).

Pro Scheibe (`teamGameId`, `sliceStart`):

| Variable | Bedeutung |
|---|---|
| `exposure` | effektive Spielzeit der Scheibe in Sekunden (nach Abzug ausgeschlossener Zeiten, siehe M10.5) |
| `goalsFor` | eigene Tore in der Scheibe (ohne Penaltys, ohne Eigentore des Gegners; siehe M10.5) |
| `penaltiesFor` | eigene Strafen in der Scheibe |
| `scoreDiff` | Tordifferenz aus eigener Sicht zu Scheibenbeginn, gekappt auf −3 … +3 |
| `manpower` | `even`, `pp` (Überzahl), `pk` (Unterzahl) aus Special-Teams-Logik |
| `timeBucket` | 10-Minuten-Abschnitt (4 Stufen) plus Kennzeichen „letzte 2 Minuten“ |
| `gameOrderOfDay` | 1 oder 2 |
| `ownGoalRecent` | eigenes Tor in den letzten 120 s (weitere Fenster: 60 s, 300 s) |
| `concededRecent` | Gegentor in den letzten 120 s (analog) |
| `ownPenaltyRecent` | eigene Strafe in den letzten 180 s |
| `oppTimeoutRecent` | Timeout des Gegners in den letzten 300 s |
| `ownTimeoutRecent` | eigener Timeout in den letzten 300 s |
| `runAgainst` | Anzahl unbeantworteter Gegentore in Folge zu Scheibenbeginn (0, 1, 2, 3+) |
| `leverage` | Leverage aus M6 zu Scheibenbeginn |
| `expectedRate` | erwartete Torrate aus M1 (Angriff eigen vs. Abwehr Gegner), nur für Modelle ohne Fixed Effects |

Größenordnung: ca. 56 Spiele × 2 Teams × 40 Scheiben ≈ 4.500 Zeilen pro Saison, über 5 Saisons gut 20.000 Zeilen. Speicher- und rechenmäßig unkritisch.

#### M10.3 Hypothesen

| ID | Hypothese | Zielgröße | Kernvariable | Status (vorläufig) |
|---|---|---|---|---|
| **H1** | **Momentum:** Nach einem eigenen Tor ist die eigene Torrate kurzfristig erhöht. | `goalsFor` | `ownGoalRecent` | konfirmatorisch, falls Teststärke reicht |
| **H2** | **Reaktion auf Gegentor:** Nach einem Gegentor ist die eigene Torrate kurzfristig verändert (Trotzreaktion: höher; Schock: niedriger). Zweiseitig. | `goalsFor` | `concededRecent` | konfirmatorisch, falls Teststärke reicht |
| **H3** | **Serien:** Serien von 3+ unbeantworteten Toren treten häufiger auf, als ein Modell ohne Momentum erwarten lässt. | Anzahl Serien | Simulationsvergleich | konfirmatorisch |
| **H4** | **Druck:** In Situationen mit hohem Leverage weicht die Torrate von der Erwartung ab (getrennt für führendes und zurückliegendes Team). | `goalsFor` | `leverage` (oberes Quintil) × `scoreDiff` | explorativ |
| **H5** | **Tilt:** Nach einem Gegentor oder einer eigenen Strafe steigt die Rate eigener Strafen. | `penaltiesFor` | `concededRecent`, `ownPenaltyRecent` | explorativ (wenige Strafen) |
| **H6** | **Timeout als Intervention:** Ein Timeout während einer gegnerischen Serie senkt die gegnerische Torrate stärker, als es in vergleichbaren Situationen ohne Timeout ohnehin geschieht. | Gegner-`goalsFor` | Timeout vs. gematchte Kontrolle | explorativ (wenige Timeouts) |
| **H7** | **Übertrag vom 1. Spiel:** Das Ergebnis des 1. Spiels des Tages beeinflusst die Leistung im 2. Spiel über die Teamstärke hinaus. | Tordifferenz Spiel 2 gegen M1-Erwartung | `ownPrevGameResult` | konfirmatorisch |
| **H8** | **Hot Hand (Spieler):** Spieler treffen nach eigenem Tor häufiger erneut, als bei unabhängigen Ereignissen zu erwarten ist. | Spielertore | Permutationstest mit Miller-Sanjurjo-Korrektur | explorativ |
| **H9** | **Soziale Erleichterung:** Mehr Zuschauer bzw. Ausrichter-Rolle verändern die Leistung (Zajonc). | Tordifferenz gegen M1-Erwartung | `audience` (log), `isHostingTeam` | explorativ (Zuschauer nur teilweise erfasst) |
| **H10** | **First Goal Against Effect** (umgangssprachlich „Dosenöffner“): Nach dem ersten Gegentor steigt die Gegentor-Rate stärker, als es bei gleicher Toranzahl zufällig zu erwarten wäre; entsprechend fällt das erste Gegentor später als erwartet. | Zeitpunkte der Gegentore | Erstgegentor | konfirmatorisch (Tor-Hypothese, voraussichtlich ausreichende Teststärke) |
| **H11** | **Deficit Resilience** (umgangssprachlich „Meltdown“ bzw. „Aufbäumen“): Bei klarem Rückstand (≥3 Tore) weichen eigene Tore und/oder Gegentore von der stärkebasierten Erwartung ab. Zweiseitig. | eigene Tore und Gegentore | `scoreDiff ≤ −3` | Ligaeffekt konfirmatorisch, Team-Werte explorativ |

Der Status wird nach der Teststärke-Analyse (M10.6) auf den Explorationssaisons endgültig festgelegt und in `docs/m10-hypothesen.md` fixiert.

#### M10.4 Methoden

**A) Fixed-Effects-Poisson-Modell (H1, H2, H4, H5)**

```
goalsFor[s] ~ Poisson( exposure[s] · exp( α[teamGame] + β · X[s] ) )
```

- `α[teamGame]`: eigener Effekt pro Team-Spiel. Er absorbiert Teamstärke, Gegner, Tagesform und alles, was über das Spiel konstant ist.
- `X[s]`: Kontrollvariablen (`scoreDiff`, `manpower`, `timeBucket`, Kennzeichen „letzte 2 Minuten“) plus die Kernvariable der Hypothese.
- **Schätzung** ohne externe Bibliothek per alternierendem Verfahren:
  1. `α[g] = log( Σ_s∈g y_s / Σ_s∈g exposure_s · exp(β·X_s) )` in geschlossener Form,
  2. ein IRLS-Schritt für `β` bei festen `α`,
  3. wiederholen bis zur Konvergenz (Toleranz im Code dokumentieren).
  Das entspricht der bedingten Poisson-Likelihood. Team-Spiele ohne eigenes Tor tragen nichts bei und werden ausgeschlossen.
- **Standardfehler:** cluster-robust nach Spiel **oder** Bootstrap über Spiele, stratifiziert nach Saison (fester Seed, 1.000 Wiederholungen). Beide berechnen und im Bericht vergleichen.
- **Ergebnisform:** Rate Ratio (RR) mit 95-%-Intervall. Beispielübersetzung: RR = 1,25 → „In den 2 Minuten nach einem eigenen Tor ist die Wahrscheinlichkeit für ein weiteres eigenes Tor um 25 % höher als sonst in diesem Spiel.“
- **Robustheit:** Fenster 60/120/300 s, Scheibenlänge 30/60 s, mit und ohne letzte 2 Minuten. Alle Varianten im Bericht; nur die präregistrierte Variante ist die Hauptanalyse.

**B) Simulationsbasierter Serientest (H3)**

1. Modell A ohne Momentum-Variablen fitten.
2. Für jedes reale Spiel 1.000 Spielverläufe aus diesem Modell simulieren (Torprozesse beider Teams, Spielstand wird in der Simulation fortgeschrieben, weil `scoreDiff` die Raten beeinflusst).
3. Beobachtete Anzahl Serien (3+ und 4+ unbeantwortete Tore) mit der simulierten Verteilung vergleichen. Empirischer p-Wert.

Das Verfahren berücksichtigt automatisch, dass starke Teams mehr Serien haben.

**C) Gematchte Kontrollanalyse für Timeouts (H6)**

Timeouts werden typischerweise **während** gegnerischer Serien genommen. Danach normalisiert sich die Torrate oft von selbst (Regression zur Mitte). Ein einfacher Vorher-nachher-Vergleich würde den Timeout-Effekt deshalb überschätzen. Bekanntes Parallelbeispiel: Studien zu Trainerwechseln im Fußball zeigen, dass der scheinbare Effekt großteils Regression zur Mitte ist.

- **Behandelte Situationen:** Timeout eines Teams, bei dem `runAgainst ≥ 2` oder ≥ 2 Gegentore in den letzten 300 s.
- **Kontrollsituationen:** Zeitpunkte ohne Timeout mit gleicher Serienlage, ähnlichem Spielstand (`scoreDiff`), gleicher Halbzeit, ähnlicher Restzeit (±5 min), gleichem `manpower`; höchstens eine Kontrolle pro Team-Spiel, um Abhängigkeiten zu begrenzen.
- **Vergleich:** gegnerische Tore in den 300 s danach, Differenz-in-Differenzen gegenüber den 300 s davor.
- Ergebnis immer als explorativ ausweisen, solange die Teststärke nicht reicht.

**D) Übertragseffekt (H7)**

- Regression der Tordifferenz im 2. Spiel minus M1-Erwartung auf das Ergebnis des 1. Spiels minus dessen M1-Erwartung („über/unter Erwartung gespielt“), zusätzlich auf Sieg/Niederlage und Knappheit.
- Kontrollen: Kadergröße, `opponentGameOrderOfDay`.
- Wichtig: Die **Abweichung** von der Erwartung im 1. Spiel verwenden, nicht das Rohergebnis. Sonst misst man wieder Teamstärke.

**E) Hot Hand für Spieler (H8)**

- Pro Spieler-Spiel die Folge seiner Tore relativ zu den Teamtoren betrachten (Anteil der Teamtore, die der Spieler direkt nach eigenem Tor erzielt).
- Nullverteilung per Permutation der Torschützen innerhalb des Team-Spiels (erhält Teamstärke und Spielverlauf).
- Die Verzerrung bei kurzen Sequenzen (Miller & Sanjurjo, 2018) wird durch die Permutation automatisch berücksichtigt; im Bericht dokumentieren.
- Aggregation über alle Spieler als Ligaeffekt. Individuelle Werte nur hierarchisch geschrumpft (M10.8).

**F) Zuschauer und Ausrichter (H9)**

- Nur Spiele mit `audience`. Vorab prüfen, ob fehlende Zuschauerzahlen systematisch sind (z. B. nur bestimmte Ausrichter). Wenn ja, im Bericht als Einschränkung nennen und ggf. auf den Ausrichter-Effekt beschränken.
- Tordifferenz gegen M1-Erwartung auf `log(audience + 1)` und `isHostingTeam`.

**G) First Goal Against Effect (H10)**

Die naive Rechnung (Ø Minute des ersten Gegentors gegenüber Ø Abstand der späteren Gegentore) ist **nicht zulässig**. Sie liefert selbst bei rein zufälligen Toren einen scheinbaren Effekt, weil (a) Abstände nach dem ersten Gegentor nur in Spielen mit ≥2 Gegentoren existieren, (b) die Wartezeit bis zum ersten Ereignis und die Abstände danach unterschiedlich verteilt sind und (c) die Torrate über die Spielzeit steigt.

Verfahren:

1. **Zeit-Reskalierung:** Liga-Zeitprofil der Tore aus den Explorationssaisons schätzen (Anteil der Tore je 5-Minuten-Abschnitt). Kumulierte Profilfunktion `R(t) ∈ [0,1]`. Unter der Nullhypothese (inhomogener Poisson-Prozess ohne Abhängigkeit zwischen Toren) sind die reskalierten Gegentorzeiten `R(t_i)` bei gegebener Gegentoranzahl `N` unabhängig gleichverteilt.
2. **Teilmetrik „First Goal Against Timing“** pro Team-Spiel mit `N ≥ 1`:
   `U = 1 − (1 − R(t_1))^N`
   Unter der Nullhypothese ist `U` gleichverteilt auf [0,1], Erwartungswert 0,50. `U > 0,5`: erstes Gegentor später als erwartet. Kennzahl pro Team bzw. Liga = Mittelwert von `U`; Intervall per Bootstrap über Team-Spiele.
3. **Teilmetrik „Subsequent Goals Against Rate“:** gepoolte Rate im reskalierten Zeitmaß nach dem ersten Gegentor geteilt durch die Rate davor:
   `RR_obs = [Σ(N−1) / Σ(1 − τ_1)] / [n / Σ τ_1]` mit `τ_1 = R(t_1)`.
   Weil `RR_obs` auch unter der Nullhypothese nicht 1 ist, wird die Nullverteilung **simuliert** (für jedes Team-Spiel `N` gleichverteilte Zeiten ziehen, 2.000 Wiederholungen). Berichtet wird das **bereinigte RR** = `RR_obs / Mittelwert(RR_null)`, mit simuliertem p-Wert (einseitig für H10) und Intervall.
4. **Robustheit:** Gegentore in den letzten 2 Minuten ausschließen (leere Tore), Eigentore und Penaltys ausschließen, getrennt nach Gegentoranzahl (1–4, 5–8, 9+) und nach 1./2. Spiel des Tages.
5. **Spiegelmetrik (optional):** dieselbe Rechnung für eigene Tore („Folgt nach dem ersten eigenen Tor eine Torflut?“).
6. **Team-Werte** geschrumpft Richtung Liga (Empirical Bayes auf `U`, Varianz unter Nullhypothese = 1/12 pro Team-Spiel). Pro Saison ist ein Team-Wert mit 14 Spielen nur auf etwa ±0,15 genau; Anzeige ab mindestens 30 Team-Spielen (saisonübergreifend).

**H) Deficit Resilience (H11)**

1. **Erwartete Raten pro Team-Spiel:** `λ_für = Tore/Spiel(Team) · Gegentore/Spiel(Gegner) / Ligaschnitt`, `λ_gegen` analog, jeweils **ohne das betrachtete Spiel** berechnet (Leave-one-game-out, sonst Regressions-Artefakt). Sobald M1 vorliegt, stattdessen die M1-Erwartung ohne das Spiel verwenden.
2. **Zeitscheiben** aus M10.2 nach Spielstand zu Scheibenbeginn einteilen: `≤ −4`, `−3`, `−2 … +2`, `+3`, `≥ +4`.
3. Erwartung pro Scheibe = `λ · (R(Scheibenende) − R(Scheibenbeginn))`.
4. **Teilmetriken** bei Rückstand ≥3 (Zustände `−3` und `≤ −4` zusammengefasst, zusätzlich getrennt berichtet):
   - **Deficit Offense Response** = eigene Tore beobachtet/erwartet. > 1: Team trifft bei klarem Rückstand häufiger als erwartet.
   - **Deficit Defense Stability** = Gegentore erwartet/beobachtet (Kehrwert, damit höher = besser). < 1: Team kassiert bei klarem Rückstand mehr als erwartet.
   - **Deficit Resilience (Gesamt)** = geometrisches Mittel beider Teilmetriken. 1,00 = Leistung wie erwartet.
5. **Intervalle** per Bootstrap über Spiele. **Test** der Ligaeffekte zusätzlich im Fixed-Effects-Modell A mit `scoreDiff`-Stufen als Kernvariable (Referenz: `−2 … +2`).
6. **Grenze (im UI nennen):** Das Modell trennt nicht, ob das zurückliegende Team nachlässt oder das führende Team verwaltet. Es beschreibt den Spielverlauf bei klarem Rückstand aus Sicht des zurückliegenden Teams.
7. **Team-Werte** geschrumpft Richtung Liga; Anzeige erst ab mindestens 300 Minuten bei Rückstand ≥3 (saisonübergreifend).

**Vorbefunde aus 25/26 (explorativ, Stand der Spezifikation)**

Diese Werte wurden vor der Präregistrierung auf 25/26 berechnet. 25/26 gehört deshalb zwingend zu den Explorationssaisons (siehe Entscheidung 7).

| Kennzahl | Liga 25/26 | Einordnung |
|---|---|---|
| First Goal Against Timing (Ø U) | 0,45 [0,39–0,50] | erstes Gegentor eher **früher** als erwartet |
| Subsequent Goals Against Rate (bereinigt) | 0,86 (RR beobachtet 1,04, Zufall 1,21; p einseitig 0,93) | kein Dosenöffner-Effekt |
| Naiv: Ø Minute erstes Gegentor / Ø Abstand danach | 6,1 / 4,3 min (Zufall: 6,9 / 4,1) | zeigt das Artefakt der naiven Rechnung |
| Deficit Offense Response, Rückstand ≥4 | 1,02 [0,81–1,24] | wie erwartet |
| Gegentore O/E, Rückstand ≥4 | 1,01 [0,81–1,23] | wie erwartet |
| Deficit Offense Response, Rückstand 3 | 0,88 [0,52–1,34] | nicht belastbar |
| Gegentore O/E, Rückstand 3 | 1,22 [0,92–1,63] | leichte, nicht signifikante Tendenz |
| Liga-Zeitprofil (Anteil Tore je 5 min) | 10,0 · 11,4 · 12,4 · 11,7 · 12,2 · 12,4 · 12,8 · 17,0 % | Anstieg zum Spielende |

Diese Vorbefunde dienen als Referenz für die Implementierung: M10 muss auf 25/26 dieselben Werte (bis auf Zufallsschwankung der Simulation) reproduzieren.

**Team- und Spielerprofile (explorativ, nach den Ligaanalysen)**

- **Hierarchisches Modell:** Team-spezifische Abweichungen vom Liga-Effekt für H1/H2 als zufällige Effekte, per Empirical Bayes geschrumpft (Varianz der Team-Effekte per Momentenschätzung).
- Ergebnis pro Team (Ulm und Gegner): „Reaktion auf Gegentor“, „Serienanfälligkeit“, „Leistung in Drucksituationen“, jeweils mit Intervall und Verlässlichkeit.
- Spielerprofile nur für H8 und nur geschrumpft.

#### M10.5 Mechanische Artefakte (Pflichtprüfungen)

| Artefakt | Problem | Umgang |
|---|---|---|
| **Anspiel nach Tor** | Nach jedem Tor folgt ein Bully in der Mitte; direkt danach sind Tore mechanisch seltener. | Die ersten 20 s nach jedem Tor aus `exposure` herausnehmen (Parameter, Robustheit mit 0/20/40 s). |
| **Leeres Tor am Ende** | Zurückliegende Teams nehmen den Goalie heraus. Nicht in den Daten markiert, erzeugt aber späte Tore beider Teams. | Hauptanalyse ohne die letzten 2 Minuten (Entscheidung 8); Variante mit den letzten 2 Minuten plus Kontrollkennzeichen als Robustheitsprüfung. |
| **Score Effects** | Führende verteidigen, Zurückliegende riskieren mehr. | `scoreDiff` als Kontrolle in jedem Modell. |
| **Über- und Unterzahl** | Tore häufen sich in Überzahl, Strafen folgen oft Toren. | `manpower` als Kontrolle; H5-Modelle zusätzlich nur mit gleicher Spieleranzahl. |
| **Müdigkeitsverlauf** | Torraten ändern sich über die Spielzeit (M4). | `timeBucket` und `gameOrderOfDay` als Kontrolle. |
| **Penaltys und Eigentore** | Penaltys sind eigene Situationen; Eigentore sind kein Angriffserfolg. | Penaltys aus `goalsFor` der Hauptanalyse ausschließen (Robustheit mit); Eigentore zählen für den Spielstand, nicht als `goalsFor` des profitierenden Teams in der Hauptanalyse. |
| **Zeitformat** | 7 Spiele in 25/26 mit kumulierter Zeit in HZ2 (siehe 2.2). | M0-Normalisierung, Prüfung im Bericht. |
| **Halbzeitende** | Scheiben über die Halbzeit hinweg verfälschen Fenster. | Fenster wie `ownGoalRecent` enden **nicht** an der Halbzeit (Momentum könnte überdauern), aber Kennzeichen „erste 2 Minuten nach Wiederanpfiff“ als Kontrolle. |

#### M10.6 Teststärke und Stichprobe

- Der Build-Bericht berechnet für jede Hypothese auf den Explorationssaisons die **minimal nachweisbare Effektgröße** (MDE, RR bei α = 0,05, Power = 0,80), per Simulation aus Modell A.
- Regel: Konfirmatorisch nur, wenn die MDE ≤ RR 1,25 (bzw. ≥ 0,80) liegt. Sonst explorativ.
- Grobe Erwartung aus 25/26 (zu verifizieren): ca. 860 Tore, 66 Strafen und 36 Timeouts pro Saison. Tor-Hypothesen (H1–H3) sind über 5 Saisons voraussichtlich testbar, Strafen- und Timeout-Hypothesen (H5, H6) eher nicht.
- Im UI wird bei nicht belegten Hypothesen zwischen **„kein Effekt nachweisbar, Effekt wäre groß genug gewesen, um ihn zu sehen“** und **„zu wenig Daten für eine Aussage“** unterschieden.

#### M10.7 Multiples Testen und Urteil

- Konfirmatorische Hypothesen: **Holm-Korrektur**.
- Explorative Hypothesen, Robustheitsvarianten sowie Team- und Spielerprofile: **Benjamini-Hochberg** (FDR 10 %).
- Urteil pro Hypothese (einheitliche Logik in `psychology.mjs`):
  - **„bestätigt“:** konfirmatorisch, korrigierter p < 0,05 und Richtung stabil in allen präregistrierten Robustheitsvarianten
  - **„Hinweis“:** explorativ signifikant nach BH oder konfirmatorisch nur in einem Teil der Varianten
  - **„nicht nachweisbar“:** Intervall schließt relevante Effekte (RR außerhalb 0,8–1,25) aus
  - **„unklar“:** Intervall zu breit für eine Aussage
- **Praktische Relevanz** zusätzlich prüfen: Verbessert die Aufnahme der Momentum-Variablen in das Siegwahrscheinlichkeits-Modell (M6) die Walk-forward-Log-Loss (M9)? Wenn nicht, ist ein statistisch nachweisbarer Effekt für Vorhersagen praktisch bedeutungslos, und das wird so angezeigt.

#### M10.8 Verantwortungsvolle Nutzung

- **Keine psychologischen Etiketten für einzelne Spieler** im UI (kein „bricht unter Druck ein“). Spielerbezogene Ergebnisse nur als neutrale Kennzahl mit Intervall, nur im internen Bereich, nie im Social-Media-Center oder in exportierten Grafiken.
- **Team-Ebene** darf in Matchcenter und Coach-Report einfließen, aber nur bei Urteil „bestätigt“ oder „Hinweis“ und mit Verlässlichkeitsangabe.
- Formulierung beschreibend statt wertend: „Nach Gegentoren trifft das Team in den folgenden 2 Minuten seltener als sonst (RR 0,78; Verlässlichkeit mittel)“.
- Hinweis im Lexikon, dass Daten Muster zeigen, aber keine inneren Zustände messen.
- **Zum Namen „Deficit Resilience“:** Der Name ist festgelegt. Weil „Resilience“ einen psychologischen Zustand nahelegt, muss der Lexikoneintrag klarstellen, dass die Kennzahl die **Leistung bei klarem Rückstand relativ zur Erwartung** misst, nicht die mentale Widerstandskraft. Die Kennzahl wird nur auf Team-Ebene angezeigt, nie für einzelne Spieler.
- **Umgangssprachliche Begriffe** („Dosenöffner“, „Meltdown“, „Aufbäumen“) erscheinen nur als Alias im Lexikon und in der Suche, nicht als Kennzahlname oder Überschrift.
- Spielerdaten sind personenbezogen. Die Nutzung bleibt intern; Zugriffsschutz des Portals im Verein klären.

#### M10.9 Output

`model-data/alltime.json` → `psychology`:

```json
{
  "preregistration": { "file": "docs/m10-hypothesen.md", "commit": "<git-hash beim Fixieren>", "explorationSeasons": ["21/22","25/26"], "confirmationSeasons": ["22/23","23/24","24/25"] },
  "settings": { "sliceSeconds": 60, "window": 120, "faceoffDeadTime": 20, "excludeLast2Min": true },
  "hypotheses": [
    {
      "id": "H1", "status": "confirmatory", "estimate": { "type": "RR", "value": 1.0, "ci95": [1.0, 1.0] },
      "p": 0.0, "pAdjusted": 0.0, "correction": "holm", "nEvents": 0, "mde": 1.0,
      "robustness": [ { "variant": "window60", "value": 1.0, "ci95": [1.0, 1.0] } ],
      "predictiveGain": { "logLossDelta": 0.0 },
      "verdict": "unklar"
    }
  ],
  "teamProfiles": [ { "teamKey": "vfb-ulm", "season": "25/26", "reactionToConceded": { "rr": 1.0, "ci90": [1.0, 1.0], "reliability": "gering" }, "runVulnerability": {}, "pressure": {} } ],
  "playerHotHand": [ { "playerId": 0, "shrunkEffect": 0.0, "ci90": [0.0, 0.0], "n": 0 } ]
}
```

#### M10.10 UI

- **Neue Seite „Psychologie-Labor“:**
  - Hypothesenkarten mit Frage, Urteil, Effekt in Alltagssprache, Intervall, Teststärke-Hinweis und Label „konfirmatorisch“/„explorativ“.
  - **Forest-Plot** aller Effekte (RR mit Intervall, Linie bei 1).
  - Methodenbox pro Hypothese (einklappbar): Modell, Kontrollen, Artefakt-Behandlung, Robustheitsvarianten.
  - Hinweis auf Präregistrierung und Hold-out.
- **Teamseite und Matchcenter:** Karte „Mentales Spielprofil“ (Reaktion auf Gegentor, Serienanfälligkeit, Druck) für Ulm und Gegner, nur bei ausreichender Verlässlichkeit.
- **Coach-Report:** höchstens ein Hinweis aus M10 pro Spiel, nur auf Team-Ebene, nur bei Urteil „bestätigt“ oder „Hinweis“. Beispiel: „Gegner X kassiert nach eigenen Toren überdurchschnittlich oft schnell den Ausgleich – direkt nach unseren Gegentoren konsequent weiterspielen.“
- **Lexikon:** Momentum, Rate Ratio, Fixed Effects (in Alltagssprache: „Vergleich des Teams mit sich selbst im selben Spiel“), Regression zur Mitte, Präregistrierung, konfirmatorisch/explorativ, Teststärke.
- **Lexikoneinträge mit Alias** (Beispielformulierungen):
  - **First Goal Against Effect** (umgangssprachlich „Dosenöffner“): Misst, ob ein Team nach dem ersten Gegentor häufiger Gegentore kassiert, als bei gleicher Toranzahl zu erwarten wäre. Teilwerte: *First Goal Against Timing* (0,50 = erstes Gegentor zum erwarteten Zeitpunkt) und *Subsequent Goals Against Rate* (1,00 = keine Veränderung nach dem ersten Gegentor).
  - **Deficit Resilience** (umgangssprachlich „Meltdown“ oder „Aufbäumen“): Misst, wie ein Team bei mindestens 3 Toren Rückstand spielt, verglichen mit dem, was seine Stärke erwarten lässt. 1,00 = wie erwartet. Teilwerte: *Deficit Offense Response* (eigene Tore) und *Deficit Defense Stability* (Gegentore; höher = weniger Gegentore als erwartet). Die Kennzahl beschreibt Leistung, nicht mentale Stärke.
- **Suche:** Die Aliasse „Dosenöffner“, „Meltdown“, „Aufbäumen“, „Resignation“ führen zu den jeweiligen Lexikoneinträgen.
- **Team- und Matchcenter-Karten:** First Goal Against Effect und Deficit Resilience für Ulm und den Gegner, gemäß den Mindeststichproben aus M10.4 G/H.

#### M10.11 Akzeptanzkriterien

- **Kalibrierung ohne Effekt:** Auf 200 synthetischen Ligen ohne Momentum liegt die Ablehnungsrate von H1/H2 bei α = 0,05 zwischen 3 % und 7 %.
- **Wiederfinden eines Effekts:** Bei injiziertem Momentum (RR = 1,5) wird der Effekt mit Intervall, das 1,5 enthält, in mindestens 90 % der synthetischen Ligen gefunden.
- **Stärke ≠ Momentum:** Synthetische Liga mit sehr unterschiedlich starken Teams, aber ohne Momentum → das Fixed-Effects-Modell findet keinen Effekt, ein naives Modell ohne `α[teamGame]` dagegen schon (Test dokumentiert genau den Grund für die Methode).
- **Timeout-Artefakt:** Synthetische Daten mit Regression zur Mitte, aber ohne echten Timeout-Effekt → gematchte Analyse (H6) findet keinen Effekt, ein Vorher-nachher-Vergleich schon.
- **Serientest:** Bei simulierten Spielen aus Modell A liegt der Serientest-p-Wert annähernd gleichverteilt.
- **Determinismus:** Zwei Builds mit gleichem Seed erzeugen identische `psychology`-Ausgaben.
- Präregistrierungsdatei existiert und ist vor dem ersten Lauf auf den Bestätigungssaisons committet (Build-Bericht prüft, ob der Commit der Präregistrierung älter ist als die erste Ausführung mit `--confirm`).

#### M10.12 CLI-Ergänzung

```bash
node scripts/build-league-model.mjs --only M10 --explore   # nur Explorationssaisons, Teststärke, Robustheit
node scripts/build-league-model.mjs --only M10 --confirm   # Bestätigungssaisons; bricht ab, wenn Präregistrierung fehlt oder uncommittet ist
node scripts/build-league-model.mjs --only M10 --final --write
```

---

## 5. Datenqualitäts-Korrekturen im bestehenden Dashboard

Unabhängig von den Modulen, als eigene kleine Aufgaben:

1. **Eigentore:** `goal_type === 'owngoal'` darf keinem Spieler als Tor gutgeschrieben werden und keinen Assist erzeugen. Betrifft Scorer-, Clutch-, Duo- und Hall-of-Fame-Werte. Vorher/nachher-Diff der betroffenen Spieler im PR dokumentieren.
2. **Penaltys:** `penalty_shot` als eigene Kennzahl ausweisen (Tore aus Penaltys), in Scorerwerten weiter enthalten.
3. **Zeitformat:** Kumulierte Zeit in Halbzeit 2 erkennen (siehe M0). Prüfen, ob `parseGameClock`/`goalieEventAbsSeconds` das bereits korrekt behandeln; falls nicht, korrigieren und Phasen- und Timing-Auswertungen neu prüfen.
4. **Timeouts:** Events werden in M0/M7 genutzt. Im Dashboard mindestens in der Spielansicht anzeigen.
5. **Datenstand:** Sichtbarer Hinweis „Daten bis Spieltag X (Datum)“.

---

## 6. Benutzeroberfläche und Informationsarchitektur

Durch die Module kommen sehr viele neue Kennzahlen hinzu. Die App darf dadurch **nicht voller** wirken, sondern muss **klarer** werden. Beim Öffnen soll niemand überfordert sein: Die wichtigste Aussage steht oben, Details sind einen Klick entfernt, Methodik zwei Klicks.

### 6.1 Ausgangslage

- Hauptnavigation mit 6 Punkten plus „Cover“ und „Excel“ (`_render`): Spieler, Team, Matchcenter, Lineup Builder, Einsatz-Center, Vergleichszentrum.
- Weitere Seiten ohne eigenen Navigationspunkt: Saison-Landingpage (derzeit fast leer), Hall of Fame, All-time-Spieler, Lexikon.
- Zwei getrennte Aufstellungswerkzeuge (Lineup Builder, Einsatz-Center) als eigene Hauptpunkte.
- Rund 500 Karten-Elemente im Code, viele Inline-Styles, nur 7 einklappbare Bereiche.
- Kopfzeile mit dichter Technik-Zeile („X Spiele geladen · Y Scorer · …“).

### 6.2 Leitprinzipien

1. **Eine Seite beantwortet eine Frage.** Jede Seite und jede Karte hat eine Frage als Überschrift oder Untertitel („Wie lief der Spieltag?“, „Wer ist bei Heidelberg gefährlich?“).
2. **Antwort zuerst.** Reihenfolge auf jeder Seite: Kernaussage (ein Satz) → 3–4 Kennzahl-Kacheln → Themenkarten → Details. Diagramme stützen die Aussage, sie ersetzen sie nicht.
3. **Drei Ebenen (Progressive Disclosure):**
   - **Ebene 1 – Überblick:** Kernaussage und Kacheln, sichtbar ohne Scrollen.
   - **Ebene 2 – Themen:** Karten bzw. Tabs zu einzelnen Fragen.
   - **Ebene 3 – Tiefe:** vollständige Tabellen, alle Spalten, Methodik, Robustheit – eingeklappt, in einer Seitenleiste oder auf einer Unterseite.
4. **Obergrenzen:**
   - Hauptnavigation: **5 Punkte**.
   - Übersicht: **höchstens 6 Karten**.
   - Pro Seite im sichtbaren Bereich: **höchstens 4 Kennzahl-Kacheln**.
   - Tabs pro Seite: **höchstens 5**.
   - Ranglisten: **Top 5** mit „Alle anzeigen“.
   - Tabellen: **höchstens 8 Spalten** in der Standardansicht, weitere über Spaltensets.
5. **Nichts Leeres zeigen.** Karten, für die Daten fehlen oder die Mindeststichprobe nicht erreicht ist, werden ausgeblendet oder zu einer einzeiligen Notiz („Ab 6 Spielen verfügbar“). Keine Karten mit „keine Daten“ als Hauptinhalt.
6. **Gleiche Dinge sehen gleich aus.** Alle Seiten nutzen dieselben Komponenten (6.5) und dieselbe Seitenvorlage (6.4).
7. **Kein doppelter Experten-Modus.** Statt einer „einfachen“ und einer „Experten“-Ansicht gibt es Ebenen. Methodik ist immer vorhanden, aber eingeklappt.

### 6.3 Informationsarchitektur

**Globale Kontextleiste** (fest oben, auf allen Seiten):
- Saison-Auswahl
- **Zeitpunkt-Auswahl** (`asOf`): „Aktuell“ oder „nach Spieltag X“, mit Hinweis, wenn nicht aktuell
- Datenstand („Daten bis Spieltag 7 · 12.04.2026“) und Hinweis bei veralteten Modelldaten
- Entwurfs-Hinweis, wenn der Vorschau-Modus aktiv ist
- **Globale Suche** (Tastenkürzel `/` oder `Strg+K`): Spieler, Teams, Spiele, Spieltage, Kennzahlen und Lexikon inklusive Aliasse („Dosenöffner“)

**Hauptnavigation (5 Punkte):**

| Punkt | Frage | Inhalte | Heute/bisher |
|---|---|---|---|
| **1. Übersicht** | Was ist gerade wichtig? | phasenabhängige Startseite (6.3.1) | ersetzt Cover als Startseite und die leere Saison-Landingpage |
| **2. Spieltage** | Wie lief es, was steht an? | Zeitleiste aller Spieltage; vergangene → Spieltagsseite (3.6.4) und Spielberichte; kommender → **Vorbereitung** (Matchcenter, Lineup Builder, Aufstellung eintragen) | Matchcenter, Lineup Builder, Einsatz-Center wandern hierher |
| **3. Team** | Wie steht unser Team da? | Kader (Spieler, Goalies), Entwicklung über die Saison, Aufstellungen und Reihen, Spielereffekte, Vereinsgeschichte (Hall of Fame, All-time, Rekorde) | Spieler, Team, Hall of Fame, All-time |
| **4. Liga & Gegner** | Wie steht die Liga, wie spielen die anderen? | Tabelle, Power Ranking, Tabellen-Wahrscheinlichkeiten, Spielplan-Schwierigkeit, Gegnerprofile (je Team eine Seite nach 6.4), ligaweite Ranglisten (Torschützen, Goalies), Wechsel-Radar, Liga-Rekorde | neu; Gegnerprofile heute verteilt im Matchcenter |
| **5. Labor** | Was lässt sich darüber hinaus herausfinden? | Suche und Split-Baukasten, Vergleichszentrum, Psychologie-Labor (M10), Modellgüte (M9) | Vergleichszentrum; neu |

**Werkzeugmenü** (Symbol rechts in der Kontextleiste, nicht in der Hauptnavigation): Lexikon, Daten und Import (Vorschau-Modus, Datenstand, Warnungen), Export, Einstellungen.

#### 6.3.1 Phasenabhängige Übersicht

Die Übersicht erkennt automatisch, wo man sich im Spieltag-Zyklus befindet, und zeigt höchstens 6 Karten:

| Phase | Erkennung | Karten (in dieser Reihenfolge) |
|---|---|---|
| **Nach dem Spieltag** | letzter Ulmer Spieltag abgeschlossen und jünger als 3 Tage, oder neuer Datenstand seit dem letzten Besuch | Spieltag-Kernaussage mit Link · Veränderungen durch den Spieltag · Spieler des Tages · Auffälligkeiten (M8) · Tabelle kompakt · nächster Spieltag (Datum, Gegner) |
| **Unter der Woche** | sonst | Formkurve · Power Ranking und Tabellen-Wahrscheinlichkeiten · Entwicklung ausgewählter Kennzahlen · Auffälligkeiten · letzter Spieltag kompakt · nächster Spieltag |
| **Vor dem Spieltag** | nächster Ulmer Spieltag in höchstens 5 Tagen (aus noch nicht beendeten Spielen der Saisondaten) | Vorschau beider Gegner mit Prognose · „Darauf achten“ (Top-3-Hinweise aus Matchcenter) · Aufstellung eintragen/planen · Formkurve · Tabelle kompakt · letzter Spieltag kompakt |
| **Saisonpause** | keine offenen Spiele | Saisonbilanz · Saison-Awards · Rekorde · Entwicklung über die Saisons |

„Neu seit deinem letzten Besuch“: Der zuletzt gesehene Datenstand wird im Browser gespeichert (reine Komfortfunktion, Entscheidung 10). Neue Inhalte erhalten eine dezente Markierung.

#### 6.3.2 Zuordnung der Module

| Modul | Ort in der App |
|---|---|
| M1 Teamstärke | Liga & Gegner (Power Ranking, Prognosen); Spieltage (Erwartung, Prognose) |
| M2 Schützenqualität | Liga & Gegner (Ranglisten); Spielerseiten (Perzentile) |
| M3 Goalie-Bewertung | Team → Goalies; Liga & Gegner (Goalie-Rangliste); Gegnerprofil |
| M4 Müdigkeit | Spieltagsseite (Spiel 1 vs. 2); Team → Entwicklung; Gegnerprofil |
| M5 Spielereffekte | Spielerseiten; Team → Kader; Gegnerprofil (Schlüsselspieler) |
| M6 Siegwahrscheinlichkeit | Spielbericht; Spieltagsseite |
| M7 Gegneranalyse | Gegnerprofil; Spieltage → Vorbereitung |
| M8 Auffälligkeiten | Übersicht; Spieltagsseite |
| M9 Modellgüte | Labor |
| M10 Psychologie | Labor → Psychologie-Labor; Teamseite und Gegnerprofil nur gemäß M10.8 |

### 6.4 Einheitliche Seitenvorlage für Objekte

Spieler, Goalie, Team, Gegner, Spiel und Spieltag nutzen dieselbe Struktur:

1. **Kopf:** Name/Bezeichnung, Kontext (Team, Saison, Rolle), Zeitpunkt aus der Kontextleiste.
2. **Kernaussage:** ein generierter Satz.
3. **Kacheln:** höchstens 4, jeweils mit Veränderung seit dem letzten Spieltag.
4. **Tabs** (höchstens 5, Standardreihenfolge): **Überblick** · **Entwicklung** (Verläufe über Spieltage und Saisons) · **Details** (Tabellen, Splits) · **Vergleich** (ähnliche Spieler/Teams, Perzentile) · **Methodik** (eingeklappt, Erklärung und Robustheit).
5. Tab-Zustand und Zeitpunkt stehen in der URL.

### 6.5 Komponentenbibliothek

Alle neuen und schrittweise alle bestehenden Darstellungen werden aus wenigen Komponenten gebaut (eigene Render-Funktionen mit festem Präfix, z. B. `ui…`, und CSS-Klassen statt Inline-Styles):

| Komponente | Inhalt | Regeln |
|---|---|---|
| **Kennzahl-Kachel** | Wert, Bezeichnung, Veränderung seit letztem Spieltag, `n`, Verlässlichkeit | Info-Symbol öffnet Lexikon-Kurzerklärung |
| **Kernaussage** | ein Satz, optional mit Link | höchstens 140 Zeichen |
| **Hinweis-Karte** | Beobachtung, Beleg (`n`, Effekt), Verlässlichkeit | beschreibend formuliert (M10.8) |
| **Rangliste** | Top 5, Balken, Link zum Objekt | „Alle anzeigen“ öffnet Tabelle |
| **Verlauf** | Sparkline bzw. Liniendiagramm über Spieltage | markiert den aktuellen `asOf`-Zeitpunkt |
| **Intervall-Balken** | Punktschätzer mit Intervall | einheitlich für alle Modelle |
| **Tabelle** | sortier- und filterbar, fester Kopf, Spaltensets („Basis“, „Erweitert“, „Modell“) | Zeilenklick öffnet Objektseite; CSV-Export je Tabelle |
| **Methodenbox** | Methode, Kontrollen, Stichprobe, Grenzen | standardmäßig eingeklappt |
| **Notiz** | einzeiliger Hinweis bei fehlenden Daten | ersetzt leere Karten |
| **Platzhalter** | Skelett während der Berechnung | keine blockierenden Ladebildschirme nach dem Start |

### 6.6 Visuelle Sprache für Zahlen und Unsicherheit

- **Verlässlichkeit** überall gleich: drei Stufen als Punktanzeige (●●● hoch, ●●○ mittel, ●○○ gering) plus Text im Tooltip. Werte mit geringer Verlässlichkeit werden **abgeschwächt** dargestellt, nicht versteckt.
- **Intervalle** immer als Balken bzw. „±“, nie nur als Zahl in Klammern in Kacheln.
- **Veränderungen:** ▲/▼ mit Wert; farbig nur, wenn die Veränderung über der Verlässlichkeitsschwelle liegt, sonst neutral.
- **Farbsemantik:** Die Vereinsfarbe Rot bleibt Markenfarbe (Akzente, Ulm-Hervorhebung). **Gut/schlecht wird nicht mit dem Marken-Rot codiert**, sondern mit einer separaten, farbenblind-tauglichen Skala. Ulm vs. Gegner bekommt eine eigene, feste Farbzuordnung.
- **Zahlenformat** deutsch (Komma), feste Nachkommastellen pro Kennzahltyp, Einheiten immer angegeben („Tore/Spiel“).
- **Diagramme:** ein Diagrammtyp pro Frage; Kleinmultiples statt überladener Einzeldiagramme; Achsen beschriftet; bestehendes dunkles Farbschema weiterverwenden.
- Bestehende Animationen (Hall-of-Fame-Intro, Pre-Match-Hintergrund) bleiben auf ihre Seiten beschränkt, blockieren nie Inhalte und respektieren `prefers-reduced-motion` (bereits vorhanden).

### 6.7 Mobil zuerst für den Spieltag-Zyklus

Zwischen den Spieltagen wird die App überwiegend am Smartphone geöffnet (z. B. aus einem Link in der Team-Gruppe). Deshalb:

- **Übersicht, Spieltagsseite, Spielbericht und Gegnerprofil** werden zuerst für schmale Bildschirme gestaltet.
- Hauptnavigation auf dem Smartphone als **untere Leiste** mit 5 Symbolen.
- Tabellen werden auf schmalen Bildschirmen zu Karten bzw. zeigen nur das Spaltenset „Basis“ mit horizontal fixierter erster Spalte.
- Tippflächen mindestens 44 × 44 px; keine Informationen nur per Hover.

### 6.8 Navigation und Adressen

- **Hash-Routing**, z. B. `#/25-26/spieltage/7`, `#/25-26/team/spieler/2424?tab=entwicklung&asOf=5`, `#/25-26/liga/gegner/fbc-heidelberg`, `#/labor/psychologie`.
- Zurück-Button, Lesezeichen und geteilte Links funktionieren; Neuladen stellt die Ansicht wieder her.
- Die bestehenden `setPage`-Aufrufe werden auf das Routing umgestellt; `S.page` wird aus der Adresse abgeleitet, nicht umgekehrt.
- Beim Öffnen ohne Adresse: Übersicht (bzw. zuletzt geöffnete Ansicht, wenn sie jünger als 1 Stunde ist).

### 6.9 Kennzahlen und Texte

- **Immer sichtbar:** `n` (Spiele), Verlässlichkeit, Intervall.
- **Verlässlichkeitsstufen** einheitlich definiert (in `stats.mjs` und im Dashboard gleich): z. B. gering bei Intervallbreite > 2 × |Effekt| oder `n` unter Mindestwert.
- **Keine Ranglisten** ohne Mindeststichprobe.
- **Erklärtexte** kurz und handlungsnah, z. B. „Heidelberg lässt im 2. Spiel des Tages in den letzten 10 Minuten deutlich nach (+1,2 Gegentore gegenüber Erwartung, 6 Spiele, Verlässlichkeit mittel).“
- **Lexikon im Kontext:** Jede Kennzahl hat ein Info-Symbol mit Kurzerklärung und Link zum vollständigen Lexikoneintrag. Neue Kennzahlen (TvE, WPA, Leverage, Spielereffekt, Schlussphasen-Index, Beteiligungsquote, Schrinkage, First Goal Against Effect, Deficit Resilience …) erhalten Einträge mit Laienerklärung und Grenzen.

### 6.10 Umbau bestehender Inhalte

- **Nichts geht verloren:** Jede bestehende Auswertung wird einem Ort in 6.3 zugeordnet. Die Zuordnung wird vor dem Umbau in `docs/ui-inventar.md` als Tabelle festgehalten (bestehende Render-Funktion → neuer Ort → Ebene 1/2/3).
- Auswertungen, die inhaltlich doppelt vorkommen, werden zusammengeführt; die Entscheidung wird im Inventar dokumentiert.
- Funktionen mit `LegacyUnused`/`DraftUnused` im Namen und doppelt definierte Funktionen (z. B. `rKpiTrendCompare`, `rComparisonDashboard`, `rComparisonCenterPage`, `rKPIVergleich`) werden nach Prüfung entfernt.
- Umbau schrittweise pro Hauptnavigationspunkt, jeweils mit Vorher/nachher-Screenshots im PR.

### 6.11 Akzeptanzkriterien für die Oberfläche

- Jedes Objekt (Spieler, Team, Spiel, Spieltag) ist in **höchstens 3 Klicks** oder über die Suche erreichbar.
- Übersicht: höchstens 6 Karten; Seiten: höchstens 4 Kacheln im sichtbaren Bereich; höchstens 5 Tabs.
- Jede Kennzahl hat Info-Symbol mit Lexikon-Kurzerklärung.
- Keine leere Karte in keinem Datenzustand (geprüft mit: Saisonbeginn ohne Spiele, Spieltag unvollständig, fehlende Modelldaten, `file://`).
- Darstellung ohne horizontales Scrollen der Seite bei 360 px Breite.
- Grundlegende Barrierefreiheit: Kontrast WCAG AA, Tastaturbedienung der Navigation und Tabs, `aria`-Beschriftungen für Diagramme.
- **Aufgabentest mit 3 Personen** (Trainer, Spieler, Chris) vor und nach dem Umbau, jeweils ohne Hilfe:
  1. „Wie lief der letzte Spieltag?“
  2. „Wer ist beim nächsten Gegner am gefährlichsten?“
  3. „Wie hat sich unser Goalie über die Saison entwickelt?“
  4. „Trage die Aufstellung für den nächsten Spieltag ein.“
  Erfasst werden Erfolg, benötigte Zeit und wahrgenommene Schwierigkeit (1–5). Nach dem Umbau darf keine Aufgabe schlechter abschneiden.

---

## 7. Statistische Leitlinien

1. **Schrinkage ist Standard** für jede Quote auf Spieler-, Goalie- oder Teamebene (Empirical Bayes oder Ridge).
2. **Unsicherheit:** 90-%-Intervalle, per Bootstrap über Spiele, wenn keine geschlossene Form verfügbar ist. Fester Seed.
3. **Konfundierung beachten:** Kadergröße, Gegnerstärke und Spielreihenfolge immer gemeinsam modellieren, nie einzeln roh interpretieren.
4. **Multiples Testen:** Automatisch erzeugte Hinweise (M8, Coach-Report) nur nach BH-Korrektur.
5. **Keine In-Sample-Güte als Qualitätsnachweis.** Güte nur aus Walk-forward (M9).
6. **Kaderpräsenz ≠ Einsatzzeit.** In allen Spielereffekt-Texten klar benennen.
7. **Keine Fangquote.** Ohne Schussdaten keine Save-%, keine xG, kein Corsi. Nicht approximieren, nicht so benennen.
8. **Reliabilität messen:** Für zentrale Spielerkennzahlen die Split-Half-Reliabilität (gerade/ungerade Spiele, Spearman-Brown-korrigiert) im Build-Bericht ausweisen und daraus die Mindeststichproben ableiten.

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

## Anhang A: Methoden aus Eishockey, Basketball, Fußball und Baseball

Diese Übersicht dient als **Ideen-Backlog**. Umsetzbarkeit bezieht sich auf unsere Daten: Tore mit Zeit, Schütze und einem Assist, Strafen, Timeouts, Kader, Ergebnisse, Ausrichter. Keine Schüsse, keine Einsatzzeiten, keine Positionsdaten.

Legende: ✅ direkt umsetzbar · 🟡 umsetzbar mit Anpassung · ❌ mit unseren Daten nicht möglich

### A.1 Teamstärke und Prognose

| Methode | Herkunft | Idee | Für uns | Modul |
|---|---|---|---|---|
| **Dixon-Coles-Modell** | Fußball | Poisson-Modell mit Angriff/Abwehr plus Korrektur für knappe Ergebnisse und Zeitgewichtung | ✅ Kern von M1; die Knappe-Ergebnisse-Korrektur ist bei ~8 Toren pro Team weniger wichtig | M1 |
| **Elo / Glicko** | Schach, ClubElo (Fußball), FiveThirtyEight (NBA) | Rating wird nach jedem Spiel aktualisiert; Glicko ergänzt eine Unsicherheit pro Team | ✅ Einfache, gut erklärbare Alternative und Baseline für M9; Elo-Verlauf als Grafik „Teamstärke über die Saisons“ | M1, M9 |
| **Pythagorean Expectation** | Baseball (Bill James), NHL | Erwartete Siegquote aus geschossenen und kassierten Toren: `GF^x / (GF^x + GA^x)` | ✅ Kennzahl „Glück“: tatsächliche Punkte gegenüber Erwartung. Exponent für unsere Liga per Fit bestimmen | M1, M7 |
| **Expected Points (xPts)** | Fußball | Erwartete Punkte aus Ergebniswahrscheinlichkeiten pro Spiel | ✅ „Verdiente Tabelle“ neben der echten Tabelle | M1 |
| **Log5** | Baseball | Siegwahrscheinlichkeit A gegen B aus den Siegquoten beider Teams | ✅ Sehr einfache Baseline für M9 | M9 |
| **Monte-Carlo-Saisonsimulation** | FiveThirtyEight, Opta | Restliche Spiele 10.000-mal simulieren → Wahrscheinlichkeit für jeden Tabellenplatz | ✅ „Wie wahrscheinlich ist Platz 3?“ ab Saisonmitte | neu, baut auf M1 |
| **Bradley-Terry** | Statistik, Sportranglisten | Paarvergleichsmodell für Sieg/Niederlage | 🟡 Poisson-Modell ist informativer, da Tore genutzt werden | – |

### A.2 Spielverlauf und Wichtigkeit von Situationen

| Methode | Herkunft | Idee | Für uns | Modul |
|---|---|---|---|---|
| **Win Probability / WPA** | Baseball, NFL, NBA | Siegwahrscheinlichkeit pro Zeitpunkt, Beitrag jedes Ereignisses | ✅ | M6 |
| **Leverage Index** | Baseball (Tom Tango) | Wie viel steht in einer Situation auf dem Spiel? | ✅ Welche Spieler treffen in wichtigen Momenten, unabhängig von der Anzahl der Tore | M6 |
| **Score Effects** | Eishockey | Teams spielen je nach Spielstand anders (Führende verteidigen, Zurückliegende riskieren mehr) | ✅ Tore und Gegentore nach Spielstand; Kennzahlen danach bereinigen | M7 |
| **Game State Analysis** | Fußball | Leistung getrennt nach Führung, Gleichstand, Rückstand | ✅ | M7 |
| **Markov-Ketten für Spielstände** | Baseball, Fußball | Übergänge zwischen Spielständen modellieren | 🟡 Poisson-Restspiel-Modell (M6) reicht zunächst | – |
| **Survival-Analyse (Kaplan-Meier, Cox)** | Medizin, in Sportanalytik für „Zeit bis zum Tor“ | Wie lange dauert es bis zum ersten Tor/Gegentor, und was beeinflusst das? | ✅ Statistisch saubere Version der bestehenden „First-Goal-Resistance“ der Goalies; auch „Zeit bis zur Antwort nach Gegentor“ | M3, M7 |

### A.3 Spielerbewertung

| Methode | Herkunft | Idee | Für uns | Modul |
|---|---|---|---|---|
| **On/Off-Splits** | Basketball | Teamleistung mit gegenüber ohne Spieler | ✅ auf Spielebene | M5 Stufe 1 |
| **RAPM** (Regularized Adjusted Plus-Minus) | Basketball, Eishockey | Ridge-Regression des Teamergebnisses auf alle beteiligten Spieler | 🟡 Auf Spielebene statt Schichtebene, da keine Einsatzzeiten | M5 Stufe 2 |
| **Box Plus-Minus / Statistical Plus-Minus** | Basketball | Plus-Minus aus Boxscore-Werten vorhersagen, als Prior für RAPM | ✅ Tore/Assists pro Spiel als Prior | M5 Stufe 2b |
| **GAR / WAR** (Goals/Wins Above Replacement) | Eishockey (Evolving Hockey), Baseball | Gesamtbeitrag in Toren bzw. Siegen gegenüber einem Ersatzspieler | 🟡 Aus M5-Effekten ableitbar: Effekt − Niveau eines typischen Ersatzspielers (z. B. 20. Perzentil), mal Spiele; Umrechnung Tore → Siege über Pythagorean | neu, baut auf M5 |
| **Game Score** | Basketball (Hollinger), Eishockey (Luszczyszyn) | Gewichtete Einzelspiel-Bewertung aus Boxscore-Werten | ✅ Gewichte (Tor, Assist, Strafminute, WPA) per Regression auf Spielausgang bestimmen; „Spieler des Spiels“ automatisch | neu |
| **Usage Rate / Beteiligungsquote** | Basketball | Anteil der Team-Aktionen, an denen ein Spieler beteiligt ist | ✅ (Tore + Assists) / Teamtore in Spielen mit Spieler | M7 |
| **Primary Points** | Eishockey | Tore + erste Assists (zweite Assists sind wenig stabil) | ✅ Unsere Daten haben ohnehin nur einen Assist | – |
| **Quality of Competition / Teammates (QoC/QoT)** | Eishockey | Wie stark waren Gegner und Mitspieler, wenn der Spieler dabei war? | ✅ Auf Spielebene: Ø Gegnerstärke (M1) und Ø Spielereffekt der Mitspieler (M5) | M5 |
| **Aging Curves** | alle Sportarten | Leistungsentwicklung nach Alter | 🟡 Kein Alter in den Daten; stattdessen **Erfahrungskurven** nach Anzahl Ligasaisons | neu |
| **Archetypen per Clustering** | Basketball (Positionless), Fußball | Spielertypen datenbasiert statt per Regel | ✅ Ergänzung zu den bestehenden regelbasierten Traits (`detectTypes`), z. B. Gaußsche Mischmodelle auf Stilprofilen | – |

### A.4 Stichprobe, Glück und Verlässlichkeit

| Methode | Herkunft | Idee | Für uns | Modul |
|---|---|---|---|---|
| **Regression to the Mean / Empirical Bayes** | Baseball (Tango), überall | Rohquoten Richtung Mittelwert schrumpfen, je kleiner die Stichprobe | ✅ Pflicht für alle Quoten | M2, M3, M5 |
| **Stabilisierungspunkte** | Baseball, Eishockey | Ab wie vielen Spielen misst eine Kennzahl eher Können als Zufall? | ✅ Split-Half-Reliabilität mit Spearman-Brown-Korrektur, bekannt aus der psychologischen Testtheorie | Abschnitt 7 |
| **Hot-Hand-Analyse** | Basketball (Gilovich; Korrektur Miller & Sanjurjo 2018) | Gibt es echte Serien oder nur Zufall? | ✅ Test, ob Tor-Serien häufiger als bei unabhängigen Spielen auftreten, mit der Bias-Korrektur | M8 |
| **PDO** | Eishockey | Schusseffizienz + Fangquote als Glücksindikator | ❌ keine Schüsse; Ersatz: Pythagorean-Abweichung und Ergebnis in engen Spielen | – |
| **Ergebnis in engen Spielen** | NFL, NHL | Bilanz in knappen Spielen ist stark zufallsgetrieben und kehrt zum Mittel zurück | ✅ Hinweis „Bilanz in knappen Spielen vermutlich nicht nachhaltig“ | M7, M8 |

### A.5 Belastung und Rahmenbedingungen

| Methode | Herkunft | Idee | Für uns | Modul |
|---|---|---|---|---|
| **Back-to-Back / Rest-Analyse** | NBA, NHL | Leistung ohne Ruhetag | ✅ 1. gegenüber 2. Spiel des Tages; Tage zwischen Spieltagen | M4 |
| **Reiseentfernung** | NBA, MLB | Einfluss langer Anreise | 🟡 nur mit einmalig gepflegten Hallenkoordinaten | M4 |
| **Heimvorteil** | alle | Vorteil in eigener Halle | ✅ als **Ausrichter-Vorteil** (Teams, die den Spieltag ausrichten) | M1 |
| **Squad Rotation / Belastungssteuerung** | Fußball | Minuten pro Spieler über die Saison | 🟡 Proxy über Kadergröße (Belastungsindex) | M4 |

### A.6 Netzwerke und Zusammenspiel

| Methode | Herkunft | Idee | Für uns | Modul |
|---|---|---|---|---|
| **Passnetzwerke** | Fußball | Wer spielt mit wem, wer ist Knotenpunkt? | 🟡 als **Assist-Netzwerk** (nur torgefährliche Pässe) | M7 |
| **Zentralitätsmaße** (Degree, Betweenness, PageRank) | Netzwerkanalyse | Wichtigkeit eines Spielers im Netzwerk | ✅ auf dem Assist-Netzwerk, bei kleinen Teams gewichteter Grad am robustesten | M7 |
| **Lineup-Net-Rating** | Basketball | Leistung bestimmter Fünfer- oder Dreier-Kombinationen | 🟡 nur mit echten Reihen aus dem Einsatz-Center, das aktuell keine echten Daten enthält | – |
| **Chemistry / Synergy (Duo-RAPM)** | Basketball | Mehrwert von Spielerpaaren über die Summe der Einzeleffekte hinaus | 🟡 Interaktionsterme in M5; ergänzt die bestehende Duo- und Anti-Synergie-Logik | M5 |

### A.7 Mit unseren Daten nicht möglich

| Methode | Warum nicht |
|---|---|
| **xG (Expected Goals)**, Shot Quality, High-Danger Chances | keine Schüsse, keine Schusspositionen |
| **Corsi / Fenwick** (Schussversuche) | keine Schussdaten |
| **Save-% / GSAx** (Goals Saved Above Expected) | keine Schüsse aufs Tor; M3 nutzt „Tore verhindert gegenüber Erwartung“ als ehrlich benannten Ersatz |
| **TOI-basierte Werte** (Punkte pro 60 Minuten, Schicht-RAPM) | keine Einsatzzeiten |
| **PPDA, Zone Entries, Tracking-Metriken** | keine Positions- oder Aktionsdaten |
| **Schiedsrichter-Analysen** | Schiedsrichterfelder in dieser Liga nicht gepflegt |

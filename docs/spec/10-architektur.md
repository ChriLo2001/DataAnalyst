# Architektur

> Teil von [docs/spec/index.md](index.md). Enthält Abschnitt 3 der ursprünglichen Spezifikation (Architektur, inkl. Zeitachse und Spieltag-Zyklus in 3.6). Voraussetzung: [00-grundlagen.md](00-grundlagen.md) (Leitprinzipien). Die Module in [module/](module/) bauen auf dieser Architektur auf.

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

**Weiter:** [module/index in docs/spec/index.md](index.md#module) · **Zurück:** [00-grundlagen.md](00-grundlagen.md)

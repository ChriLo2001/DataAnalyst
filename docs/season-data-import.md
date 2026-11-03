# Season-Data-Import (manuell, ohne Saisonmanager-API-Key)

Dieses Dokument beschreibt den **einzigen noch unterstützten Weg**, neue
Saisondaten in dieses Projekt zu bringen: manuell beschaffte Rohdaten →
Validierung → kontrolliertes Schreiben. Es gibt **keinen API-Key**, **keine
automatische Saisonmanager-Abfrage** und **keinen Browser-Scraper** in
GitHub Actions.

## Kurzfassung der Prinzipien

- **Kein API-Key erforderlich.** `scripts/import-season-data.mjs` stellt
  niemals eine Netzwerkverbindung zu `saisonmanager.de` her.
- **Saisonmanager wird nicht automatisch abgefragt.** Rohdaten müssen manuell
  beschafft werden (z. B. über die öffentliche Saisonmanager-Webseite) und als
  fertige JSON-Datei bereitgestellt werden.
- **Dry-Run ist Standard.** Ohne `--write` wird niemals etwas geschrieben.
- **`--write` ist explizit erforderlich**, um `season-data/<key>.json`
  tatsächlich zu verändern — und selbst dann nur, wenn alle
  Sicherheitsprüfungen bestehen.
- **Bekannte Game-IDs dürfen nicht automatisch verschwinden.** Fehlt in den
  neuen Rohdaten eine ID, die in der bisherigen Datei bereits vorhanden war,
  bricht das Tool hart ab — auch wenn die Gesamtanzahl der Spiele gleich
  bleibt (siehe Beispiel unten).
- **Kein automatischer Commit, kein automatischer Push.** Das Tool schreibt
  ausschließlich lokale Dateien. Commit/Push bleiben immer ein bewusster,
  manueller Schritt.
- **`file://`-Fallback bleibt erhalten.** `season-data-embedded.js` (ein
  klassisches Skript im Projektwurzelverzeichnis, per `<script src="season-data-embedded.js">`
  vor dem Anwendungscode in `index.html` eingebunden) enthält für jede
  archivierte Saison eine eingebettete Kopie in `window.STATIC_SEASON_DATA`,
  die greift, sobald `fetch()` auf `season-data/*.json` fehlschlägt (z. B. beim
  direkten Öffnen von `index.html` per Doppelklick). Seit Token-Diät Teil 2
  steht dieser Block **nicht mehr** in `index.html` selbst — dadurch bleibt
  `index.html` rund 1,5 MB statt vormals rund 3,9 MB, was jede Suche und
  Änderung an der Datei günstiger macht. Fehlt `season-data-embedded.js`
  (z. B. gelöscht oder noch nie erzeugt), verhält sich die App unter `file://`
  genau wie zuvor ganz ohne eingebettete Daten: ein Hinweis statt eines
  Fehlers, kein leerer Zustand.
- **Unter HTTP werden die externen JSON-Dateien automatisch bevorzugt.**
  `index.html` lädt `season-data/*.json` per `fetch()` und überschreibt damit
  bei Erfolg den eingebetteten Fallback zur Laufzeit — das ist bereits
  bestehendes, unverändertes Verhalten (`ensureExternalSeasonData()`).

## Der vollständige manuelle Workflow

1. **Rohdaten manuell aus Saisonmanager beschaffen** — z. B. über die
   öffentliche Ligaseite (`https://saisonmanager.de/fvbw/<liga>`), Spiel für
   Spiel, wie bereits für `25/26` durchgeführt. Ergebnis: ein JSON-Objekt
   `{ "season": "26/27", "label": "2026/27", "games": [...] }` mit den
   unveränderten Rohdaten pro Spiel (keine Normalisierung, keine Kürzung).
2. **Daten in eine temporäre JSON-Datei legen**, z. B.
   `./entwurf/26-27-neu.json` (außerhalb von `season-data/`, damit ein
   fehlgeschlagener Versuch nie versehentlich die echte Datei berührt).
3. **Dry-Run ausführen:**
   ```bash
   node scripts/import-season-data.mjs 26/27 ./entwurf/26-27-neu.json
   ```
4. **Ergebnis prüfen** — der Bericht zeigt u. a. bisherige/neue Spielanzahl,
   neue/entfernte/unveränderte Game-IDs (als Liste) und den
   Validierungsstatus. Bei `FEHLER`: Ursache beheben, Entwurf korrigieren,
   Dry-Run wiederholen. **Niemals** einen fehlschlagenden Dry-Run umgehen.
5. **Mit `--write` dauerhaft in `season-data/` schreiben** (nur wenn Schritt 4
   `OK` zeigte):
   ```bash
   node scripts/import-season-data.mjs 26/27 ./entwurf/26-27-neu.json --write
   ```
   Schreibt atomar (Temp-Datei + `rename`) nach `season-data/26-27.json` und
   pflegt danach automatisch `season-data/seasons.json` mit: existiert `26/27`
   dort schon, wird höchstens das `label` aktualisiert (sonst bleibt der
   Eintrag unangetastet); existiert er noch nicht, wird ein neuer Eintrag
   `{ key, label, file, status:"archived" }` angehängt. `status:"archived"`
   ist bewusst der einzige sichere Default — **keine** Saison wird dabei
   automatisch als `"current"` markiert oder ersetzt eine bestehende
   `"current"`-Saison. Ob `26/27` jetzt die aktuelle Saison ist, bleibt eine
   bewusste, manuelle Entscheidung (Schritt 8b unten).
6. **Mit `--update-embedded` den `file://`-Fallback aktualisieren:**
   ```bash
   node scripts/import-season-data.mjs 26/27 --update-embedded
   ```
   Liest die soeben geschriebene `season-data/26-27.json` und ersetzt (oder
   fügt bei einer erstmals eingebetteten Saison neu ein) ausschließlich den
   `window.STATIC_SEASON_DATA['26/27']`-Block in `season-data-embedded.js`.
   Alle anderen Saison-Blöcke in dieser Datei bleiben byte-identisch.
   **`index.html` wird von `--update-embedded` nicht mehr angefasst** (seit
   Token-Diät Teil 2). Fehlt `season-data-embedded.js` (z. B. neu geklonter
   Checkout), wird sie mit genau der einen eingebetteten Saison neu angelegt —
   kein Fehler, das wird im Bericht als "existierte noch nicht" genannt.

   Schritt 5 und 6 lassen sich auch in einem Lauf kombinieren:
   ```bash
   node scripts/import-season-data.mjs 26/27 ./entwurf/26-27-neu.json --write --update-embedded
   ```
7. **Tests ausführen:**
   ```bash
   node scripts/test-season-data-validators.mjs
   node scripts/test-import-season-data.mjs
   node scripts/test-embedded-season-data.mjs
   ```
8. **`git diff` prüfen** — insbesondere, dass in `season-data-embedded.js`
   wirklich nur der eine betroffene Saison-Block verändert wurde, dass
   `index.html` dabei **gar nicht** in der Änderungsliste auftaucht, dass
   `season-data/<key>.json` die erwarteten Spiele enthält, und (8b) **falls
   die neu importierte Saison jetzt die aktuelle ist**: in
   `season-data/seasons.json` von Hand `status` der neuen Saison auf
   `"current"` und der vorherigen aktuellen Saison auf `"archived"` setzen —
   das bleibt bewusst ein manueller Schritt, siehe oben.
9. **Manuell committen.**
10. **Manuell pushen.**

Kein Schritt in dieser Liste läuft automatisch ab — jeder wird bewusst und
einzeln vom Menschen ausgelöst.

## Sicherheitsprüfungen vor jedem Schreiben

`--write` schreibt **nur**, wenn alle folgenden Prüfungen bestehen
(technisch: `buildDryRunReport(...).ok === true`):

1. Der Season-Key hat das Format `"YY/YY"` mit aufeinanderfolgenden Jahren.
2. Der Wrapper hat die Form `{ season, label, games: [...] }`.
3. Jedes Spiel besteht die Strukturprüfung (siehe
   `scripts/season-data-validators.mjs`: u. a. `id`, `date`, `league_id`,
   `league_name`, `home_team_name`, `guest_team_name`, `started`, `ended`
   müssen vorhanden und vom richtigen Typ sein; `events`, `players`,
   `starting_players`, `awards`, `period_titles`, `result`, `result_string`,
   `notice_type` müssen als Felder existieren, dürfen aber leer/`null` sein —
   das deckt z. B. verschobene Spiele mit `"notice_type":"Postponed"` ab).
4. Keine doppelten Game-IDs innerhalb der neuen Datei.
5. **Exakter ID-Vergleich** zur bestehenden Datei: keine bereits bekannte
   Game-ID darf in der neuen Datei fehlen — unabhängig davon, ob die
   Gesamtanzahl gleich bleibt.

   Beispiel, das **fehlschlägt**, obwohl die Anzahl gleich bleibt:
   ```
   alt: [100, 101, 102]
   neu: [100, 101, 999]   -> FEHLER: 102 ist verschwunden
   ```
   Beispiel, das **funktioniert** (rein additiv):
   ```
   alt: [100, 101, 102]
   neu: [100, 101, 102, 103]   -> OK, 103 ist neu
   ```
6. `validateMergedSeason()` (unverändert aus `scripts/update-season-data.mjs`
   wiederverwendet) als zusätzliches Netz gegen einen drastischen, unerklärten
   Rückgang der Spielanzahl.

Schlägt auch nur eine dieser Prüfungen fehl, bricht das Tool **hart** ab —
es gibt kein automatisches Entfernen und kein `--allow-removals` (bewusst
nicht implementiert). In diesem Fall wird **nichts** geschrieben: weder
`season-data/<key>.json`, noch `season-data/seasons.json`, noch (bei
zusätzlichem `--update-embedded`) der `window.STATIC_SEASON_DATA`-Block in
`season-data-embedded.js`.

## Vorgehen für eine neue Saison (Beispiel `26/27`)

Sobald `26/27` echte Spiele hat, ist der Ablauf identisch zum obigen Workflow.
Da `season-data/26-27.json` anfangs noch nicht existiert, behandelt der
Dry-Run das als "bisherige Spielanzahl: 0" — jede eingereichte ID gilt dann
automatisch als neu, es gibt nichts, was verschwinden könnte. `--update-embedded`
erkennt in diesem Fall, dass `26/27` noch keinen `window.STATIC_SEASON_DATA`-Block
in `season-data-embedded.js` hat, und **fügt** ihn neu ein, statt einen
bestehenden zu ersetzen — auch das wird im Bericht klar benannt ("neu
eingefügt" statt "ersetzt"). Fehlt `season-data-embedded.js` als Ganzes (z. B.
allererster Lauf in einem frischen Checkout ohne die Datei), gilt dasselbe:
die Datei wird neu angelegt, kein Fehler.

## 14. Ein Spieltag ist gespielt — der Weg vom Spielbericht zur App

Dieser Abschnitt ist für den Samstagabend geschrieben, müde, am Handy oder am
Laptop, ohne dass man das Projekt im Kopf haben muss. Er beschreibt **nur**
den Fall "ein Spieltag der laufenden Saison ist vorbei, ich will die echten
Ergebnisse in die App bekommen" — nicht den Erstimport einer ganzen Saison
(der steht weiter oben).

**Der Engpass ist der Import, nicht die Aufstellung.** Die App leitet den
Kader für ein Spiel automatisch aus dem importierten Spielbericht ab
(`rawGames[].players[Seite]` — Vorname, Nachname, Trikotnummer, Position).
Es gibt keine separate Kaderdatei und keine Notwendigkeit, Spieler von Hand
einzutragen: sobald ein Spieltag importiert ist, zeigt das Einsatz-Center für
jedes Spiel dieses Spieltags automatisch eine Karte "📋 Saisonmanager-Kader
erkannt" mit allen gemeldeten Feld- und Torspielern zum Ein-Klick-Übernehmen.

### 14.1 Daten holen

1. Öffne die öffentliche Saisonmanager-Ligaseite des Verbands (Verbandsliga
   BW), die Spieltagsübersicht, den gerade gespielten Spieltag.
2. Für **jedes** Spiel dieses Spieltags (nicht nur die eigenen) das
   Spielprotokoll öffnen — genau wie beim ursprünglichen Saisonimport. Jedes
   Spiel liefert ein JSON-Objekt mit denselben Feldern wie die bereits
   vorhandenen Spiele in `season-data/26-27.json` (`id`, `date`, `events`,
   `players`, `result`, `result_string`, …).
3. Alle Spiele dieses einen Spieltags zu **einer** Datei zusammenfassen, im
   selben Wrapper wie beim Vollimport:
   ```json
   { "season": "26/27", "label": "2026/27", "games": [ /* nur die Spiele dieses Spieltags */ ] }
   ```
   **Wichtig, und anders als beim Erstimport:** diese Datei muss **nicht**
   die ganze Saison enthalten — nur den einen Spieltag. Das ist der ganze
   Sinn von `--merge` (siehe 14.2).

### 14.2 Dateiname und Ablageort

Wie beim Vollimport: außerhalb von `season-data/`, damit ein missglückter
Versuch nie versehentlich die echte Datei berührt. Empfohlenes Namensschema:

```
entwurf/26-27-spieltag<N>.json
```

Beispiel für den ersten Spieltag: `entwurf/26-27-spieltag1.json`.

### 14.3 Befehl

Erst **ohne** `--write` prüfen (reiner Dry-Run, verändert nichts):

```bash
node scripts/import-season-data.mjs 26/27 entwurf/26-27-spieltag1.json --merge
```

Steht am Ende **"Ergebnis: Dry-Run OK"**, derselbe Befehl mit `--write
--update-embedded`:

```bash
node scripts/import-season-data.mjs 26/27 entwurf/26-27-spieltag1.json --merge --write --update-embedded
```

`--merge` ist hier entscheidend — **ohne** `--merge` erwartet das Tool die
komplette Saison und bricht mit "Bekannte Game-ID(s) fehlen in der neuen
Datei" ab, sobald die Datei nur einen Spieltag enthält (das ist die
bestehende Sicherheitsprüfung aus Abschnitt "Sicherheitsprüfungen vor jedem
Schreiben" — sie bleibt bei `--merge` unverändert aktiv, geprüft wird nur
gegen das Ergebnis NACH dem Zusammenführen, nicht gegen die Teildatei allein,
siehe `scripts/import-season-data.mjs`, `buildMergeDryRunReport`).

**Was `--merge` tut:** jedes Spiel aus der Teildatei mit bereits bekannter
ID (z. B. eines, das vorher nur als geplant/"noch nicht ausgetragen" in
`season-data/26-27.json` stand) wird durch die neue Version **ersetzt**. Jede
noch nie gesehene ID wird **angehängt**. Kein bestehendes Spiel verschwindet
je — das bleibt dieselbe harte Regel wie beim Vollimport, nur gegen das
Merge-Ergebnis geprüft statt gegen die (zwangsläufig viel kleinere)
Teildatei.

**Verschlechterungsschutz:** `--merge` bricht zusätzlich ab, wenn ein
**ersetztes** Spiel (bekannte ID) inhaltlich ärmer würde als der bisherige
Stand — weniger Events, weniger gemeldete Spieler auf einer Seite, oder ein
verschwindender Endstand. Das fängt den Fall ab, dass eine ältere oder
halbfertige Datei über ein bereits vollständig importiertes Spiel gelegt
wird: die Spielanzahl bliebe gleich, der Verlust würde sonst niemandem
auffallen. Die Fehlermeldung nennt die betroffene Spiel-ID mit beiden Werten
(z. B. "Events: 16 -> 5"). Rein additive/verbessernde Ersetzungen sind davon
nie betroffen und laufen unverändert ohne Zusatzflag durch.

Für eine **bewusste** Korrektur (z. B. ein Spielbericht wurde fälschlich zu
reichhaltig importiert und muss zurückgesetzt werden) erzwingt
`--allow-downgrade` die Übernahme trotzdem:

```bash
node scripts/import-season-data.mjs 26/27 entwurf/26-27-korrektur.json --merge --allow-downgrade --write --update-embedded
```

Das Flag gilt nur für diesen einen Lauf (keine Datei, keine Dauereinstellung)
und wird im Bericht als Warnung mit der betroffenen ID genannt — nie
stillschweigend.

### 14.4 Woran du erkennst, dass es geklappt hat

Die Konsole zeigt nach `--write`:

```
Ergebnis: Validierung OK — season-data/<key>.json wird jetzt mit dem Merge-Ergebnis überschrieben.
--write: season-data/26-27.json geschrieben (56 Spiele, davon 0 neu/6 aktualisiert durch diesen Teilimport). Kein Commit, kein Push.
--write: season-data/seasons.json war bereits konsistent, keine Änderung nötig.
--update-embedded: window.STATIC_SEASON_DATA['26/27'] in season-data-embedded.js ersetzt (56 Spiele). …
```

Die Gesamtzahl der Spiele (hier 56) bleibt **gleich** — nur "aktualisiert"
wächst um die Anzahl der Spiele des gerade importierten Spieltags, "neu" ist
bei einem bereits vollständig geplanten Spielplan normalerweise 0. Steht
stattdessen "FEHLER" da, wurde **nichts** geschrieben — Ursache lesen (die
Fehlerliste nennt konkrete Game-IDs/Probleme), Teildatei korrigieren,
Dry-Run wiederholen.

Danach in der App (lokaler Server, `node scripts/serve.mjs`, siehe oben):
Spieltagsseite des importierten Spieltags zeigt jetzt den echten Endstand
statt "noch nicht ausgetragen"; Einsatz-Center → betroffenes Spiel öffnen →
die Karte "📋 Saisonmanager-Kader erkannt" zeigt die gemeldeten Spieler.

### 14.5 Die vollständige Befehlsfolge

In dieser Reihenfolge abarbeiten:

1. `node scripts/import-season-data.mjs 26/27 entwurf/26-27-spieltagN.json --merge` (Dry-Run, prüfen)
2. `node scripts/import-season-data.mjs 26/27 entwurf/26-27-spieltagN.json --merge --write --update-embedded` (schreibt `season-data/26-27.json`, pflegt `season-data/seasons.json` mit, bettet in `season-data-embedded.js` ein)
3. `node scripts/test-import-season-data.mjs` und `node scripts/test-embedded-season-data.mjs` (bestätigen, dass nichts an der Validierungs-/Einbettungslogik überraschend kaputt ist — unabhängig von den konkret importierten Daten)
4. `git diff` prüfen: nur `season-data/26-27.json` und `season-data-embedded.js` sollten sich geändert haben, mit genau den erwarteten Spielen
5. **Heute optional, aber nicht auf Dauer:** `node scripts/build-league-model.mjs --write --replicates 200 --seed 1` — aktualisiert `model-data/` (M1–M4, Liga-Modell). Solange kein in der Oberfläche sichtbares Feature `model-data/` ausliest, ändert ein Auslassen dieses Schritts nichts an dem, was in der App zu sehen ist, und kann jederzeit später nachgeholt werden. Das gilt **nur bis M5–M9 in der Oberfläche hängen** — sobald eines dieser Module echte `model-data/`-Werte anzeigt, wird dieser Schritt Pflicht und gehört dann fest in diese Liste (nicht mehr als Punkt 5, sondern vor Schritt 3).
6. **Nicht nötig:** `node scripts/build-index-map.mjs` — ein reiner Datenimport verändert `index.html` nicht, die Karte bleibt aktuell.
7. **Nicht nötig für die laufende Saison, bewusst so:** `scripts/p0a-baseline-golden-values.json` auffrischen — die Golden-Baseline deckt ausschließlich **abgeschlossene** Saisons ab (aktuell `21/22` bis `25/26`, siehe `EXPECTED_SEASONS` in `scripts/test-p0a-baseline.mjs`). `26/27` wird dort erst ergänzt, wenn die Saison zu Ende ist und archiviert wird — nicht während der laufenden Saison, auch nicht nach jedem Spieltag.
8. Manuell committen.
9. Manuell pushen.

### 14.6 Geprüft am simulierten Fall

Mit einem realistischen Spielbericht für Spieltag 1 der Saison 26/27 (alle 6
Spiele, echte Ereignis-/Kaderstruktur, gegen eine isolierte Kopie von
`season-data/` getestet, NICHT gegen die echte Datei) bestätigt:

- Dry-Run meldet korrekt 56 Spiele vorher, 6 in der Teildatei, 56 nach dem
  Merge, davon 6 aktualisiert, 0 neu, 0 Fehler.
- Nach `--write`: alle 56 Spiele weiterhin vorhanden, die 6 Spiele des
  Spieltags tragen jetzt Endstand/Events/Kader, alle anderen Spieltage exakt
  unverändert.
- `deriveLineupUlmPlayerIds('26/27')` liefert vorher **0** Spieler-IDs,
  nachher die 7 real gemeldeten (6 Feld + 1 Torwart).
- `getSeasonmanagerRosterSuggestion('26/27', 63384)` liefert vorher `null`,
  nachher die vollständige Kaderliste mit Namen und Trikotnummern — genau die
  Karte, die im Einsatz-Center als Ein-Klick-Übernahme erscheint.

## Was dieses Tool bewusst NICHT tut

- Es entscheidet **nicht selbst**, welche Saison `"current"` ist. `--write`
  legt einen neuen Manifest-Eintrag ausschließlich mit `status:"archived"`
  an bzw. lässt den `status` eines bestehenden Eintrags unangetastet — das
  Umschalten auf `"current"` bleibt ein bewusster, manueller Schritt (siehe
  Workflow-Schritt 8b).
- Es committet und pusht nichts.
- Es verändert `scripts/update-season-data.mjs` nicht — dieses bleibt als
  alter, API-basierter Pfad unverändert bestehen (für den hypothetischen
  Fall eines künftigen autorisierten API-Keys), wird aber im aktuellen
  Zielzustand nicht mehr verwendet (`schedule`-Trigger im zugehörigen
  GitHub-Workflow ist bereits deaktiviert).

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
- **`file://`-Fallback bleibt erhalten.** `index.html` enthält für jede
  archivierte Saison eine eingebettete Kopie in `STATIC_SEASON_DATA`, die
  greift, sobald `fetch()` auf `season-data/*.json` fehlschlägt (z. B. beim
  direkten Öffnen der Datei per Doppelklick).
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
   `STATIC_SEASON_DATA['26/27']`-Block in `index.html`. Alle anderen
   Saison-Blöcke sowie der gesamte übrige HTML-/CSS-/JS-Code bleiben
   byte-identisch.

   Schritt 5 und 6 lassen sich auch in einem Lauf kombinieren:
   ```bash
   node scripts/import-season-data.mjs 26/27 ./entwurf/26-27-neu.json --write --update-embedded
   ```
7. **Tests ausführen:**
   ```bash
   node scripts/test-season-data-validators.mjs
   node scripts/test-import-season-data.mjs
   ```
8. **`git diff` prüfen** — insbesondere, dass in `index.html` wirklich nur
   der eine betroffene `STATIC_SEASON_DATA`-Block verändert wurde, dass
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
zusätzlichem `--update-embedded`) der `STATIC_SEASON_DATA`-Block in
`index.html`.

## Vorgehen für eine neue Saison (Beispiel `26/27`)

Sobald `26/27` echte Spiele hat, ist der Ablauf identisch zum obigen Workflow.
Da `season-data/26-27.json` anfangs noch nicht existiert, behandelt der
Dry-Run das als "bisherige Spielanzahl: 0" — jede eingereichte ID gilt dann
automatisch als neu, es gibt nichts, was verschwinden könnte. `--update-embedded`
erkennt in diesem Fall, dass `26/27` noch keinen `STATIC_SEASON_DATA`-Block
hat, und **fügt** ihn neu ein, statt einen bestehenden zu ersetzen — auch das
wird im Bericht klar benannt ("neu eingefügt" statt "ersetzt").

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

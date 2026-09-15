# Lineup-Data Integrity Checker (Phase 3.5)

`scripts/check-lineup-data-integrity.mjs` ist ein **rein lesendes**
Diagnose-Werkzeug. Es findet Inkonsistenzen zwischen `lineup-data/*.json`,
`season-data/*.json` und `lineup-data/groups.json` und meldet sie — es
**verändert, repariert, migriert, ergänzt oder löscht niemals irgendetwas**.
Es gibt bewusst **keine `--fix`-Option**.

## Warum

`season-data` (objektive Saisonmanager-Daten) und `lineup-data` (manuell
bestätigte Einsatzdaten) sind zwei getrennte Datenbasen (siehe
`docs/lineup-data-import.md`). Sie können über die Zeit auseinanderlaufen —
z. B. wenn `season-data` nachträglich korrigiert wird, oder wenn ein
`lineup-data`-Eintrag auf eine `groupId` verweist, die (noch) nicht in
`lineup-data/groups.json` registriert ist. Der Importer (`import-lineup-data.mjs`)
verhindert das bei JEDEM einzelnen Schreibvorgang — dieser Checker prüft
zusätzlich den **gesamten aktuellen Stand** aller Dateien zusammen, unabhängig
davon, wann/wie sie entstanden sind.

## Prüfregeln

Für jede vorhandene `lineup-data/<season>.json`:

1. **Season** — `data.season` muss zum Dateinamen passen
   (`SEASON_MISMATCH`); `season-data/<season>.json` muss existieren und
   lesbar sein (`MISSING_SEASON_DATA`).
2. **Game-IDs** — jede `games[].gameId` muss in `season-data/<season>.json`
   existieren (`UNKNOWN_GAME_ID`). Referenziert ein Spiel eine `gameId`, die
   in `season-data` als `notice_type:"Postponed"` markiert ist, wird das nur
   als **Warnung** gemeldet (`POSTPONED_GAME_REFERENCED`) — das Spiel
   existiert ja, es ist nur bewusst kein Fehler, sondern eine
   Kenntnisnahme (siehe "Bewusste Entscheidungen" unten).
3. **Player-IDs** — geprüft in `roster.field`, `roster.goalies`,
   `groups[].players[].playerId` und `confirmedCombinations[].players`. Jede
   muss (a) das Format `api:<id>` haben (`INVALID_PLAYER_ID_FORMAT`) und (b)
   aus den rohen Saisonmanager-Spielerdaten dieser Saison ableitbar sein
   (`UNKNOWN_PLAYER_ID`, via `derivePlayerIdsFromSeasonGames()` aus
   `scripts/lineup-data-validators.mjs` — **nicht** aus `index.html` oder
   `PLAYER_REGISTRY`).
4. **Group-IDs** — jede in `groups[].groupId` und
   `confirmedCombinations[].groupId` verwendete ID muss eine gültige UUIDv4
   sein (`INVALID_GROUP_UUID`) und in `lineup-data/groups.json` existieren
   (`UNKNOWN_GROUP_ID`).
5. **Registry `createdInGame`** — für jeden `groups.json`-Eintrag: `createdInSeason`
   muss ein gültiges Format haben (`REGISTRY_INVALID_CREATED_SEASON_FORMAT`)
   und eine existierende `season-data`-Datei referenzieren
   (`REGISTRY_UNKNOWN_CREATED_SEASON`); `createdInGame` muss in dieser Saison
   existieren (`REGISTRY_UNKNOWN_CREATED_GAME`).
6. **Registry `nameHistory`** — muss strukturell ein Array sein
   (`REGISTRY_INVALID_NAME_HISTORY`); jedes `since.season` muss eine bekannte
   Saison sein (`REGISTRY_UNKNOWN_HISTORY_SEASON`), jedes `since.gameId` muss
   in dieser Saison existieren (`REGISTRY_UNKNOWN_HISTORY_GAME`).
7. **Cross-Season** — `groups.json` ist clubweit. Eine `groupId` darf in
   mehreren Saisons verwendet werden, unabhängig von ihrer `createdInSeason`.
   Der Checker verlangt an **keiner** Stelle, dass eine Gruppe nur innerhalb
   ihrer `createdInSeason` referenziert werden darf.

## Bewusste Entscheidungen (dokumentiert, nicht "einfach entschieden")

Der Auftrag hat für Punkt 2 ausdrücklich offengelassen, ob ein
Warnungs-Fall gewünscht ist ("falls gewünscht, aber nur dokumentieren").
Zwei Warnungen wurden ergänzt, beide rein informativ, blockieren nichts,
lösen keine Aktion aus:

- **`POSTPONED_GAME_REFERENCED`** — eine referenzierte `gameId` existiert in
  `season-data`, ist dort aber als `"Postponed"` markiert. Das ist kein
  struktureller Fehler (das Spiel existiert), aber erwähnenswert, weil
  Einsatzdaten zu einem nie gespielten Spiel ungewöhnlich wären.
- **`UNUSED_REGISTRY_GROUP`** — ein `groups.json`-Eintrag wird in keiner der
  geprüften `lineup-data`-Dateien referenziert. Nur relevant/aussagekräftig,
  wenn **alle** Saisons geprüft wurden — bei `--season` wird diese Warnung
  deshalb unterdrückt (siehe unten), sonst würde jede Gruppe, die nur in
  einer anderen, gerade nicht geprüften Saison verwendet wird, fälschlich als
  "ungenutzt" erscheinen.

**`--season`-Filter und Registry:** schränkt ausschließlich ein, welche
`lineup-data/<season>.json` geladen/geprüft wird. Die Registry-Prüfungen
(Punkte 5+6) laufen davon unabhängig **immer vollständig**, weil `groups.json`
clubweit ist (Punkt 7) — ein Teilcheck der Registry nur für eine Saison könnte
echte Probleme in anderen Saisons verdecken.

## Error-Codes (stabil, maschinenlesbar via `--json`)

| Code | Bedeutung |
|---|---|
| `MISSING_GROUPS_REGISTRY` | `lineup-data/groups.json` fehlt/nicht lesbar |
| `INVALID_LINEUP_FILE` | `lineup-data/<season>.json` fehlt/kaputt/keine Grundstruktur |
| `SEASON_MISMATCH` | `season`-Feld passt nicht zum Dateinamen |
| `MISSING_SEASON_DATA` | `season-data/<season>.json` fehlt/nicht lesbar |
| `UNKNOWN_GAME_ID` | `gameId` nicht in `season-data` |
| `INVALID_PLAYER_ID_FORMAT` | Player-ID nicht im Format `api:<id>` |
| `UNKNOWN_PLAYER_ID` | Player-ID nicht aus `season-data` ableitbar |
| `INVALID_GROUP_UUID` | `groupId` keine gültige UUIDv4 |
| `UNKNOWN_GROUP_ID` | `groupId` nicht in `groups.json` |
| `REGISTRY_INVALID_CREATED_SEASON_FORMAT` | `createdInSeason`-Format ungültig |
| `REGISTRY_UNKNOWN_CREATED_SEASON` | `createdInSeason` ohne `season-data` |
| `REGISTRY_UNKNOWN_CREATED_GAME` | `createdInGame` nicht in dieser Saison |
| `REGISTRY_INVALID_NAME_HISTORY` | `nameHistory` strukturell ungültig |
| `REGISTRY_UNKNOWN_HISTORY_SEASON` | `nameHistory[].since.season` unbekannt |
| `REGISTRY_UNKNOWN_HISTORY_GAME` | `nameHistory[].since.gameId` unbekannt |
| `POSTPONED_GAME_REFERENCED` *(Warnung)* | referenziertes Spiel ist "Postponed" |
| `UNUSED_REGISTRY_GROUP` *(Warnung)* | Registry-Eintrag wird nirgends verwendet |

Jeder Eintrag enthält zusätzlich `season`/`gameId`/`groupId`/`playerId`,
soweit zutreffend, plus eine lesbare `message`.

## CLI

```bash
node scripts/check-lineup-data-integrity.mjs                  # alle Saisons, Textbericht
node scripts/check-lineup-data-integrity.mjs --season 25-26   # nur diese Saison
node scripts/check-lineup-data-integrity.mjs --json           # maschinenlesbar
```

Es gibt **keine Schreiboption** — insbesondere kein `--fix`.

## Ergebnisformat

```json
{
  "ok": false,
  "errors": [{ "code": "UNKNOWN_GAME_ID", "season": "25/26", "gameId": 44399, "message": "…" }],
  "warnings": [],
  "summary": { "seasonsChecked": 1, "gamesChecked": 3, "groupsChecked": 2, "combinationsChecked": 1, "playersChecked": 12 }
}
```

## Bestätigter Nebenfund aus Phase 3 (nicht behoben, außerhalb des Scopes)

Beim erneuten, rein lesenden Prüfen zur Bestätigung: `scripts/update-season-data.mjs`
deklariert `writeJsonAtomic` ohne `export` (Zeile 87: `async function
writeJsonAtomic(...)`), während `scripts/import-season-data.mjs` (Zeile 63)
`import { writeJsonAtomic } from './update-season-data.mjs'` versucht. Unter
echtem Node.js würde das Laden dieses Moduls mit einem `SyntaxError`
fehlschlagen ("does not provide an export named 'writeJsonAtomic'"). Der Fund
ist bestätigt, betrifft aber `season-data`-Tooling, nicht `lineup-data` — in
Phase 3.5 wurde daher **nichts** an diesen Dateien geändert.

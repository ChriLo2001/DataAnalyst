# Lineup-Data-Import (Einsatz-Center, Phase 3)

Dieses Dokument beschreibt den sicheren, API-freien Importer für
`lineup-data/<season>.json` und `lineup-data/groups.json`:
`scripts/import-lineup-data.mjs`. Es gibt **kein Browser-Einsatz-Center**
(das ist eine spätere Phase) — dieser Importer nimmt einen bereits fertigen
**Draft** (JSON-Datei) entgegen, validiert ihn und schreibt ihn erst nach
expliziter Bestätigung (`--write`) sicher weg.

## Architektur

```
Browser Einsatz-Center (spätere Phase, existiert noch nicht)
  → Export-Draft (JSON-Datei)
  → node scripts/import-lineup-data.mjs <seasonKey> --input <draft.json>
  → Validierung (bestehende Phase-1-Validatoren, unverändert wiederverwendet)
  → baseHash-Prüfung (scripts/lineup-data-hash.mjs)
  → ID-/Cross-File-Integritätsprüfung gegen season-data/<seasonKey>.json + groups.json
  → Diff-Bericht (Dry-Run, Standard)
  → NUR mit --write: atomisches Schreiben
  → manuelle Git-Kontrolle (kein Auto-Commit, kein Auto-Push)
```

Die Kernlogik (`validateDraftShape`, `mergeGames`, `mergeRegistryGroups`,
`buildImportPlan`, `formatImportReport`) ist bewusst als reine, exportierte
Funktionen ohne Dateisystemzugriff implementiert — genau wie bei
`scripts/import-season-data.mjs`. `buildImportPlan()` nutzt dafür
ausschließlich die **unveränderten** Phase-1-Validatoren aus
`scripts/lineup-data-validators.mjs` (`validateLineupSeasonData`,
`validateGroupRegistry`, `crossValidateGamesAgainstSeasonData`,
`crossValidateGroupReferences`, `derivePlayerIdsFromSeasonGames`,
`findDuplicateLineupGameIds`, `findDuplicateGroupIds`) — dieses Modul wurde
für Phase 3 **nicht** verändert.

## Draft-Schema

```json
{
  "schemaVersion": 1,
  "season": "25/26",
  "baseHash": "<64-stelliger SHA-256-Hex-Digest, siehe unten>",
  "games": [
    {
      "gameId": 44372,
      "roster": { "field": ["api:9001"], "goalies": ["api:9010"] },
      "groups": [ { "groupId": "…", "name": "…", "type": "trio", "players": [...], "notes": "" } ],
      "confirmedCombinations": [ { "players": ["api:9001","api:9002","api:9003"], "groupId": "…", "note": "" } ],
      "note": ""
    }
  ],
  "groups": [
    { "groupId": "…", "currentName": "…", "createdInSeason": "25/26", "createdInGame": 44372, "nameHistory": [...] }
  ]
}
```

Wichtige Eigenschaften, bewusst so gewählt, um das Modell einfach zu halten:

- **`games`** enthält NUR die vom Draft neuen/geänderten Spiele, nicht
  zwingend die komplette Datei. Ein Spiel-Eintrag hat exakt dieselbe Form wie
  ein Eintrag in `lineup-data/<season>.json` (siehe
  `docs/season-data-import.md`-Pendant für die Games-Ebene).
- **`groups`** ist optional (kann fehlen oder `[]` sein) und enthält NUR
  neue/geänderte Registry-Einträge, in exakt derselben Form wie ein Eintrag
  in `lineup-data/groups.json` — **kein separates, abweichendes Format** für
  Registry-Änderungen, um das Draft-Schema auf eine einzige, durchgängige
  Update-Semantik zu beschränken.
- Für beide gilt dieselbe Regel: bekannte ID (`gameId`/`groupId`) →
  **vollständiger Ersatz** des Eintrags, **kein Feld-Merge**. Unbekannte ID →
  wird hinzugefügt. Ein bestehender, im Draft nicht erwähnter Eintrag bleibt
  unangetastet erhalten — es gibt in Phase 3 **keinen Lösch-Mechanismus**.
- Unbekannte Top-Level-Felder im Draft (z. B. ein erfundenes
  `"removedGameIds"`) sind ein harter Fehler — das verhindert nebenbei auch
  jeden Versuch, über ein nicht dokumentiertes Feld eine Löschung
  "einzuschmuggeln".

## BaseHash

**Zweck:** erkennen, ob sich `lineup-data/<season>.json` oder
`lineup-data/groups.json` seit der Draft-Erstellung verändert haben (z. B.
weil in der Zwischenzeit ein anderer Import bereits geschrieben hat).

**Definition** (siehe `scripts/lineup-data-hash.mjs`):

```
baseHash = SHA256_Hex( canonicalJson(seasonData) + "\n" + canonicalJson(registryData) )
```

- `seasonData` = vollständiger, geparster Inhalt von
  `lineup-data/<season>.json` **zum Zeitpunkt der Draft-Erstellung**. Existiert
  die Datei noch nicht (brandneue Saison), ist die Basis das synthetische
  Dokument `{schemaVersion:1, season:"<key>", games:[]}`.
- `registryData` = vollständiger, geparster Inhalt von
  `lineup-data/groups.json` zum selben Zeitpunkt.
- **Ein einzelner, kombinierter Hash** über beide Dateien (nicht zwei
  getrennte Hashes) — das hält das Draft-Schema auf ein einziges
  `baseHash`-Feld beschränkt (siehe Auftrag: "Struktur möglichst einfach
  halten"). Ein Draft, der nur Spiele ändert, hängt damit auch implizit vom
  aktuellen Registry-Stand ab (und umgekehrt) — das ist beabsichtigt, da ein
  Spiel-Draft potenziell neue Gruppen-Referenzen einführen könnte.
- **`canonicalJson`**: deterministische JSON-Serialisierung — Objekt-Schlüssel
  werden rekursiv alphabetisch sortiert, keine Leerzeichen, Array-Reihenfolge
  bleibt erhalten. Macht den Hash unabhängig von zufälliger
  Schlüssel-Reihenfolge beim Parsen/Erzeugen eines Objekts, aber abhängig vom
  tatsächlichen Inhalt. **Kein Timestamp, kein Zufallswert** — reiner
  Inhalts-Hash.
- **Algorithmus:** SHA-256 über `globalThis.crypto.subtle.digest(...)` (Web
  Crypto API) — **kein** `node:crypto`-Import. Dadurch läuft exakt derselbe
  Code unverändert sowohl im Node-Importer als auch später im
  Browser-Einsatz-Center (Web Crypto ist in Node seit Version 19 global
  verfügbar, in jedem modernen Browser über einen "secure context", wozu
  auch `http://localhost` zählt).

**So berechnet der Browser später denselben Hash:** `lineup-data/<season>.json`
und `lineup-data/groups.json` per `fetch()` laden, `JSON.parse()`, dann exakt
`computeBaseHash(seasonData, registryData)` aus
`scripts/lineup-data-hash.mjs` aufrufen (dasselbe Modul kann unverändert in
einer künftigen Browser-Seite eingebunden werden, es hat keine
Node-spezifischen Abhängigkeiten).

## Dry-Run-Verhalten (Standard)

```bash
node scripts/import-lineup-data.mjs 25/26 --input draft.json
```

Ohne `--write` wird **niemals** etwas geschrieben — unabhängig vom
Validierungsergebnis. Ausgabe ist ein Bericht mit Validierungsstatus und Diff
(siehe unten).

## Write-Verhalten

```bash
node scripts/import-lineup-data.mjs 25/26 --input draft.json --write
```

Ablauf (siehe `buildImportPlan()`/`main()`):

1. Draft + bestehende `lineup-data/<season>.json` + bestehende
   `lineup-data/groups.json` + `season-data/<season>.json` laden.
2. Bestehende `lineup-data`-Dateien werden vor jeder Änderung selbst noch
   einmal strukturell validiert (Schutz gegen "auf kaputtem Zustand
   aufbauen").
3. Draft-Hülle prüfen (`schemaVersion`, `season`, `baseHash` vorhanden).
4. `baseHash` gegen den aktuellen Stand vergleichen.
5. Draft-interne Duplikate (`gameId`/`groupId`) prüfen.
6. Jede `gameId` im Draft gegen `season-data/<season>.json` prüfen.
7. Merge im Speicher (`mergeGames`/`mergeRegistryGroups`).
8. **Finalen, gemergten Zustand** erneut vollständig mit den unveränderten
   Phase-1-Validatoren prüfen (`validateLineupSeasonData`,
   `validateGroupRegistry`, `crossValidateGamesAgainstSeasonData`,
   `crossValidateGroupReferences`).
9. Nur wenn ALLES fehlerfrei ist (`plan.ok === true`): `lineup-data/<season>.json`
   atomar schreiben (Temp-Datei + `rename`), und `lineup-data/groups.json`
   ebenso — aber **nur, wenn sich die Registry tatsächlich geändert hat**.

`lineup-data/seasons.json` (season-übergreifendes Manifest, falls es das
später gibt) und `season-data/seasons.json` werden von diesem Importer **nie**
angefasst — `lineup-data` ist eine eigenständige Datenbasis, komplett getrennt
von `season-data`.

## Delete-Schutz

Es gibt in Phase 3 **keinen Lösch-Mechanismus**. Ein Draft, der ein
bestehendes Spiel/eine bestehende Gruppe einfach nicht erwähnt, lässt es
unangetastet — das ist der normale Weg für einen Teil-Draft. Ein Versuch,
eine Entfernung **explizit** zu signalisieren (z. B. ein erfundenes Feld wie
`"removedGameIds"`), scheitert automatisch am generischen
Unbekannte-Felder-Fehler der Draft-Hülle. Zusätzlich prüft
`buildImportPlan()` nach dem Merge explizit (defense-in-depth), dass die
Menge bestehender `gameId`s/`groupId`s eine **Teilmenge** der gemergten
Endmenge bleibt — strukturell kann das durch `mergeGames()`/
`mergeRegistryGroups()` (reines Hinzufügen/Ersetzen über eine `Map`) ohnehin
nie verletzt werden, dieser Check ist ein zusätzliches Sicherheitsnetz.

## Registry-Verhalten

- `groupId` bleibt für einen bestehenden Eintrag immer unverändert (das ist
  ohnehin der Schlüssel, über den "bestehend vs. neu" entschieden wird).
- `currentName` und `nameHistory` dürfen sich bei einem bestehenden Eintrag
  frei ändern (Umbenennung).
- `createdInSeason`/`createdInGame` sind bei einem bestehenden Eintrag
  **unveränderlich** — ein Draft, der versucht, diese "Erschaffungs-Fakten"
  nachträglich zu ändern, scheitert hart (`mergeRegistryGroups()`), der
  bestehende Eintrag bleibt dabei unangetastet erhalten.
- Eine geänderte Spieler-Besetzung einer Gruppe **innerhalb eines Spiels**
  (`game.groups[].players`) hat auf die Registry überhaupt keinen Einfluss —
  die Registry kennt gar keine Spielerlisten, nur `groupId`/`currentName`/
  `createdInSeason`/`createdInGame`/`nameHistory`. Die `groupId` bleibt daher
  per Konstruktion immer stabil, unabhängig davon, wie oft sich die
  Besetzung einer Gruppe über Spiele hinweg ändert.
- `createdInGame`-Existenzprüfung erfolgt **nur für Registry-Einträge der
  aktuell importierten Saison** (`createdInSeason === <seasonKey>`) — der
  Importer lädt bewusst nur `season-data/<seasonKey>.json`, nicht die Daten
  aller Saisons. Ein pauschaler Check über die komplette Registry hinweg
  würde Einträge anderer Saisons fälschlich als "unbekannte Saison" ablehnen
  (siehe die entsprechende Phase-1-Hardening-Lektion bei
  `validateGroupRegistry()`).

## Diff-Verhalten

Der Bericht (Dry-Run wie Write) zeigt für Spiele und Gruppen jeweils
`added`/`changed`/`unchanged` — nur IDs bzw. `{groupId, name}`, keine
vollständigen JSON-Dumps:

```
Spiele (lineup-data/<season>.json):
  neu:          1 -> 44380
  geändert:     1 -> 44372
  unverändert:  58
Gruppen (lineup-data/groups.json):
  neu:          1 -> Fire Line (a1b2…)
  geändert:     0
  unverändert:  3
```

## Bekannter, nicht behobener Altbestand-Fund (außerhalb des Scopes dieser Phase)

Beim Lesen von `scripts/import-season-data.mjs` als Architektur-Vorbild für
diese Phase wurde festgestellt: `scripts/update-season-data.mjs` exportiert
`writeJsonAtomic` **nicht** (keine `export`-Deklaration, Zeile ~87), obwohl
`scripts/import-season-data.mjs` (Zeile 63) genau das per
`import { writeJsonAtomic } from './update-season-data.mjs'` versucht. Unter
echtem Node.js würde das beim Laden des Moduls mit einem `SyntaxError`
("does not provide an export named 'writeJsonAtomic'") fehlschlagen. Das
wurde bisher nie bemerkt, weil dieses Projekt bislang nie mit echtem Node.js
ausgeführt wurde (nur über die Browser-/V8-Testmethode). Dieser Fund liegt
außerhalb des Scopes von Phase 3 (betrifft `season-data`, nicht
`lineup-data`) und wurde deshalb **nicht behoben** — `import-lineup-data.mjs`
hängt bewusst nicht von diesem Import ab, sondern bringt eine eigene, kleine,
lokale `writeJsonAtomic()`-Implementierung mit. Empfehlung für eine spätere,
separate Aufgabe: entweder `export` vor `writeJsonAtomic` in
`update-season-data.mjs` ergänzen, oder `import-season-data.mjs` ebenfalls
auf eine eigene lokale Implementierung umstellen.

## CLI-Referenz

```bash
node scripts/import-lineup-data.mjs <seasonKey> --input <draftFile>            # Dry-Run
node scripts/import-lineup-data.mjs <seasonKey> --input <draftFile> --write    # schreibt nach Validierung
```

`<seasonKey>` wird explizit angegeben (nicht nur aus dem Draft übernommen)
und muss mit `draft.season` exakt übereinstimmen — Verteidigung nach dem
gleichen Prinzip wie beim bestehenden Season-Data-Importer (menschliche
Absicht wird gegen den Dateiinhalt gegengeprüft, nicht blind übernommen).

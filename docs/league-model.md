# Liga-Modell: technische Dokumentation (Stand P1a / M0, P2 Runde 2 / M1, P3 Runde 2 / M2 + M3 und P4 / M4)

Dieses Dokument beschreibt ausschließlich, was tatsächlich implementiert ist: **P1a (M0 Datenaufbereitung)**, **P2 Runde 2 (M1 Teamstärke, nur Node/Dry-Run)**, **P3 Runde 2 (M2 Torschützen-Qualität und M3 Goalie-Bewertung, nur Node/Dry-Run)** und **P4 (M4 Müdigkeit und Belastung, nur Node/Dry-Run bis einschließlich der Build-Integration)**, dazu die numerischen Bausteine aus `stats.mjs` (P2 Runde 1, Gamma-Poisson-Grundlagen für M2, Normal-EB- und Beta-Binomial-EB-Grundlagen für M4). Grundlage ist die Spezifikation `docs/liga-analytics-spezifikation.md` (Abschnitt 4, M0 bis M4). Weitere Module sind noch nicht implementiert und hier nicht beschrieben. Der M1-Abschnitt beginnt bei „## M1 · Teamstärke“, der M4-Abschnitt bei „## M4 · Müdigkeit und Belastung“.

**M0 ist Normalisierung und Datenqualitätsbasis.** M0 entscheidet keine späteren fachlichen Kennzahlen: keine Eigentor-Gutschrift, keine Strafminuten, keine Zeitrekonstruktion, keine Spieleridentität aus Platzhaltern, kein Ableiten des Ausrichters ohne Rohwert.

## Dateien

| Datei | Zweck |
|---|---|
| `scripts/model/normalize.mjs` | reine Normalisierung (`normalizeSeason`), Team-Regeln, Zeit- und Spielfilter-Helfer |
| `scripts/build-league-model.mjs` | CLI: liest `season-data/`, normalisiert alle Saisons, druckt den Datenqualitätsbericht |
| `scripts/test-model-normalize.mjs` | synthetische Fälle, Negativ-/Invariantentests und Drift-Test gegen `index.html` |
| `scripts/test-build-league-model.mjs` | Pins der echten Saisons, unabhängige Nachrechnung gegen die Rohdaten, Determinismus, Dry-Run (auch für `--only M1`) |
| `scripts/model/stats.mjs` | generische Numerik (Poisson-Ridge, Skellam, Log-Loss, seeded Bootstrap, Gamma-Poisson-Grundlagen für M2, …), Tests in `scripts/test-model-stats.mjs` |
| `scripts/model/team-strength.mjs` | M1: Teamstärke-Fit (Stufe 1 + Host-Stufe 2), `asOf`, Vorhersage, Bootstrap auf Spielebene |
| `scripts/test-model-team-strength.mjs` | M1-Tests mit Mutations-Sensitivität |
| `scripts/model/shooter-quality.mjs` | M2: Torschützen-Qualität (Gamma-Poisson, Pseudo-Spiele-Modell, Stufen), Aufruf über `--only M2` |
| `scripts/test-model-shooter-quality.mjs` | M2-Tests (Aggregation, `asOf`/Leakage, Prior/Posterior, Stufen, Identität, Leerzustände, echte Daten) |
| `scripts/model/goalie-rating.mjs` | M3: Goalie-Bewertung (erwartete Gegentore Variante A, TvE, Bootstrap über M1, Schützenqualität der Gegentore über M2, Kontext-Splits), Aufruf über `--only M3` |
| `scripts/test-model-goalie-rating.mjs` | M3-Tests (Variante-A-Formel, Solo/Shared, Sichtbarkeit, Bootstrap, Response-Momentum, Halbzeit, Weak-Shooter, `asOf`/Leakage, Teamhistorie, echte Daten) |
| `scripts/model/fatigue.mjs` | M4: Müdigkeit und Belastung (Liga-, Team-, Spieler-Ebene, Fresh-vs-Tired; Load Index bewusst nicht implementiert), Aufruf über `--only M4` |
| `scripts/test-model-fatigue.mjs` | M4-Tests (unabhängige Kontrollpfade je Ebene, Bootstrap, Shrinkage, Fresh-vs-Tired-Symmetrie, Determinismus, echte Daten) |
| `scripts/test-model-persistence.mjs` | P4b-Persistenz-Tests (atomares Schreiben, Dry-Run schreibt nichts, Determinismus, `inputHash`-Sensitivität, Snapshot-vs-Saisonende-Invariante, Saison-Team-Filter, `null`-Erhalt, Größenlimit) |

Wiederverwendet (nicht kopiert): `compareGamesChronologically` (`game-ordering.mjs`), `buildMatchdays` (`matchday-derivation.mjs`), `canonicalJson` und `sha256Hex` (`lineup-data-hash.mjs`). `index.html` wird nicht verändert und nicht geladen.

## Aufruf und Dry-Run

```bash
node scripts/build-league-model.mjs          # M0-Bericht im Terminal
node scripts/build-league-model.mjs --json   # derselbe Bericht als kanonisches JSON
node scripts/build-league-model.mjs --only M1                           # M1-Bericht (ohne Bootstrap)
node scripts/build-league-model.mjs --only M1 --replicates 200 --seed 1 # zusätzlich seeded 90-%-Bootstrap (Spielebene)
node scripts/build-league-model.mjs --only M2                           # M2-Torschützen-Qualität (siehe Abschnitt „M2“)
node scripts/build-league-model.mjs --only M3                           # M3-Goalie-Bewertung (ohne Bootstrap, siehe Abschnitt „M3“)
node scripts/build-league-model.mjs --only M3 --replicates 200 --seed 1 # zusätzlich seeded 90-%-Bootstrap (Spielebene)
node scripts/build-league-model.mjs --only M4 --replicates 200 --seed 1 # M4-Müdigkeit und Belastung (siehe Abschnitt „M4“; --replicates/--seed hier PFLICHT)
```

- Das Skript ist standardmäßig ein **Dry-Run** und schreibt nichts (`--write`, siehe Abschnitt „Modelldaten-Persistenz“).
- `--only M1`/`--only M3`: `--replicates N` (ganze Zahl ≥ 20) und `--seed S` gehören zusammen; es gibt keinen versteckten Standard-Seed. `--only M4` verlangt beide zwingend (M4 kennt keinen bootstrap-losen Pfad).
- Kein Netzwerk, keine externen Pakete, keine Uhrzeit in der Ausgabe. Gleiche Eingabedaten ergeben byte-identische Ausgabe.
- Der Bericht enthält den `inputHash` (SHA-256 über die kanonisch serialisierten Saisondateien in der Reihenfolge von `season-data/seasons.json`).

## Datenmodell

`normalizeSeason(seasonData)` liefert je Saison ein Objekt mit `schemaVersion` (2), `seasonKey`, `label` und `teamGames[]`, `goalEvents[]`, `penaltyShotEvents[]`, `penaltyEvents[]`, `timeoutEvents[]`, `rosterEntries[]`, `warnings[]`, `quality`.

### Ebenen der Felder

| Ebene | Bedeutung | Kennzeichnung |
|---|---|---|
| Rohfeld | unverändert bzw. nah am Rohfeld (Rohwert bleibt neben normalisierten Werten erhalten) | normaler Feldname, z. B. `teamSide` (= `event_team`), `goalType`, `goalTypeString`, `sortkey`, `timeRaw`, `scoreAfter`, `penaltyType`, `hostingClub`, `ended`, `noticeType`, `resultForfait` |
| Normalisiert | deterministisch aus genau einem Rohfeld bestimmt | normaler Feldname, z. B. `absSec`, `timeFormat`, `teamKey`, `isOwnGoal`, `assistRaw`, `isGoalie` |
| Fachlich abgeleitet | Berechnung aus mehreren Feldern oder Zuordnung | ausschließlich im Unterobjekt **`derived`** |
| Qualität | Auffälligkeiten | `warnings[]`, `quality` |

`derived` enthält:

- `goalEvents[].derived`: `scoreBefore`, `scoreDeltaSide`, `scorerPlayerId`, `scorerMatch`, `assistKind`, `assistPlayerId`.
- `teamGames[].derived`: `gameOrderOfDay`, `opponentGameOrderOfDay`, `ownPrevGameGoalDiff`, `opponentPrevGameGoalDiff`, `isHostingTeam`, `hostingStatus`, `hostingClubTeamKey`.
- `penaltyEvents[].derived.playerId` und `penaltyShotEvents[].derived.scorerPlayerId`: Spielerzuordnung über `event_team` + Trikotnummer.

### Felder je Objekt

- **Alle Ereignisse:** `seasonKey`, `gameId`, `eventKey` (`<gameId>#<Index im events-Array>`), `eventId` (kann `null` sein), `sortkey`, `period`, `timeRaw`, `absSec`, `timeFormat`, `teamSide` (Rohwert `event_team`), `teamKey`.
- **`goalEvents[]`:** zusätzlich `goalType`, `goalTypeString`, `isOwnGoal`, `isNotAssigned`, `isPenaltyShot`, `scorerNumber`, `assistRaw`, `assistNumber`, `scoreAfter` (Rohwerte `home_goals`/`guest_goals`), `derived`.
- **`penaltyEvents[]`:** `playerNumber`, `penaltyType`, `penaltyTypeString`, `penaltyId`, `penaltyCodeId`, `reasonId`, `reason`, `derived`.
- **`timeoutEvents[]`:** Team und Zeit; `homeGoals`/`guestGoals` nur falls im Event vorhanden.
- **`teamGames[]`** (ein Eintrag je Team und Modell-Spiel): `gameId`, `matchdayKey`/`matchdayNumber`, `date`, `startTime`, `side`, `teamKey`/`teamName`, `opponentKey`/`opponentName`, `isUlm`, `goalsFor`/`goalsAgainst`, Rohmarker `ended`, `noticeType`, `resultForfait`, `hostingClub` (Rohwert), `fieldPlayerCount`, `goalieCount`, `fieldPlayerIds[]`, `goalieIds[]`, `derived`.
- **`rosterEntries[]`:** `playerId`, `firstName`, `lastName` (roh, getrennt), `playerName` (zusammengesetzter Anzeigename), `trikotNumber`, `position`, `goalkeeperFlag`, `captainFlag` (Rohflags), `isGoalie`, `isCaptain` (normalisiert).

Die Reihenfolge ist deterministisch: Spiele chronologisch, Events in Quellreihenfolge.

## Normalisierungsregeln

### Spielfilter (Modell-Spiele)

Ein Spiel wird aus dem Modell ausgeschlossen, wenn mindestens eine dieser Bedingungen zutrifft (`classifyModelGame`). Mehrere Gründe sind möglich; der **Hauptgrund** ist der erste in dieser festen Reihenfolge, alle zutreffenden stehen in `reasons`:

| Reihenfolge | Grund | Bedingung | Quelle |
|---|---|---|---|
| 1 | `not_ended` | `ended !== true` **und keine Datenqualitäts-Ausnahme greift** (siehe unten) — strikt; fehlend oder `"true"` als Text zählt nicht | Spezifikation M0.1 und P1a-Entscheidung |
| 2 | `youth` | `isYouthGame`-Regel aus `index.html` | Spezifikation M0.1 |
| 3 | `forfeit` | `result.forfait === true` | Spezifikation M0.1 |
| 4 | `postponed` | `notice_type` passt auf `postpone`, `verschoben` oder `verlegt` | Spezifikation M0.1 (verschobene Spiele), 3.6.3 (verlegt) |
| 5 | `no_result` | kein numerischer Endstand in `result` | Spezifikation M0.1 |

Es gibt keine weitere Interpretation von Statusfeldern: Zum Beispiel wird `notice_type "Canceled"` nicht als Ausschlussgrund gewertet. „Fremdliga"-Spiele werden nicht gesondert behandelt (die Saisondateien enthalten nur Ligaspiele).

**Datenqualitäts-Ausnahme zu `not_ended`** (`isEffectivelyEnded`, `scripts/game-status.mjs`): Ein Spiel mit `ended !== true`, aber einem vollständigen numerischen `result` UND mindestens einem Event, gilt trotzdem als beendet und bleibt im Modell. Grund: In der Praxis haben unvollständige Spiele weder ein vollständiges Ergebnis noch Events — `ended: false` ist hier erkennbar nur ein Datenfehler, kein echter Hinweis auf ein noch laufendes/nicht gespieltes Spiel. Die Regel ist bewusst allgemein formuliert (kein hartverdrahteter ID-Filter) und greift automatisch, falls künftig importierte Daten denselben Fehler zeigen. Betroffen sind aktuell acht Spiele in 21/22: 25677, 25679, 25681, 25682, 25683, 26478, 26613, 26644 (siehe `quality.endedFalseIncludedByException`, Abschnitt unten, und den Build-Bericht der Datenqualitäts-Phase). `isEffectivelyEnded()` lebt in einem eigenen, abhängigkeitsfreien Modul (`scripts/game-status.mjs`) statt direkt in `normalize.mjs`, weil `normalize.mjs` bereits `buildMatchdays()` aus `matchday-derivation.mjs` importiert — ein Import in die Gegenrichtung wäre ein zyklischer ESM-Import gewesen. `scripts/model/normalize.mjs` (M0) UND `scripts/matchday-derivation.mjs` (`buildMatchdays()`, 3.6.3) nutzen seit der ended-Vereinheitlichungs-Phase exakt dieselbe Funktion: diese acht Spiele zählen seither in beiden Aufrufstellen konsistent als beendet (vorher driftete `buildMatchdays()` ab, weil es nur das rohe `ended`-Feld las).

**Abweichung zum Dashboard:** `isGamePlayed()` in `index.html` zählt Spiele mit Tor-Events als gespielt, auch wenn `ended` nicht `true` ist. Das Modell tut das nicht. `isGamePlayed` ist unverändert.

Die Qualitätskennzahlen beziehen sich auf **alle beendeten Spiele** (auch später ausgeschlossene Forfait-Spiele); `modelGames` und die Arrays enthalten nur Modell-Spiele.

### Ausgeschlossene Spiele im Bericht

`quality.excludedGames[]` führt **jedes** ausgeschlossene Spiel: `seasonKey`, `gameId`, `date`, `home`, `guest`, `ulmInvolved`, `reason`, `reasons`, die Rohmarker `ended`, `noticeType` (`notice_type`) und `resultForfait` (`result.forfait`), `score` (Endstand, falls vorhanden) und `events` (Anzahl). `quality.endedFalseWithEvidence` ist die Untermenge der weiterhin nicht beendeten Spiele mit Events oder Endstand, die NICHT unter die Datenqualitäts-Ausnahme fallen (z. B. nur ein Event ohne vollständiges Ergebnis, oder umgekehrt). `quality.endedFalseIncludedByException` führt dieselben Felder für Spiele, die über die Ausnahme (siehe oben) trotz `ended !== true` einbezogen wurden — diese stehen NICHT in `excludedGames`. Der Terminal-Bericht listet alle beendeten Ausschlüsse und alle nicht beendeten Spiele mit Events/Endstand einzeln, gefolgt von einem eigenen Abschnitt „Datenqualitäts-Ausnahme“ für die einbezogenen Spiele; nicht beendete Spiele ohne Events/Endstand erscheinen als Zahl mit der Verteilung der `notice_type`-Rohwerte.

### Teams

Node-Fassung der Regeln aus `index.html` (`normalizeTeamName`, `isUlmTeamName`, `isOwnTeam`, `getCanonicalTeamName` im Kontext „season“). Ulm und `SG Sparks Ulm-Tübingen`/`SG Sparks Tübingen-Ulm` (SG-Ära bis 23/24) laufen unter dem Teamschlüssel `vfb-ulm`. Der Schlüssel ist der kanonische Name, normalisiert, mit Bindestrichen (z. B. `sv-tuebingen-sharks`, `sportvg-feuerbach-2`). `cleanText()` (Mojibake/UI-Transliteration) ist bewusst nicht übernommen. Beide Tests vergleichen die Node-Regeln mit den echten Funktionen aus `index.html` (Drift-Test).

### Zeit

- `absSec` = `(period − 1) · 1200 + Sekunden` (Halbzeitlänge 1200 s).
- **Kumuliertes Format** (Spezifikation M0.3): Existiert im Spiel ein Event mit `period 2` und Zeit > 20:00, gilt Halbzeit 2 des ganzen Spiels als kumuliert; dann ist `absSec` = Sekunden (`timeFormat: "cumulated"`).
- `timeFormat`: `perPeriod`, `cumulated`, `h1OverLength` (Halbzeit 1 > 20:00, kein Kumuliertformat, nur gemeldet), `ambiguousInCumulated`, `unparseable`, `unknownPeriod`.
- **`absSec = null` bei nicht lesbarer bzw. widersprüchlicher Zeit ist eine bewusste M0-Datenqualitätsbehandlung.** Nicht lesbar: z. B. `"3.25"`. Widersprüchlich: eine Halbzeit-2-Zeit ≤ 20:00 in einem kumulierten Spiel. Es gibt keine Rekonstruktion oder Schätzung fehlender Zeiten; die Rohzeit (`timeRaw`) bleibt erhalten und der Fall steht in den Warnungen.

### Tore, Eigentore, `not_assigned`, Assists

- Schütze: über `event_team` + `scorerNumber` im Kader (`derived.scorerMatch`: `roster`, `placeholder`, `unmatched`, `ambiguous`, `none`). Das ist eine Zuordnung, keine Rohangabe, deshalb unter `derived`.
- **Eigentor** (`goal_type "owngoal"`): `goalType`, `isOwnGoal` und die Rohnummer bleiben erhalten; kein Schütze, kein Assist.
- **`not_assigned`** bleibt eigene Torart, keine Spielerzuordnung.
- **Assist:** fehlender Schlüssel, `null` und `0` bedeuten „kein Assist“ (`derived.assistKind: "none"`). Die Rohform steht getrennt in `assistRaw` (`missing`, `null`, `zero`, `number`) und wird im Bericht getrennt gezählt.
- **Platzhalter-Trikotnummern (Quellformat-Erkennung, keine fachliche Regel):** Die Quelldaten führen bei Eigentoren (1000) und nicht zugeordneten Toren bzw. „kein Assist“ (2000) Platzhalternummern. Nummern ab `SOURCE_PLACEHOLDER_NUMBER_MIN` (1000) werden technisch nicht als Kaderspieler aufgelöst. Die Rohnummer bleibt in `scorerNumber`/`assistNumber`; aus dem Platzhalter wird keine Spieleridentität abgeleitet.

### Spielstand und `scoreDeltaSide`

- `scoreAfter` ist der Rohspielstand nach dem Tor (`home_goals`/`guest_goals`; sind nicht beide vorhanden, `null`). `derived.scoreBefore` ist der Stand nach dem vorigen Tor-Event (Anfang 0:0).
- **`derived.scoreDeltaSide`** ist ein **beobachtbarer Datenfakt**: `home` oder `guest`, wenn der Spielstand seit dem vorigen Tor-Event auf genau dieser Seite um genau 1 steigt (die andere bleibt gleich); sonst `null` (Stand fehlt, keine oder mehr als eine Änderung). Nach einem Bruch läuft die Kette mit dem Rohstand weiter; fehlende Stände lassen sie unverändert.
- **Eine fachliche Gutschrift von Eigentoren erfolgt erst in einem späteren Analysemodul.** `scoreDeltaSide` ist nicht gleich „credited scoring team“; M0 entscheidet nicht, welchem Team ein Eigentor gutgeschrieben wird. `teamSide` (= `event_team`) und `teamKey` bleiben der Rohwert.
- Abweichungen zwischen `event_team` und `scoreDeltaSide` stehen als Qualitätseintrag (`quality.scoreDeltaSideConflicts`) und Warnung (`score_delta_side_differs_from_event_team`). Brüche der Kette stehen in `quality.scoreChainBreaks` und Warnungen (`score_chain_break`), fehlende Stände in `quality.scoreMissing`.

### Penalty-Schüsse, Strafen, Timeouts

- Penalty-Schuss = Tor mit `goal_type "penalty_shot"` (`isPenaltyShot`, zusätzlich in `penaltyShotEvents[]`). Er wird nicht aus Strafen-Events abgeleitet.
- Strafen-Events tragen nur Rohdaten (`penaltyType`, `penaltyTypeString`, `penaltyId`, `penaltyCodeId`, `reasonId`, `reason`). Die Spezifikation verlangt die spätere Auswertung der Strafdaten, definiert in M0 aber keine allgemeingültige Minutenabbildung. **Diese Interpretation bleibt für ein späteres Modul offen:** Es gibt kein Minutenfeld und keine Klassifikation von `penalty_2`, `penalty_10`, `penalty_2and2` oder `penalty_ms_full`; insbesondere wird nicht entschieden, ob „2+2“ vier aktive Strafminuten oder etwas anderes bedeutet.
- Timeouts: Team und Zeit; ein Spielstand wird nicht abgeleitet (nur übernommen, falls im Event vorhanden).

### Roster

Goalie = `position === "Tor"` oder `goalkeeper === true` (`isGoalie`, normalisiert). Die Rohfelder `position`, `goalkeeperFlag`, `captainFlag`, `firstName` und `lastName` bleiben erhalten. Widersprüche zwischen `position` und `goalkeeper` werden gezählt (`goalies.flagMismatch`). Feldspieler = alle übrigen Kadereinträge.

### Reihenfolge am Spieltag (abgeleitet)

Aus den Modell-Spielen eines Teams je Spieltag (`buildMatchdays`), chronologisch nach `compareGamesChronologically` (Datum, Anstoßzeit, `game_number`, `id`). `derived.gameOrderOfDay` (1/2) und die Vorspiel-Tordifferenzen sind nur bei genau 2 Modell-Spielen des Teams am Spieltag gesetzt, sonst `null`.

### Ausrichter (`hosting_club`)

- Der Rohwert bleibt in `hostingClub` **unverändert** erhalten (nicht getrimmt, nicht überschrieben). Ein normalisierter Wert steht separat in `derived.hostingClubTeamKey`.
- Fehlt der Wert, ist er `null`, leer oder nur Leerraum, ist `derived.isHostingTeam` **`null`** (`hostingStatus: "missing"`). Es wird nicht aus Halle, Heim/Gast oder anderen Indizien abgeleitet.
- Nur bei einem vorhandenen Textwert wird zugeordnet: über den kanonischen Teamnamen und die **zwei Aliase aus M0.7 der Spezifikation** (`HOSTING_CLUB_ALIASES_V1`: `SV 03 Tübingen` → SV Tübingen Sharks, `PTSV Freiburg` → Breisgau Bandits). Diese sollen später gemäß Entscheidung 2 nach `data/club-aliases.json` überführt werden. Der Lookup erfolgt ausschließlich mit `Object.hasOwn` (keine Auflösung geerbter Eigenschaften wie `constructor`).
- Ist der Ausrichter in der Saison bekannt, aber an dem Spiel nicht beteiligt, sind beide Werte `false`. Kein Text, unbekannter Verein oder Alias mit einem in der Saison fehlenden Zielteam ergibt `null` (`hostingStatus: "unresolved"`); solche Vereine stehen im Bericht (`hosting.unresolvedClubs`). Die Aliase normalisieren nur einen vorhandenen Rohwert für den Vergleich; die Teamschlüssel der Spiele ändern sie nicht.

## M1 · Teamstärke (P2 Runde 2, nur Node/Dry-Run)

Implementiert in `scripts/model/team-strength.mjs`. Eingabe sind die M0-`teamGames[]` (mehrere Saisons). Es gibt keine Persistenz, keine UI-Anbindung und keine Änderung an M0. **M1 erfüllt hier keine M9-Akzeptanz** (kein Walk-forward-Nachweis); `halfLifeDays` und `ridge` sind unabgestimmte Platzhalter (`DEFAULTS`: 365 Tage, 1), die Abstimmung erfolgt später über M9. Alle Werte im Modul sind ungerundet; gerundet wird erst an der Ausgabegrenze (8 Nachkommastellen, `roundOutput`).

### Modell

Zeile `i` = ein Team-Spiel (Team `a`, Gegner `b`, Ziel `y_i` = `goalsFor`). Zeitgewicht `w_i = 2^(−(T_ref − Datum_i)/H)` (Kalendertage, `H` = `halfLifeDays`, Standard 365, Sommerpause zählt mit), **nicht normiert**.

**Stufe 1** (alle zulässigen Zeilen, kein Host-Term):

```
log λ_i = μ + attack[a] − defense[b] + β_order·O_i + β_le6·K6_i + β_ge9·K9_i
```

- `O_i = 1`, wenn `gameOrderOfDay = 2`. `K6_i = 1`, wenn der **eigene** `fieldPlayerCount` ≤ 6 ist, `K9_i = 1`, wenn ≥ 9. Referenz 7–8 (Effekt fest 0). Kein Gegner-Kader-Term.
- Poisson-Regression (`stats.fitPoissonRegression`) mit den Gewichten `w_i`. Ein gemeinsames `ridge` nur auf `attack[·]` und `defense[·]`; `μ`, Order und Kader sind unpenalisiert. Es gibt keine Zentrierungs-Nebenbedingung: Die Penalty macht die Nullrichtungen des Modells eindeutig (`Σ attack = 0`, `Σ defense = 0` im Optimum).
- **Designmatrix** (Spalten in dieser Reihenfolge): `μ` (immer 1), `attack:<team>` (+1 beim Team der Zeile), `defense:<team>` (−1 beim Gegner der Zeile), dann `order`, `le6`, `ge9`. Teams sind alphabetisch nach `teamKey` sortiert. Kovariatenspalten ohne Variation (nur Nullen oder nur Einsen) werden entfernt und gewarnt (`effect-not-estimable`); der Effekt ist dann `null`. Penalty je Spalte: `ridge` für Team-Parameter, sonst 0.

**Stufe 2 (Host, Variante O2)**: Nur Zeilen mit bekanntem `isHostingTeam` (`true` → H = 1, `false` → H = 0). Ein-Parameter-Poisson-Fit ohne Achsenabschnitt mit dem Stufe-1-Linearprädiktor als Offset:

```
λ_final = λ_Stufe1 · exp(β_host · H)
```

- Zeilen mit `isHostingTeam = null` bleiben in Stufe 1 und werden in Stufe 2 **nicht verwendet**. Sie werden **nicht als `false` gelesen**, es gibt **keinen `hostUnknown`-Term**. Bei unbekanntem Host bleibt die Erwartung exakt `λ_Stufe1`.
- **O2 ist bewusst nicht mathematisch identisch mit einer gemeinsamen Regression** (Formel der Spezifikation: `β_host·isHostingTeam` im selben Fit). Das ist die fachliche Konsequenz der nur teilweise beobachteten Host-Information: `hosting_club` fehlt in 21/22–24/25 bei den beendeten Spielen vollständig (`null` ist damit exakt „Saison vor 25/26“), in 25/26 ist er vorhanden. Ein `hostUnknown`-Term wäre deshalb faktisch ein Saison-Indikator gewesen.
- Datenbefund (alle Saisons, nach dem `gameOrderOfDay`-Filter, Stand nach der Datenqualitäts-Ausnahme): 442 Team-Spiel-Zeilen, davon 330 `null`, 24 `true`, 88 `false` (vormals 424/312/24/88 — die Differenz sind ausschließlich die acht neu einbezogenen 21/22-Spiele, deren `hosting_club` wie der Rest von 21/22–24/25 fehlt und daher `null` bleibt). Die 24 `true` sind 24 Spiele mit teilnehmendem Ausrichter; die 88 `false` enthalten die Gegenzeilen dieser 24 Spiele und die Spiele, in denen der Ausrichter nicht selbst beteiligt ist. Stufe 2 nimmt alle 112 bekannten Host-Zeilen als Input (24 `true` + 88 `false`); die 330 `null`-Zeilen gehen nicht in Stufe 2 ein.
- **Eigenschaft von Stufe 2 (direkte Konsequenz der O2-Formel, kein Implementierungsfehler):** Stufe 2 verarbeitet alle 112 bekannten Host-Zeilen (`stage2.rows.host` = 24, `stage2.rows.notHost` = 88). Für die Schätzung von `β_host` tragen mathematisch aber nur die `true`-Zeilen bei: Bei `false` ist H = 0 und damit `exp(β_host·0) = 1`, die Zeile hängt nicht von `β_host` ab. Die 88 `false`-Zeilen werden weder als unbekannt behandelt noch entfernt; sie gehören zum Datensatz mit bekanntem Host, liefern in diesem einparametrigen Offset-Modell aber keine β-Information. Ohne Stufe-2-Achsenabschnitt gilt `β_host = ln(Σ w·y / Σ w·μ_Stufe1)`, die Summen laufen nur über die Ausrichter-Zeilen. `β_host` ist also nicht „aus 112 Zeilen geschätzt“; es wird durch die 24 Ausrichter-Zeilen bestimmt, während Stufe 2 insgesamt 112 bekannte Zeilen als Input verarbeitet.
- Nicht schätzbar (`stage2.estimable = false`, Warnung `stage2-not-estimable`, `betaHost = null`) bei: keine bekannten Host-Zeilen (`no-known-host-rows`), keine Ausrichter-Zeile (`no-host-true-rows`), Ausrichter-Zeilen ohne Tore (`host-rows-zero-goals`). Kein Absturz.

### Ausschlüsse und dünne Daten

- `gameOrderOfDay === null` (oder nicht 1/2) → die **ganze Zeile** ist aus dem M1-Fit ausgeschlossen, nie als „1. Spiel“ gelesen. Warnung `order-null-excluded` mit Saison und Anzahl (aktuell 24/25 ×2; 21/22 hat seit der M0-Datenqualitäts-Ausnahme keine solchen Zeilen mehr). Nicht endliche Werte in `goalsFor`/`fieldPlayerCount` → `invalid-rows-excluded`.
- Spiele, die M0 nicht aufnimmt (z. B. `ended !== true` ohne Datenqualitäts-Ausnahme, Forfait), sind keine Eingabezeilen und fließen nicht ein.
- Dünne Daten: kein harter Null-Schwellenwert. Jedes Team mit Daten wird ausgegeben, mit `games` (Team-Spiel-Zeilen im Fit) und `weightedGames`. Liegt `games` unter `minGamesWarning` (Standard 6, konfigurierbar; 0 schaltet ab), gibt es die Warnung `thin-data`.
- Teamidentität: der M0-`teamKey` (keine zusätzliche Fusions-, Alias- oder SG-Logik in M1, keine Vererbung zwischen Teams). Neue Teams haben keinen Prior außer der Ridge-Schrumpfung Richtung 0.

### asOf (Datumsschnitt, nie Spieltagsnummer)

`asOf = { date: 'YYYY-MM-DD', inclusive: true|false }`; ohne `asOf` gilt alles bis zum letzten Datum. `T_ref` = `asOf.date`.

- **Stand nach Spieltag**: alle Zeilen mit Datum ≤ letztes Datum des Spieltags (`asOfAfterMatchday`, inclusive).
- **Vorhersage eines Spieltags**: alle Zeilen mit Datum < erstes Datum des Spieltags (`asOfBeforeMatchday`, exclusive).
- Die Spieltagsnummer wird nur nachgeschlagen, um ein Datum zu bestimmen; sie ist keine Zeitachse. Das ist nötig, weil Spieltagsnummern nicht chronologisch sind (21/22: Spieltag 9 vor Spieltag 8; 24/25: Spieltag 2 an zwei Terminen, 27.10. und 07.12., mit Spieltag 1 am 09.11. dazwischen). Mehrtägige Spieltage und Nachholspiele werden über die tatsächlichen Spieldaten eingeordnet; spätere Spiele beeinflussen einen früheren Stand nie.
- Leerer Stand (kein Spiel im Schnitt): gültiger Zustand `estimable = false` mit Warnung `empty-asof`, ohne NaN/Infinity; `predictDuel` liefert `available: false`.

### Ergebnisobjekt (`fitTeamStrength`)

`asOf`, `asOfGameDate`, `games` (Zeilen im Fit), `leagueAvgGoalsPerTeamGame` (**vorläufige Definition**, siehe unten: ungewichtetes Mittel von `goalsFor` über die Zeilen im Fit), `weightedLeagueAvgGoalsPerTeamGame` (**vorläufig**: dasselbe Mittel, gewichtet mit `w_i`), `stage1` (`mu`, `effects.order`, `effects.fieldPlayers { le6, 7to8 = 0, ge9 }`, `teams[] { teamKey, attack, defense, games, weightedGames }`, `columns`, `droppedEffects`), `stage2` (`estimable`, `betaHost`, `rows { host, notHost, unknownExcluded }`, `reason`), `warnings[]`, `quality` (Zeilenzahlen, Host-Verteilung, Gewichtsübersicht). **Vorläufig:** Beide Ligamittel beziehen sich auf die Zeilen im Fit (bei mehreren Saisons also auf alle Saisons im Datumsschnitt), nicht wie das Beispiel der Spezifikation (25/26: 7,68) auf eine einzelne Saison. Welche Definition endgültig gilt, ist eine offene Owner-Entscheidung; die Berechnung wurde bewusst nicht festgelegt.

### Vorhersage (`predictDuel`)

Pflicht: `teamA`, `teamB`, `orderA`/`orderB` (1 oder 2), `fieldPlayersA`/`fieldPlayersB` (Anzahl Feldspieler des eigenen Teams); `hostA`/`hostB` ∈ `true | false | null` (Standard `null`). Ergebnis: `expectedGoals`, `wdl` (Skellam aus zwei unabhängigen Poisson-Raten), `expectedGoalDifference` = `λ_A − λ_B`. Teams ohne Daten haben Angriff = Abwehr = 0 und stehen in `newTeams`. Nur `host = true` multipliziert mit `exp(β_host)`; `false` und `null` lassen `λ_Stufe1` unverändert.

### Bootstrap (`bootstrapTeamStrength`)

Seeded, **auf Spielebene**: Es werden Spiele mit Zurücklegen gezogen, beide Teamzeilen eines Spiels immer gemeinsam (`gameUnits`, Spiele in der Reihenfolge des Textschlüssels `<Saison>#<gameId>`). In jeder Wiederholung werden **beide Stufen neu geschätzt**; `halfLifeDays`, `ridge` und `T_ref` bleiben fest. 90-%-Perzentilintervall (Quantil Typ 7 aus `stats.mjs`); Wiederholungszahl (mindestens 20) und Seed sind Pflichtparameter, keine M9-Endentscheidung. Fehlgeschlagene Refits (eine im Originalfit vorhandene Größe ist nicht schätzbar oder Stufe 1 konvergiert nicht) folgen der Regel aus `stats.mjs` (Standard: mehr als 10 % Ausfall ⇒ Fehler `bootstrap-failed`). Teams, die in einer Stichprobe fehlen, erhalten dort den Schrumpfwert 0.

### Offene Punkte (nicht entschieden)

- `halfLifeDays`, `ridge`, Kreuzvalidierung und Warnschwelle sind Platzhalter bzw. konfigurierbar; die Abstimmung gehört zu M9.
- **Owner-Entscheidung offen:** endgültige Definition von `leagueAvgGoalsPerTeamGame`. Die aktuelle Implementierung ist vorläufig und liefert zwei Mittel über die Zeilen im Fit: `leagueAvgGoalsPerTeamGame` (ungewichtet) und `weightedLeagueAvgGoalsPerTeamGame` (mit `w_i` gewichtet). Ein Saisonmittel wie im Beispiel der Spezifikation ist nicht implementiert.
- Unter O2 tragen die 88 `false`-Zeilen (Teil der 112 bekannten Host-Zeilen in Stufe 2) mathematisch nichts zur Schätzung von `β_host` bei (siehe „Eigenschaft von Stufe 2“); das ist eine Konsequenz der Formel, keine Entscheidung offen.

## Numerische Grundlagen für M2 (Gamma-Poisson, nur `stats.mjs`)

Dieser Abschnitt beschreibt ausschließlich die numerischen Bausteine in `scripts/model/stats.mjs` (Abschnitt 8 der Datei). **Es gibt noch kein M2-Modul:** keine Spieleraggregation, keine Zeitgewichtung, keine `asOf`-Logik, keine Stufen (Tiers), keine Ranglisten, keine Build-/CLI-Integration und keine Ausgabe. Die Funktionen kennen weder Spieler noch Teams noch Zeit, sie rechnen mit gewichteten Zählern und Exposure.

### Pseudo-Spiele-Modell (Modell P)

Eine Einheit (später: ein Spieler) wird durch zwei gewichtete Größen beschrieben:

- `count = Σ wᵢ·yᵢ` (gewichteter Zähler, z. B. Tore),
- `exposure = Σ wᵢ` (gewichtete Exposure, „Pseudo-Spiele").

Ohne Gewichte ist `wᵢ = 1`. Das Modell behandelt diese Größen wie eine Poisson-Beobachtung mit Exposure:

```
count | λ ~ Poisson(λ · exposure),      λ ~ Gamma(α, β)   (Rate-Parametrisierung)
```

Die Rate-Parametrisierung gilt überall: Mittel `α/β`, Varianz `α/β²`. Das Modell ist **bewusst ein diskontiertes Pseudo-Spiele-Modell**: Ein Spiel mit dem Gewicht 0,5 zählt wie ein halbes Spiel. Prior-Momente, Posterior und Intervall stammen aus demselben Modell. Es gibt **keine** Varianzkorrektur über eine effektive Stichprobengröße (`n_eff`); diese Alternative ist nicht implementiert und wurde nicht gewählt.

### Funktionen

| Funktion | Zweck |
|---|---|
| `logGamma(x)` | `ln Γ(x)`, x > 0 endlich (Lanczos, g = 7). x ≤ 0, NaN oder Infinity: `NumericError 'invalid-input'`. |
| `regularizedGammaP(a, x)`, `regularizedGammaQ(a, x)` | regularisierte untere bzw. obere unvollständige Gammafunktion, `a ∈ (0, MAX_GAMMA_SHAPE]`, x ≥ 0 endlich. Reihe für `x < a + 1`, Kettenbruch (Lentz) sonst; jeweils der genauere Zweig, `Q` im oberen Bereich ohne Auslöschung. |
| `gammaCdf(x, shape, rate)` | Verteilungsfunktion, `P(shape, rate·x)`. |
| `gammaQuantile(p, shape, rate)` | Quantil in Rate-Parametrisierung. `q(0) = 0`, `q(1) = Infinity`; sonst endlich und positiv. Abgesichertes Newton-Verfahren mit Bisektion im Klammerintervall. |
| `estimateGammaPrior(observations)` | Momentenschätzung des Priors aus `[{count, exposure}]`. |
| `gammaPoissonPosterior({alpha, beta, count, exposure})` | Posterior `Gamma(alpha + count, beta + exposure)`, Mittel und `ci90`. |

`MAX_GAMMA_SHAPE = 1e5` ist eine technische Schutzgrenze, kein Fachwert. Alle Funktionen geben ungerundete Werte zurück; gerundet wird erst an der Ausgabegrenze (`roundOutput`, 8 Nachkommastellen).

### Prior-Momente (`estimateGammaPrior`)

Für `k` Beobachtungen mit `rᵢ = countᵢ/exposureᵢ`, `E = Σ exposureᵢ`, `Y = Σ countᵢ` gilt im Modell P `E[rᵢ] = m = α/β` und `Var(rᵢ) = τ² + m/exposureᵢ` mit `τ² = α/β²`. Das Poisson-Rauschen `m/exposureᵢ` verwendet die **gewichtete Exposure**, nicht die Spielzahl. Daraus:

```
m̂  = Y / E
Q   = Σ exposureᵢ · (rᵢ − m̂)²
τ̂² = (Q − (k − 1)·m̂) / (E − Σ exposureᵢ² / E)
α   = m̂² / τ̂²          β = m̂ / τ̂²
```

`τ̂²` ist unter Modell P erwartungstreu für `τ²`. Für `exposureᵢ = 1` ergibt die Formel `s² − m̂` (klassischer Poisson-Gamma-Momentenschätzer). Es wird also nicht die ungewichtete Standardformel auf `Σwy/Σw` angewendet. Die Beobachtungen werden vor dem Summieren kanonisch nach (`exposure`, `count`) sortiert und kompensiert summiert; das Ergebnis hängt nicht von der Eingabereihenfolge ab. Die Eingabe wird nicht verändert. Rückgabe: `alpha`, `beta`, `mean` (= `m̂`), `tau2`, `n`, `totalCount`, `totalExposure`.

### Posterior und ci90 (`gammaPoissonPosterior`)

- Posterior: `alphaPost = alpha + count`, `betaPost = beta + exposure`; Mittel `alphaPost / betaPost`.
- `ci90 = [q05, q95]` der Posterior-Verteilung (gleichseitiges 90-%-Intervall, Rate-Parametrisierung).
- **Prior-Unsicherheit ist nicht Bestandteil des ci90.** Der aus den Daten geschätzte Prior gilt im Posterior als fest; das Intervall beschreibt nur die Unsicherheit der einzelnen Einheit bei gegebenem Prior. Da Gewichte im Modell P wie Bruchteile eines Spiels wirken, hat das Intervall diese Pseudo-Spiele-Bedeutung; es ist unter Zeitgewichten eine Modellaussage, keine Stichprobenvarianz des gewichteten Schätzers.

### Grenzen und Fehlerfälle

Alle Fehler sind `NumericError`; `stats.mjs` gibt nie stillschweigend NaN oder Infinity zurück.

- `'invalid-input'`: Wertebereich verletzt (z. B. `shape ≤ 0` oder `> MAX_GAMMA_SHAPE`, `rate ≤ 0`, `p ∉ [0, 1]`, `count < 0`, `exposure ≤ 0` in `estimateGammaPrior`, `exposure = 0` mit `count > 0` im Posterior, nicht endliche oder nicht numerische Werte). `gammaPoissonPosterior` erlaubt `exposure = 0` nur mit `count = 0` (Posterior = Prior).
- `'prior-not-estimable'` (nur `estimateGammaPrior`): weniger als 2 Beobachtungen, Gesamtzähler 0, Nenner der `τ²`-Schätzung numerisch 0 (≤ 1e-12·E, technische Schutzgrenze) oder `τ̂² ≤ 0` (keine Überdispersion). **Kein Clamping, keine Vollschrumpfung, keine Ersatzlösung.** Ein späteres M2-Modul übersetzt diesen Fehler in einen gültigen Warn- bzw. Leerzustand (Spezifikation 3.6.2, Invariante 3); das ist hier nicht implementiert.
- `'no-convergence'`: Reihe, Kettenbruch oder Quantilsuche konvergieren nicht (in den Tests nicht aufgetreten).
- `'non-finite'`: Ergebnis nicht darstellbar (z. B. `x·rate` überläuft, Quantil unterläuft).

### Genauigkeit

Gemessen in den Tests: `ln Γ(n+1)` gegen `logFactorial` bis n = 170 mit relativem Fehler < 1e-15; `P` gegen die Poisson-Identität (ganzzahliges `a`) und eine erf-Reihe (halbzahliges `a`) mit Fehler ≤ 1e-13; `P(gammaQuantile(p)) = p` mit Abweichung ≤ 2,3e-13 bis `shape = 1000` und ≤ 1,5e-12 bei `shape = 2e4` und `1e5` (Auslöschung in der Exponentialform), bei Tabellenwerten der χ²-Verteilung mit relativem Fehler < 1e-12. Damit sind 8 Nachkommastellen der ci90-Grenzen gesichert.

### Was hier nicht enthalten ist

Spieleraggregation, Zeitgewichte, `asOf`, Stufen, Ausgabeschema, Build-Integration und die Übersetzung der Fehler in Warnzustände liegen in `shooter-quality.mjs` (siehe Abschnitt „M2 · Torschützen-Qualität“). Gegnerbereinigung, Heißphase und Ranglisten sind nicht implementiert.

## M2 · Torschützen-Qualität (P3 Runde 2, nur Node/Dry-Run)

Umsetzung der Spezifikation (M2, Abschnitt 4) in `scripts/model/shooter-quality.mjs`, Tests in `scripts/test-model-shooter-quality.mjs`, Aufruf über `node scripts/build-league-model.mjs --only M2`. **Keine UI, keine Persistenz, kein `model-data/`.** M2 liest ausschließlich M0-Daten (`teamGames`, `rosterEntries`, `goalEvents`) und die numerischen Bausteine aus `stats.mjs` (siehe „Numerische Grundlagen für M2“).

### Ziel

Für jeden Feldspieler eine belastbare Quote für Tore, Assists und Scorerpunkte je Kaderspiel, die kleine Stichproben zum Ligaschnitt hin schrumpft (Empirical Bayes, Gamma-Poisson), mit 90-%-Intervall und einer Einordnung in Schützen-Stufen.

### Kaderpräsenz statt Einsatzzeit

Ein **Kaderplatz** ist genau **ein Spieler-Spiel**: eine Zeile in `rosterEntries` mit `isGoalie === false` und gültiger `playerId` in einem Modellspiel. Die Quote ist ausdrücklich eine Quote **pro Kaderspiel**, nicht pro Einsatz; Eiszeit ist in den Daten nicht vorhanden. Ein Spiel zählt für einen Spieler höchstens einmal als Exposure (eine weitere Zeile derselben `playerId` im selben Spiel wird nicht gezählt und als Warnung gemeldet; bei widersprüchlichen Duplikaten gewinnt in kanonischer Sortierung die Zeile mit dem kleineren Schlüssel aus Saison, Spiel, Seite, `teamKey`, `playerId`, Name).

Ausgeschlossen (gezählt, nicht still verworfen): Goalie-Zeilen (`isGoalie === true`), Zeilen mit anderem oder fehlendem `isGoalie`, Zeilen ohne gültige `playerId`, Duplikate, Zeilen zu Spielen ohne bekanntes oder mit ungültigem bzw. widersprüchlichem Datum, Zeilen nach dem `asOf`-Datum.

### Tore, Assists, Scorerpunkte

Nur `goalEvents` liefern Tore und Assists; jedes Ereignis wird genau einmal gelesen. `penaltyShotEvents` werden nie gelesen: sie sind dieselben Ereignisse wie die Strafschuss-Tore in `goalEvents` (23 in den echten Daten).

- **Tor:** `derived.scorerMatch === 'roster'` mit gültiger `scorerPlayerId`, sofern der Schütze in diesem Spiel einen Feldspieler-Kaderplatz hat. Ein Tor ohne Spielerzeile (z. B. Kaderzeile ohne `playerId`) wird gezählt und gewarnt, nicht zugerechnet.
- **Strafschuss-Tore** sind normale Tore (genau einmal); `isPenaltyShot` wird nur als Zähler (`quality.goals.penaltyShot`) ausgewiesen, es gibt keine separate Strafschussquote.
- **Eigentore** (`isOwnGoal`) und **`not_assigned`** haben keinen Spieler und keinen Assist und zählen nicht als Spielertor. Das ist weder Fehler noch Warnung.
- **Assists:** `assistKind === 'player'` → 1 Assist für den Assistgeber, wenn er in diesem Spiel einen Feldspieler-Kaderplatz hat; `'none'` → 0; `'placeholder'` und `'unmatched'` → kein zugeordneter Assist (gezählt und gewarnt). Assists von Goalies werden keinem Feldspieler zugerechnet (gezählt und gewarnt). Es wird nichts imputiert; die Assist-Lücken der Quelldaten (in 21/22 fehlt der Schlüssel `assist` bei 172 Toren, M0 liest das als „kein Assist“) sind Datenqualitätsgrenzen, keine Korrektur.
- **Scorerpunkte** = Tore + Assists je Spieler-Spiel, eigene Zielvariable.

### Zeitachse und Gewichtung (wie M1)

`asOf = { date, inclusive }` wie in M1 (Standard: letztes Datum, inclusive). Spieltag-Etiketten werden vorher mit den M1-Helfern `asOfAfterMatchday` (inclusive, letztes Datum des Spieltags) bzw. `asOfBeforeMatchday` (exclusive, erstes Datum) in ein Datum übersetzt. Es gilt die M1-Funktion `timeWeight(Datum, asOf.date, H)` mit `w = 2^(−Alter/H)`, Alter in Kalendertagen; `H = halfLifeDays` hat denselben unabgestimmten Platzhalter wie M1 (365, Abstimmung über M9). Nur Spiele im Datumsschnitt fließen ein, **für Spielerwerte und Prior gleichermaßen**; Spiele nach `asOf` werden nur als `quality.roster.afterAsOf` gezählt. Vor dem ersten Spiel ist das Ergebnis ein gültiger Leerzustand.

### Modell: drei Priors, Posterior, ci90

Pseudo-Spiele-Modell aus `stats.mjs`, je Zielvariable (`goals`, `assists`, `points`) **getrennt**: `count = Σ w·y`, `exposure = Σ w` je Spieler; der Gamma-Prior wird mit `estimateGammaPrior` aus **allen Feldspielern im `asOf`-Fenster** geschätzt (keine Mindest-Exposure; auch Spieler mit sehr kleiner gewichteter Exposure bleiben in der Grundgesamtheit). Der Posterior ist `Gamma(α + count, β + exposure)`; `…PerGameShrunk` ist sein Mittel, `…Ci90` = [q05, q95]. **Die Prior-Unsicherheit ist nicht Bestandteil des ci90.** Die Gewichte wirken wie Bruchteile eines Spiels; das Intervall ist eine Modellaussage im Pseudo-Spiele-Modell, keine Stichprobenvarianz des gewichteten Schätzers.

`…PerGameRaw` = `goals/games` bzw. `assists/games` bzw. `points/games` — die **ungewichtete** Rohquote über die tatsächlichen Spieler-Spiele. Das gewichtete Zählerpaar (`count`, `exposure`) dient **ausschließlich** der Prior-/Posterior-Schätzung (Pseudo-Spiele-Modell) und ist nicht die Rohquote; `weightedExposure` steht separat im Output. `…PerGameRaw` ist also nicht `count/exposure`.

### Stufen

Je Zielvariable getrennt auf der **ungerundeten** geschrumpften Quote aller schätzbaren Spieler: `q20` und `q80` nach Quantil Typ 7 (`quantile` aus `stats.mjs`); `value > q80` → `top`, `value < q20` → `weak`, sonst `middle`. **Gleichstände an `q20`/`q80` landen in `middle`; es gibt keinen Tie-Break.** Deshalb sind die Stufen nicht exakt gleich große Quintile. Nicht schätzbare Spieler haben `null`. **Keine Mindestgröße** (O2: alle Feldspieler mit Exposure im `asOf`-Fenster, ohne Mindestanzahl an Spielen oder Mindest-Exposure): Stufen werden über alle schätzbaren Spieler berechnet, auch bei sehr kleiner Population (bis hinunter zu 1 Spieler, dann `q20 = q80 = Wert`, Stufe `middle`). Nur wenn kein einziger Spieler einen schätzbaren Posterior hat, ist `tiers.<ziel>.status = 'no-estimable-players'` (rein informativ; entfernt niemanden aus `players[]`, dort ist die Stufe dann ohnehin `null`).

### Identität, Name, Teams

- Identität ausschließlich `playerId`. Keine automatische Zusammenführung verschiedener `playerId`s mit gleichem Namen (in den echten Daten „René Thoma“ und „Vincent Wörner“ mit je zwei IDs); Spieler ohne `playerId` erhalten keine Zeile.
- `name`: Schreibweise des **jüngsten** Spiels des Spielers im Fenster; bei gleichem Datum die lexikographisch kleinste; leere Namen werden übersprungen.
- `teams[]`: **alle** `teamKey`s der Spieler-Spiele im Fenster, sortiert nach dem letzten Spieldatum im Fenster absteigend, bei gleichem Datum nach `teamKey` aufsteigend. Es gibt kein Einzelfeld `team`. **Schema-Präzisierung gegenüber dem Spezifikationsbeispiel** (`"team": "…"`): Spieler wechseln zwischen Saisons das Team (46 in den echten Daten), ein einzelnes „aktuelles“ Team wäre eine willkürliche Auswahl.
- Stufen: `tier` gilt für Tore (wie im Spezifikationsbeispiel), `assistsTier` für Assists, `pointsTier` für Punkte.

### Ergebnisobjekt (`fitShooterQuality(data, { asOf, halfLifeDays })`)

`{ model, status, asOf, asOfGameDate, options, players[], priors, tiers, quality, warnings }`.

- `status`: `'ok'` (alle drei Priors schätzbar), `'partial'`, `'not-estimable'` (kein Prior schätzbar), `'empty'` (kein Spieler im Fenster).
- `players[]` (nach `playerId` aufsteigend): `playerId, name, teams, games, weightedExposure`, je Ziel `goals|assists|points`, `…PerGameRaw`, `…PerGameShrunk`, `…Ci90` (`[q05, q95]`), sowie `tier, assistsTier, pointsTier`.
- `priors.<ziel>`: `estimable, reason, alpha, beta, mean, tau2, n, totalCount, totalExposure` (bei nicht schätzbar `null` bzw. `reason` = Fehlercode, z. B. `'prior-not-estimable'`).
- `tiers.<ziel>`: `status` (`'ok'`, `'no-estimable-players'`, `'prior-not-estimable'`, `'no-data'`), `n`, `q20`, `q80`.
- Nicht schätzbare Zustände sind gültige Ergebnisse (analog `emptyResult` in M1): geschätzte Felder `null`, keine NaN/Infinity, kein Clamping, keine Vollschrumpfung; Rohquoten bleiben.

### Warnungen (`warnings[]`, nur wenn der Zähler > 0)

`empty-asof` (`reason`: `no-rows-in-cutoff` | `no-eligible-rows`), `roster-missing-date`, `roster-invalid-date`, `roster-invalid-goalie-flag`, `roster-missing-player-id`, `roster-duplicate-row`, `goals-without-player-row`, `goals-unmatched`, `assists-by-goalies-not-attributed`, `assists-without-player-row`, `assists-placeholder`, `assists-unmatched`, `assists-unknown-kind`, `prior-not-estimable` (`target`, `reason`), `player-not-estimable` (`target`, `count`). Kein Warnfall: Eigentore, `not_assigned`, Strafschuss-Tore, Assistart `none`, kleine oder einelementige Stufen-Population (`tiers.<ziel>.status` ist informativ, siehe „Stufen“).

**Assist-Rohkategorien im Detail** (Abgleich mit der M0-Auswertung, Stand aller fünf Saisons nach der Datenqualitäts-Ausnahme): M0 zählt `assistKind` über **alle** 3251 Tor-Ereignisse (vormals 3127, +124 durch die acht neu einbezogenen 21/22-Spiele): `player` 2267, `none` 964, `placeholder` 17, `unmatched` 3. M2 liest `assistKind` nur für Ereignisse, die **weder Eigentor noch `not_assigned`** sind (bei beiden gibt es laut M0 „keinen Schützen, keinen Assist“ — das Ereignis wird komplett übersprungen, bevor die Assist-Art überhaupt geprüft wird). Die Differenz erklärt sich vollständig darüber:
- `none`: 964 − 21 (auf Eigentoren) = **943** bei M2.
- `placeholder`: 17 − 1 (ein Eigentor mit Platzhalter-Assistnummer 2000) = **16** bei M2.
- `unmatched`: 3 − 3 (alle 3 liegen auf `not_assigned`-Ereignissen) = **0** bei M2.
- `player`: 2267, unverändert gegenüber M0 (kein `player`-Assist liegt auf einem Eigentor oder `not_assigned`, das erzwingt M0 bereits selbst). Davon zerfällt M2 weiter in `attributed` 2190 (Feldspieler mit Kaderplatz im Spiel), `assists-by-goalies-not-attributed` 76 (Assistgeber ist Torhüter) und `assists-without-player-row` 1 — ein Kaderspieler ohne `playerId` (21/22, Spiel 25691), dessen `assistPlayerId` deshalb `null` ist, obwohl `assistKind` `player` lautet.

Es gibt keine Überschneidung zwischen `placeholder`, `unmatched` und „Spieler ohne `playerId`“: Das sind drei unabhängige Fälle (Rohnummer im Platzhalterbereich; Rohnummer passt zu keinem Kaderspieler; Rohnummer passt zu einem Kaderspieler, dessen `player_id` in den Quelldaten fehlt).

### Aufruf

```bash
node scripts/build-league-model.mjs --only M2          # Bericht (Stand über alle Daten, Top 10, Stände am Ende jeder Saison)
node scripts/build-league-model.mjs --only M2 --json   # kanonisches JSON, Werte auf 8 Nachkommastellen gerundet
```

Die Rundung passiert erst an dieser Ausgabegrenze (`roundOutput`). Im JSON steht die Spielerliste nur im Hauptstand (`snapshots[0]`, `label: "all"`); die Saisonende-Stände enthalten Prior, Stufen, Qualität, Warnungen und `playerCount`. Der Standardlauf ohne `--only` (M0-Bericht) und `--only M1` sind unverändert und byte-identisch zum Stand vor M2; der M0-Vollbericht enthält kein M2. `--replicates`/`--seed` gehören zu M1; M2 hat keinen Bootstrap.

### Datenqualitätsgrenzen (echte Daten, Stand aller fünf Saisons)

270 Feldspieler, 3674 Kaderplätze; 503 Goalie-Zeilen und 2 Kaderzeilen ohne `playerId` ausgeschlossen. 3251 Tor-Ereignisse: 3225 Spielern zugeordnet (davon 24 Strafschüsse), 22 Eigentore, 3 `not_assigned`, 1 Tor eines Kaderspielers ohne `playerId` (keine Spielerzeile; 3225 + 1 = 3226 Tore mit Kaderschütze). Assists: 2190 Feldspielern zugeordnet, 76 von Goalies, 1 vom Spieler ohne `playerId`, 16 Platzhalter. Das sind Beobachtungen, keine Pins der Modellwerte.

### Bewusst nicht enthalten

Gegnerbereinigung (Spezifikation: optional; ein späterer Ausbau würde M1 an M2 koppeln), „Heißphase“ (M8), Persistenz (`model-data/`), UI und Ranglisten-Sortierung im Modul. `H = 365` ist ein unabgestimmter Platzhalter (M9). Die Stufen kennen keine Mindestgröße (Owner-Entscheidung O2).

## M3 · Goalie-Bewertung (P3 Runde 2, nur Node/Dry-Run)

Umsetzung der Spezifikation (M3, Abschnitt 4) in `scripts/model/goalie-rating.mjs`, Tests in `scripts/test-model-goalie-rating.mjs`, Aufruf über `node scripts/build-league-model.mjs --only M3`. **Keine UI, keine Persistenz, kein `model-data/`.** M3 liest M0-Daten (`teamGames`, `rosterEntries`, `goalEvents`) und ruft **ausschließlich die öffentlichen Funktionen** von M1 (`fitTeamStrength`, `bootstrapTeamStrength`, `kaderStage`) und M2 (`fitShooterQuality`) auf — keine Änderung, keine Fachlogik-Duplikation in `team-strength.mjs`/`shooter-quality.mjs`.

### Ziel

Goalies aller Teams vergleichbar machen, ohne Schussdaten: Tore verhindert gegenüber Erwartung (TvE), Schützenqualität der Gegentore, Kontext-Splits.

### Erwartete Gegentore: ausschließlich Variante A

`expectedGA` verwendet **ausschließlich** die Angriffsstärke des Gegners und dessen Kontext — **bewusst kein `defense[eigenesTeam]`-Term** (anders als M1s `predictDuel`, das für ein Duell immer beide Teamstärken gegeneinander aufrechnet). Grund: „eigene Abwehr ohne Goalie-Anteil ist mit diesen Daten nicht trennbar“ — genau das ist die Größe, die TvE messen soll; sie darf nicht durch das Abziehen der bereits gefitteten Team-Abwehr vorab neutralisiert werden. Formel (`expectedGoalsAgainst(fit, opponentRow)`):

```
η_A = μ + attack[Gegner] + β_order·O_i + β_le6·K6_i + β_ge9·K9_i + (β_host, falls der GEGNER in diesem Spiel Ausrichter ist)
expectedGA = exp(η_A)
```

`O_i`/`K6_i`/`K9_i` stammen aus der **eigenen Zeile des Gegners** in genau diesem Spiel (dessen `gameOrderOfDay`/`fieldPlayerCount`, über `kaderStage` aus M1), nicht aus der Zeile des eigenen Teams. `μ`, `attack[…]`, die Effekte und `β_host` kommen unverändert aus `fitTeamStrength`s öffentlichem Rückgabeobjekt; ein Team ohne Eintrag im Fit erhält `attack = 0` (Ligaschnitt, wie bei `predictDuel`). Variante B (Goalie als eigener Effekt in einer M1-Regression) ist **nicht implementiert** und nicht Teil dieses Umfangs.

### Solo- versus Shared-Goalie-Spiele

Ein Team-Spiel mit `goalieCount === 1` ist **Solo** und zählt in jeder individuellen Metrik voll. `goalieCount === 2` ist **Shared**: nicht in `games`, `goalsAgainst`, `expectedGA`, `tve`, `tvePerGame`, `tveCI90`, `weakShooterGA`, `weakShooterGAExpected` oder den Kontext-Splits — `sharedGames` ist ein **reiner Zähler** ohne numerischen Beitrag. Team-Spiele ohne Goalie im Kader (`goalieCount === 0`) werden gezählt (`quality.teamGames.none`, Warnung `team-games-without-goalie`), aber keinem Goalie zugeordnet.

### TvE (Tore verhindert gegenüber Erwartung)

```
tve = Σ (expectedGA_i − actualGA_i)   über die Solo-Spiele des Goalies (Neumaier-Summe, stats.sum)
tvePerGame = tve / games
```

**Positives TvE = weniger Gegentore als erwartet** (der Goalie/das Team hat besser verteidigt als der Modell-Erwartungswert für einen durchschnittlichen Gegner in diesem Kontext).

### Sichtbarkeit (0 / 1–3 / ≥4 Solo-Spiele)

`games` = Anzahl **Solo**-Spiele. Bei **0** Spielen bleibt der Goalie in `players[]` (nichts wird entfernt); alle numerischen Metriken sind `null`, `confidence: 'insufficient'`, `teams[]`/`sharedGames` bleiben erhalten, sofern vorhanden. Bei **1–3** Spielen sind die numerischen Werte, soweit berechenbar, vorhanden; `confidence: 'insufficient'`; der Goalie steht **nicht** in `rankList`. Ab **≥ 4** Spielen ist `confidence: 'ok'`, der Goalie kann in `rankList` stehen (zusätzlich nur, wenn `tve` tatsächlich nicht `null` ist). Die Schwelle (`MIN_GAMES_FOR_RANK = 4`) ist das Akzeptanzkriterium der Spezifikation.

### Bootstrap (`tveCI90`)

Einheit = **vollständige Liga-Spiele** (`gameUnits`, beide Team-Seiten gemeinsam) — dieselbe Einheit, die M1s eigenes Bootstrap verwendet, weil `attack[Gegner]` eine ligaweite Größe ist und nur bei vollständigem M1-Refit pro Wiederholung sinnvoll neu geschätzt werden kann. M3 implementiert **kein eigenes Refit**: Es ruft `bootstrapTeamStrength(teamGames, { asOf, replicates, seed, keepReplicates: true })` genau einmal auf und wertet für jedes Replikat denselben `η_A`-Ausdruck auf den **unveränderten, echten** Solo-Spielen des jeweiligen Goalies aus (nur die Koeffizienten variieren). `tveCI90 = [quantile(0.05), quantile(0.95)]` der Replikat-TvE-Werte. Ohne `replicates`/`seed` bleibt `tveCI90` überall `null`.

### Schützenqualität der Gegentore (M2-Kopplung)

`weakShooterGA` = tatsächliche Anzahl Gegentore mit M2-Tier `'weak'` (nur Solo-Spiele). `weakShooterGAExpected` ist **gegnerspezifisch**: je Gegner-Team der Anteil `weak`-getierter Tore an **allen** seinen zuordenbaren Toren im selben `asOf`-Fenster (unabhängig vom einzelnen Spiel, **nicht** ligaweit, nicht zirkulär), angewendet auf die tatsächlichen Gegentore je Spiel dieses Gegners. Ein Gegentor ohne bestimmbaren Tier (kein Kaderplatz mit `playerId`, oder M2-Prior nicht schätzbar) zählt als `tierUnknown` (`quality.scoring.tierUnknown`), **nie** als `weak` oder `top`, bleibt aber Teil von `goalsAgainst`.

### asOf-Kopplung an M1 und M2

M3 erhält **ein** `asOf`-Objekt (`{ date, inclusive }`, dasselbe Format wie M1) und reicht es **unverändert** an `fitTeamStrength`/`bootstrapTeamStrength` **und** `fitShooterQuality` durch. Keine Daten nach `asOf` fließen ein (weder in die Goalie-Spiele selbst noch in M1 noch in M2).

### Kontext-Splits (nur Solo-Spiele)

- `order1vs2`: eigene `derived.gameOrderOfDay` des Goalie-Teams (1. gegenüber 2. Spiel).
- `kaderStufe`: eigene `fieldPlayerCount` über `kaderStage` (le6 / Referenz 7–8 / ge9).
- `hz1vsHz2`: **ausschließlich** über `goalEvents[].period` (1/2) — robust gegenüber kumulierten Zeitformaten, in denen `absSec` allein die Halbzeit nicht mehr zuverlässig anzeigt; rein deskriptiv (Rohzahlen je Halbzeit), kein halbzeitspezifisches Erwartungsmodell.
- `concededShortlyAfterOwnGoal` (Response-Momentum): für jedes eigene Tor eines Solo-Spiels das **chronologisch nächste** Tor-Ereignis desselben Spiels (Reihenfolge über den laufenden Index in `eventKey`, quellgetreu, unabhängig von `absSec`-Lesbarkeit). Ist es ein Gegentor **und** liegt die `absSec`-Differenz ≤ 60 s bzw. ≤ 120 s, zählt `within60`/`within120` (60 s ⊂ 120 s). Eigenes Tor oder nächstes Tor mit `absSec === null` → ausgeschlossen, gezählt/gewarnt, keine Schätzung. **Nicht** die bestehende Response-Momentum-Logik aus `index.html` (andere Richtung: dort Antwort nach einem Gegentor, hier Gegentor nach einem eigenen Tor; andere Fenster 120 s/300 s).
- `shorthandedVsEqual` (Unterzahl gegenüber gleicher Anzahl): **immer `null`**, mit Warnung `shorthanded-split-not-available`. M0 liefert keine abgeleitete Verknüpfung zwischen Strafzeiten (`penaltyEvents`) und Torzeitpunkt (`absSec`); eine solche Ableitung wäre eine neue Fachlogik und ist bewusst nicht gebaut worden. Alle anderen Splits werden davon unabhängig berechnet.

### `highLeverageGA`

**Immer `null`**, mit Warnung `high-leverage-not-available`. M6 (Win Probability/Leverage) existiert nicht; die Phasenreihenfolge (P3 vor P6) wird nicht vorgezogen.

### Identität, Teams

Aggregation ausschließlich über `playerId`. `name`: exakt die M2-Regel (Schreibweise des jüngsten Spiels im Fenster, bei Gleichstand lexikographisch kleinste). `teams[]`: alle tatsächlichen `teamKey`s aus jeder Kaderzeile im Fenster (Solo, Shared und sonstige), sortiert wie in M2 (letztes Datum absteigend, dann `teamKey` aufsteigend). **Keine SG-/`statisticalClub`-Zuordnung** — `teamKey`/`teams[]` bilden ausschließlich die tatsächliche Spielseite ab, wie in M1/M2.

### Ergebnisobjekt (`fitGoalieRating(data, { asOf, halfLifeDays, ridge, replicates, seed })`)

`{ model, status, asOf, asOfGameDate, options, players[], rankList[], priors, quality, warnings }`.

- `status`: `'ok'` (M1 schätzbar), `'not-estimable'` (M1 nicht schätzbar — dann sind `expectedGA`/`tve`/`tveCI90` für alle Goalies `null`), `'empty'` (kein Goalie im Fenster).
- `players[]` (nach `playerId` aufsteigend): `playerId, name, teams, games, sharedGames, goalsAgainst, expectedGA, tve, tvePerGame, tveCI90, weakShooterGA, weakShooterGAExpected, highLeverageGA, splits{order1vs2, hz1vsHz2, kaderStufe, shorthandedVsEqual, concededShortlyAfterOwnGoal}, confidence`.
- `rankList[]`: nur Goalies mit `confidence === 'ok'` und `tve !== null`, sortiert nach `tvePerGame` absteigend (Tiebreak `tve`, dann `playerId`).
- `priors`: `{ m1: {estimable, reason}, m2: {estimable, reason} }` — Transparenz, ob die zugrunde liegenden M1-/M2-Fits schätzbar waren.
- Rundung erst an der Ausgabegrenze (`roundOutput`, 8 Nachkommastellen); das Modul selbst liefert ungerundete Werte.
- Determinismus: fester `seed` (Pflicht zusammen mit `replicates`), kanonisch sortierte Zwischenschritte, `stats.sum` (Neumaier) statt naiver Array-Summe — Ergebnis unabhängig von der Eingabereihenfolge.

### Aufruf

```bash
node scripts/build-league-model.mjs --only M3                           # Bericht (Stand über alle Daten, Rangliste, Stände am Ende jeder Saison)
node scripts/build-league-model.mjs --only M3 --json                    # kanonisches JSON, Werte auf 8 Nachkommastellen gerundet
node scripts/build-league-model.mjs --only M3 --replicates 200 --seed 1 # zusätzlich seeded 90-%-Bootstrap (Spielebene, wie M1)
```

Im JSON stehen `players[]`/`rankList[]` nur im Hauptstand (`snapshots[0]`, `label: "all"`); die Saisonende-Stände enthalten `playerCount`/`rankListCount` statt der Listen. `--replicates`/`--seed` gehören zu `--only M1` oder `--only M3`. Der Standardlauf ohne `--only` (M0-Bericht), `--only M1` und `--only M2` sind unverändert und byte-identisch zum Stand vor M3.

### Datenlage (echte Daten, Stand aller fünf Saisons)

43 Goalies, 444 Team-Spiel-Zeilen im Fenster: 381 Solo, 61 Shared, 2 ohne Goalie im Kader. 39 Goalies mit mindestens einem Solo-Spiel, davon 16 mit weniger als 4 Solo-Spielen; 4 Goalies ganz ohne Solo-Spiel. Das sind Beobachtungen, keine Pins der Modellwerte.

### Bewusst nicht enthalten

Variante B (Goalie-Ridge-Effekt in einer eigenen Regression), `highLeverageGA` (M6), `shorthandedVsEqual` (keine passende abgeleitete M0-Information), Persistenz (`model-data/`), UI, SG-/Vereinszuordnung.

## M4 · Müdigkeit und Belastung (P4, nur Node/Dry-Run bis einschließlich Build-Integration)

Umsetzung der Spezifikation (M4, Abschnitt 4) in `scripts/model/fatigue.mjs`, Tests in `scripts/test-model-fatigue.mjs`, Aufruf über `node scripts/build-league-model.mjs --only M4`. **Keine UI.** M4 liest M0-Daten (`teamGames`, `goalEvents`, `rosterEntries` — Letzteres optional, nur für die Spieler-Ebene) und ruft für die Liga- und Team-Ebene **ausschließlich** die öffentlichen Funktionen von M1 (`bootstrapTeamStrength`, `predictDuel`) auf — kein Refit, keine Fachlogik-Duplikation in `team-strength.mjs`. Die Spieler-Ebene und Fresh-vs-Tired sind vollständig M1-unabhängig (siehe dort). Persistenz ist seit P4b über `--write` möglich, siehe Abschnitt „Modelldaten-Persistenz“ weiter unten.

### Ziel

Prüfen, ob und wie stark die Leistung im 2. Spiel des Tages, in der 2. Halbzeit und in den Schlussminuten nachlässt — für die Liga, für einzelne Teams und für einzelne Spieler — sowie „frisch gegen müde"-Duelle sichtbar machen.

### Liga-Ebene: Poisson-Modell mit M1-Erwartung als Offset

Für jede Team-Spiel-Zeile mit bekannter eigener `derived.gameOrderOfDay` (1 oder 2) liefert `predictDuel` die volle M1-Erwartung `lambdaFull` (die eigene Reihenfolge fließt echt ein, die des Gegners nur als wirkungsloser Vertragsplatzhalter, falls sie fehlt). Halbzeit-Beobachtungen verwenden den Offset `log(lambdaFull/2)`, Segment-Beobachtungen (4 Zehn-Minuten-Abschnitte je Spiel) den Offset `log(lambdaFull/4)`. Zwei getrennte Poisson-Fits ohne Ridge:

```
Halbzeit:  [Intercept, H2-Dummy, order2×H2]                                      Referenz: Halbzeit 1
Segment:   [Intercept, Seg2, Seg3, Seg4, order2×Seg2, order2×Seg3, order2×Seg4]   Referenz: Segment 1
```

`order2` erscheint **nur** in den Interaktionsspalten, nie als eigener Haupteffekt — M1s bereits geschätzter Order-Effekt wird nicht erneut geschätzt. Spalten ohne Variation im Datensatz werden entfernt und gewarnt (`half-effect-not-estimable`/`segment-effect-not-estimable`), ihr Output ist `null`.

Torzuordnung je Halbzeit/Segment folgt `derived.scoreDeltaSide` (nicht `teamSide`) — dieselbe Regel, gegen die `lambdaFull` kalibriert ist (Eigentore zählen für die Gegenseite). Halbzeit ausschließlich über `period` (robust gegenüber kumulierten Zeitformaten, wie bei M3). Segment über `period` + Sekunden innerhalb der Halbzeit. Events mit `scoreDeltaSide === null`, `period ∉ {1,2}` oder `absSec === null` werden gezählt/gewarnt, nicht künstlich zugeordnet.

### Bootstrap: genau ein gemeinsamer Aufruf für Liga- UND Team-Ebene

`bootstrapTeamStrength(teamGames, { asOf, replicates, seed, keepReplicates: true })` wird **genau einmal** aufgerufen. Je Replikat wird aus den Replikat-Koeffizienten ein minimales, mit `predictDuel` kompatibles Fit-Objekt rekonstruiert (`fitLikeFromReplicate`, lokal, nicht exportiert), `lambdaFull` für alle echten Team-Games neu berechnet, beide Poisson-Modelle neu gefittet — **und** dieselben rekonstruierten Koeffizienten treiben `computeTeamLevel` für die Team-Ebene (unten). Kein zweites, eigenes Resampling. `replicates`/`seed` sind bei M4 **Pflicht** (anders als M1/M3): `fitFatigue` liefert ausschließlich bootstrap-gestützte `ci90`-Werte, keinen Nur-Punktschätzung-Pfad. Ein Replikat, dessen Refit fehlschlägt, wird für beide Teilmodelle einheitlich übersprungen (`bootstrap-replicate-refit-failed`); überschreitet der Bootstrap selbst seine Fehlschlagsquote (> 10 %, `stats.mjs`-Regel), wirft `bootstrapTeamStrength` eine `NumericError('bootstrap-failed', …)` — bei sehr datenarmen Datumsschnitten (z. B. frühe Spieltag-Snapshots, siehe Persistenz-Abschnitt) möglich und dort abgefangen, in `fitFatigue` selbst **nicht** abgefangen (kein bootstrap-loser Ausweichpfad vorgesehen).

### Team-Ebene: Halbzeit-Residual, Schlussphasen-Index, Normal-EB-Schrumpfung

Strengere Zeilenauswahl als die Ligaebene: **beide** Seiten müssen eine bekannte `gameOrderOfDay` haben (`expectedDuelForRow` braucht die echte gegnerische Reihenfolge für `expectedGoals.b`, ein Platzhalter wäre hier kein reiner Vertragswert mehr). Je Team-Game:

```
expectedOwn/expectedOpp = predictDuel(fit, …echte Werte beider Seiten…).expectedGoals.{a,b}
diffResidualHalf(HZ1/HZ2) = actualDiffHalf − (expectedOwn/2 − expectedOpp/2)         (2 Beobachtungen je Spiel)
lateResidual = (actualLateOwn − actualLateOpp) − (expectedOwn/4 − expectedOpp/4)      (1 Beobachtung je Spiel, Segment 4)
```

Aggregation getrennt nach `gameOrderOfDay` (1/2) und Kennzahl (Halbzeit/Late-Game): je Team eine Gruppe der **rohen**, nicht vorab gemittelten Beobachtungen. Je Zelle (4 insgesamt) ein `estimateNormalPrior`-Aufruf (Schritt-1-Numerik aus `stats.mjs`, unverändert) über alle Teams mit ≥ 1 Beobachtung, danach je Team `shrinkToReference`. Prior nicht schätzbar (`τ² ≤ 0`, < 2 Teams) → `shrunkEffect = null`, `raw`/`n` bleiben erhalten (kein Clamping, kein Ersatzwert) — bei kleiner Datenlage (frühe Spieltage, insbesondere `game1`×`lateGameIndex`) in der Praxis häufig.

### Spieler-Ebene: game1-vs-game2-Vergleich, H2-Share, Shrinkage gegen den TEAM-Wert

M1-unabhängig, liest ausschließlich `teamGames`/`goalEvents`/`rosterEntries`. Feldspieler-Kaderzeilen-Auswahl wortgleich zu M2 (`isGoalie === false`, gültige `playerId`, höchstens eine Zeile je Spiel/`playerId`), zusätzlich mit der eigenen `teamGames`-Zeile für `gameOrderOfDay` verknüpft. `points = goals + assists` je Spieler-Spiel (wie M2, keine Halbzeit-Bedingung); für den H2-Share-Zähler zählen dagegen **nur** Tore/Assists mit bekannter Halbzeit (`eventHalf`, `period`-basiert).

- **Punkte pro Spiel:** je (`teamKey`, `gameOrderOfDay`)-Zelle ein `estimateNormalPrior` über alle Spieler dieses Teams in dieser Zelle (Gruppe = einzelne Spiel-Punktewerte, nicht vorab gemittelt); Schrumpfung Richtung **Team**-Wert (nicht Liga, nicht ein anderer Spieler). Eligibilität für den game1-vs-game2-Vergleich: `nGame1 ≥ 6 UND nGame2 ≥ 6` (`MIN_GAMES_FOR_PLAYER_COMPARISON`, einzige Schwelle). Spieler mit weniger Spielen bleiben mit Rohwerten in `players[]`, `confidence.eligible = false`.
- **Multi-Team-Fall** (ein Spieler spielt innerhalb derselben Order-Zelle für mehr als ein Team, selten): Rohwert (`points`/`pointsPerGameRaw`) bleibt die Summe/das Mittel über **alle** seine Teams; die Schrumpfung verwendet dagegen nur **eine** Referenz-Zelle (das Team mit den meisten Spielen dieses Spielers in dieser Zelle, Gleichstand `teamKey` aufsteigend) — kein Mischen mehrerer Referenzwerte. Bewusst dokumentierte Randfall-Entscheidung, im Spieler-Level-Audit geprüft.
- **H2-Share:** `estimateBetaPrior`/`betaBinomialPosterior` (Schritt-1-Numerik, unverändert), ein **ligaweiter** (nicht team-spezifischer) Prior je Order-Zelle über alle Spieler mit `halfKnownPoints > 0`. `trials === 0` → alle Felder `null`. Prior nicht schätzbar → `raw` bleibt (falls `trials > 0`), `posteriorMean`/`ci90 = null`.
- Keine Goalie-Zählung, keine doppelte Spielerzeile (dieselbe Dublettenregel wie M2), kein M1-Bootstrap auf dieser Ebene (M1s Bootstrap läuft ohnehin schon für Liga-/Team-Ebene).

### Fresh-vs-Tired: ausschließlich vorhandene M0-Felder

Gerichtete Beobachtung je Team-Game mit bekannter eigener **und** gegnerischer `derived.gameOrderOfDay` (beide 1 oder 2) **und** `ownOrder !== opponentOrder` (sonst kein Fresh-vs-Tired-Duell). Dasselbe reale Spiel liefert bewusst **zwei** gerichtete Beobachtungen (eine je Seite), da die Zielgröße teambezogen ist — strukturell garantiert symmetrisch, da beide Team-Game-Zeilen eines Spiels dieselben Eligibilitätskriterien spiegelbildlich durchlaufen. `state`/`opponentState` = `order === 1 ? 'fresh' : 'tired'`. `opponentPrevGameGoalDiff`/`opponentGameOrderOfDay` werden **unverändert** aus M0 (`normalize.mjs`) übernommen — dort bereits korrekt über die chronologische Spieltags-Gruppierung des Gegners bestimmt, keine `gameId − 1`-Arithmetik hier. `opponentPrevGameResult` wird ausschließlich aus dem **Vorzeichen** von `opponentPrevGameGoalDiff` abgeleitet (`win`/`draw`/`loss`) — keine neue Knappheitskategorie. `m1AdjustedGoalDiff` ist ein rein **optionaler** Zusatz (nur wenn M1 schätzbar, über das bereits vorhandene `expectedDuelForRow`) und ersetzt nie die Kernklassifikation, die ausschließlich aus den Order-Feldern folgt.

### Load Index: bewusst NICHT implementiert

Die Spezifikation (M4.4) sieht `40 · (Feldspieler auf dem Feld) / fieldPlayerCount` mit einer konfigurierbaren Konstante (Kleinfeld: 3) vor. **M0 liefert keine belastbare, zeitlich veränderliche Auf-dem-Feld-Größe:** Es gibt kein Wechsel-/Lineup-Zeitstempel-Feld in den Rohdaten — nur eine statische Spiel-Kaderliste und die feste Start-Aufstellung `starting_players`, die über alle 237 geprüften echten Spiele hinweg konstant aus 5 Feldrollen + 1 Torrolle besteht (kein genuiner, spielabhängig variierender Wert). Eine Rekonstruktion aus Event- oder Minutendaten oder eine erfundene Ersatzkonstante wäre keine Ableitung aus vorhandenen Daten, sondern eine neue Annahme — deshalb nicht umgesetzt. Kein `loadIndex`-Feld irgendwo im Output, kein versteckter Ersatzwert.

### Ergebnisobjekt (`fitFatigue(data, { asOf, replicates, seed, halfLifeDays, ridge })`)

`{ model: 'M4-fatigue', status, asOf, asOfGameDate, league: { effects, halfModel, segmentModel }, teams[], players[], freshVsTired: { status, observations[], summary, quality, warnings }, quality, warnings }`.

- `status`: `'ok'` (M1 UND mindestens eine Team-Game-Zeile mit lambdaFull schätzbar), `'not-estimable'` (M1 nicht schätzbar, oder keine Zeile liefert eine M1-Vorhersage), `'empty'` (keine Zeile im Datumsschnitt). Alle vier Rückgabezweige haben ein **strukturell identisches** Schema (Abschluss-Audit geprüft) — `players`, `freshVsTired`, `quality.player` sind in JEDEM Zweig identisch verfügbar (M1-unabhängig, vor der M1-Estimability-Prüfung berechnet).
- `league.effects`: `halfHz2`, `orderXHalf`, `segments.{seg1..seg4, orderXSeg2..orderXSeg4}`, je `{estimate, ci90}`; `seg1` ist das Referenzsegment (Intercept selbst, keine eigene Design-Spalte).
- `teams[]` (nach `teamKey` aufsteigend): `{teamKey, game1: {hz, lateGameIndex}, game2: {hz, lateGameIndex}}`, je `{n, raw, shrunkEffect, ci90}`.
- `players[]` (nach `playerId` aufsteigend): `{playerId, name, teams[], game1, game2, comparison: {deltaRaw, deltaShrunk}, h2Share: {game1, game2}, confidence: {eligible, nGame1, nGame2, reason}}`.
- `freshVsTired.observations[]`: `{gameId, seasonKey, teamKey, opponentTeamKey, ownOrder, opponentOrder, state, opponentState, ownGoals, opponentGoals, ownGoalDiff, opponentPrevGameResult, opponentPrevGameGoalDiff, m1AdjustedGoalDiff}`; `summary.{fresh,tired}` = `{n, meanGoalDiff, meanM1AdjustedGoalDiff}`.
- `warnings[]` ist in **allen vier** Rückgabezweigen die vollständige Vereinigung aus Liga-/Team-Ebenen-Warnungen, `playerLevel.warnings` und `freshVsTired.warnings` (Abschluss-Audit-Fix: `freshVsTired.warnings` wurde davor nicht auf oberster Ebene gemergt).
- Rundung erst an der Ausgabegrenze (`roundOutput`, 8 Nachkommastellen); das Modul selbst liefert ungerundete Werte.

### Aufruf

```bash
node scripts/build-league-model.mjs --only M4 --replicates 200 --seed 1 # Bericht (--replicates/--seed hier PFLICHT)
node scripts/build-league-model.mjs --only M4 --replicates 200 --seed 1 --json # kanonisches JSON, 8 Nachkommastellen
```

Anders als M1/M2/M3 gibt es für `--only M4` **keine** Saisonende-Schnappschüsse (`snapshots` enthält nur den Hauptstand `"all"`): `fitFatigue` verlangt immer einen Bootstrap, ein zusätzlicher Bootstrap-Lauf je Saison wäre kein „billiger" Zusatzstand wie bei M1/M3 (deren Saisonende-Schleife bewusst ohne Bootstrap läuft) und wurde nicht angefordert. Der Standardlauf ohne `--only` sowie `--only M1`, `--only M2` und `--only M3` sind unverändert und byte-identisch zum Stand vor M4.

### Datenlage (echte Daten, Stand aller fünf Saisons, Bootstrap 20 Replikate Seed 1)

442 Team-Spiel-Zeilen mit bekannter Reihenfolge (11 Teams über alle Saisons), 269 Feldspieler (114 mit 6+6 Eligibilität für den game1-vs-game2-Vergleich), 40 gerichtete Fresh-vs-Tired-Beobachtungen (20 fresh + 20 tired, 20 mit bekanntem `opponentPrevGameGoalDiff`). Das sind Beobachtungen, keine Pins der Modellwerte.

### Bewusst nicht enthalten

Load Index (siehe oben), M9-Walk-forward-Akzeptanz (wie M1/M3), Anreise-Analyse (Spezifikation M4.6, Entscheidung 4: verschoben), UI, SG-/Vereinszuordnung über die tatsächliche Spielseite hinaus.

## Modelldaten-Persistenz (P4b, `--write`)

Umgesetzt in `scripts/build-league-model.mjs` (keine neue Rechenlogik — ausschließlich Aufbau- und Schreibfunktionen um die bestehenden `buildM1`–`buildM4`/`fitFatigue`-Aufrufe herum), Tests in `scripts/test-model-persistence.mjs` (Persistenz-spezifisch) und ergänzend `scripts/test-build-league-model.mjs` (CLI-Validierung, SHA-256-Pins für die unveränderten Dry-Run-Berichte).

### `--write`

```bash
node scripts/build-league-model.mjs --write --replicates 200 --seed 1
```

- `--replicates`/`--seed` sind bei `--write` **immer** Pflicht — kein versteckter Standardwert (dieselbe Konvention wie bei `--only M4`). Fehlen sie, Exit-Code 2 mit einer auf die Persistenz bezogenen Meldung.
- `--write` und `--only` schließen sich **aus**: `--write` berechnet und schreibt immer alle vier Module gemeinsam, nie eine Teilmenge. **Bewusste Abweichung von der Spezifikation** (Abschnitt 3.2 nennt dort `--only M1,M3` als Mehrfachauswahl-Beispiel): `--only` blieb in der tatsächlichen Umsetzung seit P2 durchgehend einwertig (`M1` **oder** `M2` **oder** `M3` **oder** `M4`, nie eine Kombination); eine Mehrfachauswahl wurde nie gebaut. Für `--write` wäre eine Teilmengen-Option ohnehin nur ein Konsistenzrisiko (unvollständige `model-data/`-Stände) ohne echten Nutzen, deshalb hier explizit ausgeschlossen statt nachträglich eine Mehrfachauswahl-Syntax einzuführen.
- Dry-Run bleibt der Standard: ohne `--write` entsteht kein `model-data/`-Verzeichnis, unabhängig von `--only`/`--replicates`/`--seed`.
- Determinismus: gleiche Eingabedaten und gleicher Seed ergeben byte-identische Dateien (kanonische JSON-Serialisierung, siehe unten). Kein Zeitstempel in den Ausgabedateien.

### Zwei Bootstrap-Präzisionsstufen

`alltime.json` und `model-data/<season>.json` verwenden die von `--replicates`/`--seed` angeforderten Werte (volle, vom Aufrufer gewählte Präzision). `model-data/snapshots/<season>.json` verwendet dagegen **immer** `SNAPSHOT_REPLICATES = 20` (die technische Mindestzahl) mit demselben `--seed` — nicht, weil 20 Replikate statistisch als ausreichend gelten, sondern weil `fitFatigue` für **jeden einzelnen** der aktuell 35 abgeschlossenen Spieltage einen eigenen, zwingenden Bootstrap-Lauf braucht; eine volle Replikatzahl (z. B. 200) an jedem Spieltag würde die Laufzeit vervielfachen, ohne dass die Snapshots überhaupt ein sichtbares Intervall hätten (siehe unten). Beide Werte stehen in `manifest.json` (`bootstrap.alltime`, `bootstrap.snapshots`), Letzteres zusätzlich mit `intervals: false`.

### Dateien

```
model-data/
  manifest.json           # schemaVersion, inputHash (SHA-256, canonicalJson wie lineup-data-hash.mjs), modules[], seasons[], bootstrap-Konfiguration
  <season>.json            # Saisonende-Stand (asOf = letztes Datum ALLER ended:true-Modellspiele der Saison) aller vier Module, VOLLE Fit-Objekte
  alltime.json              # aktueller Gesamtstand ("all") aller vier Module, VOLLE Fit-Objekte
  snapshots/
    <season>.json          # NUR abgeschlossene Spieltage (buildMatchdays, Status "abgeschlossen"); je Spieltag schlanke "Kernwerte", KEINE ci90
```

`<season>.json` und `alltime.json` enthalten die **vollständigen, ungeschmälerten** `fit`-Objekte je Modul (`teamStrength` = `fitTeamStrength`-Ergebnis, `shooterQuality` = `fitShooterQuality`-Ergebnis, `goalieRatings` = `fitGoalieRating`-Ergebnis, `fatigue` = `fitFatigue`-Ergebnis) — strukturell identisch zu dem, was `--only M<n> --json` bereits liefert, nur mit gemeinsamer `asOf`-Hülle statt Snapshot-Array. `fatigue` in `<season>.json` ist dabei **neu** berechnet (M4 kennt sonst keine Saisonende-Stände, `buildM4()` für `--only M4` bleibt unverändert; die neue Funktion `buildM4SeasonEnd` läuft ausschließlich hinter `--write`).

### Snapshots: schlanke „Kernwerte", keine Intervalle (Owner-Entscheidung)

Regel: in den Snapshot nur, was eine Verlaufskurve über Spieltage speisen kann, sonst nichts — insbesondere **keine `ci90`-Felder irgendwo**. Verläufe brauchen keine Intervalle; Intervalle gehören zum Hauptstand (`<season>.json`/`alltime.json`).

| Modul | Snapshot-Inhalt |
|---|---|
| `teamStrength` | alle Teams **dieser Saison** mit `attack`/`defense` (Punktschätzer) |
| `shooterQuality` | nur Prior-Kennzahlen (`alpha`, `beta`, `mean`, `tau2`) und Tier-Schwellen (`q20`, `q80`) je Zielvariable, **kein** `players[]` |
| `goalieRatings` | die Rangliste mit `playerId`/`name`/`tvePerGame`, kein `tve`, kein `tveCI90` |
| `fatigue` | Liga-Effekte (Punktschätzer) und je Team `game1`/`game2` mit `hz`/`lateGameIndex`, je nur `shrunkEffect` |

**Saison-Team-Filter (`teamStrength`):** M1 selbst rechnet unverändert über alle Saisons mit Zeitgewichtung; ein Snapshot einer Saison zeigt aber **ausschließlich** Teams, die in **dieser** Saison tatsächlich mindestens ein Modellspiel bestritten haben (nicht die vollständige, zeitgewichtete Teamliste über alle Saisons hinweg — für 25/26 sind das 8 Teams, nicht die 11 des multi-saisonalen Fits). Owner-Entscheidung, Begründung: ein Team ohne Spiel in der betrachteten Saison hat dort keinen sinnvollen Verlauf.

**`null` bleibt `null`:** Ist ein Prior an einem Spieltag nicht schätzbar (kleine Stichprobe, `τ² ≤ 0` o. Ä. — insbesondere bei `game1`×`lateGameIndex` an frühen Spieltagen häufig), ist `shrunkEffect`/`q20`/`q80`/etc. `null`. Kein Clamping, kein Ersatzwert, kein Runden auf `0`.

**Bootstrap-Instabilität an sehr frühen Spieltagen:** Ein Spieltag mit sehr wenigen Zeilen kann M4s Pflicht-Bootstrap über die eigene Fehlschlagsquote-Schwelle (> 10 % nicht konvergierter Refits, `stats.mjs`) treiben; `bootstrapTeamStrength` wirft dann `NumericError('bootstrap-failed', …)`. Der Build fängt genau diesen Fall pro Spieltag ab und trägt einen gültigen `status: 'not-estimable'`-Zustand ein (leere Liga-Effekte, leere Teams) statt den gesamten `--write`-Lauf abzubrechen — in den echten Daten tritt das exakt einmal auf (21/22, Spieltag 1, das mit Abstand datenärmste Fenster).

### Atomares Schreiben

`writeJsonCanonicalAtomic(filePath, value)`: `mkdir` (rekursiv) für das Zielverzeichnis, Schreiben nach `<Ziel>.tmp-<pid>`, dann `rename` auf den endgültigen Pfad — dieselbe Temp-Datei-plus-rename-Konvention wie `update-season-data.mjs`/`import-season-data.mjs`. Der Inhalt ist die **kanonische** JSON-Form (`canonicalJson` aus `lineup-data-hash.mjs`, alphabetisch sortierte Schlüssel), nicht `JSON.stringify` — Determinismus unabhängig von der zufälligen Objektschlüssel-Erzeugungsreihenfolge im Code. Ein fehlschlagender Schreibversuch (z. B. ungültiger Zielpfad) hinterlässt weder eine Teildatei am Zielpfad noch verändert er eine andere, bereits vorhandene Datei.

### Laufzeit und Größe (echte Daten, alle fünf Saisons, 20 Replikate Alltime + Snapshots, Seed 1)

Vollständiger `--write`-Lauf: **≈ 25 Sekunden** (gemessen, weit unter dem 2-Minuten-Ziel). 12 Dateien insgesamt; `<season>.json`/`alltime.json` zwischen 141 KB (21/22, wenigste Saisons-Teams) und 348 KB (`alltime.json`); `snapshots/<season>.json` zwischen 22 KB (21/22) und 42 KB (25/26) — alle weit unter dem 2-MB-Grenzwert je Datei. Nach der Spieltagsstatus-Korrektur (3.6.3, Postponed/Canceled blockieren „abgeschlossen“ nicht mehr) hat 24/25 statt 3 jetzt 7 abgeschlossene Spieltage, entsprechend größere Snapshot-Datei (≈ 33 KB statt vormals ≈ 14 KB). Höhere Alltime-Replikatzahlen (z. B. 200) verlängern nur den Alltime-/Saisonende-Teil messbar (M4 allein ≈ 7,5 s bei 200 Replikaten auf dem vollen Datensatz), nicht den Snapshot-Teil (fest bei `SNAPSHOT_REPLICATES`).

### Bewusst nicht enthalten

Dashboard-Anbindung (`fetch('model-data/…')`, Spezifikation 3.4), Veraltet-Hinweis im UI bei abweichendem `inputHash`, `spieltag.mjs`-Befehl (Spezifikation 3.6.6) und dessen Aufruf der bestehenden Importer, `--only`-Mehrfachauswahl.

## Bewusst nicht interpretierte Daten

| Thema | Umgang in M0 |
|---|---|
| **Eigentor-Gutschrift** | Nicht entschieden. `teamSide`/`teamKey` = Rohwert `event_team`, `goalType`/`isOwnGoal` und Roh-Spielstände bleiben erhalten; `derived.scoreDeltaSide` zeigt nur, welche Seite im Spielstand steigt. In den Daten gibt es 2 Fälle (21/22, Spiele 25663 und 25696), in denen der Spielstand für die Gegenseite von `event_team` steigt; sie stehen als Qualitätswarnung. Die Gutschrift folgt in einem späteren Analysemodul. |
| **Strafminuten** | Keine Umrechnung, keine Klassifikation. Nur Rohdaten (siehe oben). |
| **Fehlende/unklare Zeiten** | `absSec = null`, keine Rekonstruktion oder Schätzung; Rohzeit bleibt (4 nicht lesbare Tore in 21/22, 14 widersprüchliche Events in 21/22 und 22/23 — davon 12 in 21/22 seit der Datenqualitäts-Ausnahme, zuvor 3, da die acht neu einbezogenen Spiele weitere Fälle beitragen). |
| **Hosting ohne Rohwert** | `isHostingTeam = null` (21/22 bis 24/25). Keine Ableitung. |
| **Platzhalter und Spielerzuordnung** | Platzhalternummern (1000, 2000) werden keinem Spieler zugeordnet; Rohnummer bleibt. Die Erkennung ist eine Quellformat-Regel, keine fachliche. |
| **21/22-Spiele mit `ended = false`, aber Endstand und Events** | Seit der Datenqualitäts-Ausnahme (siehe Abschnitt „Spielfilter (Modell-Spiele)“ oben) NICHT mehr ausgeschlossen: 25677, 25679, 25681, 25682, 25683, 26478, 26613, 26644 sind jetzt im Modell (`quality.endedFalseIncludedByException`). Darunter drei Ulm-Spiele: 25677 (VBC Olympia Ludwigshafen – SG Sparks Tübingen-Ulm 9:10), 26613 (Sportvg Feuerbach – SG Sparks Tübingen-Ulm 17:3), 26644 (SG Sparks Tübingen-Ulm – TV Schriesheim 2:17). Ulm hat dadurch für 21/22 jetzt 12 statt vormals 9 Team-Spiele im Modell. |
| **Statusfelder** | `notice_type` wird nur für „verschoben/verlegt“ ausgewertet; andere Werte (z. B. `Canceled`) bleiben Rohwert ohne Wirkung. |

## Datenqualitätsbericht (`quality`)

Je Saison u. a.: Spiele, beendet, nicht beendet, Modell-Spiele, Ausschlüsse (Forfait, verschoben, Jugend, ohne Endstand), `excludedGames`, `endedFalseWithEvidence`, `endedFalseIncludedByException`; Tore und Torarten; Eigentore (Events, Spiele, davon mit Ulm-Beteiligung); Penalty-Schüsse, Strafen, Timeouts; Zeitformate (kumuliert, gemischt, HZ1 > 20:00, nicht lesbar); Assist-Rohformen; Torschützen-Zuordnung und Platzhalternummern; Torsumme ≠ Endstand; Spielstandketten (`scoreChainBreaks`, `scoreMissing`, `scoreDeltaSideConflicts`); `hosting_club` fehlend/vorhanden; Goalies (ohne Goalie, ohne Kader, zwei Goalies, Flag-Widersprüche); Team-Spieltage mit ≠ 2 beendeten Spielen.

## Bekannte Datenqualitätsbefunde

| | 21/22 | 22/23 | 23/24 | 24/25 | 25/26 |
|---|---|---|---|---|---|
| Spiele / beendet / Modell | 42 / 42 / 42 | 42 / 42 / 42 | 42 / 42 / 42 | 51 / 42 / 40 | 60 / 56 / 56 |
| Ausgeschlossene Spiele | 0 | 0 | 0 | 11 | 4 |
| Tore | 619 | 613 | 583 | 576 | 860 |
| Spiele mit kumulierter HZ2-Zeit (davon gemischt) | 14 (3) | 13 (1) | 6 | 13 | 7 |
| Eigentore (Spiele, davon Ulm) | 6 (1) | 4 (2) | 5 (0) | 3 (1) | 4 (1) |
| `not_assigned` | 2 | 1 | – | – | – |
| Assist-Rohform | 172 × Schlüssel fehlt | 183 × `0` | 167 × `0` | 193 × `0` | 249 × `0` |
| `hosting_club` | fehlt | fehlt | fehlt | fehlt | vorhanden |
| Team-Spiele ohne Goalie (ohne Kader) | 0 | 1 | 0 | 5 (4) | 0 |
| Team-Spiele mit zwei Goalies | 5 | 14 | 18 | 17 | 7 |
| Team-Spieltage mit ≠ 2 Spielen | 0 | 0 | 0 | 0 | 0 |
| Timeouts | 22 | 19 | 24 | 29 | 36 |
| Penalty-Schüsse | 4 | 5 | 5 | 4 | 6 |
| Torsumme ≠ Endstand | Spiel 25663 (15 Events, Endstand 14) | – | – | 40512, 40514 (Forfait, keine Events) | – |
| Spielstandketten-Brüche / `scoreDeltaSide` ≠ `event_team` | 6 / 2 | 0 / 0 | 0 / 0 | 0 / 0 | 0 / 0 |

Stand nach der Datenqualitäts-Ausnahme (siehe „Spielfilter (Modell-Spiele)“ oben); 21/22 hatte vorher 34 beendete/Modell-Spiele, 8 ausgeschlossene Spiele, 495 Tore, 11 (2) kumulierte HZ2-Spiele, 138 × fehlenden Assist-Schlüssel, 2 Team-Spieltage mit ≠ 2 Spielen (MD11), 13 Timeouts, 3 Penalty-Schüsse und 4 Spielstandketten-Brüche — die Differenz sind ausschließlich die acht neu einbezogenen Spiele.

Weitere Befunde:

- **Ausgeschlossene Spiele 24/25 und 25/26:** In 24/25 zwei beendete Forfait-Spiele (40512, 40514) und 9 nicht beendete Spiele ohne Events (`notice_type` `Postponed` ×7, `Canceled` ×2); in 25/26 vier nicht beendete Spiele (`Postponed` ×4).
- **Assists:** In 21/22 fehlt der Schlüssel `assist` bei 172 Toren (nicht `null`, nicht `0`); in den späteren Saisons steht bei Toren ohne Assist `0`. Zusätzlich 17 Assists mit Platzhalter 2000 in 21/22.
- **Zeit:** In 3 Spielen (21/22: 25661, 25693; 22/23: 29268) enthalten kumulierte Spiele auch Halbzeit-2-Zeiten ≤ 20:00. Halbzeit 1 über 20:00 kommt in keiner Saison vor.
- **Spielstandketten (21/22):** In Spiel 25663 hat ein Tor-Event keine Spielstandänderung (das erklärt „15 Events ≠ Endstand 14“), in Spiel 25693 folgen drei Spielstände nicht mit genau einem Tor, in Spiel 25682 (seit der Datenqualitäts-Ausnahme einbezogen) zwei weitere. Die zwei Konflikte `event_team` ↔ `scoreDeltaSide` sind Eigentore in 25663 und 25696 (unverändert). In den anderen Saisons steigt der Spielstand bei Eigentoren für `event_team`.
- **Team-Zuordnung 24/25:** `SG Freiburg-Tübingen` wird nach der bestehenden Regel (`getCanonicalTeamName`) als `Breisgau Bandits` geführt.
- **Trikotnummern-Platzhalter:** 1000 (Eigentor), 2000 (`not_assigned`, Assist).

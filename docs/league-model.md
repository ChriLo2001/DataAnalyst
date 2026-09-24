# Liga-Modell: technische Dokumentation (Stand P1a / M0)

Dieses Dokument beschreibt ausschließlich, was in **P1a (M0 Datenaufbereitung)** tatsächlich implementiert ist. Grundlage ist die Spezifikation `docs/liga-analytics-spezifikation.md` (Abschnitt 4, M0). Weitere Module sind noch nicht implementiert und hier nicht beschrieben.

**M0 ist Normalisierung und Datenqualitätsbasis.** M0 entscheidet keine späteren fachlichen Kennzahlen: keine Eigentor-Gutschrift, keine Strafminuten, keine Zeitrekonstruktion, keine Spieleridentität aus Platzhaltern, kein Ableiten des Ausrichters ohne Rohwert.

## Dateien

| Datei | Zweck |
|---|---|
| `scripts/model/normalize.mjs` | reine Normalisierung (`normalizeSeason`), Team-Regeln, Zeit- und Spielfilter-Helfer |
| `scripts/build-league-model.mjs` | CLI: liest `season-data/`, normalisiert alle Saisons, druckt den Datenqualitätsbericht |
| `scripts/test-model-normalize.mjs` | synthetische Fälle, Negativ-/Invariantentests und Drift-Test gegen `index.html` |
| `scripts/test-build-league-model.mjs` | Pins der echten Saisons, unabhängige Nachrechnung gegen die Rohdaten, Determinismus, Dry-Run |

Wiederverwendet (nicht kopiert): `compareGamesChronologically` (`game-ordering.mjs`), `buildMatchdays` (`matchday-derivation.mjs`), `canonicalJson` und `sha256Hex` (`lineup-data-hash.mjs`). `index.html` wird nicht verändert und nicht geladen.

## Aufruf und Dry-Run

```bash
node scripts/build-league-model.mjs          # Bericht im Terminal
node scripts/build-league-model.mjs --json   # derselbe Bericht als kanonisches JSON
```

- Das Skript ist ein **Dry-Run** und schreibt nichts. Einen Schreibmodus gibt es in P1a nicht: `--write` wird mit Exit-Code 2 abgelehnt. Es entstehen keine `model-data/`-Dateien.
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
| 1 | `not_ended` | `ended !== true` (strikt; fehlend oder `"true"` als Text zählt nicht) | Spezifikation M0.1 und P1a-Entscheidung |
| 2 | `youth` | `isYouthGame`-Regel aus `index.html` | Spezifikation M0.1 |
| 3 | `forfeit` | `result.forfait === true` | Spezifikation M0.1 |
| 4 | `postponed` | `notice_type` passt auf `postpone`, `verschoben` oder `verlegt` | Spezifikation M0.1 (verschobene Spiele), 3.6.3 (verlegt) |
| 5 | `no_result` | kein numerischer Endstand in `result` | Spezifikation M0.1 |

Es gibt keine weitere Interpretation von Statusfeldern: Zum Beispiel wird `notice_type "Canceled"` nicht als Ausschlussgrund gewertet. „Fremdliga"-Spiele werden nicht gesondert behandelt (die Saisondateien enthalten nur Ligaspiele).

**Abweichung zum Dashboard:** `isGamePlayed()` in `index.html` zählt Spiele mit Tor-Events als gespielt, auch wenn `ended` nicht `true` ist. Das Modell tut das nicht. `isGamePlayed` ist unverändert.

Die Qualitätskennzahlen beziehen sich auf **alle beendeten Spiele** (auch später ausgeschlossene Forfait-Spiele); `modelGames` und die Arrays enthalten nur Modell-Spiele.

### Ausgeschlossene Spiele im Bericht

`quality.excludedGames[]` führt **jedes** ausgeschlossene Spiel: `seasonKey`, `gameId`, `date`, `home`, `guest`, `ulmInvolved`, `reason`, `reasons`, die Rohmarker `ended`, `noticeType` (`notice_type`) und `resultForfait` (`result.forfait`), `score` (Endstand, falls vorhanden) und `events` (Anzahl). `quality.endedFalseWithEvidence` ist die Untermenge der nicht beendeten Spiele mit Events oder Endstand. Der Terminal-Bericht listet alle beendeten Ausschlüsse und alle nicht beendeten Spiele mit Events/Endstand einzeln; nicht beendete Spiele ohne Events/Endstand erscheinen als Zahl mit der Verteilung der `notice_type`-Rohwerte.

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

## Bewusst nicht interpretierte Daten

| Thema | Umgang in M0 |
|---|---|
| **Eigentor-Gutschrift** | Nicht entschieden. `teamSide`/`teamKey` = Rohwert `event_team`, `goalType`/`isOwnGoal` und Roh-Spielstände bleiben erhalten; `derived.scoreDeltaSide` zeigt nur, welche Seite im Spielstand steigt. In den Daten gibt es 2 Fälle (21/22, Spiele 25663 und 25696), in denen der Spielstand für die Gegenseite von `event_team` steigt; sie stehen als Qualitätswarnung. Die Gutschrift folgt in einem späteren Analysemodul. |
| **Strafminuten** | Keine Umrechnung, keine Klassifikation. Nur Rohdaten (siehe oben). |
| **Fehlende/unklare Zeiten** | `absSec = null`, keine Rekonstruktion oder Schätzung; Rohzeit bleibt (4 nicht lesbare Tore in 21/22, 5 widersprüchliche Events in 21/22 und 22/23). |
| **Hosting ohne Rohwert** | `isHostingTeam = null` (21/22 bis 24/25). Keine Ableitung. |
| **Platzhalter und Spielerzuordnung** | Platzhalternummern (1000, 2000) werden keinem Spieler zugeordnet; Rohnummer bleibt. Die Erkennung ist eine Quellformat-Regel, keine fachliche. |
| **Ausgeschlossene 21/22-Spiele** | Acht Spiele mit `ended = false`, aber Endstand und Events (25677, 25679, 25681, 25682, 25683, 26478, 26613, 26644) sind nicht im Modell. Darunter drei Ulm-Spiele: 25677 (VBC Olympia Ludwigshafen – SG Sparks Tübingen-Ulm 9:10), 26613 (Sportvg Feuerbach – SG Sparks Tübingen-Ulm 17:3), 26644 (SG Sparks Tübingen-Ulm – TV Schriesheim 2:17). Ulm hat dadurch für 21/22 nur 9 statt 12 Team-Spiele im Modell. |
| **Statusfelder** | `notice_type` wird nur für „verschoben/verlegt“ ausgewertet; andere Werte (z. B. `Canceled`) bleiben Rohwert ohne Wirkung. |

## Datenqualitätsbericht (`quality`)

Je Saison u. a.: Spiele, beendet, nicht beendet, Modell-Spiele, Ausschlüsse (Forfait, verschoben, Jugend, ohne Endstand), `excludedGames`, `endedFalseWithEvidence`; Tore und Torarten; Eigentore (Events, Spiele, davon mit Ulm-Beteiligung); Penalty-Schüsse, Strafen, Timeouts; Zeitformate (kumuliert, gemischt, HZ1 > 20:00, nicht lesbar); Assist-Rohformen; Torschützen-Zuordnung und Platzhalternummern; Torsumme ≠ Endstand; Spielstandketten (`scoreChainBreaks`, `scoreMissing`, `scoreDeltaSideConflicts`); `hosting_club` fehlend/vorhanden; Goalies (ohne Goalie, ohne Kader, zwei Goalies, Flag-Widersprüche); Team-Spieltage mit ≠ 2 beendeten Spielen.

## Bekannte Datenqualitätsbefunde

| | 21/22 | 22/23 | 23/24 | 24/25 | 25/26 |
|---|---|---|---|---|---|
| Spiele / beendet / Modell | 42 / 34 / 34 | 42 / 42 / 42 | 42 / 42 / 42 | 51 / 42 / 40 | 60 / 56 / 56 |
| Ausgeschlossene Spiele | 8 | 0 | 0 | 11 | 4 |
| Tore | 495 | 613 | 583 | 576 | 860 |
| Spiele mit kumulierter HZ2-Zeit (davon gemischt) | 11 (2) | 13 (1) | 6 | 13 | 7 |
| Eigentore (Spiele, davon Ulm) | 6 (1) | 4 (2) | 5 (0) | 3 (1) | 4 (1) |
| `not_assigned` | 2 | 1 | – | – | – |
| Assist-Rohform | 138 × Schlüssel fehlt | 183 × `0` | 167 × `0` | 193 × `0` | 249 × `0` |
| `hosting_club` | fehlt | fehlt | fehlt | fehlt | vorhanden |
| Team-Spiele ohne Goalie (ohne Kader) | 0 | 1 | 0 | 5 (4) | 0 |
| Team-Spiele mit zwei Goalies | 5 | 14 | 18 | 17 | 7 |
| Team-Spieltage mit ≠ 2 Spielen | 2 (MD11) | 0 | 0 | 0 | 0 |
| Timeouts | 13 | 19 | 24 | 29 | 36 |
| Penalty-Schüsse | 3 | 5 | 5 | 4 | 6 |
| Torsumme ≠ Endstand | Spiel 25663 (15 Events, Endstand 14) | – | – | 40512, 40514 (Forfait, keine Events) | – |
| Spielstandketten-Brüche / `scoreDeltaSide` ≠ `event_team` | 4 / 2 | 0 / 0 | 0 / 0 | 0 / 0 | 0 / 0 |

Weitere Befunde:

- **Ausgeschlossene Spiele 24/25 und 25/26:** In 24/25 zwei beendete Forfait-Spiele (40512, 40514) und 9 nicht beendete Spiele ohne Events (`notice_type` `Postponed` ×7, `Canceled` ×2); in 25/26 vier nicht beendete Spiele (`Postponed` ×4).
- **Assists:** In 21/22 fehlt der Schlüssel `assist` bei 138 Toren (nicht `null`, nicht `0`); in den späteren Saisons steht bei Toren ohne Assist `0`. Zusätzlich 17 Assists mit Platzhalter 2000 in 21/22.
- **Zeit:** In 3 Spielen (21/22: 25661, 25693; 22/23: 29268) enthalten kumulierte Spiele auch Halbzeit-2-Zeiten ≤ 20:00. Halbzeit 1 über 20:00 kommt in keiner Saison vor.
- **Spielstandketten (21/22):** In Spiel 25663 hat ein Tor-Event keine Spielstandänderung (das erklärt „15 Events ≠ Endstand 14“), in Spiel 25693 folgen drei Spielstände nicht mit genau einem Tor. Die zwei Konflikte `event_team` ↔ `scoreDeltaSide` sind Eigentore in 25663 und 25696. In den anderen Saisons steigt der Spielstand bei Eigentoren für `event_team`.
- **Team-Zuordnung 24/25:** `SG Freiburg-Tübingen` wird nach der bestehenden Regel (`getCanonicalTeamName`) als `Breisgau Bandits` geführt.
- **Trikotnummern-Platzhalter:** 1000 (Eigentor), 2000 (`not_assigned`, Assist).

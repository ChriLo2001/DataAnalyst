# UI-Inventar (P0b.1)

Bestandsaufnahme aller bestehenden Render-Funktionen und UI-Zustände in `index.html`
gemäß Spezifikation Abschnitt 6.10 ("Nichts geht verloren"), als Grundlage für den
Umbau in P0b.2 ff. Stand: HEAD `b54301c` (nach Abschluss P0a.1–P0a.8).

**Methodik:** Systematische Suche nach allen `function r…(`-Deklarationen (Regex
`^function r[A-Za-z0-9_]*\(`), allen `window.open…`-Einstiegspunkten, allen
`S.page`/`setPage()`-Zielen sowie allen Tab-/Modus-Feldern (`S.activeTab`,
`S.globalTab`, `S.matchcenterTab`, `S.activeGoalieTab`, `S.comparisonMode`,
`S.lineupBuilderMode`, `S.einsatzCenterMode`). Ergebnis: **~250 `r…`-Funktionen**,
**10 `S.page`-Werte** plus Cover-Screen, **9 `window.open…`-Einstiegspunkte**.

Jede in Abschnitt 2 gelistete **Seite/Ansicht** erhält die volle Zuordnung
(1–7 gemäß Auftrag). Die in Abschnitt 3 gelisteten **Komponenten** (wiederverwendete
Bausteine innerhalb der Seiten) werden aus Umfangsgründen thematisch gruppiert
dokumentiert, jede einzelne Funktion ist aber namentlich aufgeführt (Vollständigkeit).

---

## 1. Bestehende Routing-/Navigationsstruktur

### 1.1 Aktuelle Seitenzustände (`S.page`)

Ermittelt aus dem zentralen Dispatch in `_render()` (index.html:21494) sowie allen
`page:'…'`-Literalen in `setState()`-Aufrufen:

| `S.page`-Wert | Entry-Render-Funktion | Erreichbar über |
|---|---|---|
| *(kein Wert / Fallback)* | Spieler-/Saisonprofil-Block direkt in `_render()` (kein eigenes `rXxxPage()`) | `setPage('player')`, `setP(playerKey)` |
| `'team'` | `rTeamPage()` | `setPage('team')` |
| `'seasonLanding'` | `rSeasonLandingPage()` | automatisch nach `loadSeason()`, wenn Saison (noch) keine Spieler hat |
| `'matchcenter'` | `rMatchcenterPage()` | `setPage('matchcenter')` → `window.openMatchcenter()`, Cover-Button |
| `'lineupBuilder'` | `rLineupBuilderPage()` | `setPage('lineupBuilder')` → `window.openLineupBuilder()`, Cover-Button |
| `'einsatzCenter'` (Modus `view`) | `rEinsatzCenterPage()` | `setPage('einsatzCenter')` → `window.openEinsatzCenter()` (nur im Header-Nav, **kein** Cover-Button) |
| `'einsatzCenter'` (Modus `edit`, `S.einsatzCenterMode==='edit'`) | `rEinsatzCenterEditPage()` | `startEinsatzCenterDraftMode()` aus der View-Seite heraus |
| `'comparisonCenter'` | `rComparisonCenterPage()` | `setPage('comparisonCenter')` → `window.openComparisonCenter()`, Cover-Button |
| `'hallOfFame'` | `rHallOfFamePage()` | `window.openHallOfFame()` — **nur** Cover-Button, kein `setPage()`-Aufruf, kein Header-Nav-Link |
| `'alltimePlayers'` | `rAllTimePlayersPage()` | `window.openAllTimePlayers()` — **nur** Cover-Button |
| `'lexicon'` | `rLexiconPage()` | `window.openLexicon()` — **nur** eigener Cover-Button (`cv-lexicon-btn`), kein Header-Nav-Link |

**Befund:** Von den 10 `S.page`-Werten sind nur 6 über die im Dashboard sichtbare
Header-Navigation (`hdr-nav`, index.html:21516–21525: Spieler, Team, Matchcenter,
Lineup Builder, Einsatz-Center, Vergleichszentrum) erreichbar. Hall of Fame, Alltime
Spieler und Lexikon sind **ausschließlich über das Cover** erreichbar — ist man
bereits in einer geladenen Saison, muss man erst über „← Cover" zurück, um dorthin
zu gelangen. Das ist relevant für die 6.11-Anforderung „höchstens 3 Klicks".

### 1.2 Bestehende Season-Navigation

- Cover-Screen (`#cover`, kein `S.page`, sondern eigenständiges DOM-Element,
  gesteuert über `S.screen==='cover'|'main'|'loading'`) zeigt 6 Saison-Buttons in
  zwei Gruppen: „Spielgemeinschaft mit Tübingen" (21/22–23/24) und „VfB Ulm"
  (24/25–26/27), je `onclick="openSeason('<key>')"`.
- `window.openSeason(key)` → `loadSeason(key)` → bei Erfolg `applySeasonContext()`
  → `setState({screen:'main', activeSeasonKey, selectedSeasonKey, page, …})`.
- Zusätzlich **pro-Modul-eigene** Season-Selects (unabhängig vom globalen
  `activeSeasonKey`): Matchcenter (`setMatchcenterSeason`), Lineup Builder
  (`setLineupBuilderSeason`), Einsatz-Center (`setEinsatzCenterSeason`),
  Vergleichszentrum-Duo (`comparisonDuoSeasonKey`). Diese vier Saison-Zustände
  sind bewusst getrennt vom globalen `S.activeSeasonKey` (P0a.6/P0a.7 unverändert
  gelassen) und laufen aktuell **nicht** über die Kontextleisten-Idee aus 6.3.

### 1.3 Bestehende Hash-Logik nach P0a.8

- Hash-Format ausschließlich für **Season + asOf**: `#/<seasonKey mit "-">[?asOf=…]`
  (z. B. `#/25-26`, `#/25-26?asOf=2026-01-25T14:50`).
- Funktionen: `parseAppHash`, `buildAppHash`, `computeCurrentAppHash`,
  `syncHashFromState`, `applyAppHash`, `initHashRouting` (alle in index.html,
  unmittelbar nach `getSeasonStatsAsOf()`).
- **Deckt `S.page` bewusst NICHT ab** (P0a.8-Doku-Kommentar: „kein Seiten-Routing
  in dieser Phase"). Das in 6.8 verlangte „`setPage()`-Aufrufe auf Routing
  umstellen, `S.page` aus der Adresse ableiten" ist damit **noch nicht erfüllt**
  und wäre Gegenstand einer eigenen P0b-Teilphase (siehe Implementierungsplan
  P0b.4 aus der vorherigen P0b-Analyse).
- `S.asOf` selbst hat noch **keine UI** — nur die P0a.7/P0a.8-Datenlogik existiert.

### 1.4 Direkter Zugriff über `setPage()`/`window.open…()`

Alle 9 `window.open…`-Einstiegspunkte: `openSeason`, `openAllTimePlayers`,
`openHallOfFame`, `openComparisonCenter`, `openMatchcenter`, `openLineupBuilder`,
`openLexicon`, `openEinsatzCenter`, `openMatchcenterStoryPreview` (Sub-Funktion
innerhalb des Matchcenters, kein eigener `S.page`-Wert),
`openDuoProPicker` (Overlay/Picker innerhalb bestehender Seiten, kein eigener
`S.page`-Wert). `setPage(p)` (index.html:2120) selbst delegiert für 6 der 10 Werte
an genau diese `open…()`-Funktionen und setzt für die übrigen (`player`, `team`,
`seasonLanding`, `lexicon`) `S.page` direkt.

---

## 2. Hauptseiten und benannte Unteransichten (volle Zuordnung)

Format je Eintrag: **1** Name · **2** aktueller Ort/Kontext · **3** neuer
Hauptbereich (6.3) · **4** Ebene · **5** Abhängigkeiten/Daten · **6** Verschieben
oder Umbau · **7** Eindeutigkeit.

### 2.1 Cover / Startseite

1. Cover-Screen (kein Renderfunktions-Name; statisches DOM ab index.html:~1300, inkl. `openSeason`/`open…`-Buttons)
2. Eigenständiger Screen (`S.screen==='cover'`), einzige Einstiegsseite ohne Season
3. **Übersicht** (6.3: „ersetzt Cover als Startseite"), Cover bleibt optionaler Intro-Screen (Entscheidung 11)
4. Ebene 1
5. `getGlobalAllTimeSnapshot()` (Cover-Statistik-Kacheln `cvs-games`/`cvs-players`/`cvs-pts`), `SEASON_CONFIG`
6. **Umbau** — Rollentausch mit neuer Übersicht nötig (Entscheidung 11), keine reine Verschiebung
7. Eindeutig, aber mit Klärungsbedarf: Reihenfolge/Timing des Rollentauschs (siehe P0b.7 im Implementierungsplan)

### 2.2 Saison-Landingpage

1. `rSeasonLandingPage()`
2. `S.page==='seasonLanding'`, automatischer Fallback bei season ohne Spieler
3. **Übersicht** (6.1: „ersetzt … die leere Saison-Landingpage")
4. Ebene 1
5. `SEASONS[key]`, `SEASON_CONFIG`, `hasSeasonSource()`
6. Verschieben/Auflösen — laut 6.1 wird sie durch die neue Übersicht ersetzt, nicht separat weitergeführt
7. Eindeutig

### 2.3 Spieler-/Saisonprofil (impliziter Default-`S.page`)

1. Kein eigener Name; Block direkt in `_render()` (index.html:21576–21641), inkl. Tabs `matrix/phases/radar/clutch/timeline/penalties/insights/table` (`tabsDef`) und Goalie-Zweig via `rGoalieAnalysis`
2. Header-Nav „👤 Spieler", `setP(playerKey)`
3. **Team** (6.3: „Spielerseiten" unter Team-Kader/Entwicklung)
4. Ebene 2 (Objektseite Spieler) mit Ebene-3-Tabs
5. `S.players`, `S.events`, `S.activeP`, `S.activeTab`, `getPlayerRoleAvailability`
6. Umbau — auf einheitliche Seitenvorlage (6.4) umstellen; Tab-Menge (8 Tabs) überschreitet das 5-Tabs-Limit (6.2) und muss konsolidiert werden
7. Eindeutig im Ziel-Hauptbereich, Tab-Konsolidierung offen

### 2.4 Team-Seite

1. `rTeamPage()`
2. `S.page==='team'`, Header-Nav „🏒 Team"
3. **Team**
4. Ebene 1 (Team-Überblick: Tabelle, Bilanz, Spielerliste)
5. `S.gamesData`, `S.standings`, `S.players`, `S.events`
6. Verschieben, später mit Kader/Goalies/Vereinsgeschichte gemäß 6.3-Tabelle zusammenführen
7. Eindeutig

### 2.5 Matchcenter

1. `rMatchcenterPage()` mit 13 Tabs (`MATCHCENTER_TABS`, index.html:16778): overview, form, players, duos, timing, special, goalies, coach, locker, social, lineup, matchplan, details
2. `S.page==='matchcenter'`, Header-Nav, Cover-Button „Matchcenter" (primär)
3. **Spieltage** (6.3: „Vorbereitung" für den kommenden Spieltag; 6.3.2 ordnet M1/M3/M4/M7 dorthin)
4. Ebene 2/3 gemischt (13 Tabs decken faktisch Überblick bis Tiefen-Analyse ab)
5. Sehr groß: `matchcenterAnalyzeDirect`, `matchcenterAnalyzeForm`, `matchcenterBuild…` (Scouting/Duos/SpecialTeams/Goalies/Timing/MatchPlan), `buildMatchIntelligenceFromContext`, `buildDigitalCoachReport`, `buildMatchcenterStoryPreviewData`, `buildLockerRoomSheet`, `buildSocialMediaContent`
6. Umbau nötig — 13 Tabs überschreiten das 5-Tabs-Limit (6.2/6.4) deutlich; Gegnerprofil-Anteile (Scouting/DNA) sollen laut 6.3-Tabelle nach **Liga & Gegner** wandern, der Rest (Vorbereitung/Aufstellung) bleibt unter **Spieltage**
7. **Nicht eindeutig** — Aufteilung „was bleibt Spieltage-Vorbereitung vs. was wird Liga&Gegner-Gegnerprofil" ist im Detail (Tab für Tab) noch offen

### 2.6 Lineup Builder

1. `rLineupBuilderPage()`, Modi `S.lineupBuilderMode`: `'recommend'` (Default) / `'test'`
2. `S.page==='lineupBuilder'`, Header-Nav, Cover-Button „Lineup Builder" (primär)
3. **Spieltage** (6.3: „Matchcenter, Lineup Builder und Einsatz-Center wandern hierher")
4. Ebene 2/3 (Werkzeug, kein reines Überblicks-Objekt)
5. `recommendLineComplements`, `S.lineupLines`, `S.lineupAvailablePlayerIds`, `S.lineupSyntheticPlayers`
6. Verschieben (zunächst 1:1), spätere Verschmelzung mit Einsatz-Center laut 6.1 „zwei getrennte Aufstellungswerkzeuge" nicht Teil von P0b
7. Eindeutiger neuer Ort; **offen**, ob/wann die in 6.1 angedeutete Zusammenführung mit Einsatz-Center erfolgt (nicht Teil P0b-Roadmap-Zeile)

### 2.7 Einsatz-Center (View-Modus, inkl. Usage Statistics)

1. `rEinsatzCenterPage()` + `rEinsatzCenterStats()` (Usage Statistics, Phase 7A)
2. `S.page==='einsatzCenter'`, `S.einsatzCenterMode==='view'`, **nur** über Header-Nav erreichbar (kein Cover-Button)
3. **Spieltage**
4. Ebene 2 (pro Spiel) mit Ebene-1-Kennzahlen (Usage Statistics)
5. `LINEUP_DATA[seasonKey]`, `computeEinsatzCenterStats()`, `LINEUP_GROUPS_REGISTRY`
6. Verschieben; fachliche `LINEUP_DATA`-Logik bleibt unverändert (siehe Abschnitt 4)
7. Eindeutig

### 2.8 Einsatz-Center (Edit-/Entwurfsmodus)

1. `rEinsatzCenterEditPage()` (+ `rEinsatzCenterGameEditor`, `rEinsatzCenterGroupEditor`, `rEinsatzCenterComboEditor`)
2. `S.page==='einsatzCenter'`, `S.einsatzCenterMode==='edit'`, erreichbar über „✎ Entwurf bearbeiten" aus 2.7
3. **Spieltage** (3.6.4 sieht Aufstellungs-Eingabe künftig direkt auf der Spieltagsseite vor — laut P0b-Roadmap-Zeile aber **nicht** Teil von P0b: „Spieltagsseite zunächst mit vorhandenen Inhalten")
4. Ebene 3 (Detail-Bearbeitung)
5. `EINSATZ_CENTER_DRAFT` (nur In-Memory, siehe 3.6.5 „ohne `localStorage`" bisher)
6. Verschieben (P0b); die in 3.6.5 vorgesehene Autosave-/Vorschau-Integration ist P0c, nicht P0b
7. Eindeutig für P0b (reine Verschiebung), Umbau erst mit P0c relevant

### 2.9 Vergleichszentrum

1. `rComparisonCenterPage()` (aktive Definition: die **dritte**, Zeile 13511 — siehe Abschnitt 5 zu den 2 toten Vor-Definitionen), Modi `S.comparisonMode`: `'select'` (Auswahlbildschirm, `rComparisonModeSelect()`) / `'single'` / `'duo'` (`rDuoComparisonPage()`)
2. `S.page==='comparisonCenter'`, Header-Nav, Cover-Button „Vergleichszentrum" (sekundär)
3. **Labor** (6.3: „Vergleichszentrum" explizit unter Labor gelistet)
4. Ebene 2/3
5. `buildComparisonDataset()` (**doppelt definiert**, siehe Abschnitt 5), `getComparisonCandidates()`, `getComparisonCurrentSelection()`
6. Verschieben; **vor** jeder inhaltlichen Weiterentwicklung sollte die Duplikat-Bereinigung (Abschnitt 5) separat geprüft werden
7. Eindeutig im Zielort; Innenstruktur wegen Duplikate unklar, bis geprüft ist, welche der 3 `rComparisonCenterPage`-Definitionen tatsächlich noch relevanten Code enthält

### 2.10 Hall of Fame

1. `rHallOfFamePage()` (aktive Definition; `rHallOfFamePageDraftUnused`/`…DraftUnused2` sind tote Vor-Versionen, siehe Abschnitt 5), inkl. Intro-Animation (`openHallOfFame`/`startHallOfFameIntro`, Fix aus früherer Phase)
2. `S.page==='hallOfFame'`, **nur** Cover-Button „Hall of Fame"
3. **Team** (6.3: „Vereinsgeschichte (Hall of Fame, All-time, Rekorde)")
4. Ebene 1 (Ranglisten/Rekorde-Überblick)
5. `getHallOfFameStats()`, `getAllTimePlayerRows()`, `PLAYER_REGISTRY`
6. Verschieben; Intro-Animation bleibt laut 6.6 ausdrücklich auf ihre Seite beschränkt und wird nicht angetastet
7. Eindeutig

### 2.11 Alltime Spieler

1. `rAllTimePlayersPage()` (aktive Definition; `rAllTimePlayersPageLegacyUnused` ist tot) mit 6 Tabs: `overview, alltime, development, duoNetwork, opponentSpecialist, explain` (bei Goalie-Rolle reduziert auf `overview, explain`)
2. `S.page==='alltimePlayers'`, **nur** Cover-Button „Alltime Spieler"
3. **Team** (6.3: „All-time")
4. Ebene 2 (Objektseite Spieler, Alltime-Variante) mit Ebene-3-Tabs
5. `getAllTimeMainPlayerRows()`, `getAllTimeSgOnlyRows()`, `PLAYER_REGISTRY.allTime`
6. Verschieben; inhaltlich eng verwandt mit 2.3 (Saison-Spielerprofil) — spätere Zusammenführung auf eine einheitliche Objektseite (6.4) ist naheliegend, aber nicht Teil der P0b-Roadmap-Zeile
7. Eindeutig für P0b; Verhältnis zu 2.3 (ein Objekt „Spieler" oder zwei getrennte Seiten Saison/Alltime) ist eine spätere Design-Entscheidung

### 2.12 Lexikon

1. `rLexiconPage()` (aktive Definition; `rLexiconPageLegacy` ist tot)
2. `S.page==='lexicon'`, eigener Cover-Button, **kein** Header-Nav-Link
3. Kein eigener der 5 Hauptpunkte — laut 6.3 „Werkzeugmenü" (Symbol rechts in der Kontextleiste, außerhalb der Hauptnavigation)
4. Ebene 3 (Nachschlagewerk)
5. `rLexiconRows()`, statische Begriffsdaten
6. Verschieben ins neue Werkzeugmenü statt in einen der 5 Hauptpunkte
7. Eindeutig

---

## 3. UI-Komponenten (wiederverwendete Bausteine, thematisch gruppiert)

Diese Funktionen sind keine eigenständig navigierbaren Seiten, sondern Bausteine,
die von den in Abschnitt 2 gelisteten Seiten aufgerufen werden. Sie werden nicht
einzeln nach dem 7-Punkte-Schema bewertet, sondern gruppiert; ihr künftiger Ort
ergibt sich aus der Seite, die sie aktuell rendert (Abschnitt 2). Für P0b.2
(Komponentenbibliothek) sind sie die Kandidatenliste, welche bestehende
Darstellung durch eine der neuen `ui…`-Komponenten (6.5) ersetzt werden könnte.

| Themengruppe | Aktuelle Seite(n) | Funktionen (vollständig) |
|---|---|---|
| **Alltime/Global-Profil** | 2.11 | `rAllTimeGamesPlayedRows`, `rAllTimePenaltyRows`, `rAlltimeKpis`, `rAlltimePlayerDashboard`, `rGlobalAllTimeStats`, `rGlobalCareerHeader`, `rGlobalDevelopment`, `rGlobalDnaBars`, `rGlobalDuoNetwork`, `rGlobalOpponentSpecialist`, `rGlobalOverview`, `rGlobalPartnerOpponentPanel`, `rGlobalProfileTags`, `rGlobalRoles`, `rIdentityCards`, `rIdentityTags`, `rCarryPerformanceRows` |
| **Anti-Synergy / Duo-Pro** | 2.3, 2.11 | `rAntiSynergyCompareChip`, `rAntiSynergyDelta`, `rAntiSynergyMainDelta`, `rAntiSynergyMetricRow`, `rDifficultConnectionList`, `rDifficultConnectionListCompact`, `rDifficultConnectionsCard`, `rDuoCenterPro`, `rDuoCompareSummaryCards`, `rDuoComparisonBars`, `rDuoComparisonChemistry`, `rDuoComparisonContext`, `rDuoComparisonDashboard`, `rDuoComparisonDetails`, `rDuoComparisonImpact`, `rDuoComparisonProfile`, `rDuoProPlayerSelect`, `rDuoResponseMomentumCard`, `rDuoRows`, `rInteractiveDuoCenterPro`, `rSeasonDuoCenterPro`, `rSeasonDuoSummary` |
| **Vergleichszentrum-Bausteine** | 2.9 | `rComparisonDuoSearchBox`, `rComparisonDuoSuggestionButtons`, `rComparisonKpis`, `rComparisonMiniOverview`, `rComparisonModeSelect`, `rComparisonStyleDashboard`, `rComparisonTrendSvg`, `rComparisonTrends`, `renderComparisonDuoSuggestions`, `rDuoComparisonPage` |
| **KPI-Grundbausteine** (überwiegend im Vergleichszentrum verwendet) | 2.9 | `rKpiCards`, `rKpiExtendedMetrics`, `rKpiMetricCard`, `rKpiMirrorRows`, `rKpiObjectMini`, `rKpiRadar`, `rKpiShareBars`, `rKpiTextMetricCard`, `rPdashLabel`, `rPdashStat` |
| **Goalie-Modell** | 2.3, 2.11 (Goalie-Zweig) | `rGoalieAnalysis`, `rGoalieBars`, `rGoalieCompareMetricCard`, `rGoalieComparisonDashboard`, `rGoalieComparisonExtended`, `rGoalieComparisonKpis`, `rGoalieComparisonRadar`, `rGoalieComparisonTrend`, `rGoalieDnaBars`, `rGoalieFirstGoalResistance`, `rGoalieInsights`, `rGoalieKpis`, `rGoalieMiniMetrics`, `rGoalieMomentum`, `rGoalieOpponents`, `rGoalieOverview`, `rGoaliePhaseProfile`, `rGoaliePhases`, `rGoalieRoleTraits`, `rGoalieStability`, `rGoalieTable`, `rGoalieTierCards` |
| **Hall of Fame-Bausteine** | 2.10 | `rHallDuoTemple`, `rHallGoalieAwardCards`, `rHallGoalieLegends`, `rHallGoalieRankCard`, `rHallOfFameHero`, `rHallPodiumList`, `rHallSGBadge` |
| **Lineup Builder-Bausteine** | 2.6 | `rLineupBuilderAvailablePanel`, `rLineupComplementCards`, `rLineupMetricPills`, `rLineupRecommendationCards`, `rLineupRecommendationMode`, `rLineupScoreRows`, `rLineupSimpleCards`, `rLineupTestLine`, `rLineupTestMode` |
| **Einsatz-Center-Bausteine** | 2.7, 2.8 | `rEinsatzCenterCombo`, `rEinsatzCenterComboEditor`, `rEinsatzCenterGameCard`, `rEinsatzCenterGameEditor`, `rEinsatzCenterGroup`, `rEinsatzCenterGroupEditor`, `rEinsatzCenterRosterSuggestionCard` |
| **Matchcenter-Bausteine** (mit Abstand größte Gruppe) | 2.5 | `rMatchcenterCoachCardList`, `rMatchcenterCoachIfThen`, `rMatchcenterCoachSimpleList`, `rMatchcenterCopyButton`, `rMatchcenterDetailsSection`, `rMatchcenterDigitalCoach`, `rMatchcenterDuoRankCard`, `rMatchcenterDuoRow`, `rMatchcenterDuoWatchCard`, `rMatchcenterDuosTab`, `rMatchcenterFormCard`, `rMatchcenterFormSection`, `rMatchcenterGamesList`, `rMatchcenterGoalieCard`, `rMatchcenterGoalieMatchup`, `rMatchcenterIntelCoachHints`, `rMatchcenterIntelOverview`, `rMatchcenterKpi`, `rMatchcenterLineupBuilder`, `rMatchcenterLockerList`, `rMatchcenterLockerRoomSheet`, `rMatchcenterMatchPlan`, `rMatchcenterOpponentAlarm`, `rMatchcenterOpponentDNA`, `rMatchcenterOpponentDuos`, `rMatchcenterOpponentScouting`, `rMatchcenterPlanItems`, `rMatchcenterPlanWatch`, `rMatchcenterPlayerRow`, `rMatchcenterPlayersTab`, `rMatchcenterProfileSection`, `rMatchcenterRankCard`, `rMatchcenterResponseMomentum`, `rMatchcenterScoutingSummary`, `rMatchcenterSocialBlock`, `rMatchcenterSocialMediaCenter`, `rMatchcenterSpecialCard`, `rMatchcenterSpecialTeams`, `rMatchcenterStoryForm`, `rMatchcenterStoryFrame`, `rMatchcenterStoryLogo`, `rMatchcenterStoryPlayerCard`, `rMatchcenterStoryPreview`, `rMatchcenterTabs`, `rMatchcenterTimeBars`, `rMatchcenterTiming`, `rMatchcenterTimingStatsCard`, `rMatchcenterUlmDuoRankCard`, `rMatchcenterUlmDuoRow`, `rMatchcenterUlmDuoWatchCard`, `rMatchcenterUlmDuos`, `rMatchcenterUlmImpactCard`, `rMatchcenterUlmPlayerRow`, `rMatchcenterUlmRankCard`, `rMatchcenterUlmScouting`, `rMatchcenterWatchCard` |
| **Response-Momentum** (eigenständiges Analysefeature, quer verbaut) | 2.3, 2.5, 2.11 | `rPlayerResponseMomentumCard`, `rResponseMomentumOverviewCard`, `rTeamResponseMomentumCard` (`rDuoResponseMomentumCard` bereits oben gelistet) |
| **Generische Chart-/Tabellen-Grundbausteine** | quer über alle Seiten | `rRadar`, `rSimpleRankBars`, `rSparkline`, `rTable`, `rTimeline`, `rMatrix`, `rOppBreakdown`, `rOpponentIntelBars`, `rOpponentTopScorerTable`, `rEmptyState`, `rRes` — direkte Kandidaten für die neuen 6.5-Komponenten „Rangliste"/„Verlauf"/„Tabelle"/„Notiz" |
| **Spieler-/Saisonprofil-Bausteine** | 2.3 | `rClassicRoleTags`, `rClassicTagTip`, `rClutch`, `rClutchBadge`, `rInsights`, `rPenalties`, `rPhases`, `rPlayerDash`, `rPlayerDashStyles`, `rPlayerExplainItems`, `rPlayerExplanation`, `rPlayerRoleSwitch`, `rRoleTraitTip`, `rScoreBreakdown`, `rSeasonInsightsTab`, `rSeasonPlayerDashboard`, `rSeasonProfileKpis`, `rSeasonProfileTagStrip`, `rSeasonTrendRows`, `rStyleMetricTip`, `rStyleProfileBars`, `rKpiInfoCards`, `rKpiOpponentStrength`, `rKpiTrendCompare`, `rKPIVergleich` |
| **Roster-/Einsatz-Impact-Bausteine** | 2.5 (Lineup-Tab), 2.6 | `rRosterImpactStatLine`, `rRosterStatusBadge`, `rRosterStatusInline` |
| **Lexikon-Bausteine** | 2.12 | `rLexiconRows` |

---

## 4. Technische Nicht-UI-Funktionen

Funktionen mit `r…`-Namensmuster, die **keine HTML-Ausgabe** produzieren, sondern
Daten auflösen/berechnen/registrieren. Nicht Teil des UI-Umbaus, hier nur zur
Vollständigkeit aufgeführt (keine als „Seite" fehlklassifiziert):

`rankNarratives`, `ratio01`, `relative01`, `recommendLineComplements`,
`registerPlayerIdentity`, `registerSeasonRosters`, `resetPlayerRegistrySeason`,
`resolveAssistPlayer`, `resolveCurrentSeasonKey`, `resolveGoalScorerPlayer`,
`resolveLineupPlayerName`, `resolvePlayerRoleView`, `resolveRosterPlayerByRef`,
`resultGoalsAgainstForSide`, `rmTerm`, `roleGameStableKey`, `roleTraitLabel`,
`rosterImpactConfidence`, `rosterImpactConfidenceWeight`, `rosterPlayerMatches`,
`repairMojibake`, `repairRenderedMojibake` (DOM-Textkorrektur, kein Seiteninhalt),
`restoreHallOfFameIntroPrevious` (Animations-State, kein Seiteninhalt),
`responseExcerpt`, `responseMomentumAbsSeconds`, `responseMomentumActor`,
`responseMomentumConfidence`, `responseMomentumGoalActors`, `responseMomentumPairKey`,
`responseMomentumSide`, `responseMomentumTime`, `responseMomentumTooltipFor`.

Zusätzlich zentrale Orchestrierung (kein „View" im Sinne von Abschnitt 6, sondern
der Rendering-Dispatcher selbst): `render()`, `_render()`.

**Nicht abschließend verifiziert (Grenzfälle):** `responseMomentumEmptyState`,
`responseMomentumGameRows`, `renderTags` — Namen deuten auf HTML-Rückgabe hin,
wurden aber nicht einzeln gegen ihren Rückgabewert geprüft. Vor einer Umstellung
in P0b.2+ sollten diese drei gezielt gelesen und ggf. in Abschnitt 3 (Komponenten)
nachgetragen werden.

---

## 5. Legacy-/Duplikat-Funktionen (Abschnitt 6.10)

**Ausdrücklich nicht löschen in P0b** — hier nur dokumentiert, Entfernung ist
laut 6.10 ein eigener Schritt „nach Prüfung".

### 5.1 Explizit selbst-markiert (`Legacy`/`DraftUnused`/`Unused` im Namen)

| Funktion | Zeile | Vermutlich lebendiger Nachfolger |
|---|---|---|
| `rDifficultConnectionListCompactLegacy` | 10830 | `rDifficultConnectionListCompact` |
| `rGlobalOverviewLegacyUnused` | 11392 | `rGlobalOverview` |
| `rGlobalAllTimeStatsLegacyUnused` | 11432 | `rGlobalAllTimeStats` |
| `rGlobalDevelopmentLegacyUnused` | 11449 | `rGlobalDevelopment` |
| `rAllTimePlayersPageLegacyUnused` | 13880 | `rAllTimePlayersPage` (aktiv in `_render()` verdrahtet) |
| `rHallOfFamePageDraftUnused` | 13927 | `rHallOfFamePage` (aktiv in `_render()` verdrahtet) |
| `rHallOfFamePageDraftUnused2` | 14791 | `rHallOfFamePage` |
| `rLexiconPageLegacy` | 14949 | `rLexiconPage` (aktiv in `_render()` verdrahtet) |

### 5.2 Nicht selbst-markierte, aber technisch mehrfach definierte Funktionen

JavaScript verwendet bei mehreren `function`-Deklarationen desselben Namens im
selben Scope immer die **letzte** — die früheren Definitionen sind toter Code,
ohne dass ihr Name das kenntlich macht. Vollständige Suche über die gesamte
Datei ergab folgende Fälle (alle im Vergleichszentrum-Bereich, ~Zeile 12000–13600):

| Funktion | Zeilen (alle Definitionen) | Aktiv ist |
|---|---|---|
| `rComparisonCenterPage` | 12292, 13467, **13511** | die dritte (13511) |
| `rKpiTrendCompare` | 13078, 13167, **13211** | die dritte |
| `rComparisonDashboard` | 12280, **13418** | die zweite |
| `rKPIVergleich` | 13380, **13392** | die zweite |
| `rComparisonStyles` | (2× vorhanden) | letzte Definition |
| `rComparisonRoles` | (2× vorhanden) | letzte Definition |
| `rKpiOpponentStrength` | (2× vorhanden) | letzte Definition |
| `rKpiInfoCards` | (2× vorhanden) | letzte Definition |
| `buildComparisonSummary` (kein Render, aber Datenfunktion) | (2× vorhanden) | letzte Definition |
| `buildComparisonDataset` (kein Render, aber Datenfunktion) | (2× vorhanden) | letzte Definition |

**Befund:** Genau die vier in Spezifikation 6.10 als Beispiel genannten Funktionen
(`rKpiTrendCompare`, `rComparisonDashboard`, `rComparisonCenterPage`,
`rKPIVergleich`) sind tatsächlich dupliziert — plus 6 weitere, in der
Spezifikation nicht genannte Fälle, alle im selben Bereich (Vergleichszentrum,
Abschnitt 2.9). Das bestätigt 6.10s Einschätzung und zeigt, dass die
Duplikat-Bereinigung sich auf den Vergleichszentrum-Codeblock konzentrieren
sollte. Für P0b.1 gilt: nur dokumentiert, nichts entfernt.

---

## 6. Bewusst nicht Teil des Inventar-Umbaus

- **M1–M10** (Teamstärke, Schützenqualität, Goalie-Bewertung, Müdigkeit,
  Spielereffekte, Siegwahrscheinlichkeit, Gegneranalyse, Auffälligkeiten,
  Modellgüte, Psychologie) existieren im aktuellen Code nicht und werden in
  diesem Inventar nirgends als „vorhanden" geführt.
- **P0c-Vorschau-/Entwurfsmodus** (3.6.5, `EINSATZ_CENTER_DRAFT`-Autosave,
  Zusammenführung importiert ⊕ Entwurf) — unverändert, nur der bestehende
  In-Memory-Entwurfsmodus (2.8) wird verschoben, nicht erweitert.
- **`manifest.json`/`inputHash`/Modelldaten-Aktualitätshinweis** — existiert im
  Code nicht, kein Bestandteil dieses Inventars.
- **Fachliche Statistiklogik** (`classifyGameForStats`, `getRelevantSeasonGames`,
  `buildStandings`, `getSeasonStatsAsOf`, `deriveAsOfForSeason`, alle
  `matchcenterAnalyze…`/`matchcenterBuild…`/`build…Model`/`build…Dataset`-Funktionen
  ohne `r`-Präfix) — bleibt exakt wie in P0a.1–P0a.8 gebaut, wird durch dieses
  Inventar nicht berührt oder neu bewertet.
- **`LINEUP_DATA`-Fachlogik** (Import/Validierung/Registry) — nur die
  Navigations-Einordnung von Einsatz-Center (2.7/2.8) ändert sich, nicht die
  zugrundeliegende Datenhaltung.
- **`LegacyUnused`/`DraftUnused`-Funktionen und die in Abschnitt 5.2 gefundenen
  Duplikate werden NICHT gelöscht** — Löschung ist laut 6.10 ein eigener,
  separat freizugebender Schritt nach Prüfung, nicht Teil von P0b.1.
- **`season-data/*.json`** — nicht gelesen für inhaltliche Änderungen, nicht
  verändert.
- **`docs/liga-analytics-spezifikation.md`** — nur gelesen, nicht verändert.

---

## 7. Offene / nicht eindeutige Zuordnungen

1. **Matchcenter-Aufteilung (2.5):** Welche der 13 Matchcenter-Tabs unter
   „Spieltage → Vorbereitung" bleiben und welche nach „Liga & Gegner →
   Gegnerprofil" wandern, ist tabellarisch in 6.3 nur grob angedeutet
   („Gegnerprofile heute verteilt im Matchcenter") und müsste vor P0b.5
   (Navigation) Tab für Tab entschieden werden.
2. **Verhältnis Saison-Spielerprofil (2.3) vs. Alltime-Spielerprofil (2.11):**
   6.4 sieht „eine" einheitliche Seitenvorlage pro Objekt vor; ob Saison- und
   Alltime-Ansicht eines Spielers künftig eine Seite mit Zeitpunkt-Auswahl oder
   weiterhin zwei getrennte Seiten sind, ist nicht spezifiziert.
3. **Cover-Rollentausch (2.1):** Entscheidung 11 verlangt, dass die neue
   Übersicht das Cover als Startseite ersetzt; das exakte Übergangsverhalten
   (wann erscheint das Cover noch, „Werkzeugmenü"-Zugriff) ist in 6.3 nur in
   einem Satz skizziert.
4. **Lineup Builder vs. Einsatz-Center (2.6/2.7/2.8):** 6.1 nennt die
   bestehende Doppelstruktur ausdrücklich als Ausgangslage, ohne für P0b eine
   Zusammenführung zu verlangen — beide bleiben vorerst getrennte Unterpunkte
   unter „Spieltage".
5. **Duplikat-Funktionen (Abschnitt 5.2):** Ob die jeweils inaktiven
   Vor-Definitionen (z. B. `rComparisonCenterPage` an Zeile 12292/13467)
   überhaupt noch funktionsfähigen, nur nicht mehr erreichten Code enthalten,
   oder bereits kaputt/veraltet sind, wurde nicht einzeln geprüft — das ist
   Voraussetzung für eine spätere, sichere Löschung.
6. **`responseMomentumEmptyState`/`responseMomentumGameRows`/`renderTags`**
   (Abschnitt 4): Einordnung Komponente vs. technischer Helfer nicht
   abschließend verifiziert.

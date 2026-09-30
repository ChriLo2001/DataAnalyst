# Code-Karte: index.html

<!-- index-map: source-sha256=64f0fa5a8014627d1193eb00654398f2b63036b597311796668dac2d1131f7dc source-lines=24265 -->

Automatisch erzeugt von `scripts/build-index-map.mjs`. Nicht von Hand bearbeiten — bei Änderungen an index.html erneut ausführen: `node scripts/build-index-map.mjs --write`. Vor gezieltem Lesen prüfen, ob die Karte noch aktuell ist: `node scripts/build-index-map.mjs --check`.

index.html: 24265 Zeilen gesamt (SHA-256 `64f0fa5a8014627d1193eb00654398f2b63036b597311796668dac2d1131f7dc`). Statischer `<style>`-Block: Zeile 8–1544. Haupt-`<script>`-Block: Zeile 1645–24261.

**Leseregel (siehe CLAUDE.md):** index.html nie vollständig laden. Diese Karte nennen, den gesuchten Namen im Register unten finden, dann nur den genannten Zeilenbereich lesen.

## Große Bereiche

Top-Level-Blöcke (Funktionen oder Daten-consts) ab 30 Zeilen oder 2000 Zeichen (z. B. `SEASON_CONFIG`). Das Zeichen-Kriterium existiert wegen des früheren `STATIC_SEASON_DATA`-Blocks — seit Token-Diät Teil 2 in `season-data-embedded.js` ausgelagert, siehe docs/season-data-import.md, deshalb unten nicht mehr gelistet:

| Name | Art | Zeile | Zeilen |
|---|---|---|---|
| `SEASON_CONFIG` | const-data | 1690–1781 | 92 |
| `TYPE_DESC` | const-data | 1884–1907 | 24 |
| `ROLE_TRAIT_COLORS` | const-data | 1992–2031 | 40 |
| `ROLE_TRAIT_TOOLTIPS` | const-data | 2053–2092 | 40 |
| `UI_TEXT_REPLACEMENTS` | const-data | 2496–2513 | 18 |
| `appendSeasonGameDiagnostics` | function | 2671–2720 | 50 |
| `resolveRosterPlayerByRef` | function | 2923–2953 | 31 |
| `processGame` | function | 3056–3113 | 58 |
| `classifyGameForStats` | function | 3167–3208 | 42 |
| `buildMatchdays` | function | 3326–3367 | 42 |
| `parseAppHash` | function | 3536–3567 | 32 |
| `applyAppHash` | function | 3774–3804 | 31 |
| `buildStandings` | function | 3885–3924 | 40 |
| `getOrCreatePlayerProfile` | function | 4056–4088 | 33 |
| `toPublicPlayerRegistry` | function | 4243–4272 | 30 |
| `aggregateAllTimePlayers` | function | 4274–4307 | 34 |
| `emptySpecialTeamsStats` | function | 4368–4408 | 41 |
| `mergeSpecialTeamsStats` | function | 4422–4451 | 30 |
| `buildSpecialTeamsForGame` | function | 4567–4760 | 194 |
| `addGoalieGameToStats` | function | 4820–4870 | 51 |
| `buildGoalieGameRecord` | function | 4872–4920 | 49 |
| `buildGoalieStatsForSeason` | function | 4922–5001 | 80 |
| `aggregateGoalieAlltimeStats` | function | 5003–5037 | 35 |
| `getAssistDiagnostics` | function | 5064–5116 | 53 |
| `buildPlayerEvents` | function | 5246–5330 | 85 |
| `computeMetrics` | function | 5350–5482 | 133 |
| `buildSoloDuoProfile` | function | 5504–5547 | 44 |
| `identityInputs` | function | 5634–5691 | 58 |
| `buildIdentityProfiles` | function | 5735–5966 | 232 |
| `assignStatus` | function | 6013–6198 | 186 |
| `fetchTextWithDiagnostics` | function | 6233–6262 | 30 |
| `fetchSeasonGameRaw` | function | 6298–6337 | 40 |
| `validateGameStructure` | function | 6547–6586 | 40 |
| `buildDryRunReport` | function | 6653–6715 | 63 |
| `stageSeasonDataPreview` | function | 6786–6837 | 52 |
| `rSeasonDataPreviewCard` | function | 6890–6925 | 36 |
| `computeEinsatzCenterStats` | function | 7119–7149 | 31 |
| `rEinsatzCenterStats` | function | 7156–7174 | 19 |
| `einsatzCenterDeserializeAutosave` | function | 7377–7410 | 34 |
| `rEinsatzCenterGroupEditor` | function | 7720–7750 | 31 |
| `rEinsatzCenterRosterSuggestionCard` | function | 7767–7797 | 31 |
| `rEinsatzCenterGameEditor` | function | 7798–7850 | 53 |
| `rEinsatzCenterEditPage` | function | 7851–7898 | 48 |
| `loadSeasonData` | function | 8146–8604 | 459 |
| `loadSeasonForGlobal` | function | 8644–8674 | 31 |
| `loadSeason` | function | 8692–8743 | 52 |
| `ensureHallOfFameIntroOverlay` | function | 8771–8803 | 33 |
| `rMatrix` | function | 9191–9235 | 45 |
| `rRadar` | function | 9268–9315 | 48 |
| `rClutch` | function | 9318–9350 | 33 |
| `rTimeline` | function | 9353–9461 | 109 |
| `rOppBreakdown` | function | 9483–9515 | 33 |
| `generatePlayerInsights` | function | 9518–9561 | 44 |
| `rInsights` | function | 9579–9630 | 52 |
| `buildGoalieAnalysisModel` | function | 9897–10055 | 159 |
| `buildGoalieRoleProfile` | function | 10120–10193 | 74 |
| `rGoalieInsights` | function | 10312–10333 | 22 |
| `buildOpponentIntelligence` | function | 10775–10828 | 54 |
| `buildBestThirdManOptions` | function | 10978–11008 | 31 |
| `getDuoDirectScorerGameCounts` | function | 11009–11040 | 32 |
| `buildAnnotatedGoalEventsForGame` | function | 11090–11190 | 101 |
| `buildResponseGoalStatsRaw` | function | 11233–11281 | 49 |
| `buildMomentumSwingStatsRaw` | function | 11294–11364 | 71 |
| `buildDuoFloorCeiling` | function | 11371–11412 | 42 |
| `buildDuoWithWithoutImpact` | function | 11508–11541 | 34 |
| `buildDuoCompatibility` | function | 11596–11618 | 23 |
| `buildDuoProAnalysis` | function | 11653–11696 | 44 |
| `rDuoCenterPro` | function | 11697–11811 | 115 |
| `rInteractiveDuoCenterPro` | function | 11886–11941 | 56 |
| `getDifficultConnectionRowsForPlayer` | function | 11945–11989 | 45 |
| `getRosterImpactPlayerGames` | function | 12032–12072 | 41 |
| `buildRosterImpactAnalysis` | function | 12098–12157 | 60 |
| `rDifficultConnectionList` | function | 12212–12236 | 25 |
| `rDifficultConnectionListCompactLegacy` | function | 12237–12278 | 42 |
| `rDifficultConnectionListCompact` | function | 12279–12317 | 39 |
| `rDifficultConnectionsCard` | function | 12318–12354 | 37 |
| `RESPONSE_MOMENTUM_TOOLTIPS` | const-data | 12357–12388 | 32 |
| `rResponseMomentumOverviewCard` | function | 12432–12455 | 24 |
| `rMatchcenterResponseMomentum` | function | 12502–12539 | 38 |
| `getTeamAllTimeRecords` | function | 12541–12581 | 41 |
| `getAllTimeIdentityStandings` | function | 12662–12696 | 35 |
| `buildRecencyWeightedGlobalIdentityProfile` | function | 12698–12745 | 48 |
| `rHallOfFameHero` | function | 12801–12826 | 26 |
| `hallGoalieRowFromStats` | function | 12924–12956 | 33 |
| `rHallGoalieRankCard` | function | 13009–13040 | 32 |
| `rHallGoalieLegends` | function | 13058–13090 | 33 |
| `buildDuoComparison` | function | 13485–13504 | 20 |
| `rDuoCompareSummaryCards` | function | 13510–13540 | 31 |
| `rDuoComparisonPage` | function | 13641–13651 | 11 |
| `buildComparisonExtraMetrics` | function | 13696–13753 | 58 |
| `buildGoalieComparisonDataset` | function | 13790–13840 | 51 |
| `buildComparisonDataset` | function | 13841–13876 | 36 |
| `rKpiMirrorRows` | function | 13902–13961 | 60 |
| `rKpiRadar` | function | 13973–14007 | 35 |
| `rKpiTrendCompare` | function | 14054–14120 | 67 |
| `rKpiOpponentStrength` | function | 14121–14148 | 28 |
| `rKpiInfoCards` | function | 14159–14190 | 32 |
| `buildComparisonSummary` | function | 14191–14222 | 32 |
| `rComparisonStyles` | function | 14260–14297 | 38 |
| `rComparisonCenterPage` | function | 14298–14348 | 51 |
| `rGlobalDnaBars` | function | 14389–14418 | 30 |
| `buildSeasonPlayerDashModel` | function | 14488–14524 | 37 |
| `buildAlltimePlayerDashModel` | function | 14525–14567 | 43 |
| `rPlayerDashStyles` | function | 14568–14579 | 12 |
| `rPlayerDash` | function | 14586–14624 | 39 |
| `rGlobalOverview` | function | 14683–14734 | 52 |
| `rGlobalDevelopment` | function | 14754–14792 | 39 |
| `rGlobalDuoNetwork` | function | 14854–15051 | 198 |
| `rGlobalOpponentSpecialist` | function | 15053–15098 | 46 |
| `buildFieldPlayerExplanation` | function | 15164–15238 | 75 |
| `buildGoaliePlayerExplanation` | function | 15239–15292 | 54 |
| `buildPlayerIntelligence` | function | 15302–15331 | 30 |
| `rPlayerExplanation` | function | 15337–15388 | 52 |
| `rAllTimePlayersPage` | function | 15390–15430 | 41 |
| `rHallOfFamePage` | function | 15432–15520 | 89 |
| `rLexiconPage` | function | 15547–15719 | 173 |
| `buildConfidence` | function | 15743–15788 | 46 |
| `getMatchcenterOpponents` | function | 16110–16142 | 33 |
| `getMatchcenterDirectOpponents` | function | 16143–16173 | 31 |
| `matchcenterAnalyzeDirect` | function | 16194–16230 | 37 |
| `matchcenterFinalizeOpponentPlayerProfiles` | function | 16377–16423 | 47 |
| `matchcenterBuildOpponentScouting` | function | 16424–16495 | 72 |
| `matchcenterEnsureUlmPlayer` | function | 16518–16555 | 38 |
| `matchcenterAddUlmScoring` | function | 16580–16617 | 38 |
| `matchcenterFinalizeUlmPlayers` | function | 16618–16686 | 69 |
| `matchcenterBuildUlmPlayerScouting` | function | 16687–16741 | 55 |
| `matchcenterEnsureOpponentDuo` | function | 16759–16791 | 33 |
| `matchcenterFinalizeOpponentDuos` | function | 16818–16852 | 35 |
| `matchcenterBuildOpponentDuos` | function | 16853–16897 | 45 |
| `matchcenterEnsureUlmDuo` | function | 16912–16949 | 38 |
| `matchcenterFinalizeUlmDuos` | function | 16969–17004 | 36 |
| `matchcenterBuildUlmDuos` | function | 17005–17047 | 43 |
| `matchcenterBuildSpecialTeamsMatchup` | function | 17081–17128 | 48 |
| `matchcenterBuildGoalieMatchup` | function | 17151–17193 | 43 |
| `matchcenterTimingStatsForGames` | function | 17226–17262 | 37 |
| `rMatchcenterUlmScouting` | function | 17608–17644 | 37 |
| `rMatchcenterOpponentScouting` | function | 17645–17680 | 36 |
| `rMatchcenterUlmDuos` | function | 17789–17831 | 43 |
| `rMatchcenterOpponentDuos` | function | 17832–17874 | 43 |
| `rMatchcenterSpecialTeams` | function | 17887–17936 | 50 |
| `matchcenterBuildPlanConfidence` | function | 18027–18061 | 35 |
| `matchcenterBuildIntelligenceDataQuality` | function | 18110–18160 | 51 |
| `matchcenterBuildOpponentDNA` | function | 18161–18273 | 113 |
| `matchcenterBuildOpponentAlarm` | function | 18340–18449 | 110 |
| `matchcenterBuildIntelligenceSignals` | function | 18496–18542 | 47 |
| `buildMatchIntelligenceFromContext` | function | 18543–18597 | 55 |
| `buildMatchStories` | function | 18646–18675 | 30 |
| `buildDigitalCoachReport` | function | 18746–18778 | 33 |
| `buildMatchdayCaptionBlocks` | function | 18850–18879 | 30 |
| `buildSocialMediaContent` | function | 18880–18928 | 49 |
| `lineupRosterGamesForPlayer` | function | 18996–19043 | 48 |
| `buildLineupExperienceProfile` | function | 19044–19086 | 43 |
| `buildLineupOpponentDNAFit` | function | 19099–19142 | 44 |
| `classifyLineIdentity` | function | 19143–19190 | 48 |
| `lineupPlayerProfile` | function | 19191–19266 | 76 |
| `buildLineupAnalysis` | function | 19267–19400 | 134 |
| `buildLineupScoreBreakdowns` | function | 19401–19430 | 30 |
| `lineupEvaluateComplementCandidate` | function | 19514–19591 | 78 |
| `buildTeamLineBalance` | function | 19610–19653 | 44 |
| `buildLineupRecommendations` | function | 19688–19766 | 79 |
| `matchcenterBuildMatchPlan` | function | 19795–19940 | 146 |
| `rMatchcenterOpponentDNA` | function | 19975–20007 | 33 |
| `rMatchcenterIntelOverview` | function | 20030–20075 | 46 |
| `rMatchcenterDigitalCoach` | function | 20117–20181 | 65 |
| `rMatchcenterLockerRoomSheet` | function | 20199–20254 | 56 |
| `downloadMatchdayStory` | window | 20273–20320 | 48 |
| `rSocialVideoBlock` | function | 20324–20349 | 26 |
| `rMatchcenterSocialMediaCenter` | function | 20374–20427 | 54 |
| `rMatchcenterLineupBuilder` | function | 20459–20531 | 73 |
| `rLineupBuilderAvailablePanel` | function | 20546–20593 | 48 |
| `rLineupRecommendationMode` | function | 20609–20642 | 34 |
| `rLineupTestLine` | function | 20656–20704 | 49 |
| `rLineupBuilderPage` | function | 20722–20755 | 34 |
| `rMatchcenterScoutingSummary` | function | 20756–20799 | 44 |
| `getTeamLogoUrlForStory` | function | 20853–20882 | 30 |
| `matchcenterStoryPlayer` | function | 20962–20994 | 33 |
| `matchcenterStoryPickFactItems` | function | 21062–21114 | 53 |
| `buildMatchcenterStoryPreviewData` | function | 21338–21449 | 112 |
| `matchcenterStoryVisibleFacts` | function | 21456–21486 | 31 |
| `rMatchcenterStoryPreview` | function | 21505–21574 | 70 |
| `fitMatchcenterStoryLayout` | function | 21581–21623 | 43 |
| `socialVideoDistributeSceneDurations` | function | 21673–21704 | 32 |
| `socialVideoTopScorerAsOf` | function | 21810–21839 | 30 |
| `socialVideoOpponentSceneData` | function | 21842–21889 | 48 |
| `socialVideoBuildStorySpec` | function | 21906–21957 | 52 |
| `socialVideoBuildFeedSpec` | function | 21960–22009 | 50 |
| `socialVideoStoryFrameData` | function | 22048–22081 | 34 |
| `rSocialVideoFeedFrame` | function | 22085–22121 | 37 |
| `downloadSocialVideoStandbild` | window | 22144–22194 | 51 |
| `rMatchcenterPage` | function | 22196–22343 | 148 |
| `rTeamPage` | function | 22344–22654 | 311 |
| `_render` | function | 22704–22868 | 165 |
| `uiObjektseite` | function | 23186–23219 | 34 |
| `rMatchdayDetailPage` | function | 23439–23474 | 36 |
| `buildOverviewCards` | function | 23716–23756 | 41 |

## CSS-Regelgruppen

Aufeinanderfolgende Regeln mit gleichem Selektor-Präfix, innerhalb des statischen `<style>`-Blocks (Zeile 8–1544):

| Präfix | Zeile | Regeln |
|---|---|---|
| `:root` | 10–37 | 1 |
| `*` | 38–38 | 1 |
| `body` | 39–39 | 1 |
| `#cover` | 42–42 | 1 |
| `#cover::before` | 43–43 | 1 |
| `#cover::after` | 44–44 | 1 |
| `#cover` | 45–45 | 1 |
| `cv-skyline` | 46–54 | 9 |
| `@media(max-width:700px)` | 57–57 | 1 |
| `@media(prefers-reduced-motion:reduce)` | 58–58 | 1 |
| `cv-brand` | 59–59 | 1 |
| `cv-logo` | 60–61 | 2 |
| `cv-title` | 63–64 | 2 |
| `cv-sub` | 65–65 | 1 |
| `cv-div` | 66–66 | 1 |
| `cv-main` | 67–67 | 1 |
| `cv-action` | 68–79 | 12 |
| `#cover` | 80–80 | 1 |
| `cv-lexicon` | 81–81 | 1 |
| `#cover` | 82–82 | 1 |
| `cv-nav` | 83–84 | 2 |
| `cv-season` | 85–103 | 19 |
| `cv-stats` | 104–104 | 1 |
| `cvs` | 105–105 | 1 |
| `cvs-val` | 106–106 | 1 |
| `cvs-lbl` | 107–107 | 1 |
| `hidden` | 108–108 | 1 |
| `@media(max-width:760px)` | 109–109 | 1 |
| `matchcenter-page` | 112–112 | 1 |
| `mc-hero` | 113–115 | 3 |
| `mc-eyebrow` | 116–116 | 1 |
| `mc-title` | 117–117 | 1 |
| `mc-sub` | 118–118 | 1 |
| `mc-control` | 119–119 | 1 |
| `mc-field` | 120–120 | 1 |
| `mc-label` | 121–121 | 1 |
| `mc-select` | 122–123 | 2 |
| `mc-status` | 124–124 | 1 |
| `mc-tabs` | 125–125 | 1 |
| `mc-tab` | 126–127 | 2 |
| `mc-section` | 128–131 | 4 |
| `mc-kpi` | 132–132 | 1 |
| `mc-card` | 133–136 | 4 |
| `mc-big` | 137–137 | 1 |
| `mc-value` | 138–138 | 1 |
| `mc-muted` | 139–139 | 1 |
| `mc-split` | 140–140 | 1 |
| `mc-form` | 141–141 | 1 |
| `mc-team` | 142–143 | 2 |
| `mc-score` | 144–144 | 1 |
| `mc-form` | 145–150 | 6 |
| `mc-mini` | 151–154 | 4 |
| `mc-vs` | 155–155 | 1 |
| `mc-score` | 156–160 | 5 |
| `mc-vs` | 161–161 | 1 |
| `mc-insight` | 162–163 | 2 |
| `mc-games` | 164–165 | 2 |
| `mc-game` | 166–167 | 2 |
| `mc-result` | 168–169 | 2 |
| `mc-empty` | 170–170 | 1 |
| `mc-watch` | 171–173 | 3 |
| `mc-player` | 174–175 | 2 |
| `mc-danger` | 176–179 | 4 |
| `mc-watch` | 180–180 | 1 |
| `mc-stat` | 181–182 | 2 |
| `mc-rank` | 183–185 | 3 |
| `mc-player` | 186–186 | 1 |
| `mc-rank` | 187–187 | 1 |
| `mc-player` | 188–188 | 1 |
| `mc-form` | 189–192 | 4 |
| `mc-scout` | 193–193 | 1 |
| `mc-duo` | 194–197 | 4 |
| `mc-special` | 198–204 | 7 |
| `mc-st` | 205–207 | 3 |
| `mc-goalie` | 208–213 | 6 |
| `mc-summary` | 214–218 | 5 |
| `mc-intel` | 219–250 | 32 |
| `mc-coach` | 251–272 | 22 |
| `mc-locker` | 273–284 | 12 |
| `mc-output` | 285–286 | 2 |
| `mc-social` | 287–299 | 13 |
| `player-explain` | 300–313 | 14 |
| `lineup-builder` | 314–363 | 50 |
| `mc-timing` | 364–364 | 1 |
| `mc-time` | 365–370 | 6 |
| `mc-priority` | 371–374 | 4 |
| `mc-confidence` | 375–377 | 3 |
| `p1-score` | 378–384 | 7 |
| `p1-empty` | 385–389 | 5 |
| `mc-plan` | 390–417 | 28 |
| `mc-hero` | 418–418 | 1 |
| `mc-story` | 419–495 | 77 |
| `mc-feed` | 502–518 | 17 |
| `@media(max-width:980px)` | 519–520 | 2 |
| `@media(max-width:620px)` | 521–521 | 1 |
| `html` | 524–524 | 1 |
| `body` | 525–525 | 1 |
| `button` | 526–526 | 1 |
| `button:focus-visible` | 527–527 | 1 |
| `section-grid` | 528–528 | 1 |
| `card-grid` | 529–529 | 1 |
| `kpi-grid` | 530–530 | 1 |
| `two-column` | 531–531 | 1 |
| `:where(.team-card` | 532–533 | 2 |
| `:where(.team-card-title` | 534–534 | 1 |
| `:where(.mc-big` | 535–535 | 1 |
| `:where(.nav-btn` | 536–537 | 2 |
| `view-back` | 538–538 | 1 |
| `:where(.nav-btn.active` | 539–539 | 1 |
| `:where(.btn-exp)` | 540–540 | 1 |
| `:where(.nav-btn:hover` | 541–541 | 1 |
| `:where(.mc-confidence-badge` | 543–543 | 1 |
| `badge-muted` | 544–544 | 1 |
| `badge-primary` | 545–545 | 1 |
| `badge-success` | 546–546 | 1 |
| `badge-warning` | 547–547 | 1 |
| `badge-danger` | 548–548 | 1 |
| `badge-gold` | 549–549 | 1 |
| `:where(.tabs` | 550–550 | 1 |
| `:where(.tb` | 551–551 | 1 |
| `:where(.tb:hover` | 552–552 | 1 |
| `:where(.tb.active` | 553–553 | 1 |
| `:where(.mc-empty` | 554–554 | 1 |
| `:where(.wrn-box)` | 555–555 | 1 |
| `:where(.ok-box)` | 556–556 | 1 |
| `#global-tip` | 557–557 | 1 |
| `th-tip` | 558–558 | 1 |
| `details` | 559–559 | 1 |
| `details>summary` | 560–560 | 1 |
| `details>summary::-webkit-details-marker` | 561–561 | 1 |
| `details>summary::after` | 562–562 | 1 |
| `details[open]>summary::after` | 563–563 | 1 |
| `p1-score` | 564–564 | 1 |
| `tw` | 565–565 | 1 |
| `mc-story` | 566–567 | 2 |
| `lineup-builder` | 568–569 | 2 |
| `@media(max-width:980px)` | 570–574 | 1 |
| `@media(max-width:700px)` | 575–593 | 1 |
| `@media(prefers-reduced-motion:reduce)` | 594–596 | 1 |
| `vfb-hof` | 599–630 | 32 |
| `@media(max-width:640px)` | 639–639 | 1 |
| `@media(prefers-reduced-motion:reduce)` | 640–640 | 1 |
| `#main` | 643–643 | 1 |
| `ld` | 646–646 | 1 |
| `ld-title` | 647–647 | 1 |
| `prog-o` | 648–648 | 1 |
| `prog-i` | 649–649 | 1 |
| `prog-sub` | 650–650 | 1 |
| `hdr` | 653–653 | 1 |
| `hdr-l` | 654–654 | 1 |
| `hdr-logo` | 655–655 | 1 |
| `hdr-title` | 656–657 | 2 |
| `hdr-sub` | 658–658 | 1 |
| `hdr-nav` | 659–659 | 1 |
| `nav-btn` | 660–662 | 3 |
| `btn-exp` | 663–663 | 1 |
| `btn-back` | 664–664 | 1 |
| `ptabs` | 667–667 | 1 |
| `ptab` | 668–670 | 3 |
| `star-dot` | 671–671 | 1 |
| `player-badge` | 672–674 | 3 |
| `scorer-star` | 675–678 | 4 |
| `enforcer-marker` | 679–679 | 1 |
| `stats` | 682–682 | 1 |
| `sc` | 683–684 | 2 |
| `c1` | 685–685 | 1 |
| `c4` | 686–686 | 1 |
| `sv` | 687–687 | 1 |
| `sl` | 688–688 | 1 |
| `tags-row` | 691–691 | 1 |
| `tag` | 692–692 | 1 |
| `tabs` | 695–696 | 2 |
| `tb` | 697–699 | 3 |
| `tw` | 702–702 | 1 |
| `table` | 703–703 | 1 |
| `thead` | 704–704 | 1 |
| `tbody` | 705–707 | 3 |
| `bdg` | 708–708 | 1 |
| `bt` | 709–709 | 1 |
| `bv` | 710–710 | 1 |
| `bs` | 711–711 | 1 |
| `bwin` | 712–712 | 1 |
| `bdraw` | 713–713 | 1 |
| `bloss` | 714–714 | 1 |
| `bclutch` | 715–715 | 1 |
| `mono` | 716–716 | 1 |
| `chip` | 717–717 | 1 |
| `pg` | 720–720 | 1 |
| `pc` | 721–721 | 1 |
| `pcb` | 722–722 | 1 |
| `pch` | 723–723 | 1 |
| `pcn` | 724–724 | 1 |
| `pbg` | 725–725 | 1 |
| `pbf` | 726–726 | 1 |
| `pev` | 727–727 | 1 |
| `radar-wrap` | 730–730 | 1 |
| `radar-stats` | 731–731 | 1 |
| `rstat` | 732–732 | 1 |
| `rstat-name` | 733–733 | 1 |
| `rstat-bar` | 734–735 | 2 |
| `rstat-val` | 736–736 | 1 |
| `cl-grid` | 739–739 | 1 |
| `clcard` | 740–740 | 1 |
| `clcard-bar` | 741–741 | 1 |
| `clval` | 742–742 | 1 |
| `cllbl` | 743–743 | 1 |
| `ctx-bars` | 744–744 | 1 |
| `ctx-row` | 745–745 | 1 |
| `ctx-lbl` | 746–746 | 1 |
| `ctx-bg` | 747–747 | 1 |
| `ctx-fill` | 748–748 | 1 |
| `ctx-cnt` | 749–749 | 1 |
| `cl-ev` | 750–750 | 1 |
| `opp-str` | 751–751 | 1 |
| `tl-wrap` | 754–754 | 1 |
| `in-grid` | 757–757 | 1 |
| `ic` | 758–758 | 1 |
| `ic-bar` | 759–759 | 1 |
| `ititle` | 760–760 | 1 |
| `imain` | 761–761 | 1 |
| `isub` | 762–762 | 1 |
| `team-grid` | 765–765 | 1 |
| `team-card` | 766–767 | 2 |
| `game-row` | 768–769 | 2 |
| `game-date` | 770–770 | 1 |
| `game-opp` | 771–771 | 1 |
| `game-score` | 772–772 | 1 |
| `game-ind` | 773–773 | 1 |
| `stnd-tbl` | 774–778 | 5 |
| `stnd-ulm` | 779–780 | 2 |
| `rank-badge` | 781–781 | 1 |
| `rank-1` | 782–782 | 1 |
| `rank-2` | 783–783 | 1 |
| `rank-3` | 784–784 | 1 |
| `rank-def` | 785–785 | 1 |
| `rank-bar` | 786–787 | 2 |
| `rank-num` | 788–788 | 1 |
| `rank-name` | 789–789 | 1 |
| `rank-bg` | 790–790 | 1 |
| `rank-fill` | 791–791 | 1 |
| `rank-val` | 792–792 | 1 |
| `st-shell` | 793–793 | 1 |
| `st-grid` | 794–794 | 1 |
| `st-card` | 795–798 | 4 |
| `st-label` | 799–799 | 1 |
| `st-value` | 800–800 | 1 |
| `st-sub` | 801–801 | 1 |
| `st-bar` | 802–802 | 1 |
| `st-fill` | 803–803 | 1 |
| `st-detail` | 804–808 | 5 |
| `st-mini` | 809–810 | 2 |
| `st-games` | 811–811 | 1 |
| `st-game` | 812–814 | 3 |
| `st-toggle` | 815–816 | 2 |
| `st-card` | 817–817 | 1 |
| `@media(max-width:760px)` | 818–818 | 1 |
| `noev` | 821–821 | 1 |
| `wrn-box` | 822–822 | 1 |
| `ok-box` | 823–823 | 1 |
| `stitle` | 824–824 | 1 |
| `sep` | 825–825 | 1 |
| `tag` | 828–828 | 1 |
| `tags-row` | 829–829 | 1 |
| `tag-tip` | 830–831 | 2 |
| `tag` | 832–832 | 1 |
| `opp-breakdown` | 835–835 | 1 |
| `obd` | 836–836 | 1 |
| `obd-val` | 837–837 | 1 |
| `obd-lbl` | 838–838 | 1 |
| `obd-sub` | 839–839 | 1 |
| `th-tip` | 843–843 | 1 |
| `#global-tip` | 844–844 | 1 |
| `duo-row` | 845–846 | 2 |
| `duo-num` | 847–847 | 1 |
| `duo-names` | 848–848 | 1 |
| `duo-bar` | 849–850 | 2 |
| `hof-duo` | 853–859 | 4 |
| `duo-col` | 861–866 | 1 |
| `duo-col` | 868–873 | 1 |
| `duo-col` | 875–891 | 1 |
| `duo-col` | 893–898 | 1 |
| `duo-col` | 900–905 | 1 |
| `hof-duo` | 906–906 | 1 |
| `duo-val` | 907–907 | 1 |
| `hof-shell` | 910–910 | 1 |
| `hof-hero` | 911–914 | 2 |
| `hof-crest` | 915–915 | 1 |
| `hof-hero` | 916–916 | 1 |
| `hof-kicker` | 917–917 | 1 |
| `hof-subline` | 918–918 | 1 |
| `hof-arc` | 919–919 | 1 |
| `hof-bird` | 920–921 | 2 |
| `hof-section` | 922–922 | 1 |
| `hof-grid` | 923–924 | 2 |
| `hof-card` | 925–927 | 3 |
| `hof-goalie` | 928–943 | 16 |
| `hof-sg` | 944–944 | 1 |
| `hof-filter` | 945–948 | 4 |
| `hof-goalie` | 949–956 | 8 |
| `@media(max-width:640px)` | 957–964 | 1 |
| `hof-card` | 966–966 | 1 |
| `hof-podium` | 967–967 | 1 |
| `podium-place` | 968–971 | 4 |
| `podium-medal` | 972–972 | 1 |
| `podium-place` | 973–973 | 1 |
| `podium-name` | 974–974 | 1 |
| `podium-value` | 975–975 | 1 |
| `podium-place` | 976–976 | 1 |
| `podium-label` | 977–977 | 1 |
| `hof-rest` | 978–978 | 1 |
| `at-hero` | 979–981 | 3 |
| `at-name` | 982–982 | 1 |
| `at-meta` | 983–983 | 1 |
| `at-rank` | 984–986 | 3 |
| `at-kpis` | 987–987 | 1 |
| `at-kpi` | 988–991 | 4 |
| `at-grid` | 992–992 | 1 |
| `at-card` | 993–994 | 2 |
| `trend-row` | 995–996 | 2 |
| `trend-season` | 997–997 | 1 |
| `trend-bars` | 998–998 | 1 |
| `trend-bg` | 999–999 | 1 |
| `trend-fill` | 1000–1000 | 1 |
| `trend-val` | 1001–1001 | 1 |
| `sparkline` | 1002–1002 | 1 |
| `dna-row` | 1003–1003 | 1 |
| `dna-label` | 1004–1004 | 1 |
| `dna-bg` | 1005–1005 | 1 |
| `dna-fill` | 1006–1006 | 1 |
| `dna-val` | 1007–1007 | 1 |
| `partner-pill` | 1008–1011 | 4 |
| `team-card` | 1012–1015 | 4 |
| `hof-shell` | 1016–1016 | 1 |
| `role-switch` | 1017–1017 | 1 |
| `role-btn` | 1018–1021 | 4 |
| `goalie-shell` | 1022–1022 | 1 |
| `goalie-head` | 1023–1023 | 1 |
| `goalie-title` | 1024–1024 | 1 |
| `goalie-sub` | 1025–1025 | 1 |
| `goalie-pill` | 1026–1026 | 1 |
| `goalie-tabs` | 1027–1027 | 1 |
| `goalie-tab` | 1028–1029 | 2 |
| `goalie-role` | 1030–1030 | 1 |
| `goalie-grid` | 1031–1031 | 1 |
| `goalie-kpi` | 1032–1034 | 3 |
| `goalie-val` | 1035–1035 | 1 |
| `goalie-lbl` | 1036–1036 | 1 |
| `goalie-card` | 1037–1037 | 1 |
| `goalie-dashboard` | 1038–1038 | 1 |
| `goalie-section` | 1039–1039 | 1 |
| `goalie-mini` | 1040–1040 | 1 |
| `goalie-metric` | 1041–1043 | 3 |
| `goalie-profile` | 1044–1045 | 2 |
| `goalie-stack` | 1046–1047 | 2 |
| `goalie-tier` | 1048–1053 | 6 |
| `goalie-note` | 1054–1054 | 1 |
| `goalie-bars` | 1055–1055 | 1 |
| `goalie-bar` | 1056–1060 | 5 |
| `goalie-dna` | 1061–1066 | 6 |
| `goalie-insights` | 1067–1067 | 1 |
| `goalie-insight` | 1068–1070 | 3 |
| `goalie-table` | 1071–1073 | 3 |
| `@media(max-width:900px)` | 1074–1074 | 1 |
| `@media(max-width:560px)` | 1075–1075 | 1 |
| `@media(max-width:720px)` | 1076–1080 | 1 |
| `body` | 1083–1083 | 1 |
| `button` | 1084–1084 | 1 |
| `cv-action` | 1085–1086 | 2 |
| `mc-eyebrow` | 1087–1087 | 1 |
| `mc-sub` | 1088–1088 | 1 |
| `sl` | 1089–1089 | 1 |
| `cvs-lbl` | 1090–1090 | 1 |
| `mc-value` | 1091–1091 | 1 |
| `#global-tip` | 1092–1092 | 1 |
| `rm-term` | 1093–1093 | 1 |
| `duo-compare` | 1094–1103 | 10 |
| `duo-profile` | 1104–1104 | 1 |
| `duo-flow` | 1105–1105 | 1 |
| `duo-impact` | 1106–1106 | 1 |
| `duo-details` | 1107–1107 | 1 |
| `@media(max-width:640px)` | 1108–1108 | 1 |
| `tag` | 1109–1109 | 1 |
| `timeline-role` | 1110–1112 | 3 |
| `difficult-connections` | 1113–1113 | 1 |
| `difficult-note` | 1114–1114 | 1 |
| `difficult-scope` | 1115–1115 | 1 |
| `difficult-list` | 1116–1116 | 1 |
| `difficult-row` | 1117–1117 | 1 |
| `difficult-main` | 1118–1120 | 3 |
| `difficult-metric` | 1121–1121 | 1 |
| `difficult-confidence` | 1122–1122 | 1 |
| `difficult-empty` | 1123–1123 | 1 |
| `difficult-impact` | 1124–1128 | 5 |
| `difficult-score` | 1129–1129 | 1 |
| `difficult-impact` | 1130–1135 | 6 |
| `difficult-delta` | 1136–1138 | 3 |
| `difficult-impact` | 1139–1139 | 1 |
| `difficult-direct` | 1140–1140 | 1 |
| `difficult-toolbar` | 1141–1141 | 1 |
| `difficult-compact` | 1142–1143 | 2 |
| `difficult-details` | 1144–1146 | 3 |
| `difficult-more` | 1147–1147 | 1 |
| `lineup-builder` | 1148–1150 | 3 |
| `duo-pro` | 1151–1158 | 8 |
| `duo-third` | 1159–1161 | 3 |
| `duo-warning` | 1162–1167 | 6 |
| `@media(max-width:760px)` | 1168–1175 | 1 |
| `:root` | 1178–1178 | 1 |
| `#main` | 1179–1179 | 1 |
| `hdr` | 1180–1180 | 1 |
| `hdr-l` | 1181–1181 | 1 |
| `hdr-nav` | 1182–1182 | 1 |
| `:where(.matchcenter-page` | 1183–1183 | 1 |
| `:where(.team-grid` | 1184–1184 | 1 |
| `:where(.team-card` | 1185–1186 | 2 |
| `:where(.mc-card.accent-gold` | 1187–1187 | 1 |
| `:where(.mc-card.accent-red` | 1188–1188 | 1 |
| `:where(.mc-goalie-card` | 1189–1189 | 1 |
| `:where(.team-card-title` | 1190–1190 | 1 |
| `:where(.mc-section-title` | 1191–1191 | 1 |
| `:where(.mc-muted` | 1192–1192 | 1 |
| `:where(.mc-big` | 1193–1193 | 1 |
| `:where(.mc-summary-value` | 1194–1194 | 1 |
| `:where(.mc-danger-score` | 1195–1195 | 1 |
| `:where(.mc-mini` | 1196–1196 | 1 |
| `:where(.mc-player-name` | 1197–1197 | 1 |
| `:where(.mc-stat-pill` | 1198–1198 | 1 |
| `:where(.mc-tab` | 1199–1199 | 1 |
| `:where(.mc-tabs` | 1200–1200 | 1 |
| `:where(.mc-score-bar` | 1201–1201 | 1 |
| `mc-score` | 1202–1202 | 1 |
| `lineup-builder` | 1203–1205 | 3 |
| `duo-pro` | 1206–1206 | 1 |
| `duo-third` | 1207–1207 | 1 |
| `difficult-impact` | 1208–1208 | 1 |
| `mc-story` | 1209–1209 | 1 |
| `mc-empty` | 1210–1210 | 1 |
| `table` | 1211–1211 | 1 |
| `team-card` | 1212–1213 | 2 |
| `mc-section` | 1214–1214 | 1 |
| `mc-summary` | 1215–1215 | 1 |
| `mc-tab` | 1216–1216 | 1 |
| `mc-player` | 1217–1217 | 1 |
| `noev` | 1218–1218 | 1 |
| `mono` | 1219–1219 | 1 |
| `:where(.bdg` | 1220–1220 | 1 |
| `:where(.sl` | 1221–1221 | 1 |
| `:where(.partner-pill` | 1222–1222 | 1 |
| `@media(max-width:980px)` | 1223–1226 | 1 |
| `@media(max-width:640px)` | 1227–1233 | 1 |
| `season-profile` | 1236–1280 | 45 |
| `difficult-connections` | 1283–1284 | 2 |
| `difficult-impact` | 1285–1287 | 3 |
| `difficult-compact` | 1288–1288 | 1 |
| `difficult-compare` | 1289–1295 | 7 |
| `difficult-impact` | 1296–1296 | 1 |
| `difficult-metric` | 1297–1303 | 7 |
| `difficult-details` | 1304–1304 | 1 |
| `difficult-direct` | 1305–1305 | 1 |
| `response-momentum` | 1306–1312 | 7 |
| `rm-term` | 1313–1313 | 1 |
| `player-explain` | 1314–1316 | 3 |
| `@media(max-width:720px)` | 1317–1323 | 1 |
| `@media(max-width:900px)` | 1324–1326 | 1 |
| `@media(max-width:560px)` | 1327–1334 | 1 |
| `ui-kpi` | 1347–1354 | 8 |
| `ui-info` | 1355–1357 | 3 |
| `ui-delta` | 1358–1361 | 4 |
| `ui-reliability` | 1362–1365 | 4 |
| `ui-kernaussage` | 1367–1368 | 2 |
| `ui-hinweis` | 1370–1373 | 4 |
| `ui-rangliste` | 1375–1382 | 8 |
| `ui-verlauf` | 1384–1385 | 2 |
| `ui-intervall` | 1387–1391 | 5 |
| `ui-methodenbox` | 1393–1398 | 6 |
| `ui-notiz` | 1400–1400 | 1 |
| `ui-platzhalter` | 1402–1403 | 2 |
| `@media(prefers-reduced-motion:reduce)` | 1405–1405 | 1 |
| `@media(max-width:600px)` | 1407–1410 | 1 |
| `ui-objektseite` | 1419–1427 | 9 |
| `@media(max-width:600px)` | 1429–1432 | 1 |
| `@media(max-width:360px)` | 1433–1435 | 1 |
| `ia-context` | 1444–1448 | 5 |
| `ia-mainnav` | 1449–1452 | 4 |
| `ia-placeholder` | 1453–1454 | 2 |
| `ia-overview` | 1461–1465 | 5 |
| `ia-matchday` | 1471–1479 | 9 |
| `ia-back` | 1480–1480 | 1 |
| `ia-search` | 1486–1500 | 15 |
| `@media(max-width:600px)` | 1501–1503 | 1 |
| `ia-tool` | 1509–1516 | 8 |
| `ia-mainnav` | 1525–1525 | 1 |
| `@media(max-width:600px)` | 1526–1536 | 1 |
| `@media(max-width:600px)` | 1538–1543 | 1 |

## @keyframes

| Name | Zeile |
|---|---|
| `cv-skyline-sweep` | 55–55 |
| `cv-skyline-pulse-opacity` | 56–56 |
| `pulse` | 62–62 |
| `vfb-hof-intro-flash` | 631–631 |
| `vfb-hof-intro-bar` | 632–632 |
| `vfb-hof-intro-crown` | 633–633 |
| `vfb-hof-intro-float` | 634–634 |
| `vfb-hof-intro-letter` | 635–635 |
| `vfb-hof-intro-sub` | 636–636 |
| `vfb-hof-intro-spark` | 637–637 |
| `vfb-hof-intro-shimmer` | 638–638 |
| `ui-platzhalter-shimmer` | 1404–1404 |

## Funktionen, window.-Zuweisungen und const-Pfeilfunktionen (nach Zeile)

1129 `function`-Deklarationen, 130 `window.`-Funktionszuweisungen, 4 `const`-Pfeilfunktionen — alle Top-Level, sortiert nach Zeile.

| Name | Art | Zeile | Zeilen |
|---|---|---|---|
| `createSeasonBucket` | function | 1782–1796 | 15 |
| `getSeasonApiBaseUrl` | function | 1807–1823 | 17 |
| `seasonApiUrl` | function | 1824–1826 | 3 |
| `getSeasonOriginBaseUrl` | function | 1827–1835 | 9 |
| `seasonPathPrefix` | function | 1836–1838 | 3 |
| `uniqueList` | function | 1839–1841 | 3 |
| `seasonGameApiUrls` | function | 1842–1851 | 10 |
| `seasonGameHtmlUrls` | function | 1852–1859 | 8 |
| `clearAnalysisCache` | function | 2157–2159 | 3 |
| `analysisCacheContext` | function | 2160–2174 | 15 |
| `asOfCacheKeyPart` | function | 2188–2193 | 6 |
| `analysisCacheKey` | function | 2194–2197 | 4 |
| `cachedAnalysis` | function | 2198–2203 | 6 |
| `setState` | const-arrow | 2204–2211 | 8 |
| `invalidateGlobalIdentityCache` | function | 2212–2214 | 3 |
| `setP` | window | 2216–2216 | 1 |
| `setTab` | window | 2217–2217 | 1 |
| `setPlayerRoleView` | window | 2218–2218 | 1 |
| `setGoalieTab` | window | 2219–2219 | 1 |
| `toggleSpecialTeamsGameDetails` | window | 2220–2220 | 1 |
| `toggleMatchcenterSpecialTeamsGames` | window | 2221–2221 | 1 |
| `toggleMatchcenterPlayerDetails` | window | 2222–2222 | 1 |
| `toggleMatchcenterDuoDetails` | window | 2223–2223 | 1 |
| `setMatchcenterTab` | window | 2224–2224 | 1 |
| `openMatchcenterStoryPreview` | window | 2225–2225 | 1 |
| `closeMatchcenterStoryPreview` | window | 2226–2226 | 1 |
| `toggleHallOfFamePureSGPlayers` | window | 2227–2227 | 1 |
| `copyMatchcenterText` | window | 2228–2253 | 26 |
| `addLineupPlayer` | window | 2254–2259 | 6 |
| `removeLineupPlayer` | window | 2260–2260 | 1 |
| `clearLineupPlayers` | window | 2261–2261 | 1 |
| `filterLineupPlayers` | window | 2262–2268 | 7 |
| `lineupBuilderPoolIds` | function | 2269–2271 | 3 |
| `normalizeLineupLines` | function | 2272–2276 | 5 |
| `setLineupBuilderSeason` | window | 2277–2288 | 12 |
| `setLineupBuilderOpponent` | window | 2289–2289 | 1 |
| `setLineupBuilderMode` | window | 2290–2290 | 1 |
| `setLineupActiveLine` | window | 2291–2291 | 1 |
| `toggleLineupBuilderAvailable` | window | 2292–2305 | 14 |
| `selectAllLineupAvailable` | window | 2306–2306 | 1 |
| `clearLineupAvailable` | window | 2307–2307 | 1 |
| `addLineupBuilderPlayerToLine` | window | 2308–2317 | 10 |
| `addLineupBuilderPlayerToActiveLine` | window | 2318–2318 | 1 |
| `removeLineupBuilderPlayerFromLine` | window | 2319–2325 | 7 |
| `clearLineupBuilderLine` | window | 2326–2331 | 6 |
| `showLineupComplements` | window | 2332–2332 | 1 |
| `setLineupNewPlayerProfile` | window | 2333–2333 | 1 |
| `addSyntheticLineupPlayer` | window | 2334–2351 | 18 |
| `setAntiSynergyView` | window | 2352–2352 | 1 |
| `toggleAntiSynergyShowAll` | window | 2353–2353 | 1 |
| `toggleAntiSynergyHideSgOnly` | window | 2354–2354 | 1 |
| `filterLineupBuilderAvailable` | window | 2355–2361 | 7 |
| `setPage` | window | 2362–2370 | 9 |
| `backToHome` | window | 2371–2377 | 7 |
| `setGlobalPlayer` | window | 2378–2378 | 1 |
| `setGlobalPlayerDuo` | window | 2379–2379 | 1 |
| `setGlobalTab` | window | 2380–2380 | 1 |
| `toggleSgOnlyAlltime` | window | 2381–2381 | 1 |
| `getActiveSeasonKey` | function | 2383–2385 | 3 |
| `getSeasonData` | function | 2386–2414 | 29 |
| `getGlobalAllTimeSnapshot` | function | 2415–2422 | 8 |
| `applySeasonContext` | function | 2423–2446 | 24 |
| `mojibakeScore` | function | 2459–2463 | 5 |
| `decodeCp1252AsUtf8` | function | 2464–2477 | 14 |
| `repairMojibake` | function | 2478–2495 | 18 |
| `fixKnownUiTransliterations` | function | 2514–2518 | 5 |
| `cleanText` | function | 2519–2521 | 3 |
| `fixMojibakeText` | function | 2522–2524 | 3 |
| `repairRenderedMojibake` | function | 2525–2546 | 22 |
| `normalizeTeamName` | function | 2547–2556 | 10 |
| `normalizeOpponentNameForAllTime` | function | 2557–2567 | 11 |
| `isFreiburgTuebingenSgName` | function | 2568–2570 | 3 |
| `isMannheimLudwigshafenSgName` | function | 2571–2573 | 3 |
| `getAllTimeOpponentNames` | function | 2574–2581 | 8 |
| `getUniqueAllTimeOpponentNames` | function | 2582–2584 | 3 |
| `isUlmTeamName` | function | 2586–2591 | 6 |
| `getUlmTeamStatus` | function | 2592–2596 | 5 |
| `detectUlmSide` | function | 2597–2603 | 7 |
| `detectSide` | const-arrow | 2604–2604 | 1 |
| `pFull` | function | 2605–2611 | 7 |
| `normalizePlayerDisplayName` | function | 2612–2627 | 16 |
| `normalizePlayerName` | function | 2628–2637 | 10 |
| `getPreClubHistoryPlayerNames` | function | 2638–2640 | 3 |
| `isPreClubHistoryPlayerName` | function | 2641–2645 | 5 |
| `gameStableId` | function | 2646–2648 | 3 |
| `diagnoseGameDuplicates` | function | 2649–2662 | 14 |
| `gameClassificationStatusLabel` | function | 2663–2670 | 8 |
| `appendSeasonGameDiagnostics` | function | 2671–2720 | 50 |
| `warnEventProcessingOnce` | function | 2722–2729 | 8 |
| `rosterPlayerMatches` | function | 2730–2744 | 15 |
| `getRosterGameIdsForPlayer` | function | 2745–2753 | 9 |
| `isGoalieRosterEntry` | function | 2754–2758 | 5 |
| `goalieEntryRecognitionReason` | function | 2768–2777 | 10 |
| `isExcludedGoalieAppearance` | function | 2778–2791 | 14 |
| `isGoalieAppearance` | function | 2792–2797 | 6 |
| `isFieldAppearance` | function | 2798–2803 | 6 |
| `getFieldGameIdsForPlayer` | function | 2804–2810 | 7 |
| `getGoalieGameIdsForPlayer` | function | 2811–2817 | 7 |
| `getPlayerFieldGames` | function | 2818–2821 | 4 |
| `getPlayerGoalieGames` | function | 2822–2825 | 4 |
| `roleGameStableKey` | function | 2826–2828 | 3 |
| `getPlayerAlltimeRoleGames` | function | 2829–2847 | 19 |
| `getPlayerAlltimeFieldGames` | function | 2848–2850 | 3 |
| `getPlayerAlltimeGoalieGames` | function | 2851–2853 | 3 |
| `getPlayerAlltimeTotalGames` | function | 2854–2862 | 9 |
| `getPlayerSeasonRoleGameSummary` | function | 2863–2885 | 23 |
| `getPlayedUlmGames` | function | 2886–2894 | 9 |
| `countPlayedUlmGames` | function | 2895–2897 | 3 |
| `getSeasonTeamGames` | function | 2898–2901 | 4 |
| `getSeasonTeamGameIds` | function | 2902–2904 | 3 |
| `getPlayerSourceId` | function | 2905–2907 | 3 |
| `getJerseyNumber` | function | 2908–2910 | 3 |
| `normalizeEventPlayerRef` | function | 2911–2922 | 12 |
| `resolveRosterPlayerByRef` | function | 2923–2953 | 31 |
| `resolveGoalScorerPlayer` | function | 2954–2968 | 15 |
| `getGoalScorerFromEvent` | function | 2969–2971 | 3 |
| `normalizeAssistPlayerName` | function | 2972–2974 | 3 |
| `collectAssistEventRefs` | function | 2975–3002 | 28 |
| `getAssistPlayersFromEvent` | function | 3003–3016 | 14 |
| `resolveAssistPlayer` | function | 3017–3023 | 7 |
| `parseGameClock` | function | 3024–3033 | 10 |
| `t2s` | const-arrow | 3034–3034 | 1 |
| `getPhaseKey` | function | 3035–3046 | 12 |
| `variance` | function | 3047–3051 | 5 |
| `processGame` | function | 3056–3113 | 58 |
| `isGamePlayed` | function | 3115–3117 | 3 |
| `isYouthGame` | function | 3120–3128 | 9 |
| `gameStatusText` | function | 3130–3136 | 7 |
| `gameScore` | function | 3137–3146 | 10 |
| `isGameAtOrBeforeAsOf` | function | 3156–3166 | 11 |
| `classifyGameForStats` | function | 3167–3208 | 42 |
| `getRelevantSeasonGames` | function | 3209–3228 | 20 |
| `deriveAsOfForSeason` | function | 3241–3244 | 4 |
| `getSeasonStatsAsOf` | function | 3279–3290 | 12 |
| `compareGamesChronologically` | function | 3305–3318 | 14 |
| `buildMatchdays` | function | 3326–3367 | 42 |
| `getSeasonMatchdays` | function | 3376–3380 | 5 |
| `matchdayAsOfCutoff` | function | 3389–3397 | 9 |
| `formatDateDE` | function | 3399–3402 | 4 |
| `seasonKeyToHashSegment` | function | 3426–3428 | 3 |
| `hashSegmentToSeasonKey` | function | 3429–3432 | 4 |
| `isValidAsOfDate` | function | 3433–3435 | 3 |
| `isValidAsOfStartTime` | function | 3436–3438 | 3 |
| `asOfEquals` | function | 3445–3452 | 8 |
| `decodeHashSegmentSafe` | function | 3516–3518 | 3 |
| `parseAppHash` | function | 3536–3567 | 32 |
| `parseAsOfQueryValue` | function | 3575–3585 | 11 |
| `buildAppHash` | function | 3591–3603 | 13 |
| `buildGlobalPageHash` | function | 3608–3617 | 10 |
| `buildHashStringFromParsed` | function | 3623–3627 | 5 |
| `computeCurrentAppHash` | function | 3643–3655 | 13 |
| `syncHashFromState` | function | 3669–3679 | 11 |
| `withoutHashSync` | function | 3686–3694 | 9 |
| `parseLastViewState` | function | 3710–3721 | 12 |
| `getStoredLastView` | function | 3722–3725 | 4 |
| `saveLastView` | function | 3727–3729 | 3 |
| `applyGlobalPageFromHash` | function | 3741–3761 | 21 |
| `applyAppHash` | function | 3774–3804 | 31 |
| `initHashRouting` | function | 3853–3871 | 19 |
| `gameResult` | function | 3874–3880 | 7 |
| `buildStandings` | function | 3885–3924 | 40 |
| `getOppStrength` | function | 3926–3932 | 7 |
| `createPlayerAnalysisProfile` | function | 3944–3946 | 3 |
| `emptyPlayerSeasonStats` | function | 3948–3953 | 6 |
| `emptyGoalieSeasonStats` | function | 3954–3975 | 22 |
| `emptyGoalieAlltimeStats` | function | 3976–3990 | 15 |
| `emptyGoalieSpecialTeamsStats` | function | 3991–4002 | 12 |
| `emptyFieldRoleSeasonStats` | function | 4003–4005 | 3 |
| `addUnique` | function | 4007–4009 | 3 |
| `incrementUniqueCounter` | function | 4011–4016 | 6 |
| `buildPlayerIdentity` | function | 4018–4033 | 16 |
| `resetPlayerRegistrySeason` | function | 4035–4045 | 11 |
| `derivePlayerStatus` | function | 4047–4054 | 8 |
| `getOrCreatePlayerProfile` | function | 4056–4088 | 33 |
| `registerPlayerIdentity` | function | 4090–4106 | 17 |
| `ensureGoalieSeasonStats` | function | 4108–4112 | 5 |
| `ensureFieldRoleSeasonStats` | function | 4113–4117 | 5 |
| `markFieldRoleAppearance` | function | 4118–4121 | 4 |
| `registerSeasonRosters` | function | 4123–4141 | 19 |
| `linkUiPlayersToRegistry` | function | 4143–4163 | 21 |
| `applySeasonScoringToRegistry` | function | 4165–4186 | 22 |
| `finalizePlayerRegistrySeason` | function | 4188–4202 | 15 |
| `serializeSeasonStats` | function | 4204–4216 | 13 |
| `serializeGoalieSeasonStats` | function | 4217–4238 | 22 |
| `serializeFieldRoleSeasonStats` | function | 4239–4241 | 3 |
| `toPublicPlayerRegistry` | function | 4243–4272 | 30 |
| `aggregateAllTimePlayers` | function | 4274–4307 | 34 |
| `finiteNumbers` | function | 4309–4311 | 3 |
| `avgOrNull` | function | 4312–4315 | 4 |
| `medianOrNull` | function | 4316–4321 | 6 |
| `incGoalieBucket` | function | 4322–4325 | 4 |
| `goalieEventAbsSeconds` | function | 4326–4331 | 6 |
| `goalieGameDurationSeconds` | function | 4332–4336 | 5 |
| `goalieGameStateBeforeGoal` | function | 4337–4348 | 12 |
| `getGoalieOpponentName` | function | 4349–4352 | 4 |
| `getGoalieOpponentTier` | function | 4353–4357 | 5 |
| `resultGoalsAgainstForSide` | function | 4358–4367 | 10 |
| `emptySpecialTeamsStats` | function | 4368–4408 | 41 |
| `clonePlain` | function | 4409–4411 | 3 |
| `finalizeSpecialTeamsStats` | function | 4412–4418 | 7 |
| `serializeSpecialTeamsStats` | function | 4419–4421 | 3 |
| `mergeSpecialTeamsStats` | function | 4422–4451 | 30 |
| `penaltyRawText` | function | 4454–4456 | 3 |
| `isMatchPenaltyEvent` | function | 4457–4460 | 4 |
| `isTwoPlusTwoPenaltyEvent` | function | 4461–4464 | 4 |
| `getPenaltyDisciplineType` | function | 4465–4472 | 8 |
| `getGameDurationMinutes` | function | 4473–4477 | 5 |
| `gameDaySortValue` | function | 4478–4485 | 8 |
| `isSameUlmTeamContext` | function | 4486–4493 | 8 |
| `getFurtherSameDayUlmGames` | function | 4494–4505 | 12 |
| `getPenaltySpecialTeamsMinutes` | function | 4506–4508 | 3 |
| `getPenaltyBasePersonalMinutes` | function | 4509–4516 | 8 |
| `getPenaltyPersonalMinutes` | function | 4517–4526 | 10 |
| `getPenaltyDisciplineMinutes` | function | 4527–4529 | 3 |
| `getSpecialTeamsPenaltyChunks` | function | 4530–4539 | 10 |
| `isPenaltyGoalEvent` | function | 4540–4544 | 5 |
| `specialTeamsStateFromActive` | function | 4545–4551 | 7 |
| `annotateSpecialTeamsGoalEvent` | function | 4552–4566 | 15 |
| `buildSpecialTeamsForGame` | function | 4567–4760 | 194 |
| `buildSpecialTeamsForSeason` | function | 4761–4769 | 9 |
| `aggregateAlltimeSpecialTeams` | function | 4770–4777 | 8 |
| `mergeGoalieSpecialTeamsStats` | function | 4778–4789 | 12 |
| `addGoalieSpecialTeamsGameToStats` | function | 4790–4804 | 15 |
| `finalizeGoalieSeasonStats` | function | 4805–4819 | 15 |
| `addGoalieGameToStats` | function | 4820–4870 | 51 |
| `buildGoalieGameRecord` | function | 4872–4920 | 49 |
| `buildGoalieStatsForSeason` | function | 4922–5001 | 80 |
| `aggregateGoalieAlltimeStats` | function | 5003–5037 | 35 |
| `updatePlayerRoleAvailability` | function | 5039–5048 | 10 |
| `getGoalieDiagnostics` | function | 5050–5055 | 6 |
| `getSpecialTeamsDiagnostics` | function | 5057–5062 | 6 |
| `getAssistDiagnostics` | function | 5064–5116 | 53 |
| `buildSeasonDuos` | function | 5119–5145 | 27 |
| `mergeDuoSet` | function | 5146–5162 | 17 |
| `aggregateAllTimeDuos` | function | 5163–5173 | 11 |
| `aggregateSeasonStats` | function | 5175–5190 | 16 |
| `buildPlayerDataFoundation` | function | 5192–5213 | 22 |
| `buildRegistry` | function | 5215–5241 | 27 |
| `buildPlayerEvents` | function | 5246–5330 | 85 |
| `getPhaseIndex` | function | 5335–5345 | 11 |
| `computeMetrics` | function | 5350–5482 | 133 |
| `detectTypes` | function | 5484–5499 | 16 |
| `pct` | function | 5501–5501 | 1 |
| `ratio01` | function | 5502–5502 | 1 |
| `relative01` | function | 5503–5503 | 1 |
| `buildSoloDuoProfile` | function | 5504–5547 | 44 |
| `identityPartnerStats` | function | 5548–5561 | 14 |
| `identityOpponentGroups` | function | 5562–5569 | 8 |
| `eventMatchesTeams` | function | 5570–5575 | 6 |
| `clutchText` | function | 5576–5576 | 1 |
| `isImportantClutchGoal` | function | 5577–5581 | 5 |
| `isDecisiveGoal` | function | 5582–5584 | 3 |
| `isLateGoal` | function | 5585–5589 | 5 |
| `isComebackRelevantGoal` | function | 5590–5593 | 4 |
| `identityPointsVsTeams` | function | 5594–5596 | 3 |
| `identityGoalsVsTeams` | function | 5597–5599 | 3 |
| `identityClutchGoalsVsTeams` | function | 5600–5602 | 3 |
| `identityDecisiveGoalsVsTeams` | function | 5603–5605 | 3 |
| `identityLateGoalsVsTeams` | function | 5606–5608 | 3 |
| `countMomentumClusters` | function | 5609–5633 | 25 |
| `identityInputs` | function | 5634–5691 | 58 |
| `clearlyAboveAverage` | function | 5692–5692 | 1 |
| `normalizeSecondaryTraits` | function | 5693–5704 | 12 |
| `seasonRoleTraitsFromClassic` | function | 5705–5709 | 5 |
| `seasonRoleKeysForPlayer` | function | 5710–5718 | 9 |
| `hasSeasonRole` | function | 5719–5721 | 3 |
| `selectEnforcerKeys` | function | 5722–5734 | 13 |
| `buildIdentityProfiles` | function | 5735–5966 | 232 |
| `composeIdentityText` | function | 5967–5973 | 7 |
| `countCaptainAppearances` | function | 5975–5987 | 13 |
| `countGoalieAppearances` | function | 5989–5991 | 3 |
| `computeRosterStatus` | function | 5993–6011 | 19 |
| `assignStatus` | function | 6013–6198 | 186 |
| `fetchJsonLegacy` | function | 6204–6223 | 20 |
| `responseExcerpt` | function | 6225–6227 | 3 |
| `diagnosticError` | function | 6228–6232 | 5 |
| `fetchTextWithDiagnostics` | function | 6233–6262 | 30 |
| `fetchJsonWithDiagnostics` | function | 6263–6271 | 9 |
| `fetchJson` | function | 6272–6275 | 4 |
| `formatStatus` | function | 6276–6278 | 3 |
| `formatDiagnosticAttempt` | function | 6279–6291 | 13 |
| `formatGameLoadError` | function | 6292–6297 | 6 |
| `fetchSeasonGameRaw` | function | 6298–6337 | 40 |
| `normalizeGame` | function | 6340–6361 | 22 |
| `getStaticSeasonGames` | function | 6362–6365 | 4 |
| `loadSeasonManifest` | function | 6377–6393 | 17 |
| `resolveCurrentSeasonKey` | function | 6409–6428 | 20 |
| `applyCurrentSeasonCoverHighlight` | function | 6429–6433 | 5 |
| `isUsableExternalSeasonData` | function | 6446–6454 | 9 |
| `ensureExternalSeasonData` | function | 6455–6476 | 22 |
| `buildStaticSeasonDataBlock` | function | 6477–6486 | 10 |
| `getGameId` | function | 6513–6517 | 5 |
| `findDuplicateGameIds` | function | 6519–6529 | 11 |
| `validateGameStructure` | function | 6547–6586 | 40 |
| `validateSeasonGames` | function | 6588–6598 | 11 |
| `diffGameIds` | function | 6600–6609 | 10 |
| `validateSeasonKey` | function | 6611–6621 | 11 |
| `validateWrapperFormat` | function | 6623–6632 | 10 |
| `validateMergedSeason` | function | 6634–6651 | 18 |
| `buildDryRunReport` | function | 6653–6715 | 63 |
| `seasonDataPreviewRerender` | function | 6736–6738 | 3 |
| `seasonDataPreviewRow` | function | 6740–6751 | 12 |
| `buildSeasonDataPreviewChanges` | function | 6758–6775 | 18 |
| `stageSeasonDataPreview` | function | 6786–6837 | 52 |
| `stageSeasonDataPreviewFromFile` | function | 6838–6851 | 14 |
| `stageSeasonDataPreviewFromPaste` | function | 6852–6856 | 5 |
| `discardSeasonDataPreview` | function | 6857–6861 | 5 |
| `getSeasonDataPreview` | function | 6863–6865 | 3 |
| `isSeasonDataPreviewStale` | function | 6871–6875 | 5 |
| `rSeasonDataPreviewStatus` | function | 6877–6879 | 3 |
| `rSeasonDataPreviewRows` | function | 6880–6888 | 9 |
| `rSeasonDataPreviewCard` | function | 6890–6925 | 36 |
| `setSeasonDataPreviewOpen` | window | 6926–6926 | 1 |
| `setSeasonDataPreviewPasteText` | window | 6927–6927 | 1 |
| `fileNameForLineupSeasonKey` | function | 6947–6949 | 3 |
| `ensureLineupDataLoaded` | function | 6965–6981 | 17 |
| `ensureLineupGroupsRegistryLoaded` | function | 6990–7006 | 17 |
| `resolveLineupPlayerName` | function | 7018–7021 | 4 |
| `findLineupGameContext` | function | 7024–7031 | 8 |
| `rEinsatzCenterGroup` | function | 7033–7044 | 12 |
| `rEinsatzCenterCombo` | function | 7046–7053 | 8 |
| `rEinsatzCenterGameCard` | function | 7055–7072 | 18 |
| `rEinsatzCenterPage` | function | 7074–7093 | 20 |
| `setEinsatzCenterSeason` | window | 7095–7100 | 6 |
| `openEinsatzCenter` | window | 7101–7108 | 8 |
| `computeEinsatzCenterStats` | function | 7119–7149 | 31 |
| `lineupGroupDisplayName` | function | 7150–7155 | 6 |
| `rEinsatzCenterStats` | function | 7156–7174 | 19 |
| `getEffectiveLineupData` | function | 7232–7239 | 8 |
| `isEinsatzCenterGameFromDraft` | function | 7241–7244 | 4 |
| `einsatzCenterDraftInView` | function | 7246–7249 | 4 |
| `rEinsatzCenterDraftMark` | function | 7250–7253 | 4 |
| `rEinsatzCenterDraftStatsHint` | function | 7254–7258 | 5 |
| `einsatzCenterDraftStaleHint` | function | 7260–7262 | 3 |
| `rEinsatzCenterDraftBanner` | function | 7264–7271 | 8 |
| `ensureEinsatzCenterDraft` | function | 7282–7295 | 14 |
| `getEinsatzCenterGameDraft` | function | 7304–7315 | 12 |
| `einsatzCenterAutosaveKey` | function | 7342–7342 | 1 |
| `einsatzCenterStorageRead` | function | 7343–7345 | 3 |
| `einsatzCenterStorageWrite` | function | 7346–7348 | 3 |
| `einsatzCenterStorageRemove` | function | 7349–7351 | 3 |
| `einsatzCenterDraftIsEmpty` | function | 7354–7356 | 3 |
| `einsatzCenterSerializeDraft` | function | 7358–7370 | 13 |
| `einsatzCenterIsPlainObject` | function | 7371–7371 | 1 |
| `einsatzCenterDeserializeAutosave` | function | 7377–7410 | 34 |
| `einsatzCenterCurrentRawBaseHash` | function | 7417–7422 | 6 |
| `einsatzCenterAutosaveDraft` | function | 7431–7458 | 28 |
| `einsatzCenterInspectAutosave` | function | 7466–7494 | 29 |
| `restoreEinsatzCenterAutosave` | function | 7497–7513 | 17 |
| `discardEinsatzCenterAutosave` | function | 7515–7520 | 6 |
| `rEinsatzCenterAutosaveBanner` | function | 7523–7535 | 13 |
| `einsatzCenterAutosaveInfoText` | function | 7537–7547 | 11 |
| `loadEinsatzCenterMismatchedAutosave` | function | 7561–7579 | 19 |
| `deriveLineupValidPlayerIds` | function | 7592–7608 | 17 |
| `deriveLineupUlmPlayerIds` | function | 7616–7632 | 17 |
| `getSeasonmanagerRosterSuggestion` | function | 7646–7666 | 21 |
| `einsatzCenterCanonicalJson` | function | 7675–7684 | 10 |
| `einsatzCenterSha256Hex` | function | 7685–7689 | 5 |
| `einsatzCenterComputeBaseHash` | function | 7690–7692 | 3 |
| `einsatzCenterSoftIssues` | function | 7699–7717 | 19 |
| `rEinsatzCenterGroupEditor` | function | 7720–7750 | 31 |
| `rEinsatzCenterComboEditor` | function | 7751–7757 | 7 |
| `rEinsatzCenterRosterSuggestionCard` | function | 7767–7797 | 31 |
| `rEinsatzCenterGameEditor` | function | 7798–7850 | 53 |
| `rEinsatzCenterEditPage` | function | 7851–7898 | 48 |
| `startEinsatzCenterDraftMode` | window | 7901–7905 | 5 |
| `cancelEinsatzCenterEdit` | window | 7906–7916 | 11 |
| `viewEinsatzCenterMergedView` | window | 7918–7918 | 1 |
| `returnToEinsatzCenterEdit` | window | 7919–7919 | 1 |
| `setEinsatzCenterIncludeDraft` | window | 7920–7920 | 1 |
| `selectEinsatzCenterEditGame` | window | 7921–7924 | 4 |
| `addEinsatzCenterRosterPlayer` | window | 7925–7932 | 8 |
| `removeEinsatzCenterRosterPlayer` | window | 7933–7940 | 8 |
| `toggleEinsatzCenterRosterSuggestionPlayer` | window | 7941–7947 | 7 |
| `dismissEinsatzCenterRosterSuggestion` | window | 7948–7951 | 4 |
| `acceptEinsatzCenterRosterSuggestion` | window | 7959–7975 | 17 |
| `addEinsatzCenterExistingGroup` | window | 7976–7984 | 9 |
| `addEinsatzCenterNewGroup` | window | 7985–8001 | 17 |
| `removeEinsatzCenterGroup` | window | 8002–8009 | 8 |
| `toggleEinsatzCenterGroupRename` | window | 8010–8012 | 3 |
| `renameEinsatzCenterGroup` | window | 8024–8043 | 20 |
| `addEinsatzCenterGroupPlayer` | window | 8044–8051 | 8 |
| `removeEinsatzCenterGroupPlayer` | window | 8052–8059 | 8 |
| `setEinsatzCenterGroupPlayerPosition` | window | 8060–8068 | 9 |
| `toggleEinsatzCenterComboPlayer` | window | 8069–8076 | 8 |
| `confirmEinsatzCenterCombo` | window | 8077–8087 | 11 |
| `removeEinsatzCenterCombo` | window | 8088–8094 | 7 |
| `setEinsatzCenterGameNote` | window | 8095–8101 | 7 |
| `buildEinsatzCenterDraftExport` | function | 8105–8118 | 14 |
| `exportEinsatzCenterDraft` | window | 8119–8131 | 13 |
| `loadSeasonData` | function | 8146–8604 | 459 |
| `showMainShell` | function | 8607–8611 | 5 |
| `hasSeasonSource` | function | 8612–8615 | 4 |
| `hasEmbeddedSeasonData` | function | 8616–8618 | 3 |
| `getGlobalLoadableSeasonKeys` | function | 8619–8625 | 7 |
| `getAllTimeCoverStats` | function | 8626–8633 | 8 |
| `updateCoverAllTimeStats` | function | 8634–8642 | 9 |
| `loadSeasonForGlobal` | function | 8644–8674 | 31 |
| `ensureGlobalDataLoaded` | function | 8675–8690 | 16 |
| `loadSeason` | function | 8692–8743 | 52 |
| `startApp` | window | 8745–8756 | 12 |
| `ensureAppLoaded` | function | 8747–8756 | 10 |
| `openSeason` | window | 8757–8759 | 3 |
| `openAllTimePlayers` | window | 8760–8765 | 6 |
| `hofIntroDelay` | function | 8768–8770 | 3 |
| `ensureHallOfFameIntroOverlay` | function | 8771–8803 | 33 |
| `buildHallOfFameIntroTitle` | function | 8804–8814 | 11 |
| `seedHallOfFameIntroParticles` | function | 8815–8832 | 18 |
| `cleanupHallOfFameIntro` | function | 8833–8847 | 15 |
| `restoreHallOfFameIntroPrevious` | function | 8848–8859 | 12 |
| `finishHallOfFameIntro` | function | 8860–8867 | 8 |
| `startHallOfFameIntro` | function | 8868–8892 | 25 |
| `cancelHallOfFameIntro` | function | 8893–8904 | 12 |
| `openHallOfFame` | window | 8906–8929 | 24 |
| `openComparisonCenter` | window | 8930–8958 | 29 |
| `openMatchcenter` | window | 8959–8980 | 22 |
| `openLineupBuilder` | window | 8981–8998 | 18 |
| `setMatchcenterOpponent` | window | 8999–8999 | 1 |
| `setMatchcenterContext` | window | 9000–9000 | 1 |
| `setMatchcenterSeason` | window | 9001–9001 | 1 |
| `toggleMatchcenterGames` | window | 9002–9002 | 1 |
| `openLexicon` | window | 9003–9006 | 4 |
| `rRes` | const-arrow | 9011–9011 | 1 |
| `rClutchBadge` | function | 9012–9019 | 8 |
| `escAttr` | function | 9020–9022 | 3 |
| `roleTraitLabel` | function | 9023–9025 | 3 |
| `isVisibleSecondaryTrait` | function | 9026–9029 | 4 |
| `rRoleTraitTip` | function | 9030–9034 | 5 |
| `rStyleMetricTip` | function | 9035–9038 | 4 |
| `rRosterStatusBadge` | function | 9039–9046 | 8 |
| `classicTagLabel` | function | 9047–9049 | 3 |
| `rClassicTagTip` | function | 9050–9054 | 5 |
| `fallbackIdentityProfile` | function | 9055–9065 | 11 |
| `rIdentityTags` | function | 9066–9074 | 9 |
| `rStyleProfileBars` | function | 9075–9085 | 11 |
| `rIdentityCards` | function | 9086–9111 | 26 |
| `rClassicRoleTags` | function | 9112–9119 | 8 |
| `renderTags` | function | 9120–9122 | 3 |
| `getSeasonPlayerFieldBasis` | function | 9124–9150 | 27 |
| `getSeasonScopedIdentityProfile` | function | 9151–9162 | 12 |
| `rSeasonProfileKpis` | function | 9163–9182 | 20 |
| `rSeasonProfileTagStrip` | function | 9184–9188 | 5 |
| `rMatrix` | function | 9191–9235 | 45 |
| `rSeasonDuoSummary` | function | 9238–9246 | 9 |
| `rPhases` | function | 9248–9265 | 18 |
| `rRadar` | function | 9268–9315 | 48 |
| `rClutch` | function | 9318–9350 | 33 |
| `rTimeline` | function | 9353–9461 | 109 |
| `rPenalties` | function | 9464–9480 | 17 |
| `rOppBreakdown` | function | 9483–9515 | 33 |
| `generatePlayerInsights` | function | 9518–9561 | 44 |
| `rSeasonInsightsTab` | function | 9564–9577 | 14 |
| `rInsights` | function | 9579–9630 | 52 |
| `rTable` | function | 9633–9653 | 21 |
| `findLoadedSeasonPlayer` | function | 9656–9664 | 9 |
| `getAllTimePlayerRows` | function | 9665–9680 | 16 |
| `isSgOnlyAlltimePlayer` | function | 9681–9688 | 8 |
| `isPureSGPlayer` | function | 9689–9692 | 4 |
| `filterPureSGPlayers` | function | 9693–9696 | 4 |
| `getAllTimeMainPlayerRows` | function | 9697–9699 | 3 |
| `getAllTimeSgOnlyRows` | function | 9700–9702 | 3 |
| `getPlayerSeasonStats` | function | 9703–9707 | 5 |
| `getPlayerAlltimeStats` | function | 9708–9715 | 8 |
| `getPlayerRegistryProfile` | function | 9716–9723 | 8 |
| `getPlayerGoalieSeasonStats` | function | 9724–9728 | 5 |
| `getPlayerGoalieAlltimeStats` | function | 9729–9752 | 24 |
| `sumRoleGames` | function | 9753–9758 | 6 |
| `getPlayerRoleAvailability` | function | 9759–9772 | 14 |
| `resolvePlayerRoleView` | function | 9773–9780 | 8 |
| `rPlayerRoleSwitch` | function | 9781–9787 | 7 |
| `goalieNum` | function | 9788–9793 | 6 |
| `goalieTime` | function | 9794–9801 | 8 |
| `goalieBucketRows` | function | 9802–9807 | 6 |
| `goalieTopRow` | function | 9808–9810 | 3 |
| `goalieTierMeta` | function | 9811–9819 | 9 |
| `goalieStdDev` | function | 9820–9825 | 6 |
| `goalieDetailFirstTime` | function | 9826–9832 | 7 |
| `goalieEventSecondInPeriod` | function | 9833–9838 | 6 |
| `goaliePctText` | function | 9839–9842 | 4 |
| `goalieSafeNum` | function | 9843–9846 | 4 |
| `goalieClampScore` | function | 9847–9850 | 4 |
| `goalieInverseScore` | function | 9851–9858 | 8 |
| `goaliePositiveScore` | function | 9859–9866 | 8 |
| `goaliePositiveCurveScore` | function | 9867–9875 | 9 |
| `goalieWeightedScore` | function | 9876–9881 | 6 |
| `goalieApplySampleConfidence` | function | 9882–9889 | 8 |
| `goalieBucketLooseSum` | function | 9890–9896 | 7 |
| `buildGoalieAnalysisModel` | function | 9897–10055 | 159 |
| `rGoalieBars` | function | 10056–10065 | 10 |
| `goalieDnaKey` | function | 10107–10111 | 5 |
| `goalieDnaValue` | function | 10112–10118 | 7 |
| `goalieStateGoals` | function | 10119–10119 | 1 |
| `buildGoalieRoleProfile` | function | 10120–10193 | 74 |
| `rGoalieRoleTraits` | function | 10194–10197 | 4 |
| `getGoalieDnaRows` | function | 10198–10201 | 4 |
| `rGoalieDnaBars` | function | 10202–10215 | 14 |
| `rGoalieKpis` | function | 10216–10232 | 17 |
| `rGoalieMiniMetrics` | function | 10233–10238 | 6 |
| `rGoalieFirstGoalResistance` | function | 10239–10252 | 14 |
| `rGoalieMomentum` | function | 10253–10266 | 14 |
| `rGoalieTierCards` | function | 10267–10294 | 28 |
| `rGoaliePhaseProfile` | function | 10295–10311 | 17 |
| `rGoalieInsights` | function | 10312–10333 | 22 |
| `rGoalieOverview` | function | 10334–10350 | 17 |
| `rGoaliePhases` | function | 10351–10353 | 3 |
| `rGoalieOpponents` | function | 10354–10365 | 12 |
| `rGoalieStability` | function | 10366–10390 | 25 |
| `rGoalieTable` | function | 10391–10398 | 8 |
| `rGoalieAnalysis` | function | 10399–10424 | 26 |
| `seasonOrderIndex` | function | 10425–10429 | 5 |
| `getPreviousSeasonKey` | function | 10430–10434 | 5 |
| `playerAppearedInSeasonByName` | function | 10435–10445 | 11 |
| `playerAppearedForUlmStatusInSeasonByName` | function | 10446–10464 | 19 |
| `isRookieCandidateForSeason` | function | 10465–10474 | 10 |
| `getLoadedSeasonPointsByName` | function | 10475–10479 | 5 |
| `seasonHasPureUlmTeam` | function | 10480–10486 | 7 |
| `isSgOnlyHallOfFameExcluded` | function | 10487–10495 | 9 |
| `isHallOfFameEligiblePlayer` | function | 10496–10501 | 6 |
| `getHallOfFamePlayerRows` | function | 10502–10504 | 3 |
| `getHallOfFamePlayerIdSet` | function | 10505–10507 | 3 |
| `getGlobalProfileEvents` | function | 10509–10520 | 12 |
| `countBy` | function | 10522–10530 | 9 |
| `getLoadedSeasonPlayerUi` | function | 10531–10535 | 5 |
| `getGlobalPlayerTeamRecord` | function | 10536–10561 | 26 |
| `getGlobalPlayerPeakGame` | function | 10562–10572 | 11 |
| `getGlobalPlayerBestSeason` | function | 10573–10579 | 7 |
| `getAllTimeDuoRowsForPlayer` | function | 10580–10590 | 11 |
| `getCarryPerformanceRows` | function | 10591–10606 | 16 |
| `rCarryPerformanceRows` | function | 10607–10619 | 13 |
| `getAllTimeGamesPlayedRows` | function | 10620–10644 | 25 |
| `getAllTimePenaltyRows` | function | 10645–10660 | 16 |
| `getSeasonUiPlayerForProfile` | function | 10661–10664 | 4 |
| `getSeasonIdentityProfile` | function | 10665–10669 | 5 |
| `seasonStatNumber` | function | 10670–10673 | 4 |
| `seasonStatSetSize` | function | 10674–10679 | 6 |
| `isActiveAlltimeSeasonStats` | function | 10680–10693 | 14 |
| `getActiveAlltimeSeasonKeys` | function | 10694–10704 | 11 |
| `getAlltimeRecencyWeight` | function | 10705–10710 | 6 |
| `getRosterStatus` | function | 10711–10717 | 7 |
| `getGlobalTopScorerMilestones` | function | 10718–10730 | 13 |
| `getGlobalRookieSeasonKey` | function | 10731–10744 | 14 |
| `getGlobalRookieMilestone` | function | 10745–10755 | 11 |
| `getGlobalPlayerMilestones` | function | 10756–10773 | 18 |
| `buildOpponentIntelligence` | function | 10775–10828 | 54 |
| `rOpponentIntelBars` | function | 10830–10840 | 11 |
| `getAllTimeDuoRows` | function | 10842–10864 | 23 |
| `rDuoRows` | function | 10866–10885 | 20 |
| `getAllLoadedSeasonGames` | function | 10887–10906 | 20 |
| `getRosterEntryRegistryProfile` | function | 10908–10911 | 4 |
| `difficultConnectionConfidence` | function | 10912–10916 | 5 |
| `getDuoRowsForPlayerScope` | function | 10917–10935 | 19 |
| `buildDirectDuoLookupForPlayer` | function | 10936–10953 | 18 |
| `duoScopeSeasonKeys` | function | 10954–10957 | 4 |
| `getDuoScorerCountsWithCandidate` | function | 10958–10977 | 20 |
| `buildBestThirdManOptions` | function | 10978–11008 | 31 |
| `getDuoDirectScorerGameCounts` | function | 11009–11040 | 32 |
| `responseMomentumAbsSeconds` | function | 11042–11047 | 6 |
| `responseMomentumTime` | function | 11048–11054 | 7 |
| `responseMomentumGameRows` | function | 11055–11061 | 7 |
| `responseMomentumSide` | function | 11062–11070 | 9 |
| `responseMomentumActor` | function | 11071–11081 | 11 |
| `responseMomentumGoalActors` | function | 11082–11089 | 8 |
| `buildAnnotatedGoalEventsForGame` | function | 11090–11190 | 101 |
| `responseMomentumConfidence` | function | 11191–11195 | 5 |
| `responseMomentumEmptyState` | function | 11196–11203 | 8 |
| `responseMomentumPairKey` | function | 11204–11206 | 3 |
| `ensureRmPlayer` | function | 11207–11212 | 6 |
| `ensureRmDuo` | function | 11213–11218 | 6 |
| `finalizeResponseStats` | function | 11219–11232 | 14 |
| `buildResponseGoalStatsRaw` | function | 11233–11281 | 49 |
| `buildResponseGoalStats` | function | 11282–11287 | 6 |
| `finalizeMomentumStats` | function | 11288–11293 | 6 |
| `buildMomentumSwingStatsRaw` | function | 11294–11364 | 71 |
| `buildMomentumSwingStats` | function | 11365–11370 | 6 |
| `buildDuoFloorCeiling` | function | 11371–11412 | 42 |
| `buildDuoWarnings` | function | 11413–11431 | 19 |
| `duoProPairKey` | function | 11432–11434 | 3 |
| `duoProContextSeasonKey` | function | 11435–11437 | 3 |
| `getDuoFieldPlayerRows` | function | 11438–11448 | 11 |
| `duoProPlayer` | function | 11449–11453 | 5 |
| `getDuoSharedFieldRows` | function | 11454–11459 | 6 |
| `buildDuoDirectProduction` | function | 11460–11480 | 21 |
| `emptyDuoTeamImpactStats` | function | 11481–11483 | 3 |
| `addDuoTeamGame` | function | 11484–11499 | 16 |
| `finalizeDuoTeamImpactStats` | function | 11500–11507 | 8 |
| `buildDuoWithWithoutImpact` | function | 11508–11541 | 34 |
| `buildDuoOpponentAdjusted` | function | 11542–11554 | 13 |
| `buildDuoNetworkContext` | function | 11555–11578 | 24 |
| `buildDuoGapAnalysis` | function | 11579–11595 | 17 |
| `buildDuoCompatibility` | function | 11596–11618 | 23 |
| `buildDuoUntestedPotential` | function | 11619–11630 | 12 |
| `buildDuoUsageRate` | function | 11631–11642 | 12 |
| `buildDuoReplacementOptions` | function | 11643–11652 | 10 |
| `buildDuoProAnalysis` | function | 11653–11696 | 44 |
| `rDuoCenterPro` | function | 11697–11811 | 115 |
| `duoProDomId` | function | 11812–11814 | 3 |
| `duoProPickerOpen` | function | 11815–11817 | 3 |
| `duoProPickerMessage` | function | 11818–11820 | 3 |
| `setDuoProPickerState` | function | 11821–11830 | 10 |
| `duoProResolveCandidate` | function | 11831–11839 | 9 |
| `duoProSelectionPayload` | function | 11840–11849 | 10 |
| `openDuoProPicker` | window | 11850–11850 | 1 |
| `cancelDuoProPicker` | window | 11851–11851 | 1 |
| `selectDuoProQuick` | window | 11852–11855 | 4 |
| `confirmDuoProSelection` | window | 11856–11870 | 15 |
| `setDuoProSelection` | window | 11871–11878 | 8 |
| `rDuoProPlayerSelect` | function | 11879–11885 | 7 |
| `rInteractiveDuoCenterPro` | function | 11886–11941 | 56 |
| `rSeasonDuoCenterPro` | function | 11942–11944 | 3 |
| `getDifficultConnectionRowsForPlayer` | function | 11945–11989 | 45 |
| `emptyRosterImpactStats` | function | 11990–11992 | 3 |
| `finalizeRosterImpactStats` | function | 11993–12000 | 8 |
| `addRosterImpactGameToStats` | function | 12001–12010 | 10 |
| `getRosterImpactPlayerEventLookup` | function | 12011–12031 | 21 |
| `getRosterImpactPlayerGames` | function | 12032–12072 | 41 |
| `rosterImpactConfidence` | function | 12073–12078 | 6 |
| `rosterImpactConfidenceWeight` | function | 12079–12082 | 4 |
| `antiSynergyImpactScore` | function | 12083–12097 | 15 |
| `buildRosterImpactAnalysis` | function | 12098–12157 | 60 |
| `buildDuoAntiSynergy` | function | 12158–12160 | 3 |
| `rAntiSynergyDelta` | function | 12161–12167 | 7 |
| `antiSynergyDeltaClass` | function | 12168–12171 | 4 |
| `antiSynergySigned` | function | 12172–12176 | 5 |
| `rAntiSynergyCompareChip` | function | 12177–12184 | 8 |
| `rAntiSynergyMetricRow` | function | 12185–12193 | 9 |
| `rRosterImpactStatLine` | function | 12194–12197 | 4 |
| `antiSynergyPartnerIsSgOnly` | function | 12198–12201 | 4 |
| `rAntiSynergyMainDelta` | function | 12202–12211 | 10 |
| `rDifficultConnectionList` | function | 12212–12236 | 25 |
| `rDifficultConnectionListCompactLegacy` | function | 12237–12278 | 42 |
| `rDifficultConnectionListCompact` | function | 12279–12317 | 39 |
| `rDifficultConnectionsCard` | function | 12318–12354 | 37 |
| `responseMomentumTooltipFor` | function | 12399–12405 | 7 |
| `rmTerm` | function | 12406–12409 | 4 |
| `rRmKpi` | function | 12410–12420 | 11 |
| `rRmTopList` | function | 12421–12431 | 11 |
| `rResponseMomentumOverviewCard` | function | 12432–12455 | 24 |
| `rPlayerResponseMomentumCard` | function | 12456–12474 | 19 |
| `rDuoResponseMomentumCard` | function | 12475–12494 | 20 |
| `rTeamResponseMomentumCard` | function | 12495–12501 | 7 |
| `rMatchcenterResponseMomentum` | function | 12502–12539 | 38 |
| `getTeamAllTimeRecords` | function | 12541–12581 | 41 |
| `getAllTimeOpponentIntelligence` | function | 12583–12589 | 7 |
| `getAllTimeOpponentTopScorers` | function | 12591–12615 | 25 |
| `getHallOfFameStats` | function | 12617–12639 | 23 |
| `rOpponentTopScorerTable` | function | 12641–12660 | 20 |
| `getAllTimeIdentityStandings` | function | 12662–12696 | 35 |
| `buildRecencyWeightedGlobalIdentityProfile` | function | 12698–12745 | 48 |
| `getGlobalIdentityProfile` | function | 12747–12773 | 27 |
| `dedupeIdentityProfileTags` | function | 12775–12786 | 12 |
| `rGlobalProfileTags` | function | 12788–12792 | 5 |
| `escHtml` | function | 12794–12796 | 3 |
| `pctValue` | function | 12797–12800 | 4 |
| `rHallOfFameHero` | function | 12801–12826 | 26 |
| `rHallPodiumList` | function | 12827–12849 | 23 |
| `rHallDuoTemple` | function | 12850–12857 | 8 |
| `hallGoalieNum` | function | 12859–12864 | 6 |
| `hallGoalieTime` | function | 12865–12872 | 8 |
| `hallGoalieSeasonLabel` | function | 12873–12873 | 1 |
| `isHallRowPureSG` | function | 12874–12881 | 8 |
| `rHallSGBadge` | function | 12882–12884 | 3 |
| `hallGoaliePkStats` | function | 12885–12896 | 12 |
| `hallGoalieTopteamStats` | function | 12897–12903 | 7 |
| `hallGoalieSeasonScore` | function | 12904–12923 | 20 |
| `hallGoalieRowFromStats` | function | 12924–12956 | 33 |
| `getHallGoalieData` | function | 12957–12972 | 16 |
| `hallGoalieNameHtml` | function | 12973–12975 | 3 |
| `hallGoalieTooltip` | function | 12990–12993 | 4 |
| `hallGoalieExplainForLabel` | function | 12994–13008 | 15 |
| `rHallGoalieRankCard` | function | 13009–13040 | 32 |
| `rHallGoalieAwardCards` | function | 13041–13057 | 17 |
| `rHallGoalieLegends` | function | 13058–13090 | 33 |
| `getGlobalSeasonStatRows` | function | 13091–13106 | 16 |
| `getAlltimeRank` | function | 13107–13112 | 6 |
| `rAlltimeKpis` | function | 13113–13126 | 14 |
| `rSparkline` | function | 13127–13139 | 13 |
| `comparisonItemKey` | function | 13151–13156 | 6 |
| `normalizeComparisonItem` | function | 13157–13161 | 5 |
| `comparisonJsArg` | function | 13162–13164 | 3 |
| `comparisonNum` | function | 13165–13168 | 4 |
| `comparisonPct` | function | 13169–13172 | 4 |
| `comparisonFmt` | function | 13173–13176 | 4 |
| `comparisonPctFmt` | function | 13177–13179 | 3 |
| `getComparisonPlayerRow` | function | 13180–13182 | 3 |
| `getComparisonSeasonLabel` | function | 13183–13185 | 3 |
| `getComparisonTeamGoalsForSeason` | function | 13186–13197 | 12 |
| `getComparisonAlltimeTeamGoals` | function | 13198–13200 | 3 |
| `getComparisonSeasonEvents` | function | 13201–13205 | 5 |
| `getComparisonChemistryFromEvents` | function | 13206–13210 | 5 |
| `getComparisonClutchFromEvents` | function | 13211–13215 | 5 |
| `getComparisonStyleProfile` | function | 13216–13240 | 25 |
| `getComparisonProfile` | function | 13241–13245 | 5 |
| `getComparisonSeasonTrend` | function | 13246–13271 | 26 |
| `getComparisonAlltimeTrend` | function | 13272–13277 | 6 |
| `getComparisonPlayerOptions` | function | 13279–13293 | 15 |
| `comparisonVariantValue` | function | 13294–13296 | 3 |
| `getComparisonVariantsForPlayer` | function | 13297–13321 | 25 |
| `parseComparisonVariant` | function | 13322–13336 | 15 |
| `getComparisonCurrentSelection` | function | 13337–13347 | 11 |
| `filterComparisonPlayers` | window | 13348–13355 | 8 |
| `selectComparisonPlayer` | window | 13356–13361 | 6 |
| `setComparisonRoleMode` | window | 13362–13366 | 5 |
| `setComparisonVariant` | window | 13367–13370 | 4 |
| `toggleComparisonSgOnly` | window | 13371–13371 | 1 |
| `addComparisonItem` | window | 13372–13379 | 8 |
| `addSelectedComparisonItem` | window | 13380–13385 | 6 |
| `toggleComparisonPicker` | window | 13386–13386 | 1 |
| `removeComparisonItem` | window | 13387–13390 | 4 |
| `clearComparison` | window | 13391–13391 | 1 |
| `runComparison` | window | 13392–13398 | 7 |
| `selectComparisonMode` | window | 13399–13399 | 1 |
| `backToComparisonModeSelect` | window | 13400–13400 | 1 |
| `normalizeDuoComparisonItem` | function | 13401–13404 | 4 |
| `comparisonDuoContext` | function | 13405–13408 | 4 |
| `setComparisonDuoMode` | window | 13409–13409 | 1 |
| `setComparisonDuoSeasonKey` | window | 13410–13410 | 1 |
| `setComparisonDuoSearch` | window | 13411–13411 | 1 |
| `filterPlayerSuggestions` | function | 13412–13423 | 12 |
| `rComparisonDuoSuggestionButtons` | function | 13424–13427 | 4 |
| `renderComparisonDuoSuggestions` | function | 13428–13436 | 9 |
| `filterComparisonDuoSuggestions` | window | 13437–13444 | 8 |
| `selectComparisonDuoSuggestion` | window | 13438–13444 | 7 |
| `handleComparisonDuoSearchKey` | window | 13445–13457 | 13 |
| `setComparisonDuoPlayer` | window | 13458–13463 | 6 |
| `addComparisonDuoFromSelection` | window | 13464–13471 | 8 |
| `addComparisonDuo` | window | 13472–13474 | 3 |
| `removeComparisonDuo` | window | 13475–13478 | 4 |
| `clearComparisonDuos` | window | 13479–13479 | 1 |
| `runDuoComparison` | window | 13480–13484 | 5 |
| `buildDuoComparison` | function | 13485–13504 | 20 |
| `rDuoComparisonBars` | function | 13505–13509 | 5 |
| `rDuoCompareSummaryCards` | function | 13510–13540 | 31 |
| `rDuoComparisonProfile` | function | 13541–13562 | 22 |
| `rDuoComparisonChemistry` | function | 13563–13578 | 16 |
| `rDuoComparisonImpact` | function | 13579–13594 | 16 |
| `rDuoComparisonContext` | function | 13595–13612 | 18 |
| `rDuoComparisonDetails` | function | 13613–13616 | 4 |
| `rDuoComparisonDashboard` | function | 13617–13630 | 14 |
| `rComparisonDuoSearchBox` | function | 13631–13640 | 10 |
| `rDuoComparisonPage` | function | 13641–13651 | 11 |
| `rComparisonModeSelect` | function | 13652–13654 | 3 |
| `getComparisonEventsForItem` | function | 13655–13657 | 3 |
| `getComparisonRosterGamesForSeason` | function | 13658–13674 | 17 |
| `getComparisonRosterGames` | function | 13675–13682 | 8 |
| `comparisonEventGameKey` | function | 13683–13685 | 3 |
| `comparisonEventPhaseLabel` | function | 13686–13689 | 4 |
| `comparisonOpponentStrengthTier` | function | 13690–13695 | 6 |
| `buildComparisonExtraMetrics` | function | 13696–13753 | 58 |
| `getGoalieComparisonAlltimeTrend` | function | 13754–13770 | 17 |
| `getGoalieComparisonSeasonTrend` | function | 13771–13789 | 19 |
| `buildGoalieComparisonDataset` | function | 13790–13840 | 51 |
| `buildComparisonDataset` | function | 13841–13876 | 36 |
| `kpiValueText` | function | 13878–13881 | 4 |
| `kpiDelta` | function | 13882–13887 | 6 |
| `kpiItemColor` | function | 13888–13890 | 3 |
| `rKpiCards` | function | 13891–13901 | 11 |
| `rKpiMirrorRows` | function | 13902–13961 | 60 |
| `kpiRadarValue` | function | 13962–13972 | 11 |
| `rKpiRadar` | function | 13973–14007 | 35 |
| `rKpiShareBars` | function | 14008–14015 | 8 |
| `rKpiMetricCard` | function | 14016–14020 | 5 |
| `rKpiTextMetricCard` | function | 14021–14023 | 3 |
| `rKpiExtendedMetrics` | function | 14024–14038 | 15 |
| `kpiNiceMax` | function | 14039–14044 | 6 |
| `kpiTrendRows` | function | 14045–14053 | 9 |
| `rKpiTrendCompare` | function | 14054–14120 | 67 |
| `rKpiOpponentStrength` | function | 14121–14148 | 28 |
| `kpiBadge` | function | 14149–14151 | 3 |
| `rKpiObjectMini` | function | 14152–14158 | 7 |
| `rKpiInfoCards` | function | 14159–14190 | 32 |
| `buildComparisonSummary` | function | 14191–14222 | 32 |
| `rKPIVergleich` | function | 14223–14236 | 14 |
| `rComparisonMiniOverview` | function | 14237–14240 | 4 |
| `rComparisonRoles` | function | 14241–14248 | 8 |
| `rComparisonDashboard` | function | 14249–14259 | 11 |
| `rComparisonStyles` | function | 14260–14297 | 38 |
| `rComparisonCenterPage` | function | 14298–14348 | 51 |
| `rSeasonTrendRows` | function | 14349–14367 | 19 |
| `getAlltimeAggregatedStyleProfile` | function | 14368–14387 | 20 |
| `rGlobalDnaBars` | function | 14389–14418 | 30 |
| `pdashNum` | function | 14419–14422 | 4 |
| `pdashPct` | function | 14423–14426 | 4 |
| `pdashPhaseLabel` | function | 14427–14430 | 4 |
| `pdashTopCount` | function | 14431–14434 | 4 |
| `pdashBestPhase` | function | 14435–14438 | 4 |
| `pdashTopPartner` | function | 14439–14442 | 4 |
| `pdashTopOpponent` | function | 14443–14446 | 4 |
| `pdashOpponentTier` | function | 14447–14452 | 6 |
| `pdashOpponentStrength` | function | 14453–14472 | 20 |
| `pdashInsight` | function | 14473–14475 | 3 |
| `pdashInsights` | function | 14476–14487 | 12 |
| `buildSeasonPlayerDashModel` | function | 14488–14524 | 37 |
| `buildAlltimePlayerDashModel` | function | 14525–14567 | 43 |
| `rPlayerDashStyles` | function | 14568–14579 | 12 |
| `rPdashLabel` | function | 14580–14582 | 3 |
| `rPdashStat` | function | 14583–14585 | 3 |
| `rPlayerDash` | function | 14586–14624 | 39 |
| `rSeasonPlayerDashboard` | function | 14625–14627 | 3 |
| `rAlltimePlayerDashboard` | function | 14628–14630 | 3 |
| `rGlobalPartnerOpponentPanel` | function | 14631–14644 | 14 |
| `rGlobalCareerHeader` | function | 14645–14665 | 21 |
| `rSeasonLandingPage` | function | 14667–14681 | 15 |
| `rGlobalOverview` | function | 14683–14734 | 52 |
| `rGlobalAllTimeStats` | function | 14736–14752 | 17 |
| `rGlobalDevelopment` | function | 14754–14792 | 39 |
| `getGlobalPlayerOpponentGameRows` | function | 14795–14822 | 28 |
| `getGlobalOpponentSpecialistProfile` | function | 14824–14852 | 29 |
| `rGlobalDuoNetwork` | function | 14854–15051 | 198 |
| `rGlobalOpponentSpecialist` | function | 15053–15098 | 46 |
| `playerExplainConfidence` | function | 15100–15105 | 6 |
| `playerExplainConfidenceLabel` | function | 15106–15108 | 3 |
| `playerExplainAdd` | function | 15109–15113 | 5 |
| `playerExplainStyleSignature` | function | 15114–15125 | 12 |
| `playerExplainRolePhrase` | function | 15126–15134 | 9 |
| `playerExplainHeadline` | function | 15135–15144 | 10 |
| `playerExplainContextSentence` | function | 15145–15163 | 19 |
| `buildFieldPlayerExplanation` | function | 15164–15238 | 75 |
| `buildGoaliePlayerExplanation` | function | 15239–15292 | 54 |
| `buildPlayerExplanation` | function | 15293–15301 | 9 |
| `buildPlayerIntelligence` | function | 15302–15331 | 30 |
| `rPlayerExplainItems` | function | 15332–15336 | 5 |
| `rPlayerExplanation` | function | 15337–15388 | 52 |
| `rAllTimePlayersPage` | function | 15390–15430 | 41 |
| `rHallOfFamePage` | function | 15432–15520 | 89 |
| `lexiconUniqueKeys` | function | 15525–15532 | 8 |
| `lexiconEntry` | function | 15533–15542 | 10 |
| `rLexiconRows` | function | 15543–15546 | 4 |
| `rLexiconPage` | function | 15547–15719 | 173 |
| `matchcenterClamp` | function | 15721–15725 | 5 |
| `matchcenterNum` | function | 15726–15729 | 4 |
| `clampScore` | function | 15730–15733 | 4 |
| `getScoreLabel` | function | 15734–15742 | 9 |
| `buildConfidence` | function | 15743–15788 | 46 |
| `confidenceCautiousText` | function | 15789–15792 | 4 |
| `explainScore` | function | 15793–15807 | 15 |
| `p1NarrativeKey` | function | 15808–15810 | 3 |
| `scoreNarrative` | function | 15811–15829 | 19 |
| `rankNarratives` | function | 15830–15843 | 14 |
| `getEmptyState` | function | 15844–15855 | 12 |
| `rEmptyState` | function | 15856–15859 | 4 |
| `rScoreBreakdown` | function | 15860–15875 | 16 |
| `matchcenterFmt` | function | 15876–15880 | 5 |
| `matchcenterSigned` | function | 15881–15885 | 5 |
| `matchcenterDateValue` | function | 15886–15890 | 5 |
| `matchcenterDateLabel` | function | 15891–15895 | 5 |
| `matchcenterSortGamesAsc` | function | 15896–15900 | 5 |
| `matchcenterSeasonKeys` | function | 15901–15904 | 4 |
| `matchcenterSeasonLabel` | function | 15905–15907 | 3 |
| `matchcenterSeasonIsUlmTuebingenSgEra` | function | 15908–15911 | 4 |
| `teamAliasSeasonMatches` | function | 15920–15925 | 6 |
| `normalizeTeamKey` | function | 15926–15928 | 3 |
| `teamAliasRuleMatches` | function | 15929–15933 | 5 |
| `isOwnTeam` | function | 15934–15944 | 11 |
| `getCanonicalTeamName` | function | 15945–15950 | 6 |
| `getOpponentAliasKeys` | function | 15951–15971 | 21 |
| `dedupeGamesById` | function | 15972–15980 | 9 |
| `matchcenterIsFreiburgTuebingenTeamName` | function | 15981–15987 | 7 |
| `matchcenterIsUlmTeamName` | function | 15988–15990 | 3 |
| `normalizeTeamNameForMatchcenter` | function | 15991–15995 | 5 |
| `matchcenterDetectUlmSide` | function | 15996–16002 | 7 |
| `matchcenterSeasonHasGames` | function | 16003–16005 | 3 |
| `matchcenterDefaultSeasonKey` | function | 16006–16011 | 6 |
| `matchcenterTeamDisplay` | function | 16012–16014 | 3 |
| `matchcenterTeamKey` | function | 16015–16019 | 5 |
| `matchcenterAliasModeForContext` | function | 16020–16022 | 3 |
| `getOpponentAliasKeysForMatchcenter` | function | 16023–16048 | 26 |
| `matchcenterGameTeamName` | function | 16049–16051 | 3 |
| `matchcenterGameSideForTeam` | function | 16052–16059 | 8 |
| `matchcenterGameSideForOpponentKey` | function | 16060–16070 | 11 |
| `matchcenterGameScore` | function | 16071–16074 | 4 |
| `matchcenterOutcomeForTeam` | function | 16075–16083 | 9 |
| `matchcenterAllGamesForSeason` | function | 16084–16103 | 20 |
| `matchcenterAllGames` | function | 16104–16106 | 3 |
| `matchcenterOpponentMode` | function | 16107–16109 | 3 |
| `getMatchcenterOpponents` | function | 16110–16142 | 33 |
| `getMatchcenterDirectOpponents` | function | 16143–16173 | 31 |
| `matchcenterDirectGames` | function | 16174–16187 | 14 |
| `matchcenterContextGames` | function | 16188–16193 | 6 |
| `matchcenterAnalyzeDirect` | function | 16194–16230 | 37 |
| `matchcenterAnalyzeForm` | function | 16231–16256 | 26 |
| `matchcenterGameKey` | function | 16257–16259 | 3 |
| `matchcenterScoutingGames` | function | 16260–16274 | 15 |
| `matchcenterRosterPlayers` | function | 16275–16278 | 4 |
| `matchcenterPlayerDisplayName` | function | 16279–16284 | 6 |
| `matchcenterFindRosterPlayer` | function | 16285–16289 | 5 |
| `matchcenterPlayerKey` | function | 16290–16295 | 6 |
| `matchcenterEventNumber` | function | 16296–16300 | 5 |
| `matchcenterPenaltyMinutes` | function | 16301–16310 | 10 |
| `matchcenterGoalMinute` | function | 16311–16316 | 6 |
| `matchcenterIsLateGoalEvent` | function | 16317–16321 | 5 |
| `matchcenterIsClutchGoalEvent` | function | 16322–16332 | 11 |
| `matchcenterEnsureOpponentPlayer` | function | 16333–16356 | 24 |
| `matchcenterRegisterPlayerGame` | function | 16357–16359 | 3 |
| `matchcenterAddScoring` | function | 16360–16376 | 17 |
| `matchcenterFinalizeOpponentPlayerProfiles` | function | 16377–16423 | 47 |
| `matchcenterBuildOpponentScouting` | function | 16424–16495 | 72 |
| `matchcenterBuildOpponentPlayerInsights` | function | 16496–16509 | 14 |
| `matchcenterEmptyBuckets` | function | 16510–16512 | 3 |
| `matchcenterUlmScoutingConfidence` | function | 16513–16517 | 5 |
| `matchcenterEnsureUlmPlayer` | function | 16518–16555 | 38 |
| `matchcenterRegisterUlmProfileGame` | function | 16556–16561 | 6 |
| `matchcenterUpdateUlmSeasonRow` | function | 16562–16568 | 7 |
| `matchcenterClassifyUlmGoalEvent` | function | 16569–16579 | 11 |
| `matchcenterAddUlmScoring` | function | 16580–16617 | 38 |
| `matchcenterFinalizeUlmPlayers` | function | 16618–16686 | 69 |
| `matchcenterBuildUlmPlayerScouting` | function | 16687–16741 | 55 |
| `matchcenterBuildUlmPlayerInsights` | function | 16742–16754 | 13 |
| `matchcenterDuoPairKey` | function | 16755–16758 | 4 |
| `matchcenterEnsureOpponentDuo` | function | 16759–16791 | 33 |
| `matchcenterDuoDirectionLabel` | function | 16792–16798 | 7 |
| `matchcenterAddDuoConnection` | function | 16799–16817 | 19 |
| `matchcenterFinalizeOpponentDuos` | function | 16818–16852 | 35 |
| `matchcenterBuildOpponentDuos` | function | 16853–16897 | 45 |
| `matchcenterBuildOpponentDuoInsights` | function | 16898–16911 | 14 |
| `matchcenterEnsureUlmDuo` | function | 16912–16949 | 38 |
| `matchcenterAddUlmDuoConnection` | function | 16950–16968 | 19 |
| `matchcenterFinalizeUlmDuos` | function | 16969–17004 | 36 |
| `matchcenterBuildUlmDuos` | function | 17005–17047 | 43 |
| `matchcenterBuildUlmDuoInsights` | function | 17048–17060 | 13 |
| `matchcenterDirectContextGames` | function | 17061–17063 | 3 |
| `matchcenterSpecialTeamsForGame` | function | 17064–17067 | 4 |
| `matchcenterPersonalPenaltyMinutesForSide` | function | 17068–17076 | 9 |
| `matchcenterPct` | function | 17077–17080 | 4 |
| `matchcenterBuildSpecialTeamsMatchup` | function | 17081–17128 | 48 |
| `matchcenterGoalieKey` | function | 17129–17133 | 5 |
| `matchcenterGoalieFitScore` | function | 17134–17150 | 17 |
| `matchcenterBuildGoalieMatchup` | function | 17151–17193 | 43 |
| `matchcenterGoalAbsSeconds` | function | 17194–17201 | 8 |
| `matchcenterTimeValue` | function | 17202–17209 | 8 |
| `matchcenterEmptyTimingStats` | function | 17210–17218 | 9 |
| `matchcenterWindowForSecond` | function | 17219–17225 | 7 |
| `matchcenterTimingStatsForGames` | function | 17226–17262 | 37 |
| `matchcenterBuildTimingInsights` | function | 17263–17273 | 11 |
| `matchcenterBuildTimingAnalysis` | function | 17274–17284 | 11 |
| `rMatchcenterTimeBars` | function | 17285–17298 | 14 |
| `rMatchcenterTimingStatsCard` | function | 17299–17318 | 20 |
| `rMatchcenterTiming` | function | 17319–17342 | 24 |
| `rMatchcenterTabs` | function | 17358–17360 | 3 |
| `rMatchcenterProfileSection` | function | 17361–17380 | 20 |
| `rMatchcenterFormSection` | function | 17381–17406 | 26 |
| `rMatchcenterDetailsSection` | function | 17407–17414 | 8 |
| `matchcenterResultClass` | function | 17415–17417 | 3 |
| `matchcenterResultLetter` | function | 17418–17420 | 3 |
| `matchcenterUlmTeamLabelForGame` | function | 17421–17425 | 5 |
| `matchcenterGameLine` | function | 17426–17431 | 6 |
| `matchcenterFormLine` | function | 17432–17436 | 5 |
| `matchcenterBuildInsights` | function | 17437–17457 | 21 |
| `rMatchcenterKpi` | function | 17458–17464 | 7 |
| `rMatchcenterFormCard` | function | 17465–17485 | 21 |
| `rMatchcenterGamesList` | function | 17486–17497 | 12 |
| `rMatchcenterWatchCard` | function | 17498–17518 | 21 |
| `rMatchcenterPlayerRow` | function | 17519–17542 | 24 |
| `rMatchcenterRankCard` | function | 17543–17548 | 6 |
| `rMatchcenterUlmImpactCard` | function | 17549–17577 | 29 |
| `rMatchcenterUlmPlayerRow` | function | 17578–17601 | 24 |
| `rMatchcenterUlmRankCard` | function | 17602–17607 | 6 |
| `rMatchcenterUlmScouting` | function | 17608–17644 | 37 |
| `rMatchcenterOpponentScouting` | function | 17645–17680 | 36 |
| `rMatchcenterPlayersTab` | function | 17681–17683 | 3 |
| `rMatchcenterDuoWatchCard` | function | 17684–17703 | 20 |
| `rMatchcenterDuoRow` | function | 17704–17727 | 24 |
| `rMatchcenterDuoRankCard` | function | 17728–17733 | 6 |
| `rMatchcenterUlmDuoWatchCard` | function | 17734–17759 | 26 |
| `rMatchcenterUlmDuoRow` | function | 17760–17782 | 23 |
| `rMatchcenterUlmDuoRankCard` | function | 17783–17788 | 6 |
| `rMatchcenterUlmDuos` | function | 17789–17831 | 43 |
| `rMatchcenterOpponentDuos` | function | 17832–17874 | 43 |
| `rMatchcenterDuosTab` | function | 17875–17877 | 3 |
| `rMatchcenterSpecialCard` | function | 17878–17886 | 9 |
| `rMatchcenterSpecialTeams` | function | 17887–17936 | 50 |
| `rMatchcenterGoalieCard` | function | 17937–17960 | 24 |
| `rMatchcenterGoalieMatchup` | function | 17961–17989 | 29 |
| `matchcenterPlanScoreText` | function | 17990–17993 | 4 |
| `matchcenterPlanRateText` | function | 17994–17998 | 5 |
| `matchcenterPriorityLabel` | function | 17999–18001 | 3 |
| `matchcenterConfidenceClass` | function | 18002–18007 | 6 |
| `matchcenterInferPriority` | function | 18008–18014 | 7 |
| `matchcenterAddPlanItem` | function | 18015–18020 | 6 |
| `matchcenterAddPlanWatch` | function | 18021–18026 | 6 |
| `matchcenterBuildPlanConfidence` | function | 18027–18061 | 35 |
| `matchcenterIntelCurve` | function | 18062–18067 | 6 |
| `matchcenterIntelInverseCurve` | function | 18068–18071 | 4 |
| `matchcenterIntelWeighted` | function | 18072–18082 | 11 |
| `matchcenterIntelRate` | function | 18083–18086 | 4 |
| `matchcenterIntelPct` | function | 18087–18090 | 4 |
| `matchcenterIntelPriorityFromScore` | function | 18091–18096 | 6 |
| `matchcenterIntelPriorityClass` | function | 18097–18102 | 6 |
| `matchcenterIntelPriorityLabel` | function | 18103–18106 | 4 |
| `matchcenterIntelDataLabel` | function | 18107–18109 | 3 |
| `matchcenterBuildIntelligenceDataQuality` | function | 18110–18160 | 51 |
| `matchcenterBuildOpponentDNA` | function | 18161–18273 | 113 |
| `matchcenterDeriveOpponentType` | function | 18274–18291 | 18 |
| `matchcenterIntelPlayerRef` | function | 18292–18304 | 13 |
| `matchcenterIntelDuoRef` | function | 18305–18318 | 14 |
| `matchcenterIntelAddAlarm` | function | 18319–18339 | 21 |
| `matchcenterBuildOpponentAlarm` | function | 18340–18449 | 110 |
| `matchcenterBuildIntelListFromPlan` | function | 18450–18458 | 9 |
| `matchcenterBuildCoachHints` | function | 18459–18474 | 16 |
| `matchcenterBuildIntelHeadline` | function | 18475–18482 | 8 |
| `matchcenterBuildOneThingToWatch` | function | 18483–18495 | 13 |
| `matchcenterBuildIntelligenceSignals` | function | 18496–18542 | 47 |
| `buildMatchIntelligenceFromContext` | function | 18543–18597 | 55 |
| `buildMatchIntelligence` | function | 18598–18619 | 22 |
| `matchcenterCoachCautious` | function | 18620–18622 | 3 |
| `matchcenterCoachAdd` | function | 18623–18631 | 9 |
| `matchcenterCoachGameModel` | function | 18632–18645 | 14 |
| `buildMatchStories` | function | 18646–18675 | 30 |
| `matchcenterCoachPriorityFromAlarm` | function | 18676–18685 | 10 |
| `matchcenterBuildCoachPriorities` | function | 18686–18692 | 7 |
| `matchcenterBuildCoachLevers` | function | 18693–18702 | 10 |
| `matchcenterBuildCoachDangerPatterns` | function | 18703–18710 | 8 |
| `matchcenterBuildCoachIfThen` | function | 18711–18720 | 10 |
| `matchcenterBuildCoachAvoidList` | function | 18721–18730 | 10 |
| `matchcenterBuildCoachActivationHints` | function | 18731–18737 | 7 |
| `matchcenterBuildCoachKeyActors` | function | 18738–18745 | 8 |
| `buildDigitalCoachReport` | function | 18746–18778 | 33 |
| `buildLockerRoomSheet` | function | 18779–18799 | 21 |
| `matchcenterSocialAdd` | function | 18800–18806 | 7 |
| `matchcenterSocialCaption` | function | 18807–18812 | 6 |
| `socialSentence` | function | 18813–18815 | 3 |
| `socialEnsurePeriod` | function | 18816–18819 | 4 |
| `socialFirstUseful` | function | 18820–18822 | 3 |
| `socialPlayerFocusLine` | function | 18823–18829 | 7 |
| `socialDuoFocusLine` | function | 18830–18835 | 6 |
| `socialOpponentLine` | function | 18836–18839 | 4 |
| `socialKeyFactLine` | function | 18840–18849 | 10 |
| `buildMatchdayCaptionBlocks` | function | 18850–18879 | 30 |
| `buildSocialMediaContent` | function | 18880–18928 | 49 |
| `isSyntheticLineupPlayerId` | function | 18934–18936 | 3 |
| `getSyntheticLineupPlayers` | function | 18937–18939 | 3 |
| `getSyntheticLineupRow` | function | 18940–18956 | 17 |
| `getSyntheticLineupRows` | function | 18957–18959 | 3 |
| `getLineupAllRows` | function | 18960–18962 | 3 |
| `lineupRowMeta` | function | 18963–18970 | 8 |
| `getLineupPlayerPool` | function | 18971–18979 | 9 |
| `lineupScore` | function | 18980–18985 | 6 |
| `lineupAverage` | function | 18986–18989 | 4 |
| `lineupLevelLabel` | function | 18990–18993 | 4 |
| `lineupRosterGamesForPlayer` | function | 18996–19043 | 48 |
| `buildLineupExperienceProfile` | function | 19044–19086 | 43 |
| `lineupOpponentDNAForContext` | function | 19087–19098 | 12 |
| `buildLineupOpponentDNAFit` | function | 19099–19142 | 44 |
| `classifyLineIdentity` | function | 19143–19190 | 48 |
| `lineupPlayerProfile` | function | 19191–19266 | 76 |
| `buildLineupAnalysis` | function | 19267–19400 | 134 |
| `buildLineupScoreBreakdowns` | function | 19401–19430 | 30 |
| `buildLineupIntelligence` | function | 19431–19441 | 11 |
| `buildLineAnalysis` | function | 19442–19444 | 3 |
| `lineupRowMap` | function | 19445–19447 | 3 |
| `lineupRankCandidateIds` | function | 19448–19462 | 15 |
| `lineupCombinationIds` | function | 19463–19476 | 14 |
| `lineupStdDev` | function | 19477–19482 | 6 |
| `lineupRoleDnaComplementScore` | function | 19483–19506 | 24 |
| `lineupDirectChemistryScore` | function | 19507–19513 | 7 |
| `lineupEvaluateComplementCandidate` | function | 19514–19591 | 78 |
| `lineupPlayerAnchorScore` | function | 19592–19609 | 18 |
| `buildTeamLineBalance` | function | 19610–19653 | 44 |
| `buildBalancedLineupSet` | function | 19654–19678 | 25 |
| `lineupRecommendationReason` | function | 19679–19687 | 9 |
| `buildLineupRecommendations` | function | 19688–19766 | 79 |
| `recommendLineComplements` | function | 19767–19794 | 28 |
| `matchcenterBuildMatchPlan` | function | 19795–19940 | 146 |
| `rMatchcenterPlanItems` | function | 19941–19958 | 18 |
| `rMatchcenterPlanWatch` | function | 19959–19974 | 16 |
| `rMatchcenterOpponentDNA` | function | 19975–20007 | 33 |
| `rMatchcenterOpponentAlarm` | function | 20008–20029 | 22 |
| `rMatchcenterIntelOverview` | function | 20030–20075 | 46 |
| `rMatchcenterIntelCoachHints` | function | 20076–20089 | 14 |
| `rMatchcenterCoachCardList` | function | 20090–20103 | 14 |
| `rMatchcenterCoachIfThen` | function | 20104–20111 | 8 |
| `rMatchcenterCoachSimpleList` | function | 20112–20116 | 5 |
| `rMatchcenterDigitalCoach` | function | 20117–20181 | 65 |
| `rMatchcenterCopyButton` | function | 20182–20186 | 5 |
| `rMatchcenterLockerList` | function | 20187–20198 | 12 |
| `rMatchcenterLockerRoomSheet` | function | 20199–20254 | 56 |
| `rMatchcenterSocialBlock` | function | 20255–20262 | 8 |
| `matchcenterStoryDownloadFileName` | function | 20263–20272 | 10 |
| `downloadMatchdayStory` | window | 20273–20320 | 48 |
| `rSocialVideoBlock` | function | 20324–20349 | 26 |
| `generateSocialVideoStandbilder` | window | 20350–20373 | 24 |
| `rMatchcenterSocialMediaCenter` | function | 20374–20427 | 54 |
| `rLineupScoreRows` | function | 20428–20449 | 22 |
| `rLineupSimpleCards` | function | 20450–20458 | 9 |
| `rMatchcenterLineupBuilder` | function | 20459–20531 | 73 |
| `rLineupMetricPills` | function | 20532–20545 | 14 |
| `rLineupBuilderAvailablePanel` | function | 20546–20593 | 48 |
| `rLineupRecommendationCards` | function | 20594–20608 | 15 |
| `rLineupRecommendationMode` | function | 20609–20642 | 34 |
| `rLineupComplementCards` | function | 20643–20655 | 13 |
| `rLineupTestLine` | function | 20656–20704 | 49 |
| `rLineupTestMode` | function | 20705–20721 | 17 |
| `rLineupBuilderPage` | function | 20722–20755 | 34 |
| `rMatchcenterScoutingSummary` | function | 20756–20799 | 44 |
| `rMatchcenterMatchPlan` | function | 20800–20820 | 21 |
| `matchcenterStoryInitials` | function | 20822–20827 | 6 |
| `matchcenterStoryLogoBase` | function | 20828–20833 | 6 |
| `matchcenterStorySafeLogoUrl` | function | 20834–20840 | 7 |
| `matchcenterStoryTeamAssetKey` | function | 20848–20852 | 5 |
| `getTeamLogoUrlForStory` | function | 20853–20882 | 30 |
| `matchcenterStoryLogoForOpponent` | function | 20883–20897 | 15 |
| `matchcenterStoryTableRank` | function | 20898–20908 | 11 |
| `matchcenterStoryUlmTableRank` | function | 20909–20915 | 7 |
| `matchcenterStoryRankText` | function | 20916–20919 | 4 |
| `matchcenterStoryInlineStat` | function | 20920–20922 | 3 |
| `matchcenterStoryShortTeamLabel` | function | 20923–20946 | 24 |
| `matchcenterStoryRankRows` | function | 20947–20958 | 12 |
| `matchcenterStoryFormLetters` | function | 20959–20961 | 3 |
| `matchcenterStoryPlayer` | function | 20962–20994 | 33 |
| `matchcenterStoryAddFact` | function | 20995–21001 | 7 |
| `matchcenterStoryFactKey` | function | 21002–21004 | 3 |
| `matchcenterStoryLooksArtificial` | function | 21005–21007 | 3 |
| `matchcenterStoryEstimateFactWeight` | function | 21008–21013 | 6 |
| `matchcenterStoryAddCandidate` | function | 21014–21036 | 23 |
| `matchcenterStoryCategoryLimit` | function | 21037–21040 | 4 |
| `matchcenterStoryNormalizePickOptions` | function | 21041–21051 | 11 |
| `matchcenterStoryCandidateForBudget` | function | 21052–21061 | 10 |
| `matchcenterStoryPickFactItems` | function | 21062–21114 | 53 |
| `matchcenterStoryPickFacts` | function | 21115–21117 | 3 |
| `matchcenterStoryFormRecord` | function | 21118–21123 | 6 |
| `matchcenterStoryCurrentStreak` | function | 21124–21132 | 9 |
| `matchcenterStoryWinlessStreak` | function | 21133–21141 | 9 |
| `matchcenterStoryFormFact` | function | 21142–21152 | 11 |
| `matchcenterStoryFormFactCandidates` | function | 21153–21172 | 20 |
| `matchcenterStoryLateGoalsForOutcome` | function | 21173–21176 | 4 |
| `matchcenterStoryClutchFact` | function | 21177–21191 | 15 |
| `matchcenterStoryPlayerClutchTotal` | function | 21192–21199 | 8 |
| `matchcenterStoryBestClutchPlayer` | function | 21200–21209 | 10 |
| `matchcenterStoryPlayerClutchFact` | function | 21210–21235 | 26 |
| `matchcenterStoryDuoClutchTotal` | function | 21236–21243 | 8 |
| `matchcenterStoryBestClutchDuo` | function | 21244–21253 | 10 |
| `matchcenterStoryDuoClutchFact` | function | 21254–21256 | 3 |
| `matchcenterStoryDuoFact` | function | 21257–21277 | 21 |
| `matchcenterStoryClutchPriority` | function | 21278–21280 | 3 |
| `matchcenterStoryCompetitionLabel` | function | 21281–21284 | 4 |
| `matchcenterStoryShortDuel` | function | 21285–21289 | 5 |
| `matchcenterStoryLastDuelLabel` | function | 21290–21293 | 4 |
| `matchcenterStoryDirectFactCandidates` | function | 21294–21315 | 22 |
| `matchcenterStoryPlanFactCandidates` | function | 21316–21328 | 13 |
| `matchcenterStoryCategoryForPlanFact` | function | 21329–21337 | 9 |
| `buildMatchcenterStoryPreviewData` | function | 21338–21449 | 112 |
| `matchcenterStoryNameClass` | function | 21450–21455 | 6 |
| `matchcenterStoryVisibleFacts` | function | 21456–21486 | 31 |
| `rMatchcenterStoryLogo` | function | 21487–21491 | 5 |
| `rMatchcenterStoryForm` | function | 21492–21496 | 5 |
| `rMatchcenterStoryPlayerCard` | function | 21497–21504 | 8 |
| `rMatchcenterStoryPreview` | function | 21505–21574 | 70 |
| `rMatchcenterStoryFrame` | function | 21575–21580 | 6 |
| `fitMatchcenterStoryLayout` | function | 21581–21623 | 43 |
| `socialVideoDistributeSceneDurations` | function | 21673–21704 | 32 |
| `socialVideoFitText` | function | 21710–21719 | 10 |
| `socialVideoCheckFonts` | function | 21725–21735 | 11 |
| `probeSocialVideoExportCapability` | function | 21744–21759 | 16 |
| `ensureSocialVideoExportCapabilityChecked` | function | 21765–21769 | 5 |
| `socialVideoUlmGamesForMatchday` | function | 21774–21779 | 6 |
| `socialVideoTableRank` | function | 21781–21785 | 5 |
| `socialVideoFormAsOf` | function | 21789–21794 | 6 |
| `socialVideoLastDuelAsOf` | function | 21798–21804 | 7 |
| `socialVideoTopScorerAsOf` | function | 21810–21839 | 30 |
| `socialVideoOpponentSceneData` | function | 21842–21889 | 48 |
| `socialVideoFileName` | function | 21893–21899 | 7 |
| `socialVideoMatchdayLabel` | function | 21901–21903 | 3 |
| `socialVideoBuildStorySpec` | function | 21906–21957 | 52 |
| `socialVideoBuildFeedSpec` | function | 21960–22009 | 50 |
| `buildSocialVideoSpec` | function | 22019–22034 | 16 |
| `socialVideoStoryFrameData` | function | 22048–22081 | 34 |
| `rSocialVideoFeedFrame` | function | 22085–22121 | 37 |
| `socialVideoStandbildFrame` | function | 22124–22127 | 4 |
| `socialVideoXmlSafeHtml` | function | 22136–22138 | 3 |
| `downloadSocialVideoStandbild` | window | 22144–22194 | 51 |
| `rMatchcenterPage` | function | 22196–22343 | 148 |
| `rTeamPage` | function | 22344–22654 | 311 |
| `exportExcel` | function | 22659–22680 | 22 |
| `render` | function | 22686–22703 | 18 |
| `_render` | function | 22704–22868 | 165 |
| `uiFormatNumber` | function | 22902–22906 | 5 |
| `uiReliabilityDots` | function | 22915–22922 | 8 |
| `uiDeltaIndicator` | function | 22930–22936 | 7 |
| `uiInfoIcon` | function | 22948–22952 | 5 |
| `uiKennzahlKachel` | function | 22960–22971 | 12 |
| `uiKernaussage` | function | 22980–22986 | 7 |
| `uiHinweisKarte` | function | 22994–23006 | 13 |
| `uiRangliste` | function | 23016–23033 | 18 |
| `uiVerlauf` | function | 23044–23063 | 20 |
| `uiIntervallBalken` | function | 23070–23082 | 13 |
| `uiMethodenbox` | function | 23089–23098 | 10 |
| `uiNotiz` | function | 23106–23110 | 5 |
| `uiPlatzhalter` | function | 23118–23123 | 6 |
| `uiObjektseiteSortTabs` | function | 23168–23176 | 9 |
| `uiObjektseite` | function | 23186–23219 | 34 |
| `mainNavActiveKeyForPage` | function | 23276–23281 | 6 |
| `goToMainNavPoint` | window | 23282–23288 | 7 |
| `rMainNav` | function | 23289–23293 | 5 |
| `rMainNavBottom` | function | 23311–23318 | 8 |
| `openOverview` | window | 23328–23336 | 9 |
| `switchOverviewSeason` | window | 23345–23351 | 7 |
| `openMatchdayTimeline` | window | 23379–23386 | 8 |
| `openMatchday` | window | 23387–23396 | 10 |
| `switchMatchdaySeason` | window | 23398–23403 | 6 |
| `matchdayUlmGames` | function | 23405–23407 | 3 |
| `matchdayGameCardHtml` | function | 23408–23418 | 11 |
| `rMatchdayTimelineRow` | function | 23420–23427 | 8 |
| `rMatchdayTimelinePage` | function | 23428–23438 | 11 |
| `rMatchdayDetailPage` | function | 23439–23474 | 36 |
| `rMatchdayPage` | function | 23475–23481 | 7 |
| `overviewMatchdayStartMs` | function | 23500–23505 | 6 |
| `overviewMatchdayEndMs` | function | 23506–23511 | 6 |
| `detectOverviewPhase` | function | 23512–23537 | 26 |
| `getSeasonDataState` | function | 23544–23554 | 11 |
| `parseSeasonDataState` | function | 23555–23563 | 9 |
| `isNewSeasonDataState` | function | 23565–23567 | 3 |
| `recordOverviewVisit` | function | 23574–23583 | 10 |
| `overviewOpponentLabel` | function | 23584–23588 | 5 |
| `overviewLastMatchdayText` | function | 23589–23592 | 4 |
| `overviewNextMatchdayHtml` | function | 23593–23597 | 5 |
| `overviewCompactTableHtml` | function | 23605–23611 | 7 |
| `overviewFormHtml` | function | 23613–23627 | 15 |
| `overviewSeasonBilanzHtml` | function | 23628–23634 | 7 |
| `overviewSeasonAwardHtml` | function | 23636–23645 | 10 |
| `overviewRecordHtml` | function | 23647–23652 | 6 |
| `overviewCrossSeasonTrendHtml` | function | 23654–23662 | 9 |
| `overviewOpponentPreviewHtml` | function | 23663–23667 | 5 |
| `overviewMatchcenterLinkHtml` | function | 23668–23670 | 3 |
| `overviewLineupLinkHtml` | function | 23671–23673 | 3 |
| `overviewRankChangeTile` | function | 23690–23707 | 18 |
| `buildOverviewCards` | function | 23716–23756 | 41 |
| `rOverviewPage` | function | 23766–23777 | 12 |
| `openLigaGegner` | window | 23778–23781 | 4 |
| `rLigaGegnerPlaceholderPage` | function | 23782–23787 | 6 |
| `rAsOfSelector` | function | 23799–23811 | 13 |
| `setContextAsOf` | window | 23812–23823 | 12 |
| `rSeasonDataPreviewContextHint` | function | 23834–23842 | 9 |
| `rSeasonDataStateContextHint` | function | 23851–23857 | 7 |
| `rContextBar` | function | 23882–23900 | 19 |
| `rIaShell` | function | 23902–23904 | 3 |
| `globalSearchTokens` | function | 23921–23924 | 4 |
| `globalSearchEntries` | function | 23926–23939 | 14 |
| `globalSearchPlayerScore` | function | 23940–23947 | 8 |
| `globalSearchMatchdayScore` | function | 23949–23961 | 13 |
| `globalSearchMatch` | function | 23963–23974 | 12 |
| `globalSearchIsEditableTarget` | function | 23975–23979 | 5 |
| `globalSearchKeyAction` | function | 23981–23995 | 15 |
| `rGlobalSearchToggle` | function | 23996–23998 | 3 |
| `rGlobalSearchResultsHtml` | function | 23999–24009 | 11 |
| `rGlobalSearchPanelHtml` | function | 24010–24012 | 3 |
| `paintGlobalSearchResults` | function | 24013–24020 | 8 |
| `openGlobalSearch` | window | 24021–24045 | 25 |
| `closeGlobalSearch` | window | 24046–24053 | 8 |
| `onGlobalSearchInput` | window | 24054–24059 | 6 |
| `moveGlobalSearch` | function | 24060–24065 | 6 |
| `activateGlobalSearchResult` | window | 24066–24075 | 10 |
| `globalSearchOnKeydown` | function | 24076–24097 | 22 |
| `initGlobalSearch` | function | 24098–24102 | 5 |
| `rToolMenu` | function | 24124–24127 | 4 |
| `toolMenuElements` | function | 24128–24130 | 3 |
| `toolMenuItemElements` | function | 24131–24133 | 3 |
| `isToolMenuOpen` | function | 24134–24137 | 4 |
| `openToolMenu` | window | 24138–24145 | 8 |
| `closeToolMenu` | window | 24146–24152 | 7 |
| `toggleToolMenu` | window | 24153–24156 | 4 |
| `activateToolMenuItem` | window | 24157–24164 | 8 |
| `toolMenuOnKeydown` | function | 24165–24188 | 24 |
| `toolMenuOnClick` | function | 24189–24195 | 7 |
| `initToolMenu` | function | 24196–24199 | 4 |

## Alphabetisches Register

| Name | Art | Zeile |
|---|---|---|
| `_render` | function | 22704 |
| `acceptEinsatzCenterRosterSuggestion` | window | 7959 |
| `activateGlobalSearchResult` | window | 24066 |
| `activateToolMenuItem` | window | 24157 |
| `addComparisonDuo` | window | 13472 |
| `addComparisonDuoFromSelection` | window | 13464 |
| `addComparisonItem` | window | 13372 |
| `addDuoTeamGame` | function | 11484 |
| `addEinsatzCenterExistingGroup` | window | 7976 |
| `addEinsatzCenterGroupPlayer` | window | 8044 |
| `addEinsatzCenterNewGroup` | window | 7985 |
| `addEinsatzCenterRosterPlayer` | window | 7925 |
| `addGoalieGameToStats` | function | 4820 |
| `addGoalieSpecialTeamsGameToStats` | function | 4790 |
| `addLineupBuilderPlayerToActiveLine` | window | 2318 |
| `addLineupBuilderPlayerToLine` | window | 2308 |
| `addLineupPlayer` | window | 2254 |
| `addRosterImpactGameToStats` | function | 12001 |
| `addSelectedComparisonItem` | window | 13380 |
| `addSyntheticLineupPlayer` | window | 2334 |
| `addUnique` | function | 4007 |
| `aggregateAllTimeDuos` | function | 5163 |
| `aggregateAllTimePlayers` | function | 4274 |
| `aggregateAlltimeSpecialTeams` | function | 4770 |
| `aggregateGoalieAlltimeStats` | function | 5003 |
| `aggregateSeasonStats` | function | 5175 |
| `analysisCacheContext` | function | 2160 |
| `analysisCacheKey` | function | 2194 |
| `annotateSpecialTeamsGoalEvent` | function | 4552 |
| `antiSynergyDeltaClass` | function | 12168 |
| `antiSynergyImpactScore` | function | 12083 |
| `antiSynergyPartnerIsSgOnly` | function | 12198 |
| `antiSynergySigned` | function | 12172 |
| `appendSeasonGameDiagnostics` | function | 2671 |
| `applyAppHash` | function | 3774 |
| `applyCurrentSeasonCoverHighlight` | function | 6429 |
| `applyGlobalPageFromHash` | function | 3741 |
| `applySeasonContext` | function | 2423 |
| `applySeasonScoringToRegistry` | function | 4165 |
| `asOfCacheKeyPart` | function | 2188 |
| `asOfEquals` | function | 3445 |
| `assignStatus` | function | 6013 |
| `avgOrNull` | function | 4312 |
| `backToComparisonModeSelect` | window | 13400 |
| `backToHome` | window | 2371 |
| `buildAlltimePlayerDashModel` | function | 14525 |
| `buildAnnotatedGoalEventsForGame` | function | 11090 |
| `buildAppHash` | function | 3591 |
| `buildBalancedLineupSet` | function | 19654 |
| `buildBestThirdManOptions` | function | 10978 |
| `buildComparisonDataset` | function | 13841 |
| `buildComparisonExtraMetrics` | function | 13696 |
| `buildComparisonSummary` | function | 14191 |
| `buildConfidence` | function | 15743 |
| `buildDigitalCoachReport` | function | 18746 |
| `buildDirectDuoLookupForPlayer` | function | 10936 |
| `buildDryRunReport` | function | 6653 |
| `buildDuoAntiSynergy` | function | 12158 |
| `buildDuoComparison` | function | 13485 |
| `buildDuoCompatibility` | function | 11596 |
| `buildDuoDirectProduction` | function | 11460 |
| `buildDuoFloorCeiling` | function | 11371 |
| `buildDuoGapAnalysis` | function | 11579 |
| `buildDuoNetworkContext` | function | 11555 |
| `buildDuoOpponentAdjusted` | function | 11542 |
| `buildDuoProAnalysis` | function | 11653 |
| `buildDuoReplacementOptions` | function | 11643 |
| `buildDuoUntestedPotential` | function | 11619 |
| `buildDuoUsageRate` | function | 11631 |
| `buildDuoWarnings` | function | 11413 |
| `buildDuoWithWithoutImpact` | function | 11508 |
| `buildEinsatzCenterDraftExport` | function | 8105 |
| `buildFieldPlayerExplanation` | function | 15164 |
| `buildGlobalPageHash` | function | 3608 |
| `buildGoalieAnalysisModel` | function | 9897 |
| `buildGoalieComparisonDataset` | function | 13790 |
| `buildGoalieGameRecord` | function | 4872 |
| `buildGoaliePlayerExplanation` | function | 15239 |
| `buildGoalieRoleProfile` | function | 10120 |
| `buildGoalieStatsForSeason` | function | 4922 |
| `buildHallOfFameIntroTitle` | function | 8804 |
| `buildHashStringFromParsed` | function | 3623 |
| `buildIdentityProfiles` | function | 5735 |
| `buildLineAnalysis` | function | 19442 |
| `buildLineupAnalysis` | function | 19267 |
| `buildLineupExperienceProfile` | function | 19044 |
| `buildLineupIntelligence` | function | 19431 |
| `buildLineupOpponentDNAFit` | function | 19099 |
| `buildLineupRecommendations` | function | 19688 |
| `buildLineupScoreBreakdowns` | function | 19401 |
| `buildLockerRoomSheet` | function | 18779 |
| `buildMatchcenterStoryPreviewData` | function | 21338 |
| `buildMatchdayCaptionBlocks` | function | 18850 |
| `buildMatchdays` | function | 3326 |
| `buildMatchIntelligence` | function | 18598 |
| `buildMatchIntelligenceFromContext` | function | 18543 |
| `buildMatchStories` | function | 18646 |
| `buildMomentumSwingStats` | function | 11365 |
| `buildMomentumSwingStatsRaw` | function | 11294 |
| `buildOpponentIntelligence` | function | 10775 |
| `buildOverviewCards` | function | 23716 |
| `buildPlayerDataFoundation` | function | 5192 |
| `buildPlayerEvents` | function | 5246 |
| `buildPlayerExplanation` | function | 15293 |
| `buildPlayerIdentity` | function | 4018 |
| `buildPlayerIntelligence` | function | 15302 |
| `buildRecencyWeightedGlobalIdentityProfile` | function | 12698 |
| `buildRegistry` | function | 5215 |
| `buildResponseGoalStats` | function | 11282 |
| `buildResponseGoalStatsRaw` | function | 11233 |
| `buildRosterImpactAnalysis` | function | 12098 |
| `buildSeasonDataPreviewChanges` | function | 6758 |
| `buildSeasonDuos` | function | 5119 |
| `buildSeasonPlayerDashModel` | function | 14488 |
| `buildSocialMediaContent` | function | 18880 |
| `buildSocialVideoSpec` | function | 22019 |
| `buildSoloDuoProfile` | function | 5504 |
| `buildSpecialTeamsForGame` | function | 4567 |
| `buildSpecialTeamsForSeason` | function | 4761 |
| `buildStandings` | function | 3885 |
| `buildStaticSeasonDataBlock` | function | 6477 |
| `buildTeamLineBalance` | function | 19610 |
| `cachedAnalysis` | function | 2198 |
| `cancelDuoProPicker` | window | 11851 |
| `cancelEinsatzCenterEdit` | window | 7906 |
| `cancelHallOfFameIntro` | function | 8893 |
| `clampScore` | function | 15730 |
| `classicTagLabel` | function | 9047 |
| `classifyGameForStats` | function | 3167 |
| `classifyLineIdentity` | function | 19143 |
| `cleanText` | function | 2519 |
| `cleanupHallOfFameIntro` | function | 8833 |
| `clearAnalysisCache` | function | 2157 |
| `clearComparison` | window | 13391 |
| `clearComparisonDuos` | window | 13479 |
| `clearLineupAvailable` | window | 2307 |
| `clearLineupBuilderLine` | window | 2326 |
| `clearLineupPlayers` | window | 2261 |
| `clearlyAboveAverage` | function | 5692 |
| `clonePlain` | function | 4409 |
| `closeGlobalSearch` | window | 24046 |
| `closeMatchcenterStoryPreview` | window | 2226 |
| `closeToolMenu` | window | 24146 |
| `clutchText` | function | 5576 |
| `collectAssistEventRefs` | function | 2975 |
| `compareGamesChronologically` | function | 3305 |
| `comparisonDuoContext` | function | 13405 |
| `comparisonEventGameKey` | function | 13683 |
| `comparisonEventPhaseLabel` | function | 13686 |
| `comparisonFmt` | function | 13173 |
| `comparisonItemKey` | function | 13151 |
| `comparisonJsArg` | function | 13162 |
| `comparisonNum` | function | 13165 |
| `comparisonOpponentStrengthTier` | function | 13690 |
| `comparisonPct` | function | 13169 |
| `comparisonPctFmt` | function | 13177 |
| `comparisonVariantValue` | function | 13294 |
| `composeIdentityText` | function | 5967 |
| `computeCurrentAppHash` | function | 3643 |
| `computeEinsatzCenterStats` | function | 7119 |
| `computeMetrics` | function | 5350 |
| `computeRosterStatus` | function | 5993 |
| `confidenceCautiousText` | function | 15789 |
| `confirmDuoProSelection` | window | 11856 |
| `confirmEinsatzCenterCombo` | window | 8077 |
| `copyMatchcenterText` | window | 2228 |
| `countBy` | function | 10522 |
| `countCaptainAppearances` | function | 5975 |
| `countGoalieAppearances` | function | 5989 |
| `countMomentumClusters` | function | 5609 |
| `countPlayedUlmGames` | function | 2895 |
| `createPlayerAnalysisProfile` | function | 3944 |
| `createSeasonBucket` | function | 1782 |
| `decodeCp1252AsUtf8` | function | 2464 |
| `decodeHashSegmentSafe` | function | 3516 |
| `dedupeGamesById` | function | 15972 |
| `dedupeIdentityProfileTags` | function | 12775 |
| `deriveAsOfForSeason` | function | 3241 |
| `deriveLineupUlmPlayerIds` | function | 7616 |
| `deriveLineupValidPlayerIds` | function | 7592 |
| `derivePlayerStatus` | function | 4047 |
| `detectOverviewPhase` | function | 23512 |
| `detectSide` | const-arrow | 2604 |
| `detectTypes` | function | 5484 |
| `detectUlmSide` | function | 2597 |
| `diagnoseGameDuplicates` | function | 2649 |
| `diagnosticError` | function | 6228 |
| `diffGameIds` | function | 6600 |
| `difficultConnectionConfidence` | function | 10912 |
| `discardEinsatzCenterAutosave` | function | 7515 |
| `discardSeasonDataPreview` | function | 6857 |
| `dismissEinsatzCenterRosterSuggestion` | window | 7948 |
| `downloadMatchdayStory` | window | 20273 |
| `downloadSocialVideoStandbild` | window | 22144 |
| `duoProContextSeasonKey` | function | 11435 |
| `duoProDomId` | function | 11812 |
| `duoProPairKey` | function | 11432 |
| `duoProPickerMessage` | function | 11818 |
| `duoProPickerOpen` | function | 11815 |
| `duoProPlayer` | function | 11449 |
| `duoProResolveCandidate` | function | 11831 |
| `duoProSelectionPayload` | function | 11840 |
| `duoScopeSeasonKeys` | function | 10954 |
| `einsatzCenterAutosaveDraft` | function | 7431 |
| `einsatzCenterAutosaveInfoText` | function | 7537 |
| `einsatzCenterAutosaveKey` | function | 7342 |
| `einsatzCenterCanonicalJson` | function | 7675 |
| `einsatzCenterComputeBaseHash` | function | 7690 |
| `einsatzCenterCurrentRawBaseHash` | function | 7417 |
| `einsatzCenterDeserializeAutosave` | function | 7377 |
| `einsatzCenterDraftInView` | function | 7246 |
| `einsatzCenterDraftIsEmpty` | function | 7354 |
| `einsatzCenterDraftStaleHint` | function | 7260 |
| `einsatzCenterInspectAutosave` | function | 7466 |
| `einsatzCenterIsPlainObject` | function | 7371 |
| `einsatzCenterSerializeDraft` | function | 7358 |
| `einsatzCenterSha256Hex` | function | 7685 |
| `einsatzCenterSoftIssues` | function | 7699 |
| `einsatzCenterStorageRead` | function | 7343 |
| `einsatzCenterStorageRemove` | function | 7349 |
| `einsatzCenterStorageWrite` | function | 7346 |
| `emptyDuoTeamImpactStats` | function | 11481 |
| `emptyFieldRoleSeasonStats` | function | 4003 |
| `emptyGoalieAlltimeStats` | function | 3976 |
| `emptyGoalieSeasonStats` | function | 3954 |
| `emptyGoalieSpecialTeamsStats` | function | 3991 |
| `emptyPlayerSeasonStats` | function | 3948 |
| `emptyRosterImpactStats` | function | 11990 |
| `emptySpecialTeamsStats` | function | 4368 |
| `ensureAppLoaded` | function | 8747 |
| `ensureEinsatzCenterDraft` | function | 7282 |
| `ensureExternalSeasonData` | function | 6455 |
| `ensureFieldRoleSeasonStats` | function | 4113 |
| `ensureGlobalDataLoaded` | function | 8675 |
| `ensureGoalieSeasonStats` | function | 4108 |
| `ensureHallOfFameIntroOverlay` | function | 8771 |
| `ensureLineupDataLoaded` | function | 6965 |
| `ensureLineupGroupsRegistryLoaded` | function | 6990 |
| `ensureRmDuo` | function | 11213 |
| `ensureRmPlayer` | function | 11207 |
| `ensureSocialVideoExportCapabilityChecked` | function | 21765 |
| `escAttr` | function | 9020 |
| `escHtml` | function | 12794 |
| `eventMatchesTeams` | function | 5570 |
| `explainScore` | function | 15793 |
| `exportEinsatzCenterDraft` | window | 8119 |
| `exportExcel` | function | 22659 |
| `fallbackIdentityProfile` | function | 9055 |
| `fetchJson` | function | 6272 |
| `fetchJsonLegacy` | function | 6204 |
| `fetchJsonWithDiagnostics` | function | 6263 |
| `fetchSeasonGameRaw` | function | 6298 |
| `fetchTextWithDiagnostics` | function | 6233 |
| `fileNameForLineupSeasonKey` | function | 6947 |
| `filterComparisonDuoSuggestions` | window | 13437 |
| `filterComparisonPlayers` | window | 13348 |
| `filterLineupBuilderAvailable` | window | 2355 |
| `filterLineupPlayers` | window | 2262 |
| `filterPlayerSuggestions` | function | 13412 |
| `filterPureSGPlayers` | function | 9693 |
| `finalizeDuoTeamImpactStats` | function | 11500 |
| `finalizeGoalieSeasonStats` | function | 4805 |
| `finalizeMomentumStats` | function | 11288 |
| `finalizePlayerRegistrySeason` | function | 4188 |
| `finalizeResponseStats` | function | 11219 |
| `finalizeRosterImpactStats` | function | 11993 |
| `finalizeSpecialTeamsStats` | function | 4412 |
| `findDuplicateGameIds` | function | 6519 |
| `findLineupGameContext` | function | 7024 |
| `findLoadedSeasonPlayer` | function | 9656 |
| `finishHallOfFameIntro` | function | 8860 |
| `finiteNumbers` | function | 4309 |
| `fitMatchcenterStoryLayout` | function | 21581 |
| `fixKnownUiTransliterations` | function | 2514 |
| `fixMojibakeText` | function | 2522 |
| `formatDateDE` | function | 3399 |
| `formatDiagnosticAttempt` | function | 6279 |
| `formatGameLoadError` | function | 6292 |
| `formatStatus` | function | 6276 |
| `gameClassificationStatusLabel` | function | 2663 |
| `gameDaySortValue` | function | 4478 |
| `gameResult` | function | 3874 |
| `gameScore` | function | 3137 |
| `gameStableId` | function | 2646 |
| `gameStatusText` | function | 3130 |
| `generatePlayerInsights` | function | 9518 |
| `generateSocialVideoStandbilder` | window | 20350 |
| `getActiveAlltimeSeasonKeys` | function | 10694 |
| `getActiveSeasonKey` | function | 2383 |
| `getAllLoadedSeasonGames` | function | 10887 |
| `getAlltimeAggregatedStyleProfile` | function | 14368 |
| `getAllTimeCoverStats` | function | 8626 |
| `getAllTimeDuoRows` | function | 10842 |
| `getAllTimeDuoRowsForPlayer` | function | 10580 |
| `getAllTimeGamesPlayedRows` | function | 10620 |
| `getAllTimeIdentityStandings` | function | 12662 |
| `getAllTimeMainPlayerRows` | function | 9697 |
| `getAllTimeOpponentIntelligence` | function | 12583 |
| `getAllTimeOpponentNames` | function | 2574 |
| `getAllTimeOpponentTopScorers` | function | 12591 |
| `getAllTimePenaltyRows` | function | 10645 |
| `getAllTimePlayerRows` | function | 9665 |
| `getAlltimeRank` | function | 13107 |
| `getAlltimeRecencyWeight` | function | 10705 |
| `getAllTimeSgOnlyRows` | function | 9700 |
| `getAssistDiagnostics` | function | 5064 |
| `getAssistPlayersFromEvent` | function | 3003 |
| `getCanonicalTeamName` | function | 15945 |
| `getCarryPerformanceRows` | function | 10591 |
| `getComparisonAlltimeTeamGoals` | function | 13198 |
| `getComparisonAlltimeTrend` | function | 13272 |
| `getComparisonChemistryFromEvents` | function | 13206 |
| `getComparisonClutchFromEvents` | function | 13211 |
| `getComparisonCurrentSelection` | function | 13337 |
| `getComparisonEventsForItem` | function | 13655 |
| `getComparisonPlayerOptions` | function | 13279 |
| `getComparisonPlayerRow` | function | 13180 |
| `getComparisonProfile` | function | 13241 |
| `getComparisonRosterGames` | function | 13675 |
| `getComparisonRosterGamesForSeason` | function | 13658 |
| `getComparisonSeasonEvents` | function | 13201 |
| `getComparisonSeasonLabel` | function | 13183 |
| `getComparisonSeasonTrend` | function | 13246 |
| `getComparisonStyleProfile` | function | 13216 |
| `getComparisonTeamGoalsForSeason` | function | 13186 |
| `getComparisonVariantsForPlayer` | function | 13297 |
| `getDifficultConnectionRowsForPlayer` | function | 11945 |
| `getDuoDirectScorerGameCounts` | function | 11009 |
| `getDuoFieldPlayerRows` | function | 11438 |
| `getDuoRowsForPlayerScope` | function | 10917 |
| `getDuoScorerCountsWithCandidate` | function | 10958 |
| `getDuoSharedFieldRows` | function | 11454 |
| `getEffectiveLineupData` | function | 7232 |
| `getEinsatzCenterGameDraft` | function | 7304 |
| `getEmptyState` | function | 15844 |
| `getFieldGameIdsForPlayer` | function | 2804 |
| `getFurtherSameDayUlmGames` | function | 4494 |
| `getGameDurationMinutes` | function | 4473 |
| `getGameId` | function | 6513 |
| `getGlobalAllTimeSnapshot` | function | 2415 |
| `getGlobalIdentityProfile` | function | 12747 |
| `getGlobalLoadableSeasonKeys` | function | 8619 |
| `getGlobalOpponentSpecialistProfile` | function | 14824 |
| `getGlobalPlayerBestSeason` | function | 10573 |
| `getGlobalPlayerMilestones` | function | 10756 |
| `getGlobalPlayerOpponentGameRows` | function | 14795 |
| `getGlobalPlayerPeakGame` | function | 10562 |
| `getGlobalPlayerTeamRecord` | function | 10536 |
| `getGlobalProfileEvents` | function | 10509 |
| `getGlobalRookieMilestone` | function | 10745 |
| `getGlobalRookieSeasonKey` | function | 10731 |
| `getGlobalSeasonStatRows` | function | 13091 |
| `getGlobalTopScorerMilestones` | function | 10718 |
| `getGoalieComparisonAlltimeTrend` | function | 13754 |
| `getGoalieComparisonSeasonTrend` | function | 13771 |
| `getGoalieDiagnostics` | function | 5050 |
| `getGoalieDnaRows` | function | 10198 |
| `getGoalieGameIdsForPlayer` | function | 2811 |
| `getGoalieOpponentName` | function | 4349 |
| `getGoalieOpponentTier` | function | 4353 |
| `getGoalScorerFromEvent` | function | 2969 |
| `getHallGoalieData` | function | 12957 |
| `getHallOfFamePlayerIdSet` | function | 10505 |
| `getHallOfFamePlayerRows` | function | 10502 |
| `getHallOfFameStats` | function | 12617 |
| `getJerseyNumber` | function | 2908 |
| `getLineupAllRows` | function | 18960 |
| `getLineupPlayerPool` | function | 18971 |
| `getLoadedSeasonPlayerUi` | function | 10531 |
| `getLoadedSeasonPointsByName` | function | 10475 |
| `getMatchcenterDirectOpponents` | function | 16143 |
| `getMatchcenterOpponents` | function | 16110 |
| `getOpponentAliasKeys` | function | 15951 |
| `getOpponentAliasKeysForMatchcenter` | function | 16023 |
| `getOppStrength` | function | 3926 |
| `getOrCreatePlayerProfile` | function | 4056 |
| `getPenaltyBasePersonalMinutes` | function | 4509 |
| `getPenaltyDisciplineMinutes` | function | 4527 |
| `getPenaltyDisciplineType` | function | 4465 |
| `getPenaltyPersonalMinutes` | function | 4517 |
| `getPenaltySpecialTeamsMinutes` | function | 4506 |
| `getPhaseIndex` | function | 5335 |
| `getPhaseKey` | function | 3035 |
| `getPlayedUlmGames` | function | 2886 |
| `getPlayerAlltimeFieldGames` | function | 2848 |
| `getPlayerAlltimeGoalieGames` | function | 2851 |
| `getPlayerAlltimeRoleGames` | function | 2829 |
| `getPlayerAlltimeStats` | function | 9708 |
| `getPlayerAlltimeTotalGames` | function | 2854 |
| `getPlayerFieldGames` | function | 2818 |
| `getPlayerGoalieAlltimeStats` | function | 9729 |
| `getPlayerGoalieGames` | function | 2822 |
| `getPlayerGoalieSeasonStats` | function | 9724 |
| `getPlayerRegistryProfile` | function | 9716 |
| `getPlayerRoleAvailability` | function | 9759 |
| `getPlayerSeasonRoleGameSummary` | function | 2863 |
| `getPlayerSeasonStats` | function | 9703 |
| `getPlayerSourceId` | function | 2905 |
| `getPreClubHistoryPlayerNames` | function | 2638 |
| `getPreviousSeasonKey` | function | 10430 |
| `getRelevantSeasonGames` | function | 3209 |
| `getRosterEntryRegistryProfile` | function | 10908 |
| `getRosterGameIdsForPlayer` | function | 2745 |
| `getRosterImpactPlayerEventLookup` | function | 12011 |
| `getRosterImpactPlayerGames` | function | 12032 |
| `getRosterStatus` | function | 10711 |
| `getScoreLabel` | function | 15734 |
| `getSeasonApiBaseUrl` | function | 1807 |
| `getSeasonData` | function | 2386 |
| `getSeasonDataPreview` | function | 6863 |
| `getSeasonDataState` | function | 23544 |
| `getSeasonIdentityProfile` | function | 10665 |
| `getSeasonmanagerRosterSuggestion` | function | 7646 |
| `getSeasonMatchdays` | function | 3376 |
| `getSeasonOriginBaseUrl` | function | 1827 |
| `getSeasonPlayerFieldBasis` | function | 9124 |
| `getSeasonScopedIdentityProfile` | function | 9151 |
| `getSeasonStatsAsOf` | function | 3279 |
| `getSeasonTeamGameIds` | function | 2902 |
| `getSeasonTeamGames` | function | 2898 |
| `getSeasonUiPlayerForProfile` | function | 10661 |
| `getSpecialTeamsDiagnostics` | function | 5057 |
| `getSpecialTeamsPenaltyChunks` | function | 4530 |
| `getStaticSeasonGames` | function | 6362 |
| `getStoredLastView` | function | 3722 |
| `getSyntheticLineupPlayers` | function | 18937 |
| `getSyntheticLineupRow` | function | 18940 |
| `getSyntheticLineupRows` | function | 18957 |
| `getTeamAllTimeRecords` | function | 12541 |
| `getTeamLogoUrlForStory` | function | 20853 |
| `getUlmTeamStatus` | function | 2592 |
| `getUniqueAllTimeOpponentNames` | function | 2582 |
| `globalSearchEntries` | function | 23926 |
| `globalSearchIsEditableTarget` | function | 23975 |
| `globalSearchKeyAction` | function | 23981 |
| `globalSearchMatch` | function | 23963 |
| `globalSearchMatchdayScore` | function | 23949 |
| `globalSearchOnKeydown` | function | 24076 |
| `globalSearchPlayerScore` | function | 23940 |
| `globalSearchTokens` | function | 23921 |
| `goalieApplySampleConfidence` | function | 9882 |
| `goalieBucketLooseSum` | function | 9890 |
| `goalieBucketRows` | function | 9802 |
| `goalieClampScore` | function | 9847 |
| `goalieDetailFirstTime` | function | 9826 |
| `goalieDnaKey` | function | 10107 |
| `goalieDnaValue` | function | 10112 |
| `goalieEntryRecognitionReason` | function | 2768 |
| `goalieEventAbsSeconds` | function | 4326 |
| `goalieEventSecondInPeriod` | function | 9833 |
| `goalieGameDurationSeconds` | function | 4332 |
| `goalieGameStateBeforeGoal` | function | 4337 |
| `goalieInverseScore` | function | 9851 |
| `goalieNum` | function | 9788 |
| `goaliePctText` | function | 9839 |
| `goaliePositiveCurveScore` | function | 9867 |
| `goaliePositiveScore` | function | 9859 |
| `goalieSafeNum` | function | 9843 |
| `goalieStateGoals` | function | 10119 |
| `goalieStdDev` | function | 9820 |
| `goalieTierMeta` | function | 9811 |
| `goalieTime` | function | 9794 |
| `goalieTopRow` | function | 9808 |
| `goalieWeightedScore` | function | 9876 |
| `goToMainNavPoint` | window | 23282 |
| `hallGoalieExplainForLabel` | function | 12994 |
| `hallGoalieNameHtml` | function | 12973 |
| `hallGoalieNum` | function | 12859 |
| `hallGoaliePkStats` | function | 12885 |
| `hallGoalieRowFromStats` | function | 12924 |
| `hallGoalieSeasonLabel` | function | 12873 |
| `hallGoalieSeasonScore` | function | 12904 |
| `hallGoalieTime` | function | 12865 |
| `hallGoalieTooltip` | function | 12990 |
| `hallGoalieTopteamStats` | function | 12897 |
| `handleComparisonDuoSearchKey` | window | 13445 |
| `hasEmbeddedSeasonData` | function | 8616 |
| `hashSegmentToSeasonKey` | function | 3429 |
| `hasSeasonRole` | function | 5719 |
| `hasSeasonSource` | function | 8612 |
| `hofIntroDelay` | function | 8768 |
| `identityClutchGoalsVsTeams` | function | 5600 |
| `identityDecisiveGoalsVsTeams` | function | 5603 |
| `identityGoalsVsTeams` | function | 5597 |
| `identityInputs` | function | 5634 |
| `identityLateGoalsVsTeams` | function | 5606 |
| `identityOpponentGroups` | function | 5562 |
| `identityPartnerStats` | function | 5548 |
| `identityPointsVsTeams` | function | 5594 |
| `incGoalieBucket` | function | 4322 |
| `incrementUniqueCounter` | function | 4011 |
| `initGlobalSearch` | function | 24098 |
| `initHashRouting` | function | 3853 |
| `initToolMenu` | function | 24196 |
| `invalidateGlobalIdentityCache` | function | 2212 |
| `isActiveAlltimeSeasonStats` | function | 10680 |
| `isComebackRelevantGoal` | function | 5590 |
| `isDecisiveGoal` | function | 5582 |
| `isEinsatzCenterGameFromDraft` | function | 7241 |
| `isExcludedGoalieAppearance` | function | 2778 |
| `isFieldAppearance` | function | 2798 |
| `isFreiburgTuebingenSgName` | function | 2568 |
| `isGameAtOrBeforeAsOf` | function | 3156 |
| `isGamePlayed` | function | 3115 |
| `isGoalieAppearance` | function | 2792 |
| `isGoalieRosterEntry` | function | 2754 |
| `isHallOfFameEligiblePlayer` | function | 10496 |
| `isHallRowPureSG` | function | 12874 |
| `isImportantClutchGoal` | function | 5577 |
| `isLateGoal` | function | 5585 |
| `isMannheimLudwigshafenSgName` | function | 2571 |
| `isMatchPenaltyEvent` | function | 4457 |
| `isNewSeasonDataState` | function | 23565 |
| `isOwnTeam` | function | 15934 |
| `isPenaltyGoalEvent` | function | 4540 |
| `isPreClubHistoryPlayerName` | function | 2641 |
| `isPureSGPlayer` | function | 9689 |
| `isRookieCandidateForSeason` | function | 10465 |
| `isSameUlmTeamContext` | function | 4486 |
| `isSeasonDataPreviewStale` | function | 6871 |
| `isSgOnlyAlltimePlayer` | function | 9681 |
| `isSgOnlyHallOfFameExcluded` | function | 10487 |
| `isSyntheticLineupPlayerId` | function | 18934 |
| `isToolMenuOpen` | function | 24134 |
| `isTwoPlusTwoPenaltyEvent` | function | 4461 |
| `isUlmTeamName` | function | 2586 |
| `isUsableExternalSeasonData` | function | 6446 |
| `isValidAsOfDate` | function | 3433 |
| `isValidAsOfStartTime` | function | 3436 |
| `isVisibleSecondaryTrait` | function | 9026 |
| `isYouthGame` | function | 3120 |
| `kpiBadge` | function | 14149 |
| `kpiDelta` | function | 13882 |
| `kpiItemColor` | function | 13888 |
| `kpiNiceMax` | function | 14039 |
| `kpiRadarValue` | function | 13962 |
| `kpiTrendRows` | function | 14045 |
| `kpiValueText` | function | 13878 |
| `lexiconEntry` | function | 15533 |
| `lexiconUniqueKeys` | function | 15525 |
| `lineupAverage` | function | 18986 |
| `lineupBuilderPoolIds` | function | 2269 |
| `lineupCombinationIds` | function | 19463 |
| `lineupDirectChemistryScore` | function | 19507 |
| `lineupEvaluateComplementCandidate` | function | 19514 |
| `lineupGroupDisplayName` | function | 7150 |
| `lineupLevelLabel` | function | 18990 |
| `lineupOpponentDNAForContext` | function | 19087 |
| `lineupPlayerAnchorScore` | function | 19592 |
| `lineupPlayerProfile` | function | 19191 |
| `lineupRankCandidateIds` | function | 19448 |
| `lineupRecommendationReason` | function | 19679 |
| `lineupRoleDnaComplementScore` | function | 19483 |
| `lineupRosterGamesForPlayer` | function | 18996 |
| `lineupRowMap` | function | 19445 |
| `lineupRowMeta` | function | 18963 |
| `lineupScore` | function | 18980 |
| `lineupStdDev` | function | 19477 |
| `linkUiPlayersToRegistry` | function | 4143 |
| `loadEinsatzCenterMismatchedAutosave` | function | 7561 |
| `loadSeason` | function | 8692 |
| `loadSeasonData` | function | 8146 |
| `loadSeasonForGlobal` | function | 8644 |
| `loadSeasonManifest` | function | 6377 |
| `mainNavActiveKeyForPage` | function | 23276 |
| `markFieldRoleAppearance` | function | 4118 |
| `matchcenterAddDuoConnection` | function | 16799 |
| `matchcenterAddPlanItem` | function | 18015 |
| `matchcenterAddPlanWatch` | function | 18021 |
| `matchcenterAddScoring` | function | 16360 |
| `matchcenterAddUlmDuoConnection` | function | 16950 |
| `matchcenterAddUlmScoring` | function | 16580 |
| `matchcenterAliasModeForContext` | function | 16020 |
| `matchcenterAllGames` | function | 16104 |
| `matchcenterAllGamesForSeason` | function | 16084 |
| `matchcenterAnalyzeDirect` | function | 16194 |
| `matchcenterAnalyzeForm` | function | 16231 |
| `matchcenterBuildCoachActivationHints` | function | 18731 |
| `matchcenterBuildCoachAvoidList` | function | 18721 |
| `matchcenterBuildCoachDangerPatterns` | function | 18703 |
| `matchcenterBuildCoachHints` | function | 18459 |
| `matchcenterBuildCoachIfThen` | function | 18711 |
| `matchcenterBuildCoachKeyActors` | function | 18738 |
| `matchcenterBuildCoachLevers` | function | 18693 |
| `matchcenterBuildCoachPriorities` | function | 18686 |
| `matchcenterBuildGoalieMatchup` | function | 17151 |
| `matchcenterBuildInsights` | function | 17437 |
| `matchcenterBuildIntelHeadline` | function | 18475 |
| `matchcenterBuildIntelligenceDataQuality` | function | 18110 |
| `matchcenterBuildIntelligenceSignals` | function | 18496 |
| `matchcenterBuildIntelListFromPlan` | function | 18450 |
| `matchcenterBuildMatchPlan` | function | 19795 |
| `matchcenterBuildOneThingToWatch` | function | 18483 |
| `matchcenterBuildOpponentAlarm` | function | 18340 |
| `matchcenterBuildOpponentDNA` | function | 18161 |
| `matchcenterBuildOpponentDuoInsights` | function | 16898 |
| `matchcenterBuildOpponentDuos` | function | 16853 |
| `matchcenterBuildOpponentPlayerInsights` | function | 16496 |
| `matchcenterBuildOpponentScouting` | function | 16424 |
| `matchcenterBuildPlanConfidence` | function | 18027 |
| `matchcenterBuildSpecialTeamsMatchup` | function | 17081 |
| `matchcenterBuildTimingAnalysis` | function | 17274 |
| `matchcenterBuildTimingInsights` | function | 17263 |
| `matchcenterBuildUlmDuoInsights` | function | 17048 |
| `matchcenterBuildUlmDuos` | function | 17005 |
| `matchcenterBuildUlmPlayerInsights` | function | 16742 |
| `matchcenterBuildUlmPlayerScouting` | function | 16687 |
| `matchcenterClamp` | function | 15721 |
| `matchcenterClassifyUlmGoalEvent` | function | 16569 |
| `matchcenterCoachAdd` | function | 18623 |
| `matchcenterCoachCautious` | function | 18620 |
| `matchcenterCoachGameModel` | function | 18632 |
| `matchcenterCoachPriorityFromAlarm` | function | 18676 |
| `matchcenterConfidenceClass` | function | 18002 |
| `matchcenterContextGames` | function | 16188 |
| `matchcenterDateLabel` | function | 15891 |
| `matchcenterDateValue` | function | 15886 |
| `matchcenterDefaultSeasonKey` | function | 16006 |
| `matchcenterDeriveOpponentType` | function | 18274 |
| `matchcenterDetectUlmSide` | function | 15996 |
| `matchcenterDirectContextGames` | function | 17061 |
| `matchcenterDirectGames` | function | 16174 |
| `matchcenterDuoDirectionLabel` | function | 16792 |
| `matchcenterDuoPairKey` | function | 16755 |
| `matchcenterEmptyBuckets` | function | 16510 |
| `matchcenterEmptyTimingStats` | function | 17210 |
| `matchcenterEnsureOpponentDuo` | function | 16759 |
| `matchcenterEnsureOpponentPlayer` | function | 16333 |
| `matchcenterEnsureUlmDuo` | function | 16912 |
| `matchcenterEnsureUlmPlayer` | function | 16518 |
| `matchcenterEventNumber` | function | 16296 |
| `matchcenterFinalizeOpponentDuos` | function | 16818 |
| `matchcenterFinalizeOpponentPlayerProfiles` | function | 16377 |
| `matchcenterFinalizeUlmDuos` | function | 16969 |
| `matchcenterFinalizeUlmPlayers` | function | 16618 |
| `matchcenterFindRosterPlayer` | function | 16285 |
| `matchcenterFmt` | function | 15876 |
| `matchcenterFormLine` | function | 17432 |
| `matchcenterGameKey` | function | 16257 |
| `matchcenterGameLine` | function | 17426 |
| `matchcenterGameScore` | function | 16071 |
| `matchcenterGameSideForOpponentKey` | function | 16060 |
| `matchcenterGameSideForTeam` | function | 16052 |
| `matchcenterGameTeamName` | function | 16049 |
| `matchcenterGoalAbsSeconds` | function | 17194 |
| `matchcenterGoalieFitScore` | function | 17134 |
| `matchcenterGoalieKey` | function | 17129 |
| `matchcenterGoalMinute` | function | 16311 |
| `matchcenterInferPriority` | function | 18008 |
| `matchcenterIntelAddAlarm` | function | 18319 |
| `matchcenterIntelCurve` | function | 18062 |
| `matchcenterIntelDataLabel` | function | 18107 |
| `matchcenterIntelDuoRef` | function | 18305 |
| `matchcenterIntelInverseCurve` | function | 18068 |
| `matchcenterIntelPct` | function | 18087 |
| `matchcenterIntelPlayerRef` | function | 18292 |
| `matchcenterIntelPriorityClass` | function | 18097 |
| `matchcenterIntelPriorityFromScore` | function | 18091 |
| `matchcenterIntelPriorityLabel` | function | 18103 |
| `matchcenterIntelRate` | function | 18083 |
| `matchcenterIntelWeighted` | function | 18072 |
| `matchcenterIsClutchGoalEvent` | function | 16322 |
| `matchcenterIsFreiburgTuebingenTeamName` | function | 15981 |
| `matchcenterIsLateGoalEvent` | function | 16317 |
| `matchcenterIsUlmTeamName` | function | 15988 |
| `matchcenterNum` | function | 15726 |
| `matchcenterOpponentMode` | function | 16107 |
| `matchcenterOutcomeForTeam` | function | 16075 |
| `matchcenterPct` | function | 17077 |
| `matchcenterPenaltyMinutes` | function | 16301 |
| `matchcenterPersonalPenaltyMinutesForSide` | function | 17068 |
| `matchcenterPlanRateText` | function | 17994 |
| `matchcenterPlanScoreText` | function | 17990 |
| `matchcenterPlayerDisplayName` | function | 16279 |
| `matchcenterPlayerKey` | function | 16290 |
| `matchcenterPriorityLabel` | function | 17999 |
| `matchcenterRegisterPlayerGame` | function | 16357 |
| `matchcenterRegisterUlmProfileGame` | function | 16556 |
| `matchcenterResultClass` | function | 17415 |
| `matchcenterResultLetter` | function | 17418 |
| `matchcenterRosterPlayers` | function | 16275 |
| `matchcenterScoutingGames` | function | 16260 |
| `matchcenterSeasonHasGames` | function | 16003 |
| `matchcenterSeasonIsUlmTuebingenSgEra` | function | 15908 |
| `matchcenterSeasonKeys` | function | 15901 |
| `matchcenterSeasonLabel` | function | 15905 |
| `matchcenterSigned` | function | 15881 |
| `matchcenterSocialAdd` | function | 18800 |
| `matchcenterSocialCaption` | function | 18807 |
| `matchcenterSortGamesAsc` | function | 15896 |
| `matchcenterSpecialTeamsForGame` | function | 17064 |
| `matchcenterStoryAddCandidate` | function | 21014 |
| `matchcenterStoryAddFact` | function | 20995 |
| `matchcenterStoryBestClutchDuo` | function | 21244 |
| `matchcenterStoryBestClutchPlayer` | function | 21200 |
| `matchcenterStoryCandidateForBudget` | function | 21052 |
| `matchcenterStoryCategoryForPlanFact` | function | 21329 |
| `matchcenterStoryCategoryLimit` | function | 21037 |
| `matchcenterStoryClutchFact` | function | 21177 |
| `matchcenterStoryClutchPriority` | function | 21278 |
| `matchcenterStoryCompetitionLabel` | function | 21281 |
| `matchcenterStoryCurrentStreak` | function | 21124 |
| `matchcenterStoryDirectFactCandidates` | function | 21294 |
| `matchcenterStoryDownloadFileName` | function | 20263 |
| `matchcenterStoryDuoClutchFact` | function | 21254 |
| `matchcenterStoryDuoClutchTotal` | function | 21236 |
| `matchcenterStoryDuoFact` | function | 21257 |
| `matchcenterStoryEstimateFactWeight` | function | 21008 |
| `matchcenterStoryFactKey` | function | 21002 |
| `matchcenterStoryFormFact` | function | 21142 |
| `matchcenterStoryFormFactCandidates` | function | 21153 |
| `matchcenterStoryFormLetters` | function | 20959 |
| `matchcenterStoryFormRecord` | function | 21118 |
| `matchcenterStoryInitials` | function | 20822 |
| `matchcenterStoryInlineStat` | function | 20920 |
| `matchcenterStoryLastDuelLabel` | function | 21290 |
| `matchcenterStoryLateGoalsForOutcome` | function | 21173 |
| `matchcenterStoryLogoBase` | function | 20828 |
| `matchcenterStoryLogoForOpponent` | function | 20883 |
| `matchcenterStoryLooksArtificial` | function | 21005 |
| `matchcenterStoryNameClass` | function | 21450 |
| `matchcenterStoryNormalizePickOptions` | function | 21041 |
| `matchcenterStoryPickFactItems` | function | 21062 |
| `matchcenterStoryPickFacts` | function | 21115 |
| `matchcenterStoryPlanFactCandidates` | function | 21316 |
| `matchcenterStoryPlayer` | function | 20962 |
| `matchcenterStoryPlayerClutchFact` | function | 21210 |
| `matchcenterStoryPlayerClutchTotal` | function | 21192 |
| `matchcenterStoryRankRows` | function | 20947 |
| `matchcenterStoryRankText` | function | 20916 |
| `matchcenterStorySafeLogoUrl` | function | 20834 |
| `matchcenterStoryShortDuel` | function | 21285 |
| `matchcenterStoryShortTeamLabel` | function | 20923 |
| `matchcenterStoryTableRank` | function | 20898 |
| `matchcenterStoryTeamAssetKey` | function | 20848 |
| `matchcenterStoryUlmTableRank` | function | 20909 |
| `matchcenterStoryVisibleFacts` | function | 21456 |
| `matchcenterStoryWinlessStreak` | function | 21133 |
| `matchcenterTeamDisplay` | function | 16012 |
| `matchcenterTeamKey` | function | 16015 |
| `matchcenterTimeValue` | function | 17202 |
| `matchcenterTimingStatsForGames` | function | 17226 |
| `matchcenterUlmScoutingConfidence` | function | 16513 |
| `matchcenterUlmTeamLabelForGame` | function | 17421 |
| `matchcenterUpdateUlmSeasonRow` | function | 16562 |
| `matchcenterWindowForSecond` | function | 17219 |
| `matchdayAsOfCutoff` | function | 3389 |
| `matchdayGameCardHtml` | function | 23408 |
| `matchdayUlmGames` | function | 23405 |
| `medianOrNull` | function | 4316 |
| `mergeDuoSet` | function | 5146 |
| `mergeGoalieSpecialTeamsStats` | function | 4778 |
| `mergeSpecialTeamsStats` | function | 4422 |
| `mojibakeScore` | function | 2459 |
| `moveGlobalSearch` | function | 24060 |
| `normalizeAssistPlayerName` | function | 2972 |
| `normalizeComparisonItem` | function | 13157 |
| `normalizeDuoComparisonItem` | function | 13401 |
| `normalizeEventPlayerRef` | function | 2911 |
| `normalizeGame` | function | 6340 |
| `normalizeLineupLines` | function | 2272 |
| `normalizeOpponentNameForAllTime` | function | 2557 |
| `normalizePlayerDisplayName` | function | 2612 |
| `normalizePlayerName` | function | 2628 |
| `normalizeSecondaryTraits` | function | 5693 |
| `normalizeTeamKey` | function | 15926 |
| `normalizeTeamName` | function | 2547 |
| `normalizeTeamNameForMatchcenter` | function | 15991 |
| `onGlobalSearchInput` | window | 24054 |
| `openAllTimePlayers` | window | 8760 |
| `openComparisonCenter` | window | 8930 |
| `openDuoProPicker` | window | 11850 |
| `openEinsatzCenter` | window | 7101 |
| `openGlobalSearch` | window | 24021 |
| `openHallOfFame` | window | 8906 |
| `openLexicon` | window | 9003 |
| `openLigaGegner` | window | 23778 |
| `openLineupBuilder` | window | 8981 |
| `openMatchcenter` | window | 8959 |
| `openMatchcenterStoryPreview` | window | 2225 |
| `openMatchday` | window | 23387 |
| `openMatchdayTimeline` | window | 23379 |
| `openOverview` | window | 23328 |
| `openSeason` | window | 8757 |
| `openToolMenu` | window | 24138 |
| `overviewCompactTableHtml` | function | 23605 |
| `overviewCrossSeasonTrendHtml` | function | 23654 |
| `overviewFormHtml` | function | 23613 |
| `overviewLastMatchdayText` | function | 23589 |
| `overviewLineupLinkHtml` | function | 23671 |
| `overviewMatchcenterLinkHtml` | function | 23668 |
| `overviewMatchdayEndMs` | function | 23506 |
| `overviewMatchdayStartMs` | function | 23500 |
| `overviewNextMatchdayHtml` | function | 23593 |
| `overviewOpponentLabel` | function | 23584 |
| `overviewOpponentPreviewHtml` | function | 23663 |
| `overviewRankChangeTile` | function | 23690 |
| `overviewRecordHtml` | function | 23647 |
| `overviewSeasonAwardHtml` | function | 23636 |
| `overviewSeasonBilanzHtml` | function | 23628 |
| `p1NarrativeKey` | function | 15808 |
| `paintGlobalSearchResults` | function | 24013 |
| `parseAppHash` | function | 3536 |
| `parseAsOfQueryValue` | function | 3575 |
| `parseComparisonVariant` | function | 13322 |
| `parseGameClock` | function | 3024 |
| `parseLastViewState` | function | 3710 |
| `parseSeasonDataState` | function | 23555 |
| `pct` | function | 5501 |
| `pctValue` | function | 12797 |
| `pdashBestPhase` | function | 14435 |
| `pdashInsight` | function | 14473 |
| `pdashInsights` | function | 14476 |
| `pdashNum` | function | 14419 |
| `pdashOpponentStrength` | function | 14453 |
| `pdashOpponentTier` | function | 14447 |
| `pdashPct` | function | 14423 |
| `pdashPhaseLabel` | function | 14427 |
| `pdashTopCount` | function | 14431 |
| `pdashTopOpponent` | function | 14443 |
| `pdashTopPartner` | function | 14439 |
| `penaltyRawText` | function | 4454 |
| `pFull` | function | 2605 |
| `playerAppearedForUlmStatusInSeasonByName` | function | 10446 |
| `playerAppearedInSeasonByName` | function | 10435 |
| `playerExplainAdd` | function | 15109 |
| `playerExplainConfidence` | function | 15100 |
| `playerExplainConfidenceLabel` | function | 15106 |
| `playerExplainContextSentence` | function | 15145 |
| `playerExplainHeadline` | function | 15135 |
| `playerExplainRolePhrase` | function | 15126 |
| `playerExplainStyleSignature` | function | 15114 |
| `probeSocialVideoExportCapability` | function | 21744 |
| `processGame` | function | 3056 |
| `rAlltimeKpis` | function | 13113 |
| `rAlltimePlayerDashboard` | function | 14628 |
| `rAllTimePlayersPage` | function | 15390 |
| `rankNarratives` | function | 15830 |
| `rAntiSynergyCompareChip` | function | 12177 |
| `rAntiSynergyDelta` | function | 12161 |
| `rAntiSynergyMainDelta` | function | 12202 |
| `rAntiSynergyMetricRow` | function | 12185 |
| `rAsOfSelector` | function | 23799 |
| `ratio01` | function | 5502 |
| `rCarryPerformanceRows` | function | 10607 |
| `rClassicRoleTags` | function | 9112 |
| `rClassicTagTip` | function | 9050 |
| `rClutch` | function | 9318 |
| `rClutchBadge` | function | 9012 |
| `rComparisonCenterPage` | function | 14298 |
| `rComparisonDashboard` | function | 14249 |
| `rComparisonDuoSearchBox` | function | 13631 |
| `rComparisonDuoSuggestionButtons` | function | 13424 |
| `rComparisonMiniOverview` | function | 14237 |
| `rComparisonModeSelect` | function | 13652 |
| `rComparisonRoles` | function | 14241 |
| `rComparisonStyles` | function | 14260 |
| `rContextBar` | function | 23882 |
| `rDifficultConnectionList` | function | 12212 |
| `rDifficultConnectionListCompact` | function | 12279 |
| `rDifficultConnectionListCompactLegacy` | function | 12237 |
| `rDifficultConnectionsCard` | function | 12318 |
| `rDuoCenterPro` | function | 11697 |
| `rDuoCompareSummaryCards` | function | 13510 |
| `rDuoComparisonBars` | function | 13505 |
| `rDuoComparisonChemistry` | function | 13563 |
| `rDuoComparisonContext` | function | 13595 |
| `rDuoComparisonDashboard` | function | 13617 |
| `rDuoComparisonDetails` | function | 13613 |
| `rDuoComparisonImpact` | function | 13579 |
| `rDuoComparisonPage` | function | 13641 |
| `rDuoComparisonProfile` | function | 13541 |
| `rDuoProPlayerSelect` | function | 11879 |
| `rDuoResponseMomentumCard` | function | 12475 |
| `rDuoRows` | function | 10866 |
| `recommendLineComplements` | function | 19767 |
| `recordOverviewVisit` | function | 23574 |
| `registerPlayerIdentity` | function | 4090 |
| `registerSeasonRosters` | function | 4123 |
| `rEinsatzCenterAutosaveBanner` | function | 7523 |
| `rEinsatzCenterCombo` | function | 7046 |
| `rEinsatzCenterComboEditor` | function | 7751 |
| `rEinsatzCenterDraftBanner` | function | 7264 |
| `rEinsatzCenterDraftMark` | function | 7250 |
| `rEinsatzCenterDraftStatsHint` | function | 7254 |
| `rEinsatzCenterEditPage` | function | 7851 |
| `rEinsatzCenterGameCard` | function | 7055 |
| `rEinsatzCenterGameEditor` | function | 7798 |
| `rEinsatzCenterGroup` | function | 7033 |
| `rEinsatzCenterGroupEditor` | function | 7720 |
| `rEinsatzCenterPage` | function | 7074 |
| `rEinsatzCenterRosterSuggestionCard` | function | 7767 |
| `rEinsatzCenterStats` | function | 7156 |
| `relative01` | function | 5503 |
| `removeComparisonDuo` | window | 13475 |
| `removeComparisonItem` | window | 13387 |
| `removeEinsatzCenterCombo` | window | 8088 |
| `removeEinsatzCenterGroup` | window | 8002 |
| `removeEinsatzCenterGroupPlayer` | window | 8052 |
| `removeEinsatzCenterRosterPlayer` | window | 7933 |
| `removeLineupBuilderPlayerFromLine` | window | 2319 |
| `removeLineupPlayer` | window | 2260 |
| `rEmptyState` | function | 15856 |
| `renameEinsatzCenterGroup` | window | 8024 |
| `render` | function | 22686 |
| `renderComparisonDuoSuggestions` | function | 13428 |
| `renderTags` | function | 9120 |
| `repairMojibake` | function | 2478 |
| `repairRenderedMojibake` | function | 2525 |
| `resetPlayerRegistrySeason` | function | 4035 |
| `resolveAssistPlayer` | function | 3017 |
| `resolveCurrentSeasonKey` | function | 6409 |
| `resolveGoalScorerPlayer` | function | 2954 |
| `resolveLineupPlayerName` | function | 7018 |
| `resolvePlayerRoleView` | function | 9773 |
| `resolveRosterPlayerByRef` | function | 2923 |
| `responseExcerpt` | function | 6225 |
| `responseMomentumAbsSeconds` | function | 11042 |
| `responseMomentumActor` | function | 11071 |
| `responseMomentumConfidence` | function | 11191 |
| `responseMomentumEmptyState` | function | 11196 |
| `responseMomentumGameRows` | function | 11055 |
| `responseMomentumGoalActors` | function | 11082 |
| `responseMomentumPairKey` | function | 11204 |
| `responseMomentumSide` | function | 11062 |
| `responseMomentumTime` | function | 11048 |
| `responseMomentumTooltipFor` | function | 12399 |
| `restoreEinsatzCenterAutosave` | function | 7497 |
| `restoreHallOfFameIntroPrevious` | function | 8848 |
| `resultGoalsAgainstForSide` | function | 4358 |
| `returnToEinsatzCenterEdit` | window | 7919 |
| `rGlobalAllTimeStats` | function | 14736 |
| `rGlobalCareerHeader` | function | 14645 |
| `rGlobalDevelopment` | function | 14754 |
| `rGlobalDnaBars` | function | 14389 |
| `rGlobalDuoNetwork` | function | 14854 |
| `rGlobalOpponentSpecialist` | function | 15053 |
| `rGlobalOverview` | function | 14683 |
| `rGlobalPartnerOpponentPanel` | function | 14631 |
| `rGlobalProfileTags` | function | 12788 |
| `rGlobalSearchPanelHtml` | function | 24010 |
| `rGlobalSearchResultsHtml` | function | 23999 |
| `rGlobalSearchToggle` | function | 23996 |
| `rGoalieAnalysis` | function | 10399 |
| `rGoalieBars` | function | 10056 |
| `rGoalieDnaBars` | function | 10202 |
| `rGoalieFirstGoalResistance` | function | 10239 |
| `rGoalieInsights` | function | 10312 |
| `rGoalieKpis` | function | 10216 |
| `rGoalieMiniMetrics` | function | 10233 |
| `rGoalieMomentum` | function | 10253 |
| `rGoalieOpponents` | function | 10354 |
| `rGoalieOverview` | function | 10334 |
| `rGoaliePhaseProfile` | function | 10295 |
| `rGoaliePhases` | function | 10351 |
| `rGoalieRoleTraits` | function | 10194 |
| `rGoalieStability` | function | 10366 |
| `rGoalieTable` | function | 10391 |
| `rGoalieTierCards` | function | 10267 |
| `rHallDuoTemple` | function | 12850 |
| `rHallGoalieAwardCards` | function | 13041 |
| `rHallGoalieLegends` | function | 13058 |
| `rHallGoalieRankCard` | function | 13009 |
| `rHallOfFameHero` | function | 12801 |
| `rHallOfFamePage` | function | 15432 |
| `rHallPodiumList` | function | 12827 |
| `rHallSGBadge` | function | 12882 |
| `rIaShell` | function | 23902 |
| `rIdentityCards` | function | 9086 |
| `rIdentityTags` | function | 9066 |
| `rInsights` | function | 9579 |
| `rInteractiveDuoCenterPro` | function | 11886 |
| `rKpiCards` | function | 13891 |
| `rKpiExtendedMetrics` | function | 14024 |
| `rKpiInfoCards` | function | 14159 |
| `rKpiMetricCard` | function | 14016 |
| `rKpiMirrorRows` | function | 13902 |
| `rKpiObjectMini` | function | 14152 |
| `rKpiOpponentStrength` | function | 14121 |
| `rKpiRadar` | function | 13973 |
| `rKpiShareBars` | function | 14008 |
| `rKpiTextMetricCard` | function | 14021 |
| `rKpiTrendCompare` | function | 14054 |
| `rKPIVergleich` | function | 14223 |
| `rLexiconPage` | function | 15547 |
| `rLexiconRows` | function | 15543 |
| `rLigaGegnerPlaceholderPage` | function | 23782 |
| `rLineupBuilderAvailablePanel` | function | 20546 |
| `rLineupBuilderPage` | function | 20722 |
| `rLineupComplementCards` | function | 20643 |
| `rLineupMetricPills` | function | 20532 |
| `rLineupRecommendationCards` | function | 20594 |
| `rLineupRecommendationMode` | function | 20609 |
| `rLineupScoreRows` | function | 20428 |
| `rLineupSimpleCards` | function | 20450 |
| `rLineupTestLine` | function | 20656 |
| `rLineupTestMode` | function | 20705 |
| `rMainNav` | function | 23289 |
| `rMainNavBottom` | function | 23311 |
| `rMatchcenterCoachCardList` | function | 20090 |
| `rMatchcenterCoachIfThen` | function | 20104 |
| `rMatchcenterCoachSimpleList` | function | 20112 |
| `rMatchcenterCopyButton` | function | 20182 |
| `rMatchcenterDetailsSection` | function | 17407 |
| `rMatchcenterDigitalCoach` | function | 20117 |
| `rMatchcenterDuoRankCard` | function | 17728 |
| `rMatchcenterDuoRow` | function | 17704 |
| `rMatchcenterDuosTab` | function | 17875 |
| `rMatchcenterDuoWatchCard` | function | 17684 |
| `rMatchcenterFormCard` | function | 17465 |
| `rMatchcenterFormSection` | function | 17381 |
| `rMatchcenterGamesList` | function | 17486 |
| `rMatchcenterGoalieCard` | function | 17937 |
| `rMatchcenterGoalieMatchup` | function | 17961 |
| `rMatchcenterIntelCoachHints` | function | 20076 |
| `rMatchcenterIntelOverview` | function | 20030 |
| `rMatchcenterKpi` | function | 17458 |
| `rMatchcenterLineupBuilder` | function | 20459 |
| `rMatchcenterLockerList` | function | 20187 |
| `rMatchcenterLockerRoomSheet` | function | 20199 |
| `rMatchcenterMatchPlan` | function | 20800 |
| `rMatchcenterOpponentAlarm` | function | 20008 |
| `rMatchcenterOpponentDNA` | function | 19975 |
| `rMatchcenterOpponentDuos` | function | 17832 |
| `rMatchcenterOpponentScouting` | function | 17645 |
| `rMatchcenterPage` | function | 22196 |
| `rMatchcenterPlanItems` | function | 19941 |
| `rMatchcenterPlanWatch` | function | 19959 |
| `rMatchcenterPlayerRow` | function | 17519 |
| `rMatchcenterPlayersTab` | function | 17681 |
| `rMatchcenterProfileSection` | function | 17361 |
| `rMatchcenterRankCard` | function | 17543 |
| `rMatchcenterResponseMomentum` | function | 12502 |
| `rMatchcenterScoutingSummary` | function | 20756 |
| `rMatchcenterSocialBlock` | function | 20255 |
| `rMatchcenterSocialMediaCenter` | function | 20374 |
| `rMatchcenterSpecialCard` | function | 17878 |
| `rMatchcenterSpecialTeams` | function | 17887 |
| `rMatchcenterStoryForm` | function | 21492 |
| `rMatchcenterStoryFrame` | function | 21575 |
| `rMatchcenterStoryLogo` | function | 21487 |
| `rMatchcenterStoryPlayerCard` | function | 21497 |
| `rMatchcenterStoryPreview` | function | 21505 |
| `rMatchcenterTabs` | function | 17358 |
| `rMatchcenterTimeBars` | function | 17285 |
| `rMatchcenterTiming` | function | 17319 |
| `rMatchcenterTimingStatsCard` | function | 17299 |
| `rMatchcenterUlmDuoRankCard` | function | 17783 |
| `rMatchcenterUlmDuoRow` | function | 17760 |
| `rMatchcenterUlmDuos` | function | 17789 |
| `rMatchcenterUlmDuoWatchCard` | function | 17734 |
| `rMatchcenterUlmImpactCard` | function | 17549 |
| `rMatchcenterUlmPlayerRow` | function | 17578 |
| `rMatchcenterUlmRankCard` | function | 17602 |
| `rMatchcenterUlmScouting` | function | 17608 |
| `rMatchcenterWatchCard` | function | 17498 |
| `rMatchdayDetailPage` | function | 23439 |
| `rMatchdayPage` | function | 23475 |
| `rMatchdayTimelinePage` | function | 23428 |
| `rMatchdayTimelineRow` | function | 23420 |
| `rMatrix` | function | 9191 |
| `rmTerm` | function | 12406 |
| `roleGameStableKey` | function | 2826 |
| `roleTraitLabel` | function | 9023 |
| `rOppBreakdown` | function | 9483 |
| `rOpponentIntelBars` | function | 10830 |
| `rOpponentTopScorerTable` | function | 12641 |
| `rosterImpactConfidence` | function | 12073 |
| `rosterImpactConfidenceWeight` | function | 12079 |
| `rosterPlayerMatches` | function | 2730 |
| `rOverviewPage` | function | 23766 |
| `rPdashLabel` | function | 14580 |
| `rPdashStat` | function | 14583 |
| `rPenalties` | function | 9464 |
| `rPhases` | function | 9248 |
| `rPlayerDash` | function | 14586 |
| `rPlayerDashStyles` | function | 14568 |
| `rPlayerExplainItems` | function | 15332 |
| `rPlayerExplanation` | function | 15337 |
| `rPlayerResponseMomentumCard` | function | 12456 |
| `rPlayerRoleSwitch` | function | 9781 |
| `rRadar` | function | 9268 |
| `rRes` | const-arrow | 9011 |
| `rResponseMomentumOverviewCard` | function | 12432 |
| `rRmKpi` | function | 12410 |
| `rRmTopList` | function | 12421 |
| `rRoleTraitTip` | function | 9030 |
| `rRosterImpactStatLine` | function | 12194 |
| `rRosterStatusBadge` | function | 9039 |
| `rScoreBreakdown` | function | 15860 |
| `rSeasonDataPreviewCard` | function | 6890 |
| `rSeasonDataPreviewContextHint` | function | 23834 |
| `rSeasonDataPreviewRows` | function | 6880 |
| `rSeasonDataPreviewStatus` | function | 6877 |
| `rSeasonDataStateContextHint` | function | 23851 |
| `rSeasonDuoCenterPro` | function | 11942 |
| `rSeasonDuoSummary` | function | 9238 |
| `rSeasonInsightsTab` | function | 9564 |
| `rSeasonLandingPage` | function | 14667 |
| `rSeasonPlayerDashboard` | function | 14625 |
| `rSeasonProfileKpis` | function | 9163 |
| `rSeasonProfileTagStrip` | function | 9184 |
| `rSeasonTrendRows` | function | 14349 |
| `rSocialVideoBlock` | function | 20324 |
| `rSocialVideoFeedFrame` | function | 22085 |
| `rSparkline` | function | 13127 |
| `rStyleMetricTip` | function | 9035 |
| `rStyleProfileBars` | function | 9075 |
| `rTable` | function | 9633 |
| `rTeamPage` | function | 22344 |
| `rTeamResponseMomentumCard` | function | 12495 |
| `rTimeline` | function | 9353 |
| `rToolMenu` | function | 24124 |
| `runComparison` | window | 13392 |
| `runDuoComparison` | window | 13480 |
| `saveLastView` | function | 3727 |
| `scoreNarrative` | function | 15811 |
| `seasonApiUrl` | function | 1824 |
| `seasonDataPreviewRerender` | function | 6736 |
| `seasonDataPreviewRow` | function | 6740 |
| `seasonGameApiUrls` | function | 1842 |
| `seasonGameHtmlUrls` | function | 1852 |
| `seasonHasPureUlmTeam` | function | 10480 |
| `seasonKeyToHashSegment` | function | 3426 |
| `seasonOrderIndex` | function | 10425 |
| `seasonPathPrefix` | function | 1836 |
| `seasonRoleKeysForPlayer` | function | 5710 |
| `seasonRoleTraitsFromClassic` | function | 5705 |
| `seasonStatNumber` | function | 10670 |
| `seasonStatSetSize` | function | 10674 |
| `seedHallOfFameIntroParticles` | function | 8815 |
| `selectAllLineupAvailable` | window | 2306 |
| `selectComparisonDuoSuggestion` | window | 13438 |
| `selectComparisonMode` | window | 13399 |
| `selectComparisonPlayer` | window | 13356 |
| `selectDuoProQuick` | window | 11852 |
| `selectEinsatzCenterEditGame` | window | 7921 |
| `selectEnforcerKeys` | function | 5722 |
| `serializeFieldRoleSeasonStats` | function | 4239 |
| `serializeGoalieSeasonStats` | function | 4217 |
| `serializeSeasonStats` | function | 4204 |
| `serializeSpecialTeamsStats` | function | 4419 |
| `setAntiSynergyView` | window | 2352 |
| `setComparisonDuoMode` | window | 13409 |
| `setComparisonDuoPlayer` | window | 13458 |
| `setComparisonDuoSearch` | window | 13411 |
| `setComparisonDuoSeasonKey` | window | 13410 |
| `setComparisonRoleMode` | window | 13362 |
| `setComparisonVariant` | window | 13367 |
| `setContextAsOf` | window | 23812 |
| `setDuoProPickerState` | function | 11821 |
| `setDuoProSelection` | window | 11871 |
| `setEinsatzCenterGameNote` | window | 8095 |
| `setEinsatzCenterGroupPlayerPosition` | window | 8060 |
| `setEinsatzCenterIncludeDraft` | window | 7920 |
| `setEinsatzCenterSeason` | window | 7095 |
| `setGlobalPlayer` | window | 2378 |
| `setGlobalPlayerDuo` | window | 2379 |
| `setGlobalTab` | window | 2380 |
| `setGoalieTab` | window | 2219 |
| `setLineupActiveLine` | window | 2291 |
| `setLineupBuilderMode` | window | 2290 |
| `setLineupBuilderOpponent` | window | 2289 |
| `setLineupBuilderSeason` | window | 2277 |
| `setLineupNewPlayerProfile` | window | 2333 |
| `setMatchcenterContext` | window | 9000 |
| `setMatchcenterOpponent` | window | 8999 |
| `setMatchcenterSeason` | window | 9001 |
| `setMatchcenterTab` | window | 2224 |
| `setP` | window | 2216 |
| `setPage` | window | 2362 |
| `setPlayerRoleView` | window | 2218 |
| `setSeasonDataPreviewOpen` | window | 6926 |
| `setSeasonDataPreviewPasteText` | window | 6927 |
| `setState` | const-arrow | 2204 |
| `setTab` | window | 2217 |
| `showLineupComplements` | window | 2332 |
| `showMainShell` | function | 8607 |
| `socialDuoFocusLine` | function | 18830 |
| `socialEnsurePeriod` | function | 18816 |
| `socialFirstUseful` | function | 18820 |
| `socialKeyFactLine` | function | 18840 |
| `socialOpponentLine` | function | 18836 |
| `socialPlayerFocusLine` | function | 18823 |
| `socialSentence` | function | 18813 |
| `socialVideoBuildFeedSpec` | function | 21960 |
| `socialVideoBuildStorySpec` | function | 21906 |
| `socialVideoCheckFonts` | function | 21725 |
| `socialVideoDistributeSceneDurations` | function | 21673 |
| `socialVideoFileName` | function | 21893 |
| `socialVideoFitText` | function | 21710 |
| `socialVideoFormAsOf` | function | 21789 |
| `socialVideoLastDuelAsOf` | function | 21798 |
| `socialVideoMatchdayLabel` | function | 21901 |
| `socialVideoOpponentSceneData` | function | 21842 |
| `socialVideoStandbildFrame` | function | 22124 |
| `socialVideoStoryFrameData` | function | 22048 |
| `socialVideoTableRank` | function | 21781 |
| `socialVideoTopScorerAsOf` | function | 21810 |
| `socialVideoUlmGamesForMatchday` | function | 21774 |
| `socialVideoXmlSafeHtml` | function | 22136 |
| `specialTeamsStateFromActive` | function | 4545 |
| `stageSeasonDataPreview` | function | 6786 |
| `stageSeasonDataPreviewFromFile` | function | 6838 |
| `stageSeasonDataPreviewFromPaste` | function | 6852 |
| `startApp` | window | 8745 |
| `startEinsatzCenterDraftMode` | window | 7901 |
| `startHallOfFameIntro` | function | 8868 |
| `sumRoleGames` | function | 9753 |
| `switchMatchdaySeason` | window | 23398 |
| `switchOverviewSeason` | window | 23345 |
| `syncHashFromState` | function | 3669 |
| `t2s` | const-arrow | 3034 |
| `teamAliasRuleMatches` | function | 15929 |
| `teamAliasSeasonMatches` | function | 15920 |
| `toggleAntiSynergyHideSgOnly` | window | 2354 |
| `toggleAntiSynergyShowAll` | window | 2353 |
| `toggleComparisonPicker` | window | 13386 |
| `toggleComparisonSgOnly` | window | 13371 |
| `toggleEinsatzCenterComboPlayer` | window | 8069 |
| `toggleEinsatzCenterGroupRename` | window | 8010 |
| `toggleEinsatzCenterRosterSuggestionPlayer` | window | 7941 |
| `toggleHallOfFamePureSGPlayers` | window | 2227 |
| `toggleLineupBuilderAvailable` | window | 2292 |
| `toggleMatchcenterDuoDetails` | window | 2223 |
| `toggleMatchcenterGames` | window | 9002 |
| `toggleMatchcenterPlayerDetails` | window | 2222 |
| `toggleMatchcenterSpecialTeamsGames` | window | 2221 |
| `toggleSgOnlyAlltime` | window | 2381 |
| `toggleSpecialTeamsGameDetails` | window | 2220 |
| `toggleToolMenu` | window | 24153 |
| `toolMenuElements` | function | 24128 |
| `toolMenuItemElements` | function | 24131 |
| `toolMenuOnClick` | function | 24189 |
| `toolMenuOnKeydown` | function | 24165 |
| `toPublicPlayerRegistry` | function | 4243 |
| `uiDeltaIndicator` | function | 22930 |
| `uiFormatNumber` | function | 22902 |
| `uiHinweisKarte` | function | 22994 |
| `uiInfoIcon` | function | 22948 |
| `uiIntervallBalken` | function | 23070 |
| `uiKennzahlKachel` | function | 22960 |
| `uiKernaussage` | function | 22980 |
| `uiMethodenbox` | function | 23089 |
| `uiNotiz` | function | 23106 |
| `uiObjektseite` | function | 23186 |
| `uiObjektseiteSortTabs` | function | 23168 |
| `uiPlatzhalter` | function | 23118 |
| `uiRangliste` | function | 23016 |
| `uiReliabilityDots` | function | 22915 |
| `uiVerlauf` | function | 23044 |
| `uniqueList` | function | 1839 |
| `updateCoverAllTimeStats` | function | 8634 |
| `updatePlayerRoleAvailability` | function | 5039 |
| `validateGameStructure` | function | 6547 |
| `validateMergedSeason` | function | 6634 |
| `validateSeasonGames` | function | 6588 |
| `validateSeasonKey` | function | 6611 |
| `validateWrapperFormat` | function | 6623 |
| `variance` | function | 3047 |
| `viewEinsatzCenterMergedView` | window | 7918 |
| `warnEventProcessingOnce` | function | 2722 |
| `withoutHashSync` | function | 3686 |

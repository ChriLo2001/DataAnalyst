# Code-Karte: index.html

<!-- index-map: source-sha256=2b954df8cd62e8275ad1aca9ef34decc278a0accbec0e7a22864220ec3f394b9 source-lines=24257 -->

Automatisch erzeugt von `scripts/build-index-map.mjs`. Nicht von Hand bearbeiten — bei Änderungen an index.html erneut ausführen: `node scripts/build-index-map.mjs --write`. Vor gezieltem Lesen prüfen, ob die Karte noch aktuell ist: `node scripts/build-index-map.mjs --check`.

index.html: 24257 Zeilen gesamt (SHA-256 `2b954df8cd62e8275ad1aca9ef34decc278a0accbec0e7a22864220ec3f394b9`). Statischer `<style>`-Block: Zeile 8–1544. Haupt-`<script>`-Block: Zeile 1637–24253.

**Leseregel (siehe CLAUDE.md):** index.html nie vollständig laden. Diese Karte nennen, den gesuchten Namen im Register unten finden, dann nur den genannten Zeilenbereich lesen.

## Große Bereiche

Top-Level-Blöcke (Funktionen oder Daten-consts) ab 30 Zeilen oder 2000 Zeichen, u. a. `STATIC_SEASON_DATA`:

| Name | Art | Zeile | Zeilen |
|---|---|---|---|
| `STATIC_SEASON_DATA` | const-data | 1681–1681 | 1 |
| `SEASON_CONFIG` | const-data | 1682–1773 | 92 |
| `TYPE_DESC` | const-data | 1876–1899 | 24 |
| `ROLE_TRAIT_COLORS` | const-data | 1984–2023 | 40 |
| `ROLE_TRAIT_TOOLTIPS` | const-data | 2045–2084 | 40 |
| `UI_TEXT_REPLACEMENTS` | const-data | 2488–2505 | 18 |
| `appendSeasonGameDiagnostics` | function | 2663–2712 | 50 |
| `resolveRosterPlayerByRef` | function | 2915–2945 | 31 |
| `processGame` | function | 3048–3105 | 58 |
| `classifyGameForStats` | function | 3159–3200 | 42 |
| `buildMatchdays` | function | 3318–3359 | 42 |
| `parseAppHash` | function | 3528–3559 | 32 |
| `applyAppHash` | function | 3766–3796 | 31 |
| `buildStandings` | function | 3877–3916 | 40 |
| `getOrCreatePlayerProfile` | function | 4048–4080 | 33 |
| `toPublicPlayerRegistry` | function | 4235–4264 | 30 |
| `aggregateAllTimePlayers` | function | 4266–4299 | 34 |
| `emptySpecialTeamsStats` | function | 4360–4400 | 41 |
| `mergeSpecialTeamsStats` | function | 4414–4443 | 30 |
| `buildSpecialTeamsForGame` | function | 4559–4752 | 194 |
| `addGoalieGameToStats` | function | 4812–4862 | 51 |
| `buildGoalieGameRecord` | function | 4864–4912 | 49 |
| `buildGoalieStatsForSeason` | function | 4914–4993 | 80 |
| `aggregateGoalieAlltimeStats` | function | 4995–5029 | 35 |
| `getAssistDiagnostics` | function | 5056–5108 | 53 |
| `buildPlayerEvents` | function | 5238–5322 | 85 |
| `computeMetrics` | function | 5342–5474 | 133 |
| `buildSoloDuoProfile` | function | 5496–5539 | 44 |
| `identityInputs` | function | 5626–5683 | 58 |
| `buildIdentityProfiles` | function | 5727–5958 | 232 |
| `assignStatus` | function | 6005–6190 | 186 |
| `fetchTextWithDiagnostics` | function | 6225–6254 | 30 |
| `fetchSeasonGameRaw` | function | 6290–6329 | 40 |
| `validateGameStructure` | function | 6539–6578 | 40 |
| `buildDryRunReport` | function | 6645–6707 | 63 |
| `stageSeasonDataPreview` | function | 6778–6829 | 52 |
| `rSeasonDataPreviewCard` | function | 6882–6917 | 36 |
| `computeEinsatzCenterStats` | function | 7111–7141 | 31 |
| `rEinsatzCenterStats` | function | 7148–7166 | 19 |
| `einsatzCenterDeserializeAutosave` | function | 7369–7402 | 34 |
| `rEinsatzCenterGroupEditor` | function | 7712–7742 | 31 |
| `rEinsatzCenterRosterSuggestionCard` | function | 7759–7789 | 31 |
| `rEinsatzCenterGameEditor` | function | 7790–7842 | 53 |
| `rEinsatzCenterEditPage` | function | 7843–7890 | 48 |
| `loadSeasonData` | function | 8138–8596 | 459 |
| `loadSeasonForGlobal` | function | 8636–8666 | 31 |
| `loadSeason` | function | 8684–8735 | 52 |
| `ensureHallOfFameIntroOverlay` | function | 8763–8795 | 33 |
| `rMatrix` | function | 9183–9227 | 45 |
| `rRadar` | function | 9260–9307 | 48 |
| `rClutch` | function | 9310–9342 | 33 |
| `rTimeline` | function | 9345–9453 | 109 |
| `rOppBreakdown` | function | 9475–9507 | 33 |
| `generatePlayerInsights` | function | 9510–9553 | 44 |
| `rInsights` | function | 9571–9622 | 52 |
| `buildGoalieAnalysisModel` | function | 9889–10047 | 159 |
| `buildGoalieRoleProfile` | function | 10112–10185 | 74 |
| `rGoalieInsights` | function | 10304–10325 | 22 |
| `buildOpponentIntelligence` | function | 10767–10820 | 54 |
| `buildBestThirdManOptions` | function | 10970–11000 | 31 |
| `getDuoDirectScorerGameCounts` | function | 11001–11032 | 32 |
| `buildAnnotatedGoalEventsForGame` | function | 11082–11182 | 101 |
| `buildResponseGoalStatsRaw` | function | 11225–11273 | 49 |
| `buildMomentumSwingStatsRaw` | function | 11286–11356 | 71 |
| `buildDuoFloorCeiling` | function | 11363–11404 | 42 |
| `buildDuoWithWithoutImpact` | function | 11500–11533 | 34 |
| `buildDuoCompatibility` | function | 11588–11610 | 23 |
| `buildDuoProAnalysis` | function | 11645–11688 | 44 |
| `rDuoCenterPro` | function | 11689–11803 | 115 |
| `rInteractiveDuoCenterPro` | function | 11878–11933 | 56 |
| `getDifficultConnectionRowsForPlayer` | function | 11937–11981 | 45 |
| `getRosterImpactPlayerGames` | function | 12024–12064 | 41 |
| `buildRosterImpactAnalysis` | function | 12090–12149 | 60 |
| `rDifficultConnectionList` | function | 12204–12228 | 25 |
| `rDifficultConnectionListCompactLegacy` | function | 12229–12270 | 42 |
| `rDifficultConnectionListCompact` | function | 12271–12309 | 39 |
| `rDifficultConnectionsCard` | function | 12310–12346 | 37 |
| `RESPONSE_MOMENTUM_TOOLTIPS` | const-data | 12349–12380 | 32 |
| `rResponseMomentumOverviewCard` | function | 12424–12447 | 24 |
| `rMatchcenterResponseMomentum` | function | 12494–12531 | 38 |
| `getTeamAllTimeRecords` | function | 12533–12573 | 41 |
| `getAllTimeIdentityStandings` | function | 12654–12688 | 35 |
| `buildRecencyWeightedGlobalIdentityProfile` | function | 12690–12737 | 48 |
| `rHallOfFameHero` | function | 12793–12818 | 26 |
| `hallGoalieRowFromStats` | function | 12916–12948 | 33 |
| `rHallGoalieRankCard` | function | 13001–13032 | 32 |
| `rHallGoalieLegends` | function | 13050–13082 | 33 |
| `buildDuoComparison` | function | 13477–13496 | 20 |
| `rDuoCompareSummaryCards` | function | 13502–13532 | 31 |
| `rDuoComparisonPage` | function | 13633–13643 | 11 |
| `buildComparisonExtraMetrics` | function | 13688–13745 | 58 |
| `buildGoalieComparisonDataset` | function | 13782–13832 | 51 |
| `buildComparisonDataset` | function | 13833–13868 | 36 |
| `rKpiMirrorRows` | function | 13894–13953 | 60 |
| `rKpiRadar` | function | 13965–13999 | 35 |
| `rKpiTrendCompare` | function | 14046–14112 | 67 |
| `rKpiOpponentStrength` | function | 14113–14140 | 28 |
| `rKpiInfoCards` | function | 14151–14182 | 32 |
| `buildComparisonSummary` | function | 14183–14214 | 32 |
| `rComparisonStyles` | function | 14252–14289 | 38 |
| `rComparisonCenterPage` | function | 14290–14340 | 51 |
| `rGlobalDnaBars` | function | 14381–14410 | 30 |
| `buildSeasonPlayerDashModel` | function | 14480–14516 | 37 |
| `buildAlltimePlayerDashModel` | function | 14517–14559 | 43 |
| `rPlayerDashStyles` | function | 14560–14571 | 12 |
| `rPlayerDash` | function | 14578–14616 | 39 |
| `rGlobalOverview` | function | 14675–14726 | 52 |
| `rGlobalDevelopment` | function | 14746–14784 | 39 |
| `rGlobalDuoNetwork` | function | 14846–15043 | 198 |
| `rGlobalOpponentSpecialist` | function | 15045–15090 | 46 |
| `buildFieldPlayerExplanation` | function | 15156–15230 | 75 |
| `buildGoaliePlayerExplanation` | function | 15231–15284 | 54 |
| `buildPlayerIntelligence` | function | 15294–15323 | 30 |
| `rPlayerExplanation` | function | 15329–15380 | 52 |
| `rAllTimePlayersPage` | function | 15382–15422 | 41 |
| `rHallOfFamePage` | function | 15424–15512 | 89 |
| `rLexiconPage` | function | 15539–15711 | 173 |
| `buildConfidence` | function | 15735–15780 | 46 |
| `getMatchcenterOpponents` | function | 16102–16134 | 33 |
| `getMatchcenterDirectOpponents` | function | 16135–16165 | 31 |
| `matchcenterAnalyzeDirect` | function | 16186–16222 | 37 |
| `matchcenterFinalizeOpponentPlayerProfiles` | function | 16369–16415 | 47 |
| `matchcenterBuildOpponentScouting` | function | 16416–16487 | 72 |
| `matchcenterEnsureUlmPlayer` | function | 16510–16547 | 38 |
| `matchcenterAddUlmScoring` | function | 16572–16609 | 38 |
| `matchcenterFinalizeUlmPlayers` | function | 16610–16678 | 69 |
| `matchcenterBuildUlmPlayerScouting` | function | 16679–16733 | 55 |
| `matchcenterEnsureOpponentDuo` | function | 16751–16783 | 33 |
| `matchcenterFinalizeOpponentDuos` | function | 16810–16844 | 35 |
| `matchcenterBuildOpponentDuos` | function | 16845–16889 | 45 |
| `matchcenterEnsureUlmDuo` | function | 16904–16941 | 38 |
| `matchcenterFinalizeUlmDuos` | function | 16961–16996 | 36 |
| `matchcenterBuildUlmDuos` | function | 16997–17039 | 43 |
| `matchcenterBuildSpecialTeamsMatchup` | function | 17073–17120 | 48 |
| `matchcenterBuildGoalieMatchup` | function | 17143–17185 | 43 |
| `matchcenterTimingStatsForGames` | function | 17218–17254 | 37 |
| `rMatchcenterUlmScouting` | function | 17600–17636 | 37 |
| `rMatchcenterOpponentScouting` | function | 17637–17672 | 36 |
| `rMatchcenterUlmDuos` | function | 17781–17823 | 43 |
| `rMatchcenterOpponentDuos` | function | 17824–17866 | 43 |
| `rMatchcenterSpecialTeams` | function | 17879–17928 | 50 |
| `matchcenterBuildPlanConfidence` | function | 18019–18053 | 35 |
| `matchcenterBuildIntelligenceDataQuality` | function | 18102–18152 | 51 |
| `matchcenterBuildOpponentDNA` | function | 18153–18265 | 113 |
| `matchcenterBuildOpponentAlarm` | function | 18332–18441 | 110 |
| `matchcenterBuildIntelligenceSignals` | function | 18488–18534 | 47 |
| `buildMatchIntelligenceFromContext` | function | 18535–18589 | 55 |
| `buildMatchStories` | function | 18638–18667 | 30 |
| `buildDigitalCoachReport` | function | 18738–18770 | 33 |
| `buildMatchdayCaptionBlocks` | function | 18842–18871 | 30 |
| `buildSocialMediaContent` | function | 18872–18920 | 49 |
| `lineupRosterGamesForPlayer` | function | 18988–19035 | 48 |
| `buildLineupExperienceProfile` | function | 19036–19078 | 43 |
| `buildLineupOpponentDNAFit` | function | 19091–19134 | 44 |
| `classifyLineIdentity` | function | 19135–19182 | 48 |
| `lineupPlayerProfile` | function | 19183–19258 | 76 |
| `buildLineupAnalysis` | function | 19259–19392 | 134 |
| `buildLineupScoreBreakdowns` | function | 19393–19422 | 30 |
| `lineupEvaluateComplementCandidate` | function | 19506–19583 | 78 |
| `buildTeamLineBalance` | function | 19602–19645 | 44 |
| `buildLineupRecommendations` | function | 19680–19758 | 79 |
| `matchcenterBuildMatchPlan` | function | 19787–19932 | 146 |
| `rMatchcenterOpponentDNA` | function | 19967–19999 | 33 |
| `rMatchcenterIntelOverview` | function | 20022–20067 | 46 |
| `rMatchcenterDigitalCoach` | function | 20109–20173 | 65 |
| `rMatchcenterLockerRoomSheet` | function | 20191–20246 | 56 |
| `downloadMatchdayStory` | window | 20265–20312 | 48 |
| `rSocialVideoBlock` | function | 20316–20341 | 26 |
| `rMatchcenterSocialMediaCenter` | function | 20366–20419 | 54 |
| `rMatchcenterLineupBuilder` | function | 20451–20523 | 73 |
| `rLineupBuilderAvailablePanel` | function | 20538–20585 | 48 |
| `rLineupRecommendationMode` | function | 20601–20634 | 34 |
| `rLineupTestLine` | function | 20648–20696 | 49 |
| `rLineupBuilderPage` | function | 20714–20747 | 34 |
| `rMatchcenterScoutingSummary` | function | 20748–20791 | 44 |
| `getTeamLogoUrlForStory` | function | 20845–20874 | 30 |
| `matchcenterStoryPlayer` | function | 20954–20986 | 33 |
| `matchcenterStoryPickFactItems` | function | 21054–21106 | 53 |
| `buildMatchcenterStoryPreviewData` | function | 21330–21441 | 112 |
| `matchcenterStoryVisibleFacts` | function | 21448–21478 | 31 |
| `rMatchcenterStoryPreview` | function | 21497–21566 | 70 |
| `fitMatchcenterStoryLayout` | function | 21573–21615 | 43 |
| `socialVideoDistributeSceneDurations` | function | 21665–21696 | 32 |
| `socialVideoTopScorerAsOf` | function | 21802–21831 | 30 |
| `socialVideoOpponentSceneData` | function | 21834–21881 | 48 |
| `socialVideoBuildStorySpec` | function | 21898–21949 | 52 |
| `socialVideoBuildFeedSpec` | function | 21952–22001 | 50 |
| `socialVideoStoryFrameData` | function | 22040–22073 | 34 |
| `rSocialVideoFeedFrame` | function | 22077–22113 | 37 |
| `downloadSocialVideoStandbild` | window | 22136–22186 | 51 |
| `rMatchcenterPage` | function | 22188–22335 | 148 |
| `rTeamPage` | function | 22336–22646 | 311 |
| `_render` | function | 22696–22860 | 165 |
| `uiObjektseite` | function | 23178–23211 | 34 |
| `rMatchdayDetailPage` | function | 23431–23466 | 36 |
| `buildOverviewCards` | function | 23708–23748 | 41 |

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
| `createSeasonBucket` | function | 1774–1788 | 15 |
| `getSeasonApiBaseUrl` | function | 1799–1815 | 17 |
| `seasonApiUrl` | function | 1816–1818 | 3 |
| `getSeasonOriginBaseUrl` | function | 1819–1827 | 9 |
| `seasonPathPrefix` | function | 1828–1830 | 3 |
| `uniqueList` | function | 1831–1833 | 3 |
| `seasonGameApiUrls` | function | 1834–1843 | 10 |
| `seasonGameHtmlUrls` | function | 1844–1851 | 8 |
| `clearAnalysisCache` | function | 2149–2151 | 3 |
| `analysisCacheContext` | function | 2152–2166 | 15 |
| `asOfCacheKeyPart` | function | 2180–2185 | 6 |
| `analysisCacheKey` | function | 2186–2189 | 4 |
| `cachedAnalysis` | function | 2190–2195 | 6 |
| `setState` | const-arrow | 2196–2203 | 8 |
| `invalidateGlobalIdentityCache` | function | 2204–2206 | 3 |
| `setP` | window | 2208–2208 | 1 |
| `setTab` | window | 2209–2209 | 1 |
| `setPlayerRoleView` | window | 2210–2210 | 1 |
| `setGoalieTab` | window | 2211–2211 | 1 |
| `toggleSpecialTeamsGameDetails` | window | 2212–2212 | 1 |
| `toggleMatchcenterSpecialTeamsGames` | window | 2213–2213 | 1 |
| `toggleMatchcenterPlayerDetails` | window | 2214–2214 | 1 |
| `toggleMatchcenterDuoDetails` | window | 2215–2215 | 1 |
| `setMatchcenterTab` | window | 2216–2216 | 1 |
| `openMatchcenterStoryPreview` | window | 2217–2217 | 1 |
| `closeMatchcenterStoryPreview` | window | 2218–2218 | 1 |
| `toggleHallOfFamePureSGPlayers` | window | 2219–2219 | 1 |
| `copyMatchcenterText` | window | 2220–2245 | 26 |
| `addLineupPlayer` | window | 2246–2251 | 6 |
| `removeLineupPlayer` | window | 2252–2252 | 1 |
| `clearLineupPlayers` | window | 2253–2253 | 1 |
| `filterLineupPlayers` | window | 2254–2260 | 7 |
| `lineupBuilderPoolIds` | function | 2261–2263 | 3 |
| `normalizeLineupLines` | function | 2264–2268 | 5 |
| `setLineupBuilderSeason` | window | 2269–2280 | 12 |
| `setLineupBuilderOpponent` | window | 2281–2281 | 1 |
| `setLineupBuilderMode` | window | 2282–2282 | 1 |
| `setLineupActiveLine` | window | 2283–2283 | 1 |
| `toggleLineupBuilderAvailable` | window | 2284–2297 | 14 |
| `selectAllLineupAvailable` | window | 2298–2298 | 1 |
| `clearLineupAvailable` | window | 2299–2299 | 1 |
| `addLineupBuilderPlayerToLine` | window | 2300–2309 | 10 |
| `addLineupBuilderPlayerToActiveLine` | window | 2310–2310 | 1 |
| `removeLineupBuilderPlayerFromLine` | window | 2311–2317 | 7 |
| `clearLineupBuilderLine` | window | 2318–2323 | 6 |
| `showLineupComplements` | window | 2324–2324 | 1 |
| `setLineupNewPlayerProfile` | window | 2325–2325 | 1 |
| `addSyntheticLineupPlayer` | window | 2326–2343 | 18 |
| `setAntiSynergyView` | window | 2344–2344 | 1 |
| `toggleAntiSynergyShowAll` | window | 2345–2345 | 1 |
| `toggleAntiSynergyHideSgOnly` | window | 2346–2346 | 1 |
| `filterLineupBuilderAvailable` | window | 2347–2353 | 7 |
| `setPage` | window | 2354–2362 | 9 |
| `backToHome` | window | 2363–2369 | 7 |
| `setGlobalPlayer` | window | 2370–2370 | 1 |
| `setGlobalPlayerDuo` | window | 2371–2371 | 1 |
| `setGlobalTab` | window | 2372–2372 | 1 |
| `toggleSgOnlyAlltime` | window | 2373–2373 | 1 |
| `getActiveSeasonKey` | function | 2375–2377 | 3 |
| `getSeasonData` | function | 2378–2406 | 29 |
| `getGlobalAllTimeSnapshot` | function | 2407–2414 | 8 |
| `applySeasonContext` | function | 2415–2438 | 24 |
| `mojibakeScore` | function | 2451–2455 | 5 |
| `decodeCp1252AsUtf8` | function | 2456–2469 | 14 |
| `repairMojibake` | function | 2470–2487 | 18 |
| `fixKnownUiTransliterations` | function | 2506–2510 | 5 |
| `cleanText` | function | 2511–2513 | 3 |
| `fixMojibakeText` | function | 2514–2516 | 3 |
| `repairRenderedMojibake` | function | 2517–2538 | 22 |
| `normalizeTeamName` | function | 2539–2548 | 10 |
| `normalizeOpponentNameForAllTime` | function | 2549–2559 | 11 |
| `isFreiburgTuebingenSgName` | function | 2560–2562 | 3 |
| `isMannheimLudwigshafenSgName` | function | 2563–2565 | 3 |
| `getAllTimeOpponentNames` | function | 2566–2573 | 8 |
| `getUniqueAllTimeOpponentNames` | function | 2574–2576 | 3 |
| `isUlmTeamName` | function | 2578–2583 | 6 |
| `getUlmTeamStatus` | function | 2584–2588 | 5 |
| `detectUlmSide` | function | 2589–2595 | 7 |
| `detectSide` | const-arrow | 2596–2596 | 1 |
| `pFull` | function | 2597–2603 | 7 |
| `normalizePlayerDisplayName` | function | 2604–2619 | 16 |
| `normalizePlayerName` | function | 2620–2629 | 10 |
| `getPreClubHistoryPlayerNames` | function | 2630–2632 | 3 |
| `isPreClubHistoryPlayerName` | function | 2633–2637 | 5 |
| `gameStableId` | function | 2638–2640 | 3 |
| `diagnoseGameDuplicates` | function | 2641–2654 | 14 |
| `gameClassificationStatusLabel` | function | 2655–2662 | 8 |
| `appendSeasonGameDiagnostics` | function | 2663–2712 | 50 |
| `warnEventProcessingOnce` | function | 2714–2721 | 8 |
| `rosterPlayerMatches` | function | 2722–2736 | 15 |
| `getRosterGameIdsForPlayer` | function | 2737–2745 | 9 |
| `isGoalieRosterEntry` | function | 2746–2750 | 5 |
| `goalieEntryRecognitionReason` | function | 2760–2769 | 10 |
| `isExcludedGoalieAppearance` | function | 2770–2783 | 14 |
| `isGoalieAppearance` | function | 2784–2789 | 6 |
| `isFieldAppearance` | function | 2790–2795 | 6 |
| `getFieldGameIdsForPlayer` | function | 2796–2802 | 7 |
| `getGoalieGameIdsForPlayer` | function | 2803–2809 | 7 |
| `getPlayerFieldGames` | function | 2810–2813 | 4 |
| `getPlayerGoalieGames` | function | 2814–2817 | 4 |
| `roleGameStableKey` | function | 2818–2820 | 3 |
| `getPlayerAlltimeRoleGames` | function | 2821–2839 | 19 |
| `getPlayerAlltimeFieldGames` | function | 2840–2842 | 3 |
| `getPlayerAlltimeGoalieGames` | function | 2843–2845 | 3 |
| `getPlayerAlltimeTotalGames` | function | 2846–2854 | 9 |
| `getPlayerSeasonRoleGameSummary` | function | 2855–2877 | 23 |
| `getPlayedUlmGames` | function | 2878–2886 | 9 |
| `countPlayedUlmGames` | function | 2887–2889 | 3 |
| `getSeasonTeamGames` | function | 2890–2893 | 4 |
| `getSeasonTeamGameIds` | function | 2894–2896 | 3 |
| `getPlayerSourceId` | function | 2897–2899 | 3 |
| `getJerseyNumber` | function | 2900–2902 | 3 |
| `normalizeEventPlayerRef` | function | 2903–2914 | 12 |
| `resolveRosterPlayerByRef` | function | 2915–2945 | 31 |
| `resolveGoalScorerPlayer` | function | 2946–2960 | 15 |
| `getGoalScorerFromEvent` | function | 2961–2963 | 3 |
| `normalizeAssistPlayerName` | function | 2964–2966 | 3 |
| `collectAssistEventRefs` | function | 2967–2994 | 28 |
| `getAssistPlayersFromEvent` | function | 2995–3008 | 14 |
| `resolveAssistPlayer` | function | 3009–3015 | 7 |
| `parseGameClock` | function | 3016–3025 | 10 |
| `t2s` | const-arrow | 3026–3026 | 1 |
| `getPhaseKey` | function | 3027–3038 | 12 |
| `variance` | function | 3039–3043 | 5 |
| `processGame` | function | 3048–3105 | 58 |
| `isGamePlayed` | function | 3107–3109 | 3 |
| `isYouthGame` | function | 3112–3120 | 9 |
| `gameStatusText` | function | 3122–3128 | 7 |
| `gameScore` | function | 3129–3138 | 10 |
| `isGameAtOrBeforeAsOf` | function | 3148–3158 | 11 |
| `classifyGameForStats` | function | 3159–3200 | 42 |
| `getRelevantSeasonGames` | function | 3201–3220 | 20 |
| `deriveAsOfForSeason` | function | 3233–3236 | 4 |
| `getSeasonStatsAsOf` | function | 3271–3282 | 12 |
| `compareGamesChronologically` | function | 3297–3310 | 14 |
| `buildMatchdays` | function | 3318–3359 | 42 |
| `getSeasonMatchdays` | function | 3368–3372 | 5 |
| `matchdayAsOfCutoff` | function | 3381–3389 | 9 |
| `formatDateDE` | function | 3391–3394 | 4 |
| `seasonKeyToHashSegment` | function | 3418–3420 | 3 |
| `hashSegmentToSeasonKey` | function | 3421–3424 | 4 |
| `isValidAsOfDate` | function | 3425–3427 | 3 |
| `isValidAsOfStartTime` | function | 3428–3430 | 3 |
| `asOfEquals` | function | 3437–3444 | 8 |
| `decodeHashSegmentSafe` | function | 3508–3510 | 3 |
| `parseAppHash` | function | 3528–3559 | 32 |
| `parseAsOfQueryValue` | function | 3567–3577 | 11 |
| `buildAppHash` | function | 3583–3595 | 13 |
| `buildGlobalPageHash` | function | 3600–3609 | 10 |
| `buildHashStringFromParsed` | function | 3615–3619 | 5 |
| `computeCurrentAppHash` | function | 3635–3647 | 13 |
| `syncHashFromState` | function | 3661–3671 | 11 |
| `withoutHashSync` | function | 3678–3686 | 9 |
| `parseLastViewState` | function | 3702–3713 | 12 |
| `getStoredLastView` | function | 3714–3717 | 4 |
| `saveLastView` | function | 3719–3721 | 3 |
| `applyGlobalPageFromHash` | function | 3733–3753 | 21 |
| `applyAppHash` | function | 3766–3796 | 31 |
| `initHashRouting` | function | 3845–3863 | 19 |
| `gameResult` | function | 3866–3872 | 7 |
| `buildStandings` | function | 3877–3916 | 40 |
| `getOppStrength` | function | 3918–3924 | 7 |
| `createPlayerAnalysisProfile` | function | 3936–3938 | 3 |
| `emptyPlayerSeasonStats` | function | 3940–3945 | 6 |
| `emptyGoalieSeasonStats` | function | 3946–3967 | 22 |
| `emptyGoalieAlltimeStats` | function | 3968–3982 | 15 |
| `emptyGoalieSpecialTeamsStats` | function | 3983–3994 | 12 |
| `emptyFieldRoleSeasonStats` | function | 3995–3997 | 3 |
| `addUnique` | function | 3999–4001 | 3 |
| `incrementUniqueCounter` | function | 4003–4008 | 6 |
| `buildPlayerIdentity` | function | 4010–4025 | 16 |
| `resetPlayerRegistrySeason` | function | 4027–4037 | 11 |
| `derivePlayerStatus` | function | 4039–4046 | 8 |
| `getOrCreatePlayerProfile` | function | 4048–4080 | 33 |
| `registerPlayerIdentity` | function | 4082–4098 | 17 |
| `ensureGoalieSeasonStats` | function | 4100–4104 | 5 |
| `ensureFieldRoleSeasonStats` | function | 4105–4109 | 5 |
| `markFieldRoleAppearance` | function | 4110–4113 | 4 |
| `registerSeasonRosters` | function | 4115–4133 | 19 |
| `linkUiPlayersToRegistry` | function | 4135–4155 | 21 |
| `applySeasonScoringToRegistry` | function | 4157–4178 | 22 |
| `finalizePlayerRegistrySeason` | function | 4180–4194 | 15 |
| `serializeSeasonStats` | function | 4196–4208 | 13 |
| `serializeGoalieSeasonStats` | function | 4209–4230 | 22 |
| `serializeFieldRoleSeasonStats` | function | 4231–4233 | 3 |
| `toPublicPlayerRegistry` | function | 4235–4264 | 30 |
| `aggregateAllTimePlayers` | function | 4266–4299 | 34 |
| `finiteNumbers` | function | 4301–4303 | 3 |
| `avgOrNull` | function | 4304–4307 | 4 |
| `medianOrNull` | function | 4308–4313 | 6 |
| `incGoalieBucket` | function | 4314–4317 | 4 |
| `goalieEventAbsSeconds` | function | 4318–4323 | 6 |
| `goalieGameDurationSeconds` | function | 4324–4328 | 5 |
| `goalieGameStateBeforeGoal` | function | 4329–4340 | 12 |
| `getGoalieOpponentName` | function | 4341–4344 | 4 |
| `getGoalieOpponentTier` | function | 4345–4349 | 5 |
| `resultGoalsAgainstForSide` | function | 4350–4359 | 10 |
| `emptySpecialTeamsStats` | function | 4360–4400 | 41 |
| `clonePlain` | function | 4401–4403 | 3 |
| `finalizeSpecialTeamsStats` | function | 4404–4410 | 7 |
| `serializeSpecialTeamsStats` | function | 4411–4413 | 3 |
| `mergeSpecialTeamsStats` | function | 4414–4443 | 30 |
| `penaltyRawText` | function | 4446–4448 | 3 |
| `isMatchPenaltyEvent` | function | 4449–4452 | 4 |
| `isTwoPlusTwoPenaltyEvent` | function | 4453–4456 | 4 |
| `getPenaltyDisciplineType` | function | 4457–4464 | 8 |
| `getGameDurationMinutes` | function | 4465–4469 | 5 |
| `gameDaySortValue` | function | 4470–4477 | 8 |
| `isSameUlmTeamContext` | function | 4478–4485 | 8 |
| `getFurtherSameDayUlmGames` | function | 4486–4497 | 12 |
| `getPenaltySpecialTeamsMinutes` | function | 4498–4500 | 3 |
| `getPenaltyBasePersonalMinutes` | function | 4501–4508 | 8 |
| `getPenaltyPersonalMinutes` | function | 4509–4518 | 10 |
| `getPenaltyDisciplineMinutes` | function | 4519–4521 | 3 |
| `getSpecialTeamsPenaltyChunks` | function | 4522–4531 | 10 |
| `isPenaltyGoalEvent` | function | 4532–4536 | 5 |
| `specialTeamsStateFromActive` | function | 4537–4543 | 7 |
| `annotateSpecialTeamsGoalEvent` | function | 4544–4558 | 15 |
| `buildSpecialTeamsForGame` | function | 4559–4752 | 194 |
| `buildSpecialTeamsForSeason` | function | 4753–4761 | 9 |
| `aggregateAlltimeSpecialTeams` | function | 4762–4769 | 8 |
| `mergeGoalieSpecialTeamsStats` | function | 4770–4781 | 12 |
| `addGoalieSpecialTeamsGameToStats` | function | 4782–4796 | 15 |
| `finalizeGoalieSeasonStats` | function | 4797–4811 | 15 |
| `addGoalieGameToStats` | function | 4812–4862 | 51 |
| `buildGoalieGameRecord` | function | 4864–4912 | 49 |
| `buildGoalieStatsForSeason` | function | 4914–4993 | 80 |
| `aggregateGoalieAlltimeStats` | function | 4995–5029 | 35 |
| `updatePlayerRoleAvailability` | function | 5031–5040 | 10 |
| `getGoalieDiagnostics` | function | 5042–5047 | 6 |
| `getSpecialTeamsDiagnostics` | function | 5049–5054 | 6 |
| `getAssistDiagnostics` | function | 5056–5108 | 53 |
| `buildSeasonDuos` | function | 5111–5137 | 27 |
| `mergeDuoSet` | function | 5138–5154 | 17 |
| `aggregateAllTimeDuos` | function | 5155–5165 | 11 |
| `aggregateSeasonStats` | function | 5167–5182 | 16 |
| `buildPlayerDataFoundation` | function | 5184–5205 | 22 |
| `buildRegistry` | function | 5207–5233 | 27 |
| `buildPlayerEvents` | function | 5238–5322 | 85 |
| `getPhaseIndex` | function | 5327–5337 | 11 |
| `computeMetrics` | function | 5342–5474 | 133 |
| `detectTypes` | function | 5476–5491 | 16 |
| `pct` | function | 5493–5493 | 1 |
| `ratio01` | function | 5494–5494 | 1 |
| `relative01` | function | 5495–5495 | 1 |
| `buildSoloDuoProfile` | function | 5496–5539 | 44 |
| `identityPartnerStats` | function | 5540–5553 | 14 |
| `identityOpponentGroups` | function | 5554–5561 | 8 |
| `eventMatchesTeams` | function | 5562–5567 | 6 |
| `clutchText` | function | 5568–5568 | 1 |
| `isImportantClutchGoal` | function | 5569–5573 | 5 |
| `isDecisiveGoal` | function | 5574–5576 | 3 |
| `isLateGoal` | function | 5577–5581 | 5 |
| `isComebackRelevantGoal` | function | 5582–5585 | 4 |
| `identityPointsVsTeams` | function | 5586–5588 | 3 |
| `identityGoalsVsTeams` | function | 5589–5591 | 3 |
| `identityClutchGoalsVsTeams` | function | 5592–5594 | 3 |
| `identityDecisiveGoalsVsTeams` | function | 5595–5597 | 3 |
| `identityLateGoalsVsTeams` | function | 5598–5600 | 3 |
| `countMomentumClusters` | function | 5601–5625 | 25 |
| `identityInputs` | function | 5626–5683 | 58 |
| `clearlyAboveAverage` | function | 5684–5684 | 1 |
| `normalizeSecondaryTraits` | function | 5685–5696 | 12 |
| `seasonRoleTraitsFromClassic` | function | 5697–5701 | 5 |
| `seasonRoleKeysForPlayer` | function | 5702–5710 | 9 |
| `hasSeasonRole` | function | 5711–5713 | 3 |
| `selectEnforcerKeys` | function | 5714–5726 | 13 |
| `buildIdentityProfiles` | function | 5727–5958 | 232 |
| `composeIdentityText` | function | 5959–5965 | 7 |
| `countCaptainAppearances` | function | 5967–5979 | 13 |
| `countGoalieAppearances` | function | 5981–5983 | 3 |
| `computeRosterStatus` | function | 5985–6003 | 19 |
| `assignStatus` | function | 6005–6190 | 186 |
| `fetchJsonLegacy` | function | 6196–6215 | 20 |
| `responseExcerpt` | function | 6217–6219 | 3 |
| `diagnosticError` | function | 6220–6224 | 5 |
| `fetchTextWithDiagnostics` | function | 6225–6254 | 30 |
| `fetchJsonWithDiagnostics` | function | 6255–6263 | 9 |
| `fetchJson` | function | 6264–6267 | 4 |
| `formatStatus` | function | 6268–6270 | 3 |
| `formatDiagnosticAttempt` | function | 6271–6283 | 13 |
| `formatGameLoadError` | function | 6284–6289 | 6 |
| `fetchSeasonGameRaw` | function | 6290–6329 | 40 |
| `normalizeGame` | function | 6332–6353 | 22 |
| `getStaticSeasonGames` | function | 6354–6357 | 4 |
| `loadSeasonManifest` | function | 6369–6385 | 17 |
| `resolveCurrentSeasonKey` | function | 6401–6420 | 20 |
| `applyCurrentSeasonCoverHighlight` | function | 6421–6425 | 5 |
| `isUsableExternalSeasonData` | function | 6438–6446 | 9 |
| `ensureExternalSeasonData` | function | 6447–6468 | 22 |
| `buildStaticSeasonDataBlock` | function | 6469–6478 | 10 |
| `getGameId` | function | 6505–6509 | 5 |
| `findDuplicateGameIds` | function | 6511–6521 | 11 |
| `validateGameStructure` | function | 6539–6578 | 40 |
| `validateSeasonGames` | function | 6580–6590 | 11 |
| `diffGameIds` | function | 6592–6601 | 10 |
| `validateSeasonKey` | function | 6603–6613 | 11 |
| `validateWrapperFormat` | function | 6615–6624 | 10 |
| `validateMergedSeason` | function | 6626–6643 | 18 |
| `buildDryRunReport` | function | 6645–6707 | 63 |
| `seasonDataPreviewRerender` | function | 6728–6730 | 3 |
| `seasonDataPreviewRow` | function | 6732–6743 | 12 |
| `buildSeasonDataPreviewChanges` | function | 6750–6767 | 18 |
| `stageSeasonDataPreview` | function | 6778–6829 | 52 |
| `stageSeasonDataPreviewFromFile` | function | 6830–6843 | 14 |
| `stageSeasonDataPreviewFromPaste` | function | 6844–6848 | 5 |
| `discardSeasonDataPreview` | function | 6849–6853 | 5 |
| `getSeasonDataPreview` | function | 6855–6857 | 3 |
| `isSeasonDataPreviewStale` | function | 6863–6867 | 5 |
| `rSeasonDataPreviewStatus` | function | 6869–6871 | 3 |
| `rSeasonDataPreviewRows` | function | 6872–6880 | 9 |
| `rSeasonDataPreviewCard` | function | 6882–6917 | 36 |
| `setSeasonDataPreviewOpen` | window | 6918–6918 | 1 |
| `setSeasonDataPreviewPasteText` | window | 6919–6919 | 1 |
| `fileNameForLineupSeasonKey` | function | 6939–6941 | 3 |
| `ensureLineupDataLoaded` | function | 6957–6973 | 17 |
| `ensureLineupGroupsRegistryLoaded` | function | 6982–6998 | 17 |
| `resolveLineupPlayerName` | function | 7010–7013 | 4 |
| `findLineupGameContext` | function | 7016–7023 | 8 |
| `rEinsatzCenterGroup` | function | 7025–7036 | 12 |
| `rEinsatzCenterCombo` | function | 7038–7045 | 8 |
| `rEinsatzCenterGameCard` | function | 7047–7064 | 18 |
| `rEinsatzCenterPage` | function | 7066–7085 | 20 |
| `setEinsatzCenterSeason` | window | 7087–7092 | 6 |
| `openEinsatzCenter` | window | 7093–7100 | 8 |
| `computeEinsatzCenterStats` | function | 7111–7141 | 31 |
| `lineupGroupDisplayName` | function | 7142–7147 | 6 |
| `rEinsatzCenterStats` | function | 7148–7166 | 19 |
| `getEffectiveLineupData` | function | 7224–7231 | 8 |
| `isEinsatzCenterGameFromDraft` | function | 7233–7236 | 4 |
| `einsatzCenterDraftInView` | function | 7238–7241 | 4 |
| `rEinsatzCenterDraftMark` | function | 7242–7245 | 4 |
| `rEinsatzCenterDraftStatsHint` | function | 7246–7250 | 5 |
| `einsatzCenterDraftStaleHint` | function | 7252–7254 | 3 |
| `rEinsatzCenterDraftBanner` | function | 7256–7263 | 8 |
| `ensureEinsatzCenterDraft` | function | 7274–7287 | 14 |
| `getEinsatzCenterGameDraft` | function | 7296–7307 | 12 |
| `einsatzCenterAutosaveKey` | function | 7334–7334 | 1 |
| `einsatzCenterStorageRead` | function | 7335–7337 | 3 |
| `einsatzCenterStorageWrite` | function | 7338–7340 | 3 |
| `einsatzCenterStorageRemove` | function | 7341–7343 | 3 |
| `einsatzCenterDraftIsEmpty` | function | 7346–7348 | 3 |
| `einsatzCenterSerializeDraft` | function | 7350–7362 | 13 |
| `einsatzCenterIsPlainObject` | function | 7363–7363 | 1 |
| `einsatzCenterDeserializeAutosave` | function | 7369–7402 | 34 |
| `einsatzCenterCurrentRawBaseHash` | function | 7409–7414 | 6 |
| `einsatzCenterAutosaveDraft` | function | 7423–7450 | 28 |
| `einsatzCenterInspectAutosave` | function | 7458–7486 | 29 |
| `restoreEinsatzCenterAutosave` | function | 7489–7505 | 17 |
| `discardEinsatzCenterAutosave` | function | 7507–7512 | 6 |
| `rEinsatzCenterAutosaveBanner` | function | 7515–7527 | 13 |
| `einsatzCenterAutosaveInfoText` | function | 7529–7539 | 11 |
| `loadEinsatzCenterMismatchedAutosave` | function | 7553–7571 | 19 |
| `deriveLineupValidPlayerIds` | function | 7584–7600 | 17 |
| `deriveLineupUlmPlayerIds` | function | 7608–7624 | 17 |
| `getSeasonmanagerRosterSuggestion` | function | 7638–7658 | 21 |
| `einsatzCenterCanonicalJson` | function | 7667–7676 | 10 |
| `einsatzCenterSha256Hex` | function | 7677–7681 | 5 |
| `einsatzCenterComputeBaseHash` | function | 7682–7684 | 3 |
| `einsatzCenterSoftIssues` | function | 7691–7709 | 19 |
| `rEinsatzCenterGroupEditor` | function | 7712–7742 | 31 |
| `rEinsatzCenterComboEditor` | function | 7743–7749 | 7 |
| `rEinsatzCenterRosterSuggestionCard` | function | 7759–7789 | 31 |
| `rEinsatzCenterGameEditor` | function | 7790–7842 | 53 |
| `rEinsatzCenterEditPage` | function | 7843–7890 | 48 |
| `startEinsatzCenterDraftMode` | window | 7893–7897 | 5 |
| `cancelEinsatzCenterEdit` | window | 7898–7908 | 11 |
| `viewEinsatzCenterMergedView` | window | 7910–7910 | 1 |
| `returnToEinsatzCenterEdit` | window | 7911–7911 | 1 |
| `setEinsatzCenterIncludeDraft` | window | 7912–7912 | 1 |
| `selectEinsatzCenterEditGame` | window | 7913–7916 | 4 |
| `addEinsatzCenterRosterPlayer` | window | 7917–7924 | 8 |
| `removeEinsatzCenterRosterPlayer` | window | 7925–7932 | 8 |
| `toggleEinsatzCenterRosterSuggestionPlayer` | window | 7933–7939 | 7 |
| `dismissEinsatzCenterRosterSuggestion` | window | 7940–7943 | 4 |
| `acceptEinsatzCenterRosterSuggestion` | window | 7951–7967 | 17 |
| `addEinsatzCenterExistingGroup` | window | 7968–7976 | 9 |
| `addEinsatzCenterNewGroup` | window | 7977–7993 | 17 |
| `removeEinsatzCenterGroup` | window | 7994–8001 | 8 |
| `toggleEinsatzCenterGroupRename` | window | 8002–8004 | 3 |
| `renameEinsatzCenterGroup` | window | 8016–8035 | 20 |
| `addEinsatzCenterGroupPlayer` | window | 8036–8043 | 8 |
| `removeEinsatzCenterGroupPlayer` | window | 8044–8051 | 8 |
| `setEinsatzCenterGroupPlayerPosition` | window | 8052–8060 | 9 |
| `toggleEinsatzCenterComboPlayer` | window | 8061–8068 | 8 |
| `confirmEinsatzCenterCombo` | window | 8069–8079 | 11 |
| `removeEinsatzCenterCombo` | window | 8080–8086 | 7 |
| `setEinsatzCenterGameNote` | window | 8087–8093 | 7 |
| `buildEinsatzCenterDraftExport` | function | 8097–8110 | 14 |
| `exportEinsatzCenterDraft` | window | 8111–8123 | 13 |
| `loadSeasonData` | function | 8138–8596 | 459 |
| `showMainShell` | function | 8599–8603 | 5 |
| `hasSeasonSource` | function | 8604–8607 | 4 |
| `hasEmbeddedSeasonData` | function | 8608–8610 | 3 |
| `getGlobalLoadableSeasonKeys` | function | 8611–8617 | 7 |
| `getAllTimeCoverStats` | function | 8618–8625 | 8 |
| `updateCoverAllTimeStats` | function | 8626–8634 | 9 |
| `loadSeasonForGlobal` | function | 8636–8666 | 31 |
| `ensureGlobalDataLoaded` | function | 8667–8682 | 16 |
| `loadSeason` | function | 8684–8735 | 52 |
| `startApp` | window | 8737–8748 | 12 |
| `ensureAppLoaded` | function | 8739–8748 | 10 |
| `openSeason` | window | 8749–8751 | 3 |
| `openAllTimePlayers` | window | 8752–8757 | 6 |
| `hofIntroDelay` | function | 8760–8762 | 3 |
| `ensureHallOfFameIntroOverlay` | function | 8763–8795 | 33 |
| `buildHallOfFameIntroTitle` | function | 8796–8806 | 11 |
| `seedHallOfFameIntroParticles` | function | 8807–8824 | 18 |
| `cleanupHallOfFameIntro` | function | 8825–8839 | 15 |
| `restoreHallOfFameIntroPrevious` | function | 8840–8851 | 12 |
| `finishHallOfFameIntro` | function | 8852–8859 | 8 |
| `startHallOfFameIntro` | function | 8860–8884 | 25 |
| `cancelHallOfFameIntro` | function | 8885–8896 | 12 |
| `openHallOfFame` | window | 8898–8921 | 24 |
| `openComparisonCenter` | window | 8922–8950 | 29 |
| `openMatchcenter` | window | 8951–8972 | 22 |
| `openLineupBuilder` | window | 8973–8990 | 18 |
| `setMatchcenterOpponent` | window | 8991–8991 | 1 |
| `setMatchcenterContext` | window | 8992–8992 | 1 |
| `setMatchcenterSeason` | window | 8993–8993 | 1 |
| `toggleMatchcenterGames` | window | 8994–8994 | 1 |
| `openLexicon` | window | 8995–8998 | 4 |
| `rRes` | const-arrow | 9003–9003 | 1 |
| `rClutchBadge` | function | 9004–9011 | 8 |
| `escAttr` | function | 9012–9014 | 3 |
| `roleTraitLabel` | function | 9015–9017 | 3 |
| `isVisibleSecondaryTrait` | function | 9018–9021 | 4 |
| `rRoleTraitTip` | function | 9022–9026 | 5 |
| `rStyleMetricTip` | function | 9027–9030 | 4 |
| `rRosterStatusBadge` | function | 9031–9038 | 8 |
| `classicTagLabel` | function | 9039–9041 | 3 |
| `rClassicTagTip` | function | 9042–9046 | 5 |
| `fallbackIdentityProfile` | function | 9047–9057 | 11 |
| `rIdentityTags` | function | 9058–9066 | 9 |
| `rStyleProfileBars` | function | 9067–9077 | 11 |
| `rIdentityCards` | function | 9078–9103 | 26 |
| `rClassicRoleTags` | function | 9104–9111 | 8 |
| `renderTags` | function | 9112–9114 | 3 |
| `getSeasonPlayerFieldBasis` | function | 9116–9142 | 27 |
| `getSeasonScopedIdentityProfile` | function | 9143–9154 | 12 |
| `rSeasonProfileKpis` | function | 9155–9174 | 20 |
| `rSeasonProfileTagStrip` | function | 9176–9180 | 5 |
| `rMatrix` | function | 9183–9227 | 45 |
| `rSeasonDuoSummary` | function | 9230–9238 | 9 |
| `rPhases` | function | 9240–9257 | 18 |
| `rRadar` | function | 9260–9307 | 48 |
| `rClutch` | function | 9310–9342 | 33 |
| `rTimeline` | function | 9345–9453 | 109 |
| `rPenalties` | function | 9456–9472 | 17 |
| `rOppBreakdown` | function | 9475–9507 | 33 |
| `generatePlayerInsights` | function | 9510–9553 | 44 |
| `rSeasonInsightsTab` | function | 9556–9569 | 14 |
| `rInsights` | function | 9571–9622 | 52 |
| `rTable` | function | 9625–9645 | 21 |
| `findLoadedSeasonPlayer` | function | 9648–9656 | 9 |
| `getAllTimePlayerRows` | function | 9657–9672 | 16 |
| `isSgOnlyAlltimePlayer` | function | 9673–9680 | 8 |
| `isPureSGPlayer` | function | 9681–9684 | 4 |
| `filterPureSGPlayers` | function | 9685–9688 | 4 |
| `getAllTimeMainPlayerRows` | function | 9689–9691 | 3 |
| `getAllTimeSgOnlyRows` | function | 9692–9694 | 3 |
| `getPlayerSeasonStats` | function | 9695–9699 | 5 |
| `getPlayerAlltimeStats` | function | 9700–9707 | 8 |
| `getPlayerRegistryProfile` | function | 9708–9715 | 8 |
| `getPlayerGoalieSeasonStats` | function | 9716–9720 | 5 |
| `getPlayerGoalieAlltimeStats` | function | 9721–9744 | 24 |
| `sumRoleGames` | function | 9745–9750 | 6 |
| `getPlayerRoleAvailability` | function | 9751–9764 | 14 |
| `resolvePlayerRoleView` | function | 9765–9772 | 8 |
| `rPlayerRoleSwitch` | function | 9773–9779 | 7 |
| `goalieNum` | function | 9780–9785 | 6 |
| `goalieTime` | function | 9786–9793 | 8 |
| `goalieBucketRows` | function | 9794–9799 | 6 |
| `goalieTopRow` | function | 9800–9802 | 3 |
| `goalieTierMeta` | function | 9803–9811 | 9 |
| `goalieStdDev` | function | 9812–9817 | 6 |
| `goalieDetailFirstTime` | function | 9818–9824 | 7 |
| `goalieEventSecondInPeriod` | function | 9825–9830 | 6 |
| `goaliePctText` | function | 9831–9834 | 4 |
| `goalieSafeNum` | function | 9835–9838 | 4 |
| `goalieClampScore` | function | 9839–9842 | 4 |
| `goalieInverseScore` | function | 9843–9850 | 8 |
| `goaliePositiveScore` | function | 9851–9858 | 8 |
| `goaliePositiveCurveScore` | function | 9859–9867 | 9 |
| `goalieWeightedScore` | function | 9868–9873 | 6 |
| `goalieApplySampleConfidence` | function | 9874–9881 | 8 |
| `goalieBucketLooseSum` | function | 9882–9888 | 7 |
| `buildGoalieAnalysisModel` | function | 9889–10047 | 159 |
| `rGoalieBars` | function | 10048–10057 | 10 |
| `goalieDnaKey` | function | 10099–10103 | 5 |
| `goalieDnaValue` | function | 10104–10110 | 7 |
| `goalieStateGoals` | function | 10111–10111 | 1 |
| `buildGoalieRoleProfile` | function | 10112–10185 | 74 |
| `rGoalieRoleTraits` | function | 10186–10189 | 4 |
| `getGoalieDnaRows` | function | 10190–10193 | 4 |
| `rGoalieDnaBars` | function | 10194–10207 | 14 |
| `rGoalieKpis` | function | 10208–10224 | 17 |
| `rGoalieMiniMetrics` | function | 10225–10230 | 6 |
| `rGoalieFirstGoalResistance` | function | 10231–10244 | 14 |
| `rGoalieMomentum` | function | 10245–10258 | 14 |
| `rGoalieTierCards` | function | 10259–10286 | 28 |
| `rGoaliePhaseProfile` | function | 10287–10303 | 17 |
| `rGoalieInsights` | function | 10304–10325 | 22 |
| `rGoalieOverview` | function | 10326–10342 | 17 |
| `rGoaliePhases` | function | 10343–10345 | 3 |
| `rGoalieOpponents` | function | 10346–10357 | 12 |
| `rGoalieStability` | function | 10358–10382 | 25 |
| `rGoalieTable` | function | 10383–10390 | 8 |
| `rGoalieAnalysis` | function | 10391–10416 | 26 |
| `seasonOrderIndex` | function | 10417–10421 | 5 |
| `getPreviousSeasonKey` | function | 10422–10426 | 5 |
| `playerAppearedInSeasonByName` | function | 10427–10437 | 11 |
| `playerAppearedForUlmStatusInSeasonByName` | function | 10438–10456 | 19 |
| `isRookieCandidateForSeason` | function | 10457–10466 | 10 |
| `getLoadedSeasonPointsByName` | function | 10467–10471 | 5 |
| `seasonHasPureUlmTeam` | function | 10472–10478 | 7 |
| `isSgOnlyHallOfFameExcluded` | function | 10479–10487 | 9 |
| `isHallOfFameEligiblePlayer` | function | 10488–10493 | 6 |
| `getHallOfFamePlayerRows` | function | 10494–10496 | 3 |
| `getHallOfFamePlayerIdSet` | function | 10497–10499 | 3 |
| `getGlobalProfileEvents` | function | 10501–10512 | 12 |
| `countBy` | function | 10514–10522 | 9 |
| `getLoadedSeasonPlayerUi` | function | 10523–10527 | 5 |
| `getGlobalPlayerTeamRecord` | function | 10528–10553 | 26 |
| `getGlobalPlayerPeakGame` | function | 10554–10564 | 11 |
| `getGlobalPlayerBestSeason` | function | 10565–10571 | 7 |
| `getAllTimeDuoRowsForPlayer` | function | 10572–10582 | 11 |
| `getCarryPerformanceRows` | function | 10583–10598 | 16 |
| `rCarryPerformanceRows` | function | 10599–10611 | 13 |
| `getAllTimeGamesPlayedRows` | function | 10612–10636 | 25 |
| `getAllTimePenaltyRows` | function | 10637–10652 | 16 |
| `getSeasonUiPlayerForProfile` | function | 10653–10656 | 4 |
| `getSeasonIdentityProfile` | function | 10657–10661 | 5 |
| `seasonStatNumber` | function | 10662–10665 | 4 |
| `seasonStatSetSize` | function | 10666–10671 | 6 |
| `isActiveAlltimeSeasonStats` | function | 10672–10685 | 14 |
| `getActiveAlltimeSeasonKeys` | function | 10686–10696 | 11 |
| `getAlltimeRecencyWeight` | function | 10697–10702 | 6 |
| `getRosterStatus` | function | 10703–10709 | 7 |
| `getGlobalTopScorerMilestones` | function | 10710–10722 | 13 |
| `getGlobalRookieSeasonKey` | function | 10723–10736 | 14 |
| `getGlobalRookieMilestone` | function | 10737–10747 | 11 |
| `getGlobalPlayerMilestones` | function | 10748–10765 | 18 |
| `buildOpponentIntelligence` | function | 10767–10820 | 54 |
| `rOpponentIntelBars` | function | 10822–10832 | 11 |
| `getAllTimeDuoRows` | function | 10834–10856 | 23 |
| `rDuoRows` | function | 10858–10877 | 20 |
| `getAllLoadedSeasonGames` | function | 10879–10898 | 20 |
| `getRosterEntryRegistryProfile` | function | 10900–10903 | 4 |
| `difficultConnectionConfidence` | function | 10904–10908 | 5 |
| `getDuoRowsForPlayerScope` | function | 10909–10927 | 19 |
| `buildDirectDuoLookupForPlayer` | function | 10928–10945 | 18 |
| `duoScopeSeasonKeys` | function | 10946–10949 | 4 |
| `getDuoScorerCountsWithCandidate` | function | 10950–10969 | 20 |
| `buildBestThirdManOptions` | function | 10970–11000 | 31 |
| `getDuoDirectScorerGameCounts` | function | 11001–11032 | 32 |
| `responseMomentumAbsSeconds` | function | 11034–11039 | 6 |
| `responseMomentumTime` | function | 11040–11046 | 7 |
| `responseMomentumGameRows` | function | 11047–11053 | 7 |
| `responseMomentumSide` | function | 11054–11062 | 9 |
| `responseMomentumActor` | function | 11063–11073 | 11 |
| `responseMomentumGoalActors` | function | 11074–11081 | 8 |
| `buildAnnotatedGoalEventsForGame` | function | 11082–11182 | 101 |
| `responseMomentumConfidence` | function | 11183–11187 | 5 |
| `responseMomentumEmptyState` | function | 11188–11195 | 8 |
| `responseMomentumPairKey` | function | 11196–11198 | 3 |
| `ensureRmPlayer` | function | 11199–11204 | 6 |
| `ensureRmDuo` | function | 11205–11210 | 6 |
| `finalizeResponseStats` | function | 11211–11224 | 14 |
| `buildResponseGoalStatsRaw` | function | 11225–11273 | 49 |
| `buildResponseGoalStats` | function | 11274–11279 | 6 |
| `finalizeMomentumStats` | function | 11280–11285 | 6 |
| `buildMomentumSwingStatsRaw` | function | 11286–11356 | 71 |
| `buildMomentumSwingStats` | function | 11357–11362 | 6 |
| `buildDuoFloorCeiling` | function | 11363–11404 | 42 |
| `buildDuoWarnings` | function | 11405–11423 | 19 |
| `duoProPairKey` | function | 11424–11426 | 3 |
| `duoProContextSeasonKey` | function | 11427–11429 | 3 |
| `getDuoFieldPlayerRows` | function | 11430–11440 | 11 |
| `duoProPlayer` | function | 11441–11445 | 5 |
| `getDuoSharedFieldRows` | function | 11446–11451 | 6 |
| `buildDuoDirectProduction` | function | 11452–11472 | 21 |
| `emptyDuoTeamImpactStats` | function | 11473–11475 | 3 |
| `addDuoTeamGame` | function | 11476–11491 | 16 |
| `finalizeDuoTeamImpactStats` | function | 11492–11499 | 8 |
| `buildDuoWithWithoutImpact` | function | 11500–11533 | 34 |
| `buildDuoOpponentAdjusted` | function | 11534–11546 | 13 |
| `buildDuoNetworkContext` | function | 11547–11570 | 24 |
| `buildDuoGapAnalysis` | function | 11571–11587 | 17 |
| `buildDuoCompatibility` | function | 11588–11610 | 23 |
| `buildDuoUntestedPotential` | function | 11611–11622 | 12 |
| `buildDuoUsageRate` | function | 11623–11634 | 12 |
| `buildDuoReplacementOptions` | function | 11635–11644 | 10 |
| `buildDuoProAnalysis` | function | 11645–11688 | 44 |
| `rDuoCenterPro` | function | 11689–11803 | 115 |
| `duoProDomId` | function | 11804–11806 | 3 |
| `duoProPickerOpen` | function | 11807–11809 | 3 |
| `duoProPickerMessage` | function | 11810–11812 | 3 |
| `setDuoProPickerState` | function | 11813–11822 | 10 |
| `duoProResolveCandidate` | function | 11823–11831 | 9 |
| `duoProSelectionPayload` | function | 11832–11841 | 10 |
| `openDuoProPicker` | window | 11842–11842 | 1 |
| `cancelDuoProPicker` | window | 11843–11843 | 1 |
| `selectDuoProQuick` | window | 11844–11847 | 4 |
| `confirmDuoProSelection` | window | 11848–11862 | 15 |
| `setDuoProSelection` | window | 11863–11870 | 8 |
| `rDuoProPlayerSelect` | function | 11871–11877 | 7 |
| `rInteractiveDuoCenterPro` | function | 11878–11933 | 56 |
| `rSeasonDuoCenterPro` | function | 11934–11936 | 3 |
| `getDifficultConnectionRowsForPlayer` | function | 11937–11981 | 45 |
| `emptyRosterImpactStats` | function | 11982–11984 | 3 |
| `finalizeRosterImpactStats` | function | 11985–11992 | 8 |
| `addRosterImpactGameToStats` | function | 11993–12002 | 10 |
| `getRosterImpactPlayerEventLookup` | function | 12003–12023 | 21 |
| `getRosterImpactPlayerGames` | function | 12024–12064 | 41 |
| `rosterImpactConfidence` | function | 12065–12070 | 6 |
| `rosterImpactConfidenceWeight` | function | 12071–12074 | 4 |
| `antiSynergyImpactScore` | function | 12075–12089 | 15 |
| `buildRosterImpactAnalysis` | function | 12090–12149 | 60 |
| `buildDuoAntiSynergy` | function | 12150–12152 | 3 |
| `rAntiSynergyDelta` | function | 12153–12159 | 7 |
| `antiSynergyDeltaClass` | function | 12160–12163 | 4 |
| `antiSynergySigned` | function | 12164–12168 | 5 |
| `rAntiSynergyCompareChip` | function | 12169–12176 | 8 |
| `rAntiSynergyMetricRow` | function | 12177–12185 | 9 |
| `rRosterImpactStatLine` | function | 12186–12189 | 4 |
| `antiSynergyPartnerIsSgOnly` | function | 12190–12193 | 4 |
| `rAntiSynergyMainDelta` | function | 12194–12203 | 10 |
| `rDifficultConnectionList` | function | 12204–12228 | 25 |
| `rDifficultConnectionListCompactLegacy` | function | 12229–12270 | 42 |
| `rDifficultConnectionListCompact` | function | 12271–12309 | 39 |
| `rDifficultConnectionsCard` | function | 12310–12346 | 37 |
| `responseMomentumTooltipFor` | function | 12391–12397 | 7 |
| `rmTerm` | function | 12398–12401 | 4 |
| `rRmKpi` | function | 12402–12412 | 11 |
| `rRmTopList` | function | 12413–12423 | 11 |
| `rResponseMomentumOverviewCard` | function | 12424–12447 | 24 |
| `rPlayerResponseMomentumCard` | function | 12448–12466 | 19 |
| `rDuoResponseMomentumCard` | function | 12467–12486 | 20 |
| `rTeamResponseMomentumCard` | function | 12487–12493 | 7 |
| `rMatchcenterResponseMomentum` | function | 12494–12531 | 38 |
| `getTeamAllTimeRecords` | function | 12533–12573 | 41 |
| `getAllTimeOpponentIntelligence` | function | 12575–12581 | 7 |
| `getAllTimeOpponentTopScorers` | function | 12583–12607 | 25 |
| `getHallOfFameStats` | function | 12609–12631 | 23 |
| `rOpponentTopScorerTable` | function | 12633–12652 | 20 |
| `getAllTimeIdentityStandings` | function | 12654–12688 | 35 |
| `buildRecencyWeightedGlobalIdentityProfile` | function | 12690–12737 | 48 |
| `getGlobalIdentityProfile` | function | 12739–12765 | 27 |
| `dedupeIdentityProfileTags` | function | 12767–12778 | 12 |
| `rGlobalProfileTags` | function | 12780–12784 | 5 |
| `escHtml` | function | 12786–12788 | 3 |
| `pctValue` | function | 12789–12792 | 4 |
| `rHallOfFameHero` | function | 12793–12818 | 26 |
| `rHallPodiumList` | function | 12819–12841 | 23 |
| `rHallDuoTemple` | function | 12842–12849 | 8 |
| `hallGoalieNum` | function | 12851–12856 | 6 |
| `hallGoalieTime` | function | 12857–12864 | 8 |
| `hallGoalieSeasonLabel` | function | 12865–12865 | 1 |
| `isHallRowPureSG` | function | 12866–12873 | 8 |
| `rHallSGBadge` | function | 12874–12876 | 3 |
| `hallGoaliePkStats` | function | 12877–12888 | 12 |
| `hallGoalieTopteamStats` | function | 12889–12895 | 7 |
| `hallGoalieSeasonScore` | function | 12896–12915 | 20 |
| `hallGoalieRowFromStats` | function | 12916–12948 | 33 |
| `getHallGoalieData` | function | 12949–12964 | 16 |
| `hallGoalieNameHtml` | function | 12965–12967 | 3 |
| `hallGoalieTooltip` | function | 12982–12985 | 4 |
| `hallGoalieExplainForLabel` | function | 12986–13000 | 15 |
| `rHallGoalieRankCard` | function | 13001–13032 | 32 |
| `rHallGoalieAwardCards` | function | 13033–13049 | 17 |
| `rHallGoalieLegends` | function | 13050–13082 | 33 |
| `getGlobalSeasonStatRows` | function | 13083–13098 | 16 |
| `getAlltimeRank` | function | 13099–13104 | 6 |
| `rAlltimeKpis` | function | 13105–13118 | 14 |
| `rSparkline` | function | 13119–13131 | 13 |
| `comparisonItemKey` | function | 13143–13148 | 6 |
| `normalizeComparisonItem` | function | 13149–13153 | 5 |
| `comparisonJsArg` | function | 13154–13156 | 3 |
| `comparisonNum` | function | 13157–13160 | 4 |
| `comparisonPct` | function | 13161–13164 | 4 |
| `comparisonFmt` | function | 13165–13168 | 4 |
| `comparisonPctFmt` | function | 13169–13171 | 3 |
| `getComparisonPlayerRow` | function | 13172–13174 | 3 |
| `getComparisonSeasonLabel` | function | 13175–13177 | 3 |
| `getComparisonTeamGoalsForSeason` | function | 13178–13189 | 12 |
| `getComparisonAlltimeTeamGoals` | function | 13190–13192 | 3 |
| `getComparisonSeasonEvents` | function | 13193–13197 | 5 |
| `getComparisonChemistryFromEvents` | function | 13198–13202 | 5 |
| `getComparisonClutchFromEvents` | function | 13203–13207 | 5 |
| `getComparisonStyleProfile` | function | 13208–13232 | 25 |
| `getComparisonProfile` | function | 13233–13237 | 5 |
| `getComparisonSeasonTrend` | function | 13238–13263 | 26 |
| `getComparisonAlltimeTrend` | function | 13264–13269 | 6 |
| `getComparisonPlayerOptions` | function | 13271–13285 | 15 |
| `comparisonVariantValue` | function | 13286–13288 | 3 |
| `getComparisonVariantsForPlayer` | function | 13289–13313 | 25 |
| `parseComparisonVariant` | function | 13314–13328 | 15 |
| `getComparisonCurrentSelection` | function | 13329–13339 | 11 |
| `filterComparisonPlayers` | window | 13340–13347 | 8 |
| `selectComparisonPlayer` | window | 13348–13353 | 6 |
| `setComparisonRoleMode` | window | 13354–13358 | 5 |
| `setComparisonVariant` | window | 13359–13362 | 4 |
| `toggleComparisonSgOnly` | window | 13363–13363 | 1 |
| `addComparisonItem` | window | 13364–13371 | 8 |
| `addSelectedComparisonItem` | window | 13372–13377 | 6 |
| `toggleComparisonPicker` | window | 13378–13378 | 1 |
| `removeComparisonItem` | window | 13379–13382 | 4 |
| `clearComparison` | window | 13383–13383 | 1 |
| `runComparison` | window | 13384–13390 | 7 |
| `selectComparisonMode` | window | 13391–13391 | 1 |
| `backToComparisonModeSelect` | window | 13392–13392 | 1 |
| `normalizeDuoComparisonItem` | function | 13393–13396 | 4 |
| `comparisonDuoContext` | function | 13397–13400 | 4 |
| `setComparisonDuoMode` | window | 13401–13401 | 1 |
| `setComparisonDuoSeasonKey` | window | 13402–13402 | 1 |
| `setComparisonDuoSearch` | window | 13403–13403 | 1 |
| `filterPlayerSuggestions` | function | 13404–13415 | 12 |
| `rComparisonDuoSuggestionButtons` | function | 13416–13419 | 4 |
| `renderComparisonDuoSuggestions` | function | 13420–13428 | 9 |
| `filterComparisonDuoSuggestions` | window | 13429–13436 | 8 |
| `selectComparisonDuoSuggestion` | window | 13430–13436 | 7 |
| `handleComparisonDuoSearchKey` | window | 13437–13449 | 13 |
| `setComparisonDuoPlayer` | window | 13450–13455 | 6 |
| `addComparisonDuoFromSelection` | window | 13456–13463 | 8 |
| `addComparisonDuo` | window | 13464–13466 | 3 |
| `removeComparisonDuo` | window | 13467–13470 | 4 |
| `clearComparisonDuos` | window | 13471–13471 | 1 |
| `runDuoComparison` | window | 13472–13476 | 5 |
| `buildDuoComparison` | function | 13477–13496 | 20 |
| `rDuoComparisonBars` | function | 13497–13501 | 5 |
| `rDuoCompareSummaryCards` | function | 13502–13532 | 31 |
| `rDuoComparisonProfile` | function | 13533–13554 | 22 |
| `rDuoComparisonChemistry` | function | 13555–13570 | 16 |
| `rDuoComparisonImpact` | function | 13571–13586 | 16 |
| `rDuoComparisonContext` | function | 13587–13604 | 18 |
| `rDuoComparisonDetails` | function | 13605–13608 | 4 |
| `rDuoComparisonDashboard` | function | 13609–13622 | 14 |
| `rComparisonDuoSearchBox` | function | 13623–13632 | 10 |
| `rDuoComparisonPage` | function | 13633–13643 | 11 |
| `rComparisonModeSelect` | function | 13644–13646 | 3 |
| `getComparisonEventsForItem` | function | 13647–13649 | 3 |
| `getComparisonRosterGamesForSeason` | function | 13650–13666 | 17 |
| `getComparisonRosterGames` | function | 13667–13674 | 8 |
| `comparisonEventGameKey` | function | 13675–13677 | 3 |
| `comparisonEventPhaseLabel` | function | 13678–13681 | 4 |
| `comparisonOpponentStrengthTier` | function | 13682–13687 | 6 |
| `buildComparisonExtraMetrics` | function | 13688–13745 | 58 |
| `getGoalieComparisonAlltimeTrend` | function | 13746–13762 | 17 |
| `getGoalieComparisonSeasonTrend` | function | 13763–13781 | 19 |
| `buildGoalieComparisonDataset` | function | 13782–13832 | 51 |
| `buildComparisonDataset` | function | 13833–13868 | 36 |
| `kpiValueText` | function | 13870–13873 | 4 |
| `kpiDelta` | function | 13874–13879 | 6 |
| `kpiItemColor` | function | 13880–13882 | 3 |
| `rKpiCards` | function | 13883–13893 | 11 |
| `rKpiMirrorRows` | function | 13894–13953 | 60 |
| `kpiRadarValue` | function | 13954–13964 | 11 |
| `rKpiRadar` | function | 13965–13999 | 35 |
| `rKpiShareBars` | function | 14000–14007 | 8 |
| `rKpiMetricCard` | function | 14008–14012 | 5 |
| `rKpiTextMetricCard` | function | 14013–14015 | 3 |
| `rKpiExtendedMetrics` | function | 14016–14030 | 15 |
| `kpiNiceMax` | function | 14031–14036 | 6 |
| `kpiTrendRows` | function | 14037–14045 | 9 |
| `rKpiTrendCompare` | function | 14046–14112 | 67 |
| `rKpiOpponentStrength` | function | 14113–14140 | 28 |
| `kpiBadge` | function | 14141–14143 | 3 |
| `rKpiObjectMini` | function | 14144–14150 | 7 |
| `rKpiInfoCards` | function | 14151–14182 | 32 |
| `buildComparisonSummary` | function | 14183–14214 | 32 |
| `rKPIVergleich` | function | 14215–14228 | 14 |
| `rComparisonMiniOverview` | function | 14229–14232 | 4 |
| `rComparisonRoles` | function | 14233–14240 | 8 |
| `rComparisonDashboard` | function | 14241–14251 | 11 |
| `rComparisonStyles` | function | 14252–14289 | 38 |
| `rComparisonCenterPage` | function | 14290–14340 | 51 |
| `rSeasonTrendRows` | function | 14341–14359 | 19 |
| `getAlltimeAggregatedStyleProfile` | function | 14360–14379 | 20 |
| `rGlobalDnaBars` | function | 14381–14410 | 30 |
| `pdashNum` | function | 14411–14414 | 4 |
| `pdashPct` | function | 14415–14418 | 4 |
| `pdashPhaseLabel` | function | 14419–14422 | 4 |
| `pdashTopCount` | function | 14423–14426 | 4 |
| `pdashBestPhase` | function | 14427–14430 | 4 |
| `pdashTopPartner` | function | 14431–14434 | 4 |
| `pdashTopOpponent` | function | 14435–14438 | 4 |
| `pdashOpponentTier` | function | 14439–14444 | 6 |
| `pdashOpponentStrength` | function | 14445–14464 | 20 |
| `pdashInsight` | function | 14465–14467 | 3 |
| `pdashInsights` | function | 14468–14479 | 12 |
| `buildSeasonPlayerDashModel` | function | 14480–14516 | 37 |
| `buildAlltimePlayerDashModel` | function | 14517–14559 | 43 |
| `rPlayerDashStyles` | function | 14560–14571 | 12 |
| `rPdashLabel` | function | 14572–14574 | 3 |
| `rPdashStat` | function | 14575–14577 | 3 |
| `rPlayerDash` | function | 14578–14616 | 39 |
| `rSeasonPlayerDashboard` | function | 14617–14619 | 3 |
| `rAlltimePlayerDashboard` | function | 14620–14622 | 3 |
| `rGlobalPartnerOpponentPanel` | function | 14623–14636 | 14 |
| `rGlobalCareerHeader` | function | 14637–14657 | 21 |
| `rSeasonLandingPage` | function | 14659–14673 | 15 |
| `rGlobalOverview` | function | 14675–14726 | 52 |
| `rGlobalAllTimeStats` | function | 14728–14744 | 17 |
| `rGlobalDevelopment` | function | 14746–14784 | 39 |
| `getGlobalPlayerOpponentGameRows` | function | 14787–14814 | 28 |
| `getGlobalOpponentSpecialistProfile` | function | 14816–14844 | 29 |
| `rGlobalDuoNetwork` | function | 14846–15043 | 198 |
| `rGlobalOpponentSpecialist` | function | 15045–15090 | 46 |
| `playerExplainConfidence` | function | 15092–15097 | 6 |
| `playerExplainConfidenceLabel` | function | 15098–15100 | 3 |
| `playerExplainAdd` | function | 15101–15105 | 5 |
| `playerExplainStyleSignature` | function | 15106–15117 | 12 |
| `playerExplainRolePhrase` | function | 15118–15126 | 9 |
| `playerExplainHeadline` | function | 15127–15136 | 10 |
| `playerExplainContextSentence` | function | 15137–15155 | 19 |
| `buildFieldPlayerExplanation` | function | 15156–15230 | 75 |
| `buildGoaliePlayerExplanation` | function | 15231–15284 | 54 |
| `buildPlayerExplanation` | function | 15285–15293 | 9 |
| `buildPlayerIntelligence` | function | 15294–15323 | 30 |
| `rPlayerExplainItems` | function | 15324–15328 | 5 |
| `rPlayerExplanation` | function | 15329–15380 | 52 |
| `rAllTimePlayersPage` | function | 15382–15422 | 41 |
| `rHallOfFamePage` | function | 15424–15512 | 89 |
| `lexiconUniqueKeys` | function | 15517–15524 | 8 |
| `lexiconEntry` | function | 15525–15534 | 10 |
| `rLexiconRows` | function | 15535–15538 | 4 |
| `rLexiconPage` | function | 15539–15711 | 173 |
| `matchcenterClamp` | function | 15713–15717 | 5 |
| `matchcenterNum` | function | 15718–15721 | 4 |
| `clampScore` | function | 15722–15725 | 4 |
| `getScoreLabel` | function | 15726–15734 | 9 |
| `buildConfidence` | function | 15735–15780 | 46 |
| `confidenceCautiousText` | function | 15781–15784 | 4 |
| `explainScore` | function | 15785–15799 | 15 |
| `p1NarrativeKey` | function | 15800–15802 | 3 |
| `scoreNarrative` | function | 15803–15821 | 19 |
| `rankNarratives` | function | 15822–15835 | 14 |
| `getEmptyState` | function | 15836–15847 | 12 |
| `rEmptyState` | function | 15848–15851 | 4 |
| `rScoreBreakdown` | function | 15852–15867 | 16 |
| `matchcenterFmt` | function | 15868–15872 | 5 |
| `matchcenterSigned` | function | 15873–15877 | 5 |
| `matchcenterDateValue` | function | 15878–15882 | 5 |
| `matchcenterDateLabel` | function | 15883–15887 | 5 |
| `matchcenterSortGamesAsc` | function | 15888–15892 | 5 |
| `matchcenterSeasonKeys` | function | 15893–15896 | 4 |
| `matchcenterSeasonLabel` | function | 15897–15899 | 3 |
| `matchcenterSeasonIsUlmTuebingenSgEra` | function | 15900–15903 | 4 |
| `teamAliasSeasonMatches` | function | 15912–15917 | 6 |
| `normalizeTeamKey` | function | 15918–15920 | 3 |
| `teamAliasRuleMatches` | function | 15921–15925 | 5 |
| `isOwnTeam` | function | 15926–15936 | 11 |
| `getCanonicalTeamName` | function | 15937–15942 | 6 |
| `getOpponentAliasKeys` | function | 15943–15963 | 21 |
| `dedupeGamesById` | function | 15964–15972 | 9 |
| `matchcenterIsFreiburgTuebingenTeamName` | function | 15973–15979 | 7 |
| `matchcenterIsUlmTeamName` | function | 15980–15982 | 3 |
| `normalizeTeamNameForMatchcenter` | function | 15983–15987 | 5 |
| `matchcenterDetectUlmSide` | function | 15988–15994 | 7 |
| `matchcenterSeasonHasGames` | function | 15995–15997 | 3 |
| `matchcenterDefaultSeasonKey` | function | 15998–16003 | 6 |
| `matchcenterTeamDisplay` | function | 16004–16006 | 3 |
| `matchcenterTeamKey` | function | 16007–16011 | 5 |
| `matchcenterAliasModeForContext` | function | 16012–16014 | 3 |
| `getOpponentAliasKeysForMatchcenter` | function | 16015–16040 | 26 |
| `matchcenterGameTeamName` | function | 16041–16043 | 3 |
| `matchcenterGameSideForTeam` | function | 16044–16051 | 8 |
| `matchcenterGameSideForOpponentKey` | function | 16052–16062 | 11 |
| `matchcenterGameScore` | function | 16063–16066 | 4 |
| `matchcenterOutcomeForTeam` | function | 16067–16075 | 9 |
| `matchcenterAllGamesForSeason` | function | 16076–16095 | 20 |
| `matchcenterAllGames` | function | 16096–16098 | 3 |
| `matchcenterOpponentMode` | function | 16099–16101 | 3 |
| `getMatchcenterOpponents` | function | 16102–16134 | 33 |
| `getMatchcenterDirectOpponents` | function | 16135–16165 | 31 |
| `matchcenterDirectGames` | function | 16166–16179 | 14 |
| `matchcenterContextGames` | function | 16180–16185 | 6 |
| `matchcenterAnalyzeDirect` | function | 16186–16222 | 37 |
| `matchcenterAnalyzeForm` | function | 16223–16248 | 26 |
| `matchcenterGameKey` | function | 16249–16251 | 3 |
| `matchcenterScoutingGames` | function | 16252–16266 | 15 |
| `matchcenterRosterPlayers` | function | 16267–16270 | 4 |
| `matchcenterPlayerDisplayName` | function | 16271–16276 | 6 |
| `matchcenterFindRosterPlayer` | function | 16277–16281 | 5 |
| `matchcenterPlayerKey` | function | 16282–16287 | 6 |
| `matchcenterEventNumber` | function | 16288–16292 | 5 |
| `matchcenterPenaltyMinutes` | function | 16293–16302 | 10 |
| `matchcenterGoalMinute` | function | 16303–16308 | 6 |
| `matchcenterIsLateGoalEvent` | function | 16309–16313 | 5 |
| `matchcenterIsClutchGoalEvent` | function | 16314–16324 | 11 |
| `matchcenterEnsureOpponentPlayer` | function | 16325–16348 | 24 |
| `matchcenterRegisterPlayerGame` | function | 16349–16351 | 3 |
| `matchcenterAddScoring` | function | 16352–16368 | 17 |
| `matchcenterFinalizeOpponentPlayerProfiles` | function | 16369–16415 | 47 |
| `matchcenterBuildOpponentScouting` | function | 16416–16487 | 72 |
| `matchcenterBuildOpponentPlayerInsights` | function | 16488–16501 | 14 |
| `matchcenterEmptyBuckets` | function | 16502–16504 | 3 |
| `matchcenterUlmScoutingConfidence` | function | 16505–16509 | 5 |
| `matchcenterEnsureUlmPlayer` | function | 16510–16547 | 38 |
| `matchcenterRegisterUlmProfileGame` | function | 16548–16553 | 6 |
| `matchcenterUpdateUlmSeasonRow` | function | 16554–16560 | 7 |
| `matchcenterClassifyUlmGoalEvent` | function | 16561–16571 | 11 |
| `matchcenterAddUlmScoring` | function | 16572–16609 | 38 |
| `matchcenterFinalizeUlmPlayers` | function | 16610–16678 | 69 |
| `matchcenterBuildUlmPlayerScouting` | function | 16679–16733 | 55 |
| `matchcenterBuildUlmPlayerInsights` | function | 16734–16746 | 13 |
| `matchcenterDuoPairKey` | function | 16747–16750 | 4 |
| `matchcenterEnsureOpponentDuo` | function | 16751–16783 | 33 |
| `matchcenterDuoDirectionLabel` | function | 16784–16790 | 7 |
| `matchcenterAddDuoConnection` | function | 16791–16809 | 19 |
| `matchcenterFinalizeOpponentDuos` | function | 16810–16844 | 35 |
| `matchcenterBuildOpponentDuos` | function | 16845–16889 | 45 |
| `matchcenterBuildOpponentDuoInsights` | function | 16890–16903 | 14 |
| `matchcenterEnsureUlmDuo` | function | 16904–16941 | 38 |
| `matchcenterAddUlmDuoConnection` | function | 16942–16960 | 19 |
| `matchcenterFinalizeUlmDuos` | function | 16961–16996 | 36 |
| `matchcenterBuildUlmDuos` | function | 16997–17039 | 43 |
| `matchcenterBuildUlmDuoInsights` | function | 17040–17052 | 13 |
| `matchcenterDirectContextGames` | function | 17053–17055 | 3 |
| `matchcenterSpecialTeamsForGame` | function | 17056–17059 | 4 |
| `matchcenterPersonalPenaltyMinutesForSide` | function | 17060–17068 | 9 |
| `matchcenterPct` | function | 17069–17072 | 4 |
| `matchcenterBuildSpecialTeamsMatchup` | function | 17073–17120 | 48 |
| `matchcenterGoalieKey` | function | 17121–17125 | 5 |
| `matchcenterGoalieFitScore` | function | 17126–17142 | 17 |
| `matchcenterBuildGoalieMatchup` | function | 17143–17185 | 43 |
| `matchcenterGoalAbsSeconds` | function | 17186–17193 | 8 |
| `matchcenterTimeValue` | function | 17194–17201 | 8 |
| `matchcenterEmptyTimingStats` | function | 17202–17210 | 9 |
| `matchcenterWindowForSecond` | function | 17211–17217 | 7 |
| `matchcenterTimingStatsForGames` | function | 17218–17254 | 37 |
| `matchcenterBuildTimingInsights` | function | 17255–17265 | 11 |
| `matchcenterBuildTimingAnalysis` | function | 17266–17276 | 11 |
| `rMatchcenterTimeBars` | function | 17277–17290 | 14 |
| `rMatchcenterTimingStatsCard` | function | 17291–17310 | 20 |
| `rMatchcenterTiming` | function | 17311–17334 | 24 |
| `rMatchcenterTabs` | function | 17350–17352 | 3 |
| `rMatchcenterProfileSection` | function | 17353–17372 | 20 |
| `rMatchcenterFormSection` | function | 17373–17398 | 26 |
| `rMatchcenterDetailsSection` | function | 17399–17406 | 8 |
| `matchcenterResultClass` | function | 17407–17409 | 3 |
| `matchcenterResultLetter` | function | 17410–17412 | 3 |
| `matchcenterUlmTeamLabelForGame` | function | 17413–17417 | 5 |
| `matchcenterGameLine` | function | 17418–17423 | 6 |
| `matchcenterFormLine` | function | 17424–17428 | 5 |
| `matchcenterBuildInsights` | function | 17429–17449 | 21 |
| `rMatchcenterKpi` | function | 17450–17456 | 7 |
| `rMatchcenterFormCard` | function | 17457–17477 | 21 |
| `rMatchcenterGamesList` | function | 17478–17489 | 12 |
| `rMatchcenterWatchCard` | function | 17490–17510 | 21 |
| `rMatchcenterPlayerRow` | function | 17511–17534 | 24 |
| `rMatchcenterRankCard` | function | 17535–17540 | 6 |
| `rMatchcenterUlmImpactCard` | function | 17541–17569 | 29 |
| `rMatchcenterUlmPlayerRow` | function | 17570–17593 | 24 |
| `rMatchcenterUlmRankCard` | function | 17594–17599 | 6 |
| `rMatchcenterUlmScouting` | function | 17600–17636 | 37 |
| `rMatchcenterOpponentScouting` | function | 17637–17672 | 36 |
| `rMatchcenterPlayersTab` | function | 17673–17675 | 3 |
| `rMatchcenterDuoWatchCard` | function | 17676–17695 | 20 |
| `rMatchcenterDuoRow` | function | 17696–17719 | 24 |
| `rMatchcenterDuoRankCard` | function | 17720–17725 | 6 |
| `rMatchcenterUlmDuoWatchCard` | function | 17726–17751 | 26 |
| `rMatchcenterUlmDuoRow` | function | 17752–17774 | 23 |
| `rMatchcenterUlmDuoRankCard` | function | 17775–17780 | 6 |
| `rMatchcenterUlmDuos` | function | 17781–17823 | 43 |
| `rMatchcenterOpponentDuos` | function | 17824–17866 | 43 |
| `rMatchcenterDuosTab` | function | 17867–17869 | 3 |
| `rMatchcenterSpecialCard` | function | 17870–17878 | 9 |
| `rMatchcenterSpecialTeams` | function | 17879–17928 | 50 |
| `rMatchcenterGoalieCard` | function | 17929–17952 | 24 |
| `rMatchcenterGoalieMatchup` | function | 17953–17981 | 29 |
| `matchcenterPlanScoreText` | function | 17982–17985 | 4 |
| `matchcenterPlanRateText` | function | 17986–17990 | 5 |
| `matchcenterPriorityLabel` | function | 17991–17993 | 3 |
| `matchcenterConfidenceClass` | function | 17994–17999 | 6 |
| `matchcenterInferPriority` | function | 18000–18006 | 7 |
| `matchcenterAddPlanItem` | function | 18007–18012 | 6 |
| `matchcenterAddPlanWatch` | function | 18013–18018 | 6 |
| `matchcenterBuildPlanConfidence` | function | 18019–18053 | 35 |
| `matchcenterIntelCurve` | function | 18054–18059 | 6 |
| `matchcenterIntelInverseCurve` | function | 18060–18063 | 4 |
| `matchcenterIntelWeighted` | function | 18064–18074 | 11 |
| `matchcenterIntelRate` | function | 18075–18078 | 4 |
| `matchcenterIntelPct` | function | 18079–18082 | 4 |
| `matchcenterIntelPriorityFromScore` | function | 18083–18088 | 6 |
| `matchcenterIntelPriorityClass` | function | 18089–18094 | 6 |
| `matchcenterIntelPriorityLabel` | function | 18095–18098 | 4 |
| `matchcenterIntelDataLabel` | function | 18099–18101 | 3 |
| `matchcenterBuildIntelligenceDataQuality` | function | 18102–18152 | 51 |
| `matchcenterBuildOpponentDNA` | function | 18153–18265 | 113 |
| `matchcenterDeriveOpponentType` | function | 18266–18283 | 18 |
| `matchcenterIntelPlayerRef` | function | 18284–18296 | 13 |
| `matchcenterIntelDuoRef` | function | 18297–18310 | 14 |
| `matchcenterIntelAddAlarm` | function | 18311–18331 | 21 |
| `matchcenterBuildOpponentAlarm` | function | 18332–18441 | 110 |
| `matchcenterBuildIntelListFromPlan` | function | 18442–18450 | 9 |
| `matchcenterBuildCoachHints` | function | 18451–18466 | 16 |
| `matchcenterBuildIntelHeadline` | function | 18467–18474 | 8 |
| `matchcenterBuildOneThingToWatch` | function | 18475–18487 | 13 |
| `matchcenterBuildIntelligenceSignals` | function | 18488–18534 | 47 |
| `buildMatchIntelligenceFromContext` | function | 18535–18589 | 55 |
| `buildMatchIntelligence` | function | 18590–18611 | 22 |
| `matchcenterCoachCautious` | function | 18612–18614 | 3 |
| `matchcenterCoachAdd` | function | 18615–18623 | 9 |
| `matchcenterCoachGameModel` | function | 18624–18637 | 14 |
| `buildMatchStories` | function | 18638–18667 | 30 |
| `matchcenterCoachPriorityFromAlarm` | function | 18668–18677 | 10 |
| `matchcenterBuildCoachPriorities` | function | 18678–18684 | 7 |
| `matchcenterBuildCoachLevers` | function | 18685–18694 | 10 |
| `matchcenterBuildCoachDangerPatterns` | function | 18695–18702 | 8 |
| `matchcenterBuildCoachIfThen` | function | 18703–18712 | 10 |
| `matchcenterBuildCoachAvoidList` | function | 18713–18722 | 10 |
| `matchcenterBuildCoachActivationHints` | function | 18723–18729 | 7 |
| `matchcenterBuildCoachKeyActors` | function | 18730–18737 | 8 |
| `buildDigitalCoachReport` | function | 18738–18770 | 33 |
| `buildLockerRoomSheet` | function | 18771–18791 | 21 |
| `matchcenterSocialAdd` | function | 18792–18798 | 7 |
| `matchcenterSocialCaption` | function | 18799–18804 | 6 |
| `socialSentence` | function | 18805–18807 | 3 |
| `socialEnsurePeriod` | function | 18808–18811 | 4 |
| `socialFirstUseful` | function | 18812–18814 | 3 |
| `socialPlayerFocusLine` | function | 18815–18821 | 7 |
| `socialDuoFocusLine` | function | 18822–18827 | 6 |
| `socialOpponentLine` | function | 18828–18831 | 4 |
| `socialKeyFactLine` | function | 18832–18841 | 10 |
| `buildMatchdayCaptionBlocks` | function | 18842–18871 | 30 |
| `buildSocialMediaContent` | function | 18872–18920 | 49 |
| `isSyntheticLineupPlayerId` | function | 18926–18928 | 3 |
| `getSyntheticLineupPlayers` | function | 18929–18931 | 3 |
| `getSyntheticLineupRow` | function | 18932–18948 | 17 |
| `getSyntheticLineupRows` | function | 18949–18951 | 3 |
| `getLineupAllRows` | function | 18952–18954 | 3 |
| `lineupRowMeta` | function | 18955–18962 | 8 |
| `getLineupPlayerPool` | function | 18963–18971 | 9 |
| `lineupScore` | function | 18972–18977 | 6 |
| `lineupAverage` | function | 18978–18981 | 4 |
| `lineupLevelLabel` | function | 18982–18985 | 4 |
| `lineupRosterGamesForPlayer` | function | 18988–19035 | 48 |
| `buildLineupExperienceProfile` | function | 19036–19078 | 43 |
| `lineupOpponentDNAForContext` | function | 19079–19090 | 12 |
| `buildLineupOpponentDNAFit` | function | 19091–19134 | 44 |
| `classifyLineIdentity` | function | 19135–19182 | 48 |
| `lineupPlayerProfile` | function | 19183–19258 | 76 |
| `buildLineupAnalysis` | function | 19259–19392 | 134 |
| `buildLineupScoreBreakdowns` | function | 19393–19422 | 30 |
| `buildLineupIntelligence` | function | 19423–19433 | 11 |
| `buildLineAnalysis` | function | 19434–19436 | 3 |
| `lineupRowMap` | function | 19437–19439 | 3 |
| `lineupRankCandidateIds` | function | 19440–19454 | 15 |
| `lineupCombinationIds` | function | 19455–19468 | 14 |
| `lineupStdDev` | function | 19469–19474 | 6 |
| `lineupRoleDnaComplementScore` | function | 19475–19498 | 24 |
| `lineupDirectChemistryScore` | function | 19499–19505 | 7 |
| `lineupEvaluateComplementCandidate` | function | 19506–19583 | 78 |
| `lineupPlayerAnchorScore` | function | 19584–19601 | 18 |
| `buildTeamLineBalance` | function | 19602–19645 | 44 |
| `buildBalancedLineupSet` | function | 19646–19670 | 25 |
| `lineupRecommendationReason` | function | 19671–19679 | 9 |
| `buildLineupRecommendations` | function | 19680–19758 | 79 |
| `recommendLineComplements` | function | 19759–19786 | 28 |
| `matchcenterBuildMatchPlan` | function | 19787–19932 | 146 |
| `rMatchcenterPlanItems` | function | 19933–19950 | 18 |
| `rMatchcenterPlanWatch` | function | 19951–19966 | 16 |
| `rMatchcenterOpponentDNA` | function | 19967–19999 | 33 |
| `rMatchcenterOpponentAlarm` | function | 20000–20021 | 22 |
| `rMatchcenterIntelOverview` | function | 20022–20067 | 46 |
| `rMatchcenterIntelCoachHints` | function | 20068–20081 | 14 |
| `rMatchcenterCoachCardList` | function | 20082–20095 | 14 |
| `rMatchcenterCoachIfThen` | function | 20096–20103 | 8 |
| `rMatchcenterCoachSimpleList` | function | 20104–20108 | 5 |
| `rMatchcenterDigitalCoach` | function | 20109–20173 | 65 |
| `rMatchcenterCopyButton` | function | 20174–20178 | 5 |
| `rMatchcenterLockerList` | function | 20179–20190 | 12 |
| `rMatchcenterLockerRoomSheet` | function | 20191–20246 | 56 |
| `rMatchcenterSocialBlock` | function | 20247–20254 | 8 |
| `matchcenterStoryDownloadFileName` | function | 20255–20264 | 10 |
| `downloadMatchdayStory` | window | 20265–20312 | 48 |
| `rSocialVideoBlock` | function | 20316–20341 | 26 |
| `generateSocialVideoStandbilder` | window | 20342–20365 | 24 |
| `rMatchcenterSocialMediaCenter` | function | 20366–20419 | 54 |
| `rLineupScoreRows` | function | 20420–20441 | 22 |
| `rLineupSimpleCards` | function | 20442–20450 | 9 |
| `rMatchcenterLineupBuilder` | function | 20451–20523 | 73 |
| `rLineupMetricPills` | function | 20524–20537 | 14 |
| `rLineupBuilderAvailablePanel` | function | 20538–20585 | 48 |
| `rLineupRecommendationCards` | function | 20586–20600 | 15 |
| `rLineupRecommendationMode` | function | 20601–20634 | 34 |
| `rLineupComplementCards` | function | 20635–20647 | 13 |
| `rLineupTestLine` | function | 20648–20696 | 49 |
| `rLineupTestMode` | function | 20697–20713 | 17 |
| `rLineupBuilderPage` | function | 20714–20747 | 34 |
| `rMatchcenterScoutingSummary` | function | 20748–20791 | 44 |
| `rMatchcenterMatchPlan` | function | 20792–20812 | 21 |
| `matchcenterStoryInitials` | function | 20814–20819 | 6 |
| `matchcenterStoryLogoBase` | function | 20820–20825 | 6 |
| `matchcenterStorySafeLogoUrl` | function | 20826–20832 | 7 |
| `matchcenterStoryTeamAssetKey` | function | 20840–20844 | 5 |
| `getTeamLogoUrlForStory` | function | 20845–20874 | 30 |
| `matchcenterStoryLogoForOpponent` | function | 20875–20889 | 15 |
| `matchcenterStoryTableRank` | function | 20890–20900 | 11 |
| `matchcenterStoryUlmTableRank` | function | 20901–20907 | 7 |
| `matchcenterStoryRankText` | function | 20908–20911 | 4 |
| `matchcenterStoryInlineStat` | function | 20912–20914 | 3 |
| `matchcenterStoryShortTeamLabel` | function | 20915–20938 | 24 |
| `matchcenterStoryRankRows` | function | 20939–20950 | 12 |
| `matchcenterStoryFormLetters` | function | 20951–20953 | 3 |
| `matchcenterStoryPlayer` | function | 20954–20986 | 33 |
| `matchcenterStoryAddFact` | function | 20987–20993 | 7 |
| `matchcenterStoryFactKey` | function | 20994–20996 | 3 |
| `matchcenterStoryLooksArtificial` | function | 20997–20999 | 3 |
| `matchcenterStoryEstimateFactWeight` | function | 21000–21005 | 6 |
| `matchcenterStoryAddCandidate` | function | 21006–21028 | 23 |
| `matchcenterStoryCategoryLimit` | function | 21029–21032 | 4 |
| `matchcenterStoryNormalizePickOptions` | function | 21033–21043 | 11 |
| `matchcenterStoryCandidateForBudget` | function | 21044–21053 | 10 |
| `matchcenterStoryPickFactItems` | function | 21054–21106 | 53 |
| `matchcenterStoryPickFacts` | function | 21107–21109 | 3 |
| `matchcenterStoryFormRecord` | function | 21110–21115 | 6 |
| `matchcenterStoryCurrentStreak` | function | 21116–21124 | 9 |
| `matchcenterStoryWinlessStreak` | function | 21125–21133 | 9 |
| `matchcenterStoryFormFact` | function | 21134–21144 | 11 |
| `matchcenterStoryFormFactCandidates` | function | 21145–21164 | 20 |
| `matchcenterStoryLateGoalsForOutcome` | function | 21165–21168 | 4 |
| `matchcenterStoryClutchFact` | function | 21169–21183 | 15 |
| `matchcenterStoryPlayerClutchTotal` | function | 21184–21191 | 8 |
| `matchcenterStoryBestClutchPlayer` | function | 21192–21201 | 10 |
| `matchcenterStoryPlayerClutchFact` | function | 21202–21227 | 26 |
| `matchcenterStoryDuoClutchTotal` | function | 21228–21235 | 8 |
| `matchcenterStoryBestClutchDuo` | function | 21236–21245 | 10 |
| `matchcenterStoryDuoClutchFact` | function | 21246–21248 | 3 |
| `matchcenterStoryDuoFact` | function | 21249–21269 | 21 |
| `matchcenterStoryClutchPriority` | function | 21270–21272 | 3 |
| `matchcenterStoryCompetitionLabel` | function | 21273–21276 | 4 |
| `matchcenterStoryShortDuel` | function | 21277–21281 | 5 |
| `matchcenterStoryLastDuelLabel` | function | 21282–21285 | 4 |
| `matchcenterStoryDirectFactCandidates` | function | 21286–21307 | 22 |
| `matchcenterStoryPlanFactCandidates` | function | 21308–21320 | 13 |
| `matchcenterStoryCategoryForPlanFact` | function | 21321–21329 | 9 |
| `buildMatchcenterStoryPreviewData` | function | 21330–21441 | 112 |
| `matchcenterStoryNameClass` | function | 21442–21447 | 6 |
| `matchcenterStoryVisibleFacts` | function | 21448–21478 | 31 |
| `rMatchcenterStoryLogo` | function | 21479–21483 | 5 |
| `rMatchcenterStoryForm` | function | 21484–21488 | 5 |
| `rMatchcenterStoryPlayerCard` | function | 21489–21496 | 8 |
| `rMatchcenterStoryPreview` | function | 21497–21566 | 70 |
| `rMatchcenterStoryFrame` | function | 21567–21572 | 6 |
| `fitMatchcenterStoryLayout` | function | 21573–21615 | 43 |
| `socialVideoDistributeSceneDurations` | function | 21665–21696 | 32 |
| `socialVideoFitText` | function | 21702–21711 | 10 |
| `socialVideoCheckFonts` | function | 21717–21727 | 11 |
| `probeSocialVideoExportCapability` | function | 21736–21751 | 16 |
| `ensureSocialVideoExportCapabilityChecked` | function | 21757–21761 | 5 |
| `socialVideoUlmGamesForMatchday` | function | 21766–21771 | 6 |
| `socialVideoTableRank` | function | 21773–21777 | 5 |
| `socialVideoFormAsOf` | function | 21781–21786 | 6 |
| `socialVideoLastDuelAsOf` | function | 21790–21796 | 7 |
| `socialVideoTopScorerAsOf` | function | 21802–21831 | 30 |
| `socialVideoOpponentSceneData` | function | 21834–21881 | 48 |
| `socialVideoFileName` | function | 21885–21891 | 7 |
| `socialVideoMatchdayLabel` | function | 21893–21895 | 3 |
| `socialVideoBuildStorySpec` | function | 21898–21949 | 52 |
| `socialVideoBuildFeedSpec` | function | 21952–22001 | 50 |
| `buildSocialVideoSpec` | function | 22011–22026 | 16 |
| `socialVideoStoryFrameData` | function | 22040–22073 | 34 |
| `rSocialVideoFeedFrame` | function | 22077–22113 | 37 |
| `socialVideoStandbildFrame` | function | 22116–22119 | 4 |
| `socialVideoXmlSafeHtml` | function | 22128–22130 | 3 |
| `downloadSocialVideoStandbild` | window | 22136–22186 | 51 |
| `rMatchcenterPage` | function | 22188–22335 | 148 |
| `rTeamPage` | function | 22336–22646 | 311 |
| `exportExcel` | function | 22651–22672 | 22 |
| `render` | function | 22678–22695 | 18 |
| `_render` | function | 22696–22860 | 165 |
| `uiFormatNumber` | function | 22894–22898 | 5 |
| `uiReliabilityDots` | function | 22907–22914 | 8 |
| `uiDeltaIndicator` | function | 22922–22928 | 7 |
| `uiInfoIcon` | function | 22940–22944 | 5 |
| `uiKennzahlKachel` | function | 22952–22963 | 12 |
| `uiKernaussage` | function | 22972–22978 | 7 |
| `uiHinweisKarte` | function | 22986–22998 | 13 |
| `uiRangliste` | function | 23008–23025 | 18 |
| `uiVerlauf` | function | 23036–23055 | 20 |
| `uiIntervallBalken` | function | 23062–23074 | 13 |
| `uiMethodenbox` | function | 23081–23090 | 10 |
| `uiNotiz` | function | 23098–23102 | 5 |
| `uiPlatzhalter` | function | 23110–23115 | 6 |
| `uiObjektseiteSortTabs` | function | 23160–23168 | 9 |
| `uiObjektseite` | function | 23178–23211 | 34 |
| `mainNavActiveKeyForPage` | function | 23268–23273 | 6 |
| `goToMainNavPoint` | window | 23274–23280 | 7 |
| `rMainNav` | function | 23281–23285 | 5 |
| `rMainNavBottom` | function | 23303–23310 | 8 |
| `openOverview` | window | 23320–23328 | 9 |
| `switchOverviewSeason` | window | 23337–23343 | 7 |
| `openMatchdayTimeline` | window | 23371–23378 | 8 |
| `openMatchday` | window | 23379–23388 | 10 |
| `switchMatchdaySeason` | window | 23390–23395 | 6 |
| `matchdayUlmGames` | function | 23397–23399 | 3 |
| `matchdayGameCardHtml` | function | 23400–23410 | 11 |
| `rMatchdayTimelineRow` | function | 23412–23419 | 8 |
| `rMatchdayTimelinePage` | function | 23420–23430 | 11 |
| `rMatchdayDetailPage` | function | 23431–23466 | 36 |
| `rMatchdayPage` | function | 23467–23473 | 7 |
| `overviewMatchdayStartMs` | function | 23492–23497 | 6 |
| `overviewMatchdayEndMs` | function | 23498–23503 | 6 |
| `detectOverviewPhase` | function | 23504–23529 | 26 |
| `getSeasonDataState` | function | 23536–23546 | 11 |
| `parseSeasonDataState` | function | 23547–23555 | 9 |
| `isNewSeasonDataState` | function | 23557–23559 | 3 |
| `recordOverviewVisit` | function | 23566–23575 | 10 |
| `overviewOpponentLabel` | function | 23576–23580 | 5 |
| `overviewLastMatchdayText` | function | 23581–23584 | 4 |
| `overviewNextMatchdayHtml` | function | 23585–23589 | 5 |
| `overviewCompactTableHtml` | function | 23597–23603 | 7 |
| `overviewFormHtml` | function | 23605–23619 | 15 |
| `overviewSeasonBilanzHtml` | function | 23620–23626 | 7 |
| `overviewSeasonAwardHtml` | function | 23628–23637 | 10 |
| `overviewRecordHtml` | function | 23639–23644 | 6 |
| `overviewCrossSeasonTrendHtml` | function | 23646–23654 | 9 |
| `overviewOpponentPreviewHtml` | function | 23655–23659 | 5 |
| `overviewMatchcenterLinkHtml` | function | 23660–23662 | 3 |
| `overviewLineupLinkHtml` | function | 23663–23665 | 3 |
| `overviewRankChangeTile` | function | 23682–23699 | 18 |
| `buildOverviewCards` | function | 23708–23748 | 41 |
| `rOverviewPage` | function | 23758–23769 | 12 |
| `openLigaGegner` | window | 23770–23773 | 4 |
| `rLigaGegnerPlaceholderPage` | function | 23774–23779 | 6 |
| `rAsOfSelector` | function | 23791–23803 | 13 |
| `setContextAsOf` | window | 23804–23815 | 12 |
| `rSeasonDataPreviewContextHint` | function | 23826–23834 | 9 |
| `rSeasonDataStateContextHint` | function | 23843–23849 | 7 |
| `rContextBar` | function | 23874–23892 | 19 |
| `rIaShell` | function | 23894–23896 | 3 |
| `globalSearchTokens` | function | 23913–23916 | 4 |
| `globalSearchEntries` | function | 23918–23931 | 14 |
| `globalSearchPlayerScore` | function | 23932–23939 | 8 |
| `globalSearchMatchdayScore` | function | 23941–23953 | 13 |
| `globalSearchMatch` | function | 23955–23966 | 12 |
| `globalSearchIsEditableTarget` | function | 23967–23971 | 5 |
| `globalSearchKeyAction` | function | 23973–23987 | 15 |
| `rGlobalSearchToggle` | function | 23988–23990 | 3 |
| `rGlobalSearchResultsHtml` | function | 23991–24001 | 11 |
| `rGlobalSearchPanelHtml` | function | 24002–24004 | 3 |
| `paintGlobalSearchResults` | function | 24005–24012 | 8 |
| `openGlobalSearch` | window | 24013–24037 | 25 |
| `closeGlobalSearch` | window | 24038–24045 | 8 |
| `onGlobalSearchInput` | window | 24046–24051 | 6 |
| `moveGlobalSearch` | function | 24052–24057 | 6 |
| `activateGlobalSearchResult` | window | 24058–24067 | 10 |
| `globalSearchOnKeydown` | function | 24068–24089 | 22 |
| `initGlobalSearch` | function | 24090–24094 | 5 |
| `rToolMenu` | function | 24116–24119 | 4 |
| `toolMenuElements` | function | 24120–24122 | 3 |
| `toolMenuItemElements` | function | 24123–24125 | 3 |
| `isToolMenuOpen` | function | 24126–24129 | 4 |
| `openToolMenu` | window | 24130–24137 | 8 |
| `closeToolMenu` | window | 24138–24144 | 7 |
| `toggleToolMenu` | window | 24145–24148 | 4 |
| `activateToolMenuItem` | window | 24149–24156 | 8 |
| `toolMenuOnKeydown` | function | 24157–24180 | 24 |
| `toolMenuOnClick` | function | 24181–24187 | 7 |
| `initToolMenu` | function | 24188–24191 | 4 |

## Alphabetisches Register

| Name | Art | Zeile |
|---|---|---|
| `_render` | function | 22696 |
| `acceptEinsatzCenterRosterSuggestion` | window | 7951 |
| `activateGlobalSearchResult` | window | 24058 |
| `activateToolMenuItem` | window | 24149 |
| `addComparisonDuo` | window | 13464 |
| `addComparisonDuoFromSelection` | window | 13456 |
| `addComparisonItem` | window | 13364 |
| `addDuoTeamGame` | function | 11476 |
| `addEinsatzCenterExistingGroup` | window | 7968 |
| `addEinsatzCenterGroupPlayer` | window | 8036 |
| `addEinsatzCenterNewGroup` | window | 7977 |
| `addEinsatzCenterRosterPlayer` | window | 7917 |
| `addGoalieGameToStats` | function | 4812 |
| `addGoalieSpecialTeamsGameToStats` | function | 4782 |
| `addLineupBuilderPlayerToActiveLine` | window | 2310 |
| `addLineupBuilderPlayerToLine` | window | 2300 |
| `addLineupPlayer` | window | 2246 |
| `addRosterImpactGameToStats` | function | 11993 |
| `addSelectedComparisonItem` | window | 13372 |
| `addSyntheticLineupPlayer` | window | 2326 |
| `addUnique` | function | 3999 |
| `aggregateAllTimeDuos` | function | 5155 |
| `aggregateAllTimePlayers` | function | 4266 |
| `aggregateAlltimeSpecialTeams` | function | 4762 |
| `aggregateGoalieAlltimeStats` | function | 4995 |
| `aggregateSeasonStats` | function | 5167 |
| `analysisCacheContext` | function | 2152 |
| `analysisCacheKey` | function | 2186 |
| `annotateSpecialTeamsGoalEvent` | function | 4544 |
| `antiSynergyDeltaClass` | function | 12160 |
| `antiSynergyImpactScore` | function | 12075 |
| `antiSynergyPartnerIsSgOnly` | function | 12190 |
| `antiSynergySigned` | function | 12164 |
| `appendSeasonGameDiagnostics` | function | 2663 |
| `applyAppHash` | function | 3766 |
| `applyCurrentSeasonCoverHighlight` | function | 6421 |
| `applyGlobalPageFromHash` | function | 3733 |
| `applySeasonContext` | function | 2415 |
| `applySeasonScoringToRegistry` | function | 4157 |
| `asOfCacheKeyPart` | function | 2180 |
| `asOfEquals` | function | 3437 |
| `assignStatus` | function | 6005 |
| `avgOrNull` | function | 4304 |
| `backToComparisonModeSelect` | window | 13392 |
| `backToHome` | window | 2363 |
| `buildAlltimePlayerDashModel` | function | 14517 |
| `buildAnnotatedGoalEventsForGame` | function | 11082 |
| `buildAppHash` | function | 3583 |
| `buildBalancedLineupSet` | function | 19646 |
| `buildBestThirdManOptions` | function | 10970 |
| `buildComparisonDataset` | function | 13833 |
| `buildComparisonExtraMetrics` | function | 13688 |
| `buildComparisonSummary` | function | 14183 |
| `buildConfidence` | function | 15735 |
| `buildDigitalCoachReport` | function | 18738 |
| `buildDirectDuoLookupForPlayer` | function | 10928 |
| `buildDryRunReport` | function | 6645 |
| `buildDuoAntiSynergy` | function | 12150 |
| `buildDuoComparison` | function | 13477 |
| `buildDuoCompatibility` | function | 11588 |
| `buildDuoDirectProduction` | function | 11452 |
| `buildDuoFloorCeiling` | function | 11363 |
| `buildDuoGapAnalysis` | function | 11571 |
| `buildDuoNetworkContext` | function | 11547 |
| `buildDuoOpponentAdjusted` | function | 11534 |
| `buildDuoProAnalysis` | function | 11645 |
| `buildDuoReplacementOptions` | function | 11635 |
| `buildDuoUntestedPotential` | function | 11611 |
| `buildDuoUsageRate` | function | 11623 |
| `buildDuoWarnings` | function | 11405 |
| `buildDuoWithWithoutImpact` | function | 11500 |
| `buildEinsatzCenterDraftExport` | function | 8097 |
| `buildFieldPlayerExplanation` | function | 15156 |
| `buildGlobalPageHash` | function | 3600 |
| `buildGoalieAnalysisModel` | function | 9889 |
| `buildGoalieComparisonDataset` | function | 13782 |
| `buildGoalieGameRecord` | function | 4864 |
| `buildGoaliePlayerExplanation` | function | 15231 |
| `buildGoalieRoleProfile` | function | 10112 |
| `buildGoalieStatsForSeason` | function | 4914 |
| `buildHallOfFameIntroTitle` | function | 8796 |
| `buildHashStringFromParsed` | function | 3615 |
| `buildIdentityProfiles` | function | 5727 |
| `buildLineAnalysis` | function | 19434 |
| `buildLineupAnalysis` | function | 19259 |
| `buildLineupExperienceProfile` | function | 19036 |
| `buildLineupIntelligence` | function | 19423 |
| `buildLineupOpponentDNAFit` | function | 19091 |
| `buildLineupRecommendations` | function | 19680 |
| `buildLineupScoreBreakdowns` | function | 19393 |
| `buildLockerRoomSheet` | function | 18771 |
| `buildMatchcenterStoryPreviewData` | function | 21330 |
| `buildMatchdayCaptionBlocks` | function | 18842 |
| `buildMatchdays` | function | 3318 |
| `buildMatchIntelligence` | function | 18590 |
| `buildMatchIntelligenceFromContext` | function | 18535 |
| `buildMatchStories` | function | 18638 |
| `buildMomentumSwingStats` | function | 11357 |
| `buildMomentumSwingStatsRaw` | function | 11286 |
| `buildOpponentIntelligence` | function | 10767 |
| `buildOverviewCards` | function | 23708 |
| `buildPlayerDataFoundation` | function | 5184 |
| `buildPlayerEvents` | function | 5238 |
| `buildPlayerExplanation` | function | 15285 |
| `buildPlayerIdentity` | function | 4010 |
| `buildPlayerIntelligence` | function | 15294 |
| `buildRecencyWeightedGlobalIdentityProfile` | function | 12690 |
| `buildRegistry` | function | 5207 |
| `buildResponseGoalStats` | function | 11274 |
| `buildResponseGoalStatsRaw` | function | 11225 |
| `buildRosterImpactAnalysis` | function | 12090 |
| `buildSeasonDataPreviewChanges` | function | 6750 |
| `buildSeasonDuos` | function | 5111 |
| `buildSeasonPlayerDashModel` | function | 14480 |
| `buildSocialMediaContent` | function | 18872 |
| `buildSocialVideoSpec` | function | 22011 |
| `buildSoloDuoProfile` | function | 5496 |
| `buildSpecialTeamsForGame` | function | 4559 |
| `buildSpecialTeamsForSeason` | function | 4753 |
| `buildStandings` | function | 3877 |
| `buildStaticSeasonDataBlock` | function | 6469 |
| `buildTeamLineBalance` | function | 19602 |
| `cachedAnalysis` | function | 2190 |
| `cancelDuoProPicker` | window | 11843 |
| `cancelEinsatzCenterEdit` | window | 7898 |
| `cancelHallOfFameIntro` | function | 8885 |
| `clampScore` | function | 15722 |
| `classicTagLabel` | function | 9039 |
| `classifyGameForStats` | function | 3159 |
| `classifyLineIdentity` | function | 19135 |
| `cleanText` | function | 2511 |
| `cleanupHallOfFameIntro` | function | 8825 |
| `clearAnalysisCache` | function | 2149 |
| `clearComparison` | window | 13383 |
| `clearComparisonDuos` | window | 13471 |
| `clearLineupAvailable` | window | 2299 |
| `clearLineupBuilderLine` | window | 2318 |
| `clearLineupPlayers` | window | 2253 |
| `clearlyAboveAverage` | function | 5684 |
| `clonePlain` | function | 4401 |
| `closeGlobalSearch` | window | 24038 |
| `closeMatchcenterStoryPreview` | window | 2218 |
| `closeToolMenu` | window | 24138 |
| `clutchText` | function | 5568 |
| `collectAssistEventRefs` | function | 2967 |
| `compareGamesChronologically` | function | 3297 |
| `comparisonDuoContext` | function | 13397 |
| `comparisonEventGameKey` | function | 13675 |
| `comparisonEventPhaseLabel` | function | 13678 |
| `comparisonFmt` | function | 13165 |
| `comparisonItemKey` | function | 13143 |
| `comparisonJsArg` | function | 13154 |
| `comparisonNum` | function | 13157 |
| `comparisonOpponentStrengthTier` | function | 13682 |
| `comparisonPct` | function | 13161 |
| `comparisonPctFmt` | function | 13169 |
| `comparisonVariantValue` | function | 13286 |
| `composeIdentityText` | function | 5959 |
| `computeCurrentAppHash` | function | 3635 |
| `computeEinsatzCenterStats` | function | 7111 |
| `computeMetrics` | function | 5342 |
| `computeRosterStatus` | function | 5985 |
| `confidenceCautiousText` | function | 15781 |
| `confirmDuoProSelection` | window | 11848 |
| `confirmEinsatzCenterCombo` | window | 8069 |
| `copyMatchcenterText` | window | 2220 |
| `countBy` | function | 10514 |
| `countCaptainAppearances` | function | 5967 |
| `countGoalieAppearances` | function | 5981 |
| `countMomentumClusters` | function | 5601 |
| `countPlayedUlmGames` | function | 2887 |
| `createPlayerAnalysisProfile` | function | 3936 |
| `createSeasonBucket` | function | 1774 |
| `decodeCp1252AsUtf8` | function | 2456 |
| `decodeHashSegmentSafe` | function | 3508 |
| `dedupeGamesById` | function | 15964 |
| `dedupeIdentityProfileTags` | function | 12767 |
| `deriveAsOfForSeason` | function | 3233 |
| `deriveLineupUlmPlayerIds` | function | 7608 |
| `deriveLineupValidPlayerIds` | function | 7584 |
| `derivePlayerStatus` | function | 4039 |
| `detectOverviewPhase` | function | 23504 |
| `detectSide` | const-arrow | 2596 |
| `detectTypes` | function | 5476 |
| `detectUlmSide` | function | 2589 |
| `diagnoseGameDuplicates` | function | 2641 |
| `diagnosticError` | function | 6220 |
| `diffGameIds` | function | 6592 |
| `difficultConnectionConfidence` | function | 10904 |
| `discardEinsatzCenterAutosave` | function | 7507 |
| `discardSeasonDataPreview` | function | 6849 |
| `dismissEinsatzCenterRosterSuggestion` | window | 7940 |
| `downloadMatchdayStory` | window | 20265 |
| `downloadSocialVideoStandbild` | window | 22136 |
| `duoProContextSeasonKey` | function | 11427 |
| `duoProDomId` | function | 11804 |
| `duoProPairKey` | function | 11424 |
| `duoProPickerMessage` | function | 11810 |
| `duoProPickerOpen` | function | 11807 |
| `duoProPlayer` | function | 11441 |
| `duoProResolveCandidate` | function | 11823 |
| `duoProSelectionPayload` | function | 11832 |
| `duoScopeSeasonKeys` | function | 10946 |
| `einsatzCenterAutosaveDraft` | function | 7423 |
| `einsatzCenterAutosaveInfoText` | function | 7529 |
| `einsatzCenterAutosaveKey` | function | 7334 |
| `einsatzCenterCanonicalJson` | function | 7667 |
| `einsatzCenterComputeBaseHash` | function | 7682 |
| `einsatzCenterCurrentRawBaseHash` | function | 7409 |
| `einsatzCenterDeserializeAutosave` | function | 7369 |
| `einsatzCenterDraftInView` | function | 7238 |
| `einsatzCenterDraftIsEmpty` | function | 7346 |
| `einsatzCenterDraftStaleHint` | function | 7252 |
| `einsatzCenterInspectAutosave` | function | 7458 |
| `einsatzCenterIsPlainObject` | function | 7363 |
| `einsatzCenterSerializeDraft` | function | 7350 |
| `einsatzCenterSha256Hex` | function | 7677 |
| `einsatzCenterSoftIssues` | function | 7691 |
| `einsatzCenterStorageRead` | function | 7335 |
| `einsatzCenterStorageRemove` | function | 7341 |
| `einsatzCenterStorageWrite` | function | 7338 |
| `emptyDuoTeamImpactStats` | function | 11473 |
| `emptyFieldRoleSeasonStats` | function | 3995 |
| `emptyGoalieAlltimeStats` | function | 3968 |
| `emptyGoalieSeasonStats` | function | 3946 |
| `emptyGoalieSpecialTeamsStats` | function | 3983 |
| `emptyPlayerSeasonStats` | function | 3940 |
| `emptyRosterImpactStats` | function | 11982 |
| `emptySpecialTeamsStats` | function | 4360 |
| `ensureAppLoaded` | function | 8739 |
| `ensureEinsatzCenterDraft` | function | 7274 |
| `ensureExternalSeasonData` | function | 6447 |
| `ensureFieldRoleSeasonStats` | function | 4105 |
| `ensureGlobalDataLoaded` | function | 8667 |
| `ensureGoalieSeasonStats` | function | 4100 |
| `ensureHallOfFameIntroOverlay` | function | 8763 |
| `ensureLineupDataLoaded` | function | 6957 |
| `ensureLineupGroupsRegistryLoaded` | function | 6982 |
| `ensureRmDuo` | function | 11205 |
| `ensureRmPlayer` | function | 11199 |
| `ensureSocialVideoExportCapabilityChecked` | function | 21757 |
| `escAttr` | function | 9012 |
| `escHtml` | function | 12786 |
| `eventMatchesTeams` | function | 5562 |
| `explainScore` | function | 15785 |
| `exportEinsatzCenterDraft` | window | 8111 |
| `exportExcel` | function | 22651 |
| `fallbackIdentityProfile` | function | 9047 |
| `fetchJson` | function | 6264 |
| `fetchJsonLegacy` | function | 6196 |
| `fetchJsonWithDiagnostics` | function | 6255 |
| `fetchSeasonGameRaw` | function | 6290 |
| `fetchTextWithDiagnostics` | function | 6225 |
| `fileNameForLineupSeasonKey` | function | 6939 |
| `filterComparisonDuoSuggestions` | window | 13429 |
| `filterComparisonPlayers` | window | 13340 |
| `filterLineupBuilderAvailable` | window | 2347 |
| `filterLineupPlayers` | window | 2254 |
| `filterPlayerSuggestions` | function | 13404 |
| `filterPureSGPlayers` | function | 9685 |
| `finalizeDuoTeamImpactStats` | function | 11492 |
| `finalizeGoalieSeasonStats` | function | 4797 |
| `finalizeMomentumStats` | function | 11280 |
| `finalizePlayerRegistrySeason` | function | 4180 |
| `finalizeResponseStats` | function | 11211 |
| `finalizeRosterImpactStats` | function | 11985 |
| `finalizeSpecialTeamsStats` | function | 4404 |
| `findDuplicateGameIds` | function | 6511 |
| `findLineupGameContext` | function | 7016 |
| `findLoadedSeasonPlayer` | function | 9648 |
| `finishHallOfFameIntro` | function | 8852 |
| `finiteNumbers` | function | 4301 |
| `fitMatchcenterStoryLayout` | function | 21573 |
| `fixKnownUiTransliterations` | function | 2506 |
| `fixMojibakeText` | function | 2514 |
| `formatDateDE` | function | 3391 |
| `formatDiagnosticAttempt` | function | 6271 |
| `formatGameLoadError` | function | 6284 |
| `formatStatus` | function | 6268 |
| `gameClassificationStatusLabel` | function | 2655 |
| `gameDaySortValue` | function | 4470 |
| `gameResult` | function | 3866 |
| `gameScore` | function | 3129 |
| `gameStableId` | function | 2638 |
| `gameStatusText` | function | 3122 |
| `generatePlayerInsights` | function | 9510 |
| `generateSocialVideoStandbilder` | window | 20342 |
| `getActiveAlltimeSeasonKeys` | function | 10686 |
| `getActiveSeasonKey` | function | 2375 |
| `getAllLoadedSeasonGames` | function | 10879 |
| `getAlltimeAggregatedStyleProfile` | function | 14360 |
| `getAllTimeCoverStats` | function | 8618 |
| `getAllTimeDuoRows` | function | 10834 |
| `getAllTimeDuoRowsForPlayer` | function | 10572 |
| `getAllTimeGamesPlayedRows` | function | 10612 |
| `getAllTimeIdentityStandings` | function | 12654 |
| `getAllTimeMainPlayerRows` | function | 9689 |
| `getAllTimeOpponentIntelligence` | function | 12575 |
| `getAllTimeOpponentNames` | function | 2566 |
| `getAllTimeOpponentTopScorers` | function | 12583 |
| `getAllTimePenaltyRows` | function | 10637 |
| `getAllTimePlayerRows` | function | 9657 |
| `getAlltimeRank` | function | 13099 |
| `getAlltimeRecencyWeight` | function | 10697 |
| `getAllTimeSgOnlyRows` | function | 9692 |
| `getAssistDiagnostics` | function | 5056 |
| `getAssistPlayersFromEvent` | function | 2995 |
| `getCanonicalTeamName` | function | 15937 |
| `getCarryPerformanceRows` | function | 10583 |
| `getComparisonAlltimeTeamGoals` | function | 13190 |
| `getComparisonAlltimeTrend` | function | 13264 |
| `getComparisonChemistryFromEvents` | function | 13198 |
| `getComparisonClutchFromEvents` | function | 13203 |
| `getComparisonCurrentSelection` | function | 13329 |
| `getComparisonEventsForItem` | function | 13647 |
| `getComparisonPlayerOptions` | function | 13271 |
| `getComparisonPlayerRow` | function | 13172 |
| `getComparisonProfile` | function | 13233 |
| `getComparisonRosterGames` | function | 13667 |
| `getComparisonRosterGamesForSeason` | function | 13650 |
| `getComparisonSeasonEvents` | function | 13193 |
| `getComparisonSeasonLabel` | function | 13175 |
| `getComparisonSeasonTrend` | function | 13238 |
| `getComparisonStyleProfile` | function | 13208 |
| `getComparisonTeamGoalsForSeason` | function | 13178 |
| `getComparisonVariantsForPlayer` | function | 13289 |
| `getDifficultConnectionRowsForPlayer` | function | 11937 |
| `getDuoDirectScorerGameCounts` | function | 11001 |
| `getDuoFieldPlayerRows` | function | 11430 |
| `getDuoRowsForPlayerScope` | function | 10909 |
| `getDuoScorerCountsWithCandidate` | function | 10950 |
| `getDuoSharedFieldRows` | function | 11446 |
| `getEffectiveLineupData` | function | 7224 |
| `getEinsatzCenterGameDraft` | function | 7296 |
| `getEmptyState` | function | 15836 |
| `getFieldGameIdsForPlayer` | function | 2796 |
| `getFurtherSameDayUlmGames` | function | 4486 |
| `getGameDurationMinutes` | function | 4465 |
| `getGameId` | function | 6505 |
| `getGlobalAllTimeSnapshot` | function | 2407 |
| `getGlobalIdentityProfile` | function | 12739 |
| `getGlobalLoadableSeasonKeys` | function | 8611 |
| `getGlobalOpponentSpecialistProfile` | function | 14816 |
| `getGlobalPlayerBestSeason` | function | 10565 |
| `getGlobalPlayerMilestones` | function | 10748 |
| `getGlobalPlayerOpponentGameRows` | function | 14787 |
| `getGlobalPlayerPeakGame` | function | 10554 |
| `getGlobalPlayerTeamRecord` | function | 10528 |
| `getGlobalProfileEvents` | function | 10501 |
| `getGlobalRookieMilestone` | function | 10737 |
| `getGlobalRookieSeasonKey` | function | 10723 |
| `getGlobalSeasonStatRows` | function | 13083 |
| `getGlobalTopScorerMilestones` | function | 10710 |
| `getGoalieComparisonAlltimeTrend` | function | 13746 |
| `getGoalieComparisonSeasonTrend` | function | 13763 |
| `getGoalieDiagnostics` | function | 5042 |
| `getGoalieDnaRows` | function | 10190 |
| `getGoalieGameIdsForPlayer` | function | 2803 |
| `getGoalieOpponentName` | function | 4341 |
| `getGoalieOpponentTier` | function | 4345 |
| `getGoalScorerFromEvent` | function | 2961 |
| `getHallGoalieData` | function | 12949 |
| `getHallOfFamePlayerIdSet` | function | 10497 |
| `getHallOfFamePlayerRows` | function | 10494 |
| `getHallOfFameStats` | function | 12609 |
| `getJerseyNumber` | function | 2900 |
| `getLineupAllRows` | function | 18952 |
| `getLineupPlayerPool` | function | 18963 |
| `getLoadedSeasonPlayerUi` | function | 10523 |
| `getLoadedSeasonPointsByName` | function | 10467 |
| `getMatchcenterDirectOpponents` | function | 16135 |
| `getMatchcenterOpponents` | function | 16102 |
| `getOpponentAliasKeys` | function | 15943 |
| `getOpponentAliasKeysForMatchcenter` | function | 16015 |
| `getOppStrength` | function | 3918 |
| `getOrCreatePlayerProfile` | function | 4048 |
| `getPenaltyBasePersonalMinutes` | function | 4501 |
| `getPenaltyDisciplineMinutes` | function | 4519 |
| `getPenaltyDisciplineType` | function | 4457 |
| `getPenaltyPersonalMinutes` | function | 4509 |
| `getPenaltySpecialTeamsMinutes` | function | 4498 |
| `getPhaseIndex` | function | 5327 |
| `getPhaseKey` | function | 3027 |
| `getPlayedUlmGames` | function | 2878 |
| `getPlayerAlltimeFieldGames` | function | 2840 |
| `getPlayerAlltimeGoalieGames` | function | 2843 |
| `getPlayerAlltimeRoleGames` | function | 2821 |
| `getPlayerAlltimeStats` | function | 9700 |
| `getPlayerAlltimeTotalGames` | function | 2846 |
| `getPlayerFieldGames` | function | 2810 |
| `getPlayerGoalieAlltimeStats` | function | 9721 |
| `getPlayerGoalieGames` | function | 2814 |
| `getPlayerGoalieSeasonStats` | function | 9716 |
| `getPlayerRegistryProfile` | function | 9708 |
| `getPlayerRoleAvailability` | function | 9751 |
| `getPlayerSeasonRoleGameSummary` | function | 2855 |
| `getPlayerSeasonStats` | function | 9695 |
| `getPlayerSourceId` | function | 2897 |
| `getPreClubHistoryPlayerNames` | function | 2630 |
| `getPreviousSeasonKey` | function | 10422 |
| `getRelevantSeasonGames` | function | 3201 |
| `getRosterEntryRegistryProfile` | function | 10900 |
| `getRosterGameIdsForPlayer` | function | 2737 |
| `getRosterImpactPlayerEventLookup` | function | 12003 |
| `getRosterImpactPlayerGames` | function | 12024 |
| `getRosterStatus` | function | 10703 |
| `getScoreLabel` | function | 15726 |
| `getSeasonApiBaseUrl` | function | 1799 |
| `getSeasonData` | function | 2378 |
| `getSeasonDataPreview` | function | 6855 |
| `getSeasonDataState` | function | 23536 |
| `getSeasonIdentityProfile` | function | 10657 |
| `getSeasonmanagerRosterSuggestion` | function | 7638 |
| `getSeasonMatchdays` | function | 3368 |
| `getSeasonOriginBaseUrl` | function | 1819 |
| `getSeasonPlayerFieldBasis` | function | 9116 |
| `getSeasonScopedIdentityProfile` | function | 9143 |
| `getSeasonStatsAsOf` | function | 3271 |
| `getSeasonTeamGameIds` | function | 2894 |
| `getSeasonTeamGames` | function | 2890 |
| `getSeasonUiPlayerForProfile` | function | 10653 |
| `getSpecialTeamsDiagnostics` | function | 5049 |
| `getSpecialTeamsPenaltyChunks` | function | 4522 |
| `getStaticSeasonGames` | function | 6354 |
| `getStoredLastView` | function | 3714 |
| `getSyntheticLineupPlayers` | function | 18929 |
| `getSyntheticLineupRow` | function | 18932 |
| `getSyntheticLineupRows` | function | 18949 |
| `getTeamAllTimeRecords` | function | 12533 |
| `getTeamLogoUrlForStory` | function | 20845 |
| `getUlmTeamStatus` | function | 2584 |
| `getUniqueAllTimeOpponentNames` | function | 2574 |
| `globalSearchEntries` | function | 23918 |
| `globalSearchIsEditableTarget` | function | 23967 |
| `globalSearchKeyAction` | function | 23973 |
| `globalSearchMatch` | function | 23955 |
| `globalSearchMatchdayScore` | function | 23941 |
| `globalSearchOnKeydown` | function | 24068 |
| `globalSearchPlayerScore` | function | 23932 |
| `globalSearchTokens` | function | 23913 |
| `goalieApplySampleConfidence` | function | 9874 |
| `goalieBucketLooseSum` | function | 9882 |
| `goalieBucketRows` | function | 9794 |
| `goalieClampScore` | function | 9839 |
| `goalieDetailFirstTime` | function | 9818 |
| `goalieDnaKey` | function | 10099 |
| `goalieDnaValue` | function | 10104 |
| `goalieEntryRecognitionReason` | function | 2760 |
| `goalieEventAbsSeconds` | function | 4318 |
| `goalieEventSecondInPeriod` | function | 9825 |
| `goalieGameDurationSeconds` | function | 4324 |
| `goalieGameStateBeforeGoal` | function | 4329 |
| `goalieInverseScore` | function | 9843 |
| `goalieNum` | function | 9780 |
| `goaliePctText` | function | 9831 |
| `goaliePositiveCurveScore` | function | 9859 |
| `goaliePositiveScore` | function | 9851 |
| `goalieSafeNum` | function | 9835 |
| `goalieStateGoals` | function | 10111 |
| `goalieStdDev` | function | 9812 |
| `goalieTierMeta` | function | 9803 |
| `goalieTime` | function | 9786 |
| `goalieTopRow` | function | 9800 |
| `goalieWeightedScore` | function | 9868 |
| `goToMainNavPoint` | window | 23274 |
| `hallGoalieExplainForLabel` | function | 12986 |
| `hallGoalieNameHtml` | function | 12965 |
| `hallGoalieNum` | function | 12851 |
| `hallGoaliePkStats` | function | 12877 |
| `hallGoalieRowFromStats` | function | 12916 |
| `hallGoalieSeasonLabel` | function | 12865 |
| `hallGoalieSeasonScore` | function | 12896 |
| `hallGoalieTime` | function | 12857 |
| `hallGoalieTooltip` | function | 12982 |
| `hallGoalieTopteamStats` | function | 12889 |
| `handleComparisonDuoSearchKey` | window | 13437 |
| `hasEmbeddedSeasonData` | function | 8608 |
| `hashSegmentToSeasonKey` | function | 3421 |
| `hasSeasonRole` | function | 5711 |
| `hasSeasonSource` | function | 8604 |
| `hofIntroDelay` | function | 8760 |
| `identityClutchGoalsVsTeams` | function | 5592 |
| `identityDecisiveGoalsVsTeams` | function | 5595 |
| `identityGoalsVsTeams` | function | 5589 |
| `identityInputs` | function | 5626 |
| `identityLateGoalsVsTeams` | function | 5598 |
| `identityOpponentGroups` | function | 5554 |
| `identityPartnerStats` | function | 5540 |
| `identityPointsVsTeams` | function | 5586 |
| `incGoalieBucket` | function | 4314 |
| `incrementUniqueCounter` | function | 4003 |
| `initGlobalSearch` | function | 24090 |
| `initHashRouting` | function | 3845 |
| `initToolMenu` | function | 24188 |
| `invalidateGlobalIdentityCache` | function | 2204 |
| `isActiveAlltimeSeasonStats` | function | 10672 |
| `isComebackRelevantGoal` | function | 5582 |
| `isDecisiveGoal` | function | 5574 |
| `isEinsatzCenterGameFromDraft` | function | 7233 |
| `isExcludedGoalieAppearance` | function | 2770 |
| `isFieldAppearance` | function | 2790 |
| `isFreiburgTuebingenSgName` | function | 2560 |
| `isGameAtOrBeforeAsOf` | function | 3148 |
| `isGamePlayed` | function | 3107 |
| `isGoalieAppearance` | function | 2784 |
| `isGoalieRosterEntry` | function | 2746 |
| `isHallOfFameEligiblePlayer` | function | 10488 |
| `isHallRowPureSG` | function | 12866 |
| `isImportantClutchGoal` | function | 5569 |
| `isLateGoal` | function | 5577 |
| `isMannheimLudwigshafenSgName` | function | 2563 |
| `isMatchPenaltyEvent` | function | 4449 |
| `isNewSeasonDataState` | function | 23557 |
| `isOwnTeam` | function | 15926 |
| `isPenaltyGoalEvent` | function | 4532 |
| `isPreClubHistoryPlayerName` | function | 2633 |
| `isPureSGPlayer` | function | 9681 |
| `isRookieCandidateForSeason` | function | 10457 |
| `isSameUlmTeamContext` | function | 4478 |
| `isSeasonDataPreviewStale` | function | 6863 |
| `isSgOnlyAlltimePlayer` | function | 9673 |
| `isSgOnlyHallOfFameExcluded` | function | 10479 |
| `isSyntheticLineupPlayerId` | function | 18926 |
| `isToolMenuOpen` | function | 24126 |
| `isTwoPlusTwoPenaltyEvent` | function | 4453 |
| `isUlmTeamName` | function | 2578 |
| `isUsableExternalSeasonData` | function | 6438 |
| `isValidAsOfDate` | function | 3425 |
| `isValidAsOfStartTime` | function | 3428 |
| `isVisibleSecondaryTrait` | function | 9018 |
| `isYouthGame` | function | 3112 |
| `kpiBadge` | function | 14141 |
| `kpiDelta` | function | 13874 |
| `kpiItemColor` | function | 13880 |
| `kpiNiceMax` | function | 14031 |
| `kpiRadarValue` | function | 13954 |
| `kpiTrendRows` | function | 14037 |
| `kpiValueText` | function | 13870 |
| `lexiconEntry` | function | 15525 |
| `lexiconUniqueKeys` | function | 15517 |
| `lineupAverage` | function | 18978 |
| `lineupBuilderPoolIds` | function | 2261 |
| `lineupCombinationIds` | function | 19455 |
| `lineupDirectChemistryScore` | function | 19499 |
| `lineupEvaluateComplementCandidate` | function | 19506 |
| `lineupGroupDisplayName` | function | 7142 |
| `lineupLevelLabel` | function | 18982 |
| `lineupOpponentDNAForContext` | function | 19079 |
| `lineupPlayerAnchorScore` | function | 19584 |
| `lineupPlayerProfile` | function | 19183 |
| `lineupRankCandidateIds` | function | 19440 |
| `lineupRecommendationReason` | function | 19671 |
| `lineupRoleDnaComplementScore` | function | 19475 |
| `lineupRosterGamesForPlayer` | function | 18988 |
| `lineupRowMap` | function | 19437 |
| `lineupRowMeta` | function | 18955 |
| `lineupScore` | function | 18972 |
| `lineupStdDev` | function | 19469 |
| `linkUiPlayersToRegistry` | function | 4135 |
| `loadEinsatzCenterMismatchedAutosave` | function | 7553 |
| `loadSeason` | function | 8684 |
| `loadSeasonData` | function | 8138 |
| `loadSeasonForGlobal` | function | 8636 |
| `loadSeasonManifest` | function | 6369 |
| `mainNavActiveKeyForPage` | function | 23268 |
| `markFieldRoleAppearance` | function | 4110 |
| `matchcenterAddDuoConnection` | function | 16791 |
| `matchcenterAddPlanItem` | function | 18007 |
| `matchcenterAddPlanWatch` | function | 18013 |
| `matchcenterAddScoring` | function | 16352 |
| `matchcenterAddUlmDuoConnection` | function | 16942 |
| `matchcenterAddUlmScoring` | function | 16572 |
| `matchcenterAliasModeForContext` | function | 16012 |
| `matchcenterAllGames` | function | 16096 |
| `matchcenterAllGamesForSeason` | function | 16076 |
| `matchcenterAnalyzeDirect` | function | 16186 |
| `matchcenterAnalyzeForm` | function | 16223 |
| `matchcenterBuildCoachActivationHints` | function | 18723 |
| `matchcenterBuildCoachAvoidList` | function | 18713 |
| `matchcenterBuildCoachDangerPatterns` | function | 18695 |
| `matchcenterBuildCoachHints` | function | 18451 |
| `matchcenterBuildCoachIfThen` | function | 18703 |
| `matchcenterBuildCoachKeyActors` | function | 18730 |
| `matchcenterBuildCoachLevers` | function | 18685 |
| `matchcenterBuildCoachPriorities` | function | 18678 |
| `matchcenterBuildGoalieMatchup` | function | 17143 |
| `matchcenterBuildInsights` | function | 17429 |
| `matchcenterBuildIntelHeadline` | function | 18467 |
| `matchcenterBuildIntelligenceDataQuality` | function | 18102 |
| `matchcenterBuildIntelligenceSignals` | function | 18488 |
| `matchcenterBuildIntelListFromPlan` | function | 18442 |
| `matchcenterBuildMatchPlan` | function | 19787 |
| `matchcenterBuildOneThingToWatch` | function | 18475 |
| `matchcenterBuildOpponentAlarm` | function | 18332 |
| `matchcenterBuildOpponentDNA` | function | 18153 |
| `matchcenterBuildOpponentDuoInsights` | function | 16890 |
| `matchcenterBuildOpponentDuos` | function | 16845 |
| `matchcenterBuildOpponentPlayerInsights` | function | 16488 |
| `matchcenterBuildOpponentScouting` | function | 16416 |
| `matchcenterBuildPlanConfidence` | function | 18019 |
| `matchcenterBuildSpecialTeamsMatchup` | function | 17073 |
| `matchcenterBuildTimingAnalysis` | function | 17266 |
| `matchcenterBuildTimingInsights` | function | 17255 |
| `matchcenterBuildUlmDuoInsights` | function | 17040 |
| `matchcenterBuildUlmDuos` | function | 16997 |
| `matchcenterBuildUlmPlayerInsights` | function | 16734 |
| `matchcenterBuildUlmPlayerScouting` | function | 16679 |
| `matchcenterClamp` | function | 15713 |
| `matchcenterClassifyUlmGoalEvent` | function | 16561 |
| `matchcenterCoachAdd` | function | 18615 |
| `matchcenterCoachCautious` | function | 18612 |
| `matchcenterCoachGameModel` | function | 18624 |
| `matchcenterCoachPriorityFromAlarm` | function | 18668 |
| `matchcenterConfidenceClass` | function | 17994 |
| `matchcenterContextGames` | function | 16180 |
| `matchcenterDateLabel` | function | 15883 |
| `matchcenterDateValue` | function | 15878 |
| `matchcenterDefaultSeasonKey` | function | 15998 |
| `matchcenterDeriveOpponentType` | function | 18266 |
| `matchcenterDetectUlmSide` | function | 15988 |
| `matchcenterDirectContextGames` | function | 17053 |
| `matchcenterDirectGames` | function | 16166 |
| `matchcenterDuoDirectionLabel` | function | 16784 |
| `matchcenterDuoPairKey` | function | 16747 |
| `matchcenterEmptyBuckets` | function | 16502 |
| `matchcenterEmptyTimingStats` | function | 17202 |
| `matchcenterEnsureOpponentDuo` | function | 16751 |
| `matchcenterEnsureOpponentPlayer` | function | 16325 |
| `matchcenterEnsureUlmDuo` | function | 16904 |
| `matchcenterEnsureUlmPlayer` | function | 16510 |
| `matchcenterEventNumber` | function | 16288 |
| `matchcenterFinalizeOpponentDuos` | function | 16810 |
| `matchcenterFinalizeOpponentPlayerProfiles` | function | 16369 |
| `matchcenterFinalizeUlmDuos` | function | 16961 |
| `matchcenterFinalizeUlmPlayers` | function | 16610 |
| `matchcenterFindRosterPlayer` | function | 16277 |
| `matchcenterFmt` | function | 15868 |
| `matchcenterFormLine` | function | 17424 |
| `matchcenterGameKey` | function | 16249 |
| `matchcenterGameLine` | function | 17418 |
| `matchcenterGameScore` | function | 16063 |
| `matchcenterGameSideForOpponentKey` | function | 16052 |
| `matchcenterGameSideForTeam` | function | 16044 |
| `matchcenterGameTeamName` | function | 16041 |
| `matchcenterGoalAbsSeconds` | function | 17186 |
| `matchcenterGoalieFitScore` | function | 17126 |
| `matchcenterGoalieKey` | function | 17121 |
| `matchcenterGoalMinute` | function | 16303 |
| `matchcenterInferPriority` | function | 18000 |
| `matchcenterIntelAddAlarm` | function | 18311 |
| `matchcenterIntelCurve` | function | 18054 |
| `matchcenterIntelDataLabel` | function | 18099 |
| `matchcenterIntelDuoRef` | function | 18297 |
| `matchcenterIntelInverseCurve` | function | 18060 |
| `matchcenterIntelPct` | function | 18079 |
| `matchcenterIntelPlayerRef` | function | 18284 |
| `matchcenterIntelPriorityClass` | function | 18089 |
| `matchcenterIntelPriorityFromScore` | function | 18083 |
| `matchcenterIntelPriorityLabel` | function | 18095 |
| `matchcenterIntelRate` | function | 18075 |
| `matchcenterIntelWeighted` | function | 18064 |
| `matchcenterIsClutchGoalEvent` | function | 16314 |
| `matchcenterIsFreiburgTuebingenTeamName` | function | 15973 |
| `matchcenterIsLateGoalEvent` | function | 16309 |
| `matchcenterIsUlmTeamName` | function | 15980 |
| `matchcenterNum` | function | 15718 |
| `matchcenterOpponentMode` | function | 16099 |
| `matchcenterOutcomeForTeam` | function | 16067 |
| `matchcenterPct` | function | 17069 |
| `matchcenterPenaltyMinutes` | function | 16293 |
| `matchcenterPersonalPenaltyMinutesForSide` | function | 17060 |
| `matchcenterPlanRateText` | function | 17986 |
| `matchcenterPlanScoreText` | function | 17982 |
| `matchcenterPlayerDisplayName` | function | 16271 |
| `matchcenterPlayerKey` | function | 16282 |
| `matchcenterPriorityLabel` | function | 17991 |
| `matchcenterRegisterPlayerGame` | function | 16349 |
| `matchcenterRegisterUlmProfileGame` | function | 16548 |
| `matchcenterResultClass` | function | 17407 |
| `matchcenterResultLetter` | function | 17410 |
| `matchcenterRosterPlayers` | function | 16267 |
| `matchcenterScoutingGames` | function | 16252 |
| `matchcenterSeasonHasGames` | function | 15995 |
| `matchcenterSeasonIsUlmTuebingenSgEra` | function | 15900 |
| `matchcenterSeasonKeys` | function | 15893 |
| `matchcenterSeasonLabel` | function | 15897 |
| `matchcenterSigned` | function | 15873 |
| `matchcenterSocialAdd` | function | 18792 |
| `matchcenterSocialCaption` | function | 18799 |
| `matchcenterSortGamesAsc` | function | 15888 |
| `matchcenterSpecialTeamsForGame` | function | 17056 |
| `matchcenterStoryAddCandidate` | function | 21006 |
| `matchcenterStoryAddFact` | function | 20987 |
| `matchcenterStoryBestClutchDuo` | function | 21236 |
| `matchcenterStoryBestClutchPlayer` | function | 21192 |
| `matchcenterStoryCandidateForBudget` | function | 21044 |
| `matchcenterStoryCategoryForPlanFact` | function | 21321 |
| `matchcenterStoryCategoryLimit` | function | 21029 |
| `matchcenterStoryClutchFact` | function | 21169 |
| `matchcenterStoryClutchPriority` | function | 21270 |
| `matchcenterStoryCompetitionLabel` | function | 21273 |
| `matchcenterStoryCurrentStreak` | function | 21116 |
| `matchcenterStoryDirectFactCandidates` | function | 21286 |
| `matchcenterStoryDownloadFileName` | function | 20255 |
| `matchcenterStoryDuoClutchFact` | function | 21246 |
| `matchcenterStoryDuoClutchTotal` | function | 21228 |
| `matchcenterStoryDuoFact` | function | 21249 |
| `matchcenterStoryEstimateFactWeight` | function | 21000 |
| `matchcenterStoryFactKey` | function | 20994 |
| `matchcenterStoryFormFact` | function | 21134 |
| `matchcenterStoryFormFactCandidates` | function | 21145 |
| `matchcenterStoryFormLetters` | function | 20951 |
| `matchcenterStoryFormRecord` | function | 21110 |
| `matchcenterStoryInitials` | function | 20814 |
| `matchcenterStoryInlineStat` | function | 20912 |
| `matchcenterStoryLastDuelLabel` | function | 21282 |
| `matchcenterStoryLateGoalsForOutcome` | function | 21165 |
| `matchcenterStoryLogoBase` | function | 20820 |
| `matchcenterStoryLogoForOpponent` | function | 20875 |
| `matchcenterStoryLooksArtificial` | function | 20997 |
| `matchcenterStoryNameClass` | function | 21442 |
| `matchcenterStoryNormalizePickOptions` | function | 21033 |
| `matchcenterStoryPickFactItems` | function | 21054 |
| `matchcenterStoryPickFacts` | function | 21107 |
| `matchcenterStoryPlanFactCandidates` | function | 21308 |
| `matchcenterStoryPlayer` | function | 20954 |
| `matchcenterStoryPlayerClutchFact` | function | 21202 |
| `matchcenterStoryPlayerClutchTotal` | function | 21184 |
| `matchcenterStoryRankRows` | function | 20939 |
| `matchcenterStoryRankText` | function | 20908 |
| `matchcenterStorySafeLogoUrl` | function | 20826 |
| `matchcenterStoryShortDuel` | function | 21277 |
| `matchcenterStoryShortTeamLabel` | function | 20915 |
| `matchcenterStoryTableRank` | function | 20890 |
| `matchcenterStoryTeamAssetKey` | function | 20840 |
| `matchcenterStoryUlmTableRank` | function | 20901 |
| `matchcenterStoryVisibleFacts` | function | 21448 |
| `matchcenterStoryWinlessStreak` | function | 21125 |
| `matchcenterTeamDisplay` | function | 16004 |
| `matchcenterTeamKey` | function | 16007 |
| `matchcenterTimeValue` | function | 17194 |
| `matchcenterTimingStatsForGames` | function | 17218 |
| `matchcenterUlmScoutingConfidence` | function | 16505 |
| `matchcenterUlmTeamLabelForGame` | function | 17413 |
| `matchcenterUpdateUlmSeasonRow` | function | 16554 |
| `matchcenterWindowForSecond` | function | 17211 |
| `matchdayAsOfCutoff` | function | 3381 |
| `matchdayGameCardHtml` | function | 23400 |
| `matchdayUlmGames` | function | 23397 |
| `medianOrNull` | function | 4308 |
| `mergeDuoSet` | function | 5138 |
| `mergeGoalieSpecialTeamsStats` | function | 4770 |
| `mergeSpecialTeamsStats` | function | 4414 |
| `mojibakeScore` | function | 2451 |
| `moveGlobalSearch` | function | 24052 |
| `normalizeAssistPlayerName` | function | 2964 |
| `normalizeComparisonItem` | function | 13149 |
| `normalizeDuoComparisonItem` | function | 13393 |
| `normalizeEventPlayerRef` | function | 2903 |
| `normalizeGame` | function | 6332 |
| `normalizeLineupLines` | function | 2264 |
| `normalizeOpponentNameForAllTime` | function | 2549 |
| `normalizePlayerDisplayName` | function | 2604 |
| `normalizePlayerName` | function | 2620 |
| `normalizeSecondaryTraits` | function | 5685 |
| `normalizeTeamKey` | function | 15918 |
| `normalizeTeamName` | function | 2539 |
| `normalizeTeamNameForMatchcenter` | function | 15983 |
| `onGlobalSearchInput` | window | 24046 |
| `openAllTimePlayers` | window | 8752 |
| `openComparisonCenter` | window | 8922 |
| `openDuoProPicker` | window | 11842 |
| `openEinsatzCenter` | window | 7093 |
| `openGlobalSearch` | window | 24013 |
| `openHallOfFame` | window | 8898 |
| `openLexicon` | window | 8995 |
| `openLigaGegner` | window | 23770 |
| `openLineupBuilder` | window | 8973 |
| `openMatchcenter` | window | 8951 |
| `openMatchcenterStoryPreview` | window | 2217 |
| `openMatchday` | window | 23379 |
| `openMatchdayTimeline` | window | 23371 |
| `openOverview` | window | 23320 |
| `openSeason` | window | 8749 |
| `openToolMenu` | window | 24130 |
| `overviewCompactTableHtml` | function | 23597 |
| `overviewCrossSeasonTrendHtml` | function | 23646 |
| `overviewFormHtml` | function | 23605 |
| `overviewLastMatchdayText` | function | 23581 |
| `overviewLineupLinkHtml` | function | 23663 |
| `overviewMatchcenterLinkHtml` | function | 23660 |
| `overviewMatchdayEndMs` | function | 23498 |
| `overviewMatchdayStartMs` | function | 23492 |
| `overviewNextMatchdayHtml` | function | 23585 |
| `overviewOpponentLabel` | function | 23576 |
| `overviewOpponentPreviewHtml` | function | 23655 |
| `overviewRankChangeTile` | function | 23682 |
| `overviewRecordHtml` | function | 23639 |
| `overviewSeasonAwardHtml` | function | 23628 |
| `overviewSeasonBilanzHtml` | function | 23620 |
| `p1NarrativeKey` | function | 15800 |
| `paintGlobalSearchResults` | function | 24005 |
| `parseAppHash` | function | 3528 |
| `parseAsOfQueryValue` | function | 3567 |
| `parseComparisonVariant` | function | 13314 |
| `parseGameClock` | function | 3016 |
| `parseLastViewState` | function | 3702 |
| `parseSeasonDataState` | function | 23547 |
| `pct` | function | 5493 |
| `pctValue` | function | 12789 |
| `pdashBestPhase` | function | 14427 |
| `pdashInsight` | function | 14465 |
| `pdashInsights` | function | 14468 |
| `pdashNum` | function | 14411 |
| `pdashOpponentStrength` | function | 14445 |
| `pdashOpponentTier` | function | 14439 |
| `pdashPct` | function | 14415 |
| `pdashPhaseLabel` | function | 14419 |
| `pdashTopCount` | function | 14423 |
| `pdashTopOpponent` | function | 14435 |
| `pdashTopPartner` | function | 14431 |
| `penaltyRawText` | function | 4446 |
| `pFull` | function | 2597 |
| `playerAppearedForUlmStatusInSeasonByName` | function | 10438 |
| `playerAppearedInSeasonByName` | function | 10427 |
| `playerExplainAdd` | function | 15101 |
| `playerExplainConfidence` | function | 15092 |
| `playerExplainConfidenceLabel` | function | 15098 |
| `playerExplainContextSentence` | function | 15137 |
| `playerExplainHeadline` | function | 15127 |
| `playerExplainRolePhrase` | function | 15118 |
| `playerExplainStyleSignature` | function | 15106 |
| `probeSocialVideoExportCapability` | function | 21736 |
| `processGame` | function | 3048 |
| `rAlltimeKpis` | function | 13105 |
| `rAlltimePlayerDashboard` | function | 14620 |
| `rAllTimePlayersPage` | function | 15382 |
| `rankNarratives` | function | 15822 |
| `rAntiSynergyCompareChip` | function | 12169 |
| `rAntiSynergyDelta` | function | 12153 |
| `rAntiSynergyMainDelta` | function | 12194 |
| `rAntiSynergyMetricRow` | function | 12177 |
| `rAsOfSelector` | function | 23791 |
| `ratio01` | function | 5494 |
| `rCarryPerformanceRows` | function | 10599 |
| `rClassicRoleTags` | function | 9104 |
| `rClassicTagTip` | function | 9042 |
| `rClutch` | function | 9310 |
| `rClutchBadge` | function | 9004 |
| `rComparisonCenterPage` | function | 14290 |
| `rComparisonDashboard` | function | 14241 |
| `rComparisonDuoSearchBox` | function | 13623 |
| `rComparisonDuoSuggestionButtons` | function | 13416 |
| `rComparisonMiniOverview` | function | 14229 |
| `rComparisonModeSelect` | function | 13644 |
| `rComparisonRoles` | function | 14233 |
| `rComparisonStyles` | function | 14252 |
| `rContextBar` | function | 23874 |
| `rDifficultConnectionList` | function | 12204 |
| `rDifficultConnectionListCompact` | function | 12271 |
| `rDifficultConnectionListCompactLegacy` | function | 12229 |
| `rDifficultConnectionsCard` | function | 12310 |
| `rDuoCenterPro` | function | 11689 |
| `rDuoCompareSummaryCards` | function | 13502 |
| `rDuoComparisonBars` | function | 13497 |
| `rDuoComparisonChemistry` | function | 13555 |
| `rDuoComparisonContext` | function | 13587 |
| `rDuoComparisonDashboard` | function | 13609 |
| `rDuoComparisonDetails` | function | 13605 |
| `rDuoComparisonImpact` | function | 13571 |
| `rDuoComparisonPage` | function | 13633 |
| `rDuoComparisonProfile` | function | 13533 |
| `rDuoProPlayerSelect` | function | 11871 |
| `rDuoResponseMomentumCard` | function | 12467 |
| `rDuoRows` | function | 10858 |
| `recommendLineComplements` | function | 19759 |
| `recordOverviewVisit` | function | 23566 |
| `registerPlayerIdentity` | function | 4082 |
| `registerSeasonRosters` | function | 4115 |
| `rEinsatzCenterAutosaveBanner` | function | 7515 |
| `rEinsatzCenterCombo` | function | 7038 |
| `rEinsatzCenterComboEditor` | function | 7743 |
| `rEinsatzCenterDraftBanner` | function | 7256 |
| `rEinsatzCenterDraftMark` | function | 7242 |
| `rEinsatzCenterDraftStatsHint` | function | 7246 |
| `rEinsatzCenterEditPage` | function | 7843 |
| `rEinsatzCenterGameCard` | function | 7047 |
| `rEinsatzCenterGameEditor` | function | 7790 |
| `rEinsatzCenterGroup` | function | 7025 |
| `rEinsatzCenterGroupEditor` | function | 7712 |
| `rEinsatzCenterPage` | function | 7066 |
| `rEinsatzCenterRosterSuggestionCard` | function | 7759 |
| `rEinsatzCenterStats` | function | 7148 |
| `relative01` | function | 5495 |
| `removeComparisonDuo` | window | 13467 |
| `removeComparisonItem` | window | 13379 |
| `removeEinsatzCenterCombo` | window | 8080 |
| `removeEinsatzCenterGroup` | window | 7994 |
| `removeEinsatzCenterGroupPlayer` | window | 8044 |
| `removeEinsatzCenterRosterPlayer` | window | 7925 |
| `removeLineupBuilderPlayerFromLine` | window | 2311 |
| `removeLineupPlayer` | window | 2252 |
| `rEmptyState` | function | 15848 |
| `renameEinsatzCenterGroup` | window | 8016 |
| `render` | function | 22678 |
| `renderComparisonDuoSuggestions` | function | 13420 |
| `renderTags` | function | 9112 |
| `repairMojibake` | function | 2470 |
| `repairRenderedMojibake` | function | 2517 |
| `resetPlayerRegistrySeason` | function | 4027 |
| `resolveAssistPlayer` | function | 3009 |
| `resolveCurrentSeasonKey` | function | 6401 |
| `resolveGoalScorerPlayer` | function | 2946 |
| `resolveLineupPlayerName` | function | 7010 |
| `resolvePlayerRoleView` | function | 9765 |
| `resolveRosterPlayerByRef` | function | 2915 |
| `responseExcerpt` | function | 6217 |
| `responseMomentumAbsSeconds` | function | 11034 |
| `responseMomentumActor` | function | 11063 |
| `responseMomentumConfidence` | function | 11183 |
| `responseMomentumEmptyState` | function | 11188 |
| `responseMomentumGameRows` | function | 11047 |
| `responseMomentumGoalActors` | function | 11074 |
| `responseMomentumPairKey` | function | 11196 |
| `responseMomentumSide` | function | 11054 |
| `responseMomentumTime` | function | 11040 |
| `responseMomentumTooltipFor` | function | 12391 |
| `restoreEinsatzCenterAutosave` | function | 7489 |
| `restoreHallOfFameIntroPrevious` | function | 8840 |
| `resultGoalsAgainstForSide` | function | 4350 |
| `returnToEinsatzCenterEdit` | window | 7911 |
| `rGlobalAllTimeStats` | function | 14728 |
| `rGlobalCareerHeader` | function | 14637 |
| `rGlobalDevelopment` | function | 14746 |
| `rGlobalDnaBars` | function | 14381 |
| `rGlobalDuoNetwork` | function | 14846 |
| `rGlobalOpponentSpecialist` | function | 15045 |
| `rGlobalOverview` | function | 14675 |
| `rGlobalPartnerOpponentPanel` | function | 14623 |
| `rGlobalProfileTags` | function | 12780 |
| `rGlobalSearchPanelHtml` | function | 24002 |
| `rGlobalSearchResultsHtml` | function | 23991 |
| `rGlobalSearchToggle` | function | 23988 |
| `rGoalieAnalysis` | function | 10391 |
| `rGoalieBars` | function | 10048 |
| `rGoalieDnaBars` | function | 10194 |
| `rGoalieFirstGoalResistance` | function | 10231 |
| `rGoalieInsights` | function | 10304 |
| `rGoalieKpis` | function | 10208 |
| `rGoalieMiniMetrics` | function | 10225 |
| `rGoalieMomentum` | function | 10245 |
| `rGoalieOpponents` | function | 10346 |
| `rGoalieOverview` | function | 10326 |
| `rGoaliePhaseProfile` | function | 10287 |
| `rGoaliePhases` | function | 10343 |
| `rGoalieRoleTraits` | function | 10186 |
| `rGoalieStability` | function | 10358 |
| `rGoalieTable` | function | 10383 |
| `rGoalieTierCards` | function | 10259 |
| `rHallDuoTemple` | function | 12842 |
| `rHallGoalieAwardCards` | function | 13033 |
| `rHallGoalieLegends` | function | 13050 |
| `rHallGoalieRankCard` | function | 13001 |
| `rHallOfFameHero` | function | 12793 |
| `rHallOfFamePage` | function | 15424 |
| `rHallPodiumList` | function | 12819 |
| `rHallSGBadge` | function | 12874 |
| `rIaShell` | function | 23894 |
| `rIdentityCards` | function | 9078 |
| `rIdentityTags` | function | 9058 |
| `rInsights` | function | 9571 |
| `rInteractiveDuoCenterPro` | function | 11878 |
| `rKpiCards` | function | 13883 |
| `rKpiExtendedMetrics` | function | 14016 |
| `rKpiInfoCards` | function | 14151 |
| `rKpiMetricCard` | function | 14008 |
| `rKpiMirrorRows` | function | 13894 |
| `rKpiObjectMini` | function | 14144 |
| `rKpiOpponentStrength` | function | 14113 |
| `rKpiRadar` | function | 13965 |
| `rKpiShareBars` | function | 14000 |
| `rKpiTextMetricCard` | function | 14013 |
| `rKpiTrendCompare` | function | 14046 |
| `rKPIVergleich` | function | 14215 |
| `rLexiconPage` | function | 15539 |
| `rLexiconRows` | function | 15535 |
| `rLigaGegnerPlaceholderPage` | function | 23774 |
| `rLineupBuilderAvailablePanel` | function | 20538 |
| `rLineupBuilderPage` | function | 20714 |
| `rLineupComplementCards` | function | 20635 |
| `rLineupMetricPills` | function | 20524 |
| `rLineupRecommendationCards` | function | 20586 |
| `rLineupRecommendationMode` | function | 20601 |
| `rLineupScoreRows` | function | 20420 |
| `rLineupSimpleCards` | function | 20442 |
| `rLineupTestLine` | function | 20648 |
| `rLineupTestMode` | function | 20697 |
| `rMainNav` | function | 23281 |
| `rMainNavBottom` | function | 23303 |
| `rMatchcenterCoachCardList` | function | 20082 |
| `rMatchcenterCoachIfThen` | function | 20096 |
| `rMatchcenterCoachSimpleList` | function | 20104 |
| `rMatchcenterCopyButton` | function | 20174 |
| `rMatchcenterDetailsSection` | function | 17399 |
| `rMatchcenterDigitalCoach` | function | 20109 |
| `rMatchcenterDuoRankCard` | function | 17720 |
| `rMatchcenterDuoRow` | function | 17696 |
| `rMatchcenterDuosTab` | function | 17867 |
| `rMatchcenterDuoWatchCard` | function | 17676 |
| `rMatchcenterFormCard` | function | 17457 |
| `rMatchcenterFormSection` | function | 17373 |
| `rMatchcenterGamesList` | function | 17478 |
| `rMatchcenterGoalieCard` | function | 17929 |
| `rMatchcenterGoalieMatchup` | function | 17953 |
| `rMatchcenterIntelCoachHints` | function | 20068 |
| `rMatchcenterIntelOverview` | function | 20022 |
| `rMatchcenterKpi` | function | 17450 |
| `rMatchcenterLineupBuilder` | function | 20451 |
| `rMatchcenterLockerList` | function | 20179 |
| `rMatchcenterLockerRoomSheet` | function | 20191 |
| `rMatchcenterMatchPlan` | function | 20792 |
| `rMatchcenterOpponentAlarm` | function | 20000 |
| `rMatchcenterOpponentDNA` | function | 19967 |
| `rMatchcenterOpponentDuos` | function | 17824 |
| `rMatchcenterOpponentScouting` | function | 17637 |
| `rMatchcenterPage` | function | 22188 |
| `rMatchcenterPlanItems` | function | 19933 |
| `rMatchcenterPlanWatch` | function | 19951 |
| `rMatchcenterPlayerRow` | function | 17511 |
| `rMatchcenterPlayersTab` | function | 17673 |
| `rMatchcenterProfileSection` | function | 17353 |
| `rMatchcenterRankCard` | function | 17535 |
| `rMatchcenterResponseMomentum` | function | 12494 |
| `rMatchcenterScoutingSummary` | function | 20748 |
| `rMatchcenterSocialBlock` | function | 20247 |
| `rMatchcenterSocialMediaCenter` | function | 20366 |
| `rMatchcenterSpecialCard` | function | 17870 |
| `rMatchcenterSpecialTeams` | function | 17879 |
| `rMatchcenterStoryForm` | function | 21484 |
| `rMatchcenterStoryFrame` | function | 21567 |
| `rMatchcenterStoryLogo` | function | 21479 |
| `rMatchcenterStoryPlayerCard` | function | 21489 |
| `rMatchcenterStoryPreview` | function | 21497 |
| `rMatchcenterTabs` | function | 17350 |
| `rMatchcenterTimeBars` | function | 17277 |
| `rMatchcenterTiming` | function | 17311 |
| `rMatchcenterTimingStatsCard` | function | 17291 |
| `rMatchcenterUlmDuoRankCard` | function | 17775 |
| `rMatchcenterUlmDuoRow` | function | 17752 |
| `rMatchcenterUlmDuos` | function | 17781 |
| `rMatchcenterUlmDuoWatchCard` | function | 17726 |
| `rMatchcenterUlmImpactCard` | function | 17541 |
| `rMatchcenterUlmPlayerRow` | function | 17570 |
| `rMatchcenterUlmRankCard` | function | 17594 |
| `rMatchcenterUlmScouting` | function | 17600 |
| `rMatchcenterWatchCard` | function | 17490 |
| `rMatchdayDetailPage` | function | 23431 |
| `rMatchdayPage` | function | 23467 |
| `rMatchdayTimelinePage` | function | 23420 |
| `rMatchdayTimelineRow` | function | 23412 |
| `rMatrix` | function | 9183 |
| `rmTerm` | function | 12398 |
| `roleGameStableKey` | function | 2818 |
| `roleTraitLabel` | function | 9015 |
| `rOppBreakdown` | function | 9475 |
| `rOpponentIntelBars` | function | 10822 |
| `rOpponentTopScorerTable` | function | 12633 |
| `rosterImpactConfidence` | function | 12065 |
| `rosterImpactConfidenceWeight` | function | 12071 |
| `rosterPlayerMatches` | function | 2722 |
| `rOverviewPage` | function | 23758 |
| `rPdashLabel` | function | 14572 |
| `rPdashStat` | function | 14575 |
| `rPenalties` | function | 9456 |
| `rPhases` | function | 9240 |
| `rPlayerDash` | function | 14578 |
| `rPlayerDashStyles` | function | 14560 |
| `rPlayerExplainItems` | function | 15324 |
| `rPlayerExplanation` | function | 15329 |
| `rPlayerResponseMomentumCard` | function | 12448 |
| `rPlayerRoleSwitch` | function | 9773 |
| `rRadar` | function | 9260 |
| `rRes` | const-arrow | 9003 |
| `rResponseMomentumOverviewCard` | function | 12424 |
| `rRmKpi` | function | 12402 |
| `rRmTopList` | function | 12413 |
| `rRoleTraitTip` | function | 9022 |
| `rRosterImpactStatLine` | function | 12186 |
| `rRosterStatusBadge` | function | 9031 |
| `rScoreBreakdown` | function | 15852 |
| `rSeasonDataPreviewCard` | function | 6882 |
| `rSeasonDataPreviewContextHint` | function | 23826 |
| `rSeasonDataPreviewRows` | function | 6872 |
| `rSeasonDataPreviewStatus` | function | 6869 |
| `rSeasonDataStateContextHint` | function | 23843 |
| `rSeasonDuoCenterPro` | function | 11934 |
| `rSeasonDuoSummary` | function | 9230 |
| `rSeasonInsightsTab` | function | 9556 |
| `rSeasonLandingPage` | function | 14659 |
| `rSeasonPlayerDashboard` | function | 14617 |
| `rSeasonProfileKpis` | function | 9155 |
| `rSeasonProfileTagStrip` | function | 9176 |
| `rSeasonTrendRows` | function | 14341 |
| `rSocialVideoBlock` | function | 20316 |
| `rSocialVideoFeedFrame` | function | 22077 |
| `rSparkline` | function | 13119 |
| `rStyleMetricTip` | function | 9027 |
| `rStyleProfileBars` | function | 9067 |
| `rTable` | function | 9625 |
| `rTeamPage` | function | 22336 |
| `rTeamResponseMomentumCard` | function | 12487 |
| `rTimeline` | function | 9345 |
| `rToolMenu` | function | 24116 |
| `runComparison` | window | 13384 |
| `runDuoComparison` | window | 13472 |
| `saveLastView` | function | 3719 |
| `scoreNarrative` | function | 15803 |
| `seasonApiUrl` | function | 1816 |
| `seasonDataPreviewRerender` | function | 6728 |
| `seasonDataPreviewRow` | function | 6732 |
| `seasonGameApiUrls` | function | 1834 |
| `seasonGameHtmlUrls` | function | 1844 |
| `seasonHasPureUlmTeam` | function | 10472 |
| `seasonKeyToHashSegment` | function | 3418 |
| `seasonOrderIndex` | function | 10417 |
| `seasonPathPrefix` | function | 1828 |
| `seasonRoleKeysForPlayer` | function | 5702 |
| `seasonRoleTraitsFromClassic` | function | 5697 |
| `seasonStatNumber` | function | 10662 |
| `seasonStatSetSize` | function | 10666 |
| `seedHallOfFameIntroParticles` | function | 8807 |
| `selectAllLineupAvailable` | window | 2298 |
| `selectComparisonDuoSuggestion` | window | 13430 |
| `selectComparisonMode` | window | 13391 |
| `selectComparisonPlayer` | window | 13348 |
| `selectDuoProQuick` | window | 11844 |
| `selectEinsatzCenterEditGame` | window | 7913 |
| `selectEnforcerKeys` | function | 5714 |
| `serializeFieldRoleSeasonStats` | function | 4231 |
| `serializeGoalieSeasonStats` | function | 4209 |
| `serializeSeasonStats` | function | 4196 |
| `serializeSpecialTeamsStats` | function | 4411 |
| `setAntiSynergyView` | window | 2344 |
| `setComparisonDuoMode` | window | 13401 |
| `setComparisonDuoPlayer` | window | 13450 |
| `setComparisonDuoSearch` | window | 13403 |
| `setComparisonDuoSeasonKey` | window | 13402 |
| `setComparisonRoleMode` | window | 13354 |
| `setComparisonVariant` | window | 13359 |
| `setContextAsOf` | window | 23804 |
| `setDuoProPickerState` | function | 11813 |
| `setDuoProSelection` | window | 11863 |
| `setEinsatzCenterGameNote` | window | 8087 |
| `setEinsatzCenterGroupPlayerPosition` | window | 8052 |
| `setEinsatzCenterIncludeDraft` | window | 7912 |
| `setEinsatzCenterSeason` | window | 7087 |
| `setGlobalPlayer` | window | 2370 |
| `setGlobalPlayerDuo` | window | 2371 |
| `setGlobalTab` | window | 2372 |
| `setGoalieTab` | window | 2211 |
| `setLineupActiveLine` | window | 2283 |
| `setLineupBuilderMode` | window | 2282 |
| `setLineupBuilderOpponent` | window | 2281 |
| `setLineupBuilderSeason` | window | 2269 |
| `setLineupNewPlayerProfile` | window | 2325 |
| `setMatchcenterContext` | window | 8992 |
| `setMatchcenterOpponent` | window | 8991 |
| `setMatchcenterSeason` | window | 8993 |
| `setMatchcenterTab` | window | 2216 |
| `setP` | window | 2208 |
| `setPage` | window | 2354 |
| `setPlayerRoleView` | window | 2210 |
| `setSeasonDataPreviewOpen` | window | 6918 |
| `setSeasonDataPreviewPasteText` | window | 6919 |
| `setState` | const-arrow | 2196 |
| `setTab` | window | 2209 |
| `showLineupComplements` | window | 2324 |
| `showMainShell` | function | 8599 |
| `socialDuoFocusLine` | function | 18822 |
| `socialEnsurePeriod` | function | 18808 |
| `socialFirstUseful` | function | 18812 |
| `socialKeyFactLine` | function | 18832 |
| `socialOpponentLine` | function | 18828 |
| `socialPlayerFocusLine` | function | 18815 |
| `socialSentence` | function | 18805 |
| `socialVideoBuildFeedSpec` | function | 21952 |
| `socialVideoBuildStorySpec` | function | 21898 |
| `socialVideoCheckFonts` | function | 21717 |
| `socialVideoDistributeSceneDurations` | function | 21665 |
| `socialVideoFileName` | function | 21885 |
| `socialVideoFitText` | function | 21702 |
| `socialVideoFormAsOf` | function | 21781 |
| `socialVideoLastDuelAsOf` | function | 21790 |
| `socialVideoMatchdayLabel` | function | 21893 |
| `socialVideoOpponentSceneData` | function | 21834 |
| `socialVideoStandbildFrame` | function | 22116 |
| `socialVideoStoryFrameData` | function | 22040 |
| `socialVideoTableRank` | function | 21773 |
| `socialVideoTopScorerAsOf` | function | 21802 |
| `socialVideoUlmGamesForMatchday` | function | 21766 |
| `socialVideoXmlSafeHtml` | function | 22128 |
| `specialTeamsStateFromActive` | function | 4537 |
| `stageSeasonDataPreview` | function | 6778 |
| `stageSeasonDataPreviewFromFile` | function | 6830 |
| `stageSeasonDataPreviewFromPaste` | function | 6844 |
| `startApp` | window | 8737 |
| `startEinsatzCenterDraftMode` | window | 7893 |
| `startHallOfFameIntro` | function | 8860 |
| `sumRoleGames` | function | 9745 |
| `switchMatchdaySeason` | window | 23390 |
| `switchOverviewSeason` | window | 23337 |
| `syncHashFromState` | function | 3661 |
| `t2s` | const-arrow | 3026 |
| `teamAliasRuleMatches` | function | 15921 |
| `teamAliasSeasonMatches` | function | 15912 |
| `toggleAntiSynergyHideSgOnly` | window | 2346 |
| `toggleAntiSynergyShowAll` | window | 2345 |
| `toggleComparisonPicker` | window | 13378 |
| `toggleComparisonSgOnly` | window | 13363 |
| `toggleEinsatzCenterComboPlayer` | window | 8061 |
| `toggleEinsatzCenterGroupRename` | window | 8002 |
| `toggleEinsatzCenterRosterSuggestionPlayer` | window | 7933 |
| `toggleHallOfFamePureSGPlayers` | window | 2219 |
| `toggleLineupBuilderAvailable` | window | 2284 |
| `toggleMatchcenterDuoDetails` | window | 2215 |
| `toggleMatchcenterGames` | window | 8994 |
| `toggleMatchcenterPlayerDetails` | window | 2214 |
| `toggleMatchcenterSpecialTeamsGames` | window | 2213 |
| `toggleSgOnlyAlltime` | window | 2373 |
| `toggleSpecialTeamsGameDetails` | window | 2212 |
| `toggleToolMenu` | window | 24145 |
| `toolMenuElements` | function | 24120 |
| `toolMenuItemElements` | function | 24123 |
| `toolMenuOnClick` | function | 24181 |
| `toolMenuOnKeydown` | function | 24157 |
| `toPublicPlayerRegistry` | function | 4235 |
| `uiDeltaIndicator` | function | 22922 |
| `uiFormatNumber` | function | 22894 |
| `uiHinweisKarte` | function | 22986 |
| `uiInfoIcon` | function | 22940 |
| `uiIntervallBalken` | function | 23062 |
| `uiKennzahlKachel` | function | 22952 |
| `uiKernaussage` | function | 22972 |
| `uiMethodenbox` | function | 23081 |
| `uiNotiz` | function | 23098 |
| `uiObjektseite` | function | 23178 |
| `uiObjektseiteSortTabs` | function | 23160 |
| `uiPlatzhalter` | function | 23110 |
| `uiRangliste` | function | 23008 |
| `uiReliabilityDots` | function | 22907 |
| `uiVerlauf` | function | 23036 |
| `uniqueList` | function | 1831 |
| `updateCoverAllTimeStats` | function | 8626 |
| `updatePlayerRoleAvailability` | function | 5031 |
| `validateGameStructure` | function | 6539 |
| `validateMergedSeason` | function | 6626 |
| `validateSeasonGames` | function | 6580 |
| `validateSeasonKey` | function | 6603 |
| `validateWrapperFormat` | function | 6615 |
| `variance` | function | 3039 |
| `viewEinsatzCenterMergedView` | window | 7910 |
| `warnEventProcessingOnce` | function | 2714 |
| `withoutHashSync` | function | 3678 |

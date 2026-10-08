# Code-Karte: index.html

<!-- index-map: source-sha256=b62b33ff7965209d34f6dc02122980ef19b63cbf731f34ebbd6040d12ea6367a source-lines=23428 -->

Automatisch erzeugt von `scripts/build-index-map.mjs`. Nicht von Hand bearbeiten — bei Änderungen an index.html erneut ausführen: `node scripts/build-index-map.mjs --write`. Vor gezieltem Lesen prüfen, ob die Karte noch aktuell ist: `node scripts/build-index-map.mjs --check`.

index.html: 23428 Zeilen gesamt (SHA-256 `b62b33ff7965209d34f6dc02122980ef19b63cbf731f34ebbd6040d12ea6367a`). Statischer `<style>`-Block: Zeile 11–1550. Haupt-`<script>`-Block: Zeile 1664–23424.

**Leseregel (siehe CLAUDE.md):** index.html nie vollständig laden. Diese Karte nennen, den gesuchten Namen im Register unten finden, dann nur den genannten Zeilenbereich lesen.

## Große Bereiche

Top-Level-Blöcke (Funktionen oder Daten-consts) ab 30 Zeilen oder 2000 Zeichen (z. B. `SEASON_CONFIG`). Das Zeichen-Kriterium existiert wegen des früheren `STATIC_SEASON_DATA`-Blocks — seit Token-Diät Teil 2 in `season-data-embedded.js` ausgelagert, siehe docs/season-data-import.md, deshalb unten nicht mehr gelistet:

| Name | Art | Zeile | Zeilen |
|---|---|---|---|
| `SEASON_CONFIG` | const-data | 1718–1812 | 95 |
| `TYPE_DESC` | const-data | 1915–1938 | 24 |
| `ROLE_TRAIT_COLORS` | const-data | 2023–2062 | 40 |
| `ROLE_TRAIT_TOOLTIPS` | const-data | 2084–2123 | 40 |
| `appendSeasonGameDiagnostics` | function | 2561–2626 | 66 |
| `resolveRosterPlayerByRef` | function | 2829–2859 | 31 |
| `processGame` | function | 2942–2999 | 58 |
| `parseAppHash` | function | 3249–3280 | 32 |
| `applyAppHash` | function | 3487–3517 | 31 |
| `getOrCreatePlayerProfile` | function | 3741–3773 | 33 |
| `toPublicPlayerRegistry` | function | 3928–3957 | 30 |
| `aggregateAllTimePlayers` | function | 3959–3992 | 34 |
| `emptySpecialTeamsStats` | function | 4053–4093 | 41 |
| `mergeSpecialTeamsStats` | function | 4107–4136 | 30 |
| `buildSpecialTeamsForGame` | function | 4252–4445 | 194 |
| `addGoalieGameToStats` | function | 4505–4555 | 51 |
| `buildGoalieGameRecord` | function | 4557–4605 | 49 |
| `buildGoalieStatsForSeason` | function | 4607–4686 | 80 |
| `aggregateGoalieAlltimeStats` | function | 4688–4722 | 35 |
| `getAssistDiagnostics` | function | 4749–4801 | 53 |
| `buildPlayerEvents` | function | 4931–5015 | 85 |
| `computeMetrics` | function | 5035–5167 | 133 |
| `buildSoloDuoProfile` | function | 5189–5232 | 44 |
| `identityInputs` | function | 5319–5376 | 58 |
| `buildIdentityProfiles` | function | 5420–5651 | 232 |
| `assignStatus` | function | 5698–5883 | 186 |
| `fetchTextWithDiagnostics` | function | 5918–5947 | 30 |
| `fetchSeasonGameRaw` | function | 5983–6022 | 40 |
| `validateGameStructure` | function | 6210–6249 | 40 |
| `buildDryRunReport` | function | 6316–6378 | 63 |
| `stageSeasonDataPreview` | function | 6449–6500 | 52 |
| `rSeasonDataPreviewCard` | function | 6553–6588 | 36 |
| `computeEinsatzCenterStats` | function | 6782–6812 | 31 |
| `rEinsatzCenterStats` | function | 6819–6837 | 19 |
| `einsatzCenterDeserializeAutosave` | function | 7040–7073 | 34 |
| `rEinsatzCenterGroupEditor` | function | 7383–7413 | 31 |
| `rEinsatzCenterRosterSuggestionCard` | function | 7430–7460 | 31 |
| `rEinsatzCenterGameEditor` | function | 7461–7513 | 53 |
| `rEinsatzCenterEditPage` | function | 7514–7561 | 48 |
| `loadSeasonData` | function | 7809–8278 | 470 |
| `loadSeasonForGlobal` | function | 8318–8348 | 31 |
| `loadSeason` | function | 8366–8417 | 52 |
| `ensureHallOfFameIntroOverlay` | function | 8445–8477 | 33 |
| `rMatrix` | function | 8865–8909 | 45 |
| `rRadar` | function | 8942–8989 | 48 |
| `rClutch` | function | 8992–9024 | 33 |
| `rTimeline` | function | 9027–9135 | 109 |
| `rOppBreakdown` | function | 9157–9189 | 33 |
| `generatePlayerInsights` | function | 9192–9235 | 44 |
| `rInsights` | function | 9253–9304 | 52 |
| `buildGoalieAnalysisModel` | function | 9571–9729 | 159 |
| `buildGoalieRoleProfile` | function | 9794–9867 | 74 |
| `rGoalieInsights` | function | 9986–10007 | 22 |
| `buildOpponentIntelligence` | function | 10445–10498 | 54 |
| `buildBestThirdManOptions` | function | 10648–10681 | 34 |
| `getDuoDirectScorerGameCounts` | function | 10682–10713 | 32 |
| `buildAnnotatedGoalEventsForGame` | function | 10763–10863 | 101 |
| `buildResponseGoalStatsRaw` | function | 10906–10954 | 49 |
| `buildMomentumSwingStatsRaw` | function | 10967–11037 | 71 |
| `buildDuoFloorCeiling` | function | 11044–11085 | 42 |
| `buildDuoWithWithoutImpact` | function | 11181–11214 | 34 |
| `buildDuoCompatibility` | function | 11280–11302 | 23 |
| `buildDuoProAnalysis` | function | 11339–11382 | 44 |
| `rDuoCenterPro` | function | 11383–11502 | 120 |
| `rInteractiveDuoCenterPro` | function | 11577–11632 | 56 |
| `getDifficultConnectionRowsForPlayer` | function | 11636–11680 | 45 |
| `getRosterImpactPlayerGames` | function | 11773–11814 | 42 |
| `buildRosterImpactAnalysis` | function | 11848–11916 | 69 |
| `rDifficultConnectionList` | function | 11993–12017 | 25 |
| `rDifficultConnectionListCompactLegacy` | function | 12018–12059 | 42 |
| `rDifficultConnectionListCompact` | function | 12060–12098 | 39 |
| `rDifficultConnectionsCard` | function | 12099–12135 | 37 |
| `RESPONSE_MOMENTUM_TOOLTIPS` | const-data | 12138–12169 | 32 |
| `rResponseMomentumOverviewCard` | function | 12232–12255 | 24 |
| `rMatchcenterResponseMomentum` | function | 12302–12339 | 38 |
| `getTeamAllTimeRecords` | function | 12341–12381 | 41 |
| `getAllTimeIdentityStandings` | function | 12462–12496 | 35 |
| `buildRecencyWeightedGlobalIdentityProfile` | function | 12498–12545 | 48 |
| `rHallOfFameHero` | function | 12601–12626 | 26 |
| `hallGoalieRowFromStats` | function | 12724–12756 | 33 |
| `rHallGoalieRankCard` | function | 12809–12840 | 32 |
| `rHallGoalieLegends` | function | 12858–12890 | 33 |
| `buildDuoComparison` | function | 13285–13304 | 20 |
| `rDuoCompareSummaryCards` | function | 13310–13340 | 31 |
| `rDuoComparisonPage` | function | 13441–13451 | 11 |
| `buildComparisonExtraMetrics` | function | 13496–13553 | 58 |
| `buildGoalieComparisonDataset` | function | 13590–13640 | 51 |
| `buildComparisonDataset` | function | 13641–13676 | 36 |
| `rKpiMirrorRows` | function | 13716–13775 | 60 |
| `rKpiRadar` | function | 13787–13821 | 35 |
| `rKpiTrendCompare` | function | 13868–13934 | 67 |
| `rKpiOpponentStrength` | function | 13935–13962 | 28 |
| `rKpiInfoCards` | function | 13973–14004 | 32 |
| `buildComparisonSummary` | function | 14005–14036 | 32 |
| `rComparisonStyles` | function | 14074–14111 | 38 |
| `rComparisonCenterPage` | function | 14112–14162 | 51 |
| `rGlobalDnaBars` | function | 14203–14232 | 30 |
| `buildSeasonPlayerDashModel` | function | 14302–14338 | 37 |
| `buildAlltimePlayerDashModel` | function | 14339–14381 | 43 |
| `rPlayerDashStyles` | function | 14382–14393 | 12 |
| `rPlayerDash` | function | 14400–14438 | 39 |
| `rGlobalOverview` | function | 14497–14548 | 52 |
| `rGlobalDevelopment` | function | 14568–14606 | 39 |
| `rGlobalDuoNetwork` | function | 14668–14865 | 198 |
| `rGlobalOpponentSpecialist` | function | 14867–14912 | 46 |
| `buildFieldPlayerExplanation` | function | 14978–15052 | 75 |
| `buildGoaliePlayerExplanation` | function | 15053–15106 | 54 |
| `buildPlayerIntelligence` | function | 15116–15145 | 30 |
| `rPlayerExplanation` | function | 15151–15202 | 52 |
| `rAllTimePlayersPage` | function | 15204–15244 | 41 |
| `rHallOfFamePage` | function | 15246–15334 | 89 |
| `rLexiconPage` | function | 15361–15533 | 173 |
| `buildConfidence` | function | 15550–15595 | 46 |
| `getMatchcenterOpponents` | function | 15759–15791 | 33 |
| `getMatchcenterDirectOpponents` | function | 15792–15822 | 31 |
| `matchcenterAnalyzeDirect` | function | 15825–15861 | 37 |
| `matchcenterEnsureUlmPlayer` | function | 15918–15955 | 38 |
| `matchcenterAddUlmScoring` | function | 15980–16017 | 38 |
| `matchcenterFinalizeUlmPlayers` | function | 16018–16086 | 69 |
| `matchcenterBuildUlmPlayerScouting` | function | 16087–16141 | 55 |
| `matchcenterEnsureOpponentDuo` | function | 16159–16191 | 33 |
| `matchcenterFinalizeOpponentDuos` | function | 16218–16252 | 35 |
| `matchcenterBuildOpponentDuos` | function | 16253–16297 | 45 |
| `matchcenterEnsureUlmDuo` | function | 16312–16349 | 38 |
| `matchcenterFinalizeUlmDuos` | function | 16369–16404 | 36 |
| `matchcenterBuildUlmDuos` | function | 16405–16447 | 43 |
| `matchcenterBuildSpecialTeamsMatchup` | function | 16481–16528 | 48 |
| `matchcenterBuildGoalieMatchup` | function | 16551–16596 | 46 |
| `matchcenterTimingStatsForGames` | function | 16629–16665 | 37 |
| `rMatchcenterUlmScouting` | function | 17009–17045 | 37 |
| `rMatchcenterOpponentScouting` | function | 17046–17081 | 36 |
| `rMatchcenterUlmDuos` | function | 17190–17232 | 43 |
| `rMatchcenterOpponentDuos` | function | 17233–17275 | 43 |
| `rMatchcenterSpecialTeams` | function | 17288–17337 | 50 |
| `matchcenterBuildPlanConfidence` | function | 17428–17475 | 48 |
| `matchcenterBuildIntelligenceDataQuality` | function | 17524–17593 | 70 |
| `matchcenterBuildOpponentDNA` | function | 17594–17706 | 113 |
| `matchcenterBuildOpponentAlarm` | function | 17773–17882 | 110 |
| `matchcenterBuildIntelligenceSignals` | function | 17929–17975 | 47 |
| `buildMatchIntelligenceFromContext` | function | 17976–18030 | 55 |
| `buildMatchStories` | function | 18079–18108 | 30 |
| `buildDigitalCoachReport` | function | 18179–18211 | 33 |
| `buildMatchdayCaptionBlocks` | function | 18283–18312 | 30 |
| `buildSocialMediaContent` | function | 18313–18361 | 49 |
| `lineupRosterGamesForPlayer` | function | 18429–18476 | 48 |
| `buildLineupExperienceProfile` | function | 18477–18519 | 43 |
| `buildLineupOpponentDNAFit` | function | 18532–18575 | 44 |
| `classifyLineIdentity` | function | 18576–18623 | 48 |
| `lineupPlayerProfile` | function | 18624–18699 | 76 |
| `buildLineupAnalysis` | function | 18700–18833 | 134 |
| `buildLineupScoreBreakdowns` | function | 18834–18863 | 30 |
| `lineupEvaluateComplementCandidate` | function | 18947–19025 | 79 |
| `buildTeamLineBalance` | function | 19051–19094 | 44 |
| `buildLineupRecommendations` | function | 19131–19212 | 82 |
| `matchcenterBuildMatchPlan` | function | 19241–19386 | 146 |
| `rMatchcenterOpponentDNA` | function | 19421–19453 | 33 |
| `rMatchcenterIntelOverview` | function | 19476–19521 | 46 |
| `rMatchcenterDigitalCoach` | function | 19563–19627 | 65 |
| `rMatchcenterLockerRoomSheet` | function | 19645–19700 | 56 |
| `downloadMatchdayStory` | window | 19719–19766 | 48 |
| `rSocialVideoBlock` | function | 19770–19801 | 32 |
| `generateSocialVideoVideos` | window | 19811–19852 | 42 |
| `rMatchcenterSocialMediaCenter` | function | 19903–19956 | 54 |
| `rMatchcenterLineupBuilder` | function | 19988–20060 | 73 |
| `rLineupBuilderAvailablePanel` | function | 20075–20122 | 48 |
| `rLineupRecommendationMode` | function | 20138–20171 | 34 |
| `rLineupTestLine` | function | 20185–20233 | 49 |
| `rLineupBuilderPage` | function | 20251–20285 | 35 |
| `rMatchcenterScoutingSummary` | function | 20286–20329 | 44 |
| `getTeamLogoUrlForStory` | function | 20374–20403 | 30 |
| `matchcenterStoryPickFactItems` | function | 20526–20578 | 53 |
| `buildMatchcenterStoryPreviewData` | function | 20797–20908 | 112 |
| `matchcenterStoryVisibleFacts` | function | 20915–20945 | 31 |
| `rMatchcenterStoryPreview` | function | 20964–21033 | 70 |
| `fitMatchcenterStoryLayout` | function | 21040–21082 | 43 |
| `rMatchcenterPage` | function | 21161–21309 | 149 |
| `rTeamPage` | function | 21310–21648 | 339 |
| `exportExcel` | function | 21653–21678 | 26 |
| `_render` | function | 21702–21871 | 170 |
| `uiObjektseite` | function | 22257–22290 | 34 |
| `rMatchdayDetailPage` | function | 22558–22597 | 40 |
| `buildOverviewCards` | function | 22879–22919 | 41 |

## CSS-Regelgruppen

Aufeinanderfolgende Regeln mit gleichem Selektor-Präfix, innerhalb des statischen `<style>`-Blocks (Zeile 11–1550):

| Präfix | Zeile | Regeln |
|---|---|---|
| `:root` | 12–39 | 1 |
| `*` | 40–40 | 1 |
| `body` | 41–41 | 1 |
| `#cover` | 44–44 | 1 |
| `#cover::before` | 45–45 | 1 |
| `#cover::after` | 46–46 | 1 |
| `#cover` | 47–47 | 1 |
| `cv-skyline` | 48–56 | 9 |
| `@media(max-width:700px)` | 59–59 | 1 |
| `@media(prefers-reduced-motion:reduce)` | 60–60 | 1 |
| `cv-brand` | 61–61 | 1 |
| `cv-logo` | 62–63 | 2 |
| `cv-title` | 65–66 | 2 |
| `cv-sub` | 67–67 | 1 |
| `cv-div` | 68–68 | 1 |
| `cv-main` | 69–69 | 1 |
| `cv-action` | 70–81 | 12 |
| `#cover` | 82–82 | 1 |
| `cv-lexicon` | 83–83 | 1 |
| `#cover` | 84–84 | 1 |
| `cv-nav` | 85–86 | 2 |
| `cv-season` | 87–105 | 19 |
| `cv-stats` | 106–106 | 1 |
| `cvs` | 107–107 | 1 |
| `cvs-val` | 108–108 | 1 |
| `cvs-lbl` | 109–109 | 1 |
| `hidden` | 110–110 | 1 |
| `@media(max-width:760px)` | 111–111 | 1 |
| `matchcenter-page` | 114–114 | 1 |
| `mc-hero` | 115–117 | 3 |
| `mc-eyebrow` | 118–118 | 1 |
| `mc-title` | 119–119 | 1 |
| `mc-sub` | 120–120 | 1 |
| `mc-control` | 121–121 | 1 |
| `mc-field` | 122–122 | 1 |
| `mc-label` | 123–123 | 1 |
| `mc-select` | 124–125 | 2 |
| `mc-status` | 126–126 | 1 |
| `mc-tabs` | 127–127 | 1 |
| `mc-tab` | 128–129 | 2 |
| `mc-section` | 130–133 | 4 |
| `mc-kpi` | 134–134 | 1 |
| `mc-card` | 135–138 | 4 |
| `mc-big` | 139–139 | 1 |
| `mc-value` | 140–140 | 1 |
| `mc-muted` | 141–141 | 1 |
| `mc-split` | 142–142 | 1 |
| `mc-form` | 143–143 | 1 |
| `mc-team` | 144–145 | 2 |
| `mc-score` | 146–146 | 1 |
| `mc-form` | 147–152 | 6 |
| `mc-mini` | 153–156 | 4 |
| `mc-vs` | 157–157 | 1 |
| `mc-score` | 158–162 | 5 |
| `mc-vs` | 163–163 | 1 |
| `mc-insight` | 164–165 | 2 |
| `mc-games` | 166–167 | 2 |
| `mc-game` | 168–169 | 2 |
| `mc-result` | 170–171 | 2 |
| `mc-empty` | 172–172 | 1 |
| `mc-watch` | 173–175 | 3 |
| `mc-player` | 176–177 | 2 |
| `mc-danger` | 178–181 | 4 |
| `mc-watch` | 182–182 | 1 |
| `mc-stat` | 183–184 | 2 |
| `mc-rank` | 185–187 | 3 |
| `mc-player` | 188–188 | 1 |
| `mc-rank` | 189–189 | 1 |
| `mc-player` | 190–190 | 1 |
| `mc-form` | 191–194 | 4 |
| `mc-scout` | 195–195 | 1 |
| `mc-duo` | 196–199 | 4 |
| `mc-special` | 200–206 | 7 |
| `mc-st` | 207–209 | 3 |
| `mc-goalie` | 210–215 | 6 |
| `mc-summary` | 216–220 | 5 |
| `mc-intel` | 221–252 | 32 |
| `mc-coach` | 253–274 | 22 |
| `mc-locker` | 275–286 | 12 |
| `mc-output` | 287–288 | 2 |
| `mc-social` | 289–301 | 13 |
| `player-explain` | 302–315 | 14 |
| `lineup-builder` | 316–365 | 50 |
| `mc-timing` | 366–366 | 1 |
| `mc-time` | 367–372 | 6 |
| `mc-priority` | 373–376 | 4 |
| `mc-confidence` | 377–379 | 3 |
| `p1-score` | 380–386 | 7 |
| `p1-empty` | 387–391 | 5 |
| `mc-plan` | 392–419 | 28 |
| `mc-hero` | 420–420 | 1 |
| `mc-story` | 421–497 | 77 |
| `mc-feed` | 504–520 | 17 |
| `@media(max-width:980px)` | 521–522 | 2 |
| `@media(max-width:620px)` | 523–523 | 1 |
| `html` | 526–526 | 1 |
| `body` | 527–527 | 1 |
| `button` | 528–528 | 1 |
| `button:focus-visible` | 529–529 | 1 |
| `section-grid` | 530–530 | 1 |
| `card-grid` | 531–531 | 1 |
| `kpi-grid` | 532–532 | 1 |
| `two-column` | 533–533 | 1 |
| `:where(.team-card` | 534–535 | 2 |
| `:where(.team-card-title` | 536–536 | 1 |
| `:where(.mc-big` | 537–537 | 1 |
| `:where(.nav-btn` | 538–539 | 2 |
| `view-back` | 540–540 | 1 |
| `:where(.nav-btn.active` | 541–541 | 1 |
| `:where(.btn-exp)` | 542–542 | 1 |
| `:where(.nav-btn:hover` | 543–543 | 1 |
| `:where(.mc-confidence-badge` | 545–545 | 1 |
| `badge-muted` | 546–546 | 1 |
| `badge-primary` | 547–547 | 1 |
| `badge-success` | 548–548 | 1 |
| `badge-warning` | 549–549 | 1 |
| `badge-danger` | 550–550 | 1 |
| `badge-gold` | 551–551 | 1 |
| `:where(.tabs` | 552–552 | 1 |
| `:where(.tb` | 553–553 | 1 |
| `:where(.tb:hover` | 554–554 | 1 |
| `:where(.tb.active` | 555–555 | 1 |
| `:where(.mc-empty` | 556–556 | 1 |
| `:where(.wrn-box)` | 557–557 | 1 |
| `:where(.ok-box)` | 558–558 | 1 |
| `#global-tip` | 559–559 | 1 |
| `th-tip` | 560–560 | 1 |
| `details` | 561–561 | 1 |
| `details>summary` | 562–562 | 1 |
| `details>summary::-webkit-details-marker` | 563–563 | 1 |
| `details>summary::after` | 564–564 | 1 |
| `details[open]>summary::after` | 565–565 | 1 |
| `p1-score` | 566–566 | 1 |
| `tw` | 567–567 | 1 |
| `mc-story` | 568–569 | 2 |
| `lineup-builder` | 570–571 | 2 |
| `@media(max-width:980px)` | 572–576 | 1 |
| `@media(max-width:700px)` | 577–595 | 1 |
| `@media(prefers-reduced-motion:reduce)` | 596–598 | 1 |
| `vfb-hof` | 601–632 | 32 |
| `@media(max-width:640px)` | 641–641 | 1 |
| `@media(prefers-reduced-motion:reduce)` | 642–642 | 1 |
| `#main` | 645–645 | 1 |
| `ld` | 648–648 | 1 |
| `ld-title` | 649–649 | 1 |
| `prog-o` | 650–650 | 1 |
| `prog-i` | 651–651 | 1 |
| `prog-sub` | 652–652 | 1 |
| `hdr` | 655–655 | 1 |
| `hdr-l` | 656–656 | 1 |
| `hdr-logo` | 657–657 | 1 |
| `hdr-title` | 658–659 | 2 |
| `hdr-sub` | 660–660 | 1 |
| `hdr-nav` | 661–661 | 1 |
| `nav-btn` | 662–664 | 3 |
| `btn-exp` | 665–665 | 1 |
| `btn-back` | 666–666 | 1 |
| `ptabs` | 669–669 | 1 |
| `ptab` | 670–672 | 3 |
| `star-dot` | 673–673 | 1 |
| `player-badge` | 674–676 | 3 |
| `scorer-star` | 677–680 | 4 |
| `enforcer-marker` | 681–681 | 1 |
| `stats` | 684–684 | 1 |
| `sc` | 685–686 | 2 |
| `c1` | 687–687 | 1 |
| `c4` | 688–688 | 1 |
| `sv` | 689–689 | 1 |
| `sl` | 690–690 | 1 |
| `tags-row` | 693–693 | 1 |
| `tag` | 694–694 | 1 |
| `tabs` | 697–698 | 2 |
| `tb` | 699–701 | 3 |
| `tw` | 704–704 | 1 |
| `table` | 705–705 | 1 |
| `thead` | 706–706 | 1 |
| `tbody` | 707–709 | 3 |
| `bdg` | 710–710 | 1 |
| `bt` | 711–711 | 1 |
| `bv` | 712–712 | 1 |
| `bs` | 713–713 | 1 |
| `bwin` | 714–714 | 1 |
| `bdraw` | 715–715 | 1 |
| `bloss` | 716–716 | 1 |
| `bclutch` | 717–717 | 1 |
| `mono` | 718–718 | 1 |
| `chip` | 719–719 | 1 |
| `pg` | 722–722 | 1 |
| `pc` | 723–723 | 1 |
| `pcb` | 724–724 | 1 |
| `pch` | 725–725 | 1 |
| `pcn` | 726–726 | 1 |
| `pbg` | 727–727 | 1 |
| `pbf` | 728–728 | 1 |
| `pev` | 729–729 | 1 |
| `radar-wrap` | 732–732 | 1 |
| `radar-stats` | 733–733 | 1 |
| `rstat` | 734–734 | 1 |
| `rstat-name` | 735–735 | 1 |
| `rstat-bar` | 736–737 | 2 |
| `rstat-val` | 738–738 | 1 |
| `cl-grid` | 741–741 | 1 |
| `clcard` | 742–742 | 1 |
| `clcard-bar` | 743–743 | 1 |
| `clval` | 744–744 | 1 |
| `cllbl` | 745–745 | 1 |
| `ctx-bars` | 746–746 | 1 |
| `ctx-row` | 747–747 | 1 |
| `ctx-lbl` | 748–748 | 1 |
| `ctx-bg` | 749–749 | 1 |
| `ctx-fill` | 750–750 | 1 |
| `ctx-cnt` | 751–751 | 1 |
| `cl-ev` | 752–752 | 1 |
| `opp-str` | 753–753 | 1 |
| `tl-wrap` | 756–756 | 1 |
| `in-grid` | 759–759 | 1 |
| `ic` | 760–760 | 1 |
| `ic-bar` | 761–761 | 1 |
| `ititle` | 762–762 | 1 |
| `imain` | 763–763 | 1 |
| `isub` | 764–764 | 1 |
| `team-grid` | 767–767 | 1 |
| `team-card` | 768–769 | 2 |
| `game-row` | 770–771 | 2 |
| `game-date` | 772–772 | 1 |
| `game-opp` | 773–773 | 1 |
| `game-score` | 774–774 | 1 |
| `game-ind` | 775–775 | 1 |
| `stnd-tbl` | 776–780 | 5 |
| `stnd-ulm` | 781–782 | 2 |
| `rank-badge` | 783–783 | 1 |
| `rank-1` | 784–784 | 1 |
| `rank-2` | 785–785 | 1 |
| `rank-3` | 786–786 | 1 |
| `rank-def` | 787–787 | 1 |
| `rank-bar` | 788–789 | 2 |
| `rank-num` | 790–790 | 1 |
| `rank-name` | 791–791 | 1 |
| `rank-bg` | 792–792 | 1 |
| `rank-fill` | 793–793 | 1 |
| `rank-val` | 794–794 | 1 |
| `st-shell` | 795–795 | 1 |
| `st-grid` | 796–796 | 1 |
| `st-card` | 797–800 | 4 |
| `st-label` | 801–801 | 1 |
| `st-value` | 802–802 | 1 |
| `st-sub` | 803–803 | 1 |
| `st-bar` | 804–804 | 1 |
| `st-fill` | 805–805 | 1 |
| `st-detail` | 806–810 | 5 |
| `st-mini` | 811–812 | 2 |
| `st-games` | 813–813 | 1 |
| `st-game` | 814–816 | 3 |
| `st-toggle` | 817–818 | 2 |
| `st-card` | 819–819 | 1 |
| `@media(max-width:760px)` | 820–820 | 1 |
| `noev` | 823–823 | 1 |
| `wrn-box` | 824–824 | 1 |
| `ok-box` | 825–825 | 1 |
| `stitle` | 826–826 | 1 |
| `sep` | 827–827 | 1 |
| `tag` | 830–830 | 1 |
| `tags-row` | 831–831 | 1 |
| `tag-tip` | 832–833 | 2 |
| `tag` | 834–834 | 1 |
| `opp-breakdown` | 837–837 | 1 |
| `obd` | 838–838 | 1 |
| `obd-val` | 839–839 | 1 |
| `obd-lbl` | 840–840 | 1 |
| `obd-sub` | 841–841 | 1 |
| `th-tip` | 845–845 | 1 |
| `#global-tip` | 846–846 | 1 |
| `duo-row` | 847–848 | 2 |
| `duo-num` | 849–849 | 1 |
| `duo-names` | 850–850 | 1 |
| `duo-bar` | 851–852 | 2 |
| `hof-duo` | 855–861 | 4 |
| `duo-col` | 863–868 | 1 |
| `duo-col` | 870–875 | 1 |
| `duo-col` | 877–893 | 1 |
| `duo-col` | 895–900 | 1 |
| `duo-col` | 902–907 | 1 |
| `hof-duo` | 908–908 | 1 |
| `duo-val` | 909–909 | 1 |
| `hof-shell` | 912–912 | 1 |
| `hof-hero` | 913–916 | 2 |
| `hof-crest` | 917–917 | 1 |
| `hof-hero` | 918–918 | 1 |
| `hof-kicker` | 919–919 | 1 |
| `hof-subline` | 920–920 | 1 |
| `hof-arc` | 921–921 | 1 |
| `hof-bird` | 922–923 | 2 |
| `hof-section` | 924–924 | 1 |
| `hof-grid` | 925–926 | 2 |
| `hof-card` | 927–929 | 3 |
| `hof-goalie` | 930–945 | 16 |
| `hof-sg` | 946–946 | 1 |
| `hof-filter` | 947–950 | 4 |
| `hof-goalie` | 951–958 | 8 |
| `@media(max-width:640px)` | 959–966 | 1 |
| `hof-card` | 968–968 | 1 |
| `hof-podium` | 969–969 | 1 |
| `podium-place` | 970–973 | 4 |
| `podium-medal` | 974–974 | 1 |
| `podium-place` | 975–975 | 1 |
| `podium-name` | 976–976 | 1 |
| `podium-value` | 977–977 | 1 |
| `podium-place` | 978–978 | 1 |
| `podium-label` | 979–979 | 1 |
| `hof-rest` | 980–980 | 1 |
| `at-hero` | 981–983 | 3 |
| `at-name` | 984–984 | 1 |
| `at-meta` | 985–985 | 1 |
| `at-rank` | 986–988 | 3 |
| `at-kpis` | 989–989 | 1 |
| `at-kpi` | 990–993 | 4 |
| `at-grid` | 994–994 | 1 |
| `at-card` | 995–996 | 2 |
| `trend-row` | 997–998 | 2 |
| `trend-season` | 999–999 | 1 |
| `trend-bars` | 1000–1000 | 1 |
| `trend-bg` | 1001–1001 | 1 |
| `trend-fill` | 1002–1002 | 1 |
| `trend-val` | 1003–1003 | 1 |
| `sparkline` | 1004–1004 | 1 |
| `dna-row` | 1005–1005 | 1 |
| `dna-label` | 1006–1006 | 1 |
| `dna-bg` | 1007–1007 | 1 |
| `dna-fill` | 1008–1008 | 1 |
| `dna-val` | 1009–1009 | 1 |
| `partner-pill` | 1010–1013 | 4 |
| `team-card` | 1014–1017 | 4 |
| `hof-shell` | 1018–1018 | 1 |
| `role-switch` | 1019–1019 | 1 |
| `role-btn` | 1020–1023 | 4 |
| `goalie-shell` | 1024–1024 | 1 |
| `goalie-head` | 1025–1025 | 1 |
| `goalie-title` | 1026–1026 | 1 |
| `goalie-sub` | 1027–1027 | 1 |
| `goalie-pill` | 1028–1028 | 1 |
| `goalie-tabs` | 1029–1029 | 1 |
| `goalie-tab` | 1030–1031 | 2 |
| `goalie-role` | 1032–1032 | 1 |
| `goalie-grid` | 1033–1033 | 1 |
| `goalie-kpi` | 1034–1036 | 3 |
| `goalie-val` | 1037–1037 | 1 |
| `goalie-lbl` | 1038–1038 | 1 |
| `goalie-card` | 1039–1039 | 1 |
| `goalie-dashboard` | 1040–1040 | 1 |
| `goalie-section` | 1041–1041 | 1 |
| `goalie-mini` | 1042–1042 | 1 |
| `goalie-metric` | 1043–1045 | 3 |
| `goalie-profile` | 1046–1047 | 2 |
| `goalie-stack` | 1048–1049 | 2 |
| `goalie-tier` | 1050–1055 | 6 |
| `goalie-note` | 1056–1056 | 1 |
| `goalie-bars` | 1057–1057 | 1 |
| `goalie-bar` | 1058–1062 | 5 |
| `goalie-dna` | 1063–1068 | 6 |
| `goalie-insights` | 1069–1069 | 1 |
| `goalie-insight` | 1070–1072 | 3 |
| `goalie-table` | 1073–1075 | 3 |
| `@media(max-width:900px)` | 1076–1076 | 1 |
| `@media(max-width:560px)` | 1077–1077 | 1 |
| `@media(max-width:720px)` | 1078–1082 | 1 |
| `body` | 1085–1085 | 1 |
| `button` | 1086–1086 | 1 |
| `cv-action` | 1087–1088 | 2 |
| `mc-eyebrow` | 1089–1089 | 1 |
| `mc-sub` | 1090–1090 | 1 |
| `sl` | 1091–1091 | 1 |
| `cvs-lbl` | 1092–1092 | 1 |
| `mc-value` | 1093–1093 | 1 |
| `#global-tip` | 1094–1094 | 1 |
| `rm-term` | 1095–1095 | 1 |
| `duo-compare` | 1096–1105 | 10 |
| `duo-profile` | 1106–1106 | 1 |
| `duo-flow` | 1107–1107 | 1 |
| `duo-impact` | 1108–1108 | 1 |
| `duo-details` | 1109–1109 | 1 |
| `@media(max-width:640px)` | 1110–1110 | 1 |
| `tag` | 1111–1111 | 1 |
| `timeline-role` | 1112–1114 | 3 |
| `difficult-connections` | 1115–1115 | 1 |
| `difficult-note` | 1116–1116 | 1 |
| `difficult-scope` | 1117–1117 | 1 |
| `difficult-list` | 1118–1118 | 1 |
| `difficult-row` | 1119–1119 | 1 |
| `difficult-main` | 1120–1122 | 3 |
| `difficult-metric` | 1123–1123 | 1 |
| `difficult-confidence` | 1124–1124 | 1 |
| `difficult-empty` | 1125–1125 | 1 |
| `difficult-impact` | 1126–1130 | 5 |
| `difficult-score` | 1131–1131 | 1 |
| `difficult-impact` | 1132–1137 | 6 |
| `difficult-delta` | 1138–1140 | 3 |
| `difficult-impact` | 1141–1141 | 1 |
| `difficult-direct` | 1142–1142 | 1 |
| `difficult-toolbar` | 1143–1143 | 1 |
| `difficult-compact` | 1144–1145 | 2 |
| `difficult-details` | 1146–1148 | 3 |
| `difficult-more` | 1149–1149 | 1 |
| `lineup-builder` | 1150–1152 | 3 |
| `duo-pro` | 1153–1160 | 8 |
| `duo-third` | 1161–1163 | 3 |
| `duo-warning` | 1164–1169 | 6 |
| `@media(max-width:760px)` | 1170–1177 | 1 |
| `:root` | 1180–1180 | 1 |
| `#main` | 1181–1181 | 1 |
| `hdr` | 1182–1182 | 1 |
| `hdr-l` | 1183–1183 | 1 |
| `hdr-nav` | 1184–1184 | 1 |
| `:where(.matchcenter-page` | 1185–1185 | 1 |
| `:where(.team-grid` | 1186–1186 | 1 |
| `:where(.team-card` | 1187–1188 | 2 |
| `:where(.mc-card.accent-gold` | 1189–1189 | 1 |
| `:where(.mc-card.accent-red` | 1190–1190 | 1 |
| `:where(.mc-goalie-card` | 1191–1191 | 1 |
| `:where(.team-card-title` | 1192–1192 | 1 |
| `:where(.mc-section-title` | 1193–1193 | 1 |
| `:where(.mc-muted` | 1194–1194 | 1 |
| `:where(.mc-big` | 1195–1195 | 1 |
| `:where(.mc-summary-value` | 1196–1196 | 1 |
| `:where(.mc-danger-score` | 1197–1197 | 1 |
| `:where(.mc-mini` | 1198–1198 | 1 |
| `:where(.mc-player-name` | 1199–1199 | 1 |
| `:where(.mc-stat-pill` | 1200–1200 | 1 |
| `:where(.mc-tab` | 1201–1201 | 1 |
| `:where(.mc-tabs` | 1202–1202 | 1 |
| `:where(.mc-score-bar` | 1203–1203 | 1 |
| `mc-score` | 1204–1204 | 1 |
| `lineup-builder` | 1205–1207 | 3 |
| `duo-pro` | 1208–1208 | 1 |
| `duo-third` | 1209–1209 | 1 |
| `difficult-impact` | 1210–1210 | 1 |
| `mc-story` | 1211–1211 | 1 |
| `mc-empty` | 1212–1212 | 1 |
| `table` | 1213–1213 | 1 |
| `team-card` | 1214–1215 | 2 |
| `mc-section` | 1216–1216 | 1 |
| `mc-summary` | 1217–1217 | 1 |
| `mc-tab` | 1218–1218 | 1 |
| `mc-player` | 1219–1219 | 1 |
| `noev` | 1220–1220 | 1 |
| `mono` | 1221–1221 | 1 |
| `:where(.bdg` | 1222–1222 | 1 |
| `:where(.sl` | 1223–1223 | 1 |
| `:where(.partner-pill` | 1224–1224 | 1 |
| `@media(max-width:980px)` | 1225–1228 | 1 |
| `@media(max-width:640px)` | 1229–1235 | 1 |
| `season-profile` | 1238–1282 | 45 |
| `difficult-connections` | 1285–1286 | 2 |
| `difficult-impact` | 1287–1289 | 3 |
| `difficult-compact` | 1290–1290 | 1 |
| `difficult-compare` | 1291–1297 | 7 |
| `difficult-impact` | 1298–1298 | 1 |
| `difficult-metric` | 1299–1305 | 7 |
| `difficult-details` | 1306–1306 | 1 |
| `difficult-direct` | 1307–1307 | 1 |
| `response-momentum` | 1308–1314 | 7 |
| `rm-term` | 1315–1315 | 1 |
| `player-explain` | 1316–1318 | 3 |
| `@media(max-width:720px)` | 1319–1325 | 1 |
| `@media(max-width:900px)` | 1326–1328 | 1 |
| `@media(max-width:560px)` | 1329–1336 | 1 |
| `ui-kpi` | 1349–1356 | 8 |
| `ui-info` | 1357–1359 | 3 |
| `ui-delta` | 1360–1363 | 4 |
| `ui-reliability` | 1364–1367 | 4 |
| `ui-kernaussage` | 1369–1370 | 2 |
| `ui-hinweis` | 1372–1375 | 4 |
| `ui-rangliste` | 1377–1384 | 8 |
| `ui-verlauf` | 1386–1387 | 2 |
| `ui-intervall` | 1389–1393 | 5 |
| `ui-methodenbox` | 1395–1400 | 6 |
| `ui-notiz` | 1402–1402 | 1 |
| `ui-datenstand` | 1406–1406 | 1 |
| `ui-platzhalter` | 1408–1409 | 2 |
| `@media(prefers-reduced-motion:reduce)` | 1411–1411 | 1 |
| `@media(max-width:600px)` | 1413–1416 | 1 |
| `ui-objektseite` | 1425–1433 | 9 |
| `@media(max-width:600px)` | 1435–1438 | 1 |
| `@media(max-width:360px)` | 1439–1441 | 1 |
| `ia-context` | 1450–1454 | 5 |
| `ia-mainnav` | 1455–1458 | 4 |
| `ia-placeholder` | 1459–1460 | 2 |
| `ia-overview` | 1467–1471 | 5 |
| `ia-matchday` | 1477–1485 | 9 |
| `ia-back` | 1486–1486 | 1 |
| `ia-search` | 1492–1506 | 15 |
| `@media(max-width:600px)` | 1507–1509 | 1 |
| `ia-tool` | 1515–1522 | 8 |
| `ia-mainnav` | 1531–1531 | 1 |
| `@media(max-width:600px)` | 1532–1542 | 1 |
| `@media(max-width:600px)` | 1544–1549 | 1 |

## @keyframes

| Name | Zeile |
|---|---|
| `cv-skyline-sweep` | 57–57 |
| `cv-skyline-pulse-opacity` | 58–58 |
| `pulse` | 64–64 |
| `vfb-hof-intro-flash` | 633–633 |
| `vfb-hof-intro-bar` | 634–634 |
| `vfb-hof-intro-crown` | 635–635 |
| `vfb-hof-intro-float` | 636–636 |
| `vfb-hof-intro-letter` | 637–637 |
| `vfb-hof-intro-sub` | 638–638 |
| `vfb-hof-intro-spark` | 639–639 |
| `vfb-hof-intro-shimmer` | 640–640 |
| `ui-platzhalter-shimmer` | 1410–1410 |

## Funktionen, window.-Zuweisungen und const-Pfeilfunktionen (nach Zeile)

1041 `function`-Deklarationen, 134 `window.`-Funktionszuweisungen, 4 `const`-Pfeilfunktionen — alle Top-Level, sortiert nach Zeile.

| Name | Art | Zeile | Zeilen |
|---|---|---|---|
| `createSeasonBucket` | function | 1813–1827 | 15 |
| `getSeasonApiBaseUrl` | function | 1838–1854 | 17 |
| `seasonApiUrl` | function | 1855–1857 | 3 |
| `getSeasonOriginBaseUrl` | function | 1858–1866 | 9 |
| `seasonPathPrefix` | function | 1867–1869 | 3 |
| `uniqueList` | function | 1870–1872 | 3 |
| `seasonGameApiUrls` | function | 1873–1882 | 10 |
| `seasonGameHtmlUrls` | function | 1883–1890 | 8 |
| `clearAnalysisCache` | function | 2188–2190 | 3 |
| `analysisCacheContext` | function | 2191–2205 | 15 |
| `asOfCacheKeyPart` | function | 2219–2224 | 6 |
| `analysisCacheKey` | function | 2225–2228 | 4 |
| `cachedAnalysis` | function | 2229–2234 | 6 |
| `setState` | const-arrow | 2235–2242 | 8 |
| `invalidateGlobalIdentityCache` | function | 2243–2245 | 3 |
| `setP` | window | 2247–2247 | 1 |
| `setTab` | window | 2248–2248 | 1 |
| `setPlayerRoleView` | window | 2249–2249 | 1 |
| `setGoalieTab` | window | 2250–2250 | 1 |
| `toggleSpecialTeamsGameDetails` | window | 2251–2251 | 1 |
| `toggleMatchcenterSpecialTeamsGames` | window | 2252–2252 | 1 |
| `toggleMatchcenterPlayerDetails` | window | 2253–2253 | 1 |
| `toggleMatchcenterDuoDetails` | window | 2254–2254 | 1 |
| `setMatchcenterTab` | window | 2255–2255 | 1 |
| `openMatchcenterStoryPreview` | window | 2256–2256 | 1 |
| `closeMatchcenterStoryPreview` | window | 2257–2257 | 1 |
| `toggleHallOfFamePureSGPlayers` | window | 2258–2258 | 1 |
| `copyMatchcenterText` | window | 2259–2284 | 26 |
| `addLineupPlayer` | window | 2285–2290 | 6 |
| `removeLineupPlayer` | window | 2291–2291 | 1 |
| `clearLineupPlayers` | window | 2292–2292 | 1 |
| `filterLineupPlayers` | window | 2293–2299 | 7 |
| `lineupBuilderPoolIds` | function | 2300–2302 | 3 |
| `normalizeLineupLines` | function | 2303–2307 | 5 |
| `setLineupBuilderSeason` | window | 2308–2319 | 12 |
| `setLineupBuilderOpponent` | window | 2320–2320 | 1 |
| `setLineupBuilderMode` | window | 2321–2321 | 1 |
| `setLineupActiveLine` | window | 2322–2322 | 1 |
| `toggleLineupBuilderAvailable` | window | 2323–2336 | 14 |
| `selectAllLineupAvailable` | window | 2337–2337 | 1 |
| `clearLineupAvailable` | window | 2338–2338 | 1 |
| `addLineupBuilderPlayerToLine` | window | 2339–2348 | 10 |
| `addLineupBuilderPlayerToActiveLine` | window | 2349–2349 | 1 |
| `removeLineupBuilderPlayerFromLine` | window | 2350–2356 | 7 |
| `clearLineupBuilderLine` | window | 2357–2362 | 6 |
| `showLineupComplements` | window | 2363–2363 | 1 |
| `setLineupNewPlayerProfile` | window | 2364–2364 | 1 |
| `addSyntheticLineupPlayer` | window | 2365–2382 | 18 |
| `setAntiSynergyView` | window | 2383–2383 | 1 |
| `toggleAntiSynergyShowAll` | window | 2384–2384 | 1 |
| `toggleAntiSynergyHideSgOnly` | window | 2385–2385 | 1 |
| `filterLineupBuilderAvailable` | window | 2386–2392 | 7 |
| `setPage` | window | 2393–2401 | 9 |
| `backToHome` | window | 2402–2408 | 7 |
| `setGlobalPlayer` | window | 2409–2409 | 1 |
| `setGlobalPlayerDuo` | window | 2410–2410 | 1 |
| `setGlobalTab` | window | 2411–2411 | 1 |
| `toggleSgOnlyAlltime` | window | 2412–2412 | 1 |
| `getActiveSeasonKey` | function | 2414–2416 | 3 |
| `getGlobalAllTimeSnapshot` | function | 2418–2425 | 8 |
| `applySeasonContext` | function | 2426–2449 | 24 |
| `fixMojibakeText` | function | 2463–2465 | 3 |
| `repairRenderedMojibake` | function | 2466–2487 | 22 |
| `getAllTimeOpponentNames` | function | 2492–2499 | 8 |
| `getUniqueAllTimeOpponentNames` | function | 2500–2502 | 3 |
| `getUlmTeamStatus` | function | 2505–2509 | 5 |
| `detectUlmSide` | function | 2510–2516 | 7 |
| `detectSide` | const-arrow | 2517–2517 | 1 |
| `normalizePlayerName` | function | 2520–2529 | 10 |
| `getPreClubHistoryPlayerNames` | function | 2530–2532 | 3 |
| `isPreClubHistoryPlayerName` | function | 2533–2537 | 5 |
| `diagnoseGameDuplicates` | function | 2539–2552 | 14 |
| `gameClassificationStatusLabel` | function | 2553–2560 | 8 |
| `appendSeasonGameDiagnostics` | function | 2561–2626 | 66 |
| `warnEventProcessingOnce` | function | 2628–2635 | 8 |
| `rosterPlayerMatches` | function | 2636–2650 | 15 |
| `getRosterGameIdsForPlayer` | function | 2651–2659 | 9 |
| `isGoalieRosterEntry` | function | 2660–2664 | 5 |
| `goalieEntryRecognitionReason` | function | 2674–2683 | 10 |
| `isExcludedGoalieAppearance` | function | 2684–2697 | 14 |
| `isGoalieAppearance` | function | 2698–2703 | 6 |
| `isFieldAppearance` | function | 2704–2709 | 6 |
| `getFieldGameIdsForPlayer` | function | 2710–2716 | 7 |
| `getGoalieGameIdsForPlayer` | function | 2717–2723 | 7 |
| `getPlayerFieldGames` | function | 2724–2727 | 4 |
| `getPlayerGoalieGames` | function | 2728–2731 | 4 |
| `roleGameStableKey` | function | 2732–2734 | 3 |
| `getPlayerAlltimeRoleGames` | function | 2735–2753 | 19 |
| `getPlayerAlltimeFieldGames` | function | 2754–2756 | 3 |
| `getPlayerAlltimeGoalieGames` | function | 2757–2759 | 3 |
| `getPlayerAlltimeTotalGames` | function | 2760–2768 | 9 |
| `getPlayerSeasonRoleGameSummary` | function | 2769–2791 | 23 |
| `getPlayedUlmGames` | function | 2792–2800 | 9 |
| `countPlayedUlmGames` | function | 2801–2803 | 3 |
| `getSeasonTeamGames` | function | 2804–2807 | 4 |
| `getSeasonTeamGameIds` | function | 2808–2810 | 3 |
| `getPlayerSourceId` | function | 2811–2813 | 3 |
| `getJerseyNumber` | function | 2814–2816 | 3 |
| `normalizeEventPlayerRef` | function | 2817–2828 | 12 |
| `resolveRosterPlayerByRef` | function | 2829–2859 | 31 |
| `resolveGoalScorerPlayer` | function | 2860–2874 | 15 |
| `getGoalScorerFromEvent` | function | 2875–2877 | 3 |
| `normalizeAssistPlayerName` | function | 2878–2880 | 3 |
| `collectAssistEventRefs` | function | 2881–2908 | 28 |
| `getAssistPlayersFromEvent` | function | 2909–2922 | 14 |
| `resolveAssistPlayer` | function | 2923–2929 | 7 |
| `t2s` | const-arrow | 2931–2931 | 1 |
| `variance` | function | 2933–2937 | 5 |
| `processGame` | function | 2942–2999 | 58 |
| `isGamePlayed` | function | 3001–3003 | 3 |
| `deriveAsOfForSeason` | function | 3034–3037 | 4 |
| `seasonKeyToHashSegment` | function | 3139–3141 | 3 |
| `hashSegmentToSeasonKey` | function | 3142–3145 | 4 |
| `isValidAsOfDate` | function | 3146–3148 | 3 |
| `isValidAsOfStartTime` | function | 3149–3151 | 3 |
| `asOfEquals` | function | 3158–3165 | 8 |
| `decodeHashSegmentSafe` | function | 3229–3231 | 3 |
| `parseAppHash` | function | 3249–3280 | 32 |
| `parseAsOfQueryValue` | function | 3288–3298 | 11 |
| `buildAppHash` | function | 3304–3316 | 13 |
| `buildGlobalPageHash` | function | 3321–3330 | 10 |
| `buildHashStringFromParsed` | function | 3336–3340 | 5 |
| `computeCurrentAppHash` | function | 3356–3368 | 13 |
| `syncHashFromState` | function | 3382–3392 | 11 |
| `withoutHashSync` | function | 3399–3407 | 9 |
| `parseLastViewState` | function | 3423–3434 | 12 |
| `getStoredLastView` | function | 3435–3438 | 4 |
| `saveLastView` | function | 3440–3442 | 3 |
| `applyGlobalPageFromHash` | function | 3454–3474 | 21 |
| `applyAppHash` | function | 3487–3517 | 31 |
| `initHashRouting` | function | 3566–3584 | 19 |
| `gameResult` | function | 3587–3593 | 7 |
| `getOppStrength` | function | 3600–3617 | 18 |
| `createPlayerAnalysisProfile` | function | 3629–3631 | 3 |
| `emptyPlayerSeasonStats` | function | 3633–3638 | 6 |
| `emptyGoalieSeasonStats` | function | 3639–3660 | 22 |
| `emptyGoalieAlltimeStats` | function | 3661–3675 | 15 |
| `emptyGoalieSpecialTeamsStats` | function | 3676–3687 | 12 |
| `emptyFieldRoleSeasonStats` | function | 3688–3690 | 3 |
| `addUnique` | function | 3692–3694 | 3 |
| `incrementUniqueCounter` | function | 3696–3701 | 6 |
| `buildPlayerIdentity` | function | 3703–3718 | 16 |
| `resetPlayerRegistrySeason` | function | 3720–3730 | 11 |
| `derivePlayerStatus` | function | 3732–3739 | 8 |
| `getOrCreatePlayerProfile` | function | 3741–3773 | 33 |
| `registerPlayerIdentity` | function | 3775–3791 | 17 |
| `ensureGoalieSeasonStats` | function | 3793–3797 | 5 |
| `ensureFieldRoleSeasonStats` | function | 3798–3802 | 5 |
| `markFieldRoleAppearance` | function | 3803–3806 | 4 |
| `registerSeasonRosters` | function | 3808–3826 | 19 |
| `linkUiPlayersToRegistry` | function | 3828–3848 | 21 |
| `applySeasonScoringToRegistry` | function | 3850–3871 | 22 |
| `finalizePlayerRegistrySeason` | function | 3873–3887 | 15 |
| `serializeSeasonStats` | function | 3889–3901 | 13 |
| `serializeGoalieSeasonStats` | function | 3902–3923 | 22 |
| `serializeFieldRoleSeasonStats` | function | 3924–3926 | 3 |
| `toPublicPlayerRegistry` | function | 3928–3957 | 30 |
| `aggregateAllTimePlayers` | function | 3959–3992 | 34 |
| `finiteNumbers` | function | 3994–3996 | 3 |
| `avgOrNull` | function | 3997–4000 | 4 |
| `medianOrNull` | function | 4001–4006 | 6 |
| `incGoalieBucket` | function | 4007–4010 | 4 |
| `goalieEventAbsSeconds` | function | 4011–4016 | 6 |
| `goalieGameDurationSeconds` | function | 4017–4021 | 5 |
| `goalieGameStateBeforeGoal` | function | 4022–4033 | 12 |
| `getGoalieOpponentName` | function | 4034–4037 | 4 |
| `getGoalieOpponentTier` | function | 4038–4042 | 5 |
| `resultGoalsAgainstForSide` | function | 4043–4052 | 10 |
| `emptySpecialTeamsStats` | function | 4053–4093 | 41 |
| `clonePlain` | function | 4094–4096 | 3 |
| `finalizeSpecialTeamsStats` | function | 4097–4103 | 7 |
| `serializeSpecialTeamsStats` | function | 4104–4106 | 3 |
| `mergeSpecialTeamsStats` | function | 4107–4136 | 30 |
| `penaltyRawText` | function | 4139–4141 | 3 |
| `isMatchPenaltyEvent` | function | 4142–4145 | 4 |
| `isTwoPlusTwoPenaltyEvent` | function | 4146–4149 | 4 |
| `getPenaltyDisciplineType` | function | 4150–4157 | 8 |
| `getGameDurationMinutes` | function | 4158–4162 | 5 |
| `gameDaySortValue` | function | 4163–4170 | 8 |
| `isSameUlmTeamContext` | function | 4171–4178 | 8 |
| `getFurtherSameDayUlmGames` | function | 4179–4190 | 12 |
| `getPenaltySpecialTeamsMinutes` | function | 4191–4193 | 3 |
| `getPenaltyBasePersonalMinutes` | function | 4194–4201 | 8 |
| `getPenaltyPersonalMinutes` | function | 4202–4211 | 10 |
| `getPenaltyDisciplineMinutes` | function | 4212–4214 | 3 |
| `getSpecialTeamsPenaltyChunks` | function | 4215–4224 | 10 |
| `isPenaltyGoalEvent` | function | 4225–4229 | 5 |
| `specialTeamsStateFromActive` | function | 4230–4236 | 7 |
| `annotateSpecialTeamsGoalEvent` | function | 4237–4251 | 15 |
| `buildSpecialTeamsForGame` | function | 4252–4445 | 194 |
| `buildSpecialTeamsForSeason` | function | 4446–4454 | 9 |
| `aggregateAlltimeSpecialTeams` | function | 4455–4462 | 8 |
| `mergeGoalieSpecialTeamsStats` | function | 4463–4474 | 12 |
| `addGoalieSpecialTeamsGameToStats` | function | 4475–4489 | 15 |
| `finalizeGoalieSeasonStats` | function | 4490–4504 | 15 |
| `addGoalieGameToStats` | function | 4505–4555 | 51 |
| `buildGoalieGameRecord` | function | 4557–4605 | 49 |
| `buildGoalieStatsForSeason` | function | 4607–4686 | 80 |
| `aggregateGoalieAlltimeStats` | function | 4688–4722 | 35 |
| `updatePlayerRoleAvailability` | function | 4724–4733 | 10 |
| `getGoalieDiagnostics` | function | 4735–4740 | 6 |
| `getSpecialTeamsDiagnostics` | function | 4742–4747 | 6 |
| `getAssistDiagnostics` | function | 4749–4801 | 53 |
| `buildSeasonDuos` | function | 4804–4830 | 27 |
| `mergeDuoSet` | function | 4831–4847 | 17 |
| `aggregateAllTimeDuos` | function | 4848–4858 | 11 |
| `aggregateSeasonStats` | function | 4860–4875 | 16 |
| `buildPlayerDataFoundation` | function | 4877–4898 | 22 |
| `buildRegistry` | function | 4900–4926 | 27 |
| `buildPlayerEvents` | function | 4931–5015 | 85 |
| `getPhaseIndex` | function | 5020–5030 | 11 |
| `computeMetrics` | function | 5035–5167 | 133 |
| `detectTypes` | function | 5169–5184 | 16 |
| `pct` | function | 5186–5186 | 1 |
| `ratio01` | function | 5187–5187 | 1 |
| `relative01` | function | 5188–5188 | 1 |
| `buildSoloDuoProfile` | function | 5189–5232 | 44 |
| `identityPartnerStats` | function | 5233–5246 | 14 |
| `identityOpponentGroups` | function | 5247–5254 | 8 |
| `eventMatchesTeams` | function | 5255–5260 | 6 |
| `clutchText` | function | 5261–5261 | 1 |
| `isImportantClutchGoal` | function | 5262–5266 | 5 |
| `isDecisiveGoal` | function | 5267–5269 | 3 |
| `isLateGoal` | function | 5270–5274 | 5 |
| `isComebackRelevantGoal` | function | 5275–5278 | 4 |
| `identityPointsVsTeams` | function | 5279–5281 | 3 |
| `identityGoalsVsTeams` | function | 5282–5284 | 3 |
| `identityClutchGoalsVsTeams` | function | 5285–5287 | 3 |
| `identityDecisiveGoalsVsTeams` | function | 5288–5290 | 3 |
| `identityLateGoalsVsTeams` | function | 5291–5293 | 3 |
| `countMomentumClusters` | function | 5294–5318 | 25 |
| `identityInputs` | function | 5319–5376 | 58 |
| `clearlyAboveAverage` | function | 5377–5377 | 1 |
| `normalizeSecondaryTraits` | function | 5378–5389 | 12 |
| `seasonRoleTraitsFromClassic` | function | 5390–5394 | 5 |
| `seasonRoleKeysForPlayer` | function | 5395–5403 | 9 |
| `hasSeasonRole` | function | 5404–5406 | 3 |
| `selectEnforcerKeys` | function | 5407–5419 | 13 |
| `buildIdentityProfiles` | function | 5420–5651 | 232 |
| `composeIdentityText` | function | 5652–5658 | 7 |
| `countCaptainAppearances` | function | 5660–5672 | 13 |
| `countGoalieAppearances` | function | 5674–5676 | 3 |
| `computeRosterStatus` | function | 5678–5696 | 19 |
| `assignStatus` | function | 5698–5883 | 186 |
| `fetchJsonLegacy` | function | 5889–5908 | 20 |
| `responseExcerpt` | function | 5910–5912 | 3 |
| `diagnosticError` | function | 5913–5917 | 5 |
| `fetchTextWithDiagnostics` | function | 5918–5947 | 30 |
| `fetchJsonWithDiagnostics` | function | 5948–5956 | 9 |
| `fetchJson` | function | 5957–5960 | 4 |
| `formatStatus` | function | 5961–5963 | 3 |
| `formatDiagnosticAttempt` | function | 5964–5976 | 13 |
| `formatGameLoadError` | function | 5977–5982 | 6 |
| `fetchSeasonGameRaw` | function | 5983–6022 | 40 |
| `getStaticSeasonGames` | function | 6026–6029 | 4 |
| `loadSeasonManifest` | function | 6041–6057 | 17 |
| `resolveCurrentSeasonKey` | function | 6072–6091 | 20 |
| `applyCurrentSeasonCoverHighlight` | function | 6092–6096 | 5 |
| `isUsableExternalSeasonData` | function | 6109–6117 | 9 |
| `ensureExternalSeasonData` | function | 6118–6139 | 22 |
| `buildStaticSeasonDataBlock` | function | 6140–6149 | 10 |
| `getGameId` | function | 6176–6180 | 5 |
| `findDuplicateGameIds` | function | 6182–6192 | 11 |
| `validateGameStructure` | function | 6210–6249 | 40 |
| `validateSeasonGames` | function | 6251–6261 | 11 |
| `diffGameIds` | function | 6263–6272 | 10 |
| `validateSeasonKey` | function | 6274–6284 | 11 |
| `validateWrapperFormat` | function | 6286–6295 | 10 |
| `validateMergedSeason` | function | 6297–6314 | 18 |
| `buildDryRunReport` | function | 6316–6378 | 63 |
| `seasonDataPreviewRerender` | function | 6399–6401 | 3 |
| `seasonDataPreviewRow` | function | 6403–6414 | 12 |
| `buildSeasonDataPreviewChanges` | function | 6421–6438 | 18 |
| `stageSeasonDataPreview` | function | 6449–6500 | 52 |
| `stageSeasonDataPreviewFromFile` | function | 6501–6514 | 14 |
| `stageSeasonDataPreviewFromPaste` | function | 6515–6519 | 5 |
| `discardSeasonDataPreview` | function | 6520–6524 | 5 |
| `getSeasonDataPreview` | function | 6526–6528 | 3 |
| `isSeasonDataPreviewStale` | function | 6534–6538 | 5 |
| `rSeasonDataPreviewStatus` | function | 6540–6542 | 3 |
| `rSeasonDataPreviewRows` | function | 6543–6551 | 9 |
| `rSeasonDataPreviewCard` | function | 6553–6588 | 36 |
| `setSeasonDataPreviewOpen` | window | 6589–6589 | 1 |
| `setSeasonDataPreviewPasteText` | window | 6590–6590 | 1 |
| `fileNameForLineupSeasonKey` | function | 6610–6612 | 3 |
| `ensureLineupDataLoaded` | function | 6628–6644 | 17 |
| `ensureLineupGroupsRegistryLoaded` | function | 6653–6669 | 17 |
| `resolveLineupPlayerName` | function | 6681–6684 | 4 |
| `findLineupGameContext` | function | 6687–6694 | 8 |
| `rEinsatzCenterGroup` | function | 6696–6707 | 12 |
| `rEinsatzCenterCombo` | function | 6709–6716 | 8 |
| `rEinsatzCenterGameCard` | function | 6718–6735 | 18 |
| `rEinsatzCenterPage` | function | 6737–6756 | 20 |
| `setEinsatzCenterSeason` | window | 6758–6763 | 6 |
| `openEinsatzCenter` | window | 6764–6771 | 8 |
| `computeEinsatzCenterStats` | function | 6782–6812 | 31 |
| `lineupGroupDisplayName` | function | 6813–6818 | 6 |
| `rEinsatzCenterStats` | function | 6819–6837 | 19 |
| `getEffectiveLineupData` | function | 6895–6902 | 8 |
| `isEinsatzCenterGameFromDraft` | function | 6904–6907 | 4 |
| `einsatzCenterDraftInView` | function | 6909–6912 | 4 |
| `rEinsatzCenterDraftMark` | function | 6913–6916 | 4 |
| `rEinsatzCenterDraftStatsHint` | function | 6917–6921 | 5 |
| `einsatzCenterDraftStaleHint` | function | 6923–6925 | 3 |
| `rEinsatzCenterDraftBanner` | function | 6927–6934 | 8 |
| `ensureEinsatzCenterDraft` | function | 6945–6958 | 14 |
| `getEinsatzCenterGameDraft` | function | 6967–6978 | 12 |
| `einsatzCenterAutosaveKey` | function | 7005–7005 | 1 |
| `einsatzCenterStorageRead` | function | 7006–7008 | 3 |
| `einsatzCenterStorageWrite` | function | 7009–7011 | 3 |
| `einsatzCenterStorageRemove` | function | 7012–7014 | 3 |
| `einsatzCenterDraftIsEmpty` | function | 7017–7019 | 3 |
| `einsatzCenterSerializeDraft` | function | 7021–7033 | 13 |
| `einsatzCenterIsPlainObject` | function | 7034–7034 | 1 |
| `einsatzCenterDeserializeAutosave` | function | 7040–7073 | 34 |
| `einsatzCenterCurrentRawBaseHash` | function | 7080–7085 | 6 |
| `einsatzCenterAutosaveDraft` | function | 7094–7121 | 28 |
| `einsatzCenterInspectAutosave` | function | 7129–7157 | 29 |
| `restoreEinsatzCenterAutosave` | function | 7160–7176 | 17 |
| `discardEinsatzCenterAutosave` | function | 7178–7183 | 6 |
| `rEinsatzCenterAutosaveBanner` | function | 7186–7198 | 13 |
| `einsatzCenterAutosaveInfoText` | function | 7200–7210 | 11 |
| `loadEinsatzCenterMismatchedAutosave` | function | 7224–7242 | 19 |
| `deriveLineupValidPlayerIds` | function | 7255–7271 | 17 |
| `deriveLineupUlmPlayerIds` | function | 7279–7295 | 17 |
| `getSeasonmanagerRosterSuggestion` | function | 7309–7329 | 21 |
| `einsatzCenterCanonicalJson` | function | 7338–7347 | 10 |
| `einsatzCenterSha256Hex` | function | 7348–7352 | 5 |
| `einsatzCenterComputeBaseHash` | function | 7353–7355 | 3 |
| `einsatzCenterSoftIssues` | function | 7362–7380 | 19 |
| `rEinsatzCenterGroupEditor` | function | 7383–7413 | 31 |
| `rEinsatzCenterComboEditor` | function | 7414–7420 | 7 |
| `rEinsatzCenterRosterSuggestionCard` | function | 7430–7460 | 31 |
| `rEinsatzCenterGameEditor` | function | 7461–7513 | 53 |
| `rEinsatzCenterEditPage` | function | 7514–7561 | 48 |
| `startEinsatzCenterDraftMode` | window | 7564–7568 | 5 |
| `cancelEinsatzCenterEdit` | window | 7569–7579 | 11 |
| `viewEinsatzCenterMergedView` | window | 7581–7581 | 1 |
| `returnToEinsatzCenterEdit` | window | 7582–7582 | 1 |
| `setEinsatzCenterIncludeDraft` | window | 7583–7583 | 1 |
| `selectEinsatzCenterEditGame` | window | 7584–7587 | 4 |
| `addEinsatzCenterRosterPlayer` | window | 7588–7595 | 8 |
| `removeEinsatzCenterRosterPlayer` | window | 7596–7603 | 8 |
| `toggleEinsatzCenterRosterSuggestionPlayer` | window | 7604–7610 | 7 |
| `dismissEinsatzCenterRosterSuggestion` | window | 7611–7614 | 4 |
| `acceptEinsatzCenterRosterSuggestion` | window | 7622–7638 | 17 |
| `addEinsatzCenterExistingGroup` | window | 7639–7647 | 9 |
| `addEinsatzCenterNewGroup` | window | 7648–7664 | 17 |
| `removeEinsatzCenterGroup` | window | 7665–7672 | 8 |
| `toggleEinsatzCenterGroupRename` | window | 7673–7675 | 3 |
| `renameEinsatzCenterGroup` | window | 7687–7706 | 20 |
| `addEinsatzCenterGroupPlayer` | window | 7707–7714 | 8 |
| `removeEinsatzCenterGroupPlayer` | window | 7715–7722 | 8 |
| `setEinsatzCenterGroupPlayerPosition` | window | 7723–7731 | 9 |
| `toggleEinsatzCenterComboPlayer` | window | 7732–7739 | 8 |
| `confirmEinsatzCenterCombo` | window | 7740–7750 | 11 |
| `removeEinsatzCenterCombo` | window | 7751–7757 | 7 |
| `setEinsatzCenterGameNote` | window | 7758–7764 | 7 |
| `buildEinsatzCenterDraftExport` | function | 7768–7781 | 14 |
| `exportEinsatzCenterDraft` | window | 7782–7794 | 13 |
| `loadSeasonData` | function | 7809–8278 | 470 |
| `showMainShell` | function | 8281–8285 | 5 |
| `hasSeasonSource` | function | 8286–8289 | 4 |
| `hasEmbeddedSeasonData` | function | 8290–8292 | 3 |
| `getGlobalLoadableSeasonKeys` | function | 8293–8299 | 7 |
| `getAllTimeCoverStats` | function | 8300–8307 | 8 |
| `updateCoverAllTimeStats` | function | 8308–8316 | 9 |
| `loadSeasonForGlobal` | function | 8318–8348 | 31 |
| `ensureGlobalDataLoaded` | function | 8349–8364 | 16 |
| `loadSeason` | function | 8366–8417 | 52 |
| `startApp` | window | 8419–8430 | 12 |
| `ensureAppLoaded` | function | 8421–8430 | 10 |
| `openSeason` | window | 8431–8433 | 3 |
| `openAllTimePlayers` | window | 8434–8439 | 6 |
| `hofIntroDelay` | function | 8442–8444 | 3 |
| `ensureHallOfFameIntroOverlay` | function | 8445–8477 | 33 |
| `buildHallOfFameIntroTitle` | function | 8478–8488 | 11 |
| `seedHallOfFameIntroParticles` | function | 8489–8506 | 18 |
| `cleanupHallOfFameIntro` | function | 8507–8521 | 15 |
| `restoreHallOfFameIntroPrevious` | function | 8522–8533 | 12 |
| `finishHallOfFameIntro` | function | 8534–8541 | 8 |
| `startHallOfFameIntro` | function | 8542–8566 | 25 |
| `cancelHallOfFameIntro` | function | 8567–8578 | 12 |
| `openHallOfFame` | window | 8580–8603 | 24 |
| `openComparisonCenter` | window | 8604–8632 | 29 |
| `openMatchcenter` | window | 8633–8654 | 22 |
| `openLineupBuilder` | window | 8655–8672 | 18 |
| `setMatchcenterOpponent` | window | 8673–8673 | 1 |
| `setMatchcenterContext` | window | 8674–8674 | 1 |
| `setMatchcenterSeason` | window | 8675–8675 | 1 |
| `toggleMatchcenterGames` | window | 8676–8676 | 1 |
| `openLexicon` | window | 8677–8680 | 4 |
| `rRes` | const-arrow | 8685–8685 | 1 |
| `rClutchBadge` | function | 8686–8693 | 8 |
| `escAttr` | function | 8694–8696 | 3 |
| `roleTraitLabel` | function | 8697–8699 | 3 |
| `isVisibleSecondaryTrait` | function | 8700–8703 | 4 |
| `rRoleTraitTip` | function | 8704–8708 | 5 |
| `rStyleMetricTip` | function | 8709–8712 | 4 |
| `rRosterStatusBadge` | function | 8713–8720 | 8 |
| `classicTagLabel` | function | 8721–8723 | 3 |
| `rClassicTagTip` | function | 8724–8728 | 5 |
| `fallbackIdentityProfile` | function | 8729–8739 | 11 |
| `rIdentityTags` | function | 8740–8748 | 9 |
| `rStyleProfileBars` | function | 8749–8759 | 11 |
| `rIdentityCards` | function | 8760–8785 | 26 |
| `rClassicRoleTags` | function | 8786–8793 | 8 |
| `renderTags` | function | 8794–8796 | 3 |
| `getSeasonPlayerFieldBasis` | function | 8798–8824 | 27 |
| `getSeasonScopedIdentityProfile` | function | 8825–8836 | 12 |
| `rSeasonProfileKpis` | function | 8837–8856 | 20 |
| `rSeasonProfileTagStrip` | function | 8858–8862 | 5 |
| `rMatrix` | function | 8865–8909 | 45 |
| `rSeasonDuoSummary` | function | 8912–8920 | 9 |
| `rPhases` | function | 8922–8939 | 18 |
| `rRadar` | function | 8942–8989 | 48 |
| `rClutch` | function | 8992–9024 | 33 |
| `rTimeline` | function | 9027–9135 | 109 |
| `rPenalties` | function | 9138–9154 | 17 |
| `rOppBreakdown` | function | 9157–9189 | 33 |
| `generatePlayerInsights` | function | 9192–9235 | 44 |
| `rSeasonInsightsTab` | function | 9238–9251 | 14 |
| `rInsights` | function | 9253–9304 | 52 |
| `rTable` | function | 9307–9327 | 21 |
| `findLoadedSeasonPlayer` | function | 9330–9338 | 9 |
| `getAllTimePlayerRows` | function | 9339–9354 | 16 |
| `isSgOnlyAlltimePlayer` | function | 9355–9362 | 8 |
| `isPureSGPlayer` | function | 9363–9366 | 4 |
| `filterPureSGPlayers` | function | 9367–9370 | 4 |
| `getAllTimeMainPlayerRows` | function | 9371–9373 | 3 |
| `getAllTimeSgOnlyRows` | function | 9374–9376 | 3 |
| `getPlayerSeasonStats` | function | 9377–9381 | 5 |
| `getPlayerAlltimeStats` | function | 9382–9389 | 8 |
| `getPlayerRegistryProfile` | function | 9390–9397 | 8 |
| `getPlayerGoalieSeasonStats` | function | 9398–9402 | 5 |
| `getPlayerGoalieAlltimeStats` | function | 9403–9426 | 24 |
| `sumRoleGames` | function | 9427–9432 | 6 |
| `getPlayerRoleAvailability` | function | 9433–9446 | 14 |
| `resolvePlayerRoleView` | function | 9447–9454 | 8 |
| `rPlayerRoleSwitch` | function | 9455–9461 | 7 |
| `goalieNum` | function | 9462–9467 | 6 |
| `goalieTime` | function | 9468–9475 | 8 |
| `goalieBucketRows` | function | 9476–9481 | 6 |
| `goalieTopRow` | function | 9482–9484 | 3 |
| `goalieTierMeta` | function | 9485–9493 | 9 |
| `goalieStdDev` | function | 9494–9499 | 6 |
| `goalieDetailFirstTime` | function | 9500–9506 | 7 |
| `goalieEventSecondInPeriod` | function | 9507–9512 | 6 |
| `goaliePctText` | function | 9513–9516 | 4 |
| `goalieSafeNum` | function | 9517–9520 | 4 |
| `goalieClampScore` | function | 9521–9524 | 4 |
| `goalieInverseScore` | function | 9525–9532 | 8 |
| `goaliePositiveScore` | function | 9533–9540 | 8 |
| `goaliePositiveCurveScore` | function | 9541–9549 | 9 |
| `goalieWeightedScore` | function | 9550–9555 | 6 |
| `goalieApplySampleConfidence` | function | 9556–9563 | 8 |
| `goalieBucketLooseSum` | function | 9564–9570 | 7 |
| `buildGoalieAnalysisModel` | function | 9571–9729 | 159 |
| `rGoalieBars` | function | 9730–9739 | 10 |
| `goalieDnaKey` | function | 9781–9785 | 5 |
| `goalieDnaValue` | function | 9786–9792 | 7 |
| `goalieStateGoals` | function | 9793–9793 | 1 |
| `buildGoalieRoleProfile` | function | 9794–9867 | 74 |
| `rGoalieRoleTraits` | function | 9868–9871 | 4 |
| `getGoalieDnaRows` | function | 9872–9875 | 4 |
| `rGoalieDnaBars` | function | 9876–9889 | 14 |
| `rGoalieKpis` | function | 9890–9906 | 17 |
| `rGoalieMiniMetrics` | function | 9907–9912 | 6 |
| `rGoalieFirstGoalResistance` | function | 9913–9926 | 14 |
| `rGoalieMomentum` | function | 9927–9940 | 14 |
| `rGoalieTierCards` | function | 9941–9968 | 28 |
| `rGoaliePhaseProfile` | function | 9969–9985 | 17 |
| `rGoalieInsights` | function | 9986–10007 | 22 |
| `rGoalieOverview` | function | 10008–10024 | 17 |
| `rGoaliePhases` | function | 10025–10027 | 3 |
| `rGoalieOpponents` | function | 10028–10039 | 12 |
| `rGoalieStability` | function | 10040–10064 | 25 |
| `rGoalieTable` | function | 10065–10072 | 8 |
| `rGoalieAnalysis` | function | 10073–10098 | 26 |
| `getPreviousSeasonKey` | function | 10100–10104 | 5 |
| `playerAppearedInSeasonByName` | function | 10105–10115 | 11 |
| `playerAppearedForUlmStatusInSeasonByName` | function | 10116–10134 | 19 |
| `isRookieCandidateForSeason` | function | 10135–10144 | 10 |
| `getLoadedSeasonPointsByName` | function | 10145–10149 | 5 |
| `seasonHasPureUlmTeam` | function | 10150–10156 | 7 |
| `isSgOnlyHallOfFameExcluded` | function | 10157–10165 | 9 |
| `isHallOfFameEligiblePlayer` | function | 10166–10171 | 6 |
| `getHallOfFamePlayerRows` | function | 10172–10174 | 3 |
| `getHallOfFamePlayerIdSet` | function | 10175–10177 | 3 |
| `getGlobalProfileEvents` | function | 10179–10190 | 12 |
| `countBy` | function | 10192–10200 | 9 |
| `getLoadedSeasonPlayerUi` | function | 10201–10205 | 5 |
| `getGlobalPlayerTeamRecord` | function | 10206–10231 | 26 |
| `getGlobalPlayerPeakGame` | function | 10232–10242 | 11 |
| `getGlobalPlayerBestSeason` | function | 10243–10249 | 7 |
| `getAllTimeDuoRowsForPlayer` | function | 10250–10260 | 11 |
| `getCarryPerformanceRows` | function | 10261–10276 | 16 |
| `rCarryPerformanceRows` | function | 10277–10289 | 13 |
| `getAllTimeGamesPlayedRows` | function | 10290–10314 | 25 |
| `getAllTimePenaltyRows` | function | 10315–10330 | 16 |
| `getSeasonUiPlayerForProfile` | function | 10331–10334 | 4 |
| `getSeasonIdentityProfile` | function | 10335–10339 | 5 |
| `seasonStatNumber` | function | 10340–10343 | 4 |
| `seasonStatSetSize` | function | 10344–10349 | 6 |
| `isActiveAlltimeSeasonStats` | function | 10350–10363 | 14 |
| `getActiveAlltimeSeasonKeys` | function | 10364–10374 | 11 |
| `getAlltimeRecencyWeight` | function | 10375–10380 | 6 |
| `getRosterStatus` | function | 10381–10387 | 7 |
| `getGlobalTopScorerMilestones` | function | 10388–10400 | 13 |
| `getGlobalRookieSeasonKey` | function | 10401–10414 | 14 |
| `getGlobalRookieMilestone` | function | 10415–10425 | 11 |
| `getGlobalPlayerMilestones` | function | 10426–10443 | 18 |
| `buildOpponentIntelligence` | function | 10445–10498 | 54 |
| `rOpponentIntelBars` | function | 10500–10510 | 11 |
| `getAllTimeDuoRows` | function | 10512–10534 | 23 |
| `rDuoRows` | function | 10536–10555 | 20 |
| `getAllLoadedSeasonGames` | function | 10557–10576 | 20 |
| `getRosterEntryRegistryProfile` | function | 10578–10581 | 4 |
| `difficultConnectionConfidence` | function | 10582–10586 | 5 |
| `getDuoRowsForPlayerScope` | function | 10587–10605 | 19 |
| `buildDirectDuoLookupForPlayer` | function | 10606–10623 | 18 |
| `duoScopeSeasonKeys` | function | 10624–10627 | 4 |
| `getDuoScorerCountsWithCandidate` | function | 10628–10647 | 20 |
| `buildBestThirdManOptions` | function | 10648–10681 | 34 |
| `getDuoDirectScorerGameCounts` | function | 10682–10713 | 32 |
| `responseMomentumAbsSeconds` | function | 10715–10720 | 6 |
| `responseMomentumTime` | function | 10721–10727 | 7 |
| `responseMomentumGameRows` | function | 10728–10734 | 7 |
| `responseMomentumSide` | function | 10735–10743 | 9 |
| `responseMomentumActor` | function | 10744–10754 | 11 |
| `responseMomentumGoalActors` | function | 10755–10762 | 8 |
| `buildAnnotatedGoalEventsForGame` | function | 10763–10863 | 101 |
| `responseMomentumConfidence` | function | 10864–10868 | 5 |
| `responseMomentumEmptyState` | function | 10869–10876 | 8 |
| `responseMomentumPairKey` | function | 10877–10879 | 3 |
| `ensureRmPlayer` | function | 10880–10885 | 6 |
| `ensureRmDuo` | function | 10886–10891 | 6 |
| `finalizeResponseStats` | function | 10892–10905 | 14 |
| `buildResponseGoalStatsRaw` | function | 10906–10954 | 49 |
| `buildResponseGoalStats` | function | 10955–10960 | 6 |
| `finalizeMomentumStats` | function | 10961–10966 | 6 |
| `buildMomentumSwingStatsRaw` | function | 10967–11037 | 71 |
| `buildMomentumSwingStats` | function | 11038–11043 | 6 |
| `buildDuoFloorCeiling` | function | 11044–11085 | 42 |
| `buildDuoWarnings` | function | 11086–11104 | 19 |
| `duoProPairKey` | function | 11105–11107 | 3 |
| `duoProContextSeasonKey` | function | 11108–11110 | 3 |
| `getDuoFieldPlayerRows` | function | 11111–11121 | 11 |
| `duoProPlayer` | function | 11122–11126 | 5 |
| `getDuoSharedFieldRows` | function | 11127–11132 | 6 |
| `buildDuoDirectProduction` | function | 11133–11153 | 21 |
| `emptyDuoTeamImpactStats` | function | 11154–11156 | 3 |
| `addDuoTeamGame` | function | 11157–11172 | 16 |
| `finalizeDuoTeamImpactStats` | function | 11173–11180 | 8 |
| `buildDuoWithWithoutImpact` | function | 11181–11214 | 34 |
| `buildDuoOpponentAdjusted` | function | 11215–11227 | 13 |
| `buildDuoNetworkContext` | function | 11228–11251 | 24 |
| `buildDuoGapAnalysis` | function | 11252–11268 | 17 |
| `buildDuoCompatibility` | function | 11280–11302 | 23 |
| `buildDuoUntestedPotential` | function | 11303–11314 | 12 |
| `buildDuoUsageRate` | function | 11315–11326 | 12 |
| `buildDuoReplacementOptions` | function | 11327–11338 | 12 |
| `buildDuoProAnalysis` | function | 11339–11382 | 44 |
| `rDuoCenterPro` | function | 11383–11502 | 120 |
| `duoProDomId` | function | 11503–11505 | 3 |
| `duoProPickerOpen` | function | 11506–11508 | 3 |
| `duoProPickerMessage` | function | 11509–11511 | 3 |
| `setDuoProPickerState` | function | 11512–11521 | 10 |
| `duoProResolveCandidate` | function | 11522–11530 | 9 |
| `duoProSelectionPayload` | function | 11531–11540 | 10 |
| `openDuoProPicker` | window | 11541–11541 | 1 |
| `cancelDuoProPicker` | window | 11542–11542 | 1 |
| `selectDuoProQuick` | window | 11543–11546 | 4 |
| `confirmDuoProSelection` | window | 11547–11561 | 15 |
| `setDuoProSelection` | window | 11562–11569 | 8 |
| `rDuoProPlayerSelect` | function | 11570–11576 | 7 |
| `rInteractiveDuoCenterPro` | function | 11577–11632 | 56 |
| `rSeasonDuoCenterPro` | function | 11633–11635 | 3 |
| `getDifficultConnectionRowsForPlayer` | function | 11636–11680 | 45 |
| `emptyRosterImpactStats` | function | 11681–11683 | 3 |
| `finalizeRosterImpactStats` | function | 11684–11691 | 8 |
| `addRosterImpactGameToStats` | function | 11692–11701 | 10 |
| `getRosterImpactPlayerEventLookup` | function | 11702–11722 | 21 |
| `buildRosterImpactGameIndex` | function | 11735–11760 | 26 |
| `getRosterImpactPlayerGames` | function | 11773–11814 | 42 |
| `rosterImpactConfidence` | function | 11815–11820 | 6 |
| `confidenceFromSampleSize` | function | 11825–11828 | 4 |
| `rosterImpactConfidenceWeight` | function | 11829–11832 | 4 |
| `antiSynergyImpactScore` | function | 11833–11847 | 15 |
| `buildRosterImpactAnalysis` | function | 11848–11916 | 69 |
| `buildDuoAntiSynergy` | function | 11917–11919 | 3 |
| `rAntiSynergyDelta` | function | 11920–11926 | 7 |
| `antiSynergyDeltaClass` | function | 11927–11930 | 4 |
| `antiSynergySigned` | function | 11931–11935 | 5 |
| `rAntiSynergyCompareChip` | function | 11936–11943 | 8 |
| `rAntiSynergyMetricRow` | function | 11944–11952 | 9 |
| `rAntiSynergyWinrateText` | function | 11960–11965 | 6 |
| `rAntiSynergyWinrateRow` | function | 11966–11974 | 9 |
| `rRosterImpactStatLine` | function | 11975–11978 | 4 |
| `antiSynergyPartnerIsSgOnly` | function | 11979–11982 | 4 |
| `rAntiSynergyMainDelta` | function | 11983–11992 | 10 |
| `rDifficultConnectionList` | function | 11993–12017 | 25 |
| `rDifficultConnectionListCompactLegacy` | function | 12018–12059 | 42 |
| `rDifficultConnectionListCompact` | function | 12060–12098 | 39 |
| `rDifficultConnectionsCard` | function | 12099–12135 | 37 |
| `responseMomentumTooltipFor` | function | 12180–12186 | 7 |
| `rmTerm` | function | 12187–12190 | 4 |
| `rResponseRateDisplay` | function | 12196–12202 | 7 |
| `rRmKpi` | function | 12203–12214 | 12 |
| `rAvgResponseTimeNote` | function | 12217–12220 | 4 |
| `rRmTopList` | function | 12221–12231 | 11 |
| `rResponseMomentumOverviewCard` | function | 12232–12255 | 24 |
| `rPlayerResponseMomentumCard` | function | 12256–12274 | 19 |
| `rDuoResponseMomentumCard` | function | 12275–12294 | 20 |
| `rTeamResponseMomentumCard` | function | 12295–12301 | 7 |
| `rMatchcenterResponseMomentum` | function | 12302–12339 | 38 |
| `getTeamAllTimeRecords` | function | 12341–12381 | 41 |
| `getAllTimeOpponentIntelligence` | function | 12383–12389 | 7 |
| `getAllTimeOpponentTopScorers` | function | 12391–12415 | 25 |
| `getHallOfFameStats` | function | 12417–12439 | 23 |
| `rOpponentTopScorerTable` | function | 12441–12460 | 20 |
| `getAllTimeIdentityStandings` | function | 12462–12496 | 35 |
| `buildRecencyWeightedGlobalIdentityProfile` | function | 12498–12545 | 48 |
| `getGlobalIdentityProfile` | function | 12547–12573 | 27 |
| `dedupeIdentityProfileTags` | function | 12575–12586 | 12 |
| `rGlobalProfileTags` | function | 12588–12592 | 5 |
| `escHtml` | function | 12594–12596 | 3 |
| `pctValue` | function | 12597–12600 | 4 |
| `rHallOfFameHero` | function | 12601–12626 | 26 |
| `rHallPodiumList` | function | 12627–12649 | 23 |
| `rHallDuoTemple` | function | 12650–12657 | 8 |
| `hallGoalieNum` | function | 12659–12664 | 6 |
| `hallGoalieTime` | function | 12665–12672 | 8 |
| `hallGoalieSeasonLabel` | function | 12673–12673 | 1 |
| `isHallRowPureSG` | function | 12674–12681 | 8 |
| `rHallSGBadge` | function | 12682–12684 | 3 |
| `hallGoaliePkStats` | function | 12685–12696 | 12 |
| `hallGoalieTopteamStats` | function | 12697–12703 | 7 |
| `hallGoalieSeasonScore` | function | 12704–12723 | 20 |
| `hallGoalieRowFromStats` | function | 12724–12756 | 33 |
| `getHallGoalieData` | function | 12757–12772 | 16 |
| `hallGoalieNameHtml` | function | 12773–12775 | 3 |
| `hallGoalieTooltip` | function | 12790–12793 | 4 |
| `hallGoalieExplainForLabel` | function | 12794–12808 | 15 |
| `rHallGoalieRankCard` | function | 12809–12840 | 32 |
| `rHallGoalieAwardCards` | function | 12841–12857 | 17 |
| `rHallGoalieLegends` | function | 12858–12890 | 33 |
| `getGlobalSeasonStatRows` | function | 12891–12906 | 16 |
| `getAlltimeRank` | function | 12907–12912 | 6 |
| `rAlltimeKpis` | function | 12913–12926 | 14 |
| `rSparkline` | function | 12927–12939 | 13 |
| `comparisonItemKey` | function | 12951–12956 | 6 |
| `normalizeComparisonItem` | function | 12957–12961 | 5 |
| `comparisonJsArg` | function | 12962–12964 | 3 |
| `comparisonNum` | function | 12965–12968 | 4 |
| `comparisonPct` | function | 12969–12972 | 4 |
| `comparisonFmt` | function | 12973–12976 | 4 |
| `comparisonPctFmt` | function | 12977–12979 | 3 |
| `getComparisonPlayerRow` | function | 12980–12982 | 3 |
| `getComparisonSeasonLabel` | function | 12983–12985 | 3 |
| `getComparisonTeamGoalsForSeason` | function | 12986–12997 | 12 |
| `getComparisonAlltimeTeamGoals` | function | 12998–13000 | 3 |
| `getComparisonSeasonEvents` | function | 13001–13005 | 5 |
| `getComparisonChemistryFromEvents` | function | 13006–13010 | 5 |
| `getComparisonClutchFromEvents` | function | 13011–13015 | 5 |
| `getComparisonStyleProfile` | function | 13016–13040 | 25 |
| `getComparisonProfile` | function | 13041–13045 | 5 |
| `getComparisonSeasonTrend` | function | 13046–13071 | 26 |
| `getComparisonAlltimeTrend` | function | 13072–13077 | 6 |
| `getComparisonPlayerOptions` | function | 13079–13093 | 15 |
| `comparisonVariantValue` | function | 13094–13096 | 3 |
| `getComparisonVariantsForPlayer` | function | 13097–13121 | 25 |
| `parseComparisonVariant` | function | 13122–13136 | 15 |
| `getComparisonCurrentSelection` | function | 13137–13147 | 11 |
| `filterComparisonPlayers` | window | 13148–13155 | 8 |
| `selectComparisonPlayer` | window | 13156–13161 | 6 |
| `setComparisonRoleMode` | window | 13162–13166 | 5 |
| `setComparisonVariant` | window | 13167–13170 | 4 |
| `toggleComparisonSgOnly` | window | 13171–13171 | 1 |
| `addComparisonItem` | window | 13172–13179 | 8 |
| `addSelectedComparisonItem` | window | 13180–13185 | 6 |
| `toggleComparisonPicker` | window | 13186–13186 | 1 |
| `removeComparisonItem` | window | 13187–13190 | 4 |
| `clearComparison` | window | 13191–13191 | 1 |
| `runComparison` | window | 13192–13198 | 7 |
| `selectComparisonMode` | window | 13199–13199 | 1 |
| `backToComparisonModeSelect` | window | 13200–13200 | 1 |
| `normalizeDuoComparisonItem` | function | 13201–13204 | 4 |
| `comparisonDuoContext` | function | 13205–13208 | 4 |
| `setComparisonDuoMode` | window | 13209–13209 | 1 |
| `setComparisonDuoSeasonKey` | window | 13210–13210 | 1 |
| `setComparisonDuoSearch` | window | 13211–13211 | 1 |
| `filterPlayerSuggestions` | function | 13212–13223 | 12 |
| `rComparisonDuoSuggestionButtons` | function | 13224–13227 | 4 |
| `renderComparisonDuoSuggestions` | function | 13228–13236 | 9 |
| `filterComparisonDuoSuggestions` | window | 13237–13244 | 8 |
| `selectComparisonDuoSuggestion` | window | 13238–13244 | 7 |
| `handleComparisonDuoSearchKey` | window | 13245–13257 | 13 |
| `setComparisonDuoPlayer` | window | 13258–13263 | 6 |
| `addComparisonDuoFromSelection` | window | 13264–13271 | 8 |
| `addComparisonDuo` | window | 13272–13274 | 3 |
| `removeComparisonDuo` | window | 13275–13278 | 4 |
| `clearComparisonDuos` | window | 13279–13279 | 1 |
| `runDuoComparison` | window | 13280–13284 | 5 |
| `buildDuoComparison` | function | 13285–13304 | 20 |
| `rDuoComparisonBars` | function | 13305–13309 | 5 |
| `rDuoCompareSummaryCards` | function | 13310–13340 | 31 |
| `rDuoComparisonProfile` | function | 13341–13362 | 22 |
| `rDuoComparisonChemistry` | function | 13363–13378 | 16 |
| `rDuoComparisonImpact` | function | 13379–13394 | 16 |
| `rDuoComparisonContext` | function | 13395–13412 | 18 |
| `rDuoComparisonDetails` | function | 13413–13416 | 4 |
| `rDuoComparisonDashboard` | function | 13417–13430 | 14 |
| `rComparisonDuoSearchBox` | function | 13431–13440 | 10 |
| `rDuoComparisonPage` | function | 13441–13451 | 11 |
| `rComparisonModeSelect` | function | 13452–13454 | 3 |
| `getComparisonEventsForItem` | function | 13455–13457 | 3 |
| `getComparisonRosterGamesForSeason` | function | 13458–13474 | 17 |
| `getComparisonRosterGames` | function | 13475–13482 | 8 |
| `comparisonEventGameKey` | function | 13483–13485 | 3 |
| `comparisonEventPhaseLabel` | function | 13486–13489 | 4 |
| `comparisonOpponentStrengthTier` | function | 13490–13495 | 6 |
| `buildComparisonExtraMetrics` | function | 13496–13553 | 58 |
| `getGoalieComparisonAlltimeTrend` | function | 13554–13570 | 17 |
| `getGoalieComparisonSeasonTrend` | function | 13571–13589 | 19 |
| `buildGoalieComparisonDataset` | function | 13590–13640 | 51 |
| `buildComparisonDataset` | function | 13641–13676 | 36 |
| `kpiValueText` | function | 13678–13681 | 4 |
| `kpiDelta` | function | 13682–13687 | 6 |
| `kpiItemColor` | function | 13688–13690 | 3 |
| `rKpiCards` | function | 13691–13701 | 11 |
| `rKpiMirrorRows` | function | 13716–13775 | 60 |
| `kpiRadarValue` | function | 13776–13786 | 11 |
| `rKpiRadar` | function | 13787–13821 | 35 |
| `rKpiShareBars` | function | 13822–13829 | 8 |
| `rKpiMetricCard` | function | 13830–13834 | 5 |
| `rKpiTextMetricCard` | function | 13835–13837 | 3 |
| `rKpiExtendedMetrics` | function | 13838–13852 | 15 |
| `kpiNiceMax` | function | 13853–13858 | 6 |
| `kpiTrendRows` | function | 13859–13867 | 9 |
| `rKpiTrendCompare` | function | 13868–13934 | 67 |
| `rKpiOpponentStrength` | function | 13935–13962 | 28 |
| `kpiBadge` | function | 13963–13965 | 3 |
| `rKpiObjectMini` | function | 13966–13972 | 7 |
| `rKpiInfoCards` | function | 13973–14004 | 32 |
| `buildComparisonSummary` | function | 14005–14036 | 32 |
| `rKPIVergleich` | function | 14037–14050 | 14 |
| `rComparisonMiniOverview` | function | 14051–14054 | 4 |
| `rComparisonRoles` | function | 14055–14062 | 8 |
| `rComparisonDashboard` | function | 14063–14073 | 11 |
| `rComparisonStyles` | function | 14074–14111 | 38 |
| `rComparisonCenterPage` | function | 14112–14162 | 51 |
| `rSeasonTrendRows` | function | 14163–14181 | 19 |
| `getAlltimeAggregatedStyleProfile` | function | 14182–14201 | 20 |
| `rGlobalDnaBars` | function | 14203–14232 | 30 |
| `pdashNum` | function | 14233–14236 | 4 |
| `pdashPct` | function | 14237–14240 | 4 |
| `pdashPhaseLabel` | function | 14241–14244 | 4 |
| `pdashTopCount` | function | 14245–14248 | 4 |
| `pdashBestPhase` | function | 14249–14252 | 4 |
| `pdashTopPartner` | function | 14253–14256 | 4 |
| `pdashTopOpponent` | function | 14257–14260 | 4 |
| `pdashOpponentTier` | function | 14261–14266 | 6 |
| `pdashOpponentStrength` | function | 14267–14286 | 20 |
| `pdashInsight` | function | 14287–14289 | 3 |
| `pdashInsights` | function | 14290–14301 | 12 |
| `buildSeasonPlayerDashModel` | function | 14302–14338 | 37 |
| `buildAlltimePlayerDashModel` | function | 14339–14381 | 43 |
| `rPlayerDashStyles` | function | 14382–14393 | 12 |
| `rPdashLabel` | function | 14394–14396 | 3 |
| `rPdashStat` | function | 14397–14399 | 3 |
| `rPlayerDash` | function | 14400–14438 | 39 |
| `rSeasonPlayerDashboard` | function | 14439–14441 | 3 |
| `rAlltimePlayerDashboard` | function | 14442–14444 | 3 |
| `rGlobalPartnerOpponentPanel` | function | 14445–14458 | 14 |
| `rGlobalCareerHeader` | function | 14459–14479 | 21 |
| `rSeasonLandingPage` | function | 14481–14495 | 15 |
| `rGlobalOverview` | function | 14497–14548 | 52 |
| `rGlobalAllTimeStats` | function | 14550–14566 | 17 |
| `rGlobalDevelopment` | function | 14568–14606 | 39 |
| `getGlobalPlayerOpponentGameRows` | function | 14609–14636 | 28 |
| `getGlobalOpponentSpecialistProfile` | function | 14638–14666 | 29 |
| `rGlobalDuoNetwork` | function | 14668–14865 | 198 |
| `rGlobalOpponentSpecialist` | function | 14867–14912 | 46 |
| `playerExplainConfidence` | function | 14914–14919 | 6 |
| `playerExplainConfidenceLabel` | function | 14920–14922 | 3 |
| `playerExplainAdd` | function | 14923–14927 | 5 |
| `playerExplainStyleSignature` | function | 14928–14939 | 12 |
| `playerExplainRolePhrase` | function | 14940–14948 | 9 |
| `playerExplainHeadline` | function | 14949–14958 | 10 |
| `playerExplainContextSentence` | function | 14959–14977 | 19 |
| `buildFieldPlayerExplanation` | function | 14978–15052 | 75 |
| `buildGoaliePlayerExplanation` | function | 15053–15106 | 54 |
| `buildPlayerExplanation` | function | 15107–15115 | 9 |
| `buildPlayerIntelligence` | function | 15116–15145 | 30 |
| `rPlayerExplainItems` | function | 15146–15150 | 5 |
| `rPlayerExplanation` | function | 15151–15202 | 52 |
| `rAllTimePlayersPage` | function | 15204–15244 | 41 |
| `rHallOfFamePage` | function | 15246–15334 | 89 |
| `lexiconUniqueKeys` | function | 15339–15346 | 8 |
| `lexiconEntry` | function | 15347–15356 | 10 |
| `rLexiconRows` | function | 15357–15360 | 4 |
| `rLexiconPage` | function | 15361–15533 | 173 |
| `clampScore` | function | 15537–15540 | 4 |
| `getScoreLabel` | function | 15541–15549 | 9 |
| `buildConfidence` | function | 15550–15595 | 46 |
| `confidenceCautiousText` | function | 15596–15599 | 4 |
| `explainScore` | function | 15600–15614 | 15 |
| `p1NarrativeKey` | function | 15615–15617 | 3 |
| `scoreNarrative` | function | 15618–15636 | 19 |
| `rankNarratives` | function | 15637–15650 | 14 |
| `getEmptyState` | function | 15651–15662 | 12 |
| `rEmptyState` | function | 15663–15666 | 4 |
| `capSuperlativeLabel` | function | 15674–15676 | 3 |
| `rScoreBreakdown` | function | 15677–15693 | 17 |
| `matchcenterSigned` | function | 15695–15699 | 5 |
| `matchcenterDateLabel` | function | 15701–15705 | 5 |
| `dedupeGamesById` | function | 15717–15725 | 9 |
| `matchcenterIsFreiburgTuebingenTeamName` | function | 15726–15732 | 7 |
| `matchcenterSeasonHasGames` | function | 15736–15738 | 3 |
| `matchcenterDefaultSeasonKey` | function | 15739–15744 | 6 |
| `matchcenterOpponentMode` | function | 15756–15758 | 3 |
| `getMatchcenterOpponents` | function | 15759–15791 | 33 |
| `getMatchcenterDirectOpponents` | function | 15792–15822 | 31 |
| `matchcenterAnalyzeDirect` | function | 15825–15861 | 37 |
| `matchcenterAnalyzeForm` | function | 15862–15887 | 26 |
| `matchcenterGoalMinute` | function | 15896–15901 | 6 |
| `matchcenterEmptyBuckets` | function | 15910–15912 | 3 |
| `matchcenterUlmScoutingConfidence` | function | 15913–15917 | 5 |
| `matchcenterEnsureUlmPlayer` | function | 15918–15955 | 38 |
| `matchcenterRegisterUlmProfileGame` | function | 15956–15961 | 6 |
| `matchcenterUpdateUlmSeasonRow` | function | 15962–15968 | 7 |
| `matchcenterClassifyUlmGoalEvent` | function | 15969–15979 | 11 |
| `matchcenterAddUlmScoring` | function | 15980–16017 | 38 |
| `matchcenterFinalizeUlmPlayers` | function | 16018–16086 | 69 |
| `matchcenterBuildUlmPlayerScouting` | function | 16087–16141 | 55 |
| `matchcenterBuildUlmPlayerInsights` | function | 16142–16154 | 13 |
| `matchcenterDuoPairKey` | function | 16155–16158 | 4 |
| `matchcenterEnsureOpponentDuo` | function | 16159–16191 | 33 |
| `matchcenterDuoDirectionLabel` | function | 16192–16198 | 7 |
| `matchcenterAddDuoConnection` | function | 16199–16217 | 19 |
| `matchcenterFinalizeOpponentDuos` | function | 16218–16252 | 35 |
| `matchcenterBuildOpponentDuos` | function | 16253–16297 | 45 |
| `matchcenterBuildOpponentDuoInsights` | function | 16298–16311 | 14 |
| `matchcenterEnsureUlmDuo` | function | 16312–16349 | 38 |
| `matchcenterAddUlmDuoConnection` | function | 16350–16368 | 19 |
| `matchcenterFinalizeUlmDuos` | function | 16369–16404 | 36 |
| `matchcenterBuildUlmDuos` | function | 16405–16447 | 43 |
| `matchcenterBuildUlmDuoInsights` | function | 16448–16460 | 13 |
| `matchcenterDirectContextGames` | function | 16461–16463 | 3 |
| `matchcenterSpecialTeamsForGame` | function | 16464–16467 | 4 |
| `matchcenterPersonalPenaltyMinutesForSide` | function | 16468–16476 | 9 |
| `matchcenterPct` | function | 16477–16480 | 4 |
| `matchcenterBuildSpecialTeamsMatchup` | function | 16481–16528 | 48 |
| `matchcenterGoalieKey` | function | 16529–16533 | 5 |
| `matchcenterGoalieFitScore` | function | 16534–16550 | 17 |
| `matchcenterBuildGoalieMatchup` | function | 16551–16596 | 46 |
| `matchcenterGoalAbsSeconds` | function | 16597–16604 | 8 |
| `matchcenterTimeValue` | function | 16605–16612 | 8 |
| `matchcenterEmptyTimingStats` | function | 16613–16621 | 9 |
| `matchcenterWindowForSecond` | function | 16622–16628 | 7 |
| `matchcenterTimingStatsForGames` | function | 16629–16665 | 37 |
| `matchcenterBuildTimingInsights` | function | 16666–16676 | 11 |
| `matchcenterBuildTimingAnalysis` | function | 16677–16687 | 11 |
| `rMatchcenterTimeBars` | function | 16688–16701 | 14 |
| `rMatchcenterTimingStatsCard` | function | 16702–16721 | 20 |
| `rMatchcenterTiming` | function | 16722–16745 | 24 |
| `rMatchcenterTabs` | function | 16761–16763 | 3 |
| `rMatchcenterProfileSection` | function | 16764–16783 | 20 |
| `rMatchcenterFormSection` | function | 16784–16809 | 26 |
| `rMatchcenterDetailsSection` | function | 16810–16817 | 8 |
| `matchcenterResultClass` | function | 16818–16820 | 3 |
| `matchcenterUlmTeamLabelForGame` | function | 16822–16826 | 5 |
| `matchcenterGameLine` | function | 16827–16832 | 6 |
| `matchcenterFormLine` | function | 16833–16837 | 5 |
| `matchcenterBuildInsights` | function | 16838–16858 | 21 |
| `rMatchcenterKpi` | function | 16859–16865 | 7 |
| `rMatchcenterFormCard` | function | 16866–16886 | 21 |
| `rMatchcenterGamesList` | function | 16887–16898 | 12 |
| `rMatchcenterWatchCard` | function | 16899–16919 | 21 |
| `rMatchcenterPlayerRow` | function | 16920–16943 | 24 |
| `rMatchcenterRankCard` | function | 16944–16949 | 6 |
| `rMatchcenterUlmImpactCard` | function | 16950–16978 | 29 |
| `rMatchcenterUlmPlayerRow` | function | 16979–17002 | 24 |
| `rMatchcenterUlmRankCard` | function | 17003–17008 | 6 |
| `rMatchcenterUlmScouting` | function | 17009–17045 | 37 |
| `rMatchcenterOpponentScouting` | function | 17046–17081 | 36 |
| `rMatchcenterPlayersTab` | function | 17082–17084 | 3 |
| `rMatchcenterDuoWatchCard` | function | 17085–17104 | 20 |
| `rMatchcenterDuoRow` | function | 17105–17128 | 24 |
| `rMatchcenterDuoRankCard` | function | 17129–17134 | 6 |
| `rMatchcenterUlmDuoWatchCard` | function | 17135–17160 | 26 |
| `rMatchcenterUlmDuoRow` | function | 17161–17183 | 23 |
| `rMatchcenterUlmDuoRankCard` | function | 17184–17189 | 6 |
| `rMatchcenterUlmDuos` | function | 17190–17232 | 43 |
| `rMatchcenterOpponentDuos` | function | 17233–17275 | 43 |
| `rMatchcenterDuosTab` | function | 17276–17278 | 3 |
| `rMatchcenterSpecialCard` | function | 17279–17287 | 9 |
| `rMatchcenterSpecialTeams` | function | 17288–17337 | 50 |
| `rMatchcenterGoalieCard` | function | 17338–17361 | 24 |
| `rMatchcenterGoalieMatchup` | function | 17362–17390 | 29 |
| `matchcenterPlanScoreText` | function | 17391–17394 | 4 |
| `matchcenterPlanRateText` | function | 17395–17399 | 5 |
| `matchcenterPriorityLabel` | function | 17400–17402 | 3 |
| `matchcenterConfidenceClass` | function | 17403–17408 | 6 |
| `matchcenterInferPriority` | function | 17409–17415 | 7 |
| `matchcenterAddPlanItem` | function | 17416–17421 | 6 |
| `matchcenterAddPlanWatch` | function | 17422–17427 | 6 |
| `matchcenterBuildPlanConfidence` | function | 17428–17475 | 48 |
| `matchcenterIntelCurve` | function | 17476–17481 | 6 |
| `matchcenterIntelInverseCurve` | function | 17482–17485 | 4 |
| `matchcenterIntelWeighted` | function | 17486–17496 | 11 |
| `matchcenterIntelRate` | function | 17497–17500 | 4 |
| `matchcenterIntelPct` | function | 17501–17504 | 4 |
| `matchcenterIntelPriorityFromScore` | function | 17505–17510 | 6 |
| `matchcenterIntelPriorityClass` | function | 17511–17516 | 6 |
| `matchcenterIntelPriorityLabel` | function | 17517–17520 | 4 |
| `matchcenterIntelDataLabel` | function | 17521–17523 | 3 |
| `matchcenterBuildIntelligenceDataQuality` | function | 17524–17593 | 70 |
| `matchcenterBuildOpponentDNA` | function | 17594–17706 | 113 |
| `matchcenterDeriveOpponentType` | function | 17707–17724 | 18 |
| `matchcenterIntelPlayerRef` | function | 17725–17737 | 13 |
| `matchcenterIntelDuoRef` | function | 17738–17751 | 14 |
| `matchcenterIntelAddAlarm` | function | 17752–17772 | 21 |
| `matchcenterBuildOpponentAlarm` | function | 17773–17882 | 110 |
| `matchcenterBuildIntelListFromPlan` | function | 17883–17891 | 9 |
| `matchcenterBuildCoachHints` | function | 17892–17907 | 16 |
| `matchcenterBuildIntelHeadline` | function | 17908–17915 | 8 |
| `matchcenterBuildOneThingToWatch` | function | 17916–17928 | 13 |
| `matchcenterBuildIntelligenceSignals` | function | 17929–17975 | 47 |
| `buildMatchIntelligenceFromContext` | function | 17976–18030 | 55 |
| `buildMatchIntelligence` | function | 18031–18052 | 22 |
| `matchcenterCoachCautious` | function | 18053–18055 | 3 |
| `matchcenterCoachAdd` | function | 18056–18064 | 9 |
| `matchcenterCoachGameModel` | function | 18065–18078 | 14 |
| `buildMatchStories` | function | 18079–18108 | 30 |
| `matchcenterCoachPriorityFromAlarm` | function | 18109–18118 | 10 |
| `matchcenterBuildCoachPriorities` | function | 18119–18125 | 7 |
| `matchcenterBuildCoachLevers` | function | 18126–18135 | 10 |
| `matchcenterBuildCoachDangerPatterns` | function | 18136–18143 | 8 |
| `matchcenterBuildCoachIfThen` | function | 18144–18153 | 10 |
| `matchcenterBuildCoachAvoidList` | function | 18154–18163 | 10 |
| `matchcenterBuildCoachActivationHints` | function | 18164–18170 | 7 |
| `matchcenterBuildCoachKeyActors` | function | 18171–18178 | 8 |
| `buildDigitalCoachReport` | function | 18179–18211 | 33 |
| `buildLockerRoomSheet` | function | 18212–18232 | 21 |
| `matchcenterSocialAdd` | function | 18233–18239 | 7 |
| `matchcenterSocialCaption` | function | 18240–18245 | 6 |
| `socialSentence` | function | 18246–18248 | 3 |
| `socialEnsurePeriod` | function | 18249–18252 | 4 |
| `socialFirstUseful` | function | 18253–18255 | 3 |
| `socialPlayerFocusLine` | function | 18256–18262 | 7 |
| `socialDuoFocusLine` | function | 18263–18268 | 6 |
| `socialOpponentLine` | function | 18269–18272 | 4 |
| `socialKeyFactLine` | function | 18273–18282 | 10 |
| `buildMatchdayCaptionBlocks` | function | 18283–18312 | 30 |
| `buildSocialMediaContent` | function | 18313–18361 | 49 |
| `isSyntheticLineupPlayerId` | function | 18367–18369 | 3 |
| `getSyntheticLineupPlayers` | function | 18370–18372 | 3 |
| `getSyntheticLineupRow` | function | 18373–18389 | 17 |
| `getSyntheticLineupRows` | function | 18390–18392 | 3 |
| `getLineupAllRows` | function | 18393–18395 | 3 |
| `lineupRowMeta` | function | 18396–18403 | 8 |
| `getLineupPlayerPool` | function | 18404–18412 | 9 |
| `lineupScore` | function | 18413–18418 | 6 |
| `lineupAverage` | function | 18419–18422 | 4 |
| `lineupLevelLabel` | function | 18423–18426 | 4 |
| `lineupRosterGamesForPlayer` | function | 18429–18476 | 48 |
| `buildLineupExperienceProfile` | function | 18477–18519 | 43 |
| `lineupOpponentDNAForContext` | function | 18520–18531 | 12 |
| `buildLineupOpponentDNAFit` | function | 18532–18575 | 44 |
| `classifyLineIdentity` | function | 18576–18623 | 48 |
| `lineupPlayerProfile` | function | 18624–18699 | 76 |
| `buildLineupAnalysis` | function | 18700–18833 | 134 |
| `buildLineupScoreBreakdowns` | function | 18834–18863 | 30 |
| `buildLineupIntelligence` | function | 18864–18874 | 11 |
| `buildLineAnalysis` | function | 18875–18877 | 3 |
| `lineupRowMap` | function | 18878–18880 | 3 |
| `lineupRankCandidateIds` | function | 18881–18895 | 15 |
| `lineupCombinationIds` | function | 18896–18909 | 14 |
| `lineupStdDev` | function | 18910–18915 | 6 |
| `lineupRoleDnaComplementScore` | function | 18916–18939 | 24 |
| `lineupDirectChemistryScore` | function | 18940–18946 | 7 |
| `lineupEvaluateComplementCandidate` | function | 18947–19025 | 79 |
| `lineupPlayerAnchorScore` | function | 19026–19043 | 18 |
| `lineupPlayerAnchorConfidence` | function | 19046–19050 | 5 |
| `buildTeamLineBalance` | function | 19051–19094 | 44 |
| `buildBalancedLineupSet` | function | 19095–19121 | 27 |
| `lineupRecommendationReason` | function | 19122–19130 | 9 |
| `buildLineupRecommendations` | function | 19131–19212 | 82 |
| `recommendLineComplements` | function | 19213–19240 | 28 |
| `matchcenterBuildMatchPlan` | function | 19241–19386 | 146 |
| `rMatchcenterPlanItems` | function | 19387–19404 | 18 |
| `rMatchcenterPlanWatch` | function | 19405–19420 | 16 |
| `rMatchcenterOpponentDNA` | function | 19421–19453 | 33 |
| `rMatchcenterOpponentAlarm` | function | 19454–19475 | 22 |
| `rMatchcenterIntelOverview` | function | 19476–19521 | 46 |
| `rMatchcenterIntelCoachHints` | function | 19522–19535 | 14 |
| `rMatchcenterCoachCardList` | function | 19536–19549 | 14 |
| `rMatchcenterCoachIfThen` | function | 19550–19557 | 8 |
| `rMatchcenterCoachSimpleList` | function | 19558–19562 | 5 |
| `rMatchcenterDigitalCoach` | function | 19563–19627 | 65 |
| `rMatchcenterCopyButton` | function | 19628–19632 | 5 |
| `rMatchcenterLockerList` | function | 19633–19644 | 12 |
| `rMatchcenterLockerRoomSheet` | function | 19645–19700 | 56 |
| `rMatchcenterSocialBlock` | function | 19701–19708 | 8 |
| `matchcenterStoryDownloadFileName` | function | 19709–19718 | 10 |
| `downloadMatchdayStory` | window | 19719–19766 | 48 |
| `rSocialVideoBlock` | function | 19770–19801 | 32 |
| `socialVideoJobsForMatchday` | function | 19804–19810 | 7 |
| `generateSocialVideoVideos` | window | 19811–19852 | 42 |
| `cancelSocialVideoRecording` | window | 19853–19855 | 3 |
| `generateSocialVideoStandbilder` | window | 19856–19879 | 24 |
| `generateSocialVideoContactSheets` | window | 19880–19902 | 23 |
| `rMatchcenterSocialMediaCenter` | function | 19903–19956 | 54 |
| `rLineupScoreRows` | function | 19957–19978 | 22 |
| `rLineupSimpleCards` | function | 19979–19987 | 9 |
| `rMatchcenterLineupBuilder` | function | 19988–20060 | 73 |
| `rLineupMetricPills` | function | 20061–20074 | 14 |
| `rLineupBuilderAvailablePanel` | function | 20075–20122 | 48 |
| `rLineupRecommendationCards` | function | 20123–20137 | 15 |
| `rLineupRecommendationMode` | function | 20138–20171 | 34 |
| `rLineupComplementCards` | function | 20172–20184 | 13 |
| `rLineupTestLine` | function | 20185–20233 | 49 |
| `rLineupTestMode` | function | 20234–20250 | 17 |
| `rLineupBuilderPage` | function | 20251–20285 | 35 |
| `rMatchcenterScoutingSummary` | function | 20286–20329 | 44 |
| `rMatchcenterMatchPlan` | function | 20330–20350 | 21 |
| `matchcenterStoryLogoBase` | function | 20353–20358 | 6 |
| `matchcenterStorySafeLogoUrl` | function | 20359–20365 | 7 |
| `getTeamLogoUrlForStory` | function | 20374–20403 | 30 |
| `matchcenterStoryLogoForOpponent` | function | 20404–20418 | 15 |
| `matchcenterStoryTableRank` | function | 20419–20429 | 11 |
| `matchcenterStoryUlmTableRank` | function | 20430–20436 | 7 |
| `matchcenterStoryRankText` | function | 20437–20440 | 4 |
| `matchcenterStoryInlineStat` | function | 20441–20443 | 3 |
| `matchcenterStoryRankRows` | function | 20445–20456 | 12 |
| `matchcenterStoryAddFact` | function | 20459–20465 | 7 |
| `matchcenterStoryFactKey` | function | 20466–20468 | 3 |
| `matchcenterStoryLooksArtificial` | function | 20469–20471 | 3 |
| `matchcenterStoryEstimateFactWeight` | function | 20472–20477 | 6 |
| `matchcenterStoryAddCandidate` | function | 20478–20500 | 23 |
| `matchcenterStoryCategoryLimit` | function | 20501–20504 | 4 |
| `matchcenterStoryNormalizePickOptions` | function | 20505–20515 | 11 |
| `matchcenterStoryCandidateForBudget` | function | 20516–20525 | 10 |
| `matchcenterStoryPickFactItems` | function | 20526–20578 | 53 |
| `matchcenterStoryPickFacts` | function | 20579–20581 | 3 |
| `matchcenterStoryCurrentStreak` | function | 20583–20591 | 9 |
| `matchcenterStoryWinlessStreak` | function | 20592–20600 | 9 |
| `matchcenterStoryFormFact` | function | 20601–20611 | 11 |
| `matchcenterStoryFormFactCandidates` | function | 20612–20631 | 20 |
| `matchcenterStoryLateGoalsForOutcome` | function | 20632–20635 | 4 |
| `matchcenterStoryClutchFact` | function | 20636–20650 | 15 |
| `matchcenterStoryPlayerClutchTotal` | function | 20651–20658 | 8 |
| `matchcenterStoryBestClutchPlayer` | function | 20659–20668 | 10 |
| `matchcenterStoryPlayerClutchFact` | function | 20669–20694 | 26 |
| `matchcenterStoryDuoClutchTotal` | function | 20695–20702 | 8 |
| `matchcenterStoryBestClutchDuo` | function | 20703–20712 | 10 |
| `matchcenterStoryDuoClutchFact` | function | 20713–20715 | 3 |
| `matchcenterStoryDuoFact` | function | 20716–20736 | 21 |
| `matchcenterStoryClutchPriority` | function | 20737–20739 | 3 |
| `matchcenterStoryCompetitionLabel` | function | 20740–20743 | 4 |
| `matchcenterStoryShortDuel` | function | 20744–20748 | 5 |
| `matchcenterStoryLastDuelLabel` | function | 20749–20752 | 4 |
| `matchcenterStoryDirectFactCandidates` | function | 20753–20774 | 22 |
| `matchcenterStoryPlanFactCandidates` | function | 20775–20787 | 13 |
| `matchcenterStoryCategoryForPlanFact` | function | 20788–20796 | 9 |
| `buildMatchcenterStoryPreviewData` | function | 20797–20908 | 112 |
| `matchcenterStoryNameClass` | function | 20909–20914 | 6 |
| `matchcenterStoryVisibleFacts` | function | 20915–20945 | 31 |
| `rMatchcenterStoryLogo` | function | 20946–20950 | 5 |
| `rMatchcenterStoryForm` | function | 20951–20955 | 5 |
| `rMatchcenterStoryPlayerCard` | function | 20956–20963 | 8 |
| `rMatchcenterStoryPreview` | function | 20964–21033 | 70 |
| `rMatchcenterStoryFrame` | function | 21034–21039 | 6 |
| `fitMatchcenterStoryLayout` | function | 21040–21082 | 43 |
| `ensureSocialVideoExportCapabilityChecked` | function | 21091–21095 | 5 |
| `downloadSocialVideoStandbild` | window | 21110–21129 | 20 |
| `downloadSocialVideoContactSheet` | window | 21134–21159 | 26 |
| `rMatchcenterPage` | function | 21161–21309 | 149 |
| `rTeamPage` | function | 21310–21648 | 339 |
| `exportExcel` | function | 21653–21678 | 26 |
| `render` | function | 21684–21701 | 18 |
| `_render` | function | 21702–21871 | 170 |
| `uiFormatNumber` | function | 21905–21909 | 5 |
| `uiReliabilityDots` | function | 21918–21925 | 8 |
| `uiDeltaIndicator` | function | 21933–21939 | 7 |
| `uiInfoIcon` | function | 21951–21955 | 5 |
| `uiKennzahlKachel` | function | 21963–21974 | 12 |
| `uiKernaussage` | function | 21983–21989 | 7 |
| `uiHinweisKarte` | function | 21997–22009 | 13 |
| `uiRangliste` | function | 22019–22036 | 18 |
| `uiVerlauf` | function | 22047–22066 | 20 |
| `uiIntervallBalken` | function | 22073–22085 | 13 |
| `uiMethodenbox` | function | 22092–22101 | 10 |
| `uiNotiz` | function | 22109–22113 | 5 |
| `datenstandQuoteState` | function | 22135–22142 | 8 |
| `uiQuoteText` | function | 22145–22151 | 7 |
| `uiDatenstandBand` | function | 22168–22181 | 14 |
| `uiPlatzhalter` | function | 22189–22194 | 6 |
| `uiObjektseiteSortTabs` | function | 22239–22247 | 9 |
| `uiObjektseite` | function | 22257–22290 | 34 |
| `mainNavActiveKeyForPage` | function | 22347–22352 | 6 |
| `goToMainNavPoint` | window | 22353–22359 | 7 |
| `rMainNav` | function | 22360–22364 | 5 |
| `rMainNavBottom` | function | 22382–22389 | 8 |
| `openOverview` | window | 22399–22407 | 9 |
| `switchOverviewSeason` | window | 22416–22422 | 7 |
| `openMatchdayTimeline` | window | 22450–22457 | 8 |
| `openMatchday` | window | 22458–22467 | 10 |
| `switchMatchdaySeason` | window | 22469–22474 | 6 |
| `matchdayUlmGames` | function | 22476–22478 | 3 |
| `matchdayLineupInfo` | function | 22485–22495 | 11 |
| `matchdayLineupCardHtml` | function | 22497–22503 | 7 |
| `matchdayGameCardHtml` | function | 22504–22523 | 20 |
| `matchdayFixtureCardHtml` | function | 22529–22537 | 9 |
| `rMatchdayTimelineRow` | function | 22539–22546 | 8 |
| `rMatchdayTimelinePage` | function | 22547–22557 | 11 |
| `rMatchdayDetailPage` | function | 22558–22597 | 40 |
| `rMatchdayPage` | function | 22598–22604 | 7 |
| `overviewMatchdayStartMs` | function | 22623–22628 | 6 |
| `overviewMatchdayEndMs` | function | 22629–22634 | 6 |
| `detectOverviewPhase` | function | 22635–22660 | 26 |
| `getSeasonDataState` | function | 22667–22677 | 11 |
| `parseSeasonDataState` | function | 22678–22686 | 9 |
| `isNewSeasonDataState` | function | 22688–22690 | 3 |
| `recordOverviewVisit` | function | 22697–22706 | 10 |
| `overviewOpponentLabel` | function | 22712–22723 | 12 |
| `overviewLastMatchdayText` | function | 22724–22727 | 4 |
| `overviewNextMatchdayHtml` | function | 22734–22750 | 17 |
| `overviewCompactTableHtml` | function | 22758–22774 | 17 |
| `overviewFormHtml` | function | 22776–22790 | 15 |
| `overviewSeasonBilanzHtml` | function | 22791–22797 | 7 |
| `overviewSeasonAwardHtml` | function | 22799–22808 | 10 |
| `overviewRecordHtml` | function | 22810–22815 | 6 |
| `overviewCrossSeasonTrendHtml` | function | 22817–22825 | 9 |
| `overviewOpponentPreviewHtml` | function | 22826–22830 | 5 |
| `overviewMatchcenterLinkHtml` | function | 22831–22833 | 3 |
| `overviewLineupLinkHtml` | function | 22834–22836 | 3 |
| `overviewRankChangeTile` | function | 22853–22870 | 18 |
| `buildOverviewCards` | function | 22879–22919 | 41 |
| `rOverviewPage` | function | 22929–22940 | 12 |
| `openLigaGegner` | window | 22941–22944 | 4 |
| `rLigaGegnerPlaceholderPage` | function | 22945–22950 | 6 |
| `rAsOfSelector` | function | 22962–22974 | 13 |
| `setContextAsOf` | window | 22975–22986 | 12 |
| `rSeasonDataPreviewContextHint` | function | 22997–23005 | 9 |
| `rSeasonDataStateContextHint` | function | 23014–23020 | 7 |
| `rContextBar` | function | 23045–23063 | 19 |
| `rIaShell` | function | 23065–23067 | 3 |
| `globalSearchTokens` | function | 23084–23087 | 4 |
| `globalSearchEntries` | function | 23089–23102 | 14 |
| `globalSearchPlayerScore` | function | 23103–23110 | 8 |
| `globalSearchMatchdayScore` | function | 23112–23124 | 13 |
| `globalSearchMatch` | function | 23126–23137 | 12 |
| `globalSearchIsEditableTarget` | function | 23138–23142 | 5 |
| `globalSearchKeyAction` | function | 23144–23158 | 15 |
| `rGlobalSearchToggle` | function | 23159–23161 | 3 |
| `rGlobalSearchResultsHtml` | function | 23162–23172 | 11 |
| `rGlobalSearchPanelHtml` | function | 23173–23175 | 3 |
| `paintGlobalSearchResults` | function | 23176–23183 | 8 |
| `openGlobalSearch` | window | 23184–23208 | 25 |
| `closeGlobalSearch` | window | 23209–23216 | 8 |
| `onGlobalSearchInput` | window | 23217–23222 | 6 |
| `moveGlobalSearch` | function | 23223–23228 | 6 |
| `activateGlobalSearchResult` | window | 23229–23238 | 10 |
| `globalSearchOnKeydown` | function | 23239–23260 | 22 |
| `initGlobalSearch` | function | 23261–23265 | 5 |
| `rToolMenu` | function | 23287–23290 | 4 |
| `toolMenuElements` | function | 23291–23293 | 3 |
| `toolMenuItemElements` | function | 23294–23296 | 3 |
| `isToolMenuOpen` | function | 23297–23300 | 4 |
| `openToolMenu` | window | 23301–23308 | 8 |
| `closeToolMenu` | window | 23309–23315 | 7 |
| `toggleToolMenu` | window | 23316–23319 | 4 |
| `activateToolMenuItem` | window | 23320–23327 | 8 |
| `toolMenuOnKeydown` | function | 23328–23351 | 24 |
| `toolMenuOnClick` | function | 23352–23358 | 7 |
| `initToolMenu` | function | 23359–23362 | 4 |

## Alphabetisches Register

| Name | Art | Zeile |
|---|---|---|
| `_render` | function | 21702 |
| `acceptEinsatzCenterRosterSuggestion` | window | 7622 |
| `activateGlobalSearchResult` | window | 23229 |
| `activateToolMenuItem` | window | 23320 |
| `addComparisonDuo` | window | 13272 |
| `addComparisonDuoFromSelection` | window | 13264 |
| `addComparisonItem` | window | 13172 |
| `addDuoTeamGame` | function | 11157 |
| `addEinsatzCenterExistingGroup` | window | 7639 |
| `addEinsatzCenterGroupPlayer` | window | 7707 |
| `addEinsatzCenterNewGroup` | window | 7648 |
| `addEinsatzCenterRosterPlayer` | window | 7588 |
| `addGoalieGameToStats` | function | 4505 |
| `addGoalieSpecialTeamsGameToStats` | function | 4475 |
| `addLineupBuilderPlayerToActiveLine` | window | 2349 |
| `addLineupBuilderPlayerToLine` | window | 2339 |
| `addLineupPlayer` | window | 2285 |
| `addRosterImpactGameToStats` | function | 11692 |
| `addSelectedComparisonItem` | window | 13180 |
| `addSyntheticLineupPlayer` | window | 2365 |
| `addUnique` | function | 3692 |
| `aggregateAllTimeDuos` | function | 4848 |
| `aggregateAllTimePlayers` | function | 3959 |
| `aggregateAlltimeSpecialTeams` | function | 4455 |
| `aggregateGoalieAlltimeStats` | function | 4688 |
| `aggregateSeasonStats` | function | 4860 |
| `analysisCacheContext` | function | 2191 |
| `analysisCacheKey` | function | 2225 |
| `annotateSpecialTeamsGoalEvent` | function | 4237 |
| `antiSynergyDeltaClass` | function | 11927 |
| `antiSynergyImpactScore` | function | 11833 |
| `antiSynergyPartnerIsSgOnly` | function | 11979 |
| `antiSynergySigned` | function | 11931 |
| `appendSeasonGameDiagnostics` | function | 2561 |
| `applyAppHash` | function | 3487 |
| `applyCurrentSeasonCoverHighlight` | function | 6092 |
| `applyGlobalPageFromHash` | function | 3454 |
| `applySeasonContext` | function | 2426 |
| `applySeasonScoringToRegistry` | function | 3850 |
| `asOfCacheKeyPart` | function | 2219 |
| `asOfEquals` | function | 3158 |
| `assignStatus` | function | 5698 |
| `avgOrNull` | function | 3997 |
| `backToComparisonModeSelect` | window | 13200 |
| `backToHome` | window | 2402 |
| `buildAlltimePlayerDashModel` | function | 14339 |
| `buildAnnotatedGoalEventsForGame` | function | 10763 |
| `buildAppHash` | function | 3304 |
| `buildBalancedLineupSet` | function | 19095 |
| `buildBestThirdManOptions` | function | 10648 |
| `buildComparisonDataset` | function | 13641 |
| `buildComparisonExtraMetrics` | function | 13496 |
| `buildComparisonSummary` | function | 14005 |
| `buildConfidence` | function | 15550 |
| `buildDigitalCoachReport` | function | 18179 |
| `buildDirectDuoLookupForPlayer` | function | 10606 |
| `buildDryRunReport` | function | 6316 |
| `buildDuoAntiSynergy` | function | 11917 |
| `buildDuoComparison` | function | 13285 |
| `buildDuoCompatibility` | function | 11280 |
| `buildDuoDirectProduction` | function | 11133 |
| `buildDuoFloorCeiling` | function | 11044 |
| `buildDuoGapAnalysis` | function | 11252 |
| `buildDuoNetworkContext` | function | 11228 |
| `buildDuoOpponentAdjusted` | function | 11215 |
| `buildDuoProAnalysis` | function | 11339 |
| `buildDuoReplacementOptions` | function | 11327 |
| `buildDuoUntestedPotential` | function | 11303 |
| `buildDuoUsageRate` | function | 11315 |
| `buildDuoWarnings` | function | 11086 |
| `buildDuoWithWithoutImpact` | function | 11181 |
| `buildEinsatzCenterDraftExport` | function | 7768 |
| `buildFieldPlayerExplanation` | function | 14978 |
| `buildGlobalPageHash` | function | 3321 |
| `buildGoalieAnalysisModel` | function | 9571 |
| `buildGoalieComparisonDataset` | function | 13590 |
| `buildGoalieGameRecord` | function | 4557 |
| `buildGoaliePlayerExplanation` | function | 15053 |
| `buildGoalieRoleProfile` | function | 9794 |
| `buildGoalieStatsForSeason` | function | 4607 |
| `buildHallOfFameIntroTitle` | function | 8478 |
| `buildHashStringFromParsed` | function | 3336 |
| `buildIdentityProfiles` | function | 5420 |
| `buildLineAnalysis` | function | 18875 |
| `buildLineupAnalysis` | function | 18700 |
| `buildLineupExperienceProfile` | function | 18477 |
| `buildLineupIntelligence` | function | 18864 |
| `buildLineupOpponentDNAFit` | function | 18532 |
| `buildLineupRecommendations` | function | 19131 |
| `buildLineupScoreBreakdowns` | function | 18834 |
| `buildLockerRoomSheet` | function | 18212 |
| `buildMatchcenterStoryPreviewData` | function | 20797 |
| `buildMatchdayCaptionBlocks` | function | 18283 |
| `buildMatchIntelligence` | function | 18031 |
| `buildMatchIntelligenceFromContext` | function | 17976 |
| `buildMatchStories` | function | 18079 |
| `buildMomentumSwingStats` | function | 11038 |
| `buildMomentumSwingStatsRaw` | function | 10967 |
| `buildOpponentIntelligence` | function | 10445 |
| `buildOverviewCards` | function | 22879 |
| `buildPlayerDataFoundation` | function | 4877 |
| `buildPlayerEvents` | function | 4931 |
| `buildPlayerExplanation` | function | 15107 |
| `buildPlayerIdentity` | function | 3703 |
| `buildPlayerIntelligence` | function | 15116 |
| `buildRecencyWeightedGlobalIdentityProfile` | function | 12498 |
| `buildRegistry` | function | 4900 |
| `buildResponseGoalStats` | function | 10955 |
| `buildResponseGoalStatsRaw` | function | 10906 |
| `buildRosterImpactAnalysis` | function | 11848 |
| `buildRosterImpactGameIndex` | function | 11735 |
| `buildSeasonDataPreviewChanges` | function | 6421 |
| `buildSeasonDuos` | function | 4804 |
| `buildSeasonPlayerDashModel` | function | 14302 |
| `buildSocialMediaContent` | function | 18313 |
| `buildSoloDuoProfile` | function | 5189 |
| `buildSpecialTeamsForGame` | function | 4252 |
| `buildSpecialTeamsForSeason` | function | 4446 |
| `buildStaticSeasonDataBlock` | function | 6140 |
| `buildTeamLineBalance` | function | 19051 |
| `cachedAnalysis` | function | 2229 |
| `cancelDuoProPicker` | window | 11542 |
| `cancelEinsatzCenterEdit` | window | 7569 |
| `cancelHallOfFameIntro` | function | 8567 |
| `cancelSocialVideoRecording` | window | 19853 |
| `capSuperlativeLabel` | function | 15674 |
| `clampScore` | function | 15537 |
| `classicTagLabel` | function | 8721 |
| `classifyLineIdentity` | function | 18576 |
| `cleanupHallOfFameIntro` | function | 8507 |
| `clearAnalysisCache` | function | 2188 |
| `clearComparison` | window | 13191 |
| `clearComparisonDuos` | window | 13279 |
| `clearLineupAvailable` | window | 2338 |
| `clearLineupBuilderLine` | window | 2357 |
| `clearLineupPlayers` | window | 2292 |
| `clearlyAboveAverage` | function | 5377 |
| `clonePlain` | function | 4094 |
| `closeGlobalSearch` | window | 23209 |
| `closeMatchcenterStoryPreview` | window | 2257 |
| `closeToolMenu` | window | 23309 |
| `clutchText` | function | 5261 |
| `collectAssistEventRefs` | function | 2881 |
| `comparisonDuoContext` | function | 13205 |
| `comparisonEventGameKey` | function | 13483 |
| `comparisonEventPhaseLabel` | function | 13486 |
| `comparisonFmt` | function | 12973 |
| `comparisonItemKey` | function | 12951 |
| `comparisonJsArg` | function | 12962 |
| `comparisonNum` | function | 12965 |
| `comparisonOpponentStrengthTier` | function | 13490 |
| `comparisonPct` | function | 12969 |
| `comparisonPctFmt` | function | 12977 |
| `comparisonVariantValue` | function | 13094 |
| `composeIdentityText` | function | 5652 |
| `computeCurrentAppHash` | function | 3356 |
| `computeEinsatzCenterStats` | function | 6782 |
| `computeMetrics` | function | 5035 |
| `computeRosterStatus` | function | 5678 |
| `confidenceCautiousText` | function | 15596 |
| `confidenceFromSampleSize` | function | 11825 |
| `confirmDuoProSelection` | window | 11547 |
| `confirmEinsatzCenterCombo` | window | 7740 |
| `copyMatchcenterText` | window | 2259 |
| `countBy` | function | 10192 |
| `countCaptainAppearances` | function | 5660 |
| `countGoalieAppearances` | function | 5674 |
| `countMomentumClusters` | function | 5294 |
| `countPlayedUlmGames` | function | 2801 |
| `createPlayerAnalysisProfile` | function | 3629 |
| `createSeasonBucket` | function | 1813 |
| `datenstandQuoteState` | function | 22135 |
| `decodeHashSegmentSafe` | function | 3229 |
| `dedupeGamesById` | function | 15717 |
| `dedupeIdentityProfileTags` | function | 12575 |
| `deriveAsOfForSeason` | function | 3034 |
| `deriveLineupUlmPlayerIds` | function | 7279 |
| `deriveLineupValidPlayerIds` | function | 7255 |
| `derivePlayerStatus` | function | 3732 |
| `detectOverviewPhase` | function | 22635 |
| `detectSide` | const-arrow | 2517 |
| `detectTypes` | function | 5169 |
| `detectUlmSide` | function | 2510 |
| `diagnoseGameDuplicates` | function | 2539 |
| `diagnosticError` | function | 5913 |
| `diffGameIds` | function | 6263 |
| `difficultConnectionConfidence` | function | 10582 |
| `discardEinsatzCenterAutosave` | function | 7178 |
| `discardSeasonDataPreview` | function | 6520 |
| `dismissEinsatzCenterRosterSuggestion` | window | 7611 |
| `downloadMatchdayStory` | window | 19719 |
| `downloadSocialVideoContactSheet` | window | 21134 |
| `downloadSocialVideoStandbild` | window | 21110 |
| `duoProContextSeasonKey` | function | 11108 |
| `duoProDomId` | function | 11503 |
| `duoProPairKey` | function | 11105 |
| `duoProPickerMessage` | function | 11509 |
| `duoProPickerOpen` | function | 11506 |
| `duoProPlayer` | function | 11122 |
| `duoProResolveCandidate` | function | 11522 |
| `duoProSelectionPayload` | function | 11531 |
| `duoScopeSeasonKeys` | function | 10624 |
| `einsatzCenterAutosaveDraft` | function | 7094 |
| `einsatzCenterAutosaveInfoText` | function | 7200 |
| `einsatzCenterAutosaveKey` | function | 7005 |
| `einsatzCenterCanonicalJson` | function | 7338 |
| `einsatzCenterComputeBaseHash` | function | 7353 |
| `einsatzCenterCurrentRawBaseHash` | function | 7080 |
| `einsatzCenterDeserializeAutosave` | function | 7040 |
| `einsatzCenterDraftInView` | function | 6909 |
| `einsatzCenterDraftIsEmpty` | function | 7017 |
| `einsatzCenterDraftStaleHint` | function | 6923 |
| `einsatzCenterInspectAutosave` | function | 7129 |
| `einsatzCenterIsPlainObject` | function | 7034 |
| `einsatzCenterSerializeDraft` | function | 7021 |
| `einsatzCenterSha256Hex` | function | 7348 |
| `einsatzCenterSoftIssues` | function | 7362 |
| `einsatzCenterStorageRead` | function | 7006 |
| `einsatzCenterStorageRemove` | function | 7012 |
| `einsatzCenterStorageWrite` | function | 7009 |
| `emptyDuoTeamImpactStats` | function | 11154 |
| `emptyFieldRoleSeasonStats` | function | 3688 |
| `emptyGoalieAlltimeStats` | function | 3661 |
| `emptyGoalieSeasonStats` | function | 3639 |
| `emptyGoalieSpecialTeamsStats` | function | 3676 |
| `emptyPlayerSeasonStats` | function | 3633 |
| `emptyRosterImpactStats` | function | 11681 |
| `emptySpecialTeamsStats` | function | 4053 |
| `ensureAppLoaded` | function | 8421 |
| `ensureEinsatzCenterDraft` | function | 6945 |
| `ensureExternalSeasonData` | function | 6118 |
| `ensureFieldRoleSeasonStats` | function | 3798 |
| `ensureGlobalDataLoaded` | function | 8349 |
| `ensureGoalieSeasonStats` | function | 3793 |
| `ensureHallOfFameIntroOverlay` | function | 8445 |
| `ensureLineupDataLoaded` | function | 6628 |
| `ensureLineupGroupsRegistryLoaded` | function | 6653 |
| `ensureRmDuo` | function | 10886 |
| `ensureRmPlayer` | function | 10880 |
| `ensureSocialVideoExportCapabilityChecked` | function | 21091 |
| `escAttr` | function | 8694 |
| `escHtml` | function | 12594 |
| `eventMatchesTeams` | function | 5255 |
| `explainScore` | function | 15600 |
| `exportEinsatzCenterDraft` | window | 7782 |
| `exportExcel` | function | 21653 |
| `fallbackIdentityProfile` | function | 8729 |
| `fetchJson` | function | 5957 |
| `fetchJsonLegacy` | function | 5889 |
| `fetchJsonWithDiagnostics` | function | 5948 |
| `fetchSeasonGameRaw` | function | 5983 |
| `fetchTextWithDiagnostics` | function | 5918 |
| `fileNameForLineupSeasonKey` | function | 6610 |
| `filterComparisonDuoSuggestions` | window | 13237 |
| `filterComparisonPlayers` | window | 13148 |
| `filterLineupBuilderAvailable` | window | 2386 |
| `filterLineupPlayers` | window | 2293 |
| `filterPlayerSuggestions` | function | 13212 |
| `filterPureSGPlayers` | function | 9367 |
| `finalizeDuoTeamImpactStats` | function | 11173 |
| `finalizeGoalieSeasonStats` | function | 4490 |
| `finalizeMomentumStats` | function | 10961 |
| `finalizePlayerRegistrySeason` | function | 3873 |
| `finalizeResponseStats` | function | 10892 |
| `finalizeRosterImpactStats` | function | 11684 |
| `finalizeSpecialTeamsStats` | function | 4097 |
| `findDuplicateGameIds` | function | 6182 |
| `findLineupGameContext` | function | 6687 |
| `findLoadedSeasonPlayer` | function | 9330 |
| `finishHallOfFameIntro` | function | 8534 |
| `finiteNumbers` | function | 3994 |
| `fitMatchcenterStoryLayout` | function | 21040 |
| `fixMojibakeText` | function | 2463 |
| `formatDiagnosticAttempt` | function | 5964 |
| `formatGameLoadError` | function | 5977 |
| `formatStatus` | function | 5961 |
| `gameClassificationStatusLabel` | function | 2553 |
| `gameDaySortValue` | function | 4163 |
| `gameResult` | function | 3587 |
| `generatePlayerInsights` | function | 9192 |
| `generateSocialVideoContactSheets` | window | 19880 |
| `generateSocialVideoStandbilder` | window | 19856 |
| `generateSocialVideoVideos` | window | 19811 |
| `getActiveAlltimeSeasonKeys` | function | 10364 |
| `getActiveSeasonKey` | function | 2414 |
| `getAllLoadedSeasonGames` | function | 10557 |
| `getAlltimeAggregatedStyleProfile` | function | 14182 |
| `getAllTimeCoverStats` | function | 8300 |
| `getAllTimeDuoRows` | function | 10512 |
| `getAllTimeDuoRowsForPlayer` | function | 10250 |
| `getAllTimeGamesPlayedRows` | function | 10290 |
| `getAllTimeIdentityStandings` | function | 12462 |
| `getAllTimeMainPlayerRows` | function | 9371 |
| `getAllTimeOpponentIntelligence` | function | 12383 |
| `getAllTimeOpponentNames` | function | 2492 |
| `getAllTimeOpponentTopScorers` | function | 12391 |
| `getAllTimePenaltyRows` | function | 10315 |
| `getAllTimePlayerRows` | function | 9339 |
| `getAlltimeRank` | function | 12907 |
| `getAlltimeRecencyWeight` | function | 10375 |
| `getAllTimeSgOnlyRows` | function | 9374 |
| `getAssistDiagnostics` | function | 4749 |
| `getAssistPlayersFromEvent` | function | 2909 |
| `getCarryPerformanceRows` | function | 10261 |
| `getComparisonAlltimeTeamGoals` | function | 12998 |
| `getComparisonAlltimeTrend` | function | 13072 |
| `getComparisonChemistryFromEvents` | function | 13006 |
| `getComparisonClutchFromEvents` | function | 13011 |
| `getComparisonCurrentSelection` | function | 13137 |
| `getComparisonEventsForItem` | function | 13455 |
| `getComparisonPlayerOptions` | function | 13079 |
| `getComparisonPlayerRow` | function | 12980 |
| `getComparisonProfile` | function | 13041 |
| `getComparisonRosterGames` | function | 13475 |
| `getComparisonRosterGamesForSeason` | function | 13458 |
| `getComparisonSeasonEvents` | function | 13001 |
| `getComparisonSeasonLabel` | function | 12983 |
| `getComparisonSeasonTrend` | function | 13046 |
| `getComparisonStyleProfile` | function | 13016 |
| `getComparisonTeamGoalsForSeason` | function | 12986 |
| `getComparisonVariantsForPlayer` | function | 13097 |
| `getDifficultConnectionRowsForPlayer` | function | 11636 |
| `getDuoDirectScorerGameCounts` | function | 10682 |
| `getDuoFieldPlayerRows` | function | 11111 |
| `getDuoRowsForPlayerScope` | function | 10587 |
| `getDuoScorerCountsWithCandidate` | function | 10628 |
| `getDuoSharedFieldRows` | function | 11127 |
| `getEffectiveLineupData` | function | 6895 |
| `getEinsatzCenterGameDraft` | function | 6967 |
| `getEmptyState` | function | 15651 |
| `getFieldGameIdsForPlayer` | function | 2710 |
| `getFurtherSameDayUlmGames` | function | 4179 |
| `getGameDurationMinutes` | function | 4158 |
| `getGameId` | function | 6176 |
| `getGlobalAllTimeSnapshot` | function | 2418 |
| `getGlobalIdentityProfile` | function | 12547 |
| `getGlobalLoadableSeasonKeys` | function | 8293 |
| `getGlobalOpponentSpecialistProfile` | function | 14638 |
| `getGlobalPlayerBestSeason` | function | 10243 |
| `getGlobalPlayerMilestones` | function | 10426 |
| `getGlobalPlayerOpponentGameRows` | function | 14609 |
| `getGlobalPlayerPeakGame` | function | 10232 |
| `getGlobalPlayerTeamRecord` | function | 10206 |
| `getGlobalProfileEvents` | function | 10179 |
| `getGlobalRookieMilestone` | function | 10415 |
| `getGlobalRookieSeasonKey` | function | 10401 |
| `getGlobalSeasonStatRows` | function | 12891 |
| `getGlobalTopScorerMilestones` | function | 10388 |
| `getGoalieComparisonAlltimeTrend` | function | 13554 |
| `getGoalieComparisonSeasonTrend` | function | 13571 |
| `getGoalieDiagnostics` | function | 4735 |
| `getGoalieDnaRows` | function | 9872 |
| `getGoalieGameIdsForPlayer` | function | 2717 |
| `getGoalieOpponentName` | function | 4034 |
| `getGoalieOpponentTier` | function | 4038 |
| `getGoalScorerFromEvent` | function | 2875 |
| `getHallGoalieData` | function | 12757 |
| `getHallOfFamePlayerIdSet` | function | 10175 |
| `getHallOfFamePlayerRows` | function | 10172 |
| `getHallOfFameStats` | function | 12417 |
| `getJerseyNumber` | function | 2814 |
| `getLineupAllRows` | function | 18393 |
| `getLineupPlayerPool` | function | 18404 |
| `getLoadedSeasonPlayerUi` | function | 10201 |
| `getLoadedSeasonPointsByName` | function | 10145 |
| `getMatchcenterDirectOpponents` | function | 15792 |
| `getMatchcenterOpponents` | function | 15759 |
| `getOppStrength` | function | 3600 |
| `getOrCreatePlayerProfile` | function | 3741 |
| `getPenaltyBasePersonalMinutes` | function | 4194 |
| `getPenaltyDisciplineMinutes` | function | 4212 |
| `getPenaltyDisciplineType` | function | 4150 |
| `getPenaltyPersonalMinutes` | function | 4202 |
| `getPenaltySpecialTeamsMinutes` | function | 4191 |
| `getPhaseIndex` | function | 5020 |
| `getPlayedUlmGames` | function | 2792 |
| `getPlayerAlltimeFieldGames` | function | 2754 |
| `getPlayerAlltimeGoalieGames` | function | 2757 |
| `getPlayerAlltimeRoleGames` | function | 2735 |
| `getPlayerAlltimeStats` | function | 9382 |
| `getPlayerAlltimeTotalGames` | function | 2760 |
| `getPlayerFieldGames` | function | 2724 |
| `getPlayerGoalieAlltimeStats` | function | 9403 |
| `getPlayerGoalieGames` | function | 2728 |
| `getPlayerGoalieSeasonStats` | function | 9398 |
| `getPlayerRegistryProfile` | function | 9390 |
| `getPlayerRoleAvailability` | function | 9433 |
| `getPlayerSeasonRoleGameSummary` | function | 2769 |
| `getPlayerSeasonStats` | function | 9377 |
| `getPlayerSourceId` | function | 2811 |
| `getPreClubHistoryPlayerNames` | function | 2530 |
| `getPreviousSeasonKey` | function | 10100 |
| `getRosterEntryRegistryProfile` | function | 10578 |
| `getRosterGameIdsForPlayer` | function | 2651 |
| `getRosterImpactPlayerEventLookup` | function | 11702 |
| `getRosterImpactPlayerGames` | function | 11773 |
| `getRosterStatus` | function | 10381 |
| `getScoreLabel` | function | 15541 |
| `getSeasonApiBaseUrl` | function | 1838 |
| `getSeasonDataPreview` | function | 6526 |
| `getSeasonDataState` | function | 22667 |
| `getSeasonIdentityProfile` | function | 10335 |
| `getSeasonmanagerRosterSuggestion` | function | 7309 |
| `getSeasonOriginBaseUrl` | function | 1858 |
| `getSeasonPlayerFieldBasis` | function | 8798 |
| `getSeasonScopedIdentityProfile` | function | 8825 |
| `getSeasonTeamGameIds` | function | 2808 |
| `getSeasonTeamGames` | function | 2804 |
| `getSeasonUiPlayerForProfile` | function | 10331 |
| `getSpecialTeamsDiagnostics` | function | 4742 |
| `getSpecialTeamsPenaltyChunks` | function | 4215 |
| `getStaticSeasonGames` | function | 6026 |
| `getStoredLastView` | function | 3435 |
| `getSyntheticLineupPlayers` | function | 18370 |
| `getSyntheticLineupRow` | function | 18373 |
| `getSyntheticLineupRows` | function | 18390 |
| `getTeamAllTimeRecords` | function | 12341 |
| `getTeamLogoUrlForStory` | function | 20374 |
| `getUlmTeamStatus` | function | 2505 |
| `getUniqueAllTimeOpponentNames` | function | 2500 |
| `globalSearchEntries` | function | 23089 |
| `globalSearchIsEditableTarget` | function | 23138 |
| `globalSearchKeyAction` | function | 23144 |
| `globalSearchMatch` | function | 23126 |
| `globalSearchMatchdayScore` | function | 23112 |
| `globalSearchOnKeydown` | function | 23239 |
| `globalSearchPlayerScore` | function | 23103 |
| `globalSearchTokens` | function | 23084 |
| `goalieApplySampleConfidence` | function | 9556 |
| `goalieBucketLooseSum` | function | 9564 |
| `goalieBucketRows` | function | 9476 |
| `goalieClampScore` | function | 9521 |
| `goalieDetailFirstTime` | function | 9500 |
| `goalieDnaKey` | function | 9781 |
| `goalieDnaValue` | function | 9786 |
| `goalieEntryRecognitionReason` | function | 2674 |
| `goalieEventAbsSeconds` | function | 4011 |
| `goalieEventSecondInPeriod` | function | 9507 |
| `goalieGameDurationSeconds` | function | 4017 |
| `goalieGameStateBeforeGoal` | function | 4022 |
| `goalieInverseScore` | function | 9525 |
| `goalieNum` | function | 9462 |
| `goaliePctText` | function | 9513 |
| `goaliePositiveCurveScore` | function | 9541 |
| `goaliePositiveScore` | function | 9533 |
| `goalieSafeNum` | function | 9517 |
| `goalieStateGoals` | function | 9793 |
| `goalieStdDev` | function | 9494 |
| `goalieTierMeta` | function | 9485 |
| `goalieTime` | function | 9468 |
| `goalieTopRow` | function | 9482 |
| `goalieWeightedScore` | function | 9550 |
| `goToMainNavPoint` | window | 22353 |
| `hallGoalieExplainForLabel` | function | 12794 |
| `hallGoalieNameHtml` | function | 12773 |
| `hallGoalieNum` | function | 12659 |
| `hallGoaliePkStats` | function | 12685 |
| `hallGoalieRowFromStats` | function | 12724 |
| `hallGoalieSeasonLabel` | function | 12673 |
| `hallGoalieSeasonScore` | function | 12704 |
| `hallGoalieTime` | function | 12665 |
| `hallGoalieTooltip` | function | 12790 |
| `hallGoalieTopteamStats` | function | 12697 |
| `handleComparisonDuoSearchKey` | window | 13245 |
| `hasEmbeddedSeasonData` | function | 8290 |
| `hashSegmentToSeasonKey` | function | 3142 |
| `hasSeasonRole` | function | 5404 |
| `hasSeasonSource` | function | 8286 |
| `hofIntroDelay` | function | 8442 |
| `identityClutchGoalsVsTeams` | function | 5285 |
| `identityDecisiveGoalsVsTeams` | function | 5288 |
| `identityGoalsVsTeams` | function | 5282 |
| `identityInputs` | function | 5319 |
| `identityLateGoalsVsTeams` | function | 5291 |
| `identityOpponentGroups` | function | 5247 |
| `identityPartnerStats` | function | 5233 |
| `identityPointsVsTeams` | function | 5279 |
| `incGoalieBucket` | function | 4007 |
| `incrementUniqueCounter` | function | 3696 |
| `initGlobalSearch` | function | 23261 |
| `initHashRouting` | function | 3566 |
| `initToolMenu` | function | 23359 |
| `invalidateGlobalIdentityCache` | function | 2243 |
| `isActiveAlltimeSeasonStats` | function | 10350 |
| `isComebackRelevantGoal` | function | 5275 |
| `isDecisiveGoal` | function | 5267 |
| `isEinsatzCenterGameFromDraft` | function | 6904 |
| `isExcludedGoalieAppearance` | function | 2684 |
| `isFieldAppearance` | function | 2704 |
| `isGamePlayed` | function | 3001 |
| `isGoalieAppearance` | function | 2698 |
| `isGoalieRosterEntry` | function | 2660 |
| `isHallOfFameEligiblePlayer` | function | 10166 |
| `isHallRowPureSG` | function | 12674 |
| `isImportantClutchGoal` | function | 5262 |
| `isLateGoal` | function | 5270 |
| `isMatchPenaltyEvent` | function | 4142 |
| `isNewSeasonDataState` | function | 22688 |
| `isPenaltyGoalEvent` | function | 4225 |
| `isPreClubHistoryPlayerName` | function | 2533 |
| `isPureSGPlayer` | function | 9363 |
| `isRookieCandidateForSeason` | function | 10135 |
| `isSameUlmTeamContext` | function | 4171 |
| `isSeasonDataPreviewStale` | function | 6534 |
| `isSgOnlyAlltimePlayer` | function | 9355 |
| `isSgOnlyHallOfFameExcluded` | function | 10157 |
| `isSyntheticLineupPlayerId` | function | 18367 |
| `isToolMenuOpen` | function | 23297 |
| `isTwoPlusTwoPenaltyEvent` | function | 4146 |
| `isUsableExternalSeasonData` | function | 6109 |
| `isValidAsOfDate` | function | 3146 |
| `isValidAsOfStartTime` | function | 3149 |
| `isVisibleSecondaryTrait` | function | 8700 |
| `kpiBadge` | function | 13963 |
| `kpiDelta` | function | 13682 |
| `kpiItemColor` | function | 13688 |
| `kpiNiceMax` | function | 13853 |
| `kpiRadarValue` | function | 13776 |
| `kpiTrendRows` | function | 13859 |
| `kpiValueText` | function | 13678 |
| `lexiconEntry` | function | 15347 |
| `lexiconUniqueKeys` | function | 15339 |
| `lineupAverage` | function | 18419 |
| `lineupBuilderPoolIds` | function | 2300 |
| `lineupCombinationIds` | function | 18896 |
| `lineupDirectChemistryScore` | function | 18940 |
| `lineupEvaluateComplementCandidate` | function | 18947 |
| `lineupGroupDisplayName` | function | 6813 |
| `lineupLevelLabel` | function | 18423 |
| `lineupOpponentDNAForContext` | function | 18520 |
| `lineupPlayerAnchorConfidence` | function | 19046 |
| `lineupPlayerAnchorScore` | function | 19026 |
| `lineupPlayerProfile` | function | 18624 |
| `lineupRankCandidateIds` | function | 18881 |
| `lineupRecommendationReason` | function | 19122 |
| `lineupRoleDnaComplementScore` | function | 18916 |
| `lineupRosterGamesForPlayer` | function | 18429 |
| `lineupRowMap` | function | 18878 |
| `lineupRowMeta` | function | 18396 |
| `lineupScore` | function | 18413 |
| `lineupStdDev` | function | 18910 |
| `linkUiPlayersToRegistry` | function | 3828 |
| `loadEinsatzCenterMismatchedAutosave` | function | 7224 |
| `loadSeason` | function | 8366 |
| `loadSeasonData` | function | 7809 |
| `loadSeasonForGlobal` | function | 8318 |
| `loadSeasonManifest` | function | 6041 |
| `mainNavActiveKeyForPage` | function | 22347 |
| `markFieldRoleAppearance` | function | 3803 |
| `matchcenterAddDuoConnection` | function | 16199 |
| `matchcenterAddPlanItem` | function | 17416 |
| `matchcenterAddPlanWatch` | function | 17422 |
| `matchcenterAddUlmDuoConnection` | function | 16350 |
| `matchcenterAddUlmScoring` | function | 15980 |
| `matchcenterAnalyzeDirect` | function | 15825 |
| `matchcenterAnalyzeForm` | function | 15862 |
| `matchcenterBuildCoachActivationHints` | function | 18164 |
| `matchcenterBuildCoachAvoidList` | function | 18154 |
| `matchcenterBuildCoachDangerPatterns` | function | 18136 |
| `matchcenterBuildCoachHints` | function | 17892 |
| `matchcenterBuildCoachIfThen` | function | 18144 |
| `matchcenterBuildCoachKeyActors` | function | 18171 |
| `matchcenterBuildCoachLevers` | function | 18126 |
| `matchcenterBuildCoachPriorities` | function | 18119 |
| `matchcenterBuildGoalieMatchup` | function | 16551 |
| `matchcenterBuildInsights` | function | 16838 |
| `matchcenterBuildIntelHeadline` | function | 17908 |
| `matchcenterBuildIntelligenceDataQuality` | function | 17524 |
| `matchcenterBuildIntelligenceSignals` | function | 17929 |
| `matchcenterBuildIntelListFromPlan` | function | 17883 |
| `matchcenterBuildMatchPlan` | function | 19241 |
| `matchcenterBuildOneThingToWatch` | function | 17916 |
| `matchcenterBuildOpponentAlarm` | function | 17773 |
| `matchcenterBuildOpponentDNA` | function | 17594 |
| `matchcenterBuildOpponentDuoInsights` | function | 16298 |
| `matchcenterBuildOpponentDuos` | function | 16253 |
| `matchcenterBuildPlanConfidence` | function | 17428 |
| `matchcenterBuildSpecialTeamsMatchup` | function | 16481 |
| `matchcenterBuildTimingAnalysis` | function | 16677 |
| `matchcenterBuildTimingInsights` | function | 16666 |
| `matchcenterBuildUlmDuoInsights` | function | 16448 |
| `matchcenterBuildUlmDuos` | function | 16405 |
| `matchcenterBuildUlmPlayerInsights` | function | 16142 |
| `matchcenterBuildUlmPlayerScouting` | function | 16087 |
| `matchcenterClassifyUlmGoalEvent` | function | 15969 |
| `matchcenterCoachAdd` | function | 18056 |
| `matchcenterCoachCautious` | function | 18053 |
| `matchcenterCoachGameModel` | function | 18065 |
| `matchcenterCoachPriorityFromAlarm` | function | 18109 |
| `matchcenterConfidenceClass` | function | 17403 |
| `matchcenterDateLabel` | function | 15701 |
| `matchcenterDefaultSeasonKey` | function | 15739 |
| `matchcenterDeriveOpponentType` | function | 17707 |
| `matchcenterDirectContextGames` | function | 16461 |
| `matchcenterDuoDirectionLabel` | function | 16192 |
| `matchcenterDuoPairKey` | function | 16155 |
| `matchcenterEmptyBuckets` | function | 15910 |
| `matchcenterEmptyTimingStats` | function | 16613 |
| `matchcenterEnsureOpponentDuo` | function | 16159 |
| `matchcenterEnsureUlmDuo` | function | 16312 |
| `matchcenterEnsureUlmPlayer` | function | 15918 |
| `matchcenterFinalizeOpponentDuos` | function | 16218 |
| `matchcenterFinalizeUlmDuos` | function | 16369 |
| `matchcenterFinalizeUlmPlayers` | function | 16018 |
| `matchcenterFormLine` | function | 16833 |
| `matchcenterGameLine` | function | 16827 |
| `matchcenterGoalAbsSeconds` | function | 16597 |
| `matchcenterGoalieFitScore` | function | 16534 |
| `matchcenterGoalieKey` | function | 16529 |
| `matchcenterGoalMinute` | function | 15896 |
| `matchcenterInferPriority` | function | 17409 |
| `matchcenterIntelAddAlarm` | function | 17752 |
| `matchcenterIntelCurve` | function | 17476 |
| `matchcenterIntelDataLabel` | function | 17521 |
| `matchcenterIntelDuoRef` | function | 17738 |
| `matchcenterIntelInverseCurve` | function | 17482 |
| `matchcenterIntelPct` | function | 17501 |
| `matchcenterIntelPlayerRef` | function | 17725 |
| `matchcenterIntelPriorityClass` | function | 17511 |
| `matchcenterIntelPriorityFromScore` | function | 17505 |
| `matchcenterIntelPriorityLabel` | function | 17517 |
| `matchcenterIntelRate` | function | 17497 |
| `matchcenterIntelWeighted` | function | 17486 |
| `matchcenterIsFreiburgTuebingenTeamName` | function | 15726 |
| `matchcenterOpponentMode` | function | 15756 |
| `matchcenterPct` | function | 16477 |
| `matchcenterPersonalPenaltyMinutesForSide` | function | 16468 |
| `matchcenterPlanRateText` | function | 17395 |
| `matchcenterPlanScoreText` | function | 17391 |
| `matchcenterPriorityLabel` | function | 17400 |
| `matchcenterRegisterUlmProfileGame` | function | 15956 |
| `matchcenterResultClass` | function | 16818 |
| `matchcenterSeasonHasGames` | function | 15736 |
| `matchcenterSigned` | function | 15695 |
| `matchcenterSocialAdd` | function | 18233 |
| `matchcenterSocialCaption` | function | 18240 |
| `matchcenterSpecialTeamsForGame` | function | 16464 |
| `matchcenterStoryAddCandidate` | function | 20478 |
| `matchcenterStoryAddFact` | function | 20459 |
| `matchcenterStoryBestClutchDuo` | function | 20703 |
| `matchcenterStoryBestClutchPlayer` | function | 20659 |
| `matchcenterStoryCandidateForBudget` | function | 20516 |
| `matchcenterStoryCategoryForPlanFact` | function | 20788 |
| `matchcenterStoryCategoryLimit` | function | 20501 |
| `matchcenterStoryClutchFact` | function | 20636 |
| `matchcenterStoryClutchPriority` | function | 20737 |
| `matchcenterStoryCompetitionLabel` | function | 20740 |
| `matchcenterStoryCurrentStreak` | function | 20583 |
| `matchcenterStoryDirectFactCandidates` | function | 20753 |
| `matchcenterStoryDownloadFileName` | function | 19709 |
| `matchcenterStoryDuoClutchFact` | function | 20713 |
| `matchcenterStoryDuoClutchTotal` | function | 20695 |
| `matchcenterStoryDuoFact` | function | 20716 |
| `matchcenterStoryEstimateFactWeight` | function | 20472 |
| `matchcenterStoryFactKey` | function | 20466 |
| `matchcenterStoryFormFact` | function | 20601 |
| `matchcenterStoryFormFactCandidates` | function | 20612 |
| `matchcenterStoryInlineStat` | function | 20441 |
| `matchcenterStoryLastDuelLabel` | function | 20749 |
| `matchcenterStoryLateGoalsForOutcome` | function | 20632 |
| `matchcenterStoryLogoBase` | function | 20353 |
| `matchcenterStoryLogoForOpponent` | function | 20404 |
| `matchcenterStoryLooksArtificial` | function | 20469 |
| `matchcenterStoryNameClass` | function | 20909 |
| `matchcenterStoryNormalizePickOptions` | function | 20505 |
| `matchcenterStoryPickFactItems` | function | 20526 |
| `matchcenterStoryPickFacts` | function | 20579 |
| `matchcenterStoryPlanFactCandidates` | function | 20775 |
| `matchcenterStoryPlayerClutchFact` | function | 20669 |
| `matchcenterStoryPlayerClutchTotal` | function | 20651 |
| `matchcenterStoryRankRows` | function | 20445 |
| `matchcenterStoryRankText` | function | 20437 |
| `matchcenterStorySafeLogoUrl` | function | 20359 |
| `matchcenterStoryShortDuel` | function | 20744 |
| `matchcenterStoryTableRank` | function | 20419 |
| `matchcenterStoryUlmTableRank` | function | 20430 |
| `matchcenterStoryVisibleFacts` | function | 20915 |
| `matchcenterStoryWinlessStreak` | function | 20592 |
| `matchcenterTimeValue` | function | 16605 |
| `matchcenterTimingStatsForGames` | function | 16629 |
| `matchcenterUlmScoutingConfidence` | function | 15913 |
| `matchcenterUlmTeamLabelForGame` | function | 16822 |
| `matchcenterUpdateUlmSeasonRow` | function | 15962 |
| `matchcenterWindowForSecond` | function | 16622 |
| `matchdayFixtureCardHtml` | function | 22529 |
| `matchdayGameCardHtml` | function | 22504 |
| `matchdayLineupCardHtml` | function | 22497 |
| `matchdayLineupInfo` | function | 22485 |
| `matchdayUlmGames` | function | 22476 |
| `medianOrNull` | function | 4001 |
| `mergeDuoSet` | function | 4831 |
| `mergeGoalieSpecialTeamsStats` | function | 4463 |
| `mergeSpecialTeamsStats` | function | 4107 |
| `moveGlobalSearch` | function | 23223 |
| `normalizeAssistPlayerName` | function | 2878 |
| `normalizeComparisonItem` | function | 12957 |
| `normalizeDuoComparisonItem` | function | 13201 |
| `normalizeEventPlayerRef` | function | 2817 |
| `normalizeLineupLines` | function | 2303 |
| `normalizePlayerName` | function | 2520 |
| `normalizeSecondaryTraits` | function | 5378 |
| `onGlobalSearchInput` | window | 23217 |
| `openAllTimePlayers` | window | 8434 |
| `openComparisonCenter` | window | 8604 |
| `openDuoProPicker` | window | 11541 |
| `openEinsatzCenter` | window | 6764 |
| `openGlobalSearch` | window | 23184 |
| `openHallOfFame` | window | 8580 |
| `openLexicon` | window | 8677 |
| `openLigaGegner` | window | 22941 |
| `openLineupBuilder` | window | 8655 |
| `openMatchcenter` | window | 8633 |
| `openMatchcenterStoryPreview` | window | 2256 |
| `openMatchday` | window | 22458 |
| `openMatchdayTimeline` | window | 22450 |
| `openOverview` | window | 22399 |
| `openSeason` | window | 8431 |
| `openToolMenu` | window | 23301 |
| `overviewCompactTableHtml` | function | 22758 |
| `overviewCrossSeasonTrendHtml` | function | 22817 |
| `overviewFormHtml` | function | 22776 |
| `overviewLastMatchdayText` | function | 22724 |
| `overviewLineupLinkHtml` | function | 22834 |
| `overviewMatchcenterLinkHtml` | function | 22831 |
| `overviewMatchdayEndMs` | function | 22629 |
| `overviewMatchdayStartMs` | function | 22623 |
| `overviewNextMatchdayHtml` | function | 22734 |
| `overviewOpponentLabel` | function | 22712 |
| `overviewOpponentPreviewHtml` | function | 22826 |
| `overviewRankChangeTile` | function | 22853 |
| `overviewRecordHtml` | function | 22810 |
| `overviewSeasonAwardHtml` | function | 22799 |
| `overviewSeasonBilanzHtml` | function | 22791 |
| `p1NarrativeKey` | function | 15615 |
| `paintGlobalSearchResults` | function | 23176 |
| `parseAppHash` | function | 3249 |
| `parseAsOfQueryValue` | function | 3288 |
| `parseComparisonVariant` | function | 13122 |
| `parseLastViewState` | function | 3423 |
| `parseSeasonDataState` | function | 22678 |
| `pct` | function | 5186 |
| `pctValue` | function | 12597 |
| `pdashBestPhase` | function | 14249 |
| `pdashInsight` | function | 14287 |
| `pdashInsights` | function | 14290 |
| `pdashNum` | function | 14233 |
| `pdashOpponentStrength` | function | 14267 |
| `pdashOpponentTier` | function | 14261 |
| `pdashPct` | function | 14237 |
| `pdashPhaseLabel` | function | 14241 |
| `pdashTopCount` | function | 14245 |
| `pdashTopOpponent` | function | 14257 |
| `pdashTopPartner` | function | 14253 |
| `penaltyRawText` | function | 4139 |
| `playerAppearedForUlmStatusInSeasonByName` | function | 10116 |
| `playerAppearedInSeasonByName` | function | 10105 |
| `playerExplainAdd` | function | 14923 |
| `playerExplainConfidence` | function | 14914 |
| `playerExplainConfidenceLabel` | function | 14920 |
| `playerExplainContextSentence` | function | 14959 |
| `playerExplainHeadline` | function | 14949 |
| `playerExplainRolePhrase` | function | 14940 |
| `playerExplainStyleSignature` | function | 14928 |
| `processGame` | function | 2942 |
| `rAlltimeKpis` | function | 12913 |
| `rAlltimePlayerDashboard` | function | 14442 |
| `rAllTimePlayersPage` | function | 15204 |
| `rankNarratives` | function | 15637 |
| `rAntiSynergyCompareChip` | function | 11936 |
| `rAntiSynergyDelta` | function | 11920 |
| `rAntiSynergyMainDelta` | function | 11983 |
| `rAntiSynergyMetricRow` | function | 11944 |
| `rAntiSynergyWinrateRow` | function | 11966 |
| `rAntiSynergyWinrateText` | function | 11960 |
| `rAsOfSelector` | function | 22962 |
| `ratio01` | function | 5187 |
| `rAvgResponseTimeNote` | function | 12217 |
| `rCarryPerformanceRows` | function | 10277 |
| `rClassicRoleTags` | function | 8786 |
| `rClassicTagTip` | function | 8724 |
| `rClutch` | function | 8992 |
| `rClutchBadge` | function | 8686 |
| `rComparisonCenterPage` | function | 14112 |
| `rComparisonDashboard` | function | 14063 |
| `rComparisonDuoSearchBox` | function | 13431 |
| `rComparisonDuoSuggestionButtons` | function | 13224 |
| `rComparisonMiniOverview` | function | 14051 |
| `rComparisonModeSelect` | function | 13452 |
| `rComparisonRoles` | function | 14055 |
| `rComparisonStyles` | function | 14074 |
| `rContextBar` | function | 23045 |
| `rDifficultConnectionList` | function | 11993 |
| `rDifficultConnectionListCompact` | function | 12060 |
| `rDifficultConnectionListCompactLegacy` | function | 12018 |
| `rDifficultConnectionsCard` | function | 12099 |
| `rDuoCenterPro` | function | 11383 |
| `rDuoCompareSummaryCards` | function | 13310 |
| `rDuoComparisonBars` | function | 13305 |
| `rDuoComparisonChemistry` | function | 13363 |
| `rDuoComparisonContext` | function | 13395 |
| `rDuoComparisonDashboard` | function | 13417 |
| `rDuoComparisonDetails` | function | 13413 |
| `rDuoComparisonImpact` | function | 13379 |
| `rDuoComparisonPage` | function | 13441 |
| `rDuoComparisonProfile` | function | 13341 |
| `rDuoProPlayerSelect` | function | 11570 |
| `rDuoResponseMomentumCard` | function | 12275 |
| `rDuoRows` | function | 10536 |
| `recommendLineComplements` | function | 19213 |
| `recordOverviewVisit` | function | 22697 |
| `registerPlayerIdentity` | function | 3775 |
| `registerSeasonRosters` | function | 3808 |
| `rEinsatzCenterAutosaveBanner` | function | 7186 |
| `rEinsatzCenterCombo` | function | 6709 |
| `rEinsatzCenterComboEditor` | function | 7414 |
| `rEinsatzCenterDraftBanner` | function | 6927 |
| `rEinsatzCenterDraftMark` | function | 6913 |
| `rEinsatzCenterDraftStatsHint` | function | 6917 |
| `rEinsatzCenterEditPage` | function | 7514 |
| `rEinsatzCenterGameCard` | function | 6718 |
| `rEinsatzCenterGameEditor` | function | 7461 |
| `rEinsatzCenterGroup` | function | 6696 |
| `rEinsatzCenterGroupEditor` | function | 7383 |
| `rEinsatzCenterPage` | function | 6737 |
| `rEinsatzCenterRosterSuggestionCard` | function | 7430 |
| `rEinsatzCenterStats` | function | 6819 |
| `relative01` | function | 5188 |
| `removeComparisonDuo` | window | 13275 |
| `removeComparisonItem` | window | 13187 |
| `removeEinsatzCenterCombo` | window | 7751 |
| `removeEinsatzCenterGroup` | window | 7665 |
| `removeEinsatzCenterGroupPlayer` | window | 7715 |
| `removeEinsatzCenterRosterPlayer` | window | 7596 |
| `removeLineupBuilderPlayerFromLine` | window | 2350 |
| `removeLineupPlayer` | window | 2291 |
| `rEmptyState` | function | 15663 |
| `renameEinsatzCenterGroup` | window | 7687 |
| `render` | function | 21684 |
| `renderComparisonDuoSuggestions` | function | 13228 |
| `renderTags` | function | 8794 |
| `repairRenderedMojibake` | function | 2466 |
| `resetPlayerRegistrySeason` | function | 3720 |
| `resolveAssistPlayer` | function | 2923 |
| `resolveCurrentSeasonKey` | function | 6072 |
| `resolveGoalScorerPlayer` | function | 2860 |
| `resolveLineupPlayerName` | function | 6681 |
| `resolvePlayerRoleView` | function | 9447 |
| `resolveRosterPlayerByRef` | function | 2829 |
| `responseExcerpt` | function | 5910 |
| `responseMomentumAbsSeconds` | function | 10715 |
| `responseMomentumActor` | function | 10744 |
| `responseMomentumConfidence` | function | 10864 |
| `responseMomentumEmptyState` | function | 10869 |
| `responseMomentumGameRows` | function | 10728 |
| `responseMomentumGoalActors` | function | 10755 |
| `responseMomentumPairKey` | function | 10877 |
| `responseMomentumSide` | function | 10735 |
| `responseMomentumTime` | function | 10721 |
| `responseMomentumTooltipFor` | function | 12180 |
| `restoreEinsatzCenterAutosave` | function | 7160 |
| `restoreHallOfFameIntroPrevious` | function | 8522 |
| `resultGoalsAgainstForSide` | function | 4043 |
| `returnToEinsatzCenterEdit` | window | 7582 |
| `rGlobalAllTimeStats` | function | 14550 |
| `rGlobalCareerHeader` | function | 14459 |
| `rGlobalDevelopment` | function | 14568 |
| `rGlobalDnaBars` | function | 14203 |
| `rGlobalDuoNetwork` | function | 14668 |
| `rGlobalOpponentSpecialist` | function | 14867 |
| `rGlobalOverview` | function | 14497 |
| `rGlobalPartnerOpponentPanel` | function | 14445 |
| `rGlobalProfileTags` | function | 12588 |
| `rGlobalSearchPanelHtml` | function | 23173 |
| `rGlobalSearchResultsHtml` | function | 23162 |
| `rGlobalSearchToggle` | function | 23159 |
| `rGoalieAnalysis` | function | 10073 |
| `rGoalieBars` | function | 9730 |
| `rGoalieDnaBars` | function | 9876 |
| `rGoalieFirstGoalResistance` | function | 9913 |
| `rGoalieInsights` | function | 9986 |
| `rGoalieKpis` | function | 9890 |
| `rGoalieMiniMetrics` | function | 9907 |
| `rGoalieMomentum` | function | 9927 |
| `rGoalieOpponents` | function | 10028 |
| `rGoalieOverview` | function | 10008 |
| `rGoaliePhaseProfile` | function | 9969 |
| `rGoaliePhases` | function | 10025 |
| `rGoalieRoleTraits` | function | 9868 |
| `rGoalieStability` | function | 10040 |
| `rGoalieTable` | function | 10065 |
| `rGoalieTierCards` | function | 9941 |
| `rHallDuoTemple` | function | 12650 |
| `rHallGoalieAwardCards` | function | 12841 |
| `rHallGoalieLegends` | function | 12858 |
| `rHallGoalieRankCard` | function | 12809 |
| `rHallOfFameHero` | function | 12601 |
| `rHallOfFamePage` | function | 15246 |
| `rHallPodiumList` | function | 12627 |
| `rHallSGBadge` | function | 12682 |
| `rIaShell` | function | 23065 |
| `rIdentityCards` | function | 8760 |
| `rIdentityTags` | function | 8740 |
| `rInsights` | function | 9253 |
| `rInteractiveDuoCenterPro` | function | 11577 |
| `rKpiCards` | function | 13691 |
| `rKpiExtendedMetrics` | function | 13838 |
| `rKpiInfoCards` | function | 13973 |
| `rKpiMetricCard` | function | 13830 |
| `rKpiMirrorRows` | function | 13716 |
| `rKpiObjectMini` | function | 13966 |
| `rKpiOpponentStrength` | function | 13935 |
| `rKpiRadar` | function | 13787 |
| `rKpiShareBars` | function | 13822 |
| `rKpiTextMetricCard` | function | 13835 |
| `rKpiTrendCompare` | function | 13868 |
| `rKPIVergleich` | function | 14037 |
| `rLexiconPage` | function | 15361 |
| `rLexiconRows` | function | 15357 |
| `rLigaGegnerPlaceholderPage` | function | 22945 |
| `rLineupBuilderAvailablePanel` | function | 20075 |
| `rLineupBuilderPage` | function | 20251 |
| `rLineupComplementCards` | function | 20172 |
| `rLineupMetricPills` | function | 20061 |
| `rLineupRecommendationCards` | function | 20123 |
| `rLineupRecommendationMode` | function | 20138 |
| `rLineupScoreRows` | function | 19957 |
| `rLineupSimpleCards` | function | 19979 |
| `rLineupTestLine` | function | 20185 |
| `rLineupTestMode` | function | 20234 |
| `rMainNav` | function | 22360 |
| `rMainNavBottom` | function | 22382 |
| `rMatchcenterCoachCardList` | function | 19536 |
| `rMatchcenterCoachIfThen` | function | 19550 |
| `rMatchcenterCoachSimpleList` | function | 19558 |
| `rMatchcenterCopyButton` | function | 19628 |
| `rMatchcenterDetailsSection` | function | 16810 |
| `rMatchcenterDigitalCoach` | function | 19563 |
| `rMatchcenterDuoRankCard` | function | 17129 |
| `rMatchcenterDuoRow` | function | 17105 |
| `rMatchcenterDuosTab` | function | 17276 |
| `rMatchcenterDuoWatchCard` | function | 17085 |
| `rMatchcenterFormCard` | function | 16866 |
| `rMatchcenterFormSection` | function | 16784 |
| `rMatchcenterGamesList` | function | 16887 |
| `rMatchcenterGoalieCard` | function | 17338 |
| `rMatchcenterGoalieMatchup` | function | 17362 |
| `rMatchcenterIntelCoachHints` | function | 19522 |
| `rMatchcenterIntelOverview` | function | 19476 |
| `rMatchcenterKpi` | function | 16859 |
| `rMatchcenterLineupBuilder` | function | 19988 |
| `rMatchcenterLockerList` | function | 19633 |
| `rMatchcenterLockerRoomSheet` | function | 19645 |
| `rMatchcenterMatchPlan` | function | 20330 |
| `rMatchcenterOpponentAlarm` | function | 19454 |
| `rMatchcenterOpponentDNA` | function | 19421 |
| `rMatchcenterOpponentDuos` | function | 17233 |
| `rMatchcenterOpponentScouting` | function | 17046 |
| `rMatchcenterPage` | function | 21161 |
| `rMatchcenterPlanItems` | function | 19387 |
| `rMatchcenterPlanWatch` | function | 19405 |
| `rMatchcenterPlayerRow` | function | 16920 |
| `rMatchcenterPlayersTab` | function | 17082 |
| `rMatchcenterProfileSection` | function | 16764 |
| `rMatchcenterRankCard` | function | 16944 |
| `rMatchcenterResponseMomentum` | function | 12302 |
| `rMatchcenterScoutingSummary` | function | 20286 |
| `rMatchcenterSocialBlock` | function | 19701 |
| `rMatchcenterSocialMediaCenter` | function | 19903 |
| `rMatchcenterSpecialCard` | function | 17279 |
| `rMatchcenterSpecialTeams` | function | 17288 |
| `rMatchcenterStoryForm` | function | 20951 |
| `rMatchcenterStoryFrame` | function | 21034 |
| `rMatchcenterStoryLogo` | function | 20946 |
| `rMatchcenterStoryPlayerCard` | function | 20956 |
| `rMatchcenterStoryPreview` | function | 20964 |
| `rMatchcenterTabs` | function | 16761 |
| `rMatchcenterTimeBars` | function | 16688 |
| `rMatchcenterTiming` | function | 16722 |
| `rMatchcenterTimingStatsCard` | function | 16702 |
| `rMatchcenterUlmDuoRankCard` | function | 17184 |
| `rMatchcenterUlmDuoRow` | function | 17161 |
| `rMatchcenterUlmDuos` | function | 17190 |
| `rMatchcenterUlmDuoWatchCard` | function | 17135 |
| `rMatchcenterUlmImpactCard` | function | 16950 |
| `rMatchcenterUlmPlayerRow` | function | 16979 |
| `rMatchcenterUlmRankCard` | function | 17003 |
| `rMatchcenterUlmScouting` | function | 17009 |
| `rMatchcenterWatchCard` | function | 16899 |
| `rMatchdayDetailPage` | function | 22558 |
| `rMatchdayPage` | function | 22598 |
| `rMatchdayTimelinePage` | function | 22547 |
| `rMatchdayTimelineRow` | function | 22539 |
| `rMatrix` | function | 8865 |
| `rmTerm` | function | 12187 |
| `roleGameStableKey` | function | 2732 |
| `roleTraitLabel` | function | 8697 |
| `rOppBreakdown` | function | 9157 |
| `rOpponentIntelBars` | function | 10500 |
| `rOpponentTopScorerTable` | function | 12441 |
| `rosterImpactConfidence` | function | 11815 |
| `rosterImpactConfidenceWeight` | function | 11829 |
| `rosterPlayerMatches` | function | 2636 |
| `rOverviewPage` | function | 22929 |
| `rPdashLabel` | function | 14394 |
| `rPdashStat` | function | 14397 |
| `rPenalties` | function | 9138 |
| `rPhases` | function | 8922 |
| `rPlayerDash` | function | 14400 |
| `rPlayerDashStyles` | function | 14382 |
| `rPlayerExplainItems` | function | 15146 |
| `rPlayerExplanation` | function | 15151 |
| `rPlayerResponseMomentumCard` | function | 12256 |
| `rPlayerRoleSwitch` | function | 9455 |
| `rRadar` | function | 8942 |
| `rRes` | const-arrow | 8685 |
| `rResponseMomentumOverviewCard` | function | 12232 |
| `rResponseRateDisplay` | function | 12196 |
| `rRmKpi` | function | 12203 |
| `rRmTopList` | function | 12221 |
| `rRoleTraitTip` | function | 8704 |
| `rRosterImpactStatLine` | function | 11975 |
| `rRosterStatusBadge` | function | 8713 |
| `rScoreBreakdown` | function | 15677 |
| `rSeasonDataPreviewCard` | function | 6553 |
| `rSeasonDataPreviewContextHint` | function | 22997 |
| `rSeasonDataPreviewRows` | function | 6543 |
| `rSeasonDataPreviewStatus` | function | 6540 |
| `rSeasonDataStateContextHint` | function | 23014 |
| `rSeasonDuoCenterPro` | function | 11633 |
| `rSeasonDuoSummary` | function | 8912 |
| `rSeasonInsightsTab` | function | 9238 |
| `rSeasonLandingPage` | function | 14481 |
| `rSeasonPlayerDashboard` | function | 14439 |
| `rSeasonProfileKpis` | function | 8837 |
| `rSeasonProfileTagStrip` | function | 8858 |
| `rSeasonTrendRows` | function | 14163 |
| `rSocialVideoBlock` | function | 19770 |
| `rSparkline` | function | 12927 |
| `rStyleMetricTip` | function | 8709 |
| `rStyleProfileBars` | function | 8749 |
| `rTable` | function | 9307 |
| `rTeamPage` | function | 21310 |
| `rTeamResponseMomentumCard` | function | 12295 |
| `rTimeline` | function | 9027 |
| `rToolMenu` | function | 23287 |
| `runComparison` | window | 13192 |
| `runDuoComparison` | window | 13280 |
| `saveLastView` | function | 3440 |
| `scoreNarrative` | function | 15618 |
| `seasonApiUrl` | function | 1855 |
| `seasonDataPreviewRerender` | function | 6399 |
| `seasonDataPreviewRow` | function | 6403 |
| `seasonGameApiUrls` | function | 1873 |
| `seasonGameHtmlUrls` | function | 1883 |
| `seasonHasPureUlmTeam` | function | 10150 |
| `seasonKeyToHashSegment` | function | 3139 |
| `seasonPathPrefix` | function | 1867 |
| `seasonRoleKeysForPlayer` | function | 5395 |
| `seasonRoleTraitsFromClassic` | function | 5390 |
| `seasonStatNumber` | function | 10340 |
| `seasonStatSetSize` | function | 10344 |
| `seedHallOfFameIntroParticles` | function | 8489 |
| `selectAllLineupAvailable` | window | 2337 |
| `selectComparisonDuoSuggestion` | window | 13238 |
| `selectComparisonMode` | window | 13199 |
| `selectComparisonPlayer` | window | 13156 |
| `selectDuoProQuick` | window | 11543 |
| `selectEinsatzCenterEditGame` | window | 7584 |
| `selectEnforcerKeys` | function | 5407 |
| `serializeFieldRoleSeasonStats` | function | 3924 |
| `serializeGoalieSeasonStats` | function | 3902 |
| `serializeSeasonStats` | function | 3889 |
| `serializeSpecialTeamsStats` | function | 4104 |
| `setAntiSynergyView` | window | 2383 |
| `setComparisonDuoMode` | window | 13209 |
| `setComparisonDuoPlayer` | window | 13258 |
| `setComparisonDuoSearch` | window | 13211 |
| `setComparisonDuoSeasonKey` | window | 13210 |
| `setComparisonRoleMode` | window | 13162 |
| `setComparisonVariant` | window | 13167 |
| `setContextAsOf` | window | 22975 |
| `setDuoProPickerState` | function | 11512 |
| `setDuoProSelection` | window | 11562 |
| `setEinsatzCenterGameNote` | window | 7758 |
| `setEinsatzCenterGroupPlayerPosition` | window | 7723 |
| `setEinsatzCenterIncludeDraft` | window | 7583 |
| `setEinsatzCenterSeason` | window | 6758 |
| `setGlobalPlayer` | window | 2409 |
| `setGlobalPlayerDuo` | window | 2410 |
| `setGlobalTab` | window | 2411 |
| `setGoalieTab` | window | 2250 |
| `setLineupActiveLine` | window | 2322 |
| `setLineupBuilderMode` | window | 2321 |
| `setLineupBuilderOpponent` | window | 2320 |
| `setLineupBuilderSeason` | window | 2308 |
| `setLineupNewPlayerProfile` | window | 2364 |
| `setMatchcenterContext` | window | 8674 |
| `setMatchcenterOpponent` | window | 8673 |
| `setMatchcenterSeason` | window | 8675 |
| `setMatchcenterTab` | window | 2255 |
| `setP` | window | 2247 |
| `setPage` | window | 2393 |
| `setPlayerRoleView` | window | 2249 |
| `setSeasonDataPreviewOpen` | window | 6589 |
| `setSeasonDataPreviewPasteText` | window | 6590 |
| `setState` | const-arrow | 2235 |
| `setTab` | window | 2248 |
| `showLineupComplements` | window | 2363 |
| `showMainShell` | function | 8281 |
| `socialDuoFocusLine` | function | 18263 |
| `socialEnsurePeriod` | function | 18249 |
| `socialFirstUseful` | function | 18253 |
| `socialKeyFactLine` | function | 18273 |
| `socialOpponentLine` | function | 18269 |
| `socialPlayerFocusLine` | function | 18256 |
| `socialSentence` | function | 18246 |
| `socialVideoJobsForMatchday` | function | 19804 |
| `specialTeamsStateFromActive` | function | 4230 |
| `stageSeasonDataPreview` | function | 6449 |
| `stageSeasonDataPreviewFromFile` | function | 6501 |
| `stageSeasonDataPreviewFromPaste` | function | 6515 |
| `startApp` | window | 8419 |
| `startEinsatzCenterDraftMode` | window | 7564 |
| `startHallOfFameIntro` | function | 8542 |
| `sumRoleGames` | function | 9427 |
| `switchMatchdaySeason` | window | 22469 |
| `switchOverviewSeason` | window | 22416 |
| `syncHashFromState` | function | 3382 |
| `t2s` | const-arrow | 2931 |
| `toggleAntiSynergyHideSgOnly` | window | 2385 |
| `toggleAntiSynergyShowAll` | window | 2384 |
| `toggleComparisonPicker` | window | 13186 |
| `toggleComparisonSgOnly` | window | 13171 |
| `toggleEinsatzCenterComboPlayer` | window | 7732 |
| `toggleEinsatzCenterGroupRename` | window | 7673 |
| `toggleEinsatzCenterRosterSuggestionPlayer` | window | 7604 |
| `toggleHallOfFamePureSGPlayers` | window | 2258 |
| `toggleLineupBuilderAvailable` | window | 2323 |
| `toggleMatchcenterDuoDetails` | window | 2254 |
| `toggleMatchcenterGames` | window | 8676 |
| `toggleMatchcenterPlayerDetails` | window | 2253 |
| `toggleMatchcenterSpecialTeamsGames` | window | 2252 |
| `toggleSgOnlyAlltime` | window | 2412 |
| `toggleSpecialTeamsGameDetails` | window | 2251 |
| `toggleToolMenu` | window | 23316 |
| `toolMenuElements` | function | 23291 |
| `toolMenuItemElements` | function | 23294 |
| `toolMenuOnClick` | function | 23352 |
| `toolMenuOnKeydown` | function | 23328 |
| `toPublicPlayerRegistry` | function | 3928 |
| `uiDatenstandBand` | function | 22168 |
| `uiDeltaIndicator` | function | 21933 |
| `uiFormatNumber` | function | 21905 |
| `uiHinweisKarte` | function | 21997 |
| `uiInfoIcon` | function | 21951 |
| `uiIntervallBalken` | function | 22073 |
| `uiKennzahlKachel` | function | 21963 |
| `uiKernaussage` | function | 21983 |
| `uiMethodenbox` | function | 22092 |
| `uiNotiz` | function | 22109 |
| `uiObjektseite` | function | 22257 |
| `uiObjektseiteSortTabs` | function | 22239 |
| `uiPlatzhalter` | function | 22189 |
| `uiQuoteText` | function | 22145 |
| `uiRangliste` | function | 22019 |
| `uiReliabilityDots` | function | 21918 |
| `uiVerlauf` | function | 22047 |
| `uniqueList` | function | 1870 |
| `updateCoverAllTimeStats` | function | 8308 |
| `updatePlayerRoleAvailability` | function | 4724 |
| `validateGameStructure` | function | 6210 |
| `validateMergedSeason` | function | 6297 |
| `validateSeasonGames` | function | 6251 |
| `validateSeasonKey` | function | 6274 |
| `validateWrapperFormat` | function | 6286 |
| `variance` | function | 2933 |
| `viewEinsatzCenterMergedView` | window | 7581 |
| `warnEventProcessingOnce` | function | 2628 |
| `withoutHashSync` | function | 3399 |

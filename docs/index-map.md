# Code-Karte: index.html

<!-- index-map: source-sha256=040c20c1c5613f149a2d5f055919066b03455c4001c22d079b3c55bfb469dc63 source-lines=23465 -->

Automatisch erzeugt von `scripts/build-index-map.mjs`. Nicht von Hand bearbeiten — bei Änderungen an index.html erneut ausführen: `node scripts/build-index-map.mjs --write`. Vor gezieltem Lesen prüfen, ob die Karte noch aktuell ist: `node scripts/build-index-map.mjs --check`.

index.html: 23465 Zeilen gesamt (SHA-256 `040c20c1c5613f149a2d5f055919066b03455c4001c22d079b3c55bfb469dc63`). Statischer `<style>`-Block: Zeile 11–1550. Haupt-`<script>`-Block: Zeile 1664–23461.

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
| `processGame` | function | 2942–3006 | 65 |
| `parseAppHash` | function | 3256–3287 | 32 |
| `applyAppHash` | function | 3494–3524 | 31 |
| `getOrCreatePlayerProfile` | function | 3748–3780 | 33 |
| `toPublicPlayerRegistry` | function | 3935–3964 | 30 |
| `aggregateAllTimePlayers` | function | 3966–3999 | 34 |
| `emptySpecialTeamsStats` | function | 4062–4102 | 41 |
| `mergeSpecialTeamsStats` | function | 4116–4145 | 30 |
| `buildSpecialTeamsForGame` | function | 4261–4457 | 197 |
| `addGoalieGameToStats` | function | 4517–4567 | 51 |
| `buildGoalieGameRecord` | function | 4569–4620 | 52 |
| `buildGoalieStatsForSeason` | function | 4622–4701 | 80 |
| `aggregateGoalieAlltimeStats` | function | 4703–4737 | 35 |
| `getAssistDiagnostics` | function | 4764–4816 | 53 |
| `buildPlayerEvents` | function | 4946–5033 | 88 |
| `computeMetrics` | function | 5053–5185 | 133 |
| `buildSoloDuoProfile` | function | 5207–5250 | 44 |
| `identityInputs` | function | 5341–5398 | 58 |
| `buildIdentityProfiles` | function | 5442–5673 | 232 |
| `assignStatus` | function | 5720–5905 | 186 |
| `fetchTextWithDiagnostics` | function | 5940–5969 | 30 |
| `fetchSeasonGameRaw` | function | 6005–6044 | 40 |
| `validateGameStructure` | function | 6232–6271 | 40 |
| `buildDryRunReport` | function | 6338–6400 | 63 |
| `stageSeasonDataPreview` | function | 6471–6522 | 52 |
| `rSeasonDataPreviewCard` | function | 6575–6610 | 36 |
| `computeEinsatzCenterStats` | function | 6804–6834 | 31 |
| `rEinsatzCenterStats` | function | 6841–6859 | 19 |
| `einsatzCenterDeserializeAutosave` | function | 7062–7095 | 34 |
| `rEinsatzCenterGroupEditor` | function | 7405–7435 | 31 |
| `rEinsatzCenterRosterSuggestionCard` | function | 7452–7482 | 31 |
| `rEinsatzCenterGameEditor` | function | 7483–7535 | 53 |
| `rEinsatzCenterEditPage` | function | 7536–7583 | 48 |
| `loadSeasonData` | function | 7831–8300 | 470 |
| `loadSeasonForGlobal` | function | 8340–8370 | 31 |
| `loadSeason` | function | 8388–8439 | 52 |
| `ensureHallOfFameIntroOverlay` | function | 8467–8499 | 33 |
| `rMatrix` | function | 8887–8931 | 45 |
| `rRadar` | function | 8964–9011 | 48 |
| `rClutch` | function | 9014–9046 | 33 |
| `rTimeline` | function | 9049–9157 | 109 |
| `rOppBreakdown` | function | 9179–9211 | 33 |
| `generatePlayerInsights` | function | 9214–9257 | 44 |
| `rInsights` | function | 9275–9326 | 52 |
| `buildGoalieAnalysisModel` | function | 9593–9751 | 159 |
| `buildGoalieRoleProfile` | function | 9819–9892 | 74 |
| `rGoalieInsights` | function | 10011–10032 | 22 |
| `rGoalieStability` | function | 10065–10093 | 29 |
| `buildOpponentIntelligence` | function | 10474–10527 | 54 |
| `buildBestThirdManOptions` | function | 10677–10710 | 34 |
| `getDuoDirectScorerGameCounts` | function | 10711–10742 | 32 |
| `buildAnnotatedGoalEventsForGame` | function | 10792–10905 | 114 |
| `buildResponseGoalStatsRaw` | function | 10948–10996 | 49 |
| `buildMomentumSwingStatsRaw` | function | 11009–11079 | 71 |
| `buildDuoFloorCeiling` | function | 11086–11127 | 42 |
| `buildDuoWithWithoutImpact` | function | 11223–11256 | 34 |
| `buildDuoCompatibility` | function | 11322–11344 | 23 |
| `buildDuoProAnalysis` | function | 11381–11424 | 44 |
| `rDuoCenterPro` | function | 11425–11544 | 120 |
| `rInteractiveDuoCenterPro` | function | 11619–11674 | 56 |
| `getDifficultConnectionRowsForPlayer` | function | 11678–11722 | 45 |
| `getRosterImpactPlayerGames` | function | 11815–11856 | 42 |
| `buildRosterImpactAnalysis` | function | 11890–11958 | 69 |
| `rDifficultConnectionList` | function | 12035–12059 | 25 |
| `rDifficultConnectionListCompactLegacy` | function | 12060–12101 | 42 |
| `rDifficultConnectionListCompact` | function | 12102–12140 | 39 |
| `rDifficultConnectionsCard` | function | 12141–12177 | 37 |
| `RESPONSE_MOMENTUM_TOOLTIPS` | const-data | 12180–12211 | 32 |
| `rResponseMomentumOverviewCard` | function | 12274–12297 | 24 |
| `rMatchcenterResponseMomentum` | function | 12344–12381 | 38 |
| `getTeamAllTimeRecords` | function | 12383–12423 | 41 |
| `getAllTimeIdentityStandings` | function | 12504–12538 | 35 |
| `buildRecencyWeightedGlobalIdentityProfile` | function | 12540–12587 | 48 |
| `rHallOfFameHero` | function | 12643–12668 | 26 |
| `hallGoalieRowFromStats` | function | 12766–12798 | 33 |
| `rHallGoalieRankCard` | function | 12851–12882 | 32 |
| `rHallGoalieLegends` | function | 12900–12932 | 33 |
| `buildDuoComparison` | function | 13327–13346 | 20 |
| `rDuoCompareSummaryCards` | function | 13352–13382 | 31 |
| `rDuoComparisonPage` | function | 13483–13493 | 11 |
| `buildComparisonExtraMetrics` | function | 13538–13595 | 58 |
| `buildGoalieComparisonDataset` | function | 13632–13682 | 51 |
| `buildComparisonDataset` | function | 13683–13718 | 36 |
| `rKpiMirrorRows` | function | 13758–13817 | 60 |
| `rKpiRadar` | function | 13829–13863 | 35 |
| `rKpiTrendCompare` | function | 13910–13976 | 67 |
| `rKpiOpponentStrength` | function | 13977–14004 | 28 |
| `rKpiInfoCards` | function | 14015–14046 | 32 |
| `buildComparisonSummary` | function | 14047–14078 | 32 |
| `rComparisonStyles` | function | 14116–14153 | 38 |
| `rComparisonCenterPage` | function | 14154–14204 | 51 |
| `rGlobalDnaBars` | function | 14245–14274 | 30 |
| `buildSeasonPlayerDashModel` | function | 14344–14380 | 37 |
| `buildAlltimePlayerDashModel` | function | 14381–14423 | 43 |
| `rPlayerDashStyles` | function | 14424–14435 | 12 |
| `rPlayerDash` | function | 14442–14480 | 39 |
| `rGlobalOverview` | function | 14539–14590 | 52 |
| `rGlobalDevelopment` | function | 14610–14648 | 39 |
| `rGlobalDuoNetwork` | function | 14710–14907 | 198 |
| `rGlobalOpponentSpecialist` | function | 14909–14954 | 46 |
| `buildFieldPlayerExplanation` | function | 15020–15094 | 75 |
| `buildGoaliePlayerExplanation` | function | 15095–15148 | 54 |
| `buildPlayerIntelligence` | function | 15158–15187 | 30 |
| `rPlayerExplanation` | function | 15193–15244 | 52 |
| `rAllTimePlayersPage` | function | 15246–15286 | 41 |
| `rHallOfFamePage` | function | 15288–15376 | 89 |
| `rLexiconPage` | function | 15403–15575 | 173 |
| `buildConfidence` | function | 15592–15637 | 46 |
| `getMatchcenterOpponents` | function | 15801–15833 | 33 |
| `getMatchcenterDirectOpponents` | function | 15834–15864 | 31 |
| `matchcenterAnalyzeDirect` | function | 15867–15903 | 37 |
| `matchcenterEnsureUlmPlayer` | function | 15952–15989 | 38 |
| `matchcenterAddUlmScoring` | function | 16014–16054 | 41 |
| `matchcenterFinalizeUlmPlayers` | function | 16055–16123 | 69 |
| `matchcenterBuildUlmPlayerScouting` | function | 16124–16178 | 55 |
| `matchcenterEnsureOpponentDuo` | function | 16196–16228 | 33 |
| `matchcenterFinalizeOpponentDuos` | function | 16255–16289 | 35 |
| `matchcenterBuildOpponentDuos` | function | 16290–16334 | 45 |
| `matchcenterEnsureUlmDuo` | function | 16349–16386 | 38 |
| `matchcenterFinalizeUlmDuos` | function | 16406–16441 | 36 |
| `matchcenterBuildUlmDuos` | function | 16442–16484 | 43 |
| `matchcenterBuildSpecialTeamsMatchup` | function | 16518–16565 | 48 |
| `matchcenterBuildGoalieMatchup` | function | 16588–16633 | 46 |
| `matchcenterTimingStatsForGames` | function | 16665–16702 | 38 |
| `rMatchcenterUlmScouting` | function | 17046–17082 | 37 |
| `rMatchcenterOpponentScouting` | function | 17083–17118 | 36 |
| `rMatchcenterUlmDuos` | function | 17227–17269 | 43 |
| `rMatchcenterOpponentDuos` | function | 17270–17312 | 43 |
| `rMatchcenterSpecialTeams` | function | 17325–17374 | 50 |
| `matchcenterBuildPlanConfidence` | function | 17465–17512 | 48 |
| `matchcenterBuildIntelligenceDataQuality` | function | 17561–17630 | 70 |
| `matchcenterBuildOpponentDNA` | function | 17631–17743 | 113 |
| `matchcenterBuildOpponentAlarm` | function | 17810–17919 | 110 |
| `matchcenterBuildIntelligenceSignals` | function | 17966–18012 | 47 |
| `buildMatchIntelligenceFromContext` | function | 18013–18067 | 55 |
| `buildMatchStories` | function | 18116–18145 | 30 |
| `buildDigitalCoachReport` | function | 18216–18248 | 33 |
| `buildMatchdayCaptionBlocks` | function | 18320–18349 | 30 |
| `buildSocialMediaContent` | function | 18350–18398 | 49 |
| `lineupRosterGamesForPlayer` | function | 18466–18513 | 48 |
| `buildLineupExperienceProfile` | function | 18514–18556 | 43 |
| `buildLineupOpponentDNAFit` | function | 18569–18612 | 44 |
| `classifyLineIdentity` | function | 18613–18660 | 48 |
| `lineupPlayerProfile` | function | 18661–18736 | 76 |
| `buildLineupAnalysis` | function | 18737–18870 | 134 |
| `buildLineupScoreBreakdowns` | function | 18871–18900 | 30 |
| `lineupEvaluateComplementCandidate` | function | 18984–19062 | 79 |
| `buildTeamLineBalance` | function | 19088–19131 | 44 |
| `buildLineupRecommendations` | function | 19168–19249 | 82 |
| `matchcenterBuildMatchPlan` | function | 19278–19423 | 146 |
| `rMatchcenterOpponentDNA` | function | 19458–19490 | 33 |
| `rMatchcenterIntelOverview` | function | 19513–19558 | 46 |
| `rMatchcenterDigitalCoach` | function | 19600–19664 | 65 |
| `rMatchcenterLockerRoomSheet` | function | 19682–19737 | 56 |
| `downloadMatchdayStory` | window | 19756–19803 | 48 |
| `rSocialVideoBlock` | function | 19807–19838 | 32 |
| `generateSocialVideoVideos` | window | 19848–19889 | 42 |
| `rMatchcenterSocialMediaCenter` | function | 19940–19993 | 54 |
| `rMatchcenterLineupBuilder` | function | 20025–20097 | 73 |
| `rLineupBuilderAvailablePanel` | function | 20112–20159 | 48 |
| `rLineupRecommendationMode` | function | 20175–20208 | 34 |
| `rLineupTestLine` | function | 20222–20270 | 49 |
| `rLineupBuilderPage` | function | 20288–20322 | 35 |
| `rMatchcenterScoutingSummary` | function | 20323–20366 | 44 |
| `getTeamLogoUrlForStory` | function | 20411–20440 | 30 |
| `matchcenterStoryPickFactItems` | function | 20563–20615 | 53 |
| `buildMatchcenterStoryPreviewData` | function | 20834–20945 | 112 |
| `matchcenterStoryVisibleFacts` | function | 20952–20982 | 31 |
| `rMatchcenterStoryPreview` | function | 21001–21070 | 70 |
| `fitMatchcenterStoryLayout` | function | 21077–21119 | 43 |
| `rMatchcenterPage` | function | 21198–21346 | 149 |
| `rTeamPage` | function | 21347–21685 | 339 |
| `exportExcel` | function | 21690–21715 | 26 |
| `_render` | function | 21739–21908 | 170 |
| `uiObjektseite` | function | 22294–22327 | 34 |
| `rMatchdayDetailPage` | function | 22595–22634 | 40 |
| `buildOverviewCards` | function | 22916–22956 | 41 |

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

1040 `function`-Deklarationen, 134 `window.`-Funktionszuweisungen, 4 `const`-Pfeilfunktionen — alle Top-Level, sortiert nach Zeile.

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
| `processGame` | function | 2942–3006 | 65 |
| `isGamePlayed` | function | 3008–3010 | 3 |
| `deriveAsOfForSeason` | function | 3041–3044 | 4 |
| `seasonKeyToHashSegment` | function | 3146–3148 | 3 |
| `hashSegmentToSeasonKey` | function | 3149–3152 | 4 |
| `isValidAsOfDate` | function | 3153–3155 | 3 |
| `isValidAsOfStartTime` | function | 3156–3158 | 3 |
| `asOfEquals` | function | 3165–3172 | 8 |
| `decodeHashSegmentSafe` | function | 3236–3238 | 3 |
| `parseAppHash` | function | 3256–3287 | 32 |
| `parseAsOfQueryValue` | function | 3295–3305 | 11 |
| `buildAppHash` | function | 3311–3323 | 13 |
| `buildGlobalPageHash` | function | 3328–3337 | 10 |
| `buildHashStringFromParsed` | function | 3343–3347 | 5 |
| `computeCurrentAppHash` | function | 3363–3375 | 13 |
| `syncHashFromState` | function | 3389–3399 | 11 |
| `withoutHashSync` | function | 3406–3414 | 9 |
| `parseLastViewState` | function | 3430–3441 | 12 |
| `getStoredLastView` | function | 3442–3445 | 4 |
| `saveLastView` | function | 3447–3449 | 3 |
| `applyGlobalPageFromHash` | function | 3461–3481 | 21 |
| `applyAppHash` | function | 3494–3524 | 31 |
| `initHashRouting` | function | 3573–3591 | 19 |
| `gameResult` | function | 3594–3600 | 7 |
| `getOppStrength` | function | 3607–3624 | 18 |
| `createPlayerAnalysisProfile` | function | 3636–3638 | 3 |
| `emptyPlayerSeasonStats` | function | 3640–3645 | 6 |
| `emptyGoalieSeasonStats` | function | 3646–3667 | 22 |
| `emptyGoalieAlltimeStats` | function | 3668–3682 | 15 |
| `emptyGoalieSpecialTeamsStats` | function | 3683–3694 | 12 |
| `emptyFieldRoleSeasonStats` | function | 3695–3697 | 3 |
| `addUnique` | function | 3699–3701 | 3 |
| `incrementUniqueCounter` | function | 3703–3708 | 6 |
| `buildPlayerIdentity` | function | 3710–3725 | 16 |
| `resetPlayerRegistrySeason` | function | 3727–3737 | 11 |
| `derivePlayerStatus` | function | 3739–3746 | 8 |
| `getOrCreatePlayerProfile` | function | 3748–3780 | 33 |
| `registerPlayerIdentity` | function | 3782–3798 | 17 |
| `ensureGoalieSeasonStats` | function | 3800–3804 | 5 |
| `ensureFieldRoleSeasonStats` | function | 3805–3809 | 5 |
| `markFieldRoleAppearance` | function | 3810–3813 | 4 |
| `registerSeasonRosters` | function | 3815–3833 | 19 |
| `linkUiPlayersToRegistry` | function | 3835–3855 | 21 |
| `applySeasonScoringToRegistry` | function | 3857–3878 | 22 |
| `finalizePlayerRegistrySeason` | function | 3880–3894 | 15 |
| `serializeSeasonStats` | function | 3896–3908 | 13 |
| `serializeGoalieSeasonStats` | function | 3909–3930 | 22 |
| `serializeFieldRoleSeasonStats` | function | 3931–3933 | 3 |
| `toPublicPlayerRegistry` | function | 3935–3964 | 30 |
| `aggregateAllTimePlayers` | function | 3966–3999 | 34 |
| `finiteNumbers` | function | 4001–4003 | 3 |
| `avgOrNull` | function | 4004–4007 | 4 |
| `medianOrNull` | function | 4008–4013 | 6 |
| `incGoalieBucket` | function | 4014–4017 | 4 |
| `goalieEventAbsSeconds` | function | 4023–4025 | 3 |
| `goalieGameDurationSeconds` | function | 4026–4030 | 5 |
| `goalieGameStateBeforeGoal` | function | 4031–4042 | 12 |
| `getGoalieOpponentName` | function | 4043–4046 | 4 |
| `getGoalieOpponentTier` | function | 4047–4051 | 5 |
| `resultGoalsAgainstForSide` | function | 4052–4061 | 10 |
| `emptySpecialTeamsStats` | function | 4062–4102 | 41 |
| `clonePlain` | function | 4103–4105 | 3 |
| `finalizeSpecialTeamsStats` | function | 4106–4112 | 7 |
| `serializeSpecialTeamsStats` | function | 4113–4115 | 3 |
| `mergeSpecialTeamsStats` | function | 4116–4145 | 30 |
| `penaltyRawText` | function | 4148–4150 | 3 |
| `isMatchPenaltyEvent` | function | 4151–4154 | 4 |
| `isTwoPlusTwoPenaltyEvent` | function | 4155–4158 | 4 |
| `getPenaltyDisciplineType` | function | 4159–4166 | 8 |
| `getGameDurationMinutes` | function | 4167–4171 | 5 |
| `gameDaySortValue` | function | 4172–4179 | 8 |
| `isSameUlmTeamContext` | function | 4180–4187 | 8 |
| `getFurtherSameDayUlmGames` | function | 4188–4199 | 12 |
| `getPenaltySpecialTeamsMinutes` | function | 4200–4202 | 3 |
| `getPenaltyBasePersonalMinutes` | function | 4203–4210 | 8 |
| `getPenaltyPersonalMinutes` | function | 4211–4220 | 10 |
| `getPenaltyDisciplineMinutes` | function | 4221–4223 | 3 |
| `getSpecialTeamsPenaltyChunks` | function | 4224–4233 | 10 |
| `isPenaltyGoalEvent` | function | 4234–4238 | 5 |
| `specialTeamsStateFromActive` | function | 4239–4245 | 7 |
| `annotateSpecialTeamsGoalEvent` | function | 4246–4260 | 15 |
| `buildSpecialTeamsForGame` | function | 4261–4457 | 197 |
| `buildSpecialTeamsForSeason` | function | 4458–4466 | 9 |
| `aggregateAlltimeSpecialTeams` | function | 4467–4474 | 8 |
| `mergeGoalieSpecialTeamsStats` | function | 4475–4486 | 12 |
| `addGoalieSpecialTeamsGameToStats` | function | 4487–4501 | 15 |
| `finalizeGoalieSeasonStats` | function | 4502–4516 | 15 |
| `addGoalieGameToStats` | function | 4517–4567 | 51 |
| `buildGoalieGameRecord` | function | 4569–4620 | 52 |
| `buildGoalieStatsForSeason` | function | 4622–4701 | 80 |
| `aggregateGoalieAlltimeStats` | function | 4703–4737 | 35 |
| `updatePlayerRoleAvailability` | function | 4739–4748 | 10 |
| `getGoalieDiagnostics` | function | 4750–4755 | 6 |
| `getSpecialTeamsDiagnostics` | function | 4757–4762 | 6 |
| `getAssistDiagnostics` | function | 4764–4816 | 53 |
| `buildSeasonDuos` | function | 4819–4845 | 27 |
| `mergeDuoSet` | function | 4846–4862 | 17 |
| `aggregateAllTimeDuos` | function | 4863–4873 | 11 |
| `aggregateSeasonStats` | function | 4875–4890 | 16 |
| `buildPlayerDataFoundation` | function | 4892–4913 | 22 |
| `buildRegistry` | function | 4915–4941 | 27 |
| `buildPlayerEvents` | function | 4946–5033 | 88 |
| `getPhaseIndex` | function | 5038–5048 | 11 |
| `computeMetrics` | function | 5053–5185 | 133 |
| `detectTypes` | function | 5187–5202 | 16 |
| `pct` | function | 5204–5204 | 1 |
| `ratio01` | function | 5205–5205 | 1 |
| `relative01` | function | 5206–5206 | 1 |
| `buildSoloDuoProfile` | function | 5207–5250 | 44 |
| `identityPartnerStats` | function | 5251–5264 | 14 |
| `identityOpponentGroups` | function | 5265–5272 | 8 |
| `eventMatchesTeams` | function | 5273–5278 | 6 |
| `clutchText` | function | 5279–5279 | 1 |
| `isImportantClutchGoal` | function | 5280–5284 | 5 |
| `isDecisiveGoal` | function | 5285–5287 | 3 |
| `isLateGoal` | function | 5293–5298 | 6 |
| `isComebackRelevantGoal` | function | 5299–5302 | 4 |
| `identityPointsVsTeams` | function | 5303–5305 | 3 |
| `identityGoalsVsTeams` | function | 5306–5308 | 3 |
| `identityClutchGoalsVsTeams` | function | 5309–5311 | 3 |
| `identityDecisiveGoalsVsTeams` | function | 5312–5314 | 3 |
| `identityLateGoalsVsTeams` | function | 5315–5317 | 3 |
| `countMomentumClusters` | function | 5318–5340 | 23 |
| `identityInputs` | function | 5341–5398 | 58 |
| `clearlyAboveAverage` | function | 5399–5399 | 1 |
| `normalizeSecondaryTraits` | function | 5400–5411 | 12 |
| `seasonRoleTraitsFromClassic` | function | 5412–5416 | 5 |
| `seasonRoleKeysForPlayer` | function | 5417–5425 | 9 |
| `hasSeasonRole` | function | 5426–5428 | 3 |
| `selectEnforcerKeys` | function | 5429–5441 | 13 |
| `buildIdentityProfiles` | function | 5442–5673 | 232 |
| `composeIdentityText` | function | 5674–5680 | 7 |
| `countCaptainAppearances` | function | 5682–5694 | 13 |
| `countGoalieAppearances` | function | 5696–5698 | 3 |
| `computeRosterStatus` | function | 5700–5718 | 19 |
| `assignStatus` | function | 5720–5905 | 186 |
| `fetchJsonLegacy` | function | 5911–5930 | 20 |
| `responseExcerpt` | function | 5932–5934 | 3 |
| `diagnosticError` | function | 5935–5939 | 5 |
| `fetchTextWithDiagnostics` | function | 5940–5969 | 30 |
| `fetchJsonWithDiagnostics` | function | 5970–5978 | 9 |
| `fetchJson` | function | 5979–5982 | 4 |
| `formatStatus` | function | 5983–5985 | 3 |
| `formatDiagnosticAttempt` | function | 5986–5998 | 13 |
| `formatGameLoadError` | function | 5999–6004 | 6 |
| `fetchSeasonGameRaw` | function | 6005–6044 | 40 |
| `getStaticSeasonGames` | function | 6048–6051 | 4 |
| `loadSeasonManifest` | function | 6063–6079 | 17 |
| `resolveCurrentSeasonKey` | function | 6094–6113 | 20 |
| `applyCurrentSeasonCoverHighlight` | function | 6114–6118 | 5 |
| `isUsableExternalSeasonData` | function | 6131–6139 | 9 |
| `ensureExternalSeasonData` | function | 6140–6161 | 22 |
| `buildStaticSeasonDataBlock` | function | 6162–6171 | 10 |
| `getGameId` | function | 6198–6202 | 5 |
| `findDuplicateGameIds` | function | 6204–6214 | 11 |
| `validateGameStructure` | function | 6232–6271 | 40 |
| `validateSeasonGames` | function | 6273–6283 | 11 |
| `diffGameIds` | function | 6285–6294 | 10 |
| `validateSeasonKey` | function | 6296–6306 | 11 |
| `validateWrapperFormat` | function | 6308–6317 | 10 |
| `validateMergedSeason` | function | 6319–6336 | 18 |
| `buildDryRunReport` | function | 6338–6400 | 63 |
| `seasonDataPreviewRerender` | function | 6421–6423 | 3 |
| `seasonDataPreviewRow` | function | 6425–6436 | 12 |
| `buildSeasonDataPreviewChanges` | function | 6443–6460 | 18 |
| `stageSeasonDataPreview` | function | 6471–6522 | 52 |
| `stageSeasonDataPreviewFromFile` | function | 6523–6536 | 14 |
| `stageSeasonDataPreviewFromPaste` | function | 6537–6541 | 5 |
| `discardSeasonDataPreview` | function | 6542–6546 | 5 |
| `getSeasonDataPreview` | function | 6548–6550 | 3 |
| `isSeasonDataPreviewStale` | function | 6556–6560 | 5 |
| `rSeasonDataPreviewStatus` | function | 6562–6564 | 3 |
| `rSeasonDataPreviewRows` | function | 6565–6573 | 9 |
| `rSeasonDataPreviewCard` | function | 6575–6610 | 36 |
| `setSeasonDataPreviewOpen` | window | 6611–6611 | 1 |
| `setSeasonDataPreviewPasteText` | window | 6612–6612 | 1 |
| `fileNameForLineupSeasonKey` | function | 6632–6634 | 3 |
| `ensureLineupDataLoaded` | function | 6650–6666 | 17 |
| `ensureLineupGroupsRegistryLoaded` | function | 6675–6691 | 17 |
| `resolveLineupPlayerName` | function | 6703–6706 | 4 |
| `findLineupGameContext` | function | 6709–6716 | 8 |
| `rEinsatzCenterGroup` | function | 6718–6729 | 12 |
| `rEinsatzCenterCombo` | function | 6731–6738 | 8 |
| `rEinsatzCenterGameCard` | function | 6740–6757 | 18 |
| `rEinsatzCenterPage` | function | 6759–6778 | 20 |
| `setEinsatzCenterSeason` | window | 6780–6785 | 6 |
| `openEinsatzCenter` | window | 6786–6793 | 8 |
| `computeEinsatzCenterStats` | function | 6804–6834 | 31 |
| `lineupGroupDisplayName` | function | 6835–6840 | 6 |
| `rEinsatzCenterStats` | function | 6841–6859 | 19 |
| `getEffectiveLineupData` | function | 6917–6924 | 8 |
| `isEinsatzCenterGameFromDraft` | function | 6926–6929 | 4 |
| `einsatzCenterDraftInView` | function | 6931–6934 | 4 |
| `rEinsatzCenterDraftMark` | function | 6935–6938 | 4 |
| `rEinsatzCenterDraftStatsHint` | function | 6939–6943 | 5 |
| `einsatzCenterDraftStaleHint` | function | 6945–6947 | 3 |
| `rEinsatzCenterDraftBanner` | function | 6949–6956 | 8 |
| `ensureEinsatzCenterDraft` | function | 6967–6980 | 14 |
| `getEinsatzCenterGameDraft` | function | 6989–7000 | 12 |
| `einsatzCenterAutosaveKey` | function | 7027–7027 | 1 |
| `einsatzCenterStorageRead` | function | 7028–7030 | 3 |
| `einsatzCenterStorageWrite` | function | 7031–7033 | 3 |
| `einsatzCenterStorageRemove` | function | 7034–7036 | 3 |
| `einsatzCenterDraftIsEmpty` | function | 7039–7041 | 3 |
| `einsatzCenterSerializeDraft` | function | 7043–7055 | 13 |
| `einsatzCenterIsPlainObject` | function | 7056–7056 | 1 |
| `einsatzCenterDeserializeAutosave` | function | 7062–7095 | 34 |
| `einsatzCenterCurrentRawBaseHash` | function | 7102–7107 | 6 |
| `einsatzCenterAutosaveDraft` | function | 7116–7143 | 28 |
| `einsatzCenterInspectAutosave` | function | 7151–7179 | 29 |
| `restoreEinsatzCenterAutosave` | function | 7182–7198 | 17 |
| `discardEinsatzCenterAutosave` | function | 7200–7205 | 6 |
| `rEinsatzCenterAutosaveBanner` | function | 7208–7220 | 13 |
| `einsatzCenterAutosaveInfoText` | function | 7222–7232 | 11 |
| `loadEinsatzCenterMismatchedAutosave` | function | 7246–7264 | 19 |
| `deriveLineupValidPlayerIds` | function | 7277–7293 | 17 |
| `deriveLineupUlmPlayerIds` | function | 7301–7317 | 17 |
| `getSeasonmanagerRosterSuggestion` | function | 7331–7351 | 21 |
| `einsatzCenterCanonicalJson` | function | 7360–7369 | 10 |
| `einsatzCenterSha256Hex` | function | 7370–7374 | 5 |
| `einsatzCenterComputeBaseHash` | function | 7375–7377 | 3 |
| `einsatzCenterSoftIssues` | function | 7384–7402 | 19 |
| `rEinsatzCenterGroupEditor` | function | 7405–7435 | 31 |
| `rEinsatzCenterComboEditor` | function | 7436–7442 | 7 |
| `rEinsatzCenterRosterSuggestionCard` | function | 7452–7482 | 31 |
| `rEinsatzCenterGameEditor` | function | 7483–7535 | 53 |
| `rEinsatzCenterEditPage` | function | 7536–7583 | 48 |
| `startEinsatzCenterDraftMode` | window | 7586–7590 | 5 |
| `cancelEinsatzCenterEdit` | window | 7591–7601 | 11 |
| `viewEinsatzCenterMergedView` | window | 7603–7603 | 1 |
| `returnToEinsatzCenterEdit` | window | 7604–7604 | 1 |
| `setEinsatzCenterIncludeDraft` | window | 7605–7605 | 1 |
| `selectEinsatzCenterEditGame` | window | 7606–7609 | 4 |
| `addEinsatzCenterRosterPlayer` | window | 7610–7617 | 8 |
| `removeEinsatzCenterRosterPlayer` | window | 7618–7625 | 8 |
| `toggleEinsatzCenterRosterSuggestionPlayer` | window | 7626–7632 | 7 |
| `dismissEinsatzCenterRosterSuggestion` | window | 7633–7636 | 4 |
| `acceptEinsatzCenterRosterSuggestion` | window | 7644–7660 | 17 |
| `addEinsatzCenterExistingGroup` | window | 7661–7669 | 9 |
| `addEinsatzCenterNewGroup` | window | 7670–7686 | 17 |
| `removeEinsatzCenterGroup` | window | 7687–7694 | 8 |
| `toggleEinsatzCenterGroupRename` | window | 7695–7697 | 3 |
| `renameEinsatzCenterGroup` | window | 7709–7728 | 20 |
| `addEinsatzCenterGroupPlayer` | window | 7729–7736 | 8 |
| `removeEinsatzCenterGroupPlayer` | window | 7737–7744 | 8 |
| `setEinsatzCenterGroupPlayerPosition` | window | 7745–7753 | 9 |
| `toggleEinsatzCenterComboPlayer` | window | 7754–7761 | 8 |
| `confirmEinsatzCenterCombo` | window | 7762–7772 | 11 |
| `removeEinsatzCenterCombo` | window | 7773–7779 | 7 |
| `setEinsatzCenterGameNote` | window | 7780–7786 | 7 |
| `buildEinsatzCenterDraftExport` | function | 7790–7803 | 14 |
| `exportEinsatzCenterDraft` | window | 7804–7816 | 13 |
| `loadSeasonData` | function | 7831–8300 | 470 |
| `showMainShell` | function | 8303–8307 | 5 |
| `hasSeasonSource` | function | 8308–8311 | 4 |
| `hasEmbeddedSeasonData` | function | 8312–8314 | 3 |
| `getGlobalLoadableSeasonKeys` | function | 8315–8321 | 7 |
| `getAllTimeCoverStats` | function | 8322–8329 | 8 |
| `updateCoverAllTimeStats` | function | 8330–8338 | 9 |
| `loadSeasonForGlobal` | function | 8340–8370 | 31 |
| `ensureGlobalDataLoaded` | function | 8371–8386 | 16 |
| `loadSeason` | function | 8388–8439 | 52 |
| `startApp` | window | 8441–8452 | 12 |
| `ensureAppLoaded` | function | 8443–8452 | 10 |
| `openSeason` | window | 8453–8455 | 3 |
| `openAllTimePlayers` | window | 8456–8461 | 6 |
| `hofIntroDelay` | function | 8464–8466 | 3 |
| `ensureHallOfFameIntroOverlay` | function | 8467–8499 | 33 |
| `buildHallOfFameIntroTitle` | function | 8500–8510 | 11 |
| `seedHallOfFameIntroParticles` | function | 8511–8528 | 18 |
| `cleanupHallOfFameIntro` | function | 8529–8543 | 15 |
| `restoreHallOfFameIntroPrevious` | function | 8544–8555 | 12 |
| `finishHallOfFameIntro` | function | 8556–8563 | 8 |
| `startHallOfFameIntro` | function | 8564–8588 | 25 |
| `cancelHallOfFameIntro` | function | 8589–8600 | 12 |
| `openHallOfFame` | window | 8602–8625 | 24 |
| `openComparisonCenter` | window | 8626–8654 | 29 |
| `openMatchcenter` | window | 8655–8676 | 22 |
| `openLineupBuilder` | window | 8677–8694 | 18 |
| `setMatchcenterOpponent` | window | 8695–8695 | 1 |
| `setMatchcenterContext` | window | 8696–8696 | 1 |
| `setMatchcenterSeason` | window | 8697–8697 | 1 |
| `toggleMatchcenterGames` | window | 8698–8698 | 1 |
| `openLexicon` | window | 8699–8702 | 4 |
| `rRes` | const-arrow | 8707–8707 | 1 |
| `rClutchBadge` | function | 8708–8715 | 8 |
| `escAttr` | function | 8716–8718 | 3 |
| `roleTraitLabel` | function | 8719–8721 | 3 |
| `isVisibleSecondaryTrait` | function | 8722–8725 | 4 |
| `rRoleTraitTip` | function | 8726–8730 | 5 |
| `rStyleMetricTip` | function | 8731–8734 | 4 |
| `rRosterStatusBadge` | function | 8735–8742 | 8 |
| `classicTagLabel` | function | 8743–8745 | 3 |
| `rClassicTagTip` | function | 8746–8750 | 5 |
| `fallbackIdentityProfile` | function | 8751–8761 | 11 |
| `rIdentityTags` | function | 8762–8770 | 9 |
| `rStyleProfileBars` | function | 8771–8781 | 11 |
| `rIdentityCards` | function | 8782–8807 | 26 |
| `rClassicRoleTags` | function | 8808–8815 | 8 |
| `renderTags` | function | 8816–8818 | 3 |
| `getSeasonPlayerFieldBasis` | function | 8820–8846 | 27 |
| `getSeasonScopedIdentityProfile` | function | 8847–8858 | 12 |
| `rSeasonProfileKpis` | function | 8859–8878 | 20 |
| `rSeasonProfileTagStrip` | function | 8880–8884 | 5 |
| `rMatrix` | function | 8887–8931 | 45 |
| `rSeasonDuoSummary` | function | 8934–8942 | 9 |
| `rPhases` | function | 8944–8961 | 18 |
| `rRadar` | function | 8964–9011 | 48 |
| `rClutch` | function | 9014–9046 | 33 |
| `rTimeline` | function | 9049–9157 | 109 |
| `rPenalties` | function | 9160–9176 | 17 |
| `rOppBreakdown` | function | 9179–9211 | 33 |
| `generatePlayerInsights` | function | 9214–9257 | 44 |
| `rSeasonInsightsTab` | function | 9260–9273 | 14 |
| `rInsights` | function | 9275–9326 | 52 |
| `rTable` | function | 9329–9349 | 21 |
| `findLoadedSeasonPlayer` | function | 9352–9360 | 9 |
| `getAllTimePlayerRows` | function | 9361–9376 | 16 |
| `isSgOnlyAlltimePlayer` | function | 9377–9384 | 8 |
| `isPureSGPlayer` | function | 9385–9388 | 4 |
| `filterPureSGPlayers` | function | 9389–9392 | 4 |
| `getAllTimeMainPlayerRows` | function | 9393–9395 | 3 |
| `getAllTimeSgOnlyRows` | function | 9396–9398 | 3 |
| `getPlayerSeasonStats` | function | 9399–9403 | 5 |
| `getPlayerAlltimeStats` | function | 9404–9411 | 8 |
| `getPlayerRegistryProfile` | function | 9412–9419 | 8 |
| `getPlayerGoalieSeasonStats` | function | 9420–9424 | 5 |
| `getPlayerGoalieAlltimeStats` | function | 9425–9448 | 24 |
| `sumRoleGames` | function | 9449–9454 | 6 |
| `getPlayerRoleAvailability` | function | 9455–9468 | 14 |
| `resolvePlayerRoleView` | function | 9469–9476 | 8 |
| `rPlayerRoleSwitch` | function | 9477–9483 | 7 |
| `goalieNum` | function | 9484–9489 | 6 |
| `goalieTime` | function | 9490–9497 | 8 |
| `goalieBucketRows` | function | 9498–9503 | 6 |
| `goalieTopRow` | function | 9504–9506 | 3 |
| `goalieTierMeta` | function | 9507–9515 | 9 |
| `goalieStdDev` | function | 9516–9521 | 6 |
| `goalieDetailFirstTime` | function | 9522–9528 | 7 |
| `goalieEventSecondInPeriod` | function | 9529–9534 | 6 |
| `goaliePctText` | function | 9535–9538 | 4 |
| `goalieSafeNum` | function | 9539–9542 | 4 |
| `goalieClampScore` | function | 9543–9546 | 4 |
| `goalieInverseScore` | function | 9547–9554 | 8 |
| `goaliePositiveScore` | function | 9555–9562 | 8 |
| `goaliePositiveCurveScore` | function | 9563–9571 | 9 |
| `goalieWeightedScore` | function | 9572–9577 | 6 |
| `goalieApplySampleConfidence` | function | 9578–9585 | 8 |
| `goalieBucketLooseSum` | function | 9586–9592 | 7 |
| `buildGoalieAnalysisModel` | function | 9593–9751 | 159 |
| `rGoalieBars` | function | 9752–9764 | 13 |
| `goalieDnaKey` | function | 9806–9810 | 5 |
| `goalieDnaValue` | function | 9811–9817 | 7 |
| `goalieStateGoals` | function | 9818–9818 | 1 |
| `buildGoalieRoleProfile` | function | 9819–9892 | 74 |
| `rGoalieRoleTraits` | function | 9893–9896 | 4 |
| `getGoalieDnaRows` | function | 9897–9900 | 4 |
| `rGoalieDnaBars` | function | 9901–9914 | 14 |
| `rGoalieKpis` | function | 9915–9931 | 17 |
| `rGoalieMiniMetrics` | function | 9932–9937 | 6 |
| `rGoalieFirstGoalResistance` | function | 9938–9951 | 14 |
| `rGoalieMomentum` | function | 9952–9965 | 14 |
| `rGoalieTierCards` | function | 9966–9993 | 28 |
| `rGoaliePhaseProfile` | function | 9994–10010 | 17 |
| `rGoalieInsights` | function | 10011–10032 | 22 |
| `rGoalieOverview` | function | 10033–10049 | 17 |
| `rGoaliePhases` | function | 10050–10052 | 3 |
| `rGoalieOpponents` | function | 10053–10064 | 12 |
| `rGoalieStability` | function | 10065–10093 | 29 |
| `rGoalieTable` | function | 10094–10101 | 8 |
| `rGoalieAnalysis` | function | 10102–10127 | 26 |
| `getPreviousSeasonKey` | function | 10129–10133 | 5 |
| `playerAppearedInSeasonByName` | function | 10134–10144 | 11 |
| `playerAppearedForUlmStatusInSeasonByName` | function | 10145–10163 | 19 |
| `isRookieCandidateForSeason` | function | 10164–10173 | 10 |
| `getLoadedSeasonPointsByName` | function | 10174–10178 | 5 |
| `seasonHasPureUlmTeam` | function | 10179–10185 | 7 |
| `isSgOnlyHallOfFameExcluded` | function | 10186–10194 | 9 |
| `isHallOfFameEligiblePlayer` | function | 10195–10200 | 6 |
| `getHallOfFamePlayerRows` | function | 10201–10203 | 3 |
| `getHallOfFamePlayerIdSet` | function | 10204–10206 | 3 |
| `getGlobalProfileEvents` | function | 10208–10219 | 12 |
| `countBy` | function | 10221–10229 | 9 |
| `getLoadedSeasonPlayerUi` | function | 10230–10234 | 5 |
| `getGlobalPlayerTeamRecord` | function | 10235–10260 | 26 |
| `getGlobalPlayerPeakGame` | function | 10261–10271 | 11 |
| `getGlobalPlayerBestSeason` | function | 10272–10278 | 7 |
| `getAllTimeDuoRowsForPlayer` | function | 10279–10289 | 11 |
| `getCarryPerformanceRows` | function | 10290–10305 | 16 |
| `rCarryPerformanceRows` | function | 10306–10318 | 13 |
| `getAllTimeGamesPlayedRows` | function | 10319–10343 | 25 |
| `getAllTimePenaltyRows` | function | 10344–10359 | 16 |
| `getSeasonUiPlayerForProfile` | function | 10360–10363 | 4 |
| `getSeasonIdentityProfile` | function | 10364–10368 | 5 |
| `seasonStatNumber` | function | 10369–10372 | 4 |
| `seasonStatSetSize` | function | 10373–10378 | 6 |
| `isActiveAlltimeSeasonStats` | function | 10379–10392 | 14 |
| `getActiveAlltimeSeasonKeys` | function | 10393–10403 | 11 |
| `getAlltimeRecencyWeight` | function | 10404–10409 | 6 |
| `getRosterStatus` | function | 10410–10416 | 7 |
| `getGlobalTopScorerMilestones` | function | 10417–10429 | 13 |
| `getGlobalRookieSeasonKey` | function | 10430–10443 | 14 |
| `getGlobalRookieMilestone` | function | 10444–10454 | 11 |
| `getGlobalPlayerMilestones` | function | 10455–10472 | 18 |
| `buildOpponentIntelligence` | function | 10474–10527 | 54 |
| `rOpponentIntelBars` | function | 10529–10539 | 11 |
| `getAllTimeDuoRows` | function | 10541–10563 | 23 |
| `rDuoRows` | function | 10565–10584 | 20 |
| `getAllLoadedSeasonGames` | function | 10586–10605 | 20 |
| `getRosterEntryRegistryProfile` | function | 10607–10610 | 4 |
| `difficultConnectionConfidence` | function | 10611–10615 | 5 |
| `getDuoRowsForPlayerScope` | function | 10616–10634 | 19 |
| `buildDirectDuoLookupForPlayer` | function | 10635–10652 | 18 |
| `duoScopeSeasonKeys` | function | 10653–10656 | 4 |
| `getDuoScorerCountsWithCandidate` | function | 10657–10676 | 20 |
| `buildBestThirdManOptions` | function | 10677–10710 | 34 |
| `getDuoDirectScorerGameCounts` | function | 10711–10742 | 32 |
| `responseMomentumAbsSeconds` | function | 10747–10749 | 3 |
| `responseMomentumTime` | function | 10750–10756 | 7 |
| `responseMomentumGameRows` | function | 10757–10763 | 7 |
| `responseMomentumSide` | function | 10764–10772 | 9 |
| `responseMomentumActor` | function | 10773–10783 | 11 |
| `responseMomentumGoalActors` | function | 10784–10791 | 8 |
| `buildAnnotatedGoalEventsForGame` | function | 10792–10905 | 114 |
| `responseMomentumConfidence` | function | 10906–10910 | 5 |
| `responseMomentumEmptyState` | function | 10911–10918 | 8 |
| `responseMomentumPairKey` | function | 10919–10921 | 3 |
| `ensureRmPlayer` | function | 10922–10927 | 6 |
| `ensureRmDuo` | function | 10928–10933 | 6 |
| `finalizeResponseStats` | function | 10934–10947 | 14 |
| `buildResponseGoalStatsRaw` | function | 10948–10996 | 49 |
| `buildResponseGoalStats` | function | 10997–11002 | 6 |
| `finalizeMomentumStats` | function | 11003–11008 | 6 |
| `buildMomentumSwingStatsRaw` | function | 11009–11079 | 71 |
| `buildMomentumSwingStats` | function | 11080–11085 | 6 |
| `buildDuoFloorCeiling` | function | 11086–11127 | 42 |
| `buildDuoWarnings` | function | 11128–11146 | 19 |
| `duoProPairKey` | function | 11147–11149 | 3 |
| `duoProContextSeasonKey` | function | 11150–11152 | 3 |
| `getDuoFieldPlayerRows` | function | 11153–11163 | 11 |
| `duoProPlayer` | function | 11164–11168 | 5 |
| `getDuoSharedFieldRows` | function | 11169–11174 | 6 |
| `buildDuoDirectProduction` | function | 11175–11195 | 21 |
| `emptyDuoTeamImpactStats` | function | 11196–11198 | 3 |
| `addDuoTeamGame` | function | 11199–11214 | 16 |
| `finalizeDuoTeamImpactStats` | function | 11215–11222 | 8 |
| `buildDuoWithWithoutImpact` | function | 11223–11256 | 34 |
| `buildDuoOpponentAdjusted` | function | 11257–11269 | 13 |
| `buildDuoNetworkContext` | function | 11270–11293 | 24 |
| `buildDuoGapAnalysis` | function | 11294–11310 | 17 |
| `buildDuoCompatibility` | function | 11322–11344 | 23 |
| `buildDuoUntestedPotential` | function | 11345–11356 | 12 |
| `buildDuoUsageRate` | function | 11357–11368 | 12 |
| `buildDuoReplacementOptions` | function | 11369–11380 | 12 |
| `buildDuoProAnalysis` | function | 11381–11424 | 44 |
| `rDuoCenterPro` | function | 11425–11544 | 120 |
| `duoProDomId` | function | 11545–11547 | 3 |
| `duoProPickerOpen` | function | 11548–11550 | 3 |
| `duoProPickerMessage` | function | 11551–11553 | 3 |
| `setDuoProPickerState` | function | 11554–11563 | 10 |
| `duoProResolveCandidate` | function | 11564–11572 | 9 |
| `duoProSelectionPayload` | function | 11573–11582 | 10 |
| `openDuoProPicker` | window | 11583–11583 | 1 |
| `cancelDuoProPicker` | window | 11584–11584 | 1 |
| `selectDuoProQuick` | window | 11585–11588 | 4 |
| `confirmDuoProSelection` | window | 11589–11603 | 15 |
| `setDuoProSelection` | window | 11604–11611 | 8 |
| `rDuoProPlayerSelect` | function | 11612–11618 | 7 |
| `rInteractiveDuoCenterPro` | function | 11619–11674 | 56 |
| `rSeasonDuoCenterPro` | function | 11675–11677 | 3 |
| `getDifficultConnectionRowsForPlayer` | function | 11678–11722 | 45 |
| `emptyRosterImpactStats` | function | 11723–11725 | 3 |
| `finalizeRosterImpactStats` | function | 11726–11733 | 8 |
| `addRosterImpactGameToStats` | function | 11734–11743 | 10 |
| `getRosterImpactPlayerEventLookup` | function | 11744–11764 | 21 |
| `buildRosterImpactGameIndex` | function | 11777–11802 | 26 |
| `getRosterImpactPlayerGames` | function | 11815–11856 | 42 |
| `rosterImpactConfidence` | function | 11857–11862 | 6 |
| `confidenceFromSampleSize` | function | 11867–11870 | 4 |
| `rosterImpactConfidenceWeight` | function | 11871–11874 | 4 |
| `antiSynergyImpactScore` | function | 11875–11889 | 15 |
| `buildRosterImpactAnalysis` | function | 11890–11958 | 69 |
| `buildDuoAntiSynergy` | function | 11959–11961 | 3 |
| `rAntiSynergyDelta` | function | 11962–11968 | 7 |
| `antiSynergyDeltaClass` | function | 11969–11972 | 4 |
| `antiSynergySigned` | function | 11973–11977 | 5 |
| `rAntiSynergyCompareChip` | function | 11978–11985 | 8 |
| `rAntiSynergyMetricRow` | function | 11986–11994 | 9 |
| `rAntiSynergyWinrateText` | function | 12002–12007 | 6 |
| `rAntiSynergyWinrateRow` | function | 12008–12016 | 9 |
| `rRosterImpactStatLine` | function | 12017–12020 | 4 |
| `antiSynergyPartnerIsSgOnly` | function | 12021–12024 | 4 |
| `rAntiSynergyMainDelta` | function | 12025–12034 | 10 |
| `rDifficultConnectionList` | function | 12035–12059 | 25 |
| `rDifficultConnectionListCompactLegacy` | function | 12060–12101 | 42 |
| `rDifficultConnectionListCompact` | function | 12102–12140 | 39 |
| `rDifficultConnectionsCard` | function | 12141–12177 | 37 |
| `responseMomentumTooltipFor` | function | 12222–12228 | 7 |
| `rmTerm` | function | 12229–12232 | 4 |
| `rResponseRateDisplay` | function | 12238–12244 | 7 |
| `rRmKpi` | function | 12245–12256 | 12 |
| `rAvgResponseTimeNote` | function | 12259–12262 | 4 |
| `rRmTopList` | function | 12263–12273 | 11 |
| `rResponseMomentumOverviewCard` | function | 12274–12297 | 24 |
| `rPlayerResponseMomentumCard` | function | 12298–12316 | 19 |
| `rDuoResponseMomentumCard` | function | 12317–12336 | 20 |
| `rTeamResponseMomentumCard` | function | 12337–12343 | 7 |
| `rMatchcenterResponseMomentum` | function | 12344–12381 | 38 |
| `getTeamAllTimeRecords` | function | 12383–12423 | 41 |
| `getAllTimeOpponentIntelligence` | function | 12425–12431 | 7 |
| `getAllTimeOpponentTopScorers` | function | 12433–12457 | 25 |
| `getHallOfFameStats` | function | 12459–12481 | 23 |
| `rOpponentTopScorerTable` | function | 12483–12502 | 20 |
| `getAllTimeIdentityStandings` | function | 12504–12538 | 35 |
| `buildRecencyWeightedGlobalIdentityProfile` | function | 12540–12587 | 48 |
| `getGlobalIdentityProfile` | function | 12589–12615 | 27 |
| `dedupeIdentityProfileTags` | function | 12617–12628 | 12 |
| `rGlobalProfileTags` | function | 12630–12634 | 5 |
| `escHtml` | function | 12636–12638 | 3 |
| `pctValue` | function | 12639–12642 | 4 |
| `rHallOfFameHero` | function | 12643–12668 | 26 |
| `rHallPodiumList` | function | 12669–12691 | 23 |
| `rHallDuoTemple` | function | 12692–12699 | 8 |
| `hallGoalieNum` | function | 12701–12706 | 6 |
| `hallGoalieTime` | function | 12707–12714 | 8 |
| `hallGoalieSeasonLabel` | function | 12715–12715 | 1 |
| `isHallRowPureSG` | function | 12716–12723 | 8 |
| `rHallSGBadge` | function | 12724–12726 | 3 |
| `hallGoaliePkStats` | function | 12727–12738 | 12 |
| `hallGoalieTopteamStats` | function | 12739–12745 | 7 |
| `hallGoalieSeasonScore` | function | 12746–12765 | 20 |
| `hallGoalieRowFromStats` | function | 12766–12798 | 33 |
| `getHallGoalieData` | function | 12799–12814 | 16 |
| `hallGoalieNameHtml` | function | 12815–12817 | 3 |
| `hallGoalieTooltip` | function | 12832–12835 | 4 |
| `hallGoalieExplainForLabel` | function | 12836–12850 | 15 |
| `rHallGoalieRankCard` | function | 12851–12882 | 32 |
| `rHallGoalieAwardCards` | function | 12883–12899 | 17 |
| `rHallGoalieLegends` | function | 12900–12932 | 33 |
| `getGlobalSeasonStatRows` | function | 12933–12948 | 16 |
| `getAlltimeRank` | function | 12949–12954 | 6 |
| `rAlltimeKpis` | function | 12955–12968 | 14 |
| `rSparkline` | function | 12969–12981 | 13 |
| `comparisonItemKey` | function | 12993–12998 | 6 |
| `normalizeComparisonItem` | function | 12999–13003 | 5 |
| `comparisonJsArg` | function | 13004–13006 | 3 |
| `comparisonNum` | function | 13007–13010 | 4 |
| `comparisonPct` | function | 13011–13014 | 4 |
| `comparisonFmt` | function | 13015–13018 | 4 |
| `comparisonPctFmt` | function | 13019–13021 | 3 |
| `getComparisonPlayerRow` | function | 13022–13024 | 3 |
| `getComparisonSeasonLabel` | function | 13025–13027 | 3 |
| `getComparisonTeamGoalsForSeason` | function | 13028–13039 | 12 |
| `getComparisonAlltimeTeamGoals` | function | 13040–13042 | 3 |
| `getComparisonSeasonEvents` | function | 13043–13047 | 5 |
| `getComparisonChemistryFromEvents` | function | 13048–13052 | 5 |
| `getComparisonClutchFromEvents` | function | 13053–13057 | 5 |
| `getComparisonStyleProfile` | function | 13058–13082 | 25 |
| `getComparisonProfile` | function | 13083–13087 | 5 |
| `getComparisonSeasonTrend` | function | 13088–13113 | 26 |
| `getComparisonAlltimeTrend` | function | 13114–13119 | 6 |
| `getComparisonPlayerOptions` | function | 13121–13135 | 15 |
| `comparisonVariantValue` | function | 13136–13138 | 3 |
| `getComparisonVariantsForPlayer` | function | 13139–13163 | 25 |
| `parseComparisonVariant` | function | 13164–13178 | 15 |
| `getComparisonCurrentSelection` | function | 13179–13189 | 11 |
| `filterComparisonPlayers` | window | 13190–13197 | 8 |
| `selectComparisonPlayer` | window | 13198–13203 | 6 |
| `setComparisonRoleMode` | window | 13204–13208 | 5 |
| `setComparisonVariant` | window | 13209–13212 | 4 |
| `toggleComparisonSgOnly` | window | 13213–13213 | 1 |
| `addComparisonItem` | window | 13214–13221 | 8 |
| `addSelectedComparisonItem` | window | 13222–13227 | 6 |
| `toggleComparisonPicker` | window | 13228–13228 | 1 |
| `removeComparisonItem` | window | 13229–13232 | 4 |
| `clearComparison` | window | 13233–13233 | 1 |
| `runComparison` | window | 13234–13240 | 7 |
| `selectComparisonMode` | window | 13241–13241 | 1 |
| `backToComparisonModeSelect` | window | 13242–13242 | 1 |
| `normalizeDuoComparisonItem` | function | 13243–13246 | 4 |
| `comparisonDuoContext` | function | 13247–13250 | 4 |
| `setComparisonDuoMode` | window | 13251–13251 | 1 |
| `setComparisonDuoSeasonKey` | window | 13252–13252 | 1 |
| `setComparisonDuoSearch` | window | 13253–13253 | 1 |
| `filterPlayerSuggestions` | function | 13254–13265 | 12 |
| `rComparisonDuoSuggestionButtons` | function | 13266–13269 | 4 |
| `renderComparisonDuoSuggestions` | function | 13270–13278 | 9 |
| `filterComparisonDuoSuggestions` | window | 13279–13286 | 8 |
| `selectComparisonDuoSuggestion` | window | 13280–13286 | 7 |
| `handleComparisonDuoSearchKey` | window | 13287–13299 | 13 |
| `setComparisonDuoPlayer` | window | 13300–13305 | 6 |
| `addComparisonDuoFromSelection` | window | 13306–13313 | 8 |
| `addComparisonDuo` | window | 13314–13316 | 3 |
| `removeComparisonDuo` | window | 13317–13320 | 4 |
| `clearComparisonDuos` | window | 13321–13321 | 1 |
| `runDuoComparison` | window | 13322–13326 | 5 |
| `buildDuoComparison` | function | 13327–13346 | 20 |
| `rDuoComparisonBars` | function | 13347–13351 | 5 |
| `rDuoCompareSummaryCards` | function | 13352–13382 | 31 |
| `rDuoComparisonProfile` | function | 13383–13404 | 22 |
| `rDuoComparisonChemistry` | function | 13405–13420 | 16 |
| `rDuoComparisonImpact` | function | 13421–13436 | 16 |
| `rDuoComparisonContext` | function | 13437–13454 | 18 |
| `rDuoComparisonDetails` | function | 13455–13458 | 4 |
| `rDuoComparisonDashboard` | function | 13459–13472 | 14 |
| `rComparisonDuoSearchBox` | function | 13473–13482 | 10 |
| `rDuoComparisonPage` | function | 13483–13493 | 11 |
| `rComparisonModeSelect` | function | 13494–13496 | 3 |
| `getComparisonEventsForItem` | function | 13497–13499 | 3 |
| `getComparisonRosterGamesForSeason` | function | 13500–13516 | 17 |
| `getComparisonRosterGames` | function | 13517–13524 | 8 |
| `comparisonEventGameKey` | function | 13525–13527 | 3 |
| `comparisonEventPhaseLabel` | function | 13528–13531 | 4 |
| `comparisonOpponentStrengthTier` | function | 13532–13537 | 6 |
| `buildComparisonExtraMetrics` | function | 13538–13595 | 58 |
| `getGoalieComparisonAlltimeTrend` | function | 13596–13612 | 17 |
| `getGoalieComparisonSeasonTrend` | function | 13613–13631 | 19 |
| `buildGoalieComparisonDataset` | function | 13632–13682 | 51 |
| `buildComparisonDataset` | function | 13683–13718 | 36 |
| `kpiValueText` | function | 13720–13723 | 4 |
| `kpiDelta` | function | 13724–13729 | 6 |
| `kpiItemColor` | function | 13730–13732 | 3 |
| `rKpiCards` | function | 13733–13743 | 11 |
| `rKpiMirrorRows` | function | 13758–13817 | 60 |
| `kpiRadarValue` | function | 13818–13828 | 11 |
| `rKpiRadar` | function | 13829–13863 | 35 |
| `rKpiShareBars` | function | 13864–13871 | 8 |
| `rKpiMetricCard` | function | 13872–13876 | 5 |
| `rKpiTextMetricCard` | function | 13877–13879 | 3 |
| `rKpiExtendedMetrics` | function | 13880–13894 | 15 |
| `kpiNiceMax` | function | 13895–13900 | 6 |
| `kpiTrendRows` | function | 13901–13909 | 9 |
| `rKpiTrendCompare` | function | 13910–13976 | 67 |
| `rKpiOpponentStrength` | function | 13977–14004 | 28 |
| `kpiBadge` | function | 14005–14007 | 3 |
| `rKpiObjectMini` | function | 14008–14014 | 7 |
| `rKpiInfoCards` | function | 14015–14046 | 32 |
| `buildComparisonSummary` | function | 14047–14078 | 32 |
| `rKPIVergleich` | function | 14079–14092 | 14 |
| `rComparisonMiniOverview` | function | 14093–14096 | 4 |
| `rComparisonRoles` | function | 14097–14104 | 8 |
| `rComparisonDashboard` | function | 14105–14115 | 11 |
| `rComparisonStyles` | function | 14116–14153 | 38 |
| `rComparisonCenterPage` | function | 14154–14204 | 51 |
| `rSeasonTrendRows` | function | 14205–14223 | 19 |
| `getAlltimeAggregatedStyleProfile` | function | 14224–14243 | 20 |
| `rGlobalDnaBars` | function | 14245–14274 | 30 |
| `pdashNum` | function | 14275–14278 | 4 |
| `pdashPct` | function | 14279–14282 | 4 |
| `pdashPhaseLabel` | function | 14283–14286 | 4 |
| `pdashTopCount` | function | 14287–14290 | 4 |
| `pdashBestPhase` | function | 14291–14294 | 4 |
| `pdashTopPartner` | function | 14295–14298 | 4 |
| `pdashTopOpponent` | function | 14299–14302 | 4 |
| `pdashOpponentTier` | function | 14303–14308 | 6 |
| `pdashOpponentStrength` | function | 14309–14328 | 20 |
| `pdashInsight` | function | 14329–14331 | 3 |
| `pdashInsights` | function | 14332–14343 | 12 |
| `buildSeasonPlayerDashModel` | function | 14344–14380 | 37 |
| `buildAlltimePlayerDashModel` | function | 14381–14423 | 43 |
| `rPlayerDashStyles` | function | 14424–14435 | 12 |
| `rPdashLabel` | function | 14436–14438 | 3 |
| `rPdashStat` | function | 14439–14441 | 3 |
| `rPlayerDash` | function | 14442–14480 | 39 |
| `rSeasonPlayerDashboard` | function | 14481–14483 | 3 |
| `rAlltimePlayerDashboard` | function | 14484–14486 | 3 |
| `rGlobalPartnerOpponentPanel` | function | 14487–14500 | 14 |
| `rGlobalCareerHeader` | function | 14501–14521 | 21 |
| `rSeasonLandingPage` | function | 14523–14537 | 15 |
| `rGlobalOverview` | function | 14539–14590 | 52 |
| `rGlobalAllTimeStats` | function | 14592–14608 | 17 |
| `rGlobalDevelopment` | function | 14610–14648 | 39 |
| `getGlobalPlayerOpponentGameRows` | function | 14651–14678 | 28 |
| `getGlobalOpponentSpecialistProfile` | function | 14680–14708 | 29 |
| `rGlobalDuoNetwork` | function | 14710–14907 | 198 |
| `rGlobalOpponentSpecialist` | function | 14909–14954 | 46 |
| `playerExplainConfidence` | function | 14956–14961 | 6 |
| `playerExplainConfidenceLabel` | function | 14962–14964 | 3 |
| `playerExplainAdd` | function | 14965–14969 | 5 |
| `playerExplainStyleSignature` | function | 14970–14981 | 12 |
| `playerExplainRolePhrase` | function | 14982–14990 | 9 |
| `playerExplainHeadline` | function | 14991–15000 | 10 |
| `playerExplainContextSentence` | function | 15001–15019 | 19 |
| `buildFieldPlayerExplanation` | function | 15020–15094 | 75 |
| `buildGoaliePlayerExplanation` | function | 15095–15148 | 54 |
| `buildPlayerExplanation` | function | 15149–15157 | 9 |
| `buildPlayerIntelligence` | function | 15158–15187 | 30 |
| `rPlayerExplainItems` | function | 15188–15192 | 5 |
| `rPlayerExplanation` | function | 15193–15244 | 52 |
| `rAllTimePlayersPage` | function | 15246–15286 | 41 |
| `rHallOfFamePage` | function | 15288–15376 | 89 |
| `lexiconUniqueKeys` | function | 15381–15388 | 8 |
| `lexiconEntry` | function | 15389–15398 | 10 |
| `rLexiconRows` | function | 15399–15402 | 4 |
| `rLexiconPage` | function | 15403–15575 | 173 |
| `clampScore` | function | 15579–15582 | 4 |
| `getScoreLabel` | function | 15583–15591 | 9 |
| `buildConfidence` | function | 15592–15637 | 46 |
| `confidenceCautiousText` | function | 15638–15641 | 4 |
| `explainScore` | function | 15642–15656 | 15 |
| `p1NarrativeKey` | function | 15657–15659 | 3 |
| `scoreNarrative` | function | 15660–15678 | 19 |
| `rankNarratives` | function | 15679–15692 | 14 |
| `getEmptyState` | function | 15693–15704 | 12 |
| `rEmptyState` | function | 15705–15708 | 4 |
| `capSuperlativeLabel` | function | 15716–15718 | 3 |
| `rScoreBreakdown` | function | 15719–15735 | 17 |
| `matchcenterSigned` | function | 15737–15741 | 5 |
| `matchcenterDateLabel` | function | 15743–15747 | 5 |
| `dedupeGamesById` | function | 15759–15767 | 9 |
| `matchcenterIsFreiburgTuebingenTeamName` | function | 15768–15774 | 7 |
| `matchcenterSeasonHasGames` | function | 15778–15780 | 3 |
| `matchcenterDefaultSeasonKey` | function | 15781–15786 | 6 |
| `matchcenterOpponentMode` | function | 15798–15800 | 3 |
| `getMatchcenterOpponents` | function | 15801–15833 | 33 |
| `getMatchcenterDirectOpponents` | function | 15834–15864 | 31 |
| `matchcenterAnalyzeDirect` | function | 15867–15903 | 37 |
| `matchcenterAnalyzeForm` | function | 15904–15929 | 26 |
| `matchcenterEmptyBuckets` | function | 15944–15946 | 3 |
| `matchcenterUlmScoutingConfidence` | function | 15947–15951 | 5 |
| `matchcenterEnsureUlmPlayer` | function | 15952–15989 | 38 |
| `matchcenterRegisterUlmProfileGame` | function | 15990–15995 | 6 |
| `matchcenterUpdateUlmSeasonRow` | function | 15996–16002 | 7 |
| `matchcenterClassifyUlmGoalEvent` | function | 16003–16013 | 11 |
| `matchcenterAddUlmScoring` | function | 16014–16054 | 41 |
| `matchcenterFinalizeUlmPlayers` | function | 16055–16123 | 69 |
| `matchcenterBuildUlmPlayerScouting` | function | 16124–16178 | 55 |
| `matchcenterBuildUlmPlayerInsights` | function | 16179–16191 | 13 |
| `matchcenterDuoPairKey` | function | 16192–16195 | 4 |
| `matchcenterEnsureOpponentDuo` | function | 16196–16228 | 33 |
| `matchcenterDuoDirectionLabel` | function | 16229–16235 | 7 |
| `matchcenterAddDuoConnection` | function | 16236–16254 | 19 |
| `matchcenterFinalizeOpponentDuos` | function | 16255–16289 | 35 |
| `matchcenterBuildOpponentDuos` | function | 16290–16334 | 45 |
| `matchcenterBuildOpponentDuoInsights` | function | 16335–16348 | 14 |
| `matchcenterEnsureUlmDuo` | function | 16349–16386 | 38 |
| `matchcenterAddUlmDuoConnection` | function | 16387–16405 | 19 |
| `matchcenterFinalizeUlmDuos` | function | 16406–16441 | 36 |
| `matchcenterBuildUlmDuos` | function | 16442–16484 | 43 |
| `matchcenterBuildUlmDuoInsights` | function | 16485–16497 | 13 |
| `matchcenterDirectContextGames` | function | 16498–16500 | 3 |
| `matchcenterSpecialTeamsForGame` | function | 16501–16504 | 4 |
| `matchcenterPersonalPenaltyMinutesForSide` | function | 16505–16513 | 9 |
| `matchcenterPct` | function | 16514–16517 | 4 |
| `matchcenterBuildSpecialTeamsMatchup` | function | 16518–16565 | 48 |
| `matchcenterGoalieKey` | function | 16566–16570 | 5 |
| `matchcenterGoalieFitScore` | function | 16571–16587 | 17 |
| `matchcenterBuildGoalieMatchup` | function | 16588–16633 | 46 |
| `matchcenterGoalAbsSeconds` | function | 16636–16640 | 5 |
| `matchcenterTimeValue` | function | 16641–16648 | 8 |
| `matchcenterEmptyTimingStats` | function | 16649–16657 | 9 |
| `matchcenterWindowForSecond` | function | 16658–16664 | 7 |
| `matchcenterTimingStatsForGames` | function | 16665–16702 | 38 |
| `matchcenterBuildTimingInsights` | function | 16703–16713 | 11 |
| `matchcenterBuildTimingAnalysis` | function | 16714–16724 | 11 |
| `rMatchcenterTimeBars` | function | 16725–16738 | 14 |
| `rMatchcenterTimingStatsCard` | function | 16739–16758 | 20 |
| `rMatchcenterTiming` | function | 16759–16782 | 24 |
| `rMatchcenterTabs` | function | 16798–16800 | 3 |
| `rMatchcenterProfileSection` | function | 16801–16820 | 20 |
| `rMatchcenterFormSection` | function | 16821–16846 | 26 |
| `rMatchcenterDetailsSection` | function | 16847–16854 | 8 |
| `matchcenterResultClass` | function | 16855–16857 | 3 |
| `matchcenterUlmTeamLabelForGame` | function | 16859–16863 | 5 |
| `matchcenterGameLine` | function | 16864–16869 | 6 |
| `matchcenterFormLine` | function | 16870–16874 | 5 |
| `matchcenterBuildInsights` | function | 16875–16895 | 21 |
| `rMatchcenterKpi` | function | 16896–16902 | 7 |
| `rMatchcenterFormCard` | function | 16903–16923 | 21 |
| `rMatchcenterGamesList` | function | 16924–16935 | 12 |
| `rMatchcenterWatchCard` | function | 16936–16956 | 21 |
| `rMatchcenterPlayerRow` | function | 16957–16980 | 24 |
| `rMatchcenterRankCard` | function | 16981–16986 | 6 |
| `rMatchcenterUlmImpactCard` | function | 16987–17015 | 29 |
| `rMatchcenterUlmPlayerRow` | function | 17016–17039 | 24 |
| `rMatchcenterUlmRankCard` | function | 17040–17045 | 6 |
| `rMatchcenterUlmScouting` | function | 17046–17082 | 37 |
| `rMatchcenterOpponentScouting` | function | 17083–17118 | 36 |
| `rMatchcenterPlayersTab` | function | 17119–17121 | 3 |
| `rMatchcenterDuoWatchCard` | function | 17122–17141 | 20 |
| `rMatchcenterDuoRow` | function | 17142–17165 | 24 |
| `rMatchcenterDuoRankCard` | function | 17166–17171 | 6 |
| `rMatchcenterUlmDuoWatchCard` | function | 17172–17197 | 26 |
| `rMatchcenterUlmDuoRow` | function | 17198–17220 | 23 |
| `rMatchcenterUlmDuoRankCard` | function | 17221–17226 | 6 |
| `rMatchcenterUlmDuos` | function | 17227–17269 | 43 |
| `rMatchcenterOpponentDuos` | function | 17270–17312 | 43 |
| `rMatchcenterDuosTab` | function | 17313–17315 | 3 |
| `rMatchcenterSpecialCard` | function | 17316–17324 | 9 |
| `rMatchcenterSpecialTeams` | function | 17325–17374 | 50 |
| `rMatchcenterGoalieCard` | function | 17375–17398 | 24 |
| `rMatchcenterGoalieMatchup` | function | 17399–17427 | 29 |
| `matchcenterPlanScoreText` | function | 17428–17431 | 4 |
| `matchcenterPlanRateText` | function | 17432–17436 | 5 |
| `matchcenterPriorityLabel` | function | 17437–17439 | 3 |
| `matchcenterConfidenceClass` | function | 17440–17445 | 6 |
| `matchcenterInferPriority` | function | 17446–17452 | 7 |
| `matchcenterAddPlanItem` | function | 17453–17458 | 6 |
| `matchcenterAddPlanWatch` | function | 17459–17464 | 6 |
| `matchcenterBuildPlanConfidence` | function | 17465–17512 | 48 |
| `matchcenterIntelCurve` | function | 17513–17518 | 6 |
| `matchcenterIntelInverseCurve` | function | 17519–17522 | 4 |
| `matchcenterIntelWeighted` | function | 17523–17533 | 11 |
| `matchcenterIntelRate` | function | 17534–17537 | 4 |
| `matchcenterIntelPct` | function | 17538–17541 | 4 |
| `matchcenterIntelPriorityFromScore` | function | 17542–17547 | 6 |
| `matchcenterIntelPriorityClass` | function | 17548–17553 | 6 |
| `matchcenterIntelPriorityLabel` | function | 17554–17557 | 4 |
| `matchcenterIntelDataLabel` | function | 17558–17560 | 3 |
| `matchcenterBuildIntelligenceDataQuality` | function | 17561–17630 | 70 |
| `matchcenterBuildOpponentDNA` | function | 17631–17743 | 113 |
| `matchcenterDeriveOpponentType` | function | 17744–17761 | 18 |
| `matchcenterIntelPlayerRef` | function | 17762–17774 | 13 |
| `matchcenterIntelDuoRef` | function | 17775–17788 | 14 |
| `matchcenterIntelAddAlarm` | function | 17789–17809 | 21 |
| `matchcenterBuildOpponentAlarm` | function | 17810–17919 | 110 |
| `matchcenterBuildIntelListFromPlan` | function | 17920–17928 | 9 |
| `matchcenterBuildCoachHints` | function | 17929–17944 | 16 |
| `matchcenterBuildIntelHeadline` | function | 17945–17952 | 8 |
| `matchcenterBuildOneThingToWatch` | function | 17953–17965 | 13 |
| `matchcenterBuildIntelligenceSignals` | function | 17966–18012 | 47 |
| `buildMatchIntelligenceFromContext` | function | 18013–18067 | 55 |
| `buildMatchIntelligence` | function | 18068–18089 | 22 |
| `matchcenterCoachCautious` | function | 18090–18092 | 3 |
| `matchcenterCoachAdd` | function | 18093–18101 | 9 |
| `matchcenterCoachGameModel` | function | 18102–18115 | 14 |
| `buildMatchStories` | function | 18116–18145 | 30 |
| `matchcenterCoachPriorityFromAlarm` | function | 18146–18155 | 10 |
| `matchcenterBuildCoachPriorities` | function | 18156–18162 | 7 |
| `matchcenterBuildCoachLevers` | function | 18163–18172 | 10 |
| `matchcenterBuildCoachDangerPatterns` | function | 18173–18180 | 8 |
| `matchcenterBuildCoachIfThen` | function | 18181–18190 | 10 |
| `matchcenterBuildCoachAvoidList` | function | 18191–18200 | 10 |
| `matchcenterBuildCoachActivationHints` | function | 18201–18207 | 7 |
| `matchcenterBuildCoachKeyActors` | function | 18208–18215 | 8 |
| `buildDigitalCoachReport` | function | 18216–18248 | 33 |
| `buildLockerRoomSheet` | function | 18249–18269 | 21 |
| `matchcenterSocialAdd` | function | 18270–18276 | 7 |
| `matchcenterSocialCaption` | function | 18277–18282 | 6 |
| `socialSentence` | function | 18283–18285 | 3 |
| `socialEnsurePeriod` | function | 18286–18289 | 4 |
| `socialFirstUseful` | function | 18290–18292 | 3 |
| `socialPlayerFocusLine` | function | 18293–18299 | 7 |
| `socialDuoFocusLine` | function | 18300–18305 | 6 |
| `socialOpponentLine` | function | 18306–18309 | 4 |
| `socialKeyFactLine` | function | 18310–18319 | 10 |
| `buildMatchdayCaptionBlocks` | function | 18320–18349 | 30 |
| `buildSocialMediaContent` | function | 18350–18398 | 49 |
| `isSyntheticLineupPlayerId` | function | 18404–18406 | 3 |
| `getSyntheticLineupPlayers` | function | 18407–18409 | 3 |
| `getSyntheticLineupRow` | function | 18410–18426 | 17 |
| `getSyntheticLineupRows` | function | 18427–18429 | 3 |
| `getLineupAllRows` | function | 18430–18432 | 3 |
| `lineupRowMeta` | function | 18433–18440 | 8 |
| `getLineupPlayerPool` | function | 18441–18449 | 9 |
| `lineupScore` | function | 18450–18455 | 6 |
| `lineupAverage` | function | 18456–18459 | 4 |
| `lineupLevelLabel` | function | 18460–18463 | 4 |
| `lineupRosterGamesForPlayer` | function | 18466–18513 | 48 |
| `buildLineupExperienceProfile` | function | 18514–18556 | 43 |
| `lineupOpponentDNAForContext` | function | 18557–18568 | 12 |
| `buildLineupOpponentDNAFit` | function | 18569–18612 | 44 |
| `classifyLineIdentity` | function | 18613–18660 | 48 |
| `lineupPlayerProfile` | function | 18661–18736 | 76 |
| `buildLineupAnalysis` | function | 18737–18870 | 134 |
| `buildLineupScoreBreakdowns` | function | 18871–18900 | 30 |
| `buildLineupIntelligence` | function | 18901–18911 | 11 |
| `buildLineAnalysis` | function | 18912–18914 | 3 |
| `lineupRowMap` | function | 18915–18917 | 3 |
| `lineupRankCandidateIds` | function | 18918–18932 | 15 |
| `lineupCombinationIds` | function | 18933–18946 | 14 |
| `lineupStdDev` | function | 18947–18952 | 6 |
| `lineupRoleDnaComplementScore` | function | 18953–18976 | 24 |
| `lineupDirectChemistryScore` | function | 18977–18983 | 7 |
| `lineupEvaluateComplementCandidate` | function | 18984–19062 | 79 |
| `lineupPlayerAnchorScore` | function | 19063–19080 | 18 |
| `lineupPlayerAnchorConfidence` | function | 19083–19087 | 5 |
| `buildTeamLineBalance` | function | 19088–19131 | 44 |
| `buildBalancedLineupSet` | function | 19132–19158 | 27 |
| `lineupRecommendationReason` | function | 19159–19167 | 9 |
| `buildLineupRecommendations` | function | 19168–19249 | 82 |
| `recommendLineComplements` | function | 19250–19277 | 28 |
| `matchcenterBuildMatchPlan` | function | 19278–19423 | 146 |
| `rMatchcenterPlanItems` | function | 19424–19441 | 18 |
| `rMatchcenterPlanWatch` | function | 19442–19457 | 16 |
| `rMatchcenterOpponentDNA` | function | 19458–19490 | 33 |
| `rMatchcenterOpponentAlarm` | function | 19491–19512 | 22 |
| `rMatchcenterIntelOverview` | function | 19513–19558 | 46 |
| `rMatchcenterIntelCoachHints` | function | 19559–19572 | 14 |
| `rMatchcenterCoachCardList` | function | 19573–19586 | 14 |
| `rMatchcenterCoachIfThen` | function | 19587–19594 | 8 |
| `rMatchcenterCoachSimpleList` | function | 19595–19599 | 5 |
| `rMatchcenterDigitalCoach` | function | 19600–19664 | 65 |
| `rMatchcenterCopyButton` | function | 19665–19669 | 5 |
| `rMatchcenterLockerList` | function | 19670–19681 | 12 |
| `rMatchcenterLockerRoomSheet` | function | 19682–19737 | 56 |
| `rMatchcenterSocialBlock` | function | 19738–19745 | 8 |
| `matchcenterStoryDownloadFileName` | function | 19746–19755 | 10 |
| `downloadMatchdayStory` | window | 19756–19803 | 48 |
| `rSocialVideoBlock` | function | 19807–19838 | 32 |
| `socialVideoJobsForMatchday` | function | 19841–19847 | 7 |
| `generateSocialVideoVideos` | window | 19848–19889 | 42 |
| `cancelSocialVideoRecording` | window | 19890–19892 | 3 |
| `generateSocialVideoStandbilder` | window | 19893–19916 | 24 |
| `generateSocialVideoContactSheets` | window | 19917–19939 | 23 |
| `rMatchcenterSocialMediaCenter` | function | 19940–19993 | 54 |
| `rLineupScoreRows` | function | 19994–20015 | 22 |
| `rLineupSimpleCards` | function | 20016–20024 | 9 |
| `rMatchcenterLineupBuilder` | function | 20025–20097 | 73 |
| `rLineupMetricPills` | function | 20098–20111 | 14 |
| `rLineupBuilderAvailablePanel` | function | 20112–20159 | 48 |
| `rLineupRecommendationCards` | function | 20160–20174 | 15 |
| `rLineupRecommendationMode` | function | 20175–20208 | 34 |
| `rLineupComplementCards` | function | 20209–20221 | 13 |
| `rLineupTestLine` | function | 20222–20270 | 49 |
| `rLineupTestMode` | function | 20271–20287 | 17 |
| `rLineupBuilderPage` | function | 20288–20322 | 35 |
| `rMatchcenterScoutingSummary` | function | 20323–20366 | 44 |
| `rMatchcenterMatchPlan` | function | 20367–20387 | 21 |
| `matchcenterStoryLogoBase` | function | 20390–20395 | 6 |
| `matchcenterStorySafeLogoUrl` | function | 20396–20402 | 7 |
| `getTeamLogoUrlForStory` | function | 20411–20440 | 30 |
| `matchcenterStoryLogoForOpponent` | function | 20441–20455 | 15 |
| `matchcenterStoryTableRank` | function | 20456–20466 | 11 |
| `matchcenterStoryUlmTableRank` | function | 20467–20473 | 7 |
| `matchcenterStoryRankText` | function | 20474–20477 | 4 |
| `matchcenterStoryInlineStat` | function | 20478–20480 | 3 |
| `matchcenterStoryRankRows` | function | 20482–20493 | 12 |
| `matchcenterStoryAddFact` | function | 20496–20502 | 7 |
| `matchcenterStoryFactKey` | function | 20503–20505 | 3 |
| `matchcenterStoryLooksArtificial` | function | 20506–20508 | 3 |
| `matchcenterStoryEstimateFactWeight` | function | 20509–20514 | 6 |
| `matchcenterStoryAddCandidate` | function | 20515–20537 | 23 |
| `matchcenterStoryCategoryLimit` | function | 20538–20541 | 4 |
| `matchcenterStoryNormalizePickOptions` | function | 20542–20552 | 11 |
| `matchcenterStoryCandidateForBudget` | function | 20553–20562 | 10 |
| `matchcenterStoryPickFactItems` | function | 20563–20615 | 53 |
| `matchcenterStoryPickFacts` | function | 20616–20618 | 3 |
| `matchcenterStoryCurrentStreak` | function | 20620–20628 | 9 |
| `matchcenterStoryWinlessStreak` | function | 20629–20637 | 9 |
| `matchcenterStoryFormFact` | function | 20638–20648 | 11 |
| `matchcenterStoryFormFactCandidates` | function | 20649–20668 | 20 |
| `matchcenterStoryLateGoalsForOutcome` | function | 20669–20672 | 4 |
| `matchcenterStoryClutchFact` | function | 20673–20687 | 15 |
| `matchcenterStoryPlayerClutchTotal` | function | 20688–20695 | 8 |
| `matchcenterStoryBestClutchPlayer` | function | 20696–20705 | 10 |
| `matchcenterStoryPlayerClutchFact` | function | 20706–20731 | 26 |
| `matchcenterStoryDuoClutchTotal` | function | 20732–20739 | 8 |
| `matchcenterStoryBestClutchDuo` | function | 20740–20749 | 10 |
| `matchcenterStoryDuoClutchFact` | function | 20750–20752 | 3 |
| `matchcenterStoryDuoFact` | function | 20753–20773 | 21 |
| `matchcenterStoryClutchPriority` | function | 20774–20776 | 3 |
| `matchcenterStoryCompetitionLabel` | function | 20777–20780 | 4 |
| `matchcenterStoryShortDuel` | function | 20781–20785 | 5 |
| `matchcenterStoryLastDuelLabel` | function | 20786–20789 | 4 |
| `matchcenterStoryDirectFactCandidates` | function | 20790–20811 | 22 |
| `matchcenterStoryPlanFactCandidates` | function | 20812–20824 | 13 |
| `matchcenterStoryCategoryForPlanFact` | function | 20825–20833 | 9 |
| `buildMatchcenterStoryPreviewData` | function | 20834–20945 | 112 |
| `matchcenterStoryNameClass` | function | 20946–20951 | 6 |
| `matchcenterStoryVisibleFacts` | function | 20952–20982 | 31 |
| `rMatchcenterStoryLogo` | function | 20983–20987 | 5 |
| `rMatchcenterStoryForm` | function | 20988–20992 | 5 |
| `rMatchcenterStoryPlayerCard` | function | 20993–21000 | 8 |
| `rMatchcenterStoryPreview` | function | 21001–21070 | 70 |
| `rMatchcenterStoryFrame` | function | 21071–21076 | 6 |
| `fitMatchcenterStoryLayout` | function | 21077–21119 | 43 |
| `ensureSocialVideoExportCapabilityChecked` | function | 21128–21132 | 5 |
| `downloadSocialVideoStandbild` | window | 21147–21166 | 20 |
| `downloadSocialVideoContactSheet` | window | 21171–21196 | 26 |
| `rMatchcenterPage` | function | 21198–21346 | 149 |
| `rTeamPage` | function | 21347–21685 | 339 |
| `exportExcel` | function | 21690–21715 | 26 |
| `render` | function | 21721–21738 | 18 |
| `_render` | function | 21739–21908 | 170 |
| `uiFormatNumber` | function | 21942–21946 | 5 |
| `uiReliabilityDots` | function | 21955–21962 | 8 |
| `uiDeltaIndicator` | function | 21970–21976 | 7 |
| `uiInfoIcon` | function | 21988–21992 | 5 |
| `uiKennzahlKachel` | function | 22000–22011 | 12 |
| `uiKernaussage` | function | 22020–22026 | 7 |
| `uiHinweisKarte` | function | 22034–22046 | 13 |
| `uiRangliste` | function | 22056–22073 | 18 |
| `uiVerlauf` | function | 22084–22103 | 20 |
| `uiIntervallBalken` | function | 22110–22122 | 13 |
| `uiMethodenbox` | function | 22129–22138 | 10 |
| `uiNotiz` | function | 22146–22150 | 5 |
| `datenstandQuoteState` | function | 22172–22179 | 8 |
| `uiQuoteText` | function | 22182–22188 | 7 |
| `uiDatenstandBand` | function | 22205–22218 | 14 |
| `uiPlatzhalter` | function | 22226–22231 | 6 |
| `uiObjektseiteSortTabs` | function | 22276–22284 | 9 |
| `uiObjektseite` | function | 22294–22327 | 34 |
| `mainNavActiveKeyForPage` | function | 22384–22389 | 6 |
| `goToMainNavPoint` | window | 22390–22396 | 7 |
| `rMainNav` | function | 22397–22401 | 5 |
| `rMainNavBottom` | function | 22419–22426 | 8 |
| `openOverview` | window | 22436–22444 | 9 |
| `switchOverviewSeason` | window | 22453–22459 | 7 |
| `openMatchdayTimeline` | window | 22487–22494 | 8 |
| `openMatchday` | window | 22495–22504 | 10 |
| `switchMatchdaySeason` | window | 22506–22511 | 6 |
| `matchdayUlmGames` | function | 22513–22515 | 3 |
| `matchdayLineupInfo` | function | 22522–22532 | 11 |
| `matchdayLineupCardHtml` | function | 22534–22540 | 7 |
| `matchdayGameCardHtml` | function | 22541–22560 | 20 |
| `matchdayFixtureCardHtml` | function | 22566–22574 | 9 |
| `rMatchdayTimelineRow` | function | 22576–22583 | 8 |
| `rMatchdayTimelinePage` | function | 22584–22594 | 11 |
| `rMatchdayDetailPage` | function | 22595–22634 | 40 |
| `rMatchdayPage` | function | 22635–22641 | 7 |
| `overviewMatchdayStartMs` | function | 22660–22665 | 6 |
| `overviewMatchdayEndMs` | function | 22666–22671 | 6 |
| `detectOverviewPhase` | function | 22672–22697 | 26 |
| `getSeasonDataState` | function | 22704–22714 | 11 |
| `parseSeasonDataState` | function | 22715–22723 | 9 |
| `isNewSeasonDataState` | function | 22725–22727 | 3 |
| `recordOverviewVisit` | function | 22734–22743 | 10 |
| `overviewOpponentLabel` | function | 22749–22760 | 12 |
| `overviewLastMatchdayText` | function | 22761–22764 | 4 |
| `overviewNextMatchdayHtml` | function | 22771–22787 | 17 |
| `overviewCompactTableHtml` | function | 22795–22811 | 17 |
| `overviewFormHtml` | function | 22813–22827 | 15 |
| `overviewSeasonBilanzHtml` | function | 22828–22834 | 7 |
| `overviewSeasonAwardHtml` | function | 22836–22845 | 10 |
| `overviewRecordHtml` | function | 22847–22852 | 6 |
| `overviewCrossSeasonTrendHtml` | function | 22854–22862 | 9 |
| `overviewOpponentPreviewHtml` | function | 22863–22867 | 5 |
| `overviewMatchcenterLinkHtml` | function | 22868–22870 | 3 |
| `overviewLineupLinkHtml` | function | 22871–22873 | 3 |
| `overviewRankChangeTile` | function | 22890–22907 | 18 |
| `buildOverviewCards` | function | 22916–22956 | 41 |
| `rOverviewPage` | function | 22966–22977 | 12 |
| `openLigaGegner` | window | 22978–22981 | 4 |
| `rLigaGegnerPlaceholderPage` | function | 22982–22987 | 6 |
| `rAsOfSelector` | function | 22999–23011 | 13 |
| `setContextAsOf` | window | 23012–23023 | 12 |
| `rSeasonDataPreviewContextHint` | function | 23034–23042 | 9 |
| `rSeasonDataStateContextHint` | function | 23051–23057 | 7 |
| `rContextBar` | function | 23082–23100 | 19 |
| `rIaShell` | function | 23102–23104 | 3 |
| `globalSearchTokens` | function | 23121–23124 | 4 |
| `globalSearchEntries` | function | 23126–23139 | 14 |
| `globalSearchPlayerScore` | function | 23140–23147 | 8 |
| `globalSearchMatchdayScore` | function | 23149–23161 | 13 |
| `globalSearchMatch` | function | 23163–23174 | 12 |
| `globalSearchIsEditableTarget` | function | 23175–23179 | 5 |
| `globalSearchKeyAction` | function | 23181–23195 | 15 |
| `rGlobalSearchToggle` | function | 23196–23198 | 3 |
| `rGlobalSearchResultsHtml` | function | 23199–23209 | 11 |
| `rGlobalSearchPanelHtml` | function | 23210–23212 | 3 |
| `paintGlobalSearchResults` | function | 23213–23220 | 8 |
| `openGlobalSearch` | window | 23221–23245 | 25 |
| `closeGlobalSearch` | window | 23246–23253 | 8 |
| `onGlobalSearchInput` | window | 23254–23259 | 6 |
| `moveGlobalSearch` | function | 23260–23265 | 6 |
| `activateGlobalSearchResult` | window | 23266–23275 | 10 |
| `globalSearchOnKeydown` | function | 23276–23297 | 22 |
| `initGlobalSearch` | function | 23298–23302 | 5 |
| `rToolMenu` | function | 23324–23327 | 4 |
| `toolMenuElements` | function | 23328–23330 | 3 |
| `toolMenuItemElements` | function | 23331–23333 | 3 |
| `isToolMenuOpen` | function | 23334–23337 | 4 |
| `openToolMenu` | window | 23338–23345 | 8 |
| `closeToolMenu` | window | 23346–23352 | 7 |
| `toggleToolMenu` | window | 23353–23356 | 4 |
| `activateToolMenuItem` | window | 23357–23364 | 8 |
| `toolMenuOnKeydown` | function | 23365–23388 | 24 |
| `toolMenuOnClick` | function | 23389–23395 | 7 |
| `initToolMenu` | function | 23396–23399 | 4 |

## Alphabetisches Register

| Name | Art | Zeile |
|---|---|---|
| `_render` | function | 21739 |
| `acceptEinsatzCenterRosterSuggestion` | window | 7644 |
| `activateGlobalSearchResult` | window | 23266 |
| `activateToolMenuItem` | window | 23357 |
| `addComparisonDuo` | window | 13314 |
| `addComparisonDuoFromSelection` | window | 13306 |
| `addComparisonItem` | window | 13214 |
| `addDuoTeamGame` | function | 11199 |
| `addEinsatzCenterExistingGroup` | window | 7661 |
| `addEinsatzCenterGroupPlayer` | window | 7729 |
| `addEinsatzCenterNewGroup` | window | 7670 |
| `addEinsatzCenterRosterPlayer` | window | 7610 |
| `addGoalieGameToStats` | function | 4517 |
| `addGoalieSpecialTeamsGameToStats` | function | 4487 |
| `addLineupBuilderPlayerToActiveLine` | window | 2349 |
| `addLineupBuilderPlayerToLine` | window | 2339 |
| `addLineupPlayer` | window | 2285 |
| `addRosterImpactGameToStats` | function | 11734 |
| `addSelectedComparisonItem` | window | 13222 |
| `addSyntheticLineupPlayer` | window | 2365 |
| `addUnique` | function | 3699 |
| `aggregateAllTimeDuos` | function | 4863 |
| `aggregateAllTimePlayers` | function | 3966 |
| `aggregateAlltimeSpecialTeams` | function | 4467 |
| `aggregateGoalieAlltimeStats` | function | 4703 |
| `aggregateSeasonStats` | function | 4875 |
| `analysisCacheContext` | function | 2191 |
| `analysisCacheKey` | function | 2225 |
| `annotateSpecialTeamsGoalEvent` | function | 4246 |
| `antiSynergyDeltaClass` | function | 11969 |
| `antiSynergyImpactScore` | function | 11875 |
| `antiSynergyPartnerIsSgOnly` | function | 12021 |
| `antiSynergySigned` | function | 11973 |
| `appendSeasonGameDiagnostics` | function | 2561 |
| `applyAppHash` | function | 3494 |
| `applyCurrentSeasonCoverHighlight` | function | 6114 |
| `applyGlobalPageFromHash` | function | 3461 |
| `applySeasonContext` | function | 2426 |
| `applySeasonScoringToRegistry` | function | 3857 |
| `asOfCacheKeyPart` | function | 2219 |
| `asOfEquals` | function | 3165 |
| `assignStatus` | function | 5720 |
| `avgOrNull` | function | 4004 |
| `backToComparisonModeSelect` | window | 13242 |
| `backToHome` | window | 2402 |
| `buildAlltimePlayerDashModel` | function | 14381 |
| `buildAnnotatedGoalEventsForGame` | function | 10792 |
| `buildAppHash` | function | 3311 |
| `buildBalancedLineupSet` | function | 19132 |
| `buildBestThirdManOptions` | function | 10677 |
| `buildComparisonDataset` | function | 13683 |
| `buildComparisonExtraMetrics` | function | 13538 |
| `buildComparisonSummary` | function | 14047 |
| `buildConfidence` | function | 15592 |
| `buildDigitalCoachReport` | function | 18216 |
| `buildDirectDuoLookupForPlayer` | function | 10635 |
| `buildDryRunReport` | function | 6338 |
| `buildDuoAntiSynergy` | function | 11959 |
| `buildDuoComparison` | function | 13327 |
| `buildDuoCompatibility` | function | 11322 |
| `buildDuoDirectProduction` | function | 11175 |
| `buildDuoFloorCeiling` | function | 11086 |
| `buildDuoGapAnalysis` | function | 11294 |
| `buildDuoNetworkContext` | function | 11270 |
| `buildDuoOpponentAdjusted` | function | 11257 |
| `buildDuoProAnalysis` | function | 11381 |
| `buildDuoReplacementOptions` | function | 11369 |
| `buildDuoUntestedPotential` | function | 11345 |
| `buildDuoUsageRate` | function | 11357 |
| `buildDuoWarnings` | function | 11128 |
| `buildDuoWithWithoutImpact` | function | 11223 |
| `buildEinsatzCenterDraftExport` | function | 7790 |
| `buildFieldPlayerExplanation` | function | 15020 |
| `buildGlobalPageHash` | function | 3328 |
| `buildGoalieAnalysisModel` | function | 9593 |
| `buildGoalieComparisonDataset` | function | 13632 |
| `buildGoalieGameRecord` | function | 4569 |
| `buildGoaliePlayerExplanation` | function | 15095 |
| `buildGoalieRoleProfile` | function | 9819 |
| `buildGoalieStatsForSeason` | function | 4622 |
| `buildHallOfFameIntroTitle` | function | 8500 |
| `buildHashStringFromParsed` | function | 3343 |
| `buildIdentityProfiles` | function | 5442 |
| `buildLineAnalysis` | function | 18912 |
| `buildLineupAnalysis` | function | 18737 |
| `buildLineupExperienceProfile` | function | 18514 |
| `buildLineupIntelligence` | function | 18901 |
| `buildLineupOpponentDNAFit` | function | 18569 |
| `buildLineupRecommendations` | function | 19168 |
| `buildLineupScoreBreakdowns` | function | 18871 |
| `buildLockerRoomSheet` | function | 18249 |
| `buildMatchcenterStoryPreviewData` | function | 20834 |
| `buildMatchdayCaptionBlocks` | function | 18320 |
| `buildMatchIntelligence` | function | 18068 |
| `buildMatchIntelligenceFromContext` | function | 18013 |
| `buildMatchStories` | function | 18116 |
| `buildMomentumSwingStats` | function | 11080 |
| `buildMomentumSwingStatsRaw` | function | 11009 |
| `buildOpponentIntelligence` | function | 10474 |
| `buildOverviewCards` | function | 22916 |
| `buildPlayerDataFoundation` | function | 4892 |
| `buildPlayerEvents` | function | 4946 |
| `buildPlayerExplanation` | function | 15149 |
| `buildPlayerIdentity` | function | 3710 |
| `buildPlayerIntelligence` | function | 15158 |
| `buildRecencyWeightedGlobalIdentityProfile` | function | 12540 |
| `buildRegistry` | function | 4915 |
| `buildResponseGoalStats` | function | 10997 |
| `buildResponseGoalStatsRaw` | function | 10948 |
| `buildRosterImpactAnalysis` | function | 11890 |
| `buildRosterImpactGameIndex` | function | 11777 |
| `buildSeasonDataPreviewChanges` | function | 6443 |
| `buildSeasonDuos` | function | 4819 |
| `buildSeasonPlayerDashModel` | function | 14344 |
| `buildSocialMediaContent` | function | 18350 |
| `buildSoloDuoProfile` | function | 5207 |
| `buildSpecialTeamsForGame` | function | 4261 |
| `buildSpecialTeamsForSeason` | function | 4458 |
| `buildStaticSeasonDataBlock` | function | 6162 |
| `buildTeamLineBalance` | function | 19088 |
| `cachedAnalysis` | function | 2229 |
| `cancelDuoProPicker` | window | 11584 |
| `cancelEinsatzCenterEdit` | window | 7591 |
| `cancelHallOfFameIntro` | function | 8589 |
| `cancelSocialVideoRecording` | window | 19890 |
| `capSuperlativeLabel` | function | 15716 |
| `clampScore` | function | 15579 |
| `classicTagLabel` | function | 8743 |
| `classifyLineIdentity` | function | 18613 |
| `cleanupHallOfFameIntro` | function | 8529 |
| `clearAnalysisCache` | function | 2188 |
| `clearComparison` | window | 13233 |
| `clearComparisonDuos` | window | 13321 |
| `clearLineupAvailable` | window | 2338 |
| `clearLineupBuilderLine` | window | 2357 |
| `clearLineupPlayers` | window | 2292 |
| `clearlyAboveAverage` | function | 5399 |
| `clonePlain` | function | 4103 |
| `closeGlobalSearch` | window | 23246 |
| `closeMatchcenterStoryPreview` | window | 2257 |
| `closeToolMenu` | window | 23346 |
| `clutchText` | function | 5279 |
| `collectAssistEventRefs` | function | 2881 |
| `comparisonDuoContext` | function | 13247 |
| `comparisonEventGameKey` | function | 13525 |
| `comparisonEventPhaseLabel` | function | 13528 |
| `comparisonFmt` | function | 13015 |
| `comparisonItemKey` | function | 12993 |
| `comparisonJsArg` | function | 13004 |
| `comparisonNum` | function | 13007 |
| `comparisonOpponentStrengthTier` | function | 13532 |
| `comparisonPct` | function | 13011 |
| `comparisonPctFmt` | function | 13019 |
| `comparisonVariantValue` | function | 13136 |
| `composeIdentityText` | function | 5674 |
| `computeCurrentAppHash` | function | 3363 |
| `computeEinsatzCenterStats` | function | 6804 |
| `computeMetrics` | function | 5053 |
| `computeRosterStatus` | function | 5700 |
| `confidenceCautiousText` | function | 15638 |
| `confidenceFromSampleSize` | function | 11867 |
| `confirmDuoProSelection` | window | 11589 |
| `confirmEinsatzCenterCombo` | window | 7762 |
| `copyMatchcenterText` | window | 2259 |
| `countBy` | function | 10221 |
| `countCaptainAppearances` | function | 5682 |
| `countGoalieAppearances` | function | 5696 |
| `countMomentumClusters` | function | 5318 |
| `countPlayedUlmGames` | function | 2801 |
| `createPlayerAnalysisProfile` | function | 3636 |
| `createSeasonBucket` | function | 1813 |
| `datenstandQuoteState` | function | 22172 |
| `decodeHashSegmentSafe` | function | 3236 |
| `dedupeGamesById` | function | 15759 |
| `dedupeIdentityProfileTags` | function | 12617 |
| `deriveAsOfForSeason` | function | 3041 |
| `deriveLineupUlmPlayerIds` | function | 7301 |
| `deriveLineupValidPlayerIds` | function | 7277 |
| `derivePlayerStatus` | function | 3739 |
| `detectOverviewPhase` | function | 22672 |
| `detectSide` | const-arrow | 2517 |
| `detectTypes` | function | 5187 |
| `detectUlmSide` | function | 2510 |
| `diagnoseGameDuplicates` | function | 2539 |
| `diagnosticError` | function | 5935 |
| `diffGameIds` | function | 6285 |
| `difficultConnectionConfidence` | function | 10611 |
| `discardEinsatzCenterAutosave` | function | 7200 |
| `discardSeasonDataPreview` | function | 6542 |
| `dismissEinsatzCenterRosterSuggestion` | window | 7633 |
| `downloadMatchdayStory` | window | 19756 |
| `downloadSocialVideoContactSheet` | window | 21171 |
| `downloadSocialVideoStandbild` | window | 21147 |
| `duoProContextSeasonKey` | function | 11150 |
| `duoProDomId` | function | 11545 |
| `duoProPairKey` | function | 11147 |
| `duoProPickerMessage` | function | 11551 |
| `duoProPickerOpen` | function | 11548 |
| `duoProPlayer` | function | 11164 |
| `duoProResolveCandidate` | function | 11564 |
| `duoProSelectionPayload` | function | 11573 |
| `duoScopeSeasonKeys` | function | 10653 |
| `einsatzCenterAutosaveDraft` | function | 7116 |
| `einsatzCenterAutosaveInfoText` | function | 7222 |
| `einsatzCenterAutosaveKey` | function | 7027 |
| `einsatzCenterCanonicalJson` | function | 7360 |
| `einsatzCenterComputeBaseHash` | function | 7375 |
| `einsatzCenterCurrentRawBaseHash` | function | 7102 |
| `einsatzCenterDeserializeAutosave` | function | 7062 |
| `einsatzCenterDraftInView` | function | 6931 |
| `einsatzCenterDraftIsEmpty` | function | 7039 |
| `einsatzCenterDraftStaleHint` | function | 6945 |
| `einsatzCenterInspectAutosave` | function | 7151 |
| `einsatzCenterIsPlainObject` | function | 7056 |
| `einsatzCenterSerializeDraft` | function | 7043 |
| `einsatzCenterSha256Hex` | function | 7370 |
| `einsatzCenterSoftIssues` | function | 7384 |
| `einsatzCenterStorageRead` | function | 7028 |
| `einsatzCenterStorageRemove` | function | 7034 |
| `einsatzCenterStorageWrite` | function | 7031 |
| `emptyDuoTeamImpactStats` | function | 11196 |
| `emptyFieldRoleSeasonStats` | function | 3695 |
| `emptyGoalieAlltimeStats` | function | 3668 |
| `emptyGoalieSeasonStats` | function | 3646 |
| `emptyGoalieSpecialTeamsStats` | function | 3683 |
| `emptyPlayerSeasonStats` | function | 3640 |
| `emptyRosterImpactStats` | function | 11723 |
| `emptySpecialTeamsStats` | function | 4062 |
| `ensureAppLoaded` | function | 8443 |
| `ensureEinsatzCenterDraft` | function | 6967 |
| `ensureExternalSeasonData` | function | 6140 |
| `ensureFieldRoleSeasonStats` | function | 3805 |
| `ensureGlobalDataLoaded` | function | 8371 |
| `ensureGoalieSeasonStats` | function | 3800 |
| `ensureHallOfFameIntroOverlay` | function | 8467 |
| `ensureLineupDataLoaded` | function | 6650 |
| `ensureLineupGroupsRegistryLoaded` | function | 6675 |
| `ensureRmDuo` | function | 10928 |
| `ensureRmPlayer` | function | 10922 |
| `ensureSocialVideoExportCapabilityChecked` | function | 21128 |
| `escAttr` | function | 8716 |
| `escHtml` | function | 12636 |
| `eventMatchesTeams` | function | 5273 |
| `explainScore` | function | 15642 |
| `exportEinsatzCenterDraft` | window | 7804 |
| `exportExcel` | function | 21690 |
| `fallbackIdentityProfile` | function | 8751 |
| `fetchJson` | function | 5979 |
| `fetchJsonLegacy` | function | 5911 |
| `fetchJsonWithDiagnostics` | function | 5970 |
| `fetchSeasonGameRaw` | function | 6005 |
| `fetchTextWithDiagnostics` | function | 5940 |
| `fileNameForLineupSeasonKey` | function | 6632 |
| `filterComparisonDuoSuggestions` | window | 13279 |
| `filterComparisonPlayers` | window | 13190 |
| `filterLineupBuilderAvailable` | window | 2386 |
| `filterLineupPlayers` | window | 2293 |
| `filterPlayerSuggestions` | function | 13254 |
| `filterPureSGPlayers` | function | 9389 |
| `finalizeDuoTeamImpactStats` | function | 11215 |
| `finalizeGoalieSeasonStats` | function | 4502 |
| `finalizeMomentumStats` | function | 11003 |
| `finalizePlayerRegistrySeason` | function | 3880 |
| `finalizeResponseStats` | function | 10934 |
| `finalizeRosterImpactStats` | function | 11726 |
| `finalizeSpecialTeamsStats` | function | 4106 |
| `findDuplicateGameIds` | function | 6204 |
| `findLineupGameContext` | function | 6709 |
| `findLoadedSeasonPlayer` | function | 9352 |
| `finishHallOfFameIntro` | function | 8556 |
| `finiteNumbers` | function | 4001 |
| `fitMatchcenterStoryLayout` | function | 21077 |
| `fixMojibakeText` | function | 2463 |
| `formatDiagnosticAttempt` | function | 5986 |
| `formatGameLoadError` | function | 5999 |
| `formatStatus` | function | 5983 |
| `gameClassificationStatusLabel` | function | 2553 |
| `gameDaySortValue` | function | 4172 |
| `gameResult` | function | 3594 |
| `generatePlayerInsights` | function | 9214 |
| `generateSocialVideoContactSheets` | window | 19917 |
| `generateSocialVideoStandbilder` | window | 19893 |
| `generateSocialVideoVideos` | window | 19848 |
| `getActiveAlltimeSeasonKeys` | function | 10393 |
| `getActiveSeasonKey` | function | 2414 |
| `getAllLoadedSeasonGames` | function | 10586 |
| `getAlltimeAggregatedStyleProfile` | function | 14224 |
| `getAllTimeCoverStats` | function | 8322 |
| `getAllTimeDuoRows` | function | 10541 |
| `getAllTimeDuoRowsForPlayer` | function | 10279 |
| `getAllTimeGamesPlayedRows` | function | 10319 |
| `getAllTimeIdentityStandings` | function | 12504 |
| `getAllTimeMainPlayerRows` | function | 9393 |
| `getAllTimeOpponentIntelligence` | function | 12425 |
| `getAllTimeOpponentNames` | function | 2492 |
| `getAllTimeOpponentTopScorers` | function | 12433 |
| `getAllTimePenaltyRows` | function | 10344 |
| `getAllTimePlayerRows` | function | 9361 |
| `getAlltimeRank` | function | 12949 |
| `getAlltimeRecencyWeight` | function | 10404 |
| `getAllTimeSgOnlyRows` | function | 9396 |
| `getAssistDiagnostics` | function | 4764 |
| `getAssistPlayersFromEvent` | function | 2909 |
| `getCarryPerformanceRows` | function | 10290 |
| `getComparisonAlltimeTeamGoals` | function | 13040 |
| `getComparisonAlltimeTrend` | function | 13114 |
| `getComparisonChemistryFromEvents` | function | 13048 |
| `getComparisonClutchFromEvents` | function | 13053 |
| `getComparisonCurrentSelection` | function | 13179 |
| `getComparisonEventsForItem` | function | 13497 |
| `getComparisonPlayerOptions` | function | 13121 |
| `getComparisonPlayerRow` | function | 13022 |
| `getComparisonProfile` | function | 13083 |
| `getComparisonRosterGames` | function | 13517 |
| `getComparisonRosterGamesForSeason` | function | 13500 |
| `getComparisonSeasonEvents` | function | 13043 |
| `getComparisonSeasonLabel` | function | 13025 |
| `getComparisonSeasonTrend` | function | 13088 |
| `getComparisonStyleProfile` | function | 13058 |
| `getComparisonTeamGoalsForSeason` | function | 13028 |
| `getComparisonVariantsForPlayer` | function | 13139 |
| `getDifficultConnectionRowsForPlayer` | function | 11678 |
| `getDuoDirectScorerGameCounts` | function | 10711 |
| `getDuoFieldPlayerRows` | function | 11153 |
| `getDuoRowsForPlayerScope` | function | 10616 |
| `getDuoScorerCountsWithCandidate` | function | 10657 |
| `getDuoSharedFieldRows` | function | 11169 |
| `getEffectiveLineupData` | function | 6917 |
| `getEinsatzCenterGameDraft` | function | 6989 |
| `getEmptyState` | function | 15693 |
| `getFieldGameIdsForPlayer` | function | 2710 |
| `getFurtherSameDayUlmGames` | function | 4188 |
| `getGameDurationMinutes` | function | 4167 |
| `getGameId` | function | 6198 |
| `getGlobalAllTimeSnapshot` | function | 2418 |
| `getGlobalIdentityProfile` | function | 12589 |
| `getGlobalLoadableSeasonKeys` | function | 8315 |
| `getGlobalOpponentSpecialistProfile` | function | 14680 |
| `getGlobalPlayerBestSeason` | function | 10272 |
| `getGlobalPlayerMilestones` | function | 10455 |
| `getGlobalPlayerOpponentGameRows` | function | 14651 |
| `getGlobalPlayerPeakGame` | function | 10261 |
| `getGlobalPlayerTeamRecord` | function | 10235 |
| `getGlobalProfileEvents` | function | 10208 |
| `getGlobalRookieMilestone` | function | 10444 |
| `getGlobalRookieSeasonKey` | function | 10430 |
| `getGlobalSeasonStatRows` | function | 12933 |
| `getGlobalTopScorerMilestones` | function | 10417 |
| `getGoalieComparisonAlltimeTrend` | function | 13596 |
| `getGoalieComparisonSeasonTrend` | function | 13613 |
| `getGoalieDiagnostics` | function | 4750 |
| `getGoalieDnaRows` | function | 9897 |
| `getGoalieGameIdsForPlayer` | function | 2717 |
| `getGoalieOpponentName` | function | 4043 |
| `getGoalieOpponentTier` | function | 4047 |
| `getGoalScorerFromEvent` | function | 2875 |
| `getHallGoalieData` | function | 12799 |
| `getHallOfFamePlayerIdSet` | function | 10204 |
| `getHallOfFamePlayerRows` | function | 10201 |
| `getHallOfFameStats` | function | 12459 |
| `getJerseyNumber` | function | 2814 |
| `getLineupAllRows` | function | 18430 |
| `getLineupPlayerPool` | function | 18441 |
| `getLoadedSeasonPlayerUi` | function | 10230 |
| `getLoadedSeasonPointsByName` | function | 10174 |
| `getMatchcenterDirectOpponents` | function | 15834 |
| `getMatchcenterOpponents` | function | 15801 |
| `getOppStrength` | function | 3607 |
| `getOrCreatePlayerProfile` | function | 3748 |
| `getPenaltyBasePersonalMinutes` | function | 4203 |
| `getPenaltyDisciplineMinutes` | function | 4221 |
| `getPenaltyDisciplineType` | function | 4159 |
| `getPenaltyPersonalMinutes` | function | 4211 |
| `getPenaltySpecialTeamsMinutes` | function | 4200 |
| `getPhaseIndex` | function | 5038 |
| `getPlayedUlmGames` | function | 2792 |
| `getPlayerAlltimeFieldGames` | function | 2754 |
| `getPlayerAlltimeGoalieGames` | function | 2757 |
| `getPlayerAlltimeRoleGames` | function | 2735 |
| `getPlayerAlltimeStats` | function | 9404 |
| `getPlayerAlltimeTotalGames` | function | 2760 |
| `getPlayerFieldGames` | function | 2724 |
| `getPlayerGoalieAlltimeStats` | function | 9425 |
| `getPlayerGoalieGames` | function | 2728 |
| `getPlayerGoalieSeasonStats` | function | 9420 |
| `getPlayerRegistryProfile` | function | 9412 |
| `getPlayerRoleAvailability` | function | 9455 |
| `getPlayerSeasonRoleGameSummary` | function | 2769 |
| `getPlayerSeasonStats` | function | 9399 |
| `getPlayerSourceId` | function | 2811 |
| `getPreClubHistoryPlayerNames` | function | 2530 |
| `getPreviousSeasonKey` | function | 10129 |
| `getRosterEntryRegistryProfile` | function | 10607 |
| `getRosterGameIdsForPlayer` | function | 2651 |
| `getRosterImpactPlayerEventLookup` | function | 11744 |
| `getRosterImpactPlayerGames` | function | 11815 |
| `getRosterStatus` | function | 10410 |
| `getScoreLabel` | function | 15583 |
| `getSeasonApiBaseUrl` | function | 1838 |
| `getSeasonDataPreview` | function | 6548 |
| `getSeasonDataState` | function | 22704 |
| `getSeasonIdentityProfile` | function | 10364 |
| `getSeasonmanagerRosterSuggestion` | function | 7331 |
| `getSeasonOriginBaseUrl` | function | 1858 |
| `getSeasonPlayerFieldBasis` | function | 8820 |
| `getSeasonScopedIdentityProfile` | function | 8847 |
| `getSeasonTeamGameIds` | function | 2808 |
| `getSeasonTeamGames` | function | 2804 |
| `getSeasonUiPlayerForProfile` | function | 10360 |
| `getSpecialTeamsDiagnostics` | function | 4757 |
| `getSpecialTeamsPenaltyChunks` | function | 4224 |
| `getStaticSeasonGames` | function | 6048 |
| `getStoredLastView` | function | 3442 |
| `getSyntheticLineupPlayers` | function | 18407 |
| `getSyntheticLineupRow` | function | 18410 |
| `getSyntheticLineupRows` | function | 18427 |
| `getTeamAllTimeRecords` | function | 12383 |
| `getTeamLogoUrlForStory` | function | 20411 |
| `getUlmTeamStatus` | function | 2505 |
| `getUniqueAllTimeOpponentNames` | function | 2500 |
| `globalSearchEntries` | function | 23126 |
| `globalSearchIsEditableTarget` | function | 23175 |
| `globalSearchKeyAction` | function | 23181 |
| `globalSearchMatch` | function | 23163 |
| `globalSearchMatchdayScore` | function | 23149 |
| `globalSearchOnKeydown` | function | 23276 |
| `globalSearchPlayerScore` | function | 23140 |
| `globalSearchTokens` | function | 23121 |
| `goalieApplySampleConfidence` | function | 9578 |
| `goalieBucketLooseSum` | function | 9586 |
| `goalieBucketRows` | function | 9498 |
| `goalieClampScore` | function | 9543 |
| `goalieDetailFirstTime` | function | 9522 |
| `goalieDnaKey` | function | 9806 |
| `goalieDnaValue` | function | 9811 |
| `goalieEntryRecognitionReason` | function | 2674 |
| `goalieEventAbsSeconds` | function | 4023 |
| `goalieEventSecondInPeriod` | function | 9529 |
| `goalieGameDurationSeconds` | function | 4026 |
| `goalieGameStateBeforeGoal` | function | 4031 |
| `goalieInverseScore` | function | 9547 |
| `goalieNum` | function | 9484 |
| `goaliePctText` | function | 9535 |
| `goaliePositiveCurveScore` | function | 9563 |
| `goaliePositiveScore` | function | 9555 |
| `goalieSafeNum` | function | 9539 |
| `goalieStateGoals` | function | 9818 |
| `goalieStdDev` | function | 9516 |
| `goalieTierMeta` | function | 9507 |
| `goalieTime` | function | 9490 |
| `goalieTopRow` | function | 9504 |
| `goalieWeightedScore` | function | 9572 |
| `goToMainNavPoint` | window | 22390 |
| `hallGoalieExplainForLabel` | function | 12836 |
| `hallGoalieNameHtml` | function | 12815 |
| `hallGoalieNum` | function | 12701 |
| `hallGoaliePkStats` | function | 12727 |
| `hallGoalieRowFromStats` | function | 12766 |
| `hallGoalieSeasonLabel` | function | 12715 |
| `hallGoalieSeasonScore` | function | 12746 |
| `hallGoalieTime` | function | 12707 |
| `hallGoalieTooltip` | function | 12832 |
| `hallGoalieTopteamStats` | function | 12739 |
| `handleComparisonDuoSearchKey` | window | 13287 |
| `hasEmbeddedSeasonData` | function | 8312 |
| `hashSegmentToSeasonKey` | function | 3149 |
| `hasSeasonRole` | function | 5426 |
| `hasSeasonSource` | function | 8308 |
| `hofIntroDelay` | function | 8464 |
| `identityClutchGoalsVsTeams` | function | 5309 |
| `identityDecisiveGoalsVsTeams` | function | 5312 |
| `identityGoalsVsTeams` | function | 5306 |
| `identityInputs` | function | 5341 |
| `identityLateGoalsVsTeams` | function | 5315 |
| `identityOpponentGroups` | function | 5265 |
| `identityPartnerStats` | function | 5251 |
| `identityPointsVsTeams` | function | 5303 |
| `incGoalieBucket` | function | 4014 |
| `incrementUniqueCounter` | function | 3703 |
| `initGlobalSearch` | function | 23298 |
| `initHashRouting` | function | 3573 |
| `initToolMenu` | function | 23396 |
| `invalidateGlobalIdentityCache` | function | 2243 |
| `isActiveAlltimeSeasonStats` | function | 10379 |
| `isComebackRelevantGoal` | function | 5299 |
| `isDecisiveGoal` | function | 5285 |
| `isEinsatzCenterGameFromDraft` | function | 6926 |
| `isExcludedGoalieAppearance` | function | 2684 |
| `isFieldAppearance` | function | 2704 |
| `isGamePlayed` | function | 3008 |
| `isGoalieAppearance` | function | 2698 |
| `isGoalieRosterEntry` | function | 2660 |
| `isHallOfFameEligiblePlayer` | function | 10195 |
| `isHallRowPureSG` | function | 12716 |
| `isImportantClutchGoal` | function | 5280 |
| `isLateGoal` | function | 5293 |
| `isMatchPenaltyEvent` | function | 4151 |
| `isNewSeasonDataState` | function | 22725 |
| `isPenaltyGoalEvent` | function | 4234 |
| `isPreClubHistoryPlayerName` | function | 2533 |
| `isPureSGPlayer` | function | 9385 |
| `isRookieCandidateForSeason` | function | 10164 |
| `isSameUlmTeamContext` | function | 4180 |
| `isSeasonDataPreviewStale` | function | 6556 |
| `isSgOnlyAlltimePlayer` | function | 9377 |
| `isSgOnlyHallOfFameExcluded` | function | 10186 |
| `isSyntheticLineupPlayerId` | function | 18404 |
| `isToolMenuOpen` | function | 23334 |
| `isTwoPlusTwoPenaltyEvent` | function | 4155 |
| `isUsableExternalSeasonData` | function | 6131 |
| `isValidAsOfDate` | function | 3153 |
| `isValidAsOfStartTime` | function | 3156 |
| `isVisibleSecondaryTrait` | function | 8722 |
| `kpiBadge` | function | 14005 |
| `kpiDelta` | function | 13724 |
| `kpiItemColor` | function | 13730 |
| `kpiNiceMax` | function | 13895 |
| `kpiRadarValue` | function | 13818 |
| `kpiTrendRows` | function | 13901 |
| `kpiValueText` | function | 13720 |
| `lexiconEntry` | function | 15389 |
| `lexiconUniqueKeys` | function | 15381 |
| `lineupAverage` | function | 18456 |
| `lineupBuilderPoolIds` | function | 2300 |
| `lineupCombinationIds` | function | 18933 |
| `lineupDirectChemistryScore` | function | 18977 |
| `lineupEvaluateComplementCandidate` | function | 18984 |
| `lineupGroupDisplayName` | function | 6835 |
| `lineupLevelLabel` | function | 18460 |
| `lineupOpponentDNAForContext` | function | 18557 |
| `lineupPlayerAnchorConfidence` | function | 19083 |
| `lineupPlayerAnchorScore` | function | 19063 |
| `lineupPlayerProfile` | function | 18661 |
| `lineupRankCandidateIds` | function | 18918 |
| `lineupRecommendationReason` | function | 19159 |
| `lineupRoleDnaComplementScore` | function | 18953 |
| `lineupRosterGamesForPlayer` | function | 18466 |
| `lineupRowMap` | function | 18915 |
| `lineupRowMeta` | function | 18433 |
| `lineupScore` | function | 18450 |
| `lineupStdDev` | function | 18947 |
| `linkUiPlayersToRegistry` | function | 3835 |
| `loadEinsatzCenterMismatchedAutosave` | function | 7246 |
| `loadSeason` | function | 8388 |
| `loadSeasonData` | function | 7831 |
| `loadSeasonForGlobal` | function | 8340 |
| `loadSeasonManifest` | function | 6063 |
| `mainNavActiveKeyForPage` | function | 22384 |
| `markFieldRoleAppearance` | function | 3810 |
| `matchcenterAddDuoConnection` | function | 16236 |
| `matchcenterAddPlanItem` | function | 17453 |
| `matchcenterAddPlanWatch` | function | 17459 |
| `matchcenterAddUlmDuoConnection` | function | 16387 |
| `matchcenterAddUlmScoring` | function | 16014 |
| `matchcenterAnalyzeDirect` | function | 15867 |
| `matchcenterAnalyzeForm` | function | 15904 |
| `matchcenterBuildCoachActivationHints` | function | 18201 |
| `matchcenterBuildCoachAvoidList` | function | 18191 |
| `matchcenterBuildCoachDangerPatterns` | function | 18173 |
| `matchcenterBuildCoachHints` | function | 17929 |
| `matchcenterBuildCoachIfThen` | function | 18181 |
| `matchcenterBuildCoachKeyActors` | function | 18208 |
| `matchcenterBuildCoachLevers` | function | 18163 |
| `matchcenterBuildCoachPriorities` | function | 18156 |
| `matchcenterBuildGoalieMatchup` | function | 16588 |
| `matchcenterBuildInsights` | function | 16875 |
| `matchcenterBuildIntelHeadline` | function | 17945 |
| `matchcenterBuildIntelligenceDataQuality` | function | 17561 |
| `matchcenterBuildIntelligenceSignals` | function | 17966 |
| `matchcenterBuildIntelListFromPlan` | function | 17920 |
| `matchcenterBuildMatchPlan` | function | 19278 |
| `matchcenterBuildOneThingToWatch` | function | 17953 |
| `matchcenterBuildOpponentAlarm` | function | 17810 |
| `matchcenterBuildOpponentDNA` | function | 17631 |
| `matchcenterBuildOpponentDuoInsights` | function | 16335 |
| `matchcenterBuildOpponentDuos` | function | 16290 |
| `matchcenterBuildPlanConfidence` | function | 17465 |
| `matchcenterBuildSpecialTeamsMatchup` | function | 16518 |
| `matchcenterBuildTimingAnalysis` | function | 16714 |
| `matchcenterBuildTimingInsights` | function | 16703 |
| `matchcenterBuildUlmDuoInsights` | function | 16485 |
| `matchcenterBuildUlmDuos` | function | 16442 |
| `matchcenterBuildUlmPlayerInsights` | function | 16179 |
| `matchcenterBuildUlmPlayerScouting` | function | 16124 |
| `matchcenterClassifyUlmGoalEvent` | function | 16003 |
| `matchcenterCoachAdd` | function | 18093 |
| `matchcenterCoachCautious` | function | 18090 |
| `matchcenterCoachGameModel` | function | 18102 |
| `matchcenterCoachPriorityFromAlarm` | function | 18146 |
| `matchcenterConfidenceClass` | function | 17440 |
| `matchcenterDateLabel` | function | 15743 |
| `matchcenterDefaultSeasonKey` | function | 15781 |
| `matchcenterDeriveOpponentType` | function | 17744 |
| `matchcenterDirectContextGames` | function | 16498 |
| `matchcenterDuoDirectionLabel` | function | 16229 |
| `matchcenterDuoPairKey` | function | 16192 |
| `matchcenterEmptyBuckets` | function | 15944 |
| `matchcenterEmptyTimingStats` | function | 16649 |
| `matchcenterEnsureOpponentDuo` | function | 16196 |
| `matchcenterEnsureUlmDuo` | function | 16349 |
| `matchcenterEnsureUlmPlayer` | function | 15952 |
| `matchcenterFinalizeOpponentDuos` | function | 16255 |
| `matchcenterFinalizeUlmDuos` | function | 16406 |
| `matchcenterFinalizeUlmPlayers` | function | 16055 |
| `matchcenterFormLine` | function | 16870 |
| `matchcenterGameLine` | function | 16864 |
| `matchcenterGoalAbsSeconds` | function | 16636 |
| `matchcenterGoalieFitScore` | function | 16571 |
| `matchcenterGoalieKey` | function | 16566 |
| `matchcenterInferPriority` | function | 17446 |
| `matchcenterIntelAddAlarm` | function | 17789 |
| `matchcenterIntelCurve` | function | 17513 |
| `matchcenterIntelDataLabel` | function | 17558 |
| `matchcenterIntelDuoRef` | function | 17775 |
| `matchcenterIntelInverseCurve` | function | 17519 |
| `matchcenterIntelPct` | function | 17538 |
| `matchcenterIntelPlayerRef` | function | 17762 |
| `matchcenterIntelPriorityClass` | function | 17548 |
| `matchcenterIntelPriorityFromScore` | function | 17542 |
| `matchcenterIntelPriorityLabel` | function | 17554 |
| `matchcenterIntelRate` | function | 17534 |
| `matchcenterIntelWeighted` | function | 17523 |
| `matchcenterIsFreiburgTuebingenTeamName` | function | 15768 |
| `matchcenterOpponentMode` | function | 15798 |
| `matchcenterPct` | function | 16514 |
| `matchcenterPersonalPenaltyMinutesForSide` | function | 16505 |
| `matchcenterPlanRateText` | function | 17432 |
| `matchcenterPlanScoreText` | function | 17428 |
| `matchcenterPriorityLabel` | function | 17437 |
| `matchcenterRegisterUlmProfileGame` | function | 15990 |
| `matchcenterResultClass` | function | 16855 |
| `matchcenterSeasonHasGames` | function | 15778 |
| `matchcenterSigned` | function | 15737 |
| `matchcenterSocialAdd` | function | 18270 |
| `matchcenterSocialCaption` | function | 18277 |
| `matchcenterSpecialTeamsForGame` | function | 16501 |
| `matchcenterStoryAddCandidate` | function | 20515 |
| `matchcenterStoryAddFact` | function | 20496 |
| `matchcenterStoryBestClutchDuo` | function | 20740 |
| `matchcenterStoryBestClutchPlayer` | function | 20696 |
| `matchcenterStoryCandidateForBudget` | function | 20553 |
| `matchcenterStoryCategoryForPlanFact` | function | 20825 |
| `matchcenterStoryCategoryLimit` | function | 20538 |
| `matchcenterStoryClutchFact` | function | 20673 |
| `matchcenterStoryClutchPriority` | function | 20774 |
| `matchcenterStoryCompetitionLabel` | function | 20777 |
| `matchcenterStoryCurrentStreak` | function | 20620 |
| `matchcenterStoryDirectFactCandidates` | function | 20790 |
| `matchcenterStoryDownloadFileName` | function | 19746 |
| `matchcenterStoryDuoClutchFact` | function | 20750 |
| `matchcenterStoryDuoClutchTotal` | function | 20732 |
| `matchcenterStoryDuoFact` | function | 20753 |
| `matchcenterStoryEstimateFactWeight` | function | 20509 |
| `matchcenterStoryFactKey` | function | 20503 |
| `matchcenterStoryFormFact` | function | 20638 |
| `matchcenterStoryFormFactCandidates` | function | 20649 |
| `matchcenterStoryInlineStat` | function | 20478 |
| `matchcenterStoryLastDuelLabel` | function | 20786 |
| `matchcenterStoryLateGoalsForOutcome` | function | 20669 |
| `matchcenterStoryLogoBase` | function | 20390 |
| `matchcenterStoryLogoForOpponent` | function | 20441 |
| `matchcenterStoryLooksArtificial` | function | 20506 |
| `matchcenterStoryNameClass` | function | 20946 |
| `matchcenterStoryNormalizePickOptions` | function | 20542 |
| `matchcenterStoryPickFactItems` | function | 20563 |
| `matchcenterStoryPickFacts` | function | 20616 |
| `matchcenterStoryPlanFactCandidates` | function | 20812 |
| `matchcenterStoryPlayerClutchFact` | function | 20706 |
| `matchcenterStoryPlayerClutchTotal` | function | 20688 |
| `matchcenterStoryRankRows` | function | 20482 |
| `matchcenterStoryRankText` | function | 20474 |
| `matchcenterStorySafeLogoUrl` | function | 20396 |
| `matchcenterStoryShortDuel` | function | 20781 |
| `matchcenterStoryTableRank` | function | 20456 |
| `matchcenterStoryUlmTableRank` | function | 20467 |
| `matchcenterStoryVisibleFacts` | function | 20952 |
| `matchcenterStoryWinlessStreak` | function | 20629 |
| `matchcenterTimeValue` | function | 16641 |
| `matchcenterTimingStatsForGames` | function | 16665 |
| `matchcenterUlmScoutingConfidence` | function | 15947 |
| `matchcenterUlmTeamLabelForGame` | function | 16859 |
| `matchcenterUpdateUlmSeasonRow` | function | 15996 |
| `matchcenterWindowForSecond` | function | 16658 |
| `matchdayFixtureCardHtml` | function | 22566 |
| `matchdayGameCardHtml` | function | 22541 |
| `matchdayLineupCardHtml` | function | 22534 |
| `matchdayLineupInfo` | function | 22522 |
| `matchdayUlmGames` | function | 22513 |
| `medianOrNull` | function | 4008 |
| `mergeDuoSet` | function | 4846 |
| `mergeGoalieSpecialTeamsStats` | function | 4475 |
| `mergeSpecialTeamsStats` | function | 4116 |
| `moveGlobalSearch` | function | 23260 |
| `normalizeAssistPlayerName` | function | 2878 |
| `normalizeComparisonItem` | function | 12999 |
| `normalizeDuoComparisonItem` | function | 13243 |
| `normalizeEventPlayerRef` | function | 2817 |
| `normalizeLineupLines` | function | 2303 |
| `normalizePlayerName` | function | 2520 |
| `normalizeSecondaryTraits` | function | 5400 |
| `onGlobalSearchInput` | window | 23254 |
| `openAllTimePlayers` | window | 8456 |
| `openComparisonCenter` | window | 8626 |
| `openDuoProPicker` | window | 11583 |
| `openEinsatzCenter` | window | 6786 |
| `openGlobalSearch` | window | 23221 |
| `openHallOfFame` | window | 8602 |
| `openLexicon` | window | 8699 |
| `openLigaGegner` | window | 22978 |
| `openLineupBuilder` | window | 8677 |
| `openMatchcenter` | window | 8655 |
| `openMatchcenterStoryPreview` | window | 2256 |
| `openMatchday` | window | 22495 |
| `openMatchdayTimeline` | window | 22487 |
| `openOverview` | window | 22436 |
| `openSeason` | window | 8453 |
| `openToolMenu` | window | 23338 |
| `overviewCompactTableHtml` | function | 22795 |
| `overviewCrossSeasonTrendHtml` | function | 22854 |
| `overviewFormHtml` | function | 22813 |
| `overviewLastMatchdayText` | function | 22761 |
| `overviewLineupLinkHtml` | function | 22871 |
| `overviewMatchcenterLinkHtml` | function | 22868 |
| `overviewMatchdayEndMs` | function | 22666 |
| `overviewMatchdayStartMs` | function | 22660 |
| `overviewNextMatchdayHtml` | function | 22771 |
| `overviewOpponentLabel` | function | 22749 |
| `overviewOpponentPreviewHtml` | function | 22863 |
| `overviewRankChangeTile` | function | 22890 |
| `overviewRecordHtml` | function | 22847 |
| `overviewSeasonAwardHtml` | function | 22836 |
| `overviewSeasonBilanzHtml` | function | 22828 |
| `p1NarrativeKey` | function | 15657 |
| `paintGlobalSearchResults` | function | 23213 |
| `parseAppHash` | function | 3256 |
| `parseAsOfQueryValue` | function | 3295 |
| `parseComparisonVariant` | function | 13164 |
| `parseLastViewState` | function | 3430 |
| `parseSeasonDataState` | function | 22715 |
| `pct` | function | 5204 |
| `pctValue` | function | 12639 |
| `pdashBestPhase` | function | 14291 |
| `pdashInsight` | function | 14329 |
| `pdashInsights` | function | 14332 |
| `pdashNum` | function | 14275 |
| `pdashOpponentStrength` | function | 14309 |
| `pdashOpponentTier` | function | 14303 |
| `pdashPct` | function | 14279 |
| `pdashPhaseLabel` | function | 14283 |
| `pdashTopCount` | function | 14287 |
| `pdashTopOpponent` | function | 14299 |
| `pdashTopPartner` | function | 14295 |
| `penaltyRawText` | function | 4148 |
| `playerAppearedForUlmStatusInSeasonByName` | function | 10145 |
| `playerAppearedInSeasonByName` | function | 10134 |
| `playerExplainAdd` | function | 14965 |
| `playerExplainConfidence` | function | 14956 |
| `playerExplainConfidenceLabel` | function | 14962 |
| `playerExplainContextSentence` | function | 15001 |
| `playerExplainHeadline` | function | 14991 |
| `playerExplainRolePhrase` | function | 14982 |
| `playerExplainStyleSignature` | function | 14970 |
| `processGame` | function | 2942 |
| `rAlltimeKpis` | function | 12955 |
| `rAlltimePlayerDashboard` | function | 14484 |
| `rAllTimePlayersPage` | function | 15246 |
| `rankNarratives` | function | 15679 |
| `rAntiSynergyCompareChip` | function | 11978 |
| `rAntiSynergyDelta` | function | 11962 |
| `rAntiSynergyMainDelta` | function | 12025 |
| `rAntiSynergyMetricRow` | function | 11986 |
| `rAntiSynergyWinrateRow` | function | 12008 |
| `rAntiSynergyWinrateText` | function | 12002 |
| `rAsOfSelector` | function | 22999 |
| `ratio01` | function | 5205 |
| `rAvgResponseTimeNote` | function | 12259 |
| `rCarryPerformanceRows` | function | 10306 |
| `rClassicRoleTags` | function | 8808 |
| `rClassicTagTip` | function | 8746 |
| `rClutch` | function | 9014 |
| `rClutchBadge` | function | 8708 |
| `rComparisonCenterPage` | function | 14154 |
| `rComparisonDashboard` | function | 14105 |
| `rComparisonDuoSearchBox` | function | 13473 |
| `rComparisonDuoSuggestionButtons` | function | 13266 |
| `rComparisonMiniOverview` | function | 14093 |
| `rComparisonModeSelect` | function | 13494 |
| `rComparisonRoles` | function | 14097 |
| `rComparisonStyles` | function | 14116 |
| `rContextBar` | function | 23082 |
| `rDifficultConnectionList` | function | 12035 |
| `rDifficultConnectionListCompact` | function | 12102 |
| `rDifficultConnectionListCompactLegacy` | function | 12060 |
| `rDifficultConnectionsCard` | function | 12141 |
| `rDuoCenterPro` | function | 11425 |
| `rDuoCompareSummaryCards` | function | 13352 |
| `rDuoComparisonBars` | function | 13347 |
| `rDuoComparisonChemistry` | function | 13405 |
| `rDuoComparisonContext` | function | 13437 |
| `rDuoComparisonDashboard` | function | 13459 |
| `rDuoComparisonDetails` | function | 13455 |
| `rDuoComparisonImpact` | function | 13421 |
| `rDuoComparisonPage` | function | 13483 |
| `rDuoComparisonProfile` | function | 13383 |
| `rDuoProPlayerSelect` | function | 11612 |
| `rDuoResponseMomentumCard` | function | 12317 |
| `rDuoRows` | function | 10565 |
| `recommendLineComplements` | function | 19250 |
| `recordOverviewVisit` | function | 22734 |
| `registerPlayerIdentity` | function | 3782 |
| `registerSeasonRosters` | function | 3815 |
| `rEinsatzCenterAutosaveBanner` | function | 7208 |
| `rEinsatzCenterCombo` | function | 6731 |
| `rEinsatzCenterComboEditor` | function | 7436 |
| `rEinsatzCenterDraftBanner` | function | 6949 |
| `rEinsatzCenterDraftMark` | function | 6935 |
| `rEinsatzCenterDraftStatsHint` | function | 6939 |
| `rEinsatzCenterEditPage` | function | 7536 |
| `rEinsatzCenterGameCard` | function | 6740 |
| `rEinsatzCenterGameEditor` | function | 7483 |
| `rEinsatzCenterGroup` | function | 6718 |
| `rEinsatzCenterGroupEditor` | function | 7405 |
| `rEinsatzCenterPage` | function | 6759 |
| `rEinsatzCenterRosterSuggestionCard` | function | 7452 |
| `rEinsatzCenterStats` | function | 6841 |
| `relative01` | function | 5206 |
| `removeComparisonDuo` | window | 13317 |
| `removeComparisonItem` | window | 13229 |
| `removeEinsatzCenterCombo` | window | 7773 |
| `removeEinsatzCenterGroup` | window | 7687 |
| `removeEinsatzCenterGroupPlayer` | window | 7737 |
| `removeEinsatzCenterRosterPlayer` | window | 7618 |
| `removeLineupBuilderPlayerFromLine` | window | 2350 |
| `removeLineupPlayer` | window | 2291 |
| `rEmptyState` | function | 15705 |
| `renameEinsatzCenterGroup` | window | 7709 |
| `render` | function | 21721 |
| `renderComparisonDuoSuggestions` | function | 13270 |
| `renderTags` | function | 8816 |
| `repairRenderedMojibake` | function | 2466 |
| `resetPlayerRegistrySeason` | function | 3727 |
| `resolveAssistPlayer` | function | 2923 |
| `resolveCurrentSeasonKey` | function | 6094 |
| `resolveGoalScorerPlayer` | function | 2860 |
| `resolveLineupPlayerName` | function | 6703 |
| `resolvePlayerRoleView` | function | 9469 |
| `resolveRosterPlayerByRef` | function | 2829 |
| `responseExcerpt` | function | 5932 |
| `responseMomentumAbsSeconds` | function | 10747 |
| `responseMomentumActor` | function | 10773 |
| `responseMomentumConfidence` | function | 10906 |
| `responseMomentumEmptyState` | function | 10911 |
| `responseMomentumGameRows` | function | 10757 |
| `responseMomentumGoalActors` | function | 10784 |
| `responseMomentumPairKey` | function | 10919 |
| `responseMomentumSide` | function | 10764 |
| `responseMomentumTime` | function | 10750 |
| `responseMomentumTooltipFor` | function | 12222 |
| `restoreEinsatzCenterAutosave` | function | 7182 |
| `restoreHallOfFameIntroPrevious` | function | 8544 |
| `resultGoalsAgainstForSide` | function | 4052 |
| `returnToEinsatzCenterEdit` | window | 7604 |
| `rGlobalAllTimeStats` | function | 14592 |
| `rGlobalCareerHeader` | function | 14501 |
| `rGlobalDevelopment` | function | 14610 |
| `rGlobalDnaBars` | function | 14245 |
| `rGlobalDuoNetwork` | function | 14710 |
| `rGlobalOpponentSpecialist` | function | 14909 |
| `rGlobalOverview` | function | 14539 |
| `rGlobalPartnerOpponentPanel` | function | 14487 |
| `rGlobalProfileTags` | function | 12630 |
| `rGlobalSearchPanelHtml` | function | 23210 |
| `rGlobalSearchResultsHtml` | function | 23199 |
| `rGlobalSearchToggle` | function | 23196 |
| `rGoalieAnalysis` | function | 10102 |
| `rGoalieBars` | function | 9752 |
| `rGoalieDnaBars` | function | 9901 |
| `rGoalieFirstGoalResistance` | function | 9938 |
| `rGoalieInsights` | function | 10011 |
| `rGoalieKpis` | function | 9915 |
| `rGoalieMiniMetrics` | function | 9932 |
| `rGoalieMomentum` | function | 9952 |
| `rGoalieOpponents` | function | 10053 |
| `rGoalieOverview` | function | 10033 |
| `rGoaliePhaseProfile` | function | 9994 |
| `rGoaliePhases` | function | 10050 |
| `rGoalieRoleTraits` | function | 9893 |
| `rGoalieStability` | function | 10065 |
| `rGoalieTable` | function | 10094 |
| `rGoalieTierCards` | function | 9966 |
| `rHallDuoTemple` | function | 12692 |
| `rHallGoalieAwardCards` | function | 12883 |
| `rHallGoalieLegends` | function | 12900 |
| `rHallGoalieRankCard` | function | 12851 |
| `rHallOfFameHero` | function | 12643 |
| `rHallOfFamePage` | function | 15288 |
| `rHallPodiumList` | function | 12669 |
| `rHallSGBadge` | function | 12724 |
| `rIaShell` | function | 23102 |
| `rIdentityCards` | function | 8782 |
| `rIdentityTags` | function | 8762 |
| `rInsights` | function | 9275 |
| `rInteractiveDuoCenterPro` | function | 11619 |
| `rKpiCards` | function | 13733 |
| `rKpiExtendedMetrics` | function | 13880 |
| `rKpiInfoCards` | function | 14015 |
| `rKpiMetricCard` | function | 13872 |
| `rKpiMirrorRows` | function | 13758 |
| `rKpiObjectMini` | function | 14008 |
| `rKpiOpponentStrength` | function | 13977 |
| `rKpiRadar` | function | 13829 |
| `rKpiShareBars` | function | 13864 |
| `rKpiTextMetricCard` | function | 13877 |
| `rKpiTrendCompare` | function | 13910 |
| `rKPIVergleich` | function | 14079 |
| `rLexiconPage` | function | 15403 |
| `rLexiconRows` | function | 15399 |
| `rLigaGegnerPlaceholderPage` | function | 22982 |
| `rLineupBuilderAvailablePanel` | function | 20112 |
| `rLineupBuilderPage` | function | 20288 |
| `rLineupComplementCards` | function | 20209 |
| `rLineupMetricPills` | function | 20098 |
| `rLineupRecommendationCards` | function | 20160 |
| `rLineupRecommendationMode` | function | 20175 |
| `rLineupScoreRows` | function | 19994 |
| `rLineupSimpleCards` | function | 20016 |
| `rLineupTestLine` | function | 20222 |
| `rLineupTestMode` | function | 20271 |
| `rMainNav` | function | 22397 |
| `rMainNavBottom` | function | 22419 |
| `rMatchcenterCoachCardList` | function | 19573 |
| `rMatchcenterCoachIfThen` | function | 19587 |
| `rMatchcenterCoachSimpleList` | function | 19595 |
| `rMatchcenterCopyButton` | function | 19665 |
| `rMatchcenterDetailsSection` | function | 16847 |
| `rMatchcenterDigitalCoach` | function | 19600 |
| `rMatchcenterDuoRankCard` | function | 17166 |
| `rMatchcenterDuoRow` | function | 17142 |
| `rMatchcenterDuosTab` | function | 17313 |
| `rMatchcenterDuoWatchCard` | function | 17122 |
| `rMatchcenterFormCard` | function | 16903 |
| `rMatchcenterFormSection` | function | 16821 |
| `rMatchcenterGamesList` | function | 16924 |
| `rMatchcenterGoalieCard` | function | 17375 |
| `rMatchcenterGoalieMatchup` | function | 17399 |
| `rMatchcenterIntelCoachHints` | function | 19559 |
| `rMatchcenterIntelOverview` | function | 19513 |
| `rMatchcenterKpi` | function | 16896 |
| `rMatchcenterLineupBuilder` | function | 20025 |
| `rMatchcenterLockerList` | function | 19670 |
| `rMatchcenterLockerRoomSheet` | function | 19682 |
| `rMatchcenterMatchPlan` | function | 20367 |
| `rMatchcenterOpponentAlarm` | function | 19491 |
| `rMatchcenterOpponentDNA` | function | 19458 |
| `rMatchcenterOpponentDuos` | function | 17270 |
| `rMatchcenterOpponentScouting` | function | 17083 |
| `rMatchcenterPage` | function | 21198 |
| `rMatchcenterPlanItems` | function | 19424 |
| `rMatchcenterPlanWatch` | function | 19442 |
| `rMatchcenterPlayerRow` | function | 16957 |
| `rMatchcenterPlayersTab` | function | 17119 |
| `rMatchcenterProfileSection` | function | 16801 |
| `rMatchcenterRankCard` | function | 16981 |
| `rMatchcenterResponseMomentum` | function | 12344 |
| `rMatchcenterScoutingSummary` | function | 20323 |
| `rMatchcenterSocialBlock` | function | 19738 |
| `rMatchcenterSocialMediaCenter` | function | 19940 |
| `rMatchcenterSpecialCard` | function | 17316 |
| `rMatchcenterSpecialTeams` | function | 17325 |
| `rMatchcenterStoryForm` | function | 20988 |
| `rMatchcenterStoryFrame` | function | 21071 |
| `rMatchcenterStoryLogo` | function | 20983 |
| `rMatchcenterStoryPlayerCard` | function | 20993 |
| `rMatchcenterStoryPreview` | function | 21001 |
| `rMatchcenterTabs` | function | 16798 |
| `rMatchcenterTimeBars` | function | 16725 |
| `rMatchcenterTiming` | function | 16759 |
| `rMatchcenterTimingStatsCard` | function | 16739 |
| `rMatchcenterUlmDuoRankCard` | function | 17221 |
| `rMatchcenterUlmDuoRow` | function | 17198 |
| `rMatchcenterUlmDuos` | function | 17227 |
| `rMatchcenterUlmDuoWatchCard` | function | 17172 |
| `rMatchcenterUlmImpactCard` | function | 16987 |
| `rMatchcenterUlmPlayerRow` | function | 17016 |
| `rMatchcenterUlmRankCard` | function | 17040 |
| `rMatchcenterUlmScouting` | function | 17046 |
| `rMatchcenterWatchCard` | function | 16936 |
| `rMatchdayDetailPage` | function | 22595 |
| `rMatchdayPage` | function | 22635 |
| `rMatchdayTimelinePage` | function | 22584 |
| `rMatchdayTimelineRow` | function | 22576 |
| `rMatrix` | function | 8887 |
| `rmTerm` | function | 12229 |
| `roleGameStableKey` | function | 2732 |
| `roleTraitLabel` | function | 8719 |
| `rOppBreakdown` | function | 9179 |
| `rOpponentIntelBars` | function | 10529 |
| `rOpponentTopScorerTable` | function | 12483 |
| `rosterImpactConfidence` | function | 11857 |
| `rosterImpactConfidenceWeight` | function | 11871 |
| `rosterPlayerMatches` | function | 2636 |
| `rOverviewPage` | function | 22966 |
| `rPdashLabel` | function | 14436 |
| `rPdashStat` | function | 14439 |
| `rPenalties` | function | 9160 |
| `rPhases` | function | 8944 |
| `rPlayerDash` | function | 14442 |
| `rPlayerDashStyles` | function | 14424 |
| `rPlayerExplainItems` | function | 15188 |
| `rPlayerExplanation` | function | 15193 |
| `rPlayerResponseMomentumCard` | function | 12298 |
| `rPlayerRoleSwitch` | function | 9477 |
| `rRadar` | function | 8964 |
| `rRes` | const-arrow | 8707 |
| `rResponseMomentumOverviewCard` | function | 12274 |
| `rResponseRateDisplay` | function | 12238 |
| `rRmKpi` | function | 12245 |
| `rRmTopList` | function | 12263 |
| `rRoleTraitTip` | function | 8726 |
| `rRosterImpactStatLine` | function | 12017 |
| `rRosterStatusBadge` | function | 8735 |
| `rScoreBreakdown` | function | 15719 |
| `rSeasonDataPreviewCard` | function | 6575 |
| `rSeasonDataPreviewContextHint` | function | 23034 |
| `rSeasonDataPreviewRows` | function | 6565 |
| `rSeasonDataPreviewStatus` | function | 6562 |
| `rSeasonDataStateContextHint` | function | 23051 |
| `rSeasonDuoCenterPro` | function | 11675 |
| `rSeasonDuoSummary` | function | 8934 |
| `rSeasonInsightsTab` | function | 9260 |
| `rSeasonLandingPage` | function | 14523 |
| `rSeasonPlayerDashboard` | function | 14481 |
| `rSeasonProfileKpis` | function | 8859 |
| `rSeasonProfileTagStrip` | function | 8880 |
| `rSeasonTrendRows` | function | 14205 |
| `rSocialVideoBlock` | function | 19807 |
| `rSparkline` | function | 12969 |
| `rStyleMetricTip` | function | 8731 |
| `rStyleProfileBars` | function | 8771 |
| `rTable` | function | 9329 |
| `rTeamPage` | function | 21347 |
| `rTeamResponseMomentumCard` | function | 12337 |
| `rTimeline` | function | 9049 |
| `rToolMenu` | function | 23324 |
| `runComparison` | window | 13234 |
| `runDuoComparison` | window | 13322 |
| `saveLastView` | function | 3447 |
| `scoreNarrative` | function | 15660 |
| `seasonApiUrl` | function | 1855 |
| `seasonDataPreviewRerender` | function | 6421 |
| `seasonDataPreviewRow` | function | 6425 |
| `seasonGameApiUrls` | function | 1873 |
| `seasonGameHtmlUrls` | function | 1883 |
| `seasonHasPureUlmTeam` | function | 10179 |
| `seasonKeyToHashSegment` | function | 3146 |
| `seasonPathPrefix` | function | 1867 |
| `seasonRoleKeysForPlayer` | function | 5417 |
| `seasonRoleTraitsFromClassic` | function | 5412 |
| `seasonStatNumber` | function | 10369 |
| `seasonStatSetSize` | function | 10373 |
| `seedHallOfFameIntroParticles` | function | 8511 |
| `selectAllLineupAvailable` | window | 2337 |
| `selectComparisonDuoSuggestion` | window | 13280 |
| `selectComparisonMode` | window | 13241 |
| `selectComparisonPlayer` | window | 13198 |
| `selectDuoProQuick` | window | 11585 |
| `selectEinsatzCenterEditGame` | window | 7606 |
| `selectEnforcerKeys` | function | 5429 |
| `serializeFieldRoleSeasonStats` | function | 3931 |
| `serializeGoalieSeasonStats` | function | 3909 |
| `serializeSeasonStats` | function | 3896 |
| `serializeSpecialTeamsStats` | function | 4113 |
| `setAntiSynergyView` | window | 2383 |
| `setComparisonDuoMode` | window | 13251 |
| `setComparisonDuoPlayer` | window | 13300 |
| `setComparisonDuoSearch` | window | 13253 |
| `setComparisonDuoSeasonKey` | window | 13252 |
| `setComparisonRoleMode` | window | 13204 |
| `setComparisonVariant` | window | 13209 |
| `setContextAsOf` | window | 23012 |
| `setDuoProPickerState` | function | 11554 |
| `setDuoProSelection` | window | 11604 |
| `setEinsatzCenterGameNote` | window | 7780 |
| `setEinsatzCenterGroupPlayerPosition` | window | 7745 |
| `setEinsatzCenterIncludeDraft` | window | 7605 |
| `setEinsatzCenterSeason` | window | 6780 |
| `setGlobalPlayer` | window | 2409 |
| `setGlobalPlayerDuo` | window | 2410 |
| `setGlobalTab` | window | 2411 |
| `setGoalieTab` | window | 2250 |
| `setLineupActiveLine` | window | 2322 |
| `setLineupBuilderMode` | window | 2321 |
| `setLineupBuilderOpponent` | window | 2320 |
| `setLineupBuilderSeason` | window | 2308 |
| `setLineupNewPlayerProfile` | window | 2364 |
| `setMatchcenterContext` | window | 8696 |
| `setMatchcenterOpponent` | window | 8695 |
| `setMatchcenterSeason` | window | 8697 |
| `setMatchcenterTab` | window | 2255 |
| `setP` | window | 2247 |
| `setPage` | window | 2393 |
| `setPlayerRoleView` | window | 2249 |
| `setSeasonDataPreviewOpen` | window | 6611 |
| `setSeasonDataPreviewPasteText` | window | 6612 |
| `setState` | const-arrow | 2235 |
| `setTab` | window | 2248 |
| `showLineupComplements` | window | 2363 |
| `showMainShell` | function | 8303 |
| `socialDuoFocusLine` | function | 18300 |
| `socialEnsurePeriod` | function | 18286 |
| `socialFirstUseful` | function | 18290 |
| `socialKeyFactLine` | function | 18310 |
| `socialOpponentLine` | function | 18306 |
| `socialPlayerFocusLine` | function | 18293 |
| `socialSentence` | function | 18283 |
| `socialVideoJobsForMatchday` | function | 19841 |
| `specialTeamsStateFromActive` | function | 4239 |
| `stageSeasonDataPreview` | function | 6471 |
| `stageSeasonDataPreviewFromFile` | function | 6523 |
| `stageSeasonDataPreviewFromPaste` | function | 6537 |
| `startApp` | window | 8441 |
| `startEinsatzCenterDraftMode` | window | 7586 |
| `startHallOfFameIntro` | function | 8564 |
| `sumRoleGames` | function | 9449 |
| `switchMatchdaySeason` | window | 22506 |
| `switchOverviewSeason` | window | 22453 |
| `syncHashFromState` | function | 3389 |
| `t2s` | const-arrow | 2931 |
| `toggleAntiSynergyHideSgOnly` | window | 2385 |
| `toggleAntiSynergyShowAll` | window | 2384 |
| `toggleComparisonPicker` | window | 13228 |
| `toggleComparisonSgOnly` | window | 13213 |
| `toggleEinsatzCenterComboPlayer` | window | 7754 |
| `toggleEinsatzCenterGroupRename` | window | 7695 |
| `toggleEinsatzCenterRosterSuggestionPlayer` | window | 7626 |
| `toggleHallOfFamePureSGPlayers` | window | 2258 |
| `toggleLineupBuilderAvailable` | window | 2323 |
| `toggleMatchcenterDuoDetails` | window | 2254 |
| `toggleMatchcenterGames` | window | 8698 |
| `toggleMatchcenterPlayerDetails` | window | 2253 |
| `toggleMatchcenterSpecialTeamsGames` | window | 2252 |
| `toggleSgOnlyAlltime` | window | 2412 |
| `toggleSpecialTeamsGameDetails` | window | 2251 |
| `toggleToolMenu` | window | 23353 |
| `toolMenuElements` | function | 23328 |
| `toolMenuItemElements` | function | 23331 |
| `toolMenuOnClick` | function | 23389 |
| `toolMenuOnKeydown` | function | 23365 |
| `toPublicPlayerRegistry` | function | 3935 |
| `uiDatenstandBand` | function | 22205 |
| `uiDeltaIndicator` | function | 21970 |
| `uiFormatNumber` | function | 21942 |
| `uiHinweisKarte` | function | 22034 |
| `uiInfoIcon` | function | 21988 |
| `uiIntervallBalken` | function | 22110 |
| `uiKennzahlKachel` | function | 22000 |
| `uiKernaussage` | function | 22020 |
| `uiMethodenbox` | function | 22129 |
| `uiNotiz` | function | 22146 |
| `uiObjektseite` | function | 22294 |
| `uiObjektseiteSortTabs` | function | 22276 |
| `uiPlatzhalter` | function | 22226 |
| `uiQuoteText` | function | 22182 |
| `uiRangliste` | function | 22056 |
| `uiReliabilityDots` | function | 21955 |
| `uiVerlauf` | function | 22084 |
| `uniqueList` | function | 1870 |
| `updateCoverAllTimeStats` | function | 8330 |
| `updatePlayerRoleAvailability` | function | 4739 |
| `validateGameStructure` | function | 6232 |
| `validateMergedSeason` | function | 6319 |
| `validateSeasonGames` | function | 6273 |
| `validateSeasonKey` | function | 6296 |
| `validateWrapperFormat` | function | 6308 |
| `variance` | function | 2933 |
| `viewEinsatzCenterMergedView` | window | 7603 |
| `warnEventProcessingOnce` | function | 2628 |
| `withoutHashSync` | function | 3406 |

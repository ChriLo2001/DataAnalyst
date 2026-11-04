# Code-Karte: index.html

<!-- index-map: source-sha256=c26dd4f2572bf3b209fdf8bf3bbab93589be5f1204f3513f42add112ae74b0f0 source-lines=23687 -->

Automatisch erzeugt von `scripts/build-index-map.mjs`. Nicht von Hand bearbeiten — bei Änderungen an index.html erneut ausführen: `node scripts/build-index-map.mjs --write`. Vor gezieltem Lesen prüfen, ob die Karte noch aktuell ist: `node scripts/build-index-map.mjs --check`.

index.html: 23687 Zeilen gesamt (SHA-256 `c26dd4f2572bf3b209fdf8bf3bbab93589be5f1204f3513f42add112ae74b0f0`). Statischer `<style>`-Block: Zeile 11–1550. Haupt-`<script>`-Block: Zeile 1664–23683.

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
| `resolveRosterPlayerByRef` | function | 2844–2874 | 31 |
| `processGame` | function | 2957–3021 | 65 |
| `parseAppHash` | function | 3271–3302 | 32 |
| `applyAppHash` | function | 3509–3539 | 31 |
| `getOrCreatePlayerProfile` | function | 3769–3801 | 33 |
| `applySeasonScoringToRegistry` | function | 3878–3910 | 33 |
| `toPublicPlayerRegistry` | function | 3983–4012 | 30 |
| `aggregateAllTimePlayers` | function | 4014–4053 | 40 |
| `emptySpecialTeamsStats` | function | 4116–4156 | 41 |
| `mergeSpecialTeamsStats` | function | 4170–4199 | 30 |
| `buildSpecialTeamsForGame` | function | 4338–4534 | 197 |
| `addGoalieGameToStats` | function | 4594–4644 | 51 |
| `buildGoalieGameRecord` | function | 4646–4697 | 52 |
| `buildGoalieStatsForSeason` | function | 4699–4778 | 80 |
| `aggregateGoalieAlltimeStats` | function | 4780–4818 | 39 |
| `getAssistDiagnostics` | function | 4845–4897 | 53 |
| `buildPlayerEvents` | function | 5028–5123 | 96 |
| `computeMetrics` | function | 5143–5276 | 134 |
| `buildSoloDuoProfile` | function | 5298–5341 | 44 |
| `identityInputs` | function | 5432–5489 | 58 |
| `buildIdentityProfiles` | function | 5533–5764 | 232 |
| `assignStatus` | function | 5811–5996 | 186 |
| `fetchTextWithDiagnostics` | function | 6031–6060 | 30 |
| `fetchSeasonGameRaw` | function | 6096–6135 | 40 |
| `validateGameStructure` | function | 6323–6362 | 40 |
| `buildDryRunReport` | function | 6429–6491 | 63 |
| `stageSeasonDataPreview` | function | 6562–6613 | 52 |
| `rSeasonDataPreviewCard` | function | 6666–6701 | 36 |
| `computeEinsatzCenterStats` | function | 6895–6925 | 31 |
| `rEinsatzCenterStats` | function | 6932–6950 | 19 |
| `einsatzCenterDeserializeAutosave` | function | 7153–7186 | 34 |
| `rEinsatzCenterGroupEditor` | function | 7496–7526 | 31 |
| `rEinsatzCenterRosterSuggestionCard` | function | 7543–7573 | 31 |
| `rEinsatzCenterGameEditor` | function | 7574–7626 | 53 |
| `rEinsatzCenterEditPage` | function | 7627–7674 | 48 |
| `loadSeasonData` | function | 7922–8391 | 470 |
| `loadSeasonForGlobal` | function | 8431–8461 | 31 |
| `loadSeason` | function | 8479–8530 | 52 |
| `ensureHallOfFameIntroOverlay` | function | 8558–8590 | 33 |
| `rSeasonProfileKpis` | function | 8959–8987 | 29 |
| `rMatrix` | function | 9003–9047 | 45 |
| `rRadar` | function | 9080–9127 | 48 |
| `rClutch` | function | 9130–9162 | 33 |
| `rTimeline` | function | 9165–9273 | 109 |
| `rOppBreakdown` | function | 9295–9327 | 33 |
| `generatePlayerInsights` | function | 9330–9373 | 44 |
| `rInsights` | function | 9391–9442 | 52 |
| `buildGoalieAnalysisModel` | function | 9716–9874 | 159 |
| `buildGoalieRoleProfile` | function | 9942–10015 | 74 |
| `rGoalieInsights` | function | 10155–10176 | 22 |
| `rGoalieStability` | function | 10210–10238 | 29 |
| `buildOpponentIntelligence` | function | 10619–10672 | 54 |
| `buildBestThirdManOptions` | function | 10822–10855 | 34 |
| `getDuoDirectScorerGameCounts` | function | 10856–10887 | 32 |
| `buildAnnotatedGoalEventsForGame` | function | 10937–11050 | 114 |
| `buildResponseGoalStatsRaw` | function | 11093–11141 | 49 |
| `buildMomentumSwingStatsRaw` | function | 11154–11224 | 71 |
| `buildDuoFloorCeiling` | function | 11231–11272 | 42 |
| `buildDuoWithWithoutImpact` | function | 11368–11401 | 34 |
| `buildDuoCompatibility` | function | 11467–11489 | 23 |
| `buildDuoProAnalysis` | function | 11526–11569 | 44 |
| `rDuoCenterPro` | function | 11570–11689 | 120 |
| `rInteractiveDuoCenterPro` | function | 11764–11819 | 56 |
| `getDifficultConnectionRowsForPlayer` | function | 11823–11867 | 45 |
| `getRosterImpactPlayerGames` | function | 11960–12001 | 42 |
| `buildRosterImpactAnalysis` | function | 12035–12103 | 69 |
| `rDifficultConnectionList` | function | 12180–12204 | 25 |
| `rDifficultConnectionListCompactLegacy` | function | 12205–12246 | 42 |
| `rDifficultConnectionListCompact` | function | 12247–12285 | 39 |
| `rDifficultConnectionsCard` | function | 12286–12322 | 37 |
| `RESPONSE_MOMENTUM_TOOLTIPS` | const-data | 12325–12356 | 32 |
| `rResponseMomentumOverviewCard` | function | 12419–12442 | 24 |
| `rMatchcenterResponseMomentum` | function | 12489–12526 | 38 |
| `getTeamAllTimeRecords` | function | 12528–12568 | 41 |
| `getAllTimeIdentityStandings` | function | 12649–12683 | 35 |
| `buildRecencyWeightedGlobalIdentityProfile` | function | 12685–12732 | 48 |
| `rHallOfFameHero` | function | 12788–12813 | 26 |
| `hallGoalieRowFromStats` | function | 12911–12943 | 33 |
| `rHallGoalieRankCard` | function | 12996–13027 | 32 |
| `rHallGoalieAwardCards` | function | 13077–13097 | 21 |
| `rHallGoalieLegends` | function | 13098–13130 | 33 |
| `buildDuoComparison` | function | 13525–13544 | 20 |
| `rDuoCompareSummaryCards` | function | 13550–13580 | 31 |
| `rDuoComparisonPage` | function | 13681–13691 | 11 |
| `buildComparisonExtraMetrics` | function | 13736–13793 | 58 |
| `buildGoalieComparisonDataset` | function | 13830–13880 | 51 |
| `buildComparisonDataset` | function | 13881–13916 | 36 |
| `rKpiMirrorRows` | function | 13956–14015 | 60 |
| `rKpiRadar` | function | 14027–14061 | 35 |
| `rKpiTrendCompare` | function | 14108–14174 | 67 |
| `rKpiOpponentStrength` | function | 14175–14202 | 28 |
| `rKpiInfoCards` | function | 14213–14244 | 32 |
| `buildComparisonSummary` | function | 14245–14276 | 32 |
| `rComparisonStyles` | function | 14314–14351 | 38 |
| `rComparisonCenterPage` | function | 14352–14402 | 51 |
| `rGlobalDnaBars` | function | 14443–14472 | 30 |
| `buildSeasonPlayerDashModel` | function | 14542–14578 | 37 |
| `buildAlltimePlayerDashModel` | function | 14579–14621 | 43 |
| `rPlayerDashStyles` | function | 14622–14633 | 12 |
| `rPlayerDash` | function | 14640–14678 | 39 |
| `rGlobalOverview` | function | 14737–14788 | 52 |
| `rGlobalDevelopment` | function | 14808–14846 | 39 |
| `rGlobalDuoNetwork` | function | 14908–15105 | 198 |
| `rGlobalOpponentSpecialist` | function | 15107–15152 | 46 |
| `buildFieldPlayerExplanation` | function | 15218–15292 | 75 |
| `buildGoaliePlayerExplanation` | function | 15293–15346 | 54 |
| `buildPlayerIntelligence` | function | 15356–15385 | 30 |
| `rPlayerExplanation` | function | 15391–15442 | 52 |
| `rAllTimePlayersPage` | function | 15444–15484 | 41 |
| `rHallOfFamePage` | function | 15486–15574 | 89 |
| `rLexiconPage` | function | 15601–15773 | 173 |
| `buildConfidence` | function | 15790–15835 | 46 |
| `getMatchcenterOpponents` | function | 15999–16031 | 33 |
| `getMatchcenterDirectOpponents` | function | 16032–16062 | 31 |
| `matchcenterAnalyzeDirect` | function | 16065–16101 | 37 |
| `matchcenterEnsureUlmPlayer` | function | 16150–16187 | 38 |
| `matchcenterAddUlmScoring` | function | 16212–16252 | 41 |
| `matchcenterFinalizeUlmPlayers` | function | 16253–16321 | 69 |
| `matchcenterBuildUlmPlayerScouting` | function | 16322–16376 | 55 |
| `matchcenterEnsureOpponentDuo` | function | 16394–16426 | 33 |
| `matchcenterFinalizeOpponentDuos` | function | 16453–16487 | 35 |
| `matchcenterBuildOpponentDuos` | function | 16488–16532 | 45 |
| `matchcenterEnsureUlmDuo` | function | 16547–16584 | 38 |
| `matchcenterFinalizeUlmDuos` | function | 16604–16639 | 36 |
| `matchcenterBuildUlmDuos` | function | 16640–16682 | 43 |
| `matchcenterBuildSpecialTeamsMatchup` | function | 16716–16763 | 48 |
| `matchcenterBuildGoalieMatchup` | function | 16786–16831 | 46 |
| `matchcenterTimingStatsForGames` | function | 16863–16900 | 38 |
| `rMatchcenterUlmScouting` | function | 17244–17280 | 37 |
| `rMatchcenterOpponentScouting` | function | 17281–17316 | 36 |
| `rMatchcenterUlmDuos` | function | 17425–17467 | 43 |
| `rMatchcenterOpponentDuos` | function | 17468–17510 | 43 |
| `rMatchcenterSpecialTeams` | function | 17523–17572 | 50 |
| `matchcenterBuildPlanConfidence` | function | 17663–17710 | 48 |
| `matchcenterBuildIntelligenceDataQuality` | function | 17759–17828 | 70 |
| `matchcenterBuildOpponentDNA` | function | 17829–17941 | 113 |
| `matchcenterBuildOpponentAlarm` | function | 18008–18117 | 110 |
| `matchcenterBuildIntelligenceSignals` | function | 18164–18210 | 47 |
| `buildMatchIntelligenceFromContext` | function | 18211–18265 | 55 |
| `buildMatchStories` | function | 18314–18343 | 30 |
| `buildDigitalCoachReport` | function | 18414–18446 | 33 |
| `buildMatchdayCaptionBlocks` | function | 18518–18547 | 30 |
| `buildSocialMediaContent` | function | 18548–18596 | 49 |
| `lineupRosterGamesForPlayer` | function | 18664–18711 | 48 |
| `buildLineupExperienceProfile` | function | 18712–18754 | 43 |
| `buildLineupOpponentDNAFit` | function | 18767–18810 | 44 |
| `classifyLineIdentity` | function | 18811–18858 | 48 |
| `lineupPlayerProfile` | function | 18859–18934 | 76 |
| `buildLineupAnalysis` | function | 18935–19068 | 134 |
| `buildLineupScoreBreakdowns` | function | 19069–19098 | 30 |
| `lineupEvaluateComplementCandidate` | function | 19182–19260 | 79 |
| `buildTeamLineBalance` | function | 19286–19329 | 44 |
| `buildLineupRecommendations` | function | 19366–19447 | 82 |
| `matchcenterBuildMatchPlan` | function | 19476–19621 | 146 |
| `rMatchcenterOpponentDNA` | function | 19656–19688 | 33 |
| `rMatchcenterIntelOverview` | function | 19711–19756 | 46 |
| `rMatchcenterDigitalCoach` | function | 19798–19862 | 65 |
| `rMatchcenterLockerRoomSheet` | function | 19880–19935 | 56 |
| `downloadMatchdayStory` | window | 19954–20001 | 48 |
| `rSocialVideoBlock` | function | 20005–20036 | 32 |
| `generateSocialVideoVideos` | window | 20046–20087 | 42 |
| `rMatchcenterSocialMediaCenter` | function | 20138–20191 | 54 |
| `rMatchcenterLineupBuilder` | function | 20223–20295 | 73 |
| `rLineupBuilderAvailablePanel` | function | 20310–20357 | 48 |
| `rLineupRecommendationMode` | function | 20373–20406 | 34 |
| `rLineupTestLine` | function | 20420–20468 | 49 |
| `rLineupBuilderPage` | function | 20486–20520 | 35 |
| `rMatchcenterScoutingSummary` | function | 20521–20564 | 44 |
| `getTeamLogoUrlForStory` | function | 20609–20638 | 30 |
| `matchcenterStoryPickFactItems` | function | 20761–20813 | 53 |
| `buildMatchcenterStoryPreviewData` | function | 21032–21143 | 112 |
| `matchcenterStoryVisibleFacts` | function | 21150–21180 | 31 |
| `rMatchcenterStoryPreview` | function | 21199–21268 | 70 |
| `fitMatchcenterStoryLayout` | function | 21275–21317 | 43 |
| `rMatchcenterPage` | function | 21396–21544 | 149 |
| `rTeamPage` | function | 21567–21907 | 341 |
| `exportExcel` | function | 21912–21937 | 26 |
| `_render` | function | 21961–22130 | 170 |
| `uiObjektseite` | function | 22516–22549 | 34 |
| `rMatchdayDetailPage` | function | 22817–22856 | 40 |
| `buildOverviewCards` | function | 23138–23178 | 41 |

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

1049 `function`-Deklarationen, 134 `window.`-Funktionszuweisungen, 4 `const`-Pfeilfunktionen — alle Top-Level, sortiert nach Zeile.

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
| `playerRoleInGame` | function | 2705–2709 | 5 |
| `getPlayerGameRole` | function | 2710–2716 | 7 |
| `isGoalieAppearance` | function | 2717–2720 | 4 |
| `isFieldAppearance` | function | 2721–2724 | 4 |
| `getFieldGameIdsForPlayer` | function | 2725–2731 | 7 |
| `getGoalieGameIdsForPlayer` | function | 2732–2738 | 7 |
| `getPlayerFieldGames` | function | 2739–2742 | 4 |
| `getPlayerGoalieGames` | function | 2743–2746 | 4 |
| `roleGameStableKey` | function | 2747–2749 | 3 |
| `getPlayerAlltimeRoleGames` | function | 2750–2768 | 19 |
| `getPlayerAlltimeFieldGames` | function | 2769–2771 | 3 |
| `getPlayerAlltimeGoalieGames` | function | 2772–2774 | 3 |
| `getPlayerAlltimeTotalGames` | function | 2775–2783 | 9 |
| `getPlayerSeasonRoleGameSummary` | function | 2784–2806 | 23 |
| `getPlayedUlmGames` | function | 2807–2815 | 9 |
| `countPlayedUlmGames` | function | 2816–2818 | 3 |
| `getSeasonTeamGames` | function | 2819–2822 | 4 |
| `getSeasonTeamGameIds` | function | 2823–2825 | 3 |
| `getPlayerSourceId` | function | 2826–2828 | 3 |
| `getJerseyNumber` | function | 2829–2831 | 3 |
| `normalizeEventPlayerRef` | function | 2832–2843 | 12 |
| `resolveRosterPlayerByRef` | function | 2844–2874 | 31 |
| `resolveGoalScorerPlayer` | function | 2875–2889 | 15 |
| `getGoalScorerFromEvent` | function | 2890–2892 | 3 |
| `normalizeAssistPlayerName` | function | 2893–2895 | 3 |
| `collectAssistEventRefs` | function | 2896–2923 | 28 |
| `getAssistPlayersFromEvent` | function | 2924–2937 | 14 |
| `resolveAssistPlayer` | function | 2938–2944 | 7 |
| `t2s` | const-arrow | 2946–2946 | 1 |
| `variance` | function | 2948–2952 | 5 |
| `processGame` | function | 2957–3021 | 65 |
| `isGamePlayed` | function | 3023–3025 | 3 |
| `deriveAsOfForSeason` | function | 3056–3059 | 4 |
| `seasonKeyToHashSegment` | function | 3161–3163 | 3 |
| `hashSegmentToSeasonKey` | function | 3164–3167 | 4 |
| `isValidAsOfDate` | function | 3168–3170 | 3 |
| `isValidAsOfStartTime` | function | 3171–3173 | 3 |
| `asOfEquals` | function | 3180–3187 | 8 |
| `decodeHashSegmentSafe` | function | 3251–3253 | 3 |
| `parseAppHash` | function | 3271–3302 | 32 |
| `parseAsOfQueryValue` | function | 3310–3320 | 11 |
| `buildAppHash` | function | 3326–3338 | 13 |
| `buildGlobalPageHash` | function | 3343–3352 | 10 |
| `buildHashStringFromParsed` | function | 3358–3362 | 5 |
| `computeCurrentAppHash` | function | 3378–3390 | 13 |
| `syncHashFromState` | function | 3404–3414 | 11 |
| `withoutHashSync` | function | 3421–3429 | 9 |
| `parseLastViewState` | function | 3445–3456 | 12 |
| `getStoredLastView` | function | 3457–3460 | 4 |
| `saveLastView` | function | 3462–3464 | 3 |
| `applyGlobalPageFromHash` | function | 3476–3496 | 21 |
| `applyAppHash` | function | 3509–3539 | 31 |
| `initHashRouting` | function | 3588–3606 | 19 |
| `gameResult` | function | 3609–3615 | 7 |
| `getOppStrength` | function | 3622–3639 | 18 |
| `createPlayerAnalysisProfile` | function | 3651–3653 | 3 |
| `emptyPlayerSeasonStats` | function | 3655–3663 | 9 |
| `emptyGoalieSeasonStats` | function | 3664–3687 | 24 |
| `emptyGoalieAlltimeStats` | function | 3688–3703 | 16 |
| `emptyGoalieSpecialTeamsStats` | function | 3704–3715 | 12 |
| `emptyFieldRoleSeasonStats` | function | 3716–3718 | 3 |
| `addUnique` | function | 3720–3722 | 3 |
| `incrementUniqueCounter` | function | 3724–3729 | 6 |
| `buildPlayerIdentity` | function | 3731–3746 | 16 |
| `resetPlayerRegistrySeason` | function | 3748–3758 | 11 |
| `derivePlayerStatus` | function | 3760–3767 | 8 |
| `getOrCreatePlayerProfile` | function | 3769–3801 | 33 |
| `registerPlayerIdentity` | function | 3803–3819 | 17 |
| `ensureGoalieSeasonStats` | function | 3821–3825 | 5 |
| `ensureFieldRoleSeasonStats` | function | 3826–3830 | 5 |
| `markFieldRoleAppearance` | function | 3831–3834 | 4 |
| `registerSeasonRosters` | function | 3836–3854 | 19 |
| `linkUiPlayersToRegistry` | function | 3856–3876 | 21 |
| `applySeasonScoringToRegistry` | function | 3878–3910 | 33 |
| `finalizeSeasonAppearanceTotals` | function | 3914–3923 | 10 |
| `finalizePlayerRegistrySeason` | function | 3925–3939 | 15 |
| `serializeSeasonStats` | function | 3941–3955 | 15 |
| `serializeGoalieSeasonStats` | function | 3956–3978 | 23 |
| `serializeFieldRoleSeasonStats` | function | 3979–3981 | 3 |
| `toPublicPlayerRegistry` | function | 3983–4012 | 30 |
| `aggregateAllTimePlayers` | function | 4014–4053 | 40 |
| `finiteNumbers` | function | 4055–4057 | 3 |
| `avgOrNull` | function | 4058–4061 | 4 |
| `medianOrNull` | function | 4062–4067 | 6 |
| `incGoalieBucket` | function | 4068–4071 | 4 |
| `goalieEventAbsSeconds` | function | 4077–4079 | 3 |
| `goalieGameDurationSeconds` | function | 4080–4084 | 5 |
| `goalieGameStateBeforeGoal` | function | 4085–4096 | 12 |
| `getGoalieOpponentName` | function | 4097–4100 | 4 |
| `getGoalieOpponentTier` | function | 4101–4105 | 5 |
| `resultGoalsAgainstForSide` | function | 4106–4115 | 10 |
| `emptySpecialTeamsStats` | function | 4116–4156 | 41 |
| `clonePlain` | function | 4157–4159 | 3 |
| `finalizeSpecialTeamsStats` | function | 4160–4166 | 7 |
| `serializeSpecialTeamsStats` | function | 4167–4169 | 3 |
| `mergeSpecialTeamsStats` | function | 4170–4199 | 30 |
| `penaltyRawText` | function | 4202–4204 | 3 |
| `classifyPenaltyType` | function | 4218–4228 | 11 |
| `isMatchPenaltyEvent` | function | 4229–4231 | 3 |
| `isTwoPlusTwoPenaltyEvent` | function | 4232–4234 | 3 |
| `getPenaltyDisciplineType` | function | 4235–4238 | 4 |
| `getGameDurationMinutes` | function | 4239–4243 | 5 |
| `gameDaySortValue` | function | 4244–4251 | 8 |
| `isSameUlmTeamContext` | function | 4252–4259 | 8 |
| `getFurtherSameDayUlmGames` | function | 4260–4271 | 12 |
| `getPenaltySpecialTeamsMinutes` | function | 4272–4274 | 3 |
| `getPenaltyBasePersonalMinutes` | function | 4275–4282 | 8 |
| `getPenaltyPersonalMinutes` | function | 4283–4292 | 10 |
| `getPenaltyDisciplineMinutes` | function | 4293–4295 | 3 |
| `getSpecialTeamsPenaltyChunks` | function | 4301–4304 | 4 |
| `isPenaltyGoalEvent` | function | 4305–4309 | 5 |
| `isOwnGoalEvent` | function | 4312–4315 | 4 |
| `specialTeamsStateFromActive` | function | 4316–4322 | 7 |
| `annotateSpecialTeamsGoalEvent` | function | 4323–4337 | 15 |
| `buildSpecialTeamsForGame` | function | 4338–4534 | 197 |
| `buildSpecialTeamsForSeason` | function | 4535–4543 | 9 |
| `aggregateAlltimeSpecialTeams` | function | 4544–4551 | 8 |
| `mergeGoalieSpecialTeamsStats` | function | 4552–4563 | 12 |
| `addGoalieSpecialTeamsGameToStats` | function | 4564–4578 | 15 |
| `finalizeGoalieSeasonStats` | function | 4579–4593 | 15 |
| `addGoalieGameToStats` | function | 4594–4644 | 51 |
| `buildGoalieGameRecord` | function | 4646–4697 | 52 |
| `buildGoalieStatsForSeason` | function | 4699–4778 | 80 |
| `aggregateGoalieAlltimeStats` | function | 4780–4818 | 39 |
| `updatePlayerRoleAvailability` | function | 4820–4829 | 10 |
| `getGoalieDiagnostics` | function | 4831–4836 | 6 |
| `getSpecialTeamsDiagnostics` | function | 4838–4843 | 6 |
| `getAssistDiagnostics` | function | 4845–4897 | 53 |
| `buildSeasonDuos` | function | 4900–4926 | 27 |
| `mergeDuoSet` | function | 4927–4943 | 17 |
| `aggregateAllTimeDuos` | function | 4944–4954 | 11 |
| `aggregateSeasonStats` | function | 4956–4971 | 16 |
| `buildPlayerDataFoundation` | function | 4973–4995 | 23 |
| `buildRegistry` | function | 4997–5023 | 27 |
| `buildPlayerEvents` | function | 5028–5123 | 96 |
| `getPhaseIndex` | function | 5128–5138 | 11 |
| `computeMetrics` | function | 5143–5276 | 134 |
| `detectTypes` | function | 5278–5293 | 16 |
| `pct` | function | 5295–5295 | 1 |
| `ratio01` | function | 5296–5296 | 1 |
| `relative01` | function | 5297–5297 | 1 |
| `buildSoloDuoProfile` | function | 5298–5341 | 44 |
| `identityPartnerStats` | function | 5342–5355 | 14 |
| `identityOpponentGroups` | function | 5356–5363 | 8 |
| `eventMatchesTeams` | function | 5364–5369 | 6 |
| `clutchText` | function | 5370–5370 | 1 |
| `isImportantClutchGoal` | function | 5371–5375 | 5 |
| `isDecisiveGoal` | function | 5376–5378 | 3 |
| `isLateGoal` | function | 5384–5389 | 6 |
| `isComebackRelevantGoal` | function | 5390–5393 | 4 |
| `identityPointsVsTeams` | function | 5394–5396 | 3 |
| `identityGoalsVsTeams` | function | 5397–5399 | 3 |
| `identityClutchGoalsVsTeams` | function | 5400–5402 | 3 |
| `identityDecisiveGoalsVsTeams` | function | 5403–5405 | 3 |
| `identityLateGoalsVsTeams` | function | 5406–5408 | 3 |
| `countMomentumClusters` | function | 5409–5431 | 23 |
| `identityInputs` | function | 5432–5489 | 58 |
| `clearlyAboveAverage` | function | 5490–5490 | 1 |
| `normalizeSecondaryTraits` | function | 5491–5502 | 12 |
| `seasonRoleTraitsFromClassic` | function | 5503–5507 | 5 |
| `seasonRoleKeysForPlayer` | function | 5508–5516 | 9 |
| `hasSeasonRole` | function | 5517–5519 | 3 |
| `selectEnforcerKeys` | function | 5520–5532 | 13 |
| `buildIdentityProfiles` | function | 5533–5764 | 232 |
| `composeIdentityText` | function | 5765–5771 | 7 |
| `countCaptainAppearances` | function | 5773–5785 | 13 |
| `countGoalieAppearances` | function | 5787–5789 | 3 |
| `computeRosterStatus` | function | 5791–5809 | 19 |
| `assignStatus` | function | 5811–5996 | 186 |
| `fetchJsonLegacy` | function | 6002–6021 | 20 |
| `responseExcerpt` | function | 6023–6025 | 3 |
| `diagnosticError` | function | 6026–6030 | 5 |
| `fetchTextWithDiagnostics` | function | 6031–6060 | 30 |
| `fetchJsonWithDiagnostics` | function | 6061–6069 | 9 |
| `fetchJson` | function | 6070–6073 | 4 |
| `formatStatus` | function | 6074–6076 | 3 |
| `formatDiagnosticAttempt` | function | 6077–6089 | 13 |
| `formatGameLoadError` | function | 6090–6095 | 6 |
| `fetchSeasonGameRaw` | function | 6096–6135 | 40 |
| `getStaticSeasonGames` | function | 6139–6142 | 4 |
| `loadSeasonManifest` | function | 6154–6170 | 17 |
| `resolveCurrentSeasonKey` | function | 6185–6204 | 20 |
| `applyCurrentSeasonCoverHighlight` | function | 6205–6209 | 5 |
| `isUsableExternalSeasonData` | function | 6222–6230 | 9 |
| `ensureExternalSeasonData` | function | 6231–6252 | 22 |
| `buildStaticSeasonDataBlock` | function | 6253–6262 | 10 |
| `getGameId` | function | 6289–6293 | 5 |
| `findDuplicateGameIds` | function | 6295–6305 | 11 |
| `validateGameStructure` | function | 6323–6362 | 40 |
| `validateSeasonGames` | function | 6364–6374 | 11 |
| `diffGameIds` | function | 6376–6385 | 10 |
| `validateSeasonKey` | function | 6387–6397 | 11 |
| `validateWrapperFormat` | function | 6399–6408 | 10 |
| `validateMergedSeason` | function | 6410–6427 | 18 |
| `buildDryRunReport` | function | 6429–6491 | 63 |
| `seasonDataPreviewRerender` | function | 6512–6514 | 3 |
| `seasonDataPreviewRow` | function | 6516–6527 | 12 |
| `buildSeasonDataPreviewChanges` | function | 6534–6551 | 18 |
| `stageSeasonDataPreview` | function | 6562–6613 | 52 |
| `stageSeasonDataPreviewFromFile` | function | 6614–6627 | 14 |
| `stageSeasonDataPreviewFromPaste` | function | 6628–6632 | 5 |
| `discardSeasonDataPreview` | function | 6633–6637 | 5 |
| `getSeasonDataPreview` | function | 6639–6641 | 3 |
| `isSeasonDataPreviewStale` | function | 6647–6651 | 5 |
| `rSeasonDataPreviewStatus` | function | 6653–6655 | 3 |
| `rSeasonDataPreviewRows` | function | 6656–6664 | 9 |
| `rSeasonDataPreviewCard` | function | 6666–6701 | 36 |
| `setSeasonDataPreviewOpen` | window | 6702–6702 | 1 |
| `setSeasonDataPreviewPasteText` | window | 6703–6703 | 1 |
| `fileNameForLineupSeasonKey` | function | 6723–6725 | 3 |
| `ensureLineupDataLoaded` | function | 6741–6757 | 17 |
| `ensureLineupGroupsRegistryLoaded` | function | 6766–6782 | 17 |
| `resolveLineupPlayerName` | function | 6794–6797 | 4 |
| `findLineupGameContext` | function | 6800–6807 | 8 |
| `rEinsatzCenterGroup` | function | 6809–6820 | 12 |
| `rEinsatzCenterCombo` | function | 6822–6829 | 8 |
| `rEinsatzCenterGameCard` | function | 6831–6848 | 18 |
| `rEinsatzCenterPage` | function | 6850–6869 | 20 |
| `setEinsatzCenterSeason` | window | 6871–6876 | 6 |
| `openEinsatzCenter` | window | 6877–6884 | 8 |
| `computeEinsatzCenterStats` | function | 6895–6925 | 31 |
| `lineupGroupDisplayName` | function | 6926–6931 | 6 |
| `rEinsatzCenterStats` | function | 6932–6950 | 19 |
| `getEffectiveLineupData` | function | 7008–7015 | 8 |
| `isEinsatzCenterGameFromDraft` | function | 7017–7020 | 4 |
| `einsatzCenterDraftInView` | function | 7022–7025 | 4 |
| `rEinsatzCenterDraftMark` | function | 7026–7029 | 4 |
| `rEinsatzCenterDraftStatsHint` | function | 7030–7034 | 5 |
| `einsatzCenterDraftStaleHint` | function | 7036–7038 | 3 |
| `rEinsatzCenterDraftBanner` | function | 7040–7047 | 8 |
| `ensureEinsatzCenterDraft` | function | 7058–7071 | 14 |
| `getEinsatzCenterGameDraft` | function | 7080–7091 | 12 |
| `einsatzCenterAutosaveKey` | function | 7118–7118 | 1 |
| `einsatzCenterStorageRead` | function | 7119–7121 | 3 |
| `einsatzCenterStorageWrite` | function | 7122–7124 | 3 |
| `einsatzCenterStorageRemove` | function | 7125–7127 | 3 |
| `einsatzCenterDraftIsEmpty` | function | 7130–7132 | 3 |
| `einsatzCenterSerializeDraft` | function | 7134–7146 | 13 |
| `einsatzCenterIsPlainObject` | function | 7147–7147 | 1 |
| `einsatzCenterDeserializeAutosave` | function | 7153–7186 | 34 |
| `einsatzCenterCurrentRawBaseHash` | function | 7193–7198 | 6 |
| `einsatzCenterAutosaveDraft` | function | 7207–7234 | 28 |
| `einsatzCenterInspectAutosave` | function | 7242–7270 | 29 |
| `restoreEinsatzCenterAutosave` | function | 7273–7289 | 17 |
| `discardEinsatzCenterAutosave` | function | 7291–7296 | 6 |
| `rEinsatzCenterAutosaveBanner` | function | 7299–7311 | 13 |
| `einsatzCenterAutosaveInfoText` | function | 7313–7323 | 11 |
| `loadEinsatzCenterMismatchedAutosave` | function | 7337–7355 | 19 |
| `deriveLineupValidPlayerIds` | function | 7368–7384 | 17 |
| `deriveLineupUlmPlayerIds` | function | 7392–7408 | 17 |
| `getSeasonmanagerRosterSuggestion` | function | 7422–7442 | 21 |
| `einsatzCenterCanonicalJson` | function | 7451–7460 | 10 |
| `einsatzCenterSha256Hex` | function | 7461–7465 | 5 |
| `einsatzCenterComputeBaseHash` | function | 7466–7468 | 3 |
| `einsatzCenterSoftIssues` | function | 7475–7493 | 19 |
| `rEinsatzCenterGroupEditor` | function | 7496–7526 | 31 |
| `rEinsatzCenterComboEditor` | function | 7527–7533 | 7 |
| `rEinsatzCenterRosterSuggestionCard` | function | 7543–7573 | 31 |
| `rEinsatzCenterGameEditor` | function | 7574–7626 | 53 |
| `rEinsatzCenterEditPage` | function | 7627–7674 | 48 |
| `startEinsatzCenterDraftMode` | window | 7677–7681 | 5 |
| `cancelEinsatzCenterEdit` | window | 7682–7692 | 11 |
| `viewEinsatzCenterMergedView` | window | 7694–7694 | 1 |
| `returnToEinsatzCenterEdit` | window | 7695–7695 | 1 |
| `setEinsatzCenterIncludeDraft` | window | 7696–7696 | 1 |
| `selectEinsatzCenterEditGame` | window | 7697–7700 | 4 |
| `addEinsatzCenterRosterPlayer` | window | 7701–7708 | 8 |
| `removeEinsatzCenterRosterPlayer` | window | 7709–7716 | 8 |
| `toggleEinsatzCenterRosterSuggestionPlayer` | window | 7717–7723 | 7 |
| `dismissEinsatzCenterRosterSuggestion` | window | 7724–7727 | 4 |
| `acceptEinsatzCenterRosterSuggestion` | window | 7735–7751 | 17 |
| `addEinsatzCenterExistingGroup` | window | 7752–7760 | 9 |
| `addEinsatzCenterNewGroup` | window | 7761–7777 | 17 |
| `removeEinsatzCenterGroup` | window | 7778–7785 | 8 |
| `toggleEinsatzCenterGroupRename` | window | 7786–7788 | 3 |
| `renameEinsatzCenterGroup` | window | 7800–7819 | 20 |
| `addEinsatzCenterGroupPlayer` | window | 7820–7827 | 8 |
| `removeEinsatzCenterGroupPlayer` | window | 7828–7835 | 8 |
| `setEinsatzCenterGroupPlayerPosition` | window | 7836–7844 | 9 |
| `toggleEinsatzCenterComboPlayer` | window | 7845–7852 | 8 |
| `confirmEinsatzCenterCombo` | window | 7853–7863 | 11 |
| `removeEinsatzCenterCombo` | window | 7864–7870 | 7 |
| `setEinsatzCenterGameNote` | window | 7871–7877 | 7 |
| `buildEinsatzCenterDraftExport` | function | 7881–7894 | 14 |
| `exportEinsatzCenterDraft` | window | 7895–7907 | 13 |
| `loadSeasonData` | function | 7922–8391 | 470 |
| `showMainShell` | function | 8394–8398 | 5 |
| `hasSeasonSource` | function | 8399–8402 | 4 |
| `hasEmbeddedSeasonData` | function | 8403–8405 | 3 |
| `getGlobalLoadableSeasonKeys` | function | 8406–8412 | 7 |
| `getAllTimeCoverStats` | function | 8413–8420 | 8 |
| `updateCoverAllTimeStats` | function | 8421–8429 | 9 |
| `loadSeasonForGlobal` | function | 8431–8461 | 31 |
| `ensureGlobalDataLoaded` | function | 8462–8477 | 16 |
| `loadSeason` | function | 8479–8530 | 52 |
| `startApp` | window | 8532–8543 | 12 |
| `ensureAppLoaded` | function | 8534–8543 | 10 |
| `openSeason` | window | 8544–8546 | 3 |
| `openAllTimePlayers` | window | 8547–8552 | 6 |
| `hofIntroDelay` | function | 8555–8557 | 3 |
| `ensureHallOfFameIntroOverlay` | function | 8558–8590 | 33 |
| `buildHallOfFameIntroTitle` | function | 8591–8601 | 11 |
| `seedHallOfFameIntroParticles` | function | 8602–8619 | 18 |
| `cleanupHallOfFameIntro` | function | 8620–8634 | 15 |
| `restoreHallOfFameIntroPrevious` | function | 8635–8646 | 12 |
| `finishHallOfFameIntro` | function | 8647–8654 | 8 |
| `startHallOfFameIntro` | function | 8655–8679 | 25 |
| `cancelHallOfFameIntro` | function | 8680–8691 | 12 |
| `openHallOfFame` | window | 8693–8716 | 24 |
| `openComparisonCenter` | window | 8717–8745 | 29 |
| `openMatchcenter` | window | 8746–8767 | 22 |
| `openLineupBuilder` | window | 8768–8785 | 18 |
| `setMatchcenterOpponent` | window | 8786–8786 | 1 |
| `setMatchcenterContext` | window | 8787–8787 | 1 |
| `setMatchcenterSeason` | window | 8788–8788 | 1 |
| `toggleMatchcenterGames` | window | 8789–8789 | 1 |
| `openLexicon` | window | 8790–8793 | 4 |
| `rRes` | const-arrow | 8798–8798 | 1 |
| `rClutchBadge` | function | 8799–8806 | 8 |
| `escAttr` | function | 8807–8809 | 3 |
| `roleTraitLabel` | function | 8810–8812 | 3 |
| `isVisibleSecondaryTrait` | function | 8813–8816 | 4 |
| `rRoleTraitTip` | function | 8817–8821 | 5 |
| `rStyleMetricTip` | function | 8822–8825 | 4 |
| `rRosterStatusBadge` | function | 8826–8833 | 8 |
| `classicTagLabel` | function | 8834–8836 | 3 |
| `rClassicTagTip` | function | 8837–8841 | 5 |
| `fallbackIdentityProfile` | function | 8842–8852 | 11 |
| `rIdentityTags` | function | 8853–8861 | 9 |
| `rStyleProfileBars` | function | 8862–8872 | 11 |
| `rIdentityCards` | function | 8873–8898 | 26 |
| `rClassicRoleTags` | function | 8899–8906 | 8 |
| `renderTags` | function | 8907–8909 | 3 |
| `getSeasonPlayerFieldBasis` | function | 8911–8938 | 28 |
| `getSeasonScopedIdentityProfile` | function | 8942–8958 | 17 |
| `rSeasonProfileKpis` | function | 8959–8987 | 29 |
| `rSeasonProfileTagStrip` | function | 8989–9000 | 12 |
| `rMatrix` | function | 9003–9047 | 45 |
| `rSeasonDuoSummary` | function | 9050–9058 | 9 |
| `rPhases` | function | 9060–9077 | 18 |
| `rRadar` | function | 9080–9127 | 48 |
| `rClutch` | function | 9130–9162 | 33 |
| `rTimeline` | function | 9165–9273 | 109 |
| `rPenalties` | function | 9276–9292 | 17 |
| `rOppBreakdown` | function | 9295–9327 | 33 |
| `generatePlayerInsights` | function | 9330–9373 | 44 |
| `rSeasonInsightsTab` | function | 9376–9389 | 14 |
| `rInsights` | function | 9391–9442 | 52 |
| `rTable` | function | 9445–9468 | 24 |
| `findLoadedSeasonPlayer` | function | 9471–9479 | 9 |
| `getAllTimePlayerRows` | function | 9480–9495 | 16 |
| `isSgOnlyAlltimePlayer` | function | 9496–9503 | 8 |
| `isPureSGPlayer` | function | 9504–9507 | 4 |
| `filterPureSGPlayers` | function | 9508–9511 | 4 |
| `getAllTimeMainPlayerRows` | function | 9512–9514 | 3 |
| `getAllTimeSgOnlyRows` | function | 9515–9517 | 3 |
| `getPlayerSeasonStats` | function | 9518–9522 | 5 |
| `getPlayerAlltimeStats` | function | 9523–9530 | 8 |
| `getPlayerRegistryProfile` | function | 9531–9538 | 8 |
| `getPlayerGoalieSeasonStats` | function | 9539–9543 | 5 |
| `getPlayerGoalieAlltimeStats` | function | 9544–9567 | 24 |
| `sumRoleGames` | function | 9568–9573 | 6 |
| `getPlayerRoleAvailability` | function | 9574–9591 | 18 |
| `resolvePlayerRoleView` | function | 9592–9599 | 8 |
| `rPlayerRoleSwitch` | function | 9600–9606 | 7 |
| `goalieNum` | function | 9607–9612 | 6 |
| `goalieTime` | function | 9613–9620 | 8 |
| `goalieBucketRows` | function | 9621–9626 | 6 |
| `goalieTopRow` | function | 9627–9629 | 3 |
| `goalieTierMeta` | function | 9630–9638 | 9 |
| `goalieStdDev` | function | 9639–9644 | 6 |
| `goalieDetailFirstTime` | function | 9645–9651 | 7 |
| `goalieEventSecondInPeriod` | function | 9652–9657 | 6 |
| `goaliePctText` | function | 9658–9661 | 4 |
| `goalieSafeNum` | function | 9662–9665 | 4 |
| `goalieClampScore` | function | 9666–9669 | 4 |
| `goalieInverseScore` | function | 9670–9677 | 8 |
| `goaliePositiveScore` | function | 9678–9685 | 8 |
| `goaliePositiveCurveScore` | function | 9686–9694 | 9 |
| `goalieWeightedScore` | function | 9695–9700 | 6 |
| `goalieApplySampleConfidence` | function | 9701–9708 | 8 |
| `goalieBucketLooseSum` | function | 9709–9715 | 7 |
| `buildGoalieAnalysisModel` | function | 9716–9874 | 159 |
| `rGoalieBars` | function | 9875–9887 | 13 |
| `goalieDnaKey` | function | 9929–9933 | 5 |
| `goalieDnaValue` | function | 9934–9940 | 7 |
| `goalieStateGoals` | function | 9941–9941 | 1 |
| `buildGoalieRoleProfile` | function | 9942–10015 | 74 |
| `rGoalieRoleTraits` | function | 10016–10019 | 4 |
| `getGoalieDnaRows` | function | 10020–10023 | 4 |
| `rGoalieDnaBars` | function | 10024–10037 | 14 |
| `rGoalieScoringRow` | function | 10038–10058 | 21 |
| `rGoalieKpis` | function | 10059–10075 | 17 |
| `rGoalieMiniMetrics` | function | 10076–10081 | 6 |
| `rGoalieFirstGoalResistance` | function | 10082–10095 | 14 |
| `rGoalieMomentum` | function | 10096–10109 | 14 |
| `rGoalieTierCards` | function | 10110–10137 | 28 |
| `rGoaliePhaseProfile` | function | 10138–10154 | 17 |
| `rGoalieInsights` | function | 10155–10176 | 22 |
| `rGoalieOverview` | function | 10177–10194 | 18 |
| `rGoaliePhases` | function | 10195–10197 | 3 |
| `rGoalieOpponents` | function | 10198–10209 | 12 |
| `rGoalieStability` | function | 10210–10238 | 29 |
| `rGoalieTable` | function | 10239–10246 | 8 |
| `rGoalieAnalysis` | function | 10247–10272 | 26 |
| `getPreviousSeasonKey` | function | 10274–10278 | 5 |
| `playerAppearedInSeasonByName` | function | 10279–10289 | 11 |
| `playerAppearedForUlmStatusInSeasonByName` | function | 10290–10308 | 19 |
| `isRookieCandidateForSeason` | function | 10309–10318 | 10 |
| `getLoadedSeasonPointsByName` | function | 10319–10323 | 5 |
| `seasonHasPureUlmTeam` | function | 10324–10330 | 7 |
| `isSgOnlyHallOfFameExcluded` | function | 10331–10339 | 9 |
| `isHallOfFameEligiblePlayer` | function | 10340–10345 | 6 |
| `getHallOfFamePlayerRows` | function | 10346–10348 | 3 |
| `getHallOfFamePlayerIdSet` | function | 10349–10351 | 3 |
| `getGlobalProfileEvents` | function | 10353–10364 | 12 |
| `countBy` | function | 10366–10374 | 9 |
| `getLoadedSeasonPlayerUi` | function | 10375–10379 | 5 |
| `getGlobalPlayerTeamRecord` | function | 10380–10405 | 26 |
| `getGlobalPlayerPeakGame` | function | 10406–10416 | 11 |
| `getGlobalPlayerBestSeason` | function | 10417–10423 | 7 |
| `getAllTimeDuoRowsForPlayer` | function | 10424–10434 | 11 |
| `getCarryPerformanceRows` | function | 10435–10450 | 16 |
| `rCarryPerformanceRows` | function | 10451–10463 | 13 |
| `getAllTimeGamesPlayedRows` | function | 10464–10488 | 25 |
| `getAllTimePenaltyRows` | function | 10489–10504 | 16 |
| `getSeasonUiPlayerForProfile` | function | 10505–10508 | 4 |
| `getSeasonIdentityProfile` | function | 10509–10513 | 5 |
| `seasonStatNumber` | function | 10514–10517 | 4 |
| `seasonStatSetSize` | function | 10518–10523 | 6 |
| `isActiveAlltimeSeasonStats` | function | 10524–10537 | 14 |
| `getActiveAlltimeSeasonKeys` | function | 10538–10548 | 11 |
| `getAlltimeRecencyWeight` | function | 10549–10554 | 6 |
| `getRosterStatus` | function | 10555–10561 | 7 |
| `getGlobalTopScorerMilestones` | function | 10562–10574 | 13 |
| `getGlobalRookieSeasonKey` | function | 10575–10588 | 14 |
| `getGlobalRookieMilestone` | function | 10589–10599 | 11 |
| `getGlobalPlayerMilestones` | function | 10600–10617 | 18 |
| `buildOpponentIntelligence` | function | 10619–10672 | 54 |
| `rOpponentIntelBars` | function | 10674–10684 | 11 |
| `getAllTimeDuoRows` | function | 10686–10708 | 23 |
| `rDuoRows` | function | 10710–10729 | 20 |
| `getAllLoadedSeasonGames` | function | 10731–10750 | 20 |
| `getRosterEntryRegistryProfile` | function | 10752–10755 | 4 |
| `difficultConnectionConfidence` | function | 10756–10760 | 5 |
| `getDuoRowsForPlayerScope` | function | 10761–10779 | 19 |
| `buildDirectDuoLookupForPlayer` | function | 10780–10797 | 18 |
| `duoScopeSeasonKeys` | function | 10798–10801 | 4 |
| `getDuoScorerCountsWithCandidate` | function | 10802–10821 | 20 |
| `buildBestThirdManOptions` | function | 10822–10855 | 34 |
| `getDuoDirectScorerGameCounts` | function | 10856–10887 | 32 |
| `responseMomentumAbsSeconds` | function | 10892–10894 | 3 |
| `responseMomentumTime` | function | 10895–10901 | 7 |
| `responseMomentumGameRows` | function | 10902–10908 | 7 |
| `responseMomentumSide` | function | 10909–10917 | 9 |
| `responseMomentumActor` | function | 10918–10928 | 11 |
| `responseMomentumGoalActors` | function | 10929–10936 | 8 |
| `buildAnnotatedGoalEventsForGame` | function | 10937–11050 | 114 |
| `responseMomentumConfidence` | function | 11051–11055 | 5 |
| `responseMomentumEmptyState` | function | 11056–11063 | 8 |
| `responseMomentumPairKey` | function | 11064–11066 | 3 |
| `ensureRmPlayer` | function | 11067–11072 | 6 |
| `ensureRmDuo` | function | 11073–11078 | 6 |
| `finalizeResponseStats` | function | 11079–11092 | 14 |
| `buildResponseGoalStatsRaw` | function | 11093–11141 | 49 |
| `buildResponseGoalStats` | function | 11142–11147 | 6 |
| `finalizeMomentumStats` | function | 11148–11153 | 6 |
| `buildMomentumSwingStatsRaw` | function | 11154–11224 | 71 |
| `buildMomentumSwingStats` | function | 11225–11230 | 6 |
| `buildDuoFloorCeiling` | function | 11231–11272 | 42 |
| `buildDuoWarnings` | function | 11273–11291 | 19 |
| `duoProPairKey` | function | 11292–11294 | 3 |
| `duoProContextSeasonKey` | function | 11295–11297 | 3 |
| `getDuoFieldPlayerRows` | function | 11298–11308 | 11 |
| `duoProPlayer` | function | 11309–11313 | 5 |
| `getDuoSharedFieldRows` | function | 11314–11319 | 6 |
| `buildDuoDirectProduction` | function | 11320–11340 | 21 |
| `emptyDuoTeamImpactStats` | function | 11341–11343 | 3 |
| `addDuoTeamGame` | function | 11344–11359 | 16 |
| `finalizeDuoTeamImpactStats` | function | 11360–11367 | 8 |
| `buildDuoWithWithoutImpact` | function | 11368–11401 | 34 |
| `buildDuoOpponentAdjusted` | function | 11402–11414 | 13 |
| `buildDuoNetworkContext` | function | 11415–11438 | 24 |
| `buildDuoGapAnalysis` | function | 11439–11455 | 17 |
| `buildDuoCompatibility` | function | 11467–11489 | 23 |
| `buildDuoUntestedPotential` | function | 11490–11501 | 12 |
| `buildDuoUsageRate` | function | 11502–11513 | 12 |
| `buildDuoReplacementOptions` | function | 11514–11525 | 12 |
| `buildDuoProAnalysis` | function | 11526–11569 | 44 |
| `rDuoCenterPro` | function | 11570–11689 | 120 |
| `duoProDomId` | function | 11690–11692 | 3 |
| `duoProPickerOpen` | function | 11693–11695 | 3 |
| `duoProPickerMessage` | function | 11696–11698 | 3 |
| `setDuoProPickerState` | function | 11699–11708 | 10 |
| `duoProResolveCandidate` | function | 11709–11717 | 9 |
| `duoProSelectionPayload` | function | 11718–11727 | 10 |
| `openDuoProPicker` | window | 11728–11728 | 1 |
| `cancelDuoProPicker` | window | 11729–11729 | 1 |
| `selectDuoProQuick` | window | 11730–11733 | 4 |
| `confirmDuoProSelection` | window | 11734–11748 | 15 |
| `setDuoProSelection` | window | 11749–11756 | 8 |
| `rDuoProPlayerSelect` | function | 11757–11763 | 7 |
| `rInteractiveDuoCenterPro` | function | 11764–11819 | 56 |
| `rSeasonDuoCenterPro` | function | 11820–11822 | 3 |
| `getDifficultConnectionRowsForPlayer` | function | 11823–11867 | 45 |
| `emptyRosterImpactStats` | function | 11868–11870 | 3 |
| `finalizeRosterImpactStats` | function | 11871–11878 | 8 |
| `addRosterImpactGameToStats` | function | 11879–11888 | 10 |
| `getRosterImpactPlayerEventLookup` | function | 11889–11909 | 21 |
| `buildRosterImpactGameIndex` | function | 11922–11947 | 26 |
| `getRosterImpactPlayerGames` | function | 11960–12001 | 42 |
| `rosterImpactConfidence` | function | 12002–12007 | 6 |
| `confidenceFromSampleSize` | function | 12012–12015 | 4 |
| `rosterImpactConfidenceWeight` | function | 12016–12019 | 4 |
| `antiSynergyImpactScore` | function | 12020–12034 | 15 |
| `buildRosterImpactAnalysis` | function | 12035–12103 | 69 |
| `buildDuoAntiSynergy` | function | 12104–12106 | 3 |
| `rAntiSynergyDelta` | function | 12107–12113 | 7 |
| `antiSynergyDeltaClass` | function | 12114–12117 | 4 |
| `antiSynergySigned` | function | 12118–12122 | 5 |
| `rAntiSynergyCompareChip` | function | 12123–12130 | 8 |
| `rAntiSynergyMetricRow` | function | 12131–12139 | 9 |
| `rAntiSynergyWinrateText` | function | 12147–12152 | 6 |
| `rAntiSynergyWinrateRow` | function | 12153–12161 | 9 |
| `rRosterImpactStatLine` | function | 12162–12165 | 4 |
| `antiSynergyPartnerIsSgOnly` | function | 12166–12169 | 4 |
| `rAntiSynergyMainDelta` | function | 12170–12179 | 10 |
| `rDifficultConnectionList` | function | 12180–12204 | 25 |
| `rDifficultConnectionListCompactLegacy` | function | 12205–12246 | 42 |
| `rDifficultConnectionListCompact` | function | 12247–12285 | 39 |
| `rDifficultConnectionsCard` | function | 12286–12322 | 37 |
| `responseMomentumTooltipFor` | function | 12367–12373 | 7 |
| `rmTerm` | function | 12374–12377 | 4 |
| `rResponseRateDisplay` | function | 12383–12389 | 7 |
| `rRmKpi` | function | 12390–12401 | 12 |
| `rAvgResponseTimeNote` | function | 12404–12407 | 4 |
| `rRmTopList` | function | 12408–12418 | 11 |
| `rResponseMomentumOverviewCard` | function | 12419–12442 | 24 |
| `rPlayerResponseMomentumCard` | function | 12443–12461 | 19 |
| `rDuoResponseMomentumCard` | function | 12462–12481 | 20 |
| `rTeamResponseMomentumCard` | function | 12482–12488 | 7 |
| `rMatchcenterResponseMomentum` | function | 12489–12526 | 38 |
| `getTeamAllTimeRecords` | function | 12528–12568 | 41 |
| `getAllTimeOpponentIntelligence` | function | 12570–12576 | 7 |
| `getAllTimeOpponentTopScorers` | function | 12578–12602 | 25 |
| `getHallOfFameStats` | function | 12604–12626 | 23 |
| `rOpponentTopScorerTable` | function | 12628–12647 | 20 |
| `getAllTimeIdentityStandings` | function | 12649–12683 | 35 |
| `buildRecencyWeightedGlobalIdentityProfile` | function | 12685–12732 | 48 |
| `getGlobalIdentityProfile` | function | 12734–12760 | 27 |
| `dedupeIdentityProfileTags` | function | 12762–12773 | 12 |
| `rGlobalProfileTags` | function | 12775–12779 | 5 |
| `escHtml` | function | 12781–12783 | 3 |
| `pctValue` | function | 12784–12787 | 4 |
| `rHallOfFameHero` | function | 12788–12813 | 26 |
| `rHallPodiumList` | function | 12814–12836 | 23 |
| `rHallDuoTemple` | function | 12837–12844 | 8 |
| `hallGoalieNum` | function | 12846–12851 | 6 |
| `hallGoalieTime` | function | 12852–12859 | 8 |
| `hallGoalieSeasonLabel` | function | 12860–12860 | 1 |
| `isHallRowPureSG` | function | 12861–12868 | 8 |
| `rHallSGBadge` | function | 12869–12871 | 3 |
| `hallGoaliePkStats` | function | 12872–12883 | 12 |
| `hallGoalieTopteamStats` | function | 12884–12890 | 7 |
| `hallGoalieSeasonScore` | function | 12891–12910 | 20 |
| `hallGoalieRowFromStats` | function | 12911–12943 | 33 |
| `getHallGoalieData` | function | 12944–12959 | 16 |
| `hallGoalieNameHtml` | function | 12960–12962 | 3 |
| `hallGoalieTooltip` | function | 12977–12980 | 4 |
| `hallGoalieExplainForLabel` | function | 12981–12995 | 15 |
| `rHallGoalieRankCard` | function | 12996–13027 | 32 |
| `noGoalStreakGoaliesForGame` | function | 13043–13050 | 8 |
| `buildHallOfFameLongestNoGoalStreak` | function | 13051–13076 | 26 |
| `rHallGoalieAwardCards` | function | 13077–13097 | 21 |
| `rHallGoalieLegends` | function | 13098–13130 | 33 |
| `getGlobalSeasonStatRows` | function | 13131–13146 | 16 |
| `getAlltimeRank` | function | 13147–13152 | 6 |
| `rAlltimeKpis` | function | 13153–13166 | 14 |
| `rSparkline` | function | 13167–13179 | 13 |
| `comparisonItemKey` | function | 13191–13196 | 6 |
| `normalizeComparisonItem` | function | 13197–13201 | 5 |
| `comparisonJsArg` | function | 13202–13204 | 3 |
| `comparisonNum` | function | 13205–13208 | 4 |
| `comparisonPct` | function | 13209–13212 | 4 |
| `comparisonFmt` | function | 13213–13216 | 4 |
| `comparisonPctFmt` | function | 13217–13219 | 3 |
| `getComparisonPlayerRow` | function | 13220–13222 | 3 |
| `getComparisonSeasonLabel` | function | 13223–13225 | 3 |
| `getComparisonTeamGoalsForSeason` | function | 13226–13237 | 12 |
| `getComparisonAlltimeTeamGoals` | function | 13238–13240 | 3 |
| `getComparisonSeasonEvents` | function | 13241–13245 | 5 |
| `getComparisonChemistryFromEvents` | function | 13246–13250 | 5 |
| `getComparisonClutchFromEvents` | function | 13251–13255 | 5 |
| `getComparisonStyleProfile` | function | 13256–13280 | 25 |
| `getComparisonProfile` | function | 13281–13285 | 5 |
| `getComparisonSeasonTrend` | function | 13286–13311 | 26 |
| `getComparisonAlltimeTrend` | function | 13312–13317 | 6 |
| `getComparisonPlayerOptions` | function | 13319–13333 | 15 |
| `comparisonVariantValue` | function | 13334–13336 | 3 |
| `getComparisonVariantsForPlayer` | function | 13337–13361 | 25 |
| `parseComparisonVariant` | function | 13362–13376 | 15 |
| `getComparisonCurrentSelection` | function | 13377–13387 | 11 |
| `filterComparisonPlayers` | window | 13388–13395 | 8 |
| `selectComparisonPlayer` | window | 13396–13401 | 6 |
| `setComparisonRoleMode` | window | 13402–13406 | 5 |
| `setComparisonVariant` | window | 13407–13410 | 4 |
| `toggleComparisonSgOnly` | window | 13411–13411 | 1 |
| `addComparisonItem` | window | 13412–13419 | 8 |
| `addSelectedComparisonItem` | window | 13420–13425 | 6 |
| `toggleComparisonPicker` | window | 13426–13426 | 1 |
| `removeComparisonItem` | window | 13427–13430 | 4 |
| `clearComparison` | window | 13431–13431 | 1 |
| `runComparison` | window | 13432–13438 | 7 |
| `selectComparisonMode` | window | 13439–13439 | 1 |
| `backToComparisonModeSelect` | window | 13440–13440 | 1 |
| `normalizeDuoComparisonItem` | function | 13441–13444 | 4 |
| `comparisonDuoContext` | function | 13445–13448 | 4 |
| `setComparisonDuoMode` | window | 13449–13449 | 1 |
| `setComparisonDuoSeasonKey` | window | 13450–13450 | 1 |
| `setComparisonDuoSearch` | window | 13451–13451 | 1 |
| `filterPlayerSuggestions` | function | 13452–13463 | 12 |
| `rComparisonDuoSuggestionButtons` | function | 13464–13467 | 4 |
| `renderComparisonDuoSuggestions` | function | 13468–13476 | 9 |
| `filterComparisonDuoSuggestions` | window | 13477–13484 | 8 |
| `selectComparisonDuoSuggestion` | window | 13478–13484 | 7 |
| `handleComparisonDuoSearchKey` | window | 13485–13497 | 13 |
| `setComparisonDuoPlayer` | window | 13498–13503 | 6 |
| `addComparisonDuoFromSelection` | window | 13504–13511 | 8 |
| `addComparisonDuo` | window | 13512–13514 | 3 |
| `removeComparisonDuo` | window | 13515–13518 | 4 |
| `clearComparisonDuos` | window | 13519–13519 | 1 |
| `runDuoComparison` | window | 13520–13524 | 5 |
| `buildDuoComparison` | function | 13525–13544 | 20 |
| `rDuoComparisonBars` | function | 13545–13549 | 5 |
| `rDuoCompareSummaryCards` | function | 13550–13580 | 31 |
| `rDuoComparisonProfile` | function | 13581–13602 | 22 |
| `rDuoComparisonChemistry` | function | 13603–13618 | 16 |
| `rDuoComparisonImpact` | function | 13619–13634 | 16 |
| `rDuoComparisonContext` | function | 13635–13652 | 18 |
| `rDuoComparisonDetails` | function | 13653–13656 | 4 |
| `rDuoComparisonDashboard` | function | 13657–13670 | 14 |
| `rComparisonDuoSearchBox` | function | 13671–13680 | 10 |
| `rDuoComparisonPage` | function | 13681–13691 | 11 |
| `rComparisonModeSelect` | function | 13692–13694 | 3 |
| `getComparisonEventsForItem` | function | 13695–13697 | 3 |
| `getComparisonRosterGamesForSeason` | function | 13698–13714 | 17 |
| `getComparisonRosterGames` | function | 13715–13722 | 8 |
| `comparisonEventGameKey` | function | 13723–13725 | 3 |
| `comparisonEventPhaseLabel` | function | 13726–13729 | 4 |
| `comparisonOpponentStrengthTier` | function | 13730–13735 | 6 |
| `buildComparisonExtraMetrics` | function | 13736–13793 | 58 |
| `getGoalieComparisonAlltimeTrend` | function | 13794–13810 | 17 |
| `getGoalieComparisonSeasonTrend` | function | 13811–13829 | 19 |
| `buildGoalieComparisonDataset` | function | 13830–13880 | 51 |
| `buildComparisonDataset` | function | 13881–13916 | 36 |
| `kpiValueText` | function | 13918–13921 | 4 |
| `kpiDelta` | function | 13922–13927 | 6 |
| `kpiItemColor` | function | 13928–13930 | 3 |
| `rKpiCards` | function | 13931–13941 | 11 |
| `rKpiMirrorRows` | function | 13956–14015 | 60 |
| `kpiRadarValue` | function | 14016–14026 | 11 |
| `rKpiRadar` | function | 14027–14061 | 35 |
| `rKpiShareBars` | function | 14062–14069 | 8 |
| `rKpiMetricCard` | function | 14070–14074 | 5 |
| `rKpiTextMetricCard` | function | 14075–14077 | 3 |
| `rKpiExtendedMetrics` | function | 14078–14092 | 15 |
| `kpiNiceMax` | function | 14093–14098 | 6 |
| `kpiTrendRows` | function | 14099–14107 | 9 |
| `rKpiTrendCompare` | function | 14108–14174 | 67 |
| `rKpiOpponentStrength` | function | 14175–14202 | 28 |
| `kpiBadge` | function | 14203–14205 | 3 |
| `rKpiObjectMini` | function | 14206–14212 | 7 |
| `rKpiInfoCards` | function | 14213–14244 | 32 |
| `buildComparisonSummary` | function | 14245–14276 | 32 |
| `rKPIVergleich` | function | 14277–14290 | 14 |
| `rComparisonMiniOverview` | function | 14291–14294 | 4 |
| `rComparisonRoles` | function | 14295–14302 | 8 |
| `rComparisonDashboard` | function | 14303–14313 | 11 |
| `rComparisonStyles` | function | 14314–14351 | 38 |
| `rComparisonCenterPage` | function | 14352–14402 | 51 |
| `rSeasonTrendRows` | function | 14403–14421 | 19 |
| `getAlltimeAggregatedStyleProfile` | function | 14422–14441 | 20 |
| `rGlobalDnaBars` | function | 14443–14472 | 30 |
| `pdashNum` | function | 14473–14476 | 4 |
| `pdashPct` | function | 14477–14480 | 4 |
| `pdashPhaseLabel` | function | 14481–14484 | 4 |
| `pdashTopCount` | function | 14485–14488 | 4 |
| `pdashBestPhase` | function | 14489–14492 | 4 |
| `pdashTopPartner` | function | 14493–14496 | 4 |
| `pdashTopOpponent` | function | 14497–14500 | 4 |
| `pdashOpponentTier` | function | 14501–14506 | 6 |
| `pdashOpponentStrength` | function | 14507–14526 | 20 |
| `pdashInsight` | function | 14527–14529 | 3 |
| `pdashInsights` | function | 14530–14541 | 12 |
| `buildSeasonPlayerDashModel` | function | 14542–14578 | 37 |
| `buildAlltimePlayerDashModel` | function | 14579–14621 | 43 |
| `rPlayerDashStyles` | function | 14622–14633 | 12 |
| `rPdashLabel` | function | 14634–14636 | 3 |
| `rPdashStat` | function | 14637–14639 | 3 |
| `rPlayerDash` | function | 14640–14678 | 39 |
| `rSeasonPlayerDashboard` | function | 14679–14681 | 3 |
| `rAlltimePlayerDashboard` | function | 14682–14684 | 3 |
| `rGlobalPartnerOpponentPanel` | function | 14685–14698 | 14 |
| `rGlobalCareerHeader` | function | 14699–14719 | 21 |
| `rSeasonLandingPage` | function | 14721–14735 | 15 |
| `rGlobalOverview` | function | 14737–14788 | 52 |
| `rGlobalAllTimeStats` | function | 14790–14806 | 17 |
| `rGlobalDevelopment` | function | 14808–14846 | 39 |
| `getGlobalPlayerOpponentGameRows` | function | 14849–14876 | 28 |
| `getGlobalOpponentSpecialistProfile` | function | 14878–14906 | 29 |
| `rGlobalDuoNetwork` | function | 14908–15105 | 198 |
| `rGlobalOpponentSpecialist` | function | 15107–15152 | 46 |
| `playerExplainConfidence` | function | 15154–15159 | 6 |
| `playerExplainConfidenceLabel` | function | 15160–15162 | 3 |
| `playerExplainAdd` | function | 15163–15167 | 5 |
| `playerExplainStyleSignature` | function | 15168–15179 | 12 |
| `playerExplainRolePhrase` | function | 15180–15188 | 9 |
| `playerExplainHeadline` | function | 15189–15198 | 10 |
| `playerExplainContextSentence` | function | 15199–15217 | 19 |
| `buildFieldPlayerExplanation` | function | 15218–15292 | 75 |
| `buildGoaliePlayerExplanation` | function | 15293–15346 | 54 |
| `buildPlayerExplanation` | function | 15347–15355 | 9 |
| `buildPlayerIntelligence` | function | 15356–15385 | 30 |
| `rPlayerExplainItems` | function | 15386–15390 | 5 |
| `rPlayerExplanation` | function | 15391–15442 | 52 |
| `rAllTimePlayersPage` | function | 15444–15484 | 41 |
| `rHallOfFamePage` | function | 15486–15574 | 89 |
| `lexiconUniqueKeys` | function | 15579–15586 | 8 |
| `lexiconEntry` | function | 15587–15596 | 10 |
| `rLexiconRows` | function | 15597–15600 | 4 |
| `rLexiconPage` | function | 15601–15773 | 173 |
| `clampScore` | function | 15777–15780 | 4 |
| `getScoreLabel` | function | 15781–15789 | 9 |
| `buildConfidence` | function | 15790–15835 | 46 |
| `confidenceCautiousText` | function | 15836–15839 | 4 |
| `explainScore` | function | 15840–15854 | 15 |
| `p1NarrativeKey` | function | 15855–15857 | 3 |
| `scoreNarrative` | function | 15858–15876 | 19 |
| `rankNarratives` | function | 15877–15890 | 14 |
| `getEmptyState` | function | 15891–15902 | 12 |
| `rEmptyState` | function | 15903–15906 | 4 |
| `capSuperlativeLabel` | function | 15914–15916 | 3 |
| `rScoreBreakdown` | function | 15917–15933 | 17 |
| `matchcenterSigned` | function | 15935–15939 | 5 |
| `matchcenterDateLabel` | function | 15941–15945 | 5 |
| `dedupeGamesById` | function | 15957–15965 | 9 |
| `matchcenterIsFreiburgTuebingenTeamName` | function | 15966–15972 | 7 |
| `matchcenterSeasonHasGames` | function | 15976–15978 | 3 |
| `matchcenterDefaultSeasonKey` | function | 15979–15984 | 6 |
| `matchcenterOpponentMode` | function | 15996–15998 | 3 |
| `getMatchcenterOpponents` | function | 15999–16031 | 33 |
| `getMatchcenterDirectOpponents` | function | 16032–16062 | 31 |
| `matchcenterAnalyzeDirect` | function | 16065–16101 | 37 |
| `matchcenterAnalyzeForm` | function | 16102–16127 | 26 |
| `matchcenterEmptyBuckets` | function | 16142–16144 | 3 |
| `matchcenterUlmScoutingConfidence` | function | 16145–16149 | 5 |
| `matchcenterEnsureUlmPlayer` | function | 16150–16187 | 38 |
| `matchcenterRegisterUlmProfileGame` | function | 16188–16193 | 6 |
| `matchcenterUpdateUlmSeasonRow` | function | 16194–16200 | 7 |
| `matchcenterClassifyUlmGoalEvent` | function | 16201–16211 | 11 |
| `matchcenterAddUlmScoring` | function | 16212–16252 | 41 |
| `matchcenterFinalizeUlmPlayers` | function | 16253–16321 | 69 |
| `matchcenterBuildUlmPlayerScouting` | function | 16322–16376 | 55 |
| `matchcenterBuildUlmPlayerInsights` | function | 16377–16389 | 13 |
| `matchcenterDuoPairKey` | function | 16390–16393 | 4 |
| `matchcenterEnsureOpponentDuo` | function | 16394–16426 | 33 |
| `matchcenterDuoDirectionLabel` | function | 16427–16433 | 7 |
| `matchcenterAddDuoConnection` | function | 16434–16452 | 19 |
| `matchcenterFinalizeOpponentDuos` | function | 16453–16487 | 35 |
| `matchcenterBuildOpponentDuos` | function | 16488–16532 | 45 |
| `matchcenterBuildOpponentDuoInsights` | function | 16533–16546 | 14 |
| `matchcenterEnsureUlmDuo` | function | 16547–16584 | 38 |
| `matchcenterAddUlmDuoConnection` | function | 16585–16603 | 19 |
| `matchcenterFinalizeUlmDuos` | function | 16604–16639 | 36 |
| `matchcenterBuildUlmDuos` | function | 16640–16682 | 43 |
| `matchcenterBuildUlmDuoInsights` | function | 16683–16695 | 13 |
| `matchcenterDirectContextGames` | function | 16696–16698 | 3 |
| `matchcenterSpecialTeamsForGame` | function | 16699–16702 | 4 |
| `matchcenterPersonalPenaltyMinutesForSide` | function | 16703–16711 | 9 |
| `matchcenterPct` | function | 16712–16715 | 4 |
| `matchcenterBuildSpecialTeamsMatchup` | function | 16716–16763 | 48 |
| `matchcenterGoalieKey` | function | 16764–16768 | 5 |
| `matchcenterGoalieFitScore` | function | 16769–16785 | 17 |
| `matchcenterBuildGoalieMatchup` | function | 16786–16831 | 46 |
| `matchcenterGoalAbsSeconds` | function | 16834–16838 | 5 |
| `matchcenterTimeValue` | function | 16839–16846 | 8 |
| `matchcenterEmptyTimingStats` | function | 16847–16855 | 9 |
| `matchcenterWindowForSecond` | function | 16856–16862 | 7 |
| `matchcenterTimingStatsForGames` | function | 16863–16900 | 38 |
| `matchcenterBuildTimingInsights` | function | 16901–16911 | 11 |
| `matchcenterBuildTimingAnalysis` | function | 16912–16922 | 11 |
| `rMatchcenterTimeBars` | function | 16923–16936 | 14 |
| `rMatchcenterTimingStatsCard` | function | 16937–16956 | 20 |
| `rMatchcenterTiming` | function | 16957–16980 | 24 |
| `rMatchcenterTabs` | function | 16996–16998 | 3 |
| `rMatchcenterProfileSection` | function | 16999–17018 | 20 |
| `rMatchcenterFormSection` | function | 17019–17044 | 26 |
| `rMatchcenterDetailsSection` | function | 17045–17052 | 8 |
| `matchcenterResultClass` | function | 17053–17055 | 3 |
| `matchcenterUlmTeamLabelForGame` | function | 17057–17061 | 5 |
| `matchcenterGameLine` | function | 17062–17067 | 6 |
| `matchcenterFormLine` | function | 17068–17072 | 5 |
| `matchcenterBuildInsights` | function | 17073–17093 | 21 |
| `rMatchcenterKpi` | function | 17094–17100 | 7 |
| `rMatchcenterFormCard` | function | 17101–17121 | 21 |
| `rMatchcenterGamesList` | function | 17122–17133 | 12 |
| `rMatchcenterWatchCard` | function | 17134–17154 | 21 |
| `rMatchcenterPlayerRow` | function | 17155–17178 | 24 |
| `rMatchcenterRankCard` | function | 17179–17184 | 6 |
| `rMatchcenterUlmImpactCard` | function | 17185–17213 | 29 |
| `rMatchcenterUlmPlayerRow` | function | 17214–17237 | 24 |
| `rMatchcenterUlmRankCard` | function | 17238–17243 | 6 |
| `rMatchcenterUlmScouting` | function | 17244–17280 | 37 |
| `rMatchcenterOpponentScouting` | function | 17281–17316 | 36 |
| `rMatchcenterPlayersTab` | function | 17317–17319 | 3 |
| `rMatchcenterDuoWatchCard` | function | 17320–17339 | 20 |
| `rMatchcenterDuoRow` | function | 17340–17363 | 24 |
| `rMatchcenterDuoRankCard` | function | 17364–17369 | 6 |
| `rMatchcenterUlmDuoWatchCard` | function | 17370–17395 | 26 |
| `rMatchcenterUlmDuoRow` | function | 17396–17418 | 23 |
| `rMatchcenterUlmDuoRankCard` | function | 17419–17424 | 6 |
| `rMatchcenterUlmDuos` | function | 17425–17467 | 43 |
| `rMatchcenterOpponentDuos` | function | 17468–17510 | 43 |
| `rMatchcenterDuosTab` | function | 17511–17513 | 3 |
| `rMatchcenterSpecialCard` | function | 17514–17522 | 9 |
| `rMatchcenterSpecialTeams` | function | 17523–17572 | 50 |
| `rMatchcenterGoalieCard` | function | 17573–17596 | 24 |
| `rMatchcenterGoalieMatchup` | function | 17597–17625 | 29 |
| `matchcenterPlanScoreText` | function | 17626–17629 | 4 |
| `matchcenterPlanRateText` | function | 17630–17634 | 5 |
| `matchcenterPriorityLabel` | function | 17635–17637 | 3 |
| `matchcenterConfidenceClass` | function | 17638–17643 | 6 |
| `matchcenterInferPriority` | function | 17644–17650 | 7 |
| `matchcenterAddPlanItem` | function | 17651–17656 | 6 |
| `matchcenterAddPlanWatch` | function | 17657–17662 | 6 |
| `matchcenterBuildPlanConfidence` | function | 17663–17710 | 48 |
| `matchcenterIntelCurve` | function | 17711–17716 | 6 |
| `matchcenterIntelInverseCurve` | function | 17717–17720 | 4 |
| `matchcenterIntelWeighted` | function | 17721–17731 | 11 |
| `matchcenterIntelRate` | function | 17732–17735 | 4 |
| `matchcenterIntelPct` | function | 17736–17739 | 4 |
| `matchcenterIntelPriorityFromScore` | function | 17740–17745 | 6 |
| `matchcenterIntelPriorityClass` | function | 17746–17751 | 6 |
| `matchcenterIntelPriorityLabel` | function | 17752–17755 | 4 |
| `matchcenterIntelDataLabel` | function | 17756–17758 | 3 |
| `matchcenterBuildIntelligenceDataQuality` | function | 17759–17828 | 70 |
| `matchcenterBuildOpponentDNA` | function | 17829–17941 | 113 |
| `matchcenterDeriveOpponentType` | function | 17942–17959 | 18 |
| `matchcenterIntelPlayerRef` | function | 17960–17972 | 13 |
| `matchcenterIntelDuoRef` | function | 17973–17986 | 14 |
| `matchcenterIntelAddAlarm` | function | 17987–18007 | 21 |
| `matchcenterBuildOpponentAlarm` | function | 18008–18117 | 110 |
| `matchcenterBuildIntelListFromPlan` | function | 18118–18126 | 9 |
| `matchcenterBuildCoachHints` | function | 18127–18142 | 16 |
| `matchcenterBuildIntelHeadline` | function | 18143–18150 | 8 |
| `matchcenterBuildOneThingToWatch` | function | 18151–18163 | 13 |
| `matchcenterBuildIntelligenceSignals` | function | 18164–18210 | 47 |
| `buildMatchIntelligenceFromContext` | function | 18211–18265 | 55 |
| `buildMatchIntelligence` | function | 18266–18287 | 22 |
| `matchcenterCoachCautious` | function | 18288–18290 | 3 |
| `matchcenterCoachAdd` | function | 18291–18299 | 9 |
| `matchcenterCoachGameModel` | function | 18300–18313 | 14 |
| `buildMatchStories` | function | 18314–18343 | 30 |
| `matchcenterCoachPriorityFromAlarm` | function | 18344–18353 | 10 |
| `matchcenterBuildCoachPriorities` | function | 18354–18360 | 7 |
| `matchcenterBuildCoachLevers` | function | 18361–18370 | 10 |
| `matchcenterBuildCoachDangerPatterns` | function | 18371–18378 | 8 |
| `matchcenterBuildCoachIfThen` | function | 18379–18388 | 10 |
| `matchcenterBuildCoachAvoidList` | function | 18389–18398 | 10 |
| `matchcenterBuildCoachActivationHints` | function | 18399–18405 | 7 |
| `matchcenterBuildCoachKeyActors` | function | 18406–18413 | 8 |
| `buildDigitalCoachReport` | function | 18414–18446 | 33 |
| `buildLockerRoomSheet` | function | 18447–18467 | 21 |
| `matchcenterSocialAdd` | function | 18468–18474 | 7 |
| `matchcenterSocialCaption` | function | 18475–18480 | 6 |
| `socialSentence` | function | 18481–18483 | 3 |
| `socialEnsurePeriod` | function | 18484–18487 | 4 |
| `socialFirstUseful` | function | 18488–18490 | 3 |
| `socialPlayerFocusLine` | function | 18491–18497 | 7 |
| `socialDuoFocusLine` | function | 18498–18503 | 6 |
| `socialOpponentLine` | function | 18504–18507 | 4 |
| `socialKeyFactLine` | function | 18508–18517 | 10 |
| `buildMatchdayCaptionBlocks` | function | 18518–18547 | 30 |
| `buildSocialMediaContent` | function | 18548–18596 | 49 |
| `isSyntheticLineupPlayerId` | function | 18602–18604 | 3 |
| `getSyntheticLineupPlayers` | function | 18605–18607 | 3 |
| `getSyntheticLineupRow` | function | 18608–18624 | 17 |
| `getSyntheticLineupRows` | function | 18625–18627 | 3 |
| `getLineupAllRows` | function | 18628–18630 | 3 |
| `lineupRowMeta` | function | 18631–18638 | 8 |
| `getLineupPlayerPool` | function | 18639–18647 | 9 |
| `lineupScore` | function | 18648–18653 | 6 |
| `lineupAverage` | function | 18654–18657 | 4 |
| `lineupLevelLabel` | function | 18658–18661 | 4 |
| `lineupRosterGamesForPlayer` | function | 18664–18711 | 48 |
| `buildLineupExperienceProfile` | function | 18712–18754 | 43 |
| `lineupOpponentDNAForContext` | function | 18755–18766 | 12 |
| `buildLineupOpponentDNAFit` | function | 18767–18810 | 44 |
| `classifyLineIdentity` | function | 18811–18858 | 48 |
| `lineupPlayerProfile` | function | 18859–18934 | 76 |
| `buildLineupAnalysis` | function | 18935–19068 | 134 |
| `buildLineupScoreBreakdowns` | function | 19069–19098 | 30 |
| `buildLineupIntelligence` | function | 19099–19109 | 11 |
| `buildLineAnalysis` | function | 19110–19112 | 3 |
| `lineupRowMap` | function | 19113–19115 | 3 |
| `lineupRankCandidateIds` | function | 19116–19130 | 15 |
| `lineupCombinationIds` | function | 19131–19144 | 14 |
| `lineupStdDev` | function | 19145–19150 | 6 |
| `lineupRoleDnaComplementScore` | function | 19151–19174 | 24 |
| `lineupDirectChemistryScore` | function | 19175–19181 | 7 |
| `lineupEvaluateComplementCandidate` | function | 19182–19260 | 79 |
| `lineupPlayerAnchorScore` | function | 19261–19278 | 18 |
| `lineupPlayerAnchorConfidence` | function | 19281–19285 | 5 |
| `buildTeamLineBalance` | function | 19286–19329 | 44 |
| `buildBalancedLineupSet` | function | 19330–19356 | 27 |
| `lineupRecommendationReason` | function | 19357–19365 | 9 |
| `buildLineupRecommendations` | function | 19366–19447 | 82 |
| `recommendLineComplements` | function | 19448–19475 | 28 |
| `matchcenterBuildMatchPlan` | function | 19476–19621 | 146 |
| `rMatchcenterPlanItems` | function | 19622–19639 | 18 |
| `rMatchcenterPlanWatch` | function | 19640–19655 | 16 |
| `rMatchcenterOpponentDNA` | function | 19656–19688 | 33 |
| `rMatchcenterOpponentAlarm` | function | 19689–19710 | 22 |
| `rMatchcenterIntelOverview` | function | 19711–19756 | 46 |
| `rMatchcenterIntelCoachHints` | function | 19757–19770 | 14 |
| `rMatchcenterCoachCardList` | function | 19771–19784 | 14 |
| `rMatchcenterCoachIfThen` | function | 19785–19792 | 8 |
| `rMatchcenterCoachSimpleList` | function | 19793–19797 | 5 |
| `rMatchcenterDigitalCoach` | function | 19798–19862 | 65 |
| `rMatchcenterCopyButton` | function | 19863–19867 | 5 |
| `rMatchcenterLockerList` | function | 19868–19879 | 12 |
| `rMatchcenterLockerRoomSheet` | function | 19880–19935 | 56 |
| `rMatchcenterSocialBlock` | function | 19936–19943 | 8 |
| `matchcenterStoryDownloadFileName` | function | 19944–19953 | 10 |
| `downloadMatchdayStory` | window | 19954–20001 | 48 |
| `rSocialVideoBlock` | function | 20005–20036 | 32 |
| `socialVideoJobsForMatchday` | function | 20039–20045 | 7 |
| `generateSocialVideoVideos` | window | 20046–20087 | 42 |
| `cancelSocialVideoRecording` | window | 20088–20090 | 3 |
| `generateSocialVideoStandbilder` | window | 20091–20114 | 24 |
| `generateSocialVideoContactSheets` | window | 20115–20137 | 23 |
| `rMatchcenterSocialMediaCenter` | function | 20138–20191 | 54 |
| `rLineupScoreRows` | function | 20192–20213 | 22 |
| `rLineupSimpleCards` | function | 20214–20222 | 9 |
| `rMatchcenterLineupBuilder` | function | 20223–20295 | 73 |
| `rLineupMetricPills` | function | 20296–20309 | 14 |
| `rLineupBuilderAvailablePanel` | function | 20310–20357 | 48 |
| `rLineupRecommendationCards` | function | 20358–20372 | 15 |
| `rLineupRecommendationMode` | function | 20373–20406 | 34 |
| `rLineupComplementCards` | function | 20407–20419 | 13 |
| `rLineupTestLine` | function | 20420–20468 | 49 |
| `rLineupTestMode` | function | 20469–20485 | 17 |
| `rLineupBuilderPage` | function | 20486–20520 | 35 |
| `rMatchcenterScoutingSummary` | function | 20521–20564 | 44 |
| `rMatchcenterMatchPlan` | function | 20565–20585 | 21 |
| `matchcenterStoryLogoBase` | function | 20588–20593 | 6 |
| `matchcenterStorySafeLogoUrl` | function | 20594–20600 | 7 |
| `getTeamLogoUrlForStory` | function | 20609–20638 | 30 |
| `matchcenterStoryLogoForOpponent` | function | 20639–20653 | 15 |
| `matchcenterStoryTableRank` | function | 20654–20664 | 11 |
| `matchcenterStoryUlmTableRank` | function | 20665–20671 | 7 |
| `matchcenterStoryRankText` | function | 20672–20675 | 4 |
| `matchcenterStoryInlineStat` | function | 20676–20678 | 3 |
| `matchcenterStoryRankRows` | function | 20680–20691 | 12 |
| `matchcenterStoryAddFact` | function | 20694–20700 | 7 |
| `matchcenterStoryFactKey` | function | 20701–20703 | 3 |
| `matchcenterStoryLooksArtificial` | function | 20704–20706 | 3 |
| `matchcenterStoryEstimateFactWeight` | function | 20707–20712 | 6 |
| `matchcenterStoryAddCandidate` | function | 20713–20735 | 23 |
| `matchcenterStoryCategoryLimit` | function | 20736–20739 | 4 |
| `matchcenterStoryNormalizePickOptions` | function | 20740–20750 | 11 |
| `matchcenterStoryCandidateForBudget` | function | 20751–20760 | 10 |
| `matchcenterStoryPickFactItems` | function | 20761–20813 | 53 |
| `matchcenterStoryPickFacts` | function | 20814–20816 | 3 |
| `matchcenterStoryCurrentStreak` | function | 20818–20826 | 9 |
| `matchcenterStoryWinlessStreak` | function | 20827–20835 | 9 |
| `matchcenterStoryFormFact` | function | 20836–20846 | 11 |
| `matchcenterStoryFormFactCandidates` | function | 20847–20866 | 20 |
| `matchcenterStoryLateGoalsForOutcome` | function | 20867–20870 | 4 |
| `matchcenterStoryClutchFact` | function | 20871–20885 | 15 |
| `matchcenterStoryPlayerClutchTotal` | function | 20886–20893 | 8 |
| `matchcenterStoryBestClutchPlayer` | function | 20894–20903 | 10 |
| `matchcenterStoryPlayerClutchFact` | function | 20904–20929 | 26 |
| `matchcenterStoryDuoClutchTotal` | function | 20930–20937 | 8 |
| `matchcenterStoryBestClutchDuo` | function | 20938–20947 | 10 |
| `matchcenterStoryDuoClutchFact` | function | 20948–20950 | 3 |
| `matchcenterStoryDuoFact` | function | 20951–20971 | 21 |
| `matchcenterStoryClutchPriority` | function | 20972–20974 | 3 |
| `matchcenterStoryCompetitionLabel` | function | 20975–20978 | 4 |
| `matchcenterStoryShortDuel` | function | 20979–20983 | 5 |
| `matchcenterStoryLastDuelLabel` | function | 20984–20987 | 4 |
| `matchcenterStoryDirectFactCandidates` | function | 20988–21009 | 22 |
| `matchcenterStoryPlanFactCandidates` | function | 21010–21022 | 13 |
| `matchcenterStoryCategoryForPlanFact` | function | 21023–21031 | 9 |
| `buildMatchcenterStoryPreviewData` | function | 21032–21143 | 112 |
| `matchcenterStoryNameClass` | function | 21144–21149 | 6 |
| `matchcenterStoryVisibleFacts` | function | 21150–21180 | 31 |
| `rMatchcenterStoryLogo` | function | 21181–21185 | 5 |
| `rMatchcenterStoryForm` | function | 21186–21190 | 5 |
| `rMatchcenterStoryPlayerCard` | function | 21191–21198 | 8 |
| `rMatchcenterStoryPreview` | function | 21199–21268 | 70 |
| `rMatchcenterStoryFrame` | function | 21269–21274 | 6 |
| `fitMatchcenterStoryLayout` | function | 21275–21317 | 43 |
| `ensureSocialVideoExportCapabilityChecked` | function | 21326–21330 | 5 |
| `downloadSocialVideoStandbild` | window | 21345–21364 | 20 |
| `downloadSocialVideoContactSheet` | window | 21369–21394 | 26 |
| `rMatchcenterPage` | function | 21396–21544 | 149 |
| `rTeamNoGoalStreakCard` | function | 21555–21566 | 12 |
| `rTeamPage` | function | 21567–21907 | 341 |
| `exportExcel` | function | 21912–21937 | 26 |
| `render` | function | 21943–21960 | 18 |
| `_render` | function | 21961–22130 | 170 |
| `uiFormatNumber` | function | 22164–22168 | 5 |
| `uiReliabilityDots` | function | 22177–22184 | 8 |
| `uiDeltaIndicator` | function | 22192–22198 | 7 |
| `uiInfoIcon` | function | 22210–22214 | 5 |
| `uiKennzahlKachel` | function | 22222–22233 | 12 |
| `uiKernaussage` | function | 22242–22248 | 7 |
| `uiHinweisKarte` | function | 22256–22268 | 13 |
| `uiRangliste` | function | 22278–22295 | 18 |
| `uiVerlauf` | function | 22306–22325 | 20 |
| `uiIntervallBalken` | function | 22332–22344 | 13 |
| `uiMethodenbox` | function | 22351–22360 | 10 |
| `uiNotiz` | function | 22368–22372 | 5 |
| `datenstandQuoteState` | function | 22394–22401 | 8 |
| `uiQuoteText` | function | 22404–22410 | 7 |
| `uiDatenstandBand` | function | 22427–22440 | 14 |
| `uiPlatzhalter` | function | 22448–22453 | 6 |
| `uiObjektseiteSortTabs` | function | 22498–22506 | 9 |
| `uiObjektseite` | function | 22516–22549 | 34 |
| `mainNavActiveKeyForPage` | function | 22606–22611 | 6 |
| `goToMainNavPoint` | window | 22612–22618 | 7 |
| `rMainNav` | function | 22619–22623 | 5 |
| `rMainNavBottom` | function | 22641–22648 | 8 |
| `openOverview` | window | 22658–22666 | 9 |
| `switchOverviewSeason` | window | 22675–22681 | 7 |
| `openMatchdayTimeline` | window | 22709–22716 | 8 |
| `openMatchday` | window | 22717–22726 | 10 |
| `switchMatchdaySeason` | window | 22728–22733 | 6 |
| `matchdayUlmGames` | function | 22735–22737 | 3 |
| `matchdayLineupInfo` | function | 22744–22754 | 11 |
| `matchdayLineupCardHtml` | function | 22756–22762 | 7 |
| `matchdayGameCardHtml` | function | 22763–22782 | 20 |
| `matchdayFixtureCardHtml` | function | 22788–22796 | 9 |
| `rMatchdayTimelineRow` | function | 22798–22805 | 8 |
| `rMatchdayTimelinePage` | function | 22806–22816 | 11 |
| `rMatchdayDetailPage` | function | 22817–22856 | 40 |
| `rMatchdayPage` | function | 22857–22863 | 7 |
| `overviewMatchdayStartMs` | function | 22882–22887 | 6 |
| `overviewMatchdayEndMs` | function | 22888–22893 | 6 |
| `detectOverviewPhase` | function | 22894–22919 | 26 |
| `getSeasonDataState` | function | 22926–22936 | 11 |
| `parseSeasonDataState` | function | 22937–22945 | 9 |
| `isNewSeasonDataState` | function | 22947–22949 | 3 |
| `recordOverviewVisit` | function | 22956–22965 | 10 |
| `overviewOpponentLabel` | function | 22971–22982 | 12 |
| `overviewLastMatchdayText` | function | 22983–22986 | 4 |
| `overviewNextMatchdayHtml` | function | 22993–23009 | 17 |
| `overviewCompactTableHtml` | function | 23017–23033 | 17 |
| `overviewFormHtml` | function | 23035–23049 | 15 |
| `overviewSeasonBilanzHtml` | function | 23050–23056 | 7 |
| `overviewSeasonAwardHtml` | function | 23058–23067 | 10 |
| `overviewRecordHtml` | function | 23069–23074 | 6 |
| `overviewCrossSeasonTrendHtml` | function | 23076–23084 | 9 |
| `overviewOpponentPreviewHtml` | function | 23085–23089 | 5 |
| `overviewMatchcenterLinkHtml` | function | 23090–23092 | 3 |
| `overviewLineupLinkHtml` | function | 23093–23095 | 3 |
| `overviewRankChangeTile` | function | 23112–23129 | 18 |
| `buildOverviewCards` | function | 23138–23178 | 41 |
| `rOverviewPage` | function | 23188–23199 | 12 |
| `openLigaGegner` | window | 23200–23203 | 4 |
| `rLigaGegnerPlaceholderPage` | function | 23204–23209 | 6 |
| `rAsOfSelector` | function | 23221–23233 | 13 |
| `setContextAsOf` | window | 23234–23245 | 12 |
| `rSeasonDataPreviewContextHint` | function | 23256–23264 | 9 |
| `rSeasonDataStateContextHint` | function | 23273–23279 | 7 |
| `rContextBar` | function | 23304–23322 | 19 |
| `rIaShell` | function | 23324–23326 | 3 |
| `globalSearchTokens` | function | 23343–23346 | 4 |
| `globalSearchEntries` | function | 23348–23361 | 14 |
| `globalSearchPlayerScore` | function | 23362–23369 | 8 |
| `globalSearchMatchdayScore` | function | 23371–23383 | 13 |
| `globalSearchMatch` | function | 23385–23396 | 12 |
| `globalSearchIsEditableTarget` | function | 23397–23401 | 5 |
| `globalSearchKeyAction` | function | 23403–23417 | 15 |
| `rGlobalSearchToggle` | function | 23418–23420 | 3 |
| `rGlobalSearchResultsHtml` | function | 23421–23431 | 11 |
| `rGlobalSearchPanelHtml` | function | 23432–23434 | 3 |
| `paintGlobalSearchResults` | function | 23435–23442 | 8 |
| `openGlobalSearch` | window | 23443–23467 | 25 |
| `closeGlobalSearch` | window | 23468–23475 | 8 |
| `onGlobalSearchInput` | window | 23476–23481 | 6 |
| `moveGlobalSearch` | function | 23482–23487 | 6 |
| `activateGlobalSearchResult` | window | 23488–23497 | 10 |
| `globalSearchOnKeydown` | function | 23498–23519 | 22 |
| `initGlobalSearch` | function | 23520–23524 | 5 |
| `rToolMenu` | function | 23546–23549 | 4 |
| `toolMenuElements` | function | 23550–23552 | 3 |
| `toolMenuItemElements` | function | 23553–23555 | 3 |
| `isToolMenuOpen` | function | 23556–23559 | 4 |
| `openToolMenu` | window | 23560–23567 | 8 |
| `closeToolMenu` | window | 23568–23574 | 7 |
| `toggleToolMenu` | window | 23575–23578 | 4 |
| `activateToolMenuItem` | window | 23579–23586 | 8 |
| `toolMenuOnKeydown` | function | 23587–23610 | 24 |
| `toolMenuOnClick` | function | 23611–23617 | 7 |
| `initToolMenu` | function | 23618–23621 | 4 |

## Alphabetisches Register

| Name | Art | Zeile |
|---|---|---|
| `_render` | function | 21961 |
| `acceptEinsatzCenterRosterSuggestion` | window | 7735 |
| `activateGlobalSearchResult` | window | 23488 |
| `activateToolMenuItem` | window | 23579 |
| `addComparisonDuo` | window | 13512 |
| `addComparisonDuoFromSelection` | window | 13504 |
| `addComparisonItem` | window | 13412 |
| `addDuoTeamGame` | function | 11344 |
| `addEinsatzCenterExistingGroup` | window | 7752 |
| `addEinsatzCenterGroupPlayer` | window | 7820 |
| `addEinsatzCenterNewGroup` | window | 7761 |
| `addEinsatzCenterRosterPlayer` | window | 7701 |
| `addGoalieGameToStats` | function | 4594 |
| `addGoalieSpecialTeamsGameToStats` | function | 4564 |
| `addLineupBuilderPlayerToActiveLine` | window | 2349 |
| `addLineupBuilderPlayerToLine` | window | 2339 |
| `addLineupPlayer` | window | 2285 |
| `addRosterImpactGameToStats` | function | 11879 |
| `addSelectedComparisonItem` | window | 13420 |
| `addSyntheticLineupPlayer` | window | 2365 |
| `addUnique` | function | 3720 |
| `aggregateAllTimeDuos` | function | 4944 |
| `aggregateAllTimePlayers` | function | 4014 |
| `aggregateAlltimeSpecialTeams` | function | 4544 |
| `aggregateGoalieAlltimeStats` | function | 4780 |
| `aggregateSeasonStats` | function | 4956 |
| `analysisCacheContext` | function | 2191 |
| `analysisCacheKey` | function | 2225 |
| `annotateSpecialTeamsGoalEvent` | function | 4323 |
| `antiSynergyDeltaClass` | function | 12114 |
| `antiSynergyImpactScore` | function | 12020 |
| `antiSynergyPartnerIsSgOnly` | function | 12166 |
| `antiSynergySigned` | function | 12118 |
| `appendSeasonGameDiagnostics` | function | 2561 |
| `applyAppHash` | function | 3509 |
| `applyCurrentSeasonCoverHighlight` | function | 6205 |
| `applyGlobalPageFromHash` | function | 3476 |
| `applySeasonContext` | function | 2426 |
| `applySeasonScoringToRegistry` | function | 3878 |
| `asOfCacheKeyPart` | function | 2219 |
| `asOfEquals` | function | 3180 |
| `assignStatus` | function | 5811 |
| `avgOrNull` | function | 4058 |
| `backToComparisonModeSelect` | window | 13440 |
| `backToHome` | window | 2402 |
| `buildAlltimePlayerDashModel` | function | 14579 |
| `buildAnnotatedGoalEventsForGame` | function | 10937 |
| `buildAppHash` | function | 3326 |
| `buildBalancedLineupSet` | function | 19330 |
| `buildBestThirdManOptions` | function | 10822 |
| `buildComparisonDataset` | function | 13881 |
| `buildComparisonExtraMetrics` | function | 13736 |
| `buildComparisonSummary` | function | 14245 |
| `buildConfidence` | function | 15790 |
| `buildDigitalCoachReport` | function | 18414 |
| `buildDirectDuoLookupForPlayer` | function | 10780 |
| `buildDryRunReport` | function | 6429 |
| `buildDuoAntiSynergy` | function | 12104 |
| `buildDuoComparison` | function | 13525 |
| `buildDuoCompatibility` | function | 11467 |
| `buildDuoDirectProduction` | function | 11320 |
| `buildDuoFloorCeiling` | function | 11231 |
| `buildDuoGapAnalysis` | function | 11439 |
| `buildDuoNetworkContext` | function | 11415 |
| `buildDuoOpponentAdjusted` | function | 11402 |
| `buildDuoProAnalysis` | function | 11526 |
| `buildDuoReplacementOptions` | function | 11514 |
| `buildDuoUntestedPotential` | function | 11490 |
| `buildDuoUsageRate` | function | 11502 |
| `buildDuoWarnings` | function | 11273 |
| `buildDuoWithWithoutImpact` | function | 11368 |
| `buildEinsatzCenterDraftExport` | function | 7881 |
| `buildFieldPlayerExplanation` | function | 15218 |
| `buildGlobalPageHash` | function | 3343 |
| `buildGoalieAnalysisModel` | function | 9716 |
| `buildGoalieComparisonDataset` | function | 13830 |
| `buildGoalieGameRecord` | function | 4646 |
| `buildGoaliePlayerExplanation` | function | 15293 |
| `buildGoalieRoleProfile` | function | 9942 |
| `buildGoalieStatsForSeason` | function | 4699 |
| `buildHallOfFameIntroTitle` | function | 8591 |
| `buildHallOfFameLongestNoGoalStreak` | function | 13051 |
| `buildHashStringFromParsed` | function | 3358 |
| `buildIdentityProfiles` | function | 5533 |
| `buildLineAnalysis` | function | 19110 |
| `buildLineupAnalysis` | function | 18935 |
| `buildLineupExperienceProfile` | function | 18712 |
| `buildLineupIntelligence` | function | 19099 |
| `buildLineupOpponentDNAFit` | function | 18767 |
| `buildLineupRecommendations` | function | 19366 |
| `buildLineupScoreBreakdowns` | function | 19069 |
| `buildLockerRoomSheet` | function | 18447 |
| `buildMatchcenterStoryPreviewData` | function | 21032 |
| `buildMatchdayCaptionBlocks` | function | 18518 |
| `buildMatchIntelligence` | function | 18266 |
| `buildMatchIntelligenceFromContext` | function | 18211 |
| `buildMatchStories` | function | 18314 |
| `buildMomentumSwingStats` | function | 11225 |
| `buildMomentumSwingStatsRaw` | function | 11154 |
| `buildOpponentIntelligence` | function | 10619 |
| `buildOverviewCards` | function | 23138 |
| `buildPlayerDataFoundation` | function | 4973 |
| `buildPlayerEvents` | function | 5028 |
| `buildPlayerExplanation` | function | 15347 |
| `buildPlayerIdentity` | function | 3731 |
| `buildPlayerIntelligence` | function | 15356 |
| `buildRecencyWeightedGlobalIdentityProfile` | function | 12685 |
| `buildRegistry` | function | 4997 |
| `buildResponseGoalStats` | function | 11142 |
| `buildResponseGoalStatsRaw` | function | 11093 |
| `buildRosterImpactAnalysis` | function | 12035 |
| `buildRosterImpactGameIndex` | function | 11922 |
| `buildSeasonDataPreviewChanges` | function | 6534 |
| `buildSeasonDuos` | function | 4900 |
| `buildSeasonPlayerDashModel` | function | 14542 |
| `buildSocialMediaContent` | function | 18548 |
| `buildSoloDuoProfile` | function | 5298 |
| `buildSpecialTeamsForGame` | function | 4338 |
| `buildSpecialTeamsForSeason` | function | 4535 |
| `buildStaticSeasonDataBlock` | function | 6253 |
| `buildTeamLineBalance` | function | 19286 |
| `cachedAnalysis` | function | 2229 |
| `cancelDuoProPicker` | window | 11729 |
| `cancelEinsatzCenterEdit` | window | 7682 |
| `cancelHallOfFameIntro` | function | 8680 |
| `cancelSocialVideoRecording` | window | 20088 |
| `capSuperlativeLabel` | function | 15914 |
| `clampScore` | function | 15777 |
| `classicTagLabel` | function | 8834 |
| `classifyLineIdentity` | function | 18811 |
| `classifyPenaltyType` | function | 4218 |
| `cleanupHallOfFameIntro` | function | 8620 |
| `clearAnalysisCache` | function | 2188 |
| `clearComparison` | window | 13431 |
| `clearComparisonDuos` | window | 13519 |
| `clearLineupAvailable` | window | 2338 |
| `clearLineupBuilderLine` | window | 2357 |
| `clearLineupPlayers` | window | 2292 |
| `clearlyAboveAverage` | function | 5490 |
| `clonePlain` | function | 4157 |
| `closeGlobalSearch` | window | 23468 |
| `closeMatchcenterStoryPreview` | window | 2257 |
| `closeToolMenu` | window | 23568 |
| `clutchText` | function | 5370 |
| `collectAssistEventRefs` | function | 2896 |
| `comparisonDuoContext` | function | 13445 |
| `comparisonEventGameKey` | function | 13723 |
| `comparisonEventPhaseLabel` | function | 13726 |
| `comparisonFmt` | function | 13213 |
| `comparisonItemKey` | function | 13191 |
| `comparisonJsArg` | function | 13202 |
| `comparisonNum` | function | 13205 |
| `comparisonOpponentStrengthTier` | function | 13730 |
| `comparisonPct` | function | 13209 |
| `comparisonPctFmt` | function | 13217 |
| `comparisonVariantValue` | function | 13334 |
| `composeIdentityText` | function | 5765 |
| `computeCurrentAppHash` | function | 3378 |
| `computeEinsatzCenterStats` | function | 6895 |
| `computeMetrics` | function | 5143 |
| `computeRosterStatus` | function | 5791 |
| `confidenceCautiousText` | function | 15836 |
| `confidenceFromSampleSize` | function | 12012 |
| `confirmDuoProSelection` | window | 11734 |
| `confirmEinsatzCenterCombo` | window | 7853 |
| `copyMatchcenterText` | window | 2259 |
| `countBy` | function | 10366 |
| `countCaptainAppearances` | function | 5773 |
| `countGoalieAppearances` | function | 5787 |
| `countMomentumClusters` | function | 5409 |
| `countPlayedUlmGames` | function | 2816 |
| `createPlayerAnalysisProfile` | function | 3651 |
| `createSeasonBucket` | function | 1813 |
| `datenstandQuoteState` | function | 22394 |
| `decodeHashSegmentSafe` | function | 3251 |
| `dedupeGamesById` | function | 15957 |
| `dedupeIdentityProfileTags` | function | 12762 |
| `deriveAsOfForSeason` | function | 3056 |
| `deriveLineupUlmPlayerIds` | function | 7392 |
| `deriveLineupValidPlayerIds` | function | 7368 |
| `derivePlayerStatus` | function | 3760 |
| `detectOverviewPhase` | function | 22894 |
| `detectSide` | const-arrow | 2517 |
| `detectTypes` | function | 5278 |
| `detectUlmSide` | function | 2510 |
| `diagnoseGameDuplicates` | function | 2539 |
| `diagnosticError` | function | 6026 |
| `diffGameIds` | function | 6376 |
| `difficultConnectionConfidence` | function | 10756 |
| `discardEinsatzCenterAutosave` | function | 7291 |
| `discardSeasonDataPreview` | function | 6633 |
| `dismissEinsatzCenterRosterSuggestion` | window | 7724 |
| `downloadMatchdayStory` | window | 19954 |
| `downloadSocialVideoContactSheet` | window | 21369 |
| `downloadSocialVideoStandbild` | window | 21345 |
| `duoProContextSeasonKey` | function | 11295 |
| `duoProDomId` | function | 11690 |
| `duoProPairKey` | function | 11292 |
| `duoProPickerMessage` | function | 11696 |
| `duoProPickerOpen` | function | 11693 |
| `duoProPlayer` | function | 11309 |
| `duoProResolveCandidate` | function | 11709 |
| `duoProSelectionPayload` | function | 11718 |
| `duoScopeSeasonKeys` | function | 10798 |
| `einsatzCenterAutosaveDraft` | function | 7207 |
| `einsatzCenterAutosaveInfoText` | function | 7313 |
| `einsatzCenterAutosaveKey` | function | 7118 |
| `einsatzCenterCanonicalJson` | function | 7451 |
| `einsatzCenterComputeBaseHash` | function | 7466 |
| `einsatzCenterCurrentRawBaseHash` | function | 7193 |
| `einsatzCenterDeserializeAutosave` | function | 7153 |
| `einsatzCenterDraftInView` | function | 7022 |
| `einsatzCenterDraftIsEmpty` | function | 7130 |
| `einsatzCenterDraftStaleHint` | function | 7036 |
| `einsatzCenterInspectAutosave` | function | 7242 |
| `einsatzCenterIsPlainObject` | function | 7147 |
| `einsatzCenterSerializeDraft` | function | 7134 |
| `einsatzCenterSha256Hex` | function | 7461 |
| `einsatzCenterSoftIssues` | function | 7475 |
| `einsatzCenterStorageRead` | function | 7119 |
| `einsatzCenterStorageRemove` | function | 7125 |
| `einsatzCenterStorageWrite` | function | 7122 |
| `emptyDuoTeamImpactStats` | function | 11341 |
| `emptyFieldRoleSeasonStats` | function | 3716 |
| `emptyGoalieAlltimeStats` | function | 3688 |
| `emptyGoalieSeasonStats` | function | 3664 |
| `emptyGoalieSpecialTeamsStats` | function | 3704 |
| `emptyPlayerSeasonStats` | function | 3655 |
| `emptyRosterImpactStats` | function | 11868 |
| `emptySpecialTeamsStats` | function | 4116 |
| `ensureAppLoaded` | function | 8534 |
| `ensureEinsatzCenterDraft` | function | 7058 |
| `ensureExternalSeasonData` | function | 6231 |
| `ensureFieldRoleSeasonStats` | function | 3826 |
| `ensureGlobalDataLoaded` | function | 8462 |
| `ensureGoalieSeasonStats` | function | 3821 |
| `ensureHallOfFameIntroOverlay` | function | 8558 |
| `ensureLineupDataLoaded` | function | 6741 |
| `ensureLineupGroupsRegistryLoaded` | function | 6766 |
| `ensureRmDuo` | function | 11073 |
| `ensureRmPlayer` | function | 11067 |
| `ensureSocialVideoExportCapabilityChecked` | function | 21326 |
| `escAttr` | function | 8807 |
| `escHtml` | function | 12781 |
| `eventMatchesTeams` | function | 5364 |
| `explainScore` | function | 15840 |
| `exportEinsatzCenterDraft` | window | 7895 |
| `exportExcel` | function | 21912 |
| `fallbackIdentityProfile` | function | 8842 |
| `fetchJson` | function | 6070 |
| `fetchJsonLegacy` | function | 6002 |
| `fetchJsonWithDiagnostics` | function | 6061 |
| `fetchSeasonGameRaw` | function | 6096 |
| `fetchTextWithDiagnostics` | function | 6031 |
| `fileNameForLineupSeasonKey` | function | 6723 |
| `filterComparisonDuoSuggestions` | window | 13477 |
| `filterComparisonPlayers` | window | 13388 |
| `filterLineupBuilderAvailable` | window | 2386 |
| `filterLineupPlayers` | window | 2293 |
| `filterPlayerSuggestions` | function | 13452 |
| `filterPureSGPlayers` | function | 9508 |
| `finalizeDuoTeamImpactStats` | function | 11360 |
| `finalizeGoalieSeasonStats` | function | 4579 |
| `finalizeMomentumStats` | function | 11148 |
| `finalizePlayerRegistrySeason` | function | 3925 |
| `finalizeResponseStats` | function | 11079 |
| `finalizeRosterImpactStats` | function | 11871 |
| `finalizeSeasonAppearanceTotals` | function | 3914 |
| `finalizeSpecialTeamsStats` | function | 4160 |
| `findDuplicateGameIds` | function | 6295 |
| `findLineupGameContext` | function | 6800 |
| `findLoadedSeasonPlayer` | function | 9471 |
| `finishHallOfFameIntro` | function | 8647 |
| `finiteNumbers` | function | 4055 |
| `fitMatchcenterStoryLayout` | function | 21275 |
| `fixMojibakeText` | function | 2463 |
| `formatDiagnosticAttempt` | function | 6077 |
| `formatGameLoadError` | function | 6090 |
| `formatStatus` | function | 6074 |
| `gameClassificationStatusLabel` | function | 2553 |
| `gameDaySortValue` | function | 4244 |
| `gameResult` | function | 3609 |
| `generatePlayerInsights` | function | 9330 |
| `generateSocialVideoContactSheets` | window | 20115 |
| `generateSocialVideoStandbilder` | window | 20091 |
| `generateSocialVideoVideos` | window | 20046 |
| `getActiveAlltimeSeasonKeys` | function | 10538 |
| `getActiveSeasonKey` | function | 2414 |
| `getAllLoadedSeasonGames` | function | 10731 |
| `getAlltimeAggregatedStyleProfile` | function | 14422 |
| `getAllTimeCoverStats` | function | 8413 |
| `getAllTimeDuoRows` | function | 10686 |
| `getAllTimeDuoRowsForPlayer` | function | 10424 |
| `getAllTimeGamesPlayedRows` | function | 10464 |
| `getAllTimeIdentityStandings` | function | 12649 |
| `getAllTimeMainPlayerRows` | function | 9512 |
| `getAllTimeOpponentIntelligence` | function | 12570 |
| `getAllTimeOpponentNames` | function | 2492 |
| `getAllTimeOpponentTopScorers` | function | 12578 |
| `getAllTimePenaltyRows` | function | 10489 |
| `getAllTimePlayerRows` | function | 9480 |
| `getAlltimeRank` | function | 13147 |
| `getAlltimeRecencyWeight` | function | 10549 |
| `getAllTimeSgOnlyRows` | function | 9515 |
| `getAssistDiagnostics` | function | 4845 |
| `getAssistPlayersFromEvent` | function | 2924 |
| `getCarryPerformanceRows` | function | 10435 |
| `getComparisonAlltimeTeamGoals` | function | 13238 |
| `getComparisonAlltimeTrend` | function | 13312 |
| `getComparisonChemistryFromEvents` | function | 13246 |
| `getComparisonClutchFromEvents` | function | 13251 |
| `getComparisonCurrentSelection` | function | 13377 |
| `getComparisonEventsForItem` | function | 13695 |
| `getComparisonPlayerOptions` | function | 13319 |
| `getComparisonPlayerRow` | function | 13220 |
| `getComparisonProfile` | function | 13281 |
| `getComparisonRosterGames` | function | 13715 |
| `getComparisonRosterGamesForSeason` | function | 13698 |
| `getComparisonSeasonEvents` | function | 13241 |
| `getComparisonSeasonLabel` | function | 13223 |
| `getComparisonSeasonTrend` | function | 13286 |
| `getComparisonStyleProfile` | function | 13256 |
| `getComparisonTeamGoalsForSeason` | function | 13226 |
| `getComparisonVariantsForPlayer` | function | 13337 |
| `getDifficultConnectionRowsForPlayer` | function | 11823 |
| `getDuoDirectScorerGameCounts` | function | 10856 |
| `getDuoFieldPlayerRows` | function | 11298 |
| `getDuoRowsForPlayerScope` | function | 10761 |
| `getDuoScorerCountsWithCandidate` | function | 10802 |
| `getDuoSharedFieldRows` | function | 11314 |
| `getEffectiveLineupData` | function | 7008 |
| `getEinsatzCenterGameDraft` | function | 7080 |
| `getEmptyState` | function | 15891 |
| `getFieldGameIdsForPlayer` | function | 2725 |
| `getFurtherSameDayUlmGames` | function | 4260 |
| `getGameDurationMinutes` | function | 4239 |
| `getGameId` | function | 6289 |
| `getGlobalAllTimeSnapshot` | function | 2418 |
| `getGlobalIdentityProfile` | function | 12734 |
| `getGlobalLoadableSeasonKeys` | function | 8406 |
| `getGlobalOpponentSpecialistProfile` | function | 14878 |
| `getGlobalPlayerBestSeason` | function | 10417 |
| `getGlobalPlayerMilestones` | function | 10600 |
| `getGlobalPlayerOpponentGameRows` | function | 14849 |
| `getGlobalPlayerPeakGame` | function | 10406 |
| `getGlobalPlayerTeamRecord` | function | 10380 |
| `getGlobalProfileEvents` | function | 10353 |
| `getGlobalRookieMilestone` | function | 10589 |
| `getGlobalRookieSeasonKey` | function | 10575 |
| `getGlobalSeasonStatRows` | function | 13131 |
| `getGlobalTopScorerMilestones` | function | 10562 |
| `getGoalieComparisonAlltimeTrend` | function | 13794 |
| `getGoalieComparisonSeasonTrend` | function | 13811 |
| `getGoalieDiagnostics` | function | 4831 |
| `getGoalieDnaRows` | function | 10020 |
| `getGoalieGameIdsForPlayer` | function | 2732 |
| `getGoalieOpponentName` | function | 4097 |
| `getGoalieOpponentTier` | function | 4101 |
| `getGoalScorerFromEvent` | function | 2890 |
| `getHallGoalieData` | function | 12944 |
| `getHallOfFamePlayerIdSet` | function | 10349 |
| `getHallOfFamePlayerRows` | function | 10346 |
| `getHallOfFameStats` | function | 12604 |
| `getJerseyNumber` | function | 2829 |
| `getLineupAllRows` | function | 18628 |
| `getLineupPlayerPool` | function | 18639 |
| `getLoadedSeasonPlayerUi` | function | 10375 |
| `getLoadedSeasonPointsByName` | function | 10319 |
| `getMatchcenterDirectOpponents` | function | 16032 |
| `getMatchcenterOpponents` | function | 15999 |
| `getOppStrength` | function | 3622 |
| `getOrCreatePlayerProfile` | function | 3769 |
| `getPenaltyBasePersonalMinutes` | function | 4275 |
| `getPenaltyDisciplineMinutes` | function | 4293 |
| `getPenaltyDisciplineType` | function | 4235 |
| `getPenaltyPersonalMinutes` | function | 4283 |
| `getPenaltySpecialTeamsMinutes` | function | 4272 |
| `getPhaseIndex` | function | 5128 |
| `getPlayedUlmGames` | function | 2807 |
| `getPlayerAlltimeFieldGames` | function | 2769 |
| `getPlayerAlltimeGoalieGames` | function | 2772 |
| `getPlayerAlltimeRoleGames` | function | 2750 |
| `getPlayerAlltimeStats` | function | 9523 |
| `getPlayerAlltimeTotalGames` | function | 2775 |
| `getPlayerFieldGames` | function | 2739 |
| `getPlayerGameRole` | function | 2710 |
| `getPlayerGoalieAlltimeStats` | function | 9544 |
| `getPlayerGoalieGames` | function | 2743 |
| `getPlayerGoalieSeasonStats` | function | 9539 |
| `getPlayerRegistryProfile` | function | 9531 |
| `getPlayerRoleAvailability` | function | 9574 |
| `getPlayerSeasonRoleGameSummary` | function | 2784 |
| `getPlayerSeasonStats` | function | 9518 |
| `getPlayerSourceId` | function | 2826 |
| `getPreClubHistoryPlayerNames` | function | 2530 |
| `getPreviousSeasonKey` | function | 10274 |
| `getRosterEntryRegistryProfile` | function | 10752 |
| `getRosterGameIdsForPlayer` | function | 2651 |
| `getRosterImpactPlayerEventLookup` | function | 11889 |
| `getRosterImpactPlayerGames` | function | 11960 |
| `getRosterStatus` | function | 10555 |
| `getScoreLabel` | function | 15781 |
| `getSeasonApiBaseUrl` | function | 1838 |
| `getSeasonDataPreview` | function | 6639 |
| `getSeasonDataState` | function | 22926 |
| `getSeasonIdentityProfile` | function | 10509 |
| `getSeasonmanagerRosterSuggestion` | function | 7422 |
| `getSeasonOriginBaseUrl` | function | 1858 |
| `getSeasonPlayerFieldBasis` | function | 8911 |
| `getSeasonScopedIdentityProfile` | function | 8942 |
| `getSeasonTeamGameIds` | function | 2823 |
| `getSeasonTeamGames` | function | 2819 |
| `getSeasonUiPlayerForProfile` | function | 10505 |
| `getSpecialTeamsDiagnostics` | function | 4838 |
| `getSpecialTeamsPenaltyChunks` | function | 4301 |
| `getStaticSeasonGames` | function | 6139 |
| `getStoredLastView` | function | 3457 |
| `getSyntheticLineupPlayers` | function | 18605 |
| `getSyntheticLineupRow` | function | 18608 |
| `getSyntheticLineupRows` | function | 18625 |
| `getTeamAllTimeRecords` | function | 12528 |
| `getTeamLogoUrlForStory` | function | 20609 |
| `getUlmTeamStatus` | function | 2505 |
| `getUniqueAllTimeOpponentNames` | function | 2500 |
| `globalSearchEntries` | function | 23348 |
| `globalSearchIsEditableTarget` | function | 23397 |
| `globalSearchKeyAction` | function | 23403 |
| `globalSearchMatch` | function | 23385 |
| `globalSearchMatchdayScore` | function | 23371 |
| `globalSearchOnKeydown` | function | 23498 |
| `globalSearchPlayerScore` | function | 23362 |
| `globalSearchTokens` | function | 23343 |
| `goalieApplySampleConfidence` | function | 9701 |
| `goalieBucketLooseSum` | function | 9709 |
| `goalieBucketRows` | function | 9621 |
| `goalieClampScore` | function | 9666 |
| `goalieDetailFirstTime` | function | 9645 |
| `goalieDnaKey` | function | 9929 |
| `goalieDnaValue` | function | 9934 |
| `goalieEntryRecognitionReason` | function | 2674 |
| `goalieEventAbsSeconds` | function | 4077 |
| `goalieEventSecondInPeriod` | function | 9652 |
| `goalieGameDurationSeconds` | function | 4080 |
| `goalieGameStateBeforeGoal` | function | 4085 |
| `goalieInverseScore` | function | 9670 |
| `goalieNum` | function | 9607 |
| `goaliePctText` | function | 9658 |
| `goaliePositiveCurveScore` | function | 9686 |
| `goaliePositiveScore` | function | 9678 |
| `goalieSafeNum` | function | 9662 |
| `goalieStateGoals` | function | 9941 |
| `goalieStdDev` | function | 9639 |
| `goalieTierMeta` | function | 9630 |
| `goalieTime` | function | 9613 |
| `goalieTopRow` | function | 9627 |
| `goalieWeightedScore` | function | 9695 |
| `goToMainNavPoint` | window | 22612 |
| `hallGoalieExplainForLabel` | function | 12981 |
| `hallGoalieNameHtml` | function | 12960 |
| `hallGoalieNum` | function | 12846 |
| `hallGoaliePkStats` | function | 12872 |
| `hallGoalieRowFromStats` | function | 12911 |
| `hallGoalieSeasonLabel` | function | 12860 |
| `hallGoalieSeasonScore` | function | 12891 |
| `hallGoalieTime` | function | 12852 |
| `hallGoalieTooltip` | function | 12977 |
| `hallGoalieTopteamStats` | function | 12884 |
| `handleComparisonDuoSearchKey` | window | 13485 |
| `hasEmbeddedSeasonData` | function | 8403 |
| `hashSegmentToSeasonKey` | function | 3164 |
| `hasSeasonRole` | function | 5517 |
| `hasSeasonSource` | function | 8399 |
| `hofIntroDelay` | function | 8555 |
| `identityClutchGoalsVsTeams` | function | 5400 |
| `identityDecisiveGoalsVsTeams` | function | 5403 |
| `identityGoalsVsTeams` | function | 5397 |
| `identityInputs` | function | 5432 |
| `identityLateGoalsVsTeams` | function | 5406 |
| `identityOpponentGroups` | function | 5356 |
| `identityPartnerStats` | function | 5342 |
| `identityPointsVsTeams` | function | 5394 |
| `incGoalieBucket` | function | 4068 |
| `incrementUniqueCounter` | function | 3724 |
| `initGlobalSearch` | function | 23520 |
| `initHashRouting` | function | 3588 |
| `initToolMenu` | function | 23618 |
| `invalidateGlobalIdentityCache` | function | 2243 |
| `isActiveAlltimeSeasonStats` | function | 10524 |
| `isComebackRelevantGoal` | function | 5390 |
| `isDecisiveGoal` | function | 5376 |
| `isEinsatzCenterGameFromDraft` | function | 7017 |
| `isExcludedGoalieAppearance` | function | 2684 |
| `isFieldAppearance` | function | 2721 |
| `isGamePlayed` | function | 3023 |
| `isGoalieAppearance` | function | 2717 |
| `isGoalieRosterEntry` | function | 2660 |
| `isHallOfFameEligiblePlayer` | function | 10340 |
| `isHallRowPureSG` | function | 12861 |
| `isImportantClutchGoal` | function | 5371 |
| `isLateGoal` | function | 5384 |
| `isMatchPenaltyEvent` | function | 4229 |
| `isNewSeasonDataState` | function | 22947 |
| `isOwnGoalEvent` | function | 4312 |
| `isPenaltyGoalEvent` | function | 4305 |
| `isPreClubHistoryPlayerName` | function | 2533 |
| `isPureSGPlayer` | function | 9504 |
| `isRookieCandidateForSeason` | function | 10309 |
| `isSameUlmTeamContext` | function | 4252 |
| `isSeasonDataPreviewStale` | function | 6647 |
| `isSgOnlyAlltimePlayer` | function | 9496 |
| `isSgOnlyHallOfFameExcluded` | function | 10331 |
| `isSyntheticLineupPlayerId` | function | 18602 |
| `isToolMenuOpen` | function | 23556 |
| `isTwoPlusTwoPenaltyEvent` | function | 4232 |
| `isUsableExternalSeasonData` | function | 6222 |
| `isValidAsOfDate` | function | 3168 |
| `isValidAsOfStartTime` | function | 3171 |
| `isVisibleSecondaryTrait` | function | 8813 |
| `kpiBadge` | function | 14203 |
| `kpiDelta` | function | 13922 |
| `kpiItemColor` | function | 13928 |
| `kpiNiceMax` | function | 14093 |
| `kpiRadarValue` | function | 14016 |
| `kpiTrendRows` | function | 14099 |
| `kpiValueText` | function | 13918 |
| `lexiconEntry` | function | 15587 |
| `lexiconUniqueKeys` | function | 15579 |
| `lineupAverage` | function | 18654 |
| `lineupBuilderPoolIds` | function | 2300 |
| `lineupCombinationIds` | function | 19131 |
| `lineupDirectChemistryScore` | function | 19175 |
| `lineupEvaluateComplementCandidate` | function | 19182 |
| `lineupGroupDisplayName` | function | 6926 |
| `lineupLevelLabel` | function | 18658 |
| `lineupOpponentDNAForContext` | function | 18755 |
| `lineupPlayerAnchorConfidence` | function | 19281 |
| `lineupPlayerAnchorScore` | function | 19261 |
| `lineupPlayerProfile` | function | 18859 |
| `lineupRankCandidateIds` | function | 19116 |
| `lineupRecommendationReason` | function | 19357 |
| `lineupRoleDnaComplementScore` | function | 19151 |
| `lineupRosterGamesForPlayer` | function | 18664 |
| `lineupRowMap` | function | 19113 |
| `lineupRowMeta` | function | 18631 |
| `lineupScore` | function | 18648 |
| `lineupStdDev` | function | 19145 |
| `linkUiPlayersToRegistry` | function | 3856 |
| `loadEinsatzCenterMismatchedAutosave` | function | 7337 |
| `loadSeason` | function | 8479 |
| `loadSeasonData` | function | 7922 |
| `loadSeasonForGlobal` | function | 8431 |
| `loadSeasonManifest` | function | 6154 |
| `mainNavActiveKeyForPage` | function | 22606 |
| `markFieldRoleAppearance` | function | 3831 |
| `matchcenterAddDuoConnection` | function | 16434 |
| `matchcenterAddPlanItem` | function | 17651 |
| `matchcenterAddPlanWatch` | function | 17657 |
| `matchcenterAddUlmDuoConnection` | function | 16585 |
| `matchcenterAddUlmScoring` | function | 16212 |
| `matchcenterAnalyzeDirect` | function | 16065 |
| `matchcenterAnalyzeForm` | function | 16102 |
| `matchcenterBuildCoachActivationHints` | function | 18399 |
| `matchcenterBuildCoachAvoidList` | function | 18389 |
| `matchcenterBuildCoachDangerPatterns` | function | 18371 |
| `matchcenterBuildCoachHints` | function | 18127 |
| `matchcenterBuildCoachIfThen` | function | 18379 |
| `matchcenterBuildCoachKeyActors` | function | 18406 |
| `matchcenterBuildCoachLevers` | function | 18361 |
| `matchcenterBuildCoachPriorities` | function | 18354 |
| `matchcenterBuildGoalieMatchup` | function | 16786 |
| `matchcenterBuildInsights` | function | 17073 |
| `matchcenterBuildIntelHeadline` | function | 18143 |
| `matchcenterBuildIntelligenceDataQuality` | function | 17759 |
| `matchcenterBuildIntelligenceSignals` | function | 18164 |
| `matchcenterBuildIntelListFromPlan` | function | 18118 |
| `matchcenterBuildMatchPlan` | function | 19476 |
| `matchcenterBuildOneThingToWatch` | function | 18151 |
| `matchcenterBuildOpponentAlarm` | function | 18008 |
| `matchcenterBuildOpponentDNA` | function | 17829 |
| `matchcenterBuildOpponentDuoInsights` | function | 16533 |
| `matchcenterBuildOpponentDuos` | function | 16488 |
| `matchcenterBuildPlanConfidence` | function | 17663 |
| `matchcenterBuildSpecialTeamsMatchup` | function | 16716 |
| `matchcenterBuildTimingAnalysis` | function | 16912 |
| `matchcenterBuildTimingInsights` | function | 16901 |
| `matchcenterBuildUlmDuoInsights` | function | 16683 |
| `matchcenterBuildUlmDuos` | function | 16640 |
| `matchcenterBuildUlmPlayerInsights` | function | 16377 |
| `matchcenterBuildUlmPlayerScouting` | function | 16322 |
| `matchcenterClassifyUlmGoalEvent` | function | 16201 |
| `matchcenterCoachAdd` | function | 18291 |
| `matchcenterCoachCautious` | function | 18288 |
| `matchcenterCoachGameModel` | function | 18300 |
| `matchcenterCoachPriorityFromAlarm` | function | 18344 |
| `matchcenterConfidenceClass` | function | 17638 |
| `matchcenterDateLabel` | function | 15941 |
| `matchcenterDefaultSeasonKey` | function | 15979 |
| `matchcenterDeriveOpponentType` | function | 17942 |
| `matchcenterDirectContextGames` | function | 16696 |
| `matchcenterDuoDirectionLabel` | function | 16427 |
| `matchcenterDuoPairKey` | function | 16390 |
| `matchcenterEmptyBuckets` | function | 16142 |
| `matchcenterEmptyTimingStats` | function | 16847 |
| `matchcenterEnsureOpponentDuo` | function | 16394 |
| `matchcenterEnsureUlmDuo` | function | 16547 |
| `matchcenterEnsureUlmPlayer` | function | 16150 |
| `matchcenterFinalizeOpponentDuos` | function | 16453 |
| `matchcenterFinalizeUlmDuos` | function | 16604 |
| `matchcenterFinalizeUlmPlayers` | function | 16253 |
| `matchcenterFormLine` | function | 17068 |
| `matchcenterGameLine` | function | 17062 |
| `matchcenterGoalAbsSeconds` | function | 16834 |
| `matchcenterGoalieFitScore` | function | 16769 |
| `matchcenterGoalieKey` | function | 16764 |
| `matchcenterInferPriority` | function | 17644 |
| `matchcenterIntelAddAlarm` | function | 17987 |
| `matchcenterIntelCurve` | function | 17711 |
| `matchcenterIntelDataLabel` | function | 17756 |
| `matchcenterIntelDuoRef` | function | 17973 |
| `matchcenterIntelInverseCurve` | function | 17717 |
| `matchcenterIntelPct` | function | 17736 |
| `matchcenterIntelPlayerRef` | function | 17960 |
| `matchcenterIntelPriorityClass` | function | 17746 |
| `matchcenterIntelPriorityFromScore` | function | 17740 |
| `matchcenterIntelPriorityLabel` | function | 17752 |
| `matchcenterIntelRate` | function | 17732 |
| `matchcenterIntelWeighted` | function | 17721 |
| `matchcenterIsFreiburgTuebingenTeamName` | function | 15966 |
| `matchcenterOpponentMode` | function | 15996 |
| `matchcenterPct` | function | 16712 |
| `matchcenterPersonalPenaltyMinutesForSide` | function | 16703 |
| `matchcenterPlanRateText` | function | 17630 |
| `matchcenterPlanScoreText` | function | 17626 |
| `matchcenterPriorityLabel` | function | 17635 |
| `matchcenterRegisterUlmProfileGame` | function | 16188 |
| `matchcenterResultClass` | function | 17053 |
| `matchcenterSeasonHasGames` | function | 15976 |
| `matchcenterSigned` | function | 15935 |
| `matchcenterSocialAdd` | function | 18468 |
| `matchcenterSocialCaption` | function | 18475 |
| `matchcenterSpecialTeamsForGame` | function | 16699 |
| `matchcenterStoryAddCandidate` | function | 20713 |
| `matchcenterStoryAddFact` | function | 20694 |
| `matchcenterStoryBestClutchDuo` | function | 20938 |
| `matchcenterStoryBestClutchPlayer` | function | 20894 |
| `matchcenterStoryCandidateForBudget` | function | 20751 |
| `matchcenterStoryCategoryForPlanFact` | function | 21023 |
| `matchcenterStoryCategoryLimit` | function | 20736 |
| `matchcenterStoryClutchFact` | function | 20871 |
| `matchcenterStoryClutchPriority` | function | 20972 |
| `matchcenterStoryCompetitionLabel` | function | 20975 |
| `matchcenterStoryCurrentStreak` | function | 20818 |
| `matchcenterStoryDirectFactCandidates` | function | 20988 |
| `matchcenterStoryDownloadFileName` | function | 19944 |
| `matchcenterStoryDuoClutchFact` | function | 20948 |
| `matchcenterStoryDuoClutchTotal` | function | 20930 |
| `matchcenterStoryDuoFact` | function | 20951 |
| `matchcenterStoryEstimateFactWeight` | function | 20707 |
| `matchcenterStoryFactKey` | function | 20701 |
| `matchcenterStoryFormFact` | function | 20836 |
| `matchcenterStoryFormFactCandidates` | function | 20847 |
| `matchcenterStoryInlineStat` | function | 20676 |
| `matchcenterStoryLastDuelLabel` | function | 20984 |
| `matchcenterStoryLateGoalsForOutcome` | function | 20867 |
| `matchcenterStoryLogoBase` | function | 20588 |
| `matchcenterStoryLogoForOpponent` | function | 20639 |
| `matchcenterStoryLooksArtificial` | function | 20704 |
| `matchcenterStoryNameClass` | function | 21144 |
| `matchcenterStoryNormalizePickOptions` | function | 20740 |
| `matchcenterStoryPickFactItems` | function | 20761 |
| `matchcenterStoryPickFacts` | function | 20814 |
| `matchcenterStoryPlanFactCandidates` | function | 21010 |
| `matchcenterStoryPlayerClutchFact` | function | 20904 |
| `matchcenterStoryPlayerClutchTotal` | function | 20886 |
| `matchcenterStoryRankRows` | function | 20680 |
| `matchcenterStoryRankText` | function | 20672 |
| `matchcenterStorySafeLogoUrl` | function | 20594 |
| `matchcenterStoryShortDuel` | function | 20979 |
| `matchcenterStoryTableRank` | function | 20654 |
| `matchcenterStoryUlmTableRank` | function | 20665 |
| `matchcenterStoryVisibleFacts` | function | 21150 |
| `matchcenterStoryWinlessStreak` | function | 20827 |
| `matchcenterTimeValue` | function | 16839 |
| `matchcenterTimingStatsForGames` | function | 16863 |
| `matchcenterUlmScoutingConfidence` | function | 16145 |
| `matchcenterUlmTeamLabelForGame` | function | 17057 |
| `matchcenterUpdateUlmSeasonRow` | function | 16194 |
| `matchcenterWindowForSecond` | function | 16856 |
| `matchdayFixtureCardHtml` | function | 22788 |
| `matchdayGameCardHtml` | function | 22763 |
| `matchdayLineupCardHtml` | function | 22756 |
| `matchdayLineupInfo` | function | 22744 |
| `matchdayUlmGames` | function | 22735 |
| `medianOrNull` | function | 4062 |
| `mergeDuoSet` | function | 4927 |
| `mergeGoalieSpecialTeamsStats` | function | 4552 |
| `mergeSpecialTeamsStats` | function | 4170 |
| `moveGlobalSearch` | function | 23482 |
| `noGoalStreakGoaliesForGame` | function | 13043 |
| `normalizeAssistPlayerName` | function | 2893 |
| `normalizeComparisonItem` | function | 13197 |
| `normalizeDuoComparisonItem` | function | 13441 |
| `normalizeEventPlayerRef` | function | 2832 |
| `normalizeLineupLines` | function | 2303 |
| `normalizePlayerName` | function | 2520 |
| `normalizeSecondaryTraits` | function | 5491 |
| `onGlobalSearchInput` | window | 23476 |
| `openAllTimePlayers` | window | 8547 |
| `openComparisonCenter` | window | 8717 |
| `openDuoProPicker` | window | 11728 |
| `openEinsatzCenter` | window | 6877 |
| `openGlobalSearch` | window | 23443 |
| `openHallOfFame` | window | 8693 |
| `openLexicon` | window | 8790 |
| `openLigaGegner` | window | 23200 |
| `openLineupBuilder` | window | 8768 |
| `openMatchcenter` | window | 8746 |
| `openMatchcenterStoryPreview` | window | 2256 |
| `openMatchday` | window | 22717 |
| `openMatchdayTimeline` | window | 22709 |
| `openOverview` | window | 22658 |
| `openSeason` | window | 8544 |
| `openToolMenu` | window | 23560 |
| `overviewCompactTableHtml` | function | 23017 |
| `overviewCrossSeasonTrendHtml` | function | 23076 |
| `overviewFormHtml` | function | 23035 |
| `overviewLastMatchdayText` | function | 22983 |
| `overviewLineupLinkHtml` | function | 23093 |
| `overviewMatchcenterLinkHtml` | function | 23090 |
| `overviewMatchdayEndMs` | function | 22888 |
| `overviewMatchdayStartMs` | function | 22882 |
| `overviewNextMatchdayHtml` | function | 22993 |
| `overviewOpponentLabel` | function | 22971 |
| `overviewOpponentPreviewHtml` | function | 23085 |
| `overviewRankChangeTile` | function | 23112 |
| `overviewRecordHtml` | function | 23069 |
| `overviewSeasonAwardHtml` | function | 23058 |
| `overviewSeasonBilanzHtml` | function | 23050 |
| `p1NarrativeKey` | function | 15855 |
| `paintGlobalSearchResults` | function | 23435 |
| `parseAppHash` | function | 3271 |
| `parseAsOfQueryValue` | function | 3310 |
| `parseComparisonVariant` | function | 13362 |
| `parseLastViewState` | function | 3445 |
| `parseSeasonDataState` | function | 22937 |
| `pct` | function | 5295 |
| `pctValue` | function | 12784 |
| `pdashBestPhase` | function | 14489 |
| `pdashInsight` | function | 14527 |
| `pdashInsights` | function | 14530 |
| `pdashNum` | function | 14473 |
| `pdashOpponentStrength` | function | 14507 |
| `pdashOpponentTier` | function | 14501 |
| `pdashPct` | function | 14477 |
| `pdashPhaseLabel` | function | 14481 |
| `pdashTopCount` | function | 14485 |
| `pdashTopOpponent` | function | 14497 |
| `pdashTopPartner` | function | 14493 |
| `penaltyRawText` | function | 4202 |
| `playerAppearedForUlmStatusInSeasonByName` | function | 10290 |
| `playerAppearedInSeasonByName` | function | 10279 |
| `playerExplainAdd` | function | 15163 |
| `playerExplainConfidence` | function | 15154 |
| `playerExplainConfidenceLabel` | function | 15160 |
| `playerExplainContextSentence` | function | 15199 |
| `playerExplainHeadline` | function | 15189 |
| `playerExplainRolePhrase` | function | 15180 |
| `playerExplainStyleSignature` | function | 15168 |
| `playerRoleInGame` | function | 2705 |
| `processGame` | function | 2957 |
| `rAlltimeKpis` | function | 13153 |
| `rAlltimePlayerDashboard` | function | 14682 |
| `rAllTimePlayersPage` | function | 15444 |
| `rankNarratives` | function | 15877 |
| `rAntiSynergyCompareChip` | function | 12123 |
| `rAntiSynergyDelta` | function | 12107 |
| `rAntiSynergyMainDelta` | function | 12170 |
| `rAntiSynergyMetricRow` | function | 12131 |
| `rAntiSynergyWinrateRow` | function | 12153 |
| `rAntiSynergyWinrateText` | function | 12147 |
| `rAsOfSelector` | function | 23221 |
| `ratio01` | function | 5296 |
| `rAvgResponseTimeNote` | function | 12404 |
| `rCarryPerformanceRows` | function | 10451 |
| `rClassicRoleTags` | function | 8899 |
| `rClassicTagTip` | function | 8837 |
| `rClutch` | function | 9130 |
| `rClutchBadge` | function | 8799 |
| `rComparisonCenterPage` | function | 14352 |
| `rComparisonDashboard` | function | 14303 |
| `rComparisonDuoSearchBox` | function | 13671 |
| `rComparisonDuoSuggestionButtons` | function | 13464 |
| `rComparisonMiniOverview` | function | 14291 |
| `rComparisonModeSelect` | function | 13692 |
| `rComparisonRoles` | function | 14295 |
| `rComparisonStyles` | function | 14314 |
| `rContextBar` | function | 23304 |
| `rDifficultConnectionList` | function | 12180 |
| `rDifficultConnectionListCompact` | function | 12247 |
| `rDifficultConnectionListCompactLegacy` | function | 12205 |
| `rDifficultConnectionsCard` | function | 12286 |
| `rDuoCenterPro` | function | 11570 |
| `rDuoCompareSummaryCards` | function | 13550 |
| `rDuoComparisonBars` | function | 13545 |
| `rDuoComparisonChemistry` | function | 13603 |
| `rDuoComparisonContext` | function | 13635 |
| `rDuoComparisonDashboard` | function | 13657 |
| `rDuoComparisonDetails` | function | 13653 |
| `rDuoComparisonImpact` | function | 13619 |
| `rDuoComparisonPage` | function | 13681 |
| `rDuoComparisonProfile` | function | 13581 |
| `rDuoProPlayerSelect` | function | 11757 |
| `rDuoResponseMomentumCard` | function | 12462 |
| `rDuoRows` | function | 10710 |
| `recommendLineComplements` | function | 19448 |
| `recordOverviewVisit` | function | 22956 |
| `registerPlayerIdentity` | function | 3803 |
| `registerSeasonRosters` | function | 3836 |
| `rEinsatzCenterAutosaveBanner` | function | 7299 |
| `rEinsatzCenterCombo` | function | 6822 |
| `rEinsatzCenterComboEditor` | function | 7527 |
| `rEinsatzCenterDraftBanner` | function | 7040 |
| `rEinsatzCenterDraftMark` | function | 7026 |
| `rEinsatzCenterDraftStatsHint` | function | 7030 |
| `rEinsatzCenterEditPage` | function | 7627 |
| `rEinsatzCenterGameCard` | function | 6831 |
| `rEinsatzCenterGameEditor` | function | 7574 |
| `rEinsatzCenterGroup` | function | 6809 |
| `rEinsatzCenterGroupEditor` | function | 7496 |
| `rEinsatzCenterPage` | function | 6850 |
| `rEinsatzCenterRosterSuggestionCard` | function | 7543 |
| `rEinsatzCenterStats` | function | 6932 |
| `relative01` | function | 5297 |
| `removeComparisonDuo` | window | 13515 |
| `removeComparisonItem` | window | 13427 |
| `removeEinsatzCenterCombo` | window | 7864 |
| `removeEinsatzCenterGroup` | window | 7778 |
| `removeEinsatzCenterGroupPlayer` | window | 7828 |
| `removeEinsatzCenterRosterPlayer` | window | 7709 |
| `removeLineupBuilderPlayerFromLine` | window | 2350 |
| `removeLineupPlayer` | window | 2291 |
| `rEmptyState` | function | 15903 |
| `renameEinsatzCenterGroup` | window | 7800 |
| `render` | function | 21943 |
| `renderComparisonDuoSuggestions` | function | 13468 |
| `renderTags` | function | 8907 |
| `repairRenderedMojibake` | function | 2466 |
| `resetPlayerRegistrySeason` | function | 3748 |
| `resolveAssistPlayer` | function | 2938 |
| `resolveCurrentSeasonKey` | function | 6185 |
| `resolveGoalScorerPlayer` | function | 2875 |
| `resolveLineupPlayerName` | function | 6794 |
| `resolvePlayerRoleView` | function | 9592 |
| `resolveRosterPlayerByRef` | function | 2844 |
| `responseExcerpt` | function | 6023 |
| `responseMomentumAbsSeconds` | function | 10892 |
| `responseMomentumActor` | function | 10918 |
| `responseMomentumConfidence` | function | 11051 |
| `responseMomentumEmptyState` | function | 11056 |
| `responseMomentumGameRows` | function | 10902 |
| `responseMomentumGoalActors` | function | 10929 |
| `responseMomentumPairKey` | function | 11064 |
| `responseMomentumSide` | function | 10909 |
| `responseMomentumTime` | function | 10895 |
| `responseMomentumTooltipFor` | function | 12367 |
| `restoreEinsatzCenterAutosave` | function | 7273 |
| `restoreHallOfFameIntroPrevious` | function | 8635 |
| `resultGoalsAgainstForSide` | function | 4106 |
| `returnToEinsatzCenterEdit` | window | 7695 |
| `rGlobalAllTimeStats` | function | 14790 |
| `rGlobalCareerHeader` | function | 14699 |
| `rGlobalDevelopment` | function | 14808 |
| `rGlobalDnaBars` | function | 14443 |
| `rGlobalDuoNetwork` | function | 14908 |
| `rGlobalOpponentSpecialist` | function | 15107 |
| `rGlobalOverview` | function | 14737 |
| `rGlobalPartnerOpponentPanel` | function | 14685 |
| `rGlobalProfileTags` | function | 12775 |
| `rGlobalSearchPanelHtml` | function | 23432 |
| `rGlobalSearchResultsHtml` | function | 23421 |
| `rGlobalSearchToggle` | function | 23418 |
| `rGoalieAnalysis` | function | 10247 |
| `rGoalieBars` | function | 9875 |
| `rGoalieDnaBars` | function | 10024 |
| `rGoalieFirstGoalResistance` | function | 10082 |
| `rGoalieInsights` | function | 10155 |
| `rGoalieKpis` | function | 10059 |
| `rGoalieMiniMetrics` | function | 10076 |
| `rGoalieMomentum` | function | 10096 |
| `rGoalieOpponents` | function | 10198 |
| `rGoalieOverview` | function | 10177 |
| `rGoaliePhaseProfile` | function | 10138 |
| `rGoaliePhases` | function | 10195 |
| `rGoalieRoleTraits` | function | 10016 |
| `rGoalieScoringRow` | function | 10038 |
| `rGoalieStability` | function | 10210 |
| `rGoalieTable` | function | 10239 |
| `rGoalieTierCards` | function | 10110 |
| `rHallDuoTemple` | function | 12837 |
| `rHallGoalieAwardCards` | function | 13077 |
| `rHallGoalieLegends` | function | 13098 |
| `rHallGoalieRankCard` | function | 12996 |
| `rHallOfFameHero` | function | 12788 |
| `rHallOfFamePage` | function | 15486 |
| `rHallPodiumList` | function | 12814 |
| `rHallSGBadge` | function | 12869 |
| `rIaShell` | function | 23324 |
| `rIdentityCards` | function | 8873 |
| `rIdentityTags` | function | 8853 |
| `rInsights` | function | 9391 |
| `rInteractiveDuoCenterPro` | function | 11764 |
| `rKpiCards` | function | 13931 |
| `rKpiExtendedMetrics` | function | 14078 |
| `rKpiInfoCards` | function | 14213 |
| `rKpiMetricCard` | function | 14070 |
| `rKpiMirrorRows` | function | 13956 |
| `rKpiObjectMini` | function | 14206 |
| `rKpiOpponentStrength` | function | 14175 |
| `rKpiRadar` | function | 14027 |
| `rKpiShareBars` | function | 14062 |
| `rKpiTextMetricCard` | function | 14075 |
| `rKpiTrendCompare` | function | 14108 |
| `rKPIVergleich` | function | 14277 |
| `rLexiconPage` | function | 15601 |
| `rLexiconRows` | function | 15597 |
| `rLigaGegnerPlaceholderPage` | function | 23204 |
| `rLineupBuilderAvailablePanel` | function | 20310 |
| `rLineupBuilderPage` | function | 20486 |
| `rLineupComplementCards` | function | 20407 |
| `rLineupMetricPills` | function | 20296 |
| `rLineupRecommendationCards` | function | 20358 |
| `rLineupRecommendationMode` | function | 20373 |
| `rLineupScoreRows` | function | 20192 |
| `rLineupSimpleCards` | function | 20214 |
| `rLineupTestLine` | function | 20420 |
| `rLineupTestMode` | function | 20469 |
| `rMainNav` | function | 22619 |
| `rMainNavBottom` | function | 22641 |
| `rMatchcenterCoachCardList` | function | 19771 |
| `rMatchcenterCoachIfThen` | function | 19785 |
| `rMatchcenterCoachSimpleList` | function | 19793 |
| `rMatchcenterCopyButton` | function | 19863 |
| `rMatchcenterDetailsSection` | function | 17045 |
| `rMatchcenterDigitalCoach` | function | 19798 |
| `rMatchcenterDuoRankCard` | function | 17364 |
| `rMatchcenterDuoRow` | function | 17340 |
| `rMatchcenterDuosTab` | function | 17511 |
| `rMatchcenterDuoWatchCard` | function | 17320 |
| `rMatchcenterFormCard` | function | 17101 |
| `rMatchcenterFormSection` | function | 17019 |
| `rMatchcenterGamesList` | function | 17122 |
| `rMatchcenterGoalieCard` | function | 17573 |
| `rMatchcenterGoalieMatchup` | function | 17597 |
| `rMatchcenterIntelCoachHints` | function | 19757 |
| `rMatchcenterIntelOverview` | function | 19711 |
| `rMatchcenterKpi` | function | 17094 |
| `rMatchcenterLineupBuilder` | function | 20223 |
| `rMatchcenterLockerList` | function | 19868 |
| `rMatchcenterLockerRoomSheet` | function | 19880 |
| `rMatchcenterMatchPlan` | function | 20565 |
| `rMatchcenterOpponentAlarm` | function | 19689 |
| `rMatchcenterOpponentDNA` | function | 19656 |
| `rMatchcenterOpponentDuos` | function | 17468 |
| `rMatchcenterOpponentScouting` | function | 17281 |
| `rMatchcenterPage` | function | 21396 |
| `rMatchcenterPlanItems` | function | 19622 |
| `rMatchcenterPlanWatch` | function | 19640 |
| `rMatchcenterPlayerRow` | function | 17155 |
| `rMatchcenterPlayersTab` | function | 17317 |
| `rMatchcenterProfileSection` | function | 16999 |
| `rMatchcenterRankCard` | function | 17179 |
| `rMatchcenterResponseMomentum` | function | 12489 |
| `rMatchcenterScoutingSummary` | function | 20521 |
| `rMatchcenterSocialBlock` | function | 19936 |
| `rMatchcenterSocialMediaCenter` | function | 20138 |
| `rMatchcenterSpecialCard` | function | 17514 |
| `rMatchcenterSpecialTeams` | function | 17523 |
| `rMatchcenterStoryForm` | function | 21186 |
| `rMatchcenterStoryFrame` | function | 21269 |
| `rMatchcenterStoryLogo` | function | 21181 |
| `rMatchcenterStoryPlayerCard` | function | 21191 |
| `rMatchcenterStoryPreview` | function | 21199 |
| `rMatchcenterTabs` | function | 16996 |
| `rMatchcenterTimeBars` | function | 16923 |
| `rMatchcenterTiming` | function | 16957 |
| `rMatchcenterTimingStatsCard` | function | 16937 |
| `rMatchcenterUlmDuoRankCard` | function | 17419 |
| `rMatchcenterUlmDuoRow` | function | 17396 |
| `rMatchcenterUlmDuos` | function | 17425 |
| `rMatchcenterUlmDuoWatchCard` | function | 17370 |
| `rMatchcenterUlmImpactCard` | function | 17185 |
| `rMatchcenterUlmPlayerRow` | function | 17214 |
| `rMatchcenterUlmRankCard` | function | 17238 |
| `rMatchcenterUlmScouting` | function | 17244 |
| `rMatchcenterWatchCard` | function | 17134 |
| `rMatchdayDetailPage` | function | 22817 |
| `rMatchdayPage` | function | 22857 |
| `rMatchdayTimelinePage` | function | 22806 |
| `rMatchdayTimelineRow` | function | 22798 |
| `rMatrix` | function | 9003 |
| `rmTerm` | function | 12374 |
| `roleGameStableKey` | function | 2747 |
| `roleTraitLabel` | function | 8810 |
| `rOppBreakdown` | function | 9295 |
| `rOpponentIntelBars` | function | 10674 |
| `rOpponentTopScorerTable` | function | 12628 |
| `rosterImpactConfidence` | function | 12002 |
| `rosterImpactConfidenceWeight` | function | 12016 |
| `rosterPlayerMatches` | function | 2636 |
| `rOverviewPage` | function | 23188 |
| `rPdashLabel` | function | 14634 |
| `rPdashStat` | function | 14637 |
| `rPenalties` | function | 9276 |
| `rPhases` | function | 9060 |
| `rPlayerDash` | function | 14640 |
| `rPlayerDashStyles` | function | 14622 |
| `rPlayerExplainItems` | function | 15386 |
| `rPlayerExplanation` | function | 15391 |
| `rPlayerResponseMomentumCard` | function | 12443 |
| `rPlayerRoleSwitch` | function | 9600 |
| `rRadar` | function | 9080 |
| `rRes` | const-arrow | 8798 |
| `rResponseMomentumOverviewCard` | function | 12419 |
| `rResponseRateDisplay` | function | 12383 |
| `rRmKpi` | function | 12390 |
| `rRmTopList` | function | 12408 |
| `rRoleTraitTip` | function | 8817 |
| `rRosterImpactStatLine` | function | 12162 |
| `rRosterStatusBadge` | function | 8826 |
| `rScoreBreakdown` | function | 15917 |
| `rSeasonDataPreviewCard` | function | 6666 |
| `rSeasonDataPreviewContextHint` | function | 23256 |
| `rSeasonDataPreviewRows` | function | 6656 |
| `rSeasonDataPreviewStatus` | function | 6653 |
| `rSeasonDataStateContextHint` | function | 23273 |
| `rSeasonDuoCenterPro` | function | 11820 |
| `rSeasonDuoSummary` | function | 9050 |
| `rSeasonInsightsTab` | function | 9376 |
| `rSeasonLandingPage` | function | 14721 |
| `rSeasonPlayerDashboard` | function | 14679 |
| `rSeasonProfileKpis` | function | 8959 |
| `rSeasonProfileTagStrip` | function | 8989 |
| `rSeasonTrendRows` | function | 14403 |
| `rSocialVideoBlock` | function | 20005 |
| `rSparkline` | function | 13167 |
| `rStyleMetricTip` | function | 8822 |
| `rStyleProfileBars` | function | 8862 |
| `rTable` | function | 9445 |
| `rTeamNoGoalStreakCard` | function | 21555 |
| `rTeamPage` | function | 21567 |
| `rTeamResponseMomentumCard` | function | 12482 |
| `rTimeline` | function | 9165 |
| `rToolMenu` | function | 23546 |
| `runComparison` | window | 13432 |
| `runDuoComparison` | window | 13520 |
| `saveLastView` | function | 3462 |
| `scoreNarrative` | function | 15858 |
| `seasonApiUrl` | function | 1855 |
| `seasonDataPreviewRerender` | function | 6512 |
| `seasonDataPreviewRow` | function | 6516 |
| `seasonGameApiUrls` | function | 1873 |
| `seasonGameHtmlUrls` | function | 1883 |
| `seasonHasPureUlmTeam` | function | 10324 |
| `seasonKeyToHashSegment` | function | 3161 |
| `seasonPathPrefix` | function | 1867 |
| `seasonRoleKeysForPlayer` | function | 5508 |
| `seasonRoleTraitsFromClassic` | function | 5503 |
| `seasonStatNumber` | function | 10514 |
| `seasonStatSetSize` | function | 10518 |
| `seedHallOfFameIntroParticles` | function | 8602 |
| `selectAllLineupAvailable` | window | 2337 |
| `selectComparisonDuoSuggestion` | window | 13478 |
| `selectComparisonMode` | window | 13439 |
| `selectComparisonPlayer` | window | 13396 |
| `selectDuoProQuick` | window | 11730 |
| `selectEinsatzCenterEditGame` | window | 7697 |
| `selectEnforcerKeys` | function | 5520 |
| `serializeFieldRoleSeasonStats` | function | 3979 |
| `serializeGoalieSeasonStats` | function | 3956 |
| `serializeSeasonStats` | function | 3941 |
| `serializeSpecialTeamsStats` | function | 4167 |
| `setAntiSynergyView` | window | 2383 |
| `setComparisonDuoMode` | window | 13449 |
| `setComparisonDuoPlayer` | window | 13498 |
| `setComparisonDuoSearch` | window | 13451 |
| `setComparisonDuoSeasonKey` | window | 13450 |
| `setComparisonRoleMode` | window | 13402 |
| `setComparisonVariant` | window | 13407 |
| `setContextAsOf` | window | 23234 |
| `setDuoProPickerState` | function | 11699 |
| `setDuoProSelection` | window | 11749 |
| `setEinsatzCenterGameNote` | window | 7871 |
| `setEinsatzCenterGroupPlayerPosition` | window | 7836 |
| `setEinsatzCenterIncludeDraft` | window | 7696 |
| `setEinsatzCenterSeason` | window | 6871 |
| `setGlobalPlayer` | window | 2409 |
| `setGlobalPlayerDuo` | window | 2410 |
| `setGlobalTab` | window | 2411 |
| `setGoalieTab` | window | 2250 |
| `setLineupActiveLine` | window | 2322 |
| `setLineupBuilderMode` | window | 2321 |
| `setLineupBuilderOpponent` | window | 2320 |
| `setLineupBuilderSeason` | window | 2308 |
| `setLineupNewPlayerProfile` | window | 2364 |
| `setMatchcenterContext` | window | 8787 |
| `setMatchcenterOpponent` | window | 8786 |
| `setMatchcenterSeason` | window | 8788 |
| `setMatchcenterTab` | window | 2255 |
| `setP` | window | 2247 |
| `setPage` | window | 2393 |
| `setPlayerRoleView` | window | 2249 |
| `setSeasonDataPreviewOpen` | window | 6702 |
| `setSeasonDataPreviewPasteText` | window | 6703 |
| `setState` | const-arrow | 2235 |
| `setTab` | window | 2248 |
| `showLineupComplements` | window | 2363 |
| `showMainShell` | function | 8394 |
| `socialDuoFocusLine` | function | 18498 |
| `socialEnsurePeriod` | function | 18484 |
| `socialFirstUseful` | function | 18488 |
| `socialKeyFactLine` | function | 18508 |
| `socialOpponentLine` | function | 18504 |
| `socialPlayerFocusLine` | function | 18491 |
| `socialSentence` | function | 18481 |
| `socialVideoJobsForMatchday` | function | 20039 |
| `specialTeamsStateFromActive` | function | 4316 |
| `stageSeasonDataPreview` | function | 6562 |
| `stageSeasonDataPreviewFromFile` | function | 6614 |
| `stageSeasonDataPreviewFromPaste` | function | 6628 |
| `startApp` | window | 8532 |
| `startEinsatzCenterDraftMode` | window | 7677 |
| `startHallOfFameIntro` | function | 8655 |
| `sumRoleGames` | function | 9568 |
| `switchMatchdaySeason` | window | 22728 |
| `switchOverviewSeason` | window | 22675 |
| `syncHashFromState` | function | 3404 |
| `t2s` | const-arrow | 2946 |
| `toggleAntiSynergyHideSgOnly` | window | 2385 |
| `toggleAntiSynergyShowAll` | window | 2384 |
| `toggleComparisonPicker` | window | 13426 |
| `toggleComparisonSgOnly` | window | 13411 |
| `toggleEinsatzCenterComboPlayer` | window | 7845 |
| `toggleEinsatzCenterGroupRename` | window | 7786 |
| `toggleEinsatzCenterRosterSuggestionPlayer` | window | 7717 |
| `toggleHallOfFamePureSGPlayers` | window | 2258 |
| `toggleLineupBuilderAvailable` | window | 2323 |
| `toggleMatchcenterDuoDetails` | window | 2254 |
| `toggleMatchcenterGames` | window | 8789 |
| `toggleMatchcenterPlayerDetails` | window | 2253 |
| `toggleMatchcenterSpecialTeamsGames` | window | 2252 |
| `toggleSgOnlyAlltime` | window | 2412 |
| `toggleSpecialTeamsGameDetails` | window | 2251 |
| `toggleToolMenu` | window | 23575 |
| `toolMenuElements` | function | 23550 |
| `toolMenuItemElements` | function | 23553 |
| `toolMenuOnClick` | function | 23611 |
| `toolMenuOnKeydown` | function | 23587 |
| `toPublicPlayerRegistry` | function | 3983 |
| `uiDatenstandBand` | function | 22427 |
| `uiDeltaIndicator` | function | 22192 |
| `uiFormatNumber` | function | 22164 |
| `uiHinweisKarte` | function | 22256 |
| `uiInfoIcon` | function | 22210 |
| `uiIntervallBalken` | function | 22332 |
| `uiKennzahlKachel` | function | 22222 |
| `uiKernaussage` | function | 22242 |
| `uiMethodenbox` | function | 22351 |
| `uiNotiz` | function | 22368 |
| `uiObjektseite` | function | 22516 |
| `uiObjektseiteSortTabs` | function | 22498 |
| `uiPlatzhalter` | function | 22448 |
| `uiQuoteText` | function | 22404 |
| `uiRangliste` | function | 22278 |
| `uiReliabilityDots` | function | 22177 |
| `uiVerlauf` | function | 22306 |
| `uniqueList` | function | 1870 |
| `updateCoverAllTimeStats` | function | 8421 |
| `updatePlayerRoleAvailability` | function | 4820 |
| `validateGameStructure` | function | 6323 |
| `validateMergedSeason` | function | 6410 |
| `validateSeasonGames` | function | 6364 |
| `validateSeasonKey` | function | 6387 |
| `validateWrapperFormat` | function | 6399 |
| `variance` | function | 2948 |
| `viewEinsatzCenterMergedView` | window | 7694 |
| `warnEventProcessingOnce` | function | 2628 |
| `withoutHashSync` | function | 3421 |

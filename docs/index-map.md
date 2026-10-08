# Code-Karte: index.html

<!-- index-map: source-sha256=f1d0a5f1efe66fa1e146b4abe5578847b29bf5c3f94f960eb77f7e51214d7a22 source-lines=23416 -->

Automatisch erzeugt von `scripts/build-index-map.mjs`. Nicht von Hand bearbeiten — bei Änderungen an index.html erneut ausführen: `node scripts/build-index-map.mjs --write`. Vor gezieltem Lesen prüfen, ob die Karte noch aktuell ist: `node scripts/build-index-map.mjs --check`.

index.html: 23416 Zeilen gesamt (SHA-256 `f1d0a5f1efe66fa1e146b4abe5578847b29bf5c3f94f960eb77f7e51214d7a22`). Statischer `<style>`-Block: Zeile 11–1550. Haupt-`<script>`-Block: Zeile 1664–23412.

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
| `getOrCreatePlayerProfile` | function | 3730–3762 | 33 |
| `toPublicPlayerRegistry` | function | 3917–3946 | 30 |
| `aggregateAllTimePlayers` | function | 3948–3981 | 34 |
| `emptySpecialTeamsStats` | function | 4042–4082 | 41 |
| `mergeSpecialTeamsStats` | function | 4096–4125 | 30 |
| `buildSpecialTeamsForGame` | function | 4241–4434 | 194 |
| `addGoalieGameToStats` | function | 4494–4544 | 51 |
| `buildGoalieGameRecord` | function | 4546–4594 | 49 |
| `buildGoalieStatsForSeason` | function | 4596–4675 | 80 |
| `aggregateGoalieAlltimeStats` | function | 4677–4711 | 35 |
| `getAssistDiagnostics` | function | 4738–4790 | 53 |
| `buildPlayerEvents` | function | 4920–5004 | 85 |
| `computeMetrics` | function | 5024–5156 | 133 |
| `buildSoloDuoProfile` | function | 5178–5221 | 44 |
| `identityInputs` | function | 5308–5365 | 58 |
| `buildIdentityProfiles` | function | 5409–5640 | 232 |
| `assignStatus` | function | 5687–5872 | 186 |
| `fetchTextWithDiagnostics` | function | 5907–5936 | 30 |
| `fetchSeasonGameRaw` | function | 5972–6011 | 40 |
| `validateGameStructure` | function | 6199–6238 | 40 |
| `buildDryRunReport` | function | 6305–6367 | 63 |
| `stageSeasonDataPreview` | function | 6438–6489 | 52 |
| `rSeasonDataPreviewCard` | function | 6542–6577 | 36 |
| `computeEinsatzCenterStats` | function | 6771–6801 | 31 |
| `rEinsatzCenterStats` | function | 6808–6826 | 19 |
| `einsatzCenterDeserializeAutosave` | function | 7029–7062 | 34 |
| `rEinsatzCenterGroupEditor` | function | 7372–7402 | 31 |
| `rEinsatzCenterRosterSuggestionCard` | function | 7419–7449 | 31 |
| `rEinsatzCenterGameEditor` | function | 7450–7502 | 53 |
| `rEinsatzCenterEditPage` | function | 7503–7550 | 48 |
| `loadSeasonData` | function | 7798–8267 | 470 |
| `loadSeasonForGlobal` | function | 8307–8337 | 31 |
| `loadSeason` | function | 8355–8406 | 52 |
| `ensureHallOfFameIntroOverlay` | function | 8434–8466 | 33 |
| `rMatrix` | function | 8854–8898 | 45 |
| `rRadar` | function | 8931–8978 | 48 |
| `rClutch` | function | 8981–9013 | 33 |
| `rTimeline` | function | 9016–9124 | 109 |
| `rOppBreakdown` | function | 9146–9178 | 33 |
| `generatePlayerInsights` | function | 9181–9224 | 44 |
| `rInsights` | function | 9242–9293 | 52 |
| `buildGoalieAnalysisModel` | function | 9560–9718 | 159 |
| `buildGoalieRoleProfile` | function | 9783–9856 | 74 |
| `rGoalieInsights` | function | 9975–9996 | 22 |
| `buildOpponentIntelligence` | function | 10434–10487 | 54 |
| `buildBestThirdManOptions` | function | 10637–10670 | 34 |
| `getDuoDirectScorerGameCounts` | function | 10671–10702 | 32 |
| `buildAnnotatedGoalEventsForGame` | function | 10752–10852 | 101 |
| `buildResponseGoalStatsRaw` | function | 10895–10943 | 49 |
| `buildMomentumSwingStatsRaw` | function | 10956–11026 | 71 |
| `buildDuoFloorCeiling` | function | 11033–11074 | 42 |
| `buildDuoWithWithoutImpact` | function | 11170–11203 | 34 |
| `buildDuoCompatibility` | function | 11269–11291 | 23 |
| `buildDuoProAnalysis` | function | 11328–11371 | 44 |
| `rDuoCenterPro` | function | 11372–11491 | 120 |
| `rInteractiveDuoCenterPro` | function | 11566–11621 | 56 |
| `getDifficultConnectionRowsForPlayer` | function | 11625–11669 | 45 |
| `getRosterImpactPlayerGames` | function | 11762–11803 | 42 |
| `buildRosterImpactAnalysis` | function | 11837–11905 | 69 |
| `rDifficultConnectionList` | function | 11982–12006 | 25 |
| `rDifficultConnectionListCompactLegacy` | function | 12007–12048 | 42 |
| `rDifficultConnectionListCompact` | function | 12049–12087 | 39 |
| `rDifficultConnectionsCard` | function | 12088–12124 | 37 |
| `RESPONSE_MOMENTUM_TOOLTIPS` | const-data | 12127–12158 | 32 |
| `rResponseMomentumOverviewCard` | function | 12221–12244 | 24 |
| `rMatchcenterResponseMomentum` | function | 12291–12328 | 38 |
| `getTeamAllTimeRecords` | function | 12330–12370 | 41 |
| `getAllTimeIdentityStandings` | function | 12451–12485 | 35 |
| `buildRecencyWeightedGlobalIdentityProfile` | function | 12487–12534 | 48 |
| `rHallOfFameHero` | function | 12590–12615 | 26 |
| `hallGoalieRowFromStats` | function | 12713–12745 | 33 |
| `rHallGoalieRankCard` | function | 12798–12829 | 32 |
| `rHallGoalieLegends` | function | 12847–12879 | 33 |
| `buildDuoComparison` | function | 13274–13293 | 20 |
| `rDuoCompareSummaryCards` | function | 13299–13329 | 31 |
| `rDuoComparisonPage` | function | 13430–13440 | 11 |
| `buildComparisonExtraMetrics` | function | 13485–13542 | 58 |
| `buildGoalieComparisonDataset` | function | 13579–13629 | 51 |
| `buildComparisonDataset` | function | 13630–13665 | 36 |
| `rKpiMirrorRows` | function | 13705–13764 | 60 |
| `rKpiRadar` | function | 13776–13810 | 35 |
| `rKpiTrendCompare` | function | 13857–13923 | 67 |
| `rKpiOpponentStrength` | function | 13924–13951 | 28 |
| `rKpiInfoCards` | function | 13962–13993 | 32 |
| `buildComparisonSummary` | function | 13994–14025 | 32 |
| `rComparisonStyles` | function | 14063–14100 | 38 |
| `rComparisonCenterPage` | function | 14101–14151 | 51 |
| `rGlobalDnaBars` | function | 14192–14221 | 30 |
| `buildSeasonPlayerDashModel` | function | 14291–14327 | 37 |
| `buildAlltimePlayerDashModel` | function | 14328–14370 | 43 |
| `rPlayerDashStyles` | function | 14371–14382 | 12 |
| `rPlayerDash` | function | 14389–14427 | 39 |
| `rGlobalOverview` | function | 14486–14537 | 52 |
| `rGlobalDevelopment` | function | 14557–14595 | 39 |
| `rGlobalDuoNetwork` | function | 14657–14854 | 198 |
| `rGlobalOpponentSpecialist` | function | 14856–14901 | 46 |
| `buildFieldPlayerExplanation` | function | 14967–15041 | 75 |
| `buildGoaliePlayerExplanation` | function | 15042–15095 | 54 |
| `buildPlayerIntelligence` | function | 15105–15134 | 30 |
| `rPlayerExplanation` | function | 15140–15191 | 52 |
| `rAllTimePlayersPage` | function | 15193–15233 | 41 |
| `rHallOfFamePage` | function | 15235–15323 | 89 |
| `rLexiconPage` | function | 15350–15522 | 173 |
| `buildConfidence` | function | 15539–15584 | 46 |
| `getMatchcenterOpponents` | function | 15748–15780 | 33 |
| `getMatchcenterDirectOpponents` | function | 15781–15811 | 31 |
| `matchcenterAnalyzeDirect` | function | 15814–15850 | 37 |
| `matchcenterEnsureUlmPlayer` | function | 15907–15944 | 38 |
| `matchcenterAddUlmScoring` | function | 15969–16006 | 38 |
| `matchcenterFinalizeUlmPlayers` | function | 16007–16075 | 69 |
| `matchcenterBuildUlmPlayerScouting` | function | 16076–16130 | 55 |
| `matchcenterEnsureOpponentDuo` | function | 16148–16180 | 33 |
| `matchcenterFinalizeOpponentDuos` | function | 16207–16241 | 35 |
| `matchcenterBuildOpponentDuos` | function | 16242–16286 | 45 |
| `matchcenterEnsureUlmDuo` | function | 16301–16338 | 38 |
| `matchcenterFinalizeUlmDuos` | function | 16358–16393 | 36 |
| `matchcenterBuildUlmDuos` | function | 16394–16436 | 43 |
| `matchcenterBuildSpecialTeamsMatchup` | function | 16470–16517 | 48 |
| `matchcenterBuildGoalieMatchup` | function | 16540–16585 | 46 |
| `matchcenterTimingStatsForGames` | function | 16618–16654 | 37 |
| `rMatchcenterUlmScouting` | function | 16998–17034 | 37 |
| `rMatchcenterOpponentScouting` | function | 17035–17070 | 36 |
| `rMatchcenterUlmDuos` | function | 17179–17221 | 43 |
| `rMatchcenterOpponentDuos` | function | 17222–17264 | 43 |
| `rMatchcenterSpecialTeams` | function | 17277–17326 | 50 |
| `matchcenterBuildPlanConfidence` | function | 17417–17464 | 48 |
| `matchcenterBuildIntelligenceDataQuality` | function | 17513–17582 | 70 |
| `matchcenterBuildOpponentDNA` | function | 17583–17695 | 113 |
| `matchcenterBuildOpponentAlarm` | function | 17762–17871 | 110 |
| `matchcenterBuildIntelligenceSignals` | function | 17918–17964 | 47 |
| `buildMatchIntelligenceFromContext` | function | 17965–18019 | 55 |
| `buildMatchStories` | function | 18068–18097 | 30 |
| `buildDigitalCoachReport` | function | 18168–18200 | 33 |
| `buildMatchdayCaptionBlocks` | function | 18272–18301 | 30 |
| `buildSocialMediaContent` | function | 18302–18350 | 49 |
| `lineupRosterGamesForPlayer` | function | 18418–18465 | 48 |
| `buildLineupExperienceProfile` | function | 18466–18508 | 43 |
| `buildLineupOpponentDNAFit` | function | 18521–18564 | 44 |
| `classifyLineIdentity` | function | 18565–18612 | 48 |
| `lineupPlayerProfile` | function | 18613–18688 | 76 |
| `buildLineupAnalysis` | function | 18689–18822 | 134 |
| `buildLineupScoreBreakdowns` | function | 18823–18852 | 30 |
| `lineupEvaluateComplementCandidate` | function | 18936–19014 | 79 |
| `buildTeamLineBalance` | function | 19040–19083 | 44 |
| `buildLineupRecommendations` | function | 19120–19201 | 82 |
| `matchcenterBuildMatchPlan` | function | 19230–19375 | 146 |
| `rMatchcenterOpponentDNA` | function | 19410–19442 | 33 |
| `rMatchcenterIntelOverview` | function | 19465–19510 | 46 |
| `rMatchcenterDigitalCoach` | function | 19552–19616 | 65 |
| `rMatchcenterLockerRoomSheet` | function | 19634–19689 | 56 |
| `downloadMatchdayStory` | window | 19708–19755 | 48 |
| `rSocialVideoBlock` | function | 19759–19790 | 32 |
| `generateSocialVideoVideos` | window | 19800–19841 | 42 |
| `rMatchcenterSocialMediaCenter` | function | 19892–19945 | 54 |
| `rMatchcenterLineupBuilder` | function | 19977–20049 | 73 |
| `rLineupBuilderAvailablePanel` | function | 20064–20111 | 48 |
| `rLineupRecommendationMode` | function | 20127–20160 | 34 |
| `rLineupTestLine` | function | 20174–20222 | 49 |
| `rLineupBuilderPage` | function | 20240–20274 | 35 |
| `rMatchcenterScoutingSummary` | function | 20275–20318 | 44 |
| `getTeamLogoUrlForStory` | function | 20363–20392 | 30 |
| `matchcenterStoryPickFactItems` | function | 20515–20567 | 53 |
| `buildMatchcenterStoryPreviewData` | function | 20786–20897 | 112 |
| `matchcenterStoryVisibleFacts` | function | 20904–20934 | 31 |
| `rMatchcenterStoryPreview` | function | 20953–21022 | 70 |
| `fitMatchcenterStoryLayout` | function | 21029–21071 | 43 |
| `rMatchcenterPage` | function | 21150–21298 | 149 |
| `rTeamPage` | function | 21299–21636 | 338 |
| `exportExcel` | function | 21641–21666 | 26 |
| `_render` | function | 21690–21859 | 170 |
| `uiObjektseite` | function | 22245–22278 | 34 |
| `rMatchdayDetailPage` | function | 22546–22585 | 40 |
| `buildOverviewCards` | function | 22867–22907 | 41 |

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
| `getOppStrength` | function | 3600–3606 | 7 |
| `createPlayerAnalysisProfile` | function | 3618–3620 | 3 |
| `emptyPlayerSeasonStats` | function | 3622–3627 | 6 |
| `emptyGoalieSeasonStats` | function | 3628–3649 | 22 |
| `emptyGoalieAlltimeStats` | function | 3650–3664 | 15 |
| `emptyGoalieSpecialTeamsStats` | function | 3665–3676 | 12 |
| `emptyFieldRoleSeasonStats` | function | 3677–3679 | 3 |
| `addUnique` | function | 3681–3683 | 3 |
| `incrementUniqueCounter` | function | 3685–3690 | 6 |
| `buildPlayerIdentity` | function | 3692–3707 | 16 |
| `resetPlayerRegistrySeason` | function | 3709–3719 | 11 |
| `derivePlayerStatus` | function | 3721–3728 | 8 |
| `getOrCreatePlayerProfile` | function | 3730–3762 | 33 |
| `registerPlayerIdentity` | function | 3764–3780 | 17 |
| `ensureGoalieSeasonStats` | function | 3782–3786 | 5 |
| `ensureFieldRoleSeasonStats` | function | 3787–3791 | 5 |
| `markFieldRoleAppearance` | function | 3792–3795 | 4 |
| `registerSeasonRosters` | function | 3797–3815 | 19 |
| `linkUiPlayersToRegistry` | function | 3817–3837 | 21 |
| `applySeasonScoringToRegistry` | function | 3839–3860 | 22 |
| `finalizePlayerRegistrySeason` | function | 3862–3876 | 15 |
| `serializeSeasonStats` | function | 3878–3890 | 13 |
| `serializeGoalieSeasonStats` | function | 3891–3912 | 22 |
| `serializeFieldRoleSeasonStats` | function | 3913–3915 | 3 |
| `toPublicPlayerRegistry` | function | 3917–3946 | 30 |
| `aggregateAllTimePlayers` | function | 3948–3981 | 34 |
| `finiteNumbers` | function | 3983–3985 | 3 |
| `avgOrNull` | function | 3986–3989 | 4 |
| `medianOrNull` | function | 3990–3995 | 6 |
| `incGoalieBucket` | function | 3996–3999 | 4 |
| `goalieEventAbsSeconds` | function | 4000–4005 | 6 |
| `goalieGameDurationSeconds` | function | 4006–4010 | 5 |
| `goalieGameStateBeforeGoal` | function | 4011–4022 | 12 |
| `getGoalieOpponentName` | function | 4023–4026 | 4 |
| `getGoalieOpponentTier` | function | 4027–4031 | 5 |
| `resultGoalsAgainstForSide` | function | 4032–4041 | 10 |
| `emptySpecialTeamsStats` | function | 4042–4082 | 41 |
| `clonePlain` | function | 4083–4085 | 3 |
| `finalizeSpecialTeamsStats` | function | 4086–4092 | 7 |
| `serializeSpecialTeamsStats` | function | 4093–4095 | 3 |
| `mergeSpecialTeamsStats` | function | 4096–4125 | 30 |
| `penaltyRawText` | function | 4128–4130 | 3 |
| `isMatchPenaltyEvent` | function | 4131–4134 | 4 |
| `isTwoPlusTwoPenaltyEvent` | function | 4135–4138 | 4 |
| `getPenaltyDisciplineType` | function | 4139–4146 | 8 |
| `getGameDurationMinutes` | function | 4147–4151 | 5 |
| `gameDaySortValue` | function | 4152–4159 | 8 |
| `isSameUlmTeamContext` | function | 4160–4167 | 8 |
| `getFurtherSameDayUlmGames` | function | 4168–4179 | 12 |
| `getPenaltySpecialTeamsMinutes` | function | 4180–4182 | 3 |
| `getPenaltyBasePersonalMinutes` | function | 4183–4190 | 8 |
| `getPenaltyPersonalMinutes` | function | 4191–4200 | 10 |
| `getPenaltyDisciplineMinutes` | function | 4201–4203 | 3 |
| `getSpecialTeamsPenaltyChunks` | function | 4204–4213 | 10 |
| `isPenaltyGoalEvent` | function | 4214–4218 | 5 |
| `specialTeamsStateFromActive` | function | 4219–4225 | 7 |
| `annotateSpecialTeamsGoalEvent` | function | 4226–4240 | 15 |
| `buildSpecialTeamsForGame` | function | 4241–4434 | 194 |
| `buildSpecialTeamsForSeason` | function | 4435–4443 | 9 |
| `aggregateAlltimeSpecialTeams` | function | 4444–4451 | 8 |
| `mergeGoalieSpecialTeamsStats` | function | 4452–4463 | 12 |
| `addGoalieSpecialTeamsGameToStats` | function | 4464–4478 | 15 |
| `finalizeGoalieSeasonStats` | function | 4479–4493 | 15 |
| `addGoalieGameToStats` | function | 4494–4544 | 51 |
| `buildGoalieGameRecord` | function | 4546–4594 | 49 |
| `buildGoalieStatsForSeason` | function | 4596–4675 | 80 |
| `aggregateGoalieAlltimeStats` | function | 4677–4711 | 35 |
| `updatePlayerRoleAvailability` | function | 4713–4722 | 10 |
| `getGoalieDiagnostics` | function | 4724–4729 | 6 |
| `getSpecialTeamsDiagnostics` | function | 4731–4736 | 6 |
| `getAssistDiagnostics` | function | 4738–4790 | 53 |
| `buildSeasonDuos` | function | 4793–4819 | 27 |
| `mergeDuoSet` | function | 4820–4836 | 17 |
| `aggregateAllTimeDuos` | function | 4837–4847 | 11 |
| `aggregateSeasonStats` | function | 4849–4864 | 16 |
| `buildPlayerDataFoundation` | function | 4866–4887 | 22 |
| `buildRegistry` | function | 4889–4915 | 27 |
| `buildPlayerEvents` | function | 4920–5004 | 85 |
| `getPhaseIndex` | function | 5009–5019 | 11 |
| `computeMetrics` | function | 5024–5156 | 133 |
| `detectTypes` | function | 5158–5173 | 16 |
| `pct` | function | 5175–5175 | 1 |
| `ratio01` | function | 5176–5176 | 1 |
| `relative01` | function | 5177–5177 | 1 |
| `buildSoloDuoProfile` | function | 5178–5221 | 44 |
| `identityPartnerStats` | function | 5222–5235 | 14 |
| `identityOpponentGroups` | function | 5236–5243 | 8 |
| `eventMatchesTeams` | function | 5244–5249 | 6 |
| `clutchText` | function | 5250–5250 | 1 |
| `isImportantClutchGoal` | function | 5251–5255 | 5 |
| `isDecisiveGoal` | function | 5256–5258 | 3 |
| `isLateGoal` | function | 5259–5263 | 5 |
| `isComebackRelevantGoal` | function | 5264–5267 | 4 |
| `identityPointsVsTeams` | function | 5268–5270 | 3 |
| `identityGoalsVsTeams` | function | 5271–5273 | 3 |
| `identityClutchGoalsVsTeams` | function | 5274–5276 | 3 |
| `identityDecisiveGoalsVsTeams` | function | 5277–5279 | 3 |
| `identityLateGoalsVsTeams` | function | 5280–5282 | 3 |
| `countMomentumClusters` | function | 5283–5307 | 25 |
| `identityInputs` | function | 5308–5365 | 58 |
| `clearlyAboveAverage` | function | 5366–5366 | 1 |
| `normalizeSecondaryTraits` | function | 5367–5378 | 12 |
| `seasonRoleTraitsFromClassic` | function | 5379–5383 | 5 |
| `seasonRoleKeysForPlayer` | function | 5384–5392 | 9 |
| `hasSeasonRole` | function | 5393–5395 | 3 |
| `selectEnforcerKeys` | function | 5396–5408 | 13 |
| `buildIdentityProfiles` | function | 5409–5640 | 232 |
| `composeIdentityText` | function | 5641–5647 | 7 |
| `countCaptainAppearances` | function | 5649–5661 | 13 |
| `countGoalieAppearances` | function | 5663–5665 | 3 |
| `computeRosterStatus` | function | 5667–5685 | 19 |
| `assignStatus` | function | 5687–5872 | 186 |
| `fetchJsonLegacy` | function | 5878–5897 | 20 |
| `responseExcerpt` | function | 5899–5901 | 3 |
| `diagnosticError` | function | 5902–5906 | 5 |
| `fetchTextWithDiagnostics` | function | 5907–5936 | 30 |
| `fetchJsonWithDiagnostics` | function | 5937–5945 | 9 |
| `fetchJson` | function | 5946–5949 | 4 |
| `formatStatus` | function | 5950–5952 | 3 |
| `formatDiagnosticAttempt` | function | 5953–5965 | 13 |
| `formatGameLoadError` | function | 5966–5971 | 6 |
| `fetchSeasonGameRaw` | function | 5972–6011 | 40 |
| `getStaticSeasonGames` | function | 6015–6018 | 4 |
| `loadSeasonManifest` | function | 6030–6046 | 17 |
| `resolveCurrentSeasonKey` | function | 6061–6080 | 20 |
| `applyCurrentSeasonCoverHighlight` | function | 6081–6085 | 5 |
| `isUsableExternalSeasonData` | function | 6098–6106 | 9 |
| `ensureExternalSeasonData` | function | 6107–6128 | 22 |
| `buildStaticSeasonDataBlock` | function | 6129–6138 | 10 |
| `getGameId` | function | 6165–6169 | 5 |
| `findDuplicateGameIds` | function | 6171–6181 | 11 |
| `validateGameStructure` | function | 6199–6238 | 40 |
| `validateSeasonGames` | function | 6240–6250 | 11 |
| `diffGameIds` | function | 6252–6261 | 10 |
| `validateSeasonKey` | function | 6263–6273 | 11 |
| `validateWrapperFormat` | function | 6275–6284 | 10 |
| `validateMergedSeason` | function | 6286–6303 | 18 |
| `buildDryRunReport` | function | 6305–6367 | 63 |
| `seasonDataPreviewRerender` | function | 6388–6390 | 3 |
| `seasonDataPreviewRow` | function | 6392–6403 | 12 |
| `buildSeasonDataPreviewChanges` | function | 6410–6427 | 18 |
| `stageSeasonDataPreview` | function | 6438–6489 | 52 |
| `stageSeasonDataPreviewFromFile` | function | 6490–6503 | 14 |
| `stageSeasonDataPreviewFromPaste` | function | 6504–6508 | 5 |
| `discardSeasonDataPreview` | function | 6509–6513 | 5 |
| `getSeasonDataPreview` | function | 6515–6517 | 3 |
| `isSeasonDataPreviewStale` | function | 6523–6527 | 5 |
| `rSeasonDataPreviewStatus` | function | 6529–6531 | 3 |
| `rSeasonDataPreviewRows` | function | 6532–6540 | 9 |
| `rSeasonDataPreviewCard` | function | 6542–6577 | 36 |
| `setSeasonDataPreviewOpen` | window | 6578–6578 | 1 |
| `setSeasonDataPreviewPasteText` | window | 6579–6579 | 1 |
| `fileNameForLineupSeasonKey` | function | 6599–6601 | 3 |
| `ensureLineupDataLoaded` | function | 6617–6633 | 17 |
| `ensureLineupGroupsRegistryLoaded` | function | 6642–6658 | 17 |
| `resolveLineupPlayerName` | function | 6670–6673 | 4 |
| `findLineupGameContext` | function | 6676–6683 | 8 |
| `rEinsatzCenterGroup` | function | 6685–6696 | 12 |
| `rEinsatzCenterCombo` | function | 6698–6705 | 8 |
| `rEinsatzCenterGameCard` | function | 6707–6724 | 18 |
| `rEinsatzCenterPage` | function | 6726–6745 | 20 |
| `setEinsatzCenterSeason` | window | 6747–6752 | 6 |
| `openEinsatzCenter` | window | 6753–6760 | 8 |
| `computeEinsatzCenterStats` | function | 6771–6801 | 31 |
| `lineupGroupDisplayName` | function | 6802–6807 | 6 |
| `rEinsatzCenterStats` | function | 6808–6826 | 19 |
| `getEffectiveLineupData` | function | 6884–6891 | 8 |
| `isEinsatzCenterGameFromDraft` | function | 6893–6896 | 4 |
| `einsatzCenterDraftInView` | function | 6898–6901 | 4 |
| `rEinsatzCenterDraftMark` | function | 6902–6905 | 4 |
| `rEinsatzCenterDraftStatsHint` | function | 6906–6910 | 5 |
| `einsatzCenterDraftStaleHint` | function | 6912–6914 | 3 |
| `rEinsatzCenterDraftBanner` | function | 6916–6923 | 8 |
| `ensureEinsatzCenterDraft` | function | 6934–6947 | 14 |
| `getEinsatzCenterGameDraft` | function | 6956–6967 | 12 |
| `einsatzCenterAutosaveKey` | function | 6994–6994 | 1 |
| `einsatzCenterStorageRead` | function | 6995–6997 | 3 |
| `einsatzCenterStorageWrite` | function | 6998–7000 | 3 |
| `einsatzCenterStorageRemove` | function | 7001–7003 | 3 |
| `einsatzCenterDraftIsEmpty` | function | 7006–7008 | 3 |
| `einsatzCenterSerializeDraft` | function | 7010–7022 | 13 |
| `einsatzCenterIsPlainObject` | function | 7023–7023 | 1 |
| `einsatzCenterDeserializeAutosave` | function | 7029–7062 | 34 |
| `einsatzCenterCurrentRawBaseHash` | function | 7069–7074 | 6 |
| `einsatzCenterAutosaveDraft` | function | 7083–7110 | 28 |
| `einsatzCenterInspectAutosave` | function | 7118–7146 | 29 |
| `restoreEinsatzCenterAutosave` | function | 7149–7165 | 17 |
| `discardEinsatzCenterAutosave` | function | 7167–7172 | 6 |
| `rEinsatzCenterAutosaveBanner` | function | 7175–7187 | 13 |
| `einsatzCenterAutosaveInfoText` | function | 7189–7199 | 11 |
| `loadEinsatzCenterMismatchedAutosave` | function | 7213–7231 | 19 |
| `deriveLineupValidPlayerIds` | function | 7244–7260 | 17 |
| `deriveLineupUlmPlayerIds` | function | 7268–7284 | 17 |
| `getSeasonmanagerRosterSuggestion` | function | 7298–7318 | 21 |
| `einsatzCenterCanonicalJson` | function | 7327–7336 | 10 |
| `einsatzCenterSha256Hex` | function | 7337–7341 | 5 |
| `einsatzCenterComputeBaseHash` | function | 7342–7344 | 3 |
| `einsatzCenterSoftIssues` | function | 7351–7369 | 19 |
| `rEinsatzCenterGroupEditor` | function | 7372–7402 | 31 |
| `rEinsatzCenterComboEditor` | function | 7403–7409 | 7 |
| `rEinsatzCenterRosterSuggestionCard` | function | 7419–7449 | 31 |
| `rEinsatzCenterGameEditor` | function | 7450–7502 | 53 |
| `rEinsatzCenterEditPage` | function | 7503–7550 | 48 |
| `startEinsatzCenterDraftMode` | window | 7553–7557 | 5 |
| `cancelEinsatzCenterEdit` | window | 7558–7568 | 11 |
| `viewEinsatzCenterMergedView` | window | 7570–7570 | 1 |
| `returnToEinsatzCenterEdit` | window | 7571–7571 | 1 |
| `setEinsatzCenterIncludeDraft` | window | 7572–7572 | 1 |
| `selectEinsatzCenterEditGame` | window | 7573–7576 | 4 |
| `addEinsatzCenterRosterPlayer` | window | 7577–7584 | 8 |
| `removeEinsatzCenterRosterPlayer` | window | 7585–7592 | 8 |
| `toggleEinsatzCenterRosterSuggestionPlayer` | window | 7593–7599 | 7 |
| `dismissEinsatzCenterRosterSuggestion` | window | 7600–7603 | 4 |
| `acceptEinsatzCenterRosterSuggestion` | window | 7611–7627 | 17 |
| `addEinsatzCenterExistingGroup` | window | 7628–7636 | 9 |
| `addEinsatzCenterNewGroup` | window | 7637–7653 | 17 |
| `removeEinsatzCenterGroup` | window | 7654–7661 | 8 |
| `toggleEinsatzCenterGroupRename` | window | 7662–7664 | 3 |
| `renameEinsatzCenterGroup` | window | 7676–7695 | 20 |
| `addEinsatzCenterGroupPlayer` | window | 7696–7703 | 8 |
| `removeEinsatzCenterGroupPlayer` | window | 7704–7711 | 8 |
| `setEinsatzCenterGroupPlayerPosition` | window | 7712–7720 | 9 |
| `toggleEinsatzCenterComboPlayer` | window | 7721–7728 | 8 |
| `confirmEinsatzCenterCombo` | window | 7729–7739 | 11 |
| `removeEinsatzCenterCombo` | window | 7740–7746 | 7 |
| `setEinsatzCenterGameNote` | window | 7747–7753 | 7 |
| `buildEinsatzCenterDraftExport` | function | 7757–7770 | 14 |
| `exportEinsatzCenterDraft` | window | 7771–7783 | 13 |
| `loadSeasonData` | function | 7798–8267 | 470 |
| `showMainShell` | function | 8270–8274 | 5 |
| `hasSeasonSource` | function | 8275–8278 | 4 |
| `hasEmbeddedSeasonData` | function | 8279–8281 | 3 |
| `getGlobalLoadableSeasonKeys` | function | 8282–8288 | 7 |
| `getAllTimeCoverStats` | function | 8289–8296 | 8 |
| `updateCoverAllTimeStats` | function | 8297–8305 | 9 |
| `loadSeasonForGlobal` | function | 8307–8337 | 31 |
| `ensureGlobalDataLoaded` | function | 8338–8353 | 16 |
| `loadSeason` | function | 8355–8406 | 52 |
| `startApp` | window | 8408–8419 | 12 |
| `ensureAppLoaded` | function | 8410–8419 | 10 |
| `openSeason` | window | 8420–8422 | 3 |
| `openAllTimePlayers` | window | 8423–8428 | 6 |
| `hofIntroDelay` | function | 8431–8433 | 3 |
| `ensureHallOfFameIntroOverlay` | function | 8434–8466 | 33 |
| `buildHallOfFameIntroTitle` | function | 8467–8477 | 11 |
| `seedHallOfFameIntroParticles` | function | 8478–8495 | 18 |
| `cleanupHallOfFameIntro` | function | 8496–8510 | 15 |
| `restoreHallOfFameIntroPrevious` | function | 8511–8522 | 12 |
| `finishHallOfFameIntro` | function | 8523–8530 | 8 |
| `startHallOfFameIntro` | function | 8531–8555 | 25 |
| `cancelHallOfFameIntro` | function | 8556–8567 | 12 |
| `openHallOfFame` | window | 8569–8592 | 24 |
| `openComparisonCenter` | window | 8593–8621 | 29 |
| `openMatchcenter` | window | 8622–8643 | 22 |
| `openLineupBuilder` | window | 8644–8661 | 18 |
| `setMatchcenterOpponent` | window | 8662–8662 | 1 |
| `setMatchcenterContext` | window | 8663–8663 | 1 |
| `setMatchcenterSeason` | window | 8664–8664 | 1 |
| `toggleMatchcenterGames` | window | 8665–8665 | 1 |
| `openLexicon` | window | 8666–8669 | 4 |
| `rRes` | const-arrow | 8674–8674 | 1 |
| `rClutchBadge` | function | 8675–8682 | 8 |
| `escAttr` | function | 8683–8685 | 3 |
| `roleTraitLabel` | function | 8686–8688 | 3 |
| `isVisibleSecondaryTrait` | function | 8689–8692 | 4 |
| `rRoleTraitTip` | function | 8693–8697 | 5 |
| `rStyleMetricTip` | function | 8698–8701 | 4 |
| `rRosterStatusBadge` | function | 8702–8709 | 8 |
| `classicTagLabel` | function | 8710–8712 | 3 |
| `rClassicTagTip` | function | 8713–8717 | 5 |
| `fallbackIdentityProfile` | function | 8718–8728 | 11 |
| `rIdentityTags` | function | 8729–8737 | 9 |
| `rStyleProfileBars` | function | 8738–8748 | 11 |
| `rIdentityCards` | function | 8749–8774 | 26 |
| `rClassicRoleTags` | function | 8775–8782 | 8 |
| `renderTags` | function | 8783–8785 | 3 |
| `getSeasonPlayerFieldBasis` | function | 8787–8813 | 27 |
| `getSeasonScopedIdentityProfile` | function | 8814–8825 | 12 |
| `rSeasonProfileKpis` | function | 8826–8845 | 20 |
| `rSeasonProfileTagStrip` | function | 8847–8851 | 5 |
| `rMatrix` | function | 8854–8898 | 45 |
| `rSeasonDuoSummary` | function | 8901–8909 | 9 |
| `rPhases` | function | 8911–8928 | 18 |
| `rRadar` | function | 8931–8978 | 48 |
| `rClutch` | function | 8981–9013 | 33 |
| `rTimeline` | function | 9016–9124 | 109 |
| `rPenalties` | function | 9127–9143 | 17 |
| `rOppBreakdown` | function | 9146–9178 | 33 |
| `generatePlayerInsights` | function | 9181–9224 | 44 |
| `rSeasonInsightsTab` | function | 9227–9240 | 14 |
| `rInsights` | function | 9242–9293 | 52 |
| `rTable` | function | 9296–9316 | 21 |
| `findLoadedSeasonPlayer` | function | 9319–9327 | 9 |
| `getAllTimePlayerRows` | function | 9328–9343 | 16 |
| `isSgOnlyAlltimePlayer` | function | 9344–9351 | 8 |
| `isPureSGPlayer` | function | 9352–9355 | 4 |
| `filterPureSGPlayers` | function | 9356–9359 | 4 |
| `getAllTimeMainPlayerRows` | function | 9360–9362 | 3 |
| `getAllTimeSgOnlyRows` | function | 9363–9365 | 3 |
| `getPlayerSeasonStats` | function | 9366–9370 | 5 |
| `getPlayerAlltimeStats` | function | 9371–9378 | 8 |
| `getPlayerRegistryProfile` | function | 9379–9386 | 8 |
| `getPlayerGoalieSeasonStats` | function | 9387–9391 | 5 |
| `getPlayerGoalieAlltimeStats` | function | 9392–9415 | 24 |
| `sumRoleGames` | function | 9416–9421 | 6 |
| `getPlayerRoleAvailability` | function | 9422–9435 | 14 |
| `resolvePlayerRoleView` | function | 9436–9443 | 8 |
| `rPlayerRoleSwitch` | function | 9444–9450 | 7 |
| `goalieNum` | function | 9451–9456 | 6 |
| `goalieTime` | function | 9457–9464 | 8 |
| `goalieBucketRows` | function | 9465–9470 | 6 |
| `goalieTopRow` | function | 9471–9473 | 3 |
| `goalieTierMeta` | function | 9474–9482 | 9 |
| `goalieStdDev` | function | 9483–9488 | 6 |
| `goalieDetailFirstTime` | function | 9489–9495 | 7 |
| `goalieEventSecondInPeriod` | function | 9496–9501 | 6 |
| `goaliePctText` | function | 9502–9505 | 4 |
| `goalieSafeNum` | function | 9506–9509 | 4 |
| `goalieClampScore` | function | 9510–9513 | 4 |
| `goalieInverseScore` | function | 9514–9521 | 8 |
| `goaliePositiveScore` | function | 9522–9529 | 8 |
| `goaliePositiveCurveScore` | function | 9530–9538 | 9 |
| `goalieWeightedScore` | function | 9539–9544 | 6 |
| `goalieApplySampleConfidence` | function | 9545–9552 | 8 |
| `goalieBucketLooseSum` | function | 9553–9559 | 7 |
| `buildGoalieAnalysisModel` | function | 9560–9718 | 159 |
| `rGoalieBars` | function | 9719–9728 | 10 |
| `goalieDnaKey` | function | 9770–9774 | 5 |
| `goalieDnaValue` | function | 9775–9781 | 7 |
| `goalieStateGoals` | function | 9782–9782 | 1 |
| `buildGoalieRoleProfile` | function | 9783–9856 | 74 |
| `rGoalieRoleTraits` | function | 9857–9860 | 4 |
| `getGoalieDnaRows` | function | 9861–9864 | 4 |
| `rGoalieDnaBars` | function | 9865–9878 | 14 |
| `rGoalieKpis` | function | 9879–9895 | 17 |
| `rGoalieMiniMetrics` | function | 9896–9901 | 6 |
| `rGoalieFirstGoalResistance` | function | 9902–9915 | 14 |
| `rGoalieMomentum` | function | 9916–9929 | 14 |
| `rGoalieTierCards` | function | 9930–9957 | 28 |
| `rGoaliePhaseProfile` | function | 9958–9974 | 17 |
| `rGoalieInsights` | function | 9975–9996 | 22 |
| `rGoalieOverview` | function | 9997–10013 | 17 |
| `rGoaliePhases` | function | 10014–10016 | 3 |
| `rGoalieOpponents` | function | 10017–10028 | 12 |
| `rGoalieStability` | function | 10029–10053 | 25 |
| `rGoalieTable` | function | 10054–10061 | 8 |
| `rGoalieAnalysis` | function | 10062–10087 | 26 |
| `getPreviousSeasonKey` | function | 10089–10093 | 5 |
| `playerAppearedInSeasonByName` | function | 10094–10104 | 11 |
| `playerAppearedForUlmStatusInSeasonByName` | function | 10105–10123 | 19 |
| `isRookieCandidateForSeason` | function | 10124–10133 | 10 |
| `getLoadedSeasonPointsByName` | function | 10134–10138 | 5 |
| `seasonHasPureUlmTeam` | function | 10139–10145 | 7 |
| `isSgOnlyHallOfFameExcluded` | function | 10146–10154 | 9 |
| `isHallOfFameEligiblePlayer` | function | 10155–10160 | 6 |
| `getHallOfFamePlayerRows` | function | 10161–10163 | 3 |
| `getHallOfFamePlayerIdSet` | function | 10164–10166 | 3 |
| `getGlobalProfileEvents` | function | 10168–10179 | 12 |
| `countBy` | function | 10181–10189 | 9 |
| `getLoadedSeasonPlayerUi` | function | 10190–10194 | 5 |
| `getGlobalPlayerTeamRecord` | function | 10195–10220 | 26 |
| `getGlobalPlayerPeakGame` | function | 10221–10231 | 11 |
| `getGlobalPlayerBestSeason` | function | 10232–10238 | 7 |
| `getAllTimeDuoRowsForPlayer` | function | 10239–10249 | 11 |
| `getCarryPerformanceRows` | function | 10250–10265 | 16 |
| `rCarryPerformanceRows` | function | 10266–10278 | 13 |
| `getAllTimeGamesPlayedRows` | function | 10279–10303 | 25 |
| `getAllTimePenaltyRows` | function | 10304–10319 | 16 |
| `getSeasonUiPlayerForProfile` | function | 10320–10323 | 4 |
| `getSeasonIdentityProfile` | function | 10324–10328 | 5 |
| `seasonStatNumber` | function | 10329–10332 | 4 |
| `seasonStatSetSize` | function | 10333–10338 | 6 |
| `isActiveAlltimeSeasonStats` | function | 10339–10352 | 14 |
| `getActiveAlltimeSeasonKeys` | function | 10353–10363 | 11 |
| `getAlltimeRecencyWeight` | function | 10364–10369 | 6 |
| `getRosterStatus` | function | 10370–10376 | 7 |
| `getGlobalTopScorerMilestones` | function | 10377–10389 | 13 |
| `getGlobalRookieSeasonKey` | function | 10390–10403 | 14 |
| `getGlobalRookieMilestone` | function | 10404–10414 | 11 |
| `getGlobalPlayerMilestones` | function | 10415–10432 | 18 |
| `buildOpponentIntelligence` | function | 10434–10487 | 54 |
| `rOpponentIntelBars` | function | 10489–10499 | 11 |
| `getAllTimeDuoRows` | function | 10501–10523 | 23 |
| `rDuoRows` | function | 10525–10544 | 20 |
| `getAllLoadedSeasonGames` | function | 10546–10565 | 20 |
| `getRosterEntryRegistryProfile` | function | 10567–10570 | 4 |
| `difficultConnectionConfidence` | function | 10571–10575 | 5 |
| `getDuoRowsForPlayerScope` | function | 10576–10594 | 19 |
| `buildDirectDuoLookupForPlayer` | function | 10595–10612 | 18 |
| `duoScopeSeasonKeys` | function | 10613–10616 | 4 |
| `getDuoScorerCountsWithCandidate` | function | 10617–10636 | 20 |
| `buildBestThirdManOptions` | function | 10637–10670 | 34 |
| `getDuoDirectScorerGameCounts` | function | 10671–10702 | 32 |
| `responseMomentumAbsSeconds` | function | 10704–10709 | 6 |
| `responseMomentumTime` | function | 10710–10716 | 7 |
| `responseMomentumGameRows` | function | 10717–10723 | 7 |
| `responseMomentumSide` | function | 10724–10732 | 9 |
| `responseMomentumActor` | function | 10733–10743 | 11 |
| `responseMomentumGoalActors` | function | 10744–10751 | 8 |
| `buildAnnotatedGoalEventsForGame` | function | 10752–10852 | 101 |
| `responseMomentumConfidence` | function | 10853–10857 | 5 |
| `responseMomentumEmptyState` | function | 10858–10865 | 8 |
| `responseMomentumPairKey` | function | 10866–10868 | 3 |
| `ensureRmPlayer` | function | 10869–10874 | 6 |
| `ensureRmDuo` | function | 10875–10880 | 6 |
| `finalizeResponseStats` | function | 10881–10894 | 14 |
| `buildResponseGoalStatsRaw` | function | 10895–10943 | 49 |
| `buildResponseGoalStats` | function | 10944–10949 | 6 |
| `finalizeMomentumStats` | function | 10950–10955 | 6 |
| `buildMomentumSwingStatsRaw` | function | 10956–11026 | 71 |
| `buildMomentumSwingStats` | function | 11027–11032 | 6 |
| `buildDuoFloorCeiling` | function | 11033–11074 | 42 |
| `buildDuoWarnings` | function | 11075–11093 | 19 |
| `duoProPairKey` | function | 11094–11096 | 3 |
| `duoProContextSeasonKey` | function | 11097–11099 | 3 |
| `getDuoFieldPlayerRows` | function | 11100–11110 | 11 |
| `duoProPlayer` | function | 11111–11115 | 5 |
| `getDuoSharedFieldRows` | function | 11116–11121 | 6 |
| `buildDuoDirectProduction` | function | 11122–11142 | 21 |
| `emptyDuoTeamImpactStats` | function | 11143–11145 | 3 |
| `addDuoTeamGame` | function | 11146–11161 | 16 |
| `finalizeDuoTeamImpactStats` | function | 11162–11169 | 8 |
| `buildDuoWithWithoutImpact` | function | 11170–11203 | 34 |
| `buildDuoOpponentAdjusted` | function | 11204–11216 | 13 |
| `buildDuoNetworkContext` | function | 11217–11240 | 24 |
| `buildDuoGapAnalysis` | function | 11241–11257 | 17 |
| `buildDuoCompatibility` | function | 11269–11291 | 23 |
| `buildDuoUntestedPotential` | function | 11292–11303 | 12 |
| `buildDuoUsageRate` | function | 11304–11315 | 12 |
| `buildDuoReplacementOptions` | function | 11316–11327 | 12 |
| `buildDuoProAnalysis` | function | 11328–11371 | 44 |
| `rDuoCenterPro` | function | 11372–11491 | 120 |
| `duoProDomId` | function | 11492–11494 | 3 |
| `duoProPickerOpen` | function | 11495–11497 | 3 |
| `duoProPickerMessage` | function | 11498–11500 | 3 |
| `setDuoProPickerState` | function | 11501–11510 | 10 |
| `duoProResolveCandidate` | function | 11511–11519 | 9 |
| `duoProSelectionPayload` | function | 11520–11529 | 10 |
| `openDuoProPicker` | window | 11530–11530 | 1 |
| `cancelDuoProPicker` | window | 11531–11531 | 1 |
| `selectDuoProQuick` | window | 11532–11535 | 4 |
| `confirmDuoProSelection` | window | 11536–11550 | 15 |
| `setDuoProSelection` | window | 11551–11558 | 8 |
| `rDuoProPlayerSelect` | function | 11559–11565 | 7 |
| `rInteractiveDuoCenterPro` | function | 11566–11621 | 56 |
| `rSeasonDuoCenterPro` | function | 11622–11624 | 3 |
| `getDifficultConnectionRowsForPlayer` | function | 11625–11669 | 45 |
| `emptyRosterImpactStats` | function | 11670–11672 | 3 |
| `finalizeRosterImpactStats` | function | 11673–11680 | 8 |
| `addRosterImpactGameToStats` | function | 11681–11690 | 10 |
| `getRosterImpactPlayerEventLookup` | function | 11691–11711 | 21 |
| `buildRosterImpactGameIndex` | function | 11724–11749 | 26 |
| `getRosterImpactPlayerGames` | function | 11762–11803 | 42 |
| `rosterImpactConfidence` | function | 11804–11809 | 6 |
| `confidenceFromSampleSize` | function | 11814–11817 | 4 |
| `rosterImpactConfidenceWeight` | function | 11818–11821 | 4 |
| `antiSynergyImpactScore` | function | 11822–11836 | 15 |
| `buildRosterImpactAnalysis` | function | 11837–11905 | 69 |
| `buildDuoAntiSynergy` | function | 11906–11908 | 3 |
| `rAntiSynergyDelta` | function | 11909–11915 | 7 |
| `antiSynergyDeltaClass` | function | 11916–11919 | 4 |
| `antiSynergySigned` | function | 11920–11924 | 5 |
| `rAntiSynergyCompareChip` | function | 11925–11932 | 8 |
| `rAntiSynergyMetricRow` | function | 11933–11941 | 9 |
| `rAntiSynergyWinrateText` | function | 11949–11954 | 6 |
| `rAntiSynergyWinrateRow` | function | 11955–11963 | 9 |
| `rRosterImpactStatLine` | function | 11964–11967 | 4 |
| `antiSynergyPartnerIsSgOnly` | function | 11968–11971 | 4 |
| `rAntiSynergyMainDelta` | function | 11972–11981 | 10 |
| `rDifficultConnectionList` | function | 11982–12006 | 25 |
| `rDifficultConnectionListCompactLegacy` | function | 12007–12048 | 42 |
| `rDifficultConnectionListCompact` | function | 12049–12087 | 39 |
| `rDifficultConnectionsCard` | function | 12088–12124 | 37 |
| `responseMomentumTooltipFor` | function | 12169–12175 | 7 |
| `rmTerm` | function | 12176–12179 | 4 |
| `rResponseRateDisplay` | function | 12185–12191 | 7 |
| `rRmKpi` | function | 12192–12203 | 12 |
| `rAvgResponseTimeNote` | function | 12206–12209 | 4 |
| `rRmTopList` | function | 12210–12220 | 11 |
| `rResponseMomentumOverviewCard` | function | 12221–12244 | 24 |
| `rPlayerResponseMomentumCard` | function | 12245–12263 | 19 |
| `rDuoResponseMomentumCard` | function | 12264–12283 | 20 |
| `rTeamResponseMomentumCard` | function | 12284–12290 | 7 |
| `rMatchcenterResponseMomentum` | function | 12291–12328 | 38 |
| `getTeamAllTimeRecords` | function | 12330–12370 | 41 |
| `getAllTimeOpponentIntelligence` | function | 12372–12378 | 7 |
| `getAllTimeOpponentTopScorers` | function | 12380–12404 | 25 |
| `getHallOfFameStats` | function | 12406–12428 | 23 |
| `rOpponentTopScorerTable` | function | 12430–12449 | 20 |
| `getAllTimeIdentityStandings` | function | 12451–12485 | 35 |
| `buildRecencyWeightedGlobalIdentityProfile` | function | 12487–12534 | 48 |
| `getGlobalIdentityProfile` | function | 12536–12562 | 27 |
| `dedupeIdentityProfileTags` | function | 12564–12575 | 12 |
| `rGlobalProfileTags` | function | 12577–12581 | 5 |
| `escHtml` | function | 12583–12585 | 3 |
| `pctValue` | function | 12586–12589 | 4 |
| `rHallOfFameHero` | function | 12590–12615 | 26 |
| `rHallPodiumList` | function | 12616–12638 | 23 |
| `rHallDuoTemple` | function | 12639–12646 | 8 |
| `hallGoalieNum` | function | 12648–12653 | 6 |
| `hallGoalieTime` | function | 12654–12661 | 8 |
| `hallGoalieSeasonLabel` | function | 12662–12662 | 1 |
| `isHallRowPureSG` | function | 12663–12670 | 8 |
| `rHallSGBadge` | function | 12671–12673 | 3 |
| `hallGoaliePkStats` | function | 12674–12685 | 12 |
| `hallGoalieTopteamStats` | function | 12686–12692 | 7 |
| `hallGoalieSeasonScore` | function | 12693–12712 | 20 |
| `hallGoalieRowFromStats` | function | 12713–12745 | 33 |
| `getHallGoalieData` | function | 12746–12761 | 16 |
| `hallGoalieNameHtml` | function | 12762–12764 | 3 |
| `hallGoalieTooltip` | function | 12779–12782 | 4 |
| `hallGoalieExplainForLabel` | function | 12783–12797 | 15 |
| `rHallGoalieRankCard` | function | 12798–12829 | 32 |
| `rHallGoalieAwardCards` | function | 12830–12846 | 17 |
| `rHallGoalieLegends` | function | 12847–12879 | 33 |
| `getGlobalSeasonStatRows` | function | 12880–12895 | 16 |
| `getAlltimeRank` | function | 12896–12901 | 6 |
| `rAlltimeKpis` | function | 12902–12915 | 14 |
| `rSparkline` | function | 12916–12928 | 13 |
| `comparisonItemKey` | function | 12940–12945 | 6 |
| `normalizeComparisonItem` | function | 12946–12950 | 5 |
| `comparisonJsArg` | function | 12951–12953 | 3 |
| `comparisonNum` | function | 12954–12957 | 4 |
| `comparisonPct` | function | 12958–12961 | 4 |
| `comparisonFmt` | function | 12962–12965 | 4 |
| `comparisonPctFmt` | function | 12966–12968 | 3 |
| `getComparisonPlayerRow` | function | 12969–12971 | 3 |
| `getComparisonSeasonLabel` | function | 12972–12974 | 3 |
| `getComparisonTeamGoalsForSeason` | function | 12975–12986 | 12 |
| `getComparisonAlltimeTeamGoals` | function | 12987–12989 | 3 |
| `getComparisonSeasonEvents` | function | 12990–12994 | 5 |
| `getComparisonChemistryFromEvents` | function | 12995–12999 | 5 |
| `getComparisonClutchFromEvents` | function | 13000–13004 | 5 |
| `getComparisonStyleProfile` | function | 13005–13029 | 25 |
| `getComparisonProfile` | function | 13030–13034 | 5 |
| `getComparisonSeasonTrend` | function | 13035–13060 | 26 |
| `getComparisonAlltimeTrend` | function | 13061–13066 | 6 |
| `getComparisonPlayerOptions` | function | 13068–13082 | 15 |
| `comparisonVariantValue` | function | 13083–13085 | 3 |
| `getComparisonVariantsForPlayer` | function | 13086–13110 | 25 |
| `parseComparisonVariant` | function | 13111–13125 | 15 |
| `getComparisonCurrentSelection` | function | 13126–13136 | 11 |
| `filterComparisonPlayers` | window | 13137–13144 | 8 |
| `selectComparisonPlayer` | window | 13145–13150 | 6 |
| `setComparisonRoleMode` | window | 13151–13155 | 5 |
| `setComparisonVariant` | window | 13156–13159 | 4 |
| `toggleComparisonSgOnly` | window | 13160–13160 | 1 |
| `addComparisonItem` | window | 13161–13168 | 8 |
| `addSelectedComparisonItem` | window | 13169–13174 | 6 |
| `toggleComparisonPicker` | window | 13175–13175 | 1 |
| `removeComparisonItem` | window | 13176–13179 | 4 |
| `clearComparison` | window | 13180–13180 | 1 |
| `runComparison` | window | 13181–13187 | 7 |
| `selectComparisonMode` | window | 13188–13188 | 1 |
| `backToComparisonModeSelect` | window | 13189–13189 | 1 |
| `normalizeDuoComparisonItem` | function | 13190–13193 | 4 |
| `comparisonDuoContext` | function | 13194–13197 | 4 |
| `setComparisonDuoMode` | window | 13198–13198 | 1 |
| `setComparisonDuoSeasonKey` | window | 13199–13199 | 1 |
| `setComparisonDuoSearch` | window | 13200–13200 | 1 |
| `filterPlayerSuggestions` | function | 13201–13212 | 12 |
| `rComparisonDuoSuggestionButtons` | function | 13213–13216 | 4 |
| `renderComparisonDuoSuggestions` | function | 13217–13225 | 9 |
| `filterComparisonDuoSuggestions` | window | 13226–13233 | 8 |
| `selectComparisonDuoSuggestion` | window | 13227–13233 | 7 |
| `handleComparisonDuoSearchKey` | window | 13234–13246 | 13 |
| `setComparisonDuoPlayer` | window | 13247–13252 | 6 |
| `addComparisonDuoFromSelection` | window | 13253–13260 | 8 |
| `addComparisonDuo` | window | 13261–13263 | 3 |
| `removeComparisonDuo` | window | 13264–13267 | 4 |
| `clearComparisonDuos` | window | 13268–13268 | 1 |
| `runDuoComparison` | window | 13269–13273 | 5 |
| `buildDuoComparison` | function | 13274–13293 | 20 |
| `rDuoComparisonBars` | function | 13294–13298 | 5 |
| `rDuoCompareSummaryCards` | function | 13299–13329 | 31 |
| `rDuoComparisonProfile` | function | 13330–13351 | 22 |
| `rDuoComparisonChemistry` | function | 13352–13367 | 16 |
| `rDuoComparisonImpact` | function | 13368–13383 | 16 |
| `rDuoComparisonContext` | function | 13384–13401 | 18 |
| `rDuoComparisonDetails` | function | 13402–13405 | 4 |
| `rDuoComparisonDashboard` | function | 13406–13419 | 14 |
| `rComparisonDuoSearchBox` | function | 13420–13429 | 10 |
| `rDuoComparisonPage` | function | 13430–13440 | 11 |
| `rComparisonModeSelect` | function | 13441–13443 | 3 |
| `getComparisonEventsForItem` | function | 13444–13446 | 3 |
| `getComparisonRosterGamesForSeason` | function | 13447–13463 | 17 |
| `getComparisonRosterGames` | function | 13464–13471 | 8 |
| `comparisonEventGameKey` | function | 13472–13474 | 3 |
| `comparisonEventPhaseLabel` | function | 13475–13478 | 4 |
| `comparisonOpponentStrengthTier` | function | 13479–13484 | 6 |
| `buildComparisonExtraMetrics` | function | 13485–13542 | 58 |
| `getGoalieComparisonAlltimeTrend` | function | 13543–13559 | 17 |
| `getGoalieComparisonSeasonTrend` | function | 13560–13578 | 19 |
| `buildGoalieComparisonDataset` | function | 13579–13629 | 51 |
| `buildComparisonDataset` | function | 13630–13665 | 36 |
| `kpiValueText` | function | 13667–13670 | 4 |
| `kpiDelta` | function | 13671–13676 | 6 |
| `kpiItemColor` | function | 13677–13679 | 3 |
| `rKpiCards` | function | 13680–13690 | 11 |
| `rKpiMirrorRows` | function | 13705–13764 | 60 |
| `kpiRadarValue` | function | 13765–13775 | 11 |
| `rKpiRadar` | function | 13776–13810 | 35 |
| `rKpiShareBars` | function | 13811–13818 | 8 |
| `rKpiMetricCard` | function | 13819–13823 | 5 |
| `rKpiTextMetricCard` | function | 13824–13826 | 3 |
| `rKpiExtendedMetrics` | function | 13827–13841 | 15 |
| `kpiNiceMax` | function | 13842–13847 | 6 |
| `kpiTrendRows` | function | 13848–13856 | 9 |
| `rKpiTrendCompare` | function | 13857–13923 | 67 |
| `rKpiOpponentStrength` | function | 13924–13951 | 28 |
| `kpiBadge` | function | 13952–13954 | 3 |
| `rKpiObjectMini` | function | 13955–13961 | 7 |
| `rKpiInfoCards` | function | 13962–13993 | 32 |
| `buildComparisonSummary` | function | 13994–14025 | 32 |
| `rKPIVergleich` | function | 14026–14039 | 14 |
| `rComparisonMiniOverview` | function | 14040–14043 | 4 |
| `rComparisonRoles` | function | 14044–14051 | 8 |
| `rComparisonDashboard` | function | 14052–14062 | 11 |
| `rComparisonStyles` | function | 14063–14100 | 38 |
| `rComparisonCenterPage` | function | 14101–14151 | 51 |
| `rSeasonTrendRows` | function | 14152–14170 | 19 |
| `getAlltimeAggregatedStyleProfile` | function | 14171–14190 | 20 |
| `rGlobalDnaBars` | function | 14192–14221 | 30 |
| `pdashNum` | function | 14222–14225 | 4 |
| `pdashPct` | function | 14226–14229 | 4 |
| `pdashPhaseLabel` | function | 14230–14233 | 4 |
| `pdashTopCount` | function | 14234–14237 | 4 |
| `pdashBestPhase` | function | 14238–14241 | 4 |
| `pdashTopPartner` | function | 14242–14245 | 4 |
| `pdashTopOpponent` | function | 14246–14249 | 4 |
| `pdashOpponentTier` | function | 14250–14255 | 6 |
| `pdashOpponentStrength` | function | 14256–14275 | 20 |
| `pdashInsight` | function | 14276–14278 | 3 |
| `pdashInsights` | function | 14279–14290 | 12 |
| `buildSeasonPlayerDashModel` | function | 14291–14327 | 37 |
| `buildAlltimePlayerDashModel` | function | 14328–14370 | 43 |
| `rPlayerDashStyles` | function | 14371–14382 | 12 |
| `rPdashLabel` | function | 14383–14385 | 3 |
| `rPdashStat` | function | 14386–14388 | 3 |
| `rPlayerDash` | function | 14389–14427 | 39 |
| `rSeasonPlayerDashboard` | function | 14428–14430 | 3 |
| `rAlltimePlayerDashboard` | function | 14431–14433 | 3 |
| `rGlobalPartnerOpponentPanel` | function | 14434–14447 | 14 |
| `rGlobalCareerHeader` | function | 14448–14468 | 21 |
| `rSeasonLandingPage` | function | 14470–14484 | 15 |
| `rGlobalOverview` | function | 14486–14537 | 52 |
| `rGlobalAllTimeStats` | function | 14539–14555 | 17 |
| `rGlobalDevelopment` | function | 14557–14595 | 39 |
| `getGlobalPlayerOpponentGameRows` | function | 14598–14625 | 28 |
| `getGlobalOpponentSpecialistProfile` | function | 14627–14655 | 29 |
| `rGlobalDuoNetwork` | function | 14657–14854 | 198 |
| `rGlobalOpponentSpecialist` | function | 14856–14901 | 46 |
| `playerExplainConfidence` | function | 14903–14908 | 6 |
| `playerExplainConfidenceLabel` | function | 14909–14911 | 3 |
| `playerExplainAdd` | function | 14912–14916 | 5 |
| `playerExplainStyleSignature` | function | 14917–14928 | 12 |
| `playerExplainRolePhrase` | function | 14929–14937 | 9 |
| `playerExplainHeadline` | function | 14938–14947 | 10 |
| `playerExplainContextSentence` | function | 14948–14966 | 19 |
| `buildFieldPlayerExplanation` | function | 14967–15041 | 75 |
| `buildGoaliePlayerExplanation` | function | 15042–15095 | 54 |
| `buildPlayerExplanation` | function | 15096–15104 | 9 |
| `buildPlayerIntelligence` | function | 15105–15134 | 30 |
| `rPlayerExplainItems` | function | 15135–15139 | 5 |
| `rPlayerExplanation` | function | 15140–15191 | 52 |
| `rAllTimePlayersPage` | function | 15193–15233 | 41 |
| `rHallOfFamePage` | function | 15235–15323 | 89 |
| `lexiconUniqueKeys` | function | 15328–15335 | 8 |
| `lexiconEntry` | function | 15336–15345 | 10 |
| `rLexiconRows` | function | 15346–15349 | 4 |
| `rLexiconPage` | function | 15350–15522 | 173 |
| `clampScore` | function | 15526–15529 | 4 |
| `getScoreLabel` | function | 15530–15538 | 9 |
| `buildConfidence` | function | 15539–15584 | 46 |
| `confidenceCautiousText` | function | 15585–15588 | 4 |
| `explainScore` | function | 15589–15603 | 15 |
| `p1NarrativeKey` | function | 15604–15606 | 3 |
| `scoreNarrative` | function | 15607–15625 | 19 |
| `rankNarratives` | function | 15626–15639 | 14 |
| `getEmptyState` | function | 15640–15651 | 12 |
| `rEmptyState` | function | 15652–15655 | 4 |
| `capSuperlativeLabel` | function | 15663–15665 | 3 |
| `rScoreBreakdown` | function | 15666–15682 | 17 |
| `matchcenterSigned` | function | 15684–15688 | 5 |
| `matchcenterDateLabel` | function | 15690–15694 | 5 |
| `dedupeGamesById` | function | 15706–15714 | 9 |
| `matchcenterIsFreiburgTuebingenTeamName` | function | 15715–15721 | 7 |
| `matchcenterSeasonHasGames` | function | 15725–15727 | 3 |
| `matchcenterDefaultSeasonKey` | function | 15728–15733 | 6 |
| `matchcenterOpponentMode` | function | 15745–15747 | 3 |
| `getMatchcenterOpponents` | function | 15748–15780 | 33 |
| `getMatchcenterDirectOpponents` | function | 15781–15811 | 31 |
| `matchcenterAnalyzeDirect` | function | 15814–15850 | 37 |
| `matchcenterAnalyzeForm` | function | 15851–15876 | 26 |
| `matchcenterGoalMinute` | function | 15885–15890 | 6 |
| `matchcenterEmptyBuckets` | function | 15899–15901 | 3 |
| `matchcenterUlmScoutingConfidence` | function | 15902–15906 | 5 |
| `matchcenterEnsureUlmPlayer` | function | 15907–15944 | 38 |
| `matchcenterRegisterUlmProfileGame` | function | 15945–15950 | 6 |
| `matchcenterUpdateUlmSeasonRow` | function | 15951–15957 | 7 |
| `matchcenterClassifyUlmGoalEvent` | function | 15958–15968 | 11 |
| `matchcenterAddUlmScoring` | function | 15969–16006 | 38 |
| `matchcenterFinalizeUlmPlayers` | function | 16007–16075 | 69 |
| `matchcenterBuildUlmPlayerScouting` | function | 16076–16130 | 55 |
| `matchcenterBuildUlmPlayerInsights` | function | 16131–16143 | 13 |
| `matchcenterDuoPairKey` | function | 16144–16147 | 4 |
| `matchcenterEnsureOpponentDuo` | function | 16148–16180 | 33 |
| `matchcenterDuoDirectionLabel` | function | 16181–16187 | 7 |
| `matchcenterAddDuoConnection` | function | 16188–16206 | 19 |
| `matchcenterFinalizeOpponentDuos` | function | 16207–16241 | 35 |
| `matchcenterBuildOpponentDuos` | function | 16242–16286 | 45 |
| `matchcenterBuildOpponentDuoInsights` | function | 16287–16300 | 14 |
| `matchcenterEnsureUlmDuo` | function | 16301–16338 | 38 |
| `matchcenterAddUlmDuoConnection` | function | 16339–16357 | 19 |
| `matchcenterFinalizeUlmDuos` | function | 16358–16393 | 36 |
| `matchcenterBuildUlmDuos` | function | 16394–16436 | 43 |
| `matchcenterBuildUlmDuoInsights` | function | 16437–16449 | 13 |
| `matchcenterDirectContextGames` | function | 16450–16452 | 3 |
| `matchcenterSpecialTeamsForGame` | function | 16453–16456 | 4 |
| `matchcenterPersonalPenaltyMinutesForSide` | function | 16457–16465 | 9 |
| `matchcenterPct` | function | 16466–16469 | 4 |
| `matchcenterBuildSpecialTeamsMatchup` | function | 16470–16517 | 48 |
| `matchcenterGoalieKey` | function | 16518–16522 | 5 |
| `matchcenterGoalieFitScore` | function | 16523–16539 | 17 |
| `matchcenterBuildGoalieMatchup` | function | 16540–16585 | 46 |
| `matchcenterGoalAbsSeconds` | function | 16586–16593 | 8 |
| `matchcenterTimeValue` | function | 16594–16601 | 8 |
| `matchcenterEmptyTimingStats` | function | 16602–16610 | 9 |
| `matchcenterWindowForSecond` | function | 16611–16617 | 7 |
| `matchcenterTimingStatsForGames` | function | 16618–16654 | 37 |
| `matchcenterBuildTimingInsights` | function | 16655–16665 | 11 |
| `matchcenterBuildTimingAnalysis` | function | 16666–16676 | 11 |
| `rMatchcenterTimeBars` | function | 16677–16690 | 14 |
| `rMatchcenterTimingStatsCard` | function | 16691–16710 | 20 |
| `rMatchcenterTiming` | function | 16711–16734 | 24 |
| `rMatchcenterTabs` | function | 16750–16752 | 3 |
| `rMatchcenterProfileSection` | function | 16753–16772 | 20 |
| `rMatchcenterFormSection` | function | 16773–16798 | 26 |
| `rMatchcenterDetailsSection` | function | 16799–16806 | 8 |
| `matchcenterResultClass` | function | 16807–16809 | 3 |
| `matchcenterUlmTeamLabelForGame` | function | 16811–16815 | 5 |
| `matchcenterGameLine` | function | 16816–16821 | 6 |
| `matchcenterFormLine` | function | 16822–16826 | 5 |
| `matchcenterBuildInsights` | function | 16827–16847 | 21 |
| `rMatchcenterKpi` | function | 16848–16854 | 7 |
| `rMatchcenterFormCard` | function | 16855–16875 | 21 |
| `rMatchcenterGamesList` | function | 16876–16887 | 12 |
| `rMatchcenterWatchCard` | function | 16888–16908 | 21 |
| `rMatchcenterPlayerRow` | function | 16909–16932 | 24 |
| `rMatchcenterRankCard` | function | 16933–16938 | 6 |
| `rMatchcenterUlmImpactCard` | function | 16939–16967 | 29 |
| `rMatchcenterUlmPlayerRow` | function | 16968–16991 | 24 |
| `rMatchcenterUlmRankCard` | function | 16992–16997 | 6 |
| `rMatchcenterUlmScouting` | function | 16998–17034 | 37 |
| `rMatchcenterOpponentScouting` | function | 17035–17070 | 36 |
| `rMatchcenterPlayersTab` | function | 17071–17073 | 3 |
| `rMatchcenterDuoWatchCard` | function | 17074–17093 | 20 |
| `rMatchcenterDuoRow` | function | 17094–17117 | 24 |
| `rMatchcenterDuoRankCard` | function | 17118–17123 | 6 |
| `rMatchcenterUlmDuoWatchCard` | function | 17124–17149 | 26 |
| `rMatchcenterUlmDuoRow` | function | 17150–17172 | 23 |
| `rMatchcenterUlmDuoRankCard` | function | 17173–17178 | 6 |
| `rMatchcenterUlmDuos` | function | 17179–17221 | 43 |
| `rMatchcenterOpponentDuos` | function | 17222–17264 | 43 |
| `rMatchcenterDuosTab` | function | 17265–17267 | 3 |
| `rMatchcenterSpecialCard` | function | 17268–17276 | 9 |
| `rMatchcenterSpecialTeams` | function | 17277–17326 | 50 |
| `rMatchcenterGoalieCard` | function | 17327–17350 | 24 |
| `rMatchcenterGoalieMatchup` | function | 17351–17379 | 29 |
| `matchcenterPlanScoreText` | function | 17380–17383 | 4 |
| `matchcenterPlanRateText` | function | 17384–17388 | 5 |
| `matchcenterPriorityLabel` | function | 17389–17391 | 3 |
| `matchcenterConfidenceClass` | function | 17392–17397 | 6 |
| `matchcenterInferPriority` | function | 17398–17404 | 7 |
| `matchcenterAddPlanItem` | function | 17405–17410 | 6 |
| `matchcenterAddPlanWatch` | function | 17411–17416 | 6 |
| `matchcenterBuildPlanConfidence` | function | 17417–17464 | 48 |
| `matchcenterIntelCurve` | function | 17465–17470 | 6 |
| `matchcenterIntelInverseCurve` | function | 17471–17474 | 4 |
| `matchcenterIntelWeighted` | function | 17475–17485 | 11 |
| `matchcenterIntelRate` | function | 17486–17489 | 4 |
| `matchcenterIntelPct` | function | 17490–17493 | 4 |
| `matchcenterIntelPriorityFromScore` | function | 17494–17499 | 6 |
| `matchcenterIntelPriorityClass` | function | 17500–17505 | 6 |
| `matchcenterIntelPriorityLabel` | function | 17506–17509 | 4 |
| `matchcenterIntelDataLabel` | function | 17510–17512 | 3 |
| `matchcenterBuildIntelligenceDataQuality` | function | 17513–17582 | 70 |
| `matchcenterBuildOpponentDNA` | function | 17583–17695 | 113 |
| `matchcenterDeriveOpponentType` | function | 17696–17713 | 18 |
| `matchcenterIntelPlayerRef` | function | 17714–17726 | 13 |
| `matchcenterIntelDuoRef` | function | 17727–17740 | 14 |
| `matchcenterIntelAddAlarm` | function | 17741–17761 | 21 |
| `matchcenterBuildOpponentAlarm` | function | 17762–17871 | 110 |
| `matchcenterBuildIntelListFromPlan` | function | 17872–17880 | 9 |
| `matchcenterBuildCoachHints` | function | 17881–17896 | 16 |
| `matchcenterBuildIntelHeadline` | function | 17897–17904 | 8 |
| `matchcenterBuildOneThingToWatch` | function | 17905–17917 | 13 |
| `matchcenterBuildIntelligenceSignals` | function | 17918–17964 | 47 |
| `buildMatchIntelligenceFromContext` | function | 17965–18019 | 55 |
| `buildMatchIntelligence` | function | 18020–18041 | 22 |
| `matchcenterCoachCautious` | function | 18042–18044 | 3 |
| `matchcenterCoachAdd` | function | 18045–18053 | 9 |
| `matchcenterCoachGameModel` | function | 18054–18067 | 14 |
| `buildMatchStories` | function | 18068–18097 | 30 |
| `matchcenterCoachPriorityFromAlarm` | function | 18098–18107 | 10 |
| `matchcenterBuildCoachPriorities` | function | 18108–18114 | 7 |
| `matchcenterBuildCoachLevers` | function | 18115–18124 | 10 |
| `matchcenterBuildCoachDangerPatterns` | function | 18125–18132 | 8 |
| `matchcenterBuildCoachIfThen` | function | 18133–18142 | 10 |
| `matchcenterBuildCoachAvoidList` | function | 18143–18152 | 10 |
| `matchcenterBuildCoachActivationHints` | function | 18153–18159 | 7 |
| `matchcenterBuildCoachKeyActors` | function | 18160–18167 | 8 |
| `buildDigitalCoachReport` | function | 18168–18200 | 33 |
| `buildLockerRoomSheet` | function | 18201–18221 | 21 |
| `matchcenterSocialAdd` | function | 18222–18228 | 7 |
| `matchcenterSocialCaption` | function | 18229–18234 | 6 |
| `socialSentence` | function | 18235–18237 | 3 |
| `socialEnsurePeriod` | function | 18238–18241 | 4 |
| `socialFirstUseful` | function | 18242–18244 | 3 |
| `socialPlayerFocusLine` | function | 18245–18251 | 7 |
| `socialDuoFocusLine` | function | 18252–18257 | 6 |
| `socialOpponentLine` | function | 18258–18261 | 4 |
| `socialKeyFactLine` | function | 18262–18271 | 10 |
| `buildMatchdayCaptionBlocks` | function | 18272–18301 | 30 |
| `buildSocialMediaContent` | function | 18302–18350 | 49 |
| `isSyntheticLineupPlayerId` | function | 18356–18358 | 3 |
| `getSyntheticLineupPlayers` | function | 18359–18361 | 3 |
| `getSyntheticLineupRow` | function | 18362–18378 | 17 |
| `getSyntheticLineupRows` | function | 18379–18381 | 3 |
| `getLineupAllRows` | function | 18382–18384 | 3 |
| `lineupRowMeta` | function | 18385–18392 | 8 |
| `getLineupPlayerPool` | function | 18393–18401 | 9 |
| `lineupScore` | function | 18402–18407 | 6 |
| `lineupAverage` | function | 18408–18411 | 4 |
| `lineupLevelLabel` | function | 18412–18415 | 4 |
| `lineupRosterGamesForPlayer` | function | 18418–18465 | 48 |
| `buildLineupExperienceProfile` | function | 18466–18508 | 43 |
| `lineupOpponentDNAForContext` | function | 18509–18520 | 12 |
| `buildLineupOpponentDNAFit` | function | 18521–18564 | 44 |
| `classifyLineIdentity` | function | 18565–18612 | 48 |
| `lineupPlayerProfile` | function | 18613–18688 | 76 |
| `buildLineupAnalysis` | function | 18689–18822 | 134 |
| `buildLineupScoreBreakdowns` | function | 18823–18852 | 30 |
| `buildLineupIntelligence` | function | 18853–18863 | 11 |
| `buildLineAnalysis` | function | 18864–18866 | 3 |
| `lineupRowMap` | function | 18867–18869 | 3 |
| `lineupRankCandidateIds` | function | 18870–18884 | 15 |
| `lineupCombinationIds` | function | 18885–18898 | 14 |
| `lineupStdDev` | function | 18899–18904 | 6 |
| `lineupRoleDnaComplementScore` | function | 18905–18928 | 24 |
| `lineupDirectChemistryScore` | function | 18929–18935 | 7 |
| `lineupEvaluateComplementCandidate` | function | 18936–19014 | 79 |
| `lineupPlayerAnchorScore` | function | 19015–19032 | 18 |
| `lineupPlayerAnchorConfidence` | function | 19035–19039 | 5 |
| `buildTeamLineBalance` | function | 19040–19083 | 44 |
| `buildBalancedLineupSet` | function | 19084–19110 | 27 |
| `lineupRecommendationReason` | function | 19111–19119 | 9 |
| `buildLineupRecommendations` | function | 19120–19201 | 82 |
| `recommendLineComplements` | function | 19202–19229 | 28 |
| `matchcenterBuildMatchPlan` | function | 19230–19375 | 146 |
| `rMatchcenterPlanItems` | function | 19376–19393 | 18 |
| `rMatchcenterPlanWatch` | function | 19394–19409 | 16 |
| `rMatchcenterOpponentDNA` | function | 19410–19442 | 33 |
| `rMatchcenterOpponentAlarm` | function | 19443–19464 | 22 |
| `rMatchcenterIntelOverview` | function | 19465–19510 | 46 |
| `rMatchcenterIntelCoachHints` | function | 19511–19524 | 14 |
| `rMatchcenterCoachCardList` | function | 19525–19538 | 14 |
| `rMatchcenterCoachIfThen` | function | 19539–19546 | 8 |
| `rMatchcenterCoachSimpleList` | function | 19547–19551 | 5 |
| `rMatchcenterDigitalCoach` | function | 19552–19616 | 65 |
| `rMatchcenterCopyButton` | function | 19617–19621 | 5 |
| `rMatchcenterLockerList` | function | 19622–19633 | 12 |
| `rMatchcenterLockerRoomSheet` | function | 19634–19689 | 56 |
| `rMatchcenterSocialBlock` | function | 19690–19697 | 8 |
| `matchcenterStoryDownloadFileName` | function | 19698–19707 | 10 |
| `downloadMatchdayStory` | window | 19708–19755 | 48 |
| `rSocialVideoBlock` | function | 19759–19790 | 32 |
| `socialVideoJobsForMatchday` | function | 19793–19799 | 7 |
| `generateSocialVideoVideos` | window | 19800–19841 | 42 |
| `cancelSocialVideoRecording` | window | 19842–19844 | 3 |
| `generateSocialVideoStandbilder` | window | 19845–19868 | 24 |
| `generateSocialVideoContactSheets` | window | 19869–19891 | 23 |
| `rMatchcenterSocialMediaCenter` | function | 19892–19945 | 54 |
| `rLineupScoreRows` | function | 19946–19967 | 22 |
| `rLineupSimpleCards` | function | 19968–19976 | 9 |
| `rMatchcenterLineupBuilder` | function | 19977–20049 | 73 |
| `rLineupMetricPills` | function | 20050–20063 | 14 |
| `rLineupBuilderAvailablePanel` | function | 20064–20111 | 48 |
| `rLineupRecommendationCards` | function | 20112–20126 | 15 |
| `rLineupRecommendationMode` | function | 20127–20160 | 34 |
| `rLineupComplementCards` | function | 20161–20173 | 13 |
| `rLineupTestLine` | function | 20174–20222 | 49 |
| `rLineupTestMode` | function | 20223–20239 | 17 |
| `rLineupBuilderPage` | function | 20240–20274 | 35 |
| `rMatchcenterScoutingSummary` | function | 20275–20318 | 44 |
| `rMatchcenterMatchPlan` | function | 20319–20339 | 21 |
| `matchcenterStoryLogoBase` | function | 20342–20347 | 6 |
| `matchcenterStorySafeLogoUrl` | function | 20348–20354 | 7 |
| `getTeamLogoUrlForStory` | function | 20363–20392 | 30 |
| `matchcenterStoryLogoForOpponent` | function | 20393–20407 | 15 |
| `matchcenterStoryTableRank` | function | 20408–20418 | 11 |
| `matchcenterStoryUlmTableRank` | function | 20419–20425 | 7 |
| `matchcenterStoryRankText` | function | 20426–20429 | 4 |
| `matchcenterStoryInlineStat` | function | 20430–20432 | 3 |
| `matchcenterStoryRankRows` | function | 20434–20445 | 12 |
| `matchcenterStoryAddFact` | function | 20448–20454 | 7 |
| `matchcenterStoryFactKey` | function | 20455–20457 | 3 |
| `matchcenterStoryLooksArtificial` | function | 20458–20460 | 3 |
| `matchcenterStoryEstimateFactWeight` | function | 20461–20466 | 6 |
| `matchcenterStoryAddCandidate` | function | 20467–20489 | 23 |
| `matchcenterStoryCategoryLimit` | function | 20490–20493 | 4 |
| `matchcenterStoryNormalizePickOptions` | function | 20494–20504 | 11 |
| `matchcenterStoryCandidateForBudget` | function | 20505–20514 | 10 |
| `matchcenterStoryPickFactItems` | function | 20515–20567 | 53 |
| `matchcenterStoryPickFacts` | function | 20568–20570 | 3 |
| `matchcenterStoryCurrentStreak` | function | 20572–20580 | 9 |
| `matchcenterStoryWinlessStreak` | function | 20581–20589 | 9 |
| `matchcenterStoryFormFact` | function | 20590–20600 | 11 |
| `matchcenterStoryFormFactCandidates` | function | 20601–20620 | 20 |
| `matchcenterStoryLateGoalsForOutcome` | function | 20621–20624 | 4 |
| `matchcenterStoryClutchFact` | function | 20625–20639 | 15 |
| `matchcenterStoryPlayerClutchTotal` | function | 20640–20647 | 8 |
| `matchcenterStoryBestClutchPlayer` | function | 20648–20657 | 10 |
| `matchcenterStoryPlayerClutchFact` | function | 20658–20683 | 26 |
| `matchcenterStoryDuoClutchTotal` | function | 20684–20691 | 8 |
| `matchcenterStoryBestClutchDuo` | function | 20692–20701 | 10 |
| `matchcenterStoryDuoClutchFact` | function | 20702–20704 | 3 |
| `matchcenterStoryDuoFact` | function | 20705–20725 | 21 |
| `matchcenterStoryClutchPriority` | function | 20726–20728 | 3 |
| `matchcenterStoryCompetitionLabel` | function | 20729–20732 | 4 |
| `matchcenterStoryShortDuel` | function | 20733–20737 | 5 |
| `matchcenterStoryLastDuelLabel` | function | 20738–20741 | 4 |
| `matchcenterStoryDirectFactCandidates` | function | 20742–20763 | 22 |
| `matchcenterStoryPlanFactCandidates` | function | 20764–20776 | 13 |
| `matchcenterStoryCategoryForPlanFact` | function | 20777–20785 | 9 |
| `buildMatchcenterStoryPreviewData` | function | 20786–20897 | 112 |
| `matchcenterStoryNameClass` | function | 20898–20903 | 6 |
| `matchcenterStoryVisibleFacts` | function | 20904–20934 | 31 |
| `rMatchcenterStoryLogo` | function | 20935–20939 | 5 |
| `rMatchcenterStoryForm` | function | 20940–20944 | 5 |
| `rMatchcenterStoryPlayerCard` | function | 20945–20952 | 8 |
| `rMatchcenterStoryPreview` | function | 20953–21022 | 70 |
| `rMatchcenterStoryFrame` | function | 21023–21028 | 6 |
| `fitMatchcenterStoryLayout` | function | 21029–21071 | 43 |
| `ensureSocialVideoExportCapabilityChecked` | function | 21080–21084 | 5 |
| `downloadSocialVideoStandbild` | window | 21099–21118 | 20 |
| `downloadSocialVideoContactSheet` | window | 21123–21148 | 26 |
| `rMatchcenterPage` | function | 21150–21298 | 149 |
| `rTeamPage` | function | 21299–21636 | 338 |
| `exportExcel` | function | 21641–21666 | 26 |
| `render` | function | 21672–21689 | 18 |
| `_render` | function | 21690–21859 | 170 |
| `uiFormatNumber` | function | 21893–21897 | 5 |
| `uiReliabilityDots` | function | 21906–21913 | 8 |
| `uiDeltaIndicator` | function | 21921–21927 | 7 |
| `uiInfoIcon` | function | 21939–21943 | 5 |
| `uiKennzahlKachel` | function | 21951–21962 | 12 |
| `uiKernaussage` | function | 21971–21977 | 7 |
| `uiHinweisKarte` | function | 21985–21997 | 13 |
| `uiRangliste` | function | 22007–22024 | 18 |
| `uiVerlauf` | function | 22035–22054 | 20 |
| `uiIntervallBalken` | function | 22061–22073 | 13 |
| `uiMethodenbox` | function | 22080–22089 | 10 |
| `uiNotiz` | function | 22097–22101 | 5 |
| `datenstandQuoteState` | function | 22123–22130 | 8 |
| `uiQuoteText` | function | 22133–22139 | 7 |
| `uiDatenstandBand` | function | 22156–22169 | 14 |
| `uiPlatzhalter` | function | 22177–22182 | 6 |
| `uiObjektseiteSortTabs` | function | 22227–22235 | 9 |
| `uiObjektseite` | function | 22245–22278 | 34 |
| `mainNavActiveKeyForPage` | function | 22335–22340 | 6 |
| `goToMainNavPoint` | window | 22341–22347 | 7 |
| `rMainNav` | function | 22348–22352 | 5 |
| `rMainNavBottom` | function | 22370–22377 | 8 |
| `openOverview` | window | 22387–22395 | 9 |
| `switchOverviewSeason` | window | 22404–22410 | 7 |
| `openMatchdayTimeline` | window | 22438–22445 | 8 |
| `openMatchday` | window | 22446–22455 | 10 |
| `switchMatchdaySeason` | window | 22457–22462 | 6 |
| `matchdayUlmGames` | function | 22464–22466 | 3 |
| `matchdayLineupInfo` | function | 22473–22483 | 11 |
| `matchdayLineupCardHtml` | function | 22485–22491 | 7 |
| `matchdayGameCardHtml` | function | 22492–22511 | 20 |
| `matchdayFixtureCardHtml` | function | 22517–22525 | 9 |
| `rMatchdayTimelineRow` | function | 22527–22534 | 8 |
| `rMatchdayTimelinePage` | function | 22535–22545 | 11 |
| `rMatchdayDetailPage` | function | 22546–22585 | 40 |
| `rMatchdayPage` | function | 22586–22592 | 7 |
| `overviewMatchdayStartMs` | function | 22611–22616 | 6 |
| `overviewMatchdayEndMs` | function | 22617–22622 | 6 |
| `detectOverviewPhase` | function | 22623–22648 | 26 |
| `getSeasonDataState` | function | 22655–22665 | 11 |
| `parseSeasonDataState` | function | 22666–22674 | 9 |
| `isNewSeasonDataState` | function | 22676–22678 | 3 |
| `recordOverviewVisit` | function | 22685–22694 | 10 |
| `overviewOpponentLabel` | function | 22700–22711 | 12 |
| `overviewLastMatchdayText` | function | 22712–22715 | 4 |
| `overviewNextMatchdayHtml` | function | 22722–22738 | 17 |
| `overviewCompactTableHtml` | function | 22746–22762 | 17 |
| `overviewFormHtml` | function | 22764–22778 | 15 |
| `overviewSeasonBilanzHtml` | function | 22779–22785 | 7 |
| `overviewSeasonAwardHtml` | function | 22787–22796 | 10 |
| `overviewRecordHtml` | function | 22798–22803 | 6 |
| `overviewCrossSeasonTrendHtml` | function | 22805–22813 | 9 |
| `overviewOpponentPreviewHtml` | function | 22814–22818 | 5 |
| `overviewMatchcenterLinkHtml` | function | 22819–22821 | 3 |
| `overviewLineupLinkHtml` | function | 22822–22824 | 3 |
| `overviewRankChangeTile` | function | 22841–22858 | 18 |
| `buildOverviewCards` | function | 22867–22907 | 41 |
| `rOverviewPage` | function | 22917–22928 | 12 |
| `openLigaGegner` | window | 22929–22932 | 4 |
| `rLigaGegnerPlaceholderPage` | function | 22933–22938 | 6 |
| `rAsOfSelector` | function | 22950–22962 | 13 |
| `setContextAsOf` | window | 22963–22974 | 12 |
| `rSeasonDataPreviewContextHint` | function | 22985–22993 | 9 |
| `rSeasonDataStateContextHint` | function | 23002–23008 | 7 |
| `rContextBar` | function | 23033–23051 | 19 |
| `rIaShell` | function | 23053–23055 | 3 |
| `globalSearchTokens` | function | 23072–23075 | 4 |
| `globalSearchEntries` | function | 23077–23090 | 14 |
| `globalSearchPlayerScore` | function | 23091–23098 | 8 |
| `globalSearchMatchdayScore` | function | 23100–23112 | 13 |
| `globalSearchMatch` | function | 23114–23125 | 12 |
| `globalSearchIsEditableTarget` | function | 23126–23130 | 5 |
| `globalSearchKeyAction` | function | 23132–23146 | 15 |
| `rGlobalSearchToggle` | function | 23147–23149 | 3 |
| `rGlobalSearchResultsHtml` | function | 23150–23160 | 11 |
| `rGlobalSearchPanelHtml` | function | 23161–23163 | 3 |
| `paintGlobalSearchResults` | function | 23164–23171 | 8 |
| `openGlobalSearch` | window | 23172–23196 | 25 |
| `closeGlobalSearch` | window | 23197–23204 | 8 |
| `onGlobalSearchInput` | window | 23205–23210 | 6 |
| `moveGlobalSearch` | function | 23211–23216 | 6 |
| `activateGlobalSearchResult` | window | 23217–23226 | 10 |
| `globalSearchOnKeydown` | function | 23227–23248 | 22 |
| `initGlobalSearch` | function | 23249–23253 | 5 |
| `rToolMenu` | function | 23275–23278 | 4 |
| `toolMenuElements` | function | 23279–23281 | 3 |
| `toolMenuItemElements` | function | 23282–23284 | 3 |
| `isToolMenuOpen` | function | 23285–23288 | 4 |
| `openToolMenu` | window | 23289–23296 | 8 |
| `closeToolMenu` | window | 23297–23303 | 7 |
| `toggleToolMenu` | window | 23304–23307 | 4 |
| `activateToolMenuItem` | window | 23308–23315 | 8 |
| `toolMenuOnKeydown` | function | 23316–23339 | 24 |
| `toolMenuOnClick` | function | 23340–23346 | 7 |
| `initToolMenu` | function | 23347–23350 | 4 |

## Alphabetisches Register

| Name | Art | Zeile |
|---|---|---|
| `_render` | function | 21690 |
| `acceptEinsatzCenterRosterSuggestion` | window | 7611 |
| `activateGlobalSearchResult` | window | 23217 |
| `activateToolMenuItem` | window | 23308 |
| `addComparisonDuo` | window | 13261 |
| `addComparisonDuoFromSelection` | window | 13253 |
| `addComparisonItem` | window | 13161 |
| `addDuoTeamGame` | function | 11146 |
| `addEinsatzCenterExistingGroup` | window | 7628 |
| `addEinsatzCenterGroupPlayer` | window | 7696 |
| `addEinsatzCenterNewGroup` | window | 7637 |
| `addEinsatzCenterRosterPlayer` | window | 7577 |
| `addGoalieGameToStats` | function | 4494 |
| `addGoalieSpecialTeamsGameToStats` | function | 4464 |
| `addLineupBuilderPlayerToActiveLine` | window | 2349 |
| `addLineupBuilderPlayerToLine` | window | 2339 |
| `addLineupPlayer` | window | 2285 |
| `addRosterImpactGameToStats` | function | 11681 |
| `addSelectedComparisonItem` | window | 13169 |
| `addSyntheticLineupPlayer` | window | 2365 |
| `addUnique` | function | 3681 |
| `aggregateAllTimeDuos` | function | 4837 |
| `aggregateAllTimePlayers` | function | 3948 |
| `aggregateAlltimeSpecialTeams` | function | 4444 |
| `aggregateGoalieAlltimeStats` | function | 4677 |
| `aggregateSeasonStats` | function | 4849 |
| `analysisCacheContext` | function | 2191 |
| `analysisCacheKey` | function | 2225 |
| `annotateSpecialTeamsGoalEvent` | function | 4226 |
| `antiSynergyDeltaClass` | function | 11916 |
| `antiSynergyImpactScore` | function | 11822 |
| `antiSynergyPartnerIsSgOnly` | function | 11968 |
| `antiSynergySigned` | function | 11920 |
| `appendSeasonGameDiagnostics` | function | 2561 |
| `applyAppHash` | function | 3487 |
| `applyCurrentSeasonCoverHighlight` | function | 6081 |
| `applyGlobalPageFromHash` | function | 3454 |
| `applySeasonContext` | function | 2426 |
| `applySeasonScoringToRegistry` | function | 3839 |
| `asOfCacheKeyPart` | function | 2219 |
| `asOfEquals` | function | 3158 |
| `assignStatus` | function | 5687 |
| `avgOrNull` | function | 3986 |
| `backToComparisonModeSelect` | window | 13189 |
| `backToHome` | window | 2402 |
| `buildAlltimePlayerDashModel` | function | 14328 |
| `buildAnnotatedGoalEventsForGame` | function | 10752 |
| `buildAppHash` | function | 3304 |
| `buildBalancedLineupSet` | function | 19084 |
| `buildBestThirdManOptions` | function | 10637 |
| `buildComparisonDataset` | function | 13630 |
| `buildComparisonExtraMetrics` | function | 13485 |
| `buildComparisonSummary` | function | 13994 |
| `buildConfidence` | function | 15539 |
| `buildDigitalCoachReport` | function | 18168 |
| `buildDirectDuoLookupForPlayer` | function | 10595 |
| `buildDryRunReport` | function | 6305 |
| `buildDuoAntiSynergy` | function | 11906 |
| `buildDuoComparison` | function | 13274 |
| `buildDuoCompatibility` | function | 11269 |
| `buildDuoDirectProduction` | function | 11122 |
| `buildDuoFloorCeiling` | function | 11033 |
| `buildDuoGapAnalysis` | function | 11241 |
| `buildDuoNetworkContext` | function | 11217 |
| `buildDuoOpponentAdjusted` | function | 11204 |
| `buildDuoProAnalysis` | function | 11328 |
| `buildDuoReplacementOptions` | function | 11316 |
| `buildDuoUntestedPotential` | function | 11292 |
| `buildDuoUsageRate` | function | 11304 |
| `buildDuoWarnings` | function | 11075 |
| `buildDuoWithWithoutImpact` | function | 11170 |
| `buildEinsatzCenterDraftExport` | function | 7757 |
| `buildFieldPlayerExplanation` | function | 14967 |
| `buildGlobalPageHash` | function | 3321 |
| `buildGoalieAnalysisModel` | function | 9560 |
| `buildGoalieComparisonDataset` | function | 13579 |
| `buildGoalieGameRecord` | function | 4546 |
| `buildGoaliePlayerExplanation` | function | 15042 |
| `buildGoalieRoleProfile` | function | 9783 |
| `buildGoalieStatsForSeason` | function | 4596 |
| `buildHallOfFameIntroTitle` | function | 8467 |
| `buildHashStringFromParsed` | function | 3336 |
| `buildIdentityProfiles` | function | 5409 |
| `buildLineAnalysis` | function | 18864 |
| `buildLineupAnalysis` | function | 18689 |
| `buildLineupExperienceProfile` | function | 18466 |
| `buildLineupIntelligence` | function | 18853 |
| `buildLineupOpponentDNAFit` | function | 18521 |
| `buildLineupRecommendations` | function | 19120 |
| `buildLineupScoreBreakdowns` | function | 18823 |
| `buildLockerRoomSheet` | function | 18201 |
| `buildMatchcenterStoryPreviewData` | function | 20786 |
| `buildMatchdayCaptionBlocks` | function | 18272 |
| `buildMatchIntelligence` | function | 18020 |
| `buildMatchIntelligenceFromContext` | function | 17965 |
| `buildMatchStories` | function | 18068 |
| `buildMomentumSwingStats` | function | 11027 |
| `buildMomentumSwingStatsRaw` | function | 10956 |
| `buildOpponentIntelligence` | function | 10434 |
| `buildOverviewCards` | function | 22867 |
| `buildPlayerDataFoundation` | function | 4866 |
| `buildPlayerEvents` | function | 4920 |
| `buildPlayerExplanation` | function | 15096 |
| `buildPlayerIdentity` | function | 3692 |
| `buildPlayerIntelligence` | function | 15105 |
| `buildRecencyWeightedGlobalIdentityProfile` | function | 12487 |
| `buildRegistry` | function | 4889 |
| `buildResponseGoalStats` | function | 10944 |
| `buildResponseGoalStatsRaw` | function | 10895 |
| `buildRosterImpactAnalysis` | function | 11837 |
| `buildRosterImpactGameIndex` | function | 11724 |
| `buildSeasonDataPreviewChanges` | function | 6410 |
| `buildSeasonDuos` | function | 4793 |
| `buildSeasonPlayerDashModel` | function | 14291 |
| `buildSocialMediaContent` | function | 18302 |
| `buildSoloDuoProfile` | function | 5178 |
| `buildSpecialTeamsForGame` | function | 4241 |
| `buildSpecialTeamsForSeason` | function | 4435 |
| `buildStaticSeasonDataBlock` | function | 6129 |
| `buildTeamLineBalance` | function | 19040 |
| `cachedAnalysis` | function | 2229 |
| `cancelDuoProPicker` | window | 11531 |
| `cancelEinsatzCenterEdit` | window | 7558 |
| `cancelHallOfFameIntro` | function | 8556 |
| `cancelSocialVideoRecording` | window | 19842 |
| `capSuperlativeLabel` | function | 15663 |
| `clampScore` | function | 15526 |
| `classicTagLabel` | function | 8710 |
| `classifyLineIdentity` | function | 18565 |
| `cleanupHallOfFameIntro` | function | 8496 |
| `clearAnalysisCache` | function | 2188 |
| `clearComparison` | window | 13180 |
| `clearComparisonDuos` | window | 13268 |
| `clearLineupAvailable` | window | 2338 |
| `clearLineupBuilderLine` | window | 2357 |
| `clearLineupPlayers` | window | 2292 |
| `clearlyAboveAverage` | function | 5366 |
| `clonePlain` | function | 4083 |
| `closeGlobalSearch` | window | 23197 |
| `closeMatchcenterStoryPreview` | window | 2257 |
| `closeToolMenu` | window | 23297 |
| `clutchText` | function | 5250 |
| `collectAssistEventRefs` | function | 2881 |
| `comparisonDuoContext` | function | 13194 |
| `comparisonEventGameKey` | function | 13472 |
| `comparisonEventPhaseLabel` | function | 13475 |
| `comparisonFmt` | function | 12962 |
| `comparisonItemKey` | function | 12940 |
| `comparisonJsArg` | function | 12951 |
| `comparisonNum` | function | 12954 |
| `comparisonOpponentStrengthTier` | function | 13479 |
| `comparisonPct` | function | 12958 |
| `comparisonPctFmt` | function | 12966 |
| `comparisonVariantValue` | function | 13083 |
| `composeIdentityText` | function | 5641 |
| `computeCurrentAppHash` | function | 3356 |
| `computeEinsatzCenterStats` | function | 6771 |
| `computeMetrics` | function | 5024 |
| `computeRosterStatus` | function | 5667 |
| `confidenceCautiousText` | function | 15585 |
| `confidenceFromSampleSize` | function | 11814 |
| `confirmDuoProSelection` | window | 11536 |
| `confirmEinsatzCenterCombo` | window | 7729 |
| `copyMatchcenterText` | window | 2259 |
| `countBy` | function | 10181 |
| `countCaptainAppearances` | function | 5649 |
| `countGoalieAppearances` | function | 5663 |
| `countMomentumClusters` | function | 5283 |
| `countPlayedUlmGames` | function | 2801 |
| `createPlayerAnalysisProfile` | function | 3618 |
| `createSeasonBucket` | function | 1813 |
| `datenstandQuoteState` | function | 22123 |
| `decodeHashSegmentSafe` | function | 3229 |
| `dedupeGamesById` | function | 15706 |
| `dedupeIdentityProfileTags` | function | 12564 |
| `deriveAsOfForSeason` | function | 3034 |
| `deriveLineupUlmPlayerIds` | function | 7268 |
| `deriveLineupValidPlayerIds` | function | 7244 |
| `derivePlayerStatus` | function | 3721 |
| `detectOverviewPhase` | function | 22623 |
| `detectSide` | const-arrow | 2517 |
| `detectTypes` | function | 5158 |
| `detectUlmSide` | function | 2510 |
| `diagnoseGameDuplicates` | function | 2539 |
| `diagnosticError` | function | 5902 |
| `diffGameIds` | function | 6252 |
| `difficultConnectionConfidence` | function | 10571 |
| `discardEinsatzCenterAutosave` | function | 7167 |
| `discardSeasonDataPreview` | function | 6509 |
| `dismissEinsatzCenterRosterSuggestion` | window | 7600 |
| `downloadMatchdayStory` | window | 19708 |
| `downloadSocialVideoContactSheet` | window | 21123 |
| `downloadSocialVideoStandbild` | window | 21099 |
| `duoProContextSeasonKey` | function | 11097 |
| `duoProDomId` | function | 11492 |
| `duoProPairKey` | function | 11094 |
| `duoProPickerMessage` | function | 11498 |
| `duoProPickerOpen` | function | 11495 |
| `duoProPlayer` | function | 11111 |
| `duoProResolveCandidate` | function | 11511 |
| `duoProSelectionPayload` | function | 11520 |
| `duoScopeSeasonKeys` | function | 10613 |
| `einsatzCenterAutosaveDraft` | function | 7083 |
| `einsatzCenterAutosaveInfoText` | function | 7189 |
| `einsatzCenterAutosaveKey` | function | 6994 |
| `einsatzCenterCanonicalJson` | function | 7327 |
| `einsatzCenterComputeBaseHash` | function | 7342 |
| `einsatzCenterCurrentRawBaseHash` | function | 7069 |
| `einsatzCenterDeserializeAutosave` | function | 7029 |
| `einsatzCenterDraftInView` | function | 6898 |
| `einsatzCenterDraftIsEmpty` | function | 7006 |
| `einsatzCenterDraftStaleHint` | function | 6912 |
| `einsatzCenterInspectAutosave` | function | 7118 |
| `einsatzCenterIsPlainObject` | function | 7023 |
| `einsatzCenterSerializeDraft` | function | 7010 |
| `einsatzCenterSha256Hex` | function | 7337 |
| `einsatzCenterSoftIssues` | function | 7351 |
| `einsatzCenterStorageRead` | function | 6995 |
| `einsatzCenterStorageRemove` | function | 7001 |
| `einsatzCenterStorageWrite` | function | 6998 |
| `emptyDuoTeamImpactStats` | function | 11143 |
| `emptyFieldRoleSeasonStats` | function | 3677 |
| `emptyGoalieAlltimeStats` | function | 3650 |
| `emptyGoalieSeasonStats` | function | 3628 |
| `emptyGoalieSpecialTeamsStats` | function | 3665 |
| `emptyPlayerSeasonStats` | function | 3622 |
| `emptyRosterImpactStats` | function | 11670 |
| `emptySpecialTeamsStats` | function | 4042 |
| `ensureAppLoaded` | function | 8410 |
| `ensureEinsatzCenterDraft` | function | 6934 |
| `ensureExternalSeasonData` | function | 6107 |
| `ensureFieldRoleSeasonStats` | function | 3787 |
| `ensureGlobalDataLoaded` | function | 8338 |
| `ensureGoalieSeasonStats` | function | 3782 |
| `ensureHallOfFameIntroOverlay` | function | 8434 |
| `ensureLineupDataLoaded` | function | 6617 |
| `ensureLineupGroupsRegistryLoaded` | function | 6642 |
| `ensureRmDuo` | function | 10875 |
| `ensureRmPlayer` | function | 10869 |
| `ensureSocialVideoExportCapabilityChecked` | function | 21080 |
| `escAttr` | function | 8683 |
| `escHtml` | function | 12583 |
| `eventMatchesTeams` | function | 5244 |
| `explainScore` | function | 15589 |
| `exportEinsatzCenterDraft` | window | 7771 |
| `exportExcel` | function | 21641 |
| `fallbackIdentityProfile` | function | 8718 |
| `fetchJson` | function | 5946 |
| `fetchJsonLegacy` | function | 5878 |
| `fetchJsonWithDiagnostics` | function | 5937 |
| `fetchSeasonGameRaw` | function | 5972 |
| `fetchTextWithDiagnostics` | function | 5907 |
| `fileNameForLineupSeasonKey` | function | 6599 |
| `filterComparisonDuoSuggestions` | window | 13226 |
| `filterComparisonPlayers` | window | 13137 |
| `filterLineupBuilderAvailable` | window | 2386 |
| `filterLineupPlayers` | window | 2293 |
| `filterPlayerSuggestions` | function | 13201 |
| `filterPureSGPlayers` | function | 9356 |
| `finalizeDuoTeamImpactStats` | function | 11162 |
| `finalizeGoalieSeasonStats` | function | 4479 |
| `finalizeMomentumStats` | function | 10950 |
| `finalizePlayerRegistrySeason` | function | 3862 |
| `finalizeResponseStats` | function | 10881 |
| `finalizeRosterImpactStats` | function | 11673 |
| `finalizeSpecialTeamsStats` | function | 4086 |
| `findDuplicateGameIds` | function | 6171 |
| `findLineupGameContext` | function | 6676 |
| `findLoadedSeasonPlayer` | function | 9319 |
| `finishHallOfFameIntro` | function | 8523 |
| `finiteNumbers` | function | 3983 |
| `fitMatchcenterStoryLayout` | function | 21029 |
| `fixMojibakeText` | function | 2463 |
| `formatDiagnosticAttempt` | function | 5953 |
| `formatGameLoadError` | function | 5966 |
| `formatStatus` | function | 5950 |
| `gameClassificationStatusLabel` | function | 2553 |
| `gameDaySortValue` | function | 4152 |
| `gameResult` | function | 3587 |
| `generatePlayerInsights` | function | 9181 |
| `generateSocialVideoContactSheets` | window | 19869 |
| `generateSocialVideoStandbilder` | window | 19845 |
| `generateSocialVideoVideos` | window | 19800 |
| `getActiveAlltimeSeasonKeys` | function | 10353 |
| `getActiveSeasonKey` | function | 2414 |
| `getAllLoadedSeasonGames` | function | 10546 |
| `getAlltimeAggregatedStyleProfile` | function | 14171 |
| `getAllTimeCoverStats` | function | 8289 |
| `getAllTimeDuoRows` | function | 10501 |
| `getAllTimeDuoRowsForPlayer` | function | 10239 |
| `getAllTimeGamesPlayedRows` | function | 10279 |
| `getAllTimeIdentityStandings` | function | 12451 |
| `getAllTimeMainPlayerRows` | function | 9360 |
| `getAllTimeOpponentIntelligence` | function | 12372 |
| `getAllTimeOpponentNames` | function | 2492 |
| `getAllTimeOpponentTopScorers` | function | 12380 |
| `getAllTimePenaltyRows` | function | 10304 |
| `getAllTimePlayerRows` | function | 9328 |
| `getAlltimeRank` | function | 12896 |
| `getAlltimeRecencyWeight` | function | 10364 |
| `getAllTimeSgOnlyRows` | function | 9363 |
| `getAssistDiagnostics` | function | 4738 |
| `getAssistPlayersFromEvent` | function | 2909 |
| `getCarryPerformanceRows` | function | 10250 |
| `getComparisonAlltimeTeamGoals` | function | 12987 |
| `getComparisonAlltimeTrend` | function | 13061 |
| `getComparisonChemistryFromEvents` | function | 12995 |
| `getComparisonClutchFromEvents` | function | 13000 |
| `getComparisonCurrentSelection` | function | 13126 |
| `getComparisonEventsForItem` | function | 13444 |
| `getComparisonPlayerOptions` | function | 13068 |
| `getComparisonPlayerRow` | function | 12969 |
| `getComparisonProfile` | function | 13030 |
| `getComparisonRosterGames` | function | 13464 |
| `getComparisonRosterGamesForSeason` | function | 13447 |
| `getComparisonSeasonEvents` | function | 12990 |
| `getComparisonSeasonLabel` | function | 12972 |
| `getComparisonSeasonTrend` | function | 13035 |
| `getComparisonStyleProfile` | function | 13005 |
| `getComparisonTeamGoalsForSeason` | function | 12975 |
| `getComparisonVariantsForPlayer` | function | 13086 |
| `getDifficultConnectionRowsForPlayer` | function | 11625 |
| `getDuoDirectScorerGameCounts` | function | 10671 |
| `getDuoFieldPlayerRows` | function | 11100 |
| `getDuoRowsForPlayerScope` | function | 10576 |
| `getDuoScorerCountsWithCandidate` | function | 10617 |
| `getDuoSharedFieldRows` | function | 11116 |
| `getEffectiveLineupData` | function | 6884 |
| `getEinsatzCenterGameDraft` | function | 6956 |
| `getEmptyState` | function | 15640 |
| `getFieldGameIdsForPlayer` | function | 2710 |
| `getFurtherSameDayUlmGames` | function | 4168 |
| `getGameDurationMinutes` | function | 4147 |
| `getGameId` | function | 6165 |
| `getGlobalAllTimeSnapshot` | function | 2418 |
| `getGlobalIdentityProfile` | function | 12536 |
| `getGlobalLoadableSeasonKeys` | function | 8282 |
| `getGlobalOpponentSpecialistProfile` | function | 14627 |
| `getGlobalPlayerBestSeason` | function | 10232 |
| `getGlobalPlayerMilestones` | function | 10415 |
| `getGlobalPlayerOpponentGameRows` | function | 14598 |
| `getGlobalPlayerPeakGame` | function | 10221 |
| `getGlobalPlayerTeamRecord` | function | 10195 |
| `getGlobalProfileEvents` | function | 10168 |
| `getGlobalRookieMilestone` | function | 10404 |
| `getGlobalRookieSeasonKey` | function | 10390 |
| `getGlobalSeasonStatRows` | function | 12880 |
| `getGlobalTopScorerMilestones` | function | 10377 |
| `getGoalieComparisonAlltimeTrend` | function | 13543 |
| `getGoalieComparisonSeasonTrend` | function | 13560 |
| `getGoalieDiagnostics` | function | 4724 |
| `getGoalieDnaRows` | function | 9861 |
| `getGoalieGameIdsForPlayer` | function | 2717 |
| `getGoalieOpponentName` | function | 4023 |
| `getGoalieOpponentTier` | function | 4027 |
| `getGoalScorerFromEvent` | function | 2875 |
| `getHallGoalieData` | function | 12746 |
| `getHallOfFamePlayerIdSet` | function | 10164 |
| `getHallOfFamePlayerRows` | function | 10161 |
| `getHallOfFameStats` | function | 12406 |
| `getJerseyNumber` | function | 2814 |
| `getLineupAllRows` | function | 18382 |
| `getLineupPlayerPool` | function | 18393 |
| `getLoadedSeasonPlayerUi` | function | 10190 |
| `getLoadedSeasonPointsByName` | function | 10134 |
| `getMatchcenterDirectOpponents` | function | 15781 |
| `getMatchcenterOpponents` | function | 15748 |
| `getOppStrength` | function | 3600 |
| `getOrCreatePlayerProfile` | function | 3730 |
| `getPenaltyBasePersonalMinutes` | function | 4183 |
| `getPenaltyDisciplineMinutes` | function | 4201 |
| `getPenaltyDisciplineType` | function | 4139 |
| `getPenaltyPersonalMinutes` | function | 4191 |
| `getPenaltySpecialTeamsMinutes` | function | 4180 |
| `getPhaseIndex` | function | 5009 |
| `getPlayedUlmGames` | function | 2792 |
| `getPlayerAlltimeFieldGames` | function | 2754 |
| `getPlayerAlltimeGoalieGames` | function | 2757 |
| `getPlayerAlltimeRoleGames` | function | 2735 |
| `getPlayerAlltimeStats` | function | 9371 |
| `getPlayerAlltimeTotalGames` | function | 2760 |
| `getPlayerFieldGames` | function | 2724 |
| `getPlayerGoalieAlltimeStats` | function | 9392 |
| `getPlayerGoalieGames` | function | 2728 |
| `getPlayerGoalieSeasonStats` | function | 9387 |
| `getPlayerRegistryProfile` | function | 9379 |
| `getPlayerRoleAvailability` | function | 9422 |
| `getPlayerSeasonRoleGameSummary` | function | 2769 |
| `getPlayerSeasonStats` | function | 9366 |
| `getPlayerSourceId` | function | 2811 |
| `getPreClubHistoryPlayerNames` | function | 2530 |
| `getPreviousSeasonKey` | function | 10089 |
| `getRosterEntryRegistryProfile` | function | 10567 |
| `getRosterGameIdsForPlayer` | function | 2651 |
| `getRosterImpactPlayerEventLookup` | function | 11691 |
| `getRosterImpactPlayerGames` | function | 11762 |
| `getRosterStatus` | function | 10370 |
| `getScoreLabel` | function | 15530 |
| `getSeasonApiBaseUrl` | function | 1838 |
| `getSeasonDataPreview` | function | 6515 |
| `getSeasonDataState` | function | 22655 |
| `getSeasonIdentityProfile` | function | 10324 |
| `getSeasonmanagerRosterSuggestion` | function | 7298 |
| `getSeasonOriginBaseUrl` | function | 1858 |
| `getSeasonPlayerFieldBasis` | function | 8787 |
| `getSeasonScopedIdentityProfile` | function | 8814 |
| `getSeasonTeamGameIds` | function | 2808 |
| `getSeasonTeamGames` | function | 2804 |
| `getSeasonUiPlayerForProfile` | function | 10320 |
| `getSpecialTeamsDiagnostics` | function | 4731 |
| `getSpecialTeamsPenaltyChunks` | function | 4204 |
| `getStaticSeasonGames` | function | 6015 |
| `getStoredLastView` | function | 3435 |
| `getSyntheticLineupPlayers` | function | 18359 |
| `getSyntheticLineupRow` | function | 18362 |
| `getSyntheticLineupRows` | function | 18379 |
| `getTeamAllTimeRecords` | function | 12330 |
| `getTeamLogoUrlForStory` | function | 20363 |
| `getUlmTeamStatus` | function | 2505 |
| `getUniqueAllTimeOpponentNames` | function | 2500 |
| `globalSearchEntries` | function | 23077 |
| `globalSearchIsEditableTarget` | function | 23126 |
| `globalSearchKeyAction` | function | 23132 |
| `globalSearchMatch` | function | 23114 |
| `globalSearchMatchdayScore` | function | 23100 |
| `globalSearchOnKeydown` | function | 23227 |
| `globalSearchPlayerScore` | function | 23091 |
| `globalSearchTokens` | function | 23072 |
| `goalieApplySampleConfidence` | function | 9545 |
| `goalieBucketLooseSum` | function | 9553 |
| `goalieBucketRows` | function | 9465 |
| `goalieClampScore` | function | 9510 |
| `goalieDetailFirstTime` | function | 9489 |
| `goalieDnaKey` | function | 9770 |
| `goalieDnaValue` | function | 9775 |
| `goalieEntryRecognitionReason` | function | 2674 |
| `goalieEventAbsSeconds` | function | 4000 |
| `goalieEventSecondInPeriod` | function | 9496 |
| `goalieGameDurationSeconds` | function | 4006 |
| `goalieGameStateBeforeGoal` | function | 4011 |
| `goalieInverseScore` | function | 9514 |
| `goalieNum` | function | 9451 |
| `goaliePctText` | function | 9502 |
| `goaliePositiveCurveScore` | function | 9530 |
| `goaliePositiveScore` | function | 9522 |
| `goalieSafeNum` | function | 9506 |
| `goalieStateGoals` | function | 9782 |
| `goalieStdDev` | function | 9483 |
| `goalieTierMeta` | function | 9474 |
| `goalieTime` | function | 9457 |
| `goalieTopRow` | function | 9471 |
| `goalieWeightedScore` | function | 9539 |
| `goToMainNavPoint` | window | 22341 |
| `hallGoalieExplainForLabel` | function | 12783 |
| `hallGoalieNameHtml` | function | 12762 |
| `hallGoalieNum` | function | 12648 |
| `hallGoaliePkStats` | function | 12674 |
| `hallGoalieRowFromStats` | function | 12713 |
| `hallGoalieSeasonLabel` | function | 12662 |
| `hallGoalieSeasonScore` | function | 12693 |
| `hallGoalieTime` | function | 12654 |
| `hallGoalieTooltip` | function | 12779 |
| `hallGoalieTopteamStats` | function | 12686 |
| `handleComparisonDuoSearchKey` | window | 13234 |
| `hasEmbeddedSeasonData` | function | 8279 |
| `hashSegmentToSeasonKey` | function | 3142 |
| `hasSeasonRole` | function | 5393 |
| `hasSeasonSource` | function | 8275 |
| `hofIntroDelay` | function | 8431 |
| `identityClutchGoalsVsTeams` | function | 5274 |
| `identityDecisiveGoalsVsTeams` | function | 5277 |
| `identityGoalsVsTeams` | function | 5271 |
| `identityInputs` | function | 5308 |
| `identityLateGoalsVsTeams` | function | 5280 |
| `identityOpponentGroups` | function | 5236 |
| `identityPartnerStats` | function | 5222 |
| `identityPointsVsTeams` | function | 5268 |
| `incGoalieBucket` | function | 3996 |
| `incrementUniqueCounter` | function | 3685 |
| `initGlobalSearch` | function | 23249 |
| `initHashRouting` | function | 3566 |
| `initToolMenu` | function | 23347 |
| `invalidateGlobalIdentityCache` | function | 2243 |
| `isActiveAlltimeSeasonStats` | function | 10339 |
| `isComebackRelevantGoal` | function | 5264 |
| `isDecisiveGoal` | function | 5256 |
| `isEinsatzCenterGameFromDraft` | function | 6893 |
| `isExcludedGoalieAppearance` | function | 2684 |
| `isFieldAppearance` | function | 2704 |
| `isGamePlayed` | function | 3001 |
| `isGoalieAppearance` | function | 2698 |
| `isGoalieRosterEntry` | function | 2660 |
| `isHallOfFameEligiblePlayer` | function | 10155 |
| `isHallRowPureSG` | function | 12663 |
| `isImportantClutchGoal` | function | 5251 |
| `isLateGoal` | function | 5259 |
| `isMatchPenaltyEvent` | function | 4131 |
| `isNewSeasonDataState` | function | 22676 |
| `isPenaltyGoalEvent` | function | 4214 |
| `isPreClubHistoryPlayerName` | function | 2533 |
| `isPureSGPlayer` | function | 9352 |
| `isRookieCandidateForSeason` | function | 10124 |
| `isSameUlmTeamContext` | function | 4160 |
| `isSeasonDataPreviewStale` | function | 6523 |
| `isSgOnlyAlltimePlayer` | function | 9344 |
| `isSgOnlyHallOfFameExcluded` | function | 10146 |
| `isSyntheticLineupPlayerId` | function | 18356 |
| `isToolMenuOpen` | function | 23285 |
| `isTwoPlusTwoPenaltyEvent` | function | 4135 |
| `isUsableExternalSeasonData` | function | 6098 |
| `isValidAsOfDate` | function | 3146 |
| `isValidAsOfStartTime` | function | 3149 |
| `isVisibleSecondaryTrait` | function | 8689 |
| `kpiBadge` | function | 13952 |
| `kpiDelta` | function | 13671 |
| `kpiItemColor` | function | 13677 |
| `kpiNiceMax` | function | 13842 |
| `kpiRadarValue` | function | 13765 |
| `kpiTrendRows` | function | 13848 |
| `kpiValueText` | function | 13667 |
| `lexiconEntry` | function | 15336 |
| `lexiconUniqueKeys` | function | 15328 |
| `lineupAverage` | function | 18408 |
| `lineupBuilderPoolIds` | function | 2300 |
| `lineupCombinationIds` | function | 18885 |
| `lineupDirectChemistryScore` | function | 18929 |
| `lineupEvaluateComplementCandidate` | function | 18936 |
| `lineupGroupDisplayName` | function | 6802 |
| `lineupLevelLabel` | function | 18412 |
| `lineupOpponentDNAForContext` | function | 18509 |
| `lineupPlayerAnchorConfidence` | function | 19035 |
| `lineupPlayerAnchorScore` | function | 19015 |
| `lineupPlayerProfile` | function | 18613 |
| `lineupRankCandidateIds` | function | 18870 |
| `lineupRecommendationReason` | function | 19111 |
| `lineupRoleDnaComplementScore` | function | 18905 |
| `lineupRosterGamesForPlayer` | function | 18418 |
| `lineupRowMap` | function | 18867 |
| `lineupRowMeta` | function | 18385 |
| `lineupScore` | function | 18402 |
| `lineupStdDev` | function | 18899 |
| `linkUiPlayersToRegistry` | function | 3817 |
| `loadEinsatzCenterMismatchedAutosave` | function | 7213 |
| `loadSeason` | function | 8355 |
| `loadSeasonData` | function | 7798 |
| `loadSeasonForGlobal` | function | 8307 |
| `loadSeasonManifest` | function | 6030 |
| `mainNavActiveKeyForPage` | function | 22335 |
| `markFieldRoleAppearance` | function | 3792 |
| `matchcenterAddDuoConnection` | function | 16188 |
| `matchcenterAddPlanItem` | function | 17405 |
| `matchcenterAddPlanWatch` | function | 17411 |
| `matchcenterAddUlmDuoConnection` | function | 16339 |
| `matchcenterAddUlmScoring` | function | 15969 |
| `matchcenterAnalyzeDirect` | function | 15814 |
| `matchcenterAnalyzeForm` | function | 15851 |
| `matchcenterBuildCoachActivationHints` | function | 18153 |
| `matchcenterBuildCoachAvoidList` | function | 18143 |
| `matchcenterBuildCoachDangerPatterns` | function | 18125 |
| `matchcenterBuildCoachHints` | function | 17881 |
| `matchcenterBuildCoachIfThen` | function | 18133 |
| `matchcenterBuildCoachKeyActors` | function | 18160 |
| `matchcenterBuildCoachLevers` | function | 18115 |
| `matchcenterBuildCoachPriorities` | function | 18108 |
| `matchcenterBuildGoalieMatchup` | function | 16540 |
| `matchcenterBuildInsights` | function | 16827 |
| `matchcenterBuildIntelHeadline` | function | 17897 |
| `matchcenterBuildIntelligenceDataQuality` | function | 17513 |
| `matchcenterBuildIntelligenceSignals` | function | 17918 |
| `matchcenterBuildIntelListFromPlan` | function | 17872 |
| `matchcenterBuildMatchPlan` | function | 19230 |
| `matchcenterBuildOneThingToWatch` | function | 17905 |
| `matchcenterBuildOpponentAlarm` | function | 17762 |
| `matchcenterBuildOpponentDNA` | function | 17583 |
| `matchcenterBuildOpponentDuoInsights` | function | 16287 |
| `matchcenterBuildOpponentDuos` | function | 16242 |
| `matchcenterBuildPlanConfidence` | function | 17417 |
| `matchcenterBuildSpecialTeamsMatchup` | function | 16470 |
| `matchcenterBuildTimingAnalysis` | function | 16666 |
| `matchcenterBuildTimingInsights` | function | 16655 |
| `matchcenterBuildUlmDuoInsights` | function | 16437 |
| `matchcenterBuildUlmDuos` | function | 16394 |
| `matchcenterBuildUlmPlayerInsights` | function | 16131 |
| `matchcenterBuildUlmPlayerScouting` | function | 16076 |
| `matchcenterClassifyUlmGoalEvent` | function | 15958 |
| `matchcenterCoachAdd` | function | 18045 |
| `matchcenterCoachCautious` | function | 18042 |
| `matchcenterCoachGameModel` | function | 18054 |
| `matchcenterCoachPriorityFromAlarm` | function | 18098 |
| `matchcenterConfidenceClass` | function | 17392 |
| `matchcenterDateLabel` | function | 15690 |
| `matchcenterDefaultSeasonKey` | function | 15728 |
| `matchcenterDeriveOpponentType` | function | 17696 |
| `matchcenterDirectContextGames` | function | 16450 |
| `matchcenterDuoDirectionLabel` | function | 16181 |
| `matchcenterDuoPairKey` | function | 16144 |
| `matchcenterEmptyBuckets` | function | 15899 |
| `matchcenterEmptyTimingStats` | function | 16602 |
| `matchcenterEnsureOpponentDuo` | function | 16148 |
| `matchcenterEnsureUlmDuo` | function | 16301 |
| `matchcenterEnsureUlmPlayer` | function | 15907 |
| `matchcenterFinalizeOpponentDuos` | function | 16207 |
| `matchcenterFinalizeUlmDuos` | function | 16358 |
| `matchcenterFinalizeUlmPlayers` | function | 16007 |
| `matchcenterFormLine` | function | 16822 |
| `matchcenterGameLine` | function | 16816 |
| `matchcenterGoalAbsSeconds` | function | 16586 |
| `matchcenterGoalieFitScore` | function | 16523 |
| `matchcenterGoalieKey` | function | 16518 |
| `matchcenterGoalMinute` | function | 15885 |
| `matchcenterInferPriority` | function | 17398 |
| `matchcenterIntelAddAlarm` | function | 17741 |
| `matchcenterIntelCurve` | function | 17465 |
| `matchcenterIntelDataLabel` | function | 17510 |
| `matchcenterIntelDuoRef` | function | 17727 |
| `matchcenterIntelInverseCurve` | function | 17471 |
| `matchcenterIntelPct` | function | 17490 |
| `matchcenterIntelPlayerRef` | function | 17714 |
| `matchcenterIntelPriorityClass` | function | 17500 |
| `matchcenterIntelPriorityFromScore` | function | 17494 |
| `matchcenterIntelPriorityLabel` | function | 17506 |
| `matchcenterIntelRate` | function | 17486 |
| `matchcenterIntelWeighted` | function | 17475 |
| `matchcenterIsFreiburgTuebingenTeamName` | function | 15715 |
| `matchcenterOpponentMode` | function | 15745 |
| `matchcenterPct` | function | 16466 |
| `matchcenterPersonalPenaltyMinutesForSide` | function | 16457 |
| `matchcenterPlanRateText` | function | 17384 |
| `matchcenterPlanScoreText` | function | 17380 |
| `matchcenterPriorityLabel` | function | 17389 |
| `matchcenterRegisterUlmProfileGame` | function | 15945 |
| `matchcenterResultClass` | function | 16807 |
| `matchcenterSeasonHasGames` | function | 15725 |
| `matchcenterSigned` | function | 15684 |
| `matchcenterSocialAdd` | function | 18222 |
| `matchcenterSocialCaption` | function | 18229 |
| `matchcenterSpecialTeamsForGame` | function | 16453 |
| `matchcenterStoryAddCandidate` | function | 20467 |
| `matchcenterStoryAddFact` | function | 20448 |
| `matchcenterStoryBestClutchDuo` | function | 20692 |
| `matchcenterStoryBestClutchPlayer` | function | 20648 |
| `matchcenterStoryCandidateForBudget` | function | 20505 |
| `matchcenterStoryCategoryForPlanFact` | function | 20777 |
| `matchcenterStoryCategoryLimit` | function | 20490 |
| `matchcenterStoryClutchFact` | function | 20625 |
| `matchcenterStoryClutchPriority` | function | 20726 |
| `matchcenterStoryCompetitionLabel` | function | 20729 |
| `matchcenterStoryCurrentStreak` | function | 20572 |
| `matchcenterStoryDirectFactCandidates` | function | 20742 |
| `matchcenterStoryDownloadFileName` | function | 19698 |
| `matchcenterStoryDuoClutchFact` | function | 20702 |
| `matchcenterStoryDuoClutchTotal` | function | 20684 |
| `matchcenterStoryDuoFact` | function | 20705 |
| `matchcenterStoryEstimateFactWeight` | function | 20461 |
| `matchcenterStoryFactKey` | function | 20455 |
| `matchcenterStoryFormFact` | function | 20590 |
| `matchcenterStoryFormFactCandidates` | function | 20601 |
| `matchcenterStoryInlineStat` | function | 20430 |
| `matchcenterStoryLastDuelLabel` | function | 20738 |
| `matchcenterStoryLateGoalsForOutcome` | function | 20621 |
| `matchcenterStoryLogoBase` | function | 20342 |
| `matchcenterStoryLogoForOpponent` | function | 20393 |
| `matchcenterStoryLooksArtificial` | function | 20458 |
| `matchcenterStoryNameClass` | function | 20898 |
| `matchcenterStoryNormalizePickOptions` | function | 20494 |
| `matchcenterStoryPickFactItems` | function | 20515 |
| `matchcenterStoryPickFacts` | function | 20568 |
| `matchcenterStoryPlanFactCandidates` | function | 20764 |
| `matchcenterStoryPlayerClutchFact` | function | 20658 |
| `matchcenterStoryPlayerClutchTotal` | function | 20640 |
| `matchcenterStoryRankRows` | function | 20434 |
| `matchcenterStoryRankText` | function | 20426 |
| `matchcenterStorySafeLogoUrl` | function | 20348 |
| `matchcenterStoryShortDuel` | function | 20733 |
| `matchcenterStoryTableRank` | function | 20408 |
| `matchcenterStoryUlmTableRank` | function | 20419 |
| `matchcenterStoryVisibleFacts` | function | 20904 |
| `matchcenterStoryWinlessStreak` | function | 20581 |
| `matchcenterTimeValue` | function | 16594 |
| `matchcenterTimingStatsForGames` | function | 16618 |
| `matchcenterUlmScoutingConfidence` | function | 15902 |
| `matchcenterUlmTeamLabelForGame` | function | 16811 |
| `matchcenterUpdateUlmSeasonRow` | function | 15951 |
| `matchcenterWindowForSecond` | function | 16611 |
| `matchdayFixtureCardHtml` | function | 22517 |
| `matchdayGameCardHtml` | function | 22492 |
| `matchdayLineupCardHtml` | function | 22485 |
| `matchdayLineupInfo` | function | 22473 |
| `matchdayUlmGames` | function | 22464 |
| `medianOrNull` | function | 3990 |
| `mergeDuoSet` | function | 4820 |
| `mergeGoalieSpecialTeamsStats` | function | 4452 |
| `mergeSpecialTeamsStats` | function | 4096 |
| `moveGlobalSearch` | function | 23211 |
| `normalizeAssistPlayerName` | function | 2878 |
| `normalizeComparisonItem` | function | 12946 |
| `normalizeDuoComparisonItem` | function | 13190 |
| `normalizeEventPlayerRef` | function | 2817 |
| `normalizeLineupLines` | function | 2303 |
| `normalizePlayerName` | function | 2520 |
| `normalizeSecondaryTraits` | function | 5367 |
| `onGlobalSearchInput` | window | 23205 |
| `openAllTimePlayers` | window | 8423 |
| `openComparisonCenter` | window | 8593 |
| `openDuoProPicker` | window | 11530 |
| `openEinsatzCenter` | window | 6753 |
| `openGlobalSearch` | window | 23172 |
| `openHallOfFame` | window | 8569 |
| `openLexicon` | window | 8666 |
| `openLigaGegner` | window | 22929 |
| `openLineupBuilder` | window | 8644 |
| `openMatchcenter` | window | 8622 |
| `openMatchcenterStoryPreview` | window | 2256 |
| `openMatchday` | window | 22446 |
| `openMatchdayTimeline` | window | 22438 |
| `openOverview` | window | 22387 |
| `openSeason` | window | 8420 |
| `openToolMenu` | window | 23289 |
| `overviewCompactTableHtml` | function | 22746 |
| `overviewCrossSeasonTrendHtml` | function | 22805 |
| `overviewFormHtml` | function | 22764 |
| `overviewLastMatchdayText` | function | 22712 |
| `overviewLineupLinkHtml` | function | 22822 |
| `overviewMatchcenterLinkHtml` | function | 22819 |
| `overviewMatchdayEndMs` | function | 22617 |
| `overviewMatchdayStartMs` | function | 22611 |
| `overviewNextMatchdayHtml` | function | 22722 |
| `overviewOpponentLabel` | function | 22700 |
| `overviewOpponentPreviewHtml` | function | 22814 |
| `overviewRankChangeTile` | function | 22841 |
| `overviewRecordHtml` | function | 22798 |
| `overviewSeasonAwardHtml` | function | 22787 |
| `overviewSeasonBilanzHtml` | function | 22779 |
| `p1NarrativeKey` | function | 15604 |
| `paintGlobalSearchResults` | function | 23164 |
| `parseAppHash` | function | 3249 |
| `parseAsOfQueryValue` | function | 3288 |
| `parseComparisonVariant` | function | 13111 |
| `parseLastViewState` | function | 3423 |
| `parseSeasonDataState` | function | 22666 |
| `pct` | function | 5175 |
| `pctValue` | function | 12586 |
| `pdashBestPhase` | function | 14238 |
| `pdashInsight` | function | 14276 |
| `pdashInsights` | function | 14279 |
| `pdashNum` | function | 14222 |
| `pdashOpponentStrength` | function | 14256 |
| `pdashOpponentTier` | function | 14250 |
| `pdashPct` | function | 14226 |
| `pdashPhaseLabel` | function | 14230 |
| `pdashTopCount` | function | 14234 |
| `pdashTopOpponent` | function | 14246 |
| `pdashTopPartner` | function | 14242 |
| `penaltyRawText` | function | 4128 |
| `playerAppearedForUlmStatusInSeasonByName` | function | 10105 |
| `playerAppearedInSeasonByName` | function | 10094 |
| `playerExplainAdd` | function | 14912 |
| `playerExplainConfidence` | function | 14903 |
| `playerExplainConfidenceLabel` | function | 14909 |
| `playerExplainContextSentence` | function | 14948 |
| `playerExplainHeadline` | function | 14938 |
| `playerExplainRolePhrase` | function | 14929 |
| `playerExplainStyleSignature` | function | 14917 |
| `processGame` | function | 2942 |
| `rAlltimeKpis` | function | 12902 |
| `rAlltimePlayerDashboard` | function | 14431 |
| `rAllTimePlayersPage` | function | 15193 |
| `rankNarratives` | function | 15626 |
| `rAntiSynergyCompareChip` | function | 11925 |
| `rAntiSynergyDelta` | function | 11909 |
| `rAntiSynergyMainDelta` | function | 11972 |
| `rAntiSynergyMetricRow` | function | 11933 |
| `rAntiSynergyWinrateRow` | function | 11955 |
| `rAntiSynergyWinrateText` | function | 11949 |
| `rAsOfSelector` | function | 22950 |
| `ratio01` | function | 5176 |
| `rAvgResponseTimeNote` | function | 12206 |
| `rCarryPerformanceRows` | function | 10266 |
| `rClassicRoleTags` | function | 8775 |
| `rClassicTagTip` | function | 8713 |
| `rClutch` | function | 8981 |
| `rClutchBadge` | function | 8675 |
| `rComparisonCenterPage` | function | 14101 |
| `rComparisonDashboard` | function | 14052 |
| `rComparisonDuoSearchBox` | function | 13420 |
| `rComparisonDuoSuggestionButtons` | function | 13213 |
| `rComparisonMiniOverview` | function | 14040 |
| `rComparisonModeSelect` | function | 13441 |
| `rComparisonRoles` | function | 14044 |
| `rComparisonStyles` | function | 14063 |
| `rContextBar` | function | 23033 |
| `rDifficultConnectionList` | function | 11982 |
| `rDifficultConnectionListCompact` | function | 12049 |
| `rDifficultConnectionListCompactLegacy` | function | 12007 |
| `rDifficultConnectionsCard` | function | 12088 |
| `rDuoCenterPro` | function | 11372 |
| `rDuoCompareSummaryCards` | function | 13299 |
| `rDuoComparisonBars` | function | 13294 |
| `rDuoComparisonChemistry` | function | 13352 |
| `rDuoComparisonContext` | function | 13384 |
| `rDuoComparisonDashboard` | function | 13406 |
| `rDuoComparisonDetails` | function | 13402 |
| `rDuoComparisonImpact` | function | 13368 |
| `rDuoComparisonPage` | function | 13430 |
| `rDuoComparisonProfile` | function | 13330 |
| `rDuoProPlayerSelect` | function | 11559 |
| `rDuoResponseMomentumCard` | function | 12264 |
| `rDuoRows` | function | 10525 |
| `recommendLineComplements` | function | 19202 |
| `recordOverviewVisit` | function | 22685 |
| `registerPlayerIdentity` | function | 3764 |
| `registerSeasonRosters` | function | 3797 |
| `rEinsatzCenterAutosaveBanner` | function | 7175 |
| `rEinsatzCenterCombo` | function | 6698 |
| `rEinsatzCenterComboEditor` | function | 7403 |
| `rEinsatzCenterDraftBanner` | function | 6916 |
| `rEinsatzCenterDraftMark` | function | 6902 |
| `rEinsatzCenterDraftStatsHint` | function | 6906 |
| `rEinsatzCenterEditPage` | function | 7503 |
| `rEinsatzCenterGameCard` | function | 6707 |
| `rEinsatzCenterGameEditor` | function | 7450 |
| `rEinsatzCenterGroup` | function | 6685 |
| `rEinsatzCenterGroupEditor` | function | 7372 |
| `rEinsatzCenterPage` | function | 6726 |
| `rEinsatzCenterRosterSuggestionCard` | function | 7419 |
| `rEinsatzCenterStats` | function | 6808 |
| `relative01` | function | 5177 |
| `removeComparisonDuo` | window | 13264 |
| `removeComparisonItem` | window | 13176 |
| `removeEinsatzCenterCombo` | window | 7740 |
| `removeEinsatzCenterGroup` | window | 7654 |
| `removeEinsatzCenterGroupPlayer` | window | 7704 |
| `removeEinsatzCenterRosterPlayer` | window | 7585 |
| `removeLineupBuilderPlayerFromLine` | window | 2350 |
| `removeLineupPlayer` | window | 2291 |
| `rEmptyState` | function | 15652 |
| `renameEinsatzCenterGroup` | window | 7676 |
| `render` | function | 21672 |
| `renderComparisonDuoSuggestions` | function | 13217 |
| `renderTags` | function | 8783 |
| `repairRenderedMojibake` | function | 2466 |
| `resetPlayerRegistrySeason` | function | 3709 |
| `resolveAssistPlayer` | function | 2923 |
| `resolveCurrentSeasonKey` | function | 6061 |
| `resolveGoalScorerPlayer` | function | 2860 |
| `resolveLineupPlayerName` | function | 6670 |
| `resolvePlayerRoleView` | function | 9436 |
| `resolveRosterPlayerByRef` | function | 2829 |
| `responseExcerpt` | function | 5899 |
| `responseMomentumAbsSeconds` | function | 10704 |
| `responseMomentumActor` | function | 10733 |
| `responseMomentumConfidence` | function | 10853 |
| `responseMomentumEmptyState` | function | 10858 |
| `responseMomentumGameRows` | function | 10717 |
| `responseMomentumGoalActors` | function | 10744 |
| `responseMomentumPairKey` | function | 10866 |
| `responseMomentumSide` | function | 10724 |
| `responseMomentumTime` | function | 10710 |
| `responseMomentumTooltipFor` | function | 12169 |
| `restoreEinsatzCenterAutosave` | function | 7149 |
| `restoreHallOfFameIntroPrevious` | function | 8511 |
| `resultGoalsAgainstForSide` | function | 4032 |
| `returnToEinsatzCenterEdit` | window | 7571 |
| `rGlobalAllTimeStats` | function | 14539 |
| `rGlobalCareerHeader` | function | 14448 |
| `rGlobalDevelopment` | function | 14557 |
| `rGlobalDnaBars` | function | 14192 |
| `rGlobalDuoNetwork` | function | 14657 |
| `rGlobalOpponentSpecialist` | function | 14856 |
| `rGlobalOverview` | function | 14486 |
| `rGlobalPartnerOpponentPanel` | function | 14434 |
| `rGlobalProfileTags` | function | 12577 |
| `rGlobalSearchPanelHtml` | function | 23161 |
| `rGlobalSearchResultsHtml` | function | 23150 |
| `rGlobalSearchToggle` | function | 23147 |
| `rGoalieAnalysis` | function | 10062 |
| `rGoalieBars` | function | 9719 |
| `rGoalieDnaBars` | function | 9865 |
| `rGoalieFirstGoalResistance` | function | 9902 |
| `rGoalieInsights` | function | 9975 |
| `rGoalieKpis` | function | 9879 |
| `rGoalieMiniMetrics` | function | 9896 |
| `rGoalieMomentum` | function | 9916 |
| `rGoalieOpponents` | function | 10017 |
| `rGoalieOverview` | function | 9997 |
| `rGoaliePhaseProfile` | function | 9958 |
| `rGoaliePhases` | function | 10014 |
| `rGoalieRoleTraits` | function | 9857 |
| `rGoalieStability` | function | 10029 |
| `rGoalieTable` | function | 10054 |
| `rGoalieTierCards` | function | 9930 |
| `rHallDuoTemple` | function | 12639 |
| `rHallGoalieAwardCards` | function | 12830 |
| `rHallGoalieLegends` | function | 12847 |
| `rHallGoalieRankCard` | function | 12798 |
| `rHallOfFameHero` | function | 12590 |
| `rHallOfFamePage` | function | 15235 |
| `rHallPodiumList` | function | 12616 |
| `rHallSGBadge` | function | 12671 |
| `rIaShell` | function | 23053 |
| `rIdentityCards` | function | 8749 |
| `rIdentityTags` | function | 8729 |
| `rInsights` | function | 9242 |
| `rInteractiveDuoCenterPro` | function | 11566 |
| `rKpiCards` | function | 13680 |
| `rKpiExtendedMetrics` | function | 13827 |
| `rKpiInfoCards` | function | 13962 |
| `rKpiMetricCard` | function | 13819 |
| `rKpiMirrorRows` | function | 13705 |
| `rKpiObjectMini` | function | 13955 |
| `rKpiOpponentStrength` | function | 13924 |
| `rKpiRadar` | function | 13776 |
| `rKpiShareBars` | function | 13811 |
| `rKpiTextMetricCard` | function | 13824 |
| `rKpiTrendCompare` | function | 13857 |
| `rKPIVergleich` | function | 14026 |
| `rLexiconPage` | function | 15350 |
| `rLexiconRows` | function | 15346 |
| `rLigaGegnerPlaceholderPage` | function | 22933 |
| `rLineupBuilderAvailablePanel` | function | 20064 |
| `rLineupBuilderPage` | function | 20240 |
| `rLineupComplementCards` | function | 20161 |
| `rLineupMetricPills` | function | 20050 |
| `rLineupRecommendationCards` | function | 20112 |
| `rLineupRecommendationMode` | function | 20127 |
| `rLineupScoreRows` | function | 19946 |
| `rLineupSimpleCards` | function | 19968 |
| `rLineupTestLine` | function | 20174 |
| `rLineupTestMode` | function | 20223 |
| `rMainNav` | function | 22348 |
| `rMainNavBottom` | function | 22370 |
| `rMatchcenterCoachCardList` | function | 19525 |
| `rMatchcenterCoachIfThen` | function | 19539 |
| `rMatchcenterCoachSimpleList` | function | 19547 |
| `rMatchcenterCopyButton` | function | 19617 |
| `rMatchcenterDetailsSection` | function | 16799 |
| `rMatchcenterDigitalCoach` | function | 19552 |
| `rMatchcenterDuoRankCard` | function | 17118 |
| `rMatchcenterDuoRow` | function | 17094 |
| `rMatchcenterDuosTab` | function | 17265 |
| `rMatchcenterDuoWatchCard` | function | 17074 |
| `rMatchcenterFormCard` | function | 16855 |
| `rMatchcenterFormSection` | function | 16773 |
| `rMatchcenterGamesList` | function | 16876 |
| `rMatchcenterGoalieCard` | function | 17327 |
| `rMatchcenterGoalieMatchup` | function | 17351 |
| `rMatchcenterIntelCoachHints` | function | 19511 |
| `rMatchcenterIntelOverview` | function | 19465 |
| `rMatchcenterKpi` | function | 16848 |
| `rMatchcenterLineupBuilder` | function | 19977 |
| `rMatchcenterLockerList` | function | 19622 |
| `rMatchcenterLockerRoomSheet` | function | 19634 |
| `rMatchcenterMatchPlan` | function | 20319 |
| `rMatchcenterOpponentAlarm` | function | 19443 |
| `rMatchcenterOpponentDNA` | function | 19410 |
| `rMatchcenterOpponentDuos` | function | 17222 |
| `rMatchcenterOpponentScouting` | function | 17035 |
| `rMatchcenterPage` | function | 21150 |
| `rMatchcenterPlanItems` | function | 19376 |
| `rMatchcenterPlanWatch` | function | 19394 |
| `rMatchcenterPlayerRow` | function | 16909 |
| `rMatchcenterPlayersTab` | function | 17071 |
| `rMatchcenterProfileSection` | function | 16753 |
| `rMatchcenterRankCard` | function | 16933 |
| `rMatchcenterResponseMomentum` | function | 12291 |
| `rMatchcenterScoutingSummary` | function | 20275 |
| `rMatchcenterSocialBlock` | function | 19690 |
| `rMatchcenterSocialMediaCenter` | function | 19892 |
| `rMatchcenterSpecialCard` | function | 17268 |
| `rMatchcenterSpecialTeams` | function | 17277 |
| `rMatchcenterStoryForm` | function | 20940 |
| `rMatchcenterStoryFrame` | function | 21023 |
| `rMatchcenterStoryLogo` | function | 20935 |
| `rMatchcenterStoryPlayerCard` | function | 20945 |
| `rMatchcenterStoryPreview` | function | 20953 |
| `rMatchcenterTabs` | function | 16750 |
| `rMatchcenterTimeBars` | function | 16677 |
| `rMatchcenterTiming` | function | 16711 |
| `rMatchcenterTimingStatsCard` | function | 16691 |
| `rMatchcenterUlmDuoRankCard` | function | 17173 |
| `rMatchcenterUlmDuoRow` | function | 17150 |
| `rMatchcenterUlmDuos` | function | 17179 |
| `rMatchcenterUlmDuoWatchCard` | function | 17124 |
| `rMatchcenterUlmImpactCard` | function | 16939 |
| `rMatchcenterUlmPlayerRow` | function | 16968 |
| `rMatchcenterUlmRankCard` | function | 16992 |
| `rMatchcenterUlmScouting` | function | 16998 |
| `rMatchcenterWatchCard` | function | 16888 |
| `rMatchdayDetailPage` | function | 22546 |
| `rMatchdayPage` | function | 22586 |
| `rMatchdayTimelinePage` | function | 22535 |
| `rMatchdayTimelineRow` | function | 22527 |
| `rMatrix` | function | 8854 |
| `rmTerm` | function | 12176 |
| `roleGameStableKey` | function | 2732 |
| `roleTraitLabel` | function | 8686 |
| `rOppBreakdown` | function | 9146 |
| `rOpponentIntelBars` | function | 10489 |
| `rOpponentTopScorerTable` | function | 12430 |
| `rosterImpactConfidence` | function | 11804 |
| `rosterImpactConfidenceWeight` | function | 11818 |
| `rosterPlayerMatches` | function | 2636 |
| `rOverviewPage` | function | 22917 |
| `rPdashLabel` | function | 14383 |
| `rPdashStat` | function | 14386 |
| `rPenalties` | function | 9127 |
| `rPhases` | function | 8911 |
| `rPlayerDash` | function | 14389 |
| `rPlayerDashStyles` | function | 14371 |
| `rPlayerExplainItems` | function | 15135 |
| `rPlayerExplanation` | function | 15140 |
| `rPlayerResponseMomentumCard` | function | 12245 |
| `rPlayerRoleSwitch` | function | 9444 |
| `rRadar` | function | 8931 |
| `rRes` | const-arrow | 8674 |
| `rResponseMomentumOverviewCard` | function | 12221 |
| `rResponseRateDisplay` | function | 12185 |
| `rRmKpi` | function | 12192 |
| `rRmTopList` | function | 12210 |
| `rRoleTraitTip` | function | 8693 |
| `rRosterImpactStatLine` | function | 11964 |
| `rRosterStatusBadge` | function | 8702 |
| `rScoreBreakdown` | function | 15666 |
| `rSeasonDataPreviewCard` | function | 6542 |
| `rSeasonDataPreviewContextHint` | function | 22985 |
| `rSeasonDataPreviewRows` | function | 6532 |
| `rSeasonDataPreviewStatus` | function | 6529 |
| `rSeasonDataStateContextHint` | function | 23002 |
| `rSeasonDuoCenterPro` | function | 11622 |
| `rSeasonDuoSummary` | function | 8901 |
| `rSeasonInsightsTab` | function | 9227 |
| `rSeasonLandingPage` | function | 14470 |
| `rSeasonPlayerDashboard` | function | 14428 |
| `rSeasonProfileKpis` | function | 8826 |
| `rSeasonProfileTagStrip` | function | 8847 |
| `rSeasonTrendRows` | function | 14152 |
| `rSocialVideoBlock` | function | 19759 |
| `rSparkline` | function | 12916 |
| `rStyleMetricTip` | function | 8698 |
| `rStyleProfileBars` | function | 8738 |
| `rTable` | function | 9296 |
| `rTeamPage` | function | 21299 |
| `rTeamResponseMomentumCard` | function | 12284 |
| `rTimeline` | function | 9016 |
| `rToolMenu` | function | 23275 |
| `runComparison` | window | 13181 |
| `runDuoComparison` | window | 13269 |
| `saveLastView` | function | 3440 |
| `scoreNarrative` | function | 15607 |
| `seasonApiUrl` | function | 1855 |
| `seasonDataPreviewRerender` | function | 6388 |
| `seasonDataPreviewRow` | function | 6392 |
| `seasonGameApiUrls` | function | 1873 |
| `seasonGameHtmlUrls` | function | 1883 |
| `seasonHasPureUlmTeam` | function | 10139 |
| `seasonKeyToHashSegment` | function | 3139 |
| `seasonPathPrefix` | function | 1867 |
| `seasonRoleKeysForPlayer` | function | 5384 |
| `seasonRoleTraitsFromClassic` | function | 5379 |
| `seasonStatNumber` | function | 10329 |
| `seasonStatSetSize` | function | 10333 |
| `seedHallOfFameIntroParticles` | function | 8478 |
| `selectAllLineupAvailable` | window | 2337 |
| `selectComparisonDuoSuggestion` | window | 13227 |
| `selectComparisonMode` | window | 13188 |
| `selectComparisonPlayer` | window | 13145 |
| `selectDuoProQuick` | window | 11532 |
| `selectEinsatzCenterEditGame` | window | 7573 |
| `selectEnforcerKeys` | function | 5396 |
| `serializeFieldRoleSeasonStats` | function | 3913 |
| `serializeGoalieSeasonStats` | function | 3891 |
| `serializeSeasonStats` | function | 3878 |
| `serializeSpecialTeamsStats` | function | 4093 |
| `setAntiSynergyView` | window | 2383 |
| `setComparisonDuoMode` | window | 13198 |
| `setComparisonDuoPlayer` | window | 13247 |
| `setComparisonDuoSearch` | window | 13200 |
| `setComparisonDuoSeasonKey` | window | 13199 |
| `setComparisonRoleMode` | window | 13151 |
| `setComparisonVariant` | window | 13156 |
| `setContextAsOf` | window | 22963 |
| `setDuoProPickerState` | function | 11501 |
| `setDuoProSelection` | window | 11551 |
| `setEinsatzCenterGameNote` | window | 7747 |
| `setEinsatzCenterGroupPlayerPosition` | window | 7712 |
| `setEinsatzCenterIncludeDraft` | window | 7572 |
| `setEinsatzCenterSeason` | window | 6747 |
| `setGlobalPlayer` | window | 2409 |
| `setGlobalPlayerDuo` | window | 2410 |
| `setGlobalTab` | window | 2411 |
| `setGoalieTab` | window | 2250 |
| `setLineupActiveLine` | window | 2322 |
| `setLineupBuilderMode` | window | 2321 |
| `setLineupBuilderOpponent` | window | 2320 |
| `setLineupBuilderSeason` | window | 2308 |
| `setLineupNewPlayerProfile` | window | 2364 |
| `setMatchcenterContext` | window | 8663 |
| `setMatchcenterOpponent` | window | 8662 |
| `setMatchcenterSeason` | window | 8664 |
| `setMatchcenterTab` | window | 2255 |
| `setP` | window | 2247 |
| `setPage` | window | 2393 |
| `setPlayerRoleView` | window | 2249 |
| `setSeasonDataPreviewOpen` | window | 6578 |
| `setSeasonDataPreviewPasteText` | window | 6579 |
| `setState` | const-arrow | 2235 |
| `setTab` | window | 2248 |
| `showLineupComplements` | window | 2363 |
| `showMainShell` | function | 8270 |
| `socialDuoFocusLine` | function | 18252 |
| `socialEnsurePeriod` | function | 18238 |
| `socialFirstUseful` | function | 18242 |
| `socialKeyFactLine` | function | 18262 |
| `socialOpponentLine` | function | 18258 |
| `socialPlayerFocusLine` | function | 18245 |
| `socialSentence` | function | 18235 |
| `socialVideoJobsForMatchday` | function | 19793 |
| `specialTeamsStateFromActive` | function | 4219 |
| `stageSeasonDataPreview` | function | 6438 |
| `stageSeasonDataPreviewFromFile` | function | 6490 |
| `stageSeasonDataPreviewFromPaste` | function | 6504 |
| `startApp` | window | 8408 |
| `startEinsatzCenterDraftMode` | window | 7553 |
| `startHallOfFameIntro` | function | 8531 |
| `sumRoleGames` | function | 9416 |
| `switchMatchdaySeason` | window | 22457 |
| `switchOverviewSeason` | window | 22404 |
| `syncHashFromState` | function | 3382 |
| `t2s` | const-arrow | 2931 |
| `toggleAntiSynergyHideSgOnly` | window | 2385 |
| `toggleAntiSynergyShowAll` | window | 2384 |
| `toggleComparisonPicker` | window | 13175 |
| `toggleComparisonSgOnly` | window | 13160 |
| `toggleEinsatzCenterComboPlayer` | window | 7721 |
| `toggleEinsatzCenterGroupRename` | window | 7662 |
| `toggleEinsatzCenterRosterSuggestionPlayer` | window | 7593 |
| `toggleHallOfFamePureSGPlayers` | window | 2258 |
| `toggleLineupBuilderAvailable` | window | 2323 |
| `toggleMatchcenterDuoDetails` | window | 2254 |
| `toggleMatchcenterGames` | window | 8665 |
| `toggleMatchcenterPlayerDetails` | window | 2253 |
| `toggleMatchcenterSpecialTeamsGames` | window | 2252 |
| `toggleSgOnlyAlltime` | window | 2412 |
| `toggleSpecialTeamsGameDetails` | window | 2251 |
| `toggleToolMenu` | window | 23304 |
| `toolMenuElements` | function | 23279 |
| `toolMenuItemElements` | function | 23282 |
| `toolMenuOnClick` | function | 23340 |
| `toolMenuOnKeydown` | function | 23316 |
| `toPublicPlayerRegistry` | function | 3917 |
| `uiDatenstandBand` | function | 22156 |
| `uiDeltaIndicator` | function | 21921 |
| `uiFormatNumber` | function | 21893 |
| `uiHinweisKarte` | function | 21985 |
| `uiInfoIcon` | function | 21939 |
| `uiIntervallBalken` | function | 22061 |
| `uiKennzahlKachel` | function | 21951 |
| `uiKernaussage` | function | 21971 |
| `uiMethodenbox` | function | 22080 |
| `uiNotiz` | function | 22097 |
| `uiObjektseite` | function | 22245 |
| `uiObjektseiteSortTabs` | function | 22227 |
| `uiPlatzhalter` | function | 22177 |
| `uiQuoteText` | function | 22133 |
| `uiRangliste` | function | 22007 |
| `uiReliabilityDots` | function | 21906 |
| `uiVerlauf` | function | 22035 |
| `uniqueList` | function | 1870 |
| `updateCoverAllTimeStats` | function | 8297 |
| `updatePlayerRoleAvailability` | function | 4713 |
| `validateGameStructure` | function | 6199 |
| `validateMergedSeason` | function | 6286 |
| `validateSeasonGames` | function | 6240 |
| `validateSeasonKey` | function | 6263 |
| `validateWrapperFormat` | function | 6275 |
| `variance` | function | 2933 |
| `viewEinsatzCenterMergedView` | window | 7570 |
| `warnEventProcessingOnce` | function | 2628 |
| `withoutHashSync` | function | 3399 |

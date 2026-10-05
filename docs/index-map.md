# Code-Karte: index.html

<!-- index-map: source-sha256=a6b0c1b04c4c5e5886055f659b931bf63c3564eb84be5659e6f92b0c55490afd source-lines=23323 -->

Automatisch erzeugt von `scripts/build-index-map.mjs`. Nicht von Hand bearbeiten — bei Änderungen an index.html erneut ausführen: `node scripts/build-index-map.mjs --write`. Vor gezieltem Lesen prüfen, ob die Karte noch aktuell ist: `node scripts/build-index-map.mjs --check`.

index.html: 23323 Zeilen gesamt (SHA-256 `a6b0c1b04c4c5e5886055f659b931bf63c3564eb84be5659e6f92b0c55490afd`). Statischer `<style>`-Block: Zeile 11–1550. Haupt-`<script>`-Block: Zeile 1664–23319.

**Leseregel (siehe CLAUDE.md):** index.html nie vollständig laden. Diese Karte nennen, den gesuchten Namen im Register unten finden, dann nur den genannten Zeilenbereich lesen.

## Große Bereiche

Top-Level-Blöcke (Funktionen oder Daten-consts) ab 30 Zeilen oder 2000 Zeichen (z. B. `SEASON_CONFIG`). Das Zeichen-Kriterium existiert wegen des früheren `STATIC_SEASON_DATA`-Blocks — seit Token-Diät Teil 2 in `season-data-embedded.js` ausgelagert, siehe docs/season-data-import.md, deshalb unten nicht mehr gelistet:

| Name | Art | Zeile | Zeilen |
|---|---|---|---|
| `SEASON_CONFIG` | const-data | 1718–1810 | 93 |
| `TYPE_DESC` | const-data | 1913–1936 | 24 |
| `ROLE_TRAIT_COLORS` | const-data | 2021–2060 | 40 |
| `ROLE_TRAIT_TOOLTIPS` | const-data | 2082–2121 | 40 |
| `appendSeasonGameDiagnostics` | function | 2559–2624 | 66 |
| `resolveRosterPlayerByRef` | function | 2827–2857 | 31 |
| `processGame` | function | 2940–2997 | 58 |
| `parseAppHash` | function | 3247–3278 | 32 |
| `applyAppHash` | function | 3485–3515 | 31 |
| `getOrCreatePlayerProfile` | function | 3728–3760 | 33 |
| `toPublicPlayerRegistry` | function | 3915–3944 | 30 |
| `aggregateAllTimePlayers` | function | 3946–3979 | 34 |
| `emptySpecialTeamsStats` | function | 4040–4080 | 41 |
| `mergeSpecialTeamsStats` | function | 4094–4123 | 30 |
| `buildSpecialTeamsForGame` | function | 4239–4432 | 194 |
| `addGoalieGameToStats` | function | 4492–4542 | 51 |
| `buildGoalieGameRecord` | function | 4544–4592 | 49 |
| `buildGoalieStatsForSeason` | function | 4594–4673 | 80 |
| `aggregateGoalieAlltimeStats` | function | 4675–4709 | 35 |
| `getAssistDiagnostics` | function | 4736–4788 | 53 |
| `buildPlayerEvents` | function | 4918–5002 | 85 |
| `computeMetrics` | function | 5022–5154 | 133 |
| `buildSoloDuoProfile` | function | 5176–5219 | 44 |
| `identityInputs` | function | 5306–5363 | 58 |
| `buildIdentityProfiles` | function | 5407–5638 | 232 |
| `assignStatus` | function | 5685–5870 | 186 |
| `fetchTextWithDiagnostics` | function | 5905–5934 | 30 |
| `fetchSeasonGameRaw` | function | 5970–6009 | 40 |
| `validateGameStructure` | function | 6197–6236 | 40 |
| `buildDryRunReport` | function | 6303–6365 | 63 |
| `stageSeasonDataPreview` | function | 6436–6487 | 52 |
| `rSeasonDataPreviewCard` | function | 6540–6575 | 36 |
| `computeEinsatzCenterStats` | function | 6769–6799 | 31 |
| `rEinsatzCenterStats` | function | 6806–6824 | 19 |
| `einsatzCenterDeserializeAutosave` | function | 7027–7060 | 34 |
| `rEinsatzCenterGroupEditor` | function | 7370–7400 | 31 |
| `rEinsatzCenterRosterSuggestionCard` | function | 7417–7447 | 31 |
| `rEinsatzCenterGameEditor` | function | 7448–7500 | 53 |
| `rEinsatzCenterEditPage` | function | 7501–7548 | 48 |
| `loadSeasonData` | function | 7796–8265 | 470 |
| `loadSeasonForGlobal` | function | 8305–8335 | 31 |
| `loadSeason` | function | 8353–8404 | 52 |
| `ensureHallOfFameIntroOverlay` | function | 8432–8464 | 33 |
| `rMatrix` | function | 8852–8896 | 45 |
| `rRadar` | function | 8929–8976 | 48 |
| `rClutch` | function | 8979–9011 | 33 |
| `rTimeline` | function | 9014–9122 | 109 |
| `rOppBreakdown` | function | 9144–9176 | 33 |
| `generatePlayerInsights` | function | 9179–9222 | 44 |
| `rInsights` | function | 9240–9291 | 52 |
| `buildGoalieAnalysisModel` | function | 9558–9716 | 159 |
| `buildGoalieRoleProfile` | function | 9781–9854 | 74 |
| `rGoalieInsights` | function | 9973–9994 | 22 |
| `buildOpponentIntelligence` | function | 10432–10485 | 54 |
| `buildBestThirdManOptions` | function | 10635–10668 | 34 |
| `getDuoDirectScorerGameCounts` | function | 10669–10700 | 32 |
| `buildAnnotatedGoalEventsForGame` | function | 10750–10850 | 101 |
| `buildResponseGoalStatsRaw` | function | 10893–10941 | 49 |
| `buildMomentumSwingStatsRaw` | function | 10954–11024 | 71 |
| `buildDuoFloorCeiling` | function | 11031–11072 | 42 |
| `buildDuoWithWithoutImpact` | function | 11168–11201 | 34 |
| `buildDuoCompatibility` | function | 11267–11289 | 23 |
| `buildDuoProAnalysis` | function | 11326–11369 | 44 |
| `rDuoCenterPro` | function | 11370–11489 | 120 |
| `rInteractiveDuoCenterPro` | function | 11564–11619 | 56 |
| `getDifficultConnectionRowsForPlayer` | function | 11623–11667 | 45 |
| `getRosterImpactPlayerGames` | function | 11760–11801 | 42 |
| `buildRosterImpactAnalysis` | function | 11835–11903 | 69 |
| `rDifficultConnectionList` | function | 11980–12004 | 25 |
| `rDifficultConnectionListCompactLegacy` | function | 12005–12046 | 42 |
| `rDifficultConnectionListCompact` | function | 12047–12085 | 39 |
| `rDifficultConnectionsCard` | function | 12086–12122 | 37 |
| `RESPONSE_MOMENTUM_TOOLTIPS` | const-data | 12125–12156 | 32 |
| `rResponseMomentumOverviewCard` | function | 12219–12242 | 24 |
| `rMatchcenterResponseMomentum` | function | 12289–12326 | 38 |
| `getTeamAllTimeRecords` | function | 12328–12368 | 41 |
| `getAllTimeIdentityStandings` | function | 12449–12483 | 35 |
| `buildRecencyWeightedGlobalIdentityProfile` | function | 12485–12532 | 48 |
| `rHallOfFameHero` | function | 12588–12613 | 26 |
| `hallGoalieRowFromStats` | function | 12711–12743 | 33 |
| `rHallGoalieRankCard` | function | 12796–12827 | 32 |
| `rHallGoalieLegends` | function | 12845–12877 | 33 |
| `buildDuoComparison` | function | 13272–13291 | 20 |
| `rDuoCompareSummaryCards` | function | 13297–13327 | 31 |
| `rDuoComparisonPage` | function | 13428–13438 | 11 |
| `buildComparisonExtraMetrics` | function | 13483–13540 | 58 |
| `buildGoalieComparisonDataset` | function | 13577–13627 | 51 |
| `buildComparisonDataset` | function | 13628–13663 | 36 |
| `rKpiMirrorRows` | function | 13689–13748 | 60 |
| `rKpiRadar` | function | 13760–13794 | 35 |
| `rKpiTrendCompare` | function | 13841–13907 | 67 |
| `rKpiOpponentStrength` | function | 13908–13935 | 28 |
| `rKpiInfoCards` | function | 13946–13977 | 32 |
| `buildComparisonSummary` | function | 13978–14009 | 32 |
| `rComparisonStyles` | function | 14047–14084 | 38 |
| `rComparisonCenterPage` | function | 14085–14135 | 51 |
| `rGlobalDnaBars` | function | 14176–14205 | 30 |
| `buildSeasonPlayerDashModel` | function | 14275–14311 | 37 |
| `buildAlltimePlayerDashModel` | function | 14312–14354 | 43 |
| `rPlayerDashStyles` | function | 14355–14366 | 12 |
| `rPlayerDash` | function | 14373–14411 | 39 |
| `rGlobalOverview` | function | 14470–14521 | 52 |
| `rGlobalDevelopment` | function | 14541–14579 | 39 |
| `rGlobalDuoNetwork` | function | 14641–14838 | 198 |
| `rGlobalOpponentSpecialist` | function | 14840–14885 | 46 |
| `buildFieldPlayerExplanation` | function | 14951–15025 | 75 |
| `buildGoaliePlayerExplanation` | function | 15026–15079 | 54 |
| `buildPlayerIntelligence` | function | 15089–15118 | 30 |
| `rPlayerExplanation` | function | 15124–15175 | 52 |
| `rAllTimePlayersPage` | function | 15177–15217 | 41 |
| `rHallOfFamePage` | function | 15219–15307 | 89 |
| `rLexiconPage` | function | 15334–15506 | 173 |
| `buildConfidence` | function | 15523–15568 | 46 |
| `getMatchcenterOpponents` | function | 15732–15764 | 33 |
| `getMatchcenterDirectOpponents` | function | 15765–15795 | 31 |
| `matchcenterAnalyzeDirect` | function | 15798–15834 | 37 |
| `matchcenterEnsureUlmPlayer` | function | 15891–15928 | 38 |
| `matchcenterAddUlmScoring` | function | 15953–15990 | 38 |
| `matchcenterFinalizeUlmPlayers` | function | 15991–16059 | 69 |
| `matchcenterBuildUlmPlayerScouting` | function | 16060–16114 | 55 |
| `matchcenterEnsureOpponentDuo` | function | 16132–16164 | 33 |
| `matchcenterFinalizeOpponentDuos` | function | 16191–16225 | 35 |
| `matchcenterBuildOpponentDuos` | function | 16226–16270 | 45 |
| `matchcenterEnsureUlmDuo` | function | 16285–16322 | 38 |
| `matchcenterFinalizeUlmDuos` | function | 16342–16377 | 36 |
| `matchcenterBuildUlmDuos` | function | 16378–16420 | 43 |
| `matchcenterBuildSpecialTeamsMatchup` | function | 16454–16501 | 48 |
| `matchcenterBuildGoalieMatchup` | function | 16524–16569 | 46 |
| `matchcenterTimingStatsForGames` | function | 16602–16638 | 37 |
| `rMatchcenterUlmScouting` | function | 16982–17018 | 37 |
| `rMatchcenterOpponentScouting` | function | 17019–17054 | 36 |
| `rMatchcenterUlmDuos` | function | 17163–17205 | 43 |
| `rMatchcenterOpponentDuos` | function | 17206–17248 | 43 |
| `rMatchcenterSpecialTeams` | function | 17261–17310 | 50 |
| `matchcenterBuildPlanConfidence` | function | 17401–17435 | 35 |
| `matchcenterBuildIntelligenceDataQuality` | function | 17484–17534 | 51 |
| `matchcenterBuildOpponentDNA` | function | 17535–17647 | 113 |
| `matchcenterBuildOpponentAlarm` | function | 17714–17823 | 110 |
| `matchcenterBuildIntelligenceSignals` | function | 17870–17916 | 47 |
| `buildMatchIntelligenceFromContext` | function | 17917–17971 | 55 |
| `buildMatchStories` | function | 18020–18049 | 30 |
| `buildDigitalCoachReport` | function | 18120–18152 | 33 |
| `buildMatchdayCaptionBlocks` | function | 18224–18253 | 30 |
| `buildSocialMediaContent` | function | 18254–18302 | 49 |
| `lineupRosterGamesForPlayer` | function | 18370–18417 | 48 |
| `buildLineupExperienceProfile` | function | 18418–18460 | 43 |
| `buildLineupOpponentDNAFit` | function | 18473–18516 | 44 |
| `classifyLineIdentity` | function | 18517–18564 | 48 |
| `lineupPlayerProfile` | function | 18565–18640 | 76 |
| `buildLineupAnalysis` | function | 18641–18774 | 134 |
| `buildLineupScoreBreakdowns` | function | 18775–18804 | 30 |
| `lineupEvaluateComplementCandidate` | function | 18888–18966 | 79 |
| `buildTeamLineBalance` | function | 18992–19035 | 44 |
| `buildLineupRecommendations` | function | 19072–19153 | 82 |
| `matchcenterBuildMatchPlan` | function | 19182–19327 | 146 |
| `rMatchcenterOpponentDNA` | function | 19362–19394 | 33 |
| `rMatchcenterIntelOverview` | function | 19417–19462 | 46 |
| `rMatchcenterDigitalCoach` | function | 19504–19568 | 65 |
| `rMatchcenterLockerRoomSheet` | function | 19586–19641 | 56 |
| `downloadMatchdayStory` | window | 19660–19707 | 48 |
| `rSocialVideoBlock` | function | 19711–19742 | 32 |
| `generateSocialVideoVideos` | window | 19752–19793 | 42 |
| `rMatchcenterSocialMediaCenter` | function | 19844–19897 | 54 |
| `rMatchcenterLineupBuilder` | function | 19929–20001 | 73 |
| `rLineupBuilderAvailablePanel` | function | 20016–20063 | 48 |
| `rLineupRecommendationMode` | function | 20079–20112 | 34 |
| `rLineupTestLine` | function | 20126–20174 | 49 |
| `rLineupBuilderPage` | function | 20192–20226 | 35 |
| `rMatchcenterScoutingSummary` | function | 20227–20270 | 44 |
| `getTeamLogoUrlForStory` | function | 20315–20344 | 30 |
| `matchcenterStoryPickFactItems` | function | 20467–20519 | 53 |
| `buildMatchcenterStoryPreviewData` | function | 20738–20849 | 112 |
| `matchcenterStoryVisibleFacts` | function | 20856–20886 | 31 |
| `rMatchcenterStoryPreview` | function | 20905–20974 | 70 |
| `fitMatchcenterStoryLayout` | function | 20981–21023 | 43 |
| `rMatchcenterPage` | function | 21102–21250 | 149 |
| `rTeamPage` | function | 21251–21588 | 338 |
| `_render` | function | 21638–21807 | 170 |
| `uiObjektseite` | function | 22193–22226 | 34 |
| `rMatchdayDetailPage` | function | 22463–22502 | 40 |
| `buildOverviewCards` | function | 22774–22814 | 41 |

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

1039 `function`-Deklarationen, 134 `window.`-Funktionszuweisungen, 4 `const`-Pfeilfunktionen — alle Top-Level, sortiert nach Zeile.

| Name | Art | Zeile | Zeilen |
|---|---|---|---|
| `createSeasonBucket` | function | 1811–1825 | 15 |
| `getSeasonApiBaseUrl` | function | 1836–1852 | 17 |
| `seasonApiUrl` | function | 1853–1855 | 3 |
| `getSeasonOriginBaseUrl` | function | 1856–1864 | 9 |
| `seasonPathPrefix` | function | 1865–1867 | 3 |
| `uniqueList` | function | 1868–1870 | 3 |
| `seasonGameApiUrls` | function | 1871–1880 | 10 |
| `seasonGameHtmlUrls` | function | 1881–1888 | 8 |
| `clearAnalysisCache` | function | 2186–2188 | 3 |
| `analysisCacheContext` | function | 2189–2203 | 15 |
| `asOfCacheKeyPart` | function | 2217–2222 | 6 |
| `analysisCacheKey` | function | 2223–2226 | 4 |
| `cachedAnalysis` | function | 2227–2232 | 6 |
| `setState` | const-arrow | 2233–2240 | 8 |
| `invalidateGlobalIdentityCache` | function | 2241–2243 | 3 |
| `setP` | window | 2245–2245 | 1 |
| `setTab` | window | 2246–2246 | 1 |
| `setPlayerRoleView` | window | 2247–2247 | 1 |
| `setGoalieTab` | window | 2248–2248 | 1 |
| `toggleSpecialTeamsGameDetails` | window | 2249–2249 | 1 |
| `toggleMatchcenterSpecialTeamsGames` | window | 2250–2250 | 1 |
| `toggleMatchcenterPlayerDetails` | window | 2251–2251 | 1 |
| `toggleMatchcenterDuoDetails` | window | 2252–2252 | 1 |
| `setMatchcenterTab` | window | 2253–2253 | 1 |
| `openMatchcenterStoryPreview` | window | 2254–2254 | 1 |
| `closeMatchcenterStoryPreview` | window | 2255–2255 | 1 |
| `toggleHallOfFamePureSGPlayers` | window | 2256–2256 | 1 |
| `copyMatchcenterText` | window | 2257–2282 | 26 |
| `addLineupPlayer` | window | 2283–2288 | 6 |
| `removeLineupPlayer` | window | 2289–2289 | 1 |
| `clearLineupPlayers` | window | 2290–2290 | 1 |
| `filterLineupPlayers` | window | 2291–2297 | 7 |
| `lineupBuilderPoolIds` | function | 2298–2300 | 3 |
| `normalizeLineupLines` | function | 2301–2305 | 5 |
| `setLineupBuilderSeason` | window | 2306–2317 | 12 |
| `setLineupBuilderOpponent` | window | 2318–2318 | 1 |
| `setLineupBuilderMode` | window | 2319–2319 | 1 |
| `setLineupActiveLine` | window | 2320–2320 | 1 |
| `toggleLineupBuilderAvailable` | window | 2321–2334 | 14 |
| `selectAllLineupAvailable` | window | 2335–2335 | 1 |
| `clearLineupAvailable` | window | 2336–2336 | 1 |
| `addLineupBuilderPlayerToLine` | window | 2337–2346 | 10 |
| `addLineupBuilderPlayerToActiveLine` | window | 2347–2347 | 1 |
| `removeLineupBuilderPlayerFromLine` | window | 2348–2354 | 7 |
| `clearLineupBuilderLine` | window | 2355–2360 | 6 |
| `showLineupComplements` | window | 2361–2361 | 1 |
| `setLineupNewPlayerProfile` | window | 2362–2362 | 1 |
| `addSyntheticLineupPlayer` | window | 2363–2380 | 18 |
| `setAntiSynergyView` | window | 2381–2381 | 1 |
| `toggleAntiSynergyShowAll` | window | 2382–2382 | 1 |
| `toggleAntiSynergyHideSgOnly` | window | 2383–2383 | 1 |
| `filterLineupBuilderAvailable` | window | 2384–2390 | 7 |
| `setPage` | window | 2391–2399 | 9 |
| `backToHome` | window | 2400–2406 | 7 |
| `setGlobalPlayer` | window | 2407–2407 | 1 |
| `setGlobalPlayerDuo` | window | 2408–2408 | 1 |
| `setGlobalTab` | window | 2409–2409 | 1 |
| `toggleSgOnlyAlltime` | window | 2410–2410 | 1 |
| `getActiveSeasonKey` | function | 2412–2414 | 3 |
| `getGlobalAllTimeSnapshot` | function | 2416–2423 | 8 |
| `applySeasonContext` | function | 2424–2447 | 24 |
| `fixMojibakeText` | function | 2461–2463 | 3 |
| `repairRenderedMojibake` | function | 2464–2485 | 22 |
| `getAllTimeOpponentNames` | function | 2490–2497 | 8 |
| `getUniqueAllTimeOpponentNames` | function | 2498–2500 | 3 |
| `getUlmTeamStatus` | function | 2503–2507 | 5 |
| `detectUlmSide` | function | 2508–2514 | 7 |
| `detectSide` | const-arrow | 2515–2515 | 1 |
| `normalizePlayerName` | function | 2518–2527 | 10 |
| `getPreClubHistoryPlayerNames` | function | 2528–2530 | 3 |
| `isPreClubHistoryPlayerName` | function | 2531–2535 | 5 |
| `diagnoseGameDuplicates` | function | 2537–2550 | 14 |
| `gameClassificationStatusLabel` | function | 2551–2558 | 8 |
| `appendSeasonGameDiagnostics` | function | 2559–2624 | 66 |
| `warnEventProcessingOnce` | function | 2626–2633 | 8 |
| `rosterPlayerMatches` | function | 2634–2648 | 15 |
| `getRosterGameIdsForPlayer` | function | 2649–2657 | 9 |
| `isGoalieRosterEntry` | function | 2658–2662 | 5 |
| `goalieEntryRecognitionReason` | function | 2672–2681 | 10 |
| `isExcludedGoalieAppearance` | function | 2682–2695 | 14 |
| `isGoalieAppearance` | function | 2696–2701 | 6 |
| `isFieldAppearance` | function | 2702–2707 | 6 |
| `getFieldGameIdsForPlayer` | function | 2708–2714 | 7 |
| `getGoalieGameIdsForPlayer` | function | 2715–2721 | 7 |
| `getPlayerFieldGames` | function | 2722–2725 | 4 |
| `getPlayerGoalieGames` | function | 2726–2729 | 4 |
| `roleGameStableKey` | function | 2730–2732 | 3 |
| `getPlayerAlltimeRoleGames` | function | 2733–2751 | 19 |
| `getPlayerAlltimeFieldGames` | function | 2752–2754 | 3 |
| `getPlayerAlltimeGoalieGames` | function | 2755–2757 | 3 |
| `getPlayerAlltimeTotalGames` | function | 2758–2766 | 9 |
| `getPlayerSeasonRoleGameSummary` | function | 2767–2789 | 23 |
| `getPlayedUlmGames` | function | 2790–2798 | 9 |
| `countPlayedUlmGames` | function | 2799–2801 | 3 |
| `getSeasonTeamGames` | function | 2802–2805 | 4 |
| `getSeasonTeamGameIds` | function | 2806–2808 | 3 |
| `getPlayerSourceId` | function | 2809–2811 | 3 |
| `getJerseyNumber` | function | 2812–2814 | 3 |
| `normalizeEventPlayerRef` | function | 2815–2826 | 12 |
| `resolveRosterPlayerByRef` | function | 2827–2857 | 31 |
| `resolveGoalScorerPlayer` | function | 2858–2872 | 15 |
| `getGoalScorerFromEvent` | function | 2873–2875 | 3 |
| `normalizeAssistPlayerName` | function | 2876–2878 | 3 |
| `collectAssistEventRefs` | function | 2879–2906 | 28 |
| `getAssistPlayersFromEvent` | function | 2907–2920 | 14 |
| `resolveAssistPlayer` | function | 2921–2927 | 7 |
| `t2s` | const-arrow | 2929–2929 | 1 |
| `variance` | function | 2931–2935 | 5 |
| `processGame` | function | 2940–2997 | 58 |
| `isGamePlayed` | function | 2999–3001 | 3 |
| `deriveAsOfForSeason` | function | 3032–3035 | 4 |
| `seasonKeyToHashSegment` | function | 3137–3139 | 3 |
| `hashSegmentToSeasonKey` | function | 3140–3143 | 4 |
| `isValidAsOfDate` | function | 3144–3146 | 3 |
| `isValidAsOfStartTime` | function | 3147–3149 | 3 |
| `asOfEquals` | function | 3156–3163 | 8 |
| `decodeHashSegmentSafe` | function | 3227–3229 | 3 |
| `parseAppHash` | function | 3247–3278 | 32 |
| `parseAsOfQueryValue` | function | 3286–3296 | 11 |
| `buildAppHash` | function | 3302–3314 | 13 |
| `buildGlobalPageHash` | function | 3319–3328 | 10 |
| `buildHashStringFromParsed` | function | 3334–3338 | 5 |
| `computeCurrentAppHash` | function | 3354–3366 | 13 |
| `syncHashFromState` | function | 3380–3390 | 11 |
| `withoutHashSync` | function | 3397–3405 | 9 |
| `parseLastViewState` | function | 3421–3432 | 12 |
| `getStoredLastView` | function | 3433–3436 | 4 |
| `saveLastView` | function | 3438–3440 | 3 |
| `applyGlobalPageFromHash` | function | 3452–3472 | 21 |
| `applyAppHash` | function | 3485–3515 | 31 |
| `initHashRouting` | function | 3564–3582 | 19 |
| `gameResult` | function | 3585–3591 | 7 |
| `getOppStrength` | function | 3598–3604 | 7 |
| `createPlayerAnalysisProfile` | function | 3616–3618 | 3 |
| `emptyPlayerSeasonStats` | function | 3620–3625 | 6 |
| `emptyGoalieSeasonStats` | function | 3626–3647 | 22 |
| `emptyGoalieAlltimeStats` | function | 3648–3662 | 15 |
| `emptyGoalieSpecialTeamsStats` | function | 3663–3674 | 12 |
| `emptyFieldRoleSeasonStats` | function | 3675–3677 | 3 |
| `addUnique` | function | 3679–3681 | 3 |
| `incrementUniqueCounter` | function | 3683–3688 | 6 |
| `buildPlayerIdentity` | function | 3690–3705 | 16 |
| `resetPlayerRegistrySeason` | function | 3707–3717 | 11 |
| `derivePlayerStatus` | function | 3719–3726 | 8 |
| `getOrCreatePlayerProfile` | function | 3728–3760 | 33 |
| `registerPlayerIdentity` | function | 3762–3778 | 17 |
| `ensureGoalieSeasonStats` | function | 3780–3784 | 5 |
| `ensureFieldRoleSeasonStats` | function | 3785–3789 | 5 |
| `markFieldRoleAppearance` | function | 3790–3793 | 4 |
| `registerSeasonRosters` | function | 3795–3813 | 19 |
| `linkUiPlayersToRegistry` | function | 3815–3835 | 21 |
| `applySeasonScoringToRegistry` | function | 3837–3858 | 22 |
| `finalizePlayerRegistrySeason` | function | 3860–3874 | 15 |
| `serializeSeasonStats` | function | 3876–3888 | 13 |
| `serializeGoalieSeasonStats` | function | 3889–3910 | 22 |
| `serializeFieldRoleSeasonStats` | function | 3911–3913 | 3 |
| `toPublicPlayerRegistry` | function | 3915–3944 | 30 |
| `aggregateAllTimePlayers` | function | 3946–3979 | 34 |
| `finiteNumbers` | function | 3981–3983 | 3 |
| `avgOrNull` | function | 3984–3987 | 4 |
| `medianOrNull` | function | 3988–3993 | 6 |
| `incGoalieBucket` | function | 3994–3997 | 4 |
| `goalieEventAbsSeconds` | function | 3998–4003 | 6 |
| `goalieGameDurationSeconds` | function | 4004–4008 | 5 |
| `goalieGameStateBeforeGoal` | function | 4009–4020 | 12 |
| `getGoalieOpponentName` | function | 4021–4024 | 4 |
| `getGoalieOpponentTier` | function | 4025–4029 | 5 |
| `resultGoalsAgainstForSide` | function | 4030–4039 | 10 |
| `emptySpecialTeamsStats` | function | 4040–4080 | 41 |
| `clonePlain` | function | 4081–4083 | 3 |
| `finalizeSpecialTeamsStats` | function | 4084–4090 | 7 |
| `serializeSpecialTeamsStats` | function | 4091–4093 | 3 |
| `mergeSpecialTeamsStats` | function | 4094–4123 | 30 |
| `penaltyRawText` | function | 4126–4128 | 3 |
| `isMatchPenaltyEvent` | function | 4129–4132 | 4 |
| `isTwoPlusTwoPenaltyEvent` | function | 4133–4136 | 4 |
| `getPenaltyDisciplineType` | function | 4137–4144 | 8 |
| `getGameDurationMinutes` | function | 4145–4149 | 5 |
| `gameDaySortValue` | function | 4150–4157 | 8 |
| `isSameUlmTeamContext` | function | 4158–4165 | 8 |
| `getFurtherSameDayUlmGames` | function | 4166–4177 | 12 |
| `getPenaltySpecialTeamsMinutes` | function | 4178–4180 | 3 |
| `getPenaltyBasePersonalMinutes` | function | 4181–4188 | 8 |
| `getPenaltyPersonalMinutes` | function | 4189–4198 | 10 |
| `getPenaltyDisciplineMinutes` | function | 4199–4201 | 3 |
| `getSpecialTeamsPenaltyChunks` | function | 4202–4211 | 10 |
| `isPenaltyGoalEvent` | function | 4212–4216 | 5 |
| `specialTeamsStateFromActive` | function | 4217–4223 | 7 |
| `annotateSpecialTeamsGoalEvent` | function | 4224–4238 | 15 |
| `buildSpecialTeamsForGame` | function | 4239–4432 | 194 |
| `buildSpecialTeamsForSeason` | function | 4433–4441 | 9 |
| `aggregateAlltimeSpecialTeams` | function | 4442–4449 | 8 |
| `mergeGoalieSpecialTeamsStats` | function | 4450–4461 | 12 |
| `addGoalieSpecialTeamsGameToStats` | function | 4462–4476 | 15 |
| `finalizeGoalieSeasonStats` | function | 4477–4491 | 15 |
| `addGoalieGameToStats` | function | 4492–4542 | 51 |
| `buildGoalieGameRecord` | function | 4544–4592 | 49 |
| `buildGoalieStatsForSeason` | function | 4594–4673 | 80 |
| `aggregateGoalieAlltimeStats` | function | 4675–4709 | 35 |
| `updatePlayerRoleAvailability` | function | 4711–4720 | 10 |
| `getGoalieDiagnostics` | function | 4722–4727 | 6 |
| `getSpecialTeamsDiagnostics` | function | 4729–4734 | 6 |
| `getAssistDiagnostics` | function | 4736–4788 | 53 |
| `buildSeasonDuos` | function | 4791–4817 | 27 |
| `mergeDuoSet` | function | 4818–4834 | 17 |
| `aggregateAllTimeDuos` | function | 4835–4845 | 11 |
| `aggregateSeasonStats` | function | 4847–4862 | 16 |
| `buildPlayerDataFoundation` | function | 4864–4885 | 22 |
| `buildRegistry` | function | 4887–4913 | 27 |
| `buildPlayerEvents` | function | 4918–5002 | 85 |
| `getPhaseIndex` | function | 5007–5017 | 11 |
| `computeMetrics` | function | 5022–5154 | 133 |
| `detectTypes` | function | 5156–5171 | 16 |
| `pct` | function | 5173–5173 | 1 |
| `ratio01` | function | 5174–5174 | 1 |
| `relative01` | function | 5175–5175 | 1 |
| `buildSoloDuoProfile` | function | 5176–5219 | 44 |
| `identityPartnerStats` | function | 5220–5233 | 14 |
| `identityOpponentGroups` | function | 5234–5241 | 8 |
| `eventMatchesTeams` | function | 5242–5247 | 6 |
| `clutchText` | function | 5248–5248 | 1 |
| `isImportantClutchGoal` | function | 5249–5253 | 5 |
| `isDecisiveGoal` | function | 5254–5256 | 3 |
| `isLateGoal` | function | 5257–5261 | 5 |
| `isComebackRelevantGoal` | function | 5262–5265 | 4 |
| `identityPointsVsTeams` | function | 5266–5268 | 3 |
| `identityGoalsVsTeams` | function | 5269–5271 | 3 |
| `identityClutchGoalsVsTeams` | function | 5272–5274 | 3 |
| `identityDecisiveGoalsVsTeams` | function | 5275–5277 | 3 |
| `identityLateGoalsVsTeams` | function | 5278–5280 | 3 |
| `countMomentumClusters` | function | 5281–5305 | 25 |
| `identityInputs` | function | 5306–5363 | 58 |
| `clearlyAboveAverage` | function | 5364–5364 | 1 |
| `normalizeSecondaryTraits` | function | 5365–5376 | 12 |
| `seasonRoleTraitsFromClassic` | function | 5377–5381 | 5 |
| `seasonRoleKeysForPlayer` | function | 5382–5390 | 9 |
| `hasSeasonRole` | function | 5391–5393 | 3 |
| `selectEnforcerKeys` | function | 5394–5406 | 13 |
| `buildIdentityProfiles` | function | 5407–5638 | 232 |
| `composeIdentityText` | function | 5639–5645 | 7 |
| `countCaptainAppearances` | function | 5647–5659 | 13 |
| `countGoalieAppearances` | function | 5661–5663 | 3 |
| `computeRosterStatus` | function | 5665–5683 | 19 |
| `assignStatus` | function | 5685–5870 | 186 |
| `fetchJsonLegacy` | function | 5876–5895 | 20 |
| `responseExcerpt` | function | 5897–5899 | 3 |
| `diagnosticError` | function | 5900–5904 | 5 |
| `fetchTextWithDiagnostics` | function | 5905–5934 | 30 |
| `fetchJsonWithDiagnostics` | function | 5935–5943 | 9 |
| `fetchJson` | function | 5944–5947 | 4 |
| `formatStatus` | function | 5948–5950 | 3 |
| `formatDiagnosticAttempt` | function | 5951–5963 | 13 |
| `formatGameLoadError` | function | 5964–5969 | 6 |
| `fetchSeasonGameRaw` | function | 5970–6009 | 40 |
| `getStaticSeasonGames` | function | 6013–6016 | 4 |
| `loadSeasonManifest` | function | 6028–6044 | 17 |
| `resolveCurrentSeasonKey` | function | 6059–6078 | 20 |
| `applyCurrentSeasonCoverHighlight` | function | 6079–6083 | 5 |
| `isUsableExternalSeasonData` | function | 6096–6104 | 9 |
| `ensureExternalSeasonData` | function | 6105–6126 | 22 |
| `buildStaticSeasonDataBlock` | function | 6127–6136 | 10 |
| `getGameId` | function | 6163–6167 | 5 |
| `findDuplicateGameIds` | function | 6169–6179 | 11 |
| `validateGameStructure` | function | 6197–6236 | 40 |
| `validateSeasonGames` | function | 6238–6248 | 11 |
| `diffGameIds` | function | 6250–6259 | 10 |
| `validateSeasonKey` | function | 6261–6271 | 11 |
| `validateWrapperFormat` | function | 6273–6282 | 10 |
| `validateMergedSeason` | function | 6284–6301 | 18 |
| `buildDryRunReport` | function | 6303–6365 | 63 |
| `seasonDataPreviewRerender` | function | 6386–6388 | 3 |
| `seasonDataPreviewRow` | function | 6390–6401 | 12 |
| `buildSeasonDataPreviewChanges` | function | 6408–6425 | 18 |
| `stageSeasonDataPreview` | function | 6436–6487 | 52 |
| `stageSeasonDataPreviewFromFile` | function | 6488–6501 | 14 |
| `stageSeasonDataPreviewFromPaste` | function | 6502–6506 | 5 |
| `discardSeasonDataPreview` | function | 6507–6511 | 5 |
| `getSeasonDataPreview` | function | 6513–6515 | 3 |
| `isSeasonDataPreviewStale` | function | 6521–6525 | 5 |
| `rSeasonDataPreviewStatus` | function | 6527–6529 | 3 |
| `rSeasonDataPreviewRows` | function | 6530–6538 | 9 |
| `rSeasonDataPreviewCard` | function | 6540–6575 | 36 |
| `setSeasonDataPreviewOpen` | window | 6576–6576 | 1 |
| `setSeasonDataPreviewPasteText` | window | 6577–6577 | 1 |
| `fileNameForLineupSeasonKey` | function | 6597–6599 | 3 |
| `ensureLineupDataLoaded` | function | 6615–6631 | 17 |
| `ensureLineupGroupsRegistryLoaded` | function | 6640–6656 | 17 |
| `resolveLineupPlayerName` | function | 6668–6671 | 4 |
| `findLineupGameContext` | function | 6674–6681 | 8 |
| `rEinsatzCenterGroup` | function | 6683–6694 | 12 |
| `rEinsatzCenterCombo` | function | 6696–6703 | 8 |
| `rEinsatzCenterGameCard` | function | 6705–6722 | 18 |
| `rEinsatzCenterPage` | function | 6724–6743 | 20 |
| `setEinsatzCenterSeason` | window | 6745–6750 | 6 |
| `openEinsatzCenter` | window | 6751–6758 | 8 |
| `computeEinsatzCenterStats` | function | 6769–6799 | 31 |
| `lineupGroupDisplayName` | function | 6800–6805 | 6 |
| `rEinsatzCenterStats` | function | 6806–6824 | 19 |
| `getEffectiveLineupData` | function | 6882–6889 | 8 |
| `isEinsatzCenterGameFromDraft` | function | 6891–6894 | 4 |
| `einsatzCenterDraftInView` | function | 6896–6899 | 4 |
| `rEinsatzCenterDraftMark` | function | 6900–6903 | 4 |
| `rEinsatzCenterDraftStatsHint` | function | 6904–6908 | 5 |
| `einsatzCenterDraftStaleHint` | function | 6910–6912 | 3 |
| `rEinsatzCenterDraftBanner` | function | 6914–6921 | 8 |
| `ensureEinsatzCenterDraft` | function | 6932–6945 | 14 |
| `getEinsatzCenterGameDraft` | function | 6954–6965 | 12 |
| `einsatzCenterAutosaveKey` | function | 6992–6992 | 1 |
| `einsatzCenterStorageRead` | function | 6993–6995 | 3 |
| `einsatzCenterStorageWrite` | function | 6996–6998 | 3 |
| `einsatzCenterStorageRemove` | function | 6999–7001 | 3 |
| `einsatzCenterDraftIsEmpty` | function | 7004–7006 | 3 |
| `einsatzCenterSerializeDraft` | function | 7008–7020 | 13 |
| `einsatzCenterIsPlainObject` | function | 7021–7021 | 1 |
| `einsatzCenterDeserializeAutosave` | function | 7027–7060 | 34 |
| `einsatzCenterCurrentRawBaseHash` | function | 7067–7072 | 6 |
| `einsatzCenterAutosaveDraft` | function | 7081–7108 | 28 |
| `einsatzCenterInspectAutosave` | function | 7116–7144 | 29 |
| `restoreEinsatzCenterAutosave` | function | 7147–7163 | 17 |
| `discardEinsatzCenterAutosave` | function | 7165–7170 | 6 |
| `rEinsatzCenterAutosaveBanner` | function | 7173–7185 | 13 |
| `einsatzCenterAutosaveInfoText` | function | 7187–7197 | 11 |
| `loadEinsatzCenterMismatchedAutosave` | function | 7211–7229 | 19 |
| `deriveLineupValidPlayerIds` | function | 7242–7258 | 17 |
| `deriveLineupUlmPlayerIds` | function | 7266–7282 | 17 |
| `getSeasonmanagerRosterSuggestion` | function | 7296–7316 | 21 |
| `einsatzCenterCanonicalJson` | function | 7325–7334 | 10 |
| `einsatzCenterSha256Hex` | function | 7335–7339 | 5 |
| `einsatzCenterComputeBaseHash` | function | 7340–7342 | 3 |
| `einsatzCenterSoftIssues` | function | 7349–7367 | 19 |
| `rEinsatzCenterGroupEditor` | function | 7370–7400 | 31 |
| `rEinsatzCenterComboEditor` | function | 7401–7407 | 7 |
| `rEinsatzCenterRosterSuggestionCard` | function | 7417–7447 | 31 |
| `rEinsatzCenterGameEditor` | function | 7448–7500 | 53 |
| `rEinsatzCenterEditPage` | function | 7501–7548 | 48 |
| `startEinsatzCenterDraftMode` | window | 7551–7555 | 5 |
| `cancelEinsatzCenterEdit` | window | 7556–7566 | 11 |
| `viewEinsatzCenterMergedView` | window | 7568–7568 | 1 |
| `returnToEinsatzCenterEdit` | window | 7569–7569 | 1 |
| `setEinsatzCenterIncludeDraft` | window | 7570–7570 | 1 |
| `selectEinsatzCenterEditGame` | window | 7571–7574 | 4 |
| `addEinsatzCenterRosterPlayer` | window | 7575–7582 | 8 |
| `removeEinsatzCenterRosterPlayer` | window | 7583–7590 | 8 |
| `toggleEinsatzCenterRosterSuggestionPlayer` | window | 7591–7597 | 7 |
| `dismissEinsatzCenterRosterSuggestion` | window | 7598–7601 | 4 |
| `acceptEinsatzCenterRosterSuggestion` | window | 7609–7625 | 17 |
| `addEinsatzCenterExistingGroup` | window | 7626–7634 | 9 |
| `addEinsatzCenterNewGroup` | window | 7635–7651 | 17 |
| `removeEinsatzCenterGroup` | window | 7652–7659 | 8 |
| `toggleEinsatzCenterGroupRename` | window | 7660–7662 | 3 |
| `renameEinsatzCenterGroup` | window | 7674–7693 | 20 |
| `addEinsatzCenterGroupPlayer` | window | 7694–7701 | 8 |
| `removeEinsatzCenterGroupPlayer` | window | 7702–7709 | 8 |
| `setEinsatzCenterGroupPlayerPosition` | window | 7710–7718 | 9 |
| `toggleEinsatzCenterComboPlayer` | window | 7719–7726 | 8 |
| `confirmEinsatzCenterCombo` | window | 7727–7737 | 11 |
| `removeEinsatzCenterCombo` | window | 7738–7744 | 7 |
| `setEinsatzCenterGameNote` | window | 7745–7751 | 7 |
| `buildEinsatzCenterDraftExport` | function | 7755–7768 | 14 |
| `exportEinsatzCenterDraft` | window | 7769–7781 | 13 |
| `loadSeasonData` | function | 7796–8265 | 470 |
| `showMainShell` | function | 8268–8272 | 5 |
| `hasSeasonSource` | function | 8273–8276 | 4 |
| `hasEmbeddedSeasonData` | function | 8277–8279 | 3 |
| `getGlobalLoadableSeasonKeys` | function | 8280–8286 | 7 |
| `getAllTimeCoverStats` | function | 8287–8294 | 8 |
| `updateCoverAllTimeStats` | function | 8295–8303 | 9 |
| `loadSeasonForGlobal` | function | 8305–8335 | 31 |
| `ensureGlobalDataLoaded` | function | 8336–8351 | 16 |
| `loadSeason` | function | 8353–8404 | 52 |
| `startApp` | window | 8406–8417 | 12 |
| `ensureAppLoaded` | function | 8408–8417 | 10 |
| `openSeason` | window | 8418–8420 | 3 |
| `openAllTimePlayers` | window | 8421–8426 | 6 |
| `hofIntroDelay` | function | 8429–8431 | 3 |
| `ensureHallOfFameIntroOverlay` | function | 8432–8464 | 33 |
| `buildHallOfFameIntroTitle` | function | 8465–8475 | 11 |
| `seedHallOfFameIntroParticles` | function | 8476–8493 | 18 |
| `cleanupHallOfFameIntro` | function | 8494–8508 | 15 |
| `restoreHallOfFameIntroPrevious` | function | 8509–8520 | 12 |
| `finishHallOfFameIntro` | function | 8521–8528 | 8 |
| `startHallOfFameIntro` | function | 8529–8553 | 25 |
| `cancelHallOfFameIntro` | function | 8554–8565 | 12 |
| `openHallOfFame` | window | 8567–8590 | 24 |
| `openComparisonCenter` | window | 8591–8619 | 29 |
| `openMatchcenter` | window | 8620–8641 | 22 |
| `openLineupBuilder` | window | 8642–8659 | 18 |
| `setMatchcenterOpponent` | window | 8660–8660 | 1 |
| `setMatchcenterContext` | window | 8661–8661 | 1 |
| `setMatchcenterSeason` | window | 8662–8662 | 1 |
| `toggleMatchcenterGames` | window | 8663–8663 | 1 |
| `openLexicon` | window | 8664–8667 | 4 |
| `rRes` | const-arrow | 8672–8672 | 1 |
| `rClutchBadge` | function | 8673–8680 | 8 |
| `escAttr` | function | 8681–8683 | 3 |
| `roleTraitLabel` | function | 8684–8686 | 3 |
| `isVisibleSecondaryTrait` | function | 8687–8690 | 4 |
| `rRoleTraitTip` | function | 8691–8695 | 5 |
| `rStyleMetricTip` | function | 8696–8699 | 4 |
| `rRosterStatusBadge` | function | 8700–8707 | 8 |
| `classicTagLabel` | function | 8708–8710 | 3 |
| `rClassicTagTip` | function | 8711–8715 | 5 |
| `fallbackIdentityProfile` | function | 8716–8726 | 11 |
| `rIdentityTags` | function | 8727–8735 | 9 |
| `rStyleProfileBars` | function | 8736–8746 | 11 |
| `rIdentityCards` | function | 8747–8772 | 26 |
| `rClassicRoleTags` | function | 8773–8780 | 8 |
| `renderTags` | function | 8781–8783 | 3 |
| `getSeasonPlayerFieldBasis` | function | 8785–8811 | 27 |
| `getSeasonScopedIdentityProfile` | function | 8812–8823 | 12 |
| `rSeasonProfileKpis` | function | 8824–8843 | 20 |
| `rSeasonProfileTagStrip` | function | 8845–8849 | 5 |
| `rMatrix` | function | 8852–8896 | 45 |
| `rSeasonDuoSummary` | function | 8899–8907 | 9 |
| `rPhases` | function | 8909–8926 | 18 |
| `rRadar` | function | 8929–8976 | 48 |
| `rClutch` | function | 8979–9011 | 33 |
| `rTimeline` | function | 9014–9122 | 109 |
| `rPenalties` | function | 9125–9141 | 17 |
| `rOppBreakdown` | function | 9144–9176 | 33 |
| `generatePlayerInsights` | function | 9179–9222 | 44 |
| `rSeasonInsightsTab` | function | 9225–9238 | 14 |
| `rInsights` | function | 9240–9291 | 52 |
| `rTable` | function | 9294–9314 | 21 |
| `findLoadedSeasonPlayer` | function | 9317–9325 | 9 |
| `getAllTimePlayerRows` | function | 9326–9341 | 16 |
| `isSgOnlyAlltimePlayer` | function | 9342–9349 | 8 |
| `isPureSGPlayer` | function | 9350–9353 | 4 |
| `filterPureSGPlayers` | function | 9354–9357 | 4 |
| `getAllTimeMainPlayerRows` | function | 9358–9360 | 3 |
| `getAllTimeSgOnlyRows` | function | 9361–9363 | 3 |
| `getPlayerSeasonStats` | function | 9364–9368 | 5 |
| `getPlayerAlltimeStats` | function | 9369–9376 | 8 |
| `getPlayerRegistryProfile` | function | 9377–9384 | 8 |
| `getPlayerGoalieSeasonStats` | function | 9385–9389 | 5 |
| `getPlayerGoalieAlltimeStats` | function | 9390–9413 | 24 |
| `sumRoleGames` | function | 9414–9419 | 6 |
| `getPlayerRoleAvailability` | function | 9420–9433 | 14 |
| `resolvePlayerRoleView` | function | 9434–9441 | 8 |
| `rPlayerRoleSwitch` | function | 9442–9448 | 7 |
| `goalieNum` | function | 9449–9454 | 6 |
| `goalieTime` | function | 9455–9462 | 8 |
| `goalieBucketRows` | function | 9463–9468 | 6 |
| `goalieTopRow` | function | 9469–9471 | 3 |
| `goalieTierMeta` | function | 9472–9480 | 9 |
| `goalieStdDev` | function | 9481–9486 | 6 |
| `goalieDetailFirstTime` | function | 9487–9493 | 7 |
| `goalieEventSecondInPeriod` | function | 9494–9499 | 6 |
| `goaliePctText` | function | 9500–9503 | 4 |
| `goalieSafeNum` | function | 9504–9507 | 4 |
| `goalieClampScore` | function | 9508–9511 | 4 |
| `goalieInverseScore` | function | 9512–9519 | 8 |
| `goaliePositiveScore` | function | 9520–9527 | 8 |
| `goaliePositiveCurveScore` | function | 9528–9536 | 9 |
| `goalieWeightedScore` | function | 9537–9542 | 6 |
| `goalieApplySampleConfidence` | function | 9543–9550 | 8 |
| `goalieBucketLooseSum` | function | 9551–9557 | 7 |
| `buildGoalieAnalysisModel` | function | 9558–9716 | 159 |
| `rGoalieBars` | function | 9717–9726 | 10 |
| `goalieDnaKey` | function | 9768–9772 | 5 |
| `goalieDnaValue` | function | 9773–9779 | 7 |
| `goalieStateGoals` | function | 9780–9780 | 1 |
| `buildGoalieRoleProfile` | function | 9781–9854 | 74 |
| `rGoalieRoleTraits` | function | 9855–9858 | 4 |
| `getGoalieDnaRows` | function | 9859–9862 | 4 |
| `rGoalieDnaBars` | function | 9863–9876 | 14 |
| `rGoalieKpis` | function | 9877–9893 | 17 |
| `rGoalieMiniMetrics` | function | 9894–9899 | 6 |
| `rGoalieFirstGoalResistance` | function | 9900–9913 | 14 |
| `rGoalieMomentum` | function | 9914–9927 | 14 |
| `rGoalieTierCards` | function | 9928–9955 | 28 |
| `rGoaliePhaseProfile` | function | 9956–9972 | 17 |
| `rGoalieInsights` | function | 9973–9994 | 22 |
| `rGoalieOverview` | function | 9995–10011 | 17 |
| `rGoaliePhases` | function | 10012–10014 | 3 |
| `rGoalieOpponents` | function | 10015–10026 | 12 |
| `rGoalieStability` | function | 10027–10051 | 25 |
| `rGoalieTable` | function | 10052–10059 | 8 |
| `rGoalieAnalysis` | function | 10060–10085 | 26 |
| `getPreviousSeasonKey` | function | 10087–10091 | 5 |
| `playerAppearedInSeasonByName` | function | 10092–10102 | 11 |
| `playerAppearedForUlmStatusInSeasonByName` | function | 10103–10121 | 19 |
| `isRookieCandidateForSeason` | function | 10122–10131 | 10 |
| `getLoadedSeasonPointsByName` | function | 10132–10136 | 5 |
| `seasonHasPureUlmTeam` | function | 10137–10143 | 7 |
| `isSgOnlyHallOfFameExcluded` | function | 10144–10152 | 9 |
| `isHallOfFameEligiblePlayer` | function | 10153–10158 | 6 |
| `getHallOfFamePlayerRows` | function | 10159–10161 | 3 |
| `getHallOfFamePlayerIdSet` | function | 10162–10164 | 3 |
| `getGlobalProfileEvents` | function | 10166–10177 | 12 |
| `countBy` | function | 10179–10187 | 9 |
| `getLoadedSeasonPlayerUi` | function | 10188–10192 | 5 |
| `getGlobalPlayerTeamRecord` | function | 10193–10218 | 26 |
| `getGlobalPlayerPeakGame` | function | 10219–10229 | 11 |
| `getGlobalPlayerBestSeason` | function | 10230–10236 | 7 |
| `getAllTimeDuoRowsForPlayer` | function | 10237–10247 | 11 |
| `getCarryPerformanceRows` | function | 10248–10263 | 16 |
| `rCarryPerformanceRows` | function | 10264–10276 | 13 |
| `getAllTimeGamesPlayedRows` | function | 10277–10301 | 25 |
| `getAllTimePenaltyRows` | function | 10302–10317 | 16 |
| `getSeasonUiPlayerForProfile` | function | 10318–10321 | 4 |
| `getSeasonIdentityProfile` | function | 10322–10326 | 5 |
| `seasonStatNumber` | function | 10327–10330 | 4 |
| `seasonStatSetSize` | function | 10331–10336 | 6 |
| `isActiveAlltimeSeasonStats` | function | 10337–10350 | 14 |
| `getActiveAlltimeSeasonKeys` | function | 10351–10361 | 11 |
| `getAlltimeRecencyWeight` | function | 10362–10367 | 6 |
| `getRosterStatus` | function | 10368–10374 | 7 |
| `getGlobalTopScorerMilestones` | function | 10375–10387 | 13 |
| `getGlobalRookieSeasonKey` | function | 10388–10401 | 14 |
| `getGlobalRookieMilestone` | function | 10402–10412 | 11 |
| `getGlobalPlayerMilestones` | function | 10413–10430 | 18 |
| `buildOpponentIntelligence` | function | 10432–10485 | 54 |
| `rOpponentIntelBars` | function | 10487–10497 | 11 |
| `getAllTimeDuoRows` | function | 10499–10521 | 23 |
| `rDuoRows` | function | 10523–10542 | 20 |
| `getAllLoadedSeasonGames` | function | 10544–10563 | 20 |
| `getRosterEntryRegistryProfile` | function | 10565–10568 | 4 |
| `difficultConnectionConfidence` | function | 10569–10573 | 5 |
| `getDuoRowsForPlayerScope` | function | 10574–10592 | 19 |
| `buildDirectDuoLookupForPlayer` | function | 10593–10610 | 18 |
| `duoScopeSeasonKeys` | function | 10611–10614 | 4 |
| `getDuoScorerCountsWithCandidate` | function | 10615–10634 | 20 |
| `buildBestThirdManOptions` | function | 10635–10668 | 34 |
| `getDuoDirectScorerGameCounts` | function | 10669–10700 | 32 |
| `responseMomentumAbsSeconds` | function | 10702–10707 | 6 |
| `responseMomentumTime` | function | 10708–10714 | 7 |
| `responseMomentumGameRows` | function | 10715–10721 | 7 |
| `responseMomentumSide` | function | 10722–10730 | 9 |
| `responseMomentumActor` | function | 10731–10741 | 11 |
| `responseMomentumGoalActors` | function | 10742–10749 | 8 |
| `buildAnnotatedGoalEventsForGame` | function | 10750–10850 | 101 |
| `responseMomentumConfidence` | function | 10851–10855 | 5 |
| `responseMomentumEmptyState` | function | 10856–10863 | 8 |
| `responseMomentumPairKey` | function | 10864–10866 | 3 |
| `ensureRmPlayer` | function | 10867–10872 | 6 |
| `ensureRmDuo` | function | 10873–10878 | 6 |
| `finalizeResponseStats` | function | 10879–10892 | 14 |
| `buildResponseGoalStatsRaw` | function | 10893–10941 | 49 |
| `buildResponseGoalStats` | function | 10942–10947 | 6 |
| `finalizeMomentumStats` | function | 10948–10953 | 6 |
| `buildMomentumSwingStatsRaw` | function | 10954–11024 | 71 |
| `buildMomentumSwingStats` | function | 11025–11030 | 6 |
| `buildDuoFloorCeiling` | function | 11031–11072 | 42 |
| `buildDuoWarnings` | function | 11073–11091 | 19 |
| `duoProPairKey` | function | 11092–11094 | 3 |
| `duoProContextSeasonKey` | function | 11095–11097 | 3 |
| `getDuoFieldPlayerRows` | function | 11098–11108 | 11 |
| `duoProPlayer` | function | 11109–11113 | 5 |
| `getDuoSharedFieldRows` | function | 11114–11119 | 6 |
| `buildDuoDirectProduction` | function | 11120–11140 | 21 |
| `emptyDuoTeamImpactStats` | function | 11141–11143 | 3 |
| `addDuoTeamGame` | function | 11144–11159 | 16 |
| `finalizeDuoTeamImpactStats` | function | 11160–11167 | 8 |
| `buildDuoWithWithoutImpact` | function | 11168–11201 | 34 |
| `buildDuoOpponentAdjusted` | function | 11202–11214 | 13 |
| `buildDuoNetworkContext` | function | 11215–11238 | 24 |
| `buildDuoGapAnalysis` | function | 11239–11255 | 17 |
| `buildDuoCompatibility` | function | 11267–11289 | 23 |
| `buildDuoUntestedPotential` | function | 11290–11301 | 12 |
| `buildDuoUsageRate` | function | 11302–11313 | 12 |
| `buildDuoReplacementOptions` | function | 11314–11325 | 12 |
| `buildDuoProAnalysis` | function | 11326–11369 | 44 |
| `rDuoCenterPro` | function | 11370–11489 | 120 |
| `duoProDomId` | function | 11490–11492 | 3 |
| `duoProPickerOpen` | function | 11493–11495 | 3 |
| `duoProPickerMessage` | function | 11496–11498 | 3 |
| `setDuoProPickerState` | function | 11499–11508 | 10 |
| `duoProResolveCandidate` | function | 11509–11517 | 9 |
| `duoProSelectionPayload` | function | 11518–11527 | 10 |
| `openDuoProPicker` | window | 11528–11528 | 1 |
| `cancelDuoProPicker` | window | 11529–11529 | 1 |
| `selectDuoProQuick` | window | 11530–11533 | 4 |
| `confirmDuoProSelection` | window | 11534–11548 | 15 |
| `setDuoProSelection` | window | 11549–11556 | 8 |
| `rDuoProPlayerSelect` | function | 11557–11563 | 7 |
| `rInteractiveDuoCenterPro` | function | 11564–11619 | 56 |
| `rSeasonDuoCenterPro` | function | 11620–11622 | 3 |
| `getDifficultConnectionRowsForPlayer` | function | 11623–11667 | 45 |
| `emptyRosterImpactStats` | function | 11668–11670 | 3 |
| `finalizeRosterImpactStats` | function | 11671–11678 | 8 |
| `addRosterImpactGameToStats` | function | 11679–11688 | 10 |
| `getRosterImpactPlayerEventLookup` | function | 11689–11709 | 21 |
| `buildRosterImpactGameIndex` | function | 11722–11747 | 26 |
| `getRosterImpactPlayerGames` | function | 11760–11801 | 42 |
| `rosterImpactConfidence` | function | 11802–11807 | 6 |
| `confidenceFromSampleSize` | function | 11812–11815 | 4 |
| `rosterImpactConfidenceWeight` | function | 11816–11819 | 4 |
| `antiSynergyImpactScore` | function | 11820–11834 | 15 |
| `buildRosterImpactAnalysis` | function | 11835–11903 | 69 |
| `buildDuoAntiSynergy` | function | 11904–11906 | 3 |
| `rAntiSynergyDelta` | function | 11907–11913 | 7 |
| `antiSynergyDeltaClass` | function | 11914–11917 | 4 |
| `antiSynergySigned` | function | 11918–11922 | 5 |
| `rAntiSynergyCompareChip` | function | 11923–11930 | 8 |
| `rAntiSynergyMetricRow` | function | 11931–11939 | 9 |
| `rAntiSynergyWinrateText` | function | 11947–11952 | 6 |
| `rAntiSynergyWinrateRow` | function | 11953–11961 | 9 |
| `rRosterImpactStatLine` | function | 11962–11965 | 4 |
| `antiSynergyPartnerIsSgOnly` | function | 11966–11969 | 4 |
| `rAntiSynergyMainDelta` | function | 11970–11979 | 10 |
| `rDifficultConnectionList` | function | 11980–12004 | 25 |
| `rDifficultConnectionListCompactLegacy` | function | 12005–12046 | 42 |
| `rDifficultConnectionListCompact` | function | 12047–12085 | 39 |
| `rDifficultConnectionsCard` | function | 12086–12122 | 37 |
| `responseMomentumTooltipFor` | function | 12167–12173 | 7 |
| `rmTerm` | function | 12174–12177 | 4 |
| `rResponseRateDisplay` | function | 12183–12189 | 7 |
| `rRmKpi` | function | 12190–12201 | 12 |
| `rAvgResponseTimeNote` | function | 12204–12207 | 4 |
| `rRmTopList` | function | 12208–12218 | 11 |
| `rResponseMomentumOverviewCard` | function | 12219–12242 | 24 |
| `rPlayerResponseMomentumCard` | function | 12243–12261 | 19 |
| `rDuoResponseMomentumCard` | function | 12262–12281 | 20 |
| `rTeamResponseMomentumCard` | function | 12282–12288 | 7 |
| `rMatchcenterResponseMomentum` | function | 12289–12326 | 38 |
| `getTeamAllTimeRecords` | function | 12328–12368 | 41 |
| `getAllTimeOpponentIntelligence` | function | 12370–12376 | 7 |
| `getAllTimeOpponentTopScorers` | function | 12378–12402 | 25 |
| `getHallOfFameStats` | function | 12404–12426 | 23 |
| `rOpponentTopScorerTable` | function | 12428–12447 | 20 |
| `getAllTimeIdentityStandings` | function | 12449–12483 | 35 |
| `buildRecencyWeightedGlobalIdentityProfile` | function | 12485–12532 | 48 |
| `getGlobalIdentityProfile` | function | 12534–12560 | 27 |
| `dedupeIdentityProfileTags` | function | 12562–12573 | 12 |
| `rGlobalProfileTags` | function | 12575–12579 | 5 |
| `escHtml` | function | 12581–12583 | 3 |
| `pctValue` | function | 12584–12587 | 4 |
| `rHallOfFameHero` | function | 12588–12613 | 26 |
| `rHallPodiumList` | function | 12614–12636 | 23 |
| `rHallDuoTemple` | function | 12637–12644 | 8 |
| `hallGoalieNum` | function | 12646–12651 | 6 |
| `hallGoalieTime` | function | 12652–12659 | 8 |
| `hallGoalieSeasonLabel` | function | 12660–12660 | 1 |
| `isHallRowPureSG` | function | 12661–12668 | 8 |
| `rHallSGBadge` | function | 12669–12671 | 3 |
| `hallGoaliePkStats` | function | 12672–12683 | 12 |
| `hallGoalieTopteamStats` | function | 12684–12690 | 7 |
| `hallGoalieSeasonScore` | function | 12691–12710 | 20 |
| `hallGoalieRowFromStats` | function | 12711–12743 | 33 |
| `getHallGoalieData` | function | 12744–12759 | 16 |
| `hallGoalieNameHtml` | function | 12760–12762 | 3 |
| `hallGoalieTooltip` | function | 12777–12780 | 4 |
| `hallGoalieExplainForLabel` | function | 12781–12795 | 15 |
| `rHallGoalieRankCard` | function | 12796–12827 | 32 |
| `rHallGoalieAwardCards` | function | 12828–12844 | 17 |
| `rHallGoalieLegends` | function | 12845–12877 | 33 |
| `getGlobalSeasonStatRows` | function | 12878–12893 | 16 |
| `getAlltimeRank` | function | 12894–12899 | 6 |
| `rAlltimeKpis` | function | 12900–12913 | 14 |
| `rSparkline` | function | 12914–12926 | 13 |
| `comparisonItemKey` | function | 12938–12943 | 6 |
| `normalizeComparisonItem` | function | 12944–12948 | 5 |
| `comparisonJsArg` | function | 12949–12951 | 3 |
| `comparisonNum` | function | 12952–12955 | 4 |
| `comparisonPct` | function | 12956–12959 | 4 |
| `comparisonFmt` | function | 12960–12963 | 4 |
| `comparisonPctFmt` | function | 12964–12966 | 3 |
| `getComparisonPlayerRow` | function | 12967–12969 | 3 |
| `getComparisonSeasonLabel` | function | 12970–12972 | 3 |
| `getComparisonTeamGoalsForSeason` | function | 12973–12984 | 12 |
| `getComparisonAlltimeTeamGoals` | function | 12985–12987 | 3 |
| `getComparisonSeasonEvents` | function | 12988–12992 | 5 |
| `getComparisonChemistryFromEvents` | function | 12993–12997 | 5 |
| `getComparisonClutchFromEvents` | function | 12998–13002 | 5 |
| `getComparisonStyleProfile` | function | 13003–13027 | 25 |
| `getComparisonProfile` | function | 13028–13032 | 5 |
| `getComparisonSeasonTrend` | function | 13033–13058 | 26 |
| `getComparisonAlltimeTrend` | function | 13059–13064 | 6 |
| `getComparisonPlayerOptions` | function | 13066–13080 | 15 |
| `comparisonVariantValue` | function | 13081–13083 | 3 |
| `getComparisonVariantsForPlayer` | function | 13084–13108 | 25 |
| `parseComparisonVariant` | function | 13109–13123 | 15 |
| `getComparisonCurrentSelection` | function | 13124–13134 | 11 |
| `filterComparisonPlayers` | window | 13135–13142 | 8 |
| `selectComparisonPlayer` | window | 13143–13148 | 6 |
| `setComparisonRoleMode` | window | 13149–13153 | 5 |
| `setComparisonVariant` | window | 13154–13157 | 4 |
| `toggleComparisonSgOnly` | window | 13158–13158 | 1 |
| `addComparisonItem` | window | 13159–13166 | 8 |
| `addSelectedComparisonItem` | window | 13167–13172 | 6 |
| `toggleComparisonPicker` | window | 13173–13173 | 1 |
| `removeComparisonItem` | window | 13174–13177 | 4 |
| `clearComparison` | window | 13178–13178 | 1 |
| `runComparison` | window | 13179–13185 | 7 |
| `selectComparisonMode` | window | 13186–13186 | 1 |
| `backToComparisonModeSelect` | window | 13187–13187 | 1 |
| `normalizeDuoComparisonItem` | function | 13188–13191 | 4 |
| `comparisonDuoContext` | function | 13192–13195 | 4 |
| `setComparisonDuoMode` | window | 13196–13196 | 1 |
| `setComparisonDuoSeasonKey` | window | 13197–13197 | 1 |
| `setComparisonDuoSearch` | window | 13198–13198 | 1 |
| `filterPlayerSuggestions` | function | 13199–13210 | 12 |
| `rComparisonDuoSuggestionButtons` | function | 13211–13214 | 4 |
| `renderComparisonDuoSuggestions` | function | 13215–13223 | 9 |
| `filterComparisonDuoSuggestions` | window | 13224–13231 | 8 |
| `selectComparisonDuoSuggestion` | window | 13225–13231 | 7 |
| `handleComparisonDuoSearchKey` | window | 13232–13244 | 13 |
| `setComparisonDuoPlayer` | window | 13245–13250 | 6 |
| `addComparisonDuoFromSelection` | window | 13251–13258 | 8 |
| `addComparisonDuo` | window | 13259–13261 | 3 |
| `removeComparisonDuo` | window | 13262–13265 | 4 |
| `clearComparisonDuos` | window | 13266–13266 | 1 |
| `runDuoComparison` | window | 13267–13271 | 5 |
| `buildDuoComparison` | function | 13272–13291 | 20 |
| `rDuoComparisonBars` | function | 13292–13296 | 5 |
| `rDuoCompareSummaryCards` | function | 13297–13327 | 31 |
| `rDuoComparisonProfile` | function | 13328–13349 | 22 |
| `rDuoComparisonChemistry` | function | 13350–13365 | 16 |
| `rDuoComparisonImpact` | function | 13366–13381 | 16 |
| `rDuoComparisonContext` | function | 13382–13399 | 18 |
| `rDuoComparisonDetails` | function | 13400–13403 | 4 |
| `rDuoComparisonDashboard` | function | 13404–13417 | 14 |
| `rComparisonDuoSearchBox` | function | 13418–13427 | 10 |
| `rDuoComparisonPage` | function | 13428–13438 | 11 |
| `rComparisonModeSelect` | function | 13439–13441 | 3 |
| `getComparisonEventsForItem` | function | 13442–13444 | 3 |
| `getComparisonRosterGamesForSeason` | function | 13445–13461 | 17 |
| `getComparisonRosterGames` | function | 13462–13469 | 8 |
| `comparisonEventGameKey` | function | 13470–13472 | 3 |
| `comparisonEventPhaseLabel` | function | 13473–13476 | 4 |
| `comparisonOpponentStrengthTier` | function | 13477–13482 | 6 |
| `buildComparisonExtraMetrics` | function | 13483–13540 | 58 |
| `getGoalieComparisonAlltimeTrend` | function | 13541–13557 | 17 |
| `getGoalieComparisonSeasonTrend` | function | 13558–13576 | 19 |
| `buildGoalieComparisonDataset` | function | 13577–13627 | 51 |
| `buildComparisonDataset` | function | 13628–13663 | 36 |
| `kpiValueText` | function | 13665–13668 | 4 |
| `kpiDelta` | function | 13669–13674 | 6 |
| `kpiItemColor` | function | 13675–13677 | 3 |
| `rKpiCards` | function | 13678–13688 | 11 |
| `rKpiMirrorRows` | function | 13689–13748 | 60 |
| `kpiRadarValue` | function | 13749–13759 | 11 |
| `rKpiRadar` | function | 13760–13794 | 35 |
| `rKpiShareBars` | function | 13795–13802 | 8 |
| `rKpiMetricCard` | function | 13803–13807 | 5 |
| `rKpiTextMetricCard` | function | 13808–13810 | 3 |
| `rKpiExtendedMetrics` | function | 13811–13825 | 15 |
| `kpiNiceMax` | function | 13826–13831 | 6 |
| `kpiTrendRows` | function | 13832–13840 | 9 |
| `rKpiTrendCompare` | function | 13841–13907 | 67 |
| `rKpiOpponentStrength` | function | 13908–13935 | 28 |
| `kpiBadge` | function | 13936–13938 | 3 |
| `rKpiObjectMini` | function | 13939–13945 | 7 |
| `rKpiInfoCards` | function | 13946–13977 | 32 |
| `buildComparisonSummary` | function | 13978–14009 | 32 |
| `rKPIVergleich` | function | 14010–14023 | 14 |
| `rComparisonMiniOverview` | function | 14024–14027 | 4 |
| `rComparisonRoles` | function | 14028–14035 | 8 |
| `rComparisonDashboard` | function | 14036–14046 | 11 |
| `rComparisonStyles` | function | 14047–14084 | 38 |
| `rComparisonCenterPage` | function | 14085–14135 | 51 |
| `rSeasonTrendRows` | function | 14136–14154 | 19 |
| `getAlltimeAggregatedStyleProfile` | function | 14155–14174 | 20 |
| `rGlobalDnaBars` | function | 14176–14205 | 30 |
| `pdashNum` | function | 14206–14209 | 4 |
| `pdashPct` | function | 14210–14213 | 4 |
| `pdashPhaseLabel` | function | 14214–14217 | 4 |
| `pdashTopCount` | function | 14218–14221 | 4 |
| `pdashBestPhase` | function | 14222–14225 | 4 |
| `pdashTopPartner` | function | 14226–14229 | 4 |
| `pdashTopOpponent` | function | 14230–14233 | 4 |
| `pdashOpponentTier` | function | 14234–14239 | 6 |
| `pdashOpponentStrength` | function | 14240–14259 | 20 |
| `pdashInsight` | function | 14260–14262 | 3 |
| `pdashInsights` | function | 14263–14274 | 12 |
| `buildSeasonPlayerDashModel` | function | 14275–14311 | 37 |
| `buildAlltimePlayerDashModel` | function | 14312–14354 | 43 |
| `rPlayerDashStyles` | function | 14355–14366 | 12 |
| `rPdashLabel` | function | 14367–14369 | 3 |
| `rPdashStat` | function | 14370–14372 | 3 |
| `rPlayerDash` | function | 14373–14411 | 39 |
| `rSeasonPlayerDashboard` | function | 14412–14414 | 3 |
| `rAlltimePlayerDashboard` | function | 14415–14417 | 3 |
| `rGlobalPartnerOpponentPanel` | function | 14418–14431 | 14 |
| `rGlobalCareerHeader` | function | 14432–14452 | 21 |
| `rSeasonLandingPage` | function | 14454–14468 | 15 |
| `rGlobalOverview` | function | 14470–14521 | 52 |
| `rGlobalAllTimeStats` | function | 14523–14539 | 17 |
| `rGlobalDevelopment` | function | 14541–14579 | 39 |
| `getGlobalPlayerOpponentGameRows` | function | 14582–14609 | 28 |
| `getGlobalOpponentSpecialistProfile` | function | 14611–14639 | 29 |
| `rGlobalDuoNetwork` | function | 14641–14838 | 198 |
| `rGlobalOpponentSpecialist` | function | 14840–14885 | 46 |
| `playerExplainConfidence` | function | 14887–14892 | 6 |
| `playerExplainConfidenceLabel` | function | 14893–14895 | 3 |
| `playerExplainAdd` | function | 14896–14900 | 5 |
| `playerExplainStyleSignature` | function | 14901–14912 | 12 |
| `playerExplainRolePhrase` | function | 14913–14921 | 9 |
| `playerExplainHeadline` | function | 14922–14931 | 10 |
| `playerExplainContextSentence` | function | 14932–14950 | 19 |
| `buildFieldPlayerExplanation` | function | 14951–15025 | 75 |
| `buildGoaliePlayerExplanation` | function | 15026–15079 | 54 |
| `buildPlayerExplanation` | function | 15080–15088 | 9 |
| `buildPlayerIntelligence` | function | 15089–15118 | 30 |
| `rPlayerExplainItems` | function | 15119–15123 | 5 |
| `rPlayerExplanation` | function | 15124–15175 | 52 |
| `rAllTimePlayersPage` | function | 15177–15217 | 41 |
| `rHallOfFamePage` | function | 15219–15307 | 89 |
| `lexiconUniqueKeys` | function | 15312–15319 | 8 |
| `lexiconEntry` | function | 15320–15329 | 10 |
| `rLexiconRows` | function | 15330–15333 | 4 |
| `rLexiconPage` | function | 15334–15506 | 173 |
| `clampScore` | function | 15510–15513 | 4 |
| `getScoreLabel` | function | 15514–15522 | 9 |
| `buildConfidence` | function | 15523–15568 | 46 |
| `confidenceCautiousText` | function | 15569–15572 | 4 |
| `explainScore` | function | 15573–15587 | 15 |
| `p1NarrativeKey` | function | 15588–15590 | 3 |
| `scoreNarrative` | function | 15591–15609 | 19 |
| `rankNarratives` | function | 15610–15623 | 14 |
| `getEmptyState` | function | 15624–15635 | 12 |
| `rEmptyState` | function | 15636–15639 | 4 |
| `capSuperlativeLabel` | function | 15647–15649 | 3 |
| `rScoreBreakdown` | function | 15650–15666 | 17 |
| `matchcenterSigned` | function | 15668–15672 | 5 |
| `matchcenterDateLabel` | function | 15674–15678 | 5 |
| `dedupeGamesById` | function | 15690–15698 | 9 |
| `matchcenterIsFreiburgTuebingenTeamName` | function | 15699–15705 | 7 |
| `matchcenterSeasonHasGames` | function | 15709–15711 | 3 |
| `matchcenterDefaultSeasonKey` | function | 15712–15717 | 6 |
| `matchcenterOpponentMode` | function | 15729–15731 | 3 |
| `getMatchcenterOpponents` | function | 15732–15764 | 33 |
| `getMatchcenterDirectOpponents` | function | 15765–15795 | 31 |
| `matchcenterAnalyzeDirect` | function | 15798–15834 | 37 |
| `matchcenterAnalyzeForm` | function | 15835–15860 | 26 |
| `matchcenterGoalMinute` | function | 15869–15874 | 6 |
| `matchcenterEmptyBuckets` | function | 15883–15885 | 3 |
| `matchcenterUlmScoutingConfidence` | function | 15886–15890 | 5 |
| `matchcenterEnsureUlmPlayer` | function | 15891–15928 | 38 |
| `matchcenterRegisterUlmProfileGame` | function | 15929–15934 | 6 |
| `matchcenterUpdateUlmSeasonRow` | function | 15935–15941 | 7 |
| `matchcenterClassifyUlmGoalEvent` | function | 15942–15952 | 11 |
| `matchcenterAddUlmScoring` | function | 15953–15990 | 38 |
| `matchcenterFinalizeUlmPlayers` | function | 15991–16059 | 69 |
| `matchcenterBuildUlmPlayerScouting` | function | 16060–16114 | 55 |
| `matchcenterBuildUlmPlayerInsights` | function | 16115–16127 | 13 |
| `matchcenterDuoPairKey` | function | 16128–16131 | 4 |
| `matchcenterEnsureOpponentDuo` | function | 16132–16164 | 33 |
| `matchcenterDuoDirectionLabel` | function | 16165–16171 | 7 |
| `matchcenterAddDuoConnection` | function | 16172–16190 | 19 |
| `matchcenterFinalizeOpponentDuos` | function | 16191–16225 | 35 |
| `matchcenterBuildOpponentDuos` | function | 16226–16270 | 45 |
| `matchcenterBuildOpponentDuoInsights` | function | 16271–16284 | 14 |
| `matchcenterEnsureUlmDuo` | function | 16285–16322 | 38 |
| `matchcenterAddUlmDuoConnection` | function | 16323–16341 | 19 |
| `matchcenterFinalizeUlmDuos` | function | 16342–16377 | 36 |
| `matchcenterBuildUlmDuos` | function | 16378–16420 | 43 |
| `matchcenterBuildUlmDuoInsights` | function | 16421–16433 | 13 |
| `matchcenterDirectContextGames` | function | 16434–16436 | 3 |
| `matchcenterSpecialTeamsForGame` | function | 16437–16440 | 4 |
| `matchcenterPersonalPenaltyMinutesForSide` | function | 16441–16449 | 9 |
| `matchcenterPct` | function | 16450–16453 | 4 |
| `matchcenterBuildSpecialTeamsMatchup` | function | 16454–16501 | 48 |
| `matchcenterGoalieKey` | function | 16502–16506 | 5 |
| `matchcenterGoalieFitScore` | function | 16507–16523 | 17 |
| `matchcenterBuildGoalieMatchup` | function | 16524–16569 | 46 |
| `matchcenterGoalAbsSeconds` | function | 16570–16577 | 8 |
| `matchcenterTimeValue` | function | 16578–16585 | 8 |
| `matchcenterEmptyTimingStats` | function | 16586–16594 | 9 |
| `matchcenterWindowForSecond` | function | 16595–16601 | 7 |
| `matchcenterTimingStatsForGames` | function | 16602–16638 | 37 |
| `matchcenterBuildTimingInsights` | function | 16639–16649 | 11 |
| `matchcenterBuildTimingAnalysis` | function | 16650–16660 | 11 |
| `rMatchcenterTimeBars` | function | 16661–16674 | 14 |
| `rMatchcenterTimingStatsCard` | function | 16675–16694 | 20 |
| `rMatchcenterTiming` | function | 16695–16718 | 24 |
| `rMatchcenterTabs` | function | 16734–16736 | 3 |
| `rMatchcenterProfileSection` | function | 16737–16756 | 20 |
| `rMatchcenterFormSection` | function | 16757–16782 | 26 |
| `rMatchcenterDetailsSection` | function | 16783–16790 | 8 |
| `matchcenterResultClass` | function | 16791–16793 | 3 |
| `matchcenterUlmTeamLabelForGame` | function | 16795–16799 | 5 |
| `matchcenterGameLine` | function | 16800–16805 | 6 |
| `matchcenterFormLine` | function | 16806–16810 | 5 |
| `matchcenterBuildInsights` | function | 16811–16831 | 21 |
| `rMatchcenterKpi` | function | 16832–16838 | 7 |
| `rMatchcenterFormCard` | function | 16839–16859 | 21 |
| `rMatchcenterGamesList` | function | 16860–16871 | 12 |
| `rMatchcenterWatchCard` | function | 16872–16892 | 21 |
| `rMatchcenterPlayerRow` | function | 16893–16916 | 24 |
| `rMatchcenterRankCard` | function | 16917–16922 | 6 |
| `rMatchcenterUlmImpactCard` | function | 16923–16951 | 29 |
| `rMatchcenterUlmPlayerRow` | function | 16952–16975 | 24 |
| `rMatchcenterUlmRankCard` | function | 16976–16981 | 6 |
| `rMatchcenterUlmScouting` | function | 16982–17018 | 37 |
| `rMatchcenterOpponentScouting` | function | 17019–17054 | 36 |
| `rMatchcenterPlayersTab` | function | 17055–17057 | 3 |
| `rMatchcenterDuoWatchCard` | function | 17058–17077 | 20 |
| `rMatchcenterDuoRow` | function | 17078–17101 | 24 |
| `rMatchcenterDuoRankCard` | function | 17102–17107 | 6 |
| `rMatchcenterUlmDuoWatchCard` | function | 17108–17133 | 26 |
| `rMatchcenterUlmDuoRow` | function | 17134–17156 | 23 |
| `rMatchcenterUlmDuoRankCard` | function | 17157–17162 | 6 |
| `rMatchcenterUlmDuos` | function | 17163–17205 | 43 |
| `rMatchcenterOpponentDuos` | function | 17206–17248 | 43 |
| `rMatchcenterDuosTab` | function | 17249–17251 | 3 |
| `rMatchcenterSpecialCard` | function | 17252–17260 | 9 |
| `rMatchcenterSpecialTeams` | function | 17261–17310 | 50 |
| `rMatchcenterGoalieCard` | function | 17311–17334 | 24 |
| `rMatchcenterGoalieMatchup` | function | 17335–17363 | 29 |
| `matchcenterPlanScoreText` | function | 17364–17367 | 4 |
| `matchcenterPlanRateText` | function | 17368–17372 | 5 |
| `matchcenterPriorityLabel` | function | 17373–17375 | 3 |
| `matchcenterConfidenceClass` | function | 17376–17381 | 6 |
| `matchcenterInferPriority` | function | 17382–17388 | 7 |
| `matchcenterAddPlanItem` | function | 17389–17394 | 6 |
| `matchcenterAddPlanWatch` | function | 17395–17400 | 6 |
| `matchcenterBuildPlanConfidence` | function | 17401–17435 | 35 |
| `matchcenterIntelCurve` | function | 17436–17441 | 6 |
| `matchcenterIntelInverseCurve` | function | 17442–17445 | 4 |
| `matchcenterIntelWeighted` | function | 17446–17456 | 11 |
| `matchcenterIntelRate` | function | 17457–17460 | 4 |
| `matchcenterIntelPct` | function | 17461–17464 | 4 |
| `matchcenterIntelPriorityFromScore` | function | 17465–17470 | 6 |
| `matchcenterIntelPriorityClass` | function | 17471–17476 | 6 |
| `matchcenterIntelPriorityLabel` | function | 17477–17480 | 4 |
| `matchcenterIntelDataLabel` | function | 17481–17483 | 3 |
| `matchcenterBuildIntelligenceDataQuality` | function | 17484–17534 | 51 |
| `matchcenterBuildOpponentDNA` | function | 17535–17647 | 113 |
| `matchcenterDeriveOpponentType` | function | 17648–17665 | 18 |
| `matchcenterIntelPlayerRef` | function | 17666–17678 | 13 |
| `matchcenterIntelDuoRef` | function | 17679–17692 | 14 |
| `matchcenterIntelAddAlarm` | function | 17693–17713 | 21 |
| `matchcenterBuildOpponentAlarm` | function | 17714–17823 | 110 |
| `matchcenterBuildIntelListFromPlan` | function | 17824–17832 | 9 |
| `matchcenterBuildCoachHints` | function | 17833–17848 | 16 |
| `matchcenterBuildIntelHeadline` | function | 17849–17856 | 8 |
| `matchcenterBuildOneThingToWatch` | function | 17857–17869 | 13 |
| `matchcenterBuildIntelligenceSignals` | function | 17870–17916 | 47 |
| `buildMatchIntelligenceFromContext` | function | 17917–17971 | 55 |
| `buildMatchIntelligence` | function | 17972–17993 | 22 |
| `matchcenterCoachCautious` | function | 17994–17996 | 3 |
| `matchcenterCoachAdd` | function | 17997–18005 | 9 |
| `matchcenterCoachGameModel` | function | 18006–18019 | 14 |
| `buildMatchStories` | function | 18020–18049 | 30 |
| `matchcenterCoachPriorityFromAlarm` | function | 18050–18059 | 10 |
| `matchcenterBuildCoachPriorities` | function | 18060–18066 | 7 |
| `matchcenterBuildCoachLevers` | function | 18067–18076 | 10 |
| `matchcenterBuildCoachDangerPatterns` | function | 18077–18084 | 8 |
| `matchcenterBuildCoachIfThen` | function | 18085–18094 | 10 |
| `matchcenterBuildCoachAvoidList` | function | 18095–18104 | 10 |
| `matchcenterBuildCoachActivationHints` | function | 18105–18111 | 7 |
| `matchcenterBuildCoachKeyActors` | function | 18112–18119 | 8 |
| `buildDigitalCoachReport` | function | 18120–18152 | 33 |
| `buildLockerRoomSheet` | function | 18153–18173 | 21 |
| `matchcenterSocialAdd` | function | 18174–18180 | 7 |
| `matchcenterSocialCaption` | function | 18181–18186 | 6 |
| `socialSentence` | function | 18187–18189 | 3 |
| `socialEnsurePeriod` | function | 18190–18193 | 4 |
| `socialFirstUseful` | function | 18194–18196 | 3 |
| `socialPlayerFocusLine` | function | 18197–18203 | 7 |
| `socialDuoFocusLine` | function | 18204–18209 | 6 |
| `socialOpponentLine` | function | 18210–18213 | 4 |
| `socialKeyFactLine` | function | 18214–18223 | 10 |
| `buildMatchdayCaptionBlocks` | function | 18224–18253 | 30 |
| `buildSocialMediaContent` | function | 18254–18302 | 49 |
| `isSyntheticLineupPlayerId` | function | 18308–18310 | 3 |
| `getSyntheticLineupPlayers` | function | 18311–18313 | 3 |
| `getSyntheticLineupRow` | function | 18314–18330 | 17 |
| `getSyntheticLineupRows` | function | 18331–18333 | 3 |
| `getLineupAllRows` | function | 18334–18336 | 3 |
| `lineupRowMeta` | function | 18337–18344 | 8 |
| `getLineupPlayerPool` | function | 18345–18353 | 9 |
| `lineupScore` | function | 18354–18359 | 6 |
| `lineupAverage` | function | 18360–18363 | 4 |
| `lineupLevelLabel` | function | 18364–18367 | 4 |
| `lineupRosterGamesForPlayer` | function | 18370–18417 | 48 |
| `buildLineupExperienceProfile` | function | 18418–18460 | 43 |
| `lineupOpponentDNAForContext` | function | 18461–18472 | 12 |
| `buildLineupOpponentDNAFit` | function | 18473–18516 | 44 |
| `classifyLineIdentity` | function | 18517–18564 | 48 |
| `lineupPlayerProfile` | function | 18565–18640 | 76 |
| `buildLineupAnalysis` | function | 18641–18774 | 134 |
| `buildLineupScoreBreakdowns` | function | 18775–18804 | 30 |
| `buildLineupIntelligence` | function | 18805–18815 | 11 |
| `buildLineAnalysis` | function | 18816–18818 | 3 |
| `lineupRowMap` | function | 18819–18821 | 3 |
| `lineupRankCandidateIds` | function | 18822–18836 | 15 |
| `lineupCombinationIds` | function | 18837–18850 | 14 |
| `lineupStdDev` | function | 18851–18856 | 6 |
| `lineupRoleDnaComplementScore` | function | 18857–18880 | 24 |
| `lineupDirectChemistryScore` | function | 18881–18887 | 7 |
| `lineupEvaluateComplementCandidate` | function | 18888–18966 | 79 |
| `lineupPlayerAnchorScore` | function | 18967–18984 | 18 |
| `lineupPlayerAnchorConfidence` | function | 18987–18991 | 5 |
| `buildTeamLineBalance` | function | 18992–19035 | 44 |
| `buildBalancedLineupSet` | function | 19036–19062 | 27 |
| `lineupRecommendationReason` | function | 19063–19071 | 9 |
| `buildLineupRecommendations` | function | 19072–19153 | 82 |
| `recommendLineComplements` | function | 19154–19181 | 28 |
| `matchcenterBuildMatchPlan` | function | 19182–19327 | 146 |
| `rMatchcenterPlanItems` | function | 19328–19345 | 18 |
| `rMatchcenterPlanWatch` | function | 19346–19361 | 16 |
| `rMatchcenterOpponentDNA` | function | 19362–19394 | 33 |
| `rMatchcenterOpponentAlarm` | function | 19395–19416 | 22 |
| `rMatchcenterIntelOverview` | function | 19417–19462 | 46 |
| `rMatchcenterIntelCoachHints` | function | 19463–19476 | 14 |
| `rMatchcenterCoachCardList` | function | 19477–19490 | 14 |
| `rMatchcenterCoachIfThen` | function | 19491–19498 | 8 |
| `rMatchcenterCoachSimpleList` | function | 19499–19503 | 5 |
| `rMatchcenterDigitalCoach` | function | 19504–19568 | 65 |
| `rMatchcenterCopyButton` | function | 19569–19573 | 5 |
| `rMatchcenterLockerList` | function | 19574–19585 | 12 |
| `rMatchcenterLockerRoomSheet` | function | 19586–19641 | 56 |
| `rMatchcenterSocialBlock` | function | 19642–19649 | 8 |
| `matchcenterStoryDownloadFileName` | function | 19650–19659 | 10 |
| `downloadMatchdayStory` | window | 19660–19707 | 48 |
| `rSocialVideoBlock` | function | 19711–19742 | 32 |
| `socialVideoJobsForMatchday` | function | 19745–19751 | 7 |
| `generateSocialVideoVideos` | window | 19752–19793 | 42 |
| `cancelSocialVideoRecording` | window | 19794–19796 | 3 |
| `generateSocialVideoStandbilder` | window | 19797–19820 | 24 |
| `generateSocialVideoContactSheets` | window | 19821–19843 | 23 |
| `rMatchcenterSocialMediaCenter` | function | 19844–19897 | 54 |
| `rLineupScoreRows` | function | 19898–19919 | 22 |
| `rLineupSimpleCards` | function | 19920–19928 | 9 |
| `rMatchcenterLineupBuilder` | function | 19929–20001 | 73 |
| `rLineupMetricPills` | function | 20002–20015 | 14 |
| `rLineupBuilderAvailablePanel` | function | 20016–20063 | 48 |
| `rLineupRecommendationCards` | function | 20064–20078 | 15 |
| `rLineupRecommendationMode` | function | 20079–20112 | 34 |
| `rLineupComplementCards` | function | 20113–20125 | 13 |
| `rLineupTestLine` | function | 20126–20174 | 49 |
| `rLineupTestMode` | function | 20175–20191 | 17 |
| `rLineupBuilderPage` | function | 20192–20226 | 35 |
| `rMatchcenterScoutingSummary` | function | 20227–20270 | 44 |
| `rMatchcenterMatchPlan` | function | 20271–20291 | 21 |
| `matchcenterStoryLogoBase` | function | 20294–20299 | 6 |
| `matchcenterStorySafeLogoUrl` | function | 20300–20306 | 7 |
| `getTeamLogoUrlForStory` | function | 20315–20344 | 30 |
| `matchcenterStoryLogoForOpponent` | function | 20345–20359 | 15 |
| `matchcenterStoryTableRank` | function | 20360–20370 | 11 |
| `matchcenterStoryUlmTableRank` | function | 20371–20377 | 7 |
| `matchcenterStoryRankText` | function | 20378–20381 | 4 |
| `matchcenterStoryInlineStat` | function | 20382–20384 | 3 |
| `matchcenterStoryRankRows` | function | 20386–20397 | 12 |
| `matchcenterStoryAddFact` | function | 20400–20406 | 7 |
| `matchcenterStoryFactKey` | function | 20407–20409 | 3 |
| `matchcenterStoryLooksArtificial` | function | 20410–20412 | 3 |
| `matchcenterStoryEstimateFactWeight` | function | 20413–20418 | 6 |
| `matchcenterStoryAddCandidate` | function | 20419–20441 | 23 |
| `matchcenterStoryCategoryLimit` | function | 20442–20445 | 4 |
| `matchcenterStoryNormalizePickOptions` | function | 20446–20456 | 11 |
| `matchcenterStoryCandidateForBudget` | function | 20457–20466 | 10 |
| `matchcenterStoryPickFactItems` | function | 20467–20519 | 53 |
| `matchcenterStoryPickFacts` | function | 20520–20522 | 3 |
| `matchcenterStoryCurrentStreak` | function | 20524–20532 | 9 |
| `matchcenterStoryWinlessStreak` | function | 20533–20541 | 9 |
| `matchcenterStoryFormFact` | function | 20542–20552 | 11 |
| `matchcenterStoryFormFactCandidates` | function | 20553–20572 | 20 |
| `matchcenterStoryLateGoalsForOutcome` | function | 20573–20576 | 4 |
| `matchcenterStoryClutchFact` | function | 20577–20591 | 15 |
| `matchcenterStoryPlayerClutchTotal` | function | 20592–20599 | 8 |
| `matchcenterStoryBestClutchPlayer` | function | 20600–20609 | 10 |
| `matchcenterStoryPlayerClutchFact` | function | 20610–20635 | 26 |
| `matchcenterStoryDuoClutchTotal` | function | 20636–20643 | 8 |
| `matchcenterStoryBestClutchDuo` | function | 20644–20653 | 10 |
| `matchcenterStoryDuoClutchFact` | function | 20654–20656 | 3 |
| `matchcenterStoryDuoFact` | function | 20657–20677 | 21 |
| `matchcenterStoryClutchPriority` | function | 20678–20680 | 3 |
| `matchcenterStoryCompetitionLabel` | function | 20681–20684 | 4 |
| `matchcenterStoryShortDuel` | function | 20685–20689 | 5 |
| `matchcenterStoryLastDuelLabel` | function | 20690–20693 | 4 |
| `matchcenterStoryDirectFactCandidates` | function | 20694–20715 | 22 |
| `matchcenterStoryPlanFactCandidates` | function | 20716–20728 | 13 |
| `matchcenterStoryCategoryForPlanFact` | function | 20729–20737 | 9 |
| `buildMatchcenterStoryPreviewData` | function | 20738–20849 | 112 |
| `matchcenterStoryNameClass` | function | 20850–20855 | 6 |
| `matchcenterStoryVisibleFacts` | function | 20856–20886 | 31 |
| `rMatchcenterStoryLogo` | function | 20887–20891 | 5 |
| `rMatchcenterStoryForm` | function | 20892–20896 | 5 |
| `rMatchcenterStoryPlayerCard` | function | 20897–20904 | 8 |
| `rMatchcenterStoryPreview` | function | 20905–20974 | 70 |
| `rMatchcenterStoryFrame` | function | 20975–20980 | 6 |
| `fitMatchcenterStoryLayout` | function | 20981–21023 | 43 |
| `ensureSocialVideoExportCapabilityChecked` | function | 21032–21036 | 5 |
| `downloadSocialVideoStandbild` | window | 21051–21070 | 20 |
| `downloadSocialVideoContactSheet` | window | 21075–21100 | 26 |
| `rMatchcenterPage` | function | 21102–21250 | 149 |
| `rTeamPage` | function | 21251–21588 | 338 |
| `exportExcel` | function | 21593–21614 | 22 |
| `render` | function | 21620–21637 | 18 |
| `_render` | function | 21638–21807 | 170 |
| `uiFormatNumber` | function | 21841–21845 | 5 |
| `uiReliabilityDots` | function | 21854–21861 | 8 |
| `uiDeltaIndicator` | function | 21869–21875 | 7 |
| `uiInfoIcon` | function | 21887–21891 | 5 |
| `uiKennzahlKachel` | function | 21899–21910 | 12 |
| `uiKernaussage` | function | 21919–21925 | 7 |
| `uiHinweisKarte` | function | 21933–21945 | 13 |
| `uiRangliste` | function | 21955–21972 | 18 |
| `uiVerlauf` | function | 21983–22002 | 20 |
| `uiIntervallBalken` | function | 22009–22021 | 13 |
| `uiMethodenbox` | function | 22028–22037 | 10 |
| `uiNotiz` | function | 22045–22049 | 5 |
| `datenstandQuoteState` | function | 22071–22078 | 8 |
| `uiQuoteText` | function | 22081–22087 | 7 |
| `uiDatenstandBand` | function | 22104–22117 | 14 |
| `uiPlatzhalter` | function | 22125–22130 | 6 |
| `uiObjektseiteSortTabs` | function | 22175–22183 | 9 |
| `uiObjektseite` | function | 22193–22226 | 34 |
| `mainNavActiveKeyForPage` | function | 22283–22288 | 6 |
| `goToMainNavPoint` | window | 22289–22295 | 7 |
| `rMainNav` | function | 22296–22300 | 5 |
| `rMainNavBottom` | function | 22318–22325 | 8 |
| `openOverview` | window | 22335–22343 | 9 |
| `switchOverviewSeason` | window | 22352–22358 | 7 |
| `openMatchdayTimeline` | window | 22386–22393 | 8 |
| `openMatchday` | window | 22394–22403 | 10 |
| `switchMatchdaySeason` | window | 22405–22410 | 6 |
| `matchdayUlmGames` | function | 22412–22414 | 3 |
| `matchdayGameCardHtml` | function | 22415–22428 | 14 |
| `matchdayFixtureCardHtml` | function | 22434–22442 | 9 |
| `rMatchdayTimelineRow` | function | 22444–22451 | 8 |
| `rMatchdayTimelinePage` | function | 22452–22462 | 11 |
| `rMatchdayDetailPage` | function | 22463–22502 | 40 |
| `rMatchdayPage` | function | 22503–22509 | 7 |
| `overviewMatchdayStartMs` | function | 22528–22533 | 6 |
| `overviewMatchdayEndMs` | function | 22534–22539 | 6 |
| `detectOverviewPhase` | function | 22540–22565 | 26 |
| `getSeasonDataState` | function | 22572–22582 | 11 |
| `parseSeasonDataState` | function | 22583–22591 | 9 |
| `isNewSeasonDataState` | function | 22593–22595 | 3 |
| `recordOverviewVisit` | function | 22602–22611 | 10 |
| `overviewOpponentLabel` | function | 22617–22628 | 12 |
| `overviewLastMatchdayText` | function | 22629–22632 | 4 |
| `overviewNextMatchdayHtml` | function | 22639–22655 | 17 |
| `overviewCompactTableHtml` | function | 22663–22669 | 7 |
| `overviewFormHtml` | function | 22671–22685 | 15 |
| `overviewSeasonBilanzHtml` | function | 22686–22692 | 7 |
| `overviewSeasonAwardHtml` | function | 22694–22703 | 10 |
| `overviewRecordHtml` | function | 22705–22710 | 6 |
| `overviewCrossSeasonTrendHtml` | function | 22712–22720 | 9 |
| `overviewOpponentPreviewHtml` | function | 22721–22725 | 5 |
| `overviewMatchcenterLinkHtml` | function | 22726–22728 | 3 |
| `overviewLineupLinkHtml` | function | 22729–22731 | 3 |
| `overviewRankChangeTile` | function | 22748–22765 | 18 |
| `buildOverviewCards` | function | 22774–22814 | 41 |
| `rOverviewPage` | function | 22824–22835 | 12 |
| `openLigaGegner` | window | 22836–22839 | 4 |
| `rLigaGegnerPlaceholderPage` | function | 22840–22845 | 6 |
| `rAsOfSelector` | function | 22857–22869 | 13 |
| `setContextAsOf` | window | 22870–22881 | 12 |
| `rSeasonDataPreviewContextHint` | function | 22892–22900 | 9 |
| `rSeasonDataStateContextHint` | function | 22909–22915 | 7 |
| `rContextBar` | function | 22940–22958 | 19 |
| `rIaShell` | function | 22960–22962 | 3 |
| `globalSearchTokens` | function | 22979–22982 | 4 |
| `globalSearchEntries` | function | 22984–22997 | 14 |
| `globalSearchPlayerScore` | function | 22998–23005 | 8 |
| `globalSearchMatchdayScore` | function | 23007–23019 | 13 |
| `globalSearchMatch` | function | 23021–23032 | 12 |
| `globalSearchIsEditableTarget` | function | 23033–23037 | 5 |
| `globalSearchKeyAction` | function | 23039–23053 | 15 |
| `rGlobalSearchToggle` | function | 23054–23056 | 3 |
| `rGlobalSearchResultsHtml` | function | 23057–23067 | 11 |
| `rGlobalSearchPanelHtml` | function | 23068–23070 | 3 |
| `paintGlobalSearchResults` | function | 23071–23078 | 8 |
| `openGlobalSearch` | window | 23079–23103 | 25 |
| `closeGlobalSearch` | window | 23104–23111 | 8 |
| `onGlobalSearchInput` | window | 23112–23117 | 6 |
| `moveGlobalSearch` | function | 23118–23123 | 6 |
| `activateGlobalSearchResult` | window | 23124–23133 | 10 |
| `globalSearchOnKeydown` | function | 23134–23155 | 22 |
| `initGlobalSearch` | function | 23156–23160 | 5 |
| `rToolMenu` | function | 23182–23185 | 4 |
| `toolMenuElements` | function | 23186–23188 | 3 |
| `toolMenuItemElements` | function | 23189–23191 | 3 |
| `isToolMenuOpen` | function | 23192–23195 | 4 |
| `openToolMenu` | window | 23196–23203 | 8 |
| `closeToolMenu` | window | 23204–23210 | 7 |
| `toggleToolMenu` | window | 23211–23214 | 4 |
| `activateToolMenuItem` | window | 23215–23222 | 8 |
| `toolMenuOnKeydown` | function | 23223–23246 | 24 |
| `toolMenuOnClick` | function | 23247–23253 | 7 |
| `initToolMenu` | function | 23254–23257 | 4 |

## Alphabetisches Register

| Name | Art | Zeile |
|---|---|---|
| `_render` | function | 21638 |
| `acceptEinsatzCenterRosterSuggestion` | window | 7609 |
| `activateGlobalSearchResult` | window | 23124 |
| `activateToolMenuItem` | window | 23215 |
| `addComparisonDuo` | window | 13259 |
| `addComparisonDuoFromSelection` | window | 13251 |
| `addComparisonItem` | window | 13159 |
| `addDuoTeamGame` | function | 11144 |
| `addEinsatzCenterExistingGroup` | window | 7626 |
| `addEinsatzCenterGroupPlayer` | window | 7694 |
| `addEinsatzCenterNewGroup` | window | 7635 |
| `addEinsatzCenterRosterPlayer` | window | 7575 |
| `addGoalieGameToStats` | function | 4492 |
| `addGoalieSpecialTeamsGameToStats` | function | 4462 |
| `addLineupBuilderPlayerToActiveLine` | window | 2347 |
| `addLineupBuilderPlayerToLine` | window | 2337 |
| `addLineupPlayer` | window | 2283 |
| `addRosterImpactGameToStats` | function | 11679 |
| `addSelectedComparisonItem` | window | 13167 |
| `addSyntheticLineupPlayer` | window | 2363 |
| `addUnique` | function | 3679 |
| `aggregateAllTimeDuos` | function | 4835 |
| `aggregateAllTimePlayers` | function | 3946 |
| `aggregateAlltimeSpecialTeams` | function | 4442 |
| `aggregateGoalieAlltimeStats` | function | 4675 |
| `aggregateSeasonStats` | function | 4847 |
| `analysisCacheContext` | function | 2189 |
| `analysisCacheKey` | function | 2223 |
| `annotateSpecialTeamsGoalEvent` | function | 4224 |
| `antiSynergyDeltaClass` | function | 11914 |
| `antiSynergyImpactScore` | function | 11820 |
| `antiSynergyPartnerIsSgOnly` | function | 11966 |
| `antiSynergySigned` | function | 11918 |
| `appendSeasonGameDiagnostics` | function | 2559 |
| `applyAppHash` | function | 3485 |
| `applyCurrentSeasonCoverHighlight` | function | 6079 |
| `applyGlobalPageFromHash` | function | 3452 |
| `applySeasonContext` | function | 2424 |
| `applySeasonScoringToRegistry` | function | 3837 |
| `asOfCacheKeyPart` | function | 2217 |
| `asOfEquals` | function | 3156 |
| `assignStatus` | function | 5685 |
| `avgOrNull` | function | 3984 |
| `backToComparisonModeSelect` | window | 13187 |
| `backToHome` | window | 2400 |
| `buildAlltimePlayerDashModel` | function | 14312 |
| `buildAnnotatedGoalEventsForGame` | function | 10750 |
| `buildAppHash` | function | 3302 |
| `buildBalancedLineupSet` | function | 19036 |
| `buildBestThirdManOptions` | function | 10635 |
| `buildComparisonDataset` | function | 13628 |
| `buildComparisonExtraMetrics` | function | 13483 |
| `buildComparisonSummary` | function | 13978 |
| `buildConfidence` | function | 15523 |
| `buildDigitalCoachReport` | function | 18120 |
| `buildDirectDuoLookupForPlayer` | function | 10593 |
| `buildDryRunReport` | function | 6303 |
| `buildDuoAntiSynergy` | function | 11904 |
| `buildDuoComparison` | function | 13272 |
| `buildDuoCompatibility` | function | 11267 |
| `buildDuoDirectProduction` | function | 11120 |
| `buildDuoFloorCeiling` | function | 11031 |
| `buildDuoGapAnalysis` | function | 11239 |
| `buildDuoNetworkContext` | function | 11215 |
| `buildDuoOpponentAdjusted` | function | 11202 |
| `buildDuoProAnalysis` | function | 11326 |
| `buildDuoReplacementOptions` | function | 11314 |
| `buildDuoUntestedPotential` | function | 11290 |
| `buildDuoUsageRate` | function | 11302 |
| `buildDuoWarnings` | function | 11073 |
| `buildDuoWithWithoutImpact` | function | 11168 |
| `buildEinsatzCenterDraftExport` | function | 7755 |
| `buildFieldPlayerExplanation` | function | 14951 |
| `buildGlobalPageHash` | function | 3319 |
| `buildGoalieAnalysisModel` | function | 9558 |
| `buildGoalieComparisonDataset` | function | 13577 |
| `buildGoalieGameRecord` | function | 4544 |
| `buildGoaliePlayerExplanation` | function | 15026 |
| `buildGoalieRoleProfile` | function | 9781 |
| `buildGoalieStatsForSeason` | function | 4594 |
| `buildHallOfFameIntroTitle` | function | 8465 |
| `buildHashStringFromParsed` | function | 3334 |
| `buildIdentityProfiles` | function | 5407 |
| `buildLineAnalysis` | function | 18816 |
| `buildLineupAnalysis` | function | 18641 |
| `buildLineupExperienceProfile` | function | 18418 |
| `buildLineupIntelligence` | function | 18805 |
| `buildLineupOpponentDNAFit` | function | 18473 |
| `buildLineupRecommendations` | function | 19072 |
| `buildLineupScoreBreakdowns` | function | 18775 |
| `buildLockerRoomSheet` | function | 18153 |
| `buildMatchcenterStoryPreviewData` | function | 20738 |
| `buildMatchdayCaptionBlocks` | function | 18224 |
| `buildMatchIntelligence` | function | 17972 |
| `buildMatchIntelligenceFromContext` | function | 17917 |
| `buildMatchStories` | function | 18020 |
| `buildMomentumSwingStats` | function | 11025 |
| `buildMomentumSwingStatsRaw` | function | 10954 |
| `buildOpponentIntelligence` | function | 10432 |
| `buildOverviewCards` | function | 22774 |
| `buildPlayerDataFoundation` | function | 4864 |
| `buildPlayerEvents` | function | 4918 |
| `buildPlayerExplanation` | function | 15080 |
| `buildPlayerIdentity` | function | 3690 |
| `buildPlayerIntelligence` | function | 15089 |
| `buildRecencyWeightedGlobalIdentityProfile` | function | 12485 |
| `buildRegistry` | function | 4887 |
| `buildResponseGoalStats` | function | 10942 |
| `buildResponseGoalStatsRaw` | function | 10893 |
| `buildRosterImpactAnalysis` | function | 11835 |
| `buildRosterImpactGameIndex` | function | 11722 |
| `buildSeasonDataPreviewChanges` | function | 6408 |
| `buildSeasonDuos` | function | 4791 |
| `buildSeasonPlayerDashModel` | function | 14275 |
| `buildSocialMediaContent` | function | 18254 |
| `buildSoloDuoProfile` | function | 5176 |
| `buildSpecialTeamsForGame` | function | 4239 |
| `buildSpecialTeamsForSeason` | function | 4433 |
| `buildStaticSeasonDataBlock` | function | 6127 |
| `buildTeamLineBalance` | function | 18992 |
| `cachedAnalysis` | function | 2227 |
| `cancelDuoProPicker` | window | 11529 |
| `cancelEinsatzCenterEdit` | window | 7556 |
| `cancelHallOfFameIntro` | function | 8554 |
| `cancelSocialVideoRecording` | window | 19794 |
| `capSuperlativeLabel` | function | 15647 |
| `clampScore` | function | 15510 |
| `classicTagLabel` | function | 8708 |
| `classifyLineIdentity` | function | 18517 |
| `cleanupHallOfFameIntro` | function | 8494 |
| `clearAnalysisCache` | function | 2186 |
| `clearComparison` | window | 13178 |
| `clearComparisonDuos` | window | 13266 |
| `clearLineupAvailable` | window | 2336 |
| `clearLineupBuilderLine` | window | 2355 |
| `clearLineupPlayers` | window | 2290 |
| `clearlyAboveAverage` | function | 5364 |
| `clonePlain` | function | 4081 |
| `closeGlobalSearch` | window | 23104 |
| `closeMatchcenterStoryPreview` | window | 2255 |
| `closeToolMenu` | window | 23204 |
| `clutchText` | function | 5248 |
| `collectAssistEventRefs` | function | 2879 |
| `comparisonDuoContext` | function | 13192 |
| `comparisonEventGameKey` | function | 13470 |
| `comparisonEventPhaseLabel` | function | 13473 |
| `comparisonFmt` | function | 12960 |
| `comparisonItemKey` | function | 12938 |
| `comparisonJsArg` | function | 12949 |
| `comparisonNum` | function | 12952 |
| `comparisonOpponentStrengthTier` | function | 13477 |
| `comparisonPct` | function | 12956 |
| `comparisonPctFmt` | function | 12964 |
| `comparisonVariantValue` | function | 13081 |
| `composeIdentityText` | function | 5639 |
| `computeCurrentAppHash` | function | 3354 |
| `computeEinsatzCenterStats` | function | 6769 |
| `computeMetrics` | function | 5022 |
| `computeRosterStatus` | function | 5665 |
| `confidenceCautiousText` | function | 15569 |
| `confidenceFromSampleSize` | function | 11812 |
| `confirmDuoProSelection` | window | 11534 |
| `confirmEinsatzCenterCombo` | window | 7727 |
| `copyMatchcenterText` | window | 2257 |
| `countBy` | function | 10179 |
| `countCaptainAppearances` | function | 5647 |
| `countGoalieAppearances` | function | 5661 |
| `countMomentumClusters` | function | 5281 |
| `countPlayedUlmGames` | function | 2799 |
| `createPlayerAnalysisProfile` | function | 3616 |
| `createSeasonBucket` | function | 1811 |
| `datenstandQuoteState` | function | 22071 |
| `decodeHashSegmentSafe` | function | 3227 |
| `dedupeGamesById` | function | 15690 |
| `dedupeIdentityProfileTags` | function | 12562 |
| `deriveAsOfForSeason` | function | 3032 |
| `deriveLineupUlmPlayerIds` | function | 7266 |
| `deriveLineupValidPlayerIds` | function | 7242 |
| `derivePlayerStatus` | function | 3719 |
| `detectOverviewPhase` | function | 22540 |
| `detectSide` | const-arrow | 2515 |
| `detectTypes` | function | 5156 |
| `detectUlmSide` | function | 2508 |
| `diagnoseGameDuplicates` | function | 2537 |
| `diagnosticError` | function | 5900 |
| `diffGameIds` | function | 6250 |
| `difficultConnectionConfidence` | function | 10569 |
| `discardEinsatzCenterAutosave` | function | 7165 |
| `discardSeasonDataPreview` | function | 6507 |
| `dismissEinsatzCenterRosterSuggestion` | window | 7598 |
| `downloadMatchdayStory` | window | 19660 |
| `downloadSocialVideoContactSheet` | window | 21075 |
| `downloadSocialVideoStandbild` | window | 21051 |
| `duoProContextSeasonKey` | function | 11095 |
| `duoProDomId` | function | 11490 |
| `duoProPairKey` | function | 11092 |
| `duoProPickerMessage` | function | 11496 |
| `duoProPickerOpen` | function | 11493 |
| `duoProPlayer` | function | 11109 |
| `duoProResolveCandidate` | function | 11509 |
| `duoProSelectionPayload` | function | 11518 |
| `duoScopeSeasonKeys` | function | 10611 |
| `einsatzCenterAutosaveDraft` | function | 7081 |
| `einsatzCenterAutosaveInfoText` | function | 7187 |
| `einsatzCenterAutosaveKey` | function | 6992 |
| `einsatzCenterCanonicalJson` | function | 7325 |
| `einsatzCenterComputeBaseHash` | function | 7340 |
| `einsatzCenterCurrentRawBaseHash` | function | 7067 |
| `einsatzCenterDeserializeAutosave` | function | 7027 |
| `einsatzCenterDraftInView` | function | 6896 |
| `einsatzCenterDraftIsEmpty` | function | 7004 |
| `einsatzCenterDraftStaleHint` | function | 6910 |
| `einsatzCenterInspectAutosave` | function | 7116 |
| `einsatzCenterIsPlainObject` | function | 7021 |
| `einsatzCenterSerializeDraft` | function | 7008 |
| `einsatzCenterSha256Hex` | function | 7335 |
| `einsatzCenterSoftIssues` | function | 7349 |
| `einsatzCenterStorageRead` | function | 6993 |
| `einsatzCenterStorageRemove` | function | 6999 |
| `einsatzCenterStorageWrite` | function | 6996 |
| `emptyDuoTeamImpactStats` | function | 11141 |
| `emptyFieldRoleSeasonStats` | function | 3675 |
| `emptyGoalieAlltimeStats` | function | 3648 |
| `emptyGoalieSeasonStats` | function | 3626 |
| `emptyGoalieSpecialTeamsStats` | function | 3663 |
| `emptyPlayerSeasonStats` | function | 3620 |
| `emptyRosterImpactStats` | function | 11668 |
| `emptySpecialTeamsStats` | function | 4040 |
| `ensureAppLoaded` | function | 8408 |
| `ensureEinsatzCenterDraft` | function | 6932 |
| `ensureExternalSeasonData` | function | 6105 |
| `ensureFieldRoleSeasonStats` | function | 3785 |
| `ensureGlobalDataLoaded` | function | 8336 |
| `ensureGoalieSeasonStats` | function | 3780 |
| `ensureHallOfFameIntroOverlay` | function | 8432 |
| `ensureLineupDataLoaded` | function | 6615 |
| `ensureLineupGroupsRegistryLoaded` | function | 6640 |
| `ensureRmDuo` | function | 10873 |
| `ensureRmPlayer` | function | 10867 |
| `ensureSocialVideoExportCapabilityChecked` | function | 21032 |
| `escAttr` | function | 8681 |
| `escHtml` | function | 12581 |
| `eventMatchesTeams` | function | 5242 |
| `explainScore` | function | 15573 |
| `exportEinsatzCenterDraft` | window | 7769 |
| `exportExcel` | function | 21593 |
| `fallbackIdentityProfile` | function | 8716 |
| `fetchJson` | function | 5944 |
| `fetchJsonLegacy` | function | 5876 |
| `fetchJsonWithDiagnostics` | function | 5935 |
| `fetchSeasonGameRaw` | function | 5970 |
| `fetchTextWithDiagnostics` | function | 5905 |
| `fileNameForLineupSeasonKey` | function | 6597 |
| `filterComparisonDuoSuggestions` | window | 13224 |
| `filterComparisonPlayers` | window | 13135 |
| `filterLineupBuilderAvailable` | window | 2384 |
| `filterLineupPlayers` | window | 2291 |
| `filterPlayerSuggestions` | function | 13199 |
| `filterPureSGPlayers` | function | 9354 |
| `finalizeDuoTeamImpactStats` | function | 11160 |
| `finalizeGoalieSeasonStats` | function | 4477 |
| `finalizeMomentumStats` | function | 10948 |
| `finalizePlayerRegistrySeason` | function | 3860 |
| `finalizeResponseStats` | function | 10879 |
| `finalizeRosterImpactStats` | function | 11671 |
| `finalizeSpecialTeamsStats` | function | 4084 |
| `findDuplicateGameIds` | function | 6169 |
| `findLineupGameContext` | function | 6674 |
| `findLoadedSeasonPlayer` | function | 9317 |
| `finishHallOfFameIntro` | function | 8521 |
| `finiteNumbers` | function | 3981 |
| `fitMatchcenterStoryLayout` | function | 20981 |
| `fixMojibakeText` | function | 2461 |
| `formatDiagnosticAttempt` | function | 5951 |
| `formatGameLoadError` | function | 5964 |
| `formatStatus` | function | 5948 |
| `gameClassificationStatusLabel` | function | 2551 |
| `gameDaySortValue` | function | 4150 |
| `gameResult` | function | 3585 |
| `generatePlayerInsights` | function | 9179 |
| `generateSocialVideoContactSheets` | window | 19821 |
| `generateSocialVideoStandbilder` | window | 19797 |
| `generateSocialVideoVideos` | window | 19752 |
| `getActiveAlltimeSeasonKeys` | function | 10351 |
| `getActiveSeasonKey` | function | 2412 |
| `getAllLoadedSeasonGames` | function | 10544 |
| `getAlltimeAggregatedStyleProfile` | function | 14155 |
| `getAllTimeCoverStats` | function | 8287 |
| `getAllTimeDuoRows` | function | 10499 |
| `getAllTimeDuoRowsForPlayer` | function | 10237 |
| `getAllTimeGamesPlayedRows` | function | 10277 |
| `getAllTimeIdentityStandings` | function | 12449 |
| `getAllTimeMainPlayerRows` | function | 9358 |
| `getAllTimeOpponentIntelligence` | function | 12370 |
| `getAllTimeOpponentNames` | function | 2490 |
| `getAllTimeOpponentTopScorers` | function | 12378 |
| `getAllTimePenaltyRows` | function | 10302 |
| `getAllTimePlayerRows` | function | 9326 |
| `getAlltimeRank` | function | 12894 |
| `getAlltimeRecencyWeight` | function | 10362 |
| `getAllTimeSgOnlyRows` | function | 9361 |
| `getAssistDiagnostics` | function | 4736 |
| `getAssistPlayersFromEvent` | function | 2907 |
| `getCarryPerformanceRows` | function | 10248 |
| `getComparisonAlltimeTeamGoals` | function | 12985 |
| `getComparisonAlltimeTrend` | function | 13059 |
| `getComparisonChemistryFromEvents` | function | 12993 |
| `getComparisonClutchFromEvents` | function | 12998 |
| `getComparisonCurrentSelection` | function | 13124 |
| `getComparisonEventsForItem` | function | 13442 |
| `getComparisonPlayerOptions` | function | 13066 |
| `getComparisonPlayerRow` | function | 12967 |
| `getComparisonProfile` | function | 13028 |
| `getComparisonRosterGames` | function | 13462 |
| `getComparisonRosterGamesForSeason` | function | 13445 |
| `getComparisonSeasonEvents` | function | 12988 |
| `getComparisonSeasonLabel` | function | 12970 |
| `getComparisonSeasonTrend` | function | 13033 |
| `getComparisonStyleProfile` | function | 13003 |
| `getComparisonTeamGoalsForSeason` | function | 12973 |
| `getComparisonVariantsForPlayer` | function | 13084 |
| `getDifficultConnectionRowsForPlayer` | function | 11623 |
| `getDuoDirectScorerGameCounts` | function | 10669 |
| `getDuoFieldPlayerRows` | function | 11098 |
| `getDuoRowsForPlayerScope` | function | 10574 |
| `getDuoScorerCountsWithCandidate` | function | 10615 |
| `getDuoSharedFieldRows` | function | 11114 |
| `getEffectiveLineupData` | function | 6882 |
| `getEinsatzCenterGameDraft` | function | 6954 |
| `getEmptyState` | function | 15624 |
| `getFieldGameIdsForPlayer` | function | 2708 |
| `getFurtherSameDayUlmGames` | function | 4166 |
| `getGameDurationMinutes` | function | 4145 |
| `getGameId` | function | 6163 |
| `getGlobalAllTimeSnapshot` | function | 2416 |
| `getGlobalIdentityProfile` | function | 12534 |
| `getGlobalLoadableSeasonKeys` | function | 8280 |
| `getGlobalOpponentSpecialistProfile` | function | 14611 |
| `getGlobalPlayerBestSeason` | function | 10230 |
| `getGlobalPlayerMilestones` | function | 10413 |
| `getGlobalPlayerOpponentGameRows` | function | 14582 |
| `getGlobalPlayerPeakGame` | function | 10219 |
| `getGlobalPlayerTeamRecord` | function | 10193 |
| `getGlobalProfileEvents` | function | 10166 |
| `getGlobalRookieMilestone` | function | 10402 |
| `getGlobalRookieSeasonKey` | function | 10388 |
| `getGlobalSeasonStatRows` | function | 12878 |
| `getGlobalTopScorerMilestones` | function | 10375 |
| `getGoalieComparisonAlltimeTrend` | function | 13541 |
| `getGoalieComparisonSeasonTrend` | function | 13558 |
| `getGoalieDiagnostics` | function | 4722 |
| `getGoalieDnaRows` | function | 9859 |
| `getGoalieGameIdsForPlayer` | function | 2715 |
| `getGoalieOpponentName` | function | 4021 |
| `getGoalieOpponentTier` | function | 4025 |
| `getGoalScorerFromEvent` | function | 2873 |
| `getHallGoalieData` | function | 12744 |
| `getHallOfFamePlayerIdSet` | function | 10162 |
| `getHallOfFamePlayerRows` | function | 10159 |
| `getHallOfFameStats` | function | 12404 |
| `getJerseyNumber` | function | 2812 |
| `getLineupAllRows` | function | 18334 |
| `getLineupPlayerPool` | function | 18345 |
| `getLoadedSeasonPlayerUi` | function | 10188 |
| `getLoadedSeasonPointsByName` | function | 10132 |
| `getMatchcenterDirectOpponents` | function | 15765 |
| `getMatchcenterOpponents` | function | 15732 |
| `getOppStrength` | function | 3598 |
| `getOrCreatePlayerProfile` | function | 3728 |
| `getPenaltyBasePersonalMinutes` | function | 4181 |
| `getPenaltyDisciplineMinutes` | function | 4199 |
| `getPenaltyDisciplineType` | function | 4137 |
| `getPenaltyPersonalMinutes` | function | 4189 |
| `getPenaltySpecialTeamsMinutes` | function | 4178 |
| `getPhaseIndex` | function | 5007 |
| `getPlayedUlmGames` | function | 2790 |
| `getPlayerAlltimeFieldGames` | function | 2752 |
| `getPlayerAlltimeGoalieGames` | function | 2755 |
| `getPlayerAlltimeRoleGames` | function | 2733 |
| `getPlayerAlltimeStats` | function | 9369 |
| `getPlayerAlltimeTotalGames` | function | 2758 |
| `getPlayerFieldGames` | function | 2722 |
| `getPlayerGoalieAlltimeStats` | function | 9390 |
| `getPlayerGoalieGames` | function | 2726 |
| `getPlayerGoalieSeasonStats` | function | 9385 |
| `getPlayerRegistryProfile` | function | 9377 |
| `getPlayerRoleAvailability` | function | 9420 |
| `getPlayerSeasonRoleGameSummary` | function | 2767 |
| `getPlayerSeasonStats` | function | 9364 |
| `getPlayerSourceId` | function | 2809 |
| `getPreClubHistoryPlayerNames` | function | 2528 |
| `getPreviousSeasonKey` | function | 10087 |
| `getRosterEntryRegistryProfile` | function | 10565 |
| `getRosterGameIdsForPlayer` | function | 2649 |
| `getRosterImpactPlayerEventLookup` | function | 11689 |
| `getRosterImpactPlayerGames` | function | 11760 |
| `getRosterStatus` | function | 10368 |
| `getScoreLabel` | function | 15514 |
| `getSeasonApiBaseUrl` | function | 1836 |
| `getSeasonDataPreview` | function | 6513 |
| `getSeasonDataState` | function | 22572 |
| `getSeasonIdentityProfile` | function | 10322 |
| `getSeasonmanagerRosterSuggestion` | function | 7296 |
| `getSeasonOriginBaseUrl` | function | 1856 |
| `getSeasonPlayerFieldBasis` | function | 8785 |
| `getSeasonScopedIdentityProfile` | function | 8812 |
| `getSeasonTeamGameIds` | function | 2806 |
| `getSeasonTeamGames` | function | 2802 |
| `getSeasonUiPlayerForProfile` | function | 10318 |
| `getSpecialTeamsDiagnostics` | function | 4729 |
| `getSpecialTeamsPenaltyChunks` | function | 4202 |
| `getStaticSeasonGames` | function | 6013 |
| `getStoredLastView` | function | 3433 |
| `getSyntheticLineupPlayers` | function | 18311 |
| `getSyntheticLineupRow` | function | 18314 |
| `getSyntheticLineupRows` | function | 18331 |
| `getTeamAllTimeRecords` | function | 12328 |
| `getTeamLogoUrlForStory` | function | 20315 |
| `getUlmTeamStatus` | function | 2503 |
| `getUniqueAllTimeOpponentNames` | function | 2498 |
| `globalSearchEntries` | function | 22984 |
| `globalSearchIsEditableTarget` | function | 23033 |
| `globalSearchKeyAction` | function | 23039 |
| `globalSearchMatch` | function | 23021 |
| `globalSearchMatchdayScore` | function | 23007 |
| `globalSearchOnKeydown` | function | 23134 |
| `globalSearchPlayerScore` | function | 22998 |
| `globalSearchTokens` | function | 22979 |
| `goalieApplySampleConfidence` | function | 9543 |
| `goalieBucketLooseSum` | function | 9551 |
| `goalieBucketRows` | function | 9463 |
| `goalieClampScore` | function | 9508 |
| `goalieDetailFirstTime` | function | 9487 |
| `goalieDnaKey` | function | 9768 |
| `goalieDnaValue` | function | 9773 |
| `goalieEntryRecognitionReason` | function | 2672 |
| `goalieEventAbsSeconds` | function | 3998 |
| `goalieEventSecondInPeriod` | function | 9494 |
| `goalieGameDurationSeconds` | function | 4004 |
| `goalieGameStateBeforeGoal` | function | 4009 |
| `goalieInverseScore` | function | 9512 |
| `goalieNum` | function | 9449 |
| `goaliePctText` | function | 9500 |
| `goaliePositiveCurveScore` | function | 9528 |
| `goaliePositiveScore` | function | 9520 |
| `goalieSafeNum` | function | 9504 |
| `goalieStateGoals` | function | 9780 |
| `goalieStdDev` | function | 9481 |
| `goalieTierMeta` | function | 9472 |
| `goalieTime` | function | 9455 |
| `goalieTopRow` | function | 9469 |
| `goalieWeightedScore` | function | 9537 |
| `goToMainNavPoint` | window | 22289 |
| `hallGoalieExplainForLabel` | function | 12781 |
| `hallGoalieNameHtml` | function | 12760 |
| `hallGoalieNum` | function | 12646 |
| `hallGoaliePkStats` | function | 12672 |
| `hallGoalieRowFromStats` | function | 12711 |
| `hallGoalieSeasonLabel` | function | 12660 |
| `hallGoalieSeasonScore` | function | 12691 |
| `hallGoalieTime` | function | 12652 |
| `hallGoalieTooltip` | function | 12777 |
| `hallGoalieTopteamStats` | function | 12684 |
| `handleComparisonDuoSearchKey` | window | 13232 |
| `hasEmbeddedSeasonData` | function | 8277 |
| `hashSegmentToSeasonKey` | function | 3140 |
| `hasSeasonRole` | function | 5391 |
| `hasSeasonSource` | function | 8273 |
| `hofIntroDelay` | function | 8429 |
| `identityClutchGoalsVsTeams` | function | 5272 |
| `identityDecisiveGoalsVsTeams` | function | 5275 |
| `identityGoalsVsTeams` | function | 5269 |
| `identityInputs` | function | 5306 |
| `identityLateGoalsVsTeams` | function | 5278 |
| `identityOpponentGroups` | function | 5234 |
| `identityPartnerStats` | function | 5220 |
| `identityPointsVsTeams` | function | 5266 |
| `incGoalieBucket` | function | 3994 |
| `incrementUniqueCounter` | function | 3683 |
| `initGlobalSearch` | function | 23156 |
| `initHashRouting` | function | 3564 |
| `initToolMenu` | function | 23254 |
| `invalidateGlobalIdentityCache` | function | 2241 |
| `isActiveAlltimeSeasonStats` | function | 10337 |
| `isComebackRelevantGoal` | function | 5262 |
| `isDecisiveGoal` | function | 5254 |
| `isEinsatzCenterGameFromDraft` | function | 6891 |
| `isExcludedGoalieAppearance` | function | 2682 |
| `isFieldAppearance` | function | 2702 |
| `isGamePlayed` | function | 2999 |
| `isGoalieAppearance` | function | 2696 |
| `isGoalieRosterEntry` | function | 2658 |
| `isHallOfFameEligiblePlayer` | function | 10153 |
| `isHallRowPureSG` | function | 12661 |
| `isImportantClutchGoal` | function | 5249 |
| `isLateGoal` | function | 5257 |
| `isMatchPenaltyEvent` | function | 4129 |
| `isNewSeasonDataState` | function | 22593 |
| `isPenaltyGoalEvent` | function | 4212 |
| `isPreClubHistoryPlayerName` | function | 2531 |
| `isPureSGPlayer` | function | 9350 |
| `isRookieCandidateForSeason` | function | 10122 |
| `isSameUlmTeamContext` | function | 4158 |
| `isSeasonDataPreviewStale` | function | 6521 |
| `isSgOnlyAlltimePlayer` | function | 9342 |
| `isSgOnlyHallOfFameExcluded` | function | 10144 |
| `isSyntheticLineupPlayerId` | function | 18308 |
| `isToolMenuOpen` | function | 23192 |
| `isTwoPlusTwoPenaltyEvent` | function | 4133 |
| `isUsableExternalSeasonData` | function | 6096 |
| `isValidAsOfDate` | function | 3144 |
| `isValidAsOfStartTime` | function | 3147 |
| `isVisibleSecondaryTrait` | function | 8687 |
| `kpiBadge` | function | 13936 |
| `kpiDelta` | function | 13669 |
| `kpiItemColor` | function | 13675 |
| `kpiNiceMax` | function | 13826 |
| `kpiRadarValue` | function | 13749 |
| `kpiTrendRows` | function | 13832 |
| `kpiValueText` | function | 13665 |
| `lexiconEntry` | function | 15320 |
| `lexiconUniqueKeys` | function | 15312 |
| `lineupAverage` | function | 18360 |
| `lineupBuilderPoolIds` | function | 2298 |
| `lineupCombinationIds` | function | 18837 |
| `lineupDirectChemistryScore` | function | 18881 |
| `lineupEvaluateComplementCandidate` | function | 18888 |
| `lineupGroupDisplayName` | function | 6800 |
| `lineupLevelLabel` | function | 18364 |
| `lineupOpponentDNAForContext` | function | 18461 |
| `lineupPlayerAnchorConfidence` | function | 18987 |
| `lineupPlayerAnchorScore` | function | 18967 |
| `lineupPlayerProfile` | function | 18565 |
| `lineupRankCandidateIds` | function | 18822 |
| `lineupRecommendationReason` | function | 19063 |
| `lineupRoleDnaComplementScore` | function | 18857 |
| `lineupRosterGamesForPlayer` | function | 18370 |
| `lineupRowMap` | function | 18819 |
| `lineupRowMeta` | function | 18337 |
| `lineupScore` | function | 18354 |
| `lineupStdDev` | function | 18851 |
| `linkUiPlayersToRegistry` | function | 3815 |
| `loadEinsatzCenterMismatchedAutosave` | function | 7211 |
| `loadSeason` | function | 8353 |
| `loadSeasonData` | function | 7796 |
| `loadSeasonForGlobal` | function | 8305 |
| `loadSeasonManifest` | function | 6028 |
| `mainNavActiveKeyForPage` | function | 22283 |
| `markFieldRoleAppearance` | function | 3790 |
| `matchcenterAddDuoConnection` | function | 16172 |
| `matchcenterAddPlanItem` | function | 17389 |
| `matchcenterAddPlanWatch` | function | 17395 |
| `matchcenterAddUlmDuoConnection` | function | 16323 |
| `matchcenterAddUlmScoring` | function | 15953 |
| `matchcenterAnalyzeDirect` | function | 15798 |
| `matchcenterAnalyzeForm` | function | 15835 |
| `matchcenterBuildCoachActivationHints` | function | 18105 |
| `matchcenterBuildCoachAvoidList` | function | 18095 |
| `matchcenterBuildCoachDangerPatterns` | function | 18077 |
| `matchcenterBuildCoachHints` | function | 17833 |
| `matchcenterBuildCoachIfThen` | function | 18085 |
| `matchcenterBuildCoachKeyActors` | function | 18112 |
| `matchcenterBuildCoachLevers` | function | 18067 |
| `matchcenterBuildCoachPriorities` | function | 18060 |
| `matchcenterBuildGoalieMatchup` | function | 16524 |
| `matchcenterBuildInsights` | function | 16811 |
| `matchcenterBuildIntelHeadline` | function | 17849 |
| `matchcenterBuildIntelligenceDataQuality` | function | 17484 |
| `matchcenterBuildIntelligenceSignals` | function | 17870 |
| `matchcenterBuildIntelListFromPlan` | function | 17824 |
| `matchcenterBuildMatchPlan` | function | 19182 |
| `matchcenterBuildOneThingToWatch` | function | 17857 |
| `matchcenterBuildOpponentAlarm` | function | 17714 |
| `matchcenterBuildOpponentDNA` | function | 17535 |
| `matchcenterBuildOpponentDuoInsights` | function | 16271 |
| `matchcenterBuildOpponentDuos` | function | 16226 |
| `matchcenterBuildPlanConfidence` | function | 17401 |
| `matchcenterBuildSpecialTeamsMatchup` | function | 16454 |
| `matchcenterBuildTimingAnalysis` | function | 16650 |
| `matchcenterBuildTimingInsights` | function | 16639 |
| `matchcenterBuildUlmDuoInsights` | function | 16421 |
| `matchcenterBuildUlmDuos` | function | 16378 |
| `matchcenterBuildUlmPlayerInsights` | function | 16115 |
| `matchcenterBuildUlmPlayerScouting` | function | 16060 |
| `matchcenterClassifyUlmGoalEvent` | function | 15942 |
| `matchcenterCoachAdd` | function | 17997 |
| `matchcenterCoachCautious` | function | 17994 |
| `matchcenterCoachGameModel` | function | 18006 |
| `matchcenterCoachPriorityFromAlarm` | function | 18050 |
| `matchcenterConfidenceClass` | function | 17376 |
| `matchcenterDateLabel` | function | 15674 |
| `matchcenterDefaultSeasonKey` | function | 15712 |
| `matchcenterDeriveOpponentType` | function | 17648 |
| `matchcenterDirectContextGames` | function | 16434 |
| `matchcenterDuoDirectionLabel` | function | 16165 |
| `matchcenterDuoPairKey` | function | 16128 |
| `matchcenterEmptyBuckets` | function | 15883 |
| `matchcenterEmptyTimingStats` | function | 16586 |
| `matchcenterEnsureOpponentDuo` | function | 16132 |
| `matchcenterEnsureUlmDuo` | function | 16285 |
| `matchcenterEnsureUlmPlayer` | function | 15891 |
| `matchcenterFinalizeOpponentDuos` | function | 16191 |
| `matchcenterFinalizeUlmDuos` | function | 16342 |
| `matchcenterFinalizeUlmPlayers` | function | 15991 |
| `matchcenterFormLine` | function | 16806 |
| `matchcenterGameLine` | function | 16800 |
| `matchcenterGoalAbsSeconds` | function | 16570 |
| `matchcenterGoalieFitScore` | function | 16507 |
| `matchcenterGoalieKey` | function | 16502 |
| `matchcenterGoalMinute` | function | 15869 |
| `matchcenterInferPriority` | function | 17382 |
| `matchcenterIntelAddAlarm` | function | 17693 |
| `matchcenterIntelCurve` | function | 17436 |
| `matchcenterIntelDataLabel` | function | 17481 |
| `matchcenterIntelDuoRef` | function | 17679 |
| `matchcenterIntelInverseCurve` | function | 17442 |
| `matchcenterIntelPct` | function | 17461 |
| `matchcenterIntelPlayerRef` | function | 17666 |
| `matchcenterIntelPriorityClass` | function | 17471 |
| `matchcenterIntelPriorityFromScore` | function | 17465 |
| `matchcenterIntelPriorityLabel` | function | 17477 |
| `matchcenterIntelRate` | function | 17457 |
| `matchcenterIntelWeighted` | function | 17446 |
| `matchcenterIsFreiburgTuebingenTeamName` | function | 15699 |
| `matchcenterOpponentMode` | function | 15729 |
| `matchcenterPct` | function | 16450 |
| `matchcenterPersonalPenaltyMinutesForSide` | function | 16441 |
| `matchcenterPlanRateText` | function | 17368 |
| `matchcenterPlanScoreText` | function | 17364 |
| `matchcenterPriorityLabel` | function | 17373 |
| `matchcenterRegisterUlmProfileGame` | function | 15929 |
| `matchcenterResultClass` | function | 16791 |
| `matchcenterSeasonHasGames` | function | 15709 |
| `matchcenterSigned` | function | 15668 |
| `matchcenterSocialAdd` | function | 18174 |
| `matchcenterSocialCaption` | function | 18181 |
| `matchcenterSpecialTeamsForGame` | function | 16437 |
| `matchcenterStoryAddCandidate` | function | 20419 |
| `matchcenterStoryAddFact` | function | 20400 |
| `matchcenterStoryBestClutchDuo` | function | 20644 |
| `matchcenterStoryBestClutchPlayer` | function | 20600 |
| `matchcenterStoryCandidateForBudget` | function | 20457 |
| `matchcenterStoryCategoryForPlanFact` | function | 20729 |
| `matchcenterStoryCategoryLimit` | function | 20442 |
| `matchcenterStoryClutchFact` | function | 20577 |
| `matchcenterStoryClutchPriority` | function | 20678 |
| `matchcenterStoryCompetitionLabel` | function | 20681 |
| `matchcenterStoryCurrentStreak` | function | 20524 |
| `matchcenterStoryDirectFactCandidates` | function | 20694 |
| `matchcenterStoryDownloadFileName` | function | 19650 |
| `matchcenterStoryDuoClutchFact` | function | 20654 |
| `matchcenterStoryDuoClutchTotal` | function | 20636 |
| `matchcenterStoryDuoFact` | function | 20657 |
| `matchcenterStoryEstimateFactWeight` | function | 20413 |
| `matchcenterStoryFactKey` | function | 20407 |
| `matchcenterStoryFormFact` | function | 20542 |
| `matchcenterStoryFormFactCandidates` | function | 20553 |
| `matchcenterStoryInlineStat` | function | 20382 |
| `matchcenterStoryLastDuelLabel` | function | 20690 |
| `matchcenterStoryLateGoalsForOutcome` | function | 20573 |
| `matchcenterStoryLogoBase` | function | 20294 |
| `matchcenterStoryLogoForOpponent` | function | 20345 |
| `matchcenterStoryLooksArtificial` | function | 20410 |
| `matchcenterStoryNameClass` | function | 20850 |
| `matchcenterStoryNormalizePickOptions` | function | 20446 |
| `matchcenterStoryPickFactItems` | function | 20467 |
| `matchcenterStoryPickFacts` | function | 20520 |
| `matchcenterStoryPlanFactCandidates` | function | 20716 |
| `matchcenterStoryPlayerClutchFact` | function | 20610 |
| `matchcenterStoryPlayerClutchTotal` | function | 20592 |
| `matchcenterStoryRankRows` | function | 20386 |
| `matchcenterStoryRankText` | function | 20378 |
| `matchcenterStorySafeLogoUrl` | function | 20300 |
| `matchcenterStoryShortDuel` | function | 20685 |
| `matchcenterStoryTableRank` | function | 20360 |
| `matchcenterStoryUlmTableRank` | function | 20371 |
| `matchcenterStoryVisibleFacts` | function | 20856 |
| `matchcenterStoryWinlessStreak` | function | 20533 |
| `matchcenterTimeValue` | function | 16578 |
| `matchcenterTimingStatsForGames` | function | 16602 |
| `matchcenterUlmScoutingConfidence` | function | 15886 |
| `matchcenterUlmTeamLabelForGame` | function | 16795 |
| `matchcenterUpdateUlmSeasonRow` | function | 15935 |
| `matchcenterWindowForSecond` | function | 16595 |
| `matchdayFixtureCardHtml` | function | 22434 |
| `matchdayGameCardHtml` | function | 22415 |
| `matchdayUlmGames` | function | 22412 |
| `medianOrNull` | function | 3988 |
| `mergeDuoSet` | function | 4818 |
| `mergeGoalieSpecialTeamsStats` | function | 4450 |
| `mergeSpecialTeamsStats` | function | 4094 |
| `moveGlobalSearch` | function | 23118 |
| `normalizeAssistPlayerName` | function | 2876 |
| `normalizeComparisonItem` | function | 12944 |
| `normalizeDuoComparisonItem` | function | 13188 |
| `normalizeEventPlayerRef` | function | 2815 |
| `normalizeLineupLines` | function | 2301 |
| `normalizePlayerName` | function | 2518 |
| `normalizeSecondaryTraits` | function | 5365 |
| `onGlobalSearchInput` | window | 23112 |
| `openAllTimePlayers` | window | 8421 |
| `openComparisonCenter` | window | 8591 |
| `openDuoProPicker` | window | 11528 |
| `openEinsatzCenter` | window | 6751 |
| `openGlobalSearch` | window | 23079 |
| `openHallOfFame` | window | 8567 |
| `openLexicon` | window | 8664 |
| `openLigaGegner` | window | 22836 |
| `openLineupBuilder` | window | 8642 |
| `openMatchcenter` | window | 8620 |
| `openMatchcenterStoryPreview` | window | 2254 |
| `openMatchday` | window | 22394 |
| `openMatchdayTimeline` | window | 22386 |
| `openOverview` | window | 22335 |
| `openSeason` | window | 8418 |
| `openToolMenu` | window | 23196 |
| `overviewCompactTableHtml` | function | 22663 |
| `overviewCrossSeasonTrendHtml` | function | 22712 |
| `overviewFormHtml` | function | 22671 |
| `overviewLastMatchdayText` | function | 22629 |
| `overviewLineupLinkHtml` | function | 22729 |
| `overviewMatchcenterLinkHtml` | function | 22726 |
| `overviewMatchdayEndMs` | function | 22534 |
| `overviewMatchdayStartMs` | function | 22528 |
| `overviewNextMatchdayHtml` | function | 22639 |
| `overviewOpponentLabel` | function | 22617 |
| `overviewOpponentPreviewHtml` | function | 22721 |
| `overviewRankChangeTile` | function | 22748 |
| `overviewRecordHtml` | function | 22705 |
| `overviewSeasonAwardHtml` | function | 22694 |
| `overviewSeasonBilanzHtml` | function | 22686 |
| `p1NarrativeKey` | function | 15588 |
| `paintGlobalSearchResults` | function | 23071 |
| `parseAppHash` | function | 3247 |
| `parseAsOfQueryValue` | function | 3286 |
| `parseComparisonVariant` | function | 13109 |
| `parseLastViewState` | function | 3421 |
| `parseSeasonDataState` | function | 22583 |
| `pct` | function | 5173 |
| `pctValue` | function | 12584 |
| `pdashBestPhase` | function | 14222 |
| `pdashInsight` | function | 14260 |
| `pdashInsights` | function | 14263 |
| `pdashNum` | function | 14206 |
| `pdashOpponentStrength` | function | 14240 |
| `pdashOpponentTier` | function | 14234 |
| `pdashPct` | function | 14210 |
| `pdashPhaseLabel` | function | 14214 |
| `pdashTopCount` | function | 14218 |
| `pdashTopOpponent` | function | 14230 |
| `pdashTopPartner` | function | 14226 |
| `penaltyRawText` | function | 4126 |
| `playerAppearedForUlmStatusInSeasonByName` | function | 10103 |
| `playerAppearedInSeasonByName` | function | 10092 |
| `playerExplainAdd` | function | 14896 |
| `playerExplainConfidence` | function | 14887 |
| `playerExplainConfidenceLabel` | function | 14893 |
| `playerExplainContextSentence` | function | 14932 |
| `playerExplainHeadline` | function | 14922 |
| `playerExplainRolePhrase` | function | 14913 |
| `playerExplainStyleSignature` | function | 14901 |
| `processGame` | function | 2940 |
| `rAlltimeKpis` | function | 12900 |
| `rAlltimePlayerDashboard` | function | 14415 |
| `rAllTimePlayersPage` | function | 15177 |
| `rankNarratives` | function | 15610 |
| `rAntiSynergyCompareChip` | function | 11923 |
| `rAntiSynergyDelta` | function | 11907 |
| `rAntiSynergyMainDelta` | function | 11970 |
| `rAntiSynergyMetricRow` | function | 11931 |
| `rAntiSynergyWinrateRow` | function | 11953 |
| `rAntiSynergyWinrateText` | function | 11947 |
| `rAsOfSelector` | function | 22857 |
| `ratio01` | function | 5174 |
| `rAvgResponseTimeNote` | function | 12204 |
| `rCarryPerformanceRows` | function | 10264 |
| `rClassicRoleTags` | function | 8773 |
| `rClassicTagTip` | function | 8711 |
| `rClutch` | function | 8979 |
| `rClutchBadge` | function | 8673 |
| `rComparisonCenterPage` | function | 14085 |
| `rComparisonDashboard` | function | 14036 |
| `rComparisonDuoSearchBox` | function | 13418 |
| `rComparisonDuoSuggestionButtons` | function | 13211 |
| `rComparisonMiniOverview` | function | 14024 |
| `rComparisonModeSelect` | function | 13439 |
| `rComparisonRoles` | function | 14028 |
| `rComparisonStyles` | function | 14047 |
| `rContextBar` | function | 22940 |
| `rDifficultConnectionList` | function | 11980 |
| `rDifficultConnectionListCompact` | function | 12047 |
| `rDifficultConnectionListCompactLegacy` | function | 12005 |
| `rDifficultConnectionsCard` | function | 12086 |
| `rDuoCenterPro` | function | 11370 |
| `rDuoCompareSummaryCards` | function | 13297 |
| `rDuoComparisonBars` | function | 13292 |
| `rDuoComparisonChemistry` | function | 13350 |
| `rDuoComparisonContext` | function | 13382 |
| `rDuoComparisonDashboard` | function | 13404 |
| `rDuoComparisonDetails` | function | 13400 |
| `rDuoComparisonImpact` | function | 13366 |
| `rDuoComparisonPage` | function | 13428 |
| `rDuoComparisonProfile` | function | 13328 |
| `rDuoProPlayerSelect` | function | 11557 |
| `rDuoResponseMomentumCard` | function | 12262 |
| `rDuoRows` | function | 10523 |
| `recommendLineComplements` | function | 19154 |
| `recordOverviewVisit` | function | 22602 |
| `registerPlayerIdentity` | function | 3762 |
| `registerSeasonRosters` | function | 3795 |
| `rEinsatzCenterAutosaveBanner` | function | 7173 |
| `rEinsatzCenterCombo` | function | 6696 |
| `rEinsatzCenterComboEditor` | function | 7401 |
| `rEinsatzCenterDraftBanner` | function | 6914 |
| `rEinsatzCenterDraftMark` | function | 6900 |
| `rEinsatzCenterDraftStatsHint` | function | 6904 |
| `rEinsatzCenterEditPage` | function | 7501 |
| `rEinsatzCenterGameCard` | function | 6705 |
| `rEinsatzCenterGameEditor` | function | 7448 |
| `rEinsatzCenterGroup` | function | 6683 |
| `rEinsatzCenterGroupEditor` | function | 7370 |
| `rEinsatzCenterPage` | function | 6724 |
| `rEinsatzCenterRosterSuggestionCard` | function | 7417 |
| `rEinsatzCenterStats` | function | 6806 |
| `relative01` | function | 5175 |
| `removeComparisonDuo` | window | 13262 |
| `removeComparisonItem` | window | 13174 |
| `removeEinsatzCenterCombo` | window | 7738 |
| `removeEinsatzCenterGroup` | window | 7652 |
| `removeEinsatzCenterGroupPlayer` | window | 7702 |
| `removeEinsatzCenterRosterPlayer` | window | 7583 |
| `removeLineupBuilderPlayerFromLine` | window | 2348 |
| `removeLineupPlayer` | window | 2289 |
| `rEmptyState` | function | 15636 |
| `renameEinsatzCenterGroup` | window | 7674 |
| `render` | function | 21620 |
| `renderComparisonDuoSuggestions` | function | 13215 |
| `renderTags` | function | 8781 |
| `repairRenderedMojibake` | function | 2464 |
| `resetPlayerRegistrySeason` | function | 3707 |
| `resolveAssistPlayer` | function | 2921 |
| `resolveCurrentSeasonKey` | function | 6059 |
| `resolveGoalScorerPlayer` | function | 2858 |
| `resolveLineupPlayerName` | function | 6668 |
| `resolvePlayerRoleView` | function | 9434 |
| `resolveRosterPlayerByRef` | function | 2827 |
| `responseExcerpt` | function | 5897 |
| `responseMomentumAbsSeconds` | function | 10702 |
| `responseMomentumActor` | function | 10731 |
| `responseMomentumConfidence` | function | 10851 |
| `responseMomentumEmptyState` | function | 10856 |
| `responseMomentumGameRows` | function | 10715 |
| `responseMomentumGoalActors` | function | 10742 |
| `responseMomentumPairKey` | function | 10864 |
| `responseMomentumSide` | function | 10722 |
| `responseMomentumTime` | function | 10708 |
| `responseMomentumTooltipFor` | function | 12167 |
| `restoreEinsatzCenterAutosave` | function | 7147 |
| `restoreHallOfFameIntroPrevious` | function | 8509 |
| `resultGoalsAgainstForSide` | function | 4030 |
| `returnToEinsatzCenterEdit` | window | 7569 |
| `rGlobalAllTimeStats` | function | 14523 |
| `rGlobalCareerHeader` | function | 14432 |
| `rGlobalDevelopment` | function | 14541 |
| `rGlobalDnaBars` | function | 14176 |
| `rGlobalDuoNetwork` | function | 14641 |
| `rGlobalOpponentSpecialist` | function | 14840 |
| `rGlobalOverview` | function | 14470 |
| `rGlobalPartnerOpponentPanel` | function | 14418 |
| `rGlobalProfileTags` | function | 12575 |
| `rGlobalSearchPanelHtml` | function | 23068 |
| `rGlobalSearchResultsHtml` | function | 23057 |
| `rGlobalSearchToggle` | function | 23054 |
| `rGoalieAnalysis` | function | 10060 |
| `rGoalieBars` | function | 9717 |
| `rGoalieDnaBars` | function | 9863 |
| `rGoalieFirstGoalResistance` | function | 9900 |
| `rGoalieInsights` | function | 9973 |
| `rGoalieKpis` | function | 9877 |
| `rGoalieMiniMetrics` | function | 9894 |
| `rGoalieMomentum` | function | 9914 |
| `rGoalieOpponents` | function | 10015 |
| `rGoalieOverview` | function | 9995 |
| `rGoaliePhaseProfile` | function | 9956 |
| `rGoaliePhases` | function | 10012 |
| `rGoalieRoleTraits` | function | 9855 |
| `rGoalieStability` | function | 10027 |
| `rGoalieTable` | function | 10052 |
| `rGoalieTierCards` | function | 9928 |
| `rHallDuoTemple` | function | 12637 |
| `rHallGoalieAwardCards` | function | 12828 |
| `rHallGoalieLegends` | function | 12845 |
| `rHallGoalieRankCard` | function | 12796 |
| `rHallOfFameHero` | function | 12588 |
| `rHallOfFamePage` | function | 15219 |
| `rHallPodiumList` | function | 12614 |
| `rHallSGBadge` | function | 12669 |
| `rIaShell` | function | 22960 |
| `rIdentityCards` | function | 8747 |
| `rIdentityTags` | function | 8727 |
| `rInsights` | function | 9240 |
| `rInteractiveDuoCenterPro` | function | 11564 |
| `rKpiCards` | function | 13678 |
| `rKpiExtendedMetrics` | function | 13811 |
| `rKpiInfoCards` | function | 13946 |
| `rKpiMetricCard` | function | 13803 |
| `rKpiMirrorRows` | function | 13689 |
| `rKpiObjectMini` | function | 13939 |
| `rKpiOpponentStrength` | function | 13908 |
| `rKpiRadar` | function | 13760 |
| `rKpiShareBars` | function | 13795 |
| `rKpiTextMetricCard` | function | 13808 |
| `rKpiTrendCompare` | function | 13841 |
| `rKPIVergleich` | function | 14010 |
| `rLexiconPage` | function | 15334 |
| `rLexiconRows` | function | 15330 |
| `rLigaGegnerPlaceholderPage` | function | 22840 |
| `rLineupBuilderAvailablePanel` | function | 20016 |
| `rLineupBuilderPage` | function | 20192 |
| `rLineupComplementCards` | function | 20113 |
| `rLineupMetricPills` | function | 20002 |
| `rLineupRecommendationCards` | function | 20064 |
| `rLineupRecommendationMode` | function | 20079 |
| `rLineupScoreRows` | function | 19898 |
| `rLineupSimpleCards` | function | 19920 |
| `rLineupTestLine` | function | 20126 |
| `rLineupTestMode` | function | 20175 |
| `rMainNav` | function | 22296 |
| `rMainNavBottom` | function | 22318 |
| `rMatchcenterCoachCardList` | function | 19477 |
| `rMatchcenterCoachIfThen` | function | 19491 |
| `rMatchcenterCoachSimpleList` | function | 19499 |
| `rMatchcenterCopyButton` | function | 19569 |
| `rMatchcenterDetailsSection` | function | 16783 |
| `rMatchcenterDigitalCoach` | function | 19504 |
| `rMatchcenterDuoRankCard` | function | 17102 |
| `rMatchcenterDuoRow` | function | 17078 |
| `rMatchcenterDuosTab` | function | 17249 |
| `rMatchcenterDuoWatchCard` | function | 17058 |
| `rMatchcenterFormCard` | function | 16839 |
| `rMatchcenterFormSection` | function | 16757 |
| `rMatchcenterGamesList` | function | 16860 |
| `rMatchcenterGoalieCard` | function | 17311 |
| `rMatchcenterGoalieMatchup` | function | 17335 |
| `rMatchcenterIntelCoachHints` | function | 19463 |
| `rMatchcenterIntelOverview` | function | 19417 |
| `rMatchcenterKpi` | function | 16832 |
| `rMatchcenterLineupBuilder` | function | 19929 |
| `rMatchcenterLockerList` | function | 19574 |
| `rMatchcenterLockerRoomSheet` | function | 19586 |
| `rMatchcenterMatchPlan` | function | 20271 |
| `rMatchcenterOpponentAlarm` | function | 19395 |
| `rMatchcenterOpponentDNA` | function | 19362 |
| `rMatchcenterOpponentDuos` | function | 17206 |
| `rMatchcenterOpponentScouting` | function | 17019 |
| `rMatchcenterPage` | function | 21102 |
| `rMatchcenterPlanItems` | function | 19328 |
| `rMatchcenterPlanWatch` | function | 19346 |
| `rMatchcenterPlayerRow` | function | 16893 |
| `rMatchcenterPlayersTab` | function | 17055 |
| `rMatchcenterProfileSection` | function | 16737 |
| `rMatchcenterRankCard` | function | 16917 |
| `rMatchcenterResponseMomentum` | function | 12289 |
| `rMatchcenterScoutingSummary` | function | 20227 |
| `rMatchcenterSocialBlock` | function | 19642 |
| `rMatchcenterSocialMediaCenter` | function | 19844 |
| `rMatchcenterSpecialCard` | function | 17252 |
| `rMatchcenterSpecialTeams` | function | 17261 |
| `rMatchcenterStoryForm` | function | 20892 |
| `rMatchcenterStoryFrame` | function | 20975 |
| `rMatchcenterStoryLogo` | function | 20887 |
| `rMatchcenterStoryPlayerCard` | function | 20897 |
| `rMatchcenterStoryPreview` | function | 20905 |
| `rMatchcenterTabs` | function | 16734 |
| `rMatchcenterTimeBars` | function | 16661 |
| `rMatchcenterTiming` | function | 16695 |
| `rMatchcenterTimingStatsCard` | function | 16675 |
| `rMatchcenterUlmDuoRankCard` | function | 17157 |
| `rMatchcenterUlmDuoRow` | function | 17134 |
| `rMatchcenterUlmDuos` | function | 17163 |
| `rMatchcenterUlmDuoWatchCard` | function | 17108 |
| `rMatchcenterUlmImpactCard` | function | 16923 |
| `rMatchcenterUlmPlayerRow` | function | 16952 |
| `rMatchcenterUlmRankCard` | function | 16976 |
| `rMatchcenterUlmScouting` | function | 16982 |
| `rMatchcenterWatchCard` | function | 16872 |
| `rMatchdayDetailPage` | function | 22463 |
| `rMatchdayPage` | function | 22503 |
| `rMatchdayTimelinePage` | function | 22452 |
| `rMatchdayTimelineRow` | function | 22444 |
| `rMatrix` | function | 8852 |
| `rmTerm` | function | 12174 |
| `roleGameStableKey` | function | 2730 |
| `roleTraitLabel` | function | 8684 |
| `rOppBreakdown` | function | 9144 |
| `rOpponentIntelBars` | function | 10487 |
| `rOpponentTopScorerTable` | function | 12428 |
| `rosterImpactConfidence` | function | 11802 |
| `rosterImpactConfidenceWeight` | function | 11816 |
| `rosterPlayerMatches` | function | 2634 |
| `rOverviewPage` | function | 22824 |
| `rPdashLabel` | function | 14367 |
| `rPdashStat` | function | 14370 |
| `rPenalties` | function | 9125 |
| `rPhases` | function | 8909 |
| `rPlayerDash` | function | 14373 |
| `rPlayerDashStyles` | function | 14355 |
| `rPlayerExplainItems` | function | 15119 |
| `rPlayerExplanation` | function | 15124 |
| `rPlayerResponseMomentumCard` | function | 12243 |
| `rPlayerRoleSwitch` | function | 9442 |
| `rRadar` | function | 8929 |
| `rRes` | const-arrow | 8672 |
| `rResponseMomentumOverviewCard` | function | 12219 |
| `rResponseRateDisplay` | function | 12183 |
| `rRmKpi` | function | 12190 |
| `rRmTopList` | function | 12208 |
| `rRoleTraitTip` | function | 8691 |
| `rRosterImpactStatLine` | function | 11962 |
| `rRosterStatusBadge` | function | 8700 |
| `rScoreBreakdown` | function | 15650 |
| `rSeasonDataPreviewCard` | function | 6540 |
| `rSeasonDataPreviewContextHint` | function | 22892 |
| `rSeasonDataPreviewRows` | function | 6530 |
| `rSeasonDataPreviewStatus` | function | 6527 |
| `rSeasonDataStateContextHint` | function | 22909 |
| `rSeasonDuoCenterPro` | function | 11620 |
| `rSeasonDuoSummary` | function | 8899 |
| `rSeasonInsightsTab` | function | 9225 |
| `rSeasonLandingPage` | function | 14454 |
| `rSeasonPlayerDashboard` | function | 14412 |
| `rSeasonProfileKpis` | function | 8824 |
| `rSeasonProfileTagStrip` | function | 8845 |
| `rSeasonTrendRows` | function | 14136 |
| `rSocialVideoBlock` | function | 19711 |
| `rSparkline` | function | 12914 |
| `rStyleMetricTip` | function | 8696 |
| `rStyleProfileBars` | function | 8736 |
| `rTable` | function | 9294 |
| `rTeamPage` | function | 21251 |
| `rTeamResponseMomentumCard` | function | 12282 |
| `rTimeline` | function | 9014 |
| `rToolMenu` | function | 23182 |
| `runComparison` | window | 13179 |
| `runDuoComparison` | window | 13267 |
| `saveLastView` | function | 3438 |
| `scoreNarrative` | function | 15591 |
| `seasonApiUrl` | function | 1853 |
| `seasonDataPreviewRerender` | function | 6386 |
| `seasonDataPreviewRow` | function | 6390 |
| `seasonGameApiUrls` | function | 1871 |
| `seasonGameHtmlUrls` | function | 1881 |
| `seasonHasPureUlmTeam` | function | 10137 |
| `seasonKeyToHashSegment` | function | 3137 |
| `seasonPathPrefix` | function | 1865 |
| `seasonRoleKeysForPlayer` | function | 5382 |
| `seasonRoleTraitsFromClassic` | function | 5377 |
| `seasonStatNumber` | function | 10327 |
| `seasonStatSetSize` | function | 10331 |
| `seedHallOfFameIntroParticles` | function | 8476 |
| `selectAllLineupAvailable` | window | 2335 |
| `selectComparisonDuoSuggestion` | window | 13225 |
| `selectComparisonMode` | window | 13186 |
| `selectComparisonPlayer` | window | 13143 |
| `selectDuoProQuick` | window | 11530 |
| `selectEinsatzCenterEditGame` | window | 7571 |
| `selectEnforcerKeys` | function | 5394 |
| `serializeFieldRoleSeasonStats` | function | 3911 |
| `serializeGoalieSeasonStats` | function | 3889 |
| `serializeSeasonStats` | function | 3876 |
| `serializeSpecialTeamsStats` | function | 4091 |
| `setAntiSynergyView` | window | 2381 |
| `setComparisonDuoMode` | window | 13196 |
| `setComparisonDuoPlayer` | window | 13245 |
| `setComparisonDuoSearch` | window | 13198 |
| `setComparisonDuoSeasonKey` | window | 13197 |
| `setComparisonRoleMode` | window | 13149 |
| `setComparisonVariant` | window | 13154 |
| `setContextAsOf` | window | 22870 |
| `setDuoProPickerState` | function | 11499 |
| `setDuoProSelection` | window | 11549 |
| `setEinsatzCenterGameNote` | window | 7745 |
| `setEinsatzCenterGroupPlayerPosition` | window | 7710 |
| `setEinsatzCenterIncludeDraft` | window | 7570 |
| `setEinsatzCenterSeason` | window | 6745 |
| `setGlobalPlayer` | window | 2407 |
| `setGlobalPlayerDuo` | window | 2408 |
| `setGlobalTab` | window | 2409 |
| `setGoalieTab` | window | 2248 |
| `setLineupActiveLine` | window | 2320 |
| `setLineupBuilderMode` | window | 2319 |
| `setLineupBuilderOpponent` | window | 2318 |
| `setLineupBuilderSeason` | window | 2306 |
| `setLineupNewPlayerProfile` | window | 2362 |
| `setMatchcenterContext` | window | 8661 |
| `setMatchcenterOpponent` | window | 8660 |
| `setMatchcenterSeason` | window | 8662 |
| `setMatchcenterTab` | window | 2253 |
| `setP` | window | 2245 |
| `setPage` | window | 2391 |
| `setPlayerRoleView` | window | 2247 |
| `setSeasonDataPreviewOpen` | window | 6576 |
| `setSeasonDataPreviewPasteText` | window | 6577 |
| `setState` | const-arrow | 2233 |
| `setTab` | window | 2246 |
| `showLineupComplements` | window | 2361 |
| `showMainShell` | function | 8268 |
| `socialDuoFocusLine` | function | 18204 |
| `socialEnsurePeriod` | function | 18190 |
| `socialFirstUseful` | function | 18194 |
| `socialKeyFactLine` | function | 18214 |
| `socialOpponentLine` | function | 18210 |
| `socialPlayerFocusLine` | function | 18197 |
| `socialSentence` | function | 18187 |
| `socialVideoJobsForMatchday` | function | 19745 |
| `specialTeamsStateFromActive` | function | 4217 |
| `stageSeasonDataPreview` | function | 6436 |
| `stageSeasonDataPreviewFromFile` | function | 6488 |
| `stageSeasonDataPreviewFromPaste` | function | 6502 |
| `startApp` | window | 8406 |
| `startEinsatzCenterDraftMode` | window | 7551 |
| `startHallOfFameIntro` | function | 8529 |
| `sumRoleGames` | function | 9414 |
| `switchMatchdaySeason` | window | 22405 |
| `switchOverviewSeason` | window | 22352 |
| `syncHashFromState` | function | 3380 |
| `t2s` | const-arrow | 2929 |
| `toggleAntiSynergyHideSgOnly` | window | 2383 |
| `toggleAntiSynergyShowAll` | window | 2382 |
| `toggleComparisonPicker` | window | 13173 |
| `toggleComparisonSgOnly` | window | 13158 |
| `toggleEinsatzCenterComboPlayer` | window | 7719 |
| `toggleEinsatzCenterGroupRename` | window | 7660 |
| `toggleEinsatzCenterRosterSuggestionPlayer` | window | 7591 |
| `toggleHallOfFamePureSGPlayers` | window | 2256 |
| `toggleLineupBuilderAvailable` | window | 2321 |
| `toggleMatchcenterDuoDetails` | window | 2252 |
| `toggleMatchcenterGames` | window | 8663 |
| `toggleMatchcenterPlayerDetails` | window | 2251 |
| `toggleMatchcenterSpecialTeamsGames` | window | 2250 |
| `toggleSgOnlyAlltime` | window | 2410 |
| `toggleSpecialTeamsGameDetails` | window | 2249 |
| `toggleToolMenu` | window | 23211 |
| `toolMenuElements` | function | 23186 |
| `toolMenuItemElements` | function | 23189 |
| `toolMenuOnClick` | function | 23247 |
| `toolMenuOnKeydown` | function | 23223 |
| `toPublicPlayerRegistry` | function | 3915 |
| `uiDatenstandBand` | function | 22104 |
| `uiDeltaIndicator` | function | 21869 |
| `uiFormatNumber` | function | 21841 |
| `uiHinweisKarte` | function | 21933 |
| `uiInfoIcon` | function | 21887 |
| `uiIntervallBalken` | function | 22009 |
| `uiKennzahlKachel` | function | 21899 |
| `uiKernaussage` | function | 21919 |
| `uiMethodenbox` | function | 22028 |
| `uiNotiz` | function | 22045 |
| `uiObjektseite` | function | 22193 |
| `uiObjektseiteSortTabs` | function | 22175 |
| `uiPlatzhalter` | function | 22125 |
| `uiQuoteText` | function | 22081 |
| `uiRangliste` | function | 21955 |
| `uiReliabilityDots` | function | 21854 |
| `uiVerlauf` | function | 21983 |
| `uniqueList` | function | 1868 |
| `updateCoverAllTimeStats` | function | 8295 |
| `updatePlayerRoleAvailability` | function | 4711 |
| `validateGameStructure` | function | 6197 |
| `validateMergedSeason` | function | 6284 |
| `validateSeasonGames` | function | 6238 |
| `validateSeasonKey` | function | 6261 |
| `validateWrapperFormat` | function | 6273 |
| `variance` | function | 2931 |
| `viewEinsatzCenterMergedView` | window | 7568 |
| `warnEventProcessingOnce` | function | 2626 |
| `withoutHashSync` | function | 3397 |

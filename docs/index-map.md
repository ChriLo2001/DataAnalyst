# Code-Karte: index.html

<!-- index-map: source-sha256=6c96f20a7017c478f4c00774ea826e4e94be3c924cdc939048f913379e5b7fa0 source-lines=23356 -->

Automatisch erzeugt von `scripts/build-index-map.mjs`. Nicht von Hand bearbeiten — bei Änderungen an index.html erneut ausführen: `node scripts/build-index-map.mjs --write`. Vor gezieltem Lesen prüfen, ob die Karte noch aktuell ist: `node scripts/build-index-map.mjs --check`.

index.html: 23356 Zeilen gesamt (SHA-256 `6c96f20a7017c478f4c00774ea826e4e94be3c924cdc939048f913379e5b7fa0`). Statischer `<style>`-Block: Zeile 11–1550. Haupt-`<script>`-Block: Zeile 1664–23352.

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
| `rKpiMirrorRows` | function | 13691–13750 | 60 |
| `rKpiRadar` | function | 13762–13796 | 35 |
| `rKpiTrendCompare` | function | 13843–13909 | 67 |
| `rKpiOpponentStrength` | function | 13910–13937 | 28 |
| `rKpiInfoCards` | function | 13948–13979 | 32 |
| `buildComparisonSummary` | function | 13980–14011 | 32 |
| `rComparisonStyles` | function | 14049–14086 | 38 |
| `rComparisonCenterPage` | function | 14087–14137 | 51 |
| `rGlobalDnaBars` | function | 14178–14207 | 30 |
| `buildSeasonPlayerDashModel` | function | 14277–14313 | 37 |
| `buildAlltimePlayerDashModel` | function | 14314–14356 | 43 |
| `rPlayerDashStyles` | function | 14357–14368 | 12 |
| `rPlayerDash` | function | 14375–14413 | 39 |
| `rGlobalOverview` | function | 14472–14523 | 52 |
| `rGlobalDevelopment` | function | 14543–14581 | 39 |
| `rGlobalDuoNetwork` | function | 14643–14840 | 198 |
| `rGlobalOpponentSpecialist` | function | 14842–14887 | 46 |
| `buildFieldPlayerExplanation` | function | 14953–15027 | 75 |
| `buildGoaliePlayerExplanation` | function | 15028–15081 | 54 |
| `buildPlayerIntelligence` | function | 15091–15120 | 30 |
| `rPlayerExplanation` | function | 15126–15177 | 52 |
| `rAllTimePlayersPage` | function | 15179–15219 | 41 |
| `rHallOfFamePage` | function | 15221–15309 | 89 |
| `rLexiconPage` | function | 15336–15508 | 173 |
| `buildConfidence` | function | 15525–15570 | 46 |
| `getMatchcenterOpponents` | function | 15734–15766 | 33 |
| `getMatchcenterDirectOpponents` | function | 15767–15797 | 31 |
| `matchcenterAnalyzeDirect` | function | 15800–15836 | 37 |
| `matchcenterEnsureUlmPlayer` | function | 15893–15930 | 38 |
| `matchcenterAddUlmScoring` | function | 15955–15992 | 38 |
| `matchcenterFinalizeUlmPlayers` | function | 15993–16061 | 69 |
| `matchcenterBuildUlmPlayerScouting` | function | 16062–16116 | 55 |
| `matchcenterEnsureOpponentDuo` | function | 16134–16166 | 33 |
| `matchcenterFinalizeOpponentDuos` | function | 16193–16227 | 35 |
| `matchcenterBuildOpponentDuos` | function | 16228–16272 | 45 |
| `matchcenterEnsureUlmDuo` | function | 16287–16324 | 38 |
| `matchcenterFinalizeUlmDuos` | function | 16344–16379 | 36 |
| `matchcenterBuildUlmDuos` | function | 16380–16422 | 43 |
| `matchcenterBuildSpecialTeamsMatchup` | function | 16456–16503 | 48 |
| `matchcenterBuildGoalieMatchup` | function | 16526–16571 | 46 |
| `matchcenterTimingStatsForGames` | function | 16604–16640 | 37 |
| `rMatchcenterUlmScouting` | function | 16984–17020 | 37 |
| `rMatchcenterOpponentScouting` | function | 17021–17056 | 36 |
| `rMatchcenterUlmDuos` | function | 17165–17207 | 43 |
| `rMatchcenterOpponentDuos` | function | 17208–17250 | 43 |
| `rMatchcenterSpecialTeams` | function | 17263–17312 | 50 |
| `matchcenterBuildPlanConfidence` | function | 17403–17437 | 35 |
| `matchcenterBuildIntelligenceDataQuality` | function | 17486–17536 | 51 |
| `matchcenterBuildOpponentDNA` | function | 17537–17649 | 113 |
| `matchcenterBuildOpponentAlarm` | function | 17716–17825 | 110 |
| `matchcenterBuildIntelligenceSignals` | function | 17872–17918 | 47 |
| `buildMatchIntelligenceFromContext` | function | 17919–17973 | 55 |
| `buildMatchStories` | function | 18022–18051 | 30 |
| `buildDigitalCoachReport` | function | 18122–18154 | 33 |
| `buildMatchdayCaptionBlocks` | function | 18226–18255 | 30 |
| `buildSocialMediaContent` | function | 18256–18304 | 49 |
| `lineupRosterGamesForPlayer` | function | 18372–18419 | 48 |
| `buildLineupExperienceProfile` | function | 18420–18462 | 43 |
| `buildLineupOpponentDNAFit` | function | 18475–18518 | 44 |
| `classifyLineIdentity` | function | 18519–18566 | 48 |
| `lineupPlayerProfile` | function | 18567–18642 | 76 |
| `buildLineupAnalysis` | function | 18643–18776 | 134 |
| `buildLineupScoreBreakdowns` | function | 18777–18806 | 30 |
| `lineupEvaluateComplementCandidate` | function | 18890–18968 | 79 |
| `buildTeamLineBalance` | function | 18994–19037 | 44 |
| `buildLineupRecommendations` | function | 19074–19155 | 82 |
| `matchcenterBuildMatchPlan` | function | 19184–19329 | 146 |
| `rMatchcenterOpponentDNA` | function | 19364–19396 | 33 |
| `rMatchcenterIntelOverview` | function | 19419–19464 | 46 |
| `rMatchcenterDigitalCoach` | function | 19506–19570 | 65 |
| `rMatchcenterLockerRoomSheet` | function | 19588–19643 | 56 |
| `downloadMatchdayStory` | window | 19662–19709 | 48 |
| `rSocialVideoBlock` | function | 19713–19744 | 32 |
| `generateSocialVideoVideos` | window | 19754–19795 | 42 |
| `rMatchcenterSocialMediaCenter` | function | 19846–19899 | 54 |
| `rMatchcenterLineupBuilder` | function | 19931–20003 | 73 |
| `rLineupBuilderAvailablePanel` | function | 20018–20065 | 48 |
| `rLineupRecommendationMode` | function | 20081–20114 | 34 |
| `rLineupTestLine` | function | 20128–20176 | 49 |
| `rLineupBuilderPage` | function | 20194–20228 | 35 |
| `rMatchcenterScoutingSummary` | function | 20229–20272 | 44 |
| `getTeamLogoUrlForStory` | function | 20317–20346 | 30 |
| `matchcenterStoryPickFactItems` | function | 20469–20521 | 53 |
| `buildMatchcenterStoryPreviewData` | function | 20740–20851 | 112 |
| `matchcenterStoryVisibleFacts` | function | 20858–20888 | 31 |
| `rMatchcenterStoryPreview` | function | 20907–20976 | 70 |
| `fitMatchcenterStoryLayout` | function | 20983–21025 | 43 |
| `rMatchcenterPage` | function | 21104–21252 | 149 |
| `rTeamPage` | function | 21253–21590 | 338 |
| `_render` | function | 21640–21809 | 170 |
| `uiObjektseite` | function | 22195–22228 | 34 |
| `rMatchdayDetailPage` | function | 22496–22535 | 40 |
| `buildOverviewCards` | function | 22807–22847 | 41 |

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
| `rKpiMirrorRows` | function | 13691–13750 | 60 |
| `kpiRadarValue` | function | 13751–13761 | 11 |
| `rKpiRadar` | function | 13762–13796 | 35 |
| `rKpiShareBars` | function | 13797–13804 | 8 |
| `rKpiMetricCard` | function | 13805–13809 | 5 |
| `rKpiTextMetricCard` | function | 13810–13812 | 3 |
| `rKpiExtendedMetrics` | function | 13813–13827 | 15 |
| `kpiNiceMax` | function | 13828–13833 | 6 |
| `kpiTrendRows` | function | 13834–13842 | 9 |
| `rKpiTrendCompare` | function | 13843–13909 | 67 |
| `rKpiOpponentStrength` | function | 13910–13937 | 28 |
| `kpiBadge` | function | 13938–13940 | 3 |
| `rKpiObjectMini` | function | 13941–13947 | 7 |
| `rKpiInfoCards` | function | 13948–13979 | 32 |
| `buildComparisonSummary` | function | 13980–14011 | 32 |
| `rKPIVergleich` | function | 14012–14025 | 14 |
| `rComparisonMiniOverview` | function | 14026–14029 | 4 |
| `rComparisonRoles` | function | 14030–14037 | 8 |
| `rComparisonDashboard` | function | 14038–14048 | 11 |
| `rComparisonStyles` | function | 14049–14086 | 38 |
| `rComparisonCenterPage` | function | 14087–14137 | 51 |
| `rSeasonTrendRows` | function | 14138–14156 | 19 |
| `getAlltimeAggregatedStyleProfile` | function | 14157–14176 | 20 |
| `rGlobalDnaBars` | function | 14178–14207 | 30 |
| `pdashNum` | function | 14208–14211 | 4 |
| `pdashPct` | function | 14212–14215 | 4 |
| `pdashPhaseLabel` | function | 14216–14219 | 4 |
| `pdashTopCount` | function | 14220–14223 | 4 |
| `pdashBestPhase` | function | 14224–14227 | 4 |
| `pdashTopPartner` | function | 14228–14231 | 4 |
| `pdashTopOpponent` | function | 14232–14235 | 4 |
| `pdashOpponentTier` | function | 14236–14241 | 6 |
| `pdashOpponentStrength` | function | 14242–14261 | 20 |
| `pdashInsight` | function | 14262–14264 | 3 |
| `pdashInsights` | function | 14265–14276 | 12 |
| `buildSeasonPlayerDashModel` | function | 14277–14313 | 37 |
| `buildAlltimePlayerDashModel` | function | 14314–14356 | 43 |
| `rPlayerDashStyles` | function | 14357–14368 | 12 |
| `rPdashLabel` | function | 14369–14371 | 3 |
| `rPdashStat` | function | 14372–14374 | 3 |
| `rPlayerDash` | function | 14375–14413 | 39 |
| `rSeasonPlayerDashboard` | function | 14414–14416 | 3 |
| `rAlltimePlayerDashboard` | function | 14417–14419 | 3 |
| `rGlobalPartnerOpponentPanel` | function | 14420–14433 | 14 |
| `rGlobalCareerHeader` | function | 14434–14454 | 21 |
| `rSeasonLandingPage` | function | 14456–14470 | 15 |
| `rGlobalOverview` | function | 14472–14523 | 52 |
| `rGlobalAllTimeStats` | function | 14525–14541 | 17 |
| `rGlobalDevelopment` | function | 14543–14581 | 39 |
| `getGlobalPlayerOpponentGameRows` | function | 14584–14611 | 28 |
| `getGlobalOpponentSpecialistProfile` | function | 14613–14641 | 29 |
| `rGlobalDuoNetwork` | function | 14643–14840 | 198 |
| `rGlobalOpponentSpecialist` | function | 14842–14887 | 46 |
| `playerExplainConfidence` | function | 14889–14894 | 6 |
| `playerExplainConfidenceLabel` | function | 14895–14897 | 3 |
| `playerExplainAdd` | function | 14898–14902 | 5 |
| `playerExplainStyleSignature` | function | 14903–14914 | 12 |
| `playerExplainRolePhrase` | function | 14915–14923 | 9 |
| `playerExplainHeadline` | function | 14924–14933 | 10 |
| `playerExplainContextSentence` | function | 14934–14952 | 19 |
| `buildFieldPlayerExplanation` | function | 14953–15027 | 75 |
| `buildGoaliePlayerExplanation` | function | 15028–15081 | 54 |
| `buildPlayerExplanation` | function | 15082–15090 | 9 |
| `buildPlayerIntelligence` | function | 15091–15120 | 30 |
| `rPlayerExplainItems` | function | 15121–15125 | 5 |
| `rPlayerExplanation` | function | 15126–15177 | 52 |
| `rAllTimePlayersPage` | function | 15179–15219 | 41 |
| `rHallOfFamePage` | function | 15221–15309 | 89 |
| `lexiconUniqueKeys` | function | 15314–15321 | 8 |
| `lexiconEntry` | function | 15322–15331 | 10 |
| `rLexiconRows` | function | 15332–15335 | 4 |
| `rLexiconPage` | function | 15336–15508 | 173 |
| `clampScore` | function | 15512–15515 | 4 |
| `getScoreLabel` | function | 15516–15524 | 9 |
| `buildConfidence` | function | 15525–15570 | 46 |
| `confidenceCautiousText` | function | 15571–15574 | 4 |
| `explainScore` | function | 15575–15589 | 15 |
| `p1NarrativeKey` | function | 15590–15592 | 3 |
| `scoreNarrative` | function | 15593–15611 | 19 |
| `rankNarratives` | function | 15612–15625 | 14 |
| `getEmptyState` | function | 15626–15637 | 12 |
| `rEmptyState` | function | 15638–15641 | 4 |
| `capSuperlativeLabel` | function | 15649–15651 | 3 |
| `rScoreBreakdown` | function | 15652–15668 | 17 |
| `matchcenterSigned` | function | 15670–15674 | 5 |
| `matchcenterDateLabel` | function | 15676–15680 | 5 |
| `dedupeGamesById` | function | 15692–15700 | 9 |
| `matchcenterIsFreiburgTuebingenTeamName` | function | 15701–15707 | 7 |
| `matchcenterSeasonHasGames` | function | 15711–15713 | 3 |
| `matchcenterDefaultSeasonKey` | function | 15714–15719 | 6 |
| `matchcenterOpponentMode` | function | 15731–15733 | 3 |
| `getMatchcenterOpponents` | function | 15734–15766 | 33 |
| `getMatchcenterDirectOpponents` | function | 15767–15797 | 31 |
| `matchcenterAnalyzeDirect` | function | 15800–15836 | 37 |
| `matchcenterAnalyzeForm` | function | 15837–15862 | 26 |
| `matchcenterGoalMinute` | function | 15871–15876 | 6 |
| `matchcenterEmptyBuckets` | function | 15885–15887 | 3 |
| `matchcenterUlmScoutingConfidence` | function | 15888–15892 | 5 |
| `matchcenterEnsureUlmPlayer` | function | 15893–15930 | 38 |
| `matchcenterRegisterUlmProfileGame` | function | 15931–15936 | 6 |
| `matchcenterUpdateUlmSeasonRow` | function | 15937–15943 | 7 |
| `matchcenterClassifyUlmGoalEvent` | function | 15944–15954 | 11 |
| `matchcenterAddUlmScoring` | function | 15955–15992 | 38 |
| `matchcenterFinalizeUlmPlayers` | function | 15993–16061 | 69 |
| `matchcenterBuildUlmPlayerScouting` | function | 16062–16116 | 55 |
| `matchcenterBuildUlmPlayerInsights` | function | 16117–16129 | 13 |
| `matchcenterDuoPairKey` | function | 16130–16133 | 4 |
| `matchcenterEnsureOpponentDuo` | function | 16134–16166 | 33 |
| `matchcenterDuoDirectionLabel` | function | 16167–16173 | 7 |
| `matchcenterAddDuoConnection` | function | 16174–16192 | 19 |
| `matchcenterFinalizeOpponentDuos` | function | 16193–16227 | 35 |
| `matchcenterBuildOpponentDuos` | function | 16228–16272 | 45 |
| `matchcenterBuildOpponentDuoInsights` | function | 16273–16286 | 14 |
| `matchcenterEnsureUlmDuo` | function | 16287–16324 | 38 |
| `matchcenterAddUlmDuoConnection` | function | 16325–16343 | 19 |
| `matchcenterFinalizeUlmDuos` | function | 16344–16379 | 36 |
| `matchcenterBuildUlmDuos` | function | 16380–16422 | 43 |
| `matchcenterBuildUlmDuoInsights` | function | 16423–16435 | 13 |
| `matchcenterDirectContextGames` | function | 16436–16438 | 3 |
| `matchcenterSpecialTeamsForGame` | function | 16439–16442 | 4 |
| `matchcenterPersonalPenaltyMinutesForSide` | function | 16443–16451 | 9 |
| `matchcenterPct` | function | 16452–16455 | 4 |
| `matchcenterBuildSpecialTeamsMatchup` | function | 16456–16503 | 48 |
| `matchcenterGoalieKey` | function | 16504–16508 | 5 |
| `matchcenterGoalieFitScore` | function | 16509–16525 | 17 |
| `matchcenterBuildGoalieMatchup` | function | 16526–16571 | 46 |
| `matchcenterGoalAbsSeconds` | function | 16572–16579 | 8 |
| `matchcenterTimeValue` | function | 16580–16587 | 8 |
| `matchcenterEmptyTimingStats` | function | 16588–16596 | 9 |
| `matchcenterWindowForSecond` | function | 16597–16603 | 7 |
| `matchcenterTimingStatsForGames` | function | 16604–16640 | 37 |
| `matchcenterBuildTimingInsights` | function | 16641–16651 | 11 |
| `matchcenterBuildTimingAnalysis` | function | 16652–16662 | 11 |
| `rMatchcenterTimeBars` | function | 16663–16676 | 14 |
| `rMatchcenterTimingStatsCard` | function | 16677–16696 | 20 |
| `rMatchcenterTiming` | function | 16697–16720 | 24 |
| `rMatchcenterTabs` | function | 16736–16738 | 3 |
| `rMatchcenterProfileSection` | function | 16739–16758 | 20 |
| `rMatchcenterFormSection` | function | 16759–16784 | 26 |
| `rMatchcenterDetailsSection` | function | 16785–16792 | 8 |
| `matchcenterResultClass` | function | 16793–16795 | 3 |
| `matchcenterUlmTeamLabelForGame` | function | 16797–16801 | 5 |
| `matchcenterGameLine` | function | 16802–16807 | 6 |
| `matchcenterFormLine` | function | 16808–16812 | 5 |
| `matchcenterBuildInsights` | function | 16813–16833 | 21 |
| `rMatchcenterKpi` | function | 16834–16840 | 7 |
| `rMatchcenterFormCard` | function | 16841–16861 | 21 |
| `rMatchcenterGamesList` | function | 16862–16873 | 12 |
| `rMatchcenterWatchCard` | function | 16874–16894 | 21 |
| `rMatchcenterPlayerRow` | function | 16895–16918 | 24 |
| `rMatchcenterRankCard` | function | 16919–16924 | 6 |
| `rMatchcenterUlmImpactCard` | function | 16925–16953 | 29 |
| `rMatchcenterUlmPlayerRow` | function | 16954–16977 | 24 |
| `rMatchcenterUlmRankCard` | function | 16978–16983 | 6 |
| `rMatchcenterUlmScouting` | function | 16984–17020 | 37 |
| `rMatchcenterOpponentScouting` | function | 17021–17056 | 36 |
| `rMatchcenterPlayersTab` | function | 17057–17059 | 3 |
| `rMatchcenterDuoWatchCard` | function | 17060–17079 | 20 |
| `rMatchcenterDuoRow` | function | 17080–17103 | 24 |
| `rMatchcenterDuoRankCard` | function | 17104–17109 | 6 |
| `rMatchcenterUlmDuoWatchCard` | function | 17110–17135 | 26 |
| `rMatchcenterUlmDuoRow` | function | 17136–17158 | 23 |
| `rMatchcenterUlmDuoRankCard` | function | 17159–17164 | 6 |
| `rMatchcenterUlmDuos` | function | 17165–17207 | 43 |
| `rMatchcenterOpponentDuos` | function | 17208–17250 | 43 |
| `rMatchcenterDuosTab` | function | 17251–17253 | 3 |
| `rMatchcenterSpecialCard` | function | 17254–17262 | 9 |
| `rMatchcenterSpecialTeams` | function | 17263–17312 | 50 |
| `rMatchcenterGoalieCard` | function | 17313–17336 | 24 |
| `rMatchcenterGoalieMatchup` | function | 17337–17365 | 29 |
| `matchcenterPlanScoreText` | function | 17366–17369 | 4 |
| `matchcenterPlanRateText` | function | 17370–17374 | 5 |
| `matchcenterPriorityLabel` | function | 17375–17377 | 3 |
| `matchcenterConfidenceClass` | function | 17378–17383 | 6 |
| `matchcenterInferPriority` | function | 17384–17390 | 7 |
| `matchcenterAddPlanItem` | function | 17391–17396 | 6 |
| `matchcenterAddPlanWatch` | function | 17397–17402 | 6 |
| `matchcenterBuildPlanConfidence` | function | 17403–17437 | 35 |
| `matchcenterIntelCurve` | function | 17438–17443 | 6 |
| `matchcenterIntelInverseCurve` | function | 17444–17447 | 4 |
| `matchcenterIntelWeighted` | function | 17448–17458 | 11 |
| `matchcenterIntelRate` | function | 17459–17462 | 4 |
| `matchcenterIntelPct` | function | 17463–17466 | 4 |
| `matchcenterIntelPriorityFromScore` | function | 17467–17472 | 6 |
| `matchcenterIntelPriorityClass` | function | 17473–17478 | 6 |
| `matchcenterIntelPriorityLabel` | function | 17479–17482 | 4 |
| `matchcenterIntelDataLabel` | function | 17483–17485 | 3 |
| `matchcenterBuildIntelligenceDataQuality` | function | 17486–17536 | 51 |
| `matchcenterBuildOpponentDNA` | function | 17537–17649 | 113 |
| `matchcenterDeriveOpponentType` | function | 17650–17667 | 18 |
| `matchcenterIntelPlayerRef` | function | 17668–17680 | 13 |
| `matchcenterIntelDuoRef` | function | 17681–17694 | 14 |
| `matchcenterIntelAddAlarm` | function | 17695–17715 | 21 |
| `matchcenterBuildOpponentAlarm` | function | 17716–17825 | 110 |
| `matchcenterBuildIntelListFromPlan` | function | 17826–17834 | 9 |
| `matchcenterBuildCoachHints` | function | 17835–17850 | 16 |
| `matchcenterBuildIntelHeadline` | function | 17851–17858 | 8 |
| `matchcenterBuildOneThingToWatch` | function | 17859–17871 | 13 |
| `matchcenterBuildIntelligenceSignals` | function | 17872–17918 | 47 |
| `buildMatchIntelligenceFromContext` | function | 17919–17973 | 55 |
| `buildMatchIntelligence` | function | 17974–17995 | 22 |
| `matchcenterCoachCautious` | function | 17996–17998 | 3 |
| `matchcenterCoachAdd` | function | 17999–18007 | 9 |
| `matchcenterCoachGameModel` | function | 18008–18021 | 14 |
| `buildMatchStories` | function | 18022–18051 | 30 |
| `matchcenterCoachPriorityFromAlarm` | function | 18052–18061 | 10 |
| `matchcenterBuildCoachPriorities` | function | 18062–18068 | 7 |
| `matchcenterBuildCoachLevers` | function | 18069–18078 | 10 |
| `matchcenterBuildCoachDangerPatterns` | function | 18079–18086 | 8 |
| `matchcenterBuildCoachIfThen` | function | 18087–18096 | 10 |
| `matchcenterBuildCoachAvoidList` | function | 18097–18106 | 10 |
| `matchcenterBuildCoachActivationHints` | function | 18107–18113 | 7 |
| `matchcenterBuildCoachKeyActors` | function | 18114–18121 | 8 |
| `buildDigitalCoachReport` | function | 18122–18154 | 33 |
| `buildLockerRoomSheet` | function | 18155–18175 | 21 |
| `matchcenterSocialAdd` | function | 18176–18182 | 7 |
| `matchcenterSocialCaption` | function | 18183–18188 | 6 |
| `socialSentence` | function | 18189–18191 | 3 |
| `socialEnsurePeriod` | function | 18192–18195 | 4 |
| `socialFirstUseful` | function | 18196–18198 | 3 |
| `socialPlayerFocusLine` | function | 18199–18205 | 7 |
| `socialDuoFocusLine` | function | 18206–18211 | 6 |
| `socialOpponentLine` | function | 18212–18215 | 4 |
| `socialKeyFactLine` | function | 18216–18225 | 10 |
| `buildMatchdayCaptionBlocks` | function | 18226–18255 | 30 |
| `buildSocialMediaContent` | function | 18256–18304 | 49 |
| `isSyntheticLineupPlayerId` | function | 18310–18312 | 3 |
| `getSyntheticLineupPlayers` | function | 18313–18315 | 3 |
| `getSyntheticLineupRow` | function | 18316–18332 | 17 |
| `getSyntheticLineupRows` | function | 18333–18335 | 3 |
| `getLineupAllRows` | function | 18336–18338 | 3 |
| `lineupRowMeta` | function | 18339–18346 | 8 |
| `getLineupPlayerPool` | function | 18347–18355 | 9 |
| `lineupScore` | function | 18356–18361 | 6 |
| `lineupAverage` | function | 18362–18365 | 4 |
| `lineupLevelLabel` | function | 18366–18369 | 4 |
| `lineupRosterGamesForPlayer` | function | 18372–18419 | 48 |
| `buildLineupExperienceProfile` | function | 18420–18462 | 43 |
| `lineupOpponentDNAForContext` | function | 18463–18474 | 12 |
| `buildLineupOpponentDNAFit` | function | 18475–18518 | 44 |
| `classifyLineIdentity` | function | 18519–18566 | 48 |
| `lineupPlayerProfile` | function | 18567–18642 | 76 |
| `buildLineupAnalysis` | function | 18643–18776 | 134 |
| `buildLineupScoreBreakdowns` | function | 18777–18806 | 30 |
| `buildLineupIntelligence` | function | 18807–18817 | 11 |
| `buildLineAnalysis` | function | 18818–18820 | 3 |
| `lineupRowMap` | function | 18821–18823 | 3 |
| `lineupRankCandidateIds` | function | 18824–18838 | 15 |
| `lineupCombinationIds` | function | 18839–18852 | 14 |
| `lineupStdDev` | function | 18853–18858 | 6 |
| `lineupRoleDnaComplementScore` | function | 18859–18882 | 24 |
| `lineupDirectChemistryScore` | function | 18883–18889 | 7 |
| `lineupEvaluateComplementCandidate` | function | 18890–18968 | 79 |
| `lineupPlayerAnchorScore` | function | 18969–18986 | 18 |
| `lineupPlayerAnchorConfidence` | function | 18989–18993 | 5 |
| `buildTeamLineBalance` | function | 18994–19037 | 44 |
| `buildBalancedLineupSet` | function | 19038–19064 | 27 |
| `lineupRecommendationReason` | function | 19065–19073 | 9 |
| `buildLineupRecommendations` | function | 19074–19155 | 82 |
| `recommendLineComplements` | function | 19156–19183 | 28 |
| `matchcenterBuildMatchPlan` | function | 19184–19329 | 146 |
| `rMatchcenterPlanItems` | function | 19330–19347 | 18 |
| `rMatchcenterPlanWatch` | function | 19348–19363 | 16 |
| `rMatchcenterOpponentDNA` | function | 19364–19396 | 33 |
| `rMatchcenterOpponentAlarm` | function | 19397–19418 | 22 |
| `rMatchcenterIntelOverview` | function | 19419–19464 | 46 |
| `rMatchcenterIntelCoachHints` | function | 19465–19478 | 14 |
| `rMatchcenterCoachCardList` | function | 19479–19492 | 14 |
| `rMatchcenterCoachIfThen` | function | 19493–19500 | 8 |
| `rMatchcenterCoachSimpleList` | function | 19501–19505 | 5 |
| `rMatchcenterDigitalCoach` | function | 19506–19570 | 65 |
| `rMatchcenterCopyButton` | function | 19571–19575 | 5 |
| `rMatchcenterLockerList` | function | 19576–19587 | 12 |
| `rMatchcenterLockerRoomSheet` | function | 19588–19643 | 56 |
| `rMatchcenterSocialBlock` | function | 19644–19651 | 8 |
| `matchcenterStoryDownloadFileName` | function | 19652–19661 | 10 |
| `downloadMatchdayStory` | window | 19662–19709 | 48 |
| `rSocialVideoBlock` | function | 19713–19744 | 32 |
| `socialVideoJobsForMatchday` | function | 19747–19753 | 7 |
| `generateSocialVideoVideos` | window | 19754–19795 | 42 |
| `cancelSocialVideoRecording` | window | 19796–19798 | 3 |
| `generateSocialVideoStandbilder` | window | 19799–19822 | 24 |
| `generateSocialVideoContactSheets` | window | 19823–19845 | 23 |
| `rMatchcenterSocialMediaCenter` | function | 19846–19899 | 54 |
| `rLineupScoreRows` | function | 19900–19921 | 22 |
| `rLineupSimpleCards` | function | 19922–19930 | 9 |
| `rMatchcenterLineupBuilder` | function | 19931–20003 | 73 |
| `rLineupMetricPills` | function | 20004–20017 | 14 |
| `rLineupBuilderAvailablePanel` | function | 20018–20065 | 48 |
| `rLineupRecommendationCards` | function | 20066–20080 | 15 |
| `rLineupRecommendationMode` | function | 20081–20114 | 34 |
| `rLineupComplementCards` | function | 20115–20127 | 13 |
| `rLineupTestLine` | function | 20128–20176 | 49 |
| `rLineupTestMode` | function | 20177–20193 | 17 |
| `rLineupBuilderPage` | function | 20194–20228 | 35 |
| `rMatchcenterScoutingSummary` | function | 20229–20272 | 44 |
| `rMatchcenterMatchPlan` | function | 20273–20293 | 21 |
| `matchcenterStoryLogoBase` | function | 20296–20301 | 6 |
| `matchcenterStorySafeLogoUrl` | function | 20302–20308 | 7 |
| `getTeamLogoUrlForStory` | function | 20317–20346 | 30 |
| `matchcenterStoryLogoForOpponent` | function | 20347–20361 | 15 |
| `matchcenterStoryTableRank` | function | 20362–20372 | 11 |
| `matchcenterStoryUlmTableRank` | function | 20373–20379 | 7 |
| `matchcenterStoryRankText` | function | 20380–20383 | 4 |
| `matchcenterStoryInlineStat` | function | 20384–20386 | 3 |
| `matchcenterStoryRankRows` | function | 20388–20399 | 12 |
| `matchcenterStoryAddFact` | function | 20402–20408 | 7 |
| `matchcenterStoryFactKey` | function | 20409–20411 | 3 |
| `matchcenterStoryLooksArtificial` | function | 20412–20414 | 3 |
| `matchcenterStoryEstimateFactWeight` | function | 20415–20420 | 6 |
| `matchcenterStoryAddCandidate` | function | 20421–20443 | 23 |
| `matchcenterStoryCategoryLimit` | function | 20444–20447 | 4 |
| `matchcenterStoryNormalizePickOptions` | function | 20448–20458 | 11 |
| `matchcenterStoryCandidateForBudget` | function | 20459–20468 | 10 |
| `matchcenterStoryPickFactItems` | function | 20469–20521 | 53 |
| `matchcenterStoryPickFacts` | function | 20522–20524 | 3 |
| `matchcenterStoryCurrentStreak` | function | 20526–20534 | 9 |
| `matchcenterStoryWinlessStreak` | function | 20535–20543 | 9 |
| `matchcenterStoryFormFact` | function | 20544–20554 | 11 |
| `matchcenterStoryFormFactCandidates` | function | 20555–20574 | 20 |
| `matchcenterStoryLateGoalsForOutcome` | function | 20575–20578 | 4 |
| `matchcenterStoryClutchFact` | function | 20579–20593 | 15 |
| `matchcenterStoryPlayerClutchTotal` | function | 20594–20601 | 8 |
| `matchcenterStoryBestClutchPlayer` | function | 20602–20611 | 10 |
| `matchcenterStoryPlayerClutchFact` | function | 20612–20637 | 26 |
| `matchcenterStoryDuoClutchTotal` | function | 20638–20645 | 8 |
| `matchcenterStoryBestClutchDuo` | function | 20646–20655 | 10 |
| `matchcenterStoryDuoClutchFact` | function | 20656–20658 | 3 |
| `matchcenterStoryDuoFact` | function | 20659–20679 | 21 |
| `matchcenterStoryClutchPriority` | function | 20680–20682 | 3 |
| `matchcenterStoryCompetitionLabel` | function | 20683–20686 | 4 |
| `matchcenterStoryShortDuel` | function | 20687–20691 | 5 |
| `matchcenterStoryLastDuelLabel` | function | 20692–20695 | 4 |
| `matchcenterStoryDirectFactCandidates` | function | 20696–20717 | 22 |
| `matchcenterStoryPlanFactCandidates` | function | 20718–20730 | 13 |
| `matchcenterStoryCategoryForPlanFact` | function | 20731–20739 | 9 |
| `buildMatchcenterStoryPreviewData` | function | 20740–20851 | 112 |
| `matchcenterStoryNameClass` | function | 20852–20857 | 6 |
| `matchcenterStoryVisibleFacts` | function | 20858–20888 | 31 |
| `rMatchcenterStoryLogo` | function | 20889–20893 | 5 |
| `rMatchcenterStoryForm` | function | 20894–20898 | 5 |
| `rMatchcenterStoryPlayerCard` | function | 20899–20906 | 8 |
| `rMatchcenterStoryPreview` | function | 20907–20976 | 70 |
| `rMatchcenterStoryFrame` | function | 20977–20982 | 6 |
| `fitMatchcenterStoryLayout` | function | 20983–21025 | 43 |
| `ensureSocialVideoExportCapabilityChecked` | function | 21034–21038 | 5 |
| `downloadSocialVideoStandbild` | window | 21053–21072 | 20 |
| `downloadSocialVideoContactSheet` | window | 21077–21102 | 26 |
| `rMatchcenterPage` | function | 21104–21252 | 149 |
| `rTeamPage` | function | 21253–21590 | 338 |
| `exportExcel` | function | 21595–21616 | 22 |
| `render` | function | 21622–21639 | 18 |
| `_render` | function | 21640–21809 | 170 |
| `uiFormatNumber` | function | 21843–21847 | 5 |
| `uiReliabilityDots` | function | 21856–21863 | 8 |
| `uiDeltaIndicator` | function | 21871–21877 | 7 |
| `uiInfoIcon` | function | 21889–21893 | 5 |
| `uiKennzahlKachel` | function | 21901–21912 | 12 |
| `uiKernaussage` | function | 21921–21927 | 7 |
| `uiHinweisKarte` | function | 21935–21947 | 13 |
| `uiRangliste` | function | 21957–21974 | 18 |
| `uiVerlauf` | function | 21985–22004 | 20 |
| `uiIntervallBalken` | function | 22011–22023 | 13 |
| `uiMethodenbox` | function | 22030–22039 | 10 |
| `uiNotiz` | function | 22047–22051 | 5 |
| `datenstandQuoteState` | function | 22073–22080 | 8 |
| `uiQuoteText` | function | 22083–22089 | 7 |
| `uiDatenstandBand` | function | 22106–22119 | 14 |
| `uiPlatzhalter` | function | 22127–22132 | 6 |
| `uiObjektseiteSortTabs` | function | 22177–22185 | 9 |
| `uiObjektseite` | function | 22195–22228 | 34 |
| `mainNavActiveKeyForPage` | function | 22285–22290 | 6 |
| `goToMainNavPoint` | window | 22291–22297 | 7 |
| `rMainNav` | function | 22298–22302 | 5 |
| `rMainNavBottom` | function | 22320–22327 | 8 |
| `openOverview` | window | 22337–22345 | 9 |
| `switchOverviewSeason` | window | 22354–22360 | 7 |
| `openMatchdayTimeline` | window | 22388–22395 | 8 |
| `openMatchday` | window | 22396–22405 | 10 |
| `switchMatchdaySeason` | window | 22407–22412 | 6 |
| `matchdayUlmGames` | function | 22414–22416 | 3 |
| `matchdayLineupInfo` | function | 22423–22433 | 11 |
| `matchdayLineupCardHtml` | function | 22435–22441 | 7 |
| `matchdayGameCardHtml` | function | 22442–22461 | 20 |
| `matchdayFixtureCardHtml` | function | 22467–22475 | 9 |
| `rMatchdayTimelineRow` | function | 22477–22484 | 8 |
| `rMatchdayTimelinePage` | function | 22485–22495 | 11 |
| `rMatchdayDetailPage` | function | 22496–22535 | 40 |
| `rMatchdayPage` | function | 22536–22542 | 7 |
| `overviewMatchdayStartMs` | function | 22561–22566 | 6 |
| `overviewMatchdayEndMs` | function | 22567–22572 | 6 |
| `detectOverviewPhase` | function | 22573–22598 | 26 |
| `getSeasonDataState` | function | 22605–22615 | 11 |
| `parseSeasonDataState` | function | 22616–22624 | 9 |
| `isNewSeasonDataState` | function | 22626–22628 | 3 |
| `recordOverviewVisit` | function | 22635–22644 | 10 |
| `overviewOpponentLabel` | function | 22650–22661 | 12 |
| `overviewLastMatchdayText` | function | 22662–22665 | 4 |
| `overviewNextMatchdayHtml` | function | 22672–22688 | 17 |
| `overviewCompactTableHtml` | function | 22696–22702 | 7 |
| `overviewFormHtml` | function | 22704–22718 | 15 |
| `overviewSeasonBilanzHtml` | function | 22719–22725 | 7 |
| `overviewSeasonAwardHtml` | function | 22727–22736 | 10 |
| `overviewRecordHtml` | function | 22738–22743 | 6 |
| `overviewCrossSeasonTrendHtml` | function | 22745–22753 | 9 |
| `overviewOpponentPreviewHtml` | function | 22754–22758 | 5 |
| `overviewMatchcenterLinkHtml` | function | 22759–22761 | 3 |
| `overviewLineupLinkHtml` | function | 22762–22764 | 3 |
| `overviewRankChangeTile` | function | 22781–22798 | 18 |
| `buildOverviewCards` | function | 22807–22847 | 41 |
| `rOverviewPage` | function | 22857–22868 | 12 |
| `openLigaGegner` | window | 22869–22872 | 4 |
| `rLigaGegnerPlaceholderPage` | function | 22873–22878 | 6 |
| `rAsOfSelector` | function | 22890–22902 | 13 |
| `setContextAsOf` | window | 22903–22914 | 12 |
| `rSeasonDataPreviewContextHint` | function | 22925–22933 | 9 |
| `rSeasonDataStateContextHint` | function | 22942–22948 | 7 |
| `rContextBar` | function | 22973–22991 | 19 |
| `rIaShell` | function | 22993–22995 | 3 |
| `globalSearchTokens` | function | 23012–23015 | 4 |
| `globalSearchEntries` | function | 23017–23030 | 14 |
| `globalSearchPlayerScore` | function | 23031–23038 | 8 |
| `globalSearchMatchdayScore` | function | 23040–23052 | 13 |
| `globalSearchMatch` | function | 23054–23065 | 12 |
| `globalSearchIsEditableTarget` | function | 23066–23070 | 5 |
| `globalSearchKeyAction` | function | 23072–23086 | 15 |
| `rGlobalSearchToggle` | function | 23087–23089 | 3 |
| `rGlobalSearchResultsHtml` | function | 23090–23100 | 11 |
| `rGlobalSearchPanelHtml` | function | 23101–23103 | 3 |
| `paintGlobalSearchResults` | function | 23104–23111 | 8 |
| `openGlobalSearch` | window | 23112–23136 | 25 |
| `closeGlobalSearch` | window | 23137–23144 | 8 |
| `onGlobalSearchInput` | window | 23145–23150 | 6 |
| `moveGlobalSearch` | function | 23151–23156 | 6 |
| `activateGlobalSearchResult` | window | 23157–23166 | 10 |
| `globalSearchOnKeydown` | function | 23167–23188 | 22 |
| `initGlobalSearch` | function | 23189–23193 | 5 |
| `rToolMenu` | function | 23215–23218 | 4 |
| `toolMenuElements` | function | 23219–23221 | 3 |
| `toolMenuItemElements` | function | 23222–23224 | 3 |
| `isToolMenuOpen` | function | 23225–23228 | 4 |
| `openToolMenu` | window | 23229–23236 | 8 |
| `closeToolMenu` | window | 23237–23243 | 7 |
| `toggleToolMenu` | window | 23244–23247 | 4 |
| `activateToolMenuItem` | window | 23248–23255 | 8 |
| `toolMenuOnKeydown` | function | 23256–23279 | 24 |
| `toolMenuOnClick` | function | 23280–23286 | 7 |
| `initToolMenu` | function | 23287–23290 | 4 |

## Alphabetisches Register

| Name | Art | Zeile |
|---|---|---|
| `_render` | function | 21640 |
| `acceptEinsatzCenterRosterSuggestion` | window | 7611 |
| `activateGlobalSearchResult` | window | 23157 |
| `activateToolMenuItem` | window | 23248 |
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
| `buildAlltimePlayerDashModel` | function | 14314 |
| `buildAnnotatedGoalEventsForGame` | function | 10752 |
| `buildAppHash` | function | 3304 |
| `buildBalancedLineupSet` | function | 19038 |
| `buildBestThirdManOptions` | function | 10637 |
| `buildComparisonDataset` | function | 13630 |
| `buildComparisonExtraMetrics` | function | 13485 |
| `buildComparisonSummary` | function | 13980 |
| `buildConfidence` | function | 15525 |
| `buildDigitalCoachReport` | function | 18122 |
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
| `buildFieldPlayerExplanation` | function | 14953 |
| `buildGlobalPageHash` | function | 3321 |
| `buildGoalieAnalysisModel` | function | 9560 |
| `buildGoalieComparisonDataset` | function | 13579 |
| `buildGoalieGameRecord` | function | 4546 |
| `buildGoaliePlayerExplanation` | function | 15028 |
| `buildGoalieRoleProfile` | function | 9783 |
| `buildGoalieStatsForSeason` | function | 4596 |
| `buildHallOfFameIntroTitle` | function | 8467 |
| `buildHashStringFromParsed` | function | 3336 |
| `buildIdentityProfiles` | function | 5409 |
| `buildLineAnalysis` | function | 18818 |
| `buildLineupAnalysis` | function | 18643 |
| `buildLineupExperienceProfile` | function | 18420 |
| `buildLineupIntelligence` | function | 18807 |
| `buildLineupOpponentDNAFit` | function | 18475 |
| `buildLineupRecommendations` | function | 19074 |
| `buildLineupScoreBreakdowns` | function | 18777 |
| `buildLockerRoomSheet` | function | 18155 |
| `buildMatchcenterStoryPreviewData` | function | 20740 |
| `buildMatchdayCaptionBlocks` | function | 18226 |
| `buildMatchIntelligence` | function | 17974 |
| `buildMatchIntelligenceFromContext` | function | 17919 |
| `buildMatchStories` | function | 18022 |
| `buildMomentumSwingStats` | function | 11027 |
| `buildMomentumSwingStatsRaw` | function | 10956 |
| `buildOpponentIntelligence` | function | 10434 |
| `buildOverviewCards` | function | 22807 |
| `buildPlayerDataFoundation` | function | 4866 |
| `buildPlayerEvents` | function | 4920 |
| `buildPlayerExplanation` | function | 15082 |
| `buildPlayerIdentity` | function | 3692 |
| `buildPlayerIntelligence` | function | 15091 |
| `buildRecencyWeightedGlobalIdentityProfile` | function | 12487 |
| `buildRegistry` | function | 4889 |
| `buildResponseGoalStats` | function | 10944 |
| `buildResponseGoalStatsRaw` | function | 10895 |
| `buildRosterImpactAnalysis` | function | 11837 |
| `buildRosterImpactGameIndex` | function | 11724 |
| `buildSeasonDataPreviewChanges` | function | 6410 |
| `buildSeasonDuos` | function | 4793 |
| `buildSeasonPlayerDashModel` | function | 14277 |
| `buildSocialMediaContent` | function | 18256 |
| `buildSoloDuoProfile` | function | 5178 |
| `buildSpecialTeamsForGame` | function | 4241 |
| `buildSpecialTeamsForSeason` | function | 4435 |
| `buildStaticSeasonDataBlock` | function | 6129 |
| `buildTeamLineBalance` | function | 18994 |
| `cachedAnalysis` | function | 2229 |
| `cancelDuoProPicker` | window | 11531 |
| `cancelEinsatzCenterEdit` | window | 7558 |
| `cancelHallOfFameIntro` | function | 8556 |
| `cancelSocialVideoRecording` | window | 19796 |
| `capSuperlativeLabel` | function | 15649 |
| `clampScore` | function | 15512 |
| `classicTagLabel` | function | 8710 |
| `classifyLineIdentity` | function | 18519 |
| `cleanupHallOfFameIntro` | function | 8496 |
| `clearAnalysisCache` | function | 2188 |
| `clearComparison` | window | 13180 |
| `clearComparisonDuos` | window | 13268 |
| `clearLineupAvailable` | window | 2338 |
| `clearLineupBuilderLine` | window | 2357 |
| `clearLineupPlayers` | window | 2292 |
| `clearlyAboveAverage` | function | 5366 |
| `clonePlain` | function | 4083 |
| `closeGlobalSearch` | window | 23137 |
| `closeMatchcenterStoryPreview` | window | 2257 |
| `closeToolMenu` | window | 23237 |
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
| `confidenceCautiousText` | function | 15571 |
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
| `datenstandQuoteState` | function | 22073 |
| `decodeHashSegmentSafe` | function | 3229 |
| `dedupeGamesById` | function | 15692 |
| `dedupeIdentityProfileTags` | function | 12564 |
| `deriveAsOfForSeason` | function | 3034 |
| `deriveLineupUlmPlayerIds` | function | 7268 |
| `deriveLineupValidPlayerIds` | function | 7244 |
| `derivePlayerStatus` | function | 3721 |
| `detectOverviewPhase` | function | 22573 |
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
| `downloadMatchdayStory` | window | 19662 |
| `downloadSocialVideoContactSheet` | window | 21077 |
| `downloadSocialVideoStandbild` | window | 21053 |
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
| `ensureSocialVideoExportCapabilityChecked` | function | 21034 |
| `escAttr` | function | 8683 |
| `escHtml` | function | 12583 |
| `eventMatchesTeams` | function | 5244 |
| `explainScore` | function | 15575 |
| `exportEinsatzCenterDraft` | window | 7771 |
| `exportExcel` | function | 21595 |
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
| `fitMatchcenterStoryLayout` | function | 20983 |
| `fixMojibakeText` | function | 2463 |
| `formatDiagnosticAttempt` | function | 5953 |
| `formatGameLoadError` | function | 5966 |
| `formatStatus` | function | 5950 |
| `gameClassificationStatusLabel` | function | 2553 |
| `gameDaySortValue` | function | 4152 |
| `gameResult` | function | 3587 |
| `generatePlayerInsights` | function | 9181 |
| `generateSocialVideoContactSheets` | window | 19823 |
| `generateSocialVideoStandbilder` | window | 19799 |
| `generateSocialVideoVideos` | window | 19754 |
| `getActiveAlltimeSeasonKeys` | function | 10353 |
| `getActiveSeasonKey` | function | 2414 |
| `getAllLoadedSeasonGames` | function | 10546 |
| `getAlltimeAggregatedStyleProfile` | function | 14157 |
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
| `getEmptyState` | function | 15626 |
| `getFieldGameIdsForPlayer` | function | 2710 |
| `getFurtherSameDayUlmGames` | function | 4168 |
| `getGameDurationMinutes` | function | 4147 |
| `getGameId` | function | 6165 |
| `getGlobalAllTimeSnapshot` | function | 2418 |
| `getGlobalIdentityProfile` | function | 12536 |
| `getGlobalLoadableSeasonKeys` | function | 8282 |
| `getGlobalOpponentSpecialistProfile` | function | 14613 |
| `getGlobalPlayerBestSeason` | function | 10232 |
| `getGlobalPlayerMilestones` | function | 10415 |
| `getGlobalPlayerOpponentGameRows` | function | 14584 |
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
| `getLineupAllRows` | function | 18336 |
| `getLineupPlayerPool` | function | 18347 |
| `getLoadedSeasonPlayerUi` | function | 10190 |
| `getLoadedSeasonPointsByName` | function | 10134 |
| `getMatchcenterDirectOpponents` | function | 15767 |
| `getMatchcenterOpponents` | function | 15734 |
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
| `getScoreLabel` | function | 15516 |
| `getSeasonApiBaseUrl` | function | 1838 |
| `getSeasonDataPreview` | function | 6515 |
| `getSeasonDataState` | function | 22605 |
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
| `getSyntheticLineupPlayers` | function | 18313 |
| `getSyntheticLineupRow` | function | 18316 |
| `getSyntheticLineupRows` | function | 18333 |
| `getTeamAllTimeRecords` | function | 12330 |
| `getTeamLogoUrlForStory` | function | 20317 |
| `getUlmTeamStatus` | function | 2505 |
| `getUniqueAllTimeOpponentNames` | function | 2500 |
| `globalSearchEntries` | function | 23017 |
| `globalSearchIsEditableTarget` | function | 23066 |
| `globalSearchKeyAction` | function | 23072 |
| `globalSearchMatch` | function | 23054 |
| `globalSearchMatchdayScore` | function | 23040 |
| `globalSearchOnKeydown` | function | 23167 |
| `globalSearchPlayerScore` | function | 23031 |
| `globalSearchTokens` | function | 23012 |
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
| `goToMainNavPoint` | window | 22291 |
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
| `initGlobalSearch` | function | 23189 |
| `initHashRouting` | function | 3566 |
| `initToolMenu` | function | 23287 |
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
| `isNewSeasonDataState` | function | 22626 |
| `isPenaltyGoalEvent` | function | 4214 |
| `isPreClubHistoryPlayerName` | function | 2533 |
| `isPureSGPlayer` | function | 9352 |
| `isRookieCandidateForSeason` | function | 10124 |
| `isSameUlmTeamContext` | function | 4160 |
| `isSeasonDataPreviewStale` | function | 6523 |
| `isSgOnlyAlltimePlayer` | function | 9344 |
| `isSgOnlyHallOfFameExcluded` | function | 10146 |
| `isSyntheticLineupPlayerId` | function | 18310 |
| `isToolMenuOpen` | function | 23225 |
| `isTwoPlusTwoPenaltyEvent` | function | 4135 |
| `isUsableExternalSeasonData` | function | 6098 |
| `isValidAsOfDate` | function | 3146 |
| `isValidAsOfStartTime` | function | 3149 |
| `isVisibleSecondaryTrait` | function | 8689 |
| `kpiBadge` | function | 13938 |
| `kpiDelta` | function | 13671 |
| `kpiItemColor` | function | 13677 |
| `kpiNiceMax` | function | 13828 |
| `kpiRadarValue` | function | 13751 |
| `kpiTrendRows` | function | 13834 |
| `kpiValueText` | function | 13667 |
| `lexiconEntry` | function | 15322 |
| `lexiconUniqueKeys` | function | 15314 |
| `lineupAverage` | function | 18362 |
| `lineupBuilderPoolIds` | function | 2300 |
| `lineupCombinationIds` | function | 18839 |
| `lineupDirectChemistryScore` | function | 18883 |
| `lineupEvaluateComplementCandidate` | function | 18890 |
| `lineupGroupDisplayName` | function | 6802 |
| `lineupLevelLabel` | function | 18366 |
| `lineupOpponentDNAForContext` | function | 18463 |
| `lineupPlayerAnchorConfidence` | function | 18989 |
| `lineupPlayerAnchorScore` | function | 18969 |
| `lineupPlayerProfile` | function | 18567 |
| `lineupRankCandidateIds` | function | 18824 |
| `lineupRecommendationReason` | function | 19065 |
| `lineupRoleDnaComplementScore` | function | 18859 |
| `lineupRosterGamesForPlayer` | function | 18372 |
| `lineupRowMap` | function | 18821 |
| `lineupRowMeta` | function | 18339 |
| `lineupScore` | function | 18356 |
| `lineupStdDev` | function | 18853 |
| `linkUiPlayersToRegistry` | function | 3817 |
| `loadEinsatzCenterMismatchedAutosave` | function | 7213 |
| `loadSeason` | function | 8355 |
| `loadSeasonData` | function | 7798 |
| `loadSeasonForGlobal` | function | 8307 |
| `loadSeasonManifest` | function | 6030 |
| `mainNavActiveKeyForPage` | function | 22285 |
| `markFieldRoleAppearance` | function | 3792 |
| `matchcenterAddDuoConnection` | function | 16174 |
| `matchcenterAddPlanItem` | function | 17391 |
| `matchcenterAddPlanWatch` | function | 17397 |
| `matchcenterAddUlmDuoConnection` | function | 16325 |
| `matchcenterAddUlmScoring` | function | 15955 |
| `matchcenterAnalyzeDirect` | function | 15800 |
| `matchcenterAnalyzeForm` | function | 15837 |
| `matchcenterBuildCoachActivationHints` | function | 18107 |
| `matchcenterBuildCoachAvoidList` | function | 18097 |
| `matchcenterBuildCoachDangerPatterns` | function | 18079 |
| `matchcenterBuildCoachHints` | function | 17835 |
| `matchcenterBuildCoachIfThen` | function | 18087 |
| `matchcenterBuildCoachKeyActors` | function | 18114 |
| `matchcenterBuildCoachLevers` | function | 18069 |
| `matchcenterBuildCoachPriorities` | function | 18062 |
| `matchcenterBuildGoalieMatchup` | function | 16526 |
| `matchcenterBuildInsights` | function | 16813 |
| `matchcenterBuildIntelHeadline` | function | 17851 |
| `matchcenterBuildIntelligenceDataQuality` | function | 17486 |
| `matchcenterBuildIntelligenceSignals` | function | 17872 |
| `matchcenterBuildIntelListFromPlan` | function | 17826 |
| `matchcenterBuildMatchPlan` | function | 19184 |
| `matchcenterBuildOneThingToWatch` | function | 17859 |
| `matchcenterBuildOpponentAlarm` | function | 17716 |
| `matchcenterBuildOpponentDNA` | function | 17537 |
| `matchcenterBuildOpponentDuoInsights` | function | 16273 |
| `matchcenterBuildOpponentDuos` | function | 16228 |
| `matchcenterBuildPlanConfidence` | function | 17403 |
| `matchcenterBuildSpecialTeamsMatchup` | function | 16456 |
| `matchcenterBuildTimingAnalysis` | function | 16652 |
| `matchcenterBuildTimingInsights` | function | 16641 |
| `matchcenterBuildUlmDuoInsights` | function | 16423 |
| `matchcenterBuildUlmDuos` | function | 16380 |
| `matchcenterBuildUlmPlayerInsights` | function | 16117 |
| `matchcenterBuildUlmPlayerScouting` | function | 16062 |
| `matchcenterClassifyUlmGoalEvent` | function | 15944 |
| `matchcenterCoachAdd` | function | 17999 |
| `matchcenterCoachCautious` | function | 17996 |
| `matchcenterCoachGameModel` | function | 18008 |
| `matchcenterCoachPriorityFromAlarm` | function | 18052 |
| `matchcenterConfidenceClass` | function | 17378 |
| `matchcenterDateLabel` | function | 15676 |
| `matchcenterDefaultSeasonKey` | function | 15714 |
| `matchcenterDeriveOpponentType` | function | 17650 |
| `matchcenterDirectContextGames` | function | 16436 |
| `matchcenterDuoDirectionLabel` | function | 16167 |
| `matchcenterDuoPairKey` | function | 16130 |
| `matchcenterEmptyBuckets` | function | 15885 |
| `matchcenterEmptyTimingStats` | function | 16588 |
| `matchcenterEnsureOpponentDuo` | function | 16134 |
| `matchcenterEnsureUlmDuo` | function | 16287 |
| `matchcenterEnsureUlmPlayer` | function | 15893 |
| `matchcenterFinalizeOpponentDuos` | function | 16193 |
| `matchcenterFinalizeUlmDuos` | function | 16344 |
| `matchcenterFinalizeUlmPlayers` | function | 15993 |
| `matchcenterFormLine` | function | 16808 |
| `matchcenterGameLine` | function | 16802 |
| `matchcenterGoalAbsSeconds` | function | 16572 |
| `matchcenterGoalieFitScore` | function | 16509 |
| `matchcenterGoalieKey` | function | 16504 |
| `matchcenterGoalMinute` | function | 15871 |
| `matchcenterInferPriority` | function | 17384 |
| `matchcenterIntelAddAlarm` | function | 17695 |
| `matchcenterIntelCurve` | function | 17438 |
| `matchcenterIntelDataLabel` | function | 17483 |
| `matchcenterIntelDuoRef` | function | 17681 |
| `matchcenterIntelInverseCurve` | function | 17444 |
| `matchcenterIntelPct` | function | 17463 |
| `matchcenterIntelPlayerRef` | function | 17668 |
| `matchcenterIntelPriorityClass` | function | 17473 |
| `matchcenterIntelPriorityFromScore` | function | 17467 |
| `matchcenterIntelPriorityLabel` | function | 17479 |
| `matchcenterIntelRate` | function | 17459 |
| `matchcenterIntelWeighted` | function | 17448 |
| `matchcenterIsFreiburgTuebingenTeamName` | function | 15701 |
| `matchcenterOpponentMode` | function | 15731 |
| `matchcenterPct` | function | 16452 |
| `matchcenterPersonalPenaltyMinutesForSide` | function | 16443 |
| `matchcenterPlanRateText` | function | 17370 |
| `matchcenterPlanScoreText` | function | 17366 |
| `matchcenterPriorityLabel` | function | 17375 |
| `matchcenterRegisterUlmProfileGame` | function | 15931 |
| `matchcenterResultClass` | function | 16793 |
| `matchcenterSeasonHasGames` | function | 15711 |
| `matchcenterSigned` | function | 15670 |
| `matchcenterSocialAdd` | function | 18176 |
| `matchcenterSocialCaption` | function | 18183 |
| `matchcenterSpecialTeamsForGame` | function | 16439 |
| `matchcenterStoryAddCandidate` | function | 20421 |
| `matchcenterStoryAddFact` | function | 20402 |
| `matchcenterStoryBestClutchDuo` | function | 20646 |
| `matchcenterStoryBestClutchPlayer` | function | 20602 |
| `matchcenterStoryCandidateForBudget` | function | 20459 |
| `matchcenterStoryCategoryForPlanFact` | function | 20731 |
| `matchcenterStoryCategoryLimit` | function | 20444 |
| `matchcenterStoryClutchFact` | function | 20579 |
| `matchcenterStoryClutchPriority` | function | 20680 |
| `matchcenterStoryCompetitionLabel` | function | 20683 |
| `matchcenterStoryCurrentStreak` | function | 20526 |
| `matchcenterStoryDirectFactCandidates` | function | 20696 |
| `matchcenterStoryDownloadFileName` | function | 19652 |
| `matchcenterStoryDuoClutchFact` | function | 20656 |
| `matchcenterStoryDuoClutchTotal` | function | 20638 |
| `matchcenterStoryDuoFact` | function | 20659 |
| `matchcenterStoryEstimateFactWeight` | function | 20415 |
| `matchcenterStoryFactKey` | function | 20409 |
| `matchcenterStoryFormFact` | function | 20544 |
| `matchcenterStoryFormFactCandidates` | function | 20555 |
| `matchcenterStoryInlineStat` | function | 20384 |
| `matchcenterStoryLastDuelLabel` | function | 20692 |
| `matchcenterStoryLateGoalsForOutcome` | function | 20575 |
| `matchcenterStoryLogoBase` | function | 20296 |
| `matchcenterStoryLogoForOpponent` | function | 20347 |
| `matchcenterStoryLooksArtificial` | function | 20412 |
| `matchcenterStoryNameClass` | function | 20852 |
| `matchcenterStoryNormalizePickOptions` | function | 20448 |
| `matchcenterStoryPickFactItems` | function | 20469 |
| `matchcenterStoryPickFacts` | function | 20522 |
| `matchcenterStoryPlanFactCandidates` | function | 20718 |
| `matchcenterStoryPlayerClutchFact` | function | 20612 |
| `matchcenterStoryPlayerClutchTotal` | function | 20594 |
| `matchcenterStoryRankRows` | function | 20388 |
| `matchcenterStoryRankText` | function | 20380 |
| `matchcenterStorySafeLogoUrl` | function | 20302 |
| `matchcenterStoryShortDuel` | function | 20687 |
| `matchcenterStoryTableRank` | function | 20362 |
| `matchcenterStoryUlmTableRank` | function | 20373 |
| `matchcenterStoryVisibleFacts` | function | 20858 |
| `matchcenterStoryWinlessStreak` | function | 20535 |
| `matchcenterTimeValue` | function | 16580 |
| `matchcenterTimingStatsForGames` | function | 16604 |
| `matchcenterUlmScoutingConfidence` | function | 15888 |
| `matchcenterUlmTeamLabelForGame` | function | 16797 |
| `matchcenterUpdateUlmSeasonRow` | function | 15937 |
| `matchcenterWindowForSecond` | function | 16597 |
| `matchdayFixtureCardHtml` | function | 22467 |
| `matchdayGameCardHtml` | function | 22442 |
| `matchdayLineupCardHtml` | function | 22435 |
| `matchdayLineupInfo` | function | 22423 |
| `matchdayUlmGames` | function | 22414 |
| `medianOrNull` | function | 3990 |
| `mergeDuoSet` | function | 4820 |
| `mergeGoalieSpecialTeamsStats` | function | 4452 |
| `mergeSpecialTeamsStats` | function | 4096 |
| `moveGlobalSearch` | function | 23151 |
| `normalizeAssistPlayerName` | function | 2878 |
| `normalizeComparisonItem` | function | 12946 |
| `normalizeDuoComparisonItem` | function | 13190 |
| `normalizeEventPlayerRef` | function | 2817 |
| `normalizeLineupLines` | function | 2303 |
| `normalizePlayerName` | function | 2520 |
| `normalizeSecondaryTraits` | function | 5367 |
| `onGlobalSearchInput` | window | 23145 |
| `openAllTimePlayers` | window | 8423 |
| `openComparisonCenter` | window | 8593 |
| `openDuoProPicker` | window | 11530 |
| `openEinsatzCenter` | window | 6753 |
| `openGlobalSearch` | window | 23112 |
| `openHallOfFame` | window | 8569 |
| `openLexicon` | window | 8666 |
| `openLigaGegner` | window | 22869 |
| `openLineupBuilder` | window | 8644 |
| `openMatchcenter` | window | 8622 |
| `openMatchcenterStoryPreview` | window | 2256 |
| `openMatchday` | window | 22396 |
| `openMatchdayTimeline` | window | 22388 |
| `openOverview` | window | 22337 |
| `openSeason` | window | 8420 |
| `openToolMenu` | window | 23229 |
| `overviewCompactTableHtml` | function | 22696 |
| `overviewCrossSeasonTrendHtml` | function | 22745 |
| `overviewFormHtml` | function | 22704 |
| `overviewLastMatchdayText` | function | 22662 |
| `overviewLineupLinkHtml` | function | 22762 |
| `overviewMatchcenterLinkHtml` | function | 22759 |
| `overviewMatchdayEndMs` | function | 22567 |
| `overviewMatchdayStartMs` | function | 22561 |
| `overviewNextMatchdayHtml` | function | 22672 |
| `overviewOpponentLabel` | function | 22650 |
| `overviewOpponentPreviewHtml` | function | 22754 |
| `overviewRankChangeTile` | function | 22781 |
| `overviewRecordHtml` | function | 22738 |
| `overviewSeasonAwardHtml` | function | 22727 |
| `overviewSeasonBilanzHtml` | function | 22719 |
| `p1NarrativeKey` | function | 15590 |
| `paintGlobalSearchResults` | function | 23104 |
| `parseAppHash` | function | 3249 |
| `parseAsOfQueryValue` | function | 3288 |
| `parseComparisonVariant` | function | 13111 |
| `parseLastViewState` | function | 3423 |
| `parseSeasonDataState` | function | 22616 |
| `pct` | function | 5175 |
| `pctValue` | function | 12586 |
| `pdashBestPhase` | function | 14224 |
| `pdashInsight` | function | 14262 |
| `pdashInsights` | function | 14265 |
| `pdashNum` | function | 14208 |
| `pdashOpponentStrength` | function | 14242 |
| `pdashOpponentTier` | function | 14236 |
| `pdashPct` | function | 14212 |
| `pdashPhaseLabel` | function | 14216 |
| `pdashTopCount` | function | 14220 |
| `pdashTopOpponent` | function | 14232 |
| `pdashTopPartner` | function | 14228 |
| `penaltyRawText` | function | 4128 |
| `playerAppearedForUlmStatusInSeasonByName` | function | 10105 |
| `playerAppearedInSeasonByName` | function | 10094 |
| `playerExplainAdd` | function | 14898 |
| `playerExplainConfidence` | function | 14889 |
| `playerExplainConfidenceLabel` | function | 14895 |
| `playerExplainContextSentence` | function | 14934 |
| `playerExplainHeadline` | function | 14924 |
| `playerExplainRolePhrase` | function | 14915 |
| `playerExplainStyleSignature` | function | 14903 |
| `processGame` | function | 2942 |
| `rAlltimeKpis` | function | 12902 |
| `rAlltimePlayerDashboard` | function | 14417 |
| `rAllTimePlayersPage` | function | 15179 |
| `rankNarratives` | function | 15612 |
| `rAntiSynergyCompareChip` | function | 11925 |
| `rAntiSynergyDelta` | function | 11909 |
| `rAntiSynergyMainDelta` | function | 11972 |
| `rAntiSynergyMetricRow` | function | 11933 |
| `rAntiSynergyWinrateRow` | function | 11955 |
| `rAntiSynergyWinrateText` | function | 11949 |
| `rAsOfSelector` | function | 22890 |
| `ratio01` | function | 5176 |
| `rAvgResponseTimeNote` | function | 12206 |
| `rCarryPerformanceRows` | function | 10266 |
| `rClassicRoleTags` | function | 8775 |
| `rClassicTagTip` | function | 8713 |
| `rClutch` | function | 8981 |
| `rClutchBadge` | function | 8675 |
| `rComparisonCenterPage` | function | 14087 |
| `rComparisonDashboard` | function | 14038 |
| `rComparisonDuoSearchBox` | function | 13420 |
| `rComparisonDuoSuggestionButtons` | function | 13213 |
| `rComparisonMiniOverview` | function | 14026 |
| `rComparisonModeSelect` | function | 13441 |
| `rComparisonRoles` | function | 14030 |
| `rComparisonStyles` | function | 14049 |
| `rContextBar` | function | 22973 |
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
| `recommendLineComplements` | function | 19156 |
| `recordOverviewVisit` | function | 22635 |
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
| `rEmptyState` | function | 15638 |
| `renameEinsatzCenterGroup` | window | 7676 |
| `render` | function | 21622 |
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
| `rGlobalAllTimeStats` | function | 14525 |
| `rGlobalCareerHeader` | function | 14434 |
| `rGlobalDevelopment` | function | 14543 |
| `rGlobalDnaBars` | function | 14178 |
| `rGlobalDuoNetwork` | function | 14643 |
| `rGlobalOpponentSpecialist` | function | 14842 |
| `rGlobalOverview` | function | 14472 |
| `rGlobalPartnerOpponentPanel` | function | 14420 |
| `rGlobalProfileTags` | function | 12577 |
| `rGlobalSearchPanelHtml` | function | 23101 |
| `rGlobalSearchResultsHtml` | function | 23090 |
| `rGlobalSearchToggle` | function | 23087 |
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
| `rHallOfFamePage` | function | 15221 |
| `rHallPodiumList` | function | 12616 |
| `rHallSGBadge` | function | 12671 |
| `rIaShell` | function | 22993 |
| `rIdentityCards` | function | 8749 |
| `rIdentityTags` | function | 8729 |
| `rInsights` | function | 9242 |
| `rInteractiveDuoCenterPro` | function | 11566 |
| `rKpiCards` | function | 13680 |
| `rKpiExtendedMetrics` | function | 13813 |
| `rKpiInfoCards` | function | 13948 |
| `rKpiMetricCard` | function | 13805 |
| `rKpiMirrorRows` | function | 13691 |
| `rKpiObjectMini` | function | 13941 |
| `rKpiOpponentStrength` | function | 13910 |
| `rKpiRadar` | function | 13762 |
| `rKpiShareBars` | function | 13797 |
| `rKpiTextMetricCard` | function | 13810 |
| `rKpiTrendCompare` | function | 13843 |
| `rKPIVergleich` | function | 14012 |
| `rLexiconPage` | function | 15336 |
| `rLexiconRows` | function | 15332 |
| `rLigaGegnerPlaceholderPage` | function | 22873 |
| `rLineupBuilderAvailablePanel` | function | 20018 |
| `rLineupBuilderPage` | function | 20194 |
| `rLineupComplementCards` | function | 20115 |
| `rLineupMetricPills` | function | 20004 |
| `rLineupRecommendationCards` | function | 20066 |
| `rLineupRecommendationMode` | function | 20081 |
| `rLineupScoreRows` | function | 19900 |
| `rLineupSimpleCards` | function | 19922 |
| `rLineupTestLine` | function | 20128 |
| `rLineupTestMode` | function | 20177 |
| `rMainNav` | function | 22298 |
| `rMainNavBottom` | function | 22320 |
| `rMatchcenterCoachCardList` | function | 19479 |
| `rMatchcenterCoachIfThen` | function | 19493 |
| `rMatchcenterCoachSimpleList` | function | 19501 |
| `rMatchcenterCopyButton` | function | 19571 |
| `rMatchcenterDetailsSection` | function | 16785 |
| `rMatchcenterDigitalCoach` | function | 19506 |
| `rMatchcenterDuoRankCard` | function | 17104 |
| `rMatchcenterDuoRow` | function | 17080 |
| `rMatchcenterDuosTab` | function | 17251 |
| `rMatchcenterDuoWatchCard` | function | 17060 |
| `rMatchcenterFormCard` | function | 16841 |
| `rMatchcenterFormSection` | function | 16759 |
| `rMatchcenterGamesList` | function | 16862 |
| `rMatchcenterGoalieCard` | function | 17313 |
| `rMatchcenterGoalieMatchup` | function | 17337 |
| `rMatchcenterIntelCoachHints` | function | 19465 |
| `rMatchcenterIntelOverview` | function | 19419 |
| `rMatchcenterKpi` | function | 16834 |
| `rMatchcenterLineupBuilder` | function | 19931 |
| `rMatchcenterLockerList` | function | 19576 |
| `rMatchcenterLockerRoomSheet` | function | 19588 |
| `rMatchcenterMatchPlan` | function | 20273 |
| `rMatchcenterOpponentAlarm` | function | 19397 |
| `rMatchcenterOpponentDNA` | function | 19364 |
| `rMatchcenterOpponentDuos` | function | 17208 |
| `rMatchcenterOpponentScouting` | function | 17021 |
| `rMatchcenterPage` | function | 21104 |
| `rMatchcenterPlanItems` | function | 19330 |
| `rMatchcenterPlanWatch` | function | 19348 |
| `rMatchcenterPlayerRow` | function | 16895 |
| `rMatchcenterPlayersTab` | function | 17057 |
| `rMatchcenterProfileSection` | function | 16739 |
| `rMatchcenterRankCard` | function | 16919 |
| `rMatchcenterResponseMomentum` | function | 12291 |
| `rMatchcenterScoutingSummary` | function | 20229 |
| `rMatchcenterSocialBlock` | function | 19644 |
| `rMatchcenterSocialMediaCenter` | function | 19846 |
| `rMatchcenterSpecialCard` | function | 17254 |
| `rMatchcenterSpecialTeams` | function | 17263 |
| `rMatchcenterStoryForm` | function | 20894 |
| `rMatchcenterStoryFrame` | function | 20977 |
| `rMatchcenterStoryLogo` | function | 20889 |
| `rMatchcenterStoryPlayerCard` | function | 20899 |
| `rMatchcenterStoryPreview` | function | 20907 |
| `rMatchcenterTabs` | function | 16736 |
| `rMatchcenterTimeBars` | function | 16663 |
| `rMatchcenterTiming` | function | 16697 |
| `rMatchcenterTimingStatsCard` | function | 16677 |
| `rMatchcenterUlmDuoRankCard` | function | 17159 |
| `rMatchcenterUlmDuoRow` | function | 17136 |
| `rMatchcenterUlmDuos` | function | 17165 |
| `rMatchcenterUlmDuoWatchCard` | function | 17110 |
| `rMatchcenterUlmImpactCard` | function | 16925 |
| `rMatchcenterUlmPlayerRow` | function | 16954 |
| `rMatchcenterUlmRankCard` | function | 16978 |
| `rMatchcenterUlmScouting` | function | 16984 |
| `rMatchcenterWatchCard` | function | 16874 |
| `rMatchdayDetailPage` | function | 22496 |
| `rMatchdayPage` | function | 22536 |
| `rMatchdayTimelinePage` | function | 22485 |
| `rMatchdayTimelineRow` | function | 22477 |
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
| `rOverviewPage` | function | 22857 |
| `rPdashLabel` | function | 14369 |
| `rPdashStat` | function | 14372 |
| `rPenalties` | function | 9127 |
| `rPhases` | function | 8911 |
| `rPlayerDash` | function | 14375 |
| `rPlayerDashStyles` | function | 14357 |
| `rPlayerExplainItems` | function | 15121 |
| `rPlayerExplanation` | function | 15126 |
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
| `rScoreBreakdown` | function | 15652 |
| `rSeasonDataPreviewCard` | function | 6542 |
| `rSeasonDataPreviewContextHint` | function | 22925 |
| `rSeasonDataPreviewRows` | function | 6532 |
| `rSeasonDataPreviewStatus` | function | 6529 |
| `rSeasonDataStateContextHint` | function | 22942 |
| `rSeasonDuoCenterPro` | function | 11622 |
| `rSeasonDuoSummary` | function | 8901 |
| `rSeasonInsightsTab` | function | 9227 |
| `rSeasonLandingPage` | function | 14456 |
| `rSeasonPlayerDashboard` | function | 14414 |
| `rSeasonProfileKpis` | function | 8826 |
| `rSeasonProfileTagStrip` | function | 8847 |
| `rSeasonTrendRows` | function | 14138 |
| `rSocialVideoBlock` | function | 19713 |
| `rSparkline` | function | 12916 |
| `rStyleMetricTip` | function | 8698 |
| `rStyleProfileBars` | function | 8738 |
| `rTable` | function | 9296 |
| `rTeamPage` | function | 21253 |
| `rTeamResponseMomentumCard` | function | 12284 |
| `rTimeline` | function | 9016 |
| `rToolMenu` | function | 23215 |
| `runComparison` | window | 13181 |
| `runDuoComparison` | window | 13269 |
| `saveLastView` | function | 3440 |
| `scoreNarrative` | function | 15593 |
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
| `setContextAsOf` | window | 22903 |
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
| `socialDuoFocusLine` | function | 18206 |
| `socialEnsurePeriod` | function | 18192 |
| `socialFirstUseful` | function | 18196 |
| `socialKeyFactLine` | function | 18216 |
| `socialOpponentLine` | function | 18212 |
| `socialPlayerFocusLine` | function | 18199 |
| `socialSentence` | function | 18189 |
| `socialVideoJobsForMatchday` | function | 19747 |
| `specialTeamsStateFromActive` | function | 4219 |
| `stageSeasonDataPreview` | function | 6438 |
| `stageSeasonDataPreviewFromFile` | function | 6490 |
| `stageSeasonDataPreviewFromPaste` | function | 6504 |
| `startApp` | window | 8408 |
| `startEinsatzCenterDraftMode` | window | 7553 |
| `startHallOfFameIntro` | function | 8531 |
| `sumRoleGames` | function | 9416 |
| `switchMatchdaySeason` | window | 22407 |
| `switchOverviewSeason` | window | 22354 |
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
| `toggleToolMenu` | window | 23244 |
| `toolMenuElements` | function | 23219 |
| `toolMenuItemElements` | function | 23222 |
| `toolMenuOnClick` | function | 23280 |
| `toolMenuOnKeydown` | function | 23256 |
| `toPublicPlayerRegistry` | function | 3917 |
| `uiDatenstandBand` | function | 22106 |
| `uiDeltaIndicator` | function | 21871 |
| `uiFormatNumber` | function | 21843 |
| `uiHinweisKarte` | function | 21935 |
| `uiInfoIcon` | function | 21889 |
| `uiIntervallBalken` | function | 22011 |
| `uiKennzahlKachel` | function | 21901 |
| `uiKernaussage` | function | 21921 |
| `uiMethodenbox` | function | 22030 |
| `uiNotiz` | function | 22047 |
| `uiObjektseite` | function | 22195 |
| `uiObjektseiteSortTabs` | function | 22177 |
| `uiPlatzhalter` | function | 22127 |
| `uiQuoteText` | function | 22083 |
| `uiRangliste` | function | 21957 |
| `uiReliabilityDots` | function | 21856 |
| `uiVerlauf` | function | 21985 |
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

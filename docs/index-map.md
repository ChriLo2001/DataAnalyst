# Code-Karte: index.html

<!-- index-map: source-sha256=75873b832b7203e9cc085ca22beefe02fa3c2f214a9ece96fb3bb24e498a7364 source-lines=22962 -->

Automatisch erzeugt von `scripts/build-index-map.mjs`. Nicht von Hand bearbeiten — bei Änderungen an index.html erneut ausführen: `node scripts/build-index-map.mjs --write`. Vor gezieltem Lesen prüfen, ob die Karte noch aktuell ist: `node scripts/build-index-map.mjs --check`.

index.html: 22962 Zeilen gesamt (SHA-256 `75873b832b7203e9cc085ca22beefe02fa3c2f214a9ece96fb3bb24e498a7364`). Statischer `<style>`-Block: Zeile 8–1544. Haupt-`<script>`-Block: Zeile 1658–22958.

**Leseregel (siehe CLAUDE.md):** index.html nie vollständig laden. Diese Karte nennen, den gesuchten Namen im Register unten finden, dann nur den genannten Zeilenbereich lesen.

## Große Bereiche

Top-Level-Blöcke (Funktionen oder Daten-consts) ab 30 Zeilen oder 2000 Zeichen (z. B. `SEASON_CONFIG`). Das Zeichen-Kriterium existiert wegen des früheren `STATIC_SEASON_DATA`-Blocks — seit Token-Diät Teil 2 in `season-data-embedded.js` ausgelagert, siehe docs/season-data-import.md, deshalb unten nicht mehr gelistet:

| Name | Art | Zeile | Zeilen |
|---|---|---|---|
| `SEASON_CONFIG` | const-data | 1699–1790 | 92 |
| `TYPE_DESC` | const-data | 1893–1916 | 24 |
| `ROLE_TRAIT_COLORS` | const-data | 2001–2040 | 40 |
| `ROLE_TRAIT_TOOLTIPS` | const-data | 2062–2101 | 40 |
| `appendSeasonGameDiagnostics` | function | 2539–2588 | 50 |
| `resolveRosterPlayerByRef` | function | 2791–2821 | 31 |
| `processGame` | function | 2904–2961 | 58 |
| `parseAppHash` | function | 3211–3242 | 32 |
| `applyAppHash` | function | 3449–3479 | 31 |
| `getOrCreatePlayerProfile` | function | 3692–3724 | 33 |
| `toPublicPlayerRegistry` | function | 3879–3908 | 30 |
| `aggregateAllTimePlayers` | function | 3910–3943 | 34 |
| `emptySpecialTeamsStats` | function | 4004–4044 | 41 |
| `mergeSpecialTeamsStats` | function | 4058–4087 | 30 |
| `buildSpecialTeamsForGame` | function | 4203–4396 | 194 |
| `addGoalieGameToStats` | function | 4456–4506 | 51 |
| `buildGoalieGameRecord` | function | 4508–4556 | 49 |
| `buildGoalieStatsForSeason` | function | 4558–4637 | 80 |
| `aggregateGoalieAlltimeStats` | function | 4639–4673 | 35 |
| `getAssistDiagnostics` | function | 4700–4752 | 53 |
| `buildPlayerEvents` | function | 4882–4966 | 85 |
| `computeMetrics` | function | 4986–5118 | 133 |
| `buildSoloDuoProfile` | function | 5140–5183 | 44 |
| `identityInputs` | function | 5270–5327 | 58 |
| `buildIdentityProfiles` | function | 5371–5602 | 232 |
| `assignStatus` | function | 5649–5834 | 186 |
| `fetchTextWithDiagnostics` | function | 5869–5898 | 30 |
| `fetchSeasonGameRaw` | function | 5934–5973 | 40 |
| `validateGameStructure` | function | 6162–6201 | 40 |
| `buildDryRunReport` | function | 6268–6330 | 63 |
| `stageSeasonDataPreview` | function | 6401–6452 | 52 |
| `rSeasonDataPreviewCard` | function | 6505–6540 | 36 |
| `computeEinsatzCenterStats` | function | 6734–6764 | 31 |
| `rEinsatzCenterStats` | function | 6771–6789 | 19 |
| `einsatzCenterDeserializeAutosave` | function | 6992–7025 | 34 |
| `rEinsatzCenterGroupEditor` | function | 7335–7365 | 31 |
| `rEinsatzCenterRosterSuggestionCard` | function | 7382–7412 | 31 |
| `rEinsatzCenterGameEditor` | function | 7413–7465 | 53 |
| `rEinsatzCenterEditPage` | function | 7466–7513 | 48 |
| `loadSeasonData` | function | 7761–8219 | 459 |
| `loadSeasonForGlobal` | function | 8259–8289 | 31 |
| `loadSeason` | function | 8307–8358 | 52 |
| `ensureHallOfFameIntroOverlay` | function | 8386–8418 | 33 |
| `rMatrix` | function | 8806–8850 | 45 |
| `rRadar` | function | 8883–8930 | 48 |
| `rClutch` | function | 8933–8965 | 33 |
| `rTimeline` | function | 8968–9076 | 109 |
| `rOppBreakdown` | function | 9098–9130 | 33 |
| `generatePlayerInsights` | function | 9133–9176 | 44 |
| `rInsights` | function | 9194–9245 | 52 |
| `buildGoalieAnalysisModel` | function | 9512–9670 | 159 |
| `buildGoalieRoleProfile` | function | 9735–9808 | 74 |
| `rGoalieInsights` | function | 9927–9948 | 22 |
| `buildOpponentIntelligence` | function | 10386–10439 | 54 |
| `buildBestThirdManOptions` | function | 10589–10619 | 31 |
| `getDuoDirectScorerGameCounts` | function | 10620–10651 | 32 |
| `buildAnnotatedGoalEventsForGame` | function | 10701–10801 | 101 |
| `buildResponseGoalStatsRaw` | function | 10844–10892 | 49 |
| `buildMomentumSwingStatsRaw` | function | 10905–10975 | 71 |
| `buildDuoFloorCeiling` | function | 10982–11023 | 42 |
| `buildDuoWithWithoutImpact` | function | 11119–11152 | 34 |
| `buildDuoCompatibility` | function | 11207–11229 | 23 |
| `buildDuoProAnalysis` | function | 11264–11307 | 44 |
| `rDuoCenterPro` | function | 11308–11422 | 115 |
| `rInteractiveDuoCenterPro` | function | 11497–11552 | 56 |
| `getDifficultConnectionRowsForPlayer` | function | 11556–11600 | 45 |
| `getRosterImpactPlayerGames` | function | 11643–11683 | 41 |
| `buildRosterImpactAnalysis` | function | 11709–11768 | 60 |
| `rDifficultConnectionList` | function | 11823–11847 | 25 |
| `rDifficultConnectionListCompactLegacy` | function | 11848–11889 | 42 |
| `rDifficultConnectionListCompact` | function | 11890–11928 | 39 |
| `rDifficultConnectionsCard` | function | 11929–11965 | 37 |
| `RESPONSE_MOMENTUM_TOOLTIPS` | const-data | 11968–11999 | 32 |
| `rResponseMomentumOverviewCard` | function | 12043–12066 | 24 |
| `rMatchcenterResponseMomentum` | function | 12113–12150 | 38 |
| `getTeamAllTimeRecords` | function | 12152–12192 | 41 |
| `getAllTimeIdentityStandings` | function | 12273–12307 | 35 |
| `buildRecencyWeightedGlobalIdentityProfile` | function | 12309–12356 | 48 |
| `rHallOfFameHero` | function | 12412–12437 | 26 |
| `hallGoalieRowFromStats` | function | 12535–12567 | 33 |
| `rHallGoalieRankCard` | function | 12620–12651 | 32 |
| `rHallGoalieLegends` | function | 12669–12701 | 33 |
| `buildDuoComparison` | function | 13096–13115 | 20 |
| `rDuoCompareSummaryCards` | function | 13121–13151 | 31 |
| `rDuoComparisonPage` | function | 13252–13262 | 11 |
| `buildComparisonExtraMetrics` | function | 13307–13364 | 58 |
| `buildGoalieComparisonDataset` | function | 13401–13451 | 51 |
| `buildComparisonDataset` | function | 13452–13487 | 36 |
| `rKpiMirrorRows` | function | 13513–13572 | 60 |
| `rKpiRadar` | function | 13584–13618 | 35 |
| `rKpiTrendCompare` | function | 13665–13731 | 67 |
| `rKpiOpponentStrength` | function | 13732–13759 | 28 |
| `rKpiInfoCards` | function | 13770–13801 | 32 |
| `buildComparisonSummary` | function | 13802–13833 | 32 |
| `rComparisonStyles` | function | 13871–13908 | 38 |
| `rComparisonCenterPage` | function | 13909–13959 | 51 |
| `rGlobalDnaBars` | function | 14000–14029 | 30 |
| `buildSeasonPlayerDashModel` | function | 14099–14135 | 37 |
| `buildAlltimePlayerDashModel` | function | 14136–14178 | 43 |
| `rPlayerDashStyles` | function | 14179–14190 | 12 |
| `rPlayerDash` | function | 14197–14235 | 39 |
| `rGlobalOverview` | function | 14294–14345 | 52 |
| `rGlobalDevelopment` | function | 14365–14403 | 39 |
| `rGlobalDuoNetwork` | function | 14465–14662 | 198 |
| `rGlobalOpponentSpecialist` | function | 14664–14709 | 46 |
| `buildFieldPlayerExplanation` | function | 14775–14849 | 75 |
| `buildGoaliePlayerExplanation` | function | 14850–14903 | 54 |
| `buildPlayerIntelligence` | function | 14913–14942 | 30 |
| `rPlayerExplanation` | function | 14948–14999 | 52 |
| `rAllTimePlayersPage` | function | 15001–15041 | 41 |
| `rHallOfFamePage` | function | 15043–15131 | 89 |
| `rLexiconPage` | function | 15158–15330 | 173 |
| `buildConfidence` | function | 15347–15392 | 46 |
| `getMatchcenterOpponents` | function | 15545–15577 | 33 |
| `getMatchcenterDirectOpponents` | function | 15578–15608 | 31 |
| `matchcenterAnalyzeDirect` | function | 15611–15647 | 37 |
| `matchcenterEnsureUlmPlayer` | function | 15704–15741 | 38 |
| `matchcenterAddUlmScoring` | function | 15766–15803 | 38 |
| `matchcenterFinalizeUlmPlayers` | function | 15804–15872 | 69 |
| `matchcenterBuildUlmPlayerScouting` | function | 15873–15927 | 55 |
| `matchcenterEnsureOpponentDuo` | function | 15945–15977 | 33 |
| `matchcenterFinalizeOpponentDuos` | function | 16004–16038 | 35 |
| `matchcenterBuildOpponentDuos` | function | 16039–16083 | 45 |
| `matchcenterEnsureUlmDuo` | function | 16098–16135 | 38 |
| `matchcenterFinalizeUlmDuos` | function | 16155–16190 | 36 |
| `matchcenterBuildUlmDuos` | function | 16191–16233 | 43 |
| `matchcenterBuildSpecialTeamsMatchup` | function | 16267–16314 | 48 |
| `matchcenterBuildGoalieMatchup` | function | 16337–16379 | 43 |
| `matchcenterTimingStatsForGames` | function | 16412–16448 | 37 |
| `rMatchcenterUlmScouting` | function | 16792–16828 | 37 |
| `rMatchcenterOpponentScouting` | function | 16829–16864 | 36 |
| `rMatchcenterUlmDuos` | function | 16973–17015 | 43 |
| `rMatchcenterOpponentDuos` | function | 17016–17058 | 43 |
| `rMatchcenterSpecialTeams` | function | 17071–17120 | 50 |
| `matchcenterBuildPlanConfidence` | function | 17211–17245 | 35 |
| `matchcenterBuildIntelligenceDataQuality` | function | 17294–17344 | 51 |
| `matchcenterBuildOpponentDNA` | function | 17345–17457 | 113 |
| `matchcenterBuildOpponentAlarm` | function | 17524–17633 | 110 |
| `matchcenterBuildIntelligenceSignals` | function | 17680–17726 | 47 |
| `buildMatchIntelligenceFromContext` | function | 17727–17781 | 55 |
| `buildMatchStories` | function | 17830–17859 | 30 |
| `buildDigitalCoachReport` | function | 17930–17962 | 33 |
| `buildMatchdayCaptionBlocks` | function | 18034–18063 | 30 |
| `buildSocialMediaContent` | function | 18064–18112 | 49 |
| `lineupRosterGamesForPlayer` | function | 18180–18227 | 48 |
| `buildLineupExperienceProfile` | function | 18228–18270 | 43 |
| `buildLineupOpponentDNAFit` | function | 18283–18326 | 44 |
| `classifyLineIdentity` | function | 18327–18374 | 48 |
| `lineupPlayerProfile` | function | 18375–18450 | 76 |
| `buildLineupAnalysis` | function | 18451–18584 | 134 |
| `buildLineupScoreBreakdowns` | function | 18585–18614 | 30 |
| `lineupEvaluateComplementCandidate` | function | 18698–18775 | 78 |
| `buildTeamLineBalance` | function | 18794–18837 | 44 |
| `buildLineupRecommendations` | function | 18872–18950 | 79 |
| `matchcenterBuildMatchPlan` | function | 18979–19124 | 146 |
| `rMatchcenterOpponentDNA` | function | 19159–19191 | 33 |
| `rMatchcenterIntelOverview` | function | 19214–19259 | 46 |
| `rMatchcenterDigitalCoach` | function | 19301–19365 | 65 |
| `rMatchcenterLockerRoomSheet` | function | 19383–19438 | 56 |
| `downloadMatchdayStory` | window | 19457–19504 | 48 |
| `rSocialVideoBlock` | function | 19508–19539 | 32 |
| `generateSocialVideoVideos` | window | 19549–19590 | 42 |
| `rMatchcenterSocialMediaCenter` | function | 19636–19689 | 54 |
| `rMatchcenterLineupBuilder` | function | 19721–19793 | 73 |
| `rLineupBuilderAvailablePanel` | function | 19808–19855 | 48 |
| `rLineupRecommendationMode` | function | 19871–19904 | 34 |
| `rLineupTestLine` | function | 19918–19966 | 49 |
| `rLineupBuilderPage` | function | 19984–20017 | 34 |
| `rMatchcenterScoutingSummary` | function | 20018–20061 | 44 |
| `getTeamLogoUrlForStory` | function | 20106–20135 | 30 |
| `matchcenterStoryPickFactItems` | function | 20258–20310 | 53 |
| `buildMatchcenterStoryPreviewData` | function | 20529–20640 | 112 |
| `matchcenterStoryVisibleFacts` | function | 20647–20677 | 31 |
| `rMatchcenterStoryPreview` | function | 20696–20765 | 70 |
| `fitMatchcenterStoryLayout` | function | 20772–20814 | 43 |
| `rMatchcenterPage` | function | 20893–21040 | 148 |
| `rTeamPage` | function | 21041–21351 | 311 |
| `_render` | function | 21401–21565 | 165 |
| `uiObjektseite` | function | 21883–21916 | 34 |
| `rMatchdayDetailPage` | function | 22136–22171 | 36 |
| `buildOverviewCards` | function | 22413–22453 | 41 |

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

1027 `function`-Deklarationen, 134 `window.`-Funktionszuweisungen, 4 `const`-Pfeilfunktionen — alle Top-Level, sortiert nach Zeile.

| Name | Art | Zeile | Zeilen |
|---|---|---|---|
| `createSeasonBucket` | function | 1791–1805 | 15 |
| `getSeasonApiBaseUrl` | function | 1816–1832 | 17 |
| `seasonApiUrl` | function | 1833–1835 | 3 |
| `getSeasonOriginBaseUrl` | function | 1836–1844 | 9 |
| `seasonPathPrefix` | function | 1845–1847 | 3 |
| `uniqueList` | function | 1848–1850 | 3 |
| `seasonGameApiUrls` | function | 1851–1860 | 10 |
| `seasonGameHtmlUrls` | function | 1861–1868 | 8 |
| `clearAnalysisCache` | function | 2166–2168 | 3 |
| `analysisCacheContext` | function | 2169–2183 | 15 |
| `asOfCacheKeyPart` | function | 2197–2202 | 6 |
| `analysisCacheKey` | function | 2203–2206 | 4 |
| `cachedAnalysis` | function | 2207–2212 | 6 |
| `setState` | const-arrow | 2213–2220 | 8 |
| `invalidateGlobalIdentityCache` | function | 2221–2223 | 3 |
| `setP` | window | 2225–2225 | 1 |
| `setTab` | window | 2226–2226 | 1 |
| `setPlayerRoleView` | window | 2227–2227 | 1 |
| `setGoalieTab` | window | 2228–2228 | 1 |
| `toggleSpecialTeamsGameDetails` | window | 2229–2229 | 1 |
| `toggleMatchcenterSpecialTeamsGames` | window | 2230–2230 | 1 |
| `toggleMatchcenterPlayerDetails` | window | 2231–2231 | 1 |
| `toggleMatchcenterDuoDetails` | window | 2232–2232 | 1 |
| `setMatchcenterTab` | window | 2233–2233 | 1 |
| `openMatchcenterStoryPreview` | window | 2234–2234 | 1 |
| `closeMatchcenterStoryPreview` | window | 2235–2235 | 1 |
| `toggleHallOfFamePureSGPlayers` | window | 2236–2236 | 1 |
| `copyMatchcenterText` | window | 2237–2262 | 26 |
| `addLineupPlayer` | window | 2263–2268 | 6 |
| `removeLineupPlayer` | window | 2269–2269 | 1 |
| `clearLineupPlayers` | window | 2270–2270 | 1 |
| `filterLineupPlayers` | window | 2271–2277 | 7 |
| `lineupBuilderPoolIds` | function | 2278–2280 | 3 |
| `normalizeLineupLines` | function | 2281–2285 | 5 |
| `setLineupBuilderSeason` | window | 2286–2297 | 12 |
| `setLineupBuilderOpponent` | window | 2298–2298 | 1 |
| `setLineupBuilderMode` | window | 2299–2299 | 1 |
| `setLineupActiveLine` | window | 2300–2300 | 1 |
| `toggleLineupBuilderAvailable` | window | 2301–2314 | 14 |
| `selectAllLineupAvailable` | window | 2315–2315 | 1 |
| `clearLineupAvailable` | window | 2316–2316 | 1 |
| `addLineupBuilderPlayerToLine` | window | 2317–2326 | 10 |
| `addLineupBuilderPlayerToActiveLine` | window | 2327–2327 | 1 |
| `removeLineupBuilderPlayerFromLine` | window | 2328–2334 | 7 |
| `clearLineupBuilderLine` | window | 2335–2340 | 6 |
| `showLineupComplements` | window | 2341–2341 | 1 |
| `setLineupNewPlayerProfile` | window | 2342–2342 | 1 |
| `addSyntheticLineupPlayer` | window | 2343–2360 | 18 |
| `setAntiSynergyView` | window | 2361–2361 | 1 |
| `toggleAntiSynergyShowAll` | window | 2362–2362 | 1 |
| `toggleAntiSynergyHideSgOnly` | window | 2363–2363 | 1 |
| `filterLineupBuilderAvailable` | window | 2364–2370 | 7 |
| `setPage` | window | 2371–2379 | 9 |
| `backToHome` | window | 2380–2386 | 7 |
| `setGlobalPlayer` | window | 2387–2387 | 1 |
| `setGlobalPlayerDuo` | window | 2388–2388 | 1 |
| `setGlobalTab` | window | 2389–2389 | 1 |
| `toggleSgOnlyAlltime` | window | 2390–2390 | 1 |
| `getActiveSeasonKey` | function | 2392–2394 | 3 |
| `getGlobalAllTimeSnapshot` | function | 2396–2403 | 8 |
| `applySeasonContext` | function | 2404–2427 | 24 |
| `fixMojibakeText` | function | 2441–2443 | 3 |
| `repairRenderedMojibake` | function | 2444–2465 | 22 |
| `getAllTimeOpponentNames` | function | 2470–2477 | 8 |
| `getUniqueAllTimeOpponentNames` | function | 2478–2480 | 3 |
| `getUlmTeamStatus` | function | 2483–2487 | 5 |
| `detectUlmSide` | function | 2488–2494 | 7 |
| `detectSide` | const-arrow | 2495–2495 | 1 |
| `normalizePlayerName` | function | 2498–2507 | 10 |
| `getPreClubHistoryPlayerNames` | function | 2508–2510 | 3 |
| `isPreClubHistoryPlayerName` | function | 2511–2515 | 5 |
| `diagnoseGameDuplicates` | function | 2517–2530 | 14 |
| `gameClassificationStatusLabel` | function | 2531–2538 | 8 |
| `appendSeasonGameDiagnostics` | function | 2539–2588 | 50 |
| `warnEventProcessingOnce` | function | 2590–2597 | 8 |
| `rosterPlayerMatches` | function | 2598–2612 | 15 |
| `getRosterGameIdsForPlayer` | function | 2613–2621 | 9 |
| `isGoalieRosterEntry` | function | 2622–2626 | 5 |
| `goalieEntryRecognitionReason` | function | 2636–2645 | 10 |
| `isExcludedGoalieAppearance` | function | 2646–2659 | 14 |
| `isGoalieAppearance` | function | 2660–2665 | 6 |
| `isFieldAppearance` | function | 2666–2671 | 6 |
| `getFieldGameIdsForPlayer` | function | 2672–2678 | 7 |
| `getGoalieGameIdsForPlayer` | function | 2679–2685 | 7 |
| `getPlayerFieldGames` | function | 2686–2689 | 4 |
| `getPlayerGoalieGames` | function | 2690–2693 | 4 |
| `roleGameStableKey` | function | 2694–2696 | 3 |
| `getPlayerAlltimeRoleGames` | function | 2697–2715 | 19 |
| `getPlayerAlltimeFieldGames` | function | 2716–2718 | 3 |
| `getPlayerAlltimeGoalieGames` | function | 2719–2721 | 3 |
| `getPlayerAlltimeTotalGames` | function | 2722–2730 | 9 |
| `getPlayerSeasonRoleGameSummary` | function | 2731–2753 | 23 |
| `getPlayedUlmGames` | function | 2754–2762 | 9 |
| `countPlayedUlmGames` | function | 2763–2765 | 3 |
| `getSeasonTeamGames` | function | 2766–2769 | 4 |
| `getSeasonTeamGameIds` | function | 2770–2772 | 3 |
| `getPlayerSourceId` | function | 2773–2775 | 3 |
| `getJerseyNumber` | function | 2776–2778 | 3 |
| `normalizeEventPlayerRef` | function | 2779–2790 | 12 |
| `resolveRosterPlayerByRef` | function | 2791–2821 | 31 |
| `resolveGoalScorerPlayer` | function | 2822–2836 | 15 |
| `getGoalScorerFromEvent` | function | 2837–2839 | 3 |
| `normalizeAssistPlayerName` | function | 2840–2842 | 3 |
| `collectAssistEventRefs` | function | 2843–2870 | 28 |
| `getAssistPlayersFromEvent` | function | 2871–2884 | 14 |
| `resolveAssistPlayer` | function | 2885–2891 | 7 |
| `t2s` | const-arrow | 2893–2893 | 1 |
| `variance` | function | 2895–2899 | 5 |
| `processGame` | function | 2904–2961 | 58 |
| `isGamePlayed` | function | 2963–2965 | 3 |
| `deriveAsOfForSeason` | function | 2996–2999 | 4 |
| `seasonKeyToHashSegment` | function | 3101–3103 | 3 |
| `hashSegmentToSeasonKey` | function | 3104–3107 | 4 |
| `isValidAsOfDate` | function | 3108–3110 | 3 |
| `isValidAsOfStartTime` | function | 3111–3113 | 3 |
| `asOfEquals` | function | 3120–3127 | 8 |
| `decodeHashSegmentSafe` | function | 3191–3193 | 3 |
| `parseAppHash` | function | 3211–3242 | 32 |
| `parseAsOfQueryValue` | function | 3250–3260 | 11 |
| `buildAppHash` | function | 3266–3278 | 13 |
| `buildGlobalPageHash` | function | 3283–3292 | 10 |
| `buildHashStringFromParsed` | function | 3298–3302 | 5 |
| `computeCurrentAppHash` | function | 3318–3330 | 13 |
| `syncHashFromState` | function | 3344–3354 | 11 |
| `withoutHashSync` | function | 3361–3369 | 9 |
| `parseLastViewState` | function | 3385–3396 | 12 |
| `getStoredLastView` | function | 3397–3400 | 4 |
| `saveLastView` | function | 3402–3404 | 3 |
| `applyGlobalPageFromHash` | function | 3416–3436 | 21 |
| `applyAppHash` | function | 3449–3479 | 31 |
| `initHashRouting` | function | 3528–3546 | 19 |
| `gameResult` | function | 3549–3555 | 7 |
| `getOppStrength` | function | 3562–3568 | 7 |
| `createPlayerAnalysisProfile` | function | 3580–3582 | 3 |
| `emptyPlayerSeasonStats` | function | 3584–3589 | 6 |
| `emptyGoalieSeasonStats` | function | 3590–3611 | 22 |
| `emptyGoalieAlltimeStats` | function | 3612–3626 | 15 |
| `emptyGoalieSpecialTeamsStats` | function | 3627–3638 | 12 |
| `emptyFieldRoleSeasonStats` | function | 3639–3641 | 3 |
| `addUnique` | function | 3643–3645 | 3 |
| `incrementUniqueCounter` | function | 3647–3652 | 6 |
| `buildPlayerIdentity` | function | 3654–3669 | 16 |
| `resetPlayerRegistrySeason` | function | 3671–3681 | 11 |
| `derivePlayerStatus` | function | 3683–3690 | 8 |
| `getOrCreatePlayerProfile` | function | 3692–3724 | 33 |
| `registerPlayerIdentity` | function | 3726–3742 | 17 |
| `ensureGoalieSeasonStats` | function | 3744–3748 | 5 |
| `ensureFieldRoleSeasonStats` | function | 3749–3753 | 5 |
| `markFieldRoleAppearance` | function | 3754–3757 | 4 |
| `registerSeasonRosters` | function | 3759–3777 | 19 |
| `linkUiPlayersToRegistry` | function | 3779–3799 | 21 |
| `applySeasonScoringToRegistry` | function | 3801–3822 | 22 |
| `finalizePlayerRegistrySeason` | function | 3824–3838 | 15 |
| `serializeSeasonStats` | function | 3840–3852 | 13 |
| `serializeGoalieSeasonStats` | function | 3853–3874 | 22 |
| `serializeFieldRoleSeasonStats` | function | 3875–3877 | 3 |
| `toPublicPlayerRegistry` | function | 3879–3908 | 30 |
| `aggregateAllTimePlayers` | function | 3910–3943 | 34 |
| `finiteNumbers` | function | 3945–3947 | 3 |
| `avgOrNull` | function | 3948–3951 | 4 |
| `medianOrNull` | function | 3952–3957 | 6 |
| `incGoalieBucket` | function | 3958–3961 | 4 |
| `goalieEventAbsSeconds` | function | 3962–3967 | 6 |
| `goalieGameDurationSeconds` | function | 3968–3972 | 5 |
| `goalieGameStateBeforeGoal` | function | 3973–3984 | 12 |
| `getGoalieOpponentName` | function | 3985–3988 | 4 |
| `getGoalieOpponentTier` | function | 3989–3993 | 5 |
| `resultGoalsAgainstForSide` | function | 3994–4003 | 10 |
| `emptySpecialTeamsStats` | function | 4004–4044 | 41 |
| `clonePlain` | function | 4045–4047 | 3 |
| `finalizeSpecialTeamsStats` | function | 4048–4054 | 7 |
| `serializeSpecialTeamsStats` | function | 4055–4057 | 3 |
| `mergeSpecialTeamsStats` | function | 4058–4087 | 30 |
| `penaltyRawText` | function | 4090–4092 | 3 |
| `isMatchPenaltyEvent` | function | 4093–4096 | 4 |
| `isTwoPlusTwoPenaltyEvent` | function | 4097–4100 | 4 |
| `getPenaltyDisciplineType` | function | 4101–4108 | 8 |
| `getGameDurationMinutes` | function | 4109–4113 | 5 |
| `gameDaySortValue` | function | 4114–4121 | 8 |
| `isSameUlmTeamContext` | function | 4122–4129 | 8 |
| `getFurtherSameDayUlmGames` | function | 4130–4141 | 12 |
| `getPenaltySpecialTeamsMinutes` | function | 4142–4144 | 3 |
| `getPenaltyBasePersonalMinutes` | function | 4145–4152 | 8 |
| `getPenaltyPersonalMinutes` | function | 4153–4162 | 10 |
| `getPenaltyDisciplineMinutes` | function | 4163–4165 | 3 |
| `getSpecialTeamsPenaltyChunks` | function | 4166–4175 | 10 |
| `isPenaltyGoalEvent` | function | 4176–4180 | 5 |
| `specialTeamsStateFromActive` | function | 4181–4187 | 7 |
| `annotateSpecialTeamsGoalEvent` | function | 4188–4202 | 15 |
| `buildSpecialTeamsForGame` | function | 4203–4396 | 194 |
| `buildSpecialTeamsForSeason` | function | 4397–4405 | 9 |
| `aggregateAlltimeSpecialTeams` | function | 4406–4413 | 8 |
| `mergeGoalieSpecialTeamsStats` | function | 4414–4425 | 12 |
| `addGoalieSpecialTeamsGameToStats` | function | 4426–4440 | 15 |
| `finalizeGoalieSeasonStats` | function | 4441–4455 | 15 |
| `addGoalieGameToStats` | function | 4456–4506 | 51 |
| `buildGoalieGameRecord` | function | 4508–4556 | 49 |
| `buildGoalieStatsForSeason` | function | 4558–4637 | 80 |
| `aggregateGoalieAlltimeStats` | function | 4639–4673 | 35 |
| `updatePlayerRoleAvailability` | function | 4675–4684 | 10 |
| `getGoalieDiagnostics` | function | 4686–4691 | 6 |
| `getSpecialTeamsDiagnostics` | function | 4693–4698 | 6 |
| `getAssistDiagnostics` | function | 4700–4752 | 53 |
| `buildSeasonDuos` | function | 4755–4781 | 27 |
| `mergeDuoSet` | function | 4782–4798 | 17 |
| `aggregateAllTimeDuos` | function | 4799–4809 | 11 |
| `aggregateSeasonStats` | function | 4811–4826 | 16 |
| `buildPlayerDataFoundation` | function | 4828–4849 | 22 |
| `buildRegistry` | function | 4851–4877 | 27 |
| `buildPlayerEvents` | function | 4882–4966 | 85 |
| `getPhaseIndex` | function | 4971–4981 | 11 |
| `computeMetrics` | function | 4986–5118 | 133 |
| `detectTypes` | function | 5120–5135 | 16 |
| `pct` | function | 5137–5137 | 1 |
| `ratio01` | function | 5138–5138 | 1 |
| `relative01` | function | 5139–5139 | 1 |
| `buildSoloDuoProfile` | function | 5140–5183 | 44 |
| `identityPartnerStats` | function | 5184–5197 | 14 |
| `identityOpponentGroups` | function | 5198–5205 | 8 |
| `eventMatchesTeams` | function | 5206–5211 | 6 |
| `clutchText` | function | 5212–5212 | 1 |
| `isImportantClutchGoal` | function | 5213–5217 | 5 |
| `isDecisiveGoal` | function | 5218–5220 | 3 |
| `isLateGoal` | function | 5221–5225 | 5 |
| `isComebackRelevantGoal` | function | 5226–5229 | 4 |
| `identityPointsVsTeams` | function | 5230–5232 | 3 |
| `identityGoalsVsTeams` | function | 5233–5235 | 3 |
| `identityClutchGoalsVsTeams` | function | 5236–5238 | 3 |
| `identityDecisiveGoalsVsTeams` | function | 5239–5241 | 3 |
| `identityLateGoalsVsTeams` | function | 5242–5244 | 3 |
| `countMomentumClusters` | function | 5245–5269 | 25 |
| `identityInputs` | function | 5270–5327 | 58 |
| `clearlyAboveAverage` | function | 5328–5328 | 1 |
| `normalizeSecondaryTraits` | function | 5329–5340 | 12 |
| `seasonRoleTraitsFromClassic` | function | 5341–5345 | 5 |
| `seasonRoleKeysForPlayer` | function | 5346–5354 | 9 |
| `hasSeasonRole` | function | 5355–5357 | 3 |
| `selectEnforcerKeys` | function | 5358–5370 | 13 |
| `buildIdentityProfiles` | function | 5371–5602 | 232 |
| `composeIdentityText` | function | 5603–5609 | 7 |
| `countCaptainAppearances` | function | 5611–5623 | 13 |
| `countGoalieAppearances` | function | 5625–5627 | 3 |
| `computeRosterStatus` | function | 5629–5647 | 19 |
| `assignStatus` | function | 5649–5834 | 186 |
| `fetchJsonLegacy` | function | 5840–5859 | 20 |
| `responseExcerpt` | function | 5861–5863 | 3 |
| `diagnosticError` | function | 5864–5868 | 5 |
| `fetchTextWithDiagnostics` | function | 5869–5898 | 30 |
| `fetchJsonWithDiagnostics` | function | 5899–5907 | 9 |
| `fetchJson` | function | 5908–5911 | 4 |
| `formatStatus` | function | 5912–5914 | 3 |
| `formatDiagnosticAttempt` | function | 5915–5927 | 13 |
| `formatGameLoadError` | function | 5928–5933 | 6 |
| `fetchSeasonGameRaw` | function | 5934–5973 | 40 |
| `getStaticSeasonGames` | function | 5977–5980 | 4 |
| `loadSeasonManifest` | function | 5992–6008 | 17 |
| `resolveCurrentSeasonKey` | function | 6024–6043 | 20 |
| `applyCurrentSeasonCoverHighlight` | function | 6044–6048 | 5 |
| `isUsableExternalSeasonData` | function | 6061–6069 | 9 |
| `ensureExternalSeasonData` | function | 6070–6091 | 22 |
| `buildStaticSeasonDataBlock` | function | 6092–6101 | 10 |
| `getGameId` | function | 6128–6132 | 5 |
| `findDuplicateGameIds` | function | 6134–6144 | 11 |
| `validateGameStructure` | function | 6162–6201 | 40 |
| `validateSeasonGames` | function | 6203–6213 | 11 |
| `diffGameIds` | function | 6215–6224 | 10 |
| `validateSeasonKey` | function | 6226–6236 | 11 |
| `validateWrapperFormat` | function | 6238–6247 | 10 |
| `validateMergedSeason` | function | 6249–6266 | 18 |
| `buildDryRunReport` | function | 6268–6330 | 63 |
| `seasonDataPreviewRerender` | function | 6351–6353 | 3 |
| `seasonDataPreviewRow` | function | 6355–6366 | 12 |
| `buildSeasonDataPreviewChanges` | function | 6373–6390 | 18 |
| `stageSeasonDataPreview` | function | 6401–6452 | 52 |
| `stageSeasonDataPreviewFromFile` | function | 6453–6466 | 14 |
| `stageSeasonDataPreviewFromPaste` | function | 6467–6471 | 5 |
| `discardSeasonDataPreview` | function | 6472–6476 | 5 |
| `getSeasonDataPreview` | function | 6478–6480 | 3 |
| `isSeasonDataPreviewStale` | function | 6486–6490 | 5 |
| `rSeasonDataPreviewStatus` | function | 6492–6494 | 3 |
| `rSeasonDataPreviewRows` | function | 6495–6503 | 9 |
| `rSeasonDataPreviewCard` | function | 6505–6540 | 36 |
| `setSeasonDataPreviewOpen` | window | 6541–6541 | 1 |
| `setSeasonDataPreviewPasteText` | window | 6542–6542 | 1 |
| `fileNameForLineupSeasonKey` | function | 6562–6564 | 3 |
| `ensureLineupDataLoaded` | function | 6580–6596 | 17 |
| `ensureLineupGroupsRegistryLoaded` | function | 6605–6621 | 17 |
| `resolveLineupPlayerName` | function | 6633–6636 | 4 |
| `findLineupGameContext` | function | 6639–6646 | 8 |
| `rEinsatzCenterGroup` | function | 6648–6659 | 12 |
| `rEinsatzCenterCombo` | function | 6661–6668 | 8 |
| `rEinsatzCenterGameCard` | function | 6670–6687 | 18 |
| `rEinsatzCenterPage` | function | 6689–6708 | 20 |
| `setEinsatzCenterSeason` | window | 6710–6715 | 6 |
| `openEinsatzCenter` | window | 6716–6723 | 8 |
| `computeEinsatzCenterStats` | function | 6734–6764 | 31 |
| `lineupGroupDisplayName` | function | 6765–6770 | 6 |
| `rEinsatzCenterStats` | function | 6771–6789 | 19 |
| `getEffectiveLineupData` | function | 6847–6854 | 8 |
| `isEinsatzCenterGameFromDraft` | function | 6856–6859 | 4 |
| `einsatzCenterDraftInView` | function | 6861–6864 | 4 |
| `rEinsatzCenterDraftMark` | function | 6865–6868 | 4 |
| `rEinsatzCenterDraftStatsHint` | function | 6869–6873 | 5 |
| `einsatzCenterDraftStaleHint` | function | 6875–6877 | 3 |
| `rEinsatzCenterDraftBanner` | function | 6879–6886 | 8 |
| `ensureEinsatzCenterDraft` | function | 6897–6910 | 14 |
| `getEinsatzCenterGameDraft` | function | 6919–6930 | 12 |
| `einsatzCenterAutosaveKey` | function | 6957–6957 | 1 |
| `einsatzCenterStorageRead` | function | 6958–6960 | 3 |
| `einsatzCenterStorageWrite` | function | 6961–6963 | 3 |
| `einsatzCenterStorageRemove` | function | 6964–6966 | 3 |
| `einsatzCenterDraftIsEmpty` | function | 6969–6971 | 3 |
| `einsatzCenterSerializeDraft` | function | 6973–6985 | 13 |
| `einsatzCenterIsPlainObject` | function | 6986–6986 | 1 |
| `einsatzCenterDeserializeAutosave` | function | 6992–7025 | 34 |
| `einsatzCenterCurrentRawBaseHash` | function | 7032–7037 | 6 |
| `einsatzCenterAutosaveDraft` | function | 7046–7073 | 28 |
| `einsatzCenterInspectAutosave` | function | 7081–7109 | 29 |
| `restoreEinsatzCenterAutosave` | function | 7112–7128 | 17 |
| `discardEinsatzCenterAutosave` | function | 7130–7135 | 6 |
| `rEinsatzCenterAutosaveBanner` | function | 7138–7150 | 13 |
| `einsatzCenterAutosaveInfoText` | function | 7152–7162 | 11 |
| `loadEinsatzCenterMismatchedAutosave` | function | 7176–7194 | 19 |
| `deriveLineupValidPlayerIds` | function | 7207–7223 | 17 |
| `deriveLineupUlmPlayerIds` | function | 7231–7247 | 17 |
| `getSeasonmanagerRosterSuggestion` | function | 7261–7281 | 21 |
| `einsatzCenterCanonicalJson` | function | 7290–7299 | 10 |
| `einsatzCenterSha256Hex` | function | 7300–7304 | 5 |
| `einsatzCenterComputeBaseHash` | function | 7305–7307 | 3 |
| `einsatzCenterSoftIssues` | function | 7314–7332 | 19 |
| `rEinsatzCenterGroupEditor` | function | 7335–7365 | 31 |
| `rEinsatzCenterComboEditor` | function | 7366–7372 | 7 |
| `rEinsatzCenterRosterSuggestionCard` | function | 7382–7412 | 31 |
| `rEinsatzCenterGameEditor` | function | 7413–7465 | 53 |
| `rEinsatzCenterEditPage` | function | 7466–7513 | 48 |
| `startEinsatzCenterDraftMode` | window | 7516–7520 | 5 |
| `cancelEinsatzCenterEdit` | window | 7521–7531 | 11 |
| `viewEinsatzCenterMergedView` | window | 7533–7533 | 1 |
| `returnToEinsatzCenterEdit` | window | 7534–7534 | 1 |
| `setEinsatzCenterIncludeDraft` | window | 7535–7535 | 1 |
| `selectEinsatzCenterEditGame` | window | 7536–7539 | 4 |
| `addEinsatzCenterRosterPlayer` | window | 7540–7547 | 8 |
| `removeEinsatzCenterRosterPlayer` | window | 7548–7555 | 8 |
| `toggleEinsatzCenterRosterSuggestionPlayer` | window | 7556–7562 | 7 |
| `dismissEinsatzCenterRosterSuggestion` | window | 7563–7566 | 4 |
| `acceptEinsatzCenterRosterSuggestion` | window | 7574–7590 | 17 |
| `addEinsatzCenterExistingGroup` | window | 7591–7599 | 9 |
| `addEinsatzCenterNewGroup` | window | 7600–7616 | 17 |
| `removeEinsatzCenterGroup` | window | 7617–7624 | 8 |
| `toggleEinsatzCenterGroupRename` | window | 7625–7627 | 3 |
| `renameEinsatzCenterGroup` | window | 7639–7658 | 20 |
| `addEinsatzCenterGroupPlayer` | window | 7659–7666 | 8 |
| `removeEinsatzCenterGroupPlayer` | window | 7667–7674 | 8 |
| `setEinsatzCenterGroupPlayerPosition` | window | 7675–7683 | 9 |
| `toggleEinsatzCenterComboPlayer` | window | 7684–7691 | 8 |
| `confirmEinsatzCenterCombo` | window | 7692–7702 | 11 |
| `removeEinsatzCenterCombo` | window | 7703–7709 | 7 |
| `setEinsatzCenterGameNote` | window | 7710–7716 | 7 |
| `buildEinsatzCenterDraftExport` | function | 7720–7733 | 14 |
| `exportEinsatzCenterDraft` | window | 7734–7746 | 13 |
| `loadSeasonData` | function | 7761–8219 | 459 |
| `showMainShell` | function | 8222–8226 | 5 |
| `hasSeasonSource` | function | 8227–8230 | 4 |
| `hasEmbeddedSeasonData` | function | 8231–8233 | 3 |
| `getGlobalLoadableSeasonKeys` | function | 8234–8240 | 7 |
| `getAllTimeCoverStats` | function | 8241–8248 | 8 |
| `updateCoverAllTimeStats` | function | 8249–8257 | 9 |
| `loadSeasonForGlobal` | function | 8259–8289 | 31 |
| `ensureGlobalDataLoaded` | function | 8290–8305 | 16 |
| `loadSeason` | function | 8307–8358 | 52 |
| `startApp` | window | 8360–8371 | 12 |
| `ensureAppLoaded` | function | 8362–8371 | 10 |
| `openSeason` | window | 8372–8374 | 3 |
| `openAllTimePlayers` | window | 8375–8380 | 6 |
| `hofIntroDelay` | function | 8383–8385 | 3 |
| `ensureHallOfFameIntroOverlay` | function | 8386–8418 | 33 |
| `buildHallOfFameIntroTitle` | function | 8419–8429 | 11 |
| `seedHallOfFameIntroParticles` | function | 8430–8447 | 18 |
| `cleanupHallOfFameIntro` | function | 8448–8462 | 15 |
| `restoreHallOfFameIntroPrevious` | function | 8463–8474 | 12 |
| `finishHallOfFameIntro` | function | 8475–8482 | 8 |
| `startHallOfFameIntro` | function | 8483–8507 | 25 |
| `cancelHallOfFameIntro` | function | 8508–8519 | 12 |
| `openHallOfFame` | window | 8521–8544 | 24 |
| `openComparisonCenter` | window | 8545–8573 | 29 |
| `openMatchcenter` | window | 8574–8595 | 22 |
| `openLineupBuilder` | window | 8596–8613 | 18 |
| `setMatchcenterOpponent` | window | 8614–8614 | 1 |
| `setMatchcenterContext` | window | 8615–8615 | 1 |
| `setMatchcenterSeason` | window | 8616–8616 | 1 |
| `toggleMatchcenterGames` | window | 8617–8617 | 1 |
| `openLexicon` | window | 8618–8621 | 4 |
| `rRes` | const-arrow | 8626–8626 | 1 |
| `rClutchBadge` | function | 8627–8634 | 8 |
| `escAttr` | function | 8635–8637 | 3 |
| `roleTraitLabel` | function | 8638–8640 | 3 |
| `isVisibleSecondaryTrait` | function | 8641–8644 | 4 |
| `rRoleTraitTip` | function | 8645–8649 | 5 |
| `rStyleMetricTip` | function | 8650–8653 | 4 |
| `rRosterStatusBadge` | function | 8654–8661 | 8 |
| `classicTagLabel` | function | 8662–8664 | 3 |
| `rClassicTagTip` | function | 8665–8669 | 5 |
| `fallbackIdentityProfile` | function | 8670–8680 | 11 |
| `rIdentityTags` | function | 8681–8689 | 9 |
| `rStyleProfileBars` | function | 8690–8700 | 11 |
| `rIdentityCards` | function | 8701–8726 | 26 |
| `rClassicRoleTags` | function | 8727–8734 | 8 |
| `renderTags` | function | 8735–8737 | 3 |
| `getSeasonPlayerFieldBasis` | function | 8739–8765 | 27 |
| `getSeasonScopedIdentityProfile` | function | 8766–8777 | 12 |
| `rSeasonProfileKpis` | function | 8778–8797 | 20 |
| `rSeasonProfileTagStrip` | function | 8799–8803 | 5 |
| `rMatrix` | function | 8806–8850 | 45 |
| `rSeasonDuoSummary` | function | 8853–8861 | 9 |
| `rPhases` | function | 8863–8880 | 18 |
| `rRadar` | function | 8883–8930 | 48 |
| `rClutch` | function | 8933–8965 | 33 |
| `rTimeline` | function | 8968–9076 | 109 |
| `rPenalties` | function | 9079–9095 | 17 |
| `rOppBreakdown` | function | 9098–9130 | 33 |
| `generatePlayerInsights` | function | 9133–9176 | 44 |
| `rSeasonInsightsTab` | function | 9179–9192 | 14 |
| `rInsights` | function | 9194–9245 | 52 |
| `rTable` | function | 9248–9268 | 21 |
| `findLoadedSeasonPlayer` | function | 9271–9279 | 9 |
| `getAllTimePlayerRows` | function | 9280–9295 | 16 |
| `isSgOnlyAlltimePlayer` | function | 9296–9303 | 8 |
| `isPureSGPlayer` | function | 9304–9307 | 4 |
| `filterPureSGPlayers` | function | 9308–9311 | 4 |
| `getAllTimeMainPlayerRows` | function | 9312–9314 | 3 |
| `getAllTimeSgOnlyRows` | function | 9315–9317 | 3 |
| `getPlayerSeasonStats` | function | 9318–9322 | 5 |
| `getPlayerAlltimeStats` | function | 9323–9330 | 8 |
| `getPlayerRegistryProfile` | function | 9331–9338 | 8 |
| `getPlayerGoalieSeasonStats` | function | 9339–9343 | 5 |
| `getPlayerGoalieAlltimeStats` | function | 9344–9367 | 24 |
| `sumRoleGames` | function | 9368–9373 | 6 |
| `getPlayerRoleAvailability` | function | 9374–9387 | 14 |
| `resolvePlayerRoleView` | function | 9388–9395 | 8 |
| `rPlayerRoleSwitch` | function | 9396–9402 | 7 |
| `goalieNum` | function | 9403–9408 | 6 |
| `goalieTime` | function | 9409–9416 | 8 |
| `goalieBucketRows` | function | 9417–9422 | 6 |
| `goalieTopRow` | function | 9423–9425 | 3 |
| `goalieTierMeta` | function | 9426–9434 | 9 |
| `goalieStdDev` | function | 9435–9440 | 6 |
| `goalieDetailFirstTime` | function | 9441–9447 | 7 |
| `goalieEventSecondInPeriod` | function | 9448–9453 | 6 |
| `goaliePctText` | function | 9454–9457 | 4 |
| `goalieSafeNum` | function | 9458–9461 | 4 |
| `goalieClampScore` | function | 9462–9465 | 4 |
| `goalieInverseScore` | function | 9466–9473 | 8 |
| `goaliePositiveScore` | function | 9474–9481 | 8 |
| `goaliePositiveCurveScore` | function | 9482–9490 | 9 |
| `goalieWeightedScore` | function | 9491–9496 | 6 |
| `goalieApplySampleConfidence` | function | 9497–9504 | 8 |
| `goalieBucketLooseSum` | function | 9505–9511 | 7 |
| `buildGoalieAnalysisModel` | function | 9512–9670 | 159 |
| `rGoalieBars` | function | 9671–9680 | 10 |
| `goalieDnaKey` | function | 9722–9726 | 5 |
| `goalieDnaValue` | function | 9727–9733 | 7 |
| `goalieStateGoals` | function | 9734–9734 | 1 |
| `buildGoalieRoleProfile` | function | 9735–9808 | 74 |
| `rGoalieRoleTraits` | function | 9809–9812 | 4 |
| `getGoalieDnaRows` | function | 9813–9816 | 4 |
| `rGoalieDnaBars` | function | 9817–9830 | 14 |
| `rGoalieKpis` | function | 9831–9847 | 17 |
| `rGoalieMiniMetrics` | function | 9848–9853 | 6 |
| `rGoalieFirstGoalResistance` | function | 9854–9867 | 14 |
| `rGoalieMomentum` | function | 9868–9881 | 14 |
| `rGoalieTierCards` | function | 9882–9909 | 28 |
| `rGoaliePhaseProfile` | function | 9910–9926 | 17 |
| `rGoalieInsights` | function | 9927–9948 | 22 |
| `rGoalieOverview` | function | 9949–9965 | 17 |
| `rGoaliePhases` | function | 9966–9968 | 3 |
| `rGoalieOpponents` | function | 9969–9980 | 12 |
| `rGoalieStability` | function | 9981–10005 | 25 |
| `rGoalieTable` | function | 10006–10013 | 8 |
| `rGoalieAnalysis` | function | 10014–10039 | 26 |
| `getPreviousSeasonKey` | function | 10041–10045 | 5 |
| `playerAppearedInSeasonByName` | function | 10046–10056 | 11 |
| `playerAppearedForUlmStatusInSeasonByName` | function | 10057–10075 | 19 |
| `isRookieCandidateForSeason` | function | 10076–10085 | 10 |
| `getLoadedSeasonPointsByName` | function | 10086–10090 | 5 |
| `seasonHasPureUlmTeam` | function | 10091–10097 | 7 |
| `isSgOnlyHallOfFameExcluded` | function | 10098–10106 | 9 |
| `isHallOfFameEligiblePlayer` | function | 10107–10112 | 6 |
| `getHallOfFamePlayerRows` | function | 10113–10115 | 3 |
| `getHallOfFamePlayerIdSet` | function | 10116–10118 | 3 |
| `getGlobalProfileEvents` | function | 10120–10131 | 12 |
| `countBy` | function | 10133–10141 | 9 |
| `getLoadedSeasonPlayerUi` | function | 10142–10146 | 5 |
| `getGlobalPlayerTeamRecord` | function | 10147–10172 | 26 |
| `getGlobalPlayerPeakGame` | function | 10173–10183 | 11 |
| `getGlobalPlayerBestSeason` | function | 10184–10190 | 7 |
| `getAllTimeDuoRowsForPlayer` | function | 10191–10201 | 11 |
| `getCarryPerformanceRows` | function | 10202–10217 | 16 |
| `rCarryPerformanceRows` | function | 10218–10230 | 13 |
| `getAllTimeGamesPlayedRows` | function | 10231–10255 | 25 |
| `getAllTimePenaltyRows` | function | 10256–10271 | 16 |
| `getSeasonUiPlayerForProfile` | function | 10272–10275 | 4 |
| `getSeasonIdentityProfile` | function | 10276–10280 | 5 |
| `seasonStatNumber` | function | 10281–10284 | 4 |
| `seasonStatSetSize` | function | 10285–10290 | 6 |
| `isActiveAlltimeSeasonStats` | function | 10291–10304 | 14 |
| `getActiveAlltimeSeasonKeys` | function | 10305–10315 | 11 |
| `getAlltimeRecencyWeight` | function | 10316–10321 | 6 |
| `getRosterStatus` | function | 10322–10328 | 7 |
| `getGlobalTopScorerMilestones` | function | 10329–10341 | 13 |
| `getGlobalRookieSeasonKey` | function | 10342–10355 | 14 |
| `getGlobalRookieMilestone` | function | 10356–10366 | 11 |
| `getGlobalPlayerMilestones` | function | 10367–10384 | 18 |
| `buildOpponentIntelligence` | function | 10386–10439 | 54 |
| `rOpponentIntelBars` | function | 10441–10451 | 11 |
| `getAllTimeDuoRows` | function | 10453–10475 | 23 |
| `rDuoRows` | function | 10477–10496 | 20 |
| `getAllLoadedSeasonGames` | function | 10498–10517 | 20 |
| `getRosterEntryRegistryProfile` | function | 10519–10522 | 4 |
| `difficultConnectionConfidence` | function | 10523–10527 | 5 |
| `getDuoRowsForPlayerScope` | function | 10528–10546 | 19 |
| `buildDirectDuoLookupForPlayer` | function | 10547–10564 | 18 |
| `duoScopeSeasonKeys` | function | 10565–10568 | 4 |
| `getDuoScorerCountsWithCandidate` | function | 10569–10588 | 20 |
| `buildBestThirdManOptions` | function | 10589–10619 | 31 |
| `getDuoDirectScorerGameCounts` | function | 10620–10651 | 32 |
| `responseMomentumAbsSeconds` | function | 10653–10658 | 6 |
| `responseMomentumTime` | function | 10659–10665 | 7 |
| `responseMomentumGameRows` | function | 10666–10672 | 7 |
| `responseMomentumSide` | function | 10673–10681 | 9 |
| `responseMomentumActor` | function | 10682–10692 | 11 |
| `responseMomentumGoalActors` | function | 10693–10700 | 8 |
| `buildAnnotatedGoalEventsForGame` | function | 10701–10801 | 101 |
| `responseMomentumConfidence` | function | 10802–10806 | 5 |
| `responseMomentumEmptyState` | function | 10807–10814 | 8 |
| `responseMomentumPairKey` | function | 10815–10817 | 3 |
| `ensureRmPlayer` | function | 10818–10823 | 6 |
| `ensureRmDuo` | function | 10824–10829 | 6 |
| `finalizeResponseStats` | function | 10830–10843 | 14 |
| `buildResponseGoalStatsRaw` | function | 10844–10892 | 49 |
| `buildResponseGoalStats` | function | 10893–10898 | 6 |
| `finalizeMomentumStats` | function | 10899–10904 | 6 |
| `buildMomentumSwingStatsRaw` | function | 10905–10975 | 71 |
| `buildMomentumSwingStats` | function | 10976–10981 | 6 |
| `buildDuoFloorCeiling` | function | 10982–11023 | 42 |
| `buildDuoWarnings` | function | 11024–11042 | 19 |
| `duoProPairKey` | function | 11043–11045 | 3 |
| `duoProContextSeasonKey` | function | 11046–11048 | 3 |
| `getDuoFieldPlayerRows` | function | 11049–11059 | 11 |
| `duoProPlayer` | function | 11060–11064 | 5 |
| `getDuoSharedFieldRows` | function | 11065–11070 | 6 |
| `buildDuoDirectProduction` | function | 11071–11091 | 21 |
| `emptyDuoTeamImpactStats` | function | 11092–11094 | 3 |
| `addDuoTeamGame` | function | 11095–11110 | 16 |
| `finalizeDuoTeamImpactStats` | function | 11111–11118 | 8 |
| `buildDuoWithWithoutImpact` | function | 11119–11152 | 34 |
| `buildDuoOpponentAdjusted` | function | 11153–11165 | 13 |
| `buildDuoNetworkContext` | function | 11166–11189 | 24 |
| `buildDuoGapAnalysis` | function | 11190–11206 | 17 |
| `buildDuoCompatibility` | function | 11207–11229 | 23 |
| `buildDuoUntestedPotential` | function | 11230–11241 | 12 |
| `buildDuoUsageRate` | function | 11242–11253 | 12 |
| `buildDuoReplacementOptions` | function | 11254–11263 | 10 |
| `buildDuoProAnalysis` | function | 11264–11307 | 44 |
| `rDuoCenterPro` | function | 11308–11422 | 115 |
| `duoProDomId` | function | 11423–11425 | 3 |
| `duoProPickerOpen` | function | 11426–11428 | 3 |
| `duoProPickerMessage` | function | 11429–11431 | 3 |
| `setDuoProPickerState` | function | 11432–11441 | 10 |
| `duoProResolveCandidate` | function | 11442–11450 | 9 |
| `duoProSelectionPayload` | function | 11451–11460 | 10 |
| `openDuoProPicker` | window | 11461–11461 | 1 |
| `cancelDuoProPicker` | window | 11462–11462 | 1 |
| `selectDuoProQuick` | window | 11463–11466 | 4 |
| `confirmDuoProSelection` | window | 11467–11481 | 15 |
| `setDuoProSelection` | window | 11482–11489 | 8 |
| `rDuoProPlayerSelect` | function | 11490–11496 | 7 |
| `rInteractiveDuoCenterPro` | function | 11497–11552 | 56 |
| `rSeasonDuoCenterPro` | function | 11553–11555 | 3 |
| `getDifficultConnectionRowsForPlayer` | function | 11556–11600 | 45 |
| `emptyRosterImpactStats` | function | 11601–11603 | 3 |
| `finalizeRosterImpactStats` | function | 11604–11611 | 8 |
| `addRosterImpactGameToStats` | function | 11612–11621 | 10 |
| `getRosterImpactPlayerEventLookup` | function | 11622–11642 | 21 |
| `getRosterImpactPlayerGames` | function | 11643–11683 | 41 |
| `rosterImpactConfidence` | function | 11684–11689 | 6 |
| `rosterImpactConfidenceWeight` | function | 11690–11693 | 4 |
| `antiSynergyImpactScore` | function | 11694–11708 | 15 |
| `buildRosterImpactAnalysis` | function | 11709–11768 | 60 |
| `buildDuoAntiSynergy` | function | 11769–11771 | 3 |
| `rAntiSynergyDelta` | function | 11772–11778 | 7 |
| `antiSynergyDeltaClass` | function | 11779–11782 | 4 |
| `antiSynergySigned` | function | 11783–11787 | 5 |
| `rAntiSynergyCompareChip` | function | 11788–11795 | 8 |
| `rAntiSynergyMetricRow` | function | 11796–11804 | 9 |
| `rRosterImpactStatLine` | function | 11805–11808 | 4 |
| `antiSynergyPartnerIsSgOnly` | function | 11809–11812 | 4 |
| `rAntiSynergyMainDelta` | function | 11813–11822 | 10 |
| `rDifficultConnectionList` | function | 11823–11847 | 25 |
| `rDifficultConnectionListCompactLegacy` | function | 11848–11889 | 42 |
| `rDifficultConnectionListCompact` | function | 11890–11928 | 39 |
| `rDifficultConnectionsCard` | function | 11929–11965 | 37 |
| `responseMomentumTooltipFor` | function | 12010–12016 | 7 |
| `rmTerm` | function | 12017–12020 | 4 |
| `rRmKpi` | function | 12021–12031 | 11 |
| `rRmTopList` | function | 12032–12042 | 11 |
| `rResponseMomentumOverviewCard` | function | 12043–12066 | 24 |
| `rPlayerResponseMomentumCard` | function | 12067–12085 | 19 |
| `rDuoResponseMomentumCard` | function | 12086–12105 | 20 |
| `rTeamResponseMomentumCard` | function | 12106–12112 | 7 |
| `rMatchcenterResponseMomentum` | function | 12113–12150 | 38 |
| `getTeamAllTimeRecords` | function | 12152–12192 | 41 |
| `getAllTimeOpponentIntelligence` | function | 12194–12200 | 7 |
| `getAllTimeOpponentTopScorers` | function | 12202–12226 | 25 |
| `getHallOfFameStats` | function | 12228–12250 | 23 |
| `rOpponentTopScorerTable` | function | 12252–12271 | 20 |
| `getAllTimeIdentityStandings` | function | 12273–12307 | 35 |
| `buildRecencyWeightedGlobalIdentityProfile` | function | 12309–12356 | 48 |
| `getGlobalIdentityProfile` | function | 12358–12384 | 27 |
| `dedupeIdentityProfileTags` | function | 12386–12397 | 12 |
| `rGlobalProfileTags` | function | 12399–12403 | 5 |
| `escHtml` | function | 12405–12407 | 3 |
| `pctValue` | function | 12408–12411 | 4 |
| `rHallOfFameHero` | function | 12412–12437 | 26 |
| `rHallPodiumList` | function | 12438–12460 | 23 |
| `rHallDuoTemple` | function | 12461–12468 | 8 |
| `hallGoalieNum` | function | 12470–12475 | 6 |
| `hallGoalieTime` | function | 12476–12483 | 8 |
| `hallGoalieSeasonLabel` | function | 12484–12484 | 1 |
| `isHallRowPureSG` | function | 12485–12492 | 8 |
| `rHallSGBadge` | function | 12493–12495 | 3 |
| `hallGoaliePkStats` | function | 12496–12507 | 12 |
| `hallGoalieTopteamStats` | function | 12508–12514 | 7 |
| `hallGoalieSeasonScore` | function | 12515–12534 | 20 |
| `hallGoalieRowFromStats` | function | 12535–12567 | 33 |
| `getHallGoalieData` | function | 12568–12583 | 16 |
| `hallGoalieNameHtml` | function | 12584–12586 | 3 |
| `hallGoalieTooltip` | function | 12601–12604 | 4 |
| `hallGoalieExplainForLabel` | function | 12605–12619 | 15 |
| `rHallGoalieRankCard` | function | 12620–12651 | 32 |
| `rHallGoalieAwardCards` | function | 12652–12668 | 17 |
| `rHallGoalieLegends` | function | 12669–12701 | 33 |
| `getGlobalSeasonStatRows` | function | 12702–12717 | 16 |
| `getAlltimeRank` | function | 12718–12723 | 6 |
| `rAlltimeKpis` | function | 12724–12737 | 14 |
| `rSparkline` | function | 12738–12750 | 13 |
| `comparisonItemKey` | function | 12762–12767 | 6 |
| `normalizeComparisonItem` | function | 12768–12772 | 5 |
| `comparisonJsArg` | function | 12773–12775 | 3 |
| `comparisonNum` | function | 12776–12779 | 4 |
| `comparisonPct` | function | 12780–12783 | 4 |
| `comparisonFmt` | function | 12784–12787 | 4 |
| `comparisonPctFmt` | function | 12788–12790 | 3 |
| `getComparisonPlayerRow` | function | 12791–12793 | 3 |
| `getComparisonSeasonLabel` | function | 12794–12796 | 3 |
| `getComparisonTeamGoalsForSeason` | function | 12797–12808 | 12 |
| `getComparisonAlltimeTeamGoals` | function | 12809–12811 | 3 |
| `getComparisonSeasonEvents` | function | 12812–12816 | 5 |
| `getComparisonChemistryFromEvents` | function | 12817–12821 | 5 |
| `getComparisonClutchFromEvents` | function | 12822–12826 | 5 |
| `getComparisonStyleProfile` | function | 12827–12851 | 25 |
| `getComparisonProfile` | function | 12852–12856 | 5 |
| `getComparisonSeasonTrend` | function | 12857–12882 | 26 |
| `getComparisonAlltimeTrend` | function | 12883–12888 | 6 |
| `getComparisonPlayerOptions` | function | 12890–12904 | 15 |
| `comparisonVariantValue` | function | 12905–12907 | 3 |
| `getComparisonVariantsForPlayer` | function | 12908–12932 | 25 |
| `parseComparisonVariant` | function | 12933–12947 | 15 |
| `getComparisonCurrentSelection` | function | 12948–12958 | 11 |
| `filterComparisonPlayers` | window | 12959–12966 | 8 |
| `selectComparisonPlayer` | window | 12967–12972 | 6 |
| `setComparisonRoleMode` | window | 12973–12977 | 5 |
| `setComparisonVariant` | window | 12978–12981 | 4 |
| `toggleComparisonSgOnly` | window | 12982–12982 | 1 |
| `addComparisonItem` | window | 12983–12990 | 8 |
| `addSelectedComparisonItem` | window | 12991–12996 | 6 |
| `toggleComparisonPicker` | window | 12997–12997 | 1 |
| `removeComparisonItem` | window | 12998–13001 | 4 |
| `clearComparison` | window | 13002–13002 | 1 |
| `runComparison` | window | 13003–13009 | 7 |
| `selectComparisonMode` | window | 13010–13010 | 1 |
| `backToComparisonModeSelect` | window | 13011–13011 | 1 |
| `normalizeDuoComparisonItem` | function | 13012–13015 | 4 |
| `comparisonDuoContext` | function | 13016–13019 | 4 |
| `setComparisonDuoMode` | window | 13020–13020 | 1 |
| `setComparisonDuoSeasonKey` | window | 13021–13021 | 1 |
| `setComparisonDuoSearch` | window | 13022–13022 | 1 |
| `filterPlayerSuggestions` | function | 13023–13034 | 12 |
| `rComparisonDuoSuggestionButtons` | function | 13035–13038 | 4 |
| `renderComparisonDuoSuggestions` | function | 13039–13047 | 9 |
| `filterComparisonDuoSuggestions` | window | 13048–13055 | 8 |
| `selectComparisonDuoSuggestion` | window | 13049–13055 | 7 |
| `handleComparisonDuoSearchKey` | window | 13056–13068 | 13 |
| `setComparisonDuoPlayer` | window | 13069–13074 | 6 |
| `addComparisonDuoFromSelection` | window | 13075–13082 | 8 |
| `addComparisonDuo` | window | 13083–13085 | 3 |
| `removeComparisonDuo` | window | 13086–13089 | 4 |
| `clearComparisonDuos` | window | 13090–13090 | 1 |
| `runDuoComparison` | window | 13091–13095 | 5 |
| `buildDuoComparison` | function | 13096–13115 | 20 |
| `rDuoComparisonBars` | function | 13116–13120 | 5 |
| `rDuoCompareSummaryCards` | function | 13121–13151 | 31 |
| `rDuoComparisonProfile` | function | 13152–13173 | 22 |
| `rDuoComparisonChemistry` | function | 13174–13189 | 16 |
| `rDuoComparisonImpact` | function | 13190–13205 | 16 |
| `rDuoComparisonContext` | function | 13206–13223 | 18 |
| `rDuoComparisonDetails` | function | 13224–13227 | 4 |
| `rDuoComparisonDashboard` | function | 13228–13241 | 14 |
| `rComparisonDuoSearchBox` | function | 13242–13251 | 10 |
| `rDuoComparisonPage` | function | 13252–13262 | 11 |
| `rComparisonModeSelect` | function | 13263–13265 | 3 |
| `getComparisonEventsForItem` | function | 13266–13268 | 3 |
| `getComparisonRosterGamesForSeason` | function | 13269–13285 | 17 |
| `getComparisonRosterGames` | function | 13286–13293 | 8 |
| `comparisonEventGameKey` | function | 13294–13296 | 3 |
| `comparisonEventPhaseLabel` | function | 13297–13300 | 4 |
| `comparisonOpponentStrengthTier` | function | 13301–13306 | 6 |
| `buildComparisonExtraMetrics` | function | 13307–13364 | 58 |
| `getGoalieComparisonAlltimeTrend` | function | 13365–13381 | 17 |
| `getGoalieComparisonSeasonTrend` | function | 13382–13400 | 19 |
| `buildGoalieComparisonDataset` | function | 13401–13451 | 51 |
| `buildComparisonDataset` | function | 13452–13487 | 36 |
| `kpiValueText` | function | 13489–13492 | 4 |
| `kpiDelta` | function | 13493–13498 | 6 |
| `kpiItemColor` | function | 13499–13501 | 3 |
| `rKpiCards` | function | 13502–13512 | 11 |
| `rKpiMirrorRows` | function | 13513–13572 | 60 |
| `kpiRadarValue` | function | 13573–13583 | 11 |
| `rKpiRadar` | function | 13584–13618 | 35 |
| `rKpiShareBars` | function | 13619–13626 | 8 |
| `rKpiMetricCard` | function | 13627–13631 | 5 |
| `rKpiTextMetricCard` | function | 13632–13634 | 3 |
| `rKpiExtendedMetrics` | function | 13635–13649 | 15 |
| `kpiNiceMax` | function | 13650–13655 | 6 |
| `kpiTrendRows` | function | 13656–13664 | 9 |
| `rKpiTrendCompare` | function | 13665–13731 | 67 |
| `rKpiOpponentStrength` | function | 13732–13759 | 28 |
| `kpiBadge` | function | 13760–13762 | 3 |
| `rKpiObjectMini` | function | 13763–13769 | 7 |
| `rKpiInfoCards` | function | 13770–13801 | 32 |
| `buildComparisonSummary` | function | 13802–13833 | 32 |
| `rKPIVergleich` | function | 13834–13847 | 14 |
| `rComparisonMiniOverview` | function | 13848–13851 | 4 |
| `rComparisonRoles` | function | 13852–13859 | 8 |
| `rComparisonDashboard` | function | 13860–13870 | 11 |
| `rComparisonStyles` | function | 13871–13908 | 38 |
| `rComparisonCenterPage` | function | 13909–13959 | 51 |
| `rSeasonTrendRows` | function | 13960–13978 | 19 |
| `getAlltimeAggregatedStyleProfile` | function | 13979–13998 | 20 |
| `rGlobalDnaBars` | function | 14000–14029 | 30 |
| `pdashNum` | function | 14030–14033 | 4 |
| `pdashPct` | function | 14034–14037 | 4 |
| `pdashPhaseLabel` | function | 14038–14041 | 4 |
| `pdashTopCount` | function | 14042–14045 | 4 |
| `pdashBestPhase` | function | 14046–14049 | 4 |
| `pdashTopPartner` | function | 14050–14053 | 4 |
| `pdashTopOpponent` | function | 14054–14057 | 4 |
| `pdashOpponentTier` | function | 14058–14063 | 6 |
| `pdashOpponentStrength` | function | 14064–14083 | 20 |
| `pdashInsight` | function | 14084–14086 | 3 |
| `pdashInsights` | function | 14087–14098 | 12 |
| `buildSeasonPlayerDashModel` | function | 14099–14135 | 37 |
| `buildAlltimePlayerDashModel` | function | 14136–14178 | 43 |
| `rPlayerDashStyles` | function | 14179–14190 | 12 |
| `rPdashLabel` | function | 14191–14193 | 3 |
| `rPdashStat` | function | 14194–14196 | 3 |
| `rPlayerDash` | function | 14197–14235 | 39 |
| `rSeasonPlayerDashboard` | function | 14236–14238 | 3 |
| `rAlltimePlayerDashboard` | function | 14239–14241 | 3 |
| `rGlobalPartnerOpponentPanel` | function | 14242–14255 | 14 |
| `rGlobalCareerHeader` | function | 14256–14276 | 21 |
| `rSeasonLandingPage` | function | 14278–14292 | 15 |
| `rGlobalOverview` | function | 14294–14345 | 52 |
| `rGlobalAllTimeStats` | function | 14347–14363 | 17 |
| `rGlobalDevelopment` | function | 14365–14403 | 39 |
| `getGlobalPlayerOpponentGameRows` | function | 14406–14433 | 28 |
| `getGlobalOpponentSpecialistProfile` | function | 14435–14463 | 29 |
| `rGlobalDuoNetwork` | function | 14465–14662 | 198 |
| `rGlobalOpponentSpecialist` | function | 14664–14709 | 46 |
| `playerExplainConfidence` | function | 14711–14716 | 6 |
| `playerExplainConfidenceLabel` | function | 14717–14719 | 3 |
| `playerExplainAdd` | function | 14720–14724 | 5 |
| `playerExplainStyleSignature` | function | 14725–14736 | 12 |
| `playerExplainRolePhrase` | function | 14737–14745 | 9 |
| `playerExplainHeadline` | function | 14746–14755 | 10 |
| `playerExplainContextSentence` | function | 14756–14774 | 19 |
| `buildFieldPlayerExplanation` | function | 14775–14849 | 75 |
| `buildGoaliePlayerExplanation` | function | 14850–14903 | 54 |
| `buildPlayerExplanation` | function | 14904–14912 | 9 |
| `buildPlayerIntelligence` | function | 14913–14942 | 30 |
| `rPlayerExplainItems` | function | 14943–14947 | 5 |
| `rPlayerExplanation` | function | 14948–14999 | 52 |
| `rAllTimePlayersPage` | function | 15001–15041 | 41 |
| `rHallOfFamePage` | function | 15043–15131 | 89 |
| `lexiconUniqueKeys` | function | 15136–15143 | 8 |
| `lexiconEntry` | function | 15144–15153 | 10 |
| `rLexiconRows` | function | 15154–15157 | 4 |
| `rLexiconPage` | function | 15158–15330 | 173 |
| `clampScore` | function | 15334–15337 | 4 |
| `getScoreLabel` | function | 15338–15346 | 9 |
| `buildConfidence` | function | 15347–15392 | 46 |
| `confidenceCautiousText` | function | 15393–15396 | 4 |
| `explainScore` | function | 15397–15411 | 15 |
| `p1NarrativeKey` | function | 15412–15414 | 3 |
| `scoreNarrative` | function | 15415–15433 | 19 |
| `rankNarratives` | function | 15434–15447 | 14 |
| `getEmptyState` | function | 15448–15459 | 12 |
| `rEmptyState` | function | 15460–15463 | 4 |
| `rScoreBreakdown` | function | 15464–15479 | 16 |
| `matchcenterSigned` | function | 15481–15485 | 5 |
| `matchcenterDateLabel` | function | 15487–15491 | 5 |
| `dedupeGamesById` | function | 15503–15511 | 9 |
| `matchcenterIsFreiburgTuebingenTeamName` | function | 15512–15518 | 7 |
| `matchcenterSeasonHasGames` | function | 15522–15524 | 3 |
| `matchcenterDefaultSeasonKey` | function | 15525–15530 | 6 |
| `matchcenterOpponentMode` | function | 15542–15544 | 3 |
| `getMatchcenterOpponents` | function | 15545–15577 | 33 |
| `getMatchcenterDirectOpponents` | function | 15578–15608 | 31 |
| `matchcenterAnalyzeDirect` | function | 15611–15647 | 37 |
| `matchcenterAnalyzeForm` | function | 15648–15673 | 26 |
| `matchcenterGoalMinute` | function | 15682–15687 | 6 |
| `matchcenterEmptyBuckets` | function | 15696–15698 | 3 |
| `matchcenterUlmScoutingConfidence` | function | 15699–15703 | 5 |
| `matchcenterEnsureUlmPlayer` | function | 15704–15741 | 38 |
| `matchcenterRegisterUlmProfileGame` | function | 15742–15747 | 6 |
| `matchcenterUpdateUlmSeasonRow` | function | 15748–15754 | 7 |
| `matchcenterClassifyUlmGoalEvent` | function | 15755–15765 | 11 |
| `matchcenterAddUlmScoring` | function | 15766–15803 | 38 |
| `matchcenterFinalizeUlmPlayers` | function | 15804–15872 | 69 |
| `matchcenterBuildUlmPlayerScouting` | function | 15873–15927 | 55 |
| `matchcenterBuildUlmPlayerInsights` | function | 15928–15940 | 13 |
| `matchcenterDuoPairKey` | function | 15941–15944 | 4 |
| `matchcenterEnsureOpponentDuo` | function | 15945–15977 | 33 |
| `matchcenterDuoDirectionLabel` | function | 15978–15984 | 7 |
| `matchcenterAddDuoConnection` | function | 15985–16003 | 19 |
| `matchcenterFinalizeOpponentDuos` | function | 16004–16038 | 35 |
| `matchcenterBuildOpponentDuos` | function | 16039–16083 | 45 |
| `matchcenterBuildOpponentDuoInsights` | function | 16084–16097 | 14 |
| `matchcenterEnsureUlmDuo` | function | 16098–16135 | 38 |
| `matchcenterAddUlmDuoConnection` | function | 16136–16154 | 19 |
| `matchcenterFinalizeUlmDuos` | function | 16155–16190 | 36 |
| `matchcenterBuildUlmDuos` | function | 16191–16233 | 43 |
| `matchcenterBuildUlmDuoInsights` | function | 16234–16246 | 13 |
| `matchcenterDirectContextGames` | function | 16247–16249 | 3 |
| `matchcenterSpecialTeamsForGame` | function | 16250–16253 | 4 |
| `matchcenterPersonalPenaltyMinutesForSide` | function | 16254–16262 | 9 |
| `matchcenterPct` | function | 16263–16266 | 4 |
| `matchcenterBuildSpecialTeamsMatchup` | function | 16267–16314 | 48 |
| `matchcenterGoalieKey` | function | 16315–16319 | 5 |
| `matchcenterGoalieFitScore` | function | 16320–16336 | 17 |
| `matchcenterBuildGoalieMatchup` | function | 16337–16379 | 43 |
| `matchcenterGoalAbsSeconds` | function | 16380–16387 | 8 |
| `matchcenterTimeValue` | function | 16388–16395 | 8 |
| `matchcenterEmptyTimingStats` | function | 16396–16404 | 9 |
| `matchcenterWindowForSecond` | function | 16405–16411 | 7 |
| `matchcenterTimingStatsForGames` | function | 16412–16448 | 37 |
| `matchcenterBuildTimingInsights` | function | 16449–16459 | 11 |
| `matchcenterBuildTimingAnalysis` | function | 16460–16470 | 11 |
| `rMatchcenterTimeBars` | function | 16471–16484 | 14 |
| `rMatchcenterTimingStatsCard` | function | 16485–16504 | 20 |
| `rMatchcenterTiming` | function | 16505–16528 | 24 |
| `rMatchcenterTabs` | function | 16544–16546 | 3 |
| `rMatchcenterProfileSection` | function | 16547–16566 | 20 |
| `rMatchcenterFormSection` | function | 16567–16592 | 26 |
| `rMatchcenterDetailsSection` | function | 16593–16600 | 8 |
| `matchcenterResultClass` | function | 16601–16603 | 3 |
| `matchcenterUlmTeamLabelForGame` | function | 16605–16609 | 5 |
| `matchcenterGameLine` | function | 16610–16615 | 6 |
| `matchcenterFormLine` | function | 16616–16620 | 5 |
| `matchcenterBuildInsights` | function | 16621–16641 | 21 |
| `rMatchcenterKpi` | function | 16642–16648 | 7 |
| `rMatchcenterFormCard` | function | 16649–16669 | 21 |
| `rMatchcenterGamesList` | function | 16670–16681 | 12 |
| `rMatchcenterWatchCard` | function | 16682–16702 | 21 |
| `rMatchcenterPlayerRow` | function | 16703–16726 | 24 |
| `rMatchcenterRankCard` | function | 16727–16732 | 6 |
| `rMatchcenterUlmImpactCard` | function | 16733–16761 | 29 |
| `rMatchcenterUlmPlayerRow` | function | 16762–16785 | 24 |
| `rMatchcenterUlmRankCard` | function | 16786–16791 | 6 |
| `rMatchcenterUlmScouting` | function | 16792–16828 | 37 |
| `rMatchcenterOpponentScouting` | function | 16829–16864 | 36 |
| `rMatchcenterPlayersTab` | function | 16865–16867 | 3 |
| `rMatchcenterDuoWatchCard` | function | 16868–16887 | 20 |
| `rMatchcenterDuoRow` | function | 16888–16911 | 24 |
| `rMatchcenterDuoRankCard` | function | 16912–16917 | 6 |
| `rMatchcenterUlmDuoWatchCard` | function | 16918–16943 | 26 |
| `rMatchcenterUlmDuoRow` | function | 16944–16966 | 23 |
| `rMatchcenterUlmDuoRankCard` | function | 16967–16972 | 6 |
| `rMatchcenterUlmDuos` | function | 16973–17015 | 43 |
| `rMatchcenterOpponentDuos` | function | 17016–17058 | 43 |
| `rMatchcenterDuosTab` | function | 17059–17061 | 3 |
| `rMatchcenterSpecialCard` | function | 17062–17070 | 9 |
| `rMatchcenterSpecialTeams` | function | 17071–17120 | 50 |
| `rMatchcenterGoalieCard` | function | 17121–17144 | 24 |
| `rMatchcenterGoalieMatchup` | function | 17145–17173 | 29 |
| `matchcenterPlanScoreText` | function | 17174–17177 | 4 |
| `matchcenterPlanRateText` | function | 17178–17182 | 5 |
| `matchcenterPriorityLabel` | function | 17183–17185 | 3 |
| `matchcenterConfidenceClass` | function | 17186–17191 | 6 |
| `matchcenterInferPriority` | function | 17192–17198 | 7 |
| `matchcenterAddPlanItem` | function | 17199–17204 | 6 |
| `matchcenterAddPlanWatch` | function | 17205–17210 | 6 |
| `matchcenterBuildPlanConfidence` | function | 17211–17245 | 35 |
| `matchcenterIntelCurve` | function | 17246–17251 | 6 |
| `matchcenterIntelInverseCurve` | function | 17252–17255 | 4 |
| `matchcenterIntelWeighted` | function | 17256–17266 | 11 |
| `matchcenterIntelRate` | function | 17267–17270 | 4 |
| `matchcenterIntelPct` | function | 17271–17274 | 4 |
| `matchcenterIntelPriorityFromScore` | function | 17275–17280 | 6 |
| `matchcenterIntelPriorityClass` | function | 17281–17286 | 6 |
| `matchcenterIntelPriorityLabel` | function | 17287–17290 | 4 |
| `matchcenterIntelDataLabel` | function | 17291–17293 | 3 |
| `matchcenterBuildIntelligenceDataQuality` | function | 17294–17344 | 51 |
| `matchcenterBuildOpponentDNA` | function | 17345–17457 | 113 |
| `matchcenterDeriveOpponentType` | function | 17458–17475 | 18 |
| `matchcenterIntelPlayerRef` | function | 17476–17488 | 13 |
| `matchcenterIntelDuoRef` | function | 17489–17502 | 14 |
| `matchcenterIntelAddAlarm` | function | 17503–17523 | 21 |
| `matchcenterBuildOpponentAlarm` | function | 17524–17633 | 110 |
| `matchcenterBuildIntelListFromPlan` | function | 17634–17642 | 9 |
| `matchcenterBuildCoachHints` | function | 17643–17658 | 16 |
| `matchcenterBuildIntelHeadline` | function | 17659–17666 | 8 |
| `matchcenterBuildOneThingToWatch` | function | 17667–17679 | 13 |
| `matchcenterBuildIntelligenceSignals` | function | 17680–17726 | 47 |
| `buildMatchIntelligenceFromContext` | function | 17727–17781 | 55 |
| `buildMatchIntelligence` | function | 17782–17803 | 22 |
| `matchcenterCoachCautious` | function | 17804–17806 | 3 |
| `matchcenterCoachAdd` | function | 17807–17815 | 9 |
| `matchcenterCoachGameModel` | function | 17816–17829 | 14 |
| `buildMatchStories` | function | 17830–17859 | 30 |
| `matchcenterCoachPriorityFromAlarm` | function | 17860–17869 | 10 |
| `matchcenterBuildCoachPriorities` | function | 17870–17876 | 7 |
| `matchcenterBuildCoachLevers` | function | 17877–17886 | 10 |
| `matchcenterBuildCoachDangerPatterns` | function | 17887–17894 | 8 |
| `matchcenterBuildCoachIfThen` | function | 17895–17904 | 10 |
| `matchcenterBuildCoachAvoidList` | function | 17905–17914 | 10 |
| `matchcenterBuildCoachActivationHints` | function | 17915–17921 | 7 |
| `matchcenterBuildCoachKeyActors` | function | 17922–17929 | 8 |
| `buildDigitalCoachReport` | function | 17930–17962 | 33 |
| `buildLockerRoomSheet` | function | 17963–17983 | 21 |
| `matchcenterSocialAdd` | function | 17984–17990 | 7 |
| `matchcenterSocialCaption` | function | 17991–17996 | 6 |
| `socialSentence` | function | 17997–17999 | 3 |
| `socialEnsurePeriod` | function | 18000–18003 | 4 |
| `socialFirstUseful` | function | 18004–18006 | 3 |
| `socialPlayerFocusLine` | function | 18007–18013 | 7 |
| `socialDuoFocusLine` | function | 18014–18019 | 6 |
| `socialOpponentLine` | function | 18020–18023 | 4 |
| `socialKeyFactLine` | function | 18024–18033 | 10 |
| `buildMatchdayCaptionBlocks` | function | 18034–18063 | 30 |
| `buildSocialMediaContent` | function | 18064–18112 | 49 |
| `isSyntheticLineupPlayerId` | function | 18118–18120 | 3 |
| `getSyntheticLineupPlayers` | function | 18121–18123 | 3 |
| `getSyntheticLineupRow` | function | 18124–18140 | 17 |
| `getSyntheticLineupRows` | function | 18141–18143 | 3 |
| `getLineupAllRows` | function | 18144–18146 | 3 |
| `lineupRowMeta` | function | 18147–18154 | 8 |
| `getLineupPlayerPool` | function | 18155–18163 | 9 |
| `lineupScore` | function | 18164–18169 | 6 |
| `lineupAverage` | function | 18170–18173 | 4 |
| `lineupLevelLabel` | function | 18174–18177 | 4 |
| `lineupRosterGamesForPlayer` | function | 18180–18227 | 48 |
| `buildLineupExperienceProfile` | function | 18228–18270 | 43 |
| `lineupOpponentDNAForContext` | function | 18271–18282 | 12 |
| `buildLineupOpponentDNAFit` | function | 18283–18326 | 44 |
| `classifyLineIdentity` | function | 18327–18374 | 48 |
| `lineupPlayerProfile` | function | 18375–18450 | 76 |
| `buildLineupAnalysis` | function | 18451–18584 | 134 |
| `buildLineupScoreBreakdowns` | function | 18585–18614 | 30 |
| `buildLineupIntelligence` | function | 18615–18625 | 11 |
| `buildLineAnalysis` | function | 18626–18628 | 3 |
| `lineupRowMap` | function | 18629–18631 | 3 |
| `lineupRankCandidateIds` | function | 18632–18646 | 15 |
| `lineupCombinationIds` | function | 18647–18660 | 14 |
| `lineupStdDev` | function | 18661–18666 | 6 |
| `lineupRoleDnaComplementScore` | function | 18667–18690 | 24 |
| `lineupDirectChemistryScore` | function | 18691–18697 | 7 |
| `lineupEvaluateComplementCandidate` | function | 18698–18775 | 78 |
| `lineupPlayerAnchorScore` | function | 18776–18793 | 18 |
| `buildTeamLineBalance` | function | 18794–18837 | 44 |
| `buildBalancedLineupSet` | function | 18838–18862 | 25 |
| `lineupRecommendationReason` | function | 18863–18871 | 9 |
| `buildLineupRecommendations` | function | 18872–18950 | 79 |
| `recommendLineComplements` | function | 18951–18978 | 28 |
| `matchcenterBuildMatchPlan` | function | 18979–19124 | 146 |
| `rMatchcenterPlanItems` | function | 19125–19142 | 18 |
| `rMatchcenterPlanWatch` | function | 19143–19158 | 16 |
| `rMatchcenterOpponentDNA` | function | 19159–19191 | 33 |
| `rMatchcenterOpponentAlarm` | function | 19192–19213 | 22 |
| `rMatchcenterIntelOverview` | function | 19214–19259 | 46 |
| `rMatchcenterIntelCoachHints` | function | 19260–19273 | 14 |
| `rMatchcenterCoachCardList` | function | 19274–19287 | 14 |
| `rMatchcenterCoachIfThen` | function | 19288–19295 | 8 |
| `rMatchcenterCoachSimpleList` | function | 19296–19300 | 5 |
| `rMatchcenterDigitalCoach` | function | 19301–19365 | 65 |
| `rMatchcenterCopyButton` | function | 19366–19370 | 5 |
| `rMatchcenterLockerList` | function | 19371–19382 | 12 |
| `rMatchcenterLockerRoomSheet` | function | 19383–19438 | 56 |
| `rMatchcenterSocialBlock` | function | 19439–19446 | 8 |
| `matchcenterStoryDownloadFileName` | function | 19447–19456 | 10 |
| `downloadMatchdayStory` | window | 19457–19504 | 48 |
| `rSocialVideoBlock` | function | 19508–19539 | 32 |
| `socialVideoJobsForMatchday` | function | 19542–19548 | 7 |
| `generateSocialVideoVideos` | window | 19549–19590 | 42 |
| `cancelSocialVideoRecording` | window | 19591–19593 | 3 |
| `generateSocialVideoStandbilder` | window | 19594–19617 | 24 |
| `generateSocialVideoContactSheets` | window | 19618–19635 | 18 |
| `rMatchcenterSocialMediaCenter` | function | 19636–19689 | 54 |
| `rLineupScoreRows` | function | 19690–19711 | 22 |
| `rLineupSimpleCards` | function | 19712–19720 | 9 |
| `rMatchcenterLineupBuilder` | function | 19721–19793 | 73 |
| `rLineupMetricPills` | function | 19794–19807 | 14 |
| `rLineupBuilderAvailablePanel` | function | 19808–19855 | 48 |
| `rLineupRecommendationCards` | function | 19856–19870 | 15 |
| `rLineupRecommendationMode` | function | 19871–19904 | 34 |
| `rLineupComplementCards` | function | 19905–19917 | 13 |
| `rLineupTestLine` | function | 19918–19966 | 49 |
| `rLineupTestMode` | function | 19967–19983 | 17 |
| `rLineupBuilderPage` | function | 19984–20017 | 34 |
| `rMatchcenterScoutingSummary` | function | 20018–20061 | 44 |
| `rMatchcenterMatchPlan` | function | 20062–20082 | 21 |
| `matchcenterStoryLogoBase` | function | 20085–20090 | 6 |
| `matchcenterStorySafeLogoUrl` | function | 20091–20097 | 7 |
| `getTeamLogoUrlForStory` | function | 20106–20135 | 30 |
| `matchcenterStoryLogoForOpponent` | function | 20136–20150 | 15 |
| `matchcenterStoryTableRank` | function | 20151–20161 | 11 |
| `matchcenterStoryUlmTableRank` | function | 20162–20168 | 7 |
| `matchcenterStoryRankText` | function | 20169–20172 | 4 |
| `matchcenterStoryInlineStat` | function | 20173–20175 | 3 |
| `matchcenterStoryRankRows` | function | 20177–20188 | 12 |
| `matchcenterStoryAddFact` | function | 20191–20197 | 7 |
| `matchcenterStoryFactKey` | function | 20198–20200 | 3 |
| `matchcenterStoryLooksArtificial` | function | 20201–20203 | 3 |
| `matchcenterStoryEstimateFactWeight` | function | 20204–20209 | 6 |
| `matchcenterStoryAddCandidate` | function | 20210–20232 | 23 |
| `matchcenterStoryCategoryLimit` | function | 20233–20236 | 4 |
| `matchcenterStoryNormalizePickOptions` | function | 20237–20247 | 11 |
| `matchcenterStoryCandidateForBudget` | function | 20248–20257 | 10 |
| `matchcenterStoryPickFactItems` | function | 20258–20310 | 53 |
| `matchcenterStoryPickFacts` | function | 20311–20313 | 3 |
| `matchcenterStoryCurrentStreak` | function | 20315–20323 | 9 |
| `matchcenterStoryWinlessStreak` | function | 20324–20332 | 9 |
| `matchcenterStoryFormFact` | function | 20333–20343 | 11 |
| `matchcenterStoryFormFactCandidates` | function | 20344–20363 | 20 |
| `matchcenterStoryLateGoalsForOutcome` | function | 20364–20367 | 4 |
| `matchcenterStoryClutchFact` | function | 20368–20382 | 15 |
| `matchcenterStoryPlayerClutchTotal` | function | 20383–20390 | 8 |
| `matchcenterStoryBestClutchPlayer` | function | 20391–20400 | 10 |
| `matchcenterStoryPlayerClutchFact` | function | 20401–20426 | 26 |
| `matchcenterStoryDuoClutchTotal` | function | 20427–20434 | 8 |
| `matchcenterStoryBestClutchDuo` | function | 20435–20444 | 10 |
| `matchcenterStoryDuoClutchFact` | function | 20445–20447 | 3 |
| `matchcenterStoryDuoFact` | function | 20448–20468 | 21 |
| `matchcenterStoryClutchPriority` | function | 20469–20471 | 3 |
| `matchcenterStoryCompetitionLabel` | function | 20472–20475 | 4 |
| `matchcenterStoryShortDuel` | function | 20476–20480 | 5 |
| `matchcenterStoryLastDuelLabel` | function | 20481–20484 | 4 |
| `matchcenterStoryDirectFactCandidates` | function | 20485–20506 | 22 |
| `matchcenterStoryPlanFactCandidates` | function | 20507–20519 | 13 |
| `matchcenterStoryCategoryForPlanFact` | function | 20520–20528 | 9 |
| `buildMatchcenterStoryPreviewData` | function | 20529–20640 | 112 |
| `matchcenterStoryNameClass` | function | 20641–20646 | 6 |
| `matchcenterStoryVisibleFacts` | function | 20647–20677 | 31 |
| `rMatchcenterStoryLogo` | function | 20678–20682 | 5 |
| `rMatchcenterStoryForm` | function | 20683–20687 | 5 |
| `rMatchcenterStoryPlayerCard` | function | 20688–20695 | 8 |
| `rMatchcenterStoryPreview` | function | 20696–20765 | 70 |
| `rMatchcenterStoryFrame` | function | 20766–20771 | 6 |
| `fitMatchcenterStoryLayout` | function | 20772–20814 | 43 |
| `ensureSocialVideoExportCapabilityChecked` | function | 20823–20827 | 5 |
| `downloadSocialVideoStandbild` | window | 20842–20861 | 20 |
| `downloadSocialVideoContactSheet` | window | 20866–20891 | 26 |
| `rMatchcenterPage` | function | 20893–21040 | 148 |
| `rTeamPage` | function | 21041–21351 | 311 |
| `exportExcel` | function | 21356–21377 | 22 |
| `render` | function | 21383–21400 | 18 |
| `_render` | function | 21401–21565 | 165 |
| `uiFormatNumber` | function | 21599–21603 | 5 |
| `uiReliabilityDots` | function | 21612–21619 | 8 |
| `uiDeltaIndicator` | function | 21627–21633 | 7 |
| `uiInfoIcon` | function | 21645–21649 | 5 |
| `uiKennzahlKachel` | function | 21657–21668 | 12 |
| `uiKernaussage` | function | 21677–21683 | 7 |
| `uiHinweisKarte` | function | 21691–21703 | 13 |
| `uiRangliste` | function | 21713–21730 | 18 |
| `uiVerlauf` | function | 21741–21760 | 20 |
| `uiIntervallBalken` | function | 21767–21779 | 13 |
| `uiMethodenbox` | function | 21786–21795 | 10 |
| `uiNotiz` | function | 21803–21807 | 5 |
| `uiPlatzhalter` | function | 21815–21820 | 6 |
| `uiObjektseiteSortTabs` | function | 21865–21873 | 9 |
| `uiObjektseite` | function | 21883–21916 | 34 |
| `mainNavActiveKeyForPage` | function | 21973–21978 | 6 |
| `goToMainNavPoint` | window | 21979–21985 | 7 |
| `rMainNav` | function | 21986–21990 | 5 |
| `rMainNavBottom` | function | 22008–22015 | 8 |
| `openOverview` | window | 22025–22033 | 9 |
| `switchOverviewSeason` | window | 22042–22048 | 7 |
| `openMatchdayTimeline` | window | 22076–22083 | 8 |
| `openMatchday` | window | 22084–22093 | 10 |
| `switchMatchdaySeason` | window | 22095–22100 | 6 |
| `matchdayUlmGames` | function | 22102–22104 | 3 |
| `matchdayGameCardHtml` | function | 22105–22115 | 11 |
| `rMatchdayTimelineRow` | function | 22117–22124 | 8 |
| `rMatchdayTimelinePage` | function | 22125–22135 | 11 |
| `rMatchdayDetailPage` | function | 22136–22171 | 36 |
| `rMatchdayPage` | function | 22172–22178 | 7 |
| `overviewMatchdayStartMs` | function | 22197–22202 | 6 |
| `overviewMatchdayEndMs` | function | 22203–22208 | 6 |
| `detectOverviewPhase` | function | 22209–22234 | 26 |
| `getSeasonDataState` | function | 22241–22251 | 11 |
| `parseSeasonDataState` | function | 22252–22260 | 9 |
| `isNewSeasonDataState` | function | 22262–22264 | 3 |
| `recordOverviewVisit` | function | 22271–22280 | 10 |
| `overviewOpponentLabel` | function | 22281–22285 | 5 |
| `overviewLastMatchdayText` | function | 22286–22289 | 4 |
| `overviewNextMatchdayHtml` | function | 22290–22294 | 5 |
| `overviewCompactTableHtml` | function | 22302–22308 | 7 |
| `overviewFormHtml` | function | 22310–22324 | 15 |
| `overviewSeasonBilanzHtml` | function | 22325–22331 | 7 |
| `overviewSeasonAwardHtml` | function | 22333–22342 | 10 |
| `overviewRecordHtml` | function | 22344–22349 | 6 |
| `overviewCrossSeasonTrendHtml` | function | 22351–22359 | 9 |
| `overviewOpponentPreviewHtml` | function | 22360–22364 | 5 |
| `overviewMatchcenterLinkHtml` | function | 22365–22367 | 3 |
| `overviewLineupLinkHtml` | function | 22368–22370 | 3 |
| `overviewRankChangeTile` | function | 22387–22404 | 18 |
| `buildOverviewCards` | function | 22413–22453 | 41 |
| `rOverviewPage` | function | 22463–22474 | 12 |
| `openLigaGegner` | window | 22475–22478 | 4 |
| `rLigaGegnerPlaceholderPage` | function | 22479–22484 | 6 |
| `rAsOfSelector` | function | 22496–22508 | 13 |
| `setContextAsOf` | window | 22509–22520 | 12 |
| `rSeasonDataPreviewContextHint` | function | 22531–22539 | 9 |
| `rSeasonDataStateContextHint` | function | 22548–22554 | 7 |
| `rContextBar` | function | 22579–22597 | 19 |
| `rIaShell` | function | 22599–22601 | 3 |
| `globalSearchTokens` | function | 22618–22621 | 4 |
| `globalSearchEntries` | function | 22623–22636 | 14 |
| `globalSearchPlayerScore` | function | 22637–22644 | 8 |
| `globalSearchMatchdayScore` | function | 22646–22658 | 13 |
| `globalSearchMatch` | function | 22660–22671 | 12 |
| `globalSearchIsEditableTarget` | function | 22672–22676 | 5 |
| `globalSearchKeyAction` | function | 22678–22692 | 15 |
| `rGlobalSearchToggle` | function | 22693–22695 | 3 |
| `rGlobalSearchResultsHtml` | function | 22696–22706 | 11 |
| `rGlobalSearchPanelHtml` | function | 22707–22709 | 3 |
| `paintGlobalSearchResults` | function | 22710–22717 | 8 |
| `openGlobalSearch` | window | 22718–22742 | 25 |
| `closeGlobalSearch` | window | 22743–22750 | 8 |
| `onGlobalSearchInput` | window | 22751–22756 | 6 |
| `moveGlobalSearch` | function | 22757–22762 | 6 |
| `activateGlobalSearchResult` | window | 22763–22772 | 10 |
| `globalSearchOnKeydown` | function | 22773–22794 | 22 |
| `initGlobalSearch` | function | 22795–22799 | 5 |
| `rToolMenu` | function | 22821–22824 | 4 |
| `toolMenuElements` | function | 22825–22827 | 3 |
| `toolMenuItemElements` | function | 22828–22830 | 3 |
| `isToolMenuOpen` | function | 22831–22834 | 4 |
| `openToolMenu` | window | 22835–22842 | 8 |
| `closeToolMenu` | window | 22843–22849 | 7 |
| `toggleToolMenu` | window | 22850–22853 | 4 |
| `activateToolMenuItem` | window | 22854–22861 | 8 |
| `toolMenuOnKeydown` | function | 22862–22885 | 24 |
| `toolMenuOnClick` | function | 22886–22892 | 7 |
| `initToolMenu` | function | 22893–22896 | 4 |

## Alphabetisches Register

| Name | Art | Zeile |
|---|---|---|
| `_render` | function | 21401 |
| `acceptEinsatzCenterRosterSuggestion` | window | 7574 |
| `activateGlobalSearchResult` | window | 22763 |
| `activateToolMenuItem` | window | 22854 |
| `addComparisonDuo` | window | 13083 |
| `addComparisonDuoFromSelection` | window | 13075 |
| `addComparisonItem` | window | 12983 |
| `addDuoTeamGame` | function | 11095 |
| `addEinsatzCenterExistingGroup` | window | 7591 |
| `addEinsatzCenterGroupPlayer` | window | 7659 |
| `addEinsatzCenterNewGroup` | window | 7600 |
| `addEinsatzCenterRosterPlayer` | window | 7540 |
| `addGoalieGameToStats` | function | 4456 |
| `addGoalieSpecialTeamsGameToStats` | function | 4426 |
| `addLineupBuilderPlayerToActiveLine` | window | 2327 |
| `addLineupBuilderPlayerToLine` | window | 2317 |
| `addLineupPlayer` | window | 2263 |
| `addRosterImpactGameToStats` | function | 11612 |
| `addSelectedComparisonItem` | window | 12991 |
| `addSyntheticLineupPlayer` | window | 2343 |
| `addUnique` | function | 3643 |
| `aggregateAllTimeDuos` | function | 4799 |
| `aggregateAllTimePlayers` | function | 3910 |
| `aggregateAlltimeSpecialTeams` | function | 4406 |
| `aggregateGoalieAlltimeStats` | function | 4639 |
| `aggregateSeasonStats` | function | 4811 |
| `analysisCacheContext` | function | 2169 |
| `analysisCacheKey` | function | 2203 |
| `annotateSpecialTeamsGoalEvent` | function | 4188 |
| `antiSynergyDeltaClass` | function | 11779 |
| `antiSynergyImpactScore` | function | 11694 |
| `antiSynergyPartnerIsSgOnly` | function | 11809 |
| `antiSynergySigned` | function | 11783 |
| `appendSeasonGameDiagnostics` | function | 2539 |
| `applyAppHash` | function | 3449 |
| `applyCurrentSeasonCoverHighlight` | function | 6044 |
| `applyGlobalPageFromHash` | function | 3416 |
| `applySeasonContext` | function | 2404 |
| `applySeasonScoringToRegistry` | function | 3801 |
| `asOfCacheKeyPart` | function | 2197 |
| `asOfEquals` | function | 3120 |
| `assignStatus` | function | 5649 |
| `avgOrNull` | function | 3948 |
| `backToComparisonModeSelect` | window | 13011 |
| `backToHome` | window | 2380 |
| `buildAlltimePlayerDashModel` | function | 14136 |
| `buildAnnotatedGoalEventsForGame` | function | 10701 |
| `buildAppHash` | function | 3266 |
| `buildBalancedLineupSet` | function | 18838 |
| `buildBestThirdManOptions` | function | 10589 |
| `buildComparisonDataset` | function | 13452 |
| `buildComparisonExtraMetrics` | function | 13307 |
| `buildComparisonSummary` | function | 13802 |
| `buildConfidence` | function | 15347 |
| `buildDigitalCoachReport` | function | 17930 |
| `buildDirectDuoLookupForPlayer` | function | 10547 |
| `buildDryRunReport` | function | 6268 |
| `buildDuoAntiSynergy` | function | 11769 |
| `buildDuoComparison` | function | 13096 |
| `buildDuoCompatibility` | function | 11207 |
| `buildDuoDirectProduction` | function | 11071 |
| `buildDuoFloorCeiling` | function | 10982 |
| `buildDuoGapAnalysis` | function | 11190 |
| `buildDuoNetworkContext` | function | 11166 |
| `buildDuoOpponentAdjusted` | function | 11153 |
| `buildDuoProAnalysis` | function | 11264 |
| `buildDuoReplacementOptions` | function | 11254 |
| `buildDuoUntestedPotential` | function | 11230 |
| `buildDuoUsageRate` | function | 11242 |
| `buildDuoWarnings` | function | 11024 |
| `buildDuoWithWithoutImpact` | function | 11119 |
| `buildEinsatzCenterDraftExport` | function | 7720 |
| `buildFieldPlayerExplanation` | function | 14775 |
| `buildGlobalPageHash` | function | 3283 |
| `buildGoalieAnalysisModel` | function | 9512 |
| `buildGoalieComparisonDataset` | function | 13401 |
| `buildGoalieGameRecord` | function | 4508 |
| `buildGoaliePlayerExplanation` | function | 14850 |
| `buildGoalieRoleProfile` | function | 9735 |
| `buildGoalieStatsForSeason` | function | 4558 |
| `buildHallOfFameIntroTitle` | function | 8419 |
| `buildHashStringFromParsed` | function | 3298 |
| `buildIdentityProfiles` | function | 5371 |
| `buildLineAnalysis` | function | 18626 |
| `buildLineupAnalysis` | function | 18451 |
| `buildLineupExperienceProfile` | function | 18228 |
| `buildLineupIntelligence` | function | 18615 |
| `buildLineupOpponentDNAFit` | function | 18283 |
| `buildLineupRecommendations` | function | 18872 |
| `buildLineupScoreBreakdowns` | function | 18585 |
| `buildLockerRoomSheet` | function | 17963 |
| `buildMatchcenterStoryPreviewData` | function | 20529 |
| `buildMatchdayCaptionBlocks` | function | 18034 |
| `buildMatchIntelligence` | function | 17782 |
| `buildMatchIntelligenceFromContext` | function | 17727 |
| `buildMatchStories` | function | 17830 |
| `buildMomentumSwingStats` | function | 10976 |
| `buildMomentumSwingStatsRaw` | function | 10905 |
| `buildOpponentIntelligence` | function | 10386 |
| `buildOverviewCards` | function | 22413 |
| `buildPlayerDataFoundation` | function | 4828 |
| `buildPlayerEvents` | function | 4882 |
| `buildPlayerExplanation` | function | 14904 |
| `buildPlayerIdentity` | function | 3654 |
| `buildPlayerIntelligence` | function | 14913 |
| `buildRecencyWeightedGlobalIdentityProfile` | function | 12309 |
| `buildRegistry` | function | 4851 |
| `buildResponseGoalStats` | function | 10893 |
| `buildResponseGoalStatsRaw` | function | 10844 |
| `buildRosterImpactAnalysis` | function | 11709 |
| `buildSeasonDataPreviewChanges` | function | 6373 |
| `buildSeasonDuos` | function | 4755 |
| `buildSeasonPlayerDashModel` | function | 14099 |
| `buildSocialMediaContent` | function | 18064 |
| `buildSoloDuoProfile` | function | 5140 |
| `buildSpecialTeamsForGame` | function | 4203 |
| `buildSpecialTeamsForSeason` | function | 4397 |
| `buildStaticSeasonDataBlock` | function | 6092 |
| `buildTeamLineBalance` | function | 18794 |
| `cachedAnalysis` | function | 2207 |
| `cancelDuoProPicker` | window | 11462 |
| `cancelEinsatzCenterEdit` | window | 7521 |
| `cancelHallOfFameIntro` | function | 8508 |
| `cancelSocialVideoRecording` | window | 19591 |
| `clampScore` | function | 15334 |
| `classicTagLabel` | function | 8662 |
| `classifyLineIdentity` | function | 18327 |
| `cleanupHallOfFameIntro` | function | 8448 |
| `clearAnalysisCache` | function | 2166 |
| `clearComparison` | window | 13002 |
| `clearComparisonDuos` | window | 13090 |
| `clearLineupAvailable` | window | 2316 |
| `clearLineupBuilderLine` | window | 2335 |
| `clearLineupPlayers` | window | 2270 |
| `clearlyAboveAverage` | function | 5328 |
| `clonePlain` | function | 4045 |
| `closeGlobalSearch` | window | 22743 |
| `closeMatchcenterStoryPreview` | window | 2235 |
| `closeToolMenu` | window | 22843 |
| `clutchText` | function | 5212 |
| `collectAssistEventRefs` | function | 2843 |
| `comparisonDuoContext` | function | 13016 |
| `comparisonEventGameKey` | function | 13294 |
| `comparisonEventPhaseLabel` | function | 13297 |
| `comparisonFmt` | function | 12784 |
| `comparisonItemKey` | function | 12762 |
| `comparisonJsArg` | function | 12773 |
| `comparisonNum` | function | 12776 |
| `comparisonOpponentStrengthTier` | function | 13301 |
| `comparisonPct` | function | 12780 |
| `comparisonPctFmt` | function | 12788 |
| `comparisonVariantValue` | function | 12905 |
| `composeIdentityText` | function | 5603 |
| `computeCurrentAppHash` | function | 3318 |
| `computeEinsatzCenterStats` | function | 6734 |
| `computeMetrics` | function | 4986 |
| `computeRosterStatus` | function | 5629 |
| `confidenceCautiousText` | function | 15393 |
| `confirmDuoProSelection` | window | 11467 |
| `confirmEinsatzCenterCombo` | window | 7692 |
| `copyMatchcenterText` | window | 2237 |
| `countBy` | function | 10133 |
| `countCaptainAppearances` | function | 5611 |
| `countGoalieAppearances` | function | 5625 |
| `countMomentumClusters` | function | 5245 |
| `countPlayedUlmGames` | function | 2763 |
| `createPlayerAnalysisProfile` | function | 3580 |
| `createSeasonBucket` | function | 1791 |
| `decodeHashSegmentSafe` | function | 3191 |
| `dedupeGamesById` | function | 15503 |
| `dedupeIdentityProfileTags` | function | 12386 |
| `deriveAsOfForSeason` | function | 2996 |
| `deriveLineupUlmPlayerIds` | function | 7231 |
| `deriveLineupValidPlayerIds` | function | 7207 |
| `derivePlayerStatus` | function | 3683 |
| `detectOverviewPhase` | function | 22209 |
| `detectSide` | const-arrow | 2495 |
| `detectTypes` | function | 5120 |
| `detectUlmSide` | function | 2488 |
| `diagnoseGameDuplicates` | function | 2517 |
| `diagnosticError` | function | 5864 |
| `diffGameIds` | function | 6215 |
| `difficultConnectionConfidence` | function | 10523 |
| `discardEinsatzCenterAutosave` | function | 7130 |
| `discardSeasonDataPreview` | function | 6472 |
| `dismissEinsatzCenterRosterSuggestion` | window | 7563 |
| `downloadMatchdayStory` | window | 19457 |
| `downloadSocialVideoContactSheet` | window | 20866 |
| `downloadSocialVideoStandbild` | window | 20842 |
| `duoProContextSeasonKey` | function | 11046 |
| `duoProDomId` | function | 11423 |
| `duoProPairKey` | function | 11043 |
| `duoProPickerMessage` | function | 11429 |
| `duoProPickerOpen` | function | 11426 |
| `duoProPlayer` | function | 11060 |
| `duoProResolveCandidate` | function | 11442 |
| `duoProSelectionPayload` | function | 11451 |
| `duoScopeSeasonKeys` | function | 10565 |
| `einsatzCenterAutosaveDraft` | function | 7046 |
| `einsatzCenterAutosaveInfoText` | function | 7152 |
| `einsatzCenterAutosaveKey` | function | 6957 |
| `einsatzCenterCanonicalJson` | function | 7290 |
| `einsatzCenterComputeBaseHash` | function | 7305 |
| `einsatzCenterCurrentRawBaseHash` | function | 7032 |
| `einsatzCenterDeserializeAutosave` | function | 6992 |
| `einsatzCenterDraftInView` | function | 6861 |
| `einsatzCenterDraftIsEmpty` | function | 6969 |
| `einsatzCenterDraftStaleHint` | function | 6875 |
| `einsatzCenterInspectAutosave` | function | 7081 |
| `einsatzCenterIsPlainObject` | function | 6986 |
| `einsatzCenterSerializeDraft` | function | 6973 |
| `einsatzCenterSha256Hex` | function | 7300 |
| `einsatzCenterSoftIssues` | function | 7314 |
| `einsatzCenterStorageRead` | function | 6958 |
| `einsatzCenterStorageRemove` | function | 6964 |
| `einsatzCenterStorageWrite` | function | 6961 |
| `emptyDuoTeamImpactStats` | function | 11092 |
| `emptyFieldRoleSeasonStats` | function | 3639 |
| `emptyGoalieAlltimeStats` | function | 3612 |
| `emptyGoalieSeasonStats` | function | 3590 |
| `emptyGoalieSpecialTeamsStats` | function | 3627 |
| `emptyPlayerSeasonStats` | function | 3584 |
| `emptyRosterImpactStats` | function | 11601 |
| `emptySpecialTeamsStats` | function | 4004 |
| `ensureAppLoaded` | function | 8362 |
| `ensureEinsatzCenterDraft` | function | 6897 |
| `ensureExternalSeasonData` | function | 6070 |
| `ensureFieldRoleSeasonStats` | function | 3749 |
| `ensureGlobalDataLoaded` | function | 8290 |
| `ensureGoalieSeasonStats` | function | 3744 |
| `ensureHallOfFameIntroOverlay` | function | 8386 |
| `ensureLineupDataLoaded` | function | 6580 |
| `ensureLineupGroupsRegistryLoaded` | function | 6605 |
| `ensureRmDuo` | function | 10824 |
| `ensureRmPlayer` | function | 10818 |
| `ensureSocialVideoExportCapabilityChecked` | function | 20823 |
| `escAttr` | function | 8635 |
| `escHtml` | function | 12405 |
| `eventMatchesTeams` | function | 5206 |
| `explainScore` | function | 15397 |
| `exportEinsatzCenterDraft` | window | 7734 |
| `exportExcel` | function | 21356 |
| `fallbackIdentityProfile` | function | 8670 |
| `fetchJson` | function | 5908 |
| `fetchJsonLegacy` | function | 5840 |
| `fetchJsonWithDiagnostics` | function | 5899 |
| `fetchSeasonGameRaw` | function | 5934 |
| `fetchTextWithDiagnostics` | function | 5869 |
| `fileNameForLineupSeasonKey` | function | 6562 |
| `filterComparisonDuoSuggestions` | window | 13048 |
| `filterComparisonPlayers` | window | 12959 |
| `filterLineupBuilderAvailable` | window | 2364 |
| `filterLineupPlayers` | window | 2271 |
| `filterPlayerSuggestions` | function | 13023 |
| `filterPureSGPlayers` | function | 9308 |
| `finalizeDuoTeamImpactStats` | function | 11111 |
| `finalizeGoalieSeasonStats` | function | 4441 |
| `finalizeMomentumStats` | function | 10899 |
| `finalizePlayerRegistrySeason` | function | 3824 |
| `finalizeResponseStats` | function | 10830 |
| `finalizeRosterImpactStats` | function | 11604 |
| `finalizeSpecialTeamsStats` | function | 4048 |
| `findDuplicateGameIds` | function | 6134 |
| `findLineupGameContext` | function | 6639 |
| `findLoadedSeasonPlayer` | function | 9271 |
| `finishHallOfFameIntro` | function | 8475 |
| `finiteNumbers` | function | 3945 |
| `fitMatchcenterStoryLayout` | function | 20772 |
| `fixMojibakeText` | function | 2441 |
| `formatDiagnosticAttempt` | function | 5915 |
| `formatGameLoadError` | function | 5928 |
| `formatStatus` | function | 5912 |
| `gameClassificationStatusLabel` | function | 2531 |
| `gameDaySortValue` | function | 4114 |
| `gameResult` | function | 3549 |
| `generatePlayerInsights` | function | 9133 |
| `generateSocialVideoContactSheets` | window | 19618 |
| `generateSocialVideoStandbilder` | window | 19594 |
| `generateSocialVideoVideos` | window | 19549 |
| `getActiveAlltimeSeasonKeys` | function | 10305 |
| `getActiveSeasonKey` | function | 2392 |
| `getAllLoadedSeasonGames` | function | 10498 |
| `getAlltimeAggregatedStyleProfile` | function | 13979 |
| `getAllTimeCoverStats` | function | 8241 |
| `getAllTimeDuoRows` | function | 10453 |
| `getAllTimeDuoRowsForPlayer` | function | 10191 |
| `getAllTimeGamesPlayedRows` | function | 10231 |
| `getAllTimeIdentityStandings` | function | 12273 |
| `getAllTimeMainPlayerRows` | function | 9312 |
| `getAllTimeOpponentIntelligence` | function | 12194 |
| `getAllTimeOpponentNames` | function | 2470 |
| `getAllTimeOpponentTopScorers` | function | 12202 |
| `getAllTimePenaltyRows` | function | 10256 |
| `getAllTimePlayerRows` | function | 9280 |
| `getAlltimeRank` | function | 12718 |
| `getAlltimeRecencyWeight` | function | 10316 |
| `getAllTimeSgOnlyRows` | function | 9315 |
| `getAssistDiagnostics` | function | 4700 |
| `getAssistPlayersFromEvent` | function | 2871 |
| `getCarryPerformanceRows` | function | 10202 |
| `getComparisonAlltimeTeamGoals` | function | 12809 |
| `getComparisonAlltimeTrend` | function | 12883 |
| `getComparisonChemistryFromEvents` | function | 12817 |
| `getComparisonClutchFromEvents` | function | 12822 |
| `getComparisonCurrentSelection` | function | 12948 |
| `getComparisonEventsForItem` | function | 13266 |
| `getComparisonPlayerOptions` | function | 12890 |
| `getComparisonPlayerRow` | function | 12791 |
| `getComparisonProfile` | function | 12852 |
| `getComparisonRosterGames` | function | 13286 |
| `getComparisonRosterGamesForSeason` | function | 13269 |
| `getComparisonSeasonEvents` | function | 12812 |
| `getComparisonSeasonLabel` | function | 12794 |
| `getComparisonSeasonTrend` | function | 12857 |
| `getComparisonStyleProfile` | function | 12827 |
| `getComparisonTeamGoalsForSeason` | function | 12797 |
| `getComparisonVariantsForPlayer` | function | 12908 |
| `getDifficultConnectionRowsForPlayer` | function | 11556 |
| `getDuoDirectScorerGameCounts` | function | 10620 |
| `getDuoFieldPlayerRows` | function | 11049 |
| `getDuoRowsForPlayerScope` | function | 10528 |
| `getDuoScorerCountsWithCandidate` | function | 10569 |
| `getDuoSharedFieldRows` | function | 11065 |
| `getEffectiveLineupData` | function | 6847 |
| `getEinsatzCenterGameDraft` | function | 6919 |
| `getEmptyState` | function | 15448 |
| `getFieldGameIdsForPlayer` | function | 2672 |
| `getFurtherSameDayUlmGames` | function | 4130 |
| `getGameDurationMinutes` | function | 4109 |
| `getGameId` | function | 6128 |
| `getGlobalAllTimeSnapshot` | function | 2396 |
| `getGlobalIdentityProfile` | function | 12358 |
| `getGlobalLoadableSeasonKeys` | function | 8234 |
| `getGlobalOpponentSpecialistProfile` | function | 14435 |
| `getGlobalPlayerBestSeason` | function | 10184 |
| `getGlobalPlayerMilestones` | function | 10367 |
| `getGlobalPlayerOpponentGameRows` | function | 14406 |
| `getGlobalPlayerPeakGame` | function | 10173 |
| `getGlobalPlayerTeamRecord` | function | 10147 |
| `getGlobalProfileEvents` | function | 10120 |
| `getGlobalRookieMilestone` | function | 10356 |
| `getGlobalRookieSeasonKey` | function | 10342 |
| `getGlobalSeasonStatRows` | function | 12702 |
| `getGlobalTopScorerMilestones` | function | 10329 |
| `getGoalieComparisonAlltimeTrend` | function | 13365 |
| `getGoalieComparisonSeasonTrend` | function | 13382 |
| `getGoalieDiagnostics` | function | 4686 |
| `getGoalieDnaRows` | function | 9813 |
| `getGoalieGameIdsForPlayer` | function | 2679 |
| `getGoalieOpponentName` | function | 3985 |
| `getGoalieOpponentTier` | function | 3989 |
| `getGoalScorerFromEvent` | function | 2837 |
| `getHallGoalieData` | function | 12568 |
| `getHallOfFamePlayerIdSet` | function | 10116 |
| `getHallOfFamePlayerRows` | function | 10113 |
| `getHallOfFameStats` | function | 12228 |
| `getJerseyNumber` | function | 2776 |
| `getLineupAllRows` | function | 18144 |
| `getLineupPlayerPool` | function | 18155 |
| `getLoadedSeasonPlayerUi` | function | 10142 |
| `getLoadedSeasonPointsByName` | function | 10086 |
| `getMatchcenterDirectOpponents` | function | 15578 |
| `getMatchcenterOpponents` | function | 15545 |
| `getOppStrength` | function | 3562 |
| `getOrCreatePlayerProfile` | function | 3692 |
| `getPenaltyBasePersonalMinutes` | function | 4145 |
| `getPenaltyDisciplineMinutes` | function | 4163 |
| `getPenaltyDisciplineType` | function | 4101 |
| `getPenaltyPersonalMinutes` | function | 4153 |
| `getPenaltySpecialTeamsMinutes` | function | 4142 |
| `getPhaseIndex` | function | 4971 |
| `getPlayedUlmGames` | function | 2754 |
| `getPlayerAlltimeFieldGames` | function | 2716 |
| `getPlayerAlltimeGoalieGames` | function | 2719 |
| `getPlayerAlltimeRoleGames` | function | 2697 |
| `getPlayerAlltimeStats` | function | 9323 |
| `getPlayerAlltimeTotalGames` | function | 2722 |
| `getPlayerFieldGames` | function | 2686 |
| `getPlayerGoalieAlltimeStats` | function | 9344 |
| `getPlayerGoalieGames` | function | 2690 |
| `getPlayerGoalieSeasonStats` | function | 9339 |
| `getPlayerRegistryProfile` | function | 9331 |
| `getPlayerRoleAvailability` | function | 9374 |
| `getPlayerSeasonRoleGameSummary` | function | 2731 |
| `getPlayerSeasonStats` | function | 9318 |
| `getPlayerSourceId` | function | 2773 |
| `getPreClubHistoryPlayerNames` | function | 2508 |
| `getPreviousSeasonKey` | function | 10041 |
| `getRosterEntryRegistryProfile` | function | 10519 |
| `getRosterGameIdsForPlayer` | function | 2613 |
| `getRosterImpactPlayerEventLookup` | function | 11622 |
| `getRosterImpactPlayerGames` | function | 11643 |
| `getRosterStatus` | function | 10322 |
| `getScoreLabel` | function | 15338 |
| `getSeasonApiBaseUrl` | function | 1816 |
| `getSeasonDataPreview` | function | 6478 |
| `getSeasonDataState` | function | 22241 |
| `getSeasonIdentityProfile` | function | 10276 |
| `getSeasonmanagerRosterSuggestion` | function | 7261 |
| `getSeasonOriginBaseUrl` | function | 1836 |
| `getSeasonPlayerFieldBasis` | function | 8739 |
| `getSeasonScopedIdentityProfile` | function | 8766 |
| `getSeasonTeamGameIds` | function | 2770 |
| `getSeasonTeamGames` | function | 2766 |
| `getSeasonUiPlayerForProfile` | function | 10272 |
| `getSpecialTeamsDiagnostics` | function | 4693 |
| `getSpecialTeamsPenaltyChunks` | function | 4166 |
| `getStaticSeasonGames` | function | 5977 |
| `getStoredLastView` | function | 3397 |
| `getSyntheticLineupPlayers` | function | 18121 |
| `getSyntheticLineupRow` | function | 18124 |
| `getSyntheticLineupRows` | function | 18141 |
| `getTeamAllTimeRecords` | function | 12152 |
| `getTeamLogoUrlForStory` | function | 20106 |
| `getUlmTeamStatus` | function | 2483 |
| `getUniqueAllTimeOpponentNames` | function | 2478 |
| `globalSearchEntries` | function | 22623 |
| `globalSearchIsEditableTarget` | function | 22672 |
| `globalSearchKeyAction` | function | 22678 |
| `globalSearchMatch` | function | 22660 |
| `globalSearchMatchdayScore` | function | 22646 |
| `globalSearchOnKeydown` | function | 22773 |
| `globalSearchPlayerScore` | function | 22637 |
| `globalSearchTokens` | function | 22618 |
| `goalieApplySampleConfidence` | function | 9497 |
| `goalieBucketLooseSum` | function | 9505 |
| `goalieBucketRows` | function | 9417 |
| `goalieClampScore` | function | 9462 |
| `goalieDetailFirstTime` | function | 9441 |
| `goalieDnaKey` | function | 9722 |
| `goalieDnaValue` | function | 9727 |
| `goalieEntryRecognitionReason` | function | 2636 |
| `goalieEventAbsSeconds` | function | 3962 |
| `goalieEventSecondInPeriod` | function | 9448 |
| `goalieGameDurationSeconds` | function | 3968 |
| `goalieGameStateBeforeGoal` | function | 3973 |
| `goalieInverseScore` | function | 9466 |
| `goalieNum` | function | 9403 |
| `goaliePctText` | function | 9454 |
| `goaliePositiveCurveScore` | function | 9482 |
| `goaliePositiveScore` | function | 9474 |
| `goalieSafeNum` | function | 9458 |
| `goalieStateGoals` | function | 9734 |
| `goalieStdDev` | function | 9435 |
| `goalieTierMeta` | function | 9426 |
| `goalieTime` | function | 9409 |
| `goalieTopRow` | function | 9423 |
| `goalieWeightedScore` | function | 9491 |
| `goToMainNavPoint` | window | 21979 |
| `hallGoalieExplainForLabel` | function | 12605 |
| `hallGoalieNameHtml` | function | 12584 |
| `hallGoalieNum` | function | 12470 |
| `hallGoaliePkStats` | function | 12496 |
| `hallGoalieRowFromStats` | function | 12535 |
| `hallGoalieSeasonLabel` | function | 12484 |
| `hallGoalieSeasonScore` | function | 12515 |
| `hallGoalieTime` | function | 12476 |
| `hallGoalieTooltip` | function | 12601 |
| `hallGoalieTopteamStats` | function | 12508 |
| `handleComparisonDuoSearchKey` | window | 13056 |
| `hasEmbeddedSeasonData` | function | 8231 |
| `hashSegmentToSeasonKey` | function | 3104 |
| `hasSeasonRole` | function | 5355 |
| `hasSeasonSource` | function | 8227 |
| `hofIntroDelay` | function | 8383 |
| `identityClutchGoalsVsTeams` | function | 5236 |
| `identityDecisiveGoalsVsTeams` | function | 5239 |
| `identityGoalsVsTeams` | function | 5233 |
| `identityInputs` | function | 5270 |
| `identityLateGoalsVsTeams` | function | 5242 |
| `identityOpponentGroups` | function | 5198 |
| `identityPartnerStats` | function | 5184 |
| `identityPointsVsTeams` | function | 5230 |
| `incGoalieBucket` | function | 3958 |
| `incrementUniqueCounter` | function | 3647 |
| `initGlobalSearch` | function | 22795 |
| `initHashRouting` | function | 3528 |
| `initToolMenu` | function | 22893 |
| `invalidateGlobalIdentityCache` | function | 2221 |
| `isActiveAlltimeSeasonStats` | function | 10291 |
| `isComebackRelevantGoal` | function | 5226 |
| `isDecisiveGoal` | function | 5218 |
| `isEinsatzCenterGameFromDraft` | function | 6856 |
| `isExcludedGoalieAppearance` | function | 2646 |
| `isFieldAppearance` | function | 2666 |
| `isGamePlayed` | function | 2963 |
| `isGoalieAppearance` | function | 2660 |
| `isGoalieRosterEntry` | function | 2622 |
| `isHallOfFameEligiblePlayer` | function | 10107 |
| `isHallRowPureSG` | function | 12485 |
| `isImportantClutchGoal` | function | 5213 |
| `isLateGoal` | function | 5221 |
| `isMatchPenaltyEvent` | function | 4093 |
| `isNewSeasonDataState` | function | 22262 |
| `isPenaltyGoalEvent` | function | 4176 |
| `isPreClubHistoryPlayerName` | function | 2511 |
| `isPureSGPlayer` | function | 9304 |
| `isRookieCandidateForSeason` | function | 10076 |
| `isSameUlmTeamContext` | function | 4122 |
| `isSeasonDataPreviewStale` | function | 6486 |
| `isSgOnlyAlltimePlayer` | function | 9296 |
| `isSgOnlyHallOfFameExcluded` | function | 10098 |
| `isSyntheticLineupPlayerId` | function | 18118 |
| `isToolMenuOpen` | function | 22831 |
| `isTwoPlusTwoPenaltyEvent` | function | 4097 |
| `isUsableExternalSeasonData` | function | 6061 |
| `isValidAsOfDate` | function | 3108 |
| `isValidAsOfStartTime` | function | 3111 |
| `isVisibleSecondaryTrait` | function | 8641 |
| `kpiBadge` | function | 13760 |
| `kpiDelta` | function | 13493 |
| `kpiItemColor` | function | 13499 |
| `kpiNiceMax` | function | 13650 |
| `kpiRadarValue` | function | 13573 |
| `kpiTrendRows` | function | 13656 |
| `kpiValueText` | function | 13489 |
| `lexiconEntry` | function | 15144 |
| `lexiconUniqueKeys` | function | 15136 |
| `lineupAverage` | function | 18170 |
| `lineupBuilderPoolIds` | function | 2278 |
| `lineupCombinationIds` | function | 18647 |
| `lineupDirectChemistryScore` | function | 18691 |
| `lineupEvaluateComplementCandidate` | function | 18698 |
| `lineupGroupDisplayName` | function | 6765 |
| `lineupLevelLabel` | function | 18174 |
| `lineupOpponentDNAForContext` | function | 18271 |
| `lineupPlayerAnchorScore` | function | 18776 |
| `lineupPlayerProfile` | function | 18375 |
| `lineupRankCandidateIds` | function | 18632 |
| `lineupRecommendationReason` | function | 18863 |
| `lineupRoleDnaComplementScore` | function | 18667 |
| `lineupRosterGamesForPlayer` | function | 18180 |
| `lineupRowMap` | function | 18629 |
| `lineupRowMeta` | function | 18147 |
| `lineupScore` | function | 18164 |
| `lineupStdDev` | function | 18661 |
| `linkUiPlayersToRegistry` | function | 3779 |
| `loadEinsatzCenterMismatchedAutosave` | function | 7176 |
| `loadSeason` | function | 8307 |
| `loadSeasonData` | function | 7761 |
| `loadSeasonForGlobal` | function | 8259 |
| `loadSeasonManifest` | function | 5992 |
| `mainNavActiveKeyForPage` | function | 21973 |
| `markFieldRoleAppearance` | function | 3754 |
| `matchcenterAddDuoConnection` | function | 15985 |
| `matchcenterAddPlanItem` | function | 17199 |
| `matchcenterAddPlanWatch` | function | 17205 |
| `matchcenterAddUlmDuoConnection` | function | 16136 |
| `matchcenterAddUlmScoring` | function | 15766 |
| `matchcenterAnalyzeDirect` | function | 15611 |
| `matchcenterAnalyzeForm` | function | 15648 |
| `matchcenterBuildCoachActivationHints` | function | 17915 |
| `matchcenterBuildCoachAvoidList` | function | 17905 |
| `matchcenterBuildCoachDangerPatterns` | function | 17887 |
| `matchcenterBuildCoachHints` | function | 17643 |
| `matchcenterBuildCoachIfThen` | function | 17895 |
| `matchcenterBuildCoachKeyActors` | function | 17922 |
| `matchcenterBuildCoachLevers` | function | 17877 |
| `matchcenterBuildCoachPriorities` | function | 17870 |
| `matchcenterBuildGoalieMatchup` | function | 16337 |
| `matchcenterBuildInsights` | function | 16621 |
| `matchcenterBuildIntelHeadline` | function | 17659 |
| `matchcenterBuildIntelligenceDataQuality` | function | 17294 |
| `matchcenterBuildIntelligenceSignals` | function | 17680 |
| `matchcenterBuildIntelListFromPlan` | function | 17634 |
| `matchcenterBuildMatchPlan` | function | 18979 |
| `matchcenterBuildOneThingToWatch` | function | 17667 |
| `matchcenterBuildOpponentAlarm` | function | 17524 |
| `matchcenterBuildOpponentDNA` | function | 17345 |
| `matchcenterBuildOpponentDuoInsights` | function | 16084 |
| `matchcenterBuildOpponentDuos` | function | 16039 |
| `matchcenterBuildPlanConfidence` | function | 17211 |
| `matchcenterBuildSpecialTeamsMatchup` | function | 16267 |
| `matchcenterBuildTimingAnalysis` | function | 16460 |
| `matchcenterBuildTimingInsights` | function | 16449 |
| `matchcenterBuildUlmDuoInsights` | function | 16234 |
| `matchcenterBuildUlmDuos` | function | 16191 |
| `matchcenterBuildUlmPlayerInsights` | function | 15928 |
| `matchcenterBuildUlmPlayerScouting` | function | 15873 |
| `matchcenterClassifyUlmGoalEvent` | function | 15755 |
| `matchcenterCoachAdd` | function | 17807 |
| `matchcenterCoachCautious` | function | 17804 |
| `matchcenterCoachGameModel` | function | 17816 |
| `matchcenterCoachPriorityFromAlarm` | function | 17860 |
| `matchcenterConfidenceClass` | function | 17186 |
| `matchcenterDateLabel` | function | 15487 |
| `matchcenterDefaultSeasonKey` | function | 15525 |
| `matchcenterDeriveOpponentType` | function | 17458 |
| `matchcenterDirectContextGames` | function | 16247 |
| `matchcenterDuoDirectionLabel` | function | 15978 |
| `matchcenterDuoPairKey` | function | 15941 |
| `matchcenterEmptyBuckets` | function | 15696 |
| `matchcenterEmptyTimingStats` | function | 16396 |
| `matchcenterEnsureOpponentDuo` | function | 15945 |
| `matchcenterEnsureUlmDuo` | function | 16098 |
| `matchcenterEnsureUlmPlayer` | function | 15704 |
| `matchcenterFinalizeOpponentDuos` | function | 16004 |
| `matchcenterFinalizeUlmDuos` | function | 16155 |
| `matchcenterFinalizeUlmPlayers` | function | 15804 |
| `matchcenterFormLine` | function | 16616 |
| `matchcenterGameLine` | function | 16610 |
| `matchcenterGoalAbsSeconds` | function | 16380 |
| `matchcenterGoalieFitScore` | function | 16320 |
| `matchcenterGoalieKey` | function | 16315 |
| `matchcenterGoalMinute` | function | 15682 |
| `matchcenterInferPriority` | function | 17192 |
| `matchcenterIntelAddAlarm` | function | 17503 |
| `matchcenterIntelCurve` | function | 17246 |
| `matchcenterIntelDataLabel` | function | 17291 |
| `matchcenterIntelDuoRef` | function | 17489 |
| `matchcenterIntelInverseCurve` | function | 17252 |
| `matchcenterIntelPct` | function | 17271 |
| `matchcenterIntelPlayerRef` | function | 17476 |
| `matchcenterIntelPriorityClass` | function | 17281 |
| `matchcenterIntelPriorityFromScore` | function | 17275 |
| `matchcenterIntelPriorityLabel` | function | 17287 |
| `matchcenterIntelRate` | function | 17267 |
| `matchcenterIntelWeighted` | function | 17256 |
| `matchcenterIsFreiburgTuebingenTeamName` | function | 15512 |
| `matchcenterOpponentMode` | function | 15542 |
| `matchcenterPct` | function | 16263 |
| `matchcenterPersonalPenaltyMinutesForSide` | function | 16254 |
| `matchcenterPlanRateText` | function | 17178 |
| `matchcenterPlanScoreText` | function | 17174 |
| `matchcenterPriorityLabel` | function | 17183 |
| `matchcenterRegisterUlmProfileGame` | function | 15742 |
| `matchcenterResultClass` | function | 16601 |
| `matchcenterSeasonHasGames` | function | 15522 |
| `matchcenterSigned` | function | 15481 |
| `matchcenterSocialAdd` | function | 17984 |
| `matchcenterSocialCaption` | function | 17991 |
| `matchcenterSpecialTeamsForGame` | function | 16250 |
| `matchcenterStoryAddCandidate` | function | 20210 |
| `matchcenterStoryAddFact` | function | 20191 |
| `matchcenterStoryBestClutchDuo` | function | 20435 |
| `matchcenterStoryBestClutchPlayer` | function | 20391 |
| `matchcenterStoryCandidateForBudget` | function | 20248 |
| `matchcenterStoryCategoryForPlanFact` | function | 20520 |
| `matchcenterStoryCategoryLimit` | function | 20233 |
| `matchcenterStoryClutchFact` | function | 20368 |
| `matchcenterStoryClutchPriority` | function | 20469 |
| `matchcenterStoryCompetitionLabel` | function | 20472 |
| `matchcenterStoryCurrentStreak` | function | 20315 |
| `matchcenterStoryDirectFactCandidates` | function | 20485 |
| `matchcenterStoryDownloadFileName` | function | 19447 |
| `matchcenterStoryDuoClutchFact` | function | 20445 |
| `matchcenterStoryDuoClutchTotal` | function | 20427 |
| `matchcenterStoryDuoFact` | function | 20448 |
| `matchcenterStoryEstimateFactWeight` | function | 20204 |
| `matchcenterStoryFactKey` | function | 20198 |
| `matchcenterStoryFormFact` | function | 20333 |
| `matchcenterStoryFormFactCandidates` | function | 20344 |
| `matchcenterStoryInlineStat` | function | 20173 |
| `matchcenterStoryLastDuelLabel` | function | 20481 |
| `matchcenterStoryLateGoalsForOutcome` | function | 20364 |
| `matchcenterStoryLogoBase` | function | 20085 |
| `matchcenterStoryLogoForOpponent` | function | 20136 |
| `matchcenterStoryLooksArtificial` | function | 20201 |
| `matchcenterStoryNameClass` | function | 20641 |
| `matchcenterStoryNormalizePickOptions` | function | 20237 |
| `matchcenterStoryPickFactItems` | function | 20258 |
| `matchcenterStoryPickFacts` | function | 20311 |
| `matchcenterStoryPlanFactCandidates` | function | 20507 |
| `matchcenterStoryPlayerClutchFact` | function | 20401 |
| `matchcenterStoryPlayerClutchTotal` | function | 20383 |
| `matchcenterStoryRankRows` | function | 20177 |
| `matchcenterStoryRankText` | function | 20169 |
| `matchcenterStorySafeLogoUrl` | function | 20091 |
| `matchcenterStoryShortDuel` | function | 20476 |
| `matchcenterStoryTableRank` | function | 20151 |
| `matchcenterStoryUlmTableRank` | function | 20162 |
| `matchcenterStoryVisibleFacts` | function | 20647 |
| `matchcenterStoryWinlessStreak` | function | 20324 |
| `matchcenterTimeValue` | function | 16388 |
| `matchcenterTimingStatsForGames` | function | 16412 |
| `matchcenterUlmScoutingConfidence` | function | 15699 |
| `matchcenterUlmTeamLabelForGame` | function | 16605 |
| `matchcenterUpdateUlmSeasonRow` | function | 15748 |
| `matchcenterWindowForSecond` | function | 16405 |
| `matchdayGameCardHtml` | function | 22105 |
| `matchdayUlmGames` | function | 22102 |
| `medianOrNull` | function | 3952 |
| `mergeDuoSet` | function | 4782 |
| `mergeGoalieSpecialTeamsStats` | function | 4414 |
| `mergeSpecialTeamsStats` | function | 4058 |
| `moveGlobalSearch` | function | 22757 |
| `normalizeAssistPlayerName` | function | 2840 |
| `normalizeComparisonItem` | function | 12768 |
| `normalizeDuoComparisonItem` | function | 13012 |
| `normalizeEventPlayerRef` | function | 2779 |
| `normalizeLineupLines` | function | 2281 |
| `normalizePlayerName` | function | 2498 |
| `normalizeSecondaryTraits` | function | 5329 |
| `onGlobalSearchInput` | window | 22751 |
| `openAllTimePlayers` | window | 8375 |
| `openComparisonCenter` | window | 8545 |
| `openDuoProPicker` | window | 11461 |
| `openEinsatzCenter` | window | 6716 |
| `openGlobalSearch` | window | 22718 |
| `openHallOfFame` | window | 8521 |
| `openLexicon` | window | 8618 |
| `openLigaGegner` | window | 22475 |
| `openLineupBuilder` | window | 8596 |
| `openMatchcenter` | window | 8574 |
| `openMatchcenterStoryPreview` | window | 2234 |
| `openMatchday` | window | 22084 |
| `openMatchdayTimeline` | window | 22076 |
| `openOverview` | window | 22025 |
| `openSeason` | window | 8372 |
| `openToolMenu` | window | 22835 |
| `overviewCompactTableHtml` | function | 22302 |
| `overviewCrossSeasonTrendHtml` | function | 22351 |
| `overviewFormHtml` | function | 22310 |
| `overviewLastMatchdayText` | function | 22286 |
| `overviewLineupLinkHtml` | function | 22368 |
| `overviewMatchcenterLinkHtml` | function | 22365 |
| `overviewMatchdayEndMs` | function | 22203 |
| `overviewMatchdayStartMs` | function | 22197 |
| `overviewNextMatchdayHtml` | function | 22290 |
| `overviewOpponentLabel` | function | 22281 |
| `overviewOpponentPreviewHtml` | function | 22360 |
| `overviewRankChangeTile` | function | 22387 |
| `overviewRecordHtml` | function | 22344 |
| `overviewSeasonAwardHtml` | function | 22333 |
| `overviewSeasonBilanzHtml` | function | 22325 |
| `p1NarrativeKey` | function | 15412 |
| `paintGlobalSearchResults` | function | 22710 |
| `parseAppHash` | function | 3211 |
| `parseAsOfQueryValue` | function | 3250 |
| `parseComparisonVariant` | function | 12933 |
| `parseLastViewState` | function | 3385 |
| `parseSeasonDataState` | function | 22252 |
| `pct` | function | 5137 |
| `pctValue` | function | 12408 |
| `pdashBestPhase` | function | 14046 |
| `pdashInsight` | function | 14084 |
| `pdashInsights` | function | 14087 |
| `pdashNum` | function | 14030 |
| `pdashOpponentStrength` | function | 14064 |
| `pdashOpponentTier` | function | 14058 |
| `pdashPct` | function | 14034 |
| `pdashPhaseLabel` | function | 14038 |
| `pdashTopCount` | function | 14042 |
| `pdashTopOpponent` | function | 14054 |
| `pdashTopPartner` | function | 14050 |
| `penaltyRawText` | function | 4090 |
| `playerAppearedForUlmStatusInSeasonByName` | function | 10057 |
| `playerAppearedInSeasonByName` | function | 10046 |
| `playerExplainAdd` | function | 14720 |
| `playerExplainConfidence` | function | 14711 |
| `playerExplainConfidenceLabel` | function | 14717 |
| `playerExplainContextSentence` | function | 14756 |
| `playerExplainHeadline` | function | 14746 |
| `playerExplainRolePhrase` | function | 14737 |
| `playerExplainStyleSignature` | function | 14725 |
| `processGame` | function | 2904 |
| `rAlltimeKpis` | function | 12724 |
| `rAlltimePlayerDashboard` | function | 14239 |
| `rAllTimePlayersPage` | function | 15001 |
| `rankNarratives` | function | 15434 |
| `rAntiSynergyCompareChip` | function | 11788 |
| `rAntiSynergyDelta` | function | 11772 |
| `rAntiSynergyMainDelta` | function | 11813 |
| `rAntiSynergyMetricRow` | function | 11796 |
| `rAsOfSelector` | function | 22496 |
| `ratio01` | function | 5138 |
| `rCarryPerformanceRows` | function | 10218 |
| `rClassicRoleTags` | function | 8727 |
| `rClassicTagTip` | function | 8665 |
| `rClutch` | function | 8933 |
| `rClutchBadge` | function | 8627 |
| `rComparisonCenterPage` | function | 13909 |
| `rComparisonDashboard` | function | 13860 |
| `rComparisonDuoSearchBox` | function | 13242 |
| `rComparisonDuoSuggestionButtons` | function | 13035 |
| `rComparisonMiniOverview` | function | 13848 |
| `rComparisonModeSelect` | function | 13263 |
| `rComparisonRoles` | function | 13852 |
| `rComparisonStyles` | function | 13871 |
| `rContextBar` | function | 22579 |
| `rDifficultConnectionList` | function | 11823 |
| `rDifficultConnectionListCompact` | function | 11890 |
| `rDifficultConnectionListCompactLegacy` | function | 11848 |
| `rDifficultConnectionsCard` | function | 11929 |
| `rDuoCenterPro` | function | 11308 |
| `rDuoCompareSummaryCards` | function | 13121 |
| `rDuoComparisonBars` | function | 13116 |
| `rDuoComparisonChemistry` | function | 13174 |
| `rDuoComparisonContext` | function | 13206 |
| `rDuoComparisonDashboard` | function | 13228 |
| `rDuoComparisonDetails` | function | 13224 |
| `rDuoComparisonImpact` | function | 13190 |
| `rDuoComparisonPage` | function | 13252 |
| `rDuoComparisonProfile` | function | 13152 |
| `rDuoProPlayerSelect` | function | 11490 |
| `rDuoResponseMomentumCard` | function | 12086 |
| `rDuoRows` | function | 10477 |
| `recommendLineComplements` | function | 18951 |
| `recordOverviewVisit` | function | 22271 |
| `registerPlayerIdentity` | function | 3726 |
| `registerSeasonRosters` | function | 3759 |
| `rEinsatzCenterAutosaveBanner` | function | 7138 |
| `rEinsatzCenterCombo` | function | 6661 |
| `rEinsatzCenterComboEditor` | function | 7366 |
| `rEinsatzCenterDraftBanner` | function | 6879 |
| `rEinsatzCenterDraftMark` | function | 6865 |
| `rEinsatzCenterDraftStatsHint` | function | 6869 |
| `rEinsatzCenterEditPage` | function | 7466 |
| `rEinsatzCenterGameCard` | function | 6670 |
| `rEinsatzCenterGameEditor` | function | 7413 |
| `rEinsatzCenterGroup` | function | 6648 |
| `rEinsatzCenterGroupEditor` | function | 7335 |
| `rEinsatzCenterPage` | function | 6689 |
| `rEinsatzCenterRosterSuggestionCard` | function | 7382 |
| `rEinsatzCenterStats` | function | 6771 |
| `relative01` | function | 5139 |
| `removeComparisonDuo` | window | 13086 |
| `removeComparisonItem` | window | 12998 |
| `removeEinsatzCenterCombo` | window | 7703 |
| `removeEinsatzCenterGroup` | window | 7617 |
| `removeEinsatzCenterGroupPlayer` | window | 7667 |
| `removeEinsatzCenterRosterPlayer` | window | 7548 |
| `removeLineupBuilderPlayerFromLine` | window | 2328 |
| `removeLineupPlayer` | window | 2269 |
| `rEmptyState` | function | 15460 |
| `renameEinsatzCenterGroup` | window | 7639 |
| `render` | function | 21383 |
| `renderComparisonDuoSuggestions` | function | 13039 |
| `renderTags` | function | 8735 |
| `repairRenderedMojibake` | function | 2444 |
| `resetPlayerRegistrySeason` | function | 3671 |
| `resolveAssistPlayer` | function | 2885 |
| `resolveCurrentSeasonKey` | function | 6024 |
| `resolveGoalScorerPlayer` | function | 2822 |
| `resolveLineupPlayerName` | function | 6633 |
| `resolvePlayerRoleView` | function | 9388 |
| `resolveRosterPlayerByRef` | function | 2791 |
| `responseExcerpt` | function | 5861 |
| `responseMomentumAbsSeconds` | function | 10653 |
| `responseMomentumActor` | function | 10682 |
| `responseMomentumConfidence` | function | 10802 |
| `responseMomentumEmptyState` | function | 10807 |
| `responseMomentumGameRows` | function | 10666 |
| `responseMomentumGoalActors` | function | 10693 |
| `responseMomentumPairKey` | function | 10815 |
| `responseMomentumSide` | function | 10673 |
| `responseMomentumTime` | function | 10659 |
| `responseMomentumTooltipFor` | function | 12010 |
| `restoreEinsatzCenterAutosave` | function | 7112 |
| `restoreHallOfFameIntroPrevious` | function | 8463 |
| `resultGoalsAgainstForSide` | function | 3994 |
| `returnToEinsatzCenterEdit` | window | 7534 |
| `rGlobalAllTimeStats` | function | 14347 |
| `rGlobalCareerHeader` | function | 14256 |
| `rGlobalDevelopment` | function | 14365 |
| `rGlobalDnaBars` | function | 14000 |
| `rGlobalDuoNetwork` | function | 14465 |
| `rGlobalOpponentSpecialist` | function | 14664 |
| `rGlobalOverview` | function | 14294 |
| `rGlobalPartnerOpponentPanel` | function | 14242 |
| `rGlobalProfileTags` | function | 12399 |
| `rGlobalSearchPanelHtml` | function | 22707 |
| `rGlobalSearchResultsHtml` | function | 22696 |
| `rGlobalSearchToggle` | function | 22693 |
| `rGoalieAnalysis` | function | 10014 |
| `rGoalieBars` | function | 9671 |
| `rGoalieDnaBars` | function | 9817 |
| `rGoalieFirstGoalResistance` | function | 9854 |
| `rGoalieInsights` | function | 9927 |
| `rGoalieKpis` | function | 9831 |
| `rGoalieMiniMetrics` | function | 9848 |
| `rGoalieMomentum` | function | 9868 |
| `rGoalieOpponents` | function | 9969 |
| `rGoalieOverview` | function | 9949 |
| `rGoaliePhaseProfile` | function | 9910 |
| `rGoaliePhases` | function | 9966 |
| `rGoalieRoleTraits` | function | 9809 |
| `rGoalieStability` | function | 9981 |
| `rGoalieTable` | function | 10006 |
| `rGoalieTierCards` | function | 9882 |
| `rHallDuoTemple` | function | 12461 |
| `rHallGoalieAwardCards` | function | 12652 |
| `rHallGoalieLegends` | function | 12669 |
| `rHallGoalieRankCard` | function | 12620 |
| `rHallOfFameHero` | function | 12412 |
| `rHallOfFamePage` | function | 15043 |
| `rHallPodiumList` | function | 12438 |
| `rHallSGBadge` | function | 12493 |
| `rIaShell` | function | 22599 |
| `rIdentityCards` | function | 8701 |
| `rIdentityTags` | function | 8681 |
| `rInsights` | function | 9194 |
| `rInteractiveDuoCenterPro` | function | 11497 |
| `rKpiCards` | function | 13502 |
| `rKpiExtendedMetrics` | function | 13635 |
| `rKpiInfoCards` | function | 13770 |
| `rKpiMetricCard` | function | 13627 |
| `rKpiMirrorRows` | function | 13513 |
| `rKpiObjectMini` | function | 13763 |
| `rKpiOpponentStrength` | function | 13732 |
| `rKpiRadar` | function | 13584 |
| `rKpiShareBars` | function | 13619 |
| `rKpiTextMetricCard` | function | 13632 |
| `rKpiTrendCompare` | function | 13665 |
| `rKPIVergleich` | function | 13834 |
| `rLexiconPage` | function | 15158 |
| `rLexiconRows` | function | 15154 |
| `rLigaGegnerPlaceholderPage` | function | 22479 |
| `rLineupBuilderAvailablePanel` | function | 19808 |
| `rLineupBuilderPage` | function | 19984 |
| `rLineupComplementCards` | function | 19905 |
| `rLineupMetricPills` | function | 19794 |
| `rLineupRecommendationCards` | function | 19856 |
| `rLineupRecommendationMode` | function | 19871 |
| `rLineupScoreRows` | function | 19690 |
| `rLineupSimpleCards` | function | 19712 |
| `rLineupTestLine` | function | 19918 |
| `rLineupTestMode` | function | 19967 |
| `rMainNav` | function | 21986 |
| `rMainNavBottom` | function | 22008 |
| `rMatchcenterCoachCardList` | function | 19274 |
| `rMatchcenterCoachIfThen` | function | 19288 |
| `rMatchcenterCoachSimpleList` | function | 19296 |
| `rMatchcenterCopyButton` | function | 19366 |
| `rMatchcenterDetailsSection` | function | 16593 |
| `rMatchcenterDigitalCoach` | function | 19301 |
| `rMatchcenterDuoRankCard` | function | 16912 |
| `rMatchcenterDuoRow` | function | 16888 |
| `rMatchcenterDuosTab` | function | 17059 |
| `rMatchcenterDuoWatchCard` | function | 16868 |
| `rMatchcenterFormCard` | function | 16649 |
| `rMatchcenterFormSection` | function | 16567 |
| `rMatchcenterGamesList` | function | 16670 |
| `rMatchcenterGoalieCard` | function | 17121 |
| `rMatchcenterGoalieMatchup` | function | 17145 |
| `rMatchcenterIntelCoachHints` | function | 19260 |
| `rMatchcenterIntelOverview` | function | 19214 |
| `rMatchcenterKpi` | function | 16642 |
| `rMatchcenterLineupBuilder` | function | 19721 |
| `rMatchcenterLockerList` | function | 19371 |
| `rMatchcenterLockerRoomSheet` | function | 19383 |
| `rMatchcenterMatchPlan` | function | 20062 |
| `rMatchcenterOpponentAlarm` | function | 19192 |
| `rMatchcenterOpponentDNA` | function | 19159 |
| `rMatchcenterOpponentDuos` | function | 17016 |
| `rMatchcenterOpponentScouting` | function | 16829 |
| `rMatchcenterPage` | function | 20893 |
| `rMatchcenterPlanItems` | function | 19125 |
| `rMatchcenterPlanWatch` | function | 19143 |
| `rMatchcenterPlayerRow` | function | 16703 |
| `rMatchcenterPlayersTab` | function | 16865 |
| `rMatchcenterProfileSection` | function | 16547 |
| `rMatchcenterRankCard` | function | 16727 |
| `rMatchcenterResponseMomentum` | function | 12113 |
| `rMatchcenterScoutingSummary` | function | 20018 |
| `rMatchcenterSocialBlock` | function | 19439 |
| `rMatchcenterSocialMediaCenter` | function | 19636 |
| `rMatchcenterSpecialCard` | function | 17062 |
| `rMatchcenterSpecialTeams` | function | 17071 |
| `rMatchcenterStoryForm` | function | 20683 |
| `rMatchcenterStoryFrame` | function | 20766 |
| `rMatchcenterStoryLogo` | function | 20678 |
| `rMatchcenterStoryPlayerCard` | function | 20688 |
| `rMatchcenterStoryPreview` | function | 20696 |
| `rMatchcenterTabs` | function | 16544 |
| `rMatchcenterTimeBars` | function | 16471 |
| `rMatchcenterTiming` | function | 16505 |
| `rMatchcenterTimingStatsCard` | function | 16485 |
| `rMatchcenterUlmDuoRankCard` | function | 16967 |
| `rMatchcenterUlmDuoRow` | function | 16944 |
| `rMatchcenterUlmDuos` | function | 16973 |
| `rMatchcenterUlmDuoWatchCard` | function | 16918 |
| `rMatchcenterUlmImpactCard` | function | 16733 |
| `rMatchcenterUlmPlayerRow` | function | 16762 |
| `rMatchcenterUlmRankCard` | function | 16786 |
| `rMatchcenterUlmScouting` | function | 16792 |
| `rMatchcenterWatchCard` | function | 16682 |
| `rMatchdayDetailPage` | function | 22136 |
| `rMatchdayPage` | function | 22172 |
| `rMatchdayTimelinePage` | function | 22125 |
| `rMatchdayTimelineRow` | function | 22117 |
| `rMatrix` | function | 8806 |
| `rmTerm` | function | 12017 |
| `roleGameStableKey` | function | 2694 |
| `roleTraitLabel` | function | 8638 |
| `rOppBreakdown` | function | 9098 |
| `rOpponentIntelBars` | function | 10441 |
| `rOpponentTopScorerTable` | function | 12252 |
| `rosterImpactConfidence` | function | 11684 |
| `rosterImpactConfidenceWeight` | function | 11690 |
| `rosterPlayerMatches` | function | 2598 |
| `rOverviewPage` | function | 22463 |
| `rPdashLabel` | function | 14191 |
| `rPdashStat` | function | 14194 |
| `rPenalties` | function | 9079 |
| `rPhases` | function | 8863 |
| `rPlayerDash` | function | 14197 |
| `rPlayerDashStyles` | function | 14179 |
| `rPlayerExplainItems` | function | 14943 |
| `rPlayerExplanation` | function | 14948 |
| `rPlayerResponseMomentumCard` | function | 12067 |
| `rPlayerRoleSwitch` | function | 9396 |
| `rRadar` | function | 8883 |
| `rRes` | const-arrow | 8626 |
| `rResponseMomentumOverviewCard` | function | 12043 |
| `rRmKpi` | function | 12021 |
| `rRmTopList` | function | 12032 |
| `rRoleTraitTip` | function | 8645 |
| `rRosterImpactStatLine` | function | 11805 |
| `rRosterStatusBadge` | function | 8654 |
| `rScoreBreakdown` | function | 15464 |
| `rSeasonDataPreviewCard` | function | 6505 |
| `rSeasonDataPreviewContextHint` | function | 22531 |
| `rSeasonDataPreviewRows` | function | 6495 |
| `rSeasonDataPreviewStatus` | function | 6492 |
| `rSeasonDataStateContextHint` | function | 22548 |
| `rSeasonDuoCenterPro` | function | 11553 |
| `rSeasonDuoSummary` | function | 8853 |
| `rSeasonInsightsTab` | function | 9179 |
| `rSeasonLandingPage` | function | 14278 |
| `rSeasonPlayerDashboard` | function | 14236 |
| `rSeasonProfileKpis` | function | 8778 |
| `rSeasonProfileTagStrip` | function | 8799 |
| `rSeasonTrendRows` | function | 13960 |
| `rSocialVideoBlock` | function | 19508 |
| `rSparkline` | function | 12738 |
| `rStyleMetricTip` | function | 8650 |
| `rStyleProfileBars` | function | 8690 |
| `rTable` | function | 9248 |
| `rTeamPage` | function | 21041 |
| `rTeamResponseMomentumCard` | function | 12106 |
| `rTimeline` | function | 8968 |
| `rToolMenu` | function | 22821 |
| `runComparison` | window | 13003 |
| `runDuoComparison` | window | 13091 |
| `saveLastView` | function | 3402 |
| `scoreNarrative` | function | 15415 |
| `seasonApiUrl` | function | 1833 |
| `seasonDataPreviewRerender` | function | 6351 |
| `seasonDataPreviewRow` | function | 6355 |
| `seasonGameApiUrls` | function | 1851 |
| `seasonGameHtmlUrls` | function | 1861 |
| `seasonHasPureUlmTeam` | function | 10091 |
| `seasonKeyToHashSegment` | function | 3101 |
| `seasonPathPrefix` | function | 1845 |
| `seasonRoleKeysForPlayer` | function | 5346 |
| `seasonRoleTraitsFromClassic` | function | 5341 |
| `seasonStatNumber` | function | 10281 |
| `seasonStatSetSize` | function | 10285 |
| `seedHallOfFameIntroParticles` | function | 8430 |
| `selectAllLineupAvailable` | window | 2315 |
| `selectComparisonDuoSuggestion` | window | 13049 |
| `selectComparisonMode` | window | 13010 |
| `selectComparisonPlayer` | window | 12967 |
| `selectDuoProQuick` | window | 11463 |
| `selectEinsatzCenterEditGame` | window | 7536 |
| `selectEnforcerKeys` | function | 5358 |
| `serializeFieldRoleSeasonStats` | function | 3875 |
| `serializeGoalieSeasonStats` | function | 3853 |
| `serializeSeasonStats` | function | 3840 |
| `serializeSpecialTeamsStats` | function | 4055 |
| `setAntiSynergyView` | window | 2361 |
| `setComparisonDuoMode` | window | 13020 |
| `setComparisonDuoPlayer` | window | 13069 |
| `setComparisonDuoSearch` | window | 13022 |
| `setComparisonDuoSeasonKey` | window | 13021 |
| `setComparisonRoleMode` | window | 12973 |
| `setComparisonVariant` | window | 12978 |
| `setContextAsOf` | window | 22509 |
| `setDuoProPickerState` | function | 11432 |
| `setDuoProSelection` | window | 11482 |
| `setEinsatzCenterGameNote` | window | 7710 |
| `setEinsatzCenterGroupPlayerPosition` | window | 7675 |
| `setEinsatzCenterIncludeDraft` | window | 7535 |
| `setEinsatzCenterSeason` | window | 6710 |
| `setGlobalPlayer` | window | 2387 |
| `setGlobalPlayerDuo` | window | 2388 |
| `setGlobalTab` | window | 2389 |
| `setGoalieTab` | window | 2228 |
| `setLineupActiveLine` | window | 2300 |
| `setLineupBuilderMode` | window | 2299 |
| `setLineupBuilderOpponent` | window | 2298 |
| `setLineupBuilderSeason` | window | 2286 |
| `setLineupNewPlayerProfile` | window | 2342 |
| `setMatchcenterContext` | window | 8615 |
| `setMatchcenterOpponent` | window | 8614 |
| `setMatchcenterSeason` | window | 8616 |
| `setMatchcenterTab` | window | 2233 |
| `setP` | window | 2225 |
| `setPage` | window | 2371 |
| `setPlayerRoleView` | window | 2227 |
| `setSeasonDataPreviewOpen` | window | 6541 |
| `setSeasonDataPreviewPasteText` | window | 6542 |
| `setState` | const-arrow | 2213 |
| `setTab` | window | 2226 |
| `showLineupComplements` | window | 2341 |
| `showMainShell` | function | 8222 |
| `socialDuoFocusLine` | function | 18014 |
| `socialEnsurePeriod` | function | 18000 |
| `socialFirstUseful` | function | 18004 |
| `socialKeyFactLine` | function | 18024 |
| `socialOpponentLine` | function | 18020 |
| `socialPlayerFocusLine` | function | 18007 |
| `socialSentence` | function | 17997 |
| `socialVideoJobsForMatchday` | function | 19542 |
| `specialTeamsStateFromActive` | function | 4181 |
| `stageSeasonDataPreview` | function | 6401 |
| `stageSeasonDataPreviewFromFile` | function | 6453 |
| `stageSeasonDataPreviewFromPaste` | function | 6467 |
| `startApp` | window | 8360 |
| `startEinsatzCenterDraftMode` | window | 7516 |
| `startHallOfFameIntro` | function | 8483 |
| `sumRoleGames` | function | 9368 |
| `switchMatchdaySeason` | window | 22095 |
| `switchOverviewSeason` | window | 22042 |
| `syncHashFromState` | function | 3344 |
| `t2s` | const-arrow | 2893 |
| `toggleAntiSynergyHideSgOnly` | window | 2363 |
| `toggleAntiSynergyShowAll` | window | 2362 |
| `toggleComparisonPicker` | window | 12997 |
| `toggleComparisonSgOnly` | window | 12982 |
| `toggleEinsatzCenterComboPlayer` | window | 7684 |
| `toggleEinsatzCenterGroupRename` | window | 7625 |
| `toggleEinsatzCenterRosterSuggestionPlayer` | window | 7556 |
| `toggleHallOfFamePureSGPlayers` | window | 2236 |
| `toggleLineupBuilderAvailable` | window | 2301 |
| `toggleMatchcenterDuoDetails` | window | 2232 |
| `toggleMatchcenterGames` | window | 8617 |
| `toggleMatchcenterPlayerDetails` | window | 2231 |
| `toggleMatchcenterSpecialTeamsGames` | window | 2230 |
| `toggleSgOnlyAlltime` | window | 2390 |
| `toggleSpecialTeamsGameDetails` | window | 2229 |
| `toggleToolMenu` | window | 22850 |
| `toolMenuElements` | function | 22825 |
| `toolMenuItemElements` | function | 22828 |
| `toolMenuOnClick` | function | 22886 |
| `toolMenuOnKeydown` | function | 22862 |
| `toPublicPlayerRegistry` | function | 3879 |
| `uiDeltaIndicator` | function | 21627 |
| `uiFormatNumber` | function | 21599 |
| `uiHinweisKarte` | function | 21691 |
| `uiInfoIcon` | function | 21645 |
| `uiIntervallBalken` | function | 21767 |
| `uiKennzahlKachel` | function | 21657 |
| `uiKernaussage` | function | 21677 |
| `uiMethodenbox` | function | 21786 |
| `uiNotiz` | function | 21803 |
| `uiObjektseite` | function | 21883 |
| `uiObjektseiteSortTabs` | function | 21865 |
| `uiPlatzhalter` | function | 21815 |
| `uiRangliste` | function | 21713 |
| `uiReliabilityDots` | function | 21612 |
| `uiVerlauf` | function | 21741 |
| `uniqueList` | function | 1848 |
| `updateCoverAllTimeStats` | function | 8249 |
| `updatePlayerRoleAvailability` | function | 4675 |
| `validateGameStructure` | function | 6162 |
| `validateMergedSeason` | function | 6249 |
| `validateSeasonGames` | function | 6203 |
| `validateSeasonKey` | function | 6226 |
| `validateWrapperFormat` | function | 6238 |
| `variance` | function | 2895 |
| `viewEinsatzCenterMergedView` | window | 7533 |
| `warnEventProcessingOnce` | function | 2590 |
| `withoutHashSync` | function | 3361 |

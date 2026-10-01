# Code-Karte: index.html

<!-- index-map: source-sha256=67756c1065d7485f56ee9b9bb8af63f96cf5807876d5e379128f281895af5b38 source-lines=24846 -->

Automatisch erzeugt von `scripts/build-index-map.mjs`. Nicht von Hand bearbeiten — bei Änderungen an index.html erneut ausführen: `node scripts/build-index-map.mjs --write`. Vor gezieltem Lesen prüfen, ob die Karte noch aktuell ist: `node scripts/build-index-map.mjs --check`.

index.html: 24846 Zeilen gesamt (SHA-256 `67756c1065d7485f56ee9b9bb8af63f96cf5807876d5e379128f281895af5b38`). Statischer `<style>`-Block: Zeile 8–1544. Haupt-`<script>`-Block: Zeile 1652–24842.

**Leseregel (siehe CLAUDE.md):** index.html nie vollständig laden. Diese Karte nennen, den gesuchten Namen im Register unten finden, dann nur den genannten Zeilenbereich lesen.

## Große Bereiche

Top-Level-Blöcke (Funktionen oder Daten-consts) ab 30 Zeilen oder 2000 Zeichen (z. B. `SEASON_CONFIG`). Das Zeichen-Kriterium existiert wegen des früheren `STATIC_SEASON_DATA`-Blocks — seit Token-Diät Teil 2 in `season-data-embedded.js` ausgelagert, siehe docs/season-data-import.md, deshalb unten nicht mehr gelistet:

| Name | Art | Zeile | Zeilen |
|---|---|---|---|
| `SEASON_CONFIG` | const-data | 1697–1788 | 92 |
| `TYPE_DESC` | const-data | 1891–1914 | 24 |
| `ROLE_TRAIT_COLORS` | const-data | 1999–2038 | 40 |
| `ROLE_TRAIT_TOOLTIPS` | const-data | 2060–2099 | 40 |
| `UI_TEXT_REPLACEMENTS` | const-data | 2503–2520 | 18 |
| `appendSeasonGameDiagnostics` | function | 2678–2727 | 50 |
| `resolveRosterPlayerByRef` | function | 2930–2960 | 31 |
| `processGame` | function | 3063–3120 | 58 |
| `classifyGameForStats` | function | 3174–3215 | 42 |
| `buildMatchdays` | function | 3333–3374 | 42 |
| `parseAppHash` | function | 3543–3574 | 32 |
| `applyAppHash` | function | 3781–3811 | 31 |
| `buildStandings` | function | 3892–3931 | 40 |
| `getOrCreatePlayerProfile` | function | 4063–4095 | 33 |
| `toPublicPlayerRegistry` | function | 4250–4279 | 30 |
| `aggregateAllTimePlayers` | function | 4281–4314 | 34 |
| `emptySpecialTeamsStats` | function | 4375–4415 | 41 |
| `mergeSpecialTeamsStats` | function | 4429–4458 | 30 |
| `buildSpecialTeamsForGame` | function | 4574–4767 | 194 |
| `addGoalieGameToStats` | function | 4827–4877 | 51 |
| `buildGoalieGameRecord` | function | 4879–4927 | 49 |
| `buildGoalieStatsForSeason` | function | 4929–5008 | 80 |
| `aggregateGoalieAlltimeStats` | function | 5010–5044 | 35 |
| `getAssistDiagnostics` | function | 5071–5123 | 53 |
| `buildPlayerEvents` | function | 5253–5337 | 85 |
| `computeMetrics` | function | 5357–5489 | 133 |
| `buildSoloDuoProfile` | function | 5511–5554 | 44 |
| `identityInputs` | function | 5641–5698 | 58 |
| `buildIdentityProfiles` | function | 5742–5973 | 232 |
| `assignStatus` | function | 6020–6205 | 186 |
| `fetchTextWithDiagnostics` | function | 6240–6269 | 30 |
| `fetchSeasonGameRaw` | function | 6305–6344 | 40 |
| `validateGameStructure` | function | 6554–6593 | 40 |
| `buildDryRunReport` | function | 6660–6722 | 63 |
| `stageSeasonDataPreview` | function | 6793–6844 | 52 |
| `rSeasonDataPreviewCard` | function | 6897–6932 | 36 |
| `computeEinsatzCenterStats` | function | 7126–7156 | 31 |
| `rEinsatzCenterStats` | function | 7163–7181 | 19 |
| `einsatzCenterDeserializeAutosave` | function | 7384–7417 | 34 |
| `rEinsatzCenterGroupEditor` | function | 7727–7757 | 31 |
| `rEinsatzCenterRosterSuggestionCard` | function | 7774–7804 | 31 |
| `rEinsatzCenterGameEditor` | function | 7805–7857 | 53 |
| `rEinsatzCenterEditPage` | function | 7858–7905 | 48 |
| `loadSeasonData` | function | 8153–8611 | 459 |
| `loadSeasonForGlobal` | function | 8651–8681 | 31 |
| `loadSeason` | function | 8699–8750 | 52 |
| `ensureHallOfFameIntroOverlay` | function | 8778–8810 | 33 |
| `rMatrix` | function | 9198–9242 | 45 |
| `rRadar` | function | 9275–9322 | 48 |
| `rClutch` | function | 9325–9357 | 33 |
| `rTimeline` | function | 9360–9468 | 109 |
| `rOppBreakdown` | function | 9490–9522 | 33 |
| `generatePlayerInsights` | function | 9525–9568 | 44 |
| `rInsights` | function | 9586–9637 | 52 |
| `buildGoalieAnalysisModel` | function | 9904–10062 | 159 |
| `buildGoalieRoleProfile` | function | 10127–10200 | 74 |
| `rGoalieInsights` | function | 10319–10340 | 22 |
| `buildOpponentIntelligence` | function | 10782–10835 | 54 |
| `buildBestThirdManOptions` | function | 10985–11015 | 31 |
| `getDuoDirectScorerGameCounts` | function | 11016–11047 | 32 |
| `buildAnnotatedGoalEventsForGame` | function | 11097–11197 | 101 |
| `buildResponseGoalStatsRaw` | function | 11240–11288 | 49 |
| `buildMomentumSwingStatsRaw` | function | 11301–11371 | 71 |
| `buildDuoFloorCeiling` | function | 11378–11419 | 42 |
| `buildDuoWithWithoutImpact` | function | 11515–11548 | 34 |
| `buildDuoCompatibility` | function | 11603–11625 | 23 |
| `buildDuoProAnalysis` | function | 11660–11703 | 44 |
| `rDuoCenterPro` | function | 11704–11818 | 115 |
| `rInteractiveDuoCenterPro` | function | 11893–11948 | 56 |
| `getDifficultConnectionRowsForPlayer` | function | 11952–11996 | 45 |
| `getRosterImpactPlayerGames` | function | 12039–12079 | 41 |
| `buildRosterImpactAnalysis` | function | 12105–12164 | 60 |
| `rDifficultConnectionList` | function | 12219–12243 | 25 |
| `rDifficultConnectionListCompactLegacy` | function | 12244–12285 | 42 |
| `rDifficultConnectionListCompact` | function | 12286–12324 | 39 |
| `rDifficultConnectionsCard` | function | 12325–12361 | 37 |
| `RESPONSE_MOMENTUM_TOOLTIPS` | const-data | 12364–12395 | 32 |
| `rResponseMomentumOverviewCard` | function | 12439–12462 | 24 |
| `rMatchcenterResponseMomentum` | function | 12509–12546 | 38 |
| `getTeamAllTimeRecords` | function | 12548–12588 | 41 |
| `getAllTimeIdentityStandings` | function | 12669–12703 | 35 |
| `buildRecencyWeightedGlobalIdentityProfile` | function | 12705–12752 | 48 |
| `rHallOfFameHero` | function | 12808–12833 | 26 |
| `hallGoalieRowFromStats` | function | 12931–12963 | 33 |
| `rHallGoalieRankCard` | function | 13016–13047 | 32 |
| `rHallGoalieLegends` | function | 13065–13097 | 33 |
| `buildDuoComparison` | function | 13492–13511 | 20 |
| `rDuoCompareSummaryCards` | function | 13517–13547 | 31 |
| `rDuoComparisonPage` | function | 13648–13658 | 11 |
| `buildComparisonExtraMetrics` | function | 13703–13760 | 58 |
| `buildGoalieComparisonDataset` | function | 13797–13847 | 51 |
| `buildComparisonDataset` | function | 13848–13883 | 36 |
| `rKpiMirrorRows` | function | 13909–13968 | 60 |
| `rKpiRadar` | function | 13980–14014 | 35 |
| `rKpiTrendCompare` | function | 14061–14127 | 67 |
| `rKpiOpponentStrength` | function | 14128–14155 | 28 |
| `rKpiInfoCards` | function | 14166–14197 | 32 |
| `buildComparisonSummary` | function | 14198–14229 | 32 |
| `rComparisonStyles` | function | 14267–14304 | 38 |
| `rComparisonCenterPage` | function | 14305–14355 | 51 |
| `rGlobalDnaBars` | function | 14396–14425 | 30 |
| `buildSeasonPlayerDashModel` | function | 14495–14531 | 37 |
| `buildAlltimePlayerDashModel` | function | 14532–14574 | 43 |
| `rPlayerDashStyles` | function | 14575–14586 | 12 |
| `rPlayerDash` | function | 14593–14631 | 39 |
| `rGlobalOverview` | function | 14690–14741 | 52 |
| `rGlobalDevelopment` | function | 14761–14799 | 39 |
| `rGlobalDuoNetwork` | function | 14861–15058 | 198 |
| `rGlobalOpponentSpecialist` | function | 15060–15105 | 46 |
| `buildFieldPlayerExplanation` | function | 15171–15245 | 75 |
| `buildGoaliePlayerExplanation` | function | 15246–15299 | 54 |
| `buildPlayerIntelligence` | function | 15309–15338 | 30 |
| `rPlayerExplanation` | function | 15344–15395 | 52 |
| `rAllTimePlayersPage` | function | 15397–15437 | 41 |
| `rHallOfFamePage` | function | 15439–15527 | 89 |
| `rLexiconPage` | function | 15554–15726 | 173 |
| `buildConfidence` | function | 15750–15795 | 46 |
| `getMatchcenterOpponents` | function | 16117–16149 | 33 |
| `getMatchcenterDirectOpponents` | function | 16150–16180 | 31 |
| `matchcenterAnalyzeDirect` | function | 16201–16237 | 37 |
| `matchcenterFinalizeOpponentPlayerProfiles` | function | 16384–16430 | 47 |
| `matchcenterBuildOpponentScouting` | function | 16431–16502 | 72 |
| `matchcenterEnsureUlmPlayer` | function | 16525–16562 | 38 |
| `matchcenterAddUlmScoring` | function | 16587–16624 | 38 |
| `matchcenterFinalizeUlmPlayers` | function | 16625–16693 | 69 |
| `matchcenterBuildUlmPlayerScouting` | function | 16694–16748 | 55 |
| `matchcenterEnsureOpponentDuo` | function | 16766–16798 | 33 |
| `matchcenterFinalizeOpponentDuos` | function | 16825–16859 | 35 |
| `matchcenterBuildOpponentDuos` | function | 16860–16904 | 45 |
| `matchcenterEnsureUlmDuo` | function | 16919–16956 | 38 |
| `matchcenterFinalizeUlmDuos` | function | 16976–17011 | 36 |
| `matchcenterBuildUlmDuos` | function | 17012–17054 | 43 |
| `matchcenterBuildSpecialTeamsMatchup` | function | 17088–17135 | 48 |
| `matchcenterBuildGoalieMatchup` | function | 17158–17200 | 43 |
| `matchcenterTimingStatsForGames` | function | 17233–17269 | 37 |
| `rMatchcenterUlmScouting` | function | 17615–17651 | 37 |
| `rMatchcenterOpponentScouting` | function | 17652–17687 | 36 |
| `rMatchcenterUlmDuos` | function | 17796–17838 | 43 |
| `rMatchcenterOpponentDuos` | function | 17839–17881 | 43 |
| `rMatchcenterSpecialTeams` | function | 17894–17943 | 50 |
| `matchcenterBuildPlanConfidence` | function | 18034–18068 | 35 |
| `matchcenterBuildIntelligenceDataQuality` | function | 18117–18167 | 51 |
| `matchcenterBuildOpponentDNA` | function | 18168–18280 | 113 |
| `matchcenterBuildOpponentAlarm` | function | 18347–18456 | 110 |
| `matchcenterBuildIntelligenceSignals` | function | 18503–18549 | 47 |
| `buildMatchIntelligenceFromContext` | function | 18550–18604 | 55 |
| `buildMatchStories` | function | 18653–18682 | 30 |
| `buildDigitalCoachReport` | function | 18753–18785 | 33 |
| `buildMatchdayCaptionBlocks` | function | 18857–18886 | 30 |
| `buildSocialMediaContent` | function | 18887–18935 | 49 |
| `lineupRosterGamesForPlayer` | function | 19003–19050 | 48 |
| `buildLineupExperienceProfile` | function | 19051–19093 | 43 |
| `buildLineupOpponentDNAFit` | function | 19106–19149 | 44 |
| `classifyLineIdentity` | function | 19150–19197 | 48 |
| `lineupPlayerProfile` | function | 19198–19273 | 76 |
| `buildLineupAnalysis` | function | 19274–19407 | 134 |
| `buildLineupScoreBreakdowns` | function | 19408–19437 | 30 |
| `lineupEvaluateComplementCandidate` | function | 19521–19598 | 78 |
| `buildTeamLineBalance` | function | 19617–19660 | 44 |
| `buildLineupRecommendations` | function | 19695–19773 | 79 |
| `matchcenterBuildMatchPlan` | function | 19802–19947 | 146 |
| `rMatchcenterOpponentDNA` | function | 19982–20014 | 33 |
| `rMatchcenterIntelOverview` | function | 20037–20082 | 46 |
| `rMatchcenterDigitalCoach` | function | 20124–20188 | 65 |
| `rMatchcenterLockerRoomSheet` | function | 20206–20261 | 56 |
| `downloadMatchdayStory` | window | 20280–20327 | 48 |
| `rSocialVideoBlock` | function | 20331–20362 | 32 |
| `generateSocialVideoVideos` | window | 20372–20413 | 42 |
| `rMatchcenterSocialMediaCenter` | function | 20459–20512 | 54 |
| `rMatchcenterLineupBuilder` | function | 20544–20616 | 73 |
| `rLineupBuilderAvailablePanel` | function | 20631–20678 | 48 |
| `rLineupRecommendationMode` | function | 20694–20727 | 34 |
| `rLineupTestLine` | function | 20741–20789 | 49 |
| `rLineupBuilderPage` | function | 20807–20840 | 34 |
| `rMatchcenterScoutingSummary` | function | 20841–20884 | 44 |
| `getTeamLogoUrlForStory` | function | 20938–20967 | 30 |
| `matchcenterStoryPlayer` | function | 21047–21079 | 33 |
| `matchcenterStoryPickFactItems` | function | 21147–21199 | 53 |
| `buildMatchcenterStoryPreviewData` | function | 21423–21534 | 112 |
| `matchcenterStoryVisibleFacts` | function | 21541–21571 | 31 |
| `rMatchcenterStoryPreview` | function | 21590–21659 | 70 |
| `fitMatchcenterStoryLayout` | function | 21666–21708 | 43 |
| `socialVideoDistributeSceneDurations` | function | 21758–21789 | 32 |
| `socialVideoTopScorerAsOf` | function | 21898–21927 | 30 |
| `socialVideoOpponentSceneData` | function | 21930–21977 | 48 |
| `socialVideoBuildStorySpec` | function | 21994–22045 | 52 |
| `socialVideoBuildFeedSpec` | function | 22048–22097 | 50 |
| `socialVideoLayoutScene` | function | 22276–22340 | 65 |
| `socialVideoBackgroundLayer` | function | 22344–22380 | 37 |
| `socialVideoDrawCommand` | function | 22460–22520 | 61 |
| `socialVideoCaptureVideo` | function | 22650–22712 | 63 |
| `rMatchcenterPage` | function | 22777–22924 | 148 |
| `rTeamPage` | function | 22925–23235 | 311 |
| `_render` | function | 23285–23449 | 165 |
| `uiObjektseite` | function | 23767–23800 | 34 |
| `rMatchdayDetailPage` | function | 24020–24055 | 36 |
| `buildOverviewCards` | function | 24297–24337 | 41 |

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

1157 `function`-Deklarationen, 134 `window.`-Funktionszuweisungen, 4 `const`-Pfeilfunktionen — alle Top-Level, sortiert nach Zeile.

| Name | Art | Zeile | Zeilen |
|---|---|---|---|
| `createSeasonBucket` | function | 1789–1803 | 15 |
| `getSeasonApiBaseUrl` | function | 1814–1830 | 17 |
| `seasonApiUrl` | function | 1831–1833 | 3 |
| `getSeasonOriginBaseUrl` | function | 1834–1842 | 9 |
| `seasonPathPrefix` | function | 1843–1845 | 3 |
| `uniqueList` | function | 1846–1848 | 3 |
| `seasonGameApiUrls` | function | 1849–1858 | 10 |
| `seasonGameHtmlUrls` | function | 1859–1866 | 8 |
| `clearAnalysisCache` | function | 2164–2166 | 3 |
| `analysisCacheContext` | function | 2167–2181 | 15 |
| `asOfCacheKeyPart` | function | 2195–2200 | 6 |
| `analysisCacheKey` | function | 2201–2204 | 4 |
| `cachedAnalysis` | function | 2205–2210 | 6 |
| `setState` | const-arrow | 2211–2218 | 8 |
| `invalidateGlobalIdentityCache` | function | 2219–2221 | 3 |
| `setP` | window | 2223–2223 | 1 |
| `setTab` | window | 2224–2224 | 1 |
| `setPlayerRoleView` | window | 2225–2225 | 1 |
| `setGoalieTab` | window | 2226–2226 | 1 |
| `toggleSpecialTeamsGameDetails` | window | 2227–2227 | 1 |
| `toggleMatchcenterSpecialTeamsGames` | window | 2228–2228 | 1 |
| `toggleMatchcenterPlayerDetails` | window | 2229–2229 | 1 |
| `toggleMatchcenterDuoDetails` | window | 2230–2230 | 1 |
| `setMatchcenterTab` | window | 2231–2231 | 1 |
| `openMatchcenterStoryPreview` | window | 2232–2232 | 1 |
| `closeMatchcenterStoryPreview` | window | 2233–2233 | 1 |
| `toggleHallOfFamePureSGPlayers` | window | 2234–2234 | 1 |
| `copyMatchcenterText` | window | 2235–2260 | 26 |
| `addLineupPlayer` | window | 2261–2266 | 6 |
| `removeLineupPlayer` | window | 2267–2267 | 1 |
| `clearLineupPlayers` | window | 2268–2268 | 1 |
| `filterLineupPlayers` | window | 2269–2275 | 7 |
| `lineupBuilderPoolIds` | function | 2276–2278 | 3 |
| `normalizeLineupLines` | function | 2279–2283 | 5 |
| `setLineupBuilderSeason` | window | 2284–2295 | 12 |
| `setLineupBuilderOpponent` | window | 2296–2296 | 1 |
| `setLineupBuilderMode` | window | 2297–2297 | 1 |
| `setLineupActiveLine` | window | 2298–2298 | 1 |
| `toggleLineupBuilderAvailable` | window | 2299–2312 | 14 |
| `selectAllLineupAvailable` | window | 2313–2313 | 1 |
| `clearLineupAvailable` | window | 2314–2314 | 1 |
| `addLineupBuilderPlayerToLine` | window | 2315–2324 | 10 |
| `addLineupBuilderPlayerToActiveLine` | window | 2325–2325 | 1 |
| `removeLineupBuilderPlayerFromLine` | window | 2326–2332 | 7 |
| `clearLineupBuilderLine` | window | 2333–2338 | 6 |
| `showLineupComplements` | window | 2339–2339 | 1 |
| `setLineupNewPlayerProfile` | window | 2340–2340 | 1 |
| `addSyntheticLineupPlayer` | window | 2341–2358 | 18 |
| `setAntiSynergyView` | window | 2359–2359 | 1 |
| `toggleAntiSynergyShowAll` | window | 2360–2360 | 1 |
| `toggleAntiSynergyHideSgOnly` | window | 2361–2361 | 1 |
| `filterLineupBuilderAvailable` | window | 2362–2368 | 7 |
| `setPage` | window | 2369–2377 | 9 |
| `backToHome` | window | 2378–2384 | 7 |
| `setGlobalPlayer` | window | 2385–2385 | 1 |
| `setGlobalPlayerDuo` | window | 2386–2386 | 1 |
| `setGlobalTab` | window | 2387–2387 | 1 |
| `toggleSgOnlyAlltime` | window | 2388–2388 | 1 |
| `getActiveSeasonKey` | function | 2390–2392 | 3 |
| `getSeasonData` | function | 2393–2421 | 29 |
| `getGlobalAllTimeSnapshot` | function | 2422–2429 | 8 |
| `applySeasonContext` | function | 2430–2453 | 24 |
| `mojibakeScore` | function | 2466–2470 | 5 |
| `decodeCp1252AsUtf8` | function | 2471–2484 | 14 |
| `repairMojibake` | function | 2485–2502 | 18 |
| `fixKnownUiTransliterations` | function | 2521–2525 | 5 |
| `cleanText` | function | 2526–2528 | 3 |
| `fixMojibakeText` | function | 2529–2531 | 3 |
| `repairRenderedMojibake` | function | 2532–2553 | 22 |
| `normalizeTeamName` | function | 2554–2563 | 10 |
| `normalizeOpponentNameForAllTime` | function | 2564–2574 | 11 |
| `isFreiburgTuebingenSgName` | function | 2575–2577 | 3 |
| `isMannheimLudwigshafenSgName` | function | 2578–2580 | 3 |
| `getAllTimeOpponentNames` | function | 2581–2588 | 8 |
| `getUniqueAllTimeOpponentNames` | function | 2589–2591 | 3 |
| `isUlmTeamName` | function | 2593–2598 | 6 |
| `getUlmTeamStatus` | function | 2599–2603 | 5 |
| `detectUlmSide` | function | 2604–2610 | 7 |
| `detectSide` | const-arrow | 2611–2611 | 1 |
| `pFull` | function | 2612–2618 | 7 |
| `normalizePlayerDisplayName` | function | 2619–2634 | 16 |
| `normalizePlayerName` | function | 2635–2644 | 10 |
| `getPreClubHistoryPlayerNames` | function | 2645–2647 | 3 |
| `isPreClubHistoryPlayerName` | function | 2648–2652 | 5 |
| `gameStableId` | function | 2653–2655 | 3 |
| `diagnoseGameDuplicates` | function | 2656–2669 | 14 |
| `gameClassificationStatusLabel` | function | 2670–2677 | 8 |
| `appendSeasonGameDiagnostics` | function | 2678–2727 | 50 |
| `warnEventProcessingOnce` | function | 2729–2736 | 8 |
| `rosterPlayerMatches` | function | 2737–2751 | 15 |
| `getRosterGameIdsForPlayer` | function | 2752–2760 | 9 |
| `isGoalieRosterEntry` | function | 2761–2765 | 5 |
| `goalieEntryRecognitionReason` | function | 2775–2784 | 10 |
| `isExcludedGoalieAppearance` | function | 2785–2798 | 14 |
| `isGoalieAppearance` | function | 2799–2804 | 6 |
| `isFieldAppearance` | function | 2805–2810 | 6 |
| `getFieldGameIdsForPlayer` | function | 2811–2817 | 7 |
| `getGoalieGameIdsForPlayer` | function | 2818–2824 | 7 |
| `getPlayerFieldGames` | function | 2825–2828 | 4 |
| `getPlayerGoalieGames` | function | 2829–2832 | 4 |
| `roleGameStableKey` | function | 2833–2835 | 3 |
| `getPlayerAlltimeRoleGames` | function | 2836–2854 | 19 |
| `getPlayerAlltimeFieldGames` | function | 2855–2857 | 3 |
| `getPlayerAlltimeGoalieGames` | function | 2858–2860 | 3 |
| `getPlayerAlltimeTotalGames` | function | 2861–2869 | 9 |
| `getPlayerSeasonRoleGameSummary` | function | 2870–2892 | 23 |
| `getPlayedUlmGames` | function | 2893–2901 | 9 |
| `countPlayedUlmGames` | function | 2902–2904 | 3 |
| `getSeasonTeamGames` | function | 2905–2908 | 4 |
| `getSeasonTeamGameIds` | function | 2909–2911 | 3 |
| `getPlayerSourceId` | function | 2912–2914 | 3 |
| `getJerseyNumber` | function | 2915–2917 | 3 |
| `normalizeEventPlayerRef` | function | 2918–2929 | 12 |
| `resolveRosterPlayerByRef` | function | 2930–2960 | 31 |
| `resolveGoalScorerPlayer` | function | 2961–2975 | 15 |
| `getGoalScorerFromEvent` | function | 2976–2978 | 3 |
| `normalizeAssistPlayerName` | function | 2979–2981 | 3 |
| `collectAssistEventRefs` | function | 2982–3009 | 28 |
| `getAssistPlayersFromEvent` | function | 3010–3023 | 14 |
| `resolveAssistPlayer` | function | 3024–3030 | 7 |
| `parseGameClock` | function | 3031–3040 | 10 |
| `t2s` | const-arrow | 3041–3041 | 1 |
| `getPhaseKey` | function | 3042–3053 | 12 |
| `variance` | function | 3054–3058 | 5 |
| `processGame` | function | 3063–3120 | 58 |
| `isGamePlayed` | function | 3122–3124 | 3 |
| `isYouthGame` | function | 3127–3135 | 9 |
| `gameStatusText` | function | 3137–3143 | 7 |
| `gameScore` | function | 3144–3153 | 10 |
| `isGameAtOrBeforeAsOf` | function | 3163–3173 | 11 |
| `classifyGameForStats` | function | 3174–3215 | 42 |
| `getRelevantSeasonGames` | function | 3216–3235 | 20 |
| `deriveAsOfForSeason` | function | 3248–3251 | 4 |
| `getSeasonStatsAsOf` | function | 3286–3297 | 12 |
| `compareGamesChronologically` | function | 3312–3325 | 14 |
| `buildMatchdays` | function | 3333–3374 | 42 |
| `getSeasonMatchdays` | function | 3383–3387 | 5 |
| `matchdayAsOfCutoff` | function | 3396–3404 | 9 |
| `formatDateDE` | function | 3406–3409 | 4 |
| `seasonKeyToHashSegment` | function | 3433–3435 | 3 |
| `hashSegmentToSeasonKey` | function | 3436–3439 | 4 |
| `isValidAsOfDate` | function | 3440–3442 | 3 |
| `isValidAsOfStartTime` | function | 3443–3445 | 3 |
| `asOfEquals` | function | 3452–3459 | 8 |
| `decodeHashSegmentSafe` | function | 3523–3525 | 3 |
| `parseAppHash` | function | 3543–3574 | 32 |
| `parseAsOfQueryValue` | function | 3582–3592 | 11 |
| `buildAppHash` | function | 3598–3610 | 13 |
| `buildGlobalPageHash` | function | 3615–3624 | 10 |
| `buildHashStringFromParsed` | function | 3630–3634 | 5 |
| `computeCurrentAppHash` | function | 3650–3662 | 13 |
| `syncHashFromState` | function | 3676–3686 | 11 |
| `withoutHashSync` | function | 3693–3701 | 9 |
| `parseLastViewState` | function | 3717–3728 | 12 |
| `getStoredLastView` | function | 3729–3732 | 4 |
| `saveLastView` | function | 3734–3736 | 3 |
| `applyGlobalPageFromHash` | function | 3748–3768 | 21 |
| `applyAppHash` | function | 3781–3811 | 31 |
| `initHashRouting` | function | 3860–3878 | 19 |
| `gameResult` | function | 3881–3887 | 7 |
| `buildStandings` | function | 3892–3931 | 40 |
| `getOppStrength` | function | 3933–3939 | 7 |
| `createPlayerAnalysisProfile` | function | 3951–3953 | 3 |
| `emptyPlayerSeasonStats` | function | 3955–3960 | 6 |
| `emptyGoalieSeasonStats` | function | 3961–3982 | 22 |
| `emptyGoalieAlltimeStats` | function | 3983–3997 | 15 |
| `emptyGoalieSpecialTeamsStats` | function | 3998–4009 | 12 |
| `emptyFieldRoleSeasonStats` | function | 4010–4012 | 3 |
| `addUnique` | function | 4014–4016 | 3 |
| `incrementUniqueCounter` | function | 4018–4023 | 6 |
| `buildPlayerIdentity` | function | 4025–4040 | 16 |
| `resetPlayerRegistrySeason` | function | 4042–4052 | 11 |
| `derivePlayerStatus` | function | 4054–4061 | 8 |
| `getOrCreatePlayerProfile` | function | 4063–4095 | 33 |
| `registerPlayerIdentity` | function | 4097–4113 | 17 |
| `ensureGoalieSeasonStats` | function | 4115–4119 | 5 |
| `ensureFieldRoleSeasonStats` | function | 4120–4124 | 5 |
| `markFieldRoleAppearance` | function | 4125–4128 | 4 |
| `registerSeasonRosters` | function | 4130–4148 | 19 |
| `linkUiPlayersToRegistry` | function | 4150–4170 | 21 |
| `applySeasonScoringToRegistry` | function | 4172–4193 | 22 |
| `finalizePlayerRegistrySeason` | function | 4195–4209 | 15 |
| `serializeSeasonStats` | function | 4211–4223 | 13 |
| `serializeGoalieSeasonStats` | function | 4224–4245 | 22 |
| `serializeFieldRoleSeasonStats` | function | 4246–4248 | 3 |
| `toPublicPlayerRegistry` | function | 4250–4279 | 30 |
| `aggregateAllTimePlayers` | function | 4281–4314 | 34 |
| `finiteNumbers` | function | 4316–4318 | 3 |
| `avgOrNull` | function | 4319–4322 | 4 |
| `medianOrNull` | function | 4323–4328 | 6 |
| `incGoalieBucket` | function | 4329–4332 | 4 |
| `goalieEventAbsSeconds` | function | 4333–4338 | 6 |
| `goalieGameDurationSeconds` | function | 4339–4343 | 5 |
| `goalieGameStateBeforeGoal` | function | 4344–4355 | 12 |
| `getGoalieOpponentName` | function | 4356–4359 | 4 |
| `getGoalieOpponentTier` | function | 4360–4364 | 5 |
| `resultGoalsAgainstForSide` | function | 4365–4374 | 10 |
| `emptySpecialTeamsStats` | function | 4375–4415 | 41 |
| `clonePlain` | function | 4416–4418 | 3 |
| `finalizeSpecialTeamsStats` | function | 4419–4425 | 7 |
| `serializeSpecialTeamsStats` | function | 4426–4428 | 3 |
| `mergeSpecialTeamsStats` | function | 4429–4458 | 30 |
| `penaltyRawText` | function | 4461–4463 | 3 |
| `isMatchPenaltyEvent` | function | 4464–4467 | 4 |
| `isTwoPlusTwoPenaltyEvent` | function | 4468–4471 | 4 |
| `getPenaltyDisciplineType` | function | 4472–4479 | 8 |
| `getGameDurationMinutes` | function | 4480–4484 | 5 |
| `gameDaySortValue` | function | 4485–4492 | 8 |
| `isSameUlmTeamContext` | function | 4493–4500 | 8 |
| `getFurtherSameDayUlmGames` | function | 4501–4512 | 12 |
| `getPenaltySpecialTeamsMinutes` | function | 4513–4515 | 3 |
| `getPenaltyBasePersonalMinutes` | function | 4516–4523 | 8 |
| `getPenaltyPersonalMinutes` | function | 4524–4533 | 10 |
| `getPenaltyDisciplineMinutes` | function | 4534–4536 | 3 |
| `getSpecialTeamsPenaltyChunks` | function | 4537–4546 | 10 |
| `isPenaltyGoalEvent` | function | 4547–4551 | 5 |
| `specialTeamsStateFromActive` | function | 4552–4558 | 7 |
| `annotateSpecialTeamsGoalEvent` | function | 4559–4573 | 15 |
| `buildSpecialTeamsForGame` | function | 4574–4767 | 194 |
| `buildSpecialTeamsForSeason` | function | 4768–4776 | 9 |
| `aggregateAlltimeSpecialTeams` | function | 4777–4784 | 8 |
| `mergeGoalieSpecialTeamsStats` | function | 4785–4796 | 12 |
| `addGoalieSpecialTeamsGameToStats` | function | 4797–4811 | 15 |
| `finalizeGoalieSeasonStats` | function | 4812–4826 | 15 |
| `addGoalieGameToStats` | function | 4827–4877 | 51 |
| `buildGoalieGameRecord` | function | 4879–4927 | 49 |
| `buildGoalieStatsForSeason` | function | 4929–5008 | 80 |
| `aggregateGoalieAlltimeStats` | function | 5010–5044 | 35 |
| `updatePlayerRoleAvailability` | function | 5046–5055 | 10 |
| `getGoalieDiagnostics` | function | 5057–5062 | 6 |
| `getSpecialTeamsDiagnostics` | function | 5064–5069 | 6 |
| `getAssistDiagnostics` | function | 5071–5123 | 53 |
| `buildSeasonDuos` | function | 5126–5152 | 27 |
| `mergeDuoSet` | function | 5153–5169 | 17 |
| `aggregateAllTimeDuos` | function | 5170–5180 | 11 |
| `aggregateSeasonStats` | function | 5182–5197 | 16 |
| `buildPlayerDataFoundation` | function | 5199–5220 | 22 |
| `buildRegistry` | function | 5222–5248 | 27 |
| `buildPlayerEvents` | function | 5253–5337 | 85 |
| `getPhaseIndex` | function | 5342–5352 | 11 |
| `computeMetrics` | function | 5357–5489 | 133 |
| `detectTypes` | function | 5491–5506 | 16 |
| `pct` | function | 5508–5508 | 1 |
| `ratio01` | function | 5509–5509 | 1 |
| `relative01` | function | 5510–5510 | 1 |
| `buildSoloDuoProfile` | function | 5511–5554 | 44 |
| `identityPartnerStats` | function | 5555–5568 | 14 |
| `identityOpponentGroups` | function | 5569–5576 | 8 |
| `eventMatchesTeams` | function | 5577–5582 | 6 |
| `clutchText` | function | 5583–5583 | 1 |
| `isImportantClutchGoal` | function | 5584–5588 | 5 |
| `isDecisiveGoal` | function | 5589–5591 | 3 |
| `isLateGoal` | function | 5592–5596 | 5 |
| `isComebackRelevantGoal` | function | 5597–5600 | 4 |
| `identityPointsVsTeams` | function | 5601–5603 | 3 |
| `identityGoalsVsTeams` | function | 5604–5606 | 3 |
| `identityClutchGoalsVsTeams` | function | 5607–5609 | 3 |
| `identityDecisiveGoalsVsTeams` | function | 5610–5612 | 3 |
| `identityLateGoalsVsTeams` | function | 5613–5615 | 3 |
| `countMomentumClusters` | function | 5616–5640 | 25 |
| `identityInputs` | function | 5641–5698 | 58 |
| `clearlyAboveAverage` | function | 5699–5699 | 1 |
| `normalizeSecondaryTraits` | function | 5700–5711 | 12 |
| `seasonRoleTraitsFromClassic` | function | 5712–5716 | 5 |
| `seasonRoleKeysForPlayer` | function | 5717–5725 | 9 |
| `hasSeasonRole` | function | 5726–5728 | 3 |
| `selectEnforcerKeys` | function | 5729–5741 | 13 |
| `buildIdentityProfiles` | function | 5742–5973 | 232 |
| `composeIdentityText` | function | 5974–5980 | 7 |
| `countCaptainAppearances` | function | 5982–5994 | 13 |
| `countGoalieAppearances` | function | 5996–5998 | 3 |
| `computeRosterStatus` | function | 6000–6018 | 19 |
| `assignStatus` | function | 6020–6205 | 186 |
| `fetchJsonLegacy` | function | 6211–6230 | 20 |
| `responseExcerpt` | function | 6232–6234 | 3 |
| `diagnosticError` | function | 6235–6239 | 5 |
| `fetchTextWithDiagnostics` | function | 6240–6269 | 30 |
| `fetchJsonWithDiagnostics` | function | 6270–6278 | 9 |
| `fetchJson` | function | 6279–6282 | 4 |
| `formatStatus` | function | 6283–6285 | 3 |
| `formatDiagnosticAttempt` | function | 6286–6298 | 13 |
| `formatGameLoadError` | function | 6299–6304 | 6 |
| `fetchSeasonGameRaw` | function | 6305–6344 | 40 |
| `normalizeGame` | function | 6347–6368 | 22 |
| `getStaticSeasonGames` | function | 6369–6372 | 4 |
| `loadSeasonManifest` | function | 6384–6400 | 17 |
| `resolveCurrentSeasonKey` | function | 6416–6435 | 20 |
| `applyCurrentSeasonCoverHighlight` | function | 6436–6440 | 5 |
| `isUsableExternalSeasonData` | function | 6453–6461 | 9 |
| `ensureExternalSeasonData` | function | 6462–6483 | 22 |
| `buildStaticSeasonDataBlock` | function | 6484–6493 | 10 |
| `getGameId` | function | 6520–6524 | 5 |
| `findDuplicateGameIds` | function | 6526–6536 | 11 |
| `validateGameStructure` | function | 6554–6593 | 40 |
| `validateSeasonGames` | function | 6595–6605 | 11 |
| `diffGameIds` | function | 6607–6616 | 10 |
| `validateSeasonKey` | function | 6618–6628 | 11 |
| `validateWrapperFormat` | function | 6630–6639 | 10 |
| `validateMergedSeason` | function | 6641–6658 | 18 |
| `buildDryRunReport` | function | 6660–6722 | 63 |
| `seasonDataPreviewRerender` | function | 6743–6745 | 3 |
| `seasonDataPreviewRow` | function | 6747–6758 | 12 |
| `buildSeasonDataPreviewChanges` | function | 6765–6782 | 18 |
| `stageSeasonDataPreview` | function | 6793–6844 | 52 |
| `stageSeasonDataPreviewFromFile` | function | 6845–6858 | 14 |
| `stageSeasonDataPreviewFromPaste` | function | 6859–6863 | 5 |
| `discardSeasonDataPreview` | function | 6864–6868 | 5 |
| `getSeasonDataPreview` | function | 6870–6872 | 3 |
| `isSeasonDataPreviewStale` | function | 6878–6882 | 5 |
| `rSeasonDataPreviewStatus` | function | 6884–6886 | 3 |
| `rSeasonDataPreviewRows` | function | 6887–6895 | 9 |
| `rSeasonDataPreviewCard` | function | 6897–6932 | 36 |
| `setSeasonDataPreviewOpen` | window | 6933–6933 | 1 |
| `setSeasonDataPreviewPasteText` | window | 6934–6934 | 1 |
| `fileNameForLineupSeasonKey` | function | 6954–6956 | 3 |
| `ensureLineupDataLoaded` | function | 6972–6988 | 17 |
| `ensureLineupGroupsRegistryLoaded` | function | 6997–7013 | 17 |
| `resolveLineupPlayerName` | function | 7025–7028 | 4 |
| `findLineupGameContext` | function | 7031–7038 | 8 |
| `rEinsatzCenterGroup` | function | 7040–7051 | 12 |
| `rEinsatzCenterCombo` | function | 7053–7060 | 8 |
| `rEinsatzCenterGameCard` | function | 7062–7079 | 18 |
| `rEinsatzCenterPage` | function | 7081–7100 | 20 |
| `setEinsatzCenterSeason` | window | 7102–7107 | 6 |
| `openEinsatzCenter` | window | 7108–7115 | 8 |
| `computeEinsatzCenterStats` | function | 7126–7156 | 31 |
| `lineupGroupDisplayName` | function | 7157–7162 | 6 |
| `rEinsatzCenterStats` | function | 7163–7181 | 19 |
| `getEffectiveLineupData` | function | 7239–7246 | 8 |
| `isEinsatzCenterGameFromDraft` | function | 7248–7251 | 4 |
| `einsatzCenterDraftInView` | function | 7253–7256 | 4 |
| `rEinsatzCenterDraftMark` | function | 7257–7260 | 4 |
| `rEinsatzCenterDraftStatsHint` | function | 7261–7265 | 5 |
| `einsatzCenterDraftStaleHint` | function | 7267–7269 | 3 |
| `rEinsatzCenterDraftBanner` | function | 7271–7278 | 8 |
| `ensureEinsatzCenterDraft` | function | 7289–7302 | 14 |
| `getEinsatzCenterGameDraft` | function | 7311–7322 | 12 |
| `einsatzCenterAutosaveKey` | function | 7349–7349 | 1 |
| `einsatzCenterStorageRead` | function | 7350–7352 | 3 |
| `einsatzCenterStorageWrite` | function | 7353–7355 | 3 |
| `einsatzCenterStorageRemove` | function | 7356–7358 | 3 |
| `einsatzCenterDraftIsEmpty` | function | 7361–7363 | 3 |
| `einsatzCenterSerializeDraft` | function | 7365–7377 | 13 |
| `einsatzCenterIsPlainObject` | function | 7378–7378 | 1 |
| `einsatzCenterDeserializeAutosave` | function | 7384–7417 | 34 |
| `einsatzCenterCurrentRawBaseHash` | function | 7424–7429 | 6 |
| `einsatzCenterAutosaveDraft` | function | 7438–7465 | 28 |
| `einsatzCenterInspectAutosave` | function | 7473–7501 | 29 |
| `restoreEinsatzCenterAutosave` | function | 7504–7520 | 17 |
| `discardEinsatzCenterAutosave` | function | 7522–7527 | 6 |
| `rEinsatzCenterAutosaveBanner` | function | 7530–7542 | 13 |
| `einsatzCenterAutosaveInfoText` | function | 7544–7554 | 11 |
| `loadEinsatzCenterMismatchedAutosave` | function | 7568–7586 | 19 |
| `deriveLineupValidPlayerIds` | function | 7599–7615 | 17 |
| `deriveLineupUlmPlayerIds` | function | 7623–7639 | 17 |
| `getSeasonmanagerRosterSuggestion` | function | 7653–7673 | 21 |
| `einsatzCenterCanonicalJson` | function | 7682–7691 | 10 |
| `einsatzCenterSha256Hex` | function | 7692–7696 | 5 |
| `einsatzCenterComputeBaseHash` | function | 7697–7699 | 3 |
| `einsatzCenterSoftIssues` | function | 7706–7724 | 19 |
| `rEinsatzCenterGroupEditor` | function | 7727–7757 | 31 |
| `rEinsatzCenterComboEditor` | function | 7758–7764 | 7 |
| `rEinsatzCenterRosterSuggestionCard` | function | 7774–7804 | 31 |
| `rEinsatzCenterGameEditor` | function | 7805–7857 | 53 |
| `rEinsatzCenterEditPage` | function | 7858–7905 | 48 |
| `startEinsatzCenterDraftMode` | window | 7908–7912 | 5 |
| `cancelEinsatzCenterEdit` | window | 7913–7923 | 11 |
| `viewEinsatzCenterMergedView` | window | 7925–7925 | 1 |
| `returnToEinsatzCenterEdit` | window | 7926–7926 | 1 |
| `setEinsatzCenterIncludeDraft` | window | 7927–7927 | 1 |
| `selectEinsatzCenterEditGame` | window | 7928–7931 | 4 |
| `addEinsatzCenterRosterPlayer` | window | 7932–7939 | 8 |
| `removeEinsatzCenterRosterPlayer` | window | 7940–7947 | 8 |
| `toggleEinsatzCenterRosterSuggestionPlayer` | window | 7948–7954 | 7 |
| `dismissEinsatzCenterRosterSuggestion` | window | 7955–7958 | 4 |
| `acceptEinsatzCenterRosterSuggestion` | window | 7966–7982 | 17 |
| `addEinsatzCenterExistingGroup` | window | 7983–7991 | 9 |
| `addEinsatzCenterNewGroup` | window | 7992–8008 | 17 |
| `removeEinsatzCenterGroup` | window | 8009–8016 | 8 |
| `toggleEinsatzCenterGroupRename` | window | 8017–8019 | 3 |
| `renameEinsatzCenterGroup` | window | 8031–8050 | 20 |
| `addEinsatzCenterGroupPlayer` | window | 8051–8058 | 8 |
| `removeEinsatzCenterGroupPlayer` | window | 8059–8066 | 8 |
| `setEinsatzCenterGroupPlayerPosition` | window | 8067–8075 | 9 |
| `toggleEinsatzCenterComboPlayer` | window | 8076–8083 | 8 |
| `confirmEinsatzCenterCombo` | window | 8084–8094 | 11 |
| `removeEinsatzCenterCombo` | window | 8095–8101 | 7 |
| `setEinsatzCenterGameNote` | window | 8102–8108 | 7 |
| `buildEinsatzCenterDraftExport` | function | 8112–8125 | 14 |
| `exportEinsatzCenterDraft` | window | 8126–8138 | 13 |
| `loadSeasonData` | function | 8153–8611 | 459 |
| `showMainShell` | function | 8614–8618 | 5 |
| `hasSeasonSource` | function | 8619–8622 | 4 |
| `hasEmbeddedSeasonData` | function | 8623–8625 | 3 |
| `getGlobalLoadableSeasonKeys` | function | 8626–8632 | 7 |
| `getAllTimeCoverStats` | function | 8633–8640 | 8 |
| `updateCoverAllTimeStats` | function | 8641–8649 | 9 |
| `loadSeasonForGlobal` | function | 8651–8681 | 31 |
| `ensureGlobalDataLoaded` | function | 8682–8697 | 16 |
| `loadSeason` | function | 8699–8750 | 52 |
| `startApp` | window | 8752–8763 | 12 |
| `ensureAppLoaded` | function | 8754–8763 | 10 |
| `openSeason` | window | 8764–8766 | 3 |
| `openAllTimePlayers` | window | 8767–8772 | 6 |
| `hofIntroDelay` | function | 8775–8777 | 3 |
| `ensureHallOfFameIntroOverlay` | function | 8778–8810 | 33 |
| `buildHallOfFameIntroTitle` | function | 8811–8821 | 11 |
| `seedHallOfFameIntroParticles` | function | 8822–8839 | 18 |
| `cleanupHallOfFameIntro` | function | 8840–8854 | 15 |
| `restoreHallOfFameIntroPrevious` | function | 8855–8866 | 12 |
| `finishHallOfFameIntro` | function | 8867–8874 | 8 |
| `startHallOfFameIntro` | function | 8875–8899 | 25 |
| `cancelHallOfFameIntro` | function | 8900–8911 | 12 |
| `openHallOfFame` | window | 8913–8936 | 24 |
| `openComparisonCenter` | window | 8937–8965 | 29 |
| `openMatchcenter` | window | 8966–8987 | 22 |
| `openLineupBuilder` | window | 8988–9005 | 18 |
| `setMatchcenterOpponent` | window | 9006–9006 | 1 |
| `setMatchcenterContext` | window | 9007–9007 | 1 |
| `setMatchcenterSeason` | window | 9008–9008 | 1 |
| `toggleMatchcenterGames` | window | 9009–9009 | 1 |
| `openLexicon` | window | 9010–9013 | 4 |
| `rRes` | const-arrow | 9018–9018 | 1 |
| `rClutchBadge` | function | 9019–9026 | 8 |
| `escAttr` | function | 9027–9029 | 3 |
| `roleTraitLabel` | function | 9030–9032 | 3 |
| `isVisibleSecondaryTrait` | function | 9033–9036 | 4 |
| `rRoleTraitTip` | function | 9037–9041 | 5 |
| `rStyleMetricTip` | function | 9042–9045 | 4 |
| `rRosterStatusBadge` | function | 9046–9053 | 8 |
| `classicTagLabel` | function | 9054–9056 | 3 |
| `rClassicTagTip` | function | 9057–9061 | 5 |
| `fallbackIdentityProfile` | function | 9062–9072 | 11 |
| `rIdentityTags` | function | 9073–9081 | 9 |
| `rStyleProfileBars` | function | 9082–9092 | 11 |
| `rIdentityCards` | function | 9093–9118 | 26 |
| `rClassicRoleTags` | function | 9119–9126 | 8 |
| `renderTags` | function | 9127–9129 | 3 |
| `getSeasonPlayerFieldBasis` | function | 9131–9157 | 27 |
| `getSeasonScopedIdentityProfile` | function | 9158–9169 | 12 |
| `rSeasonProfileKpis` | function | 9170–9189 | 20 |
| `rSeasonProfileTagStrip` | function | 9191–9195 | 5 |
| `rMatrix` | function | 9198–9242 | 45 |
| `rSeasonDuoSummary` | function | 9245–9253 | 9 |
| `rPhases` | function | 9255–9272 | 18 |
| `rRadar` | function | 9275–9322 | 48 |
| `rClutch` | function | 9325–9357 | 33 |
| `rTimeline` | function | 9360–9468 | 109 |
| `rPenalties` | function | 9471–9487 | 17 |
| `rOppBreakdown` | function | 9490–9522 | 33 |
| `generatePlayerInsights` | function | 9525–9568 | 44 |
| `rSeasonInsightsTab` | function | 9571–9584 | 14 |
| `rInsights` | function | 9586–9637 | 52 |
| `rTable` | function | 9640–9660 | 21 |
| `findLoadedSeasonPlayer` | function | 9663–9671 | 9 |
| `getAllTimePlayerRows` | function | 9672–9687 | 16 |
| `isSgOnlyAlltimePlayer` | function | 9688–9695 | 8 |
| `isPureSGPlayer` | function | 9696–9699 | 4 |
| `filterPureSGPlayers` | function | 9700–9703 | 4 |
| `getAllTimeMainPlayerRows` | function | 9704–9706 | 3 |
| `getAllTimeSgOnlyRows` | function | 9707–9709 | 3 |
| `getPlayerSeasonStats` | function | 9710–9714 | 5 |
| `getPlayerAlltimeStats` | function | 9715–9722 | 8 |
| `getPlayerRegistryProfile` | function | 9723–9730 | 8 |
| `getPlayerGoalieSeasonStats` | function | 9731–9735 | 5 |
| `getPlayerGoalieAlltimeStats` | function | 9736–9759 | 24 |
| `sumRoleGames` | function | 9760–9765 | 6 |
| `getPlayerRoleAvailability` | function | 9766–9779 | 14 |
| `resolvePlayerRoleView` | function | 9780–9787 | 8 |
| `rPlayerRoleSwitch` | function | 9788–9794 | 7 |
| `goalieNum` | function | 9795–9800 | 6 |
| `goalieTime` | function | 9801–9808 | 8 |
| `goalieBucketRows` | function | 9809–9814 | 6 |
| `goalieTopRow` | function | 9815–9817 | 3 |
| `goalieTierMeta` | function | 9818–9826 | 9 |
| `goalieStdDev` | function | 9827–9832 | 6 |
| `goalieDetailFirstTime` | function | 9833–9839 | 7 |
| `goalieEventSecondInPeriod` | function | 9840–9845 | 6 |
| `goaliePctText` | function | 9846–9849 | 4 |
| `goalieSafeNum` | function | 9850–9853 | 4 |
| `goalieClampScore` | function | 9854–9857 | 4 |
| `goalieInverseScore` | function | 9858–9865 | 8 |
| `goaliePositiveScore` | function | 9866–9873 | 8 |
| `goaliePositiveCurveScore` | function | 9874–9882 | 9 |
| `goalieWeightedScore` | function | 9883–9888 | 6 |
| `goalieApplySampleConfidence` | function | 9889–9896 | 8 |
| `goalieBucketLooseSum` | function | 9897–9903 | 7 |
| `buildGoalieAnalysisModel` | function | 9904–10062 | 159 |
| `rGoalieBars` | function | 10063–10072 | 10 |
| `goalieDnaKey` | function | 10114–10118 | 5 |
| `goalieDnaValue` | function | 10119–10125 | 7 |
| `goalieStateGoals` | function | 10126–10126 | 1 |
| `buildGoalieRoleProfile` | function | 10127–10200 | 74 |
| `rGoalieRoleTraits` | function | 10201–10204 | 4 |
| `getGoalieDnaRows` | function | 10205–10208 | 4 |
| `rGoalieDnaBars` | function | 10209–10222 | 14 |
| `rGoalieKpis` | function | 10223–10239 | 17 |
| `rGoalieMiniMetrics` | function | 10240–10245 | 6 |
| `rGoalieFirstGoalResistance` | function | 10246–10259 | 14 |
| `rGoalieMomentum` | function | 10260–10273 | 14 |
| `rGoalieTierCards` | function | 10274–10301 | 28 |
| `rGoaliePhaseProfile` | function | 10302–10318 | 17 |
| `rGoalieInsights` | function | 10319–10340 | 22 |
| `rGoalieOverview` | function | 10341–10357 | 17 |
| `rGoaliePhases` | function | 10358–10360 | 3 |
| `rGoalieOpponents` | function | 10361–10372 | 12 |
| `rGoalieStability` | function | 10373–10397 | 25 |
| `rGoalieTable` | function | 10398–10405 | 8 |
| `rGoalieAnalysis` | function | 10406–10431 | 26 |
| `seasonOrderIndex` | function | 10432–10436 | 5 |
| `getPreviousSeasonKey` | function | 10437–10441 | 5 |
| `playerAppearedInSeasonByName` | function | 10442–10452 | 11 |
| `playerAppearedForUlmStatusInSeasonByName` | function | 10453–10471 | 19 |
| `isRookieCandidateForSeason` | function | 10472–10481 | 10 |
| `getLoadedSeasonPointsByName` | function | 10482–10486 | 5 |
| `seasonHasPureUlmTeam` | function | 10487–10493 | 7 |
| `isSgOnlyHallOfFameExcluded` | function | 10494–10502 | 9 |
| `isHallOfFameEligiblePlayer` | function | 10503–10508 | 6 |
| `getHallOfFamePlayerRows` | function | 10509–10511 | 3 |
| `getHallOfFamePlayerIdSet` | function | 10512–10514 | 3 |
| `getGlobalProfileEvents` | function | 10516–10527 | 12 |
| `countBy` | function | 10529–10537 | 9 |
| `getLoadedSeasonPlayerUi` | function | 10538–10542 | 5 |
| `getGlobalPlayerTeamRecord` | function | 10543–10568 | 26 |
| `getGlobalPlayerPeakGame` | function | 10569–10579 | 11 |
| `getGlobalPlayerBestSeason` | function | 10580–10586 | 7 |
| `getAllTimeDuoRowsForPlayer` | function | 10587–10597 | 11 |
| `getCarryPerformanceRows` | function | 10598–10613 | 16 |
| `rCarryPerformanceRows` | function | 10614–10626 | 13 |
| `getAllTimeGamesPlayedRows` | function | 10627–10651 | 25 |
| `getAllTimePenaltyRows` | function | 10652–10667 | 16 |
| `getSeasonUiPlayerForProfile` | function | 10668–10671 | 4 |
| `getSeasonIdentityProfile` | function | 10672–10676 | 5 |
| `seasonStatNumber` | function | 10677–10680 | 4 |
| `seasonStatSetSize` | function | 10681–10686 | 6 |
| `isActiveAlltimeSeasonStats` | function | 10687–10700 | 14 |
| `getActiveAlltimeSeasonKeys` | function | 10701–10711 | 11 |
| `getAlltimeRecencyWeight` | function | 10712–10717 | 6 |
| `getRosterStatus` | function | 10718–10724 | 7 |
| `getGlobalTopScorerMilestones` | function | 10725–10737 | 13 |
| `getGlobalRookieSeasonKey` | function | 10738–10751 | 14 |
| `getGlobalRookieMilestone` | function | 10752–10762 | 11 |
| `getGlobalPlayerMilestones` | function | 10763–10780 | 18 |
| `buildOpponentIntelligence` | function | 10782–10835 | 54 |
| `rOpponentIntelBars` | function | 10837–10847 | 11 |
| `getAllTimeDuoRows` | function | 10849–10871 | 23 |
| `rDuoRows` | function | 10873–10892 | 20 |
| `getAllLoadedSeasonGames` | function | 10894–10913 | 20 |
| `getRosterEntryRegistryProfile` | function | 10915–10918 | 4 |
| `difficultConnectionConfidence` | function | 10919–10923 | 5 |
| `getDuoRowsForPlayerScope` | function | 10924–10942 | 19 |
| `buildDirectDuoLookupForPlayer` | function | 10943–10960 | 18 |
| `duoScopeSeasonKeys` | function | 10961–10964 | 4 |
| `getDuoScorerCountsWithCandidate` | function | 10965–10984 | 20 |
| `buildBestThirdManOptions` | function | 10985–11015 | 31 |
| `getDuoDirectScorerGameCounts` | function | 11016–11047 | 32 |
| `responseMomentumAbsSeconds` | function | 11049–11054 | 6 |
| `responseMomentumTime` | function | 11055–11061 | 7 |
| `responseMomentumGameRows` | function | 11062–11068 | 7 |
| `responseMomentumSide` | function | 11069–11077 | 9 |
| `responseMomentumActor` | function | 11078–11088 | 11 |
| `responseMomentumGoalActors` | function | 11089–11096 | 8 |
| `buildAnnotatedGoalEventsForGame` | function | 11097–11197 | 101 |
| `responseMomentumConfidence` | function | 11198–11202 | 5 |
| `responseMomentumEmptyState` | function | 11203–11210 | 8 |
| `responseMomentumPairKey` | function | 11211–11213 | 3 |
| `ensureRmPlayer` | function | 11214–11219 | 6 |
| `ensureRmDuo` | function | 11220–11225 | 6 |
| `finalizeResponseStats` | function | 11226–11239 | 14 |
| `buildResponseGoalStatsRaw` | function | 11240–11288 | 49 |
| `buildResponseGoalStats` | function | 11289–11294 | 6 |
| `finalizeMomentumStats` | function | 11295–11300 | 6 |
| `buildMomentumSwingStatsRaw` | function | 11301–11371 | 71 |
| `buildMomentumSwingStats` | function | 11372–11377 | 6 |
| `buildDuoFloorCeiling` | function | 11378–11419 | 42 |
| `buildDuoWarnings` | function | 11420–11438 | 19 |
| `duoProPairKey` | function | 11439–11441 | 3 |
| `duoProContextSeasonKey` | function | 11442–11444 | 3 |
| `getDuoFieldPlayerRows` | function | 11445–11455 | 11 |
| `duoProPlayer` | function | 11456–11460 | 5 |
| `getDuoSharedFieldRows` | function | 11461–11466 | 6 |
| `buildDuoDirectProduction` | function | 11467–11487 | 21 |
| `emptyDuoTeamImpactStats` | function | 11488–11490 | 3 |
| `addDuoTeamGame` | function | 11491–11506 | 16 |
| `finalizeDuoTeamImpactStats` | function | 11507–11514 | 8 |
| `buildDuoWithWithoutImpact` | function | 11515–11548 | 34 |
| `buildDuoOpponentAdjusted` | function | 11549–11561 | 13 |
| `buildDuoNetworkContext` | function | 11562–11585 | 24 |
| `buildDuoGapAnalysis` | function | 11586–11602 | 17 |
| `buildDuoCompatibility` | function | 11603–11625 | 23 |
| `buildDuoUntestedPotential` | function | 11626–11637 | 12 |
| `buildDuoUsageRate` | function | 11638–11649 | 12 |
| `buildDuoReplacementOptions` | function | 11650–11659 | 10 |
| `buildDuoProAnalysis` | function | 11660–11703 | 44 |
| `rDuoCenterPro` | function | 11704–11818 | 115 |
| `duoProDomId` | function | 11819–11821 | 3 |
| `duoProPickerOpen` | function | 11822–11824 | 3 |
| `duoProPickerMessage` | function | 11825–11827 | 3 |
| `setDuoProPickerState` | function | 11828–11837 | 10 |
| `duoProResolveCandidate` | function | 11838–11846 | 9 |
| `duoProSelectionPayload` | function | 11847–11856 | 10 |
| `openDuoProPicker` | window | 11857–11857 | 1 |
| `cancelDuoProPicker` | window | 11858–11858 | 1 |
| `selectDuoProQuick` | window | 11859–11862 | 4 |
| `confirmDuoProSelection` | window | 11863–11877 | 15 |
| `setDuoProSelection` | window | 11878–11885 | 8 |
| `rDuoProPlayerSelect` | function | 11886–11892 | 7 |
| `rInteractiveDuoCenterPro` | function | 11893–11948 | 56 |
| `rSeasonDuoCenterPro` | function | 11949–11951 | 3 |
| `getDifficultConnectionRowsForPlayer` | function | 11952–11996 | 45 |
| `emptyRosterImpactStats` | function | 11997–11999 | 3 |
| `finalizeRosterImpactStats` | function | 12000–12007 | 8 |
| `addRosterImpactGameToStats` | function | 12008–12017 | 10 |
| `getRosterImpactPlayerEventLookup` | function | 12018–12038 | 21 |
| `getRosterImpactPlayerGames` | function | 12039–12079 | 41 |
| `rosterImpactConfidence` | function | 12080–12085 | 6 |
| `rosterImpactConfidenceWeight` | function | 12086–12089 | 4 |
| `antiSynergyImpactScore` | function | 12090–12104 | 15 |
| `buildRosterImpactAnalysis` | function | 12105–12164 | 60 |
| `buildDuoAntiSynergy` | function | 12165–12167 | 3 |
| `rAntiSynergyDelta` | function | 12168–12174 | 7 |
| `antiSynergyDeltaClass` | function | 12175–12178 | 4 |
| `antiSynergySigned` | function | 12179–12183 | 5 |
| `rAntiSynergyCompareChip` | function | 12184–12191 | 8 |
| `rAntiSynergyMetricRow` | function | 12192–12200 | 9 |
| `rRosterImpactStatLine` | function | 12201–12204 | 4 |
| `antiSynergyPartnerIsSgOnly` | function | 12205–12208 | 4 |
| `rAntiSynergyMainDelta` | function | 12209–12218 | 10 |
| `rDifficultConnectionList` | function | 12219–12243 | 25 |
| `rDifficultConnectionListCompactLegacy` | function | 12244–12285 | 42 |
| `rDifficultConnectionListCompact` | function | 12286–12324 | 39 |
| `rDifficultConnectionsCard` | function | 12325–12361 | 37 |
| `responseMomentumTooltipFor` | function | 12406–12412 | 7 |
| `rmTerm` | function | 12413–12416 | 4 |
| `rRmKpi` | function | 12417–12427 | 11 |
| `rRmTopList` | function | 12428–12438 | 11 |
| `rResponseMomentumOverviewCard` | function | 12439–12462 | 24 |
| `rPlayerResponseMomentumCard` | function | 12463–12481 | 19 |
| `rDuoResponseMomentumCard` | function | 12482–12501 | 20 |
| `rTeamResponseMomentumCard` | function | 12502–12508 | 7 |
| `rMatchcenterResponseMomentum` | function | 12509–12546 | 38 |
| `getTeamAllTimeRecords` | function | 12548–12588 | 41 |
| `getAllTimeOpponentIntelligence` | function | 12590–12596 | 7 |
| `getAllTimeOpponentTopScorers` | function | 12598–12622 | 25 |
| `getHallOfFameStats` | function | 12624–12646 | 23 |
| `rOpponentTopScorerTable` | function | 12648–12667 | 20 |
| `getAllTimeIdentityStandings` | function | 12669–12703 | 35 |
| `buildRecencyWeightedGlobalIdentityProfile` | function | 12705–12752 | 48 |
| `getGlobalIdentityProfile` | function | 12754–12780 | 27 |
| `dedupeIdentityProfileTags` | function | 12782–12793 | 12 |
| `rGlobalProfileTags` | function | 12795–12799 | 5 |
| `escHtml` | function | 12801–12803 | 3 |
| `pctValue` | function | 12804–12807 | 4 |
| `rHallOfFameHero` | function | 12808–12833 | 26 |
| `rHallPodiumList` | function | 12834–12856 | 23 |
| `rHallDuoTemple` | function | 12857–12864 | 8 |
| `hallGoalieNum` | function | 12866–12871 | 6 |
| `hallGoalieTime` | function | 12872–12879 | 8 |
| `hallGoalieSeasonLabel` | function | 12880–12880 | 1 |
| `isHallRowPureSG` | function | 12881–12888 | 8 |
| `rHallSGBadge` | function | 12889–12891 | 3 |
| `hallGoaliePkStats` | function | 12892–12903 | 12 |
| `hallGoalieTopteamStats` | function | 12904–12910 | 7 |
| `hallGoalieSeasonScore` | function | 12911–12930 | 20 |
| `hallGoalieRowFromStats` | function | 12931–12963 | 33 |
| `getHallGoalieData` | function | 12964–12979 | 16 |
| `hallGoalieNameHtml` | function | 12980–12982 | 3 |
| `hallGoalieTooltip` | function | 12997–13000 | 4 |
| `hallGoalieExplainForLabel` | function | 13001–13015 | 15 |
| `rHallGoalieRankCard` | function | 13016–13047 | 32 |
| `rHallGoalieAwardCards` | function | 13048–13064 | 17 |
| `rHallGoalieLegends` | function | 13065–13097 | 33 |
| `getGlobalSeasonStatRows` | function | 13098–13113 | 16 |
| `getAlltimeRank` | function | 13114–13119 | 6 |
| `rAlltimeKpis` | function | 13120–13133 | 14 |
| `rSparkline` | function | 13134–13146 | 13 |
| `comparisonItemKey` | function | 13158–13163 | 6 |
| `normalizeComparisonItem` | function | 13164–13168 | 5 |
| `comparisonJsArg` | function | 13169–13171 | 3 |
| `comparisonNum` | function | 13172–13175 | 4 |
| `comparisonPct` | function | 13176–13179 | 4 |
| `comparisonFmt` | function | 13180–13183 | 4 |
| `comparisonPctFmt` | function | 13184–13186 | 3 |
| `getComparisonPlayerRow` | function | 13187–13189 | 3 |
| `getComparisonSeasonLabel` | function | 13190–13192 | 3 |
| `getComparisonTeamGoalsForSeason` | function | 13193–13204 | 12 |
| `getComparisonAlltimeTeamGoals` | function | 13205–13207 | 3 |
| `getComparisonSeasonEvents` | function | 13208–13212 | 5 |
| `getComparisonChemistryFromEvents` | function | 13213–13217 | 5 |
| `getComparisonClutchFromEvents` | function | 13218–13222 | 5 |
| `getComparisonStyleProfile` | function | 13223–13247 | 25 |
| `getComparisonProfile` | function | 13248–13252 | 5 |
| `getComparisonSeasonTrend` | function | 13253–13278 | 26 |
| `getComparisonAlltimeTrend` | function | 13279–13284 | 6 |
| `getComparisonPlayerOptions` | function | 13286–13300 | 15 |
| `comparisonVariantValue` | function | 13301–13303 | 3 |
| `getComparisonVariantsForPlayer` | function | 13304–13328 | 25 |
| `parseComparisonVariant` | function | 13329–13343 | 15 |
| `getComparisonCurrentSelection` | function | 13344–13354 | 11 |
| `filterComparisonPlayers` | window | 13355–13362 | 8 |
| `selectComparisonPlayer` | window | 13363–13368 | 6 |
| `setComparisonRoleMode` | window | 13369–13373 | 5 |
| `setComparisonVariant` | window | 13374–13377 | 4 |
| `toggleComparisonSgOnly` | window | 13378–13378 | 1 |
| `addComparisonItem` | window | 13379–13386 | 8 |
| `addSelectedComparisonItem` | window | 13387–13392 | 6 |
| `toggleComparisonPicker` | window | 13393–13393 | 1 |
| `removeComparisonItem` | window | 13394–13397 | 4 |
| `clearComparison` | window | 13398–13398 | 1 |
| `runComparison` | window | 13399–13405 | 7 |
| `selectComparisonMode` | window | 13406–13406 | 1 |
| `backToComparisonModeSelect` | window | 13407–13407 | 1 |
| `normalizeDuoComparisonItem` | function | 13408–13411 | 4 |
| `comparisonDuoContext` | function | 13412–13415 | 4 |
| `setComparisonDuoMode` | window | 13416–13416 | 1 |
| `setComparisonDuoSeasonKey` | window | 13417–13417 | 1 |
| `setComparisonDuoSearch` | window | 13418–13418 | 1 |
| `filterPlayerSuggestions` | function | 13419–13430 | 12 |
| `rComparisonDuoSuggestionButtons` | function | 13431–13434 | 4 |
| `renderComparisonDuoSuggestions` | function | 13435–13443 | 9 |
| `filterComparisonDuoSuggestions` | window | 13444–13451 | 8 |
| `selectComparisonDuoSuggestion` | window | 13445–13451 | 7 |
| `handleComparisonDuoSearchKey` | window | 13452–13464 | 13 |
| `setComparisonDuoPlayer` | window | 13465–13470 | 6 |
| `addComparisonDuoFromSelection` | window | 13471–13478 | 8 |
| `addComparisonDuo` | window | 13479–13481 | 3 |
| `removeComparisonDuo` | window | 13482–13485 | 4 |
| `clearComparisonDuos` | window | 13486–13486 | 1 |
| `runDuoComparison` | window | 13487–13491 | 5 |
| `buildDuoComparison` | function | 13492–13511 | 20 |
| `rDuoComparisonBars` | function | 13512–13516 | 5 |
| `rDuoCompareSummaryCards` | function | 13517–13547 | 31 |
| `rDuoComparisonProfile` | function | 13548–13569 | 22 |
| `rDuoComparisonChemistry` | function | 13570–13585 | 16 |
| `rDuoComparisonImpact` | function | 13586–13601 | 16 |
| `rDuoComparisonContext` | function | 13602–13619 | 18 |
| `rDuoComparisonDetails` | function | 13620–13623 | 4 |
| `rDuoComparisonDashboard` | function | 13624–13637 | 14 |
| `rComparisonDuoSearchBox` | function | 13638–13647 | 10 |
| `rDuoComparisonPage` | function | 13648–13658 | 11 |
| `rComparisonModeSelect` | function | 13659–13661 | 3 |
| `getComparisonEventsForItem` | function | 13662–13664 | 3 |
| `getComparisonRosterGamesForSeason` | function | 13665–13681 | 17 |
| `getComparisonRosterGames` | function | 13682–13689 | 8 |
| `comparisonEventGameKey` | function | 13690–13692 | 3 |
| `comparisonEventPhaseLabel` | function | 13693–13696 | 4 |
| `comparisonOpponentStrengthTier` | function | 13697–13702 | 6 |
| `buildComparisonExtraMetrics` | function | 13703–13760 | 58 |
| `getGoalieComparisonAlltimeTrend` | function | 13761–13777 | 17 |
| `getGoalieComparisonSeasonTrend` | function | 13778–13796 | 19 |
| `buildGoalieComparisonDataset` | function | 13797–13847 | 51 |
| `buildComparisonDataset` | function | 13848–13883 | 36 |
| `kpiValueText` | function | 13885–13888 | 4 |
| `kpiDelta` | function | 13889–13894 | 6 |
| `kpiItemColor` | function | 13895–13897 | 3 |
| `rKpiCards` | function | 13898–13908 | 11 |
| `rKpiMirrorRows` | function | 13909–13968 | 60 |
| `kpiRadarValue` | function | 13969–13979 | 11 |
| `rKpiRadar` | function | 13980–14014 | 35 |
| `rKpiShareBars` | function | 14015–14022 | 8 |
| `rKpiMetricCard` | function | 14023–14027 | 5 |
| `rKpiTextMetricCard` | function | 14028–14030 | 3 |
| `rKpiExtendedMetrics` | function | 14031–14045 | 15 |
| `kpiNiceMax` | function | 14046–14051 | 6 |
| `kpiTrendRows` | function | 14052–14060 | 9 |
| `rKpiTrendCompare` | function | 14061–14127 | 67 |
| `rKpiOpponentStrength` | function | 14128–14155 | 28 |
| `kpiBadge` | function | 14156–14158 | 3 |
| `rKpiObjectMini` | function | 14159–14165 | 7 |
| `rKpiInfoCards` | function | 14166–14197 | 32 |
| `buildComparisonSummary` | function | 14198–14229 | 32 |
| `rKPIVergleich` | function | 14230–14243 | 14 |
| `rComparisonMiniOverview` | function | 14244–14247 | 4 |
| `rComparisonRoles` | function | 14248–14255 | 8 |
| `rComparisonDashboard` | function | 14256–14266 | 11 |
| `rComparisonStyles` | function | 14267–14304 | 38 |
| `rComparisonCenterPage` | function | 14305–14355 | 51 |
| `rSeasonTrendRows` | function | 14356–14374 | 19 |
| `getAlltimeAggregatedStyleProfile` | function | 14375–14394 | 20 |
| `rGlobalDnaBars` | function | 14396–14425 | 30 |
| `pdashNum` | function | 14426–14429 | 4 |
| `pdashPct` | function | 14430–14433 | 4 |
| `pdashPhaseLabel` | function | 14434–14437 | 4 |
| `pdashTopCount` | function | 14438–14441 | 4 |
| `pdashBestPhase` | function | 14442–14445 | 4 |
| `pdashTopPartner` | function | 14446–14449 | 4 |
| `pdashTopOpponent` | function | 14450–14453 | 4 |
| `pdashOpponentTier` | function | 14454–14459 | 6 |
| `pdashOpponentStrength` | function | 14460–14479 | 20 |
| `pdashInsight` | function | 14480–14482 | 3 |
| `pdashInsights` | function | 14483–14494 | 12 |
| `buildSeasonPlayerDashModel` | function | 14495–14531 | 37 |
| `buildAlltimePlayerDashModel` | function | 14532–14574 | 43 |
| `rPlayerDashStyles` | function | 14575–14586 | 12 |
| `rPdashLabel` | function | 14587–14589 | 3 |
| `rPdashStat` | function | 14590–14592 | 3 |
| `rPlayerDash` | function | 14593–14631 | 39 |
| `rSeasonPlayerDashboard` | function | 14632–14634 | 3 |
| `rAlltimePlayerDashboard` | function | 14635–14637 | 3 |
| `rGlobalPartnerOpponentPanel` | function | 14638–14651 | 14 |
| `rGlobalCareerHeader` | function | 14652–14672 | 21 |
| `rSeasonLandingPage` | function | 14674–14688 | 15 |
| `rGlobalOverview` | function | 14690–14741 | 52 |
| `rGlobalAllTimeStats` | function | 14743–14759 | 17 |
| `rGlobalDevelopment` | function | 14761–14799 | 39 |
| `getGlobalPlayerOpponentGameRows` | function | 14802–14829 | 28 |
| `getGlobalOpponentSpecialistProfile` | function | 14831–14859 | 29 |
| `rGlobalDuoNetwork` | function | 14861–15058 | 198 |
| `rGlobalOpponentSpecialist` | function | 15060–15105 | 46 |
| `playerExplainConfidence` | function | 15107–15112 | 6 |
| `playerExplainConfidenceLabel` | function | 15113–15115 | 3 |
| `playerExplainAdd` | function | 15116–15120 | 5 |
| `playerExplainStyleSignature` | function | 15121–15132 | 12 |
| `playerExplainRolePhrase` | function | 15133–15141 | 9 |
| `playerExplainHeadline` | function | 15142–15151 | 10 |
| `playerExplainContextSentence` | function | 15152–15170 | 19 |
| `buildFieldPlayerExplanation` | function | 15171–15245 | 75 |
| `buildGoaliePlayerExplanation` | function | 15246–15299 | 54 |
| `buildPlayerExplanation` | function | 15300–15308 | 9 |
| `buildPlayerIntelligence` | function | 15309–15338 | 30 |
| `rPlayerExplainItems` | function | 15339–15343 | 5 |
| `rPlayerExplanation` | function | 15344–15395 | 52 |
| `rAllTimePlayersPage` | function | 15397–15437 | 41 |
| `rHallOfFamePage` | function | 15439–15527 | 89 |
| `lexiconUniqueKeys` | function | 15532–15539 | 8 |
| `lexiconEntry` | function | 15540–15549 | 10 |
| `rLexiconRows` | function | 15550–15553 | 4 |
| `rLexiconPage` | function | 15554–15726 | 173 |
| `matchcenterClamp` | function | 15728–15732 | 5 |
| `matchcenterNum` | function | 15733–15736 | 4 |
| `clampScore` | function | 15737–15740 | 4 |
| `getScoreLabel` | function | 15741–15749 | 9 |
| `buildConfidence` | function | 15750–15795 | 46 |
| `confidenceCautiousText` | function | 15796–15799 | 4 |
| `explainScore` | function | 15800–15814 | 15 |
| `p1NarrativeKey` | function | 15815–15817 | 3 |
| `scoreNarrative` | function | 15818–15836 | 19 |
| `rankNarratives` | function | 15837–15850 | 14 |
| `getEmptyState` | function | 15851–15862 | 12 |
| `rEmptyState` | function | 15863–15866 | 4 |
| `rScoreBreakdown` | function | 15867–15882 | 16 |
| `matchcenterFmt` | function | 15883–15887 | 5 |
| `matchcenterSigned` | function | 15888–15892 | 5 |
| `matchcenterDateValue` | function | 15893–15897 | 5 |
| `matchcenterDateLabel` | function | 15898–15902 | 5 |
| `matchcenterSortGamesAsc` | function | 15903–15907 | 5 |
| `matchcenterSeasonKeys` | function | 15908–15911 | 4 |
| `matchcenterSeasonLabel` | function | 15912–15914 | 3 |
| `matchcenterSeasonIsUlmTuebingenSgEra` | function | 15915–15918 | 4 |
| `teamAliasSeasonMatches` | function | 15927–15932 | 6 |
| `normalizeTeamKey` | function | 15933–15935 | 3 |
| `teamAliasRuleMatches` | function | 15936–15940 | 5 |
| `isOwnTeam` | function | 15941–15951 | 11 |
| `getCanonicalTeamName` | function | 15952–15957 | 6 |
| `getOpponentAliasKeys` | function | 15958–15978 | 21 |
| `dedupeGamesById` | function | 15979–15987 | 9 |
| `matchcenterIsFreiburgTuebingenTeamName` | function | 15988–15994 | 7 |
| `matchcenterIsUlmTeamName` | function | 15995–15997 | 3 |
| `normalizeTeamNameForMatchcenter` | function | 15998–16002 | 5 |
| `matchcenterDetectUlmSide` | function | 16003–16009 | 7 |
| `matchcenterSeasonHasGames` | function | 16010–16012 | 3 |
| `matchcenterDefaultSeasonKey` | function | 16013–16018 | 6 |
| `matchcenterTeamDisplay` | function | 16019–16021 | 3 |
| `matchcenterTeamKey` | function | 16022–16026 | 5 |
| `matchcenterAliasModeForContext` | function | 16027–16029 | 3 |
| `getOpponentAliasKeysForMatchcenter` | function | 16030–16055 | 26 |
| `matchcenterGameTeamName` | function | 16056–16058 | 3 |
| `matchcenterGameSideForTeam` | function | 16059–16066 | 8 |
| `matchcenterGameSideForOpponentKey` | function | 16067–16077 | 11 |
| `matchcenterGameScore` | function | 16078–16081 | 4 |
| `matchcenterOutcomeForTeam` | function | 16082–16090 | 9 |
| `matchcenterAllGamesForSeason` | function | 16091–16110 | 20 |
| `matchcenterAllGames` | function | 16111–16113 | 3 |
| `matchcenterOpponentMode` | function | 16114–16116 | 3 |
| `getMatchcenterOpponents` | function | 16117–16149 | 33 |
| `getMatchcenterDirectOpponents` | function | 16150–16180 | 31 |
| `matchcenterDirectGames` | function | 16181–16194 | 14 |
| `matchcenterContextGames` | function | 16195–16200 | 6 |
| `matchcenterAnalyzeDirect` | function | 16201–16237 | 37 |
| `matchcenterAnalyzeForm` | function | 16238–16263 | 26 |
| `matchcenterGameKey` | function | 16264–16266 | 3 |
| `matchcenterScoutingGames` | function | 16267–16281 | 15 |
| `matchcenterRosterPlayers` | function | 16282–16285 | 4 |
| `matchcenterPlayerDisplayName` | function | 16286–16291 | 6 |
| `matchcenterFindRosterPlayer` | function | 16292–16296 | 5 |
| `matchcenterPlayerKey` | function | 16297–16302 | 6 |
| `matchcenterEventNumber` | function | 16303–16307 | 5 |
| `matchcenterPenaltyMinutes` | function | 16308–16317 | 10 |
| `matchcenterGoalMinute` | function | 16318–16323 | 6 |
| `matchcenterIsLateGoalEvent` | function | 16324–16328 | 5 |
| `matchcenterIsClutchGoalEvent` | function | 16329–16339 | 11 |
| `matchcenterEnsureOpponentPlayer` | function | 16340–16363 | 24 |
| `matchcenterRegisterPlayerGame` | function | 16364–16366 | 3 |
| `matchcenterAddScoring` | function | 16367–16383 | 17 |
| `matchcenterFinalizeOpponentPlayerProfiles` | function | 16384–16430 | 47 |
| `matchcenterBuildOpponentScouting` | function | 16431–16502 | 72 |
| `matchcenterBuildOpponentPlayerInsights` | function | 16503–16516 | 14 |
| `matchcenterEmptyBuckets` | function | 16517–16519 | 3 |
| `matchcenterUlmScoutingConfidence` | function | 16520–16524 | 5 |
| `matchcenterEnsureUlmPlayer` | function | 16525–16562 | 38 |
| `matchcenterRegisterUlmProfileGame` | function | 16563–16568 | 6 |
| `matchcenterUpdateUlmSeasonRow` | function | 16569–16575 | 7 |
| `matchcenterClassifyUlmGoalEvent` | function | 16576–16586 | 11 |
| `matchcenterAddUlmScoring` | function | 16587–16624 | 38 |
| `matchcenterFinalizeUlmPlayers` | function | 16625–16693 | 69 |
| `matchcenterBuildUlmPlayerScouting` | function | 16694–16748 | 55 |
| `matchcenterBuildUlmPlayerInsights` | function | 16749–16761 | 13 |
| `matchcenterDuoPairKey` | function | 16762–16765 | 4 |
| `matchcenterEnsureOpponentDuo` | function | 16766–16798 | 33 |
| `matchcenterDuoDirectionLabel` | function | 16799–16805 | 7 |
| `matchcenterAddDuoConnection` | function | 16806–16824 | 19 |
| `matchcenterFinalizeOpponentDuos` | function | 16825–16859 | 35 |
| `matchcenterBuildOpponentDuos` | function | 16860–16904 | 45 |
| `matchcenterBuildOpponentDuoInsights` | function | 16905–16918 | 14 |
| `matchcenterEnsureUlmDuo` | function | 16919–16956 | 38 |
| `matchcenterAddUlmDuoConnection` | function | 16957–16975 | 19 |
| `matchcenterFinalizeUlmDuos` | function | 16976–17011 | 36 |
| `matchcenterBuildUlmDuos` | function | 17012–17054 | 43 |
| `matchcenterBuildUlmDuoInsights` | function | 17055–17067 | 13 |
| `matchcenterDirectContextGames` | function | 17068–17070 | 3 |
| `matchcenterSpecialTeamsForGame` | function | 17071–17074 | 4 |
| `matchcenterPersonalPenaltyMinutesForSide` | function | 17075–17083 | 9 |
| `matchcenterPct` | function | 17084–17087 | 4 |
| `matchcenterBuildSpecialTeamsMatchup` | function | 17088–17135 | 48 |
| `matchcenterGoalieKey` | function | 17136–17140 | 5 |
| `matchcenterGoalieFitScore` | function | 17141–17157 | 17 |
| `matchcenterBuildGoalieMatchup` | function | 17158–17200 | 43 |
| `matchcenterGoalAbsSeconds` | function | 17201–17208 | 8 |
| `matchcenterTimeValue` | function | 17209–17216 | 8 |
| `matchcenterEmptyTimingStats` | function | 17217–17225 | 9 |
| `matchcenterWindowForSecond` | function | 17226–17232 | 7 |
| `matchcenterTimingStatsForGames` | function | 17233–17269 | 37 |
| `matchcenterBuildTimingInsights` | function | 17270–17280 | 11 |
| `matchcenterBuildTimingAnalysis` | function | 17281–17291 | 11 |
| `rMatchcenterTimeBars` | function | 17292–17305 | 14 |
| `rMatchcenterTimingStatsCard` | function | 17306–17325 | 20 |
| `rMatchcenterTiming` | function | 17326–17349 | 24 |
| `rMatchcenterTabs` | function | 17365–17367 | 3 |
| `rMatchcenterProfileSection` | function | 17368–17387 | 20 |
| `rMatchcenterFormSection` | function | 17388–17413 | 26 |
| `rMatchcenterDetailsSection` | function | 17414–17421 | 8 |
| `matchcenterResultClass` | function | 17422–17424 | 3 |
| `matchcenterResultLetter` | function | 17425–17427 | 3 |
| `matchcenterUlmTeamLabelForGame` | function | 17428–17432 | 5 |
| `matchcenterGameLine` | function | 17433–17438 | 6 |
| `matchcenterFormLine` | function | 17439–17443 | 5 |
| `matchcenterBuildInsights` | function | 17444–17464 | 21 |
| `rMatchcenterKpi` | function | 17465–17471 | 7 |
| `rMatchcenterFormCard` | function | 17472–17492 | 21 |
| `rMatchcenterGamesList` | function | 17493–17504 | 12 |
| `rMatchcenterWatchCard` | function | 17505–17525 | 21 |
| `rMatchcenterPlayerRow` | function | 17526–17549 | 24 |
| `rMatchcenterRankCard` | function | 17550–17555 | 6 |
| `rMatchcenterUlmImpactCard` | function | 17556–17584 | 29 |
| `rMatchcenterUlmPlayerRow` | function | 17585–17608 | 24 |
| `rMatchcenterUlmRankCard` | function | 17609–17614 | 6 |
| `rMatchcenterUlmScouting` | function | 17615–17651 | 37 |
| `rMatchcenterOpponentScouting` | function | 17652–17687 | 36 |
| `rMatchcenterPlayersTab` | function | 17688–17690 | 3 |
| `rMatchcenterDuoWatchCard` | function | 17691–17710 | 20 |
| `rMatchcenterDuoRow` | function | 17711–17734 | 24 |
| `rMatchcenterDuoRankCard` | function | 17735–17740 | 6 |
| `rMatchcenterUlmDuoWatchCard` | function | 17741–17766 | 26 |
| `rMatchcenterUlmDuoRow` | function | 17767–17789 | 23 |
| `rMatchcenterUlmDuoRankCard` | function | 17790–17795 | 6 |
| `rMatchcenterUlmDuos` | function | 17796–17838 | 43 |
| `rMatchcenterOpponentDuos` | function | 17839–17881 | 43 |
| `rMatchcenterDuosTab` | function | 17882–17884 | 3 |
| `rMatchcenterSpecialCard` | function | 17885–17893 | 9 |
| `rMatchcenterSpecialTeams` | function | 17894–17943 | 50 |
| `rMatchcenterGoalieCard` | function | 17944–17967 | 24 |
| `rMatchcenterGoalieMatchup` | function | 17968–17996 | 29 |
| `matchcenterPlanScoreText` | function | 17997–18000 | 4 |
| `matchcenterPlanRateText` | function | 18001–18005 | 5 |
| `matchcenterPriorityLabel` | function | 18006–18008 | 3 |
| `matchcenterConfidenceClass` | function | 18009–18014 | 6 |
| `matchcenterInferPriority` | function | 18015–18021 | 7 |
| `matchcenterAddPlanItem` | function | 18022–18027 | 6 |
| `matchcenterAddPlanWatch` | function | 18028–18033 | 6 |
| `matchcenterBuildPlanConfidence` | function | 18034–18068 | 35 |
| `matchcenterIntelCurve` | function | 18069–18074 | 6 |
| `matchcenterIntelInverseCurve` | function | 18075–18078 | 4 |
| `matchcenterIntelWeighted` | function | 18079–18089 | 11 |
| `matchcenterIntelRate` | function | 18090–18093 | 4 |
| `matchcenterIntelPct` | function | 18094–18097 | 4 |
| `matchcenterIntelPriorityFromScore` | function | 18098–18103 | 6 |
| `matchcenterIntelPriorityClass` | function | 18104–18109 | 6 |
| `matchcenterIntelPriorityLabel` | function | 18110–18113 | 4 |
| `matchcenterIntelDataLabel` | function | 18114–18116 | 3 |
| `matchcenterBuildIntelligenceDataQuality` | function | 18117–18167 | 51 |
| `matchcenterBuildOpponentDNA` | function | 18168–18280 | 113 |
| `matchcenterDeriveOpponentType` | function | 18281–18298 | 18 |
| `matchcenterIntelPlayerRef` | function | 18299–18311 | 13 |
| `matchcenterIntelDuoRef` | function | 18312–18325 | 14 |
| `matchcenterIntelAddAlarm` | function | 18326–18346 | 21 |
| `matchcenterBuildOpponentAlarm` | function | 18347–18456 | 110 |
| `matchcenterBuildIntelListFromPlan` | function | 18457–18465 | 9 |
| `matchcenterBuildCoachHints` | function | 18466–18481 | 16 |
| `matchcenterBuildIntelHeadline` | function | 18482–18489 | 8 |
| `matchcenterBuildOneThingToWatch` | function | 18490–18502 | 13 |
| `matchcenterBuildIntelligenceSignals` | function | 18503–18549 | 47 |
| `buildMatchIntelligenceFromContext` | function | 18550–18604 | 55 |
| `buildMatchIntelligence` | function | 18605–18626 | 22 |
| `matchcenterCoachCautious` | function | 18627–18629 | 3 |
| `matchcenterCoachAdd` | function | 18630–18638 | 9 |
| `matchcenterCoachGameModel` | function | 18639–18652 | 14 |
| `buildMatchStories` | function | 18653–18682 | 30 |
| `matchcenterCoachPriorityFromAlarm` | function | 18683–18692 | 10 |
| `matchcenterBuildCoachPriorities` | function | 18693–18699 | 7 |
| `matchcenterBuildCoachLevers` | function | 18700–18709 | 10 |
| `matchcenterBuildCoachDangerPatterns` | function | 18710–18717 | 8 |
| `matchcenterBuildCoachIfThen` | function | 18718–18727 | 10 |
| `matchcenterBuildCoachAvoidList` | function | 18728–18737 | 10 |
| `matchcenterBuildCoachActivationHints` | function | 18738–18744 | 7 |
| `matchcenterBuildCoachKeyActors` | function | 18745–18752 | 8 |
| `buildDigitalCoachReport` | function | 18753–18785 | 33 |
| `buildLockerRoomSheet` | function | 18786–18806 | 21 |
| `matchcenterSocialAdd` | function | 18807–18813 | 7 |
| `matchcenterSocialCaption` | function | 18814–18819 | 6 |
| `socialSentence` | function | 18820–18822 | 3 |
| `socialEnsurePeriod` | function | 18823–18826 | 4 |
| `socialFirstUseful` | function | 18827–18829 | 3 |
| `socialPlayerFocusLine` | function | 18830–18836 | 7 |
| `socialDuoFocusLine` | function | 18837–18842 | 6 |
| `socialOpponentLine` | function | 18843–18846 | 4 |
| `socialKeyFactLine` | function | 18847–18856 | 10 |
| `buildMatchdayCaptionBlocks` | function | 18857–18886 | 30 |
| `buildSocialMediaContent` | function | 18887–18935 | 49 |
| `isSyntheticLineupPlayerId` | function | 18941–18943 | 3 |
| `getSyntheticLineupPlayers` | function | 18944–18946 | 3 |
| `getSyntheticLineupRow` | function | 18947–18963 | 17 |
| `getSyntheticLineupRows` | function | 18964–18966 | 3 |
| `getLineupAllRows` | function | 18967–18969 | 3 |
| `lineupRowMeta` | function | 18970–18977 | 8 |
| `getLineupPlayerPool` | function | 18978–18986 | 9 |
| `lineupScore` | function | 18987–18992 | 6 |
| `lineupAverage` | function | 18993–18996 | 4 |
| `lineupLevelLabel` | function | 18997–19000 | 4 |
| `lineupRosterGamesForPlayer` | function | 19003–19050 | 48 |
| `buildLineupExperienceProfile` | function | 19051–19093 | 43 |
| `lineupOpponentDNAForContext` | function | 19094–19105 | 12 |
| `buildLineupOpponentDNAFit` | function | 19106–19149 | 44 |
| `classifyLineIdentity` | function | 19150–19197 | 48 |
| `lineupPlayerProfile` | function | 19198–19273 | 76 |
| `buildLineupAnalysis` | function | 19274–19407 | 134 |
| `buildLineupScoreBreakdowns` | function | 19408–19437 | 30 |
| `buildLineupIntelligence` | function | 19438–19448 | 11 |
| `buildLineAnalysis` | function | 19449–19451 | 3 |
| `lineupRowMap` | function | 19452–19454 | 3 |
| `lineupRankCandidateIds` | function | 19455–19469 | 15 |
| `lineupCombinationIds` | function | 19470–19483 | 14 |
| `lineupStdDev` | function | 19484–19489 | 6 |
| `lineupRoleDnaComplementScore` | function | 19490–19513 | 24 |
| `lineupDirectChemistryScore` | function | 19514–19520 | 7 |
| `lineupEvaluateComplementCandidate` | function | 19521–19598 | 78 |
| `lineupPlayerAnchorScore` | function | 19599–19616 | 18 |
| `buildTeamLineBalance` | function | 19617–19660 | 44 |
| `buildBalancedLineupSet` | function | 19661–19685 | 25 |
| `lineupRecommendationReason` | function | 19686–19694 | 9 |
| `buildLineupRecommendations` | function | 19695–19773 | 79 |
| `recommendLineComplements` | function | 19774–19801 | 28 |
| `matchcenterBuildMatchPlan` | function | 19802–19947 | 146 |
| `rMatchcenterPlanItems` | function | 19948–19965 | 18 |
| `rMatchcenterPlanWatch` | function | 19966–19981 | 16 |
| `rMatchcenterOpponentDNA` | function | 19982–20014 | 33 |
| `rMatchcenterOpponentAlarm` | function | 20015–20036 | 22 |
| `rMatchcenterIntelOverview` | function | 20037–20082 | 46 |
| `rMatchcenterIntelCoachHints` | function | 20083–20096 | 14 |
| `rMatchcenterCoachCardList` | function | 20097–20110 | 14 |
| `rMatchcenterCoachIfThen` | function | 20111–20118 | 8 |
| `rMatchcenterCoachSimpleList` | function | 20119–20123 | 5 |
| `rMatchcenterDigitalCoach` | function | 20124–20188 | 65 |
| `rMatchcenterCopyButton` | function | 20189–20193 | 5 |
| `rMatchcenterLockerList` | function | 20194–20205 | 12 |
| `rMatchcenterLockerRoomSheet` | function | 20206–20261 | 56 |
| `rMatchcenterSocialBlock` | function | 20262–20269 | 8 |
| `matchcenterStoryDownloadFileName` | function | 20270–20279 | 10 |
| `downloadMatchdayStory` | window | 20280–20327 | 48 |
| `rSocialVideoBlock` | function | 20331–20362 | 32 |
| `socialVideoJobsForMatchday` | function | 20365–20371 | 7 |
| `generateSocialVideoVideos` | window | 20372–20413 | 42 |
| `cancelSocialVideoRecording` | window | 20414–20416 | 3 |
| `generateSocialVideoStandbilder` | window | 20417–20440 | 24 |
| `generateSocialVideoContactSheets` | window | 20441–20458 | 18 |
| `rMatchcenterSocialMediaCenter` | function | 20459–20512 | 54 |
| `rLineupScoreRows` | function | 20513–20534 | 22 |
| `rLineupSimpleCards` | function | 20535–20543 | 9 |
| `rMatchcenterLineupBuilder` | function | 20544–20616 | 73 |
| `rLineupMetricPills` | function | 20617–20630 | 14 |
| `rLineupBuilderAvailablePanel` | function | 20631–20678 | 48 |
| `rLineupRecommendationCards` | function | 20679–20693 | 15 |
| `rLineupRecommendationMode` | function | 20694–20727 | 34 |
| `rLineupComplementCards` | function | 20728–20740 | 13 |
| `rLineupTestLine` | function | 20741–20789 | 49 |
| `rLineupTestMode` | function | 20790–20806 | 17 |
| `rLineupBuilderPage` | function | 20807–20840 | 34 |
| `rMatchcenterScoutingSummary` | function | 20841–20884 | 44 |
| `rMatchcenterMatchPlan` | function | 20885–20905 | 21 |
| `matchcenterStoryInitials` | function | 20907–20912 | 6 |
| `matchcenterStoryLogoBase` | function | 20913–20918 | 6 |
| `matchcenterStorySafeLogoUrl` | function | 20919–20925 | 7 |
| `matchcenterStoryTeamAssetKey` | function | 20933–20937 | 5 |
| `getTeamLogoUrlForStory` | function | 20938–20967 | 30 |
| `matchcenterStoryLogoForOpponent` | function | 20968–20982 | 15 |
| `matchcenterStoryTableRank` | function | 20983–20993 | 11 |
| `matchcenterStoryUlmTableRank` | function | 20994–21000 | 7 |
| `matchcenterStoryRankText` | function | 21001–21004 | 4 |
| `matchcenterStoryInlineStat` | function | 21005–21007 | 3 |
| `matchcenterStoryShortTeamLabel` | function | 21008–21031 | 24 |
| `matchcenterStoryRankRows` | function | 21032–21043 | 12 |
| `matchcenterStoryFormLetters` | function | 21044–21046 | 3 |
| `matchcenterStoryPlayer` | function | 21047–21079 | 33 |
| `matchcenterStoryAddFact` | function | 21080–21086 | 7 |
| `matchcenterStoryFactKey` | function | 21087–21089 | 3 |
| `matchcenterStoryLooksArtificial` | function | 21090–21092 | 3 |
| `matchcenterStoryEstimateFactWeight` | function | 21093–21098 | 6 |
| `matchcenterStoryAddCandidate` | function | 21099–21121 | 23 |
| `matchcenterStoryCategoryLimit` | function | 21122–21125 | 4 |
| `matchcenterStoryNormalizePickOptions` | function | 21126–21136 | 11 |
| `matchcenterStoryCandidateForBudget` | function | 21137–21146 | 10 |
| `matchcenterStoryPickFactItems` | function | 21147–21199 | 53 |
| `matchcenterStoryPickFacts` | function | 21200–21202 | 3 |
| `matchcenterStoryFormRecord` | function | 21203–21208 | 6 |
| `matchcenterStoryCurrentStreak` | function | 21209–21217 | 9 |
| `matchcenterStoryWinlessStreak` | function | 21218–21226 | 9 |
| `matchcenterStoryFormFact` | function | 21227–21237 | 11 |
| `matchcenterStoryFormFactCandidates` | function | 21238–21257 | 20 |
| `matchcenterStoryLateGoalsForOutcome` | function | 21258–21261 | 4 |
| `matchcenterStoryClutchFact` | function | 21262–21276 | 15 |
| `matchcenterStoryPlayerClutchTotal` | function | 21277–21284 | 8 |
| `matchcenterStoryBestClutchPlayer` | function | 21285–21294 | 10 |
| `matchcenterStoryPlayerClutchFact` | function | 21295–21320 | 26 |
| `matchcenterStoryDuoClutchTotal` | function | 21321–21328 | 8 |
| `matchcenterStoryBestClutchDuo` | function | 21329–21338 | 10 |
| `matchcenterStoryDuoClutchFact` | function | 21339–21341 | 3 |
| `matchcenterStoryDuoFact` | function | 21342–21362 | 21 |
| `matchcenterStoryClutchPriority` | function | 21363–21365 | 3 |
| `matchcenterStoryCompetitionLabel` | function | 21366–21369 | 4 |
| `matchcenterStoryShortDuel` | function | 21370–21374 | 5 |
| `matchcenterStoryLastDuelLabel` | function | 21375–21378 | 4 |
| `matchcenterStoryDirectFactCandidates` | function | 21379–21400 | 22 |
| `matchcenterStoryPlanFactCandidates` | function | 21401–21413 | 13 |
| `matchcenterStoryCategoryForPlanFact` | function | 21414–21422 | 9 |
| `buildMatchcenterStoryPreviewData` | function | 21423–21534 | 112 |
| `matchcenterStoryNameClass` | function | 21535–21540 | 6 |
| `matchcenterStoryVisibleFacts` | function | 21541–21571 | 31 |
| `rMatchcenterStoryLogo` | function | 21572–21576 | 5 |
| `rMatchcenterStoryForm` | function | 21577–21581 | 5 |
| `rMatchcenterStoryPlayerCard` | function | 21582–21589 | 8 |
| `rMatchcenterStoryPreview` | function | 21590–21659 | 70 |
| `rMatchcenterStoryFrame` | function | 21660–21665 | 6 |
| `fitMatchcenterStoryLayout` | function | 21666–21708 | 43 |
| `socialVideoDistributeSceneDurations` | function | 21758–21789 | 32 |
| `socialVideoFitText` | function | 21795–21804 | 10 |
| `socialVideoCheckFonts` | function | 21810–21820 | 11 |
| `probeSocialVideoExportCapability` | function | 21831–21846 | 16 |
| `ensureSocialVideoExportCapabilityChecked` | function | 21853–21857 | 5 |
| `socialVideoUlmGamesForMatchday` | function | 21862–21867 | 6 |
| `socialVideoTableRank` | function | 21869–21873 | 5 |
| `socialVideoFormAsOf` | function | 21877–21882 | 6 |
| `socialVideoLastDuelAsOf` | function | 21886–21892 | 7 |
| `socialVideoTopScorerAsOf` | function | 21898–21927 | 30 |
| `socialVideoOpponentSceneData` | function | 21930–21977 | 48 |
| `socialVideoFileName` | function | 21981–21987 | 7 |
| `socialVideoMatchdayLabel` | function | 21989–21991 | 3 |
| `socialVideoBuildStorySpec` | function | 21994–22045 | 52 |
| `socialVideoBuildFeedSpec` | function | 22048–22097 | 50 |
| `buildSocialVideoSpec` | function | 22107–22122 | 16 |
| `socialVideoHeightForFormat` | function | 22135–22137 | 3 |
| `socialVideoContentWidth` | function | 22138–22140 | 3 |
| `socialVideoEaseOutCubic` | function | 22151–22154 | 4 |
| `socialVideoEstimateFontSize` | function | 22160–22164 | 5 |
| `socialVideoSceneAt` | function | 22170–22177 | 8 |
| `socialVideoElementProgress` | function | 22182–22188 | 7 |
| `socialVideoFlagPhase` | function | 22194–22196 | 3 |
| `socialVideoFlagColumnOffset` | function | 22199–22203 | 5 |
| `socialVideoSkylineTransform` | function | 22207–22211 | 5 |
| `socialVideoSparrowPositions` | function | 22217–22228 | 12 |
| `socialVideoPushText` | function | 22230–22236 | 7 |
| `socialVideoPushLogo` | function | 22243–22248 | 6 |
| `socialVideoPushForm` | function | 22257–22271 | 15 |
| `socialVideoLayoutScene` | function | 22276–22340 | 65 |
| `socialVideoBackgroundLayer` | function | 22344–22380 | 37 |
| `socialVideoDrawList` | function | 22389–22399 | 11 |
| `socialVideoSceneTimeMs` | function | 22403–22407 | 5 |
| `socialVideoStandbildTimeMs` | function | 22410–22416 | 7 |
| `socialVideoApplyFillStyle` | function | 22431–22452 | 22 |
| `socialVideoFontString` | function | 22453–22456 | 4 |
| `socialVideoDrawCommand` | function | 22460–22520 | 61 |
| `socialVideoBuildStaticLayer` | function | 22525–22531 | 7 |
| `socialVideoRenderFrame` | function | 22536–22545 | 10 |
| `socialVideoLoadAssets` | function | 22555–22569 | 15 |
| `socialVideoCreateCanvas` | function | 22571–22579 | 9 |
| `socialVideoPickMimeType` | function | 22582–22586 | 5 |
| `socialVideoCanvasExportHint` | function | 22591–22597 | 7 |
| `socialVideoTagStepError` | function | 22602–22610 | 9 |
| `socialVideoFormatErrorAlert` | function | 22615–22618 | 4 |
| `socialVideoRenderStandbildDataUrl` | function | 22624–22636 | 13 |
| `socialVideoCaptureVideo` | function | 22650–22712 | 63 |
| `downloadSocialVideoStandbild` | window | 22726–22745 | 20 |
| `downloadSocialVideoContactSheet` | window | 22750–22775 | 26 |
| `rMatchcenterPage` | function | 22777–22924 | 148 |
| `rTeamPage` | function | 22925–23235 | 311 |
| `exportExcel` | function | 23240–23261 | 22 |
| `render` | function | 23267–23284 | 18 |
| `_render` | function | 23285–23449 | 165 |
| `uiFormatNumber` | function | 23483–23487 | 5 |
| `uiReliabilityDots` | function | 23496–23503 | 8 |
| `uiDeltaIndicator` | function | 23511–23517 | 7 |
| `uiInfoIcon` | function | 23529–23533 | 5 |
| `uiKennzahlKachel` | function | 23541–23552 | 12 |
| `uiKernaussage` | function | 23561–23567 | 7 |
| `uiHinweisKarte` | function | 23575–23587 | 13 |
| `uiRangliste` | function | 23597–23614 | 18 |
| `uiVerlauf` | function | 23625–23644 | 20 |
| `uiIntervallBalken` | function | 23651–23663 | 13 |
| `uiMethodenbox` | function | 23670–23679 | 10 |
| `uiNotiz` | function | 23687–23691 | 5 |
| `uiPlatzhalter` | function | 23699–23704 | 6 |
| `uiObjektseiteSortTabs` | function | 23749–23757 | 9 |
| `uiObjektseite` | function | 23767–23800 | 34 |
| `mainNavActiveKeyForPage` | function | 23857–23862 | 6 |
| `goToMainNavPoint` | window | 23863–23869 | 7 |
| `rMainNav` | function | 23870–23874 | 5 |
| `rMainNavBottom` | function | 23892–23899 | 8 |
| `openOverview` | window | 23909–23917 | 9 |
| `switchOverviewSeason` | window | 23926–23932 | 7 |
| `openMatchdayTimeline` | window | 23960–23967 | 8 |
| `openMatchday` | window | 23968–23977 | 10 |
| `switchMatchdaySeason` | window | 23979–23984 | 6 |
| `matchdayUlmGames` | function | 23986–23988 | 3 |
| `matchdayGameCardHtml` | function | 23989–23999 | 11 |
| `rMatchdayTimelineRow` | function | 24001–24008 | 8 |
| `rMatchdayTimelinePage` | function | 24009–24019 | 11 |
| `rMatchdayDetailPage` | function | 24020–24055 | 36 |
| `rMatchdayPage` | function | 24056–24062 | 7 |
| `overviewMatchdayStartMs` | function | 24081–24086 | 6 |
| `overviewMatchdayEndMs` | function | 24087–24092 | 6 |
| `detectOverviewPhase` | function | 24093–24118 | 26 |
| `getSeasonDataState` | function | 24125–24135 | 11 |
| `parseSeasonDataState` | function | 24136–24144 | 9 |
| `isNewSeasonDataState` | function | 24146–24148 | 3 |
| `recordOverviewVisit` | function | 24155–24164 | 10 |
| `overviewOpponentLabel` | function | 24165–24169 | 5 |
| `overviewLastMatchdayText` | function | 24170–24173 | 4 |
| `overviewNextMatchdayHtml` | function | 24174–24178 | 5 |
| `overviewCompactTableHtml` | function | 24186–24192 | 7 |
| `overviewFormHtml` | function | 24194–24208 | 15 |
| `overviewSeasonBilanzHtml` | function | 24209–24215 | 7 |
| `overviewSeasonAwardHtml` | function | 24217–24226 | 10 |
| `overviewRecordHtml` | function | 24228–24233 | 6 |
| `overviewCrossSeasonTrendHtml` | function | 24235–24243 | 9 |
| `overviewOpponentPreviewHtml` | function | 24244–24248 | 5 |
| `overviewMatchcenterLinkHtml` | function | 24249–24251 | 3 |
| `overviewLineupLinkHtml` | function | 24252–24254 | 3 |
| `overviewRankChangeTile` | function | 24271–24288 | 18 |
| `buildOverviewCards` | function | 24297–24337 | 41 |
| `rOverviewPage` | function | 24347–24358 | 12 |
| `openLigaGegner` | window | 24359–24362 | 4 |
| `rLigaGegnerPlaceholderPage` | function | 24363–24368 | 6 |
| `rAsOfSelector` | function | 24380–24392 | 13 |
| `setContextAsOf` | window | 24393–24404 | 12 |
| `rSeasonDataPreviewContextHint` | function | 24415–24423 | 9 |
| `rSeasonDataStateContextHint` | function | 24432–24438 | 7 |
| `rContextBar` | function | 24463–24481 | 19 |
| `rIaShell` | function | 24483–24485 | 3 |
| `globalSearchTokens` | function | 24502–24505 | 4 |
| `globalSearchEntries` | function | 24507–24520 | 14 |
| `globalSearchPlayerScore` | function | 24521–24528 | 8 |
| `globalSearchMatchdayScore` | function | 24530–24542 | 13 |
| `globalSearchMatch` | function | 24544–24555 | 12 |
| `globalSearchIsEditableTarget` | function | 24556–24560 | 5 |
| `globalSearchKeyAction` | function | 24562–24576 | 15 |
| `rGlobalSearchToggle` | function | 24577–24579 | 3 |
| `rGlobalSearchResultsHtml` | function | 24580–24590 | 11 |
| `rGlobalSearchPanelHtml` | function | 24591–24593 | 3 |
| `paintGlobalSearchResults` | function | 24594–24601 | 8 |
| `openGlobalSearch` | window | 24602–24626 | 25 |
| `closeGlobalSearch` | window | 24627–24634 | 8 |
| `onGlobalSearchInput` | window | 24635–24640 | 6 |
| `moveGlobalSearch` | function | 24641–24646 | 6 |
| `activateGlobalSearchResult` | window | 24647–24656 | 10 |
| `globalSearchOnKeydown` | function | 24657–24678 | 22 |
| `initGlobalSearch` | function | 24679–24683 | 5 |
| `rToolMenu` | function | 24705–24708 | 4 |
| `toolMenuElements` | function | 24709–24711 | 3 |
| `toolMenuItemElements` | function | 24712–24714 | 3 |
| `isToolMenuOpen` | function | 24715–24718 | 4 |
| `openToolMenu` | window | 24719–24726 | 8 |
| `closeToolMenu` | window | 24727–24733 | 7 |
| `toggleToolMenu` | window | 24734–24737 | 4 |
| `activateToolMenuItem` | window | 24738–24745 | 8 |
| `toolMenuOnKeydown` | function | 24746–24769 | 24 |
| `toolMenuOnClick` | function | 24770–24776 | 7 |
| `initToolMenu` | function | 24777–24780 | 4 |

## Alphabetisches Register

| Name | Art | Zeile |
|---|---|---|
| `_render` | function | 23285 |
| `acceptEinsatzCenterRosterSuggestion` | window | 7966 |
| `activateGlobalSearchResult` | window | 24647 |
| `activateToolMenuItem` | window | 24738 |
| `addComparisonDuo` | window | 13479 |
| `addComparisonDuoFromSelection` | window | 13471 |
| `addComparisonItem` | window | 13379 |
| `addDuoTeamGame` | function | 11491 |
| `addEinsatzCenterExistingGroup` | window | 7983 |
| `addEinsatzCenterGroupPlayer` | window | 8051 |
| `addEinsatzCenterNewGroup` | window | 7992 |
| `addEinsatzCenterRosterPlayer` | window | 7932 |
| `addGoalieGameToStats` | function | 4827 |
| `addGoalieSpecialTeamsGameToStats` | function | 4797 |
| `addLineupBuilderPlayerToActiveLine` | window | 2325 |
| `addLineupBuilderPlayerToLine` | window | 2315 |
| `addLineupPlayer` | window | 2261 |
| `addRosterImpactGameToStats` | function | 12008 |
| `addSelectedComparisonItem` | window | 13387 |
| `addSyntheticLineupPlayer` | window | 2341 |
| `addUnique` | function | 4014 |
| `aggregateAllTimeDuos` | function | 5170 |
| `aggregateAllTimePlayers` | function | 4281 |
| `aggregateAlltimeSpecialTeams` | function | 4777 |
| `aggregateGoalieAlltimeStats` | function | 5010 |
| `aggregateSeasonStats` | function | 5182 |
| `analysisCacheContext` | function | 2167 |
| `analysisCacheKey` | function | 2201 |
| `annotateSpecialTeamsGoalEvent` | function | 4559 |
| `antiSynergyDeltaClass` | function | 12175 |
| `antiSynergyImpactScore` | function | 12090 |
| `antiSynergyPartnerIsSgOnly` | function | 12205 |
| `antiSynergySigned` | function | 12179 |
| `appendSeasonGameDiagnostics` | function | 2678 |
| `applyAppHash` | function | 3781 |
| `applyCurrentSeasonCoverHighlight` | function | 6436 |
| `applyGlobalPageFromHash` | function | 3748 |
| `applySeasonContext` | function | 2430 |
| `applySeasonScoringToRegistry` | function | 4172 |
| `asOfCacheKeyPart` | function | 2195 |
| `asOfEquals` | function | 3452 |
| `assignStatus` | function | 6020 |
| `avgOrNull` | function | 4319 |
| `backToComparisonModeSelect` | window | 13407 |
| `backToHome` | window | 2378 |
| `buildAlltimePlayerDashModel` | function | 14532 |
| `buildAnnotatedGoalEventsForGame` | function | 11097 |
| `buildAppHash` | function | 3598 |
| `buildBalancedLineupSet` | function | 19661 |
| `buildBestThirdManOptions` | function | 10985 |
| `buildComparisonDataset` | function | 13848 |
| `buildComparisonExtraMetrics` | function | 13703 |
| `buildComparisonSummary` | function | 14198 |
| `buildConfidence` | function | 15750 |
| `buildDigitalCoachReport` | function | 18753 |
| `buildDirectDuoLookupForPlayer` | function | 10943 |
| `buildDryRunReport` | function | 6660 |
| `buildDuoAntiSynergy` | function | 12165 |
| `buildDuoComparison` | function | 13492 |
| `buildDuoCompatibility` | function | 11603 |
| `buildDuoDirectProduction` | function | 11467 |
| `buildDuoFloorCeiling` | function | 11378 |
| `buildDuoGapAnalysis` | function | 11586 |
| `buildDuoNetworkContext` | function | 11562 |
| `buildDuoOpponentAdjusted` | function | 11549 |
| `buildDuoProAnalysis` | function | 11660 |
| `buildDuoReplacementOptions` | function | 11650 |
| `buildDuoUntestedPotential` | function | 11626 |
| `buildDuoUsageRate` | function | 11638 |
| `buildDuoWarnings` | function | 11420 |
| `buildDuoWithWithoutImpact` | function | 11515 |
| `buildEinsatzCenterDraftExport` | function | 8112 |
| `buildFieldPlayerExplanation` | function | 15171 |
| `buildGlobalPageHash` | function | 3615 |
| `buildGoalieAnalysisModel` | function | 9904 |
| `buildGoalieComparisonDataset` | function | 13797 |
| `buildGoalieGameRecord` | function | 4879 |
| `buildGoaliePlayerExplanation` | function | 15246 |
| `buildGoalieRoleProfile` | function | 10127 |
| `buildGoalieStatsForSeason` | function | 4929 |
| `buildHallOfFameIntroTitle` | function | 8811 |
| `buildHashStringFromParsed` | function | 3630 |
| `buildIdentityProfiles` | function | 5742 |
| `buildLineAnalysis` | function | 19449 |
| `buildLineupAnalysis` | function | 19274 |
| `buildLineupExperienceProfile` | function | 19051 |
| `buildLineupIntelligence` | function | 19438 |
| `buildLineupOpponentDNAFit` | function | 19106 |
| `buildLineupRecommendations` | function | 19695 |
| `buildLineupScoreBreakdowns` | function | 19408 |
| `buildLockerRoomSheet` | function | 18786 |
| `buildMatchcenterStoryPreviewData` | function | 21423 |
| `buildMatchdayCaptionBlocks` | function | 18857 |
| `buildMatchdays` | function | 3333 |
| `buildMatchIntelligence` | function | 18605 |
| `buildMatchIntelligenceFromContext` | function | 18550 |
| `buildMatchStories` | function | 18653 |
| `buildMomentumSwingStats` | function | 11372 |
| `buildMomentumSwingStatsRaw` | function | 11301 |
| `buildOpponentIntelligence` | function | 10782 |
| `buildOverviewCards` | function | 24297 |
| `buildPlayerDataFoundation` | function | 5199 |
| `buildPlayerEvents` | function | 5253 |
| `buildPlayerExplanation` | function | 15300 |
| `buildPlayerIdentity` | function | 4025 |
| `buildPlayerIntelligence` | function | 15309 |
| `buildRecencyWeightedGlobalIdentityProfile` | function | 12705 |
| `buildRegistry` | function | 5222 |
| `buildResponseGoalStats` | function | 11289 |
| `buildResponseGoalStatsRaw` | function | 11240 |
| `buildRosterImpactAnalysis` | function | 12105 |
| `buildSeasonDataPreviewChanges` | function | 6765 |
| `buildSeasonDuos` | function | 5126 |
| `buildSeasonPlayerDashModel` | function | 14495 |
| `buildSocialMediaContent` | function | 18887 |
| `buildSocialVideoSpec` | function | 22107 |
| `buildSoloDuoProfile` | function | 5511 |
| `buildSpecialTeamsForGame` | function | 4574 |
| `buildSpecialTeamsForSeason` | function | 4768 |
| `buildStandings` | function | 3892 |
| `buildStaticSeasonDataBlock` | function | 6484 |
| `buildTeamLineBalance` | function | 19617 |
| `cachedAnalysis` | function | 2205 |
| `cancelDuoProPicker` | window | 11858 |
| `cancelEinsatzCenterEdit` | window | 7913 |
| `cancelHallOfFameIntro` | function | 8900 |
| `cancelSocialVideoRecording` | window | 20414 |
| `clampScore` | function | 15737 |
| `classicTagLabel` | function | 9054 |
| `classifyGameForStats` | function | 3174 |
| `classifyLineIdentity` | function | 19150 |
| `cleanText` | function | 2526 |
| `cleanupHallOfFameIntro` | function | 8840 |
| `clearAnalysisCache` | function | 2164 |
| `clearComparison` | window | 13398 |
| `clearComparisonDuos` | window | 13486 |
| `clearLineupAvailable` | window | 2314 |
| `clearLineupBuilderLine` | window | 2333 |
| `clearLineupPlayers` | window | 2268 |
| `clearlyAboveAverage` | function | 5699 |
| `clonePlain` | function | 4416 |
| `closeGlobalSearch` | window | 24627 |
| `closeMatchcenterStoryPreview` | window | 2233 |
| `closeToolMenu` | window | 24727 |
| `clutchText` | function | 5583 |
| `collectAssistEventRefs` | function | 2982 |
| `compareGamesChronologically` | function | 3312 |
| `comparisonDuoContext` | function | 13412 |
| `comparisonEventGameKey` | function | 13690 |
| `comparisonEventPhaseLabel` | function | 13693 |
| `comparisonFmt` | function | 13180 |
| `comparisonItemKey` | function | 13158 |
| `comparisonJsArg` | function | 13169 |
| `comparisonNum` | function | 13172 |
| `comparisonOpponentStrengthTier` | function | 13697 |
| `comparisonPct` | function | 13176 |
| `comparisonPctFmt` | function | 13184 |
| `comparisonVariantValue` | function | 13301 |
| `composeIdentityText` | function | 5974 |
| `computeCurrentAppHash` | function | 3650 |
| `computeEinsatzCenterStats` | function | 7126 |
| `computeMetrics` | function | 5357 |
| `computeRosterStatus` | function | 6000 |
| `confidenceCautiousText` | function | 15796 |
| `confirmDuoProSelection` | window | 11863 |
| `confirmEinsatzCenterCombo` | window | 8084 |
| `copyMatchcenterText` | window | 2235 |
| `countBy` | function | 10529 |
| `countCaptainAppearances` | function | 5982 |
| `countGoalieAppearances` | function | 5996 |
| `countMomentumClusters` | function | 5616 |
| `countPlayedUlmGames` | function | 2902 |
| `createPlayerAnalysisProfile` | function | 3951 |
| `createSeasonBucket` | function | 1789 |
| `decodeCp1252AsUtf8` | function | 2471 |
| `decodeHashSegmentSafe` | function | 3523 |
| `dedupeGamesById` | function | 15979 |
| `dedupeIdentityProfileTags` | function | 12782 |
| `deriveAsOfForSeason` | function | 3248 |
| `deriveLineupUlmPlayerIds` | function | 7623 |
| `deriveLineupValidPlayerIds` | function | 7599 |
| `derivePlayerStatus` | function | 4054 |
| `detectOverviewPhase` | function | 24093 |
| `detectSide` | const-arrow | 2611 |
| `detectTypes` | function | 5491 |
| `detectUlmSide` | function | 2604 |
| `diagnoseGameDuplicates` | function | 2656 |
| `diagnosticError` | function | 6235 |
| `diffGameIds` | function | 6607 |
| `difficultConnectionConfidence` | function | 10919 |
| `discardEinsatzCenterAutosave` | function | 7522 |
| `discardSeasonDataPreview` | function | 6864 |
| `dismissEinsatzCenterRosterSuggestion` | window | 7955 |
| `downloadMatchdayStory` | window | 20280 |
| `downloadSocialVideoContactSheet` | window | 22750 |
| `downloadSocialVideoStandbild` | window | 22726 |
| `duoProContextSeasonKey` | function | 11442 |
| `duoProDomId` | function | 11819 |
| `duoProPairKey` | function | 11439 |
| `duoProPickerMessage` | function | 11825 |
| `duoProPickerOpen` | function | 11822 |
| `duoProPlayer` | function | 11456 |
| `duoProResolveCandidate` | function | 11838 |
| `duoProSelectionPayload` | function | 11847 |
| `duoScopeSeasonKeys` | function | 10961 |
| `einsatzCenterAutosaveDraft` | function | 7438 |
| `einsatzCenterAutosaveInfoText` | function | 7544 |
| `einsatzCenterAutosaveKey` | function | 7349 |
| `einsatzCenterCanonicalJson` | function | 7682 |
| `einsatzCenterComputeBaseHash` | function | 7697 |
| `einsatzCenterCurrentRawBaseHash` | function | 7424 |
| `einsatzCenterDeserializeAutosave` | function | 7384 |
| `einsatzCenterDraftInView` | function | 7253 |
| `einsatzCenterDraftIsEmpty` | function | 7361 |
| `einsatzCenterDraftStaleHint` | function | 7267 |
| `einsatzCenterInspectAutosave` | function | 7473 |
| `einsatzCenterIsPlainObject` | function | 7378 |
| `einsatzCenterSerializeDraft` | function | 7365 |
| `einsatzCenterSha256Hex` | function | 7692 |
| `einsatzCenterSoftIssues` | function | 7706 |
| `einsatzCenterStorageRead` | function | 7350 |
| `einsatzCenterStorageRemove` | function | 7356 |
| `einsatzCenterStorageWrite` | function | 7353 |
| `emptyDuoTeamImpactStats` | function | 11488 |
| `emptyFieldRoleSeasonStats` | function | 4010 |
| `emptyGoalieAlltimeStats` | function | 3983 |
| `emptyGoalieSeasonStats` | function | 3961 |
| `emptyGoalieSpecialTeamsStats` | function | 3998 |
| `emptyPlayerSeasonStats` | function | 3955 |
| `emptyRosterImpactStats` | function | 11997 |
| `emptySpecialTeamsStats` | function | 4375 |
| `ensureAppLoaded` | function | 8754 |
| `ensureEinsatzCenterDraft` | function | 7289 |
| `ensureExternalSeasonData` | function | 6462 |
| `ensureFieldRoleSeasonStats` | function | 4120 |
| `ensureGlobalDataLoaded` | function | 8682 |
| `ensureGoalieSeasonStats` | function | 4115 |
| `ensureHallOfFameIntroOverlay` | function | 8778 |
| `ensureLineupDataLoaded` | function | 6972 |
| `ensureLineupGroupsRegistryLoaded` | function | 6997 |
| `ensureRmDuo` | function | 11220 |
| `ensureRmPlayer` | function | 11214 |
| `ensureSocialVideoExportCapabilityChecked` | function | 21853 |
| `escAttr` | function | 9027 |
| `escHtml` | function | 12801 |
| `eventMatchesTeams` | function | 5577 |
| `explainScore` | function | 15800 |
| `exportEinsatzCenterDraft` | window | 8126 |
| `exportExcel` | function | 23240 |
| `fallbackIdentityProfile` | function | 9062 |
| `fetchJson` | function | 6279 |
| `fetchJsonLegacy` | function | 6211 |
| `fetchJsonWithDiagnostics` | function | 6270 |
| `fetchSeasonGameRaw` | function | 6305 |
| `fetchTextWithDiagnostics` | function | 6240 |
| `fileNameForLineupSeasonKey` | function | 6954 |
| `filterComparisonDuoSuggestions` | window | 13444 |
| `filterComparisonPlayers` | window | 13355 |
| `filterLineupBuilderAvailable` | window | 2362 |
| `filterLineupPlayers` | window | 2269 |
| `filterPlayerSuggestions` | function | 13419 |
| `filterPureSGPlayers` | function | 9700 |
| `finalizeDuoTeamImpactStats` | function | 11507 |
| `finalizeGoalieSeasonStats` | function | 4812 |
| `finalizeMomentumStats` | function | 11295 |
| `finalizePlayerRegistrySeason` | function | 4195 |
| `finalizeResponseStats` | function | 11226 |
| `finalizeRosterImpactStats` | function | 12000 |
| `finalizeSpecialTeamsStats` | function | 4419 |
| `findDuplicateGameIds` | function | 6526 |
| `findLineupGameContext` | function | 7031 |
| `findLoadedSeasonPlayer` | function | 9663 |
| `finishHallOfFameIntro` | function | 8867 |
| `finiteNumbers` | function | 4316 |
| `fitMatchcenterStoryLayout` | function | 21666 |
| `fixKnownUiTransliterations` | function | 2521 |
| `fixMojibakeText` | function | 2529 |
| `formatDateDE` | function | 3406 |
| `formatDiagnosticAttempt` | function | 6286 |
| `formatGameLoadError` | function | 6299 |
| `formatStatus` | function | 6283 |
| `gameClassificationStatusLabel` | function | 2670 |
| `gameDaySortValue` | function | 4485 |
| `gameResult` | function | 3881 |
| `gameScore` | function | 3144 |
| `gameStableId` | function | 2653 |
| `gameStatusText` | function | 3137 |
| `generatePlayerInsights` | function | 9525 |
| `generateSocialVideoContactSheets` | window | 20441 |
| `generateSocialVideoStandbilder` | window | 20417 |
| `generateSocialVideoVideos` | window | 20372 |
| `getActiveAlltimeSeasonKeys` | function | 10701 |
| `getActiveSeasonKey` | function | 2390 |
| `getAllLoadedSeasonGames` | function | 10894 |
| `getAlltimeAggregatedStyleProfile` | function | 14375 |
| `getAllTimeCoverStats` | function | 8633 |
| `getAllTimeDuoRows` | function | 10849 |
| `getAllTimeDuoRowsForPlayer` | function | 10587 |
| `getAllTimeGamesPlayedRows` | function | 10627 |
| `getAllTimeIdentityStandings` | function | 12669 |
| `getAllTimeMainPlayerRows` | function | 9704 |
| `getAllTimeOpponentIntelligence` | function | 12590 |
| `getAllTimeOpponentNames` | function | 2581 |
| `getAllTimeOpponentTopScorers` | function | 12598 |
| `getAllTimePenaltyRows` | function | 10652 |
| `getAllTimePlayerRows` | function | 9672 |
| `getAlltimeRank` | function | 13114 |
| `getAlltimeRecencyWeight` | function | 10712 |
| `getAllTimeSgOnlyRows` | function | 9707 |
| `getAssistDiagnostics` | function | 5071 |
| `getAssistPlayersFromEvent` | function | 3010 |
| `getCanonicalTeamName` | function | 15952 |
| `getCarryPerformanceRows` | function | 10598 |
| `getComparisonAlltimeTeamGoals` | function | 13205 |
| `getComparisonAlltimeTrend` | function | 13279 |
| `getComparisonChemistryFromEvents` | function | 13213 |
| `getComparisonClutchFromEvents` | function | 13218 |
| `getComparisonCurrentSelection` | function | 13344 |
| `getComparisonEventsForItem` | function | 13662 |
| `getComparisonPlayerOptions` | function | 13286 |
| `getComparisonPlayerRow` | function | 13187 |
| `getComparisonProfile` | function | 13248 |
| `getComparisonRosterGames` | function | 13682 |
| `getComparisonRosterGamesForSeason` | function | 13665 |
| `getComparisonSeasonEvents` | function | 13208 |
| `getComparisonSeasonLabel` | function | 13190 |
| `getComparisonSeasonTrend` | function | 13253 |
| `getComparisonStyleProfile` | function | 13223 |
| `getComparisonTeamGoalsForSeason` | function | 13193 |
| `getComparisonVariantsForPlayer` | function | 13304 |
| `getDifficultConnectionRowsForPlayer` | function | 11952 |
| `getDuoDirectScorerGameCounts` | function | 11016 |
| `getDuoFieldPlayerRows` | function | 11445 |
| `getDuoRowsForPlayerScope` | function | 10924 |
| `getDuoScorerCountsWithCandidate` | function | 10965 |
| `getDuoSharedFieldRows` | function | 11461 |
| `getEffectiveLineupData` | function | 7239 |
| `getEinsatzCenterGameDraft` | function | 7311 |
| `getEmptyState` | function | 15851 |
| `getFieldGameIdsForPlayer` | function | 2811 |
| `getFurtherSameDayUlmGames` | function | 4501 |
| `getGameDurationMinutes` | function | 4480 |
| `getGameId` | function | 6520 |
| `getGlobalAllTimeSnapshot` | function | 2422 |
| `getGlobalIdentityProfile` | function | 12754 |
| `getGlobalLoadableSeasonKeys` | function | 8626 |
| `getGlobalOpponentSpecialistProfile` | function | 14831 |
| `getGlobalPlayerBestSeason` | function | 10580 |
| `getGlobalPlayerMilestones` | function | 10763 |
| `getGlobalPlayerOpponentGameRows` | function | 14802 |
| `getGlobalPlayerPeakGame` | function | 10569 |
| `getGlobalPlayerTeamRecord` | function | 10543 |
| `getGlobalProfileEvents` | function | 10516 |
| `getGlobalRookieMilestone` | function | 10752 |
| `getGlobalRookieSeasonKey` | function | 10738 |
| `getGlobalSeasonStatRows` | function | 13098 |
| `getGlobalTopScorerMilestones` | function | 10725 |
| `getGoalieComparisonAlltimeTrend` | function | 13761 |
| `getGoalieComparisonSeasonTrend` | function | 13778 |
| `getGoalieDiagnostics` | function | 5057 |
| `getGoalieDnaRows` | function | 10205 |
| `getGoalieGameIdsForPlayer` | function | 2818 |
| `getGoalieOpponentName` | function | 4356 |
| `getGoalieOpponentTier` | function | 4360 |
| `getGoalScorerFromEvent` | function | 2976 |
| `getHallGoalieData` | function | 12964 |
| `getHallOfFamePlayerIdSet` | function | 10512 |
| `getHallOfFamePlayerRows` | function | 10509 |
| `getHallOfFameStats` | function | 12624 |
| `getJerseyNumber` | function | 2915 |
| `getLineupAllRows` | function | 18967 |
| `getLineupPlayerPool` | function | 18978 |
| `getLoadedSeasonPlayerUi` | function | 10538 |
| `getLoadedSeasonPointsByName` | function | 10482 |
| `getMatchcenterDirectOpponents` | function | 16150 |
| `getMatchcenterOpponents` | function | 16117 |
| `getOpponentAliasKeys` | function | 15958 |
| `getOpponentAliasKeysForMatchcenter` | function | 16030 |
| `getOppStrength` | function | 3933 |
| `getOrCreatePlayerProfile` | function | 4063 |
| `getPenaltyBasePersonalMinutes` | function | 4516 |
| `getPenaltyDisciplineMinutes` | function | 4534 |
| `getPenaltyDisciplineType` | function | 4472 |
| `getPenaltyPersonalMinutes` | function | 4524 |
| `getPenaltySpecialTeamsMinutes` | function | 4513 |
| `getPhaseIndex` | function | 5342 |
| `getPhaseKey` | function | 3042 |
| `getPlayedUlmGames` | function | 2893 |
| `getPlayerAlltimeFieldGames` | function | 2855 |
| `getPlayerAlltimeGoalieGames` | function | 2858 |
| `getPlayerAlltimeRoleGames` | function | 2836 |
| `getPlayerAlltimeStats` | function | 9715 |
| `getPlayerAlltimeTotalGames` | function | 2861 |
| `getPlayerFieldGames` | function | 2825 |
| `getPlayerGoalieAlltimeStats` | function | 9736 |
| `getPlayerGoalieGames` | function | 2829 |
| `getPlayerGoalieSeasonStats` | function | 9731 |
| `getPlayerRegistryProfile` | function | 9723 |
| `getPlayerRoleAvailability` | function | 9766 |
| `getPlayerSeasonRoleGameSummary` | function | 2870 |
| `getPlayerSeasonStats` | function | 9710 |
| `getPlayerSourceId` | function | 2912 |
| `getPreClubHistoryPlayerNames` | function | 2645 |
| `getPreviousSeasonKey` | function | 10437 |
| `getRelevantSeasonGames` | function | 3216 |
| `getRosterEntryRegistryProfile` | function | 10915 |
| `getRosterGameIdsForPlayer` | function | 2752 |
| `getRosterImpactPlayerEventLookup` | function | 12018 |
| `getRosterImpactPlayerGames` | function | 12039 |
| `getRosterStatus` | function | 10718 |
| `getScoreLabel` | function | 15741 |
| `getSeasonApiBaseUrl` | function | 1814 |
| `getSeasonData` | function | 2393 |
| `getSeasonDataPreview` | function | 6870 |
| `getSeasonDataState` | function | 24125 |
| `getSeasonIdentityProfile` | function | 10672 |
| `getSeasonmanagerRosterSuggestion` | function | 7653 |
| `getSeasonMatchdays` | function | 3383 |
| `getSeasonOriginBaseUrl` | function | 1834 |
| `getSeasonPlayerFieldBasis` | function | 9131 |
| `getSeasonScopedIdentityProfile` | function | 9158 |
| `getSeasonStatsAsOf` | function | 3286 |
| `getSeasonTeamGameIds` | function | 2909 |
| `getSeasonTeamGames` | function | 2905 |
| `getSeasonUiPlayerForProfile` | function | 10668 |
| `getSpecialTeamsDiagnostics` | function | 5064 |
| `getSpecialTeamsPenaltyChunks` | function | 4537 |
| `getStaticSeasonGames` | function | 6369 |
| `getStoredLastView` | function | 3729 |
| `getSyntheticLineupPlayers` | function | 18944 |
| `getSyntheticLineupRow` | function | 18947 |
| `getSyntheticLineupRows` | function | 18964 |
| `getTeamAllTimeRecords` | function | 12548 |
| `getTeamLogoUrlForStory` | function | 20938 |
| `getUlmTeamStatus` | function | 2599 |
| `getUniqueAllTimeOpponentNames` | function | 2589 |
| `globalSearchEntries` | function | 24507 |
| `globalSearchIsEditableTarget` | function | 24556 |
| `globalSearchKeyAction` | function | 24562 |
| `globalSearchMatch` | function | 24544 |
| `globalSearchMatchdayScore` | function | 24530 |
| `globalSearchOnKeydown` | function | 24657 |
| `globalSearchPlayerScore` | function | 24521 |
| `globalSearchTokens` | function | 24502 |
| `goalieApplySampleConfidence` | function | 9889 |
| `goalieBucketLooseSum` | function | 9897 |
| `goalieBucketRows` | function | 9809 |
| `goalieClampScore` | function | 9854 |
| `goalieDetailFirstTime` | function | 9833 |
| `goalieDnaKey` | function | 10114 |
| `goalieDnaValue` | function | 10119 |
| `goalieEntryRecognitionReason` | function | 2775 |
| `goalieEventAbsSeconds` | function | 4333 |
| `goalieEventSecondInPeriod` | function | 9840 |
| `goalieGameDurationSeconds` | function | 4339 |
| `goalieGameStateBeforeGoal` | function | 4344 |
| `goalieInverseScore` | function | 9858 |
| `goalieNum` | function | 9795 |
| `goaliePctText` | function | 9846 |
| `goaliePositiveCurveScore` | function | 9874 |
| `goaliePositiveScore` | function | 9866 |
| `goalieSafeNum` | function | 9850 |
| `goalieStateGoals` | function | 10126 |
| `goalieStdDev` | function | 9827 |
| `goalieTierMeta` | function | 9818 |
| `goalieTime` | function | 9801 |
| `goalieTopRow` | function | 9815 |
| `goalieWeightedScore` | function | 9883 |
| `goToMainNavPoint` | window | 23863 |
| `hallGoalieExplainForLabel` | function | 13001 |
| `hallGoalieNameHtml` | function | 12980 |
| `hallGoalieNum` | function | 12866 |
| `hallGoaliePkStats` | function | 12892 |
| `hallGoalieRowFromStats` | function | 12931 |
| `hallGoalieSeasonLabel` | function | 12880 |
| `hallGoalieSeasonScore` | function | 12911 |
| `hallGoalieTime` | function | 12872 |
| `hallGoalieTooltip` | function | 12997 |
| `hallGoalieTopteamStats` | function | 12904 |
| `handleComparisonDuoSearchKey` | window | 13452 |
| `hasEmbeddedSeasonData` | function | 8623 |
| `hashSegmentToSeasonKey` | function | 3436 |
| `hasSeasonRole` | function | 5726 |
| `hasSeasonSource` | function | 8619 |
| `hofIntroDelay` | function | 8775 |
| `identityClutchGoalsVsTeams` | function | 5607 |
| `identityDecisiveGoalsVsTeams` | function | 5610 |
| `identityGoalsVsTeams` | function | 5604 |
| `identityInputs` | function | 5641 |
| `identityLateGoalsVsTeams` | function | 5613 |
| `identityOpponentGroups` | function | 5569 |
| `identityPartnerStats` | function | 5555 |
| `identityPointsVsTeams` | function | 5601 |
| `incGoalieBucket` | function | 4329 |
| `incrementUniqueCounter` | function | 4018 |
| `initGlobalSearch` | function | 24679 |
| `initHashRouting` | function | 3860 |
| `initToolMenu` | function | 24777 |
| `invalidateGlobalIdentityCache` | function | 2219 |
| `isActiveAlltimeSeasonStats` | function | 10687 |
| `isComebackRelevantGoal` | function | 5597 |
| `isDecisiveGoal` | function | 5589 |
| `isEinsatzCenterGameFromDraft` | function | 7248 |
| `isExcludedGoalieAppearance` | function | 2785 |
| `isFieldAppearance` | function | 2805 |
| `isFreiburgTuebingenSgName` | function | 2575 |
| `isGameAtOrBeforeAsOf` | function | 3163 |
| `isGamePlayed` | function | 3122 |
| `isGoalieAppearance` | function | 2799 |
| `isGoalieRosterEntry` | function | 2761 |
| `isHallOfFameEligiblePlayer` | function | 10503 |
| `isHallRowPureSG` | function | 12881 |
| `isImportantClutchGoal` | function | 5584 |
| `isLateGoal` | function | 5592 |
| `isMannheimLudwigshafenSgName` | function | 2578 |
| `isMatchPenaltyEvent` | function | 4464 |
| `isNewSeasonDataState` | function | 24146 |
| `isOwnTeam` | function | 15941 |
| `isPenaltyGoalEvent` | function | 4547 |
| `isPreClubHistoryPlayerName` | function | 2648 |
| `isPureSGPlayer` | function | 9696 |
| `isRookieCandidateForSeason` | function | 10472 |
| `isSameUlmTeamContext` | function | 4493 |
| `isSeasonDataPreviewStale` | function | 6878 |
| `isSgOnlyAlltimePlayer` | function | 9688 |
| `isSgOnlyHallOfFameExcluded` | function | 10494 |
| `isSyntheticLineupPlayerId` | function | 18941 |
| `isToolMenuOpen` | function | 24715 |
| `isTwoPlusTwoPenaltyEvent` | function | 4468 |
| `isUlmTeamName` | function | 2593 |
| `isUsableExternalSeasonData` | function | 6453 |
| `isValidAsOfDate` | function | 3440 |
| `isValidAsOfStartTime` | function | 3443 |
| `isVisibleSecondaryTrait` | function | 9033 |
| `isYouthGame` | function | 3127 |
| `kpiBadge` | function | 14156 |
| `kpiDelta` | function | 13889 |
| `kpiItemColor` | function | 13895 |
| `kpiNiceMax` | function | 14046 |
| `kpiRadarValue` | function | 13969 |
| `kpiTrendRows` | function | 14052 |
| `kpiValueText` | function | 13885 |
| `lexiconEntry` | function | 15540 |
| `lexiconUniqueKeys` | function | 15532 |
| `lineupAverage` | function | 18993 |
| `lineupBuilderPoolIds` | function | 2276 |
| `lineupCombinationIds` | function | 19470 |
| `lineupDirectChemistryScore` | function | 19514 |
| `lineupEvaluateComplementCandidate` | function | 19521 |
| `lineupGroupDisplayName` | function | 7157 |
| `lineupLevelLabel` | function | 18997 |
| `lineupOpponentDNAForContext` | function | 19094 |
| `lineupPlayerAnchorScore` | function | 19599 |
| `lineupPlayerProfile` | function | 19198 |
| `lineupRankCandidateIds` | function | 19455 |
| `lineupRecommendationReason` | function | 19686 |
| `lineupRoleDnaComplementScore` | function | 19490 |
| `lineupRosterGamesForPlayer` | function | 19003 |
| `lineupRowMap` | function | 19452 |
| `lineupRowMeta` | function | 18970 |
| `lineupScore` | function | 18987 |
| `lineupStdDev` | function | 19484 |
| `linkUiPlayersToRegistry` | function | 4150 |
| `loadEinsatzCenterMismatchedAutosave` | function | 7568 |
| `loadSeason` | function | 8699 |
| `loadSeasonData` | function | 8153 |
| `loadSeasonForGlobal` | function | 8651 |
| `loadSeasonManifest` | function | 6384 |
| `mainNavActiveKeyForPage` | function | 23857 |
| `markFieldRoleAppearance` | function | 4125 |
| `matchcenterAddDuoConnection` | function | 16806 |
| `matchcenterAddPlanItem` | function | 18022 |
| `matchcenterAddPlanWatch` | function | 18028 |
| `matchcenterAddScoring` | function | 16367 |
| `matchcenterAddUlmDuoConnection` | function | 16957 |
| `matchcenterAddUlmScoring` | function | 16587 |
| `matchcenterAliasModeForContext` | function | 16027 |
| `matchcenterAllGames` | function | 16111 |
| `matchcenterAllGamesForSeason` | function | 16091 |
| `matchcenterAnalyzeDirect` | function | 16201 |
| `matchcenterAnalyzeForm` | function | 16238 |
| `matchcenterBuildCoachActivationHints` | function | 18738 |
| `matchcenterBuildCoachAvoidList` | function | 18728 |
| `matchcenterBuildCoachDangerPatterns` | function | 18710 |
| `matchcenterBuildCoachHints` | function | 18466 |
| `matchcenterBuildCoachIfThen` | function | 18718 |
| `matchcenterBuildCoachKeyActors` | function | 18745 |
| `matchcenterBuildCoachLevers` | function | 18700 |
| `matchcenterBuildCoachPriorities` | function | 18693 |
| `matchcenterBuildGoalieMatchup` | function | 17158 |
| `matchcenterBuildInsights` | function | 17444 |
| `matchcenterBuildIntelHeadline` | function | 18482 |
| `matchcenterBuildIntelligenceDataQuality` | function | 18117 |
| `matchcenterBuildIntelligenceSignals` | function | 18503 |
| `matchcenterBuildIntelListFromPlan` | function | 18457 |
| `matchcenterBuildMatchPlan` | function | 19802 |
| `matchcenterBuildOneThingToWatch` | function | 18490 |
| `matchcenterBuildOpponentAlarm` | function | 18347 |
| `matchcenterBuildOpponentDNA` | function | 18168 |
| `matchcenterBuildOpponentDuoInsights` | function | 16905 |
| `matchcenterBuildOpponentDuos` | function | 16860 |
| `matchcenterBuildOpponentPlayerInsights` | function | 16503 |
| `matchcenterBuildOpponentScouting` | function | 16431 |
| `matchcenterBuildPlanConfidence` | function | 18034 |
| `matchcenterBuildSpecialTeamsMatchup` | function | 17088 |
| `matchcenterBuildTimingAnalysis` | function | 17281 |
| `matchcenterBuildTimingInsights` | function | 17270 |
| `matchcenterBuildUlmDuoInsights` | function | 17055 |
| `matchcenterBuildUlmDuos` | function | 17012 |
| `matchcenterBuildUlmPlayerInsights` | function | 16749 |
| `matchcenterBuildUlmPlayerScouting` | function | 16694 |
| `matchcenterClamp` | function | 15728 |
| `matchcenterClassifyUlmGoalEvent` | function | 16576 |
| `matchcenterCoachAdd` | function | 18630 |
| `matchcenterCoachCautious` | function | 18627 |
| `matchcenterCoachGameModel` | function | 18639 |
| `matchcenterCoachPriorityFromAlarm` | function | 18683 |
| `matchcenterConfidenceClass` | function | 18009 |
| `matchcenterContextGames` | function | 16195 |
| `matchcenterDateLabel` | function | 15898 |
| `matchcenterDateValue` | function | 15893 |
| `matchcenterDefaultSeasonKey` | function | 16013 |
| `matchcenterDeriveOpponentType` | function | 18281 |
| `matchcenterDetectUlmSide` | function | 16003 |
| `matchcenterDirectContextGames` | function | 17068 |
| `matchcenterDirectGames` | function | 16181 |
| `matchcenterDuoDirectionLabel` | function | 16799 |
| `matchcenterDuoPairKey` | function | 16762 |
| `matchcenterEmptyBuckets` | function | 16517 |
| `matchcenterEmptyTimingStats` | function | 17217 |
| `matchcenterEnsureOpponentDuo` | function | 16766 |
| `matchcenterEnsureOpponentPlayer` | function | 16340 |
| `matchcenterEnsureUlmDuo` | function | 16919 |
| `matchcenterEnsureUlmPlayer` | function | 16525 |
| `matchcenterEventNumber` | function | 16303 |
| `matchcenterFinalizeOpponentDuos` | function | 16825 |
| `matchcenterFinalizeOpponentPlayerProfiles` | function | 16384 |
| `matchcenterFinalizeUlmDuos` | function | 16976 |
| `matchcenterFinalizeUlmPlayers` | function | 16625 |
| `matchcenterFindRosterPlayer` | function | 16292 |
| `matchcenterFmt` | function | 15883 |
| `matchcenterFormLine` | function | 17439 |
| `matchcenterGameKey` | function | 16264 |
| `matchcenterGameLine` | function | 17433 |
| `matchcenterGameScore` | function | 16078 |
| `matchcenterGameSideForOpponentKey` | function | 16067 |
| `matchcenterGameSideForTeam` | function | 16059 |
| `matchcenterGameTeamName` | function | 16056 |
| `matchcenterGoalAbsSeconds` | function | 17201 |
| `matchcenterGoalieFitScore` | function | 17141 |
| `matchcenterGoalieKey` | function | 17136 |
| `matchcenterGoalMinute` | function | 16318 |
| `matchcenterInferPriority` | function | 18015 |
| `matchcenterIntelAddAlarm` | function | 18326 |
| `matchcenterIntelCurve` | function | 18069 |
| `matchcenterIntelDataLabel` | function | 18114 |
| `matchcenterIntelDuoRef` | function | 18312 |
| `matchcenterIntelInverseCurve` | function | 18075 |
| `matchcenterIntelPct` | function | 18094 |
| `matchcenterIntelPlayerRef` | function | 18299 |
| `matchcenterIntelPriorityClass` | function | 18104 |
| `matchcenterIntelPriorityFromScore` | function | 18098 |
| `matchcenterIntelPriorityLabel` | function | 18110 |
| `matchcenterIntelRate` | function | 18090 |
| `matchcenterIntelWeighted` | function | 18079 |
| `matchcenterIsClutchGoalEvent` | function | 16329 |
| `matchcenterIsFreiburgTuebingenTeamName` | function | 15988 |
| `matchcenterIsLateGoalEvent` | function | 16324 |
| `matchcenterIsUlmTeamName` | function | 15995 |
| `matchcenterNum` | function | 15733 |
| `matchcenterOpponentMode` | function | 16114 |
| `matchcenterOutcomeForTeam` | function | 16082 |
| `matchcenterPct` | function | 17084 |
| `matchcenterPenaltyMinutes` | function | 16308 |
| `matchcenterPersonalPenaltyMinutesForSide` | function | 17075 |
| `matchcenterPlanRateText` | function | 18001 |
| `matchcenterPlanScoreText` | function | 17997 |
| `matchcenterPlayerDisplayName` | function | 16286 |
| `matchcenterPlayerKey` | function | 16297 |
| `matchcenterPriorityLabel` | function | 18006 |
| `matchcenterRegisterPlayerGame` | function | 16364 |
| `matchcenterRegisterUlmProfileGame` | function | 16563 |
| `matchcenterResultClass` | function | 17422 |
| `matchcenterResultLetter` | function | 17425 |
| `matchcenterRosterPlayers` | function | 16282 |
| `matchcenterScoutingGames` | function | 16267 |
| `matchcenterSeasonHasGames` | function | 16010 |
| `matchcenterSeasonIsUlmTuebingenSgEra` | function | 15915 |
| `matchcenterSeasonKeys` | function | 15908 |
| `matchcenterSeasonLabel` | function | 15912 |
| `matchcenterSigned` | function | 15888 |
| `matchcenterSocialAdd` | function | 18807 |
| `matchcenterSocialCaption` | function | 18814 |
| `matchcenterSortGamesAsc` | function | 15903 |
| `matchcenterSpecialTeamsForGame` | function | 17071 |
| `matchcenterStoryAddCandidate` | function | 21099 |
| `matchcenterStoryAddFact` | function | 21080 |
| `matchcenterStoryBestClutchDuo` | function | 21329 |
| `matchcenterStoryBestClutchPlayer` | function | 21285 |
| `matchcenterStoryCandidateForBudget` | function | 21137 |
| `matchcenterStoryCategoryForPlanFact` | function | 21414 |
| `matchcenterStoryCategoryLimit` | function | 21122 |
| `matchcenterStoryClutchFact` | function | 21262 |
| `matchcenterStoryClutchPriority` | function | 21363 |
| `matchcenterStoryCompetitionLabel` | function | 21366 |
| `matchcenterStoryCurrentStreak` | function | 21209 |
| `matchcenterStoryDirectFactCandidates` | function | 21379 |
| `matchcenterStoryDownloadFileName` | function | 20270 |
| `matchcenterStoryDuoClutchFact` | function | 21339 |
| `matchcenterStoryDuoClutchTotal` | function | 21321 |
| `matchcenterStoryDuoFact` | function | 21342 |
| `matchcenterStoryEstimateFactWeight` | function | 21093 |
| `matchcenterStoryFactKey` | function | 21087 |
| `matchcenterStoryFormFact` | function | 21227 |
| `matchcenterStoryFormFactCandidates` | function | 21238 |
| `matchcenterStoryFormLetters` | function | 21044 |
| `matchcenterStoryFormRecord` | function | 21203 |
| `matchcenterStoryInitials` | function | 20907 |
| `matchcenterStoryInlineStat` | function | 21005 |
| `matchcenterStoryLastDuelLabel` | function | 21375 |
| `matchcenterStoryLateGoalsForOutcome` | function | 21258 |
| `matchcenterStoryLogoBase` | function | 20913 |
| `matchcenterStoryLogoForOpponent` | function | 20968 |
| `matchcenterStoryLooksArtificial` | function | 21090 |
| `matchcenterStoryNameClass` | function | 21535 |
| `matchcenterStoryNormalizePickOptions` | function | 21126 |
| `matchcenterStoryPickFactItems` | function | 21147 |
| `matchcenterStoryPickFacts` | function | 21200 |
| `matchcenterStoryPlanFactCandidates` | function | 21401 |
| `matchcenterStoryPlayer` | function | 21047 |
| `matchcenterStoryPlayerClutchFact` | function | 21295 |
| `matchcenterStoryPlayerClutchTotal` | function | 21277 |
| `matchcenterStoryRankRows` | function | 21032 |
| `matchcenterStoryRankText` | function | 21001 |
| `matchcenterStorySafeLogoUrl` | function | 20919 |
| `matchcenterStoryShortDuel` | function | 21370 |
| `matchcenterStoryShortTeamLabel` | function | 21008 |
| `matchcenterStoryTableRank` | function | 20983 |
| `matchcenterStoryTeamAssetKey` | function | 20933 |
| `matchcenterStoryUlmTableRank` | function | 20994 |
| `matchcenterStoryVisibleFacts` | function | 21541 |
| `matchcenterStoryWinlessStreak` | function | 21218 |
| `matchcenterTeamDisplay` | function | 16019 |
| `matchcenterTeamKey` | function | 16022 |
| `matchcenterTimeValue` | function | 17209 |
| `matchcenterTimingStatsForGames` | function | 17233 |
| `matchcenterUlmScoutingConfidence` | function | 16520 |
| `matchcenterUlmTeamLabelForGame` | function | 17428 |
| `matchcenterUpdateUlmSeasonRow` | function | 16569 |
| `matchcenterWindowForSecond` | function | 17226 |
| `matchdayAsOfCutoff` | function | 3396 |
| `matchdayGameCardHtml` | function | 23989 |
| `matchdayUlmGames` | function | 23986 |
| `medianOrNull` | function | 4323 |
| `mergeDuoSet` | function | 5153 |
| `mergeGoalieSpecialTeamsStats` | function | 4785 |
| `mergeSpecialTeamsStats` | function | 4429 |
| `mojibakeScore` | function | 2466 |
| `moveGlobalSearch` | function | 24641 |
| `normalizeAssistPlayerName` | function | 2979 |
| `normalizeComparisonItem` | function | 13164 |
| `normalizeDuoComparisonItem` | function | 13408 |
| `normalizeEventPlayerRef` | function | 2918 |
| `normalizeGame` | function | 6347 |
| `normalizeLineupLines` | function | 2279 |
| `normalizeOpponentNameForAllTime` | function | 2564 |
| `normalizePlayerDisplayName` | function | 2619 |
| `normalizePlayerName` | function | 2635 |
| `normalizeSecondaryTraits` | function | 5700 |
| `normalizeTeamKey` | function | 15933 |
| `normalizeTeamName` | function | 2554 |
| `normalizeTeamNameForMatchcenter` | function | 15998 |
| `onGlobalSearchInput` | window | 24635 |
| `openAllTimePlayers` | window | 8767 |
| `openComparisonCenter` | window | 8937 |
| `openDuoProPicker` | window | 11857 |
| `openEinsatzCenter` | window | 7108 |
| `openGlobalSearch` | window | 24602 |
| `openHallOfFame` | window | 8913 |
| `openLexicon` | window | 9010 |
| `openLigaGegner` | window | 24359 |
| `openLineupBuilder` | window | 8988 |
| `openMatchcenter` | window | 8966 |
| `openMatchcenterStoryPreview` | window | 2232 |
| `openMatchday` | window | 23968 |
| `openMatchdayTimeline` | window | 23960 |
| `openOverview` | window | 23909 |
| `openSeason` | window | 8764 |
| `openToolMenu` | window | 24719 |
| `overviewCompactTableHtml` | function | 24186 |
| `overviewCrossSeasonTrendHtml` | function | 24235 |
| `overviewFormHtml` | function | 24194 |
| `overviewLastMatchdayText` | function | 24170 |
| `overviewLineupLinkHtml` | function | 24252 |
| `overviewMatchcenterLinkHtml` | function | 24249 |
| `overviewMatchdayEndMs` | function | 24087 |
| `overviewMatchdayStartMs` | function | 24081 |
| `overviewNextMatchdayHtml` | function | 24174 |
| `overviewOpponentLabel` | function | 24165 |
| `overviewOpponentPreviewHtml` | function | 24244 |
| `overviewRankChangeTile` | function | 24271 |
| `overviewRecordHtml` | function | 24228 |
| `overviewSeasonAwardHtml` | function | 24217 |
| `overviewSeasonBilanzHtml` | function | 24209 |
| `p1NarrativeKey` | function | 15815 |
| `paintGlobalSearchResults` | function | 24594 |
| `parseAppHash` | function | 3543 |
| `parseAsOfQueryValue` | function | 3582 |
| `parseComparisonVariant` | function | 13329 |
| `parseGameClock` | function | 3031 |
| `parseLastViewState` | function | 3717 |
| `parseSeasonDataState` | function | 24136 |
| `pct` | function | 5508 |
| `pctValue` | function | 12804 |
| `pdashBestPhase` | function | 14442 |
| `pdashInsight` | function | 14480 |
| `pdashInsights` | function | 14483 |
| `pdashNum` | function | 14426 |
| `pdashOpponentStrength` | function | 14460 |
| `pdashOpponentTier` | function | 14454 |
| `pdashPct` | function | 14430 |
| `pdashPhaseLabel` | function | 14434 |
| `pdashTopCount` | function | 14438 |
| `pdashTopOpponent` | function | 14450 |
| `pdashTopPartner` | function | 14446 |
| `penaltyRawText` | function | 4461 |
| `pFull` | function | 2612 |
| `playerAppearedForUlmStatusInSeasonByName` | function | 10453 |
| `playerAppearedInSeasonByName` | function | 10442 |
| `playerExplainAdd` | function | 15116 |
| `playerExplainConfidence` | function | 15107 |
| `playerExplainConfidenceLabel` | function | 15113 |
| `playerExplainContextSentence` | function | 15152 |
| `playerExplainHeadline` | function | 15142 |
| `playerExplainRolePhrase` | function | 15133 |
| `playerExplainStyleSignature` | function | 15121 |
| `probeSocialVideoExportCapability` | function | 21831 |
| `processGame` | function | 3063 |
| `rAlltimeKpis` | function | 13120 |
| `rAlltimePlayerDashboard` | function | 14635 |
| `rAllTimePlayersPage` | function | 15397 |
| `rankNarratives` | function | 15837 |
| `rAntiSynergyCompareChip` | function | 12184 |
| `rAntiSynergyDelta` | function | 12168 |
| `rAntiSynergyMainDelta` | function | 12209 |
| `rAntiSynergyMetricRow` | function | 12192 |
| `rAsOfSelector` | function | 24380 |
| `ratio01` | function | 5509 |
| `rCarryPerformanceRows` | function | 10614 |
| `rClassicRoleTags` | function | 9119 |
| `rClassicTagTip` | function | 9057 |
| `rClutch` | function | 9325 |
| `rClutchBadge` | function | 9019 |
| `rComparisonCenterPage` | function | 14305 |
| `rComparisonDashboard` | function | 14256 |
| `rComparisonDuoSearchBox` | function | 13638 |
| `rComparisonDuoSuggestionButtons` | function | 13431 |
| `rComparisonMiniOverview` | function | 14244 |
| `rComparisonModeSelect` | function | 13659 |
| `rComparisonRoles` | function | 14248 |
| `rComparisonStyles` | function | 14267 |
| `rContextBar` | function | 24463 |
| `rDifficultConnectionList` | function | 12219 |
| `rDifficultConnectionListCompact` | function | 12286 |
| `rDifficultConnectionListCompactLegacy` | function | 12244 |
| `rDifficultConnectionsCard` | function | 12325 |
| `rDuoCenterPro` | function | 11704 |
| `rDuoCompareSummaryCards` | function | 13517 |
| `rDuoComparisonBars` | function | 13512 |
| `rDuoComparisonChemistry` | function | 13570 |
| `rDuoComparisonContext` | function | 13602 |
| `rDuoComparisonDashboard` | function | 13624 |
| `rDuoComparisonDetails` | function | 13620 |
| `rDuoComparisonImpact` | function | 13586 |
| `rDuoComparisonPage` | function | 13648 |
| `rDuoComparisonProfile` | function | 13548 |
| `rDuoProPlayerSelect` | function | 11886 |
| `rDuoResponseMomentumCard` | function | 12482 |
| `rDuoRows` | function | 10873 |
| `recommendLineComplements` | function | 19774 |
| `recordOverviewVisit` | function | 24155 |
| `registerPlayerIdentity` | function | 4097 |
| `registerSeasonRosters` | function | 4130 |
| `rEinsatzCenterAutosaveBanner` | function | 7530 |
| `rEinsatzCenterCombo` | function | 7053 |
| `rEinsatzCenterComboEditor` | function | 7758 |
| `rEinsatzCenterDraftBanner` | function | 7271 |
| `rEinsatzCenterDraftMark` | function | 7257 |
| `rEinsatzCenterDraftStatsHint` | function | 7261 |
| `rEinsatzCenterEditPage` | function | 7858 |
| `rEinsatzCenterGameCard` | function | 7062 |
| `rEinsatzCenterGameEditor` | function | 7805 |
| `rEinsatzCenterGroup` | function | 7040 |
| `rEinsatzCenterGroupEditor` | function | 7727 |
| `rEinsatzCenterPage` | function | 7081 |
| `rEinsatzCenterRosterSuggestionCard` | function | 7774 |
| `rEinsatzCenterStats` | function | 7163 |
| `relative01` | function | 5510 |
| `removeComparisonDuo` | window | 13482 |
| `removeComparisonItem` | window | 13394 |
| `removeEinsatzCenterCombo` | window | 8095 |
| `removeEinsatzCenterGroup` | window | 8009 |
| `removeEinsatzCenterGroupPlayer` | window | 8059 |
| `removeEinsatzCenterRosterPlayer` | window | 7940 |
| `removeLineupBuilderPlayerFromLine` | window | 2326 |
| `removeLineupPlayer` | window | 2267 |
| `rEmptyState` | function | 15863 |
| `renameEinsatzCenterGroup` | window | 8031 |
| `render` | function | 23267 |
| `renderComparisonDuoSuggestions` | function | 13435 |
| `renderTags` | function | 9127 |
| `repairMojibake` | function | 2485 |
| `repairRenderedMojibake` | function | 2532 |
| `resetPlayerRegistrySeason` | function | 4042 |
| `resolveAssistPlayer` | function | 3024 |
| `resolveCurrentSeasonKey` | function | 6416 |
| `resolveGoalScorerPlayer` | function | 2961 |
| `resolveLineupPlayerName` | function | 7025 |
| `resolvePlayerRoleView` | function | 9780 |
| `resolveRosterPlayerByRef` | function | 2930 |
| `responseExcerpt` | function | 6232 |
| `responseMomentumAbsSeconds` | function | 11049 |
| `responseMomentumActor` | function | 11078 |
| `responseMomentumConfidence` | function | 11198 |
| `responseMomentumEmptyState` | function | 11203 |
| `responseMomentumGameRows` | function | 11062 |
| `responseMomentumGoalActors` | function | 11089 |
| `responseMomentumPairKey` | function | 11211 |
| `responseMomentumSide` | function | 11069 |
| `responseMomentumTime` | function | 11055 |
| `responseMomentumTooltipFor` | function | 12406 |
| `restoreEinsatzCenterAutosave` | function | 7504 |
| `restoreHallOfFameIntroPrevious` | function | 8855 |
| `resultGoalsAgainstForSide` | function | 4365 |
| `returnToEinsatzCenterEdit` | window | 7926 |
| `rGlobalAllTimeStats` | function | 14743 |
| `rGlobalCareerHeader` | function | 14652 |
| `rGlobalDevelopment` | function | 14761 |
| `rGlobalDnaBars` | function | 14396 |
| `rGlobalDuoNetwork` | function | 14861 |
| `rGlobalOpponentSpecialist` | function | 15060 |
| `rGlobalOverview` | function | 14690 |
| `rGlobalPartnerOpponentPanel` | function | 14638 |
| `rGlobalProfileTags` | function | 12795 |
| `rGlobalSearchPanelHtml` | function | 24591 |
| `rGlobalSearchResultsHtml` | function | 24580 |
| `rGlobalSearchToggle` | function | 24577 |
| `rGoalieAnalysis` | function | 10406 |
| `rGoalieBars` | function | 10063 |
| `rGoalieDnaBars` | function | 10209 |
| `rGoalieFirstGoalResistance` | function | 10246 |
| `rGoalieInsights` | function | 10319 |
| `rGoalieKpis` | function | 10223 |
| `rGoalieMiniMetrics` | function | 10240 |
| `rGoalieMomentum` | function | 10260 |
| `rGoalieOpponents` | function | 10361 |
| `rGoalieOverview` | function | 10341 |
| `rGoaliePhaseProfile` | function | 10302 |
| `rGoaliePhases` | function | 10358 |
| `rGoalieRoleTraits` | function | 10201 |
| `rGoalieStability` | function | 10373 |
| `rGoalieTable` | function | 10398 |
| `rGoalieTierCards` | function | 10274 |
| `rHallDuoTemple` | function | 12857 |
| `rHallGoalieAwardCards` | function | 13048 |
| `rHallGoalieLegends` | function | 13065 |
| `rHallGoalieRankCard` | function | 13016 |
| `rHallOfFameHero` | function | 12808 |
| `rHallOfFamePage` | function | 15439 |
| `rHallPodiumList` | function | 12834 |
| `rHallSGBadge` | function | 12889 |
| `rIaShell` | function | 24483 |
| `rIdentityCards` | function | 9093 |
| `rIdentityTags` | function | 9073 |
| `rInsights` | function | 9586 |
| `rInteractiveDuoCenterPro` | function | 11893 |
| `rKpiCards` | function | 13898 |
| `rKpiExtendedMetrics` | function | 14031 |
| `rKpiInfoCards` | function | 14166 |
| `rKpiMetricCard` | function | 14023 |
| `rKpiMirrorRows` | function | 13909 |
| `rKpiObjectMini` | function | 14159 |
| `rKpiOpponentStrength` | function | 14128 |
| `rKpiRadar` | function | 13980 |
| `rKpiShareBars` | function | 14015 |
| `rKpiTextMetricCard` | function | 14028 |
| `rKpiTrendCompare` | function | 14061 |
| `rKPIVergleich` | function | 14230 |
| `rLexiconPage` | function | 15554 |
| `rLexiconRows` | function | 15550 |
| `rLigaGegnerPlaceholderPage` | function | 24363 |
| `rLineupBuilderAvailablePanel` | function | 20631 |
| `rLineupBuilderPage` | function | 20807 |
| `rLineupComplementCards` | function | 20728 |
| `rLineupMetricPills` | function | 20617 |
| `rLineupRecommendationCards` | function | 20679 |
| `rLineupRecommendationMode` | function | 20694 |
| `rLineupScoreRows` | function | 20513 |
| `rLineupSimpleCards` | function | 20535 |
| `rLineupTestLine` | function | 20741 |
| `rLineupTestMode` | function | 20790 |
| `rMainNav` | function | 23870 |
| `rMainNavBottom` | function | 23892 |
| `rMatchcenterCoachCardList` | function | 20097 |
| `rMatchcenterCoachIfThen` | function | 20111 |
| `rMatchcenterCoachSimpleList` | function | 20119 |
| `rMatchcenterCopyButton` | function | 20189 |
| `rMatchcenterDetailsSection` | function | 17414 |
| `rMatchcenterDigitalCoach` | function | 20124 |
| `rMatchcenterDuoRankCard` | function | 17735 |
| `rMatchcenterDuoRow` | function | 17711 |
| `rMatchcenterDuosTab` | function | 17882 |
| `rMatchcenterDuoWatchCard` | function | 17691 |
| `rMatchcenterFormCard` | function | 17472 |
| `rMatchcenterFormSection` | function | 17388 |
| `rMatchcenterGamesList` | function | 17493 |
| `rMatchcenterGoalieCard` | function | 17944 |
| `rMatchcenterGoalieMatchup` | function | 17968 |
| `rMatchcenterIntelCoachHints` | function | 20083 |
| `rMatchcenterIntelOverview` | function | 20037 |
| `rMatchcenterKpi` | function | 17465 |
| `rMatchcenterLineupBuilder` | function | 20544 |
| `rMatchcenterLockerList` | function | 20194 |
| `rMatchcenterLockerRoomSheet` | function | 20206 |
| `rMatchcenterMatchPlan` | function | 20885 |
| `rMatchcenterOpponentAlarm` | function | 20015 |
| `rMatchcenterOpponentDNA` | function | 19982 |
| `rMatchcenterOpponentDuos` | function | 17839 |
| `rMatchcenterOpponentScouting` | function | 17652 |
| `rMatchcenterPage` | function | 22777 |
| `rMatchcenterPlanItems` | function | 19948 |
| `rMatchcenterPlanWatch` | function | 19966 |
| `rMatchcenterPlayerRow` | function | 17526 |
| `rMatchcenterPlayersTab` | function | 17688 |
| `rMatchcenterProfileSection` | function | 17368 |
| `rMatchcenterRankCard` | function | 17550 |
| `rMatchcenterResponseMomentum` | function | 12509 |
| `rMatchcenterScoutingSummary` | function | 20841 |
| `rMatchcenterSocialBlock` | function | 20262 |
| `rMatchcenterSocialMediaCenter` | function | 20459 |
| `rMatchcenterSpecialCard` | function | 17885 |
| `rMatchcenterSpecialTeams` | function | 17894 |
| `rMatchcenterStoryForm` | function | 21577 |
| `rMatchcenterStoryFrame` | function | 21660 |
| `rMatchcenterStoryLogo` | function | 21572 |
| `rMatchcenterStoryPlayerCard` | function | 21582 |
| `rMatchcenterStoryPreview` | function | 21590 |
| `rMatchcenterTabs` | function | 17365 |
| `rMatchcenterTimeBars` | function | 17292 |
| `rMatchcenterTiming` | function | 17326 |
| `rMatchcenterTimingStatsCard` | function | 17306 |
| `rMatchcenterUlmDuoRankCard` | function | 17790 |
| `rMatchcenterUlmDuoRow` | function | 17767 |
| `rMatchcenterUlmDuos` | function | 17796 |
| `rMatchcenterUlmDuoWatchCard` | function | 17741 |
| `rMatchcenterUlmImpactCard` | function | 17556 |
| `rMatchcenterUlmPlayerRow` | function | 17585 |
| `rMatchcenterUlmRankCard` | function | 17609 |
| `rMatchcenterUlmScouting` | function | 17615 |
| `rMatchcenterWatchCard` | function | 17505 |
| `rMatchdayDetailPage` | function | 24020 |
| `rMatchdayPage` | function | 24056 |
| `rMatchdayTimelinePage` | function | 24009 |
| `rMatchdayTimelineRow` | function | 24001 |
| `rMatrix` | function | 9198 |
| `rmTerm` | function | 12413 |
| `roleGameStableKey` | function | 2833 |
| `roleTraitLabel` | function | 9030 |
| `rOppBreakdown` | function | 9490 |
| `rOpponentIntelBars` | function | 10837 |
| `rOpponentTopScorerTable` | function | 12648 |
| `rosterImpactConfidence` | function | 12080 |
| `rosterImpactConfidenceWeight` | function | 12086 |
| `rosterPlayerMatches` | function | 2737 |
| `rOverviewPage` | function | 24347 |
| `rPdashLabel` | function | 14587 |
| `rPdashStat` | function | 14590 |
| `rPenalties` | function | 9471 |
| `rPhases` | function | 9255 |
| `rPlayerDash` | function | 14593 |
| `rPlayerDashStyles` | function | 14575 |
| `rPlayerExplainItems` | function | 15339 |
| `rPlayerExplanation` | function | 15344 |
| `rPlayerResponseMomentumCard` | function | 12463 |
| `rPlayerRoleSwitch` | function | 9788 |
| `rRadar` | function | 9275 |
| `rRes` | const-arrow | 9018 |
| `rResponseMomentumOverviewCard` | function | 12439 |
| `rRmKpi` | function | 12417 |
| `rRmTopList` | function | 12428 |
| `rRoleTraitTip` | function | 9037 |
| `rRosterImpactStatLine` | function | 12201 |
| `rRosterStatusBadge` | function | 9046 |
| `rScoreBreakdown` | function | 15867 |
| `rSeasonDataPreviewCard` | function | 6897 |
| `rSeasonDataPreviewContextHint` | function | 24415 |
| `rSeasonDataPreviewRows` | function | 6887 |
| `rSeasonDataPreviewStatus` | function | 6884 |
| `rSeasonDataStateContextHint` | function | 24432 |
| `rSeasonDuoCenterPro` | function | 11949 |
| `rSeasonDuoSummary` | function | 9245 |
| `rSeasonInsightsTab` | function | 9571 |
| `rSeasonLandingPage` | function | 14674 |
| `rSeasonPlayerDashboard` | function | 14632 |
| `rSeasonProfileKpis` | function | 9170 |
| `rSeasonProfileTagStrip` | function | 9191 |
| `rSeasonTrendRows` | function | 14356 |
| `rSocialVideoBlock` | function | 20331 |
| `rSparkline` | function | 13134 |
| `rStyleMetricTip` | function | 9042 |
| `rStyleProfileBars` | function | 9082 |
| `rTable` | function | 9640 |
| `rTeamPage` | function | 22925 |
| `rTeamResponseMomentumCard` | function | 12502 |
| `rTimeline` | function | 9360 |
| `rToolMenu` | function | 24705 |
| `runComparison` | window | 13399 |
| `runDuoComparison` | window | 13487 |
| `saveLastView` | function | 3734 |
| `scoreNarrative` | function | 15818 |
| `seasonApiUrl` | function | 1831 |
| `seasonDataPreviewRerender` | function | 6743 |
| `seasonDataPreviewRow` | function | 6747 |
| `seasonGameApiUrls` | function | 1849 |
| `seasonGameHtmlUrls` | function | 1859 |
| `seasonHasPureUlmTeam` | function | 10487 |
| `seasonKeyToHashSegment` | function | 3433 |
| `seasonOrderIndex` | function | 10432 |
| `seasonPathPrefix` | function | 1843 |
| `seasonRoleKeysForPlayer` | function | 5717 |
| `seasonRoleTraitsFromClassic` | function | 5712 |
| `seasonStatNumber` | function | 10677 |
| `seasonStatSetSize` | function | 10681 |
| `seedHallOfFameIntroParticles` | function | 8822 |
| `selectAllLineupAvailable` | window | 2313 |
| `selectComparisonDuoSuggestion` | window | 13445 |
| `selectComparisonMode` | window | 13406 |
| `selectComparisonPlayer` | window | 13363 |
| `selectDuoProQuick` | window | 11859 |
| `selectEinsatzCenterEditGame` | window | 7928 |
| `selectEnforcerKeys` | function | 5729 |
| `serializeFieldRoleSeasonStats` | function | 4246 |
| `serializeGoalieSeasonStats` | function | 4224 |
| `serializeSeasonStats` | function | 4211 |
| `serializeSpecialTeamsStats` | function | 4426 |
| `setAntiSynergyView` | window | 2359 |
| `setComparisonDuoMode` | window | 13416 |
| `setComparisonDuoPlayer` | window | 13465 |
| `setComparisonDuoSearch` | window | 13418 |
| `setComparisonDuoSeasonKey` | window | 13417 |
| `setComparisonRoleMode` | window | 13369 |
| `setComparisonVariant` | window | 13374 |
| `setContextAsOf` | window | 24393 |
| `setDuoProPickerState` | function | 11828 |
| `setDuoProSelection` | window | 11878 |
| `setEinsatzCenterGameNote` | window | 8102 |
| `setEinsatzCenterGroupPlayerPosition` | window | 8067 |
| `setEinsatzCenterIncludeDraft` | window | 7927 |
| `setEinsatzCenterSeason` | window | 7102 |
| `setGlobalPlayer` | window | 2385 |
| `setGlobalPlayerDuo` | window | 2386 |
| `setGlobalTab` | window | 2387 |
| `setGoalieTab` | window | 2226 |
| `setLineupActiveLine` | window | 2298 |
| `setLineupBuilderMode` | window | 2297 |
| `setLineupBuilderOpponent` | window | 2296 |
| `setLineupBuilderSeason` | window | 2284 |
| `setLineupNewPlayerProfile` | window | 2340 |
| `setMatchcenterContext` | window | 9007 |
| `setMatchcenterOpponent` | window | 9006 |
| `setMatchcenterSeason` | window | 9008 |
| `setMatchcenterTab` | window | 2231 |
| `setP` | window | 2223 |
| `setPage` | window | 2369 |
| `setPlayerRoleView` | window | 2225 |
| `setSeasonDataPreviewOpen` | window | 6933 |
| `setSeasonDataPreviewPasteText` | window | 6934 |
| `setState` | const-arrow | 2211 |
| `setTab` | window | 2224 |
| `showLineupComplements` | window | 2339 |
| `showMainShell` | function | 8614 |
| `socialDuoFocusLine` | function | 18837 |
| `socialEnsurePeriod` | function | 18823 |
| `socialFirstUseful` | function | 18827 |
| `socialKeyFactLine` | function | 18847 |
| `socialOpponentLine` | function | 18843 |
| `socialPlayerFocusLine` | function | 18830 |
| `socialSentence` | function | 18820 |
| `socialVideoApplyFillStyle` | function | 22431 |
| `socialVideoBackgroundLayer` | function | 22344 |
| `socialVideoBuildFeedSpec` | function | 22048 |
| `socialVideoBuildStaticLayer` | function | 22525 |
| `socialVideoBuildStorySpec` | function | 21994 |
| `socialVideoCanvasExportHint` | function | 22591 |
| `socialVideoCaptureVideo` | function | 22650 |
| `socialVideoCheckFonts` | function | 21810 |
| `socialVideoContentWidth` | function | 22138 |
| `socialVideoCreateCanvas` | function | 22571 |
| `socialVideoDistributeSceneDurations` | function | 21758 |
| `socialVideoDrawCommand` | function | 22460 |
| `socialVideoDrawList` | function | 22389 |
| `socialVideoEaseOutCubic` | function | 22151 |
| `socialVideoElementProgress` | function | 22182 |
| `socialVideoEstimateFontSize` | function | 22160 |
| `socialVideoFileName` | function | 21981 |
| `socialVideoFitText` | function | 21795 |
| `socialVideoFlagColumnOffset` | function | 22199 |
| `socialVideoFlagPhase` | function | 22194 |
| `socialVideoFontString` | function | 22453 |
| `socialVideoFormAsOf` | function | 21877 |
| `socialVideoFormatErrorAlert` | function | 22615 |
| `socialVideoHeightForFormat` | function | 22135 |
| `socialVideoJobsForMatchday` | function | 20365 |
| `socialVideoLastDuelAsOf` | function | 21886 |
| `socialVideoLayoutScene` | function | 22276 |
| `socialVideoLoadAssets` | function | 22555 |
| `socialVideoMatchdayLabel` | function | 21989 |
| `socialVideoOpponentSceneData` | function | 21930 |
| `socialVideoPickMimeType` | function | 22582 |
| `socialVideoPushForm` | function | 22257 |
| `socialVideoPushLogo` | function | 22243 |
| `socialVideoPushText` | function | 22230 |
| `socialVideoRenderFrame` | function | 22536 |
| `socialVideoRenderStandbildDataUrl` | function | 22624 |
| `socialVideoSceneAt` | function | 22170 |
| `socialVideoSceneTimeMs` | function | 22403 |
| `socialVideoSkylineTransform` | function | 22207 |
| `socialVideoSparrowPositions` | function | 22217 |
| `socialVideoStandbildTimeMs` | function | 22410 |
| `socialVideoTableRank` | function | 21869 |
| `socialVideoTagStepError` | function | 22602 |
| `socialVideoTopScorerAsOf` | function | 21898 |
| `socialVideoUlmGamesForMatchday` | function | 21862 |
| `specialTeamsStateFromActive` | function | 4552 |
| `stageSeasonDataPreview` | function | 6793 |
| `stageSeasonDataPreviewFromFile` | function | 6845 |
| `stageSeasonDataPreviewFromPaste` | function | 6859 |
| `startApp` | window | 8752 |
| `startEinsatzCenterDraftMode` | window | 7908 |
| `startHallOfFameIntro` | function | 8875 |
| `sumRoleGames` | function | 9760 |
| `switchMatchdaySeason` | window | 23979 |
| `switchOverviewSeason` | window | 23926 |
| `syncHashFromState` | function | 3676 |
| `t2s` | const-arrow | 3041 |
| `teamAliasRuleMatches` | function | 15936 |
| `teamAliasSeasonMatches` | function | 15927 |
| `toggleAntiSynergyHideSgOnly` | window | 2361 |
| `toggleAntiSynergyShowAll` | window | 2360 |
| `toggleComparisonPicker` | window | 13393 |
| `toggleComparisonSgOnly` | window | 13378 |
| `toggleEinsatzCenterComboPlayer` | window | 8076 |
| `toggleEinsatzCenterGroupRename` | window | 8017 |
| `toggleEinsatzCenterRosterSuggestionPlayer` | window | 7948 |
| `toggleHallOfFamePureSGPlayers` | window | 2234 |
| `toggleLineupBuilderAvailable` | window | 2299 |
| `toggleMatchcenterDuoDetails` | window | 2230 |
| `toggleMatchcenterGames` | window | 9009 |
| `toggleMatchcenterPlayerDetails` | window | 2229 |
| `toggleMatchcenterSpecialTeamsGames` | window | 2228 |
| `toggleSgOnlyAlltime` | window | 2388 |
| `toggleSpecialTeamsGameDetails` | window | 2227 |
| `toggleToolMenu` | window | 24734 |
| `toolMenuElements` | function | 24709 |
| `toolMenuItemElements` | function | 24712 |
| `toolMenuOnClick` | function | 24770 |
| `toolMenuOnKeydown` | function | 24746 |
| `toPublicPlayerRegistry` | function | 4250 |
| `uiDeltaIndicator` | function | 23511 |
| `uiFormatNumber` | function | 23483 |
| `uiHinweisKarte` | function | 23575 |
| `uiInfoIcon` | function | 23529 |
| `uiIntervallBalken` | function | 23651 |
| `uiKennzahlKachel` | function | 23541 |
| `uiKernaussage` | function | 23561 |
| `uiMethodenbox` | function | 23670 |
| `uiNotiz` | function | 23687 |
| `uiObjektseite` | function | 23767 |
| `uiObjektseiteSortTabs` | function | 23749 |
| `uiPlatzhalter` | function | 23699 |
| `uiRangliste` | function | 23597 |
| `uiReliabilityDots` | function | 23496 |
| `uiVerlauf` | function | 23625 |
| `uniqueList` | function | 1846 |
| `updateCoverAllTimeStats` | function | 8641 |
| `updatePlayerRoleAvailability` | function | 5046 |
| `validateGameStructure` | function | 6554 |
| `validateMergedSeason` | function | 6641 |
| `validateSeasonGames` | function | 6595 |
| `validateSeasonKey` | function | 6618 |
| `validateWrapperFormat` | function | 6630 |
| `variance` | function | 3054 |
| `viewEinsatzCenterMergedView` | window | 7925 |
| `warnEventProcessingOnce` | function | 2729 |
| `withoutHashSync` | function | 3693 |

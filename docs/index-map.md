# Code-Karte: index.html

<!-- index-map: source-sha256=5dc8505db54e6fd2ca418ea2fd1e4c8547b502ac92386b1b18c6751d8683544c source-lines=23435 -->

Automatisch erzeugt von `scripts/build-index-map.mjs`. Nicht von Hand bearbeiten — bei Änderungen an index.html erneut ausführen: `node scripts/build-index-map.mjs --write`. Vor gezieltem Lesen prüfen, ob die Karte noch aktuell ist: `node scripts/build-index-map.mjs --check`.

index.html: 23435 Zeilen gesamt (SHA-256 `5dc8505db54e6fd2ca418ea2fd1e4c8547b502ac92386b1b18c6751d8683544c`). Statischer `<style>`-Block: Zeile 11–1550. Haupt-`<script>`-Block: Zeile 1664–23431.

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
| `buildGoalieRoleProfile` | function | 9797–9870 | 74 |
| `rGoalieInsights` | function | 9989–10010 | 22 |
| `buildOpponentIntelligence` | function | 10452–10505 | 54 |
| `buildBestThirdManOptions` | function | 10655–10688 | 34 |
| `getDuoDirectScorerGameCounts` | function | 10689–10720 | 32 |
| `buildAnnotatedGoalEventsForGame` | function | 10770–10870 | 101 |
| `buildResponseGoalStatsRaw` | function | 10913–10961 | 49 |
| `buildMomentumSwingStatsRaw` | function | 10974–11044 | 71 |
| `buildDuoFloorCeiling` | function | 11051–11092 | 42 |
| `buildDuoWithWithoutImpact` | function | 11188–11221 | 34 |
| `buildDuoCompatibility` | function | 11287–11309 | 23 |
| `buildDuoProAnalysis` | function | 11346–11389 | 44 |
| `rDuoCenterPro` | function | 11390–11509 | 120 |
| `rInteractiveDuoCenterPro` | function | 11584–11639 | 56 |
| `getDifficultConnectionRowsForPlayer` | function | 11643–11687 | 45 |
| `getRosterImpactPlayerGames` | function | 11780–11821 | 42 |
| `buildRosterImpactAnalysis` | function | 11855–11923 | 69 |
| `rDifficultConnectionList` | function | 12000–12024 | 25 |
| `rDifficultConnectionListCompactLegacy` | function | 12025–12066 | 42 |
| `rDifficultConnectionListCompact` | function | 12067–12105 | 39 |
| `rDifficultConnectionsCard` | function | 12106–12142 | 37 |
| `RESPONSE_MOMENTUM_TOOLTIPS` | const-data | 12145–12176 | 32 |
| `rResponseMomentumOverviewCard` | function | 12239–12262 | 24 |
| `rMatchcenterResponseMomentum` | function | 12309–12346 | 38 |
| `getTeamAllTimeRecords` | function | 12348–12388 | 41 |
| `getAllTimeIdentityStandings` | function | 12469–12503 | 35 |
| `buildRecencyWeightedGlobalIdentityProfile` | function | 12505–12552 | 48 |
| `rHallOfFameHero` | function | 12608–12633 | 26 |
| `hallGoalieRowFromStats` | function | 12731–12763 | 33 |
| `rHallGoalieRankCard` | function | 12816–12847 | 32 |
| `rHallGoalieLegends` | function | 12865–12897 | 33 |
| `buildDuoComparison` | function | 13292–13311 | 20 |
| `rDuoCompareSummaryCards` | function | 13317–13347 | 31 |
| `rDuoComparisonPage` | function | 13448–13458 | 11 |
| `buildComparisonExtraMetrics` | function | 13503–13560 | 58 |
| `buildGoalieComparisonDataset` | function | 13597–13647 | 51 |
| `buildComparisonDataset` | function | 13648–13683 | 36 |
| `rKpiMirrorRows` | function | 13723–13782 | 60 |
| `rKpiRadar` | function | 13794–13828 | 35 |
| `rKpiTrendCompare` | function | 13875–13941 | 67 |
| `rKpiOpponentStrength` | function | 13942–13969 | 28 |
| `rKpiInfoCards` | function | 13980–14011 | 32 |
| `buildComparisonSummary` | function | 14012–14043 | 32 |
| `rComparisonStyles` | function | 14081–14118 | 38 |
| `rComparisonCenterPage` | function | 14119–14169 | 51 |
| `rGlobalDnaBars` | function | 14210–14239 | 30 |
| `buildSeasonPlayerDashModel` | function | 14309–14345 | 37 |
| `buildAlltimePlayerDashModel` | function | 14346–14388 | 43 |
| `rPlayerDashStyles` | function | 14389–14400 | 12 |
| `rPlayerDash` | function | 14407–14445 | 39 |
| `rGlobalOverview` | function | 14504–14555 | 52 |
| `rGlobalDevelopment` | function | 14575–14613 | 39 |
| `rGlobalDuoNetwork` | function | 14675–14872 | 198 |
| `rGlobalOpponentSpecialist` | function | 14874–14919 | 46 |
| `buildFieldPlayerExplanation` | function | 14985–15059 | 75 |
| `buildGoaliePlayerExplanation` | function | 15060–15113 | 54 |
| `buildPlayerIntelligence` | function | 15123–15152 | 30 |
| `rPlayerExplanation` | function | 15158–15209 | 52 |
| `rAllTimePlayersPage` | function | 15211–15251 | 41 |
| `rHallOfFamePage` | function | 15253–15341 | 89 |
| `rLexiconPage` | function | 15368–15540 | 173 |
| `buildConfidence` | function | 15557–15602 | 46 |
| `getMatchcenterOpponents` | function | 15766–15798 | 33 |
| `getMatchcenterDirectOpponents` | function | 15799–15829 | 31 |
| `matchcenterAnalyzeDirect` | function | 15832–15868 | 37 |
| `matchcenterEnsureUlmPlayer` | function | 15925–15962 | 38 |
| `matchcenterAddUlmScoring` | function | 15987–16024 | 38 |
| `matchcenterFinalizeUlmPlayers` | function | 16025–16093 | 69 |
| `matchcenterBuildUlmPlayerScouting` | function | 16094–16148 | 55 |
| `matchcenterEnsureOpponentDuo` | function | 16166–16198 | 33 |
| `matchcenterFinalizeOpponentDuos` | function | 16225–16259 | 35 |
| `matchcenterBuildOpponentDuos` | function | 16260–16304 | 45 |
| `matchcenterEnsureUlmDuo` | function | 16319–16356 | 38 |
| `matchcenterFinalizeUlmDuos` | function | 16376–16411 | 36 |
| `matchcenterBuildUlmDuos` | function | 16412–16454 | 43 |
| `matchcenterBuildSpecialTeamsMatchup` | function | 16488–16535 | 48 |
| `matchcenterBuildGoalieMatchup` | function | 16558–16603 | 46 |
| `matchcenterTimingStatsForGames` | function | 16636–16672 | 37 |
| `rMatchcenterUlmScouting` | function | 17016–17052 | 37 |
| `rMatchcenterOpponentScouting` | function | 17053–17088 | 36 |
| `rMatchcenterUlmDuos` | function | 17197–17239 | 43 |
| `rMatchcenterOpponentDuos` | function | 17240–17282 | 43 |
| `rMatchcenterSpecialTeams` | function | 17295–17344 | 50 |
| `matchcenterBuildPlanConfidence` | function | 17435–17482 | 48 |
| `matchcenterBuildIntelligenceDataQuality` | function | 17531–17600 | 70 |
| `matchcenterBuildOpponentDNA` | function | 17601–17713 | 113 |
| `matchcenterBuildOpponentAlarm` | function | 17780–17889 | 110 |
| `matchcenterBuildIntelligenceSignals` | function | 17936–17982 | 47 |
| `buildMatchIntelligenceFromContext` | function | 17983–18037 | 55 |
| `buildMatchStories` | function | 18086–18115 | 30 |
| `buildDigitalCoachReport` | function | 18186–18218 | 33 |
| `buildMatchdayCaptionBlocks` | function | 18290–18319 | 30 |
| `buildSocialMediaContent` | function | 18320–18368 | 49 |
| `lineupRosterGamesForPlayer` | function | 18436–18483 | 48 |
| `buildLineupExperienceProfile` | function | 18484–18526 | 43 |
| `buildLineupOpponentDNAFit` | function | 18539–18582 | 44 |
| `classifyLineIdentity` | function | 18583–18630 | 48 |
| `lineupPlayerProfile` | function | 18631–18706 | 76 |
| `buildLineupAnalysis` | function | 18707–18840 | 134 |
| `buildLineupScoreBreakdowns` | function | 18841–18870 | 30 |
| `lineupEvaluateComplementCandidate` | function | 18954–19032 | 79 |
| `buildTeamLineBalance` | function | 19058–19101 | 44 |
| `buildLineupRecommendations` | function | 19138–19219 | 82 |
| `matchcenterBuildMatchPlan` | function | 19248–19393 | 146 |
| `rMatchcenterOpponentDNA` | function | 19428–19460 | 33 |
| `rMatchcenterIntelOverview` | function | 19483–19528 | 46 |
| `rMatchcenterDigitalCoach` | function | 19570–19634 | 65 |
| `rMatchcenterLockerRoomSheet` | function | 19652–19707 | 56 |
| `downloadMatchdayStory` | window | 19726–19773 | 48 |
| `rSocialVideoBlock` | function | 19777–19808 | 32 |
| `generateSocialVideoVideos` | window | 19818–19859 | 42 |
| `rMatchcenterSocialMediaCenter` | function | 19910–19963 | 54 |
| `rMatchcenterLineupBuilder` | function | 19995–20067 | 73 |
| `rLineupBuilderAvailablePanel` | function | 20082–20129 | 48 |
| `rLineupRecommendationMode` | function | 20145–20178 | 34 |
| `rLineupTestLine` | function | 20192–20240 | 49 |
| `rLineupBuilderPage` | function | 20258–20292 | 35 |
| `rMatchcenterScoutingSummary` | function | 20293–20336 | 44 |
| `getTeamLogoUrlForStory` | function | 20381–20410 | 30 |
| `matchcenterStoryPickFactItems` | function | 20533–20585 | 53 |
| `buildMatchcenterStoryPreviewData` | function | 20804–20915 | 112 |
| `matchcenterStoryVisibleFacts` | function | 20922–20952 | 31 |
| `rMatchcenterStoryPreview` | function | 20971–21040 | 70 |
| `fitMatchcenterStoryLayout` | function | 21047–21089 | 43 |
| `rMatchcenterPage` | function | 21168–21316 | 149 |
| `rTeamPage` | function | 21317–21655 | 339 |
| `exportExcel` | function | 21660–21685 | 26 |
| `_render` | function | 21709–21878 | 170 |
| `uiObjektseite` | function | 22264–22297 | 34 |
| `rMatchdayDetailPage` | function | 22565–22604 | 40 |
| `buildOverviewCards` | function | 22886–22926 | 41 |

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
| `rGoalieBars` | function | 9730–9742 | 13 |
| `goalieDnaKey` | function | 9784–9788 | 5 |
| `goalieDnaValue` | function | 9789–9795 | 7 |
| `goalieStateGoals` | function | 9796–9796 | 1 |
| `buildGoalieRoleProfile` | function | 9797–9870 | 74 |
| `rGoalieRoleTraits` | function | 9871–9874 | 4 |
| `getGoalieDnaRows` | function | 9875–9878 | 4 |
| `rGoalieDnaBars` | function | 9879–9892 | 14 |
| `rGoalieKpis` | function | 9893–9909 | 17 |
| `rGoalieMiniMetrics` | function | 9910–9915 | 6 |
| `rGoalieFirstGoalResistance` | function | 9916–9929 | 14 |
| `rGoalieMomentum` | function | 9930–9943 | 14 |
| `rGoalieTierCards` | function | 9944–9971 | 28 |
| `rGoaliePhaseProfile` | function | 9972–9988 | 17 |
| `rGoalieInsights` | function | 9989–10010 | 22 |
| `rGoalieOverview` | function | 10011–10027 | 17 |
| `rGoaliePhases` | function | 10028–10030 | 3 |
| `rGoalieOpponents` | function | 10031–10042 | 12 |
| `rGoalieStability` | function | 10043–10071 | 29 |
| `rGoalieTable` | function | 10072–10079 | 8 |
| `rGoalieAnalysis` | function | 10080–10105 | 26 |
| `getPreviousSeasonKey` | function | 10107–10111 | 5 |
| `playerAppearedInSeasonByName` | function | 10112–10122 | 11 |
| `playerAppearedForUlmStatusInSeasonByName` | function | 10123–10141 | 19 |
| `isRookieCandidateForSeason` | function | 10142–10151 | 10 |
| `getLoadedSeasonPointsByName` | function | 10152–10156 | 5 |
| `seasonHasPureUlmTeam` | function | 10157–10163 | 7 |
| `isSgOnlyHallOfFameExcluded` | function | 10164–10172 | 9 |
| `isHallOfFameEligiblePlayer` | function | 10173–10178 | 6 |
| `getHallOfFamePlayerRows` | function | 10179–10181 | 3 |
| `getHallOfFamePlayerIdSet` | function | 10182–10184 | 3 |
| `getGlobalProfileEvents` | function | 10186–10197 | 12 |
| `countBy` | function | 10199–10207 | 9 |
| `getLoadedSeasonPlayerUi` | function | 10208–10212 | 5 |
| `getGlobalPlayerTeamRecord` | function | 10213–10238 | 26 |
| `getGlobalPlayerPeakGame` | function | 10239–10249 | 11 |
| `getGlobalPlayerBestSeason` | function | 10250–10256 | 7 |
| `getAllTimeDuoRowsForPlayer` | function | 10257–10267 | 11 |
| `getCarryPerformanceRows` | function | 10268–10283 | 16 |
| `rCarryPerformanceRows` | function | 10284–10296 | 13 |
| `getAllTimeGamesPlayedRows` | function | 10297–10321 | 25 |
| `getAllTimePenaltyRows` | function | 10322–10337 | 16 |
| `getSeasonUiPlayerForProfile` | function | 10338–10341 | 4 |
| `getSeasonIdentityProfile` | function | 10342–10346 | 5 |
| `seasonStatNumber` | function | 10347–10350 | 4 |
| `seasonStatSetSize` | function | 10351–10356 | 6 |
| `isActiveAlltimeSeasonStats` | function | 10357–10370 | 14 |
| `getActiveAlltimeSeasonKeys` | function | 10371–10381 | 11 |
| `getAlltimeRecencyWeight` | function | 10382–10387 | 6 |
| `getRosterStatus` | function | 10388–10394 | 7 |
| `getGlobalTopScorerMilestones` | function | 10395–10407 | 13 |
| `getGlobalRookieSeasonKey` | function | 10408–10421 | 14 |
| `getGlobalRookieMilestone` | function | 10422–10432 | 11 |
| `getGlobalPlayerMilestones` | function | 10433–10450 | 18 |
| `buildOpponentIntelligence` | function | 10452–10505 | 54 |
| `rOpponentIntelBars` | function | 10507–10517 | 11 |
| `getAllTimeDuoRows` | function | 10519–10541 | 23 |
| `rDuoRows` | function | 10543–10562 | 20 |
| `getAllLoadedSeasonGames` | function | 10564–10583 | 20 |
| `getRosterEntryRegistryProfile` | function | 10585–10588 | 4 |
| `difficultConnectionConfidence` | function | 10589–10593 | 5 |
| `getDuoRowsForPlayerScope` | function | 10594–10612 | 19 |
| `buildDirectDuoLookupForPlayer` | function | 10613–10630 | 18 |
| `duoScopeSeasonKeys` | function | 10631–10634 | 4 |
| `getDuoScorerCountsWithCandidate` | function | 10635–10654 | 20 |
| `buildBestThirdManOptions` | function | 10655–10688 | 34 |
| `getDuoDirectScorerGameCounts` | function | 10689–10720 | 32 |
| `responseMomentumAbsSeconds` | function | 10722–10727 | 6 |
| `responseMomentumTime` | function | 10728–10734 | 7 |
| `responseMomentumGameRows` | function | 10735–10741 | 7 |
| `responseMomentumSide` | function | 10742–10750 | 9 |
| `responseMomentumActor` | function | 10751–10761 | 11 |
| `responseMomentumGoalActors` | function | 10762–10769 | 8 |
| `buildAnnotatedGoalEventsForGame` | function | 10770–10870 | 101 |
| `responseMomentumConfidence` | function | 10871–10875 | 5 |
| `responseMomentumEmptyState` | function | 10876–10883 | 8 |
| `responseMomentumPairKey` | function | 10884–10886 | 3 |
| `ensureRmPlayer` | function | 10887–10892 | 6 |
| `ensureRmDuo` | function | 10893–10898 | 6 |
| `finalizeResponseStats` | function | 10899–10912 | 14 |
| `buildResponseGoalStatsRaw` | function | 10913–10961 | 49 |
| `buildResponseGoalStats` | function | 10962–10967 | 6 |
| `finalizeMomentumStats` | function | 10968–10973 | 6 |
| `buildMomentumSwingStatsRaw` | function | 10974–11044 | 71 |
| `buildMomentumSwingStats` | function | 11045–11050 | 6 |
| `buildDuoFloorCeiling` | function | 11051–11092 | 42 |
| `buildDuoWarnings` | function | 11093–11111 | 19 |
| `duoProPairKey` | function | 11112–11114 | 3 |
| `duoProContextSeasonKey` | function | 11115–11117 | 3 |
| `getDuoFieldPlayerRows` | function | 11118–11128 | 11 |
| `duoProPlayer` | function | 11129–11133 | 5 |
| `getDuoSharedFieldRows` | function | 11134–11139 | 6 |
| `buildDuoDirectProduction` | function | 11140–11160 | 21 |
| `emptyDuoTeamImpactStats` | function | 11161–11163 | 3 |
| `addDuoTeamGame` | function | 11164–11179 | 16 |
| `finalizeDuoTeamImpactStats` | function | 11180–11187 | 8 |
| `buildDuoWithWithoutImpact` | function | 11188–11221 | 34 |
| `buildDuoOpponentAdjusted` | function | 11222–11234 | 13 |
| `buildDuoNetworkContext` | function | 11235–11258 | 24 |
| `buildDuoGapAnalysis` | function | 11259–11275 | 17 |
| `buildDuoCompatibility` | function | 11287–11309 | 23 |
| `buildDuoUntestedPotential` | function | 11310–11321 | 12 |
| `buildDuoUsageRate` | function | 11322–11333 | 12 |
| `buildDuoReplacementOptions` | function | 11334–11345 | 12 |
| `buildDuoProAnalysis` | function | 11346–11389 | 44 |
| `rDuoCenterPro` | function | 11390–11509 | 120 |
| `duoProDomId` | function | 11510–11512 | 3 |
| `duoProPickerOpen` | function | 11513–11515 | 3 |
| `duoProPickerMessage` | function | 11516–11518 | 3 |
| `setDuoProPickerState` | function | 11519–11528 | 10 |
| `duoProResolveCandidate` | function | 11529–11537 | 9 |
| `duoProSelectionPayload` | function | 11538–11547 | 10 |
| `openDuoProPicker` | window | 11548–11548 | 1 |
| `cancelDuoProPicker` | window | 11549–11549 | 1 |
| `selectDuoProQuick` | window | 11550–11553 | 4 |
| `confirmDuoProSelection` | window | 11554–11568 | 15 |
| `setDuoProSelection` | window | 11569–11576 | 8 |
| `rDuoProPlayerSelect` | function | 11577–11583 | 7 |
| `rInteractiveDuoCenterPro` | function | 11584–11639 | 56 |
| `rSeasonDuoCenterPro` | function | 11640–11642 | 3 |
| `getDifficultConnectionRowsForPlayer` | function | 11643–11687 | 45 |
| `emptyRosterImpactStats` | function | 11688–11690 | 3 |
| `finalizeRosterImpactStats` | function | 11691–11698 | 8 |
| `addRosterImpactGameToStats` | function | 11699–11708 | 10 |
| `getRosterImpactPlayerEventLookup` | function | 11709–11729 | 21 |
| `buildRosterImpactGameIndex` | function | 11742–11767 | 26 |
| `getRosterImpactPlayerGames` | function | 11780–11821 | 42 |
| `rosterImpactConfidence` | function | 11822–11827 | 6 |
| `confidenceFromSampleSize` | function | 11832–11835 | 4 |
| `rosterImpactConfidenceWeight` | function | 11836–11839 | 4 |
| `antiSynergyImpactScore` | function | 11840–11854 | 15 |
| `buildRosterImpactAnalysis` | function | 11855–11923 | 69 |
| `buildDuoAntiSynergy` | function | 11924–11926 | 3 |
| `rAntiSynergyDelta` | function | 11927–11933 | 7 |
| `antiSynergyDeltaClass` | function | 11934–11937 | 4 |
| `antiSynergySigned` | function | 11938–11942 | 5 |
| `rAntiSynergyCompareChip` | function | 11943–11950 | 8 |
| `rAntiSynergyMetricRow` | function | 11951–11959 | 9 |
| `rAntiSynergyWinrateText` | function | 11967–11972 | 6 |
| `rAntiSynergyWinrateRow` | function | 11973–11981 | 9 |
| `rRosterImpactStatLine` | function | 11982–11985 | 4 |
| `antiSynergyPartnerIsSgOnly` | function | 11986–11989 | 4 |
| `rAntiSynergyMainDelta` | function | 11990–11999 | 10 |
| `rDifficultConnectionList` | function | 12000–12024 | 25 |
| `rDifficultConnectionListCompactLegacy` | function | 12025–12066 | 42 |
| `rDifficultConnectionListCompact` | function | 12067–12105 | 39 |
| `rDifficultConnectionsCard` | function | 12106–12142 | 37 |
| `responseMomentumTooltipFor` | function | 12187–12193 | 7 |
| `rmTerm` | function | 12194–12197 | 4 |
| `rResponseRateDisplay` | function | 12203–12209 | 7 |
| `rRmKpi` | function | 12210–12221 | 12 |
| `rAvgResponseTimeNote` | function | 12224–12227 | 4 |
| `rRmTopList` | function | 12228–12238 | 11 |
| `rResponseMomentumOverviewCard` | function | 12239–12262 | 24 |
| `rPlayerResponseMomentumCard` | function | 12263–12281 | 19 |
| `rDuoResponseMomentumCard` | function | 12282–12301 | 20 |
| `rTeamResponseMomentumCard` | function | 12302–12308 | 7 |
| `rMatchcenterResponseMomentum` | function | 12309–12346 | 38 |
| `getTeamAllTimeRecords` | function | 12348–12388 | 41 |
| `getAllTimeOpponentIntelligence` | function | 12390–12396 | 7 |
| `getAllTimeOpponentTopScorers` | function | 12398–12422 | 25 |
| `getHallOfFameStats` | function | 12424–12446 | 23 |
| `rOpponentTopScorerTable` | function | 12448–12467 | 20 |
| `getAllTimeIdentityStandings` | function | 12469–12503 | 35 |
| `buildRecencyWeightedGlobalIdentityProfile` | function | 12505–12552 | 48 |
| `getGlobalIdentityProfile` | function | 12554–12580 | 27 |
| `dedupeIdentityProfileTags` | function | 12582–12593 | 12 |
| `rGlobalProfileTags` | function | 12595–12599 | 5 |
| `escHtml` | function | 12601–12603 | 3 |
| `pctValue` | function | 12604–12607 | 4 |
| `rHallOfFameHero` | function | 12608–12633 | 26 |
| `rHallPodiumList` | function | 12634–12656 | 23 |
| `rHallDuoTemple` | function | 12657–12664 | 8 |
| `hallGoalieNum` | function | 12666–12671 | 6 |
| `hallGoalieTime` | function | 12672–12679 | 8 |
| `hallGoalieSeasonLabel` | function | 12680–12680 | 1 |
| `isHallRowPureSG` | function | 12681–12688 | 8 |
| `rHallSGBadge` | function | 12689–12691 | 3 |
| `hallGoaliePkStats` | function | 12692–12703 | 12 |
| `hallGoalieTopteamStats` | function | 12704–12710 | 7 |
| `hallGoalieSeasonScore` | function | 12711–12730 | 20 |
| `hallGoalieRowFromStats` | function | 12731–12763 | 33 |
| `getHallGoalieData` | function | 12764–12779 | 16 |
| `hallGoalieNameHtml` | function | 12780–12782 | 3 |
| `hallGoalieTooltip` | function | 12797–12800 | 4 |
| `hallGoalieExplainForLabel` | function | 12801–12815 | 15 |
| `rHallGoalieRankCard` | function | 12816–12847 | 32 |
| `rHallGoalieAwardCards` | function | 12848–12864 | 17 |
| `rHallGoalieLegends` | function | 12865–12897 | 33 |
| `getGlobalSeasonStatRows` | function | 12898–12913 | 16 |
| `getAlltimeRank` | function | 12914–12919 | 6 |
| `rAlltimeKpis` | function | 12920–12933 | 14 |
| `rSparkline` | function | 12934–12946 | 13 |
| `comparisonItemKey` | function | 12958–12963 | 6 |
| `normalizeComparisonItem` | function | 12964–12968 | 5 |
| `comparisonJsArg` | function | 12969–12971 | 3 |
| `comparisonNum` | function | 12972–12975 | 4 |
| `comparisonPct` | function | 12976–12979 | 4 |
| `comparisonFmt` | function | 12980–12983 | 4 |
| `comparisonPctFmt` | function | 12984–12986 | 3 |
| `getComparisonPlayerRow` | function | 12987–12989 | 3 |
| `getComparisonSeasonLabel` | function | 12990–12992 | 3 |
| `getComparisonTeamGoalsForSeason` | function | 12993–13004 | 12 |
| `getComparisonAlltimeTeamGoals` | function | 13005–13007 | 3 |
| `getComparisonSeasonEvents` | function | 13008–13012 | 5 |
| `getComparisonChemistryFromEvents` | function | 13013–13017 | 5 |
| `getComparisonClutchFromEvents` | function | 13018–13022 | 5 |
| `getComparisonStyleProfile` | function | 13023–13047 | 25 |
| `getComparisonProfile` | function | 13048–13052 | 5 |
| `getComparisonSeasonTrend` | function | 13053–13078 | 26 |
| `getComparisonAlltimeTrend` | function | 13079–13084 | 6 |
| `getComparisonPlayerOptions` | function | 13086–13100 | 15 |
| `comparisonVariantValue` | function | 13101–13103 | 3 |
| `getComparisonVariantsForPlayer` | function | 13104–13128 | 25 |
| `parseComparisonVariant` | function | 13129–13143 | 15 |
| `getComparisonCurrentSelection` | function | 13144–13154 | 11 |
| `filterComparisonPlayers` | window | 13155–13162 | 8 |
| `selectComparisonPlayer` | window | 13163–13168 | 6 |
| `setComparisonRoleMode` | window | 13169–13173 | 5 |
| `setComparisonVariant` | window | 13174–13177 | 4 |
| `toggleComparisonSgOnly` | window | 13178–13178 | 1 |
| `addComparisonItem` | window | 13179–13186 | 8 |
| `addSelectedComparisonItem` | window | 13187–13192 | 6 |
| `toggleComparisonPicker` | window | 13193–13193 | 1 |
| `removeComparisonItem` | window | 13194–13197 | 4 |
| `clearComparison` | window | 13198–13198 | 1 |
| `runComparison` | window | 13199–13205 | 7 |
| `selectComparisonMode` | window | 13206–13206 | 1 |
| `backToComparisonModeSelect` | window | 13207–13207 | 1 |
| `normalizeDuoComparisonItem` | function | 13208–13211 | 4 |
| `comparisonDuoContext` | function | 13212–13215 | 4 |
| `setComparisonDuoMode` | window | 13216–13216 | 1 |
| `setComparisonDuoSeasonKey` | window | 13217–13217 | 1 |
| `setComparisonDuoSearch` | window | 13218–13218 | 1 |
| `filterPlayerSuggestions` | function | 13219–13230 | 12 |
| `rComparisonDuoSuggestionButtons` | function | 13231–13234 | 4 |
| `renderComparisonDuoSuggestions` | function | 13235–13243 | 9 |
| `filterComparisonDuoSuggestions` | window | 13244–13251 | 8 |
| `selectComparisonDuoSuggestion` | window | 13245–13251 | 7 |
| `handleComparisonDuoSearchKey` | window | 13252–13264 | 13 |
| `setComparisonDuoPlayer` | window | 13265–13270 | 6 |
| `addComparisonDuoFromSelection` | window | 13271–13278 | 8 |
| `addComparisonDuo` | window | 13279–13281 | 3 |
| `removeComparisonDuo` | window | 13282–13285 | 4 |
| `clearComparisonDuos` | window | 13286–13286 | 1 |
| `runDuoComparison` | window | 13287–13291 | 5 |
| `buildDuoComparison` | function | 13292–13311 | 20 |
| `rDuoComparisonBars` | function | 13312–13316 | 5 |
| `rDuoCompareSummaryCards` | function | 13317–13347 | 31 |
| `rDuoComparisonProfile` | function | 13348–13369 | 22 |
| `rDuoComparisonChemistry` | function | 13370–13385 | 16 |
| `rDuoComparisonImpact` | function | 13386–13401 | 16 |
| `rDuoComparisonContext` | function | 13402–13419 | 18 |
| `rDuoComparisonDetails` | function | 13420–13423 | 4 |
| `rDuoComparisonDashboard` | function | 13424–13437 | 14 |
| `rComparisonDuoSearchBox` | function | 13438–13447 | 10 |
| `rDuoComparisonPage` | function | 13448–13458 | 11 |
| `rComparisonModeSelect` | function | 13459–13461 | 3 |
| `getComparisonEventsForItem` | function | 13462–13464 | 3 |
| `getComparisonRosterGamesForSeason` | function | 13465–13481 | 17 |
| `getComparisonRosterGames` | function | 13482–13489 | 8 |
| `comparisonEventGameKey` | function | 13490–13492 | 3 |
| `comparisonEventPhaseLabel` | function | 13493–13496 | 4 |
| `comparisonOpponentStrengthTier` | function | 13497–13502 | 6 |
| `buildComparisonExtraMetrics` | function | 13503–13560 | 58 |
| `getGoalieComparisonAlltimeTrend` | function | 13561–13577 | 17 |
| `getGoalieComparisonSeasonTrend` | function | 13578–13596 | 19 |
| `buildGoalieComparisonDataset` | function | 13597–13647 | 51 |
| `buildComparisonDataset` | function | 13648–13683 | 36 |
| `kpiValueText` | function | 13685–13688 | 4 |
| `kpiDelta` | function | 13689–13694 | 6 |
| `kpiItemColor` | function | 13695–13697 | 3 |
| `rKpiCards` | function | 13698–13708 | 11 |
| `rKpiMirrorRows` | function | 13723–13782 | 60 |
| `kpiRadarValue` | function | 13783–13793 | 11 |
| `rKpiRadar` | function | 13794–13828 | 35 |
| `rKpiShareBars` | function | 13829–13836 | 8 |
| `rKpiMetricCard` | function | 13837–13841 | 5 |
| `rKpiTextMetricCard` | function | 13842–13844 | 3 |
| `rKpiExtendedMetrics` | function | 13845–13859 | 15 |
| `kpiNiceMax` | function | 13860–13865 | 6 |
| `kpiTrendRows` | function | 13866–13874 | 9 |
| `rKpiTrendCompare` | function | 13875–13941 | 67 |
| `rKpiOpponentStrength` | function | 13942–13969 | 28 |
| `kpiBadge` | function | 13970–13972 | 3 |
| `rKpiObjectMini` | function | 13973–13979 | 7 |
| `rKpiInfoCards` | function | 13980–14011 | 32 |
| `buildComparisonSummary` | function | 14012–14043 | 32 |
| `rKPIVergleich` | function | 14044–14057 | 14 |
| `rComparisonMiniOverview` | function | 14058–14061 | 4 |
| `rComparisonRoles` | function | 14062–14069 | 8 |
| `rComparisonDashboard` | function | 14070–14080 | 11 |
| `rComparisonStyles` | function | 14081–14118 | 38 |
| `rComparisonCenterPage` | function | 14119–14169 | 51 |
| `rSeasonTrendRows` | function | 14170–14188 | 19 |
| `getAlltimeAggregatedStyleProfile` | function | 14189–14208 | 20 |
| `rGlobalDnaBars` | function | 14210–14239 | 30 |
| `pdashNum` | function | 14240–14243 | 4 |
| `pdashPct` | function | 14244–14247 | 4 |
| `pdashPhaseLabel` | function | 14248–14251 | 4 |
| `pdashTopCount` | function | 14252–14255 | 4 |
| `pdashBestPhase` | function | 14256–14259 | 4 |
| `pdashTopPartner` | function | 14260–14263 | 4 |
| `pdashTopOpponent` | function | 14264–14267 | 4 |
| `pdashOpponentTier` | function | 14268–14273 | 6 |
| `pdashOpponentStrength` | function | 14274–14293 | 20 |
| `pdashInsight` | function | 14294–14296 | 3 |
| `pdashInsights` | function | 14297–14308 | 12 |
| `buildSeasonPlayerDashModel` | function | 14309–14345 | 37 |
| `buildAlltimePlayerDashModel` | function | 14346–14388 | 43 |
| `rPlayerDashStyles` | function | 14389–14400 | 12 |
| `rPdashLabel` | function | 14401–14403 | 3 |
| `rPdashStat` | function | 14404–14406 | 3 |
| `rPlayerDash` | function | 14407–14445 | 39 |
| `rSeasonPlayerDashboard` | function | 14446–14448 | 3 |
| `rAlltimePlayerDashboard` | function | 14449–14451 | 3 |
| `rGlobalPartnerOpponentPanel` | function | 14452–14465 | 14 |
| `rGlobalCareerHeader` | function | 14466–14486 | 21 |
| `rSeasonLandingPage` | function | 14488–14502 | 15 |
| `rGlobalOverview` | function | 14504–14555 | 52 |
| `rGlobalAllTimeStats` | function | 14557–14573 | 17 |
| `rGlobalDevelopment` | function | 14575–14613 | 39 |
| `getGlobalPlayerOpponentGameRows` | function | 14616–14643 | 28 |
| `getGlobalOpponentSpecialistProfile` | function | 14645–14673 | 29 |
| `rGlobalDuoNetwork` | function | 14675–14872 | 198 |
| `rGlobalOpponentSpecialist` | function | 14874–14919 | 46 |
| `playerExplainConfidence` | function | 14921–14926 | 6 |
| `playerExplainConfidenceLabel` | function | 14927–14929 | 3 |
| `playerExplainAdd` | function | 14930–14934 | 5 |
| `playerExplainStyleSignature` | function | 14935–14946 | 12 |
| `playerExplainRolePhrase` | function | 14947–14955 | 9 |
| `playerExplainHeadline` | function | 14956–14965 | 10 |
| `playerExplainContextSentence` | function | 14966–14984 | 19 |
| `buildFieldPlayerExplanation` | function | 14985–15059 | 75 |
| `buildGoaliePlayerExplanation` | function | 15060–15113 | 54 |
| `buildPlayerExplanation` | function | 15114–15122 | 9 |
| `buildPlayerIntelligence` | function | 15123–15152 | 30 |
| `rPlayerExplainItems` | function | 15153–15157 | 5 |
| `rPlayerExplanation` | function | 15158–15209 | 52 |
| `rAllTimePlayersPage` | function | 15211–15251 | 41 |
| `rHallOfFamePage` | function | 15253–15341 | 89 |
| `lexiconUniqueKeys` | function | 15346–15353 | 8 |
| `lexiconEntry` | function | 15354–15363 | 10 |
| `rLexiconRows` | function | 15364–15367 | 4 |
| `rLexiconPage` | function | 15368–15540 | 173 |
| `clampScore` | function | 15544–15547 | 4 |
| `getScoreLabel` | function | 15548–15556 | 9 |
| `buildConfidence` | function | 15557–15602 | 46 |
| `confidenceCautiousText` | function | 15603–15606 | 4 |
| `explainScore` | function | 15607–15621 | 15 |
| `p1NarrativeKey` | function | 15622–15624 | 3 |
| `scoreNarrative` | function | 15625–15643 | 19 |
| `rankNarratives` | function | 15644–15657 | 14 |
| `getEmptyState` | function | 15658–15669 | 12 |
| `rEmptyState` | function | 15670–15673 | 4 |
| `capSuperlativeLabel` | function | 15681–15683 | 3 |
| `rScoreBreakdown` | function | 15684–15700 | 17 |
| `matchcenterSigned` | function | 15702–15706 | 5 |
| `matchcenterDateLabel` | function | 15708–15712 | 5 |
| `dedupeGamesById` | function | 15724–15732 | 9 |
| `matchcenterIsFreiburgTuebingenTeamName` | function | 15733–15739 | 7 |
| `matchcenterSeasonHasGames` | function | 15743–15745 | 3 |
| `matchcenterDefaultSeasonKey` | function | 15746–15751 | 6 |
| `matchcenterOpponentMode` | function | 15763–15765 | 3 |
| `getMatchcenterOpponents` | function | 15766–15798 | 33 |
| `getMatchcenterDirectOpponents` | function | 15799–15829 | 31 |
| `matchcenterAnalyzeDirect` | function | 15832–15868 | 37 |
| `matchcenterAnalyzeForm` | function | 15869–15894 | 26 |
| `matchcenterGoalMinute` | function | 15903–15908 | 6 |
| `matchcenterEmptyBuckets` | function | 15917–15919 | 3 |
| `matchcenterUlmScoutingConfidence` | function | 15920–15924 | 5 |
| `matchcenterEnsureUlmPlayer` | function | 15925–15962 | 38 |
| `matchcenterRegisterUlmProfileGame` | function | 15963–15968 | 6 |
| `matchcenterUpdateUlmSeasonRow` | function | 15969–15975 | 7 |
| `matchcenterClassifyUlmGoalEvent` | function | 15976–15986 | 11 |
| `matchcenterAddUlmScoring` | function | 15987–16024 | 38 |
| `matchcenterFinalizeUlmPlayers` | function | 16025–16093 | 69 |
| `matchcenterBuildUlmPlayerScouting` | function | 16094–16148 | 55 |
| `matchcenterBuildUlmPlayerInsights` | function | 16149–16161 | 13 |
| `matchcenterDuoPairKey` | function | 16162–16165 | 4 |
| `matchcenterEnsureOpponentDuo` | function | 16166–16198 | 33 |
| `matchcenterDuoDirectionLabel` | function | 16199–16205 | 7 |
| `matchcenterAddDuoConnection` | function | 16206–16224 | 19 |
| `matchcenterFinalizeOpponentDuos` | function | 16225–16259 | 35 |
| `matchcenterBuildOpponentDuos` | function | 16260–16304 | 45 |
| `matchcenterBuildOpponentDuoInsights` | function | 16305–16318 | 14 |
| `matchcenterEnsureUlmDuo` | function | 16319–16356 | 38 |
| `matchcenterAddUlmDuoConnection` | function | 16357–16375 | 19 |
| `matchcenterFinalizeUlmDuos` | function | 16376–16411 | 36 |
| `matchcenterBuildUlmDuos` | function | 16412–16454 | 43 |
| `matchcenterBuildUlmDuoInsights` | function | 16455–16467 | 13 |
| `matchcenterDirectContextGames` | function | 16468–16470 | 3 |
| `matchcenterSpecialTeamsForGame` | function | 16471–16474 | 4 |
| `matchcenterPersonalPenaltyMinutesForSide` | function | 16475–16483 | 9 |
| `matchcenterPct` | function | 16484–16487 | 4 |
| `matchcenterBuildSpecialTeamsMatchup` | function | 16488–16535 | 48 |
| `matchcenterGoalieKey` | function | 16536–16540 | 5 |
| `matchcenterGoalieFitScore` | function | 16541–16557 | 17 |
| `matchcenterBuildGoalieMatchup` | function | 16558–16603 | 46 |
| `matchcenterGoalAbsSeconds` | function | 16604–16611 | 8 |
| `matchcenterTimeValue` | function | 16612–16619 | 8 |
| `matchcenterEmptyTimingStats` | function | 16620–16628 | 9 |
| `matchcenterWindowForSecond` | function | 16629–16635 | 7 |
| `matchcenterTimingStatsForGames` | function | 16636–16672 | 37 |
| `matchcenterBuildTimingInsights` | function | 16673–16683 | 11 |
| `matchcenterBuildTimingAnalysis` | function | 16684–16694 | 11 |
| `rMatchcenterTimeBars` | function | 16695–16708 | 14 |
| `rMatchcenterTimingStatsCard` | function | 16709–16728 | 20 |
| `rMatchcenterTiming` | function | 16729–16752 | 24 |
| `rMatchcenterTabs` | function | 16768–16770 | 3 |
| `rMatchcenterProfileSection` | function | 16771–16790 | 20 |
| `rMatchcenterFormSection` | function | 16791–16816 | 26 |
| `rMatchcenterDetailsSection` | function | 16817–16824 | 8 |
| `matchcenterResultClass` | function | 16825–16827 | 3 |
| `matchcenterUlmTeamLabelForGame` | function | 16829–16833 | 5 |
| `matchcenterGameLine` | function | 16834–16839 | 6 |
| `matchcenterFormLine` | function | 16840–16844 | 5 |
| `matchcenterBuildInsights` | function | 16845–16865 | 21 |
| `rMatchcenterKpi` | function | 16866–16872 | 7 |
| `rMatchcenterFormCard` | function | 16873–16893 | 21 |
| `rMatchcenterGamesList` | function | 16894–16905 | 12 |
| `rMatchcenterWatchCard` | function | 16906–16926 | 21 |
| `rMatchcenterPlayerRow` | function | 16927–16950 | 24 |
| `rMatchcenterRankCard` | function | 16951–16956 | 6 |
| `rMatchcenterUlmImpactCard` | function | 16957–16985 | 29 |
| `rMatchcenterUlmPlayerRow` | function | 16986–17009 | 24 |
| `rMatchcenterUlmRankCard` | function | 17010–17015 | 6 |
| `rMatchcenterUlmScouting` | function | 17016–17052 | 37 |
| `rMatchcenterOpponentScouting` | function | 17053–17088 | 36 |
| `rMatchcenterPlayersTab` | function | 17089–17091 | 3 |
| `rMatchcenterDuoWatchCard` | function | 17092–17111 | 20 |
| `rMatchcenterDuoRow` | function | 17112–17135 | 24 |
| `rMatchcenterDuoRankCard` | function | 17136–17141 | 6 |
| `rMatchcenterUlmDuoWatchCard` | function | 17142–17167 | 26 |
| `rMatchcenterUlmDuoRow` | function | 17168–17190 | 23 |
| `rMatchcenterUlmDuoRankCard` | function | 17191–17196 | 6 |
| `rMatchcenterUlmDuos` | function | 17197–17239 | 43 |
| `rMatchcenterOpponentDuos` | function | 17240–17282 | 43 |
| `rMatchcenterDuosTab` | function | 17283–17285 | 3 |
| `rMatchcenterSpecialCard` | function | 17286–17294 | 9 |
| `rMatchcenterSpecialTeams` | function | 17295–17344 | 50 |
| `rMatchcenterGoalieCard` | function | 17345–17368 | 24 |
| `rMatchcenterGoalieMatchup` | function | 17369–17397 | 29 |
| `matchcenterPlanScoreText` | function | 17398–17401 | 4 |
| `matchcenterPlanRateText` | function | 17402–17406 | 5 |
| `matchcenterPriorityLabel` | function | 17407–17409 | 3 |
| `matchcenterConfidenceClass` | function | 17410–17415 | 6 |
| `matchcenterInferPriority` | function | 17416–17422 | 7 |
| `matchcenterAddPlanItem` | function | 17423–17428 | 6 |
| `matchcenterAddPlanWatch` | function | 17429–17434 | 6 |
| `matchcenterBuildPlanConfidence` | function | 17435–17482 | 48 |
| `matchcenterIntelCurve` | function | 17483–17488 | 6 |
| `matchcenterIntelInverseCurve` | function | 17489–17492 | 4 |
| `matchcenterIntelWeighted` | function | 17493–17503 | 11 |
| `matchcenterIntelRate` | function | 17504–17507 | 4 |
| `matchcenterIntelPct` | function | 17508–17511 | 4 |
| `matchcenterIntelPriorityFromScore` | function | 17512–17517 | 6 |
| `matchcenterIntelPriorityClass` | function | 17518–17523 | 6 |
| `matchcenterIntelPriorityLabel` | function | 17524–17527 | 4 |
| `matchcenterIntelDataLabel` | function | 17528–17530 | 3 |
| `matchcenterBuildIntelligenceDataQuality` | function | 17531–17600 | 70 |
| `matchcenterBuildOpponentDNA` | function | 17601–17713 | 113 |
| `matchcenterDeriveOpponentType` | function | 17714–17731 | 18 |
| `matchcenterIntelPlayerRef` | function | 17732–17744 | 13 |
| `matchcenterIntelDuoRef` | function | 17745–17758 | 14 |
| `matchcenterIntelAddAlarm` | function | 17759–17779 | 21 |
| `matchcenterBuildOpponentAlarm` | function | 17780–17889 | 110 |
| `matchcenterBuildIntelListFromPlan` | function | 17890–17898 | 9 |
| `matchcenterBuildCoachHints` | function | 17899–17914 | 16 |
| `matchcenterBuildIntelHeadline` | function | 17915–17922 | 8 |
| `matchcenterBuildOneThingToWatch` | function | 17923–17935 | 13 |
| `matchcenterBuildIntelligenceSignals` | function | 17936–17982 | 47 |
| `buildMatchIntelligenceFromContext` | function | 17983–18037 | 55 |
| `buildMatchIntelligence` | function | 18038–18059 | 22 |
| `matchcenterCoachCautious` | function | 18060–18062 | 3 |
| `matchcenterCoachAdd` | function | 18063–18071 | 9 |
| `matchcenterCoachGameModel` | function | 18072–18085 | 14 |
| `buildMatchStories` | function | 18086–18115 | 30 |
| `matchcenterCoachPriorityFromAlarm` | function | 18116–18125 | 10 |
| `matchcenterBuildCoachPriorities` | function | 18126–18132 | 7 |
| `matchcenterBuildCoachLevers` | function | 18133–18142 | 10 |
| `matchcenterBuildCoachDangerPatterns` | function | 18143–18150 | 8 |
| `matchcenterBuildCoachIfThen` | function | 18151–18160 | 10 |
| `matchcenterBuildCoachAvoidList` | function | 18161–18170 | 10 |
| `matchcenterBuildCoachActivationHints` | function | 18171–18177 | 7 |
| `matchcenterBuildCoachKeyActors` | function | 18178–18185 | 8 |
| `buildDigitalCoachReport` | function | 18186–18218 | 33 |
| `buildLockerRoomSheet` | function | 18219–18239 | 21 |
| `matchcenterSocialAdd` | function | 18240–18246 | 7 |
| `matchcenterSocialCaption` | function | 18247–18252 | 6 |
| `socialSentence` | function | 18253–18255 | 3 |
| `socialEnsurePeriod` | function | 18256–18259 | 4 |
| `socialFirstUseful` | function | 18260–18262 | 3 |
| `socialPlayerFocusLine` | function | 18263–18269 | 7 |
| `socialDuoFocusLine` | function | 18270–18275 | 6 |
| `socialOpponentLine` | function | 18276–18279 | 4 |
| `socialKeyFactLine` | function | 18280–18289 | 10 |
| `buildMatchdayCaptionBlocks` | function | 18290–18319 | 30 |
| `buildSocialMediaContent` | function | 18320–18368 | 49 |
| `isSyntheticLineupPlayerId` | function | 18374–18376 | 3 |
| `getSyntheticLineupPlayers` | function | 18377–18379 | 3 |
| `getSyntheticLineupRow` | function | 18380–18396 | 17 |
| `getSyntheticLineupRows` | function | 18397–18399 | 3 |
| `getLineupAllRows` | function | 18400–18402 | 3 |
| `lineupRowMeta` | function | 18403–18410 | 8 |
| `getLineupPlayerPool` | function | 18411–18419 | 9 |
| `lineupScore` | function | 18420–18425 | 6 |
| `lineupAverage` | function | 18426–18429 | 4 |
| `lineupLevelLabel` | function | 18430–18433 | 4 |
| `lineupRosterGamesForPlayer` | function | 18436–18483 | 48 |
| `buildLineupExperienceProfile` | function | 18484–18526 | 43 |
| `lineupOpponentDNAForContext` | function | 18527–18538 | 12 |
| `buildLineupOpponentDNAFit` | function | 18539–18582 | 44 |
| `classifyLineIdentity` | function | 18583–18630 | 48 |
| `lineupPlayerProfile` | function | 18631–18706 | 76 |
| `buildLineupAnalysis` | function | 18707–18840 | 134 |
| `buildLineupScoreBreakdowns` | function | 18841–18870 | 30 |
| `buildLineupIntelligence` | function | 18871–18881 | 11 |
| `buildLineAnalysis` | function | 18882–18884 | 3 |
| `lineupRowMap` | function | 18885–18887 | 3 |
| `lineupRankCandidateIds` | function | 18888–18902 | 15 |
| `lineupCombinationIds` | function | 18903–18916 | 14 |
| `lineupStdDev` | function | 18917–18922 | 6 |
| `lineupRoleDnaComplementScore` | function | 18923–18946 | 24 |
| `lineupDirectChemistryScore` | function | 18947–18953 | 7 |
| `lineupEvaluateComplementCandidate` | function | 18954–19032 | 79 |
| `lineupPlayerAnchorScore` | function | 19033–19050 | 18 |
| `lineupPlayerAnchorConfidence` | function | 19053–19057 | 5 |
| `buildTeamLineBalance` | function | 19058–19101 | 44 |
| `buildBalancedLineupSet` | function | 19102–19128 | 27 |
| `lineupRecommendationReason` | function | 19129–19137 | 9 |
| `buildLineupRecommendations` | function | 19138–19219 | 82 |
| `recommendLineComplements` | function | 19220–19247 | 28 |
| `matchcenterBuildMatchPlan` | function | 19248–19393 | 146 |
| `rMatchcenterPlanItems` | function | 19394–19411 | 18 |
| `rMatchcenterPlanWatch` | function | 19412–19427 | 16 |
| `rMatchcenterOpponentDNA` | function | 19428–19460 | 33 |
| `rMatchcenterOpponentAlarm` | function | 19461–19482 | 22 |
| `rMatchcenterIntelOverview` | function | 19483–19528 | 46 |
| `rMatchcenterIntelCoachHints` | function | 19529–19542 | 14 |
| `rMatchcenterCoachCardList` | function | 19543–19556 | 14 |
| `rMatchcenterCoachIfThen` | function | 19557–19564 | 8 |
| `rMatchcenterCoachSimpleList` | function | 19565–19569 | 5 |
| `rMatchcenterDigitalCoach` | function | 19570–19634 | 65 |
| `rMatchcenterCopyButton` | function | 19635–19639 | 5 |
| `rMatchcenterLockerList` | function | 19640–19651 | 12 |
| `rMatchcenterLockerRoomSheet` | function | 19652–19707 | 56 |
| `rMatchcenterSocialBlock` | function | 19708–19715 | 8 |
| `matchcenterStoryDownloadFileName` | function | 19716–19725 | 10 |
| `downloadMatchdayStory` | window | 19726–19773 | 48 |
| `rSocialVideoBlock` | function | 19777–19808 | 32 |
| `socialVideoJobsForMatchday` | function | 19811–19817 | 7 |
| `generateSocialVideoVideos` | window | 19818–19859 | 42 |
| `cancelSocialVideoRecording` | window | 19860–19862 | 3 |
| `generateSocialVideoStandbilder` | window | 19863–19886 | 24 |
| `generateSocialVideoContactSheets` | window | 19887–19909 | 23 |
| `rMatchcenterSocialMediaCenter` | function | 19910–19963 | 54 |
| `rLineupScoreRows` | function | 19964–19985 | 22 |
| `rLineupSimpleCards` | function | 19986–19994 | 9 |
| `rMatchcenterLineupBuilder` | function | 19995–20067 | 73 |
| `rLineupMetricPills` | function | 20068–20081 | 14 |
| `rLineupBuilderAvailablePanel` | function | 20082–20129 | 48 |
| `rLineupRecommendationCards` | function | 20130–20144 | 15 |
| `rLineupRecommendationMode` | function | 20145–20178 | 34 |
| `rLineupComplementCards` | function | 20179–20191 | 13 |
| `rLineupTestLine` | function | 20192–20240 | 49 |
| `rLineupTestMode` | function | 20241–20257 | 17 |
| `rLineupBuilderPage` | function | 20258–20292 | 35 |
| `rMatchcenterScoutingSummary` | function | 20293–20336 | 44 |
| `rMatchcenterMatchPlan` | function | 20337–20357 | 21 |
| `matchcenterStoryLogoBase` | function | 20360–20365 | 6 |
| `matchcenterStorySafeLogoUrl` | function | 20366–20372 | 7 |
| `getTeamLogoUrlForStory` | function | 20381–20410 | 30 |
| `matchcenterStoryLogoForOpponent` | function | 20411–20425 | 15 |
| `matchcenterStoryTableRank` | function | 20426–20436 | 11 |
| `matchcenterStoryUlmTableRank` | function | 20437–20443 | 7 |
| `matchcenterStoryRankText` | function | 20444–20447 | 4 |
| `matchcenterStoryInlineStat` | function | 20448–20450 | 3 |
| `matchcenterStoryRankRows` | function | 20452–20463 | 12 |
| `matchcenterStoryAddFact` | function | 20466–20472 | 7 |
| `matchcenterStoryFactKey` | function | 20473–20475 | 3 |
| `matchcenterStoryLooksArtificial` | function | 20476–20478 | 3 |
| `matchcenterStoryEstimateFactWeight` | function | 20479–20484 | 6 |
| `matchcenterStoryAddCandidate` | function | 20485–20507 | 23 |
| `matchcenterStoryCategoryLimit` | function | 20508–20511 | 4 |
| `matchcenterStoryNormalizePickOptions` | function | 20512–20522 | 11 |
| `matchcenterStoryCandidateForBudget` | function | 20523–20532 | 10 |
| `matchcenterStoryPickFactItems` | function | 20533–20585 | 53 |
| `matchcenterStoryPickFacts` | function | 20586–20588 | 3 |
| `matchcenterStoryCurrentStreak` | function | 20590–20598 | 9 |
| `matchcenterStoryWinlessStreak` | function | 20599–20607 | 9 |
| `matchcenterStoryFormFact` | function | 20608–20618 | 11 |
| `matchcenterStoryFormFactCandidates` | function | 20619–20638 | 20 |
| `matchcenterStoryLateGoalsForOutcome` | function | 20639–20642 | 4 |
| `matchcenterStoryClutchFact` | function | 20643–20657 | 15 |
| `matchcenterStoryPlayerClutchTotal` | function | 20658–20665 | 8 |
| `matchcenterStoryBestClutchPlayer` | function | 20666–20675 | 10 |
| `matchcenterStoryPlayerClutchFact` | function | 20676–20701 | 26 |
| `matchcenterStoryDuoClutchTotal` | function | 20702–20709 | 8 |
| `matchcenterStoryBestClutchDuo` | function | 20710–20719 | 10 |
| `matchcenterStoryDuoClutchFact` | function | 20720–20722 | 3 |
| `matchcenterStoryDuoFact` | function | 20723–20743 | 21 |
| `matchcenterStoryClutchPriority` | function | 20744–20746 | 3 |
| `matchcenterStoryCompetitionLabel` | function | 20747–20750 | 4 |
| `matchcenterStoryShortDuel` | function | 20751–20755 | 5 |
| `matchcenterStoryLastDuelLabel` | function | 20756–20759 | 4 |
| `matchcenterStoryDirectFactCandidates` | function | 20760–20781 | 22 |
| `matchcenterStoryPlanFactCandidates` | function | 20782–20794 | 13 |
| `matchcenterStoryCategoryForPlanFact` | function | 20795–20803 | 9 |
| `buildMatchcenterStoryPreviewData` | function | 20804–20915 | 112 |
| `matchcenterStoryNameClass` | function | 20916–20921 | 6 |
| `matchcenterStoryVisibleFacts` | function | 20922–20952 | 31 |
| `rMatchcenterStoryLogo` | function | 20953–20957 | 5 |
| `rMatchcenterStoryForm` | function | 20958–20962 | 5 |
| `rMatchcenterStoryPlayerCard` | function | 20963–20970 | 8 |
| `rMatchcenterStoryPreview` | function | 20971–21040 | 70 |
| `rMatchcenterStoryFrame` | function | 21041–21046 | 6 |
| `fitMatchcenterStoryLayout` | function | 21047–21089 | 43 |
| `ensureSocialVideoExportCapabilityChecked` | function | 21098–21102 | 5 |
| `downloadSocialVideoStandbild` | window | 21117–21136 | 20 |
| `downloadSocialVideoContactSheet` | window | 21141–21166 | 26 |
| `rMatchcenterPage` | function | 21168–21316 | 149 |
| `rTeamPage` | function | 21317–21655 | 339 |
| `exportExcel` | function | 21660–21685 | 26 |
| `render` | function | 21691–21708 | 18 |
| `_render` | function | 21709–21878 | 170 |
| `uiFormatNumber` | function | 21912–21916 | 5 |
| `uiReliabilityDots` | function | 21925–21932 | 8 |
| `uiDeltaIndicator` | function | 21940–21946 | 7 |
| `uiInfoIcon` | function | 21958–21962 | 5 |
| `uiKennzahlKachel` | function | 21970–21981 | 12 |
| `uiKernaussage` | function | 21990–21996 | 7 |
| `uiHinweisKarte` | function | 22004–22016 | 13 |
| `uiRangliste` | function | 22026–22043 | 18 |
| `uiVerlauf` | function | 22054–22073 | 20 |
| `uiIntervallBalken` | function | 22080–22092 | 13 |
| `uiMethodenbox` | function | 22099–22108 | 10 |
| `uiNotiz` | function | 22116–22120 | 5 |
| `datenstandQuoteState` | function | 22142–22149 | 8 |
| `uiQuoteText` | function | 22152–22158 | 7 |
| `uiDatenstandBand` | function | 22175–22188 | 14 |
| `uiPlatzhalter` | function | 22196–22201 | 6 |
| `uiObjektseiteSortTabs` | function | 22246–22254 | 9 |
| `uiObjektseite` | function | 22264–22297 | 34 |
| `mainNavActiveKeyForPage` | function | 22354–22359 | 6 |
| `goToMainNavPoint` | window | 22360–22366 | 7 |
| `rMainNav` | function | 22367–22371 | 5 |
| `rMainNavBottom` | function | 22389–22396 | 8 |
| `openOverview` | window | 22406–22414 | 9 |
| `switchOverviewSeason` | window | 22423–22429 | 7 |
| `openMatchdayTimeline` | window | 22457–22464 | 8 |
| `openMatchday` | window | 22465–22474 | 10 |
| `switchMatchdaySeason` | window | 22476–22481 | 6 |
| `matchdayUlmGames` | function | 22483–22485 | 3 |
| `matchdayLineupInfo` | function | 22492–22502 | 11 |
| `matchdayLineupCardHtml` | function | 22504–22510 | 7 |
| `matchdayGameCardHtml` | function | 22511–22530 | 20 |
| `matchdayFixtureCardHtml` | function | 22536–22544 | 9 |
| `rMatchdayTimelineRow` | function | 22546–22553 | 8 |
| `rMatchdayTimelinePage` | function | 22554–22564 | 11 |
| `rMatchdayDetailPage` | function | 22565–22604 | 40 |
| `rMatchdayPage` | function | 22605–22611 | 7 |
| `overviewMatchdayStartMs` | function | 22630–22635 | 6 |
| `overviewMatchdayEndMs` | function | 22636–22641 | 6 |
| `detectOverviewPhase` | function | 22642–22667 | 26 |
| `getSeasonDataState` | function | 22674–22684 | 11 |
| `parseSeasonDataState` | function | 22685–22693 | 9 |
| `isNewSeasonDataState` | function | 22695–22697 | 3 |
| `recordOverviewVisit` | function | 22704–22713 | 10 |
| `overviewOpponentLabel` | function | 22719–22730 | 12 |
| `overviewLastMatchdayText` | function | 22731–22734 | 4 |
| `overviewNextMatchdayHtml` | function | 22741–22757 | 17 |
| `overviewCompactTableHtml` | function | 22765–22781 | 17 |
| `overviewFormHtml` | function | 22783–22797 | 15 |
| `overviewSeasonBilanzHtml` | function | 22798–22804 | 7 |
| `overviewSeasonAwardHtml` | function | 22806–22815 | 10 |
| `overviewRecordHtml` | function | 22817–22822 | 6 |
| `overviewCrossSeasonTrendHtml` | function | 22824–22832 | 9 |
| `overviewOpponentPreviewHtml` | function | 22833–22837 | 5 |
| `overviewMatchcenterLinkHtml` | function | 22838–22840 | 3 |
| `overviewLineupLinkHtml` | function | 22841–22843 | 3 |
| `overviewRankChangeTile` | function | 22860–22877 | 18 |
| `buildOverviewCards` | function | 22886–22926 | 41 |
| `rOverviewPage` | function | 22936–22947 | 12 |
| `openLigaGegner` | window | 22948–22951 | 4 |
| `rLigaGegnerPlaceholderPage` | function | 22952–22957 | 6 |
| `rAsOfSelector` | function | 22969–22981 | 13 |
| `setContextAsOf` | window | 22982–22993 | 12 |
| `rSeasonDataPreviewContextHint` | function | 23004–23012 | 9 |
| `rSeasonDataStateContextHint` | function | 23021–23027 | 7 |
| `rContextBar` | function | 23052–23070 | 19 |
| `rIaShell` | function | 23072–23074 | 3 |
| `globalSearchTokens` | function | 23091–23094 | 4 |
| `globalSearchEntries` | function | 23096–23109 | 14 |
| `globalSearchPlayerScore` | function | 23110–23117 | 8 |
| `globalSearchMatchdayScore` | function | 23119–23131 | 13 |
| `globalSearchMatch` | function | 23133–23144 | 12 |
| `globalSearchIsEditableTarget` | function | 23145–23149 | 5 |
| `globalSearchKeyAction` | function | 23151–23165 | 15 |
| `rGlobalSearchToggle` | function | 23166–23168 | 3 |
| `rGlobalSearchResultsHtml` | function | 23169–23179 | 11 |
| `rGlobalSearchPanelHtml` | function | 23180–23182 | 3 |
| `paintGlobalSearchResults` | function | 23183–23190 | 8 |
| `openGlobalSearch` | window | 23191–23215 | 25 |
| `closeGlobalSearch` | window | 23216–23223 | 8 |
| `onGlobalSearchInput` | window | 23224–23229 | 6 |
| `moveGlobalSearch` | function | 23230–23235 | 6 |
| `activateGlobalSearchResult` | window | 23236–23245 | 10 |
| `globalSearchOnKeydown` | function | 23246–23267 | 22 |
| `initGlobalSearch` | function | 23268–23272 | 5 |
| `rToolMenu` | function | 23294–23297 | 4 |
| `toolMenuElements` | function | 23298–23300 | 3 |
| `toolMenuItemElements` | function | 23301–23303 | 3 |
| `isToolMenuOpen` | function | 23304–23307 | 4 |
| `openToolMenu` | window | 23308–23315 | 8 |
| `closeToolMenu` | window | 23316–23322 | 7 |
| `toggleToolMenu` | window | 23323–23326 | 4 |
| `activateToolMenuItem` | window | 23327–23334 | 8 |
| `toolMenuOnKeydown` | function | 23335–23358 | 24 |
| `toolMenuOnClick` | function | 23359–23365 | 7 |
| `initToolMenu` | function | 23366–23369 | 4 |

## Alphabetisches Register

| Name | Art | Zeile |
|---|---|---|
| `_render` | function | 21709 |
| `acceptEinsatzCenterRosterSuggestion` | window | 7622 |
| `activateGlobalSearchResult` | window | 23236 |
| `activateToolMenuItem` | window | 23327 |
| `addComparisonDuo` | window | 13279 |
| `addComparisonDuoFromSelection` | window | 13271 |
| `addComparisonItem` | window | 13179 |
| `addDuoTeamGame` | function | 11164 |
| `addEinsatzCenterExistingGroup` | window | 7639 |
| `addEinsatzCenterGroupPlayer` | window | 7707 |
| `addEinsatzCenterNewGroup` | window | 7648 |
| `addEinsatzCenterRosterPlayer` | window | 7588 |
| `addGoalieGameToStats` | function | 4505 |
| `addGoalieSpecialTeamsGameToStats` | function | 4475 |
| `addLineupBuilderPlayerToActiveLine` | window | 2349 |
| `addLineupBuilderPlayerToLine` | window | 2339 |
| `addLineupPlayer` | window | 2285 |
| `addRosterImpactGameToStats` | function | 11699 |
| `addSelectedComparisonItem` | window | 13187 |
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
| `antiSynergyDeltaClass` | function | 11934 |
| `antiSynergyImpactScore` | function | 11840 |
| `antiSynergyPartnerIsSgOnly` | function | 11986 |
| `antiSynergySigned` | function | 11938 |
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
| `backToComparisonModeSelect` | window | 13207 |
| `backToHome` | window | 2402 |
| `buildAlltimePlayerDashModel` | function | 14346 |
| `buildAnnotatedGoalEventsForGame` | function | 10770 |
| `buildAppHash` | function | 3304 |
| `buildBalancedLineupSet` | function | 19102 |
| `buildBestThirdManOptions` | function | 10655 |
| `buildComparisonDataset` | function | 13648 |
| `buildComparisonExtraMetrics` | function | 13503 |
| `buildComparisonSummary` | function | 14012 |
| `buildConfidence` | function | 15557 |
| `buildDigitalCoachReport` | function | 18186 |
| `buildDirectDuoLookupForPlayer` | function | 10613 |
| `buildDryRunReport` | function | 6316 |
| `buildDuoAntiSynergy` | function | 11924 |
| `buildDuoComparison` | function | 13292 |
| `buildDuoCompatibility` | function | 11287 |
| `buildDuoDirectProduction` | function | 11140 |
| `buildDuoFloorCeiling` | function | 11051 |
| `buildDuoGapAnalysis` | function | 11259 |
| `buildDuoNetworkContext` | function | 11235 |
| `buildDuoOpponentAdjusted` | function | 11222 |
| `buildDuoProAnalysis` | function | 11346 |
| `buildDuoReplacementOptions` | function | 11334 |
| `buildDuoUntestedPotential` | function | 11310 |
| `buildDuoUsageRate` | function | 11322 |
| `buildDuoWarnings` | function | 11093 |
| `buildDuoWithWithoutImpact` | function | 11188 |
| `buildEinsatzCenterDraftExport` | function | 7768 |
| `buildFieldPlayerExplanation` | function | 14985 |
| `buildGlobalPageHash` | function | 3321 |
| `buildGoalieAnalysisModel` | function | 9571 |
| `buildGoalieComparisonDataset` | function | 13597 |
| `buildGoalieGameRecord` | function | 4557 |
| `buildGoaliePlayerExplanation` | function | 15060 |
| `buildGoalieRoleProfile` | function | 9797 |
| `buildGoalieStatsForSeason` | function | 4607 |
| `buildHallOfFameIntroTitle` | function | 8478 |
| `buildHashStringFromParsed` | function | 3336 |
| `buildIdentityProfiles` | function | 5420 |
| `buildLineAnalysis` | function | 18882 |
| `buildLineupAnalysis` | function | 18707 |
| `buildLineupExperienceProfile` | function | 18484 |
| `buildLineupIntelligence` | function | 18871 |
| `buildLineupOpponentDNAFit` | function | 18539 |
| `buildLineupRecommendations` | function | 19138 |
| `buildLineupScoreBreakdowns` | function | 18841 |
| `buildLockerRoomSheet` | function | 18219 |
| `buildMatchcenterStoryPreviewData` | function | 20804 |
| `buildMatchdayCaptionBlocks` | function | 18290 |
| `buildMatchIntelligence` | function | 18038 |
| `buildMatchIntelligenceFromContext` | function | 17983 |
| `buildMatchStories` | function | 18086 |
| `buildMomentumSwingStats` | function | 11045 |
| `buildMomentumSwingStatsRaw` | function | 10974 |
| `buildOpponentIntelligence` | function | 10452 |
| `buildOverviewCards` | function | 22886 |
| `buildPlayerDataFoundation` | function | 4877 |
| `buildPlayerEvents` | function | 4931 |
| `buildPlayerExplanation` | function | 15114 |
| `buildPlayerIdentity` | function | 3703 |
| `buildPlayerIntelligence` | function | 15123 |
| `buildRecencyWeightedGlobalIdentityProfile` | function | 12505 |
| `buildRegistry` | function | 4900 |
| `buildResponseGoalStats` | function | 10962 |
| `buildResponseGoalStatsRaw` | function | 10913 |
| `buildRosterImpactAnalysis` | function | 11855 |
| `buildRosterImpactGameIndex` | function | 11742 |
| `buildSeasonDataPreviewChanges` | function | 6421 |
| `buildSeasonDuos` | function | 4804 |
| `buildSeasonPlayerDashModel` | function | 14309 |
| `buildSocialMediaContent` | function | 18320 |
| `buildSoloDuoProfile` | function | 5189 |
| `buildSpecialTeamsForGame` | function | 4252 |
| `buildSpecialTeamsForSeason` | function | 4446 |
| `buildStaticSeasonDataBlock` | function | 6140 |
| `buildTeamLineBalance` | function | 19058 |
| `cachedAnalysis` | function | 2229 |
| `cancelDuoProPicker` | window | 11549 |
| `cancelEinsatzCenterEdit` | window | 7569 |
| `cancelHallOfFameIntro` | function | 8567 |
| `cancelSocialVideoRecording` | window | 19860 |
| `capSuperlativeLabel` | function | 15681 |
| `clampScore` | function | 15544 |
| `classicTagLabel` | function | 8721 |
| `classifyLineIdentity` | function | 18583 |
| `cleanupHallOfFameIntro` | function | 8507 |
| `clearAnalysisCache` | function | 2188 |
| `clearComparison` | window | 13198 |
| `clearComparisonDuos` | window | 13286 |
| `clearLineupAvailable` | window | 2338 |
| `clearLineupBuilderLine` | window | 2357 |
| `clearLineupPlayers` | window | 2292 |
| `clearlyAboveAverage` | function | 5377 |
| `clonePlain` | function | 4094 |
| `closeGlobalSearch` | window | 23216 |
| `closeMatchcenterStoryPreview` | window | 2257 |
| `closeToolMenu` | window | 23316 |
| `clutchText` | function | 5261 |
| `collectAssistEventRefs` | function | 2881 |
| `comparisonDuoContext` | function | 13212 |
| `comparisonEventGameKey` | function | 13490 |
| `comparisonEventPhaseLabel` | function | 13493 |
| `comparisonFmt` | function | 12980 |
| `comparisonItemKey` | function | 12958 |
| `comparisonJsArg` | function | 12969 |
| `comparisonNum` | function | 12972 |
| `comparisonOpponentStrengthTier` | function | 13497 |
| `comparisonPct` | function | 12976 |
| `comparisonPctFmt` | function | 12984 |
| `comparisonVariantValue` | function | 13101 |
| `composeIdentityText` | function | 5652 |
| `computeCurrentAppHash` | function | 3356 |
| `computeEinsatzCenterStats` | function | 6782 |
| `computeMetrics` | function | 5035 |
| `computeRosterStatus` | function | 5678 |
| `confidenceCautiousText` | function | 15603 |
| `confidenceFromSampleSize` | function | 11832 |
| `confirmDuoProSelection` | window | 11554 |
| `confirmEinsatzCenterCombo` | window | 7740 |
| `copyMatchcenterText` | window | 2259 |
| `countBy` | function | 10199 |
| `countCaptainAppearances` | function | 5660 |
| `countGoalieAppearances` | function | 5674 |
| `countMomentumClusters` | function | 5294 |
| `countPlayedUlmGames` | function | 2801 |
| `createPlayerAnalysisProfile` | function | 3629 |
| `createSeasonBucket` | function | 1813 |
| `datenstandQuoteState` | function | 22142 |
| `decodeHashSegmentSafe` | function | 3229 |
| `dedupeGamesById` | function | 15724 |
| `dedupeIdentityProfileTags` | function | 12582 |
| `deriveAsOfForSeason` | function | 3034 |
| `deriveLineupUlmPlayerIds` | function | 7279 |
| `deriveLineupValidPlayerIds` | function | 7255 |
| `derivePlayerStatus` | function | 3732 |
| `detectOverviewPhase` | function | 22642 |
| `detectSide` | const-arrow | 2517 |
| `detectTypes` | function | 5169 |
| `detectUlmSide` | function | 2510 |
| `diagnoseGameDuplicates` | function | 2539 |
| `diagnosticError` | function | 5913 |
| `diffGameIds` | function | 6263 |
| `difficultConnectionConfidence` | function | 10589 |
| `discardEinsatzCenterAutosave` | function | 7178 |
| `discardSeasonDataPreview` | function | 6520 |
| `dismissEinsatzCenterRosterSuggestion` | window | 7611 |
| `downloadMatchdayStory` | window | 19726 |
| `downloadSocialVideoContactSheet` | window | 21141 |
| `downloadSocialVideoStandbild` | window | 21117 |
| `duoProContextSeasonKey` | function | 11115 |
| `duoProDomId` | function | 11510 |
| `duoProPairKey` | function | 11112 |
| `duoProPickerMessage` | function | 11516 |
| `duoProPickerOpen` | function | 11513 |
| `duoProPlayer` | function | 11129 |
| `duoProResolveCandidate` | function | 11529 |
| `duoProSelectionPayload` | function | 11538 |
| `duoScopeSeasonKeys` | function | 10631 |
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
| `emptyDuoTeamImpactStats` | function | 11161 |
| `emptyFieldRoleSeasonStats` | function | 3688 |
| `emptyGoalieAlltimeStats` | function | 3661 |
| `emptyGoalieSeasonStats` | function | 3639 |
| `emptyGoalieSpecialTeamsStats` | function | 3676 |
| `emptyPlayerSeasonStats` | function | 3633 |
| `emptyRosterImpactStats` | function | 11688 |
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
| `ensureRmDuo` | function | 10893 |
| `ensureRmPlayer` | function | 10887 |
| `ensureSocialVideoExportCapabilityChecked` | function | 21098 |
| `escAttr` | function | 8694 |
| `escHtml` | function | 12601 |
| `eventMatchesTeams` | function | 5255 |
| `explainScore` | function | 15607 |
| `exportEinsatzCenterDraft` | window | 7782 |
| `exportExcel` | function | 21660 |
| `fallbackIdentityProfile` | function | 8729 |
| `fetchJson` | function | 5957 |
| `fetchJsonLegacy` | function | 5889 |
| `fetchJsonWithDiagnostics` | function | 5948 |
| `fetchSeasonGameRaw` | function | 5983 |
| `fetchTextWithDiagnostics` | function | 5918 |
| `fileNameForLineupSeasonKey` | function | 6610 |
| `filterComparisonDuoSuggestions` | window | 13244 |
| `filterComparisonPlayers` | window | 13155 |
| `filterLineupBuilderAvailable` | window | 2386 |
| `filterLineupPlayers` | window | 2293 |
| `filterPlayerSuggestions` | function | 13219 |
| `filterPureSGPlayers` | function | 9367 |
| `finalizeDuoTeamImpactStats` | function | 11180 |
| `finalizeGoalieSeasonStats` | function | 4490 |
| `finalizeMomentumStats` | function | 10968 |
| `finalizePlayerRegistrySeason` | function | 3873 |
| `finalizeResponseStats` | function | 10899 |
| `finalizeRosterImpactStats` | function | 11691 |
| `finalizeSpecialTeamsStats` | function | 4097 |
| `findDuplicateGameIds` | function | 6182 |
| `findLineupGameContext` | function | 6687 |
| `findLoadedSeasonPlayer` | function | 9330 |
| `finishHallOfFameIntro` | function | 8534 |
| `finiteNumbers` | function | 3994 |
| `fitMatchcenterStoryLayout` | function | 21047 |
| `fixMojibakeText` | function | 2463 |
| `formatDiagnosticAttempt` | function | 5964 |
| `formatGameLoadError` | function | 5977 |
| `formatStatus` | function | 5961 |
| `gameClassificationStatusLabel` | function | 2553 |
| `gameDaySortValue` | function | 4163 |
| `gameResult` | function | 3587 |
| `generatePlayerInsights` | function | 9192 |
| `generateSocialVideoContactSheets` | window | 19887 |
| `generateSocialVideoStandbilder` | window | 19863 |
| `generateSocialVideoVideos` | window | 19818 |
| `getActiveAlltimeSeasonKeys` | function | 10371 |
| `getActiveSeasonKey` | function | 2414 |
| `getAllLoadedSeasonGames` | function | 10564 |
| `getAlltimeAggregatedStyleProfile` | function | 14189 |
| `getAllTimeCoverStats` | function | 8300 |
| `getAllTimeDuoRows` | function | 10519 |
| `getAllTimeDuoRowsForPlayer` | function | 10257 |
| `getAllTimeGamesPlayedRows` | function | 10297 |
| `getAllTimeIdentityStandings` | function | 12469 |
| `getAllTimeMainPlayerRows` | function | 9371 |
| `getAllTimeOpponentIntelligence` | function | 12390 |
| `getAllTimeOpponentNames` | function | 2492 |
| `getAllTimeOpponentTopScorers` | function | 12398 |
| `getAllTimePenaltyRows` | function | 10322 |
| `getAllTimePlayerRows` | function | 9339 |
| `getAlltimeRank` | function | 12914 |
| `getAlltimeRecencyWeight` | function | 10382 |
| `getAllTimeSgOnlyRows` | function | 9374 |
| `getAssistDiagnostics` | function | 4749 |
| `getAssistPlayersFromEvent` | function | 2909 |
| `getCarryPerformanceRows` | function | 10268 |
| `getComparisonAlltimeTeamGoals` | function | 13005 |
| `getComparisonAlltimeTrend` | function | 13079 |
| `getComparisonChemistryFromEvents` | function | 13013 |
| `getComparisonClutchFromEvents` | function | 13018 |
| `getComparisonCurrentSelection` | function | 13144 |
| `getComparisonEventsForItem` | function | 13462 |
| `getComparisonPlayerOptions` | function | 13086 |
| `getComparisonPlayerRow` | function | 12987 |
| `getComparisonProfile` | function | 13048 |
| `getComparisonRosterGames` | function | 13482 |
| `getComparisonRosterGamesForSeason` | function | 13465 |
| `getComparisonSeasonEvents` | function | 13008 |
| `getComparisonSeasonLabel` | function | 12990 |
| `getComparisonSeasonTrend` | function | 13053 |
| `getComparisonStyleProfile` | function | 13023 |
| `getComparisonTeamGoalsForSeason` | function | 12993 |
| `getComparisonVariantsForPlayer` | function | 13104 |
| `getDifficultConnectionRowsForPlayer` | function | 11643 |
| `getDuoDirectScorerGameCounts` | function | 10689 |
| `getDuoFieldPlayerRows` | function | 11118 |
| `getDuoRowsForPlayerScope` | function | 10594 |
| `getDuoScorerCountsWithCandidate` | function | 10635 |
| `getDuoSharedFieldRows` | function | 11134 |
| `getEffectiveLineupData` | function | 6895 |
| `getEinsatzCenterGameDraft` | function | 6967 |
| `getEmptyState` | function | 15658 |
| `getFieldGameIdsForPlayer` | function | 2710 |
| `getFurtherSameDayUlmGames` | function | 4179 |
| `getGameDurationMinutes` | function | 4158 |
| `getGameId` | function | 6176 |
| `getGlobalAllTimeSnapshot` | function | 2418 |
| `getGlobalIdentityProfile` | function | 12554 |
| `getGlobalLoadableSeasonKeys` | function | 8293 |
| `getGlobalOpponentSpecialistProfile` | function | 14645 |
| `getGlobalPlayerBestSeason` | function | 10250 |
| `getGlobalPlayerMilestones` | function | 10433 |
| `getGlobalPlayerOpponentGameRows` | function | 14616 |
| `getGlobalPlayerPeakGame` | function | 10239 |
| `getGlobalPlayerTeamRecord` | function | 10213 |
| `getGlobalProfileEvents` | function | 10186 |
| `getGlobalRookieMilestone` | function | 10422 |
| `getGlobalRookieSeasonKey` | function | 10408 |
| `getGlobalSeasonStatRows` | function | 12898 |
| `getGlobalTopScorerMilestones` | function | 10395 |
| `getGoalieComparisonAlltimeTrend` | function | 13561 |
| `getGoalieComparisonSeasonTrend` | function | 13578 |
| `getGoalieDiagnostics` | function | 4735 |
| `getGoalieDnaRows` | function | 9875 |
| `getGoalieGameIdsForPlayer` | function | 2717 |
| `getGoalieOpponentName` | function | 4034 |
| `getGoalieOpponentTier` | function | 4038 |
| `getGoalScorerFromEvent` | function | 2875 |
| `getHallGoalieData` | function | 12764 |
| `getHallOfFamePlayerIdSet` | function | 10182 |
| `getHallOfFamePlayerRows` | function | 10179 |
| `getHallOfFameStats` | function | 12424 |
| `getJerseyNumber` | function | 2814 |
| `getLineupAllRows` | function | 18400 |
| `getLineupPlayerPool` | function | 18411 |
| `getLoadedSeasonPlayerUi` | function | 10208 |
| `getLoadedSeasonPointsByName` | function | 10152 |
| `getMatchcenterDirectOpponents` | function | 15799 |
| `getMatchcenterOpponents` | function | 15766 |
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
| `getPreviousSeasonKey` | function | 10107 |
| `getRosterEntryRegistryProfile` | function | 10585 |
| `getRosterGameIdsForPlayer` | function | 2651 |
| `getRosterImpactPlayerEventLookup` | function | 11709 |
| `getRosterImpactPlayerGames` | function | 11780 |
| `getRosterStatus` | function | 10388 |
| `getScoreLabel` | function | 15548 |
| `getSeasonApiBaseUrl` | function | 1838 |
| `getSeasonDataPreview` | function | 6526 |
| `getSeasonDataState` | function | 22674 |
| `getSeasonIdentityProfile` | function | 10342 |
| `getSeasonmanagerRosterSuggestion` | function | 7309 |
| `getSeasonOriginBaseUrl` | function | 1858 |
| `getSeasonPlayerFieldBasis` | function | 8798 |
| `getSeasonScopedIdentityProfile` | function | 8825 |
| `getSeasonTeamGameIds` | function | 2808 |
| `getSeasonTeamGames` | function | 2804 |
| `getSeasonUiPlayerForProfile` | function | 10338 |
| `getSpecialTeamsDiagnostics` | function | 4742 |
| `getSpecialTeamsPenaltyChunks` | function | 4215 |
| `getStaticSeasonGames` | function | 6026 |
| `getStoredLastView` | function | 3435 |
| `getSyntheticLineupPlayers` | function | 18377 |
| `getSyntheticLineupRow` | function | 18380 |
| `getSyntheticLineupRows` | function | 18397 |
| `getTeamAllTimeRecords` | function | 12348 |
| `getTeamLogoUrlForStory` | function | 20381 |
| `getUlmTeamStatus` | function | 2505 |
| `getUniqueAllTimeOpponentNames` | function | 2500 |
| `globalSearchEntries` | function | 23096 |
| `globalSearchIsEditableTarget` | function | 23145 |
| `globalSearchKeyAction` | function | 23151 |
| `globalSearchMatch` | function | 23133 |
| `globalSearchMatchdayScore` | function | 23119 |
| `globalSearchOnKeydown` | function | 23246 |
| `globalSearchPlayerScore` | function | 23110 |
| `globalSearchTokens` | function | 23091 |
| `goalieApplySampleConfidence` | function | 9556 |
| `goalieBucketLooseSum` | function | 9564 |
| `goalieBucketRows` | function | 9476 |
| `goalieClampScore` | function | 9521 |
| `goalieDetailFirstTime` | function | 9500 |
| `goalieDnaKey` | function | 9784 |
| `goalieDnaValue` | function | 9789 |
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
| `goalieStateGoals` | function | 9796 |
| `goalieStdDev` | function | 9494 |
| `goalieTierMeta` | function | 9485 |
| `goalieTime` | function | 9468 |
| `goalieTopRow` | function | 9482 |
| `goalieWeightedScore` | function | 9550 |
| `goToMainNavPoint` | window | 22360 |
| `hallGoalieExplainForLabel` | function | 12801 |
| `hallGoalieNameHtml` | function | 12780 |
| `hallGoalieNum` | function | 12666 |
| `hallGoaliePkStats` | function | 12692 |
| `hallGoalieRowFromStats` | function | 12731 |
| `hallGoalieSeasonLabel` | function | 12680 |
| `hallGoalieSeasonScore` | function | 12711 |
| `hallGoalieTime` | function | 12672 |
| `hallGoalieTooltip` | function | 12797 |
| `hallGoalieTopteamStats` | function | 12704 |
| `handleComparisonDuoSearchKey` | window | 13252 |
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
| `initGlobalSearch` | function | 23268 |
| `initHashRouting` | function | 3566 |
| `initToolMenu` | function | 23366 |
| `invalidateGlobalIdentityCache` | function | 2243 |
| `isActiveAlltimeSeasonStats` | function | 10357 |
| `isComebackRelevantGoal` | function | 5275 |
| `isDecisiveGoal` | function | 5267 |
| `isEinsatzCenterGameFromDraft` | function | 6904 |
| `isExcludedGoalieAppearance` | function | 2684 |
| `isFieldAppearance` | function | 2704 |
| `isGamePlayed` | function | 3001 |
| `isGoalieAppearance` | function | 2698 |
| `isGoalieRosterEntry` | function | 2660 |
| `isHallOfFameEligiblePlayer` | function | 10173 |
| `isHallRowPureSG` | function | 12681 |
| `isImportantClutchGoal` | function | 5262 |
| `isLateGoal` | function | 5270 |
| `isMatchPenaltyEvent` | function | 4142 |
| `isNewSeasonDataState` | function | 22695 |
| `isPenaltyGoalEvent` | function | 4225 |
| `isPreClubHistoryPlayerName` | function | 2533 |
| `isPureSGPlayer` | function | 9363 |
| `isRookieCandidateForSeason` | function | 10142 |
| `isSameUlmTeamContext` | function | 4171 |
| `isSeasonDataPreviewStale` | function | 6534 |
| `isSgOnlyAlltimePlayer` | function | 9355 |
| `isSgOnlyHallOfFameExcluded` | function | 10164 |
| `isSyntheticLineupPlayerId` | function | 18374 |
| `isToolMenuOpen` | function | 23304 |
| `isTwoPlusTwoPenaltyEvent` | function | 4146 |
| `isUsableExternalSeasonData` | function | 6109 |
| `isValidAsOfDate` | function | 3146 |
| `isValidAsOfStartTime` | function | 3149 |
| `isVisibleSecondaryTrait` | function | 8700 |
| `kpiBadge` | function | 13970 |
| `kpiDelta` | function | 13689 |
| `kpiItemColor` | function | 13695 |
| `kpiNiceMax` | function | 13860 |
| `kpiRadarValue` | function | 13783 |
| `kpiTrendRows` | function | 13866 |
| `kpiValueText` | function | 13685 |
| `lexiconEntry` | function | 15354 |
| `lexiconUniqueKeys` | function | 15346 |
| `lineupAverage` | function | 18426 |
| `lineupBuilderPoolIds` | function | 2300 |
| `lineupCombinationIds` | function | 18903 |
| `lineupDirectChemistryScore` | function | 18947 |
| `lineupEvaluateComplementCandidate` | function | 18954 |
| `lineupGroupDisplayName` | function | 6813 |
| `lineupLevelLabel` | function | 18430 |
| `lineupOpponentDNAForContext` | function | 18527 |
| `lineupPlayerAnchorConfidence` | function | 19053 |
| `lineupPlayerAnchorScore` | function | 19033 |
| `lineupPlayerProfile` | function | 18631 |
| `lineupRankCandidateIds` | function | 18888 |
| `lineupRecommendationReason` | function | 19129 |
| `lineupRoleDnaComplementScore` | function | 18923 |
| `lineupRosterGamesForPlayer` | function | 18436 |
| `lineupRowMap` | function | 18885 |
| `lineupRowMeta` | function | 18403 |
| `lineupScore` | function | 18420 |
| `lineupStdDev` | function | 18917 |
| `linkUiPlayersToRegistry` | function | 3828 |
| `loadEinsatzCenterMismatchedAutosave` | function | 7224 |
| `loadSeason` | function | 8366 |
| `loadSeasonData` | function | 7809 |
| `loadSeasonForGlobal` | function | 8318 |
| `loadSeasonManifest` | function | 6041 |
| `mainNavActiveKeyForPage` | function | 22354 |
| `markFieldRoleAppearance` | function | 3803 |
| `matchcenterAddDuoConnection` | function | 16206 |
| `matchcenterAddPlanItem` | function | 17423 |
| `matchcenterAddPlanWatch` | function | 17429 |
| `matchcenterAddUlmDuoConnection` | function | 16357 |
| `matchcenterAddUlmScoring` | function | 15987 |
| `matchcenterAnalyzeDirect` | function | 15832 |
| `matchcenterAnalyzeForm` | function | 15869 |
| `matchcenterBuildCoachActivationHints` | function | 18171 |
| `matchcenterBuildCoachAvoidList` | function | 18161 |
| `matchcenterBuildCoachDangerPatterns` | function | 18143 |
| `matchcenterBuildCoachHints` | function | 17899 |
| `matchcenterBuildCoachIfThen` | function | 18151 |
| `matchcenterBuildCoachKeyActors` | function | 18178 |
| `matchcenterBuildCoachLevers` | function | 18133 |
| `matchcenterBuildCoachPriorities` | function | 18126 |
| `matchcenterBuildGoalieMatchup` | function | 16558 |
| `matchcenterBuildInsights` | function | 16845 |
| `matchcenterBuildIntelHeadline` | function | 17915 |
| `matchcenterBuildIntelligenceDataQuality` | function | 17531 |
| `matchcenterBuildIntelligenceSignals` | function | 17936 |
| `matchcenterBuildIntelListFromPlan` | function | 17890 |
| `matchcenterBuildMatchPlan` | function | 19248 |
| `matchcenterBuildOneThingToWatch` | function | 17923 |
| `matchcenterBuildOpponentAlarm` | function | 17780 |
| `matchcenterBuildOpponentDNA` | function | 17601 |
| `matchcenterBuildOpponentDuoInsights` | function | 16305 |
| `matchcenterBuildOpponentDuos` | function | 16260 |
| `matchcenterBuildPlanConfidence` | function | 17435 |
| `matchcenterBuildSpecialTeamsMatchup` | function | 16488 |
| `matchcenterBuildTimingAnalysis` | function | 16684 |
| `matchcenterBuildTimingInsights` | function | 16673 |
| `matchcenterBuildUlmDuoInsights` | function | 16455 |
| `matchcenterBuildUlmDuos` | function | 16412 |
| `matchcenterBuildUlmPlayerInsights` | function | 16149 |
| `matchcenterBuildUlmPlayerScouting` | function | 16094 |
| `matchcenterClassifyUlmGoalEvent` | function | 15976 |
| `matchcenterCoachAdd` | function | 18063 |
| `matchcenterCoachCautious` | function | 18060 |
| `matchcenterCoachGameModel` | function | 18072 |
| `matchcenterCoachPriorityFromAlarm` | function | 18116 |
| `matchcenterConfidenceClass` | function | 17410 |
| `matchcenterDateLabel` | function | 15708 |
| `matchcenterDefaultSeasonKey` | function | 15746 |
| `matchcenterDeriveOpponentType` | function | 17714 |
| `matchcenterDirectContextGames` | function | 16468 |
| `matchcenterDuoDirectionLabel` | function | 16199 |
| `matchcenterDuoPairKey` | function | 16162 |
| `matchcenterEmptyBuckets` | function | 15917 |
| `matchcenterEmptyTimingStats` | function | 16620 |
| `matchcenterEnsureOpponentDuo` | function | 16166 |
| `matchcenterEnsureUlmDuo` | function | 16319 |
| `matchcenterEnsureUlmPlayer` | function | 15925 |
| `matchcenterFinalizeOpponentDuos` | function | 16225 |
| `matchcenterFinalizeUlmDuos` | function | 16376 |
| `matchcenterFinalizeUlmPlayers` | function | 16025 |
| `matchcenterFormLine` | function | 16840 |
| `matchcenterGameLine` | function | 16834 |
| `matchcenterGoalAbsSeconds` | function | 16604 |
| `matchcenterGoalieFitScore` | function | 16541 |
| `matchcenterGoalieKey` | function | 16536 |
| `matchcenterGoalMinute` | function | 15903 |
| `matchcenterInferPriority` | function | 17416 |
| `matchcenterIntelAddAlarm` | function | 17759 |
| `matchcenterIntelCurve` | function | 17483 |
| `matchcenterIntelDataLabel` | function | 17528 |
| `matchcenterIntelDuoRef` | function | 17745 |
| `matchcenterIntelInverseCurve` | function | 17489 |
| `matchcenterIntelPct` | function | 17508 |
| `matchcenterIntelPlayerRef` | function | 17732 |
| `matchcenterIntelPriorityClass` | function | 17518 |
| `matchcenterIntelPriorityFromScore` | function | 17512 |
| `matchcenterIntelPriorityLabel` | function | 17524 |
| `matchcenterIntelRate` | function | 17504 |
| `matchcenterIntelWeighted` | function | 17493 |
| `matchcenterIsFreiburgTuebingenTeamName` | function | 15733 |
| `matchcenterOpponentMode` | function | 15763 |
| `matchcenterPct` | function | 16484 |
| `matchcenterPersonalPenaltyMinutesForSide` | function | 16475 |
| `matchcenterPlanRateText` | function | 17402 |
| `matchcenterPlanScoreText` | function | 17398 |
| `matchcenterPriorityLabel` | function | 17407 |
| `matchcenterRegisterUlmProfileGame` | function | 15963 |
| `matchcenterResultClass` | function | 16825 |
| `matchcenterSeasonHasGames` | function | 15743 |
| `matchcenterSigned` | function | 15702 |
| `matchcenterSocialAdd` | function | 18240 |
| `matchcenterSocialCaption` | function | 18247 |
| `matchcenterSpecialTeamsForGame` | function | 16471 |
| `matchcenterStoryAddCandidate` | function | 20485 |
| `matchcenterStoryAddFact` | function | 20466 |
| `matchcenterStoryBestClutchDuo` | function | 20710 |
| `matchcenterStoryBestClutchPlayer` | function | 20666 |
| `matchcenterStoryCandidateForBudget` | function | 20523 |
| `matchcenterStoryCategoryForPlanFact` | function | 20795 |
| `matchcenterStoryCategoryLimit` | function | 20508 |
| `matchcenterStoryClutchFact` | function | 20643 |
| `matchcenterStoryClutchPriority` | function | 20744 |
| `matchcenterStoryCompetitionLabel` | function | 20747 |
| `matchcenterStoryCurrentStreak` | function | 20590 |
| `matchcenterStoryDirectFactCandidates` | function | 20760 |
| `matchcenterStoryDownloadFileName` | function | 19716 |
| `matchcenterStoryDuoClutchFact` | function | 20720 |
| `matchcenterStoryDuoClutchTotal` | function | 20702 |
| `matchcenterStoryDuoFact` | function | 20723 |
| `matchcenterStoryEstimateFactWeight` | function | 20479 |
| `matchcenterStoryFactKey` | function | 20473 |
| `matchcenterStoryFormFact` | function | 20608 |
| `matchcenterStoryFormFactCandidates` | function | 20619 |
| `matchcenterStoryInlineStat` | function | 20448 |
| `matchcenterStoryLastDuelLabel` | function | 20756 |
| `matchcenterStoryLateGoalsForOutcome` | function | 20639 |
| `matchcenterStoryLogoBase` | function | 20360 |
| `matchcenterStoryLogoForOpponent` | function | 20411 |
| `matchcenterStoryLooksArtificial` | function | 20476 |
| `matchcenterStoryNameClass` | function | 20916 |
| `matchcenterStoryNormalizePickOptions` | function | 20512 |
| `matchcenterStoryPickFactItems` | function | 20533 |
| `matchcenterStoryPickFacts` | function | 20586 |
| `matchcenterStoryPlanFactCandidates` | function | 20782 |
| `matchcenterStoryPlayerClutchFact` | function | 20676 |
| `matchcenterStoryPlayerClutchTotal` | function | 20658 |
| `matchcenterStoryRankRows` | function | 20452 |
| `matchcenterStoryRankText` | function | 20444 |
| `matchcenterStorySafeLogoUrl` | function | 20366 |
| `matchcenterStoryShortDuel` | function | 20751 |
| `matchcenterStoryTableRank` | function | 20426 |
| `matchcenterStoryUlmTableRank` | function | 20437 |
| `matchcenterStoryVisibleFacts` | function | 20922 |
| `matchcenterStoryWinlessStreak` | function | 20599 |
| `matchcenterTimeValue` | function | 16612 |
| `matchcenterTimingStatsForGames` | function | 16636 |
| `matchcenterUlmScoutingConfidence` | function | 15920 |
| `matchcenterUlmTeamLabelForGame` | function | 16829 |
| `matchcenterUpdateUlmSeasonRow` | function | 15969 |
| `matchcenterWindowForSecond` | function | 16629 |
| `matchdayFixtureCardHtml` | function | 22536 |
| `matchdayGameCardHtml` | function | 22511 |
| `matchdayLineupCardHtml` | function | 22504 |
| `matchdayLineupInfo` | function | 22492 |
| `matchdayUlmGames` | function | 22483 |
| `medianOrNull` | function | 4001 |
| `mergeDuoSet` | function | 4831 |
| `mergeGoalieSpecialTeamsStats` | function | 4463 |
| `mergeSpecialTeamsStats` | function | 4107 |
| `moveGlobalSearch` | function | 23230 |
| `normalizeAssistPlayerName` | function | 2878 |
| `normalizeComparisonItem` | function | 12964 |
| `normalizeDuoComparisonItem` | function | 13208 |
| `normalizeEventPlayerRef` | function | 2817 |
| `normalizeLineupLines` | function | 2303 |
| `normalizePlayerName` | function | 2520 |
| `normalizeSecondaryTraits` | function | 5378 |
| `onGlobalSearchInput` | window | 23224 |
| `openAllTimePlayers` | window | 8434 |
| `openComparisonCenter` | window | 8604 |
| `openDuoProPicker` | window | 11548 |
| `openEinsatzCenter` | window | 6764 |
| `openGlobalSearch` | window | 23191 |
| `openHallOfFame` | window | 8580 |
| `openLexicon` | window | 8677 |
| `openLigaGegner` | window | 22948 |
| `openLineupBuilder` | window | 8655 |
| `openMatchcenter` | window | 8633 |
| `openMatchcenterStoryPreview` | window | 2256 |
| `openMatchday` | window | 22465 |
| `openMatchdayTimeline` | window | 22457 |
| `openOverview` | window | 22406 |
| `openSeason` | window | 8431 |
| `openToolMenu` | window | 23308 |
| `overviewCompactTableHtml` | function | 22765 |
| `overviewCrossSeasonTrendHtml` | function | 22824 |
| `overviewFormHtml` | function | 22783 |
| `overviewLastMatchdayText` | function | 22731 |
| `overviewLineupLinkHtml` | function | 22841 |
| `overviewMatchcenterLinkHtml` | function | 22838 |
| `overviewMatchdayEndMs` | function | 22636 |
| `overviewMatchdayStartMs` | function | 22630 |
| `overviewNextMatchdayHtml` | function | 22741 |
| `overviewOpponentLabel` | function | 22719 |
| `overviewOpponentPreviewHtml` | function | 22833 |
| `overviewRankChangeTile` | function | 22860 |
| `overviewRecordHtml` | function | 22817 |
| `overviewSeasonAwardHtml` | function | 22806 |
| `overviewSeasonBilanzHtml` | function | 22798 |
| `p1NarrativeKey` | function | 15622 |
| `paintGlobalSearchResults` | function | 23183 |
| `parseAppHash` | function | 3249 |
| `parseAsOfQueryValue` | function | 3288 |
| `parseComparisonVariant` | function | 13129 |
| `parseLastViewState` | function | 3423 |
| `parseSeasonDataState` | function | 22685 |
| `pct` | function | 5186 |
| `pctValue` | function | 12604 |
| `pdashBestPhase` | function | 14256 |
| `pdashInsight` | function | 14294 |
| `pdashInsights` | function | 14297 |
| `pdashNum` | function | 14240 |
| `pdashOpponentStrength` | function | 14274 |
| `pdashOpponentTier` | function | 14268 |
| `pdashPct` | function | 14244 |
| `pdashPhaseLabel` | function | 14248 |
| `pdashTopCount` | function | 14252 |
| `pdashTopOpponent` | function | 14264 |
| `pdashTopPartner` | function | 14260 |
| `penaltyRawText` | function | 4139 |
| `playerAppearedForUlmStatusInSeasonByName` | function | 10123 |
| `playerAppearedInSeasonByName` | function | 10112 |
| `playerExplainAdd` | function | 14930 |
| `playerExplainConfidence` | function | 14921 |
| `playerExplainConfidenceLabel` | function | 14927 |
| `playerExplainContextSentence` | function | 14966 |
| `playerExplainHeadline` | function | 14956 |
| `playerExplainRolePhrase` | function | 14947 |
| `playerExplainStyleSignature` | function | 14935 |
| `processGame` | function | 2942 |
| `rAlltimeKpis` | function | 12920 |
| `rAlltimePlayerDashboard` | function | 14449 |
| `rAllTimePlayersPage` | function | 15211 |
| `rankNarratives` | function | 15644 |
| `rAntiSynergyCompareChip` | function | 11943 |
| `rAntiSynergyDelta` | function | 11927 |
| `rAntiSynergyMainDelta` | function | 11990 |
| `rAntiSynergyMetricRow` | function | 11951 |
| `rAntiSynergyWinrateRow` | function | 11973 |
| `rAntiSynergyWinrateText` | function | 11967 |
| `rAsOfSelector` | function | 22969 |
| `ratio01` | function | 5187 |
| `rAvgResponseTimeNote` | function | 12224 |
| `rCarryPerformanceRows` | function | 10284 |
| `rClassicRoleTags` | function | 8786 |
| `rClassicTagTip` | function | 8724 |
| `rClutch` | function | 8992 |
| `rClutchBadge` | function | 8686 |
| `rComparisonCenterPage` | function | 14119 |
| `rComparisonDashboard` | function | 14070 |
| `rComparisonDuoSearchBox` | function | 13438 |
| `rComparisonDuoSuggestionButtons` | function | 13231 |
| `rComparisonMiniOverview` | function | 14058 |
| `rComparisonModeSelect` | function | 13459 |
| `rComparisonRoles` | function | 14062 |
| `rComparisonStyles` | function | 14081 |
| `rContextBar` | function | 23052 |
| `rDifficultConnectionList` | function | 12000 |
| `rDifficultConnectionListCompact` | function | 12067 |
| `rDifficultConnectionListCompactLegacy` | function | 12025 |
| `rDifficultConnectionsCard` | function | 12106 |
| `rDuoCenterPro` | function | 11390 |
| `rDuoCompareSummaryCards` | function | 13317 |
| `rDuoComparisonBars` | function | 13312 |
| `rDuoComparisonChemistry` | function | 13370 |
| `rDuoComparisonContext` | function | 13402 |
| `rDuoComparisonDashboard` | function | 13424 |
| `rDuoComparisonDetails` | function | 13420 |
| `rDuoComparisonImpact` | function | 13386 |
| `rDuoComparisonPage` | function | 13448 |
| `rDuoComparisonProfile` | function | 13348 |
| `rDuoProPlayerSelect` | function | 11577 |
| `rDuoResponseMomentumCard` | function | 12282 |
| `rDuoRows` | function | 10543 |
| `recommendLineComplements` | function | 19220 |
| `recordOverviewVisit` | function | 22704 |
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
| `removeComparisonDuo` | window | 13282 |
| `removeComparisonItem` | window | 13194 |
| `removeEinsatzCenterCombo` | window | 7751 |
| `removeEinsatzCenterGroup` | window | 7665 |
| `removeEinsatzCenterGroupPlayer` | window | 7715 |
| `removeEinsatzCenterRosterPlayer` | window | 7596 |
| `removeLineupBuilderPlayerFromLine` | window | 2350 |
| `removeLineupPlayer` | window | 2291 |
| `rEmptyState` | function | 15670 |
| `renameEinsatzCenterGroup` | window | 7687 |
| `render` | function | 21691 |
| `renderComparisonDuoSuggestions` | function | 13235 |
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
| `responseMomentumAbsSeconds` | function | 10722 |
| `responseMomentumActor` | function | 10751 |
| `responseMomentumConfidence` | function | 10871 |
| `responseMomentumEmptyState` | function | 10876 |
| `responseMomentumGameRows` | function | 10735 |
| `responseMomentumGoalActors` | function | 10762 |
| `responseMomentumPairKey` | function | 10884 |
| `responseMomentumSide` | function | 10742 |
| `responseMomentumTime` | function | 10728 |
| `responseMomentumTooltipFor` | function | 12187 |
| `restoreEinsatzCenterAutosave` | function | 7160 |
| `restoreHallOfFameIntroPrevious` | function | 8522 |
| `resultGoalsAgainstForSide` | function | 4043 |
| `returnToEinsatzCenterEdit` | window | 7582 |
| `rGlobalAllTimeStats` | function | 14557 |
| `rGlobalCareerHeader` | function | 14466 |
| `rGlobalDevelopment` | function | 14575 |
| `rGlobalDnaBars` | function | 14210 |
| `rGlobalDuoNetwork` | function | 14675 |
| `rGlobalOpponentSpecialist` | function | 14874 |
| `rGlobalOverview` | function | 14504 |
| `rGlobalPartnerOpponentPanel` | function | 14452 |
| `rGlobalProfileTags` | function | 12595 |
| `rGlobalSearchPanelHtml` | function | 23180 |
| `rGlobalSearchResultsHtml` | function | 23169 |
| `rGlobalSearchToggle` | function | 23166 |
| `rGoalieAnalysis` | function | 10080 |
| `rGoalieBars` | function | 9730 |
| `rGoalieDnaBars` | function | 9879 |
| `rGoalieFirstGoalResistance` | function | 9916 |
| `rGoalieInsights` | function | 9989 |
| `rGoalieKpis` | function | 9893 |
| `rGoalieMiniMetrics` | function | 9910 |
| `rGoalieMomentum` | function | 9930 |
| `rGoalieOpponents` | function | 10031 |
| `rGoalieOverview` | function | 10011 |
| `rGoaliePhaseProfile` | function | 9972 |
| `rGoaliePhases` | function | 10028 |
| `rGoalieRoleTraits` | function | 9871 |
| `rGoalieStability` | function | 10043 |
| `rGoalieTable` | function | 10072 |
| `rGoalieTierCards` | function | 9944 |
| `rHallDuoTemple` | function | 12657 |
| `rHallGoalieAwardCards` | function | 12848 |
| `rHallGoalieLegends` | function | 12865 |
| `rHallGoalieRankCard` | function | 12816 |
| `rHallOfFameHero` | function | 12608 |
| `rHallOfFamePage` | function | 15253 |
| `rHallPodiumList` | function | 12634 |
| `rHallSGBadge` | function | 12689 |
| `rIaShell` | function | 23072 |
| `rIdentityCards` | function | 8760 |
| `rIdentityTags` | function | 8740 |
| `rInsights` | function | 9253 |
| `rInteractiveDuoCenterPro` | function | 11584 |
| `rKpiCards` | function | 13698 |
| `rKpiExtendedMetrics` | function | 13845 |
| `rKpiInfoCards` | function | 13980 |
| `rKpiMetricCard` | function | 13837 |
| `rKpiMirrorRows` | function | 13723 |
| `rKpiObjectMini` | function | 13973 |
| `rKpiOpponentStrength` | function | 13942 |
| `rKpiRadar` | function | 13794 |
| `rKpiShareBars` | function | 13829 |
| `rKpiTextMetricCard` | function | 13842 |
| `rKpiTrendCompare` | function | 13875 |
| `rKPIVergleich` | function | 14044 |
| `rLexiconPage` | function | 15368 |
| `rLexiconRows` | function | 15364 |
| `rLigaGegnerPlaceholderPage` | function | 22952 |
| `rLineupBuilderAvailablePanel` | function | 20082 |
| `rLineupBuilderPage` | function | 20258 |
| `rLineupComplementCards` | function | 20179 |
| `rLineupMetricPills` | function | 20068 |
| `rLineupRecommendationCards` | function | 20130 |
| `rLineupRecommendationMode` | function | 20145 |
| `rLineupScoreRows` | function | 19964 |
| `rLineupSimpleCards` | function | 19986 |
| `rLineupTestLine` | function | 20192 |
| `rLineupTestMode` | function | 20241 |
| `rMainNav` | function | 22367 |
| `rMainNavBottom` | function | 22389 |
| `rMatchcenterCoachCardList` | function | 19543 |
| `rMatchcenterCoachIfThen` | function | 19557 |
| `rMatchcenterCoachSimpleList` | function | 19565 |
| `rMatchcenterCopyButton` | function | 19635 |
| `rMatchcenterDetailsSection` | function | 16817 |
| `rMatchcenterDigitalCoach` | function | 19570 |
| `rMatchcenterDuoRankCard` | function | 17136 |
| `rMatchcenterDuoRow` | function | 17112 |
| `rMatchcenterDuosTab` | function | 17283 |
| `rMatchcenterDuoWatchCard` | function | 17092 |
| `rMatchcenterFormCard` | function | 16873 |
| `rMatchcenterFormSection` | function | 16791 |
| `rMatchcenterGamesList` | function | 16894 |
| `rMatchcenterGoalieCard` | function | 17345 |
| `rMatchcenterGoalieMatchup` | function | 17369 |
| `rMatchcenterIntelCoachHints` | function | 19529 |
| `rMatchcenterIntelOverview` | function | 19483 |
| `rMatchcenterKpi` | function | 16866 |
| `rMatchcenterLineupBuilder` | function | 19995 |
| `rMatchcenterLockerList` | function | 19640 |
| `rMatchcenterLockerRoomSheet` | function | 19652 |
| `rMatchcenterMatchPlan` | function | 20337 |
| `rMatchcenterOpponentAlarm` | function | 19461 |
| `rMatchcenterOpponentDNA` | function | 19428 |
| `rMatchcenterOpponentDuos` | function | 17240 |
| `rMatchcenterOpponentScouting` | function | 17053 |
| `rMatchcenterPage` | function | 21168 |
| `rMatchcenterPlanItems` | function | 19394 |
| `rMatchcenterPlanWatch` | function | 19412 |
| `rMatchcenterPlayerRow` | function | 16927 |
| `rMatchcenterPlayersTab` | function | 17089 |
| `rMatchcenterProfileSection` | function | 16771 |
| `rMatchcenterRankCard` | function | 16951 |
| `rMatchcenterResponseMomentum` | function | 12309 |
| `rMatchcenterScoutingSummary` | function | 20293 |
| `rMatchcenterSocialBlock` | function | 19708 |
| `rMatchcenterSocialMediaCenter` | function | 19910 |
| `rMatchcenterSpecialCard` | function | 17286 |
| `rMatchcenterSpecialTeams` | function | 17295 |
| `rMatchcenterStoryForm` | function | 20958 |
| `rMatchcenterStoryFrame` | function | 21041 |
| `rMatchcenterStoryLogo` | function | 20953 |
| `rMatchcenterStoryPlayerCard` | function | 20963 |
| `rMatchcenterStoryPreview` | function | 20971 |
| `rMatchcenterTabs` | function | 16768 |
| `rMatchcenterTimeBars` | function | 16695 |
| `rMatchcenterTiming` | function | 16729 |
| `rMatchcenterTimingStatsCard` | function | 16709 |
| `rMatchcenterUlmDuoRankCard` | function | 17191 |
| `rMatchcenterUlmDuoRow` | function | 17168 |
| `rMatchcenterUlmDuos` | function | 17197 |
| `rMatchcenterUlmDuoWatchCard` | function | 17142 |
| `rMatchcenterUlmImpactCard` | function | 16957 |
| `rMatchcenterUlmPlayerRow` | function | 16986 |
| `rMatchcenterUlmRankCard` | function | 17010 |
| `rMatchcenterUlmScouting` | function | 17016 |
| `rMatchcenterWatchCard` | function | 16906 |
| `rMatchdayDetailPage` | function | 22565 |
| `rMatchdayPage` | function | 22605 |
| `rMatchdayTimelinePage` | function | 22554 |
| `rMatchdayTimelineRow` | function | 22546 |
| `rMatrix` | function | 8865 |
| `rmTerm` | function | 12194 |
| `roleGameStableKey` | function | 2732 |
| `roleTraitLabel` | function | 8697 |
| `rOppBreakdown` | function | 9157 |
| `rOpponentIntelBars` | function | 10507 |
| `rOpponentTopScorerTable` | function | 12448 |
| `rosterImpactConfidence` | function | 11822 |
| `rosterImpactConfidenceWeight` | function | 11836 |
| `rosterPlayerMatches` | function | 2636 |
| `rOverviewPage` | function | 22936 |
| `rPdashLabel` | function | 14401 |
| `rPdashStat` | function | 14404 |
| `rPenalties` | function | 9138 |
| `rPhases` | function | 8922 |
| `rPlayerDash` | function | 14407 |
| `rPlayerDashStyles` | function | 14389 |
| `rPlayerExplainItems` | function | 15153 |
| `rPlayerExplanation` | function | 15158 |
| `rPlayerResponseMomentumCard` | function | 12263 |
| `rPlayerRoleSwitch` | function | 9455 |
| `rRadar` | function | 8942 |
| `rRes` | const-arrow | 8685 |
| `rResponseMomentumOverviewCard` | function | 12239 |
| `rResponseRateDisplay` | function | 12203 |
| `rRmKpi` | function | 12210 |
| `rRmTopList` | function | 12228 |
| `rRoleTraitTip` | function | 8704 |
| `rRosterImpactStatLine` | function | 11982 |
| `rRosterStatusBadge` | function | 8713 |
| `rScoreBreakdown` | function | 15684 |
| `rSeasonDataPreviewCard` | function | 6553 |
| `rSeasonDataPreviewContextHint` | function | 23004 |
| `rSeasonDataPreviewRows` | function | 6543 |
| `rSeasonDataPreviewStatus` | function | 6540 |
| `rSeasonDataStateContextHint` | function | 23021 |
| `rSeasonDuoCenterPro` | function | 11640 |
| `rSeasonDuoSummary` | function | 8912 |
| `rSeasonInsightsTab` | function | 9238 |
| `rSeasonLandingPage` | function | 14488 |
| `rSeasonPlayerDashboard` | function | 14446 |
| `rSeasonProfileKpis` | function | 8837 |
| `rSeasonProfileTagStrip` | function | 8858 |
| `rSeasonTrendRows` | function | 14170 |
| `rSocialVideoBlock` | function | 19777 |
| `rSparkline` | function | 12934 |
| `rStyleMetricTip` | function | 8709 |
| `rStyleProfileBars` | function | 8749 |
| `rTable` | function | 9307 |
| `rTeamPage` | function | 21317 |
| `rTeamResponseMomentumCard` | function | 12302 |
| `rTimeline` | function | 9027 |
| `rToolMenu` | function | 23294 |
| `runComparison` | window | 13199 |
| `runDuoComparison` | window | 13287 |
| `saveLastView` | function | 3440 |
| `scoreNarrative` | function | 15625 |
| `seasonApiUrl` | function | 1855 |
| `seasonDataPreviewRerender` | function | 6399 |
| `seasonDataPreviewRow` | function | 6403 |
| `seasonGameApiUrls` | function | 1873 |
| `seasonGameHtmlUrls` | function | 1883 |
| `seasonHasPureUlmTeam` | function | 10157 |
| `seasonKeyToHashSegment` | function | 3139 |
| `seasonPathPrefix` | function | 1867 |
| `seasonRoleKeysForPlayer` | function | 5395 |
| `seasonRoleTraitsFromClassic` | function | 5390 |
| `seasonStatNumber` | function | 10347 |
| `seasonStatSetSize` | function | 10351 |
| `seedHallOfFameIntroParticles` | function | 8489 |
| `selectAllLineupAvailable` | window | 2337 |
| `selectComparisonDuoSuggestion` | window | 13245 |
| `selectComparisonMode` | window | 13206 |
| `selectComparisonPlayer` | window | 13163 |
| `selectDuoProQuick` | window | 11550 |
| `selectEinsatzCenterEditGame` | window | 7584 |
| `selectEnforcerKeys` | function | 5407 |
| `serializeFieldRoleSeasonStats` | function | 3924 |
| `serializeGoalieSeasonStats` | function | 3902 |
| `serializeSeasonStats` | function | 3889 |
| `serializeSpecialTeamsStats` | function | 4104 |
| `setAntiSynergyView` | window | 2383 |
| `setComparisonDuoMode` | window | 13216 |
| `setComparisonDuoPlayer` | window | 13265 |
| `setComparisonDuoSearch` | window | 13218 |
| `setComparisonDuoSeasonKey` | window | 13217 |
| `setComparisonRoleMode` | window | 13169 |
| `setComparisonVariant` | window | 13174 |
| `setContextAsOf` | window | 22982 |
| `setDuoProPickerState` | function | 11519 |
| `setDuoProSelection` | window | 11569 |
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
| `socialDuoFocusLine` | function | 18270 |
| `socialEnsurePeriod` | function | 18256 |
| `socialFirstUseful` | function | 18260 |
| `socialKeyFactLine` | function | 18280 |
| `socialOpponentLine` | function | 18276 |
| `socialPlayerFocusLine` | function | 18263 |
| `socialSentence` | function | 18253 |
| `socialVideoJobsForMatchday` | function | 19811 |
| `specialTeamsStateFromActive` | function | 4230 |
| `stageSeasonDataPreview` | function | 6449 |
| `stageSeasonDataPreviewFromFile` | function | 6501 |
| `stageSeasonDataPreviewFromPaste` | function | 6515 |
| `startApp` | window | 8419 |
| `startEinsatzCenterDraftMode` | window | 7564 |
| `startHallOfFameIntro` | function | 8542 |
| `sumRoleGames` | function | 9427 |
| `switchMatchdaySeason` | window | 22476 |
| `switchOverviewSeason` | window | 22423 |
| `syncHashFromState` | function | 3382 |
| `t2s` | const-arrow | 2931 |
| `toggleAntiSynergyHideSgOnly` | window | 2385 |
| `toggleAntiSynergyShowAll` | window | 2384 |
| `toggleComparisonPicker` | window | 13193 |
| `toggleComparisonSgOnly` | window | 13178 |
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
| `toggleToolMenu` | window | 23323 |
| `toolMenuElements` | function | 23298 |
| `toolMenuItemElements` | function | 23301 |
| `toolMenuOnClick` | function | 23359 |
| `toolMenuOnKeydown` | function | 23335 |
| `toPublicPlayerRegistry` | function | 3928 |
| `uiDatenstandBand` | function | 22175 |
| `uiDeltaIndicator` | function | 21940 |
| `uiFormatNumber` | function | 21912 |
| `uiHinweisKarte` | function | 22004 |
| `uiInfoIcon` | function | 21958 |
| `uiIntervallBalken` | function | 22080 |
| `uiKennzahlKachel` | function | 21970 |
| `uiKernaussage` | function | 21990 |
| `uiMethodenbox` | function | 22099 |
| `uiNotiz` | function | 22116 |
| `uiObjektseite` | function | 22264 |
| `uiObjektseiteSortTabs` | function | 22246 |
| `uiPlatzhalter` | function | 22196 |
| `uiQuoteText` | function | 22152 |
| `uiRangliste` | function | 22026 |
| `uiReliabilityDots` | function | 21925 |
| `uiVerlauf` | function | 22054 |
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

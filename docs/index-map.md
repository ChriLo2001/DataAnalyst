# Code-Karte: index.html

<!-- index-map: source-sha256=db8f10488272ed3b8521a0dcec28db453a1a57a6ef701f3111b7f1a11ad7e570 source-lines=23670 -->

Automatisch erzeugt von `scripts/build-index-map.mjs`. Nicht von Hand bearbeiten — bei Änderungen an index.html erneut ausführen: `node scripts/build-index-map.mjs --write`. Vor gezieltem Lesen prüfen, ob die Karte noch aktuell ist: `node scripts/build-index-map.mjs --check`.

index.html: 23670 Zeilen gesamt (SHA-256 `db8f10488272ed3b8521a0dcec28db453a1a57a6ef701f3111b7f1a11ad7e570`). Statischer `<style>`-Block: Zeile 11–1550. Haupt-`<script>`-Block: Zeile 1664–23666.

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
| `buildSpecialTeamsForGame` | function | 4321–4517 | 197 |
| `addGoalieGameToStats` | function | 4577–4627 | 51 |
| `buildGoalieGameRecord` | function | 4629–4680 | 52 |
| `buildGoalieStatsForSeason` | function | 4682–4761 | 80 |
| `aggregateGoalieAlltimeStats` | function | 4763–4801 | 39 |
| `getAssistDiagnostics` | function | 4828–4880 | 53 |
| `buildPlayerEvents` | function | 5011–5106 | 96 |
| `computeMetrics` | function | 5126–5259 | 134 |
| `buildSoloDuoProfile` | function | 5281–5324 | 44 |
| `identityInputs` | function | 5415–5472 | 58 |
| `buildIdentityProfiles` | function | 5516–5747 | 232 |
| `assignStatus` | function | 5794–5979 | 186 |
| `fetchTextWithDiagnostics` | function | 6014–6043 | 30 |
| `fetchSeasonGameRaw` | function | 6079–6118 | 40 |
| `validateGameStructure` | function | 6306–6345 | 40 |
| `buildDryRunReport` | function | 6412–6474 | 63 |
| `stageSeasonDataPreview` | function | 6545–6596 | 52 |
| `rSeasonDataPreviewCard` | function | 6649–6684 | 36 |
| `computeEinsatzCenterStats` | function | 6878–6908 | 31 |
| `rEinsatzCenterStats` | function | 6915–6933 | 19 |
| `einsatzCenterDeserializeAutosave` | function | 7136–7169 | 34 |
| `rEinsatzCenterGroupEditor` | function | 7479–7509 | 31 |
| `rEinsatzCenterRosterSuggestionCard` | function | 7526–7556 | 31 |
| `rEinsatzCenterGameEditor` | function | 7557–7609 | 53 |
| `rEinsatzCenterEditPage` | function | 7610–7657 | 48 |
| `loadSeasonData` | function | 7905–8374 | 470 |
| `loadSeasonForGlobal` | function | 8414–8444 | 31 |
| `loadSeason` | function | 8462–8513 | 52 |
| `ensureHallOfFameIntroOverlay` | function | 8541–8573 | 33 |
| `rSeasonProfileKpis` | function | 8942–8970 | 29 |
| `rMatrix` | function | 8986–9030 | 45 |
| `rRadar` | function | 9063–9110 | 48 |
| `rClutch` | function | 9113–9145 | 33 |
| `rTimeline` | function | 9148–9256 | 109 |
| `rOppBreakdown` | function | 9278–9310 | 33 |
| `generatePlayerInsights` | function | 9313–9356 | 44 |
| `rInsights` | function | 9374–9425 | 52 |
| `buildGoalieAnalysisModel` | function | 9699–9857 | 159 |
| `buildGoalieRoleProfile` | function | 9925–9998 | 74 |
| `rGoalieInsights` | function | 10138–10159 | 22 |
| `rGoalieStability` | function | 10193–10221 | 29 |
| `buildOpponentIntelligence` | function | 10602–10655 | 54 |
| `buildBestThirdManOptions` | function | 10805–10838 | 34 |
| `getDuoDirectScorerGameCounts` | function | 10839–10870 | 32 |
| `buildAnnotatedGoalEventsForGame` | function | 10920–11033 | 114 |
| `buildResponseGoalStatsRaw` | function | 11076–11124 | 49 |
| `buildMomentumSwingStatsRaw` | function | 11137–11207 | 71 |
| `buildDuoFloorCeiling` | function | 11214–11255 | 42 |
| `buildDuoWithWithoutImpact` | function | 11351–11384 | 34 |
| `buildDuoCompatibility` | function | 11450–11472 | 23 |
| `buildDuoProAnalysis` | function | 11509–11552 | 44 |
| `rDuoCenterPro` | function | 11553–11672 | 120 |
| `rInteractiveDuoCenterPro` | function | 11747–11802 | 56 |
| `getDifficultConnectionRowsForPlayer` | function | 11806–11850 | 45 |
| `getRosterImpactPlayerGames` | function | 11943–11984 | 42 |
| `buildRosterImpactAnalysis` | function | 12018–12086 | 69 |
| `rDifficultConnectionList` | function | 12163–12187 | 25 |
| `rDifficultConnectionListCompactLegacy` | function | 12188–12229 | 42 |
| `rDifficultConnectionListCompact` | function | 12230–12268 | 39 |
| `rDifficultConnectionsCard` | function | 12269–12305 | 37 |
| `RESPONSE_MOMENTUM_TOOLTIPS` | const-data | 12308–12339 | 32 |
| `rResponseMomentumOverviewCard` | function | 12402–12425 | 24 |
| `rMatchcenterResponseMomentum` | function | 12472–12509 | 38 |
| `getTeamAllTimeRecords` | function | 12511–12551 | 41 |
| `getAllTimeIdentityStandings` | function | 12632–12666 | 35 |
| `buildRecencyWeightedGlobalIdentityProfile` | function | 12668–12715 | 48 |
| `rHallOfFameHero` | function | 12771–12796 | 26 |
| `hallGoalieRowFromStats` | function | 12894–12926 | 33 |
| `rHallGoalieRankCard` | function | 12979–13010 | 32 |
| `rHallGoalieAwardCards` | function | 13060–13080 | 21 |
| `rHallGoalieLegends` | function | 13081–13113 | 33 |
| `buildDuoComparison` | function | 13508–13527 | 20 |
| `rDuoCompareSummaryCards` | function | 13533–13563 | 31 |
| `rDuoComparisonPage` | function | 13664–13674 | 11 |
| `buildComparisonExtraMetrics` | function | 13719–13776 | 58 |
| `buildGoalieComparisonDataset` | function | 13813–13863 | 51 |
| `buildComparisonDataset` | function | 13864–13899 | 36 |
| `rKpiMirrorRows` | function | 13939–13998 | 60 |
| `rKpiRadar` | function | 14010–14044 | 35 |
| `rKpiTrendCompare` | function | 14091–14157 | 67 |
| `rKpiOpponentStrength` | function | 14158–14185 | 28 |
| `rKpiInfoCards` | function | 14196–14227 | 32 |
| `buildComparisonSummary` | function | 14228–14259 | 32 |
| `rComparisonStyles` | function | 14297–14334 | 38 |
| `rComparisonCenterPage` | function | 14335–14385 | 51 |
| `rGlobalDnaBars` | function | 14426–14455 | 30 |
| `buildSeasonPlayerDashModel` | function | 14525–14561 | 37 |
| `buildAlltimePlayerDashModel` | function | 14562–14604 | 43 |
| `rPlayerDashStyles` | function | 14605–14616 | 12 |
| `rPlayerDash` | function | 14623–14661 | 39 |
| `rGlobalOverview` | function | 14720–14771 | 52 |
| `rGlobalDevelopment` | function | 14791–14829 | 39 |
| `rGlobalDuoNetwork` | function | 14891–15088 | 198 |
| `rGlobalOpponentSpecialist` | function | 15090–15135 | 46 |
| `buildFieldPlayerExplanation` | function | 15201–15275 | 75 |
| `buildGoaliePlayerExplanation` | function | 15276–15329 | 54 |
| `buildPlayerIntelligence` | function | 15339–15368 | 30 |
| `rPlayerExplanation` | function | 15374–15425 | 52 |
| `rAllTimePlayersPage` | function | 15427–15467 | 41 |
| `rHallOfFamePage` | function | 15469–15557 | 89 |
| `rLexiconPage` | function | 15584–15756 | 173 |
| `buildConfidence` | function | 15773–15818 | 46 |
| `getMatchcenterOpponents` | function | 15982–16014 | 33 |
| `getMatchcenterDirectOpponents` | function | 16015–16045 | 31 |
| `matchcenterAnalyzeDirect` | function | 16048–16084 | 37 |
| `matchcenterEnsureUlmPlayer` | function | 16133–16170 | 38 |
| `matchcenterAddUlmScoring` | function | 16195–16235 | 41 |
| `matchcenterFinalizeUlmPlayers` | function | 16236–16304 | 69 |
| `matchcenterBuildUlmPlayerScouting` | function | 16305–16359 | 55 |
| `matchcenterEnsureOpponentDuo` | function | 16377–16409 | 33 |
| `matchcenterFinalizeOpponentDuos` | function | 16436–16470 | 35 |
| `matchcenterBuildOpponentDuos` | function | 16471–16515 | 45 |
| `matchcenterEnsureUlmDuo` | function | 16530–16567 | 38 |
| `matchcenterFinalizeUlmDuos` | function | 16587–16622 | 36 |
| `matchcenterBuildUlmDuos` | function | 16623–16665 | 43 |
| `matchcenterBuildSpecialTeamsMatchup` | function | 16699–16746 | 48 |
| `matchcenterBuildGoalieMatchup` | function | 16769–16814 | 46 |
| `matchcenterTimingStatsForGames` | function | 16846–16883 | 38 |
| `rMatchcenterUlmScouting` | function | 17227–17263 | 37 |
| `rMatchcenterOpponentScouting` | function | 17264–17299 | 36 |
| `rMatchcenterUlmDuos` | function | 17408–17450 | 43 |
| `rMatchcenterOpponentDuos` | function | 17451–17493 | 43 |
| `rMatchcenterSpecialTeams` | function | 17506–17555 | 50 |
| `matchcenterBuildPlanConfidence` | function | 17646–17693 | 48 |
| `matchcenterBuildIntelligenceDataQuality` | function | 17742–17811 | 70 |
| `matchcenterBuildOpponentDNA` | function | 17812–17924 | 113 |
| `matchcenterBuildOpponentAlarm` | function | 17991–18100 | 110 |
| `matchcenterBuildIntelligenceSignals` | function | 18147–18193 | 47 |
| `buildMatchIntelligenceFromContext` | function | 18194–18248 | 55 |
| `buildMatchStories` | function | 18297–18326 | 30 |
| `buildDigitalCoachReport` | function | 18397–18429 | 33 |
| `buildMatchdayCaptionBlocks` | function | 18501–18530 | 30 |
| `buildSocialMediaContent` | function | 18531–18579 | 49 |
| `lineupRosterGamesForPlayer` | function | 18647–18694 | 48 |
| `buildLineupExperienceProfile` | function | 18695–18737 | 43 |
| `buildLineupOpponentDNAFit` | function | 18750–18793 | 44 |
| `classifyLineIdentity` | function | 18794–18841 | 48 |
| `lineupPlayerProfile` | function | 18842–18917 | 76 |
| `buildLineupAnalysis` | function | 18918–19051 | 134 |
| `buildLineupScoreBreakdowns` | function | 19052–19081 | 30 |
| `lineupEvaluateComplementCandidate` | function | 19165–19243 | 79 |
| `buildTeamLineBalance` | function | 19269–19312 | 44 |
| `buildLineupRecommendations` | function | 19349–19430 | 82 |
| `matchcenterBuildMatchPlan` | function | 19459–19604 | 146 |
| `rMatchcenterOpponentDNA` | function | 19639–19671 | 33 |
| `rMatchcenterIntelOverview` | function | 19694–19739 | 46 |
| `rMatchcenterDigitalCoach` | function | 19781–19845 | 65 |
| `rMatchcenterLockerRoomSheet` | function | 19863–19918 | 56 |
| `downloadMatchdayStory` | window | 19937–19984 | 48 |
| `rSocialVideoBlock` | function | 19988–20019 | 32 |
| `generateSocialVideoVideos` | window | 20029–20070 | 42 |
| `rMatchcenterSocialMediaCenter` | function | 20121–20174 | 54 |
| `rMatchcenterLineupBuilder` | function | 20206–20278 | 73 |
| `rLineupBuilderAvailablePanel` | function | 20293–20340 | 48 |
| `rLineupRecommendationMode` | function | 20356–20389 | 34 |
| `rLineupTestLine` | function | 20403–20451 | 49 |
| `rLineupBuilderPage` | function | 20469–20503 | 35 |
| `rMatchcenterScoutingSummary` | function | 20504–20547 | 44 |
| `getTeamLogoUrlForStory` | function | 20592–20621 | 30 |
| `matchcenterStoryPickFactItems` | function | 20744–20796 | 53 |
| `buildMatchcenterStoryPreviewData` | function | 21015–21126 | 112 |
| `matchcenterStoryVisibleFacts` | function | 21133–21163 | 31 |
| `rMatchcenterStoryPreview` | function | 21182–21251 | 70 |
| `fitMatchcenterStoryLayout` | function | 21258–21300 | 43 |
| `rMatchcenterPage` | function | 21379–21527 | 149 |
| `rTeamPage` | function | 21550–21890 | 341 |
| `exportExcel` | function | 21895–21920 | 26 |
| `_render` | function | 21944–22113 | 170 |
| `uiObjektseite` | function | 22499–22532 | 34 |
| `rMatchdayDetailPage` | function | 22800–22839 | 40 |
| `buildOverviewCards` | function | 23121–23161 | 41 |

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

1048 `function`-Deklarationen, 134 `window.`-Funktionszuweisungen, 4 `const`-Pfeilfunktionen — alle Top-Level, sortiert nach Zeile.

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
| `isMatchPenaltyEvent` | function | 4205–4208 | 4 |
| `isTwoPlusTwoPenaltyEvent` | function | 4209–4212 | 4 |
| `getPenaltyDisciplineType` | function | 4213–4220 | 8 |
| `getGameDurationMinutes` | function | 4221–4225 | 5 |
| `gameDaySortValue` | function | 4226–4233 | 8 |
| `isSameUlmTeamContext` | function | 4234–4241 | 8 |
| `getFurtherSameDayUlmGames` | function | 4242–4253 | 12 |
| `getPenaltySpecialTeamsMinutes` | function | 4254–4256 | 3 |
| `getPenaltyBasePersonalMinutes` | function | 4257–4264 | 8 |
| `getPenaltyPersonalMinutes` | function | 4265–4274 | 10 |
| `getPenaltyDisciplineMinutes` | function | 4275–4277 | 3 |
| `getSpecialTeamsPenaltyChunks` | function | 4278–4287 | 10 |
| `isPenaltyGoalEvent` | function | 4288–4292 | 5 |
| `isOwnGoalEvent` | function | 4295–4298 | 4 |
| `specialTeamsStateFromActive` | function | 4299–4305 | 7 |
| `annotateSpecialTeamsGoalEvent` | function | 4306–4320 | 15 |
| `buildSpecialTeamsForGame` | function | 4321–4517 | 197 |
| `buildSpecialTeamsForSeason` | function | 4518–4526 | 9 |
| `aggregateAlltimeSpecialTeams` | function | 4527–4534 | 8 |
| `mergeGoalieSpecialTeamsStats` | function | 4535–4546 | 12 |
| `addGoalieSpecialTeamsGameToStats` | function | 4547–4561 | 15 |
| `finalizeGoalieSeasonStats` | function | 4562–4576 | 15 |
| `addGoalieGameToStats` | function | 4577–4627 | 51 |
| `buildGoalieGameRecord` | function | 4629–4680 | 52 |
| `buildGoalieStatsForSeason` | function | 4682–4761 | 80 |
| `aggregateGoalieAlltimeStats` | function | 4763–4801 | 39 |
| `updatePlayerRoleAvailability` | function | 4803–4812 | 10 |
| `getGoalieDiagnostics` | function | 4814–4819 | 6 |
| `getSpecialTeamsDiagnostics` | function | 4821–4826 | 6 |
| `getAssistDiagnostics` | function | 4828–4880 | 53 |
| `buildSeasonDuos` | function | 4883–4909 | 27 |
| `mergeDuoSet` | function | 4910–4926 | 17 |
| `aggregateAllTimeDuos` | function | 4927–4937 | 11 |
| `aggregateSeasonStats` | function | 4939–4954 | 16 |
| `buildPlayerDataFoundation` | function | 4956–4978 | 23 |
| `buildRegistry` | function | 4980–5006 | 27 |
| `buildPlayerEvents` | function | 5011–5106 | 96 |
| `getPhaseIndex` | function | 5111–5121 | 11 |
| `computeMetrics` | function | 5126–5259 | 134 |
| `detectTypes` | function | 5261–5276 | 16 |
| `pct` | function | 5278–5278 | 1 |
| `ratio01` | function | 5279–5279 | 1 |
| `relative01` | function | 5280–5280 | 1 |
| `buildSoloDuoProfile` | function | 5281–5324 | 44 |
| `identityPartnerStats` | function | 5325–5338 | 14 |
| `identityOpponentGroups` | function | 5339–5346 | 8 |
| `eventMatchesTeams` | function | 5347–5352 | 6 |
| `clutchText` | function | 5353–5353 | 1 |
| `isImportantClutchGoal` | function | 5354–5358 | 5 |
| `isDecisiveGoal` | function | 5359–5361 | 3 |
| `isLateGoal` | function | 5367–5372 | 6 |
| `isComebackRelevantGoal` | function | 5373–5376 | 4 |
| `identityPointsVsTeams` | function | 5377–5379 | 3 |
| `identityGoalsVsTeams` | function | 5380–5382 | 3 |
| `identityClutchGoalsVsTeams` | function | 5383–5385 | 3 |
| `identityDecisiveGoalsVsTeams` | function | 5386–5388 | 3 |
| `identityLateGoalsVsTeams` | function | 5389–5391 | 3 |
| `countMomentumClusters` | function | 5392–5414 | 23 |
| `identityInputs` | function | 5415–5472 | 58 |
| `clearlyAboveAverage` | function | 5473–5473 | 1 |
| `normalizeSecondaryTraits` | function | 5474–5485 | 12 |
| `seasonRoleTraitsFromClassic` | function | 5486–5490 | 5 |
| `seasonRoleKeysForPlayer` | function | 5491–5499 | 9 |
| `hasSeasonRole` | function | 5500–5502 | 3 |
| `selectEnforcerKeys` | function | 5503–5515 | 13 |
| `buildIdentityProfiles` | function | 5516–5747 | 232 |
| `composeIdentityText` | function | 5748–5754 | 7 |
| `countCaptainAppearances` | function | 5756–5768 | 13 |
| `countGoalieAppearances` | function | 5770–5772 | 3 |
| `computeRosterStatus` | function | 5774–5792 | 19 |
| `assignStatus` | function | 5794–5979 | 186 |
| `fetchJsonLegacy` | function | 5985–6004 | 20 |
| `responseExcerpt` | function | 6006–6008 | 3 |
| `diagnosticError` | function | 6009–6013 | 5 |
| `fetchTextWithDiagnostics` | function | 6014–6043 | 30 |
| `fetchJsonWithDiagnostics` | function | 6044–6052 | 9 |
| `fetchJson` | function | 6053–6056 | 4 |
| `formatStatus` | function | 6057–6059 | 3 |
| `formatDiagnosticAttempt` | function | 6060–6072 | 13 |
| `formatGameLoadError` | function | 6073–6078 | 6 |
| `fetchSeasonGameRaw` | function | 6079–6118 | 40 |
| `getStaticSeasonGames` | function | 6122–6125 | 4 |
| `loadSeasonManifest` | function | 6137–6153 | 17 |
| `resolveCurrentSeasonKey` | function | 6168–6187 | 20 |
| `applyCurrentSeasonCoverHighlight` | function | 6188–6192 | 5 |
| `isUsableExternalSeasonData` | function | 6205–6213 | 9 |
| `ensureExternalSeasonData` | function | 6214–6235 | 22 |
| `buildStaticSeasonDataBlock` | function | 6236–6245 | 10 |
| `getGameId` | function | 6272–6276 | 5 |
| `findDuplicateGameIds` | function | 6278–6288 | 11 |
| `validateGameStructure` | function | 6306–6345 | 40 |
| `validateSeasonGames` | function | 6347–6357 | 11 |
| `diffGameIds` | function | 6359–6368 | 10 |
| `validateSeasonKey` | function | 6370–6380 | 11 |
| `validateWrapperFormat` | function | 6382–6391 | 10 |
| `validateMergedSeason` | function | 6393–6410 | 18 |
| `buildDryRunReport` | function | 6412–6474 | 63 |
| `seasonDataPreviewRerender` | function | 6495–6497 | 3 |
| `seasonDataPreviewRow` | function | 6499–6510 | 12 |
| `buildSeasonDataPreviewChanges` | function | 6517–6534 | 18 |
| `stageSeasonDataPreview` | function | 6545–6596 | 52 |
| `stageSeasonDataPreviewFromFile` | function | 6597–6610 | 14 |
| `stageSeasonDataPreviewFromPaste` | function | 6611–6615 | 5 |
| `discardSeasonDataPreview` | function | 6616–6620 | 5 |
| `getSeasonDataPreview` | function | 6622–6624 | 3 |
| `isSeasonDataPreviewStale` | function | 6630–6634 | 5 |
| `rSeasonDataPreviewStatus` | function | 6636–6638 | 3 |
| `rSeasonDataPreviewRows` | function | 6639–6647 | 9 |
| `rSeasonDataPreviewCard` | function | 6649–6684 | 36 |
| `setSeasonDataPreviewOpen` | window | 6685–6685 | 1 |
| `setSeasonDataPreviewPasteText` | window | 6686–6686 | 1 |
| `fileNameForLineupSeasonKey` | function | 6706–6708 | 3 |
| `ensureLineupDataLoaded` | function | 6724–6740 | 17 |
| `ensureLineupGroupsRegistryLoaded` | function | 6749–6765 | 17 |
| `resolveLineupPlayerName` | function | 6777–6780 | 4 |
| `findLineupGameContext` | function | 6783–6790 | 8 |
| `rEinsatzCenterGroup` | function | 6792–6803 | 12 |
| `rEinsatzCenterCombo` | function | 6805–6812 | 8 |
| `rEinsatzCenterGameCard` | function | 6814–6831 | 18 |
| `rEinsatzCenterPage` | function | 6833–6852 | 20 |
| `setEinsatzCenterSeason` | window | 6854–6859 | 6 |
| `openEinsatzCenter` | window | 6860–6867 | 8 |
| `computeEinsatzCenterStats` | function | 6878–6908 | 31 |
| `lineupGroupDisplayName` | function | 6909–6914 | 6 |
| `rEinsatzCenterStats` | function | 6915–6933 | 19 |
| `getEffectiveLineupData` | function | 6991–6998 | 8 |
| `isEinsatzCenterGameFromDraft` | function | 7000–7003 | 4 |
| `einsatzCenterDraftInView` | function | 7005–7008 | 4 |
| `rEinsatzCenterDraftMark` | function | 7009–7012 | 4 |
| `rEinsatzCenterDraftStatsHint` | function | 7013–7017 | 5 |
| `einsatzCenterDraftStaleHint` | function | 7019–7021 | 3 |
| `rEinsatzCenterDraftBanner` | function | 7023–7030 | 8 |
| `ensureEinsatzCenterDraft` | function | 7041–7054 | 14 |
| `getEinsatzCenterGameDraft` | function | 7063–7074 | 12 |
| `einsatzCenterAutosaveKey` | function | 7101–7101 | 1 |
| `einsatzCenterStorageRead` | function | 7102–7104 | 3 |
| `einsatzCenterStorageWrite` | function | 7105–7107 | 3 |
| `einsatzCenterStorageRemove` | function | 7108–7110 | 3 |
| `einsatzCenterDraftIsEmpty` | function | 7113–7115 | 3 |
| `einsatzCenterSerializeDraft` | function | 7117–7129 | 13 |
| `einsatzCenterIsPlainObject` | function | 7130–7130 | 1 |
| `einsatzCenterDeserializeAutosave` | function | 7136–7169 | 34 |
| `einsatzCenterCurrentRawBaseHash` | function | 7176–7181 | 6 |
| `einsatzCenterAutosaveDraft` | function | 7190–7217 | 28 |
| `einsatzCenterInspectAutosave` | function | 7225–7253 | 29 |
| `restoreEinsatzCenterAutosave` | function | 7256–7272 | 17 |
| `discardEinsatzCenterAutosave` | function | 7274–7279 | 6 |
| `rEinsatzCenterAutosaveBanner` | function | 7282–7294 | 13 |
| `einsatzCenterAutosaveInfoText` | function | 7296–7306 | 11 |
| `loadEinsatzCenterMismatchedAutosave` | function | 7320–7338 | 19 |
| `deriveLineupValidPlayerIds` | function | 7351–7367 | 17 |
| `deriveLineupUlmPlayerIds` | function | 7375–7391 | 17 |
| `getSeasonmanagerRosterSuggestion` | function | 7405–7425 | 21 |
| `einsatzCenterCanonicalJson` | function | 7434–7443 | 10 |
| `einsatzCenterSha256Hex` | function | 7444–7448 | 5 |
| `einsatzCenterComputeBaseHash` | function | 7449–7451 | 3 |
| `einsatzCenterSoftIssues` | function | 7458–7476 | 19 |
| `rEinsatzCenterGroupEditor` | function | 7479–7509 | 31 |
| `rEinsatzCenterComboEditor` | function | 7510–7516 | 7 |
| `rEinsatzCenterRosterSuggestionCard` | function | 7526–7556 | 31 |
| `rEinsatzCenterGameEditor` | function | 7557–7609 | 53 |
| `rEinsatzCenterEditPage` | function | 7610–7657 | 48 |
| `startEinsatzCenterDraftMode` | window | 7660–7664 | 5 |
| `cancelEinsatzCenterEdit` | window | 7665–7675 | 11 |
| `viewEinsatzCenterMergedView` | window | 7677–7677 | 1 |
| `returnToEinsatzCenterEdit` | window | 7678–7678 | 1 |
| `setEinsatzCenterIncludeDraft` | window | 7679–7679 | 1 |
| `selectEinsatzCenterEditGame` | window | 7680–7683 | 4 |
| `addEinsatzCenterRosterPlayer` | window | 7684–7691 | 8 |
| `removeEinsatzCenterRosterPlayer` | window | 7692–7699 | 8 |
| `toggleEinsatzCenterRosterSuggestionPlayer` | window | 7700–7706 | 7 |
| `dismissEinsatzCenterRosterSuggestion` | window | 7707–7710 | 4 |
| `acceptEinsatzCenterRosterSuggestion` | window | 7718–7734 | 17 |
| `addEinsatzCenterExistingGroup` | window | 7735–7743 | 9 |
| `addEinsatzCenterNewGroup` | window | 7744–7760 | 17 |
| `removeEinsatzCenterGroup` | window | 7761–7768 | 8 |
| `toggleEinsatzCenterGroupRename` | window | 7769–7771 | 3 |
| `renameEinsatzCenterGroup` | window | 7783–7802 | 20 |
| `addEinsatzCenterGroupPlayer` | window | 7803–7810 | 8 |
| `removeEinsatzCenterGroupPlayer` | window | 7811–7818 | 8 |
| `setEinsatzCenterGroupPlayerPosition` | window | 7819–7827 | 9 |
| `toggleEinsatzCenterComboPlayer` | window | 7828–7835 | 8 |
| `confirmEinsatzCenterCombo` | window | 7836–7846 | 11 |
| `removeEinsatzCenterCombo` | window | 7847–7853 | 7 |
| `setEinsatzCenterGameNote` | window | 7854–7860 | 7 |
| `buildEinsatzCenterDraftExport` | function | 7864–7877 | 14 |
| `exportEinsatzCenterDraft` | window | 7878–7890 | 13 |
| `loadSeasonData` | function | 7905–8374 | 470 |
| `showMainShell` | function | 8377–8381 | 5 |
| `hasSeasonSource` | function | 8382–8385 | 4 |
| `hasEmbeddedSeasonData` | function | 8386–8388 | 3 |
| `getGlobalLoadableSeasonKeys` | function | 8389–8395 | 7 |
| `getAllTimeCoverStats` | function | 8396–8403 | 8 |
| `updateCoverAllTimeStats` | function | 8404–8412 | 9 |
| `loadSeasonForGlobal` | function | 8414–8444 | 31 |
| `ensureGlobalDataLoaded` | function | 8445–8460 | 16 |
| `loadSeason` | function | 8462–8513 | 52 |
| `startApp` | window | 8515–8526 | 12 |
| `ensureAppLoaded` | function | 8517–8526 | 10 |
| `openSeason` | window | 8527–8529 | 3 |
| `openAllTimePlayers` | window | 8530–8535 | 6 |
| `hofIntroDelay` | function | 8538–8540 | 3 |
| `ensureHallOfFameIntroOverlay` | function | 8541–8573 | 33 |
| `buildHallOfFameIntroTitle` | function | 8574–8584 | 11 |
| `seedHallOfFameIntroParticles` | function | 8585–8602 | 18 |
| `cleanupHallOfFameIntro` | function | 8603–8617 | 15 |
| `restoreHallOfFameIntroPrevious` | function | 8618–8629 | 12 |
| `finishHallOfFameIntro` | function | 8630–8637 | 8 |
| `startHallOfFameIntro` | function | 8638–8662 | 25 |
| `cancelHallOfFameIntro` | function | 8663–8674 | 12 |
| `openHallOfFame` | window | 8676–8699 | 24 |
| `openComparisonCenter` | window | 8700–8728 | 29 |
| `openMatchcenter` | window | 8729–8750 | 22 |
| `openLineupBuilder` | window | 8751–8768 | 18 |
| `setMatchcenterOpponent` | window | 8769–8769 | 1 |
| `setMatchcenterContext` | window | 8770–8770 | 1 |
| `setMatchcenterSeason` | window | 8771–8771 | 1 |
| `toggleMatchcenterGames` | window | 8772–8772 | 1 |
| `openLexicon` | window | 8773–8776 | 4 |
| `rRes` | const-arrow | 8781–8781 | 1 |
| `rClutchBadge` | function | 8782–8789 | 8 |
| `escAttr` | function | 8790–8792 | 3 |
| `roleTraitLabel` | function | 8793–8795 | 3 |
| `isVisibleSecondaryTrait` | function | 8796–8799 | 4 |
| `rRoleTraitTip` | function | 8800–8804 | 5 |
| `rStyleMetricTip` | function | 8805–8808 | 4 |
| `rRosterStatusBadge` | function | 8809–8816 | 8 |
| `classicTagLabel` | function | 8817–8819 | 3 |
| `rClassicTagTip` | function | 8820–8824 | 5 |
| `fallbackIdentityProfile` | function | 8825–8835 | 11 |
| `rIdentityTags` | function | 8836–8844 | 9 |
| `rStyleProfileBars` | function | 8845–8855 | 11 |
| `rIdentityCards` | function | 8856–8881 | 26 |
| `rClassicRoleTags` | function | 8882–8889 | 8 |
| `renderTags` | function | 8890–8892 | 3 |
| `getSeasonPlayerFieldBasis` | function | 8894–8921 | 28 |
| `getSeasonScopedIdentityProfile` | function | 8925–8941 | 17 |
| `rSeasonProfileKpis` | function | 8942–8970 | 29 |
| `rSeasonProfileTagStrip` | function | 8972–8983 | 12 |
| `rMatrix` | function | 8986–9030 | 45 |
| `rSeasonDuoSummary` | function | 9033–9041 | 9 |
| `rPhases` | function | 9043–9060 | 18 |
| `rRadar` | function | 9063–9110 | 48 |
| `rClutch` | function | 9113–9145 | 33 |
| `rTimeline` | function | 9148–9256 | 109 |
| `rPenalties` | function | 9259–9275 | 17 |
| `rOppBreakdown` | function | 9278–9310 | 33 |
| `generatePlayerInsights` | function | 9313–9356 | 44 |
| `rSeasonInsightsTab` | function | 9359–9372 | 14 |
| `rInsights` | function | 9374–9425 | 52 |
| `rTable` | function | 9428–9451 | 24 |
| `findLoadedSeasonPlayer` | function | 9454–9462 | 9 |
| `getAllTimePlayerRows` | function | 9463–9478 | 16 |
| `isSgOnlyAlltimePlayer` | function | 9479–9486 | 8 |
| `isPureSGPlayer` | function | 9487–9490 | 4 |
| `filterPureSGPlayers` | function | 9491–9494 | 4 |
| `getAllTimeMainPlayerRows` | function | 9495–9497 | 3 |
| `getAllTimeSgOnlyRows` | function | 9498–9500 | 3 |
| `getPlayerSeasonStats` | function | 9501–9505 | 5 |
| `getPlayerAlltimeStats` | function | 9506–9513 | 8 |
| `getPlayerRegistryProfile` | function | 9514–9521 | 8 |
| `getPlayerGoalieSeasonStats` | function | 9522–9526 | 5 |
| `getPlayerGoalieAlltimeStats` | function | 9527–9550 | 24 |
| `sumRoleGames` | function | 9551–9556 | 6 |
| `getPlayerRoleAvailability` | function | 9557–9574 | 18 |
| `resolvePlayerRoleView` | function | 9575–9582 | 8 |
| `rPlayerRoleSwitch` | function | 9583–9589 | 7 |
| `goalieNum` | function | 9590–9595 | 6 |
| `goalieTime` | function | 9596–9603 | 8 |
| `goalieBucketRows` | function | 9604–9609 | 6 |
| `goalieTopRow` | function | 9610–9612 | 3 |
| `goalieTierMeta` | function | 9613–9621 | 9 |
| `goalieStdDev` | function | 9622–9627 | 6 |
| `goalieDetailFirstTime` | function | 9628–9634 | 7 |
| `goalieEventSecondInPeriod` | function | 9635–9640 | 6 |
| `goaliePctText` | function | 9641–9644 | 4 |
| `goalieSafeNum` | function | 9645–9648 | 4 |
| `goalieClampScore` | function | 9649–9652 | 4 |
| `goalieInverseScore` | function | 9653–9660 | 8 |
| `goaliePositiveScore` | function | 9661–9668 | 8 |
| `goaliePositiveCurveScore` | function | 9669–9677 | 9 |
| `goalieWeightedScore` | function | 9678–9683 | 6 |
| `goalieApplySampleConfidence` | function | 9684–9691 | 8 |
| `goalieBucketLooseSum` | function | 9692–9698 | 7 |
| `buildGoalieAnalysisModel` | function | 9699–9857 | 159 |
| `rGoalieBars` | function | 9858–9870 | 13 |
| `goalieDnaKey` | function | 9912–9916 | 5 |
| `goalieDnaValue` | function | 9917–9923 | 7 |
| `goalieStateGoals` | function | 9924–9924 | 1 |
| `buildGoalieRoleProfile` | function | 9925–9998 | 74 |
| `rGoalieRoleTraits` | function | 9999–10002 | 4 |
| `getGoalieDnaRows` | function | 10003–10006 | 4 |
| `rGoalieDnaBars` | function | 10007–10020 | 14 |
| `rGoalieScoringRow` | function | 10021–10041 | 21 |
| `rGoalieKpis` | function | 10042–10058 | 17 |
| `rGoalieMiniMetrics` | function | 10059–10064 | 6 |
| `rGoalieFirstGoalResistance` | function | 10065–10078 | 14 |
| `rGoalieMomentum` | function | 10079–10092 | 14 |
| `rGoalieTierCards` | function | 10093–10120 | 28 |
| `rGoaliePhaseProfile` | function | 10121–10137 | 17 |
| `rGoalieInsights` | function | 10138–10159 | 22 |
| `rGoalieOverview` | function | 10160–10177 | 18 |
| `rGoaliePhases` | function | 10178–10180 | 3 |
| `rGoalieOpponents` | function | 10181–10192 | 12 |
| `rGoalieStability` | function | 10193–10221 | 29 |
| `rGoalieTable` | function | 10222–10229 | 8 |
| `rGoalieAnalysis` | function | 10230–10255 | 26 |
| `getPreviousSeasonKey` | function | 10257–10261 | 5 |
| `playerAppearedInSeasonByName` | function | 10262–10272 | 11 |
| `playerAppearedForUlmStatusInSeasonByName` | function | 10273–10291 | 19 |
| `isRookieCandidateForSeason` | function | 10292–10301 | 10 |
| `getLoadedSeasonPointsByName` | function | 10302–10306 | 5 |
| `seasonHasPureUlmTeam` | function | 10307–10313 | 7 |
| `isSgOnlyHallOfFameExcluded` | function | 10314–10322 | 9 |
| `isHallOfFameEligiblePlayer` | function | 10323–10328 | 6 |
| `getHallOfFamePlayerRows` | function | 10329–10331 | 3 |
| `getHallOfFamePlayerIdSet` | function | 10332–10334 | 3 |
| `getGlobalProfileEvents` | function | 10336–10347 | 12 |
| `countBy` | function | 10349–10357 | 9 |
| `getLoadedSeasonPlayerUi` | function | 10358–10362 | 5 |
| `getGlobalPlayerTeamRecord` | function | 10363–10388 | 26 |
| `getGlobalPlayerPeakGame` | function | 10389–10399 | 11 |
| `getGlobalPlayerBestSeason` | function | 10400–10406 | 7 |
| `getAllTimeDuoRowsForPlayer` | function | 10407–10417 | 11 |
| `getCarryPerformanceRows` | function | 10418–10433 | 16 |
| `rCarryPerformanceRows` | function | 10434–10446 | 13 |
| `getAllTimeGamesPlayedRows` | function | 10447–10471 | 25 |
| `getAllTimePenaltyRows` | function | 10472–10487 | 16 |
| `getSeasonUiPlayerForProfile` | function | 10488–10491 | 4 |
| `getSeasonIdentityProfile` | function | 10492–10496 | 5 |
| `seasonStatNumber` | function | 10497–10500 | 4 |
| `seasonStatSetSize` | function | 10501–10506 | 6 |
| `isActiveAlltimeSeasonStats` | function | 10507–10520 | 14 |
| `getActiveAlltimeSeasonKeys` | function | 10521–10531 | 11 |
| `getAlltimeRecencyWeight` | function | 10532–10537 | 6 |
| `getRosterStatus` | function | 10538–10544 | 7 |
| `getGlobalTopScorerMilestones` | function | 10545–10557 | 13 |
| `getGlobalRookieSeasonKey` | function | 10558–10571 | 14 |
| `getGlobalRookieMilestone` | function | 10572–10582 | 11 |
| `getGlobalPlayerMilestones` | function | 10583–10600 | 18 |
| `buildOpponentIntelligence` | function | 10602–10655 | 54 |
| `rOpponentIntelBars` | function | 10657–10667 | 11 |
| `getAllTimeDuoRows` | function | 10669–10691 | 23 |
| `rDuoRows` | function | 10693–10712 | 20 |
| `getAllLoadedSeasonGames` | function | 10714–10733 | 20 |
| `getRosterEntryRegistryProfile` | function | 10735–10738 | 4 |
| `difficultConnectionConfidence` | function | 10739–10743 | 5 |
| `getDuoRowsForPlayerScope` | function | 10744–10762 | 19 |
| `buildDirectDuoLookupForPlayer` | function | 10763–10780 | 18 |
| `duoScopeSeasonKeys` | function | 10781–10784 | 4 |
| `getDuoScorerCountsWithCandidate` | function | 10785–10804 | 20 |
| `buildBestThirdManOptions` | function | 10805–10838 | 34 |
| `getDuoDirectScorerGameCounts` | function | 10839–10870 | 32 |
| `responseMomentumAbsSeconds` | function | 10875–10877 | 3 |
| `responseMomentumTime` | function | 10878–10884 | 7 |
| `responseMomentumGameRows` | function | 10885–10891 | 7 |
| `responseMomentumSide` | function | 10892–10900 | 9 |
| `responseMomentumActor` | function | 10901–10911 | 11 |
| `responseMomentumGoalActors` | function | 10912–10919 | 8 |
| `buildAnnotatedGoalEventsForGame` | function | 10920–11033 | 114 |
| `responseMomentumConfidence` | function | 11034–11038 | 5 |
| `responseMomentumEmptyState` | function | 11039–11046 | 8 |
| `responseMomentumPairKey` | function | 11047–11049 | 3 |
| `ensureRmPlayer` | function | 11050–11055 | 6 |
| `ensureRmDuo` | function | 11056–11061 | 6 |
| `finalizeResponseStats` | function | 11062–11075 | 14 |
| `buildResponseGoalStatsRaw` | function | 11076–11124 | 49 |
| `buildResponseGoalStats` | function | 11125–11130 | 6 |
| `finalizeMomentumStats` | function | 11131–11136 | 6 |
| `buildMomentumSwingStatsRaw` | function | 11137–11207 | 71 |
| `buildMomentumSwingStats` | function | 11208–11213 | 6 |
| `buildDuoFloorCeiling` | function | 11214–11255 | 42 |
| `buildDuoWarnings` | function | 11256–11274 | 19 |
| `duoProPairKey` | function | 11275–11277 | 3 |
| `duoProContextSeasonKey` | function | 11278–11280 | 3 |
| `getDuoFieldPlayerRows` | function | 11281–11291 | 11 |
| `duoProPlayer` | function | 11292–11296 | 5 |
| `getDuoSharedFieldRows` | function | 11297–11302 | 6 |
| `buildDuoDirectProduction` | function | 11303–11323 | 21 |
| `emptyDuoTeamImpactStats` | function | 11324–11326 | 3 |
| `addDuoTeamGame` | function | 11327–11342 | 16 |
| `finalizeDuoTeamImpactStats` | function | 11343–11350 | 8 |
| `buildDuoWithWithoutImpact` | function | 11351–11384 | 34 |
| `buildDuoOpponentAdjusted` | function | 11385–11397 | 13 |
| `buildDuoNetworkContext` | function | 11398–11421 | 24 |
| `buildDuoGapAnalysis` | function | 11422–11438 | 17 |
| `buildDuoCompatibility` | function | 11450–11472 | 23 |
| `buildDuoUntestedPotential` | function | 11473–11484 | 12 |
| `buildDuoUsageRate` | function | 11485–11496 | 12 |
| `buildDuoReplacementOptions` | function | 11497–11508 | 12 |
| `buildDuoProAnalysis` | function | 11509–11552 | 44 |
| `rDuoCenterPro` | function | 11553–11672 | 120 |
| `duoProDomId` | function | 11673–11675 | 3 |
| `duoProPickerOpen` | function | 11676–11678 | 3 |
| `duoProPickerMessage` | function | 11679–11681 | 3 |
| `setDuoProPickerState` | function | 11682–11691 | 10 |
| `duoProResolveCandidate` | function | 11692–11700 | 9 |
| `duoProSelectionPayload` | function | 11701–11710 | 10 |
| `openDuoProPicker` | window | 11711–11711 | 1 |
| `cancelDuoProPicker` | window | 11712–11712 | 1 |
| `selectDuoProQuick` | window | 11713–11716 | 4 |
| `confirmDuoProSelection` | window | 11717–11731 | 15 |
| `setDuoProSelection` | window | 11732–11739 | 8 |
| `rDuoProPlayerSelect` | function | 11740–11746 | 7 |
| `rInteractiveDuoCenterPro` | function | 11747–11802 | 56 |
| `rSeasonDuoCenterPro` | function | 11803–11805 | 3 |
| `getDifficultConnectionRowsForPlayer` | function | 11806–11850 | 45 |
| `emptyRosterImpactStats` | function | 11851–11853 | 3 |
| `finalizeRosterImpactStats` | function | 11854–11861 | 8 |
| `addRosterImpactGameToStats` | function | 11862–11871 | 10 |
| `getRosterImpactPlayerEventLookup` | function | 11872–11892 | 21 |
| `buildRosterImpactGameIndex` | function | 11905–11930 | 26 |
| `getRosterImpactPlayerGames` | function | 11943–11984 | 42 |
| `rosterImpactConfidence` | function | 11985–11990 | 6 |
| `confidenceFromSampleSize` | function | 11995–11998 | 4 |
| `rosterImpactConfidenceWeight` | function | 11999–12002 | 4 |
| `antiSynergyImpactScore` | function | 12003–12017 | 15 |
| `buildRosterImpactAnalysis` | function | 12018–12086 | 69 |
| `buildDuoAntiSynergy` | function | 12087–12089 | 3 |
| `rAntiSynergyDelta` | function | 12090–12096 | 7 |
| `antiSynergyDeltaClass` | function | 12097–12100 | 4 |
| `antiSynergySigned` | function | 12101–12105 | 5 |
| `rAntiSynergyCompareChip` | function | 12106–12113 | 8 |
| `rAntiSynergyMetricRow` | function | 12114–12122 | 9 |
| `rAntiSynergyWinrateText` | function | 12130–12135 | 6 |
| `rAntiSynergyWinrateRow` | function | 12136–12144 | 9 |
| `rRosterImpactStatLine` | function | 12145–12148 | 4 |
| `antiSynergyPartnerIsSgOnly` | function | 12149–12152 | 4 |
| `rAntiSynergyMainDelta` | function | 12153–12162 | 10 |
| `rDifficultConnectionList` | function | 12163–12187 | 25 |
| `rDifficultConnectionListCompactLegacy` | function | 12188–12229 | 42 |
| `rDifficultConnectionListCompact` | function | 12230–12268 | 39 |
| `rDifficultConnectionsCard` | function | 12269–12305 | 37 |
| `responseMomentumTooltipFor` | function | 12350–12356 | 7 |
| `rmTerm` | function | 12357–12360 | 4 |
| `rResponseRateDisplay` | function | 12366–12372 | 7 |
| `rRmKpi` | function | 12373–12384 | 12 |
| `rAvgResponseTimeNote` | function | 12387–12390 | 4 |
| `rRmTopList` | function | 12391–12401 | 11 |
| `rResponseMomentumOverviewCard` | function | 12402–12425 | 24 |
| `rPlayerResponseMomentumCard` | function | 12426–12444 | 19 |
| `rDuoResponseMomentumCard` | function | 12445–12464 | 20 |
| `rTeamResponseMomentumCard` | function | 12465–12471 | 7 |
| `rMatchcenterResponseMomentum` | function | 12472–12509 | 38 |
| `getTeamAllTimeRecords` | function | 12511–12551 | 41 |
| `getAllTimeOpponentIntelligence` | function | 12553–12559 | 7 |
| `getAllTimeOpponentTopScorers` | function | 12561–12585 | 25 |
| `getHallOfFameStats` | function | 12587–12609 | 23 |
| `rOpponentTopScorerTable` | function | 12611–12630 | 20 |
| `getAllTimeIdentityStandings` | function | 12632–12666 | 35 |
| `buildRecencyWeightedGlobalIdentityProfile` | function | 12668–12715 | 48 |
| `getGlobalIdentityProfile` | function | 12717–12743 | 27 |
| `dedupeIdentityProfileTags` | function | 12745–12756 | 12 |
| `rGlobalProfileTags` | function | 12758–12762 | 5 |
| `escHtml` | function | 12764–12766 | 3 |
| `pctValue` | function | 12767–12770 | 4 |
| `rHallOfFameHero` | function | 12771–12796 | 26 |
| `rHallPodiumList` | function | 12797–12819 | 23 |
| `rHallDuoTemple` | function | 12820–12827 | 8 |
| `hallGoalieNum` | function | 12829–12834 | 6 |
| `hallGoalieTime` | function | 12835–12842 | 8 |
| `hallGoalieSeasonLabel` | function | 12843–12843 | 1 |
| `isHallRowPureSG` | function | 12844–12851 | 8 |
| `rHallSGBadge` | function | 12852–12854 | 3 |
| `hallGoaliePkStats` | function | 12855–12866 | 12 |
| `hallGoalieTopteamStats` | function | 12867–12873 | 7 |
| `hallGoalieSeasonScore` | function | 12874–12893 | 20 |
| `hallGoalieRowFromStats` | function | 12894–12926 | 33 |
| `getHallGoalieData` | function | 12927–12942 | 16 |
| `hallGoalieNameHtml` | function | 12943–12945 | 3 |
| `hallGoalieTooltip` | function | 12960–12963 | 4 |
| `hallGoalieExplainForLabel` | function | 12964–12978 | 15 |
| `rHallGoalieRankCard` | function | 12979–13010 | 32 |
| `noGoalStreakGoaliesForGame` | function | 13026–13033 | 8 |
| `buildHallOfFameLongestNoGoalStreak` | function | 13034–13059 | 26 |
| `rHallGoalieAwardCards` | function | 13060–13080 | 21 |
| `rHallGoalieLegends` | function | 13081–13113 | 33 |
| `getGlobalSeasonStatRows` | function | 13114–13129 | 16 |
| `getAlltimeRank` | function | 13130–13135 | 6 |
| `rAlltimeKpis` | function | 13136–13149 | 14 |
| `rSparkline` | function | 13150–13162 | 13 |
| `comparisonItemKey` | function | 13174–13179 | 6 |
| `normalizeComparisonItem` | function | 13180–13184 | 5 |
| `comparisonJsArg` | function | 13185–13187 | 3 |
| `comparisonNum` | function | 13188–13191 | 4 |
| `comparisonPct` | function | 13192–13195 | 4 |
| `comparisonFmt` | function | 13196–13199 | 4 |
| `comparisonPctFmt` | function | 13200–13202 | 3 |
| `getComparisonPlayerRow` | function | 13203–13205 | 3 |
| `getComparisonSeasonLabel` | function | 13206–13208 | 3 |
| `getComparisonTeamGoalsForSeason` | function | 13209–13220 | 12 |
| `getComparisonAlltimeTeamGoals` | function | 13221–13223 | 3 |
| `getComparisonSeasonEvents` | function | 13224–13228 | 5 |
| `getComparisonChemistryFromEvents` | function | 13229–13233 | 5 |
| `getComparisonClutchFromEvents` | function | 13234–13238 | 5 |
| `getComparisonStyleProfile` | function | 13239–13263 | 25 |
| `getComparisonProfile` | function | 13264–13268 | 5 |
| `getComparisonSeasonTrend` | function | 13269–13294 | 26 |
| `getComparisonAlltimeTrend` | function | 13295–13300 | 6 |
| `getComparisonPlayerOptions` | function | 13302–13316 | 15 |
| `comparisonVariantValue` | function | 13317–13319 | 3 |
| `getComparisonVariantsForPlayer` | function | 13320–13344 | 25 |
| `parseComparisonVariant` | function | 13345–13359 | 15 |
| `getComparisonCurrentSelection` | function | 13360–13370 | 11 |
| `filterComparisonPlayers` | window | 13371–13378 | 8 |
| `selectComparisonPlayer` | window | 13379–13384 | 6 |
| `setComparisonRoleMode` | window | 13385–13389 | 5 |
| `setComparisonVariant` | window | 13390–13393 | 4 |
| `toggleComparisonSgOnly` | window | 13394–13394 | 1 |
| `addComparisonItem` | window | 13395–13402 | 8 |
| `addSelectedComparisonItem` | window | 13403–13408 | 6 |
| `toggleComparisonPicker` | window | 13409–13409 | 1 |
| `removeComparisonItem` | window | 13410–13413 | 4 |
| `clearComparison` | window | 13414–13414 | 1 |
| `runComparison` | window | 13415–13421 | 7 |
| `selectComparisonMode` | window | 13422–13422 | 1 |
| `backToComparisonModeSelect` | window | 13423–13423 | 1 |
| `normalizeDuoComparisonItem` | function | 13424–13427 | 4 |
| `comparisonDuoContext` | function | 13428–13431 | 4 |
| `setComparisonDuoMode` | window | 13432–13432 | 1 |
| `setComparisonDuoSeasonKey` | window | 13433–13433 | 1 |
| `setComparisonDuoSearch` | window | 13434–13434 | 1 |
| `filterPlayerSuggestions` | function | 13435–13446 | 12 |
| `rComparisonDuoSuggestionButtons` | function | 13447–13450 | 4 |
| `renderComparisonDuoSuggestions` | function | 13451–13459 | 9 |
| `filterComparisonDuoSuggestions` | window | 13460–13467 | 8 |
| `selectComparisonDuoSuggestion` | window | 13461–13467 | 7 |
| `handleComparisonDuoSearchKey` | window | 13468–13480 | 13 |
| `setComparisonDuoPlayer` | window | 13481–13486 | 6 |
| `addComparisonDuoFromSelection` | window | 13487–13494 | 8 |
| `addComparisonDuo` | window | 13495–13497 | 3 |
| `removeComparisonDuo` | window | 13498–13501 | 4 |
| `clearComparisonDuos` | window | 13502–13502 | 1 |
| `runDuoComparison` | window | 13503–13507 | 5 |
| `buildDuoComparison` | function | 13508–13527 | 20 |
| `rDuoComparisonBars` | function | 13528–13532 | 5 |
| `rDuoCompareSummaryCards` | function | 13533–13563 | 31 |
| `rDuoComparisonProfile` | function | 13564–13585 | 22 |
| `rDuoComparisonChemistry` | function | 13586–13601 | 16 |
| `rDuoComparisonImpact` | function | 13602–13617 | 16 |
| `rDuoComparisonContext` | function | 13618–13635 | 18 |
| `rDuoComparisonDetails` | function | 13636–13639 | 4 |
| `rDuoComparisonDashboard` | function | 13640–13653 | 14 |
| `rComparisonDuoSearchBox` | function | 13654–13663 | 10 |
| `rDuoComparisonPage` | function | 13664–13674 | 11 |
| `rComparisonModeSelect` | function | 13675–13677 | 3 |
| `getComparisonEventsForItem` | function | 13678–13680 | 3 |
| `getComparisonRosterGamesForSeason` | function | 13681–13697 | 17 |
| `getComparisonRosterGames` | function | 13698–13705 | 8 |
| `comparisonEventGameKey` | function | 13706–13708 | 3 |
| `comparisonEventPhaseLabel` | function | 13709–13712 | 4 |
| `comparisonOpponentStrengthTier` | function | 13713–13718 | 6 |
| `buildComparisonExtraMetrics` | function | 13719–13776 | 58 |
| `getGoalieComparisonAlltimeTrend` | function | 13777–13793 | 17 |
| `getGoalieComparisonSeasonTrend` | function | 13794–13812 | 19 |
| `buildGoalieComparisonDataset` | function | 13813–13863 | 51 |
| `buildComparisonDataset` | function | 13864–13899 | 36 |
| `kpiValueText` | function | 13901–13904 | 4 |
| `kpiDelta` | function | 13905–13910 | 6 |
| `kpiItemColor` | function | 13911–13913 | 3 |
| `rKpiCards` | function | 13914–13924 | 11 |
| `rKpiMirrorRows` | function | 13939–13998 | 60 |
| `kpiRadarValue` | function | 13999–14009 | 11 |
| `rKpiRadar` | function | 14010–14044 | 35 |
| `rKpiShareBars` | function | 14045–14052 | 8 |
| `rKpiMetricCard` | function | 14053–14057 | 5 |
| `rKpiTextMetricCard` | function | 14058–14060 | 3 |
| `rKpiExtendedMetrics` | function | 14061–14075 | 15 |
| `kpiNiceMax` | function | 14076–14081 | 6 |
| `kpiTrendRows` | function | 14082–14090 | 9 |
| `rKpiTrendCompare` | function | 14091–14157 | 67 |
| `rKpiOpponentStrength` | function | 14158–14185 | 28 |
| `kpiBadge` | function | 14186–14188 | 3 |
| `rKpiObjectMini` | function | 14189–14195 | 7 |
| `rKpiInfoCards` | function | 14196–14227 | 32 |
| `buildComparisonSummary` | function | 14228–14259 | 32 |
| `rKPIVergleich` | function | 14260–14273 | 14 |
| `rComparisonMiniOverview` | function | 14274–14277 | 4 |
| `rComparisonRoles` | function | 14278–14285 | 8 |
| `rComparisonDashboard` | function | 14286–14296 | 11 |
| `rComparisonStyles` | function | 14297–14334 | 38 |
| `rComparisonCenterPage` | function | 14335–14385 | 51 |
| `rSeasonTrendRows` | function | 14386–14404 | 19 |
| `getAlltimeAggregatedStyleProfile` | function | 14405–14424 | 20 |
| `rGlobalDnaBars` | function | 14426–14455 | 30 |
| `pdashNum` | function | 14456–14459 | 4 |
| `pdashPct` | function | 14460–14463 | 4 |
| `pdashPhaseLabel` | function | 14464–14467 | 4 |
| `pdashTopCount` | function | 14468–14471 | 4 |
| `pdashBestPhase` | function | 14472–14475 | 4 |
| `pdashTopPartner` | function | 14476–14479 | 4 |
| `pdashTopOpponent` | function | 14480–14483 | 4 |
| `pdashOpponentTier` | function | 14484–14489 | 6 |
| `pdashOpponentStrength` | function | 14490–14509 | 20 |
| `pdashInsight` | function | 14510–14512 | 3 |
| `pdashInsights` | function | 14513–14524 | 12 |
| `buildSeasonPlayerDashModel` | function | 14525–14561 | 37 |
| `buildAlltimePlayerDashModel` | function | 14562–14604 | 43 |
| `rPlayerDashStyles` | function | 14605–14616 | 12 |
| `rPdashLabel` | function | 14617–14619 | 3 |
| `rPdashStat` | function | 14620–14622 | 3 |
| `rPlayerDash` | function | 14623–14661 | 39 |
| `rSeasonPlayerDashboard` | function | 14662–14664 | 3 |
| `rAlltimePlayerDashboard` | function | 14665–14667 | 3 |
| `rGlobalPartnerOpponentPanel` | function | 14668–14681 | 14 |
| `rGlobalCareerHeader` | function | 14682–14702 | 21 |
| `rSeasonLandingPage` | function | 14704–14718 | 15 |
| `rGlobalOverview` | function | 14720–14771 | 52 |
| `rGlobalAllTimeStats` | function | 14773–14789 | 17 |
| `rGlobalDevelopment` | function | 14791–14829 | 39 |
| `getGlobalPlayerOpponentGameRows` | function | 14832–14859 | 28 |
| `getGlobalOpponentSpecialistProfile` | function | 14861–14889 | 29 |
| `rGlobalDuoNetwork` | function | 14891–15088 | 198 |
| `rGlobalOpponentSpecialist` | function | 15090–15135 | 46 |
| `playerExplainConfidence` | function | 15137–15142 | 6 |
| `playerExplainConfidenceLabel` | function | 15143–15145 | 3 |
| `playerExplainAdd` | function | 15146–15150 | 5 |
| `playerExplainStyleSignature` | function | 15151–15162 | 12 |
| `playerExplainRolePhrase` | function | 15163–15171 | 9 |
| `playerExplainHeadline` | function | 15172–15181 | 10 |
| `playerExplainContextSentence` | function | 15182–15200 | 19 |
| `buildFieldPlayerExplanation` | function | 15201–15275 | 75 |
| `buildGoaliePlayerExplanation` | function | 15276–15329 | 54 |
| `buildPlayerExplanation` | function | 15330–15338 | 9 |
| `buildPlayerIntelligence` | function | 15339–15368 | 30 |
| `rPlayerExplainItems` | function | 15369–15373 | 5 |
| `rPlayerExplanation` | function | 15374–15425 | 52 |
| `rAllTimePlayersPage` | function | 15427–15467 | 41 |
| `rHallOfFamePage` | function | 15469–15557 | 89 |
| `lexiconUniqueKeys` | function | 15562–15569 | 8 |
| `lexiconEntry` | function | 15570–15579 | 10 |
| `rLexiconRows` | function | 15580–15583 | 4 |
| `rLexiconPage` | function | 15584–15756 | 173 |
| `clampScore` | function | 15760–15763 | 4 |
| `getScoreLabel` | function | 15764–15772 | 9 |
| `buildConfidence` | function | 15773–15818 | 46 |
| `confidenceCautiousText` | function | 15819–15822 | 4 |
| `explainScore` | function | 15823–15837 | 15 |
| `p1NarrativeKey` | function | 15838–15840 | 3 |
| `scoreNarrative` | function | 15841–15859 | 19 |
| `rankNarratives` | function | 15860–15873 | 14 |
| `getEmptyState` | function | 15874–15885 | 12 |
| `rEmptyState` | function | 15886–15889 | 4 |
| `capSuperlativeLabel` | function | 15897–15899 | 3 |
| `rScoreBreakdown` | function | 15900–15916 | 17 |
| `matchcenterSigned` | function | 15918–15922 | 5 |
| `matchcenterDateLabel` | function | 15924–15928 | 5 |
| `dedupeGamesById` | function | 15940–15948 | 9 |
| `matchcenterIsFreiburgTuebingenTeamName` | function | 15949–15955 | 7 |
| `matchcenterSeasonHasGames` | function | 15959–15961 | 3 |
| `matchcenterDefaultSeasonKey` | function | 15962–15967 | 6 |
| `matchcenterOpponentMode` | function | 15979–15981 | 3 |
| `getMatchcenterOpponents` | function | 15982–16014 | 33 |
| `getMatchcenterDirectOpponents` | function | 16015–16045 | 31 |
| `matchcenterAnalyzeDirect` | function | 16048–16084 | 37 |
| `matchcenterAnalyzeForm` | function | 16085–16110 | 26 |
| `matchcenterEmptyBuckets` | function | 16125–16127 | 3 |
| `matchcenterUlmScoutingConfidence` | function | 16128–16132 | 5 |
| `matchcenterEnsureUlmPlayer` | function | 16133–16170 | 38 |
| `matchcenterRegisterUlmProfileGame` | function | 16171–16176 | 6 |
| `matchcenterUpdateUlmSeasonRow` | function | 16177–16183 | 7 |
| `matchcenterClassifyUlmGoalEvent` | function | 16184–16194 | 11 |
| `matchcenterAddUlmScoring` | function | 16195–16235 | 41 |
| `matchcenterFinalizeUlmPlayers` | function | 16236–16304 | 69 |
| `matchcenterBuildUlmPlayerScouting` | function | 16305–16359 | 55 |
| `matchcenterBuildUlmPlayerInsights` | function | 16360–16372 | 13 |
| `matchcenterDuoPairKey` | function | 16373–16376 | 4 |
| `matchcenterEnsureOpponentDuo` | function | 16377–16409 | 33 |
| `matchcenterDuoDirectionLabel` | function | 16410–16416 | 7 |
| `matchcenterAddDuoConnection` | function | 16417–16435 | 19 |
| `matchcenterFinalizeOpponentDuos` | function | 16436–16470 | 35 |
| `matchcenterBuildOpponentDuos` | function | 16471–16515 | 45 |
| `matchcenterBuildOpponentDuoInsights` | function | 16516–16529 | 14 |
| `matchcenterEnsureUlmDuo` | function | 16530–16567 | 38 |
| `matchcenterAddUlmDuoConnection` | function | 16568–16586 | 19 |
| `matchcenterFinalizeUlmDuos` | function | 16587–16622 | 36 |
| `matchcenterBuildUlmDuos` | function | 16623–16665 | 43 |
| `matchcenterBuildUlmDuoInsights` | function | 16666–16678 | 13 |
| `matchcenterDirectContextGames` | function | 16679–16681 | 3 |
| `matchcenterSpecialTeamsForGame` | function | 16682–16685 | 4 |
| `matchcenterPersonalPenaltyMinutesForSide` | function | 16686–16694 | 9 |
| `matchcenterPct` | function | 16695–16698 | 4 |
| `matchcenterBuildSpecialTeamsMatchup` | function | 16699–16746 | 48 |
| `matchcenterGoalieKey` | function | 16747–16751 | 5 |
| `matchcenterGoalieFitScore` | function | 16752–16768 | 17 |
| `matchcenterBuildGoalieMatchup` | function | 16769–16814 | 46 |
| `matchcenterGoalAbsSeconds` | function | 16817–16821 | 5 |
| `matchcenterTimeValue` | function | 16822–16829 | 8 |
| `matchcenterEmptyTimingStats` | function | 16830–16838 | 9 |
| `matchcenterWindowForSecond` | function | 16839–16845 | 7 |
| `matchcenterTimingStatsForGames` | function | 16846–16883 | 38 |
| `matchcenterBuildTimingInsights` | function | 16884–16894 | 11 |
| `matchcenterBuildTimingAnalysis` | function | 16895–16905 | 11 |
| `rMatchcenterTimeBars` | function | 16906–16919 | 14 |
| `rMatchcenterTimingStatsCard` | function | 16920–16939 | 20 |
| `rMatchcenterTiming` | function | 16940–16963 | 24 |
| `rMatchcenterTabs` | function | 16979–16981 | 3 |
| `rMatchcenterProfileSection` | function | 16982–17001 | 20 |
| `rMatchcenterFormSection` | function | 17002–17027 | 26 |
| `rMatchcenterDetailsSection` | function | 17028–17035 | 8 |
| `matchcenterResultClass` | function | 17036–17038 | 3 |
| `matchcenterUlmTeamLabelForGame` | function | 17040–17044 | 5 |
| `matchcenterGameLine` | function | 17045–17050 | 6 |
| `matchcenterFormLine` | function | 17051–17055 | 5 |
| `matchcenterBuildInsights` | function | 17056–17076 | 21 |
| `rMatchcenterKpi` | function | 17077–17083 | 7 |
| `rMatchcenterFormCard` | function | 17084–17104 | 21 |
| `rMatchcenterGamesList` | function | 17105–17116 | 12 |
| `rMatchcenterWatchCard` | function | 17117–17137 | 21 |
| `rMatchcenterPlayerRow` | function | 17138–17161 | 24 |
| `rMatchcenterRankCard` | function | 17162–17167 | 6 |
| `rMatchcenterUlmImpactCard` | function | 17168–17196 | 29 |
| `rMatchcenterUlmPlayerRow` | function | 17197–17220 | 24 |
| `rMatchcenterUlmRankCard` | function | 17221–17226 | 6 |
| `rMatchcenterUlmScouting` | function | 17227–17263 | 37 |
| `rMatchcenterOpponentScouting` | function | 17264–17299 | 36 |
| `rMatchcenterPlayersTab` | function | 17300–17302 | 3 |
| `rMatchcenterDuoWatchCard` | function | 17303–17322 | 20 |
| `rMatchcenterDuoRow` | function | 17323–17346 | 24 |
| `rMatchcenterDuoRankCard` | function | 17347–17352 | 6 |
| `rMatchcenterUlmDuoWatchCard` | function | 17353–17378 | 26 |
| `rMatchcenterUlmDuoRow` | function | 17379–17401 | 23 |
| `rMatchcenterUlmDuoRankCard` | function | 17402–17407 | 6 |
| `rMatchcenterUlmDuos` | function | 17408–17450 | 43 |
| `rMatchcenterOpponentDuos` | function | 17451–17493 | 43 |
| `rMatchcenterDuosTab` | function | 17494–17496 | 3 |
| `rMatchcenterSpecialCard` | function | 17497–17505 | 9 |
| `rMatchcenterSpecialTeams` | function | 17506–17555 | 50 |
| `rMatchcenterGoalieCard` | function | 17556–17579 | 24 |
| `rMatchcenterGoalieMatchup` | function | 17580–17608 | 29 |
| `matchcenterPlanScoreText` | function | 17609–17612 | 4 |
| `matchcenterPlanRateText` | function | 17613–17617 | 5 |
| `matchcenterPriorityLabel` | function | 17618–17620 | 3 |
| `matchcenterConfidenceClass` | function | 17621–17626 | 6 |
| `matchcenterInferPriority` | function | 17627–17633 | 7 |
| `matchcenterAddPlanItem` | function | 17634–17639 | 6 |
| `matchcenterAddPlanWatch` | function | 17640–17645 | 6 |
| `matchcenterBuildPlanConfidence` | function | 17646–17693 | 48 |
| `matchcenterIntelCurve` | function | 17694–17699 | 6 |
| `matchcenterIntelInverseCurve` | function | 17700–17703 | 4 |
| `matchcenterIntelWeighted` | function | 17704–17714 | 11 |
| `matchcenterIntelRate` | function | 17715–17718 | 4 |
| `matchcenterIntelPct` | function | 17719–17722 | 4 |
| `matchcenterIntelPriorityFromScore` | function | 17723–17728 | 6 |
| `matchcenterIntelPriorityClass` | function | 17729–17734 | 6 |
| `matchcenterIntelPriorityLabel` | function | 17735–17738 | 4 |
| `matchcenterIntelDataLabel` | function | 17739–17741 | 3 |
| `matchcenterBuildIntelligenceDataQuality` | function | 17742–17811 | 70 |
| `matchcenterBuildOpponentDNA` | function | 17812–17924 | 113 |
| `matchcenterDeriveOpponentType` | function | 17925–17942 | 18 |
| `matchcenterIntelPlayerRef` | function | 17943–17955 | 13 |
| `matchcenterIntelDuoRef` | function | 17956–17969 | 14 |
| `matchcenterIntelAddAlarm` | function | 17970–17990 | 21 |
| `matchcenterBuildOpponentAlarm` | function | 17991–18100 | 110 |
| `matchcenterBuildIntelListFromPlan` | function | 18101–18109 | 9 |
| `matchcenterBuildCoachHints` | function | 18110–18125 | 16 |
| `matchcenterBuildIntelHeadline` | function | 18126–18133 | 8 |
| `matchcenterBuildOneThingToWatch` | function | 18134–18146 | 13 |
| `matchcenterBuildIntelligenceSignals` | function | 18147–18193 | 47 |
| `buildMatchIntelligenceFromContext` | function | 18194–18248 | 55 |
| `buildMatchIntelligence` | function | 18249–18270 | 22 |
| `matchcenterCoachCautious` | function | 18271–18273 | 3 |
| `matchcenterCoachAdd` | function | 18274–18282 | 9 |
| `matchcenterCoachGameModel` | function | 18283–18296 | 14 |
| `buildMatchStories` | function | 18297–18326 | 30 |
| `matchcenterCoachPriorityFromAlarm` | function | 18327–18336 | 10 |
| `matchcenterBuildCoachPriorities` | function | 18337–18343 | 7 |
| `matchcenterBuildCoachLevers` | function | 18344–18353 | 10 |
| `matchcenterBuildCoachDangerPatterns` | function | 18354–18361 | 8 |
| `matchcenterBuildCoachIfThen` | function | 18362–18371 | 10 |
| `matchcenterBuildCoachAvoidList` | function | 18372–18381 | 10 |
| `matchcenterBuildCoachActivationHints` | function | 18382–18388 | 7 |
| `matchcenterBuildCoachKeyActors` | function | 18389–18396 | 8 |
| `buildDigitalCoachReport` | function | 18397–18429 | 33 |
| `buildLockerRoomSheet` | function | 18430–18450 | 21 |
| `matchcenterSocialAdd` | function | 18451–18457 | 7 |
| `matchcenterSocialCaption` | function | 18458–18463 | 6 |
| `socialSentence` | function | 18464–18466 | 3 |
| `socialEnsurePeriod` | function | 18467–18470 | 4 |
| `socialFirstUseful` | function | 18471–18473 | 3 |
| `socialPlayerFocusLine` | function | 18474–18480 | 7 |
| `socialDuoFocusLine` | function | 18481–18486 | 6 |
| `socialOpponentLine` | function | 18487–18490 | 4 |
| `socialKeyFactLine` | function | 18491–18500 | 10 |
| `buildMatchdayCaptionBlocks` | function | 18501–18530 | 30 |
| `buildSocialMediaContent` | function | 18531–18579 | 49 |
| `isSyntheticLineupPlayerId` | function | 18585–18587 | 3 |
| `getSyntheticLineupPlayers` | function | 18588–18590 | 3 |
| `getSyntheticLineupRow` | function | 18591–18607 | 17 |
| `getSyntheticLineupRows` | function | 18608–18610 | 3 |
| `getLineupAllRows` | function | 18611–18613 | 3 |
| `lineupRowMeta` | function | 18614–18621 | 8 |
| `getLineupPlayerPool` | function | 18622–18630 | 9 |
| `lineupScore` | function | 18631–18636 | 6 |
| `lineupAverage` | function | 18637–18640 | 4 |
| `lineupLevelLabel` | function | 18641–18644 | 4 |
| `lineupRosterGamesForPlayer` | function | 18647–18694 | 48 |
| `buildLineupExperienceProfile` | function | 18695–18737 | 43 |
| `lineupOpponentDNAForContext` | function | 18738–18749 | 12 |
| `buildLineupOpponentDNAFit` | function | 18750–18793 | 44 |
| `classifyLineIdentity` | function | 18794–18841 | 48 |
| `lineupPlayerProfile` | function | 18842–18917 | 76 |
| `buildLineupAnalysis` | function | 18918–19051 | 134 |
| `buildLineupScoreBreakdowns` | function | 19052–19081 | 30 |
| `buildLineupIntelligence` | function | 19082–19092 | 11 |
| `buildLineAnalysis` | function | 19093–19095 | 3 |
| `lineupRowMap` | function | 19096–19098 | 3 |
| `lineupRankCandidateIds` | function | 19099–19113 | 15 |
| `lineupCombinationIds` | function | 19114–19127 | 14 |
| `lineupStdDev` | function | 19128–19133 | 6 |
| `lineupRoleDnaComplementScore` | function | 19134–19157 | 24 |
| `lineupDirectChemistryScore` | function | 19158–19164 | 7 |
| `lineupEvaluateComplementCandidate` | function | 19165–19243 | 79 |
| `lineupPlayerAnchorScore` | function | 19244–19261 | 18 |
| `lineupPlayerAnchorConfidence` | function | 19264–19268 | 5 |
| `buildTeamLineBalance` | function | 19269–19312 | 44 |
| `buildBalancedLineupSet` | function | 19313–19339 | 27 |
| `lineupRecommendationReason` | function | 19340–19348 | 9 |
| `buildLineupRecommendations` | function | 19349–19430 | 82 |
| `recommendLineComplements` | function | 19431–19458 | 28 |
| `matchcenterBuildMatchPlan` | function | 19459–19604 | 146 |
| `rMatchcenterPlanItems` | function | 19605–19622 | 18 |
| `rMatchcenterPlanWatch` | function | 19623–19638 | 16 |
| `rMatchcenterOpponentDNA` | function | 19639–19671 | 33 |
| `rMatchcenterOpponentAlarm` | function | 19672–19693 | 22 |
| `rMatchcenterIntelOverview` | function | 19694–19739 | 46 |
| `rMatchcenterIntelCoachHints` | function | 19740–19753 | 14 |
| `rMatchcenterCoachCardList` | function | 19754–19767 | 14 |
| `rMatchcenterCoachIfThen` | function | 19768–19775 | 8 |
| `rMatchcenterCoachSimpleList` | function | 19776–19780 | 5 |
| `rMatchcenterDigitalCoach` | function | 19781–19845 | 65 |
| `rMatchcenterCopyButton` | function | 19846–19850 | 5 |
| `rMatchcenterLockerList` | function | 19851–19862 | 12 |
| `rMatchcenterLockerRoomSheet` | function | 19863–19918 | 56 |
| `rMatchcenterSocialBlock` | function | 19919–19926 | 8 |
| `matchcenterStoryDownloadFileName` | function | 19927–19936 | 10 |
| `downloadMatchdayStory` | window | 19937–19984 | 48 |
| `rSocialVideoBlock` | function | 19988–20019 | 32 |
| `socialVideoJobsForMatchday` | function | 20022–20028 | 7 |
| `generateSocialVideoVideos` | window | 20029–20070 | 42 |
| `cancelSocialVideoRecording` | window | 20071–20073 | 3 |
| `generateSocialVideoStandbilder` | window | 20074–20097 | 24 |
| `generateSocialVideoContactSheets` | window | 20098–20120 | 23 |
| `rMatchcenterSocialMediaCenter` | function | 20121–20174 | 54 |
| `rLineupScoreRows` | function | 20175–20196 | 22 |
| `rLineupSimpleCards` | function | 20197–20205 | 9 |
| `rMatchcenterLineupBuilder` | function | 20206–20278 | 73 |
| `rLineupMetricPills` | function | 20279–20292 | 14 |
| `rLineupBuilderAvailablePanel` | function | 20293–20340 | 48 |
| `rLineupRecommendationCards` | function | 20341–20355 | 15 |
| `rLineupRecommendationMode` | function | 20356–20389 | 34 |
| `rLineupComplementCards` | function | 20390–20402 | 13 |
| `rLineupTestLine` | function | 20403–20451 | 49 |
| `rLineupTestMode` | function | 20452–20468 | 17 |
| `rLineupBuilderPage` | function | 20469–20503 | 35 |
| `rMatchcenterScoutingSummary` | function | 20504–20547 | 44 |
| `rMatchcenterMatchPlan` | function | 20548–20568 | 21 |
| `matchcenterStoryLogoBase` | function | 20571–20576 | 6 |
| `matchcenterStorySafeLogoUrl` | function | 20577–20583 | 7 |
| `getTeamLogoUrlForStory` | function | 20592–20621 | 30 |
| `matchcenterStoryLogoForOpponent` | function | 20622–20636 | 15 |
| `matchcenterStoryTableRank` | function | 20637–20647 | 11 |
| `matchcenterStoryUlmTableRank` | function | 20648–20654 | 7 |
| `matchcenterStoryRankText` | function | 20655–20658 | 4 |
| `matchcenterStoryInlineStat` | function | 20659–20661 | 3 |
| `matchcenterStoryRankRows` | function | 20663–20674 | 12 |
| `matchcenterStoryAddFact` | function | 20677–20683 | 7 |
| `matchcenterStoryFactKey` | function | 20684–20686 | 3 |
| `matchcenterStoryLooksArtificial` | function | 20687–20689 | 3 |
| `matchcenterStoryEstimateFactWeight` | function | 20690–20695 | 6 |
| `matchcenterStoryAddCandidate` | function | 20696–20718 | 23 |
| `matchcenterStoryCategoryLimit` | function | 20719–20722 | 4 |
| `matchcenterStoryNormalizePickOptions` | function | 20723–20733 | 11 |
| `matchcenterStoryCandidateForBudget` | function | 20734–20743 | 10 |
| `matchcenterStoryPickFactItems` | function | 20744–20796 | 53 |
| `matchcenterStoryPickFacts` | function | 20797–20799 | 3 |
| `matchcenterStoryCurrentStreak` | function | 20801–20809 | 9 |
| `matchcenterStoryWinlessStreak` | function | 20810–20818 | 9 |
| `matchcenterStoryFormFact` | function | 20819–20829 | 11 |
| `matchcenterStoryFormFactCandidates` | function | 20830–20849 | 20 |
| `matchcenterStoryLateGoalsForOutcome` | function | 20850–20853 | 4 |
| `matchcenterStoryClutchFact` | function | 20854–20868 | 15 |
| `matchcenterStoryPlayerClutchTotal` | function | 20869–20876 | 8 |
| `matchcenterStoryBestClutchPlayer` | function | 20877–20886 | 10 |
| `matchcenterStoryPlayerClutchFact` | function | 20887–20912 | 26 |
| `matchcenterStoryDuoClutchTotal` | function | 20913–20920 | 8 |
| `matchcenterStoryBestClutchDuo` | function | 20921–20930 | 10 |
| `matchcenterStoryDuoClutchFact` | function | 20931–20933 | 3 |
| `matchcenterStoryDuoFact` | function | 20934–20954 | 21 |
| `matchcenterStoryClutchPriority` | function | 20955–20957 | 3 |
| `matchcenterStoryCompetitionLabel` | function | 20958–20961 | 4 |
| `matchcenterStoryShortDuel` | function | 20962–20966 | 5 |
| `matchcenterStoryLastDuelLabel` | function | 20967–20970 | 4 |
| `matchcenterStoryDirectFactCandidates` | function | 20971–20992 | 22 |
| `matchcenterStoryPlanFactCandidates` | function | 20993–21005 | 13 |
| `matchcenterStoryCategoryForPlanFact` | function | 21006–21014 | 9 |
| `buildMatchcenterStoryPreviewData` | function | 21015–21126 | 112 |
| `matchcenterStoryNameClass` | function | 21127–21132 | 6 |
| `matchcenterStoryVisibleFacts` | function | 21133–21163 | 31 |
| `rMatchcenterStoryLogo` | function | 21164–21168 | 5 |
| `rMatchcenterStoryForm` | function | 21169–21173 | 5 |
| `rMatchcenterStoryPlayerCard` | function | 21174–21181 | 8 |
| `rMatchcenterStoryPreview` | function | 21182–21251 | 70 |
| `rMatchcenterStoryFrame` | function | 21252–21257 | 6 |
| `fitMatchcenterStoryLayout` | function | 21258–21300 | 43 |
| `ensureSocialVideoExportCapabilityChecked` | function | 21309–21313 | 5 |
| `downloadSocialVideoStandbild` | window | 21328–21347 | 20 |
| `downloadSocialVideoContactSheet` | window | 21352–21377 | 26 |
| `rMatchcenterPage` | function | 21379–21527 | 149 |
| `rTeamNoGoalStreakCard` | function | 21538–21549 | 12 |
| `rTeamPage` | function | 21550–21890 | 341 |
| `exportExcel` | function | 21895–21920 | 26 |
| `render` | function | 21926–21943 | 18 |
| `_render` | function | 21944–22113 | 170 |
| `uiFormatNumber` | function | 22147–22151 | 5 |
| `uiReliabilityDots` | function | 22160–22167 | 8 |
| `uiDeltaIndicator` | function | 22175–22181 | 7 |
| `uiInfoIcon` | function | 22193–22197 | 5 |
| `uiKennzahlKachel` | function | 22205–22216 | 12 |
| `uiKernaussage` | function | 22225–22231 | 7 |
| `uiHinweisKarte` | function | 22239–22251 | 13 |
| `uiRangliste` | function | 22261–22278 | 18 |
| `uiVerlauf` | function | 22289–22308 | 20 |
| `uiIntervallBalken` | function | 22315–22327 | 13 |
| `uiMethodenbox` | function | 22334–22343 | 10 |
| `uiNotiz` | function | 22351–22355 | 5 |
| `datenstandQuoteState` | function | 22377–22384 | 8 |
| `uiQuoteText` | function | 22387–22393 | 7 |
| `uiDatenstandBand` | function | 22410–22423 | 14 |
| `uiPlatzhalter` | function | 22431–22436 | 6 |
| `uiObjektseiteSortTabs` | function | 22481–22489 | 9 |
| `uiObjektseite` | function | 22499–22532 | 34 |
| `mainNavActiveKeyForPage` | function | 22589–22594 | 6 |
| `goToMainNavPoint` | window | 22595–22601 | 7 |
| `rMainNav` | function | 22602–22606 | 5 |
| `rMainNavBottom` | function | 22624–22631 | 8 |
| `openOverview` | window | 22641–22649 | 9 |
| `switchOverviewSeason` | window | 22658–22664 | 7 |
| `openMatchdayTimeline` | window | 22692–22699 | 8 |
| `openMatchday` | window | 22700–22709 | 10 |
| `switchMatchdaySeason` | window | 22711–22716 | 6 |
| `matchdayUlmGames` | function | 22718–22720 | 3 |
| `matchdayLineupInfo` | function | 22727–22737 | 11 |
| `matchdayLineupCardHtml` | function | 22739–22745 | 7 |
| `matchdayGameCardHtml` | function | 22746–22765 | 20 |
| `matchdayFixtureCardHtml` | function | 22771–22779 | 9 |
| `rMatchdayTimelineRow` | function | 22781–22788 | 8 |
| `rMatchdayTimelinePage` | function | 22789–22799 | 11 |
| `rMatchdayDetailPage` | function | 22800–22839 | 40 |
| `rMatchdayPage` | function | 22840–22846 | 7 |
| `overviewMatchdayStartMs` | function | 22865–22870 | 6 |
| `overviewMatchdayEndMs` | function | 22871–22876 | 6 |
| `detectOverviewPhase` | function | 22877–22902 | 26 |
| `getSeasonDataState` | function | 22909–22919 | 11 |
| `parseSeasonDataState` | function | 22920–22928 | 9 |
| `isNewSeasonDataState` | function | 22930–22932 | 3 |
| `recordOverviewVisit` | function | 22939–22948 | 10 |
| `overviewOpponentLabel` | function | 22954–22965 | 12 |
| `overviewLastMatchdayText` | function | 22966–22969 | 4 |
| `overviewNextMatchdayHtml` | function | 22976–22992 | 17 |
| `overviewCompactTableHtml` | function | 23000–23016 | 17 |
| `overviewFormHtml` | function | 23018–23032 | 15 |
| `overviewSeasonBilanzHtml` | function | 23033–23039 | 7 |
| `overviewSeasonAwardHtml` | function | 23041–23050 | 10 |
| `overviewRecordHtml` | function | 23052–23057 | 6 |
| `overviewCrossSeasonTrendHtml` | function | 23059–23067 | 9 |
| `overviewOpponentPreviewHtml` | function | 23068–23072 | 5 |
| `overviewMatchcenterLinkHtml` | function | 23073–23075 | 3 |
| `overviewLineupLinkHtml` | function | 23076–23078 | 3 |
| `overviewRankChangeTile` | function | 23095–23112 | 18 |
| `buildOverviewCards` | function | 23121–23161 | 41 |
| `rOverviewPage` | function | 23171–23182 | 12 |
| `openLigaGegner` | window | 23183–23186 | 4 |
| `rLigaGegnerPlaceholderPage` | function | 23187–23192 | 6 |
| `rAsOfSelector` | function | 23204–23216 | 13 |
| `setContextAsOf` | window | 23217–23228 | 12 |
| `rSeasonDataPreviewContextHint` | function | 23239–23247 | 9 |
| `rSeasonDataStateContextHint` | function | 23256–23262 | 7 |
| `rContextBar` | function | 23287–23305 | 19 |
| `rIaShell` | function | 23307–23309 | 3 |
| `globalSearchTokens` | function | 23326–23329 | 4 |
| `globalSearchEntries` | function | 23331–23344 | 14 |
| `globalSearchPlayerScore` | function | 23345–23352 | 8 |
| `globalSearchMatchdayScore` | function | 23354–23366 | 13 |
| `globalSearchMatch` | function | 23368–23379 | 12 |
| `globalSearchIsEditableTarget` | function | 23380–23384 | 5 |
| `globalSearchKeyAction` | function | 23386–23400 | 15 |
| `rGlobalSearchToggle` | function | 23401–23403 | 3 |
| `rGlobalSearchResultsHtml` | function | 23404–23414 | 11 |
| `rGlobalSearchPanelHtml` | function | 23415–23417 | 3 |
| `paintGlobalSearchResults` | function | 23418–23425 | 8 |
| `openGlobalSearch` | window | 23426–23450 | 25 |
| `closeGlobalSearch` | window | 23451–23458 | 8 |
| `onGlobalSearchInput` | window | 23459–23464 | 6 |
| `moveGlobalSearch` | function | 23465–23470 | 6 |
| `activateGlobalSearchResult` | window | 23471–23480 | 10 |
| `globalSearchOnKeydown` | function | 23481–23502 | 22 |
| `initGlobalSearch` | function | 23503–23507 | 5 |
| `rToolMenu` | function | 23529–23532 | 4 |
| `toolMenuElements` | function | 23533–23535 | 3 |
| `toolMenuItemElements` | function | 23536–23538 | 3 |
| `isToolMenuOpen` | function | 23539–23542 | 4 |
| `openToolMenu` | window | 23543–23550 | 8 |
| `closeToolMenu` | window | 23551–23557 | 7 |
| `toggleToolMenu` | window | 23558–23561 | 4 |
| `activateToolMenuItem` | window | 23562–23569 | 8 |
| `toolMenuOnKeydown` | function | 23570–23593 | 24 |
| `toolMenuOnClick` | function | 23594–23600 | 7 |
| `initToolMenu` | function | 23601–23604 | 4 |

## Alphabetisches Register

| Name | Art | Zeile |
|---|---|---|
| `_render` | function | 21944 |
| `acceptEinsatzCenterRosterSuggestion` | window | 7718 |
| `activateGlobalSearchResult` | window | 23471 |
| `activateToolMenuItem` | window | 23562 |
| `addComparisonDuo` | window | 13495 |
| `addComparisonDuoFromSelection` | window | 13487 |
| `addComparisonItem` | window | 13395 |
| `addDuoTeamGame` | function | 11327 |
| `addEinsatzCenterExistingGroup` | window | 7735 |
| `addEinsatzCenterGroupPlayer` | window | 7803 |
| `addEinsatzCenterNewGroup` | window | 7744 |
| `addEinsatzCenterRosterPlayer` | window | 7684 |
| `addGoalieGameToStats` | function | 4577 |
| `addGoalieSpecialTeamsGameToStats` | function | 4547 |
| `addLineupBuilderPlayerToActiveLine` | window | 2349 |
| `addLineupBuilderPlayerToLine` | window | 2339 |
| `addLineupPlayer` | window | 2285 |
| `addRosterImpactGameToStats` | function | 11862 |
| `addSelectedComparisonItem` | window | 13403 |
| `addSyntheticLineupPlayer` | window | 2365 |
| `addUnique` | function | 3720 |
| `aggregateAllTimeDuos` | function | 4927 |
| `aggregateAllTimePlayers` | function | 4014 |
| `aggregateAlltimeSpecialTeams` | function | 4527 |
| `aggregateGoalieAlltimeStats` | function | 4763 |
| `aggregateSeasonStats` | function | 4939 |
| `analysisCacheContext` | function | 2191 |
| `analysisCacheKey` | function | 2225 |
| `annotateSpecialTeamsGoalEvent` | function | 4306 |
| `antiSynergyDeltaClass` | function | 12097 |
| `antiSynergyImpactScore` | function | 12003 |
| `antiSynergyPartnerIsSgOnly` | function | 12149 |
| `antiSynergySigned` | function | 12101 |
| `appendSeasonGameDiagnostics` | function | 2561 |
| `applyAppHash` | function | 3509 |
| `applyCurrentSeasonCoverHighlight` | function | 6188 |
| `applyGlobalPageFromHash` | function | 3476 |
| `applySeasonContext` | function | 2426 |
| `applySeasonScoringToRegistry` | function | 3878 |
| `asOfCacheKeyPart` | function | 2219 |
| `asOfEquals` | function | 3180 |
| `assignStatus` | function | 5794 |
| `avgOrNull` | function | 4058 |
| `backToComparisonModeSelect` | window | 13423 |
| `backToHome` | window | 2402 |
| `buildAlltimePlayerDashModel` | function | 14562 |
| `buildAnnotatedGoalEventsForGame` | function | 10920 |
| `buildAppHash` | function | 3326 |
| `buildBalancedLineupSet` | function | 19313 |
| `buildBestThirdManOptions` | function | 10805 |
| `buildComparisonDataset` | function | 13864 |
| `buildComparisonExtraMetrics` | function | 13719 |
| `buildComparisonSummary` | function | 14228 |
| `buildConfidence` | function | 15773 |
| `buildDigitalCoachReport` | function | 18397 |
| `buildDirectDuoLookupForPlayer` | function | 10763 |
| `buildDryRunReport` | function | 6412 |
| `buildDuoAntiSynergy` | function | 12087 |
| `buildDuoComparison` | function | 13508 |
| `buildDuoCompatibility` | function | 11450 |
| `buildDuoDirectProduction` | function | 11303 |
| `buildDuoFloorCeiling` | function | 11214 |
| `buildDuoGapAnalysis` | function | 11422 |
| `buildDuoNetworkContext` | function | 11398 |
| `buildDuoOpponentAdjusted` | function | 11385 |
| `buildDuoProAnalysis` | function | 11509 |
| `buildDuoReplacementOptions` | function | 11497 |
| `buildDuoUntestedPotential` | function | 11473 |
| `buildDuoUsageRate` | function | 11485 |
| `buildDuoWarnings` | function | 11256 |
| `buildDuoWithWithoutImpact` | function | 11351 |
| `buildEinsatzCenterDraftExport` | function | 7864 |
| `buildFieldPlayerExplanation` | function | 15201 |
| `buildGlobalPageHash` | function | 3343 |
| `buildGoalieAnalysisModel` | function | 9699 |
| `buildGoalieComparisonDataset` | function | 13813 |
| `buildGoalieGameRecord` | function | 4629 |
| `buildGoaliePlayerExplanation` | function | 15276 |
| `buildGoalieRoleProfile` | function | 9925 |
| `buildGoalieStatsForSeason` | function | 4682 |
| `buildHallOfFameIntroTitle` | function | 8574 |
| `buildHallOfFameLongestNoGoalStreak` | function | 13034 |
| `buildHashStringFromParsed` | function | 3358 |
| `buildIdentityProfiles` | function | 5516 |
| `buildLineAnalysis` | function | 19093 |
| `buildLineupAnalysis` | function | 18918 |
| `buildLineupExperienceProfile` | function | 18695 |
| `buildLineupIntelligence` | function | 19082 |
| `buildLineupOpponentDNAFit` | function | 18750 |
| `buildLineupRecommendations` | function | 19349 |
| `buildLineupScoreBreakdowns` | function | 19052 |
| `buildLockerRoomSheet` | function | 18430 |
| `buildMatchcenterStoryPreviewData` | function | 21015 |
| `buildMatchdayCaptionBlocks` | function | 18501 |
| `buildMatchIntelligence` | function | 18249 |
| `buildMatchIntelligenceFromContext` | function | 18194 |
| `buildMatchStories` | function | 18297 |
| `buildMomentumSwingStats` | function | 11208 |
| `buildMomentumSwingStatsRaw` | function | 11137 |
| `buildOpponentIntelligence` | function | 10602 |
| `buildOverviewCards` | function | 23121 |
| `buildPlayerDataFoundation` | function | 4956 |
| `buildPlayerEvents` | function | 5011 |
| `buildPlayerExplanation` | function | 15330 |
| `buildPlayerIdentity` | function | 3731 |
| `buildPlayerIntelligence` | function | 15339 |
| `buildRecencyWeightedGlobalIdentityProfile` | function | 12668 |
| `buildRegistry` | function | 4980 |
| `buildResponseGoalStats` | function | 11125 |
| `buildResponseGoalStatsRaw` | function | 11076 |
| `buildRosterImpactAnalysis` | function | 12018 |
| `buildRosterImpactGameIndex` | function | 11905 |
| `buildSeasonDataPreviewChanges` | function | 6517 |
| `buildSeasonDuos` | function | 4883 |
| `buildSeasonPlayerDashModel` | function | 14525 |
| `buildSocialMediaContent` | function | 18531 |
| `buildSoloDuoProfile` | function | 5281 |
| `buildSpecialTeamsForGame` | function | 4321 |
| `buildSpecialTeamsForSeason` | function | 4518 |
| `buildStaticSeasonDataBlock` | function | 6236 |
| `buildTeamLineBalance` | function | 19269 |
| `cachedAnalysis` | function | 2229 |
| `cancelDuoProPicker` | window | 11712 |
| `cancelEinsatzCenterEdit` | window | 7665 |
| `cancelHallOfFameIntro` | function | 8663 |
| `cancelSocialVideoRecording` | window | 20071 |
| `capSuperlativeLabel` | function | 15897 |
| `clampScore` | function | 15760 |
| `classicTagLabel` | function | 8817 |
| `classifyLineIdentity` | function | 18794 |
| `cleanupHallOfFameIntro` | function | 8603 |
| `clearAnalysisCache` | function | 2188 |
| `clearComparison` | window | 13414 |
| `clearComparisonDuos` | window | 13502 |
| `clearLineupAvailable` | window | 2338 |
| `clearLineupBuilderLine` | window | 2357 |
| `clearLineupPlayers` | window | 2292 |
| `clearlyAboveAverage` | function | 5473 |
| `clonePlain` | function | 4157 |
| `closeGlobalSearch` | window | 23451 |
| `closeMatchcenterStoryPreview` | window | 2257 |
| `closeToolMenu` | window | 23551 |
| `clutchText` | function | 5353 |
| `collectAssistEventRefs` | function | 2896 |
| `comparisonDuoContext` | function | 13428 |
| `comparisonEventGameKey` | function | 13706 |
| `comparisonEventPhaseLabel` | function | 13709 |
| `comparisonFmt` | function | 13196 |
| `comparisonItemKey` | function | 13174 |
| `comparisonJsArg` | function | 13185 |
| `comparisonNum` | function | 13188 |
| `comparisonOpponentStrengthTier` | function | 13713 |
| `comparisonPct` | function | 13192 |
| `comparisonPctFmt` | function | 13200 |
| `comparisonVariantValue` | function | 13317 |
| `composeIdentityText` | function | 5748 |
| `computeCurrentAppHash` | function | 3378 |
| `computeEinsatzCenterStats` | function | 6878 |
| `computeMetrics` | function | 5126 |
| `computeRosterStatus` | function | 5774 |
| `confidenceCautiousText` | function | 15819 |
| `confidenceFromSampleSize` | function | 11995 |
| `confirmDuoProSelection` | window | 11717 |
| `confirmEinsatzCenterCombo` | window | 7836 |
| `copyMatchcenterText` | window | 2259 |
| `countBy` | function | 10349 |
| `countCaptainAppearances` | function | 5756 |
| `countGoalieAppearances` | function | 5770 |
| `countMomentumClusters` | function | 5392 |
| `countPlayedUlmGames` | function | 2816 |
| `createPlayerAnalysisProfile` | function | 3651 |
| `createSeasonBucket` | function | 1813 |
| `datenstandQuoteState` | function | 22377 |
| `decodeHashSegmentSafe` | function | 3251 |
| `dedupeGamesById` | function | 15940 |
| `dedupeIdentityProfileTags` | function | 12745 |
| `deriveAsOfForSeason` | function | 3056 |
| `deriveLineupUlmPlayerIds` | function | 7375 |
| `deriveLineupValidPlayerIds` | function | 7351 |
| `derivePlayerStatus` | function | 3760 |
| `detectOverviewPhase` | function | 22877 |
| `detectSide` | const-arrow | 2517 |
| `detectTypes` | function | 5261 |
| `detectUlmSide` | function | 2510 |
| `diagnoseGameDuplicates` | function | 2539 |
| `diagnosticError` | function | 6009 |
| `diffGameIds` | function | 6359 |
| `difficultConnectionConfidence` | function | 10739 |
| `discardEinsatzCenterAutosave` | function | 7274 |
| `discardSeasonDataPreview` | function | 6616 |
| `dismissEinsatzCenterRosterSuggestion` | window | 7707 |
| `downloadMatchdayStory` | window | 19937 |
| `downloadSocialVideoContactSheet` | window | 21352 |
| `downloadSocialVideoStandbild` | window | 21328 |
| `duoProContextSeasonKey` | function | 11278 |
| `duoProDomId` | function | 11673 |
| `duoProPairKey` | function | 11275 |
| `duoProPickerMessage` | function | 11679 |
| `duoProPickerOpen` | function | 11676 |
| `duoProPlayer` | function | 11292 |
| `duoProResolveCandidate` | function | 11692 |
| `duoProSelectionPayload` | function | 11701 |
| `duoScopeSeasonKeys` | function | 10781 |
| `einsatzCenterAutosaveDraft` | function | 7190 |
| `einsatzCenterAutosaveInfoText` | function | 7296 |
| `einsatzCenterAutosaveKey` | function | 7101 |
| `einsatzCenterCanonicalJson` | function | 7434 |
| `einsatzCenterComputeBaseHash` | function | 7449 |
| `einsatzCenterCurrentRawBaseHash` | function | 7176 |
| `einsatzCenterDeserializeAutosave` | function | 7136 |
| `einsatzCenterDraftInView` | function | 7005 |
| `einsatzCenterDraftIsEmpty` | function | 7113 |
| `einsatzCenterDraftStaleHint` | function | 7019 |
| `einsatzCenterInspectAutosave` | function | 7225 |
| `einsatzCenterIsPlainObject` | function | 7130 |
| `einsatzCenterSerializeDraft` | function | 7117 |
| `einsatzCenterSha256Hex` | function | 7444 |
| `einsatzCenterSoftIssues` | function | 7458 |
| `einsatzCenterStorageRead` | function | 7102 |
| `einsatzCenterStorageRemove` | function | 7108 |
| `einsatzCenterStorageWrite` | function | 7105 |
| `emptyDuoTeamImpactStats` | function | 11324 |
| `emptyFieldRoleSeasonStats` | function | 3716 |
| `emptyGoalieAlltimeStats` | function | 3688 |
| `emptyGoalieSeasonStats` | function | 3664 |
| `emptyGoalieSpecialTeamsStats` | function | 3704 |
| `emptyPlayerSeasonStats` | function | 3655 |
| `emptyRosterImpactStats` | function | 11851 |
| `emptySpecialTeamsStats` | function | 4116 |
| `ensureAppLoaded` | function | 8517 |
| `ensureEinsatzCenterDraft` | function | 7041 |
| `ensureExternalSeasonData` | function | 6214 |
| `ensureFieldRoleSeasonStats` | function | 3826 |
| `ensureGlobalDataLoaded` | function | 8445 |
| `ensureGoalieSeasonStats` | function | 3821 |
| `ensureHallOfFameIntroOverlay` | function | 8541 |
| `ensureLineupDataLoaded` | function | 6724 |
| `ensureLineupGroupsRegistryLoaded` | function | 6749 |
| `ensureRmDuo` | function | 11056 |
| `ensureRmPlayer` | function | 11050 |
| `ensureSocialVideoExportCapabilityChecked` | function | 21309 |
| `escAttr` | function | 8790 |
| `escHtml` | function | 12764 |
| `eventMatchesTeams` | function | 5347 |
| `explainScore` | function | 15823 |
| `exportEinsatzCenterDraft` | window | 7878 |
| `exportExcel` | function | 21895 |
| `fallbackIdentityProfile` | function | 8825 |
| `fetchJson` | function | 6053 |
| `fetchJsonLegacy` | function | 5985 |
| `fetchJsonWithDiagnostics` | function | 6044 |
| `fetchSeasonGameRaw` | function | 6079 |
| `fetchTextWithDiagnostics` | function | 6014 |
| `fileNameForLineupSeasonKey` | function | 6706 |
| `filterComparisonDuoSuggestions` | window | 13460 |
| `filterComparisonPlayers` | window | 13371 |
| `filterLineupBuilderAvailable` | window | 2386 |
| `filterLineupPlayers` | window | 2293 |
| `filterPlayerSuggestions` | function | 13435 |
| `filterPureSGPlayers` | function | 9491 |
| `finalizeDuoTeamImpactStats` | function | 11343 |
| `finalizeGoalieSeasonStats` | function | 4562 |
| `finalizeMomentumStats` | function | 11131 |
| `finalizePlayerRegistrySeason` | function | 3925 |
| `finalizeResponseStats` | function | 11062 |
| `finalizeRosterImpactStats` | function | 11854 |
| `finalizeSeasonAppearanceTotals` | function | 3914 |
| `finalizeSpecialTeamsStats` | function | 4160 |
| `findDuplicateGameIds` | function | 6278 |
| `findLineupGameContext` | function | 6783 |
| `findLoadedSeasonPlayer` | function | 9454 |
| `finishHallOfFameIntro` | function | 8630 |
| `finiteNumbers` | function | 4055 |
| `fitMatchcenterStoryLayout` | function | 21258 |
| `fixMojibakeText` | function | 2463 |
| `formatDiagnosticAttempt` | function | 6060 |
| `formatGameLoadError` | function | 6073 |
| `formatStatus` | function | 6057 |
| `gameClassificationStatusLabel` | function | 2553 |
| `gameDaySortValue` | function | 4226 |
| `gameResult` | function | 3609 |
| `generatePlayerInsights` | function | 9313 |
| `generateSocialVideoContactSheets` | window | 20098 |
| `generateSocialVideoStandbilder` | window | 20074 |
| `generateSocialVideoVideos` | window | 20029 |
| `getActiveAlltimeSeasonKeys` | function | 10521 |
| `getActiveSeasonKey` | function | 2414 |
| `getAllLoadedSeasonGames` | function | 10714 |
| `getAlltimeAggregatedStyleProfile` | function | 14405 |
| `getAllTimeCoverStats` | function | 8396 |
| `getAllTimeDuoRows` | function | 10669 |
| `getAllTimeDuoRowsForPlayer` | function | 10407 |
| `getAllTimeGamesPlayedRows` | function | 10447 |
| `getAllTimeIdentityStandings` | function | 12632 |
| `getAllTimeMainPlayerRows` | function | 9495 |
| `getAllTimeOpponentIntelligence` | function | 12553 |
| `getAllTimeOpponentNames` | function | 2492 |
| `getAllTimeOpponentTopScorers` | function | 12561 |
| `getAllTimePenaltyRows` | function | 10472 |
| `getAllTimePlayerRows` | function | 9463 |
| `getAlltimeRank` | function | 13130 |
| `getAlltimeRecencyWeight` | function | 10532 |
| `getAllTimeSgOnlyRows` | function | 9498 |
| `getAssistDiagnostics` | function | 4828 |
| `getAssistPlayersFromEvent` | function | 2924 |
| `getCarryPerformanceRows` | function | 10418 |
| `getComparisonAlltimeTeamGoals` | function | 13221 |
| `getComparisonAlltimeTrend` | function | 13295 |
| `getComparisonChemistryFromEvents` | function | 13229 |
| `getComparisonClutchFromEvents` | function | 13234 |
| `getComparisonCurrentSelection` | function | 13360 |
| `getComparisonEventsForItem` | function | 13678 |
| `getComparisonPlayerOptions` | function | 13302 |
| `getComparisonPlayerRow` | function | 13203 |
| `getComparisonProfile` | function | 13264 |
| `getComparisonRosterGames` | function | 13698 |
| `getComparisonRosterGamesForSeason` | function | 13681 |
| `getComparisonSeasonEvents` | function | 13224 |
| `getComparisonSeasonLabel` | function | 13206 |
| `getComparisonSeasonTrend` | function | 13269 |
| `getComparisonStyleProfile` | function | 13239 |
| `getComparisonTeamGoalsForSeason` | function | 13209 |
| `getComparisonVariantsForPlayer` | function | 13320 |
| `getDifficultConnectionRowsForPlayer` | function | 11806 |
| `getDuoDirectScorerGameCounts` | function | 10839 |
| `getDuoFieldPlayerRows` | function | 11281 |
| `getDuoRowsForPlayerScope` | function | 10744 |
| `getDuoScorerCountsWithCandidate` | function | 10785 |
| `getDuoSharedFieldRows` | function | 11297 |
| `getEffectiveLineupData` | function | 6991 |
| `getEinsatzCenterGameDraft` | function | 7063 |
| `getEmptyState` | function | 15874 |
| `getFieldGameIdsForPlayer` | function | 2725 |
| `getFurtherSameDayUlmGames` | function | 4242 |
| `getGameDurationMinutes` | function | 4221 |
| `getGameId` | function | 6272 |
| `getGlobalAllTimeSnapshot` | function | 2418 |
| `getGlobalIdentityProfile` | function | 12717 |
| `getGlobalLoadableSeasonKeys` | function | 8389 |
| `getGlobalOpponentSpecialistProfile` | function | 14861 |
| `getGlobalPlayerBestSeason` | function | 10400 |
| `getGlobalPlayerMilestones` | function | 10583 |
| `getGlobalPlayerOpponentGameRows` | function | 14832 |
| `getGlobalPlayerPeakGame` | function | 10389 |
| `getGlobalPlayerTeamRecord` | function | 10363 |
| `getGlobalProfileEvents` | function | 10336 |
| `getGlobalRookieMilestone` | function | 10572 |
| `getGlobalRookieSeasonKey` | function | 10558 |
| `getGlobalSeasonStatRows` | function | 13114 |
| `getGlobalTopScorerMilestones` | function | 10545 |
| `getGoalieComparisonAlltimeTrend` | function | 13777 |
| `getGoalieComparisonSeasonTrend` | function | 13794 |
| `getGoalieDiagnostics` | function | 4814 |
| `getGoalieDnaRows` | function | 10003 |
| `getGoalieGameIdsForPlayer` | function | 2732 |
| `getGoalieOpponentName` | function | 4097 |
| `getGoalieOpponentTier` | function | 4101 |
| `getGoalScorerFromEvent` | function | 2890 |
| `getHallGoalieData` | function | 12927 |
| `getHallOfFamePlayerIdSet` | function | 10332 |
| `getHallOfFamePlayerRows` | function | 10329 |
| `getHallOfFameStats` | function | 12587 |
| `getJerseyNumber` | function | 2829 |
| `getLineupAllRows` | function | 18611 |
| `getLineupPlayerPool` | function | 18622 |
| `getLoadedSeasonPlayerUi` | function | 10358 |
| `getLoadedSeasonPointsByName` | function | 10302 |
| `getMatchcenterDirectOpponents` | function | 16015 |
| `getMatchcenterOpponents` | function | 15982 |
| `getOppStrength` | function | 3622 |
| `getOrCreatePlayerProfile` | function | 3769 |
| `getPenaltyBasePersonalMinutes` | function | 4257 |
| `getPenaltyDisciplineMinutes` | function | 4275 |
| `getPenaltyDisciplineType` | function | 4213 |
| `getPenaltyPersonalMinutes` | function | 4265 |
| `getPenaltySpecialTeamsMinutes` | function | 4254 |
| `getPhaseIndex` | function | 5111 |
| `getPlayedUlmGames` | function | 2807 |
| `getPlayerAlltimeFieldGames` | function | 2769 |
| `getPlayerAlltimeGoalieGames` | function | 2772 |
| `getPlayerAlltimeRoleGames` | function | 2750 |
| `getPlayerAlltimeStats` | function | 9506 |
| `getPlayerAlltimeTotalGames` | function | 2775 |
| `getPlayerFieldGames` | function | 2739 |
| `getPlayerGameRole` | function | 2710 |
| `getPlayerGoalieAlltimeStats` | function | 9527 |
| `getPlayerGoalieGames` | function | 2743 |
| `getPlayerGoalieSeasonStats` | function | 9522 |
| `getPlayerRegistryProfile` | function | 9514 |
| `getPlayerRoleAvailability` | function | 9557 |
| `getPlayerSeasonRoleGameSummary` | function | 2784 |
| `getPlayerSeasonStats` | function | 9501 |
| `getPlayerSourceId` | function | 2826 |
| `getPreClubHistoryPlayerNames` | function | 2530 |
| `getPreviousSeasonKey` | function | 10257 |
| `getRosterEntryRegistryProfile` | function | 10735 |
| `getRosterGameIdsForPlayer` | function | 2651 |
| `getRosterImpactPlayerEventLookup` | function | 11872 |
| `getRosterImpactPlayerGames` | function | 11943 |
| `getRosterStatus` | function | 10538 |
| `getScoreLabel` | function | 15764 |
| `getSeasonApiBaseUrl` | function | 1838 |
| `getSeasonDataPreview` | function | 6622 |
| `getSeasonDataState` | function | 22909 |
| `getSeasonIdentityProfile` | function | 10492 |
| `getSeasonmanagerRosterSuggestion` | function | 7405 |
| `getSeasonOriginBaseUrl` | function | 1858 |
| `getSeasonPlayerFieldBasis` | function | 8894 |
| `getSeasonScopedIdentityProfile` | function | 8925 |
| `getSeasonTeamGameIds` | function | 2823 |
| `getSeasonTeamGames` | function | 2819 |
| `getSeasonUiPlayerForProfile` | function | 10488 |
| `getSpecialTeamsDiagnostics` | function | 4821 |
| `getSpecialTeamsPenaltyChunks` | function | 4278 |
| `getStaticSeasonGames` | function | 6122 |
| `getStoredLastView` | function | 3457 |
| `getSyntheticLineupPlayers` | function | 18588 |
| `getSyntheticLineupRow` | function | 18591 |
| `getSyntheticLineupRows` | function | 18608 |
| `getTeamAllTimeRecords` | function | 12511 |
| `getTeamLogoUrlForStory` | function | 20592 |
| `getUlmTeamStatus` | function | 2505 |
| `getUniqueAllTimeOpponentNames` | function | 2500 |
| `globalSearchEntries` | function | 23331 |
| `globalSearchIsEditableTarget` | function | 23380 |
| `globalSearchKeyAction` | function | 23386 |
| `globalSearchMatch` | function | 23368 |
| `globalSearchMatchdayScore` | function | 23354 |
| `globalSearchOnKeydown` | function | 23481 |
| `globalSearchPlayerScore` | function | 23345 |
| `globalSearchTokens` | function | 23326 |
| `goalieApplySampleConfidence` | function | 9684 |
| `goalieBucketLooseSum` | function | 9692 |
| `goalieBucketRows` | function | 9604 |
| `goalieClampScore` | function | 9649 |
| `goalieDetailFirstTime` | function | 9628 |
| `goalieDnaKey` | function | 9912 |
| `goalieDnaValue` | function | 9917 |
| `goalieEntryRecognitionReason` | function | 2674 |
| `goalieEventAbsSeconds` | function | 4077 |
| `goalieEventSecondInPeriod` | function | 9635 |
| `goalieGameDurationSeconds` | function | 4080 |
| `goalieGameStateBeforeGoal` | function | 4085 |
| `goalieInverseScore` | function | 9653 |
| `goalieNum` | function | 9590 |
| `goaliePctText` | function | 9641 |
| `goaliePositiveCurveScore` | function | 9669 |
| `goaliePositiveScore` | function | 9661 |
| `goalieSafeNum` | function | 9645 |
| `goalieStateGoals` | function | 9924 |
| `goalieStdDev` | function | 9622 |
| `goalieTierMeta` | function | 9613 |
| `goalieTime` | function | 9596 |
| `goalieTopRow` | function | 9610 |
| `goalieWeightedScore` | function | 9678 |
| `goToMainNavPoint` | window | 22595 |
| `hallGoalieExplainForLabel` | function | 12964 |
| `hallGoalieNameHtml` | function | 12943 |
| `hallGoalieNum` | function | 12829 |
| `hallGoaliePkStats` | function | 12855 |
| `hallGoalieRowFromStats` | function | 12894 |
| `hallGoalieSeasonLabel` | function | 12843 |
| `hallGoalieSeasonScore` | function | 12874 |
| `hallGoalieTime` | function | 12835 |
| `hallGoalieTooltip` | function | 12960 |
| `hallGoalieTopteamStats` | function | 12867 |
| `handleComparisonDuoSearchKey` | window | 13468 |
| `hasEmbeddedSeasonData` | function | 8386 |
| `hashSegmentToSeasonKey` | function | 3164 |
| `hasSeasonRole` | function | 5500 |
| `hasSeasonSource` | function | 8382 |
| `hofIntroDelay` | function | 8538 |
| `identityClutchGoalsVsTeams` | function | 5383 |
| `identityDecisiveGoalsVsTeams` | function | 5386 |
| `identityGoalsVsTeams` | function | 5380 |
| `identityInputs` | function | 5415 |
| `identityLateGoalsVsTeams` | function | 5389 |
| `identityOpponentGroups` | function | 5339 |
| `identityPartnerStats` | function | 5325 |
| `identityPointsVsTeams` | function | 5377 |
| `incGoalieBucket` | function | 4068 |
| `incrementUniqueCounter` | function | 3724 |
| `initGlobalSearch` | function | 23503 |
| `initHashRouting` | function | 3588 |
| `initToolMenu` | function | 23601 |
| `invalidateGlobalIdentityCache` | function | 2243 |
| `isActiveAlltimeSeasonStats` | function | 10507 |
| `isComebackRelevantGoal` | function | 5373 |
| `isDecisiveGoal` | function | 5359 |
| `isEinsatzCenterGameFromDraft` | function | 7000 |
| `isExcludedGoalieAppearance` | function | 2684 |
| `isFieldAppearance` | function | 2721 |
| `isGamePlayed` | function | 3023 |
| `isGoalieAppearance` | function | 2717 |
| `isGoalieRosterEntry` | function | 2660 |
| `isHallOfFameEligiblePlayer` | function | 10323 |
| `isHallRowPureSG` | function | 12844 |
| `isImportantClutchGoal` | function | 5354 |
| `isLateGoal` | function | 5367 |
| `isMatchPenaltyEvent` | function | 4205 |
| `isNewSeasonDataState` | function | 22930 |
| `isOwnGoalEvent` | function | 4295 |
| `isPenaltyGoalEvent` | function | 4288 |
| `isPreClubHistoryPlayerName` | function | 2533 |
| `isPureSGPlayer` | function | 9487 |
| `isRookieCandidateForSeason` | function | 10292 |
| `isSameUlmTeamContext` | function | 4234 |
| `isSeasonDataPreviewStale` | function | 6630 |
| `isSgOnlyAlltimePlayer` | function | 9479 |
| `isSgOnlyHallOfFameExcluded` | function | 10314 |
| `isSyntheticLineupPlayerId` | function | 18585 |
| `isToolMenuOpen` | function | 23539 |
| `isTwoPlusTwoPenaltyEvent` | function | 4209 |
| `isUsableExternalSeasonData` | function | 6205 |
| `isValidAsOfDate` | function | 3168 |
| `isValidAsOfStartTime` | function | 3171 |
| `isVisibleSecondaryTrait` | function | 8796 |
| `kpiBadge` | function | 14186 |
| `kpiDelta` | function | 13905 |
| `kpiItemColor` | function | 13911 |
| `kpiNiceMax` | function | 14076 |
| `kpiRadarValue` | function | 13999 |
| `kpiTrendRows` | function | 14082 |
| `kpiValueText` | function | 13901 |
| `lexiconEntry` | function | 15570 |
| `lexiconUniqueKeys` | function | 15562 |
| `lineupAverage` | function | 18637 |
| `lineupBuilderPoolIds` | function | 2300 |
| `lineupCombinationIds` | function | 19114 |
| `lineupDirectChemistryScore` | function | 19158 |
| `lineupEvaluateComplementCandidate` | function | 19165 |
| `lineupGroupDisplayName` | function | 6909 |
| `lineupLevelLabel` | function | 18641 |
| `lineupOpponentDNAForContext` | function | 18738 |
| `lineupPlayerAnchorConfidence` | function | 19264 |
| `lineupPlayerAnchorScore` | function | 19244 |
| `lineupPlayerProfile` | function | 18842 |
| `lineupRankCandidateIds` | function | 19099 |
| `lineupRecommendationReason` | function | 19340 |
| `lineupRoleDnaComplementScore` | function | 19134 |
| `lineupRosterGamesForPlayer` | function | 18647 |
| `lineupRowMap` | function | 19096 |
| `lineupRowMeta` | function | 18614 |
| `lineupScore` | function | 18631 |
| `lineupStdDev` | function | 19128 |
| `linkUiPlayersToRegistry` | function | 3856 |
| `loadEinsatzCenterMismatchedAutosave` | function | 7320 |
| `loadSeason` | function | 8462 |
| `loadSeasonData` | function | 7905 |
| `loadSeasonForGlobal` | function | 8414 |
| `loadSeasonManifest` | function | 6137 |
| `mainNavActiveKeyForPage` | function | 22589 |
| `markFieldRoleAppearance` | function | 3831 |
| `matchcenterAddDuoConnection` | function | 16417 |
| `matchcenterAddPlanItem` | function | 17634 |
| `matchcenterAddPlanWatch` | function | 17640 |
| `matchcenterAddUlmDuoConnection` | function | 16568 |
| `matchcenterAddUlmScoring` | function | 16195 |
| `matchcenterAnalyzeDirect` | function | 16048 |
| `matchcenterAnalyzeForm` | function | 16085 |
| `matchcenterBuildCoachActivationHints` | function | 18382 |
| `matchcenterBuildCoachAvoidList` | function | 18372 |
| `matchcenterBuildCoachDangerPatterns` | function | 18354 |
| `matchcenterBuildCoachHints` | function | 18110 |
| `matchcenterBuildCoachIfThen` | function | 18362 |
| `matchcenterBuildCoachKeyActors` | function | 18389 |
| `matchcenterBuildCoachLevers` | function | 18344 |
| `matchcenterBuildCoachPriorities` | function | 18337 |
| `matchcenterBuildGoalieMatchup` | function | 16769 |
| `matchcenterBuildInsights` | function | 17056 |
| `matchcenterBuildIntelHeadline` | function | 18126 |
| `matchcenterBuildIntelligenceDataQuality` | function | 17742 |
| `matchcenterBuildIntelligenceSignals` | function | 18147 |
| `matchcenterBuildIntelListFromPlan` | function | 18101 |
| `matchcenterBuildMatchPlan` | function | 19459 |
| `matchcenterBuildOneThingToWatch` | function | 18134 |
| `matchcenterBuildOpponentAlarm` | function | 17991 |
| `matchcenterBuildOpponentDNA` | function | 17812 |
| `matchcenterBuildOpponentDuoInsights` | function | 16516 |
| `matchcenterBuildOpponentDuos` | function | 16471 |
| `matchcenterBuildPlanConfidence` | function | 17646 |
| `matchcenterBuildSpecialTeamsMatchup` | function | 16699 |
| `matchcenterBuildTimingAnalysis` | function | 16895 |
| `matchcenterBuildTimingInsights` | function | 16884 |
| `matchcenterBuildUlmDuoInsights` | function | 16666 |
| `matchcenterBuildUlmDuos` | function | 16623 |
| `matchcenterBuildUlmPlayerInsights` | function | 16360 |
| `matchcenterBuildUlmPlayerScouting` | function | 16305 |
| `matchcenterClassifyUlmGoalEvent` | function | 16184 |
| `matchcenterCoachAdd` | function | 18274 |
| `matchcenterCoachCautious` | function | 18271 |
| `matchcenterCoachGameModel` | function | 18283 |
| `matchcenterCoachPriorityFromAlarm` | function | 18327 |
| `matchcenterConfidenceClass` | function | 17621 |
| `matchcenterDateLabel` | function | 15924 |
| `matchcenterDefaultSeasonKey` | function | 15962 |
| `matchcenterDeriveOpponentType` | function | 17925 |
| `matchcenterDirectContextGames` | function | 16679 |
| `matchcenterDuoDirectionLabel` | function | 16410 |
| `matchcenterDuoPairKey` | function | 16373 |
| `matchcenterEmptyBuckets` | function | 16125 |
| `matchcenterEmptyTimingStats` | function | 16830 |
| `matchcenterEnsureOpponentDuo` | function | 16377 |
| `matchcenterEnsureUlmDuo` | function | 16530 |
| `matchcenterEnsureUlmPlayer` | function | 16133 |
| `matchcenterFinalizeOpponentDuos` | function | 16436 |
| `matchcenterFinalizeUlmDuos` | function | 16587 |
| `matchcenterFinalizeUlmPlayers` | function | 16236 |
| `matchcenterFormLine` | function | 17051 |
| `matchcenterGameLine` | function | 17045 |
| `matchcenterGoalAbsSeconds` | function | 16817 |
| `matchcenterGoalieFitScore` | function | 16752 |
| `matchcenterGoalieKey` | function | 16747 |
| `matchcenterInferPriority` | function | 17627 |
| `matchcenterIntelAddAlarm` | function | 17970 |
| `matchcenterIntelCurve` | function | 17694 |
| `matchcenterIntelDataLabel` | function | 17739 |
| `matchcenterIntelDuoRef` | function | 17956 |
| `matchcenterIntelInverseCurve` | function | 17700 |
| `matchcenterIntelPct` | function | 17719 |
| `matchcenterIntelPlayerRef` | function | 17943 |
| `matchcenterIntelPriorityClass` | function | 17729 |
| `matchcenterIntelPriorityFromScore` | function | 17723 |
| `matchcenterIntelPriorityLabel` | function | 17735 |
| `matchcenterIntelRate` | function | 17715 |
| `matchcenterIntelWeighted` | function | 17704 |
| `matchcenterIsFreiburgTuebingenTeamName` | function | 15949 |
| `matchcenterOpponentMode` | function | 15979 |
| `matchcenterPct` | function | 16695 |
| `matchcenterPersonalPenaltyMinutesForSide` | function | 16686 |
| `matchcenterPlanRateText` | function | 17613 |
| `matchcenterPlanScoreText` | function | 17609 |
| `matchcenterPriorityLabel` | function | 17618 |
| `matchcenterRegisterUlmProfileGame` | function | 16171 |
| `matchcenterResultClass` | function | 17036 |
| `matchcenterSeasonHasGames` | function | 15959 |
| `matchcenterSigned` | function | 15918 |
| `matchcenterSocialAdd` | function | 18451 |
| `matchcenterSocialCaption` | function | 18458 |
| `matchcenterSpecialTeamsForGame` | function | 16682 |
| `matchcenterStoryAddCandidate` | function | 20696 |
| `matchcenterStoryAddFact` | function | 20677 |
| `matchcenterStoryBestClutchDuo` | function | 20921 |
| `matchcenterStoryBestClutchPlayer` | function | 20877 |
| `matchcenterStoryCandidateForBudget` | function | 20734 |
| `matchcenterStoryCategoryForPlanFact` | function | 21006 |
| `matchcenterStoryCategoryLimit` | function | 20719 |
| `matchcenterStoryClutchFact` | function | 20854 |
| `matchcenterStoryClutchPriority` | function | 20955 |
| `matchcenterStoryCompetitionLabel` | function | 20958 |
| `matchcenterStoryCurrentStreak` | function | 20801 |
| `matchcenterStoryDirectFactCandidates` | function | 20971 |
| `matchcenterStoryDownloadFileName` | function | 19927 |
| `matchcenterStoryDuoClutchFact` | function | 20931 |
| `matchcenterStoryDuoClutchTotal` | function | 20913 |
| `matchcenterStoryDuoFact` | function | 20934 |
| `matchcenterStoryEstimateFactWeight` | function | 20690 |
| `matchcenterStoryFactKey` | function | 20684 |
| `matchcenterStoryFormFact` | function | 20819 |
| `matchcenterStoryFormFactCandidates` | function | 20830 |
| `matchcenterStoryInlineStat` | function | 20659 |
| `matchcenterStoryLastDuelLabel` | function | 20967 |
| `matchcenterStoryLateGoalsForOutcome` | function | 20850 |
| `matchcenterStoryLogoBase` | function | 20571 |
| `matchcenterStoryLogoForOpponent` | function | 20622 |
| `matchcenterStoryLooksArtificial` | function | 20687 |
| `matchcenterStoryNameClass` | function | 21127 |
| `matchcenterStoryNormalizePickOptions` | function | 20723 |
| `matchcenterStoryPickFactItems` | function | 20744 |
| `matchcenterStoryPickFacts` | function | 20797 |
| `matchcenterStoryPlanFactCandidates` | function | 20993 |
| `matchcenterStoryPlayerClutchFact` | function | 20887 |
| `matchcenterStoryPlayerClutchTotal` | function | 20869 |
| `matchcenterStoryRankRows` | function | 20663 |
| `matchcenterStoryRankText` | function | 20655 |
| `matchcenterStorySafeLogoUrl` | function | 20577 |
| `matchcenterStoryShortDuel` | function | 20962 |
| `matchcenterStoryTableRank` | function | 20637 |
| `matchcenterStoryUlmTableRank` | function | 20648 |
| `matchcenterStoryVisibleFacts` | function | 21133 |
| `matchcenterStoryWinlessStreak` | function | 20810 |
| `matchcenterTimeValue` | function | 16822 |
| `matchcenterTimingStatsForGames` | function | 16846 |
| `matchcenterUlmScoutingConfidence` | function | 16128 |
| `matchcenterUlmTeamLabelForGame` | function | 17040 |
| `matchcenterUpdateUlmSeasonRow` | function | 16177 |
| `matchcenterWindowForSecond` | function | 16839 |
| `matchdayFixtureCardHtml` | function | 22771 |
| `matchdayGameCardHtml` | function | 22746 |
| `matchdayLineupCardHtml` | function | 22739 |
| `matchdayLineupInfo` | function | 22727 |
| `matchdayUlmGames` | function | 22718 |
| `medianOrNull` | function | 4062 |
| `mergeDuoSet` | function | 4910 |
| `mergeGoalieSpecialTeamsStats` | function | 4535 |
| `mergeSpecialTeamsStats` | function | 4170 |
| `moveGlobalSearch` | function | 23465 |
| `noGoalStreakGoaliesForGame` | function | 13026 |
| `normalizeAssistPlayerName` | function | 2893 |
| `normalizeComparisonItem` | function | 13180 |
| `normalizeDuoComparisonItem` | function | 13424 |
| `normalizeEventPlayerRef` | function | 2832 |
| `normalizeLineupLines` | function | 2303 |
| `normalizePlayerName` | function | 2520 |
| `normalizeSecondaryTraits` | function | 5474 |
| `onGlobalSearchInput` | window | 23459 |
| `openAllTimePlayers` | window | 8530 |
| `openComparisonCenter` | window | 8700 |
| `openDuoProPicker` | window | 11711 |
| `openEinsatzCenter` | window | 6860 |
| `openGlobalSearch` | window | 23426 |
| `openHallOfFame` | window | 8676 |
| `openLexicon` | window | 8773 |
| `openLigaGegner` | window | 23183 |
| `openLineupBuilder` | window | 8751 |
| `openMatchcenter` | window | 8729 |
| `openMatchcenterStoryPreview` | window | 2256 |
| `openMatchday` | window | 22700 |
| `openMatchdayTimeline` | window | 22692 |
| `openOverview` | window | 22641 |
| `openSeason` | window | 8527 |
| `openToolMenu` | window | 23543 |
| `overviewCompactTableHtml` | function | 23000 |
| `overviewCrossSeasonTrendHtml` | function | 23059 |
| `overviewFormHtml` | function | 23018 |
| `overviewLastMatchdayText` | function | 22966 |
| `overviewLineupLinkHtml` | function | 23076 |
| `overviewMatchcenterLinkHtml` | function | 23073 |
| `overviewMatchdayEndMs` | function | 22871 |
| `overviewMatchdayStartMs` | function | 22865 |
| `overviewNextMatchdayHtml` | function | 22976 |
| `overviewOpponentLabel` | function | 22954 |
| `overviewOpponentPreviewHtml` | function | 23068 |
| `overviewRankChangeTile` | function | 23095 |
| `overviewRecordHtml` | function | 23052 |
| `overviewSeasonAwardHtml` | function | 23041 |
| `overviewSeasonBilanzHtml` | function | 23033 |
| `p1NarrativeKey` | function | 15838 |
| `paintGlobalSearchResults` | function | 23418 |
| `parseAppHash` | function | 3271 |
| `parseAsOfQueryValue` | function | 3310 |
| `parseComparisonVariant` | function | 13345 |
| `parseLastViewState` | function | 3445 |
| `parseSeasonDataState` | function | 22920 |
| `pct` | function | 5278 |
| `pctValue` | function | 12767 |
| `pdashBestPhase` | function | 14472 |
| `pdashInsight` | function | 14510 |
| `pdashInsights` | function | 14513 |
| `pdashNum` | function | 14456 |
| `pdashOpponentStrength` | function | 14490 |
| `pdashOpponentTier` | function | 14484 |
| `pdashPct` | function | 14460 |
| `pdashPhaseLabel` | function | 14464 |
| `pdashTopCount` | function | 14468 |
| `pdashTopOpponent` | function | 14480 |
| `pdashTopPartner` | function | 14476 |
| `penaltyRawText` | function | 4202 |
| `playerAppearedForUlmStatusInSeasonByName` | function | 10273 |
| `playerAppearedInSeasonByName` | function | 10262 |
| `playerExplainAdd` | function | 15146 |
| `playerExplainConfidence` | function | 15137 |
| `playerExplainConfidenceLabel` | function | 15143 |
| `playerExplainContextSentence` | function | 15182 |
| `playerExplainHeadline` | function | 15172 |
| `playerExplainRolePhrase` | function | 15163 |
| `playerExplainStyleSignature` | function | 15151 |
| `playerRoleInGame` | function | 2705 |
| `processGame` | function | 2957 |
| `rAlltimeKpis` | function | 13136 |
| `rAlltimePlayerDashboard` | function | 14665 |
| `rAllTimePlayersPage` | function | 15427 |
| `rankNarratives` | function | 15860 |
| `rAntiSynergyCompareChip` | function | 12106 |
| `rAntiSynergyDelta` | function | 12090 |
| `rAntiSynergyMainDelta` | function | 12153 |
| `rAntiSynergyMetricRow` | function | 12114 |
| `rAntiSynergyWinrateRow` | function | 12136 |
| `rAntiSynergyWinrateText` | function | 12130 |
| `rAsOfSelector` | function | 23204 |
| `ratio01` | function | 5279 |
| `rAvgResponseTimeNote` | function | 12387 |
| `rCarryPerformanceRows` | function | 10434 |
| `rClassicRoleTags` | function | 8882 |
| `rClassicTagTip` | function | 8820 |
| `rClutch` | function | 9113 |
| `rClutchBadge` | function | 8782 |
| `rComparisonCenterPage` | function | 14335 |
| `rComparisonDashboard` | function | 14286 |
| `rComparisonDuoSearchBox` | function | 13654 |
| `rComparisonDuoSuggestionButtons` | function | 13447 |
| `rComparisonMiniOverview` | function | 14274 |
| `rComparisonModeSelect` | function | 13675 |
| `rComparisonRoles` | function | 14278 |
| `rComparisonStyles` | function | 14297 |
| `rContextBar` | function | 23287 |
| `rDifficultConnectionList` | function | 12163 |
| `rDifficultConnectionListCompact` | function | 12230 |
| `rDifficultConnectionListCompactLegacy` | function | 12188 |
| `rDifficultConnectionsCard` | function | 12269 |
| `rDuoCenterPro` | function | 11553 |
| `rDuoCompareSummaryCards` | function | 13533 |
| `rDuoComparisonBars` | function | 13528 |
| `rDuoComparisonChemistry` | function | 13586 |
| `rDuoComparisonContext` | function | 13618 |
| `rDuoComparisonDashboard` | function | 13640 |
| `rDuoComparisonDetails` | function | 13636 |
| `rDuoComparisonImpact` | function | 13602 |
| `rDuoComparisonPage` | function | 13664 |
| `rDuoComparisonProfile` | function | 13564 |
| `rDuoProPlayerSelect` | function | 11740 |
| `rDuoResponseMomentumCard` | function | 12445 |
| `rDuoRows` | function | 10693 |
| `recommendLineComplements` | function | 19431 |
| `recordOverviewVisit` | function | 22939 |
| `registerPlayerIdentity` | function | 3803 |
| `registerSeasonRosters` | function | 3836 |
| `rEinsatzCenterAutosaveBanner` | function | 7282 |
| `rEinsatzCenterCombo` | function | 6805 |
| `rEinsatzCenterComboEditor` | function | 7510 |
| `rEinsatzCenterDraftBanner` | function | 7023 |
| `rEinsatzCenterDraftMark` | function | 7009 |
| `rEinsatzCenterDraftStatsHint` | function | 7013 |
| `rEinsatzCenterEditPage` | function | 7610 |
| `rEinsatzCenterGameCard` | function | 6814 |
| `rEinsatzCenterGameEditor` | function | 7557 |
| `rEinsatzCenterGroup` | function | 6792 |
| `rEinsatzCenterGroupEditor` | function | 7479 |
| `rEinsatzCenterPage` | function | 6833 |
| `rEinsatzCenterRosterSuggestionCard` | function | 7526 |
| `rEinsatzCenterStats` | function | 6915 |
| `relative01` | function | 5280 |
| `removeComparisonDuo` | window | 13498 |
| `removeComparisonItem` | window | 13410 |
| `removeEinsatzCenterCombo` | window | 7847 |
| `removeEinsatzCenterGroup` | window | 7761 |
| `removeEinsatzCenterGroupPlayer` | window | 7811 |
| `removeEinsatzCenterRosterPlayer` | window | 7692 |
| `removeLineupBuilderPlayerFromLine` | window | 2350 |
| `removeLineupPlayer` | window | 2291 |
| `rEmptyState` | function | 15886 |
| `renameEinsatzCenterGroup` | window | 7783 |
| `render` | function | 21926 |
| `renderComparisonDuoSuggestions` | function | 13451 |
| `renderTags` | function | 8890 |
| `repairRenderedMojibake` | function | 2466 |
| `resetPlayerRegistrySeason` | function | 3748 |
| `resolveAssistPlayer` | function | 2938 |
| `resolveCurrentSeasonKey` | function | 6168 |
| `resolveGoalScorerPlayer` | function | 2875 |
| `resolveLineupPlayerName` | function | 6777 |
| `resolvePlayerRoleView` | function | 9575 |
| `resolveRosterPlayerByRef` | function | 2844 |
| `responseExcerpt` | function | 6006 |
| `responseMomentumAbsSeconds` | function | 10875 |
| `responseMomentumActor` | function | 10901 |
| `responseMomentumConfidence` | function | 11034 |
| `responseMomentumEmptyState` | function | 11039 |
| `responseMomentumGameRows` | function | 10885 |
| `responseMomentumGoalActors` | function | 10912 |
| `responseMomentumPairKey` | function | 11047 |
| `responseMomentumSide` | function | 10892 |
| `responseMomentumTime` | function | 10878 |
| `responseMomentumTooltipFor` | function | 12350 |
| `restoreEinsatzCenterAutosave` | function | 7256 |
| `restoreHallOfFameIntroPrevious` | function | 8618 |
| `resultGoalsAgainstForSide` | function | 4106 |
| `returnToEinsatzCenterEdit` | window | 7678 |
| `rGlobalAllTimeStats` | function | 14773 |
| `rGlobalCareerHeader` | function | 14682 |
| `rGlobalDevelopment` | function | 14791 |
| `rGlobalDnaBars` | function | 14426 |
| `rGlobalDuoNetwork` | function | 14891 |
| `rGlobalOpponentSpecialist` | function | 15090 |
| `rGlobalOverview` | function | 14720 |
| `rGlobalPartnerOpponentPanel` | function | 14668 |
| `rGlobalProfileTags` | function | 12758 |
| `rGlobalSearchPanelHtml` | function | 23415 |
| `rGlobalSearchResultsHtml` | function | 23404 |
| `rGlobalSearchToggle` | function | 23401 |
| `rGoalieAnalysis` | function | 10230 |
| `rGoalieBars` | function | 9858 |
| `rGoalieDnaBars` | function | 10007 |
| `rGoalieFirstGoalResistance` | function | 10065 |
| `rGoalieInsights` | function | 10138 |
| `rGoalieKpis` | function | 10042 |
| `rGoalieMiniMetrics` | function | 10059 |
| `rGoalieMomentum` | function | 10079 |
| `rGoalieOpponents` | function | 10181 |
| `rGoalieOverview` | function | 10160 |
| `rGoaliePhaseProfile` | function | 10121 |
| `rGoaliePhases` | function | 10178 |
| `rGoalieRoleTraits` | function | 9999 |
| `rGoalieScoringRow` | function | 10021 |
| `rGoalieStability` | function | 10193 |
| `rGoalieTable` | function | 10222 |
| `rGoalieTierCards` | function | 10093 |
| `rHallDuoTemple` | function | 12820 |
| `rHallGoalieAwardCards` | function | 13060 |
| `rHallGoalieLegends` | function | 13081 |
| `rHallGoalieRankCard` | function | 12979 |
| `rHallOfFameHero` | function | 12771 |
| `rHallOfFamePage` | function | 15469 |
| `rHallPodiumList` | function | 12797 |
| `rHallSGBadge` | function | 12852 |
| `rIaShell` | function | 23307 |
| `rIdentityCards` | function | 8856 |
| `rIdentityTags` | function | 8836 |
| `rInsights` | function | 9374 |
| `rInteractiveDuoCenterPro` | function | 11747 |
| `rKpiCards` | function | 13914 |
| `rKpiExtendedMetrics` | function | 14061 |
| `rKpiInfoCards` | function | 14196 |
| `rKpiMetricCard` | function | 14053 |
| `rKpiMirrorRows` | function | 13939 |
| `rKpiObjectMini` | function | 14189 |
| `rKpiOpponentStrength` | function | 14158 |
| `rKpiRadar` | function | 14010 |
| `rKpiShareBars` | function | 14045 |
| `rKpiTextMetricCard` | function | 14058 |
| `rKpiTrendCompare` | function | 14091 |
| `rKPIVergleich` | function | 14260 |
| `rLexiconPage` | function | 15584 |
| `rLexiconRows` | function | 15580 |
| `rLigaGegnerPlaceholderPage` | function | 23187 |
| `rLineupBuilderAvailablePanel` | function | 20293 |
| `rLineupBuilderPage` | function | 20469 |
| `rLineupComplementCards` | function | 20390 |
| `rLineupMetricPills` | function | 20279 |
| `rLineupRecommendationCards` | function | 20341 |
| `rLineupRecommendationMode` | function | 20356 |
| `rLineupScoreRows` | function | 20175 |
| `rLineupSimpleCards` | function | 20197 |
| `rLineupTestLine` | function | 20403 |
| `rLineupTestMode` | function | 20452 |
| `rMainNav` | function | 22602 |
| `rMainNavBottom` | function | 22624 |
| `rMatchcenterCoachCardList` | function | 19754 |
| `rMatchcenterCoachIfThen` | function | 19768 |
| `rMatchcenterCoachSimpleList` | function | 19776 |
| `rMatchcenterCopyButton` | function | 19846 |
| `rMatchcenterDetailsSection` | function | 17028 |
| `rMatchcenterDigitalCoach` | function | 19781 |
| `rMatchcenterDuoRankCard` | function | 17347 |
| `rMatchcenterDuoRow` | function | 17323 |
| `rMatchcenterDuosTab` | function | 17494 |
| `rMatchcenterDuoWatchCard` | function | 17303 |
| `rMatchcenterFormCard` | function | 17084 |
| `rMatchcenterFormSection` | function | 17002 |
| `rMatchcenterGamesList` | function | 17105 |
| `rMatchcenterGoalieCard` | function | 17556 |
| `rMatchcenterGoalieMatchup` | function | 17580 |
| `rMatchcenterIntelCoachHints` | function | 19740 |
| `rMatchcenterIntelOverview` | function | 19694 |
| `rMatchcenterKpi` | function | 17077 |
| `rMatchcenterLineupBuilder` | function | 20206 |
| `rMatchcenterLockerList` | function | 19851 |
| `rMatchcenterLockerRoomSheet` | function | 19863 |
| `rMatchcenterMatchPlan` | function | 20548 |
| `rMatchcenterOpponentAlarm` | function | 19672 |
| `rMatchcenterOpponentDNA` | function | 19639 |
| `rMatchcenterOpponentDuos` | function | 17451 |
| `rMatchcenterOpponentScouting` | function | 17264 |
| `rMatchcenterPage` | function | 21379 |
| `rMatchcenterPlanItems` | function | 19605 |
| `rMatchcenterPlanWatch` | function | 19623 |
| `rMatchcenterPlayerRow` | function | 17138 |
| `rMatchcenterPlayersTab` | function | 17300 |
| `rMatchcenterProfileSection` | function | 16982 |
| `rMatchcenterRankCard` | function | 17162 |
| `rMatchcenterResponseMomentum` | function | 12472 |
| `rMatchcenterScoutingSummary` | function | 20504 |
| `rMatchcenterSocialBlock` | function | 19919 |
| `rMatchcenterSocialMediaCenter` | function | 20121 |
| `rMatchcenterSpecialCard` | function | 17497 |
| `rMatchcenterSpecialTeams` | function | 17506 |
| `rMatchcenterStoryForm` | function | 21169 |
| `rMatchcenterStoryFrame` | function | 21252 |
| `rMatchcenterStoryLogo` | function | 21164 |
| `rMatchcenterStoryPlayerCard` | function | 21174 |
| `rMatchcenterStoryPreview` | function | 21182 |
| `rMatchcenterTabs` | function | 16979 |
| `rMatchcenterTimeBars` | function | 16906 |
| `rMatchcenterTiming` | function | 16940 |
| `rMatchcenterTimingStatsCard` | function | 16920 |
| `rMatchcenterUlmDuoRankCard` | function | 17402 |
| `rMatchcenterUlmDuoRow` | function | 17379 |
| `rMatchcenterUlmDuos` | function | 17408 |
| `rMatchcenterUlmDuoWatchCard` | function | 17353 |
| `rMatchcenterUlmImpactCard` | function | 17168 |
| `rMatchcenterUlmPlayerRow` | function | 17197 |
| `rMatchcenterUlmRankCard` | function | 17221 |
| `rMatchcenterUlmScouting` | function | 17227 |
| `rMatchcenterWatchCard` | function | 17117 |
| `rMatchdayDetailPage` | function | 22800 |
| `rMatchdayPage` | function | 22840 |
| `rMatchdayTimelinePage` | function | 22789 |
| `rMatchdayTimelineRow` | function | 22781 |
| `rMatrix` | function | 8986 |
| `rmTerm` | function | 12357 |
| `roleGameStableKey` | function | 2747 |
| `roleTraitLabel` | function | 8793 |
| `rOppBreakdown` | function | 9278 |
| `rOpponentIntelBars` | function | 10657 |
| `rOpponentTopScorerTable` | function | 12611 |
| `rosterImpactConfidence` | function | 11985 |
| `rosterImpactConfidenceWeight` | function | 11999 |
| `rosterPlayerMatches` | function | 2636 |
| `rOverviewPage` | function | 23171 |
| `rPdashLabel` | function | 14617 |
| `rPdashStat` | function | 14620 |
| `rPenalties` | function | 9259 |
| `rPhases` | function | 9043 |
| `rPlayerDash` | function | 14623 |
| `rPlayerDashStyles` | function | 14605 |
| `rPlayerExplainItems` | function | 15369 |
| `rPlayerExplanation` | function | 15374 |
| `rPlayerResponseMomentumCard` | function | 12426 |
| `rPlayerRoleSwitch` | function | 9583 |
| `rRadar` | function | 9063 |
| `rRes` | const-arrow | 8781 |
| `rResponseMomentumOverviewCard` | function | 12402 |
| `rResponseRateDisplay` | function | 12366 |
| `rRmKpi` | function | 12373 |
| `rRmTopList` | function | 12391 |
| `rRoleTraitTip` | function | 8800 |
| `rRosterImpactStatLine` | function | 12145 |
| `rRosterStatusBadge` | function | 8809 |
| `rScoreBreakdown` | function | 15900 |
| `rSeasonDataPreviewCard` | function | 6649 |
| `rSeasonDataPreviewContextHint` | function | 23239 |
| `rSeasonDataPreviewRows` | function | 6639 |
| `rSeasonDataPreviewStatus` | function | 6636 |
| `rSeasonDataStateContextHint` | function | 23256 |
| `rSeasonDuoCenterPro` | function | 11803 |
| `rSeasonDuoSummary` | function | 9033 |
| `rSeasonInsightsTab` | function | 9359 |
| `rSeasonLandingPage` | function | 14704 |
| `rSeasonPlayerDashboard` | function | 14662 |
| `rSeasonProfileKpis` | function | 8942 |
| `rSeasonProfileTagStrip` | function | 8972 |
| `rSeasonTrendRows` | function | 14386 |
| `rSocialVideoBlock` | function | 19988 |
| `rSparkline` | function | 13150 |
| `rStyleMetricTip` | function | 8805 |
| `rStyleProfileBars` | function | 8845 |
| `rTable` | function | 9428 |
| `rTeamNoGoalStreakCard` | function | 21538 |
| `rTeamPage` | function | 21550 |
| `rTeamResponseMomentumCard` | function | 12465 |
| `rTimeline` | function | 9148 |
| `rToolMenu` | function | 23529 |
| `runComparison` | window | 13415 |
| `runDuoComparison` | window | 13503 |
| `saveLastView` | function | 3462 |
| `scoreNarrative` | function | 15841 |
| `seasonApiUrl` | function | 1855 |
| `seasonDataPreviewRerender` | function | 6495 |
| `seasonDataPreviewRow` | function | 6499 |
| `seasonGameApiUrls` | function | 1873 |
| `seasonGameHtmlUrls` | function | 1883 |
| `seasonHasPureUlmTeam` | function | 10307 |
| `seasonKeyToHashSegment` | function | 3161 |
| `seasonPathPrefix` | function | 1867 |
| `seasonRoleKeysForPlayer` | function | 5491 |
| `seasonRoleTraitsFromClassic` | function | 5486 |
| `seasonStatNumber` | function | 10497 |
| `seasonStatSetSize` | function | 10501 |
| `seedHallOfFameIntroParticles` | function | 8585 |
| `selectAllLineupAvailable` | window | 2337 |
| `selectComparisonDuoSuggestion` | window | 13461 |
| `selectComparisonMode` | window | 13422 |
| `selectComparisonPlayer` | window | 13379 |
| `selectDuoProQuick` | window | 11713 |
| `selectEinsatzCenterEditGame` | window | 7680 |
| `selectEnforcerKeys` | function | 5503 |
| `serializeFieldRoleSeasonStats` | function | 3979 |
| `serializeGoalieSeasonStats` | function | 3956 |
| `serializeSeasonStats` | function | 3941 |
| `serializeSpecialTeamsStats` | function | 4167 |
| `setAntiSynergyView` | window | 2383 |
| `setComparisonDuoMode` | window | 13432 |
| `setComparisonDuoPlayer` | window | 13481 |
| `setComparisonDuoSearch` | window | 13434 |
| `setComparisonDuoSeasonKey` | window | 13433 |
| `setComparisonRoleMode` | window | 13385 |
| `setComparisonVariant` | window | 13390 |
| `setContextAsOf` | window | 23217 |
| `setDuoProPickerState` | function | 11682 |
| `setDuoProSelection` | window | 11732 |
| `setEinsatzCenterGameNote` | window | 7854 |
| `setEinsatzCenterGroupPlayerPosition` | window | 7819 |
| `setEinsatzCenterIncludeDraft` | window | 7679 |
| `setEinsatzCenterSeason` | window | 6854 |
| `setGlobalPlayer` | window | 2409 |
| `setGlobalPlayerDuo` | window | 2410 |
| `setGlobalTab` | window | 2411 |
| `setGoalieTab` | window | 2250 |
| `setLineupActiveLine` | window | 2322 |
| `setLineupBuilderMode` | window | 2321 |
| `setLineupBuilderOpponent` | window | 2320 |
| `setLineupBuilderSeason` | window | 2308 |
| `setLineupNewPlayerProfile` | window | 2364 |
| `setMatchcenterContext` | window | 8770 |
| `setMatchcenterOpponent` | window | 8769 |
| `setMatchcenterSeason` | window | 8771 |
| `setMatchcenterTab` | window | 2255 |
| `setP` | window | 2247 |
| `setPage` | window | 2393 |
| `setPlayerRoleView` | window | 2249 |
| `setSeasonDataPreviewOpen` | window | 6685 |
| `setSeasonDataPreviewPasteText` | window | 6686 |
| `setState` | const-arrow | 2235 |
| `setTab` | window | 2248 |
| `showLineupComplements` | window | 2363 |
| `showMainShell` | function | 8377 |
| `socialDuoFocusLine` | function | 18481 |
| `socialEnsurePeriod` | function | 18467 |
| `socialFirstUseful` | function | 18471 |
| `socialKeyFactLine` | function | 18491 |
| `socialOpponentLine` | function | 18487 |
| `socialPlayerFocusLine` | function | 18474 |
| `socialSentence` | function | 18464 |
| `socialVideoJobsForMatchday` | function | 20022 |
| `specialTeamsStateFromActive` | function | 4299 |
| `stageSeasonDataPreview` | function | 6545 |
| `stageSeasonDataPreviewFromFile` | function | 6597 |
| `stageSeasonDataPreviewFromPaste` | function | 6611 |
| `startApp` | window | 8515 |
| `startEinsatzCenterDraftMode` | window | 7660 |
| `startHallOfFameIntro` | function | 8638 |
| `sumRoleGames` | function | 9551 |
| `switchMatchdaySeason` | window | 22711 |
| `switchOverviewSeason` | window | 22658 |
| `syncHashFromState` | function | 3404 |
| `t2s` | const-arrow | 2946 |
| `toggleAntiSynergyHideSgOnly` | window | 2385 |
| `toggleAntiSynergyShowAll` | window | 2384 |
| `toggleComparisonPicker` | window | 13409 |
| `toggleComparisonSgOnly` | window | 13394 |
| `toggleEinsatzCenterComboPlayer` | window | 7828 |
| `toggleEinsatzCenterGroupRename` | window | 7769 |
| `toggleEinsatzCenterRosterSuggestionPlayer` | window | 7700 |
| `toggleHallOfFamePureSGPlayers` | window | 2258 |
| `toggleLineupBuilderAvailable` | window | 2323 |
| `toggleMatchcenterDuoDetails` | window | 2254 |
| `toggleMatchcenterGames` | window | 8772 |
| `toggleMatchcenterPlayerDetails` | window | 2253 |
| `toggleMatchcenterSpecialTeamsGames` | window | 2252 |
| `toggleSgOnlyAlltime` | window | 2412 |
| `toggleSpecialTeamsGameDetails` | window | 2251 |
| `toggleToolMenu` | window | 23558 |
| `toolMenuElements` | function | 23533 |
| `toolMenuItemElements` | function | 23536 |
| `toolMenuOnClick` | function | 23594 |
| `toolMenuOnKeydown` | function | 23570 |
| `toPublicPlayerRegistry` | function | 3983 |
| `uiDatenstandBand` | function | 22410 |
| `uiDeltaIndicator` | function | 22175 |
| `uiFormatNumber` | function | 22147 |
| `uiHinweisKarte` | function | 22239 |
| `uiInfoIcon` | function | 22193 |
| `uiIntervallBalken` | function | 22315 |
| `uiKennzahlKachel` | function | 22205 |
| `uiKernaussage` | function | 22225 |
| `uiMethodenbox` | function | 22334 |
| `uiNotiz` | function | 22351 |
| `uiObjektseite` | function | 22499 |
| `uiObjektseiteSortTabs` | function | 22481 |
| `uiPlatzhalter` | function | 22431 |
| `uiQuoteText` | function | 22387 |
| `uiRangliste` | function | 22261 |
| `uiReliabilityDots` | function | 22160 |
| `uiVerlauf` | function | 22289 |
| `uniqueList` | function | 1870 |
| `updateCoverAllTimeStats` | function | 8404 |
| `updatePlayerRoleAvailability` | function | 4803 |
| `validateGameStructure` | function | 6306 |
| `validateMergedSeason` | function | 6393 |
| `validateSeasonGames` | function | 6347 |
| `validateSeasonKey` | function | 6370 |
| `validateWrapperFormat` | function | 6382 |
| `variance` | function | 2948 |
| `viewEinsatzCenterMergedView` | window | 7677 |
| `warnEventProcessingOnce` | function | 2628 |
| `withoutHashSync` | function | 3421 |

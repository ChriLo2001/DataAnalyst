# Code-Karte: index.html

<!-- index-map: source-sha256=03b0401899819e10b5af2d2c13d48711d3fc801d27f7fdca7fcb89751e913598 source-lines=23689 -->

Automatisch erzeugt von `scripts/build-index-map.mjs`. Nicht von Hand bearbeiten — bei Änderungen an index.html erneut ausführen: `node scripts/build-index-map.mjs --write`. Vor gezieltem Lesen prüfen, ob die Karte noch aktuell ist: `node scripts/build-index-map.mjs --check`.

index.html: 23689 Zeilen gesamt (SHA-256 `03b0401899819e10b5af2d2c13d48711d3fc801d27f7fdca7fcb89751e913598`). Statischer `<style>`-Block: Zeile 11–1550. Haupt-`<script>`-Block: Zeile 1664–23685.

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
| `buildSpecialTeamsForGame` | function | 4341–4536 | 196 |
| `addGoalieGameToStats` | function | 4596–4646 | 51 |
| `buildGoalieGameRecord` | function | 4648–4699 | 52 |
| `buildGoalieStatsForSeason` | function | 4701–4780 | 80 |
| `aggregateGoalieAlltimeStats` | function | 4782–4820 | 39 |
| `getAssistDiagnostics` | function | 4847–4899 | 53 |
| `buildPlayerEvents` | function | 5030–5125 | 96 |
| `computeMetrics` | function | 5145–5278 | 134 |
| `buildSoloDuoProfile` | function | 5300–5343 | 44 |
| `identityInputs` | function | 5434–5491 | 58 |
| `buildIdentityProfiles` | function | 5535–5766 | 232 |
| `assignStatus` | function | 5813–5998 | 186 |
| `fetchTextWithDiagnostics` | function | 6033–6062 | 30 |
| `fetchSeasonGameRaw` | function | 6098–6137 | 40 |
| `validateGameStructure` | function | 6325–6364 | 40 |
| `buildDryRunReport` | function | 6431–6493 | 63 |
| `stageSeasonDataPreview` | function | 6564–6615 | 52 |
| `rSeasonDataPreviewCard` | function | 6668–6703 | 36 |
| `computeEinsatzCenterStats` | function | 6897–6927 | 31 |
| `rEinsatzCenterStats` | function | 6934–6952 | 19 |
| `einsatzCenterDeserializeAutosave` | function | 7155–7188 | 34 |
| `rEinsatzCenterGroupEditor` | function | 7498–7528 | 31 |
| `rEinsatzCenterRosterSuggestionCard` | function | 7545–7575 | 31 |
| `rEinsatzCenterGameEditor` | function | 7576–7628 | 53 |
| `rEinsatzCenterEditPage` | function | 7629–7676 | 48 |
| `loadSeasonData` | function | 7924–8393 | 470 |
| `loadSeasonForGlobal` | function | 8433–8463 | 31 |
| `loadSeason` | function | 8481–8532 | 52 |
| `ensureHallOfFameIntroOverlay` | function | 8560–8592 | 33 |
| `rSeasonProfileKpis` | function | 8961–8989 | 29 |
| `rMatrix` | function | 9005–9049 | 45 |
| `rRadar` | function | 9082–9129 | 48 |
| `rClutch` | function | 9132–9164 | 33 |
| `rTimeline` | function | 9167–9275 | 109 |
| `rOppBreakdown` | function | 9297–9329 | 33 |
| `generatePlayerInsights` | function | 9332–9375 | 44 |
| `rInsights` | function | 9393–9444 | 52 |
| `buildGoalieAnalysisModel` | function | 9718–9876 | 159 |
| `buildGoalieRoleProfile` | function | 9944–10017 | 74 |
| `rGoalieInsights` | function | 10157–10178 | 22 |
| `rGoalieStability` | function | 10212–10240 | 29 |
| `buildOpponentIntelligence` | function | 10621–10674 | 54 |
| `buildBestThirdManOptions` | function | 10824–10857 | 34 |
| `getDuoDirectScorerGameCounts` | function | 10858–10889 | 32 |
| `buildAnnotatedGoalEventsForGame` | function | 10939–11052 | 114 |
| `buildResponseGoalStatsRaw` | function | 11095–11143 | 49 |
| `buildMomentumSwingStatsRaw` | function | 11156–11226 | 71 |
| `buildDuoFloorCeiling` | function | 11233–11274 | 42 |
| `buildDuoWithWithoutImpact` | function | 11370–11403 | 34 |
| `buildDuoCompatibility` | function | 11469–11491 | 23 |
| `buildDuoProAnalysis` | function | 11528–11571 | 44 |
| `rDuoCenterPro` | function | 11572–11691 | 120 |
| `rInteractiveDuoCenterPro` | function | 11766–11821 | 56 |
| `getDifficultConnectionRowsForPlayer` | function | 11825–11869 | 45 |
| `getRosterImpactPlayerGames` | function | 11962–12003 | 42 |
| `buildRosterImpactAnalysis` | function | 12037–12105 | 69 |
| `rDifficultConnectionList` | function | 12182–12206 | 25 |
| `rDifficultConnectionListCompactLegacy` | function | 12207–12248 | 42 |
| `rDifficultConnectionListCompact` | function | 12249–12287 | 39 |
| `rDifficultConnectionsCard` | function | 12288–12324 | 37 |
| `RESPONSE_MOMENTUM_TOOLTIPS` | const-data | 12327–12358 | 32 |
| `rResponseMomentumOverviewCard` | function | 12421–12444 | 24 |
| `rMatchcenterResponseMomentum` | function | 12491–12528 | 38 |
| `getTeamAllTimeRecords` | function | 12530–12570 | 41 |
| `getAllTimeIdentityStandings` | function | 12651–12685 | 35 |
| `buildRecencyWeightedGlobalIdentityProfile` | function | 12687–12734 | 48 |
| `rHallOfFameHero` | function | 12790–12815 | 26 |
| `hallGoalieRowFromStats` | function | 12913–12945 | 33 |
| `rHallGoalieRankCard` | function | 12998–13029 | 32 |
| `rHallGoalieAwardCards` | function | 13079–13099 | 21 |
| `rHallGoalieLegends` | function | 13100–13132 | 33 |
| `buildDuoComparison` | function | 13527–13546 | 20 |
| `rDuoCompareSummaryCards` | function | 13552–13582 | 31 |
| `rDuoComparisonPage` | function | 13683–13693 | 11 |
| `buildComparisonExtraMetrics` | function | 13738–13795 | 58 |
| `buildGoalieComparisonDataset` | function | 13832–13882 | 51 |
| `buildComparisonDataset` | function | 13883–13918 | 36 |
| `rKpiMirrorRows` | function | 13958–14017 | 60 |
| `rKpiRadar` | function | 14029–14063 | 35 |
| `rKpiTrendCompare` | function | 14110–14176 | 67 |
| `rKpiOpponentStrength` | function | 14177–14204 | 28 |
| `rKpiInfoCards` | function | 14215–14246 | 32 |
| `buildComparisonSummary` | function | 14247–14278 | 32 |
| `rComparisonStyles` | function | 14316–14353 | 38 |
| `rComparisonCenterPage` | function | 14354–14404 | 51 |
| `rGlobalDnaBars` | function | 14445–14474 | 30 |
| `buildSeasonPlayerDashModel` | function | 14544–14580 | 37 |
| `buildAlltimePlayerDashModel` | function | 14581–14623 | 43 |
| `rPlayerDashStyles` | function | 14624–14635 | 12 |
| `rPlayerDash` | function | 14642–14680 | 39 |
| `rGlobalOverview` | function | 14739–14790 | 52 |
| `rGlobalDevelopment` | function | 14810–14848 | 39 |
| `rGlobalDuoNetwork` | function | 14910–15107 | 198 |
| `rGlobalOpponentSpecialist` | function | 15109–15154 | 46 |
| `buildFieldPlayerExplanation` | function | 15220–15294 | 75 |
| `buildGoaliePlayerExplanation` | function | 15295–15348 | 54 |
| `buildPlayerIntelligence` | function | 15358–15387 | 30 |
| `rPlayerExplanation` | function | 15393–15444 | 52 |
| `rAllTimePlayersPage` | function | 15446–15486 | 41 |
| `rHallOfFamePage` | function | 15488–15576 | 89 |
| `rLexiconPage` | function | 15603–15775 | 173 |
| `buildConfidence` | function | 15792–15837 | 46 |
| `getMatchcenterOpponents` | function | 16001–16033 | 33 |
| `getMatchcenterDirectOpponents` | function | 16034–16064 | 31 |
| `matchcenterAnalyzeDirect` | function | 16067–16103 | 37 |
| `matchcenterEnsureUlmPlayer` | function | 16152–16189 | 38 |
| `matchcenterAddUlmScoring` | function | 16214–16254 | 41 |
| `matchcenterFinalizeUlmPlayers` | function | 16255–16323 | 69 |
| `matchcenterBuildUlmPlayerScouting` | function | 16324–16378 | 55 |
| `matchcenterEnsureOpponentDuo` | function | 16396–16428 | 33 |
| `matchcenterFinalizeOpponentDuos` | function | 16455–16489 | 35 |
| `matchcenterBuildOpponentDuos` | function | 16490–16534 | 45 |
| `matchcenterEnsureUlmDuo` | function | 16549–16586 | 38 |
| `matchcenterFinalizeUlmDuos` | function | 16606–16641 | 36 |
| `matchcenterBuildUlmDuos` | function | 16642–16684 | 43 |
| `matchcenterBuildSpecialTeamsMatchup` | function | 16718–16765 | 48 |
| `matchcenterBuildGoalieMatchup` | function | 16788–16833 | 46 |
| `matchcenterTimingStatsForGames` | function | 16865–16902 | 38 |
| `rMatchcenterUlmScouting` | function | 17246–17282 | 37 |
| `rMatchcenterOpponentScouting` | function | 17283–17318 | 36 |
| `rMatchcenterUlmDuos` | function | 17427–17469 | 43 |
| `rMatchcenterOpponentDuos` | function | 17470–17512 | 43 |
| `rMatchcenterSpecialTeams` | function | 17525–17574 | 50 |
| `matchcenterBuildPlanConfidence` | function | 17665–17712 | 48 |
| `matchcenterBuildIntelligenceDataQuality` | function | 17761–17830 | 70 |
| `matchcenterBuildOpponentDNA` | function | 17831–17943 | 113 |
| `matchcenterBuildOpponentAlarm` | function | 18010–18119 | 110 |
| `matchcenterBuildIntelligenceSignals` | function | 18166–18212 | 47 |
| `buildMatchIntelligenceFromContext` | function | 18213–18267 | 55 |
| `buildMatchStories` | function | 18316–18345 | 30 |
| `buildDigitalCoachReport` | function | 18416–18448 | 33 |
| `buildMatchdayCaptionBlocks` | function | 18520–18549 | 30 |
| `buildSocialMediaContent` | function | 18550–18598 | 49 |
| `lineupRosterGamesForPlayer` | function | 18666–18713 | 48 |
| `buildLineupExperienceProfile` | function | 18714–18756 | 43 |
| `buildLineupOpponentDNAFit` | function | 18769–18812 | 44 |
| `classifyLineIdentity` | function | 18813–18860 | 48 |
| `lineupPlayerProfile` | function | 18861–18936 | 76 |
| `buildLineupAnalysis` | function | 18937–19070 | 134 |
| `buildLineupScoreBreakdowns` | function | 19071–19100 | 30 |
| `lineupEvaluateComplementCandidate` | function | 19184–19262 | 79 |
| `buildTeamLineBalance` | function | 19288–19331 | 44 |
| `buildLineupRecommendations` | function | 19368–19449 | 82 |
| `matchcenterBuildMatchPlan` | function | 19478–19623 | 146 |
| `rMatchcenterOpponentDNA` | function | 19658–19690 | 33 |
| `rMatchcenterIntelOverview` | function | 19713–19758 | 46 |
| `rMatchcenterDigitalCoach` | function | 19800–19864 | 65 |
| `rMatchcenterLockerRoomSheet` | function | 19882–19937 | 56 |
| `downloadMatchdayStory` | window | 19956–20003 | 48 |
| `rSocialVideoBlock` | function | 20007–20038 | 32 |
| `generateSocialVideoVideos` | window | 20048–20089 | 42 |
| `rMatchcenterSocialMediaCenter` | function | 20140–20193 | 54 |
| `rMatchcenterLineupBuilder` | function | 20225–20297 | 73 |
| `rLineupBuilderAvailablePanel` | function | 20312–20359 | 48 |
| `rLineupRecommendationMode` | function | 20375–20408 | 34 |
| `rLineupTestLine` | function | 20422–20470 | 49 |
| `rLineupBuilderPage` | function | 20488–20522 | 35 |
| `rMatchcenterScoutingSummary` | function | 20523–20566 | 44 |
| `getTeamLogoUrlForStory` | function | 20611–20640 | 30 |
| `matchcenterStoryPickFactItems` | function | 20763–20815 | 53 |
| `buildMatchcenterStoryPreviewData` | function | 21034–21145 | 112 |
| `matchcenterStoryVisibleFacts` | function | 21152–21182 | 31 |
| `rMatchcenterStoryPreview` | function | 21201–21270 | 70 |
| `fitMatchcenterStoryLayout` | function | 21277–21319 | 43 |
| `rMatchcenterPage` | function | 21398–21546 | 149 |
| `rTeamPage` | function | 21569–21909 | 341 |
| `exportExcel` | function | 21914–21939 | 26 |
| `_render` | function | 21963–22132 | 170 |
| `uiObjektseite` | function | 22518–22551 | 34 |
| `rMatchdayDetailPage` | function | 22819–22858 | 40 |
| `buildOverviewCards` | function | 23140–23180 | 41 |

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
| `classifyPenaltyType` | function | 4218–4228 | 11 |
| `isMatchPenaltyEvent` | function | 4229–4231 | 3 |
| `isTwoPlusTwoPenaltyEvent` | function | 4232–4234 | 3 |
| `getPenaltyDisciplineType` | function | 4235–4238 | 4 |
| `getGameDurationMinutes` | function | 4239–4243 | 5 |
| `gameDaySortValue` | function | 4244–4251 | 8 |
| `isSameUlmTeamContext` | function | 4252–4259 | 8 |
| `getFurtherSameDayUlmGames` | function | 4260–4271 | 12 |
| `getPenaltySpecialTeamsMinutes` | function | 4272–4274 | 3 |
| `getPenaltyBasePersonalMinutes` | function | 4279–4285 | 7 |
| `getPenaltyPersonalMinutes` | function | 4286–4298 | 13 |
| `getSpecialTeamsPenaltyChunks` | function | 4304–4307 | 4 |
| `isPenaltyGoalEvent` | function | 4308–4312 | 5 |
| `isOwnGoalEvent` | function | 4315–4318 | 4 |
| `specialTeamsStateFromActive` | function | 4319–4325 | 7 |
| `annotateSpecialTeamsGoalEvent` | function | 4326–4340 | 15 |
| `buildSpecialTeamsForGame` | function | 4341–4536 | 196 |
| `buildSpecialTeamsForSeason` | function | 4537–4545 | 9 |
| `aggregateAlltimeSpecialTeams` | function | 4546–4553 | 8 |
| `mergeGoalieSpecialTeamsStats` | function | 4554–4565 | 12 |
| `addGoalieSpecialTeamsGameToStats` | function | 4566–4580 | 15 |
| `finalizeGoalieSeasonStats` | function | 4581–4595 | 15 |
| `addGoalieGameToStats` | function | 4596–4646 | 51 |
| `buildGoalieGameRecord` | function | 4648–4699 | 52 |
| `buildGoalieStatsForSeason` | function | 4701–4780 | 80 |
| `aggregateGoalieAlltimeStats` | function | 4782–4820 | 39 |
| `updatePlayerRoleAvailability` | function | 4822–4831 | 10 |
| `getGoalieDiagnostics` | function | 4833–4838 | 6 |
| `getSpecialTeamsDiagnostics` | function | 4840–4845 | 6 |
| `getAssistDiagnostics` | function | 4847–4899 | 53 |
| `buildSeasonDuos` | function | 4902–4928 | 27 |
| `mergeDuoSet` | function | 4929–4945 | 17 |
| `aggregateAllTimeDuos` | function | 4946–4956 | 11 |
| `aggregateSeasonStats` | function | 4958–4973 | 16 |
| `buildPlayerDataFoundation` | function | 4975–4997 | 23 |
| `buildRegistry` | function | 4999–5025 | 27 |
| `buildPlayerEvents` | function | 5030–5125 | 96 |
| `getPhaseIndex` | function | 5130–5140 | 11 |
| `computeMetrics` | function | 5145–5278 | 134 |
| `detectTypes` | function | 5280–5295 | 16 |
| `pct` | function | 5297–5297 | 1 |
| `ratio01` | function | 5298–5298 | 1 |
| `relative01` | function | 5299–5299 | 1 |
| `buildSoloDuoProfile` | function | 5300–5343 | 44 |
| `identityPartnerStats` | function | 5344–5357 | 14 |
| `identityOpponentGroups` | function | 5358–5365 | 8 |
| `eventMatchesTeams` | function | 5366–5371 | 6 |
| `clutchText` | function | 5372–5372 | 1 |
| `isImportantClutchGoal` | function | 5373–5377 | 5 |
| `isDecisiveGoal` | function | 5378–5380 | 3 |
| `isLateGoal` | function | 5386–5391 | 6 |
| `isComebackRelevantGoal` | function | 5392–5395 | 4 |
| `identityPointsVsTeams` | function | 5396–5398 | 3 |
| `identityGoalsVsTeams` | function | 5399–5401 | 3 |
| `identityClutchGoalsVsTeams` | function | 5402–5404 | 3 |
| `identityDecisiveGoalsVsTeams` | function | 5405–5407 | 3 |
| `identityLateGoalsVsTeams` | function | 5408–5410 | 3 |
| `countMomentumClusters` | function | 5411–5433 | 23 |
| `identityInputs` | function | 5434–5491 | 58 |
| `clearlyAboveAverage` | function | 5492–5492 | 1 |
| `normalizeSecondaryTraits` | function | 5493–5504 | 12 |
| `seasonRoleTraitsFromClassic` | function | 5505–5509 | 5 |
| `seasonRoleKeysForPlayer` | function | 5510–5518 | 9 |
| `hasSeasonRole` | function | 5519–5521 | 3 |
| `selectEnforcerKeys` | function | 5522–5534 | 13 |
| `buildIdentityProfiles` | function | 5535–5766 | 232 |
| `composeIdentityText` | function | 5767–5773 | 7 |
| `countCaptainAppearances` | function | 5775–5787 | 13 |
| `countGoalieAppearances` | function | 5789–5791 | 3 |
| `computeRosterStatus` | function | 5793–5811 | 19 |
| `assignStatus` | function | 5813–5998 | 186 |
| `fetchJsonLegacy` | function | 6004–6023 | 20 |
| `responseExcerpt` | function | 6025–6027 | 3 |
| `diagnosticError` | function | 6028–6032 | 5 |
| `fetchTextWithDiagnostics` | function | 6033–6062 | 30 |
| `fetchJsonWithDiagnostics` | function | 6063–6071 | 9 |
| `fetchJson` | function | 6072–6075 | 4 |
| `formatStatus` | function | 6076–6078 | 3 |
| `formatDiagnosticAttempt` | function | 6079–6091 | 13 |
| `formatGameLoadError` | function | 6092–6097 | 6 |
| `fetchSeasonGameRaw` | function | 6098–6137 | 40 |
| `getStaticSeasonGames` | function | 6141–6144 | 4 |
| `loadSeasonManifest` | function | 6156–6172 | 17 |
| `resolveCurrentSeasonKey` | function | 6187–6206 | 20 |
| `applyCurrentSeasonCoverHighlight` | function | 6207–6211 | 5 |
| `isUsableExternalSeasonData` | function | 6224–6232 | 9 |
| `ensureExternalSeasonData` | function | 6233–6254 | 22 |
| `buildStaticSeasonDataBlock` | function | 6255–6264 | 10 |
| `getGameId` | function | 6291–6295 | 5 |
| `findDuplicateGameIds` | function | 6297–6307 | 11 |
| `validateGameStructure` | function | 6325–6364 | 40 |
| `validateSeasonGames` | function | 6366–6376 | 11 |
| `diffGameIds` | function | 6378–6387 | 10 |
| `validateSeasonKey` | function | 6389–6399 | 11 |
| `validateWrapperFormat` | function | 6401–6410 | 10 |
| `validateMergedSeason` | function | 6412–6429 | 18 |
| `buildDryRunReport` | function | 6431–6493 | 63 |
| `seasonDataPreviewRerender` | function | 6514–6516 | 3 |
| `seasonDataPreviewRow` | function | 6518–6529 | 12 |
| `buildSeasonDataPreviewChanges` | function | 6536–6553 | 18 |
| `stageSeasonDataPreview` | function | 6564–6615 | 52 |
| `stageSeasonDataPreviewFromFile` | function | 6616–6629 | 14 |
| `stageSeasonDataPreviewFromPaste` | function | 6630–6634 | 5 |
| `discardSeasonDataPreview` | function | 6635–6639 | 5 |
| `getSeasonDataPreview` | function | 6641–6643 | 3 |
| `isSeasonDataPreviewStale` | function | 6649–6653 | 5 |
| `rSeasonDataPreviewStatus` | function | 6655–6657 | 3 |
| `rSeasonDataPreviewRows` | function | 6658–6666 | 9 |
| `rSeasonDataPreviewCard` | function | 6668–6703 | 36 |
| `setSeasonDataPreviewOpen` | window | 6704–6704 | 1 |
| `setSeasonDataPreviewPasteText` | window | 6705–6705 | 1 |
| `fileNameForLineupSeasonKey` | function | 6725–6727 | 3 |
| `ensureLineupDataLoaded` | function | 6743–6759 | 17 |
| `ensureLineupGroupsRegistryLoaded` | function | 6768–6784 | 17 |
| `resolveLineupPlayerName` | function | 6796–6799 | 4 |
| `findLineupGameContext` | function | 6802–6809 | 8 |
| `rEinsatzCenterGroup` | function | 6811–6822 | 12 |
| `rEinsatzCenterCombo` | function | 6824–6831 | 8 |
| `rEinsatzCenterGameCard` | function | 6833–6850 | 18 |
| `rEinsatzCenterPage` | function | 6852–6871 | 20 |
| `setEinsatzCenterSeason` | window | 6873–6878 | 6 |
| `openEinsatzCenter` | window | 6879–6886 | 8 |
| `computeEinsatzCenterStats` | function | 6897–6927 | 31 |
| `lineupGroupDisplayName` | function | 6928–6933 | 6 |
| `rEinsatzCenterStats` | function | 6934–6952 | 19 |
| `getEffectiveLineupData` | function | 7010–7017 | 8 |
| `isEinsatzCenterGameFromDraft` | function | 7019–7022 | 4 |
| `einsatzCenterDraftInView` | function | 7024–7027 | 4 |
| `rEinsatzCenterDraftMark` | function | 7028–7031 | 4 |
| `rEinsatzCenterDraftStatsHint` | function | 7032–7036 | 5 |
| `einsatzCenterDraftStaleHint` | function | 7038–7040 | 3 |
| `rEinsatzCenterDraftBanner` | function | 7042–7049 | 8 |
| `ensureEinsatzCenterDraft` | function | 7060–7073 | 14 |
| `getEinsatzCenterGameDraft` | function | 7082–7093 | 12 |
| `einsatzCenterAutosaveKey` | function | 7120–7120 | 1 |
| `einsatzCenterStorageRead` | function | 7121–7123 | 3 |
| `einsatzCenterStorageWrite` | function | 7124–7126 | 3 |
| `einsatzCenterStorageRemove` | function | 7127–7129 | 3 |
| `einsatzCenterDraftIsEmpty` | function | 7132–7134 | 3 |
| `einsatzCenterSerializeDraft` | function | 7136–7148 | 13 |
| `einsatzCenterIsPlainObject` | function | 7149–7149 | 1 |
| `einsatzCenterDeserializeAutosave` | function | 7155–7188 | 34 |
| `einsatzCenterCurrentRawBaseHash` | function | 7195–7200 | 6 |
| `einsatzCenterAutosaveDraft` | function | 7209–7236 | 28 |
| `einsatzCenterInspectAutosave` | function | 7244–7272 | 29 |
| `restoreEinsatzCenterAutosave` | function | 7275–7291 | 17 |
| `discardEinsatzCenterAutosave` | function | 7293–7298 | 6 |
| `rEinsatzCenterAutosaveBanner` | function | 7301–7313 | 13 |
| `einsatzCenterAutosaveInfoText` | function | 7315–7325 | 11 |
| `loadEinsatzCenterMismatchedAutosave` | function | 7339–7357 | 19 |
| `deriveLineupValidPlayerIds` | function | 7370–7386 | 17 |
| `deriveLineupUlmPlayerIds` | function | 7394–7410 | 17 |
| `getSeasonmanagerRosterSuggestion` | function | 7424–7444 | 21 |
| `einsatzCenterCanonicalJson` | function | 7453–7462 | 10 |
| `einsatzCenterSha256Hex` | function | 7463–7467 | 5 |
| `einsatzCenterComputeBaseHash` | function | 7468–7470 | 3 |
| `einsatzCenterSoftIssues` | function | 7477–7495 | 19 |
| `rEinsatzCenterGroupEditor` | function | 7498–7528 | 31 |
| `rEinsatzCenterComboEditor` | function | 7529–7535 | 7 |
| `rEinsatzCenterRosterSuggestionCard` | function | 7545–7575 | 31 |
| `rEinsatzCenterGameEditor` | function | 7576–7628 | 53 |
| `rEinsatzCenterEditPage` | function | 7629–7676 | 48 |
| `startEinsatzCenterDraftMode` | window | 7679–7683 | 5 |
| `cancelEinsatzCenterEdit` | window | 7684–7694 | 11 |
| `viewEinsatzCenterMergedView` | window | 7696–7696 | 1 |
| `returnToEinsatzCenterEdit` | window | 7697–7697 | 1 |
| `setEinsatzCenterIncludeDraft` | window | 7698–7698 | 1 |
| `selectEinsatzCenterEditGame` | window | 7699–7702 | 4 |
| `addEinsatzCenterRosterPlayer` | window | 7703–7710 | 8 |
| `removeEinsatzCenterRosterPlayer` | window | 7711–7718 | 8 |
| `toggleEinsatzCenterRosterSuggestionPlayer` | window | 7719–7725 | 7 |
| `dismissEinsatzCenterRosterSuggestion` | window | 7726–7729 | 4 |
| `acceptEinsatzCenterRosterSuggestion` | window | 7737–7753 | 17 |
| `addEinsatzCenterExistingGroup` | window | 7754–7762 | 9 |
| `addEinsatzCenterNewGroup` | window | 7763–7779 | 17 |
| `removeEinsatzCenterGroup` | window | 7780–7787 | 8 |
| `toggleEinsatzCenterGroupRename` | window | 7788–7790 | 3 |
| `renameEinsatzCenterGroup` | window | 7802–7821 | 20 |
| `addEinsatzCenterGroupPlayer` | window | 7822–7829 | 8 |
| `removeEinsatzCenterGroupPlayer` | window | 7830–7837 | 8 |
| `setEinsatzCenterGroupPlayerPosition` | window | 7838–7846 | 9 |
| `toggleEinsatzCenterComboPlayer` | window | 7847–7854 | 8 |
| `confirmEinsatzCenterCombo` | window | 7855–7865 | 11 |
| `removeEinsatzCenterCombo` | window | 7866–7872 | 7 |
| `setEinsatzCenterGameNote` | window | 7873–7879 | 7 |
| `buildEinsatzCenterDraftExport` | function | 7883–7896 | 14 |
| `exportEinsatzCenterDraft` | window | 7897–7909 | 13 |
| `loadSeasonData` | function | 7924–8393 | 470 |
| `showMainShell` | function | 8396–8400 | 5 |
| `hasSeasonSource` | function | 8401–8404 | 4 |
| `hasEmbeddedSeasonData` | function | 8405–8407 | 3 |
| `getGlobalLoadableSeasonKeys` | function | 8408–8414 | 7 |
| `getAllTimeCoverStats` | function | 8415–8422 | 8 |
| `updateCoverAllTimeStats` | function | 8423–8431 | 9 |
| `loadSeasonForGlobal` | function | 8433–8463 | 31 |
| `ensureGlobalDataLoaded` | function | 8464–8479 | 16 |
| `loadSeason` | function | 8481–8532 | 52 |
| `startApp` | window | 8534–8545 | 12 |
| `ensureAppLoaded` | function | 8536–8545 | 10 |
| `openSeason` | window | 8546–8548 | 3 |
| `openAllTimePlayers` | window | 8549–8554 | 6 |
| `hofIntroDelay` | function | 8557–8559 | 3 |
| `ensureHallOfFameIntroOverlay` | function | 8560–8592 | 33 |
| `buildHallOfFameIntroTitle` | function | 8593–8603 | 11 |
| `seedHallOfFameIntroParticles` | function | 8604–8621 | 18 |
| `cleanupHallOfFameIntro` | function | 8622–8636 | 15 |
| `restoreHallOfFameIntroPrevious` | function | 8637–8648 | 12 |
| `finishHallOfFameIntro` | function | 8649–8656 | 8 |
| `startHallOfFameIntro` | function | 8657–8681 | 25 |
| `cancelHallOfFameIntro` | function | 8682–8693 | 12 |
| `openHallOfFame` | window | 8695–8718 | 24 |
| `openComparisonCenter` | window | 8719–8747 | 29 |
| `openMatchcenter` | window | 8748–8769 | 22 |
| `openLineupBuilder` | window | 8770–8787 | 18 |
| `setMatchcenterOpponent` | window | 8788–8788 | 1 |
| `setMatchcenterContext` | window | 8789–8789 | 1 |
| `setMatchcenterSeason` | window | 8790–8790 | 1 |
| `toggleMatchcenterGames` | window | 8791–8791 | 1 |
| `openLexicon` | window | 8792–8795 | 4 |
| `rRes` | const-arrow | 8800–8800 | 1 |
| `rClutchBadge` | function | 8801–8808 | 8 |
| `escAttr` | function | 8809–8811 | 3 |
| `roleTraitLabel` | function | 8812–8814 | 3 |
| `isVisibleSecondaryTrait` | function | 8815–8818 | 4 |
| `rRoleTraitTip` | function | 8819–8823 | 5 |
| `rStyleMetricTip` | function | 8824–8827 | 4 |
| `rRosterStatusBadge` | function | 8828–8835 | 8 |
| `classicTagLabel` | function | 8836–8838 | 3 |
| `rClassicTagTip` | function | 8839–8843 | 5 |
| `fallbackIdentityProfile` | function | 8844–8854 | 11 |
| `rIdentityTags` | function | 8855–8863 | 9 |
| `rStyleProfileBars` | function | 8864–8874 | 11 |
| `rIdentityCards` | function | 8875–8900 | 26 |
| `rClassicRoleTags` | function | 8901–8908 | 8 |
| `renderTags` | function | 8909–8911 | 3 |
| `getSeasonPlayerFieldBasis` | function | 8913–8940 | 28 |
| `getSeasonScopedIdentityProfile` | function | 8944–8960 | 17 |
| `rSeasonProfileKpis` | function | 8961–8989 | 29 |
| `rSeasonProfileTagStrip` | function | 8991–9002 | 12 |
| `rMatrix` | function | 9005–9049 | 45 |
| `rSeasonDuoSummary` | function | 9052–9060 | 9 |
| `rPhases` | function | 9062–9079 | 18 |
| `rRadar` | function | 9082–9129 | 48 |
| `rClutch` | function | 9132–9164 | 33 |
| `rTimeline` | function | 9167–9275 | 109 |
| `rPenalties` | function | 9278–9294 | 17 |
| `rOppBreakdown` | function | 9297–9329 | 33 |
| `generatePlayerInsights` | function | 9332–9375 | 44 |
| `rSeasonInsightsTab` | function | 9378–9391 | 14 |
| `rInsights` | function | 9393–9444 | 52 |
| `rTable` | function | 9447–9470 | 24 |
| `findLoadedSeasonPlayer` | function | 9473–9481 | 9 |
| `getAllTimePlayerRows` | function | 9482–9497 | 16 |
| `isSgOnlyAlltimePlayer` | function | 9498–9505 | 8 |
| `isPureSGPlayer` | function | 9506–9509 | 4 |
| `filterPureSGPlayers` | function | 9510–9513 | 4 |
| `getAllTimeMainPlayerRows` | function | 9514–9516 | 3 |
| `getAllTimeSgOnlyRows` | function | 9517–9519 | 3 |
| `getPlayerSeasonStats` | function | 9520–9524 | 5 |
| `getPlayerAlltimeStats` | function | 9525–9532 | 8 |
| `getPlayerRegistryProfile` | function | 9533–9540 | 8 |
| `getPlayerGoalieSeasonStats` | function | 9541–9545 | 5 |
| `getPlayerGoalieAlltimeStats` | function | 9546–9569 | 24 |
| `sumRoleGames` | function | 9570–9575 | 6 |
| `getPlayerRoleAvailability` | function | 9576–9593 | 18 |
| `resolvePlayerRoleView` | function | 9594–9601 | 8 |
| `rPlayerRoleSwitch` | function | 9602–9608 | 7 |
| `goalieNum` | function | 9609–9614 | 6 |
| `goalieTime` | function | 9615–9622 | 8 |
| `goalieBucketRows` | function | 9623–9628 | 6 |
| `goalieTopRow` | function | 9629–9631 | 3 |
| `goalieTierMeta` | function | 9632–9640 | 9 |
| `goalieStdDev` | function | 9641–9646 | 6 |
| `goalieDetailFirstTime` | function | 9647–9653 | 7 |
| `goalieEventSecondInPeriod` | function | 9654–9659 | 6 |
| `goaliePctText` | function | 9660–9663 | 4 |
| `goalieSafeNum` | function | 9664–9667 | 4 |
| `goalieClampScore` | function | 9668–9671 | 4 |
| `goalieInverseScore` | function | 9672–9679 | 8 |
| `goaliePositiveScore` | function | 9680–9687 | 8 |
| `goaliePositiveCurveScore` | function | 9688–9696 | 9 |
| `goalieWeightedScore` | function | 9697–9702 | 6 |
| `goalieApplySampleConfidence` | function | 9703–9710 | 8 |
| `goalieBucketLooseSum` | function | 9711–9717 | 7 |
| `buildGoalieAnalysisModel` | function | 9718–9876 | 159 |
| `rGoalieBars` | function | 9877–9889 | 13 |
| `goalieDnaKey` | function | 9931–9935 | 5 |
| `goalieDnaValue` | function | 9936–9942 | 7 |
| `goalieStateGoals` | function | 9943–9943 | 1 |
| `buildGoalieRoleProfile` | function | 9944–10017 | 74 |
| `rGoalieRoleTraits` | function | 10018–10021 | 4 |
| `getGoalieDnaRows` | function | 10022–10025 | 4 |
| `rGoalieDnaBars` | function | 10026–10039 | 14 |
| `rGoalieScoringRow` | function | 10040–10060 | 21 |
| `rGoalieKpis` | function | 10061–10077 | 17 |
| `rGoalieMiniMetrics` | function | 10078–10083 | 6 |
| `rGoalieFirstGoalResistance` | function | 10084–10097 | 14 |
| `rGoalieMomentum` | function | 10098–10111 | 14 |
| `rGoalieTierCards` | function | 10112–10139 | 28 |
| `rGoaliePhaseProfile` | function | 10140–10156 | 17 |
| `rGoalieInsights` | function | 10157–10178 | 22 |
| `rGoalieOverview` | function | 10179–10196 | 18 |
| `rGoaliePhases` | function | 10197–10199 | 3 |
| `rGoalieOpponents` | function | 10200–10211 | 12 |
| `rGoalieStability` | function | 10212–10240 | 29 |
| `rGoalieTable` | function | 10241–10248 | 8 |
| `rGoalieAnalysis` | function | 10249–10274 | 26 |
| `getPreviousSeasonKey` | function | 10276–10280 | 5 |
| `playerAppearedInSeasonByName` | function | 10281–10291 | 11 |
| `playerAppearedForUlmStatusInSeasonByName` | function | 10292–10310 | 19 |
| `isRookieCandidateForSeason` | function | 10311–10320 | 10 |
| `getLoadedSeasonPointsByName` | function | 10321–10325 | 5 |
| `seasonHasPureUlmTeam` | function | 10326–10332 | 7 |
| `isSgOnlyHallOfFameExcluded` | function | 10333–10341 | 9 |
| `isHallOfFameEligiblePlayer` | function | 10342–10347 | 6 |
| `getHallOfFamePlayerRows` | function | 10348–10350 | 3 |
| `getHallOfFamePlayerIdSet` | function | 10351–10353 | 3 |
| `getGlobalProfileEvents` | function | 10355–10366 | 12 |
| `countBy` | function | 10368–10376 | 9 |
| `getLoadedSeasonPlayerUi` | function | 10377–10381 | 5 |
| `getGlobalPlayerTeamRecord` | function | 10382–10407 | 26 |
| `getGlobalPlayerPeakGame` | function | 10408–10418 | 11 |
| `getGlobalPlayerBestSeason` | function | 10419–10425 | 7 |
| `getAllTimeDuoRowsForPlayer` | function | 10426–10436 | 11 |
| `getCarryPerformanceRows` | function | 10437–10452 | 16 |
| `rCarryPerformanceRows` | function | 10453–10465 | 13 |
| `getAllTimeGamesPlayedRows` | function | 10466–10490 | 25 |
| `getAllTimePenaltyRows` | function | 10491–10506 | 16 |
| `getSeasonUiPlayerForProfile` | function | 10507–10510 | 4 |
| `getSeasonIdentityProfile` | function | 10511–10515 | 5 |
| `seasonStatNumber` | function | 10516–10519 | 4 |
| `seasonStatSetSize` | function | 10520–10525 | 6 |
| `isActiveAlltimeSeasonStats` | function | 10526–10539 | 14 |
| `getActiveAlltimeSeasonKeys` | function | 10540–10550 | 11 |
| `getAlltimeRecencyWeight` | function | 10551–10556 | 6 |
| `getRosterStatus` | function | 10557–10563 | 7 |
| `getGlobalTopScorerMilestones` | function | 10564–10576 | 13 |
| `getGlobalRookieSeasonKey` | function | 10577–10590 | 14 |
| `getGlobalRookieMilestone` | function | 10591–10601 | 11 |
| `getGlobalPlayerMilestones` | function | 10602–10619 | 18 |
| `buildOpponentIntelligence` | function | 10621–10674 | 54 |
| `rOpponentIntelBars` | function | 10676–10686 | 11 |
| `getAllTimeDuoRows` | function | 10688–10710 | 23 |
| `rDuoRows` | function | 10712–10731 | 20 |
| `getAllLoadedSeasonGames` | function | 10733–10752 | 20 |
| `getRosterEntryRegistryProfile` | function | 10754–10757 | 4 |
| `difficultConnectionConfidence` | function | 10758–10762 | 5 |
| `getDuoRowsForPlayerScope` | function | 10763–10781 | 19 |
| `buildDirectDuoLookupForPlayer` | function | 10782–10799 | 18 |
| `duoScopeSeasonKeys` | function | 10800–10803 | 4 |
| `getDuoScorerCountsWithCandidate` | function | 10804–10823 | 20 |
| `buildBestThirdManOptions` | function | 10824–10857 | 34 |
| `getDuoDirectScorerGameCounts` | function | 10858–10889 | 32 |
| `responseMomentumAbsSeconds` | function | 10894–10896 | 3 |
| `responseMomentumTime` | function | 10897–10903 | 7 |
| `responseMomentumGameRows` | function | 10904–10910 | 7 |
| `responseMomentumSide` | function | 10911–10919 | 9 |
| `responseMomentumActor` | function | 10920–10930 | 11 |
| `responseMomentumGoalActors` | function | 10931–10938 | 8 |
| `buildAnnotatedGoalEventsForGame` | function | 10939–11052 | 114 |
| `responseMomentumConfidence` | function | 11053–11057 | 5 |
| `responseMomentumEmptyState` | function | 11058–11065 | 8 |
| `responseMomentumPairKey` | function | 11066–11068 | 3 |
| `ensureRmPlayer` | function | 11069–11074 | 6 |
| `ensureRmDuo` | function | 11075–11080 | 6 |
| `finalizeResponseStats` | function | 11081–11094 | 14 |
| `buildResponseGoalStatsRaw` | function | 11095–11143 | 49 |
| `buildResponseGoalStats` | function | 11144–11149 | 6 |
| `finalizeMomentumStats` | function | 11150–11155 | 6 |
| `buildMomentumSwingStatsRaw` | function | 11156–11226 | 71 |
| `buildMomentumSwingStats` | function | 11227–11232 | 6 |
| `buildDuoFloorCeiling` | function | 11233–11274 | 42 |
| `buildDuoWarnings` | function | 11275–11293 | 19 |
| `duoProPairKey` | function | 11294–11296 | 3 |
| `duoProContextSeasonKey` | function | 11297–11299 | 3 |
| `getDuoFieldPlayerRows` | function | 11300–11310 | 11 |
| `duoProPlayer` | function | 11311–11315 | 5 |
| `getDuoSharedFieldRows` | function | 11316–11321 | 6 |
| `buildDuoDirectProduction` | function | 11322–11342 | 21 |
| `emptyDuoTeamImpactStats` | function | 11343–11345 | 3 |
| `addDuoTeamGame` | function | 11346–11361 | 16 |
| `finalizeDuoTeamImpactStats` | function | 11362–11369 | 8 |
| `buildDuoWithWithoutImpact` | function | 11370–11403 | 34 |
| `buildDuoOpponentAdjusted` | function | 11404–11416 | 13 |
| `buildDuoNetworkContext` | function | 11417–11440 | 24 |
| `buildDuoGapAnalysis` | function | 11441–11457 | 17 |
| `buildDuoCompatibility` | function | 11469–11491 | 23 |
| `buildDuoUntestedPotential` | function | 11492–11503 | 12 |
| `buildDuoUsageRate` | function | 11504–11515 | 12 |
| `buildDuoReplacementOptions` | function | 11516–11527 | 12 |
| `buildDuoProAnalysis` | function | 11528–11571 | 44 |
| `rDuoCenterPro` | function | 11572–11691 | 120 |
| `duoProDomId` | function | 11692–11694 | 3 |
| `duoProPickerOpen` | function | 11695–11697 | 3 |
| `duoProPickerMessage` | function | 11698–11700 | 3 |
| `setDuoProPickerState` | function | 11701–11710 | 10 |
| `duoProResolveCandidate` | function | 11711–11719 | 9 |
| `duoProSelectionPayload` | function | 11720–11729 | 10 |
| `openDuoProPicker` | window | 11730–11730 | 1 |
| `cancelDuoProPicker` | window | 11731–11731 | 1 |
| `selectDuoProQuick` | window | 11732–11735 | 4 |
| `confirmDuoProSelection` | window | 11736–11750 | 15 |
| `setDuoProSelection` | window | 11751–11758 | 8 |
| `rDuoProPlayerSelect` | function | 11759–11765 | 7 |
| `rInteractiveDuoCenterPro` | function | 11766–11821 | 56 |
| `rSeasonDuoCenterPro` | function | 11822–11824 | 3 |
| `getDifficultConnectionRowsForPlayer` | function | 11825–11869 | 45 |
| `emptyRosterImpactStats` | function | 11870–11872 | 3 |
| `finalizeRosterImpactStats` | function | 11873–11880 | 8 |
| `addRosterImpactGameToStats` | function | 11881–11890 | 10 |
| `getRosterImpactPlayerEventLookup` | function | 11891–11911 | 21 |
| `buildRosterImpactGameIndex` | function | 11924–11949 | 26 |
| `getRosterImpactPlayerGames` | function | 11962–12003 | 42 |
| `rosterImpactConfidence` | function | 12004–12009 | 6 |
| `confidenceFromSampleSize` | function | 12014–12017 | 4 |
| `rosterImpactConfidenceWeight` | function | 12018–12021 | 4 |
| `antiSynergyImpactScore` | function | 12022–12036 | 15 |
| `buildRosterImpactAnalysis` | function | 12037–12105 | 69 |
| `buildDuoAntiSynergy` | function | 12106–12108 | 3 |
| `rAntiSynergyDelta` | function | 12109–12115 | 7 |
| `antiSynergyDeltaClass` | function | 12116–12119 | 4 |
| `antiSynergySigned` | function | 12120–12124 | 5 |
| `rAntiSynergyCompareChip` | function | 12125–12132 | 8 |
| `rAntiSynergyMetricRow` | function | 12133–12141 | 9 |
| `rAntiSynergyWinrateText` | function | 12149–12154 | 6 |
| `rAntiSynergyWinrateRow` | function | 12155–12163 | 9 |
| `rRosterImpactStatLine` | function | 12164–12167 | 4 |
| `antiSynergyPartnerIsSgOnly` | function | 12168–12171 | 4 |
| `rAntiSynergyMainDelta` | function | 12172–12181 | 10 |
| `rDifficultConnectionList` | function | 12182–12206 | 25 |
| `rDifficultConnectionListCompactLegacy` | function | 12207–12248 | 42 |
| `rDifficultConnectionListCompact` | function | 12249–12287 | 39 |
| `rDifficultConnectionsCard` | function | 12288–12324 | 37 |
| `responseMomentumTooltipFor` | function | 12369–12375 | 7 |
| `rmTerm` | function | 12376–12379 | 4 |
| `rResponseRateDisplay` | function | 12385–12391 | 7 |
| `rRmKpi` | function | 12392–12403 | 12 |
| `rAvgResponseTimeNote` | function | 12406–12409 | 4 |
| `rRmTopList` | function | 12410–12420 | 11 |
| `rResponseMomentumOverviewCard` | function | 12421–12444 | 24 |
| `rPlayerResponseMomentumCard` | function | 12445–12463 | 19 |
| `rDuoResponseMomentumCard` | function | 12464–12483 | 20 |
| `rTeamResponseMomentumCard` | function | 12484–12490 | 7 |
| `rMatchcenterResponseMomentum` | function | 12491–12528 | 38 |
| `getTeamAllTimeRecords` | function | 12530–12570 | 41 |
| `getAllTimeOpponentIntelligence` | function | 12572–12578 | 7 |
| `getAllTimeOpponentTopScorers` | function | 12580–12604 | 25 |
| `getHallOfFameStats` | function | 12606–12628 | 23 |
| `rOpponentTopScorerTable` | function | 12630–12649 | 20 |
| `getAllTimeIdentityStandings` | function | 12651–12685 | 35 |
| `buildRecencyWeightedGlobalIdentityProfile` | function | 12687–12734 | 48 |
| `getGlobalIdentityProfile` | function | 12736–12762 | 27 |
| `dedupeIdentityProfileTags` | function | 12764–12775 | 12 |
| `rGlobalProfileTags` | function | 12777–12781 | 5 |
| `escHtml` | function | 12783–12785 | 3 |
| `pctValue` | function | 12786–12789 | 4 |
| `rHallOfFameHero` | function | 12790–12815 | 26 |
| `rHallPodiumList` | function | 12816–12838 | 23 |
| `rHallDuoTemple` | function | 12839–12846 | 8 |
| `hallGoalieNum` | function | 12848–12853 | 6 |
| `hallGoalieTime` | function | 12854–12861 | 8 |
| `hallGoalieSeasonLabel` | function | 12862–12862 | 1 |
| `isHallRowPureSG` | function | 12863–12870 | 8 |
| `rHallSGBadge` | function | 12871–12873 | 3 |
| `hallGoaliePkStats` | function | 12874–12885 | 12 |
| `hallGoalieTopteamStats` | function | 12886–12892 | 7 |
| `hallGoalieSeasonScore` | function | 12893–12912 | 20 |
| `hallGoalieRowFromStats` | function | 12913–12945 | 33 |
| `getHallGoalieData` | function | 12946–12961 | 16 |
| `hallGoalieNameHtml` | function | 12962–12964 | 3 |
| `hallGoalieTooltip` | function | 12979–12982 | 4 |
| `hallGoalieExplainForLabel` | function | 12983–12997 | 15 |
| `rHallGoalieRankCard` | function | 12998–13029 | 32 |
| `noGoalStreakGoaliesForGame` | function | 13045–13052 | 8 |
| `buildHallOfFameLongestNoGoalStreak` | function | 13053–13078 | 26 |
| `rHallGoalieAwardCards` | function | 13079–13099 | 21 |
| `rHallGoalieLegends` | function | 13100–13132 | 33 |
| `getGlobalSeasonStatRows` | function | 13133–13148 | 16 |
| `getAlltimeRank` | function | 13149–13154 | 6 |
| `rAlltimeKpis` | function | 13155–13168 | 14 |
| `rSparkline` | function | 13169–13181 | 13 |
| `comparisonItemKey` | function | 13193–13198 | 6 |
| `normalizeComparisonItem` | function | 13199–13203 | 5 |
| `comparisonJsArg` | function | 13204–13206 | 3 |
| `comparisonNum` | function | 13207–13210 | 4 |
| `comparisonPct` | function | 13211–13214 | 4 |
| `comparisonFmt` | function | 13215–13218 | 4 |
| `comparisonPctFmt` | function | 13219–13221 | 3 |
| `getComparisonPlayerRow` | function | 13222–13224 | 3 |
| `getComparisonSeasonLabel` | function | 13225–13227 | 3 |
| `getComparisonTeamGoalsForSeason` | function | 13228–13239 | 12 |
| `getComparisonAlltimeTeamGoals` | function | 13240–13242 | 3 |
| `getComparisonSeasonEvents` | function | 13243–13247 | 5 |
| `getComparisonChemistryFromEvents` | function | 13248–13252 | 5 |
| `getComparisonClutchFromEvents` | function | 13253–13257 | 5 |
| `getComparisonStyleProfile` | function | 13258–13282 | 25 |
| `getComparisonProfile` | function | 13283–13287 | 5 |
| `getComparisonSeasonTrend` | function | 13288–13313 | 26 |
| `getComparisonAlltimeTrend` | function | 13314–13319 | 6 |
| `getComparisonPlayerOptions` | function | 13321–13335 | 15 |
| `comparisonVariantValue` | function | 13336–13338 | 3 |
| `getComparisonVariantsForPlayer` | function | 13339–13363 | 25 |
| `parseComparisonVariant` | function | 13364–13378 | 15 |
| `getComparisonCurrentSelection` | function | 13379–13389 | 11 |
| `filterComparisonPlayers` | window | 13390–13397 | 8 |
| `selectComparisonPlayer` | window | 13398–13403 | 6 |
| `setComparisonRoleMode` | window | 13404–13408 | 5 |
| `setComparisonVariant` | window | 13409–13412 | 4 |
| `toggleComparisonSgOnly` | window | 13413–13413 | 1 |
| `addComparisonItem` | window | 13414–13421 | 8 |
| `addSelectedComparisonItem` | window | 13422–13427 | 6 |
| `toggleComparisonPicker` | window | 13428–13428 | 1 |
| `removeComparisonItem` | window | 13429–13432 | 4 |
| `clearComparison` | window | 13433–13433 | 1 |
| `runComparison` | window | 13434–13440 | 7 |
| `selectComparisonMode` | window | 13441–13441 | 1 |
| `backToComparisonModeSelect` | window | 13442–13442 | 1 |
| `normalizeDuoComparisonItem` | function | 13443–13446 | 4 |
| `comparisonDuoContext` | function | 13447–13450 | 4 |
| `setComparisonDuoMode` | window | 13451–13451 | 1 |
| `setComparisonDuoSeasonKey` | window | 13452–13452 | 1 |
| `setComparisonDuoSearch` | window | 13453–13453 | 1 |
| `filterPlayerSuggestions` | function | 13454–13465 | 12 |
| `rComparisonDuoSuggestionButtons` | function | 13466–13469 | 4 |
| `renderComparisonDuoSuggestions` | function | 13470–13478 | 9 |
| `filterComparisonDuoSuggestions` | window | 13479–13486 | 8 |
| `selectComparisonDuoSuggestion` | window | 13480–13486 | 7 |
| `handleComparisonDuoSearchKey` | window | 13487–13499 | 13 |
| `setComparisonDuoPlayer` | window | 13500–13505 | 6 |
| `addComparisonDuoFromSelection` | window | 13506–13513 | 8 |
| `addComparisonDuo` | window | 13514–13516 | 3 |
| `removeComparisonDuo` | window | 13517–13520 | 4 |
| `clearComparisonDuos` | window | 13521–13521 | 1 |
| `runDuoComparison` | window | 13522–13526 | 5 |
| `buildDuoComparison` | function | 13527–13546 | 20 |
| `rDuoComparisonBars` | function | 13547–13551 | 5 |
| `rDuoCompareSummaryCards` | function | 13552–13582 | 31 |
| `rDuoComparisonProfile` | function | 13583–13604 | 22 |
| `rDuoComparisonChemistry` | function | 13605–13620 | 16 |
| `rDuoComparisonImpact` | function | 13621–13636 | 16 |
| `rDuoComparisonContext` | function | 13637–13654 | 18 |
| `rDuoComparisonDetails` | function | 13655–13658 | 4 |
| `rDuoComparisonDashboard` | function | 13659–13672 | 14 |
| `rComparisonDuoSearchBox` | function | 13673–13682 | 10 |
| `rDuoComparisonPage` | function | 13683–13693 | 11 |
| `rComparisonModeSelect` | function | 13694–13696 | 3 |
| `getComparisonEventsForItem` | function | 13697–13699 | 3 |
| `getComparisonRosterGamesForSeason` | function | 13700–13716 | 17 |
| `getComparisonRosterGames` | function | 13717–13724 | 8 |
| `comparisonEventGameKey` | function | 13725–13727 | 3 |
| `comparisonEventPhaseLabel` | function | 13728–13731 | 4 |
| `comparisonOpponentStrengthTier` | function | 13732–13737 | 6 |
| `buildComparisonExtraMetrics` | function | 13738–13795 | 58 |
| `getGoalieComparisonAlltimeTrend` | function | 13796–13812 | 17 |
| `getGoalieComparisonSeasonTrend` | function | 13813–13831 | 19 |
| `buildGoalieComparisonDataset` | function | 13832–13882 | 51 |
| `buildComparisonDataset` | function | 13883–13918 | 36 |
| `kpiValueText` | function | 13920–13923 | 4 |
| `kpiDelta` | function | 13924–13929 | 6 |
| `kpiItemColor` | function | 13930–13932 | 3 |
| `rKpiCards` | function | 13933–13943 | 11 |
| `rKpiMirrorRows` | function | 13958–14017 | 60 |
| `kpiRadarValue` | function | 14018–14028 | 11 |
| `rKpiRadar` | function | 14029–14063 | 35 |
| `rKpiShareBars` | function | 14064–14071 | 8 |
| `rKpiMetricCard` | function | 14072–14076 | 5 |
| `rKpiTextMetricCard` | function | 14077–14079 | 3 |
| `rKpiExtendedMetrics` | function | 14080–14094 | 15 |
| `kpiNiceMax` | function | 14095–14100 | 6 |
| `kpiTrendRows` | function | 14101–14109 | 9 |
| `rKpiTrendCompare` | function | 14110–14176 | 67 |
| `rKpiOpponentStrength` | function | 14177–14204 | 28 |
| `kpiBadge` | function | 14205–14207 | 3 |
| `rKpiObjectMini` | function | 14208–14214 | 7 |
| `rKpiInfoCards` | function | 14215–14246 | 32 |
| `buildComparisonSummary` | function | 14247–14278 | 32 |
| `rKPIVergleich` | function | 14279–14292 | 14 |
| `rComparisonMiniOverview` | function | 14293–14296 | 4 |
| `rComparisonRoles` | function | 14297–14304 | 8 |
| `rComparisonDashboard` | function | 14305–14315 | 11 |
| `rComparisonStyles` | function | 14316–14353 | 38 |
| `rComparisonCenterPage` | function | 14354–14404 | 51 |
| `rSeasonTrendRows` | function | 14405–14423 | 19 |
| `getAlltimeAggregatedStyleProfile` | function | 14424–14443 | 20 |
| `rGlobalDnaBars` | function | 14445–14474 | 30 |
| `pdashNum` | function | 14475–14478 | 4 |
| `pdashPct` | function | 14479–14482 | 4 |
| `pdashPhaseLabel` | function | 14483–14486 | 4 |
| `pdashTopCount` | function | 14487–14490 | 4 |
| `pdashBestPhase` | function | 14491–14494 | 4 |
| `pdashTopPartner` | function | 14495–14498 | 4 |
| `pdashTopOpponent` | function | 14499–14502 | 4 |
| `pdashOpponentTier` | function | 14503–14508 | 6 |
| `pdashOpponentStrength` | function | 14509–14528 | 20 |
| `pdashInsight` | function | 14529–14531 | 3 |
| `pdashInsights` | function | 14532–14543 | 12 |
| `buildSeasonPlayerDashModel` | function | 14544–14580 | 37 |
| `buildAlltimePlayerDashModel` | function | 14581–14623 | 43 |
| `rPlayerDashStyles` | function | 14624–14635 | 12 |
| `rPdashLabel` | function | 14636–14638 | 3 |
| `rPdashStat` | function | 14639–14641 | 3 |
| `rPlayerDash` | function | 14642–14680 | 39 |
| `rSeasonPlayerDashboard` | function | 14681–14683 | 3 |
| `rAlltimePlayerDashboard` | function | 14684–14686 | 3 |
| `rGlobalPartnerOpponentPanel` | function | 14687–14700 | 14 |
| `rGlobalCareerHeader` | function | 14701–14721 | 21 |
| `rSeasonLandingPage` | function | 14723–14737 | 15 |
| `rGlobalOverview` | function | 14739–14790 | 52 |
| `rGlobalAllTimeStats` | function | 14792–14808 | 17 |
| `rGlobalDevelopment` | function | 14810–14848 | 39 |
| `getGlobalPlayerOpponentGameRows` | function | 14851–14878 | 28 |
| `getGlobalOpponentSpecialistProfile` | function | 14880–14908 | 29 |
| `rGlobalDuoNetwork` | function | 14910–15107 | 198 |
| `rGlobalOpponentSpecialist` | function | 15109–15154 | 46 |
| `playerExplainConfidence` | function | 15156–15161 | 6 |
| `playerExplainConfidenceLabel` | function | 15162–15164 | 3 |
| `playerExplainAdd` | function | 15165–15169 | 5 |
| `playerExplainStyleSignature` | function | 15170–15181 | 12 |
| `playerExplainRolePhrase` | function | 15182–15190 | 9 |
| `playerExplainHeadline` | function | 15191–15200 | 10 |
| `playerExplainContextSentence` | function | 15201–15219 | 19 |
| `buildFieldPlayerExplanation` | function | 15220–15294 | 75 |
| `buildGoaliePlayerExplanation` | function | 15295–15348 | 54 |
| `buildPlayerExplanation` | function | 15349–15357 | 9 |
| `buildPlayerIntelligence` | function | 15358–15387 | 30 |
| `rPlayerExplainItems` | function | 15388–15392 | 5 |
| `rPlayerExplanation` | function | 15393–15444 | 52 |
| `rAllTimePlayersPage` | function | 15446–15486 | 41 |
| `rHallOfFamePage` | function | 15488–15576 | 89 |
| `lexiconUniqueKeys` | function | 15581–15588 | 8 |
| `lexiconEntry` | function | 15589–15598 | 10 |
| `rLexiconRows` | function | 15599–15602 | 4 |
| `rLexiconPage` | function | 15603–15775 | 173 |
| `clampScore` | function | 15779–15782 | 4 |
| `getScoreLabel` | function | 15783–15791 | 9 |
| `buildConfidence` | function | 15792–15837 | 46 |
| `confidenceCautiousText` | function | 15838–15841 | 4 |
| `explainScore` | function | 15842–15856 | 15 |
| `p1NarrativeKey` | function | 15857–15859 | 3 |
| `scoreNarrative` | function | 15860–15878 | 19 |
| `rankNarratives` | function | 15879–15892 | 14 |
| `getEmptyState` | function | 15893–15904 | 12 |
| `rEmptyState` | function | 15905–15908 | 4 |
| `capSuperlativeLabel` | function | 15916–15918 | 3 |
| `rScoreBreakdown` | function | 15919–15935 | 17 |
| `matchcenterSigned` | function | 15937–15941 | 5 |
| `matchcenterDateLabel` | function | 15943–15947 | 5 |
| `dedupeGamesById` | function | 15959–15967 | 9 |
| `matchcenterIsFreiburgTuebingenTeamName` | function | 15968–15974 | 7 |
| `matchcenterSeasonHasGames` | function | 15978–15980 | 3 |
| `matchcenterDefaultSeasonKey` | function | 15981–15986 | 6 |
| `matchcenterOpponentMode` | function | 15998–16000 | 3 |
| `getMatchcenterOpponents` | function | 16001–16033 | 33 |
| `getMatchcenterDirectOpponents` | function | 16034–16064 | 31 |
| `matchcenterAnalyzeDirect` | function | 16067–16103 | 37 |
| `matchcenterAnalyzeForm` | function | 16104–16129 | 26 |
| `matchcenterEmptyBuckets` | function | 16144–16146 | 3 |
| `matchcenterUlmScoutingConfidence` | function | 16147–16151 | 5 |
| `matchcenterEnsureUlmPlayer` | function | 16152–16189 | 38 |
| `matchcenterRegisterUlmProfileGame` | function | 16190–16195 | 6 |
| `matchcenterUpdateUlmSeasonRow` | function | 16196–16202 | 7 |
| `matchcenterClassifyUlmGoalEvent` | function | 16203–16213 | 11 |
| `matchcenterAddUlmScoring` | function | 16214–16254 | 41 |
| `matchcenterFinalizeUlmPlayers` | function | 16255–16323 | 69 |
| `matchcenterBuildUlmPlayerScouting` | function | 16324–16378 | 55 |
| `matchcenterBuildUlmPlayerInsights` | function | 16379–16391 | 13 |
| `matchcenterDuoPairKey` | function | 16392–16395 | 4 |
| `matchcenterEnsureOpponentDuo` | function | 16396–16428 | 33 |
| `matchcenterDuoDirectionLabel` | function | 16429–16435 | 7 |
| `matchcenterAddDuoConnection` | function | 16436–16454 | 19 |
| `matchcenterFinalizeOpponentDuos` | function | 16455–16489 | 35 |
| `matchcenterBuildOpponentDuos` | function | 16490–16534 | 45 |
| `matchcenterBuildOpponentDuoInsights` | function | 16535–16548 | 14 |
| `matchcenterEnsureUlmDuo` | function | 16549–16586 | 38 |
| `matchcenterAddUlmDuoConnection` | function | 16587–16605 | 19 |
| `matchcenterFinalizeUlmDuos` | function | 16606–16641 | 36 |
| `matchcenterBuildUlmDuos` | function | 16642–16684 | 43 |
| `matchcenterBuildUlmDuoInsights` | function | 16685–16697 | 13 |
| `matchcenterDirectContextGames` | function | 16698–16700 | 3 |
| `matchcenterSpecialTeamsForGame` | function | 16701–16704 | 4 |
| `matchcenterPersonalPenaltyMinutesForSide` | function | 16705–16713 | 9 |
| `matchcenterPct` | function | 16714–16717 | 4 |
| `matchcenterBuildSpecialTeamsMatchup` | function | 16718–16765 | 48 |
| `matchcenterGoalieKey` | function | 16766–16770 | 5 |
| `matchcenterGoalieFitScore` | function | 16771–16787 | 17 |
| `matchcenterBuildGoalieMatchup` | function | 16788–16833 | 46 |
| `matchcenterGoalAbsSeconds` | function | 16836–16840 | 5 |
| `matchcenterTimeValue` | function | 16841–16848 | 8 |
| `matchcenterEmptyTimingStats` | function | 16849–16857 | 9 |
| `matchcenterWindowForSecond` | function | 16858–16864 | 7 |
| `matchcenterTimingStatsForGames` | function | 16865–16902 | 38 |
| `matchcenterBuildTimingInsights` | function | 16903–16913 | 11 |
| `matchcenterBuildTimingAnalysis` | function | 16914–16924 | 11 |
| `rMatchcenterTimeBars` | function | 16925–16938 | 14 |
| `rMatchcenterTimingStatsCard` | function | 16939–16958 | 20 |
| `rMatchcenterTiming` | function | 16959–16982 | 24 |
| `rMatchcenterTabs` | function | 16998–17000 | 3 |
| `rMatchcenterProfileSection` | function | 17001–17020 | 20 |
| `rMatchcenterFormSection` | function | 17021–17046 | 26 |
| `rMatchcenterDetailsSection` | function | 17047–17054 | 8 |
| `matchcenterResultClass` | function | 17055–17057 | 3 |
| `matchcenterUlmTeamLabelForGame` | function | 17059–17063 | 5 |
| `matchcenterGameLine` | function | 17064–17069 | 6 |
| `matchcenterFormLine` | function | 17070–17074 | 5 |
| `matchcenterBuildInsights` | function | 17075–17095 | 21 |
| `rMatchcenterKpi` | function | 17096–17102 | 7 |
| `rMatchcenterFormCard` | function | 17103–17123 | 21 |
| `rMatchcenterGamesList` | function | 17124–17135 | 12 |
| `rMatchcenterWatchCard` | function | 17136–17156 | 21 |
| `rMatchcenterPlayerRow` | function | 17157–17180 | 24 |
| `rMatchcenterRankCard` | function | 17181–17186 | 6 |
| `rMatchcenterUlmImpactCard` | function | 17187–17215 | 29 |
| `rMatchcenterUlmPlayerRow` | function | 17216–17239 | 24 |
| `rMatchcenterUlmRankCard` | function | 17240–17245 | 6 |
| `rMatchcenterUlmScouting` | function | 17246–17282 | 37 |
| `rMatchcenterOpponentScouting` | function | 17283–17318 | 36 |
| `rMatchcenterPlayersTab` | function | 17319–17321 | 3 |
| `rMatchcenterDuoWatchCard` | function | 17322–17341 | 20 |
| `rMatchcenterDuoRow` | function | 17342–17365 | 24 |
| `rMatchcenterDuoRankCard` | function | 17366–17371 | 6 |
| `rMatchcenterUlmDuoWatchCard` | function | 17372–17397 | 26 |
| `rMatchcenterUlmDuoRow` | function | 17398–17420 | 23 |
| `rMatchcenterUlmDuoRankCard` | function | 17421–17426 | 6 |
| `rMatchcenterUlmDuos` | function | 17427–17469 | 43 |
| `rMatchcenterOpponentDuos` | function | 17470–17512 | 43 |
| `rMatchcenterDuosTab` | function | 17513–17515 | 3 |
| `rMatchcenterSpecialCard` | function | 17516–17524 | 9 |
| `rMatchcenterSpecialTeams` | function | 17525–17574 | 50 |
| `rMatchcenterGoalieCard` | function | 17575–17598 | 24 |
| `rMatchcenterGoalieMatchup` | function | 17599–17627 | 29 |
| `matchcenterPlanScoreText` | function | 17628–17631 | 4 |
| `matchcenterPlanRateText` | function | 17632–17636 | 5 |
| `matchcenterPriorityLabel` | function | 17637–17639 | 3 |
| `matchcenterConfidenceClass` | function | 17640–17645 | 6 |
| `matchcenterInferPriority` | function | 17646–17652 | 7 |
| `matchcenterAddPlanItem` | function | 17653–17658 | 6 |
| `matchcenterAddPlanWatch` | function | 17659–17664 | 6 |
| `matchcenterBuildPlanConfidence` | function | 17665–17712 | 48 |
| `matchcenterIntelCurve` | function | 17713–17718 | 6 |
| `matchcenterIntelInverseCurve` | function | 17719–17722 | 4 |
| `matchcenterIntelWeighted` | function | 17723–17733 | 11 |
| `matchcenterIntelRate` | function | 17734–17737 | 4 |
| `matchcenterIntelPct` | function | 17738–17741 | 4 |
| `matchcenterIntelPriorityFromScore` | function | 17742–17747 | 6 |
| `matchcenterIntelPriorityClass` | function | 17748–17753 | 6 |
| `matchcenterIntelPriorityLabel` | function | 17754–17757 | 4 |
| `matchcenterIntelDataLabel` | function | 17758–17760 | 3 |
| `matchcenterBuildIntelligenceDataQuality` | function | 17761–17830 | 70 |
| `matchcenterBuildOpponentDNA` | function | 17831–17943 | 113 |
| `matchcenterDeriveOpponentType` | function | 17944–17961 | 18 |
| `matchcenterIntelPlayerRef` | function | 17962–17974 | 13 |
| `matchcenterIntelDuoRef` | function | 17975–17988 | 14 |
| `matchcenterIntelAddAlarm` | function | 17989–18009 | 21 |
| `matchcenterBuildOpponentAlarm` | function | 18010–18119 | 110 |
| `matchcenterBuildIntelListFromPlan` | function | 18120–18128 | 9 |
| `matchcenterBuildCoachHints` | function | 18129–18144 | 16 |
| `matchcenterBuildIntelHeadline` | function | 18145–18152 | 8 |
| `matchcenterBuildOneThingToWatch` | function | 18153–18165 | 13 |
| `matchcenterBuildIntelligenceSignals` | function | 18166–18212 | 47 |
| `buildMatchIntelligenceFromContext` | function | 18213–18267 | 55 |
| `buildMatchIntelligence` | function | 18268–18289 | 22 |
| `matchcenterCoachCautious` | function | 18290–18292 | 3 |
| `matchcenterCoachAdd` | function | 18293–18301 | 9 |
| `matchcenterCoachGameModel` | function | 18302–18315 | 14 |
| `buildMatchStories` | function | 18316–18345 | 30 |
| `matchcenterCoachPriorityFromAlarm` | function | 18346–18355 | 10 |
| `matchcenterBuildCoachPriorities` | function | 18356–18362 | 7 |
| `matchcenterBuildCoachLevers` | function | 18363–18372 | 10 |
| `matchcenterBuildCoachDangerPatterns` | function | 18373–18380 | 8 |
| `matchcenterBuildCoachIfThen` | function | 18381–18390 | 10 |
| `matchcenterBuildCoachAvoidList` | function | 18391–18400 | 10 |
| `matchcenterBuildCoachActivationHints` | function | 18401–18407 | 7 |
| `matchcenterBuildCoachKeyActors` | function | 18408–18415 | 8 |
| `buildDigitalCoachReport` | function | 18416–18448 | 33 |
| `buildLockerRoomSheet` | function | 18449–18469 | 21 |
| `matchcenterSocialAdd` | function | 18470–18476 | 7 |
| `matchcenterSocialCaption` | function | 18477–18482 | 6 |
| `socialSentence` | function | 18483–18485 | 3 |
| `socialEnsurePeriod` | function | 18486–18489 | 4 |
| `socialFirstUseful` | function | 18490–18492 | 3 |
| `socialPlayerFocusLine` | function | 18493–18499 | 7 |
| `socialDuoFocusLine` | function | 18500–18505 | 6 |
| `socialOpponentLine` | function | 18506–18509 | 4 |
| `socialKeyFactLine` | function | 18510–18519 | 10 |
| `buildMatchdayCaptionBlocks` | function | 18520–18549 | 30 |
| `buildSocialMediaContent` | function | 18550–18598 | 49 |
| `isSyntheticLineupPlayerId` | function | 18604–18606 | 3 |
| `getSyntheticLineupPlayers` | function | 18607–18609 | 3 |
| `getSyntheticLineupRow` | function | 18610–18626 | 17 |
| `getSyntheticLineupRows` | function | 18627–18629 | 3 |
| `getLineupAllRows` | function | 18630–18632 | 3 |
| `lineupRowMeta` | function | 18633–18640 | 8 |
| `getLineupPlayerPool` | function | 18641–18649 | 9 |
| `lineupScore` | function | 18650–18655 | 6 |
| `lineupAverage` | function | 18656–18659 | 4 |
| `lineupLevelLabel` | function | 18660–18663 | 4 |
| `lineupRosterGamesForPlayer` | function | 18666–18713 | 48 |
| `buildLineupExperienceProfile` | function | 18714–18756 | 43 |
| `lineupOpponentDNAForContext` | function | 18757–18768 | 12 |
| `buildLineupOpponentDNAFit` | function | 18769–18812 | 44 |
| `classifyLineIdentity` | function | 18813–18860 | 48 |
| `lineupPlayerProfile` | function | 18861–18936 | 76 |
| `buildLineupAnalysis` | function | 18937–19070 | 134 |
| `buildLineupScoreBreakdowns` | function | 19071–19100 | 30 |
| `buildLineupIntelligence` | function | 19101–19111 | 11 |
| `buildLineAnalysis` | function | 19112–19114 | 3 |
| `lineupRowMap` | function | 19115–19117 | 3 |
| `lineupRankCandidateIds` | function | 19118–19132 | 15 |
| `lineupCombinationIds` | function | 19133–19146 | 14 |
| `lineupStdDev` | function | 19147–19152 | 6 |
| `lineupRoleDnaComplementScore` | function | 19153–19176 | 24 |
| `lineupDirectChemistryScore` | function | 19177–19183 | 7 |
| `lineupEvaluateComplementCandidate` | function | 19184–19262 | 79 |
| `lineupPlayerAnchorScore` | function | 19263–19280 | 18 |
| `lineupPlayerAnchorConfidence` | function | 19283–19287 | 5 |
| `buildTeamLineBalance` | function | 19288–19331 | 44 |
| `buildBalancedLineupSet` | function | 19332–19358 | 27 |
| `lineupRecommendationReason` | function | 19359–19367 | 9 |
| `buildLineupRecommendations` | function | 19368–19449 | 82 |
| `recommendLineComplements` | function | 19450–19477 | 28 |
| `matchcenterBuildMatchPlan` | function | 19478–19623 | 146 |
| `rMatchcenterPlanItems` | function | 19624–19641 | 18 |
| `rMatchcenterPlanWatch` | function | 19642–19657 | 16 |
| `rMatchcenterOpponentDNA` | function | 19658–19690 | 33 |
| `rMatchcenterOpponentAlarm` | function | 19691–19712 | 22 |
| `rMatchcenterIntelOverview` | function | 19713–19758 | 46 |
| `rMatchcenterIntelCoachHints` | function | 19759–19772 | 14 |
| `rMatchcenterCoachCardList` | function | 19773–19786 | 14 |
| `rMatchcenterCoachIfThen` | function | 19787–19794 | 8 |
| `rMatchcenterCoachSimpleList` | function | 19795–19799 | 5 |
| `rMatchcenterDigitalCoach` | function | 19800–19864 | 65 |
| `rMatchcenterCopyButton` | function | 19865–19869 | 5 |
| `rMatchcenterLockerList` | function | 19870–19881 | 12 |
| `rMatchcenterLockerRoomSheet` | function | 19882–19937 | 56 |
| `rMatchcenterSocialBlock` | function | 19938–19945 | 8 |
| `matchcenterStoryDownloadFileName` | function | 19946–19955 | 10 |
| `downloadMatchdayStory` | window | 19956–20003 | 48 |
| `rSocialVideoBlock` | function | 20007–20038 | 32 |
| `socialVideoJobsForMatchday` | function | 20041–20047 | 7 |
| `generateSocialVideoVideos` | window | 20048–20089 | 42 |
| `cancelSocialVideoRecording` | window | 20090–20092 | 3 |
| `generateSocialVideoStandbilder` | window | 20093–20116 | 24 |
| `generateSocialVideoContactSheets` | window | 20117–20139 | 23 |
| `rMatchcenterSocialMediaCenter` | function | 20140–20193 | 54 |
| `rLineupScoreRows` | function | 20194–20215 | 22 |
| `rLineupSimpleCards` | function | 20216–20224 | 9 |
| `rMatchcenterLineupBuilder` | function | 20225–20297 | 73 |
| `rLineupMetricPills` | function | 20298–20311 | 14 |
| `rLineupBuilderAvailablePanel` | function | 20312–20359 | 48 |
| `rLineupRecommendationCards` | function | 20360–20374 | 15 |
| `rLineupRecommendationMode` | function | 20375–20408 | 34 |
| `rLineupComplementCards` | function | 20409–20421 | 13 |
| `rLineupTestLine` | function | 20422–20470 | 49 |
| `rLineupTestMode` | function | 20471–20487 | 17 |
| `rLineupBuilderPage` | function | 20488–20522 | 35 |
| `rMatchcenterScoutingSummary` | function | 20523–20566 | 44 |
| `rMatchcenterMatchPlan` | function | 20567–20587 | 21 |
| `matchcenterStoryLogoBase` | function | 20590–20595 | 6 |
| `matchcenterStorySafeLogoUrl` | function | 20596–20602 | 7 |
| `getTeamLogoUrlForStory` | function | 20611–20640 | 30 |
| `matchcenterStoryLogoForOpponent` | function | 20641–20655 | 15 |
| `matchcenterStoryTableRank` | function | 20656–20666 | 11 |
| `matchcenterStoryUlmTableRank` | function | 20667–20673 | 7 |
| `matchcenterStoryRankText` | function | 20674–20677 | 4 |
| `matchcenterStoryInlineStat` | function | 20678–20680 | 3 |
| `matchcenterStoryRankRows` | function | 20682–20693 | 12 |
| `matchcenterStoryAddFact` | function | 20696–20702 | 7 |
| `matchcenterStoryFactKey` | function | 20703–20705 | 3 |
| `matchcenterStoryLooksArtificial` | function | 20706–20708 | 3 |
| `matchcenterStoryEstimateFactWeight` | function | 20709–20714 | 6 |
| `matchcenterStoryAddCandidate` | function | 20715–20737 | 23 |
| `matchcenterStoryCategoryLimit` | function | 20738–20741 | 4 |
| `matchcenterStoryNormalizePickOptions` | function | 20742–20752 | 11 |
| `matchcenterStoryCandidateForBudget` | function | 20753–20762 | 10 |
| `matchcenterStoryPickFactItems` | function | 20763–20815 | 53 |
| `matchcenterStoryPickFacts` | function | 20816–20818 | 3 |
| `matchcenterStoryCurrentStreak` | function | 20820–20828 | 9 |
| `matchcenterStoryWinlessStreak` | function | 20829–20837 | 9 |
| `matchcenterStoryFormFact` | function | 20838–20848 | 11 |
| `matchcenterStoryFormFactCandidates` | function | 20849–20868 | 20 |
| `matchcenterStoryLateGoalsForOutcome` | function | 20869–20872 | 4 |
| `matchcenterStoryClutchFact` | function | 20873–20887 | 15 |
| `matchcenterStoryPlayerClutchTotal` | function | 20888–20895 | 8 |
| `matchcenterStoryBestClutchPlayer` | function | 20896–20905 | 10 |
| `matchcenterStoryPlayerClutchFact` | function | 20906–20931 | 26 |
| `matchcenterStoryDuoClutchTotal` | function | 20932–20939 | 8 |
| `matchcenterStoryBestClutchDuo` | function | 20940–20949 | 10 |
| `matchcenterStoryDuoClutchFact` | function | 20950–20952 | 3 |
| `matchcenterStoryDuoFact` | function | 20953–20973 | 21 |
| `matchcenterStoryClutchPriority` | function | 20974–20976 | 3 |
| `matchcenterStoryCompetitionLabel` | function | 20977–20980 | 4 |
| `matchcenterStoryShortDuel` | function | 20981–20985 | 5 |
| `matchcenterStoryLastDuelLabel` | function | 20986–20989 | 4 |
| `matchcenterStoryDirectFactCandidates` | function | 20990–21011 | 22 |
| `matchcenterStoryPlanFactCandidates` | function | 21012–21024 | 13 |
| `matchcenterStoryCategoryForPlanFact` | function | 21025–21033 | 9 |
| `buildMatchcenterStoryPreviewData` | function | 21034–21145 | 112 |
| `matchcenterStoryNameClass` | function | 21146–21151 | 6 |
| `matchcenterStoryVisibleFacts` | function | 21152–21182 | 31 |
| `rMatchcenterStoryLogo` | function | 21183–21187 | 5 |
| `rMatchcenterStoryForm` | function | 21188–21192 | 5 |
| `rMatchcenterStoryPlayerCard` | function | 21193–21200 | 8 |
| `rMatchcenterStoryPreview` | function | 21201–21270 | 70 |
| `rMatchcenterStoryFrame` | function | 21271–21276 | 6 |
| `fitMatchcenterStoryLayout` | function | 21277–21319 | 43 |
| `ensureSocialVideoExportCapabilityChecked` | function | 21328–21332 | 5 |
| `downloadSocialVideoStandbild` | window | 21347–21366 | 20 |
| `downloadSocialVideoContactSheet` | window | 21371–21396 | 26 |
| `rMatchcenterPage` | function | 21398–21546 | 149 |
| `rTeamNoGoalStreakCard` | function | 21557–21568 | 12 |
| `rTeamPage` | function | 21569–21909 | 341 |
| `exportExcel` | function | 21914–21939 | 26 |
| `render` | function | 21945–21962 | 18 |
| `_render` | function | 21963–22132 | 170 |
| `uiFormatNumber` | function | 22166–22170 | 5 |
| `uiReliabilityDots` | function | 22179–22186 | 8 |
| `uiDeltaIndicator` | function | 22194–22200 | 7 |
| `uiInfoIcon` | function | 22212–22216 | 5 |
| `uiKennzahlKachel` | function | 22224–22235 | 12 |
| `uiKernaussage` | function | 22244–22250 | 7 |
| `uiHinweisKarte` | function | 22258–22270 | 13 |
| `uiRangliste` | function | 22280–22297 | 18 |
| `uiVerlauf` | function | 22308–22327 | 20 |
| `uiIntervallBalken` | function | 22334–22346 | 13 |
| `uiMethodenbox` | function | 22353–22362 | 10 |
| `uiNotiz` | function | 22370–22374 | 5 |
| `datenstandQuoteState` | function | 22396–22403 | 8 |
| `uiQuoteText` | function | 22406–22412 | 7 |
| `uiDatenstandBand` | function | 22429–22442 | 14 |
| `uiPlatzhalter` | function | 22450–22455 | 6 |
| `uiObjektseiteSortTabs` | function | 22500–22508 | 9 |
| `uiObjektseite` | function | 22518–22551 | 34 |
| `mainNavActiveKeyForPage` | function | 22608–22613 | 6 |
| `goToMainNavPoint` | window | 22614–22620 | 7 |
| `rMainNav` | function | 22621–22625 | 5 |
| `rMainNavBottom` | function | 22643–22650 | 8 |
| `openOverview` | window | 22660–22668 | 9 |
| `switchOverviewSeason` | window | 22677–22683 | 7 |
| `openMatchdayTimeline` | window | 22711–22718 | 8 |
| `openMatchday` | window | 22719–22728 | 10 |
| `switchMatchdaySeason` | window | 22730–22735 | 6 |
| `matchdayUlmGames` | function | 22737–22739 | 3 |
| `matchdayLineupInfo` | function | 22746–22756 | 11 |
| `matchdayLineupCardHtml` | function | 22758–22764 | 7 |
| `matchdayGameCardHtml` | function | 22765–22784 | 20 |
| `matchdayFixtureCardHtml` | function | 22790–22798 | 9 |
| `rMatchdayTimelineRow` | function | 22800–22807 | 8 |
| `rMatchdayTimelinePage` | function | 22808–22818 | 11 |
| `rMatchdayDetailPage` | function | 22819–22858 | 40 |
| `rMatchdayPage` | function | 22859–22865 | 7 |
| `overviewMatchdayStartMs` | function | 22884–22889 | 6 |
| `overviewMatchdayEndMs` | function | 22890–22895 | 6 |
| `detectOverviewPhase` | function | 22896–22921 | 26 |
| `getSeasonDataState` | function | 22928–22938 | 11 |
| `parseSeasonDataState` | function | 22939–22947 | 9 |
| `isNewSeasonDataState` | function | 22949–22951 | 3 |
| `recordOverviewVisit` | function | 22958–22967 | 10 |
| `overviewOpponentLabel` | function | 22973–22984 | 12 |
| `overviewLastMatchdayText` | function | 22985–22988 | 4 |
| `overviewNextMatchdayHtml` | function | 22995–23011 | 17 |
| `overviewCompactTableHtml` | function | 23019–23035 | 17 |
| `overviewFormHtml` | function | 23037–23051 | 15 |
| `overviewSeasonBilanzHtml` | function | 23052–23058 | 7 |
| `overviewSeasonAwardHtml` | function | 23060–23069 | 10 |
| `overviewRecordHtml` | function | 23071–23076 | 6 |
| `overviewCrossSeasonTrendHtml` | function | 23078–23086 | 9 |
| `overviewOpponentPreviewHtml` | function | 23087–23091 | 5 |
| `overviewMatchcenterLinkHtml` | function | 23092–23094 | 3 |
| `overviewLineupLinkHtml` | function | 23095–23097 | 3 |
| `overviewRankChangeTile` | function | 23114–23131 | 18 |
| `buildOverviewCards` | function | 23140–23180 | 41 |
| `rOverviewPage` | function | 23190–23201 | 12 |
| `openLigaGegner` | window | 23202–23205 | 4 |
| `rLigaGegnerPlaceholderPage` | function | 23206–23211 | 6 |
| `rAsOfSelector` | function | 23223–23235 | 13 |
| `setContextAsOf` | window | 23236–23247 | 12 |
| `rSeasonDataPreviewContextHint` | function | 23258–23266 | 9 |
| `rSeasonDataStateContextHint` | function | 23275–23281 | 7 |
| `rContextBar` | function | 23306–23324 | 19 |
| `rIaShell` | function | 23326–23328 | 3 |
| `globalSearchTokens` | function | 23345–23348 | 4 |
| `globalSearchEntries` | function | 23350–23363 | 14 |
| `globalSearchPlayerScore` | function | 23364–23371 | 8 |
| `globalSearchMatchdayScore` | function | 23373–23385 | 13 |
| `globalSearchMatch` | function | 23387–23398 | 12 |
| `globalSearchIsEditableTarget` | function | 23399–23403 | 5 |
| `globalSearchKeyAction` | function | 23405–23419 | 15 |
| `rGlobalSearchToggle` | function | 23420–23422 | 3 |
| `rGlobalSearchResultsHtml` | function | 23423–23433 | 11 |
| `rGlobalSearchPanelHtml` | function | 23434–23436 | 3 |
| `paintGlobalSearchResults` | function | 23437–23444 | 8 |
| `openGlobalSearch` | window | 23445–23469 | 25 |
| `closeGlobalSearch` | window | 23470–23477 | 8 |
| `onGlobalSearchInput` | window | 23478–23483 | 6 |
| `moveGlobalSearch` | function | 23484–23489 | 6 |
| `activateGlobalSearchResult` | window | 23490–23499 | 10 |
| `globalSearchOnKeydown` | function | 23500–23521 | 22 |
| `initGlobalSearch` | function | 23522–23526 | 5 |
| `rToolMenu` | function | 23548–23551 | 4 |
| `toolMenuElements` | function | 23552–23554 | 3 |
| `toolMenuItemElements` | function | 23555–23557 | 3 |
| `isToolMenuOpen` | function | 23558–23561 | 4 |
| `openToolMenu` | window | 23562–23569 | 8 |
| `closeToolMenu` | window | 23570–23576 | 7 |
| `toggleToolMenu` | window | 23577–23580 | 4 |
| `activateToolMenuItem` | window | 23581–23588 | 8 |
| `toolMenuOnKeydown` | function | 23589–23612 | 24 |
| `toolMenuOnClick` | function | 23613–23619 | 7 |
| `initToolMenu` | function | 23620–23623 | 4 |

## Alphabetisches Register

| Name | Art | Zeile |
|---|---|---|
| `_render` | function | 21963 |
| `acceptEinsatzCenterRosterSuggestion` | window | 7737 |
| `activateGlobalSearchResult` | window | 23490 |
| `activateToolMenuItem` | window | 23581 |
| `addComparisonDuo` | window | 13514 |
| `addComparisonDuoFromSelection` | window | 13506 |
| `addComparisonItem` | window | 13414 |
| `addDuoTeamGame` | function | 11346 |
| `addEinsatzCenterExistingGroup` | window | 7754 |
| `addEinsatzCenterGroupPlayer` | window | 7822 |
| `addEinsatzCenterNewGroup` | window | 7763 |
| `addEinsatzCenterRosterPlayer` | window | 7703 |
| `addGoalieGameToStats` | function | 4596 |
| `addGoalieSpecialTeamsGameToStats` | function | 4566 |
| `addLineupBuilderPlayerToActiveLine` | window | 2349 |
| `addLineupBuilderPlayerToLine` | window | 2339 |
| `addLineupPlayer` | window | 2285 |
| `addRosterImpactGameToStats` | function | 11881 |
| `addSelectedComparisonItem` | window | 13422 |
| `addSyntheticLineupPlayer` | window | 2365 |
| `addUnique` | function | 3720 |
| `aggregateAllTimeDuos` | function | 4946 |
| `aggregateAllTimePlayers` | function | 4014 |
| `aggregateAlltimeSpecialTeams` | function | 4546 |
| `aggregateGoalieAlltimeStats` | function | 4782 |
| `aggregateSeasonStats` | function | 4958 |
| `analysisCacheContext` | function | 2191 |
| `analysisCacheKey` | function | 2225 |
| `annotateSpecialTeamsGoalEvent` | function | 4326 |
| `antiSynergyDeltaClass` | function | 12116 |
| `antiSynergyImpactScore` | function | 12022 |
| `antiSynergyPartnerIsSgOnly` | function | 12168 |
| `antiSynergySigned` | function | 12120 |
| `appendSeasonGameDiagnostics` | function | 2561 |
| `applyAppHash` | function | 3509 |
| `applyCurrentSeasonCoverHighlight` | function | 6207 |
| `applyGlobalPageFromHash` | function | 3476 |
| `applySeasonContext` | function | 2426 |
| `applySeasonScoringToRegistry` | function | 3878 |
| `asOfCacheKeyPart` | function | 2219 |
| `asOfEquals` | function | 3180 |
| `assignStatus` | function | 5813 |
| `avgOrNull` | function | 4058 |
| `backToComparisonModeSelect` | window | 13442 |
| `backToHome` | window | 2402 |
| `buildAlltimePlayerDashModel` | function | 14581 |
| `buildAnnotatedGoalEventsForGame` | function | 10939 |
| `buildAppHash` | function | 3326 |
| `buildBalancedLineupSet` | function | 19332 |
| `buildBestThirdManOptions` | function | 10824 |
| `buildComparisonDataset` | function | 13883 |
| `buildComparisonExtraMetrics` | function | 13738 |
| `buildComparisonSummary` | function | 14247 |
| `buildConfidence` | function | 15792 |
| `buildDigitalCoachReport` | function | 18416 |
| `buildDirectDuoLookupForPlayer` | function | 10782 |
| `buildDryRunReport` | function | 6431 |
| `buildDuoAntiSynergy` | function | 12106 |
| `buildDuoComparison` | function | 13527 |
| `buildDuoCompatibility` | function | 11469 |
| `buildDuoDirectProduction` | function | 11322 |
| `buildDuoFloorCeiling` | function | 11233 |
| `buildDuoGapAnalysis` | function | 11441 |
| `buildDuoNetworkContext` | function | 11417 |
| `buildDuoOpponentAdjusted` | function | 11404 |
| `buildDuoProAnalysis` | function | 11528 |
| `buildDuoReplacementOptions` | function | 11516 |
| `buildDuoUntestedPotential` | function | 11492 |
| `buildDuoUsageRate` | function | 11504 |
| `buildDuoWarnings` | function | 11275 |
| `buildDuoWithWithoutImpact` | function | 11370 |
| `buildEinsatzCenterDraftExport` | function | 7883 |
| `buildFieldPlayerExplanation` | function | 15220 |
| `buildGlobalPageHash` | function | 3343 |
| `buildGoalieAnalysisModel` | function | 9718 |
| `buildGoalieComparisonDataset` | function | 13832 |
| `buildGoalieGameRecord` | function | 4648 |
| `buildGoaliePlayerExplanation` | function | 15295 |
| `buildGoalieRoleProfile` | function | 9944 |
| `buildGoalieStatsForSeason` | function | 4701 |
| `buildHallOfFameIntroTitle` | function | 8593 |
| `buildHallOfFameLongestNoGoalStreak` | function | 13053 |
| `buildHashStringFromParsed` | function | 3358 |
| `buildIdentityProfiles` | function | 5535 |
| `buildLineAnalysis` | function | 19112 |
| `buildLineupAnalysis` | function | 18937 |
| `buildLineupExperienceProfile` | function | 18714 |
| `buildLineupIntelligence` | function | 19101 |
| `buildLineupOpponentDNAFit` | function | 18769 |
| `buildLineupRecommendations` | function | 19368 |
| `buildLineupScoreBreakdowns` | function | 19071 |
| `buildLockerRoomSheet` | function | 18449 |
| `buildMatchcenterStoryPreviewData` | function | 21034 |
| `buildMatchdayCaptionBlocks` | function | 18520 |
| `buildMatchIntelligence` | function | 18268 |
| `buildMatchIntelligenceFromContext` | function | 18213 |
| `buildMatchStories` | function | 18316 |
| `buildMomentumSwingStats` | function | 11227 |
| `buildMomentumSwingStatsRaw` | function | 11156 |
| `buildOpponentIntelligence` | function | 10621 |
| `buildOverviewCards` | function | 23140 |
| `buildPlayerDataFoundation` | function | 4975 |
| `buildPlayerEvents` | function | 5030 |
| `buildPlayerExplanation` | function | 15349 |
| `buildPlayerIdentity` | function | 3731 |
| `buildPlayerIntelligence` | function | 15358 |
| `buildRecencyWeightedGlobalIdentityProfile` | function | 12687 |
| `buildRegistry` | function | 4999 |
| `buildResponseGoalStats` | function | 11144 |
| `buildResponseGoalStatsRaw` | function | 11095 |
| `buildRosterImpactAnalysis` | function | 12037 |
| `buildRosterImpactGameIndex` | function | 11924 |
| `buildSeasonDataPreviewChanges` | function | 6536 |
| `buildSeasonDuos` | function | 4902 |
| `buildSeasonPlayerDashModel` | function | 14544 |
| `buildSocialMediaContent` | function | 18550 |
| `buildSoloDuoProfile` | function | 5300 |
| `buildSpecialTeamsForGame` | function | 4341 |
| `buildSpecialTeamsForSeason` | function | 4537 |
| `buildStaticSeasonDataBlock` | function | 6255 |
| `buildTeamLineBalance` | function | 19288 |
| `cachedAnalysis` | function | 2229 |
| `cancelDuoProPicker` | window | 11731 |
| `cancelEinsatzCenterEdit` | window | 7684 |
| `cancelHallOfFameIntro` | function | 8682 |
| `cancelSocialVideoRecording` | window | 20090 |
| `capSuperlativeLabel` | function | 15916 |
| `clampScore` | function | 15779 |
| `classicTagLabel` | function | 8836 |
| `classifyLineIdentity` | function | 18813 |
| `classifyPenaltyType` | function | 4218 |
| `cleanupHallOfFameIntro` | function | 8622 |
| `clearAnalysisCache` | function | 2188 |
| `clearComparison` | window | 13433 |
| `clearComparisonDuos` | window | 13521 |
| `clearLineupAvailable` | window | 2338 |
| `clearLineupBuilderLine` | window | 2357 |
| `clearLineupPlayers` | window | 2292 |
| `clearlyAboveAverage` | function | 5492 |
| `clonePlain` | function | 4157 |
| `closeGlobalSearch` | window | 23470 |
| `closeMatchcenterStoryPreview` | window | 2257 |
| `closeToolMenu` | window | 23570 |
| `clutchText` | function | 5372 |
| `collectAssistEventRefs` | function | 2896 |
| `comparisonDuoContext` | function | 13447 |
| `comparisonEventGameKey` | function | 13725 |
| `comparisonEventPhaseLabel` | function | 13728 |
| `comparisonFmt` | function | 13215 |
| `comparisonItemKey` | function | 13193 |
| `comparisonJsArg` | function | 13204 |
| `comparisonNum` | function | 13207 |
| `comparisonOpponentStrengthTier` | function | 13732 |
| `comparisonPct` | function | 13211 |
| `comparisonPctFmt` | function | 13219 |
| `comparisonVariantValue` | function | 13336 |
| `composeIdentityText` | function | 5767 |
| `computeCurrentAppHash` | function | 3378 |
| `computeEinsatzCenterStats` | function | 6897 |
| `computeMetrics` | function | 5145 |
| `computeRosterStatus` | function | 5793 |
| `confidenceCautiousText` | function | 15838 |
| `confidenceFromSampleSize` | function | 12014 |
| `confirmDuoProSelection` | window | 11736 |
| `confirmEinsatzCenterCombo` | window | 7855 |
| `copyMatchcenterText` | window | 2259 |
| `countBy` | function | 10368 |
| `countCaptainAppearances` | function | 5775 |
| `countGoalieAppearances` | function | 5789 |
| `countMomentumClusters` | function | 5411 |
| `countPlayedUlmGames` | function | 2816 |
| `createPlayerAnalysisProfile` | function | 3651 |
| `createSeasonBucket` | function | 1813 |
| `datenstandQuoteState` | function | 22396 |
| `decodeHashSegmentSafe` | function | 3251 |
| `dedupeGamesById` | function | 15959 |
| `dedupeIdentityProfileTags` | function | 12764 |
| `deriveAsOfForSeason` | function | 3056 |
| `deriveLineupUlmPlayerIds` | function | 7394 |
| `deriveLineupValidPlayerIds` | function | 7370 |
| `derivePlayerStatus` | function | 3760 |
| `detectOverviewPhase` | function | 22896 |
| `detectSide` | const-arrow | 2517 |
| `detectTypes` | function | 5280 |
| `detectUlmSide` | function | 2510 |
| `diagnoseGameDuplicates` | function | 2539 |
| `diagnosticError` | function | 6028 |
| `diffGameIds` | function | 6378 |
| `difficultConnectionConfidence` | function | 10758 |
| `discardEinsatzCenterAutosave` | function | 7293 |
| `discardSeasonDataPreview` | function | 6635 |
| `dismissEinsatzCenterRosterSuggestion` | window | 7726 |
| `downloadMatchdayStory` | window | 19956 |
| `downloadSocialVideoContactSheet` | window | 21371 |
| `downloadSocialVideoStandbild` | window | 21347 |
| `duoProContextSeasonKey` | function | 11297 |
| `duoProDomId` | function | 11692 |
| `duoProPairKey` | function | 11294 |
| `duoProPickerMessage` | function | 11698 |
| `duoProPickerOpen` | function | 11695 |
| `duoProPlayer` | function | 11311 |
| `duoProResolveCandidate` | function | 11711 |
| `duoProSelectionPayload` | function | 11720 |
| `duoScopeSeasonKeys` | function | 10800 |
| `einsatzCenterAutosaveDraft` | function | 7209 |
| `einsatzCenterAutosaveInfoText` | function | 7315 |
| `einsatzCenterAutosaveKey` | function | 7120 |
| `einsatzCenterCanonicalJson` | function | 7453 |
| `einsatzCenterComputeBaseHash` | function | 7468 |
| `einsatzCenterCurrentRawBaseHash` | function | 7195 |
| `einsatzCenterDeserializeAutosave` | function | 7155 |
| `einsatzCenterDraftInView` | function | 7024 |
| `einsatzCenterDraftIsEmpty` | function | 7132 |
| `einsatzCenterDraftStaleHint` | function | 7038 |
| `einsatzCenterInspectAutosave` | function | 7244 |
| `einsatzCenterIsPlainObject` | function | 7149 |
| `einsatzCenterSerializeDraft` | function | 7136 |
| `einsatzCenterSha256Hex` | function | 7463 |
| `einsatzCenterSoftIssues` | function | 7477 |
| `einsatzCenterStorageRead` | function | 7121 |
| `einsatzCenterStorageRemove` | function | 7127 |
| `einsatzCenterStorageWrite` | function | 7124 |
| `emptyDuoTeamImpactStats` | function | 11343 |
| `emptyFieldRoleSeasonStats` | function | 3716 |
| `emptyGoalieAlltimeStats` | function | 3688 |
| `emptyGoalieSeasonStats` | function | 3664 |
| `emptyGoalieSpecialTeamsStats` | function | 3704 |
| `emptyPlayerSeasonStats` | function | 3655 |
| `emptyRosterImpactStats` | function | 11870 |
| `emptySpecialTeamsStats` | function | 4116 |
| `ensureAppLoaded` | function | 8536 |
| `ensureEinsatzCenterDraft` | function | 7060 |
| `ensureExternalSeasonData` | function | 6233 |
| `ensureFieldRoleSeasonStats` | function | 3826 |
| `ensureGlobalDataLoaded` | function | 8464 |
| `ensureGoalieSeasonStats` | function | 3821 |
| `ensureHallOfFameIntroOverlay` | function | 8560 |
| `ensureLineupDataLoaded` | function | 6743 |
| `ensureLineupGroupsRegistryLoaded` | function | 6768 |
| `ensureRmDuo` | function | 11075 |
| `ensureRmPlayer` | function | 11069 |
| `ensureSocialVideoExportCapabilityChecked` | function | 21328 |
| `escAttr` | function | 8809 |
| `escHtml` | function | 12783 |
| `eventMatchesTeams` | function | 5366 |
| `explainScore` | function | 15842 |
| `exportEinsatzCenterDraft` | window | 7897 |
| `exportExcel` | function | 21914 |
| `fallbackIdentityProfile` | function | 8844 |
| `fetchJson` | function | 6072 |
| `fetchJsonLegacy` | function | 6004 |
| `fetchJsonWithDiagnostics` | function | 6063 |
| `fetchSeasonGameRaw` | function | 6098 |
| `fetchTextWithDiagnostics` | function | 6033 |
| `fileNameForLineupSeasonKey` | function | 6725 |
| `filterComparisonDuoSuggestions` | window | 13479 |
| `filterComparisonPlayers` | window | 13390 |
| `filterLineupBuilderAvailable` | window | 2386 |
| `filterLineupPlayers` | window | 2293 |
| `filterPlayerSuggestions` | function | 13454 |
| `filterPureSGPlayers` | function | 9510 |
| `finalizeDuoTeamImpactStats` | function | 11362 |
| `finalizeGoalieSeasonStats` | function | 4581 |
| `finalizeMomentumStats` | function | 11150 |
| `finalizePlayerRegistrySeason` | function | 3925 |
| `finalizeResponseStats` | function | 11081 |
| `finalizeRosterImpactStats` | function | 11873 |
| `finalizeSeasonAppearanceTotals` | function | 3914 |
| `finalizeSpecialTeamsStats` | function | 4160 |
| `findDuplicateGameIds` | function | 6297 |
| `findLineupGameContext` | function | 6802 |
| `findLoadedSeasonPlayer` | function | 9473 |
| `finishHallOfFameIntro` | function | 8649 |
| `finiteNumbers` | function | 4055 |
| `fitMatchcenterStoryLayout` | function | 21277 |
| `fixMojibakeText` | function | 2463 |
| `formatDiagnosticAttempt` | function | 6079 |
| `formatGameLoadError` | function | 6092 |
| `formatStatus` | function | 6076 |
| `gameClassificationStatusLabel` | function | 2553 |
| `gameDaySortValue` | function | 4244 |
| `gameResult` | function | 3609 |
| `generatePlayerInsights` | function | 9332 |
| `generateSocialVideoContactSheets` | window | 20117 |
| `generateSocialVideoStandbilder` | window | 20093 |
| `generateSocialVideoVideos` | window | 20048 |
| `getActiveAlltimeSeasonKeys` | function | 10540 |
| `getActiveSeasonKey` | function | 2414 |
| `getAllLoadedSeasonGames` | function | 10733 |
| `getAlltimeAggregatedStyleProfile` | function | 14424 |
| `getAllTimeCoverStats` | function | 8415 |
| `getAllTimeDuoRows` | function | 10688 |
| `getAllTimeDuoRowsForPlayer` | function | 10426 |
| `getAllTimeGamesPlayedRows` | function | 10466 |
| `getAllTimeIdentityStandings` | function | 12651 |
| `getAllTimeMainPlayerRows` | function | 9514 |
| `getAllTimeOpponentIntelligence` | function | 12572 |
| `getAllTimeOpponentNames` | function | 2492 |
| `getAllTimeOpponentTopScorers` | function | 12580 |
| `getAllTimePenaltyRows` | function | 10491 |
| `getAllTimePlayerRows` | function | 9482 |
| `getAlltimeRank` | function | 13149 |
| `getAlltimeRecencyWeight` | function | 10551 |
| `getAllTimeSgOnlyRows` | function | 9517 |
| `getAssistDiagnostics` | function | 4847 |
| `getAssistPlayersFromEvent` | function | 2924 |
| `getCarryPerformanceRows` | function | 10437 |
| `getComparisonAlltimeTeamGoals` | function | 13240 |
| `getComparisonAlltimeTrend` | function | 13314 |
| `getComparisonChemistryFromEvents` | function | 13248 |
| `getComparisonClutchFromEvents` | function | 13253 |
| `getComparisonCurrentSelection` | function | 13379 |
| `getComparisonEventsForItem` | function | 13697 |
| `getComparisonPlayerOptions` | function | 13321 |
| `getComparisonPlayerRow` | function | 13222 |
| `getComparisonProfile` | function | 13283 |
| `getComparisonRosterGames` | function | 13717 |
| `getComparisonRosterGamesForSeason` | function | 13700 |
| `getComparisonSeasonEvents` | function | 13243 |
| `getComparisonSeasonLabel` | function | 13225 |
| `getComparisonSeasonTrend` | function | 13288 |
| `getComparisonStyleProfile` | function | 13258 |
| `getComparisonTeamGoalsForSeason` | function | 13228 |
| `getComparisonVariantsForPlayer` | function | 13339 |
| `getDifficultConnectionRowsForPlayer` | function | 11825 |
| `getDuoDirectScorerGameCounts` | function | 10858 |
| `getDuoFieldPlayerRows` | function | 11300 |
| `getDuoRowsForPlayerScope` | function | 10763 |
| `getDuoScorerCountsWithCandidate` | function | 10804 |
| `getDuoSharedFieldRows` | function | 11316 |
| `getEffectiveLineupData` | function | 7010 |
| `getEinsatzCenterGameDraft` | function | 7082 |
| `getEmptyState` | function | 15893 |
| `getFieldGameIdsForPlayer` | function | 2725 |
| `getFurtherSameDayUlmGames` | function | 4260 |
| `getGameDurationMinutes` | function | 4239 |
| `getGameId` | function | 6291 |
| `getGlobalAllTimeSnapshot` | function | 2418 |
| `getGlobalIdentityProfile` | function | 12736 |
| `getGlobalLoadableSeasonKeys` | function | 8408 |
| `getGlobalOpponentSpecialistProfile` | function | 14880 |
| `getGlobalPlayerBestSeason` | function | 10419 |
| `getGlobalPlayerMilestones` | function | 10602 |
| `getGlobalPlayerOpponentGameRows` | function | 14851 |
| `getGlobalPlayerPeakGame` | function | 10408 |
| `getGlobalPlayerTeamRecord` | function | 10382 |
| `getGlobalProfileEvents` | function | 10355 |
| `getGlobalRookieMilestone` | function | 10591 |
| `getGlobalRookieSeasonKey` | function | 10577 |
| `getGlobalSeasonStatRows` | function | 13133 |
| `getGlobalTopScorerMilestones` | function | 10564 |
| `getGoalieComparisonAlltimeTrend` | function | 13796 |
| `getGoalieComparisonSeasonTrend` | function | 13813 |
| `getGoalieDiagnostics` | function | 4833 |
| `getGoalieDnaRows` | function | 10022 |
| `getGoalieGameIdsForPlayer` | function | 2732 |
| `getGoalieOpponentName` | function | 4097 |
| `getGoalieOpponentTier` | function | 4101 |
| `getGoalScorerFromEvent` | function | 2890 |
| `getHallGoalieData` | function | 12946 |
| `getHallOfFamePlayerIdSet` | function | 10351 |
| `getHallOfFamePlayerRows` | function | 10348 |
| `getHallOfFameStats` | function | 12606 |
| `getJerseyNumber` | function | 2829 |
| `getLineupAllRows` | function | 18630 |
| `getLineupPlayerPool` | function | 18641 |
| `getLoadedSeasonPlayerUi` | function | 10377 |
| `getLoadedSeasonPointsByName` | function | 10321 |
| `getMatchcenterDirectOpponents` | function | 16034 |
| `getMatchcenterOpponents` | function | 16001 |
| `getOppStrength` | function | 3622 |
| `getOrCreatePlayerProfile` | function | 3769 |
| `getPenaltyBasePersonalMinutes` | function | 4279 |
| `getPenaltyDisciplineType` | function | 4235 |
| `getPenaltyPersonalMinutes` | function | 4286 |
| `getPenaltySpecialTeamsMinutes` | function | 4272 |
| `getPhaseIndex` | function | 5130 |
| `getPlayedUlmGames` | function | 2807 |
| `getPlayerAlltimeFieldGames` | function | 2769 |
| `getPlayerAlltimeGoalieGames` | function | 2772 |
| `getPlayerAlltimeRoleGames` | function | 2750 |
| `getPlayerAlltimeStats` | function | 9525 |
| `getPlayerAlltimeTotalGames` | function | 2775 |
| `getPlayerFieldGames` | function | 2739 |
| `getPlayerGameRole` | function | 2710 |
| `getPlayerGoalieAlltimeStats` | function | 9546 |
| `getPlayerGoalieGames` | function | 2743 |
| `getPlayerGoalieSeasonStats` | function | 9541 |
| `getPlayerRegistryProfile` | function | 9533 |
| `getPlayerRoleAvailability` | function | 9576 |
| `getPlayerSeasonRoleGameSummary` | function | 2784 |
| `getPlayerSeasonStats` | function | 9520 |
| `getPlayerSourceId` | function | 2826 |
| `getPreClubHistoryPlayerNames` | function | 2530 |
| `getPreviousSeasonKey` | function | 10276 |
| `getRosterEntryRegistryProfile` | function | 10754 |
| `getRosterGameIdsForPlayer` | function | 2651 |
| `getRosterImpactPlayerEventLookup` | function | 11891 |
| `getRosterImpactPlayerGames` | function | 11962 |
| `getRosterStatus` | function | 10557 |
| `getScoreLabel` | function | 15783 |
| `getSeasonApiBaseUrl` | function | 1838 |
| `getSeasonDataPreview` | function | 6641 |
| `getSeasonDataState` | function | 22928 |
| `getSeasonIdentityProfile` | function | 10511 |
| `getSeasonmanagerRosterSuggestion` | function | 7424 |
| `getSeasonOriginBaseUrl` | function | 1858 |
| `getSeasonPlayerFieldBasis` | function | 8913 |
| `getSeasonScopedIdentityProfile` | function | 8944 |
| `getSeasonTeamGameIds` | function | 2823 |
| `getSeasonTeamGames` | function | 2819 |
| `getSeasonUiPlayerForProfile` | function | 10507 |
| `getSpecialTeamsDiagnostics` | function | 4840 |
| `getSpecialTeamsPenaltyChunks` | function | 4304 |
| `getStaticSeasonGames` | function | 6141 |
| `getStoredLastView` | function | 3457 |
| `getSyntheticLineupPlayers` | function | 18607 |
| `getSyntheticLineupRow` | function | 18610 |
| `getSyntheticLineupRows` | function | 18627 |
| `getTeamAllTimeRecords` | function | 12530 |
| `getTeamLogoUrlForStory` | function | 20611 |
| `getUlmTeamStatus` | function | 2505 |
| `getUniqueAllTimeOpponentNames` | function | 2500 |
| `globalSearchEntries` | function | 23350 |
| `globalSearchIsEditableTarget` | function | 23399 |
| `globalSearchKeyAction` | function | 23405 |
| `globalSearchMatch` | function | 23387 |
| `globalSearchMatchdayScore` | function | 23373 |
| `globalSearchOnKeydown` | function | 23500 |
| `globalSearchPlayerScore` | function | 23364 |
| `globalSearchTokens` | function | 23345 |
| `goalieApplySampleConfidence` | function | 9703 |
| `goalieBucketLooseSum` | function | 9711 |
| `goalieBucketRows` | function | 9623 |
| `goalieClampScore` | function | 9668 |
| `goalieDetailFirstTime` | function | 9647 |
| `goalieDnaKey` | function | 9931 |
| `goalieDnaValue` | function | 9936 |
| `goalieEntryRecognitionReason` | function | 2674 |
| `goalieEventAbsSeconds` | function | 4077 |
| `goalieEventSecondInPeriod` | function | 9654 |
| `goalieGameDurationSeconds` | function | 4080 |
| `goalieGameStateBeforeGoal` | function | 4085 |
| `goalieInverseScore` | function | 9672 |
| `goalieNum` | function | 9609 |
| `goaliePctText` | function | 9660 |
| `goaliePositiveCurveScore` | function | 9688 |
| `goaliePositiveScore` | function | 9680 |
| `goalieSafeNum` | function | 9664 |
| `goalieStateGoals` | function | 9943 |
| `goalieStdDev` | function | 9641 |
| `goalieTierMeta` | function | 9632 |
| `goalieTime` | function | 9615 |
| `goalieTopRow` | function | 9629 |
| `goalieWeightedScore` | function | 9697 |
| `goToMainNavPoint` | window | 22614 |
| `hallGoalieExplainForLabel` | function | 12983 |
| `hallGoalieNameHtml` | function | 12962 |
| `hallGoalieNum` | function | 12848 |
| `hallGoaliePkStats` | function | 12874 |
| `hallGoalieRowFromStats` | function | 12913 |
| `hallGoalieSeasonLabel` | function | 12862 |
| `hallGoalieSeasonScore` | function | 12893 |
| `hallGoalieTime` | function | 12854 |
| `hallGoalieTooltip` | function | 12979 |
| `hallGoalieTopteamStats` | function | 12886 |
| `handleComparisonDuoSearchKey` | window | 13487 |
| `hasEmbeddedSeasonData` | function | 8405 |
| `hashSegmentToSeasonKey` | function | 3164 |
| `hasSeasonRole` | function | 5519 |
| `hasSeasonSource` | function | 8401 |
| `hofIntroDelay` | function | 8557 |
| `identityClutchGoalsVsTeams` | function | 5402 |
| `identityDecisiveGoalsVsTeams` | function | 5405 |
| `identityGoalsVsTeams` | function | 5399 |
| `identityInputs` | function | 5434 |
| `identityLateGoalsVsTeams` | function | 5408 |
| `identityOpponentGroups` | function | 5358 |
| `identityPartnerStats` | function | 5344 |
| `identityPointsVsTeams` | function | 5396 |
| `incGoalieBucket` | function | 4068 |
| `incrementUniqueCounter` | function | 3724 |
| `initGlobalSearch` | function | 23522 |
| `initHashRouting` | function | 3588 |
| `initToolMenu` | function | 23620 |
| `invalidateGlobalIdentityCache` | function | 2243 |
| `isActiveAlltimeSeasonStats` | function | 10526 |
| `isComebackRelevantGoal` | function | 5392 |
| `isDecisiveGoal` | function | 5378 |
| `isEinsatzCenterGameFromDraft` | function | 7019 |
| `isExcludedGoalieAppearance` | function | 2684 |
| `isFieldAppearance` | function | 2721 |
| `isGamePlayed` | function | 3023 |
| `isGoalieAppearance` | function | 2717 |
| `isGoalieRosterEntry` | function | 2660 |
| `isHallOfFameEligiblePlayer` | function | 10342 |
| `isHallRowPureSG` | function | 12863 |
| `isImportantClutchGoal` | function | 5373 |
| `isLateGoal` | function | 5386 |
| `isMatchPenaltyEvent` | function | 4229 |
| `isNewSeasonDataState` | function | 22949 |
| `isOwnGoalEvent` | function | 4315 |
| `isPenaltyGoalEvent` | function | 4308 |
| `isPreClubHistoryPlayerName` | function | 2533 |
| `isPureSGPlayer` | function | 9506 |
| `isRookieCandidateForSeason` | function | 10311 |
| `isSameUlmTeamContext` | function | 4252 |
| `isSeasonDataPreviewStale` | function | 6649 |
| `isSgOnlyAlltimePlayer` | function | 9498 |
| `isSgOnlyHallOfFameExcluded` | function | 10333 |
| `isSyntheticLineupPlayerId` | function | 18604 |
| `isToolMenuOpen` | function | 23558 |
| `isTwoPlusTwoPenaltyEvent` | function | 4232 |
| `isUsableExternalSeasonData` | function | 6224 |
| `isValidAsOfDate` | function | 3168 |
| `isValidAsOfStartTime` | function | 3171 |
| `isVisibleSecondaryTrait` | function | 8815 |
| `kpiBadge` | function | 14205 |
| `kpiDelta` | function | 13924 |
| `kpiItemColor` | function | 13930 |
| `kpiNiceMax` | function | 14095 |
| `kpiRadarValue` | function | 14018 |
| `kpiTrendRows` | function | 14101 |
| `kpiValueText` | function | 13920 |
| `lexiconEntry` | function | 15589 |
| `lexiconUniqueKeys` | function | 15581 |
| `lineupAverage` | function | 18656 |
| `lineupBuilderPoolIds` | function | 2300 |
| `lineupCombinationIds` | function | 19133 |
| `lineupDirectChemistryScore` | function | 19177 |
| `lineupEvaluateComplementCandidate` | function | 19184 |
| `lineupGroupDisplayName` | function | 6928 |
| `lineupLevelLabel` | function | 18660 |
| `lineupOpponentDNAForContext` | function | 18757 |
| `lineupPlayerAnchorConfidence` | function | 19283 |
| `lineupPlayerAnchorScore` | function | 19263 |
| `lineupPlayerProfile` | function | 18861 |
| `lineupRankCandidateIds` | function | 19118 |
| `lineupRecommendationReason` | function | 19359 |
| `lineupRoleDnaComplementScore` | function | 19153 |
| `lineupRosterGamesForPlayer` | function | 18666 |
| `lineupRowMap` | function | 19115 |
| `lineupRowMeta` | function | 18633 |
| `lineupScore` | function | 18650 |
| `lineupStdDev` | function | 19147 |
| `linkUiPlayersToRegistry` | function | 3856 |
| `loadEinsatzCenterMismatchedAutosave` | function | 7339 |
| `loadSeason` | function | 8481 |
| `loadSeasonData` | function | 7924 |
| `loadSeasonForGlobal` | function | 8433 |
| `loadSeasonManifest` | function | 6156 |
| `mainNavActiveKeyForPage` | function | 22608 |
| `markFieldRoleAppearance` | function | 3831 |
| `matchcenterAddDuoConnection` | function | 16436 |
| `matchcenterAddPlanItem` | function | 17653 |
| `matchcenterAddPlanWatch` | function | 17659 |
| `matchcenterAddUlmDuoConnection` | function | 16587 |
| `matchcenterAddUlmScoring` | function | 16214 |
| `matchcenterAnalyzeDirect` | function | 16067 |
| `matchcenterAnalyzeForm` | function | 16104 |
| `matchcenterBuildCoachActivationHints` | function | 18401 |
| `matchcenterBuildCoachAvoidList` | function | 18391 |
| `matchcenterBuildCoachDangerPatterns` | function | 18373 |
| `matchcenterBuildCoachHints` | function | 18129 |
| `matchcenterBuildCoachIfThen` | function | 18381 |
| `matchcenterBuildCoachKeyActors` | function | 18408 |
| `matchcenterBuildCoachLevers` | function | 18363 |
| `matchcenterBuildCoachPriorities` | function | 18356 |
| `matchcenterBuildGoalieMatchup` | function | 16788 |
| `matchcenterBuildInsights` | function | 17075 |
| `matchcenterBuildIntelHeadline` | function | 18145 |
| `matchcenterBuildIntelligenceDataQuality` | function | 17761 |
| `matchcenterBuildIntelligenceSignals` | function | 18166 |
| `matchcenterBuildIntelListFromPlan` | function | 18120 |
| `matchcenterBuildMatchPlan` | function | 19478 |
| `matchcenterBuildOneThingToWatch` | function | 18153 |
| `matchcenterBuildOpponentAlarm` | function | 18010 |
| `matchcenterBuildOpponentDNA` | function | 17831 |
| `matchcenterBuildOpponentDuoInsights` | function | 16535 |
| `matchcenterBuildOpponentDuos` | function | 16490 |
| `matchcenterBuildPlanConfidence` | function | 17665 |
| `matchcenterBuildSpecialTeamsMatchup` | function | 16718 |
| `matchcenterBuildTimingAnalysis` | function | 16914 |
| `matchcenterBuildTimingInsights` | function | 16903 |
| `matchcenterBuildUlmDuoInsights` | function | 16685 |
| `matchcenterBuildUlmDuos` | function | 16642 |
| `matchcenterBuildUlmPlayerInsights` | function | 16379 |
| `matchcenterBuildUlmPlayerScouting` | function | 16324 |
| `matchcenterClassifyUlmGoalEvent` | function | 16203 |
| `matchcenterCoachAdd` | function | 18293 |
| `matchcenterCoachCautious` | function | 18290 |
| `matchcenterCoachGameModel` | function | 18302 |
| `matchcenterCoachPriorityFromAlarm` | function | 18346 |
| `matchcenterConfidenceClass` | function | 17640 |
| `matchcenterDateLabel` | function | 15943 |
| `matchcenterDefaultSeasonKey` | function | 15981 |
| `matchcenterDeriveOpponentType` | function | 17944 |
| `matchcenterDirectContextGames` | function | 16698 |
| `matchcenterDuoDirectionLabel` | function | 16429 |
| `matchcenterDuoPairKey` | function | 16392 |
| `matchcenterEmptyBuckets` | function | 16144 |
| `matchcenterEmptyTimingStats` | function | 16849 |
| `matchcenterEnsureOpponentDuo` | function | 16396 |
| `matchcenterEnsureUlmDuo` | function | 16549 |
| `matchcenterEnsureUlmPlayer` | function | 16152 |
| `matchcenterFinalizeOpponentDuos` | function | 16455 |
| `matchcenterFinalizeUlmDuos` | function | 16606 |
| `matchcenterFinalizeUlmPlayers` | function | 16255 |
| `matchcenterFormLine` | function | 17070 |
| `matchcenterGameLine` | function | 17064 |
| `matchcenterGoalAbsSeconds` | function | 16836 |
| `matchcenterGoalieFitScore` | function | 16771 |
| `matchcenterGoalieKey` | function | 16766 |
| `matchcenterInferPriority` | function | 17646 |
| `matchcenterIntelAddAlarm` | function | 17989 |
| `matchcenterIntelCurve` | function | 17713 |
| `matchcenterIntelDataLabel` | function | 17758 |
| `matchcenterIntelDuoRef` | function | 17975 |
| `matchcenterIntelInverseCurve` | function | 17719 |
| `matchcenterIntelPct` | function | 17738 |
| `matchcenterIntelPlayerRef` | function | 17962 |
| `matchcenterIntelPriorityClass` | function | 17748 |
| `matchcenterIntelPriorityFromScore` | function | 17742 |
| `matchcenterIntelPriorityLabel` | function | 17754 |
| `matchcenterIntelRate` | function | 17734 |
| `matchcenterIntelWeighted` | function | 17723 |
| `matchcenterIsFreiburgTuebingenTeamName` | function | 15968 |
| `matchcenterOpponentMode` | function | 15998 |
| `matchcenterPct` | function | 16714 |
| `matchcenterPersonalPenaltyMinutesForSide` | function | 16705 |
| `matchcenterPlanRateText` | function | 17632 |
| `matchcenterPlanScoreText` | function | 17628 |
| `matchcenterPriorityLabel` | function | 17637 |
| `matchcenterRegisterUlmProfileGame` | function | 16190 |
| `matchcenterResultClass` | function | 17055 |
| `matchcenterSeasonHasGames` | function | 15978 |
| `matchcenterSigned` | function | 15937 |
| `matchcenterSocialAdd` | function | 18470 |
| `matchcenterSocialCaption` | function | 18477 |
| `matchcenterSpecialTeamsForGame` | function | 16701 |
| `matchcenterStoryAddCandidate` | function | 20715 |
| `matchcenterStoryAddFact` | function | 20696 |
| `matchcenterStoryBestClutchDuo` | function | 20940 |
| `matchcenterStoryBestClutchPlayer` | function | 20896 |
| `matchcenterStoryCandidateForBudget` | function | 20753 |
| `matchcenterStoryCategoryForPlanFact` | function | 21025 |
| `matchcenterStoryCategoryLimit` | function | 20738 |
| `matchcenterStoryClutchFact` | function | 20873 |
| `matchcenterStoryClutchPriority` | function | 20974 |
| `matchcenterStoryCompetitionLabel` | function | 20977 |
| `matchcenterStoryCurrentStreak` | function | 20820 |
| `matchcenterStoryDirectFactCandidates` | function | 20990 |
| `matchcenterStoryDownloadFileName` | function | 19946 |
| `matchcenterStoryDuoClutchFact` | function | 20950 |
| `matchcenterStoryDuoClutchTotal` | function | 20932 |
| `matchcenterStoryDuoFact` | function | 20953 |
| `matchcenterStoryEstimateFactWeight` | function | 20709 |
| `matchcenterStoryFactKey` | function | 20703 |
| `matchcenterStoryFormFact` | function | 20838 |
| `matchcenterStoryFormFactCandidates` | function | 20849 |
| `matchcenterStoryInlineStat` | function | 20678 |
| `matchcenterStoryLastDuelLabel` | function | 20986 |
| `matchcenterStoryLateGoalsForOutcome` | function | 20869 |
| `matchcenterStoryLogoBase` | function | 20590 |
| `matchcenterStoryLogoForOpponent` | function | 20641 |
| `matchcenterStoryLooksArtificial` | function | 20706 |
| `matchcenterStoryNameClass` | function | 21146 |
| `matchcenterStoryNormalizePickOptions` | function | 20742 |
| `matchcenterStoryPickFactItems` | function | 20763 |
| `matchcenterStoryPickFacts` | function | 20816 |
| `matchcenterStoryPlanFactCandidates` | function | 21012 |
| `matchcenterStoryPlayerClutchFact` | function | 20906 |
| `matchcenterStoryPlayerClutchTotal` | function | 20888 |
| `matchcenterStoryRankRows` | function | 20682 |
| `matchcenterStoryRankText` | function | 20674 |
| `matchcenterStorySafeLogoUrl` | function | 20596 |
| `matchcenterStoryShortDuel` | function | 20981 |
| `matchcenterStoryTableRank` | function | 20656 |
| `matchcenterStoryUlmTableRank` | function | 20667 |
| `matchcenterStoryVisibleFacts` | function | 21152 |
| `matchcenterStoryWinlessStreak` | function | 20829 |
| `matchcenterTimeValue` | function | 16841 |
| `matchcenterTimingStatsForGames` | function | 16865 |
| `matchcenterUlmScoutingConfidence` | function | 16147 |
| `matchcenterUlmTeamLabelForGame` | function | 17059 |
| `matchcenterUpdateUlmSeasonRow` | function | 16196 |
| `matchcenterWindowForSecond` | function | 16858 |
| `matchdayFixtureCardHtml` | function | 22790 |
| `matchdayGameCardHtml` | function | 22765 |
| `matchdayLineupCardHtml` | function | 22758 |
| `matchdayLineupInfo` | function | 22746 |
| `matchdayUlmGames` | function | 22737 |
| `medianOrNull` | function | 4062 |
| `mergeDuoSet` | function | 4929 |
| `mergeGoalieSpecialTeamsStats` | function | 4554 |
| `mergeSpecialTeamsStats` | function | 4170 |
| `moveGlobalSearch` | function | 23484 |
| `noGoalStreakGoaliesForGame` | function | 13045 |
| `normalizeAssistPlayerName` | function | 2893 |
| `normalizeComparisonItem` | function | 13199 |
| `normalizeDuoComparisonItem` | function | 13443 |
| `normalizeEventPlayerRef` | function | 2832 |
| `normalizeLineupLines` | function | 2303 |
| `normalizePlayerName` | function | 2520 |
| `normalizeSecondaryTraits` | function | 5493 |
| `onGlobalSearchInput` | window | 23478 |
| `openAllTimePlayers` | window | 8549 |
| `openComparisonCenter` | window | 8719 |
| `openDuoProPicker` | window | 11730 |
| `openEinsatzCenter` | window | 6879 |
| `openGlobalSearch` | window | 23445 |
| `openHallOfFame` | window | 8695 |
| `openLexicon` | window | 8792 |
| `openLigaGegner` | window | 23202 |
| `openLineupBuilder` | window | 8770 |
| `openMatchcenter` | window | 8748 |
| `openMatchcenterStoryPreview` | window | 2256 |
| `openMatchday` | window | 22719 |
| `openMatchdayTimeline` | window | 22711 |
| `openOverview` | window | 22660 |
| `openSeason` | window | 8546 |
| `openToolMenu` | window | 23562 |
| `overviewCompactTableHtml` | function | 23019 |
| `overviewCrossSeasonTrendHtml` | function | 23078 |
| `overviewFormHtml` | function | 23037 |
| `overviewLastMatchdayText` | function | 22985 |
| `overviewLineupLinkHtml` | function | 23095 |
| `overviewMatchcenterLinkHtml` | function | 23092 |
| `overviewMatchdayEndMs` | function | 22890 |
| `overviewMatchdayStartMs` | function | 22884 |
| `overviewNextMatchdayHtml` | function | 22995 |
| `overviewOpponentLabel` | function | 22973 |
| `overviewOpponentPreviewHtml` | function | 23087 |
| `overviewRankChangeTile` | function | 23114 |
| `overviewRecordHtml` | function | 23071 |
| `overviewSeasonAwardHtml` | function | 23060 |
| `overviewSeasonBilanzHtml` | function | 23052 |
| `p1NarrativeKey` | function | 15857 |
| `paintGlobalSearchResults` | function | 23437 |
| `parseAppHash` | function | 3271 |
| `parseAsOfQueryValue` | function | 3310 |
| `parseComparisonVariant` | function | 13364 |
| `parseLastViewState` | function | 3445 |
| `parseSeasonDataState` | function | 22939 |
| `pct` | function | 5297 |
| `pctValue` | function | 12786 |
| `pdashBestPhase` | function | 14491 |
| `pdashInsight` | function | 14529 |
| `pdashInsights` | function | 14532 |
| `pdashNum` | function | 14475 |
| `pdashOpponentStrength` | function | 14509 |
| `pdashOpponentTier` | function | 14503 |
| `pdashPct` | function | 14479 |
| `pdashPhaseLabel` | function | 14483 |
| `pdashTopCount` | function | 14487 |
| `pdashTopOpponent` | function | 14499 |
| `pdashTopPartner` | function | 14495 |
| `penaltyRawText` | function | 4202 |
| `playerAppearedForUlmStatusInSeasonByName` | function | 10292 |
| `playerAppearedInSeasonByName` | function | 10281 |
| `playerExplainAdd` | function | 15165 |
| `playerExplainConfidence` | function | 15156 |
| `playerExplainConfidenceLabel` | function | 15162 |
| `playerExplainContextSentence` | function | 15201 |
| `playerExplainHeadline` | function | 15191 |
| `playerExplainRolePhrase` | function | 15182 |
| `playerExplainStyleSignature` | function | 15170 |
| `playerRoleInGame` | function | 2705 |
| `processGame` | function | 2957 |
| `rAlltimeKpis` | function | 13155 |
| `rAlltimePlayerDashboard` | function | 14684 |
| `rAllTimePlayersPage` | function | 15446 |
| `rankNarratives` | function | 15879 |
| `rAntiSynergyCompareChip` | function | 12125 |
| `rAntiSynergyDelta` | function | 12109 |
| `rAntiSynergyMainDelta` | function | 12172 |
| `rAntiSynergyMetricRow` | function | 12133 |
| `rAntiSynergyWinrateRow` | function | 12155 |
| `rAntiSynergyWinrateText` | function | 12149 |
| `rAsOfSelector` | function | 23223 |
| `ratio01` | function | 5298 |
| `rAvgResponseTimeNote` | function | 12406 |
| `rCarryPerformanceRows` | function | 10453 |
| `rClassicRoleTags` | function | 8901 |
| `rClassicTagTip` | function | 8839 |
| `rClutch` | function | 9132 |
| `rClutchBadge` | function | 8801 |
| `rComparisonCenterPage` | function | 14354 |
| `rComparisonDashboard` | function | 14305 |
| `rComparisonDuoSearchBox` | function | 13673 |
| `rComparisonDuoSuggestionButtons` | function | 13466 |
| `rComparisonMiniOverview` | function | 14293 |
| `rComparisonModeSelect` | function | 13694 |
| `rComparisonRoles` | function | 14297 |
| `rComparisonStyles` | function | 14316 |
| `rContextBar` | function | 23306 |
| `rDifficultConnectionList` | function | 12182 |
| `rDifficultConnectionListCompact` | function | 12249 |
| `rDifficultConnectionListCompactLegacy` | function | 12207 |
| `rDifficultConnectionsCard` | function | 12288 |
| `rDuoCenterPro` | function | 11572 |
| `rDuoCompareSummaryCards` | function | 13552 |
| `rDuoComparisonBars` | function | 13547 |
| `rDuoComparisonChemistry` | function | 13605 |
| `rDuoComparisonContext` | function | 13637 |
| `rDuoComparisonDashboard` | function | 13659 |
| `rDuoComparisonDetails` | function | 13655 |
| `rDuoComparisonImpact` | function | 13621 |
| `rDuoComparisonPage` | function | 13683 |
| `rDuoComparisonProfile` | function | 13583 |
| `rDuoProPlayerSelect` | function | 11759 |
| `rDuoResponseMomentumCard` | function | 12464 |
| `rDuoRows` | function | 10712 |
| `recommendLineComplements` | function | 19450 |
| `recordOverviewVisit` | function | 22958 |
| `registerPlayerIdentity` | function | 3803 |
| `registerSeasonRosters` | function | 3836 |
| `rEinsatzCenterAutosaveBanner` | function | 7301 |
| `rEinsatzCenterCombo` | function | 6824 |
| `rEinsatzCenterComboEditor` | function | 7529 |
| `rEinsatzCenterDraftBanner` | function | 7042 |
| `rEinsatzCenterDraftMark` | function | 7028 |
| `rEinsatzCenterDraftStatsHint` | function | 7032 |
| `rEinsatzCenterEditPage` | function | 7629 |
| `rEinsatzCenterGameCard` | function | 6833 |
| `rEinsatzCenterGameEditor` | function | 7576 |
| `rEinsatzCenterGroup` | function | 6811 |
| `rEinsatzCenterGroupEditor` | function | 7498 |
| `rEinsatzCenterPage` | function | 6852 |
| `rEinsatzCenterRosterSuggestionCard` | function | 7545 |
| `rEinsatzCenterStats` | function | 6934 |
| `relative01` | function | 5299 |
| `removeComparisonDuo` | window | 13517 |
| `removeComparisonItem` | window | 13429 |
| `removeEinsatzCenterCombo` | window | 7866 |
| `removeEinsatzCenterGroup` | window | 7780 |
| `removeEinsatzCenterGroupPlayer` | window | 7830 |
| `removeEinsatzCenterRosterPlayer` | window | 7711 |
| `removeLineupBuilderPlayerFromLine` | window | 2350 |
| `removeLineupPlayer` | window | 2291 |
| `rEmptyState` | function | 15905 |
| `renameEinsatzCenterGroup` | window | 7802 |
| `render` | function | 21945 |
| `renderComparisonDuoSuggestions` | function | 13470 |
| `renderTags` | function | 8909 |
| `repairRenderedMojibake` | function | 2466 |
| `resetPlayerRegistrySeason` | function | 3748 |
| `resolveAssistPlayer` | function | 2938 |
| `resolveCurrentSeasonKey` | function | 6187 |
| `resolveGoalScorerPlayer` | function | 2875 |
| `resolveLineupPlayerName` | function | 6796 |
| `resolvePlayerRoleView` | function | 9594 |
| `resolveRosterPlayerByRef` | function | 2844 |
| `responseExcerpt` | function | 6025 |
| `responseMomentumAbsSeconds` | function | 10894 |
| `responseMomentumActor` | function | 10920 |
| `responseMomentumConfidence` | function | 11053 |
| `responseMomentumEmptyState` | function | 11058 |
| `responseMomentumGameRows` | function | 10904 |
| `responseMomentumGoalActors` | function | 10931 |
| `responseMomentumPairKey` | function | 11066 |
| `responseMomentumSide` | function | 10911 |
| `responseMomentumTime` | function | 10897 |
| `responseMomentumTooltipFor` | function | 12369 |
| `restoreEinsatzCenterAutosave` | function | 7275 |
| `restoreHallOfFameIntroPrevious` | function | 8637 |
| `resultGoalsAgainstForSide` | function | 4106 |
| `returnToEinsatzCenterEdit` | window | 7697 |
| `rGlobalAllTimeStats` | function | 14792 |
| `rGlobalCareerHeader` | function | 14701 |
| `rGlobalDevelopment` | function | 14810 |
| `rGlobalDnaBars` | function | 14445 |
| `rGlobalDuoNetwork` | function | 14910 |
| `rGlobalOpponentSpecialist` | function | 15109 |
| `rGlobalOverview` | function | 14739 |
| `rGlobalPartnerOpponentPanel` | function | 14687 |
| `rGlobalProfileTags` | function | 12777 |
| `rGlobalSearchPanelHtml` | function | 23434 |
| `rGlobalSearchResultsHtml` | function | 23423 |
| `rGlobalSearchToggle` | function | 23420 |
| `rGoalieAnalysis` | function | 10249 |
| `rGoalieBars` | function | 9877 |
| `rGoalieDnaBars` | function | 10026 |
| `rGoalieFirstGoalResistance` | function | 10084 |
| `rGoalieInsights` | function | 10157 |
| `rGoalieKpis` | function | 10061 |
| `rGoalieMiniMetrics` | function | 10078 |
| `rGoalieMomentum` | function | 10098 |
| `rGoalieOpponents` | function | 10200 |
| `rGoalieOverview` | function | 10179 |
| `rGoaliePhaseProfile` | function | 10140 |
| `rGoaliePhases` | function | 10197 |
| `rGoalieRoleTraits` | function | 10018 |
| `rGoalieScoringRow` | function | 10040 |
| `rGoalieStability` | function | 10212 |
| `rGoalieTable` | function | 10241 |
| `rGoalieTierCards` | function | 10112 |
| `rHallDuoTemple` | function | 12839 |
| `rHallGoalieAwardCards` | function | 13079 |
| `rHallGoalieLegends` | function | 13100 |
| `rHallGoalieRankCard` | function | 12998 |
| `rHallOfFameHero` | function | 12790 |
| `rHallOfFamePage` | function | 15488 |
| `rHallPodiumList` | function | 12816 |
| `rHallSGBadge` | function | 12871 |
| `rIaShell` | function | 23326 |
| `rIdentityCards` | function | 8875 |
| `rIdentityTags` | function | 8855 |
| `rInsights` | function | 9393 |
| `rInteractiveDuoCenterPro` | function | 11766 |
| `rKpiCards` | function | 13933 |
| `rKpiExtendedMetrics` | function | 14080 |
| `rKpiInfoCards` | function | 14215 |
| `rKpiMetricCard` | function | 14072 |
| `rKpiMirrorRows` | function | 13958 |
| `rKpiObjectMini` | function | 14208 |
| `rKpiOpponentStrength` | function | 14177 |
| `rKpiRadar` | function | 14029 |
| `rKpiShareBars` | function | 14064 |
| `rKpiTextMetricCard` | function | 14077 |
| `rKpiTrendCompare` | function | 14110 |
| `rKPIVergleich` | function | 14279 |
| `rLexiconPage` | function | 15603 |
| `rLexiconRows` | function | 15599 |
| `rLigaGegnerPlaceholderPage` | function | 23206 |
| `rLineupBuilderAvailablePanel` | function | 20312 |
| `rLineupBuilderPage` | function | 20488 |
| `rLineupComplementCards` | function | 20409 |
| `rLineupMetricPills` | function | 20298 |
| `rLineupRecommendationCards` | function | 20360 |
| `rLineupRecommendationMode` | function | 20375 |
| `rLineupScoreRows` | function | 20194 |
| `rLineupSimpleCards` | function | 20216 |
| `rLineupTestLine` | function | 20422 |
| `rLineupTestMode` | function | 20471 |
| `rMainNav` | function | 22621 |
| `rMainNavBottom` | function | 22643 |
| `rMatchcenterCoachCardList` | function | 19773 |
| `rMatchcenterCoachIfThen` | function | 19787 |
| `rMatchcenterCoachSimpleList` | function | 19795 |
| `rMatchcenterCopyButton` | function | 19865 |
| `rMatchcenterDetailsSection` | function | 17047 |
| `rMatchcenterDigitalCoach` | function | 19800 |
| `rMatchcenterDuoRankCard` | function | 17366 |
| `rMatchcenterDuoRow` | function | 17342 |
| `rMatchcenterDuosTab` | function | 17513 |
| `rMatchcenterDuoWatchCard` | function | 17322 |
| `rMatchcenterFormCard` | function | 17103 |
| `rMatchcenterFormSection` | function | 17021 |
| `rMatchcenterGamesList` | function | 17124 |
| `rMatchcenterGoalieCard` | function | 17575 |
| `rMatchcenterGoalieMatchup` | function | 17599 |
| `rMatchcenterIntelCoachHints` | function | 19759 |
| `rMatchcenterIntelOverview` | function | 19713 |
| `rMatchcenterKpi` | function | 17096 |
| `rMatchcenterLineupBuilder` | function | 20225 |
| `rMatchcenterLockerList` | function | 19870 |
| `rMatchcenterLockerRoomSheet` | function | 19882 |
| `rMatchcenterMatchPlan` | function | 20567 |
| `rMatchcenterOpponentAlarm` | function | 19691 |
| `rMatchcenterOpponentDNA` | function | 19658 |
| `rMatchcenterOpponentDuos` | function | 17470 |
| `rMatchcenterOpponentScouting` | function | 17283 |
| `rMatchcenterPage` | function | 21398 |
| `rMatchcenterPlanItems` | function | 19624 |
| `rMatchcenterPlanWatch` | function | 19642 |
| `rMatchcenterPlayerRow` | function | 17157 |
| `rMatchcenterPlayersTab` | function | 17319 |
| `rMatchcenterProfileSection` | function | 17001 |
| `rMatchcenterRankCard` | function | 17181 |
| `rMatchcenterResponseMomentum` | function | 12491 |
| `rMatchcenterScoutingSummary` | function | 20523 |
| `rMatchcenterSocialBlock` | function | 19938 |
| `rMatchcenterSocialMediaCenter` | function | 20140 |
| `rMatchcenterSpecialCard` | function | 17516 |
| `rMatchcenterSpecialTeams` | function | 17525 |
| `rMatchcenterStoryForm` | function | 21188 |
| `rMatchcenterStoryFrame` | function | 21271 |
| `rMatchcenterStoryLogo` | function | 21183 |
| `rMatchcenterStoryPlayerCard` | function | 21193 |
| `rMatchcenterStoryPreview` | function | 21201 |
| `rMatchcenterTabs` | function | 16998 |
| `rMatchcenterTimeBars` | function | 16925 |
| `rMatchcenterTiming` | function | 16959 |
| `rMatchcenterTimingStatsCard` | function | 16939 |
| `rMatchcenterUlmDuoRankCard` | function | 17421 |
| `rMatchcenterUlmDuoRow` | function | 17398 |
| `rMatchcenterUlmDuos` | function | 17427 |
| `rMatchcenterUlmDuoWatchCard` | function | 17372 |
| `rMatchcenterUlmImpactCard` | function | 17187 |
| `rMatchcenterUlmPlayerRow` | function | 17216 |
| `rMatchcenterUlmRankCard` | function | 17240 |
| `rMatchcenterUlmScouting` | function | 17246 |
| `rMatchcenterWatchCard` | function | 17136 |
| `rMatchdayDetailPage` | function | 22819 |
| `rMatchdayPage` | function | 22859 |
| `rMatchdayTimelinePage` | function | 22808 |
| `rMatchdayTimelineRow` | function | 22800 |
| `rMatrix` | function | 9005 |
| `rmTerm` | function | 12376 |
| `roleGameStableKey` | function | 2747 |
| `roleTraitLabel` | function | 8812 |
| `rOppBreakdown` | function | 9297 |
| `rOpponentIntelBars` | function | 10676 |
| `rOpponentTopScorerTable` | function | 12630 |
| `rosterImpactConfidence` | function | 12004 |
| `rosterImpactConfidenceWeight` | function | 12018 |
| `rosterPlayerMatches` | function | 2636 |
| `rOverviewPage` | function | 23190 |
| `rPdashLabel` | function | 14636 |
| `rPdashStat` | function | 14639 |
| `rPenalties` | function | 9278 |
| `rPhases` | function | 9062 |
| `rPlayerDash` | function | 14642 |
| `rPlayerDashStyles` | function | 14624 |
| `rPlayerExplainItems` | function | 15388 |
| `rPlayerExplanation` | function | 15393 |
| `rPlayerResponseMomentumCard` | function | 12445 |
| `rPlayerRoleSwitch` | function | 9602 |
| `rRadar` | function | 9082 |
| `rRes` | const-arrow | 8800 |
| `rResponseMomentumOverviewCard` | function | 12421 |
| `rResponseRateDisplay` | function | 12385 |
| `rRmKpi` | function | 12392 |
| `rRmTopList` | function | 12410 |
| `rRoleTraitTip` | function | 8819 |
| `rRosterImpactStatLine` | function | 12164 |
| `rRosterStatusBadge` | function | 8828 |
| `rScoreBreakdown` | function | 15919 |
| `rSeasonDataPreviewCard` | function | 6668 |
| `rSeasonDataPreviewContextHint` | function | 23258 |
| `rSeasonDataPreviewRows` | function | 6658 |
| `rSeasonDataPreviewStatus` | function | 6655 |
| `rSeasonDataStateContextHint` | function | 23275 |
| `rSeasonDuoCenterPro` | function | 11822 |
| `rSeasonDuoSummary` | function | 9052 |
| `rSeasonInsightsTab` | function | 9378 |
| `rSeasonLandingPage` | function | 14723 |
| `rSeasonPlayerDashboard` | function | 14681 |
| `rSeasonProfileKpis` | function | 8961 |
| `rSeasonProfileTagStrip` | function | 8991 |
| `rSeasonTrendRows` | function | 14405 |
| `rSocialVideoBlock` | function | 20007 |
| `rSparkline` | function | 13169 |
| `rStyleMetricTip` | function | 8824 |
| `rStyleProfileBars` | function | 8864 |
| `rTable` | function | 9447 |
| `rTeamNoGoalStreakCard` | function | 21557 |
| `rTeamPage` | function | 21569 |
| `rTeamResponseMomentumCard` | function | 12484 |
| `rTimeline` | function | 9167 |
| `rToolMenu` | function | 23548 |
| `runComparison` | window | 13434 |
| `runDuoComparison` | window | 13522 |
| `saveLastView` | function | 3462 |
| `scoreNarrative` | function | 15860 |
| `seasonApiUrl` | function | 1855 |
| `seasonDataPreviewRerender` | function | 6514 |
| `seasonDataPreviewRow` | function | 6518 |
| `seasonGameApiUrls` | function | 1873 |
| `seasonGameHtmlUrls` | function | 1883 |
| `seasonHasPureUlmTeam` | function | 10326 |
| `seasonKeyToHashSegment` | function | 3161 |
| `seasonPathPrefix` | function | 1867 |
| `seasonRoleKeysForPlayer` | function | 5510 |
| `seasonRoleTraitsFromClassic` | function | 5505 |
| `seasonStatNumber` | function | 10516 |
| `seasonStatSetSize` | function | 10520 |
| `seedHallOfFameIntroParticles` | function | 8604 |
| `selectAllLineupAvailable` | window | 2337 |
| `selectComparisonDuoSuggestion` | window | 13480 |
| `selectComparisonMode` | window | 13441 |
| `selectComparisonPlayer` | window | 13398 |
| `selectDuoProQuick` | window | 11732 |
| `selectEinsatzCenterEditGame` | window | 7699 |
| `selectEnforcerKeys` | function | 5522 |
| `serializeFieldRoleSeasonStats` | function | 3979 |
| `serializeGoalieSeasonStats` | function | 3956 |
| `serializeSeasonStats` | function | 3941 |
| `serializeSpecialTeamsStats` | function | 4167 |
| `setAntiSynergyView` | window | 2383 |
| `setComparisonDuoMode` | window | 13451 |
| `setComparisonDuoPlayer` | window | 13500 |
| `setComparisonDuoSearch` | window | 13453 |
| `setComparisonDuoSeasonKey` | window | 13452 |
| `setComparisonRoleMode` | window | 13404 |
| `setComparisonVariant` | window | 13409 |
| `setContextAsOf` | window | 23236 |
| `setDuoProPickerState` | function | 11701 |
| `setDuoProSelection` | window | 11751 |
| `setEinsatzCenterGameNote` | window | 7873 |
| `setEinsatzCenterGroupPlayerPosition` | window | 7838 |
| `setEinsatzCenterIncludeDraft` | window | 7698 |
| `setEinsatzCenterSeason` | window | 6873 |
| `setGlobalPlayer` | window | 2409 |
| `setGlobalPlayerDuo` | window | 2410 |
| `setGlobalTab` | window | 2411 |
| `setGoalieTab` | window | 2250 |
| `setLineupActiveLine` | window | 2322 |
| `setLineupBuilderMode` | window | 2321 |
| `setLineupBuilderOpponent` | window | 2320 |
| `setLineupBuilderSeason` | window | 2308 |
| `setLineupNewPlayerProfile` | window | 2364 |
| `setMatchcenterContext` | window | 8789 |
| `setMatchcenterOpponent` | window | 8788 |
| `setMatchcenterSeason` | window | 8790 |
| `setMatchcenterTab` | window | 2255 |
| `setP` | window | 2247 |
| `setPage` | window | 2393 |
| `setPlayerRoleView` | window | 2249 |
| `setSeasonDataPreviewOpen` | window | 6704 |
| `setSeasonDataPreviewPasteText` | window | 6705 |
| `setState` | const-arrow | 2235 |
| `setTab` | window | 2248 |
| `showLineupComplements` | window | 2363 |
| `showMainShell` | function | 8396 |
| `socialDuoFocusLine` | function | 18500 |
| `socialEnsurePeriod` | function | 18486 |
| `socialFirstUseful` | function | 18490 |
| `socialKeyFactLine` | function | 18510 |
| `socialOpponentLine` | function | 18506 |
| `socialPlayerFocusLine` | function | 18493 |
| `socialSentence` | function | 18483 |
| `socialVideoJobsForMatchday` | function | 20041 |
| `specialTeamsStateFromActive` | function | 4319 |
| `stageSeasonDataPreview` | function | 6564 |
| `stageSeasonDataPreviewFromFile` | function | 6616 |
| `stageSeasonDataPreviewFromPaste` | function | 6630 |
| `startApp` | window | 8534 |
| `startEinsatzCenterDraftMode` | window | 7679 |
| `startHallOfFameIntro` | function | 8657 |
| `sumRoleGames` | function | 9570 |
| `switchMatchdaySeason` | window | 22730 |
| `switchOverviewSeason` | window | 22677 |
| `syncHashFromState` | function | 3404 |
| `t2s` | const-arrow | 2946 |
| `toggleAntiSynergyHideSgOnly` | window | 2385 |
| `toggleAntiSynergyShowAll` | window | 2384 |
| `toggleComparisonPicker` | window | 13428 |
| `toggleComparisonSgOnly` | window | 13413 |
| `toggleEinsatzCenterComboPlayer` | window | 7847 |
| `toggleEinsatzCenterGroupRename` | window | 7788 |
| `toggleEinsatzCenterRosterSuggestionPlayer` | window | 7719 |
| `toggleHallOfFamePureSGPlayers` | window | 2258 |
| `toggleLineupBuilderAvailable` | window | 2323 |
| `toggleMatchcenterDuoDetails` | window | 2254 |
| `toggleMatchcenterGames` | window | 8791 |
| `toggleMatchcenterPlayerDetails` | window | 2253 |
| `toggleMatchcenterSpecialTeamsGames` | window | 2252 |
| `toggleSgOnlyAlltime` | window | 2412 |
| `toggleSpecialTeamsGameDetails` | window | 2251 |
| `toggleToolMenu` | window | 23577 |
| `toolMenuElements` | function | 23552 |
| `toolMenuItemElements` | function | 23555 |
| `toolMenuOnClick` | function | 23613 |
| `toolMenuOnKeydown` | function | 23589 |
| `toPublicPlayerRegistry` | function | 3983 |
| `uiDatenstandBand` | function | 22429 |
| `uiDeltaIndicator` | function | 22194 |
| `uiFormatNumber` | function | 22166 |
| `uiHinweisKarte` | function | 22258 |
| `uiInfoIcon` | function | 22212 |
| `uiIntervallBalken` | function | 22334 |
| `uiKennzahlKachel` | function | 22224 |
| `uiKernaussage` | function | 22244 |
| `uiMethodenbox` | function | 22353 |
| `uiNotiz` | function | 22370 |
| `uiObjektseite` | function | 22518 |
| `uiObjektseiteSortTabs` | function | 22500 |
| `uiPlatzhalter` | function | 22450 |
| `uiQuoteText` | function | 22406 |
| `uiRangliste` | function | 22280 |
| `uiReliabilityDots` | function | 22179 |
| `uiVerlauf` | function | 22308 |
| `uniqueList` | function | 1870 |
| `updateCoverAllTimeStats` | function | 8423 |
| `updatePlayerRoleAvailability` | function | 4822 |
| `validateGameStructure` | function | 6325 |
| `validateMergedSeason` | function | 6412 |
| `validateSeasonGames` | function | 6366 |
| `validateSeasonKey` | function | 6389 |
| `validateWrapperFormat` | function | 6401 |
| `variance` | function | 2948 |
| `viewEinsatzCenterMergedView` | window | 7696 |
| `warnEventProcessingOnce` | function | 2628 |
| `withoutHashSync` | function | 3421 |

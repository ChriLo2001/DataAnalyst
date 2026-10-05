# Code-Karte: index.html

<!-- index-map: source-sha256=d12b6e2603859be19fe5145d1fe1f18fae74baa950056a004c722a8542be4d7a source-lines=23310 -->

Automatisch erzeugt von `scripts/build-index-map.mjs`. Nicht von Hand bearbeiten — bei Änderungen an index.html erneut ausführen: `node scripts/build-index-map.mjs --write`. Vor gezieltem Lesen prüfen, ob die Karte noch aktuell ist: `node scripts/build-index-map.mjs --check`.

index.html: 23310 Zeilen gesamt (SHA-256 `d12b6e2603859be19fe5145d1fe1f18fae74baa950056a004c722a8542be4d7a`). Statischer `<style>`-Block: Zeile 11–1550. Haupt-`<script>`-Block: Zeile 1664–23306.

**Leseregel (siehe CLAUDE.md):** index.html nie vollständig laden. Diese Karte nennen, den gesuchten Namen im Register unten finden, dann nur den genannten Zeilenbereich lesen.

## Große Bereiche

Top-Level-Blöcke (Funktionen oder Daten-consts) ab 30 Zeilen oder 2000 Zeichen (z. B. `SEASON_CONFIG`). Das Zeichen-Kriterium existiert wegen des früheren `STATIC_SEASON_DATA`-Blocks — seit Token-Diät Teil 2 in `season-data-embedded.js` ausgelagert, siehe docs/season-data-import.md, deshalb unten nicht mehr gelistet:

| Name | Art | Zeile | Zeilen |
|---|---|---|---|
| `SEASON_CONFIG` | const-data | 1705–1796 | 92 |
| `TYPE_DESC` | const-data | 1899–1922 | 24 |
| `ROLE_TRAIT_COLORS` | const-data | 2007–2046 | 40 |
| `ROLE_TRAIT_TOOLTIPS` | const-data | 2068–2107 | 40 |
| `appendSeasonGameDiagnostics` | function | 2545–2610 | 66 |
| `resolveRosterPlayerByRef` | function | 2813–2843 | 31 |
| `processGame` | function | 2926–2983 | 58 |
| `parseAppHash` | function | 3233–3264 | 32 |
| `applyAppHash` | function | 3471–3501 | 31 |
| `getOrCreatePlayerProfile` | function | 3714–3746 | 33 |
| `toPublicPlayerRegistry` | function | 3901–3930 | 30 |
| `aggregateAllTimePlayers` | function | 3932–3965 | 34 |
| `emptySpecialTeamsStats` | function | 4026–4066 | 41 |
| `mergeSpecialTeamsStats` | function | 4080–4109 | 30 |
| `buildSpecialTeamsForGame` | function | 4225–4418 | 194 |
| `addGoalieGameToStats` | function | 4478–4528 | 51 |
| `buildGoalieGameRecord` | function | 4530–4578 | 49 |
| `buildGoalieStatsForSeason` | function | 4580–4659 | 80 |
| `aggregateGoalieAlltimeStats` | function | 4661–4695 | 35 |
| `getAssistDiagnostics` | function | 4722–4774 | 53 |
| `buildPlayerEvents` | function | 4904–4988 | 85 |
| `computeMetrics` | function | 5008–5140 | 133 |
| `buildSoloDuoProfile` | function | 5162–5205 | 44 |
| `identityInputs` | function | 5292–5349 | 58 |
| `buildIdentityProfiles` | function | 5393–5624 | 232 |
| `assignStatus` | function | 5671–5856 | 186 |
| `fetchTextWithDiagnostics` | function | 5891–5920 | 30 |
| `fetchSeasonGameRaw` | function | 5956–5995 | 40 |
| `validateGameStructure` | function | 6184–6223 | 40 |
| `buildDryRunReport` | function | 6290–6352 | 63 |
| `stageSeasonDataPreview` | function | 6423–6474 | 52 |
| `rSeasonDataPreviewCard` | function | 6527–6562 | 36 |
| `computeEinsatzCenterStats` | function | 6756–6786 | 31 |
| `rEinsatzCenterStats` | function | 6793–6811 | 19 |
| `einsatzCenterDeserializeAutosave` | function | 7014–7047 | 34 |
| `rEinsatzCenterGroupEditor` | function | 7357–7387 | 31 |
| `rEinsatzCenterRosterSuggestionCard` | function | 7404–7434 | 31 |
| `rEinsatzCenterGameEditor` | function | 7435–7487 | 53 |
| `rEinsatzCenterEditPage` | function | 7488–7535 | 48 |
| `loadSeasonData` | function | 7783–8252 | 470 |
| `loadSeasonForGlobal` | function | 8292–8322 | 31 |
| `loadSeason` | function | 8340–8391 | 52 |
| `ensureHallOfFameIntroOverlay` | function | 8419–8451 | 33 |
| `rMatrix` | function | 8839–8883 | 45 |
| `rRadar` | function | 8916–8963 | 48 |
| `rClutch` | function | 8966–8998 | 33 |
| `rTimeline` | function | 9001–9109 | 109 |
| `rOppBreakdown` | function | 9131–9163 | 33 |
| `generatePlayerInsights` | function | 9166–9209 | 44 |
| `rInsights` | function | 9227–9278 | 52 |
| `buildGoalieAnalysisModel` | function | 9545–9703 | 159 |
| `buildGoalieRoleProfile` | function | 9768–9841 | 74 |
| `rGoalieInsights` | function | 9960–9981 | 22 |
| `buildOpponentIntelligence` | function | 10419–10472 | 54 |
| `buildBestThirdManOptions` | function | 10622–10655 | 34 |
| `getDuoDirectScorerGameCounts` | function | 10656–10687 | 32 |
| `buildAnnotatedGoalEventsForGame` | function | 10737–10837 | 101 |
| `buildResponseGoalStatsRaw` | function | 10880–10928 | 49 |
| `buildMomentumSwingStatsRaw` | function | 10941–11011 | 71 |
| `buildDuoFloorCeiling` | function | 11018–11059 | 42 |
| `buildDuoWithWithoutImpact` | function | 11155–11188 | 34 |
| `buildDuoCompatibility` | function | 11254–11276 | 23 |
| `buildDuoProAnalysis` | function | 11313–11356 | 44 |
| `rDuoCenterPro` | function | 11357–11476 | 120 |
| `rInteractiveDuoCenterPro` | function | 11551–11606 | 56 |
| `getDifficultConnectionRowsForPlayer` | function | 11610–11654 | 45 |
| `getRosterImpactPlayerGames` | function | 11747–11788 | 42 |
| `buildRosterImpactAnalysis` | function | 11822–11890 | 69 |
| `rDifficultConnectionList` | function | 11967–11991 | 25 |
| `rDifficultConnectionListCompactLegacy` | function | 11992–12033 | 42 |
| `rDifficultConnectionListCompact` | function | 12034–12072 | 39 |
| `rDifficultConnectionsCard` | function | 12073–12109 | 37 |
| `RESPONSE_MOMENTUM_TOOLTIPS` | const-data | 12112–12143 | 32 |
| `rResponseMomentumOverviewCard` | function | 12206–12229 | 24 |
| `rMatchcenterResponseMomentum` | function | 12276–12313 | 38 |
| `getTeamAllTimeRecords` | function | 12315–12355 | 41 |
| `getAllTimeIdentityStandings` | function | 12436–12470 | 35 |
| `buildRecencyWeightedGlobalIdentityProfile` | function | 12472–12519 | 48 |
| `rHallOfFameHero` | function | 12575–12600 | 26 |
| `hallGoalieRowFromStats` | function | 12698–12730 | 33 |
| `rHallGoalieRankCard` | function | 12783–12814 | 32 |
| `rHallGoalieLegends` | function | 12832–12864 | 33 |
| `buildDuoComparison` | function | 13259–13278 | 20 |
| `rDuoCompareSummaryCards` | function | 13284–13314 | 31 |
| `rDuoComparisonPage` | function | 13415–13425 | 11 |
| `buildComparisonExtraMetrics` | function | 13470–13527 | 58 |
| `buildGoalieComparisonDataset` | function | 13564–13614 | 51 |
| `buildComparisonDataset` | function | 13615–13650 | 36 |
| `rKpiMirrorRows` | function | 13676–13735 | 60 |
| `rKpiRadar` | function | 13747–13781 | 35 |
| `rKpiTrendCompare` | function | 13828–13894 | 67 |
| `rKpiOpponentStrength` | function | 13895–13922 | 28 |
| `rKpiInfoCards` | function | 13933–13964 | 32 |
| `buildComparisonSummary` | function | 13965–13996 | 32 |
| `rComparisonStyles` | function | 14034–14071 | 38 |
| `rComparisonCenterPage` | function | 14072–14122 | 51 |
| `rGlobalDnaBars` | function | 14163–14192 | 30 |
| `buildSeasonPlayerDashModel` | function | 14262–14298 | 37 |
| `buildAlltimePlayerDashModel` | function | 14299–14341 | 43 |
| `rPlayerDashStyles` | function | 14342–14353 | 12 |
| `rPlayerDash` | function | 14360–14398 | 39 |
| `rGlobalOverview` | function | 14457–14508 | 52 |
| `rGlobalDevelopment` | function | 14528–14566 | 39 |
| `rGlobalDuoNetwork` | function | 14628–14825 | 198 |
| `rGlobalOpponentSpecialist` | function | 14827–14872 | 46 |
| `buildFieldPlayerExplanation` | function | 14938–15012 | 75 |
| `buildGoaliePlayerExplanation` | function | 15013–15066 | 54 |
| `buildPlayerIntelligence` | function | 15076–15105 | 30 |
| `rPlayerExplanation` | function | 15111–15162 | 52 |
| `rAllTimePlayersPage` | function | 15164–15204 | 41 |
| `rHallOfFamePage` | function | 15206–15294 | 89 |
| `rLexiconPage` | function | 15321–15493 | 173 |
| `buildConfidence` | function | 15510–15555 | 46 |
| `getMatchcenterOpponents` | function | 15719–15751 | 33 |
| `getMatchcenterDirectOpponents` | function | 15752–15782 | 31 |
| `matchcenterAnalyzeDirect` | function | 15785–15821 | 37 |
| `matchcenterEnsureUlmPlayer` | function | 15878–15915 | 38 |
| `matchcenterAddUlmScoring` | function | 15940–15977 | 38 |
| `matchcenterFinalizeUlmPlayers` | function | 15978–16046 | 69 |
| `matchcenterBuildUlmPlayerScouting` | function | 16047–16101 | 55 |
| `matchcenterEnsureOpponentDuo` | function | 16119–16151 | 33 |
| `matchcenterFinalizeOpponentDuos` | function | 16178–16212 | 35 |
| `matchcenterBuildOpponentDuos` | function | 16213–16257 | 45 |
| `matchcenterEnsureUlmDuo` | function | 16272–16309 | 38 |
| `matchcenterFinalizeUlmDuos` | function | 16329–16364 | 36 |
| `matchcenterBuildUlmDuos` | function | 16365–16407 | 43 |
| `matchcenterBuildSpecialTeamsMatchup` | function | 16441–16488 | 48 |
| `matchcenterBuildGoalieMatchup` | function | 16511–16556 | 46 |
| `matchcenterTimingStatsForGames` | function | 16589–16625 | 37 |
| `rMatchcenterUlmScouting` | function | 16969–17005 | 37 |
| `rMatchcenterOpponentScouting` | function | 17006–17041 | 36 |
| `rMatchcenterUlmDuos` | function | 17150–17192 | 43 |
| `rMatchcenterOpponentDuos` | function | 17193–17235 | 43 |
| `rMatchcenterSpecialTeams` | function | 17248–17297 | 50 |
| `matchcenterBuildPlanConfidence` | function | 17388–17422 | 35 |
| `matchcenterBuildIntelligenceDataQuality` | function | 17471–17521 | 51 |
| `matchcenterBuildOpponentDNA` | function | 17522–17634 | 113 |
| `matchcenterBuildOpponentAlarm` | function | 17701–17810 | 110 |
| `matchcenterBuildIntelligenceSignals` | function | 17857–17903 | 47 |
| `buildMatchIntelligenceFromContext` | function | 17904–17958 | 55 |
| `buildMatchStories` | function | 18007–18036 | 30 |
| `buildDigitalCoachReport` | function | 18107–18139 | 33 |
| `buildMatchdayCaptionBlocks` | function | 18211–18240 | 30 |
| `buildSocialMediaContent` | function | 18241–18289 | 49 |
| `lineupRosterGamesForPlayer` | function | 18357–18404 | 48 |
| `buildLineupExperienceProfile` | function | 18405–18447 | 43 |
| `buildLineupOpponentDNAFit` | function | 18460–18503 | 44 |
| `classifyLineIdentity` | function | 18504–18551 | 48 |
| `lineupPlayerProfile` | function | 18552–18627 | 76 |
| `buildLineupAnalysis` | function | 18628–18761 | 134 |
| `buildLineupScoreBreakdowns` | function | 18762–18791 | 30 |
| `lineupEvaluateComplementCandidate` | function | 18875–18953 | 79 |
| `buildTeamLineBalance` | function | 18979–19022 | 44 |
| `buildLineupRecommendations` | function | 19059–19140 | 82 |
| `matchcenterBuildMatchPlan` | function | 19169–19314 | 146 |
| `rMatchcenterOpponentDNA` | function | 19349–19381 | 33 |
| `rMatchcenterIntelOverview` | function | 19404–19449 | 46 |
| `rMatchcenterDigitalCoach` | function | 19491–19555 | 65 |
| `rMatchcenterLockerRoomSheet` | function | 19573–19628 | 56 |
| `downloadMatchdayStory` | window | 19647–19694 | 48 |
| `rSocialVideoBlock` | function | 19698–19729 | 32 |
| `generateSocialVideoVideos` | window | 19739–19780 | 42 |
| `rMatchcenterSocialMediaCenter` | function | 19831–19884 | 54 |
| `rMatchcenterLineupBuilder` | function | 19916–19988 | 73 |
| `rLineupBuilderAvailablePanel` | function | 20003–20050 | 48 |
| `rLineupRecommendationMode` | function | 20066–20099 | 34 |
| `rLineupTestLine` | function | 20113–20161 | 49 |
| `rLineupBuilderPage` | function | 20179–20213 | 35 |
| `rMatchcenterScoutingSummary` | function | 20214–20257 | 44 |
| `getTeamLogoUrlForStory` | function | 20302–20331 | 30 |
| `matchcenterStoryPickFactItems` | function | 20454–20506 | 53 |
| `buildMatchcenterStoryPreviewData` | function | 20725–20836 | 112 |
| `matchcenterStoryVisibleFacts` | function | 20843–20873 | 31 |
| `rMatchcenterStoryPreview` | function | 20892–20961 | 70 |
| `fitMatchcenterStoryLayout` | function | 20968–21010 | 43 |
| `rMatchcenterPage` | function | 21089–21237 | 149 |
| `rTeamPage` | function | 21238–21575 | 338 |
| `_render` | function | 21625–21794 | 170 |
| `uiObjektseite` | function | 22180–22213 | 34 |
| `rMatchdayDetailPage` | function | 22450–22489 | 40 |
| `buildOverviewCards` | function | 22761–22801 | 41 |

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
| `createSeasonBucket` | function | 1797–1811 | 15 |
| `getSeasonApiBaseUrl` | function | 1822–1838 | 17 |
| `seasonApiUrl` | function | 1839–1841 | 3 |
| `getSeasonOriginBaseUrl` | function | 1842–1850 | 9 |
| `seasonPathPrefix` | function | 1851–1853 | 3 |
| `uniqueList` | function | 1854–1856 | 3 |
| `seasonGameApiUrls` | function | 1857–1866 | 10 |
| `seasonGameHtmlUrls` | function | 1867–1874 | 8 |
| `clearAnalysisCache` | function | 2172–2174 | 3 |
| `analysisCacheContext` | function | 2175–2189 | 15 |
| `asOfCacheKeyPart` | function | 2203–2208 | 6 |
| `analysisCacheKey` | function | 2209–2212 | 4 |
| `cachedAnalysis` | function | 2213–2218 | 6 |
| `setState` | const-arrow | 2219–2226 | 8 |
| `invalidateGlobalIdentityCache` | function | 2227–2229 | 3 |
| `setP` | window | 2231–2231 | 1 |
| `setTab` | window | 2232–2232 | 1 |
| `setPlayerRoleView` | window | 2233–2233 | 1 |
| `setGoalieTab` | window | 2234–2234 | 1 |
| `toggleSpecialTeamsGameDetails` | window | 2235–2235 | 1 |
| `toggleMatchcenterSpecialTeamsGames` | window | 2236–2236 | 1 |
| `toggleMatchcenterPlayerDetails` | window | 2237–2237 | 1 |
| `toggleMatchcenterDuoDetails` | window | 2238–2238 | 1 |
| `setMatchcenterTab` | window | 2239–2239 | 1 |
| `openMatchcenterStoryPreview` | window | 2240–2240 | 1 |
| `closeMatchcenterStoryPreview` | window | 2241–2241 | 1 |
| `toggleHallOfFamePureSGPlayers` | window | 2242–2242 | 1 |
| `copyMatchcenterText` | window | 2243–2268 | 26 |
| `addLineupPlayer` | window | 2269–2274 | 6 |
| `removeLineupPlayer` | window | 2275–2275 | 1 |
| `clearLineupPlayers` | window | 2276–2276 | 1 |
| `filterLineupPlayers` | window | 2277–2283 | 7 |
| `lineupBuilderPoolIds` | function | 2284–2286 | 3 |
| `normalizeLineupLines` | function | 2287–2291 | 5 |
| `setLineupBuilderSeason` | window | 2292–2303 | 12 |
| `setLineupBuilderOpponent` | window | 2304–2304 | 1 |
| `setLineupBuilderMode` | window | 2305–2305 | 1 |
| `setLineupActiveLine` | window | 2306–2306 | 1 |
| `toggleLineupBuilderAvailable` | window | 2307–2320 | 14 |
| `selectAllLineupAvailable` | window | 2321–2321 | 1 |
| `clearLineupAvailable` | window | 2322–2322 | 1 |
| `addLineupBuilderPlayerToLine` | window | 2323–2332 | 10 |
| `addLineupBuilderPlayerToActiveLine` | window | 2333–2333 | 1 |
| `removeLineupBuilderPlayerFromLine` | window | 2334–2340 | 7 |
| `clearLineupBuilderLine` | window | 2341–2346 | 6 |
| `showLineupComplements` | window | 2347–2347 | 1 |
| `setLineupNewPlayerProfile` | window | 2348–2348 | 1 |
| `addSyntheticLineupPlayer` | window | 2349–2366 | 18 |
| `setAntiSynergyView` | window | 2367–2367 | 1 |
| `toggleAntiSynergyShowAll` | window | 2368–2368 | 1 |
| `toggleAntiSynergyHideSgOnly` | window | 2369–2369 | 1 |
| `filterLineupBuilderAvailable` | window | 2370–2376 | 7 |
| `setPage` | window | 2377–2385 | 9 |
| `backToHome` | window | 2386–2392 | 7 |
| `setGlobalPlayer` | window | 2393–2393 | 1 |
| `setGlobalPlayerDuo` | window | 2394–2394 | 1 |
| `setGlobalTab` | window | 2395–2395 | 1 |
| `toggleSgOnlyAlltime` | window | 2396–2396 | 1 |
| `getActiveSeasonKey` | function | 2398–2400 | 3 |
| `getGlobalAllTimeSnapshot` | function | 2402–2409 | 8 |
| `applySeasonContext` | function | 2410–2433 | 24 |
| `fixMojibakeText` | function | 2447–2449 | 3 |
| `repairRenderedMojibake` | function | 2450–2471 | 22 |
| `getAllTimeOpponentNames` | function | 2476–2483 | 8 |
| `getUniqueAllTimeOpponentNames` | function | 2484–2486 | 3 |
| `getUlmTeamStatus` | function | 2489–2493 | 5 |
| `detectUlmSide` | function | 2494–2500 | 7 |
| `detectSide` | const-arrow | 2501–2501 | 1 |
| `normalizePlayerName` | function | 2504–2513 | 10 |
| `getPreClubHistoryPlayerNames` | function | 2514–2516 | 3 |
| `isPreClubHistoryPlayerName` | function | 2517–2521 | 5 |
| `diagnoseGameDuplicates` | function | 2523–2536 | 14 |
| `gameClassificationStatusLabel` | function | 2537–2544 | 8 |
| `appendSeasonGameDiagnostics` | function | 2545–2610 | 66 |
| `warnEventProcessingOnce` | function | 2612–2619 | 8 |
| `rosterPlayerMatches` | function | 2620–2634 | 15 |
| `getRosterGameIdsForPlayer` | function | 2635–2643 | 9 |
| `isGoalieRosterEntry` | function | 2644–2648 | 5 |
| `goalieEntryRecognitionReason` | function | 2658–2667 | 10 |
| `isExcludedGoalieAppearance` | function | 2668–2681 | 14 |
| `isGoalieAppearance` | function | 2682–2687 | 6 |
| `isFieldAppearance` | function | 2688–2693 | 6 |
| `getFieldGameIdsForPlayer` | function | 2694–2700 | 7 |
| `getGoalieGameIdsForPlayer` | function | 2701–2707 | 7 |
| `getPlayerFieldGames` | function | 2708–2711 | 4 |
| `getPlayerGoalieGames` | function | 2712–2715 | 4 |
| `roleGameStableKey` | function | 2716–2718 | 3 |
| `getPlayerAlltimeRoleGames` | function | 2719–2737 | 19 |
| `getPlayerAlltimeFieldGames` | function | 2738–2740 | 3 |
| `getPlayerAlltimeGoalieGames` | function | 2741–2743 | 3 |
| `getPlayerAlltimeTotalGames` | function | 2744–2752 | 9 |
| `getPlayerSeasonRoleGameSummary` | function | 2753–2775 | 23 |
| `getPlayedUlmGames` | function | 2776–2784 | 9 |
| `countPlayedUlmGames` | function | 2785–2787 | 3 |
| `getSeasonTeamGames` | function | 2788–2791 | 4 |
| `getSeasonTeamGameIds` | function | 2792–2794 | 3 |
| `getPlayerSourceId` | function | 2795–2797 | 3 |
| `getJerseyNumber` | function | 2798–2800 | 3 |
| `normalizeEventPlayerRef` | function | 2801–2812 | 12 |
| `resolveRosterPlayerByRef` | function | 2813–2843 | 31 |
| `resolveGoalScorerPlayer` | function | 2844–2858 | 15 |
| `getGoalScorerFromEvent` | function | 2859–2861 | 3 |
| `normalizeAssistPlayerName` | function | 2862–2864 | 3 |
| `collectAssistEventRefs` | function | 2865–2892 | 28 |
| `getAssistPlayersFromEvent` | function | 2893–2906 | 14 |
| `resolveAssistPlayer` | function | 2907–2913 | 7 |
| `t2s` | const-arrow | 2915–2915 | 1 |
| `variance` | function | 2917–2921 | 5 |
| `processGame` | function | 2926–2983 | 58 |
| `isGamePlayed` | function | 2985–2987 | 3 |
| `deriveAsOfForSeason` | function | 3018–3021 | 4 |
| `seasonKeyToHashSegment` | function | 3123–3125 | 3 |
| `hashSegmentToSeasonKey` | function | 3126–3129 | 4 |
| `isValidAsOfDate` | function | 3130–3132 | 3 |
| `isValidAsOfStartTime` | function | 3133–3135 | 3 |
| `asOfEquals` | function | 3142–3149 | 8 |
| `decodeHashSegmentSafe` | function | 3213–3215 | 3 |
| `parseAppHash` | function | 3233–3264 | 32 |
| `parseAsOfQueryValue` | function | 3272–3282 | 11 |
| `buildAppHash` | function | 3288–3300 | 13 |
| `buildGlobalPageHash` | function | 3305–3314 | 10 |
| `buildHashStringFromParsed` | function | 3320–3324 | 5 |
| `computeCurrentAppHash` | function | 3340–3352 | 13 |
| `syncHashFromState` | function | 3366–3376 | 11 |
| `withoutHashSync` | function | 3383–3391 | 9 |
| `parseLastViewState` | function | 3407–3418 | 12 |
| `getStoredLastView` | function | 3419–3422 | 4 |
| `saveLastView` | function | 3424–3426 | 3 |
| `applyGlobalPageFromHash` | function | 3438–3458 | 21 |
| `applyAppHash` | function | 3471–3501 | 31 |
| `initHashRouting` | function | 3550–3568 | 19 |
| `gameResult` | function | 3571–3577 | 7 |
| `getOppStrength` | function | 3584–3590 | 7 |
| `createPlayerAnalysisProfile` | function | 3602–3604 | 3 |
| `emptyPlayerSeasonStats` | function | 3606–3611 | 6 |
| `emptyGoalieSeasonStats` | function | 3612–3633 | 22 |
| `emptyGoalieAlltimeStats` | function | 3634–3648 | 15 |
| `emptyGoalieSpecialTeamsStats` | function | 3649–3660 | 12 |
| `emptyFieldRoleSeasonStats` | function | 3661–3663 | 3 |
| `addUnique` | function | 3665–3667 | 3 |
| `incrementUniqueCounter` | function | 3669–3674 | 6 |
| `buildPlayerIdentity` | function | 3676–3691 | 16 |
| `resetPlayerRegistrySeason` | function | 3693–3703 | 11 |
| `derivePlayerStatus` | function | 3705–3712 | 8 |
| `getOrCreatePlayerProfile` | function | 3714–3746 | 33 |
| `registerPlayerIdentity` | function | 3748–3764 | 17 |
| `ensureGoalieSeasonStats` | function | 3766–3770 | 5 |
| `ensureFieldRoleSeasonStats` | function | 3771–3775 | 5 |
| `markFieldRoleAppearance` | function | 3776–3779 | 4 |
| `registerSeasonRosters` | function | 3781–3799 | 19 |
| `linkUiPlayersToRegistry` | function | 3801–3821 | 21 |
| `applySeasonScoringToRegistry` | function | 3823–3844 | 22 |
| `finalizePlayerRegistrySeason` | function | 3846–3860 | 15 |
| `serializeSeasonStats` | function | 3862–3874 | 13 |
| `serializeGoalieSeasonStats` | function | 3875–3896 | 22 |
| `serializeFieldRoleSeasonStats` | function | 3897–3899 | 3 |
| `toPublicPlayerRegistry` | function | 3901–3930 | 30 |
| `aggregateAllTimePlayers` | function | 3932–3965 | 34 |
| `finiteNumbers` | function | 3967–3969 | 3 |
| `avgOrNull` | function | 3970–3973 | 4 |
| `medianOrNull` | function | 3974–3979 | 6 |
| `incGoalieBucket` | function | 3980–3983 | 4 |
| `goalieEventAbsSeconds` | function | 3984–3989 | 6 |
| `goalieGameDurationSeconds` | function | 3990–3994 | 5 |
| `goalieGameStateBeforeGoal` | function | 3995–4006 | 12 |
| `getGoalieOpponentName` | function | 4007–4010 | 4 |
| `getGoalieOpponentTier` | function | 4011–4015 | 5 |
| `resultGoalsAgainstForSide` | function | 4016–4025 | 10 |
| `emptySpecialTeamsStats` | function | 4026–4066 | 41 |
| `clonePlain` | function | 4067–4069 | 3 |
| `finalizeSpecialTeamsStats` | function | 4070–4076 | 7 |
| `serializeSpecialTeamsStats` | function | 4077–4079 | 3 |
| `mergeSpecialTeamsStats` | function | 4080–4109 | 30 |
| `penaltyRawText` | function | 4112–4114 | 3 |
| `isMatchPenaltyEvent` | function | 4115–4118 | 4 |
| `isTwoPlusTwoPenaltyEvent` | function | 4119–4122 | 4 |
| `getPenaltyDisciplineType` | function | 4123–4130 | 8 |
| `getGameDurationMinutes` | function | 4131–4135 | 5 |
| `gameDaySortValue` | function | 4136–4143 | 8 |
| `isSameUlmTeamContext` | function | 4144–4151 | 8 |
| `getFurtherSameDayUlmGames` | function | 4152–4163 | 12 |
| `getPenaltySpecialTeamsMinutes` | function | 4164–4166 | 3 |
| `getPenaltyBasePersonalMinutes` | function | 4167–4174 | 8 |
| `getPenaltyPersonalMinutes` | function | 4175–4184 | 10 |
| `getPenaltyDisciplineMinutes` | function | 4185–4187 | 3 |
| `getSpecialTeamsPenaltyChunks` | function | 4188–4197 | 10 |
| `isPenaltyGoalEvent` | function | 4198–4202 | 5 |
| `specialTeamsStateFromActive` | function | 4203–4209 | 7 |
| `annotateSpecialTeamsGoalEvent` | function | 4210–4224 | 15 |
| `buildSpecialTeamsForGame` | function | 4225–4418 | 194 |
| `buildSpecialTeamsForSeason` | function | 4419–4427 | 9 |
| `aggregateAlltimeSpecialTeams` | function | 4428–4435 | 8 |
| `mergeGoalieSpecialTeamsStats` | function | 4436–4447 | 12 |
| `addGoalieSpecialTeamsGameToStats` | function | 4448–4462 | 15 |
| `finalizeGoalieSeasonStats` | function | 4463–4477 | 15 |
| `addGoalieGameToStats` | function | 4478–4528 | 51 |
| `buildGoalieGameRecord` | function | 4530–4578 | 49 |
| `buildGoalieStatsForSeason` | function | 4580–4659 | 80 |
| `aggregateGoalieAlltimeStats` | function | 4661–4695 | 35 |
| `updatePlayerRoleAvailability` | function | 4697–4706 | 10 |
| `getGoalieDiagnostics` | function | 4708–4713 | 6 |
| `getSpecialTeamsDiagnostics` | function | 4715–4720 | 6 |
| `getAssistDiagnostics` | function | 4722–4774 | 53 |
| `buildSeasonDuos` | function | 4777–4803 | 27 |
| `mergeDuoSet` | function | 4804–4820 | 17 |
| `aggregateAllTimeDuos` | function | 4821–4831 | 11 |
| `aggregateSeasonStats` | function | 4833–4848 | 16 |
| `buildPlayerDataFoundation` | function | 4850–4871 | 22 |
| `buildRegistry` | function | 4873–4899 | 27 |
| `buildPlayerEvents` | function | 4904–4988 | 85 |
| `getPhaseIndex` | function | 4993–5003 | 11 |
| `computeMetrics` | function | 5008–5140 | 133 |
| `detectTypes` | function | 5142–5157 | 16 |
| `pct` | function | 5159–5159 | 1 |
| `ratio01` | function | 5160–5160 | 1 |
| `relative01` | function | 5161–5161 | 1 |
| `buildSoloDuoProfile` | function | 5162–5205 | 44 |
| `identityPartnerStats` | function | 5206–5219 | 14 |
| `identityOpponentGroups` | function | 5220–5227 | 8 |
| `eventMatchesTeams` | function | 5228–5233 | 6 |
| `clutchText` | function | 5234–5234 | 1 |
| `isImportantClutchGoal` | function | 5235–5239 | 5 |
| `isDecisiveGoal` | function | 5240–5242 | 3 |
| `isLateGoal` | function | 5243–5247 | 5 |
| `isComebackRelevantGoal` | function | 5248–5251 | 4 |
| `identityPointsVsTeams` | function | 5252–5254 | 3 |
| `identityGoalsVsTeams` | function | 5255–5257 | 3 |
| `identityClutchGoalsVsTeams` | function | 5258–5260 | 3 |
| `identityDecisiveGoalsVsTeams` | function | 5261–5263 | 3 |
| `identityLateGoalsVsTeams` | function | 5264–5266 | 3 |
| `countMomentumClusters` | function | 5267–5291 | 25 |
| `identityInputs` | function | 5292–5349 | 58 |
| `clearlyAboveAverage` | function | 5350–5350 | 1 |
| `normalizeSecondaryTraits` | function | 5351–5362 | 12 |
| `seasonRoleTraitsFromClassic` | function | 5363–5367 | 5 |
| `seasonRoleKeysForPlayer` | function | 5368–5376 | 9 |
| `hasSeasonRole` | function | 5377–5379 | 3 |
| `selectEnforcerKeys` | function | 5380–5392 | 13 |
| `buildIdentityProfiles` | function | 5393–5624 | 232 |
| `composeIdentityText` | function | 5625–5631 | 7 |
| `countCaptainAppearances` | function | 5633–5645 | 13 |
| `countGoalieAppearances` | function | 5647–5649 | 3 |
| `computeRosterStatus` | function | 5651–5669 | 19 |
| `assignStatus` | function | 5671–5856 | 186 |
| `fetchJsonLegacy` | function | 5862–5881 | 20 |
| `responseExcerpt` | function | 5883–5885 | 3 |
| `diagnosticError` | function | 5886–5890 | 5 |
| `fetchTextWithDiagnostics` | function | 5891–5920 | 30 |
| `fetchJsonWithDiagnostics` | function | 5921–5929 | 9 |
| `fetchJson` | function | 5930–5933 | 4 |
| `formatStatus` | function | 5934–5936 | 3 |
| `formatDiagnosticAttempt` | function | 5937–5949 | 13 |
| `formatGameLoadError` | function | 5950–5955 | 6 |
| `fetchSeasonGameRaw` | function | 5956–5995 | 40 |
| `getStaticSeasonGames` | function | 5999–6002 | 4 |
| `loadSeasonManifest` | function | 6014–6030 | 17 |
| `resolveCurrentSeasonKey` | function | 6046–6065 | 20 |
| `applyCurrentSeasonCoverHighlight` | function | 6066–6070 | 5 |
| `isUsableExternalSeasonData` | function | 6083–6091 | 9 |
| `ensureExternalSeasonData` | function | 6092–6113 | 22 |
| `buildStaticSeasonDataBlock` | function | 6114–6123 | 10 |
| `getGameId` | function | 6150–6154 | 5 |
| `findDuplicateGameIds` | function | 6156–6166 | 11 |
| `validateGameStructure` | function | 6184–6223 | 40 |
| `validateSeasonGames` | function | 6225–6235 | 11 |
| `diffGameIds` | function | 6237–6246 | 10 |
| `validateSeasonKey` | function | 6248–6258 | 11 |
| `validateWrapperFormat` | function | 6260–6269 | 10 |
| `validateMergedSeason` | function | 6271–6288 | 18 |
| `buildDryRunReport` | function | 6290–6352 | 63 |
| `seasonDataPreviewRerender` | function | 6373–6375 | 3 |
| `seasonDataPreviewRow` | function | 6377–6388 | 12 |
| `buildSeasonDataPreviewChanges` | function | 6395–6412 | 18 |
| `stageSeasonDataPreview` | function | 6423–6474 | 52 |
| `stageSeasonDataPreviewFromFile` | function | 6475–6488 | 14 |
| `stageSeasonDataPreviewFromPaste` | function | 6489–6493 | 5 |
| `discardSeasonDataPreview` | function | 6494–6498 | 5 |
| `getSeasonDataPreview` | function | 6500–6502 | 3 |
| `isSeasonDataPreviewStale` | function | 6508–6512 | 5 |
| `rSeasonDataPreviewStatus` | function | 6514–6516 | 3 |
| `rSeasonDataPreviewRows` | function | 6517–6525 | 9 |
| `rSeasonDataPreviewCard` | function | 6527–6562 | 36 |
| `setSeasonDataPreviewOpen` | window | 6563–6563 | 1 |
| `setSeasonDataPreviewPasteText` | window | 6564–6564 | 1 |
| `fileNameForLineupSeasonKey` | function | 6584–6586 | 3 |
| `ensureLineupDataLoaded` | function | 6602–6618 | 17 |
| `ensureLineupGroupsRegistryLoaded` | function | 6627–6643 | 17 |
| `resolveLineupPlayerName` | function | 6655–6658 | 4 |
| `findLineupGameContext` | function | 6661–6668 | 8 |
| `rEinsatzCenterGroup` | function | 6670–6681 | 12 |
| `rEinsatzCenterCombo` | function | 6683–6690 | 8 |
| `rEinsatzCenterGameCard` | function | 6692–6709 | 18 |
| `rEinsatzCenterPage` | function | 6711–6730 | 20 |
| `setEinsatzCenterSeason` | window | 6732–6737 | 6 |
| `openEinsatzCenter` | window | 6738–6745 | 8 |
| `computeEinsatzCenterStats` | function | 6756–6786 | 31 |
| `lineupGroupDisplayName` | function | 6787–6792 | 6 |
| `rEinsatzCenterStats` | function | 6793–6811 | 19 |
| `getEffectiveLineupData` | function | 6869–6876 | 8 |
| `isEinsatzCenterGameFromDraft` | function | 6878–6881 | 4 |
| `einsatzCenterDraftInView` | function | 6883–6886 | 4 |
| `rEinsatzCenterDraftMark` | function | 6887–6890 | 4 |
| `rEinsatzCenterDraftStatsHint` | function | 6891–6895 | 5 |
| `einsatzCenterDraftStaleHint` | function | 6897–6899 | 3 |
| `rEinsatzCenterDraftBanner` | function | 6901–6908 | 8 |
| `ensureEinsatzCenterDraft` | function | 6919–6932 | 14 |
| `getEinsatzCenterGameDraft` | function | 6941–6952 | 12 |
| `einsatzCenterAutosaveKey` | function | 6979–6979 | 1 |
| `einsatzCenterStorageRead` | function | 6980–6982 | 3 |
| `einsatzCenterStorageWrite` | function | 6983–6985 | 3 |
| `einsatzCenterStorageRemove` | function | 6986–6988 | 3 |
| `einsatzCenterDraftIsEmpty` | function | 6991–6993 | 3 |
| `einsatzCenterSerializeDraft` | function | 6995–7007 | 13 |
| `einsatzCenterIsPlainObject` | function | 7008–7008 | 1 |
| `einsatzCenterDeserializeAutosave` | function | 7014–7047 | 34 |
| `einsatzCenterCurrentRawBaseHash` | function | 7054–7059 | 6 |
| `einsatzCenterAutosaveDraft` | function | 7068–7095 | 28 |
| `einsatzCenterInspectAutosave` | function | 7103–7131 | 29 |
| `restoreEinsatzCenterAutosave` | function | 7134–7150 | 17 |
| `discardEinsatzCenterAutosave` | function | 7152–7157 | 6 |
| `rEinsatzCenterAutosaveBanner` | function | 7160–7172 | 13 |
| `einsatzCenterAutosaveInfoText` | function | 7174–7184 | 11 |
| `loadEinsatzCenterMismatchedAutosave` | function | 7198–7216 | 19 |
| `deriveLineupValidPlayerIds` | function | 7229–7245 | 17 |
| `deriveLineupUlmPlayerIds` | function | 7253–7269 | 17 |
| `getSeasonmanagerRosterSuggestion` | function | 7283–7303 | 21 |
| `einsatzCenterCanonicalJson` | function | 7312–7321 | 10 |
| `einsatzCenterSha256Hex` | function | 7322–7326 | 5 |
| `einsatzCenterComputeBaseHash` | function | 7327–7329 | 3 |
| `einsatzCenterSoftIssues` | function | 7336–7354 | 19 |
| `rEinsatzCenterGroupEditor` | function | 7357–7387 | 31 |
| `rEinsatzCenterComboEditor` | function | 7388–7394 | 7 |
| `rEinsatzCenterRosterSuggestionCard` | function | 7404–7434 | 31 |
| `rEinsatzCenterGameEditor` | function | 7435–7487 | 53 |
| `rEinsatzCenterEditPage` | function | 7488–7535 | 48 |
| `startEinsatzCenterDraftMode` | window | 7538–7542 | 5 |
| `cancelEinsatzCenterEdit` | window | 7543–7553 | 11 |
| `viewEinsatzCenterMergedView` | window | 7555–7555 | 1 |
| `returnToEinsatzCenterEdit` | window | 7556–7556 | 1 |
| `setEinsatzCenterIncludeDraft` | window | 7557–7557 | 1 |
| `selectEinsatzCenterEditGame` | window | 7558–7561 | 4 |
| `addEinsatzCenterRosterPlayer` | window | 7562–7569 | 8 |
| `removeEinsatzCenterRosterPlayer` | window | 7570–7577 | 8 |
| `toggleEinsatzCenterRosterSuggestionPlayer` | window | 7578–7584 | 7 |
| `dismissEinsatzCenterRosterSuggestion` | window | 7585–7588 | 4 |
| `acceptEinsatzCenterRosterSuggestion` | window | 7596–7612 | 17 |
| `addEinsatzCenterExistingGroup` | window | 7613–7621 | 9 |
| `addEinsatzCenterNewGroup` | window | 7622–7638 | 17 |
| `removeEinsatzCenterGroup` | window | 7639–7646 | 8 |
| `toggleEinsatzCenterGroupRename` | window | 7647–7649 | 3 |
| `renameEinsatzCenterGroup` | window | 7661–7680 | 20 |
| `addEinsatzCenterGroupPlayer` | window | 7681–7688 | 8 |
| `removeEinsatzCenterGroupPlayer` | window | 7689–7696 | 8 |
| `setEinsatzCenterGroupPlayerPosition` | window | 7697–7705 | 9 |
| `toggleEinsatzCenterComboPlayer` | window | 7706–7713 | 8 |
| `confirmEinsatzCenterCombo` | window | 7714–7724 | 11 |
| `removeEinsatzCenterCombo` | window | 7725–7731 | 7 |
| `setEinsatzCenterGameNote` | window | 7732–7738 | 7 |
| `buildEinsatzCenterDraftExport` | function | 7742–7755 | 14 |
| `exportEinsatzCenterDraft` | window | 7756–7768 | 13 |
| `loadSeasonData` | function | 7783–8252 | 470 |
| `showMainShell` | function | 8255–8259 | 5 |
| `hasSeasonSource` | function | 8260–8263 | 4 |
| `hasEmbeddedSeasonData` | function | 8264–8266 | 3 |
| `getGlobalLoadableSeasonKeys` | function | 8267–8273 | 7 |
| `getAllTimeCoverStats` | function | 8274–8281 | 8 |
| `updateCoverAllTimeStats` | function | 8282–8290 | 9 |
| `loadSeasonForGlobal` | function | 8292–8322 | 31 |
| `ensureGlobalDataLoaded` | function | 8323–8338 | 16 |
| `loadSeason` | function | 8340–8391 | 52 |
| `startApp` | window | 8393–8404 | 12 |
| `ensureAppLoaded` | function | 8395–8404 | 10 |
| `openSeason` | window | 8405–8407 | 3 |
| `openAllTimePlayers` | window | 8408–8413 | 6 |
| `hofIntroDelay` | function | 8416–8418 | 3 |
| `ensureHallOfFameIntroOverlay` | function | 8419–8451 | 33 |
| `buildHallOfFameIntroTitle` | function | 8452–8462 | 11 |
| `seedHallOfFameIntroParticles` | function | 8463–8480 | 18 |
| `cleanupHallOfFameIntro` | function | 8481–8495 | 15 |
| `restoreHallOfFameIntroPrevious` | function | 8496–8507 | 12 |
| `finishHallOfFameIntro` | function | 8508–8515 | 8 |
| `startHallOfFameIntro` | function | 8516–8540 | 25 |
| `cancelHallOfFameIntro` | function | 8541–8552 | 12 |
| `openHallOfFame` | window | 8554–8577 | 24 |
| `openComparisonCenter` | window | 8578–8606 | 29 |
| `openMatchcenter` | window | 8607–8628 | 22 |
| `openLineupBuilder` | window | 8629–8646 | 18 |
| `setMatchcenterOpponent` | window | 8647–8647 | 1 |
| `setMatchcenterContext` | window | 8648–8648 | 1 |
| `setMatchcenterSeason` | window | 8649–8649 | 1 |
| `toggleMatchcenterGames` | window | 8650–8650 | 1 |
| `openLexicon` | window | 8651–8654 | 4 |
| `rRes` | const-arrow | 8659–8659 | 1 |
| `rClutchBadge` | function | 8660–8667 | 8 |
| `escAttr` | function | 8668–8670 | 3 |
| `roleTraitLabel` | function | 8671–8673 | 3 |
| `isVisibleSecondaryTrait` | function | 8674–8677 | 4 |
| `rRoleTraitTip` | function | 8678–8682 | 5 |
| `rStyleMetricTip` | function | 8683–8686 | 4 |
| `rRosterStatusBadge` | function | 8687–8694 | 8 |
| `classicTagLabel` | function | 8695–8697 | 3 |
| `rClassicTagTip` | function | 8698–8702 | 5 |
| `fallbackIdentityProfile` | function | 8703–8713 | 11 |
| `rIdentityTags` | function | 8714–8722 | 9 |
| `rStyleProfileBars` | function | 8723–8733 | 11 |
| `rIdentityCards` | function | 8734–8759 | 26 |
| `rClassicRoleTags` | function | 8760–8767 | 8 |
| `renderTags` | function | 8768–8770 | 3 |
| `getSeasonPlayerFieldBasis` | function | 8772–8798 | 27 |
| `getSeasonScopedIdentityProfile` | function | 8799–8810 | 12 |
| `rSeasonProfileKpis` | function | 8811–8830 | 20 |
| `rSeasonProfileTagStrip` | function | 8832–8836 | 5 |
| `rMatrix` | function | 8839–8883 | 45 |
| `rSeasonDuoSummary` | function | 8886–8894 | 9 |
| `rPhases` | function | 8896–8913 | 18 |
| `rRadar` | function | 8916–8963 | 48 |
| `rClutch` | function | 8966–8998 | 33 |
| `rTimeline` | function | 9001–9109 | 109 |
| `rPenalties` | function | 9112–9128 | 17 |
| `rOppBreakdown` | function | 9131–9163 | 33 |
| `generatePlayerInsights` | function | 9166–9209 | 44 |
| `rSeasonInsightsTab` | function | 9212–9225 | 14 |
| `rInsights` | function | 9227–9278 | 52 |
| `rTable` | function | 9281–9301 | 21 |
| `findLoadedSeasonPlayer` | function | 9304–9312 | 9 |
| `getAllTimePlayerRows` | function | 9313–9328 | 16 |
| `isSgOnlyAlltimePlayer` | function | 9329–9336 | 8 |
| `isPureSGPlayer` | function | 9337–9340 | 4 |
| `filterPureSGPlayers` | function | 9341–9344 | 4 |
| `getAllTimeMainPlayerRows` | function | 9345–9347 | 3 |
| `getAllTimeSgOnlyRows` | function | 9348–9350 | 3 |
| `getPlayerSeasonStats` | function | 9351–9355 | 5 |
| `getPlayerAlltimeStats` | function | 9356–9363 | 8 |
| `getPlayerRegistryProfile` | function | 9364–9371 | 8 |
| `getPlayerGoalieSeasonStats` | function | 9372–9376 | 5 |
| `getPlayerGoalieAlltimeStats` | function | 9377–9400 | 24 |
| `sumRoleGames` | function | 9401–9406 | 6 |
| `getPlayerRoleAvailability` | function | 9407–9420 | 14 |
| `resolvePlayerRoleView` | function | 9421–9428 | 8 |
| `rPlayerRoleSwitch` | function | 9429–9435 | 7 |
| `goalieNum` | function | 9436–9441 | 6 |
| `goalieTime` | function | 9442–9449 | 8 |
| `goalieBucketRows` | function | 9450–9455 | 6 |
| `goalieTopRow` | function | 9456–9458 | 3 |
| `goalieTierMeta` | function | 9459–9467 | 9 |
| `goalieStdDev` | function | 9468–9473 | 6 |
| `goalieDetailFirstTime` | function | 9474–9480 | 7 |
| `goalieEventSecondInPeriod` | function | 9481–9486 | 6 |
| `goaliePctText` | function | 9487–9490 | 4 |
| `goalieSafeNum` | function | 9491–9494 | 4 |
| `goalieClampScore` | function | 9495–9498 | 4 |
| `goalieInverseScore` | function | 9499–9506 | 8 |
| `goaliePositiveScore` | function | 9507–9514 | 8 |
| `goaliePositiveCurveScore` | function | 9515–9523 | 9 |
| `goalieWeightedScore` | function | 9524–9529 | 6 |
| `goalieApplySampleConfidence` | function | 9530–9537 | 8 |
| `goalieBucketLooseSum` | function | 9538–9544 | 7 |
| `buildGoalieAnalysisModel` | function | 9545–9703 | 159 |
| `rGoalieBars` | function | 9704–9713 | 10 |
| `goalieDnaKey` | function | 9755–9759 | 5 |
| `goalieDnaValue` | function | 9760–9766 | 7 |
| `goalieStateGoals` | function | 9767–9767 | 1 |
| `buildGoalieRoleProfile` | function | 9768–9841 | 74 |
| `rGoalieRoleTraits` | function | 9842–9845 | 4 |
| `getGoalieDnaRows` | function | 9846–9849 | 4 |
| `rGoalieDnaBars` | function | 9850–9863 | 14 |
| `rGoalieKpis` | function | 9864–9880 | 17 |
| `rGoalieMiniMetrics` | function | 9881–9886 | 6 |
| `rGoalieFirstGoalResistance` | function | 9887–9900 | 14 |
| `rGoalieMomentum` | function | 9901–9914 | 14 |
| `rGoalieTierCards` | function | 9915–9942 | 28 |
| `rGoaliePhaseProfile` | function | 9943–9959 | 17 |
| `rGoalieInsights` | function | 9960–9981 | 22 |
| `rGoalieOverview` | function | 9982–9998 | 17 |
| `rGoaliePhases` | function | 9999–10001 | 3 |
| `rGoalieOpponents` | function | 10002–10013 | 12 |
| `rGoalieStability` | function | 10014–10038 | 25 |
| `rGoalieTable` | function | 10039–10046 | 8 |
| `rGoalieAnalysis` | function | 10047–10072 | 26 |
| `getPreviousSeasonKey` | function | 10074–10078 | 5 |
| `playerAppearedInSeasonByName` | function | 10079–10089 | 11 |
| `playerAppearedForUlmStatusInSeasonByName` | function | 10090–10108 | 19 |
| `isRookieCandidateForSeason` | function | 10109–10118 | 10 |
| `getLoadedSeasonPointsByName` | function | 10119–10123 | 5 |
| `seasonHasPureUlmTeam` | function | 10124–10130 | 7 |
| `isSgOnlyHallOfFameExcluded` | function | 10131–10139 | 9 |
| `isHallOfFameEligiblePlayer` | function | 10140–10145 | 6 |
| `getHallOfFamePlayerRows` | function | 10146–10148 | 3 |
| `getHallOfFamePlayerIdSet` | function | 10149–10151 | 3 |
| `getGlobalProfileEvents` | function | 10153–10164 | 12 |
| `countBy` | function | 10166–10174 | 9 |
| `getLoadedSeasonPlayerUi` | function | 10175–10179 | 5 |
| `getGlobalPlayerTeamRecord` | function | 10180–10205 | 26 |
| `getGlobalPlayerPeakGame` | function | 10206–10216 | 11 |
| `getGlobalPlayerBestSeason` | function | 10217–10223 | 7 |
| `getAllTimeDuoRowsForPlayer` | function | 10224–10234 | 11 |
| `getCarryPerformanceRows` | function | 10235–10250 | 16 |
| `rCarryPerformanceRows` | function | 10251–10263 | 13 |
| `getAllTimeGamesPlayedRows` | function | 10264–10288 | 25 |
| `getAllTimePenaltyRows` | function | 10289–10304 | 16 |
| `getSeasonUiPlayerForProfile` | function | 10305–10308 | 4 |
| `getSeasonIdentityProfile` | function | 10309–10313 | 5 |
| `seasonStatNumber` | function | 10314–10317 | 4 |
| `seasonStatSetSize` | function | 10318–10323 | 6 |
| `isActiveAlltimeSeasonStats` | function | 10324–10337 | 14 |
| `getActiveAlltimeSeasonKeys` | function | 10338–10348 | 11 |
| `getAlltimeRecencyWeight` | function | 10349–10354 | 6 |
| `getRosterStatus` | function | 10355–10361 | 7 |
| `getGlobalTopScorerMilestones` | function | 10362–10374 | 13 |
| `getGlobalRookieSeasonKey` | function | 10375–10388 | 14 |
| `getGlobalRookieMilestone` | function | 10389–10399 | 11 |
| `getGlobalPlayerMilestones` | function | 10400–10417 | 18 |
| `buildOpponentIntelligence` | function | 10419–10472 | 54 |
| `rOpponentIntelBars` | function | 10474–10484 | 11 |
| `getAllTimeDuoRows` | function | 10486–10508 | 23 |
| `rDuoRows` | function | 10510–10529 | 20 |
| `getAllLoadedSeasonGames` | function | 10531–10550 | 20 |
| `getRosterEntryRegistryProfile` | function | 10552–10555 | 4 |
| `difficultConnectionConfidence` | function | 10556–10560 | 5 |
| `getDuoRowsForPlayerScope` | function | 10561–10579 | 19 |
| `buildDirectDuoLookupForPlayer` | function | 10580–10597 | 18 |
| `duoScopeSeasonKeys` | function | 10598–10601 | 4 |
| `getDuoScorerCountsWithCandidate` | function | 10602–10621 | 20 |
| `buildBestThirdManOptions` | function | 10622–10655 | 34 |
| `getDuoDirectScorerGameCounts` | function | 10656–10687 | 32 |
| `responseMomentumAbsSeconds` | function | 10689–10694 | 6 |
| `responseMomentumTime` | function | 10695–10701 | 7 |
| `responseMomentumGameRows` | function | 10702–10708 | 7 |
| `responseMomentumSide` | function | 10709–10717 | 9 |
| `responseMomentumActor` | function | 10718–10728 | 11 |
| `responseMomentumGoalActors` | function | 10729–10736 | 8 |
| `buildAnnotatedGoalEventsForGame` | function | 10737–10837 | 101 |
| `responseMomentumConfidence` | function | 10838–10842 | 5 |
| `responseMomentumEmptyState` | function | 10843–10850 | 8 |
| `responseMomentumPairKey` | function | 10851–10853 | 3 |
| `ensureRmPlayer` | function | 10854–10859 | 6 |
| `ensureRmDuo` | function | 10860–10865 | 6 |
| `finalizeResponseStats` | function | 10866–10879 | 14 |
| `buildResponseGoalStatsRaw` | function | 10880–10928 | 49 |
| `buildResponseGoalStats` | function | 10929–10934 | 6 |
| `finalizeMomentumStats` | function | 10935–10940 | 6 |
| `buildMomentumSwingStatsRaw` | function | 10941–11011 | 71 |
| `buildMomentumSwingStats` | function | 11012–11017 | 6 |
| `buildDuoFloorCeiling` | function | 11018–11059 | 42 |
| `buildDuoWarnings` | function | 11060–11078 | 19 |
| `duoProPairKey` | function | 11079–11081 | 3 |
| `duoProContextSeasonKey` | function | 11082–11084 | 3 |
| `getDuoFieldPlayerRows` | function | 11085–11095 | 11 |
| `duoProPlayer` | function | 11096–11100 | 5 |
| `getDuoSharedFieldRows` | function | 11101–11106 | 6 |
| `buildDuoDirectProduction` | function | 11107–11127 | 21 |
| `emptyDuoTeamImpactStats` | function | 11128–11130 | 3 |
| `addDuoTeamGame` | function | 11131–11146 | 16 |
| `finalizeDuoTeamImpactStats` | function | 11147–11154 | 8 |
| `buildDuoWithWithoutImpact` | function | 11155–11188 | 34 |
| `buildDuoOpponentAdjusted` | function | 11189–11201 | 13 |
| `buildDuoNetworkContext` | function | 11202–11225 | 24 |
| `buildDuoGapAnalysis` | function | 11226–11242 | 17 |
| `buildDuoCompatibility` | function | 11254–11276 | 23 |
| `buildDuoUntestedPotential` | function | 11277–11288 | 12 |
| `buildDuoUsageRate` | function | 11289–11300 | 12 |
| `buildDuoReplacementOptions` | function | 11301–11312 | 12 |
| `buildDuoProAnalysis` | function | 11313–11356 | 44 |
| `rDuoCenterPro` | function | 11357–11476 | 120 |
| `duoProDomId` | function | 11477–11479 | 3 |
| `duoProPickerOpen` | function | 11480–11482 | 3 |
| `duoProPickerMessage` | function | 11483–11485 | 3 |
| `setDuoProPickerState` | function | 11486–11495 | 10 |
| `duoProResolveCandidate` | function | 11496–11504 | 9 |
| `duoProSelectionPayload` | function | 11505–11514 | 10 |
| `openDuoProPicker` | window | 11515–11515 | 1 |
| `cancelDuoProPicker` | window | 11516–11516 | 1 |
| `selectDuoProQuick` | window | 11517–11520 | 4 |
| `confirmDuoProSelection` | window | 11521–11535 | 15 |
| `setDuoProSelection` | window | 11536–11543 | 8 |
| `rDuoProPlayerSelect` | function | 11544–11550 | 7 |
| `rInteractiveDuoCenterPro` | function | 11551–11606 | 56 |
| `rSeasonDuoCenterPro` | function | 11607–11609 | 3 |
| `getDifficultConnectionRowsForPlayer` | function | 11610–11654 | 45 |
| `emptyRosterImpactStats` | function | 11655–11657 | 3 |
| `finalizeRosterImpactStats` | function | 11658–11665 | 8 |
| `addRosterImpactGameToStats` | function | 11666–11675 | 10 |
| `getRosterImpactPlayerEventLookup` | function | 11676–11696 | 21 |
| `buildRosterImpactGameIndex` | function | 11709–11734 | 26 |
| `getRosterImpactPlayerGames` | function | 11747–11788 | 42 |
| `rosterImpactConfidence` | function | 11789–11794 | 6 |
| `confidenceFromSampleSize` | function | 11799–11802 | 4 |
| `rosterImpactConfidenceWeight` | function | 11803–11806 | 4 |
| `antiSynergyImpactScore` | function | 11807–11821 | 15 |
| `buildRosterImpactAnalysis` | function | 11822–11890 | 69 |
| `buildDuoAntiSynergy` | function | 11891–11893 | 3 |
| `rAntiSynergyDelta` | function | 11894–11900 | 7 |
| `antiSynergyDeltaClass` | function | 11901–11904 | 4 |
| `antiSynergySigned` | function | 11905–11909 | 5 |
| `rAntiSynergyCompareChip` | function | 11910–11917 | 8 |
| `rAntiSynergyMetricRow` | function | 11918–11926 | 9 |
| `rAntiSynergyWinrateText` | function | 11934–11939 | 6 |
| `rAntiSynergyWinrateRow` | function | 11940–11948 | 9 |
| `rRosterImpactStatLine` | function | 11949–11952 | 4 |
| `antiSynergyPartnerIsSgOnly` | function | 11953–11956 | 4 |
| `rAntiSynergyMainDelta` | function | 11957–11966 | 10 |
| `rDifficultConnectionList` | function | 11967–11991 | 25 |
| `rDifficultConnectionListCompactLegacy` | function | 11992–12033 | 42 |
| `rDifficultConnectionListCompact` | function | 12034–12072 | 39 |
| `rDifficultConnectionsCard` | function | 12073–12109 | 37 |
| `responseMomentumTooltipFor` | function | 12154–12160 | 7 |
| `rmTerm` | function | 12161–12164 | 4 |
| `rResponseRateDisplay` | function | 12170–12176 | 7 |
| `rRmKpi` | function | 12177–12188 | 12 |
| `rAvgResponseTimeNote` | function | 12191–12194 | 4 |
| `rRmTopList` | function | 12195–12205 | 11 |
| `rResponseMomentumOverviewCard` | function | 12206–12229 | 24 |
| `rPlayerResponseMomentumCard` | function | 12230–12248 | 19 |
| `rDuoResponseMomentumCard` | function | 12249–12268 | 20 |
| `rTeamResponseMomentumCard` | function | 12269–12275 | 7 |
| `rMatchcenterResponseMomentum` | function | 12276–12313 | 38 |
| `getTeamAllTimeRecords` | function | 12315–12355 | 41 |
| `getAllTimeOpponentIntelligence` | function | 12357–12363 | 7 |
| `getAllTimeOpponentTopScorers` | function | 12365–12389 | 25 |
| `getHallOfFameStats` | function | 12391–12413 | 23 |
| `rOpponentTopScorerTable` | function | 12415–12434 | 20 |
| `getAllTimeIdentityStandings` | function | 12436–12470 | 35 |
| `buildRecencyWeightedGlobalIdentityProfile` | function | 12472–12519 | 48 |
| `getGlobalIdentityProfile` | function | 12521–12547 | 27 |
| `dedupeIdentityProfileTags` | function | 12549–12560 | 12 |
| `rGlobalProfileTags` | function | 12562–12566 | 5 |
| `escHtml` | function | 12568–12570 | 3 |
| `pctValue` | function | 12571–12574 | 4 |
| `rHallOfFameHero` | function | 12575–12600 | 26 |
| `rHallPodiumList` | function | 12601–12623 | 23 |
| `rHallDuoTemple` | function | 12624–12631 | 8 |
| `hallGoalieNum` | function | 12633–12638 | 6 |
| `hallGoalieTime` | function | 12639–12646 | 8 |
| `hallGoalieSeasonLabel` | function | 12647–12647 | 1 |
| `isHallRowPureSG` | function | 12648–12655 | 8 |
| `rHallSGBadge` | function | 12656–12658 | 3 |
| `hallGoaliePkStats` | function | 12659–12670 | 12 |
| `hallGoalieTopteamStats` | function | 12671–12677 | 7 |
| `hallGoalieSeasonScore` | function | 12678–12697 | 20 |
| `hallGoalieRowFromStats` | function | 12698–12730 | 33 |
| `getHallGoalieData` | function | 12731–12746 | 16 |
| `hallGoalieNameHtml` | function | 12747–12749 | 3 |
| `hallGoalieTooltip` | function | 12764–12767 | 4 |
| `hallGoalieExplainForLabel` | function | 12768–12782 | 15 |
| `rHallGoalieRankCard` | function | 12783–12814 | 32 |
| `rHallGoalieAwardCards` | function | 12815–12831 | 17 |
| `rHallGoalieLegends` | function | 12832–12864 | 33 |
| `getGlobalSeasonStatRows` | function | 12865–12880 | 16 |
| `getAlltimeRank` | function | 12881–12886 | 6 |
| `rAlltimeKpis` | function | 12887–12900 | 14 |
| `rSparkline` | function | 12901–12913 | 13 |
| `comparisonItemKey` | function | 12925–12930 | 6 |
| `normalizeComparisonItem` | function | 12931–12935 | 5 |
| `comparisonJsArg` | function | 12936–12938 | 3 |
| `comparisonNum` | function | 12939–12942 | 4 |
| `comparisonPct` | function | 12943–12946 | 4 |
| `comparisonFmt` | function | 12947–12950 | 4 |
| `comparisonPctFmt` | function | 12951–12953 | 3 |
| `getComparisonPlayerRow` | function | 12954–12956 | 3 |
| `getComparisonSeasonLabel` | function | 12957–12959 | 3 |
| `getComparisonTeamGoalsForSeason` | function | 12960–12971 | 12 |
| `getComparisonAlltimeTeamGoals` | function | 12972–12974 | 3 |
| `getComparisonSeasonEvents` | function | 12975–12979 | 5 |
| `getComparisonChemistryFromEvents` | function | 12980–12984 | 5 |
| `getComparisonClutchFromEvents` | function | 12985–12989 | 5 |
| `getComparisonStyleProfile` | function | 12990–13014 | 25 |
| `getComparisonProfile` | function | 13015–13019 | 5 |
| `getComparisonSeasonTrend` | function | 13020–13045 | 26 |
| `getComparisonAlltimeTrend` | function | 13046–13051 | 6 |
| `getComparisonPlayerOptions` | function | 13053–13067 | 15 |
| `comparisonVariantValue` | function | 13068–13070 | 3 |
| `getComparisonVariantsForPlayer` | function | 13071–13095 | 25 |
| `parseComparisonVariant` | function | 13096–13110 | 15 |
| `getComparisonCurrentSelection` | function | 13111–13121 | 11 |
| `filterComparisonPlayers` | window | 13122–13129 | 8 |
| `selectComparisonPlayer` | window | 13130–13135 | 6 |
| `setComparisonRoleMode` | window | 13136–13140 | 5 |
| `setComparisonVariant` | window | 13141–13144 | 4 |
| `toggleComparisonSgOnly` | window | 13145–13145 | 1 |
| `addComparisonItem` | window | 13146–13153 | 8 |
| `addSelectedComparisonItem` | window | 13154–13159 | 6 |
| `toggleComparisonPicker` | window | 13160–13160 | 1 |
| `removeComparisonItem` | window | 13161–13164 | 4 |
| `clearComparison` | window | 13165–13165 | 1 |
| `runComparison` | window | 13166–13172 | 7 |
| `selectComparisonMode` | window | 13173–13173 | 1 |
| `backToComparisonModeSelect` | window | 13174–13174 | 1 |
| `normalizeDuoComparisonItem` | function | 13175–13178 | 4 |
| `comparisonDuoContext` | function | 13179–13182 | 4 |
| `setComparisonDuoMode` | window | 13183–13183 | 1 |
| `setComparisonDuoSeasonKey` | window | 13184–13184 | 1 |
| `setComparisonDuoSearch` | window | 13185–13185 | 1 |
| `filterPlayerSuggestions` | function | 13186–13197 | 12 |
| `rComparisonDuoSuggestionButtons` | function | 13198–13201 | 4 |
| `renderComparisonDuoSuggestions` | function | 13202–13210 | 9 |
| `filterComparisonDuoSuggestions` | window | 13211–13218 | 8 |
| `selectComparisonDuoSuggestion` | window | 13212–13218 | 7 |
| `handleComparisonDuoSearchKey` | window | 13219–13231 | 13 |
| `setComparisonDuoPlayer` | window | 13232–13237 | 6 |
| `addComparisonDuoFromSelection` | window | 13238–13245 | 8 |
| `addComparisonDuo` | window | 13246–13248 | 3 |
| `removeComparisonDuo` | window | 13249–13252 | 4 |
| `clearComparisonDuos` | window | 13253–13253 | 1 |
| `runDuoComparison` | window | 13254–13258 | 5 |
| `buildDuoComparison` | function | 13259–13278 | 20 |
| `rDuoComparisonBars` | function | 13279–13283 | 5 |
| `rDuoCompareSummaryCards` | function | 13284–13314 | 31 |
| `rDuoComparisonProfile` | function | 13315–13336 | 22 |
| `rDuoComparisonChemistry` | function | 13337–13352 | 16 |
| `rDuoComparisonImpact` | function | 13353–13368 | 16 |
| `rDuoComparisonContext` | function | 13369–13386 | 18 |
| `rDuoComparisonDetails` | function | 13387–13390 | 4 |
| `rDuoComparisonDashboard` | function | 13391–13404 | 14 |
| `rComparisonDuoSearchBox` | function | 13405–13414 | 10 |
| `rDuoComparisonPage` | function | 13415–13425 | 11 |
| `rComparisonModeSelect` | function | 13426–13428 | 3 |
| `getComparisonEventsForItem` | function | 13429–13431 | 3 |
| `getComparisonRosterGamesForSeason` | function | 13432–13448 | 17 |
| `getComparisonRosterGames` | function | 13449–13456 | 8 |
| `comparisonEventGameKey` | function | 13457–13459 | 3 |
| `comparisonEventPhaseLabel` | function | 13460–13463 | 4 |
| `comparisonOpponentStrengthTier` | function | 13464–13469 | 6 |
| `buildComparisonExtraMetrics` | function | 13470–13527 | 58 |
| `getGoalieComparisonAlltimeTrend` | function | 13528–13544 | 17 |
| `getGoalieComparisonSeasonTrend` | function | 13545–13563 | 19 |
| `buildGoalieComparisonDataset` | function | 13564–13614 | 51 |
| `buildComparisonDataset` | function | 13615–13650 | 36 |
| `kpiValueText` | function | 13652–13655 | 4 |
| `kpiDelta` | function | 13656–13661 | 6 |
| `kpiItemColor` | function | 13662–13664 | 3 |
| `rKpiCards` | function | 13665–13675 | 11 |
| `rKpiMirrorRows` | function | 13676–13735 | 60 |
| `kpiRadarValue` | function | 13736–13746 | 11 |
| `rKpiRadar` | function | 13747–13781 | 35 |
| `rKpiShareBars` | function | 13782–13789 | 8 |
| `rKpiMetricCard` | function | 13790–13794 | 5 |
| `rKpiTextMetricCard` | function | 13795–13797 | 3 |
| `rKpiExtendedMetrics` | function | 13798–13812 | 15 |
| `kpiNiceMax` | function | 13813–13818 | 6 |
| `kpiTrendRows` | function | 13819–13827 | 9 |
| `rKpiTrendCompare` | function | 13828–13894 | 67 |
| `rKpiOpponentStrength` | function | 13895–13922 | 28 |
| `kpiBadge` | function | 13923–13925 | 3 |
| `rKpiObjectMini` | function | 13926–13932 | 7 |
| `rKpiInfoCards` | function | 13933–13964 | 32 |
| `buildComparisonSummary` | function | 13965–13996 | 32 |
| `rKPIVergleich` | function | 13997–14010 | 14 |
| `rComparisonMiniOverview` | function | 14011–14014 | 4 |
| `rComparisonRoles` | function | 14015–14022 | 8 |
| `rComparisonDashboard` | function | 14023–14033 | 11 |
| `rComparisonStyles` | function | 14034–14071 | 38 |
| `rComparisonCenterPage` | function | 14072–14122 | 51 |
| `rSeasonTrendRows` | function | 14123–14141 | 19 |
| `getAlltimeAggregatedStyleProfile` | function | 14142–14161 | 20 |
| `rGlobalDnaBars` | function | 14163–14192 | 30 |
| `pdashNum` | function | 14193–14196 | 4 |
| `pdashPct` | function | 14197–14200 | 4 |
| `pdashPhaseLabel` | function | 14201–14204 | 4 |
| `pdashTopCount` | function | 14205–14208 | 4 |
| `pdashBestPhase` | function | 14209–14212 | 4 |
| `pdashTopPartner` | function | 14213–14216 | 4 |
| `pdashTopOpponent` | function | 14217–14220 | 4 |
| `pdashOpponentTier` | function | 14221–14226 | 6 |
| `pdashOpponentStrength` | function | 14227–14246 | 20 |
| `pdashInsight` | function | 14247–14249 | 3 |
| `pdashInsights` | function | 14250–14261 | 12 |
| `buildSeasonPlayerDashModel` | function | 14262–14298 | 37 |
| `buildAlltimePlayerDashModel` | function | 14299–14341 | 43 |
| `rPlayerDashStyles` | function | 14342–14353 | 12 |
| `rPdashLabel` | function | 14354–14356 | 3 |
| `rPdashStat` | function | 14357–14359 | 3 |
| `rPlayerDash` | function | 14360–14398 | 39 |
| `rSeasonPlayerDashboard` | function | 14399–14401 | 3 |
| `rAlltimePlayerDashboard` | function | 14402–14404 | 3 |
| `rGlobalPartnerOpponentPanel` | function | 14405–14418 | 14 |
| `rGlobalCareerHeader` | function | 14419–14439 | 21 |
| `rSeasonLandingPage` | function | 14441–14455 | 15 |
| `rGlobalOverview` | function | 14457–14508 | 52 |
| `rGlobalAllTimeStats` | function | 14510–14526 | 17 |
| `rGlobalDevelopment` | function | 14528–14566 | 39 |
| `getGlobalPlayerOpponentGameRows` | function | 14569–14596 | 28 |
| `getGlobalOpponentSpecialistProfile` | function | 14598–14626 | 29 |
| `rGlobalDuoNetwork` | function | 14628–14825 | 198 |
| `rGlobalOpponentSpecialist` | function | 14827–14872 | 46 |
| `playerExplainConfidence` | function | 14874–14879 | 6 |
| `playerExplainConfidenceLabel` | function | 14880–14882 | 3 |
| `playerExplainAdd` | function | 14883–14887 | 5 |
| `playerExplainStyleSignature` | function | 14888–14899 | 12 |
| `playerExplainRolePhrase` | function | 14900–14908 | 9 |
| `playerExplainHeadline` | function | 14909–14918 | 10 |
| `playerExplainContextSentence` | function | 14919–14937 | 19 |
| `buildFieldPlayerExplanation` | function | 14938–15012 | 75 |
| `buildGoaliePlayerExplanation` | function | 15013–15066 | 54 |
| `buildPlayerExplanation` | function | 15067–15075 | 9 |
| `buildPlayerIntelligence` | function | 15076–15105 | 30 |
| `rPlayerExplainItems` | function | 15106–15110 | 5 |
| `rPlayerExplanation` | function | 15111–15162 | 52 |
| `rAllTimePlayersPage` | function | 15164–15204 | 41 |
| `rHallOfFamePage` | function | 15206–15294 | 89 |
| `lexiconUniqueKeys` | function | 15299–15306 | 8 |
| `lexiconEntry` | function | 15307–15316 | 10 |
| `rLexiconRows` | function | 15317–15320 | 4 |
| `rLexiconPage` | function | 15321–15493 | 173 |
| `clampScore` | function | 15497–15500 | 4 |
| `getScoreLabel` | function | 15501–15509 | 9 |
| `buildConfidence` | function | 15510–15555 | 46 |
| `confidenceCautiousText` | function | 15556–15559 | 4 |
| `explainScore` | function | 15560–15574 | 15 |
| `p1NarrativeKey` | function | 15575–15577 | 3 |
| `scoreNarrative` | function | 15578–15596 | 19 |
| `rankNarratives` | function | 15597–15610 | 14 |
| `getEmptyState` | function | 15611–15622 | 12 |
| `rEmptyState` | function | 15623–15626 | 4 |
| `capSuperlativeLabel` | function | 15634–15636 | 3 |
| `rScoreBreakdown` | function | 15637–15653 | 17 |
| `matchcenterSigned` | function | 15655–15659 | 5 |
| `matchcenterDateLabel` | function | 15661–15665 | 5 |
| `dedupeGamesById` | function | 15677–15685 | 9 |
| `matchcenterIsFreiburgTuebingenTeamName` | function | 15686–15692 | 7 |
| `matchcenterSeasonHasGames` | function | 15696–15698 | 3 |
| `matchcenterDefaultSeasonKey` | function | 15699–15704 | 6 |
| `matchcenterOpponentMode` | function | 15716–15718 | 3 |
| `getMatchcenterOpponents` | function | 15719–15751 | 33 |
| `getMatchcenterDirectOpponents` | function | 15752–15782 | 31 |
| `matchcenterAnalyzeDirect` | function | 15785–15821 | 37 |
| `matchcenterAnalyzeForm` | function | 15822–15847 | 26 |
| `matchcenterGoalMinute` | function | 15856–15861 | 6 |
| `matchcenterEmptyBuckets` | function | 15870–15872 | 3 |
| `matchcenterUlmScoutingConfidence` | function | 15873–15877 | 5 |
| `matchcenterEnsureUlmPlayer` | function | 15878–15915 | 38 |
| `matchcenterRegisterUlmProfileGame` | function | 15916–15921 | 6 |
| `matchcenterUpdateUlmSeasonRow` | function | 15922–15928 | 7 |
| `matchcenterClassifyUlmGoalEvent` | function | 15929–15939 | 11 |
| `matchcenterAddUlmScoring` | function | 15940–15977 | 38 |
| `matchcenterFinalizeUlmPlayers` | function | 15978–16046 | 69 |
| `matchcenterBuildUlmPlayerScouting` | function | 16047–16101 | 55 |
| `matchcenterBuildUlmPlayerInsights` | function | 16102–16114 | 13 |
| `matchcenterDuoPairKey` | function | 16115–16118 | 4 |
| `matchcenterEnsureOpponentDuo` | function | 16119–16151 | 33 |
| `matchcenterDuoDirectionLabel` | function | 16152–16158 | 7 |
| `matchcenterAddDuoConnection` | function | 16159–16177 | 19 |
| `matchcenterFinalizeOpponentDuos` | function | 16178–16212 | 35 |
| `matchcenterBuildOpponentDuos` | function | 16213–16257 | 45 |
| `matchcenterBuildOpponentDuoInsights` | function | 16258–16271 | 14 |
| `matchcenterEnsureUlmDuo` | function | 16272–16309 | 38 |
| `matchcenterAddUlmDuoConnection` | function | 16310–16328 | 19 |
| `matchcenterFinalizeUlmDuos` | function | 16329–16364 | 36 |
| `matchcenterBuildUlmDuos` | function | 16365–16407 | 43 |
| `matchcenterBuildUlmDuoInsights` | function | 16408–16420 | 13 |
| `matchcenterDirectContextGames` | function | 16421–16423 | 3 |
| `matchcenterSpecialTeamsForGame` | function | 16424–16427 | 4 |
| `matchcenterPersonalPenaltyMinutesForSide` | function | 16428–16436 | 9 |
| `matchcenterPct` | function | 16437–16440 | 4 |
| `matchcenterBuildSpecialTeamsMatchup` | function | 16441–16488 | 48 |
| `matchcenterGoalieKey` | function | 16489–16493 | 5 |
| `matchcenterGoalieFitScore` | function | 16494–16510 | 17 |
| `matchcenterBuildGoalieMatchup` | function | 16511–16556 | 46 |
| `matchcenterGoalAbsSeconds` | function | 16557–16564 | 8 |
| `matchcenterTimeValue` | function | 16565–16572 | 8 |
| `matchcenterEmptyTimingStats` | function | 16573–16581 | 9 |
| `matchcenterWindowForSecond` | function | 16582–16588 | 7 |
| `matchcenterTimingStatsForGames` | function | 16589–16625 | 37 |
| `matchcenterBuildTimingInsights` | function | 16626–16636 | 11 |
| `matchcenterBuildTimingAnalysis` | function | 16637–16647 | 11 |
| `rMatchcenterTimeBars` | function | 16648–16661 | 14 |
| `rMatchcenterTimingStatsCard` | function | 16662–16681 | 20 |
| `rMatchcenterTiming` | function | 16682–16705 | 24 |
| `rMatchcenterTabs` | function | 16721–16723 | 3 |
| `rMatchcenterProfileSection` | function | 16724–16743 | 20 |
| `rMatchcenterFormSection` | function | 16744–16769 | 26 |
| `rMatchcenterDetailsSection` | function | 16770–16777 | 8 |
| `matchcenterResultClass` | function | 16778–16780 | 3 |
| `matchcenterUlmTeamLabelForGame` | function | 16782–16786 | 5 |
| `matchcenterGameLine` | function | 16787–16792 | 6 |
| `matchcenterFormLine` | function | 16793–16797 | 5 |
| `matchcenterBuildInsights` | function | 16798–16818 | 21 |
| `rMatchcenterKpi` | function | 16819–16825 | 7 |
| `rMatchcenterFormCard` | function | 16826–16846 | 21 |
| `rMatchcenterGamesList` | function | 16847–16858 | 12 |
| `rMatchcenterWatchCard` | function | 16859–16879 | 21 |
| `rMatchcenterPlayerRow` | function | 16880–16903 | 24 |
| `rMatchcenterRankCard` | function | 16904–16909 | 6 |
| `rMatchcenterUlmImpactCard` | function | 16910–16938 | 29 |
| `rMatchcenterUlmPlayerRow` | function | 16939–16962 | 24 |
| `rMatchcenterUlmRankCard` | function | 16963–16968 | 6 |
| `rMatchcenterUlmScouting` | function | 16969–17005 | 37 |
| `rMatchcenterOpponentScouting` | function | 17006–17041 | 36 |
| `rMatchcenterPlayersTab` | function | 17042–17044 | 3 |
| `rMatchcenterDuoWatchCard` | function | 17045–17064 | 20 |
| `rMatchcenterDuoRow` | function | 17065–17088 | 24 |
| `rMatchcenterDuoRankCard` | function | 17089–17094 | 6 |
| `rMatchcenterUlmDuoWatchCard` | function | 17095–17120 | 26 |
| `rMatchcenterUlmDuoRow` | function | 17121–17143 | 23 |
| `rMatchcenterUlmDuoRankCard` | function | 17144–17149 | 6 |
| `rMatchcenterUlmDuos` | function | 17150–17192 | 43 |
| `rMatchcenterOpponentDuos` | function | 17193–17235 | 43 |
| `rMatchcenterDuosTab` | function | 17236–17238 | 3 |
| `rMatchcenterSpecialCard` | function | 17239–17247 | 9 |
| `rMatchcenterSpecialTeams` | function | 17248–17297 | 50 |
| `rMatchcenterGoalieCard` | function | 17298–17321 | 24 |
| `rMatchcenterGoalieMatchup` | function | 17322–17350 | 29 |
| `matchcenterPlanScoreText` | function | 17351–17354 | 4 |
| `matchcenterPlanRateText` | function | 17355–17359 | 5 |
| `matchcenterPriorityLabel` | function | 17360–17362 | 3 |
| `matchcenterConfidenceClass` | function | 17363–17368 | 6 |
| `matchcenterInferPriority` | function | 17369–17375 | 7 |
| `matchcenterAddPlanItem` | function | 17376–17381 | 6 |
| `matchcenterAddPlanWatch` | function | 17382–17387 | 6 |
| `matchcenterBuildPlanConfidence` | function | 17388–17422 | 35 |
| `matchcenterIntelCurve` | function | 17423–17428 | 6 |
| `matchcenterIntelInverseCurve` | function | 17429–17432 | 4 |
| `matchcenterIntelWeighted` | function | 17433–17443 | 11 |
| `matchcenterIntelRate` | function | 17444–17447 | 4 |
| `matchcenterIntelPct` | function | 17448–17451 | 4 |
| `matchcenterIntelPriorityFromScore` | function | 17452–17457 | 6 |
| `matchcenterIntelPriorityClass` | function | 17458–17463 | 6 |
| `matchcenterIntelPriorityLabel` | function | 17464–17467 | 4 |
| `matchcenterIntelDataLabel` | function | 17468–17470 | 3 |
| `matchcenterBuildIntelligenceDataQuality` | function | 17471–17521 | 51 |
| `matchcenterBuildOpponentDNA` | function | 17522–17634 | 113 |
| `matchcenterDeriveOpponentType` | function | 17635–17652 | 18 |
| `matchcenterIntelPlayerRef` | function | 17653–17665 | 13 |
| `matchcenterIntelDuoRef` | function | 17666–17679 | 14 |
| `matchcenterIntelAddAlarm` | function | 17680–17700 | 21 |
| `matchcenterBuildOpponentAlarm` | function | 17701–17810 | 110 |
| `matchcenterBuildIntelListFromPlan` | function | 17811–17819 | 9 |
| `matchcenterBuildCoachHints` | function | 17820–17835 | 16 |
| `matchcenterBuildIntelHeadline` | function | 17836–17843 | 8 |
| `matchcenterBuildOneThingToWatch` | function | 17844–17856 | 13 |
| `matchcenterBuildIntelligenceSignals` | function | 17857–17903 | 47 |
| `buildMatchIntelligenceFromContext` | function | 17904–17958 | 55 |
| `buildMatchIntelligence` | function | 17959–17980 | 22 |
| `matchcenterCoachCautious` | function | 17981–17983 | 3 |
| `matchcenterCoachAdd` | function | 17984–17992 | 9 |
| `matchcenterCoachGameModel` | function | 17993–18006 | 14 |
| `buildMatchStories` | function | 18007–18036 | 30 |
| `matchcenterCoachPriorityFromAlarm` | function | 18037–18046 | 10 |
| `matchcenterBuildCoachPriorities` | function | 18047–18053 | 7 |
| `matchcenterBuildCoachLevers` | function | 18054–18063 | 10 |
| `matchcenterBuildCoachDangerPatterns` | function | 18064–18071 | 8 |
| `matchcenterBuildCoachIfThen` | function | 18072–18081 | 10 |
| `matchcenterBuildCoachAvoidList` | function | 18082–18091 | 10 |
| `matchcenterBuildCoachActivationHints` | function | 18092–18098 | 7 |
| `matchcenterBuildCoachKeyActors` | function | 18099–18106 | 8 |
| `buildDigitalCoachReport` | function | 18107–18139 | 33 |
| `buildLockerRoomSheet` | function | 18140–18160 | 21 |
| `matchcenterSocialAdd` | function | 18161–18167 | 7 |
| `matchcenterSocialCaption` | function | 18168–18173 | 6 |
| `socialSentence` | function | 18174–18176 | 3 |
| `socialEnsurePeriod` | function | 18177–18180 | 4 |
| `socialFirstUseful` | function | 18181–18183 | 3 |
| `socialPlayerFocusLine` | function | 18184–18190 | 7 |
| `socialDuoFocusLine` | function | 18191–18196 | 6 |
| `socialOpponentLine` | function | 18197–18200 | 4 |
| `socialKeyFactLine` | function | 18201–18210 | 10 |
| `buildMatchdayCaptionBlocks` | function | 18211–18240 | 30 |
| `buildSocialMediaContent` | function | 18241–18289 | 49 |
| `isSyntheticLineupPlayerId` | function | 18295–18297 | 3 |
| `getSyntheticLineupPlayers` | function | 18298–18300 | 3 |
| `getSyntheticLineupRow` | function | 18301–18317 | 17 |
| `getSyntheticLineupRows` | function | 18318–18320 | 3 |
| `getLineupAllRows` | function | 18321–18323 | 3 |
| `lineupRowMeta` | function | 18324–18331 | 8 |
| `getLineupPlayerPool` | function | 18332–18340 | 9 |
| `lineupScore` | function | 18341–18346 | 6 |
| `lineupAverage` | function | 18347–18350 | 4 |
| `lineupLevelLabel` | function | 18351–18354 | 4 |
| `lineupRosterGamesForPlayer` | function | 18357–18404 | 48 |
| `buildLineupExperienceProfile` | function | 18405–18447 | 43 |
| `lineupOpponentDNAForContext` | function | 18448–18459 | 12 |
| `buildLineupOpponentDNAFit` | function | 18460–18503 | 44 |
| `classifyLineIdentity` | function | 18504–18551 | 48 |
| `lineupPlayerProfile` | function | 18552–18627 | 76 |
| `buildLineupAnalysis` | function | 18628–18761 | 134 |
| `buildLineupScoreBreakdowns` | function | 18762–18791 | 30 |
| `buildLineupIntelligence` | function | 18792–18802 | 11 |
| `buildLineAnalysis` | function | 18803–18805 | 3 |
| `lineupRowMap` | function | 18806–18808 | 3 |
| `lineupRankCandidateIds` | function | 18809–18823 | 15 |
| `lineupCombinationIds` | function | 18824–18837 | 14 |
| `lineupStdDev` | function | 18838–18843 | 6 |
| `lineupRoleDnaComplementScore` | function | 18844–18867 | 24 |
| `lineupDirectChemistryScore` | function | 18868–18874 | 7 |
| `lineupEvaluateComplementCandidate` | function | 18875–18953 | 79 |
| `lineupPlayerAnchorScore` | function | 18954–18971 | 18 |
| `lineupPlayerAnchorConfidence` | function | 18974–18978 | 5 |
| `buildTeamLineBalance` | function | 18979–19022 | 44 |
| `buildBalancedLineupSet` | function | 19023–19049 | 27 |
| `lineupRecommendationReason` | function | 19050–19058 | 9 |
| `buildLineupRecommendations` | function | 19059–19140 | 82 |
| `recommendLineComplements` | function | 19141–19168 | 28 |
| `matchcenterBuildMatchPlan` | function | 19169–19314 | 146 |
| `rMatchcenterPlanItems` | function | 19315–19332 | 18 |
| `rMatchcenterPlanWatch` | function | 19333–19348 | 16 |
| `rMatchcenterOpponentDNA` | function | 19349–19381 | 33 |
| `rMatchcenterOpponentAlarm` | function | 19382–19403 | 22 |
| `rMatchcenterIntelOverview` | function | 19404–19449 | 46 |
| `rMatchcenterIntelCoachHints` | function | 19450–19463 | 14 |
| `rMatchcenterCoachCardList` | function | 19464–19477 | 14 |
| `rMatchcenterCoachIfThen` | function | 19478–19485 | 8 |
| `rMatchcenterCoachSimpleList` | function | 19486–19490 | 5 |
| `rMatchcenterDigitalCoach` | function | 19491–19555 | 65 |
| `rMatchcenterCopyButton` | function | 19556–19560 | 5 |
| `rMatchcenterLockerList` | function | 19561–19572 | 12 |
| `rMatchcenterLockerRoomSheet` | function | 19573–19628 | 56 |
| `rMatchcenterSocialBlock` | function | 19629–19636 | 8 |
| `matchcenterStoryDownloadFileName` | function | 19637–19646 | 10 |
| `downloadMatchdayStory` | window | 19647–19694 | 48 |
| `rSocialVideoBlock` | function | 19698–19729 | 32 |
| `socialVideoJobsForMatchday` | function | 19732–19738 | 7 |
| `generateSocialVideoVideos` | window | 19739–19780 | 42 |
| `cancelSocialVideoRecording` | window | 19781–19783 | 3 |
| `generateSocialVideoStandbilder` | window | 19784–19807 | 24 |
| `generateSocialVideoContactSheets` | window | 19808–19830 | 23 |
| `rMatchcenterSocialMediaCenter` | function | 19831–19884 | 54 |
| `rLineupScoreRows` | function | 19885–19906 | 22 |
| `rLineupSimpleCards` | function | 19907–19915 | 9 |
| `rMatchcenterLineupBuilder` | function | 19916–19988 | 73 |
| `rLineupMetricPills` | function | 19989–20002 | 14 |
| `rLineupBuilderAvailablePanel` | function | 20003–20050 | 48 |
| `rLineupRecommendationCards` | function | 20051–20065 | 15 |
| `rLineupRecommendationMode` | function | 20066–20099 | 34 |
| `rLineupComplementCards` | function | 20100–20112 | 13 |
| `rLineupTestLine` | function | 20113–20161 | 49 |
| `rLineupTestMode` | function | 20162–20178 | 17 |
| `rLineupBuilderPage` | function | 20179–20213 | 35 |
| `rMatchcenterScoutingSummary` | function | 20214–20257 | 44 |
| `rMatchcenterMatchPlan` | function | 20258–20278 | 21 |
| `matchcenterStoryLogoBase` | function | 20281–20286 | 6 |
| `matchcenterStorySafeLogoUrl` | function | 20287–20293 | 7 |
| `getTeamLogoUrlForStory` | function | 20302–20331 | 30 |
| `matchcenterStoryLogoForOpponent` | function | 20332–20346 | 15 |
| `matchcenterStoryTableRank` | function | 20347–20357 | 11 |
| `matchcenterStoryUlmTableRank` | function | 20358–20364 | 7 |
| `matchcenterStoryRankText` | function | 20365–20368 | 4 |
| `matchcenterStoryInlineStat` | function | 20369–20371 | 3 |
| `matchcenterStoryRankRows` | function | 20373–20384 | 12 |
| `matchcenterStoryAddFact` | function | 20387–20393 | 7 |
| `matchcenterStoryFactKey` | function | 20394–20396 | 3 |
| `matchcenterStoryLooksArtificial` | function | 20397–20399 | 3 |
| `matchcenterStoryEstimateFactWeight` | function | 20400–20405 | 6 |
| `matchcenterStoryAddCandidate` | function | 20406–20428 | 23 |
| `matchcenterStoryCategoryLimit` | function | 20429–20432 | 4 |
| `matchcenterStoryNormalizePickOptions` | function | 20433–20443 | 11 |
| `matchcenterStoryCandidateForBudget` | function | 20444–20453 | 10 |
| `matchcenterStoryPickFactItems` | function | 20454–20506 | 53 |
| `matchcenterStoryPickFacts` | function | 20507–20509 | 3 |
| `matchcenterStoryCurrentStreak` | function | 20511–20519 | 9 |
| `matchcenterStoryWinlessStreak` | function | 20520–20528 | 9 |
| `matchcenterStoryFormFact` | function | 20529–20539 | 11 |
| `matchcenterStoryFormFactCandidates` | function | 20540–20559 | 20 |
| `matchcenterStoryLateGoalsForOutcome` | function | 20560–20563 | 4 |
| `matchcenterStoryClutchFact` | function | 20564–20578 | 15 |
| `matchcenterStoryPlayerClutchTotal` | function | 20579–20586 | 8 |
| `matchcenterStoryBestClutchPlayer` | function | 20587–20596 | 10 |
| `matchcenterStoryPlayerClutchFact` | function | 20597–20622 | 26 |
| `matchcenterStoryDuoClutchTotal` | function | 20623–20630 | 8 |
| `matchcenterStoryBestClutchDuo` | function | 20631–20640 | 10 |
| `matchcenterStoryDuoClutchFact` | function | 20641–20643 | 3 |
| `matchcenterStoryDuoFact` | function | 20644–20664 | 21 |
| `matchcenterStoryClutchPriority` | function | 20665–20667 | 3 |
| `matchcenterStoryCompetitionLabel` | function | 20668–20671 | 4 |
| `matchcenterStoryShortDuel` | function | 20672–20676 | 5 |
| `matchcenterStoryLastDuelLabel` | function | 20677–20680 | 4 |
| `matchcenterStoryDirectFactCandidates` | function | 20681–20702 | 22 |
| `matchcenterStoryPlanFactCandidates` | function | 20703–20715 | 13 |
| `matchcenterStoryCategoryForPlanFact` | function | 20716–20724 | 9 |
| `buildMatchcenterStoryPreviewData` | function | 20725–20836 | 112 |
| `matchcenterStoryNameClass` | function | 20837–20842 | 6 |
| `matchcenterStoryVisibleFacts` | function | 20843–20873 | 31 |
| `rMatchcenterStoryLogo` | function | 20874–20878 | 5 |
| `rMatchcenterStoryForm` | function | 20879–20883 | 5 |
| `rMatchcenterStoryPlayerCard` | function | 20884–20891 | 8 |
| `rMatchcenterStoryPreview` | function | 20892–20961 | 70 |
| `rMatchcenterStoryFrame` | function | 20962–20967 | 6 |
| `fitMatchcenterStoryLayout` | function | 20968–21010 | 43 |
| `ensureSocialVideoExportCapabilityChecked` | function | 21019–21023 | 5 |
| `downloadSocialVideoStandbild` | window | 21038–21057 | 20 |
| `downloadSocialVideoContactSheet` | window | 21062–21087 | 26 |
| `rMatchcenterPage` | function | 21089–21237 | 149 |
| `rTeamPage` | function | 21238–21575 | 338 |
| `exportExcel` | function | 21580–21601 | 22 |
| `render` | function | 21607–21624 | 18 |
| `_render` | function | 21625–21794 | 170 |
| `uiFormatNumber` | function | 21828–21832 | 5 |
| `uiReliabilityDots` | function | 21841–21848 | 8 |
| `uiDeltaIndicator` | function | 21856–21862 | 7 |
| `uiInfoIcon` | function | 21874–21878 | 5 |
| `uiKennzahlKachel` | function | 21886–21897 | 12 |
| `uiKernaussage` | function | 21906–21912 | 7 |
| `uiHinweisKarte` | function | 21920–21932 | 13 |
| `uiRangliste` | function | 21942–21959 | 18 |
| `uiVerlauf` | function | 21970–21989 | 20 |
| `uiIntervallBalken` | function | 21996–22008 | 13 |
| `uiMethodenbox` | function | 22015–22024 | 10 |
| `uiNotiz` | function | 22032–22036 | 5 |
| `datenstandQuoteState` | function | 22058–22065 | 8 |
| `uiQuoteText` | function | 22068–22074 | 7 |
| `uiDatenstandBand` | function | 22091–22104 | 14 |
| `uiPlatzhalter` | function | 22112–22117 | 6 |
| `uiObjektseiteSortTabs` | function | 22162–22170 | 9 |
| `uiObjektseite` | function | 22180–22213 | 34 |
| `mainNavActiveKeyForPage` | function | 22270–22275 | 6 |
| `goToMainNavPoint` | window | 22276–22282 | 7 |
| `rMainNav` | function | 22283–22287 | 5 |
| `rMainNavBottom` | function | 22305–22312 | 8 |
| `openOverview` | window | 22322–22330 | 9 |
| `switchOverviewSeason` | window | 22339–22345 | 7 |
| `openMatchdayTimeline` | window | 22373–22380 | 8 |
| `openMatchday` | window | 22381–22390 | 10 |
| `switchMatchdaySeason` | window | 22392–22397 | 6 |
| `matchdayUlmGames` | function | 22399–22401 | 3 |
| `matchdayGameCardHtml` | function | 22402–22415 | 14 |
| `matchdayFixtureCardHtml` | function | 22421–22429 | 9 |
| `rMatchdayTimelineRow` | function | 22431–22438 | 8 |
| `rMatchdayTimelinePage` | function | 22439–22449 | 11 |
| `rMatchdayDetailPage` | function | 22450–22489 | 40 |
| `rMatchdayPage` | function | 22490–22496 | 7 |
| `overviewMatchdayStartMs` | function | 22515–22520 | 6 |
| `overviewMatchdayEndMs` | function | 22521–22526 | 6 |
| `detectOverviewPhase` | function | 22527–22552 | 26 |
| `getSeasonDataState` | function | 22559–22569 | 11 |
| `parseSeasonDataState` | function | 22570–22578 | 9 |
| `isNewSeasonDataState` | function | 22580–22582 | 3 |
| `recordOverviewVisit` | function | 22589–22598 | 10 |
| `overviewOpponentLabel` | function | 22604–22615 | 12 |
| `overviewLastMatchdayText` | function | 22616–22619 | 4 |
| `overviewNextMatchdayHtml` | function | 22626–22642 | 17 |
| `overviewCompactTableHtml` | function | 22650–22656 | 7 |
| `overviewFormHtml` | function | 22658–22672 | 15 |
| `overviewSeasonBilanzHtml` | function | 22673–22679 | 7 |
| `overviewSeasonAwardHtml` | function | 22681–22690 | 10 |
| `overviewRecordHtml` | function | 22692–22697 | 6 |
| `overviewCrossSeasonTrendHtml` | function | 22699–22707 | 9 |
| `overviewOpponentPreviewHtml` | function | 22708–22712 | 5 |
| `overviewMatchcenterLinkHtml` | function | 22713–22715 | 3 |
| `overviewLineupLinkHtml` | function | 22716–22718 | 3 |
| `overviewRankChangeTile` | function | 22735–22752 | 18 |
| `buildOverviewCards` | function | 22761–22801 | 41 |
| `rOverviewPage` | function | 22811–22822 | 12 |
| `openLigaGegner` | window | 22823–22826 | 4 |
| `rLigaGegnerPlaceholderPage` | function | 22827–22832 | 6 |
| `rAsOfSelector` | function | 22844–22856 | 13 |
| `setContextAsOf` | window | 22857–22868 | 12 |
| `rSeasonDataPreviewContextHint` | function | 22879–22887 | 9 |
| `rSeasonDataStateContextHint` | function | 22896–22902 | 7 |
| `rContextBar` | function | 22927–22945 | 19 |
| `rIaShell` | function | 22947–22949 | 3 |
| `globalSearchTokens` | function | 22966–22969 | 4 |
| `globalSearchEntries` | function | 22971–22984 | 14 |
| `globalSearchPlayerScore` | function | 22985–22992 | 8 |
| `globalSearchMatchdayScore` | function | 22994–23006 | 13 |
| `globalSearchMatch` | function | 23008–23019 | 12 |
| `globalSearchIsEditableTarget` | function | 23020–23024 | 5 |
| `globalSearchKeyAction` | function | 23026–23040 | 15 |
| `rGlobalSearchToggle` | function | 23041–23043 | 3 |
| `rGlobalSearchResultsHtml` | function | 23044–23054 | 11 |
| `rGlobalSearchPanelHtml` | function | 23055–23057 | 3 |
| `paintGlobalSearchResults` | function | 23058–23065 | 8 |
| `openGlobalSearch` | window | 23066–23090 | 25 |
| `closeGlobalSearch` | window | 23091–23098 | 8 |
| `onGlobalSearchInput` | window | 23099–23104 | 6 |
| `moveGlobalSearch` | function | 23105–23110 | 6 |
| `activateGlobalSearchResult` | window | 23111–23120 | 10 |
| `globalSearchOnKeydown` | function | 23121–23142 | 22 |
| `initGlobalSearch` | function | 23143–23147 | 5 |
| `rToolMenu` | function | 23169–23172 | 4 |
| `toolMenuElements` | function | 23173–23175 | 3 |
| `toolMenuItemElements` | function | 23176–23178 | 3 |
| `isToolMenuOpen` | function | 23179–23182 | 4 |
| `openToolMenu` | window | 23183–23190 | 8 |
| `closeToolMenu` | window | 23191–23197 | 7 |
| `toggleToolMenu` | window | 23198–23201 | 4 |
| `activateToolMenuItem` | window | 23202–23209 | 8 |
| `toolMenuOnKeydown` | function | 23210–23233 | 24 |
| `toolMenuOnClick` | function | 23234–23240 | 7 |
| `initToolMenu` | function | 23241–23244 | 4 |

## Alphabetisches Register

| Name | Art | Zeile |
|---|---|---|
| `_render` | function | 21625 |
| `acceptEinsatzCenterRosterSuggestion` | window | 7596 |
| `activateGlobalSearchResult` | window | 23111 |
| `activateToolMenuItem` | window | 23202 |
| `addComparisonDuo` | window | 13246 |
| `addComparisonDuoFromSelection` | window | 13238 |
| `addComparisonItem` | window | 13146 |
| `addDuoTeamGame` | function | 11131 |
| `addEinsatzCenterExistingGroup` | window | 7613 |
| `addEinsatzCenterGroupPlayer` | window | 7681 |
| `addEinsatzCenterNewGroup` | window | 7622 |
| `addEinsatzCenterRosterPlayer` | window | 7562 |
| `addGoalieGameToStats` | function | 4478 |
| `addGoalieSpecialTeamsGameToStats` | function | 4448 |
| `addLineupBuilderPlayerToActiveLine` | window | 2333 |
| `addLineupBuilderPlayerToLine` | window | 2323 |
| `addLineupPlayer` | window | 2269 |
| `addRosterImpactGameToStats` | function | 11666 |
| `addSelectedComparisonItem` | window | 13154 |
| `addSyntheticLineupPlayer` | window | 2349 |
| `addUnique` | function | 3665 |
| `aggregateAllTimeDuos` | function | 4821 |
| `aggregateAllTimePlayers` | function | 3932 |
| `aggregateAlltimeSpecialTeams` | function | 4428 |
| `aggregateGoalieAlltimeStats` | function | 4661 |
| `aggregateSeasonStats` | function | 4833 |
| `analysisCacheContext` | function | 2175 |
| `analysisCacheKey` | function | 2209 |
| `annotateSpecialTeamsGoalEvent` | function | 4210 |
| `antiSynergyDeltaClass` | function | 11901 |
| `antiSynergyImpactScore` | function | 11807 |
| `antiSynergyPartnerIsSgOnly` | function | 11953 |
| `antiSynergySigned` | function | 11905 |
| `appendSeasonGameDiagnostics` | function | 2545 |
| `applyAppHash` | function | 3471 |
| `applyCurrentSeasonCoverHighlight` | function | 6066 |
| `applyGlobalPageFromHash` | function | 3438 |
| `applySeasonContext` | function | 2410 |
| `applySeasonScoringToRegistry` | function | 3823 |
| `asOfCacheKeyPart` | function | 2203 |
| `asOfEquals` | function | 3142 |
| `assignStatus` | function | 5671 |
| `avgOrNull` | function | 3970 |
| `backToComparisonModeSelect` | window | 13174 |
| `backToHome` | window | 2386 |
| `buildAlltimePlayerDashModel` | function | 14299 |
| `buildAnnotatedGoalEventsForGame` | function | 10737 |
| `buildAppHash` | function | 3288 |
| `buildBalancedLineupSet` | function | 19023 |
| `buildBestThirdManOptions` | function | 10622 |
| `buildComparisonDataset` | function | 13615 |
| `buildComparisonExtraMetrics` | function | 13470 |
| `buildComparisonSummary` | function | 13965 |
| `buildConfidence` | function | 15510 |
| `buildDigitalCoachReport` | function | 18107 |
| `buildDirectDuoLookupForPlayer` | function | 10580 |
| `buildDryRunReport` | function | 6290 |
| `buildDuoAntiSynergy` | function | 11891 |
| `buildDuoComparison` | function | 13259 |
| `buildDuoCompatibility` | function | 11254 |
| `buildDuoDirectProduction` | function | 11107 |
| `buildDuoFloorCeiling` | function | 11018 |
| `buildDuoGapAnalysis` | function | 11226 |
| `buildDuoNetworkContext` | function | 11202 |
| `buildDuoOpponentAdjusted` | function | 11189 |
| `buildDuoProAnalysis` | function | 11313 |
| `buildDuoReplacementOptions` | function | 11301 |
| `buildDuoUntestedPotential` | function | 11277 |
| `buildDuoUsageRate` | function | 11289 |
| `buildDuoWarnings` | function | 11060 |
| `buildDuoWithWithoutImpact` | function | 11155 |
| `buildEinsatzCenterDraftExport` | function | 7742 |
| `buildFieldPlayerExplanation` | function | 14938 |
| `buildGlobalPageHash` | function | 3305 |
| `buildGoalieAnalysisModel` | function | 9545 |
| `buildGoalieComparisonDataset` | function | 13564 |
| `buildGoalieGameRecord` | function | 4530 |
| `buildGoaliePlayerExplanation` | function | 15013 |
| `buildGoalieRoleProfile` | function | 9768 |
| `buildGoalieStatsForSeason` | function | 4580 |
| `buildHallOfFameIntroTitle` | function | 8452 |
| `buildHashStringFromParsed` | function | 3320 |
| `buildIdentityProfiles` | function | 5393 |
| `buildLineAnalysis` | function | 18803 |
| `buildLineupAnalysis` | function | 18628 |
| `buildLineupExperienceProfile` | function | 18405 |
| `buildLineupIntelligence` | function | 18792 |
| `buildLineupOpponentDNAFit` | function | 18460 |
| `buildLineupRecommendations` | function | 19059 |
| `buildLineupScoreBreakdowns` | function | 18762 |
| `buildLockerRoomSheet` | function | 18140 |
| `buildMatchcenterStoryPreviewData` | function | 20725 |
| `buildMatchdayCaptionBlocks` | function | 18211 |
| `buildMatchIntelligence` | function | 17959 |
| `buildMatchIntelligenceFromContext` | function | 17904 |
| `buildMatchStories` | function | 18007 |
| `buildMomentumSwingStats` | function | 11012 |
| `buildMomentumSwingStatsRaw` | function | 10941 |
| `buildOpponentIntelligence` | function | 10419 |
| `buildOverviewCards` | function | 22761 |
| `buildPlayerDataFoundation` | function | 4850 |
| `buildPlayerEvents` | function | 4904 |
| `buildPlayerExplanation` | function | 15067 |
| `buildPlayerIdentity` | function | 3676 |
| `buildPlayerIntelligence` | function | 15076 |
| `buildRecencyWeightedGlobalIdentityProfile` | function | 12472 |
| `buildRegistry` | function | 4873 |
| `buildResponseGoalStats` | function | 10929 |
| `buildResponseGoalStatsRaw` | function | 10880 |
| `buildRosterImpactAnalysis` | function | 11822 |
| `buildRosterImpactGameIndex` | function | 11709 |
| `buildSeasonDataPreviewChanges` | function | 6395 |
| `buildSeasonDuos` | function | 4777 |
| `buildSeasonPlayerDashModel` | function | 14262 |
| `buildSocialMediaContent` | function | 18241 |
| `buildSoloDuoProfile` | function | 5162 |
| `buildSpecialTeamsForGame` | function | 4225 |
| `buildSpecialTeamsForSeason` | function | 4419 |
| `buildStaticSeasonDataBlock` | function | 6114 |
| `buildTeamLineBalance` | function | 18979 |
| `cachedAnalysis` | function | 2213 |
| `cancelDuoProPicker` | window | 11516 |
| `cancelEinsatzCenterEdit` | window | 7543 |
| `cancelHallOfFameIntro` | function | 8541 |
| `cancelSocialVideoRecording` | window | 19781 |
| `capSuperlativeLabel` | function | 15634 |
| `clampScore` | function | 15497 |
| `classicTagLabel` | function | 8695 |
| `classifyLineIdentity` | function | 18504 |
| `cleanupHallOfFameIntro` | function | 8481 |
| `clearAnalysisCache` | function | 2172 |
| `clearComparison` | window | 13165 |
| `clearComparisonDuos` | window | 13253 |
| `clearLineupAvailable` | window | 2322 |
| `clearLineupBuilderLine` | window | 2341 |
| `clearLineupPlayers` | window | 2276 |
| `clearlyAboveAverage` | function | 5350 |
| `clonePlain` | function | 4067 |
| `closeGlobalSearch` | window | 23091 |
| `closeMatchcenterStoryPreview` | window | 2241 |
| `closeToolMenu` | window | 23191 |
| `clutchText` | function | 5234 |
| `collectAssistEventRefs` | function | 2865 |
| `comparisonDuoContext` | function | 13179 |
| `comparisonEventGameKey` | function | 13457 |
| `comparisonEventPhaseLabel` | function | 13460 |
| `comparisonFmt` | function | 12947 |
| `comparisonItemKey` | function | 12925 |
| `comparisonJsArg` | function | 12936 |
| `comparisonNum` | function | 12939 |
| `comparisonOpponentStrengthTier` | function | 13464 |
| `comparisonPct` | function | 12943 |
| `comparisonPctFmt` | function | 12951 |
| `comparisonVariantValue` | function | 13068 |
| `composeIdentityText` | function | 5625 |
| `computeCurrentAppHash` | function | 3340 |
| `computeEinsatzCenterStats` | function | 6756 |
| `computeMetrics` | function | 5008 |
| `computeRosterStatus` | function | 5651 |
| `confidenceCautiousText` | function | 15556 |
| `confidenceFromSampleSize` | function | 11799 |
| `confirmDuoProSelection` | window | 11521 |
| `confirmEinsatzCenterCombo` | window | 7714 |
| `copyMatchcenterText` | window | 2243 |
| `countBy` | function | 10166 |
| `countCaptainAppearances` | function | 5633 |
| `countGoalieAppearances` | function | 5647 |
| `countMomentumClusters` | function | 5267 |
| `countPlayedUlmGames` | function | 2785 |
| `createPlayerAnalysisProfile` | function | 3602 |
| `createSeasonBucket` | function | 1797 |
| `datenstandQuoteState` | function | 22058 |
| `decodeHashSegmentSafe` | function | 3213 |
| `dedupeGamesById` | function | 15677 |
| `dedupeIdentityProfileTags` | function | 12549 |
| `deriveAsOfForSeason` | function | 3018 |
| `deriveLineupUlmPlayerIds` | function | 7253 |
| `deriveLineupValidPlayerIds` | function | 7229 |
| `derivePlayerStatus` | function | 3705 |
| `detectOverviewPhase` | function | 22527 |
| `detectSide` | const-arrow | 2501 |
| `detectTypes` | function | 5142 |
| `detectUlmSide` | function | 2494 |
| `diagnoseGameDuplicates` | function | 2523 |
| `diagnosticError` | function | 5886 |
| `diffGameIds` | function | 6237 |
| `difficultConnectionConfidence` | function | 10556 |
| `discardEinsatzCenterAutosave` | function | 7152 |
| `discardSeasonDataPreview` | function | 6494 |
| `dismissEinsatzCenterRosterSuggestion` | window | 7585 |
| `downloadMatchdayStory` | window | 19647 |
| `downloadSocialVideoContactSheet` | window | 21062 |
| `downloadSocialVideoStandbild` | window | 21038 |
| `duoProContextSeasonKey` | function | 11082 |
| `duoProDomId` | function | 11477 |
| `duoProPairKey` | function | 11079 |
| `duoProPickerMessage` | function | 11483 |
| `duoProPickerOpen` | function | 11480 |
| `duoProPlayer` | function | 11096 |
| `duoProResolveCandidate` | function | 11496 |
| `duoProSelectionPayload` | function | 11505 |
| `duoScopeSeasonKeys` | function | 10598 |
| `einsatzCenterAutosaveDraft` | function | 7068 |
| `einsatzCenterAutosaveInfoText` | function | 7174 |
| `einsatzCenterAutosaveKey` | function | 6979 |
| `einsatzCenterCanonicalJson` | function | 7312 |
| `einsatzCenterComputeBaseHash` | function | 7327 |
| `einsatzCenterCurrentRawBaseHash` | function | 7054 |
| `einsatzCenterDeserializeAutosave` | function | 7014 |
| `einsatzCenterDraftInView` | function | 6883 |
| `einsatzCenterDraftIsEmpty` | function | 6991 |
| `einsatzCenterDraftStaleHint` | function | 6897 |
| `einsatzCenterInspectAutosave` | function | 7103 |
| `einsatzCenterIsPlainObject` | function | 7008 |
| `einsatzCenterSerializeDraft` | function | 6995 |
| `einsatzCenterSha256Hex` | function | 7322 |
| `einsatzCenterSoftIssues` | function | 7336 |
| `einsatzCenterStorageRead` | function | 6980 |
| `einsatzCenterStorageRemove` | function | 6986 |
| `einsatzCenterStorageWrite` | function | 6983 |
| `emptyDuoTeamImpactStats` | function | 11128 |
| `emptyFieldRoleSeasonStats` | function | 3661 |
| `emptyGoalieAlltimeStats` | function | 3634 |
| `emptyGoalieSeasonStats` | function | 3612 |
| `emptyGoalieSpecialTeamsStats` | function | 3649 |
| `emptyPlayerSeasonStats` | function | 3606 |
| `emptyRosterImpactStats` | function | 11655 |
| `emptySpecialTeamsStats` | function | 4026 |
| `ensureAppLoaded` | function | 8395 |
| `ensureEinsatzCenterDraft` | function | 6919 |
| `ensureExternalSeasonData` | function | 6092 |
| `ensureFieldRoleSeasonStats` | function | 3771 |
| `ensureGlobalDataLoaded` | function | 8323 |
| `ensureGoalieSeasonStats` | function | 3766 |
| `ensureHallOfFameIntroOverlay` | function | 8419 |
| `ensureLineupDataLoaded` | function | 6602 |
| `ensureLineupGroupsRegistryLoaded` | function | 6627 |
| `ensureRmDuo` | function | 10860 |
| `ensureRmPlayer` | function | 10854 |
| `ensureSocialVideoExportCapabilityChecked` | function | 21019 |
| `escAttr` | function | 8668 |
| `escHtml` | function | 12568 |
| `eventMatchesTeams` | function | 5228 |
| `explainScore` | function | 15560 |
| `exportEinsatzCenterDraft` | window | 7756 |
| `exportExcel` | function | 21580 |
| `fallbackIdentityProfile` | function | 8703 |
| `fetchJson` | function | 5930 |
| `fetchJsonLegacy` | function | 5862 |
| `fetchJsonWithDiagnostics` | function | 5921 |
| `fetchSeasonGameRaw` | function | 5956 |
| `fetchTextWithDiagnostics` | function | 5891 |
| `fileNameForLineupSeasonKey` | function | 6584 |
| `filterComparisonDuoSuggestions` | window | 13211 |
| `filterComparisonPlayers` | window | 13122 |
| `filterLineupBuilderAvailable` | window | 2370 |
| `filterLineupPlayers` | window | 2277 |
| `filterPlayerSuggestions` | function | 13186 |
| `filterPureSGPlayers` | function | 9341 |
| `finalizeDuoTeamImpactStats` | function | 11147 |
| `finalizeGoalieSeasonStats` | function | 4463 |
| `finalizeMomentumStats` | function | 10935 |
| `finalizePlayerRegistrySeason` | function | 3846 |
| `finalizeResponseStats` | function | 10866 |
| `finalizeRosterImpactStats` | function | 11658 |
| `finalizeSpecialTeamsStats` | function | 4070 |
| `findDuplicateGameIds` | function | 6156 |
| `findLineupGameContext` | function | 6661 |
| `findLoadedSeasonPlayer` | function | 9304 |
| `finishHallOfFameIntro` | function | 8508 |
| `finiteNumbers` | function | 3967 |
| `fitMatchcenterStoryLayout` | function | 20968 |
| `fixMojibakeText` | function | 2447 |
| `formatDiagnosticAttempt` | function | 5937 |
| `formatGameLoadError` | function | 5950 |
| `formatStatus` | function | 5934 |
| `gameClassificationStatusLabel` | function | 2537 |
| `gameDaySortValue` | function | 4136 |
| `gameResult` | function | 3571 |
| `generatePlayerInsights` | function | 9166 |
| `generateSocialVideoContactSheets` | window | 19808 |
| `generateSocialVideoStandbilder` | window | 19784 |
| `generateSocialVideoVideos` | window | 19739 |
| `getActiveAlltimeSeasonKeys` | function | 10338 |
| `getActiveSeasonKey` | function | 2398 |
| `getAllLoadedSeasonGames` | function | 10531 |
| `getAlltimeAggregatedStyleProfile` | function | 14142 |
| `getAllTimeCoverStats` | function | 8274 |
| `getAllTimeDuoRows` | function | 10486 |
| `getAllTimeDuoRowsForPlayer` | function | 10224 |
| `getAllTimeGamesPlayedRows` | function | 10264 |
| `getAllTimeIdentityStandings` | function | 12436 |
| `getAllTimeMainPlayerRows` | function | 9345 |
| `getAllTimeOpponentIntelligence` | function | 12357 |
| `getAllTimeOpponentNames` | function | 2476 |
| `getAllTimeOpponentTopScorers` | function | 12365 |
| `getAllTimePenaltyRows` | function | 10289 |
| `getAllTimePlayerRows` | function | 9313 |
| `getAlltimeRank` | function | 12881 |
| `getAlltimeRecencyWeight` | function | 10349 |
| `getAllTimeSgOnlyRows` | function | 9348 |
| `getAssistDiagnostics` | function | 4722 |
| `getAssistPlayersFromEvent` | function | 2893 |
| `getCarryPerformanceRows` | function | 10235 |
| `getComparisonAlltimeTeamGoals` | function | 12972 |
| `getComparisonAlltimeTrend` | function | 13046 |
| `getComparisonChemistryFromEvents` | function | 12980 |
| `getComparisonClutchFromEvents` | function | 12985 |
| `getComparisonCurrentSelection` | function | 13111 |
| `getComparisonEventsForItem` | function | 13429 |
| `getComparisonPlayerOptions` | function | 13053 |
| `getComparisonPlayerRow` | function | 12954 |
| `getComparisonProfile` | function | 13015 |
| `getComparisonRosterGames` | function | 13449 |
| `getComparisonRosterGamesForSeason` | function | 13432 |
| `getComparisonSeasonEvents` | function | 12975 |
| `getComparisonSeasonLabel` | function | 12957 |
| `getComparisonSeasonTrend` | function | 13020 |
| `getComparisonStyleProfile` | function | 12990 |
| `getComparisonTeamGoalsForSeason` | function | 12960 |
| `getComparisonVariantsForPlayer` | function | 13071 |
| `getDifficultConnectionRowsForPlayer` | function | 11610 |
| `getDuoDirectScorerGameCounts` | function | 10656 |
| `getDuoFieldPlayerRows` | function | 11085 |
| `getDuoRowsForPlayerScope` | function | 10561 |
| `getDuoScorerCountsWithCandidate` | function | 10602 |
| `getDuoSharedFieldRows` | function | 11101 |
| `getEffectiveLineupData` | function | 6869 |
| `getEinsatzCenterGameDraft` | function | 6941 |
| `getEmptyState` | function | 15611 |
| `getFieldGameIdsForPlayer` | function | 2694 |
| `getFurtherSameDayUlmGames` | function | 4152 |
| `getGameDurationMinutes` | function | 4131 |
| `getGameId` | function | 6150 |
| `getGlobalAllTimeSnapshot` | function | 2402 |
| `getGlobalIdentityProfile` | function | 12521 |
| `getGlobalLoadableSeasonKeys` | function | 8267 |
| `getGlobalOpponentSpecialistProfile` | function | 14598 |
| `getGlobalPlayerBestSeason` | function | 10217 |
| `getGlobalPlayerMilestones` | function | 10400 |
| `getGlobalPlayerOpponentGameRows` | function | 14569 |
| `getGlobalPlayerPeakGame` | function | 10206 |
| `getGlobalPlayerTeamRecord` | function | 10180 |
| `getGlobalProfileEvents` | function | 10153 |
| `getGlobalRookieMilestone` | function | 10389 |
| `getGlobalRookieSeasonKey` | function | 10375 |
| `getGlobalSeasonStatRows` | function | 12865 |
| `getGlobalTopScorerMilestones` | function | 10362 |
| `getGoalieComparisonAlltimeTrend` | function | 13528 |
| `getGoalieComparisonSeasonTrend` | function | 13545 |
| `getGoalieDiagnostics` | function | 4708 |
| `getGoalieDnaRows` | function | 9846 |
| `getGoalieGameIdsForPlayer` | function | 2701 |
| `getGoalieOpponentName` | function | 4007 |
| `getGoalieOpponentTier` | function | 4011 |
| `getGoalScorerFromEvent` | function | 2859 |
| `getHallGoalieData` | function | 12731 |
| `getHallOfFamePlayerIdSet` | function | 10149 |
| `getHallOfFamePlayerRows` | function | 10146 |
| `getHallOfFameStats` | function | 12391 |
| `getJerseyNumber` | function | 2798 |
| `getLineupAllRows` | function | 18321 |
| `getLineupPlayerPool` | function | 18332 |
| `getLoadedSeasonPlayerUi` | function | 10175 |
| `getLoadedSeasonPointsByName` | function | 10119 |
| `getMatchcenterDirectOpponents` | function | 15752 |
| `getMatchcenterOpponents` | function | 15719 |
| `getOppStrength` | function | 3584 |
| `getOrCreatePlayerProfile` | function | 3714 |
| `getPenaltyBasePersonalMinutes` | function | 4167 |
| `getPenaltyDisciplineMinutes` | function | 4185 |
| `getPenaltyDisciplineType` | function | 4123 |
| `getPenaltyPersonalMinutes` | function | 4175 |
| `getPenaltySpecialTeamsMinutes` | function | 4164 |
| `getPhaseIndex` | function | 4993 |
| `getPlayedUlmGames` | function | 2776 |
| `getPlayerAlltimeFieldGames` | function | 2738 |
| `getPlayerAlltimeGoalieGames` | function | 2741 |
| `getPlayerAlltimeRoleGames` | function | 2719 |
| `getPlayerAlltimeStats` | function | 9356 |
| `getPlayerAlltimeTotalGames` | function | 2744 |
| `getPlayerFieldGames` | function | 2708 |
| `getPlayerGoalieAlltimeStats` | function | 9377 |
| `getPlayerGoalieGames` | function | 2712 |
| `getPlayerGoalieSeasonStats` | function | 9372 |
| `getPlayerRegistryProfile` | function | 9364 |
| `getPlayerRoleAvailability` | function | 9407 |
| `getPlayerSeasonRoleGameSummary` | function | 2753 |
| `getPlayerSeasonStats` | function | 9351 |
| `getPlayerSourceId` | function | 2795 |
| `getPreClubHistoryPlayerNames` | function | 2514 |
| `getPreviousSeasonKey` | function | 10074 |
| `getRosterEntryRegistryProfile` | function | 10552 |
| `getRosterGameIdsForPlayer` | function | 2635 |
| `getRosterImpactPlayerEventLookup` | function | 11676 |
| `getRosterImpactPlayerGames` | function | 11747 |
| `getRosterStatus` | function | 10355 |
| `getScoreLabel` | function | 15501 |
| `getSeasonApiBaseUrl` | function | 1822 |
| `getSeasonDataPreview` | function | 6500 |
| `getSeasonDataState` | function | 22559 |
| `getSeasonIdentityProfile` | function | 10309 |
| `getSeasonmanagerRosterSuggestion` | function | 7283 |
| `getSeasonOriginBaseUrl` | function | 1842 |
| `getSeasonPlayerFieldBasis` | function | 8772 |
| `getSeasonScopedIdentityProfile` | function | 8799 |
| `getSeasonTeamGameIds` | function | 2792 |
| `getSeasonTeamGames` | function | 2788 |
| `getSeasonUiPlayerForProfile` | function | 10305 |
| `getSpecialTeamsDiagnostics` | function | 4715 |
| `getSpecialTeamsPenaltyChunks` | function | 4188 |
| `getStaticSeasonGames` | function | 5999 |
| `getStoredLastView` | function | 3419 |
| `getSyntheticLineupPlayers` | function | 18298 |
| `getSyntheticLineupRow` | function | 18301 |
| `getSyntheticLineupRows` | function | 18318 |
| `getTeamAllTimeRecords` | function | 12315 |
| `getTeamLogoUrlForStory` | function | 20302 |
| `getUlmTeamStatus` | function | 2489 |
| `getUniqueAllTimeOpponentNames` | function | 2484 |
| `globalSearchEntries` | function | 22971 |
| `globalSearchIsEditableTarget` | function | 23020 |
| `globalSearchKeyAction` | function | 23026 |
| `globalSearchMatch` | function | 23008 |
| `globalSearchMatchdayScore` | function | 22994 |
| `globalSearchOnKeydown` | function | 23121 |
| `globalSearchPlayerScore` | function | 22985 |
| `globalSearchTokens` | function | 22966 |
| `goalieApplySampleConfidence` | function | 9530 |
| `goalieBucketLooseSum` | function | 9538 |
| `goalieBucketRows` | function | 9450 |
| `goalieClampScore` | function | 9495 |
| `goalieDetailFirstTime` | function | 9474 |
| `goalieDnaKey` | function | 9755 |
| `goalieDnaValue` | function | 9760 |
| `goalieEntryRecognitionReason` | function | 2658 |
| `goalieEventAbsSeconds` | function | 3984 |
| `goalieEventSecondInPeriod` | function | 9481 |
| `goalieGameDurationSeconds` | function | 3990 |
| `goalieGameStateBeforeGoal` | function | 3995 |
| `goalieInverseScore` | function | 9499 |
| `goalieNum` | function | 9436 |
| `goaliePctText` | function | 9487 |
| `goaliePositiveCurveScore` | function | 9515 |
| `goaliePositiveScore` | function | 9507 |
| `goalieSafeNum` | function | 9491 |
| `goalieStateGoals` | function | 9767 |
| `goalieStdDev` | function | 9468 |
| `goalieTierMeta` | function | 9459 |
| `goalieTime` | function | 9442 |
| `goalieTopRow` | function | 9456 |
| `goalieWeightedScore` | function | 9524 |
| `goToMainNavPoint` | window | 22276 |
| `hallGoalieExplainForLabel` | function | 12768 |
| `hallGoalieNameHtml` | function | 12747 |
| `hallGoalieNum` | function | 12633 |
| `hallGoaliePkStats` | function | 12659 |
| `hallGoalieRowFromStats` | function | 12698 |
| `hallGoalieSeasonLabel` | function | 12647 |
| `hallGoalieSeasonScore` | function | 12678 |
| `hallGoalieTime` | function | 12639 |
| `hallGoalieTooltip` | function | 12764 |
| `hallGoalieTopteamStats` | function | 12671 |
| `handleComparisonDuoSearchKey` | window | 13219 |
| `hasEmbeddedSeasonData` | function | 8264 |
| `hashSegmentToSeasonKey` | function | 3126 |
| `hasSeasonRole` | function | 5377 |
| `hasSeasonSource` | function | 8260 |
| `hofIntroDelay` | function | 8416 |
| `identityClutchGoalsVsTeams` | function | 5258 |
| `identityDecisiveGoalsVsTeams` | function | 5261 |
| `identityGoalsVsTeams` | function | 5255 |
| `identityInputs` | function | 5292 |
| `identityLateGoalsVsTeams` | function | 5264 |
| `identityOpponentGroups` | function | 5220 |
| `identityPartnerStats` | function | 5206 |
| `identityPointsVsTeams` | function | 5252 |
| `incGoalieBucket` | function | 3980 |
| `incrementUniqueCounter` | function | 3669 |
| `initGlobalSearch` | function | 23143 |
| `initHashRouting` | function | 3550 |
| `initToolMenu` | function | 23241 |
| `invalidateGlobalIdentityCache` | function | 2227 |
| `isActiveAlltimeSeasonStats` | function | 10324 |
| `isComebackRelevantGoal` | function | 5248 |
| `isDecisiveGoal` | function | 5240 |
| `isEinsatzCenterGameFromDraft` | function | 6878 |
| `isExcludedGoalieAppearance` | function | 2668 |
| `isFieldAppearance` | function | 2688 |
| `isGamePlayed` | function | 2985 |
| `isGoalieAppearance` | function | 2682 |
| `isGoalieRosterEntry` | function | 2644 |
| `isHallOfFameEligiblePlayer` | function | 10140 |
| `isHallRowPureSG` | function | 12648 |
| `isImportantClutchGoal` | function | 5235 |
| `isLateGoal` | function | 5243 |
| `isMatchPenaltyEvent` | function | 4115 |
| `isNewSeasonDataState` | function | 22580 |
| `isPenaltyGoalEvent` | function | 4198 |
| `isPreClubHistoryPlayerName` | function | 2517 |
| `isPureSGPlayer` | function | 9337 |
| `isRookieCandidateForSeason` | function | 10109 |
| `isSameUlmTeamContext` | function | 4144 |
| `isSeasonDataPreviewStale` | function | 6508 |
| `isSgOnlyAlltimePlayer` | function | 9329 |
| `isSgOnlyHallOfFameExcluded` | function | 10131 |
| `isSyntheticLineupPlayerId` | function | 18295 |
| `isToolMenuOpen` | function | 23179 |
| `isTwoPlusTwoPenaltyEvent` | function | 4119 |
| `isUsableExternalSeasonData` | function | 6083 |
| `isValidAsOfDate` | function | 3130 |
| `isValidAsOfStartTime` | function | 3133 |
| `isVisibleSecondaryTrait` | function | 8674 |
| `kpiBadge` | function | 13923 |
| `kpiDelta` | function | 13656 |
| `kpiItemColor` | function | 13662 |
| `kpiNiceMax` | function | 13813 |
| `kpiRadarValue` | function | 13736 |
| `kpiTrendRows` | function | 13819 |
| `kpiValueText` | function | 13652 |
| `lexiconEntry` | function | 15307 |
| `lexiconUniqueKeys` | function | 15299 |
| `lineupAverage` | function | 18347 |
| `lineupBuilderPoolIds` | function | 2284 |
| `lineupCombinationIds` | function | 18824 |
| `lineupDirectChemistryScore` | function | 18868 |
| `lineupEvaluateComplementCandidate` | function | 18875 |
| `lineupGroupDisplayName` | function | 6787 |
| `lineupLevelLabel` | function | 18351 |
| `lineupOpponentDNAForContext` | function | 18448 |
| `lineupPlayerAnchorConfidence` | function | 18974 |
| `lineupPlayerAnchorScore` | function | 18954 |
| `lineupPlayerProfile` | function | 18552 |
| `lineupRankCandidateIds` | function | 18809 |
| `lineupRecommendationReason` | function | 19050 |
| `lineupRoleDnaComplementScore` | function | 18844 |
| `lineupRosterGamesForPlayer` | function | 18357 |
| `lineupRowMap` | function | 18806 |
| `lineupRowMeta` | function | 18324 |
| `lineupScore` | function | 18341 |
| `lineupStdDev` | function | 18838 |
| `linkUiPlayersToRegistry` | function | 3801 |
| `loadEinsatzCenterMismatchedAutosave` | function | 7198 |
| `loadSeason` | function | 8340 |
| `loadSeasonData` | function | 7783 |
| `loadSeasonForGlobal` | function | 8292 |
| `loadSeasonManifest` | function | 6014 |
| `mainNavActiveKeyForPage` | function | 22270 |
| `markFieldRoleAppearance` | function | 3776 |
| `matchcenterAddDuoConnection` | function | 16159 |
| `matchcenterAddPlanItem` | function | 17376 |
| `matchcenterAddPlanWatch` | function | 17382 |
| `matchcenterAddUlmDuoConnection` | function | 16310 |
| `matchcenterAddUlmScoring` | function | 15940 |
| `matchcenterAnalyzeDirect` | function | 15785 |
| `matchcenterAnalyzeForm` | function | 15822 |
| `matchcenterBuildCoachActivationHints` | function | 18092 |
| `matchcenterBuildCoachAvoidList` | function | 18082 |
| `matchcenterBuildCoachDangerPatterns` | function | 18064 |
| `matchcenterBuildCoachHints` | function | 17820 |
| `matchcenterBuildCoachIfThen` | function | 18072 |
| `matchcenterBuildCoachKeyActors` | function | 18099 |
| `matchcenterBuildCoachLevers` | function | 18054 |
| `matchcenterBuildCoachPriorities` | function | 18047 |
| `matchcenterBuildGoalieMatchup` | function | 16511 |
| `matchcenterBuildInsights` | function | 16798 |
| `matchcenterBuildIntelHeadline` | function | 17836 |
| `matchcenterBuildIntelligenceDataQuality` | function | 17471 |
| `matchcenterBuildIntelligenceSignals` | function | 17857 |
| `matchcenterBuildIntelListFromPlan` | function | 17811 |
| `matchcenterBuildMatchPlan` | function | 19169 |
| `matchcenterBuildOneThingToWatch` | function | 17844 |
| `matchcenterBuildOpponentAlarm` | function | 17701 |
| `matchcenterBuildOpponentDNA` | function | 17522 |
| `matchcenterBuildOpponentDuoInsights` | function | 16258 |
| `matchcenterBuildOpponentDuos` | function | 16213 |
| `matchcenterBuildPlanConfidence` | function | 17388 |
| `matchcenterBuildSpecialTeamsMatchup` | function | 16441 |
| `matchcenterBuildTimingAnalysis` | function | 16637 |
| `matchcenterBuildTimingInsights` | function | 16626 |
| `matchcenterBuildUlmDuoInsights` | function | 16408 |
| `matchcenterBuildUlmDuos` | function | 16365 |
| `matchcenterBuildUlmPlayerInsights` | function | 16102 |
| `matchcenterBuildUlmPlayerScouting` | function | 16047 |
| `matchcenterClassifyUlmGoalEvent` | function | 15929 |
| `matchcenterCoachAdd` | function | 17984 |
| `matchcenterCoachCautious` | function | 17981 |
| `matchcenterCoachGameModel` | function | 17993 |
| `matchcenterCoachPriorityFromAlarm` | function | 18037 |
| `matchcenterConfidenceClass` | function | 17363 |
| `matchcenterDateLabel` | function | 15661 |
| `matchcenterDefaultSeasonKey` | function | 15699 |
| `matchcenterDeriveOpponentType` | function | 17635 |
| `matchcenterDirectContextGames` | function | 16421 |
| `matchcenterDuoDirectionLabel` | function | 16152 |
| `matchcenterDuoPairKey` | function | 16115 |
| `matchcenterEmptyBuckets` | function | 15870 |
| `matchcenterEmptyTimingStats` | function | 16573 |
| `matchcenterEnsureOpponentDuo` | function | 16119 |
| `matchcenterEnsureUlmDuo` | function | 16272 |
| `matchcenterEnsureUlmPlayer` | function | 15878 |
| `matchcenterFinalizeOpponentDuos` | function | 16178 |
| `matchcenterFinalizeUlmDuos` | function | 16329 |
| `matchcenterFinalizeUlmPlayers` | function | 15978 |
| `matchcenterFormLine` | function | 16793 |
| `matchcenterGameLine` | function | 16787 |
| `matchcenterGoalAbsSeconds` | function | 16557 |
| `matchcenterGoalieFitScore` | function | 16494 |
| `matchcenterGoalieKey` | function | 16489 |
| `matchcenterGoalMinute` | function | 15856 |
| `matchcenterInferPriority` | function | 17369 |
| `matchcenterIntelAddAlarm` | function | 17680 |
| `matchcenterIntelCurve` | function | 17423 |
| `matchcenterIntelDataLabel` | function | 17468 |
| `matchcenterIntelDuoRef` | function | 17666 |
| `matchcenterIntelInverseCurve` | function | 17429 |
| `matchcenterIntelPct` | function | 17448 |
| `matchcenterIntelPlayerRef` | function | 17653 |
| `matchcenterIntelPriorityClass` | function | 17458 |
| `matchcenterIntelPriorityFromScore` | function | 17452 |
| `matchcenterIntelPriorityLabel` | function | 17464 |
| `matchcenterIntelRate` | function | 17444 |
| `matchcenterIntelWeighted` | function | 17433 |
| `matchcenterIsFreiburgTuebingenTeamName` | function | 15686 |
| `matchcenterOpponentMode` | function | 15716 |
| `matchcenterPct` | function | 16437 |
| `matchcenterPersonalPenaltyMinutesForSide` | function | 16428 |
| `matchcenterPlanRateText` | function | 17355 |
| `matchcenterPlanScoreText` | function | 17351 |
| `matchcenterPriorityLabel` | function | 17360 |
| `matchcenterRegisterUlmProfileGame` | function | 15916 |
| `matchcenterResultClass` | function | 16778 |
| `matchcenterSeasonHasGames` | function | 15696 |
| `matchcenterSigned` | function | 15655 |
| `matchcenterSocialAdd` | function | 18161 |
| `matchcenterSocialCaption` | function | 18168 |
| `matchcenterSpecialTeamsForGame` | function | 16424 |
| `matchcenterStoryAddCandidate` | function | 20406 |
| `matchcenterStoryAddFact` | function | 20387 |
| `matchcenterStoryBestClutchDuo` | function | 20631 |
| `matchcenterStoryBestClutchPlayer` | function | 20587 |
| `matchcenterStoryCandidateForBudget` | function | 20444 |
| `matchcenterStoryCategoryForPlanFact` | function | 20716 |
| `matchcenterStoryCategoryLimit` | function | 20429 |
| `matchcenterStoryClutchFact` | function | 20564 |
| `matchcenterStoryClutchPriority` | function | 20665 |
| `matchcenterStoryCompetitionLabel` | function | 20668 |
| `matchcenterStoryCurrentStreak` | function | 20511 |
| `matchcenterStoryDirectFactCandidates` | function | 20681 |
| `matchcenterStoryDownloadFileName` | function | 19637 |
| `matchcenterStoryDuoClutchFact` | function | 20641 |
| `matchcenterStoryDuoClutchTotal` | function | 20623 |
| `matchcenterStoryDuoFact` | function | 20644 |
| `matchcenterStoryEstimateFactWeight` | function | 20400 |
| `matchcenterStoryFactKey` | function | 20394 |
| `matchcenterStoryFormFact` | function | 20529 |
| `matchcenterStoryFormFactCandidates` | function | 20540 |
| `matchcenterStoryInlineStat` | function | 20369 |
| `matchcenterStoryLastDuelLabel` | function | 20677 |
| `matchcenterStoryLateGoalsForOutcome` | function | 20560 |
| `matchcenterStoryLogoBase` | function | 20281 |
| `matchcenterStoryLogoForOpponent` | function | 20332 |
| `matchcenterStoryLooksArtificial` | function | 20397 |
| `matchcenterStoryNameClass` | function | 20837 |
| `matchcenterStoryNormalizePickOptions` | function | 20433 |
| `matchcenterStoryPickFactItems` | function | 20454 |
| `matchcenterStoryPickFacts` | function | 20507 |
| `matchcenterStoryPlanFactCandidates` | function | 20703 |
| `matchcenterStoryPlayerClutchFact` | function | 20597 |
| `matchcenterStoryPlayerClutchTotal` | function | 20579 |
| `matchcenterStoryRankRows` | function | 20373 |
| `matchcenterStoryRankText` | function | 20365 |
| `matchcenterStorySafeLogoUrl` | function | 20287 |
| `matchcenterStoryShortDuel` | function | 20672 |
| `matchcenterStoryTableRank` | function | 20347 |
| `matchcenterStoryUlmTableRank` | function | 20358 |
| `matchcenterStoryVisibleFacts` | function | 20843 |
| `matchcenterStoryWinlessStreak` | function | 20520 |
| `matchcenterTimeValue` | function | 16565 |
| `matchcenterTimingStatsForGames` | function | 16589 |
| `matchcenterUlmScoutingConfidence` | function | 15873 |
| `matchcenterUlmTeamLabelForGame` | function | 16782 |
| `matchcenterUpdateUlmSeasonRow` | function | 15922 |
| `matchcenterWindowForSecond` | function | 16582 |
| `matchdayFixtureCardHtml` | function | 22421 |
| `matchdayGameCardHtml` | function | 22402 |
| `matchdayUlmGames` | function | 22399 |
| `medianOrNull` | function | 3974 |
| `mergeDuoSet` | function | 4804 |
| `mergeGoalieSpecialTeamsStats` | function | 4436 |
| `mergeSpecialTeamsStats` | function | 4080 |
| `moveGlobalSearch` | function | 23105 |
| `normalizeAssistPlayerName` | function | 2862 |
| `normalizeComparisonItem` | function | 12931 |
| `normalizeDuoComparisonItem` | function | 13175 |
| `normalizeEventPlayerRef` | function | 2801 |
| `normalizeLineupLines` | function | 2287 |
| `normalizePlayerName` | function | 2504 |
| `normalizeSecondaryTraits` | function | 5351 |
| `onGlobalSearchInput` | window | 23099 |
| `openAllTimePlayers` | window | 8408 |
| `openComparisonCenter` | window | 8578 |
| `openDuoProPicker` | window | 11515 |
| `openEinsatzCenter` | window | 6738 |
| `openGlobalSearch` | window | 23066 |
| `openHallOfFame` | window | 8554 |
| `openLexicon` | window | 8651 |
| `openLigaGegner` | window | 22823 |
| `openLineupBuilder` | window | 8629 |
| `openMatchcenter` | window | 8607 |
| `openMatchcenterStoryPreview` | window | 2240 |
| `openMatchday` | window | 22381 |
| `openMatchdayTimeline` | window | 22373 |
| `openOverview` | window | 22322 |
| `openSeason` | window | 8405 |
| `openToolMenu` | window | 23183 |
| `overviewCompactTableHtml` | function | 22650 |
| `overviewCrossSeasonTrendHtml` | function | 22699 |
| `overviewFormHtml` | function | 22658 |
| `overviewLastMatchdayText` | function | 22616 |
| `overviewLineupLinkHtml` | function | 22716 |
| `overviewMatchcenterLinkHtml` | function | 22713 |
| `overviewMatchdayEndMs` | function | 22521 |
| `overviewMatchdayStartMs` | function | 22515 |
| `overviewNextMatchdayHtml` | function | 22626 |
| `overviewOpponentLabel` | function | 22604 |
| `overviewOpponentPreviewHtml` | function | 22708 |
| `overviewRankChangeTile` | function | 22735 |
| `overviewRecordHtml` | function | 22692 |
| `overviewSeasonAwardHtml` | function | 22681 |
| `overviewSeasonBilanzHtml` | function | 22673 |
| `p1NarrativeKey` | function | 15575 |
| `paintGlobalSearchResults` | function | 23058 |
| `parseAppHash` | function | 3233 |
| `parseAsOfQueryValue` | function | 3272 |
| `parseComparisonVariant` | function | 13096 |
| `parseLastViewState` | function | 3407 |
| `parseSeasonDataState` | function | 22570 |
| `pct` | function | 5159 |
| `pctValue` | function | 12571 |
| `pdashBestPhase` | function | 14209 |
| `pdashInsight` | function | 14247 |
| `pdashInsights` | function | 14250 |
| `pdashNum` | function | 14193 |
| `pdashOpponentStrength` | function | 14227 |
| `pdashOpponentTier` | function | 14221 |
| `pdashPct` | function | 14197 |
| `pdashPhaseLabel` | function | 14201 |
| `pdashTopCount` | function | 14205 |
| `pdashTopOpponent` | function | 14217 |
| `pdashTopPartner` | function | 14213 |
| `penaltyRawText` | function | 4112 |
| `playerAppearedForUlmStatusInSeasonByName` | function | 10090 |
| `playerAppearedInSeasonByName` | function | 10079 |
| `playerExplainAdd` | function | 14883 |
| `playerExplainConfidence` | function | 14874 |
| `playerExplainConfidenceLabel` | function | 14880 |
| `playerExplainContextSentence` | function | 14919 |
| `playerExplainHeadline` | function | 14909 |
| `playerExplainRolePhrase` | function | 14900 |
| `playerExplainStyleSignature` | function | 14888 |
| `processGame` | function | 2926 |
| `rAlltimeKpis` | function | 12887 |
| `rAlltimePlayerDashboard` | function | 14402 |
| `rAllTimePlayersPage` | function | 15164 |
| `rankNarratives` | function | 15597 |
| `rAntiSynergyCompareChip` | function | 11910 |
| `rAntiSynergyDelta` | function | 11894 |
| `rAntiSynergyMainDelta` | function | 11957 |
| `rAntiSynergyMetricRow` | function | 11918 |
| `rAntiSynergyWinrateRow` | function | 11940 |
| `rAntiSynergyWinrateText` | function | 11934 |
| `rAsOfSelector` | function | 22844 |
| `ratio01` | function | 5160 |
| `rAvgResponseTimeNote` | function | 12191 |
| `rCarryPerformanceRows` | function | 10251 |
| `rClassicRoleTags` | function | 8760 |
| `rClassicTagTip` | function | 8698 |
| `rClutch` | function | 8966 |
| `rClutchBadge` | function | 8660 |
| `rComparisonCenterPage` | function | 14072 |
| `rComparisonDashboard` | function | 14023 |
| `rComparisonDuoSearchBox` | function | 13405 |
| `rComparisonDuoSuggestionButtons` | function | 13198 |
| `rComparisonMiniOverview` | function | 14011 |
| `rComparisonModeSelect` | function | 13426 |
| `rComparisonRoles` | function | 14015 |
| `rComparisonStyles` | function | 14034 |
| `rContextBar` | function | 22927 |
| `rDifficultConnectionList` | function | 11967 |
| `rDifficultConnectionListCompact` | function | 12034 |
| `rDifficultConnectionListCompactLegacy` | function | 11992 |
| `rDifficultConnectionsCard` | function | 12073 |
| `rDuoCenterPro` | function | 11357 |
| `rDuoCompareSummaryCards` | function | 13284 |
| `rDuoComparisonBars` | function | 13279 |
| `rDuoComparisonChemistry` | function | 13337 |
| `rDuoComparisonContext` | function | 13369 |
| `rDuoComparisonDashboard` | function | 13391 |
| `rDuoComparisonDetails` | function | 13387 |
| `rDuoComparisonImpact` | function | 13353 |
| `rDuoComparisonPage` | function | 13415 |
| `rDuoComparisonProfile` | function | 13315 |
| `rDuoProPlayerSelect` | function | 11544 |
| `rDuoResponseMomentumCard` | function | 12249 |
| `rDuoRows` | function | 10510 |
| `recommendLineComplements` | function | 19141 |
| `recordOverviewVisit` | function | 22589 |
| `registerPlayerIdentity` | function | 3748 |
| `registerSeasonRosters` | function | 3781 |
| `rEinsatzCenterAutosaveBanner` | function | 7160 |
| `rEinsatzCenterCombo` | function | 6683 |
| `rEinsatzCenterComboEditor` | function | 7388 |
| `rEinsatzCenterDraftBanner` | function | 6901 |
| `rEinsatzCenterDraftMark` | function | 6887 |
| `rEinsatzCenterDraftStatsHint` | function | 6891 |
| `rEinsatzCenterEditPage` | function | 7488 |
| `rEinsatzCenterGameCard` | function | 6692 |
| `rEinsatzCenterGameEditor` | function | 7435 |
| `rEinsatzCenterGroup` | function | 6670 |
| `rEinsatzCenterGroupEditor` | function | 7357 |
| `rEinsatzCenterPage` | function | 6711 |
| `rEinsatzCenterRosterSuggestionCard` | function | 7404 |
| `rEinsatzCenterStats` | function | 6793 |
| `relative01` | function | 5161 |
| `removeComparisonDuo` | window | 13249 |
| `removeComparisonItem` | window | 13161 |
| `removeEinsatzCenterCombo` | window | 7725 |
| `removeEinsatzCenterGroup` | window | 7639 |
| `removeEinsatzCenterGroupPlayer` | window | 7689 |
| `removeEinsatzCenterRosterPlayer` | window | 7570 |
| `removeLineupBuilderPlayerFromLine` | window | 2334 |
| `removeLineupPlayer` | window | 2275 |
| `rEmptyState` | function | 15623 |
| `renameEinsatzCenterGroup` | window | 7661 |
| `render` | function | 21607 |
| `renderComparisonDuoSuggestions` | function | 13202 |
| `renderTags` | function | 8768 |
| `repairRenderedMojibake` | function | 2450 |
| `resetPlayerRegistrySeason` | function | 3693 |
| `resolveAssistPlayer` | function | 2907 |
| `resolveCurrentSeasonKey` | function | 6046 |
| `resolveGoalScorerPlayer` | function | 2844 |
| `resolveLineupPlayerName` | function | 6655 |
| `resolvePlayerRoleView` | function | 9421 |
| `resolveRosterPlayerByRef` | function | 2813 |
| `responseExcerpt` | function | 5883 |
| `responseMomentumAbsSeconds` | function | 10689 |
| `responseMomentumActor` | function | 10718 |
| `responseMomentumConfidence` | function | 10838 |
| `responseMomentumEmptyState` | function | 10843 |
| `responseMomentumGameRows` | function | 10702 |
| `responseMomentumGoalActors` | function | 10729 |
| `responseMomentumPairKey` | function | 10851 |
| `responseMomentumSide` | function | 10709 |
| `responseMomentumTime` | function | 10695 |
| `responseMomentumTooltipFor` | function | 12154 |
| `restoreEinsatzCenterAutosave` | function | 7134 |
| `restoreHallOfFameIntroPrevious` | function | 8496 |
| `resultGoalsAgainstForSide` | function | 4016 |
| `returnToEinsatzCenterEdit` | window | 7556 |
| `rGlobalAllTimeStats` | function | 14510 |
| `rGlobalCareerHeader` | function | 14419 |
| `rGlobalDevelopment` | function | 14528 |
| `rGlobalDnaBars` | function | 14163 |
| `rGlobalDuoNetwork` | function | 14628 |
| `rGlobalOpponentSpecialist` | function | 14827 |
| `rGlobalOverview` | function | 14457 |
| `rGlobalPartnerOpponentPanel` | function | 14405 |
| `rGlobalProfileTags` | function | 12562 |
| `rGlobalSearchPanelHtml` | function | 23055 |
| `rGlobalSearchResultsHtml` | function | 23044 |
| `rGlobalSearchToggle` | function | 23041 |
| `rGoalieAnalysis` | function | 10047 |
| `rGoalieBars` | function | 9704 |
| `rGoalieDnaBars` | function | 9850 |
| `rGoalieFirstGoalResistance` | function | 9887 |
| `rGoalieInsights` | function | 9960 |
| `rGoalieKpis` | function | 9864 |
| `rGoalieMiniMetrics` | function | 9881 |
| `rGoalieMomentum` | function | 9901 |
| `rGoalieOpponents` | function | 10002 |
| `rGoalieOverview` | function | 9982 |
| `rGoaliePhaseProfile` | function | 9943 |
| `rGoaliePhases` | function | 9999 |
| `rGoalieRoleTraits` | function | 9842 |
| `rGoalieStability` | function | 10014 |
| `rGoalieTable` | function | 10039 |
| `rGoalieTierCards` | function | 9915 |
| `rHallDuoTemple` | function | 12624 |
| `rHallGoalieAwardCards` | function | 12815 |
| `rHallGoalieLegends` | function | 12832 |
| `rHallGoalieRankCard` | function | 12783 |
| `rHallOfFameHero` | function | 12575 |
| `rHallOfFamePage` | function | 15206 |
| `rHallPodiumList` | function | 12601 |
| `rHallSGBadge` | function | 12656 |
| `rIaShell` | function | 22947 |
| `rIdentityCards` | function | 8734 |
| `rIdentityTags` | function | 8714 |
| `rInsights` | function | 9227 |
| `rInteractiveDuoCenterPro` | function | 11551 |
| `rKpiCards` | function | 13665 |
| `rKpiExtendedMetrics` | function | 13798 |
| `rKpiInfoCards` | function | 13933 |
| `rKpiMetricCard` | function | 13790 |
| `rKpiMirrorRows` | function | 13676 |
| `rKpiObjectMini` | function | 13926 |
| `rKpiOpponentStrength` | function | 13895 |
| `rKpiRadar` | function | 13747 |
| `rKpiShareBars` | function | 13782 |
| `rKpiTextMetricCard` | function | 13795 |
| `rKpiTrendCompare` | function | 13828 |
| `rKPIVergleich` | function | 13997 |
| `rLexiconPage` | function | 15321 |
| `rLexiconRows` | function | 15317 |
| `rLigaGegnerPlaceholderPage` | function | 22827 |
| `rLineupBuilderAvailablePanel` | function | 20003 |
| `rLineupBuilderPage` | function | 20179 |
| `rLineupComplementCards` | function | 20100 |
| `rLineupMetricPills` | function | 19989 |
| `rLineupRecommendationCards` | function | 20051 |
| `rLineupRecommendationMode` | function | 20066 |
| `rLineupScoreRows` | function | 19885 |
| `rLineupSimpleCards` | function | 19907 |
| `rLineupTestLine` | function | 20113 |
| `rLineupTestMode` | function | 20162 |
| `rMainNav` | function | 22283 |
| `rMainNavBottom` | function | 22305 |
| `rMatchcenterCoachCardList` | function | 19464 |
| `rMatchcenterCoachIfThen` | function | 19478 |
| `rMatchcenterCoachSimpleList` | function | 19486 |
| `rMatchcenterCopyButton` | function | 19556 |
| `rMatchcenterDetailsSection` | function | 16770 |
| `rMatchcenterDigitalCoach` | function | 19491 |
| `rMatchcenterDuoRankCard` | function | 17089 |
| `rMatchcenterDuoRow` | function | 17065 |
| `rMatchcenterDuosTab` | function | 17236 |
| `rMatchcenterDuoWatchCard` | function | 17045 |
| `rMatchcenterFormCard` | function | 16826 |
| `rMatchcenterFormSection` | function | 16744 |
| `rMatchcenterGamesList` | function | 16847 |
| `rMatchcenterGoalieCard` | function | 17298 |
| `rMatchcenterGoalieMatchup` | function | 17322 |
| `rMatchcenterIntelCoachHints` | function | 19450 |
| `rMatchcenterIntelOverview` | function | 19404 |
| `rMatchcenterKpi` | function | 16819 |
| `rMatchcenterLineupBuilder` | function | 19916 |
| `rMatchcenterLockerList` | function | 19561 |
| `rMatchcenterLockerRoomSheet` | function | 19573 |
| `rMatchcenterMatchPlan` | function | 20258 |
| `rMatchcenterOpponentAlarm` | function | 19382 |
| `rMatchcenterOpponentDNA` | function | 19349 |
| `rMatchcenterOpponentDuos` | function | 17193 |
| `rMatchcenterOpponentScouting` | function | 17006 |
| `rMatchcenterPage` | function | 21089 |
| `rMatchcenterPlanItems` | function | 19315 |
| `rMatchcenterPlanWatch` | function | 19333 |
| `rMatchcenterPlayerRow` | function | 16880 |
| `rMatchcenterPlayersTab` | function | 17042 |
| `rMatchcenterProfileSection` | function | 16724 |
| `rMatchcenterRankCard` | function | 16904 |
| `rMatchcenterResponseMomentum` | function | 12276 |
| `rMatchcenterScoutingSummary` | function | 20214 |
| `rMatchcenterSocialBlock` | function | 19629 |
| `rMatchcenterSocialMediaCenter` | function | 19831 |
| `rMatchcenterSpecialCard` | function | 17239 |
| `rMatchcenterSpecialTeams` | function | 17248 |
| `rMatchcenterStoryForm` | function | 20879 |
| `rMatchcenterStoryFrame` | function | 20962 |
| `rMatchcenterStoryLogo` | function | 20874 |
| `rMatchcenterStoryPlayerCard` | function | 20884 |
| `rMatchcenterStoryPreview` | function | 20892 |
| `rMatchcenterTabs` | function | 16721 |
| `rMatchcenterTimeBars` | function | 16648 |
| `rMatchcenterTiming` | function | 16682 |
| `rMatchcenterTimingStatsCard` | function | 16662 |
| `rMatchcenterUlmDuoRankCard` | function | 17144 |
| `rMatchcenterUlmDuoRow` | function | 17121 |
| `rMatchcenterUlmDuos` | function | 17150 |
| `rMatchcenterUlmDuoWatchCard` | function | 17095 |
| `rMatchcenterUlmImpactCard` | function | 16910 |
| `rMatchcenterUlmPlayerRow` | function | 16939 |
| `rMatchcenterUlmRankCard` | function | 16963 |
| `rMatchcenterUlmScouting` | function | 16969 |
| `rMatchcenterWatchCard` | function | 16859 |
| `rMatchdayDetailPage` | function | 22450 |
| `rMatchdayPage` | function | 22490 |
| `rMatchdayTimelinePage` | function | 22439 |
| `rMatchdayTimelineRow` | function | 22431 |
| `rMatrix` | function | 8839 |
| `rmTerm` | function | 12161 |
| `roleGameStableKey` | function | 2716 |
| `roleTraitLabel` | function | 8671 |
| `rOppBreakdown` | function | 9131 |
| `rOpponentIntelBars` | function | 10474 |
| `rOpponentTopScorerTable` | function | 12415 |
| `rosterImpactConfidence` | function | 11789 |
| `rosterImpactConfidenceWeight` | function | 11803 |
| `rosterPlayerMatches` | function | 2620 |
| `rOverviewPage` | function | 22811 |
| `rPdashLabel` | function | 14354 |
| `rPdashStat` | function | 14357 |
| `rPenalties` | function | 9112 |
| `rPhases` | function | 8896 |
| `rPlayerDash` | function | 14360 |
| `rPlayerDashStyles` | function | 14342 |
| `rPlayerExplainItems` | function | 15106 |
| `rPlayerExplanation` | function | 15111 |
| `rPlayerResponseMomentumCard` | function | 12230 |
| `rPlayerRoleSwitch` | function | 9429 |
| `rRadar` | function | 8916 |
| `rRes` | const-arrow | 8659 |
| `rResponseMomentumOverviewCard` | function | 12206 |
| `rResponseRateDisplay` | function | 12170 |
| `rRmKpi` | function | 12177 |
| `rRmTopList` | function | 12195 |
| `rRoleTraitTip` | function | 8678 |
| `rRosterImpactStatLine` | function | 11949 |
| `rRosterStatusBadge` | function | 8687 |
| `rScoreBreakdown` | function | 15637 |
| `rSeasonDataPreviewCard` | function | 6527 |
| `rSeasonDataPreviewContextHint` | function | 22879 |
| `rSeasonDataPreviewRows` | function | 6517 |
| `rSeasonDataPreviewStatus` | function | 6514 |
| `rSeasonDataStateContextHint` | function | 22896 |
| `rSeasonDuoCenterPro` | function | 11607 |
| `rSeasonDuoSummary` | function | 8886 |
| `rSeasonInsightsTab` | function | 9212 |
| `rSeasonLandingPage` | function | 14441 |
| `rSeasonPlayerDashboard` | function | 14399 |
| `rSeasonProfileKpis` | function | 8811 |
| `rSeasonProfileTagStrip` | function | 8832 |
| `rSeasonTrendRows` | function | 14123 |
| `rSocialVideoBlock` | function | 19698 |
| `rSparkline` | function | 12901 |
| `rStyleMetricTip` | function | 8683 |
| `rStyleProfileBars` | function | 8723 |
| `rTable` | function | 9281 |
| `rTeamPage` | function | 21238 |
| `rTeamResponseMomentumCard` | function | 12269 |
| `rTimeline` | function | 9001 |
| `rToolMenu` | function | 23169 |
| `runComparison` | window | 13166 |
| `runDuoComparison` | window | 13254 |
| `saveLastView` | function | 3424 |
| `scoreNarrative` | function | 15578 |
| `seasonApiUrl` | function | 1839 |
| `seasonDataPreviewRerender` | function | 6373 |
| `seasonDataPreviewRow` | function | 6377 |
| `seasonGameApiUrls` | function | 1857 |
| `seasonGameHtmlUrls` | function | 1867 |
| `seasonHasPureUlmTeam` | function | 10124 |
| `seasonKeyToHashSegment` | function | 3123 |
| `seasonPathPrefix` | function | 1851 |
| `seasonRoleKeysForPlayer` | function | 5368 |
| `seasonRoleTraitsFromClassic` | function | 5363 |
| `seasonStatNumber` | function | 10314 |
| `seasonStatSetSize` | function | 10318 |
| `seedHallOfFameIntroParticles` | function | 8463 |
| `selectAllLineupAvailable` | window | 2321 |
| `selectComparisonDuoSuggestion` | window | 13212 |
| `selectComparisonMode` | window | 13173 |
| `selectComparisonPlayer` | window | 13130 |
| `selectDuoProQuick` | window | 11517 |
| `selectEinsatzCenterEditGame` | window | 7558 |
| `selectEnforcerKeys` | function | 5380 |
| `serializeFieldRoleSeasonStats` | function | 3897 |
| `serializeGoalieSeasonStats` | function | 3875 |
| `serializeSeasonStats` | function | 3862 |
| `serializeSpecialTeamsStats` | function | 4077 |
| `setAntiSynergyView` | window | 2367 |
| `setComparisonDuoMode` | window | 13183 |
| `setComparisonDuoPlayer` | window | 13232 |
| `setComparisonDuoSearch` | window | 13185 |
| `setComparisonDuoSeasonKey` | window | 13184 |
| `setComparisonRoleMode` | window | 13136 |
| `setComparisonVariant` | window | 13141 |
| `setContextAsOf` | window | 22857 |
| `setDuoProPickerState` | function | 11486 |
| `setDuoProSelection` | window | 11536 |
| `setEinsatzCenterGameNote` | window | 7732 |
| `setEinsatzCenterGroupPlayerPosition` | window | 7697 |
| `setEinsatzCenterIncludeDraft` | window | 7557 |
| `setEinsatzCenterSeason` | window | 6732 |
| `setGlobalPlayer` | window | 2393 |
| `setGlobalPlayerDuo` | window | 2394 |
| `setGlobalTab` | window | 2395 |
| `setGoalieTab` | window | 2234 |
| `setLineupActiveLine` | window | 2306 |
| `setLineupBuilderMode` | window | 2305 |
| `setLineupBuilderOpponent` | window | 2304 |
| `setLineupBuilderSeason` | window | 2292 |
| `setLineupNewPlayerProfile` | window | 2348 |
| `setMatchcenterContext` | window | 8648 |
| `setMatchcenterOpponent` | window | 8647 |
| `setMatchcenterSeason` | window | 8649 |
| `setMatchcenterTab` | window | 2239 |
| `setP` | window | 2231 |
| `setPage` | window | 2377 |
| `setPlayerRoleView` | window | 2233 |
| `setSeasonDataPreviewOpen` | window | 6563 |
| `setSeasonDataPreviewPasteText` | window | 6564 |
| `setState` | const-arrow | 2219 |
| `setTab` | window | 2232 |
| `showLineupComplements` | window | 2347 |
| `showMainShell` | function | 8255 |
| `socialDuoFocusLine` | function | 18191 |
| `socialEnsurePeriod` | function | 18177 |
| `socialFirstUseful` | function | 18181 |
| `socialKeyFactLine` | function | 18201 |
| `socialOpponentLine` | function | 18197 |
| `socialPlayerFocusLine` | function | 18184 |
| `socialSentence` | function | 18174 |
| `socialVideoJobsForMatchday` | function | 19732 |
| `specialTeamsStateFromActive` | function | 4203 |
| `stageSeasonDataPreview` | function | 6423 |
| `stageSeasonDataPreviewFromFile` | function | 6475 |
| `stageSeasonDataPreviewFromPaste` | function | 6489 |
| `startApp` | window | 8393 |
| `startEinsatzCenterDraftMode` | window | 7538 |
| `startHallOfFameIntro` | function | 8516 |
| `sumRoleGames` | function | 9401 |
| `switchMatchdaySeason` | window | 22392 |
| `switchOverviewSeason` | window | 22339 |
| `syncHashFromState` | function | 3366 |
| `t2s` | const-arrow | 2915 |
| `toggleAntiSynergyHideSgOnly` | window | 2369 |
| `toggleAntiSynergyShowAll` | window | 2368 |
| `toggleComparisonPicker` | window | 13160 |
| `toggleComparisonSgOnly` | window | 13145 |
| `toggleEinsatzCenterComboPlayer` | window | 7706 |
| `toggleEinsatzCenterGroupRename` | window | 7647 |
| `toggleEinsatzCenterRosterSuggestionPlayer` | window | 7578 |
| `toggleHallOfFamePureSGPlayers` | window | 2242 |
| `toggleLineupBuilderAvailable` | window | 2307 |
| `toggleMatchcenterDuoDetails` | window | 2238 |
| `toggleMatchcenterGames` | window | 8650 |
| `toggleMatchcenterPlayerDetails` | window | 2237 |
| `toggleMatchcenterSpecialTeamsGames` | window | 2236 |
| `toggleSgOnlyAlltime` | window | 2396 |
| `toggleSpecialTeamsGameDetails` | window | 2235 |
| `toggleToolMenu` | window | 23198 |
| `toolMenuElements` | function | 23173 |
| `toolMenuItemElements` | function | 23176 |
| `toolMenuOnClick` | function | 23234 |
| `toolMenuOnKeydown` | function | 23210 |
| `toPublicPlayerRegistry` | function | 3901 |
| `uiDatenstandBand` | function | 22091 |
| `uiDeltaIndicator` | function | 21856 |
| `uiFormatNumber` | function | 21828 |
| `uiHinweisKarte` | function | 21920 |
| `uiInfoIcon` | function | 21874 |
| `uiIntervallBalken` | function | 21996 |
| `uiKennzahlKachel` | function | 21886 |
| `uiKernaussage` | function | 21906 |
| `uiMethodenbox` | function | 22015 |
| `uiNotiz` | function | 22032 |
| `uiObjektseite` | function | 22180 |
| `uiObjektseiteSortTabs` | function | 22162 |
| `uiPlatzhalter` | function | 22112 |
| `uiQuoteText` | function | 22068 |
| `uiRangliste` | function | 21942 |
| `uiReliabilityDots` | function | 21841 |
| `uiVerlauf` | function | 21970 |
| `uniqueList` | function | 1854 |
| `updateCoverAllTimeStats` | function | 8282 |
| `updatePlayerRoleAvailability` | function | 4697 |
| `validateGameStructure` | function | 6184 |
| `validateMergedSeason` | function | 6271 |
| `validateSeasonGames` | function | 6225 |
| `validateSeasonKey` | function | 6248 |
| `validateWrapperFormat` | function | 6260 |
| `variance` | function | 2917 |
| `viewEinsatzCenterMergedView` | window | 7555 |
| `warnEventProcessingOnce` | function | 2612 |
| `withoutHashSync` | function | 3383 |

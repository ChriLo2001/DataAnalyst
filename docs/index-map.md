# Code-Karte: index.html

Automatisch erzeugt von `scripts/build-index-map.mjs`. Nicht von Hand bearbeiten — bei Änderungen an index.html erneut ausführen: `node scripts/build-index-map.mjs --write`.

index.html: 23589 Zeilen gesamt. Statischer `<style>`-Block: Zeile 8–1521. Haupt-`<script>`-Block: Zeile 1614–23585.

**Leseregel (siehe CLAUDE.md):** index.html nie vollständig laden. Diese Karte nennen, den gesuchten Namen im Register unten finden, dann nur den genannten Zeilenbereich lesen.

## Große Bereiche

Top-Level-Blöcke (Funktionen oder Daten-consts) ab 30 Zeilen oder 2000 Zeichen, u. a. `STATIC_SEASON_DATA`:

| Name | Art | Zeile | Zeilen |
|---|---|---|---|
| `STATIC_SEASON_DATA` | const-data | 1658–1658 | 1 |
| `SEASON_CONFIG` | const-data | 1659–1750 | 92 |
| `TYPE_DESC` | const-data | 1853–1876 | 24 |
| `ROLE_TRAIT_COLORS` | const-data | 1961–2000 | 40 |
| `ROLE_TRAIT_TOOLTIPS` | const-data | 2022–2061 | 40 |
| `UI_TEXT_REPLACEMENTS` | const-data | 2465–2482 | 18 |
| `appendSeasonGameDiagnostics` | function | 2640–2689 | 50 |
| `resolveRosterPlayerByRef` | function | 2892–2922 | 31 |
| `processGame` | function | 3025–3082 | 58 |
| `classifyGameForStats` | function | 3136–3177 | 42 |
| `buildMatchdays` | function | 3295–3336 | 42 |
| `parseAppHash` | function | 3505–3536 | 32 |
| `applyAppHash` | function | 3743–3773 | 31 |
| `buildStandings` | function | 3854–3893 | 40 |
| `getOrCreatePlayerProfile` | function | 4025–4057 | 33 |
| `toPublicPlayerRegistry` | function | 4212–4241 | 30 |
| `aggregateAllTimePlayers` | function | 4243–4276 | 34 |
| `emptySpecialTeamsStats` | function | 4337–4377 | 41 |
| `mergeSpecialTeamsStats` | function | 4391–4420 | 30 |
| `buildSpecialTeamsForGame` | function | 4536–4729 | 194 |
| `addGoalieGameToStats` | function | 4789–4839 | 51 |
| `buildGoalieGameRecord` | function | 4841–4889 | 49 |
| `buildGoalieStatsForSeason` | function | 4891–4970 | 80 |
| `aggregateGoalieAlltimeStats` | function | 4972–5006 | 35 |
| `getAssistDiagnostics` | function | 5033–5085 | 53 |
| `buildPlayerEvents` | function | 5215–5299 | 85 |
| `computeMetrics` | function | 5319–5451 | 133 |
| `buildSoloDuoProfile` | function | 5473–5516 | 44 |
| `identityInputs` | function | 5603–5660 | 58 |
| `buildIdentityProfiles` | function | 5704–5935 | 232 |
| `assignStatus` | function | 5982–6167 | 186 |
| `fetchTextWithDiagnostics` | function | 6202–6231 | 30 |
| `fetchSeasonGameRaw` | function | 6267–6306 | 40 |
| `validateGameStructure` | function | 6516–6555 | 40 |
| `buildDryRunReport` | function | 6622–6684 | 63 |
| `stageSeasonDataPreview` | function | 6755–6806 | 52 |
| `rSeasonDataPreviewCard` | function | 6859–6894 | 36 |
| `computeEinsatzCenterStats` | function | 7088–7118 | 31 |
| `rEinsatzCenterStats` | function | 7125–7143 | 19 |
| `einsatzCenterDeserializeAutosave` | function | 7346–7379 | 34 |
| `rEinsatzCenterGroupEditor` | function | 7689–7719 | 31 |
| `rEinsatzCenterRosterSuggestionCard` | function | 7736–7766 | 31 |
| `rEinsatzCenterGameEditor` | function | 7767–7819 | 53 |
| `rEinsatzCenterEditPage` | function | 7820–7867 | 48 |
| `loadSeasonData` | function | 8115–8573 | 459 |
| `loadSeasonForGlobal` | function | 8613–8643 | 31 |
| `loadSeason` | function | 8661–8712 | 52 |
| `ensureHallOfFameIntroOverlay` | function | 8740–8772 | 33 |
| `rMatrix` | function | 9160–9204 | 45 |
| `rRadar` | function | 9237–9284 | 48 |
| `rClutch` | function | 9287–9319 | 33 |
| `rTimeline` | function | 9322–9430 | 109 |
| `rOppBreakdown` | function | 9452–9484 | 33 |
| `generatePlayerInsights` | function | 9487–9530 | 44 |
| `rInsights` | function | 9548–9599 | 52 |
| `buildGoalieAnalysisModel` | function | 9866–10024 | 159 |
| `buildGoalieRoleProfile` | function | 10089–10162 | 74 |
| `rGoalieInsights` | function | 10281–10302 | 22 |
| `buildOpponentIntelligence` | function | 10744–10797 | 54 |
| `buildBestThirdManOptions` | function | 10947–10977 | 31 |
| `getDuoDirectScorerGameCounts` | function | 10978–11009 | 32 |
| `buildAnnotatedGoalEventsForGame` | function | 11059–11159 | 101 |
| `buildResponseGoalStatsRaw` | function | 11202–11250 | 49 |
| `buildMomentumSwingStatsRaw` | function | 11263–11333 | 71 |
| `buildDuoFloorCeiling` | function | 11340–11381 | 42 |
| `buildDuoWithWithoutImpact` | function | 11477–11510 | 34 |
| `buildDuoCompatibility` | function | 11565–11587 | 23 |
| `buildDuoProAnalysis` | function | 11622–11665 | 44 |
| `rDuoCenterPro` | function | 11666–11780 | 115 |
| `rInteractiveDuoCenterPro` | function | 11855–11910 | 56 |
| `getDifficultConnectionRowsForPlayer` | function | 11914–11958 | 45 |
| `getRosterImpactPlayerGames` | function | 12001–12041 | 41 |
| `buildRosterImpactAnalysis` | function | 12067–12126 | 60 |
| `rDifficultConnectionList` | function | 12181–12205 | 25 |
| `rDifficultConnectionListCompactLegacy` | function | 12206–12247 | 42 |
| `rDifficultConnectionListCompact` | function | 12248–12286 | 39 |
| `rDifficultConnectionsCard` | function | 12287–12323 | 37 |
| `RESPONSE_MOMENTUM_TOOLTIPS` | const-data | 12326–12357 | 32 |
| `rResponseMomentumOverviewCard` | function | 12401–12424 | 24 |
| `rMatchcenterResponseMomentum` | function | 12471–12508 | 38 |
| `getTeamAllTimeRecords` | function | 12510–12550 | 41 |
| `getAllTimeIdentityStandings` | function | 12631–12665 | 35 |
| `buildRecencyWeightedGlobalIdentityProfile` | function | 12667–12714 | 48 |
| `rHallOfFameHero` | function | 12770–12795 | 26 |
| `hallGoalieRowFromStats` | function | 12893–12925 | 33 |
| `rHallGoalieRankCard` | function | 12978–13009 | 32 |
| `rHallGoalieLegends` | function | 13027–13059 | 33 |
| `buildDuoComparison` | function | 13454–13473 | 20 |
| `rDuoCompareSummaryCards` | function | 13479–13509 | 31 |
| `rDuoComparisonPage` | function | 13610–13620 | 11 |
| `buildComparisonExtraMetrics` | function | 13665–13722 | 58 |
| `buildGoalieComparisonDataset` | function | 13759–13809 | 51 |
| `buildComparisonDataset` | function | 13810–13845 | 36 |
| `rKpiMirrorRows` | function | 13871–13930 | 60 |
| `rKpiRadar` | function | 13942–13976 | 35 |
| `rKpiTrendCompare` | function | 14023–14089 | 67 |
| `rKpiOpponentStrength` | function | 14090–14117 | 28 |
| `rKpiInfoCards` | function | 14128–14159 | 32 |
| `buildComparisonSummary` | function | 14160–14191 | 32 |
| `rComparisonStyles` | function | 14229–14266 | 38 |
| `rComparisonCenterPage` | function | 14267–14317 | 51 |
| `rGlobalDnaBars` | function | 14358–14387 | 30 |
| `buildSeasonPlayerDashModel` | function | 14457–14493 | 37 |
| `buildAlltimePlayerDashModel` | function | 14494–14536 | 43 |
| `rPlayerDashStyles` | function | 14537–14548 | 12 |
| `rPlayerDash` | function | 14555–14593 | 39 |
| `rGlobalOverview` | function | 14652–14703 | 52 |
| `rGlobalDevelopment` | function | 14723–14761 | 39 |
| `rGlobalDuoNetwork` | function | 14823–15020 | 198 |
| `rGlobalOpponentSpecialist` | function | 15022–15067 | 46 |
| `buildFieldPlayerExplanation` | function | 15133–15207 | 75 |
| `buildGoaliePlayerExplanation` | function | 15208–15261 | 54 |
| `buildPlayerIntelligence` | function | 15271–15300 | 30 |
| `rPlayerExplanation` | function | 15306–15357 | 52 |
| `rAllTimePlayersPage` | function | 15359–15399 | 41 |
| `rHallOfFamePage` | function | 15401–15489 | 89 |
| `rLexiconPage` | function | 15516–15688 | 173 |
| `buildConfidence` | function | 15712–15757 | 46 |
| `getMatchcenterOpponents` | function | 16079–16111 | 33 |
| `getMatchcenterDirectOpponents` | function | 16112–16142 | 31 |
| `matchcenterAnalyzeDirect` | function | 16163–16199 | 37 |
| `matchcenterFinalizeOpponentPlayerProfiles` | function | 16346–16392 | 47 |
| `matchcenterBuildOpponentScouting` | function | 16393–16464 | 72 |
| `matchcenterEnsureUlmPlayer` | function | 16487–16524 | 38 |
| `matchcenterAddUlmScoring` | function | 16549–16586 | 38 |
| `matchcenterFinalizeUlmPlayers` | function | 16587–16655 | 69 |
| `matchcenterBuildUlmPlayerScouting` | function | 16656–16710 | 55 |
| `matchcenterEnsureOpponentDuo` | function | 16728–16760 | 33 |
| `matchcenterFinalizeOpponentDuos` | function | 16787–16821 | 35 |
| `matchcenterBuildOpponentDuos` | function | 16822–16866 | 45 |
| `matchcenterEnsureUlmDuo` | function | 16881–16918 | 38 |
| `matchcenterFinalizeUlmDuos` | function | 16938–16973 | 36 |
| `matchcenterBuildUlmDuos` | function | 16974–17016 | 43 |
| `matchcenterBuildSpecialTeamsMatchup` | function | 17050–17097 | 48 |
| `matchcenterBuildGoalieMatchup` | function | 17120–17162 | 43 |
| `matchcenterTimingStatsForGames` | function | 17195–17231 | 37 |
| `rMatchcenterUlmScouting` | function | 17577–17613 | 37 |
| `rMatchcenterOpponentScouting` | function | 17614–17649 | 36 |
| `rMatchcenterUlmDuos` | function | 17758–17800 | 43 |
| `rMatchcenterOpponentDuos` | function | 17801–17843 | 43 |
| `rMatchcenterSpecialTeams` | function | 17856–17905 | 50 |
| `matchcenterBuildPlanConfidence` | function | 17996–18030 | 35 |
| `matchcenterBuildIntelligenceDataQuality` | function | 18079–18129 | 51 |
| `matchcenterBuildOpponentDNA` | function | 18130–18242 | 113 |
| `matchcenterBuildOpponentAlarm` | function | 18309–18418 | 110 |
| `matchcenterBuildIntelligenceSignals` | function | 18465–18511 | 47 |
| `buildMatchIntelligenceFromContext` | function | 18512–18566 | 55 |
| `buildMatchStories` | function | 18615–18644 | 30 |
| `buildDigitalCoachReport` | function | 18715–18747 | 33 |
| `buildMatchdayCaptionBlocks` | function | 18819–18848 | 30 |
| `buildSocialMediaContent` | function | 18849–18897 | 49 |
| `lineupRosterGamesForPlayer` | function | 18965–19012 | 48 |
| `buildLineupExperienceProfile` | function | 19013–19055 | 43 |
| `buildLineupOpponentDNAFit` | function | 19068–19111 | 44 |
| `classifyLineIdentity` | function | 19112–19159 | 48 |
| `lineupPlayerProfile` | function | 19160–19235 | 76 |
| `buildLineupAnalysis` | function | 19236–19369 | 134 |
| `buildLineupScoreBreakdowns` | function | 19370–19399 | 30 |
| `lineupEvaluateComplementCandidate` | function | 19483–19560 | 78 |
| `buildTeamLineBalance` | function | 19579–19622 | 44 |
| `buildLineupRecommendations` | function | 19657–19735 | 79 |
| `matchcenterBuildMatchPlan` | function | 19764–19909 | 146 |
| `rMatchcenterOpponentDNA` | function | 19944–19976 | 33 |
| `rMatchcenterIntelOverview` | function | 19999–20044 | 46 |
| `rMatchcenterDigitalCoach` | function | 20086–20150 | 65 |
| `rMatchcenterLockerRoomSheet` | function | 20168–20223 | 56 |
| `downloadMatchdayStory` | window | 20242–20289 | 48 |
| `rMatchcenterSocialMediaCenter` | function | 20290–20340 | 51 |
| `rMatchcenterLineupBuilder` | function | 20372–20444 | 73 |
| `rLineupBuilderAvailablePanel` | function | 20459–20506 | 48 |
| `rLineupRecommendationMode` | function | 20522–20555 | 34 |
| `rLineupTestLine` | function | 20569–20617 | 49 |
| `rLineupBuilderPage` | function | 20635–20668 | 34 |
| `rMatchcenterScoutingSummary` | function | 20669–20712 | 44 |
| `matchcenterStoryPlayer` | function | 20858–20890 | 33 |
| `matchcenterStoryPickFactItems` | function | 20958–21010 | 53 |
| `buildMatchcenterStoryPreviewData` | function | 21234–21345 | 112 |
| `matchcenterStoryVisibleFacts` | function | 21352–21382 | 31 |
| `rMatchcenterStoryPreview` | function | 21401–21470 | 70 |
| `fitMatchcenterStoryLayout` | function | 21477–21519 | 43 |
| `rMatchcenterPage` | function | 21520–21667 | 148 |
| `rTeamPage` | function | 21668–21978 | 311 |
| `_render` | function | 22028–22192 | 165 |
| `uiObjektseite` | function | 22510–22543 | 34 |
| `rMatchdayDetailPage` | function | 22763–22798 | 36 |
| `buildOverviewCards` | function | 23040–23080 | 41 |

## CSS-Regelgruppen

Aufeinanderfolgende Regeln mit gleichem Selektor-Präfix, innerhalb des statischen `<style>`-Blocks (Zeile 8–1521):

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
| `@media(max-width:980px)` | 496–497 | 2 |
| `@media(max-width:620px)` | 498–498 | 1 |
| `html` | 501–501 | 1 |
| `body` | 502–502 | 1 |
| `button` | 503–503 | 1 |
| `button:focus-visible` | 504–504 | 1 |
| `section-grid` | 505–505 | 1 |
| `card-grid` | 506–506 | 1 |
| `kpi-grid` | 507–507 | 1 |
| `two-column` | 508–508 | 1 |
| `:where(.team-card` | 509–510 | 2 |
| `:where(.team-card-title` | 511–511 | 1 |
| `:where(.mc-big` | 512–512 | 1 |
| `:where(.nav-btn` | 513–514 | 2 |
| `view-back` | 515–515 | 1 |
| `:where(.nav-btn.active` | 516–516 | 1 |
| `:where(.btn-exp)` | 517–517 | 1 |
| `:where(.nav-btn:hover` | 518–518 | 1 |
| `:where(.mc-confidence-badge` | 520–520 | 1 |
| `badge-muted` | 521–521 | 1 |
| `badge-primary` | 522–522 | 1 |
| `badge-success` | 523–523 | 1 |
| `badge-warning` | 524–524 | 1 |
| `badge-danger` | 525–525 | 1 |
| `badge-gold` | 526–526 | 1 |
| `:where(.tabs` | 527–527 | 1 |
| `:where(.tb` | 528–528 | 1 |
| `:where(.tb:hover` | 529–529 | 1 |
| `:where(.tb.active` | 530–530 | 1 |
| `:where(.mc-empty` | 531–531 | 1 |
| `:where(.wrn-box)` | 532–532 | 1 |
| `:where(.ok-box)` | 533–533 | 1 |
| `#global-tip` | 534–534 | 1 |
| `th-tip` | 535–535 | 1 |
| `details` | 536–536 | 1 |
| `details>summary` | 537–537 | 1 |
| `details>summary::-webkit-details-marker` | 538–538 | 1 |
| `details>summary::after` | 539–539 | 1 |
| `details[open]>summary::after` | 540–540 | 1 |
| `p1-score` | 541–541 | 1 |
| `tw` | 542–542 | 1 |
| `mc-story` | 543–544 | 2 |
| `lineup-builder` | 545–546 | 2 |
| `@media(max-width:980px)` | 547–551 | 1 |
| `@media(max-width:700px)` | 552–570 | 1 |
| `@media(prefers-reduced-motion:reduce)` | 571–573 | 1 |
| `vfb-hof` | 576–607 | 32 |
| `@media(max-width:640px)` | 616–616 | 1 |
| `@media(prefers-reduced-motion:reduce)` | 617–617 | 1 |
| `#main` | 620–620 | 1 |
| `ld` | 623–623 | 1 |
| `ld-title` | 624–624 | 1 |
| `prog-o` | 625–625 | 1 |
| `prog-i` | 626–626 | 1 |
| `prog-sub` | 627–627 | 1 |
| `hdr` | 630–630 | 1 |
| `hdr-l` | 631–631 | 1 |
| `hdr-logo` | 632–632 | 1 |
| `hdr-title` | 633–634 | 2 |
| `hdr-sub` | 635–635 | 1 |
| `hdr-nav` | 636–636 | 1 |
| `nav-btn` | 637–639 | 3 |
| `btn-exp` | 640–640 | 1 |
| `btn-back` | 641–641 | 1 |
| `ptabs` | 644–644 | 1 |
| `ptab` | 645–647 | 3 |
| `star-dot` | 648–648 | 1 |
| `player-badge` | 649–651 | 3 |
| `scorer-star` | 652–655 | 4 |
| `enforcer-marker` | 656–656 | 1 |
| `stats` | 659–659 | 1 |
| `sc` | 660–661 | 2 |
| `c1` | 662–662 | 1 |
| `c4` | 663–663 | 1 |
| `sv` | 664–664 | 1 |
| `sl` | 665–665 | 1 |
| `tags-row` | 668–668 | 1 |
| `tag` | 669–669 | 1 |
| `tabs` | 672–673 | 2 |
| `tb` | 674–676 | 3 |
| `tw` | 679–679 | 1 |
| `table` | 680–680 | 1 |
| `thead` | 681–681 | 1 |
| `tbody` | 682–684 | 3 |
| `bdg` | 685–685 | 1 |
| `bt` | 686–686 | 1 |
| `bv` | 687–687 | 1 |
| `bs` | 688–688 | 1 |
| `bwin` | 689–689 | 1 |
| `bdraw` | 690–690 | 1 |
| `bloss` | 691–691 | 1 |
| `bclutch` | 692–692 | 1 |
| `mono` | 693–693 | 1 |
| `chip` | 694–694 | 1 |
| `pg` | 697–697 | 1 |
| `pc` | 698–698 | 1 |
| `pcb` | 699–699 | 1 |
| `pch` | 700–700 | 1 |
| `pcn` | 701–701 | 1 |
| `pbg` | 702–702 | 1 |
| `pbf` | 703–703 | 1 |
| `pev` | 704–704 | 1 |
| `radar-wrap` | 707–707 | 1 |
| `radar-stats` | 708–708 | 1 |
| `rstat` | 709–709 | 1 |
| `rstat-name` | 710–710 | 1 |
| `rstat-bar` | 711–712 | 2 |
| `rstat-val` | 713–713 | 1 |
| `cl-grid` | 716–716 | 1 |
| `clcard` | 717–717 | 1 |
| `clcard-bar` | 718–718 | 1 |
| `clval` | 719–719 | 1 |
| `cllbl` | 720–720 | 1 |
| `ctx-bars` | 721–721 | 1 |
| `ctx-row` | 722–722 | 1 |
| `ctx-lbl` | 723–723 | 1 |
| `ctx-bg` | 724–724 | 1 |
| `ctx-fill` | 725–725 | 1 |
| `ctx-cnt` | 726–726 | 1 |
| `cl-ev` | 727–727 | 1 |
| `opp-str` | 728–728 | 1 |
| `tl-wrap` | 731–731 | 1 |
| `in-grid` | 734–734 | 1 |
| `ic` | 735–735 | 1 |
| `ic-bar` | 736–736 | 1 |
| `ititle` | 737–737 | 1 |
| `imain` | 738–738 | 1 |
| `isub` | 739–739 | 1 |
| `team-grid` | 742–742 | 1 |
| `team-card` | 743–744 | 2 |
| `game-row` | 745–746 | 2 |
| `game-date` | 747–747 | 1 |
| `game-opp` | 748–748 | 1 |
| `game-score` | 749–749 | 1 |
| `game-ind` | 750–750 | 1 |
| `stnd-tbl` | 751–755 | 5 |
| `stnd-ulm` | 756–757 | 2 |
| `rank-badge` | 758–758 | 1 |
| `rank-1` | 759–759 | 1 |
| `rank-2` | 760–760 | 1 |
| `rank-3` | 761–761 | 1 |
| `rank-def` | 762–762 | 1 |
| `rank-bar` | 763–764 | 2 |
| `rank-num` | 765–765 | 1 |
| `rank-name` | 766–766 | 1 |
| `rank-bg` | 767–767 | 1 |
| `rank-fill` | 768–768 | 1 |
| `rank-val` | 769–769 | 1 |
| `st-shell` | 770–770 | 1 |
| `st-grid` | 771–771 | 1 |
| `st-card` | 772–775 | 4 |
| `st-label` | 776–776 | 1 |
| `st-value` | 777–777 | 1 |
| `st-sub` | 778–778 | 1 |
| `st-bar` | 779–779 | 1 |
| `st-fill` | 780–780 | 1 |
| `st-detail` | 781–785 | 5 |
| `st-mini` | 786–787 | 2 |
| `st-games` | 788–788 | 1 |
| `st-game` | 789–791 | 3 |
| `st-toggle` | 792–793 | 2 |
| `st-card` | 794–794 | 1 |
| `@media(max-width:760px)` | 795–795 | 1 |
| `noev` | 798–798 | 1 |
| `wrn-box` | 799–799 | 1 |
| `ok-box` | 800–800 | 1 |
| `stitle` | 801–801 | 1 |
| `sep` | 802–802 | 1 |
| `tag` | 805–805 | 1 |
| `tags-row` | 806–806 | 1 |
| `tag-tip` | 807–808 | 2 |
| `tag` | 809–809 | 1 |
| `opp-breakdown` | 812–812 | 1 |
| `obd` | 813–813 | 1 |
| `obd-val` | 814–814 | 1 |
| `obd-lbl` | 815–815 | 1 |
| `obd-sub` | 816–816 | 1 |
| `th-tip` | 820–820 | 1 |
| `#global-tip` | 821–821 | 1 |
| `duo-row` | 822–823 | 2 |
| `duo-num` | 824–824 | 1 |
| `duo-names` | 825–825 | 1 |
| `duo-bar` | 826–827 | 2 |
| `hof-duo` | 830–836 | 4 |
| `duo-col` | 838–843 | 1 |
| `duo-col` | 845–850 | 1 |
| `duo-col` | 852–868 | 1 |
| `duo-col` | 870–875 | 1 |
| `duo-col` | 877–882 | 1 |
| `hof-duo` | 883–883 | 1 |
| `duo-val` | 884–884 | 1 |
| `hof-shell` | 887–887 | 1 |
| `hof-hero` | 888–891 | 2 |
| `hof-crest` | 892–892 | 1 |
| `hof-hero` | 893–893 | 1 |
| `hof-kicker` | 894–894 | 1 |
| `hof-subline` | 895–895 | 1 |
| `hof-arc` | 896–896 | 1 |
| `hof-bird` | 897–898 | 2 |
| `hof-section` | 899–899 | 1 |
| `hof-grid` | 900–901 | 2 |
| `hof-card` | 902–904 | 3 |
| `hof-goalie` | 905–920 | 16 |
| `hof-sg` | 921–921 | 1 |
| `hof-filter` | 922–925 | 4 |
| `hof-goalie` | 926–933 | 8 |
| `@media(max-width:640px)` | 934–941 | 1 |
| `hof-card` | 943–943 | 1 |
| `hof-podium` | 944–944 | 1 |
| `podium-place` | 945–948 | 4 |
| `podium-medal` | 949–949 | 1 |
| `podium-place` | 950–950 | 1 |
| `podium-name` | 951–951 | 1 |
| `podium-value` | 952–952 | 1 |
| `podium-place` | 953–953 | 1 |
| `podium-label` | 954–954 | 1 |
| `hof-rest` | 955–955 | 1 |
| `at-hero` | 956–958 | 3 |
| `at-name` | 959–959 | 1 |
| `at-meta` | 960–960 | 1 |
| `at-rank` | 961–963 | 3 |
| `at-kpis` | 964–964 | 1 |
| `at-kpi` | 965–968 | 4 |
| `at-grid` | 969–969 | 1 |
| `at-card` | 970–971 | 2 |
| `trend-row` | 972–973 | 2 |
| `trend-season` | 974–974 | 1 |
| `trend-bars` | 975–975 | 1 |
| `trend-bg` | 976–976 | 1 |
| `trend-fill` | 977–977 | 1 |
| `trend-val` | 978–978 | 1 |
| `sparkline` | 979–979 | 1 |
| `dna-row` | 980–980 | 1 |
| `dna-label` | 981–981 | 1 |
| `dna-bg` | 982–982 | 1 |
| `dna-fill` | 983–983 | 1 |
| `dna-val` | 984–984 | 1 |
| `partner-pill` | 985–988 | 4 |
| `team-card` | 989–992 | 4 |
| `hof-shell` | 993–993 | 1 |
| `role-switch` | 994–994 | 1 |
| `role-btn` | 995–998 | 4 |
| `goalie-shell` | 999–999 | 1 |
| `goalie-head` | 1000–1000 | 1 |
| `goalie-title` | 1001–1001 | 1 |
| `goalie-sub` | 1002–1002 | 1 |
| `goalie-pill` | 1003–1003 | 1 |
| `goalie-tabs` | 1004–1004 | 1 |
| `goalie-tab` | 1005–1006 | 2 |
| `goalie-role` | 1007–1007 | 1 |
| `goalie-grid` | 1008–1008 | 1 |
| `goalie-kpi` | 1009–1011 | 3 |
| `goalie-val` | 1012–1012 | 1 |
| `goalie-lbl` | 1013–1013 | 1 |
| `goalie-card` | 1014–1014 | 1 |
| `goalie-dashboard` | 1015–1015 | 1 |
| `goalie-section` | 1016–1016 | 1 |
| `goalie-mini` | 1017–1017 | 1 |
| `goalie-metric` | 1018–1020 | 3 |
| `goalie-profile` | 1021–1022 | 2 |
| `goalie-stack` | 1023–1024 | 2 |
| `goalie-tier` | 1025–1030 | 6 |
| `goalie-note` | 1031–1031 | 1 |
| `goalie-bars` | 1032–1032 | 1 |
| `goalie-bar` | 1033–1037 | 5 |
| `goalie-dna` | 1038–1043 | 6 |
| `goalie-insights` | 1044–1044 | 1 |
| `goalie-insight` | 1045–1047 | 3 |
| `goalie-table` | 1048–1050 | 3 |
| `@media(max-width:900px)` | 1051–1051 | 1 |
| `@media(max-width:560px)` | 1052–1052 | 1 |
| `@media(max-width:720px)` | 1053–1057 | 1 |
| `body` | 1060–1060 | 1 |
| `button` | 1061–1061 | 1 |
| `cv-action` | 1062–1063 | 2 |
| `mc-eyebrow` | 1064–1064 | 1 |
| `mc-sub` | 1065–1065 | 1 |
| `sl` | 1066–1066 | 1 |
| `cvs-lbl` | 1067–1067 | 1 |
| `mc-value` | 1068–1068 | 1 |
| `#global-tip` | 1069–1069 | 1 |
| `rm-term` | 1070–1070 | 1 |
| `duo-compare` | 1071–1080 | 10 |
| `duo-profile` | 1081–1081 | 1 |
| `duo-flow` | 1082–1082 | 1 |
| `duo-impact` | 1083–1083 | 1 |
| `duo-details` | 1084–1084 | 1 |
| `@media(max-width:640px)` | 1085–1085 | 1 |
| `tag` | 1086–1086 | 1 |
| `timeline-role` | 1087–1089 | 3 |
| `difficult-connections` | 1090–1090 | 1 |
| `difficult-note` | 1091–1091 | 1 |
| `difficult-scope` | 1092–1092 | 1 |
| `difficult-list` | 1093–1093 | 1 |
| `difficult-row` | 1094–1094 | 1 |
| `difficult-main` | 1095–1097 | 3 |
| `difficult-metric` | 1098–1098 | 1 |
| `difficult-confidence` | 1099–1099 | 1 |
| `difficult-empty` | 1100–1100 | 1 |
| `difficult-impact` | 1101–1105 | 5 |
| `difficult-score` | 1106–1106 | 1 |
| `difficult-impact` | 1107–1112 | 6 |
| `difficult-delta` | 1113–1115 | 3 |
| `difficult-impact` | 1116–1116 | 1 |
| `difficult-direct` | 1117–1117 | 1 |
| `difficult-toolbar` | 1118–1118 | 1 |
| `difficult-compact` | 1119–1120 | 2 |
| `difficult-details` | 1121–1123 | 3 |
| `difficult-more` | 1124–1124 | 1 |
| `lineup-builder` | 1125–1127 | 3 |
| `duo-pro` | 1128–1135 | 8 |
| `duo-third` | 1136–1138 | 3 |
| `duo-warning` | 1139–1144 | 6 |
| `@media(max-width:760px)` | 1145–1152 | 1 |
| `:root` | 1155–1155 | 1 |
| `#main` | 1156–1156 | 1 |
| `hdr` | 1157–1157 | 1 |
| `hdr-l` | 1158–1158 | 1 |
| `hdr-nav` | 1159–1159 | 1 |
| `:where(.matchcenter-page` | 1160–1160 | 1 |
| `:where(.team-grid` | 1161–1161 | 1 |
| `:where(.team-card` | 1162–1163 | 2 |
| `:where(.mc-card.accent-gold` | 1164–1164 | 1 |
| `:where(.mc-card.accent-red` | 1165–1165 | 1 |
| `:where(.mc-goalie-card` | 1166–1166 | 1 |
| `:where(.team-card-title` | 1167–1167 | 1 |
| `:where(.mc-section-title` | 1168–1168 | 1 |
| `:where(.mc-muted` | 1169–1169 | 1 |
| `:where(.mc-big` | 1170–1170 | 1 |
| `:where(.mc-summary-value` | 1171–1171 | 1 |
| `:where(.mc-danger-score` | 1172–1172 | 1 |
| `:where(.mc-mini` | 1173–1173 | 1 |
| `:where(.mc-player-name` | 1174–1174 | 1 |
| `:where(.mc-stat-pill` | 1175–1175 | 1 |
| `:where(.mc-tab` | 1176–1176 | 1 |
| `:where(.mc-tabs` | 1177–1177 | 1 |
| `:where(.mc-score-bar` | 1178–1178 | 1 |
| `mc-score` | 1179–1179 | 1 |
| `lineup-builder` | 1180–1182 | 3 |
| `duo-pro` | 1183–1183 | 1 |
| `duo-third` | 1184–1184 | 1 |
| `difficult-impact` | 1185–1185 | 1 |
| `mc-story` | 1186–1186 | 1 |
| `mc-empty` | 1187–1187 | 1 |
| `table` | 1188–1188 | 1 |
| `team-card` | 1189–1190 | 2 |
| `mc-section` | 1191–1191 | 1 |
| `mc-summary` | 1192–1192 | 1 |
| `mc-tab` | 1193–1193 | 1 |
| `mc-player` | 1194–1194 | 1 |
| `noev` | 1195–1195 | 1 |
| `mono` | 1196–1196 | 1 |
| `:where(.bdg` | 1197–1197 | 1 |
| `:where(.sl` | 1198–1198 | 1 |
| `:where(.partner-pill` | 1199–1199 | 1 |
| `@media(max-width:980px)` | 1200–1203 | 1 |
| `@media(max-width:640px)` | 1204–1210 | 1 |
| `season-profile` | 1213–1257 | 45 |
| `difficult-connections` | 1260–1261 | 2 |
| `difficult-impact` | 1262–1264 | 3 |
| `difficult-compact` | 1265–1265 | 1 |
| `difficult-compare` | 1266–1272 | 7 |
| `difficult-impact` | 1273–1273 | 1 |
| `difficult-metric` | 1274–1280 | 7 |
| `difficult-details` | 1281–1281 | 1 |
| `difficult-direct` | 1282–1282 | 1 |
| `response-momentum` | 1283–1289 | 7 |
| `rm-term` | 1290–1290 | 1 |
| `player-explain` | 1291–1293 | 3 |
| `@media(max-width:720px)` | 1294–1300 | 1 |
| `@media(max-width:900px)` | 1301–1303 | 1 |
| `@media(max-width:560px)` | 1304–1311 | 1 |
| `ui-kpi` | 1324–1331 | 8 |
| `ui-info` | 1332–1334 | 3 |
| `ui-delta` | 1335–1338 | 4 |
| `ui-reliability` | 1339–1342 | 4 |
| `ui-kernaussage` | 1344–1345 | 2 |
| `ui-hinweis` | 1347–1350 | 4 |
| `ui-rangliste` | 1352–1359 | 8 |
| `ui-verlauf` | 1361–1362 | 2 |
| `ui-intervall` | 1364–1368 | 5 |
| `ui-methodenbox` | 1370–1375 | 6 |
| `ui-notiz` | 1377–1377 | 1 |
| `ui-platzhalter` | 1379–1380 | 2 |
| `@media(prefers-reduced-motion:reduce)` | 1382–1382 | 1 |
| `@media(max-width:600px)` | 1384–1387 | 1 |
| `ui-objektseite` | 1396–1404 | 9 |
| `@media(max-width:600px)` | 1406–1409 | 1 |
| `@media(max-width:360px)` | 1410–1412 | 1 |
| `ia-context` | 1421–1425 | 5 |
| `ia-mainnav` | 1426–1429 | 4 |
| `ia-placeholder` | 1430–1431 | 2 |
| `ia-overview` | 1438–1442 | 5 |
| `ia-matchday` | 1448–1456 | 9 |
| `ia-back` | 1457–1457 | 1 |
| `ia-search` | 1463–1477 | 15 |
| `@media(max-width:600px)` | 1478–1480 | 1 |
| `ia-tool` | 1486–1493 | 8 |
| `ia-mainnav` | 1502–1502 | 1 |
| `@media(max-width:600px)` | 1503–1513 | 1 |
| `@media(max-width:600px)` | 1515–1520 | 1 |

## @keyframes

| Name | Zeile |
|---|---|
| `cv-skyline-sweep` | 55–55 |
| `cv-skyline-pulse-opacity` | 56–56 |
| `pulse` | 62–62 |
| `vfb-hof-intro-flash` | 608–608 |
| `vfb-hof-intro-bar` | 609–609 |
| `vfb-hof-intro-crown` | 610–610 |
| `vfb-hof-intro-float` | 611–611 |
| `vfb-hof-intro-letter` | 612–612 |
| `vfb-hof-intro-sub` | 613–613 |
| `vfb-hof-intro-spark` | 614–614 |
| `vfb-hof-intro-shimmer` | 615–615 |
| `ui-platzhalter-shimmer` | 1381–1381 |

## Funktionen, window.-Zuweisungen und const-Pfeilfunktionen (nach Zeile)

1107 `function`-Deklarationen, 128 `window.`-Funktionszuweisungen, 4 `const`-Pfeilfunktionen — alle Top-Level, sortiert nach Zeile.

| Name | Art | Zeile | Zeilen |
|---|---|---|---|
| `createSeasonBucket` | function | 1751–1765 | 15 |
| `getSeasonApiBaseUrl` | function | 1776–1792 | 17 |
| `seasonApiUrl` | function | 1793–1795 | 3 |
| `getSeasonOriginBaseUrl` | function | 1796–1804 | 9 |
| `seasonPathPrefix` | function | 1805–1807 | 3 |
| `uniqueList` | function | 1808–1810 | 3 |
| `seasonGameApiUrls` | function | 1811–1820 | 10 |
| `seasonGameHtmlUrls` | function | 1821–1828 | 8 |
| `clearAnalysisCache` | function | 2126–2128 | 3 |
| `analysisCacheContext` | function | 2129–2143 | 15 |
| `asOfCacheKeyPart` | function | 2157–2162 | 6 |
| `analysisCacheKey` | function | 2163–2166 | 4 |
| `cachedAnalysis` | function | 2167–2172 | 6 |
| `setState` | const-arrow | 2173–2180 | 8 |
| `invalidateGlobalIdentityCache` | function | 2181–2183 | 3 |
| `setP` | window | 2185–2185 | 1 |
| `setTab` | window | 2186–2186 | 1 |
| `setPlayerRoleView` | window | 2187–2187 | 1 |
| `setGoalieTab` | window | 2188–2188 | 1 |
| `toggleSpecialTeamsGameDetails` | window | 2189–2189 | 1 |
| `toggleMatchcenterSpecialTeamsGames` | window | 2190–2190 | 1 |
| `toggleMatchcenterPlayerDetails` | window | 2191–2191 | 1 |
| `toggleMatchcenterDuoDetails` | window | 2192–2192 | 1 |
| `setMatchcenterTab` | window | 2193–2193 | 1 |
| `openMatchcenterStoryPreview` | window | 2194–2194 | 1 |
| `closeMatchcenterStoryPreview` | window | 2195–2195 | 1 |
| `toggleHallOfFamePureSGPlayers` | window | 2196–2196 | 1 |
| `copyMatchcenterText` | window | 2197–2222 | 26 |
| `addLineupPlayer` | window | 2223–2228 | 6 |
| `removeLineupPlayer` | window | 2229–2229 | 1 |
| `clearLineupPlayers` | window | 2230–2230 | 1 |
| `filterLineupPlayers` | window | 2231–2237 | 7 |
| `lineupBuilderPoolIds` | function | 2238–2240 | 3 |
| `normalizeLineupLines` | function | 2241–2245 | 5 |
| `setLineupBuilderSeason` | window | 2246–2257 | 12 |
| `setLineupBuilderOpponent` | window | 2258–2258 | 1 |
| `setLineupBuilderMode` | window | 2259–2259 | 1 |
| `setLineupActiveLine` | window | 2260–2260 | 1 |
| `toggleLineupBuilderAvailable` | window | 2261–2274 | 14 |
| `selectAllLineupAvailable` | window | 2275–2275 | 1 |
| `clearLineupAvailable` | window | 2276–2276 | 1 |
| `addLineupBuilderPlayerToLine` | window | 2277–2286 | 10 |
| `addLineupBuilderPlayerToActiveLine` | window | 2287–2287 | 1 |
| `removeLineupBuilderPlayerFromLine` | window | 2288–2294 | 7 |
| `clearLineupBuilderLine` | window | 2295–2300 | 6 |
| `showLineupComplements` | window | 2301–2301 | 1 |
| `setLineupNewPlayerProfile` | window | 2302–2302 | 1 |
| `addSyntheticLineupPlayer` | window | 2303–2320 | 18 |
| `setAntiSynergyView` | window | 2321–2321 | 1 |
| `toggleAntiSynergyShowAll` | window | 2322–2322 | 1 |
| `toggleAntiSynergyHideSgOnly` | window | 2323–2323 | 1 |
| `filterLineupBuilderAvailable` | window | 2324–2330 | 7 |
| `setPage` | window | 2331–2339 | 9 |
| `backToHome` | window | 2340–2346 | 7 |
| `setGlobalPlayer` | window | 2347–2347 | 1 |
| `setGlobalPlayerDuo` | window | 2348–2348 | 1 |
| `setGlobalTab` | window | 2349–2349 | 1 |
| `toggleSgOnlyAlltime` | window | 2350–2350 | 1 |
| `getActiveSeasonKey` | function | 2352–2354 | 3 |
| `getSeasonData` | function | 2355–2383 | 29 |
| `getGlobalAllTimeSnapshot` | function | 2384–2391 | 8 |
| `applySeasonContext` | function | 2392–2415 | 24 |
| `mojibakeScore` | function | 2428–2432 | 5 |
| `decodeCp1252AsUtf8` | function | 2433–2446 | 14 |
| `repairMojibake` | function | 2447–2464 | 18 |
| `fixKnownUiTransliterations` | function | 2483–2487 | 5 |
| `cleanText` | function | 2488–2490 | 3 |
| `fixMojibakeText` | function | 2491–2493 | 3 |
| `repairRenderedMojibake` | function | 2494–2515 | 22 |
| `normalizeTeamName` | function | 2516–2525 | 10 |
| `normalizeOpponentNameForAllTime` | function | 2526–2536 | 11 |
| `isFreiburgTuebingenSgName` | function | 2537–2539 | 3 |
| `isMannheimLudwigshafenSgName` | function | 2540–2542 | 3 |
| `getAllTimeOpponentNames` | function | 2543–2550 | 8 |
| `getUniqueAllTimeOpponentNames` | function | 2551–2553 | 3 |
| `isUlmTeamName` | function | 2555–2560 | 6 |
| `getUlmTeamStatus` | function | 2561–2565 | 5 |
| `detectUlmSide` | function | 2566–2572 | 7 |
| `detectSide` | const-arrow | 2573–2573 | 1 |
| `pFull` | function | 2574–2580 | 7 |
| `normalizePlayerDisplayName` | function | 2581–2596 | 16 |
| `normalizePlayerName` | function | 2597–2606 | 10 |
| `getPreClubHistoryPlayerNames` | function | 2607–2609 | 3 |
| `isPreClubHistoryPlayerName` | function | 2610–2614 | 5 |
| `gameStableId` | function | 2615–2617 | 3 |
| `diagnoseGameDuplicates` | function | 2618–2631 | 14 |
| `gameClassificationStatusLabel` | function | 2632–2639 | 8 |
| `appendSeasonGameDiagnostics` | function | 2640–2689 | 50 |
| `warnEventProcessingOnce` | function | 2691–2698 | 8 |
| `rosterPlayerMatches` | function | 2699–2713 | 15 |
| `getRosterGameIdsForPlayer` | function | 2714–2722 | 9 |
| `isGoalieRosterEntry` | function | 2723–2727 | 5 |
| `goalieEntryRecognitionReason` | function | 2737–2746 | 10 |
| `isExcludedGoalieAppearance` | function | 2747–2760 | 14 |
| `isGoalieAppearance` | function | 2761–2766 | 6 |
| `isFieldAppearance` | function | 2767–2772 | 6 |
| `getFieldGameIdsForPlayer` | function | 2773–2779 | 7 |
| `getGoalieGameIdsForPlayer` | function | 2780–2786 | 7 |
| `getPlayerFieldGames` | function | 2787–2790 | 4 |
| `getPlayerGoalieGames` | function | 2791–2794 | 4 |
| `roleGameStableKey` | function | 2795–2797 | 3 |
| `getPlayerAlltimeRoleGames` | function | 2798–2816 | 19 |
| `getPlayerAlltimeFieldGames` | function | 2817–2819 | 3 |
| `getPlayerAlltimeGoalieGames` | function | 2820–2822 | 3 |
| `getPlayerAlltimeTotalGames` | function | 2823–2831 | 9 |
| `getPlayerSeasonRoleGameSummary` | function | 2832–2854 | 23 |
| `getPlayedUlmGames` | function | 2855–2863 | 9 |
| `countPlayedUlmGames` | function | 2864–2866 | 3 |
| `getSeasonTeamGames` | function | 2867–2870 | 4 |
| `getSeasonTeamGameIds` | function | 2871–2873 | 3 |
| `getPlayerSourceId` | function | 2874–2876 | 3 |
| `getJerseyNumber` | function | 2877–2879 | 3 |
| `normalizeEventPlayerRef` | function | 2880–2891 | 12 |
| `resolveRosterPlayerByRef` | function | 2892–2922 | 31 |
| `resolveGoalScorerPlayer` | function | 2923–2937 | 15 |
| `getGoalScorerFromEvent` | function | 2938–2940 | 3 |
| `normalizeAssistPlayerName` | function | 2941–2943 | 3 |
| `collectAssistEventRefs` | function | 2944–2971 | 28 |
| `getAssistPlayersFromEvent` | function | 2972–2985 | 14 |
| `resolveAssistPlayer` | function | 2986–2992 | 7 |
| `parseGameClock` | function | 2993–3002 | 10 |
| `t2s` | const-arrow | 3003–3003 | 1 |
| `getPhaseKey` | function | 3004–3015 | 12 |
| `variance` | function | 3016–3020 | 5 |
| `processGame` | function | 3025–3082 | 58 |
| `isGamePlayed` | function | 3084–3086 | 3 |
| `isYouthGame` | function | 3089–3097 | 9 |
| `gameStatusText` | function | 3099–3105 | 7 |
| `gameScore` | function | 3106–3115 | 10 |
| `isGameAtOrBeforeAsOf` | function | 3125–3135 | 11 |
| `classifyGameForStats` | function | 3136–3177 | 42 |
| `getRelevantSeasonGames` | function | 3178–3197 | 20 |
| `deriveAsOfForSeason` | function | 3210–3213 | 4 |
| `getSeasonStatsAsOf` | function | 3248–3259 | 12 |
| `compareGamesChronologically` | function | 3274–3287 | 14 |
| `buildMatchdays` | function | 3295–3336 | 42 |
| `getSeasonMatchdays` | function | 3345–3349 | 5 |
| `matchdayAsOfCutoff` | function | 3358–3366 | 9 |
| `formatDateDE` | function | 3368–3371 | 4 |
| `seasonKeyToHashSegment` | function | 3395–3397 | 3 |
| `hashSegmentToSeasonKey` | function | 3398–3401 | 4 |
| `isValidAsOfDate` | function | 3402–3404 | 3 |
| `isValidAsOfStartTime` | function | 3405–3407 | 3 |
| `asOfEquals` | function | 3414–3421 | 8 |
| `decodeHashSegmentSafe` | function | 3485–3487 | 3 |
| `parseAppHash` | function | 3505–3536 | 32 |
| `parseAsOfQueryValue` | function | 3544–3554 | 11 |
| `buildAppHash` | function | 3560–3572 | 13 |
| `buildGlobalPageHash` | function | 3577–3586 | 10 |
| `buildHashStringFromParsed` | function | 3592–3596 | 5 |
| `computeCurrentAppHash` | function | 3612–3624 | 13 |
| `syncHashFromState` | function | 3638–3648 | 11 |
| `withoutHashSync` | function | 3655–3663 | 9 |
| `parseLastViewState` | function | 3679–3690 | 12 |
| `getStoredLastView` | function | 3691–3694 | 4 |
| `saveLastView` | function | 3696–3698 | 3 |
| `applyGlobalPageFromHash` | function | 3710–3730 | 21 |
| `applyAppHash` | function | 3743–3773 | 31 |
| `initHashRouting` | function | 3822–3840 | 19 |
| `gameResult` | function | 3843–3849 | 7 |
| `buildStandings` | function | 3854–3893 | 40 |
| `getOppStrength` | function | 3895–3901 | 7 |
| `createPlayerAnalysisProfile` | function | 3913–3915 | 3 |
| `emptyPlayerSeasonStats` | function | 3917–3922 | 6 |
| `emptyGoalieSeasonStats` | function | 3923–3944 | 22 |
| `emptyGoalieAlltimeStats` | function | 3945–3959 | 15 |
| `emptyGoalieSpecialTeamsStats` | function | 3960–3971 | 12 |
| `emptyFieldRoleSeasonStats` | function | 3972–3974 | 3 |
| `addUnique` | function | 3976–3978 | 3 |
| `incrementUniqueCounter` | function | 3980–3985 | 6 |
| `buildPlayerIdentity` | function | 3987–4002 | 16 |
| `resetPlayerRegistrySeason` | function | 4004–4014 | 11 |
| `derivePlayerStatus` | function | 4016–4023 | 8 |
| `getOrCreatePlayerProfile` | function | 4025–4057 | 33 |
| `registerPlayerIdentity` | function | 4059–4075 | 17 |
| `ensureGoalieSeasonStats` | function | 4077–4081 | 5 |
| `ensureFieldRoleSeasonStats` | function | 4082–4086 | 5 |
| `markFieldRoleAppearance` | function | 4087–4090 | 4 |
| `registerSeasonRosters` | function | 4092–4110 | 19 |
| `linkUiPlayersToRegistry` | function | 4112–4132 | 21 |
| `applySeasonScoringToRegistry` | function | 4134–4155 | 22 |
| `finalizePlayerRegistrySeason` | function | 4157–4171 | 15 |
| `serializeSeasonStats` | function | 4173–4185 | 13 |
| `serializeGoalieSeasonStats` | function | 4186–4207 | 22 |
| `serializeFieldRoleSeasonStats` | function | 4208–4210 | 3 |
| `toPublicPlayerRegistry` | function | 4212–4241 | 30 |
| `aggregateAllTimePlayers` | function | 4243–4276 | 34 |
| `finiteNumbers` | function | 4278–4280 | 3 |
| `avgOrNull` | function | 4281–4284 | 4 |
| `medianOrNull` | function | 4285–4290 | 6 |
| `incGoalieBucket` | function | 4291–4294 | 4 |
| `goalieEventAbsSeconds` | function | 4295–4300 | 6 |
| `goalieGameDurationSeconds` | function | 4301–4305 | 5 |
| `goalieGameStateBeforeGoal` | function | 4306–4317 | 12 |
| `getGoalieOpponentName` | function | 4318–4321 | 4 |
| `getGoalieOpponentTier` | function | 4322–4326 | 5 |
| `resultGoalsAgainstForSide` | function | 4327–4336 | 10 |
| `emptySpecialTeamsStats` | function | 4337–4377 | 41 |
| `clonePlain` | function | 4378–4380 | 3 |
| `finalizeSpecialTeamsStats` | function | 4381–4387 | 7 |
| `serializeSpecialTeamsStats` | function | 4388–4390 | 3 |
| `mergeSpecialTeamsStats` | function | 4391–4420 | 30 |
| `penaltyRawText` | function | 4423–4425 | 3 |
| `isMatchPenaltyEvent` | function | 4426–4429 | 4 |
| `isTwoPlusTwoPenaltyEvent` | function | 4430–4433 | 4 |
| `getPenaltyDisciplineType` | function | 4434–4441 | 8 |
| `getGameDurationMinutes` | function | 4442–4446 | 5 |
| `gameDaySortValue` | function | 4447–4454 | 8 |
| `isSameUlmTeamContext` | function | 4455–4462 | 8 |
| `getFurtherSameDayUlmGames` | function | 4463–4474 | 12 |
| `getPenaltySpecialTeamsMinutes` | function | 4475–4477 | 3 |
| `getPenaltyBasePersonalMinutes` | function | 4478–4485 | 8 |
| `getPenaltyPersonalMinutes` | function | 4486–4495 | 10 |
| `getPenaltyDisciplineMinutes` | function | 4496–4498 | 3 |
| `getSpecialTeamsPenaltyChunks` | function | 4499–4508 | 10 |
| `isPenaltyGoalEvent` | function | 4509–4513 | 5 |
| `specialTeamsStateFromActive` | function | 4514–4520 | 7 |
| `annotateSpecialTeamsGoalEvent` | function | 4521–4535 | 15 |
| `buildSpecialTeamsForGame` | function | 4536–4729 | 194 |
| `buildSpecialTeamsForSeason` | function | 4730–4738 | 9 |
| `aggregateAlltimeSpecialTeams` | function | 4739–4746 | 8 |
| `mergeGoalieSpecialTeamsStats` | function | 4747–4758 | 12 |
| `addGoalieSpecialTeamsGameToStats` | function | 4759–4773 | 15 |
| `finalizeGoalieSeasonStats` | function | 4774–4788 | 15 |
| `addGoalieGameToStats` | function | 4789–4839 | 51 |
| `buildGoalieGameRecord` | function | 4841–4889 | 49 |
| `buildGoalieStatsForSeason` | function | 4891–4970 | 80 |
| `aggregateGoalieAlltimeStats` | function | 4972–5006 | 35 |
| `updatePlayerRoleAvailability` | function | 5008–5017 | 10 |
| `getGoalieDiagnostics` | function | 5019–5024 | 6 |
| `getSpecialTeamsDiagnostics` | function | 5026–5031 | 6 |
| `getAssistDiagnostics` | function | 5033–5085 | 53 |
| `buildSeasonDuos` | function | 5088–5114 | 27 |
| `mergeDuoSet` | function | 5115–5131 | 17 |
| `aggregateAllTimeDuos` | function | 5132–5142 | 11 |
| `aggregateSeasonStats` | function | 5144–5159 | 16 |
| `buildPlayerDataFoundation` | function | 5161–5182 | 22 |
| `buildRegistry` | function | 5184–5210 | 27 |
| `buildPlayerEvents` | function | 5215–5299 | 85 |
| `getPhaseIndex` | function | 5304–5314 | 11 |
| `computeMetrics` | function | 5319–5451 | 133 |
| `detectTypes` | function | 5453–5468 | 16 |
| `pct` | function | 5470–5470 | 1 |
| `ratio01` | function | 5471–5471 | 1 |
| `relative01` | function | 5472–5472 | 1 |
| `buildSoloDuoProfile` | function | 5473–5516 | 44 |
| `identityPartnerStats` | function | 5517–5530 | 14 |
| `identityOpponentGroups` | function | 5531–5538 | 8 |
| `eventMatchesTeams` | function | 5539–5544 | 6 |
| `clutchText` | function | 5545–5545 | 1 |
| `isImportantClutchGoal` | function | 5546–5550 | 5 |
| `isDecisiveGoal` | function | 5551–5553 | 3 |
| `isLateGoal` | function | 5554–5558 | 5 |
| `isComebackRelevantGoal` | function | 5559–5562 | 4 |
| `identityPointsVsTeams` | function | 5563–5565 | 3 |
| `identityGoalsVsTeams` | function | 5566–5568 | 3 |
| `identityClutchGoalsVsTeams` | function | 5569–5571 | 3 |
| `identityDecisiveGoalsVsTeams` | function | 5572–5574 | 3 |
| `identityLateGoalsVsTeams` | function | 5575–5577 | 3 |
| `countMomentumClusters` | function | 5578–5602 | 25 |
| `identityInputs` | function | 5603–5660 | 58 |
| `clearlyAboveAverage` | function | 5661–5661 | 1 |
| `normalizeSecondaryTraits` | function | 5662–5673 | 12 |
| `seasonRoleTraitsFromClassic` | function | 5674–5678 | 5 |
| `seasonRoleKeysForPlayer` | function | 5679–5687 | 9 |
| `hasSeasonRole` | function | 5688–5690 | 3 |
| `selectEnforcerKeys` | function | 5691–5703 | 13 |
| `buildIdentityProfiles` | function | 5704–5935 | 232 |
| `composeIdentityText` | function | 5936–5942 | 7 |
| `countCaptainAppearances` | function | 5944–5956 | 13 |
| `countGoalieAppearances` | function | 5958–5960 | 3 |
| `computeRosterStatus` | function | 5962–5980 | 19 |
| `assignStatus` | function | 5982–6167 | 186 |
| `fetchJsonLegacy` | function | 6173–6192 | 20 |
| `responseExcerpt` | function | 6194–6196 | 3 |
| `diagnosticError` | function | 6197–6201 | 5 |
| `fetchTextWithDiagnostics` | function | 6202–6231 | 30 |
| `fetchJsonWithDiagnostics` | function | 6232–6240 | 9 |
| `fetchJson` | function | 6241–6244 | 4 |
| `formatStatus` | function | 6245–6247 | 3 |
| `formatDiagnosticAttempt` | function | 6248–6260 | 13 |
| `formatGameLoadError` | function | 6261–6266 | 6 |
| `fetchSeasonGameRaw` | function | 6267–6306 | 40 |
| `normalizeGame` | function | 6309–6330 | 22 |
| `getStaticSeasonGames` | function | 6331–6334 | 4 |
| `loadSeasonManifest` | function | 6346–6362 | 17 |
| `resolveCurrentSeasonKey` | function | 6378–6397 | 20 |
| `applyCurrentSeasonCoverHighlight` | function | 6398–6402 | 5 |
| `isUsableExternalSeasonData` | function | 6415–6423 | 9 |
| `ensureExternalSeasonData` | function | 6424–6445 | 22 |
| `buildStaticSeasonDataBlock` | function | 6446–6455 | 10 |
| `getGameId` | function | 6482–6486 | 5 |
| `findDuplicateGameIds` | function | 6488–6498 | 11 |
| `validateGameStructure` | function | 6516–6555 | 40 |
| `validateSeasonGames` | function | 6557–6567 | 11 |
| `diffGameIds` | function | 6569–6578 | 10 |
| `validateSeasonKey` | function | 6580–6590 | 11 |
| `validateWrapperFormat` | function | 6592–6601 | 10 |
| `validateMergedSeason` | function | 6603–6620 | 18 |
| `buildDryRunReport` | function | 6622–6684 | 63 |
| `seasonDataPreviewRerender` | function | 6705–6707 | 3 |
| `seasonDataPreviewRow` | function | 6709–6720 | 12 |
| `buildSeasonDataPreviewChanges` | function | 6727–6744 | 18 |
| `stageSeasonDataPreview` | function | 6755–6806 | 52 |
| `stageSeasonDataPreviewFromFile` | function | 6807–6820 | 14 |
| `stageSeasonDataPreviewFromPaste` | function | 6821–6825 | 5 |
| `discardSeasonDataPreview` | function | 6826–6830 | 5 |
| `getSeasonDataPreview` | function | 6832–6834 | 3 |
| `isSeasonDataPreviewStale` | function | 6840–6844 | 5 |
| `rSeasonDataPreviewStatus` | function | 6846–6848 | 3 |
| `rSeasonDataPreviewRows` | function | 6849–6857 | 9 |
| `rSeasonDataPreviewCard` | function | 6859–6894 | 36 |
| `setSeasonDataPreviewOpen` | window | 6895–6895 | 1 |
| `setSeasonDataPreviewPasteText` | window | 6896–6896 | 1 |
| `fileNameForLineupSeasonKey` | function | 6916–6918 | 3 |
| `ensureLineupDataLoaded` | function | 6934–6950 | 17 |
| `ensureLineupGroupsRegistryLoaded` | function | 6959–6975 | 17 |
| `resolveLineupPlayerName` | function | 6987–6990 | 4 |
| `findLineupGameContext` | function | 6993–7000 | 8 |
| `rEinsatzCenterGroup` | function | 7002–7013 | 12 |
| `rEinsatzCenterCombo` | function | 7015–7022 | 8 |
| `rEinsatzCenterGameCard` | function | 7024–7041 | 18 |
| `rEinsatzCenterPage` | function | 7043–7062 | 20 |
| `setEinsatzCenterSeason` | window | 7064–7069 | 6 |
| `openEinsatzCenter` | window | 7070–7077 | 8 |
| `computeEinsatzCenterStats` | function | 7088–7118 | 31 |
| `lineupGroupDisplayName` | function | 7119–7124 | 6 |
| `rEinsatzCenterStats` | function | 7125–7143 | 19 |
| `getEffectiveLineupData` | function | 7201–7208 | 8 |
| `isEinsatzCenterGameFromDraft` | function | 7210–7213 | 4 |
| `einsatzCenterDraftInView` | function | 7215–7218 | 4 |
| `rEinsatzCenterDraftMark` | function | 7219–7222 | 4 |
| `rEinsatzCenterDraftStatsHint` | function | 7223–7227 | 5 |
| `einsatzCenterDraftStaleHint` | function | 7229–7231 | 3 |
| `rEinsatzCenterDraftBanner` | function | 7233–7240 | 8 |
| `ensureEinsatzCenterDraft` | function | 7251–7264 | 14 |
| `getEinsatzCenterGameDraft` | function | 7273–7284 | 12 |
| `einsatzCenterAutosaveKey` | function | 7311–7311 | 1 |
| `einsatzCenterStorageRead` | function | 7312–7314 | 3 |
| `einsatzCenterStorageWrite` | function | 7315–7317 | 3 |
| `einsatzCenterStorageRemove` | function | 7318–7320 | 3 |
| `einsatzCenterDraftIsEmpty` | function | 7323–7325 | 3 |
| `einsatzCenterSerializeDraft` | function | 7327–7339 | 13 |
| `einsatzCenterIsPlainObject` | function | 7340–7340 | 1 |
| `einsatzCenterDeserializeAutosave` | function | 7346–7379 | 34 |
| `einsatzCenterCurrentRawBaseHash` | function | 7386–7391 | 6 |
| `einsatzCenterAutosaveDraft` | function | 7400–7427 | 28 |
| `einsatzCenterInspectAutosave` | function | 7435–7463 | 29 |
| `restoreEinsatzCenterAutosave` | function | 7466–7482 | 17 |
| `discardEinsatzCenterAutosave` | function | 7484–7489 | 6 |
| `rEinsatzCenterAutosaveBanner` | function | 7492–7504 | 13 |
| `einsatzCenterAutosaveInfoText` | function | 7506–7516 | 11 |
| `loadEinsatzCenterMismatchedAutosave` | function | 7530–7548 | 19 |
| `deriveLineupValidPlayerIds` | function | 7561–7577 | 17 |
| `deriveLineupUlmPlayerIds` | function | 7585–7601 | 17 |
| `getSeasonmanagerRosterSuggestion` | function | 7615–7635 | 21 |
| `einsatzCenterCanonicalJson` | function | 7644–7653 | 10 |
| `einsatzCenterSha256Hex` | function | 7654–7658 | 5 |
| `einsatzCenterComputeBaseHash` | function | 7659–7661 | 3 |
| `einsatzCenterSoftIssues` | function | 7668–7686 | 19 |
| `rEinsatzCenterGroupEditor` | function | 7689–7719 | 31 |
| `rEinsatzCenterComboEditor` | function | 7720–7726 | 7 |
| `rEinsatzCenterRosterSuggestionCard` | function | 7736–7766 | 31 |
| `rEinsatzCenterGameEditor` | function | 7767–7819 | 53 |
| `rEinsatzCenterEditPage` | function | 7820–7867 | 48 |
| `startEinsatzCenterDraftMode` | window | 7870–7874 | 5 |
| `cancelEinsatzCenterEdit` | window | 7875–7885 | 11 |
| `viewEinsatzCenterMergedView` | window | 7887–7887 | 1 |
| `returnToEinsatzCenterEdit` | window | 7888–7888 | 1 |
| `setEinsatzCenterIncludeDraft` | window | 7889–7889 | 1 |
| `selectEinsatzCenterEditGame` | window | 7890–7893 | 4 |
| `addEinsatzCenterRosterPlayer` | window | 7894–7901 | 8 |
| `removeEinsatzCenterRosterPlayer` | window | 7902–7909 | 8 |
| `toggleEinsatzCenterRosterSuggestionPlayer` | window | 7910–7916 | 7 |
| `dismissEinsatzCenterRosterSuggestion` | window | 7917–7920 | 4 |
| `acceptEinsatzCenterRosterSuggestion` | window | 7928–7944 | 17 |
| `addEinsatzCenterExistingGroup` | window | 7945–7953 | 9 |
| `addEinsatzCenterNewGroup` | window | 7954–7970 | 17 |
| `removeEinsatzCenterGroup` | window | 7971–7978 | 8 |
| `toggleEinsatzCenterGroupRename` | window | 7979–7981 | 3 |
| `renameEinsatzCenterGroup` | window | 7993–8012 | 20 |
| `addEinsatzCenterGroupPlayer` | window | 8013–8020 | 8 |
| `removeEinsatzCenterGroupPlayer` | window | 8021–8028 | 8 |
| `setEinsatzCenterGroupPlayerPosition` | window | 8029–8037 | 9 |
| `toggleEinsatzCenterComboPlayer` | window | 8038–8045 | 8 |
| `confirmEinsatzCenterCombo` | window | 8046–8056 | 11 |
| `removeEinsatzCenterCombo` | window | 8057–8063 | 7 |
| `setEinsatzCenterGameNote` | window | 8064–8070 | 7 |
| `buildEinsatzCenterDraftExport` | function | 8074–8087 | 14 |
| `exportEinsatzCenterDraft` | window | 8088–8100 | 13 |
| `loadSeasonData` | function | 8115–8573 | 459 |
| `showMainShell` | function | 8576–8580 | 5 |
| `hasSeasonSource` | function | 8581–8584 | 4 |
| `hasEmbeddedSeasonData` | function | 8585–8587 | 3 |
| `getGlobalLoadableSeasonKeys` | function | 8588–8594 | 7 |
| `getAllTimeCoverStats` | function | 8595–8602 | 8 |
| `updateCoverAllTimeStats` | function | 8603–8611 | 9 |
| `loadSeasonForGlobal` | function | 8613–8643 | 31 |
| `ensureGlobalDataLoaded` | function | 8644–8659 | 16 |
| `loadSeason` | function | 8661–8712 | 52 |
| `startApp` | window | 8714–8725 | 12 |
| `ensureAppLoaded` | function | 8716–8725 | 10 |
| `openSeason` | window | 8726–8728 | 3 |
| `openAllTimePlayers` | window | 8729–8734 | 6 |
| `hofIntroDelay` | function | 8737–8739 | 3 |
| `ensureHallOfFameIntroOverlay` | function | 8740–8772 | 33 |
| `buildHallOfFameIntroTitle` | function | 8773–8783 | 11 |
| `seedHallOfFameIntroParticles` | function | 8784–8801 | 18 |
| `cleanupHallOfFameIntro` | function | 8802–8816 | 15 |
| `restoreHallOfFameIntroPrevious` | function | 8817–8828 | 12 |
| `finishHallOfFameIntro` | function | 8829–8836 | 8 |
| `startHallOfFameIntro` | function | 8837–8861 | 25 |
| `cancelHallOfFameIntro` | function | 8862–8873 | 12 |
| `openHallOfFame` | window | 8875–8898 | 24 |
| `openComparisonCenter` | window | 8899–8927 | 29 |
| `openMatchcenter` | window | 8928–8949 | 22 |
| `openLineupBuilder` | window | 8950–8967 | 18 |
| `setMatchcenterOpponent` | window | 8968–8968 | 1 |
| `setMatchcenterContext` | window | 8969–8969 | 1 |
| `setMatchcenterSeason` | window | 8970–8970 | 1 |
| `toggleMatchcenterGames` | window | 8971–8971 | 1 |
| `openLexicon` | window | 8972–8975 | 4 |
| `rRes` | const-arrow | 8980–8980 | 1 |
| `rClutchBadge` | function | 8981–8988 | 8 |
| `escAttr` | function | 8989–8991 | 3 |
| `roleTraitLabel` | function | 8992–8994 | 3 |
| `isVisibleSecondaryTrait` | function | 8995–8998 | 4 |
| `rRoleTraitTip` | function | 8999–9003 | 5 |
| `rStyleMetricTip` | function | 9004–9007 | 4 |
| `rRosterStatusBadge` | function | 9008–9015 | 8 |
| `classicTagLabel` | function | 9016–9018 | 3 |
| `rClassicTagTip` | function | 9019–9023 | 5 |
| `fallbackIdentityProfile` | function | 9024–9034 | 11 |
| `rIdentityTags` | function | 9035–9043 | 9 |
| `rStyleProfileBars` | function | 9044–9054 | 11 |
| `rIdentityCards` | function | 9055–9080 | 26 |
| `rClassicRoleTags` | function | 9081–9088 | 8 |
| `renderTags` | function | 9089–9091 | 3 |
| `getSeasonPlayerFieldBasis` | function | 9093–9119 | 27 |
| `getSeasonScopedIdentityProfile` | function | 9120–9131 | 12 |
| `rSeasonProfileKpis` | function | 9132–9151 | 20 |
| `rSeasonProfileTagStrip` | function | 9153–9157 | 5 |
| `rMatrix` | function | 9160–9204 | 45 |
| `rSeasonDuoSummary` | function | 9207–9215 | 9 |
| `rPhases` | function | 9217–9234 | 18 |
| `rRadar` | function | 9237–9284 | 48 |
| `rClutch` | function | 9287–9319 | 33 |
| `rTimeline` | function | 9322–9430 | 109 |
| `rPenalties` | function | 9433–9449 | 17 |
| `rOppBreakdown` | function | 9452–9484 | 33 |
| `generatePlayerInsights` | function | 9487–9530 | 44 |
| `rSeasonInsightsTab` | function | 9533–9546 | 14 |
| `rInsights` | function | 9548–9599 | 52 |
| `rTable` | function | 9602–9622 | 21 |
| `findLoadedSeasonPlayer` | function | 9625–9633 | 9 |
| `getAllTimePlayerRows` | function | 9634–9649 | 16 |
| `isSgOnlyAlltimePlayer` | function | 9650–9657 | 8 |
| `isPureSGPlayer` | function | 9658–9661 | 4 |
| `filterPureSGPlayers` | function | 9662–9665 | 4 |
| `getAllTimeMainPlayerRows` | function | 9666–9668 | 3 |
| `getAllTimeSgOnlyRows` | function | 9669–9671 | 3 |
| `getPlayerSeasonStats` | function | 9672–9676 | 5 |
| `getPlayerAlltimeStats` | function | 9677–9684 | 8 |
| `getPlayerRegistryProfile` | function | 9685–9692 | 8 |
| `getPlayerGoalieSeasonStats` | function | 9693–9697 | 5 |
| `getPlayerGoalieAlltimeStats` | function | 9698–9721 | 24 |
| `sumRoleGames` | function | 9722–9727 | 6 |
| `getPlayerRoleAvailability` | function | 9728–9741 | 14 |
| `resolvePlayerRoleView` | function | 9742–9749 | 8 |
| `rPlayerRoleSwitch` | function | 9750–9756 | 7 |
| `goalieNum` | function | 9757–9762 | 6 |
| `goalieTime` | function | 9763–9770 | 8 |
| `goalieBucketRows` | function | 9771–9776 | 6 |
| `goalieTopRow` | function | 9777–9779 | 3 |
| `goalieTierMeta` | function | 9780–9788 | 9 |
| `goalieStdDev` | function | 9789–9794 | 6 |
| `goalieDetailFirstTime` | function | 9795–9801 | 7 |
| `goalieEventSecondInPeriod` | function | 9802–9807 | 6 |
| `goaliePctText` | function | 9808–9811 | 4 |
| `goalieSafeNum` | function | 9812–9815 | 4 |
| `goalieClampScore` | function | 9816–9819 | 4 |
| `goalieInverseScore` | function | 9820–9827 | 8 |
| `goaliePositiveScore` | function | 9828–9835 | 8 |
| `goaliePositiveCurveScore` | function | 9836–9844 | 9 |
| `goalieWeightedScore` | function | 9845–9850 | 6 |
| `goalieApplySampleConfidence` | function | 9851–9858 | 8 |
| `goalieBucketLooseSum` | function | 9859–9865 | 7 |
| `buildGoalieAnalysisModel` | function | 9866–10024 | 159 |
| `rGoalieBars` | function | 10025–10034 | 10 |
| `goalieDnaKey` | function | 10076–10080 | 5 |
| `goalieDnaValue` | function | 10081–10087 | 7 |
| `goalieStateGoals` | function | 10088–10088 | 1 |
| `buildGoalieRoleProfile` | function | 10089–10162 | 74 |
| `rGoalieRoleTraits` | function | 10163–10166 | 4 |
| `getGoalieDnaRows` | function | 10167–10170 | 4 |
| `rGoalieDnaBars` | function | 10171–10184 | 14 |
| `rGoalieKpis` | function | 10185–10201 | 17 |
| `rGoalieMiniMetrics` | function | 10202–10207 | 6 |
| `rGoalieFirstGoalResistance` | function | 10208–10221 | 14 |
| `rGoalieMomentum` | function | 10222–10235 | 14 |
| `rGoalieTierCards` | function | 10236–10263 | 28 |
| `rGoaliePhaseProfile` | function | 10264–10280 | 17 |
| `rGoalieInsights` | function | 10281–10302 | 22 |
| `rGoalieOverview` | function | 10303–10319 | 17 |
| `rGoaliePhases` | function | 10320–10322 | 3 |
| `rGoalieOpponents` | function | 10323–10334 | 12 |
| `rGoalieStability` | function | 10335–10359 | 25 |
| `rGoalieTable` | function | 10360–10367 | 8 |
| `rGoalieAnalysis` | function | 10368–10393 | 26 |
| `seasonOrderIndex` | function | 10394–10398 | 5 |
| `getPreviousSeasonKey` | function | 10399–10403 | 5 |
| `playerAppearedInSeasonByName` | function | 10404–10414 | 11 |
| `playerAppearedForUlmStatusInSeasonByName` | function | 10415–10433 | 19 |
| `isRookieCandidateForSeason` | function | 10434–10443 | 10 |
| `getLoadedSeasonPointsByName` | function | 10444–10448 | 5 |
| `seasonHasPureUlmTeam` | function | 10449–10455 | 7 |
| `isSgOnlyHallOfFameExcluded` | function | 10456–10464 | 9 |
| `isHallOfFameEligiblePlayer` | function | 10465–10470 | 6 |
| `getHallOfFamePlayerRows` | function | 10471–10473 | 3 |
| `getHallOfFamePlayerIdSet` | function | 10474–10476 | 3 |
| `getGlobalProfileEvents` | function | 10478–10489 | 12 |
| `countBy` | function | 10491–10499 | 9 |
| `getLoadedSeasonPlayerUi` | function | 10500–10504 | 5 |
| `getGlobalPlayerTeamRecord` | function | 10505–10530 | 26 |
| `getGlobalPlayerPeakGame` | function | 10531–10541 | 11 |
| `getGlobalPlayerBestSeason` | function | 10542–10548 | 7 |
| `getAllTimeDuoRowsForPlayer` | function | 10549–10559 | 11 |
| `getCarryPerformanceRows` | function | 10560–10575 | 16 |
| `rCarryPerformanceRows` | function | 10576–10588 | 13 |
| `getAllTimeGamesPlayedRows` | function | 10589–10613 | 25 |
| `getAllTimePenaltyRows` | function | 10614–10629 | 16 |
| `getSeasonUiPlayerForProfile` | function | 10630–10633 | 4 |
| `getSeasonIdentityProfile` | function | 10634–10638 | 5 |
| `seasonStatNumber` | function | 10639–10642 | 4 |
| `seasonStatSetSize` | function | 10643–10648 | 6 |
| `isActiveAlltimeSeasonStats` | function | 10649–10662 | 14 |
| `getActiveAlltimeSeasonKeys` | function | 10663–10673 | 11 |
| `getAlltimeRecencyWeight` | function | 10674–10679 | 6 |
| `getRosterStatus` | function | 10680–10686 | 7 |
| `getGlobalTopScorerMilestones` | function | 10687–10699 | 13 |
| `getGlobalRookieSeasonKey` | function | 10700–10713 | 14 |
| `getGlobalRookieMilestone` | function | 10714–10724 | 11 |
| `getGlobalPlayerMilestones` | function | 10725–10742 | 18 |
| `buildOpponentIntelligence` | function | 10744–10797 | 54 |
| `rOpponentIntelBars` | function | 10799–10809 | 11 |
| `getAllTimeDuoRows` | function | 10811–10833 | 23 |
| `rDuoRows` | function | 10835–10854 | 20 |
| `getAllLoadedSeasonGames` | function | 10856–10875 | 20 |
| `getRosterEntryRegistryProfile` | function | 10877–10880 | 4 |
| `difficultConnectionConfidence` | function | 10881–10885 | 5 |
| `getDuoRowsForPlayerScope` | function | 10886–10904 | 19 |
| `buildDirectDuoLookupForPlayer` | function | 10905–10922 | 18 |
| `duoScopeSeasonKeys` | function | 10923–10926 | 4 |
| `getDuoScorerCountsWithCandidate` | function | 10927–10946 | 20 |
| `buildBestThirdManOptions` | function | 10947–10977 | 31 |
| `getDuoDirectScorerGameCounts` | function | 10978–11009 | 32 |
| `responseMomentumAbsSeconds` | function | 11011–11016 | 6 |
| `responseMomentumTime` | function | 11017–11023 | 7 |
| `responseMomentumGameRows` | function | 11024–11030 | 7 |
| `responseMomentumSide` | function | 11031–11039 | 9 |
| `responseMomentumActor` | function | 11040–11050 | 11 |
| `responseMomentumGoalActors` | function | 11051–11058 | 8 |
| `buildAnnotatedGoalEventsForGame` | function | 11059–11159 | 101 |
| `responseMomentumConfidence` | function | 11160–11164 | 5 |
| `responseMomentumEmptyState` | function | 11165–11172 | 8 |
| `responseMomentumPairKey` | function | 11173–11175 | 3 |
| `ensureRmPlayer` | function | 11176–11181 | 6 |
| `ensureRmDuo` | function | 11182–11187 | 6 |
| `finalizeResponseStats` | function | 11188–11201 | 14 |
| `buildResponseGoalStatsRaw` | function | 11202–11250 | 49 |
| `buildResponseGoalStats` | function | 11251–11256 | 6 |
| `finalizeMomentumStats` | function | 11257–11262 | 6 |
| `buildMomentumSwingStatsRaw` | function | 11263–11333 | 71 |
| `buildMomentumSwingStats` | function | 11334–11339 | 6 |
| `buildDuoFloorCeiling` | function | 11340–11381 | 42 |
| `buildDuoWarnings` | function | 11382–11400 | 19 |
| `duoProPairKey` | function | 11401–11403 | 3 |
| `duoProContextSeasonKey` | function | 11404–11406 | 3 |
| `getDuoFieldPlayerRows` | function | 11407–11417 | 11 |
| `duoProPlayer` | function | 11418–11422 | 5 |
| `getDuoSharedFieldRows` | function | 11423–11428 | 6 |
| `buildDuoDirectProduction` | function | 11429–11449 | 21 |
| `emptyDuoTeamImpactStats` | function | 11450–11452 | 3 |
| `addDuoTeamGame` | function | 11453–11468 | 16 |
| `finalizeDuoTeamImpactStats` | function | 11469–11476 | 8 |
| `buildDuoWithWithoutImpact` | function | 11477–11510 | 34 |
| `buildDuoOpponentAdjusted` | function | 11511–11523 | 13 |
| `buildDuoNetworkContext` | function | 11524–11547 | 24 |
| `buildDuoGapAnalysis` | function | 11548–11564 | 17 |
| `buildDuoCompatibility` | function | 11565–11587 | 23 |
| `buildDuoUntestedPotential` | function | 11588–11599 | 12 |
| `buildDuoUsageRate` | function | 11600–11611 | 12 |
| `buildDuoReplacementOptions` | function | 11612–11621 | 10 |
| `buildDuoProAnalysis` | function | 11622–11665 | 44 |
| `rDuoCenterPro` | function | 11666–11780 | 115 |
| `duoProDomId` | function | 11781–11783 | 3 |
| `duoProPickerOpen` | function | 11784–11786 | 3 |
| `duoProPickerMessage` | function | 11787–11789 | 3 |
| `setDuoProPickerState` | function | 11790–11799 | 10 |
| `duoProResolveCandidate` | function | 11800–11808 | 9 |
| `duoProSelectionPayload` | function | 11809–11818 | 10 |
| `openDuoProPicker` | window | 11819–11819 | 1 |
| `cancelDuoProPicker` | window | 11820–11820 | 1 |
| `selectDuoProQuick` | window | 11821–11824 | 4 |
| `confirmDuoProSelection` | window | 11825–11839 | 15 |
| `setDuoProSelection` | window | 11840–11847 | 8 |
| `rDuoProPlayerSelect` | function | 11848–11854 | 7 |
| `rInteractiveDuoCenterPro` | function | 11855–11910 | 56 |
| `rSeasonDuoCenterPro` | function | 11911–11913 | 3 |
| `getDifficultConnectionRowsForPlayer` | function | 11914–11958 | 45 |
| `emptyRosterImpactStats` | function | 11959–11961 | 3 |
| `finalizeRosterImpactStats` | function | 11962–11969 | 8 |
| `addRosterImpactGameToStats` | function | 11970–11979 | 10 |
| `getRosterImpactPlayerEventLookup` | function | 11980–12000 | 21 |
| `getRosterImpactPlayerGames` | function | 12001–12041 | 41 |
| `rosterImpactConfidence` | function | 12042–12047 | 6 |
| `rosterImpactConfidenceWeight` | function | 12048–12051 | 4 |
| `antiSynergyImpactScore` | function | 12052–12066 | 15 |
| `buildRosterImpactAnalysis` | function | 12067–12126 | 60 |
| `buildDuoAntiSynergy` | function | 12127–12129 | 3 |
| `rAntiSynergyDelta` | function | 12130–12136 | 7 |
| `antiSynergyDeltaClass` | function | 12137–12140 | 4 |
| `antiSynergySigned` | function | 12141–12145 | 5 |
| `rAntiSynergyCompareChip` | function | 12146–12153 | 8 |
| `rAntiSynergyMetricRow` | function | 12154–12162 | 9 |
| `rRosterImpactStatLine` | function | 12163–12166 | 4 |
| `antiSynergyPartnerIsSgOnly` | function | 12167–12170 | 4 |
| `rAntiSynergyMainDelta` | function | 12171–12180 | 10 |
| `rDifficultConnectionList` | function | 12181–12205 | 25 |
| `rDifficultConnectionListCompactLegacy` | function | 12206–12247 | 42 |
| `rDifficultConnectionListCompact` | function | 12248–12286 | 39 |
| `rDifficultConnectionsCard` | function | 12287–12323 | 37 |
| `responseMomentumTooltipFor` | function | 12368–12374 | 7 |
| `rmTerm` | function | 12375–12378 | 4 |
| `rRmKpi` | function | 12379–12389 | 11 |
| `rRmTopList` | function | 12390–12400 | 11 |
| `rResponseMomentumOverviewCard` | function | 12401–12424 | 24 |
| `rPlayerResponseMomentumCard` | function | 12425–12443 | 19 |
| `rDuoResponseMomentumCard` | function | 12444–12463 | 20 |
| `rTeamResponseMomentumCard` | function | 12464–12470 | 7 |
| `rMatchcenterResponseMomentum` | function | 12471–12508 | 38 |
| `getTeamAllTimeRecords` | function | 12510–12550 | 41 |
| `getAllTimeOpponentIntelligence` | function | 12552–12558 | 7 |
| `getAllTimeOpponentTopScorers` | function | 12560–12584 | 25 |
| `getHallOfFameStats` | function | 12586–12608 | 23 |
| `rOpponentTopScorerTable` | function | 12610–12629 | 20 |
| `getAllTimeIdentityStandings` | function | 12631–12665 | 35 |
| `buildRecencyWeightedGlobalIdentityProfile` | function | 12667–12714 | 48 |
| `getGlobalIdentityProfile` | function | 12716–12742 | 27 |
| `dedupeIdentityProfileTags` | function | 12744–12755 | 12 |
| `rGlobalProfileTags` | function | 12757–12761 | 5 |
| `escHtml` | function | 12763–12765 | 3 |
| `pctValue` | function | 12766–12769 | 4 |
| `rHallOfFameHero` | function | 12770–12795 | 26 |
| `rHallPodiumList` | function | 12796–12818 | 23 |
| `rHallDuoTemple` | function | 12819–12826 | 8 |
| `hallGoalieNum` | function | 12828–12833 | 6 |
| `hallGoalieTime` | function | 12834–12841 | 8 |
| `hallGoalieSeasonLabel` | function | 12842–12842 | 1 |
| `isHallRowPureSG` | function | 12843–12850 | 8 |
| `rHallSGBadge` | function | 12851–12853 | 3 |
| `hallGoaliePkStats` | function | 12854–12865 | 12 |
| `hallGoalieTopteamStats` | function | 12866–12872 | 7 |
| `hallGoalieSeasonScore` | function | 12873–12892 | 20 |
| `hallGoalieRowFromStats` | function | 12893–12925 | 33 |
| `getHallGoalieData` | function | 12926–12941 | 16 |
| `hallGoalieNameHtml` | function | 12942–12944 | 3 |
| `hallGoalieTooltip` | function | 12959–12962 | 4 |
| `hallGoalieExplainForLabel` | function | 12963–12977 | 15 |
| `rHallGoalieRankCard` | function | 12978–13009 | 32 |
| `rHallGoalieAwardCards` | function | 13010–13026 | 17 |
| `rHallGoalieLegends` | function | 13027–13059 | 33 |
| `getGlobalSeasonStatRows` | function | 13060–13075 | 16 |
| `getAlltimeRank` | function | 13076–13081 | 6 |
| `rAlltimeKpis` | function | 13082–13095 | 14 |
| `rSparkline` | function | 13096–13108 | 13 |
| `comparisonItemKey` | function | 13120–13125 | 6 |
| `normalizeComparisonItem` | function | 13126–13130 | 5 |
| `comparisonJsArg` | function | 13131–13133 | 3 |
| `comparisonNum` | function | 13134–13137 | 4 |
| `comparisonPct` | function | 13138–13141 | 4 |
| `comparisonFmt` | function | 13142–13145 | 4 |
| `comparisonPctFmt` | function | 13146–13148 | 3 |
| `getComparisonPlayerRow` | function | 13149–13151 | 3 |
| `getComparisonSeasonLabel` | function | 13152–13154 | 3 |
| `getComparisonTeamGoalsForSeason` | function | 13155–13166 | 12 |
| `getComparisonAlltimeTeamGoals` | function | 13167–13169 | 3 |
| `getComparisonSeasonEvents` | function | 13170–13174 | 5 |
| `getComparisonChemistryFromEvents` | function | 13175–13179 | 5 |
| `getComparisonClutchFromEvents` | function | 13180–13184 | 5 |
| `getComparisonStyleProfile` | function | 13185–13209 | 25 |
| `getComparisonProfile` | function | 13210–13214 | 5 |
| `getComparisonSeasonTrend` | function | 13215–13240 | 26 |
| `getComparisonAlltimeTrend` | function | 13241–13246 | 6 |
| `getComparisonPlayerOptions` | function | 13248–13262 | 15 |
| `comparisonVariantValue` | function | 13263–13265 | 3 |
| `getComparisonVariantsForPlayer` | function | 13266–13290 | 25 |
| `parseComparisonVariant` | function | 13291–13305 | 15 |
| `getComparisonCurrentSelection` | function | 13306–13316 | 11 |
| `filterComparisonPlayers` | window | 13317–13324 | 8 |
| `selectComparisonPlayer` | window | 13325–13330 | 6 |
| `setComparisonRoleMode` | window | 13331–13335 | 5 |
| `setComparisonVariant` | window | 13336–13339 | 4 |
| `toggleComparisonSgOnly` | window | 13340–13340 | 1 |
| `addComparisonItem` | window | 13341–13348 | 8 |
| `addSelectedComparisonItem` | window | 13349–13354 | 6 |
| `toggleComparisonPicker` | window | 13355–13355 | 1 |
| `removeComparisonItem` | window | 13356–13359 | 4 |
| `clearComparison` | window | 13360–13360 | 1 |
| `runComparison` | window | 13361–13367 | 7 |
| `selectComparisonMode` | window | 13368–13368 | 1 |
| `backToComparisonModeSelect` | window | 13369–13369 | 1 |
| `normalizeDuoComparisonItem` | function | 13370–13373 | 4 |
| `comparisonDuoContext` | function | 13374–13377 | 4 |
| `setComparisonDuoMode` | window | 13378–13378 | 1 |
| `setComparisonDuoSeasonKey` | window | 13379–13379 | 1 |
| `setComparisonDuoSearch` | window | 13380–13380 | 1 |
| `filterPlayerSuggestions` | function | 13381–13392 | 12 |
| `rComparisonDuoSuggestionButtons` | function | 13393–13396 | 4 |
| `renderComparisonDuoSuggestions` | function | 13397–13405 | 9 |
| `filterComparisonDuoSuggestions` | window | 13406–13413 | 8 |
| `selectComparisonDuoSuggestion` | window | 13407–13413 | 7 |
| `handleComparisonDuoSearchKey` | window | 13414–13426 | 13 |
| `setComparisonDuoPlayer` | window | 13427–13432 | 6 |
| `addComparisonDuoFromSelection` | window | 13433–13440 | 8 |
| `addComparisonDuo` | window | 13441–13443 | 3 |
| `removeComparisonDuo` | window | 13444–13447 | 4 |
| `clearComparisonDuos` | window | 13448–13448 | 1 |
| `runDuoComparison` | window | 13449–13453 | 5 |
| `buildDuoComparison` | function | 13454–13473 | 20 |
| `rDuoComparisonBars` | function | 13474–13478 | 5 |
| `rDuoCompareSummaryCards` | function | 13479–13509 | 31 |
| `rDuoComparisonProfile` | function | 13510–13531 | 22 |
| `rDuoComparisonChemistry` | function | 13532–13547 | 16 |
| `rDuoComparisonImpact` | function | 13548–13563 | 16 |
| `rDuoComparisonContext` | function | 13564–13581 | 18 |
| `rDuoComparisonDetails` | function | 13582–13585 | 4 |
| `rDuoComparisonDashboard` | function | 13586–13599 | 14 |
| `rComparisonDuoSearchBox` | function | 13600–13609 | 10 |
| `rDuoComparisonPage` | function | 13610–13620 | 11 |
| `rComparisonModeSelect` | function | 13621–13623 | 3 |
| `getComparisonEventsForItem` | function | 13624–13626 | 3 |
| `getComparisonRosterGamesForSeason` | function | 13627–13643 | 17 |
| `getComparisonRosterGames` | function | 13644–13651 | 8 |
| `comparisonEventGameKey` | function | 13652–13654 | 3 |
| `comparisonEventPhaseLabel` | function | 13655–13658 | 4 |
| `comparisonOpponentStrengthTier` | function | 13659–13664 | 6 |
| `buildComparisonExtraMetrics` | function | 13665–13722 | 58 |
| `getGoalieComparisonAlltimeTrend` | function | 13723–13739 | 17 |
| `getGoalieComparisonSeasonTrend` | function | 13740–13758 | 19 |
| `buildGoalieComparisonDataset` | function | 13759–13809 | 51 |
| `buildComparisonDataset` | function | 13810–13845 | 36 |
| `kpiValueText` | function | 13847–13850 | 4 |
| `kpiDelta` | function | 13851–13856 | 6 |
| `kpiItemColor` | function | 13857–13859 | 3 |
| `rKpiCards` | function | 13860–13870 | 11 |
| `rKpiMirrorRows` | function | 13871–13930 | 60 |
| `kpiRadarValue` | function | 13931–13941 | 11 |
| `rKpiRadar` | function | 13942–13976 | 35 |
| `rKpiShareBars` | function | 13977–13984 | 8 |
| `rKpiMetricCard` | function | 13985–13989 | 5 |
| `rKpiTextMetricCard` | function | 13990–13992 | 3 |
| `rKpiExtendedMetrics` | function | 13993–14007 | 15 |
| `kpiNiceMax` | function | 14008–14013 | 6 |
| `kpiTrendRows` | function | 14014–14022 | 9 |
| `rKpiTrendCompare` | function | 14023–14089 | 67 |
| `rKpiOpponentStrength` | function | 14090–14117 | 28 |
| `kpiBadge` | function | 14118–14120 | 3 |
| `rKpiObjectMini` | function | 14121–14127 | 7 |
| `rKpiInfoCards` | function | 14128–14159 | 32 |
| `buildComparisonSummary` | function | 14160–14191 | 32 |
| `rKPIVergleich` | function | 14192–14205 | 14 |
| `rComparisonMiniOverview` | function | 14206–14209 | 4 |
| `rComparisonRoles` | function | 14210–14217 | 8 |
| `rComparisonDashboard` | function | 14218–14228 | 11 |
| `rComparisonStyles` | function | 14229–14266 | 38 |
| `rComparisonCenterPage` | function | 14267–14317 | 51 |
| `rSeasonTrendRows` | function | 14318–14336 | 19 |
| `getAlltimeAggregatedStyleProfile` | function | 14337–14356 | 20 |
| `rGlobalDnaBars` | function | 14358–14387 | 30 |
| `pdashNum` | function | 14388–14391 | 4 |
| `pdashPct` | function | 14392–14395 | 4 |
| `pdashPhaseLabel` | function | 14396–14399 | 4 |
| `pdashTopCount` | function | 14400–14403 | 4 |
| `pdashBestPhase` | function | 14404–14407 | 4 |
| `pdashTopPartner` | function | 14408–14411 | 4 |
| `pdashTopOpponent` | function | 14412–14415 | 4 |
| `pdashOpponentTier` | function | 14416–14421 | 6 |
| `pdashOpponentStrength` | function | 14422–14441 | 20 |
| `pdashInsight` | function | 14442–14444 | 3 |
| `pdashInsights` | function | 14445–14456 | 12 |
| `buildSeasonPlayerDashModel` | function | 14457–14493 | 37 |
| `buildAlltimePlayerDashModel` | function | 14494–14536 | 43 |
| `rPlayerDashStyles` | function | 14537–14548 | 12 |
| `rPdashLabel` | function | 14549–14551 | 3 |
| `rPdashStat` | function | 14552–14554 | 3 |
| `rPlayerDash` | function | 14555–14593 | 39 |
| `rSeasonPlayerDashboard` | function | 14594–14596 | 3 |
| `rAlltimePlayerDashboard` | function | 14597–14599 | 3 |
| `rGlobalPartnerOpponentPanel` | function | 14600–14613 | 14 |
| `rGlobalCareerHeader` | function | 14614–14634 | 21 |
| `rSeasonLandingPage` | function | 14636–14650 | 15 |
| `rGlobalOverview` | function | 14652–14703 | 52 |
| `rGlobalAllTimeStats` | function | 14705–14721 | 17 |
| `rGlobalDevelopment` | function | 14723–14761 | 39 |
| `getGlobalPlayerOpponentGameRows` | function | 14764–14791 | 28 |
| `getGlobalOpponentSpecialistProfile` | function | 14793–14821 | 29 |
| `rGlobalDuoNetwork` | function | 14823–15020 | 198 |
| `rGlobalOpponentSpecialist` | function | 15022–15067 | 46 |
| `playerExplainConfidence` | function | 15069–15074 | 6 |
| `playerExplainConfidenceLabel` | function | 15075–15077 | 3 |
| `playerExplainAdd` | function | 15078–15082 | 5 |
| `playerExplainStyleSignature` | function | 15083–15094 | 12 |
| `playerExplainRolePhrase` | function | 15095–15103 | 9 |
| `playerExplainHeadline` | function | 15104–15113 | 10 |
| `playerExplainContextSentence` | function | 15114–15132 | 19 |
| `buildFieldPlayerExplanation` | function | 15133–15207 | 75 |
| `buildGoaliePlayerExplanation` | function | 15208–15261 | 54 |
| `buildPlayerExplanation` | function | 15262–15270 | 9 |
| `buildPlayerIntelligence` | function | 15271–15300 | 30 |
| `rPlayerExplainItems` | function | 15301–15305 | 5 |
| `rPlayerExplanation` | function | 15306–15357 | 52 |
| `rAllTimePlayersPage` | function | 15359–15399 | 41 |
| `rHallOfFamePage` | function | 15401–15489 | 89 |
| `lexiconUniqueKeys` | function | 15494–15501 | 8 |
| `lexiconEntry` | function | 15502–15511 | 10 |
| `rLexiconRows` | function | 15512–15515 | 4 |
| `rLexiconPage` | function | 15516–15688 | 173 |
| `matchcenterClamp` | function | 15690–15694 | 5 |
| `matchcenterNum` | function | 15695–15698 | 4 |
| `clampScore` | function | 15699–15702 | 4 |
| `getScoreLabel` | function | 15703–15711 | 9 |
| `buildConfidence` | function | 15712–15757 | 46 |
| `confidenceCautiousText` | function | 15758–15761 | 4 |
| `explainScore` | function | 15762–15776 | 15 |
| `p1NarrativeKey` | function | 15777–15779 | 3 |
| `scoreNarrative` | function | 15780–15798 | 19 |
| `rankNarratives` | function | 15799–15812 | 14 |
| `getEmptyState` | function | 15813–15824 | 12 |
| `rEmptyState` | function | 15825–15828 | 4 |
| `rScoreBreakdown` | function | 15829–15844 | 16 |
| `matchcenterFmt` | function | 15845–15849 | 5 |
| `matchcenterSigned` | function | 15850–15854 | 5 |
| `matchcenterDateValue` | function | 15855–15859 | 5 |
| `matchcenterDateLabel` | function | 15860–15864 | 5 |
| `matchcenterSortGamesAsc` | function | 15865–15869 | 5 |
| `matchcenterSeasonKeys` | function | 15870–15873 | 4 |
| `matchcenterSeasonLabel` | function | 15874–15876 | 3 |
| `matchcenterSeasonIsUlmTuebingenSgEra` | function | 15877–15880 | 4 |
| `teamAliasSeasonMatches` | function | 15889–15894 | 6 |
| `normalizeTeamKey` | function | 15895–15897 | 3 |
| `teamAliasRuleMatches` | function | 15898–15902 | 5 |
| `isOwnTeam` | function | 15903–15913 | 11 |
| `getCanonicalTeamName` | function | 15914–15919 | 6 |
| `getOpponentAliasKeys` | function | 15920–15940 | 21 |
| `dedupeGamesById` | function | 15941–15949 | 9 |
| `matchcenterIsFreiburgTuebingenTeamName` | function | 15950–15956 | 7 |
| `matchcenterIsUlmTeamName` | function | 15957–15959 | 3 |
| `normalizeTeamNameForMatchcenter` | function | 15960–15964 | 5 |
| `matchcenterDetectUlmSide` | function | 15965–15971 | 7 |
| `matchcenterSeasonHasGames` | function | 15972–15974 | 3 |
| `matchcenterDefaultSeasonKey` | function | 15975–15980 | 6 |
| `matchcenterTeamDisplay` | function | 15981–15983 | 3 |
| `matchcenterTeamKey` | function | 15984–15988 | 5 |
| `matchcenterAliasModeForContext` | function | 15989–15991 | 3 |
| `getOpponentAliasKeysForMatchcenter` | function | 15992–16017 | 26 |
| `matchcenterGameTeamName` | function | 16018–16020 | 3 |
| `matchcenterGameSideForTeam` | function | 16021–16028 | 8 |
| `matchcenterGameSideForOpponentKey` | function | 16029–16039 | 11 |
| `matchcenterGameScore` | function | 16040–16043 | 4 |
| `matchcenterOutcomeForTeam` | function | 16044–16052 | 9 |
| `matchcenterAllGamesForSeason` | function | 16053–16072 | 20 |
| `matchcenterAllGames` | function | 16073–16075 | 3 |
| `matchcenterOpponentMode` | function | 16076–16078 | 3 |
| `getMatchcenterOpponents` | function | 16079–16111 | 33 |
| `getMatchcenterDirectOpponents` | function | 16112–16142 | 31 |
| `matchcenterDirectGames` | function | 16143–16156 | 14 |
| `matchcenterContextGames` | function | 16157–16162 | 6 |
| `matchcenterAnalyzeDirect` | function | 16163–16199 | 37 |
| `matchcenterAnalyzeForm` | function | 16200–16225 | 26 |
| `matchcenterGameKey` | function | 16226–16228 | 3 |
| `matchcenterScoutingGames` | function | 16229–16243 | 15 |
| `matchcenterRosterPlayers` | function | 16244–16247 | 4 |
| `matchcenterPlayerDisplayName` | function | 16248–16253 | 6 |
| `matchcenterFindRosterPlayer` | function | 16254–16258 | 5 |
| `matchcenterPlayerKey` | function | 16259–16264 | 6 |
| `matchcenterEventNumber` | function | 16265–16269 | 5 |
| `matchcenterPenaltyMinutes` | function | 16270–16279 | 10 |
| `matchcenterGoalMinute` | function | 16280–16285 | 6 |
| `matchcenterIsLateGoalEvent` | function | 16286–16290 | 5 |
| `matchcenterIsClutchGoalEvent` | function | 16291–16301 | 11 |
| `matchcenterEnsureOpponentPlayer` | function | 16302–16325 | 24 |
| `matchcenterRegisterPlayerGame` | function | 16326–16328 | 3 |
| `matchcenterAddScoring` | function | 16329–16345 | 17 |
| `matchcenterFinalizeOpponentPlayerProfiles` | function | 16346–16392 | 47 |
| `matchcenterBuildOpponentScouting` | function | 16393–16464 | 72 |
| `matchcenterBuildOpponentPlayerInsights` | function | 16465–16478 | 14 |
| `matchcenterEmptyBuckets` | function | 16479–16481 | 3 |
| `matchcenterUlmScoutingConfidence` | function | 16482–16486 | 5 |
| `matchcenterEnsureUlmPlayer` | function | 16487–16524 | 38 |
| `matchcenterRegisterUlmProfileGame` | function | 16525–16530 | 6 |
| `matchcenterUpdateUlmSeasonRow` | function | 16531–16537 | 7 |
| `matchcenterClassifyUlmGoalEvent` | function | 16538–16548 | 11 |
| `matchcenterAddUlmScoring` | function | 16549–16586 | 38 |
| `matchcenterFinalizeUlmPlayers` | function | 16587–16655 | 69 |
| `matchcenterBuildUlmPlayerScouting` | function | 16656–16710 | 55 |
| `matchcenterBuildUlmPlayerInsights` | function | 16711–16723 | 13 |
| `matchcenterDuoPairKey` | function | 16724–16727 | 4 |
| `matchcenterEnsureOpponentDuo` | function | 16728–16760 | 33 |
| `matchcenterDuoDirectionLabel` | function | 16761–16767 | 7 |
| `matchcenterAddDuoConnection` | function | 16768–16786 | 19 |
| `matchcenterFinalizeOpponentDuos` | function | 16787–16821 | 35 |
| `matchcenterBuildOpponentDuos` | function | 16822–16866 | 45 |
| `matchcenterBuildOpponentDuoInsights` | function | 16867–16880 | 14 |
| `matchcenterEnsureUlmDuo` | function | 16881–16918 | 38 |
| `matchcenterAddUlmDuoConnection` | function | 16919–16937 | 19 |
| `matchcenterFinalizeUlmDuos` | function | 16938–16973 | 36 |
| `matchcenterBuildUlmDuos` | function | 16974–17016 | 43 |
| `matchcenterBuildUlmDuoInsights` | function | 17017–17029 | 13 |
| `matchcenterDirectContextGames` | function | 17030–17032 | 3 |
| `matchcenterSpecialTeamsForGame` | function | 17033–17036 | 4 |
| `matchcenterPersonalPenaltyMinutesForSide` | function | 17037–17045 | 9 |
| `matchcenterPct` | function | 17046–17049 | 4 |
| `matchcenterBuildSpecialTeamsMatchup` | function | 17050–17097 | 48 |
| `matchcenterGoalieKey` | function | 17098–17102 | 5 |
| `matchcenterGoalieFitScore` | function | 17103–17119 | 17 |
| `matchcenterBuildGoalieMatchup` | function | 17120–17162 | 43 |
| `matchcenterGoalAbsSeconds` | function | 17163–17170 | 8 |
| `matchcenterTimeValue` | function | 17171–17178 | 8 |
| `matchcenterEmptyTimingStats` | function | 17179–17187 | 9 |
| `matchcenterWindowForSecond` | function | 17188–17194 | 7 |
| `matchcenterTimingStatsForGames` | function | 17195–17231 | 37 |
| `matchcenterBuildTimingInsights` | function | 17232–17242 | 11 |
| `matchcenterBuildTimingAnalysis` | function | 17243–17253 | 11 |
| `rMatchcenterTimeBars` | function | 17254–17267 | 14 |
| `rMatchcenterTimingStatsCard` | function | 17268–17287 | 20 |
| `rMatchcenterTiming` | function | 17288–17311 | 24 |
| `rMatchcenterTabs` | function | 17327–17329 | 3 |
| `rMatchcenterProfileSection` | function | 17330–17349 | 20 |
| `rMatchcenterFormSection` | function | 17350–17375 | 26 |
| `rMatchcenterDetailsSection` | function | 17376–17383 | 8 |
| `matchcenterResultClass` | function | 17384–17386 | 3 |
| `matchcenterResultLetter` | function | 17387–17389 | 3 |
| `matchcenterUlmTeamLabelForGame` | function | 17390–17394 | 5 |
| `matchcenterGameLine` | function | 17395–17400 | 6 |
| `matchcenterFormLine` | function | 17401–17405 | 5 |
| `matchcenterBuildInsights` | function | 17406–17426 | 21 |
| `rMatchcenterKpi` | function | 17427–17433 | 7 |
| `rMatchcenterFormCard` | function | 17434–17454 | 21 |
| `rMatchcenterGamesList` | function | 17455–17466 | 12 |
| `rMatchcenterWatchCard` | function | 17467–17487 | 21 |
| `rMatchcenterPlayerRow` | function | 17488–17511 | 24 |
| `rMatchcenterRankCard` | function | 17512–17517 | 6 |
| `rMatchcenterUlmImpactCard` | function | 17518–17546 | 29 |
| `rMatchcenterUlmPlayerRow` | function | 17547–17570 | 24 |
| `rMatchcenterUlmRankCard` | function | 17571–17576 | 6 |
| `rMatchcenterUlmScouting` | function | 17577–17613 | 37 |
| `rMatchcenterOpponentScouting` | function | 17614–17649 | 36 |
| `rMatchcenterPlayersTab` | function | 17650–17652 | 3 |
| `rMatchcenterDuoWatchCard` | function | 17653–17672 | 20 |
| `rMatchcenterDuoRow` | function | 17673–17696 | 24 |
| `rMatchcenterDuoRankCard` | function | 17697–17702 | 6 |
| `rMatchcenterUlmDuoWatchCard` | function | 17703–17728 | 26 |
| `rMatchcenterUlmDuoRow` | function | 17729–17751 | 23 |
| `rMatchcenterUlmDuoRankCard` | function | 17752–17757 | 6 |
| `rMatchcenterUlmDuos` | function | 17758–17800 | 43 |
| `rMatchcenterOpponentDuos` | function | 17801–17843 | 43 |
| `rMatchcenterDuosTab` | function | 17844–17846 | 3 |
| `rMatchcenterSpecialCard` | function | 17847–17855 | 9 |
| `rMatchcenterSpecialTeams` | function | 17856–17905 | 50 |
| `rMatchcenterGoalieCard` | function | 17906–17929 | 24 |
| `rMatchcenterGoalieMatchup` | function | 17930–17958 | 29 |
| `matchcenterPlanScoreText` | function | 17959–17962 | 4 |
| `matchcenterPlanRateText` | function | 17963–17967 | 5 |
| `matchcenterPriorityLabel` | function | 17968–17970 | 3 |
| `matchcenterConfidenceClass` | function | 17971–17976 | 6 |
| `matchcenterInferPriority` | function | 17977–17983 | 7 |
| `matchcenterAddPlanItem` | function | 17984–17989 | 6 |
| `matchcenterAddPlanWatch` | function | 17990–17995 | 6 |
| `matchcenterBuildPlanConfidence` | function | 17996–18030 | 35 |
| `matchcenterIntelCurve` | function | 18031–18036 | 6 |
| `matchcenterIntelInverseCurve` | function | 18037–18040 | 4 |
| `matchcenterIntelWeighted` | function | 18041–18051 | 11 |
| `matchcenterIntelRate` | function | 18052–18055 | 4 |
| `matchcenterIntelPct` | function | 18056–18059 | 4 |
| `matchcenterIntelPriorityFromScore` | function | 18060–18065 | 6 |
| `matchcenterIntelPriorityClass` | function | 18066–18071 | 6 |
| `matchcenterIntelPriorityLabel` | function | 18072–18075 | 4 |
| `matchcenterIntelDataLabel` | function | 18076–18078 | 3 |
| `matchcenterBuildIntelligenceDataQuality` | function | 18079–18129 | 51 |
| `matchcenterBuildOpponentDNA` | function | 18130–18242 | 113 |
| `matchcenterDeriveOpponentType` | function | 18243–18260 | 18 |
| `matchcenterIntelPlayerRef` | function | 18261–18273 | 13 |
| `matchcenterIntelDuoRef` | function | 18274–18287 | 14 |
| `matchcenterIntelAddAlarm` | function | 18288–18308 | 21 |
| `matchcenterBuildOpponentAlarm` | function | 18309–18418 | 110 |
| `matchcenterBuildIntelListFromPlan` | function | 18419–18427 | 9 |
| `matchcenterBuildCoachHints` | function | 18428–18443 | 16 |
| `matchcenterBuildIntelHeadline` | function | 18444–18451 | 8 |
| `matchcenterBuildOneThingToWatch` | function | 18452–18464 | 13 |
| `matchcenterBuildIntelligenceSignals` | function | 18465–18511 | 47 |
| `buildMatchIntelligenceFromContext` | function | 18512–18566 | 55 |
| `buildMatchIntelligence` | function | 18567–18588 | 22 |
| `matchcenterCoachCautious` | function | 18589–18591 | 3 |
| `matchcenterCoachAdd` | function | 18592–18600 | 9 |
| `matchcenterCoachGameModel` | function | 18601–18614 | 14 |
| `buildMatchStories` | function | 18615–18644 | 30 |
| `matchcenterCoachPriorityFromAlarm` | function | 18645–18654 | 10 |
| `matchcenterBuildCoachPriorities` | function | 18655–18661 | 7 |
| `matchcenterBuildCoachLevers` | function | 18662–18671 | 10 |
| `matchcenterBuildCoachDangerPatterns` | function | 18672–18679 | 8 |
| `matchcenterBuildCoachIfThen` | function | 18680–18689 | 10 |
| `matchcenterBuildCoachAvoidList` | function | 18690–18699 | 10 |
| `matchcenterBuildCoachActivationHints` | function | 18700–18706 | 7 |
| `matchcenterBuildCoachKeyActors` | function | 18707–18714 | 8 |
| `buildDigitalCoachReport` | function | 18715–18747 | 33 |
| `buildLockerRoomSheet` | function | 18748–18768 | 21 |
| `matchcenterSocialAdd` | function | 18769–18775 | 7 |
| `matchcenterSocialCaption` | function | 18776–18781 | 6 |
| `socialSentence` | function | 18782–18784 | 3 |
| `socialEnsurePeriod` | function | 18785–18788 | 4 |
| `socialFirstUseful` | function | 18789–18791 | 3 |
| `socialPlayerFocusLine` | function | 18792–18798 | 7 |
| `socialDuoFocusLine` | function | 18799–18804 | 6 |
| `socialOpponentLine` | function | 18805–18808 | 4 |
| `socialKeyFactLine` | function | 18809–18818 | 10 |
| `buildMatchdayCaptionBlocks` | function | 18819–18848 | 30 |
| `buildSocialMediaContent` | function | 18849–18897 | 49 |
| `isSyntheticLineupPlayerId` | function | 18903–18905 | 3 |
| `getSyntheticLineupPlayers` | function | 18906–18908 | 3 |
| `getSyntheticLineupRow` | function | 18909–18925 | 17 |
| `getSyntheticLineupRows` | function | 18926–18928 | 3 |
| `getLineupAllRows` | function | 18929–18931 | 3 |
| `lineupRowMeta` | function | 18932–18939 | 8 |
| `getLineupPlayerPool` | function | 18940–18948 | 9 |
| `lineupScore` | function | 18949–18954 | 6 |
| `lineupAverage` | function | 18955–18958 | 4 |
| `lineupLevelLabel` | function | 18959–18962 | 4 |
| `lineupRosterGamesForPlayer` | function | 18965–19012 | 48 |
| `buildLineupExperienceProfile` | function | 19013–19055 | 43 |
| `lineupOpponentDNAForContext` | function | 19056–19067 | 12 |
| `buildLineupOpponentDNAFit` | function | 19068–19111 | 44 |
| `classifyLineIdentity` | function | 19112–19159 | 48 |
| `lineupPlayerProfile` | function | 19160–19235 | 76 |
| `buildLineupAnalysis` | function | 19236–19369 | 134 |
| `buildLineupScoreBreakdowns` | function | 19370–19399 | 30 |
| `buildLineupIntelligence` | function | 19400–19410 | 11 |
| `buildLineAnalysis` | function | 19411–19413 | 3 |
| `lineupRowMap` | function | 19414–19416 | 3 |
| `lineupRankCandidateIds` | function | 19417–19431 | 15 |
| `lineupCombinationIds` | function | 19432–19445 | 14 |
| `lineupStdDev` | function | 19446–19451 | 6 |
| `lineupRoleDnaComplementScore` | function | 19452–19475 | 24 |
| `lineupDirectChemistryScore` | function | 19476–19482 | 7 |
| `lineupEvaluateComplementCandidate` | function | 19483–19560 | 78 |
| `lineupPlayerAnchorScore` | function | 19561–19578 | 18 |
| `buildTeamLineBalance` | function | 19579–19622 | 44 |
| `buildBalancedLineupSet` | function | 19623–19647 | 25 |
| `lineupRecommendationReason` | function | 19648–19656 | 9 |
| `buildLineupRecommendations` | function | 19657–19735 | 79 |
| `recommendLineComplements` | function | 19736–19763 | 28 |
| `matchcenterBuildMatchPlan` | function | 19764–19909 | 146 |
| `rMatchcenterPlanItems` | function | 19910–19927 | 18 |
| `rMatchcenterPlanWatch` | function | 19928–19943 | 16 |
| `rMatchcenterOpponentDNA` | function | 19944–19976 | 33 |
| `rMatchcenterOpponentAlarm` | function | 19977–19998 | 22 |
| `rMatchcenterIntelOverview` | function | 19999–20044 | 46 |
| `rMatchcenterIntelCoachHints` | function | 20045–20058 | 14 |
| `rMatchcenterCoachCardList` | function | 20059–20072 | 14 |
| `rMatchcenterCoachIfThen` | function | 20073–20080 | 8 |
| `rMatchcenterCoachSimpleList` | function | 20081–20085 | 5 |
| `rMatchcenterDigitalCoach` | function | 20086–20150 | 65 |
| `rMatchcenterCopyButton` | function | 20151–20155 | 5 |
| `rMatchcenterLockerList` | function | 20156–20167 | 12 |
| `rMatchcenterLockerRoomSheet` | function | 20168–20223 | 56 |
| `rMatchcenterSocialBlock` | function | 20224–20231 | 8 |
| `matchcenterStoryDownloadFileName` | function | 20232–20241 | 10 |
| `downloadMatchdayStory` | window | 20242–20289 | 48 |
| `rMatchcenterSocialMediaCenter` | function | 20290–20340 | 51 |
| `rLineupScoreRows` | function | 20341–20362 | 22 |
| `rLineupSimpleCards` | function | 20363–20371 | 9 |
| `rMatchcenterLineupBuilder` | function | 20372–20444 | 73 |
| `rLineupMetricPills` | function | 20445–20458 | 14 |
| `rLineupBuilderAvailablePanel` | function | 20459–20506 | 48 |
| `rLineupRecommendationCards` | function | 20507–20521 | 15 |
| `rLineupRecommendationMode` | function | 20522–20555 | 34 |
| `rLineupComplementCards` | function | 20556–20568 | 13 |
| `rLineupTestLine` | function | 20569–20617 | 49 |
| `rLineupTestMode` | function | 20618–20634 | 17 |
| `rLineupBuilderPage` | function | 20635–20668 | 34 |
| `rMatchcenterScoutingSummary` | function | 20669–20712 | 44 |
| `rMatchcenterMatchPlan` | function | 20713–20733 | 21 |
| `matchcenterStoryInitials` | function | 20735–20740 | 6 |
| `matchcenterStoryLogoBase` | function | 20741–20746 | 6 |
| `matchcenterStorySafeLogoUrl` | function | 20747–20753 | 7 |
| `getTeamLogoUrlForStory` | function | 20754–20778 | 25 |
| `matchcenterStoryLogoForOpponent` | function | 20779–20793 | 15 |
| `matchcenterStoryTableRank` | function | 20794–20804 | 11 |
| `matchcenterStoryUlmTableRank` | function | 20805–20811 | 7 |
| `matchcenterStoryRankText` | function | 20812–20815 | 4 |
| `matchcenterStoryInlineStat` | function | 20816–20818 | 3 |
| `matchcenterStoryShortTeamLabel` | function | 20819–20842 | 24 |
| `matchcenterStoryRankRows` | function | 20843–20854 | 12 |
| `matchcenterStoryFormLetters` | function | 20855–20857 | 3 |
| `matchcenterStoryPlayer` | function | 20858–20890 | 33 |
| `matchcenterStoryAddFact` | function | 20891–20897 | 7 |
| `matchcenterStoryFactKey` | function | 20898–20900 | 3 |
| `matchcenterStoryLooksArtificial` | function | 20901–20903 | 3 |
| `matchcenterStoryEstimateFactWeight` | function | 20904–20909 | 6 |
| `matchcenterStoryAddCandidate` | function | 20910–20932 | 23 |
| `matchcenterStoryCategoryLimit` | function | 20933–20936 | 4 |
| `matchcenterStoryNormalizePickOptions` | function | 20937–20947 | 11 |
| `matchcenterStoryCandidateForBudget` | function | 20948–20957 | 10 |
| `matchcenterStoryPickFactItems` | function | 20958–21010 | 53 |
| `matchcenterStoryPickFacts` | function | 21011–21013 | 3 |
| `matchcenterStoryFormRecord` | function | 21014–21019 | 6 |
| `matchcenterStoryCurrentStreak` | function | 21020–21028 | 9 |
| `matchcenterStoryWinlessStreak` | function | 21029–21037 | 9 |
| `matchcenterStoryFormFact` | function | 21038–21048 | 11 |
| `matchcenterStoryFormFactCandidates` | function | 21049–21068 | 20 |
| `matchcenterStoryLateGoalsForOutcome` | function | 21069–21072 | 4 |
| `matchcenterStoryClutchFact` | function | 21073–21087 | 15 |
| `matchcenterStoryPlayerClutchTotal` | function | 21088–21095 | 8 |
| `matchcenterStoryBestClutchPlayer` | function | 21096–21105 | 10 |
| `matchcenterStoryPlayerClutchFact` | function | 21106–21131 | 26 |
| `matchcenterStoryDuoClutchTotal` | function | 21132–21139 | 8 |
| `matchcenterStoryBestClutchDuo` | function | 21140–21149 | 10 |
| `matchcenterStoryDuoClutchFact` | function | 21150–21152 | 3 |
| `matchcenterStoryDuoFact` | function | 21153–21173 | 21 |
| `matchcenterStoryClutchPriority` | function | 21174–21176 | 3 |
| `matchcenterStoryCompetitionLabel` | function | 21177–21180 | 4 |
| `matchcenterStoryShortDuel` | function | 21181–21185 | 5 |
| `matchcenterStoryLastDuelLabel` | function | 21186–21189 | 4 |
| `matchcenterStoryDirectFactCandidates` | function | 21190–21211 | 22 |
| `matchcenterStoryPlanFactCandidates` | function | 21212–21224 | 13 |
| `matchcenterStoryCategoryForPlanFact` | function | 21225–21233 | 9 |
| `buildMatchcenterStoryPreviewData` | function | 21234–21345 | 112 |
| `matchcenterStoryNameClass` | function | 21346–21351 | 6 |
| `matchcenterStoryVisibleFacts` | function | 21352–21382 | 31 |
| `rMatchcenterStoryLogo` | function | 21383–21387 | 5 |
| `rMatchcenterStoryForm` | function | 21388–21392 | 5 |
| `rMatchcenterStoryPlayerCard` | function | 21393–21400 | 8 |
| `rMatchcenterStoryPreview` | function | 21401–21470 | 70 |
| `rMatchcenterStoryFrame` | function | 21471–21476 | 6 |
| `fitMatchcenterStoryLayout` | function | 21477–21519 | 43 |
| `rMatchcenterPage` | function | 21520–21667 | 148 |
| `rTeamPage` | function | 21668–21978 | 311 |
| `exportExcel` | function | 21983–22004 | 22 |
| `render` | function | 22010–22027 | 18 |
| `_render` | function | 22028–22192 | 165 |
| `uiFormatNumber` | function | 22226–22230 | 5 |
| `uiReliabilityDots` | function | 22239–22246 | 8 |
| `uiDeltaIndicator` | function | 22254–22260 | 7 |
| `uiInfoIcon` | function | 22272–22276 | 5 |
| `uiKennzahlKachel` | function | 22284–22295 | 12 |
| `uiKernaussage` | function | 22304–22310 | 7 |
| `uiHinweisKarte` | function | 22318–22330 | 13 |
| `uiRangliste` | function | 22340–22357 | 18 |
| `uiVerlauf` | function | 22368–22387 | 20 |
| `uiIntervallBalken` | function | 22394–22406 | 13 |
| `uiMethodenbox` | function | 22413–22422 | 10 |
| `uiNotiz` | function | 22430–22434 | 5 |
| `uiPlatzhalter` | function | 22442–22447 | 6 |
| `uiObjektseiteSortTabs` | function | 22492–22500 | 9 |
| `uiObjektseite` | function | 22510–22543 | 34 |
| `mainNavActiveKeyForPage` | function | 22600–22605 | 6 |
| `goToMainNavPoint` | window | 22606–22612 | 7 |
| `rMainNav` | function | 22613–22617 | 5 |
| `rMainNavBottom` | function | 22635–22642 | 8 |
| `openOverview` | window | 22652–22660 | 9 |
| `switchOverviewSeason` | window | 22669–22675 | 7 |
| `openMatchdayTimeline` | window | 22703–22710 | 8 |
| `openMatchday` | window | 22711–22720 | 10 |
| `switchMatchdaySeason` | window | 22722–22727 | 6 |
| `matchdayUlmGames` | function | 22729–22731 | 3 |
| `matchdayGameCardHtml` | function | 22732–22742 | 11 |
| `rMatchdayTimelineRow` | function | 22744–22751 | 8 |
| `rMatchdayTimelinePage` | function | 22752–22762 | 11 |
| `rMatchdayDetailPage` | function | 22763–22798 | 36 |
| `rMatchdayPage` | function | 22799–22805 | 7 |
| `overviewMatchdayStartMs` | function | 22824–22829 | 6 |
| `overviewMatchdayEndMs` | function | 22830–22835 | 6 |
| `detectOverviewPhase` | function | 22836–22861 | 26 |
| `getSeasonDataState` | function | 22868–22878 | 11 |
| `parseSeasonDataState` | function | 22879–22887 | 9 |
| `isNewSeasonDataState` | function | 22889–22891 | 3 |
| `recordOverviewVisit` | function | 22898–22907 | 10 |
| `overviewOpponentLabel` | function | 22908–22912 | 5 |
| `overviewLastMatchdayText` | function | 22913–22916 | 4 |
| `overviewNextMatchdayHtml` | function | 22917–22921 | 5 |
| `overviewCompactTableHtml` | function | 22929–22935 | 7 |
| `overviewFormHtml` | function | 22937–22951 | 15 |
| `overviewSeasonBilanzHtml` | function | 22952–22958 | 7 |
| `overviewSeasonAwardHtml` | function | 22960–22969 | 10 |
| `overviewRecordHtml` | function | 22971–22976 | 6 |
| `overviewCrossSeasonTrendHtml` | function | 22978–22986 | 9 |
| `overviewOpponentPreviewHtml` | function | 22987–22991 | 5 |
| `overviewMatchcenterLinkHtml` | function | 22992–22994 | 3 |
| `overviewLineupLinkHtml` | function | 22995–22997 | 3 |
| `overviewRankChangeTile` | function | 23014–23031 | 18 |
| `buildOverviewCards` | function | 23040–23080 | 41 |
| `rOverviewPage` | function | 23090–23101 | 12 |
| `openLigaGegner` | window | 23102–23105 | 4 |
| `rLigaGegnerPlaceholderPage` | function | 23106–23111 | 6 |
| `rAsOfSelector` | function | 23123–23135 | 13 |
| `setContextAsOf` | window | 23136–23147 | 12 |
| `rSeasonDataPreviewContextHint` | function | 23158–23166 | 9 |
| `rSeasonDataStateContextHint` | function | 23175–23181 | 7 |
| `rContextBar` | function | 23206–23224 | 19 |
| `rIaShell` | function | 23226–23228 | 3 |
| `globalSearchTokens` | function | 23245–23248 | 4 |
| `globalSearchEntries` | function | 23250–23263 | 14 |
| `globalSearchPlayerScore` | function | 23264–23271 | 8 |
| `globalSearchMatchdayScore` | function | 23273–23285 | 13 |
| `globalSearchMatch` | function | 23287–23298 | 12 |
| `globalSearchIsEditableTarget` | function | 23299–23303 | 5 |
| `globalSearchKeyAction` | function | 23305–23319 | 15 |
| `rGlobalSearchToggle` | function | 23320–23322 | 3 |
| `rGlobalSearchResultsHtml` | function | 23323–23333 | 11 |
| `rGlobalSearchPanelHtml` | function | 23334–23336 | 3 |
| `paintGlobalSearchResults` | function | 23337–23344 | 8 |
| `openGlobalSearch` | window | 23345–23369 | 25 |
| `closeGlobalSearch` | window | 23370–23377 | 8 |
| `onGlobalSearchInput` | window | 23378–23383 | 6 |
| `moveGlobalSearch` | function | 23384–23389 | 6 |
| `activateGlobalSearchResult` | window | 23390–23399 | 10 |
| `globalSearchOnKeydown` | function | 23400–23421 | 22 |
| `initGlobalSearch` | function | 23422–23426 | 5 |
| `rToolMenu` | function | 23448–23451 | 4 |
| `toolMenuElements` | function | 23452–23454 | 3 |
| `toolMenuItemElements` | function | 23455–23457 | 3 |
| `isToolMenuOpen` | function | 23458–23461 | 4 |
| `openToolMenu` | window | 23462–23469 | 8 |
| `closeToolMenu` | window | 23470–23476 | 7 |
| `toggleToolMenu` | window | 23477–23480 | 4 |
| `activateToolMenuItem` | window | 23481–23488 | 8 |
| `toolMenuOnKeydown` | function | 23489–23512 | 24 |
| `toolMenuOnClick` | function | 23513–23519 | 7 |
| `initToolMenu` | function | 23520–23523 | 4 |

## Alphabetisches Register

| Name | Art | Zeile |
|---|---|---|
| `_render` | function | 22028 |
| `acceptEinsatzCenterRosterSuggestion` | window | 7928 |
| `activateGlobalSearchResult` | window | 23390 |
| `activateToolMenuItem` | window | 23481 |
| `addComparisonDuo` | window | 13441 |
| `addComparisonDuoFromSelection` | window | 13433 |
| `addComparisonItem` | window | 13341 |
| `addDuoTeamGame` | function | 11453 |
| `addEinsatzCenterExistingGroup` | window | 7945 |
| `addEinsatzCenterGroupPlayer` | window | 8013 |
| `addEinsatzCenterNewGroup` | window | 7954 |
| `addEinsatzCenterRosterPlayer` | window | 7894 |
| `addGoalieGameToStats` | function | 4789 |
| `addGoalieSpecialTeamsGameToStats` | function | 4759 |
| `addLineupBuilderPlayerToActiveLine` | window | 2287 |
| `addLineupBuilderPlayerToLine` | window | 2277 |
| `addLineupPlayer` | window | 2223 |
| `addRosterImpactGameToStats` | function | 11970 |
| `addSelectedComparisonItem` | window | 13349 |
| `addSyntheticLineupPlayer` | window | 2303 |
| `addUnique` | function | 3976 |
| `aggregateAllTimeDuos` | function | 5132 |
| `aggregateAllTimePlayers` | function | 4243 |
| `aggregateAlltimeSpecialTeams` | function | 4739 |
| `aggregateGoalieAlltimeStats` | function | 4972 |
| `aggregateSeasonStats` | function | 5144 |
| `analysisCacheContext` | function | 2129 |
| `analysisCacheKey` | function | 2163 |
| `annotateSpecialTeamsGoalEvent` | function | 4521 |
| `antiSynergyDeltaClass` | function | 12137 |
| `antiSynergyImpactScore` | function | 12052 |
| `antiSynergyPartnerIsSgOnly` | function | 12167 |
| `antiSynergySigned` | function | 12141 |
| `appendSeasonGameDiagnostics` | function | 2640 |
| `applyAppHash` | function | 3743 |
| `applyCurrentSeasonCoverHighlight` | function | 6398 |
| `applyGlobalPageFromHash` | function | 3710 |
| `applySeasonContext` | function | 2392 |
| `applySeasonScoringToRegistry` | function | 4134 |
| `asOfCacheKeyPart` | function | 2157 |
| `asOfEquals` | function | 3414 |
| `assignStatus` | function | 5982 |
| `avgOrNull` | function | 4281 |
| `backToComparisonModeSelect` | window | 13369 |
| `backToHome` | window | 2340 |
| `buildAlltimePlayerDashModel` | function | 14494 |
| `buildAnnotatedGoalEventsForGame` | function | 11059 |
| `buildAppHash` | function | 3560 |
| `buildBalancedLineupSet` | function | 19623 |
| `buildBestThirdManOptions` | function | 10947 |
| `buildComparisonDataset` | function | 13810 |
| `buildComparisonExtraMetrics` | function | 13665 |
| `buildComparisonSummary` | function | 14160 |
| `buildConfidence` | function | 15712 |
| `buildDigitalCoachReport` | function | 18715 |
| `buildDirectDuoLookupForPlayer` | function | 10905 |
| `buildDryRunReport` | function | 6622 |
| `buildDuoAntiSynergy` | function | 12127 |
| `buildDuoComparison` | function | 13454 |
| `buildDuoCompatibility` | function | 11565 |
| `buildDuoDirectProduction` | function | 11429 |
| `buildDuoFloorCeiling` | function | 11340 |
| `buildDuoGapAnalysis` | function | 11548 |
| `buildDuoNetworkContext` | function | 11524 |
| `buildDuoOpponentAdjusted` | function | 11511 |
| `buildDuoProAnalysis` | function | 11622 |
| `buildDuoReplacementOptions` | function | 11612 |
| `buildDuoUntestedPotential` | function | 11588 |
| `buildDuoUsageRate` | function | 11600 |
| `buildDuoWarnings` | function | 11382 |
| `buildDuoWithWithoutImpact` | function | 11477 |
| `buildEinsatzCenterDraftExport` | function | 8074 |
| `buildFieldPlayerExplanation` | function | 15133 |
| `buildGlobalPageHash` | function | 3577 |
| `buildGoalieAnalysisModel` | function | 9866 |
| `buildGoalieComparisonDataset` | function | 13759 |
| `buildGoalieGameRecord` | function | 4841 |
| `buildGoaliePlayerExplanation` | function | 15208 |
| `buildGoalieRoleProfile` | function | 10089 |
| `buildGoalieStatsForSeason` | function | 4891 |
| `buildHallOfFameIntroTitle` | function | 8773 |
| `buildHashStringFromParsed` | function | 3592 |
| `buildIdentityProfiles` | function | 5704 |
| `buildLineAnalysis` | function | 19411 |
| `buildLineupAnalysis` | function | 19236 |
| `buildLineupExperienceProfile` | function | 19013 |
| `buildLineupIntelligence` | function | 19400 |
| `buildLineupOpponentDNAFit` | function | 19068 |
| `buildLineupRecommendations` | function | 19657 |
| `buildLineupScoreBreakdowns` | function | 19370 |
| `buildLockerRoomSheet` | function | 18748 |
| `buildMatchcenterStoryPreviewData` | function | 21234 |
| `buildMatchdayCaptionBlocks` | function | 18819 |
| `buildMatchdays` | function | 3295 |
| `buildMatchIntelligence` | function | 18567 |
| `buildMatchIntelligenceFromContext` | function | 18512 |
| `buildMatchStories` | function | 18615 |
| `buildMomentumSwingStats` | function | 11334 |
| `buildMomentumSwingStatsRaw` | function | 11263 |
| `buildOpponentIntelligence` | function | 10744 |
| `buildOverviewCards` | function | 23040 |
| `buildPlayerDataFoundation` | function | 5161 |
| `buildPlayerEvents` | function | 5215 |
| `buildPlayerExplanation` | function | 15262 |
| `buildPlayerIdentity` | function | 3987 |
| `buildPlayerIntelligence` | function | 15271 |
| `buildRecencyWeightedGlobalIdentityProfile` | function | 12667 |
| `buildRegistry` | function | 5184 |
| `buildResponseGoalStats` | function | 11251 |
| `buildResponseGoalStatsRaw` | function | 11202 |
| `buildRosterImpactAnalysis` | function | 12067 |
| `buildSeasonDataPreviewChanges` | function | 6727 |
| `buildSeasonDuos` | function | 5088 |
| `buildSeasonPlayerDashModel` | function | 14457 |
| `buildSocialMediaContent` | function | 18849 |
| `buildSoloDuoProfile` | function | 5473 |
| `buildSpecialTeamsForGame` | function | 4536 |
| `buildSpecialTeamsForSeason` | function | 4730 |
| `buildStandings` | function | 3854 |
| `buildStaticSeasonDataBlock` | function | 6446 |
| `buildTeamLineBalance` | function | 19579 |
| `cachedAnalysis` | function | 2167 |
| `cancelDuoProPicker` | window | 11820 |
| `cancelEinsatzCenterEdit` | window | 7875 |
| `cancelHallOfFameIntro` | function | 8862 |
| `clampScore` | function | 15699 |
| `classicTagLabel` | function | 9016 |
| `classifyGameForStats` | function | 3136 |
| `classifyLineIdentity` | function | 19112 |
| `cleanText` | function | 2488 |
| `cleanupHallOfFameIntro` | function | 8802 |
| `clearAnalysisCache` | function | 2126 |
| `clearComparison` | window | 13360 |
| `clearComparisonDuos` | window | 13448 |
| `clearLineupAvailable` | window | 2276 |
| `clearLineupBuilderLine` | window | 2295 |
| `clearLineupPlayers` | window | 2230 |
| `clearlyAboveAverage` | function | 5661 |
| `clonePlain` | function | 4378 |
| `closeGlobalSearch` | window | 23370 |
| `closeMatchcenterStoryPreview` | window | 2195 |
| `closeToolMenu` | window | 23470 |
| `clutchText` | function | 5545 |
| `collectAssistEventRefs` | function | 2944 |
| `compareGamesChronologically` | function | 3274 |
| `comparisonDuoContext` | function | 13374 |
| `comparisonEventGameKey` | function | 13652 |
| `comparisonEventPhaseLabel` | function | 13655 |
| `comparisonFmt` | function | 13142 |
| `comparisonItemKey` | function | 13120 |
| `comparisonJsArg` | function | 13131 |
| `comparisonNum` | function | 13134 |
| `comparisonOpponentStrengthTier` | function | 13659 |
| `comparisonPct` | function | 13138 |
| `comparisonPctFmt` | function | 13146 |
| `comparisonVariantValue` | function | 13263 |
| `composeIdentityText` | function | 5936 |
| `computeCurrentAppHash` | function | 3612 |
| `computeEinsatzCenterStats` | function | 7088 |
| `computeMetrics` | function | 5319 |
| `computeRosterStatus` | function | 5962 |
| `confidenceCautiousText` | function | 15758 |
| `confirmDuoProSelection` | window | 11825 |
| `confirmEinsatzCenterCombo` | window | 8046 |
| `copyMatchcenterText` | window | 2197 |
| `countBy` | function | 10491 |
| `countCaptainAppearances` | function | 5944 |
| `countGoalieAppearances` | function | 5958 |
| `countMomentumClusters` | function | 5578 |
| `countPlayedUlmGames` | function | 2864 |
| `createPlayerAnalysisProfile` | function | 3913 |
| `createSeasonBucket` | function | 1751 |
| `decodeCp1252AsUtf8` | function | 2433 |
| `decodeHashSegmentSafe` | function | 3485 |
| `dedupeGamesById` | function | 15941 |
| `dedupeIdentityProfileTags` | function | 12744 |
| `deriveAsOfForSeason` | function | 3210 |
| `deriveLineupUlmPlayerIds` | function | 7585 |
| `deriveLineupValidPlayerIds` | function | 7561 |
| `derivePlayerStatus` | function | 4016 |
| `detectOverviewPhase` | function | 22836 |
| `detectSide` | const-arrow | 2573 |
| `detectTypes` | function | 5453 |
| `detectUlmSide` | function | 2566 |
| `diagnoseGameDuplicates` | function | 2618 |
| `diagnosticError` | function | 6197 |
| `diffGameIds` | function | 6569 |
| `difficultConnectionConfidence` | function | 10881 |
| `discardEinsatzCenterAutosave` | function | 7484 |
| `discardSeasonDataPreview` | function | 6826 |
| `dismissEinsatzCenterRosterSuggestion` | window | 7917 |
| `downloadMatchdayStory` | window | 20242 |
| `duoProContextSeasonKey` | function | 11404 |
| `duoProDomId` | function | 11781 |
| `duoProPairKey` | function | 11401 |
| `duoProPickerMessage` | function | 11787 |
| `duoProPickerOpen` | function | 11784 |
| `duoProPlayer` | function | 11418 |
| `duoProResolveCandidate` | function | 11800 |
| `duoProSelectionPayload` | function | 11809 |
| `duoScopeSeasonKeys` | function | 10923 |
| `einsatzCenterAutosaveDraft` | function | 7400 |
| `einsatzCenterAutosaveInfoText` | function | 7506 |
| `einsatzCenterAutosaveKey` | function | 7311 |
| `einsatzCenterCanonicalJson` | function | 7644 |
| `einsatzCenterComputeBaseHash` | function | 7659 |
| `einsatzCenterCurrentRawBaseHash` | function | 7386 |
| `einsatzCenterDeserializeAutosave` | function | 7346 |
| `einsatzCenterDraftInView` | function | 7215 |
| `einsatzCenterDraftIsEmpty` | function | 7323 |
| `einsatzCenterDraftStaleHint` | function | 7229 |
| `einsatzCenterInspectAutosave` | function | 7435 |
| `einsatzCenterIsPlainObject` | function | 7340 |
| `einsatzCenterSerializeDraft` | function | 7327 |
| `einsatzCenterSha256Hex` | function | 7654 |
| `einsatzCenterSoftIssues` | function | 7668 |
| `einsatzCenterStorageRead` | function | 7312 |
| `einsatzCenterStorageRemove` | function | 7318 |
| `einsatzCenterStorageWrite` | function | 7315 |
| `emptyDuoTeamImpactStats` | function | 11450 |
| `emptyFieldRoleSeasonStats` | function | 3972 |
| `emptyGoalieAlltimeStats` | function | 3945 |
| `emptyGoalieSeasonStats` | function | 3923 |
| `emptyGoalieSpecialTeamsStats` | function | 3960 |
| `emptyPlayerSeasonStats` | function | 3917 |
| `emptyRosterImpactStats` | function | 11959 |
| `emptySpecialTeamsStats` | function | 4337 |
| `ensureAppLoaded` | function | 8716 |
| `ensureEinsatzCenterDraft` | function | 7251 |
| `ensureExternalSeasonData` | function | 6424 |
| `ensureFieldRoleSeasonStats` | function | 4082 |
| `ensureGlobalDataLoaded` | function | 8644 |
| `ensureGoalieSeasonStats` | function | 4077 |
| `ensureHallOfFameIntroOverlay` | function | 8740 |
| `ensureLineupDataLoaded` | function | 6934 |
| `ensureLineupGroupsRegistryLoaded` | function | 6959 |
| `ensureRmDuo` | function | 11182 |
| `ensureRmPlayer` | function | 11176 |
| `escAttr` | function | 8989 |
| `escHtml` | function | 12763 |
| `eventMatchesTeams` | function | 5539 |
| `explainScore` | function | 15762 |
| `exportEinsatzCenterDraft` | window | 8088 |
| `exportExcel` | function | 21983 |
| `fallbackIdentityProfile` | function | 9024 |
| `fetchJson` | function | 6241 |
| `fetchJsonLegacy` | function | 6173 |
| `fetchJsonWithDiagnostics` | function | 6232 |
| `fetchSeasonGameRaw` | function | 6267 |
| `fetchTextWithDiagnostics` | function | 6202 |
| `fileNameForLineupSeasonKey` | function | 6916 |
| `filterComparisonDuoSuggestions` | window | 13406 |
| `filterComparisonPlayers` | window | 13317 |
| `filterLineupBuilderAvailable` | window | 2324 |
| `filterLineupPlayers` | window | 2231 |
| `filterPlayerSuggestions` | function | 13381 |
| `filterPureSGPlayers` | function | 9662 |
| `finalizeDuoTeamImpactStats` | function | 11469 |
| `finalizeGoalieSeasonStats` | function | 4774 |
| `finalizeMomentumStats` | function | 11257 |
| `finalizePlayerRegistrySeason` | function | 4157 |
| `finalizeResponseStats` | function | 11188 |
| `finalizeRosterImpactStats` | function | 11962 |
| `finalizeSpecialTeamsStats` | function | 4381 |
| `findDuplicateGameIds` | function | 6488 |
| `findLineupGameContext` | function | 6993 |
| `findLoadedSeasonPlayer` | function | 9625 |
| `finishHallOfFameIntro` | function | 8829 |
| `finiteNumbers` | function | 4278 |
| `fitMatchcenterStoryLayout` | function | 21477 |
| `fixKnownUiTransliterations` | function | 2483 |
| `fixMojibakeText` | function | 2491 |
| `formatDateDE` | function | 3368 |
| `formatDiagnosticAttempt` | function | 6248 |
| `formatGameLoadError` | function | 6261 |
| `formatStatus` | function | 6245 |
| `gameClassificationStatusLabel` | function | 2632 |
| `gameDaySortValue` | function | 4447 |
| `gameResult` | function | 3843 |
| `gameScore` | function | 3106 |
| `gameStableId` | function | 2615 |
| `gameStatusText` | function | 3099 |
| `generatePlayerInsights` | function | 9487 |
| `getActiveAlltimeSeasonKeys` | function | 10663 |
| `getActiveSeasonKey` | function | 2352 |
| `getAllLoadedSeasonGames` | function | 10856 |
| `getAlltimeAggregatedStyleProfile` | function | 14337 |
| `getAllTimeCoverStats` | function | 8595 |
| `getAllTimeDuoRows` | function | 10811 |
| `getAllTimeDuoRowsForPlayer` | function | 10549 |
| `getAllTimeGamesPlayedRows` | function | 10589 |
| `getAllTimeIdentityStandings` | function | 12631 |
| `getAllTimeMainPlayerRows` | function | 9666 |
| `getAllTimeOpponentIntelligence` | function | 12552 |
| `getAllTimeOpponentNames` | function | 2543 |
| `getAllTimeOpponentTopScorers` | function | 12560 |
| `getAllTimePenaltyRows` | function | 10614 |
| `getAllTimePlayerRows` | function | 9634 |
| `getAlltimeRank` | function | 13076 |
| `getAlltimeRecencyWeight` | function | 10674 |
| `getAllTimeSgOnlyRows` | function | 9669 |
| `getAssistDiagnostics` | function | 5033 |
| `getAssistPlayersFromEvent` | function | 2972 |
| `getCanonicalTeamName` | function | 15914 |
| `getCarryPerformanceRows` | function | 10560 |
| `getComparisonAlltimeTeamGoals` | function | 13167 |
| `getComparisonAlltimeTrend` | function | 13241 |
| `getComparisonChemistryFromEvents` | function | 13175 |
| `getComparisonClutchFromEvents` | function | 13180 |
| `getComparisonCurrentSelection` | function | 13306 |
| `getComparisonEventsForItem` | function | 13624 |
| `getComparisonPlayerOptions` | function | 13248 |
| `getComparisonPlayerRow` | function | 13149 |
| `getComparisonProfile` | function | 13210 |
| `getComparisonRosterGames` | function | 13644 |
| `getComparisonRosterGamesForSeason` | function | 13627 |
| `getComparisonSeasonEvents` | function | 13170 |
| `getComparisonSeasonLabel` | function | 13152 |
| `getComparisonSeasonTrend` | function | 13215 |
| `getComparisonStyleProfile` | function | 13185 |
| `getComparisonTeamGoalsForSeason` | function | 13155 |
| `getComparisonVariantsForPlayer` | function | 13266 |
| `getDifficultConnectionRowsForPlayer` | function | 11914 |
| `getDuoDirectScorerGameCounts` | function | 10978 |
| `getDuoFieldPlayerRows` | function | 11407 |
| `getDuoRowsForPlayerScope` | function | 10886 |
| `getDuoScorerCountsWithCandidate` | function | 10927 |
| `getDuoSharedFieldRows` | function | 11423 |
| `getEffectiveLineupData` | function | 7201 |
| `getEinsatzCenterGameDraft` | function | 7273 |
| `getEmptyState` | function | 15813 |
| `getFieldGameIdsForPlayer` | function | 2773 |
| `getFurtherSameDayUlmGames` | function | 4463 |
| `getGameDurationMinutes` | function | 4442 |
| `getGameId` | function | 6482 |
| `getGlobalAllTimeSnapshot` | function | 2384 |
| `getGlobalIdentityProfile` | function | 12716 |
| `getGlobalLoadableSeasonKeys` | function | 8588 |
| `getGlobalOpponentSpecialistProfile` | function | 14793 |
| `getGlobalPlayerBestSeason` | function | 10542 |
| `getGlobalPlayerMilestones` | function | 10725 |
| `getGlobalPlayerOpponentGameRows` | function | 14764 |
| `getGlobalPlayerPeakGame` | function | 10531 |
| `getGlobalPlayerTeamRecord` | function | 10505 |
| `getGlobalProfileEvents` | function | 10478 |
| `getGlobalRookieMilestone` | function | 10714 |
| `getGlobalRookieSeasonKey` | function | 10700 |
| `getGlobalSeasonStatRows` | function | 13060 |
| `getGlobalTopScorerMilestones` | function | 10687 |
| `getGoalieComparisonAlltimeTrend` | function | 13723 |
| `getGoalieComparisonSeasonTrend` | function | 13740 |
| `getGoalieDiagnostics` | function | 5019 |
| `getGoalieDnaRows` | function | 10167 |
| `getGoalieGameIdsForPlayer` | function | 2780 |
| `getGoalieOpponentName` | function | 4318 |
| `getGoalieOpponentTier` | function | 4322 |
| `getGoalScorerFromEvent` | function | 2938 |
| `getHallGoalieData` | function | 12926 |
| `getHallOfFamePlayerIdSet` | function | 10474 |
| `getHallOfFamePlayerRows` | function | 10471 |
| `getHallOfFameStats` | function | 12586 |
| `getJerseyNumber` | function | 2877 |
| `getLineupAllRows` | function | 18929 |
| `getLineupPlayerPool` | function | 18940 |
| `getLoadedSeasonPlayerUi` | function | 10500 |
| `getLoadedSeasonPointsByName` | function | 10444 |
| `getMatchcenterDirectOpponents` | function | 16112 |
| `getMatchcenterOpponents` | function | 16079 |
| `getOpponentAliasKeys` | function | 15920 |
| `getOpponentAliasKeysForMatchcenter` | function | 15992 |
| `getOppStrength` | function | 3895 |
| `getOrCreatePlayerProfile` | function | 4025 |
| `getPenaltyBasePersonalMinutes` | function | 4478 |
| `getPenaltyDisciplineMinutes` | function | 4496 |
| `getPenaltyDisciplineType` | function | 4434 |
| `getPenaltyPersonalMinutes` | function | 4486 |
| `getPenaltySpecialTeamsMinutes` | function | 4475 |
| `getPhaseIndex` | function | 5304 |
| `getPhaseKey` | function | 3004 |
| `getPlayedUlmGames` | function | 2855 |
| `getPlayerAlltimeFieldGames` | function | 2817 |
| `getPlayerAlltimeGoalieGames` | function | 2820 |
| `getPlayerAlltimeRoleGames` | function | 2798 |
| `getPlayerAlltimeStats` | function | 9677 |
| `getPlayerAlltimeTotalGames` | function | 2823 |
| `getPlayerFieldGames` | function | 2787 |
| `getPlayerGoalieAlltimeStats` | function | 9698 |
| `getPlayerGoalieGames` | function | 2791 |
| `getPlayerGoalieSeasonStats` | function | 9693 |
| `getPlayerRegistryProfile` | function | 9685 |
| `getPlayerRoleAvailability` | function | 9728 |
| `getPlayerSeasonRoleGameSummary` | function | 2832 |
| `getPlayerSeasonStats` | function | 9672 |
| `getPlayerSourceId` | function | 2874 |
| `getPreClubHistoryPlayerNames` | function | 2607 |
| `getPreviousSeasonKey` | function | 10399 |
| `getRelevantSeasonGames` | function | 3178 |
| `getRosterEntryRegistryProfile` | function | 10877 |
| `getRosterGameIdsForPlayer` | function | 2714 |
| `getRosterImpactPlayerEventLookup` | function | 11980 |
| `getRosterImpactPlayerGames` | function | 12001 |
| `getRosterStatus` | function | 10680 |
| `getScoreLabel` | function | 15703 |
| `getSeasonApiBaseUrl` | function | 1776 |
| `getSeasonData` | function | 2355 |
| `getSeasonDataPreview` | function | 6832 |
| `getSeasonDataState` | function | 22868 |
| `getSeasonIdentityProfile` | function | 10634 |
| `getSeasonmanagerRosterSuggestion` | function | 7615 |
| `getSeasonMatchdays` | function | 3345 |
| `getSeasonOriginBaseUrl` | function | 1796 |
| `getSeasonPlayerFieldBasis` | function | 9093 |
| `getSeasonScopedIdentityProfile` | function | 9120 |
| `getSeasonStatsAsOf` | function | 3248 |
| `getSeasonTeamGameIds` | function | 2871 |
| `getSeasonTeamGames` | function | 2867 |
| `getSeasonUiPlayerForProfile` | function | 10630 |
| `getSpecialTeamsDiagnostics` | function | 5026 |
| `getSpecialTeamsPenaltyChunks` | function | 4499 |
| `getStaticSeasonGames` | function | 6331 |
| `getStoredLastView` | function | 3691 |
| `getSyntheticLineupPlayers` | function | 18906 |
| `getSyntheticLineupRow` | function | 18909 |
| `getSyntheticLineupRows` | function | 18926 |
| `getTeamAllTimeRecords` | function | 12510 |
| `getTeamLogoUrlForStory` | function | 20754 |
| `getUlmTeamStatus` | function | 2561 |
| `getUniqueAllTimeOpponentNames` | function | 2551 |
| `globalSearchEntries` | function | 23250 |
| `globalSearchIsEditableTarget` | function | 23299 |
| `globalSearchKeyAction` | function | 23305 |
| `globalSearchMatch` | function | 23287 |
| `globalSearchMatchdayScore` | function | 23273 |
| `globalSearchOnKeydown` | function | 23400 |
| `globalSearchPlayerScore` | function | 23264 |
| `globalSearchTokens` | function | 23245 |
| `goalieApplySampleConfidence` | function | 9851 |
| `goalieBucketLooseSum` | function | 9859 |
| `goalieBucketRows` | function | 9771 |
| `goalieClampScore` | function | 9816 |
| `goalieDetailFirstTime` | function | 9795 |
| `goalieDnaKey` | function | 10076 |
| `goalieDnaValue` | function | 10081 |
| `goalieEntryRecognitionReason` | function | 2737 |
| `goalieEventAbsSeconds` | function | 4295 |
| `goalieEventSecondInPeriod` | function | 9802 |
| `goalieGameDurationSeconds` | function | 4301 |
| `goalieGameStateBeforeGoal` | function | 4306 |
| `goalieInverseScore` | function | 9820 |
| `goalieNum` | function | 9757 |
| `goaliePctText` | function | 9808 |
| `goaliePositiveCurveScore` | function | 9836 |
| `goaliePositiveScore` | function | 9828 |
| `goalieSafeNum` | function | 9812 |
| `goalieStateGoals` | function | 10088 |
| `goalieStdDev` | function | 9789 |
| `goalieTierMeta` | function | 9780 |
| `goalieTime` | function | 9763 |
| `goalieTopRow` | function | 9777 |
| `goalieWeightedScore` | function | 9845 |
| `goToMainNavPoint` | window | 22606 |
| `hallGoalieExplainForLabel` | function | 12963 |
| `hallGoalieNameHtml` | function | 12942 |
| `hallGoalieNum` | function | 12828 |
| `hallGoaliePkStats` | function | 12854 |
| `hallGoalieRowFromStats` | function | 12893 |
| `hallGoalieSeasonLabel` | function | 12842 |
| `hallGoalieSeasonScore` | function | 12873 |
| `hallGoalieTime` | function | 12834 |
| `hallGoalieTooltip` | function | 12959 |
| `hallGoalieTopteamStats` | function | 12866 |
| `handleComparisonDuoSearchKey` | window | 13414 |
| `hasEmbeddedSeasonData` | function | 8585 |
| `hashSegmentToSeasonKey` | function | 3398 |
| `hasSeasonRole` | function | 5688 |
| `hasSeasonSource` | function | 8581 |
| `hofIntroDelay` | function | 8737 |
| `identityClutchGoalsVsTeams` | function | 5569 |
| `identityDecisiveGoalsVsTeams` | function | 5572 |
| `identityGoalsVsTeams` | function | 5566 |
| `identityInputs` | function | 5603 |
| `identityLateGoalsVsTeams` | function | 5575 |
| `identityOpponentGroups` | function | 5531 |
| `identityPartnerStats` | function | 5517 |
| `identityPointsVsTeams` | function | 5563 |
| `incGoalieBucket` | function | 4291 |
| `incrementUniqueCounter` | function | 3980 |
| `initGlobalSearch` | function | 23422 |
| `initHashRouting` | function | 3822 |
| `initToolMenu` | function | 23520 |
| `invalidateGlobalIdentityCache` | function | 2181 |
| `isActiveAlltimeSeasonStats` | function | 10649 |
| `isComebackRelevantGoal` | function | 5559 |
| `isDecisiveGoal` | function | 5551 |
| `isEinsatzCenterGameFromDraft` | function | 7210 |
| `isExcludedGoalieAppearance` | function | 2747 |
| `isFieldAppearance` | function | 2767 |
| `isFreiburgTuebingenSgName` | function | 2537 |
| `isGameAtOrBeforeAsOf` | function | 3125 |
| `isGamePlayed` | function | 3084 |
| `isGoalieAppearance` | function | 2761 |
| `isGoalieRosterEntry` | function | 2723 |
| `isHallOfFameEligiblePlayer` | function | 10465 |
| `isHallRowPureSG` | function | 12843 |
| `isImportantClutchGoal` | function | 5546 |
| `isLateGoal` | function | 5554 |
| `isMannheimLudwigshafenSgName` | function | 2540 |
| `isMatchPenaltyEvent` | function | 4426 |
| `isNewSeasonDataState` | function | 22889 |
| `isOwnTeam` | function | 15903 |
| `isPenaltyGoalEvent` | function | 4509 |
| `isPreClubHistoryPlayerName` | function | 2610 |
| `isPureSGPlayer` | function | 9658 |
| `isRookieCandidateForSeason` | function | 10434 |
| `isSameUlmTeamContext` | function | 4455 |
| `isSeasonDataPreviewStale` | function | 6840 |
| `isSgOnlyAlltimePlayer` | function | 9650 |
| `isSgOnlyHallOfFameExcluded` | function | 10456 |
| `isSyntheticLineupPlayerId` | function | 18903 |
| `isToolMenuOpen` | function | 23458 |
| `isTwoPlusTwoPenaltyEvent` | function | 4430 |
| `isUlmTeamName` | function | 2555 |
| `isUsableExternalSeasonData` | function | 6415 |
| `isValidAsOfDate` | function | 3402 |
| `isValidAsOfStartTime` | function | 3405 |
| `isVisibleSecondaryTrait` | function | 8995 |
| `isYouthGame` | function | 3089 |
| `kpiBadge` | function | 14118 |
| `kpiDelta` | function | 13851 |
| `kpiItemColor` | function | 13857 |
| `kpiNiceMax` | function | 14008 |
| `kpiRadarValue` | function | 13931 |
| `kpiTrendRows` | function | 14014 |
| `kpiValueText` | function | 13847 |
| `lexiconEntry` | function | 15502 |
| `lexiconUniqueKeys` | function | 15494 |
| `lineupAverage` | function | 18955 |
| `lineupBuilderPoolIds` | function | 2238 |
| `lineupCombinationIds` | function | 19432 |
| `lineupDirectChemistryScore` | function | 19476 |
| `lineupEvaluateComplementCandidate` | function | 19483 |
| `lineupGroupDisplayName` | function | 7119 |
| `lineupLevelLabel` | function | 18959 |
| `lineupOpponentDNAForContext` | function | 19056 |
| `lineupPlayerAnchorScore` | function | 19561 |
| `lineupPlayerProfile` | function | 19160 |
| `lineupRankCandidateIds` | function | 19417 |
| `lineupRecommendationReason` | function | 19648 |
| `lineupRoleDnaComplementScore` | function | 19452 |
| `lineupRosterGamesForPlayer` | function | 18965 |
| `lineupRowMap` | function | 19414 |
| `lineupRowMeta` | function | 18932 |
| `lineupScore` | function | 18949 |
| `lineupStdDev` | function | 19446 |
| `linkUiPlayersToRegistry` | function | 4112 |
| `loadEinsatzCenterMismatchedAutosave` | function | 7530 |
| `loadSeason` | function | 8661 |
| `loadSeasonData` | function | 8115 |
| `loadSeasonForGlobal` | function | 8613 |
| `loadSeasonManifest` | function | 6346 |
| `mainNavActiveKeyForPage` | function | 22600 |
| `markFieldRoleAppearance` | function | 4087 |
| `matchcenterAddDuoConnection` | function | 16768 |
| `matchcenterAddPlanItem` | function | 17984 |
| `matchcenterAddPlanWatch` | function | 17990 |
| `matchcenterAddScoring` | function | 16329 |
| `matchcenterAddUlmDuoConnection` | function | 16919 |
| `matchcenterAddUlmScoring` | function | 16549 |
| `matchcenterAliasModeForContext` | function | 15989 |
| `matchcenterAllGames` | function | 16073 |
| `matchcenterAllGamesForSeason` | function | 16053 |
| `matchcenterAnalyzeDirect` | function | 16163 |
| `matchcenterAnalyzeForm` | function | 16200 |
| `matchcenterBuildCoachActivationHints` | function | 18700 |
| `matchcenterBuildCoachAvoidList` | function | 18690 |
| `matchcenterBuildCoachDangerPatterns` | function | 18672 |
| `matchcenterBuildCoachHints` | function | 18428 |
| `matchcenterBuildCoachIfThen` | function | 18680 |
| `matchcenterBuildCoachKeyActors` | function | 18707 |
| `matchcenterBuildCoachLevers` | function | 18662 |
| `matchcenterBuildCoachPriorities` | function | 18655 |
| `matchcenterBuildGoalieMatchup` | function | 17120 |
| `matchcenterBuildInsights` | function | 17406 |
| `matchcenterBuildIntelHeadline` | function | 18444 |
| `matchcenterBuildIntelligenceDataQuality` | function | 18079 |
| `matchcenterBuildIntelligenceSignals` | function | 18465 |
| `matchcenterBuildIntelListFromPlan` | function | 18419 |
| `matchcenterBuildMatchPlan` | function | 19764 |
| `matchcenterBuildOneThingToWatch` | function | 18452 |
| `matchcenterBuildOpponentAlarm` | function | 18309 |
| `matchcenterBuildOpponentDNA` | function | 18130 |
| `matchcenterBuildOpponentDuoInsights` | function | 16867 |
| `matchcenterBuildOpponentDuos` | function | 16822 |
| `matchcenterBuildOpponentPlayerInsights` | function | 16465 |
| `matchcenterBuildOpponentScouting` | function | 16393 |
| `matchcenterBuildPlanConfidence` | function | 17996 |
| `matchcenterBuildSpecialTeamsMatchup` | function | 17050 |
| `matchcenterBuildTimingAnalysis` | function | 17243 |
| `matchcenterBuildTimingInsights` | function | 17232 |
| `matchcenterBuildUlmDuoInsights` | function | 17017 |
| `matchcenterBuildUlmDuos` | function | 16974 |
| `matchcenterBuildUlmPlayerInsights` | function | 16711 |
| `matchcenterBuildUlmPlayerScouting` | function | 16656 |
| `matchcenterClamp` | function | 15690 |
| `matchcenterClassifyUlmGoalEvent` | function | 16538 |
| `matchcenterCoachAdd` | function | 18592 |
| `matchcenterCoachCautious` | function | 18589 |
| `matchcenterCoachGameModel` | function | 18601 |
| `matchcenterCoachPriorityFromAlarm` | function | 18645 |
| `matchcenterConfidenceClass` | function | 17971 |
| `matchcenterContextGames` | function | 16157 |
| `matchcenterDateLabel` | function | 15860 |
| `matchcenterDateValue` | function | 15855 |
| `matchcenterDefaultSeasonKey` | function | 15975 |
| `matchcenterDeriveOpponentType` | function | 18243 |
| `matchcenterDetectUlmSide` | function | 15965 |
| `matchcenterDirectContextGames` | function | 17030 |
| `matchcenterDirectGames` | function | 16143 |
| `matchcenterDuoDirectionLabel` | function | 16761 |
| `matchcenterDuoPairKey` | function | 16724 |
| `matchcenterEmptyBuckets` | function | 16479 |
| `matchcenterEmptyTimingStats` | function | 17179 |
| `matchcenterEnsureOpponentDuo` | function | 16728 |
| `matchcenterEnsureOpponentPlayer` | function | 16302 |
| `matchcenterEnsureUlmDuo` | function | 16881 |
| `matchcenterEnsureUlmPlayer` | function | 16487 |
| `matchcenterEventNumber` | function | 16265 |
| `matchcenterFinalizeOpponentDuos` | function | 16787 |
| `matchcenterFinalizeOpponentPlayerProfiles` | function | 16346 |
| `matchcenterFinalizeUlmDuos` | function | 16938 |
| `matchcenterFinalizeUlmPlayers` | function | 16587 |
| `matchcenterFindRosterPlayer` | function | 16254 |
| `matchcenterFmt` | function | 15845 |
| `matchcenterFormLine` | function | 17401 |
| `matchcenterGameKey` | function | 16226 |
| `matchcenterGameLine` | function | 17395 |
| `matchcenterGameScore` | function | 16040 |
| `matchcenterGameSideForOpponentKey` | function | 16029 |
| `matchcenterGameSideForTeam` | function | 16021 |
| `matchcenterGameTeamName` | function | 16018 |
| `matchcenterGoalAbsSeconds` | function | 17163 |
| `matchcenterGoalieFitScore` | function | 17103 |
| `matchcenterGoalieKey` | function | 17098 |
| `matchcenterGoalMinute` | function | 16280 |
| `matchcenterInferPriority` | function | 17977 |
| `matchcenterIntelAddAlarm` | function | 18288 |
| `matchcenterIntelCurve` | function | 18031 |
| `matchcenterIntelDataLabel` | function | 18076 |
| `matchcenterIntelDuoRef` | function | 18274 |
| `matchcenterIntelInverseCurve` | function | 18037 |
| `matchcenterIntelPct` | function | 18056 |
| `matchcenterIntelPlayerRef` | function | 18261 |
| `matchcenterIntelPriorityClass` | function | 18066 |
| `matchcenterIntelPriorityFromScore` | function | 18060 |
| `matchcenterIntelPriorityLabel` | function | 18072 |
| `matchcenterIntelRate` | function | 18052 |
| `matchcenterIntelWeighted` | function | 18041 |
| `matchcenterIsClutchGoalEvent` | function | 16291 |
| `matchcenterIsFreiburgTuebingenTeamName` | function | 15950 |
| `matchcenterIsLateGoalEvent` | function | 16286 |
| `matchcenterIsUlmTeamName` | function | 15957 |
| `matchcenterNum` | function | 15695 |
| `matchcenterOpponentMode` | function | 16076 |
| `matchcenterOutcomeForTeam` | function | 16044 |
| `matchcenterPct` | function | 17046 |
| `matchcenterPenaltyMinutes` | function | 16270 |
| `matchcenterPersonalPenaltyMinutesForSide` | function | 17037 |
| `matchcenterPlanRateText` | function | 17963 |
| `matchcenterPlanScoreText` | function | 17959 |
| `matchcenterPlayerDisplayName` | function | 16248 |
| `matchcenterPlayerKey` | function | 16259 |
| `matchcenterPriorityLabel` | function | 17968 |
| `matchcenterRegisterPlayerGame` | function | 16326 |
| `matchcenterRegisterUlmProfileGame` | function | 16525 |
| `matchcenterResultClass` | function | 17384 |
| `matchcenterResultLetter` | function | 17387 |
| `matchcenterRosterPlayers` | function | 16244 |
| `matchcenterScoutingGames` | function | 16229 |
| `matchcenterSeasonHasGames` | function | 15972 |
| `matchcenterSeasonIsUlmTuebingenSgEra` | function | 15877 |
| `matchcenterSeasonKeys` | function | 15870 |
| `matchcenterSeasonLabel` | function | 15874 |
| `matchcenterSigned` | function | 15850 |
| `matchcenterSocialAdd` | function | 18769 |
| `matchcenterSocialCaption` | function | 18776 |
| `matchcenterSortGamesAsc` | function | 15865 |
| `matchcenterSpecialTeamsForGame` | function | 17033 |
| `matchcenterStoryAddCandidate` | function | 20910 |
| `matchcenterStoryAddFact` | function | 20891 |
| `matchcenterStoryBestClutchDuo` | function | 21140 |
| `matchcenterStoryBestClutchPlayer` | function | 21096 |
| `matchcenterStoryCandidateForBudget` | function | 20948 |
| `matchcenterStoryCategoryForPlanFact` | function | 21225 |
| `matchcenterStoryCategoryLimit` | function | 20933 |
| `matchcenterStoryClutchFact` | function | 21073 |
| `matchcenterStoryClutchPriority` | function | 21174 |
| `matchcenterStoryCompetitionLabel` | function | 21177 |
| `matchcenterStoryCurrentStreak` | function | 21020 |
| `matchcenterStoryDirectFactCandidates` | function | 21190 |
| `matchcenterStoryDownloadFileName` | function | 20232 |
| `matchcenterStoryDuoClutchFact` | function | 21150 |
| `matchcenterStoryDuoClutchTotal` | function | 21132 |
| `matchcenterStoryDuoFact` | function | 21153 |
| `matchcenterStoryEstimateFactWeight` | function | 20904 |
| `matchcenterStoryFactKey` | function | 20898 |
| `matchcenterStoryFormFact` | function | 21038 |
| `matchcenterStoryFormFactCandidates` | function | 21049 |
| `matchcenterStoryFormLetters` | function | 20855 |
| `matchcenterStoryFormRecord` | function | 21014 |
| `matchcenterStoryInitials` | function | 20735 |
| `matchcenterStoryInlineStat` | function | 20816 |
| `matchcenterStoryLastDuelLabel` | function | 21186 |
| `matchcenterStoryLateGoalsForOutcome` | function | 21069 |
| `matchcenterStoryLogoBase` | function | 20741 |
| `matchcenterStoryLogoForOpponent` | function | 20779 |
| `matchcenterStoryLooksArtificial` | function | 20901 |
| `matchcenterStoryNameClass` | function | 21346 |
| `matchcenterStoryNormalizePickOptions` | function | 20937 |
| `matchcenterStoryPickFactItems` | function | 20958 |
| `matchcenterStoryPickFacts` | function | 21011 |
| `matchcenterStoryPlanFactCandidates` | function | 21212 |
| `matchcenterStoryPlayer` | function | 20858 |
| `matchcenterStoryPlayerClutchFact` | function | 21106 |
| `matchcenterStoryPlayerClutchTotal` | function | 21088 |
| `matchcenterStoryRankRows` | function | 20843 |
| `matchcenterStoryRankText` | function | 20812 |
| `matchcenterStorySafeLogoUrl` | function | 20747 |
| `matchcenterStoryShortDuel` | function | 21181 |
| `matchcenterStoryShortTeamLabel` | function | 20819 |
| `matchcenterStoryTableRank` | function | 20794 |
| `matchcenterStoryUlmTableRank` | function | 20805 |
| `matchcenterStoryVisibleFacts` | function | 21352 |
| `matchcenterStoryWinlessStreak` | function | 21029 |
| `matchcenterTeamDisplay` | function | 15981 |
| `matchcenterTeamKey` | function | 15984 |
| `matchcenterTimeValue` | function | 17171 |
| `matchcenterTimingStatsForGames` | function | 17195 |
| `matchcenterUlmScoutingConfidence` | function | 16482 |
| `matchcenterUlmTeamLabelForGame` | function | 17390 |
| `matchcenterUpdateUlmSeasonRow` | function | 16531 |
| `matchcenterWindowForSecond` | function | 17188 |
| `matchdayAsOfCutoff` | function | 3358 |
| `matchdayGameCardHtml` | function | 22732 |
| `matchdayUlmGames` | function | 22729 |
| `medianOrNull` | function | 4285 |
| `mergeDuoSet` | function | 5115 |
| `mergeGoalieSpecialTeamsStats` | function | 4747 |
| `mergeSpecialTeamsStats` | function | 4391 |
| `mojibakeScore` | function | 2428 |
| `moveGlobalSearch` | function | 23384 |
| `normalizeAssistPlayerName` | function | 2941 |
| `normalizeComparisonItem` | function | 13126 |
| `normalizeDuoComparisonItem` | function | 13370 |
| `normalizeEventPlayerRef` | function | 2880 |
| `normalizeGame` | function | 6309 |
| `normalizeLineupLines` | function | 2241 |
| `normalizeOpponentNameForAllTime` | function | 2526 |
| `normalizePlayerDisplayName` | function | 2581 |
| `normalizePlayerName` | function | 2597 |
| `normalizeSecondaryTraits` | function | 5662 |
| `normalizeTeamKey` | function | 15895 |
| `normalizeTeamName` | function | 2516 |
| `normalizeTeamNameForMatchcenter` | function | 15960 |
| `onGlobalSearchInput` | window | 23378 |
| `openAllTimePlayers` | window | 8729 |
| `openComparisonCenter` | window | 8899 |
| `openDuoProPicker` | window | 11819 |
| `openEinsatzCenter` | window | 7070 |
| `openGlobalSearch` | window | 23345 |
| `openHallOfFame` | window | 8875 |
| `openLexicon` | window | 8972 |
| `openLigaGegner` | window | 23102 |
| `openLineupBuilder` | window | 8950 |
| `openMatchcenter` | window | 8928 |
| `openMatchcenterStoryPreview` | window | 2194 |
| `openMatchday` | window | 22711 |
| `openMatchdayTimeline` | window | 22703 |
| `openOverview` | window | 22652 |
| `openSeason` | window | 8726 |
| `openToolMenu` | window | 23462 |
| `overviewCompactTableHtml` | function | 22929 |
| `overviewCrossSeasonTrendHtml` | function | 22978 |
| `overviewFormHtml` | function | 22937 |
| `overviewLastMatchdayText` | function | 22913 |
| `overviewLineupLinkHtml` | function | 22995 |
| `overviewMatchcenterLinkHtml` | function | 22992 |
| `overviewMatchdayEndMs` | function | 22830 |
| `overviewMatchdayStartMs` | function | 22824 |
| `overviewNextMatchdayHtml` | function | 22917 |
| `overviewOpponentLabel` | function | 22908 |
| `overviewOpponentPreviewHtml` | function | 22987 |
| `overviewRankChangeTile` | function | 23014 |
| `overviewRecordHtml` | function | 22971 |
| `overviewSeasonAwardHtml` | function | 22960 |
| `overviewSeasonBilanzHtml` | function | 22952 |
| `p1NarrativeKey` | function | 15777 |
| `paintGlobalSearchResults` | function | 23337 |
| `parseAppHash` | function | 3505 |
| `parseAsOfQueryValue` | function | 3544 |
| `parseComparisonVariant` | function | 13291 |
| `parseGameClock` | function | 2993 |
| `parseLastViewState` | function | 3679 |
| `parseSeasonDataState` | function | 22879 |
| `pct` | function | 5470 |
| `pctValue` | function | 12766 |
| `pdashBestPhase` | function | 14404 |
| `pdashInsight` | function | 14442 |
| `pdashInsights` | function | 14445 |
| `pdashNum` | function | 14388 |
| `pdashOpponentStrength` | function | 14422 |
| `pdashOpponentTier` | function | 14416 |
| `pdashPct` | function | 14392 |
| `pdashPhaseLabel` | function | 14396 |
| `pdashTopCount` | function | 14400 |
| `pdashTopOpponent` | function | 14412 |
| `pdashTopPartner` | function | 14408 |
| `penaltyRawText` | function | 4423 |
| `pFull` | function | 2574 |
| `playerAppearedForUlmStatusInSeasonByName` | function | 10415 |
| `playerAppearedInSeasonByName` | function | 10404 |
| `playerExplainAdd` | function | 15078 |
| `playerExplainConfidence` | function | 15069 |
| `playerExplainConfidenceLabel` | function | 15075 |
| `playerExplainContextSentence` | function | 15114 |
| `playerExplainHeadline` | function | 15104 |
| `playerExplainRolePhrase` | function | 15095 |
| `playerExplainStyleSignature` | function | 15083 |
| `processGame` | function | 3025 |
| `rAlltimeKpis` | function | 13082 |
| `rAlltimePlayerDashboard` | function | 14597 |
| `rAllTimePlayersPage` | function | 15359 |
| `rankNarratives` | function | 15799 |
| `rAntiSynergyCompareChip` | function | 12146 |
| `rAntiSynergyDelta` | function | 12130 |
| `rAntiSynergyMainDelta` | function | 12171 |
| `rAntiSynergyMetricRow` | function | 12154 |
| `rAsOfSelector` | function | 23123 |
| `ratio01` | function | 5471 |
| `rCarryPerformanceRows` | function | 10576 |
| `rClassicRoleTags` | function | 9081 |
| `rClassicTagTip` | function | 9019 |
| `rClutch` | function | 9287 |
| `rClutchBadge` | function | 8981 |
| `rComparisonCenterPage` | function | 14267 |
| `rComparisonDashboard` | function | 14218 |
| `rComparisonDuoSearchBox` | function | 13600 |
| `rComparisonDuoSuggestionButtons` | function | 13393 |
| `rComparisonMiniOverview` | function | 14206 |
| `rComparisonModeSelect` | function | 13621 |
| `rComparisonRoles` | function | 14210 |
| `rComparisonStyles` | function | 14229 |
| `rContextBar` | function | 23206 |
| `rDifficultConnectionList` | function | 12181 |
| `rDifficultConnectionListCompact` | function | 12248 |
| `rDifficultConnectionListCompactLegacy` | function | 12206 |
| `rDifficultConnectionsCard` | function | 12287 |
| `rDuoCenterPro` | function | 11666 |
| `rDuoCompareSummaryCards` | function | 13479 |
| `rDuoComparisonBars` | function | 13474 |
| `rDuoComparisonChemistry` | function | 13532 |
| `rDuoComparisonContext` | function | 13564 |
| `rDuoComparisonDashboard` | function | 13586 |
| `rDuoComparisonDetails` | function | 13582 |
| `rDuoComparisonImpact` | function | 13548 |
| `rDuoComparisonPage` | function | 13610 |
| `rDuoComparisonProfile` | function | 13510 |
| `rDuoProPlayerSelect` | function | 11848 |
| `rDuoResponseMomentumCard` | function | 12444 |
| `rDuoRows` | function | 10835 |
| `recommendLineComplements` | function | 19736 |
| `recordOverviewVisit` | function | 22898 |
| `registerPlayerIdentity` | function | 4059 |
| `registerSeasonRosters` | function | 4092 |
| `rEinsatzCenterAutosaveBanner` | function | 7492 |
| `rEinsatzCenterCombo` | function | 7015 |
| `rEinsatzCenterComboEditor` | function | 7720 |
| `rEinsatzCenterDraftBanner` | function | 7233 |
| `rEinsatzCenterDraftMark` | function | 7219 |
| `rEinsatzCenterDraftStatsHint` | function | 7223 |
| `rEinsatzCenterEditPage` | function | 7820 |
| `rEinsatzCenterGameCard` | function | 7024 |
| `rEinsatzCenterGameEditor` | function | 7767 |
| `rEinsatzCenterGroup` | function | 7002 |
| `rEinsatzCenterGroupEditor` | function | 7689 |
| `rEinsatzCenterPage` | function | 7043 |
| `rEinsatzCenterRosterSuggestionCard` | function | 7736 |
| `rEinsatzCenterStats` | function | 7125 |
| `relative01` | function | 5472 |
| `removeComparisonDuo` | window | 13444 |
| `removeComparisonItem` | window | 13356 |
| `removeEinsatzCenterCombo` | window | 8057 |
| `removeEinsatzCenterGroup` | window | 7971 |
| `removeEinsatzCenterGroupPlayer` | window | 8021 |
| `removeEinsatzCenterRosterPlayer` | window | 7902 |
| `removeLineupBuilderPlayerFromLine` | window | 2288 |
| `removeLineupPlayer` | window | 2229 |
| `rEmptyState` | function | 15825 |
| `renameEinsatzCenterGroup` | window | 7993 |
| `render` | function | 22010 |
| `renderComparisonDuoSuggestions` | function | 13397 |
| `renderTags` | function | 9089 |
| `repairMojibake` | function | 2447 |
| `repairRenderedMojibake` | function | 2494 |
| `resetPlayerRegistrySeason` | function | 4004 |
| `resolveAssistPlayer` | function | 2986 |
| `resolveCurrentSeasonKey` | function | 6378 |
| `resolveGoalScorerPlayer` | function | 2923 |
| `resolveLineupPlayerName` | function | 6987 |
| `resolvePlayerRoleView` | function | 9742 |
| `resolveRosterPlayerByRef` | function | 2892 |
| `responseExcerpt` | function | 6194 |
| `responseMomentumAbsSeconds` | function | 11011 |
| `responseMomentumActor` | function | 11040 |
| `responseMomentumConfidence` | function | 11160 |
| `responseMomentumEmptyState` | function | 11165 |
| `responseMomentumGameRows` | function | 11024 |
| `responseMomentumGoalActors` | function | 11051 |
| `responseMomentumPairKey` | function | 11173 |
| `responseMomentumSide` | function | 11031 |
| `responseMomentumTime` | function | 11017 |
| `responseMomentumTooltipFor` | function | 12368 |
| `restoreEinsatzCenterAutosave` | function | 7466 |
| `restoreHallOfFameIntroPrevious` | function | 8817 |
| `resultGoalsAgainstForSide` | function | 4327 |
| `returnToEinsatzCenterEdit` | window | 7888 |
| `rGlobalAllTimeStats` | function | 14705 |
| `rGlobalCareerHeader` | function | 14614 |
| `rGlobalDevelopment` | function | 14723 |
| `rGlobalDnaBars` | function | 14358 |
| `rGlobalDuoNetwork` | function | 14823 |
| `rGlobalOpponentSpecialist` | function | 15022 |
| `rGlobalOverview` | function | 14652 |
| `rGlobalPartnerOpponentPanel` | function | 14600 |
| `rGlobalProfileTags` | function | 12757 |
| `rGlobalSearchPanelHtml` | function | 23334 |
| `rGlobalSearchResultsHtml` | function | 23323 |
| `rGlobalSearchToggle` | function | 23320 |
| `rGoalieAnalysis` | function | 10368 |
| `rGoalieBars` | function | 10025 |
| `rGoalieDnaBars` | function | 10171 |
| `rGoalieFirstGoalResistance` | function | 10208 |
| `rGoalieInsights` | function | 10281 |
| `rGoalieKpis` | function | 10185 |
| `rGoalieMiniMetrics` | function | 10202 |
| `rGoalieMomentum` | function | 10222 |
| `rGoalieOpponents` | function | 10323 |
| `rGoalieOverview` | function | 10303 |
| `rGoaliePhaseProfile` | function | 10264 |
| `rGoaliePhases` | function | 10320 |
| `rGoalieRoleTraits` | function | 10163 |
| `rGoalieStability` | function | 10335 |
| `rGoalieTable` | function | 10360 |
| `rGoalieTierCards` | function | 10236 |
| `rHallDuoTemple` | function | 12819 |
| `rHallGoalieAwardCards` | function | 13010 |
| `rHallGoalieLegends` | function | 13027 |
| `rHallGoalieRankCard` | function | 12978 |
| `rHallOfFameHero` | function | 12770 |
| `rHallOfFamePage` | function | 15401 |
| `rHallPodiumList` | function | 12796 |
| `rHallSGBadge` | function | 12851 |
| `rIaShell` | function | 23226 |
| `rIdentityCards` | function | 9055 |
| `rIdentityTags` | function | 9035 |
| `rInsights` | function | 9548 |
| `rInteractiveDuoCenterPro` | function | 11855 |
| `rKpiCards` | function | 13860 |
| `rKpiExtendedMetrics` | function | 13993 |
| `rKpiInfoCards` | function | 14128 |
| `rKpiMetricCard` | function | 13985 |
| `rKpiMirrorRows` | function | 13871 |
| `rKpiObjectMini` | function | 14121 |
| `rKpiOpponentStrength` | function | 14090 |
| `rKpiRadar` | function | 13942 |
| `rKpiShareBars` | function | 13977 |
| `rKpiTextMetricCard` | function | 13990 |
| `rKpiTrendCompare` | function | 14023 |
| `rKPIVergleich` | function | 14192 |
| `rLexiconPage` | function | 15516 |
| `rLexiconRows` | function | 15512 |
| `rLigaGegnerPlaceholderPage` | function | 23106 |
| `rLineupBuilderAvailablePanel` | function | 20459 |
| `rLineupBuilderPage` | function | 20635 |
| `rLineupComplementCards` | function | 20556 |
| `rLineupMetricPills` | function | 20445 |
| `rLineupRecommendationCards` | function | 20507 |
| `rLineupRecommendationMode` | function | 20522 |
| `rLineupScoreRows` | function | 20341 |
| `rLineupSimpleCards` | function | 20363 |
| `rLineupTestLine` | function | 20569 |
| `rLineupTestMode` | function | 20618 |
| `rMainNav` | function | 22613 |
| `rMainNavBottom` | function | 22635 |
| `rMatchcenterCoachCardList` | function | 20059 |
| `rMatchcenterCoachIfThen` | function | 20073 |
| `rMatchcenterCoachSimpleList` | function | 20081 |
| `rMatchcenterCopyButton` | function | 20151 |
| `rMatchcenterDetailsSection` | function | 17376 |
| `rMatchcenterDigitalCoach` | function | 20086 |
| `rMatchcenterDuoRankCard` | function | 17697 |
| `rMatchcenterDuoRow` | function | 17673 |
| `rMatchcenterDuosTab` | function | 17844 |
| `rMatchcenterDuoWatchCard` | function | 17653 |
| `rMatchcenterFormCard` | function | 17434 |
| `rMatchcenterFormSection` | function | 17350 |
| `rMatchcenterGamesList` | function | 17455 |
| `rMatchcenterGoalieCard` | function | 17906 |
| `rMatchcenterGoalieMatchup` | function | 17930 |
| `rMatchcenterIntelCoachHints` | function | 20045 |
| `rMatchcenterIntelOverview` | function | 19999 |
| `rMatchcenterKpi` | function | 17427 |
| `rMatchcenterLineupBuilder` | function | 20372 |
| `rMatchcenterLockerList` | function | 20156 |
| `rMatchcenterLockerRoomSheet` | function | 20168 |
| `rMatchcenterMatchPlan` | function | 20713 |
| `rMatchcenterOpponentAlarm` | function | 19977 |
| `rMatchcenterOpponentDNA` | function | 19944 |
| `rMatchcenterOpponentDuos` | function | 17801 |
| `rMatchcenterOpponentScouting` | function | 17614 |
| `rMatchcenterPage` | function | 21520 |
| `rMatchcenterPlanItems` | function | 19910 |
| `rMatchcenterPlanWatch` | function | 19928 |
| `rMatchcenterPlayerRow` | function | 17488 |
| `rMatchcenterPlayersTab` | function | 17650 |
| `rMatchcenterProfileSection` | function | 17330 |
| `rMatchcenterRankCard` | function | 17512 |
| `rMatchcenterResponseMomentum` | function | 12471 |
| `rMatchcenterScoutingSummary` | function | 20669 |
| `rMatchcenterSocialBlock` | function | 20224 |
| `rMatchcenterSocialMediaCenter` | function | 20290 |
| `rMatchcenterSpecialCard` | function | 17847 |
| `rMatchcenterSpecialTeams` | function | 17856 |
| `rMatchcenterStoryForm` | function | 21388 |
| `rMatchcenterStoryFrame` | function | 21471 |
| `rMatchcenterStoryLogo` | function | 21383 |
| `rMatchcenterStoryPlayerCard` | function | 21393 |
| `rMatchcenterStoryPreview` | function | 21401 |
| `rMatchcenterTabs` | function | 17327 |
| `rMatchcenterTimeBars` | function | 17254 |
| `rMatchcenterTiming` | function | 17288 |
| `rMatchcenterTimingStatsCard` | function | 17268 |
| `rMatchcenterUlmDuoRankCard` | function | 17752 |
| `rMatchcenterUlmDuoRow` | function | 17729 |
| `rMatchcenterUlmDuos` | function | 17758 |
| `rMatchcenterUlmDuoWatchCard` | function | 17703 |
| `rMatchcenterUlmImpactCard` | function | 17518 |
| `rMatchcenterUlmPlayerRow` | function | 17547 |
| `rMatchcenterUlmRankCard` | function | 17571 |
| `rMatchcenterUlmScouting` | function | 17577 |
| `rMatchcenterWatchCard` | function | 17467 |
| `rMatchdayDetailPage` | function | 22763 |
| `rMatchdayPage` | function | 22799 |
| `rMatchdayTimelinePage` | function | 22752 |
| `rMatchdayTimelineRow` | function | 22744 |
| `rMatrix` | function | 9160 |
| `rmTerm` | function | 12375 |
| `roleGameStableKey` | function | 2795 |
| `roleTraitLabel` | function | 8992 |
| `rOppBreakdown` | function | 9452 |
| `rOpponentIntelBars` | function | 10799 |
| `rOpponentTopScorerTable` | function | 12610 |
| `rosterImpactConfidence` | function | 12042 |
| `rosterImpactConfidenceWeight` | function | 12048 |
| `rosterPlayerMatches` | function | 2699 |
| `rOverviewPage` | function | 23090 |
| `rPdashLabel` | function | 14549 |
| `rPdashStat` | function | 14552 |
| `rPenalties` | function | 9433 |
| `rPhases` | function | 9217 |
| `rPlayerDash` | function | 14555 |
| `rPlayerDashStyles` | function | 14537 |
| `rPlayerExplainItems` | function | 15301 |
| `rPlayerExplanation` | function | 15306 |
| `rPlayerResponseMomentumCard` | function | 12425 |
| `rPlayerRoleSwitch` | function | 9750 |
| `rRadar` | function | 9237 |
| `rRes` | const-arrow | 8980 |
| `rResponseMomentumOverviewCard` | function | 12401 |
| `rRmKpi` | function | 12379 |
| `rRmTopList` | function | 12390 |
| `rRoleTraitTip` | function | 8999 |
| `rRosterImpactStatLine` | function | 12163 |
| `rRosterStatusBadge` | function | 9008 |
| `rScoreBreakdown` | function | 15829 |
| `rSeasonDataPreviewCard` | function | 6859 |
| `rSeasonDataPreviewContextHint` | function | 23158 |
| `rSeasonDataPreviewRows` | function | 6849 |
| `rSeasonDataPreviewStatus` | function | 6846 |
| `rSeasonDataStateContextHint` | function | 23175 |
| `rSeasonDuoCenterPro` | function | 11911 |
| `rSeasonDuoSummary` | function | 9207 |
| `rSeasonInsightsTab` | function | 9533 |
| `rSeasonLandingPage` | function | 14636 |
| `rSeasonPlayerDashboard` | function | 14594 |
| `rSeasonProfileKpis` | function | 9132 |
| `rSeasonProfileTagStrip` | function | 9153 |
| `rSeasonTrendRows` | function | 14318 |
| `rSparkline` | function | 13096 |
| `rStyleMetricTip` | function | 9004 |
| `rStyleProfileBars` | function | 9044 |
| `rTable` | function | 9602 |
| `rTeamPage` | function | 21668 |
| `rTeamResponseMomentumCard` | function | 12464 |
| `rTimeline` | function | 9322 |
| `rToolMenu` | function | 23448 |
| `runComparison` | window | 13361 |
| `runDuoComparison` | window | 13449 |
| `saveLastView` | function | 3696 |
| `scoreNarrative` | function | 15780 |
| `seasonApiUrl` | function | 1793 |
| `seasonDataPreviewRerender` | function | 6705 |
| `seasonDataPreviewRow` | function | 6709 |
| `seasonGameApiUrls` | function | 1811 |
| `seasonGameHtmlUrls` | function | 1821 |
| `seasonHasPureUlmTeam` | function | 10449 |
| `seasonKeyToHashSegment` | function | 3395 |
| `seasonOrderIndex` | function | 10394 |
| `seasonPathPrefix` | function | 1805 |
| `seasonRoleKeysForPlayer` | function | 5679 |
| `seasonRoleTraitsFromClassic` | function | 5674 |
| `seasonStatNumber` | function | 10639 |
| `seasonStatSetSize` | function | 10643 |
| `seedHallOfFameIntroParticles` | function | 8784 |
| `selectAllLineupAvailable` | window | 2275 |
| `selectComparisonDuoSuggestion` | window | 13407 |
| `selectComparisonMode` | window | 13368 |
| `selectComparisonPlayer` | window | 13325 |
| `selectDuoProQuick` | window | 11821 |
| `selectEinsatzCenterEditGame` | window | 7890 |
| `selectEnforcerKeys` | function | 5691 |
| `serializeFieldRoleSeasonStats` | function | 4208 |
| `serializeGoalieSeasonStats` | function | 4186 |
| `serializeSeasonStats` | function | 4173 |
| `serializeSpecialTeamsStats` | function | 4388 |
| `setAntiSynergyView` | window | 2321 |
| `setComparisonDuoMode` | window | 13378 |
| `setComparisonDuoPlayer` | window | 13427 |
| `setComparisonDuoSearch` | window | 13380 |
| `setComparisonDuoSeasonKey` | window | 13379 |
| `setComparisonRoleMode` | window | 13331 |
| `setComparisonVariant` | window | 13336 |
| `setContextAsOf` | window | 23136 |
| `setDuoProPickerState` | function | 11790 |
| `setDuoProSelection` | window | 11840 |
| `setEinsatzCenterGameNote` | window | 8064 |
| `setEinsatzCenterGroupPlayerPosition` | window | 8029 |
| `setEinsatzCenterIncludeDraft` | window | 7889 |
| `setEinsatzCenterSeason` | window | 7064 |
| `setGlobalPlayer` | window | 2347 |
| `setGlobalPlayerDuo` | window | 2348 |
| `setGlobalTab` | window | 2349 |
| `setGoalieTab` | window | 2188 |
| `setLineupActiveLine` | window | 2260 |
| `setLineupBuilderMode` | window | 2259 |
| `setLineupBuilderOpponent` | window | 2258 |
| `setLineupBuilderSeason` | window | 2246 |
| `setLineupNewPlayerProfile` | window | 2302 |
| `setMatchcenterContext` | window | 8969 |
| `setMatchcenterOpponent` | window | 8968 |
| `setMatchcenterSeason` | window | 8970 |
| `setMatchcenterTab` | window | 2193 |
| `setP` | window | 2185 |
| `setPage` | window | 2331 |
| `setPlayerRoleView` | window | 2187 |
| `setSeasonDataPreviewOpen` | window | 6895 |
| `setSeasonDataPreviewPasteText` | window | 6896 |
| `setState` | const-arrow | 2173 |
| `setTab` | window | 2186 |
| `showLineupComplements` | window | 2301 |
| `showMainShell` | function | 8576 |
| `socialDuoFocusLine` | function | 18799 |
| `socialEnsurePeriod` | function | 18785 |
| `socialFirstUseful` | function | 18789 |
| `socialKeyFactLine` | function | 18809 |
| `socialOpponentLine` | function | 18805 |
| `socialPlayerFocusLine` | function | 18792 |
| `socialSentence` | function | 18782 |
| `specialTeamsStateFromActive` | function | 4514 |
| `stageSeasonDataPreview` | function | 6755 |
| `stageSeasonDataPreviewFromFile` | function | 6807 |
| `stageSeasonDataPreviewFromPaste` | function | 6821 |
| `startApp` | window | 8714 |
| `startEinsatzCenterDraftMode` | window | 7870 |
| `startHallOfFameIntro` | function | 8837 |
| `sumRoleGames` | function | 9722 |
| `switchMatchdaySeason` | window | 22722 |
| `switchOverviewSeason` | window | 22669 |
| `syncHashFromState` | function | 3638 |
| `t2s` | const-arrow | 3003 |
| `teamAliasRuleMatches` | function | 15898 |
| `teamAliasSeasonMatches` | function | 15889 |
| `toggleAntiSynergyHideSgOnly` | window | 2323 |
| `toggleAntiSynergyShowAll` | window | 2322 |
| `toggleComparisonPicker` | window | 13355 |
| `toggleComparisonSgOnly` | window | 13340 |
| `toggleEinsatzCenterComboPlayer` | window | 8038 |
| `toggleEinsatzCenterGroupRename` | window | 7979 |
| `toggleEinsatzCenterRosterSuggestionPlayer` | window | 7910 |
| `toggleHallOfFamePureSGPlayers` | window | 2196 |
| `toggleLineupBuilderAvailable` | window | 2261 |
| `toggleMatchcenterDuoDetails` | window | 2192 |
| `toggleMatchcenterGames` | window | 8971 |
| `toggleMatchcenterPlayerDetails` | window | 2191 |
| `toggleMatchcenterSpecialTeamsGames` | window | 2190 |
| `toggleSgOnlyAlltime` | window | 2350 |
| `toggleSpecialTeamsGameDetails` | window | 2189 |
| `toggleToolMenu` | window | 23477 |
| `toolMenuElements` | function | 23452 |
| `toolMenuItemElements` | function | 23455 |
| `toolMenuOnClick` | function | 23513 |
| `toolMenuOnKeydown` | function | 23489 |
| `toPublicPlayerRegistry` | function | 4212 |
| `uiDeltaIndicator` | function | 22254 |
| `uiFormatNumber` | function | 22226 |
| `uiHinweisKarte` | function | 22318 |
| `uiInfoIcon` | function | 22272 |
| `uiIntervallBalken` | function | 22394 |
| `uiKennzahlKachel` | function | 22284 |
| `uiKernaussage` | function | 22304 |
| `uiMethodenbox` | function | 22413 |
| `uiNotiz` | function | 22430 |
| `uiObjektseite` | function | 22510 |
| `uiObjektseiteSortTabs` | function | 22492 |
| `uiPlatzhalter` | function | 22442 |
| `uiRangliste` | function | 22340 |
| `uiReliabilityDots` | function | 22239 |
| `uiVerlauf` | function | 22368 |
| `uniqueList` | function | 1808 |
| `updateCoverAllTimeStats` | function | 8603 |
| `updatePlayerRoleAvailability` | function | 5008 |
| `validateGameStructure` | function | 6516 |
| `validateMergedSeason` | function | 6603 |
| `validateSeasonGames` | function | 6557 |
| `validateSeasonKey` | function | 6580 |
| `validateWrapperFormat` | function | 6592 |
| `variance` | function | 3016 |
| `viewEinsatzCenterMergedView` | window | 7887 |
| `warnEventProcessingOnce` | function | 2691 |
| `withoutHashSync` | function | 3655 |

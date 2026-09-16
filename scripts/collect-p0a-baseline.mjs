// P0a.2 — Golden-Value-Baseline-Collector für den bestehenden Liga-Analytics-Stand.
//
// WICHTIG: Dies ist KEIN eigenständig unter Node ausführbares Skript. Es ruft
// ausschließlich bereits vorhandene, in index.html definierte Berechnungs-
// funktionen auf (SEASONS, PLAYER_REGISTRY, S, ensureGlobalDataLoaded,
// buildMatchIntelligence, buildGoalieAnalysisModel, buildComparisonDataset,
// getAllTimePlayerRows, getGlobalAllTimeSnapshot, ...) — diese existieren nur
// im Browser, nachdem index.html vollständig geladen wurde (klassisches
// <script>, kein type="module": alle Top-Level-Funktionsdeklarationen sind
// dadurch automatisch Eigenschaften von window). Es wird KEINE neue
// Berechnungslogik eingeführt, ausschließlich bestehende Funktionen
// aufgerufen und deren Ergebnisse gesammelt.
//
// Ausführung (Browser-Testmethodik dieses Projekts, siehe docs/*):
//   1. Lokalen Static-Server auf dem Repo-Root starten (z.B. audit_server.ps1).
//   2. index.html im Browser öffnen.
//   3. Dieses Modul in der Seite laden (z.B. per dynamic import auf die
//      Server-URL: `await import('http://localhost:PORT/scripts/collect-p0a-baseline.mjs')`).
//   4. `await collectP0aBaseline()` aufrufen.
//   5. Ergebnis mit der bereits vorhandenen einsatzCenterCanonicalJson()
//      (index.html) deterministisch serialisieren und mit
//      scripts/p0a-baseline-golden-values.json vergleichen bzw. diese Datei
//      damit erzeugen.
//
// Determinismus (verifiziert): zwei vollständig unabhängige Seiten-Boots
// (frischer Reload, kein gemeinsamer In-Memory-Zustand) erzeugen byte-
// identische kanonische JSON-Ausgaben. Keine Zufalls-, Zeit- oder DOM-
// abhängigen Werte fließen ein — alle erfassten Werte sind reine Funktionen
// der unveränderten season-data/*.json-Dateien.
//
// Abgedeckte Bereiche (siehe P0a.2-Auftrag):
//   1. Standings        -> bereits von der App berechnet: SEASONS[key].data.standings
//   2. All-Time-Snapshot -> getGlobalAllTimeSnapshot()
//   3. Hall-of-Fame-Rankings -> getAllTimePlayerRows() (Top 20, ohne reine SG/Tübingen-Spieler)
//   4. Goalie-Stats/-Model  -> PLAYER_REGISTRY.players[*].goalieStatsBySeason[key] + buildGoalieAnalysisModel(stats)
//   5. Matchcenter-Kernwerte -> buildMatchIntelligence(opponentKey, seasonKey, 'season') für die ersten 3 Gegner aus getMatchcenterOpponents()
//   6. Vergleichszentrum    -> buildComparisonDataset() für die Top-3-Feldspieler der Hall-of-Fame-Rangliste
//
// Nicht zufällig ausgewählt: "repräsentative" Gegner/Spieler sind jeweils die
// ersten Einträge einer bereits vorhandenen, deterministischen Sortierung
// (getMatchcenterOpponents() bzw. getAllTimePlayerRows()) — keine manuell
// erfundene Auswahl.

export async function collectP0aBaseline() {
  const seasonKeys = ['21/22', '22/23', '23/24', '24/25', '25/26'];

  await ensureGlobalDataLoaded();

  const result = {
    generatedFrom: 'existing dashboard functions, no new logic',
    seasons: {},
    allTime: {},
  };

  for (const seasonKey of seasonKeys) {
    const bucket = SEASONS[seasonKey];
    const data = bucket?.data || {};
    const standings = Array.isArray(data.standings) ? data.standings : [];

    const goalieProfiles = Object.values(PLAYER_REGISTRY.players)
      .filter((p) => p.goalieStatsBySeason?.[seasonKey]?.games > 0)
      .sort((a, b) => String(a.playerId).localeCompare(String(b.playerId)));
    const goalies = goalieProfiles.map((p) => {
      const stats = p.goalieStatsBySeason[seasonKey];
      return { playerId: p.playerId, name: p.name, stats, model: buildGoalieAnalysisModel(stats) };
    });

    const opponents = getMatchcenterOpponents(seasonKey, 'season').slice(0, 3);
    const matchcenter = opponents.map((o) => ({
      opponentKey: o.key,
      opponentLabel: o.label,
      intel: buildMatchIntelligence(o.key, seasonKey, 'season'),
    }));

    result.seasons[seasonKey] = {
      standingsCount: standings.length,
      standings,
      goalieCount: goalies.length,
      goalies,
      opponentCount: matchcenter.length,
      matchcenter,
    };
  }

  const allTimeSnapshot = S.allTime || getGlobalAllTimeSnapshot();
  result.allTime.snapshot = allTimeSnapshot;

  const hofRows = getAllTimePlayerRows()
    .filter((r) => !isPureSGPlayer(r))
    .map((r) => ({
      playerId: r.playerId,
      name: r.name,
      points: r.allStats.points || 0,
      goals: r.allStats.goals || 0,
      assists: r.allStats.assists || 0,
      games: r.allStats.games || 0,
    }));
  result.allTime.hallOfFameRankingCount = hofRows.length;
  result.allTime.hallOfFameRankingTop20 = hofRows.slice(0, 20);

  const topPlayerIds = hofRows.slice(0, 3).map((r) => r.playerId);
  result.allTime.comparisonPlayerIds = topPlayerIds;
  result.allTime.comparisonDataset = buildComparisonDataset(
    topPlayerIds.map((playerId) => ({ type: 'playerAlltime', roleMode: 'field', playerId })),
  );

  return result;
}

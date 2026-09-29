// M4 · Müdigkeit und Belastung (P4 Runde 1–4) — LIGA-, TEAM-, SPIELER-EBENE UND FRESH-VS-TIRED. Node/Dry-Run, KEINE
// Persistenz, KEINE UI, KEINE Build-Integration. LoadIndex ist ausdrücklich NICHT implementiert: M0 liefert keine
// belastbare Information über gleichzeitig auf dem Feld stehende Feldspieler (kein Wechsel-/Lineup-Zeitstempel in
// den Rohdaten — nur eine statische Spiel-Kaderliste und die feste Start-Aufstellung `starting_players`, beide keine
// zeitlich veränderliche Auf-dem-Feld-Größe); siehe Audit-Bericht des entsprechenden Schritts. Keine erfundene
// Konstante als Ersatz.
//
// ── Fresh-vs-Tired: ausschließlich vorhandene M0-Felder, kein Refit, keine neue Knappheitsvariable ────────────
// Gerichtete Beobachtung je Team-Game mit bekannter eigener UND gegnerischer `derived.gameOrderOfDay` (beide 1
// oder 2) UND `ownOrder !== opponentOrder` (sonst kein Fresh-vs-Tired-Duell, sondern „beide frisch"/„beide müde"
// gegeneinander — ausgeschlossen). `state`/`opponentState` = `order === 1 ? 'fresh' : 'tired'`. Dasselbe Spiel liefert
// bewusst ZWEI gerichtete Beobachtungen (A-Sicht und B-Sicht), da die Zielgröße teambezogen ist. `opponentPrevGame-
// GoalDiff`/`opponentGameOrderOfDay` werden UNVERÄNDERT aus M0 (normalize.mjs, `derived`) übernommen — dort bereits
// korrekt über die chronologische Spieltags-Gruppierung des GEGNERS bestimmt (kein `gameId − 1`, keine eigene
// Vorspiel-Suche hier). `opponentPrevGameResult` wird ausschließlich aus dem VORZEICHEN von `opponentPrevGameGoalDiff`
// abgeleitet (win/draw/loss) — keine neue Knappheitskategorie. `m1AdjustedGoalDiff` ist ein rein OPTIONALER Zusatz
// (nur wenn M1 schätzbar): `ownGoalDiff − (expectedOwn − expectedOpp)` über das bereits vorhandene
// `expectedDuelForRow` (Team-Ebene, unverändert wiederverwendet) — keine neue Regression, kein eigener „Freshness"-
// Koeffizient, keine kausale Interpretation. Die Kernberechnung selbst ist von M1 vollständig unabhängig.
//
// Eingabe: M0-Arrays `{ teamGames, goalEvents, rosterEntries }` (scripts/model/normalize.mjs; `rosterEntries` ist
// NUR für die Spieler-Ebene nötig und OPTIONAL — fehlt es, bleibt `players` leer, Liga-/Team-Ebene unverändert),
// beliebig viele Saisons, plus die bereits vorhandenen öffentlichen Exporte aus `team-strength.mjs` (M1). Ausgabe:
// ungerundete Zahlen (Rundung erst an der Ausgabegrenze, siehe stats.roundOutput). Reine Funktionen, deterministisch.
// KEINE Änderung an normalize.mjs, team-strength.mjs, shooter-quality.mjs, goalie-rating.mjs oder stats.mjs.
//
// ── Spieler-Ebene: Zeilenauswahl (dieselbe M0-Zuordnungslogik wie M2, shooter-quality.mjs) ─────────────────────
// Kaderplatz = EIN Spieler-Spiel, Identität ausschließlich `playerId`, `isGoalie === false`, gültige `playerId`,
// höchstens eine Zeile je (Spiel, playerId) — exakt wie M2s `rowsByKey`/`rowsByKey.has`-Dublettenregel. ZUSÄTZLICH
// (M2 kennt das nicht): jede Zeile wird über (seasonKey, gameId, side) mit ihrer EIGENEN `teamGames`-Zeile verknüpft,
// um `derived.gameOrderOfDay` zu lesen — game1 = 1, game2 = 2, unbekannt/ungültig → Zeile bleibt für Spieler-Vergleiche
// UNBERÜCKSICHTIGT (nicht künstlich zugeordnet), gezählt (`orderUnknown`). Torzuordnung wortgleich zu M2: Tor zählt
// für den Spieler nur bei `derived.scorerMatch === 'roster'` UND vorhandenem Kaderplatz; Assist nur bei
// `derived.assistKind === 'player'` UND vorhandenem FELDSPIELER-Kaderplatz (ein Assist auf einen Goalie-Kaderplatz
// zählt NICHT, wird separat gezählt). Eigentore/`isNotAssigned` sind kein Spielertor (wie M2). Nichts wird imputiert.
// ZUSÄTZLICH zur M2-Logik: jedes zugeordnete Tor/Assist wird über `eventHalf` (siehe oben, `period`-basiert, wie
// Liga-/Team-Ebene) einer Halbzeit zugeordnet — für `points`/`pointsPerGameRaw` (Abschnitt „Punkte") zählt JEDES
// zugeordnete Tor/jeder Assist, unabhängig von `eventHalf` (wie M2: `points = goals + assists`, keine Halbzeit-
// Bedingung); für den H2-Share-Zähler/-Nenner (Abschnitt „H2-Share") zählen NUR Tore/Assists mit BEKANNTER Halbzeit
// (sonst wäre der Anteil systematisch nach unten verzerrt) — separat gezählt (`halfUnknownExcludedFromH2Share`).
//
// ── Spieler-Ebene: Normal-EB-Schrumpfung der Punkte-pro-Spiel-Quote (Referenz = TEAM, nicht Liga, nicht Spieler) ──
// Je (teamKey, gameOrderOfDay)-Zelle EIN `estimateNormalPrior`-Aufruf (Schritt 1, unverändert) über ALLE Spieler, die
// in dieser Zelle für DIESES Team gespielt haben; Gruppe je Spieler = seine EINZELNEN Spiel-Punktewerte (nicht vorab
// gemittelt — wie bei der Team-Ebene, dieselbe `computeShrinkageForCell`-Funktion wird VERBATIM wiederverwendet, nur
// mit Spielern statt Teams als „Team“-Schlüssel der Map). Ein Spieler, der innerhalb DERSELBEN Order-Zelle für MEHR
// als ein Team gespielt hat (selten, z. B. Vereinswechsel innerhalb eines Spieltyps): sein `game1`/`game2`-Rohwert
// (`points`/`pointsPerGameRaw`) bleibt die Summe/das Mittel über ALLE seine Teams (Abschnitt 9 verlangt genau das);
// für die Schrumpfung wird jedoch NUR EINE Team-Zelle als Referenz herangezogen — das Team mit den MEISTEN Spielen
// dieses Spielers in dieser Order-Zelle (Gleichstand: `teamKey` aufsteigend) — kein Mischen mehrerer Referenzwerte
// (keine heuristische Kombination, siehe Auftrag). Für die überwältigende Mehrheit der Spieler (ein Team je Saison)
// ist das ohnehin identisch. Fehlt eine schätzbare Team-Zelle (τ² ≤ 0, < 2 Spieler o. Ä.): `pointsPerGameShrunk` =
// `null`, `pointsPerGameRaw`/`n` bleiben erhalten (sauberer Fallback, kein Clamping).
//
// ── Spieler-Ebene: H2-Share (Beta-Binomial-EB, ligaweiter Prior je Order-Zelle) ─────────────────────────────────
// `estimateBetaPrior`/`betaBinomialPosterior` (Schritt 1, unverändert). EIN ligaweiter (nicht team-spezifischer)
// Prior je Order-Zelle (game1/game2 getrennt) über ALLE Spieler mit `halfKnownPoints > 0` in dieser Zelle
// (`successes = h2Points`, `trials = halfKnownPoints`). Je Spieler: Posterior aus demselben Prior. `trials === 0` →
// `raw`/`posteriorMean`/`ci90` = `null` (wie spezifiziert). Prior nicht schätzbar → `raw` bleibt (falls `trials > 0`),
// `posteriorMean`/`ci90` = `null`.
//
// ── Spieler-Ebene: Eligibility, Konfidenz, kein M1/Bootstrap ────────────────────────────────────────────────────
// `eligible = nGame1 ≥ MIN_GAMES_FOR_PLAYER_COMPARISON (6) UND nGame2 ≥ 6` (freigegebene, einzige Schwelle — keine
// alternative erfunden). Spieler mit weniger Spielen bleiben mit allen Rohwerten in `players[]` (nicht entfernt),
// `confidence.eligible = false`. Die Spieler-Ebene liest AUSSCHLIESSLICH `teamGames`/`goalEvents`/`rosterEntries` und
// die freigegebenen EB-Funktionen — kein `predictDuel`, kein M1-Bootstrap, kein eigener Bootstrap (M1s Bootstrap wird
// von Liga-/Team-Ebene ohnehin schon einmalig ausgeführt und hier nicht ein zweites Mal benötigt). `asOf` = exakt
// `fit.asOf` (M1s eigene, bereits aufgelöste asOf-Auflösung — dieselbe Semantik wie M1/M2, keine zweite Implementierung).
//
// ── M1-Erwartung (kein Refit, kein Neuschätzen der Order-/Kader-Haupteffekte) ─────────────────────────────────────
// `lambdaFull = predictDuel(fit, {teamA, teamB, orderA, orderB, fieldPlayersA, fieldPlayersB, hostA, hostB}).expectedGoals.a`
// mit `fit` = das (ggf. aus einem Bootstrap-Replikat rekonstruierte) M1-Ergebnis. `orderA`/`fieldPlayersA`/`hostA` sind
// die ECHTEN Werte der eigenen Zeile; `teamB` ist der echte Gegner. `orderB`/`fieldPlayersB`/`hostB` beeinflussen
// `expectedGoals.a` rechnerisch NICHT (sie fließen nur in `expectedGoals.b` ein, siehe `predictDuel` in
// team-strength.mjs) — `fieldPlayersB`/`hostB` werden trotzdem mit den echten Gegner-Werten belegt (immer verfügbar,
// keine Mehrarbeit), `orderB` fällt auf 1 zurück, falls für den Gegner in genau diesem Spiel keine gültige eigene
// Reihenfolge vorliegt (reiner Vertragsplatzhalter für `predictDuel`, ohne numerische Wirkung auf `expectedGoals.a`).
// Offsets: Halbzeit `log(lambdaFull / 2)`, 10-Minuten-Segment `log(lambdaFull / 4)`.
//
// ── Auswahl der Team-Games ──────────────────────────────────────────────────────────────────────────────────────
// Nur Zeilen mit `derived.gameOrderOfDay === 1 oder 2` (D4-Regel wie M1), innerhalb desselben Datumsschnitts, den
// `bootstrapTeamStrength` für den M1-Fit tatsächlich verwendet hat (`fit.asOf`, nicht separat neu bestimmt — so ist
// „M4 sieht genau die Spiele, die auch M1 gesehen hat" garantiert, ohne die asOf-Auflösung zu duplizieren). Zeilen,
// für die `predictDuel` keine `lambdaFull` liefert (M1 nicht schätzbar), werden ausgeschlossen und gezählt/gewarnt.
//
// ── Torzuordnung je Halbzeit/Segment ────────────────────────────────────────────────────────────────────────────
// Ein Tor-Event zählt für die Seite, für die `derived.scoreDeltaSide` steht (NICHT `teamSide`): `goalsFor` (M1s
// Zielgröße, gegen die `lambdaFull` kalibriert ist) wird in M0 aus dem offiziellen Spielstand gebildet, nicht aus der
// physischen Ballbesitz-/Ereignisseite — bei Eigentoren zählt das Tor für die GEGNERISCHE Seite. Damit die Summe der
// Halbzeit- bzw. Segment-Zählwerte dieselbe Größe zerlegt, gegen die `lambdaFull` kalibriert wurde (sonst wäre der
// Offset systematisch verzerrt), wird hier exakt dieselbe Zuordnungsregel verwendet. Events mit
// `derived.scoreDeltaSide === null` (Spielstand nicht eindeutig rekonstruierbar) zählen für KEINE Seite, werden
// gezählt/gewarnt.
//
// ── Halbzeit-Zuordnung ausschließlich über `period` ─────────────────────────────────────────────────────────────
// Wie bei M3 (O-M3-9, goalie-rating.mjs): `goalEvents[].period` (1/2) ist robust gegenüber kumulierten Zeitformaten,
// in denen `absSec` allein die Halbzeit nicht mehr zuverlässig anzeigt (ein Event mit `absSec === 1200` ist zwischen
// „Ende Halbzeit 1" und „Beginn Halbzeit 2" nur über `period` eindeutig, nicht über den absoluten Sekundenwert
// allein). Events mit `period` ≠ 1/2 zählen für keine Halbzeit, werden gezählt/gewarnt (in den echten Daten nicht
// beobachtet, defensiv behandelt).
//
// ── Segment-Zuordnung: `period` (Halbzeit) + Sekunden INNERHALB der Halbzeit ───────────────────────────────────
// secWithinHalf = period === 1 ? absSec : absSec − HALF_SECONDS (funktioniert identisch für „perPeriod"- und
// „cumulated"-Zeitformat, da `absSec` in beiden Fällen für Halbzeit 2 im Bereich [HALF_SECONDS, 2·HALF_SECONDS]
// liegt — siehe normalize.mjs `eventTiming`). Segment = 1 + (period===1 ? 0 : 2) + (secWithinHalf < 600 ? 0 : 1),
// auf [1,4] geklammert (0 und HALF_SECONDS als exakte Randwerte fallen auf Segment 1 bzw. 4). Events mit
// `absSec === null` werden NICHT künstlich einem Segment zugeordnet — ausgeschlossen, gezählt/gewarnt (wie
// spezifiziert). Segmente werden ausschließlich für die 424 Zeilen mit bekanntem `gameOrderOfDay` gebildet.
//
// ── Design (kein erneutes Schätzen der M1-Haupteffekte) ────────────────────────────────────────────────────────
// Halbzeit:  [Intercept, H2-Dummy, order2×H2]                    Referenz: Halbzeit 1
// Segment:   [Intercept, Seg2, Seg3, Seg4, order2×Seg2, order2×Seg3, order2×Seg4]   Referenz: Segment 1
// `order2` = 1[eigene `derived.gameOrderOfDay` = 2] (bereits von M1 geschätzter Haupteffekt fließt NICHT hier ein;
// diese Design-Spalten bilden ausschließlich die ZUSÄTZLICHE, von M1 nicht erfasste Interaktion mit der Halbzeit/dem
// Segment ab). Kein Achsenabschnitt-Pendant zu M1s eigenem `order`-Term — `order2` erscheint hier NUR in den
// Interaktionsspalten, nie allein. Poisson-Fit ohne Ridge (`penalty: 0`, wie freigegeben). Spalten ohne Variation im
// gewählten Datensatz (z. B. keine einzige order2-Zeile) werden — wie in team-strength.mjs — entfernt, gezählt und
// gewarnt (sonst singuläre Hesse-Matrix ohne Penalty); ihr Output ist `null`.
//
// ── Bootstrap (ausschließlich `bootstrapTeamStrength`, kein eigenes Resampling) ─────────────────────────────────
// GENAU EIN Aufruf `bootstrapTeamStrength(teamGames, { asOf, replicates, seed, keepReplicates: true, halfLifeDays,
// ridge })` — von Liga- UND Team-Ebene gemeinsam genutzt, kein zweiter Bootstrap. Je Replikat wird aus
// `bootstrap.keys`/`bootstrap.replicateEstimates[r]` ein minimales, mit `predictDuel` kompatibles Fit-Objekt
// rekonstruiert (analog `fitLikeFromReplicate` in goalie-rating.mjs, hier lokal, nicht exportiert), `lambdaFull` für
// ALLE echten, bereits ausgewählten Team-Games neu berechnet, die Offsets neu gebildet und das M4-Poisson-Modell mit
// DENSELBEN y/X-Beobachtungen (Halbzeit-/Segment-Zuordnung, Dummy-Spalten — nur der Offset ändert sich) neu gefittet.
// Ein Replikat, dessen Refit nicht konvergiert oder wirft, wird für BEIDE Teilmodelle einheitlich übersprungen
// (gezählt). `ci90 = [quantile(0.05), quantile(0.95)]` der Replikat-Koeffizienten (wie M1/M3). `replicates` und
// `seed` sind hier PFLICHT (nicht optional wie bei M1/M3): M4 liefert ausschließlich bootstrap-gestützte ci90-Werte,
// kein Nur-Punktschätzung-Pfad.
//
// ── Team-Ebene: Halbzeit-Tordifferenz-Residual ──────────────────────────────────────────────────────────────────
// Für jedes Team-Game, bei dem SOWOHL die eigene ALS AUCH die gegnerische `derived.gameOrderOfDay` bekannt ist (eine
// STRENGERE Auswahl als die Ligaebene, weil hier — anders als dort — auch `expectedGoals.b` gebraucht wird, das über
// `predictDuel`s `own(orderB, fieldPlayersB)`-Term von der ECHTEN gegnerischen Reihenfolge abhängt; ein Platzhalter
// wie auf Ligaebene wäre hier keine reine Vertragsformalität mehr, sondern würde einen echten Zahlenwert verfälschen):
//   expectedOwn = predictDuel(fit, {…echte Werte beider Seiten…}).expectedGoals.a
//   expectedOpp = predictDuel(fit, {…}).expectedGoals.b
//   expectedOwnHalf = expectedOwn / 2, expectedOppHalf = expectedOpp / 2, expectedDiffHalf = expectedOwnHalf − expectedOppHalf
// Je Halbzeit (2 Beobachtungen je Team-Game, wie auf Ligaebene über `period` zugeordnet, Torzuordnung wie dort über
// `scoreDeltaSide`):
//   actualDiffHalf = actualOwnGoalsHalf − actualOppGoalsHalf
//   diffResidualHalf = actualDiffHalf − expectedDiffHalf   (= ownResidualHalf − oppResidualHalf, algebraisch identisch)
//
// ── Team-Ebene: Schlussphasen-Index (Late-Game-Index) ───────────────────────────────────────────────────────────
// Freigegebene Interpretation (gegen den Spezifikationswortlaut „Tore/Gegentore in den letzten 10 Minuten relativ zur
// Erwartung" geprüft: NICHT widersprüchlich — die Spezifikation verlangt keine rohe Quote, das Output-Schema hat
// genau EINEN Skalarwert je Zelle wie die Halbzeitkennzahl, kein STOP nötig): Segment 4 (letzte 10 Minuten, siehe
// `eventSegment`), symmetrische, M1-bereinigte Differenz auf DERSELBEN Tordifferenz-Skala wie die Halbzeitkennzahl:
//   expectedLateOwn = expectedOwn / 4, expectedLateOpp = expectedOpp / 4
//   lateResidual = (actualLateOwn − actualLateOpp) − (expectedLateOwn − expectedLateOpp)
// EINE Beobachtung je Team-Game (nicht je Halbzeit).
//
// ── Team-Ebene: Aggregation und Normal-EB-Schrumpfung ───────────────────────────────────────────────────────────
// Getrennt nach `gameOrderOfDay` (1/2) UND nach Kennzahl (Halbzeit/Late-Game): je Team eine Gruppe der rohen
// Beobachtungen (Halbzeit: 2 je Team-Game; Late-Game: 1 je Team-Game — NICHT vorab pro Spiel gemittelt). Je Zelle
// (4 insgesamt: hz×game1, hz×game2, late×game1, late×game2) EIN Aufruf `estimateNormalPrior(groups)` (Schritt-1-
// Funktion, unverändert, keine neue Formel) über alle Teams mit mindestens 1 Beobachtung in dieser Zelle, danach je
// Team `shrinkToReference({mu, tau2, value: rawMean, variance: sigma2/n})`. `n` = tatsächlich verwendete
// Beobachtungszahl (Halbzeit: 2·Spiele, Late-Game: Spiele). Prior nicht schätzbar (z. B. τ² ≤ 0, < 2 Teams mit
// Beobachtungen) → `shrunkEffect`/`ci90` = `null`, `raw`/`n` bleiben erhalten (sauberer Fallback, kein Clamping,
// keine Ersatzformel).
//
// ── Team-Ebene: Bootstrap (derselbe Mechanismus, dieselbe Logik wie Punktschätzer) ─────────────────────────────
// Je Replikat (derselbe Loop, dasselbe rekonstruierte Fit-Objekt wie oben): `expectedDuelForRow` für ALLE echten,
// bereits als team-tauglich ausgewählten Team-Games neu, daraus neue Halbzeit-/Late-Residuen, neue Teamgruppen,
// `estimateNormalPrior` + `shrinkToReference` neu je Zelle — exakt dieselbe Funktion (`computeTeamLevel`), die auch
// die Punktschätzung berechnet (keine zweite, abweichende Implementierung). `ci90` je Team/Zelle = 5-/95-%-Quantil
// der Replikat-`shrunkEffect`-Werte. Ein Replikat, dessen `expectedDuelForRow` für irgendeine Zeile fehlschlägt, wird
// (wie bei Liga-Ebene) insgesamt übersprungen; eine einzelne nicht schätzbare Zelle (τ² ≤ 0 o. Ä.) macht dagegen nur
// DIESE Zelle für dieses Replikat unbrauchbar (kein Totalausfall des Replikats).

import * as S from './stats.mjs';
import { bootstrapTeamStrength, predictDuel, dayNumber } from './team-strength.mjs';

/** Länge einer Halbzeit in Sekunden (identisch zu normalize.mjs `HALF_SECONDS`, hier nicht neu erfunden). */
export const HALF_SECONDS = 1200;
/** Länge eines Segments in Sekunden (4 Segmente je Halbzeit-Paar = ganzes Spiel, 4 × 600 = 2 × HALF_SECONDS). */
export const SEGMENT_SECONDS = 600;
/** Freigegebene, einzige Mindestschwelle für einen belastbaren Spieler-Game1-vs-Game2-Vergleich (Abschnitt 6). */
export const MIN_GAMES_FOR_PLAYER_COMPARISON = 6;

const cmp = (a, b) => (a < b ? -1 : a > b ? 1 : 0);
const gameKey = (seasonKey, gameId) => `${seasonKey}#${gameId}`;
const otherSide = (side) => (side === 'home' ? 'guest' : 'home');

/** Kanonische Zeilenordnung (Eingabereihenfolge darf das Ergebnis nicht beeinflussen), analog team-strength.mjs. */
function compareTeamGameRows(a, b) {
  return cmp(a.date, b.date) || cmp(String(a.startTime ?? ''), String(b.startTime ?? '')) || (Number(a.gameNumber) || 0) - (Number(b.gameNumber) || 0)
    || cmp(String(a.seasonKey), String(b.seasonKey)) || (Number(a.gameId) || 0) - (Number(b.gameId) || 0)
    || cmp(String(a.side), String(b.side)) || cmp(String(a.teamKey), String(b.teamKey));
}
function compareGoalEventRows(a, b) {
  return cmp(String(a.seasonKey), String(b.seasonKey)) || (Number(a.gameId) || 0) - (Number(b.gameId) || 0) || cmp(String(a.eventKey), String(b.eventKey));
}

// ─────────────────────────────────────────────────────────────────────────
// Halbzeit-/Segment-Klassifikation eines Tor-Events (öffentlich testbar)
// ─────────────────────────────────────────────────────────────────────────

/** Halbzeit (1|2) eines Tor-Events ausschließlich über `period` (siehe Kopfkommentar); sonst `null`. */
export function eventHalf(event) {
  const period = event?.period;
  return period === 1 ? 1 : period === 2 ? 2 : null;
}

/**
 * 10-Minuten-Segment (1..4) eines Tor-Events: benötigt eine gültige Halbzeit (`period` 1|2) UND `absSec !== null`.
 * `absSec === null` → `null` (nicht künstlich zugeordnet, siehe Kopfkommentar).
 */
export function eventSegment(event) {
  const half = eventHalf(event);
  if (half === null) return null;
  const absSec = event?.absSec;
  if (typeof absSec !== 'number' || !Number.isFinite(absSec)) return null;
  const secWithinHalf = half === 1 ? absSec : absSec - HALF_SECONDS;
  const clamped = Math.min(Math.max(secWithinHalf, 0), HALF_SECONDS);
  const within = clamped < SEGMENT_SECONDS ? 1 : 2;
  return (half - 1) * 2 + within;
}

// ─────────────────────────────────────────────────────────────────────────
// M1-Erwartung (predictDuel-Wrapper, ohne erneutes Schätzen)
// ─────────────────────────────────────────────────────────────────────────

/**
 * `lambdaFull` (volle M1-Erwartung, VOR der Halbzeit-/Segment-Aufteilung) für EIN Team-Game. `fit` ist ein
 * `predictDuel`-kompatibles Objekt (echtes `bootstrapTeamStrength`-Ergebnis oder ein aus einem Replikat
 * rekonstruiertes, siehe `fitLikeFromReplicate`). `ownRow`/`opponentRow` sind die beiden teamGames-Zeilen desselben
 * Spiels. `orderB` fällt auf 1 zurück, wenn der Gegner in diesem Spiel keine gültige eigene Reihenfolge hat — ohne
 * numerische Wirkung auf `expectedGoals.a` (siehe Kopfkommentar).
 * @returns {number|null} lambdaFull, oder `null` wenn `predictDuel` nicht verfügbar ist
 */
export function lambdaFullForRow(fit, ownRow, opponentRow) {
  if (!ownRow || (ownRow.derived?.gameOrderOfDay !== 1 && ownRow.derived?.gameOrderOfDay !== 2)) return null;
  if (!opponentRow) return null;
  const oppOrder = opponentRow.derived?.gameOrderOfDay === 1 || opponentRow.derived?.gameOrderOfDay === 2 ? opponentRow.derived.gameOrderOfDay : 1;
  let pred;
  try {
    pred = predictDuel(fit, {
      teamA: ownRow.teamKey, teamB: ownRow.opponentKey,
      orderA: ownRow.derived.gameOrderOfDay, orderB: oppOrder,
      fieldPlayersA: ownRow.fieldPlayerCount, fieldPlayersB: opponentRow.fieldPlayerCount,
      hostA: ownRow.derived?.isHostingTeam ?? null, hostB: opponentRow.derived?.isHostingTeam ?? null,
    });
  } catch (e) {
    if (!(e instanceof S.NumericError)) throw e;
    return null;
  }
  if (!pred.available) return null;
  const lambda = pred.expectedGoals.a;
  return Number.isFinite(lambda) && lambda > 0 ? lambda : null;
}

/** Rekonstruiert ein minimales, mit `predictDuel` kompatibles Fit-Objekt aus einem Bootstrap-Replikat von `bootstrapTeamStrength`. */
function fitLikeFromReplicate(keys, vec) {
  const idx = Object.fromEntries(keys.map((k, i) => [k, i]));
  const teamKeys = new Set();
  for (const k of keys) if (k.startsWith('attack:')) teamKeys.add(k.slice('attack:'.length));
  const teams = [...teamKeys].sort().map((teamKey) => ({ teamKey, attack: vec[idx[`attack:${teamKey}`]], defense: vec[idx[`defense:${teamKey}`]] }));
  return {
    estimable: true,
    stage1: {
      estimable: true, mu: vec[idx.mu],
      effects: { order: idx.order !== undefined ? vec[idx.order] : null, fieldPlayers: { le6: idx.le6 !== undefined ? vec[idx.le6] : null, ge9: idx.ge9 !== undefined ? vec[idx.ge9] : null } },
      teams,
    },
    stage2: { estimable: idx.betaHost !== undefined, betaHost: idx.betaHost !== undefined ? vec[idx.betaHost] : null },
  };
}

// ─────────────────────────────────────────────────────────────────────────
// Auswahl der Team-Games (D4-Regel, Datumsschnitt von fit.asOf übernommen)
// ─────────────────────────────────────────────────────────────────────────

function inCutoff(date, asOf) {
  return asOf.date !== null && (asOf.inclusive ? date <= asOf.date : date < asOf.date);
}

function selectEligibleRows(teamGames, asOf) {
  const sorted = [...teamGames].sort(compareTeamGameRows);
  const eligible = [];
  let excludedOrderNull = 0;
  let excludedOutsideCutoff = 0;
  for (const r of sorted) {
    if (!inCutoff(r.date, asOf)) { excludedOutsideCutoff++; continue; }
    const order = r.derived?.gameOrderOfDay;
    if (order !== 1 && order !== 2) { excludedOrderNull++; continue; }
    eligible.push(r);
  }
  return { eligible, excludedOrderNull, excludedOutsideCutoff, totalInCutoff: sorted.filter((r) => inCutoff(r.date, asOf)).length };
}

// ─────────────────────────────────────────────────────────────────────────
// Tor-Zuordnung je Team-Game (scoreDeltaSide, siehe Kopfkommentar)
// ─────────────────────────────────────────────────────────────────────────

/** Gruppiert `goalEvents` nach Spiel (Saison#gameId), kanonisch sortiert. */
function groupEventsByGame(goalEvents) {
  const map = new Map();
  for (const e of [...goalEvents].sort(compareGoalEventRows)) {
    const k = gameKey(e.seasonKey, e.gameId);
    if (!map.has(k)) map.set(k, []);
    map.get(k).push(e);
  }
  return map;
}

/** Zählt Tor-Events EINES Spiels mit `scoreDeltaSide === null` (zählen für keine Seite). Einmal je Spiel aufzurufen
 * (NICHT je Team-Game-Zeile/Seite — sonst würde jedes solche Event doppelt gezählt, einmal je Seite). */
function countCreditUnknown(gameEvents) {
  let n = 0;
  for (const e of gameEvents) if (e.derived?.scoreDeltaSide === null) n++;
  return n;
}

/**
 * Zählt für EIN Team-Game (eine Seite) die eigenen (`derived.scoreDeltaSide === side`) Tor-Events je Halbzeit und je
 * Segment. Events mit `scoreDeltaSide === null` zählen für keine Seite (siehe `countCreditUnknown`, hier übersprungen).
 * Events mit `period` ∉ {1,2} zählen für keine Halbzeit (`unknownPeriod`); Events mit `absSec === null` zählen für
 * kein Segment (`absSecNull`), tragen aber weiterhin zur Halbzeit bei (falls `period` bekannt).
 */
function tallyGameGoals(gameEvents, side) {
  const half = { 1: 0, 2: 0 };
  const seg = { 1: 0, 2: 0, 3: 0, 4: 0 };
  let unknownPeriod = 0;
  let absSecNull = 0;
  for (const e of gameEvents) {
    if (e.derived?.scoreDeltaSide === null) continue; // gezählt in countCreditUnknown, hier nur überspringen
    if (e.derived?.scoreDeltaSide !== side) continue; // zählt für die andere Seite, hier nichts zu tun
    const h = eventHalf(e);
    if (h === null) { unknownPeriod++; continue; }
    half[h]++;
    const s = eventSegment(e);
    if (s === null) { absSecNull++; continue; }
    seg[s]++;
  }
  return { half, seg, unknownPeriod, absSecNull };
}

// ─────────────────────────────────────────────────────────────────────────
// Team-Ebene: volle Duell-Erwartung (beide Seiten, echte Reihenfolge — kein Platzhalter)
// ─────────────────────────────────────────────────────────────────────────

/**
 * `expectedOwn`/`expectedOpp` für EIN Team-Game — anders als `lambdaFullForRow` (Ligaebene) werden HIER beide Seiten
 * mit ihren ECHTEN Werten an `predictDuel` übergeben (kein `orderB`-Platzhalter): `expectedGoals.b` hängt von der
 * echten gegnerischen Reihenfolge ab, siehe Kopfkommentar. `null`, wenn eine der beiden Reihenfolgen nicht 1/2 ist
 * oder `predictDuel` nicht verfügbar/nicht endlich ist.
 * @returns {{expectedOwn:number, expectedOpp:number}|null}
 */
export function expectedDuelForRow(fit, ownRow, opponentRow) {
  if (!ownRow || !opponentRow) return null;
  const ownOrder = ownRow.derived?.gameOrderOfDay;
  const oppOrder = opponentRow.derived?.gameOrderOfDay;
  if (ownOrder !== 1 && ownOrder !== 2) return null;
  if (oppOrder !== 1 && oppOrder !== 2) return null;
  let pred;
  try {
    pred = predictDuel(fit, {
      teamA: ownRow.teamKey, teamB: ownRow.opponentKey, orderA: ownOrder, orderB: oppOrder,
      fieldPlayersA: ownRow.fieldPlayerCount, fieldPlayersB: opponentRow.fieldPlayerCount,
      hostA: ownRow.derived?.isHostingTeam ?? null, hostB: opponentRow.derived?.isHostingTeam ?? null,
    });
  } catch (e) {
    if (!(e instanceof S.NumericError)) throw e;
    return null;
  }
  if (!pred.available) return null;
  const { a, b } = pred.expectedGoals;
  if (!Number.isFinite(a) || a <= 0 || !Number.isFinite(b) || b <= 0) return null;
  return { expectedOwn: a, expectedOpp: b };
}

/**
 * Halbzeit-Tordifferenz-Residuen (2 Werte, HZ1/HZ2) für EIN Team-Game (siehe Kopfkommentar). `actualDiffHalf` über
 * `tallyGameGoals` (dieselbe `scoreDeltaSide`-Torzuordnung wie auf Ligaebene).
 * @returns {[number, number]} [diffResidualHalf(HZ1), diffResidualHalf(HZ2)]
 */
export function halfDiffResidualsForGame(gameEvents, ownSide, oppSide, expectedOwn, expectedOpp) {
  const own = tallyGameGoals(gameEvents, ownSide);
  const opp = tallyGameGoals(gameEvents, oppSide);
  const expectedDiffHalf = expectedOwn / 2 - expectedOpp / 2;
  return [1, 2].map((h) => (own.half[h] - opp.half[h]) - expectedDiffHalf);
}

/**
 * Late-Game-Residual (1 Wert, Segment 4 = letzte 10 Minuten) für EIN Team-Game (siehe Kopfkommentar, freigegebene
 * Interpretation: symmetrische M1-bereinigte Differenz, keine rohe Quote).
 * @returns {number} lateResidual
 */
export function lateResidualForGame(gameEvents, ownSide, oppSide, expectedOwn, expectedOpp) {
  const own = tallyGameGoals(gameEvents, ownSide);
  const opp = tallyGameGoals(gameEvents, oppSide);
  const expectedLateDiff = expectedOwn / 4 - expectedOpp / 4;
  return (own.seg[4] - opp.seg[4]) - expectedLateDiff;
}

// ─────────────────────────────────────────────────────────────────────────
// Team-Ebene: Normal-EB-Schrumpfung je Zelle (Kennzahl × Order), aus Schritt 1 unverändert wiederverwendet
// ─────────────────────────────────────────────────────────────────────────

/**
 * `estimateNormalPrior` + `shrinkToReference` (Schritt 1, `stats.mjs`, unverändert) über die Teams EINER Zelle.
 * `byTeamMap`: teamKey -> rohe Beobachtungswerte (jede Gruppe garantiert nicht leer, siehe Aufrufer). Team-Reihenfolge
 * kanonisch sortiert (Determinismus). Prior nicht schätzbar → `shrunkEffect` bleibt `null` je Team, `raw`/`n` bleiben
 * erhalten (sauberer Fallback, kein Clamping).
 * @returns {{prior:{estimable:true,mu:number,sigma2:number,tau2:number,k:number}|{estimable:false,reason:string},
 *   perTeam: Map<string,{n:number, raw:number, shrunkEffect:number|null}>}}
 */
function computeShrinkageForCell(byTeamMap) {
  const teamKeys = [...byTeamMap.keys()].sort();
  const perTeam = new Map();
  for (const tk of teamKeys) { const vals = byTeamMap.get(tk); perTeam.set(tk, { n: vals.length, raw: S.mean(vals), shrunkEffect: null }); }
  if (teamKeys.length < 2) return { prior: { estimable: false, reason: 'prior-not-estimable' }, perTeam };
  let prior;
  try {
    prior = S.estimateNormalPrior(teamKeys.map((tk) => byTeamMap.get(tk)));
  } catch (e) {
    if (!(e instanceof S.NumericError)) throw e;
    return { prior: { estimable: false, reason: e.code }, perTeam };
  }
  teamKeys.forEach((tk, i) => {
    const g = prior.groups[i];
    const shrink = S.shrinkToReference({ mu: prior.mu, tau2: prior.tau2, value: g.mean, variance: g.variance });
    perTeam.get(tk).shrunkEffect = shrink.shrunkEffect;
  });
  return { prior: { estimable: true, mu: prior.mu, sigma2: prior.sigma2, tau2: prior.tau2, k: prior.k }, perTeam };
}

function pushInto(map, key, values) {
  if (!map.has(key)) map.set(key, []);
  map.get(key).push(...values);
}

/**
 * Vollständige Team-Ebene (Halbzeit + Late-Game, beide Order-Zellen) für EIN Fit-Objekt (Punktschätzung oder ein
 * Bootstrap-Replikat — DIESELBE Funktion für beide, siehe Kopfkommentar). `membership`: bereits ausgewählte
 * Team-Games (`{teamKey, order, ownRow, opponentRow}`, siehe `fitFatigue`). `null`, wenn `expectedDuelForRow` für
 * irgendeine Zeile mit DIESEM Fit-Objekt fehlschlägt (Replikat insgesamt überspringen, siehe Kopfkommentar) — bei der
 * Punktschätzung durch die Auswahl von `membership` bereits ausgeschlossen, sollte hier also nicht auftreten.
 */
function computeTeamLevel(fitLike, membership, eventsByGame) {
  const byTeamOrderHz = { 1: new Map(), 2: new Map() };
  const byTeamOrderLate = { 1: new Map(), 2: new Map() };
  for (const m of membership) {
    const exp = expectedDuelForRow(fitLike, m.ownRow, m.opponentRow);
    if (!exp) return null;
    const oppSide = otherSide(m.ownRow.side);
    const gameEvents = eventsByGame.get(gameKey(m.ownRow.seasonKey, m.ownRow.gameId)) || [];
    const hz = halfDiffResidualsForGame(gameEvents, m.ownRow.side, oppSide, exp.expectedOwn, exp.expectedOpp);
    const late = lateResidualForGame(gameEvents, m.ownRow.side, oppSide, exp.expectedOwn, exp.expectedOpp);
    pushInto(byTeamOrderHz[m.order], m.teamKey, hz);
    pushInto(byTeamOrderLate[m.order], m.teamKey, [late]);
  }
  return {
    hz: { 1: computeShrinkageForCell(byTeamOrderHz[1]), 2: computeShrinkageForCell(byTeamOrderHz[2]) },
    late: { 1: computeShrinkageForCell(byTeamOrderLate[1]), 2: computeShrinkageForCell(byTeamOrderLate[2]) },
  };
}

// ─────────────────────────────────────────────────────────────────────────
// Spieler-Ebene: Zeilenauswahl (dieselbe M0-Zuordnungslogik wie M2, siehe Kopfkommentar)
// ─────────────────────────────────────────────────────────────────────────

const validPlayerId = (x) => typeof x === 'number' && Number.isFinite(x);

/**
 * Feldspieler-Kaderzeilen im Datumsschnitt, verknüpft mit der eigenen `teamGames`-Zeile (für `gameOrderOfDay`),
 * exakt der M2-Dublettenregel (höchstens eine Zeile je Spiel/playerId) folgend.
 */
function selectFieldPlayerRows(teamGames, rosterEntries, asOf) {
  const tgByKey = new Map();
  for (const t of teamGames) tgByKey.set(`${t.seasonKey}#${t.gameId}#${t.side}`, t);
  const rowsByKey = new Map();
  const goalieKeys = new Set();
  const rows = [];
  let missingPlayerId = 0;
  let duplicateRow = 0;
  let orderUnknown = 0;
  const rosterOrder = (a, b) => cmp(String(a.seasonKey), String(b.seasonKey)) || cmp(Number(a.gameId), Number(b.gameId)) || cmp(String(a.side), String(b.side))
    || cmp(String(a.teamKey), String(b.teamKey)) || cmp(Number(a.playerId), Number(b.playerId)) || cmp(String(a.playerName ?? ''), String(b.playerName ?? ''));
  for (const r of [...rosterEntries].sort(rosterOrder)) {
    const tg = tgByKey.get(`${r.seasonKey}#${r.gameId}#${r.side}`);
    if (!tg) continue; // Kaderzeile ohne eigenes Team-Game (laut M0 nicht vorgesehen), defensiv übersprungen
    if (!inCutoff(tg.date, asOf)) continue;
    const gk = gameKey(r.seasonKey, r.gameId);
    if (r.isGoalie === true) {
      if (validPlayerId(r.playerId)) goalieKeys.add(`${gk}#${r.playerId}`);
      continue;
    }
    if (r.isGoalie !== false) continue; // ungültiges Flag: defensiv ignoriert, wie M2s invalidGoalieFlag
    if (!validPlayerId(r.playerId)) { missingPlayerId++; continue; }
    const rk = `${gk}#${r.playerId}`;
    if (rowsByKey.has(rk)) { duplicateRow++; continue; }
    const go = tg.derived?.gameOrderOfDay;
    const row = {
      gk, seasonKey: r.seasonKey, gameId: r.gameId, teamKey: r.teamKey, playerId: r.playerId, name: r.playerName, date: tg.date,
      order: go === 1 || go === 2 ? go : null,
      goalsH1: 0, goalsH2: 0, goalsUnknown: 0, assistsH1: 0, assistsH2: 0, assistsUnknown: 0,
    };
    if (row.order === null) orderUnknown++;
    rowsByKey.set(rk, row);
    rows.push(row);
  }
  return { rows, rowsByKey, goalieKeys, missingPlayerId, duplicateRow, orderUnknown };
}

function newPlayerOrderAgg() { return { games: 0, points: 0, h2Points: 0, halfKnownPoints: 0, byTeam: new Map() }; }

/**
 * Vollständige Spieler-Ebene (unabhängig von M1, siehe Kopfkommentar) für einen Datumsschnitt.
 * @param {{teamGames:object[], goalEvents:object[], rosterEntries:object[]}} data
 * @param {{date:string|null, inclusive:boolean}} asOf bereits aufgelöst (dieselbe Instanz wie `fit.asOf`)
 */
function computePlayerLevel(data, asOf) {
  const sel = selectFieldPlayerRows(data.teamGames, data.rosterEntries, asOf);
  const inWindowGames = new Set(sel.rows.map((r) => r.gk));
  let goalsWithoutPlayerRow = 0;
  let assistsWithoutPlayerRow = 0;
  let assistsByGoalie = 0;

  for (const e of data.goalEvents) {
    const gk = gameKey(e.seasonKey, e.gameId);
    if (!inWindowGames.has(gk)) continue;
    if (e.isOwnGoal === true || e.isNotAssigned === true) continue;
    const d = e.derived ?? {};
    const half = eventHalf(e);
    if (d.scorerMatch === 'roster') {
      const row = validPlayerId(d.scorerPlayerId) ? sel.rowsByKey.get(`${gk}#${d.scorerPlayerId}`) : undefined;
      if (row) { if (half === 1) row.goalsH1++; else if (half === 2) row.goalsH2++; else row.goalsUnknown++; }
      else goalsWithoutPlayerRow++;
    }
    if (d.assistKind === 'player') {
      const validAssistId = validPlayerId(d.assistPlayerId);
      const row = validAssistId ? sel.rowsByKey.get(`${gk}#${d.assistPlayerId}`) : undefined;
      if (row) { if (half === 1) row.assistsH1++; else if (half === 2) row.assistsH2++; else row.assistsUnknown++; }
      else if (validAssistId && sel.goalieKeys.has(`${gk}#${d.assistPlayerId}`)) assistsByGoalie++;
      else assistsWithoutPlayerRow++;
    }
  }

  // ── Aggregation je Spieler und Order (nur Zeilen mit bekannter Reihenfolge) ──
  const canonicalRowOrder = (a, b) => cmp(a.date, b.date) || cmp(String(a.seasonKey), String(b.seasonKey)) || cmp(Number(a.gameId), Number(b.gameId)) || (a.playerId - b.playerId);
  sel.rows.sort(canonicalRowOrder);
  const byPlayer = new Map();
  for (const row of sel.rows) {
    if (row.order === null) continue;
    let p = byPlayer.get(row.playerId);
    if (!p) { p = { playerId: row.playerId, name: null, nameDate: null, teamLast: new Map(), byOrder: { 1: newPlayerOrderAgg(), 2: newPlayerOrderAgg() } }; byPlayer.set(row.playerId, p); }
    if (typeof row.name === 'string' && row.name !== '' && (p.nameDate === null || row.date > p.nameDate || (row.date === p.nameDate && row.name < p.name))) { p.name = row.name; p.nameDate = row.date; }
    if (!p.teamLast.has(row.teamKey) || row.date > p.teamLast.get(row.teamKey)) p.teamLast.set(row.teamKey, row.date);
    const points = row.goalsH1 + row.goalsH2 + row.goalsUnknown + row.assistsH1 + row.assistsH2 + row.assistsUnknown;
    const h2Points = row.goalsH2 + row.assistsH2;
    const halfKnownPoints = points - row.goalsUnknown - row.assistsUnknown;
    const agg = p.byOrder[row.order];
    agg.games++; agg.points += points; agg.h2Points += h2Points; agg.halfKnownPoints += halfKnownPoints;
    let t = agg.byTeam.get(row.teamKey);
    if (!t) { t = { games: 0, pointsList: [] }; agg.byTeam.set(row.teamKey, t); }
    t.games++; t.pointsList.push(points);
  }

  // ── Team-Zellen (teamKey × Order) für die Normal-EB-Referenz — `computeShrinkageForCell` unverändert wiederverwendet ──
  const cellGroups = { 1: new Map(), 2: new Map() }; // teamKey -> Map(playerId -> pointsList)
  for (const [playerId, p] of byPlayer) {
    for (const order of [1, 2]) {
      for (const [teamKey, t] of p.byOrder[order].byTeam) {
        if (!cellGroups[order].has(teamKey)) cellGroups[order].set(teamKey, new Map());
        cellGroups[order].get(teamKey).set(playerId, t.pointsList);
      }
    }
  }
  const cellResults = { 1: new Map(), 2: new Map() }; // teamKey -> computeShrinkageForCell(...)
  for (const order of [1, 2]) for (const [teamKey, byPlayerMap] of cellGroups[order]) cellResults[order].set(teamKey, computeShrinkageForCell(byPlayerMap));

  const primaryTeam = (p, order) => {
    const entries = [...p.byOrder[order].byTeam.entries()].sort((a, b) => b[1].games - a[1].games || cmp(a[0], b[0]));
    return entries.length > 0 ? entries[0][0] : null;
  };

  // ── H2-Share-Priors: EIN ligaweiter Prior je Order-Zelle (siehe Kopfkommentar) ──
  const h2Priors = { 1: null, 2: null };
  for (const order of [1, 2]) {
    const obs = [...byPlayer.values()].map((p) => ({ successes: p.byOrder[order].h2Points, trials: p.byOrder[order].halfKnownPoints })).filter((o) => o.trials > 0);
    if (obs.length >= 2) {
      try { h2Priors[order] = S.estimateBetaPrior(obs); } catch (e) { if (!(e instanceof S.NumericError)) throw e; h2Priors[order] = null; }
    }
  }

  // ── Ausgabe je Spieler ──
  const playerIds = [...byPlayer.keys()].sort((a, b) => a - b);
  const players = playerIds.map((playerId) => {
    const p = byPlayer.get(playerId);
    const teams = [...p.teamLast.entries()].sort((a, b) => cmp(b[1], a[1]) || cmp(a[0], b[0])).map(([teamKey]) => teamKey);
    const conditionOut = (order) => {
      const agg = p.byOrder[order];
      const n = agg.games;
      if (n === 0) return { n: 0, points: 0, pointsPerGameRaw: null, pointsPerGameShrunk: null };
      const raw = agg.points / n;
      const team = primaryTeam(p, order);
      const cell = team !== null ? cellResults[order].get(team) : undefined;
      const cellEntry = cell?.perTeam.get(playerId);
      let shrunk = null;
      if (cell && cell.prior.estimable && cellEntry) {
        shrunk = S.shrinkToReference({ mu: cell.prior.mu, tau2: cell.prior.tau2, value: raw, variance: cell.prior.sigma2 / n }).shrunkEffect;
      }
      return { n, points: agg.points, pointsPerGameRaw: raw, pointsPerGameShrunk: shrunk };
    };
    const g1 = conditionOut(1);
    const g2 = conditionOut(2);
    const eligible = g1.n >= MIN_GAMES_FOR_PLAYER_COMPARISON && g2.n >= MIN_GAMES_FOR_PLAYER_COMPARISON;
    const h2ShareOut = (order) => {
      const agg = p.byOrder[order];
      const trials = agg.halfKnownPoints;
      const successes = agg.h2Points;
      if (trials === 0) return { successes: 0, trials: 0, raw: null, posteriorMean: null, ci90: null };
      const raw = successes / trials;
      const prior = h2Priors[order];
      if (!prior) return { successes, trials, raw, posteriorMean: null, ci90: null };
      try {
        const post = S.betaBinomialPosterior({ alpha: prior.alpha, beta: prior.beta, successes, trials });
        return { successes, trials, raw, posteriorMean: post.mean, ci90: post.ci90 };
      } catch (e) {
        if (!(e instanceof S.NumericError)) throw e;
        return { successes, trials, raw, posteriorMean: null, ci90: null };
      }
    };
    return {
      playerId, name: p.name, teams,
      game1: g1, game2: g2,
      comparison: {
        deltaRaw: g1.pointsPerGameRaw === null || g2.pointsPerGameRaw === null ? null : g2.pointsPerGameRaw - g1.pointsPerGameRaw,
        deltaShrunk: g1.pointsPerGameShrunk === null || g2.pointsPerGameShrunk === null ? null : g2.pointsPerGameShrunk - g1.pointsPerGameShrunk,
      },
      h2Share: { game1: h2ShareOut(1), game2: h2ShareOut(2) },
      confidence: { eligible, nGame1: g1.n, nGame2: g2.n, reason: eligible ? null : 'insufficient-sample' },
    };
  });

  const insufficientComparisonSample = players.filter((pl) => !pl.confidence.eligible).length;
  const warnings = [];
  const addW = (code, count) => { if (count > 0) warnings.push({ code, count }); };
  addW('player-missing-player-id', sel.missingPlayerId);
  addW('player-roster-duplicate-row', sel.duplicateRow);
  addW('player-goal-without-roster-row', goalsWithoutPlayerRow);
  addW('player-assist-without-roster-row', assistsWithoutPlayerRow);
  addW('player-assist-by-goalie-not-attributed', assistsByGoalie);

  return {
    players,
    quality: {
      roster: { missingPlayerId: sel.missingPlayerId, duplicateRow: sel.duplicateRow, orderUnknown: sel.orderUnknown },
      goals: { withoutPlayerRow: goalsWithoutPlayerRow },
      assists: { withoutPlayerRow: assistsWithoutPlayerRow, byGoalie: assistsByGoalie },
      comparison: { players: players.length, eligible: players.length - insufficientComparisonSample, insufficient: insufficientComparisonSample },
    },
    warnings,
  };
}

// ─────────────────────────────────────────────────────────────────────────
// Fresh-vs-Tired: ausschließlich M0-teamGames, unabhängig von M1 (M1-Adjustierung ist ein rein optionaler Zusatz)
// ─────────────────────────────────────────────────────────────────────────

/**
 * Gerichtete Fresh-vs-Tired-Beobachtungen (siehe Kopfkommentar). `fit` optional (nur für das rein zusätzliche
 * `m1AdjustedGoalDiff`, siehe Abschnitt 6 des Auftrags) — die Kernberechnung liest ausschließlich `teamGames`.
 */
function computeFreshVsTired(teamGames, asOf, fit) {
  const rowByKey = new Map();
  for (const t of teamGames) rowByKey.set(`${t.seasonKey}#${t.gameId}#${t.side}`, t);
  const m1Usable = !!(fit && fit.estimable && fit.stage1?.estimable);

  let excludedOwnOrderUnknown = 0;
  let excludedOpponentOrderUnknown = 0;
  let excludedSameOrder = 0;
  const observations = [];
  const sorted = [...teamGames].sort(compareTeamGameRows);
  for (const r of sorted) {
    if (!inCutoff(r.date, asOf)) continue;
    const ownOrder = r.derived?.gameOrderOfDay;
    if (ownOrder !== 1 && ownOrder !== 2) { excludedOwnOrderUnknown++; continue; }
    // `opponentGameOrderOfDay` ist bereits in M0 (normalize.mjs) korrekt über die chronologische Spieltags-Gruppierung
    // des GEGNERS bestimmt (nicht über gameId-Arithmetik) — hier unverändert übernommen, nicht neu berechnet.
    const opponentOrder = r.derived?.opponentGameOrderOfDay;
    if (opponentOrder !== 1 && opponentOrder !== 2) { excludedOpponentOrderUnknown++; continue; }
    if (ownOrder === opponentOrder) { excludedSameOrder++; continue; }

    // `opponentPrevGameGoalDiff` ebenfalls unverändert aus M0 übernommen: nur gesetzt, wenn der Gegner in GENAU
    // diesem Spiel sein eigenes 2. Spiel des Tages bestreitet (siehe normalize.mjs) — sonst null (kein eigenes
    // vorheriges Spiel). `opponentPrevGameResult` wird ausschließlich aus dessen Vorzeichen abgeleitet (Abschnitt 5:
    // keine neue Knappheitsvariable).
    const rawDiff = r.derived?.opponentPrevGameGoalDiff;
    const opponentPrevGameGoalDiff = typeof rawDiff === 'number' && Number.isFinite(rawDiff) ? rawDiff : null;
    const opponentPrevGameResult = opponentPrevGameGoalDiff === null ? null : opponentPrevGameGoalDiff > 0 ? 'win' : opponentPrevGameGoalDiff < 0 ? 'loss' : 'draw';

    let m1AdjustedGoalDiff = null;
    if (m1Usable) {
      const opponentRow = rowByKey.get(`${r.seasonKey}#${r.gameId}#${otherSide(r.side)}`);
      const exp = opponentRow ? expectedDuelForRow(fit, r, opponentRow) : null;
      if (exp) m1AdjustedGoalDiff = (r.goalsFor - r.goalsAgainst) - (exp.expectedOwn - exp.expectedOpp);
    }

    observations.push({
      gameId: r.gameId, seasonKey: r.seasonKey, teamKey: r.teamKey, opponentTeamKey: r.opponentKey,
      ownOrder, opponentOrder, state: ownOrder === 1 ? 'fresh' : 'tired', opponentState: opponentOrder === 1 ? 'fresh' : 'tired',
      ownGoals: r.goalsFor, opponentGoals: r.goalsAgainst, ownGoalDiff: r.goalsFor - r.goalsAgainst,
      opponentPrevGameResult, opponentPrevGameGoalDiff, m1AdjustedGoalDiff,
    });
  }

  const summaryFor = (state) => {
    const rows = observations.filter((o) => o.state === state);
    const withM1 = rows.filter((o) => o.m1AdjustedGoalDiff !== null);
    return {
      n: rows.length,
      meanGoalDiff: rows.length > 0 ? S.mean(rows.map((o) => o.ownGoalDiff)) : null,
      meanM1AdjustedGoalDiff: withM1.length > 0 ? S.mean(withM1.map((o) => o.m1AdjustedGoalDiff)) : null,
    };
  };

  const warnings = [];
  const addW = (code, count) => { if (count > 0) warnings.push({ code, count }); };
  addW('fresh-vs-tired-own-order-unknown', excludedOwnOrderUnknown);
  addW('fresh-vs-tired-opponent-order-unknown', excludedOpponentOrderUnknown);
  addW('fresh-vs-tired-same-order-excluded', excludedSameOrder);

  return {
    status: observations.length > 0 ? 'ok' : 'empty',
    observations,
    summary: { fresh: summaryFor('fresh'), tired: summaryFor('tired') },
    quality: { excludedOwnOrderUnknown, excludedOpponentOrderUnknown, excludedSameOrder, m1Available: m1Usable },
    warnings,
  };
}

// ─────────────────────────────────────────────────────────────────────────
// Design-Matrizen (Halbzeit, Segment) — Spalten ohne Variation werden entfernt (wie team-strength.mjs)
// ─────────────────────────────────────────────────────────────────────────

function halfColumnSpecs() {
  return [
    { name: 'h2', value: (r) => r.half },
    { name: 'orderXHalf', value: (r) => r.half * r.order2 },
  ];
}
function segmentColumnSpecs() {
  return [
    { name: 'seg2', value: (r) => (r.seg === 2 ? 1 : 0) },
    { name: 'seg3', value: (r) => (r.seg === 3 ? 1 : 0) },
    { name: 'seg4', value: (r) => (r.seg === 4 ? 1 : 0) },
    { name: 'orderXSeg2', value: (r) => (r.seg === 2 ? r.order2 : 0) },
    { name: 'orderXSeg3', value: (r) => (r.seg === 3 ? r.order2 : 0) },
    { name: 'orderXSeg4', value: (r) => (r.seg === 4 ? r.order2 : 0) },
  ];
}

/** Baut X (mit Achsenabschnitt) aus den Kandidatenspalten; Spalten ohne Variation werden entfernt (`dropped`). */
function buildDesign(rows, specs) {
  const n = rows.length;
  const kept = [];
  const dropped = [];
  for (const spec of specs) {
    const ones = rows.reduce((s, r) => s + spec.value(r), 0);
    if (ones === 0 || ones === n) dropped.push(spec.name); else kept.push(spec);
  }
  const names = ['intercept', ...kept.map((s) => s.name)];
  const X = rows.map((r) => [1, ...kept.map((s) => s.value(r))]);
  return { X, names, dropped };
}

/** Fittet ein M4-Poisson-Modell (kein Ridge, wie freigegeben) mit gegebenem Offset-Vektor auf derselben X/y. */
function fitM4Poisson(X, y, offset) {
  try {
    return S.fitPoissonRegression({ X, y, offset, penalty: 0 });
  } catch (e) {
    if (e instanceof S.NumericError) return { converged: false, reason: e.code, beta: null };
    throw e;
  }
}

// ─────────────────────────────────────────────────────────────────────────
// Hauptfunktion
// ─────────────────────────────────────────────────────────────────────────

function emptyEffect() { return { estimate: null, ci90: null }; }
function emptySegments() { return { seg1: emptyEffect(), seg2: emptyEffect(), seg3: emptyEffect(), seg4: emptyEffect(), orderXSeg2: emptyEffect(), orderXSeg3: emptyEffect(), orderXSeg4: emptyEffect() }; }

/**
 * M4-Fit (Liga-, Team- und Spieler-Ebene) für einen Datumsschnitt.
 * @param {{teamGames:object[], goalEvents:object[], rosterEntries?:object[]}} data M0-Arrays (alle Saisons zusammen);
 *   `rosterEntries` ist optional und nur für die Spieler-Ebene nötig (fehlt es, bleibt `players` leer).
 * @param {{asOf?:{date:string, inclusive?:boolean}, replicates:number, seed:number, halfLifeDays?:number, ridge?:number}} options
 *   `replicates`/`seed` sind PFLICHT (M4 liefert ausschließlich Bootstrap-ci90 für Liga-/Team-Ebene, siehe
 *   Kopfkommentar — die Spieler-Ebene braucht keinen Bootstrap). `asOf`/`halfLifeDays`/`ridge` werden unverändert an
 *   `bootstrapTeamStrength` (M1) durchgereicht; die Spieler-Ebene verwendet exakt denselben aufgelösten `asOf`-Wert.
 * @returns {object} { model:'M4-fatigue', status, asOf, asOfGameDate, league:{effects, halfModel, segmentModel},
 *   teams:[{teamKey, game1:{hz,lateGameIndex}, game2:{hz,lateGameIndex}}],
 *   players:[{playerId, name, teams, game1, game2, comparison, h2Share, confidence}],
 *   freshVsTired:{status, observations, summary:{fresh,tired}, quality, warnings}, quality, warnings }
 */
export function fitFatigue(data, options = {}) {
  if (!data || !Array.isArray(data.teamGames) || !Array.isArray(data.goalEvents)) {
    throw new S.NumericError('invalid-input', 'fitFatigue: { teamGames, goalEvents } (M0-Arrays) erwartet');
  }
  if (data.rosterEntries !== undefined && !Array.isArray(data.rosterEntries)) {
    throw new S.NumericError('invalid-input', 'fitFatigue: rosterEntries muss, wenn angegeben, ein Array sein (Spieler-Ebene, optional — fehlt es, bleibt players leer)');
  }
  const rosterEntries = Array.isArray(data.rosterEntries) ? data.rosterEntries : [];
  if (options.replicates === undefined || options.seed === undefined) {
    throw new S.NumericError('invalid-input', 'fitFatigue: replicates und seed sind erforderlich (M4 liefert ausschließlich Bootstrap-ci90, kein Nur-Punktschätzung-Pfad)');
  }
  const halfLifeDays = options.halfLifeDays;
  const ridge = options.ridge;
  if (halfLifeDays !== undefined && (!Number.isFinite(halfLifeDays) || halfLifeDays <= 0)) throw new S.NumericError('invalid-input', 'halfLifeDays muss endlich und > 0 sein');
  if (ridge !== undefined && (!Number.isFinite(ridge) || ridge < 0)) throw new S.NumericError('invalid-input', 'ridge muss endlich und ≥ 0 sein');

  const warnings = [];
  const bootstrapOptions = { asOf: options.asOf, replicates: options.replicates, seed: options.seed, keepReplicates: true, ...(halfLifeDays !== undefined ? { halfLifeDays } : {}), ...(ridge !== undefined ? { ridge } : {}) };
  const fit = bootstrapTeamStrength(data.teamGames, bootstrapOptions);
  const asOfOut = { date: fit.asOf.date, inclusive: fit.asOf.inclusive };

  // Spieler-Ebene und Fresh-vs-Tired: unabhängig von M1 (siehe jeweilige Kopfkommentare), daher VOR der
  // M1-Estimability-Prüfung berechnet und in JEDEM Rückgabezweig identisch verfügbar. `fit.asOf` ist auch im nicht
  // schätzbaren M1-Fall bereits aufgelöst. Fresh-vs-Tired erhält `fit` NUR für das optionale `m1AdjustedGoalDiff`.
  const playerLevel = computePlayerLevel({ teamGames: data.teamGames, goalEvents: data.goalEvents, rosterEntries }, fit.asOf);
  const freshVsTired = computeFreshVsTired(data.teamGames, fit.asOf, fit);

  if (!fit.estimable || !fit.stage1.estimable) {
    return {
      model: 'M4-fatigue', status: 'not-estimable', asOf: asOfOut, asOfGameDate: null,
      league: { effects: { halfHz2: emptyEffect(), orderXHalf: emptyEffect(), segments: emptySegments() }, halfModel: { estimable: false, reason: fit.reason ?? 'm1-not-estimable' }, segmentModel: { estimable: false, reason: fit.reason ?? 'm1-not-estimable' } },
      teams: [],
      players: playerLevel.players,
      freshVsTired,
      quality: { teamGames: { eligible: 0, excludedOrderNull: 0, excludedOutsideCutoff: 0, excludedM1Unavailable: 0 }, goals: null, bootstrap: null, teamLevel: null, shrinkage: null, player: playerLevel.quality },
      warnings: [{ code: 'm1-not-estimable', reason: fit.reason ?? null }, ...playerLevel.warnings, ...freshVsTired.warnings],
    };
  }

  const sel = selectEligibleRows(data.teamGames, fit.asOf);
  if (sel.eligible.length === 0) {
    return {
      model: 'M4-fatigue', status: 'empty', asOf: asOfOut, asOfGameDate: null,
      league: { effects: { halfHz2: emptyEffect(), orderXHalf: emptyEffect(), segments: emptySegments() }, halfModel: { estimable: false, reason: 'no-eligible-rows' }, segmentModel: { estimable: false, reason: 'no-eligible-rows' } },
      teams: [],
      players: playerLevel.players,
      freshVsTired,
      quality: { teamGames: { eligible: 0, excludedOrderNull: sel.excludedOrderNull, excludedOutsideCutoff: sel.excludedOutsideCutoff, excludedM1Unavailable: 0 }, goals: null, bootstrap: null, teamLevel: null, shrinkage: null, player: playerLevel.quality },
      warnings: [{ code: 'empty-asof', reason: sel.totalInCutoff === 0 ? 'no-rows-in-cutoff' : 'no-order-known-rows' }, ...playerLevel.warnings, ...freshVsTired.warnings],
    };
  }

  const rowByKey = new Map();
  for (const t of data.teamGames) rowByKey.set(`${t.seasonKey}#${t.gameId}#${t.side}`, t);
  const eventsByGame = groupEventsByGame(data.goalEvents);

  // ── Punktschätzung: lambdaFull, Torzählung je Team-Game (einmal, wiederverwendet für alle Bootstrap-Replikate) ──
  const rows = []; // { half:{1,2}, seg:{1..4}, order2, lambdaFull }
  let excludedM1Unavailable = 0;
  let creditUnknownTotal = 0;
  let unknownPeriodTotal = 0;
  let absSecNullTotal = 0;
  const creditUnknownCountedGames = new Set(); // je Spiel nur einmal zählen, nicht je Seite (sonst doppelt)
  for (const r of sel.eligible) {
    const opponentRow = rowByKey.get(`${r.seasonKey}#${r.gameId}#${otherSide(r.side)}`);
    const lambdaFull = lambdaFullForRow(fit, r, opponentRow);
    if (lambdaFull === null) { excludedM1Unavailable++; continue; }
    const gk = gameKey(r.seasonKey, r.gameId);
    const gameEvents = eventsByGame.get(gk) || [];
    if (!creditUnknownCountedGames.has(gk)) { creditUnknownCountedGames.add(gk); creditUnknownTotal += countCreditUnknown(gameEvents); }
    const tally = tallyGameGoals(gameEvents, r.side);
    unknownPeriodTotal += tally.unknownPeriod;
    absSecNullTotal += tally.absSecNull;
    rows.push({ half: tally.half, seg: tally.seg, order2: r.derived.gameOrderOfDay === 2 ? 1 : 0, lambdaFull, ownRow: r, opponentRow });
  }
  if (excludedM1Unavailable > 0) warnings.push({ code: 'm1-prediction-unavailable', count: excludedM1Unavailable });
  if (creditUnknownTotal > 0) warnings.push({ code: 'goal-credit-unknown-excluded', count: creditUnknownTotal });
  if (unknownPeriodTotal > 0) warnings.push({ code: 'unknown-period-excluded', count: unknownPeriodTotal });
  if (absSecNullTotal > 0) warnings.push({ code: 'abs-sec-null-excluded-from-segments', count: absSecNullTotal });

  if (rows.length === 0) {
    return {
      model: 'M4-fatigue', status: 'not-estimable', asOf: asOfOut, asOfGameDate: sel.eligible[sel.eligible.length - 1].date,
      league: { effects: { halfHz2: emptyEffect(), orderXHalf: emptyEffect(), segments: emptySegments() }, halfModel: { estimable: false, reason: 'no-rows-with-m1-prediction' }, segmentModel: { estimable: false, reason: 'no-rows-with-m1-prediction' } },
      teams: [],
      players: playerLevel.players,
      freshVsTired,
      quality: { teamGames: { eligible: sel.eligible.length, excludedOrderNull: sel.excludedOrderNull, excludedOutsideCutoff: sel.excludedOutsideCutoff, excludedM1Unavailable }, goals: null, bootstrap: null, teamLevel: null, shrinkage: null, player: playerLevel.quality },
      warnings: [...warnings, ...playerLevel.warnings, ...freshVsTired.warnings],
    };
  }

  // ── Halbzeit-Beobachtungen: 2 Zeilen je Team-Game (H1, H2) ──
  const halfObsMeta = rows.flatMap((r) => [{ half: 0, order2: r.order2, y: r.half[1], lambdaFull: r.lambdaFull }, { half: 1, order2: r.order2, y: r.half[2], lambdaFull: r.lambdaFull }]);
  const halfDesign = buildDesign(halfObsMeta, halfColumnSpecs());
  const halfY = halfObsMeta.map((r) => r.y);
  const halfOffsetFromLambdas = (lambdas) => halfObsMeta.map((_, i) => Math.log(lambdas[Math.floor(i / 2)] / 2));

  // ── Segment-Beobachtungen: 4 Zeilen je Team-Game (Seg 1..4) ──
  const segObsMeta = rows.flatMap((r) => [1, 2, 3, 4].map((seg) => ({ seg, order2: r.order2, y: r.seg[seg], lambdaFull: r.lambdaFull })));
  const segDesign = buildDesign(segObsMeta, segmentColumnSpecs());
  const segY = segObsMeta.map((r) => r.y);
  const segOffsetFromLambdas = (lambdas) => segObsMeta.map((_, i) => Math.log(lambdas[Math.floor(i / 4)] / 4));

  const halfFitPoint = fitM4Poisson(halfDesign.X, halfY, halfOffsetFromLambdas(rows.map((r) => r.lambdaFull)));
  const segFitPoint = fitM4Poisson(segDesign.X, segY, segOffsetFromLambdas(rows.map((r) => r.lambdaFull)));
  if (!halfFitPoint.converged) warnings.push({ code: 'half-model-not-converged', reason: halfFitPoint.reason });
  if (!segFitPoint.converged) warnings.push({ code: 'segment-model-not-converged', reason: segFitPoint.reason });
  for (const name of halfDesign.dropped) warnings.push({ code: 'half-effect-not-estimable', effect: name, reason: 'no-variation' });
  for (const name of segDesign.dropped) warnings.push({ code: 'segment-effect-not-estimable', effect: name, reason: 'no-variation' });

  const halfCoef = (name) => { const i = halfDesign.names.indexOf(name); return halfFitPoint.converged && i >= 0 ? halfFitPoint.beta[i] : null; };
  const segCoef = (name) => { const i = segDesign.names.indexOf(name); return segFitPoint.converged && i >= 0 ? segFitPoint.beta[i] : null; };

  // ── Team-Ebene: Mitgliedschaft (strenger als `rows` — Gegner-Reihenfolge muss ZUSÄTZLICH bekannt sein, siehe
  // Kopfkommentar), EINMAL bestimmt und für Punktschätzung UND jedes Bootstrap-Replikat unverändert wiederverwendet.
  const membership = []; // { teamKey, order, ownRow, opponentRow }
  let excludedOpponentOrderUnknown = 0;
  let excludedM1UnavailableTeamLevel = 0;
  for (const r of rows) {
    const oppOrder = r.opponentRow.derived?.gameOrderOfDay;
    if (oppOrder !== 1 && oppOrder !== 2) { excludedOpponentOrderUnknown++; continue; }
    const exp = expectedDuelForRow(fit, r.ownRow, r.opponentRow);
    if (!exp) { excludedM1UnavailableTeamLevel++; continue; }
    membership.push({ teamKey: r.ownRow.teamKey, order: r.ownRow.derived.gameOrderOfDay, ownRow: r.ownRow, opponentRow: r.opponentRow });
  }
  if (excludedOpponentOrderUnknown > 0) warnings.push({ code: 'team-level-opponent-order-unknown', count: excludedOpponentOrderUnknown });
  if (excludedM1UnavailableTeamLevel > 0) warnings.push({ code: 'team-level-m1-prediction-unavailable', count: excludedM1UnavailableTeamLevel });
  const teamPoint = membership.length > 0 ? computeTeamLevel(fit, membership, eventsByGame) : null;
  if (membership.length > 0 && teamPoint === null) warnings.push({ code: 'team-level-not-estimable', reason: 'expected-duel-unavailable' });

  // ── Bootstrap: je Replikat neue lambdaFull, neue Offsets, Refit beider Teilmodelle auf denselben y/X; dieselbe
  // Rekonstruktion (`fitLike`) treibt zusätzlich die Team-Ebene (`computeTeamLevel`, derselbe Codepfad wie oben) ──
  const replicateVectors = fit.bootstrap.available ? fit.bootstrap.replicateEstimates : [];
  const replicateKeys = fit.bootstrap.available ? fit.bootstrap.keys : [];
  const collected = { h2: [], orderXHalf: [], segIntercept: [], seg2: [], seg3: [], seg4: [], orderXSeg2: [], orderXSeg3: [], orderXSeg4: [] };
  const teamCollected = new Map(); // teamKey -> { hz:{1:[],2:[]}, late:{1:[],2:[]} } (Replikat-shrunkEffect-Werte)
  const collectTeamLevel = (teamLevelResult) => {
    if (!teamLevelResult) return;
    for (const metric of ['hz', 'late']) {
      for (const order of [1, 2]) {
        const cell = teamLevelResult[metric][order];
        if (!cell.prior.estimable) continue;
        for (const [tk, v] of cell.perTeam) {
          if (v.shrunkEffect === null) continue;
          if (!teamCollected.has(tk)) teamCollected.set(tk, { hz: { 1: [], 2: [] }, late: { 1: [], 2: [] } });
          teamCollected.get(tk)[metric][order].push(v.shrunkEffect);
        }
      }
    }
  };
  let bootstrapFailed = 0;
  for (const vec of replicateVectors) {
    const fitLike = fitLikeFromReplicate(replicateKeys, vec);
    // lambdaFull je Team-Game (gleiche Reihenfolge wie `rows`) mit dem rekonstruierten Fit-Objekt neu berechnen;
    // dieselbe Teilmenge Team-Games wie beim Punktschätzer (`rows` wurde bereits danach gefiltert), dieselben y/X.
    const lambdas = new Array(rows.length);
    let ok = true;
    for (let i = 0; i < rows.length; i++) {
      const l = lambdaFullForRow(fitLike, rows[i].ownRow, rows[i].opponentRow);
      if (l === null) { ok = false; break; }
      lambdas[i] = l;
    }
    if (!ok) { bootstrapFailed++; continue; }

    const hFit = fitM4Poisson(halfDesign.X, halfY, halfOffsetFromLambdas(lambdas));
    const sFit = fitM4Poisson(segDesign.X, segY, segOffsetFromLambdas(lambdas));
    if (!hFit.converged || !sFit.converged) { bootstrapFailed++; continue; }
    const hAt = (name) => { const i = halfDesign.names.indexOf(name); return i >= 0 ? hFit.beta[i] : null; };
    const sAt = (name) => { const i = segDesign.names.indexOf(name); return i >= 0 ? sFit.beta[i] : null; };
    for (const name of ['h2', 'orderXHalf']) { const v = hAt(name); if (v !== null) collected[name].push(v); }
    const sIntercept = sAt('intercept'); if (sIntercept !== null) collected.segIntercept.push(sIntercept);
    for (const name of ['seg2', 'seg3', 'seg4', 'orderXSeg2', 'orderXSeg3', 'orderXSeg4']) { const v = sAt(name); if (v !== null) collected[name].push(v); }

    if (membership.length > 0) collectTeamLevel(computeTeamLevel(fitLike, membership, eventsByGame));
  }
  if (bootstrapFailed > 0) warnings.push({ code: 'bootstrap-replicate-refit-failed', count: bootstrapFailed, of: replicateVectors.length });

  const ci90 = (list) => (list.length > 0 ? [S.quantile(list, 0.05), S.quantile(list, 0.95)] : null);
  const effect = (estimate, list) => ({ estimate, ci90: estimate === null ? null : ci90(list) });

  // ── Team-Ebene: Ausgabe zusammenbauen (leere/„nicht schätzbar"-Zellen sauber, keine erfundenen Beobachtungen) ──
  const teamCellOutput = (metric, order, teamKey) => {
    const cell = teamPoint?.[metric]?.[order];
    const entry = cell?.perTeam.get(teamKey);
    const n = entry ? entry.n : 0;
    const raw = entry ? entry.raw : null;
    const shrunkEffect = entry ? entry.shrunkEffect : null;
    const replicateList = teamCollected.get(teamKey)?.[metric]?.[order] ?? [];
    return { n, raw, shrunkEffect, ci90: shrunkEffect === null ? null : ci90(replicateList) };
  };
  const allTeamKeys = [...new Set(membership.map((m) => m.teamKey))].sort();
  const teamsOut = allTeamKeys.map((tk) => ({
    teamKey: tk,
    game1: { hz: teamCellOutput('hz', 1, tk), lateGameIndex: teamCellOutput('late', 1, tk) },
    game2: { hz: teamCellOutput('hz', 2, tk), lateGameIndex: teamCellOutput('late', 2, tk) },
  }));
  const priorOutput = (metric, order) => {
    const p = teamPoint?.[metric]?.[order]?.prior;
    if (!p) return { estimable: false, reason: 'no-data' };
    return p.estimable ? { estimable: true, mu: p.mu, sigma2: p.sigma2, tau2: p.tau2, k: p.k } : { estimable: false, reason: p.reason };
  };
  const shrinkageQuality = teamPoint === null && membership.length === 0 ? null : {
    team: {
      hz: { game1: priorOutput('hz', 1), game2: priorOutput('hz', 2) },
      late: { game1: priorOutput('late', 1), game2: priorOutput('late', 2) },
    },
  };

  const result = {
    model: 'M4-fatigue', status: 'ok', asOf: asOfOut, asOfGameDate: sel.eligible[sel.eligible.length - 1].date,
    league: {
      effects: {
        halfHz2: effect(halfCoef('h2'), collected.h2),
        orderXHalf: effect(halfCoef('orderXHalf'), collected.orderXHalf),
        segments: {
          seg1: effect(segCoef('intercept'), collected.segIntercept), // Referenzsegment: Intercept selbst (keine eigene Design-Spalte)
          seg2: effect(segCoef('seg2'), collected.seg2),
          seg3: effect(segCoef('seg3'), collected.seg3),
          seg4: effect(segCoef('seg4'), collected.seg4),
          orderXSeg2: effect(segCoef('orderXSeg2'), collected.orderXSeg2),
          orderXSeg3: effect(segCoef('orderXSeg3'), collected.orderXSeg3),
          orderXSeg4: effect(segCoef('orderXSeg4'), collected.orderXSeg4),
        },
      },
      halfModel: { estimable: halfFitPoint.converged, converged: halfFitPoint.converged, reason: halfFitPoint.converged ? null : halfFitPoint.reason, columns: halfDesign.names, droppedEffects: halfDesign.dropped, rows: { teamGames: rows.length, observations: halfObsMeta.length } },
      segmentModel: { estimable: segFitPoint.converged, converged: segFitPoint.converged, reason: segFitPoint.converged ? null : segFitPoint.reason, columns: segDesign.names, droppedEffects: segDesign.dropped, rows: { teamGames: rows.length, observations: segObsMeta.length } },
    },
    teams: teamsOut,
    players: playerLevel.players,
    freshVsTired,
    quality: {
      teamGames: { eligible: sel.eligible.length, excludedOrderNull: sel.excludedOrderNull, excludedOutsideCutoff: sel.excludedOutsideCutoff, excludedM1Unavailable },
      goals: { creditUnknownExcluded: creditUnknownTotal, unknownPeriodExcluded: unknownPeriodTotal, absSecNullExcludedFromSegments: absSecNullTotal },
      bootstrap: { replicates: replicateVectors.length, failed: bootstrapFailed, usable: replicateVectors.length - bootstrapFailed },
      teamLevel: { eligible: membership.length, excludedOpponentOrderUnknown, excludedM1Unavailable: excludedM1UnavailableTeamLevel, teams: allTeamKeys.length },
      shrinkage: shrinkageQuality,
      player: playerLevel.quality,
    },
    warnings: [...warnings, ...playerLevel.warnings, ...freshVsTired.warnings],
  };
  return S.roundOutput(result);
}

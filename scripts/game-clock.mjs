// Eine einzige Stelle, die (Halbzeit, Zeit) in absolute Sekunden seit Spielbeginn umrechnet
// (S2e-Auftrag "Spielzeit normalisieren"). Eigenes Modul statt Erweiterung von
// scripts/game-ordering.mjs: andere fachliche Zuständigkeit (Zeit-Arithmetik statt
// Sortierung), keine eigenen Abhängigkeiten — genau wie game-ordering.mjs/game-status.mjs.
//
// Befund (siehe Auftragsbericht): die 2. Halbzeit wird in den Saisondateien uneinheitlich
// erfasst — mal RELATIV zum Beginn der 2. Halbzeit (0:00-20:00), mal DURCHLAUFEND als
// Fortsetzung der Spielzeit (20:00-40:00). Vier Ereignisse in 21/22 verwenden zusätzlich
// einen Punkt statt Doppelpunkt ("3.25" statt "3:25") — tolerant in parseGameClock()
// behandelt. Bloße Zahlen ohne Trenner werden bewusst NICHT akzeptiert: sie waren nie
// eindeutig als Minuten:Sekunden von einer reinen Minutenangabe zu unterscheiden, also
// lieber `null` als geraten.
//
// Konvention pro Spiel (siehe detectSecondHalfConvention()): Mehrheitsregel über alle
// auswertbaren Ereignisse der 2. Halbzeit. Ereignisse, die der Mehrheit widersprechen,
// bekommen `null` (Einzelausschluss), das Spiel bleibt im Übrigen gültig. Nur bei exaktem
// Gleichstand ist das Spiel als Ganzes "unklar" und wird komplett ausgeschlossen (auch
// Halbzeit 1 — "ganz", nicht nur die 2. Halbzeit). Über alle 6 Saisons: genau 1 Spiel
// unklar (21/22, Spiel 25661), genau 4 widersprechende Einzelereignisse verworfen
// (21/22 25682: 1, 21/22 25693: 1, 22/23 29268: 2, 23/24 32748: 0) — siehe
// scripts/test-game-clock.mjs für die Belege gegen die echten Saisondateien.
//
// Bereichsprüfung ist periodenbewusst (siehe classifyGameClock()), NICHT in parseGameClock()
// selbst: parseGameClock() kennt die Periode nicht und darf deshalb keine Längengrenze
// durchsetzen, die nur für Halbzeit 1/2 gilt. GAME_LENGTH_SEC (40:00) ist die Obergrenze für
// Ereignisse in Halbzeit 1 oder 2 — für period >= 3 (Verlängerung, Penalty-Schießen) gilt sie
// NICHT, diese Perioden sind von dieser Funktion bewusst noch nicht unterstützt
// (classifyGameClock() liefert dafür den eigenen Status 'unsupportedPeriod', kein stilles
// `null`). In den sechs geprüften Saisondateien kommt period >= 3 kein einziges Mal vor —
// das wird gebaut, wenn es zum ersten Mal vorkommt, nicht vorab geraten.
//
// Reine Funktionen: lesen nur ihre Argumente, verändern nichts — insbesondere NICHT die
// Saisondateien selbst (die bleiben die unveränderte Antwort des Saisonmanagers, siehe
// CLAUDE.md/Golden-Baseline). Die Normalisierung passiert ausschließlich beim Lesen.
//
// Bewusst NICHT angefasst (eigener, vertagter Schritt — siehe Auftrag): scripts/model/
// normalize.mjs hat eine eigene, unabhängige Version dieser Logik (parseClockSeconds/
// detectGameTimeFormat/eventTiming), drift-getestet gegen index.html in
// scripts/test-model-normalize.mjs. Die Zusammenlegung beider Pfade auf dieses Modul ist
// beschlossen, aber bewusst auf einen eigenen Schritt vertagt (siehe Kommentar dort).

// Unabhängig bestätigt (siehe Auftragsbericht), NICHT aus der höchsten Ereigniszeit der
// Saisondaten abgeleitet — sonst würde jedes Spiel ohne spätes Ereignis fälschlich als
// kürzer gelten.
export const HALF_LENGTH_SEC = 20 * 60; // 20:00 je Halbzeit
export const GAME_LENGTH_SEC = 40 * 60; // 40:00 Gesamtspielzeit (2 Halbzeiten) — gilt nur für period 1/2.

/**
 * Zeitstring tolerant parsen: NUR "m:ss"/"mm:ss" mit Doppelpunkt ODER Punkt als Trenner
 * zwischen Minuten und Sekunden (z.B. "3:25" oder "3.25"). Bloße Zahlen ohne Trenner, leere
 * Werte und Sekunden außerhalb 0-59 liefern `null` — nie `NaN`, nie geraten. KEINE
 * Längenprüfung hier (siehe classifyGameClock()): diese Funktion kennt die Periode nicht und
 * darf deshalb keine Grenze durchsetzen, die nur für bestimmte Perioden gilt.
 */
export function parseGameClock(raw) {
  if (raw === undefined || raw === null || raw === '') return null;
  const s = String(raw).trim();
  const m = s.match(/^(\d{1,2})[:.](\d{1,2})$/);
  if (!m) return null;
  const minutes = Number(m[1]);
  const seconds = Number(m[2]);
  if (!Number.isFinite(minutes) || !Number.isFinite(seconds) || seconds < 0 || seconds >= 60) return null;
  return minutes * 60 + seconds;
}

/**
 * Konvention der 2. Halbzeit für EIN Spiel bestimmen, per Mehrheitsregel über alle
 * auswertbaren Ereignisse mit `period === 2` im Spiel (nicht nur Tore — jedes Ereignis mit
 * einer Zeitangabe zählt; period >= 3 wird hier bewusst NICHT betrachtet — Verlängerung/
 * Penalty-Schießen haben mit der Konvention der regulären 2. Halbzeit nichts zu tun). Ein
 * Ereignis spricht nur dann für `'durchlaufend'`, wenn seine Zeit ECHT GRÖSSER als
 * HALF_LENGTH_SEC (20:00) ist — exakt 20:00 ist in beiden Lesarten dieselbe absolute Sekunde
 * (Kickoff der 2. Halbzeit unter "durchlaufend" bzw. letzte Sekunde der 2. Halbzeit unter
 * "relativ") und damit kein Widerspruch, zählt als Stimme für `'relativ'`.
 * - Mehrheit `'durchlaufend'` bzw. `'relativ'`: das Spiel gilt als diese Konvention, die
 *   widersprechenden Einzelereignisse werden in classifyGameClock() verworfen (siehe dort),
 *   der Rest des Spiels bleibt gültig.
 * - Exakter Gleichstand (gleich viele Stimmen je Seite): `'unklar'` — nicht raten, das
 *   ganze Spiel wird ausgeschlossen (siehe classifyGameClock()).
 * - `null`, wenn das Spiel keine auswertbare Zeit in der 2. Halbzeit hat (keine Entscheidung
 *   nötig, z.B. torloses/ereignisloses zweites Halbzeit).
 */
export function detectSecondHalfConvention(game) {
  let durchlaufendVotes = 0;
  let relativVotes = 0;
  for (const ev of (game?.events || [])) {
    if (Number(ev?.period) !== 2) continue;
    const s = parseGameClock(ev?.time);
    if (s === null) continue;
    if (s > HALF_LENGTH_SEC) durchlaufendVotes++;
    else relativVotes++;
  }
  if (durchlaufendVotes === 0 && relativVotes === 0) return null;
  if (durchlaufendVotes === relativVotes) return 'unklar';
  return durchlaufendVotes > relativVotes ? 'durchlaufend' : 'relativ';
}

/**
 * Volle Klassifikation von (Halbzeit, Zeit) bei bereits bekannter Konvention der 2. Halbzeit
 * (siehe detectSecondHalfConvention()) — DIE Stelle, die jeden Grund für ein fehlendes
 * Ergebnis benennt, statt ihn in einem einzigen stillen `null` zu verstecken (Auftrag:
 * "dürfen nicht still auf null fallen"). Liefert `{status, absSec}`:
 *   'ok'                  — absSec gesetzt, alles in Ordnung.
 *   'unparseable'         — Zeitstring nicht lesbar (parseGameClock liefert null).
 *   'unknownPeriod'       — Periode fehlt/keine Zahl.
 *   'unsupportedPeriod'   — period >= 3 (Verlängerung, Penalty-Schießen): absichtlich noch
 *                           nicht unterstützt, siehe Moduldoku oben — expliziter Abbruch statt
 *                           stillem null, "bauen wir, wenn es das erste Mal vorkommt".
 *   'outOfRange'          — lesbar, Periode 1 oder 2, aber die daraus berechnete absolute
 *                           Sekunde liegt über GAME_LENGTH_SEC (40:00). Kommt in den sechs
 *                           geprüften Saisondateien nicht vor, ist aber kein stiller Fall:
 *                           ein offensichtlicher Datenfehler (z. B. Tippfehler) soll als
 *                           solcher erkennbar sein, nicht wie "unlesbar" aussehen.
 *   'gameExcluded'        — convention === 'unklar': das ganze Spiel ist ausgeschlossen.
 *   'discardedByMajority' — Periode 2, lesbar, aber widerspricht der Mehrheitskonvention des
 *                           Spiels (siehe detectSecondHalfConvention()) — Einzelausschluss.
 *   'unknownConvention'   — Periode 2, aber convention ist weder 'relativ' noch
 *                           'durchlaufend' noch 'unklar' (z. B. null/nicht ermittelt).
 */
export function classifyGameClock(period, time, convention) {
  const p = Number(period);
  const s = parseGameClock(time);
  if (!Number.isFinite(p)) return { status: 'unknownPeriod', absSec: null };
  if (s === null) return { status: 'unparseable', absSec: null };
  if (convention === 'unklar') return { status: 'gameExcluded', absSec: null };
  if (p >= 3) return { status: 'unsupportedPeriod', absSec: null };
  if (p === 1) {
    if (s > GAME_LENGTH_SEC) return { status: 'outOfRange', absSec: null };
    return { status: 'ok', absSec: s };
  }
  if (p === 2) {
    if (convention === 'durchlaufend') {
      if (s <= HALF_LENGTH_SEC) return { status: 'discardedByMajority', absSec: null };
      if (s > GAME_LENGTH_SEC) return { status: 'outOfRange', absSec: null };
      return { status: 'ok', absSec: s };
    }
    if (convention === 'relativ') {
      if (s > HALF_LENGTH_SEC) return { status: 'discardedByMajority', absSec: null };
      return { status: 'ok', absSec: HALF_LENGTH_SEC + s };
    }
    return { status: 'unknownConvention', absSec: null };
  }
  return { status: 'unknownPeriod', absSec: null };
}

/**
 * (Halbzeit, Zeit) -> absolute Sekunden seit Spielbeginn, oder `null` bei jedem der Gründe in
 * classifyGameClock() — dünne Hülle für Code, dem nur der Wert reicht (siehe dort für die
 * namentliche Begründung, z. B. für Meldelisten/Diagnosen).
 */
export function gameClockToAbsoluteSeconds(period, time, convention) {
  return classifyGameClock(period, time, convention).absSec;
}

/**
 * Bequemlichkeits-Kombination: Konvention aus dem Spiel selbst ermitteln und direkt
 * umrechnen. Für Code, der das Spiel-Objekt ohnehin zur Hand hat und nur EIN Ereignis
 * umrechnen will. Bei vielen Ereignissen desselben Spiels ist es günstiger,
 * detectSecondHalfConvention() einmal selbst aufzurufen und das Ergebnis mehrfach an
 * gameClockToAbsoluteSeconds()/classifyGameClock() weiterzugeben (siehe Aufrufstellen in
 * index.html/matchcenter-core.js) statt die Events bei jedem Aufruf neu zu durchsuchen.
 */
export function resolveGameClockSeconds(game, period, time) {
  return gameClockToAbsoluteSeconds(period, time, detectSecondHalfConvention(game));
}

/**
 * Meldet, welche Spiele einer Liste als GANZ "unklar" gelten (siehe
 * detectSecondHalfConvention() — exakter Stimmen-Gleichstand). Liefert die Game-IDs, nicht
 * die Spiele selbst (reine Funktion, keine Annahme über die Spielform).
 */
export function findUnclearSecondHalfGames(games) {
  return (games || [])
    .filter((g) => detectSecondHalfConvention(g) === 'unklar')
    .map((g) => g?.id ?? null);
}

/**
 * Zählt die widersprechenden Einzelereignisse der 2. Halbzeit eines Spiels, die wegen
 * Mehrheitsregel verworfen wurden (status === 'discardedByMajority' in classifyGameClock())
 * — die Kehrseite von findUnclearSecondHalfGames(): dort GANZE Spiele (Gleichstand), hier
 * EINZELNE Ereignisse innerhalb eines sonst entschiedenen Spiels. Zählt NICHT für ein
 * 'unklar'-Spiel (eigene Kategorie, siehe oben) und NICHT unlesbare/außer Reichweite
 * liegende Zeiten (eigene Kategorien, siehe classifyGameClock()).
 */
export function countDiscardedSecondHalfEvents(game) {
  const convention = detectSecondHalfConvention(game);
  if (convention === null || convention === 'unklar') return 0;
  let count = 0;
  for (const ev of (game?.events || [])) {
    if (Number(ev?.period) !== 2) continue;
    if (classifyGameClock(2, ev?.time, convention).status === 'discardedByMajority') count++;
  }
  return count;
}

// Gemeinsame, abhängigkeitsfreie Definition von "effektiv beendet" — genutzt
// von scripts/model/normalize.mjs (M0) UND scripts/matchday-derivation.mjs
// (Spezifikation 3.6.3), damit beide Aufrufstellen exakt dieselbe Regel
// verwenden (siehe Bericht der "ended-Vereinheitlichung"-Phase: vorher
// driftete matchday-derivation.mjs vom M0-Datenqualitäts-Ausnahme-Fix ab,
// weil es ausschließlich das rohe `ended`-Feld las — dadurch galt derselbe
// Spieltag in 21/22 für die Modelle als gespielt und für die Spieltagsseite
// gleichzeitig als unvollständig).
//
// Eigenes Modul statt direkt in normalize.mjs (dort ursprünglich vorgesehen):
// normalize.mjs importiert bereits buildMatchdays aus matchday-derivation.mjs
// (für die Spieltag-Zuordnung pro Team-Spiel) — ein Import in die
// Gegenrichtung (matchday-derivation.mjs -> normalize.mjs) wäre ein echter
// zyklischer ESM-Import. Dieses Modul hat keine eigenen Abhängigkeiten, genau
// wie das bereits bestehende scripts/game-ordering.mjs, und wird von beiden
// Seiten gefahrlos importiert.
//
// Ändert game-Objekte nicht: das rohe `ended`-Feld bleibt als Rohmarker in
// den jeweiligen Aufrufstellen unverändert erhalten (siehe dort), diese
// Funktion liest es nur.

export function resultScore(game) {
  const h = game?.result?.home_goals;
  const g = game?.result?.guest_goals;
  const home = h === null || h === undefined || h === '' ? NaN : Number(h);
  const guest = g === null || g === undefined || g === '' ? NaN : Number(g);
  return Number.isFinite(home) && Number.isFinite(guest) ? { home, guest } : null;
}

/**
 * "Effektiv beendet": `ended === true`, ODER die Datenqualitäts-Ausnahme greift
 * (vollständiges numerisches `result` UND mindestens ein Event vorhanden, obwohl
 * das rohe `ended`-Feld fälschlich `false` ist). `ended` ist in diesem Fall
 * erkennbar nur ein Datenfehler — echte unvollständige Spiele haben in der Praxis
 * weder ein vollständiges Ergebnis noch Events. Betrifft nachweislich acht Spiele
 * in 21/22 (siehe Build-Berichte der Datenqualitäts-Phase); bewusst allgemein
 * formuliert, keine hartverdrahtete ID-Liste.
 */
export function isEffectivelyEnded(game) {
  return game?.ended === true || (resultScore(game) !== null && Array.isArray(game?.events) && game.events.length > 0);
}

#!/usr/bin/env node
// S2g-Auftrag "Modelltests gegen abgeschlossene Saisons festnageln", Punkt 3: die vier Modelltests mit
// exakten Werte-Pins (test-build-league-model.mjs, test-model-team-strength.mjs,
// test-model-shooter-quality.mjs, test-model-goalie-rating.mjs) laufen jetzt ausschließlich über die
// abgeschlossenen Saisons 21/22–25/26 (siehe dortige EXPECTED_SEASONS-Kommentare). Das kostet Abdeckung
// für die laufende Saison — dieser Test zahlt den Preis zurück: er läuft über ALLE Daten, die
// buildLeagueModel() gerade lädt (inklusive laufender Saison), prüft aber nur Eigenschaften, keine exakten
// Zahlen. Eigenschaften überleben jeden Spieltagsimport, exakte Zahlen nicht.
//
// Aufruf: node scripts/test-model-full-data-properties.mjs

import { buildLeagueModel } from './build-league-model.mjs';
import { fitTeamStrength } from './model/team-strength.mjs';
import { fitShooterQuality } from './model/shooter-quality.mjs';
import { fitGoalieRating } from './model/goalie-rating.mjs';
import { fitFatigue } from './model/fatigue.mjs';

let failures = 0;
function assertTrue(cond, label) {
  if (cond) {
    console.log(`  ok   ${label}`);
  } else {
    failures++;
    console.log(`  FAIL ${label}`);
  }
}

function collectNumbers(value, out = []) {
  if (typeof value === 'number') out.push(value);
  else if (Array.isArray(value)) for (const v of value) collectNumbers(v, out);
  else if (value && typeof value === 'object') for (const v of Object.values(value)) collectNumbers(v, out);
  return out;
}

const model = await buildLeagueModel();
const teamGames = model.seasons.flatMap((s) => s.teamGames);
const goalEvents = model.seasons.flatMap((s) => s.goalEvents);
const rosterEntries = model.seasons.flatMap((s) => s.rosterEntries);
const data = { teamGames, goalEvents, rosterEntries };

console.log('== Eigenschaft 1: jedes Tor-Ereignis ist auflösbar oder ein bekannter Platzhalter-Fall ohne Schützen ==');
{
  // scorerMatch 'roster' = aufgelöst; 'placeholder' deckt sowohl Eigentore (isOwnGoal) als auch
  // not_assigned-Tore (isNotAssigned) ab — beides Rohdaten-Fälle ohne Schützen, aber BEKANNT (nicht
  // 'unmatched'/'ambiguous', was auf ein echtes Datenproblem hindeuten würde).
  const resolvable = goalEvents.filter((e) => e.derived.scorerMatch === 'roster');
  const knownWithoutScorer = goalEvents.filter((e) => e.derived.scorerMatch === 'placeholder' && (e.isOwnGoal || e.isNotAssigned));
  const unexplained = goalEvents.filter((e) => e.derived.scorerMatch !== 'roster' && !(e.derived.scorerMatch === 'placeholder' && (e.isOwnGoal || e.isNotAssigned)));
  assertTrue(resolvable.length + knownWithoutScorer.length === goalEvents.length, `alle ${goalEvents.length} Tor-Ereignisse sind entweder einem Kaderspieler zugeordnet (${resolvable.length}) oder ein bekannter Eigentor-/not_assigned-Fall ohne Schützen (${knownWithoutScorer.length})`);
  assertTrue(unexplained.length === 0, `kein Tor-Ereignis mit scorerMatch 'unmatched' oder 'ambiguous' (${unexplained.length} unerklärt)`);
}

console.log('== Eigenschaft 2: keine NaN/Infinity in den Fit-Werten (M1–M4, volle Daten inkl. laufender Saison) ==');
{
  const m1 = fitTeamStrength(teamGames);
  const m2 = fitShooterQuality(data);
  const m3 = fitGoalieRating(data);
  const m4 = fitFatigue(data, { replicates: 20, seed: 1 });
  for (const [name, fit] of [['M1 Teamstärke', m1], ['M2 Torschützen-Qualität', m2], ['M3 Goalie-Bewertung', m3], ['M4 Müdigkeit', m4]]) {
    const numbers = collectNumbers(fit);
    assertTrue(numbers.length > 0, `${name}: Fit enthält überhaupt Zahlenwerte (Vorbedingung)`);
    assertTrue(numbers.every((n) => Number.isFinite(n)), `${name}: keine NaN/Infinity (${numbers.length} Zahlenwerte geprüft)`);
  }
}

console.log('== Eigenschaft 3: keine Spieler ohne Saison/Team ==');
{
  const m2 = fitShooterQuality(data);
  const m3 = fitGoalieRating(data);
  const orphanM2 = m2.players.filter((p) => !Array.isArray(p.teams) || p.teams.length === 0);
  const orphanM3 = m3.players.filter((p) => !Array.isArray(p.teams) || p.teams.length === 0);
  assertTrue(orphanM2.length === 0, `M2: alle ${m2.players.length} Spieler haben mindestens ein Team/eine Saison (0 ohne Zuordnung)`);
  assertTrue(orphanM3.length === 0, `M3: alle ${m3.players.length} Goalies haben mindestens ein Team/eine Saison (0 ohne Zuordnung)`);
  const rosterWithoutSeason = rosterEntries.filter((r) => !r.seasonKey);
  assertTrue(rosterWithoutSeason.length === 0, `${rosterEntries.length} Kadereinträge geprüft: jeder hat eine Saison (seasonKey)`);
}

console.log('== Eigenschaft 4: keine doppelten Spiel-IDs ==');
{
  for (const s of model.seasons) {
    const ids = s.teamGames.filter((t) => t.side === 'home').map((t) => t.gameId);
    const seen = new Set();
    const dup = ids.filter((id) => (seen.has(id) ? true : (seen.add(id), false)));
    assertTrue(dup.length === 0, `${s.seasonKey}: ${ids.length} Spiel-IDs eindeutig (0 Duplikate)`);
  }
  const allIds = teamGames.filter((t) => t.side === 'home').map((t) => `${t.seasonKey}#${t.gameId}`);
  assertTrue(new Set(allIds).size === allIds.length, `saisonübergreifend: ${allIds.length} (Saison, Spiel-ID)-Paare eindeutig`);
}

console.log('');
if (failures > 0) {
  console.log(`${failures} Test(s) fehlgeschlagen.`);
  process.exitCode = 1;
} else {
  console.log('Alle Tests erfolgreich.');
  process.exitCode = 0;
}

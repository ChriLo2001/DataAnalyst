#!/usr/bin/env node
// Offline-Testharness für scripts/import-season-data.mjs — kein Netzwerk,
// kein API-Key. Deckt die reine Dry-Run/--write-Kernlogik (buildDryRunReport,
// Fälle A-G), --update-embedded (embedSeasonInEmbeddedFile, Fall H) und die
// Schritt-9-Manifest-Pflege (buildManifestEntryUpdate, Fälle J-L) ab.
//
// Seit Token-Diät Teil 2 schreibt --update-embedded season-data-embedded.js
// statt index.html (siehe scripts/test-embedded-season-data.mjs für die dort
// zusätzlich geprüften migrationsspezifischen Aspekte: Wertgleichheit zum
// alten Stand, dass index.html den Datenblock nicht mehr enthält, den vollen
// CLI-Pfad in einer Sandbox, und das Verhalten bei fehlender Datei). Fall H
// hier bleibt bewusst bestehen und deckt embedSeasonInEmbeddedFile() als Teil
// der allgemeinen import-season-data.mjs-Testsuite ab.
//
// Alle Fälle nutzen die ECHTEN Inhalte von season-data/25-26.json,
// season-data/seasons.json bzw. season-data-embedded.js als Ausgangsbasis
// (nur lesend eingelesen, per JSON.parse/String tief kopiert bzw. rein im
// Speicher weiterverarbeitet — KEINE der echten Dateien wird jemals
// beschrieben; embedSeasonInEmbeddedFile()/buildManifestEntryUpdate() werden
// nur gegen In-Memory-Kopien ausgeführt, das Ergebnis wird nirgends
// gespeichert).
//
// Aufruf: node scripts/test-import-season-data.mjs

import { readFile } from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';

import { buildDryRunReport, validateSeasonKey, validateWrapperFormat, embedSeasonInEmbeddedFile, buildManifestEntryUpdate } from './import-season-data.mjs';

/** Führt season-data-embedded.js als klassisches Skript aus (kein
 * regex/Textparsing) und gibt das gesetzte window.STATIC_SEASON_DATA zurück —
 * analog zum realen Laufzeitverhalten im Browser. */
function loadEmbeddedStaticSeasonData(jsText) {
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(jsText, sandbox);
  return sandbox.window.STATIC_SEASON_DATA;
}

const REPO_ROOT = path.resolve(import.meta.dirname, '..');
let failures = 0;

function assertEqual(actual, expected, label) {
  const a = JSON.stringify(actual);
  const e = JSON.stringify(expected);
  if (a === e) {
    console.log(`  ok   ${label}`);
  } else {
    failures++;
    console.log(`  FAIL ${label}\n       erwartet: ${e}\n       erhalten: ${a}`);
  }
}

function assertTrue(cond, label) {
  assertEqual(Boolean(cond), true, label);
}

function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function samplePostponedGame(id) {
  return {
    id,
    game_number: '99',
    date: '2026-05-01',
    game_day: { game_day_number: 9, title: '9. Spieltag' },
    home_team_name: 'VfB Ulm',
    guest_team_name: 'FBC Heidelberg',
    started: false,
    ended: false,
    result_string: null,
    result: null,
    league_id: 1897,
    league_name: 'Verbandsliga BW (KF)',
    events: [],
    players: {},
    starting_players: {},
    awards: {},
    period_titles: [{ period: 1, title: '1. Hälfte' }],
    notice_type: 'Postponed',
  };
}

// ─────────────────────────────────────────────────────────────────────────
// Echte 25/26-Daten laden (read-only, nur als In-Memory-Ausgangsbasis)
// ─────────────────────────────────────────────────────────────────────────

const realRaw = await readFile(path.join(REPO_ROOT, 'season-data', '25-26.json'), 'utf8');
const real2526 = JSON.parse(realRaw);
console.log(`Basis geladen: season-data/25-26.json (${real2526.games.length} Spiele, unverändert auf der Platte).`);

const realManifestRaw = await readFile(path.join(REPO_ROOT, 'season-data', 'seasons.json'), 'utf8');
const realManifest = JSON.parse(realManifestRaw);
console.log(`Basis geladen: season-data/seasons.json (${realManifest.seasons.length} Einträge, unverändert auf der Platte).`);

// ─────────────────────────────────────────────────────────────────────────
// Fall 1: identische Kopie von 25/26 -> OK
// ─────────────────────────────────────────────────────────────────────────
console.log('');
console.log('== Fall 1: identische Kopie von 25/26 ==');
{
  const existing = clone(real2526);
  const incoming = clone(real2526);
  const report = buildDryRunReport('25/26', incoming, existing);
  assertTrue(report.ok, 'Dry-Run OK bei identischer Kopie');
  assertEqual(report.addedIds, [], 'keine neuen IDs');
  assertEqual(report.removedIds, [], 'keine entfernten IDs');
  assertEqual(report.unchangedCount, real2526.games.length, 'alle IDs unverändert');
}

// ─────────────────────────────────────────────────────────────────────────
// Fall 2: zusätzliche Game-ID -> OK
// ─────────────────────────────────────────────────────────────────────────
console.log('');
console.log('== Fall 2: zusätzliche Game-ID ==');
{
  const existing = clone(real2526);
  const incoming = clone(real2526);
  incoming.games.push(samplePostponedGame(999001)); // neue, plausible ID außerhalb des bekannten Bereichs
  const report = buildDryRunReport('25/26', incoming, existing);
  assertTrue(report.ok, 'Dry-Run OK: zusätzliches Spiel ist kein Fehler');
  assertEqual(report.addedIds, ['999001'], 'neue ID 999001 erkannt');
  assertEqual(report.removedIds, [], 'keine entfernten IDs');
  assertEqual(report.newGameCount, real2526.games.length + 1, 'neue Gesamtanzahl korrekt');
}

// ─────────────────────────────────────────────────────────────────────────
// Fall 3: verschwundene Game-ID -> FEHLER
// ─────────────────────────────────────────────────────────────────────────
console.log('');
console.log('== Fall 3: verschwundene Game-ID ==');
{
  const existing = clone(real2526);
  const incoming = clone(real2526);
  const removedGame = incoming.games.pop(); // letztes Spiel entfernen
  const report = buildDryRunReport('25/26', incoming, existing);
  assertTrue(!report.ok, 'Dry-Run FEHLER bei verschwundener ID');
  assertEqual(report.removedIds, [String(removedGame.id)], 'die konkret entfernte ID wird gemeldet');
  assertTrue(
    report.errors.some((e) => e.includes(String(removedGame.id))),
    'Fehlermeldung nennt die verschwundene ID konkret',
  );
}

// ─────────────────────────────────────────────────────────────────────────
// Beispiel aus dem Auftrag: gleiche Anzahl, aber eine ID ausgetauscht
// ([100,101,102] -> [100,101,999]) muss trotz gleicher Anzahl FEHLER sein.
// ─────────────────────────────────────────────────────────────────────────
console.log('');
console.log('== Sonderfall: gleiche Spielanzahl, aber eine bekannte ID gegen eine neue getauscht ==');
{
  const existing = { season: '25/26', label: '2025/26', games: [samplePostponedGame(100), samplePostponedGame(101), samplePostponedGame(102)] };
  const incoming = { season: '25/26', label: '2025/26', games: [samplePostponedGame(100), samplePostponedGame(101), samplePostponedGame(999)] };
  const report = buildDryRunReport('25/26', incoming, existing);
  assertTrue(!report.ok, 'FEHLER trotz identischer Gesamtanzahl (102 verschwunden, 999 neu)');
  assertEqual(report.previousGameCount, report.newGameCount, 'Anzahl bleibt gleich (3 vs. 3) — Fehler kommt NICHT aus einem Anzahl-Rückgang');
  assertEqual(report.removedIds, ['102'], 'ID 102 korrekt als verschwunden erkannt');
  assertEqual(report.addedIds, ['999'], 'ID 999 korrekt als neu erkannt');
}
console.log('');
console.log('== Gegenprobe: rein additiver Fall aus dem Auftrag ([100,101,102] -> [100,101,102,103]) ist OK ==');
{
  const existing = { season: '25/26', label: '2025/26', games: [samplePostponedGame(100), samplePostponedGame(101), samplePostponedGame(102)] };
  const incoming = { season: '25/26', label: '2025/26', games: [samplePostponedGame(100), samplePostponedGame(101), samplePostponedGame(102), samplePostponedGame(103)] };
  const report = buildDryRunReport('25/26', incoming, existing);
  assertTrue(report.ok, 'Dry-Run OK: rein additive Änderung');
  assertEqual(report.addedIds, ['103'], 'nur 103 ist neu');
  assertEqual(report.removedIds, [], 'nichts verschwunden');
}

// ─────────────────────────────────────────────────────────────────────────
// Fall 4: doppelte Game-ID -> FEHLER
// ─────────────────────────────────────────────────────────────────────────
console.log('');
console.log('== Fall 4: doppelte Game-ID ==');
{
  const existing = clone(real2526);
  const incoming = clone(real2526);
  incoming.games.push(clone(incoming.games[0])); // erstes Spiel dupliziert
  const report = buildDryRunReport('25/26', incoming, existing);
  assertTrue(!report.ok, 'Dry-Run FEHLER bei doppelter ID');
  assertEqual(report.duplicates.length, 1, 'genau eine Duplikat-ID gemeldet');
  assertEqual(report.duplicates[0].id, String(real2526.games[0].id), 'die korrekte ID wird als Duplikat gemeldet');
}

// ─────────────────────────────────────────────────────────────────────────
// Fall 5: ungültige Game-Struktur -> FEHLER
// ─────────────────────────────────────────────────────────────────────────
console.log('');
console.log('== Fall 5: ungültige Game-Struktur ==');
{
  const existing = clone(real2526);
  const incoming = clone(real2526);
  delete incoming.games[0].date; // Pflichtfeld entfernen
  incoming.games[1].league_id = 'nicht-mehr-numerisch'; // falscher Typ
  const report = buildDryRunReport('25/26', incoming, existing);
  assertTrue(!report.ok, 'Dry-Run FEHLER bei strukturell ungültigen Spielen');
  assertEqual(report.invalidGames.length, 2, 'genau zwei ungültige Spiele erkannt (Index 0 und 1)');
}

// ─────────────────────────────────────────────────────────────────────────
// Fall 6: Postponed-artiges Spiel mit result:null -> OK
// ─────────────────────────────────────────────────────────────────────────
console.log('');
console.log('== Fall 6: neues Postponed-artiges Spiel (result:null, leere events/players) ist kein Fehler ==');
{
  const existing = clone(real2526);
  const incoming = clone(real2526);
  incoming.games.push(samplePostponedGame(999002));
  const report = buildDryRunReport('25/26', incoming, existing);
  assertTrue(report.ok, 'Postponed-artiges Spiel wird als strukturell gültig akzeptiert');
  assertEqual(report.invalidGames, [], 'keine Strukturfehler durch das neue Postponed-Spiel');
  assertEqual(report.addedIds, ['999002'], 'neue Postponed-ID korrekt als Zugang erkannt');
}
// Regressionstest: die 4 ECHTEN, bereits vorhandenen Postponed-Spiele in
// 25/26 (identische Kopie, Fall 1) dürfen selbstverständlich nie einen
// Strukturfehler auslösen.
{
  const postponedInReal = real2526.games.filter((g) => g.notice_type === 'Postponed');
  assertEqual(postponedInReal.length, 4, 'reale 25/26-Datei enthält weiterhin genau 4 Postponed-Spiele (Ausgangslage bestätigt)');
}

// ─────────────────────────────────────────────────────────────────────────
// Fall 7: komplett ungültige Eingabedatei -> FEHLER
// ─────────────────────────────────────────────────────────────────────────
console.log('');
console.log('== Fall 7: komplett ungültige Eingabedatei ==');
{
  const existing = clone(real2526);
  const casesInvalid = [null, 'ein-string', 42, [], {}, { season: '25/26' }, { season: '25/26', label: '2025/26' }];
  for (const invalid of casesInvalid) {
    const report = buildDryRunReport('25/26', invalid, existing);
    assertTrue(!report.ok, `Dry-Run FEHLER für ungültige Eingabe: ${JSON.stringify(invalid)}`);
  }
}
console.log('== Zusatz: validateSeasonKey / validateWrapperFormat direkt ==');
assertTrue(validateSeasonKey('25/26').ok, '"25/26" ist ein gültiger Season-Key');
assertTrue(!validateSeasonKey('2025/26').ok, '"2025/26" wird abgelehnt (falsches Format)');
assertTrue(!validateSeasonKey('25/28').ok, '"25/28" wird abgelehnt (keine aufeinanderfolgenden Jahre)');
assertTrue(validateWrapperFormat({ season: '25/26', label: '2025/26', games: [] }).ok, 'minimaler gültiger Wrapper wird akzeptiert');
assertTrue(!validateWrapperFormat({ season: '25/26', label: '2025/26' }).ok, 'Wrapper ohne games[] wird abgelehnt');

// ─────────────────────────────────────────────────────────────────────────
// Fall H: --update-embedded (embedSeasonInEmbeddedFile) — rein im Speicher.
// Liest das ECHTE season-data-embedded.js nur LESEND; das Ergebnis von
// embedSeasonInEmbeddedFile() wird an keiner Stelle auf die Platte
// geschrieben (weder als Überschreiben der echten Datei noch als neue
// Testkopie-Datei im Repo) — Prüfung erfolgt ausschließlich am
// zurückgegebenen String im Speicher. index.html wird in diesem Fall H gar
// nicht mehr gelesen — seit Token-Diät Teil 2 hat --update-embedded keinen
// Bezug mehr zu index.html (siehe scripts/test-embedded-season-data.mjs für
// den expliziten Beweis "index.html bleibt unberührt").
// ─────────────────────────────────────────────────────────────────────────
console.log('');
console.log('== Fall H: --update-embedded ersetzt NUR den 25/26-Block, Rest bleibt byte-identisch ==');
{
  const originalText = await readFile(path.join(REPO_ROOT, 'season-data-embedded.js'), 'utf8');

  // Kandidat: exakt die reale 25/26-Datei plus ein zusätzliches Spiel, damit
  // sichtbar geprüft werden kann, dass wirklich NEU eingebettet wurde (nicht
  // nur zufällig identisch geblieben ist).
  const candidate = clone(real2526);
  candidate.games.push(samplePostponedGame(999003));

  const { text: newText, mode } = embedSeasonInEmbeddedFile(originalText, '25/26', candidate);
  assertEqual(mode, 'replaced', '25/26 war bereits eingebettet -> Modus "replaced"');

  // 1) Alles außerhalb des window.STATIC_SEASON_DATA-Objekts bleibt
  //    byte-identisch: Text vor der Zuweisung und nach dem schließenden ";"
  //    separat vergleichen.
  const marker = 'window.STATIC_SEASON_DATA=';
  const prefixOld = originalText.slice(0, originalText.indexOf(marker));
  const prefixNew = newText.slice(0, newText.indexOf(marker));
  assertEqual(prefixNew, prefixOld, 'Alles VOR der window.STATIC_SEASON_DATA-Zuweisung (Kopfkommentar) ist byte-identisch');

  // 2) Andere Saison-Blöcke (21/22-24/25) unverändert, nur 25/26 neu.
  // Ausführung als klassisches Skript statt Textparsing — bewusst unabhängig
  // von der internen (nicht exportierten) findMatchingBrace() aus
  // import-season-data.mjs, damit dieser Test embedSeasonInEmbeddedFile()
  // nicht indirekt "mit sich selbst" prüft.
  const parsedOld = loadEmbeddedStaticSeasonData(originalText);
  const parsedNew = loadEmbeddedStaticSeasonData(newText);

  for (const key of ['21/22', '22/23', '23/24', '24/25']) {
    assertEqual(JSON.stringify(parsedNew[key]), JSON.stringify(parsedOld[key]), `Saison-Block "${key}" bleibt unverändert`);
  }
  assertEqual(parsedNew['25/26'].games.length, real2526.games.length + 1, '25/26-Block enthält jetzt 60+1 = 61 Spiele');
  assertEqual(
    parsedNew['25/26'].games.slice(0, real2526.games.length).map((g) => g.id),
    real2526.games.map((g) => g.id),
    'die ursprünglichen 60 Spiele bleiben in Reihenfolge/Inhalt erhalten',
  );

  // 3) Datei bleibt insgesamt "lesbar" (Länge > 0, gültiges klassisches
  //    Skript, setzt weiterhin window.STATIC_SEASON_DATA).
  assertTrue(newText.length > originalText.length, 'resultierende Datei ist (durch das zusätzliche Spiel) länger, nicht leer/kaputt');
  assertTrue(newText.includes('window.STATIC_SEASON_DATA='), 'window.STATIC_SEASON_DATA-Zuweisung bleibt vorhanden');
}

console.log('');
console.log('== Fall H (Gegenprobe): mehrdeutiger Treffer -> harter Abbruch, kein Ergebnis ==');
{
  const originalText = await readFile(path.join(REPO_ROOT, 'season-data-embedded.js'), 'utf8');
  // Künstlich einen zweiten Treffer für "25/26":{ erzeugen, um die
  // "bei >1 Treffern hart abbrechen"-Regel zu testen, OHNE die echte Datei
  // zu verändern (nur ein In-Memory-String für diesen einen Testfall).
  const marker = 'window.STATIC_SEASON_DATA=';
  const objStart = originalText.indexOf('{', originalText.indexOf(marker));
  const injected = originalText.slice(0, objStart + 1) + '"25/26":{"season":"25/26","label":"dup","games":[]},' + originalText.slice(objStart + 1);
  let threw = false;
  try {
    embedSeasonInEmbeddedFile(injected, '25/26', clone(real2526));
  } catch (e) {
    threw = true;
  }
  assertTrue(threw, 'bei mehrdeutigem "25/26"-Treffer wird hart abgebrochen (kein Ergebnis, keine Datei würde geschrieben)');
}

// ─────────────────────────────────────────────────────────────────────────
// Fall J: bestehende Saison (25/26) -> Manifest bleibt semantisch unverändert
// ─────────────────────────────────────────────────────────────────────────
console.log('');
console.log('== Fall J: buildManifestEntryUpdate für bestehende Saison 25/26 (gleiches Label) ==');
{
  const entry2526 = realManifest.seasons.find((s) => s.key === '25/26');
  const result = buildManifestEntryUpdate(realManifest, { key: '25/26', label: entry2526.label, file: entry2526.file });
  assertTrue(!result.changed, 'kein Schreibbedarf, wenn sich am Label nichts ändert');
  assertEqual(result.manifest, realManifest, 'Manifest bleibt semantisch exakt gleich (keine zufällige Formatänderung)');
  assertEqual(
    result.manifest.seasons.filter((s) => s.key !== '25/26'),
    realManifest.seasons.filter((s) => s.key !== '25/26'),
    'alle anderen Saison-Einträge bleiben unverändert',
  );
}
console.log('== Fall J (Variante): tatsächlich geändertes Label wird übernommen, sonst nichts ==');
{
  const entry2526 = realManifest.seasons.find((s) => s.key === '25/26');
  const result = buildManifestEntryUpdate(realManifest, { key: '25/26', label: 'Anderes Label', file: entry2526.file });
  assertTrue(result.changed, 'Änderung wird erkannt, wenn sich das Label unterscheidet');
  const updatedEntry = result.manifest.seasons.find((s) => s.key === '25/26');
  assertEqual(updatedEntry.label, 'Anderes Label', 'Label wurde aktualisiert');
  assertEqual(updatedEntry.status, entry2526.status, 'status bleibt unangetastet');
  assertEqual(updatedEntry.file, entry2526.file, 'file bleibt unangetastet');
  assertEqual(updatedEntry.leagueId, entry2526.leagueId, 'leagueId bleibt unangetastet (nicht erfunden/entfernt)');
  assertEqual(updatedEntry.gameOperationId, entry2526.gameOperationId, 'gameOperationId bleibt unangetastet');
  assertEqual(
    result.manifest.seasons.filter((s) => s.key !== '25/26'),
    realManifest.seasons.filter((s) => s.key !== '25/26'),
    'alle anderen Saison-Einträge bleiben unverändert',
  );
}

// ─────────────────────────────────────────────────────────────────────────
// Fall K: neue Saison (26/27) -> korrekter neuer Eintrag, Rest unverändert
// ─────────────────────────────────────────────────────────────────────────
console.log('');
console.log('== Fall K: buildManifestEntryUpdate für neue Saison 26/27 ==');
{
  assertTrue(!realManifest.seasons.some((s) => s.key === '26/27'), 'Ausgangslage bestätigt: 26/27 ist im echten Manifest noch nicht vorhanden');
  const result = buildManifestEntryUpdate(realManifest, { key: '26/27', label: '2026/27', file: '26-27.json' });
  assertTrue(result.changed, 'neue Saison erzeugt eine Änderung');
  assertTrue(result.isNewEntry, 'wird korrekt als neuer Eintrag erkannt');
  assertEqual(result.manifest.seasons.length, realManifest.seasons.length + 1, 'genau ein neuer Eintrag wurde angehängt');
  const newEntry = result.manifest.seasons.find((s) => s.key === '26/27');
  assertEqual(newEntry, { key: '26/27', label: '2026/27', file: '26-27.json', status: 'archived' }, 'neuer Eintrag hat exakt Key/Label/Dateiname und den sicheren Default status:"archived"');
  assertTrue(
    !result.manifest.seasons.some((s) => s.key !== '26/27' && s.status === 'current' && realManifest.seasons.find((r) => r.key === s.key)?.status !== 'current'),
    'keine bestehende Saison wurde durch das Hinzufügen versehentlich auf "current" umgestellt',
  );
  for (const original of realManifest.seasons) {
    const stillThere = result.manifest.seasons.find((s) => s.key === original.key);
    assertEqual(stillThere, original, `bestehender Eintrag "${original.key}" bleibt exakt unverändert`);
  }
}

// ─────────────────────────────────────────────────────────────────────────
// Fall L: Sicherheitsabbruch -> weder JSON- noch Manifest- noch Embedded-
// Schreibvorgang darf stattfinden.
//
// buildManifestEntryUpdate() selbst kennt keine Validierung (das ist bewusst
// so: es ist eine reine Datenpflege-Funktion, kein Sicherheitsgate). Die
// eigentliche Sicherheitsschranke liegt in main() als Kontrollfluss: der
// Manifest- UND der --update-embedded-Codeblock stehen dort strukturell
// GRUNDSÄTZLICH hinter dem `if (!report.ok) { ...; return; }`-Abbruch (siehe
// scripts/import-season-data.mjs) — sie sind bei fehlgeschlagener Validierung
// technisch unerreichbar, nicht nur "wird nicht aufgerufen". Das ist eine
// Struktur-/Codeprüfung (durch Lesen der Datei bestätigt), keine Node-
// Ausführung — hier wird deshalb zusätzlich noch einmal explizit bestätigt,
// dass buildDryRunReport() für exakt dieselben Fehlerfälle wie in den
// Fällen C/D/E/F weiterhin `ok:false` liefert (die Vorbedingung für den
// Abbruch in main()).
// ─────────────────────────────────────────────────────────────────────────
console.log('');
console.log('== Fall L: Sicherheitsabbruch -> report.ok bleibt false (Vorbedingung für "kein Schreiben" in main()) ==');
{
  const existing = clone(real2526);
  const incoming = clone(real2526);
  incoming.games.pop(); // verschwundene ID, wie Fall C
  const report = buildDryRunReport('25/26', incoming, existing);
  assertTrue(!report.ok, 'Validierung schlägt fehl -> in main() wird weder season-data/25-26.json noch seasons.json noch season-data-embedded.js erreicht');
}
{
  const existing = clone(real2526);
  const incoming = clone(real2526);
  incoming.games.push(clone(incoming.games[0])); // Duplikat, wie Fall E
  const report = buildDryRunReport('25/26', incoming, existing);
  assertTrue(!report.ok, 'Duplikat -> ebenfalls kein Schreiben in main() möglich');
}

console.log('');
if (failures > 0) {
  console.log(`${failures} Test(s) fehlgeschlagen.`);
  process.exitCode = 1;
} else {
  console.log('Alle Tests erfolgreich.');
}

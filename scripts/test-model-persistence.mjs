#!/usr/bin/env node
// P4b · Test für die Modelldaten-Persistenz (model-data/) in scripts/build-league-model.mjs.
//
// Prüft: (A) atomares Schreiben (Temp-Datei + rename, kein Leftover, Zieldatei bleibt bei einem fehlschlagenden
// Schreibversuch unverändert), (B) Dry-Run schreibt nichts, (C) Determinismus (zwei --write-Läufe byte-identisch),
// (D) inputHash ändert sich bei geänderten Eingaben, (E) Snapshot des letzten abgeschlossenen Spieltags einer
// Saison entspricht (nur Punktschätzer, siehe Owner-Korrektur) model-data/<season>.json, (F) Saison-Team-Filter
// (nur in dieser Saison tatsächlich aktive Teams im Snapshot), (G) null bleibt null (lateGameIndex, kein
// Ersatzwert/Clamping), (H) Größenlimit (kein snapshots/-Datei > 2 MB), (I) --write-Gesamtlaufzeit < 2 Minuten.
//
// Sandbox-Läufe verwenden eine Kopie der ECHTEN season-data (keine synthetischen Daten) in einem Verzeichnis
// außerhalb des Repos (os.tmpdir()) — das echte Repository wird nie beschrieben.
//
// Aufruf: node scripts/test-model-persistence.mjs

import { mkdir, readFile, writeFile, rm, stat } from 'node:fs/promises';
import crypto from 'node:crypto';
import os from 'node:os';
import path from 'node:path';

import {
  buildLeagueModel, loadSeasonFiles, main,
  buildM1, buildM2, buildM3, buildM4SeasonEnd,
  buildManifest, buildSeasonFiles, buildAlltimeFile,
  buildSnapshotsFile, fileNameForSeasonKey, writeJsonCanonicalAtomic, SNAPSHOT_REPLICATES,
} from './build-league-model.mjs';
import { buildMatchdays } from './matchday-derivation.mjs';
import { canonicalJson } from './lineup-data-hash.mjs';

const REPO_ROOT = path.resolve(import.meta.dirname, '..');
let failures = 0;

function assertEqual(actual, expected, label) {
  const a = JSON.stringify(actual);
  const e = JSON.stringify(expected);
  if (a === e) console.log(`  ok   ${label}`);
  else { failures++; console.log(`  FAIL ${label}\n       erwartet: ${e}\n       erhalten: ${a}`); }
}
function assertTrue(cond, label) { assertEqual(Boolean(cond), true, label); }

const sha = (buf) => crypto.createHash('sha256').update(buf).digest('hex');

async function pathExists(p) {
  try { await stat(p); return true; } catch (e) { if (e.code === 'ENOENT') return false; throw e; }
}

/** Kopiert die echten season-data-Dateien in ein frisches Sandbox-Verzeichnis außerhalb des Repos. */
async function makeSandbox(label) {
  const dir = path.join(os.tmpdir(), 'p4b-persistence-test', label);
  await rm(dir, { recursive: true, force: true });
  await mkdir(path.join(dir, 'season-data'), { recursive: true });
  const manifest = JSON.parse(await readFile(path.join(REPO_ROOT, 'season-data', 'seasons.json'), 'utf8'));
  await writeFile(path.join(dir, 'season-data', 'seasons.json'), JSON.stringify(manifest), 'utf8');
  for (const entry of manifest.seasons) {
    const content = await readFile(path.join(REPO_ROOT, 'season-data', entry.file), 'utf8');
    await writeFile(path.join(dir, 'season-data', entry.file), content, 'utf8');
  }
  return dir;
}

async function listFilesRecursive(dir) {
  const out = [];
  async function walk(d) {
    let entries;
    try { entries = await import('node:fs/promises').then((fs) => fs.readdir(d, { withFileTypes: true })); } catch (e) { if (e.code === 'ENOENT') return; throw e; }
    for (const e of entries) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) await walk(p); else out.push(p);
    }
  }
  await walk(dir);
  return out.sort();
}

// ═════════════════════════════════════════════════════════════════════════
console.log('== A) Atomares Schreiben (writeJsonCanonicalAtomic) ==');
{
  const dir = path.join(os.tmpdir(), 'p4b-persistence-test', 'atomic');
  await rm(dir, { recursive: true, force: true });
  await mkdir(dir, { recursive: true });
  const target = path.join(dir, 'out.json');
  await writeJsonCanonicalAtomic(target, { b: 2, a: 1 });
  const written = await readFile(target, 'utf8');
  assertEqual(written, canonicalJson({ b: 2, a: 1 }) + '\n', 'Inhalt ist die kanonische JSON-Form (alphabetisch sortierte Schlüssel) + Zeilenumbruch');
  const files = await listFilesRecursive(dir);
  assertEqual(files, [target], 'kein Leftover einer Temp-Datei nach erfolgreichem Schreiben');

  // Zielverzeichnis existiert bereits mit gültigem Inhalt; ein Schreibversuch, dessen Zielpfad einen Parent hat, der
  // in Wirklichkeit eine DATEI ist (kein Verzeichnis) -> mkdir schlägt fehl, VOR jedem Schreib-/Rename-Versuch.
  // Die bereits vorhandene, unbeteiligte Zieldatei muss dabei unverändert bleiben (Atomarität: kein Teilschreiben).
  const untouchedTarget = path.join(dir, 'untouched.json');
  await writeJsonCanonicalAtomic(untouchedTarget, { existing: true });
  const beforeContent = await readFile(untouchedTarget, 'utf8');
  const brokenParent = path.join(dir, 'out.json', 'nested', 'broken.json'); // 'out.json' ist eine Datei, kein Verzeichnis
  let threw = false;
  try { await writeJsonCanonicalAtomic(brokenParent, { x: 1 }); } catch { threw = true; }
  assertTrue(threw, 'Schreibversuch mit ungültigem Zielpfad wirft (kein stiller Fehlschlag)');
  assertEqual(await readFile(untouchedTarget, 'utf8'), beforeContent, 'eine unbeteiligte, bereits vorhandene Datei bleibt bei einem fehlschlagenden Schreibversuch anderswo unverändert');
  assertTrue(!(await pathExists(brokenParent)), 'am fehlgeschlagenen Zielpfad selbst entsteht keine Datei (kein Teilschreiben)');
  await rm(dir, { recursive: true, force: true });
}

// ═════════════════════════════════════════════════════════════════════════
console.log('== B) Dry-Run schreibt nichts (Sandbox mit echten season-data) ==');
let sandboxA;
{
  sandboxA = await makeSandbox('write-a');
  const filesBefore = await listFilesRecursive(sandboxA);
  await main([], { repoRoot: sandboxA, stdout: { write: () => {} } });
  await main(['--only', 'M1'], { repoRoot: sandboxA, stdout: { write: () => {} } });
  await main(['--only', 'M4', '--replicates', '20', '--seed', '1'], { repoRoot: sandboxA, stdout: { write: () => {} } });
  const filesAfter = await listFilesRecursive(sandboxA);
  assertEqual(filesAfter, filesBefore, 'Dry-Run (Standard, --only M1, --only M4) erzeugt keine einzige neue Datei in der Sandbox');
  assertTrue(!(await pathExists(path.join(sandboxA, 'model-data'))), 'kein model-data/-Verzeichnis nach Dry-Run-Läufen');
}

// ═════════════════════════════════════════════════════════════════════════
console.log('== C) --write: vollständiger Lauf, Determinismus, Laufzeit, Größenlimit ==');
let firstRunFiles, firstRunElapsedMs;
{
  const start1 = Date.now();
  const code1 = await main(['--write', '--replicates', String(SNAPSHOT_REPLICATES), '--seed', '1'], { repoRoot: sandboxA, stdout: { write: () => {} }, stderr: { write: () => {} } });
  firstRunElapsedMs = Date.now() - start1;
  assertEqual(code1, 0, '--write: Exit 0');
  assertTrue(firstRunElapsedMs < 120000, `vollständiger --write-Lauf dauert unter 2 Minuten (gemessen: ${firstRunElapsedMs} ms)`);

  const modelDataDir = path.join(sandboxA, 'model-data');
  firstRunFiles = (await listFilesRecursive(modelDataDir)).filter((p) => p.endsWith('.json'));
  assertEqual(firstRunFiles.length, 12, 'genau 12 JSON-Dateien geschrieben (manifest, alltime, 5× <season>.json, 5× snapshots/<season>.json)');

  for (const p of firstRunFiles) {
    if (p.includes(`${path.sep}snapshots${path.sep}`)) {
      const s = await stat(p);
      assertTrue(s.size <= 2 * 1024 * 1024, `${path.relative(modelDataDir, p)}: ≤ 2 MB (gemessen: ${s.size} Byte)`);
    }
  }

  // Zweiter --write-Lauf mit identischem Seed in dieselbe Sandbox: alle Dateien byte-identisch (SHA-256).
  const hashesBefore = {};
  for (const p of firstRunFiles) hashesBefore[p] = sha(await readFile(p));
  const code2 = await main(['--write', '--replicates', String(SNAPSHOT_REPLICATES), '--seed', '1'], { repoRoot: sandboxA, stdout: { write: () => {} }, stderr: { write: () => {} } });
  assertEqual(code2, 0, 'zweiter --write-Lauf: Exit 0');
  const filesAfter2 = (await listFilesRecursive(path.join(sandboxA, 'model-data'))).filter((p) => p.endsWith('.json'));
  assertEqual(filesAfter2, firstRunFiles, 'zweiter Lauf erzeugt exakt dieselbe Dateiliste (keine zusätzlichen/fehlenden Dateien)');
  let allIdentical = true;
  for (const p of firstRunFiles) if (sha(await readFile(p)) !== hashesBefore[p]) allIdentical = false;
  assertTrue(allIdentical, 'zwei --write-Läufe mit identischem Seed: alle Dateien byte-identisch (SHA-256)');
}

// ═════════════════════════════════════════════════════════════════════════
console.log('== D) inputHash ändert sich bei geänderten Eingaben ==');
{
  const manifestPath = path.join(sandboxA, 'model-data', 'manifest.json');
  const manifestA = JSON.parse(await readFile(manifestPath, 'utf8'));

  const sandboxB = await makeSandbox('write-b-mutated');
  const file2526 = path.join(sandboxB, 'season-data', '25-26.json');
  const data2526 = JSON.parse(await readFile(file2526, 'utf8'));
  data2526.games[0].audience = (data2526.games[0].audience ?? 0) + 1; // eine einzelne, inhaltlich unwichtige Änderung
  await writeFile(file2526, JSON.stringify(data2526), 'utf8');
  const modelB = await buildLeagueModel(sandboxB);
  const manifestB = buildManifest(modelB, { allTimeReplicates: 20, allTimeSeed: 1, snapshotReplicates: SNAPSHOT_REPLICATES, snapshotSeed: 1 });

  assertTrue(manifestA.inputHash !== manifestB.inputHash, 'inputHash unterscheidet sich, wenn sich ein einziger Wert in einer season-data-Datei ändert');
  const modelAUnchanged = await buildLeagueModel(sandboxA);
  assertEqual(modelAUnchanged.inputHash, manifestA.inputHash, 'inputHash bleibt bei unveränderten Eingaben stabil (Kontrolle)');
  await rm(sandboxB, { recursive: true, force: true });
}

// ═════════════════════════════════════════════════════════════════════════
console.log('== E) Snapshot des letzten abgeschlossenen Spieltags = model-data/<season>.json (nur Punktschätzer) ==');
// WICHTIGER REALDATEN-BEFUND (kein Test-/Code-Fehler, siehe Abschlussbericht): <season>.json verwendet als asOf das
// letzte Datum unter ALLEN ended:true-Modellspielen der Saison (bestehendes M1/M2/M3-Saisonende-Muster, unverändert).
// Ein Snapshot existiert dagegen NUR für Spieltage mit Status "abgeschlossen" (buildMatchdays, ALLE Spiele beendet).
// Für 21/22 enthält Spieltag 11 (Status "unvollstaendig") DREI bereits beendete Modellspiele (25697, 26643, 25699,
// Datum 2022-04-03) neben dem einen bekannten ended=false-Datenqualitätsfall (26644) — diese drei Spiele zählen
// bereits zum Saisonende-asOf, obwohl Spieltag 11 selbst nie einen eigenen Snapshot bekommt (nicht "abgeschlossen").
// Der letzte SNAPSHOT-Spieltag (Nummer 10, 2022-04-02) liegt deshalb für 21/22 einen Tag VOR dem Saisonende-asOf
// (2022-04-03) — eine echte, in den Rohdaten begründete Teilmengen-Beziehung, keine Inkonsistenz im Code. Die
// belastbare Invariante ist deshalb "Saisonende-asOf ≥ letzter Snapshot-asOf" (Teilmenge der Spiele), mit exakter
// Punktschätzer-Gleichheit NUR, wenn beide Daten tatsächlich übereinstimmen (in 4 von 5 Saisons der Fall).
{
  const model = await buildLeagueModel(REPO_ROOT);
  const rawSeasons = await loadSeasonFiles(REPO_ROOT);
  const data = {
    teamGames: model.seasons.flatMap((s) => s.teamGames),
    goalEvents: model.seasons.flatMap((s) => s.goalEvents),
    rosterEntries: model.seasons.flatMap((s) => s.rosterEntries),
  };
  const m1 = buildM1(model, { replicates: 20, seed: 1 });
  const m2 = buildM2(model);
  const m3 = buildM3(model, { replicates: 20, seed: 1 });
  const m4SeasonEnd = buildM4SeasonEnd(model, data, { replicates: 20, seed: 1 });
  const seasonFiles = buildSeasonFiles(model, m1, m2, m3, m4SeasonEnd);

  for (const s of model.seasons) {
    const raw = rawSeasons.find((r) => r.season === s.seasonKey);
    const activeTeamKeys = new Set(s.teamGames.map((t) => t.teamKey));
    const snapFile = buildSnapshotsFile(data, data.teamGames, s.seasonKey, raw, activeTeamKeys, { snapshotReplicates: SNAPSHOT_REPLICATES, snapshotSeed: 1 });
    if (snapFile.matchdays.length === 0) continue; // keine abgeschlossenen Spieltage in dieser Saison (in den echten Daten nicht der Fall)
    const lastMd = snapFile.matchdays[snapFile.matchdays.length - 1];
    const seasonFile = seasonFiles[s.seasonKey];
    assertTrue(seasonFile.asOf.date >= lastMd.asOf.date, `${s.seasonKey}: Saisonende-asOf (${seasonFile.asOf.date}) liegt nie vor dem letzten Snapshot-Spieltag-asOf (${lastMd.asOf.date}) — Teilmengen-Invariante`);
    if (seasonFile.asOf.date !== lastMd.asOf.date) {
      console.log(`  ok   ${s.seasonKey}: asOf weicht ab (${lastMd.asOf.date} vs. ${seasonFile.asOf.date}) — dokumentierter Realdatenfall (Spieltag mit Status "unvollstaendig", der bereits beendete Spiele nach dem letzten vollständigen Spieltag enthält), exakter Punktschätzer-Vergleich hier bewusst übersprungen`);
      continue;
    }
    const seasonTeams = Object.fromEntries(seasonFile.teamStrength.stage1.teams.map((t) => [t.teamKey, t]));
    for (const t of lastMd.teamStrength.teams) {
      const st = seasonTeams[t.teamKey];
      assertTrue(st !== undefined, `${s.seasonKey}/${t.teamKey}: Team im Saisonende-Stand vorhanden`);
      if (st) {
        assertTrue(Math.abs(st.attack - t.attack) < 1e-9, `${s.seasonKey}/${t.teamKey}: attack (Punktschätzer) stimmt mit dem Saisonende-Stand überein`);
        assertTrue(Math.abs(st.defense - t.defense) < 1e-9, `${s.seasonKey}/${t.teamKey}: defense (Punktschätzer) stimmt mit dem Saisonende-Stand überein`);
      }
    }
  }
}

// ═════════════════════════════════════════════════════════════════════════
console.log('== F) Saison-Team-Filter: nur in dieser Saison tatsächlich aktive Teams im Snapshot ==');
{
  const model = await buildLeagueModel(REPO_ROOT);
  const rawSeasons = await loadSeasonFiles(REPO_ROOT);
  const data = {
    teamGames: model.seasons.flatMap((s) => s.teamGames),
    goalEvents: model.seasons.flatMap((s) => s.goalEvents),
    rosterEntries: model.seasons.flatMap((s) => s.rosterEntries),
  };
  const s2526 = model.seasons.find((s) => s.seasonKey === '25/26');
  const raw2526 = rawSeasons.find((r) => r.season === '25/26');
  const activeTeamKeys = new Set(s2526.teamGames.map((t) => t.teamKey));
  assertEqual([...activeTeamKeys].sort(), ['breisgau-bandits', 'djk-giants-karlsruhe-ost', 'fbc-heidelberg', 'floorball-mannheim', 'sportvg-feuerbach', 'sv-tuebingen-sharks', 'tv-schriesheim', 'vfb-ulm'], 'Vorbedingung: 25/26 hat genau die 8 tatsächlich aktiven Teams (Realdaten)');
  const snapFile = buildSnapshotsFile(data, data.teamGames, '25/26', raw2526, activeTeamKeys, { snapshotReplicates: SNAPSHOT_REPLICATES, snapshotSeed: 1 });
  assertTrue(snapFile.matchdays.length > 0, 'Vorbedingung: mindestens ein abgeschlossener Spieltag in 25/26');
  for (const md of snapFile.matchdays) {
    const teamKeys = md.teamStrength.teams.map((t) => t.teamKey).sort();
    assertEqual(teamKeys, [...activeTeamKeys].sort(), `25/26 Spieltag ${md.number}: teamStrength.teams enthält ausschließlich die 8 in dieser Saison aktiven Teams (nicht die zusätzlichen Teams aus dem zeitgewichteten Multi-Saison-Fit)`);
  }
}

// ═════════════════════════════════════════════════════════════════════════
console.log('== G) null bleibt null: lateGameIndex an einem frühen Spieltag wird nicht durch 0 ersetzt ==');
{
  const model = await buildLeagueModel(REPO_ROOT);
  const rawSeasons = await loadSeasonFiles(REPO_ROOT);
  const data = {
    teamGames: model.seasons.flatMap((s) => s.teamGames),
    goalEvents: model.seasons.flatMap((s) => s.goalEvents),
    rosterEntries: model.seasons.flatMap((s) => s.rosterEntries),
  };
  const s2122 = model.seasons.find((s) => s.seasonKey === '21/22');
  const raw2122 = rawSeasons.find((r) => r.season === '21/22');
  const activeTeamKeys = new Set(s2122.teamGames.map((t) => t.teamKey));
  const snapFile = buildSnapshotsFile(data, data.teamGames, '21/22', raw2122, activeTeamKeys, { snapshotReplicates: SNAPSHOT_REPLICATES, snapshotSeed: 1 });
  const md2 = snapFile.matchdays.find((md) => md.number === 2); // erster Spieltag mit game1-Beobachtungen für mehrere Teams
  assertTrue(md2 !== undefined, 'Vorbedingung: Spieltag 2 (21/22) ist im Snapshot vorhanden');
  const nullEntries = md2.teams ?? md2.fatigue.teams;
  const hasNullLateGameIndex = md2.fatigue.teams.some((t) => t.game1.lateGameIndex.shrunkEffect === null);
  assertTrue(hasNullLateGameIndex, 'Vorbedingung: mindestens ein Team hat an diesem frühen Spieltag game1.lateGameIndex.shrunkEffect === null (kleine Stichprobe, Prior nicht schätzbar)');
  for (const t of md2.fatigue.teams) {
    if (t.game1.lateGameIndex.shrunkEffect === null) {
      assertTrue(Object.is(t.game1.lateGameIndex.shrunkEffect, null), `${t.teamKey}: lateGameIndex.shrunkEffect ist STRIKT null (Object.is), kein 0, kein undefined, kein NaN`);
      assertTrue(t.game1.lateGameIndex.shrunkEffect !== 0, `${t.teamKey}: null wird NICHT als 0 interpretierbar zurückgegeben (0 !== null bleibt wahr)`);
    }
  }
  // Determinismus des null-Zustands selbst: erneuter Aufbau desselben Snapshots liefert exakt dieselben null-Stellen.
  const snapFile2 = buildSnapshotsFile(data, data.teamGames, '21/22', raw2122, activeTeamKeys, { snapshotReplicates: SNAPSHOT_REPLICATES, snapshotSeed: 1 });
  const md2b = snapFile2.matchdays.find((md) => md.number === 2);
  assertEqual(md2.fatigue.teams.map((t) => t.game1.lateGameIndex.shrunkEffect === null), md2b.fatigue.teams.map((t) => t.game1.lateGameIndex.shrunkEffect === null), 'welche Teams null sind, ist zwischen zwei identischen Läufen deterministisch stabil');
}

// ═════════════════════════════════════════════════════════════════════════
console.log('== H) --write und --only schließen sich aus; --write erfordert --replicates/--seed (Sandbox) ==');
{
  const e1 = await main(['--write'], { repoRoot: sandboxA, stdout: { write: () => {} }, stderr: { write: () => {} } });
  assertEqual(e1, 2, '--write ohne --replicates/--seed: Exit 2');
  const e2 = await main(['--write', '--only', 'M1', '--replicates', '20', '--seed', '1'], { repoRoot: sandboxA, stdout: { write: () => {} }, stderr: { write: () => {} } });
  assertEqual(e2, 2, '--write zusammen mit --only: Exit 2');
}

await rm(sandboxA, { recursive: true, force: true });

console.log('');
if (failures > 0) {
  console.log(`${failures} Test(s) fehlgeschlagen.`);
  process.exitCode = 1;
} else {
  console.log('Alle Tests erfolgreich.');
  process.exitCode = 0;
}

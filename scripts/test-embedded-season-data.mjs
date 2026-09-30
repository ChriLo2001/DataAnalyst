#!/usr/bin/env node
// Tests für die Token-Diät-Teil-2-Auslagerung von STATIC_SEASON_DATA aus
// index.html nach season-data-embedded.js (klassisches Skript, setzt
// window.STATIC_SEASON_DATA, lädt auch unter file:// per <script src>).
//
// Deckt ab (siehe Auftrag):
//   A) Das Datenobjekt in season-data-embedded.js ist wertgleich zum Stand
//      VOR der Auslagerung (Referenz aus git show, kanonisch serialisiert
//      verglichen — nicht per Augenmaß).
//   B) index.html enthält keinen STATIC_SEASON_DATA-Datenblock mehr (keine
//      "const STATIC_SEASON_DATA={"-Literal-Zuweisung), aber den
//      <script src="season-data-embedded.js">-Verweis vor dem Haupt-<script>.
//   C) --update-embedded (embedSeasonInEmbeddedFile UND der volle CLI-Pfad in
//      einer Sandbox) schreibt nur den betroffenen Saisonblock und lässt
//      index.html unberührt.
//   D) Fehlt season-data-embedded.js, führt das zu einem Hinweis (Datei wird
//      neu angelegt), nicht zu einem Fehler.
//
// Kein Netzwerk. Schreibt niemals in die echten Projektdateien — Fall C nutzt
// eine Sandbox (Kopie in einem temporären Verzeichnis), alle anderen Fälle
// lesen die echten Dateien nur lesend oder arbeiten rein im Speicher.
//
// Aufruf: node scripts/test-embedded-season-data.mjs

import { readFile, writeFile, mkdir, cp, mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import vm from 'node:vm';
import { execFileSync } from 'node:child_process';

import { canonicalJson } from './lineup-data-hash.mjs';
import { embedSeasonInEmbeddedFile } from './import-season-data.mjs';

const REPO_ROOT = path.resolve(import.meta.dirname, '..');
let failures = 0;

function assertEqual(actual, expected, label) {
  const a = JSON.stringify(actual);
  const e = JSON.stringify(expected);
  if (a === e) {
    console.log(`  ok   ${label}`);
  } else {
    failures++;
    const shorten = (s) => (s.length > 300 ? `${s.slice(0, 300)}… (${s.length} Zeichen)` : s);
    console.log(`  FAIL ${label}\n       erwartet: ${shorten(e)}\n       erhalten: ${shorten(a)}`);
  }
}

function assertTrue(cond, label) {
  assertEqual(Boolean(cond), true, label);
}

function git(args) {
  // maxBuffer hochgesetzt: "git show <rev>:index.html" liefert bis zu ~4 MB
  // (der frühere, noch eingebettete Stand) — der execFileSync-Default (1 MB)
  // reicht dafür nicht.
  return execFileSync('git', args, { cwd: REPO_ROOT, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
}

/** String-bewusster Klammer-Balancer, unabhängig von der (nicht exportierten)
 * findMatchingBrace() in import-season-data.mjs nachgebaut — analog zum
 * bestehenden Muster in test-import-season-data.mjs (Fall H), damit dieser
 * Test embedSeasonInEmbeddedFile() nicht "mit sich selbst" prüft. */
function localFindMatchingBrace(text, startIdx) {
  let depth = 0, inString = false, escaped = false;
  for (let i = startIdx; i < text.length; i++) {
    const c = text[i];
    if (inString) {
      if (escaped) escaped = false;
      else if (c === '\\') escaped = true;
      else if (c === '"') inString = false;
      continue;
    }
    if (c === '"') { inString = true; continue; }
    if (c === '{') depth++;
    else if (c === '}') { depth--; if (depth === 0) return i; }
  }
  return -1;
}

/** Extrahiert das STATIC_SEASON_DATA-Objekt aus einem alten index.html-Text
 * (Stand vor der Auslagerung: "const STATIC_SEASON_DATA={...};"). */
function extractOldStaticSeasonData(html) {
  const marker = 'const STATIC_SEASON_DATA=';
  const markerIdx = html.indexOf(marker);
  if (markerIdx === -1) return null;
  const objStart = markerIdx + marker.length;
  if (html[objStart] !== '{') return null;
  const objEnd = localFindMatchingBrace(html, objStart);
  if (objEnd === -1) return null;
  return JSON.parse(html.slice(objStart, objEnd + 1));
}

/** Extrahiert das window.STATIC_SEASON_DATA-Objekt aus season-data-embedded.js
 * durch tatsächliche Ausführung als klassisches Skript in einem Sandbox-
 * Context (kein regex/Textparsing — genau das reale Laufzeitverhalten im
 * Browser: "window.STATIC_SEASON_DATA=" setzt eine Eigenschaft auf window). */
function loadEmbeddedStaticSeasonData(jsText) {
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(jsText, sandbox);
  return sandbox.window.STATIC_SEASON_DATA;
}

/** Findet eine Referenz für "der Stand von index.html VOR der Auslagerung":
 *   1. Der Elternteil des Commits, der season-data-embedded.js erstmals
 *      hinzugefügt hat (robust gegenüber späteren --update-embedded-Commits,
 *      die die Datei nur noch ändern, nicht neu anlegen).
 *   2. Fällt das aus (Datei noch nicht committet — z.B. dieser Testlauf
 *      findet vor dem Migrations-Commit statt), der aktuelle HEAD-Stand von
 *      index.html, der die Auslagerung dann noch nicht enthält.
 * @returns {{html:string, source:string}}
 */
function findPreMigrationIndexHtml() {
  try {
    const addCommit = git(['log', '--follow', '--diff-filter=A', '--format=%H', '--', 'season-data-embedded.js']).trim().split('\n').filter(Boolean).pop();
    if (addCommit) {
      const html = git(['show', `${addCommit}^:index.html`]);
      return { html, source: `git show ${addCommit}^:index.html (Elternteil des Commits, der season-data-embedded.js anlegte)` };
    }
  } catch (e) {
    // fällt durch zum HEAD-Fallback
  }
  const html = git(['show', 'HEAD:index.html']);
  return { html, source: 'git show HEAD:index.html (season-data-embedded.js ist noch nicht committet)' };
}

async function main() {
  // ───────────────────────────────────────────────────────────────────────
  console.log('== A) Wertgleichheit: season-data-embedded.js vs. Stand vor der Auslagerung ==');
  {
    const { html: oldHtml, source } = findPreMigrationIndexHtml();
    console.log(`     Referenz: ${source}`);
    const oldData = extractOldStaticSeasonData(oldHtml);
    assertTrue(oldData !== null, 'Referenz-index.html enthält ein extrahierbares STATIC_SEASON_DATA-Objekt');

    const embeddedPath = path.join(REPO_ROOT, 'season-data-embedded.js');
    const embeddedText = await readFile(embeddedPath, 'utf8');
    const newData = loadEmbeddedStaticSeasonData(embeddedText);
    assertTrue(newData && typeof newData === 'object', 'season-data-embedded.js setzt window.STATIC_SEASON_DATA auf ein Objekt');

    if (oldData && newData) {
      assertEqual(Object.keys(newData).sort(), Object.keys(oldData).sort(), 'dieselben Saison-Schlüssel');
      assertEqual(canonicalJson(newData), canonicalJson(oldData), 'kanonisch serialisiert wertgleich (nicht nur "sieht ähnlich aus")');
      for (const key of Object.keys(oldData)) {
        assertEqual(canonicalJson(newData[key]), canonicalJson(oldData[key]), `Saison "${key}" für sich genommen wertgleich`);
      }
    }
  }

  // ───────────────────────────────────────────────────────────────────────
  console.log('');
  console.log('== B) index.html: kein Datenblock mehr, aber der Script-Verweis ==');
  {
    const html = await readFile(path.join(REPO_ROOT, 'index.html'), 'utf8');
    assertTrue(!html.includes('const STATIC_SEASON_DATA={'), 'kein "const STATIC_SEASON_DATA={"-Literal mehr in index.html');
    assertTrue(html.includes('const STATIC_SEASON_DATA=window.STATIC_SEASON_DATA||{}'), 'Fallback-Deklaration übernimmt window.STATIC_SEASON_DATA (oder {} falls ungesetzt)');
    assertTrue(html.includes('<script src="season-data-embedded.js"></script>'), '<script src="season-data-embedded.js"> ist vorhanden');

    const scriptSrcIdx = html.indexOf('<script src="season-data-embedded.js">');
    const mainScriptIdx = html.indexOf('<script>');
    assertTrue(scriptSrcIdx !== -1 && mainScriptIdx !== -1 && scriptSrcIdx < mainScriptIdx, 'der Datenverweis steht VOR dem Haupt-Anwendungsskript');
  }

  // ───────────────────────────────────────────────────────────────────────
  console.log('');
  console.log('== C) embedSeasonInEmbeddedFile: nur der betroffene Saisonblock ändert sich ==');
  {
    const embeddedPath = path.join(REPO_ROOT, 'season-data-embedded.js');
    const originalText = await readFile(embeddedPath, 'utf8');
    const originalData = loadEmbeddedStaticSeasonData(originalText);

    const candidate = JSON.parse(JSON.stringify(originalData['25/26']));
    candidate.games.push({
      id: 999101, game_number: '99', date: '2026-05-01',
      game_day: { game_day_number: 9, title: '9. Spieltag' },
      home_team_name: 'VfB Ulm', guest_team_name: 'FBC Heidelberg',
      started: false, ended: false, result_string: null, result: null,
      league_id: 1897, league_name: 'Verbandsliga BW (KF)',
      events: [], players: {}, starting_players: {}, awards: {}, period_titles: [], notice_type: null,
    });

    const { text: newText, mode } = embedSeasonInEmbeddedFile(originalText, '25/26', candidate);
    assertEqual(mode, 'replaced', '25/26 war bereits eingebettet -> Modus "replaced"');

    const newData = loadEmbeddedStaticSeasonData(newText);
    for (const key of Object.keys(originalData)) {
      if (key === '25/26') continue;
      assertEqual(canonicalJson(newData[key]), canonicalJson(originalData[key]), `Saison "${key}" bleibt unverändert`);
    }
    assertEqual(newData['25/26'].games.length, originalData['25/26'].games.length + 1, '25/26 hat jetzt ein Spiel mehr');
    assertEqual(
      newData['25/26'].games.slice(0, originalData['25/26'].games.length).map((g) => g.id),
      originalData['25/26'].games.map((g) => g.id),
      'die ursprünglichen Spiele von 25/26 bleiben in Reihenfolge/Inhalt erhalten',
    );

    assertTrue(newText.startsWith('// Automatisch erzeugt'), 'Datei-Kopfkommentar bleibt erhalten');
    assertTrue(newText.length > originalText.length, 'Datei ist (durch das zusätzliche Spiel) länger, nicht leer/kaputt');
  }

  console.log('== C (Gegenprobe): mehrdeutiger Treffer -> harter Abbruch ==');
  {
    const embeddedPath = path.join(REPO_ROOT, 'season-data-embedded.js');
    const originalText = await readFile(embeddedPath, 'utf8');
    const marker = 'window.STATIC_SEASON_DATA=';
    const objStart = originalText.indexOf('{', originalText.indexOf(marker));
    const injected = `${originalText.slice(0, objStart + 1)}"25/26":{"season":"25/26","label":"dup","games":[]},${originalText.slice(objStart + 1)}`;
    let threw = false;
    try {
      embedSeasonInEmbeddedFile(injected, '25/26', loadEmbeddedStaticSeasonData(originalText)['25/26']);
    } catch (e) {
      threw = true;
    }
    assertTrue(threw, 'bei mehrdeutigem "25/26"-Treffer wird hart abgebrochen');
  }

  console.log('== C (Randfall): Einfügen in ein komplett leeres Objekt ("{}") ergibt gültiges JSON ==');
  {
    // Regressionstest für einen echten Bug: die "inserted"-Variante fügte
    // bisher IMMER ein führendes Komma ein ("{,"key":…}"), was bei einem
    // bereits leeren Ausgangsobjekt (kein bestehender Eintrag, vor diesem Fix
    // z.B. beim Neuanlegen von season-data-embedded.js) kein gültiges JSON
    // mehr ergab. Vorher unbemerkt, weil STATIC_SEASON_DATA in index.html nie
    // leer war — erstmals sichtbar geworden durch den "Datei fehlt"-Fall D.
    const emptyFile = '// Kopfkommentar\nwindow.STATIC_SEASON_DATA={};\n';
    const sample = { season: '25/26', label: '2025/26', games: [{ id: 1 }] };
    const { text, mode } = embedSeasonInEmbeddedFile(emptyFile, '25/26', sample);
    assertEqual(mode, 'inserted', 'leeres Objekt -> Modus "inserted"');
    let parsedOk = true;
    let data = null;
    try {
      data = loadEmbeddedStaticSeasonData(text);
    } catch (e) {
      parsedOk = false;
    }
    assertTrue(parsedOk, 'Ergebnis ist gültiges, ausführbares JavaScript/JSON (kein führendes Komma im leeren Objekt)');
    if (parsedOk) assertEqual(Object.keys(data), ['25/26'], 'enthält genau die eingefügte Saison');
  }

  // ───────────────────────────────────────────────────────────────────────
  console.log('');
  console.log('== C (End-zu-End, Sandbox): --update-embedded schreibt nur season-data-embedded.js, index.html unberührt ==');
  {
    const dir = await mkdtemp(path.join(tmpdir(), 'embedded-season-data-test-'));
    try {
      await mkdir(path.join(dir, 'season-data'), { recursive: true });
      await cp(path.join(REPO_ROOT, 'season-data', '25-26.json'), path.join(dir, 'season-data', '25-26.json'));
      await cp(path.join(REPO_ROOT, 'season-data-embedded.js'), path.join(dir, 'season-data-embedded.js'));
      // index.html im Sandbox NUR mit einem kleinen, klar erkennbaren Inhalt —
      // beweist "index.html unberührt" ohne die ganze 1,5-MB-Datei zu kopieren.
      const sentinelHtml = '<!doctype html><html><body>SENTINEL-UNBERUEHRT</body></html>';
      await writeFile(path.join(dir, 'index.html'), sentinelHtml, 'utf8');
      for (const dep of ['import-season-data.mjs', 'update-season-data.mjs', 'season-data-validators.mjs', 'lineup-data-hash.mjs']) {
        await cp(path.join(REPO_ROOT, 'scripts', dep), path.join(dir, dep));
      }

      const prevCwd = process.cwd();
      process.chdir(dir);
      try {
        const mod = await import(pathToFileURL(path.join(dir, 'import-season-data.mjs')).href);
        await mod.main(['25/26', '--update-embedded']);
      } finally {
        process.chdir(prevCwd);
      }

      const indexAfter = await readFile(path.join(dir, 'index.html'), 'utf8');
      assertEqual(indexAfter, sentinelHtml, 'index.html im Sandbox ist byte-identisch geblieben (--update-embedded fasst es nicht an)');

      const embeddedAfter = await readFile(path.join(dir, 'season-data-embedded.js'), 'utf8');
      const dataAfter = loadEmbeddedStaticSeasonData(embeddedAfter);
      const realSeason2526 = JSON.parse(await readFile(path.join(REPO_ROOT, 'season-data', '25-26.json'), 'utf8').then((s) => s.replace(/^﻿/, '')));
      assertEqual(dataAfter['25/26'].games.length, realSeason2526.games.length, '25/26 im Sandbox wurde aus der echten season-data/25-26.json neu eingebettet');
      const originalEmbedded = loadEmbeddedStaticSeasonData(await readFile(path.join(REPO_ROOT, 'season-data-embedded.js'), 'utf8'));
      for (const key of Object.keys(originalEmbedded)) {
        if (key === '25/26') continue;
        assertEqual(canonicalJson(dataAfter[key]), canonicalJson(originalEmbedded[key]), `Sandbox: Saison "${key}" bleibt unverändert`);
      }
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  }

  // ───────────────────────────────────────────────────────────────────────
  console.log('');
  console.log('== D) Fehlende season-data-embedded.js -> Hinweis statt Fehler ==');
  {
    const dir = await mkdtemp(path.join(tmpdir(), 'embedded-season-data-test-missing-'));
    try {
      await mkdir(path.join(dir, 'season-data'), { recursive: true });
      await cp(path.join(REPO_ROOT, 'season-data', '25-26.json'), path.join(dir, 'season-data', '25-26.json'));
      // season-data-embedded.js bewusst NICHT anlegen.
      const sentinelHtml = '<!doctype html><html><body>SENTINEL-UNBERUEHRT</body></html>';
      await writeFile(path.join(dir, 'index.html'), sentinelHtml, 'utf8');
      for (const dep of ['import-season-data.mjs', 'update-season-data.mjs', 'season-data-validators.mjs', 'lineup-data-hash.mjs']) {
        await cp(path.join(REPO_ROOT, 'scripts', dep), path.join(dir, dep));
      }

      const logs = [];
      const origLog = console.log;
      console.log = (...args) => logs.push(args.join(' '));
      let exitCodeAfter;
      const prevCwd = process.cwd();
      process.chdir(dir);
      try {
        const mod = await import(pathToFileURL(path.join(dir, 'import-season-data.mjs')).href);
        await mod.main(['25/26', '--update-embedded']);
        exitCodeAfter = process.exitCode;
        process.exitCode = 0; // dieser Testlauf soll dadurch nicht selbst fehlschlagen
      } finally {
        process.chdir(prevCwd);
        console.log = origLog;
      }

      assertEqual(exitCodeAfter, 0, 'fehlende Datei führt NICHT zu einem Fehler-Exitcode (0, kein Abbruch)');
      assertTrue(logs.some((l) => l.includes('existierte noch nicht') || l.includes('neu angelegt')), 'Hinweis statt Fehler wird ausgegeben');

      const created = await readFile(path.join(dir, 'season-data-embedded.js'), 'utf8');
      const createdData = loadEmbeddedStaticSeasonData(created);
      assertTrue(createdData && typeof createdData === 'object', 'season-data-embedded.js wurde neu angelegt und enthält ein gültiges Objekt');
      assertEqual(Object.keys(createdData), ['25/26'], 'die neu angelegte Datei enthält genau die eingebettete Saison, sonst nichts Erfundenes');

      const indexAfter = await readFile(path.join(dir, 'index.html'), 'utf8');
      assertEqual(indexAfter, sentinelHtml, 'index.html bleibt auch beim Neuanlegen unberührt');
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  }

  console.log();
  if (failures === 0) {
    console.log('Alle Tests erfolgreich.');
    return 0;
  }
  console.log(`${failures} Test(s) fehlgeschlagen.`);
  return 1;
}

main().then((code) => { process.exitCode = code; });

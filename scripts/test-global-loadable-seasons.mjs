#!/usr/bin/env node
// Regressionstest für einen am 06.10.2026 bei Aufgabe 4j (Messung) gefundenen Nebenbefund:
// getGlobalLoadableSeasonKeys() entschied für NICHT-'embeddedStatic'-Saisons bisher über
// `key===CURRENT_SEASON_KEY` — solange CURRENT_SEASON_KEY hartcodiert "25/26" war (vor Aufgabe 13),
// fiel das nie auf. Seit CURRENT_SEASON_KEY korrekt aus season-data/seasons.json abgeleitet wird
// (Aufgabe 13, jetzt "26/27"), wurde 25/26 (loaderStrategy:'archivedExternal') NICHT MEHR in die
// globale Alltime-/Hall-of-Fame-Aggregation geladen — eine abgeschlossene, archivierte Saison mit
// echten Daten wäre dadurch beim App-Start unsichtbar gewesen. Fix: 25/26 auf loaderStrategy:
// 'embeddedStatic' umgestellt (technisch korrekt, da die Daten längst synchron eingebettet sind).
//
// Dieser Test prüft die eigentliche Invariante, nicht nur den Einzelfall 25/26: JEDE Saison, die laut
// season-data/seasons.json als "archived" geführt wird UND über eingebettete Daten verfügt, muss in
// getGlobalLoadableSeasonKeys() erscheinen — UNABHÄNGIG davon, welchen Wert CURRENT_SEASON_KEY gerade
// hat. Das deckt nicht nur den konkreten 25/26-Fall ab, sondern auch jeden künftigen Saisonwechsel.
//
// Die echten Funktionen (hasSeasonSource, hasEmbeddedSeasonData, getStaticSeasonGames,
// getGlobalLoadableSeasonKeys) und das echte SEASON_CONFIG-Objekt werden unverändert aus index.html
// geschnitten und in node:vm ausgeführt — STATIC_SEASON_DATA wird minimal gefüllt (1 Platzhalterspiel
// je Saison mit eingebetteten Daten), kein echter Spielplan nötig, da nur die Lade-ENTSCHEIDUNG geprüft
// wird, nicht der Spielplan-Inhalt selbst.
//
// Aufruf: node scripts/test-global-loadable-seasons.mjs

import { readFile } from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';

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

const html = (await readFile(path.join(REPO_ROOT, 'index.html'), 'utf8')).replace(/\r\n/g, '\n');
function fnSource(name) {
  const m = new RegExp(`(^|\\n)function ${name}\\(`).exec(html);
  if (!m) throw new Error(`Funktion nicht gefunden: ${name}`);
  const from = m.index + m[1].length;
  return html.slice(from, html.indexOf('\n}', from) + 2);
}
function constObjectSource(name) {
  // Nur für Objekt-Literale const X={...}; — endet am ersten "\n};" danach (reicht hier aus,
  // SEASON_CONFIG ist das einzige so extrahierte Objekt).
  const m = new RegExp(`(^|\\n)const ${name}=\\{`).exec(html);
  if (!m) throw new Error(`Konstante nicht gefunden: ${name}`);
  const from = m.index + m[1].length;
  const end = html.indexOf('\n};', from);
  if (end === -1) throw new Error(`Ende von const ${name} nicht gefunden (erwartet "\\n};")`);
  return html.slice(from, end + 3);
}

const realManifest = JSON.parse(await readFile(path.join(REPO_ROOT, 'season-data', 'seasons.json'), 'utf8'));
const archivedKeys = realManifest.seasons.filter((s) => s.status === 'archived').map((s) => s.key);
console.log(`Archivierte Saisons laut echtem Manifest: ${archivedKeys.join(', ')}`);

const seasonConfigSrc = constObjectSource('SEASON_CONFIG');
// SEASON_CONFIG referenziert diverse *_GAME_IDS-Konstanten (gameIds/knownUlmGameIds je Saison) — deren
// Inhalt ist für diesen Test irrelevant (er prüft nur die Lade-ENTSCHEIDUNG, nie Spieldaten); alle
// referenzierten Bezeichner automatisch als leere Arrays bereitstellen, statt sie einzeln zu pflegen.
const EXCLUDED_IDS = new Set(['SEASON_CONFIG', 'CURRENT_SEASON_KEY', 'STATIC_SEASON_DATA']);
const referencedIds = [...new Set([...seasonConfigSrc.matchAll(/\b([A-Z][A-Z0-9_]+)\b/g)].map((m) => m[1]))].filter((id) => !EXCLUDED_IDS.has(id));
const placeholderConsts = referencedIds.map((id) => `const ${id}=[];`).join('\n');

function buildCode(currentSeasonKeyOverride) {
  return [
    placeholderConsts,
    `const CURRENT_SEASON_KEY=${JSON.stringify(currentSeasonKeyOverride)};`,
    seasonConfigSrc,
    'const STATIC_SEASON_DATA=window.STATIC_SEASON_DATA||{};',
    fnSource('getStaticSeasonGames'),
    fnSource('hasSeasonSource'),
    fnSource('hasEmbeddedSeasonData'),
    fnSource('getGlobalLoadableSeasonKeys'),
  ].join('\n');
}

function run(currentSeasonKeyOverride, staticData) {
  const ctx = vm.createContext({ console, window: { STATIC_SEASON_DATA: staticData } });
  vm.runInContext(buildCode(currentSeasonKeyOverride), ctx);
  return vm.runInContext('getGlobalLoadableSeasonKeys()', ctx);
}

// Minimaler STATIC_SEASON_DATA-Stub: JEDE Saison aus SEASON_CONFIG bekommt 1 Platzhalterspiel, als wäre
// season-data-embedded.js für alle Saisons aktuell (so wie es in der echten App nach --update-embedded ist).
const seasonConfigKeys = [...html.matchAll(/\n {2}'(\d{2}\/\d{2})':\{/g)].map((m) => m[1]);
console.log(`In SEASON_CONFIG definierte Saison-Keys: ${seasonConfigKeys.join(', ')}`);
const fullStaticData = Object.fromEntries(seasonConfigKeys.map((k) => [k, { season: k, label: k, games: [{ id: 1 }] }]));

console.log('');
console.log('== Fall 1: CURRENT_SEASON_KEY = tatsächlich aktuelle Saison (26/27, wie seit Aufgabe 13) ==');
{
  const loadable = run('26/27', fullStaticData);
  for (const key of archivedKeys) {
    assertTrue(loadable.includes(key), `archivierte Saison "${key}" ist ladbar, auch wenn sie nicht CURRENT_SEASON_KEY ist`);
  }
}

console.log('== Fall 2 (Regressionsfall): CURRENT_SEASON_KEY zeigt NICHT auf 25/26 ==');
{
  const loadable = run('26/27', fullStaticData);
  assertTrue(loadable.includes('25/26'), '25/26 bleibt ladbar, obwohl CURRENT_SEASON_KEY "26/27" ist (der konkrete Regressionsfall)');
}

console.log('== Fall 3: Gegenprobe mit einem GANZ ANDEREN CURRENT_SEASON_KEY-Wert ==');
{
  // Beweist die Unabhängigkeit von CURRENT_SEASON_KEY wirklich, nicht nur zufällig für "26/27".
  const loadable = run('21/22', fullStaticData);
  for (const key of archivedKeys) {
    assertTrue(loadable.includes(key), `archivierte Saison "${key}" ist ladbar, selbst wenn CURRENT_SEASON_KEY auf eine andere archivierte Saison zeigt`);
  }
}

console.log('== Fall 4: eine Saison OHNE eingebettete Daten wird korrekt NICHT geladen (keine Übergeneralisierung) ==');
{
  const partialData = { ...fullStaticData };
  delete partialData['21/22'];
  const loadable = run('26/27', partialData);
  assertTrue(!loadable.includes('21/22'), 'fehlen eingebettete Daten, bleibt die Saison zu Recht außen vor — der Fix ist kein pauschales "immer alles laden"');
}

console.log('');
if (failures > 0) {
  console.log(`${failures} Test(s) fehlgeschlagen.`);
  process.exitCode = 1;
} else {
  console.log('Alle Tests erfolgreich.');
}

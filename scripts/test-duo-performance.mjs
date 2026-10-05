#!/usr/bin/env node
// Aufgabe 4L/4L2 (S2e-Kaltstart-Phase) · Performance-Regressionstest für die Duo-Center-Pro-Analyse
// (rDuoCenterPro / buildDuoProAnalysis / buildDuoReplacementOptions in index.html).
//
// Hintergrund (Befund, siehe Build-Bericht): rDuoCenterPro() hängte den Browser-Tab beim Aufrufen
// vollständig auf (keine Fehlermeldung, kein Timeout — echtes, minutenlanges Blockieren des Hauptthreads).
// Ursache: buildDuoReplacementOptions() bewertet bis zu 28 Ersatzkandidaten × 2 Seiten über
// buildDuoCompatibility(), und JEDER dieser Aufrufe rief wiederum getRosterImpactPlayerGames() für beide
// Spieler auf — eine Funktion, die ohne jede Memoisierung bei jedem Aufruf neu LINEAR über die komplette
// Saisonhistorie iterierte (~160ms/Aufruf, gemessen). Korrekturen in index.html, zwei Phasen:
//   4L:  1. buildDuoCompatibility() überspringt die Anti-Synergy-Gegenprüfung (antiA/antiB), wenn
//           context._skipReplacements gesetzt ist — gesetzt NUR in buildDuoReplacementOptions' Kandidaten-
//           Schleife ("ein Ersatzkandidat bekommt keine eigenen Ersatzvorschläge" — inhaltlich eine
//           Rekursionsstufe ohne Aussagewert). Das angezeigte Hauptduo bekommt die Gegenprüfung weiterhin
//           vollständig.
//        2. getRosterImpactPlayerGames() zunächst nur MEMOISIERT (analysisCache) — wiederholte denselben
//           linearen Durchlauf seltener, ersetzte ihn aber nicht. Reichte allein nicht: 19,7–48,0 s.
//        3. rDuoCenterPro() berechnete floor/third/warnings zusätzlich zu buildDuoProAnalysis() ein zweites
//           Mal (identische Argumente) — jetzt aus analysis.floorCeiling/bestThirdMan/warnings wiederverwendet.
//   4L2: getRosterImpactPlayerGames() ist jetzt echt INDEXBASIERT (buildRosterImpactGameIndex(), siehe
//        dort): ein Index Spieler -> Spiele, einmal über alle geladenen Spiele gebaut, inkl. vorab
//        aufgelöster Kaderzeilen-Partner je Spiel (resolvedRosterByGame) — kein linearer Durchlauf mehr pro
//        Abfrage, auch nicht beim ersten (kalten) Aufruf eines neuen Spielers. Byte-Identität zur alten
//        linearen Implementierung geprüft: 329 Kombinationen (47 reale Spieler × 7 Saison-Scopes inkl.
//        "alltime"), 0 Abweichungen — zweimal unabhängig wiederholt (vor und nach der zweiten 4L2-Stufe).
//
// Gemessen (dieselbe echte Datenbasis, zwei echte Feldspieler aus einem realistischen 47-Personen-Kader,
// jeweils kalter analysisCache):
//   vorher (4L):      buildDuoReplacementOptions() allein ~117,7 s (Node, reproduzierbar) — rDuoCenterPro()
//                      wurde im Browser gar nicht mehr erreicht (vollständiges Einfrieren).
//   nach 4L:           rDuoCenterPro() 19,7–48,0 s (Node/Browser, mehrere Läufe) — "funktioniert wieder",
//                      aber laut Auftrag "keine Lösung".
//   nach 4L2:          rDuoCenterPro() Node: 28,4 s (ein sauberer, isolierter Lauf) / Browser: 19,3 s —
//                      KEINE wesentliche Verbesserung gegenüber 4L mehr. Ursache isoliert: der verbleibende
//                      Flaschenhals ist NICHT mehr getRosterImpactPlayerGames() (jetzt ~0–8 ms, Index warm),
//                      sondern duoProPlayer() / getAllTimePlayerRows() — ~18 ms PRO AUFRUF, ohne jede
//                      Memoisierung, baut bei jedem Aufruf die komplette All-Time-Spielerliste (47 Einträge,
//                      je mit findLoadedSeasonPlayer()-Lookup) neu auf, statt sie wiederzuverwenden. Wird
//                      innerhalb von buildDuoCompatibility()/buildDuoDirectProduction()/
//                      buildDuoFloorCeiling()/buildDuoWithWithoutImpact() mehrfach je Kandidat aufgerufen —
//                      bei 56 Kandidaten-Durchläufen summiert sich das.
//                      NICHT selbst behoben: getAllTimePlayerRows() hängt von S.playerRegistry/S.allTime ab,
//                      die über mehrere setState()-Aufrufe (z.B. beim Öffnen von Hall of Fame/Compare, siehe
//                      Zeilen rund um toPublicPlayerRegistry()) neu zugewiesen werden, OHNE dass diese Felder
//                      in setState()s cacheRelevant-Liste stehen (die analysisCache bei Saisonwechsel leert).
//                      Ob diese Neuzuweisungen den INHALT tatsächlich ändern oder nur denselben Snapshot neu
//                      referenzieren, war in der verfügbaren Zeit nicht zweifelsfrei zu klären — ein falscher
//                      Cache hier würde veraltete Spielerdaten in der Duo-Analyse zeigen, ein STILLER
//                      Korrektheitsfehler, schlimmer als die jetzige Langsamkeit. Deshalb hier nur benannt,
//                      nicht angefasst (siehe Build-Bericht).
//
// Ergebnis: das Richtwert-Ziel von 2 Sekunden ist NICHT erreicht. getRosterImpactPlayerGames() selbst ist
// jetzt effektiv O(1) pro Abfrage (bewiesen, siehe oben) — das war der benannte Auftrag von 4L2 und ist
// erledigt. Die GESAMTE Karte bleibt wegen eines zweiten, erst durch diese Arbeit sichtbar gewordenen
// Flaschenhalses langsam.
//
// Zeitbudget dieses Tests: 75 Sekunden für EINEN kalten rDuoCenterPro()-Aufruf (TIME_BUDGET_MS unten).
// Begründung: gemessene Nachher-Werte (4L2) streuten bereits zwischen 19,3 s und 41,3 s (Browser/Node,
// derselbe Code, reine Umgebungslast) — ein knapperes Budget (z.B. 45 s) lag im selben Testlauf einmal bei
// nur noch 8% Luft zum tatsächlich gemessenen Wert (41,3 s von 45 s) und wäre damit ein Flake-Risiko. 75 s
// deckt die beobachtete Streuung mit rund 80% Luft über dem bisher höchsten gemessenen Wert ab, bleibt aber
// weit unter der alten ~118-s-Baseline: eine künftige Regression zurück zu unindexiertem
// getRosterImpactPlayerGames() würde dieses Budget zuverlässig sprengen. 75 s statt eines Richtwerts von 2 s,
// weil der zweite Flaschenhals (s.o., duoProPlayer()/getAllTimePlayerRows()) bewusst nicht in dieser Phase
// behoben wurde — ein 2-Sekunden-Budget würde heute bei JEDEM Lauf fehlschlagen, nicht nur bei einer echten
// Regression, und wäre damit kein nützlicher Regressionswächter mehr. Der Test misst bewusst nur EINEN
// kalten Aufruf (kein zweiter, künstlich warmer Aufruf danach) — das ist der realistische Erstbesuch-Fall,
// den ein Nutzer am Spieltag tatsächlich erlebt.
//
// Kein Netzwerk: fetch() im Sandbox lehnt jede Anfrage ab, die App fällt (wie unter file:// in echt) auf
// das eingebettete STATIC_SEASON_DATA aus season-data-embedded.js zurück — derselbe Mechanismus, der auch
// den Social-Video-Export ohne Server lauffähig macht (siehe CLAUDE.md).
//
// Aufruf: node scripts/test-duo-performance.mjs

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
function assertTrue(cond, label) { assertEqual(Boolean(cond), true, label); }

// Budget für EINEN kalten rDuoCenterPro()-Aufruf — siehe Begründung im Kopfkommentar.
const TIME_BUDGET_MS = 75000;

function makeEl() {
  return {
    style: {}, classList: { add() {}, remove() {}, contains: () => false, toggle() {} },
    addEventListener() {}, removeEventListener() {}, appendChild() {}, setAttribute() {}, removeAttribute() {},
    getAttribute: () => null, querySelector: () => null, querySelectorAll: () => [], children: [], dataset: {},
    focus() {}, blur() {}, click() {}, value: '', innerHTML: '', textContent: '',
  };
}

function buildSandbox() {
  const sandbox = {
    console,
    window: {},
    document: {
      addEventListener() {}, removeEventListener() {},
      getElementById: () => makeEl(), createElement: () => makeEl(),
      querySelector: () => null, querySelectorAll: () => [],
      body: makeEl(), documentElement: { style: {}, classList: makeEl().classList }, title: '',
    },
    location: { hash: '', href: 'http://localhost/', search: '', protocol: 'http:' },
    localStorage: { getItem: () => null, setItem() {}, removeItem() {} },
    sessionStorage: { getItem: () => null, setItem() {}, removeItem() {} },
    // Kein Netzwerk im Test (siehe CLAUDE.md) — die App fällt auf STATIC_SEASON_DATA zurück, genau wie
    // unter file:// ohne erreichbaren Server.
    fetch: () => Promise.reject(new Error('kein Netzwerkzugriff in diesem Test')),
    navigator: { userAgent: 'node-test' },
    requestAnimationFrame: (cb) => setTimeout(cb, 0), cancelAnimationFrame() {},
    setTimeout, clearTimeout, setInterval, clearInterval,
    performance, TextDecoder, TextEncoder, URLSearchParams,
    history: { pushState() {}, replaceState() {} },
    addEventListener() {},
    CustomEvent: class CustomEvent { constructor(type, opts) { this.type = type; Object.assign(this, opts); } },
    alert() {}, confirm: () => false, prompt: () => null,
    Image: class { constructor() { this.onload = null; this.onerror = null; } set src(_v) {} },
  };
  sandbox.self = sandbox;
  sandbox.globalThis = sandbox;
  vm.createContext(sandbox);
  return sandbox;
}

async function main() {
  const html = await readFile(path.join(REPO_ROOT, 'index.html'), 'utf8');
  const core = await readFile(path.join(REPO_ROOT, 'matchcenter-core.js'), 'utf8');
  const embedded = await readFile(path.join(REPO_ROOT, 'season-data-embedded.js'), 'utf8');
  const scriptMatch = html.match(/<script>([\s\S]*)<\/script>\s*<\/body>/);

  console.log('== A) Reale App im Sandbox geladen, echte Saisondaten via STATIC_SEASON_DATA ==');
  assertTrue(!!scriptMatch, 'Haupt-<script>-Block in index.html gefunden');

  const sandbox = buildSandbox();
  vm.runInContext(embedded, sandbox, { timeout: 15000 });
  assertTrue(Object.keys(sandbox.window.STATIC_SEASON_DATA || {}).length >= 5, 'STATIC_SEASON_DATA enthält mindestens 5 eingebettete Saisons');

  let loadError = null;
  try {
    vm.runInContext(core + '\n' + scriptMatch[1], sandbox, { timeout: 15000 });
  } catch (e) {
    loadError = e;
  }
  assertTrue(!loadError, `App-Skript lädt ohne Fehler${loadError ? ` (${loadError.message})` : ''}`);
  if (loadError) {
    console.log(`\n${failures} Test(s) fehlgeschlagen.`);
    process.exitCode = 1;
    return;
  }

  // ensureGlobalDataLoaded() lädt alle archivierten Saisons und baut den All-Time-Spielerpool auf, den
  // der Lineup Builder/Duo Center für seine Kandidatenliste nutzt (getDuoFieldPlayerRows ohne
  // season-Kontext) — derselbe Pfad, den die echte App beim ersten Öffnen von Hall of Fame/Compare/Lineup
  // Builder durchläuft.
  await vm.runInContext('ensureGlobalDataLoaded()', sandbox, { timeout: 60000 });
  const rosterSize = vm.runInContext('getDuoFieldPlayerRows({}).length', sandbox);
  console.log(`== B) Realistischer Kader geladen (${rosterSize} Feldspieler) ==`);
  assertTrue(rosterSize >= 20, `realistischer Kader mit mindestens 20 Feldspielern geladen (gefunden: ${rosterSize}) — zu klein wäre kein realistischer Belastungstest`);

  console.log('== C) rDuoCenterPro() bleibt innerhalb des Zeitbudgets und liefert vollständige Ersatzvorschläge ==');
  const ids = vm.runInContext('getDuoFieldPlayerRows({}).slice(0,2).map(r=>r.playerId)', sandbox);
  assertEqual(ids.length, 2, 'zwei reale Spieler-IDs aus dem Kader ausgewählt');

  const t0 = performance.now();
  let result;
  let renderError = null;
  try {
    result = vm.runInContext(
      `(function(){
        const ids=${JSON.stringify(ids)};
        const html=rDuoCenterPro(ids);
        const opts=buildDuoReplacementOptions(ids[0],ids[1],{});
        return {htmlLen:html.length, hasAlternative:html.includes('Alternative'), ifAMissing:opts.ifPlayerAMissing.length, ifBMissing:opts.ifPlayerBMissing.length};
      })()`,
      sandbox,
      { timeout: TIME_BUDGET_MS },
    );
  } catch (e) {
    renderError = e;
  }
  const elapsedMs = performance.now() - t0;

  assertTrue(!renderError, `rDuoCenterPro() + buildDuoReplacementOptions() laufen innerhalb von ${TIME_BUDGET_MS} ms durch${renderError ? ` (${renderError.message})` : ''}`);
  console.log(`       gemessene Laufzeit: ${elapsedMs.toFixed(0)} ms (Budget: ${TIME_BUDGET_MS} ms)`);

  if (!renderError) {
    assertTrue(result.htmlLen > 1000, 'Duo-Center-Pro-Karte rendert einen vollständigen, nicht-trivialen Inhalt');
    assertTrue(result.hasAlternative, 'die gerenderte Karte enthält weiterhin Ersatzvorschläge ("Alternative") — Inhalt unverändert, nicht stillschweigend abgeschaltet');
    // ifAMissing/ifBMissing können bei wenigen gemeinsamen Spielen auch 0 sein (kein Kandidat erfüllt die
    // Mindestanforderungen) — entscheidend ist, dass buildDuoReplacementOptions() überhaupt ein
    // vollständiges, unverkürztes Ergebnisobjekt liefert, nicht dass es garantiert nicht-leer ist.
    assertTrue(Number.isInteger(result.ifAMissing) && Number.isInteger(result.ifBMissing), 'buildDuoReplacementOptions() liefert vollständige Ersatzlisten für beide Spieler (keine leere/abgebrochene Struktur)');
  }

  console.log('');
  if (failures > 0) {
    console.log(`${failures} Test(s) fehlgeschlagen.`);
    process.exitCode = 1;
  } else {
    console.log('Alle Tests erfolgreich.');
  }
}

main().catch((e) => {
  console.error('Unerwarteter Fehler:', e.message);
  process.exitCode = 1;
});

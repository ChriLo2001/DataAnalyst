#!/usr/bin/env node
// Tests für scripts/build-index-map.mjs (Token-Diät Teil 1).
//
// Prüft die Erkennung (function-Deklarationen, window.-Zuweisungen, const-Pfeilfunktionen,
// CSS-Blöcke) an synthetischen Fixtures, Determinismus und dass der Dry-Run nichts schreibt.
// Läuft ohne externes Test-Framework (Projektkonvention), mit assert aus node:assert/strict.

import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, readFile, rm } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { buildIndexMap, main } from './build-index-map.mjs';

let passed = 0;
let failed = 0;
function check(name, fn) {
  try {
    fn();
    console.log('  ok  ', name);
    passed++;
  } catch (e) {
    console.log('  FAIL', name, '-', e.message);
    failed++;
  }
}
async function checkAsync(name, fn) {
  try {
    await fn();
    console.log('  ok  ', name);
    passed++;
  } catch (e) {
    console.log('  FAIL', name, '-', e.message);
    failed++;
  }
}

async function withFixture(scriptBody, styleBody, run) {
  const dir = await mkdtemp(path.join(os.tmpdir(), 'index-map-test-'));
  try {
    const html = [
      '<!doctype html><html><head>',
      '<style>',
      styleBody,
      '</style>',
      '</head><body>',
      '<script>',
      scriptBody,
      '</script>',
      '</body></html>',
    ].join('\n');
    await writeFile(path.join(dir, 'index.html'), html, 'utf8');
    await run(dir);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
}

const SAMPLE_SCRIPT = `
function simpleFn(a,b){
  return a+b;
}
function fnWithDefaultObjectParam(a,opts={}){
  const x=opts.foo||1;
  return x;
}
async function asyncFn(x){
  return x*2;
}
window.plainAlias=simpleFn;
window.arrowWindowFn=(a,b)=>{
  return a-b;
};
window.bareArrowWindowFn=x=>x+1;
window.functionExprWindowFn=function(x){
  return x;
};
const arrowConst=x=>{
  return x*3;
};
const bareIdentArrowConst=y=>y*4;
const dataObjectConst={
  a:1,
  b:2,
  nested:{c:3}
};
const dataArrayConst=[1,2,3];
function rendersTemplateWithInterpolation(items){
  return \`<div>\${items.map(i=>\`<span>\${i}</span>\`).join('')}</div>\`;
}
function withRegexContainingQuote(s){
  if(/\\b10\\s*(?:'|min)?\\b/.test(s))return true;
  return false;
}
`;

const SAMPLE_STYLE = `
.mc-story-frame{color:red}
.mc-story-card{color:blue}
.mc-feed-frame{color:green}
@keyframes spin{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}
body{margin:0}
`;

async function run() {
  console.log('== A) Erkennung: function-Deklarationen ==');
  await withFixture(SAMPLE_SCRIPT, SAMPLE_STYLE, async (dir) => {
    const map = await buildIndexMap(dir);
    const byName = (n) => map.functions.find((f) => f.name === n);

    check('einfache Funktion erkannt', () => {
      assert.ok(byName('simpleFn'), 'simpleFn nicht gefunden');
    });
    check('async-Funktion erkannt', () => {
      assert.ok(byName('asyncFn'), 'asyncFn nicht gefunden');
    });
    check('Funktion mit Default-Objekt-Parameter: Körper korrekt erkannt (nicht das Default-Objekt selbst)', () => {
      const e = byName('fnWithDefaultObjectParam');
      assert.ok(e, 'nicht gefunden');
      // Körper geht über 4 Zeilen (Signatur + 2 Zeilen Body + schließende "}"), nicht nur bis zum
      // Default-Parameter-"{}" in "opts={}" (das wäre 1 Zeile).
      assert.equal(e.endLine - e.startLine + 1, 4, `erwartet 4 Zeilen, war ${e.endLine - e.startLine + 1}`);
    });
    check('Funktionsbereich mit Template-Literal + verschachtelter Interpolation korrekt geschlossen', () => {
      const e = byName('rendersTemplateWithInterpolation');
      assert.ok(e, 'nicht gefunden');
      assert.equal(e.endLine - e.startLine + 1, 3, `erwartet 3 Zeilen, war ${e.endLine - e.startLine + 1}`);
    });
    check('Regex-Literal mit Anführungszeichen im Inneren verwirrt die String-Erkennung nicht', () => {
      const e = byName('withRegexContainingQuote');
      assert.ok(e, 'nicht gefunden');
      assert.equal(e.endLine - e.startLine + 1, 4, `erwartet 4 Zeilen, war ${e.endLine - e.startLine + 1}`);
    });
  });

  console.log('== B) Erkennung: window.-Zuweisungen ==');
  await withFixture(SAMPLE_SCRIPT, SAMPLE_STYLE, async (dir) => {
    const map = await buildIndexMap(dir);
    const byName = (n) => map.windowFns.find((f) => f.name === n);

    check('window.name=(...)=>{...} erkannt', () => {
      const e = byName('arrowWindowFn');
      assert.ok(e, 'nicht gefunden');
      assert.equal(e.endLine - e.startLine + 1, 3);
    });
    check('window.name=x=>x+1 (ohne Block) als Einzeiler erkannt', () => {
      const e = byName('bareArrowWindowFn');
      assert.ok(e, 'nicht gefunden');
      assert.equal(e.endLine, e.startLine);
    });
    check('window.name=function(...){...} erkannt', () => {
      const e = byName('functionExprWindowFn');
      assert.ok(e, 'nicht gefunden');
      assert.equal(e.endLine - e.startLine + 1, 3);
    });
    check('reine Alias-Zuweisung (window.name=anderesName;) wird NICHT als Funktion gezählt', () => {
      assert.equal(byName('plainAlias'), undefined);
    });
  });

  console.log('== C) Erkennung: const-Pfeilfunktionen ==');
  await withFixture(SAMPLE_SCRIPT, SAMPLE_STYLE, async (dir) => {
    const map = await buildIndexMap(dir);
    const byName = (n) => map.constArrows.find((f) => f.name === n);

    check('const name=(...)=>{...} erkannt', () => {
      const e = byName('arrowConst');
      assert.ok(e, 'nicht gefunden');
      assert.equal(e.endLine - e.startLine + 1, 3);
    });
    check('const name=x=>x*4 (Einzeiler, kein Block) erkannt', () => {
      const e = byName('bareIdentArrowConst');
      assert.ok(e, 'nicht gefunden');
      assert.equal(e.endLine, e.startLine);
    });
    check('reiner Daten-const (Objekt) wird NICHT als const-Pfeilfunktion gezählt', () => {
      assert.equal(byName('dataObjectConst'), undefined);
    });
    check('reiner Daten-const (Array) wird NICHT als const-Pfeilfunktion gezählt', () => {
      assert.equal(byName('dataArrayConst'), undefined);
    });
  });

  console.log('== D) Erkennung: CSS-Blöcke und @keyframes ==');
  await withFixture(SAMPLE_SCRIPT, SAMPLE_STYLE, async (dir) => {
    const map = await buildIndexMap(dir);
    check('aufeinanderfolgende .mc-story-* Regeln zu einer Gruppe zusammengefasst', () => {
      const g = map.cssGroups.find((x) => x.prefix === 'mc-story');
      assert.ok(g, 'mc-story-Gruppe nicht gefunden');
      assert.equal(g.ruleCount, 2, `erwartet 2 Regeln, war ${g.ruleCount}`);
    });
    check('.mc-feed-* bildet eine eigene, separate Gruppe (anderes Präfix)', () => {
      const g = map.cssGroups.find((x) => x.prefix === 'mc-feed');
      assert.ok(g, 'mc-feed-Gruppe nicht gefunden');
      assert.equal(g.ruleCount, 1);
    });
    check('@keyframes wird erkannt und nicht in eine CSS-Gruppe gemischt', () => {
      const k = map.keyframes.find((x) => x.name === 'spin');
      assert.ok(k, 'keyframes "spin" nicht gefunden');
      assert.ok(!map.cssGroups.some((g) => g.prefix === 'spin' || g.prefix === '@keyframes'));
    });
  });

  console.log('== E) Determinismus ==');
  await withFixture(SAMPLE_SCRIPT, SAMPLE_STYLE, async (dir) => {
    await checkAsync('zwei Läufe über dieselbe Datei liefern identisches Ergebnis', async () => {
      const a = await buildIndexMap(dir);
      const b = await buildIndexMap(dir);
      assert.deepEqual(a, b);
    });
  });

  console.log('== F) Dry-Run schreibt nichts, --write schreibt ==');
  await withFixture(SAMPLE_SCRIPT, SAMPLE_STYLE, async (dir) => {
    await mkdir(path.join(dir, 'docs'), { recursive: true });
    const outPath = path.join(dir, 'docs', 'index-map.md');
    let dryStdout = '';
    await checkAsync('Dry-Run (ohne --write) schreibt docs/index-map.md nicht', async () => {
      await main([], { stdout: { write: (s) => { dryStdout += s; } }, repoRoot: dir });
      await assert.rejects(readFile(outPath, 'utf8'));
    });
    check('Dry-Run-Ausgabe nennt Zähler', () => {
      assert.ok(/function/.test(dryStdout) && /window/.test(dryStdout));
    });
    await checkAsync('--write schreibt docs/index-map.md', async () => {
      await main(['--write'], { stdout: { write: () => {} }, repoRoot: dir });
      const content = await readFile(outPath, 'utf8');
      assert.ok(content.includes('# Code-Karte: index.html'));
      assert.ok(content.includes('simpleFn'));
    });
  });

  console.log();
  if (failed === 0) {
    console.log('Alle Tests erfolgreich.');
    return 0;
  }
  console.log(`${failed} Test(s) fehlgeschlagen.`);
  return 1;
}

run().then((code) => { process.exitCode = code; });

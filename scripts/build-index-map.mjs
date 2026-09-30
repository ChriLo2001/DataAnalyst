#!/usr/bin/env node
// Token-Diät Teil 1 — Code-Karte für index.html.
//
// index.html ist eine einzelne ~3,9-MB-Datei mit ca. 1300 Top-Level-Funktionen. Ein Phasenauftrag
// soll gezielt per Zeilenbereich lesen (siehe CLAUDE.md), statt die ganze Datei zu laden oder sich
// per Volltextsuche durchzutasten. Dieses Skript erzeugt dafür docs/index-map.md: alle Top-Level-
// Funktionsdeklarationen, window.-Zuweisungen von Funktionen, const-Pfeilfunktionen (jeweils mit
// Name, Startzeile, Zeilenanzahl), die CSS-Regelgruppen des statischen <style>-Blocks (nach
// Selektor-Präfix gruppiert), @keyframes-Animationen und die Zeilengrenzen großer Bereiche wie
// STATIC_SEASON_DATA.
//
// Erkennung ist regex-/klammertiefenbasiert (kein vollständiger JS-Parser) — für eine Navigations-
// Karte ausreichend, aber keine Garantie auf Vollständigkeit bei ungewöhnlichen Konstrukten (siehe
// Grenzen unten). Verifiziert wird die Erkennung selbst in scripts/test-build-index-map.mjs.
//
// Bekannte Grenzen (bewusste, dokumentierte Vereinfachungen, kein Bug):
//   - Nur TOP-LEVEL-Deklarationen (Spaltenposition 0) werden erfasst, keine verschachtelten
//     Funktionen/Closures — genau die Ebene, auf der man in dieser Datei typischerweise sucht.
//   - const-Pfeilfunktionen werden nur erkannt, wenn "=>" direkt (nach optionalem Parameter) auf
//     das Gleichheitszeichen folgt (`const f=x=>...`), nicht wenn die Pfeilfunktion Teil eines
//     Ausdrucks ist (`const SEASONS=Object.keys(...).reduce((acc,key)=>{...}`) — das ist dann kein
//     benannter Top-Level-Export, sondern ein Berechnungsschritt für einen Daten-const.
//   - window.NAME=... wird nur erfasst, wenn die rechte Seite selbst wie eine Funktion aussieht
//     (function/async/Pfeilfunktion), nicht bei reinen Alias-Zuweisungen wie
//     `window.STATIC_SEASON_DATA=STATIC_SEASON_DATA;`.
//   - CSS-Gruppierung fasst nur AUFEINANDERFOLGENDE Regeln mit gleichem Selektor-Präfix zusammen
//     (erstes Klassen-Segment, z. B. ".mc-story-frame" -> "mc-story"); das Präfix ist eine grobe
//     Heuristik, keine semantische Analyse.
//   - Nur der ERSTE, statische <style>-Block wird gescannt (vor dem ersten <script>-Tag) — später
//     per Template-Literal zur Laufzeit erzeugte <style>-Inhalte (z. B. für den Standbild-Export)
//     sind kein Teil des statischen Stylesheets und werden bewusst ausgelassen.
//
// Aufruf:
//   node scripts/build-index-map.mjs            # Dry-Run: Bericht auf stdout, schreibt nichts
//   node scripts/build-index-map.mjs --write     # schreibt docs/index-map.md

import { readFile, writeFile, rename } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const INDEX_HTML = path.join(REPO_ROOT, 'index.html');
const OUT_PATH = path.join(REPO_ROOT, 'docs', 'index-map.md');

/** Große, benannte Top-Level-Blöcke (Funktionen oder Daten-consts) werden zusätzlich als "große
 * Bereiche" ausgewiesen, wenn sie die Mindestzeilenzahl ODER die Mindest-Zeichenzahl erreichen —
 * Letzteres brauchte es für Blöcke wie STATIC_SEASON_DATA, die komplett auf einer einzigen,
 * extrem langen Zeile stehen (>2 Mio. Zeichen) und beim reinen Zeilenkriterium unsichtbar blieben. */
const LARGE_BLOCK_MIN_LINES = 30;
const LARGE_BLOCK_MIN_CHARS = 2000;

function isLargeBlock(lines, startIdx, endIdx) {
  if (endIdx - startIdx + 1 >= LARGE_BLOCK_MIN_LINES) return true;
  let total = 0;
  for (let i = startIdx; i <= endIdx; i++) { total += (lines[i]?.length ?? 0) + 1; if (total >= LARGE_BLOCK_MIN_CHARS) return true; }
  return false;
}

/** Zeichen, nach denen ein "/" mit hoher Wahrscheinlichkeit ein Regex-Literal einleitet statt
 * eine Division — die übliche Heuristik einfacher Tokenizer ohne vollen Ausdruckskontext. */
const REGEX_CONTEXT_CHARS = new Set('([{,;:=&|!?+-*%^~<>'.split(''));

const BRACKET_CLOSE_FOR = { '{': '}', '(': ')', '[': ']' };

/** Sucht, beginnend DIREKT NACH einer bereits bekannten, schon konsumierten `openChar`-Klammer
 * (Aufrufer übergibt `charIdx` = Position unmittelbar nach dem Öffner), Zeile und Spalte, an der
 * die passende `closeChar`-Klammer wieder auf den Ausgangsstand zurückführt.
 *
 * Verfolgt dazu einen generischen Klammer-Stack über ALLE drei Klammerarten `{`/`(`/`[` (nicht nur
 * openChar/closeChar selbst) — nötig, weil diese Datei durchgehend Render-Funktionen hat, deren
 * Körper aus verschachtelten Template-Literalen mit `${…}`-Interpolationen besteht, die ihrerseits
 * beliebigen Code (inklusive weiterer, verschachtelter Template-Literale) enthalten können. Eine
 * `${`-Interpolation wird dabei wie eine eigene Klammerebene behandelt: sie schaltet in den
 * Code-Zustand, und ihre schließende `}` schaltet gezielt zurück in den Template-Text-Zustand
 * (nicht in den normalen Code-Zustand) — sonst verwechselt ein einfacher Tiefenzähler Zeichen
 * INNERHALB von Template-Text (z. B. rohes `{`/`}` in eingebettetem HTML/CSS) mit echten
 * Code-Klammern, oder verliert bei verschachtelten Templates komplett die Synchronisation (beides
 * hat in einer früheren Version dieses Skripts falsche, um hunderte Zeilen zu lange Funktions-
 * bereiche erzeugt). String-Literale ('...", "...") und Kommentare (//, /* *\/) werden als reiner
 * Text behandelt. Regex-Literale (/.../ ) ebenso — siehe REGEX_CONTEXT_CHARS für die Heuristik, die
 * insbesondere Anführungszeichen INNERHALB eines Regex-Literals (z. B. /(?:'|x)/) nicht mit einem
 * echten String-Start verwechselt. */
function findMatchingClose(lines, lineIdx, charIdx, openChar, closeChar) {
  const stack = [{ close: closeChar, interp: false }];
  let state = 'code';
  let lastSignificant = '';
  let trailingWord = '';
  for (let li = lineIdx; li < lines.length; li++) {
    const line = lines[li];
    for (let ci = li === lineIdx ? charIdx : 0; ci < line.length; ci++) {
      const ch = line[ci];
      const next = line[ci + 1];
      if (state === 'code') {
        if (/[A-Za-z0-9_$]/.test(ch)) { trailingWord += ch; continue; }
        const wasReturn = trailingWord === 'return' || trailingWord === 'typeof';
        // Ein abgeschlossenes Wort/Zahl vor "/" bedeutet Division, nie Regex-Start (außer nach
        // "return"/"typeof") — lastSignificant darf hier NICHT den Operator von VOR dem Wort
        // weitertragen (sonst würde z. B. "font:12px/1.4" fälschlich als Regex-Start gelesen).
        if (trailingWord && !wasReturn) lastSignificant = 'A';
        trailingWord = '';
        if (ch === '/' && next === '/') break; // Rest der Zeile ist Kommentar
        if (ch === '/' && next === '*') { state = 'block-comment'; ci++; continue; }
        if (ch === "'") { state = 'string-single'; continue; }
        if (ch === '"') { state = 'string-double'; continue; }
        if (ch === '`') { state = 'template'; continue; }
        if (ch === '/' && (wasReturn || lastSignificant === '' || REGEX_CONTEXT_CHARS.has(lastSignificant))) {
          state = 'regex';
          continue;
        }
        if (ch === '{' || ch === '(' || ch === '[') { stack.push({ close: BRACKET_CLOSE_FOR[ch], interp: false }); lastSignificant = ch; continue; }
        if (ch === '}' || ch === ')' || ch === ']') {
          const top = stack[stack.length - 1];
          if (top && top.close === ch) {
            stack.pop();
            lastSignificant = ch;
            if (stack.length === 0) return { line: li, col: ci + 1 };
            if (top.interp) state = 'template';
          } else {
            lastSignificant = ch; // unerwartete/unbalancierte Klammer: ignorieren statt abzubrechen
          }
          continue;
        }
        if (!/\s/.test(ch)) lastSignificant = ch;
        continue;
      }
      if (state === 'block-comment') {
        if (ch === '*' && next === '/') { state = 'code'; ci++; }
      } else if (state === 'string-single') {
        if (ch === '\\') { ci++; continue; }
        if (ch === "'") { state = 'code'; lastSignificant = "'"; }
      } else if (state === 'string-double') {
        if (ch === '\\') { ci++; continue; }
        if (ch === '"') { state = 'code'; lastSignificant = '"'; }
      } else if (state === 'template') {
        if (ch === '\\') { ci++; continue; }
        if (ch === '`') { state = 'code'; lastSignificant = '`'; continue; }
        if (ch === '$' && next === '{') { stack.push({ close: '}', interp: true }); state = 'code'; ci++; continue; }
      } else if (state === 'regex') {
        if (ch === '\\') { ci++; continue; }
        if (ch === '[') { state = 'regex-class'; continue; }
        if (ch === '/') {
          state = 'code'; lastSignificant = '/';
          while (ci + 1 < line.length && /[a-z]/i.test(line[ci + 1])) ci++;
        }
      } else if (state === 'regex-class') {
        if (ch === '\\') { ci++; continue; }
        if (ch === ']') state = 'regex';
      }
    }
  }
  return { line: lines.length - 1, col: 0 };
}

/** Bequemlichkeits-Wrapper für Aufrufer, die nur die Endzeile brauchen (CSS-Regeln, @keyframes,
 * Daten-consts ohne Parameterliste). */
function findBlockEndLine(lines, lineIdx, charIdx, openChar, closeChar) {
  return findMatchingClose(lines, lineIdx, charIdx, openChar, closeChar).line;
}

/** Für Funktions-/Pfeilfunktions-Signaturen: findet die öffnende "{" des FUNKTIONSKÖRPERS, nicht
 * die erste "{" irgendwo in der Zeile — eine Default-Parameter-Objektliteral wie
 * `function f(a,b={}){` hat sonst schon vor der Parameterliste ein scheinbar passendes "{}"-Paar
 * (hier: in `={}`), das die erste naive "indexOf('{')"-Suche fälschlich als Funktionskörper läse.
 * Überspringt deshalb zuerst die Parameterliste "(...)" (klammertiefenbewusst) und sucht erst
 * danach nach der echten Körper-"{". `parenCol` ist die Spalte der öffnenden Parameterklammer "(". */
function findFunctionBodyBrace(lines, lineIdx, parenCol) {
  const afterParens = findMatchingClose(lines, lineIdx, parenCol + 1, '(', ')');
  for (let li = afterParens.line; li < lines.length; li++) {
    const line = lines[li];
    for (let ci = li === afterParens.line ? afterParens.col : 0; ci < line.length; ci++) {
      if (line[ci] === '{') return { line: li, col: ci };
    }
  }
  return null;
}

const RE_FUNCTION = /^(async\s+)?function\s+([A-Za-z_$][\w$]*)\s*\(/;
const RE_WINDOW_FN = /^window\.([A-Za-z_$][\w$]*)\s*=\s*(async\s*)?(\(|function\b|[A-Za-z_$][\w$]*\s*=>)/;
const RE_CONST_ARROW = /^const\s+([A-Za-z_$][\w$]*)\s*=\s*(async\s*)?(\([^)]*\)|[A-Za-z_$][\w$]*)\s*=>/;
const RE_CONST_ANY = /^const\s+([A-Za-z_$][\w$]*)\s*=/;

/** Scannt den übergebenen Zeilenbereich (0-basiert, exklusiv `endIdx`) des <script>-Inhalts nach
 * Top-Level-Deklarationen. `lineOffset` rechnet Script-relative Zeilen auf index.html-Zeilen um. */
function scanScript(lines, lineOffset) {
  const functions = [];
  const windowFns = [];
  const constArrows = [];
  const largeBlocks = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    let m = RE_FUNCTION.exec(line);
    if (m) {
      const name = m[2];
      const parenCol = m[0].length - 1; // m[0] endet exakt auf "(" (siehe RE_FUNCTION)
      const bodyBrace = findFunctionBodyBrace(lines, i, parenCol);
      const endIdx = bodyBrace ? findBlockEndLine(lines, bodyBrace.line, bodyBrace.col + 1, '{', '}') : i;
      const entry = { name, kind: 'function', startLine: i + lineOffset, endLine: endIdx + lineOffset };
      functions.push(entry);
      if (isLargeBlock(lines, i, endIdx)) largeBlocks.push(entry);
      continue;
    }

    m = RE_WINDOW_FN.exec(line);
    if (m) {
      const name = m[1];
      let endIdx = i;
      if (m[3] === '(') {
        // window.name=(...)=>{...} — Parameterliste überspringen, dann Körper-"{" suchen.
        const parenCol = m[0].length - 1;
        const bodyBrace = findFunctionBodyBrace(lines, i, parenCol);
        if (bodyBrace) endIdx = findBlockEndLine(lines, bodyBrace.line, bodyBrace.col + 1, '{', '}');
      } else if (m[3] && m[3].startsWith('function')) {
        // window.name=function(...){...} (benannt oder anonym) — "(" nach "function" suchen.
        const parenCol = line.indexOf('(', m.index + m[0].length - m[3].length + 'function'.length);
        if (parenCol !== -1) {
          const bodyBrace = findFunctionBodyBrace(lines, i, parenCol);
          if (bodyBrace) endIdx = findBlockEndLine(lines, bodyBrace.line, bodyBrace.col + 1, '{', '}');
        }
      } else {
        // window.name=ident=>... (kein Klammer-Parameter) — ggf. direkt folgende "{" als Körper.
        const braceCol = line.indexOf('{', m[0].length - 1);
        if (braceCol !== -1) endIdx = findBlockEndLine(lines, i, braceCol + 1, '{', '}');
      }
      const entry = { name, kind: 'window', startLine: i + lineOffset, endLine: endIdx + lineOffset };
      windowFns.push(entry);
      if (isLargeBlock(lines, i, endIdx)) largeBlocks.push(entry);
      continue;
    }

    m = RE_CONST_ARROW.exec(line);
    if (m) {
      const name = m[1];
      let endIdx = i;
      if (m[3] && m[3].startsWith('(')) {
        const parenCol = line.indexOf('(', m.index);
        const bodyBrace = findFunctionBodyBrace(lines, i, parenCol);
        if (bodyBrace) endIdx = findBlockEndLine(lines, bodyBrace.line, bodyBrace.col + 1, '{', '}');
      } else {
        const braceCol = line.indexOf('{', m[0].length - 1);
        if (braceCol !== -1) endIdx = findBlockEndLine(lines, i, braceCol + 1, '{', '}');
      }
      const entry = { name, kind: 'const-arrow', startLine: i + lineOffset, endLine: endIdx + lineOffset };
      constArrows.push(entry);
      if (isLargeBlock(lines, i, endIdx)) largeBlocks.push(entry);
      continue;
    }

    // Große Daten-consts (kein Pfeilfunktions-Start): nur für die "große Bereiche"-Liste, nicht
    // Teil der Funktionsregister. Endet je nachdem, ob die erste öffnende Klammer "{" oder "[" ist.
    m = RE_CONST_ANY.exec(line);
    if (m && !RE_CONST_ARROW.test(line)) {
      const name = m[1];
      const rest = line.slice(m[0].length);
      const firstBraceRel = rest.search(/[{[]/);
      if (firstBraceRel !== -1) {
        const openChar = rest[firstBraceRel];
        const closeChar = openChar === '{' ? '}' : ']';
        const col = m[0].length + firstBraceRel;
        const endIdx = findBlockEndLine(lines, i, col + 1, openChar, closeChar);
        if (isLargeBlock(lines, i, endIdx)) {
          largeBlocks.push({ name, kind: 'const-data', startLine: i + lineOffset, endLine: endIdx + lineOffset });
        }
      }
    }
  }

  return { functions, windowFns, constArrows, largeBlocks };
}

/** Grobe Präfix-Heuristik für eine CSS-Selektorzeile: erstes Klassen-Token bis zum zweiten
 * Bindestrich-Segment (".mc-story-frame" -> "mc-story"), sonst das erste Token roh
 * (z. B. "@media", ":root", "body"). */
function cssPrefixFor(selectorLine) {
  const trimmed = selectorLine.trim();
  const classMatch = /^\.([a-zA-Z0-9_-]+)/.exec(trimmed);
  if (classMatch) {
    const parts = classMatch[1].split('-');
    return parts.slice(0, 2).join('-');
  }
  const firstToken = /^([^\s{,]+)/.exec(trimmed);
  return firstToken ? firstToken[1] : trimmed.slice(0, 20);
}

/** Scannt den statischen <style>-Block nach CSS-Regeln (inkl. @keyframes separat) und gruppiert
 * aufeinanderfolgende Regeln mit gleichem Präfix. */
function scanStyleBlock(lines, lineOffset) {
  const cssGroups = [];
  const keyframes = [];
  let currentGroup = null;

  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();
    if (!trimmed) { i++; continue; }

    const kfMatch = /^@keyframes\s+([\w-]+)/.exec(trimmed);
    if (kfMatch) {
      const braceCol = line.indexOf('{');
      const endIdx = braceCol === -1 ? i : findBlockEndLine(lines, i, braceCol + 1, '{', '}');
      keyframes.push({ name: kfMatch[1], startLine: i + lineOffset, endLine: endIdx + lineOffset });
      currentGroup = null;
      i = endIdx + 1;
      continue;
    }

    const braceCol = line.indexOf('{');
    if (braceCol === -1) { i++; continue; } // z. B. eine :root-Variablendeklaration ohne eigene Regel in dieser Zeile
    const endIdx = findBlockEndLine(lines, i, braceCol + 1, '{', '}');
    const prefix = cssPrefixFor(line.slice(0, braceCol));

    if (currentGroup && currentGroup.prefix === prefix && currentGroup.endLine === i - 1 + lineOffset) {
      currentGroup.endLine = endIdx + lineOffset;
      currentGroup.ruleCount++;
    } else {
      currentGroup = { prefix, startLine: i + lineOffset, endLine: endIdx + lineOffset, ruleCount: 1 };
      cssGroups.push(currentGroup);
    }
    i = endIdx + 1;
  }

  return { cssGroups, keyframes };
}

export async function buildIndexMap(repoRoot = REPO_ROOT) {
  const html = await readFile(path.join(repoRoot, 'index.html'), 'utf8');
  const lines = html.split('\n');

  const styleOpenIdx = lines.findIndex((l) => l.trim() === '<style>');
  const styleCloseIdx = lines.findIndex((l, idx) => idx > styleOpenIdx && l.trim() === '</style>');
  const scriptOpenIdx = lines.findIndex((l) => l.trim() === '<script>');
  const scriptCloseIdx = lines.findIndex((l, idx) => idx > scriptOpenIdx && l.trim() === '</script>');

  if (styleOpenIdx === -1 || styleCloseIdx === -1) throw new Error('Statischer <style>-Block nicht gefunden.');
  if (scriptOpenIdx === -1 || scriptCloseIdx === -1) throw new Error('Haupt-<script>-Block nicht gefunden.');

  const styleLines = lines.slice(styleOpenIdx + 1, styleCloseIdx);
  const { cssGroups, keyframes } = scanStyleBlock(styleLines, styleOpenIdx + 1 + 1);

  const scriptLines = lines.slice(scriptOpenIdx + 1, scriptCloseIdx);
  const { functions, windowFns, constArrows, largeBlocks } = scanScript(scriptLines, scriptOpenIdx + 1 + 1);

  return {
    totalLines: lines.length,
    styleRange: { start: styleOpenIdx + 1, end: styleCloseIdx + 1 },
    scriptRange: { start: scriptOpenIdx + 1, end: scriptCloseIdx + 1 },
    functions,
    windowFns,
    constArrows,
    largeBlocks: largeBlocks.sort((a, b) => a.startLine - b.startLine),
    cssGroups,
    keyframes,
  };
}

function lineCount(entry) { return entry.endLine - entry.startLine + 1; }

function formatReport(map) {
  const lines = [];
  lines.push('# Code-Karte: index.html');
  lines.push('');
  lines.push(`Automatisch erzeugt von \`scripts/build-index-map.mjs\`. Nicht von Hand bearbeiten — bei Änderungen an index.html erneut ausführen: \`node scripts/build-index-map.mjs --write\`.`);
  lines.push('');
  lines.push(`index.html: ${map.totalLines} Zeilen gesamt. Statischer \`<style>\`-Block: Zeile ${map.styleRange.start}–${map.styleRange.end}. Haupt-\`<script>\`-Block: Zeile ${map.scriptRange.start}–${map.scriptRange.end}.`);
  lines.push('');
  lines.push(`**Leseregel (siehe CLAUDE.md):** index.html nie vollständig laden. Diese Karte nennen, den gesuchten Namen im Register unten finden, dann nur den genannten Zeilenbereich lesen.`);
  lines.push('');

  const allEntries = [
    ...map.functions,
    ...map.windowFns,
    ...map.constArrows,
  ].sort((a, b) => a.startLine - b.startLine);

  lines.push('## Große Bereiche');
  lines.push('');
  lines.push(`Top-Level-Blöcke (Funktionen oder Daten-consts) ab ${LARGE_BLOCK_MIN_LINES} Zeilen oder ${LARGE_BLOCK_MIN_CHARS} Zeichen, u. a. \`STATIC_SEASON_DATA\`:`);
  lines.push('');
  lines.push('| Name | Art | Zeile | Zeilen |');
  lines.push('|---|---|---|---|');
  for (const e of map.largeBlocks) {
    lines.push(`| \`${e.name}\` | ${e.kind} | ${e.startLine}–${e.endLine} | ${lineCount(e)} |`);
  }
  lines.push('');

  lines.push('## CSS-Regelgruppen');
  lines.push('');
  lines.push(`Aufeinanderfolgende Regeln mit gleichem Selektor-Präfix, innerhalb des statischen \`<style>\`-Blocks (Zeile ${map.styleRange.start}–${map.styleRange.end}):`);
  lines.push('');
  lines.push('| Präfix | Zeile | Regeln |');
  lines.push('|---|---|---|');
  for (const g of map.cssGroups) {
    lines.push(`| \`${g.prefix}\` | ${g.startLine}–${g.endLine} | ${g.ruleCount} |`);
  }
  lines.push('');

  lines.push('## @keyframes');
  lines.push('');
  lines.push('| Name | Zeile |');
  lines.push('|---|---|');
  for (const k of map.keyframes) {
    lines.push(`| \`${k.name}\` | ${k.startLine}–${k.endLine} |`);
  }
  lines.push('');

  lines.push('## Funktionen, window.-Zuweisungen und const-Pfeilfunktionen (nach Zeile)');
  lines.push('');
  lines.push(`${map.functions.length} \`function\`-Deklarationen, ${map.windowFns.length} \`window.\`-Funktionszuweisungen, ${map.constArrows.length} \`const\`-Pfeilfunktionen — alle Top-Level, sortiert nach Zeile.`);
  lines.push('');
  lines.push('| Name | Art | Zeile | Zeilen |');
  lines.push('|---|---|---|---|');
  for (const e of allEntries) {
    lines.push(`| \`${e.name}\` | ${e.kind} | ${e.startLine}–${e.endLine} | ${lineCount(e)} |`);
  }
  lines.push('');

  lines.push('## Alphabetisches Register');
  lines.push('');
  lines.push('| Name | Art | Zeile |');
  lines.push('|---|---|---|');
  const alpha = [...allEntries].sort((a, b) => a.name.localeCompare(b.name) || a.startLine - b.startLine);
  for (const e of alpha) {
    lines.push(`| \`${e.name}\` | ${e.kind} | ${e.startLine} |`);
  }
  lines.push('');

  return lines.join('\n');
}

async function writeFileAtomic(filePath, content) {
  const tmpPath = `${filePath}.tmp-${process.pid}`;
  await writeFile(tmpPath, content, 'utf8');
  await rename(tmpPath, filePath);
}

export async function main(argv = process.argv.slice(2), { stdout = process.stdout, repoRoot = REPO_ROOT } = {}) {
  const write = argv.includes('--write');
  const map = await buildIndexMap(repoRoot);
  const report = formatReport(map);
  if (!write) {
    stdout.write(
      `Dry-Run: docs/index-map.md würde geschrieben (${report.length} Zeichen). ` +
      `${map.functions.length} function, ${map.windowFns.length} window.-Funktionen, ` +
      `${map.constArrows.length} const-Pfeilfunktionen, ${map.cssGroups.length} CSS-Gruppen, ` +
      `${map.keyframes.length} @keyframes, ${map.largeBlocks.length} große Bereiche.\n` +
      `Zum Schreiben: node scripts/build-index-map.mjs --write\n`
    );
    return 0;
  }
  await writeFileAtomic(path.join(repoRoot, 'docs', 'index-map.md'), report);
  stdout.write(`docs/index-map.md geschrieben (${report.length} Zeichen).\n`);
  return 0;
}

if (/(^|\/)build-index-map\.mjs$/.test(process.argv[1]?.replace(/\\/g, '/') ?? '')) {
  main().then((code) => { process.exitCode = code; });
}

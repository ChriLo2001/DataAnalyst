#!/usr/bin/env node
// Vollständigkeitsnachweis für den Spezifikations-Split (Token-Diät Teil 1).
//
// Prüft zwei unabhängige Dinge gegen den alten Stand der ursprünglichen Gesamtdatei
// docs/liga-analytics-spezifikation.md (aus der Git-Historie, siehe loadOldContent()):
//   1. Jede Überschrift (# bis ######) der alten Datei kommt in genau einer neuen Datei
//      unter docs/spec/ vor (exakt gleicher Text und gleiche Ebene).
//   2. Kein Textabsatz ist verloren gegangen: jeder normalisierte Absatz der alten Datei
//      (zusammenhängender Block nicht-leerer Zeilen, reine "---"-Trennlinien ausgenommen)
//      taucht als normalisierter Absatz irgendwo in den neuen Dateien wieder auf.
//
// Absätze werden normalisiert (Leerraum vereinheitlicht, getrimmt), damit Zeilenumbrüche
// innerhalb eines Blocks und die neu hinzugefügten Dateiköpfe/Querverweise den Vergleich
// nicht stören. Neu hinzugefügte Überschriften (Dateititel, "Siehe auch") werden nicht
// gegen die alte Datei geprüft — nur Vollständigkeit in eine Richtung (alt -> neu) zählt.
//
// Aufruf:
//   node scripts/check-spec-split.mjs              # Bericht auf stdout, Exit 0/1
//   node scripts/check-spec-split.mjs --old <rev>   # alten Stand aus anderem Commit/Pfad lesen

import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OLD_PATH = 'docs/liga-analytics-spezifikation.md';
const NEW_DIR = path.join(REPO_ROOT, 'docs', 'spec');

// Explizit erlaubte Ausnahmen von der Absatz-Vollständigkeit: Text, der sich zwangsläufig
// ändern MUSS, weil er einen Dateipfad nennt, der durch den Split nicht mehr stimmt (das
// ursprüngliche "Ablage im Repo"-Frontmatter). Das ist die in den Split-Regeln vorgesehene
// "Dateikopf"-Ausnahme, kein Datenverlust — jede andere Absatz-Abweichung bleibt ein Fehler.
const ALLOWED_CHANGED_PARAGRAPHS = [
  '**Status:** Entwurf zur Umsetzung **Ablage im Repo:** `docs/liga-analytics-spezifikation.md` **Zielgruppe:** Umsetzung mit Claude Code',
];

function git(args) {
  return execFileSync('git', args, { cwd: REPO_ROOT, encoding: 'utf8' });
}

/** Lädt den alten Stand der Gesamtdatei: von der Kommandozeile (--old <rev>), sonst von der
 * Festplatte (falls die Datei noch existiert), sonst aus der Git-Historie (letzter Commit vor
 * ihrer Löschung). */
async function loadOldContent(argv) {
  const idx = argv.indexOf('--old');
  if (idx !== -1 && argv[idx + 1]) {
    return git(['show', `${argv[idx + 1]}:${OLD_PATH}`]);
  }
  try {
    return await readFile(path.join(REPO_ROOT, OLD_PATH), 'utf8');
  } catch (e) {
    if (e.code !== 'ENOENT') throw e;
  }
  const lastTouch = git(['log', '-1', '--format=%H', '--', OLD_PATH]).trim();
  if (!lastTouch) throw new Error(`Kein Git-Verlauf für ${OLD_PATH} gefunden — Datei nie committet?`);
  return git(['show', `${lastTouch}^:${OLD_PATH}`]);
}

async function listNewFiles() {
  const out = [];
  async function walk(dir) {
    for (const entry of await readdir(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) await walk(full);
      else if (entry.name.endsWith('.md')) out.push(full);
    }
  }
  await walk(NEW_DIR);
  return out.sort();
}

function extractHeadings(text) {
  const headings = [];
  for (const line of text.split('\n')) {
    const m = /^(#{1,6})\s+(.*?)\s*$/.exec(line);
    if (m) headings.push({ level: m[1].length, text: m[2].trim() });
  }
  return headings;
}

function normalizeParagraph(block) {
  return block.replace(/\s+/g, ' ').trim();
}

/** Zerlegt Text in Absätze: zusammenhängende Blöcke nicht-leerer Zeilen. Reine
 * Trennlinien-Absätze ("---", "===") werden verworfen — sie sind Struktur-Deko ohne eigenen
 * Inhalt, deren Position sich durch den Split zwangsläufig ändert (siehe Skript-Kopf). */
function extractParagraphs(text) {
  const paragraphs = [];
  let current = [];
  const flush = () => {
    if (current.length) {
      const norm = normalizeParagraph(current.join('\n'));
      if (norm && !/^[-=]{3,}$/.test(norm)) paragraphs.push(norm);
      current = [];
    }
  };
  for (const line of text.split('\n')) {
    if (line.trim() === '') flush();
    else current.push(line);
  }
  flush();
  return paragraphs;
}

async function main(argv = process.argv.slice(2)) {
  const oldContent = await loadOldContent(argv);
  const newFiles = await listNewFiles();
  if (!newFiles.length) {
    console.error('Keine Dateien unter docs/spec/ gefunden — wurde der Split schon durchgeführt?');
    return 1;
  }
  const newContents = await Promise.all(newFiles.map((f) => readFile(f, 'utf8')));

  // 1) Überschriften-Vollständigkeit
  const oldHeadings = extractHeadings(oldContent);
  const headingLocations = new Map(); // "level|text" -> [relFile,...]
  newFiles.forEach((file, i) => {
    for (const h of extractHeadings(newContents[i])) {
      const key = `${h.level}|${h.text}`;
      const rel = path.relative(REPO_ROOT, file).replace(/\\/g, '/');
      if (!headingLocations.has(key)) headingLocations.set(key, []);
      headingLocations.get(key).push(rel);
    }
  });
  const missingHeadings = [];
  const duplicateHeadings = [];
  for (const h of oldHeadings) {
    const key = `${h.level}|${h.text}`;
    const locs = headingLocations.get(key) || [];
    if (locs.length === 0) missingHeadings.push(h);
    else if (locs.length > 1) duplicateHeadings.push({ ...h, locs });
  }

  // 2) Absatz-Vollständigkeit (normalisierte Hashes, hier als reiner String-Vergleich,
  // da die Textmenge klein genug ist, dass ein echter Hash keinen Vorteil bringt).
  const oldParagraphs = extractParagraphs(oldContent);
  const newParagraphSet = new Set();
  newContents.forEach((c) => { for (const p of extractParagraphs(c)) newParagraphSet.add(p); });
  const allowedSet = new Set(ALLOWED_CHANGED_PARAGRAPHS);
  const lostParagraphs = oldParagraphs.filter((p) => !newParagraphSet.has(p) && !allowedSet.has(p));
  const allowedUsed = oldParagraphs.filter((p) => allowedSet.has(p) && !newParagraphSet.has(p));

  // Bericht
  const lines = [];
  lines.push('Vollständigkeitsnachweis: Spezifikations-Split');
  lines.push(`Alte Datei: ${oldHeadings.length} Überschriften, ${oldParagraphs.length} Absätze (normalisiert).`);
  lines.push(`Neue Dateien: ${newFiles.length} (unter docs/spec/).`);
  lines.push('');
  if (missingHeadings.length === 0 && duplicateHeadings.length === 0) {
    lines.push(`ok   Jede Überschrift der alten Datei kommt in genau einer neuen Datei vor (${oldHeadings.length}/${oldHeadings.length}).`);
  } else {
    if (missingHeadings.length) {
      lines.push(`FEHLER  ${missingHeadings.length} Überschrift(en) fehlen in den neuen Dateien:`);
      for (const h of missingHeadings) lines.push(`   · ${'#'.repeat(h.level)} ${h.text}`);
    }
    if (duplicateHeadings.length) {
      lines.push(`FEHLER  ${duplicateHeadings.length} Überschrift(en) kommen mehrfach vor:`);
      for (const h of duplicateHeadings) lines.push(`   · ${'#'.repeat(h.level)} ${h.text}  (in: ${h.locs.join(', ')})`);
    }
  }
  lines.push('');
  if (lostParagraphs.length === 0) {
    const note = allowedUsed.length ? ` (${allowedUsed.length} davon als dokumentierte Dateikopf-Ausnahme erlaubt geändert, siehe ALLOWED_CHANGED_PARAGRAPHS im Skript)` : '';
    lines.push(`ok   Kein Textabsatz verloren (${oldParagraphs.length - allowedUsed.length}/${oldParagraphs.length - allowedUsed.length} Absätze unverändert wiedergefunden${note}).`);
  } else {
    lines.push(`FEHLER  ${lostParagraphs.length} Absatz/Absätze der alten Datei fehlen in den neuen Dateien:`);
    for (const p of lostParagraphs.slice(0, 20)) lines.push(`   · ${p.slice(0, 140)}${p.length > 140 ? '…' : ''}`);
    if (lostParagraphs.length > 20) lines.push(`   … und ${lostParagraphs.length - 20} weitere.`);
  }

  const ok = missingHeadings.length === 0 && duplicateHeadings.length === 0 && lostParagraphs.length === 0;
  lines.push('');
  lines.push(ok ? 'Vollständigkeitsnachweis bestanden.' : 'Vollständigkeitsnachweis NICHT bestanden.');
  console.log(lines.join('\n'));
  return ok ? 0 : 1;
}

if (/(^|\/)check-spec-split\.mjs$/.test(process.argv[1]?.replace(/\\/g, '/') ?? '')) {
  main().then((code) => { process.exitCode = code; });
}

export { extractHeadings, extractParagraphs, normalizeParagraph, loadOldContent, listNewFiles };

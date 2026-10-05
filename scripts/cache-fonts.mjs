#!/usr/bin/env node
// S2e — Renderer-Werkstatt, Aufgabe 1 (Schriftfrage). Lokaler Font-Cache für assets/fonts/*.woff2.
//
// WARUM: index.html band Syne/DM Mono/Inter bisher per @import eines Google-Fonts-Stylesheets ein
// (https://fonts.googleapis.com/css2?...) — ein Netzwerkzugriff bei JEDEM Seitenaufruf, der unter file://
// (kein Netz) oder bei einer Blockade NIE eine Schrift lädt. Canvas2D fällt dann still auf die
// Browser-Standardschrift zurück (ctx.font ohne passende geladene Schriftart), ohne Fehler — sichtbar erst im
// exportierten Bild. Dieses Skript lädt die vier tatsächlich benötigten Schriftdateien EINMALIG herunter,
// nur mit explizitem Flag --fetch; ohne das Flag ist es rein lesend. Die Deklaration selbst liegt danach in
// social-video-fonts.css (ein einziges @font-face-Blatt, von index.html UND social-video-lab.html geladen —
// nicht zwei eigene Deklarationen) und referenziert die lokalen Dateien per relativem Pfad. Das funktioniert
// unter file:// genauso wie unter scripts/serve.mjs: anders als Bilder, die auf einem Canvas gezeichnet werden
// (siehe scripts/cache-team-logos.mjs, Canvas-Taint-Problem), unterliegen Schriftdateien keiner
// Same-Origin-Einschränkung beim Zeichnen — eine lokale @font-face-Datei muss deshalb NICHT als data:-URI
// eingebettet werden.
//
// QUELLEN (einmalig per `curl` gegen https://fonts.googleapis.com/css2?... geprüft, siehe URLS unten):
// Syne und Inter liefert Google Fonts (Stand API v20/v24) für ALLE abgefragten Schnitte (Syne 400-800,
// Inter 400-900) jeweils dieselbe Binärdatei aus — beide Familien haben auf Google Fonts aktuell nur EINEN
// echten statischen Schnitt, keine separaten Dateien je Gewicht (geprüft: identische Antwort-URL für jeden
// abgefragten wght-Wert). DM Mono hat zwei echte, unterschiedliche Schnitte (400/500). Die lokalen
// @font-face-Regeln (social-video-fonts.css) decken deshalb für Syne/Inter eine Gewichtsspanne ab, die exakt
// die eine vorhandene Datei trifft, unabhängig vom angefragten font-weight.
//
// Ohne --fetch: rein lesend, listet vorhandene/fehlende Dateien, schreibt nichts.
// Mit --fetch: lädt NUR fehlende Dateien (nie ohne --force überschreiben), schreibt AUSSCHLIESSLICH nach
// assets/fonts/. Atomares Schreiben (Temp-Datei + rename), wie an anderer Stelle im Projekt üblich.
//
// Aufruf:
//   node scripts/cache-fonts.mjs            # Dry-Run: listet vorhandene/fehlende Dateien
//   node scripts/cache-fonts.mjs --fetch     # lädt fehlende Dateien herunter
//   node scripts/cache-fonts.mjs --fetch --force  # überschreibt auch vorhandene Dateien

import { readFile, mkdir, writeFile, rename, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// Latin-Subset-URLs, per `curl -A "Mozilla/5.0 ... Chrome/120.0" https://fonts.googleapis.com/css2?family=...`
// ermittelt (siehe Kopfkommentar). Dieselbe U+0000-00FF-Unicode-Range wie der bisherige @import (kein
// zusätzliches Alphabet nötig — deutsche Umlaute liegen in diesem Bereich).
const FONTS = [
  { file: 'dm-mono-400.woff2', url: 'https://fonts.gstatic.com/s/dmmono/v16/aFTU7PB1QTsUX8KYthqQBA.woff2', family: 'DM Mono', weight: '400' },
  { file: 'dm-mono-500.woff2', url: 'https://fonts.gstatic.com/s/dmmono/v16/aFTR7PB1QTsUX8KYvumzEYOtbQ.woff2', family: 'DM Mono', weight: '500' },
  { file: 'inter.woff2', url: 'https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa1ZL7.woff2', family: 'Inter', weight: '400 900 (eine Datei für alle Schnitte, siehe Kopfkommentar)' },
  { file: 'syne.woff2', url: 'https://fonts.gstatic.com/s/syne/v24/8vIH7w4qzmVxm2BL9A.woff2', family: 'Syne', weight: '400 900 (eine Datei für alle Schnitte, siehe Kopfkommentar)' },
];

async function writeFileAtomic(filePath, buffer) {
  await mkdir(path.dirname(filePath), { recursive: true });
  const tmpPath = `${filePath}.tmp-${process.pid}`;
  await writeFile(tmpPath, buffer);
  await rename(tmpPath, filePath);
}

async function fetchFont(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

async function existingFiles(repoRoot) {
  const dir = path.join(repoRoot, 'assets', 'fonts');
  const existing = new Set();
  for (const f of FONTS) {
    try { await stat(path.join(dir, f.file)); existing.add(f.file); } catch { /* fehlt */ }
  }
  return existing;
}

function parseArgs(argv) {
  return { fetch: argv.includes('--fetch'), force: argv.includes('--force') };
}

export async function main(argv = process.argv.slice(2), { stdout = process.stdout, repoRoot = REPO_ROOT } = {}) {
  const args = parseArgs(argv);
  const existing = await existingFiles(repoRoot);
  if (!args.fetch) {
    const lines = ['Font-Cache (assets/fonts/) — Dry-Run, es wird nichts geschrieben'];
    for (const f of FONTS) lines.push(`   · ${f.file}  (${f.family} ${f.weight})  ${existing.has(f.file) ? 'vorhanden' : 'fehlt'}`);
    stdout.write(lines.join('\n') + '\n');
    return 0;
  }
  const targets = args.force ? FONTS : FONTS.filter((f) => !existing.has(f.file));
  const loaded = [];
  const failed = [];
  for (const f of targets) {
    try {
      const buf = await fetchFont(f.url);
      await writeFileAtomic(path.join(repoRoot, 'assets', 'fonts', f.file), buf);
      loaded.push({ ...f, bytes: buf.length });
    } catch (e) {
      failed.push({ ...f, reason: e.message });
    }
  }
  const skipped = args.force ? [] : FONTS.filter((f) => existing.has(f.file));
  const lines = [`Font-Cache: ${loaded.length} geladen, ${skipped.length} bereits vorhanden (übersprungen), ${failed.length} fehlgeschlagen.`];
  for (const f of loaded) lines.push(`   · ${f.file}  (${f.bytes} Bytes)`);
  for (const f of failed) lines.push(`   · FEHLER ${f.file}: ${f.reason}`);
  stdout.write(lines.join('\n') + '\n');
  return failed.length ? 1 : 0;
}

if (/(^|\/)cache-fonts\.mjs$/.test(process.argv[1]?.replace(/\\/g, '/') ?? '')) {
  main().then((code) => { process.exitCode = code; });
}

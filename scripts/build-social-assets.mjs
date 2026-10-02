#!/usr/bin/env node
// S2e — Renderer-Werkstatt, Stufe 4: statische Assets GEMESSEN vorberechnen, statt sie von Hand in den
// Renderer zu schreiben oder nach Gefühl zu behandeln. Zwei unabhängige Teile, beide schreiben in dieselbe
// Datei social-video-assets.js (additiv — bestehende Felder window.SOCIAL_VIDEO_ASSETS/
// -ASSET_TREATMENT aus scripts/cache-team-logos.mjs --embed bleiben unangetastet, nur die beiden neuen Felder
// SOCIAL_VIDEO_SKYLINE/-LOGO_MEASUREMENTS werden ersetzt):
//
// 1. SKYLINE-PFADDATEN: Die Skyline-Silhouette war bisher als Konstante (SOCIAL_VIDEO_SKYLINE_PATH_D) von Hand
//    in social-video-renderer.js hineinkopiert — wortgleich aus der Cover-Animation in index.html (Klasse
//    .cv-skyline-shadow, ~Zeile 1563). Dieses Skript holt die Pfaddaten (d-Attribut + SVG-viewBox) stattdessen
//    PROGRAMMATISCH aus index.html und legt sie als window.SOCIAL_VIDEO_SKYLINE={d,viewBox} in
//    social-video-assets.js ab — der Renderer liest sie von dort, kopiert nichts mehr von Hand. Die Geometrie
//    selbst ändert sich dadurch nicht (dieselbe Quelle, nur automatisiert statt manuell übernommen).
//
// 2. LOGO-MESSWERTE: NEUE, eigenständige Messreihe je Team (Alpha-Abdeckung, mittlere Luminanz, Kontrast GEGEN
//    DEN TATSÄCHLICHEN KANON-HINTERGRUND — anders als die luminanz-/kantenanteil-basierte Lesbarkeits-Stufe in
//    scripts/cache-team-logos.mjs --embed, die gegen einen festen Luminanz-Schwellwert prüft, nicht gegen die
//    tatsächliche Hintergrundfarbe —, zugeschnittene Bounding-Box) plus eine daraus abgeleitete
//    Behandlungsempfehlung (fest nach Schwellen: zu geringer Kontrast -> neutrale Platte, sonst zu dunkel ->
//    Aufhellen, sonst original). ABSICHTLICH EIN EIGENES, PARALLELES DATENFELD
//    (window.SOCIAL_VIDEO_LOGO_MEASUREMENTS) — NICHT verbunden mit window.SOCIAL_VIDEO_ASSET_TREATMENT, das
//    Schicht B tatsächlich zum Zeichnen verwendet. Das bereits bestehende Lesbarkeits-System wurde über zwei
//    Phasen (S2c/S2d) gezielt gegen echte Fehlerbilder gehärtet (VfB-Ulm-"weißer Kreis"-Bug, Breisgau-Bandits-
//    "grauer Fleck"-Bug) — dieses Skript ersetzt es nicht, siehe Abschlussbericht dieser Phase. Die harte Regel
//    "VfB Ulm nie silhouettiert/invertiert/eingefärbt/flächig überlagert" ist stattdessen als Laufzeit-
//    Zusicherung direkt in socialVideoDrawCommand (social-video-renderer.js) verankert.
//
// Dry-Run ist der Standard; --write schreibt (atomar, Temp-Datei + rename).
//
// Aufruf:
//   node scripts/build-social-assets.mjs            # Dry-Run: zeigt Skyline-Fund + Messwerttabelle
//   node scripts/build-social-assets.mjs --write     # schreibt social-video-assets.js

import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { decodePng, meanOpaqueLuminance, planLogoCache, writeFileAtomic } from './cache-team-logos.mjs';

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// Dieselben zwei Pfade wie EMBED_FORCE_COLOR_PRESERVING_PATHS in cache-team-logos.mjs (dort nicht exportiert,
// hier als eigene, bewusst redundante Konstante — zwei unabhängige Skripte, die beide dieselbe harte Regel
// kennen müssen, sind robuster als ein gemeinsamer Import, der bei Änderung an einer Stelle leise die andere
// mitändert, ohne dass es hier auffällt).
const VFB_ULM_PATHS = new Set(['assets/vfb-ulm-logo-mark.png', 'assets/teams/vfb-ulm.png']);

// Kanon-2a-Hintergrundfarbe (SOCIAL_VIDEO_WIDTH×height, type:'background', siehe socialVideoBackgroundLayer) —
// der dunkelste, am häufigsten sichtbare Flächenton hinter den Logos.
const KANON_BACKGROUND_HEX = '#0E0306';
// Fester Schwellwert, niedriger als WCAG-AA-Text (4.5): hier geht es nur um ERKENNBARKEIT einer Logoform vor
// dunklem Hintergrund, nicht um Lesbarkeit von Fließtext.
const CONTRAST_THRESHOLD = 2.2;
// Dieselbe Luminanz-Schwelle wie DARK_LOGO_LUMINANCE_THRESHOLD in cache-team-logos.mjs (Konsistenz zwischen
// den beiden parallelen Messsystemen, siehe Kopfkommentar).
const DARK_LUMINANCE_THRESHOLD = 0.45;

function relLuminanceOfHex(hex) {
  const m = /^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(hex);
  if (!m) throw new Error(`ungültige Hex-Farbe: ${hex}`);
  const [r, g, b] = [1, 2, 3].map((i) => parseInt(m[i], 16));
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
}
function contrastRatio(l1, l2) {
  const lighter = Math.max(l1, l2), darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

/** Alpha-Abdeckung (Anteil nicht transparenter Bildpunkte an der Gesamtfläche) UND die zugeschnittene
 * Bounding-Box dieser Bildpunkte, in einem Durchlauf. */
function alphaCoverageAndBBox(rgba, width, height) {
  let opaque = 0, minX = width, minY = height, maxX = -1, maxY = -1;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const a = rgba[(y * width + x) * 4 + 3];
      if (a === 0) continue;
      opaque++;
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
  const coverage = opaque / (width * height);
  const bbox = maxX >= minX ? { x: minX, y: minY, w: maxX - minX + 1, h: maxY - minY + 1 } : { x: 0, y: 0, w: 0, h: 0 };
  return { coverage, bbox };
}

/** Behandlungsempfehlung nach festen Schwellen (Auftrag Stufe 4) — Reihenfolge bewusst: zu geringer Kontrast
 * zuerst geprüft, weil eine neutrale Platte JEDEN Kontrastfall löst (auch ein farbiges Logo, das zufällig
 * nahe am Hintergrundton liegt), Aufhellen dagegen nur bei zu dunklen, aber bereits ausreichend kontrastreichen
 * Logos etwas bringt. */
function deriveTreatment({ contrast, luminance, forceColorPreserving }) {
  if (forceColorPreserving) return 'original'; // harte Regel, siehe Kopfkommentar
  if (contrast < CONTRAST_THRESHOLD) return 'neutrale-platte';
  if (luminance < DARK_LUMINANCE_THRESHOLD) return 'aufhellen';
  return 'original';
}

/** Holt Pfaddaten + viewBox der Ulmer Skyline-Silhouette aus der Cover-Animation in index.html (Klasse
 * .cv-skyline-shadow) — die tatsächliche Quelle, aus der SOCIAL_VIDEO_SKYLINE_PATH_D bisher von Hand
 * abgeschrieben wurde. Wirft bei fehlendem Fund (z. B. Cover-Animation umbenannt), statt zu raten. */
export async function extractSkyline(repoRoot = REPO_ROOT) {
  const html = await readFile(path.join(repoRoot, 'index.html'), 'utf8');
  const blockMatch = /<div class="cv-skyline-bg"[^>]*>([\s\S]*?)<\/div>\s*(?=<\/div>|<script)/.exec(html) || /<div class="cv-skyline-bg"[^>]*>([\s\S]{0,4000}?)<\/svg>/.exec(html);
  if (!blockMatch) throw new Error('cv-skyline-bg-Block nicht in index.html gefunden');
  const block = blockMatch[1];
  const viewBoxMatch = /<svg viewBox="0 0 (\d+) (\d+)"/.exec(block);
  if (!viewBoxMatch) throw new Error('SVG-viewBox der Skyline nicht gefunden');
  const viewBox = { w: Number(viewBoxMatch[1]), h: Number(viewBoxMatch[2]) };
  const pathMatch = /<path class="cv-skyline-shadow" d="([^"]+)"/.exec(block);
  if (!pathMatch) throw new Error('cv-skyline-shadow-Pfad nicht gefunden');
  const d = pathMatch[1];
  if (!/^[MLCmlc0-9.\- ]+$/.test(d)) throw new Error('Pfaddaten enthalten unerwartete Zeichen — Abbruch statt Raten');
  return { d, viewBox };
}

/** Misst jedes bereits lokal gecachte Teamlogo (assets/teams/*.png, siehe scripts/cache-team-logos.mjs) PLUS
 * das VfB-Ulm-Wappen (assets/vfb-ulm-logo-mark.png) und leitet je Team eine Behandlung ab. Teams OHNE lokal
 * gecachtes Logo werden ausgelassen (Initialen-Fallback greift ohnehin, kein Raten) und separat ausgewiesen. */
export async function measureLogos(repoRoot = REPO_ROOT) {
  const plan = await planLogoCache(repoRoot);
  const bgLuminance = relLuminanceOfHex(KANON_BACKGROUND_HEX);
  const targets = [
    ...plan.cached.map((t) => ({ relPath: `assets/teams/${t.key}.png`, key: t.key, name: t.name, seasons: t.seasons })),
    { relPath: 'assets/vfb-ulm-logo-mark.png', key: 'vfb-ulm-logo-mark', name: 'VfB Ulm (Wappen-Asset)', seasons: new Set(['alle']) },
  ];
  const results = [];
  for (const t of targets) {
    const buf = await readFile(path.join(repoRoot, t.relPath)).catch(() => null);
    if (!buf) { results.push({ ...t, error: 'Datei fehlt' }); continue; }
    const decoded = decodePng(buf);
    if (!decoded || decoded.unsupported) { results.push({ ...t, error: decoded?.unsupported || 'ungültige PNG-Datei' }); continue; }
    const luminance = meanOpaqueLuminance(decoded.rgba);
    const contrast = contrastRatio(luminance, bgLuminance);
    const { coverage, bbox } = alphaCoverageAndBBox(decoded.rgba, decoded.width, decoded.height);
    const forceColorPreserving = VFB_ULM_PATHS.has(t.relPath);
    const treatment = deriveTreatment({ contrast, luminance, forceColorPreserving });
    results.push({
      ...t,
      alphaCoverage: Number(coverage.toFixed(4)),
      luminance: Number(luminance.toFixed(4)),
      contrast: Number(contrast.toFixed(2)),
      bbox,
      treatment,
    });
  }
  const missing25 = plan.teams.filter((t) => t.seasons.has('25/26') && !plan.cached.some((c) => c.key === t.key));
  return { results, bgLuminance, missing25, forceColorPreservingPaths: [...VFB_ULM_PATHS] };
}

function formatReport({ skyline, measurement }) {
  const lines = [];
  lines.push('social-video-assets.js — Stufe-4-Ergänzung, Dry-Run, es wird nichts geschrieben');
  lines.push('');
  lines.push(`Skyline: Pfaddaten gefunden (${skyline.d.length} Zeichen, viewBox ${skyline.viewBox.w}×${skyline.viewBox.h}).`);
  lines.push('');
  lines.push('Logo-Messwerte (Kontrast gegen Kanon-Hintergrund #0E0306, Schwellwert ' + CONTRAST_THRESHOLD + '):');
  lines.push('team                   | alpha  | luminanz | kontrast | bbox            | behandlung');
  for (const r of measurement.results) {
    if (r.error) { lines.push(`${r.key.padEnd(22)} | FEHLER: ${r.error}`); continue; }
    const bboxStr = `${r.bbox.w}×${r.bbox.h}@${r.bbox.x},${r.bbox.y}`;
    lines.push(`${r.key.padEnd(22)} | ${r.alphaCoverage.toFixed(3)} | ${r.luminance.toFixed(3)}    | ${r.contrast.toFixed(2).padStart(6)}   | ${bboxStr.padEnd(15)} | ${r.treatment}`);
  }
  if (measurement.missing25.length) {
    lines.push('');
    lines.push('Teams der Saison 25/26 ohne lokal gecachtes Logo (ausgelassen, Initialen-Fallback greift):');
    for (const t of measurement.missing25) lines.push(`   · ${t.key} (${t.name})`);
  }
  return lines.join('\n') + '\n';
}

/** Schreibt/aktualisiert social-video-assets.js additiv: SOCIAL_VIDEO_SKYLINE/-LOGO_MEASUREMENTS werden
 * ersetzt, alle anderen window.SOCIAL_VIDEO_*-Zeilen (ASSETS/ASSET_TREATMENT aus --embed) bleiben erhalten —
 * reiner Text-Patch, kein Neuaufbau der ganzen Datei, damit die beiden Skripte sich nicht gegenseitig
 * überschreiben. */
async function writeAssetsFile(repoRoot, skyline, measurement) {
  const target = path.join(repoRoot, 'social-video-assets.js');
  let existing = '';
  try { existing = await readFile(target, 'utf8'); } catch { /* noch keine Datei — leer starten */ }
  const stripLine = (src, varName) => {
    const re = new RegExp(`\\nwindow\\.${varName}=.*?;\\n`, 's');
    return src.replace(re, '\n');
  };
  let body = existing || '// (wird von scripts/cache-team-logos.mjs --embed und scripts/build-social-assets.mjs gemeinsam geschrieben)\n';
  body = stripLine(body, 'SOCIAL_VIDEO_SKYLINE');
  body = stripLine(body, 'SOCIAL_VIDEO_LOGO_MEASUREMENTS');
  const measurementObj = {};
  for (const r of measurement.results) if (!r.error) measurementObj[r.relPath] = { alphaCoverage: r.alphaCoverage, luminance: r.luminance, contrast: r.contrast, bbox: r.bbox, treatment: r.treatment };
  body += `window.SOCIAL_VIDEO_SKYLINE=${JSON.stringify(skyline)};\n`;
  body += `window.SOCIAL_VIDEO_LOGO_MEASUREMENTS=${JSON.stringify(measurementObj)};\n`;
  await writeFileAtomic(target, Buffer.from(body, 'utf8'));
  return { bytes: Buffer.byteLength(body, 'utf8'), measuredCount: Object.keys(measurementObj).length };
}

function parseArgs(argv) {
  return { write: argv.includes('--write') };
}

export async function main(argv = process.argv.slice(2), { stdout = process.stdout, repoRoot = REPO_ROOT } = {}) {
  const args = parseArgs(argv);
  const skyline = await extractSkyline(repoRoot);
  const measurement = await measureLogos(repoRoot);
  if (!args.write) {
    stdout.write(formatReport({ skyline, measurement }));
    return 0;
  }
  const result = await writeAssetsFile(repoRoot, skyline, measurement);
  stdout.write(`social-video-assets.js aktualisiert: Skyline-Pfaddaten + ${result.measuredCount} Logo-Messwerte geschrieben (${result.bytes} Bytes gesamt).\n`);
  return 0;
}

if (/(^|\/)build-social-assets\.mjs$/.test(process.argv[1]?.replace(/\\/g, '/') ?? '')) {
  main().then((code) => { process.exitCode = code; });
}

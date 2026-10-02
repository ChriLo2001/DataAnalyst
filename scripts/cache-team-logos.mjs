#!/usr/bin/env node
// S1 (Social-Video-Spezifikation, Abschnitt 3.3) · Lokaler Logo-Cache für assets/teams/<team-key>.png.
//
// WARUM DIES DER EINZIGE ORT MIT NETZWERKZUGRIFF IM PROJEKT IST: Team-Logos liegen heute ausschließlich als
// externe Saisonmanager-URLs vor (home_team_small_logo/guest_team_small_logo in season-data/*.json, "fremde"
// Bilder). Der geplante Canvas-Renderer (S2) und der bestehende PNG-Export (window.downloadMatchdayStory)
// serialisieren die Story über SVG foreignObject in ein Canvas — ein Canvas, das ein extern geladenes Bild
// zeichnet, gilt als "getaintet" und lässt sich weder per captureStream() noch per toDataURL() mehr auslesen
// (Same-Origin-Regel der Canvas-API). Ohne lokale Kopie könnte S2 also gar keine Aufnahme erzeugen. Dieses
// Skript lädt die Logos deshalb EINMALIG, ausdrücklich nur mit --fetch, lokal herunter; alle anderen
// Skripte/Module im Projekt bleiben wie bisher ohne jeden Netzwerkzugriff (siehe docs/*.md).
//
// Ohne --fetch: rein lesend, listet vorhandene/fehlende Logos je Saison und Team, schreibt nichts.
// Mit --fetch: lädt NUR fehlende Logos (nie ohne --force überschreiben), schreibt AUSSCHLIESSLICH nach
// assets/teams/. Atomares Schreiben (Temp-Datei + rename), wie an anderer Stelle im Projekt üblich.
//
// Team-Keys: teamKeyFor(name, seasonKey) aus scripts/model/normalize.mjs (unverändert wiederverwendet) —
// dieselbe hyphenated Form wie in model-data/ ("vfb-ulm", "sv-tuebingen-sharks", ...). Die Browser-Seite
// (index.html) verwendet für denselben Zweck eine eigene, neue Portierung (matchcenterStoryTeamAssetKey) —
// ein Abgleichtest (scripts/test-social-video.mjs) beweist für ALLE Teams ALLER Saisons, dass beide denselben
// Schlüssel liefern.
//
// S2-NACHTRAG (Canvas-Taint unter file://, bestätigt): eine lokale Kopie unter assets/teams/ allein reicht
// NICHT aus. Chrome behandelt unter file:// jede lokale Datei als eigene, fremde Herkunft — auch ein per
// <img src="assets/teams/…"> geladenes Bild von derselben Festplatte verunreinigt das Canvas genauso wie ein
// externes. Einzig data:-URIs vergiften das Canvas nicht, auch nicht unter file://. Deshalb zusätzlich:
//   --embed: erzeugt social-video-assets.js (window.SOCIAL_VIDEO_ASSETS, klassisches Skript wie
//   season-data-embedded.js) mit allen vom Social-Video-Renderer benötigten Bildern als data:-URIs
//   (assets/teams/*.png der bereits lokal vorhandenen Teams, assets/vfb-ulm-logo-mark.png, assets/spatz.svg).
//   Der Renderer (index.html) liest ausschließlich aus window.SOCIAL_VIDEO_ASSETS; fehlt ein Eintrag, greift
//   der bestehende Initialen-Fallback. Die Story-VORSCHAU im Dashboard bleibt unverändert und nutzt weiter
//   die Dateipfade (sie läuft nie durch ein Canvas, das exportiert wird, und ist über HTTP ohnehin niemals
//   betroffen — s. docs/social-video-spezifikation.md Abschnitt 3.3).
//
// Aufruf:
//   node scripts/cache-team-logos.mjs            # Dry-Run: listet vorhandene/fehlende Logos, schreibt nichts
//   node scripts/cache-team-logos.mjs --fetch     # lädt fehlende Logos herunter (einziger Netzwerkzugriff)
//   node scripts/cache-team-logos.mjs --fetch --force  # überschreibt auch bereits vorhandene Dateien
//   node scripts/cache-team-logos.mjs --embed            # Dry-Run: zeigt, was in social-video-assets.js eingebettet würde
//   node scripts/cache-team-logos.mjs --embed --write     # schreibt social-video-assets.js (kein Netzwerkzugriff)

import { readFile, mkdir, writeFile, rename, readdir, stat } from 'node:fs/promises';
import { inflateSync } from 'node:zlib';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { teamKeyFor } from './model/normalize.mjs';

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const LOGO_BASE = 'https://saisonmanager.de';

/** Liest season-data/seasons.json und alle dort gelisteten Saisondateien (BOM-tolerant). Kein Import aus
 * build-league-model.mjs, damit dieses Skript ohne die M0-Normalisierung auskommt (nur Roh-Teamnamen/-Logos
 * nötig, keine Modell-Zeilen). */
async function loadRawSeasons(repoRoot = REPO_ROOT) {
  const dir = path.join(repoRoot, 'season-data');
  const parse = async (file) => JSON.parse((await readFile(path.join(dir, file), 'utf8')).replace(/^﻿/, ''));
  const manifest = await parse('seasons.json');
  const seasons = [];
  for (const entry of manifest.seasons) seasons.push({ key: entry.key, data: await parse(entry.file) });
  return seasons;
}

/** Erste vorhandene Logo-URL für eine Spielseite, exakt dieselbe Feld-Priorität wie getTeamLogoUrlForStory in
 * index.html (home_team_small_logo || home_team_logo || home_logo). */
function rawLogoUrl(game, side) {
  return game?.[`${side}_team_small_logo`] || game?.[`${side}_team_logo`] || game?.[`${side}_logo`] || '';
}

/** Absolute URL aus einem rohen Logo-Pfad, dieselbe Präfix-Regel wie matchcenterStorySafeLogoUrl/
 * matchcenterStoryLogoBase in index.html: "/api/..."-Pfade bekommen die Saisonmanager-Basis vorangestellt,
 * bereits absolute http(s)-URLs bleiben unverändert, alles andere gilt als nicht sicher/nicht vorhanden. */
function absoluteLogoUrl(raw) {
  const value = String(raw || '').trim();
  if (!value) return '';
  if (value.startsWith('/api/')) return `${LOGO_BASE}${value}`;
  if (value.startsWith('http://') || value.startsWith('https://')) return value;
  return '';
}

/** Sammelt je Team (Schlüssel via teamKeyFor) den Anzeigenamen, die Saisons, in denen er vorkommt, und die
 * Logo-URL der JÜNGSTEN Saison, in der eine gefunden wird (nicht die erste über alle Saisons hinweg) — ältere
 * Saisonmanager-URLs (`/api/storage/blobs/redirect/...`) sind signierte, offenbar zeitlich begrenzte Links und
 * in der Praxis oft nicht mehr erreichbar (siehe Dry-Run-/--fetch-Bericht); die URL-Form der aktuellen Saison
 * (`/api/storage/representations/proxy/...`) ist deutlich verlässlicher. `seasons` wird in der Reihenfolge von
 * season-data/seasons.json übergeben (chronologisch aufsteigend, geprüft) — der Saison-Index bestimmt "jünger",
 * nicht die Verarbeitungsreihenfolge. Ulm/SG läuft wie überall im Projekt unter dem Schlüssel des eigenen Teams. */
function collectTeams(seasons) {
  const teams = new Map(); // key -> { key, name, seasons:Set, logoUrl, logoUrlSeasonIndex }
  seasons.forEach(({ key: seasonKey, data }, seasonIndex) => {
    for (const game of data.games || []) {
      for (const side of ['home', 'guest']) {
        const name = game?.[`${side}_team_name`];
        if (!name) continue;
        const teamKey = teamKeyFor(name, seasonKey);
        if (!teamKey) continue;
        let entry = teams.get(teamKey);
        if (!entry) { entry = { key: teamKey, name, seasons: new Set(), logoUrl: '', logoUrlSeasonIndex: -1 }; teams.set(teamKey, entry); }
        entry.seasons.add(seasonKey);
        if (seasonIndex > entry.logoUrlSeasonIndex) {
          const abs = absoluteLogoUrl(rawLogoUrl(game, side));
          if (abs) { entry.logoUrl = abs; entry.logoUrlSeasonIndex = seasonIndex; }
        }
      }
    }
  });
  return [...teams.values()].sort((a, b) => a.key.localeCompare(b.key));
}

async function existingLogoFiles(repoRoot) {
  try {
    const entries = await readdir(path.join(repoRoot, 'assets', 'teams'));
    return new Set(entries.filter((f) => f.endsWith('.png')).map((f) => f.slice(0, -4)));
  } catch (e) {
    if (e.code === 'ENOENT') return new Set();
    throw e;
  }
}

async function writeFileAtomic(filePath, buffer) {
  await mkdir(path.dirname(filePath), { recursive: true });
  const tmpPath = `${filePath}.tmp-${process.pid}`;
  await writeFile(tmpPath, buffer);
  await rename(tmpPath, filePath);
}

async function fetchLogo(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length === 0) throw new Error('leere Antwort');
  return buf;
}

function parseArgs(argv) {
  return { fetch: argv.includes('--fetch'), force: argv.includes('--force'), embed: argv.includes('--embed'), write: argv.includes('--write') };
}

// ─────────────────────────────────────────────────────────────────────────
// --embed: social-video-assets.js (data:-URIs für den Social-Video-Renderer)
// ─────────────────────────────────────────────────────────────────────────

const EMBED_MIME_BY_EXT = { '.png': 'image/png', '.svg': 'image/svg+xml' };
const EMBED_FIXED_PATHS = ['assets/vfb-ulm-logo-mark.png', 'assets/spatz.svg'];

// ─────────────────────────────────────────────────────────────────────────
// Dunkle Logos lesbar machen (S2c-Auftrag B3) — minimaler PNG-Decoder, reine Node-Kernfunktionen (nur
// node:zlib für die DEFLATE-Dekompression der IDAT-Chunks), keine Bibliothek (Schutzregel: keine neuen
// npm-Abhängigkeiten). Unterstützt 8-Bit-Tiefe, kein Interlacing — deckt normale, unkomprimiert-typische
// Logo-PNGs ab. Liegt eine Datei außerhalb dieses Teilbereichs (z. B. 16-Bit-Tiefe, Adam7-Interlacing), greift
// sicherheitshalber die Silhouette-Stufe statt eines Absturzes oder einer falschen Analyse.
// ─────────────────────────────────────────────────────────────────────────

function readPngChunks(buf) {
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  if (buf.length < 8 || !buf.subarray(0, 8).equals(sig)) return null;
  const chunks = [];
  let offset = 8;
  while (offset + 8 <= buf.length) {
    const length = buf.readUInt32BE(offset);
    const type = buf.toString('ascii', offset + 4, offset + 8);
    const data = buf.subarray(offset + 8, offset + 8 + length);
    chunks.push({ type, data });
    offset += 8 + length + 4; // + CRC
    if (type === 'IEND') break;
  }
  return chunks;
}

function pngPaeth(a, b, c) {
  const p = a + b - c;
  const pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c);
  if (pa <= pb && pa <= pc) return a;
  if (pb <= pc) return b;
  return c;
}

/** Entfernt die PNG-Scanline-Filter (Typen 0..4, siehe PNG-Spezifikation) und liefert die rohen Pixel-Bytes
 * (bitDepth 8, bpp Bytes je Pixel). */
function pngUnfilter(raw, width, height, bpp) {
  const stride = width * bpp;
  const out = Buffer.alloc(height * stride);
  let rawOffset = 0;
  for (let y = 0; y < height; y++) {
    const filterType = raw[rawOffset];
    rawOffset += 1;
    const rowStart = y * stride;
    const prevRowStart = (y - 1) * stride;
    for (let x = 0; x < stride; x++) {
      const val = raw[rawOffset + x];
      const a = x >= bpp ? out[rowStart + x - bpp] : 0;
      const b = y > 0 ? out[prevRowStart + x] : 0;
      const c = y > 0 && x >= bpp ? out[prevRowStart + x - bpp] : 0;
      let recon;
      if (filterType === 0) recon = val;
      else if (filterType === 1) recon = val + a;
      else if (filterType === 2) recon = val + b;
      else if (filterType === 3) recon = val + Math.floor((a + b) / 2);
      else if (filterType === 4) recon = val + pngPaeth(a, b, c);
      else return null; // unbekannter Filtertyp — Datei gilt als nicht unterstützt
      out[rowStart + x] = recon & 0xff;
    }
    rawOffset += stride;
  }
  return out;
}

const PNG_CHANNELS_BY_COLOR_TYPE = { 0: 1, 2: 3, 3: 1, 4: 2, 6: 4 };

/** Dekodiert ein PNG zu {width,height,rgba} (ein Uint8/Buffer je R,G,B,A, 0..255), oder
 * {unsupported:'<grund>'}, wenn Bit-Tiefe/Interlacing/Farbtyp außerhalb des unterstützten Teilbereichs liegen,
 * oder null, wenn die Datei keine gültige PNG-Signatur hat. */
function decodePng(buf) {
  const chunks = readPngChunks(buf);
  if (!chunks) return null;
  const ihdrChunk = chunks.find((c) => c.type === 'IHDR');
  if (!ihdrChunk) return null;
  const ihdr = ihdrChunk.data;
  const width = ihdr.readUInt32BE(0);
  const height = ihdr.readUInt32BE(4);
  const bitDepth = ihdr.readUInt8(8);
  const colorType = ihdr.readUInt8(9);
  const interlace = ihdr.readUInt8(12);
  if (bitDepth !== 8) return { unsupported: `Bit-Tiefe ${bitDepth} (nur 8-Bit unterstützt)` };
  if (interlace !== 0) return { unsupported: 'Adam7-Interlacing (nicht unterstützt)' };
  const channels = PNG_CHANNELS_BY_COLOR_TYPE[colorType];
  if (!channels) return { unsupported: `Farbtyp ${colorType} (nicht unterstützt)` };
  const idat = Buffer.concat(chunks.filter((c) => c.type === 'IDAT').map((c) => c.data));
  let raw;
  try {
    raw = inflateSync(idat);
  } catch (e) {
    return { unsupported: `DEFLATE-Fehler: ${e.message}` };
  }
  const pixelBytes = pngUnfilter(raw, width, height, channels);
  if (!pixelBytes) return { unsupported: 'unbekannter Scanline-Filtertyp' };
  const palette = chunks.find((c) => c.type === 'PLTE')?.data;
  const trns = chunks.find((c) => c.type === 'tRNS')?.data;
  const rgba = Buffer.alloc(width * height * 4);
  for (let i = 0; i < width * height; i++) {
    const px = i * channels;
    let r, g, b, a = 255;
    if (colorType === 0) { r = g = b = pixelBytes[px]; }
    else if (colorType === 2) { r = pixelBytes[px]; g = pixelBytes[px + 1]; b = pixelBytes[px + 2]; }
    else if (colorType === 3) {
      const idx = pixelBytes[px];
      if (!palette || idx * 3 + 2 >= palette.length) return { unsupported: 'Palette fehlt oder zu kurz' };
      r = palette[idx * 3]; g = palette[idx * 3 + 1]; b = palette[idx * 3 + 2];
      a = trns && idx < trns.length ? trns[idx] : 255;
    } else if (colorType === 4) { r = g = b = pixelBytes[px]; a = pixelBytes[px + 1]; }
    else { r = pixelBytes[px]; g = pixelBytes[px + 1]; b = pixelBytes[px + 2]; a = pixelBytes[px + 3]; }
    rgba[i * 4] = r; rgba[i * 4 + 1] = g; rgba[i * 4 + 2] = b; rgba[i * 4 + 3] = a;
  }
  return { width, height, rgba };
}

/** Mittlere relative Luminanz (0..1, Rec.-709-Gewichtung) der NICHT transparenten Bildpunkte. invert=true
 * misst dieselbe Fläche nach RGB-Invertierung, factor misst sie nach Multiplikation jedes Kanals mit factor
 * (auf 255 gekappt) — für die beiden Aufhellungs-Prüfstufen. */
function meanOpaqueLuminance(rgba, { invert = false, factor = 1 } = {}) {
  let sum = 0, count = 0;
  for (let i = 0; i < rgba.length; i += 4) {
    if (rgba[i + 3] === 0) continue;
    let r = rgba[i], g = rgba[i + 1], b = rgba[i + 2];
    if (invert) { r = 255 - r; g = 255 - g; b = 255 - b; }
    if (factor !== 1) { r = Math.min(255, r * factor); g = Math.min(255, g * factor); b = Math.min(255, b * factor); }
    sum += (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
    count += 1;
  }
  return count ? sum / count : 1;
}

/** Mittlere HSL-Sättigung der nicht transparenten Bildpunkte — unterscheidet ein (annähernd) einfarbig
 * schwarz/graues Logo (niedrige Sättigung, Invertieren ist dafür unbedenklich) von einem dunklen, aber
 * farbigen Logo (z. B. dunkles Vereinsrot) — dort würde Invertieren den Farbton verfälschen (Rot -> Cyan),
 * deshalb dort stattdessen Aufhellen (Kanal-Multiplikation, farbtonerhaltend). */
function meanOpaqueSaturation(rgba) {
  let sum = 0, count = 0;
  for (let i = 0; i < rgba.length; i += 4) {
    if (rgba[i + 3] === 0) continue;
    const r = rgba[i] / 255, g = rgba[i + 1] / 255, b = rgba[i + 2] / 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b), l = (max + min) / 2;
    const sat = max === min ? 0 : l > 0.5 ? (max - min) / (2 - max - min) : (max - min) / (max + min);
    sum += sat; count += 1;
  }
  return count ? sum / count : 0;
}

const DARK_LOGO_LUMINANCE_THRESHOLD = 0.45;
const DARK_LOGO_SATURATION_THRESHOLD = 0.2; // darunter gilt ein Logo als annähernd einfarbig (Invertieren ok)

/** Entscheidet die Lesbarkeits-Stufe für EIN PNG (S2c-Auftrag B3): 'none' (hell genug), 'invert' (für
 * annähernd einfarbige dunkle Logos — Invertieren verfälscht dort keinen Farbton), 'brighten' (für farbige
 * dunkle Logos — Kanal-Multiplikation hebt die Helligkeit, OHNE den Farbton zu drehen) oder 'silhouette' (auch
 * aufgehellt/invertiert zu dunkel, oder Datei außerhalb des unterstützten PNG-Teilbereichs — dann zeichnet
 * Schicht B eine einfarbig gebrochen-weiße Form aus der Alpha-Maske statt des Bildes). Nur für .png relevant,
 * .svg bleibt immer 'none'. */
export function decideLogoTreatment(buf) {
  const decoded = decodePng(buf);
  if (!decoded) return { tier: 'silhouette', reason: 'keine gültige PNG-Datei', luminance: null };
  if (decoded.unsupported) return { tier: 'silhouette', reason: decoded.unsupported, luminance: null };
  const luminance = meanOpaqueLuminance(decoded.rgba);
  if (luminance >= DARK_LOGO_LUMINANCE_THRESHOLD) return { tier: 'none', reason: null, luminance };
  const saturation = meanOpaqueSaturation(decoded.rgba);
  if (saturation < DARK_LOGO_SATURATION_THRESHOLD) {
    const invertedLuminance = meanOpaqueLuminance(decoded.rgba, { invert: true });
    if (invertedLuminance >= DARK_LOGO_LUMINANCE_THRESHOLD) return { tier: 'invert', reason: null, luminance, saturation, invertedLuminance };
    return { tier: 'silhouette', reason: 'annähernd einfarbig, auch invertiert unter dem Schwellwert', luminance, saturation, invertedLuminance };
  }
  const factor = Math.min(4, Number((DARK_LOGO_LUMINANCE_THRESHOLD / Math.max(0.02, luminance) * 1.15).toFixed(2)));
  const brightenedLuminance = meanOpaqueLuminance(decoded.rgba, { factor });
  if (brightenedLuminance >= DARK_LOGO_LUMINANCE_THRESHOLD) return { tier: 'brighten', reason: null, luminance, saturation, brightenFactor: factor, brightenedLuminance };
  return { tier: 'silhouette', reason: 'farbig, auch aufgehellt unter dem Schwellwert', luminance, saturation, brightenedLuminance };
}
const EMBED_JS_HEADER =
  '// Automatisch erzeugt von scripts/cache-team-logos.mjs --embed --write. Nicht von Hand bearbeiten.\n' +
  '// file://-Fallback für den Social-Video-Renderer: stellt window.SOCIAL_VIDEO_ASSETS (Team-Logos, VfB-Logo,\n' +
  '// Spatz) als data:-URIs bereit. Grund: unter file:// behandelt Chrome jede lokale Datei als eigene fremde\n' +
  '// Herkunft — auch ein per <img src="assets/…"> von derselben Festplatte geladenes Bild verunreinigt das\n' +
  '// Canvas (captureStream()/toDataURL() schlagen danach fehl). data:-URIs haben dieses Problem nicht. Der\n' +
  '// Renderer liest ausschließlich aus dieser Quelle; fehlt ein Schlüssel, greift der Initialen-Fallback. Die\n' +
  '// Story-VORSCHAU im Dashboard ist davon unberührt und nutzt weiter die Dateipfade. Klassisches Skript\n' +
  '// (kein type="module"), damit es auch per Doppelklick lädt (siehe <script src="social-video-assets.js">\n' +
  '// vor dem Haupt-<script> in index.html). Siehe docs/social-video-spezifikation.md Abschnitt 3.3.\n' +
  '// window.SOCIAL_VIDEO_ASSET_TREATMENT (S2c-Auftrag B3, dunkle Logos lesbar machen): {relPath: {tier,\n' +
  '// factor?}} NUR für Logos unter der Lesbarkeits-Schwelle (mittlere Luminanz der nicht transparenten\n' +
  '// Bildpunkte) — fehlt ein Schlüssel, bleibt das Bild unverändert. tier "invert" (annähernd einfarbige\n' +
  '// dunkle Logos) hellt per Canvas-Filter invert(1) auf; tier "brighten" (farbige dunkle Logos, z. B.\n' +
  '// Vereinsrot — Invertieren würde den Farbton verfälschen) hellt per brightness(factor) auf, OHNE den\n' +
  '// Farbton zu drehen; tier "silhouette" zeichnet eine einfarbig gebrochen-weiße Form aus der Alpha-Maske\n' +
  '// (socialVideoDrawCommand, Fall \'image\'). Siehe Abschlussbericht für die betroffenen Logos je Stufe.\n';

async function embedAssetFile(repoRoot, relPath) {
  const buf = await readFile(path.join(repoRoot, relPath));
  const ext = path.extname(relPath).toLowerCase();
  const mime = EMBED_MIME_BY_EXT[ext];
  if (!mime) throw new Error(`unbekannter Asset-Typ: ${relPath}`);
  const treatment = ext === '.png' ? decideLogoTreatment(buf) : { tier: 'none', reason: null, luminance: null, invertedLuminance: null };
  return { relPath, bytes: buf.length, dataUri: `data:${mime};base64,${buf.toString('base64')}`, treatment };
}

/** Plant, was --embed einbetten würde: die beiden festen Assets (VfB-Logo, Spatz) plus alle TEAM-Logos, die
 * bereits lokal in assets/teams/ liegen (dieselbe Menge wie planLogoCache().cached — kein --fetch nötig, rein
 * lesend). Nicht lesbare/fehlende Dateien landen mit error statt dataUri im Ergebnis (werden beim Schreiben
 * ausgelassen, der Renderer fällt für diesen Schlüssel auf Initialen zurück). */
export async function planAssetEmbed(repoRoot = REPO_ROOT) {
  const plan = await planLogoCache(repoRoot);
  const teamPaths = plan.cached.map((t) => `assets/teams/${t.key}.png`);
  const entries = [];
  for (const relPath of [...EMBED_FIXED_PATHS, ...teamPaths]) {
    try {
      entries.push(await embedAssetFile(repoRoot, relPath));
    } catch (e) {
      entries.push({ relPath, bytes: 0, dataUri: null, error: e.message });
    }
  }
  return entries;
}

function formatEmbedReport(entries) {
  const ok = entries.filter((e) => e.dataUri);
  const failed = entries.filter((e) => !e.dataUri);
  const rawBytes = ok.reduce((s, e) => s + e.bytes, 0);
  const dataUriBytes = ok.reduce((s, e) => s + e.dataUri.length, 0);
  const lines = [];
  lines.push('social-video-assets.js — Dry-Run, es wird nichts geschrieben');
  lines.push(`Einzubettende Dateien: ${ok.length}`);
  for (const e of ok) {
    const t = e.treatment;
    const lum = t?.luminance != null ? `, Luminanz ${t.luminance.toFixed(2)}` : '';
    lines.push(`   · ${e.relPath}  (${e.bytes} Bytes roh, Lesbarkeits-Stufe: ${t?.tier ?? 'none'}${lum})`);
  }
  if (failed.length) {
    lines.push('');
    lines.push('Nicht lesbar (werden ausgelassen, Renderer nutzt Initialen-Fallback):');
    for (const e of failed) lines.push(`   · ${e.relPath}: ${e.error}`);
  }
  const affected = ok.filter((e) => e.treatment?.tier && e.treatment.tier !== 'none');
  lines.push('');
  if (affected.length) {
    lines.push(`Dunkle Logos (S2c-Auftrag B3), ${affected.length} betroffen:`);
    for (const e of affected) {
      const t = e.treatment;
      const detail = t.tier === 'invert' ? `invertiert ${t.invertedLuminance?.toFixed(2)}`
        : t.tier === 'brighten' ? `Faktor ${t.brightenFactor}, danach ${t.brightenedLuminance?.toFixed(2)}`
        : t.reason || '';
      lines.push(`   · ${e.relPath}: Stufe "${t.tier}" (Luminanz ${t.luminance != null ? t.luminance.toFixed(2) : 'n/a'}, Sättigung ${t.saturation != null ? t.saturation.toFixed(2) : 'n/a'}, ${detail})`);
    }
  } else {
    lines.push('Dunkle Logos (S2c-Auftrag B3): keine betroffen (alle über dem Schwellwert).');
  }
  lines.push('');
  lines.push(`Gesamtgröße roh: ${rawBytes} Bytes, als Data-URI (Base64): ${dataUriBytes} Bytes (~${Math.round(dataUriBytes / 1024)} KB).`);
  return lines.join('\n') + '\n';
}

async function writeEmbeddedAssetsFile(repoRoot, entries) {
  const ok = entries.filter((e) => e.dataUri);
  const obj = {};
  for (const e of ok) obj[e.relPath] = e.dataUri;
  const treatmentObj = {};
  for (const e of ok) {
    if (!e.treatment?.tier || e.treatment.tier === 'none') continue;
    treatmentObj[e.relPath] = e.treatment.tier === 'brighten' ? { tier: 'brighten', factor: e.treatment.brightenFactor } : { tier: e.treatment.tier };
  }
  const body = `${EMBED_JS_HEADER}window.SOCIAL_VIDEO_ASSETS=${JSON.stringify(obj)};\nwindow.SOCIAL_VIDEO_ASSET_TREATMENT=${JSON.stringify(treatmentObj)};\n`;
  await writeFileAtomic(path.join(repoRoot, 'social-video-assets.js'), Buffer.from(body, 'utf8'));
  return { count: ok.length, bytes: Buffer.byteLength(body, 'utf8'), treatmentCount: Object.keys(treatmentObj).length };
}

export async function planLogoCache(repoRoot = REPO_ROOT) {
  const seasons = await loadRawSeasons(repoRoot);
  const teams = collectTeams(seasons);
  const existing = await existingLogoFiles(repoRoot);
  const cached = teams.filter((t) => existing.has(t.key));
  const missingWithUrl = teams.filter((t) => !existing.has(t.key) && t.logoUrl);
  const missingWithoutUrl = teams.filter((t) => !existing.has(t.key) && !t.logoUrl);
  return { teams, cached, missingWithUrl, missingWithoutUrl };
}

function formatPlanReport(plan) {
  const lines = [];
  lines.push('Logo-Cache (assets/teams/) — Dry-Run, es wird nichts geschrieben');
  lines.push(`Teams in season-data (alle Saisons): ${plan.teams.length}`);
  lines.push(`  bereits lokal vorhanden: ${plan.cached.length}`);
  lines.push(`  fehlend, URL bekannt (mit --fetch ladbar): ${plan.missingWithUrl.length}`);
  lines.push(`  fehlend, keine Logo-URL in season-data (bleibt beim Initialen-Fallback): ${plan.missingWithoutUrl.length}`);
  if (plan.cached.length) { lines.push(''); lines.push('Vorhanden:'); for (const t of plan.cached) lines.push(`   · ${t.key}  (${t.name}, ${[...t.seasons].sort().join(', ')})`); }
  if (plan.missingWithUrl.length) { lines.push(''); lines.push('Fehlend, mit --fetch ladbar:'); for (const t of plan.missingWithUrl) lines.push(`   · ${t.key}  (${t.name}, ${[...t.seasons].sort().join(', ')})`); }
  if (plan.missingWithoutUrl.length) { lines.push(''); lines.push('Fehlend, keine Logo-URL gefunden:'); for (const t of plan.missingWithoutUrl) lines.push(`   · ${t.key}  (${t.name}, ${[...t.seasons].sort().join(', ')})`); }
  return lines.join('\n') + '\n';
}

export async function main(argv = process.argv.slice(2), { stdout = process.stdout, stderr = process.stderr, repoRoot = REPO_ROOT } = {}) {
  const args = parseArgs(argv);
  if (args.embed) {
    const entries = await planAssetEmbed(repoRoot);
    if (!args.write) {
      stdout.write(formatEmbedReport(entries));
      return 0;
    }
    const result = await writeEmbeddedAssetsFile(repoRoot, entries);
    stdout.write(`social-video-assets.js geschrieben: ${result.count} Assets, ${result.bytes} Bytes (~${Math.round(result.bytes / 1024)} KB), ${result.treatmentCount} mit Lesbarkeits-Stufe (SOCIAL_VIDEO_ASSET_TREATMENT).\n`);
    return 0;
  }
  const plan = await planLogoCache(repoRoot);
  if (!args.fetch) {
    stdout.write(formatPlanReport(plan));
    return 0;
  }
  const targets = args.force ? plan.teams.filter((t) => t.logoUrl) : plan.missingWithUrl;
  const loaded = [];
  const skippedExisting = args.force ? [] : plan.cached;
  const failed = [];
  for (const t of targets) {
    const dest = path.join(repoRoot, 'assets', 'teams', `${t.key}.png`);
    try {
      const buf = await fetchLogo(t.logoUrl);
      await writeFileAtomic(dest, buf);
      loaded.push(t);
    } catch (e) {
      failed.push({ ...t, reason: e.message });
    }
  }
  const lines = [];
  lines.push(`Logo-Cache: ${loaded.length} geladen, ${skippedExisting.length} bereits vorhanden (übersprungen), ${failed.length} nicht erreichbar, ${plan.missingWithoutUrl.length} ohne URL.`);
  if (loaded.length) { lines.push(''); lines.push('Geladen:'); for (const t of loaded) lines.push(`   · ${t.key}.png  (${t.name})`); }
  if (failed.length) { lines.push(''); lines.push('Nicht erreichbar:'); for (const t of failed) lines.push(`   · ${t.key}  (${t.name}): ${t.reason}`); }
  if (plan.missingWithoutUrl.length) { lines.push(''); lines.push('Ohne Logo-URL in season-data (bleibt beim Initialen-Fallback):'); for (const t of plan.missingWithoutUrl) lines.push(`   · ${t.key}  (${t.name})`); }
  stdout.write(lines.join('\n') + '\n');
  return 0;
}

if (/(^|\/)cache-team-logos\.mjs$/.test(process.argv[1]?.replace(/\\/g, '/') ?? '')) {
  main().then((code) => { process.exitCode = code; });
}

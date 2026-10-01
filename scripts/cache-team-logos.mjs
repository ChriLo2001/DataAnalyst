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
const EMBED_JS_HEADER =
  '// Automatisch erzeugt von scripts/cache-team-logos.mjs --embed --write. Nicht von Hand bearbeiten.\n' +
  '// file://-Fallback für den Social-Video-Renderer: stellt window.SOCIAL_VIDEO_ASSETS (Team-Logos, VfB-Logo,\n' +
  '// Spatz) als data:-URIs bereit. Grund: unter file:// behandelt Chrome jede lokale Datei als eigene fremde\n' +
  '// Herkunft — auch ein per <img src="assets/…"> von derselben Festplatte geladenes Bild verunreinigt das\n' +
  '// Canvas (captureStream()/toDataURL() schlagen danach fehl). data:-URIs haben dieses Problem nicht. Der\n' +
  '// Renderer liest ausschließlich aus dieser Quelle; fehlt ein Schlüssel, greift der Initialen-Fallback. Die\n' +
  '// Story-VORSCHAU im Dashboard ist davon unberührt und nutzt weiter die Dateipfade. Klassisches Skript\n' +
  '// (kein type="module"), damit es auch per Doppelklick lädt (siehe <script src="social-video-assets.js">\n' +
  '// vor dem Haupt-<script> in index.html). Siehe docs/social-video-spezifikation.md Abschnitt 3.3.\n';

async function embedAssetFile(repoRoot, relPath) {
  const buf = await readFile(path.join(repoRoot, relPath));
  const mime = EMBED_MIME_BY_EXT[path.extname(relPath).toLowerCase()];
  if (!mime) throw new Error(`unbekannter Asset-Typ: ${relPath}`);
  return { relPath, bytes: buf.length, dataUri: `data:${mime};base64,${buf.toString('base64')}` };
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
  for (const e of ok) lines.push(`   · ${e.relPath}  (${e.bytes} Bytes roh)`);
  if (failed.length) {
    lines.push('');
    lines.push('Nicht lesbar (werden ausgelassen, Renderer nutzt Initialen-Fallback):');
    for (const e of failed) lines.push(`   · ${e.relPath}: ${e.error}`);
  }
  lines.push('');
  lines.push(`Gesamtgröße roh: ${rawBytes} Bytes, als Data-URI (Base64): ${dataUriBytes} Bytes (~${Math.round(dataUriBytes / 1024)} KB).`);
  return lines.join('\n') + '\n';
}

async function writeEmbeddedAssetsFile(repoRoot, entries) {
  const ok = entries.filter((e) => e.dataUri);
  const obj = {};
  for (const e of ok) obj[e.relPath] = e.dataUri;
  const body = `${EMBED_JS_HEADER}window.SOCIAL_VIDEO_ASSETS=${JSON.stringify(obj)};\n`;
  await writeFileAtomic(path.join(repoRoot, 'social-video-assets.js'), Buffer.from(body, 'utf8'));
  return { count: ok.length, bytes: Buffer.byteLength(body, 'utf8') };
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
    stdout.write(`social-video-assets.js geschrieben: ${result.count} Assets, ${result.bytes} Bytes (~${Math.round(result.bytes / 1024)} KB).\n`);
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

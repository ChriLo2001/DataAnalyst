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
// Aufruf:
//   node scripts/cache-team-logos.mjs            # Dry-Run: listet vorhandene/fehlende Logos, schreibt nichts
//   node scripts/cache-team-logos.mjs --fetch     # lädt fehlende Logos herunter (einziger Netzwerkzugriff)
//   node scripts/cache-team-logos.mjs --fetch --force  # überschreibt auch bereits vorhandene Dateien

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
  return { fetch: argv.includes('--fetch'), force: argv.includes('--force') };
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

#!/usr/bin/env node
// S2-Nachtrag (Canvas-Taint unter file:// behoben) · Minimaler lokaler Static-Server, Node ohne Abhängigkeiten.
//
// WARUM: Die App funktioniert auch per Doppelklick (file://) — das bleibt so. Für die Social-Video-
// Aufnahme/den Standbild-Export genügt das inzwischen auch unter file:// (alle Renderer-Bilder kommen als
// data:-URIs aus social-video-assets.js, siehe scripts/cache-team-logos.mjs --embed). Dieser Server ist der
// empfohlene Weg, wenn genau das dennoch nicht funktioniert (z. B. social-video-assets.js fehlt noch) — die
// App meldet in diesem Fall den passenden Hinweis samt dieser Befehlszeile (siehe socialVideoCanvasExportHint
// in index.html und docs/social-video-spezifikation.md Abschnitt 3.3).
//
// Liefert den kompletten Projektordner read-only über HTTP aus, keine Server-Logik, kein Build-Schritt,
// keine Abhängigkeit (nur node:http/node:fs/node:path/node:url). Bricht Pfade außerhalb des Projektordners
// ab (kein Directory-Traversal über "..").
//
// Aufruf:
//   node scripts/serve.mjs            # http://localhost:5173
//   node scripts/serve.mjs --port 8080

import { createServer } from 'node:http';
import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.webm': 'video/webm',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
};

function parsePort(argv) {
  const flagIndex = argv.indexOf('--port');
  if (flagIndex !== -1 && argv[flagIndex + 1]) {
    const n = Number(argv[flagIndex + 1]);
    if (Number.isInteger(n) && n > 0 && n < 65536) return n;
  }
  return 5173;
}

/** Löst eine Request-URL sicher in einen Pfad unterhalb von REPO_ROOT auf. Gibt null zurück, wenn der Pfad
 * (nach Normalisierung, auch bei "..") außerhalb von REPO_ROOT läge. "/" liefert index.html. */
export function resolveRequestPath(repoRoot, requestUrl) {
  const decoded = decodeURIComponent((requestUrl || '/').split('?')[0].split('#')[0]);
  const relative = decoded === '/' ? 'index.html' : decoded.replace(/^\/+/, '');
  const resolved = path.resolve(repoRoot, relative);
  const normalizedRoot = `${path.resolve(repoRoot)}${path.sep}`;
  if (resolved !== path.resolve(repoRoot) && !resolved.startsWith(normalizedRoot)) return null;
  return resolved;
}

async function handleRequest(repoRoot, req, res) {
  const filePath = resolveRequestPath(repoRoot, req.url);
  if (!filePath) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('403 Forbidden');
    return;
  }
  try {
    const stats = await stat(filePath);
    if (stats.isDirectory()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('404 Not Found (kein Verzeichnis-Listing)');
      return;
    }
    const mime = MIME_TYPES[path.extname(filePath).toLowerCase()] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': mime, 'Content-Length': stats.size });
    createReadStream(filePath).pipe(res);
  } catch (e) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('404 Not Found');
  }
}

export function createStaticServer(repoRoot = REPO_ROOT) {
  return createServer((req, res) => {
    handleRequest(repoRoot, req, res).catch((e) => {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end(`500 Internal Server Error: ${e.message}`);
    });
  });
}

if (/(^|\/)serve\.mjs$/.test(process.argv[1]?.replace(/\\/g, '/') ?? '')) {
  const port = parsePort(process.argv.slice(2));
  const server = createStaticServer(REPO_ROOT);
  server.listen(port, () => {
    console.log(`Server läuft: http://localhost:${port} (liefert ${REPO_ROOT}) — zum Beenden Strg+C.`);
  });
}

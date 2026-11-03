#!/usr/bin/env node
// S2-Nachtrag (Canvas-Taint unter file:// behoben) — Test für scripts/serve.mjs: Pfadauflösung
// (resolveRequestPath, insbesondere Directory-Traversal-Schutz) und ein echter HTTP-Smoke-Test.
//
// Aufruf: node scripts/test-serve.mjs

import path from 'node:path';
import { createStaticServer, resolveRequestPath } from './serve.mjs';

const REPO_ROOT = path.resolve(import.meta.dirname, '..');
let failures = 0;

function assertEqual(actual, expected, label) {
  if (actual === expected) console.log(`  ok   ${label}`);
  else { failures++; console.log(`  FAIL ${label}\n       erwartet: ${expected}\n       erhalten: ${actual}`); }
}
function assertTrue(cond, label) { assertEqual(Boolean(cond), true, label); }

console.log('== A) resolveRequestPath: normale Pfade ==');
{
  assertEqual(resolveRequestPath(REPO_ROOT, '/'), path.join(REPO_ROOT, 'index.html'), '"/" liefert index.html');
  assertEqual(resolveRequestPath(REPO_ROOT, '/index.html'), path.join(REPO_ROOT, 'index.html'), '"/index.html" liefert index.html');
  assertEqual(resolveRequestPath(REPO_ROOT, '/social-video-assets.js'), path.join(REPO_ROOT, 'social-video-assets.js'), 'Datei im Projekt-Wurzelverzeichnis');
  assertEqual(resolveRequestPath(REPO_ROOT, '/assets/teams/vfb-ulm.png'), path.join(REPO_ROOT, 'assets', 'teams', 'vfb-ulm.png'), 'Datei in Unterverzeichnis');
  assertEqual(resolveRequestPath(REPO_ROOT, '/index.html?foo=bar'), path.join(REPO_ROOT, 'index.html'), 'Query-String wird ignoriert');
  assertEqual(resolveRequestPath(REPO_ROOT, '/index.html#abschnitt'), path.join(REPO_ROOT, 'index.html'), 'Fragment wird ignoriert');
}

console.log('== B) resolveRequestPath: Directory-Traversal wird abgelehnt (liefert null) ==');
{
  assertEqual(resolveRequestPath(REPO_ROOT, '/../../../Windows/win.ini'), null, 'rohe "../"-Sequenzen');
  assertEqual(resolveRequestPath(REPO_ROOT, '/%2e%2e/%2e%2e/secrets'), null, 'URL-kodierte "../"-Sequenzen (%2e%2e)');
  assertEqual(resolveRequestPath(REPO_ROOT, '/..%2f..%2fetc'), null, 'URL-kodierter Schrägstrich in "../"');
  assertEqual(resolveRequestPath(REPO_ROOT, '/assets/../../outside.txt'), null, 'gemischter Pfad, der am Ende außerhalb des Projektordners läge');
}

console.log('== C) HTTP-Smoke-Test: echter Server, echte Anfragen ==');
{
  const server = createStaticServer(REPO_ROOT);
  // Keine Keep-Alive-Verbindungen zulassen: der globale fetch()-Agent (undici) hielte sonst eine Socket
  // offen und damit die Event-Loop am Leben, selbst nach server.close() — der Prozess würde nie beenden.
  server.keepAliveTimeout = 0;
  await new Promise((resolve) => server.listen(0, resolve));
  const port = server.address().port;
  const base = `http://127.0.0.1:${port}`;
  const noKeepAlive = { headers: { connection: 'close' } };
  try {
    const resIndex = await fetch(`${base}/`, noKeepAlive);
    assertEqual(resIndex.status, 200, '"/" antwortet mit 200');
    assertTrue((resIndex.headers.get('content-type') || '').includes('text/html'), '"/" liefert Content-Type text/html');
    await resIndex.text();

    const resAssets = await fetch(`${base}/social-video-assets.js`, noKeepAlive);
    assertEqual(resAssets.status, 200, 'social-video-assets.js antwortet mit 200');
    assertTrue((resAssets.headers.get('content-type') || '').includes('javascript'), 'social-video-assets.js liefert einen JavaScript-Content-Type');
    await resAssets.text();

    const resMissing = await fetch(`${base}/does-not-exist.xyz`, noKeepAlive);
    assertEqual(resMissing.status, 404, 'fehlende Datei antwortet mit 404');
    await resMissing.text();

    const resTraversal = await fetch(`${base}/%2e%2e/%2e%2e/secrets`, noKeepAlive);
    assertTrue([403, 404].includes(resTraversal.status), 'Traversal-Versuch über HTTP liefert 403/404, keine Datei außerhalb des Projektordners');
    await resTraversal.text();
  } finally {
    if (typeof server.closeAllConnections === 'function') server.closeAllConnections();
    await new Promise((resolve) => server.close(resolve));
  }
}

console.log('');
if (failures > 0) {
  console.log(`${failures} Test(s) fehlgeschlagen.`);
  process.exitCode = 1;
} else {
  console.log('Alle Tests erfolgreich.');
}

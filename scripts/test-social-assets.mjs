#!/usr/bin/env node
// S2e (Renderer-Werkstatt, Stufe 4) — Test für scripts/build-social-assets.mjs. Reine Node-Funktionen
// (extractSkyline/measureLogos), kein node:vm nötig — anders als die Browser-Renderer-Tests, weil dieses
// Skript selbst schon reines Node ist (liest index.html/assets/ direkt, kein Canvas/DOM).
//
// Aufruf: node scripts/test-social-assets.mjs

import { extractSkyline, measureLogos } from './build-social-assets.mjs';

let failures = 0;
function assertEqual(actual, expected, label) {
  const a = JSON.stringify(actual);
  const e = JSON.stringify(expected);
  if (a === e) console.log(`  ok   ${label}`);
  else { failures++; console.log(`  FAIL ${label}\n       erwartet: ${e}\n       erhalten: ${a}`); }
}
function assertTrue(cond, label) { assertEqual(Boolean(cond), true, label); }

const CONTRAST_THRESHOLD = 2.2; // identisch zur Konstante in build-social-assets.mjs
const DARK_LUMINANCE_THRESHOLD = 0.45;

// ═════════════════════════════════════════════════════════════════════════
console.log('== A) Skyline-Pfaddaten aus index.html ==');
{
  const skyline = await extractSkyline();
  assertTrue(typeof skyline.d === 'string' && skyline.d.length > 50, 'Pfaddaten gefunden, nicht trivial kurz');
  assertTrue(/^M[0-9]/.test(skyline.d), 'Pfad beginnt mit einem Move-Befehl (M)');
  assertEqual(skyline.viewBox, { w: 900, h: 260 }, 'viewBox entspricht der SVG-Quelle (900×260)');
}

// ═════════════════════════════════════════════════════════════════════════
console.log('== B) Logo-Messwerte + abgeleitete Behandlung, für jedes Team der Saison 25/26 ==');
{
  const { results, missing25, forceColorPreservingPaths } = await measureLogos();
  const bySeason25 = results.filter((r) => r.seasons?.has?.('25/26') || r.relPath === 'assets/vfb-ulm-logo-mark.png');
  assertTrue(bySeason25.length >= 7, `mindestens 7 Teams/Assets mit Saison-25/26-Bezug gemessen (gefunden: ${bySeason25.length})`);

  for (const r of bySeason25) {
    if (r.error) { failures++; console.log(`  FAIL ${r.key}: Messung fehlgeschlagen (${r.error})`); continue; }
    assertTrue(['original', 'aufhellen', 'neutrale-platte'].includes(r.treatment), `${r.key}: Behandlung liegt vor (${r.treatment})`);

    const forced = forceColorPreservingPaths.includes(r.relPath);
    if (forced) {
      assertEqual(r.treatment, 'original', `${r.key}: erzwungene Originalfarben (VfB-Ulm-Regel)`);
      continue;
    }
    if (r.treatment === 'original') {
      assertTrue(r.contrast >= CONTRAST_THRESHOLD, `${r.key}: "original" -> Kontrast (${r.contrast}) liegt über dem Schwellwert ${CONTRAST_THRESHOLD}`);
    } else if (r.treatment === 'neutrale-platte') {
      assertTrue(r.contrast < CONTRAST_THRESHOLD, `${r.key}: "neutrale-platte" -> Kontrast (${r.contrast}) liegt unter dem Schwellwert (das ist der Grund für die Behandlung)`);
    } else if (r.treatment === 'aufhellen') {
      assertTrue(r.contrast >= CONTRAST_THRESHOLD, `${r.key}: "aufhellen" -> Kontrast (${r.contrast}) war bereits über dem Schwellwert (Platte wäre nicht nötig gewesen)`);
      assertTrue(r.luminance < DARK_LUMINANCE_THRESHOLD, `${r.key}: "aufhellen" -> Luminanz (${r.luminance}) liegt unter der Dunkel-Schwelle ${DARK_LUMINANCE_THRESHOLD}`);
    }
    assertTrue(r.bbox && r.bbox.w > 0 && r.bbox.h > 0, `${r.key}: zugeschnittene Bounding-Box vorhanden (${r.bbox.w}×${r.bbox.h})`);
    assertTrue(r.alphaCoverage > 0 && r.alphaCoverage <= 1, `${r.key}: Alpha-Abdeckung im gültigen Bereich (${r.alphaCoverage})`);
  }

  console.log(`  info Saison 25/26 ohne lokal gecachtes Logo (ausgelassen, kein Raten): ${missing25.map((t) => t.key).join(', ') || '—'}`);
}

// ═════════════════════════════════════════════════════════════════════════
console.log('== C) VfB Ulm explizit (beide Assets) ==');
{
  const { results } = await measureLogos();
  const ulmMark = results.find((r) => r.relPath === 'assets/vfb-ulm-logo-mark.png');
  const ulmTeam = results.find((r) => r.relPath === 'assets/teams/vfb-ulm.png');
  assertTrue(!!ulmMark && !ulmMark.error, 'assets/vfb-ulm-logo-mark.png wurde gemessen');
  assertTrue(!!ulmTeam && !ulmTeam.error, 'assets/teams/vfb-ulm.png wurde gemessen');
  assertEqual(ulmMark?.treatment, 'original', 'vfb-ulm-logo-mark.png: Behandlung "original"');
  assertEqual(ulmTeam?.treatment, 'original', 'teams/vfb-ulm.png: Behandlung "original"');
}

console.log('');
if (failures > 0) {
  console.log(`${failures} Test(s) fehlgeschlagen.`);
  process.exitCode = 1;
} else {
  console.log('Alle Tests erfolgreich.');
}

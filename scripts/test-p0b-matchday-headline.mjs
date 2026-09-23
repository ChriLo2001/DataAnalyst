#!/usr/bin/env node
// P0b-Fix 10 — Test für die Kernaussage der Spieltag-Detailseite (rMatchdayDetailPage): Sind noch
// Ulm-Spiele des Spieltags offen, lautet sie "Spieltag N bisher: X Punkte, Tordifferenz ±Y.", sonst
// unverändert "Spieltag N: X Punkte, Tordifferenz ±Y.". Maßgeblich ist AUSSCHLIESSLICH
// ulmGames.length - playedGames.length (offene Ulm-Spiele) — NICHT der allgemeine Matchday-Status
// (der ist auch "Unvollständig", wenn nur Spiele anderer Teams fehlen).
//
// Die echte rMatchdayDetailPage und die echten Helper (matchdayUlmGames, isGamePlayed →
// classifyGameForStats, buildMatchdays, normalizeGame, compareGamesChronologically …) werden
// unverändert aus dem index.html-Text geschnitten und in node:vm ausgeführt. Ersetzt sind nur
// getSeasonMatchdays (liefert die mit dem echten buildMatchdays gebildeten Spieltage), die
// ui…-Komponenten (fangen die Kernaussage ab) und die Kodierungs-Helper repairMojibake /
// fixKnownUiTransliterations (Identität; die Daten enthalten hier keine Mojibake-Namen).
// Echte Daten: season-data/*.json, wie die App sie über normalizeGame() in die Spielobjekte
// überführt (home_goals/guest_goals). Liest nur, schreibt nichts.
//
// Aufruf: node scripts/test-p0b-matchday-headline.mjs

import { readFile } from 'node:fs/promises';
import crypto from 'node:crypto';
import path from 'node:path';
import vm from 'node:vm';

const REPO_ROOT = path.resolve(import.meta.dirname, '..');
let failures = 0;

function assertEqual(actual, expected, label) {
  const a = JSON.stringify(actual);
  const e = JSON.stringify(expected);
  if (a === e) {
    console.log(`  ok   ${label}`);
  } else {
    failures++;
    console.log(`  FAIL ${label}\n       erwartet: ${e}\n       erhalten: ${a}`);
  }
}
function assertTrue(cond, label) {
  assertEqual(Boolean(cond), true, label);
}

const html = (await readFile(path.join(REPO_ROOT, 'index.html'), 'utf8')).replace(/\r\n/g, '\n');
const sha = (s) => crypto.createHash('sha256').update(s).digest('hex').slice(0, 16);
function fnSource(name, src = html) {
  const m = new RegExp(`(^|\\n)function ${name}\\(`).exec(src);
  if (!m) throw new Error(`Funktion nicht gefunden: ${name}`);
  const from = m.index + m[1].length;
  return src.slice(from, src.indexOf('\n}', from) + 2);
}
function winSource(name) {
  const from = html.indexOf(`window.${name}=`);
  if (from === -1) throw new Error(`window.${name} nicht gefunden`);
  return html.slice(from, html.indexOf('\n};', from) + 3);
}
const HELPERS = [
  'cleanText', 'normalizeTeamName', 'isUlmTeamName', 'detectUlmSide', 'gameStatusText', 'gameScore', 'isYouthGame',
  'isGameAtOrBeforeAsOf', 'classifyGameForStats', 'isGamePlayed', 'compareGamesChronologically', 'buildMatchdays',
  'normalizeGame', 'matchdayUlmGames', 'matchdayGameCardHtml',
];
const aliasStart = html.indexOf('const ULM_TEAM_ALIASES=[');
const ULM_ALIASES_SRC = html.slice(aliasStart, html.indexOf('];', aliasStart) + 2);
const STATUS_LABELS_SRC = /^const MATCHDAY_STATUS_LABELS=.*$/m.exec(html)[0];

// Baut eine vm-Umgebung mit der echten rMatchdayDetailPage aus `src` (Original oder Mutante).
function makeEnv(src) {
  const code = [
    'const repairMojibake=v=>v;const fixKnownUiTransliterations=v=>v;',
    ULM_ALIASES_SRC,
    'const ULM_TEAM_ALIAS_KEYS=ULM_TEAM_ALIASES.map(normalizeTeamName);',
    'const detectSide=g=>detectUlmSide(g);',
    STATUS_LABELS_SRC,
    ...HELPERS.map((n) => fnSource(n, src)),
    fnSource('rMatchdayDetailPage', src),
  ].join('\n');
  let last = null;
  const ctx = vm.createContext({
    console,
    SEASON_CONFIG: { 'T': { label: 'Testsaison' } },
    MDS: {},
    getSeasonMatchdays: (k) => ctx.MDS[k] || [],
    uiObjektseite: (o) => { last = o; return '<shell/>'; },
    uiNotiz: (t) => `<note>${t}</note>`,
    uiHinweisKarte: () => '<card/>',
    overviewRankChangeTile: () => null,
    formatDateDE: (d) => d,
    escAttr: (s) => String(s),
    escHtml: (s) => String(s),
  });
  vm.runInContext(code, ctx);
  return {
    ctx,
    // Baut die Spieltage aus rohen Spielen (echtes buildMatchdays) und liefert Kernaussage + Status
    headline(seasonKey, games, number) {
      ctx.MDS[seasonKey] = vm.runInContext(
        `(g=>buildMatchdays({season:${JSON.stringify(seasonKey)},games:g}))`, ctx,
      )(games);
      last = null;
      const page = vm.runInContext('rMatchdayDetailPage', ctx)(seasonKey, number);
      const md = ctx.MDS[seasonKey].find((m) => m.number === number);
      return { headline: last?.headline ?? null, status: md?.status ?? null, page };
    },
    openUlm(seasonKey, number) {
      const md = ctx.MDS[seasonKey].find((m) => m.number === number);
      return vm.runInContext(
        `(m=>{const u=matchdayUlmGames(m);return{ulm:u.length,played:u.filter(isGamePlayed).length}})`, ctx,
      )(md);
    },
  };
}

// ── Synthetische Spiele ─────────────────────────────────────────────────
let gid = 1000;
function game(day, home, guest, o = {}) {
  const played = o.hg !== undefined;
  return {
    id: ++gid, game_number: String(gid), date: o.date || '2026-01-10', start_time: o.time || '11:00',
    game_day: { game_day_number: day }, home_team_name: home, guest_team_name: guest,
    home_goals: played ? String(o.hg) : null, guest_goals: played ? String(o.gg) : null,
    ended: o.ended ?? played, started: played, events: played && !o.noEvents ? [{ event_type: 'goal' }] : [],
    notice_type: o.notice || null,
  };
}
const ULM = 'VfB Ulm';
const other = (day, ended = true, i = 0) => game(day, 'Team A', 'Team B', ended
  ? { hg: 5, gg: 4, time: `1${i}:30` } : { time: `1${i}:30` });

const SYNTH = {
  // A: alle 2 Ulm-Spiele gespielt, alle Spiele beendet -> abgeschlossen
  A: { day: 1, games: [game(1, ULM, 'Team B', { hg: 8, gg: 3 }), game(1, 'Team C', ULM, { hg: 7, gg: 9, time: '12:15' }), other(1, true, 3)] },
  // B: 3 Ulm-Spiele, 2 gespielt (Sieg 8:3, Niederlage 2:5), 1 verschoben ohne Ergebnis
  B: { day: 1, games: [game(1, ULM, 'Team B', { hg: 8, gg: 3 }), game(1, 'Team C', ULM, { hg: 5, gg: 2, time: '12:15' }), game(1, ULM, 'Team D', { time: '13:30', notice: 'Postponed' })] },
  // C: Status "Unvollständig" nur wegen eines Spiels ANDERER Teams, alle Ulm-Spiele gespielt (Unentschieden 4:4, Niederlage 3:5)
  C: { day: 3, games: [game(3, ULM, 'Team B', { hg: 4, gg: 4 }), game(3, 'Team C', ULM, { hg: 5, gg: 3, time: '12:15' }), other(3, false, 4)] },
  // C2: Status "Abgeschlossen" (alle ended=true), aber ein Ulm-Spiel ohne Ergebnis/Events zählt nicht als gespielt
  C2: { day: 5, games: [game(5, ULM, 'Team B', { hg: 6, gg: 1 }), game(5, 'Team C', ULM, { time: '12:15', ended: true })] },
  // D: kein Ulm-Spiel gespielt
  D: { day: 2, games: [game(2, ULM, 'Team B', { time: '11:00' }), game(2, 'Team C', ULM, { time: '12:15' }), other(2, false, 3)] },
  // F: einzelnes Unentschieden -> "+0"
  F: { day: 4, games: [game(4, ULM, 'Team B', { hg: 3, gg: 3 }), other(4, true, 3)] },
};

// ── Echte Saisondaten (App-Form über normalizeGame) ─────────────────────
const SEASONS = ['21/22', '22/23', '23/24', '24/25', '25/26'];
const realGames = {};
for (const s of SEASONS) {
  const d = JSON.parse((await readFile(path.join(REPO_ROOT, 'season-data', `${s.replace('/', '-')}.json`), 'utf8')).replace(/^﻿/, ''));
  realGames[s] = d.games;
}

// Alle Prüfungen als Liste (label, ok), damit dieselben Prüfungen gegen Mutanten laufen können.
function runChecks(src) {
  const env = makeEnv(src);
  const res = [];
  const chk = (label, ok) => res.push({ label, ok: Boolean(ok) });
  const eq = (label, actual, expected) => chk(label, JSON.stringify(actual) === JSON.stringify(expected));
  const s = (k) => { const c = SYNTH[k]; return env.headline('T', c.games, c.day); };
  let r;
  r = s('A'); eq('A: vollständiger Spieltag -> Text unverändert', r.headline, 'Spieltag 1: 6 Punkte, Tordifferenz +7.'); eq('A: Status abgeschlossen', r.status, 'abgeschlossen');
  r = s('B'); eq('B: 2 von 3 Ulm-Spielen gespielt -> "bisher"', r.headline, 'Spieltag 1 bisher: 3 Punkte, Tordifferenz +2.'); eq('B: Status unvollstaendig', r.status, 'unvollstaendig');
  r = s('C'); eq('C: Status unvollständig, 0 offene Ulm-Spiele -> kein "bisher"', r.headline, 'Spieltag 3: 1 Punkte, Tordifferenz -2.'); eq('C: Status unvollstaendig', r.status, 'unvollstaendig');
  r = s('C2'); eq('C2: Status abgeschlossen, aber 1 offenes Ulm-Spiel -> "bisher"', r.headline, 'Spieltag 5 bisher: 3 Punkte, Tordifferenz +5.'); eq('C2: Status abgeschlossen', r.status, 'abgeschlossen');
  r = s('D'); eq('D: kein Ulm-Spiel gespielt -> "steht noch aus", kein "bisher"', r.headline, 'Spieltag 2 steht noch aus (Geplant).'); eq('D: Status geplant', r.status, 'geplant');
  r = s('F'); eq('F: Unentschieden -> 1 Punkt, Tordifferenz +0 (unverändert)', r.headline, 'Spieltag 4: 1 Punkte, Tordifferenz +0.');
  // Zusatz: Seitenaufbau bleibt (Karten für Ulm-Spiele, Zurück-Zeile) — Kernaussage ist die einzige Änderung
  r = s('B'); chk('B: Zurück-Zeile und Themenkarte "noch nicht ausgetragen" weiterhin vorhanden', r.page.includes('Zurück zur Spieltagsübersicht') && r.page.includes('noch nicht ausgetragen'));

  // Echte Daten
  const real = (season, n) => {
    const games = realGames[season].map((g) => vm.runInContext('normalizeGame', env.ctx)(g));
    return { ...env.headline(season, games, n), ...env.openUlm(season, n) };
  };
  const EXPECT = [
    ['24/25', 1, 'Spieltag 1 bisher: 3 Punkte, Tordifferenz +2.', 1],
    ['24/25', 3, 'Spieltag 3 bisher: 6 Punkte, Tordifferenz +6.', 1],
    ['24/25', 4, 'Spieltag 4 bisher: 0 Punkte, Tordifferenz -21.', 1],
    ['25/26', 2, 'Spieltag 2 bisher: 6 Punkte, Tordifferenz +7.', 1],
    ['21/22', 11, 'Spieltag 11: 0 Punkte, Tordifferenz -25.', 0],
    ['25/26', 1, 'Spieltag 1: 3 Punkte, Tordifferenz +4.', 0],
    ['22/23', 2, 'Spieltag 2: 0 Punkte, Tordifferenz -24.', 0],
    ['25/26', 3, 'Spieltag 3: 3 Punkte, Tordifferenz +5.', 0],
  ];
  for (const [season, n, text, open] of EXPECT) {
    const x = real(season, n);
    eq(`real ${season} MD${n}: Kernaussage`, x.headline, text);
    eq(`real ${season} MD${n}: offene Ulm-Spiele (ulm - gespielt)`, x.ulm - x.played, open);
  }
  eq('real 21/22 MD11: Status unvollstaendig (Gegenprobe: trotzdem kein "bisher")', real('21/22', 11).status, 'unvollstaendig');
  eq('real 25/26 MD1: Status unvollstaendig (Gegenprobe: trotzdem kein "bisher")', real('25/26', 1).status, 'unvollstaendig');
  eq('real 22/23 MD2: Status abgeschlossen', real('22/23', 2).status, 'abgeschlossen');
  eq('real 25/26 MD3: Status abgeschlossen', real('25/26', 3).status, 'abgeschlossen');

  // Vollscan: "bisher" genau dann, wenn (offene Ulm-Spiele > 0 UND mind. ein Ulm-Spiel gespielt) — nie über den Status
  const withBisher = [];
  let scanned = 0, ruleViolations = 0, statusOnlyDiffers = 0;
  for (const season of SEASONS) {
    const games = realGames[season].map((g) => vm.runInContext('normalizeGame', env.ctx)(g));
    env.headline(season, games, -1);
    for (const md of env.ctx.MDS[season].filter((m) => m.number !== null)) {
      const x = { ...env.headline(season, games, md.number), ...env.openUlm(season, md.number) };
      const expectBisher = x.played > 0 && x.ulm - x.played > 0;
      const hasBisher = / bisher:/.test(x.headline || '');
      scanned++;
      if (hasBisher !== expectBisher) ruleViolations++;
      if (hasBisher) withBisher.push(`${season} MD${md.number}`);
      if ((x.status !== 'abgeschlossen') !== hasBisher) statusOnlyDiffers++;
    }
  }
  chk('Vollscan: alle Spieltage aller Saisonen geprüft (>= 40)', scanned >= 40);
  eq('Vollscan: "bisher" exakt nach Formel ulm - gespielt > 0 (keine Abweichung)', ruleViolations, 0);
  eq('Vollscan: genau die vier bekannten Spieltage tragen "bisher"', withBisher, ['24/25 MD1', '24/25 MD3', '24/25 MD4', '25/26 MD2']);
  chk('Vollscan: Status allein würde anders entscheiden (Beweis: Status ist nicht maßgeblich)', statusOnlyDiffers > 0);
  return res;
}

console.log('== Kernaussage der Spieltag-Detailseite (echter Code) ==');
{
  const results = runChecks(html);
  for (const r of results) assertTrue(r.ok, r.label);
}

console.log('== Quelltext: Entscheidung über ulmGames.length - playedGames.length, nicht über den Status ==');
{
  const detail = fnSource('rMatchdayDetailPage');
  const norm = detail.replace(/\s+/g, ' ');
  assertTrue(detail.includes('const playedGames=ulmGames.filter(isGamePlayed);\n  const openUlmGames=ulmGames.length-playedGames.length;\n'), 'openUlmGames steht direkt nach playedGames und ist ulmGames.length-playedGames.length');
  assertEqual((detail.match(/openUlmGames/g) || []).length, 2, 'openUlmGames: genau eine Definition und eine Verwendung');
  assertTrue(norm.includes("Spieltag ${number}${openUlmGames>0?' bisher':''}: ${points} Punkte, Tordifferenz ${gf-ga>=0?'+':''}${gf-ga}."), 'Kernaussage: "bisher" nur bei openUlmGames>0, Rest der Formulierung wie bisher');
  assertTrue(norm.includes('`Spieltag ${number} steht noch aus (${statusLabel}).`'), '"steht noch aus (…)"-Zweig unverändert');
  assertTrue(/const kernaussage=playedGames\.length\n {4}\?/.test(detail), 'Bedingung des Zweigs bleibt playedGames.length');
  const bisherLine = detail.split('\n').find((l) => l.includes("' bisher'"));
  assertTrue(bisherLine && !/status|statusLabel|ended/.test(bisherLine.replace(/`Spieltag[^`]*`/, (m) => m.replace(/\$\{number\}|\$\{openUlmGames>0\?' bisher':''\}|\$\{points\}|\$\{gf-ga>=0\?'\+':''\}|\$\{gf-ga\}/g, ''))), 'Die "bisher"-Zeile verwendet weder Matchday-Status noch ended');
  assertEqual(sha(detail.replace('\n  const openUlmGames=ulmGames.length-playedGames.length;', '').replace("${openUlmGames>0?' bisher':''}", '')), '247d6f9b129d4adc', 'Ohne die beiden neuen Fragmente ist rMatchdayDetailPage byte-identisch zum Stand davor (nur diese Änderung)');
  assertTrue(!/setState|localStorage|sessionStorage|indexedDB|fetch\(|window\.|document\./.test(detail), 'rMatchdayDetailPage: kein setState, Storage, Netzwerk, DOM');
  assertTrue(!/^\s*(let|var)\s+\w*[Oo]pen/m.test(html.slice(html.indexOf('function rMatchdayDetailPage'), html.indexOf('function rMatchdayPage'))), 'keine neue globale/äußere Variable im Spieltagsbereich');
}

console.log('== Mutationsnachweis (die Prüfungen schlagen bei veränderter Logik an) ==');
{
  const mutate = (label, from, to) => {
    assertEqual(html.split(from).length - 1, 1, `Mutation "${label}": Ersetzungsstelle kommt genau einmal vor`);
    const failed = runChecks(html.replace(from, to)).filter((r) => !r.ok).length;
    assertTrue(failed > 0, `Mutation "${label}" wird erkannt (${failed} Prüfungen schlagen an)`);
  };
  mutate('"bisher" entfernt', "${openUlmGames>0?' bisher':''}", '');
  mutate('immer "bisher"', "${openUlmGames>0?' bisher':''}", "${true?' bisher':''}");
  mutate('Status statt offene Ulm-Spiele', "${openUlmGames>0?' bisher':''}", "${matchday.status!=='abgeschlossen'?' bisher':''}");
  mutate('offene Ulm-Spiele immer 0', 'const openUlmGames=ulmGames.length-playedGames.length;', 'const openUlmGames=ulmGames.length-ulmGames.length;');
  mutate('falsche Wortstellung', "Spieltag ${number}${openUlmGames>0?' bisher':''}:", "Spieltag ${number}:${openUlmGames>0?' bisher':''}");
  mutate('Punkte verändert', 'points+=us>os?3:us<os?0:1;', 'points+=us>os?3:us<os?1:1;');
  mutate('Tordifferenz verändert', "${gf-ga>=0?'+':''}${gf-ga}.`\n    :`Spieltag", "${gf-ga>=0?'+':''}${ga-gf}.`\n    :`Spieltag");
  // Stand vor dem Fix (ohne die Änderung) muss ebenfalls anschlagen
  const before = html.replace("\n  const openUlmGames=ulmGames.length-playedGames.length;", '').replace("${openUlmGames>0?' bisher':''}", '');
  assertTrue(runChecks(before).filter((r) => !r.ok).length > 0, 'Stand vor dem Fix (ohne "bisher") schlägt an');
}

console.log('== Unveränderte Bestandteile (Quelltext-Fingerprints) ==');
{
  const pinned = {
    matchdayUlmGames: ['fn', '966c0c7bd06f8678'], matchdayGameCardHtml: ['fn', '848b2810ff229d0f'], isGamePlayed: ['fn', '1653d9f28e9a79f9'],
    classifyGameForStats: ['fn', '72aa0c85c70824e0'], normalizeGame: ['fn', '6cfce341c7770cfb'], buildMatchdays: ['fn', '4c25a4b71e44a455'],
    getSeasonMatchdays: ['fn', 'b2b355055a74fa77'], gameScore: ['fn', 'dbc449c9d328bb2d'], compareGamesChronologically: ['fn', '78671745e559f76a'],
    rMatchdayPage: ['fn', '6ae63d600fc7f61f'], rMatchdayTimelinePage: ['fn', 'de87c6c74645849f'], rMatchdayTimelineRow: ['fn', '66a5a41878bade8e'],
    uiObjektseite: ['fn', '390b5f722db20998'], overviewRankChangeTile: ['fn', 'e31f57e9e108d871'],
    rContextBar: ['fn', '8efff4b4a0d75054'], rMainNav: ['fn', '5d960fde923cc354'], rMainNavBottom: ['fn', '1ade76645df4da89'], rIaShell: ['fn', '16a2d20a6a21ed7e'],
    syncHashFromState: ['fn', '588739234de47a4b'], computeCurrentAppHash: ['fn', '3c9bad5a17ccbdfe'], parseAppHash: ['fn', 'a41f0760de39e83c'], saveLastView: ['fn', '154e4e3394c4f032'],
    openMatchdayTimeline: ['win', '0baa2da1fa964990'], openMatchday: ['win', 'bca49420ab804f79'],
  };
  for (const [name, [kind, hash]] of Object.entries(pinned)) assertEqual(sha(kind === 'fn' ? fnSource(name) : winSource(name)), hash, `${name} unverändert`);
  assertEqual(sha(STATUS_LABELS_SRC), '6a3b048a7c99b4bf', 'MATCHDAY_STATUS_LABELS unverändert');
  assertEqual(sha(/^const HASH_GLOBAL_PAGES=.*$/m.exec(html)[0]), '8381155d5a8c43a4', 'HASH_GLOBAL_PAGES unverändert');
  const a = html.indexOf('<style>');
  const style = html.slice(a, html.indexOf('</style>', a));
  assertEqual([sha(style), style.length], ['f65fabe2ad16f6a4', 170218], 'CSS-Block unverändert (kein CSS in diesem Fix)');
}

console.log('');
if (failures > 0) {
  console.log(`${failures} Test(s) fehlgeschlagen.`);
  process.exitCode = 1;
} else {
  console.log('Alle Tests erfolgreich.');
  process.exitCode = 0;
}

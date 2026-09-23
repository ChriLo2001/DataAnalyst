#!/usr/bin/env node
// P0b-Fix 7 — Test für die Kartenbildung der Übersicht (Spezifikation 6.2 Punkt 5 und 6.11:
// "Keine leere Karte in keinem Datenzustand"; Entscheidung: Karten ohne verwertbaren Inhalt werden
// AUSGEBLENDET, keine Ersatz-Notiz).
//
// Die echten Funktionen (buildOverviewCards, detectOverviewPhase, alle overview…Html-Kartenfunktionen,
// rOverviewPage, rMatchdayTimelinePage) werden unverändert aus dem index.html-Text geschnitten und in
// node:vm ausgeführt. Ersetzt sind nur die Datenquellen (getSeasonMatchdays, getSeasonStatsAsOf, SEASONS,
// getTeamAllTimeRecords) und die ui…-Komponenten (feste Marker-Ausgaben, damit der Kartentext geprüft
// werden kann). Geprüft werden die Datenzustände: Saisonbeginn ohne Spiele (ohne und mit angesetzten
// Spielen), Saison mit Spielen (alle Phasen) und unvollständiger Spieltag; dazu die Spieltage-Seite ohne
// Spieltage. Liest index.html nur lesend, schreibt nichts.
//
// Aufruf: node scripts/test-p0b-overview-cards.mjs

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
const stripComments = (s) => s.split('\n').filter((l) => !l.trim().startsWith('//') && !l.trim().startsWith('*') && !l.trim().startsWith('/*')).join('\n');
function fnSource(name) {
  const m = new RegExp(`(^|\\n)function ${name}\\(`).exec(html);
  if (!m) throw new Error(`Funktion nicht gefunden: ${name}`);
  const from = m.index + m[1].length;
  return html.slice(from, html.indexOf('\n}', from) + 2);
}
function winSource(name) {
  const from = html.indexOf(`window.${name}=`);
  if (from === -1) throw new Error(`window.${name} nicht gefunden`);
  return html.slice(from, html.indexOf('\n};', from) + 3);
}
const lineOf = (re) => re.exec(html)?.[0] ?? (() => { throw new Error(`Zeile fehlt: ${re}`); })();

const CARD_FUNCTIONS = ['overviewMatchdayStartMs', 'overviewMatchdayEndMs', 'matchdayAsOfCutoff', 'formatDateDE', 'detectOverviewPhase', 'overviewOpponentLabel', 'overviewLastMatchdayText', 'overviewNextMatchdayHtml', 'overviewCompactTableHtml', 'overviewFormHtml', 'overviewSeasonBilanzHtml', 'overviewSeasonAwardHtml', 'overviewRecordHtml', 'overviewCrossSeasonTrendHtml', 'overviewOpponentPreviewHtml', 'overviewMatchcenterLinkHtml', 'overviewLineupLinkHtml', 'buildOverviewCards', 'rOverviewPage', 'rMatchdayTimelineRow', 'rMatchdayTimelinePage'];
const overviewSource = CARD_FUNCTIONS.map(fnSource).join('\n');
const consts = [lineOf(/^const OVERVIEW_PHASE_LABELS=.*$/m), lineOf(/^const OVERVIEW_SESSION_DATA_STATE=.*$/m), lineOf(/^const MATCHDAY_STATUS_LABELS=.*$/m)].join('\n');

// ── Fixtures ────────────────────────────────────────────────────────────
const g = (id, date, ended, hg = 0, gg = 0, time = '12:00') => ({ id, date, start_time: time, ended, home_goals: ended ? hg : null, guest_goals: ended ? gg : null });
const md = (number, date, status, games) => ({ number, date, status, games, teamGames: { 'VfB Ulm': games.map((x) => x.id), 'FBC Heidelberg': games.map((x) => x.id) } });
const ulmRow = { rank: 3, name: 'VfB Ulm', w: 4, d: 1, l: 2, gf: 30, ga: 20, pts: 13, sp: 7 };
const table = [{ rank: 1, name: 'A', pts: 20 }, { rank: 2, name: 'B', pts: 15 }, ulmRow];

function boot({ matchdays = [], standings = [], statGames = [], players = [], events = {}, records = { bestWin: { us: 12, os: 4, opp: 'DJK', seasonKey: '25/26' } }, otherSeasonStandings = 0, seasonKey = '25/26', previewCard = true } = {}) {
  const SEASONS = { [seasonKey]: { data: { players, events, standings } } };
  for (let i = 0; i < otherSeasonStandings; i++) SEASONS[`2${i}/2${i + 1}`] = { data: { standings: [{ rank: 2 + i, name: 'VfB Ulm', pts: 1 }] } };
  const SEASON_CONFIG = { [seasonKey]: { label: '2025/26' } };
  for (const k of Object.keys(SEASONS)) SEASON_CONFIG[k] = SEASON_CONFIG[k] || { label: k };
  const calls = { setState: 0, storage: 0 };
  const win = {};
  for (const k of ['localStorage', 'sessionStorage', 'indexedDB']) Object.defineProperty(win, k, { get() { calls.storage++; return null; } });
  const ctx = vm.createContext({
    window: win, console, SEASONS, SEASON_CONFIG, S: {}, UI_OBJEKTSEITE_MAX_TILES: 4,
    setState: () => { calls.setState++; },
    getSeasonMatchdays: () => matchdays,
    getSeasonStatsAsOf: () => ({ standings, statGamesData: statGames }),
    getTeamAllTimeRecords: () => records,
    isUlmTeamName: (n) => /ulm/i.test(String(n)),
    detectSide: () => 'home',
    isGamePlayed: (x) => x.ended === true,
    compareGamesChronologically: (a, b) => (`${a.date}${String(a.id).padStart(4, '0')}` < `${b.date}${String(b.id).padStart(4, '0')}` ? -1 : 1),
    escHtml: (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;'),
    escAttr: (s) => String(s).replace(/"/g, '&quot;'),
    overviewRankChangeTile: () => null,
    // ui…-Komponenten: feste Marker mit dem Klartext der Karte
    uiNotiz: (t) => `<div class="ui-notiz">${t}</div>`,
    uiHinweisKarte: ({ observation }) => `<div class="ui-hinweis">${observation}</div>`,
    uiVerlauf: ({ points }) => `<svg class="ui-verlauf" data-n="${points.length}"></svg>`,
    uiRangliste: ({ items }) => `<div class="ui-rangliste" data-n="${items.length}"></div>`,
    uiObjektseite: ({ title, headline, tiles }) => `<div class="ui-shell" data-title="${title}" data-tiles="${(tiles || []).length}">${headline}</div>`,
    rSeasonDataPreviewCard: () => (previewCard ? '<div class="ia-overview-card" data-preview>Spieldaten-Vorschau</div>' : ''),
  });
  vm.runInContext(consts, ctx);
  vm.runInContext(overviewSource, ctx);
  const run = (code) => vm.runInContext(code, ctx);
  const cards = (now, options) => run(`buildOverviewCards('${seasonKey}',new Date('${now}'),${JSON.stringify(options || {})})`);
  return { ctx, run, calls, cards, page: (now) => run(`rOverviewPage('${seasonKey}')`), seasonKey };
}
const textOf = (h) => String(h).replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
// Leerzustands-Formulierungen aus der Übersicht (vor Fix 7 als Karteninhalt vorhanden)
const EMPTY_STATE = /liegt noch keine?n?\b|liegen noch nicht genügend|liegen noch keine|noch nicht genügend|nicht genügend|noch kein abgeschlossener/i;
const EMPTY_ONLY = (card) => EMPTY_STATE.test(textOf(card));
const kinds = (cards) => cards.map((c) => (/data-preview/.test(c) ? 'preview' : /ui-rangliste/.test(c) ? 'tabelle' : /ui-verlauf/.test(c) ? 'verlauf' : /Saisonbilanz/.test(c) ? 'bilanz' : /Bester Scorer/.test(c) ? 'scorer' : /Höchster Sieg/.test(c) ? 'rekord' : /Nächster Spieltag/.test(c) ? 'naechster' : /Nächster Gegner/.test(c) ? 'gegner' : /Matchcenter/.test(c) ? 'matchcenterLink' : /Aufstellung eintragen/.test(c) ? 'lineupLink' : /wurde am .* ausgetragen/.test(c) ? 'letzterSpieltag' : /noch nicht implementiert|folgt mit den Liga/.test(c) ? 'platzhalter' : /kein weiterer Spieltag terminiert/.test(c) ? 'keinNaechster' : `?${textOf(c).slice(0, 40)}`));

// ── A: Saisonbeginn ohne Spiele ────────────────────────────────────────
console.log('== A: Saisonbeginn ohne Spiele (keine Spieltage, keine Daten) ==');
{
  const a = boot();
  const c = a.cards('2026-08-01T12:00:00');
  assertEqual(c.phase, 'saisonpause', 'Vorbedingung: Phase Saisonpause (keine offenen Spiele)');
  assertEqual(c.kernaussage, 'Für diese Saison liegt noch kein abgeschlossener Spieltag vor.', 'die Aussage bleibt in der Kernaussage erhalten (Information geht nicht verloren)');
  assertEqual(kinds(c.themenkarten), ['rekord'], 'nur die Karte mit eigener Aussage bleibt (Höchster Sieg, Alltime); keine Bilanz-, Scorer- oder Entwicklungskarte');
  assertTrue(!c.themenkarten.some(EMPTY_ONLY), 'keine Karte mit einem "keine Daten"-Leerzustand als Inhalt');
  assertTrue(c.themenkarten.every((x) => textOf(x).length > 0), 'keine Karte ohne Text');
  const page = a.page();
  assertTrue(!/liegt noch keine|liegen noch nicht/.test(textOf(page.replace(/<div class="ui-shell"[^>]*>[^<]*<\/div>/, ''))), 'gerenderte Seite (ohne Kopf/Kernaussage): kein Leerzustandstext');
  assertTrue(/<div class="ia-overview-cards">/.test(page), 'Kartenraster wird gerendert, solange mindestens eine Karte vorhanden ist');
  // auch ohne Alltime-Rekord: alle Karten entfallen, das Raster wird nicht gerendert
  const b = boot({ records: null });
  const cb = b.cards('2026-08-01T12:00:00');
  assertEqual(cb.themenkarten, [], 'ohne Alltime-Rekord: keine Themenkarten');
  const pageB = b.page();
  assertTrue(!/ia-overview-cards/.test(pageB) && /ui-shell/.test(pageB), 'kein leeres Kartenraster; Kopf mit Kernaussage bleibt');
  assertEqual(b.run('overviewSeasonBilanzHtml("25/26")'), '', 'Bilanz ohne Ulm-Zeile: leerer String');
  assertEqual(b.run('overviewSeasonAwardHtml("25/26")'), '', 'Top-Scorer ohne Scorer: leerer String');
  assertEqual(b.run('overviewCompactTableHtml("25/26")'), '', 'Tabelle ohne Tabelleneinträge: leerer String');
  assertEqual(b.run('overviewFormHtml("25/26")'), '', 'Formkurve ohne Spiele: leerer String');
  assertEqual(b.run('overviewRecordHtml()'), '', 'Rekord ohne Alltime-Rekord: leerer String');
  assertEqual(b.run('overviewCrossSeasonTrendHtml()'), '', 'Saisonentwicklung ohne mindestens 2 Saisons: leerer String');
}

console.log('== A2: Saisonbeginn mit angesetzten, noch nicht gespielten Spielen ==');
{
  const planned = [md(1, '2026-09-12', 'geplant', [g(1, '2026-09-12', false), g(2, '2026-09-12', false, 0, 0, '15:00')]), md(2, '2026-09-26', 'geplant', [g(3, '2026-09-26', false)])];
  const a = boot({ matchdays: planned });
  const under = a.cards('2026-08-20T12:00:00');
  assertEqual(under.phase, 'unterDerWoche', 'Vorbedingung: Phase "Unter der Woche" (nächster Spieltag in > 5 Tagen)');
  assertEqual(kinds(under.themenkarten), ['platzhalter', 'platzhalter', 'platzhalter', 'naechster'], 'unterDerWoche: keine Formkurve, keine "letzter Spieltag"-Karte; Platzhalter und nächster Spieltag bleiben');
  assertTrue(!under.themenkarten.some(EMPTY_ONLY), 'unterDerWoche: keine Leerzustandskarte');
  const before = a.cards('2026-09-10T12:00:00');
  assertEqual(before.phase, 'vorDemSpieltag', 'Vorbedingung: Phase "Vor dem Spieltag"');
  assertEqual(kinds(before.themenkarten), ['gegner', 'matchcenterLink', 'lineupLink'], 'vorDemSpieltag: Vorschau, Matchcenter- und Lineup-Links bleiben; keine Formkurve, keine Tabelle, keine "letzter Spieltag"-Karte');
  assertTrue(!before.themenkarten.some(EMPTY_ONLY), 'vorDemSpieltag: keine Leerzustandskarte');
  assertTrue(before.themenkarten.every((x) => textOf(x).length > 0), 'vorDemSpieltag: alle Karten haben Text');
}

// ── B: Saison mit Spielen ──────────────────────────────────────────────
console.log('== B: Saison mit Spielen: relevante Karten bleiben, Reihenfolge unverändert ==');
{
  const ended = [
    md(1, '2026-03-01', 'abgeschlossen', [g(1, '2026-03-01', true, 3, 1), g(2, '2026-03-01', true, 2, 2, '15:00')]),
    md(2, '2026-03-08', 'abgeschlossen', [g(3, '2026-03-08', true, 1, 0), g(4, '2026-03-08', true, 0, 2, '15:00')]),
  ];
  const players = [{ key: 'p1', label: 'Christian Loser', seasonScorerRank: 1 }];
  const events = { p1: [{ type: 'Tor' }, { type: 'Tor' }, { type: 'Vorlage' }] };
  const full = { standings: table, statGames: ended.flatMap((m) => m.games), players, events, otherSeasonStandings: 2 };
  const pause = boot({ ...full, matchdays: ended });
  const cPause = pause.cards('2026-08-01T12:00:00');
  assertEqual(cPause.phase, 'saisonpause', 'Vorbedingung: Saisonpause');
  assertEqual(kinds(cPause.themenkarten), ['bilanz', 'scorer', 'rekord', 'verlauf'], 'Saisonpause: Bilanz, Scorer, Rekord, Entwicklung in unveränderter Reihenfolge');
  assertEqual(textOf(cPause.themenkarten[0]), 'Saisonbilanz: 4 Siege, 1 Unentschieden, 2 Niederlagen, 30:20 Tore, Tabellenplatz 3.', 'Bilanz-Text unverändert');
  assertEqual(textOf(cPause.themenkarten[1]), 'Bester Scorer der Saison: Christian Loser mit 3 Punkten (2 Tore, 1 Vorlagen).', 'Scorer-Text unverändert');
  assertEqual(cPause.kernaussage, 'Spieltag 2 wurde am 08.03.2026 ausgetragen.', 'Kernaussage unverändert');

  const after = pause.cards('2026-03-09T12:00:00');
  assertEqual(after.phase, 'nachDemSpieltag', 'Vorbedingung: Phase "Nach dem Spieltag"');
  assertEqual(kinds(after.themenkarten), ['platzhalter', 'platzhalter', 'tabelle', 'keinNaechster'], 'nachDemSpieltag: Platzhalter, Tabelle kompakt und "kein weiterer Spieltag terminiert" bleiben unverändert');

  const next = [...ended, md(3, '2026-03-22', 'geplant', [g(5, '2026-03-22', false)])];
  const week = boot({ ...full, matchdays: next });
  const cWeek = week.cards('2026-03-15T12:00:00');
  assertEqual(cWeek.phase, 'unterDerWoche', 'Vorbedingung: Phase "Unter der Woche"');
  assertEqual(kinds(cWeek.themenkarten), ['verlauf', 'platzhalter', 'platzhalter', 'platzhalter', 'letzterSpieltag', 'naechster'], 'unterDerWoche: Formkurve, drei Platzhalter, letzter Spieltag, nächster Spieltag in unveränderter Reihenfolge');
  const cBefore = week.cards('2026-03-20T12:00:00');
  assertEqual(cBefore.phase, 'vorDemSpieltag', 'Vorbedingung: Phase "Vor dem Spieltag"');
  assertEqual(kinds(cBefore.themenkarten), ['gegner', 'matchcenterLink', 'lineupLink', 'verlauf', 'tabelle', 'letzterSpieltag'], 'vorDemSpieltag: Reihenfolge und Inhalt unverändert');
  for (const c of [cPause, after, cWeek, cBefore]) assertTrue(c.themenkarten.length <= 6, `${c.phase}: höchstens 6 Karten (6.2)`);
  assertTrue(![cPause, after, cWeek, cBefore].some((c) => c.themenkarten.some(EMPTY_ONLY)), 'Datenzustand mit Spielen: keine Leerzustandskarte');
}

// ── C: unvollständiger Spieltag ────────────────────────────────────────
console.log('== C: unvollständiger Spieltag ==');
{
  const days = [
    md(1, '2026-03-01', 'abgeschlossen', [g(1, '2026-03-01', true, 3, 1)]),
    md(2, '2026-03-08', 'unvollstaendig', [g(2, '2026-03-08', true, 1, 0), g(3, '2026-03-08', false, 0, 0, '15:00')]),
    md(3, '2026-03-22', 'geplant', [g(4, '2026-03-22', false)]),
  ];
  const a = boot({ matchdays: days, standings: [{ rank: 1, name: 'A', pts: 3 }], statGames: [days[0].games[0], days[1].games[0]] });
  const c = a.cards('2026-03-15T12:00:00');
  assertEqual(c.phase, 'unterDerWoche', 'Vorbedingung: letzter abgeschlossener Spieltag ist 1, Spieltag 2 unvollständig');
  assertEqual(c.lastMatchday.number, 1, 'unvollständiger Spieltag zählt nicht als abgeschlossen');
  // Ulm fehlt in der Tabelle, genau 2 gespielte Spiele: Formkurve vorhanden, Bilanz entfällt
  assertEqual(a.run('overviewSeasonBilanzHtml("25/26")'), '', 'Ulm nicht in der Tabelle: keine Bilanzkarte');
  assertTrue(!c.themenkarten.some(EMPTY_ONLY), 'keine unzulässige Leerzustandskarte');
  assertTrue(c.themenkarten.every((x) => textOf(x).length > 0 || /<svg|ui-rangliste/.test(x)), 'jede gerenderte Karte hat Inhalt (Text oder Diagramm/Rangliste)');
  assertEqual(kinds(c.themenkarten), ['verlauf', 'platzhalter', 'platzhalter', 'platzhalter', 'letzterSpieltag', 'naechster'], 'Karten mit Inhalt bleiben vorhanden');
  // nur ein gespieltes Spiel: Formkurve entfällt statt "nicht genügend"-Karte
  const one = boot({ matchdays: days, standings: table, statGames: [days[0].games[0]] });
  const c1 = one.cards('2026-03-15T12:00:00');
  assertEqual(kinds(c1.themenkarten), ['platzhalter', 'platzhalter', 'platzhalter', 'letzterSpieltag', 'naechster'], 'zu wenige Spiele: Formkurve wird ausgeblendet (keine "nicht genügend"-Karte)');
  assertTrue(!c1.themenkarten.some(EMPTY_ONLY), 'auch dann keine Leerzustandskarte');
  // Tabelle leer, Spieltag abgeschlossen (Phase nach dem Spieltag): Tabelle entfällt
  const noTable = boot({ matchdays: [days[0]], standings: [], statGames: [days[0].games[0]] });
  const cNo = noTable.cards('2026-03-02T12:00:00');
  assertEqual(cNo.phase, 'nachDemSpieltag', 'Vorbedingung: Phase nach dem Spieltag');
  assertEqual(kinds(cNo.themenkarten), ['platzhalter', 'platzhalter', 'keinNaechster'], 'Tabelle ohne Einträge entfällt, übrige Karten unverändert');
}

// ── D: Spieltage-Seite ohne Spieltage ─────────────────────────────────
console.log('== D: Spieltage-Seite ohne vorhandene Spieltage ==');
{
  const a = boot({ matchdays: [] });
  const page = a.run('rMatchdayTimelinePage("25/26")');
  const cardsBlock = /<div class="ia-overview-cards">([^]*)<\/div><\/div>$/.exec(page)?.[1] ?? '';
  assertTrue(/ui-shell/.test(page) && /data-title="Spieltage"/.test(page), 'Kopf der Spieltage-Seite bleibt');
  assertTrue(/Für diese Saison sind noch keine Spieltage bekannt\./.test(page.slice(0, page.indexOf('<div class="ia-overview-cards">'))), 'die Aussage steht in der Kernaussage (Kopf), nicht in einer Karte');
  assertTrue(!/ia-matchday-timeline/.test(page), 'keine leere Zeitleiste');
  assertTrue(/href="#\/matchcenter"/.test(cardsBlock) && /data-preview/.test(cardsBlock), 'Karten mit Inhalt bleiben: Vorbereitung (Links) und Spieldaten-Vorschau');
  assertTrue(!EMPTY_ONLY(cardsBlock), 'keine Leerzustandskarte in der Kartenliste');
  const noPreview = boot({ matchdays: [], previewCard: false });
  assertTrue(!EMPTY_ONLY(noPreview.run('rMatchdayTimelinePage("25/26")').replace(/^.*?<\/div>(?=<div class="ia-overview-cards">)/s, '')), 'ohne Vorschau-Karte: weiterhin keine Leerzustandskarte');
  const withDays = boot({ matchdays: [md(1, '2026-03-01', 'abgeschlossen', [g(1, '2026-03-01', true, 1, 0)])] });
  assertTrue(/ia-matchday-timeline/.test(withDays.run('rMatchdayTimelinePage("25/26")')), 'mit Spieltagen: Zeitleiste wird gerendert');
  assertEqual(sha(fnSource('rMatchdayTimelinePage')), 'de87c6c74645849f', 'rMatchdayTimelinePage unverändert (kein Eingriff nötig)');
}

// ── Reinheit und Einzelverträge ────────────────────────────────────────
console.log('== Reinheit, unveränderte Karten, Quelltext ==');
{
  const a = boot({ matchdays: [] });
  a.cards('2026-08-01T12:00:00'); a.page();
  assertEqual([a.calls.setState, a.calls.storage], [0, 0], 'kein setState, kein Storage-Zugriff beim Kartenbau');
  assertEqual(a.run('overviewNextMatchdayHtml(null)'), '<div class="ui-notiz">Für diese Saison ist kein weiterer Spieltag terminiert.</div>', 'overviewNextMatchdayHtml(null): Hinweis mit eigener Aussage bleibt unverändert');
  assertEqual(sha(fnSource('overviewNextMatchdayHtml')), 'a291a38e1b281d4a', 'overviewNextMatchdayHtml unverändert (Fingerprint)');
  assertEqual(a.run('overviewOpponentPreviewHtml(null)'), '<div class="ui-notiz">Kein bevorstehender Spieltag bekannt.</div>', 'overviewOpponentPreviewHtml(null): unverändert');
  const code = stripComments(CARD_FUNCTIONS.map(fnSource).join('\n'));
  for (const gone of ['noch keine Saisonbilanz', 'noch kein Top-Scorer', 'noch keine Tabelle', 'nicht genügend ausgetragene Spiele', 'Vereinsrekorde liegen', 'saisonübergreifende Entwicklung liegen']) assertTrue(!code.includes(gone), `Leerzustandstext entfernt: "${gone}"`);
  assertTrue(code.includes('sind noch nicht implementiert') && code.includes('folgt mit den Liga-Analytics-Modulen'), 'Platzhalter-Hinweise (noch nicht implementiert) unverändert vorhanden');
  const build = fnSource('buildOverviewCards');
  assertTrue(/themenkarten:themenkarten\.filter\(Boolean\)\.slice\(0,6\)/.test(build) && /tiles:tiles\.filter\(Boolean\)\.slice\(0,UI_OBJEKTSEITE_MAX_TILES\)/.test(build), 'buildOverviewCards filtert weiterhin Leeres heraus (Boolean) und begrenzt auf 6 Karten / 4 Kacheln');
  assertTrue(!/setState|localStorage|sessionStorage|indexedDB|fetch\(|window\.|document\./.test(code), 'Kartenfunktionen: kein setState, Storage, Netzwerk, DOM');
}

console.log('== Unveränderte Bestandteile (Quelltext-Fingerprints) ==');
{
  const pinned = {
    rContextBar: ['fn', '8efff4b4a0d75054'], rIaShell: ['fn', '16a2d20a6a21ed7e'], rMainNav: ['fn', 'e06d0bd56b91da1d'], rMainNavBottom: ['fn', '1ade76645df4da89'],
    rAsOfSelector: ['fn', 'b9e2968e358b1839'], getSeasonStatsAsOf: ['fn', '43b9eabfae5d992b'], deriveAsOfForSeason: ['fn', '88cce2f0779a2dc3'], getSeasonDataState: ['fn', 'e6fdb273584f3d3f'],
    computeCurrentAppHash: ['fn', '3c9bad5a17ccbdfe'], parseAppHash: ['fn', 'a41f0760de39e83c'],
    rGlobalSearchToggle: ['fn', '44051ef40d0c9c05'], globalSearchOnKeydown: ['fn', 'f00e205d446d4362'], globalSearchMatch: ['fn', '7ee84c03a37c7b55'],
    rToolMenu: ['fn', '762229fde03b2031'], toolMenuOnKeydown: ['fn', 'ab4998be9b395079'],
    detectOverviewPhase: ['fn', 'feca652a76e5e822'], overviewOpponentPreviewHtml: ['fn', '2a51e05ee239fe3f'], overviewMatchcenterLinkHtml: ['fn', 'c1201a1504d64034'],
    overviewLineupLinkHtml: ['fn', '06e2392960b9368d'], overviewRankChangeTile: ['fn', 'e31f57e9e108d871'], rMatchdayDetailPage: ['fn', '247d6f9b129d4adc'], rOverviewPage: ['fn', '477ae2f11e11a794'],
    uiNotiz: ['fn', '8794f37984dad161'], uiRangliste: ['fn', '87bad31d1b07438c'], uiVerlauf: ['fn', '1860fc97704b31af'], uiHinweisKarte: ['fn', '4b4ab6d5f2b46c2c'], uiObjektseite: ['fn', '390b5f722db20998'],
    goToMainNavPoint: ['win', '59d2de50a5f03cda'], openOverview: ['win', 'ee906a0518a9ecf0'], openMatchdayTimeline: ['win', '0baa2da1fa964990'], openMatchday: ['win', 'bca49420ab804f79'],
    openGlobalSearch: ['win', 'f9764bf44087ed75'], openToolMenu: ['win', 'b816957ddf35608f'],
  };
  for (const [name, [kind, hash]] of Object.entries(pinned)) assertEqual(sha(kind === 'fn' ? fnSource(name) : winSource(name)), hash, `${name} unverändert`);
  assertEqual(sha(/^const HASH_GLOBAL_PAGES=.*$/m.exec(html)[0]), '8381155d5a8c43a4', 'HASH_GLOBAL_PAGES unverändert');
  assertTrue(!/function uiTabelle\(/.test(html), 'kein uiTabelle (nicht Teil dieses Fixes)');
}

console.log('');
if (failures > 0) {
  console.log(`${failures} Test(s) fehlgeschlagen.`);
  process.exitCode = 1;
} else {
  console.log('Alle Tests erfolgreich.');
  process.exitCode = 0;
}

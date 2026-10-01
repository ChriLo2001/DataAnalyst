# Spezifikation: Spieltags-Vorschauvideos (Social-Video-Center)

**Status:** Entwurf zur Umsetzung
**Ablage im Repo:** `docs/social-video-spezifikation.md`
**Zielgruppe:** Umsetzung mit Claude Code
**Verhältnis zur großen Spezifikation:** eigenständige Phase (S1–S4), wird zwischen dem Datenqualitäts-Durchlauf und M9 eingeschoben. Die Leitprinzipien aus `docs/liga-analytics-spezifikation.md` Abschnitt 1 und die Informationsarchitektur aus Abschnitt 6 gelten unverändert.

---

## 0. Ziel

Vor jedem Kleinfeld-Spieltag erzeugt die App **per Knopfdruck** fertige Social-Media-Videos:

- **pro Gegner eine Story** im Format 9:16, 1080 × 1920, 15 Sekunden
- **pro Spieltag ein Feed-Post** im Format 4:5, 1080 × 1350, 15 Sekunden, mit beiden Gegnern

Alle Inhalte kommen automatisch aus der App: Tabellenplatz, Form, letztes Duell, Players to watch, Anpfiffzeit und Halle. Die Videos ersetzen die bisherigen statischen Vorlagen. Musik wird **nicht** eingebaut, sondern beim Hochladen in Instagram ausgewählt.

## 1. Leitprinzipien

1. **Keine zusätzliche Handarbeit.** Ein Knopf, keine Eingabemasken, keine manuell gepflegten Texte. Alles wird aus den vorhandenen Daten abgeleitet.
2. **Schlicht und hochwertig.** Ruhige Übergänge, animierte Zahlen, keine Kino-Effekte. Gestaltung übernimmt konsequent die bestehende Story-Vorschau (siehe Abschnitt 2).
3. **Kein Ton.** Die Videos werden stumm erzeugt.
4. **ffmpeg ist erlaubt**, aber als externes Werkzeug auf dem Rechner, **nicht** als npm-Abhängigkeit. Die App zeigt einen Hinweis darauf (Abschnitt 6.3).
5. **Keine neuen npm-Abhängigkeiten**, kein Playwright, kein Canvas-Framework. Node-Skripte bleiben reines ESM ohne Abhängigkeiten.
6. **Deterministisch in den Inhalten:** Gleicher Datenstand ergibt dieselbe Szenenfolge mit denselben Texten und Zahlen. Die Videodatei selbst darf sich bitweise unterscheiden (Encoder), die **Szenen-Spezifikation** nicht.
7. **Degradiert sauber.** Fehlen Modelldaten, Logos oder eine Duell-Historie, entfällt das betroffene Element, ohne Lücke im Layout und ohne Platzhaltertexte wie „n/a".
8. **Nichts Bestehendes kaputt machen.** Die vorhandene Story-Vorschau, der PNG-Export und das Social-Media-Center bleiben funktionsfähig; das Video kommt daneben.

## 2. Gestaltungsgrundlage (bestehende Story-Vorschau)

Die Videos übernehmen das Erscheinungsbild der heutigen Story-Vorschau. Verbindliche Vorgaben, aus dem Code übernommen:

| Element | Vorgabe |
|---|---|
| Farbtokens | `--story-bg`, `--story-red`, `--story-orange`, `--story-gold`, `--story-white`; Verläufe rot → orange für Akzente, Gold für Linien und Kapitälchen |
| Schriften | `Syne` (900) für Namen, Zahlen und Titel; `DM Mono` (800/900, `letter-spacing` ca. 0,1 em, Großbuchstaben) für Labels |
| Hintergrund | dunkel (`#020617`-Bereich), dezenter Goldschimmer, optional die vorhandene Skyline-Bewegung (`cv-skyline-sweep`, `cv-skyline-pulse-opacity`) als ruhige Hintergrundebene |
| Logos | Kreis, 56 px im Story-Maßstab, Rand in Gold, roter Verlauf als Füllung; ohne Bilddatei Initialen als Fallback (bestehendes Muster) |
| Formkurve | Pillen mit S/N/U, wie `.mc-story-pill` |
| Bausteine | Titelzeile, Matchup, Mini-Kennzahlen, Formblock, Duell-Block, Fakten, Fokus-Block |

Die bestehende Klassenlogik (`.mc-story-frame`, `.mc-story-inner`, `.mc-story-fact`, `mc-story-fit-tight`, `mc-story-fit-ultra`) bleibt für die **Standbilder** in Gebrauch. Für das Video wird eine **vereinfachte Szenenfolge** gebaut, die dieselben Tokens verwendet (Abschnitt 4).

## 2a. Gestaltungskanon (verbindlich) — „edel" statt Dashboard

Die Videos übernehmen **Farben, Schriften und Inhalte** der Story-Vorschau, **nicht deren Formensprache**. Die Story-Vorschau ist ein dichtes Bedien-Layout; das Video ist ein Markenauftritt. Maßstab ist eine Broadcast-Grafik vor dem Anpfiff, nicht ein Statistik-Panel.

### Verboten (das macht den billigen Eindruck)

- Abgerundete Pillen und Kapseln als Container, Badges mit Rahmen, Kärtchen mit Hintergrundfläche
- Farbverläufe auf Flächen hinter Text, Verläufe auf Schrift, farbige Schlagschatten, Leuchtkanten („glow")
- Goldringe oder helle Kreisflächen um Logos
- Rote Versal-Labels; Labels sind nie Signalfarbe
- Mehr als eine Akzentfarbe gleichzeitig; Rot und Orange nebeneinander
- Alles mittig gesetzt
- Mehr als zwei Schriftgrade in einem Block

### Vorgegeben

- **Farbbudget pro Bild:** fast schwarzer Grund, gebrochenes Weiß für Inhalt, ein gedämpftes Grau für Labels, **eine** Akzentfarbe (Vereinsrot) auf höchstens 5 Prozent der Fläche. Gold ausschließlich als Haarlinie, nie als Fläche.
- **Trennung durch Haarlinien**, 1 px, 15 bis 25 Prozent Deckkraft, statt durch Kästen. Weißraum trennt, nicht Rahmen.
- **Typografie trägt die Gestaltung:** Display-Größen mit enger Laufweite (Teamname, Zahlen), Labels klein, in Versalien, weit gesperrt, gedämpftes Grau. Zahlen in Tabellenziffern mit gleicher Breite, damit sie beim Hochzählen nicht springen.
- **Satzkante statt Mitte:** Inhalt an einer linken Satzkante ausgerichtet, nur Matchup und Abschluss zentriert. Grundlinienraster für alle Textzeilen.
- **Logos ohne Dekoration:** frei auf dunklem Grund, kein Ring, keine Fläche. Gegnerlogo leicht entsättigt, Ulm in voller Farbe — das ordnet die Hierarchie ohne zusätzliche Elemente.
- **Tiefe statt Effekte:** feines Korn über dem gesamten Bild, weiche Vignette, Hintergrundebenen mit unterschiedlicher Schärfe. Keine Effekte an einzelnen Elementen.
- **Höchstens fünf sichtbare Gruppen** je Szene, inklusive Kopfzeile und Fortschrittsbalken.
- **Bewegung in langen Kurven:** Ein- und Ausblenden über 500 bis 700 ms mit weicher Beschleunigung, kein Federn, kein Überschwingen, keine Skalierungssprünge.

### Prüfbar

- Akzentfläche je Bild höchstens 5 Prozent (messbar an der Zeichenliste).
- Keine Zeichenbefehle mit Verlaufsfüllung hinter Text, keine farbigen Schatten, kein Rahmen-Rechteck mit Eckradius als Container.
- Höchstens fünf Gruppen je Szene.
- Zahlen verwenden Tabellenziffern.

## 3. Technischer Weg

### 3.1 Warum nicht der PNG-Weg

Der bestehende PNG-Export serialisiert die Story über SVG `foreignObject` in ein Canvas. Das funktioniert für Standbilder, ist aber pro Bild zu langsam für 450 Einzelbilder und kann keine Animation abbilden. Außerdem werden dort alle externen Bilder ausgeblendet, weshalb im Export nur Initialen erscheinen.

### 3.2 Gewählter Weg (v1)

1. **Canvas-Renderer in der App.** Ein neuer, in sich geschlossener Renderer zeichnet die Szenen direkt auf ein `<canvas>` in Zielauflösung (1080 × 1920 bzw. 1080 × 1350), mit denselben Farben, Schriften und Formen wie die Story-Vorschau. Gezeichnet wird ausschließlich aus einer **Szenen-Spezifikation** (Abschnitt 5), nie direkt aus DOM-Zuständen.
2. **Aufnahme.** `canvas.captureStream(30)` plus `MediaRecorder` erzeugen eine WebM-Datei (VP9, falls verfügbar, sonst VP8) und laden sie herunter.
3. **Verpacken.** `node scripts/social-video.mjs` wandelt die WebM-Dateien per ffmpeg in MP4 (H.264, yuv420p, `faststart`, ohne Tonspur) um, prüft Auflösung und Dauer und benennt die Dateien nach Schema (Abschnitt 6.4).

**Optionaler Ausbau (v2, nicht Teil dieser Phase):** Einzelbild-Export und Encoding vollständig über ffmpeg, für bitweise reproduzierbare Videos. Wird erst angegangen, wenn v1 im Einsatz bewährt ist.

### 3.3 Zwei Voraussetzungen, die zuerst erledigt werden

1. **Logos lokal cachen UND als data:-URI einbetten.** Team-Logos liegen heute als externe Saisonmanager-URLs vor. Fremde Bilder „vergiften" das Canvas, dann schlagen `captureStream` und `toDataURL` fehl. Eine lokale Kopie unter `assets/teams/` allein reicht dafür NICHT aus — bestätigt per Konsolenausgabe: unter `file://` behandelt Chrome jede lokale Datei als eigene, fremde Herkunft, auch ein per `<img src="assets/…">` von derselben Festplatte geladenes Bild verunreinigt das Canvas genauso wie ein externes (`captureStream`: „Canvas is not origin-clean", `toDataURL`: „Tainted canvases may not be exported"). Über HTTP tritt das nicht auf. Deshalb zweistufig:
   - **Cache:** `scripts/cache-team-logos.mjs`, lädt Logos **einmalig** und nur mit explizitem Flag `--fetch` herunter nach `assets/teams/<team-key>.png` (der einzige Ort im Projekt mit Netzwerkzugriff; ohne Flag arbeitet es rein lesend und berichtet, was fehlt).
   - **Einbettung:** dasselbe Skript, `--embed` (Dry-Run) bzw. `--embed --write`, erzeugt `social-video-assets.js` — ein klassisches Skript (wie `season-data-embedded.js`), das `window.SOCIAL_VIDEO_ASSETS` mit allen vom Renderer benötigten Bildern als `data:`-URIs füllt (Team-Logos, VfB-Logo für die Fahne, Spatz). `data:`-URIs vergiften das Canvas nicht, auch nicht unter `file://`. **Nur der Canvas2D-Renderer liest aus `window.SOCIAL_VIDEO_ASSETS`** — fehlt ein Schlüssel, greift der Initialen-Fallback. Die Story-**Vorschau** im Dashboard bleibt unverändert und nutzt weiter die Dateipfade (kein Canvas-Export dort, also nicht betroffen).
   - **Lokaler Server als Ausweg, falls dennoch nötig:** `scripts/serve.mjs` (Node ohne Abhängigkeiten) liefert den Projektordner unter `http://localhost:5173` aus — `node scripts/serve.mjs`. Empfohlener Weg für die Videoerzeugung, falls die Einbettung aus irgendeinem Grund nicht greift (z. B. `social-video-assets.js` noch nicht erzeugt). Die App prüft das selbst (Abschnitt 8) und nennt im Fehlerfall genau diesen Befehl statt einer Sammelmeldung.
2. **Schriften sicherstellen.** Vor dem Zeichnen `document.fonts.ready` abwarten und prüfen, ob `Syne` und `DM Mono` verfügbar sind. Fehlen sie (z. B. unter `file://` ohne Netz), wird mit den definierten Ersatzschriften gezeichnet und im UI ein Hinweis gezeigt, dass die Typografie abweicht.

## 4. Szenen

### 4.1 Story 9:16, 15,0 Sekunden

| # | Zeit | Inhalt | Bewegung |
|---|---|---|---|
| 1 | 0,0–2,4 s | Ulm-Logo, „Spieltag X", Datum, Halle, Liga-Zeile | Logo weich eingeblendet, Textzeilen 24 px von unten, Gold-Sweep einmal quer |
| 2 | 2,4–6,4 s | Gegner: Logo, Name, Tabellenplatz, Punkte, Tordifferenz, Formpillen der letzten 5 Spiele | Zahlen zählen hoch (ease-out, 600 ms), Formpillen erscheinen nacheinander im Abstand von 80 ms |
| 3 | 6,4–9,4 s | Letztes Duell: Ergebnis groß, Datum und Wettbewerb klein, optional Torschützen | Ergebnis von 0:0 auf Endstand hochgezählt |
| 4 | 9,4–13,0 s | Players to watch: ein Ulmer und ein gegnerischer Spieler mit je einer Kennzahl und einem Halbsatz | zwei Karten nacheinander eingeblendet, jeweils 24 px Versatz |
| 5 | 13,0–15,0 s | Anpfiffzeit, Halle, Ulm-Logo, Abschlusszeile | ruhiges Ausblenden, Goldlinie zieht sich zu |

### 4.2 Feed-Post 4:5, 15,0 Sekunden

| # | Zeit | Inhalt |
|---|---|---|
| 1 | 0,0–2,4 s | Spieltag, Datum, Halle, beide Gegner-Logos nebeneinander |
| 2 | 2,4–7,0 s | Gegner A: Platz, Punkte, Form, ein Fakt |
| 3 | 7,0–11,6 s | Gegner B: gleicher Aufbau |
| 4 | 11,6–15,0 s | Beide Anpfiffzeiten, Halle, Abschluss |

### 4.4 Markenelemente: Ulmer Skyline und wehende Fahne

Zwei wiederkehrende Elemente geben den Videos einen eigenen Charakter. Beide werden im Canvas2D-Renderer (S2) umgesetzt, nicht als CSS-Animation.

**Skyline (Hintergrundebene)**

- Grundlage ist die bereits vorhandene Skyline-Umsetzung der Cover-Animation (`cv-skyline-sweep`, `cv-skyline-pulse-opacity` und das zugehörige Silhouetten-Asset). Diese Quelle wird gesucht und **wiederverwendet**, nicht neu gezeichnet; fehlt sie oder ist sie nicht in Canvas überführbar, wird das berichtet statt improvisiert.
- Platzierung: unteres Drittel, Silhouette in dunklem Rot-Schwarz, darüber ein ruhiger Goldschimmer am Ulmer Münster.
- Bewegung: eine sehr langsame Parallaxe von höchstens 8 px über die gesamten 15 Sekunden, plus ein einmaliger Gold-Sweep im Intro. Kein Scrollen, kein Zoom.
- Spatzen: höchstens 12 Sprites, langsam, unregelmäßig verteilt, Deckkraft unter 0,5. Sie sind Dekoration und dürfen nie Text überlagern.

**Wehende Fahne mit dem VfB-Ulm-Logo**

- Technik: Das Logo (`assets/vfb-ulm-logo-mark.png`) wird einmal in ein Offscreen-Canvas gezeichnet und dann **spaltenweise** auf das Zielbild übertragen — vertikale Streifen von 4 px, jeder mit einem Höhenversatz nach einer Sinuswelle, deren Phase mit der x-Position wandert. Darüber ein Helligkeitsverlauf, der der Welle folgt und so Falten vortäuscht, sowie eine leichte horizontale Stauchung an den Wellenbergen.
- Parameter: Wellenlänge etwa eine halbe Fahnenbreite, Amplitude höchstens 1,5 Prozent der Fahnenhöhe, Periode etwa 2,5 Sekunden. Ruhiges Wehen, kein Flattern.
- Deterministisch: Die Phase ist eine Funktion der Szenenzeit, kein Zufall, keine Physiksimulation.
- Einsatz: Fahne prominent im Intro und in der Abschlussszene, in den Inhaltsszenen höchstens klein am Rand oder gar nicht.
- Mastspitze und ein weicher Schatten unter der Fahne sind erlaubt, mehr nicht.

**Verhältnis zu den Bewegungsregeln (4.3)**

- Skyline und Fahne gelten als **eine** ambiente Hintergrundebene und zählen nicht in die Grenze von zwei animierten Elementen pro Szene. Voraussetzung: Deckkraft der Hintergrundebene höchstens 0,35 hinter Textbereichen, und keine Bewegung, die den Blick vom Inhalt zieht.
- In den Inhaltsszenen (Gegner, Duell, Players to watch) hat Lesbarkeit immer Vorrang: Unter Textblöcken liegt ein abdunkelnder Verlauf, damit der Kontrast erhalten bleibt.

**Rechenbudget (verbindlich, sonst ruckelt die Aufnahme)**

- Skyline, Verläufe und statische Teile werden **einmal** in ein Offscreen-Canvas vorgerendert und je Bild nur kopiert.
- Pro Bild neu gezeichnet werden ausschließlich: Fahne, Spatzen, animierte Zahlen und Texteinblendungen.
- Zielwert: unter 25 ms pro Bild bei 1080 × 1920 und 30 fps. Wird der Wert überschritten, zuerst die Spatzen reduzieren, dann die Fahne in halber Auflösung rendern und hochskalieren, dann die Streifenbreite von 4 auf 6 px erhöhen. Das Ergebnis dieser Messung gehört in den S2-Bericht.

### 4.3 Bewegungsregeln (verbindlich)

- Übergänge ausschließlich als Überblendung, 300 ms, plus vertikaler Versatz von maximal 24 px.
- Zahlen-Hochzählen mit `easeOutCubic`, maximal 600 ms, echte Zielwerte, kein Überschwingen.
- Keine Rotation, kein Zoom über 1,04, kein Blitzen, kein Flackern, keine Partikel außer dem bestehenden dezenten Goldschimmer.
- Pro Szene höchstens zwei animierte Elemente gleichzeitig.
- Textänderungen nie während einer Bewegung, immer davor oder danach.
- Sichere Ränder: 120 px oben und unten, 64 px links und rechts bleiben inhaltsfrei, damit Instagram-Bedienelemente nichts verdecken.

## 5. Szenen-Spezifikation als Datenobjekt

Der Renderer zeichnet nur aus diesem Objekt. Es wird von einer reinen Funktion `buildSocialVideoSpec({ seasonKey, matchdayKey, format })` erzeugt und ist testbar, ohne dass gezeichnet wird.

```json
{
  "schemaVersion": 1,
  "format": "story-9x16",
  "seasonKey": "26/27",
  "matchday": { "number": 3, "date": "2026-10-18", "arena": "Sporthalle …", "kickoffs": ["11:00", "14:30"] },
  "durationMs": 15000,
  "fps": 30,
  "scenes": [
    {
      "id": "intro",
      "startMs": 0,
      "endMs": 2400,
      "elements": [
        { "type": "logo", "team": "vfb-ulm", "asset": "assets/teams/vfb-ulm.png", "animation": "fade", "delayMs": 0 },
        { "type": "title", "text": "Spieltag 3", "animation": "rise", "delayMs": 200 },
        { "type": "meta", "text": "18.10.2026 · Sporthalle …", "animation": "rise", "delayMs": 320 }
      ]
    }
  ],
  "dataSources": { "standings": "app", "form": "app", "lastDuel": "app", "playersToWatch": "matchcenter", "prognosis": "model-data|absent" },
  "warnings": []
}
```

Regeln:

- Fehlende Inhalte erzeugen **keine** leeren Elemente. Fällt Szene 3 weg (kein Duell vorhanden), wird ihre Zeit auf die Nachbarszenen verteilt, sodass die Gesamtdauer exakt 15.000 ms bleibt.
- Jedes Textelement hat eine Obergrenze an Zeichen. Wird sie überschritten, greift dieselbe Abstufung wie in der Story-Vorschau: kleinere Schriftstufe, dann Kürzung mit Auslassungszeichen an Wortgrenze.
- Die Summe der Szenendauern wird geprüft (Test in Abschnitt 8).

## 5c. Stichtag: alles ist Vorschau (verbindlich)

Ein Vorschauvideo darf **nichts** enthalten, was zum Zeitpunkt der Veröffentlichung noch nicht bekannt war. Deshalb gilt für jede Zahl, jede Form und jedes Duell im Video ein **strikter Stichtag: der erste Anpfiff des gezeigten Spieltags, exklusiv**.

- Grundlage ist die `asOf`-Mechanik aus Phase P0a (`matchdayAsOfCutoff`, `asOfBeforeMatchday`), nicht der aktuelle Saisonstand.
- Die bestehenden Matchcenter-Funktionen (`matchcenterAnalyzeForm`, `matchcenterAnalyzeDirect`, `matchcenterAllGamesForSeason`, Players to watch) kennen **keinen** Stichtag und spiegeln immer den vollen Saisonstand. Sie dürfen für das Video **nicht unverändert** verwendet werden.
- Vorgehen: Die Spielliste wird **vor** dem Aufruf auf Spiele vor dem Stichtag gefiltert und in dieser Form an die bestehenden Bausteine übergeben. Wo ein Baustein keine Spielliste annimmt, entsteht ein dünner Stichtag-Wrapper daneben. **Die bestehenden Funktionen selbst werden nicht verändert**, damit der Golden-Master unberührt bleibt.
- Das gilt auch für vergangene Spieltage, die nur zur Abnahme oder zum Testen gerendert werden: Sie sehen genau so aus, wie sie vor dem Anpfiff ausgesehen hätten.
- Test (Pflicht): Ein bereits gespielter Spieltag darf in der Spezifikation **kein** Ergebnis, keine Form und kein Duell aus diesem oder einem späteren Spieltag enthalten. Für Spieltag 4 der Saison 25/26 heißt das konkret: Form von Ulm aus den Spieltagen 1 bis 3, kein Duell gegen Schriesheim oder Heidelberg, Tabellenstand vor Spieltag 4.

## 5a. Gegner ohne eigene Historie (Vererbung und Vorgeschichte)

Ab 26/27 tritt „SG Heidelberg-Mannheim" neu an, und Feuerbach stellt zwei Mannschaften. Solche Gegner haben zu Saisonbeginn keine eigene Form und kein eigenes letztes Duell. Regel für die Videos (passend zu Entscheidung 13 und Modul M1v der großen Spezifikation):

- **Kennzahlen** wie Tabellenplatz und Punkte kommen immer aus der laufenden Saison. Gibt es sie noch nicht (vor dem ersten Spieltag), entfällt das Element.
- **Form und letztes Duell** greifen auf die Vorgängerteams aus `data/team-lineage.json` zurück, solange das Team weniger als 6 eigene Spiele hat — aber **nur auf Vorgänger mit `scope.display = true`**, also solche aus der unmittelbar vorangehenden Saison. Ältere Vorgeschichte (z. B. ein zweites Feuerbach-Team aus 22/23) bleibt in Videos und Social-Media-Inhalten außen vor, auch wenn die Modelle sie nutzen.
- **Die Herkunft wird genannt**, kurz und im Story-Stil: „als FBC Heidelberg" bzw. „Vorsaison: FBC Heidelberg / Floorball Mannheim". Ein geerbter Wert ohne diesen Zusatz gilt als Fehler.
- Fehlt ein Eintrag in der Nachfolge-Tabelle, wird **nichts geraten**: Duell- und Formblock entfallen, ein Eintrag landet in `warnings`, und das Layout bleibt ohne Lücke.
- Modelldaten (Prognose, Stärke) erscheinen weiterhin nicht im Video.

## 5b. Quelle für Termine und Gegner

- Vorrangig `season-data/<saison>.json` (offizieller Stand).
- Solange der Spielplan der neuen Saison dort fehlt, darf `data/schedule-provisional.json` (Modul M0b, Weg B der großen Spezifikation) als Quelle für Datum, Gegner, Anpfiffzeit und Halle dienen. Das Video zeigt in diesem Fall in der Titelzeile den Zusatz **„Termine vorläufig"**.
- Sobald der echte Spielplan importiert ist, verschwindet diese Quelle und der Zusatz entfällt automatisch.

## 6. App-Oberfläche

### 6.1 Ort

Unter **Spieltage → Vorbereitung** (Informationsarchitektur Abschnitt 6.3), im bestehenden Social-Media-Bereich als neuer Block **„Vorschauvideos"**. Kein neuer Hauptnavigationspunkt.

### 6.2 Ablauf

1. Knopf **„Spieltagsvorschau erzeugen"**. Erzeugt nacheinander: Story Gegner A, Story Gegner B, Feed-Post.
2. Während der Aufnahme: Fortschritt pro Video („Story 1 von 3, Sekunde 7 von 15"), Abbrechen möglich.
3. Nach jeder Aufnahme: Download der WebM-Datei und ein Standbild als PNG zur Kontrolle.
4. Danach der ffmpeg-Hinweis aus 6.3 mit kopierbarem Befehl.

### 6.3 ffmpeg-Hinweis (verbindlich)

Dauerhaft sichtbar im Block „Vorschauvideos", nicht als einmalige Meldung:

> **Für MP4-Dateien wird ffmpeg benötigt.** Die App erzeugt WebM-Dateien. Instagram akzeptiert MP4, deshalb einmal im Projektordner ausführen:
> `node scripts/social-video.mjs --in <ordner-mit-webm> --write`
> Ist ffmpeg nicht installiert, meldet das Skript das mit Installationshinweis. Die WebM-Dateien bleiben in jedem Fall erhalten.

Zusätzlich: Wenn Schriften fehlen oder Logos nicht lokal vorliegen, erscheint jeweils ein eigener, kurzer Hinweis mit dem Befehl, der das behebt.

### 6.4 Dateinamen

- `vfb-ulm-md<Spieltagsnummer>-<jjjj-mm-tt>-story-<gegner-key>.webm` bzw. `.mp4`
- `vfb-ulm-md<Spieltagsnummer>-<jjjj-mm-tt>-feed.webm` bzw. `.mp4`
- Gegner-Key nach bestehendem Muster (kleingeschrieben, ohne Umlaute, Bindestriche), wie in `matchcenterStoryDownloadFileName`.

## 7. `scripts/social-video.mjs`

```bash
node scripts/social-video.mjs --in ./downloads                 # Dry-Run: findet WebM-Dateien, prüft ffmpeg, zeigt geplante Befehle
node scripts/social-video.mjs --in ./downloads --write         # erzeugt MP4 neben den WebM-Dateien
node scripts/social-video.mjs --in ./downloads --write --out ./social-out
```

- Dry-Run ist Standard, geschrieben wird nur mit `--write`, atomar (Temp-Datei plus `rename`).
- Prüft vorab, ob `ffmpeg` im `PATH` liegt; fehlt es, klare Meldung mit Installationshinweis und Exit-Code 2, ohne Änderungen.
- Encoding: H.264, `-pix_fmt yuv420p`, `-movflags +faststart`, `-an` (kein Ton), konstante Bildrate 30, Zielgröße unter 25 MB je Datei.
- Prüft nach dem Encoding Auflösung und Dauer (Toleranz ± 200 ms) und meldet Abweichungen.
- Überschreibt nie eine vorhandene MP4-Datei ohne `--force`.
- Kein Netzwerkzugriff, kein Auto-Commit.

## 8. Tests

Neue Datei `scripts/test-social-video.mjs`, im Stil der bestehenden Tests:

1. **Szenen-Spezifikation deterministisch:** gleicher Eingabestand ergibt identisches Objekt (kanonischer Vergleich).
2. **Gesamtdauer:** Summe der Szenen exakt 15.000 ms, auch wenn Szenen entfallen.
3. **Fehlende Daten:** kein Duell, kein Players-to-watch-Kandidat, keine Modelldaten, kein Logo — jeweils gültige Spezifikation ohne leere Elemente und mit passendem Eintrag in `warnings`.
4. **Textlängen:** sehr langer Vereinsname („DJK Giants Karlsruhe-Ost" und ein künstlich längerer) führt zu kleinerer Schriftstufe bzw. Kürzung, nie zu Überlauf.
5. **Dateinamen:** Schema, Umlaute, Sonderzeichen, doppelte Gegner am selben Spieltag.
6. **ffmpeg-Befehlsbau:** korrekte Argumente, korrekte Behandlung von Leerzeichen in Pfaden, Abbruch ohne ffmpeg, kein Überschreiben ohne `--force`.
7. **Logo-Cache:** `cache-team-logos.mjs` ohne `--fetch` verändert nichts und listet fehlende Logos; mit `--fetch` wird nur in `assets/teams/` geschrieben.

S2-Nachtrag (Canvas-Taint unter `file://` behoben), zusätzlich in `scripts/test-social-video-render.mjs`:

8. **Asset-Einbettung:** `cache-team-logos.mjs --embed` ohne `--write` schreibt nichts und berichtet nur; `socialVideoLoadAssets` bezieht Bilder nachweislich nur aus `window.SOCIAL_VIDEO_ASSETS` (statisch geprüft, kein `assets/…`-Dateipfad mehr im Quelltext dieser Funktion).
9. **Vorprüfungs-Hinweis:** `socialVideoCanvasExportHint` meldet im `file://`-Fall den konkreten Ausweg (lokaler Server, Befehlszeile), sonst einen allgemeinen Hinweis — beides ohne Canvas/DOM testbar.

Zusätzlich manuell zu prüfen und im Abschlussbericht zu dokumentieren: ein echtes Video je Format, Kontaktbogen der Szenen als PNG, Abspielprobe auf dem Handy, sowie (S2-Nachtrag) Video und Standbild sowohl über HTTP als auch per Doppelklick unter `file://`.

## 9. Akzeptanzkriterien

- Ein Knopfdruck erzeugt drei Videos ohne weitere Eingaben.
- Story 1080 × 1920, Feed 1080 × 1350, jeweils 15,0 s ± 0,2 s, 30 fps, ohne Tonspur, MP4 unter 25 MB.
- Sichere Ränder eingehalten, kein abgeschnittener Text in allen Testfällen.
- Erscheinungsbild deckungsgleich mit der Story-Vorschau (Farben, Schriften, Logokreise, Formpillen).
- Ohne Modelldaten und ohne Logo-Cache läuft alles ohne Fehler, mit sichtbarem Hinweis (Initialen-Fallback).
- Video und Standbild funktionieren sowohl über HTTP als auch unter `file://` (Doppelklick) — S2-Nachtrag: Bilder kommen für den Renderer ausschließlich als `data:`-URI (`social-video-assets.js`), daher kein Canvas-Taint mehr unter `file://`. Schlägt der Export dennoch fehl, zeigt die App den echten Grund und den Befehl für `scripts/serve.mjs` statt einer Sammelmeldung.
- ffmpeg-Hinweis dauerhaft sichtbar; `social-video.mjs` bricht ohne ffmpeg verständlich ab.
- Alle bestehenden Tests bleiben grün, die vorhandene Story-Vorschau und der PNG-Export funktionieren unverändert.

## 10. Phasen

| Phase | Inhalt | Fertig, wenn |
|---|---|---|
| **S1** | Logo-Cache (`assets/teams/`, `cache-team-logos.mjs`), Schriftenprüfung, `buildSocialVideoSpec` mit beiden Formaten, Standbild-Export aus der Spezifikation (PNG) | Spezifikation getestet, Standbilder mit echten Daten für den nächsten Spieltag erzeugt |
| **S2** | Canvas-Renderer, Aufnahme per `MediaRecorder`, WebM-Download | drei WebM-Dateien in Zielauflösung, Bewegungsregeln aus 4.3 eingehalten |
| **S3** | `scripts/social-video.mjs`, ffmpeg-Hinweis und Fortschrittsanzeige im UI, Dateinamen | drei MP4-Dateien, auf dem Handy abgespielt und geprüft |
| **S4** | Tests aus Abschnitt 8, Kontaktbogen, Randfälle, Doku in `docs/social-video.md` | alle Tests grün, Akzeptanzkriterien einzeln abgehakt |

Geschätzter Aufwand: 3 bis 5 Arbeitstage, S1 und S2 sind der Hauptteil.

## 11. Nicht-Ziele

- Keine Tonspur, keine Musik, keine Sprachausgabe.
- Kein Video-Editor in der App, keine manuelle Szenenbearbeitung.
- Keine Rückblick- oder Ergebnisvideos nach dem Spieltag (eigene, spätere Phase).
- Keine Spieler-Saisonkarten und keine Meilenstein-Posts (eigene, spätere Phasen).
- Kein automatisches Hochladen zu Instagram.
- Keine npm-Abhängigkeiten, kein Playwright, keine Änderung an der bestehenden Story-Vorschau über das Logo-Caching hinaus.
- Kein Großfeld in dieser Phase.

## 12. Offene Entscheidungen

1. **Reihenfolge der Gegner-Stories:** entschieden — nach Anpfiffzeit.
2. **Prognose im Video:** Sobald `model-data` vorliegt, könnte Szene 2 eine Siegwahrscheinlichkeit zeigen. Für den Start bewusst weggelassen — später entscheiden, ob das nach außen kommuniziert werden soll.
3. **Ablageort der fertigen Videos:** entschieden — Download-Ordner des Browsers, nichts davon im Repository.
4. **Zweitsprache:** entschieden — nur Deutsch.
5. **Feuerbach-Zuordnung:** offen — Team-IDs helfen nicht (sie werden jede Saison neu vergeben); entscheidbar über Spielerüberschneidung, sobald die ersten 26/27-Kader vorliegen, sonst per Nachfrage beim Verein — welche der beiden Mannschaften („Biber", „Rössle") ist Nachfolgerin der bisherigen ersten bzw. zweiten Mannschaft? Nötig für die Vorgeschichte in Abschnitt 5a.

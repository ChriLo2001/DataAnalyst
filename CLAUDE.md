# CLAUDE.md

## Projektzweck

Das VfB Ulm Analytics Center (`index.html`) ist eine Single-File-SPA, die Floorball-Saisondaten auswertet und zu einem internen Liga-Analyse-Portal ausgebaut wird (siehe [docs/spec/index.md](docs/spec/index.md)). Parallel dazu entstehen automatisch erzeugte Instagram-Vorschaubilder/-videos für Spieltage (siehe [docs/social-video-spezifikation.md](docs/social-video-spezifikation.md)). Beide Spezifikationen sind die fachliche Quelle der Wahrheit — dieses Dokument wiederholt sie nicht, sondern regelt nur, wie in diesem Repo gearbeitet wird.

## Leseregeln

- **`index.html` nie vollständig lesen.** Die Datei hat über 23.000 Zeilen. Immer zuerst [docs/index-map.md](docs/index-map.md) konsultieren (Funktionen, `window.`-Zuweisungen, const-Pfeilfunktionen, CSS-Gruppen, große Bereiche — jeweils mit Zeilenbereich), dann gezielt nur den benötigten Zeilenbereich lesen. Ist die Karte veraltet (nach einer Änderung an `index.html`), neu erzeugen: `node scripts/build-index-map.mjs --write`.
- **Vor gezieltem Lesen aus der Karte prüfen, ob sie noch aktuell ist:** `node scripts/build-index-map.mjs --check` (vergleicht den im Kopf der Karte gespeicherten SHA-256 von `index.html` mit dem aktuellen Stand). Nach jeder Änderung an `index.html` die Karte mit `--write` neu erzeugen und mitcommitten.
- **Aus `docs/spec/` nur lesen, was der Auftrag nennt.** Ein Phasenauftrag nennt die betroffenen Module/Abschnitte (siehe Lesehinweis in [docs/spec/index.md](docs/spec/index.md)); nicht die ganze Spezifikation laden. Jede Datei verweist per Kopfzeile auf ihre Voraussetzungen.
- **Rohdaten nie in den Kontext laden.** `season-data/*.json`, `lineup-data/*.json`, `model-data/*`, `season-data-embedded.js` (rund 2,4 MB, identischer Inhalt wie `season-data/*.json`, nur eingebettet) und `scripts/p0a-baseline-golden-values.json` sind groß und nicht zum Lesen gedacht — nur per Skript verarbeiten (Node-Prozess liest/schreibt sie, nicht das Gespräch).

## Dauerhafte Schutzregeln

Gelten für jede Phase, unabhängig vom jeweiligen Auftrag:

- Rohdaten (`season-data/`, `lineup-data/`) inhaltlich unverändert; Korrekturen nur über die vorgesehenen Importer, nie durch direktes Editieren.
- `STATIC_SEASON_DATA` (eingebetteter `file://`-Fallback, seit Token-Diät Teil 2 in `season-data-embedded.js`, nicht mehr in `index.html`) bleibt byte-identisch, außer eine Phase verlangt die Aktualisierung ausdrücklich — dafür ausschließlich `scripts/import-season-data.mjs --update-embedded` verwenden, nie von Hand editieren.
- Keine neuen npm-Abhängigkeiten. Alle Skripte bleiben ESM ohne externe Pakete.
- Kein Netzwerkzugriff, außer wo ein Skript ihn ausdrücklich und mit Begründung vorsieht (bisher einzige Ausnahme: `scripts/cache-team-logos.mjs --fetch`).
- Dry-Run ist der Standard jedes schreibenden Skripts; Schreiben nur mit explizitem `--write`.
- Schreiben ist atomar (Temp-Datei + `rename`), nie direktes Überschreiben.
- Ein Branch pro Phase (`feature/<phasen-name>`). Kein Merge nach `main`, kein Force-Push — beides nur nach expliziter Ansage durch Chris.
- Alle bestehenden Tests (`scripts/test-*.mjs`) bleiben grün.
- Golden-Master (`scripts/p0a-baseline-golden-values.json` und die davon abhängigen Tests) bleibt unverändert, außer eine Änderung ist ausdrücklich beauftragt und wird im Abschlussbericht begründet.

## Berichtsformat

- **Plan:** höchstens eine Seite.
- **Abschlussbericht:** in Stichpunkten. Keine JSON-Auszüge, keine Einzelwerttabellen. Zahlen (Kennzahlen, Dry-Run-Ergebnisse, Vollständigkeitsnachweise) gehören in Dateien bzw. Skript-Output, nicht ausformuliert in den Bericht selbst.
- **Testausgaben:** im Bericht nur Fehlschläge nennen; Erfolge als Zähler ("42/42 grün"), nicht einzeln auflisten.

## Arbeitsweise

- Eine Phase pro Sitzung.
- Bei offenen Entscheidungen oder Widersprüchen: anhalten und fragen, nicht annehmen.

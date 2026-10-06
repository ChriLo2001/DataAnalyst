# M0b · Spielplan-Import für die neue Saison

> Teil von [docs/spec/index.md](../index.md). Modul-Abschnitt aus Abschnitt 4 der ursprünglichen Spezifikation. Voraussetzung: [M0](M0.md).

---

### M0b · Spielplan-Import für die neue Saison

**Ziel:** Sobald der Spielplan einer neuen Saison auf saisonmanager.de erscheint, ist er **ohne Handarbeit** in der App — Grundlage für Spieltagsvorschau, Vorschauvideos und Terminanzeige.

**Geklärte Lage (Aufgabe 3b, bestätigt am echten Zugriff):** Die `/api/v2/`-Endpunkte verlangen bestätigt einen API-Key (`X-Api-Key`; ein Test auf `leagues/<id>/table.json` ergab HTTP 401 "API key required", anonym nicht nutzbar). Der **Kalender-Export** derselben Liga —
```
https://saisonmanager.de/api/v2/calendar/leagues/<id>.ics
```
— antwortet dagegen **ohne Schlüssel** mit HTTP 200: ein veröffentlichter `.ics`-Feed ist dafür gedacht, maschinell abonniert zu werden (z. B. von Kalender-Apps), und ist deshalb anonym zugänglich. Er enthält pro Spiel: Spiel-ID, Spieltagsnummer, Datum, Uhrzeit, beide Mannschaften und die Halle — alles, was ein Spielplan-Import braucht.

**Damit entfällt die frühere Zweiteilung in Weg A/Weg B.** Spielpläne laufen über den Kalender-Feed, ein eigener API-Key wird nur noch für **Spielberichte** gebraucht (Ergebnisse/Events/Aufstellungen — das kann der Kalender nicht liefern, siehe M0).

**Der Weg:**
- `scripts/import-schedule.mjs` ruft den Kalender-Feed ab (`--fetch`, eng begrenzte, dokumentierte Ausnahme vom sonstigen Netzwerkverbot — läuft nie automatisch in Tests) oder liest eine bereits gespeicherte `.ics`-Datei rein lokal, parst sie, prüft das Ergebnis gegen unabhängig abgelesene Prüfsummen und erzeugt daraus **nur mit `--write`** einen gültigen `season-data`-Entwurf unter `./entwurf/`.
- Spiele ohne Events sind zulässig (bestehende Validatoren), daher genügt ein reiner Terminplan — echte Spiel-IDs liefert der Feed bereits mit, es muss nichts erfunden werden.
- Danach der übliche Weg: `scripts/import-season-data.mjs` (Dry-Run → `--write` → `--update-embedded`, siehe docs/season-data-import.md).
- Für einen **einzelnen bereits gespielten Spieltag** (Ergebnisse statt reinem Terminplan) gilt stattdessen der Teilimport-Weg (`--merge`, siehe docs/season-data-import.md Abschnitt 14) — der Kalender-Feed selbst liefert nie Ergebnisse, nur Termine.

**Akzeptanzkriterien:** Der Kalender-Import läuft ohne Handarbeit am Spielplan selbst (Datum/Uhrzeit/Teams/Halle); Sicherheitsregeln des Importers bleiben unangetastet (keine bekannte Game-ID darf verschwinden, kein Auto-Merge über Prüfungen hinweg); Ergebnisse/Events bleiben weiterhin manuelle Spielberichts-Importe (siehe M0, docs/season-data-import.md Abschnitt 14).

---

**Siehe auch:** [M0](M0.md) · Entscheidung 14 in [50-entscheidungen.md](../50-entscheidungen.md)

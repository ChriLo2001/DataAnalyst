# M0b · Spielplan-Import für die neue Saison

> Teil von [docs/spec/index.md](../index.md). Modul-Abschnitt aus Abschnitt 4 der ursprünglichen Spezifikation. Voraussetzung: [M0](M0.md).

---

### M0b · Spielplan-Import für die neue Saison

**Ziel:** Sobald der Spielplan einer neuen Saison auf saisonmanager.de erscheint, ist er **ohne Handarbeit** in der App — Grundlage für Spieltagsvorschau, Vorschauvideos und Terminanzeige.

**Ehrliche Lage:** Ein vollautomatischer Abruf setzt einen **API-Key** voraus (`X-Api-Key`; ein Test auf `leagues/<id>/table.json` ergab HTTP 401). Ohne Key kann kein Skript des Projekts die Daten holen — das Verbot von Netzwerkzugriffen in Skripten bleibt bestehen. Deshalb zwei Wege:

**Weg A (Ziel, mit API-Key):**
- Key als GitHub-Secret `SAISONMANAGER_API_KEY` hinterlegen (Anfrage an it@floorball.de).
- Der vorhandene, heute deaktivierte Workflow `.github/workflows/update-season-data.yml` wird wieder mit `schedule` versehen (einmal täglich reicht) und ruft `scripts/update-season-data.mjs` auf.
- Ergänzung dort: Erkennt der Lauf eine **neue Liga-ID für die Folgesaison** mit mindestens einem Spiel, legt er `season-data/<neu>.json` an und trägt die Saison mit `status:"archived"` ins Manifest ein. Das Umschalten auf `"current"` bleibt ein bewusster manueller Schritt (bestehende Regel).
- Sicherheitsregeln des Importers bleiben unangetastet: keine bekannte Game-ID darf verschwinden, kein Auto-Merge über Prüfungen hinweg.

**Weg B (Übergang, ohne Key):** halbautomatisch in einem Schritt.
- `scripts/import-schedule.mjs` liest den **offiziellen Spielplan-Export** der Liga (XLSX oder CSV, seit Kurzem im Saisonmanager verfügbar) oder eine manuell gespeicherte JSON-Antwort und erzeugt daraus einen gültigen `season-data`-Entwurf.
- Spiele ohne Events sind zulässig (bestehende Validatoren), daher genügt ein reiner Terminplan.
- Fehlen echte Spiel-IDs im Export, werden **keine** Ersatz-IDs erfunden: Der Entwurf wird als `provisional: true` markiert, landet in `data/schedule-provisional.json` (nicht in `season-data/`) und speist ausschließlich Anzeige und Videos. Beim ersten echten Import ersetzt der offizielle Stand ihn vollständig.

**Akzeptanzkriterien:** Ein vorläufiger Spielplan ist in der App überall als vorläufig gekennzeichnet; er fließt in **keine** Modellberechnung ein; nach dem echten Import existiert die vorläufige Datei nicht mehr.

---

**Siehe auch:** [M0](M0.md) · Entscheidung 14 in [50-entscheidungen.md](../50-entscheidungen.md)

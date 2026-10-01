# Datenqualitäts-Korrekturen im bestehenden Dashboard

> Teil von [docs/spec/index.md](index.md). Enthält Abschnitt 5 der ursprünglichen Spezifikation.
>
> **Hinweis zur Einordnung:** Die Zieldatei-Liste des Token-Diät-Auftrags nennt für Abschnitt 5 keine eigene Datei (sie liegt zwischen den Modul-Dateien und `20-ui.md`). Diese Datei (`05-datenqualitaet.md`) ist meine Wahl für diese Lücke, passend zur bestehenden `00`/`10`/`20`/…-Nummerierung und zur ursprünglichen Abschnittsnummer 5. In `index.md` ist sie in der Zuordnungstabelle vermerkt.

---

## 5. Datenqualitäts-Korrekturen im bestehenden Dashboard

Unabhängig von den Modulen, als eigene kleine Aufgaben:

1. **Eigentore:** `goal_type === 'owngoal'` darf keinem Spieler als Tor gutgeschrieben werden und keinen Assist erzeugen. Betrifft Scorer-, Clutch-, Duo- und Hall-of-Fame-Werte. Vorher/nachher-Diff der betroffenen Spieler im PR dokumentieren.
2. **Penaltys:** `penalty_shot` als eigene Kennzahl ausweisen (Tore aus Penaltys), in Scorerwerten weiter enthalten.
3. **Zeitformat:** Kumulierte Zeit in Halbzeit 2 erkennen (siehe M0). Prüfen, ob `parseGameClock`/`goalieEventAbsSeconds` das bereits korrekt behandeln; falls nicht, korrigieren und Phasen- und Timing-Auswertungen neu prüfen.
4. **Timeouts:** Events werden in M0/M7 genutzt. Im Dashboard mindestens in der Spielansicht anzeigen.
5. **Datenstand:** Sichtbarer Hinweis „Daten bis Spieltag X (Datum)“.

---

## Datenqualitäts-Phase (Spieltagsstatus und M0-Spielfilter)

Ergänzung aus der Datenqualitäts- und Spieltagsstatus-Phase (nicht Teil der ursprünglichen Spezifikation, siehe [10-architektur.md](10-architektur.md) Abschnitt 3.6.3 und [module/M0.md](module/M0.md)):

1. **Spieltagsstatus spezifikationskonform:** Ein Spieltag gilt als `abgeschlossen`, wenn jedes Spiel entweder beendet ist ODER endgültig nicht an diesem Termin stattfindet (`notice_type` passt auf `Postponed`/`Canceled`, real beobachtete Rohwerte über alle fünf Saisons). `unvollständig` gilt nur noch für Spiele, die weder beendet noch verlegt/abgesagt sind (`scripts/matchday-derivation.mjs`). Ein verlegtes Spiel zählt automatisch am neuen Termin, sobald es dort beendet ist — ohne Sonderlogik, da `buildMatchdays()` ohnehin nach Datum/Spieltagnummer gruppiert. Effekt an echten Daten: 24/25 steigt von 3 auf 7 abgeschlossene Spieltage (von 7 insgesamt); 25/26 von 6 auf 8 (von 8 insgesamt).
2. **M0-Datenqualitäts-Ausnahme `ended !== true`:** Ein Spiel mit `ended !== true`, aber vollständigem Ergebnis UND mindestens einem Event, gilt trotzdem als beendet (`isEffectivelyEnded`, `scripts/game-status.mjs`, siehe [module/M0.md](module/M0.md)). Betrifft acht Spiele in 21/22 (25677, 25679, 25681, 25682, 25683, 26478, 26613, 26644) — allgemein formulierte Regel, keine hartverdrahtete ID-Liste im Code. Seit der ended-Vereinheitlichungs-Phase nutzen M0 (`scripts/model/normalize.mjs`) UND die Spieltag-Ableitung (`scripts/matchday-derivation.mjs`, 3.6.3) exakt dieselbe Funktion, nicht mehr zwei getrennte Umsetzungen derselben Regel.

---

**Weiter:** [20-ui.md](20-ui.md) · **Zurück:** [module/M0.md](module/M0.md)

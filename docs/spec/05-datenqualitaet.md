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

**Weiter:** [20-ui.md](20-ui.md) · **Zurück:** [module/M0.md](module/M0.md)

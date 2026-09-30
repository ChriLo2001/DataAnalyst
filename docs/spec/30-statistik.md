# Statistische Leitlinien

> Teil von [docs/spec/index.md](index.md). Enthält Abschnitt 7 der ursprünglichen Spezifikation. Gilt für alle Module in [module/](module/).

---

## 7. Statistische Leitlinien

1. **Schrinkage ist Standard** für jede Quote auf Spieler-, Goalie- oder Teamebene (Empirical Bayes oder Ridge).
2. **Unsicherheit:** 90-%-Intervalle, per Bootstrap über Spiele, wenn keine geschlossene Form verfügbar ist. Fester Seed.
3. **Konfundierung beachten:** Kadergröße, Gegnerstärke und Spielreihenfolge immer gemeinsam modellieren, nie einzeln roh interpretieren.
4. **Multiples Testen:** Automatisch erzeugte Hinweise (M8, Coach-Report) nur nach BH-Korrektur.
5. **Keine In-Sample-Güte als Qualitätsnachweis.** Güte nur aus Walk-forward (M9).
6. **Kaderpräsenz ≠ Einsatzzeit.** In allen Spielereffekt-Texten klar benennen.
7. **Keine Fangquote.** Ohne Schussdaten keine Save-%, keine xG, kein Corsi. Nicht approximieren, nicht so benennen.
8. **Reliabilität messen:** Für zentrale Spielerkennzahlen die Split-Half-Reliabilität (gerade/ungerade Spiele, Spearman-Brown-korrigiert) im Build-Bericht ausweisen und daraus die Mindeststichproben ableiten.

---

**Weiter:** [40-phasen.md](40-phasen.md) · **Zurück:** [20-ui.md](20-ui.md)

# M4 · Nachtrag: Kadergröße als dominierende Belastungsgröße

> Zur Einarbeitung in `docs/spec/module/M4.md`. Befund vom 04.10.2026, erhoben an `season-data/25-26.json` (60 Spiele, davon 56 mit Spielberichtsdaten). Status: **nach Spieltag 1 der Saison 26/27 umzusetzen**, nicht davor.

---

## 1 · Befund

Im Kleinfeld stehen drei Feldspieler gleichzeitig auf dem Feld. Die Zahl der am Spieltag gemeldeten Feldspieler bestimmt damit die Einsatzzeit je Spieler nahezu mechanisch — unabhängig von Taktik oder Trainerentscheidung.

Gemessen über die Saison 25/26, Verbandsliga BW (KF):

| Team | Feldspieler je Spiel (Ø) | min | max | Torhüter (Ø) |
|---|---|---|---|---|
| Breisgau Bandits | 6,6 | 6 | 8 | 1,00 |
| Floorball Mannheim | 6,8 | 5 | 9 | 1,07 |
| DJK Giants Karlsruhe-Ost | 7,2 | 5 | 9 | 1,00 |
| **VfB Ulm** | **7,3** | **5** | **10** | **1,00** |
| FBC Heidelberg | 7,6 | 5 | 10 | 1,00 |
| SV Tübingen Sharks | 8,6 | 5 | 13 | 1,14 |
| TV Schriesheim | 8,9 | 6 | 12 | 1,29 |
| Sportvg Feuerbach | 9,8 | 8 | 12 | 1,00 |

Liga gesamt: Ø 7,8 Feldspieler je Spiel, Spanne 5 bis 13. In 6 % der Spiele traten fünf oder weniger Feldspieler an.

Daraus folgende Einsatzzeiten bei 2 × 20 Minuten:

| Feldspieler | Anteil Einsatzzeit | je Spiel | je Spieltag (2 Spiele) |
|---|---|---|---|
| 5 | 60 % | 24 min | 48 min |
| 7 | 43 % | 17 min | 34 min |
| 10 | 30 % | 12 min | 24 min |
| 13 | 23 % | 9 min | 18 min |

Die Spannweite innerhalb derselben Liga beträgt damit **mehr als Faktor zwei**, und sie ist nicht zufällig verteilt, sondern teamgebunden und über die Saison stabil.

## 2 · Konsequenz für M4

Für ein Team mit vollem Kader ist Belastung vor allem eine Funktion des Spielplans: Spieldichte, Reisewege, Rückrundenlage. In dieser Liga ist die dominierende Variable die **Kadergröße am Spieltag**, in einer Größenordnung, gegen die Spielplaneffekte klein ausfallen.

M4 rechnet deshalb nicht primär mit Spielabständen, sondern mit geschätzter Einsatzzeit:

```
geschätzte Einsatzzeit (Feldspieler) = Spielzeit × 3 / Anzahl gemeldeter Feldspieler
geschätzte Einsatzzeit (Torhüter)    = Spielzeit
```

Der Eingabewert stammt vollständig aus `rawGames[].players[seite]` und erfordert **keine zusätzliche Erfassung am Spieltag**.

## 3 · Konsequenz für andere Module

Jede Kennzahl mit dem Nenner „Spiele" vergleicht Ungleiches, sobald Kadergrößen sich unterscheiden. Betroffen sind mindestens:

- **M2 (Schützenqualität)** und **M5 (Spielerwirkung):** Der ehrliche Nenner ist geschätzte Einsatzzeit, nicht Spiele. Zwei Punkte in 24 Minuten sind etwas anderes als zwei Punkte in zwölf.
- **M7 (Gegneranalyse):** Die Kadergröße des Gegners am jeweiligen Spieltag ist eine Kontextvariable. Ein Sieg gegen ein Team mit fünf Feldspielern ist ein anderes Ergebnis als derselbe Sieg gegen dasselbe Team mit zehn.
- **Vorschauvideos / Gegnerdossier:** Angaben wie „5,0 Punkte pro Spiel gegen Ulm" enthalten unausgesprochen die Einsatzzeit des betreffenden Spielers. Wo eine Quote eines gegnerischen Spielers genannt wird, gehört die Kadergröße seines Teams als Kontext dazu oder die Quote wird auf Einsatzzeit normiert.

## 4 · Prüfbare Hypothese

Mit den vorhandenen ligaweiten Daten unmittelbar testbar, ohne neue Eingaben:

> Der Leistungsabfall vom ersten zum zweiten Spiel eines Spieltags wächst mit sinkender Kadergröße.

Auswertung: Tordifferenz je Team im zweiten Spiel eines Spieltags gegenüber dem ersten, aufgeteilt nach Kadergröße. Grundgesamtheit 25/26: 8 Teams × 7 Spieltage = 56 Team-Spieltage.

Fällt der Effekt deutlich aus, ergibt sich daraus eine vereinsintern verwertbare Aussage in der Form „unterhalb von acht Feldspielern kostet uns das zweite Spiel im Schnitt X Tore" — belegt statt gefühlt.

## 5 · Einschränkungen

Der Spielbericht nennt, **wer gemeldet war**, nicht wer wie lange gespielt hat. Einsatzzeit bleibt eine Schätzung und ist überall als solche zu kennzeichnen.

Die Güte der Schätzung hängt von der Kadergröße selbst ab:

| Gemeldete Feldspieler | Güte | Begründung |
|---|---|---|
| ≤ 7 | hoch | Rotation ist erzwungen, niemand kann längere Zeit aussetzen |
| 8 – 9 | mittel | begrenzter Spielraum |
| ≥ 10 | niedrig | der Trainer wählt tatsächlich aus; gleichmäßige Verteilung nicht mehr unterstellbar |

Für den VfB Ulm (Ø 7,3) liegt die Schätzung damit überwiegend im hohen Gütebereich. Die Güteangabe wird mit dem Wert geführt und über das Datenstandsband ausgewiesen.

## 6 · Nebenbefund für M3

In **allen 14** Spielen des VfB Ulm in der Saison 25/26 stand genau ein Torhüter im Spielbericht. Gegentore lassen sich damit eindeutig einem Torhüter zuordnen; ein zusätzliches Erfassungsfeld für Torhüterwechsel ist nicht erforderlich. Ligaweit kommen vereinzelt zwei Torhüter vor (Schriesheim Ø 1,29, Tübingen Ø 1,14, Mannheim Ø 1,07) — die Zuordnung muss diesen Fall abfangen, ohne ihn für Ulm vorauszusetzen.

## 7 · Akzeptanzkriterien

1. Für jedes Spiel und jeden Spieler liegt eine geschätzte Einsatzzeit vor, abgeleitet aus der gemeldeten Kadergröße.
2. Jede Quote, die heute den Nenner „Spiele" verwendet, ist daraufhin geprüft, ob „Einsatzzeit" der richtigere Nenner ist; die Entscheidung ist je Kennzahl dokumentiert.
3. Die Schätzung ist in der Oberfläche nirgends als Messung dargestellt und trägt ihre Güteangabe.
4. Die Hypothese aus Abschnitt 4 ist ausgewertet und das Ergebnis festgehalten — auch wenn kein Effekt nachweisbar ist.
5. Die Kadergröße des Gegners ist als Kontextangabe in der Gegneranalyse verfügbar.

---

**Siehe auch:** [M3](module/M3.md) · [M5](module/M5.md) · [M7](module/M7.md) · Datenstandsband und Schwellwerte aus Aufgabe 4a/4f

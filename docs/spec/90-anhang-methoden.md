# Anhang A: Methoden aus Eishockey, Basketball, Fußball und Baseball

> Teil von [docs/spec/index.md](index.md). Enthält den Anhang A der ursprünglichen Spezifikation. Welche Modul-Datei zu den "Modul"-Spalten-Kürzeln (M0–M10) gehört, steht in der Zuordnungstabelle in [index.md](index.md).

---

## Anhang A: Methoden aus Eishockey, Basketball, Fußball und Baseball

Diese Übersicht dient als **Ideen-Backlog**. Umsetzbarkeit bezieht sich auf unsere Daten: Tore mit Zeit, Schütze und einem Assist, Strafen, Timeouts, Kader, Ergebnisse, Ausrichter. Keine Schüsse, keine Einsatzzeiten, keine Positionsdaten.

Legende: ✅ direkt umsetzbar · 🟡 umsetzbar mit Anpassung · ❌ mit unseren Daten nicht möglich

### A.1 Teamstärke und Prognose

| Methode | Herkunft | Idee | Für uns | Modul |
|---|---|---|---|---|
| **Dixon-Coles-Modell** | Fußball | Poisson-Modell mit Angriff/Abwehr plus Korrektur für knappe Ergebnisse und Zeitgewichtung | ✅ Kern von M1; die Knappe-Ergebnisse-Korrektur ist bei ~8 Toren pro Team weniger wichtig | M1 |
| **Elo / Glicko** | Schach, ClubElo (Fußball), FiveThirtyEight (NBA) | Rating wird nach jedem Spiel aktualisiert; Glicko ergänzt eine Unsicherheit pro Team | ✅ Einfache, gut erklärbare Alternative und Baseline für M9; Elo-Verlauf als Grafik „Teamstärke über die Saisons“ | M1, M9 |
| **Pythagorean Expectation** | Baseball (Bill James), NHL | Erwartete Siegquote aus geschossenen und kassierten Toren: `GF^x / (GF^x + GA^x)` | ✅ Kennzahl „Glück“: tatsächliche Punkte gegenüber Erwartung. Exponent für unsere Liga per Fit bestimmen | M1, M7 |
| **Expected Points (xPts)** | Fußball | Erwartete Punkte aus Ergebniswahrscheinlichkeiten pro Spiel | ✅ „Verdiente Tabelle“ neben der echten Tabelle | M1 |
| **Log5** | Baseball | Siegwahrscheinlichkeit A gegen B aus den Siegquoten beider Teams | ✅ Sehr einfache Baseline für M9 | M9 |
| **Monte-Carlo-Saisonsimulation** | FiveThirtyEight, Opta | Restliche Spiele 10.000-mal simulieren → Wahrscheinlichkeit für jeden Tabellenplatz | ✅ „Wie wahrscheinlich ist Platz 3?“ ab Saisonmitte | neu, baut auf M1 |
| **Bradley-Terry** | Statistik, Sportranglisten | Paarvergleichsmodell für Sieg/Niederlage | 🟡 Poisson-Modell ist informativer, da Tore genutzt werden | – |

### A.2 Spielverlauf und Wichtigkeit von Situationen

| Methode | Herkunft | Idee | Für uns | Modul |
|---|---|---|---|---|
| **Win Probability / WPA** | Baseball, NFL, NBA | Siegwahrscheinlichkeit pro Zeitpunkt, Beitrag jedes Ereignisses | ✅ | M6 |
| **Leverage Index** | Baseball (Tom Tango) | Wie viel steht in einer Situation auf dem Spiel? | ✅ Welche Spieler treffen in wichtigen Momenten, unabhängig von der Anzahl der Tore | M6 |
| **Score Effects** | Eishockey | Teams spielen je nach Spielstand anders (Führende verteidigen, Zurückliegende riskieren mehr) | ✅ Tore und Gegentore nach Spielstand; Kennzahlen danach bereinigen | M7 |
| **Game State Analysis** | Fußball | Leistung getrennt nach Führung, Gleichstand, Rückstand | ✅ | M7 |
| **Markov-Ketten für Spielstände** | Baseball, Fußball | Übergänge zwischen Spielständen modellieren | 🟡 Poisson-Restspiel-Modell (M6) reicht zunächst | – |
| **Survival-Analyse (Kaplan-Meier, Cox)** | Medizin, in Sportanalytik für „Zeit bis zum Tor“ | Wie lange dauert es bis zum ersten Tor/Gegentor, und was beeinflusst das? | ✅ Statistisch saubere Version der bestehenden „First-Goal-Resistance“ der Goalies; auch „Zeit bis zur Antwort nach Gegentor“ | M3, M7 |

### A.3 Spielerbewertung

| Methode | Herkunft | Idee | Für uns | Modul |
|---|---|---|---|---|
| **On/Off-Splits** | Basketball | Teamleistung mit gegenüber ohne Spieler | ✅ auf Spielebene | M5 Stufe 1 |
| **RAPM** (Regularized Adjusted Plus-Minus) | Basketball, Eishockey | Ridge-Regression des Teamergebnisses auf alle beteiligten Spieler | 🟡 Auf Spielebene statt Schichtebene, da keine Einsatzzeiten | M5 Stufe 2 |
| **Box Plus-Minus / Statistical Plus-Minus** | Basketball | Plus-Minus aus Boxscore-Werten vorhersagen, als Prior für RAPM | ✅ Tore/Assists pro Spiel als Prior | M5 Stufe 2b |
| **GAR / WAR** (Goals/Wins Above Replacement) | Eishockey (Evolving Hockey), Baseball | Gesamtbeitrag in Toren bzw. Siegen gegenüber einem Ersatzspieler | 🟡 Aus M5-Effekten ableitbar: Effekt − Niveau eines typischen Ersatzspielers (z. B. 20. Perzentil), mal Spiele; Umrechnung Tore → Siege über Pythagorean | neu, baut auf M5 |
| **Game Score** | Basketball (Hollinger), Eishockey (Luszczyszyn) | Gewichtete Einzelspiel-Bewertung aus Boxscore-Werten | ✅ Gewichte (Tor, Assist, Strafminute, WPA) per Regression auf Spielausgang bestimmen; „Spieler des Spiels“ automatisch | neu |
| **Usage Rate / Beteiligungsquote** | Basketball | Anteil der Team-Aktionen, an denen ein Spieler beteiligt ist | ✅ (Tore + Assists) / Teamtore in Spielen mit Spieler | M7 |
| **Primary Points** | Eishockey | Tore + erste Assists (zweite Assists sind wenig stabil) | ✅ Unsere Daten haben ohnehin nur einen Assist | – |
| **Quality of Competition / Teammates (QoC/QoT)** | Eishockey | Wie stark waren Gegner und Mitspieler, wenn der Spieler dabei war? | ✅ Auf Spielebene: Ø Gegnerstärke (M1) und Ø Spielereffekt der Mitspieler (M5) | M5 |
| **Aging Curves** | alle Sportarten | Leistungsentwicklung nach Alter | 🟡 Kein Alter in den Daten; stattdessen **Erfahrungskurven** nach Anzahl Ligasaisons | neu |
| **Archetypen per Clustering** | Basketball (Positionless), Fußball | Spielertypen datenbasiert statt per Regel | ✅ Ergänzung zu den bestehenden regelbasierten Traits (`detectTypes`), z. B. Gaußsche Mischmodelle auf Stilprofilen | – |

### A.4 Stichprobe, Glück und Verlässlichkeit

| Methode | Herkunft | Idee | Für uns | Modul |
|---|---|---|---|---|
| **Regression to the Mean / Empirical Bayes** | Baseball (Tango), überall | Rohquoten Richtung Mittelwert schrumpfen, je kleiner die Stichprobe | ✅ Pflicht für alle Quoten | M2, M3, M5 |
| **Stabilisierungspunkte** | Baseball, Eishockey | Ab wie vielen Spielen misst eine Kennzahl eher Können als Zufall? | ✅ Split-Half-Reliabilität mit Spearman-Brown-Korrektur, bekannt aus der psychologischen Testtheorie | Abschnitt 7 |
| **Hot-Hand-Analyse** | Basketball (Gilovich; Korrektur Miller & Sanjurjo 2018) | Gibt es echte Serien oder nur Zufall? | ✅ Test, ob Tor-Serien häufiger als bei unabhängigen Spielen auftreten, mit der Bias-Korrektur | M8 |
| **PDO** | Eishockey | Schusseffizienz + Fangquote als Glücksindikator | ❌ keine Schüsse; Ersatz: Pythagorean-Abweichung und Ergebnis in engen Spielen | – |
| **Ergebnis in engen Spielen** | NFL, NHL | Bilanz in knappen Spielen ist stark zufallsgetrieben und kehrt zum Mittel zurück | ✅ Hinweis „Bilanz in knappen Spielen vermutlich nicht nachhaltig“ | M7, M8 |

### A.5 Belastung und Rahmenbedingungen

| Methode | Herkunft | Idee | Für uns | Modul |
|---|---|---|---|---|
| **Back-to-Back / Rest-Analyse** | NBA, NHL | Leistung ohne Ruhetag | ✅ 1. gegenüber 2. Spiel des Tages; Tage zwischen Spieltagen | M4 |
| **Reiseentfernung** | NBA, MLB | Einfluss langer Anreise | 🟡 nur mit einmalig gepflegten Hallenkoordinaten | M4 |
| **Heimvorteil** | alle | Vorteil in eigener Halle | ✅ als **Ausrichter-Vorteil** (Teams, die den Spieltag ausrichten) | M1 |
| **Squad Rotation / Belastungssteuerung** | Fußball | Minuten pro Spieler über die Saison | 🟡 Proxy über Kadergröße (Belastungsindex) | M4 |

### A.6 Netzwerke und Zusammenspiel

| Methode | Herkunft | Idee | Für uns | Modul |
|---|---|---|---|---|
| **Passnetzwerke** | Fußball | Wer spielt mit wem, wer ist Knotenpunkt? | 🟡 als **Assist-Netzwerk** (nur torgefährliche Pässe) | M7 |
| **Zentralitätsmaße** (Degree, Betweenness, PageRank) | Netzwerkanalyse | Wichtigkeit eines Spielers im Netzwerk | ✅ auf dem Assist-Netzwerk, bei kleinen Teams gewichteter Grad am robustesten | M7 |
| **Lineup-Net-Rating** | Basketball | Leistung bestimmter Fünfer- oder Dreier-Kombinationen | 🟡 nur mit echten Reihen aus dem Einsatz-Center, das aktuell keine echten Daten enthält | – |
| **Chemistry / Synergy (Duo-RAPM)** | Basketball | Mehrwert von Spielerpaaren über die Summe der Einzeleffekte hinaus | 🟡 Interaktionsterme in M5; ergänzt die bestehende Duo- und Anti-Synergie-Logik | M5 |

### A.7 Mit unseren Daten nicht möglich

| Methode | Warum nicht |
|---|---|
| **xG (Expected Goals)**, Shot Quality, High-Danger Chances | keine Schüsse, keine Schusspositionen |
| **Corsi / Fenwick** (Schussversuche) | keine Schussdaten |
| **Save-% / GSAx** (Goals Saved Above Expected) | keine Schüsse aufs Tor; M3 nutzt „Tore verhindert gegenüber Erwartung“ als ehrlich benannten Ersatz |
| **TOI-basierte Werte** (Punkte pro 60 Minuten, Schicht-RAPM) | keine Einsatzzeiten |
| **PPDA, Zone Entries, Tracking-Metriken** | keine Positions- oder Aktionsdaten |
| **Schiedsrichter-Analysen** | Schiedsrichterfelder in dieser Liga nicht gepflegt |

---

**Zurück:** [50-entscheidungen.md](50-entscheidungen.md) · [docs/spec/index.md](index.md)

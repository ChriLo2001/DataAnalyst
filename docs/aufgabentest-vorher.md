# Aufgabentest „vorher" (P0b.9)

Reproduzierbarer 3-Personen-Aufgabentest gemäß Spezifikation Abschnitt 6.11
(„Aufgabentest mit 3 Personen (Trainer, Spieler, Chris) vor und nach dem Umbau,
jeweils ohne Hilfe") und Roadmap-Zeile P0b („Aufgabentest „vorher""). Dieses
Dokument definiert **nur das Testprotokoll und objektiv beobachtbare
Baseline-Fakten zum aktuellen UI** — es enthält keine durchgeführten Antworten,
keine erfundenen Personeneigenschaften und keine subjektiven Bewertungen.

## 1. Zweck und Zeitpunkt

- **Zweck:** Referenzpunkt für den in P10 vorgesehenen „nachher"-Aufgabentest.
  Verglichen werden soll, ob nach dem Abschnitt-6-Umbau (P0b–P10) dieselben
  Informationsziele **mindestens gleich gut** erreichbar sind (Roadmap-Akzeptanz
  P10: „keine Aufgabe schlechter als vorher").
- **Zeitpunkt/Baseline-Stand:** vor Beginn des UI-Umbaus (P0b.2 ff.), auf Basis
  von Commit `01df862` (nach Abschluss P0a.1–P0a.8 und P0b.1).
- **Grundlage der Aufgaben:** ausschließlich der in [docs/ui-inventar.md](ui-inventar.md)
  dokumentierte, tatsächlich vorhandene Funktionsumfang — keine Aufgabe setzt
  eine nicht existierende Funktion voraus (siehe Abschnitt 5, Abgleich-Tabelle).

## 2. Testpersonen

Drei Rollen gemäß 6.11, ohne erfundene individuelle Eigenschaften — die Rollen
beschreiben nur den Blickwinkel, aus dem die Aufgabe gestellt wird:

1. **Trainer** — sucht spiel-/gegner-/aufstellungsbezogene Informationen zur
   Vorbereitung und Nachbereitung.
2. **Spieler** — sucht eigene bzw. teambezogene Leistungsinformationen.
3. **Chris / analytisch interessierter Nutzer** — sucht saisonübergreifende,
   vergleichende bzw. historische Analysen.

## 3. Aufgaben

Drei der neun Aufgaben (TR1, TR2, SP2) entsprechen wörtlich den drei in 6.11
vorgegebenen Beispielfragen; sie sind unten so gekennzeichnet. Die übrigen
Aufgaben sind zusätzliche, aus dem UI-Inventar abgeleitete Aufgaben je Rolle
(vom Auftrag als „mehrere konkrete Aufgaben" pro Person gefordert).

Alle Aufgaben werden „ohne Hilfe" gestellt (6.11) — d. h. ohne Vorab-Erklärung
des Navigationswegs; die „Klick-/Navigationsinformationen" je Aufgabe dienen
ausschließlich der späteren Reproduzierbarkeit (damit in P10 exakt dieselbe
Aufgabe erneut gestellt werden kann), nicht als Hilfestellung für die
Testperson selbst.

---

### TR1 — Trainer: letzter Spieltag *(entspricht 6.11-Frage 1: „Wie lief der letzte Spieltag?")*

| Feld | Inhalt |
|---|---|
| Ausgangssituation | Testperson öffnet die Anwendung frisch über die Cover-Seite, eine Saison ist noch nicht ausgewählt. |
| Aufgabe | „Wie liefen die beiden letzten Spiele unseres Teams, und auf welchem Tabellenplatz stehen wir aktuell?" |
| Informationsziel | Ergebnisse der beiden letzten Ulmer Spiele (Ergebnis, Gegner) + aktueller Tabellenplatz |
| Erlaubte Hilfsmittel | nur die Anwendung selbst, keine Erklärung durch Dritte |
| Erfolgskriterium | Testperson nennt Ergebnis und Gegner der letzten 2 Spiele sowie den aktuellen Tabellenplatz korrekt |
| Navigationshinweis (für Reproduzierbarkeit) | Cover → Saison-Button (z. B. „25/26") → Header-Nav „🏒 Team" → Spielliste (chronologisch aufsteigend, die gesuchten Spiele stehen am Ende der Liste) + Tabellen-Abschnitt auf derselben Seite (`rTeamPage`) |

**Baseline-Beobachtung:** Es gibt aktuell **keine eigene „Spieltag"-Ansicht**
(ein Team-Spieltag besteht laut Turnierformat aus 2 Spielen an einem Termin).
Die Team-Seite listet alle Spiele der Saison als flache, chronologische Liste;
die Testperson muss selbst erkennen, welche der letzten Einträge zum selben
Spieltag gehören. `buildMatchdays()` (P0a.5) existiert im Code, ist aber an
keiner UI-Stelle angebunden.

---

### TR2 — Trainer: gefährlichster Gegnerspieler *(entspricht 6.11-Frage 2: „Wer ist beim nächsten Gegner am gefährlichsten?")*

| Feld | Inhalt |
|---|---|
| Ausgangssituation | Testperson befindet sich bereits in einer geladenen Saison (Header-Nav sichtbar). |
| Aufgabe | „Der nächste Gegner ist [vom Testleiter vorab konkret benannt, z. B. „FBC Heidelberg"] — wer ist bei diesem Gegner am gefährlichsten?" |
| Informationsziel | Auffälligster/gefährlichster gegnerischer Scorer bzw. Spieler-Kennzahl aus der Gegner-Scouting-Ansicht |
| Erlaubte Hilfsmittel | nur die Anwendung selbst |
| Erfolgskriterium | Testperson nennt einen konkreten gegnerischen Spieler mit einer belegenden Kennzahl aus dem Matchcenter |
| Navigationshinweis | Header-Nav „Matchcenter" → Gegner aus Dropdown auswählen → Tab „Spieler" (bzw. „Details"/Scouting-Inhalte je nach Tab) |

**Baseline-Beobachtung:** Der Gegner muss **manuell aus einer Liste ausgewählt**
werden (`getMatchcenterOpponents()`) — es gibt keine automatische Erkennung
„nächster Gegner" (keine Verknüpfung mit Spielplan-/Terminlogik). Das
Matchcenter hat **13 Tabs** (siehe UI-Inventar Abschnitt 2.5); die relevante
Information ist über mehrere Tabs verteilt (u. a. „Spieler", „Duos", „Details").

---

### TR3 — Trainer: Einsatzhäufigkeit eines Spielers

| Feld | Inhalt |
|---|---|
| Ausgangssituation | Testperson befindet sich in einer geladenen Saison. |
| Aufgabe | „Wie oft wurde Spieler [vom Testleiter konkret benannt] in dieser Saison im Feld bzw. im Tor eingesetzt?" |
| Informationsziel | Anzahl Feld-Einsätze / Tor-Einsätze / Gesamteinsätze des benannten Spielers |
| Erlaubte Hilfsmittel | nur die Anwendung selbst |
| Erfolgskriterium | Testperson nennt die korrekten Einsatzzahlen aus den Usage Statistics |
| Navigationshinweis | Header-Nav „Einsatz-Center" → Usage-Statistics-Abschnitt (`rEinsatzCenterStats`, direkt oben auf der Seite, keine weitere Navigation nötig) |

**Baseline-Beobachtung:** Einsatz-Center ist **nicht über die Cover-Seite**
erreichbar, sondern ausschließlich über das Header-Nav innerhalb einer bereits
geladenen Saison (siehe UI-Inventar Abschnitt 1.1) — ein zusätzlicher, nicht
offensichtlicher Zwischenschritt gegenüber den anderen Werkzeugen, die auch
direkt vom Cover aus erreichbar sind.

---

### SP1 — Spieler: eigene Saison-Statistiken

| Feld | Inhalt |
|---|---|
| Ausgangssituation | Testperson befindet sich in einer geladenen Saison. |
| Aufgabe | „Finde deine eigenen Tore, Assists und Punkte in dieser Saison." |
| Informationsziel | Tore/Assists/Punkte-Kennzahlen des eigenen Spielerprofils |
| Erlaubte Hilfsmittel | nur die Anwendung selbst |
| Erfolgskriterium | Testperson nennt die drei Kennzahlen korrekt |
| Navigationshinweis | Header-Nav „👤 Spieler" → eigenen Namen aus den Spieler-Tabs (`ptabs`) auswählen → Kennzahl-Kacheln (`rSeasonProfileKpis`) bzw. Tab „Tabelle" |

**Baseline-Beobachtung:** Die Spielerauswahl erfolgt über eine horizontale
Tab-Leiste aller Kader-Spieler; bei größeren Kadern ist Scrollen/Suchen in
dieser Leiste nötig, es gibt kein Suchfeld für Spieler auf dieser Seite.

---

### SP2 — Spieler: Goalie-Entwicklung über die Saison *(entspricht 6.11-Frage 3: „Wie hat sich unser Goalie über die Saison entwickelt?")*

| Feld | Inhalt |
|---|---|
| Ausgangssituation | Testperson befindet sich in einer geladenen Saison. |
| Aufgabe | „Wie hat sich unser Goalie über die Saison entwickelt?" |
| Informationsziel | Entwicklungstendenz einer Goalie-Kennzahl über den Saisonverlauf (z. B. über den Tab „Tabelle" spielweise nachvollziehbar) |
| Erlaubte Hilfsmittel | nur die Anwendung selbst |
| Erfolgskriterium | Testperson benennt eine Tendenz (besser/schlechter/gleichbleibend) anhand mindestens einer im UI sichtbaren Kennzahl über mehrere Spiele hinweg |
| Navigationshinweis | Header-Nav „👤 Spieler" → Goalie in den Spieler-Tabs auswählen (automatischer Wechsel in die Goalie-Ansicht, `rGoalieAnalysis`) → Tab „Tabelle" (`rGoalieTable`, spielweise Übersicht) |

**Baseline-Beobachtung:** `rGoalieAnalysis` bietet 5 Tabs (Überblick, Phasen,
Gegner, Stabilität, Tabelle); es gibt **keinen eigenen „Entwicklung über die
Zeit"-Verlaufstab** — eine Entwicklungstendenz muss aus der spielweisen Tabelle
selbst abgelesen werden, es existiert keine explizite Trendlinie/Sparkline für
Goalie-Kennzahlen auf dieser Seite.

---

### SP3 — Spieler: Vergleich mit einem Mitspieler

| Feld | Inhalt |
|---|---|
| Ausgangssituation | Testperson befindet sich auf der Cover-Seite oder in einer geladenen Saison. |
| Aufgabe | „Vergleiche dich mit einem Mitspieler [vom Testleiter konkret benannt] bei einer selbst gewählten Kennzahl." |
| Informationsziel | Direktvergleich zweier Spieler in mindestens einer Kennzahl |
| Erlaubte Hilfsmittel | nur die Anwendung selbst |
| Erfolgskriterium | Testperson stellt einen gültigen Vergleich mit beiden Spielern im Vergleichszentrum her und liest mindestens eine Kennzahl ab |
| Navigationshinweis | Cover → „Vergleichszentrum" ODER Header-Nav „Vergleichszentrum" → Auswahlbildschirm (`S.comparisonMode`) → Modus „single" → beide Spieler nacheinander über „+ Zum Vergleich hinzufügen" auswählen |

**Baseline-Beobachtung:** Das Vergleichszentrum hat einen eigenen
Auswahlbildschirm vor dem eigentlichen Vergleich (`rComparisonModeSelect`,
zusätzlicher Navigationsschritt). Laut UI-Inventar Abschnitt 5 existieren in
diesem Codebereich mehrere doppelt definierte Funktionen — für den Aufgabentest
selbst ohne beobachtbare Auswirkung, da nur die jeweils aktive (letzte)
Definition ausgeführt wird.

---

### CH1 — Chris: All-Time-Bestenliste

| Feld | Inhalt |
|---|---|
| Ausgangssituation | Testperson startet auf der Cover-Seite. |
| Aufgabe | „Finde die All-Time-Torschützenliste über alle Saisons hinweg — wer steht an der Spitze?" |
| Informationsziel | Spitzenreiter der All-Time-Torschützenliste |
| Erlaubte Hilfsmittel | nur die Anwendung selbst |
| Erfolgskriterium | Testperson nennt den korrekten Spitzenreiter aus der Hall-of-Fame-Rangliste |
| Navigationshinweis | Cover → „Hall of Fame" → Toplisten-Abschnitt (`rHallPodiumList`, Kategorie Torjäger) |

**Baseline-Beobachtung:** Hall of Fame ist wie Alltime Spieler und Lexikon
**nur über die Cover-Seite** erreichbar (siehe UI-Inventar 1.1) — aus einer
bereits geladenen Saison heraus muss erst über „← Cover" zurücknavigiert
werden.

---

### CH2 — Chris: Saisonvergleich desselben Spielers

| Feld | Inhalt |
|---|---|
| Ausgangssituation | Testperson befindet sich im Vergleichszentrum. |
| Aufgabe | „Vergleiche die Punkteausbeute von Spieler [vom Testleiter konkret benannt] in zwei verschiedenen Saisons." |
| Informationsziel | Punkte-Kennzahl desselben Spielers für zwei unterschiedliche Saisons nebeneinander |
| Erlaubte Hilfsmittel | nur die Anwendung selbst |
| Erfolgskriterium | Testperson fügt zwei Saison-Varianten desselben Spielers dem Vergleich hinzu und liest beide Punktewerte ab |
| Navigationshinweis | Vergleichszentrum → Modus „single" → Spieler auswählen → im Auswahlfeld „Leistung wählen" zwei unterschiedliche Saison-Varianten desselben Spielers nacheinander hinzufügen |

**Baseline-Beobachtung:** Die Saisonauswahl erfolgt über ein Dropdown
„Leistung wählen" mit textuellen Einträgen (Saisonlabel + Punkte + Spiele);
es ist nicht auf den ersten Blick ersichtlich, dass hierüber auch
Saison-zu-Saison-Vergleiche desselben Spielers möglich sind (kein expliziter
Hinweis/Label „Saisonvergleich").

---

### CH3 — Chris: Duo-Netzwerk über die Karriere

| Feld | Inhalt |
|---|---|
| Ausgangssituation | Testperson startet auf der Cover-Seite. |
| Aufgabe | „Finde heraus, mit welchem Mitspieler [vom Testleiter konkret benannter Spieler] über die gesamte Karriere hinweg am erfolgreichsten harmoniert hat." |
| Informationsziel | Bestes/erfolgreichstes Duo-Ergebnis eines Spielers über alle Saisons hinweg |
| Erlaubte Hilfsmittel | nur die Anwendung selbst |
| Erfolgskriterium | Testperson nennt ein konkretes Duo-Ergebnis aus der Duo-Netzwerk-Ansicht |
| Navigationshinweis | Cover → „Alltime Spieler" → Spieler in Tab-Leiste auswählen → Tab „Duo-Netzwerk" (`rGlobalDuoNetwork`) |

**Baseline-Beobachtung:** „Alltime Spieler" ist ebenfalls nur über die
Cover-Seite erreichbar. Der Tab „Duo-Netzwerk" ist einer von 6 Tabs auf dieser
Seite (siehe UI-Inventar Abschnitt 2.11) — bei Goalie-Rolle des ausgewählten
Spielers reduziert sich die Tab-Leiste auf 2 Tabs und „Duo-Netzwerk" ist dann
gar nicht verfügbar (Sonderfall, der bei der Personenauswahl beachtet werden
muss).

---

## 4. Objektive Baseline-Beobachtungen (zusammengefasst)

Nur tatsächlich beobachtbare Eigenschaften, keine Gesamtbewertung:

| Aufgabe | Ungefähre Navigationsschritte (Klicks) | Erreichbar ab | Auffindbarkeitsbesonderheit |
|---|---|---|---|
| TR1 | 3 (Saison wählen → Team → Liste absuchen) | Cover | keine dedizierte Spieltag-Ansicht, nur Rohliste |
| TR2 | 3–4 (Matchcenter → Gegner wählen → Tab wechseln) | Header-Nav (Saison muss geladen sein) | manuelle Gegnerauswahl, kein „nächster Gegner"-Hinweis |
| TR3 | 1 (Einsatz-Center öffnen, Statistik steht direkt oben) | Header-Nav (Saison muss geladen sein) | Einsatz-Center hat keinen Cover-Zugang |
| SP1 | 2 (Spieler-Tab → eigenen Namen wählen) | Header-Nav (Saison muss geladen sein) | Spielerliste ohne Suchfeld |
| SP2 | 2–3 (Spieler-Tab → Goalie wählen → Tab „Tabelle") | Header-Nav (Saison muss geladen sein) | kein Verlaufs-/Trend-Tab für Goalies |
| SP3 | 3–4 (Vergleichszentrum → Modus wählen → 2 Spieler hinzufügen) | Cover oder Header-Nav | zusätzlicher Auswahlbildschirm vor dem Vergleich |
| CH1 | 1 (Cover → Hall of Fame) | Cover | nur von Cover aus erreichbar |
| CH2 | 3–4 (Vergleichszentrum → Spieler → 2 Saison-Varianten hinzufügen) | Cover oder Header-Nav | Saisonvergleich nicht als eigene Option beschriftet |
| CH3 | 2 (Cover → Alltime Spieler → Tab „Duo-Netzwerk") | Cover | Tab entfällt bei Goalie-Auswahl |

Wiederkehrende, bereits aus dem UI-Inventar bekannte Auffindbarkeitsmuster:
- Drei Ansichten (Hall of Fame, Alltime Spieler, Lexikon) sind ausschließlich
  über die Cover-Seite erreichbar, nicht aus dem laufenden Dashboard heraus.
- Einsatz-Center ist umgekehrt ausschließlich aus dem laufenden Dashboard
  erreichbar, nicht von der Cover-Seite aus.
- Es existiert keine automatische „nächster Spieltag"/„nächster Gegner"-Erkennung.
- Größere Tab-Mengen (Matchcenter: 13, Player-Saisonprofil: 8) verteilen
  zusammengehörige Informationen auf mehrere Klicks.

## 5. Abgleich mit dem UI-Inventar

Jede der neun Aufgaben wurde gegen [docs/ui-inventar.md](ui-inventar.md) geprüft:

| Aufgabe | Verwendete Inventar-Einträge |
|---|---|
| TR1 | 2.4 Team-Seite (`rTeamPage`) |
| TR2 | 2.5 Matchcenter (`rMatchcenterPage`, Tabs „players"/„details") |
| TR3 | 2.7 Einsatz-Center View (`rEinsatzCenterStats`) |
| SP1 | 2.3 Spieler-/Saisonprofil (`rSeasonProfileKpis`) |
| SP2 | 2.3 Goalie-Zweig (`rGoalieAnalysis`, Tab „table"/`rGoalieTable`) |
| SP3 | 2.9 Vergleichszentrum, Modus „single" |
| CH1 | 2.10 Hall of Fame (`rHallPodiumList`) |
| CH2 | 2.9 Vergleichszentrum, Saison-Varianten (`getComparisonVariantsForPlayer`) |
| CH3 | 2.11 Alltime Spieler, Tab „duoNetwork" (`rGlobalDuoNetwork`) |

Keine Aufgabe setzt eine im UI-Inventar als „nicht existent"/„bewusst nicht Teil
des Umbaus" markierte Funktion voraus (insbesondere keine M1–M10-Inhalte, kein
Vorschau-Modus, keine Matchday-UI).

## 6. Späterer Vergleich (P10)

Dieselben neun Aufgaben (TR1–TR3, SP1–SP3, CH1–CH3) werden in P10 nach
Abschluss des Umbaus identisch erneut gestellt (6.11: „vor und nach dem
Umbau"). Verglichen werden ausschließlich objektiv feststellbare Aspekte,
keine Gesamturteile:

- **Auffindbarkeit:** wird die Zielinformation ohne Hilfe gefunden (ja/nein)?
- **Navigationsweg:** über welchen Einstiegspunkt (Cover/Übersicht/Hauptnavigation)
  und über wie viele Zwischenschritte wird das Ziel erreicht?
- **Erfolgreiche Aufgabenlösung:** wird das in der jeweiligen Aufgabe genannte
  Erfolgskriterium erfüllt?
- **Benötigte Schritte:** Klick-/Tab-Anzahl im Vergleich zur in Abschnitt 4
  dokumentierten „vorher"-Zahl.
- **Sichtbare Informationsstruktur:** ist die gesuchte Information auf einer
  Seite/einem Tab gebündelt oder weiterhin auf mehrere Tabs verteilt (Vergleich
  zu den in Abschnitt 4 genannten Tab-Mengen)?

Die Roadmap-Akzeptanz für P10 lautet „keine Aufgabe schlechter als vorher" —
dieses Dokument liefert dafür die überprüfbare Referenz je Aufgabe.

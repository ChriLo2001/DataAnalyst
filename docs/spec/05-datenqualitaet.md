# Datenqualitäts-Korrekturen im bestehenden Dashboard

> Teil von [docs/spec/index.md](index.md). Enthält Abschnitt 5 der ursprünglichen Spezifikation.
>
> **Hinweis zur Einordnung:** Die Zieldatei-Liste des Token-Diät-Auftrags nennt für Abschnitt 5 keine eigene Datei (sie liegt zwischen den Modul-Dateien und `20-ui.md`). Diese Datei (`05-datenqualitaet.md`) ist meine Wahl für diese Lücke, passend zur bestehenden `00`/`10`/`20`/…-Nummerierung und zur ursprünglichen Abschnittsnummer 5. In `index.md` ist sie in der Zuordnungstabelle vermerkt.

---

## 5. Datenqualitäts-Korrekturen im bestehenden Dashboard

Unabhängig von den Modulen, als eigene kleine Aufgaben:

1. **Eigentore:** `goal_type === 'owngoal'` darf keinem Spieler als Tor gutgeschrieben werden und keinen Assist erzeugen. Betrifft Scorer-, Clutch-, Duo- und Hall-of-Fame-Werte. Vorher/nachher-Diff der betroffenen Spieler im PR dokumentieren.
2. **Penaltys:** `penalty_shot` als eigene Kennzahl ausweisen (Tore aus Penaltys), in Scorerwerten weiter enthalten.
3. **Zeitformat:** ✅ Erledigt (S2e-Auftrag "Spielzeit normalisieren"). Kumulierte Zeit in Halbzeit 2 wurde NICHT korrekt behandelt (`goalieEventAbsSeconds`/`getPhaseKey` unterstellten für Halbzeit 2 immer die relative Lesart). Zentral behoben in `scripts/game-clock.mjs` (Browser-Port in `matchcenter-core.js`): Mehrheitsregel je Spiel entscheidet relativ/durchlaufend/unklar, widersprechende Einzelereignisse werden verworfen statt falsch gerechnet, `parseClockString` (vorher `parseGameClock`) liest zusätzlich Punkt statt Doppelpunkt. Alle Phasen- und Timing-Auswertungen umgeleitet (siehe dortiger Bericht für die betroffenen Stellen).
4. **Timeouts:** Events werden in M0/M7 genutzt. Im Dashboard mindestens in der Spielansicht anzeigen.
5. **Datenstand:** Sichtbarer Hinweis „Daten bis Spieltag X (Datum)“.
6. **Strafenlogik (S2i-Auftrag "Strafenklassifikation zusammenführen"):** Die Regeln stammen von Chris, nicht recherchiert — maßgeblich, trägt die Unterscheidung Spieler-/Mannschaftsstrafe, vorher nur als Zahlen im Code ohne Begründung vorhanden:

   | Strafe | gegen den Spieler | gegen die Mannschaft |
   |---|---|---|
   | 2 Minuten | 2 Minuten | 2 Minuten Unterzahl |
   | 2+2 | 4 Minuten | zweimal 2 Minuten, einzeln durch ein Tor ablösbar |
   | 10 Minuten | 10 Minuten | 2 Minuten Unterzahl |
   | Matchstrafe (MS) | ganzes Spiel | wie 2+2: zweimal 2 Minuten |

   Es gibt keine 5-Minuten-Strafe in der Praxis (0 von 288 archivierten Strafen); der Code behält den Fall als unerreichten Platzhalter.

   Umgesetzt über `classifyPenaltyType(ev)` (index.html) — **eine** Klassifikation statt vorher drei unabhängiger (`isMatchPenaltyEvent`, `getSpecialTeamsPenaltyChunks`, `getPenaltyDisciplineType` entschieden dieselbe Frage mit eigenen Textmustern; „MS" traf `\bms\b`, aber nicht `includes('match')` — die eine echte Matchstrafe im Archiv, `penalty_ms_full`, 25/26 Spiel 44415, bekam dadurch nur eine 2-Minuten-Überzahlchance statt zwei). Primär auf `penalty_type` geschlüsselt (Rohcode des Saisonmanagers, bei allen 288 archivierten Strafen vorhanden und eindeutig), Text (`penalty_type_string`/`event_type`/`penalty_reason_string`) nur als Rückfallebene. Ein über beide Wege unbestimmbarer Typ gilt als `unknown` und wird über den bestehenden Diagnosekanal (`stats.diagnostics.unknownPenaltyDurations`) gemeldet, statt stillschweigend als 2-Minuten-Überzahlchance (`[120]`) geraten zu werden.

   **Nicht geändert, bewusst offen:** `getPenaltyPersonalMinutes` behandelt eine Matchstrafe nicht als feste Zahl, sondern rechnet "Rest des laufenden Spiels + volle Dauer etwaiger weiterer Spiele am selben Tag" in Minuten — eine genuine Annäherung an „ganzes Spiel", aber nur im vollen Pfad mit Spielkontext; der isolierte Basiswert (`getPenaltyBasePersonalMinutes`, nur Rückfall bei unlesbarer Zeit, sowie die ungenutzte `disciplineMinutes`-Markierung) liefert für eine Matchstrafe weiterhin den Platzhalter 4. Ob und wie „ganzes Spiel" als eigene Zahl geführt werden soll, ist eine Entscheidung von Chris, keine stillschweigende Annahme dieser Phase.

   **Vorher/Nachher an den echten Daten:** Die einzige betroffene Strafe (Spiel 44415) liegt in einem Spiel ohne Ulm-Beteiligung (Breisgau Bandits – Floorball Mannheim) — `buildSpecialTeamsForGame`/`buildSpecialTeamsForSeason` verarbeiten ausschließlich Spiele mit Ulm-Seite (`detectSide(game)`). Die Korrektur ändert daher an keiner heute sichtbaren Stelle einen Wert (Team-Seite Special Teams, die zwei Goalie-Hall-of-Fame-Einträge „Penalty-Kill-Rückhalt"/„Unterzahlstärke", Matchcenter-Gegnerhinweise) — nicht, weil die Korrektur wirkungslos wäre, sondern weil die einzige Matchstrafe im Archiv nie in die Ulm-bezogene Auswertung einfließt. Wird erst sichtbar, sobald eine Matchstrafe in einem Ulm-Spiel vorkommt.

   **Tatsächliche Spielerzahl (3 gegen 3, 2 gegen 2 bei sich aufhebenden Strafen):** Keine Stelle zeigt das — nur die Zustände Überzahl/Unterzahl/Gleichstand/normal (`specialTeamsStateFromActive`). Kommt im Archiv nie vor (keine gleichzeitigen Strafen gegen beide Mannschaften), nur gemeldet, nicht gebaut.

---

## Datenqualitäts-Phase (Spieltagsstatus und M0-Spielfilter)

Ergänzung aus der Datenqualitäts- und Spieltagsstatus-Phase (nicht Teil der ursprünglichen Spezifikation, siehe [10-architektur.md](10-architektur.md) Abschnitt 3.6.3 und [module/M0.md](module/M0.md)):

1. **Spieltagsstatus spezifikationskonform:** Ein Spieltag gilt als `abgeschlossen`, wenn jedes Spiel entweder beendet ist ODER endgültig nicht an diesem Termin stattfindet (`notice_type` passt auf `Postponed`/`Canceled`, real beobachtete Rohwerte über alle fünf Saisons). `unvollständig` gilt nur noch für Spiele, die weder beendet noch verlegt/abgesagt sind (`scripts/matchday-derivation.mjs`). Ein verlegtes Spiel zählt automatisch am neuen Termin, sobald es dort beendet ist — ohne Sonderlogik, da `buildMatchdays()` ohnehin nach Datum/Spieltagnummer gruppiert. Effekt an echten Daten: 24/25 steigt von 3 auf 7 abgeschlossene Spieltage (von 7 insgesamt); 25/26 von 6 auf 8 (von 8 insgesamt).
2. **M0-Datenqualitäts-Ausnahme `ended !== true`:** Ein Spiel mit `ended !== true`, aber vollständigem Ergebnis UND mindestens einem Event, gilt trotzdem als beendet (`isEffectivelyEnded`, `scripts/game-status.mjs`, siehe [module/M0.md](module/M0.md)). Betrifft acht Spiele in 21/22 (25677, 25679, 25681, 25682, 25683, 26478, 26613, 26644) — allgemein formulierte Regel, keine hartverdrahtete ID-Liste im Code. Seit der ended-Vereinheitlichungs-Phase nutzen M0 (`scripts/model/normalize.mjs`) UND die Spieltag-Ableitung (`scripts/matchday-derivation.mjs`, 3.6.3) exakt dieselbe Funktion, nicht mehr zwei getrennte Umsetzungen derselben Regel.

---

**Weiter:** [20-ui.md](20-ui.md) · **Zurück:** [module/M0.md](module/M0.md)

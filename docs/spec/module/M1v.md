# M1v · Team-Nachfolge und Vererbung

> Teil von [docs/spec/index.md](../index.md). Modul-Abschnitt aus Abschnitt 4 der ursprünglichen Spezifikation. Voraussetzung: [M1](M1.md).

---

### M1v · Team-Nachfolge und Vererbung (neue, fusionierte und umbenannte Teams)

**Ziel:** Ein Team, das neu in der Liga antritt, aber faktisch Nachfolger eines oder mehrerer bestehender Teams ist, startet nicht bei null. Es **erbt die Werte seiner Vorgänger, bis es genug eigene Daten hat** — und die Herkunft ist jederzeit sichtbar.

Anlass: In 26/27 tritt „SG Heidelberg-Mannheim" an, offenbar als Zusammenschluss von FBC Heidelberg und Floorball Mannheim (je 14 Spiele Historie in 25/26). Sportvg Feuerbach stellt zwei Mannschaften („Biber", „Rössle"), während in den Daten bereits ein zweites Feuerbach-Team aus 22/23 existiert.

**Nachfolge-Tabelle** (`data/team-lineage.json`, von Hand gepflegt, versioniert):

```json
{
  "schemaVersion": 1,
  "lineage": [
    { "teamKey": "sg-heidelberg-mannheim", "sinceSeason": "26/27",
      "predecessors": [
        { "teamKey": "fbc-heidelberg", "weight": 0.5, "scope": { "models": true, "display": true } },
        { "teamKey": "floorball-mannheim", "weight": 0.5, "scope": { "models": true, "display": true } }
      ],
      "note": "Zusammenschluss, bestätigt durch Chris" }
  ]
}
```

- Gewichte je Vorgänger summieren sich zu 1. Bei einer Umbenennung ein Vorgänger mit Gewicht 1.
- Die Tabelle wird **nie automatisch** ergänzt. Ein unbekanntes neues Team erzeugt eine Warnung im Build-Bericht und im UI, nie eine geratene Zuordnung.
- **`scope` je Vorgänger — verbindlich:** `{"models": true|false, "display": true|false}`.
  - `models`: Vererbung in Berechnungen (M1 und die davon abhängigen Module). Hier ist auch eine weit zurückliegende Vorgeschichte zulässig; die bestehende Zeitgewichtung entwertet sie ohnehin automatisch.
  - `display`: Vererbung in allem, was nach außen sichtbar wird (Form, letztes Duell, Vorschauvideos, Social-Media-Inhalte). **Erlaubt nur, wenn die Vorgängersaison unmittelbar vorangeht** (höchstens eine Saison Lücke). Alles Ältere bleibt `display: false`.
  Beispiel: „Sportvg Feuerbach 2" aus 22/23 wäre für eine heutige zweite Feuerbach-Mannschaft `models: true`, `display: false` — für interne Rechnungen brauchbar, für einen Instagram-Post zu alt.

**Team-IDs sind für die Nachfolge nicht verwendbar** (geprüfter Befund): `home_team_id`/`guest_team_id` werden jede Saison neu vergeben (DJK Giants Karlsruhe-Ost: 4838 → 5512 → 5708 → 6684 → 7694). Sie identifizieren eine Saison-Registrierung, nicht ein Team über Zeit. Nachfolge lässt sich damit nicht ableiten.

**Zuordnungsvorschlag per Spielerüberschneidung (Werkzeug, kein Automatismus):** `scripts/suggest-team-lineage.mjs` vergleicht die Kader eines neuen Teams mit den Kadern aller Teams der Vorsaison über `player_id` und berichtet die Überschneidungsquoten. Das Skript **schreibt nichts** und ändert `data/team-lineage.json` nie selbst; es liefert nur eine Empfehlung mit Zahlen, die ein Mensch bestätigt. Vor dem ersten Spieltag einer Saison gibt es keine Kader, dann gibt das Skript das ehrlich als „noch nicht entscheidbar" aus.

**Übergangsgewicht:** Für jede geerbte Kennzahl gilt
`wert = w · eigener Wert + (1 − w) · Vorgängerwert`, mit `w = n / (n + k)`, `n` = eigene gezählte Spiele, `k` = Halbwertsstichprobe (Default **6** Spiele, konfigurierbar, per M9 überprüfbar).
Nach 6 eigenen Spielen zählt die eigene Leistung zur Hälfte, nach 18 zu drei Vierteln. Der Vorgängeranteil verschwindet, er wird nur klein.

**Wo Vererbung gilt:**

| Modul | Verhalten |
|---|---|
| M1 Teamstärke | Vorgängerstärke als **Prior** statt Ligamittel; zusätzlich zur bestehenden Zeitgewichtung. Die eigene Schätzung bleibt unverändert berechnet, die Vererbung wirkt nur auf den angezeigten und weitergegebenen Wert. |
| M3, M4, M7 | erben über die von M1 gelieferte Erwartung automatisch mit; teamspezifische Profile (Müdigkeit, Rückstandsreaktion, DNA) erben nach derselben Formel |
| M5 Spielereffekte | **keine** Vererbung auf Teamebene; Spieler tragen ihre Historie über `player_id` ohnehin selbst |
| M10 | keine Vererbung; Hypothesentests laufen nur auf eigenen Beobachtungen |

**Darstellung (verbindlich):** Für die Anzeige zählen nur Vorgänger mit `scope.display = true`. Ein geerbter Wert ist immer als solcher gekennzeichnet — Kurzform „teilweise geerbt von FBC Heidelberg und Floorball Mannheim (6 eigene Spiele)", im Tooltip die Gewichte. Historische Einzelheiten wie Ergebnisse und Duelle werden **nie umgeschrieben**: Ein Duell aus 25/26 erscheint mit dem damaligen Namen und dem Zusatz „als FBC Heidelberg".

**Akzeptanzkriterien:**

- Ohne Eintrag in `data/team-lineage.json` verhält sich alles wie heute (keine stille Verhaltensänderung).
- `w = 0` bei 0 eigenen Spielen, `w → 1` bei vielen; Test mit n = 0, 3, 6, 18.
- Ein geerbter Wert ohne Kennzeichnung im UI gilt als Fehler.
- Gewichtssumme ≠ 1 oder unbekannter Vorgänger-Key: harter Abbruch im Build mit klarer Meldung.
- `scope.display = true` bei einer Vorgängersaison, die mehr als eine Saison zurückliegt: harter Abbruch mit Hinweis auf diese Regel.
- Test: derselbe Vorgänger mit `models: true, display: false` wirkt in den Modellwerten, erscheint aber in keinem angezeigten Form- oder Duell-Element.

---

**Siehe auch:** [M1](M1.md) · Entscheidung 13 in [50-entscheidungen.md](../50-entscheidungen.md)

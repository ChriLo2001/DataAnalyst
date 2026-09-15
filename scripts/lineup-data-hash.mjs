// Deterministische Canonical-JSON- und SHA-256-Hash-Hilfsfunktionen für den
// lineup-data Draft/Import-Workflow (baseHash-Prüfung, siehe
// docs/lineup-data-import.md).
//
// WICHTIG: dieses Modul verwendet ausschließlich Standard-ECMAScript und die
// Web-Crypto-API (globalThis.crypto.subtle) — KEIN "node:crypto"-Import. Das
// ist bewusst so gewählt, damit exakt derselbe Code — nicht nur derselbe
// Algorithmus — unverändert sowohl im Node-Importer als auch später im
// Browser-Einsatz-Center läuft. crypto.subtle ist in Node seit Version 19 als
// globale Web-Crypto-API verfügbar (kein Import nötig) und in jedem modernen
// Browser über einen "secure context" (https:// oder http://localhost)
// nutzbar — genau die Umgebungen, in denen dieses Modul verwendet wird.
//
// Reine Funktionen, kein fetch/fs.

/**
 * Deterministische JSON-Serialisierung ("Canonical JSON"): Objekt-Schlüssel
 * werden rekursiv alphabetisch sortiert, keine überflüssigen Leerzeichen,
 * Array-Reihenfolge bleibt erhalten (Reihenfolge ist bei games[]/players[]
 * semantisch relevant, bei Objekt-Schlüsseln nicht). Damit hängt der Hash
 * NICHT von der zufälligen Schlüssel-Reihenfolge beim Erzeugen/Parsen eines
 * Objekts ab, sondern ausschließlich vom tatsächlichen Inhalt.
 *
 * undefined-Werte werden wie bei JSON.stringify() behandelt: als
 * Objekt-Eigenschaft weggelassen, als Array-Element zu null. In der Praxis
 * kommt undefined hier nicht vor, da alle Eingaben aus JSON.parse() stammen.
 *
 * @param {unknown} value
 * @returns {string}
 */
export function canonicalJson(value) {
  if (value === null || typeof value !== 'object') {
    return JSON.stringify(value === undefined ? null : value);
  }
  if (Array.isArray(value)) {
    return `[${value.map((v) => canonicalJson(v)).join(',')}]`;
  }
  const keys = Object.keys(value)
    .filter((k) => value[k] !== undefined)
    .sort();
  return `{${keys.map((k) => `${JSON.stringify(k)}:${canonicalJson(value[k])}`).join(',')}}`;
}

function bytesToHex(bytes) {
  return [...new Uint8Array(bytes)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

/**
 * SHA-256-Hex-Digest eines beliebigen Strings (UTF-8).
 * @param {string} text
 * @returns {Promise<string>}
 */
export async function sha256Hex(text) {
  const bytes = new TextEncoder().encode(text);
  const digest = await globalThis.crypto.subtle.digest('SHA-256', bytes);
  return bytesToHex(digest);
}

/**
 * SHA-256-Hex-Digest der Canonical-JSON-Form eines Werts.
 * @param {unknown} value
 * @returns {Promise<string>}
 */
export async function hashCanonicalValue(value) {
  return sha256Hex(canonicalJson(value));
}

/**
 * baseHash-Definition für einen lineup-data-Draft (siehe
 * docs/lineup-data-import.md, Abschnitt "BaseHash"):
 *
 *   baseHash = SHA-256-Hex( canonicalJson(seasonData) + "\n" + canonicalJson(registryData) )
 *
 * Deckt bewusst BEIDE Dateien ab, auf denen ein Draft potenziell basiert
 * (lineup-data/<season>.json UND die clubweite lineup-data/groups.json) —
 * ein Draft, der Gruppen ändert, hängt implizit auch vom aktuellen
 * Registry-Stand ab. Ein einzelner Hash statt zweier getrennter hält das
 * Draft-Schema absichtlich einfach (ein "baseHash"-Feld, siehe Auftrag).
 *
 * Fehlt lineup-data/<season>.json (noch) auf der Platte, ist der Basiszustand
 * das synthetische leere Dokument {schemaVersion:1, season:<key>, games:[]}
 * (siehe main() im Importer) — der Aufrufer muss diesen Fall bereits VOR dem
 * Aufruf hier auflösen, computeBaseHash() selbst kennt keine Sonderfälle.
 *
 * @param {object} seasonData vollständiger, bereits geparster Inhalt von
 *   lineup-data/<season>.json (oder der synthetische leere Zustand)
 * @param {object} registryData vollständiger, bereits geparster Inhalt von
 *   lineup-data/groups.json
 * @returns {Promise<string>}
 */
export async function computeBaseHash(seasonData, registryData) {
  return sha256Hex(`${canonicalJson(seasonData)}\n${canonicalJson(registryData)}`);
}

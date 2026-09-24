#!/usr/bin/env node
// P2-Runde 1 · Test für scripts/model/stats.mjs (generische numerische Bausteine).
//
// Grundsatz: Erwartungswerte stammen aus Handrechnung, analytischen Lösungen oder UNABHÄNGIGEN Referenzimplementierungen
// im Test (BigInt-RNG, naive Doppelsummen, Reihenentwicklung der Bessel-Funktion, Bisektion, eigener Perzentilcode) —
// nicht aus dem getesteten Code. Alle Zufallswerte haben feste Seeds. Toleranzen stehen bei jeder Prüfung im Label,
// wo sie über exakte Gleichheit hinausgehen, und sind so klein wie die jeweilige Rechnung erlaubt.
//
// Aufruf: node scripts/test-model-stats.mjs

import { readFile } from 'node:fs/promises';
import path from 'node:path';

import * as S from './model/stats.mjs';

const REPO_ROOT = path.resolve(import.meta.dirname, '..');
let failures = 0;

function assertEqual(actual, expected, label) {
  const a = JSON.stringify(actual);
  const e = JSON.stringify(expected);
  if (a === e) {
    console.log(`  ok   ${label}`);
  } else {
    failures++;
    console.log(`  FAIL ${label}\n       erwartet: ${e}\n       erhalten: ${a}`);
  }
}
function assertTrue(cond, label) {
  assertEqual(Boolean(cond), true, label);
}
function assertNear(actual, expected, tol, label) {
  const ok = Number.isFinite(actual) && Math.abs(actual - expected) <= tol;
  if (ok) console.log(`  ok   ${label} (Toleranz ${tol})`);
  else {
    failures++;
    console.log(`  FAIL ${label} (Toleranz ${tol})\n       erwartet: ${expected}\n       erhalten: ${actual}`);
  }
}
function throwsCode(fn, code, label) {
  try {
    fn();
    failures++;
    console.log(`  FAIL ${label}\n       kein Fehler geworfen`);
  } catch (e) {
    if (e instanceof S.NumericError && e.code === code) console.log(`  ok   ${label}`);
    else {
      failures++;
      console.log(`  FAIL ${label}\n       erwartet: NumericError ${code}\n       erhalten: ${e?.name} ${e?.code ?? ''} ${e?.message}`);
    }
  }
}
const clone = (v) => JSON.parse(JSON.stringify(v));

// ── Unabhängige Referenzen ──────────────────────────────────────────────
/** xoshiro128** + splitmix32 mit BigInt (unabhängig von der Number-Implementierung). */
function refRng(seed) {
  const M = 0xffffffffn;
  let a = BigInt(seed) & M;
  const sm = () => {
    a = (a + 0x9e3779b9n) & M;
    let t = a ^ (a >> 16n);
    t = (t * 0x21f0aaadn) & M;
    t = t ^ (t >> 15n);
    t = (t * 0x735a2d97n) & M;
    return t ^ (t >> 15n);
  };
  let [s0, s1, s2, s3] = [sm(), sm(), sm(), sm()];
  const rotl = (x, k) => ((x << BigInt(k)) | (x >> BigInt(32 - k))) & M;
  const next = () => {
    const result = (rotl((s1 * 5n) & M, 7) * 9n) & M;
    const t = (s1 << 9n) & M;
    s2 ^= s0; s3 ^= s1; s1 ^= s2; s0 ^= s3; s2 ^= t; s3 = rotl(s3, 11);
    return Number(result);
  };
  const nextInt = (n) => {
    const total = 2 ** 32;
    const limit = total - (total % n);
    let x = next();
    while (x >= limit) x = next();
    return x % n;
  };
  return { next, nextInt };
}
const refQuantile = (values, p) => { // Typ 7, eigener Code
  const x = values.slice().sort((u, v) => u - v);
  const h = (x.length - 1) * p;
  const lo = Math.floor(h);
  return lo + 1 >= x.length ? x[x.length - 1] : x[lo] + (h - lo) * (x[lo + 1] - x[lo]);
};
const refPmf = (k, l) => { let p = Math.exp(-l); for (let i = 1; i <= k; i++) p *= l / i; return p; };
const refOutcome = (la, lb, K = 120) => { // naive Doppelsumme
  let win = 0, draw = 0, loss = 0;
  for (let a = 0; a <= K; a++) for (let b = 0; b <= K; b++) { const p = refPmf(a, la) * refPmf(b, lb); if (a > b) win += p; else if (a === b) draw += p; else loss += p; }
  return { win, draw, loss };
};
const simpleMean = (v) => v.reduce((a, b) => a + b, 0) / v.length;

// ══ 1. Grundfunktionen ══════════════════════════════════════════════════
console.log('== Grundfunktionen: sum, mean, quantile, logFactorial, Poisson-pmf ==');
{
  assertEqual([1e16, 1, -1e16].reduce((a, b) => a + b, 0), 0, 'Vorbedingung: naive Summe verliert die 1 (Kompensation ist nötig)');
  assertEqual(S.sum([1e16, 1, -1e16]), 1, 'sum (Neumaier): 1e16 + 1 − 1e16 = 1 exakt');
  assertEqual(S.sum([]), 0, 'sum: leere Liste = 0');
  assertEqual(S.sum(new Array(10).fill(0.1)), 1, 'sum: zehnmal 0.1 = 1 exakt (naive Summe: 0.9999999999999999)');
  assertEqual(S.mean([1, 2, 3, 4]), 2.5, 'mean([1,2,3,4]) = 2.5');
  throwsCode(() => S.mean([]), 'invalid-input', 'mean: leeres Array → Fehler');
  throwsCode(() => S.mean([1, NaN]), 'non-finite', 'mean: NaN → Fehler');
  const q = [5, 1, 3, 2, 4];
  const qBefore = clone(q);
  assertEqual([S.quantile(q, 0), S.quantile(q, 0.25), S.quantile(q, 0.5), S.quantile(q, 0.9), S.quantile(q, 1)], [1, 2, 3, 4.6, 5], 'quantile Typ 7 (Handrechnung: 1, 2, 3, 4.6, 5), unsortierte Eingabe');
  assertEqual(q, qBefore, 'quantile verändert die Eingabe nicht');
  assertEqual(S.quantile([7], 0.3), 7, 'quantile: einzelner Wert');
  assertNear(S.quantile([1, 2], 0.25), 1.25, 1e-15, 'quantile: Interpolation zwischen 2 Werten');
  throwsCode(() => S.quantile([1, 2], 1.1), 'invalid-input', 'quantile: p > 1 → Fehler');
  throwsCode(() => S.quantile([1, 2], -0.1), 'invalid-input', 'quantile: p < 0 → Fehler');
  throwsCode(() => S.quantile([], 0.5), 'invalid-input', 'quantile: leer → Fehler');
  throwsCode(() => S.quantile([1, Infinity], 0.5), 'non-finite', 'quantile: Infinity → Fehler');
  assertEqual([S.logFactorial(0), S.logFactorial(1)], [0, 0], 'logFactorial(0) = logFactorial(1) = 0');
  assertNear(S.logFactorial(5), Math.log(120), 1e-14, 'logFactorial(5) = ln 120');
  assertNear(S.logFactorial(20), Math.log(2432902008176640000), 1e-13, 'logFactorial(20) = ln 20!');
  throwsCode(() => S.logFactorial(-1), 'invalid-input', 'logFactorial(−1) → Fehler');
  throwsCode(() => S.logFactorial(2.5), 'invalid-input', 'logFactorial(2.5) → Fehler');
  assertNear(S.poissonPmf(3, 2), (8 / 6) * Math.exp(-2), 1e-15, 'poissonPmf(3; 2) = 2³/3!·e⁻²');
  assertNear(S.poissonPmf(0, 1), Math.exp(-1), 1e-16, 'poissonPmf(0; 1) = e⁻¹');
  assertEqual([S.poissonPmf(0, 0), S.poissonPmf(1, 0), S.poissonPmf(7, 0)], [1, 0, 0], 'λ = 0: Punktmasse auf 0');
  assertNear(S.sum(Array.from({ length: 80 }, (_, k) => S.poissonPmf(k, 4.2))), 1, 1e-13, 'Σ_k poissonPmf(k; 4.2) = 1');
  assertNear(S.sum(Array.from({ length: 80 }, (_, k) => k * S.poissonPmf(k, 4.2))), 4.2, 1e-13, 'Poisson-Mittelwert = λ');
  throwsCode(() => S.poissonPmf(-1, 1), 'invalid-input', 'poissonPmf: k < 0 → Fehler');
  throwsCode(() => S.poissonPmf(1.5, 1), 'invalid-input', 'poissonPmf: k nicht ganzzahlig → Fehler');
  throwsCode(() => S.poissonPmf(1, -1), 'invalid-input', 'poissonPmf: λ < 0 → Fehler');
  throwsCode(() => S.poissonPmf(1, NaN), 'invalid-input', 'poissonPmf: λ = NaN → Fehler');
}

// ══ 2. Lineare Algebra ══════════════════════════════════════════════════
console.log('== Cholesky und Solver ==');
{
  const A2 = [[4, 2], [2, 3]];
  assertEqual(S.cholesky(A2), [[2, 0], [1, Math.sqrt(2)]], 'cholesky([[4,2],[2,3]]) = [[2,0],[1,√2]] (Handrechnung)');
  const A3 = [[25, 15, -5], [15, 18, 0], [-5, 0, 11]];
  assertEqual(S.cholesky(A3), [[5, 0, 0], [3, 3, 0], [-1, 1, 3]], 'cholesky 3×3 (klassisches Beispiel) = [[5,0,0],[3,3,0],[-1,1,3]] exakt');
  const a3Before = clone(A3);
  S.cholesky(A3);
  assertEqual(A3, a3Before, 'cholesky verändert die Eingabe nicht');
  const s2 = S.solveSPD(A2, [10, 8]);
  assertTrue(Math.abs(s2[0] - 1.75) <= 1e-15 && Math.abs(s2[1] - 1.5) <= 1e-15, 'solveSPD 2×2: 4x+2y=10, 2x+3y=8 → (1.75, 1.5) (Handrechnung, Toleranz 1e-15 wegen √2 in L)');
  assertEqual(S.solveSPD(A3, [40, 51, 28]), [1, 2, 3], 'solveSPD 3×3 mit b = A·(1,2,3) → (1,2,3) exakt');
  assertNear(S.solveSPD([[7]], [21])[0], 3, 1e-15, 'solveSPD 1×1: 7x = 21 → 3');
  // Zufällige SPD-Matrizen (fester Seed): A = BᵀB + 0.5·I, bekannte Lösung
  const rng = S.createRng(4242);
  let worst = 0;
  let worstFactor = 0;
  for (const n of [3, 5, 8, 12]) {
    const B = Array.from({ length: n }, () => Array.from({ length: n }, () => rng.nextFloat() - 0.5));
    const A = Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => B.reduce((s, row) => s + row[i] * row[j], 0) + (i === j ? 0.5 : 0)));
    const xTrue = Array.from({ length: n }, () => rng.nextFloat() * 4 - 2);
    const b = A.map((row) => row.reduce((s, v, j) => s + v * xTrue[j], 0));
    const x = S.solveSPD(A, b);
    worst = Math.max(worst, ...x.map((v, i) => Math.abs(v - xTrue[i])));
    const L = S.cholesky(A);
    for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
      let s = 0;
      for (let k = 0; k <= Math.min(i, j); k++) s += L[i][k] * L[j][k];
      worstFactor = Math.max(worstFactor, Math.abs(s - A[i][j]));
    }
    assertTrue(L.every((row, i) => row.every((v, j) => j <= i || v === 0)), `cholesky ${n}×${n}: L ist untere Dreiecksmatrix`);
  }
  assertTrue(worst < 1e-12, `solveSPD (Zufalls-SPD 3…12): größter Fehler ${worst.toExponential(2)} < 1e-12`);
  assertTrue(worstFactor < 1e-14, `L·Lᵀ = A (Zufalls-SPD 3…12): größter Fehler ${worstFactor.toExponential(2)} < 1e-14`);
  const L = S.cholesky(A3);
  assertEqual(S.choleskySolve(L, [40, 51, 28]), [1, 2, 3], 'choleskySolve mit vorberechnetem L');

  throwsCode(() => S.cholesky([[1, 1], [1, 1]]), 'not-positive-definite', 'singuläre Matrix [[1,1],[1,1]] → Fehler');
  throwsCode(() => S.cholesky([[1, 2], [2, 1]]), 'not-positive-definite', 'indefinite Matrix [[1,2],[2,1]] → Fehler');
  throwsCode(() => S.cholesky([[0]]), 'not-positive-definite', 'Nullmatrix 1×1 → Fehler');
  throwsCode(() => S.cholesky([[-4]]), 'not-positive-definite', 'negatives Diagonalelement → Fehler');
  throwsCode(() => S.cholesky([[1, 1], [1, 1 + 1e-15]]), 'not-positive-definite', 'numerisch singulär (Pivot 1e-15 relativ) → Fehler');
  throwsCode(() => S.cholesky([[1, 2], [3, 4]]), 'not-symmetric', 'nicht symmetrisch → Fehler');
  throwsCode(() => S.cholesky([[2, 1], [1.001, 2]]), 'not-symmetric', 'Asymmetrie 1e-3 → Fehler');
  assertTrue(S.cholesky([[2, 1], [1 + 1e-15, 2]]).length === 2, 'Rundungsasymmetrie 1e-15 wird akzeptiert (Toleranz 1e-12 relativ)');
  throwsCode(() => S.cholesky([[1, 2, 3], [4, 5, 6]]), 'not-square', 'nicht quadratisch → Fehler');
  throwsCode(() => S.cholesky([]), 'invalid-input', 'leere Matrix → Fehler');
  throwsCode(() => S.cholesky([[NaN]]), 'non-finite', 'NaN in Matrix → Fehler');
  throwsCode(() => S.cholesky([[Infinity, 0], [0, 1]]), 'non-finite', 'Infinity in Matrix → Fehler');
  throwsCode(() => S.cholesky('x'), 'invalid-input', 'kein Array → Fehler');
  throwsCode(() => S.solveSPD(A2, [1]), 'invalid-input', 'b falscher Länge → Fehler');
  throwsCode(() => S.solveSPD(A2, [1, NaN]), 'invalid-input', 'b mit NaN → Fehler');
  throwsCode(() => S.solveSPD([[1, 1], [1, 1]], [1, 1]), 'not-positive-definite', 'solveSPD mit singulärer Matrix → Fehler');
  assertTrue(S.cholesky([[1e-8, 0], [0, 1e-8]]).length === 2, 'Skalierung: kleine, aber gut konditionierte Matrix (1e-8·I) wird akzeptiert (Pivot relativ zur Diagonale)');
}

// ══ 3. Poisson-Regression ═══════════════════════════════════════════════
console.log('== Poisson-Regression: analytische Fälle ==');
{
  const ones = (n) => Array.from({ length: n }, () => [1]);
  const f1 = S.fitPoissonRegression({ X: ones(4), y: [2, 4, 6, 8] });
  assertNear(f1.beta[0], Math.log(5), 1e-15, 'Achsenabschnitt-Modell: β = ln(Mittelwert) = ln 5');
  assertTrue(f1.converged && f1.reason === 'converged' && f1.iterations <= 8, `Konvergenz: converged, ${f1.iterations} Iterationen (≤ 8)`);
  assertNear(f1.mu[0], 5, 1e-14, 'fitted μ = 5');
  assertTrue(f1.gradientNorm < 1e-12 && f1.newtonDecrement < 1e-18, `Gradient ${f1.gradientNorm.toExponential(1)} und Newton-Dekrement ${f1.newtonDecrement.toExponential(1)} am Optimum`);

  const g2 = S.fitPoissonRegression({ X: [[1, 0], [1, 0], [1, 1], [1, 1]], y: [1, 3, 6, 10] });
  assertNear(g2.beta[0], Math.log(2), 1e-14, 'Zwei Gruppen: β₀ = ln(Mittel Gruppe 0) = ln 2');
  assertNear(g2.beta[1], Math.log(4), 1e-14, 'Zwei Gruppen: β₁ = ln(8/2) = ln 4 (Log-Ratenverhältnis)');
  const g3 = S.fitPoissonRegression({ X: [[1, 0, 0], [1, 1, 0], [1, 0, 1], [1, 0, 1]], y: [3, 6, 4, 8] });
  assertNear(g3.beta[0], Math.log(3), 1e-14, 'Drei Gruppen (saturiert): β₀ = ln 3');
  assertNear(g3.beta[1], Math.log(2), 1e-14, 'Drei Gruppen: β₁ = ln(6/3)');
  assertNear(g3.beta[2], Math.log(2), 1e-14, 'Drei Gruppen: β₂ = ln(6/3)');

  const off = S.fitPoissonRegression({ X: ones(2), y: [3, 5], offset: [Math.log(2), Math.log(4)] });
  assertNear(off.beta[0], Math.log(8 / 6), 1e-14, 'Offset (Exposure): β = ln(Σy / Σ exp(offset)) = ln(8/6)');

}

console.log('== Poisson-Regression: Gewichte, Erstordnungsbedingung, synthetische Daten ==');
const gradientRef = (X, y, beta, pen = 0, w = null, offset = null) => { // unabhängige Gradientenberechnung
  const p = beta.length;
  const g = new Array(p).fill(0);
  X.forEach((row, i) => {
    const eta = (offset ? offset[i] : 0) + row.reduce((s, v, j) => s + v * beta[j], 0);
    const mu = Math.exp(eta);
    for (let j = 0; j < p; j++) g[j] += (w ? w[i] : 1) * (y[i] - mu) * row[j];
  });
  const penArr = Array.isArray(pen) ? pen : new Array(p).fill(pen);
  return g.map((v, j) => v - penArr[j] * beta[j]);
};
{
  const rep = S.fitPoissonRegression({ X: [[1, 0], [1, 0], [1, 0], [1, 1], [1, 1]], y: [1, 1, 3, 6, 10] });
  const wt = S.fitPoissonRegression({ X: [[1, 0], [1, 0], [1, 1], [1, 1]], y: [1, 3, 6, 10], weights: [2, 1, 1, 1] });
  assertNear(wt.beta[0], rep.beta[0], 1e-14, 'Gewicht 2 auf der ersten Zeile = Zeile doppelt vorhanden: β₀');
  assertNear(wt.beta[1], rep.beta[1], 1e-14, 'Gewicht 2 auf der ersten Zeile = Zeile doppelt vorhanden: β₁');
  const zero = S.fitPoissonRegression({ X: [[1, 0], [1, 0], [1, 1], [1, 1]], y: [1, 3, 6, 10], weights: [0, 1, 1, 1] });
  const dropped = S.fitPoissonRegression({ X: [[1, 0], [1, 1], [1, 1]], y: [3, 6, 10] });
  assertNear(zero.beta[0], dropped.beta[0], 1e-14, 'Gewicht 0 = Zeile entfällt: β₀');
  assertNear(zero.beta[1], dropped.beta[1], 1e-14, 'Gewicht 0 = Zeile entfällt: β₁');

  // Synthetische Daten (fester Seed): y ~ Poisson(exp(1.2 + 0.7·x)), n = 1500
  const rng = S.createRng(2024);
  const poissonSample = (lambda) => { const u = rng.nextFloat(); let k = 0; let p = Math.exp(-lambda); let c = p; while (u > c) { k++; p *= lambda / k; c += p; } return k; };
  const X = [];
  const y = [];
  for (let i = 0; i < 1500; i++) { const x = rng.nextFloat() * 2 - 1; X.push([1, x]); y.push(poissonSample(Math.exp(1.2 + 0.7 * x))); }
  const fit = S.fitPoissonRegression({ X, y });
  assertTrue(fit.converged && fit.iterations <= 10, `synthetisch: konvergiert in ${fit.iterations} Iterationen (≤ 10)`);
  assertTrue(Math.abs(fit.beta[0] - 1.2) < 0.05 && Math.abs(fit.beta[1] - 0.7) < 0.05, `synthetisch: Konsistenz (n = 1500): β̂ = (${fit.beta[0].toFixed(4)}, ${fit.beta[1].toFixed(4)}) innerhalb 0,05 von (1,2; 0,7)`);
  const gr = gradientRef(X, y, fit.beta);
  assertTrue(Math.max(...gr.map(Math.abs)) < 1e-9, `synthetisch: Erstordnungsbedingung Xᵀ(y − μ) = 0 (unabhängig berechnet): ${Math.max(...gr.map(Math.abs)).toExponential(1)} < 1e-9`);
  assertNear(fit.mu.reduce((a, b) => a + b, 0), y.reduce((a, b) => a + b, 0), 1e-8, 'mit Achsenabschnitt gilt Σμ = Σy');
  const refMu = X.map((row) => Math.exp(row[0] * fit.beta[0] + row[1] * fit.beta[1]));
  assertTrue(fit.mu.every((m, i) => Math.abs(m - refMu[i]) < 1e-12 * refMu[i]), 'fitted μ = exp(X·β) (unabhängig nachgerechnet)');
  const ll = X.reduce((s, row, i) => s + y[i] * (row[0] * fit.beta[0] + row[1] * fit.beta[1]) - refMu[i], 0);
  assertNear(fit.logLikelihoodKernel, ll, 1e-8, 'logLikelihoodKernel = Σ(y·η − μ) (unabhängig nachgerechnet)');
  const again = S.fitPoissonRegression({ X: clone(X), y: [...y] });
  assertEqual(again, fit, 'gleiche Eingabe → identisches Ergebnis (deterministisch)');
  assertTrue(fit.beta.some((b) => Math.abs(b * 1e8 - Math.round(b * 1e8)) > 1e-3), 'Koeffizienten sind ungerundet (nicht auf 8 Stellen quantisiert)');
}

console.log('== Poisson-Regression: Ridge-Schrumpfung ==');
{
  const X1 = [[1], [1], [1], [1]];
  const y1 = [2, 4, 6, 8];
  // Referenz: Bisektion der Stationaritätsgleichung Σ(y − e^β) − λβ = 0
  const bisect = (lambda) => { let lo = -5; let hi = 5; for (let i = 0; i < 200; i++) { const mid = (lo + hi) / 2; const f = y1.reduce((s, v) => s + v - Math.exp(mid), 0) - lambda * mid; if (f > 0) lo = mid; else hi = mid; } return (lo + hi) / 2; };
  for (const lambda of [0, 0.5, 2, 50]) {
    const r = S.fitPoissonRegression({ X: X1, y: y1, penalty: lambda });
    assertNear(r.beta[0], bisect(lambda), 1e-12, `Achsenabschnitt mit Penalty ${lambda}: Lösung stimmt mit Bisektion der Stationaritätsgleichung überein`);
  }
  const b0 = S.fitPoissonRegression({ X: X1, y: y1, penalty: 0 }).beta[0];
  const b2 = S.fitPoissonRegression({ X: X1, y: y1, penalty: 2 }).beta[0];
  assertTrue(b2 > 0 && b2 < b0, `Penalty zieht Richtung 0: β(λ=2) = ${b2.toFixed(6)} liegt zwischen 0 und β(λ=0) = ${b0.toFixed(6)}`);

  const X = [[1, 0], [1, 0], [1, 1], [1, 1]];
  const y = [1, 3, 6, 10];
  const unpen = S.fitPoissonRegression({ X, y });
  assertEqual(S.fitPoissonRegression({ X, y, penalty: [0, 0] }), unpen, 'Penalty [0, 0] = kein Penalty (identisch)');
  assertEqual(S.fitPoissonRegression({ X, y, penalty: 0.7 }), S.fitPoissonRegression({ X, y, penalty: [0.7, 0.7] }), 'skalare Penalty = gleiche Penalty für alle Koeffizienten');
  let prev = Math.abs(unpen.beta[1]);
  let monotone = true;
  for (const lambda of [0.1, 1, 10, 1000, 1e6]) {
    const r = S.fitPoissonRegression({ X, y, penalty: [0, lambda] });
    const a = Math.abs(r.beta[1]);
    if (!(a < prev)) monotone = false;
    prev = a;
    assertTrue(r.converged, `Penalty [0, ${lambda}]: konvergiert`);
    const g = gradientRef(X, y, r.beta, [0, lambda]);
    assertTrue(Math.max(...g.map(Math.abs)) < 1e-9, `Penalty [0, ${lambda}]: Stationarität Xᵀ(y − μ) − penalty∘β = 0 (unabhängig): ${Math.max(...g.map(Math.abs)).toExponential(1)} < 1e-9`);
    const pll = X.reduce((s, row, i) => s + y[i] * (row[0] * r.beta[0] + row[1] * r.beta[1]) - Math.exp(row[0] * r.beta[0] + row[1] * r.beta[1]), 0) - 0.5 * lambda * r.beta[1] ** 2;
    assertNear(r.penalizedLogLikelihood, pll, 1e-9, `Penalty [0, ${lambda}]: penalisierte Log-Likelihood = Σ(yη − μ) − ½λβ² (unabhängig)`);
  }
  assertTrue(monotone, '|β₁| sinkt streng monoton mit wachsender Penalty (0 → 0.1 → 1 → 10 → 1000 → 1e6)');
  const huge = S.fitPoissonRegression({ X, y, penalty: [0, 1e6] });
  assertTrue(Math.abs(huge.beta[1]) < 1e-5, `sehr starke Penalty: β₁ = ${huge.beta[1].toExponential(2)} → 0`);
  assertNear(huge.beta[0], Math.log(5), 1e-4, 'unpenalisierter Achsenabschnitt bleibt bei ln(Gesamtmittel) = ln 5 (Toleranz 1e-4 wegen β₁ ≈ 1e-6)');
  const partial = S.fitPoissonRegression({ X, y, penalty: [5, 0] });
  const pg = gradientRef(X, y, partial.beta, [5, 0]);
  assertTrue(Math.max(...pg.map(Math.abs)) < 1e-9, 'Penalty nur auf dem Achsenabschnitt: Stationarität erfüllt (keine automatische Zentrierung, jeder Koeffizient einzeln)');
  assertTrue(partial.beta[0] < unpen.beta[0], 'Penalty nur auf dem Achsenabschnitt schrumpft β₀ (nicht β₁)');

  // Kollineare Spalten: ohne Penalty singulär, mit Penalty eindeutig und symmetrisch
  const Xc = [[1, 1], [1, 1], [1, 1], [1, 1]];
  throwsCode(() => S.fitPoissonRegression({ X: Xc, y: y1 }), 'not-positive-definite', 'kollineare Spalten ohne Penalty → Fehler (Rangdefizit)');
  const rc = S.fitPoissonRegression({ X: Xc, y: y1, penalty: 1 });
  assertTrue(rc.converged && Math.abs(rc.beta[0] - rc.beta[1]) < 1e-12, `kollineare Spalten mit Penalty: konvergiert, symmetrische Lösung β₀ = β₁ = ${rc.beta[0].toFixed(6)}`);
  assertTrue(Math.max(...gradientRef(Xc, y1, rc.beta, 1).map(Math.abs)) < 1e-9, 'kollineare Spalten mit Penalty: Stationarität erfüllt');
}

console.log('== Poisson-Regression: Konvergenz und Robustheit ==');
{
  const ones = (n) => Array.from({ length: n }, () => [1]);
  const opt = S.fitPoissonRegression({ X: ones(4), y: [2, 4, 6, 8] });
  const warm = S.fitPoissonRegression({ X: ones(4), y: [2, 4, 6, 8], initialBeta: opt.beta });
  assertTrue(warm.converged && warm.iterations <= 1, `Startwert im Optimum: konvergiert nach ${warm.iterations} Iteration (≤ 1)`);
  const one = S.fitPoissonRegression({ X: ones(4), y: [2, 4, 6, 8], maxIterations: 1 });
  assertEqual([one.converged, one.reason, one.iterations], [false, 'max-iterations', 1], 'maxIterations = 1: nicht konvergiert, Grund max-iterations');
  const zeros = S.fitPoissonRegression({ X: ones(5), y: [0, 0, 0, 0, 0] });
  assertEqual([zeros.converged, zeros.reason], [false, 'coefficient-bound'], 'alle y = 0 ohne Penalty: keine ML-Lösung → converged false (Divergenz erkannt)');
  const zerosRidge = S.fitPoissonRegression({ X: ones(5), y: [0, 0, 0, 0, 0], penalty: 0.5 });
  assertTrue(zerosRidge.converged && Number.isFinite(zerosRidge.beta[0]) && zerosRidge.beta[0] < 0, `alle y = 0 mit Penalty: konvergiert, β = ${zerosRidge.beta[0].toFixed(6)} (endlich)`);
  assertTrue(Math.abs(gradientRef(ones(5), [0, 0, 0, 0, 0], zerosRidge.beta, 0.5)[0]) < 1e-12, 'alle y = 0 mit Penalty: Stationarität erfüllt');
  const bound = S.fitPoissonRegression({ X: ones(4), y: [2, 4, 6, 8], maxAbsCoefficient: 0.5 });
  assertEqual([bound.converged, bound.reason], [false, 'coefficient-bound'], 'maxAbsCoefficient = 0.5 bei β = ln 5: Abbruch coefficient-bound');
  const far = S.fitPoissonRegression({ X: [[1]], y: [100], initialBeta: [-10] });
  assertTrue(far.converged && Math.abs(far.beta[0] - Math.log(100)) < 1e-14, 'schlechter Startwert (β = −10, y = 100): Schrittweitenhalbierung führt zur Lösung ln 100');
  const noHalving = S.fitPoissonRegression({ X: [[1]], y: [100], initialBeta: [-10], maxHalvings: 0 });
  assertEqual([noHalving.converged, noHalving.reason], [false, 'line-search'], 'ohne Halbierung: Newton-Schritt überschießt → converged false, Grund line-search');
  const frac = S.fitPoissonRegression({ X: ones(2), y: [0.5, 1.5] });
  assertNear(frac.beta[0], 0, 1e-15, 'nicht ganzzahlige y (Quasi-Likelihood): β = ln(Mittel 1) = 0');
  const xin = [[1, 0], [1, 1]];
  const yin = [1, 2];
  const xb = clone(xin);
  S.fitPoissonRegression({ X: xin, y: yin, penalty: [0, 1], weights: [1, 2], offset: [0, 0.1] });
  assertEqual(xin, xb, 'Eingabematrix wird nicht verändert');
}

console.log('== Poisson-Regression: ungültige Eingaben ==');
{
  const ok = { X: [[1], [1]], y: [1, 2] };
  throwsCode(() => S.fitPoissonRegression({ ...ok, y: [1, -1] }), 'invalid-input', 'negatives y → Fehler');
  throwsCode(() => S.fitPoissonRegression({ ...ok, y: [1, NaN] }), 'invalid-input', 'y = NaN → Fehler');
  throwsCode(() => S.fitPoissonRegression({ ...ok, y: [1] }), 'invalid-input', 'y falscher Länge → Fehler');
  throwsCode(() => S.fitPoissonRegression({ X: [[1], [1, 2]], y: [1, 2] }), 'invalid-input', 'ungleich lange Zeilen → Fehler');
  throwsCode(() => S.fitPoissonRegression({ X: [[1], [NaN]], y: [1, 2] }), 'non-finite', 'X mit NaN → Fehler');
  throwsCode(() => S.fitPoissonRegression({ X: [], y: [] }), 'invalid-input', 'leeres X → Fehler');
  throwsCode(() => S.fitPoissonRegression({ X: [[]], y: [1] }), 'invalid-input', 'X ohne Spalten → Fehler');
  throwsCode(() => S.fitPoissonRegression({ ...ok, weights: [1, -1] }), 'invalid-input', 'negatives Gewicht → Fehler');
  throwsCode(() => S.fitPoissonRegression({ ...ok, weights: [1] }), 'invalid-input', 'weights falscher Länge → Fehler');
  throwsCode(() => S.fitPoissonRegression({ ...ok, offset: [0] }), 'invalid-input', 'offset falscher Länge → Fehler');
  throwsCode(() => S.fitPoissonRegression({ ...ok, penalty: -1 }), 'invalid-input', 'negative Penalty → Fehler');
  throwsCode(() => S.fitPoissonRegression({ ...ok, penalty: [1, 2] }), 'invalid-input', 'Penalty-Array falscher Länge → Fehler');
  throwsCode(() => S.fitPoissonRegression({ ...ok, penalty: [-1] }), 'invalid-input', 'Penalty-Array mit negativem Wert → Fehler');
  throwsCode(() => S.fitPoissonRegression({ ...ok, initialBeta: [0, 0] }), 'invalid-input', 'initialBeta falscher Länge → Fehler');
  throwsCode(() => S.fitPoissonRegression({ ...ok, maxIterations: 0 }), 'invalid-input', 'maxIterations = 0 → Fehler');
  throwsCode(() => S.fitPoissonRegression({ ...ok, initialBeta: [800] }), 'non-finite', 'Startwert mit überlaufendem Erwartungswert → Fehler');
  throwsCode(() => S.fitPoissonRegression(), 'invalid-input', 'ohne Argumente → Fehler');
  throwsCode(() => S.fitPoissonRegression({ X: [[1, 1]], y: [3] }), 'not-positive-definite', 'weniger Zeilen als Spalten ohne Penalty → Fehler (singulär)');
}

// ══ 4. Skellam / Spielausgang ═══════════════════════════════════════════
console.log('== Spielausgang aus zwei Poisson-Raten (Skellam) ==');
{
  const grid = [0, 0.5, 1, 2.3, 7.3, 15, 40, 90];
  let worstSum = 0;
  let residualOk = true;
  for (const la of grid) for (const lb of grid) {
    const r = S.matchOutcomeProbabilities(la, lb);
    worstSum = Math.max(worstSum, Math.abs(r.win + r.draw + r.loss - 1));
    if (r.residualMass !== 1 - (r.win + r.draw + r.loss)) residualOk = false;
  }
  assertTrue(worstSum < 1e-12, `P(Sieg) + P(Remis) + P(Niederlage) = 1 über ${grid.length ** 2} λ-Paare: größte Abweichung ${worstSum.toExponential(2)} < 1e-12`);
  assertTrue(residualOk, 'residualMass = 1 − (win + draw + loss)');

  const a = S.matchOutcomeProbabilities(1, 0);
  assertNear(a.win, 1 - Math.exp(-1), 1e-15, 'λA = 1, λB = 0: P(Sieg) = 1 − e⁻¹ (analytisch)');
  assertNear(a.draw, Math.exp(-1), 1e-15, 'λA = 1, λB = 0: P(Remis) = e⁻¹ (analytisch)');
  assertEqual(a.loss, 0, 'λA = 1, λB = 0: P(Niederlage) = 0');
  assertEqual(S.matchOutcomeProbabilities(0, 0), { win: 0, draw: 1, loss: 0, expectedGoalDifference: 0, residualMass: 0 }, 'λA = λB = 0: sicheres 0:0');
  const besselI0 = (x) => { let s = 0; let term = 1; for (let k = 0; k < 40; k++) { if (k > 0) term *= (x / 2) ** 2 / (k * k); s += term; } return s; };
  for (const l of [1, 3.7]) {
    const r = S.matchOutcomeProbabilities(l, l);
    assertNear(r.draw, Math.exp(-2 * l) * besselI0(2 * l), 1e-14, `gleiche λ = ${l}: P(Remis) = e^(−2λ)·I₀(2λ) (Bessel-Reihe, analytisch)`);
    assertEqual(r.win, r.loss, `gleiche λ = ${l}: P(Sieg) = P(Niederlage) exakt`);
    assertEqual(r.expectedGoalDifference, 0, `gleiche λ = ${l}: erwartete Tordifferenz = 0`);
  }
  for (const [la, lb] of [[2.3, 1.7], [7.3, 7.3], [0.4, 3]]) {
    const r = S.matchOutcomeProbabilities(la, lb);
    const ref = refOutcome(la, lb);
    assertNear(r.win, ref.win, 1e-13, `(${la}, ${lb}): P(Sieg) = naive Doppelsumme`);
    assertNear(r.draw, ref.draw, 1e-13, `(${la}, ${lb}): P(Remis) = naive Doppelsumme`);
    assertNear(r.loss, ref.loss, 1e-13, `(${la}, ${lb}): P(Niederlage) = naive Doppelsumme`);
  }
  // Monotonie in λA (λB = 5)
  const wins = [];
  const losses = [];
  const draws = [];
  for (let la = 1; la <= 10; la += 0.5) { const r = S.matchOutcomeProbabilities(la, 5); wins.push(r.win); losses.push(r.loss); draws.push(r.draw); }
  assertTrue(wins.every((v, i) => i === 0 || v > wins[i - 1]), 'höheres λA ⇒ P(A-Sieg) steigt streng monoton (λB = 5, λA = 1…10)');
  assertTrue(losses.every((v, i) => i === 0 || v < losses[i - 1]), 'höheres λA ⇒ P(A-Niederlage) sinkt streng monoton');
  const refDraws = []; for (let la = 1; la <= 10; la += 0.5) refDraws.push(refOutcome(la, 5).draw);
  assertEqual(draws.indexOf(Math.max(...draws)), refDraws.indexOf(Math.max(...refDraws)), 'P(Remis) über λA = 1…10 (λB = 5) hat sein Maximum an derselben Stelle wie die naive Doppelsumme');
  assertTrue(draws.every((v, i) => Math.abs(v - refDraws[i]) < 1e-13), 'P(Remis) über λA = 1…10 stimmt mit der naiven Doppelsumme überein (Toleranz 1e-13)');
  // Symmetrie unter Vertauschen
  const ab = S.matchOutcomeProbabilities(4.4, 2.1);
  const ba = S.matchOutcomeProbabilities(2.1, 4.4);
  assertEqual([ab.win, ab.draw, ab.loss], [ba.loss, ba.draw, ba.win], 'Vertauschen von A und B vertauscht Sieg und Niederlage exakt');
  // Erwartete Tordifferenz
  assertEqual(S.matchOutcomeProbabilities(6.5, 2.25).expectedGoalDifference, 4.25, 'erwartete Tordifferenz = λA − λB = 4.25 (Vorzeichen: A minus B)');
  assertEqual(S.matchOutcomeProbabilities(2.25, 6.5).expectedGoalDifference, -4.25, 'erwartete Tordifferenz ist negativ, wenn B stärker ist');
  const pmfs = Array.from({ length: 121 }, (_, i) => S.skellamPmf(i - 60, 3.3, 5.1));
  assertNear(S.sum(pmfs), 1, 1e-12, 'Skellam: Σ_d P(D = d) = 1 (d = −60…60)');
  assertNear(S.sum(pmfs.map((p, i) => (i - 60) * p)), 3.3 - 5.1, 1e-12, 'Skellam: Mittelwert der Verteilung = λA − λB (aus den Wahrscheinlichkeiten, unabhängig von expectedGoalDifference)');
  assertNear(S.sum(pmfs.map((p, i) => (i - 60) ** 2 * p)) - (3.3 - 5.1) ** 2, 3.3 + 5.1, 1e-11, 'Skellam: Varianz = λA + λB');
  const o = S.matchOutcomeProbabilities(3.3, 5.1);
  assertNear(pmfs[60], o.draw, 1e-14, 'skellamPmf(0) = P(Remis)');
  assertNear(S.sum(pmfs.slice(61)), o.win, 1e-13, 'Σ_{d>0} skellamPmf = P(Sieg)');
  assertNear(S.sum(pmfs.slice(0, 60)), o.loss, 1e-13, 'Σ_{d<0} skellamPmf = P(Niederlage)');
  assertTrue(Math.abs(o.win * 1e8 - Math.round(o.win * 1e8)) > 1e-4, 'Ergebnis ist ungerundet (kein Vielfaches von 1e-8)');
  throwsCode(() => S.matchOutcomeProbabilities(-1, 1), 'invalid-input', 'λA < 0 → Fehler');
  throwsCode(() => S.matchOutcomeProbabilities(1, NaN), 'invalid-input', 'λB = NaN → Fehler');
  throwsCode(() => S.matchOutcomeProbabilities(Infinity, 1), 'invalid-input', 'λA = Infinity → Fehler');
  throwsCode(() => S.matchOutcomeProbabilities(S.MAX_LAMBDA + 1, 1), 'invalid-input', 'λ > MAX_LAMBDA → Fehler');
  throwsCode(() => S.skellamPmf(1.5, 1, 1), 'invalid-input', 'skellamPmf: d nicht ganzzahlig → Fehler');
  assertEqual([S.resultIndex(3, 1), S.resultIndex(2, 2), S.resultIndex(0, 5)], [0, 1, 2], 'resultIndex: 0 = Sieg A, 1 = Remis, 2 = Niederlage A');
  throwsCode(() => S.resultIndex(NaN, 1), 'invalid-input', 'resultIndex: NaN → Fehler');
}

// ══ 5. Log-Loss und Brier-Score ═════════════════════════════════════════
console.log('== Log-Loss und Brier-Score (Handrechnung) ==');
{
  assertNear(S.logLoss([[0.5, 0.3, 0.2]], [0]), -Math.log(0.5), 1e-16, 'Log-Loss einer Prognose: −ln 0.5');
  assertNear(S.logLoss([[0.7, 0.2, 0.1], [0.1, 0.2, 0.7]], [0, 2]), -Math.log(0.7), 1e-16, 'Log-Loss zweier Prognosen: Mittel von −ln 0.7 und −ln 0.7');
  assertNear(S.logLoss([[0.5, 0.25, 0.25], [0.2, 0.5, 0.3]], [1, 0]), (-Math.log(0.25) - Math.log(0.2)) / 2, 1e-16, 'Log-Loss ungleicher Wahrscheinlichkeiten: (−ln 0.25 − ln 0.2)/2');
  assertEqual(S.logLoss([[1, 0, 0]], [0]), 0, 'perfekte Prognose: Log-Loss 0');
  assertEqual(S.logLoss([[1, 0, 0]], [1]), Infinity, 'Wahrscheinlichkeit 0 für den Eingetretenen: Infinity (kein Clipping)');
  assertNear(S.logLoss([[1 / 3, 1 / 3, 1 / 3]], [2]), Math.log(3), 1e-15, 'gleichverteilt über 3: ln 3');
  assertNear(S.brierScore([[0.7, 0.2, 0.1], [0.1, 0.2, 0.7]], [0, 2]), 0.14, 1e-16, 'Brier: (0.3² + 0.2² + 0.1²) = 0.14 je Prognose');
  assertEqual(S.brierScore([[1, 0, 0]], [0]), 0, 'perfekte Prognose: Brier 0');
  assertEqual(S.brierScore([[0, 0, 1]], [0]), 2, 'maximal falsche Prognose: Brier 2 (Summe über Klassen, nicht durch K geteilt)');
  assertNear(S.brierScore([[0.5, 0.5]], [1]), 0.5, 1e-16, 'Brier 2 Klassen: 0.5² + 0.5² = 0.5');
  assertNear(S.brierScore([[1 / 3, 1 / 3, 1 / 3]], [0]), 2 / 3, 1e-15, 'Brier gleichverteilt über 3: (2/3)² + 2·(1/3)² = 2/3');
  const preds = [[0.5, 0.3, 0.2]];
  const pBefore = clone(preds);
  S.logLoss(preds, [0]);
  S.brierScore(preds, [0]);
  assertEqual(preds, pBefore, 'Bewertung verändert die Eingaben nicht');
  throwsCode(() => S.logLoss([[0.5, 0.3, 0.3]], [0]), 'invalid-input', 'Prognose summiert nicht zu 1 → Fehler');
  throwsCode(() => S.logLoss([[1.2, -0.2, 0]], [0]), 'invalid-input', 'negative bzw. > 1 Wahrscheinlichkeit → Fehler');
  throwsCode(() => S.logLoss([[0.5, 0.5]], [2]), 'invalid-input', 'Ausgangsindex außerhalb → Fehler');
  throwsCode(() => S.logLoss([[0.5, 0.5]], [0.5]), 'invalid-input', 'Ausgangsindex nicht ganzzahlig → Fehler');
  throwsCode(() => S.logLoss([[0.5, 0.5]], [0, 1]), 'invalid-input', 'ungleich lange Listen → Fehler');
  throwsCode(() => S.logLoss([], []), 'invalid-input', 'leere Listen → Fehler');
  throwsCode(() => S.logLoss([[1]], [0]), 'invalid-input', 'weniger als 2 Klassen → Fehler');
  throwsCode(() => S.brierScore([[0.5, 0.5], [0.2, 0.3, 0.5]], [0, 0]), 'invalid-input', 'unterschiedlich lange Prognosevektoren → Fehler');
  throwsCode(() => S.brierScore([[NaN, 1]], [0]), 'invalid-input', 'NaN in Prognose → Fehler');
  // Zusammenspiel: Skellam-Prognose gegen Ergebnisindex
  const o = S.matchOutcomeProbabilities(3, 2);
  assertNear(S.logLoss([[o.win, o.draw, o.loss]], [S.resultIndex(4, 1)]), -Math.log(o.win), 1e-15, 'Skellam-Prognose und resultIndex(4:1): Log-Loss = −ln P(Sieg)');
}

// ══ 6. Zufall ═══════════════════════════════════════════════════════════
console.log('== Seeded RNG ==');
{
  for (const seed of [0, 1, 12345, 987654321, 4294967295]) {
    const r = S.createRng(seed);
    const ref = refRng(seed);
    let same = true;
    for (let i = 0; i < 100; i++) if (r.nextUint32() !== ref.next()) same = false;
    assertTrue(same, `Seed ${seed}: erste 100 Werte = unabhängige BigInt-Referenzimplementierung (xoshiro128**/splitmix32)`);
  }
  const r12345 = S.createRng(12345);
  assertEqual([r12345.nextUint32(), r12345.nextUint32(), r12345.nextUint32()], [1093274547, 203003357, 3741353573], 'Seed 12345: fest gepinnte erste drei Werte (plattformunabhängig)');
  const a = S.createRng(777);
  const b = S.createRng(777);
  const seqA = Array.from({ length: 1000 }, () => a.nextUint32());
  const seqB = Array.from({ length: 1000 }, () => b.nextUint32());
  assertEqual(seqA, seqB, 'gleicher Seed ⇒ identische Sequenz (1000 Werte)');
  const c = S.createRng(778);
  const seqC = Array.from({ length: 1000 }, () => c.nextUint32());
  assertTrue(seqA.some((v, i) => v !== seqC[i]) && seqA.filter((v, i) => v === seqC[i]).length < 3, 'anderer Seed ⇒ andere Sequenz (höchstens Zufallstreffer)');
  const d = S.createRng(777);
  d.nextUint32();
  const e = S.createRng(777);
  assertEqual([d.nextUint32(), e.nextUint32()], [seqA[1], seqA[0]], 'Instanzen sind unabhängig (kein gemeinsamer Zustand)');
  const f = S.createRng(31);
  const rf = refRng(31);
  const floats = Array.from({ length: 200 }, () => f.nextFloat());
  const refFloats = Array.from({ length: 200 }, () => { const x = rf.next(); const y = rf.next(); return ((x >>> 5) * 67108864 + (y >>> 6)) / 9007199254740992; });
  assertEqual(floats, refFloats, 'nextFloat = 53-Bit-Zahl aus zwei Referenzwerten (exakt)');
  assertTrue(floats.every((x) => x >= 0 && x < 1), 'nextFloat liegt in [0, 1)');
  const many = S.createRng(99);
  const sample = Array.from({ length: 20000 }, () => many.nextFloat());
  const m = sample.reduce((s, v) => s + v, 0) / sample.length;
  assertTrue(m > 0.49 && m < 0.51, `nextFloat: Mittel ${m.toFixed(4)} liegt in (0.49, 0.51) (feste Sequenz, Plausibilität)`);
  for (const n of [1, 2, 3, 7, 30, 1000, 2 ** 32]) {
    const g = S.createRng(5);
    const rg = refRng(5);
    let ok = true;
    for (let i = 0; i < 300; i++) {
      const v = g.nextInt(n);
      const w = n === 2 ** 32 ? rg.next() : rg.nextInt(n);
      if (v !== w || v < 0 || v >= n) ok = false;
    }
    assertTrue(ok, `nextInt(${n}): 300 Werte = Referenz mit Rückweisungsverfahren, alle in [0, n)`);
  }
  const g3 = S.createRng(2718);
  const counts = [0, 0, 0];
  for (let i = 0; i < 30000; i++) counts[g3.nextInt(3)]++;
  assertTrue(counts.every((cnt) => cnt > 9500 && cnt < 10500), `nextInt(3): 30000 Ziehungen gleichmäßig (${counts.join('/')})`);
  for (const bad of [-1, 1.5, 2 ** 32, NaN, '5', undefined, null, Infinity]) throwsCode(() => S.createRng(bad), 'invalid-input', `createRng(${String(bad)}) → Fehler (kein stilles Abschneiden)`);
  for (const bad of [0, -1, 1.5, 2 ** 32 + 1, NaN, '3']) throwsCode(() => S.createRng(1).nextInt(bad), 'invalid-input', `nextInt(${String(bad)}) → Fehler`);
}

// ══ 6b. Bootstrap ═══════════════════════════════════════════════════════
console.log('== Seeded Bootstrap mit Refit ==');
{
  const data = Array.from({ length: 30 }, (_, i) => i + 1);
  const meanRefit = (sample) => [simpleMean(sample)];
  const R = 200;
  const res = S.seededBootstrap({ data, refit: meanRefit, replicates: R, seed: 42 });
  const res2 = S.seededBootstrap({ data: [...data], refit: meanRefit, replicates: R, seed: 42 });
  assertEqual(res2, res, 'gleicher Seed + gleiche Daten ⇒ identisches Ergebnis (Wertegleichheit)');
  assertEqual(JSON.stringify(res2), JSON.stringify(res), 'gleicher Seed + gleiche Daten ⇒ byte-identische Serialisierung');
  const resOther = S.seededBootstrap({ data, refit: meanRefit, replicates: R, seed: 43 });
  assertTrue(JSON.stringify(resOther.estimates) !== JSON.stringify(res.estimates) && resOther.seed === 43, 'anderer Seed ⇒ andere Wiederholungen (Seed wird verwendet)');

  // Unabhängig erwartete Stichproben aus der BigInt-Referenz
  const ref = refRng(42);
  const refIdx = Array.from({ length: R }, () => Array.from({ length: data.length }, () => ref.nextInt(data.length)));
  assertEqual(S.bootstrapSampleIndices(data.length, R, 42), refIdx, 'bootstrapSampleIndices = unabhängig gezogene Indizes (Referenz-RNG, Reihenfolge Stichprobe für Stichprobe)');
  const expected = refIdx.map((idx) => [simpleMean(idx.map((i) => data[i]))]);
  assertEqual(res.estimates, expected, `alle ${R} Wiederholungsschätzungen = Mittel der unabhängig gezogenen Stichproben (Refit auf jeder Stichprobe)`);
  assertEqual(res.original, [15.5], 'original = Refit auf den Originaldaten (Mittel 15.5)');
  assertEqual([res.level, res.seed, res.replicates, res.failedReplicates], [0.9, 42, R, 0], 'Metadaten: level 0.90, seed, replicates, failedReplicates 0');

  // Refit wird tatsächlich aufgerufen
  const calls = [];
  S.seededBootstrap({ data, refit: (sample, info) => { calls.push({ n: sample.length, info, sample }); return [simpleMean(sample)]; }, replicates: 25, seed: 42 });
  assertEqual(calls.length, 26, 'refit wird 1× auf den Originaldaten und 25× auf Stichproben aufgerufen');
  assertEqual(calls[0].info.replicate, -1, 'erster Aufruf = Originaldaten (replicate −1)');
  assertEqual(calls[0].sample, data, 'Originalaufruf bekommt die Daten in Originalreihenfolge');
  assertTrue(calls.slice(1).every((c) => c.n === 30 && c.sample.every((v) => data.includes(v))), 'Stichproben haben n Zeilen aus den Daten');
  assertTrue(calls.slice(1).some((c) => new Set(c.sample).size < 30), 'Ziehen MIT Zurücklegen: es gibt Stichproben mit Wiederholungen');
  assertTrue(calls.slice(1).every((c) => JSON.stringify(c.sample) !== JSON.stringify(data)), 'jede Stichprobe unterscheidet sich vom Original');
  assertEqual(calls.slice(1).map((c) => c.info.replicate), Array.from({ length: 25 }, (_, i) => i), 'Wiederholungsnummern 0…24 in Reihenfolge');
  assertEqual(calls[3].info.indices, refIdx[2], 'info.indices = die gezogenen Indizes der Wiederholung');
  // Refit ≠ Originalfit: Schätzungen streuen
  assertTrue(new Set(res.estimates.map((e) => e[0])).size > 100, 'Wiederholungsschätzungen streuen (über 100 verschiedene Werte bei 200 Wiederholungen) — kein Originalfit wird wiederholt');
  assertTrue(res.intervals[0].upper - res.intervals[0].lower > 1, `Intervallbreite ${(res.intervals[0].upper - res.intervals[0].lower).toFixed(3)} > 1 (Streuung des Mittels ≈ 1,6)`);

  // Intervall: 5 %- und 95 %-Quantil, unabhängig berechnet
  const col = expected.map((e) => e[0]);
  assertEqual(res.intervals[0].lower, refQuantile(col, 0.05), '90-%-Intervall: untere Grenze = 5 %-Quantil (Typ 7, eigener Code)');
  assertEqual(res.intervals[0].upper, refQuantile(col, 0.95), '90-%-Intervall: obere Grenze = 95 %-Quantil (Typ 7, eigener Code)');
  const r80 = S.seededBootstrap({ data, refit: meanRefit, replicates: R, seed: 42, level: 0.8 });
  assertEqual([r80.intervals[0].lower, r80.intervals[0].upper], [refQuantile(col, 0.1), refQuantile(col, 0.9)], 'level 0.80: 10 %- und 90 %-Quantil');
  assertTrue(r80.intervals[0].upper - r80.intervals[0].lower < res.intervals[0].upper - res.intervals[0].lower, 'niedrigeres Niveau ⇒ schmaleres Intervall');
  const r95 = S.seededBootstrap({ data, refit: meanRefit, replicates: R, seed: 42, level: 0.95 });
  assertEqual([r95.intervals[0].lower, r95.intervals[0].upper], [refQuantile(col, 0.025), refQuantile(col, 0.975)], 'level 0.95: 2,5 %- und 97,5 %-Quantil');
  assertTrue(res.intervals[0].lower < res.original[0] && res.original[0] < res.intervals[0].upper, 'Intervall umschließt die Schätzung auf den Originaldaten (feste Sequenz)');
  const defaultLevel = S.seededBootstrap({ data, refit: meanRefit, replicates: R, seed: 42 });
  assertEqual(defaultLevel.level, 0.9, 'Standardniveau = 0.90');

  // Mehrere Komponenten
  const two = S.seededBootstrap({ data, refit: (s) => [simpleMean(s), Math.max(...s)], replicates: 50, seed: 7 });
  assertEqual([two.intervals.length, two.original], [2, [15.5, 30]], 'zwei Komponenten: je ein Intervall, original = (15.5, 30)');
  assertTrue(two.intervals[1].upper === 30 && two.intervals[1].lower < 30, 'Komponente Maximum: obere Grenze 30, untere < 30');

  // Reihenfolge der Eingabe
  const permuted = [...data].reverse();
  const rp = S.seededBootstrap({ data: permuted, refit: meanRefit, replicates: R, seed: 42 });
  assertTrue(JSON.stringify(rp.estimates) !== JSON.stringify(res.estimates), 'Reihenfolge ist Teil der Eingabe: umgekehrte Daten ⇒ andere Stichproben (dokumentiertes Verhalten)');
  assertEqual(S.seededBootstrap({ data: [...permuted].sort((x, y) => x - y), refit: meanRefit, replicates: R, seed: 42 }), res, 'kanonisch sortierte Daten ⇒ identisches Ergebnis, egal in welcher Reihenfolge sie kamen');
  const dBefore = [...data];
  assertEqual(data, dBefore, 'data wird nicht verändert');

  // Bootstrap mit echtem Refit (Poisson-Regression): Zwei-Gruppen-Daten
  const rows = [];
  const grp0 = [1, 3, 2, 4, 3, 2, 5, 3];
  const grp1 = [6, 9, 7, 11, 8, 10, 7, 9];
  grp0.forEach((v) => rows.push({ g: 0, y: v }));
  grp1.forEach((v) => rows.push({ g: 1, y: v }));
  const poisRefit = (sample) => S.fitPoissonRegression({ X: sample.map((r) => [1, r.g]), y: sample.map((r) => r.y), penalty: [0, 0] }).beta;
  const pb = S.seededBootstrap({ data: rows, refit: poisRefit, replicates: 100, seed: 11 });
  assertNear(pb.original[1], Math.log(mean16(grp1) / mean16(grp0)), 1e-13, 'Poisson-Refit: original β₁ = ln(Mittel Gruppe 1 / Mittel Gruppe 0)');
  assertTrue(pb.failedReplicates === 0 && pb.estimates.length === 100, 'Poisson-Refit: alle 100 Refits erfolgreich');
  assertTrue(pb.intervals[1].lower < pb.original[1] && pb.original[1] < pb.intervals[1].upper && pb.intervals[1].upper - pb.intervals[1].lower > 0.05, 'Poisson-Refit: Intervall für β₁ umschließt die Schätzung und hat Breite > 0.05');
  assertEqual(S.seededBootstrap({ data: rows, refit: poisRefit, replicates: 100, seed: 11 }), pb, 'Poisson-Refit: gleicher Seed ⇒ identisches Ergebnis');

  // Fehlgeschlagene Refits
  const failIdx = refIdx.map((idx) => idx.some((i) => data[i] === 1));
  const expectFailed = failIdx.filter(Boolean).length;
  const tolerant = S.seededBootstrap({ data, refit: (s, info) => (info.replicate >= 0 && s.includes(1) ? (() => { throw new S.NumericError('not-positive-definite', 'x'); })() : [simpleMean(s)]), replicates: R, seed: 42, maxFailedFraction: 0.99 });
  assertEqual(tolerant.failedReplicates, expectFailed, `fehlgeschlagene Refits (NumericError) werden gezählt: ${expectFailed} von ${R} (unabhängig aus den Referenzindizes bestimmt)`);
  assertEqual(tolerant.estimates.length, R - expectFailed, 'nur erfolgreiche Refits gehen in die Intervalle ein');
  throwsCode(() => S.seededBootstrap({ data, refit: (s, info) => (info.replicate >= 0 && s.includes(1) ? (() => { throw new S.NumericError('not-positive-definite', 'x'); })() : [simpleMean(s)]), replicates: R, seed: 42 }), 'bootstrap-failed', 'Ausfallanteil über der Schutzgrenze (hier der technische Standardwert maxFailedFraction, überschreibbar) → Fehler bootstrap-failed');
  let otherErrorPropagated = false;
  try { S.seededBootstrap({ data, refit: (s, info) => { if (info.replicate === 3) throw new TypeError('Programmierfehler'); return [1]; }, replicates: 30, seed: 1 }); } catch (e) { otherErrorPropagated = e instanceof TypeError; }
  assertTrue(otherErrorPropagated, 'andere Fehler als NumericError werden nicht verschluckt');
  const nanRefit = S.seededBootstrap({ data, refit: (s, info) => (info.replicate === 0 ? [NaN] : [simpleMean(s)]), replicates: 30, seed: 1 });
  assertEqual(nanRefit.failedReplicates, 1, 'nicht endlicher Refit-Wert zählt als fehlgeschlagen');
  const nullRefit = S.seededBootstrap({ data, refit: (s, info) => (info.replicate === 0 ? null : [simpleMean(s)]), replicates: 30, seed: 1 });
  assertEqual(nullRefit.failedReplicates, 1, 'Refit-Ergebnis null zählt als fehlgeschlagen');
  throwsCode(() => S.seededBootstrap({ data, refit: (s, info) => (info.replicate === 2 ? [1, 2] : [1]), replicates: 30, seed: 1 }), 'invalid-input', 'Refit mit wechselnder Vektorlänge → Fehler');

  // Ungültige / zu kleine Eingaben
  throwsCode(() => S.seededBootstrap({ data: [1], refit: meanRefit, replicates: 50, seed: 1 }), 'invalid-input', 'data mit nur 1 Zeile → Fehler');
  throwsCode(() => S.seededBootstrap({ data: [], refit: meanRefit, replicates: 50, seed: 1 }), 'invalid-input', 'leere data → Fehler');
  throwsCode(() => S.seededBootstrap({ data: 'abc', refit: meanRefit, replicates: 50, seed: 1 }), 'invalid-input', 'data kein Array → Fehler');
  throwsCode(() => S.seededBootstrap({ data, refit: 5, replicates: 50, seed: 1 }), 'invalid-input', 'refit keine Funktion → Fehler');
  throwsCode(() => S.seededBootstrap({ data, refit: meanRefit, replicates: 19, seed: 1 }), 'invalid-input', 'weniger als 20 Wiederholungen → Fehler');
  throwsCode(() => S.seededBootstrap({ data, refit: meanRefit, replicates: 50.5, seed: 1 }), 'invalid-input', 'nicht ganzzahlige Wiederholungen → Fehler');
  for (const level of [0, 1, 1.5, -0.1, NaN, '0.9']) throwsCode(() => S.seededBootstrap({ data, refit: meanRefit, replicates: 50, seed: 1, level }), 'invalid-input', `level ${String(level)} → Fehler`);
  throwsCode(() => S.seededBootstrap({ data, refit: meanRefit, replicates: 50 }), 'invalid-input', 'fehlender Seed → Fehler');
  throwsCode(() => S.seededBootstrap({ data, refit: meanRefit, replicates: 50, seed: -3 }), 'invalid-input', 'ungültiger Seed → Fehler');
  throwsCode(() => S.seededBootstrap({ data, refit: meanRefit, replicates: 50, seed: 1, maxFailedFraction: 1 }), 'invalid-input', 'maxFailedFraction = 1 → Fehler');
  throwsCode(() => S.seededBootstrap({ data, refit: () => [NaN], replicates: 50, seed: 1 }), 'invalid-input', 'Refit auf den Originaldaten liefert NaN → Fehler');
  throwsCode(() => S.seededBootstrap({ data, refit: () => [], replicates: 50, seed: 1 }), 'invalid-input', 'Refit auf den Originaldaten liefert leeren Vektor → Fehler');
  throwsCode(() => S.seededBootstrap(), 'invalid-input', 'ohne Argumente → Fehler');
  throwsCode(() => S.bootstrapSampleIndices(0, 5, 1), 'invalid-input', 'bootstrapSampleIndices: n = 0 → Fehler');
  throwsCode(() => S.bootstrapSampleIndices(5, 0, 1), 'invalid-input', 'bootstrapSampleIndices: replicates = 0 → Fehler');
  assertEqual(S.bootstrapSampleIndices(4, 2, 9, 3).map((s) => s.length), [3, 3], 'bootstrapSampleIndices: sampleSize steuert die Stichprobengröße');
}
function mean16(v) { return v.reduce((a, b) => a + b, 0) / v.length; }

// ══ 7. Zeitlich geordnete Splits ════════════════════════════════════════
console.log('== rollingOriginSplits ==');
{
  const groups = ['a', 'a', 'b', 'b', 'b', 'c', 'd', 'd'];
  const s = S.rollingOriginSplits(groups);
  assertEqual(s.map((x) => [x.trainGroups, x.testGroups]), [[['a'], ['b']], [['a', 'b'], ['c']], [['a', 'b', 'c'], ['d']]], 'Standard: Train wächst, Test = nächste Gruppe (minTrainGroups 1)');
  assertEqual(s[0].trainIndices, [0, 1], 'Split 0: Train = Indizes der Gruppe a');
  assertEqual(s[0].testIndices, [2, 3, 4], 'Split 0: Test = Indizes der Gruppe b');
  assertEqual(s[2].testIndices, [6, 7], 'Split 2: Test = Indizes der Gruppe d');
  assertTrue(s.every((x) => Math.max(...x.trainIndices) < Math.min(...x.testIndices)), 'kein Zukunftsleck: jeder Train-Index liegt vor jedem Test-Index');
  assertTrue(s.every((x) => x.trainIndices.every((i) => x.trainGroups.includes(groups[i])) && x.testIndices.every((i) => x.testGroups.includes(groups[i]))), 'Indizes gehören zu den ausgewiesenen Gruppen');
  assertEqual(S.rollingOriginSplits(groups, { minTrainGroups: 2 }).map((x) => x.testGroups), [['c'], ['d']], 'minTrainGroups = 2: erste Testgruppe ist c');
  assertEqual(S.rollingOriginSplits(groups, { testGroups: 2, step: 1 }).map((x) => x.testGroups), [['b', 'c'], ['c', 'd']], 'testGroups = 2, step = 1: überlappende Testfenster');
  assertEqual(S.rollingOriginSplits(groups, { testGroups: 2 }).map((x) => x.testGroups), [['b', 'c']], 'testGroups = 2: step = testGroups');
  assertEqual(S.rollingOriginSplits(['a', 'b'], { minTrainGroups: 2 }), [], 'zu wenige Gruppen: leeres Ergebnis');
  assertEqual(S.rollingOriginSplits(['a']), [], 'eine Gruppe: leeres Ergebnis');
  const numeric = S.rollingOriginSplits([1, 1, 2, 3, 3]);
  assertEqual(numeric.map((x) => x.testIndices), [[2], [3, 4]], 'numerische Gruppenlabel');
  throwsCode(() => S.rollingOriginSplits(['a', 'b', 'a']), 'invalid-input', 'nicht zusammenhängende Gruppe → Fehler (Zukunftsleck-Schutz)');
  throwsCode(() => S.rollingOriginSplits([]), 'invalid-input', 'leere Gruppenliste → Fehler');
  throwsCode(() => S.rollingOriginSplits('abc'), 'invalid-input', 'kein Array → Fehler');
  throwsCode(() => S.rollingOriginSplits(groups, { minTrainGroups: 0 }), 'invalid-input', 'minTrainGroups = 0 → Fehler');
  throwsCode(() => S.rollingOriginSplits(groups, { testGroups: 1.5 }), 'invalid-input', 'testGroups nicht ganzzahlig → Fehler');
  throwsCode(() => S.rollingOriginSplits(groups, { step: 0 }), 'invalid-input', 'step = 0 → Fehler');
  const gb = [...groups];
  S.rollingOriginSplits(groups);
  assertEqual(groups, gb, 'Eingabe wird nicht verändert');
}

// ══ 8. Ausgabe-Rundung ══════════════════════════════════════════════════
console.log('== roundOutput (Rundung erst an der Ausgabegrenze) ==');
{
  assertEqual(S.roundOutput(0.123456789), 0.12345679, '0.123456789 → 0.12345679 (8 Nachkommastellen)');
  assertEqual(S.roundOutput(1.5), 1.5, '1.5 bleibt 1.5');
  assertEqual(S.roundOutput(2 / 3), 0.66666667, '2/3 → 0.66666667');
  assertEqual(S.roundOutput(-2 / 3), -0.66666667, '−2/3 → −0.66666667');
  assertEqual(S.roundOutput(123456.123456789), 123456.12345679, 'große Zahl: 8 Nachkommastellen');
  assertEqual(S.roundOutput(1e-9), 0, '1e-9 → 0');
  assertTrue(Object.is(S.roundOutput(-1e-9), 0), '−1e-9 → 0 (nicht −0)');
  assertTrue(Object.is(S.roundOutput(-0), 0), '−0 → 0');
  assertEqual(S.roundOutput(0.123456789, 2), 0.12, 'decimals = 2');
  assertEqual(S.roundOutput(0.5, 0), 1, 'decimals = 0: 0.5 → 1');
  const nested = { a: 1 / 3, list: [2 / 3, { deep: 0.123456789 }], text: 'x', flag: true, none: null };
  const nBefore = JSON.stringify(nested);
  assertEqual(S.roundOutput(nested), { a: 0.33333333, list: [0.66666667, { deep: 0.12345679 }], text: 'x', flag: true, none: null }, 'verschachtelte Strukturen: Zahlen gerundet, andere Werte unverändert');
  assertEqual(JSON.stringify(nested), nBefore, 'roundOutput verändert die Eingabe nicht');
  const once = S.roundOutput(Math.PI);
  assertEqual(S.roundOutput(once), once, 'roundOutput ist idempotent');
  for (const bad of [NaN, Infinity, -Infinity]) throwsCode(() => S.roundOutput(bad), 'non-finite', `roundOutput(${bad}) → Fehler (nie NaN/Infinity ausgeben)`);
  throwsCode(() => S.roundOutput({ x: [1, NaN] }), 'non-finite', 'nicht endliche Zahl in verschachtelter Struktur → Fehler');
  throwsCode(() => S.roundOutput(1, -1), 'invalid-input', 'decimals < 0 → Fehler');
  throwsCode(() => S.roundOutput(1, 2.5), 'invalid-input', 'decimals nicht ganzzahlig → Fehler');
  const raw = S.matchOutcomeProbabilities(2.3, 1.7);
  const rounded = S.roundOutput(raw);
  assertTrue(rounded.win !== raw.win && Math.abs(rounded.win - raw.win) < 5e-9, 'Rundung passiert nur in roundOutput: die numerische Funktion liefert ungerundete Werte');
}

// ══ 9. Quelltext-Eigenschaften ══════════════════════════════════════════
console.log('== Quelltext: Node-only, keine Abhängigkeiten, kein verstecktes Zufallsverhalten ==');
{
  const src = await readFile(path.join(REPO_ROOT, 'scripts', 'model', 'stats.mjs'), 'utf8');
  const code = src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*$/gm, '');
  assertTrue(!/^\s*import\s/m.test(code) && !/\brequire\(/.test(code), 'stats.mjs importiert nichts (keine externen und keine internen Abhängigkeiten)');
  assertTrue(!/Math\.random|Date\.now|new Date|performance\.now|process\.|fetch\(|node:|crypto/.test(code), 'stats.mjs: kein Math.random, keine Uhrzeit, kein process, kein Netzwerk, kein Dateisystem');
  assertTrue(!/Math\.round\(|toFixed\(/.test(code.replace(/export function roundOutput[\s\S]*$/, '')), 'Rundung (toFixed/Math.round) kommt nur in roundOutput vor — nirgends in den Rechenfunktionen');
  assertTrue(!/index\.html|team|Team|asOf|matchday|Spieltag/.test(code), 'keine M1-Begriffe im Code (keine Team-, Zeit-, Spieltag- oder asOf-Annahmen)');
}

console.log('');
if (failures > 0) {
  console.log(`${failures} Test(s) fehlgeschlagen.`);
  process.exitCode = 1;
} else {
  console.log('Alle Tests erfolgreich.');
  process.exitCode = 0;
}

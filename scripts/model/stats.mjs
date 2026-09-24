// Generische numerische Bausteine für die Liga-Modelle (P2-Runde 1: nur Numerik).
//
// Reine Funktionen ohne Dateisystem, Netzwerk, Uhrzeit oder Zufall außerhalb des seeded RNG. Keine
// M1/M9-Fachlogik: keine Team-, Zeit-, Kader-, asOf- oder Identitätsannahmen. Alle Funktionen
// rechnen mit voller JavaScript-Gleitkommapräzision und geben UNGERUNDETE Werte zurück; gerundet wird
// erst an der Ausgabegrenze mit `roundOutput` (8 Nachkommastellen).
//
// Inhalt:
//   1. Fehler und Grundfunktionen  NumericError, sum (Neumaier), mean, quantile (Typ 7), logFactorial, poissonPmf
//   2. Lineare Algebra              cholesky, choleskySolve, solveSPD (dichte Matrizen als Array von Zeilen)
//   3. Poisson-Regression           fitPoissonRegression (Newton/IRLS, optional diagonale Ridge-Penalty)
//   4. Spielausgang aus 2 Raten     matchOutcomeProbabilities, skellamPmf, resultIndex
//   5. Bewertung                    logLoss, brierScore
//   6. Zufall                       createRng (seeded xoshiro128**), bootstrapSampleIndices, seededBootstrap
//   7. Zeitlich geordnete Splits    rollingOriginSplits (generisch, keine konkrete CV-Strategie)
//   8. Ausgabe                      roundOutput (Rundung an der Serialisierungsgrenze)

// ─────────────────────────────────────────────────────────────────────────
// 1. Fehler und Grundfunktionen
// ─────────────────────────────────────────────────────────────────────────

/**
 * Fehler für ungültige Eingaben oder numerisch nicht lösbare Probleme. `code`:
 *   'invalid-input' | 'not-square' | 'not-symmetric' | 'not-positive-definite' | 'non-finite' | 'bootstrap-failed'
 */
export class NumericError extends Error {
  constructor(code, message) {
    super(message);
    this.name = 'NumericError';
    this.code = code;
  }
}
const fail = (code, message) => { throw new NumericError(code, message); };

const isFiniteNumber = (x) => typeof x === 'number' && Number.isFinite(x);

/** Summe mit Neumaier-Kompensation (deterministisch, von links nach rechts). Leere Liste → 0. */
export function sum(values) {
  let s = 0;
  let c = 0;
  for (const v of values) {
    const t = s + v;
    if (Math.abs(s) >= Math.abs(v)) c += (s - t) + v;
    else c += (v - t) + s;
    s = t;
  }
  return s + c;
}

/** Arithmetisches Mittel (kompensierte Summe). Leere oder nicht endliche Eingabe → NumericError. */
export function mean(values) {
  if (!Array.isArray(values) || values.length === 0) fail('invalid-input', 'mean: nicht leeres Array erwartet');
  if (!values.every(isFiniteNumber)) fail('non-finite', 'mean: nur endliche Zahlen erlaubt');
  return sum(values) / values.length;
}

/**
 * Quantil Typ 7 (lineare Interpolation zwischen Ordnungsstatistiken, R-Standard): h = (n − 1)·p,
 * Wert = x[⌊h⌋] + (h − ⌊h⌋)·(x[⌊h⌋+1] − x[⌊h⌋]). `values` wird nicht verändert; p ∈ [0, 1].
 */
export function quantile(values, p) {
  if (!Array.isArray(values) || values.length === 0) fail('invalid-input', 'quantile: nicht leeres Array erwartet');
  if (!values.every(isFiniteNumber)) fail('non-finite', 'quantile: nur endliche Zahlen erlaubt');
  if (!isFiniteNumber(p) || p < 0 || p > 1) fail('invalid-input', 'quantile: p muss in [0, 1] liegen');
  const x = [...values].sort((a, b) => a - b);
  const h = (x.length - 1) * p;
  const lo = Math.floor(h);
  if (lo + 1 >= x.length) return x[x.length - 1];
  return x[lo] + (h - lo) * (x[lo + 1] - x[lo]);
}

const LOG_FACTORIAL = [0];
/** log(n!) für ganze n ≥ 0 (kumulierte Summe der Logarithmen, zwischengespeichert). */
export function logFactorial(n) {
  if (!Number.isInteger(n) || n < 0) fail('invalid-input', 'logFactorial: ganze Zahl ≥ 0 erwartet');
  while (LOG_FACTORIAL.length <= n) LOG_FACTORIAL.push(LOG_FACTORIAL[LOG_FACTORIAL.length - 1] + Math.log(LOG_FACTORIAL.length));
  return LOG_FACTORIAL[n];
}

/** log P(X = k) für X ~ Poisson(λ); λ = 0 ist die Punktmasse auf 0. */
export function logPoissonPmf(k, lambda) {
  if (!Number.isInteger(k) || k < 0) fail('invalid-input', 'poissonPmf: k muss eine ganze Zahl ≥ 0 sein');
  if (!isFiniteNumber(lambda) || lambda < 0) fail('invalid-input', 'poissonPmf: λ muss endlich und ≥ 0 sein');
  if (lambda === 0) return k === 0 ? 0 : -Infinity;
  return k * Math.log(lambda) - lambda - logFactorial(k);
}

/** P(X = k) für X ~ Poisson(λ). */
export function poissonPmf(k, lambda) {
  return Math.exp(logPoissonPmf(k, lambda));
}

// ─────────────────────────────────────────────────────────────────────────
// 2. Lineare Algebra (dichte Matrizen: Array von Zeilen, plain Arrays)
// ─────────────────────────────────────────────────────────────────────────

function assertSquareMatrix(A, name) {
  if (!Array.isArray(A) || A.length === 0) fail('invalid-input', `${name}: nicht leere Matrix erwartet`);
  const n = A.length;
  for (const row of A) {
    if (!Array.isArray(row) || row.length !== n) fail('not-square', `${name}: quadratische Matrix erwartet`);
    if (!row.every(isFiniteNumber)) fail('non-finite', `${name}: nur endliche Zahlen erlaubt`);
  }
  return n;
}

/**
 * Cholesky-Zerlegung A = L·Lᵀ einer symmetrisch positiv definiten Matrix (untere Dreiecksmatrix L).
 * Fehler (NumericError): nicht quadratisch ('not-square'), nicht symmetrisch ('not-symmetric', relative
 * Toleranz 1e-12), nicht endlich ('non-finite'), nicht positiv definit bzw. numerisch singulär
 * ('not-positive-definite': Pivot ≤ relativePivotTolerance · max(Diagonale)). Die Eingabe wird nicht verändert.
 * @param {number[][]} A
 * @param {{relativePivotTolerance?: number}} [options] default 1e-13
 */
export function cholesky(A, { relativePivotTolerance = 1e-13 } = {}) {
  const n = assertSquareMatrix(A, 'cholesky');
  let maxDiag = 0;
  for (let i = 0; i < n; i++) {
    maxDiag = Math.max(maxDiag, A[i][i]);
    for (let j = 0; j < i; j++) {
      const scale = Math.max(Math.abs(A[i][j]), Math.abs(A[j][i]));
      if (Math.abs(A[i][j] - A[j][i]) > 1e-12 * scale) fail('not-symmetric', 'cholesky: Matrix ist nicht symmetrisch');
    }
  }
  const L = Array.from({ length: n }, () => new Array(n).fill(0));
  for (let j = 0; j < n; j++) {
    let d = A[j][j];
    for (let k = 0; k < j; k++) d -= L[j][k] * L[j][k];
    if (!(d > relativePivotTolerance * maxDiag) || !Number.isFinite(d)) fail('not-positive-definite', 'cholesky: Matrix ist nicht positiv definit (bzw. numerisch singulär)');
    L[j][j] = Math.sqrt(d);
    for (let i = j + 1; i < n; i++) {
      let s = A[i][j];
      for (let k = 0; k < j; k++) s -= L[i][k] * L[j][k];
      L[i][j] = s / L[j][j];
    }
  }
  return L;
}

/** Löst L·Lᵀ·x = b für eine untere Dreiecksmatrix L (Vorwärts- und Rückwärtssubstitution). */
export function choleskySolve(L, b) {
  const n = assertSquareMatrix(L, 'choleskySolve');
  if (!Array.isArray(b) || b.length !== n || !b.every(isFiniteNumber)) fail('invalid-input', 'choleskySolve: b muss ein endlicher Vektor der Länge n sein');
  const y = new Array(n);
  for (let i = 0; i < n; i++) {
    let s = b[i];
    for (let k = 0; k < i; k++) s -= L[i][k] * y[k];
    y[i] = s / L[i][i];
  }
  const x = new Array(n);
  for (let i = n - 1; i >= 0; i--) {
    let s = y[i];
    for (let k = i + 1; k < n; k++) s -= L[k][i] * x[k];
    x[i] = s / L[i][i];
  }
  return x;
}

/** Löst A·x = b für symmetrisch positiv definites A (Cholesky). Fehler wie `cholesky`. */
export function solveSPD(A, b, options) {
  return choleskySolve(cholesky(A, options), b);
}

// ─────────────────────────────────────────────────────────────────────────
// 3. Poisson-Regression (generisch)
// ─────────────────────────────────────────────────────────────────────────

function expandPenalty(penalty, p) {
  if (isFiniteNumber(penalty)) {
    if (penalty < 0) fail('invalid-input', 'fitPoissonRegression: penalty muss ≥ 0 sein');
    return new Array(p).fill(penalty);
  }
  if (Array.isArray(penalty) && penalty.length === p && penalty.every((v) => isFiniteNumber(v) && v >= 0)) return [...penalty];
  return fail('invalid-input', `fitPoissonRegression: penalty muss eine Zahl ≥ 0 oder ein Array der Länge ${p} mit Werten ≥ 0 sein`);
}

/**
 * Poisson-Regression mit Log-Link, optionaler Zeilengewichtung, Offset und diagonaler Ridge-Penalty.
 *
 * Modell: y_i ~ Poisson(μ_i), η_i = offset_i + Σ_j X_ij·β_j, μ_i = exp(η_i).
 * Maximiert wird die penalisierte Log-Likelihood (ohne den konstanten Term −log y_i!):
 *   ℓ(β) = Σ_i w_i·(y_i·η_i − μ_i) − ½·Σ_j penalty_j·β_j²
 * Gradient g = Xᵀ·W·(y − μ) − penalty∘β, Hesse H = Xᵀ·W·diag(μ)·X + diag(penalty), Newton-Schritt d = H⁻¹·g
 * mit Schrittweitenhalbierung (ℓ darf nicht sinken). Es gibt KEINE versteckten Annahmen: kein automatischer
 * Achsenabschnitt (eine Spalte aus Einsen muss in X stehen), keine Zentrierung, keine Team-/Liga-Struktur;
 * die Penalty zieht jeden Koeffizienten einzeln Richtung 0 (Stärke je Koeffizient frei wählbar, auch 0).
 *
 * Konvergenz: Newton-Dekrement ½·gᵀd ≤ tolDecrement UND max|d| ≤ tolStep·(1 + max|β|); der letzte Newton-Schritt wird noch ausgeführt. Ohne Penalty divergiert
 * der Fit bei fehlender Maximum-Likelihood-Lösung (z. B. alle y = 0): dann konvergiert er nicht
 * (`converged: false`). Ist X ohne Penalty rangdefizit, wirft die Cholesky-Zerlegung
 * NumericError('not-positive-definite').
 *
 * @param {object} args
 * @param {number[][]} args.X            n×p Designmatrix (dicht), n ≥ 1, p ≥ 1, alle Werte endlich
 * @param {number[]}   args.y            n Werte ≥ 0 (Zählwerte; nicht ganzzahlige Werte sind als Quasi-Likelihood erlaubt)
 * @param {number[]}  [args.offset]      n Offsets auf der Log-Skala (Default 0)
 * @param {number[]}  [args.weights]     n Gewichte ≥ 0 (Default 1); Gewicht k entspricht k-facher Wiederholung der Zeile
 * @param {number|number[]} [args.penalty] Ridge-Stärke: Zahl (für alle Koeffizienten) oder Array der Länge p; Default 0
 * @param {number[]}  [args.initialBeta]  Startwert (Default Nullvektor)
 * @param {number}    [args.maxIterations] Default 100
 * @param {number}    [args.tolDecrement]  Default 1e-18
 * @param {number}    [args.tolStep]       Default 1e-10
 * @param {number}    [args.maxAbsCoefficient] Default 50 — TECHNISCHE Schutzgrenze gegen Divergenz (Abbruch mit converged false, reason coefficient-bound),
 *   keine fachliche Vorgabe und keine Modellannahme; Aufrufer (z. B. ein späteres Teammodell) können sie frei überschreiben
 * @param {number}    [args.maxHalvings]   Default 40
 * @returns {{beta:number[], mu:number[], converged:boolean, reason:string, iterations:number,
 *   penalizedLogLikelihood:number, logLikelihoodKernel:number, gradientNorm:number, newtonDecrement:number}}
 *   reason: 'converged' | 'max-iterations' | 'line-search' | 'coefficient-bound'. Alle Werte ungerundet.
 */
export function fitPoissonRegression({
  X, y, offset, weights, penalty = 0, initialBeta,
  maxIterations = 100, tolDecrement = 1e-18, tolStep = 1e-10, maxAbsCoefficient = 50, maxHalvings = 40,
} = {}) {
  if (!Array.isArray(X) || X.length === 0 || !Array.isArray(X[0]) || X[0].length === 0) fail('invalid-input', 'fitPoissonRegression: X muss eine nicht leere n×p-Matrix sein');
  const n = X.length;
  const p = X[0].length;
  for (const row of X) {
    if (!Array.isArray(row) || row.length !== p) fail('invalid-input', 'fitPoissonRegression: alle Zeilen von X müssen dieselbe Länge haben');
    if (!row.every(isFiniteNumber)) fail('non-finite', 'fitPoissonRegression: X enthält nicht endliche Werte');
  }
  if (!Array.isArray(y) || y.length !== n || !y.every((v) => isFiniteNumber(v) && v >= 0)) fail('invalid-input', 'fitPoissonRegression: y muss n endliche Werte ≥ 0 enthalten');
  const off = offset === undefined ? new Array(n).fill(0) : offset;
  if (!Array.isArray(off) || off.length !== n || !off.every(isFiniteNumber)) fail('invalid-input', 'fitPoissonRegression: offset muss n endliche Werte enthalten');
  const w = weights === undefined ? new Array(n).fill(1) : weights;
  if (!Array.isArray(w) || w.length !== n || !w.every((v) => isFiniteNumber(v) && v >= 0)) fail('invalid-input', 'fitPoissonRegression: weights muss n endliche Werte ≥ 0 enthalten');
  const pen = expandPenalty(penalty, p);
  let beta = initialBeta === undefined ? new Array(p).fill(0) : initialBeta;
  if (!Array.isArray(beta) || beta.length !== p || !beta.every(isFiniteNumber)) fail('invalid-input', `fitPoissonRegression: initialBeta muss ${p} endliche Werte enthalten`);
  beta = [...beta];
  if (!Number.isInteger(maxIterations) || maxIterations < 1) fail('invalid-input', 'fitPoissonRegression: maxIterations muss eine ganze Zahl ≥ 1 sein');

  const evaluate = (b) => {
    const mu = new Array(n);
    let ll = 0;
    for (let i = 0; i < n; i++) {
      let eta = off[i];
      const row = X[i];
      for (let j = 0; j < p; j++) eta += row[j] * b[j];
      if (!Number.isFinite(eta) || eta > 700) return null;
      mu[i] = Math.exp(eta);
      ll += w[i] * (y[i] * eta - mu[i]);
    }
    let penTerm = 0;
    for (let j = 0; j < p; j++) penTerm += pen[j] * b[j] * b[j];
    return { mu, ll, pll: ll - 0.5 * penTerm };
  };
  const derivatives = (b, mu) => {
    const g = new Array(p).fill(0);
    const H = Array.from({ length: p }, () => new Array(p).fill(0));
    for (let i = 0; i < n; i++) {
      const row = X[i];
      const r = w[i] * (y[i] - mu[i]);
      const m = w[i] * mu[i];
      for (let j = 0; j < p; j++) {
        g[j] += r * row[j];
        const mj = m * row[j];
        for (let k = 0; k <= j; k++) H[j][k] += mj * row[k];
      }
    }
    for (let j = 0; j < p; j++) {
      g[j] -= pen[j] * b[j];
      H[j][j] += pen[j];
      for (let k = 0; k < j; k++) H[k][j] = H[j][k];
    }
    return { g, H };
  };
  const maxAbs = (v) => v.reduce((a, x) => Math.max(a, Math.abs(x)), 0);

  let cur = evaluate(beta);
  if (!cur) fail('non-finite', 'fitPoissonRegression: Startwert liefert nicht endliche Erwartungswerte');
  let converged = false;
  let reason = 'max-iterations';
  let iterations = 0;
  let decrement = Infinity;
  for (; iterations < maxIterations; iterations++) {
    const { g, H } = derivatives(beta, cur.mu);
    const d = solveSPD(H, g);
    decrement = 0.5 * d.reduce((a, di, j) => a + di * g[j], 0);
    const small = decrement <= tolDecrement && maxAbs(d) <= tolStep * (1 + maxAbs(beta));
    let t = 1;
    let accepted = false;
    for (let h = 0; h <= maxHalvings; h++) {
      const cand = beta.map((b, j) => b + t * d[j]);
      const e = evaluate(cand);
      if (e && e.pll >= cur.pll - 4 * Number.EPSILON * (1 + Math.abs(cur.pll))) { beta = cand; cur = e; accepted = true; break; }
      t /= 2;
    }
    if (!accepted) { reason = 'line-search'; break; }
    if (small) { converged = true; reason = 'converged'; iterations++; break; }
    if (maxAbs(beta) > maxAbsCoefficient) { reason = 'coefficient-bound'; iterations++; break; }
  }
  const { g } = derivatives(beta, cur.mu);
  return {
    beta, mu: cur.mu, converged, reason, iterations,
    penalizedLogLikelihood: cur.pll, logLikelihoodKernel: cur.ll, gradientNorm: maxAbs(g), newtonDecrement: decrement,
  };
}

// ─────────────────────────────────────────────────────────────────────────
// 4. Spielausgang aus zwei Poisson-Raten (Skellam)
// ─────────────────────────────────────────────────────────────────────────

/** Obergrenze für λ (Rechenaufwand und Platz wachsen linear). */
export const MAX_LAMBDA = 10000;

function poissonArray(lambda, K) {
  const out = new Array(K + 1);
  for (let k = 0; k <= K; k++) out[k] = poissonPmf(k, lambda);
  return out;
}
function cumulative(values) {
  const out = new Array(values.length);
  let s = 0;
  let c = 0;
  for (let i = 0; i < values.length; i++) {
    const v = values[i];
    const t = s + v;
    if (Math.abs(s) >= Math.abs(v)) c += (s - t) + v;
    else c += (v - t) + s;
    s = t;
    out[i] = s + c;
  }
  return out;
}
function checkLambdas(lambdaA, lambdaB) {
  for (const l of [lambdaA, lambdaB]) if (!isFiniteNumber(l) || l < 0 || l > MAX_LAMBDA) fail('invalid-input', `λ muss endlich sein und in [0, ${MAX_LAMBDA}] liegen`);
  // Abschneidepunkt: 40 Standardabweichungen + 60 über dem Mittel (Restmasse < 1e-100 je Verteilung)
  return Math.ceil(Math.max(lambdaA, lambdaB) + 40 * Math.sqrt(Math.max(lambdaA, lambdaB)) + 60);
}

/**
 * Spielausgang aus zwei UNABHÄNGIGEN Poisson-Raten (Tore A ~ Poisson(λA), Tore B ~ Poisson(λB), Differenz ~ Skellam).
 * Berechnet exakt bis zu einem Abschneidepunkt weit im Ende der Verteilung (Restmasse < 1e-100):
 *   win = P(A > B), draw = P(A = B), loss = P(A < B) (aus Sicht von A).
 * `expectedGoalDifference` = λA − λB (Skellam-Mittelwert, exakt, nicht aus den Summen). `residualMass` = 1 − (win + draw + loss)
 * (nur Rundungsrauschen). Werte ungerundet. Fehler bei λ < 0, nicht endlich oder > MAX_LAMBDA.
 * @returns {{win:number, draw:number, loss:number, expectedGoalDifference:number, residualMass:number}}
 */
export function matchOutcomeProbabilities(lambdaA, lambdaB) {
  const K = checkLambdas(lambdaA, lambdaB);
  const pa = poissonArray(lambdaA, K);
  const pb = poissonArray(lambdaB, K);
  const cdfA = cumulative(pa);
  const cdfB = cumulative(pb);
  const winTerms = [];
  const lossTerms = [];
  const drawTerms = [];
  for (let k = 0; k <= K; k++) {
    drawTerms.push(pa[k] * pb[k]);
    if (k >= 1) {
      winTerms.push(pa[k] * cdfB[k - 1]);
      lossTerms.push(pb[k] * cdfA[k - 1]);
    }
  }
  const win = sum(winTerms);
  const draw = sum(drawTerms);
  const loss = sum(lossTerms);
  return { win, draw, loss, expectedGoalDifference: lambdaA - lambdaB, residualMass: 1 - (win + draw + loss) };
}

/** Skellam-Wahrscheinlichkeit P(A − B = d) für ganzzahliges d (ungerundet). */
export function skellamPmf(d, lambdaA, lambdaB) {
  if (!Number.isInteger(d)) fail('invalid-input', 'skellamPmf: d muss eine ganze Zahl sein');
  const K = checkLambdas(lambdaA, lambdaB);
  const pa = poissonArray(lambdaA, K + Math.abs(d));
  const pb = poissonArray(lambdaB, K + Math.abs(d));
  const M = K + Math.abs(d);
  const terms = [];
  for (let b = Math.max(0, -d); b <= M && b + d <= M; b++) terms.push(pb[b] * pa[b + d]);
  return sum(terms);
}

/** Ausgangsindex für `logLoss`/`brierScore` aus Sicht von A: 0 = Sieg A, 1 = Remis, 2 = Niederlage A. */
export function resultIndex(goalsA, goalsB) {
  if (!Number.isFinite(goalsA) || !Number.isFinite(goalsB)) fail('invalid-input', 'resultIndex: endliche Tore erwartet');
  return goalsA > goalsB ? 0 : goalsA === goalsB ? 1 : 2;
}

// ─────────────────────────────────────────────────────────────────────────
// 5. Bewertung von Wahrscheinlichkeitsprognosen
// ─────────────────────────────────────────────────────────────────────────

function checkForecasts(predictions, outcomes, name) {
  if (!Array.isArray(predictions) || !Array.isArray(outcomes) || predictions.length === 0 || predictions.length !== outcomes.length) fail('invalid-input', `${name}: predictions und outcomes müssen gleich lange, nicht leere Arrays sein`);
  const K = Array.isArray(predictions[0]) ? predictions[0].length : 0;
  if (K < 2) fail('invalid-input', `${name}: jede Prognose braucht mindestens 2 Klassen`);
  predictions.forEach((pr, i) => {
    if (!Array.isArray(pr) || pr.length !== K || !pr.every((v) => isFiniteNumber(v) && v >= 0 && v <= 1)) fail('invalid-input', `${name}: Prognose ${i} muss ${K} Wahrscheinlichkeiten in [0, 1] enthalten`);
    if (Math.abs(sum(pr) - 1) > 1e-9) fail('invalid-input', `${name}: Prognose ${i} summiert nicht zu 1`);
    if (!Number.isInteger(outcomes[i]) || outcomes[i] < 0 || outcomes[i] >= K) fail('invalid-input', `${name}: Ausgang ${i} muss ein Klassenindex 0…${K - 1} sein`);
  });
}

/**
 * Mittlerer Log-Loss (natürlicher Logarithmus): −(1/N)·Σ ln p_i[o_i]. Ist die Wahrscheinlichkeit des eingetretenen
 * Ausgangs 0, ist der Wert Infinity (kein verstecktes Clipping). `predictions[i]` = Wahrscheinlichkeitsvektor (Summe 1),
 * `outcomes[i]` = Index des eingetretenen Ausgangs.
 */
export function logLoss(predictions, outcomes) {
  checkForecasts(predictions, outcomes, 'logLoss');
  return sum(predictions.map((pr, i) => -Math.log(pr[outcomes[i]]))) / predictions.length;
}

/**
 * Mehrklassen-Brier-Score nach Brier (1950): (1/N)·Σ_i Σ_k (p_ik − o_ik)², o_ik = 1 für die eingetretene Klasse, sonst 0
 * (Summe über die Klassen, nicht durch K geteilt). Bereich [0, 2].
 */
export function brierScore(predictions, outcomes) {
  checkForecasts(predictions, outcomes, 'brierScore');
  return sum(predictions.map((pr, i) => sum(pr.map((p, k) => (p - (k === outcomes[i] ? 1 : 0)) ** 2)))) / predictions.length;
}

// ─────────────────────────────────────────────────────────────────────────
// 6. Zufall und Bootstrap
// ─────────────────────────────────────────────────────────────────────────

function splitmix32(seed) {
  let a = seed | 0;
  return () => {
    a = (a + 0x9e3779b9) | 0;
    let t = a ^ (a >>> 16);
    t = Math.imul(t, 0x21f0aaad);
    t = t ^ (t >>> 15);
    t = Math.imul(t, 0x735a2d97);
    return (t ^ (t >>> 15)) >>> 0;
  };
}
const rotl = (x, k) => (x << k) | (x >>> (32 - k));

/**
 * Deterministischer Zufallsgenerator (xoshiro128**, Zustand über splitmix32 aus dem Seed). Nur ganzzahlige Operationen:
 * gleiche Sequenz auf jeder Plattform. `seed`: ganze Zahl 0 ≤ seed < 2³² (sonst NumericError, kein stilles Abschneiden).
 * @returns {{nextUint32: () => number, nextFloat: () => number, nextInt: (n:number) => number}}
 *   nextUint32: ganze Zahl in [0, 2³²); nextFloat: 53-Bit-Zahl in [0, 1); nextInt(n): gleichverteilt in [0, n) ohne Modulo-Verzerrung (1 ≤ n ≤ 2³²)
 */
export function createRng(seed) {
  if (!Number.isInteger(seed) || seed < 0 || seed >= 2 ** 32) fail('invalid-input', 'createRng: seed muss eine ganze Zahl in [0, 2^32) sein');
  const sm = splitmix32(seed);
  let s0 = sm() | 0;
  let s1 = sm() | 0;
  let s2 = sm() | 0;
  let s3 = sm() | 0;
  if ((s0 | s1 | s2 | s3) === 0) s0 = 1;
  const nextUint32 = () => {
    const result = Math.imul(rotl(Math.imul(s1, 5), 7), 9) >>> 0;
    const t = s1 << 9;
    s2 ^= s0;
    s3 ^= s1;
    s1 ^= s2;
    s0 ^= s3;
    s2 ^= t;
    s3 = rotl(s3, 11);
    return result;
  };
  const nextFloat = () => {
    const a = nextUint32() >>> 5;
    const b = nextUint32() >>> 6;
    return (a * 67108864 + b) / 9007199254740992;
  };
  const nextInt = (n) => {
    if (!Number.isInteger(n) || n < 1 || n > 2 ** 32) fail('invalid-input', 'nextInt: n muss eine ganze Zahl in [1, 2^32] sein');
    if (n === 2 ** 32) return nextUint32();
    const limit = 2 ** 32 - (2 ** 32 % n);
    let x = nextUint32();
    while (x >= limit) x = nextUint32();
    return x % n;
  };
  return { nextUint32, nextFloat, nextInt };
}

/**
 * Bootstrap-Indizes: `replicates` Stichproben mit Zurücklegen, je `sampleSize` (Default n) Indizes in [0, n).
 * Ein einziger RNG-Strom, Reihenfolge fest: Stichprobe 0 (Position 0…), dann Stichprobe 1 usw. Das Ergebnis hängt nur von
 * (n, replicates, seed, sampleSize) ab — nicht von den Daten und nicht vom Erfolg einzelner Refits.
 */
export function bootstrapSampleIndices(n, replicates, seed, sampleSize = n) {
  if (!Number.isInteger(n) || n < 1) fail('invalid-input', 'bootstrapSampleIndices: n muss eine ganze Zahl ≥ 1 sein');
  if (!Number.isInteger(replicates) || replicates < 1) fail('invalid-input', 'bootstrapSampleIndices: replicates muss eine ganze Zahl ≥ 1 sein');
  if (!Number.isInteger(sampleSize) || sampleSize < 1) fail('invalid-input', 'bootstrapSampleIndices: sampleSize muss eine ganze Zahl ≥ 1 sein');
  const rng = createRng(seed);
  return Array.from({ length: replicates }, () => Array.from({ length: sampleSize }, () => rng.nextInt(n)));
}

/** Kleinste zulässige Zahl von Bootstrap-Wiederholungen (darunter sind Perzentilintervalle nicht sinnvoll). */
export const MIN_BOOTSTRAP_REPLICATES = 20;

/**
 * Generischer, seeded Bootstrap über Datenzeilen MIT Refit. Jede Wiederholung zieht n Zeilen mit Zurücklegen
 * (Indizes aus `bootstrapSampleIndices`) und ruft `refit(sample, info)` auf; das Ergebnis ist ein Vektor endlicher Zahlen
 * (z. B. Koeffizienten). Zusätzlich wird `refit(data)` einmal auf den Originaldaten aufgerufen (`original`).
 * Intervall: Perzentilintervall der Wiederholungsschätzungen je Komponente (Quantil Typ 7 bei (1 − level)/2 und 1 − (1 − level)/2;
 * Standard level = 0.90 → 5 %- und 95 %-Quantil). Kein Bias-Korrektur-Verfahren.
 *
 * REIHENFOLGE: Die Stichproben werden über Positionen gezogen. Die Reihenfolge von `data` ist Teil der Eingabe: dieselben Daten
 * in anderer Reihenfolge ergeben andere Stichproben. Wer reihenfolgeunabhängige Ergebnisse braucht, übergibt `data` in einer
 * kanonischen (z. B. sortierten) Reihenfolge. `data` wird nicht verändert; `refit` bekommt jeweils ein neues Array.
 *
 * Fehlgeschlagene Refits (NumericError, `null`/`undefined` oder nicht endliche Werte) werden gezählt und übersprungen; übersteigt
 * ihr Anteil `maxFailedFraction` (Default 0.1 — TECHNISCHE Schutzgrenze, keine fachliche Vorgabe; Aufrufer können sie frei setzen), wirft die Funktion NumericError('bootstrap-failed'). Andere Fehler werden nicht
 * verschluckt. Der Refit auf den Originaldaten muss gelingen.
 *
 * @param {object} args
 * @param {any[]} args.data          mindestens 2 Zeilen
 * @param {(sample:any[], info:{replicate:number, indices:number[]}) => number[]} args.refit
 * @param {number} args.replicates   ganze Zahl ≥ MIN_BOOTSTRAP_REPLICATES (20)
 * @param {number} args.seed         siehe createRng
 * @param {number} [args.level]      Konfidenzniveau in (0, 1), Default 0.90
 * @param {number} [args.maxFailedFraction] in [0, 1), Default 0.1 (technische Schutzgrenze, überschreibbar; keine M1-Fachentscheidung)
 * @returns {{level:number, seed:number, replicates:number, failedReplicates:number, original:number[],
 *   estimates:number[][], intervals:{lower:number, upper:number}[]}} `estimates` = erfolgreiche Wiederholungen (in Reihenfolge)
 */
export function seededBootstrap({ data, refit, replicates, seed, level = 0.9, maxFailedFraction = 0.1 } = {}) {
  if (!Array.isArray(data) || data.length < 2) fail('invalid-input', 'seededBootstrap: data muss mindestens 2 Zeilen enthalten');
  if (typeof refit !== 'function') fail('invalid-input', 'seededBootstrap: refit muss eine Funktion sein');
  if (!Number.isInteger(replicates) || replicates < MIN_BOOTSTRAP_REPLICATES) fail('invalid-input', `seededBootstrap: replicates muss eine ganze Zahl ≥ ${MIN_BOOTSTRAP_REPLICATES} sein`);
  if (!isFiniteNumber(level) || !(level > 0 && level < 1)) fail('invalid-input', 'seededBootstrap: level muss in (0, 1) liegen');
  if (!isFiniteNumber(maxFailedFraction) || maxFailedFraction < 0 || maxFailedFraction >= 1) fail('invalid-input', 'seededBootstrap: maxFailedFraction muss in [0, 1) liegen');
  const validVector = (v) => Array.isArray(v) && v.length > 0 && v.every(isFiniteNumber);

  const original = refit([...data], { replicate: -1, indices: data.map((_, i) => i) });
  if (!validVector(original)) fail('invalid-input', 'seededBootstrap: refit auf den Originaldaten muss einen nicht leeren Vektor endlicher Zahlen liefern');
  const indexSets = bootstrapSampleIndices(data.length, replicates, seed);
  const estimates = [];
  let failed = 0;
  for (let r = 0; r < replicates; r++) {
    const indices = indexSets[r];
    let est;
    try {
      est = refit(indices.map((i) => data[i]), { replicate: r, indices: [...indices] });
    } catch (e) {
      if (e instanceof NumericError) { failed++; continue; }
      throw e;
    }
    if (est === null || est === undefined) { failed++; continue; }
    if (!Array.isArray(est) || est.length !== original.length) fail('invalid-input', 'seededBootstrap: refit muss immer einen Vektor derselben Länge liefern');
    if (!est.every(isFiniteNumber)) { failed++; continue; }
    estimates.push([...est]);
  }
  if (failed / replicates > maxFailedFraction || estimates.length === 0) fail('bootstrap-failed', `seededBootstrap: ${failed} von ${replicates} Refits fehlgeschlagen (erlaubt: Anteil ≤ ${maxFailedFraction})`);
  const alpha = (1 - level) / 2;
  const intervals = original.map((_, j) => {
    const col = estimates.map((e) => e[j]);
    return { lower: quantile(col, alpha), upper: quantile(col, 1 - alpha) };
  });
  return { level, seed, replicates, failedReplicates: failed, original: [...original], estimates, intervals };
}

// ─────────────────────────────────────────────────────────────────────────
// 7. Zeitlich geordnete Splits (generisch)
// ─────────────────────────────────────────────────────────────────────────

/**
 * Rollierender Ursprung über Gruppen (z. B. Zeitabschnitte): erzeugt Train/Test-Aufteilungen, bei denen die Testgruppen
 * IMMER nach den Traingruppen liegen (kein Zukunftsleck). Keine konkrete Validierungsstrategie, nur die Aufteilung.
 * `groups[i]` ist das Gruppenlabel der i-ten Beobachtung; die Beobachtungen müssen chronologisch geordnet sein und jede
 * Gruppe muss zusammenhängend vorkommen (sonst NumericError). Split k trainiert auf den ersten `minTrainGroups + k·step`
 * Gruppen und testet auf den nächsten `testGroups` Gruppen. Sind es zu wenige Gruppen, ist das Ergebnis [].
 * @param {(string|number)[]} groups
 * @param {{minTrainGroups?:number, testGroups?:number, step?:number}} [options] Defaults 1, 1, testGroups
 * @returns {{trainGroups:(string|number)[], testGroups:(string|number)[], trainIndices:number[], testIndices:number[]}[]}
 */
export function rollingOriginSplits(groups, { minTrainGroups = 1, testGroups = 1, step } = {}) {
  if (!Array.isArray(groups) || groups.length === 0) fail('invalid-input', 'rollingOriginSplits: nicht leeres groups-Array erwartet');
  const stepSize = step === undefined ? testGroups : step;
  for (const [name, v] of [['minTrainGroups', minTrainGroups], ['testGroups', testGroups], ['step', stepSize]]) {
    if (!Number.isInteger(v) || v < 1) fail('invalid-input', `rollingOriginSplits: ${name} muss eine ganze Zahl ≥ 1 sein`);
  }
  const order = [];
  const starts = new Map();
  groups.forEach((g, i) => {
    if (order.length === 0 || order[order.length - 1] !== g) {
      if (starts.has(g)) fail('invalid-input', `rollingOriginSplits: Gruppe ${JSON.stringify(g)} kommt nicht zusammenhängend vor`);
      starts.set(g, i);
      order.push(g);
    }
  });
  const startOf = (gi) => (gi >= order.length ? groups.length : starts.get(order[gi]));
  const splits = [];
  for (let gi = minTrainGroups; gi + testGroups <= order.length; gi += stepSize) {
    const trainEnd = startOf(gi);
    const testEnd = startOf(gi + testGroups);
    splits.push({
      trainGroups: order.slice(0, gi),
      testGroups: order.slice(gi, gi + testGroups),
      trainIndices: Array.from({ length: trainEnd }, (_, i) => i),
      testIndices: Array.from({ length: testEnd - trainEnd }, (_, i) => trainEnd + i),
    });
  }
  return splits;
}

// ─────────────────────────────────────────────────────────────────────────
// 8. Ausgabe
// ─────────────────────────────────────────────────────────────────────────

/**
 * Rundet alle Zahlen einer (verschachtelten) Struktur auf `decimals` Nachkommastellen (Default 8) — nur für die
 * Serialisierungs-/Ausgabegrenze, nicht für Zwischenrechnungen. Gibt eine neue Struktur zurück (Eingabe bleibt unverändert);
 * Arrays und einfache Objekte werden rekursiv behandelt, andere Werte unverändert übernommen. Nicht endliche Zahlen
 * (NaN, ±Infinity) sind ein Fehler ('non-finite'), −0 wird zu 0.
 */
export function roundOutput(value, decimals = 8) {
  if (!Number.isInteger(decimals) || decimals < 0 || decimals > 15) fail('invalid-input', 'roundOutput: decimals muss eine ganze Zahl in [0, 15] sein');
  if (typeof value === 'number') {
    if (!Number.isFinite(value)) fail('non-finite', 'roundOutput: nicht endliche Zahl');
    const r = Number(value.toFixed(decimals));
    return r === 0 ? 0 : r;
  }
  if (Array.isArray(value)) return value.map((v) => roundOutput(v, decimals));
  if (value !== null && typeof value === 'object') {
    const out = {};
    for (const key of Object.keys(value)) out[key] = roundOutput(value[key], decimals);
    return out;
  }
  return value;
}

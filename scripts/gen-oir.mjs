// Generates api/_tests/oir-1.ts … oir-110.ts and api/_tests/index.ts at a very hard (9.5–10/10) level:
// 40 questions in 25 minutes (real OIR pace), with bank-exam "mains" puzzles — mixed-facing seating,
// coded inequalities, "only a few" syllogisms, number matrices, painted cuboids, long relation chains.
//   node scripts/gen-oir.mjs
// Deterministic (seeded per test). Every computable question is solved in code — seating, code-language and
// syllogism answers are found by exhaustive search, dice by enumerating all pairings, cubes by counting every
// small cube — so answers are correct by construction. Verbal items come from scripts/oir-bank.mjs.
// Tests 1–15 go live immediately; 16–110 release five at a time every Sunday 00:00 IST.
import fs from "node:fs";
import * as bank from "./oir-bank.mjs";

const DIR = new URL("../api/_tests/", import.meta.url);
const FIRST = 1, LAST = 110, LIVE_UNTIL = 15, PER_WEEK = 5;
const FIRST_SUNDAY = "2026-09-27";

// ---------- helpers ----------
let rnd;
const seed = (a) => { rnd = () => { a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; };
const ri = (a, b) => a + Math.floor(rnd() * (b - a + 1));
const pick = (a) => a[Math.floor(rnd() * a.length)];
const shuffle = (a) => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const sample = (a, n) => shuffle(a).slice(0, n);
const AZ = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const ch = (p) => AZ[p - 1];
const pos = (c) => AZ.indexOf(c) + 1;
const wrap = (p) => ((((p - 1) % 26) + 26) % 26) + 1;
const ord = (n) => n + (n % 100 >= 11 && n % 100 <= 13 ? "th" : ["th", "st", "nd", "rd"][n % 10] || "th");
const list = (a) => a.join(", ");
const gcd = (a, b) => (b ? gcd(b, a % b) : Math.abs(a));
const lcm = (a, b) => (a / gcd(a, b)) * b;
const mixed = (num, den) => { const w = Math.floor(num / den), r = num % den; if (!r) return `${w}`; const g = gcd(r, den); return `${w ? w + " " : ""}${r / g}/${den / g}`; };
const title = (w) => w[0] + w.slice(1).toLowerCase();
const DAY = 86400000;
const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const fmtDate = (d) => `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
const bad = (s) => /undefined|NaN|Infinity/.test(String(s));

function mc(q, correct, wrongs, explanation) {
  const opts = [String(correct)];
  if (bad(opts[0]) || bad(q) || bad(explanation)) return null;
  for (const w of wrongs) { const s = String(w); if (!opts.includes(s) && !bad(s)) opts.push(s); if (opts.length === 4) break; }
  if (opts.length < 4) return null;
  const options = shuffle(opts);
  return { q, options, answer: options.indexOf(String(correct)), explanation };
}
const nearNums = (ans, extra = [], step = 1) => [...extra, ...shuffle([ans + step, ans - step, ans + 2 * step, ans - 2 * step, ans + 3 * step, ans - 3 * step])].filter((x) => x !== ans && Number.isFinite(x) && (ans < 0 || x >= 0));
function permutations(arr) { if (arr.length <= 1) return [arr.slice()]; const out = []; arr.forEach((x, i) => { for (const p of permutations([...arr.slice(0, i), ...arr.slice(i + 1)])) out.push([x, ...p]); }); return out; }

// ================= NUMBER SERIES (hard) =================
const PRIMES = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149];
const digitSum = (n) => String(n).split("").reduce((a, b) => a + +b, 0);
const digitProd = (n) => String(n).split("").reduce((a, b) => a * +b, 1);
// Each returns { seq, rule, calc (how the last term follows), extra (plausible wrong answers for the last term) }.
const SERIES = {
  mulAddInc() {
    const a = pick([2, 3]), k0 = ri(1, 4), dir = pick([1, -1]), s = ri(3, 12);
    const seq = [s]; for (let i = 0; i < 5; i++) seq.push(seq.at(-1) * a + dir * (k0 + i));
    if (seq.some((x) => x <= 0) || seq.at(-1) > 30000) return null;
    const p = seq.at(-2), k = k0 + 4, op = dir > 0 ? "+" : "−";
    return { seq, rule: `each term is multiplied by ${a} and then ${op} ${k0}, ${op} ${k0 + 1}, ${op} ${k0 + 2}, … (the adjustment grows by 1 each step)`, calc: `${p} × ${a} ${op} ${k}`, extra: [p * a + dir * (k - 1), p * a + dir * (k + 1), p * a] };
  },
  mulInc() {
    const v = pick(["plus", "minus", "none"]), m0 = v === "minus" ? 2 : ri(1, 3), s = ri(1, 14);
    const adj = (m) => (v === "plus" ? m : v === "minus" ? -(m - 1) : 0);
    const seq = [s]; for (let i = 0; i < 5; i++) { const m = m0 + i; seq.push(seq.at(-1) * m + adj(m)); }
    if (seq.some((x) => x <= 0) || seq.at(-1) > 60000) return null;
    const m = m0 + 4, p = seq.at(-2);
    const d = v === "plus" ? `×${m0} + ${m0}, ×${m0 + 1} + ${m0 + 1}, ×${m0 + 2} + ${m0 + 2}, …` : v === "minus" ? `×${m0} − ${m0 - 1}, ×${m0 + 1} − ${m0}, ×${m0 + 2} − ${m0 + 1}, …` : `×${m0}, ×${m0 + 1}, ×${m0 + 2}, …`;
    return { seq, rule: `the steps are ${d}`, calc: `${p} × ${m}${adj(m) ? (adj(m) > 0 ? ` + ${adj(m)}` : ` − ${-adj(m)}`) : ""}`, extra: [p * (m - 1) + adj(m - 1), p * (m + 1) + adj(m + 1), p * m + adj(m) + 1] };
  },
  diffPattern() {
    const kind = pick(["sq", "cube", "prime", "tri", "fib"]);
    let diffs, name;
    if (kind === "sq") { const n0 = ri(2, 7); diffs = [0, 1, 2, 3, 4].map((i) => (n0 + i) ** 2); name = "consecutive perfect squares"; }
    else if (kind === "cube") { const n0 = ri(1, 3); diffs = [0, 1, 2, 3, 4].map((i) => (n0 + i) ** 3); name = "consecutive cubes"; }
    else if (kind === "prime") { const i0 = ri(1, 10); diffs = PRIMES.slice(i0, i0 + 5); name = "consecutive prime numbers"; }
    else if (kind === "tri") { const n0 = ri(2, 6); diffs = [0, 1, 2, 3, 4].map((i) => ((n0 + i) * (n0 + i + 1)) / 2); name = "triangular numbers"; }
    else { const a = ri(1, 4), b = ri(a + 1, 7); diffs = [a, b]; while (diffs.length < 5) diffs.push(diffs.at(-1) + diffs.at(-2)); name = "a Fibonacci-type sequence (each difference is the sum of the previous two)"; }
    const down = kind !== "cube" && rnd() < 0.3, total = diffs.reduce((x, y) => x + y);
    const seq = [down ? ri(total + 5, total + 150) : ri(1, 40)];
    for (const d of diffs) seq.push(seq.at(-1) + (down ? -d : d));
    const p = seq.at(-2), last = diffs.at(-1), sg = down ? -1 : 1;
    return { seq, rule: `the differences (${list(diffs)}) are ${name}`, calc: `${p} ${down ? "−" : "+"} ${last}`, extra: [p + sg * (2 * diffs[3] - diffs[2]), p + sg * (last + 1), p + sg * (last - 1)] };
  },
  secondDiff() {
    const d0 = ri(1, 6), dd0 = ri(1, 3), r = pick([2, 3]), s = ri(1, 20);
    const dd = [0, 1, 2, 3].map((i) => dd0 * r ** i), diffs = [d0]; dd.forEach((x) => diffs.push(diffs.at(-1) + x));
    const seq = [s]; diffs.forEach((d) => seq.push(seq.at(-1) + d));
    const p = seq.at(-2);
    return { seq, rule: `the differences are ${list(diffs)}, and the gaps between those differences (${list(dd)}) are each ×${r}`, calc: `${p} + ${diffs.at(-1)}`, extra: [p + diffs[3] + dd[2], p + diffs.at(-1) * 2 - diffs[3] - 1, p + diffs.at(-1) + dd0] };
  },
  altGrow() {
    const start = ri(1, 15), k0 = ri(1, 3), mulFirst = rnd() < 0.5;
    const ops = [0, 1, 2, 3, 4, 5].map((i) => ({ k: k0 + Math.floor(i / 2) + (mulFirst ? 1 : 0), mul: (i % 2 === 0) === mulFirst }));
    const seq = [start]; for (const o of ops) seq.push(o.mul ? seq.at(-1) * o.k : seq.at(-1) + o.k);
    if (seq.at(-1) > 50000) return null;
    const o = ops.at(-1), p = seq.at(-2), names = ops.slice(0, 4).map((x) => `${x.mul ? "×" : "+"}${x.k}`);
    return { seq, rule: `the operations alternate between multiplying and adding, with the number growing every two steps: ${list(names)}, …`, calc: `${p} ${o.mul ? "×" : "+"} ${o.k}`, extra: [o.mul ? p + o.k : p * o.k, o.mul ? p * (o.k + 1) : p + o.k + 1, o.mul ? p * (o.k - 1) : p + o.k - 1] };
  },
  interleaved() {
    const r = pick([2, 3]), a0 = ri(1, 5), sq = rnd() < 0.5, n0 = ri(2, 6), b0 = ri(20, 60), db = pick([-7, -5, -4, -3, 3, 4, 6]);
    const A = [0, 1, 2, 3].map((i) => a0 * r ** i), B = [0, 1, 2, 3].map((i) => (sq ? (n0 + i) ** 2 : b0 + i * db));
    const seq = [A[0], B[0], A[1], B[1], A[2], B[2], A[3], B[3]];
    if (seq.some((x) => x <= 0)) return null;
    const bRule = sq ? `the squares ${B.slice(0, 3).join(", ")}, …` : `${B.slice(0, 3).join(", ")}, … (${db > 0 ? "+" : ""}${db} each time)`;
    return { seq, rule: `two series alternate: ${A.slice(0, 3).join(", ")}, … (×${r} each time) and ${bRule}`, calc: sq ? `${n0 + 3}²` : `${B[2]} ${db > 0 ? "+" : "−"} ${Math.abs(db)}`, extra: [A[3] * r, B[2] + 2 * db, sq ? (n0 + 4) ** 2 : B[3] + 1] };
  },
  powerMix() {
    const k = pick(["cube+sq", "cube-sq", "altSqCube", "sqPlusNext", "nn", "cubeMinus2n"]);
    const n0 = ri(1, 9), ns = [0, 1, 2, 3, 4, 5].map((i) => n0 + i);
    if (k === "altSqCube") {
      const seq = ns.map((n, i) => (i % 2 ? n ** 3 : n ** 2)), n = ns.at(-1);
      return { seq, rule: `the terms are alternately squares and cubes of consecutive numbers (${ns[0]}², ${ns[1]}³, ${ns[2]}², …)`, calc: `${n}³`, extra: [n * n, (n + 1) ** 2, n ** 3 + n] };
    }
    const F = { "cube+sq": [(n) => n ** 3 + n ** 2, (n) => `${n}³ + ${n}²`, "n³ + n²"], "cube-sq": [(n) => n ** 3 - n ** 2, (n) => `${n}³ − ${n}²`, "n³ − n²"], sqPlusNext: [(n) => n * n + (n + 1) ** 2, (n) => `${n}² + ${n + 1}²`, "n² + (n + 1)²"], nn: [(n) => n ** n, (n) => `${n}^${n}`, "nⁿ"], cubeMinus2n: [(n) => n ** 3 - 2 * n, (n) => `${n}³ − 2×${n}`, "n³ − 2n"] }[k];
    if (k === "nn" && n0 > 2) return null;
    const [f, s, d] = F, seq = (k === "nn" ? ns.slice(0, 5) : ns).map(f), n = k === "nn" ? ns[4] : ns.at(-1);
    if (seq.at(-1) > 60000 || seq.some((x) => x < 0)) return null;
    return { seq, rule: `the terms follow ${d} for n = ${ns[0]}, ${ns[1]}, ${ns[2]}, …`, calc: s(n), extra: [f(n) + n, f(n) - 1, f(n + 1)] };
  },
  productChain() {
    const kind = pick(["prod", "prodPlus", "trib"]);
    const seq = kind === "trib" ? [ri(1, 3), ri(1, 4), ri(2, 6)] : [ri(1, 3), ri(2, 4)];
    const len = kind === "trib" ? 8 : 6;
    while (seq.length < len) { const [a, b, c] = [seq.at(-1), seq.at(-2), seq.at(-3)]; seq.push(kind === "trib" ? a + b + c : kind === "prod" ? a * b : a * b + 1); }
    if (seq.at(-1) > 100000 || seq.at(-1) < 20) return null;
    const [a, b, c] = [seq.at(-2), seq.at(-3), seq.at(-4)];
    const rule = kind === "trib" ? "each term is the sum of the previous three terms" : kind === "prod" ? "each term is the product of the previous two terms" : "each term is the product of the previous two terms plus 1";
    const calc = kind === "trib" ? `${c} + ${b} + ${a}` : `${b} × ${a}${kind === "prodPlus" ? " + 1" : ""}`;
    return { seq, rule, calc, extra: kind === "trib" ? [a + b, a + b + c + 1, 2 * a] : [a * b + (kind === "prod" ? 1 : -1), a + b, a * (b + 1)] };
  },
  digits() {
    const prod = rnd() < 0.4, s = ri(12, 89);
    const f = (x) => x + (prod ? digitProd(x) : digitSum(x));
    const seq = [s]; while (seq.length < 6) seq.push(f(seq.at(-1)));
    if (prod && seq.some((x) => String(x).includes("0"))) return null;
    const p = seq.at(-2), d = prod ? digitProd(p) : digitSum(p);
    return { seq, rule: `each term is the previous term plus the ${prod ? "product" : "sum"} of its digits`, calc: `${p} + (${String(p).split("").join(prod ? " × " : " + ")}) = ${p} + ${d}`, extra: [p + d + 1, p + (prod ? digitSum(p) : digitProd(p) || d + 2), p + d - 1] };
  },
  primeProduct() {
    const i0 = ri(0, 22), ps = PRIMES.slice(i0, i0 + 7), k = pick(["prod", "sqMinus", "sumSq"]);
    const f = { prod: (i) => ps[i] * ps[i + 1], sqMinus: (i) => ps[i] ** 2 - ps[i], sumSq: (i) => ps[i] ** 2 + 1 }[k];
    const seq = [0, 1, 2, 3, 4, 5].map(f), p = ps[5], q = ps[6];
    const rule = { prod: "each term is the product of two consecutive primes", sqMinus: "each term is p² − p for consecutive primes p", sumSq: "each term is p² + 1 for consecutive primes p" }[k];
    const calc = { prod: `${p} × ${q}`, sqMinus: `${p}² − ${p}`, sumSq: `${p}² + 1` }[k];
    return { seq, rule, calc, extra: [seq.at(-1) + 2, k === "prod" ? p * (p + 2) : (p + 1) ** 2 - (p + 1), seq.at(-1) - 2] };
  },
  recur2() {
    const p = pick([2, 3]), q = pick([1, 2, -1]), seq = [ri(1, 5), ri(2, 7)];
    while (seq.length < 7) seq.push(p * seq.at(-1) + q * seq.at(-2));
    if (seq.some((x) => x <= 0) || seq.at(-1) > 60000 || seq[1] === seq[0]) return null;
    const [a, b] = [seq.at(-2), seq.at(-3)], qs = q === 1 ? "+" : q === -1 ? "−" : "+ 2 ×";
    return { seq, rule: `each term is ${p} × the previous term ${qs} the term before that`, calc: `${p} × ${a} ${qs} ${b}`, extra: [p * a, p * a + q * b + (q > 0 ? -1 : 1), (p + 1) * a - b] };
  },
  mulDivAlt() {
    const m = pick([3, 5]), d = 2, s = ri(2, 300);
    const seq = [s]; for (let i = 0; i < 6; i++) seq.push(i % 2 ? seq.at(-1) / d + (i + 1) / 2 : seq.at(-1) * m);
    if (seq.some((x) => !Number.isInteger(x) || x <= 0) || seq.at(-1) > 60000) return null;
    const p = seq.at(-2);
    return { seq, rule: `the steps alternate between ×${m} and ÷${d}, and each ÷${d} step adds one more than the last (÷${d} + 1, ÷${d} + 2, ÷${d} + 3)`, calc: `${p} ÷ ${d} + 3`, extra: [p / d + 2, p / d + 4, p * m] };
  },
  sqPlusPrime() {
    const n0 = ri(2, 8), i0 = ri(0, 6), ns = [0, 1, 2, 3, 4, 5].map((i) => n0 + i), ps = PRIMES.slice(i0, i0 + 6);
    const seq = ns.map((n, i) => n * n + ps[i]), n = ns.at(-1), p = ps.at(-1);
    return { seq, rule: `each term is n² plus the matching prime (${ns[0]}² + ${ps[0]}, ${ns[1]}² + ${ps[1]}, ${ns[2]}² + ${ps[2]}, …)`, calc: `${n}² + ${p}`, extra: [n * n + p + 2, n * n + ps.at(-2), n * n + p - 1] };
  },
};
const MISSABLE = ["mulAddInc", "mulInc", "diffPattern", "secondDiff", "powerMix", "primeProduct", "digits", "recur2", "sqPlusPrime"];

// ================= NUMBER MATRIX (3×3, one rule for every row or column) =================
const MATRIX_RULES = [
  { f: (a, b) => a * b - (a + b), d: "a × b − (a + b)" },
  { f: (a, b) => a * b + (a + b), d: "a × b + (a + b)" },
  { f: (a, b) => (a + b) ** 2, d: "(a + b)²" },
  { f: (a, b) => a * a + b * b, d: "a² + b²" },
  { f: (a, b) => a * a - b * b, d: "a² − b²" },
  { f: (a, b) => a * a + b, d: "a² + b" },
  { f: (a, b) => (a - b) * (a + b + 1), d: "(a − b) × (a + b + 1)" },
  { f: (a, b) => a ** 3 - b, d: "a³ − b" },
  { f: (a, b) => a * b * 2 - b, d: "2ab − b" },
  { f: (a, b) => (a + b) * (a - 1), d: "(a + b) × (a − 1)" },
];
function numberMatrix() {
  const r = pick(MATRIX_RULES), cols = rnd() < 0.4, rows = [];
  for (let k = 0; k < 3; k++) { const a = ri(3, 12), b = ri(2, a - 1), c = r.f(a, b); if (c <= 0 || c > 2000) return null; rows.push([a, b, c]); }
  if (MATRIX_RULES.some((o) => o !== r && rows.slice(0, 2).every(([a, b, c]) => o.f(a, b) === c))) return null;
  const hide = pick([0, 1, 2]), ans = rows[2][hide];
  if (hide !== 2) { // a hidden input must be the only value that fits
    const fits = [...Array(40).keys()].filter((v) => { const t = [...rows[2]]; t[hide] = v; return v > 0 && r.f(t[0], t[1]) === t[2]; });
    if (fits.length !== 1) return null;
  }
  const grid = cols ? [0, 1, 2].map((i) => rows.map((x) => x[i])) : rows;
  const shown = grid.map((row, i) => row.map((v, j) => ((cols ? j === 2 && i === hide : i === 2 && j === hide) ? "?" : v)));
  const line = cols ? "column" : "row", others = MATRIX_RULES.filter((o) => o !== r).map((o) => (hide === 2 ? o.f(rows[2][0], rows[2][1]) : ans + ri(1, 3)));
  return mc(`Find the missing number in the grid (rows separated by " | "): ${shown.map((row) => row.join("  ")).join(" | ")}`, ans, nearNums(ans, others), `In every ${line}, the third number = ${r.d}, where a and b are the first two numbers of that ${line}: ${rows.slice(0, 2).map(([a, b, c]) => `${a}, ${b} → ${c}`).join("; ")}. So the missing number is ${ans} (${rows[2].join(", ")}).`);
}

function seriesNext(fam) {
  const r = SERIES[fam](); if (!r) return null;
  const ans = r.seq.at(-1);
  return mc(`Find the next number: ${list(r.seq.slice(0, -1))}, ?`, ans, nearNums(ans, r.extra), `Here ${r.rule}. Next: ${r.calc} = ${ans}.`);
}
function seriesMissing(fam) {
  const r = SERIES[fam](); if (!r) return null;
  const h = ri(2, r.seq.length - 2), ans = r.seq[h];
  const shown = r.seq.map((x, i) => (i === h ? "?" : x));
  const avg = Math.round((r.seq[h - 1] + r.seq[h + 1]) / 2);
  return mc(`Find the missing number: ${list(shown)}`, ans, nearNums(ans, [avg, ans + 2].filter((x) => x !== r.seq[h - 1] && x !== r.seq[h + 1])), `Here ${r.rule}, so the missing term is ${ans}.`);
}
function seriesWrong(fam) {
  const r = SERIES[fam](); if (!r) return null;
  const seq = [...r.seq], j = ri(1, seq.length - 2), right = seq[j];
  seq[j] = right + pick([-3, -2, -1, 1, 2, 3, Math.round(right * 0.1) || 4]);
  if (seq[j] <= 0 || r.seq.includes(seq[j])) return null;
  const others = shuffle(seq.filter((_, i) => i !== j));
  return mc(`One number in this series is wrong. Find it: ${list(seq)}`, seq[j], others, `Here ${r.rule}. The term ${seq[j]} should be ${right}.`);
}

// ================= LETTER SERIES & CLUSTERS =================
function letterCluster() {
  const t = pick(["triple", "triple", "letnum", "pattern", "pattern"]);
  if (t === "triple") {
    const steps = [pick([2, 3, 4, 5]), pick([-3, -2, -1, 1, 2]), pick([-4, -3, 3, 4, 5])], starts = [ri(1, 10), ri(14, 26), ri(1, 26)];
    const g = [0, 1, 2, 3, 4].map((i) => steps.map((s, j) => ch(wrap(starts[j] + i * s))).join(""));
    if (new Set(g).size < 5) return null;
    const ans = g[4], tw = (k, d) => [...ans].map((c, i) => (i === k ? ch(wrap(pos(c) + d)) : c)).join("");
    const sg = (s) => (s > 0 ? `+${s}` : `${s}`);
    return mc(`Find the next group: ${list(g.slice(0, 4))}, ?`, ans, [tw(0, 1), tw(1, -1), tw(2, 1), tw(1, 1), tw(2, -1)], `Each position moves on its own: 1st letter ${sg(steps[0])}, 2nd letter ${sg(steps[1])}, 3rd letter ${sg(steps[2])} (wrapping round the alphabet), giving ${ans}.`);
  }
  if (t === "letnum") {
    const k = ri(2, 4), s = ri(1, 6), m = pick([2, 3]), n0 = ri(1, 4), back = ri(1, 3), e0 = ri(20, 26);
    const g = [0, 1, 2, 3, 4].map((i) => ch(wrap(s + i * k)) + n0 * m ** i + ch(wrap(e0 - i * back)));
    const ans = g[4], num = n0 * m ** 4, L1 = ch(wrap(s + 4 * k)), L2 = ch(wrap(e0 - 4 * back));
    return mc(`Find the next term: ${list(g.slice(0, 4))}, ?`, ans, [L1 + num * m + L2, L1 + num + ch(wrap(e0 - 3 * back)), ch(wrap(s + 4 * k + 1)) + num + L2, L1 + (num + m) + L2], `The first letter moves +${k}, the number is ×${m} each time and the last letter moves −${back}: next is ${ans}.`);
  }
  const L = ri(3, 5), unit = Array.from({ length: L }, () => pick(["a", "b", "c", "d"].slice(0, L === 3 ? 3 : 4))).join("");
  if (new Set(unit).size < 2) return null;
  const full = unit.repeat(Math.ceil(16 / L)).slice(0, ri(13, 16));
  const blanks = sample([...Array(full.length).keys()], 5).sort((a, b) => a - b);
  const shown = [...full].map((c, i) => (blanks.includes(i) ? "_" : c)).join("");
  const ans = blanks.map((i) => full[i]).join("");
  const periodic = (s) => { for (let p = 1; p <= 5; p++) if ([...s].every((c, i) => i < p || c === s[i - p])) return true; return false; };
  const fill = (w) => { let k = 0; return [...shown].map((c) => (c === "_" ? w[k++] : c)).join(""); };
  const wrongs = [];
  for (let tries = 0; tries < 60 && wrongs.length < 3; tries++) {
    const w = [...ans]; const i = ri(0, 4), j = ri(0, 4);
    if (rnd() < 0.5) [w[i], w[j]] = [w[j], w[i]]; else w[i] = pick(["a", "b", "c", "d"]);
    const s = w.join(""); if (s !== ans && !wrongs.includes(s) && !periodic(fill(s))) wrongs.push(s);
  }
  return mc(`Which set of letters, placed in the blanks in order, completes the series? ${shown}`, ans, wrongs, `The block "${unit}" repeats: ${full}. The blanks are ${[...ans].join(", ")}.`);
}

// ================= ANALOGIES / ODD ONE OUT =================
const NUMF = [
  { f: (n) => n * n + n + 1, s: (n) => `${n}² + ${n} + 1`, d: "n² + n + 1" },
  { f: (n) => n ** 3 - n * n, s: (n) => `${n}³ − ${n}²`, d: "n³ − n²" },
  { f: (n) => n ** 3 + n * n, s: (n) => `${n}³ + ${n}²`, d: "n³ + n²" },
  { f: (n) => 2 * n * n - 1, s: (n) => `2 × ${n}² − 1`, d: "2n² − 1" },
  { f: (n) => 2 * n * n + 1, s: (n) => `2 × ${n}² + 1`, d: "2n² + 1" },
  { f: (n) => 3 * n * n - 1, s: (n) => `3 × ${n}² − 1`, d: "3n² − 1" },
  { f: (n) => n * n - 2 * n, s: (n) => `${n}² − 2 × ${n}`, d: "n² − 2n" },
  { f: (n) => n * n + (n + 1) ** 2, s: (n) => `${n}² + ${n + 1}²`, d: "n² + (n + 1)²" },
  { f: (n) => n ** 3 + 2 * n, s: (n) => `${n}³ + 2 × ${n}`, d: "n³ + 2n" },
  { f: (n) => (n - 1) ** 3, s: (n) => `(${n} − 1)³`, d: "(n − 1)³" },
  { f: (n) => n * (n + 1) * 2, s: (n) => `2 × ${n} × ${n + 1}`, d: "2n(n + 1)" },
  { f: (n) => n ** 3 - 1, s: (n) => `${n}³ − 1`, d: "n³ − 1" },
  { f: (n) => n * n + 5, s: (n) => `${n}² + 5`, d: "n² + 5" },
];
const DIGF = [
  { f: (n) => digitProd(n), s: (n) => `${String(n).split("").join(" × ")}`, d: "the product of its digits" },
  { f: (n) => digitSum(n) ** 2, s: (n) => `(${String(n).split("").join(" + ")})²`, d: "the square of the sum of its digits" },
  { f: (n) => +String(n).split("").reverse().join("") * 2, s: (n) => `2 × ${String(n).split("").reverse().join("")}`, d: "twice the number with its digits reversed" },
  { f: (n) => String(n).split("").reduce((a, b) => a + b * b, 0), s: (n) => `${String(n).split("").map((d) => d + "²").join(" + ")}`, d: "the sum of the squares of its digits" },
];
function numberAnalogy() {
  const digit = rnd() < 0.35, fam = digit ? DIGF : NUMF, fn = pick(fam);
  const gen = () => (digit ? ri(21, 98) : ri(3, 13));
  const x = gen(), y = gen();
  if (x === y || (digit && (String(x).includes("0") || String(y).includes("0")))) return null;
  if (fam.some((g) => g !== fn && g.f(x) === fn.f(x))) return null;
  const ans = fn.f(y);
  if (rnd() < 0.5) return mc(`${x} : ${fn.f(x)} :: ${y} : ?`, ans, shuffle(fam.filter((g) => g !== fn)).map((g) => g.f(y)), `${x} → ${fn.s(x)} = ${fn.f(x)} (${fn.d}); likewise ${y} → ${fn.s(y)} = ${ans}.`);
  const zs = shuffle([...Array(digit ? 70 : 11).keys()].map((i) => i + (digit ? 23 : 3))).filter((z) => z !== x && z !== y && !String(z).includes("0"));
  const wr = [];
  for (const z of zs) { const g = pick(fam.filter((h) => h !== fn)); if (g.f(z) !== fn.f(z)) wr.push(`${z} : ${g.f(z)}`); if (wr.length === 3) break; }
  return mc(`Which pair has the same relationship as ${x} : ${fn.f(x)}?`, `${y} : ${ans}`, wr, `In ${x} : ${fn.f(x)}, the second number is ${fn.d} (${fn.s(x)}). Only ${y} : ${ans} follows this (${fn.s(y)} = ${ans}).`);
}

// Letter-string transforms shared by the letter analogy and coding questions.
const shift = (c, k) => ch(wrap(pos(c) + k));
const VOW = "AEIOU";
const TRANSFORMS = [
  ...[1, 2].map((d) => ({ f: (w) => [...w].map((c, i) => shift(c, d * (i + 1))).join(""), d: d === 1 ? "the 1st letter moves +1, the 2nd +2, the 3rd +3, and so on" : "the 1st letter moves +2, the 2nd +4, the 3rd +6, and so on" })),
  { f: (w) => [...w].map((c, i) => shift(c, -(i + 1))).join(""), d: "the 1st letter moves −1, the 2nd −2, the 3rd −3, and so on" },
  ...[1, 2, -1].map((k) => ({ f: (w) => [...w].reverse().map((c) => shift(c, k)).join(""), d: `the word is reversed and every letter moves ${k > 0 ? "+" : ""}${k}` })),
  { f: (w) => [...w].map((c) => ch(27 - pos(c))).reverse().join(""), d: "each letter is replaced by its opposite (A↔Z, B↔Y, …) and the result is reversed" },
  ...[2, 3].map((k) => ({ f: (w) => [...w].map((c, i) => shift(c, i % 2 ? -k : k)).join(""), d: `letters move alternately +${k} and −${k}` })),
  ...[1, -1].map((k) => ({ f: (w) => { const a = [...w]; for (let i = 0; i + 1 < a.length; i += 2) [a[i], a[i + 1]] = [a[i + 1], a[i]]; return a.map((c) => shift(c, k)).join(""); }, d: `each pair of adjacent letters is swapped and then every letter moves ${k > 0 ? "+" : ""}${k}` })),
  { f: (w) => { const h = Math.floor(w.length / 2); return [...w.slice(0, h)].reverse().join("") + [...w.slice(h)].reverse().join(""); }, d: "the first half and the second half of the word are each written in reverse" },
  { f: (w) => [...w].map((c) => shift(c, VOW.includes(c) ? 1 : -1)).join(""), d: "every vowel moves one letter forward and every consonant one letter back" },
  { f: (w) => [...w].map((c) => shift(c, w.length)).join(""), d: "every letter moves forward by the number of letters in the word" },
];
const WORDS = "CADET RIFLE PILOT MARCH BADGE SALUTE MEDAL HONOUR GUARD TROOP SHIELD SWORD ARROW ROCKET RADAR CANNON PATROL BORDER BUNKER JUNGLE DESERT RIVER OCEAN ISLAND FOREST PLANET CLOUD STORM THUNDER WINTER SUMMER SPRING AUTUMN CANDLE MIRROR WINDOW PENCIL BOTTLE TICKET MARKET SCHOOL DOCTOR FARMER SINGER DANCER PAINTER WRITER HUNTER SAILOR KNIGHT CASTLE PALACE TEMPLE BRIDGE TUNNEL TOWER ANCHOR COMPASS SIGNAL MISSION TARGET VICTORY PARADE UNIFORM HELMET JACKET BASKET CARPET BLANKET SILVER COPPER BRONZE MARBLE CRYSTAL TIGER EAGLE FALCON HORSE CAMEL RABBIT MONKEY PARROT LEMON ORANGE CHERRY POTATO TOMATO PEPPER SUGAR BUTTER CHEESE BREAD KNIFE PLATE GLASS FIELD GROUND STREET VILLAGE NATION PEOPLE FAMILY PLAYER CAPTAIN COACH TROPHY CRICKET HOCKEY TENNIS CHESS PUZZLE RIDDLE SECRET CIPHER LETTER NUMBER SYMBOL SCREEN CAMERA ENGINE WHEEL MOTOR GARDEN FLOWER BRAVE VALOUR STRIKE FLIGHT CORPS".split(" ");
function pickTransform(w1, w2) {
  const t = pick(TRANSFORMS), a = t.f(w1), b = t.f(w2);
  if (a === w1) return null;
  if (TRANSFORMS.some((u) => u !== t && u.f(w1) === a && u.f(w2) !== b)) return null; // the example must pin the rule down
  return t;
}
const tweak = (s) => { const j = ri(0, s.length - 1); return s.slice(0, j) + shift(s[j], pick([1, -1])) + s.slice(j + 1); };
function letterAnalogy() {
  const [w1, w2] = sample(WORDS.filter((w) => w.length <= 6), 2), t = pickTransform(w1, w2); if (!t) return null;
  const ans = t.f(w2), alt = pick(TRANSFORMS.filter((u) => u !== t)).f(w2);
  return mc(`${w1} : ${t.f(w1)} :: ${w2} : ?`, ans, [alt, tweak(ans), tweak(ans), tweak(alt)], `In the first pair ${t.d}. Applying the same to ${w2} gives ${ans}.`);
}
function coding() {
  const kind = pick(["encode", "encode", "decode", "numeric"]);
  if (kind === "numeric") {
    const RULES = [
      { f: (w) => [...w].reduce((a, c) => a + pos(c), 0) * w.length, d: "the sum of the letter positions multiplied by the number of letters" },
      { f: (w) => [...w].reduce((a, c) => a + pos(c), 0) + w.length ** 2, d: "the sum of the letter positions plus the square of the number of letters" },
      { f: (w) => [...w].reduce((a, c) => a + 27 - pos(c), 0) * 2, d: "twice the sum of the letters' positions in the reversed alphabet (A = 26 … Z = 1)" },
      { f: (w) => pos(w[0]) * pos(w.at(-1)) + w.length, d: "the product of the first and last letters' positions plus the number of letters" },
      { f: (w) => [...w].reduce((a, c) => a + pos(c), 0) - w.length, d: "the sum of the letter positions minus the number of letters" },
    ];
    const [a, b, c] = sample(WORDS, 3), r = pick(RULES);
    if (RULES.some((u) => u !== r && u.f(a) === r.f(a) && u.f(b) === r.f(b))) return null;
    const ans = r.f(c);
    return mc(`If ${a} is coded as ${r.f(a)} and ${b} as ${r.f(b)}, what is the code for ${c}?`, ans, nearNums(ans, RULES.filter((u) => u !== r).map((u) => u.f(c))), `Each code is ${r.d}. ${a}: ${r.f(a)}; ${b}: ${r.f(b)}; so ${c} = ${ans}.`);
  }
  const [w1, w2] = sample(WORDS, 2), t = pickTransform(w1, w2); if (!t) return null;
  if (kind === "encode") {
    const ans = t.f(w2), alt = pick(TRANSFORMS.filter((u) => u !== t)).f(w2);
    return mc(`In a certain code, ${w1} is written as ${t.f(w1)}. How is ${w2} written in that code?`, ans, [tweak(ans), alt, tweak(ans), tweak(tweak(ans))], `In this code ${t.d}. So ${w2} → ${ans}.`);
  }
  const code = t.f(w2), same = WORDS.filter((w) => w.length === w2.length && w !== w2 && w !== w1);
  if (same.length < 3) return null;
  return mc(`In a certain code, ${w1} is written as ${t.f(w1)}. Which word is written as ${code} in that code?`, w2, sample(same, 3), `In this code ${t.d}. Reversing the steps on ${code} gives ${w2}.`);
}

const GENERIC = /^Which (one|number|pair|letter group) does not belong with the others\?$|which of these equations is correct\?$/;
function oddNumber() {
  const t = pick(["prime", "middle", "eleven", "form", "digprod", "pair"]);
  let good, odd, expl;
  if (t === "prime") {
    good = sample([53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397], 3);
    odd = pick([91, 119, 133, 143, 161, 187, 203, 209, 221, 247, 253, 289, 299, 323, 341, 361, 377, 391]);
    const f = [...Array(odd).keys()].find((d) => d > 1 && odd % d === 0);
    expl = `${odd} = ${f} × ${odd / f}, so it is not prime; the others are prime numbers.`;
  } else if (t === "middle") {
    const mk = () => { const a = ri(1, 4), c = ri(1, 5); return a + c <= 9 ? a * 100 + (a + c) * 10 + c : null; };
    good = []; for (let g = 0; g < 50 && good.length < 3; g++) { const x = mk(); if (x && !good.includes(x)) good.push(x); }
    odd = pick(good) + pick([10, -10, 1, -1]);
    const [a, b, c] = String(odd).split("").map(Number); if (a + c === b || String(odd).length !== 3) return null;
    expl = `In ${list(good)}, the middle digit equals the sum of the other two; in ${odd} it does not.`;
  } else if (t === "eleven") {
    good = sample([...Array(80).keys()].map((i) => 11 * (i + 11)).filter((x) => x < 1000), 3); odd = pick(good) + pick([1, 2, 10, -10, 9]);
    if (odd % 11 === 0) return null;
    expl = `${list(good)} are all multiples of 11 (their alternating digit sums are divisible by 11); ${odd} is not.`;
  } else if (t === "form") {
    const fn = pick(NUMF), ns = sample([3, 4, 5, 6, 7, 8, 9, 10, 11], 3);
    good = ns.map(fn.f); odd = fn.f(pick(ns)) + pick([2, -2, 3, -3, 4]);
    if ([...Array(25).keys()].some((n) => fn.f(n) === odd)) return null;
    expl = `${list(ns.map((n) => `${fn.f(n)} = ${fn.s(n)}`))} all fit ${fn.d}; ${odd} does not.`;
  } else if (t === "digprod") {
    const P = pick([12, 18, 24, 36, 48]), pool = [...Array(900).keys()].map((i) => i + 100).filter((n) => digitProd(n) === P);
    good = sample(pool, 3); odd = pick(good) + pick([1, -1, 10]);
    if (digitProd(odd) === P || String(odd).length !== 3) return null;
    expl = `The digits of ${list(good)} each multiply to ${P}; the digits of ${odd} multiply to ${digitProd(odd)}.`;
  } else {
    const fn = pick(NUMF), other = pick(NUMF.filter((g) => g !== fn)), xs = sample([3, 4, 5, 6, 7, 8, 9], 4);
    if (fn.f(xs[3]) === other.f(xs[3])) return null;
    return mc("Which pair does not belong with the others?", `${xs[3]} – ${other.f(xs[3])}`, xs.slice(0, 3).map((x) => `${x} – ${fn.f(x)}`), `In the other pairs the second number is ${fn.d}, where n is the first (e.g. ${fn.s(xs[0])} = ${fn.f(xs[0])}); but ${fn.s(xs[3])} = ${fn.f(xs[3])}, not ${other.f(xs[3])}.`);
  }
  const all = [...good, odd];
  if (good.length < 3 || new Set(all).size < 4 || odd <= 0) return null;
  const odds = all.filter((n) => n % 2), evens = all.filter((n) => n % 2 === 0);
  const par = odds.length === 1 ? odds[0] : evens.length === 1 ? evens[0] : null;
  if (par !== null && par !== odd) return null;
  if (new Set(all.map((n) => String(n).length)).size > 1) return null;
  return mc("Which number does not belong with the others?", odd, good, expl);
}
function oddLetterGroup() {
  const t = pick(["gaps", "gaps", "opposite", "letnum"]);
  if (t === "gaps") {
    const g1 = ri(1, 5), g2 = ri(1, 5), ob = g2 + pick([1, -1]); if (ob < 1) return null;
    const mk = (s, a, b) => ch(s) + ch(s + a) + ch(s + a + b);
    const starts = sample([...Array(26 - g1 - Math.max(g2, ob)).keys()].map((i) => i + 1), 4);
    if (starts.length < 4) return null;
    const good = starts.slice(0, 3).map((s) => mk(s, g1, g2)), odd = mk(starts[3], g1, ob);
    return mc("Which letter group does not belong with the others?", odd, good, `In ${list(good)} the letters are +${g1} then +${g2} apart; in ${odd} they are +${g1} then +${ob}.`);
  }
  if (t === "opposite") {
    const ls = sample([...Array(13).keys()].map((i) => i + 1), 4);
    const good = ls.slice(0, 3).map((p) => ch(p) + ch(27 - p)), p = ls[3], q = 27 - p + pick([1, -1]);
    return mc("Which letter group does not belong with the others?", ch(p) + ch(q), good, `In ${list(good)} the two letters are opposites (positions adding up to 27); in ${ch(p)}${ch(q)} they add up to ${p + q}.`);
  }
  const f = pick([{ f: (p) => p * p, d: "the square of the letter's position" }, { f: (p) => 2 * p + 1, d: "twice the letter's position plus 1" }, { f: (p) => p * (p + 1), d: "the letter's position times the next number" }]);
  const ls = sample([...Array(20).keys()].map((i) => i + 3), 4), good = ls.slice(0, 3).map((p) => ch(p) + f.f(p)), p = ls[3], v = f.f(p) + pick([1, -1, 2]);
  return mc("Which letter group does not belong with the others?", ch(p) + v, good, `In ${list(good)} the number is ${f.d}; for ${ch(p)} it should be ${f.f(p)}, not ${v}.`);
}

// ================= CODE LANGUAGE (solved by brute force) =================
const ADJ = ["brave", "young", "strong", "bold", "loyal", "smart", "tall", "quick", "calm", "proud"];
const NOUN = ["cadets", "soldiers", "pilots", "sailors", "officers", "boys", "girls", "players", "leaders", "farmers"];
const VERB = ["march", "fight", "train", "fly", "sail", "run", "win", "lead", "work", "climb"];
const ADV = ["today", "hard", "daily", "fast", "well", "together", "early", "bravely", "quietly", "again"];
const SYL = ["ka", "pi", "lo", "ma", "ta", "ri", "su", "ne", "zo", "bu", "fe", "da", "mu", "si", "po", "ve", "ja", "ki", "ru", "ho", "ze", "li", "ga", "yo"];
const PERM8 = permutations([0, 1, 2, 3, 4, 5, 6, 7]);
function codeLanguage() {
  const words = [...sample(ADJ, 2), ...sample(NOUN, 2), ...sample(VERB, 2), ...sample(ADV, 2)];
  const sents = [0, 1, 2].map(() => [0, 1, 2, 3].map((c) => words[c * 2 + ri(0, 1)]));
  if (new Set(sents.flat()).size !== 8 || new Set(sents.map((s) => s.join())).size < 3) return null;
  const codes = sample(SYL, 8), code = Object.fromEntries(words.map((w, i) => [w, codes[i]]));
  const sig = (arr) => [...arr].sort().join();
  const target = sents.map((s) => sig(s.map((w) => code[w])));
  const cand = Object.fromEntries(words.map((w) => [w, new Set()]));
  for (const p of PERM8) {
    const m = Object.fromEntries(words.map((w, i) => [w, codes[p[i]]]));
    if (sents.every((s, k) => sig(s.map((w) => m[w])) === target[k])) words.forEach((w) => cand[w].add(m[w]));
  }
  const determined = words.filter((w) => cand[w].size === 1), undetermined = words.filter((w) => cand[w].size > 1);
  const wantCBD = undetermined.length > 0 && rnd() < 0.3;
  if (!wantCBD && !determined.length) return null;
  const w = wantCBD ? pick(undetermined) : pick(determined);
  const say = (s) => `'${s.join(" ")}' is written as '${shuffle(s.map((x) => code[x])).join(" ")}'`;
  const q = `In a code language, ${say(sents[0])}; ${say(sents[1])}; and ${say(sents[2])}. What is the code for '${w}'?`;
  const inIdx = sents.map((s, k) => (s.includes(w) ? k + 1 : 0)).filter(Boolean);
  if (wantCBD) {
    const partners = words.filter((x) => x !== w && sig([...cand[x]]) === sig([...cand[w]]));
    return mc(q, "Cannot be determined", [...cand[w], ...shuffle(codes.filter((c) => !cand[w].has(c)))], `'${w}' could be ${[...cand[w]].map((c) => `'${c}'`).join(" or ")}: it always appears together with ${partners.map((p) => `'${p}'`).join(", ") || "another word"}, so the sentences cannot separate their codes.`);
  }
  const sameSent = sents.filter((s) => s.includes(w)).flat().filter((x) => x !== w).map((x) => code[x]);
  return mc(q, code[w], [...shuffle(sameSent), "Cannot be determined"], `'${w}' appears in sentence${inIdx.length > 1 ? "s" : ""} ${inIdx.join(" and ")}. Matching the words shared between sentences to the codes shared between them leaves only one possibility: '${w}' = '${code[w]}'. (Everything the sentences fix: ${determined.map((x) => `${x} = ${code[x]}`).join(", ")}.)`);
}

// ================= OPERATORS =================
function evalExpr(nums, ops) {
  const t = [nums[0]]; ops.forEach((o, i) => t.push(o, nums[i + 1]));
  for (let i = 1; i < t.length;) if (t[i] === "×" || t[i] === "÷") { if (t[i] === "÷" && t[i + 1] === 0) return null; t.splice(i - 1, 3, t[i] === "×" ? t[i - 1] * t[i + 1] : t[i - 1] / t[i + 1]); } else i += 2;
  let v = t[0]; for (let i = 1; i < t.length; i += 2) v = t[i] === "+" ? v + t[i + 1] : v - t[i + 1];
  return v;
}
const exactInts = (nums, ops) => { const t = [nums[0]]; ops.forEach((o, i) => t.push(o, nums[i + 1])); for (let i = 1; i < t.length;) if (t[i] === "×" || t[i] === "÷") { if (t[i] === "÷" && t[i - 1] % t[i + 1]) return false; t.splice(i - 1, 3, t[i] === "×" ? t[i - 1] * t[i + 1] : t[i - 1] / t[i + 1]); } else i += 2; return true; };
function signSwap() {
  const shown = shuffle(["+", "−", "×", "÷"]), [s1, s2] = sample(shown, 2);
  const swapOps = (ops, a, b) => ops.map((o) => (o === a ? b : o === b ? a : o));
  const real = swapOps(shown, s1, s2), nums = [ri(4, 30), ri(2, 12), ri(2, 12), ri(2, 12), ri(2, 12)];
  const di = real.indexOf("÷"); nums[di] = nums[di + 1] * ri(2, 9);
  if (!exactInts(nums, real)) return null;
  const rhs = evalExpr(nums, real); if (!Number.isInteger(rhs) || rhs < 0) return null;
  const pairs = []; for (let i = 0; i < 4; i++) for (let j = i + 1; j < 4; j++) pairs.push([shown[i], shown[j]]);
  const ok = pairs.filter(([a, b]) => { const v = evalExpr(nums, swapOps(shown, a, b)); return v !== null && Math.abs(v - rhs) < 1e-9; });
  const orig = evalExpr(nums, shown);
  if (ok.length !== 1 || (orig !== null && Math.abs(orig - rhs) < 1e-9)) return null;
  const label = ([a, b]) => `${a} and ${b}`, show = (ops) => nums.map((n, i) => (i < 4 ? `${n} ${ops[i]} ` : `${n}`)).join("");
  return mc(`Which two signs must be interchanged to make this equation correct? ${show(shown)} = ${rhs}`, label(ok[0]), shuffle(pairs.filter((p) => p !== ok[0])).map(label), `Swapping ${s1} and ${s2} gives ${show(real)} = ${rhs} (solving × and ÷ before + and −). No other swap works.`);
}
function trueEquation() {
  const real = ["+", "−", "×", "÷"]; let perm; do perm = shuffle(real); while (perm.some((p, i) => p === real[i]));
  const meaning = Object.fromEntries(perm.map((s, i) => [s, real[i]])), inv = Object.fromEntries(Object.entries(meaning).map(([s, r]) => [r, s]));
  const eqs = [];
  for (let k = 0; k < 30 && eqs.length < 4; k++) {
    const ops = sample(real, 3), nums = [ri(4, 30), ri(2, 12), ri(2, 12), ri(2, 12)], di = ops.indexOf("÷");
    if (di >= 0) nums[di] = nums[di + 1] * ri(2, 8);
    if (!exactInts(nums, ops)) continue;
    const v = evalExpr(nums, ops); if (!Number.isInteger(v) || v < 0) continue;
    eqs.push({ nums, ops, v });
  }
  if (eqs.length < 4) return null;
  const show = (e, rhs, sym) => e.nums.map((n, i) => (i < 3 ? `${n} ${sym(e.ops[i])} ` : `${n}`)).join("") + ` = ${rhs}`;
  const right = show(eqs[0], eqs[0].v, (o) => inv[o]);
  const wrongs = eqs.slice(1).map((e) => show(e, e.v + pick([-2, -1, 1, 2, 3]), (o) => inv[o]));
  const mean = Object.entries(meaning).map(([s, r]) => `'${s}' means '${r}'`);
  return mc(`If ${mean.slice(0, 3).join(", ")} and ${mean[3]}, which of these equations is correct?`, right, wrongs, `Converting the symbols, ${right} becomes ${show(eqs[0], eqs[0].v, (o) => o)}, which is true (× and ÷ first); each of the others is off.`);
}

// ================= CODED INEQUALITIES =================
// Statements form a tree of chains, so the relation between two letters is fixed exactly by the path between them.
const INEQ = [[">", "is greater than"], ["<", "is smaller than"], ["≥", "is either greater than or equal to"], ["≤", "is either smaller than or equal to"], ["=", "is equal to"]];
const OUTS = { ">": [">"], "<": ["<"], "≥": [">", "="], "≤": ["<", "="], "=": ["="], none: [">", "=", "<"] };
function codedInequality() {
  const syms = sample(["@", "#", "$", "%", "&", "©", "★", "δ"], 5), code = Object.fromEntries(INEQ.map(([r], i) => [r, syms[i]]));
  const rest = sample(["A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "M", "N", "P", "R", "T", "W"], ri(6, 7)), used = [], chains = [];
  const rel = () => pick([">", ">", "<", "<", "≥", "≥", "≤", "≤", "="]);
  while (rest.length) {
    const fresh = rest.splice(0, used.length ? Math.min(rest.length, ri(1, 3)) : ri(3, 4)), at = ri(0, fresh.length);
    const members = used.length ? [...fresh.slice(0, at), pick(used), ...fresh.slice(at)] : fresh;
    chains.push(members.map((v, i) => [i ? rel() : null, v])); used.push(...fresh);
  }
  const adj = {}; const link = (u, r, v) => { (adj[u] ||= []).push([v, r]); (adj[v] ||= []).push([u, { ">": "<", "<": ">", "≥": "≤", "≤": "≥", "=": "=" }[r]]); };
  chains.forEach((c) => c.forEach(([r, v], i) => i && link(c[i - 1][1], r, v)));
  const path = (x, y) => { const prev = { [x]: null }, q = [x]; while (q.length) { const u = q.shift(); for (const [v, r] of adj[u]) if (!(v in prev)) { prev[v] = [u, r]; q.push(v); } } const out = []; for (let v = y; prev[v]; v = prev[v][0]) out.unshift([prev[v][1], v]); return out; };
  const combine = (p) => { const up = p.some(([r]) => r === "<" || r === "≤"), down = p.some(([r]) => r === ">" || r === "≥"); if (up && down) return "none"; if (!up && !down) return "="; const strict = p.some(([r]) => r === ">" || r === "<"); return down ? (strict ? ">" : "≥") : strict ? "<" : "≤"; };
  const want = ri(0, 4);
  for (let tries = 0; tries < 200; tries++) {
    const [x, y] = sample(used, 2), p = path(x, y); if (p.length < 2) continue;
    const S = OUTS[combine(p)], rels = INEQ.map(([r]) => r), fol = (r) => S.every((o) => OUTS[r].includes(o));
    let r1 = pick(rels), r2 = pick(rels), x2 = x, y2 = y, p2 = p;
    if (want === 2) { if (S.length < 2) continue; const pairs = [[">", "="], [">", "≤"], ["<", "="], ["<", "≥"], ["≥", "<"], ["≤", ">"]].filter(([a, b]) => S.every((o) => OUTS[a].includes(o) !== OUTS[b].includes(o))); if (!pairs.length) continue; [r1, r2] = shuffle(pick(pairs)); }
    else { [x2, y2] = sample(used, 2); p2 = path(x2, y2); if (p2.length < 2) continue; }
    const S2 = OUTS[combine(p2)], fol2 = S2.every((o) => OUTS[r2].includes(o)), f1 = fol(r1);
    const either = x2 === x && y2 === y && !f1 && !fol2 && S.every((o) => OUTS[r1].includes(o) !== OUTS[r2].includes(o));
    const ans = f1 && fol2 ? 4 : f1 ? 0 : fol2 ? 1 : either ? 2 : 3;
    if (ans !== want) continue;
    const showP = (a, pp) => a + pp.map(([r, v]) => ` ${r} ${v}`).join("");
    const why = (a, b, r, pp, f) => { const c = combine(pp); return `${a} ${r} ${b}: ${showP(a, pp)}, ${f ? "so it follows" : c === "none" ? "the signs point both ways, so there is no fixed relation — it does not follow" : `which gives only ${a} ${c} ${b} — it does not follow`}.`; };
    const shown = chains.map((c) => c.map(([r, v]) => (r ? ` ${code[r]} ${v}` : v)).join("")), decoded = chains.map((c) => c.map(([r, v]) => (r ? ` ${r} ${v}` : v)).join(""));
    return { q: `In the following question, ${INEQ.map(([r, m]) => `'P ${code[r]} Q' means 'P ${m} Q'`).join(", ")}. Statements: ${shown.join("; ")}. Conclusions: I. ${x} ${code[r1]} ${y}  II. ${x2} ${code[r2]} ${y2}`, options: OPTS5, answer: ans, explanation: `Decoded, the statements are ${decoded.join("; ")}. I. ${why(x, y, r1, p, f1)} II. ${why(x2, y2, r2, p2, fol2)}${either ? " Together, I and II cover every possibility and exactly one of them must be true, so either I or II follows." : ""}` };
  }
  return null;
}

// ================= BLOOD RELATIONS (kinship engine) =================
const KIN = { parent: ["father", "mother"], child: ["son", "daughter"], sibling: ["brother", "sister"], spouse: ["husband", "wife"] };
const kw = (r) => `${r.only ? "only " : ""}${KIN[r.rel][r.g === "M" ? 0 : 1]}`;
// Simplifies a chain read outward from a person of gender g0. Returns { seq, steps } or null if ambiguous.
function simplify(g0, seq0, allowIdentity, owner, self) {
  let seq = seq0.map((x) => ({ ...x }));
  const steps = [], phrase = (a) => (a.length ? `${owner} ${a.map(kw).join("'s ")}` : self);
  for (let i = 0; i + 1 < seq.length; i++) if (seq[i].only && seq[i + 1].rel === "sibling" && seq[i + 1].g === seq[i].g) return null; // an "only son" has no brother
  for (let guard = 0; guard < 20; guard++) {
    let fired = false;
    for (let i = 0; i + 1 < seq.length; i++) {
      const x = seq[i], y = seq[i + 1], pg = i ? seq[i - 1].g : g0, key = `${x.rel},${y.rel}`;
      let rep;
      if (key === "parent,child") rep = pg && y.g !== pg ? [{ rel: "sibling", g: y.g }] : pg && y.only ? [] : null;
      else if (key === "child,parent") rep = !pg ? null : y.g === pg ? [] : [{ rel: "spouse", g: y.g }];
      else if (key === "sibling,sibling") rep = pg && y.g !== pg ? [{ rel: "sibling", g: y.g }] : null;
      else if (key === "sibling,parent") rep = [{ rel: "parent", g: y.g }];
      else if (key === "parent,spouse") rep = [{ rel: "parent", g: y.g }];
      else if (key === "spouse,child") rep = [{ rel: "child", g: y.g }];
      else if (key === "child,sibling") rep = [{ rel: "child", g: y.g }];
      else if (key === "spouse,spouse") rep = pg && y.g === pg ? [] : null;
      else continue;
      if (rep === null) return null;
      if (!rep.length && !allowIdentity) return null;
      const after = [...seq.slice(0, i), ...rep];
      steps.push(`${phrase(seq.slice(0, i + 2))} = ${phrase(after)}`);
      seq = [...after, ...seq.slice(i + 2)]; fired = true; break;
    }
    if (!fired) return { seq, steps };
  }
  return null;
}
function kinName(seq) {
  if (!seq.length) return null;
  const key = seq.map((s) => s.rel).join(","), i = seq.at(-1).g === "M" ? 0 : 1, side = seq[0].g === "M" ? "Paternal" : "Maternal";
  const T = {
    parent: ["Father", "Mother"], child: ["Son", "Daughter"], sibling: ["Brother", "Sister"], spouse: ["Husband", "Wife"],
    "parent,parent": [`${side} grandfather`, `${side} grandmother`], "child,child": ["Grandson", "Granddaughter"],
    "parent,sibling": [`${side} uncle`, `${side} aunt`], "sibling,child": ["Nephew", "Niece"],
    "spouse,parent": ["Father-in-law", "Mother-in-law"], "child,spouse": ["Son-in-law", "Daughter-in-law"],
    "sibling,spouse": ["Brother-in-law", "Sister-in-law"], "spouse,sibling": ["Brother-in-law", "Sister-in-law"],
    "parent,sibling,spouse": ["Uncle", "Aunt"], "parent,sibling,child": ["Cousin", "Cousin"],
    "parent,parent,parent": ["Great-grandfather", "Great-grandmother"], "child,child,child": ["Great-grandson", "Great-granddaughter"],
    "parent,parent,sibling": ["Grand-uncle", "Grand-aunt"], "sibling,child,child": ["Grand-nephew", "Grand-niece"],
    "spouse,sibling,child": ["Nephew", "Niece"],
  };
  return T[key]?.[i] ?? null;
}
const KIN_POOL = {
  M: ["Father", "Son", "Brother", "Husband", "Paternal grandfather", "Maternal grandfather", "Grandson", "Paternal uncle", "Maternal uncle", "Nephew", "Father-in-law", "Son-in-law", "Brother-in-law", "Cousin", "Great-grandfather", "Grand-uncle", "Grand-nephew"],
  F: ["Mother", "Daughter", "Sister", "Wife", "Paternal grandmother", "Maternal grandmother", "Granddaughter", "Paternal aunt", "Maternal aunt", "Niece", "Mother-in-law", "Daughter-in-law", "Sister-in-law", "Cousin", "Great-grandmother", "Grand-aunt", "Grand-niece"],
};
function kinWrongs(name, g) {
  const byMarriage = name === "Uncle" || name === "Aunt";
  const pool = KIN_POOL[g].filter((x) => x !== name && !(byMarriage && /uncle|aunt/i.test(x)));
  const last = name.split(" ").at(-1).toLowerCase(), near = pool.filter((x) => x.toLowerCase().endsWith(last) || x.toLowerCase().includes(last.split("-")[0]));
  return [...shuffle(near), ...shuffle(pool)];
}
const SYMS = ["+", "−", "×", "÷", "$", "#", "@", "%", "&", "*"];
const CODE_RELS = [["parent", "M"], ["parent", "F"], ["child", "M"], ["child", "F"], ["sibling", "M"], ["sibling", "F"], ["spouse", "M"], ["spouse", "F"]];
function codedRelation() {
  const syms = sample(SYMS, 6), defs = sample(CODE_RELS, 6).map(([rel, g], i) => ({ sym: syms[i], rel, g }));
  const k = pick([4, 4, 5]), L = sample(["A", "B", "C", "D", "E", "F", "K", "L", "M", "P", "Q", "R", "S", "T"], k + 1), ops = Array.from({ length: k }, () => pick(defs));
  if (ops.some((o, i) => i && o.rel === "spouse" && ops[i - 1].rel === "spouse")) return null; // nobody has two spouses
  const G = {}, setG = (p, g) => { if (G[p] && G[p] !== g) return false; G[p] = g; return true; };
  for (let i = 0; i < k; i++) { if (!setG(L[i], ops[i].g)) return null; if (ops[i].rel === "spouse" && !setG(L[i + 1], ops[i].g === "M" ? "F" : "M")) return null; }
  const inv = { parent: "child", child: "parent", sibling: "sibling", spouse: "spouse" };
  const reverse = rnd() < 0.4 && L.every((p) => G[p]);
  const from = reverse ? L[0] : L[k], to = reverse ? L[k] : L[0];
  const seq = reverse ? ops.map((o, i) => ({ rel: inv[o.rel], g: G[L[i + 1]] })) : [...ops].reverse().map((o) => ({ rel: o.rel, g: o.g }));
  const r = simplify(G[from], seq, false, `${from}'s`, from); if (!r) return null;
  const name = kinName(r.seq); if (!name) return null;
  const expr = L.map((p, i) => (i < k ? `${p} ${ops[i].sym} ` : p)).join("");
  const q = `If ${defs.map((d) => `'P ${d.sym} Q' means 'P is the ${kw(d)} of Q'`).join(", ")}, then in '${expr}', how is ${to} related to ${from}?`;
  const chain = ops.map((o, i) => `${L[i]} is the ${kw(o)} of ${L[i + 1]}`).join("; ");
  return mc(q, name, kinWrongs(name, seq.at(-1).g), `${chain}. So ${to} is ${from}'s ${seq.map(kw).join("'s ")}${r.steps.length ? ` (${r.steps.join("; ")})` : ""} — that is, ${from}'s ${name.toLowerCase()}.`);
}
const MALE = ["Rahul", "Aman", "Vikram", "Karan", "Rohit", "Arjun", "Sanjay", "Deepak", "Mohan", "Ravi", "Suresh", "Ajay", "Nikhil", "Yash", "Kabir", "Dev", "Aditya", "Varun"];
const FEMALE = ["Priya", "Neha", "Kavita", "Sunita", "Meera", "Anjali", "Pooja", "Ritu", "Shalini", "Seema", "Rekha", "Asha", "Isha", "Divya", "Nisha", "Tanvi"];
function pointing() {
  const sg = pick(["M", "F"]), sp = pick(sg === "M" ? MALE : FEMALE), n = pick([4, 4, 5]);
  const seq = Array.from({ length: n }, () => { const rel = pick(["parent", "parent", "child", "sibling", "spouse"]); return { rel, g: pick(["M", "F"]), only: rel === "child" && rnd() < 0.6 }; });
  if (seq.some((s, i) => i && s.rel === "spouse" && seq[i - 1].rel === "spouse")) return null;
  const r = simplify(sg, seq, true, "my", sg === "M" ? `${sp} himself` : `${sp} herself`); if (!r || !r.steps.length) return null;
  const name = kinName(r.seq); if (!name) return null;
  const tg = seq.at(-1).g, pron = tg === "M" ? "He" : "She", who = tg === "M" ? "man" : "woman";
  const said = rnd() < 0.5 ? `"${pron} is the ${kw(seq.at(-1))} of my ${seq.slice(0, -1).map(kw).join("'s ")}."` : `"${pron} is my ${seq.map(kw).join("'s ")}."`;
  return mc(`Pointing to a ${who} in a photograph, ${sp} said, ${said} How is the ${who} related to ${sp}?`, name, kinWrongs(name, tg), `Simplify from ${sp}'s side (${sp} is ${sg === "M" ? "male" : "female"}): ${r.steps.join("; ")}. So the ${who} is ${sp}'s ${name.toLowerCase()}.`);
}

// ================= DIRECTIONS =================
const DIRS8 = ["North", "North-East", "East", "South-East", "South", "South-West", "West", "North-West"];
const V = { North: [0, 1], East: [1, 0], South: [0, -1], West: [-1, 0] };
const quadrant = (dx, dy) => (dx && dy ? `${dy > 0 ? "North" : "South"}-${dx > 0 ? "East" : "West"}` : dx ? (dx > 0 ? "East" : "West") : dy > 0 ? "North" : "South");
function directions() {
  const unit = pick(["km", "m"]), scale = unit === "m" ? 5 : 1;
  if (rnd() < 0.5) {
    const name = pick(MALE), n = pick([6, 6, 7]);
    let d = ri(0, 3), x = 0, y = 0; const legs = [];
    for (let i = 0; i < n; i++) { const t = i ? pick(["left", "right"]) : null; if (t) d = (d + (t === "right" ? 1 : 3)) % 4; const len = ri(1, 12) * scale, dir = DIRS8[d * 2]; x += V[dir][0] * len; y += V[dir][1] * len; legs.push([t, len, dir]); }
    const h = Math.hypot(x, y); if (!x && !y) return null;
    if (x && y && !Number.isInteger(h)) return null;
    const path = legs.map(([t, l, dir], i) => (i ? `turns ${t} and walks ${l} ${unit}` : `walks ${l} ${unit} towards the ${dir.toLowerCase()}`)).join(", then ");
    const dist = x && y ? h : Math.abs(x || y), dir = quadrant(x, y), opp = DIRS8[(DIRS8.indexOf(dir) + 4) % 8];
    return mc(`${name} ${path}. How far and in which direction is he now from his starting point?`, `${dist} ${unit} ${dir}`, [`${dist} ${unit} ${opp}`, `${Math.abs(x) + Math.abs(y)} ${unit} ${dir}`, `${dist + 2 * scale} ${unit} ${dir}`, `${dist} ${unit} ${DIRS8[(DIRS8.indexOf(dir) + 2) % 8]}`], `He ends ${Math.abs(x)} ${unit} ${x >= 0 ? "east" : "west"} and ${Math.abs(y)} ${unit} ${y >= 0 ? "north" : "south"} of the start${x && y ? `; distance = √(${Math.abs(x)}² + ${Math.abs(y)}²) = ${dist} ${unit}` : ""}, towards the ${dir}.`);
  }
  const P = sample(["P", "Q", "R", "S", "T", "U", "W", "X"], 7), pt = { [P[0]]: [0, 0] }, facts = [];
  for (let i = 1; i < 7; i++) { const ref = P[ri(Math.max(0, i - 2), i - 1)], dir = pick(["North", "East", "South", "West"]), len = ri(2, 12) * scale; pt[P[i]] = [pt[ref][0] + V[dir][0] * len, pt[ref][1] + V[dir][1] * len]; facts.push(`${P[i]} is ${len} ${unit} to the ${dir.toLowerCase()} of ${ref}`); }
  const [a, b] = [P[6], P[0]], dx = pt[a][0] - pt[b][0], dy = pt[a][1] - pt[b][1], h = Math.hypot(dx, dy);
  if ((!dx && !dy) || (dx && dy && !Number.isInteger(h))) return null;
  if (new Set(Object.values(pt).map(String)).size < 7) return null;
  const dist = dx && dy ? h : Math.abs(dx || dy), dir = quadrant(dx, dy);
  return mc(`${facts.join(". ")}. What is the distance and direction of ${a} from ${b}?`, `${dist} ${unit} ${dir}`, [`${dist} ${unit} ${DIRS8[(DIRS8.indexOf(dir) + 4) % 8]}`, `${Math.abs(dx) + Math.abs(dy)} ${unit} ${dir}`, `${dist} ${unit} ${DIRS8[(DIRS8.indexOf(dir) + 2) % 8]}`, `${dist + scale} ${unit} ${dir}`], `Placing ${b} at the origin, ${a} is ${Math.abs(dx)} ${unit} ${dx >= 0 ? "east" : "west"} and ${Math.abs(dy)} ${unit} ${dy >= 0 ? "north" : "south"} of ${b}${dx && dy ? `, so the distance is √(${Math.abs(dx)}² + ${Math.abs(dy)}²) = ${dist} ${unit}` : ""}, towards the ${dir}.`);
}
function directionsTurns() {
  const t = pick(["shadow", "shadow", "rename", "clock"]);
  if (t === "shadow") {
    const morning = rnd() < 0.5, name = pick(MALE), turns = Array.from({ length: ri(3, 4) }, () => pick(["left", "right"]));
    if (new Set(turns).size === 1) return null;
    let d = morning ? 1 : 3;
    turns.forEach((x) => (d = (d + (x === "right" ? 1 : 3)) % 4));
    const shadow = morning ? 3 : 1, side = ["in front of him", "to his right", "behind him", "to his left"][(shadow - d + 4) % 4];
    return mc(`${morning ? "Just after sunrise" : "Just before sunset"}, ${name} starts walking towards the sun. He then turns ${turns.join(", then ")}. Where does his shadow fall now?`, side, ["in front of him", "to his right", "behind him", "to his left"].filter((s) => s !== side), `Walking towards the ${morning ? "rising sun he faces East" : "setting sun he faces West"}; after the turns he faces ${DIRS8[d * 2]}. The shadow points ${morning ? "West" : "East"}, which is ${side}.`);
  }
  if (t === "rename") {
    const r = ri(1, 7), a = ri(0, 7), target = ri(0, 7), actual = DIRS8[(target - r + 8) % 8];
    return mc(`In a new naming system, ${DIRS8[a]} is called ${DIRS8[(a + r) % 8]}, and every direction is renamed by the same rotation. A patrol is ordered to move towards what is now called ${DIRS8[target]}. In which actual direction does it move?`, actual, [DIRS8[(target + r) % 8], DIRS8[(target + 4) % 8], DIRS8[(target - r + 12) % 8], DIRS8[target]], `The renaming turns every direction ${r * 45}° clockwise. The name "${DIRS8[target]}" therefore belongs to the actual direction ${r * 45}° anticlockwise of it: ${actual}.`);
  }
  const h = pick([3, 6, 9, 12]), d0 = ri(0, 7), off = (d0 * 45 - (h % 12) * 30 + 720) % 360;
  const m = pick([0, 15, 30, 45]), hh = ri(1, 12), ang = (m * 6 + off) % 360, ans = DIRS8[ang / 45];
  return mc(`A clock is laid flat so that at ${h}:00 its hour hand points ${DIRS8[d0]}. In which direction will the minute hand point at ${hh}:${String(m).padStart(2, "0")}?`, ans, [DIRS8[(ang / 45 + 2) % 8], DIRS8[(ang / 45 + 4) % 8], DIRS8[(m / 15) * 2], DIRS8[(ang / 45 + 6) % 8]], `On an upright dial the hour hand at ${h}:00 points ${DIRS8[((h % 12) * 30) / 45]}; here it points ${DIRS8[d0]}, so the dial is turned ${off}° clockwise. At :${String(m).padStart(2, "0")} the minute hand would normally point ${DIRS8[(m / 15) * 2]}; turned ${off}°, it points ${ans}.`);
}

// ================= RANKING & SEATING =================
function ranking() {
  const t = ri(0, 4), [a, b, c] = sample(MALE, 3);
  if (t === 0) {
    const pa = ri(10, 25), k = ri(3, pa - 3), pb = ri(10, 30), n1 = pa + k + pb, bPos = pa - k - 1, n2 = bPos + pb - 1;
    if (bPos < 1 || n2 < pa) return null;
    return mc(`In a queue, ${a} is ${ord(pa)} from the front and ${b} is ${ord(pb)} from the back. There are ${k} people between them. What is the minimum possible number of people in the queue?`, n2, nearNums(n2, [n1, n1 - 1, pa + pb]), `If ${b} is behind ${a}, the queue has ${pa} + ${k} + ${pb} = ${n1}. If ${b} is ahead of ${a}, ${b} is ${ord(bPos)} from the front, giving ${bPos} + ${pb} − 1 = ${n2}. The minimum is ${n2}.`);
  }
  if (t === 1) {
    const n = ri(30, 60), pa = ri(4, 20), rb = ri(4, 20), pb = n - rb + 1; if (pb - pa < 4 || (pa + pb) % 2) return null;
    const pc = (pa + pb) / 2;
    return mc(`In a row of ${n} people, ${a} is ${ord(pa)} from the left and ${b} is ${ord(rb)} from the right. ${c} stands exactly midway between them. What is ${c}'s position from the right end?`, ord(n - pc + 1), [ord(pc), ord(n - pc), ord(n - pc + 2)], `${b} is ${ord(pb)} from the left, so the midpoint is (${pa} + ${pb}) / 2 = ${pc} from the left, i.e. ${n} − ${pc} + 1 = ${n - pc + 1} from the right.`);
  }
  if (t === 2) {
    const l = ri(5, 15), r = ri(6, 18), L = ri(l + 6, l + 20), n = L + r - 1, bNew = n - l + 1;
    return mc(`In a row, ${a} is ${ord(l)} from the left and ${b} is ${ord(r)} from the right. They swap places, and ${a} is now ${ord(L)} from the left. What is ${b}'s new position from the right?`, ord(bNew), [ord(r), ord(L), ord(bNew - 1), ord(bNew + 1)], `After the swap ${a} is ${ord(L)} from the left and ${ord(r)} from the right, so the row has ${L} + ${r} − 1 = ${n} people. ${b} now stands in ${a}'s old place, ${ord(l)} from the left, i.e. ${n} − ${l} + 1 = ${bNew} from the right.`);
  }
  if (t === 3) {
    const n = ri(35, 60), s = ri(8, 25), k = ri(4, 12), sTop = n - s + 1, rTop = sTop - k; if (rTop < 1) return null;
    return mc(`In a class of ${n}, ${a} is ${k} ranks above ${b}. ${b} is ${ord(s)} from the bottom. What is ${a}'s rank from the top?`, ord(rTop), [ord(rTop + 1), ord(sTop + k), ord(rTop - 1), ord(s + k)], `${b} is ${n} − ${s} + 1 = ${sTop} from the top, so ${a} is ${sTop} − ${k} = ${rTop}.`);
  }
  const top = ri(8, 25), bot = ri(8, 30), f = ri(3, 9), ab = ri(1, 5), passed = top + bot - 1, tot = passed + f + ab;
  return mc(`Among the students who passed, ${a} ranks ${ord(top)} from the top and ${ord(bot)} from the bottom. ${f} students failed and ${ab} were absent. How many students are in the class?`, tot, nearNums(tot, [passed, passed + f, top + bot + f + ab]), `Students who passed = ${top} + ${bot} − 1 = ${passed}; adding ${f} who failed and ${ab} absent gives ${tot}.`);
}
const PERMS = {};
const permsOf = (key, arr) => (PERMS[key] ||= permutations(arr));
function seating() {
  const circ = rnd() < 0.45, n = circ ? 8 : pick([7, 8]);
  const people = sample(["A", "B", "C", "D", "E", "F", "G", "H", "K", "M", "P", "Q", "R", "S", "T", "V"], n);
  let arr = shuffle(people);
  if (circ) { const z = arr.indexOf(people[0]); arr = [...arr.slice(z), ...arr.slice(0, z)]; }
  const idx = circ ? permsOf(`c${n}`, [...Array(n - 1).keys()].map((i) => i + 1)).map((p) => [0, ...p]) : permsOf(`l${n}`, [...Array(n).keys()]);
  const perms = idx.map((p) => p.map((i) => people[i]));
  const md = (i) => ((i % n) + n) % n;
  const mk = () => {
    const [x, y, z] = sample(people, 3), ix = arr.indexOf(x), iy = arr.indexOf(y), iz = arr.indexOf(z), k = ri(2, 3);
    const opts = circ ? [
      [`${x} sits immediately to the left of ${y}.`, (P) => md(P.indexOf(y) + 1) === P.indexOf(x), md(iy + 1) === ix],
      [`${x} sits immediately to the right of ${y}.`, (P) => md(P.indexOf(y) - 1) === P.indexOf(x), md(iy - 1) === ix],
      [`${x} sits ${ord(k)} to the left of ${y}.`, (P) => md(P.indexOf(y) + k) === P.indexOf(x), md(iy + k) === ix],
      [`${x} sits ${ord(k)} to the right of ${y}.`, (P) => md(P.indexOf(y) - k) === P.indexOf(x), md(iy - k) === ix],
      [`${x} sits opposite ${y}.`, (P) => md(P.indexOf(y) + n / 2) === P.indexOf(x), md(iy + n / 2) === ix],
      [`${x} is not a neighbour of ${y}.`, (P) => ![1, n - 1].includes(md(P.indexOf(x) - P.indexOf(y))), ![1, n - 1].includes(md(ix - iy))],
      [`${z} sits between ${x} and ${y}.`, (P) => [1, n - 1].includes(md(P.indexOf(z) - P.indexOf(x))) && [1, n - 1].includes(md(P.indexOf(z) - P.indexOf(y))), [1, n - 1].includes(md(iz - ix)) && [1, n - 1].includes(md(iz - iy))],
    ] : [
      [`${x} sits at one of the ends.`, (P) => [0, n - 1].includes(P.indexOf(x)), [0, n - 1].includes(ix)],
      [`${x} does not sit at either end.`, (P) => ![0, n - 1].includes(P.indexOf(x)), ![0, n - 1].includes(ix)],
      [`${x} sits immediately to the left of ${y}.`, (P) => P.indexOf(x) === P.indexOf(y) - 1, ix === iy - 1],
      [`${x} sits ${ord(k)} to the right of ${y}.`, (P) => P.indexOf(x) === P.indexOf(y) + k, ix === iy + k],
      [`${x} sits ${ord(k)} to the left of ${y}.`, (P) => P.indexOf(x) === P.indexOf(y) - k, ix === iy - k],
      [`Exactly ${Math.abs(ix - iy) - 1} ${Math.abs(ix - iy) - 1 === 1 ? "person sits" : "people sit"} between ${x} and ${y}.`, (P) => Math.abs(P.indexOf(x) - P.indexOf(y)) === Math.abs(ix - iy), Math.abs(ix - iy) > 1],
      [`${x} does not sit next to ${y}.`, (P) => Math.abs(P.indexOf(x) - P.indexOf(y)) > 1, Math.abs(ix - iy) > 1],
      [`${x} sits somewhere to the left of ${y}.`, (P) => P.indexOf(x) < P.indexOf(y), ix < iy],
      [`${z} sits between ${x} and ${y}, next to both.`, (P) => Math.abs(P.indexOf(z) - P.indexOf(x)) === 1 && Math.abs(P.indexOf(z) - P.indexOf(y)) === 1, Math.abs(iz - ix) === 1 && Math.abs(iz - iy) === 1],
    ];
    const ok = opts.filter((o) => o[2]); return ok.length ? pick(ok) : null;
  };
  const clues = []; let live = perms;
  for (let g = 0; g < 300 && live.length > 1; g++) { const c = mk(); if (!c || clues.some((d) => d[0] === c[0])) continue; const next = live.filter(c[1]); if (next.length < live.length) { clues.push(c); live = next; } }
  if (live.length !== 1) return null;
  for (const c of shuffle([...clues])) { const rest = clues.filter((d) => d !== c); if (perms.filter((P) => rest.every((d) => d[1](P))).length === 1) clues.splice(clues.indexOf(c), 1); }
  if (clues.length < 5) return null;
  const [x, y] = sample(people, 2), ix = arr.indexOf(x);
  let qq, ans, wrongs;
  if (circ) {
    const k = ri(1, 3), dir = pick(["left", "right"]);
    if (n % 2 === 0 && rnd() < 0.3) { qq = `Who sits opposite ${x}?`; ans = arr[md(ix + n / 2)]; }
    else { qq = `Who sits ${k === 1 ? "immediately" : ord(k)} to the ${dir} of ${x}?`; ans = arr[md(dir === "left" ? ix + k : ix - k)]; }
    wrongs = people.filter((p) => p !== ans && p !== x);
  } else {
    const r = rnd();
    if (r < 0.35) { const k = ri(2, n - 1), end = pick(["left", "right"]); qq = `Who sits ${ord(k)} from the ${end} end?`; ans = arr[end === "left" ? k - 1 : n - k]; wrongs = people.filter((p) => p !== ans); }
    else if (r < 0.7) { const k = ri(1, 2), dir = pick(["left", "right"]), j = dir === "left" ? ix - k : ix + k; if (j < 0 || j >= n) return null; qq = `Who sits ${k === 1 ? "immediately" : ord(k)} to the ${dir} of ${x}?`; ans = arr[j]; wrongs = people.filter((p) => p !== ans && p !== x); }
    else { ans = Math.abs(ix - arr.indexOf(y)) - 1; qq = `How many people sit between ${x} and ${y}?`; if (clues.some((c) => c[0].includes(` between ${x} and ${y}`) || c[0].includes(` between ${y} and ${x}`))) return null; wrongs = nearNums(ans).filter((v) => v <= n - 2); }
  }
  const intro = circ ? `${n} friends — ${list([...people].sort())} — sit around a circular table facing the centre.` : `${n} friends — ${list([...people].sort())} — sit in a row facing north.`;
  const order = circ ? `Going round with each person's left as the next seat: ${arr.join(" → ")} → ${arr[0]}` : `From left to right: ${arr.join(", ")}`;
  return mc(`${intro} ${shuffle(clues).map((c) => c[0]).join(" ")} ${qq}`, ans, shuffle(wrongs), `Only one arrangement satisfies every clue. ${order}. So the answer is ${ans}.`);
}

// Mixed-facing seating (bank-exam "mains" style): some people face the centre (or north), the rest face away,
// so every "left/right" clue depends on who faces which way. Solved over every (seat order × facing) candidate.
function seatingFacing() {
  const circ = rnd() < 0.6, n = circ ? 8 : 7, FULL = (1 << n) - 1;
  const people = sample(["A", "B", "C", "D", "E", "F", "G", "H", "K", "M", "P", "Q", "R", "S", "T", "V"], n);
  const base = circ ? permsOf(`c${n}`, [...Array(n - 1).keys()].map((i) => i + 1)).map((p) => [0, ...p]) : permsOf(`l${n}`, [...Array(n).keys()]);
  const truthP = pick(base), truthM = ri(1, FULL - 1), inCount = (M) => { let c = 0; for (let i = 0; i < n; i++) c += (M >> i) & 1; return c; };
  if (inCount(truthM) < 2 || inCount(truthM) > n - 2) return null;
  const md = (i) => ((i % n) + n) % n, fin = (M, x) => (M >> x) & 1;
  const dL = (M, x) => (circ ? (fin(M, x) ? 1 : -1) : fin(M, x) ? -1 : 1); // seat step towards x's left
  const facing = (x) => (circ ? ["faces away from the centre", "faces the centre"] : ["faces south", "faces north"])[x];
  const off = (P, M, x, y) => (circ ? md((P[x] - P[y]) * dL(M, y)) : (P[x] - P[y]) * dL(M, y)); // x is `off` seats to y's left
  const posName = (d) => (circ ? (d <= n / 2 - 1 ? [d, "left"] : n - d <= n / 2 - 1 ? [n - d, "right"] : null) : d > 0 ? [d, "left"] : [-d, "right"]);
  const at = (k) => (k === 1 ? "immediately" : ord(k));
  const mk = () => {
    const [x, y, z] = sample([...Array(n).keys()], 3), P = truthP, M = truthM, N = people;
    const opts = [];
    const d = off(P, M, x, y), pn = posName(d);
    if (pn && pn[0] <= 3 && pn[0] >= 1) { const [k, side] = pn; opts.push([`${N[x]} sits ${at(k)} to the ${side} of ${N[y]}.`, (Q, W) => off(Q, W, x, y) === (circ ? md(side === "left" ? k : -k) : side === "left" ? k : -k)]); }
    opts.push([`${N[x]} ${facing(fin(M, x))}.`, (Q, W) => fin(W, x) === fin(M, x)]);
    opts.push([`${N[x]} and ${N[y]} face ${fin(M, x) === fin(M, y) ? "the same direction" : "opposite directions"}.`, (Q, W) => (fin(W, x) === fin(W, y)) === (fin(M, x) === fin(M, y))]);
    const adj = (Q, a, b) => (circ ? [1, n - 1].includes(md(Q[a] - Q[b])) : Math.abs(Q[a] - Q[b]) === 1);
    opts.push([adj(P, x, y) ? `${N[x]} is an immediate neighbour of ${N[y]}.` : `${N[x]} is not an immediate neighbour of ${N[y]}.`, (Q) => adj(Q, x, y) === adj(P, x, y)]);
    if (adj(P, z, x) && adj(P, z, y)) opts.push([`${N[z]} sits between ${N[x]} and ${N[y]}, next to both.`, (Q) => adj(Q, z, x) && adj(Q, z, y)]);
    if (circ) {
      if (md(P[x] - P[y]) === n / 2) opts.push([`${N[x]} sits opposite ${N[y]}.`, (Q) => md(Q[x] - Q[y]) === n / 2]);
      const nb = (Q) => [...Array(n).keys()].filter((p) => p !== x && adj(Q, p, x)), f = nb(P).map((p) => fin(M, p));
      if (f[0] === f[1]) opts.push([`Both immediate neighbours of ${N[x]} ${f[0] ? "face the centre" : "face away from the centre"}.`, (Q, W) => nb(Q).every((p) => fin(W, p) === f[0])]);
      else opts.push([`The two immediate neighbours of ${N[x]} face opposite directions.`, (Q, W) => { const g = nb(Q); return fin(W, g[0]) !== fin(W, g[1]); }]);
    } else {
      const gap = Math.abs(P[x] - P[y]) - 1;
      if (gap >= 1) opts.push([`Exactly ${gap} ${gap === 1 ? "person sits" : "people sit"} between ${N[x]} and ${N[y]}.`, (Q) => Math.abs(Q[x] - Q[y]) - 1 === gap]);
      if ([0, n - 1].includes(P[x])) opts.push([`${N[x]} sits at one of the extreme ends.`, (Q) => [0, n - 1].includes(Q[x])]);
      else opts.push([`${N[x]} does not sit at either end.`, (Q) => ![0, n - 1].includes(Q[x])]);
    }
    if (rnd() < 0.15) { const c = inCount(M); opts.push([`Exactly ${c} of them ${circ ? "face the centre" : "face north"}.`, (Q, W) => inCount(W) === c]); }
    return pick(opts);
  };
  const total = base.length << n, test = (c, clue) => clue[1](base[c >> n], c & FULL);
  let live = null; const clues = [];
  for (let g = 0; g < 400; g++) {
    if (live && live.length === 1) break;
    const c = mk(); if (clues.some((d) => d[0] === c[0])) continue;
    const next = []; if (live) { for (const i of live) if (test(i, c)) next.push(i); } else for (let i = 0; i < total; i++) if (test(i, c)) next.push(i);
    if (!live || next.length < live.length) { clues.push(c); live = next; }
  }
  if (!live || live.length !== 1) return null;
  for (const c of shuffle([...clues])) { // drop clues the others already imply
    const rest = clues.filter((d) => d !== c); let cnt = 0;
    for (let i = 0; i < total && cnt < 2; i++) if (rest.every((d) => test(i, d))) cnt++;
    if (cnt === 1) clues.splice(clues.indexOf(c), 1);
  }
  if (clues.length < 7) return null;
  const P = truthP, M = truthM, N = people, bySeat = [...Array(n).keys()].sort((a, b) => P[a] - P[b]);
  const tag = (p) => `${N[p]} (${circ ? (fin(M, p) ? "in" : "out") : fin(M, p) ? "N" : "S"})`;
  const layout = circ ? `Going round the table: ${bySeat.map(tag).join(" → ")} → back to ${N[bySeat[0]]} ("in" = faces the centre; this direction is to the left of anyone facing in and to the right of anyone facing out)` : `From west to east: ${bySeat.map(tag).join(", ")} (N = faces north, whose left is towards the west; S = faces south, whose left is towards the east)`;
  const t = pick(["who", "who", "pos", "count"]), x = ri(0, n - 1);
  let qq, ans, wrongs, how;
  if (t === "count") {
    if (clues.some((c) => c[0].startsWith("Exactly ") && c[0].includes(" of them "))) return null;
    ans = inCount(M); qq = `How many of them ${circ ? "face the centre" : "face north"}?`; wrongs = nearNums(ans).filter((v) => v <= n); how = `${ans} of them ${circ ? "face the centre" : "face north"}`;
  } else if (t === "who") {
    const k = ri(1, 3), side = pick(["left", "right"]), s = (side === "left" ? k : -k) * dL(M, x), seat = circ ? md(P[x] + s) : P[x] + s;
    if (seat < 0 || seat >= n) return null;
    ans = N[bySeat[seat]]; qq = `Who sits ${at(k)} to the ${side} of ${N[x]}?`; wrongs = N.filter((p) => p !== ans && p !== N[x]);
    how = `${N[x]} ${facing(fin(M, x))}, so ${k === 1 ? "the seat" : `${k} seats`} to ${N[x]}'s ${side} ${k === 1 ? "is" : "lead to"} ${ans}`;
  } else {
    const y = pick([...Array(n).keys()].filter((p) => p !== x)), pn = posName(off(P, M, x, y)); if (!pn || pn[0] > 4) return null;
    const lbl = ([k, s]) => (k === 1 ? `Immediately to the ${s}` : `${ord(k)} to the ${s}`);
    ans = lbl(pn); qq = `What is the position of ${N[x]} with respect to ${N[y]}?`;
    wrongs = shuffle([[pn[0], pn[1] === "left" ? "right" : "left"], [pn[0] + 1, pn[1]], [Math.max(1, pn[0] - 1), pn[1]], [pn[0] + 1, pn[1] === "left" ? "right" : "left"], [pn[0] + 2, pn[1]]]).map(lbl);
    how = `${N[y]} ${facing(fin(M, y))}, and ${N[x]} is ${ans.toLowerCase()} of ${N[y]} from ${N[y]}'s own point of view`;
  }
  const intro = circ ? `${n} people — ${list([...N].sort())} — sit around a circular table. Some of them face the centre and the rest face away from it.` : `${n} people — ${list([...N].sort())} — sit in a row running west to east. Some of them face north and the rest face south.`;
  return mc(`${intro} ${shuffle(clues).map((c) => c[0]).join(" ")} ${qq}`, ans, wrongs, `Only one arrangement (seats and facing) satisfies every clue. ${layout}. ${how[0].toUpperCase() + how.slice(1)}.`);
}

// ================= ARITHMETIC (multi-step) =================
const fmtClock = (mins) => { const H = Math.floor(mins / 60) % 24, M = mins % 60; return `${H % 12 || 12}:${String(M).padStart(2, "0")} ${H < 12 ? "am" : "pm"}`; };
const ARITH = [
  () => { const a = ri(8, 30), b = ri(8, 40), x = ri(2, 6); const rem = a * b - x * (a + b); if (rem <= 0 || rem % a) return null; const t = x + rem / a; return mc(`A can finish a job in ${a} days and B in ${b} days. They work together for ${x} days, after which A leaves. In how many days in all is the job finished?`, t, nearNums(t, [rem / a, Math.round((a * b) / (a + b))]), `Together they do ${x}(1/${a} + 1/${b}) = ${x * (a + b)}/${a * b} of the job. B finishes the remaining ${rem}/${a * b} alone in ${rem / a} days, so the total is ${x} + ${rem / a} = ${t} days.`); },
  () => { const t = ri(3, 12), a = ri(t + 1, 5 * t), b = ri(t + 1, 5 * t), n0 = a * b - t * b - t * a, d0 = t * a * b; if (n0 <= 0 || d0 % n0) return null; const c = d0 / n0; if (c > 150 || c === a || c === b) return null; const den = a * b + b * c + a * c, num = a * b * c; return mc(`A, B and C can each do a piece of work in ${a}, ${b} and ${c} days respectively. How many days will they take working together?`, t, nearNums(t, [Math.round((a + b + c) / 3)]), `Together they do 1/${a} + 1/${b} + 1/${c} = ${den}/${num} = 1/${t} of the work per day, so they need ${t} days.`); },
  () => { const [a, b, c] = [ri(4, 20), ri(4, 20), ri(6, 40)], den = b * c + a * c - a * b; if (den <= 0) return null; const num = a * b * c; if (num % den) return null; const t = num / den; return mc(`Two pipes can fill a tank in ${a} and ${b} hours, and a drain can empty it in ${c} hours. If all three are opened together on an empty tank, how long will it take to fill?`, `${t} hours`, nearNums(t, [Math.round((a * b) / (a + b))]).map((v) => `${v} hours`), `Net rate = 1/${a} + 1/${b} − 1/${c} = ${den}/${num} = 1/${t}, so ${t} hours.`); },
  () => { const L1 = ri(10, 30) * 10, L2 = ri(10, 30) * 10, v1 = ri(4, 12) * 9, v2 = ri(4, 12) * 9, same = rnd() < 0.4; const rel = same ? Math.abs(v1 - v2) : v1 + v2; if (!rel) return null; const ms = (rel * 5) / 18, t = (L1 + L2) / ms; if (!Number.isInteger(t)) return null; const other = Math.round((L1 + L2) / ((same ? v1 + v2 : Math.abs(v1 - v2) || 1) * 5 / 18)); return mc(`Two trains, ${L1} m and ${L2} m long, run at ${v1} km/h and ${v2} km/h in ${same ? "the same direction" : "opposite directions"} on parallel tracks. How many seconds do they take to cross each other completely?`, t, nearNums(t, [other, Math.round(L1 / ms)]), `Relative speed = ${same ? `${Math.max(v1, v2)} − ${Math.min(v1, v2)}` : `${v1} + ${v2}`} = ${rel} km/h = ${ms} m/s; distance = ${L1} + ${L2} = ${L1 + L2} m; time = ${t} s.`); },
  () => { const g = pick([800, 750, 900, 960, 875, 950, 850, 920, 940, 980, 975, 925, 880, 820]), num = (1000 - g) * 100, pct = mixed(num, g); return mc(`A dishonest shopkeeper sells goods at cost price but uses a weight of ${g} g instead of 1 kg. What is his profit percentage?`, `${pct}%`, [`${(1000 - g) / 10}%`, `${mixed(num, 1000 + (1000 - g))}%`, `${mixed(num + g, g)}%`, `${mixed(num - g, g)}%`], `He charges for 1000 g but gives ${g} g, gaining ${1000 - g} g on ${g} g: ${1000 - g}/${g} × 100 = ${pct}%.`); },
  () => { const x = ri(3, 9), p = ri(2, 5), q = ri(p + 1, 8), yrs = ri(4, 12); if (gcd(p, q) !== 1) return null; const A = p * x, B = q * x, g = gcd(A + yrs, B + yrs); return mc(`The present ages of A and B are in the ratio ${p} : ${q}. After ${yrs} years the ratio will be ${(A + yrs) / g} : ${(B + yrs) / g}. What is A's present age?`, `${A} years`, [`${B} years`, `${A + yrs} years`, `${A + p} years`, `${A - p} years`], `Let the ages be ${p}x and ${q}x: (${p}x + ${yrs})/(${q}x + ${yrs}) = ${(A + yrs) / g}/${(B + yrs) / g} gives x = ${x}, so A is ${A}.`); },
  () => { const a = ri(20, 50), b = a + ri(10, 40), m = ri(a + 1, b - 1), p = b - m, q = m - a, g = gcd(p, q); if (p === q) return null; return mc(`In what ratio must rice costing ₹${a}/kg be mixed with rice costing ₹${b}/kg so that the mixture costs ₹${m}/kg?`, `${p / g} : ${q / g}`, [`${q / g} : ${p / g}`, `${p / g + 1} : ${q / g}`, `${p / g} : ${q / g + 1}`, `${a} : ${b}`], `By alligation, cheaper : dearer = (${b} − ${m}) : (${m} − ${a}) = ${p} : ${q}${g > 1 ? ` = ${p / g} : ${q / g}` : ""}.`); },
  () => { const r = pick([4, 5, 8, 10, 12, 15, 20]), P = ri(4, 60) * 500, d = (P * r * r) / 10000; if (!Number.isInteger(d)) return null; return mc(`What is the difference between compound interest and simple interest on ₹${P} for 2 years at ${r}% per annum?`, `₹${d}`, [`₹${2 * d}`, `₹${d + r}`, `₹${(P * r) / 100}`, `₹${d / 2}`], `For 2 years the difference is P(r/100)² = ${P} × (${r}/100)² = ₹${d}.`); },
  () => { const u = ri(3, 6), v = u + ri(1, 3), t1 = pick([5, 10, 12, 15, 20]), t2 = pick([5, 6, 10, 15]); const num = u * v * (t1 + t2), den = 60 * (v - u); if (num % den) return null; const D = num / den; return mc(`Walking at ${u} km/h, a cadet reaches the parade ground ${t1} minutes late; walking at ${v} km/h, he reaches ${t2} minutes early. How far is the parade ground?`, `${D} km`, [`${D + 1} km`, `${Math.max(1, D - 1)} km`, `${D * 2} km`, `${D + 2} km`], `The time difference is ${t1 + t2} min = ${mixed(t1 + t2, 60)} h. D/${u} − D/${v} = ${mixed(t1 + t2, 60)} gives D = ${u} × ${v} × ${mixed(t1 + t2, 60)} ÷ ${v - u} = ${D} km.`); },
  () => { const x = ri(2, 9) * 10000, y = ri(2, 9) * 10000, m = ri(4, 10), P = ri(2, 9) * 1000; const ax = x * 12, by = y * m, tot = ax + by; if ((P * ax) % tot) return null; const sa = (P * ax) / tot, g = gcd(ax, by); return mc(`A invests ₹${x} for 12 months and B invests ₹${y} for ${m} months in a business. Out of a profit of ₹${P}, what is A's share?`, `₹${sa}`, [`₹${P - sa}`, `₹${Math.round((P * x) / (x + y))}`, `₹${sa + 100}`, `₹${P / 2}`], `Shares are in the ratio ${x} × 12 : ${y} × ${m} = ${ax / g} : ${by / g}, so A gets ₹${sa}.`); },
  () => { const p1 = ri(25, 40), p2 = p1 + ri(5, 15), M = pick([200, 300, 400, 500, 600]), pass = ri(Math.ceil((p1 * M) / 100) + 5, Math.floor((p2 * M) / 100) - 5), f = pass - (p1 * M) / 100, e = (p2 * M) / 100 - pass; if (!Number.isInteger(f) || !Number.isInteger(e) || f <= 0 || e <= 0) return null; return mc(`A candidate who scores ${p1}% fails by ${f} marks, while another who scores ${p2}% gets ${e} marks more than the pass mark. What are the maximum marks?`, M, nearNums(M, [f + e, (f + e) * 5], 50), `The ${p2 - p1}% difference equals ${f} + ${e} = ${f + e} marks, so 1% = ${(f + e) / (p2 - p1)} marks and the maximum is ${M}.`); },
  () => { const vt = ri(6, 10), vp = vt + ri(2, 6), lag = pick([6, 10, 12, 15, 20]), head = (vt * lag) / 60, t = head / (vp - vt); if (!Number.isInteger(t * 60)) return null; return mc(`A thief escapes at ${vt} km/h. A policeman starts chasing him ${lag} minutes later at ${vp} km/h. How long after starting will the policeman catch him?`, `${t * 60} minutes`, [`${lag} minutes`, `${t * 60 + lag} minutes`, `${t * 60 + 5} minutes`, `${Math.max(1, t * 60 - 5)} minutes`], `The thief's head start is ${vt} × ${lag}/60 = ${mixed(vt * lag, 60)} km; the gap closes at ${vp - vt} km/h, taking ${t * 60} minutes.`); },
  () => { const s = ri(8, 20), w = ri(2, 6), d = ((s * s - w * w) * pick([1, 2])) / 2, T = d / (s + w) + d / (s - w); if (!Number.isInteger(d) || !Number.isInteger(T)) return null; return mc(`A boat's speed in still water is ${s} km/h and the stream flows at ${w} km/h. How long does it take to go ${d} km downstream and come back?`, `${T} hours`, [`${mixed(2 * d, s)} hours`, `${T + 1} hours`, `${T - 1} hours`, `${mixed(d, s + w)} hours`], `Downstream: ${d}/${s + w} = ${mixed(d, s + w)} h; upstream: ${d}/${s - w} = ${mixed(d, s - w)} h; total ${T} h.`); },
  () => { const x = pick([10, 20, 25]), y = pick([10, 20, 25, 50]), C = ri(2, 20) * 100, P = (C * (100 + x) * (100 + y)) / 10000; if (!Number.isInteger(P)) return null; return mc(`A sells a bicycle to B at ${x}% profit, and B sells it to C at ${y}% profit. If C pays ₹${P}, what did A pay for it?`, `₹${C}`, [`₹${Math.round((P * (100 - x - y)) / 100)}`, `₹${Math.round((P * 100) / (100 + x + y))}`, `₹${C + 100}`, `₹${Math.round((P * 100) / (100 + y))}`], `₹${P} = cost × ${(100 + x) / 100} × ${(100 + y) / 100}, so the cost was ₹${C}.`); },
  () => { const L = ri(3, 12) * 100, u = ri(3, 7), v = u + ri(1, 5), same = rnd() < 0.5, t = L / (same ? v - u : v + u); if (!Number.isInteger(t)) return null; return mc(`Two runners start together from the same point on a ${L} m circular track at ${u} m/s and ${v} m/s, running in ${same ? "the same direction" : "opposite directions"}. After how many seconds do they first meet again?`, `${t} s`, [`${mixed(L, same ? v + u : v - u)} s`, `${t * 2} s`, `${t + 10} s`, `${mixed(L, v)} s`], `${same ? "The faster runner must gain a full lap" : "Together they must cover one full lap"}: ${L} ÷ ${same ? `(${v} − ${u})` : `(${v} + ${u})`} = ${t} s.`); },
  () => { const L = pick([40, 50, 60, 80, 81, 100, 125, 160, 200, 243, 250, 256, 320, 343, 400, 500, 625, 729, 1000]), x = ri(2, Math.floor(L / 3)), k = pick([2, 3]); const num = (L - x) ** k, den = L ** (k - 1); if (num % den) return null; const left = num / den, prev = (L - x) ** (k - 1) / L ** (k - 2); return mc(`A container holds ${L} litres of pure milk. ${x} litres are drawn off and replaced with water, and this is done ${k === 2 ? "twice" : "three times"} in all. How much milk is now in the container?`, `${left} litres`, [`${L - k * x} litres`, `${+prev.toFixed(2)} litres`, `${L - left} litres`, `${left + x} litres`], `Each round keeps ${L - x}/${L} of the milk, so milk left = ${L} × (${L - x}/${L})^${k} = ${left} litres (not ${L} − ${k} × ${x}, because later draws remove diluted liquid).`); },
  () => { const D = pick([100, 200, 400, 500, 1000]), p = ri(2, D / 5), q = ri(2, D / 5), num = (D - p) * (D - q); if (num % D) return null; const ans = D - num / D; if (ans === p + q) return null; return mc(`In a ${D} m race, A beats B by ${p} m and B beats C by ${q} m. By how many metres does A beat C in a ${D} m race?`, `${ans} m`, [`${p + q} m`, `${ans + 1} m`, `${ans - 1} m`, `${Math.abs(p - q) || ans + 2} m`], `When A runs ${D}, B runs ${D - p}. When B runs ${D}, C runs ${D - q}, so when B runs ${D - p}, C runs ${D - q} × ${D - p}/${D} = ${num / D}. A beats C by ${D} − ${num / D} = ${ans} m.`); },
  () => { const r = pick([5, 10, 20]), P = ri(1, 12) * { 5: 8000, 10: 1000, 20: 125 }[r], A = (P * (100 + r) ** 3) / 1e6; if (!Number.isInteger(A)) return null; const ci = A - P, si = (3 * P * r) / 100, ci2 = (P * (100 + r) ** 2) / 1e4 - P; return mc(`What is the compound interest on ₹${P} for 3 years at ${r}% per annum, compounded annually?`, `₹${ci}`, [`₹${si}`, `₹${ci2}`, `₹${ci + si / 3}`, `₹${ci - (P * r * r) / 1e4}`].filter((o) => !o.includes(".")), `Amount = ${P} × (1 + ${r}/100)³ = ₹${A}, so CI = ${A} − ${P} = ₹${ci}.`); },
  () => { const a = ri(6, 30), b = ri(6, 30); if (a === b) return null; const W = lcm(a, b), ra = W / a, rb = W / b; let d = 0, done = 0; for (;;) { const rate = d % 2 ? rb : ra; if (done + rate >= W) break; done += rate; d++; } const rate = d % 2 ? rb : ra, ans = mixed(d * rate + (W - done), rate), tog = mixed(a * b, a + b); return mc(`A can do a job in ${a} days and B in ${b} days. They work on alternate days, with A working on the first day. In how many days will the job be finished?`, `${ans} days`, [`${tog} days`, `${mixed(2 * a * b, a + b)} days`, `${d + 1} days`, `${d} days`, `${mixed(d * rate + (W - done) + rate, rate)} days`].filter((o) => o !== `${ans} days`), `Take the job as ${W} units: A does ${ra} and B ${rb} units a day. After ${d} alternate days ${done} units are done; on day ${d + 1} ${d % 2 ? "B" : "A"} finishes the remaining ${W - done} units in ${mixed(W - done, rate)} day. Total ${ans} days.`); },
  () => { const a = ri(3, 12), b = ri(a + 1, 3 * a), num = a * b, den = b - a; if (num % den) return null; const t = num / den; return mc(`A pipe can fill a tank in ${a} hours. Because of a leak at the bottom, it takes ${b} hours to fill. In how many hours can the leak alone empty the full tank?`, `${t} hours`, [`${b - a} hours`, `${mixed(a * b, a + b)} hours`, `${t + a} hours`, `${Math.max(1, t - a)} hours`], `Leak rate = 1/${a} − 1/${b} = ${den}/${num} = 1/${t} of the tank per hour, so ${t} hours.`); },
  () => { const n = pick([5, 6, 7]), A = ri(18, 34), k = ri(2, 9), num = n * A - n * k; if (num % (n - 1)) return null; const ans = num / (n - 1); return mc(`The average age of a family of ${n} is ${A} years. The youngest member is ${k} years old. What was the average age of the family just before the youngest member was born?`, `${ans} years`, [`${mixed(n * A - k, n - 1)} years`, `${A - k} years`, `${ans + 1} years`, `${mixed(n * A, n - 1)} years`], `Today the total is ${n} × ${A} = ${n * A}. ${k} years ago the other ${n - 1} were ${k} years younger each and the youngest was not born: ${n * A} − ${k} − ${n - 1} × ${k} = ${num}. Average = ${num} ÷ ${n - 1} = ${ans} years.`); },
  () => { const [u, v, w] = sample([10, 12, 15, 20, 24, 30, 36, 40, 45, 60], 3), num = 3 * u * v * w, den = u * v + v * w + u * w; if (num % den) return null; const ans = num / den; return mc(`A convoy covers three equal stretches of a road at ${u} km/h, ${v} km/h and ${w} km/h. What is its average speed for the whole journey?`, `${ans} km/h`, [`${mixed(u + v + w, 3)} km/h`, `${ans + 2} km/h`, `${ans - 2} km/h`, `${mixed(2 * u * w, u + w)} km/h`], `For three equal distances the average speed is 3uvw/(uv + vw + uw) = ${num}/${den} = ${ans} km/h — not the plain average of the speeds.`); },
  () => { const L = ri(5, 30) * 10, V = ri(8, 20) * 5, w1 = ri(2, 8), w2 = ri(2, 8), t1 = (L * 18) / ((V - w1) * 5), t2 = (L * 18) / ((V + w2) * 5); if (!Number.isInteger(t1) || !Number.isInteger(t2) || t1 === t2) return null; return mc(`A train passes a man walking at ${w1} km/h in the same direction in ${t1} seconds, and another man walking at ${w2} km/h towards it in ${t2} seconds. What is the speed of the train?`, `${V} km/h`, [`${V + w1} km/h`, `${V - w2} km/h`, `${V + 5} km/h`, `${V + w2} km/h`], `The train's length is the same both times: (V − ${w1}) × ${t1} = (V + ${w2}) × ${t2}, giving V = (${w1} × ${t1} + ${w2} × ${t2}) / (${t1} − ${t2}) = ${V} km/h (length ${L} m).`); },
  () => { const p = ri(2, 6), q = ri(p + 1, 9), m = pick([2, 3]), t = ri(4, 15); if (gcd(p, q) !== 1 || m * p <= q) return null; const num = t * (m - 1), den = m * p - q; if (num % den) return null; const x = num / den; if (p * x <= t) return null; return mc(`The present ages of A and B are in the ratio ${p} : ${q}. ${t} years ago, B was ${m === 2 ? "twice" : "three times"} as old as A. What is the sum of their present ages?`, `${(p + q) * x} years`, [`${(p + q) * x + 2 * t} years`, `${(p + q) * (x + 1)} years`, `${(p + q) * x - t} years`, `${q * x} years`], `Let the ages be ${p}x and ${q}x: ${q}x − ${t} = ${m}(${p}x − ${t}) gives x = ${x}, so A = ${p * x}, B = ${q * x} and the sum is ${(p + q) * x}.`); },
  () => { const x = pick([20, 25, 30, 40, 50, 60]), d1 = pick([10, 20, 25]), d2 = pick([10, 20, 25]), num = (100 + x) * (100 - d1) * (100 - d2); if (num % 10000) return null; const p = num / 10000 - 100; if (!p) return null; const lbl = (v) => (v > 0 ? `${v}% profit` : `${-v}% loss`); return mc(`A trader marks his goods ${x}% above cost price and then allows two successive discounts of ${d1}% and ${d2}%. What is his overall profit or loss?`, lbl(p), [lbl(x - d1 - d2 || 1), lbl(-p), lbl(p + 2), lbl(p - 3)], `Selling price = cost × ${(100 + x) / 100} × ${(100 - d1) / 100} × ${(100 - d2) / 100} = ${num / 10000}% of cost, i.e. ${lbl(p)}.`); },
];

// ================= CLOCKS & CALENDARS =================
const hm = (h, m) => `${h}:${String(m).padStart(2, "0")}`;
const angleAt = (h, m) => { const a = Math.abs(30 * (h % 12) - 5.5 * m); return a > 180 ? 360 - a : a; };
function clockHard() {
  const t = pick(["angleTime", "angleTime", "watch", "rightAngles", "mirrorAngle", "trueTime"]);
  if (t === "angleTime") {
    // 5.5m ≡ 30H ± θ (mod 360); c = 11m, so c = 2(30H ± θ + 360k) for 0 ≤ m < 60.
    const H = ri(1, 11), th = pick([30, 60, 90, 120, 150]), sols = [];
    for (const sg of [-1, 1]) for (const k of [-1, 0, 1]) { const x = 30 * H + sg * th + 360 * k; if (2 * x >= 0 && 2 * x < 660) sols.push([2 * x, sg, k]); }
    sols.sort((a, b) => a[0] - b[0]); const c = sols.map((z) => z[0]);
    if (!c.length) return null;
    const [, sg0, k0] = sols[0], expr = `${30 * H} ${sg0 > 0 ? "+" : "−"} ${th}${k0 ? ` ${k0 > 0 ? "+" : "−"} 360` : ""}`;
    const f = (num) => `${H}:${String(Math.floor(num / 11)).padStart(2, "0")}${num % 11 ? ` ${num % 11}/11` : ""}`;
    const ans = f(c[0]);
    return mc(`At what time between ${H} and ${H + 1} o'clock are the hands of a clock ${th}° apart for the first time?`, ans, [c[1] !== undefined ? f(c[1]) : f(c[0] + 22), f(c[0] + 11), f(Math.max(0, c[0] - 11)), `${H}:${String(Math.round(((30 * H + th) / 6) % 60)).padStart(2, "0")}`], `At ${H}:00 the minute hand is ${30 * H}° behind the hour hand and gains 5.5° per minute. They are first ${th}° apart when 5.5m = ${expr}, i.e. m = ${mixed(c[0], 11)} minutes past ${H}.`);
  }
  if (t === "watch") {
    const s = ri(2, 10), f = ri(2, 12), H = pick([24, 30, 36, 40, 48, 50, 54, 60]), mins = (H * 60 * s) / (s + f); if (!Number.isInteger(mins)) return null;
    const DN = ["Monday", "Tuesday", "Wednesday", "Thursday"], at = (m) => `${fmtClock((720 + m) % 1440)} on ${DN[Math.floor((720 + m) / 1440)]}`;
    const ans = at(mins);
    return mc(`A watch that gains time uniformly was ${s} minutes slow at noon on Monday and ${f} minutes fast at ${at(H * 60)}. When did it show the correct time?`, ans, [at((H * 60 * f) / (s + f)), at(mins + 60), at(H * 30), at(Math.max(0, mins - 60))], `In ${H} hours it gains ${s} + ${f} = ${s + f} minutes. It is correct once it has gained ${s} minutes: ${H} × ${s}/${s + f} = ${mixed(mins, 60)} hours after noon on Monday, i.e. ${ans}.`);
  }
  if (t === "rightAngles") {
    const a = pick([1, 2, 4, 5, 7, 8, 10]), b = a + ri(2, 5); if (b > 12 || [3, 9].includes(b % 12)) return null;
    let cnt = 0; for (let k = 0; k < 44; k++) { const m = (90 + 180 * k) / 5.5; if (m > a * 60 && m < b * 60) cnt++; }
    return mc(`How many times are the hands of a clock at right angles between ${a} o'clock and ${b} o'clock?`, cnt, nearNums(cnt, [(b - a) * 2, (b - a) * 2 - 2]), `The hands are at right angles twice in almost every hour, but between 2 and 4 (and 8 and 10) one of those moments is exactly 3:00 (or 9:00), so those stretches give 3 instead of 4. Counting the moments between ${a}:00 and ${b}:00 gives ${cnt}.`);
  }
  if (t === "mirrorAngle") {
    const h = ri(1, 12), m = pick([10, 20, 25, 35, 40, 50]), tot = (720 - (h % 12) * 60 - m + 720) % 720, ah = Math.floor(tot / 60) || 12, am = tot % 60, a = angleAt(ah, am);
    return mc(`In a mirror, a clock appears to show ${hm(h, m)}. What is the angle between the hands at the actual time?`, `${a}°`, [angleAt(h, m), a + 30, Math.abs(a - 15), a + 7.5].filter((z) => z !== a && z <= 180).map((z) => `${z}°`), `Actual time = 11:60 − ${hm(h, m)} = ${hm(ah, am)}. Angle = |30 × ${ah % 12} − 5.5 × ${am}|, taking the smaller side = ${a}°.`);
  }
  const g = pick([2, 3, 4, 5, 6]), h0 = ri(6, 9), real = ri(4, 12) * 60, shown = (real * (60 + g)) / 60; if (!Number.isInteger(shown)) return null;
  return mc(`A clock gains ${g} minutes every hour. It was set right at ${h0}:00 am. What is the correct time when it shows ${fmtClock(h0 * 60 + shown)}?`, fmtClock(h0 * 60 + real), [fmtClock(h0 * 60 + shown - Math.round((shown * g) / 60)), fmtClock(h0 * 60 + real - g), fmtClock(h0 * 60 + real + g), fmtClock(h0 * 60 + shown - g)], `The clock runs ${60 + g} minutes for every 60 real minutes. It has run ${shown} minutes, so real time elapsed = ${shown} × 60/${60 + g} = ${real} minutes: ${fmtClock(h0 * 60 + real)}.`);
}
function calendarHard() {
  const t = pick(["old", "old", "nth", "offsets", "after", "same", "same"]);
  if (t === "same") {
    const isLeap = (Y) => (Y % 4 === 0 && Y % 100 !== 0) || Y % 400 === 0, y = ri(1990, 2090);
    let z = y, odd = 0; do { odd += isLeap(z) ? 2 : 1; z++; } while (odd % 7 || isLeap(z) !== isLeap(y));
    return mc(`Which is the first year after ${y} that will have exactly the same calendar as ${y}?`, z, [y + 28, y + 6, y + 11, y + 5, z + 1].filter((v) => v !== z), `Two years share a calendar when the first starts on the same weekday and both are ${isLeap(y) ? "leap" : "non-leap"} years. Adding odd days from ${y} (1 for an ordinary year, 2 for a leap year) first gives a multiple of 7 at a ${isLeap(y) ? "leap" : "non-leap"} year in ${z} (${odd} odd days = ${odd / 7} weeks).`);
  }
  if (t === "old") {
    const y = ri(1700, 2099), m = ri(0, 11), d = ri(1, 28), date = new Date(Date.UTC(y, m, d)), w = date.getUTCDay();
    const Y = y - 1, centOdd = [0, 5, 3, 1][Math.floor((Y % 400) / 100)], rem = Y % 100, remLeap = Math.floor(rem / 4), remOdd = (rem + remLeap) % 7;
    const leap = (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0, ml = [31, leap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], monOdd = ml.slice(0, m).reduce((a, b) => a + b, 0) % 7;
    const total = centOdd + remOdd + monOdd + d;
    if (total % 7 !== w) return null; // the odd-days working must agree with the real calendar
    return mc(`What day of the week was ${fmtDate(date)}?`, DAYS[w], [DAYS[(w + 1) % 7], DAYS[(w + 6) % 7], DAYS[(w + 2) % 7], DAYS[(w + 5) % 7]], `Count odd days: the first ${Y - rem} years give ${centOdd}; the next ${rem} years (${remLeap} of them leap) give ${remOdd}; the months before ${MONTHS[m]} give ${monOdd}; plus ${d} days. Total ${total}, and ${total} mod 7 = ${w} → ${DAYS[w]} (0 = Sunday).`);
  }
  if (t === "nth") {
    const k1 = ri(1, 3), wd1 = ri(0, 6), date1 = ri(1, 7) + (k1 - 1) * 7, first = (((wd1 - (date1 - 1)) % 7) + 7) % 7, wd2 = ri(0, 6), last = rnd() < 0.5, k2 = ri(2, 4);
    if (wd1 === wd2) return null;
    const firstW2 = 1 + ((wd2 - first + 7) % 7); let ans = firstW2;
    if (last) while (ans + 7 <= 31) ans += 7; else ans = firstW2 + (k2 - 1) * 7;
    return mc(`In a 31-day month, the ${ord(k1)} ${DAYS[wd1]} falls on the ${ord(date1)}. On which date does the ${last ? "last" : ord(k2)} ${DAYS[wd2]} fall?`, ord(ans), [ord(ans > 7 ? ans - 7 : ans + 7), ord(ans + 1), ord(ans - 1), ord(ans + 2)], `The ${ord(k1)} ${DAYS[wd1]} is the ${ord(date1)}, so the 1st is a ${DAYS[first]}. The first ${DAYS[wd2]} is the ${ord(firstW2)}, so the ${last ? "last" : ord(k2)} one is the ${ord(ans)}.`);
  }
  if (t === "offsets") {
    const w = ri(0, 6), n = ri(40, 400), today = (w + 5) % 7, ans = (((today - 1 - n) % 7) + 7) % 7;
    return mc(`If the day after tomorrow is ${DAYS[w]}, what day of the week was it ${n} days before yesterday?`, DAYS[ans], [DAYS[(ans + 1) % 7], DAYS[(ans + 6) % 7], DAYS[(((w - n) % 7) + 7) % 7], DAYS[(ans + 3) % 7]], `Today is ${DAYS[today]}, so yesterday was ${DAYS[(today + 6) % 7]}. ${n} = 7 × ${Math.floor(n / 7)} + ${n % 7}, so go back ${n % 7} more days: ${DAYS[ans]}.`);
  }
  const d0 = new Date(Date.UTC(ri(2026, 2032), ri(0, 11), ri(1, 28))), n = ri(60, 250), d1 = new Date(+d0 + n * DAY);
  return mc(`What will be the date ${n} days after ${fmtDate(d0)}?`, fmtDate(d1), [fmtDate(new Date(+d1 + DAY)), fmtDate(new Date(+d1 - DAY)), fmtDate(new Date(+d1 + 2 * DAY)), fmtDate(new Date(+d1 - 2 * DAY))], `Count the remaining days of ${MONTHS[d0.getUTCMonth()]}, then whole months, until ${n} days are used up: ${fmtDate(d1)}.`);
}

// ================= SYLLOGISMS (Venn-model solver) =================
const TERMS = [["pens", "pen"], ["books", "book"], ["chairs", "chair"], ["tables", "table"], ["cadets", "cadet"], ["athletes", "athlete"], ["swimmers", "swimmer"], ["pilots", "pilot"], ["doctors", "doctor"], ["teachers", "teacher"], ["singers", "singer"], ["dancers", "dancer"], ["cars", "car"], ["trucks", "truck"], ["trees", "tree"], ["flowers", "flower"], ["birds", "bird"], ["rivers", "river"], ["stones", "stone"], ["clouds", "cloud"], ["boxes", "box"], ["bottles", "bottle"], ["lamps", "lamp"], ["shirts", "shirt"], ["rings", "ring"], ["coins", "coin"], ["bats", "bat"], ["balls", "ball"], ["phones", "phone"], ["watches", "watch"], ["painters", "painter"], ["writers", "writer"], ["soldiers", "soldier"], ["sailors", "sailor"], ["engineers", "engineer"], ["farmers", "farmer"], ["roads", "road"], ["bridges", "bridge"], ["cups", "cup"], ["plates", "plate"], ["officers", "officer"], ["runners", "runner"]];
const art = (s) => (/^[aeiou]/.test(s) ? "an " : "a ") + s;
const VENN = {};
function venn(T) {
  if (VENN[T]) return VENN[T];
  const R = (1 << T) - 1, M = 1 << R, ab = new Uint8Array(M * T * T), anb = new Uint8Array(M * T * T), ok = new Uint8Array(M);
  for (let m = 1; m < M; m++) {
    let has = 0;
    for (let r = 1; r <= R; r++) if ((m >> (r - 1)) & 1) { has |= r; for (let a = 0; a < T; a++) if ((r >> a) & 1) for (let b = 0; b < T; b++) ((r >> b) & 1 ? ab : anb)[(m * T + a) * T + b] = 1; }
    ok[m] = has === R ? 1 : 0; // every term is non-empty
  }
  return (VENN[T] = { M, ab, anb, ok, T });
}
const holds = (V, m, [k, a, b]) => { const i = (m * V.T + a) * V.T + b; return k === "all" ? !V.anb[i] : k === "no" ? !V.ab[i] : k === "some" ? !!V.ab[i] : k === "few" ? !!V.ab[i] && !!V.anb[i] : !!V.anb[i]; };
const OPTS5 = ["Only I follows", "Only II follows", "Either I or II follows", "Neither I nor II follows", "Both I and II follow"];
const COMP = { some: "no", no: "some", all: "somenot", somenot: "all" };
function syllogismHard() {
  const T = pick([4, 4, 4, 3]), V = venn(T), terms = sample(TERMS, T), want = ri(0, 4);
  for (let tries = 0; tries < 400; tries++) {
    const st = [];
    for (let i = 0; i < T - 1; i++) { const k = pick(["all", "all", "all", "some", "few", "few", "no", "no", "somenot"]); st.push(rnd() < 0.5 ? [k, i, i + 1] : [k, i + 1, i]); }
    const models = []; for (let m = 1; m < V.M; m++) if (V.ok[m] && st.every((s) => holds(V, m, s))) models.push(m);
    if (!models.length) continue;
    const mkC = () => { const [a, b] = sample([...Array(T).keys()], 2); return { k: pick(["all", "some", "no", "somenot", "all", "some", "few"]), a, b, poss: rnd() < 0.4 }; };
    const c1 = mkC(); let c2 = mkC();
    if (want === 2 || rnd() < 0.15) { if (c1.k === "few") c1.k = "some"; c1.poss = false; c2 = { k: COMP[c1.k], a: c1.a, b: c1.b, poss: false }; }
    if ([c1, c2].some((c) => !c.poss && st.some(([k, a, b]) => k === c.k && a === c.a && b === c.b))) continue; // no free marks for restating a premise
    const follows = (c) => (c.poss ? models.some((m) => holds(V, m, [c.k, c.a, c.b])) : models.every((m) => holds(V, m, [c.k, c.a, c.b])));
    const f1 = follows(c1), f2 = follows(c2);
    const comp = !c1.poss && !c2.poss && c1.a === c2.a && c1.b === c2.b && COMP[c1.k] === c2.k;
    const ans = f1 && f2 ? 4 : f1 ? 0 : f2 ? 1 : comp ? 2 : 3;
    if (ans !== want) continue;
    const say = ([k, a, b]) => ({ all: `All ${terms[a][0]} are ${terms[b][0]}`, some: `Some ${terms[a][0]} are ${terms[b][0]}`, few: `Only a few ${terms[a][0]} are ${terms[b][0]}`, no: `No ${terms[a][1]} is ${art(terms[b][1])}`, somenot: `Some ${terms[a][0]} are not ${terms[b][0]}` })[k];
    const sayC = (c) => (c.poss ? `It is possible that ${say([c.k, c.a, c.b]).replace(/^./, (x) => x.toLowerCase())}` : say([c.k, c.a, c.b]));
    const why = (c, f, n) => (c.poss ? (f ? `${n} is a possibility — nothing in the statements rules it out.` : `${n} is not possible — the statements rule it out.`) : f ? `${n} follows — every arrangement the statements allow makes it true.` : `${n} does not follow — the statements allow an arrangement in which it is false.`);
    const fewNote = st.some((x) => x[0] === "few") || [c1, c2].some((c) => c.k === "few") ? " (\"Only a few A are B\" means some A are B and some A are not B.)" : "";
    const either = ans === 2 ? " But I and II are complementary — exactly one of them must be true — so either I or II follows." : "";
    return { q: `Statements: ${st.map(say).join(". ")}. Conclusions: I. ${sayC(c1)}. II. ${sayC(c2)}.`, options: OPTS5, answer: ans, explanation: `${why(c1, f1, "I")} ${why(c2, f2, "II")}${either}${fewNote}` };
  }
  return null;
}

// ================= DICE & CUBES =================
const MATCHINGS = (() => { const out = []; const rec = (rest, acc) => { if (!rest.length) return out.push(acc); const [a, ...r] = rest; r.forEach((b, i) => rec(r.filter((_, j) => j !== i), [...acc, [a, b]])); }; rec([0, 1, 2, 3, 4, 5], []); return out; })();
const COLOURS = ["Red", "Blue", "Green", "Yellow", "White", "Black"];
function dice() {
  const numbers = rnd() < 0.6, faces = numbers ? ["1", "2", "3", "4", "5", "6"] : COLOURS, perm = shuffle([0, 1, 2, 3, 4, 5]);
  const pairs = [[perm[0], perm[1]], [perm[2], perm[3]], [perm[4], perm[5]]], nv = pick([2, 3, 3]);
  const views = Array.from({ length: nv }, () => shuffle(pairs.map((p) => pick(p))));
  if (new Set(views.map((v) => [...v].sort().join())).size < nv) return null;
  const consistent = MATCHINGS.filter((mt) => views.every((v) => !mt.some(([a, b]) => v.includes(a) && v.includes(b))));
  const x = ri(0, 5), partner = (mt) => { const p = mt.find((q) => q.includes(x)); return p[0] === x ? p[1] : p[0]; };
  const partners = new Set(consistent.map(partner));
  if (partners.size !== 1 || !views.some((v) => v.includes(x))) return null;
  const y = [...partners][0], adj = new Set(views.filter((v) => v.includes(x)).flat().filter((f) => f !== x));
  if (adj.size === 4 && rnd() < 0.5) return null; // prefer ones that need elimination
  const forced = pairs.filter((p) => !p.includes(x) && consistent.every((mt) => mt.some((q) => q.includes(p[0]) && q.includes(p[1]))));
  const adjY = new Set(views.filter((v) => v.includes(y)).flat().filter((f) => f !== y));
  const how = adjY.size === 4 && adj.size < 4 ? `${faces[x]} appears next to ${list([...adj].map((f) => faces[f]))}. ${faces[y]} is seen next to ${list([...adjY].map((f) => faces[f]))} — every face except ${faces[x]} — so ${faces[y]} and ${faces[x]} must be opposite.` : adj.size === 4 ? `${faces[x]} appears next to ${list([...adj].map((f) => faces[f]))}, so none of these can be opposite it; only ${faces[y]} remains.` : `${faces[x]} appears next to ${list([...adj].map((f) => faces[f]))}.${forced.length ? ` The views also force ${forced.map(([a, b]) => `${faces[a]} opposite ${faces[b]}`).join(" and ")}.` : ""} The only face left for ${faces[x]} is ${faces[y]}.`;
  return mc(`${nv === 2 ? "Two" : "Three"} views of the same die each show three faces meeting at a corner: ${views.map((v) => `(${v.map((f) => faces[f]).join(", ")})`).join(", ")}. Which ${numbers ? "number" : "colour"} is opposite ${faces[x]}?`, faces[y], shuffle([0, 1, 2, 3, 4, 5].filter((f) => f !== x && f !== y)).map((f) => faces[f]), `Faces seen together are adjacent, so they cannot be opposite. ${how}`);
}
function colouredCube() {
  const cub = rnd() < 0.6, n = ri(3, 6), [A, B, C] = cub ? [ri(3, 7), ri(3, 7), ri(3, 7)] : [n, n, n], scheme = pick(["opp3", "all6", "partial", "adjPairs"]);
  if (cub && new Set([A, B, C]).size < 2) return null;
  const [c1, c2, c3, c4, c5] = sample(COLOURS.filter((c) => c !== "White"), 5), c6 = "White";
  const col = { opp3: { top: c1, bottom: c1, front: c2, back: c2, left: c3, right: c3 }, all6: { top: c1, bottom: c2, front: c3, back: c4, left: c5, right: c6 }, partial: { top: c1, bottom: c1, front: c2, back: null, left: null, right: null }, adjPairs: { top: c1, front: c1, bottom: c2, back: c2, left: c3, right: c3 } }[scheme];
  const desc = { opp3: `${c1} on the top and bottom, ${c2} on the front and back, and ${c3} on the left and right faces`, all6: `a different colour on each face — top ${c1}, bottom ${c2}, front ${c3}, back ${c4}, left ${c5}, right ${c6}`, partial: `${c1} on the top and bottom and ${c2} on the front, leaving the other three faces unpainted`, adjPairs: `${c1} on the top and front, ${c2} on the bottom and back, and ${c3} on the left and right faces` }[scheme];
  const cubes = [];
  for (let x = 0; x < A; x++) for (let y = 0; y < B; y++) for (let z = 0; z < C; z++) {
    const hitFaces = [[z === C - 1, col.top], [z === 0, col.bottom], [y === 0, col.front], [y === B - 1, col.back], [x === 0, col.left], [x === A - 1, col.right]].filter(([on, c]) => on && c).map(([, c]) => c);
    const ext = [[x, A], [y, B], [z, C]].filter(([v, m]) => v === 0 || v === m - 1).length;
    cubes.push({ s: new Set(hitFaces), faces: hitFaces.length, kind: ["inner", "face-centre", "edge", "corner"][ext] });
  }
  const colours = [...new Set(Object.values(col).filter(Boolean))];
  const qs = [
    () => { const [a, b] = sample(colours, 2); return [`exactly two painted faces, one ${a} and one ${b}`, (c) => c.faces === 2 && c.s.has(a) && c.s.has(b)]; },
    () => { const a = pick(colours); return [`${a} paint and no other colour`, (c) => c.s.size === 1 && c.s.has(a)]; },
    () => [`no paint at all`, (c) => c.faces === 0],
    () => [`exactly three painted faces`, (c) => c.faces === 3],
    () => { const [a, b] = sample(colours, 2); return [`${a} paint but no ${b} paint`, (c) => c.s.has(a) && !c.s.has(b)]; },
    () => [`paint of at least two different colours`, (c) => c.s.size >= 2],
  ];
  const [label, test] = pick(qs)(), hit = cubes.filter(test), ans = hit.length; if (!ans) return null;
  const parts = ["corner", "edge", "face-centre", "inner"].map((k) => [k, hit.filter((c) => c.kind === k).length]).filter(([, v]) => v).map(([k, v]) => `${v} ${k}`);
  const others = qs.map((q) => cubes.filter(q()[1]).length).filter((v) => v !== ans);
  const [ia, ib, ic] = [A - 2, B - 2, C - 2], solid = cub ? `A cuboid ${A} cm long (left to right), ${B} cm wide (front to back) and ${C} cm high` : `A cube of side ${n} cm`;
  return mc(`${solid} is painted with ${desc}. It is then cut into 1 cm cubes. How many small cubes have ${label}?`, ans, nearNums(ans, others, Math.max(1, Math.min(ia, ib, ic))), `Of the ${A * B * C} small cubes (8 corner, ${4 * (ia + ib + ic)} edge, ${2 * (ia * ib + ib * ic + ia * ic)} face-centre, ${ia * ib * ic} inner), the ones with ${label} are: ${parts.join(" + ")} = ${ans}.`);
}

// ================= ALPHABET & WORDS =================
function alphabetHard() {
  let arr = [...AZ]; const done = [];
  const OPS = {
    rev: ["the alphabet is written in reverse order", (a) => [...a].reverse()],
    firstHalf: ["the first half (A–M) is written in reverse order", (a) => (a.length === 26 ? [...a.slice(0, 13).reverse(), ...a.slice(13)] : null)],
    secondHalf: ["the second half (N–Z) is written in reverse order", (a) => (a.length === 26 ? [...a.slice(0, 13), ...a.slice(13).reverse()] : null)],
    vowels: ["all the vowels are removed", (a) => a.filter((c) => !VOW.includes(c))],
    third: ["every third letter (counting from the left) is removed", (a) => a.filter((_, i) => (i + 1) % 3)],
    alt: ["every second letter (counting from the left) is removed", (a) => a.filter((_, i) => i % 2 === 0)],
  };
  for (const k of sample(Object.keys(OPS), pick([1, 2, 2]))) { const r = OPS[k][1](arr); if (!r) return null; arr = r; done.push(OPS[k][0]); }
  const n = arr.length, t = ri(0, 2);
  let q, idx, how;
  if (t === 0) { const m = ri(2, Math.floor(n / 2)), k = ri(2, n - m); idx = m - 1 + k; if (idx >= n) return null; q = `which letter is ${ord(k)} to the right of the ${ord(m)} letter from the left`; how = `the ${ord(m)} letter from the left is ${arr[m - 1]}; ${k} places to its right is ${arr[idx]}`; }
  else if (t === 1) { const m = ri(2, Math.floor(n / 2)), k = ri(2, n - m); idx = n - m - k; if (idx < 0) return null; q = `which letter is ${ord(k)} to the left of the ${ord(m)} letter from the right`; how = `the ${ord(m)} letter from the right is ${arr[n - m]}; ${k} places to its left is ${arr[idx]}`; }
  else { const a = ri(1, Math.floor(n / 2)), b = ri(1, Math.floor(n / 2)), i1 = a - 1, i2 = n - b; if ((i2 - i1) % 2 || i2 - i1 < 4) return null; idx = (i1 + i2) / 2; q = `which letter is exactly midway between the ${ord(a)} letter from the left and the ${ord(b)} letter from the right`; how = `those are ${arr[i1]} and ${arr[i2]}; the letter midway is ${arr[idx]}`; }
  const ans = arr[idx];
  return mc(`If ${done.join(" and then ")}, ${q}?`, ans, [arr[idx + 1], arr[idx - 1], AZ[idx], arr[idx + 2], arr[idx - 2]].filter(Boolean), `After the changes the sequence is ${arr.join(" ")}. ${how[0].toUpperCase() + how.slice(1)}.`);
}
const CLUSTERS = [["CONSTANT", "CONSTRAIN", "CONSTRUCT", "CONSTABLE", "CONSTELLATION", "CONSULT"], ["DISCIPLINE", "DISCIPLE", "DISCOUNT", "DISCOVER", "DISCREET", "DISCLOSE"], ["PREVAIL", "PREVENT", "PREVIOUS", "PREVIEW", "PRESENT", "PRESERVE"], ["COMPETE", "COMPETENT", "COMPLETE", "COMPLEX", "COMPLAIN", "COMPLY"], ["INTEREST", "INTERIOR", "INTERVAL", "INTERNAL", "INTERN", "INTERVIEW"], ["MANAGE", "MANDATE", "MANGO", "MANIFEST", "MANNER", "MANOEUVRE"], ["STRAIN", "STRAIGHT", "STRAND", "STRANGE", "STRATEGY", "STREAM"], ["PARADE", "PARADOX", "PARAGON", "PARALLEL", "PARAMOUNT", "PARAPET"], ["SOLDIER", "SOLDER", "SOLEMN", "SOLICIT", "SOLID", "SOLITARY"], ["BATTALION", "BATTERY", "BATTLE", "BATTEN", "BATTER", "BATTING"], ["REGIMENT", "REGIME", "REGION", "REGISTER", "REGRET", "REGULAR"], ["ARTICLE", "ARTIFACT", "ARTILLERY", "ARTISAN", "ARTIST", "ARTLESS"], ["COMMAND", "COMMANDO", "COMMENCE", "COMMEND", "COMMENT", "COMMERCE"], ["TRANSFER", "TRANSFORM", "TRANSIT", "TRANSLATE", "TRANSMIT", "TRANSPORT"], ["CERTAIN", "CERTIFY", "CERTIFICATE", "CERTITUDE", "CERAMIC", "CEREAL"], ["PERMANENT", "PERMIT", "PERMEATE", "PERSIST", "PERSON", "PERSUADE"], ["ACCOUNT", "ACCURATE", "ACCUSE", "ACCUSTOM", "ACCORD", "ACCOMPANY"], ["MISSILE", "MISSION", "MISSIVE", "MISTAKE", "MISTRESS", "MISTRUST"], ["DEFEND", "DEFENCE", "DEFER", "DEFIANT", "DEFICIT", "DEFINE"], ["CONTAIN", "CONTEMPT", "CONTEND", "CONTENT", "CONTEST", "CONTEXT"]];
const LONGWORDS = "CAPTAIN LIEUTENANT BATTALION REGIMENT ARTILLERY INFANTRY CAVALRY DISCIPLINE LEADERSHIP STRATEGY SQUADRON CORPORAL SERGEANT GENERATION CHAMPION MOUNTAIN KNOWLEDGE MANAGEMENT EDUCATION DYNAMIC HOSPITAL FRIENDSHIP BEAUTIFUL MOTIVATE PATIENCE INTEGRITY LOYALTY GALLANTRY SENTINEL TERRITORY PERIMETER CAMOUFLAGE AMMUNITION PARACHUTE HELICOPTER SUBMARINE DESTROYER FRIGATE CORVETTE AIRCRAFT COCKPIT BLUEPRINT HORIZON CHEMISTRY PHYSICS HISTORY GEOGRAPHY LANGUAGE NOTEBOOK UNIVERSE TELESCOPE MONSOON FESTIVAL HARVEST".split(" ");
function wordHard() {
  const t = pick(["dict", "dict", "gap", "vc"]);
  if (t === "dict") {
    const ws = sample(pick(CLUSTERS), 5), sorted = [...ws].sort(), k = ri(1, 4);
    return mc(`If these words are arranged in dictionary order, which comes ${k === 4 ? "last" : ord(k + 1)}? ${list(ws.map(title))}`, title(sorted[k]), ws.filter((w) => w !== sorted[k]).map(title), `Dictionary order: ${sorted.map(title).join(", ")}.`);
  }
  const w = pick(LONGWORDS);
  if (t === "gap") {
    const pairs = []; for (let i = 0; i < w.length; i++) for (let j = i + 1; j < w.length; j++) if (j - i === Math.abs(pos(w[j]) - pos(w[i]))) pairs.push(w[i] + w[j]);
    return mc(`How many pairs of letters in the word ${w} have as many letters between them in the word as in the English alphabet (in either direction)?`, pairs.length, nearNums(pairs.length, [pairs.length + 1]).filter((x) => x >= 0), pairs.length ? `The pairs are ${list(pairs)} — ${pairs.length} in all.` : "Checking every pair, none qualifies.");
  }
  const nw = [...w].map((c) => shift(c, VOW.includes(c) ? 1 : -1)).join(""), rep = [...new Set(nw)].filter((c) => nw.split(c).length > 2);
  return mc(`In the word ${w}, each vowel is replaced by the next letter of the alphabet and each consonant by the previous letter. How many different letters appear more than once in the new word?`, rep.length, nearNums(rep.length, [[...new Set(w)].filter((c) => w.split(c).length > 2).length]).filter((x) => x >= 0), `The new word is ${nw}. ${rep.length ? `Letters that repeat: ${list(rep)}.` : "No letter repeats."}`);
}

// ================= BANKS =================
const fromBank = (r) => mc(r[0], r[1], r.slice(2, 5), r[5]);
const oddFromBank = (r) => mc("Which one does not belong with the others?", r[3], r.slice(0, 3), r[4]);
function vocabFromBank([head, ...o]) {
  const kind = head[0], text = head.slice(2);
  if (kind === "S") return mc(`Choose the word nearest in meaning to ${text}.`, o[0], o.slice(1), `${title(text)} means ${o[0].toLowerCase()}. Watch for look-alike traps among the options.`);
  if (kind === "A") return mc(`Choose the word most opposite in meaning to ${text}.`, o[0], o.slice(1), `${title(text)} is the opposite of ${o[0].toLowerCase()}; the other options are close in meaning or unrelated.`);
  return mc(`Choose the one word for: "${text}"`, o[0], o.slice(1), `${o[0]}: ${text.toLowerCase()}.`);
}
function statementFromBank([kind, q, ans, why]) {
  const options = kind === "A" ? ["Only I is implicit", "Only II is implicit", "Both are implicit", "Neither is implicit"] : kind === "R" ? ["Only argument I is strong", "Only argument II is strong", "Both I and II are strong", "Neither I nor II is strong"] : ["Only I follows", "Only II follows", "Both follow", "Neither follows"];
  return { q, options, answer: Number(ans), explanation: why };
}

// ---------- assembly ----------
const keyOf = (q) => (GENERIC.test(q.q) ? q.q + "|" + [...q.options].sort().join("|") : q.q);
const seen = new Set();
function take(make, label) {
  for (let i = 0; i < 800; i++) { const q = make(); if (!q) continue; const k = keyOf(q); if (seen.has(k)) continue; seen.add(k); return q; }
  throw new Error("could not generate a unique question: " + label);
}
function takeBank(q, label) { if (!q) throw new Error("bad bank row " + label); const k = keyOf(q); if (seen.has(k)) throw new Error("bank question already used: " + q.q); seen.add(k); return q; }
seed(424242);
const B = { analogies: shuffle(bank.analogies), oddWords: shuffle(bank.oddWords), vocab: shuffle(bank.vocab), statements: shuffle(bank.statements) };

function buildTest(n) {
  seed(n * 7919);
  const i = n - FIRST, fams = shuffle(Object.keys(SERIES)), miss = pick(MISSABLE.filter((f) => !fams.slice(0, 4).includes(f)));
  const ar = shuffle(ARITH), qa = Math.ceil(ar.length / 4), arith = (k) => take(() => pick(ar.slice(k * qa, (k + 1) * qa))(), `arith${k}`);
  return [
    take(() => seriesNext(fams[0]), "series1"),
    take(() => seriesNext(fams[1]), "series2"),
    take(() => seriesWrong(fams[2]), "wrong1"),
    take(() => seriesWrong(fams[3]), "wrong2"),
    take(() => seriesMissing(miss), "missing"),
    take(numberMatrix, "matrix"),
    take(letterCluster, "cluster1"),
    take(letterCluster, "cluster2"),
    takeBank(fromBank(B.analogies[i]), `analogy ${i}`),
    take(numberAnalogy, "numAnalogy"),
    take(letterAnalogy, "letterAnalogy"),
    takeBank(oddFromBank(B.oddWords[i]), `odd ${i}`),
    take(oddNumber, "oddNumber"),
    take(oddLetterGroup, "oddLetters"),
    take(coding, "coding1"),
    take(coding, "coding2"),
    take(codeLanguage, "codeLanguage"),
    take(n % 2 ? signSwap : trueEquation, "operators"),
    take(codedInequality, "inequality1"),
    take(codedInequality, "inequality2"),
    take(codedRelation, "codedRelation"),
    take(pointing, "pointing"),
    take(directions, "directions"),
    take(directionsTurns, "turns"),
    take(ranking, "ranking"),
    take(seatingFacing, "seatingFacing"),
    take(seating, "seating"),
    arith(0), arith(1), arith(2), arith(3),
    take(clockHard, "clock"),
    take(calendarHard, "calendar"),
    take(syllogismHard, "syllogism1"),
    take(syllogismHard, "syllogism2"),
    takeBank(statementFromBank(B.statements[i]), `statement ${i}`),
    take(dice, "dice"),
    take(colouredCube, "cuboid"),
    take(n % 3 ? alphabetHard : wordHard, "alphabet"),
    takeBank(vocabFromBank(B.vocab[i]), `vocab ${i}`),
  ];
}
function releaseAt(n) {
  if (n <= LIVE_UNTIL) return null;
  const week = Math.floor((n - LIVE_UNTIL - 1) / PER_WEEK);
  return new Date(Date.parse(FIRST_SUNDAY + "T00:00:00Z") + week * 7 * DAY).toISOString().slice(0, 10) + "T00:00:00+05:30";
}

const J = JSON.stringify;
for (let n = FIRST; n <= LAST; n++) {
  const qs = buildTest(n), rel = releaseAt(n);
  const body = qs.map((q) => `    { q: ${J(q.q)}, options: ${J(q.options).replace(/","/g, '", "')}, answer: ${q.answer}, explanation: ${J(q.explanation)} },`).join("\n");
  fs.writeFileSync(new URL(`oir-${n}.ts`, DIR), `import type { Test } from "./index";

const test: Test = {
  id: "oir-${n}",
  title: "OIR Test ${n}",
  durationMinutes: 25,${rel ? `\n  releaseAt: "${rel}",` : ""}
  questions: [
${body}
  ],
};

export default test;
`);
}
const ids = Array.from({ length: LAST }, (_, k) => k + 1);
fs.writeFileSync(new URL("index.ts", DIR), `// Generated by scripts/gen-oir.mjs — edit the generator or the question files, not this list.
${ids.map((k) => `import oir${k} from "./oir-${k}.js";`).join("\n")}

export type Question = {
  q: string;
  image?: string;      // optional figure, e.g. "/assets/oir/1-q12.png"
  options: string[];
  answer: number;      // index into options
  explanation?: string;
};

export type Test = {
  id: string;
  title: string;
  durationMinutes: number;
  releaseAt?: string;  // ISO time; hidden from students until then. Omit to publish immediately.
  questions: Question[];
};

// Tests past their release time. Order = order in the list below.
export const isLive = (t: Test, now = Date.now()) => !t.releaseAt || Date.parse(t.releaseAt) <= now;

const tests: Test[] = [${ids.map((k) => `oir${k}`).join(", ")}];
export default tests;
`);
console.log(`wrote oir-${FIRST}..oir-${LAST} (${seen.size} unique questions)`);

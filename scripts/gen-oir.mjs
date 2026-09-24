// Generates api/_tests/oir-11.ts … oir-110.ts and api/_tests/index.ts.
//   node scripts/gen-oir.mjs
// Deterministic (seeded per test), so re-running reproduces the same files. Computable question types
// are generated with their answers worked out in code; verbal ones come from scripts/oir-bank.mjs.
// Tests 11–15 go live immediately; 16–110 release five at a time every Sunday 00:00 IST.
import fs from "node:fs";
import * as bank from "./oir-bank.mjs";

const DIR = new URL("../api/_tests/", import.meta.url);
const FIRST = 11, LAST = 110, LIVE_UNTIL = 15, PER_WEEK = 5;
const FIRST_SUNDAY = "2026-09-27"; // first weekly drop

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
const wrap = (p) => ((p - 1 + 260) % 26) + 1;
const sgn = (n) => (n < 0 ? `− ${-n}` : `+ ${n}`);
const ord = (n) => n + (n % 100 >= 11 && n % 100 <= 13 ? "th" : ["th", "st", "nd", "rd"][n % 10] || "th");
const list = (a) => a.join(", ");

// Multiple choice with the correct answer first; wrongs are de-duplicated and the options shuffled.
function mc(q, correct, wrongs, explanation) {
  const bad = (s) => /undefined|NaN|Infinity/.test(s);
  const opts = [String(correct)];
  if (bad(opts[0]) || bad(q) || bad(explanation)) return null;
  for (const w of wrongs) { const s = String(w); if (!opts.includes(s) && !bad(s)) opts.push(s); if (opts.length === 4) break; }
  if (opts.length < 4) return null;
  const options = shuffle(opts);
  return { q, options, answer: options.indexOf(String(correct)), explanation };
}
// Plausible wrong numbers: rule-based mistakes first, then near misses.
const nearNums = (ans, extra = [], step = 1) => [...extra, ...shuffle([ans + step, ans - step, ans + 2 * step, ans - 2 * step, ans + 3 * step, ans + 10, ans - 10])].filter((x) => x !== ans && (ans < 0 || x >= 0));

// ---------- number series ----------
const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113];
const powForms = [
  [(n) => n * n, (n) => `${n}²`, "the squares of consecutive numbers"],
  [(n) => n ** 3, (n) => `${n}³`, "the cubes of consecutive numbers"],
  [(n) => n * n + 1, (n) => `${n}² + 1`, "n² + 1 for consecutive n"],
  [(n) => n * n - 1, (n) => `${n}² − 1`, "n² − 1 for consecutive n"],
  [(n) => n * n + 2, (n) => `${n}² + 2`, "n² + 2 for consecutive n"],
  [(n) => n * n - 2, (n) => `${n}² − 2`, "n² − 2 for consecutive n"],
  [(n) => n ** 3 + 1, (n) => `${n}³ + 1`, "n³ + 1 for consecutive n"],
  [(n) => n ** 3 - 1, (n) => `${n}³ − 1`, "n³ − 1 for consecutive n"],
  [(n) => n * n + n, (n) => `${n} × ${n + 1}`, "n × (n + 1) for consecutive n"],
  [(n) => n ** 3 - n, (n) => `${n}³ − ${n}`, "n³ − n for consecutive n"],
  [(n) => n ** 3 + n, (n) => `${n}³ + ${n}`, "n³ + n for consecutive n"],
  [(n) => 2 * n * n, (n) => `2 × ${n}²`, "twice the square of consecutive numbers"],
];
// Each returns { seq (answer last), expl, extra wrongs } or null. `missing` families can hide a middle term.
const primeIdentity = (p) => `${p}`;
const seriesFamilies = {
  linear() {
    const a = pick([2, 2, 3]), b = pick([-3, -2, -1, 1, 2, 3, 4, 5]), s = ri(2, 9), n = a === 2 ? 6 : 5;
    const seq = [s]; while (seq.length < n) seq.push(seq.at(-1) * a + b);
    if (seq.some((x) => x <= 0)) return null;
    const p = seq.at(-2);
    return { seq, rule: `each term is ${a} times the previous term ${b < 0 ? "minus" : "plus"} ${Math.abs(b)}`, calc: (x) => `${x} × ${a} ${sgn(b)}`, extra: [p * a, p * a + b + a, p * a - b] };
  },
  diffAP() {
    const down = rnd() < 0.3, d = ri(1, 8), k = ri(1, 5), s = down ? ri(120, 250) : ri(1, 30);
    const seq = [s], diffs = []; for (let i = 0; i < 5; i++) { const dd = d + i * k; diffs.push(dd); seq.push(seq.at(-1) + (down ? -dd : dd)); }
    if (seq.some((x) => x < 0)) return null;
    const last = diffs.at(-1), prevd = diffs.at(-2);
    return { seq, rule: `the differences ${down ? "subtracted" : "added"} are ${list(diffs)} — each ${k} more than the last`, calc: (x) => `${x} ${down ? "−" : "+"} ${last}`, extra: [seq.at(-2) + (down ? -prevd : prevd), seq.at(-1) + (down ? -k : k), seq.at(-2) + (down ? -(last + k) : last + k)] };
  },
  powers() {
    const [f, s, desc] = pick(powForms), n0 = ri(1, 10);
    const ns = [0, 1, 2, 3, 4, 5].map((i) => n0 + i), seq = ns.map(f);
    if (seq.some((x) => x < 0) || seq.at(-1) > 5000) return null;
    const n = ns.at(-1);
    return { seq, rule: `the terms are ${desc}`, calc: () => s(n), extra: [f(n) + 1, f(n) - 1, f(n + 1), 2 * seq.at(-2) - seq.at(-3)] };
  },
  geometric() {
    const r = pick([2, 3, 4, 5, 6]), s = ri(1, 15), n = r === 2 ? 6 : 5;
    const seq = [s]; while (seq.length < n) seq.push(seq.at(-1) * r);
    if (seq.at(-1) > 50000) return null;
    if (rnd() < 0.4) { // descending: divide by r
      seq.reverse(); const p = seq.at(-2);
      return { seq, rule: `each term is the previous term divided by ${r}`, calc: (x) => `${x} ÷ ${r}`, extra: [p / r + 1, p - p / r, p / (r + 1)].map(Math.round) };
    }
    const p = seq.at(-2);
    return { seq, rule: `each term is ${r} times the previous term`, calc: (x) => `${x} × ${r}`, extra: [p * (r + 1), p * r + p, p * r - s] };
  },
  alternating() {
    const kind = pick(["mul-add", "add-sub", "mul-sub"]), s = ri(2, 10);
    let a, b, ops;
    if (kind === "mul-add") { a = pick([2, 3]); b = ri(1, 6); ops = [(x) => x * a, (x) => x + b]; }
    else if (kind === "add-sub") { a = ri(5, 15); b = ri(1, a - 1); ops = [(x) => x + a, (x) => x - b]; }
    else { a = pick([2, 3]); b = ri(1, 5); ops = [(x) => x * a, (x) => x - b]; }
    const names = kind === "mul-add" ? [`× ${a}`, `+ ${b}`] : kind === "add-sub" ? [`+ ${a}`, `− ${b}`] : [`× ${a}`, `− ${b}`];
    const seq = [s]; for (let i = 0; i < 6; i++) seq.push(ops[i % 2](seq.at(-1)));
    if (seq.some((x) => x <= 0) || seq.at(-1) > 5000) return null;
    const p = seq.at(-2), wrongOp = ops[1](p) === seq.at(-1) ? ops[0](p) : ops[1](p);
    return { seq, rule: `the operations alternate: ${names[0]}, ${names[1]}, ${names[0]}, ${names[1]} and so on`, calc: (x) => `${x} ${names[5 % 2]}`, extra: [wrongOp, seq.at(-1) + 1, seq.at(-1) - 2] };
  },
  interleaved() {
    const a0 = ri(1, 20), da = ri(2, 9), b0 = ri(30, 90), db = -ri(2, 7);
    const seq = []; for (let i = 0; i < 8; i++) seq.push(i % 2 === 0 ? a0 + (i / 2) * da : b0 + ((i - 1) / 2) * db);
    if (seq.some((x) => x <= 0)) return null;
    return { seq, rule: `two series alternate: ${a0}, ${a0 + da}, ${a0 + 2 * da}, … (+${da}) and ${b0}, ${b0 + db}, ${b0 + 2 * db}, … (${db})`, calc: () => `${seq[5]} − ${-db}`, extra: [seq[6] + da, seq[5] + db * 2, seq[7] - db], nomiss: true };
  },
  diffGeometric() {
    const s = ri(1, 20), d = ri(1, 5), r = pick([2, 3]);
    const seq = [s]; let dd = d; const diffs = []; for (let i = 0; i < 5; i++) { diffs.push(dd); seq.push(seq.at(-1) + dd); dd *= r; }
    const last = diffs.at(-1);
    return { seq, rule: `the differences ${list(diffs)} are each ${r} times the previous difference`, calc: (x) => `${x} + ${last}`, extra: [seq.at(-2) + diffs.at(-2) * (r + 1), seq.at(-2) * r, seq.at(-1) + 1] };
  },
  fibonacci() {
    const three = rnd() < 0.35, seq = three ? [ri(1, 3), ri(1, 4), ri(2, 6)] : [ri(1, 9), ri(2, 12)];
    const len = three ? 8 : 8;
    while (seq.length < len) seq.push(three ? seq.at(-1) + seq.at(-2) + seq.at(-3) : seq.at(-1) + seq.at(-2));
    const [a, b, c] = seq.slice(-4, -1).reverse();
    return { seq, rule: three ? "each term is the sum of the previous three terms" : "each term is the sum of the previous two terms", calc: () => (three ? `${c} + ${b} + ${a}` : `${b} + ${a}`), extra: [a + b + 1, 2 * a, a + c], nomiss: true };
  },
  factorialLike() {
    const s = ri(1, 8), m0 = ri(1, 3), c = pick(["none", "plus", "minus1"]);
    const add = (m) => (c === "plus" ? m : c === "minus1" ? -1 : 0);
    const seq = [s]; for (let i = 0; i < 5; i++) seq.push(seq.at(-1) * (m0 + i) + add(m0 + i));
    if (seq.at(-1) > 50000 || seq.some((x) => x <= 0)) return null;
    const m = m0 + 4, tail = c === "plus" ? `, then add the same number (×${m0} + ${m0}, ×${m0 + 1} + ${m0 + 1}, …)` : c === "minus1" ? ", then subtract 1" : "";
    return { seq, rule: `the multipliers increase by one each step (×${m0}, ×${m0 + 1}, ×${m0 + 2}, …)${tail}`, calc: (x) => `${x} × ${m}${add(m) ? ` ${sgn(add(m))}` : ""}`, extra: [seq.at(-2) * (m - 1) + add(m - 1), seq.at(-2) * (m + 1), seq.at(-1) + 1] };
  },
  primeBased() {
    const i0 = ri(1, 12), ps = primes.slice(i0, i0 + 6);
    const [f, s, desc] = pick([[(p) => p * p, (p) => `${p}²`, "the squares of consecutive prime numbers"], [(p) => 2 * p + 1, (p) => `2 × ${p} + 1`, "2p + 1 for consecutive primes p"], [(p) => p + 10, (p) => `${p} + 10`, "consecutive prime numbers plus 10"], [(p) => 3 * p, (p) => `3 × ${p}`, "three times consecutive prime numbers"], [(p) => p, primeIdentity, "consecutive prime numbers"], [(p) => p * p - 1, (p) => `${p}² − 1`, "one less than the squares of consecutive primes"], [(p) => 2 * p - 1, (p) => `2 × ${p} − 1`, "2p − 1 for consecutive primes p"]]);
    const seq = ps.map(f), p = ps.at(-1), q = ps.at(-2);
    if (s === primeIdentity) return { seq, rule: `the terms are ${desc}`, calc: () => `the prime after ${q}`, extra: [q + 2 === p ? p + 2 : q + 2, p + 1, p + 2].filter((x) => x !== p), nomiss: true };
    return { seq, rule: `the terms are ${desc}`, calc: () => s(p), extra: [f(q + 2), f(p + 1), f(p) + 2], nomiss: true };
  },
};
const MISSABLE = ["linear", "diffAP", "powers", "geometric", "diffGeometric", "factorialLike"];

function numberSeries(family, missing) {
  const r = seriesFamilies[family]();
  if (!r) return null;
  const { seq } = r;
  if (!missing) {
    const ans = seq.at(-1);
    return mc(`Find the next number: ${list(seq.slice(0, -1))}, ?`, ans, nearNums(ans, r.extra), `Here ${r.rule}. Next: ${r.calc(seq.at(-2))} = ${ans}.`);
  }
  const h = ri(2, seq.length - 2), ans = seq[h];
  const shown = seq.map((x, i) => (i === h ? "?" : x));
  return mc(`Find the missing number: ${list(shown)}`, ans, nearNums(ans, [Math.round((seq[h - 1] + seq[h + 1]) / 2), ans + (seq[h + 1] - seq[h]) - (seq[h] - seq[h - 1])].filter((x) => x > 0 && x !== seq[h - 1] && x !== seq[h + 1])), `Here ${r.rule}, so the missing term is ${ans}.`);
}

// ---------- letter series ----------
function letterSeries() {
  const t = pick(["const", "const", "incr", "alt", "back"]);
  let steps;
  if (t === "const") steps = Array(5).fill(ri(2, 6));
  else if (t === "back") steps = Array(5).fill(-ri(2, 5));
  else if (t === "incr") { const k = ri(1, 2); steps = [0, 1, 2, 3, 4].map((i) => k + i); }
  else { const a = ri(1, 5), b = ri(2, 6); if (a === b) return null; steps = [a, b, a, b, a]; }
  const start = steps[0] > 0 ? ri(1, 26 - steps.reduce((x, y) => x + y)) : ri(-steps.reduce((x, y) => x + y) + 1, 26);
  const ps = [start]; for (const s of steps) ps.push(ps.at(-1) + s);
  if (ps.some((p) => p < 1 || p > 26)) return null;
  const ans = ps.at(-1), shown = ps.slice(0, -1).map(ch);
  const rule = t === "alt" ? `the letters move alternately +${steps[0]} and +${steps[1]}` : t === "incr" ? `the gaps grow by one each time (+${list(steps.slice(0, -1).map(String))}, …)` : `each letter is ${Math.abs(steps[0])} places ${steps[0] > 0 ? "after" : "before"} the previous one`;
  const wrongs = [ans + 1, ans - 1, ans + 2, ans - 2].filter((p) => p >= 1 && p <= 26).map(ch);
  return mc(`Find the next letter: ${list(shown)}, ?`, ch(ans), wrongs, `By alphabet positions (${list(ps.slice(0, -1))}), ${rule}: ${ch(ps.at(-2))}(${ps.at(-2)}) ${sgn(steps.at(-1))} = ${ch(ans)}(${ans}).`);
}

function letterGroups() {
  const t = pick(["pair", "pair", "triple", "letnum"]);
  if (t === "pair") {
    const k1 = pick([1, 2, 3, 4]), k2 = pick([-3, -2, -1, 1, 2, 3, 4]);
    const a = k1 > 0 ? ri(1, 26 - 4 * k1) : 0, b = k2 > 0 ? ri(1, 26 - 4 * k2) : ri(1 - 4 * k2, 26);
    const g = [0, 1, 2, 3, 4].map((i) => ch(a + i * k1) + ch(b + i * k2));
    const ans = g[4], fa = a + 4 * k1, fb = b + 4 * k2;
    const wrongs = [[fa + 1, fb], [fa, fb + (k2 > 0 ? 1 : -1)], [fa - 1, fb - 1], [fa + 1, fb + 1]].filter(([x, y]) => x >= 1 && x <= 26 && y >= 1 && y <= 26).map(([x, y]) => ch(x) + ch(y));
    return mc(`Find the next pair: ${list(g.slice(0, 4))}, ?`, ans, wrongs, `The first letters move ${k1} forward each time and the second letters move ${Math.abs(k2)} ${k2 > 0 ? "forward" : "back"}: next is ${ans}.`);
  }
  if (t === "triple") {
    const gap = ri(1, 3), start = ri(1, 26 - (3 + gap) * 3 - 2);
    if (start < 1) return null;
    const g = [0, 1, 2, 3].map((i) => { const s = start + i * (3 + gap); return ch(s) + ch(s + 1) + ch(s + 2); });
    const s4 = start + 3 * (3 + gap), ans = g[3];
    const wrongs = [ch(s4 - 1) + ch(s4) + ch(s4 + 1), ch(s4 + 1) + ch(s4 + 2) + ch(s4 + 3), ch(s4) + ch(s4 + 2) + ch(s4 + 1)];
    return mc(`Find the next group: ${list(g.slice(0, 3))}, ?`, ans, wrongs, `Each group is three consecutive letters, and ${gap} letter${gap > 1 ? "s are" : " is"} skipped between groups: after ${g[2]} comes ${ans}.`);
  }
  const k = ri(2, 5), rev = rnd() < 0.4, a = ri(1, 26 - 4 * k);
  const val = (p) => (rev ? 27 - p : p);
  const g = [0, 1, 2, 3, 4].map((i) => ch(a + i * k) + val(a + i * k));
  const p = a + 4 * k, ans = g[4];
  const wrongs = [ch(p) + (27 - val(p)) , ch(p) + (val(p) + 1), ch(p + 1) + val(p + 1), ch(p - 1) + val(p)].filter((w) => w !== ans);
  return mc(`Find the next term: ${list(g.slice(0, 4))}, ?`, ans, wrongs, `The letters move ${k} forward each time, and each number is the letter's position in the ${rev ? "reversed alphabet (A = 26 … Z = 1)" : "alphabet"}: ${ch(p)} → ${val(p)}.`);
}

// ---------- analogies / odd one out ----------
const numFns = [
  { f: (n) => n * n, s: (n) => `${n}²`, d: "n²" },
  { f: (n) => n ** 3, s: (n) => `${n}³`, d: "n³" },
  { f: (n) => n * n + 1, s: (n) => `${n}² + 1`, d: "n² + 1" },
  { f: (n) => n * n - 1, s: (n) => `${n}² − 1`, d: "n² − 1" },
  { f: (n) => n ** 3 + 1, s: (n) => `${n}³ + 1`, d: "n³ + 1" },
  { f: (n) => n ** 3 - 1, s: (n) => `${n}³ − 1`, d: "n³ − 1" },
  { f: (n) => n * n + n, s: (n) => `${n}² + ${n}`, d: "n² + n" },
  { f: (n) => n * n - n, s: (n) => `${n}² − ${n}`, d: "n² − n" },
  { f: (n) => n ** 3 - n, s: (n) => `${n}³ − ${n}`, d: "n³ − n" },
  { f: (n) => n ** 3 + n, s: (n) => `${n}³ + ${n}`, d: "n³ + n" },
  { f: (n) => 2 * n * n, s: (n) => `2 × ${n}²`, d: "2n²" },
  { f: (n) => (n + 1) ** 2, s: (n) => `(${n} + 1)²`, d: "(n + 1)²" },
  { f: (n) => n * n + 2 * n, s: (n) => `${n} × ${n + 2}`, d: "n × (n + 2)" },
  { f: (n) => n * n + 3, s: (n) => `${n}² + 3`, d: "n² + 3" },
];
function numberAnalogy() {
  const fn = pick(numFns), x = ri(2, 12), y = ri(2, 13);
  if (x === y) return null;
  const fx = fn.f(x);
  if (numFns.some((g) => g !== fn && g.f(x) === fx)) return null; // the pair must pin down one rule
  const ans = fn.f(y), wrongs = shuffle(numFns.filter((g) => g !== fn).map((g) => g.f(y)));
  return mc(`${x} : ${fx} :: ${y} : ?`, ans, wrongs, `${x} → ${fn.s(x)} = ${fx}; likewise ${y} → ${fn.s(y)} = ${ans}.`);
}

const GENERIC = new Set(["Which one does not belong with the others?", "Which number does not belong with the others?", "Which pair does not belong with the others?"]);
const isSq = (n) => Number.isInteger(Math.sqrt(n));
const isPrime = (n) => n > 1 && [...Array(Math.floor(Math.sqrt(n)) + 1).keys()].slice(2).every((d) => n % d);
const digitSum = (n) => String(n).split("").reduce((a, b) => a + +b, 0);
function oddNumber() {
  const t = pick(["prime", "square", "cube", "multiple", "digits", "pair"]);
  let good, odd, expl;
  if (t === "prime") {
    good = sample(primes.filter((p) => p > 10), 3); odd = pick([21, 27, 33, 39, 49, 51, 57, 63, 69, 77, 81, 87, 91, 93, 111, 119]);
    const f = [...Array(odd).keys()].find((d) => d > 1 && odd % d === 0);
    expl = `${odd} = ${f} × ${odd / f} is not prime; the others are prime numbers.`;
  } else if (t === "square") {
    good = sample([...Array(17).keys()].map((i) => (i + 4) ** 2), 3); odd = pick(good) + pick([-2, -1, 1, 2, 3]);
    if (isSq(odd)) return null;
    expl = `${list(good.map((g) => `${g} = ${Math.sqrt(g)}²`))} are perfect squares; ${odd} is not.`;
  } else if (t === "cube") {
    good = sample([2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => i ** 3), 3); odd = pick(good) + pick([-2, -1, 1, 2]);
    expl = `${list(good.map((g) => `${g} = ${Math.round(Math.cbrt(g))}³`))} are perfect cubes; ${odd} is not.`;
  } else if (t === "multiple") {
    const k = ri(6, 13); good = sample([...Array(12).keys()].map((i) => k * (i + 3)), 3); odd = pick(good) + pick([-2, -1, 1, 2, 3]);
    if (odd % k === 0) return null;
    expl = `${list(good)} are all multiples of ${k}; ${odd} is not.`;
  } else if (t === "digits") {
    const S = ri(8, 14), pool = [...Array(900).keys()].map((i) => i + 11).filter((n) => digitSum(n) === S && n < 400);
    good = sample(pool, 3); odd = pick(good) + pick([1, 2, -1]);
    if (digitSum(odd) === S) return null;
    expl = `The digits of ${list(good)} each add up to ${S}; the digits of ${odd} add up to ${digitSum(odd)}.`;
  } else {
    const fn = pick(numFns), other = pick(numFns.filter((g) => g !== fn)), xs = sample([2, 3, 4, 5, 6, 7, 8, 9], 4);
    const pairs = xs.slice(0, 3).map((x) => `${x} – ${fn.f(x)}`), oddPair = `${xs[3]} – ${other.f(xs[3])}`;
    if (fn.f(xs[3]) === other.f(xs[3])) return null;
    return mc("Which pair does not belong with the others?", oddPair, pairs, `In the other pairs the second number is ${fn.d}, where n is the first (e.g. ${fn.s(xs[0])} = ${fn.f(xs[0])}); but ${fn.s(xs[3])} = ${fn.f(xs[3])}, not ${other.f(xs[3])}.`);
  }
  const all = [...good, odd];
  if (new Set(all).size < 4 || odd <= 0) return null;
  // guard: parity must not single out a different number
  const odds = all.filter((n) => n % 2), evens = all.filter((n) => n % 2 === 0);
  const parityOdd = odds.length === 1 ? odds[0] : evens.length === 1 ? evens[0] : null;
  if (parityOdd !== null && parityOdd !== odd) return null;
  return mc("Which number does not belong with the others?", odd, good, expl);
}

// ---------- coding ----------
const WORDS = "CADET RIFLE TANK PILOT CAMP MARCH BADGE RANK FLAG SALUTE MEDAL HONOUR DUTY BRAVE GUARD TROOP SHIELD SWORD ARROW ROCKET RADAR CANNON PATROL BORDER BUNKER JUNGLE DESERT RIVER OCEAN ISLAND FOREST PLANET CLOUD STORM THUNDER WINTER SUMMER SPRING AUTUMN CANDLE MIRROR WINDOW PENCIL ERASER BOTTLE TICKET MARKET SCHOOL COLLEGE DOCTOR LAWYER FARMER BANKER SINGER DANCER PAINTER WRITER HUNTER SAILOR KNIGHT CASTLE PALACE TEMPLE BRIDGE TUNNEL TOWER HARBOUR ANCHOR COMPASS SIGNAL MISSION TARGET VICTORY PARADE UNIFORM HELMET BOOTS JACKET BASKET BUCKET CARPET BLANKET PILLOW SILVER COPPER BRONZE MARBLE CRYSTAL DIAMOND TIGER LION EAGLE FALCON HORSE CAMEL RABBIT MONKEY PARROT DONKEY LEMON ORANGE BANANA CHERRY POTATO TOMATO ONION PEPPER SUGAR BUTTER CHEESE BREAD KNIFE SPOON PLATE GLASS FIELD GROUND STREET VILLAGE CITY NATION PEOPLE FAMILY TEAM PLAYER CAPTAIN COACH REFEREE STADIUM TROPHY CRICKET HOCKEY TENNIS BOXING KABADDI CHESS PUZZLE RIDDLE SECRET CIPHER LETTER NUMBER SYMBOL MARKER PRINTER SCREEN SPEAKER CAMERA BATTERY ENGINE WHEEL PISTON MOTOR".split(" ");
const codeTransforms = [
  (k) => ({ f: (w) => [...w].map((c) => ch(wrap(pos(c) + k))).join(""), d: `each letter is moved ${Math.abs(k)} place${Math.abs(k) > 1 ? "s" : ""} ${k > 0 ? "forward" : "back"} in the alphabet` }),
  () => ({ f: (w) => [...w].reverse().join(""), d: "the letters are written in reverse order" }),
  (k) => ({ f: (w) => [...w].reverse().map((c) => ch(wrap(pos(c) + k))).join(""), d: `the letters are reversed and each is moved ${Math.abs(k)} place ${k > 0 ? "forward" : "back"}` }),
  () => ({ f: (w) => [...w].map((c, i) => ch(wrap(pos(c) + (i % 2 ? -1 : 1)))).join(""), d: "letters are moved alternately one place forward and one place back" }),
  () => ({ f: (w) => [...w].map((c, i) => ch(wrap(pos(c) + i + 1))).join(""), d: "the 1st letter moves 1 place forward, the 2nd moves 2, the 3rd moves 3, and so on" }),
  () => ({ f: (w) => [...w].map((c) => ch(27 - pos(c))).join(""), d: "each letter is replaced by its opposite letter (A↔Z, B↔Y, C↔X, …)" }),
];
function letterCoding() {
  const [w1, w2] = sample(WORDS, 2);
  if (rnd() < 0.3) {
    const rev = rnd() < 0.5, v = (c) => (rev ? 27 - pos(c) : pos(c)), enc = (w) => [...w].map(v).join("-");
    const ans = enc(w2), nums = [...w2].map(v);
    const tweak = (i, d) => nums.map((n, j) => (j === i ? (n + d < 1 || n + d > 26 ? n - d : n + d) : n)).join("-");
    const wrongs = [tweak(ri(0, nums.length - 1), 1), tweak(ri(0, nums.length - 1), -1), [...w2].map((c) => (rev ? pos(c) : 27 - pos(c))).join("-")];
    return mc(`If ${w1} is written as ${enc(w1)}, how is ${w2} written in the same code?`, ans, wrongs, `Each letter is replaced by its position in the ${rev ? "reversed alphabet (A = 26, B = 25, …, Z = 1)" : "alphabet (A = 1, …, Z = 26)"}, so ${w2} → ${ans}.`);
  }
  const i = ri(0, codeTransforms.length - 1), k = pick([1, 2, 3, -1, -2]);
  const t = codeTransforms[i](i === 2 ? pick([1, -1]) : k);
  const ans = t.f(w2);
  const tweak = (s) => { const j = ri(0, s.length - 1); return s.slice(0, j) + ch(wrap(pos(s[j]) + pick([1, -1]))) + s.slice(j + 1); };
  const alt = codeTransforms[(i + 1) % codeTransforms.length](k).f(w2);
  if (t.f(w1) === w1) return null;
  return mc(`If ${w1} is coded as ${t.f(w1)}, how is ${w2} coded?`, ans, [tweak(ans), tweak(ans), alt, tweak(tweak(ans))], `In this code ${t.d}, so ${w2} becomes ${ans}.`);
}

const ADJ = ["brave", "young", "strong", "bold", "loyal", "smart", "tall", "quick", "calm", "proud"];
const NOUN = ["cadets", "soldiers", "pilots", "sailors", "officers", "boys", "girls", "players", "doctors", "leaders", "farmers", "students"];
const VERB = ["march", "fight", "train", "fly", "sail", "run", "win", "lead", "work", "study", "swim", "climb"];
const ADV = ["today", "hard", "daily", "fast", "well", "together", "early", "bravely", "quietly", "again"];
const SYL = ["ka", "pi", "lo", "ma", "ta", "ri", "su", "ne", "zo", "bu", "fe", "da", "mu", "si", "po", "ve", "ja", "ki", "ru", "ho", "ze", "li", "ga", "yo", "tu", "re"];
function codeLanguage() {
  const [adj, adj2] = sample(ADJ, 2), noun = pick(NOUN), verb = pick(VERB), adv = pick(ADV);
  const codes = sample(SYL, 5), code = { [adj]: codes[0], [noun]: codes[1], [verb]: codes[2], [adj2]: codes[3], [adv]: codes[4] };
  const say = (ws) => `'${ws.join(" ")}' is written as '${shuffle(ws.map((w) => code[w])).join(" ")}'`;
  const q0 = `In a code language, ${say([adj, noun, verb])}, ${say([adj2, noun])} and ${say([verb, adv])}.`;
  const why = `'${noun}' is common to the first two sentences, so ${noun} = ${code[noun]}; '${verb}' is common to the first and third, so ${verb} = ${code[verb]}.`;
  const target = pick([adj, adj, noun, verb, adj2, adv]);
  const rest = target === adj ? `The remaining code in the first sentence, ${code[adj]}, means '${adj}'.` : target === adj2 ? `The other code in the second sentence, ${code[adj2]}, means '${adj2}'.` : target === adv ? `The other code in the third sentence, ${code[adv]}, means '${adv}'.` : "";
  if (rnd() < 0.5) return mc(`${q0} What is the code for '${target}'?`, code[target], shuffle(Object.values(code).filter((c) => c !== code[target])), `${why} ${rest}`.trim());
  return mc(`${q0} Which word is coded as '${code[target]}'?`, target, shuffle(Object.keys(code).filter((w) => w !== target)), `${why} ${rest}`.trim());
}

function letterValue() {
  const [w1, w2] = sample(WORDS, 2), rev = rnd() < 0.35, v = (c) => (rev ? 27 - pos(c) : pos(c));
  const sum = (w) => [...w].reduce((a, c) => a + v(c), 0), ans = sum(w2);
  const other = [...w2].reduce((a, c) => a + (rev ? pos(c) : 27 - pos(c)), 0);
  return mc(`If A = ${rev ? "26, B = 25, …, Z = 1" : "1, B = 2, …, Z = 26"} and ${w1} = ${sum(w1)} (the sum of its letter values), what is ${w2}?`, ans, nearNums(ans, [other, ans + v(w2[0])]), `${w2} = ${[...w2].map(v).join(" + ")} = ${ans}.`);
}
function operatorSub() {
  const real = ["+", "−", "×", "÷"];
  let perm; do perm = shuffle(real); while (perm.some((p, i) => p === real[i]));
  const shown = Object.fromEntries(real.map((r, i) => [perm[i], r])); // displayed symbol -> real op
  const ops = shuffle(real), nums = [ri(2, 20), ri(2, 12), ri(2, 12), ri(2, 12), ri(2, 12)];
  // make every ÷ exact: numerator = product/quotient chain value so far within its term
  const di = ops.indexOf("÷"); nums[di] = nums[di + 1] * ri(1, 9); if (di > 0 && ops[di - 1] === "×") return null;
  const toks = [nums[0]]; ops.forEach((o, i) => toks.push(o, nums[i + 1]));
  // BODMAS: collapse × and ÷ first
  const t = [...toks];
  for (let i = 1; i < t.length; ) if (t[i] === "×" || t[i] === "÷") { const r = t[i] === "×" ? t[i - 1] * t[i + 1] : t[i - 1] / t[i + 1]; if (!Number.isInteger(r)) return null; t.splice(i - 1, 3, r); } else i += 2;
  let ans = t[0]; for (let i = 1; i < t.length; i += 2) ans = t[i] === "+" ? ans + t[i + 1] : ans - t[i + 1];
  if (ans < 0) return null;
  const inv = Object.fromEntries(Object.entries(shown).map(([s, r]) => [r, s]));
  const disp = toks.map((x) => (typeof x === "number" ? x : inv[x])).join(" ");
  const meaning = Object.entries(shown).map(([s, r]) => `'${s}' means '${r}'`);
  const q = `If ${meaning.slice(0, 3).join(", ")} and ${meaning[3]}, what is the value of ${disp}?`;
  return mc(q, ans, nearNums(ans, [ans + nums[4], Math.abs(ans - 2 * nums[4])]), `Replacing the symbols gives ${toks.join(" ")}; following BODMAS, this equals ${ans}.`);
}

// ---------- directions ----------
const DIRS8 = ["North", "North-East", "East", "South-East", "South", "South-West", "West", "North-West"];
const V = { North: [0, 1], East: [1, 0], South: [0, -1], West: [-1, 0] };
const NAMES = ["Rahul", "Aman", "Vikram", "Karan", "Rohit", "Arjun", "Sanjay", "Deepak", "Mohan", "Ravi", "Suresh", "Ajay", "Nikhil", "Yash", "Kabir", "Dev", "Aditya", "Varun"];
function directionDistance() {
  const name = pick(NAMES), unit = pick(["km", "m"]), n = pick([3, 3, 4]);
  let d = ri(0, 3), x = 0, y = 0; const legs = [];
  for (let i = 0; i < n; i++) {
    const turn = i === 0 ? null : pick(["left", "right"]);
    if (turn) d = (d + (turn === "right" ? 1 : 3)) % 4;
    const len = unit === "km" ? ri(1, 15) : ri(2, 30) * 5, dir = DIRS8[d * 2];
    x += V[dir][0] * len; y += V[dir][1] * len; legs.push([turn, len, dir]);
  }
  if (!x && !y) return null;
  const path = legs.map(([t, l, dir], i) => (i === 0 ? `walks ${l} ${unit} towards the ${dir.toLowerCase()}` : `${i === n - 1 ? "finally turns" : "turns"} ${t} and walks ${l} ${unit}`)).join(", ");
  const q0 = `Starting from his house, ${name} ${path}.`;
  const dirOf = (dx, dy) => DIRS8[Math.round(((Math.atan2(dx, dy) * 180) / Math.PI + 360) % 360 / 45) % 8];
  const where = `He ends up ${Math.abs(x)} ${unit} ${x >= 0 ? "east" : "west"} and ${Math.abs(y)} ${unit} ${y >= 0 ? "north" : "south"} of his house`;
  if (!x || !y) {
    const dist = Math.abs(x || y), dir = dirOf(x, y);
    return mc(`${q0} How far and in which direction is he from his house?`, `${dist} ${unit} ${dir}`, [`${dist} ${unit} ${DIRS8[(DIRS8.indexOf(dir) + 4) % 8]}`, `${dist} ${unit} ${DIRS8[(DIRS8.indexOf(dir) + 2) % 8]}`, `${legs.reduce((a, l) => a + l[1], 0)} ${unit} ${dir}`, `${dist + legs[0][1]} ${unit} ${dir}`], `${where}, i.e. ${dist} ${unit} ${dir}.`);
  }
  const h = Math.hypot(x, y);
  if (Number.isInteger(h)) return mc(`${q0} What is the shortest distance between him and his house?`, `${h} ${unit}`, [`${Math.abs(x) + Math.abs(y)} ${unit}`, `${h + (unit === "km" ? 2 : 10)} ${unit}`, `${Math.abs(Math.abs(x) - Math.abs(y))} ${unit}`, `${h - (unit === "km" ? 1 : 5)} ${unit}`], `${where}. Distance = √(${Math.abs(x)}² + ${Math.abs(y)}²) = ${h} ${unit}.`);
  const dir = dirOf(Math.sign(x), Math.sign(y)), i = DIRS8.indexOf(dir);
  return mc(`${q0} In which direction is he now from his house?`, dir, [DIRS8[(i + 2) % 8], DIRS8[(i + 4) % 8], DIRS8[(i + 6) % 8]], `${where}, so he is to the ${dir} of his house.`);
}
function directionTurns() {
  const t = pick(["turns", "turns", "rotate", "shadow"]);
  if (t === "turns") {
    const d0 = ri(0, 7), n = ri(2, 3), moves = [];
    let d = d0;
    for (let i = 0; i < n; i++) { const deg = pick([45, 90, 90, 135, 180]), cw = rnd() < 0.5; d = (d + (cw ? 1 : -1) * (deg / 45) + 16) % 8; moves.push(`${deg}° ${cw ? "clockwise" : "anticlockwise"}`); }
    const ans = DIRS8[d], net = ((d - d0 + 8) % 8) * 45;
    return mc(`A man is facing ${DIRS8[d0]}. He turns ${moves.join(", then ")}. Which direction is he facing now?`, ans, [DIRS8[(d + 2) % 8], DIRS8[(d + 4) % 8], DIRS8[(d + 6) % 8], DIRS8[(d + 1) % 8]], `${net === 0 ? "The turns cancel out completely" : `The net turn is ${net <= 180 ? `${net}° clockwise` : `${360 - net}° anticlockwise`}`} from ${DIRS8[d0]}, so he faces ${ans}.`);
  }
  if (t === "rotate") {
    const a = ri(0, 7), b = ri(0, 7), c = ri(0, 7), r = (b - a + 8) % 8;
    if (!r || c === a) return null;
    const ans = DIRS8[(c + r) % 8];
    return mc(`If ${DIRS8[a]} is called ${DIRS8[b]}, and all other directions are renamed in the same way, what will ${DIRS8[c]} be called?`, ans, [DIRS8[(c - r + 8) % 8], DIRS8[(c + r + 2) % 8], DIRS8[(c + 4) % 8], DIRS8[(c + r + 6) % 8]], `${DIRS8[a]} → ${DIRS8[b]} is a rotation of ${r * 45}° clockwise; rotating ${DIRS8[c]} by the same amount gives ${ans}.`);
  }
  const morning = rnd() < 0.5, side = pick(["left", "right", "behind him", "in front of him"]), name = pick(NAMES);
  const shadow = morning ? "West" : "East"; // sun in the east in the morning, west in the evening
  const facing = { left: morning ? "North" : "South", right: morning ? "South" : "North", "behind him": morning ? "East" : "West", "in front of him": morning ? "West" : "East" }[side];
  return mc(`One ${morning ? "morning, just after sunrise" : "evening, just before sunset"}, ${name} was standing in a field. His shadow fell exactly ${side === "left" || side === "right" ? `to his ${side}` : side}. Which direction was he facing?`, facing, ["North", "South", "East", "West"].filter((x) => x !== facing), `In the ${morning ? "morning the sun is in the east, so shadows fall to the west" : "evening the sun is in the west, so shadows fall to the east"}. With the shadow (${shadow}) ${side === "left" || side === "right" ? `on his ${side}` : side}, he must be facing ${facing}.`);
}

// ---------- ranking / ordering ----------
function ranking() {
  const t = ri(0, 4), a = pick(NAMES), b = pick(NAMES.filter((x) => x !== a));
  if (t === 0) { const top = ri(5, 30), bot = ri(5, 30), n = top + bot - 1; return mc(`${a} is ${ord(top)} from the top and ${ord(bot)} from the bottom in his class. How many students are there in the class?`, n, nearNums(n, [top + bot, top + bot - 2]), `Total = ${top} + ${bot} − 1 = ${n} (${a} is counted in both ranks).`); }
  if (t === 1) { const n = ri(30, 60), top = ri(5, n - 5), bot = n - top + 1; return mc(`In a class of ${n} students, ${a} ranks ${ord(top)} from the top. What is his rank from the bottom?`, ord(bot), [ord(bot + 1), ord(bot - 1), ord(n - top)].filter((x) => x !== ord(bot)).concat(ord(bot + 2)), `Rank from bottom = ${n} − ${top} + 1 = ${bot}.`); }
  if (t === 2) { const n = ri(25, 50), l = ri(5, 20), r = ri(5, 20); if (l + r >= n) return null; const k = n - l - r; return mc(`In a row of ${n} students, ${a} is ${ord(l)} from the left end and ${b} is ${ord(r)} from the right end. How many students are there between them?`, k, nearNums(k, [k + 1, k + 2]), `${a} and ${b} with everyone to their outer sides account for ${l} + ${r} = ${l + r} students, so ${n} − ${l + r} = ${k} are between them.`); }
  if (t === 3) { const l = ri(4, 12), r = ri(8, 20), L = ri(l + 5, l + 20), n = L + r - 1; return mc(`In a row, ${a} is ${ord(l)} from the left and ${b} is ${ord(r)} from the right. When they interchange places, ${a} becomes ${ord(L)} from the left. How many people are in the row?`, n, nearNums(n, [L + r, L + l - 1]), `After the swap ${a} takes ${b}'s old place, which is ${ord(L)} from the left and ${ord(r)} from the right, so total = ${L} + ${r} − 1 = ${n}.`); }
  const n = ri(25, 45), l = ri(5, 15), k = ri(3, 10), p = l + k, fromR = n - p + 1;
  if (p > n) return null;
  return mc(`In a row of ${n} children, ${a} is ${ord(l)} from the left. ${b} is ${ord(k)} to the right of ${a}. What is ${b}'s position from the right end?`, ord(fromR), [ord(fromR + 1), ord(fromR - 1), ord(n - p)].filter((x) => x !== ord(fromR)).concat(ord(fromR + 2)), `${b} is ${ord(p)} from the left, so from the right he is ${n} − ${p} + 1 = ${fromR}.`);
}
const ATTRS = [["taller", "shorter", "tallest", "shortest"], ["heavier", "lighter", "heaviest", "lightest"], ["older", "younger", "oldest", "youngest"], ["richer", "poorer", "richest", "poorest"], ["faster", "slower", "fastest", "slowest"]];
const PEOPLE = ["Asha", "Bina", "Chetan", "Dinesh", "Esha", "Farhan", "Gita", "Hari", "Isha", "Jatin", "Kiran", "Lata", "Manoj", "Nisha", "Om", "Pooja", "Ravi", "Sita", "Tarun", "Uma"];
function ordering() {
  const [more, less, most, least] = pick(ATTRS), n = pick([4, 5, 5]), people = sample(PEOPLE, n); // people[0] is the most
  const facts = shuffle(people.slice(1).map((p, i) => (rnd() < 0.5 ? `${people[i]} is ${more} than ${p}` : `${p} is ${less} than ${people[i]}`)));
  const k = pick(n === 5 ? [0, 1, 2, 3, 4] : [0, 1, 2, 3]), label = k === 0 ? `the ${most}` : k === n - 1 ? `the ${least}` : n === 5 && k === 2 ? "in the middle (third)" : k === 1 ? `the second ${most}` : `the second ${least}`;
  return mc(`${facts.join(". ")}. Who is ${label}?`, people[k], people.filter((_, i) => i !== k), `The order from ${most} to ${least} is ${people.join(" > ")}, so ${label} is ${people[k]}.`);
}

// ---------- arithmetic ----------
const arith = [
  () => { const pairs = []; for (let a = 4; a <= 60; a++) for (let b = a + 1; b <= 90; b++) if ((a * b) % (a + b) === 0) pairs.push([a, b]); const [a, b] = pick(pairs), t = (a * b) / (a + b); return mc(`A can complete a piece of work in ${a} days and B in ${b} days. Working together, in how many days will they complete it?`, t, nearNums(t, [(a + b) / 2, b - a]), `Together they do 1/${a} + 1/${b} = ${a + b}/${a * b} = 1/${t} of the work per day, so they need ${t} days.`); },
  () => { const v = pick([36, 45, 54, 72, 90, 108]), t = ri(6, 20), L = (v * 5 / 18) * t; return mc(`A train ${L} m long passes a signal post in ${t} seconds. What is its speed in km/h?`, v, nearNums(v, [L / t, v + 9, v - 9], 9), `Speed = ${L}/${t} = ${L / t} m/s = ${L / t} × 18/5 = ${v} km/h.`); },
  () => { const v = pick([36, 54, 72, 90]), L = ri(10, 30) * 10, P = ri(10, 40) * 10, s = v * 5 / 18; if ((L + P) % s) return null; const t = (L + P) / s; return mc(`A train ${L} m long running at ${v} km/h crosses a platform ${P} m long. How many seconds does it take?`, t, nearNums(t, [L / s, P / s], 2), `It must cover ${L} + ${P} = ${L + P} m at ${v} km/h = ${s} m/s, taking ${L + P}/${s} = ${t} s.`); },
  () => { const P = ri(4, 40) * 500, R = ri(3, 12), T = ri(2, 6), si = (P * R * T) / 100; if (!Number.isInteger(si)) return null; return mc(`What is the simple interest on ₹${P} at ${R}% per annum for ${T} years?`, `₹${si}`, [`₹${si + (P * R) / 100}`, `₹${si - (P * R) / 100}`, `₹${P + si}`, `₹${si + 100}`], `SI = P × R × T / 100 = ${P} × ${R} × ${T} / 100 = ₹${si}.`); },
  () => { const a = pick([10, 15, 20, 25, 30, 40]), c = pick([20, 30, 50, 60, 75, 80].filter((x) => x !== a)), N = ri(2, 20) * 20, b = (a * N) / 100, ans = (c * N) / 100; return mc(`${a}% of a number is ${b}. What is ${c}% of the same number?`, ans, nearNums(ans, [b * c / 10, ans + b]), `The number is ${b} × 100/${a} = ${N}, and ${c}% of ${N} = ${ans}.`); },
  () => { const m = pick([10, 15, 20, 25, 30, 40, 50, 60]), d = pick([5, 10, 15, 20, 25, 30]), net = ((100 + m) * (100 - d)) / 100 - 100; if (!Number.isInteger(net) || net === 0) return null; const lbl = net > 0 ? `${net}% profit` : `${-net}% loss`; return mc(`A shopkeeper marks his goods ${m}% above the cost price and then gives a discount of ${d}%. What is his net profit or loss?`, lbl, [`${m - d}% profit`, `${Math.abs(net) + 2}% ${net > 0 ? "profit" : "loss"}`, `${Math.abs(net)}% ${net > 0 ? "loss" : "profit"}`, `${m + d}% profit`], `On a cost of ₹100 the marked price is ₹${100 + m}; after ${d}% off it sells for ₹${(100 + m) * (100 - d) / 100}, a ${lbl}.`); },
  () => { const n = ri(5, 10), A = ri(20, 60), B = A + pick([-4, -3, -2, 2, 3, 4]), x = n * A - (n - 1) * B; if (x <= 0) return null; return mc(`The average of ${n} numbers is ${A}. When one number is removed, the average of the rest becomes ${B}. Which number was removed?`, x, nearNums(x, [A, x + n]), `Total before = ${n} × ${A} = ${n * A}; after = ${n - 1} × ${B} = ${(n - 1) * B}; removed = ${x}.`); },
  () => { const s = ri(8, 20), yrs = ri(3, 8), m = ri(3, 5), f = m * (s - yrs) + yrs; if (f - s < 20 || f > 70 || s - yrs < 2) return null; return mc(`The sum of the present ages of a father and his son is ${f + s} years. ${yrs} years ago, the father was ${m} times as old as the son. What is the son's present age?`, `${s} years`, [`${s + 2} years`, `${s - 2} years`, `${s + yrs} years`, `${s - 1} years`], `Let the son be x: (${f + s} − x − ${yrs}) = ${m}(x − ${yrs}) gives x = ${s}; the father is ${f}.`); },
  () => { const k = pick([3, 4, 5]), odd = rnd() < 0.5, first = odd ? ri(5, 40) * 2 + 1 : ri(5, 40) * 2, nums = [...Array(k).keys()].map((i) => first + 2 * i), S = nums.reduce((a, b) => a + b); return mc(`The sum of ${k} consecutive ${odd ? "odd" : "even"} numbers is ${S}. What is the largest of them?`, nums.at(-1), nearNums(nums.at(-1), [nums.at(-2), nums.at(-1) + 2, S / k], 2), `The middle value is ${S}/${k} = ${S / k}; the numbers are ${list(nums)}, so the largest is ${nums.at(-1)}.`); },
  () => { const u = ri(4, 16) * 5, v = ri(u / 5 + 1, 24) * 5, a = (2 * u * v) / (u + v); if (!Number.isInteger(a)) return null; return mc(`A car goes from town P to town Q at ${u} km/h and returns at ${v} km/h. What is its average speed for the whole journey?`, `${a} km/h`, [`${(u + v) / 2} km/h`, `${a + 2} km/h`, `${a - 3} km/h`, `${v - u} km/h`], `For equal distances, average speed = 2uv/(u + v) = 2 × ${u} × ${v}/${u + v} = ${a} km/h (not the simple mean).`); },
  () => { const [a, b, c] = [ri(1, 6), ri(1, 6), ri(1, 6)], unit = ri(2, 40) * 100, total = (a + b + c) * unit; if (a === b && b === c) return null; return mc(`₹${total} is divided among X, Y and Z in the ratio ${a} : ${b} : ${c}. What is Y's share?`, `₹${b * unit}`, [`₹${a * unit}`, `₹${c * unit}`, `₹${(b + 1) * unit}`, `₹${total / 3}`], `Total parts = ${a + b + c}; one part = ₹${unit}; Y gets ${b} × ${unit} = ₹${b * unit}.`); },
  () => { const x = ri(3, 30), k = ri(2, 5), m = ri(2, 15), r = ri(2, 4), res = (k * x + m) * r; return mc(`A number is multiplied by ${k}, then ${m} is added, and the result is multiplied by ${r}. The final answer is ${res}. What was the number?`, x, nearNums(x, [(res - m) / (k * r)].filter(Number.isInteger)), `Working backwards: ${res} ÷ ${r} = ${res / r}; − ${m} = ${res / r - m}; ÷ ${k} = ${x}.`); },
  () => { const a = ri(2, 20), b = ri(a + 1, 40), t = (a * b) / (b - a); if (!Number.isInteger(t) || t > 60) return null; return mc(`A pipe can fill a tank in ${a} hours and another pipe can empty it in ${b} hours. If both are opened together on an empty tank, in how many hours will it be full?`, t, nearNums(t, [(a * b) / (a + b), b - a].filter(Number.isInteger)), `Net filling per hour = 1/${a} − 1/${b} = ${b - a}/${a * b} = 1/${t}, so it fills in ${t} hours.`); },
  () => { const s = ri(6, 20), w = ri(1, 5), down = s + w, up = s - w; if (up <= 0) return null; const askStream = rnd() < 0.5; return mc(`A boat goes ${down} km downstream in 1 hour and ${up} km upstream in 1 hour. What is the speed of the ${askStream ? "stream" : "boat in still water"}?`, `${askStream ? w : s} km/h`, [`${askStream ? s : w} km/h`, `${(askStream ? w : s) + 1} km/h`, `${down - up} km/h`, `${(askStream ? w : s) + 2} km/h`], `Boat speed = (${down} + ${up})/2 = ${s} km/h; stream speed = (${down} − ${up})/2 = ${w} km/h.`); },
  () => { const u = ri(30, 70), v = ri(30, 70), t = ri(2, 5), D = (u + v) * t; return mc(`Two trains start at the same time from stations ${D} km apart and travel towards each other at ${u} km/h and ${v} km/h. After how many hours will they meet?`, t, nearNums(t, [D / Math.max(u, v)].filter(Number.isInteger).concat([t + 1, t - 1])), `They close the gap at ${u} + ${v} = ${u + v} km/h, so they meet after ${D}/${u + v} = ${t} hours.`); },
  () => { const n = ri(6, 25), h = (n * (n - 1)) / 2; return mc(`At a meeting, each of the ${n} officers shakes hands exactly once with every other officer. How many handshakes take place?`, h, nearNums(h, [n * (n - 1), n * n, h + n]), `Handshakes = n(n − 1)/2 = ${n} × ${n - 1}/2 = ${h}.`); },
  () => { const d = pick([[1, 2, 5], [2, 5, 10], [1, 5, 10], [5, 10, 20]]), k = ri(5, 40), T = k * (d[0] + d[1] + d[2]); return mc(`A bag contains an equal number of ₹${d[0]}, ₹${d[1]} and ₹${d[2]} coins worth ₹${T} in all. How many of each are there?`, k, nearNums(k, [T / d[2], 3 * k].filter(Number.isInteger)), `Each set of one of each is worth ₹${d[0] + d[1] + d[2]}; ${T}/${d[0] + d[1] + d[2]} = ${k}.`); },
];

// ---------- clocks / calendars ----------
const fmtTime = (h, m) => `${h}:${String(m).padStart(2, "0")}`;
const deg = (a) => `${a}°`;
function clock() {
  const t = pick(["angle", "angle", "mirror", "gain", "coincide", "hourmove"]);
  if (t === "angle") {
    const h = ri(1, 12), m = pick([5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, ri(1, 59)]);
    let a = Math.abs(30 * (h % 12) - 5.5 * m); if (a > 180) a = 360 - a;
    let naive = Math.abs(30 * (h % 12) - 6 * m); if (naive > 180) naive = 360 - naive;
    return mc(`What is the angle between the hands of a clock at ${fmtTime(h, m)}?`, deg(a), [naive, a + 30, a + 15, Math.abs(a - 30), a + 7.5].filter((x) => x !== a && x <= 180).map(deg), `Angle = |30 × ${h % 12} − 5.5 × ${m}| = ${Math.abs(30 * (h % 12) - 5.5 * m)}°${Math.abs(30 * (h % 12) - 5.5 * m) > 180 ? `, i.e. 360° − that = ${a}°` : ""}. (The hour hand also moves 0.5° per minute.)`);
  }
  if (t === "mirror") {
    const h = ri(1, 12), m = ri(1, 59), tot = (720 - (h % 12) * 60 - m + 720) % 720, ah = Math.floor(tot / 60) || 12, am = tot % 60;
    return mc(`In a mirror, a clock appears to show ${fmtTime(h, m)}. What is the actual time?`, fmtTime(ah, am), [fmtTime((ah % 12) + 1, am), fmtTime(ah, (am + 30) % 60), fmtTime(12 - (h % 12) || 12, m), fmtTime(ah, 60 - am === 60 ? 0 : 60 - am)], `Actual time = 11:60 − ${fmtTime(h, m)} = ${fmtTime(ah, am)}.`);
  }
  if (t === "gain") {
    const g = ri(2, 6), gain = rnd() < 0.5, h0 = ri(6, 10), hrs = ri(3, 8), off = g * hrs;
    const fmt = (mins) => { const H = Math.floor(mins / 60) % 24, M = mins % 60; return `${(H % 12) || 12}:${String(M).padStart(2, "0")} ${H < 12 ? "am" : "pm"}`; };
    const real = (h0 + hrs) * 60, shown = real + (gain ? off : -off);
    return mc(`A clock ${gain ? "gains" : "loses"} ${g} minutes every hour. It is set right at ${h0} am. What time will it show when the correct time is ${fmt(real)} the same day?`, fmt(shown), [fmt(real - (gain ? off : -off)), fmt(shown + g), fmt(shown - g), fmt(real)], `In ${hrs} hours it ${gain ? "gains" : "loses"} ${g} × ${hrs} = ${off} minutes, so it shows ${fmt(shown)}.`);
  }
  if (t === "coincide") {
    const opp = rnd() < 0.5, h = opp ? pick([1, 2, 3, 4, 7, 8, 9, 10]) : pick([1, 2, 4, 5, 6, 7, 8, 9, 10]);
    const num = opp ? (h < 6 ? (5 * h + 30) * 12 : (5 * h - 30) * 12) : 60 * h, m = Math.floor(num / 11), r = num % 11;
    const f = (mm, rr) => `${h}:${String(mm).padStart(2, "0")}${rr ? ` ${rr}/11` : ""}`;
    return mc(`At what time between ${h} and ${h + 1} o'clock are the hands of a clock ${opp ? "in opposite directions (180° apart)" : "together"}?`, f(m, r), [f(m + 1, r), f(m - 1, (r + 5) % 11), f(m, (r + 3) % 11 || 6), f(opp ? (m + 30) % 60 : 5 * h, 0)], `The minute hand gains 11/2° per minute. It must gain ${opp ? (h < 6 ? `${30 * h}° + 180° = ${30 * h + 180}°` : `${30 * h}° − 180° = ${30 * h - 180}°`) : `${30 * h}°`} on the hour hand, which takes ${num}/11 = ${m}${r ? ` ${r}/11` : ""} minutes past ${h}.`);
  }
  const h1 = ri(1, 6), m1 = pick([0, 10, 15, 20, 30, 40, 45]), mins = ri(2, 6) * 60 + pick([0, 10, 20, 30, 40, 50]), end = h1 * 60 + m1 + mins;
  const a = mins / 2;
  return mc(`Through how many degrees does the hour hand of a clock turn from ${fmtTime(h1, m1)} to ${fmtTime(Math.floor(end / 60), end % 60)}?`, deg(a), [deg(mins / 60 * 30 + 30), deg(a + 15), deg(mins * 6 % 360), deg(a - 5)], `The hour hand turns 0.5° per minute; ${mins} minutes × 0.5° = ${a}°.`);
}

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const fmtDate = (d) => `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
const DAY = 86400000;
const EVENTS = [["1947-08-15", "India's first Independence Day"], ["1950-01-26", "the first Republic Day"], ["1971-12-16", "the day Pakistan surrendered in the 1971 war"], ["1999-07-26", "Kargil Vijay Diwas (1999)"], ["1869-10-02", "the day Mahatma Gandhi was born"], ["1897-01-23", "the day Netaji Subhas Chandra Bose was born"], ["1949-01-15", "the day General Cariappa took over as Commander-in-Chief"], ["1932-10-08", "the day the Indian Air Force was established"], ["2023-08-23", "Chandrayaan-3's Moon landing"], ["1984-04-13", "the launch of Operation Meghdoot"], ["1961-12-19", "the liberation of Goa"], ["1975-04-19", "the launch of India's first satellite, Aryabhata"], ["2008-10-22", "the launch of Chandrayaan-1"], ["2014-09-24", "Mangalyaan's entry into Mars orbit"]];
function calendar() {
  const t = pick(["pair", "pair", "after", "sameyear", "event", "count"]);
  if (t === "pair") {
    const d1 = new Date(Date.UTC(ri(2024, 2032), ri(0, 11), ri(1, 28))), diff = ri(-400, 400); if (Math.abs(diff) < 20) return null;
    const d2 = new Date(+d1 + diff * DAY), w1 = d1.getUTCDay(), w2 = d2.getUTCDay(), r = ((diff % 7) + 7) % 7;
    return mc(`${fmtDate(d1)} is a ${DAYS[w1]}. What day of the week is ${fmtDate(d2)}?`, DAYS[w2], [DAYS[(w2 + 1) % 7], DAYS[(w2 + 6) % 7], DAYS[(w2 + 2) % 7], DAYS[(w2 + 5) % 7]], `${fmtDate(d2)} is ${Math.abs(diff)} days ${diff > 0 ? "after" : "before"} ${fmtDate(d1)}. ${Math.abs(diff)} = 7 × ${Math.floor(Math.abs(diff) / 7)} + ${Math.abs(diff) % 7}, so the day shifts ${diff > 0 ? r : (7 - r) % 7} ${diff > 0 ? "forward" : "back"}: ${DAYS[w2]}.`);
  }
  if (t === "after") {
    const w = ri(0, 6), n = ri(20, 900), a = (w + n) % 7;
    return mc(`If today is ${DAYS[w]}, what day of the week will it be ${n} days from today?`, DAYS[a], [DAYS[(a + 1) % 7], DAYS[(a + 6) % 7], DAYS[(w + (n % 7) + 2) % 7], DAYS[(a + 3) % 7]], `${n} = 7 × ${Math.floor(n / 7)} + ${n % 7}; ${n % 7} days after ${DAYS[w]} is ${DAYS[a]}.`);
  }
  if (t === "sameyear") {
    const y = ri(2026, 2050), leap = (x) => (x % 4 === 0 && x % 100 !== 0) || x % 400 === 0, jan1 = (x) => new Date(Date.UTC(x, 0, 1)).getUTCDay();
    let z = y + 1; while (!(leap(z) === leap(y) && jan1(z) === jan1(y))) z++;
    return mc(`Which year will have exactly the same calendar as ${y}?`, z, [z - 1, z + 1, y + 4 === z ? y + 7 : y + 4, y + 28 === z ? y + 11 : y + 28].filter((x) => x !== z), `A year has the same calendar when it starts on the same weekday and is ${leap(y) ? "also a leap year" : "also an ordinary year"}. Counting odd days (1 per ordinary year, 2 per leap year) from ${y} until they total a multiple of 7 gives ${z}.`);
  }
  if (t === "event") {
    const [iso, name] = pick(EVENTS), d = new Date(iso + "T00:00:00Z"), w = d.getUTCDay();
    const ref = Date.UTC(2001, 0, 1), diff = Math.round((+d - ref) / DAY), r = ((diff % 7) + 7) % 7;
    return mc(`${fmtDate(d)} was ${name}. What day of the week was it?`, DAYS[w], [DAYS[(w + 1) % 7], DAYS[(w + 6) % 7], DAYS[(w + 3) % 7], DAYS[(w + 2) % 7]], `1 January 2001 was a Monday. ${fmtDate(d)} is ${Math.abs(diff)} days ${diff < 0 ? "before" : "after"} it, leaving ${diff < 0 ? (7 - r) % 7 : r} odd day(s) ${diff < 0 ? "backwards" : "forwards"} from Monday, so it was a ${DAYS[w]}.`);
  }
  const y = ri(2025, 2031), m1 = ri(0, 8), d1 = ri(1, 28), m2 = ri(m1 + 1, 11), d2 = ri(1, 28), a = new Date(Date.UTC(y, m1, d1)), b = new Date(Date.UTC(y, m2, d2)), n = Math.round((+b - +a) / DAY) + 1;
  return mc(`How many days are there from ${fmtDate(a)} to ${fmtDate(b)}, both days included?`, n, nearNums(n, [n - 1, n + 1]), `Counting the days in each month from ${fmtDate(a)} to ${fmtDate(b)} inclusive gives ${n}.`);
}

// ---------- syllogisms ----------
const TERMS = [["pens", "pen"], ["books", "book"], ["chairs", "chair"], ["tables", "table"], ["cadets", "cadet"], ["athletes", "athlete"], ["swimmers", "swimmer"], ["pilots", "pilot"], ["doctors", "doctor"], ["teachers", "teacher"], ["singers", "singer"], ["dancers", "dancer"], ["cars", "car"], ["trucks", "truck"], ["trees", "tree"], ["flowers", "flower"], ["birds", "bird"], ["rivers", "river"], ["stones", "stone"], ["clouds", "cloud"], ["boxes", "box"], ["bottles", "bottle"], ["lamps", "lamp"], ["shirts", "shirt"], ["rings", "ring"], ["coins", "coin"], ["bats", "bat"], ["balls", "ball"], ["phones", "phone"], ["watches", "watch"], ["painters", "painter"], ["writers", "writer"], ["soldiers", "soldier"], ["sailors", "sailor"], ["engineers", "engineer"], ["farmers", "farmer"], ["roads", "road"], ["bridges", "bridge"], ["cups", "cup"], ["plates", "plate"], ["officers", "officer"], ["runners", "runner"]];
const art = (s) => (/^[aeiou]/.test(s) ? "an " : "a ") + s;
const say = ([k, x, y]) => ({ all: `All ${x[0]} are ${y[0]}`, some: `Some ${x[0]} are ${y[0]}`, no: `No ${x[1]} is ${art(y[1])}`, somenot: `Some ${x[0]} are not ${y[0]}` })[k];
// [statements, conclusions, answer index (Only I / Only II / Both / Neither), why]
const FORMS = [
  [[["all", "A", "B"], ["all", "B", "C"]], [["all", "A", "C"], ["some", "C", "A"]], 2, "All {A} are {B} and all {B} are {C}, so all {A} are {C} (I), and hence some {C} are {A} (II)."],
  [[["all", "A", "B"], ["all", "B", "C"]], [["all", "C", "A"], ["some", "B", "A"]], 1, "All {A} are {B}, so some {B} are {A} (II); but {C} may include much more than {A}, so I does not follow."],
  [[["all", "A", "B"], ["no", "B", "C"]], [["no", "A", "C"], ["some", "A", "C"]], 0, "All {A} are {B} and no {b} is {c}, so no {a} can be {c} (I); II contradicts this."],
  [[["all", "A", "B"], ["no", "B", "C"]], [["no", "C", "A"], ["somenot", "B", "C"]], 2, "No {a} is {c}, so equally no {c} is {a} (I); and since no {b} is {c}, the {B} are certainly not {C} (II)."],
  [[["some", "A", "B"], ["all", "B", "C"]], [["some", "A", "C"], ["some", "C", "A"]], 2, "The {A} that are {B} are also {C}, so some {A} are {C} (I), and conversely some {C} are {A} (II)."],
  [[["some", "A", "B"], ["all", "B", "C"]], [["all", "A", "C"], ["somenot", "C", "A"]], 3, "Only the {A} that are {B} are known to be {C}, so I is not certain; all {C} might be {A}, so II is not certain either."],
  [[["some", "A", "B"], ["no", "B", "C"]], [["somenot", "A", "C"], ["no", "A", "C"]], 0, "The {A} that are {B} cannot be {C}, so some {A} are not {C} (I); other {A} might be {C}, so II is not certain."],
  [[["no", "A", "B"], ["all", "B", "C"]], [["somenot", "C", "A"], ["no", "A", "C"]], 0, "All {B} are {C} and none of them is {a}, so some {C} are not {A} (I); some {A} could still be {C}, so II is uncertain."],
  [[["no", "A", "B"], ["some", "B", "C"]], [["somenot", "C", "A"], ["some", "A", "C"]], 0, "The {C} that are {B} cannot be {A}, so some {C} are not {A} (I); nothing links {A} and {C} directly, so II is uncertain."],
  [[["all", "A", "B"], ["some", "B", "C"]], [["some", "A", "C"], ["some", "C", "B"]], 1, "Some {B} are {C}, so some {C} are {B} (II); the {B} that are {C} need not include any {A}, so I is uncertain."],
  [[["all", "A", "B"], ["some", "C", "A"]], [["some", "C", "B"], ["all", "B", "A"]], 0, "The {C} that are {A} are also {B}, so some {C} are {B} (I); 'All {A} are {B}' cannot be reversed, so II fails."],
  [[["some", "A", "B"], ["some", "B", "C"]], [["some", "A", "C"], ["all", "C", "A"]], 3, "Two 'some' statements give no definite link between {A} and {C}, so neither conclusion is certain."],
  [[["no", "A", "B"], ["no", "B", "C"]], [["no", "C", "B"], ["some", "A", "C"]], 0, "'No {b} is {c}' can be reversed to 'No {c} is {b}' (I); two negative statements say nothing about {A} and {C}."],
  [[["all", "A", "B"], ["all", "A", "C"]], [["some", "B", "C"], ["all", "B", "C"]], 0, "Every one of the {A} is both {b} and {c}, so some {B} are {C} (I); there may be {B} that are not {C}, so II fails."],
  [[["somenot", "A", "B"], ["all", "B", "C"]], [["somenot", "A", "C"], ["some", "C", "B"]], 1, "All {B} are {C}, so some {C} are {B} (II); the {A} that are not {B} may still be {C}, so I is uncertain."],
  [[["all", "A", "B"], ["no", "C", "A"]], [["no", "C", "B"], ["some", "B", "A"]], 1, "All {A} are {B}, so some {B} are {A} (II); {C} may overlap with the {B} that are not {A}, so I fails."],
  [[["some", "A", "B"], ["all", "A", "C"]], [["some", "C", "B"], ["some", "B", "C"]], 2, "The {A} that are {B} are also {C}, so some {C} are {B} (I) and some {B} are {C} (II)."],
  [[["all", "A", "B"], ["all", "C", "B"]], [["some", "A", "C"], ["some", "B", "C"]], 1, "All {C} are {B}, so some {B} are {C} (II); {A} and {C} both lie within {B} but need not overlap, so I fails."],
  [[["no", "A", "B"], ["all", "C", "A"]], [["no", "C", "B"], ["some", "A", "C"]], 2, "All {C} are {A} and no {a} is {b}, so no {c} is {b} (I); all {C} being {A} means some {A} are {C} (II)."],
  [[["all", "A", "B"], ["some", "A", "C"]], [["some", "B", "C"], ["somenot", "C", "B"]], 0, "The {A} that are {C} are also {B}, so some {B} are {C} (I); all {C} might be {B}, so II is uncertain."],
  [[["some", "A", "B"], ["no", "C", "B"]], [["somenot", "A", "C"], ["some", "B", "A"]], 2, "The {A} that are {B} cannot be {C}, so some {A} are not {C} (I); 'Some {A} are {B}' reverses to 'Some {B} are {A}' (II)."],
  [[["all", "A", "B"], ["no", "C", "B"]], [["no", "A", "C"], ["all", "C", "A"]], 0, "All {A} are {B} and no {c} is {b}, so no {a} is {c} (I); II contradicts this."],
  [[["no", "A", "B"], ["some", "C", "A"]], [["somenot", "C", "B"], ["some", "B", "C"]], 0, "The {C} that are {A} cannot be {B}, so some {C} are not {B} (I); nothing says any of the {B} are {C}."],
  [[["all", "A", "B"], ["all", "B", "C"]], [["somenot", "A", "C"], ["all", "C", "B"]], 3, "All {A} are {C}, so I is false; 'All {B} are {C}' cannot be reversed, so II is not certain."],
];
function syllogism() {
  const [stm, con, ans, why] = pick(FORMS), [A, B, C] = sample(TERMS, 3), m = { A, B, C };
  const r = (s) => say([s[0], m[s[1]], m[s[2]]]);
  const cap = (s) => s.replace(/\{([ABCabc])\}/g, (_, x) => (x === x.toUpperCase() ? m[x][0] : art(m[x.toUpperCase()][1])));
  return { q: `Statements: ${stm.map(r).join(". ")}. Conclusions: I. ${r(con[0])}. II. ${r(con[1])}.`, options: ["Only I follows", "Only II follows", "Both follow", "Neither follows"], answer: ans, explanation: cap(why) };
}

// ---------- cubes, alphabet, words ----------
function cubes() {
  const t = pick(["cube", "cube", "cuboid", "partial", "cut"]);
  if (t === "cube") {
    const n = ri(3, 10), c = { 3: 8, 2: 12 * (n - 2), 1: 6 * (n - 2) ** 2, 0: (n - 2) ** 3 };
    const k = pick(["3", "2", "1", "0", "atleast1", "atleast2"]);
    const [label, ans, how] = { 3: ["exactly three faces", 8, "only the 8 corner cubes"], 2: ["exactly two faces", c[2], `12 edges × (${n} − 2) = ${c[2]}`], 1: ["exactly one face", c[1], `6 faces × (${n} − 2)² = ${c[1]}`], 0: ["no face", c[0], `the inner (${n} − 2)³ = ${c[0]} cubes`], atleast1: ["at least one face", n ** 3 - c[0], `${n}³ − (${n} − 2)³ = ${n ** 3} − ${c[0]} = ${n ** 3 - c[0]}`], atleast2: ["at least two faces", 8 + c[2], `corners + edges = 8 + ${c[2]} = ${8 + c[2]}`] }[k];
    return mc(`A cube of side ${n} cm is painted on all faces and then cut into 1 cm cubes. How many of the small cubes have ${label} painted?`, ans, nearNums(ans, [c[1], c[2], c[0], 8, n ** 3 - c[0]].filter((x) => x !== ans)), `There are ${n ** 3} small cubes; ${label} painted: ${how}.`);
  }
  if (t === "cuboid") {
    const [a, b, c] = [ri(3, 7), ri(3, 7), ri(2, 6)].sort((x, y) => y - x);
    if (c < 3) return null;
    const none = (a - 2) * (b - 2) * (c - 2), two = 4 * (a - 2 + b - 2 + c - 2), one = 2 * ((a - 2) * (b - 2) + (b - 2) * (c - 2) + (a - 2) * (c - 2));
    const k = pick(["none", "two", "one"]), [label, ans, how] = { none: ["no face", none, `(${a} − 2)(${b} − 2)(${c} − 2) = ${none}`], two: ["exactly two faces", two, `4[(${a} − 2) + (${b} − 2) + (${c} − 2)] = ${two}`], one: ["exactly one face", one, `2[(${a - 2})(${b - 2}) + (${b - 2})(${c - 2}) + (${a - 2})(${c - 2})] = ${one}`] }[k];
    return mc(`A wooden block measuring ${a} cm × ${b} cm × ${c} cm is painted on all faces and cut into 1 cm cubes. How many cubes have ${label} painted?`, ans, nearNums(ans, [none, two, one, 8].filter((x) => x !== ans)), `Cubes with ${label} painted: ${how}.`);
  }
  if (t === "partial") {
    const n = ri(3, 8), adj = rnd() < 0.5, k = pick(["none", "one"]);
    const one = adj ? 2 * (n * n - n) : 2 * n * n, none = adj ? n ** 3 - (2 * n * n - n) : n ** 3 - 2 * n * n;
    const ans = k === "none" ? none : one;
    return mc(`A cube of side ${n} cm is painted on two ${adj ? "adjacent" : "opposite"} faces only and then cut into 1 cm cubes. How many small cubes have ${k === "none" ? "no paint on them" : "exactly one painted face"}?`, ans, nearNums(ans, [none, one, adj ? n : n * n, 6 * (n - 2) ** 2].filter((x) => x !== ans)), adj ? `Each painted face has ${n}² = ${n * n} cubes; the ${n} cubes on the shared edge have two painted faces. Exactly one face: 2 × (${n * n} − ${n}) = ${one}. Painted cubes total ${2 * n * n - n}, so ${none} have no paint.` : `The two opposite faces each have ${n * n} cubes with exactly one painted face (${one} in all), and the remaining ${n}³ − ${one} = ${none} cubes have no paint.`);
  }
  const k = pick([2, 3, 4, 5]), n = k * ri(2, 5), ans = (n / k) ** 3;
  return mc(`How many cubes of side ${k} cm can be cut from a solid cube of side ${n} cm?`, ans, nearNums(ans, [(n / k) ** 2, n ** 3 / k, 3 * (n / k)]), `(${n}/${k})³ = ${n / k}³ = ${ans}.`);
}

function alphabet() {
  const t = ri(0, 4);
  if (t === 0) { const m = ri(3, 20), k = ri(2, 26 - m), p = m + k; if (p > 26) return null; return mc(`Which letter is ${ord(k)} to the right of the ${ord(m)} letter from the left in the English alphabet?`, ch(p), [ch(p - 1), ch(p + 1 > 26 ? p - 2 : p + 1), ch(m + k - 2 > 0 ? m + k - 2 : 1), ch(27 - p)], `The ${ord(m)} letter from the left is ${ch(m)}; ${k} places to its right is the ${ord(p)} letter, ${ch(p)}.`); }
  if (t === 1) { const m = ri(3, 18), k = ri(2, 20), p = 27 - m - k; if (p < 1) return null; return mc(`Which letter is ${ord(k)} to the left of the ${ord(m)} letter from the right in the English alphabet?`, ch(p), [ch(p + 1), ch(p - 1 > 0 ? p - 1 : p + 2), ch(27 - p), ch(p + 2)], `The ${ord(m)} letter from the right is the ${ord(27 - m)} from the left (${ch(27 - m)}); ${k} to its left is the ${ord(p)} letter, ${ch(p)}.`); }
  if (t === 2) { const m = ri(3, 18), k = ri(2, 26 - m), p = 27 - (m + k); return mc(`If the English alphabet is written in reverse order (Z to A), which letter will be ${ord(k)} to the right of the ${ord(m)} letter from the left?`, ch(p), [ch(m + k), ch(p + 1 > 26 ? p - 2 : p + 1), ch(p - 1 > 0 ? p - 1 : p + 2), ch(27 - m)], `In the reversed alphabet the ${ord(m + k)} letter from the left is ${ch(p)} (position n holds letter 27 − n).`); }
  if (t === 3) { const a = ri(1, 20), b = a + 2 * ri(2, 6); if (b > 26) return null; const mid = (a + b) / 2; return mc(`Which letter is exactly midway between ${ch(a)} and ${ch(b)} in the English alphabet?`, ch(mid), [ch(mid + 1), ch(mid - 1), ch(mid + 2)], `${ch(a)} = ${a} and ${ch(b)} = ${b}; the midpoint is ${mid} = ${ch(mid)}.`); }
  const a = ri(1, 12), b = ri(a + 4, 26), n = b - a - 1; return mc(`How many letters are there between ${ch(a)} and ${ch(b)} in the English alphabet?`, n, nearNums(n, [n + 1, n + 2]), `${ch(a)} is ${a} and ${ch(b)} is ${b}; the letters strictly between them number ${b} − ${a} − 1 = ${n}.`);
}

const LONGWORDS = "CAPTAIN LIEUTENANT BATTALION REGIMENT ARTILLERY INFANTRY CAVALRY DISCIPLINE LEADERSHIP COURAGEOUS STRATEGY SQUADRON CORPORAL SERGEANT MAJORITY GENERATION CHAMPION MOUNTAIN KNOWLEDGE MANAGEMENT EDUCATION CERTAIN DYNAMIC HOSPITAL FRIENDSHIP BEAUTIFUL MOTIVATE PATIENCE INTEGRITY LOYALTY GALLANTRY SENTINEL TERRITORY PERIMETER CAMOUFLAGE AMMUNITION PARACHUTE HELICOPTER SUBMARINE DESTROYER FRIGATE CORVETTE AIRCRAFT RUNWAY COCKPIT BLUEPRINT HORIZON CHEMISTRY PHYSICS BIOLOGY HISTORY GEOGRAPHY LANGUAGE NOTEBOOK UNIVERSE TELESCOPE MONSOON FESTIVAL HARVEST".split(" ");
function wordTest() {
  const t = pick(["dict", "dict", "sameplace", "gap", "swap"]);
  if (t === "dict") {
    const groups = Object.values(WORDS.concat(LONGWORDS).reduce((g, w) => ((g[w[0]] ||= []).push(w), g), {})).filter((g) => g.length >= 4);
    const ws = sample(pick(groups), 4), sorted = [...ws].sort(), k = ri(0, 3);
    const lbl = ["first", "second", "third", "last"][k];
    return mc(`If the following words are arranged in dictionary order, which word comes ${lbl}? ${list(ws.map((w) => w[0] + w.slice(1).toLowerCase()))}`, sorted[k][0] + sorted[k].slice(1).toLowerCase(), ws.filter((w) => w !== sorted[k]).map((w) => w[0] + w.slice(1).toLowerCase()), `In dictionary order: ${sorted.map((w) => w[0] + w.slice(1).toLowerCase()).join(", ")}.`);
  }
  const w = pick(LONGWORDS);
  if (t === "sameplace") {
    const s = [...w].sort(), same = [...w].filter((c, i) => c === s[i]);
    return mc(`If the letters of the word ${w} are arranged in alphabetical order, how many letters remain in the same position?`, same.length, nearNums(same.length, [same.length + 1, same.length + 2]).filter((x) => x >= 0), `Alphabetical order: ${s.join("")}. Comparing with ${w}, ${same.length ? `${same.length} letter${same.length > 1 ? "s" : ""} (${same.join(", ")}) stay${same.length > 1 ? "" : "s"} in place` : "no letter stays in place"}.`);
  }
  if (t === "gap") {
    const pairs = [];
    for (let i = 0; i < w.length; i++) for (let j = i + 1; j < w.length; j++) if (j - i === Math.abs(pos(w[j]) - pos(w[i]))) pairs.push(w[i] + w[j]);
    const n = pairs.length;
    return mc(`How many pairs of letters in the word ${w} have as many letters between them in the word as there are between them in the English alphabet (in either direction)?`, n, nearNums(n, [n + 1, n + 2]).filter((x) => x >= 0), n ? `The pairs are ${list(pairs)} — ${n} in all.` : "Checking every pair, none has the same gap in the word as in the alphabet.");
  }
  const sw = [...w]; for (let i = 0; i + 1 < sw.length; i += 2) [sw[i], sw[i + 1]] = [sw[i + 1], sw[i]];
  const k = ri(2, Math.min(7, w.length)), ans = sw[sw.length - k];
  return mc(`In the word ${w}, the 1st and 2nd letters are interchanged, the 3rd and 4th letters are interchanged, and so on. Which letter will be ${ord(k)} from the right end?`, ans, [w[w.length - k], sw[sw.length - k - 1] ?? sw[0], sw[sw.length - k + 1] ?? sw[1], sw[k - 1]].filter((x) => x !== ans), `The new arrangement is ${sw.join("")}; the ${ord(k)} letter from the right is ${ans}.`);
}

// ---------- banks ----------
const fromBank = (row, q) => mc(q ?? row[0], row[1], row.slice(2, 5), row[5]);
const oddFromBank = (row) => mc("Which one does not belong with the others?", row[3], row.slice(0, 3), row[4]);
function vocabFromBank([head, ...opts]) {
  const [kind, text] = [head.slice(0, 1), head.slice(2)];
  if (kind === "S") return mc(`Choose the word most similar in meaning to ${text}.`, opts[0], opts.slice(1), `${text[0] + text.slice(1).toLowerCase()} means ${opts[0].toLowerCase()}.`);
  if (kind === "A") return mc(`Choose the word most opposite in meaning to ${text}.`, opts[0], opts.slice(1), `The opposite of ${text.toLowerCase()} is ${opts[0].toLowerCase()}; the other options are similar in meaning or unrelated.`);
  return mc(`Choose the one word for: "${text}"`, opts[0], opts.slice(1), `${opts[0]}: ${text.toLowerCase()}.`);
}
function statementFromBank([kind, q, ans, why]) {
  const options = kind === "A" ? ["Only I is implicit", "Only II is implicit", "Both are implicit", "Neither is implicit"] : ["Only I follows", "Only II follows", "Both follow", "Neither follows"];
  return { q: kind === "K" ? q + " Which course(s) of action follow?" : q, options, answer: Number(ans), explanation: why };
}

// ---------- assembly ----------
const keyOf = (q) => (GENERIC.has(q.q) ? q.q + "|" + [...q.options].sort().join("|") : q.q);
const seen = new Set();
for (let n = 1; n < FIRST; n++) for (const q of (await import(new URL(`oir-${n}.ts`, DIR))).default.questions) seen.add(keyOf(q));

function take(make) {
  for (let i = 0; i < 400; i++) {
    const q = make();
    if (!q) continue;
    const k = keyOf(q);
    if (seen.has(k)) continue;
    seen.add(k);
    return q;
  }
  throw new Error("could not generate a unique question: " + make.toString().slice(0, 60));
}
function takeBank(q, label) {
  if (!q) throw new Error("bad bank row " + label);
  const k = keyOf(q);
  if (seen.has(k)) throw new Error("bank question already used: " + q.q);
  seen.add(k);
  return q;
}

function buildTest(n) {
  seed(n * 7919);
  const i = n - FIRST;
  const fams = shuffle(Object.keys(seriesFamilies));
  const missFam = pick(MISSABLE.filter((f) => !fams.slice(0, 3).includes(f)));
  const ar = shuffle(arith), half = Math.ceil(ar.length / 2);
  return [
    take(() => numberSeries(fams[0])),
    take(() => numberSeries(fams[1])),
    take(() => numberSeries(fams[2])),
    take(() => numberSeries(missFam, true)),
    take(letterSeries),
    take(letterGroups),
    takeBank(fromBank(bank.analogies[i]), `analogies ${i}`),
    take(numberAnalogy),
    takeBank(fromBank(bank.gkAnalogies[i]), `gk ${i}`),
    takeBank(oddFromBank(bank.oddWords[i]), `odd ${i}`),
    take(oddNumber),
    takeBank(vocabFromBank(bank.vocab[i]), `vocab ${i}`),
    take(letterCoding),
    take(codeLanguage),
    take(n % 2 ? operatorSub : letterValue),
    takeBank(fromBank(bank.relations[i]), `relations ${i}`),
    takeBank(fromBank(bank.pointing[i]), `pointing ${i}`),
    take(directionDistance),
    take(directionTurns),
    take(ranking),
    take(ordering),
    take(() => pick(ar.slice(0, half))()),
    take(() => pick(ar.slice(half))()),
    take(clock),
    take(calendar),
    take(syllogism),
    takeBank(statementFromBank(bank.statements[i]), `statements ${i}`),
    take(cubes),
    take(alphabet),
    take(wordTest),
  ];
}

function releaseAt(n) {
  if (n <= LIVE_UNTIL) return null;
  const week = Math.floor((n - LIVE_UNTIL - 1) / PER_WEEK);
  const d = new Date(Date.parse(FIRST_SUNDAY + "T00:00:00Z") + week * 7 * DAY);
  return d.toISOString().slice(0, 10) + "T00:00:00+05:30";
}

const J = JSON.stringify;
for (let n = FIRST; n <= LAST; n++) {
  const qs = buildTest(n), rel = releaseAt(n);
  const body = qs.map((q) => `    { q: ${J(q.q)}, options: ${J(q.options).replace(/","/g, '", "')}, answer: ${q.answer}, explanation: ${J(q.explanation)} },`).join("\n");
  fs.writeFileSync(new URL(`oir-${n}.ts`, DIR), `import type { Test } from "./index";

const test: Test = {
  id: "oir-${n}",
  title: "OIR Test ${n}",
  durationMinutes: 20,${rel ? `\n  releaseAt: "${rel}",` : ""}
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
console.log(`wrote oir-${FIRST}..oir-${LAST} (${seen.size} unique questions incl. existing)`);

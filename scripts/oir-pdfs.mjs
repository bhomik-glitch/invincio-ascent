// Builds branded question-paper and answer-key PDFs for every OIR test that is live right now.
// Usage: node scripts/oir-pdfs.mjs   → writes to "OIR Test PDF/"
import { readFileSync, writeFileSync, mkdirSync, rmSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { tmpdir } from "node:os";
import { join } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const OUT = join(ROOT, "OIR Test PDF");
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const logo = "data:image/png;base64," + readFileSync(join(ROOT, "public/assets/logo.png")).toString("base64");

const tests = [];
for (let n = 1; ; n++) {
  let t;
  try { t = (await import(join(ROOT, `api/_tests/oir-${n}.ts`))).default; } catch { break; }
  if (!t.releaseAt || Date.parse(t.releaseAt) <= Date.now()) tests.push(t);
}

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const L = "ABCDE";
const today = new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

// Grid questions carry their rows inline as "a b c | d e f"; show them as a small table.
function qText(q) {
  const m = q.match(/^(.*?:)\s*(.+\|.+)$/);
  if (!m || !/rows separated/.test(q)) return `<p class="q">${esc(q)}</p>`;
  const rows = m[2].split("|").map((r) => r.trim().split(/\s{2,}|\s+/));
  return `<p class="q">${esc(m[1].replace(/\s*\(rows separated by " \| "\)/, ""))}</p>
    <table class="grid">${rows.map((r) => `<tr>${r.map((c) => `<td>${esc(c)}</td>`).join("")}</tr>`).join("")}</table>`;
}

const header = (t, kind) => `
  <header>
    <img src="${logo}" alt="Invincio">
    <div class="meta"><div class="kind">${kind}</div><h1>${esc(t.title)}</h1>
      <div class="sub">Officer Intelligence Rating · ${t.questions.length} Questions · ${t.durationMinutes} Minutes</div></div>
  </header>`;

const paper = (t) => `<section class="test">${header(t, "Question Paper")}
  <div class="instr"><b>Instructions:</b> Attempt all ${t.questions.length} questions in ${t.durationMinutes} minutes. Each question has one correct option. Mark your answer in the grid at the end.</div>
  <ol class="qs">${t.questions.map((x) => `<li>${qText(x.q)}
    <ol class="opts">${x.options.map((o, i) => `<li><span>${L[i]}</span>${esc(o)}</li>`).join("")}</ol></li>`).join("")}</ol>
  <div class="omr"><h2>Answer Sheet</h2><div class="cells">${t.questions.map((x, i) => `<div><b>${i + 1}</b>${[...L.slice(0, x.options.length)].map((l) => `<i>${l}</i>`).join("")}</div>`).join("")}</div>
    <p class="name">Name: ______________________________ &nbsp; Date: ____________ &nbsp; Score: ______ / ${t.questions.length}</p></div>
</section>`;

const key = (t) => `<section class="test">${header(t, "Answer Key")}
  <table class="quick">${chunk(t.questions, 10).map((row, r) => `<tr>${row.map((x, i) => `<td><b>${r * 10 + i + 1}</b> ${L[x.answer]}</td>`).join("")}</tr>`).join("")}</table>
  <ol class="ans">${t.questions.map((x) => `<li>${qText(x.q)}
    <p class="right">Answer: <b>(${L[x.answer]}) ${esc(x.options[x.answer])}</b></p>
    ${x.explanation ? `<p class="why">${esc(x.explanation)}</p>` : ""}</li>`).join("")}</ol>
</section>`;

function chunk(a, n) { const r = []; for (let i = 0; i < a.length; i += n) r.push(a.slice(i, i + n)); return r; }

const page = (title, body) => `<!doctype html><html><head><meta charset="utf-8"><title>${esc(title)}</title>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
  @page { size: A4; margin: 14mm 14mm 16mm; }
  :root { --blue:#00568C; --sky:#2FB4E7; --gold:#F6B828; --orange:#E66133; --text:#374151; --muted:#6B7280; --line:#e5e7eb; --tint:#eaf6f8; }
  * { box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  body { margin: 0; font: 10.5pt/1.45 Inter, system-ui, sans-serif; color: var(--text); }
  .test + .test { break-before: page; }
  header { display: flex; align-items: center; gap: 18px; padding-bottom: 10px; border-bottom: 3px solid var(--blue); position: relative; }
  header::after { content: ""; position: absolute; left: 0; bottom: -6px; width: 30%; height: 3px; background: var(--gold); }
  header img { height: 56px; }
  .meta { margin-left: auto; text-align: right; }
  .kind { display: inline-block; background: var(--blue); color: #fff; font-size: 8pt; font-weight: 600; letter-spacing: .08em; text-transform: uppercase; padding: 2px 10px; border-radius: 99px; }
  .test:has(.ans) .kind { background: var(--orange); }
  h1 { font: 700 20pt/1.1 "Playfair Display", Georgia, serif; color: var(--blue); margin: 4px 0 2px; }
  h2 { font: 700 14pt "Playfair Display", Georgia, serif; color: var(--blue); margin: 0 0 8px; }
  .sub { color: var(--muted); font-size: 9pt; }
  .instr { margin: 16px 0 10px; padding: 8px 12px; background: var(--tint); border-left: 4px solid var(--sky); border-radius: 4px; font-size: 9.5pt; }
  ol.qs, ol.ans { padding-left: 26px; margin: 12px 0 0; }
  ol.qs > li, ol.ans > li { break-inside: avoid; margin-bottom: 10px; padding-left: 4px; }
  ol.qs > li::marker, ol.ans > li::marker { color: var(--blue); font-weight: 700; }
  .q { margin: 0 0 4px; font-weight: 500; }
  ol.opts { list-style: none; padding: 0; margin: 0; display: grid; grid-template-columns: 1fr 1fr; gap: 2px 18px; }
  ol.opts span { display: inline-grid; place-items: center; width: 17px; height: 17px; margin-right: 6px; border: 1px solid var(--blue); border-radius: 50%; color: var(--blue); font-size: 7.5pt; font-weight: 600; }
  table.grid { border-collapse: collapse; margin: 2px 0 6px; }
  table.grid td { border: 1px solid #cbd5e1; padding: 2px 10px; text-align: center; font-variant-numeric: tabular-nums; }
  .omr { break-before: page; }
  .cells { display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px 14px; }
  .cells div { display: flex; align-items: center; gap: 6px; font-size: 9pt; }
  .cells b { width: 20px; text-align: right; color: var(--blue); }
  .cells i { font-style: normal; display: inline-grid; place-items: center; width: 18px; height: 18px; border: 1px solid #94a3b8; border-radius: 50%; font-size: 7.5pt; color: var(--muted); }
  .name { margin-top: 24px; font-size: 10pt; }
  table.quick { width: 100%; border-collapse: collapse; margin: 18px 0 6px; }
  table.quick td { border: 1px solid var(--line); padding: 4px 6px; text-align: center; font-size: 9.5pt; }
  table.quick td b { color: var(--blue); margin-right: 4px; }
  table.quick tr:nth-child(odd) td { background: var(--tint); }
  .right { margin: 0; color: #166534; font-size: 10pt; }
  .why { margin: 2px 0 0; color: var(--muted); font-size: 9pt; }
</style></head><body>${body}</body></html>`;

function pdf(name, title, body) {
  const html = join(tmpdir(), `oir-${process.pid}.html`);
  writeFileSync(html, page(title, body));
  execFileSync(CHROME, ["--headless=new", "--disable-gpu", "--no-pdf-header-footer", "--virtual-time-budget=8000",
    `--print-to-pdf=${join(OUT, name)}`, "file://" + html], { stdio: "ignore" });
  rmSync(html);
}

rmSync(OUT, { recursive: true, force: true });
mkdirSync(join(OUT, "Question Papers"), { recursive: true });
mkdirSync(join(OUT, "Answer Keys"), { recursive: true });
for (const t of tests) {
  pdf(`Question Papers/${t.title}.pdf`, t.title, paper(t));
  pdf(`Answer Keys/${t.title} - Answer Key.pdf`, `${t.title} Answer Key`, key(t));
}
pdf(`All Live OIR Tests (1-${tests.length}).pdf`, "All Live OIR Tests", tests.map(paper).join(""));
pdf(`All Answer Keys (1-${tests.length}).pdf`, "All OIR Answer Keys", tests.map(key).join(""));
console.log(`${tests.length} live tests → ${OUT}`);

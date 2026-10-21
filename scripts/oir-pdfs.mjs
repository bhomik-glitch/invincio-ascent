// Builds branded question-paper and answer-key PDFs for every OIR test that is live right now.
// Also builds "OIR Practice Booklet.pdf": cover, preface, copyright, contents, tests 1–20, then their answer keys.
// Usage: node scripts/oir-pdfs.mjs   → writes to "OIR Test PDF/"
import { readFileSync, writeFileSync, mkdirSync, rmSync, mkdtempSync } from "node:fs";
import { execFileSync, spawn } from "node:child_process";
import { tmpdir } from "node:os";
import { join } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const OUT = join(ROOT, "OIR Test PDF");
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const logo = "data:image/png;base64," + readFileSync(join(ROOT, "public/assets/logo.png")).toString("base64");
// Founder photo from the About page, cropped square around his face for the round frames.
const founderJpg = join(tmpdir(), `oir-founder-${process.pid}.jpg`);
execFileSync("magick", [join(ROOT, "public/assets/cooperateTraining2.jpeg"), "-crop", "280x280+385+225", "+repage", founderJpg]);
const founder = "data:image/jpeg;base64," + readFileSync(founderJpg).toString("base64");
rmSync(founderJpg);

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
  <header><span class="mk">@@${kind === "Answer Key" ? "K" : "P"}${t.id}@@</span>
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
  body > section + section { break-before: page; }
  .mk { position: absolute; font-size: 1px; color: transparent; }
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
  .cells { display: grid; grid-auto-flow: column; grid-template-rows: repeat(10, auto); gap: 8px 14px; }
  .wm { position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(-35deg); font: 700 64pt "Playfair Display", Georgia, serif; letter-spacing: .08em; color: var(--blue); opacity: .07; white-space: nowrap; pointer-events: none; z-index: 10; }
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
  @page :first { margin: 0; }
  .cover { height: 297mm; margin: -0px; background: linear-gradient(160deg, #00568C 0%, #003a5f 70%, #021526 100%); color: #fff; display: flex; flex-direction: column; align-items: center; text-align: center; padding: 18mm 18mm 14mm; position: relative; overflow: hidden; }
  .cover::before { content: ""; position: absolute; inset: 9mm; border: 1.5px solid rgba(246,184,40,.55); border-radius: 6px; pointer-events: none; }
  .cover .logo { background: #fff; border-radius: 12px; padding: 10px 22px; }
  .cover .logo img { height: 64px; display: block; }
  .cover .eyebrow { margin-top: 16mm; font-size: 10pt; letter-spacing: .3em; text-transform: uppercase; color: var(--gold); font-weight: 600; }
  .cover h1 { font: 700 46pt/1.02 "Playfair Display", Georgia, serif; color: #fff; margin: 4mm 0 0; }
  .cover .rule { width: 60mm; height: 3px; background: var(--gold); margin: 6mm auto; }
  .cover .tag { font-size: 12pt; color: #d6ecf7; max-width: 140mm; }
  .cover .stats { display: flex; gap: 8mm; margin-top: 8mm; }
  .cover .stats div { border: 1px solid rgba(255,255,255,.3); border-radius: 8px; padding: 3mm 6mm; }
  .cover .stats b { display: block; font: 700 20pt "Playfair Display", Georgia, serif; color: var(--gold); }
  .cover .stats span { font-size: 8.5pt; letter-spacing: .08em; text-transform: uppercase; color: #d6ecf7; }
  .cover .photo { margin-top: 12mm; width: 58mm; height: 58mm; border-radius: 50%; border: 4px solid var(--gold); overflow: hidden; box-shadow: 0 0 0 8px rgba(246,184,40,.18); }
  .cover .photo img { width: 100%; height: 100%; object-fit: cover;  }
  .cover .by { margin-top: 5mm; font-size: 9pt; letter-spacing: .2em; text-transform: uppercase; color: #9fd3ee; }
  .cover .who { font: 700 18pt "Playfair Display", Georgia, serif; margin-top: 1mm; }
  .cover .role { font-size: 9.5pt; color: #d6ecf7; }
  .cover .motto { margin-top: auto; font: italic 600 12pt "Playfair Display", Georgia, serif; color: var(--gold); }
  .cover .contact { margin-top: 3mm; font-size: 8.5pt; color: #b9d9ea; }
  .pagehead { font-size: 9pt; letter-spacing: .3em; text-transform: uppercase; color: var(--orange); font-weight: 600; }
  .preface h1 { font-size: 30pt; margin: 2mm 0 1mm; }
  .preface .desk { display: flex; align-items: center; gap: 14px; padding-bottom: 10px; border-bottom: 3px solid var(--blue); position: relative; margin-bottom: 14px; }
  .preface .desk::after { content: ""; position: absolute; left: 0; bottom: -6px; width: 30%; height: 3px; background: var(--gold); }
  .preface .desk img { width: 30mm; height: 30mm; border-radius: 50%; object-fit: cover; border: 3px solid var(--gold); }
  .preface .desk .meta { text-align: right; }
  .preface .desk .meta img { width: auto; height: 46px; border: 0; border-radius: 0; }
  .preface blockquote { margin: 0 0 12px; padding: 10px 16px; background: var(--tint); border-left: 4px solid var(--gold); font: italic 600 12pt/1.45 "Playfair Display", Georgia, serif; color: var(--blue); }
  .preface p { margin: 0 0 8px; text-align: justify; font-size: 10.3pt; }
  .preface .close { font-weight: 600; color: var(--blue); }
  .preface .sign { margin-top: 12px; }
  .preface .sign b { display: block; font: 700 14pt "Playfair Display", Georgia, serif; color: var(--blue); }
  .preface .sign span { display: block; font-size: 9.5pt; color: var(--muted); }
  .preface .motto { margin-top: 14px; text-align: center; font: italic 600 11pt "Playfair Display", Georgia, serif; color: var(--orange); }
  .guide { font-size: 9.3pt; line-height: 1.36; }
  .guide h1 { font-size: 22pt; margin: 1mm 0 3mm; }
  body > .guide + .guide { break-before: auto; clear: both; margin-top: 5mm; padding-top: 4mm; border-top: 2px solid var(--gold); }
  .guide h3 { font: 700 12.5pt "Playfair Display", Georgia, serif; color: var(--blue); margin: 9px 0 4px; break-after: avoid; }
  .guide p { margin: 0 0 6px; text-align: justify; }
  .guide ul, .guide ol { margin: 0 0 8px; padding-left: 20px; }
  .guide li { margin-bottom: 3px; }
  .guide blockquote { margin: 0 0 12px; padding: 10px 16px; background: var(--tint); border-left: 4px solid var(--gold); font: italic 600 12pt/1.45 "Playfair Display", Georgia, serif; color: var(--blue); }
  .guide .note { padding: 6px 10px; background: #fff7e0; border-left: 3px solid var(--gold); border-radius: 3px; }
  .guide .small { font-size: 9pt; color: var(--muted); }
  .guide .tbl { border-collapse: collapse; margin: 4px 0 10px; font-size: 9.5pt; break-inside: avoid; }
  .guide .tbl th { background: var(--blue); color: #fff; text-align: left; padding: 4px 12px; font-weight: 600; }
  .guide .tbl td { border: 1px solid var(--line); padding: 3px 12px; }
  .guide .tbl.wide { width: 100%; }
  .guide .tbl:not(.wide) { float: left; margin: 2px 16px 6px 0; }
  .guide .note { overflow: hidden; }
  .guide .tbl tr:nth-child(even) td { background: var(--tint); }
  .guide .tbl .total td { font-weight: 700; color: var(--blue); }
  .guide .err { border: 1px solid var(--line); border-top: 3px solid var(--sky); border-radius: 6px; padding: 2px 12px 6px; margin-bottom: 10px; }
  .guide .err h3 { margin-top: 8px; }
  .guide .fix { color: #166534; }
  .guide .tiles { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin: 6px 0 10px; break-inside: avoid; }
  .guide .tiles div { border: 1px solid var(--line); border-radius: 8px; padding: 8px; text-align: center; background: var(--tint); }
  .guide .tiles b { display: block; font: 700 24pt "Playfair Display", Georgia, serif; color: var(--orange); }
  .guide .tiles span { font-size: 9pt; font-weight: 600; }
  .guide .cycle { display: flex; flex-wrap: wrap; align-items: center; gap: 5px; margin: 6px 0 10px; color: var(--gold); font-weight: 700; }
  .guide .cycle span { background: var(--blue); color: #fff; border-radius: 99px; padding: 3px 10px; font-size: 9pt; font-weight: 600; }
  .guide .advice { margin-top: 10px; padding: 4px 16px 12px; background: var(--tint); border-left: 4px solid var(--gold); border-radius: 4px; }
  .guide .close { font-weight: 700; color: var(--blue); }
  .guide .sign b { display: block; font: 700 13pt "Playfair Display", Georgia, serif; color: var(--blue); }
  .guide .sign span { display: block; font-size: 9pt; color: var(--muted); }
  .legal { padding-top: 120mm; font-size: 9.5pt; }
  .legal h2 { font-size: 18pt; }
  .legal p { margin: 0 0 8px; text-align: justify; }
  .legal .contact { margin-top: 14px; padding-top: 10px; border-top: 2px solid var(--gold); color: var(--muted); }
  .contents h1 { font-size: 28pt; margin: 1mm 0 4mm; }
  .contents .cols { display: grid; grid-template-columns: 1fr 1fr; gap: 0 12mm; }
  .contents h2 { font-size: 13pt; padding-bottom: 4px; border-bottom: 2px solid var(--gold); }
  .contents .row { display: flex; align-items: baseline; gap: 6px; padding: 2.4mm 0; border-bottom: 1px dotted #cbd5e1; font-size: 10.5pt; }
  .contents .row i { flex: 1; }
  .contents .row b { color: var(--blue); font-variant-numeric: tabular-nums; }
  .contents .front { margin-top: 8mm; font-size: 9.5pt; color: var(--muted); }
  .divider { height: 267mm; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; }
  .divider .part { font-size: 11pt; letter-spacing: .4em; text-transform: uppercase; color: var(--orange); font-weight: 700; }
  .divider h1 { font-size: 40pt; margin: 4mm 0; }
  .divider .rule { width: 50mm; height: 3px; background: var(--gold); margin: 3mm auto 6mm; }
  .divider p { max-width: 130mm; color: var(--muted); }
</style></head><body><div class="wm">LIVE TO LEARN</div>${body}</body></html>`;

// Chrome over DevTools Protocol: the plain CLI can't print page numbers, and the booklet's contents page needs them.
async function chrome() {
  const dir = mkdtempSync(join(tmpdir(), "oir-chrome-"));
  const proc = spawn(CHROME, ["--headless=new", "--disable-gpu", "--remote-debugging-port=0", `--user-data-dir=${dir}`, "about:blank"]);
  const url = await new Promise((ok, bad) => {
    let err = "";
    proc.stderr.on("data", (d) => { err += d; const m = err.match(/ws:\/\/\S+/); if (m) ok(m[0]); });
    proc.on("exit", () => bad(new Error("Chrome exited: " + err)));
  });
  const ws = new WebSocket(url);
  await new Promise((ok) => (ws.onopen = ok));
  let id = 0;
  const pending = new Map();
  ws.onmessage = (e) => {
    const m = JSON.parse(e.data);
    const p = pending.get(m.id);
    if (!p) return;
    pending.delete(m.id);
    m.error ? p.bad(new Error(m.error.message)) : p.ok(m.result);
  };
  const send = (method, params = {}, sessionId) =>
    new Promise((ok, bad) => { pending.set(++id, { ok, bad }); ws.send(JSON.stringify({ id, method, params, sessionId })); });
  const { targetId } = await send("Target.createTarget", { url: "about:blank" });
  const { sessionId } = await send("Target.attachToTarget", { targetId, flatten: true });
  return {
    send: (method, params) => send(method, params, sessionId),
    close() { ws.close(); proc.kill(); setTimeout(() => rmSync(dir, { recursive: true, force: true }), 500); },
  };
}

const footer = `<div style="width:100%;margin:0 14mm;padding-top:2mm;border-top:0.5px solid #e5e7eb;font:7px Helvetica,Arial,sans-serif;color:#6B7280;display:flex;justify-content:space-between">
  <span>© 2026 Invincio Services LLP · www.invincioservices.com</span><span class="pageNumber"></span></div>`;

let cdp;
async function pdf(name, title, body) {
  const html = join(tmpdir(), `oir-${process.pid}.html`);
  writeFileSync(html, page(title, body));
  await cdp.send("Page.navigate", { url: "file://" + html });
  await cdp.send("Runtime.evaluate", { awaitPromise: true, expression:
    "new Promise(r => { const go = () => document.fonts.ready.then(() => r(1)); document.readyState === 'complete' ? go() : addEventListener('load', go); })" });
  // Stream the PDF back in chunks: one base64 message for a 200-page file stalls the socket.
  const { stream } = await cdp.send("Page.printToPDF", { printBackground: true, preferCSSPageSize: true,
    displayHeaderFooter: true, headerTemplate: "<span></span>", footerTemplate: footer, transferMode: "ReturnAsStream" });
  const parts = [];
  for (let r; !(r = await cdp.send("IO.read", { handle: stream, size: 1 << 20 })).eof || r.data; ) {
    parts.push(Buffer.from(r.data, r.base64Encoded ? "base64" : "utf8"));
    if (r.eof) break;
  }
  await cdp.send("IO.close", { handle: stream });
  writeFileSync(join(OUT, name), Buffer.concat(parts));
  rmSync(html);
}

const GUIDE = readFileSync(join(ROOT, "scripts/oir-guide.html"), "utf8");
const PREFACE = readFileSync(join(ROOT, "scripts/oir-preface.txt"), "utf8").trim().split(/\n\s*\n/);

const cover = (n, q) => `<section class="cover">
  <div class="logo"><img src="${logo}" alt="Invincio"></div>
  <div class="eyebrow">SSB Screening · Stage I</div>
  <h1>OIR Practice<br>Booklet</h1>
  <div class="rule"></div>
  <div class="tag">Officer Intelligence Rating practice tests with answer keys and step-by-step explanations</div>
  <div class="stats"><div><b>${n}</b><span>Full tests</span></div><div><b>${q}</b><span>Questions</span></div><div><b>25</b><span>Min per test</span></div></div>
  <div class="photo"><img src="${founder}" alt="Lt Col Ankur Sabharwal"></div>
  <div class="by">Under the mentorship of</div>
  <div class="who">Lt Col Ankur Sabharwal</div>
  <div class="role">Military Veteran · Founder &amp; CEO, Invincio Services LLP · Former GTO &amp; Mentor of Assessors at DIPR</div>
  <div class="motto">Everyone is a Soldier &nbsp;|&nbsp; Learn to Live to Learn</div>
  <div class="contact">www.invincioservices.com &nbsp;·&nbsp; +91 86014 07444 &nbsp;·&nbsp; invincio_soldier@outlook.com</div>
</section>`;

// PREFACE paragraphs: [heading, desk line, quote, ...body, motto]; the sign-off block is a single paragraph.
function preface() {
  const [, desk, quote, ...rest] = PREFACE;
  const motto = rest.pop();
  const sign = rest.pop().split("\n");
  const body = rest.map((p) => (/^(Once Invincio|Jai Hind)/.test(p) ? `<p class="close">${esc(p)}</p>` : `<p>${esc(p)}</p>`)).join("");
  return `<section class="preface"><span class="mk">@@Xpreface@@</span>
  <div class="desk"><img src="${founder}" alt="Lt Col Ankur Sabharwal">
    <div><div class="pagehead">${esc(desk)}</div><h1>Preface</h1></div>
    <div class="meta"><img src="${logo}" alt="Invincio"></div></div>
  <blockquote>${esc(quote)}</blockquote>${body}
  <div class="sign"><b>${esc(sign[0])}</b>${sign.slice(1).map((l) => `<span>${esc(l)}</span>`).join("")}</div>
  <div class="motto">${esc(motto)}</div>
</section>`;
}

const legal = () => `<section class="legal"><span class="mk">@@Xlegal@@</span>
  <h2>OIR Practice Booklet</h2>
  <p>First Edition · ${new Date().toLocaleDateString("en-IN", { month: "long", year: "numeric" })}</p>
  <p><b>© 2026 Invincio Services LLP. All rights reserved.</b></p>
  <p>No part of this publication may be reproduced, stored in a retrieval system, or transmitted in any form or by any means, electronic, mechanical, photocopying, recording or otherwise, without the prior written permission of Invincio Services LLP.</p>
  <p>This booklet is issued for the personal practice of Invincio students. Sharing, reselling or uploading it, in whole or in part, is not permitted.</p>
  <p>The questions in this booklet are original practice material prepared by Invincio to build familiarity with the Officer Intelligence Rating test. They are not official SSB questions, and Invincio is not affiliated with the Ministry of Defence or any Services Selection Board.</p>
  <div class="contact">Invincio Services LLP · Delivering Excellence<br>www.invincioservices.com · +91 86014 07444 · invincio_soldier@outlook.com</div>
</section>`;

const contents = (set, pages) => `<section class="contents">
  <div class="pagehead">Index</div><h1>Contents</h1>
  <div class="cols">
    <div><h2>Part A · Practice Tests</h2>${set.map((t) => `<div class="row"><i>${esc(t.title)}</i><b>${pages["P" + t.id] ?? "00"}</b></div>`).join("")}</div>
    <div><h2>Part B · Answer Keys</h2>${set.map((t) => `<div class="row"><i>${esc(t.title)} · Answers &amp; Explanations</i><b>${pages["K" + t.id] ?? "00"}</b></div>`).join("")}</div>
  </div>
  <p class="front">Preface p. ${pages.Xpreface ?? 0} · How to Approach the OIR Test p. ${pages.Xguide ?? 0} · Copyright p. ${pages.Xlegal ?? 0} · Each test: ${set[0].questions.length} questions, ${set[0].durationMinutes} minutes, followed by an OMR answer sheet.</p>
</section>`;

const divider = (part, title, text) => `<section class="divider"><div class="part">${part}</div><h1>${title}</h1><div class="rule"></div><p>${text}</p></section>`;

async function booklet(set) {
  const name = "OIR Practice Booklet.pdf";
  const body = (pages) => [cover(set.length, set.reduce((n, t) => n + t.questions.length, 0)), preface(), GUIDE, legal(), contents(set, pages),
    divider("Part A", "Practice Tests", `${set.length} full-length OIR tests. Sit each one in a single, timed ${set[0].durationMinutes}-minute session and mark your answers on the OMR sheet at its end.`),
    ...set.map(paper),
    divider("Part B", "Answer Keys", "Check your OMR sheet against the quick key, then read the explanation for every question you got wrong or guessed."),
    ...set.map(key)].join("");
  // Pass 1 finds the page each test starts on (hidden @@ markers), pass 2 prints them in the contents.
  await pdf(name, "OIR Practice Booklet", body({}));
  const pages = {};
  execFileSync("pdftotext", [join(OUT, name), "-"], { encoding: "utf8", maxBuffer: 1 << 28 }).split("\f")
    .forEach((text, i) => { for (const [, m] of text.matchAll(/@@(\w[\w-]*)@@/g)) pages[m] ??= i + 1; });
  await pdf(name, "OIR Practice Booklet", body(pages));
}

rmSync(OUT, { recursive: true, force: true });
mkdirSync(join(OUT, "Question Papers"), { recursive: true });
mkdirSync(join(OUT, "Answer Keys"), { recursive: true });
cdp = await chrome();
for (const t of tests) {
  await pdf(`Question Papers/${t.title}.pdf`, t.title, paper(t));
  await pdf(`Answer Keys/${t.title} - Answer Key.pdf`, `${t.title} Answer Key`, key(t));
}
await pdf(`All Live OIR Tests (1-${tests.length}).pdf`, "All Live OIR Tests", tests.map(paper).join(""));
await pdf(`All Answer Keys (1-${tests.length}).pdf`, "All OIR Answer Keys", tests.map(key).join(""));
await booklet(tests.slice(0, 20));
cdp.close();
console.log(`${tests.length} live tests → ${OUT}`);

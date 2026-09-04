#!/usr/bin/env node
/**
 * Indian Army notification tracker.
 *
 * joinindianarmy.nic.in is CAPTCHA-walled (every page 302s to Authentication.aspx),
 * so we can't scrape it directly. Instead we watch Google News RSS for the news
 * outlets that report every Army recruitment event same-day, run strict filters,
 * dedupe by event, and stage survivors into src/data/army-feed.json as
 * status:"review". Nothing reaches the website until a human flips an item to
 * status:"published" (done in the PR this raises via GitHub Actions).
 *
 *   node scripts/track-army.mjs            # fetch + curate + stage into the feed
 *   node scripts/track-army.mjs --selftest # run the filter/dedupe assertions
 *
 * The <link> in each item is a Google News redirect URL — it resolves fine in a
 * browser, but at PR-review time you should replace it with the authoritative
 * link (joinindianarmy.nic.in page or the official PDF).
 */

import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import assert from "node:assert/strict";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const FEED_PATH = resolve(ROOT, "src/data/army-feed.json");
const PR_BODY_PATH = resolve(ROOT, "scripts/.army-pr-body.md");

// Two queries: broad Army events (14d) + officer-entry focus (30d, our audience).
const QUERIES = [
  '("join indian army" OR joinindianarmy.nic.in) (notification OR recruitment OR registration OR "admit card" OR result OR "merit list") when:14d',
  'joinindianarmy.nic.in (SSC Tech OR TES OR TGC OR JAG OR "NCC Special" OR "Short Service Commission" OR ACC OR SCO OR "10+2 TES") when:30d',
];
const RSS = (q) =>
  `https://news.google.com/rss/search?q=${encodeURIComponent(q)}&hl=en-IN&gl=IN&ceid=IN:en`;

// --- filters -----------------------------------------------------------------

const EVENT =
  /\b(notification|recruitment|registration|apply online|admit card|hall ticket|result|merit list|cut[- ]?off|last date|online form|vacanc)/i;
const SUBJECT =
  /(joinindianarmy\.nic\.in|\bagniveer\b|\bssc tech|\btes[- ]?\d|\btgc[- ]?\d|\bjag\b|\bncc special|\bacc\b|\bsco\b|\bnda\b|short service commission|technical graduate|nursing assistant|university entry|\bues\b)/i;
const JUNK =
  /^(how to|top \d|can i\b|why\b|should\b|is it\b|what.?s next|cracked|recommended in|only gorkhas|nepal |ways to|best )/i;
const VAGUE =
  /\b(expected|likely|soon|shortly|rumou?r|internet flooded|here.?s the truth|preparation guide|success story|defence wallah|study plan|coaching|previous year|to be declared|speculat|fake news)\b/i;

const OFFICER =
  /\b(ssc tech|tes[- ]?\d|tgc[- ]?\d|\bjag\b|ncc special|\bacc\b|\bsco\b|\bnda\b|short service commission|technical graduate|university entry|\bues\b|officer)\b/i;
const SOLDIER = /\b(agniveer|nursing assistant|tradesman|havildar|rally|sepoy|clerk|soldier)\b/i;

const clean = (s) =>
  s.replace(/&amp;/g, "&").replace(/&#39;|&rsquo;/g, "'").replace(/&quot;/g, '"').trim();

export function keep(rawTitle) {
  const t = clean(rawTitle);
  return EVENT.test(t) && SUBJECT.test(t) && !JUNK.test(t) && !VAGUE.test(t);
}

export function category(rawTitle) {
  const t = clean(rawTitle);
  if (OFFICER.test(t)) return "officer";
  if (SOLDIER.test(t)) return "soldier";
  return "general";
}

/** Collapse "SSC Tech 68 Notification 2026 Out: Apply... - PW" -> "ssc-tech-68-notification-2026". */
export function eventKey(rawTitle) {
  let t = clean(rawTitle)
    .toLowerCase()
    .replace(/\s+[-–—]\s+[a-z0-9.'& ]+$/i, "") // strip trailing " - Source"
    .replace(/[^\w\s+]/g, " ")
    .replace(
      /\b(out|released|declared|active|direct|link|here|now|check|download|steps?|to|latest|update[sd]?|apply|online|pdf|the|for|at|on|is|of|indian|army|join|india)\b/g,
      " ",
    )
    .replace(/\s+/g, " ")
    .trim();

  const course = t.match(
    /\b(agniveer(?: gd| cee| technical| clerk| tradesman)?|ssc tech(?:nical)?(?: \d+)?|tes ?\d+|tgc ?\d+|jag(?: \d+(?:th)?)?|ncc special(?: entry)?(?: \d+(?:th)?)?|acc|sco|nda(?: \w+)?|nursing assistant|tradesman|havildar)\b/,
  );
  const kind = t.match(
    /\b(notification|recruitment|registration|admit card|hall ticket|result|merit list|cut ?off|online form|vacanc\w*|last date)\b/,
  );
  const year = t.match(/\b(20\d{2})\b/);

  const raw =
    course && kind
      ? [course[1], kind[1], year ? year[1] : ""].join(" ")
      : t.split(" ").filter((w) => w.length > 2).slice(0, 6).join(" ");

  return raw.replace(/\s+/g, "-").replace(/^-+|-+$/g, "");
}

// --- rss --------------------------------------------------------------------

function parseItems(xml) {
  return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map((m) => {
    const g = (re) => (m[1].match(re)?.[1] ?? "").replace(/<!\[CDATA\[|\]\]>/g, "");
    const source = clean(g(/<source[^>]*>([\s\S]*?)<\/source>/));
    let title = clean(g(/<title>([\s\S]*?)<\/title>/));
    if (source && title.endsWith(` - ${source}`)) title = title.slice(0, -(source.length + 3)).trim();
    return {
      title,
      link: g(/<link>([\s\S]*?)<\/link>/).trim(),
      source,
      pubDate: g(/<pubDate>([\s\S]*?)<\/pubDate>/).trim(),
    };
  });
}

function isoDate(pubDate) {
  const d = new Date(pubDate);
  return Number.isNaN(+d) ? "" : d.toISOString().slice(0, 10);
}

async function fetchCurated() {
  const raw = [];
  for (const q of QUERIES) {
    const res = await fetch(RSS(q), { headers: { "user-agent": "Mozilla/5.0" } });
    if (!res.ok) throw new Error(`RSS ${res.status} for query: ${q}`);
    raw.push(...parseItems(await res.text()));
  }

  const byKey = new Map();
  for (const it of raw) {
    if (!it.title || !it.link || !keep(it.title)) continue;
    const id = eventKey(it.title);
    if (!id) continue;
    const date = isoDate(it.pubDate);
    const prev = byKey.get(id);
    // keep the earliest-dated headline for each event (the first announcement)
    if (!prev || (date && date < prev.date)) {
      byKey.set(id, {
        id,
        title: it.title,
        link: it.link,
        source: it.source || "Google News",
        date: date || new Date().toISOString().slice(0, 10),
        category: category(it.title),
        status: "review",
      });
    }
  }
  return [...byKey.values()].sort((a, b) => b.date.localeCompare(a.date));
}

// --- main ------------------------------------------------------------------

async function main() {
  const feed = JSON.parse(await readFile(FEED_PATH, "utf8"));
  const known = new Set(feed.items.map((i) => i.id));

  const curated = await fetchCurated();
  const fresh = curated.filter((i) => !known.has(i.id));

  if (!fresh.length) {
    console.log("No new Army notifications. Nothing to stage.");
    await writeFile(PR_BODY_PATH, "");
    return;
  }

  feed.items = [...fresh, ...feed.items];
  feed.updated = new Date().toISOString().slice(0, 10);
  await writeFile(FEED_PATH, JSON.stringify(feed, null, 2) + "\n");

  const body = [
    `Staged **${fresh.length}** candidate Army notification(s) as \`status: "review"\`.`,
    "",
    "**They are NOT live on the site yet.** For each one you want to publish:",
    "",
    "1. Set `status` to `\"published\"` in `src/data/army-feed.json`.",
    "2. Replace `link` with the authoritative URL (joinindianarmy.nic.in page or the official PDF) — the current link is a Google News redirect.",
    "3. Tidy the `title` if needed.",
    "",
    "Set `status` to `\"hidden\"` for anything you don't want (keeps it out of future PRs). Then merge.",
    "",
    "---",
    "",
    ...fresh.map(
      (i) =>
        `- **${i.title}**  \n  \`${i.id}\` · ${i.category} · ${i.date} · _${i.source}_  \n  ${i.link}`,
    ),
  ].join("\n");
  await writeFile(PR_BODY_PATH, body + "\n");

  console.log(`Staged ${fresh.length} item(s):`);
  for (const i of fresh) console.log(`  - [${i.category}] ${i.title}`);
}

// --- selftest ------------------------------------------------------------------

function selftest() {
  // keep / drop
  assert.ok(keep("Indian Army SSC Tech 68 Notification 2026 Out: Apply Online for 381 Vacancies at joinindianarmy.nic.in - PW"));
  assert.ok(keep("Indian Army JAG 125th Course April 2027 Online Form (Released): Apply Online Link (Active) - PW"));
  assert.ok(keep("Army Nursing Assistant Admit Card 2026 Out @joinindianarmy.nic.in, Direct Download Link - Adda247"));
  assert.ok(keep("Indian Army Agniveer CEE Result 2026 declared @joinindianarmy.nic.in; Direct link here - Moneycontrol.com"));
  assert.ok(!keep("Top 10 Ways To Join Indian Army In 2026 - SSBCrack"));
  assert.ok(!keep("How to Register on Join Indian Army Portal After NDA Result, Check Details Here - PW"));
  assert.ok(!keep("Agniveer CEE Results 2026 Date: Merit list expected soon at joinindianarmy.nic.in - The Indian Express"));
  assert.ok(!keep("Indian Army Agniveer Result 2026 to Be Declared Shortly; Check Expected Date and Time - Telegraph India"));
  assert.ok(!keep("Join Indian Army Agniveer Result 2026 Out: What's Next? Complete Selection Process & Defence Wallah Preparation Guide - PW"));

  // category
  assert.equal(category("Indian Army SSC Tech 68 Notification 2026 - PW"), "officer");
  assert.equal(category("Indian Army JAG 125th Course April 2027 Online Form - PW"), "officer");
  assert.equal(category("Army Nursing Assistant Admit Card 2026 Out - Adda247"), "soldier");
  assert.equal(category("Indian Army Agniveer Admit Card 2026 released - Moneycontrol.com"), "soldier");

  // dedupe: many outlets, one event key
  const a = eventKey("Indian Army SSC Tech 68 Notification 2026 Out: Apply Online for 381 Vacancies at joinindianarmy.nic.in - PW");
  const b = eventKey("Indian Army SSC Tech 2025 recruitment begins for 381 posts at joinindianarmy.nic.in; details here - Scroll.in");
  assert.equal(a, "ssc-tech-68-notification-2026");
  assert.notEqual(a, b); // different course number / kind => different event, correct

  const r1 = eventKey("Indian Army Agniveer CEE Result 2026 declared @joinindianarmy.nic.in; Direct link here - Moneycontrol.com");
  const r2 = eventKey("Indian Army Agniveer CEE result 2026 released at joinindianarmy.nic.in: Direct link to download scorecard - The Times of India");
  const r3 = eventKey("(OUT) Indian Army Agniveer Result 2026 Released : Download CEE Merit List PDF at joinindianarmy.nic.in - Jagran Josh");
  assert.equal(r1, r2, `expected same key, got "${r1}" vs "${r2}"`);
  assert.equal(r1, "agniveer cee result 2026".replace(/ /g, "-"));
  assert.equal(r3, "agniveer result 2026".replace(/ /g, "-")); // "merit list" vs "result" — reviewer merges if needed

  console.log("selftest: all assertions passed");
}

if (process.argv.includes("--selftest")) selftest();
else main().catch((e) => { console.error(e); process.exit(1); });

#!/usr/bin/env node
/**
 * Indian Army notification tracker.
 *
 * joinindianarmy.nic.in is CAPTCHA-walled (every page 302s to Authentication.aspx),
 * so we can't scrape it directly. Instead we watch Google News RSS for the news
 * outlets that report every Army recruitment event same-day, run strict filters,
 * dedupe by event, and publish survivors straight into src/data/army-feed.json
 * (status:"published"). The GitHub Actions cron commits the file to main and the
 * site redeploys — fully automatic, no review step.
 *
 *   node scripts/track-army.mjs            # fetch + curate + write the feed
 *   node scripts/track-army.mjs --selftest # run the filter/dedupe assertions
 *
 * Each item's link is resolved to the real publisher article URL (not a
 * news.google.com redirect) before it is written. If resolution fails the item
 * is skipped that run and retried next cron.
 *
 * To bury an item, set its status to "hidden" in src/data/army-feed.json — it
 * stays out of future runs.
 */

import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import assert from "node:assert/strict";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const FEED_PATH = resolve(ROOT, "src/data/army-feed.json");
const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36";

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
    const res = await fetch(RSS(q), { headers: { "user-agent": UA } });
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
        status: "published",
      });
    }
  }
  return [...byKey.values()].sort((a, b) => b.date.localeCompare(a.date));
}

// --- resolve google-news redirect -> real publisher article url ------------
// news.google.com stopped embedding the target URL in 2024; the only reliable
// route is its internal `garturlreq` RPC (same call the news.google.com SPA
// makes when you click an article). If Google changes this, resolution throws
// and the item is skipped that run, then retried on the next cron.

async function resolvePublisherUrl(gnUrl) {
  const html = await (await fetch(gnUrl, { headers: { "user-agent": UA } })).text();
  const id = html.match(/data-n-a-id="([^"]+)"/)?.[1];
  const sig = html.match(/data-n-a-sg="([^"]+)"/)?.[1];
  const ts = html.match(/data-n-a-ts="([^"]+)"/)?.[1];
  if (!id || !sig || !ts) throw new Error("no id/sig/ts in article shell");

  const inner = JSON.stringify([
    "garturlreq",
    [["X", "X", ["X", "X"], null, null, 1, 1, "US:en", null, 1, null, null, null, null, null, 0, 1],
     "X", "X", 1, [1, 1, 1], 1, 1, null, 0, 0, null, 0],
    id, Number(ts), sig,
  ]);
  const freq = JSON.stringify([[["Fbv4je", inner, null, "generic"]]]);
  const res = await fetch("https://news.google.com/_/DotsSplashUi/data/batchexecute", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded;charset=UTF-8", "user-agent": UA },
    body: "f.req=" + encodeURIComponent(freq),
  });
  const line = (await res.text()).split("\n").find((l) => l.includes("garturlres"));
  if (!line) throw new Error("garturlres missing from RPC response");
  const url = JSON.parse(JSON.parse(line)[0][2])[1];
  if (!/^https?:\/\//.test(url || "")) throw new Error("RPC returned non-url");
  return url;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// --- main ------------------------------------------------------------------

async function main() {
  const feed = JSON.parse(await readFile(FEED_PATH, "utf8"));
  const known = new Set(feed.items.map((i) => i.id));

  const curated = await fetchCurated();
  const candidates = curated.filter((i) => !known.has(i.id));

  const fresh = [];
  for (const item of candidates) {
    try {
      item.link = await resolvePublisherUrl(item.link);
      fresh.push(item);
    } catch (e) {
      console.warn(`skip (link unresolved, will retry next run): ${item.title} — ${e.message}`);
    }
    await sleep(500); // be polite to news.google.com
  }

  if (!fresh.length) {
    console.log("No new Army notifications.");
    return;
  }

  feed.items = [...fresh, ...feed.items];
  feed.updated = new Date().toISOString().slice(0, 10);
  await writeFile(FEED_PATH, JSON.stringify(feed, null, 2) + "\n");

  console.log(`Published ${fresh.length} new item(s):`);
  for (const i of fresh) console.log(`  - [${i.category}] ${i.title}\n    ${i.link}`);
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

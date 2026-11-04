#!/usr/bin/env node
/* ═══════════════════════════════════════════════════════════════════════
   UNIQUENESS CHECK — how much of each city × service page exists ONLY there.

   Run after `next build`:  npm run check:uniqueness [-- --cities a,b,c]

   Method (the same way a search engine compares templated pages):
   - read the prerendered HTML from .next/server/app/{city}/{service}.html
   - drop <script>, <style>, <svg>, <nav>, <header>, <footer>
   - mask the city name and the service name, so "vinyl siding in Peabody"
     and "vinyl siding in Lynn" count as the same sentence
   - split into overlapping 6-word shingles
   - "own share" = shingles that appear on no other city × service page
   - "max overlap" = highest Jaccard similarity with another town's page
     for the same service

   Gate: a city is releasable when the median own share of its pages is
   >= OWN_MIN and no page overlaps another town's same-service page by more
   than OVERLAP_MAX. "Own" is strict: text about the town is legitimately
   shared by that town's own service pages, so it does not count here — only
   the per-URL service note and service reading do. Overlap with OTHER towns
   is what reads as a doorway page, so that is the stricter limit.
   ═══════════════════════════════════════════════════════════════════════ */

import fs from "node:fs";
import path from "node:path";

const OWN_MIN = 0.1;
const OVERLAP_MAX = 0.35;
const N = 6;

const root = path.resolve(process.argv.includes("--dir") ? process.argv[process.argv.indexOf("--dir") + 1] : ".");
const appDir = path.join(root, ".next", "server", "app");
const citiesArg = process.argv.includes("--cities") ? process.argv[process.argv.indexOf("--cities") + 1].split(",") : null;

function titleCase(slug) {
  return slug.split("-").map((w) => w[0].toUpperCase() + w.slice(1)).join(" ");
}

function text(html) {
  return html
    .replace(/<(script|style|svg|nav|header|footer|noscript|template)\b[\s\S]*?<\/\1>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z#0-9]+;/gi, " ")
    .toLowerCase();
}

function shingles(t) {
  const w = t.match(/[a-z0-9]+/g) || [];
  const s = new Set();
  for (let i = 0; i + N <= w.length; i++) s.add(w.slice(i, i + N).join(" "));
  return s;
}

const pages = [];
for (const city of fs.readdirSync(appDir)) {
  const dir = path.join(appDir, city);
  if (!fs.statSync(dir).isDirectory() || city.startsWith("_") || ["services", "blog", "projects"].includes(city)) continue;
  for (const f of fs.readdirSync(dir)) {
    if (!f.endsWith(".html")) continue;
    const service = f.replace(/\.html$/, "");
    let t = text(fs.readFileSync(path.join(dir, f), "utf8"));
    const cityName = titleCase(city).toLowerCase();
    t = t.split(cityName).join(" cityx ").split(city.replace(/-/g, " ")).join(" cityx ");
    t = t.split(service.replace(/-/g, " ")).join(" servicex ");
    pages.push({ city, service, sh: shingles(t) });
  }
}
if (!pages.length) {
  console.error("No city × service pages found in", appDir, "— run `next build` first.");
  process.exit(2);
}

const count = new Map();
for (const p of pages) for (const s of p.sh) count.set(s, (count.get(s) || 0) + 1);

const byService = new Map();
for (const p of pages) {
  if (!byService.has(p.service)) byService.set(p.service, []);
  byService.get(p.service).push(p);
}

function jaccard(a, b) {
  let inter = 0;
  const [small, big] = a.size < b.size ? [a, b] : [b, a];
  for (const s of small) if (big.has(s)) inter++;
  return inter / (a.size + b.size - inter);
}

const results = [];
for (const p of pages) {
  if (citiesArg && !citiesArg.includes(p.city)) continue;
  let own = 0;
  for (const s of p.sh) if (count.get(s) === 1) own++;
  let maxOverlap = 0;
  for (const q of byService.get(p.service)) if (q !== p) maxOverlap = Math.max(maxOverlap, jaccard(p.sh, q.sh));
  results.push({ city: p.city, service: p.service, own: own / p.sh.size, maxOverlap });
}

const median = (xs) => {
  const s = [...xs].sort((a, b) => a - b);
  return s.length ? s[Math.floor(s.length / 2)] : 0;
};
const pct = (x) => `${(x * 100).toFixed(1)}%`;

const byCity = new Map();
for (const r of results) {
  if (!byCity.has(r.city)) byCity.set(r.city, []);
  byCity.get(r.city).push(r);
}

console.log(`pages analysed: ${results.length} (of ${pages.length})`);
console.log(`median own share: ${pct(median(results.map((r) => r.own)))} · median max overlap: ${pct(median(results.map((r) => r.maxOverlap)))}`);
console.log("");
console.log("city".padEnd(18), "own(med)".padStart(9), "overlap(max)".padStart(13), " verdict");
let fail = 0;
for (const [city, rs] of [...byCity].sort()) {
  const own = median(rs.map((r) => r.own));
  const ov = Math.max(...rs.map((r) => r.maxOverlap));
  const ok = own >= OWN_MIN && ov <= OVERLAP_MAX;
  if (!ok) fail++;
  if (citiesArg || !ok || byCity.size <= 40) console.log(city.padEnd(18), pct(own).padStart(9), pct(ov).padStart(13), ok ? " PASS" : " FAIL");
}
console.log("");
console.log(`${byCity.size - fail}/${byCity.size} cities pass (own >= ${pct(OWN_MIN)}, overlap <= ${pct(OVERLAP_MAX)})`);
if (citiesArg && fail) process.exit(1);

#!/usr/bin/env node
/* ═══════════════════════════════════════════════════════════════════════
   SITE AUDIT — on-page SEO checks over every prerendered page.

   Run after `next build`:  npm run audit:site

   Checks: title/description presence, length and duplicates; exactly one
   H1; canonical present and self-referencing; robots vs sitemap agreement;
   internal links that point to routes that do not exist; images without
   alt; JSON-LD that does not parse; HTML weight.
   ═══════════════════════════════════════════════════════════════════════ */
import fs from "node:fs";
import path from "node:path";

const BASE = "https://wolfs-siding.com";
const app = path.resolve(".next/server/app");

function walk(dir, out = []) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) walk(p, out);
    else if (f.endsWith(".html")) out.push(p);
  }
  return out;
}

const files = walk(app).filter((f) => !/[\\/]_(not-found|global-error)/.test(f));
const routeOf = (f) => {
  let r = "/" + path.relative(app, f).replace(/\\/g, "/").replace(/\.html$/, "");
  if (r === "/index") r = "/";
  return r;
};
const routes = new Set(files.map(routeOf));
const extra = ["/sitemap.xml", "/robots.txt", "/llms.txt"];
extra.forEach((r) => routes.add(r));

const sitemap = fs.existsSync(path.join(app, "sitemap.xml.body"))
  ? new Set([...fs.readFileSync(path.join(app, "sitemap.xml.body"), "utf8").matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1].replace(BASE, "") || "/"))
  : new Set();

const decode = (x) =>
  x && x.replace(/&#x([0-9a-f]+);/gi, (_, c) => String.fromCodePoint(parseInt(c, 16))).replace(/&#(\d+);/g, (_, c) => String.fromCodePoint(+c)).replace(/&quot;/g, '"').replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
const get = (h, re) => decode((h.match(re) || [])[1]);
const issues = {};
const add = (k, v) => (issues[k] ||= []).push(v);
const titles = new Map();
const descs = new Map();
let weightSum = 0;

for (const f of files) {
  const r = routeOf(f);
  const h = fs.readFileSync(f, "utf8");
  weightSum += h.length;
  const head = h.slice(0, h.indexOf("</head>") + 7);
  const title = get(head, /<title>(.*?)<\/title>/s);
  const desc = get(head, /<meta name="description" content="([^"]*)"/);
  const canon = get(head, /<link rel="canonical" href="([^"]*)"/);
  const robots = get(head, /<meta name="robots" content="([^"]*)"/) || "";
  const noindex = robots.includes("noindex");

  if (!title) add("missing title", r);
  else {
    if (title.length > 60) add("title > 60 chars", `${r} (${title.length})`);
    if (!noindex) titles.set(title, [...(titles.get(title) || []), r]);
  }
  if (!desc) add("missing description", r);
  else {
    if (desc.length > 160) add("description > 160 chars", `${r} (${desc.length})`);
    if (desc.length < 70) add("description < 70 chars", `${r} (${desc.length})`);
    if (!noindex) descs.set(desc, [...(descs.get(desc) || []), r]);
  }
  const expected = BASE + (r === "/" ? "" : r);
  if (!canon) add("missing canonical", r);
  else if (canon !== expected && canon !== expected + "/") add("canonical not self", `${r} -> ${canon}`);

  const h1 = (h.match(/<h1[\s>]/g) || []).length;
  if (h1 !== 1) add(`h1 count != 1`, `${r} (${h1})`);

  const inSitemap = sitemap.has(r);
  if (noindex && inSitemap) add("noindex page in sitemap", r);
  if (!noindex && !inSitemap && !r.startsWith("/_") && r !== "/404") add("indexable page missing from sitemap", r);

  for (const m of h.matchAll(/<a [^>]*href="(\/[^"#?]*)/g)) {
    let link = m[1].replace(/\/$/, "") || "/";
    if (link.startsWith("/_next") || link.startsWith("/api")) continue;
    if (/\.(jpg|png|webp|svg|pdf|mp4|txt|xml|ico)$/i.test(link)) continue;
    if (!routes.has(link)) add("internal link to missing route", `${r} -> ${link}`);
  }
  for (const m of h.matchAll(/<img\b[^>]*>/g)) {
    // alt="" is valid for decorative images (card photos whose title is the link text).
    if (!/\balt="/.test(m[0])) add("img without alt attribute", r);
  }
  for (const m of h.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) {
    try { JSON.parse(m[1]); } catch { add("invalid JSON-LD", r); }
  }
  if (h.length > 350_000) add("HTML > 350 KB", `${r} (${Math.round(h.length / 1024)} KB)`);
}
for (const [t, rs] of titles) if (rs.length > 1) add("duplicate title (indexable)", `${rs.length}x "${t}": ${rs.slice(0, 4).join(", ")}`);
for (const [d, rs] of descs) if (rs.length > 1) add("duplicate description (indexable)", `${rs.length}x: ${rs.slice(0, 4).join(", ")}`);

console.log(`pages: ${files.length} · sitemap URLs: ${sitemap.size} · avg HTML: ${Math.round(weightSum / files.length / 1024)} KB`);
for (const [k, v] of Object.entries(issues).sort((a, b) => b[1].length - a[1].length)) {
  const uniq = [...new Set(v)];
  console.log(`\n■ ${k}: ${uniq.length}`);
  uniq.slice(0, 8).forEach((x) => console.log("   ", x));
}

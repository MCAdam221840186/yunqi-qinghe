import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { gzipSync } from "node:zlib";

// Static-export checks only. This does not launch or control a browser.
const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputRoot = path.join(projectRoot, "out");
const basePath = (process.env.PAGES_BASE_PATH ?? "").replace(/\/$/, "");
const read = (file) => readFileSync(path.join(projectRoot, file), "utf8");
const readPage = (route) => readFileSync(path.join(outputRoot, route, "index.html"), "utf8");
const mainContent = (html) => html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1] ?? "";
const routeCount = (directory) => readdirSync(path.join(outputRoot, directory), { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && existsSync(path.join(outputRoot, directory, entry.name, "index.html"))).length;

assert.equal(routeCount("children"), 40, "Children routes must remain unchanged");
assert.equal(routeCount("diaries"), 157, "Growth-card routes must remain unchanged");
assert.equal(routeCount("team-diaries"), 8, "Day routes must remain unchanged");

const pageRoutes = [
  "", "about", "team-diaries", "diaries", "works", "reading",
  "reading/books", "reading/resources", "reading/activities",
  "team-diaries/day-04", "children/student-009", "diaries/student-009-session-01-b",
];
const bundleReport = [];
let assetChecks = 0;

for (const route of pageRoutes) {
  const html = readPage(route);
  const main = mainContent(html);
  assert.ok(main, `Missing main content on /${route}`);
  assert.equal((main.match(/<h1\b/g) ?? []).length, 1, `Expected one h1 on /${route}`);

  for (const [tag] of html.matchAll(/<span\b[^>]*data-growth-trace=[^>]*>/g)) {
    assert.match(tag, /aria-hidden="true"/, `Trace exposed to accessibility tree on /${route}`);
    assert.doesNotMatch(tag, /tabindex|autofocus/i, `Focusable decoration on /${route}`);
  }

  let linkDepth = 0;
  for (const [tag] of html.matchAll(/<\/?a\b[^>]*>/g)) {
    linkDepth += tag.startsWith("</") ? -1 : 1;
    assert.ok(linkDepth >= 0 && linkDepth <= 1, `Nested or unbalanced links on /${route}`);
  }
  assert.equal(linkDepth, 0);

  for (const [, url] of html.matchAll(/(?:href|src)="(\/[^"#]*)"/g)) {
    if (basePath) assert.ok(url.startsWith(`${basePath}/`), `Missing basePath: ${url}`);
    const relative = decodeURIComponent(url.slice(basePath.length).split("?")[0]).replace(/^\//, "");
    const target = path.join(outputRoot, relative);
    assert.ok(existsSync(target), `Missing exported target: ${url}`);
    assetChecks += 1;
  }

  if (["", "about", "team-diaries", "diaries", "works", "reading"].includes(route)) {
    const scripts = [...new Set([...html.matchAll(/<script\b[^>]*src="([^"]+)"/g)].map((match) => match[1]))];
    const buffers = scripts.map((url) => readFileSync(path.join(outputRoot, url.slice(basePath.length))));
    bundleReport.push({
      route: `/${route}${route ? "/" : ""}`,
      scriptFiles: buffers.length,
      scriptBytes: buffers.reduce((total, buffer) => total + buffer.length, 0),
      gzipBytes: buffers.reduce((total, buffer) => total + gzipSync(buffer).length, 0),
    });
  }
}

const teamHtml = readPage("team-diaries");
const worksHtml = readPage("works");
for (const [html, expected] of [
  [teamHtml, Array.from({ length: 8 }, (_, index) => `day-${String(index + 1).padStart(2, "0")}`)],
  [worksHtml, ["materials", "quiet", "color", "writing", "landscape", "stories", "flight"]],
]) {
  const nav = html.match(/<nav\b[^>]*data-section-journey[^>]*>([\s\S]*?)<\/nav>/)?.[1];
  assert.ok(nav, "Missing progressive-enhancement chapter navigation");
  assert.deepEqual([...nav.matchAll(/href="#([^"]+)"/g)].map((match) => match[1]), expected);
  assert.equal((nav.match(/aria-current="location"/g) ?? []).length, 1);
  for (const id of expected) assert.ok(html.includes(`id="${id}"`), `Missing anchor: ${id}`);
}

const growthHtml = mainContent(readPage("diaries"));
for (const [slug, quote] of [
  ["student-009-session-01-b", "我学会了我之前从未见过的钢琴"],
  ["student-036-session-02-a", "好好学知识"],
  ["student-032-session-03-a", "一定要坚持下去"],
  ["student-018-session-04-a", "今天的努力，成就明天的自己"],
]) {
  assert.ok(growthHtml.includes(`${basePath}/diaries/${slug}/`), `Missing stage evidence: ${slug}`);
  assert.ok(growthHtml.includes(quote), `Missing reviewed quote: ${slug}`);
}
assert.doesNotMatch(mainContent(readPage("diaries/student-009-session-01-b")), /data-growth-trace|data-section-journey/);

for (const filename of ["GrowthTraceReveal.tsx", "SectionJourneyNav.tsx"]) {
  const source = read(`src/components/${filename}`);
  assert.match(source, /^"use client";/);
  assert.doesNotMatch(source, /@\/content|@\/lib\/(?:content|reading)|react-markdown|remark-gfm/);
  assert.doesNotMatch(source, /addEventListener\(["']scroll["']/);
}

const chunks = readdirSync(path.join(outputRoot, "_next/static/chunks"))
  .filter((name) => name.endsWith(".js"))
  .map((name) => readFileSync(path.join(outputRoot, "_next/static/chunks", name), "utf8"));
for (const sourceMarker of [
  "growth-records.generated", "react-markdown", "remark-gfm",
  "我学会了我之前从未见过的钢琴", "今天的努力，成就明天的自己",
]) {
  assert.ok(chunks.every((chunk) => !chunk.includes(sourceMarker)), `Content leaked into client JS: ${sourceMarker}`);
}

console.log(JSON.stringify({
  basePath: basePath || "/",
  checkedPages: pageRoutes.length,
  routes: { children: 40, growthCards: 157, teamDiaries: 8 },
  localLinksAndAssets: assetChecks,
  serverRenderedEvidence: "4 reviewed stages, no nested links, decorative traces hidden from AT",
  clientBoundary: "no content modules, Markdown parsers, or reviewed quotes in client JS",
  bundleReport,
}, null, 2));

// The pre-release check over the built site (`_site/`), run after `pnpm build` locally and in CI.
// It fails the release on: an internal link or #anchor that resolves to nothing, a page without
// exactly one <h1> or without a <title>, an <img> without alt, a missing CNAME, and any term on the
// public-safety list (in the built pages and in the repo's own files) or an email address on a page (docs/content.standards.md §Public safety). No dependencies: plain Node.

import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { join, relative, posix } from "node:path";
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";

const OUT = "_site";
const DOMAIN = "edlc.tutelage.au";
const problems = [];

// Terms that must never reach the public site: client names, internal product plans, private
// workspaces. The repo is public too, so the list holds only a short SHA-256 of each lowercase term,
// never the term. Page text is cut into words (a-z, 0-9) and every run of one to four words is hashed
// and compared. Add a term with `node tooling/check.mjs --hash "<term>"`; never remove one without a
// decision in docs/decisions.md.
const FORBIDDEN = new Set([
  "3cca55a8295c2910",
  "9c1c934e33089936",
  "813c2438a6dfd102",
  "006ce5ffa19d2aa2",
  "db85f04dc8f511fc",
  "84f0ceca5ebebf54",
  "8fab6c506b91afce",
  "12a83f6f01fc560a",
  "ea5cf506c88e4b6c",
]);
const words = (text) => text.toLowerCase().match(/[a-z0-9]+/g) || [];
const hash = (term) => createHash("sha256").update(words(term).join(" ")).digest("hex").slice(0, 16);
const forbiddenIn = (text) => {
  const w = words(text);
  const hits = new Set();
  for (let n = 1; n <= 4; n++)
    for (let i = 0; i + n <= w.length; i++) {
      const run = w.slice(i, i + n).join(" ");
      if (FORBIDDEN.has(hash(run))) hits.add(run);
    }
  return [...hits];
};
// Any email address in a page or a repo file is a finding; contact goes through GitHub issues (H-3).
const EMAIL = /[\w.+-]+@[a-z0-9-]+(?:\.[a-z0-9-]+)*\.[a-z]{2,}\b/i;

if (process.argv[2] === "--hash") {
  console.log(hash(process.argv.slice(3).join(" ")));
  process.exit(0);
}

const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });

if (!existsSync(OUT)) {
  console.error(`check: ${OUT}/ does not exist; run \`pnpm build\` first`);
  process.exit(1);
}

const files = walk(OUT);
const pages = files.filter((f) => f.endsWith(".html"));
const urlOf = (file) => "/" + relative(OUT, file).split("\\").join("/").replace(/index\.html$/, "");

const ids = new Map();
for (const file of pages) {
  const html = readFileSync(file, "utf8");
  ids.set(urlOf(file), new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
}

const resolve = (from, href) => {
  const [path, hash] = href.split("#");
  let target = path === "" ? from : path.startsWith("/") ? path : posix.join(posix.dirname(from + "x"), path);
  if (!target.endsWith("/") && !posix.extname(target)) target += "/";
  return { target, hash };
};

for (const file of pages) {
  const url = urlOf(file);
  const html = readFileSync(file, "utf8");
  const text = html.replace(/<[^>]+>/g, " ").toLowerCase();

  const h1s = (html.match(/<h1[\s>]/g) || []).length;
  if (h1s !== 1) problems.push(`${url}: ${h1s} <h1> elements, expected 1`);
  if (!/<title>[^<]+<\/title>/.test(html)) problems.push(`${url}: no <title>`);
  for (const m of html.matchAll(/<img\b[^>]*>/g)) if (!/\salt=/.test(m[0])) problems.push(`${url}: <img> without alt`);

  for (const run of forbiddenIn(text)) problems.push(`${url}: public-safety term "${run}"`);
  if (EMAIL.test(html)) problems.push(`${url}: an email address in the page`);

  for (const m of html.matchAll(/\shref="([^"]+)"/g)) {
    const href = m[1];
    if (/^(https?:|mailto:)/.test(href)) continue;
    const { target, hash } = resolve(url, href);
    const asFile = join(OUT, target.endsWith("/") ? target + "index.html" : target);
    if (!existsSync(asFile)) {
      problems.push(`${url}: broken link ${href}`);
      continue;
    }
    if (hash && ids.has(target) && !ids.get(target).has(hash)) problems.push(`${url}: missing anchor ${href}`);
  }
}

// The repository is public as well: every tracked or new (not ignored) text file gets the same scan.
const repoFiles = execFileSync("git", ["ls-files", "--cached", "--others", "--exclude-standard"], { encoding: "utf8" })
  .split("\n")
  .filter((f) => f && existsSync(f) && !/\.(png|jpe?g|gif|ico|woff2?)$/.test(f) && f !== "pnpm-lock.yaml");
for (const file of repoFiles) {
  const text = readFileSync(file, "utf8");
  for (const run of forbiddenIn(text)) problems.push(`${file}: public-safety term "${run}"`);
  if (EMAIL.test(text)) problems.push(`${file}: an email address`);
}

const cname = join(OUT, "CNAME");
if (!existsSync(cname) || readFileSync(cname, "utf8").trim() !== DOMAIN) problems.push(`CNAME missing or not ${DOMAIN}`);
if (!existsSync(join(OUT, "404.html"))) problems.push("404.html missing");

if (problems.length) {
  console.error(`check: ${problems.length} problem(s)\n` + problems.map((p) => `  - ${p}`).join("\n"));
  process.exit(1);
}
console.log(`check: ${pages.length} pages and ${repoFiles.length} repo files clean (links, anchors, headings, public safety)`);

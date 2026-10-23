// The pre-release check over the built site (`_site/`), run after `pnpm build` locally and in CI.
// It fails the release on: an internal link or #anchor that resolves to nothing, a page without
// exactly one <h1> or without a <title>, an <img> without alt, a missing CNAME, a stage name retired by
// ED-13 or ED-16 outside /inspiration/, /changes/ and the redirect pages (page text, the alt, title,
// aria-label and content attributes, and the root README.md), a retired stage URL without a working
// redirect page, an unpushed commit whose author is not a GitHub noreply address (ED-18), and any term
// on the public-safety list (in the built pages and in the repo's own files) or an email address on a
// page (docs/content.standards.md §Public safety). Bare "Build" is exempt from the retired-name scan:
// it is too common an English word, so only its stage-naming phrases are caught. No dependencies:
// plain Node.

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

// ED-01, ED-13 and ED-16: the stage names retired by ED-13 (and ED-13's interim "Assess first",
// replaced by ED-16) survive only as parallels on /inspiration/, in the log on /changes/ (ED-17) and on
// the redirect pages at the old stage URLs (driven by `formerly` in stages.js). A stage page's own
// "Called <old name> in version 0.1.0." line is allowed, once, on that stage's page only.
// The names are whole words and case-sensitive, so ordinary lowercase use ("scaffold the learner") is
// not caught; "Test-first" / "Test first" is caught in any case, except in "test-first development",
// the software practice the paper names in its own argument (§1), which is not the stage. Bare "Build" is exempt (panel finding
// P-22): only the phrases that use it as a stage name are caught ("6 Build", "Build (stage",
// "stage 6, Build", "at Build").
const { default: stages } = await import("../site/_data/stages.js");
const OLD_STAGE_NAMES = [
  /(?<![\w-])(?:Architect|Scaffold|Orchestrate|Assess first)(?![\w-])/g,
  /(?<![\w-])test[- ]first(?![\w-])(?! development)/gi,
  /(?<![\w-])(?:6 Build|Build \(stage|[Ss]tage 6, Build|at Build)(?![\w-])/g,
];
const ATTR_TEXT = /\s(?:alt|title|aria-label|content)="([^"]*)"/g;
const scanText = (html) =>
  html.replace(/<[^>]+>/g, " ") + " " + [...html.matchAll(ATTR_TEXT)].map((m) => m[1]).join(" ");
const oldNameHits = (where, text) => {
  text = text.replace(/\s+/g, " ");
  for (const re of OLD_STAGE_NAMES)
    for (const m of text.matchAll(re)) {
      const around = text.slice(Math.max(0, m.index - 40), m.index + m[0].length + 40).trim();
      problems.push(`${where}: old stage name "${m[0]}" (ED-13, ED-16) in "…${around}…"`);
    }
};
const renamed = stages.filter((s) => s.formerly);
const oldNameExempt = new Set(["/inspiration/", "/changes/", ...renamed.map((s) => `/stages/${s.formerly.slug}/`)]);
for (const file of pages) {
  const url = urlOf(file);
  if (oldNameExempt.has(url)) continue;
  let text = scanText(readFileSync(file, "utf8")).replace(/\s+/g, " ");
  const own = stages.find((s) => s.url === url && s.formerly);
  if (own) text = text.replace(new RegExp(`Called ${own.formerly.name} in version 0\\.1\\.0\\s*\\.`), " ");
  oldNameHits(relative(".", file), text);
}
if (existsSync("README.md")) oldNameHits("README.md", readFileSync("README.md", "utf8"));

// ED-13: every retired stage URL still answers, with a page that moves the reader on to the stage's
// current URL (script keeping the #anchor, meta refresh without script, a visible link and a canonical
// naming the new URL), and no retired slug is reused by a current stage.
const currentSlugs = new Set(stages.map((s) => s.slug));
const esc = (t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
for (const s of renamed) {
  const where = `/stages/${s.formerly.slug}/`;
  if (currentSlugs.has(s.formerly.slug)) problems.push(`${where}: retired slug "${s.formerly.slug}" is also a current stage slug`);
  const file = join(OUT, "stages", s.formerly.slug, "index.html");
  if (!existsSync(file)) {
    problems.push(`${where}: no redirect page for ${s.formerly.name} (now ${s.name})`);
    continue;
  }
  const html = readFileSync(file, "utf8");
  const to = esc(s.url);
  if (!new RegExp(`http-equiv="refresh" content="0; url=[^"]*${to}"`).test(html)) problems.push(`${where}: no meta refresh to ${s.url}`);
  if (!new RegExp(`<a href="[^"]*${to}"`).test(html)) problems.push(`${where}: no visible link to ${s.url}`);
  if (!new RegExp(`<link rel="canonical" href="[^"]*${to}"`).test(html)) problems.push(`${where}: canonical does not name ${s.url}`);
  if (!new RegExp(`location\\.replace\\("[^"]*${to}" \\+ location\\.hash\\)`).test(html)) problems.push(`${where}: no script redirect keeping the #anchor`);
  if (/name="robots" content="[^"]*noindex/.test(html)) problems.push(`${where}: marked noindex; the canonical carries it to ${s.url}`);
}

// ED-18: commits not yet on origin/main are authored with a GitHub noreply address. Only the count and
// short shas are printed, never an address. Skipped when origin/main is missing or history is shallow
// (CI checks out one commit, and by then the commits are already on main).
const git = (...args) => execFileSync("git", args, { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
try {
  if (git("rev-parse", "--is-shallow-repository") !== "true") {
    git("rev-parse", "--verify", "--quiet", "origin/main");
    const bad = git("log", "origin/main..HEAD", "--format=%h %ae %ce")
      .split("\n")
      .filter(Boolean)
      .map((line) => line.split(" "))
      .filter(([, author, committer]) => ![author, committer].every((e) => /@users\.noreply\.github\.com$/i.test(e)))
      .map(([sha]) => sha);
    if (bad.length) problems.push(`git: ${bad.length} unpushed commit(s) whose author or committer is not a noreply address (ED-18, ED-19): ${bad.join(", ")}`);
  }
} catch {
  // No origin/main, or not a git checkout: nothing to compare against.
}

const cname = join(OUT, "CNAME");
if (!existsSync(cname) || readFileSync(cname, "utf8").trim() !== DOMAIN) problems.push(`CNAME missing or not ${DOMAIN}`);
if (!existsSync(join(OUT, "404.html"))) problems.push("404.html missing");

if (problems.length) {
  console.error(`check: ${problems.length} problem(s)\n` + problems.map((p) => `  - ${p}`).join("\n"));
  process.exit(1);
}
console.log(`check: ${pages.length} pages and ${repoFiles.length} repo files clean (links, anchors, headings, retired stage names and redirects, commit authors, public safety)`);

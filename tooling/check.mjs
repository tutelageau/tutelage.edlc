// The pre-release check over the built site (`_site/`), run after `pnpm build` locally and in CI.
// It fails the release on: an internal link or #anchor that resolves to nothing, a page without
// exactly one <h1> or without a <title>, a duplicate id, an <img> without alt, a missing CNAME, a stage name retired by
// ED-13 or ED-16 outside /inspiration/, /changes/ and the redirect pages (page text, the alt, title,
// aria-label and content attributes, and the root README.md), a retired stage URL without a working
// redirect page, a difference between the paper's §5 stage table and `stages.js` that is not
// allowlisted with a reason (P-58), a stage page that restates or fails to render its stages.js facts
// and guidance, a gate checklist missing a stage's gate or questions, a quick check (/start/) that lacks
// a stage's question or could send or store anything (ED-20) or whose live region is hidden before the
// first answer (F1), a gate checklist without its not-a-compliance-tool line or printed attribution
// (ED-27), a stage page without its provenance line or with two "Back to the loop" links, a table not
// in a named focusable region (F2), a wrong aria-current, an unpushed commit whose author is not a
// GitHub noreply address (ED-18), and any term
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
  const seenIds = new Set();
  for (const m of html.matchAll(/\sid="([^"]+)"/g)) {
    if (seenIds.has(m[1])) problems.push(`${url}: duplicate id="${m[1]}"`);
    seenIds.add(m[1]);
  }
  for (const m of html.matchAll(/<img\b[^>]*>/g)) if (!/\salt=/.test(m[0])) problems.push(`${url}: <img> without alt`);
  // Accessibility F2: every table sits in a named, focusable region (it may scroll), and its name resolves.
  for (const m of html.matchAll(/<table\b/g)) {
    const before = html.slice(Math.max(0, m.index - 300), m.index);
    const wrap = before.match(/<div class="table"[^>]*>$/);
    if (!wrap) {
      problems.push(`${url}: a <table> outside the scrolling .table wrapper`);
      continue;
    }
    const w = wrap[0];
    if (!/\srole="region"/.test(w) || !/\stabindex="0"/.test(w)) problems.push(`${url}: a table wrapper without role="region" and tabindex="0" (F2)`);
    const by = (w.match(/\saria-labelledby="([^"]+)"/) || [])[1];
    const label = (w.match(/\saria-label="([^"]+)"/) || [])[1];
    if (by ? !seenIds.has(by) && !new RegExp(`\\sid="${by}"`).test(html) : !label?.trim()) problems.push(`${url}: a table wrapper without a resolvable accessible name (F2)`);
  }
  // aria-current: "page" only on the nav item for this exact page, "true" on its section's item.
  for (const m of html.matchAll(/<a href="([^"]*)" aria-current="([^"]*)"/g)) {
    const own = resolve(url, m[1]).target === url;
    if (m[2] === "page" ? !own : m[2] !== "true" || own) problems.push(`${url}: aria-current="${m[2]}" on a link to ${m[1]}`);
  }

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
// the redirect pages at the old stage URLs (driven by `formerly` in stages.js). Stage pages get no
// exemption: 0.3.0 dropped their "Called <old name> in version 0.1.0" line.
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
  oldNameHits(relative(".", file), scanText(readFileSync(file, "utf8")));
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

// Panel P-58, the canon check: the paper's §5 table and `stages.js` agree, field by field, for every
// field `stages.js` marks as the paper's (`stages.provenance.paper`). Cells are compared after
// collapsing whitespace, dropping Markdown emphasis and a trailing full stop (the data writes purposes
// as sentences; the table does not). Every other difference must be listed below with its reason, and
// an entry that no longer matches both texts exactly is itself a finding, so the list cannot go stale.
const CANON_DIFFERENCES = [
  { n: 2, field: "purpose", paper: "Ingest or author the learning standard", site: "Take in or author the learning standard", reason: "ED-08: \"ingest\" is a software word; the site says \"take in\"" },
  { n: 9, field: "artefact", paper: "Delivery telemetry, results, feedback, incidents", site: "Delivery signals, results, feedback, complaints and appeals", reason: "ED-08: \"telemetry\" and \"incident\" are software words (docs/content.standards.md)" },
  { n: 5, field: "gate", paper: "Compliance, pedagogy, and expert sign-off", site: "Compliance, pedagogy and subject-matter sign-off", reason: "sanctioned by the lead: \"subject-matter\" names which expert signs off" },
  { n: 5, field: "purpose", paper: "Write assessments and their context", site: "Write the assessments and the context they sit in", reason: "ED-28: plainer site wording; owner to carry into the paper" },
  { n: 5, field: "artefact", paper: "Assessment tasks, marking guides, scenario", site: "Assessment tasks, marking guides, a simulated workplace or case study", reason: "ED-28: spells out \"scenario\" in the paper's own §5.1 words; owner to carry into the paper" },
  { n: 10, field: "purpose", paper: "Review, triage, and route changes", site: "Review, triage and route changes", reason: "ED-28: house style, no serial comma (Australian English)" },
];
const canonText = (t) => String(t ?? "").replace(/[*_]/g, "").replace(/\s+/g, " ").trim().replace(/\.$/, "");
{
  const paper = readFileSync("site/paper.md", "utf8");
  const at = paper.search(/^## 5\.? /m);
  const lines = at < 0 ? [] : paper.slice(at).split("\n");
  const end = lines.findIndex((l, i) => i > 0 && /^## /.test(l));
  const cells = (l) => l.split("|").slice(1, -1).map((c) => c.trim());
  const rows = lines.slice(0, end < 0 ? undefined : end).filter((l) => /^\|\s*\d+\s*\|/.test(l)).map(cells);
  const fields = stages.provenance?.paper ?? [];
  const COLUMN = { name: 1, purpose: 2, artefact: 3, gate: 4, failure: 5 };
  if (at < 0) problems.push("site/paper.md: no \"## 5\" section, so the stage table cannot be compared (P-58)");
  else if (rows.length !== stages.length) problems.push(`site/paper.md §5: ${rows.length} stage rows, stages.js has ${stages.length} (P-58)`);
  if (!fields.length) problems.push("site/_data/stages.js: no `provenance.paper` fields to compare (P-58)");
  const used = new Set();
  for (const row of rows) {
    const s = stages.find((x) => x.n === Number(row[0]));
    if (!s) {
      problems.push(`site/paper.md §5: stage ${row[0]} is not in stages.js (P-58)`);
      continue;
    }
    for (const field of fields) {
      if (!(field in COLUMN)) {
        problems.push(`site/_data/stages.js: provenance names "${field}" as the paper's, but §5 has no such column (P-58)`);
        continue;
      }
      const p = canonText(row[COLUMN[field]]);
      const d = canonText(s[field]);
      if (p === d) continue;
      const ok = CANON_DIFFERENCES.find((x) => x.n === s.n && x.field === field && x.paper === p && x.site === d);
      if (ok) used.add(ok);
      else problems.push(`stage ${s.n} ${field}: stages.js "${d}" differs from paper §5 "${p}", and no allowlisted reason (P-58)`);
    }
  }
  for (const x of CANON_DIFFERENCES)
    if (!used.has(x)) problems.push(`check.mjs: allowlisted canon difference for stage ${x.n} ${x.field} no longer matches the paper and stages.js; remove or update it (P-58)`);
}

// The stage template (docs/site.story.md §The stage page template): stage facts and guidance live once,
// in stages.js. No stage page restates its What happens or At the gate, ask by hand; every built stage
// page renders its failure, purpose, artefact, gate and every happens and ask item; the gate checklist
// renders every stage's artefact, gate and ask items.
const plainText = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ");
const mdPlain = (t) => t.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/[*_`]/g, "");
const builtText = (url) => {
  const file = join(OUT, url, "index.html");
  return existsSync(file) ? plainText(readFileSync(file, "utf8")) : null;
};
const CHECKLIST_DISCLAIMER =
  "This is a list of questions to bring to a review. It is not a compliance tool, and ticking every question does not show that anything meets a standard or replaces pre-use review or validation.";
const CHECKLIST_ATTRIBUTION = "Education Development Lifecycle (EDLC), Tutelage, edlc.tutelage.au, CC BY 4.0";
const release = JSON.parse(readFileSync("site/_data/release.json", "utf8"));
// Content design B: every stage page says which of its fields are the paper's and which the site's.
const STAGE_PROVENANCE =
  "The purpose, artefact, exit gate and failure come from the paper's stage table. The question, what happens and the gate questions are this site's guidance.";
for (const s of stages) {
  const srcFile = join("site", "stages", `${s.slug}.md`);
  if (existsSync(srcFile) && /^## (What happens|At the gate, ask)\s*$/m.test(readFileSync(srcFile, "utf8")))
    problems.push(`${srcFile}: restates a section the stage template renders from stages.js (What happens, At the gate, ask)`);
  for (const k of ["happens", "ask"]) if (!Array.isArray(s[k]) || !s[k].length) problems.push(`stages.js stage ${s.n}: no \`${k}\` items`);
  const text = builtText(s.url);
  if (text === null) {
    problems.push(`${s.url}: stage page missing`);
    continue;
  }
  for (const v of [s.failure, s.purpose, s.artefact, s.gate, ...(s.happens || []), ...(s.ask || [])])
    if (!text.includes(mdPlain(v))) problems.push(`${s.url}: does not render "${v}" from stages.js`);
  if (!text.includes(STAGE_PROVENANCE)) problems.push(`${s.url}: lacks the line saying which fields are the paper's and which the site's`);
  const loopLinks = (readFileSync(join(OUT, s.url, "index.html"), "utf8").match(/>Back to the loop</g) || []).length;
  if (loopLinks !== 1) problems.push(`${s.url}: ${loopLinks} "Back to the loop" links, expected 1`);
}
{
  const url = "/resources/gate-checklist/";
  const text = builtText(url);
  if (text === null) problems.push(`${url}: missing`);
  else
    for (const s of stages)
      for (const v of [s.name, s.artefact, s.gate, ...(s.ask || [])])
        if (!text.includes(mdPlain(v))) problems.push(`${url}: does not render "${v}" (stage ${s.n})`);
  // ED-27: the checklist says, in its printed body above the first stage, that it is not a compliance
  // tool; and the printed sheet carries the version and the attribution. Both sit outside the site's
  // chrome (the masthead and footer do not print).
  if (text !== null) {
    const html = readFileSync(join(OUT, url, "index.html"), "utf8");
    const main = plainText((html.match(/<main\b[\s\S]*<\/main>/) || [""])[0]);
    const firstStage = main.indexOf(`Stage 1 · ${stages[0].name}`);
    const at = main.indexOf(CHECKLIST_DISCLAIMER);
    if (at < 0) problems.push(`${url}: lacks the not-a-compliance-tool line in the page body (ED-27)`);
    else if (firstStage >= 0 && at > firstStage) problems.push(`${url}: the not-a-compliance-tool line comes after the first stage; it must come before (ED-27)`);
    if (!main.includes(`Version ${release.version}`) || !main.includes(CHECKLIST_ATTRIBUTION))
      problems.push(`${url}: the page body lacks the printed "Version ${release.version}" and "${CHECKLIST_ATTRIBUTION}" line (ED-27)`);
  }
}

// The quick check (ED-20) on /start/: every stage's question is on the page, and the page sends and
// stores nothing. No external script, no network call, no storage, no cookies, no form target.
{
  const file = join(OUT, "start", "index.html");
  if (!existsSync(file)) problems.push("/start/: missing (the quick check lives there)");
  else {
    const html = readFileSync(file, "utf8");
    const text = plainText(html);
    for (const s of stages) {
      if (!s.check) problems.push(`stages.js stage ${s.n}: no \`check\` question (ED-20)`);
      else if (!text.includes(s.check)) problems.push(`/start/: quick check lacks stage ${s.n}'s question`);
    }
    const SENDS_OR_STORES = [
      [/<script\b[^>]*\bsrc=/i, "an external script"],
      [/\bfetch\s*\(/, "fetch("],
      [/XMLHttpRequest/, "XMLHttpRequest"],
      [/sendBeacon/, "navigator.sendBeacon"],
      [/\bWebSocket\b|\bEventSource\b/, "a socket or event stream"],
      [/localStorage/, "localStorage"],
      [/sessionStorage/, "sessionStorage"],
      [/indexedDB/, "indexedDB"],
      [/document\.cookie/, "document.cookie"],
      [/<form\b[^>]*\b(?:action|method)=/i, "a form that submits somewhere"],
    ];
    for (const [re, what] of SENDS_OR_STORES) if (re.test(html)) problems.push(`/start/: the quick check page uses ${what}; it must send and store nothing (ED-20)`);
    // Reviewer 14: the quick check's own script (the one that reads #qc-form) has no other way out:
    // no image beacon, no src assignment, no navigation, no form submission, no socket or request.
    const qcScripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map((m) => m[1]).filter((t) => t.includes("qc-form"));
    if (qcScripts.length !== 1) problems.push(`/start/: ${qcScripts.length} quick check scripts, expected 1`);
    const QC_SCRIPT_SENDS = [
      [/\bnew\s+Image\b/, "new Image"],
      [/\.src\s*=/, ".src ="],
      [/\blocation\b/, "location"],
      [/\.(?:request)?[sS]ubmit\s*\(/, "form.submit"],
      [/sendBeacon/, "sendBeacon"],
      [/XMLHttpRequest/, "XMLHttpRequest"],
      [/WebSocket/, "WebSocket"],
      [/\bfetch\b/, "fetch"],
      [/\bimport\s*\(/, "a dynamic import"],
      [/\bwindow\.open\b/, "window.open"],
    ];
    for (const t of qcScripts)
      for (const [re, what] of QC_SCRIPT_SENDS) if (re.test(t)) problems.push(`/start/: the quick check's script uses ${what}; it must send nothing (ED-20, reviewer 14)`);
    // Accessibility F1: the result is a live region in the accessibility tree, empty, before the first
    // answer: rendered without `hidden`, never hidden by the script, never display:none by the CSS.
    const region = html.match(/<div\b[^>]*\bid="qc-result"[^>]*>/);
    if (!region) problems.push("/start/: no #qc-result live region");
    else {
      if (!/\brole="status"/.test(region[0]) || !/\baria-live="polite"/.test(region[0])) problems.push("/start/: #qc-result is not a polite status region");
      if (/\shidden\b/.test(region[0])) problems.push("/start/: #qc-result is rendered hidden; a live region must be in the tree before it changes (F1)");
    }
    for (const t of qcScripts) if (/result\.(?:hidden|style)\b/.test(t)) problems.push("/start/: the quick check's script hides or restyles #qc-result; it must stay displayed (F1)");
    const css = readFileSync(join(OUT, "assets", "site.css"), "utf8").replace(/\/\*[\s\S]*?\*\//g, "");
    for (const m of css.matchAll(/([^{}]*)\{([^{}]*)\}/g))
      if (/\.qc__result\b/.test(m[1]) && /display\s*:\s*none|visibility\s*:\s*hidden/.test(m[2]))
        problems.push(`site.css: "${m[1].trim()}" hides the quick check's live region (F1)`);
    // The script must reach the browser whole: Markdown can wrap parts of an inline script in <p>.
    for (const m of html.matchAll(/<script>([\s\S]*?)<\/script>/g)) {
      try {
        new Function(m[1]);
      } catch (e) {
        problems.push(`/start/: the quick check's script does not parse (${e.message}); it works only without script`);
      }
    }
  }
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
console.log(`check: ${pages.length} pages and ${repoFiles.length} repo files clean (links, anchors, headings, table regions, aria-current, retired stage names and redirects, canon against the paper, stage template, gate checklist, quick check, commit authors, public safety)`);

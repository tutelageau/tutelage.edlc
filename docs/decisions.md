# Decisions

Rulings are `ED-nn`, dated, with who made them. Open memos for the owner are `H-nn`: what · why ·
options (recommendation first, each priced as costs · gets · undo) · what happens if nobody decides.
A ruling is changed only by a later ruling that names it.

## Rulings

| ID | Date | By | Ruling |
| --- | --- | --- | --- |
| ED-01 | 2026-10-23 | Owner | The EDLC is about the development process for education material. Software lifecycle practice is inspiration, not the main focus: it has one page (`/inspiration/`) and the paper's argument; everywhere else uses education's own words. |
| ED-02 | 2026-10-23 | Owner | The repo is public and serves a public GitHub Pages site at `edlc.tutelage.au` (DNS CNAME to `tutelageau.github.io`, set by the owner). |
| ED-03 | 2026-10-23 | Owner | The repo carries supporting agents, skills, knowledge and ways of working, including stakeholder, analyst and expert personas who build out and check work before it is published. |
| ED-04 | 2026-10-23 | Lead | Content source is the **public tab** of the owner's "Education Development Lifecycle (EDLC) — Exploration" doc (rev 13 as read). The internal tab is not carried here, in whole or in part. |
| ED-05 | 2026-10-23 | Lead | Site stack: Eleventy 3 (`@11ty/eleventy` 3.1.6, pinned) over Markdown and Nunjucks, the only dependency. Published by `actions/deploy-pages` from `.github/workflows/pages.yml`. A plain static site needs no framework; Eleventy keeps pages as Markdown that writers and agents edit directly. |
| ED-06 | 2026-10-23 | Lead | Look: tutelage.design's marketing skin, copied by role name into `site/assets/site.css` (warm paper, deep teal, flat, colour that means something), with a dark scheme. |
| ED-07 | 2026-10-23 | Lead | The site is versioned like a program release: `site/_data/release.json` names the version and the `/changes/` page lists every release. First release is 0.1.0, "Public draft for comment". |
| ED-08 | 2026-10-23 | Lead | Panel 2026-10-23 findings applied to the site: per-stage "who is involved" roles removed (not in the paper); stage 8's regulatory sentence quotes Standard 1.3(b) of the 2025 instrument with its source; software words replaced on education pages ("incident", "ingest", "upstream", event-sourcing wording); the inspiration table carries the paper's own §4.2 rows. Record: `knowledge/panels/2026-10-23.first-release.md`. |

## Open memos

### H-1 · Stage names: keep the paper's, or use education-native names?

**What.** Four of the ten stage names come from software: Architect, Scaffold, Test-first, Build. ED-01 says
education should speak its own words.

**Why now.** The names are on every page and in the figure. Renaming later means changing the paper, the site
and anyone's notes who has already read them.

**Options.**

1. **Rename on site and in the paper (recommended).** For example: Discover · Specify · Map · Outline · Assess
   first · Write · Plan delivery · Validate and release · Deliver and observe · Improve. *Costs:* one editing
   pass over the paper and `site/_data/stages.js`; the panel reads the new names. *Gets:* the model reads as
   education's own, matching ED-01. *Undo:* easy before wide circulation, harder after.
2. **Keep the paper's names, add a plain-language line under each.** *Costs:* nothing now. *Gets:* fidelity to
   the draft. *Undo:* trivial. Leaves the software flavour on every page.
3. **Keep the names on site, rename in a later paper version.** *Costs:* a period where site and paper differ.

**Panel view (2026-10-23).** The software-practice expert backs option 1. "Test-first" points readers at test-driven development, the weakest of the parallels. "Scaffold" clashes with scaffolding's meaning in teaching (support for the learner), and the Discover page already uses it that way. "Orchestrate" reads as software jargon too.

**If nobody decides.** The site ships with the paper's names (option 2 is how 0.1.0 reads).

### H-2 · A licence for the content

**What.** The repo is public but has no licence, so by default nobody may reuse the text. The paper's own next
steps say "publish as an open resource under a Creative Commons licence".

**Options.**

1. **CC BY 4.0 for the site and paper, MIT for the code (recommended).** *Costs:* adding `LICENSE` files and a
   footer line. *Gets:* others can quote, translate and adapt with attribution, which is what inviting public
   comment needs. *Undo:* a licence granted cannot be withdrawn from copies already taken.
2. **CC BY-NC-SA 4.0.** Keeps commercial reuse back; *costs* some reuse by institutions that are commercial.
3. **No licence yet.** Comment is possible, reuse is not.

**If nobody decides.** No licence; the footer does not claim one.

### H-3 · Who may comment, and where

**What.** `/contribute/` points readers at GitHub issues. Many educators do not have GitHub accounts.

**Options.** (1) GitHub issues now, add a form or email address later (recommended; nothing new to run).
(2) Add a public email address now. (3) Add GitHub Discussions.

**If nobody decides.** GitHub issues only.

### H-4 · Corrections to the paper from the first panel

**What.** The paper is the owner's text, so these wait for the owner's yes, then go into the source doc and `site/paper.md` together.

1. **Royce (§2.1, §2.6).** The paper cites Royce (1970) as the source of the waterfall model. Royce described the single sequential pass and warned it was risky; he argued for iteration and feedback. Suggested: "the sequential model Royce (1970) described and warned against".
2. **Test-driven development (§4.2, §4.1 "backward design as test-driven development").** Writing assessments first is closer to defining acceptance criteria before building than to Beck's developer-level cycle. Suggested: "acceptance criteria first, in the spirit of test-driven development".
3. **Validation in VET (§2.5).** "Validate assessment practice on a risk basis" understates Standard 1.5(b): every training product validated at least once every five years, more often where risks, changes or feedback arise, with risk deciding which components and how large a sample. Also cite the instrument by its title, not the department's page.
4. **"Pre-use validation" (§4.2, §8).** The 2025 instrument calls the pre-use step a *review* (Standard 1.3) and reserves *validation* for Standard 1.5. Suggested: "pre-use review" for stage 8.

**Options.** (1) Accept all four (recommended; *costs* one editing pass; *gets* a paper a VET auditor and a software engineer would both find accurate). (2) Accept 1, 3 and 4 and keep the TDD framing. (3) Defer to the paper's peer review.

**If nobody decides.** The paper stays as written; the site's own pages already avoid all four problems.

### H-5 · Does "verified before publish" apply to the paper?

**What.** The content standards say a claim about the world needs a `verified` source before it is published. The paper carries its own draft note saying some references are unverified. Strictly read, the paper cannot be published until every reference is verified.

**Options.** (1) The paper is exempt while it carries its draft note, and verification runs as a tracked job (recommended; *gets* the draft public now, which is what inviting comment needs). (2) Hold the paper page until every reference is verified.

**If nobody decides.** Option 1, and the researcher works through the register.

### H-6 · "Observability" as a practice name

**What.** "Observability" is a software operations term. The site defines it plainly, but ED-01 prefers education's words. "Delivery signals" names the data, not the practice.

**Options.** (1) Keep it, defined on first use (recommended until a better word is found; the paper uses it). (2) Rename the practice "Observing delivery" across paper and site.

**If nobody decides.** Option 1.

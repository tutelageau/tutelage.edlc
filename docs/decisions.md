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
| ED-09 | 2026-10-23 | Owner | The site moves to a story-led design: modern and easy to follow, with links to resources and worked examples. Lifecycle-framework websites are studied for how they tell their story and how readers find their way. The lessons are about storytelling and usability, not software content (ED-01). |
| ED-10 | 2026-10-23 | Owner | The cast grows to cover four sectors: K-12 schooling, vocational education and training, higher education, and soft skills (workplace and professional learning). |
| ED-11 | 2026-10-23 | Owner | The EDLC works toward a four-layer view of scope (organisation, department or pillar, team, project), named in education's own words. It is a working concept until the paper carries it. Site pages may describe it only as a proposal under development (see H-7). |
| ED-12 | 2026-10-23 | Owner | The long-term aim is a public starter repository. It takes in benchmarks, first units of competency from training.gov.au, and runs gated development and feedback loops toward released versions of assessment tools, mapping matrices, learner guides and session plans. |
| ED-13 | 2026-10-23 | Owner | H-1 option 1: the stages are renamed on the site and in the paper. Discover · Specify · **Map** (was Architect) · **Outline** (was Scaffold) · **Assess first** (was Test-first) · **Write** (was Build) · **Plan delivery** (was Orchestrate) · Validate and release · Deliver and observe · Improve. Software names survive only on `/inspiration/` and in the paper's §4.2 mapping, as the parallels they are. Old stage URLs keep working as redirects. The owner carries the rename into the source doc. |
| ED-14 | 2026-10-23 | Owner | H-7: five layers of scope, amending ED-11. 0 System (who sets the benchmark) · 1 Organisation · 2 Department (for "pillar") · 3 Team · 4 Program, with "program" flagged as meaning different things by sector. The owner writes them into the paper; until then no site page states layers. |
| ED-15 | 2026-10-23 | Owner | H-8: the starter repository is a separate public repository, started after the worked examples exist, and starts in VET. Until the training.gov.au licence is verified it stores unit codes and releases only, fetching text into the user's own copy. Its data shape aligns to 1EdTech CASE v1.1. It keeps "mapping matrix" and "learner guide". Two worked examples come first: TAEASS412 *Assess competence* and one light, unregulated program; the paper's §9.2 drops "anonymised". |
| ED-16 | 2026-10-23 | Owner | Amends ED-13 on the 0.2.0 panel's advice: stage 5 is **Assessment first** (the stage designs assessment; "assess first" reads as assessing the learner first) and stage 6 is **Develop** (it covers activities, media and practicals as well as text, and is education's own word for the phase). Record: `knowledge/panels/2026-10-23.stage-rename.md`. |
| ED-17 | 2026-10-23 | Lead | Carrying ED-13 into the paper also changes two phrases that named retired stages: stages 1 to 8 are "the design and release stages" (was "build"), and §4's return path goes "back into Specify or Map" (was "specification or architecture"). The owner carries both into the source doc. A changes log may name retired stages: `/changes/` joins `/inspiration/` as exempt from the retired-name check. |
| ED-18 | 2026-10-23 | Owner | Commits to this repo use the owner's GitHub noreply address, never a personal one. Earlier commits keep theirs (no force-push). The check fails on an unpushed commit whose author is not a noreply address. |
| ED-19 | 2026-10-23 | Lead | Under ED-16, stage 6's purpose follows its name in the paper and the canon: "Develop learning content to the assessments" (P-24's finding applied to the line beneath the name). The paper's §10 walk-through keeps its own shape, renaming only the stages. ED-18's check covers the committer as well as the author. The owner carries the paper wording into the source doc. |

## Open memos

### H-1 · Stage names: keep the paper's, or use education-native names?

**Decided 2026-10-23 → ED-13.** Kept below as the record of the options.

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

1. **Royce (§2.1).** The paper pairs Royce (1970) with "the waterfall model". Royce never used the word. He kept the ordered phases ("fundamentally sound") but called running them as a single pass "risky" and one that "invites failure", and added five safeguards (verified against the 1987 reprint, p. 329). Suggested: "the sequential model Royce (1970) described, and warned against running as a single pass". §2.6's "sequential phases (Royce, 1970)" can stay. Also drop "26" from the reference.
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

### H-7 · The layers of scope: how many, and what they are called

**Decided 2026-10-23 → ED-14.** Kept below as the record of the options.

**What.** ED-11 sets out four layers: organisation, department or pillar, team, project. The sector research
(`knowledge/research/2026-10-23.layers-by-sector.md`) finds that in schools, VET and higher education the
benchmark is set by a body above the organisation: ACARA and the state authority, training packages and the 2025
Outcome Standards, the Higher Education Standards Framework. Workplace learning has no such body and adopts a
framework by choice. *Evidence strength:* schools well supported; higher education partly; VET and workplace
learning mostly leads, because federal sites did not load.

**Why now.** The cast is already tagged with layers, and the redesign (ED-09) and the starter repository (ED-12)
will both lean on them. The paper does not carry layers yet, so the owner writes them into the paper first.

**Two separate questions.**

**A. How many layers?**

1. **Five: add a system layer above the organisation (recommended).** *Costs:* amends ED-11; a new paper section
   and a second figure. *Gets:* reads true in every regulated sector, where gates are partly set from outside.
   *Undo:* moderate once published.
2. **Four as ED-11 frames them, with the benchmark as an input to stage 2.** The paper already says Specify
   "takes in or authors" the standard. *Costs:* the bodies that set standards and some gates go unnamed in the
   layers. *Gets:* changes no ruling and needs no extra figure; fits workplace learning, where the benchmark is
   chosen; keeps the frame on ownership inside a provider. *Undo:* easy to add the fifth later.
3. **No layers in the model; a guide to adjusting the stages to your size instead.** Reverses ED-11. *Costs:*
   the owner's frame is dropped; the starter repository has no shared way to say who owns what. *Gets:* no paper
   change. *Undo:* trivial.

**B. What are they called?** ED-01 asks for education's own words. Candidates: organisation · department ·
team · program (recommended: "department" for "pillar", which is corporate vocabulary). *Caution:* "program"
and "project" both mislead. In VET the unit is developed but the qualification is released. In schools a
"program" is a teacher's teaching and learning program (`S-AC-PLAN`). In higher education it often means a
whole degree. The bottom layer may need a neutral word ("the material being developed") or a word per sector.
*Undo:* easy before the paper carries it.

**Not yet proposed: who owns what at each layer.** The paper supports only two points: regulation sets how strict
a gate is, and institutions should fund stages 9 and 10 and name one owner per program (§8). Anything further
(gate policy, release registers, a department's portfolio) is new model content for the owner to write. The paper's
open question about design and delivery sitting in different teams (§9.1) is not answered by any layering yet.

**Both cases.** The researcher: leaving out the system layer makes the model false for regulated sectors, and
"pillar" is not education's word. The case for four: the owner's frame is ownership inside a provider, and the
system layer can be modelled as the benchmark that comes in at stage 2. A separate point on presentation: the UX
researcher advises against SAFe-style "configurations" and toward CAST's grid or Shape Up's "Adjust to your
size".

**If nobody decides.** ED-11's four names stand in `knowledge/`; no site page states layers.

### H-8 · The starter repository: where, what it stores, and what it calls things

**Decided 2026-10-23 → ED-15.** Kept below as the record of the options.

**What.** ED-12 aims at a public starter repository that takes units of competency from training.gov.au and runs
gated loops toward released assessment tools, mapping matrices, learner guides and session plans. **It starts in
VET**; other sectors' benchmarks (ACARA's curriculum is already published as data) come later. Discover findings:
`knowledge/research/2026-10-23.starter-inputs.md`.

**1. Where it lives.**

1. **A separate public repository, started after a worked example exists (recommended).** *Costs:* a second repo
   to look after. *Gets:* its tooling needs dependencies, which here would each need an `ED-` row; its readers
   develop material rather than read about the model. *Undo:* easy; archive it.
2. **A folder in this repository.** *Costs:* dependencies and a different audience inside the site's repo.
   *Gets:* one place to look. *Undo:* moderate; moving it later breaks links.
3. **Wait until the paper carries the layers (H-7).** *Costs:* months. *Gets:* builds on settled ground.

**2. Unit text and its licence.** Search snippets (a lead, `S-TGA-COPY`) say training.gov.au content is
CC BY-ND 3.0 AU: quoting with attribution is allowed; a reworded criterion is a derivative. The licence bites on
outputs too: a released mapping matrix reproduces criteria.

1. **Verify the licence first; until then, store unit codes and releases only and fetch the text into the
   user's own working copy at run time (recommended).** *Costs:* a fetch step; examples in the repository show
   codes, not text. *Gets:* nothing published that the licence might not allow. *Undo:* easy; add text later.
2. **Commit verbatim unit text with attribution.** *Costs:* a risk if the licence is not what snippets say; no
   rewording ever. *Gets:* examples that read in full. *Undo:* hard once copies are taken.
3. **Ask the department for written terms.** *Costs:* time, and an outward-facing request. *Gets:* certainty.

**3. Data shape.**

1. **Align to 1EdTech CASE v1.1 (recommended; `S-1EDTECH-CASE-2025`).** Unit, element and criterion become linked
   items with stable ids. *Costs:* learning a published standard; some fields go unused. *Gets:* other tools can
   read it; supersession can be tracked item by item. *Undo:* moderate.
2. **A home-grown shape.** *Costs:* nobody else reads it. *Gets:* fitted exactly to units. *Undo:* easy early,
   hard later.

**4. Artefact names.** The 2025 instrument defines "assessment tool" (instrument, instructions, context and
conditions, tasks, evidence, criteria, recording). No source opened so far defines "mapping matrix" or "learner
guide", and TAEASS412 treats mapping as part of the tool.

1. **Keep "mapping matrix" (the paper's stage 3 artefact) and "learner guide" (ED-12's word; the paper does not
   use it) (recommended).** *Costs:* names that are customary rather than defined. *Gets:* the words trainers
   and developers already use; no change to the paper. *Undo:* easy.
2. **Fold mapping into the tool and say "learning resource".** *Costs:* departs from the paper and from common
   use. *Gets:* matches the instrument's and TAEASS412's framing.

**5. The first worked example.** The paper (§9.2) proposes "one anonymised unit taken through all ten stages".
The first panel's finding P-19 asked for a worked example through all ten stages showing a regulated program and
a light one.

1. **Two examples: one current VET unit and one light, unregulated program (recommended).** TAEASS412
   *Assess competence* is verified and fittingly about assessment. *Costs:* twice the work; a named unit is not
   anonymised, so the owner amends §9.2's wording. *Gets:* serves VET readers and everyone else. *Undo:* easy.
2. **One invented unit.** *Costs:* less trust from developers ("no example with a real unit code, no trust").
   *Gets:* no licence question. *Undo:* easy.
3. **One real VET unit only.** *Costs:* non-VET readers see nothing of their own. *Gets:* fastest.

**If nobody decides.** Nothing is built; the worked example proceeds with an invented unit.

### H-9 · Further corrections to the paper from the 0.2.0 panel

**What.** The paper is the owner's text, so these wait for a yes, like H-4. Record:
`knowledge/panels/2026-10-23.stage-rename.md`.

1. **ADDIE's feedback path (§2.1, §4).** §4 says "the feedback path from stage 10 is what distinguishes the EDLC
   from ADDIE". The instructional design expert notes that the 1975 IPISD, which the paper names as ADDIE's
   origin, ends in a phase that evaluates and revises, and Molenda (2003) describes ADDIE as an umbrella term.
   *Suggested:* "from ADDIE as commonly practised" in §4; "summative evaluation arrives last" in §2.1. *Source
   status:* a lead until someone opens the DTIC scans (`S-BRANSON-1975`) in a browser.
2. **§2.2 carries the TDD claim too.** Add §2.2 ("Both anticipate test-driven development") to H-4 item 2.
3. **"Release planning" for stage 7 (§4.2, §5.1; `/inspiration/`).** Release planning decides what goes in which
   release and when, which is closer to stages 8 and 10. Fitting work into a fixed timebox is iteration planning.
   *Suggested:* "Iteration planning", or "Iteration and capacity planning".
4. **"Staging environments" (§4.2).** A staging environment is where a release is checked before it goes out,
   which is nearer stage 8. *Suggested:* drop "and staging environments" from the fixtures row.
5. **Continuous integration (abstract).** It is named among software's practices, but nothing in the model
   corresponds to it. *Suggested:* drop it from the list, or say the EDLC has no counterpart.

**Options.** (1) Accept all five (recommended; *costs* one editing pass alongside H-4; *gets* parallels a software
reader finds exact and an ADDIE claim an instructional designer accepts; *undo* easy before wide circulation).
(2) Accept 2 to 5 now and hold 1 until the IPISD scans are read. (3) Defer to the paper's peer review.

**If nobody decides.** The paper stays as written. `/inspiration/` keeps its hedge on test-driven development.

# tutelage.edlc — the working contract

This repo is the **public home of the Education Development Lifecycle (EDLC)**: a ten-stage, gated,
closed-loop model for how education material is developed, released, delivered and improved. It holds
three things:

- **the site** (`site/`), published to <https://edlc.tutelage.au> by GitHub Pages;
- **the knowledge base** (`knowledge/`): the cast of stakeholders and experts who review our work, the
  sources register and the panel records;
- **the bench** (`.claude/`): the agents and skills that write, check and release the site.

New here? Read `README.md`, then `docs/README.md` (the reading order), then `docs/decisions.md`.

## What the EDLC is about, and what it is not

The subject is **the development process for education material**: standards, outcomes, assessment,
content, delivery, validation and improvement. Write about that, in education's own words.

Software lifecycle practice (SDLC, DevOps) is the model's **inspiration, not its subject** (ED-01). It lives
on one page (`site/inspiration.md`) and in the paper's own argument. Elsewhere, never explain an
education idea by its software name, and never use software vocabulary where an education word exists:
"assessment", not "test suite"; "release to a cohort", not "deploy"; "standard", not "spec".

## Authority, in order

1. The owner's (Hilary's) current instruction. An instruction in chat is a decision: record it in
   `docs/decisions.md`.
2. `docs/decisions.md`: dated rulings `ED-nn`, open memos `H-nn`.
3. The paper (the public tab of the owner's EDLC Exploration doc), as carried in `site/paper.md`. The
   site's other pages explain the paper; they never contradict it. Where they must differ, raise an `H-` memo.
4. `docs/content.standards.md` and `docs/way-of-working.md`.
5. tutelage.design's `DESIGN.md` (marketing skin) for anything visual.

## Standing rules

- **This repo is public.** Nothing internal reaches it: no client or employer names, no internal product
  plans, roadmaps or page links, no links into private workspaces or repos, no personal email addresses. The
  owner's internal material stays in the owner's doc. `tooling/check.mjs` carries a hashed forbidden-terms
  list and fails the build on a hit; that list only grows (`node tooling/check.mjs --hash "<term>"` adds one).
- **Sector-neutral by default.** Australian VET is the model's grounding, and it is named as such, but a
  page must read true for a university, a school, a corporate academy and an independent expert too.
- **Every claim traces.** A fact about the world cites a source in `knowledge/sources/sources.md`; a claim
  about the model traces to the paper. What cannot be traced is an open question, written as one.
- **Every person in `knowledge/people/` is fictional**, and every invented fact is marked `[invented]`.
  A persona never speaks for a real organisation, regulator or person.
- **The site is the canon for the model.** Stage facts live once, in `site/_data/stages.js`; pages render
  them. Never restate a stage's gate or artefact by hand in a page.
- **One dependency** (`@11ty/eleventy`, pinned). No new dependency without an `ED-` row naming it.
- **Nothing ships unchecked.** `pnpm verify` (build + check) passes before every commit that touches
  `site/`. A release to `main` follows the `release` skill: the gate, the panel and a changes row.
- **Commits.** Stage by path (`git add <paths>`), never `git add -A` or `git add .`; never `--amend` on
  `main`; never force-push. Pushing to `main` publishes the site, so only the lead pushes, and only after
  the `release` gate holds and the owner has asked for the release.
- **Disagree out loud.** Challenge an outcome in the file it lives in. An unresolved disagreement goes to
  the session's close note with both cases intact.

## The bench

The lead session orchestrates; the roles are in `.claude/agents/README.md`. Writers: `editor`, `site`.
Readers who never write: `reviewer`, `analyst`, `researcher`, `stakeholder`, `expert`. The `panel` skill
convenes stakeholders and experts on a draft; the `release` skill is the gate before anything goes public.

## Commands

```sh
pnpm install         # once
pnpm dev             # local server with reload at http://localhost:8080
pnpm verify          # build + check: what CI runs
```

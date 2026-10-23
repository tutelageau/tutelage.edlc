# Content standards

How the site reads. The `reviewer` judges every change against this file, not against the page next to it.

## Voice

- **Plain, specific, calm.** Written for a trainer, a course coordinator or a quality manager on a busy day.
  Sentences under 25 words, paragraphs of three sentences or fewer.
- **Lead with the point.** The first sentence of a page and of each section says what it is for.
- **Specifics, not adjectives.** "Reviewing a coverage plan costs less than rewriting a finished assessment",
  not "early review is powerful".
- **No hype.** The EDLC is a proposal, untested. Never "proven", "best practice", "revolutionary" or "transforms".
  Say "we propose", "a candidate", "to be tested".
- **Australian English** (organisation, program for a course of study, artefact), dates as `23 October 2026`
  in prose and `2026-10-23` in tables.

## Education words, not software words (ED-01)

| Say | Not |
| --- | --- |
| learning standard, outcome, outcome descriptor | spec, requirement |
| assessment, assessment task, marking guide | test, test suite |
| release to a cohort, version | deploy, ship, push |
| learning materials, content | code, implementation |
| defect in the program, complaint, appeal | bug, incident ticket |
| delivery signals, evidence | telemetry, monitoring |
| review, validation | code review, QA |

The stage names are the paper's until `H-1` is decided. Software vocabulary belongs on `/inspiration/` and in
the paper.

## Claims

- A claim about the **model** traces to the paper (`site/paper.md`) or a decision. A page may explain the paper
  and add practical guidance (such as "At the gate, ask"), but never adds a stage, principle or practice the paper
  lacks.
- A claim about the **world** (a regulation, a study, a date) cites a source registered in
  `knowledge/sources/sources.md`, and that source's status must be `verified` before the claim is published.
- A regulation is named precisely, with its effective date, and never paraphrased as a requirement it does not
  state.
- What is not known is written as an open question, not smoothed over.

## Public safety

The repo and site are public (ED-02). Never publish:

- client, employer or customer names, or details that identify them;
- internal product plans, roadmaps, pricing, page ids or links to private workspaces;
- personal details of real people, including email addresses;
- learner data of any kind, even anonymised, unless a decision names the source and its consent.

`tooling/check.mjs` holds a forbidden-terms list and fails the build on a hit. The list is a backstop, not
the rule: the `reviewer` reads for anything identifying the list does not catch.

## Accessibility

WCAG 2.2 AA is the floor. One `<h1>` per page; headings in order; link text that makes sense alone; every figure
has a text equivalent on the same page (the loop figure has its ordered list); colour never carries meaning alone;
tables have header rows and scroll inside themselves at 360px; text contrast 4.5:1 in both colour schemes.

## Page shapes

- A **stage page** is `site/stages/<slug>.md` with `stage: <n>`. Its facts come from `site/_data/stages.js`. Its
  body: a two-sentence opening, `## What happens` (three to five bullets), `## At the gate, ask` (three or four
  questions). Operate-stage pages may add a guardrails section.
- A **reference page** (glossary, research) is a title, a lede, a table, next to no prose.
- The **paper** is the owner's text. Edit it only to carry an owner-approved change from the source doc.

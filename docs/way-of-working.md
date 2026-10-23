# Way of working

We build this site the way the EDLC says education material should be built. Each change to the site is a
small program going through the ten stages, with lighter gates. If the model is awkward to follow here, that is
evidence about the model: write it down in the session's close note.

## A change, stage by stage

| Stage | For a page on this site | Gate | Who |
| --- | --- | --- | --- |
| 1 Discover | Who is this page for? Name two or three readers from `knowledge/people/`. | Readers named | lead |
| 2 Specify | What the page must say, traced to the paper section or a decision. What it must not say. | Brief written | lead, `analyst` |
| 3 Architect | Where it sits: nav, links in and out, what it replaces. Nothing said twice. | Placement agreed | lead |
| 4 Scaffold | Headings only, in the page file. | Shape read by `reviewer` | `editor` |
| 5 Test-first | The **reader questions**: three to five questions each named reader must be able to answer after reading. Written into the commission before any prose. | Questions agreed | lead, `analyst` |
| 6 Build | The prose, to the questions. | `pnpm verify` passes | `editor`, `site` |
| 7 Orchestrate | Fits the release: version bump, changes row, nav. | Release notes drafted | lead |
| 8 Validate and release | The `release` skill: `reviewer`, the `panel`, `pnpm verify`, owner's go. | Panel holds; owner says go | lead |
| 9 Deliver and observe | Issues, comments, what readers ask that the page did not answer. | — | lead |
| 10 Improve | Triage into change requests in `knowledge/panels/` or as issues; re-enter at stage 2 or 5. | Changes queued for a release | lead, `analyst` |

A typo fix skips to stage 6 and still passes stage 8's `pnpm verify`. A new page or a change to the model's
wording runs every stage.

## The lead and the commission

The lead session holds the decisions, the record and the commits, and orchestrates the bench. A commission to an
agent is self-contained, because the agent knows only what it is told:

- **Goal** in one sentence, and the stage of the change it serves.
- **Write scope**: the exact files the agent may change. Reviewers get none.
- **Sources**: the paper sections, decisions and knowledge files to read first.
- **Reader questions** (stage 5) the work must answer.
- **Done when**: the check that proves it.

Run at most two writers at once and never give them overlapping files.

## Reports

Every agent report ends with two lines: `Retro:` (went well · didn't · improve, one line each) and `Disagree:`
(`none`, or the file and the point). Persona agents add `Sheet gap:` (what they saw that their sheet does not
cover), and the lead folds it into the sheet's growth log.

## Sessions

Use the `session` skill to open and close. The close note goes in `knowledge/sessions/<date>.md`: what changed,
what was decided (as `ED-` rows), open memos, blockers with both sides, and the retro.

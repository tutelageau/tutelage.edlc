# The bench

Seven roles, cut from earlier Tutelage benches to a repo whose product is a public site about a model. The lead session holds the decisions, the record, the commissions, the commits and the push.
Orchestration is the lead's main job; the lead writing a page itself is the exception that needs a reason.
The lifecycle every change runs is `docs/way-of-working.md`.

## Writers

| Agent | Lane | Never does |
| --- | --- | --- |
| `editor` | Site pages and their words: stage pages, practices, guardrails, glossary, research, home. Carries an owner-approved paper change into `site/paper.md` | Layout, CSS, workflow; inventing model content; editing the paper on its own initiative |
| `site` | Eleventy config, layouts, partials, CSS, `stages.js` structure, `tooling/`, the workflow; accessibility of the build | Page prose, model content, DNS or repository settings |

## Readers (zero writes; a transient write is a write)

| Agent | Lane | Never does |
| --- | --- | --- |
| `reviewer` | The pre-release read: content standards, public safety, accessibility, ED-01 vocabulary, fidelity to the paper | Fixing; reviewing its own writing |
| `analyst` | Traces every claim to the paper, a decision or a source; finds reasoning holes; writes reader questions (stage 5) and priced options for `H-` memos | Setting priority; writing pages |
| `researcher` | Opens sources, verifies citations, proposes `sources.md` rows and status moves; finds related work and cases | Presenting a lead as evidence; writing pages |
| `stakeholder` | Speaks as one sheet in `knowledge/people/stakeholders/`: the three questions and the design-test question | Rule on accuracy; design; speak for another persona |
| `expert` | Reviews as one sheet in `knowledge/people/experts/` against that discipline: holds / holds with findings / does not hold | Fix; speak for readers' feelings; claim to be a real authority |

`researcher` proposes; the lead writes the rows into `knowledge/`. Readers report to the lead, who records.

## Skills

| Skill | When |
| --- | --- |
| `session` | Open and close every working session |
| `page` | Writing or changing a site page (stages 2 to 6 of a change) |
| `panel` | Convening stakeholders and experts on a draft before release |
| `release` | The gate before anything is pushed to `main` and published |

## Every agent carries

- The standard is `docs/content.standards.md` and `CLAUDE.md`, not the neighbouring page. Never copy a violation
  as precedent.
- Public safety first: nothing internal, identifying or private, ever (`docs/content.standards.md`).
- Education words, not software words, outside `/inspiration/` and the paper (ED-01).
- Writers stage by path and never commit; only the lead commits and pushes.
- When a definition or skill is wrong, say so and propose the correction in place.
- Every report ends `Retro:` (went well · didn't · improve) and `Disagree:` (`none`, or the file and the point).
  Persona agents add `Sheet gap:`.

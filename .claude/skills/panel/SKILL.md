---
name: panel
description: Convenes a review panel of stakeholder and expert personas on a draft page, the paper or a whole release of the EDLC site — picks the cast for the artefact, runs each reader as a read-only subagent in parallel on a frozen commit, collects verdicts, triages findings into fix-now / next-release / open-question / declined, and writes the record to knowledge/panels/. Use before every release that changes what the site says, when the owner asks for a panel or a check-out of work, and when a page is planned (in ideation mode).
---

# Panel

The cast builds out and checks the work before it goes public (ED-03). Stakeholders say whether it is useful and
clear to them; experts say whether it is right. Neither substitutes for the other.

## 1 Freeze

Commit the draft (or name the commit) and record the sha. Every reader reads the same thing.

## 2 Choose the cast

Three to six readers. Always at least two stakeholders and two experts. Starting points:

| Artefact | Stakeholders | Experts |
| --- | --- | --- |
| A stage page, stages 1–8 | quality.manager, trainer, + one non-vocational (course.coordinator, workplace.learning or independent.creator) | instructional.design, assessment; vet.validation if it mentions regulation |
| A stage page, stages 9–10, or observability | trainer, learner, provider.owner | ethics.privacy, assessment, learning.engineering |
| Practices, guardrails | quality.manager, learner, quality.agency | ethics.privacy, instructional.design |
| The paper | course.coordinator, quality.agency | learning.engineering, instructional.design, software.lifecycle, vet.validation |
| `/inspiration/` | course.coordinator, workplace.learning | software.lifecycle, instructional.design |
| Home, contribute, a whole release | provider.owner, independent.creator, learner, quality.manager | accessibility, content.design, + the expert nearest to what changed |
| Navigation, page templates, the story (ED-09) | trainer, school.teacher, independent.creator | content.design, accessibility |
| A sector page: schools | school.teacher, school.curriculum.leader | school.curriculum, + one other |
| A sector page: higher education | course.coordinator, associate.dean, academic.developer | higher.education.quality, instructional.design |
| A sector page: VET | quality.manager, trainer, resource.developer | vet.validation, training.packages |
| A sector page: workplace and soft skills | workplace.learning, soft.skills.facilitator, workplace.learner | soft.skills, assessment |
| Worked examples, starter repository (ED-12) | resource.developer, trainer, quality.manager | training.packages, vet.validation, assessment |
| Anything about layers (H-7) | school.curriculum.leader, associate.dean, provider.owner, workplace.learning | the sector experts named on the page |

Swap readers when the change's subject calls for it, and say why in the record.

## 3 Commission each reader

Run them as parallel subagents (`stakeholder` or `expert`), each with: their sheet path; the pages to read (source
paths in `site/`, and built paths in `_site/` if built); the frozen sha; the mode (`review`, or `ideation` when the
page is only planned); and, for stakeholders, the reader questions from the `page` skill if they exist. Nothing
else: do not tell them what you hope they will find.

## 4 Triage

For every finding: id (`P-<n>`), reader, page, the finding in one line, severity, and a disposition:

- `fix-now`: before this release. Any expert `blocker`, any public-safety point, any stakeholder "I would not
  trust this" with a concrete cause.
- `next-release`: real, not urgent.
- `open-question`: to `/research/` or an `H-` memo.
- `declined`: with the reason, and the reader's case kept intact.

The lead triages; the `analyst` may be asked to check the triage for findings dismissed too easily.

## 5 Record

Write `knowledge/panels/<yyyy-mm-dd>.<slug>.md` (format in `knowledge/panels/panels.md`): sha, cast, one verdict
line per reader, the findings table, what the release must carry. Full answers in `<record>.reads.md`. Fold every
`Sheet gap:` into the sheets.

## The gate

A release holds only when no `expert` returns `does not hold`, every `fix-now` is fixed (re-read by the reader who
raised it, or the lead records why not), and no stakeholder's design-test answer is "no" for a reason the release
could have fixed.

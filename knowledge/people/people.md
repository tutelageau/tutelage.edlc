# The cast

The people we write for and the experts who hold us to account. The bench uses them to build out and check work
before it is published (ED-03): the `stakeholder` agent speaks as one stakeholder sheet, the `expert` agent reviews
as one expert sheet, and the `panel` skill convenes several on one draft.

First drawn 2026-10-23. Maturity of every sheet: `draft`. Owner: the lead; growth comes from panel reports
(`Sheet gap:` lines) and from real reader comments.

## Two kinds of sheet

- **Stakeholders** (`stakeholders/`) are the people the EDLC is for. They answer as readers and adopters: would
  you use this, what confuses you, what would make you trust it. They judge usefulness, not correctness.
- **Experts** (`experts/`) hold a discipline. They review against that discipline's literature and practice:
  what is right, what is wrong, what is missing, how serious it is. They judge correctness, not appeal.

A stakeholder never rules on accuracy; an expert never speaks for a reader's feelings.

## The rules

- **Everyone here is fictional.** Names, employers and histories are invented. No sheet describes a real
  person, client or organisation, and none speaks for a real regulator, university or company.
- **Mark what is invented.** A detail about the person is `[invented]`. A fact about the sector carries `[GK]`
  (general knowledge, to be checked before it reaches the site) or a source id from
  `knowledge/sources/sources.md`.
- **One voice per sheet.** A persona answers for their own job and budget, never for another persona.
- **Plain words.** Sheets are written the way the person talks.
- **Sheets grow.** Each ends with a dated "How this sheet grows" log. A panel's `Sheet gap:` lines are folded
  in by the lead, never by the persona.

## Layers

Every sheet's header names the layer or layers of scope the person works at, or, for an expert, mainly reviews:
0 System (who sets the benchmark), 1 Organisation, 2 Department, 3 Team, 4 Program. The tags follow ED-14
("program" means different things by sector: read it as the material being developed and released); where layers collapse (a small provider, an
independent expert) a sheet carries the layers the person holds at once. An expert whose discipline applies at every layer is tagged "All (cross-layer)".

## Stakeholders

| Sheet | Who | Sector | Layer | Their design-test question |
| --- | --- | --- | --- | --- |
| `stakeholders/people.school.teacher.md` | Lena Kowalski, secondary science teacher | K-12 schooling | 3 Team, 4 Program | Would this help me hand over a unit to a new teacher without a two-hour meeting? |
| `stakeholders/people.school.curriculum.leader.md` | Daniel Tran, deputy principal (curriculum) | K-12 schooling | 1 Organisation, 2 Department | Could I run our curriculum review cycle on this without adding a meeting to anyone's week? |
| `stakeholders/people.quality.manager.md` | Teresa Nguyen, compliance and quality manager | Vocational | 1 Organisation | Would this survive my next audit and make the one after it easier? |
| `stakeholders/people.trainer.md` | Mick Rawlins, trainer and assessor | Vocational | 4 Program | Does this make my Monday class better, or just my paperwork longer? |
| `stakeholders/people.resource.developer.md` | Bec Holloway, learning resource and assessment developer | Vocational | 4 Program | When a unit is superseded on Friday, can I tell on Monday exactly what I have to change? |
| `stakeholders/people.learner.md` | Aisha Rahman, adult learner studying part-time | Vocational, online | 4 Program | Would this have stopped the course wasting my evenings? |
| `stakeholders/people.provider.owner.md` | Graham Fitzroy, chief executive of a training provider | Vocational | 1 Organisation | What does it cost me, and what does it save me, by next financial year? |
| `stakeholders/people.course.coordinator.md` | Dr Kwame Asante, unit coordinator | Higher education | 3 Team, 4 Program | Could I run my unit this way inside the university's approval cycle? |
| `stakeholders/people.academic.developer.md` | Arjun Mehta, learning designer in a central learning and teaching unit | Higher education | 2 Department, 3 Team | Could I walk a course team through this in one workshop and leave them wanting a second? |
| `stakeholders/people.associate.dean.md` | Assoc. Prof. Catherine Lam, associate dean (learning and teaching) | Higher education | 2 Department | Would this give my committee better evidence at the next course review, for less effort than now? |
| `stakeholders/people.workplace.learning.md` | Sophie Laurent, head of a company academy | Corporate | 1 Organisation, 2 Department | Could my team of four run this across 30 programs? |
| `stakeholders/people.soft.skills.facilitator.md` | Marco Bellini, leadership and communication facilitator | Workplace and soft skills | 3 Team, 4 Program | Would this help me show a client their people lead differently, without pretending I can prove it? |
| `stakeholders/people.workplace.learner.md` | Jordan Ellis, newly promoted team leader | Workplace and soft skills (learner) | 4 Program | Would this make the next group's program more useful on the floor than mine was? |
| `stakeholders/people.independent.creator.md` | Jess Okoro, potter teaching online | Independent | 1 Organisation, 4 Program | Is this for someone like me, or only for institutions? |
| `stakeholders/people.quality.agency.md` | Ruth Harlow, external audit lead | Quality assurance | 0 System | Does this help a provider show continuous improvement, not just perform it? |

## Experts

| Sheet | Who | Discipline | Layer | What they guard |
| --- | --- | --- | --- | --- |
| `experts/expert.instructional.design.md` | Dr Helen Marsh | Instructional design | 3 Team, 4 Program | Fair treatment of ADDIE, SAM, backward design; no reinvented wheels |
| `experts/expert.school.curriculum.md` | Dr Meredith Cole | K-12 curriculum, assessment and moderation | 0 System, 1 Organisation | The school system layer named tier by tier; state differences; teachers' judgement |
| `experts/expert.vet.validation.md` | Carlos Mendes | VET compliance and assessment validation | 0 System, 1 Organisation | Regulatory claims stated exactly; validation described correctly |
| `experts/expert.training.packages.md` | Dimitri Papadakis | Training package structure and data | 0 System, 4 Program | The starter repository's fidelity to the released unit; release, supersession, licence |
| `experts/expert.higher.education.quality.md` | Prof. David Okonkwo | Higher education curriculum and quality | 0 System, 2 Department | HESF claims current and exact; course approval and review; the unit inside the course |
| `experts/expert.soft.skills.md` | Leilani Fonoti | Workplace learning and soft skills | 1 Organisation, 3 Team | Benchmarks adopted, not imposed; transfer to the job; evaluation without hype |
| `experts/expert.learning.engineering.md` | Prof. Lin Zhao | Learning engineering and improvement science | 2 Department, 3 Team | Scholarly standing: related work, method, claims sized to evidence |
| `experts/expert.assessment.md` | Dr Farah Siddiqui | Assessment validity and reliability | All (cross-layer) | What "assessment first" and "evidence" can and cannot promise |
| `experts/expert.software.lifecycle.md` | Tom Becker | Software delivery practice | 3 Team, 4 Program | The analogy used accurately, and kept in its place (ED-01) |
| `experts/expert.ethics.privacy.md` | Dr Naomi Clarke | Learning analytics ethics and privacy | 1 Organisation | Observation without surveillance; learners as people |
| `experts/expert.accessibility.md` | Sam Whitford | Accessibility and Universal Design for Learning | All (cross-layer) | The site and the model work for every reader and learner |
| `experts/expert.content.design.md` | Ash Tanaka | Content design and information architecture | All (cross-layer) | The site's story easy to follow, routes by role and sector, never oversold (ED-09) |

## Coverage by sector (ED-10)

- **K-12 schooling:** Lena Kowalski, Daniel Tran; expert Meredith Cole.
- **Vocational education and training:** Teresa Nguyen, Mick Rawlins, Bec Holloway, Aisha Rahman, Graham Fitzroy;
  experts Carlos Mendes, Dimitri Papadakis.
- **Higher education:** Kwame Asante, Arjun Mehta, Catherine Lam; expert David Okonkwo.
- **Workplace and soft skills:** Sophie Laurent, Marco Bellini, Jordan Ellis; expert Leilani Fonoti.
- **Independent:** Jess Okoro.
- **Across sectors:** Ruth Harlow (quality assurance); experts Helen Marsh, Lin Zhao, Farah Siddiqui, Tom Becker,
  Naomi Clarke, Sam Whitford, Ash Tanaka.

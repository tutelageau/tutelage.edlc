---
layout: layouts/page.njk
permalink: /paper/
title: "The Education Development Lifecycle: Bringing Software Lifecycle Discipline to the Design, Delivery, and Continuous Improvement of Learning"
eyebrow: Paper · public draft
description: The conceptual paper behind the EDLC, with its framework, stages, practices, guardrails and research agenda.
toc: true
---
<p class="note">This is a working draft, published for comment on 23 October 2026. It has not been peer reviewed, and some references are still to be verified against their originals (see the note under References). <a href="{{ site.issues }}">Comment on GitHub</a>.</p>

## Abstract

Education has well-established models for *designing* instruction, but weak practice for *maintaining and improving* it once it reaches learners. Software engineering faced a similar gap and closed much of it through lifecycle practices: traceable requirements, test-first development, version control, dependency management, production observability, and the explicit management of technical debt.

This paper proposes the Education Development Lifecycle (EDLC), a ten-stage, gated, closed-loop model for the design, release, delivery, and continuous improvement of learning programs. The EDLC treats a learning standard as a specification, assessment as the test suite, a mapping matrix as the traceability matrix, and a delivered cohort as a versioned release whose performance is observed and fed back into design.

The model is derived through structured analogy between the software development lifecycle and existing instructional design models, grounded in practitioner experience from Australian vocational education and training (VET). We identify where the analogy holds, where it breaks, and the ethical guardrails that follow. We argue that the largest unrealised value lies in the operate-and-improve half of the lifecycle, and we set out a research agenda to test the model empirically.

**Keywords:** instructional design, curriculum development, learning engineering, software development lifecycle, DevOps, continuous improvement, assessment validation, vocational education

## 1. Introduction

Most learning programs are built once, audited occasionally, and improved rarely. Course materials are typically produced as a project with a fixed end date. After release, they drift: examples age, external standards are revised, delivery staff patch gaps informally, and the evidence of how learners actually performed seldom returns to the people who designed the program.

Software development once looked similar. Over five decades it moved from linear, document-driven processes toward iterative development, automated testing, continuous delivery, and operational feedback loops. The software development lifecycle (SDLC), and later DevOps, made the *whole life* of a system the unit of design, not just its initial construction.

Education has borrowed from engineering before. The ADDIE model descends from a 1975 systems-engineering procedure for military training (Branson et al., 1975), and the emerging field of learning engineering explicitly applies engineering design methods to learning (IEEE ICICLE). Yet no widely adopted model describes the full lifecycle of a learning program with the operational rigour that modern software teams take for granted.

This paper asks three questions:

1. Which SDLC practices have meaningful equivalents in the design and delivery of learning programs?
2. What would a complete, closed-loop lifecycle for learning programs look like?
3. Where does the analogy fail, and what constraints must a lifecycle model respect as a result?

Its contributions are a ten-stage Education Development Lifecycle (EDLC) with defined gates; a mapping of SDLC practices to educational equivalents; a set of cross-cutting practices, including the concept of *curriculum debt*; an analysis of the analogy's limits; and a research agenda for empirical testing.

## 2. Background and related work

The EDLC sits where four bodies of work meet: instructional systems design, alignment-based curriculum design, learning engineering and improvement science, and software lifecycle practice. Each contributes a piece; none covers the whole loop.

### 2.1 Instructional systems design and ADDIE

ADDIE (Analyse, Design, Develop, Implement, Evaluate) is the most widely cited instructional design process. Its roots lie in the Interservice Procedures for Instructional Systems Development, produced by Florida State University's Center for Educational Technology for the US armed forces (Branson et al., 1975). Molenda (2003) notes that the acronym itself has no clear origin and that ADDIE functions more as an umbrella term than a single specified model.

In its early form ADDIE was largely sequential, like the model Royce (1970) described and warned against running as a single pass. Its main practical weakness mirrors that model's: summative evaluation arrives last, often reduced to learner satisfaction surveys, so it rarely reshapes the design.

### 2.2 Alignment-based design

Backward design (Wiggins & McTighe, 1998) begins with desired results, then defines acceptable evidence, and only then plans learning activities. Constructive alignment (Biggs, 1996) similarly requires that intended outcomes, teaching activities, and assessment tasks align. Both put acceptance criteria first, in the spirit of test-driven development (Beck, 2002): define what success looks like, then build toward it. Neither, however, addresses what happens after delivery.

### 2.3 Iterative design

The Successive Approximation Model (Allen, 2012) replaced ADDIE's long phases with short cycles of prototyping and review, an explicitly agile move. Design-based research (Brown, 1992; Collins, 1992) brought iteration into education research itself, refining interventions through repeated cycles in real settings.

### 2.4 Learning engineering and improvement science

Learning engineering is defined by the IEEE-hosted ICICLE consortium as a process and practice applying the learning sciences through human-centred engineering design and data-informed decision-making (IEEE ICICLE). Improvement science (Bryk et al., 2015) applies Plan-Do-Study-Act cycles to persistent problems in education systems. These are the closest relatives of the EDLC. The EDLC differs in scope: it specifies the artefacts, gates, and traceability of a *single learning program* across its life, rather than a general discipline or an improvement method.

### 2.5 Quality assurance regimes

Regulated sectors already impose lifecycle-like obligations. In Australian VET, the Outcome Standards that commenced on 1 July 2025 require providers to review assessment tools before use (Standard 1.3). Every training product must be validated at least once every five years, and more often where risks, changes or feedback arise (Standard 1.5). Risk decides which components are validated and how large a sample (Outcome Standards Instrument, 2025). These obligations supply gates, but they are framed as compliance events, not as stages in a feedback loop.

### 2.6 Software lifecycle practice

The SDLC evolved from sequential phases (Royce, 1970) through agile methods to DevOps, which integrates development with operations through continuous delivery, monitoring, and rapid feedback (Kim et al., 2016; Forsgren et al., 2018). Technical debt (Cunningham, 1992) names the accumulated cost of expedient decisions that must later be repaid. These operational ideas have the weakest counterparts in education, and they motivate the second half of the EDLC.

## 3. Approach

This is a conceptual paper. The EDLC was developed through structured analogy, refined against practitioner case material, and stress-tested by looking for where the analogy fails.

**Structured analogy.** Following structure-mapping theory (Gentner, 1983), we mapped *relations* between SDLC elements, not surface features. For example, the relevant parallel is not "a standard looks like a requirements document" but "tests are derived from requirements before implementation, and implementation exists to satisfy them." A mapping was retained only where the relation held in the educational domain.

**Practitioner grounding.** The stage sequence and gates draw on a documented, anonymised practitioner workflow from Australian VET, in which training and assessment materials for clustered units were produced through five progressively detailed, reviewed gates. That workflow had been refined over repeated commercial engagements and is consistent with backward design and with regulatory validation requirements.

**Disconfirmation.** For each mapping we asked what would make it misleading in practice. The results appear in Section 7 and constrain the model.

**Limitations of the approach.** The model has not yet been tested empirically. Its practitioner grounding is concentrated in one sector and one jurisdiction. Section 9 sets out how both limitations could be addressed.

## 4. The EDLC framework

The EDLC is a ten-stage closed loop. Stages 1 to 8 design and release a learning program; stages 9 and 10 operate it and feed what is learned back into design. Every design and release stage ends at a review gate.

{% include "partials/loop.njk" %}

Figure 1 shows the loop. The feedback path from stage 10 is what distinguishes the EDLC from ADDIE as commonly practised. Improvement is a routine route back into Specify or Map, not a one-off evaluation.

### 4.1 Design principles

1. **Specification first.** Every program traces to an explicit learning standard, whether externally regulated or authored in-house.
2. **Evidence before content.** Assessment is designed before learning materials, so content exists to enable demonstrated outcomes (backward design: acceptance criteria first, in the spirit of test-driven development).
3. **Progressive elaboration with gates.** Detail increases stage by stage, and each stage is reviewed before effort is invested in the next. Errors are cheapest to fix at the blurriest stage.
4. **Traceability end to end.** Every assessment task, content block, and delivery session traces to the outcome it serves, and the reverse.
5. **Versioned releases.** Every cohort receives an identifiable version of the program, so outcomes can be attributed to what was actually delivered.
6. **Observe in operation.** Delivery generates evidence about the program, not only about learners.
7. **Close the loop.** Findings from delivery and post-use validation become change requests that re-enter the lifecycle.
8. **Opinionated about structure, flexible about process.** The stages and the artefacts are universal. Terminology, packaging, grading scales, and approval workflows are configured per institution and sector.

### 4.2 SDLC to EDLC mapping

| SDLC practice | EDLC equivalent | Stage |
| --- | --- | --- |
| Requirements specification | Learning standard (unit, outcome set, capability standard) | 2 |
| User research and personas | Learner needs analysis and cohort profiles | 1 |
| Traceability matrix | Mapping matrix linking outcomes to assessment and delivery | 3 |
| Architecture review | Coverage and assessment strategy review | 3 |
| Scaffolding and interface stubs | Structural skeleton of all deliverables | 4 |
| Test-driven development | Acceptance criteria first: assessments and marking guides written before content | 5 |
| Test fixtures | Simulated workplace or case-study context | 5 |
| Implementation | Learning materials and activities | 6 |
| Iteration planning | Session or module plan within timetable constraints | 7 |
| Code review | Peer, subject-matter expert, and compliance review | 3 to 8 |
| Release and certification | Pre-use review and versioned release | 8 |
| Production monitoring | Learning and assessment analytics | 9 |
| Incident management | Complaints, appeals, and assessor disputes | 9 |
| Retrospective and post-incident review | Post-use validation | 10 |
| Dependency upgrade | Revision of the upstream standard | 10, re-entering 2 |
| Technical debt | Curriculum debt | 10 |

## 5. The ten stages

Each stage has a purpose, a defining artefact, an exit gate, and a characteristic failure mode that the gate exists to catch.

| # | Stage | Purpose | Defining artefact | Exit gate | Failure mode it prevents |
| --- | --- | --- | --- | --- | --- |
| 1 | Discover | Establish the need and the learners | Needs analysis, learner profiles, delivery constraints | Need and cohort agreed | Building the right course for the wrong learners |
| 2 | Specify | Ingest or author the learning standard | Structured standard | Standard complete and active | Designing against an outdated or misread standard |
| 3 | Map | Plan how every outcome is assessed and delivered | Mapping matrix, assessment strategy | Coverage plan approved | Gaps discovered only at audit |
| 4 | Outline | Shape all deliverables as headings only | Skeletons of every deliverable | Structure approved | Rewriting finished content to fix its order |
| 5 | Assessment first | Write assessments and their context | Assessment tasks, marking guides, scenario | Compliance, pedagogy, and expert sign-off | Content that teaches what is never assessed, and the reverse |
| 6 | Develop | Develop learning content to the assessments | Learning materials and activities | Accuracy and quality review | Inaccurate or unreadable materials |
| 7 | Plan delivery | Fit everything into the real timetable | Session or module plan | Every outcome has a delivery session | A program that cannot be delivered in the time available |
| 8 | Validate and release | Confirm fitness for use and fix a version | Validation record, release identifier | Released to a named cohort | Unvalidated tools reaching learners |
| 9 | Deliver and observe | Run the program and collect evidence about it | Delivery telemetry, results, feedback, incidents | Cohort complete | Problems that are felt but never recorded |
| 10 | Improve | Review, triage, and route changes | Improvement log, change requests | Changes accepted into the next release | The same flaw reaching cohort after cohort |

### 5.1 Notes on the design and release stages (1 to 8)

**Discover** is often skipped when a standard is mandated externally, yet the same standard should yield different programs for different cohorts. A program for school-leavers needs more scaffolding than one for experienced workers. This is the EDLC's equivalent of user research, and it echoes Universal Design for Learning (CAST, 2018).

**Specify** treats the standard as structured data, not a document. Decomposing a standard into outcomes, required knowledge, required skills, evidence requirements, assessment conditions, and grading levels makes every later stage traceable. The same structure can represent a regulated vocational unit, a university subject, or a course authored by an independent expert.

**Map** is the cheapest point to find errors. Reviewing a coverage plan costs far less than rewriting a finished assessment.

**Outline** lets reviewers judge the shape of the whole package before anyone writes a paragraph.

**Assessment first** is the core of the model. Writing assessments before content ensures that learning materials exist to produce demonstrable outcomes. A realistic simulated workplace or case study acts like a test fixture: it gives every assessment a consistent, plausible context.

**Develop** is the most labour-intensive stage but the least risky, because structure and evidence are already settled.

**Plan delivery** reconciles design with reality. Timetables, term lengths, and delivery modes are hard constraints, in the way that timeboxes constrain a software iteration.

**Validate and release** turns the package into a named version, so that later evidence can be tied to exactly what was delivered.

### 5.2 Notes on the operate stages (9 and 10)

These stages are discussed in depth in Section 6, because they rely on cross-cutting practices that most institutions do not yet have.

## 6. Cross-cutting practices

Five practices run across all ten stages. They are what make the EDLC a lifecycle and not just a sequence.

### 6.1 Traceability

Every artefact links to the outcomes it serves: assessment tasks to outcome descriptors, content blocks to tasks, sessions to content. Traceability is bidirectional. From any outcome you can find everything that teaches and assesses it; from any artefact you can find why it exists. This is what lets a change to one outcome be followed to every affected artefact.

### 6.2 Versioning

A program's history should be recoverable: what the standard said on a given date, what changed between releases, and which version each cohort received. Event-based records, in which every change is stored as an event and the current state is derived from them, provide this without separate version bookkeeping.

### 6.3 Dependency management

Learning standards are upstream dependencies. When an external body revises or supersedes a standard, every program built on it is affected. The EDLC treats a revision like a dependency upgrade: identify the differences, find the affected artefacts through traceability, assess impact, and route the work back through the gates.

### 6.4 Observability

Observability means collecting evidence about how the *program* performs, not only about how learners perform. Candidate signals, each tied to outcome descriptors:

- Pass, resubmission, and appeal rates per assessment item
- Points in the sequence where learners stall or withdraw
- Actual time on task compared with the planned session time
- Trainer and assessor notes on what they skipped, reworked, or supplemented
- Learner feedback tied to specific modules, not only to the course as a whole

Open specifications such as the Experience API (xAPI) (ADL, 2013) provide a common format for activity data. Learning analytics research (Siemens, 2013) offers methods, along with well-documented cautions about privacy and over-interpretation.

### 6.5 Curriculum debt

We propose *curriculum debt* as the educational counterpart of technical debt (Cunningham, 1992). It is the accumulated cost of expedient decisions in a learning program: examples that no longer reflect industry practice, patches layered on patches, assessments retained because they are compliant rather than good, and materials written for a cohort the institution no longer serves.

Like technical debt, curriculum debt is not always bad. Taking it on can be a reasonable trade to meet a start date. It becomes harmful when it is invisible. Candidate indicators include time since last substantive review, number of unreviewed patches, incident and appeal counts, and divergence between the planned and the delivered program.

## 7. Limits of the analogy and ethical guardrails

The SDLC is a lens, not a blueprint. Six differences limit how far it transfers, and each implies a guardrail.

| Where the analogy breaks | Why it matters | Guardrail |
| --- | --- | --- |
| The product is a change in a person | Outcomes depend on the cohort, the teacher, and learners' circumstances, not only on the materials | Treat delivery data as signals to investigate, never as automatic verdicts on content or people |
| No hotfixes mid-cohort | Changing assessment mid-delivery threatens fairness and validity | Queue changes for the next release unless they correct a safety, accuracy, or compliance defect |
| Experiments involve people | Deliberately giving cohorts different experiences raises ethical and equity concerns | Prefer comparison across successive releases; run controlled experiments only with ethical review |
| The teacher is part of the runtime | The same program performs differently in different hands | Record delivery context and separate content issues from delivery issues before attributing cause |
| The calendar sets the release cycle | Intakes, terms, and enrolments fix when changes can ship | Plan releases against intake dates, as a release train |
| Compliance is not quality | Passing an audit shows conformance, not that learners thrived | Report strengths as well as gaps, and measure learning outcomes alongside conformance |

Two further cautions apply to the operate stages. First, observability can slide into surveillance; data should be collected for program improvement, with clear purpose limits, minimisation, and learner transparency. Second, metrics invite gaming (Goodhart's law): a program tuned to reduce resubmissions might simply lower its standards. Indicators should be read together and reviewed by people, not optimised in isolation.

## 8. Implications

The EDLC asks different things of different groups, and the most important shift is the same for all of them: treat a learning program as a living product with a lifecycle, not a project with an end date.

**For designers and developers.** Write assessments before content. Build a mapping matrix before anything else, and keep it current. Ask for review at the blurriest stage, where changes are cheapest. Record why a design decision was made, not only what it was.

**For institutions.** Assign an owner for each program across its whole life; the role resembles a product manager more than a project manager. Version releases and record which cohort received which version. Budget for stages 9 and 10 explicitly; work that is never funded is never done.

**For regulators and quality agencies.** Existing requirements already supply several gates. Pre-use review of assessment tools maps to stage 8, and risk-based validation maps to stage 10. Framing these as parts of a feedback loop, and recognising evidence of continuous improvement, could shift provider behaviour from audit preparation toward ongoing quality.

**For education technology.** Most tools serve a single stage: authoring tools serve stage 6, learning management systems serve stage 9, compliance tools serve stage 8. The EDLC suggests value lies in connecting them through a shared, structured representation of the standard and its traceability links, so that a change anywhere can be followed everywhere.

**Beyond regulated sectors.** The model does not depend on a regulator. A corporate academy, a university faculty, or an independent expert teaching a craft can use the same stages with lighter gates. Regulation sets how strict a gate is, not whether the stage exists.

## 9. Research agenda and next steps

The EDLC is a proposal, and its claims need testing. Each proposed study below tests one of the model's core claims.

| # | Claim to test | Proposed study | Indicative measures |
| --- | --- | --- | --- |
| 1 | Early gates reduce rework | Compare programs built with and without gated review | Revision hours after each stage, defects found at validation |
| 2 | Assessment first improves alignment | Expert alignment audits of assessment-first and content-first programs | Share of outcomes with adequate evidence; unassessed content |
| 3 | Versioned releases enable attribution | Track outcome changes across successive releases of the same program | Result changes linked to specific design changes |
| 4 | Observability surfaces defects earlier | Introduce item-level analytics in delivering programs | Time from defect to detection; defects found by data vs complaints |
| 5 | Curriculum debt can be measured and predicts problems | Develop a debt index and test it against later incidents and audit findings | Correlation between index and incidents |
| 6 | The model transfers across sectors | Case studies in higher education, schools, corporate learning, and self-directed courses | Fit of stages and gates; adaptations required |

### 9.1 Open questions

- What is the smallest useful set of delivery signals for a provider with no learning-analytics capability?
- Should a change request always re-enter at stage 3, or only at the earliest stage it affects? What triage rule decides?
- How should programs that cluster several standards share assessment tasks without losing per-standard traceability?
- Who should own a program across its lifecycle when design and delivery sit in different teams or organisations?
- How can observability be designed to respect learner privacy and avoid becoming surveillance?

### 9.2 Next steps for this paper

- Peer review by instructional design, VET, and software engineering practitioners
- Expand the related-work review, especially learning engineering and improvement science
- Add worked examples: one current unit of competency and one light, unregulated program, each taken through all ten stages
- Pilot stages 9 and 10 with at least one delivering provider and report findings
- Publish as an open resource under a Creative Commons licence and invite public comment

## 10. Conclusion

Education already knows how to design learning well; what it lacks is the habit of running and improving a program as continuously as it was designed. The Education Development Lifecycle brings together established instructional design practice and the operational disciplines of modern software engineering in one ten-stage loop.

Its design and release half formalises what experienced practitioners already do: specify, map, outline, write the assessment first, develop, plan delivery, and validate. Its operate half proposes what few institutions yet do: release versions, observe how programs perform, treat complaints and appeals as defect reports, measure curriculum debt, and route what is learned back into design.

The analogy has limits, because learners are people and not systems, and those limits are built into the model as guardrails. We offer the EDLC as a shared vocabulary and a starting point, and we invite practitioners, researchers, and regulators to test, challenge, and improve it.

## Glossary

| Term | Meaning in the EDLC |
| --- | --- |
| Learning standard | The specification a program must meet: outcomes, required knowledge and skills, evidence, and assessment conditions |
| Outcome descriptor | A specific, observable expectation within a standard; the atomic unit for traceability |
| Mapping matrix | The traceability record linking each outcome descriptor to the assessment tasks and delivery sessions that address it |
| Gate | A review point at the end of a stage that must be passed before effort is invested in the next |
| Release | A named, versioned package of materials delivered to a specific cohort |
| Observability | The collection of evidence about how a program performs in delivery |
| Change request | A recorded, triaged proposal to modify a program, routed back into the lifecycle |
| Curriculum debt | The accumulated cost of expedient decisions in a learning program that must later be repaid |
| Simulated workplace | A realistic scenario that gives assessment tasks a consistent, authentic context |

## References

Draft note: entries with links were checked online for this draft; the rest are standard citations recorded from memory and should be verified against the originals before publication.

- Advanced Distributed Learning (ADL). (2013). *Experience API (xAPI), version 1.0*. ADL Initiative.
- Allen, M. W., & Sites, R. (2012). *Leaving ADDIE for SAM: An agile model for developing the best learning experiences*. ASTD Press.
- Beck, K. (2002). *Test-driven development: By example*. Addison-Wesley.
- Biggs, J. (1996). Enhancing teaching through constructive alignment. *Higher Education, 32*(3), 347–364.
- Branson, R. K., Rayner, G. T., Cox, J. L., Furman, J. P., King, F. J., & Hannum, W. H. (1975). [*Interservice procedures for instructional systems development*](https://apps.dtic.mil/sti/pdfs/ADA019486.pdf) (5 vols.). Center for Educational Technology, Florida State University.
- Brown, A. L. (1992). Design experiments: Theoretical and methodological challenges in creating complex interventions in classroom settings. *Journal of the Learning Sciences, 2*(2), 141–178.
- Bryk, A. S., Gomez, L. M., Grunow, A., & LeMahieu, P. G. (2015). *Learning to improve: How America's schools can get better at getting better*. Harvard Education Press.
- CAST. (2018). *Universal Design for Learning guidelines, version 2.2*.
- Collins, A. (1992). Toward a design science of education. In E. Scanlon & T. O'Shea (Eds.), *New directions in educational technology* (pp. 15–22). Springer.
- Cunningham, W. (1992). The WyCash portfolio management system. *OOPSLA '92 Experience Report*.
- Forsgren, N., Humble, J., & Kim, G. (2018). *Accelerate: The science of lean software and DevOps*. IT Revolution Press.
- Gentner, D. (1983). Structure-mapping: A theoretical framework for analogy. *Cognitive Science, 7*(2), 155–170.
- IEEE International Consortium for Innovation and Collaboration in Learning Engineering (ICICLE). [*Learning engineering definition*](https://sagroups.ieee.org/icicle/2022-icicle-conference-on-learning-engineering/). IEEE Standards Association.
- Kim, G., Humble, J., Debois, P., & Willis, J. (2016). *The DevOps handbook*. IT Revolution Press.
- Molenda, M. (2003). [In search of the elusive ADDIE model](https://wikicap.ulb.be/images/5/5f/Molenda_2003.pdf). *Performance Improvement, 42*(5), 34–36.
- *National Vocational Education and Training Regulator (Outcome Standards for Registered Training Organisations) Instrument 2025* (Cth), [F2025L00354](https://www.legislation.gov.au/F2025L00354/latest/text). Federal Register of Legislation. Commenced 1 July 2025. Cited as Outcome Standards Instrument (2025).
- Royce, W. W. (1970). Managing the development of large software systems. *Proceedings of IEEE WESCON*, 1–9.
- Siemens, G. (2013). Learning analytics: The emergence of a discipline. *American Behavioral Scientist, 57*(10), 1380–1400.
- Wiggins, G., & McTighe, J. (1998). *Understanding by design*. Association for Supervision and Curriculum Development.


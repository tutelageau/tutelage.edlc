// The ten EDLC stages: the one source for the loop figure, the stage table, the quick check, the gate
// checklist and every stage page. Change a stage here, never in a page that renders it.
//
// Provenance, field by field (`stages.provenance`, at the foot of this file, says the same for the check):
//   name, purpose, artefact, gate, failure   paper §5, the stage table. Names follow ED-13 as amended
//                                            by ED-16. `tooling/check.mjs` compares these with the
//                                            table in `site/paper.md`; each sanctioned difference is
//                                            allowlisted there with its reason.
//   question, happens, ask, check            site guidance. Not in the paper: the site's own reading of
//                                            each stage (`check` is ED-20's quick check). They may
//                                            explain a stage, never add to the model.
// `happens` and `ask` items are inline Markdown, rendered with the `mdInline` filter.
//
// A renamed stage keeps its 0.1.0 name and slug in `formerly`, which drives the redirect page at the
// old URL (`site/redirects.njk`). ED-13's interim names (Assess first, Write) were never published, so
// they get no redirect.

const stages = [
  {
    n: 1,
    slug: "discover",
    name: "Discover",
    question: "Who is this for, and what do they need?",
    purpose: "Establish the need and the learners.",
    artefact: "Needs analysis, learner profiles, delivery constraints",
    gate: "Need and cohort agreed",
    failure: "Building the right course for the wrong learners",
    happens: [
      "Agree the need: the capability gap, who asked for it, and what changes if it is closed.",
      "Profile the likely learners: prior experience, language and literacy, access needs, how and where they will study.",
      "Record the delivery constraints that will bind later stages: duration, modes, locations, staffing, equipment.",
    ],
    ask: [
      "Can we name the cohort this release is for?",
      "Would a different cohort need a different program from the same standard?",
      "Are the delivery constraints written down, or only assumed?",
    ],
    check: "Before designing, do you write down who the learners are and what they need?",
  },
  {
    n: 2,
    slug: "specify",
    name: "Specify",
    question: "What exactly must a learner be able to do?",
    purpose: "Take in or author the learning standard.",
    artefact: "Structured standard",
    gate: "Standard complete and active",
    failure: "Designing against an outdated or misread standard",
    happens: [
      "Take in the current version of the standard, or author it, and record which version you are designing against.",
      "Break it into outcome descriptors: specific, observable expectations that are the smallest unit of traceability.",
    ],
    ask: [
      "Is this the current, active version of the standard?",
      "Could two designers read a descriptor and agree on what evidence would show it?",
      "Is anything in the standard we have not yet represented?",
    ],
    check: "Is each program built against a written standard, broken into what a learner must be able to do?",
  },
  {
    n: 3,
    slug: "map",
    name: "Map",
    formerly: { name: "Architect", slug: "architect" },
    question: "How will every outcome be taught and assessed?",
    purpose: "Plan how every outcome is assessed and delivered.",
    artefact: "Mapping matrix, assessment strategy",
    gate: "Coverage plan approved",
    failure: "Gaps discovered only at audit",
    happens: [
      "Choose the assessment strategy: the methods, the number of tasks, and what each task will evidence.",
      "Fill the mapping matrix so every descriptor has at least one assessment task and one delivery session planned against it.",
    ],
    ask: [
      "Does every descriptor have planned evidence? Does every planned task trace to a descriptor?",
      "Where a program clusters several standards, can each standard's coverage still be read on its own?",
      "Would an auditor find the plan complete today, before anything is built?",
    ],
    check: "Before anything is written, can you show which assessment task and which session covers each outcome?",
  },
  {
    n: 4,
    slug: "outline",
    name: "Outline",
    formerly: { name: "Scaffold", slug: "scaffold" },
    question: "Is the shape of the whole package right?",
    purpose: "Shape all deliverables as headings only.",
    artefact: "Skeletons of every deliverable",
    gate: "Structure approved",
    failure: "Rewriting finished content to fix its order",
    happens: [
      "Draft the skeleton of each deliverable: sections, sequence, where each task and activity sits.",
      "Carry the mapping matrix into the skeletons, so each heading already knows which descriptors it serves.",
      "Review the package as a whole for order, load and duplication.",
    ],
    ask: [
      "Does the sequence build skills in an order a learner can follow?",
      "Is any section serving no descriptor, or any descriptor without a section?",
      "Would changing the order later mean rewriting finished content?",
    ],
    check: "Is the shape of every document reviewed, as headings, before anyone writes the content?",
  },
  {
    n: 5,
    slug: "assessment-first",
    name: "Assessment first",
    formerly: { name: "Test-first", slug: "test-first" },
    question: "What evidence will show the learner can do it?",
    purpose: "Write the assessments and the context they sit in.",
    artefact: "Assessment tasks, marking guides, a simulated workplace or case study",
    gate: "Compliance, pedagogy and subject-matter sign-off",
    failure: "Content that teaches what is never assessed, and the reverse",
    happens: [
      "Write the assessment tasks, instructions and conditions.",
      "Write the marking guides: what a satisfactory response contains, with benchmark answers where they help.",
      "Build the simulated workplace or case study the tasks draw on.",
    ],
    ask: [
      "Does each task produce the evidence the matrix says it will?",
      "Would two assessors mark the same response the same way from the guide?",
      "Is the scenario realistic for the cohort named at Discover?",
      "Have compliance, pedagogy and subject-matter reviewers signed off? (How formal each sign-off is depends on where you work.)",
    ],
    check: "Do you write the assessment tasks and marking guides before the learning content?",
  },
  {
    n: 6,
    slug: "develop",
    name: "Develop",
    formerly: { name: "Build", slug: "build" },
    question: "What does a learner need to succeed at those assessments?",
    purpose: "Develop learning content to the assessments.",
    artefact: "Learning materials and activities",
    gate: "Accuracy and quality review",
    failure: "Inaccurate or unreadable materials",
    happens: [
      "Fill the approved skeletons with the materials, activities, media, practicals and resources.",
      "Keep each content block traced to the task and descriptors it prepares the learner for.",
      "Suit the cohort: reading level, examples and access needs from the Discover profiles.",
    ],
    ask: [
      "Is it accurate and current? Has a subject-matter expert checked it?",
      "Is there content that prepares for nothing assessed, or a task nothing prepares for?",
      "Can the named cohort read and use it, including learners using assistive technology?",
    ],
    check: "Is the learning content developed to the assessments, and reviewed for accuracy?",
  },
  {
    n: 7,
    slug: "plan-delivery",
    name: "Plan delivery",
    formerly: { name: "Orchestrate", slug: "orchestrate" },
    question: "Can this be delivered in the time and modes we have?",
    purpose: "Fit everything into the real timetable.",
    artefact: "Session or module plan",
    gate: "Every outcome has a delivery session",
    failure: "A program that cannot be delivered in the time available",
    happens: [
      "Plan sessions or modules within the real calendar and the delivery modes available.",
      "Place every activity and assessment in a session, and estimate the time each takes.",
      "Trace each session back to the matrix, so the plan shows where every outcome is delivered.",
    ],
    ask: [
      "Does every outcome have a delivery session?",
      "Does the planned time on task fit the hours available, with room for learners who need longer?",
      "Could a trainer new to this program deliver it from the plan?",
    ],
    check: "Does every outcome have a session in the real timetable before release?",
  },
  {
    n: 8,
    slug: "validate-and-release",
    name: "Validate and release",
    question: "Is it fit for use, and which version is going out?",
    purpose: "Confirm fitness for use and fix a version.",
    artefact: "Validation record, release identifier",
    gate: "Released to a named cohort",
    failure: "Unvalidated tools reaching learners",
    happens: [
      "Review the assessment tools and materials before use, with reviewers who did not write them wherever you can.",
      "Record the findings and fix what must be fixed before use.",
      "Give the package a release identifier and record which cohort it is released to.",
    ],
    ask: [
      "Has it been reviewed before use, and did the findings change it?",
      "Can we say, a year from now, exactly which version this cohort received?",
      "Are the known limitations recorded, so they are not rediscovered as complaints?",
    ],
    check: "Is each version reviewed before use, with a record of which cohort received it?",
  },
  {
    n: 9,
    slug: "deliver-and-observe",
    name: "Deliver and observe",
    question: "How is the program performing with real learners?",
    purpose: "Run the program and collect evidence about it.",
    artefact: "Delivery signals, results, feedback, complaints and appeals",
    gate: "Cohort complete",
    failure: "Problems that are felt but never recorded",
    happens: [
      "Deliver the release named at stage 8 to its cohort, and record which version they received.",
      "Collect the delivery signals below, and the context they came from: who taught, in what mode, with what changes.",
      "Log complaints, appeals and assessor disputes against the part of the program they concern.",
      "Hold changes to assessment until the next release, unless they fix a safety, accuracy or compliance defect.",
    ],
    ask: [
      "Is the cohort complete, and do we know which version every learner received?",
      "Was every problem that staff or learners raised written down, against the part of the program it concerns?",
      "Can we tell content issues from delivery issues in what we collected?",
    ],
    check: "During delivery, are the problems staff and learners raise written down against the part of the program they concern?",
  },
  {
    n: 10,
    slug: "improve",
    name: "Improve",
    question: "What did we learn, and where does each change go?",
    purpose: "Review, triage and route changes.",
    artefact: "Improvement log, change requests",
    gate: "Changes accepted into the next release",
    failure: "The same flaw reaching cohort after cohort",
    happens: [
      "Run post-use validation: review assessment practice and results after delivery.",
      "Triage findings from delivery signals, complaints, appeals and validation into an improvement log.",
      "Turn accepted findings into change requests that re-enter the lifecycle. Where each one re-enters is an open question (below).",
      "Review curriculum debt: what has been patched, what has aged, what was kept because it was compliant rather than good.",
      "When the standard itself is revised, follow every affected artefact through the traceability links and route the work back through the gates.",
    ],
    ask: [
      "Which changes go into the next release, and which wait?",
      "Can each change be traced to the evidence that prompted it?",
      "Is curriculum debt shrinking, steady or growing?",
    ],
    check: "After each cohort, are findings triaged into changes that reach the next version?",
  },
];

// Positions on the loop figure: stage 1 at twelve o'clock, clockwise.
const R = 190;
const C = 260;
for (const s of stages) {
  const a = ((s.n - 1) / stages.length) * 2 * Math.PI - Math.PI / 2;
  s.x = Math.round(C + R * Math.cos(a));
  s.y = Math.round(C + R * Math.sin(a));
  s.half = s.n <= 8 ? "build" : "operate";
  s.url = `/stages/${s.slug}/`;
}

// Not enumerable, so it never shows up as an eleventh stage or in a template loop.
Object.defineProperty(stages, "provenance", {
  value: {
    paper: ["name", "purpose", "artefact", "gate", "failure"],
    site: ["question", "happens", "ask", "check"],
  },
});

export default stages;

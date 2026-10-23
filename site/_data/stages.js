// The ten EDLC stages: the one source for the loop figure, the stage table and every stage page.
// Wording follows the public paper (§5); the names follow ED-13, which renamed stages 3 to 7,
// as amended by ED-16 (stage 5 "Assessment first", stage 6 "Develop"). A renamed
// stage keeps its 0.1.0 name and slug in `formerly`, which drives the redirect page at the old URL
// (`site/redirects.njk`) and the "Called … in 0.1.0" line on the stage page. ED-13's interim names
// (Assess first, Write) were never published, so they get no redirect. Change a stage here, never in
// a page that renders it.

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
  },
  {
    n: 2,
    slug: "specify",
    name: "Specify",
    question: "What exactly must a learner be able to do?",
    purpose: "Take in or author the learning standard.",
    artefact: "A structured standard",
    gate: "Standard complete and active",
    failure: "Designing against an outdated or misread standard",
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
  },
  {
    n: 4,
    slug: "outline",
    name: "Outline",
    formerly: { name: "Scaffold", slug: "scaffold" },
    question: "Is the shape of the whole package right?",
    purpose: "Shape every deliverable as headings only.",
    artefact: "Skeletons of every deliverable",
    gate: "Structure approved",
    failure: "Rewriting finished content to fix its order",
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
  },
  {
    n: 6,
    slug: "develop",
    name: "Develop",
    formerly: { name: "Build", slug: "build" },
    question: "What does a learner need to succeed at those assessments?",
    purpose: "Develop the learning content to the assessments.",
    artefact: "Learning materials and activities",
    gate: "Accuracy and quality review",
    failure: "Inaccurate or unreadable materials",
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

export default stages;

# The site's story and shape

Status: **approved 2026-10-23 (ED-20), with its three model additions.** Stages 2 and 3 (Specify, Map) of the story-led redesign
(ED-09). Built on `knowledge/research/2026-10-23.framework-sites.md`; trace-checked by the `analyst` the same day.

Most of this is presentation of what the paper already says. Three parts would **add to the model** and need the
owner's yes before they are built. Each is marked **[model addition]** where it appears:

1. sector pages saying which gates a sector's rules already supply (the paper does this for VET only, §8);
2. the quick check's questions and the reading list it returns;
3. anything about layers of scope (ED-14 settles the layers; what each owns is still to be written).

## The story in one line

**The paper argues that most programs are built once, audited occasionally and improved rarely. The EDLC is a
loop designed so each cohort can get a better version than the last.**

The first sentence is the paper's own claim (§1), said as the paper's. It must not read as a fact about every
sector: a school teacher who rewrites units each term is right to push back.

The site tells the story in this order, and every page sits somewhere in it:

| Beat | The reader's question | Where it lives |
| --- | --- | --- |
| 1 The problem | Is this my problem? | Home, first screen |
| 2 The idea | What is different here? | Home: the loop, the eight principles (paper §4.1) |
| 3 The stages | What do I actually do? | `/lifecycle/` and ten stage pages (the spine) |
| 4 Your setting | Does it fit where I work? | Five sector pages |
| 5 Seeing it done | What does it look like on real material? | Worked examples |
| 6 Starting | What do I do on Monday? | Start here, the quick check, templates |
| 7 Trust | Why should I believe it? | The paper, sources, research agenda, changes |
| 8 Joining in | How do I push back? | Contribute |

## What we borrow, and from whom

The research record names each site and what it showed. Sites used only as design patterns are listed there and
need no source row unless a page cites them.

1. **A numbered spine, rule first** (The Twelve-Factor App). Each stage opens with its one-line question and ends
   with previous and next.
2. **One template for every stage page** (DORA capabilities), rendered from `stages.js`.
3. **The picture is the navigation** (CAST UDL Guidelines). The loop is clickable; its ordered list stays beneath it.
4. **Each stage names the failure it prevents** (SAFe's tiles, which state "the problem it solves"). The paper
   already gives one failure per stage (§5).
5. **A one-minute self-check that stores nothing** (DORA Quick Check). **[model addition]**
6. **Routes in by sector and by role** (ABC Learning Design, Quality Matters).
7. **Scale shown plainly** (Shape Up's "Adjust to your size"), with the five layers once the paper carries them (ED-14).
8. **A short canonical text**: the paper versioned, citable and licensed (Scrum Guide). H-2 decides the licence.
9. **Evidence in the open**: each source with its status (DORA research, CAST).
10. **A worked story** (Shape Up): material taken through all ten stages.

What we avoid: anything behind a login; selling crowding out teaching; navigation deeper than the content; a
picture with no text version; a page with no way on.

## Readers and their routes

The cast (`knowledge/people/people.md`) are the readers. A route is a short path through the spine, never a copy
of it.

| Route | For | Starts at | Then |
| --- | --- | --- | --- |
| "I build courses" | Designers, resource developers, teachers writing units | Start here | Stages 2–6, templates, worked example |
| "I teach and assess" | Trainers, teachers, facilitators | The loop | Stages 9–10, how feedback travels back |
| "I run quality or a faculty" | Quality managers, curriculum leaders, associate deans | Your sector | Gates, versioning, curriculum debt |
| "I lead an organisation" | Provider owners, heads of academies | Home | The paper's case (§8), stages 9–10 |
| "I study this" | Researchers, regulators | The paper | Sources, research agenda |

## Information architecture

Top navigation, five items:

**Start here · The lifecycle · Your sector · Resources · Paper**

- **Start here** (`/start/`): the story in a page, the quick check, the routes above.
- **The lifecycle** (`/lifecycle/`): the loop, the ten stages, gates, principles; practices and guardrails as child
  pages.
- **Your sector** (`/sectors/`): schools, VET, higher education, workplace and soft skills, independent experts.
  Each page says where that sector's standard comes from: set by a body above the provider (schools, VET, higher
  education) or adopted or written by the provider itself (workplace learning, independent experts; paper §5,
  Specify takes in *or authors* the standard). It also lists that sector's words for the EDLC's terms. Which
  gates a sector's rules already supply is **[model addition]**.
- **Resources** (`/resources/`): templates, worked examples, the sources register, the glossary.
- **Paper** (`/paper/`): with version, how to cite, the research agenda, changes.

Footer: Contribute, Changes, Glossary, Where the idea came from, Source.

Sector words live once, in a new `site/_data/sectors.js`, and are rendered on the sector pages and the glossary.

## The stage page template

Every stage page renders, in this order:

| # | Part | Comes from | Field |
| --- | --- | --- | --- |
| 1 | Number, name and **question** | paper §5 | `stages.js` (exists) |
| 2 | Opening: two sentences on what the stage is for | site | page body (as now) |
| 3 | **The failure it prevents** | paper §5 | `stages.js` (exists) |
| 4 | **What happens**, three to five bullets | site guidance | `stages.js`, new field, marked `site` |
| 5 | **What it produces** (the artefact) and **the exit gate** | paper §5 | `stages.js` (exists) |
| 6 | **At the gate, ask**, three or four questions | site guidance | `stages.js`, new field, marked `site` |
| 7 | Previous and next, and back to the loop | — | template |

`stages.js` will mark each field `paper` or `site`, so its header claim ("wording follows the paper") stays true.
The page-shape rule in `docs/content.standards.md` changes to match.

**Not included:** who does each stage in each sector. ED-08 removed per-stage roles because the paper lacks
them. Sector words appear on sector pages, not on every stage.

## The quick check **[model addition]**

Ten questions, one per stage, each a `check` field in `stages.js` drawn from that stage's purpose ("Do you write
the assessment before the content?"). Each is answered yes, partly or not yet; the result lists the stages to read
first. The page says it is **a reading guide, not a measure** of anyone's practice. It runs in the reader's
browser, sends and stores nothing, and without script it is a plain list of questions with links. No new
dependency.

## Look and feel

The marketing skin stays (ED-06): warm paper, deep teal, flat. Modern means structure, not decoration: a larger
home picture, cards that each carry one idea, generous space, an "on this page" list on long pages, previous and
next on every spine page. Phone first, because a trainer reads between classes.

## Releases

| Version | Carries | Needs |
| --- | --- | --- |
| 0.2.0 | Stage names in education's words (ED-13, ED-16); the researcher's source verdicts | Released through the gate, 2026-10-23 |
| 0.3.0 | New navigation, Start here, stage template, clickable loop, previous and next, the quick check, one Your sector page (verified facts only), Resources with a generated gate checklist, licences, the paper's H-4 and H-9 corrections. Drops the "Called … in version 0.1.0" line | Owner's yes (ED-20, ED-27) |
| 0.4.0 | A page per sector, worked examples (ED-15), sector words in more depth | Sources still leads: HESF clause text, the AQF, the 2025 Training Package Organising Framework, NESA's programming rules, the training.gov.au licence |
| 0.5.0 | Scale and layers | The paper carrying the five layers (ED-14) |

## Open for the owner

- Yes, no or changes to this brief, and to each **[model addition]**.
- The paper section on layers (ED-14), in the owner's words.

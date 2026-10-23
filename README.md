# Education Development Lifecycle (EDLC)

The public home of the **Education Development Lifecycle**: a ten-stage, gated, closed-loop model for how
education material is developed, released, delivered and improved. It starts from the learning standard, writes the
assessment before the content, gates every stage with a review, and routes what delivery teaches back into design.

**Site:** <https://edlc.tutelage.au> · **Status:** public draft 0.1.0, open for comment · A Tutelage initiative

## The ten stages

1. **Discover** — who is this for, and what do they need?
2. **Specify** — what exactly must a learner be able to do?
3. **Map** — how will every outcome be taught and assessed?
4. **Outline** — is the shape of the whole package right?
5. **Assessment first** — what evidence will show the learner can do it?
6. **Develop** — what does a learner need to succeed at those assessments?
7. **Plan delivery** — can this be delivered in the time and modes we have?
8. **Validate and release** — is it fit for use, and which version is going out?
9. **Deliver and observe** — how is the program performing with real learners?
10. **Improve** — what did we learn, and where does each change go?

## Comment

Open an [issue](https://github.com/tutelageau/tutelage.edlc/issues) for anything wrong, unclear or missing, or to
share a case from your own sector.

## What is in this repo

| Path | What it is |
| --- | --- |
| `site/` | The public site (Eleventy, Markdown pages) |
| `knowledge/` | The cast of stakeholders and experts who review the work, the sources register, panel and session records |
| `docs/` | How we work: decisions, the content standards, the way of working, how the site publishes |
| `.claude/` | The bench: agents and skills that write, check and release the site |
| `tooling/check.mjs` | The pre-release check (links, anchors, headings, public safety) |

## Run it

```sh
pnpm install
pnpm dev       # http://localhost:8080
pnpm verify    # build + check, as CI runs it
```

Every pull request is built and checked; every push to `main` publishes to GitHub Pages
(`.github/workflows/pages.yml`). See `docs/site.md`.

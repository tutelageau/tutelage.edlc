---
name: page
description: How to plan and write a page on the EDLC site, running stages 1 to 6 of the repo's own lifecycle — name the readers, specify what the page must and must not say traced to the paper, place it, scaffold headings, write the reader questions before the prose, then write to them. Use for any new page or substantive change to what a page says; a typo fix needs only pnpm verify.
---

# Writing a page

The page is a small program and goes through the EDLC's own stages (`docs/way-of-working.md`).

## 1 Discover — who reads it

Name two or three readers from `knowledge/people/stakeholders/`. If none fits, the cast has a gap: say so before
writing.

## 2 Specify — what it must say

A short brief in the commission: the paper sections it explains (`site/paper.md` §n), the decisions that bind it,
what it must not say (beyond the paper; internal; software words outside `/inspiration/`). The `analyst` traces it.

## 3 Architect — where it sits

Its URL, nav or not, the pages that link in and the pages it links to. Nothing is said in two places: if the content
exists, link to it. Stage facts come from `site/_data/stages.js`.

## 4 Scaffold — headings only

Write the page file with frontmatter and headings, nothing else. The lead or `reviewer` reads the shape.

Frontmatter: `layout`, `permalink`, `title`, optional `eyebrow`, `lede`, `description`. A stage page uses
`layout: layouts/stage.njk` and `stage: <n>`, and follows the stage-page shape in `docs/content.standards.md`.

## 5 Test-first — reader questions

Before any prose, the `analyst` writes three to five questions per reader, in their words, including one about what
they fear. These are the page's acceptance: the editor answers each from the page alone, quoting the sentence.

## 6 Build — the prose

Write to the questions. Lead sentence first. Specifics, short sentences, education words. A claim about the world
waits for a `verified` source. Run `pnpm verify`.

Then hand to the `release` skill.

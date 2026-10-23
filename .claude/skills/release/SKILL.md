---
name: release
description: The gate before anything is published to edlc.tutelage.au — stage 8 of the EDLC run on the site itself. Freezes the change, runs pnpm verify, the reviewer, the panel and the source check, bumps the version and writes the changes row, then asks the owner for the go before the lead pushes main. Use whenever work is ready to go public, or the owner says "release", "ship it" or "deploy".
---

# Release

Pushing `main` publishes the site (`.github/workflows/pages.yml`). This skill is the only way that happens.

## The gate, in order

1. **Freeze.** Every intended change committed on a branch; record the sha. `git status` clean.
2. **Verify.** `pnpm verify` passes on the frozen sha. Paste its last line.
3. **Sources.** Every claim about the world on a changed page has a `verified` row in
   `knowledge/sources/sources.md`. If not, the `researcher` verifies it or the claim comes out.
4. **Review.** The `reviewer` on the diff since the last release tag. `does not hold` stops the release.
5. **Panel.** The `panel` skill on every page whose words changed (skip only for a change with no words, such as a
   CSS fix, and say so). The panel's gate must hold.
6. **Version.** Bump `site/_data/release.json` (patch for corrections, minor for new or changed content, major when
   the model's stages or principles change), and add the row to `site/changes.njk`, newest first, in one plain line.
7. **Owner's go.** Put to the owner: the version, what changed in three lines, the panel's verdicts, anything
   declined. Pushing is the owner's call; wait for an explicit yes.

## Publish

On the owner's yes: merge to `main` (or push `main`), then watch the `pages` workflow run. When it is green, open
`https://edlc.tutelage.au`, one changed page and a missing path. Tag the release (`git tag v<version>` and push the
tag). Record the version, the run URL and the checks in the session's close note.

## If the publish fails

Nothing reached readers: Pages keeps the previous version. Read the failing step, fix on a branch, and run the gate
again from step 2.

## First release only

The one-time Pages settings in `docs/site.md` §First deploy must be done by the owner before the first push.

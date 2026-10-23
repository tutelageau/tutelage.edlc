---
name: session
description: Opens and closes a working session on the EDLC repo — reads the contract, the decisions, the last close note and the open memos at open; writes the close note (what changed, ED- rows, open memos, blockers with both cases, retro) at close. Use at the start and end of every session, or when the owner says "open" or "close".
---

# Session

## Open

1. Read `CLAUDE.md`, `docs/decisions.md` and the newest note in `knowledge/sessions/`.
2. `git status`, `git log --oneline -10`, and `pnpm verify` on a clean tree. A failing verify is the first job.
3. List for the owner, in plain words: open `H-` memos, blockers carried from last time, the release version live
   (`site/_data/release.json`) and what is queued for the next one.
4. Name the session's goal in one sentence and the stages of `docs/way-of-working.md` it will run.

## During

- An instruction from the owner in chat is a decision: add the `ED-` row as you act on it.
- Commission agents per `docs/way-of-working.md` §The lead and the commission. At most two writers at once.

## Close

1. `pnpm verify`. If it fails, say so; do not close as if it passed.
2. Fold every agent's `Sheet gap:` into the sheet's "How this sheet grows" log, dated.
3. Write `knowledge/sessions/<yyyy-mm-dd>.md`: goal; what changed (files, pages); decisions (`ED-` ids);
   open memos; blockers with both cases intact; the retro, folded from every `Retro:` line; what is next.
4. Commit by path with a message that names the stage and the decision ids. Push only if the owner asked for a
   release and the `release` skill has held.

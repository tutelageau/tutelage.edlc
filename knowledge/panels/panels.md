# Panel records

One file per panel, named `<yyyy-mm-dd>.<slug>.md`, written by the lead from the `panel` skill. A record holds:
the artefact and the frozen commit read; who sat (sheet names); each reader's verdict line; the findings table
(id · reader · page · finding · severity · disposition); and the lead's triage. At most 120 lines; full answers
go in a sibling `<record>.reads.md`.

Dispositions: `fix-now` (before this release) · `next-release` · `open-question` (to `/research/` or an `H-` memo)
· `declined` (with the reason, and the reader's case kept intact).

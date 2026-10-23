# The site: build and publish

## Layout

| Path | What it is |
| --- | --- |
| `site/_data/stages.js` | The ten stages: the one source for the loop figure, the stage table, every stage page, the quick check and the gate checklist. Each field is marked `paper` (§5) or `site` (guidance); `happens` and `ask` are inline Markdown |
| `site/_data/site.json` | Title, URL, repository links, the five-item main navigation (`also` lists the URLs where an item is also current) and the footer links |
| `site/_data/release.json` | The version and status shown in the footer (ED-07) |
| `site/_includes/layouts/base.njk` | Page chrome: masthead, navigation, footer with the version and licence line (ED-21) |
| `site/_includes/layouts/page.njk` | An article. `toc: true` in front matter adds "On this page" from the page's h2s |
| `site/_includes/layouts/stage.njk` | A stage page: name and question, the failure it prevents, the opening, What happens, purpose, artefact and gate, At the gate, ask, the page's further sections, previous and next. The body splits at its `<!-- stage-data -->` marker |
| `site/_includes/partials/loop.njk` | The loop figure, drawn as SVG from `stages.js`; each node links to its stage. The ordered list beneath is its text |
| `site/_includes/partials/quick-check.njk` | The quick check (ED-20): one question per stage, an inline script that lists stages to read first. Sends and stores nothing |
| `site/assets/site.css` | The marketing skin, light and dark (ED-06), and print rules |
| `site/*.md`, `site/*.njk` | Pages. `site/stages/*.md` are the stage pages; `start.md`, `sectors.md` and `resources.md` are the 0.3.0 entry pages |
| `site/resources/gate-checklist.njk` | The printable gate checklist, generated from `stages.js` only |
| `site/redirects.njk` | A page at each retired stage URL, from `formerly` in `stages.js` |
| `site/CNAME` | `edlc.tutelage.au`, copied into the build |
| `tooling/check.mjs` | The pre-release check over `_site/`, including the canon check against the paper's §5 table (its allowlist of sanctioned differences lives there) |
| `eleventy.config.mjs` | Build config: heading ids, table wrapping, and the filters (`stageByNumber`, `stageBody`, `mdInline`, `navCurrent`, `toc`) |
| `LICENSE`, `LICENSE-content.md` | Code MIT; text and the paper CC BY 4.0 (ED-21) |

## Local

```sh
pnpm install
pnpm dev       # http://localhost:8080, reloads on save
pnpm verify    # build + check, exactly what CI runs
```

## CI and publishing

`.github/workflows/pages.yml` runs on every pull request (build + check) and on every push to `main` (build +
check + publish to Pages). A failing check stops the publish.

## First deploy: one-time settings (owner)

These live in GitHub, not in the repo, so they are done once by hand:

1. **Settings → Pages → Build and deployment → Source: GitHub Actions.**
2. **Settings → Pages → Custom domain: `edlc.tutelage.au`**, save, wait for the DNS check to pass, then tick
   **Enforce HTTPS** (the certificate can take up to an hour on first issue).
3. Recommended: **verify `tutelage.au` for the organisation** (Organisation settings → Pages → Add a domain) so
   no other account can claim a subdomain of it.
4. DNS (already done by the owner): `edlc.tutelage.au CNAME tutelageau.github.io.`
5. Push `main` (or run the workflow by hand from the Actions tab). The `deploy` job prints the URL.

With an Actions deploy, GitHub takes the custom domain from the settings above, not from the `CNAME` file. The
file is still shipped so the two agree, and the check fails if it drifts.

## After a deploy

Open `https://edlc.tutelage.au`, a stage page, `/paper/` and a missing path (expect the site's own 404). Record
the version and the run URL in the session's close note.

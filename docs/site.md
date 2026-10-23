# The site: build and publish

## Layout

| Path | What it is |
| --- | --- |
| `site/_data/stages.js` | The ten stages: the one source for the loop figure, the stage table and every stage page |
| `site/_data/site.json` | Title, URL, navigation, repository links |
| `site/_data/release.json` | The version and status shown in the footer (ED-07) |
| `site/_includes/layouts/` | `base.njk` (page chrome), `page.njk` (an article), `stage.njk` (a stage page) |
| `site/_includes/partials/loop.njk` | The loop figure, drawn as SVG from `stages.js` |
| `site/assets/site.css` | The marketing skin, light and dark (ED-06) |
| `site/*.md`, `site/*.njk` | Pages. `site/stages/*.md` are the stage pages |
| `site/CNAME` | `edlc.tutelage.au`, copied into the build |
| `tooling/check.mjs` | The pre-release check over `_site/` |
| `eleventy.config.mjs` | Build config: heading ids, table wrapping, the stage filter |

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

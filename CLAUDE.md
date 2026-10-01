# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Project

Static one-page website for the Romanian Orthodox parish of Baden, Switzerland (services held in the Catholic church in Turgi). Astro 7, static output, four languages: `ro` at `/`, `de`, `en`, `fr` at `/<lang>/`. No client framework; one small inline script updates the service schedule in the browser. Deployed to GitHub Pages by `.github/workflows/deploy.yml`.

The owner communicates in Romanian; reply in Romanian unless asked otherwise.

## Commands

```bash
npm ci                         # install (Node 24, see .nvmrc)
npm run dev                    # dev server on http://127.0.0.1:4321
npm run check                  # astro check — must report 0 errors
npm run build                  # regenerates icons, then builds to dist/
npm run preview -- --port 4321 # serve dist/
```

`LOCAL_PREVIEW=true` at build time shows the community photo and MOREOM crest even when not approved, and adds `noindex`. Never set it in the deploy workflow.

npm 11 may warn that `esbuild`'s postinstall is not covered by `allowScripts`. This is harmless: the platform binary comes from esbuild's optional dependencies and the build works without the script.

## Where things live

- `src/data/parish.ts` — contact data, Google Maps embed, `schedule` (month, year, entries), publication-approval flags. The module validates times, chronological order and that Sunday entries fall on Sundays; the build fails otherwise.
- `src/data/copy.ts` + `src/data/types.ts` — every user-visible string in all four languages. Any new key must be added to the `Copy` interface and to all four languages.
- `src/layouts/ParishPage.astro` — the page and the schedule/scroll script.
- `src/styles/site.css` — palette variables at the top (modelled on basilicasanpietro.va: white/light-grey bands, gold `#bca461`, deep gold `#7d6a30` for text links, charcoal `#212529`, footer `#1f1f21`). Keep WCAG AA contrast; `#bca461` is for fills and decoration, not text on white.
- `src/lib/crest.ts` — MOREOM crest, natural colours, inlined as a data URL at build time so the source file is never emitted when the crest is not approved.
- `public/image-sources.txt` — image provenance. Update it when images change.

## Content rules

- Schedule data must come from the parish (its Sway page: https://sway.cloud.microsoft/X37U2Yn8EICzXBw4) or the owner. Do not invent services or times.
- "Sunday after Pentecost" numbers must match the parish source or the BOR calendar (https://doxologia.ro/calendar-ortodox/YYYYMM). They are not consecutive in autumn (Lucan jump).
- The parish source gives no house number for Weichlenstrasse, 5300 Turgi. Do not invent one.
- `photoPublicationApproved` and `metropolisCrestPublicationApproved` may only be set to `true` after the owner explicitly confirms permission. The photo shows identifiable people, including children.
- Do not change DNS for bisericabaden.ch or set a custom domain without explicit approval; that domain currently serves the parish's Sway page.

## First deployment checklist

Work through these in order and confirm each with the owner before acting on GitHub:

1. Ask for the GitHub account and repository name (suggested: `biserica-baden`). On a free GitHub plan Pages requires a **public** repository.
2. Ask which name/email to use for commits and set them for this repository only (`git config user.name` / `git config user.email`). Do not assume a work email.
3. Ask whether permission exists to publish the community photo and the MOREOM crest; set the two flags in `src/data/parish.ts` accordingly.
4. Verify locally: `npm ci && npm run check && npm run build`.
5. `git init -b main`, `git add -A`, check `git status` (no `node_modules/`, `dist/`, `.astro/`, `.env`), commit.
6. Create the repository and push. With GitHub CLI: `gh auth status`, then `gh repo create <name> --public --source . --remote origin --push`. Without it, have the owner create an empty repository on github.com, then `git remote add origin https://github.com/<owner>/<name>.git` and `git push -u origin main`.
7. Enable Pages with GitHub Actions as the source: `gh api -X POST repos/<owner>/<name>/pages -f build_type=workflow` (use `-X PUT` if Pages already exists), or **Settings → Pages → Source: GitHub Actions**.
8. Run or re-run the workflow (`gh workflow run deploy.yml`, then `gh run watch`). A first run that started before Pages was enabled can fail at `configure-pages`; re-run it.
9. Open `https://<owner>.github.io/<name>/` and its `/de/`, `/en/`, `/fr/` pages. Check icons load (base path), the schedule shows the next service first, the map loads and there is no horizontal scrolling on a phone-sized viewport.

## Routine monthly update

1. Get the new month from the owner or the Sway page.
2. Replace `schedule.month`, `schedule.year` and `schedule.entries` in `src/data/parish.ts`.
3. `npm run check && npm run build`, preview, then commit and push to `main`; the workflow publishes.

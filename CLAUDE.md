# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Project

Static one-page website for the Romanian Orthodox parish of Baden, Switzerland (services held in the Catholic church in Turgi). Astro 7, static output, four languages: `ro` at `/`, `de`, `en`, `fr` at `/<lang>/`. No client framework; one small inline script updates the service schedule in the browser. Deployed to https://bisericabaden.ch by Cloudflare Workers Builds (Worker `biserica-baden`, static assets only, config in `wrangler.jsonc`), which builds every push to `main` of github.com/biserica-baden/biserica-baden. DNS for bisericabaden.ch is on Cloudflare (registrar Hostpoint).

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
- Do not change DNS for bisericabaden.ch or the Worker's custom domains without explicit approval.
- Keep `wrangler.jsonc` as a pure static-assets config. Without it, `wrangler deploy` runs `astro add cloudflare`, which breaks the build (`No such module "chunks/sharp"`). Its `name` must match the Worker name in Cloudflare.

## Deployment

- Cloudflare Workers Builds: build command `npm run build`, deploy command `npx wrangler deploy`. It sets `WORKERS_CI`, so `astro.config.mjs` uses `https://bisericabaden.ch` as `site` (canonical URLs, hreflang).
- Custom domains `bisericabaden.ch` and `www.bisericabaden.ch` are attached to the Worker under **Domains**; Cloudflare manages their DNS records and certificates.
- Commits use the repository-local identity `biserica-baden` with the GitHub noreply address. Push with the GitHub CLI account `biserica-baden` (`gh auth status`; another account may also be logged in on this machine).
- After a push, check the build in Cloudflare (**Workers & Pages → biserica-baden → Deployments**), then open https://bisericabaden.ch/ and `/de/`, `/en/`, `/fr/`.

## Routine monthly update

1. Get the new month from the owner or the Sway page.
2. Replace `schedule.month`, `schedule.year` and `schedule.entries` in `src/data/parish.ts`.
3. `npm run check && npm run build`, preview, then commit and push to `main`; the workflow publishes.

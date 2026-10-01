# Biserica Ortodoxă Română Baden — site static

Site static, o singură pagină în patru limbi (RO, DE, EN, FR), construit cu [Astro](https://astro.build/) și publicat pe https://bisericabaden.ch prin Cloudflare Workers.

- `/` — română · `/de/` — germană · `/en/` — engleză · `/fr/` — franceză
- Secțiuni: fotografie, numele parohiei, hramurile, Mitropolia, **Programul Slujbelor**, **Adresa** (cu harta Google), **Contact** (footer).

## Unde se află fiecare lucru

| Fișier | Conținut |
|---|---|
| `src/data/parish.ts` | telefon, rețele sociale, harta, **programul slujbelor**, aprobările pentru fotografie/stemă |
| `src/data/copy.ts` | toate textele, în cele 4 limbi |
| `src/layouts/ParishPage.astro` | structura paginii și scriptul care actualizează programul |
| `src/styles/site.css` | stilul; paleta de culori e la începutul fișierului |
| `src/lib/crest.ts` | pregătirea stemei MOREOM |
| `public/image-sources.txt` | proveniența și licențele imaginilor |
| `wrangler.jsonc` | configurarea publicării pe Cloudflare (doar fișiere statice) |

## Rulare locală

Cerințe: **Node.js 24** (vezi `.nvmrc`; minimum 22.12) și npm.

```bash
npm ci
npm run dev          # http://127.0.0.1:4321 — se reîncarcă la fiecare modificare
```

Previzualizare identică cu varianta publicată:

```bash
npm run check
npm run build
npm run preview -- --port 4321
```

Pentru a vedea local fotografia și stema înainte de aprobarea publicării, setați `LOCAL_PREVIEW=true` înainte de `npm run build`:

- PowerShell: `$env:LOCAL_PREVIEW = 'true'`
- macOS/Linux: `LOCAL_PREVIEW=true npm run build`

## Actualizarea programului lunar

În `src/data/parish.ts`, obiectul `schedule`:

```ts
month: 11,
year: 2026,
entries: [
  {
    date: '2026-11-01',
    occasion: { type: 'sundayAfterPentecost', number: 24 },
    services: [
      { kind: 'matins', time: '08:30' },
      { kind: 'liturgy', time: '10:30' },
    ],
  },
  // changedTime: true afișează eticheta „Oră diferită”
],
```

- Orele sunt în ora Elveției (`HH:MM`); trecerea la ora de vară/iarnă este calculată automat.
- Numărul duminicii după Rusalii se ia din programul parohiei sau din calendarul BOR (de ex. `https://doxologia.ro/calendar-ortodox/202611`). Numerotarea **nu** este consecutivă toamna, din cauza saltului lucan.
- Tipuri de slujbe: `vespersLitia`, `matins`, `liturgy`. Pentru o sărbătoare nouă, adăugați cheia în `FeastKey` (`src/data/types.ts`) și traducerile în `feasts` (`src/data/copy.ts`).
- Build-ul oprește publicarea dacă o oră este invalidă, ordinea nu este cronologică sau o „duminică” nu cade duminica.

În browser, un script ascunde slujbele încheiate (ultima slujbă + 150 de minute) și pune următoarea slujbă prima. După ultima slujbă din listă apare mesajul „Programul pentru perioada următoare va fi publicat în curând”. Pentru test: `http://127.0.0.1:4321/?now=2026-10-12T09:00`.

## Fotografia și stema

În `src/data/parish.ts`:

```ts
photoPublicationApproved: false,
metropolisCrestPublicationApproved: false,
```

Cât timp valorile sunt `false`, site-ul publicat **nu** afișează fotografia comunității (pe care apar persoane identificabile, inclusiv copii) și nici stema MOREOM. Setați-le pe `true` doar după ce parohia confirmă că pot fi publicate. Imaginea Sfântului Atanasie este în domeniul public.

## Publicare

Codul stă în repository-ul GitHub `biserica-baden/biserica-baden`. Cloudflare (Workers & Pages → **biserica-baden**) este legat de el: la fiecare `push` pe `main` construiește site-ul (`npm run build`) și îl publică (`npx wrangler deploy`). Progresul se vede la **Deployments**.

- Domeniile `bisericabaden.ch` și `www.bisericabaden.ch` sunt legate de worker la **Domains**. Cloudflare administrează DNS-ul și certificatul HTTPS.
- Domeniul este înregistrat la Hostpoint, cu nameserverele Cloudflare.
- `wrangler.jsonc` trebuie păstrat: fără el, Cloudflare încearcă să transforme proiectul într-o aplicație pe server și build-ul eșuează.

## Confidențialitate

Site-ul nu folosește cookie-uri proprii sau analytics. Harta este încorporată din Google Maps, care poate prelucra date ale vizitatorilor (de exemplu adresa IP).

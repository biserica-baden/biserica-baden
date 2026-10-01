# Biserica Ortodoxă Română Baden — site static

Site static, o singură pagină în patru limbi (RO, DE, EN, FR), construit cu [Astro](https://astro.build/) și publicat pe GitHub Pages.

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
| `.github/workflows/deploy.yml` | publicarea automată pe GitHub Pages |

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

## Publicare pe GitHub Pages

1. Creați un repository pe GitHub și urcați proiectul pe ramura `main`. Pe un cont GitHub gratuit, Pages funcționează doar cu un repository **public**.
2. **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Fiecare `push` pe `main` publică automat site-ul (tab-ul **Actions** arată progresul).
4. Adresa: `https://<utilizator>.github.io/<repository>/`.

### Domeniu propriu (opțional)

Domeniul `bisericabaden.ch` afișează acum pagina Sway. Pentru a-l muta pe acest site, schimbați DNS-ul abia când site-ul nou este gata:

1. **Settings → Pages → Custom domain**: `bisericabaden.ch`, apoi bifați **Enforce HTTPS** după validare.
2. La furnizorul domeniului: înregistrări `A` pentru `bisericabaden.ch` către `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` și `CNAME` pentru `www` către `<utilizator>.github.io`.

Workflow-ul preia automat adresa și calea din setările Pages; nu trebuie modificat codul.

## Confidențialitate

Site-ul nu folosește cookie-uri proprii sau analytics. Harta este încorporată din Google Maps, care poate prelucra date ale vizitatorilor (de exemplu adresa IP).

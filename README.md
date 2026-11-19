# nviasrt

Ovi’s site: Next.js 16 (App Router) with Payload CMS 3, hosted on Vercel.

- **Live:** https://nviasrt.vercel.app
- **CMS:** https://nviasrt.vercel.app/admin
- **Vercel project:** `nviasrt` in the PRMNT STD team
- **Database:** Neon Postgres (Vercel Marketplace, `DATABASE_URL`)
- **Media:** Vercel Blob store `nviasrt-media` (`BLOB_READ_WRITE_TOKEN`)

## Run it locally

```bash
npm install
npx vercel env pull .env.local   # DATABASE_URL, BLOB_READ_WRITE_TOKEN, PAYLOAD_SECRET
npm run dev
```

Local development uses the same Neon database and Blob store as production, so edits made locally are live content.

## Where things live

| Path | What |
| --- | --- |
| `app/(frontend)` | The public site |
| `app/(payload)` | Payload admin and API (generated, don’t edit) |
| `payload.config.ts`, `cms/` | CMS config, collections, globals, revalidation hooks |
| `lib/data.ts` | Loads all content from Payload in one cached query (tag `cms`) and shapes it for components |
| `lib/actions.ts` | Newsletter and contact form server actions (save to Inbox › Subscribers / Messages) |
| `migrations/` | Database migrations |
| `scripts/seed.ts` | One-off import of the prototype content and photos |

## In the CMS

- **Chronicles**: posts (with drafts) and their categories
- **Guides**: guides (with drafts), including comparison table, checklist and FAQ
- **Shop My Picks**: picks (products) and shop collections; drag to reorder
- **Settings › Home page**: hero moments and the featured shop collection
- **Inbox**: newsletter sign-ups and contact messages

Publishing anything clears the site cache, so changes show up on the next page load.

## Changing the content model

1. Edit a collection in `cms/`.
2. `npm run payload migrate:create <name>` and commit the new file in `migrations/`.
3. `npm run generate:types`.
4. Deploy. Vercel runs `npm run ci`, which applies migrations before building.

## Deploy

```bash
npx vercel deploy --prod
```

## Still placeholder

About, Work With Me, Contact and the legal pages are still written in code. Newsletter sign-ups are stored in the CMS but not sent to an email tool yet. The Indonesian `/id/` version, analytics and Ovi’s own photos are still to come.

/**
 * One-off: loads the prototype content (scripts/seed-data/content.ts) and photos (public/photos) into Payload.
 * Run with `npm run seed`. Refuses to run twice unless you pass --force (which wipes content collections first).
 */
import nextEnv from '@next/env';
import path from 'path';

nextEnv.loadEnvConfig(process.cwd());

const ALT: Record<string, string> = {
  hero: 'Ovi looking out over the sea at dawn in Amed',
  travel: 'Rice terraces and palms in the Sidemen valley',
  slow: 'Morning light over a linen bed',
  linen: 'Washed linen sheets, unironed',
  cup: 'A handmade clay coffee cup',
  candle: 'An unscented soy candle burning',
  dress: 'A loose linen day dress',
  ocean: 'Clear blue sea from the shore',
  portrait: 'Portrait of Ovi',
};

const FOCAL: Record<string, { focalX: number; focalY: number }> = { hero: { focalX: 60, focalY: 40 }, travel: { focalX: 50, focalY: 55 } };

const lexical = (paras: string[]) => ({
  root: {
    type: 'root', format: '' as const, indent: 0, version: 1, direction: 'ltr' as const,
    children: paras.map(text => ({
      type: 'paragraph', format: '', indent: 0, version: 1, direction: 'ltr', textFormat: 0, textStyle: '',
      children: [{ type: 'text', text, format: 0, style: '', mode: 'normal', detail: 0, version: 1 }],
    })),
  },
});
const date = (d: string) => new Date(`${d} 12:00 UTC`).toISOString();

async function main() {
  const { getPayload } = await import('payload');
  const { default: config } = await import('../payload.config');
  const data = await import('./seed-data/content');
  const payload = await getPayload({ config });

  const existing = await payload.count({ collection: 'posts' });
  if (existing.totalDocs && !process.argv.includes('--force')) {
    console.log('Content already exists. Run with --force to wipe and reseed.');
    process.exit(0);
  }
  for (const collection of ['posts', 'guides', 'products', 'shop-collections', 'categories', 'media'] as const) {
    await payload.delete({ collection, where: { id: { exists: true } } });
  }

  console.log('Uploading photos…');
  const media: Record<string, number> = {};
  for (const name of Object.keys(ALT)) {
    const doc = await payload.create({ collection: 'media', data: { alt: ALT[name], ...(FOCAL[name] ?? {}) }, filePath: path.resolve('public/photos', `${name}.jpg`) });
    media[`/photos/${name}.jpg`] = doc.id;
  }
  const img = (src: string) => media[src];

  console.log('Categories and collections…');
  const cats: Record<string, number> = {};
  for (const c of data.categories) {
    cats[c.slug] = (await payload.create({ collection: 'categories', data: { name: c.name, slug: c.slug, tint: c.tint, blurb: c.blurb, intro: c.intro.join('\n\n') } })).id;
  }
  const cols: Record<string, number> = {};
  for (const c of data.collections) {
    cols[c.slug] = (await payload.create({ collection: 'shop-collections', data: { name: c.name, slug: c.slug, tint: c.tint, blurb: c.blurb, image: img(c.image) } })).id;
  }

  console.log('Picks…');
  const prods: Record<string, number> = {};
  for (const p of data.products) {
    prods[p.slug] = (await payload.create({ collection: 'products', data: {
      name: p.name, slug: p.slug, note: p.note, image: img(p.image), store: p.store, url: p.url, collections: p.collections.map(c => cols[c]),
    } })).id;
  }
  const ids = (slugs?: string[]) => (slugs ?? []).map(s => prods[s]).filter(Boolean);

  const sections = (list: typeof data.posts[number]['sections']) => list.map(s => ({
    heading: s.heading, body: lexical(s.paras),
    image: s.image ? img(s.image.src) : undefined, imageCaption: s.image?.caption,
    products: ids(s.products), topPick: s.topPick ? prods[s.topPick] : undefined,
  }));

  console.log('Chronicles…');
  const posts: Record<string, number> = {};
  for (const p of data.posts) {
    posts[p.slug] = (await payload.create({ collection: 'posts', draft: false, data: {
      _status: 'published', title: p.title, slug: p.slug, category: cats[p.category], publishedAt: date(p.date),
      updated: p.updated ? date(p.updated) : undefined, readMin: p.readMin, image: img(p.image), caption: p.caption,
      excerpt: p.excerpt, takeaways: (p.takeaways ?? []).map(text => ({ text })), sections: sections(p.sections),
    } })).id;
  }

  console.log('Guides…');
  for (const g of data.guides) {
    await payload.create({ collection: 'guides', draft: false, data: {
      _status: 'published', title: g.title, slug: g.slug, type: g.type, featured: !!g.featured, lastUpdated: date(g.updated),
      readMin: g.readMin, image: img(g.image), caption: g.caption, excerpt: g.excerpt,
      takeaways: g.takeaways.map(text => ({ text })), sections: sections(g.sections),
      topPick: g.topPick ? prods[g.topPick] : undefined, products: ids(g.products),
      comparisonColumns: g.comparison?.cols.join(' | '), comparisonRows: g.comparison?.rows.map(r => ({ cells: r.join(' | ') })),
      checklist: g.checklist?.map(item => ({ item })), faq: g.faq?.map(f => ({ question: f.q, answer: f.a })),
    } });
  }

  console.log('Home page…');
  await payload.updateGlobal({ slug: 'home', data: {
    featuredCollection: cols['soft-living-home'],
    moments: [
      { image: img('/photos/hero.jpg'), place: 'Amed, 6 am', post: posts['a-week-by-the-sea-in-amed'] },
      { image: img('/photos/travel.jpg'), place: 'Sidemen, Bali', post: posts['three-slow-days-in-sidemen'] },
      { image: img('/photos/slow.jpg'), place: 'Home, a slow Sunday', post: posts['a-bedroom-that-lets-the-morning-in'] },
    ],
  } });

  console.log('Done.');
  process.exit(0);
}

main().catch(err => { console.error(err); process.exit(1); });

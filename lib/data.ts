// Site content, read from Payload CMS and shaped for the components.
// Everything is loaded in one cached query; any CMS change clears the 'cms' tag (see cms/revalidate.ts).
import 'server-only';
import config from '@payload-config';
import { unstable_cache } from 'next/cache';
import { getPayload } from 'payload';
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';
import type * as P from '@/payload-types';
import { slugify } from '@/cms/fields';

export type Tint = 'sand' | 'clay' | 'ocean' | 'cream' | 'paper';

export type Category = { slug: string; name: string; tint: Tint; blurb: string; intro: string[] };
export type Collection = { slug: string; name: string; tint: Tint; image: string; blurb: string; count: number };
export type Product = { slug: string; name: string; note: string; image: string; store: string; url: string; collections: string[] };
export type Section = { id: string; heading: string; body?: SerializedEditorState; image?: { src: string; caption: string }; products?: Product[]; topPick?: Product };
export type Post = {
  slug: string; title: string; category: string; categoryName: string; date: string; updated?: string; readMin: number;
  image: string; caption: string; excerpt: string; takeaways?: string[]; sections: Section[];
};
export type Guide = {
  slug: string; title: string; type: 'Packing list' | 'Round-up' | 'How-to'; updated: string; readMin: number;
  image: string; caption: string; excerpt: string; takeaways: string[]; topPick?: Product; products?: Product[];
  comparison?: { cols: string[]; rows: string[][] }; checklist?: string[]; faq?: { q: string; a: string }[];
  sections: Section[]; featured?: boolean;
};
export type Moment = { src: string; alt: string; place: string; href: string; pos: string };
export type Content = {
  categories: Category[]; collections: Collection[]; products: Product[]; posts: Post[]; guides: Guide[];
  home: { moments: Moment[]; featured?: Collection };
};

const FALLBACK_IMAGE = '/photos/hero.jpg';
const isObj = <T,>(v: number | T | null | undefined): v is T => !!v && typeof v === 'object';
const media = (m: number | P.Media | null | undefined) => (isObj(m) && m.url ? m.url : FALLBACK_IMAGE);
const alt = (m: number | P.Media | null | undefined) => (isObj(m) ? m.alt : '');
const fmt = (d?: string | null) => (d ? new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Asia/Makassar' }) : '');
const cells = (s?: string | null) => (s ?? '').split('|').map(x => x.trim());

async function load(): Promise<Content> {
  const payload = await getPayload({ config });
  const q = { limit: 1000, depth: 2, pagination: false, overrideAccess: false } as const;
  const published = { _status: { equals: 'published' } } as const;
  const [cats, cols, prods, posts, guides, home] = await Promise.all([
    payload.find({ ...q, collection: 'categories', sort: '_order' }),
    payload.find({ ...q, collection: 'shop-collections', sort: '_order' }),
    payload.find({ ...q, collection: 'products', sort: '_order' }),
    payload.find({ ...q, collection: 'posts', where: published, sort: '-publishedAt' }),
    payload.find({ ...q, collection: 'guides', where: published, sort: '-lastUpdated' }),
    payload.findGlobal({ slug: 'home', depth: 2, overrideAccess: false }),
  ]);

  const product = (p: P.Product): Product => ({
    slug: p.slug, name: p.name, note: p.note, image: media(p.image), store: p.store, url: p.url,
    collections: (p.collections ?? []).filter(isObj).map(c => c.slug),
  });
  const products = prods.docs.map(product);
  const productList = (list?: (number | P.Product)[] | null) => (list ?? []).filter(isObj).map(product);
  const one = (p?: number | P.Product | null) => (isObj(p) ? product(p) : undefined);

  const sections = (list: P.Post['sections']): Section[] => (list ?? []).map(s => ({
    id: slugify(s.heading), heading: s.heading, body: (s.body as SerializedEditorState | null) ?? undefined,
    image: s.image ? { src: media(s.image), caption: s.imageCaption || alt(s.image) } : undefined,
    products: s.products?.length ? productList(s.products) : undefined, topPick: one(s.topPick),
  }));

  const categories: Category[] = cats.docs.map(c => ({
    slug: c.slug, name: c.name, tint: c.tint as Tint, blurb: c.blurb,
    intro: (c.intro ?? '').split(/\n\s*\n/).map(x => x.trim()).filter(Boolean),
  }));
  const collections: Collection[] = cols.docs.map(c => ({
    slug: c.slug, name: c.name, tint: c.tint as Tint, image: media(c.image), blurb: c.blurb,
    count: products.filter(p => p.collections.includes(c.slug)).length,
  }));

  return {
    categories, collections, products,
    posts: posts.docs.map(p => {
      const cat = isObj(p.category) ? p.category : undefined;
      return {
        slug: p.slug, title: p.title, category: cat?.slug ?? '', categoryName: cat?.name ?? '', date: fmt(p.publishedAt),
        updated: p.updated ? fmt(p.updated) : undefined, readMin: p.readMin, image: media(p.image), caption: p.caption,
        excerpt: p.excerpt, takeaways: p.takeaways?.length ? p.takeaways.map(t => t.text) : undefined, sections: sections(p.sections),
      };
    }),
    guides: guides.docs.map(g => ({
      slug: g.slug, title: g.title, type: g.type, updated: fmt(g.lastUpdated), readMin: g.readMin, featured: !!g.featured,
      image: media(g.image), caption: g.caption, excerpt: g.excerpt, takeaways: (g.takeaways ?? []).map(t => t.text),
      topPick: one(g.topPick), products: g.products?.length ? productList(g.products) : undefined,
      comparison: g.comparisonColumns && g.comparisonRows?.length ? { cols: cells(g.comparisonColumns), rows: g.comparisonRows.map(r => cells(r.cells)) } : undefined,
      checklist: g.checklist?.length ? g.checklist.map(c => c.item) : undefined,
      faq: g.faq?.length ? g.faq.map(f => ({ q: f.question, a: f.answer })) : undefined,
      sections: sections(g.sections),
    })),
    home: {
      moments: (home.moments ?? []).map(m => ({
        src: media(m.image), alt: alt(m.image), place: m.place,
        pos: isObj(m.image) ? `${m.image.focalX ?? 50}% ${m.image.focalY ?? 50}%` : '50% 50%',
        href: isObj(m.post) && m.post._status === 'published' ? `/chronicles/${m.post.slug}` : '/chronicles',
      })),
      featured: collections.find(c => isObj(home.featuredCollection) && c.slug === home.featuredCollection.slug) ?? collections[0],
    },
  };
}

export const getContent = unstable_cache(load, ['cms-content'], { tags: ['cms'] });


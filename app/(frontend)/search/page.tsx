import { getContent } from '@/lib/data';
import { JournalRow, ProductCard, SearchForm } from '@/components/ui';

export const metadata = { title: 'Search' };

export default async function Search(props: { searchParams: Promise<{ q?: string }> }) {
  const searchParams = await props.searchParams;
  const { posts, guides, products } = await getContent();
  const q = (searchParams.q ?? '').trim().toLowerCase();
  const hit = (s: string) => s.toLowerCase().includes(q);
  const ps = q ? posts.filter(p => hit(p.title) || hit(p.excerpt)) : [];
  const gs = q ? guides.filter(g => hit(g.title) || hit(g.excerpt)) : [];
  const pr = q ? products.filter(p => hit(p.name) || hit(p.note)) : [];
  const rows = [...ps.map(p => ({ href: `/chronicles/${p.slug}`, image: p.image, title: p.title, category: p.categoryName, date: p.date })),
    ...gs.map(g => ({ href: `/guides/${g.slug}`, image: g.image, title: g.title, category: `Guides · ${g.type}`, date: `Updated ${g.updated}` }))];
  const total = rows.length + pr.length;
  return (
    <>
      <section className="wrap" style={{ paddingBlock: '72px 32px', display: 'grid', gap: 20 }}>
        <p className="label taupe">Search</p>
        <SearchForm defaultValue={searchParams.q ?? ''} />
        {q && <p className="body-m taupe">{total} result{total === 1 ? '' : 's'} for “{searchParams.q}”</p>}
        {!q && <p className="body-m taupe">Try “linen”, “Bali” or “packing”.</p>}
      </section>
      {rows.length > 0 && <section className="wrap" style={{ paddingBottom: 96 }}>{rows.map((r, n) => <JournalRow key={r.href} no={String(n + 1).padStart(2, '0')} {...r} />)}</section>}
      {pr.length > 0 && <section className="section--m tint-cream"><div className="wrap">
        <h2 className="h2" style={{ marginBottom: 40 }}>Picks matching “{searchParams.q}”</h2>
        <div className="grid grid--4">{pr.map((p, n) => <ProductCard key={p.slug} product={p} index={n % 4} onPaper />)}</div>
      </div></section>}
      {q && total === 0 && <section className="wrap" style={{ paddingBottom: 160 }}><p className="h3">Nothing yet for that. Try a simpler word.</p></section>}
    </>
  );
}

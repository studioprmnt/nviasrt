import Link from 'next/link';
import { getContent, type Collection } from '@/lib/data';
import { CollectionTile, ProductCard } from './ui';
import { Newsletter } from './client';
import Split from './Split';

export default async function ShopPage({ active }: { active?: Collection }) {
  const { collections, products } = await getContent();
  const list = active ? products.filter(p => p.collections.includes(active.slug)) : products;
  return (
    <>
      <section className="wrap center" style={{ paddingBlock: '72px 48px' }}>
        <p className="label taupe">Shop My Picks</p>
        <Split as="h1" className="display-l" load style={{ margin: '16px 0' }}>{active ? active.name : 'Things I actually use'}</Split>
        <p className="body-l taupe" style={{ maxWidth: 620, marginInline: 'auto' }}>{active ? active.blurb : 'Pieces from my home, my suitcase and my wardrobe, picked slowly. Every link goes to Shopee.'}</p>
      </section>
      {!active && (
        <div className="wrap"><div className="scroll-x tiles-row">
          {collections.map((c, n) => <div key={c.slug} className="tile-cell"><CollectionTile c={c} index={n} /></div>)}
        </div></div>
      )}
      <div className="wrap" style={{ paddingTop: active ? 0 : 72 }}>
        <div className="filter-bar">
          <nav className="chips scroll-x" aria-label="Collections">
            <Link href="/shop" className="chip" aria-current={!active ? 'page' : undefined}>All</Link>
            {collections.map(c => <Link key={c.slug} href={`/shop/${c.slug}`} className="chip" aria-current={active?.slug === c.slug ? 'page' : undefined}>{c.name}</Link>)}
          </nav>
          <span className="body-m taupe sort">Sort: Newest</span>
        </div>
      </div>
      <section className="wrap" style={{ paddingBlock: '48px 64px' }}>
        <div className="grid grid--4">{list.map((p, n) => <ProductCard key={p.slug} product={p} index={n % 4} />)}</div>
        <p className="body-m taupe center" style={{ marginTop: 64 }}>Prices change often on Shopee, so I leave them off. Every link is an affiliate link.</p>
      </section>
      {active && (
        <section className="section--m rule-top"><div className="wrap">
          <h2 className="h2" style={{ marginBottom: 40 }}>More collections</h2>
          <div className="scroll-x tiles-row">{collections.filter(c => c.slug !== active.slug).map((c, n) => <div key={c.slug} className="tile-cell"><CollectionTile c={c} index={n} /></div>)}</div>
        </div></section>
      )}
      <Newsletter />
    </>
  );
}

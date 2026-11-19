import Image from 'next/image';
import Link from 'next/link';
import { getContent } from '@/lib/data';
import { GuideCard, Pagination, SearchForm } from '@/components/ui';
import { Newsletter } from '@/components/client';
import Split from '@/components/Split';

export const metadata = { title: 'Guides' };

export default async function Guides() {
  const { guides } = await getContent();
  const featured = guides.find(g => g.featured) ?? guides[0];
  const rest = guides.filter(g => g !== featured);
  return (
    <>
      <section className="wrap center" style={{ paddingBlock: '72px 40px', display: 'grid', justifyItems: 'center', gap: 20 }}>
        <p className="label taupe">Guides</p>
        <Split as="h1" className="display-l" load>Practical, tested, kept up to date</Split>
        <p className="body-l taupe">Packing lists, round-ups and how-tos. I update them when something changes.</p>
        <SearchForm placeholder="Search guides" />
      </section>
      <div className="wrap" style={{ paddingBottom: 56 }}>
        <nav className="chips scroll-x" style={{ justifyContent: 'center' }} aria-label="Guide types">
          {['All', 'Packing lists', 'Round-ups', 'How-tos', 'Bali', 'Work from anywhere'].map((l, n) => <span key={l} className={`chip${n === 0 ? ' is-active' : ''}`}>{l}</span>)}
        </nav>
      </div>
      {featured && <section className="wrap">
        <Link href={`/guides/${featured.slug}`} className="two-col two-col--even hover-zoom featured-guide" style={{ alignItems: 'center' }} data-reveal data-cursor="Read">
          <div className="media ratio-32"><Image src={featured.image} alt="" fill sizes="(min-width:1024px) 760px, 100vw" priority /></div>
          <div className="stack" style={{ '--gap': '16px' } as React.CSSProperties}>
            <p className="label sage">Featured  ·  Updated {featured.updated}</p>
            <h2 className="h2">{featured.title}</h2>
            <p className="body-l taupe">{featured.excerpt}</p>
            <span className="link link-arrow">Read the guide</span>
          </div>
        </Link>
      </section>}
      <section className="section--m"><div className="wrap">
        <h2 className="h2" style={{ marginBottom: 48 }} data-reveal>All guides</h2>
        <div className="grid grid--3">{rest.map((g, n) => <GuideCard key={g.slug} guide={g} index={n % 3} />)}</div>
        <div style={{ marginTop: 80 }}><Pagination /></div>
      </div></section>
      <Newsletter />
    </>
  );
}

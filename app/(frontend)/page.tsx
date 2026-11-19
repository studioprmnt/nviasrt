import { staticMetadata } from '@/lib/seo';
import Image from 'next/image';
import Link from 'next/link';
import { getContent } from '@/lib/data';
import { PostCard, ProductCard, SectionHead } from '@/components/ui';
import { Newsletter, Signature } from '@/components/client';
import Split from '@/components/Split';
import HeroMoments from '@/components/HeroMoments';

export const generateMetadata = () => staticMetadata('home');

export default async function Home() {
  const { posts, products, home } = await getContent();
  const latest = posts.slice(0, 3);
  const featured = home.featured;
  const picks = featured ? products.filter(p => p.collections.includes(featured.slug)).slice(0, 4) : [];
  return (
    <>
      <HeroMoments moments={home.moments} />

      <section className="section">
        <div className="wrap">
          <SectionHead label="Chronicles" title="Latest stories" link={{ href: '/chronicles', text: 'All Chronicles' }} />
          <div className="grid grid--3">{latest.map((p, n) => <PostCard key={p.slug} post={p} index={n} />)}</div>
        </div>
      </section>

      {featured && <section className="section--m tint-sand">
        <div className="wrap">
          <SectionHead label="Shop My Picks" title={featured.name} link={{ href: `/shop/${featured.slug}`, text: 'See the collection' }} />
          <div className="grid grid--4 home-picks">{picks.map((p, n) => <ProductCard key={p.slug} product={p} index={n} onPaper />)}</div>
        </div>
      </section>}

      <section className="section">
        <div className="wrap about-strip">
          <div data-reveal><div className="media ratio-45"><Image src="/photos/portrait.jpg" alt="Portrait of Ovi" fill sizes="(min-width:1024px) 520px, 100vw" /></div></div>
          <div className="stack about-strip-text" style={{ '--gap': '24px' } as React.CSSProperties} data-reveal>
            <Signature size={52} color="var(--sage)" draw={false} />
            <Split className="h2">I write about slowing down, wherever I am.</Split>
            <p className="body-l taupe">SEO specialist by day, slow-living notes the rest of the time. Travel, the sea, a softer home and the few things I actually use.</p>
            <Link href="/about" className="link link-arrow">More about me</Link>
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  );
}

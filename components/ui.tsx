import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties, ReactNode } from 'react';
import Split from './Split';
import type { Post, Guide, Product, Collection } from '@/lib/data';
import { postMeta, guideMeta } from '@/lib/site';

const i = (n: number) => ({ '--i': n } as CSSProperties);

export function PostCard({ post, index = 0, priority = false }: { post: Post; index?: number; priority?: boolean }) {
  return (
    <Link href={`/chronicles/${post.slug}`} className="card post-card" data-reveal data-cursor="Read" style={i(index)}>
      <div className="media ratio-45">
        <Image src={post.image} alt="" fill sizes="(min-width:1024px) 384px, (min-width:768px) 50vw, 100vw" priority={priority} />
      </div>
      <p className="label meta">{postMeta(post)}</p>
      <div className="title-wrap"><h3 className="h3">{post.title}</h3></div>
      <p className="date">{post.date}</p>
    </Link>
  );
}

export function GuideCard({ guide, index = 0 }: { guide: Guide; index?: number }) {
  return (
    <Link href={`/guides/${guide.slug}`} className="card post-card" data-reveal data-cursor="Read" style={i(index)}>
      <div className="media ratio-45"><Image src={guide.image} alt="" fill sizes="(min-width:1024px) 384px, 100vw" /></div>
      <p className="label meta">{guideMeta(guide)}</p>
      <div className="title-wrap"><h3 className="h3">{guide.title}</h3></div>
      <p className="date">Updated {guide.updated}</p>
    </Link>
  );
}

export function ProductCard({ product, index = 0, onPaper = false }: { product: Product; index?: number; onPaper?: boolean }) {
  return (
    <article className={`card product-card hover-zoom${onPaper ? ' on-paper' : ''}`} data-reveal style={i(index)}>
      <a href={`/go/${product.slug}`} target="_blank" rel="sponsored nofollow noopener" aria-label={`${product.name} on ${product.store}`} tabIndex={-1} data-cursor="Shop">
        <div className="tile"><div className="media ratio-45"><Image src={product.image} alt={product.name} fill sizes="(min-width:1024px) 264px, 45vw" /></div></div>
      </a>
      <p className="label store">{product.store}</p>
      <h3 className="h4">{product.name}</h3>
      <p className="body-m note">{product.note}</p>
      <div className="spacer" />
      <a className="btn" href={`/go/${product.slug}`} target="_blank" rel="sponsored nofollow noopener">Shop now</a>
    </article>
  );
}

export function ProductRow({ items }: { items: Product[] }) {
  return <div className="product-row">{items.map((p, n) => <ProductCard key={p.slug} product={p} index={n} />)}</div>;
}

export function CollectionTile({ c, index = 0 }: { c: Collection; index?: number }) {
  return (
    <Link href={`/shop/${c.slug}`} className={`collection-tile hover-zoom tint-${c.tint}`} data-reveal data-cursor="View" style={i(index)}>
      <div className="media ratio-45"><Image src={c.image} alt="" fill sizes="(min-width:1024px) 248px, 60vw" /></div>
      <h3 className="h3">{c.name}</h3>
      <p className="label count">{c.count} picks</p>
    </Link>
  );
}

export function TopPick({ product: p }: { product: Product }) {
  return (
    <aside className="top-pick hover-zoom" data-reveal>
      <div className="media ratio-45"><Image src={p.image} alt={p.name} fill sizes="220px" /></div>
      <div className="stack">
        <p className="label sage">Top pick</p>
        <h3 className="h3">{p.name}</h3>
        <p className="body-m taupe">{p.note} If you change one thing, change this.</p>
        <p className="label taupe">{p.store}</p>
        <a className="btn" href={`/go/${p.slug}`} target="_blank" rel="sponsored nofollow noopener">Shop now</a>
      </div>
    </aside>
  );
}

export function Takeaways({ items }: { items: string[] }) {
  return (
    <section className="takeaways" aria-label="Key takeaways">
      <p className="label sage">Key takeaways</p>
      <ul>{items.map(t => <li key={t}>{t}</li>)}</ul>
    </section>
  );
}

export function AuthorBox() {
  return (
    <section className="author" data-reveal>
      <div className="avatar"><Image src="/photos/portrait.jpg" alt="Ovi" fill sizes="72px" style={{ objectFit: 'cover' }} /></div>
      <div className="stack" style={{ '--gap': '8px' } as CSSProperties}>
        <p className="label taupe">Written by</p>
        <p className="h4">Ovi (Noviasari Triani)</p>
        <p className="body-m taupe">SEO specialist and slow-living writer, usually somewhere near the sea. I only recommend what I use.</p>
        <Link href="/about" className="link">More about me</Link>
      </div>
    </section>
  );
}

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="faq">
      {items.map((f, n) => (
        <details key={f.q} open={n === 0}>
          <summary>{f.q}<span className="pm" aria-hidden>+</span></summary>
          <p className="body-m">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export function JournalRow({ no, href, image, title, category, date }: { no: string; href: string; image: string; title: string; category: string; date: string }) {
  return (
    <Link href={href} className="journal-row hover-zoom" data-reveal data-cursor-image={image}>
      <span className="no">{no}</span>
      <div className="title"><span className="label mcat">{category}</span><h3 className="h3">{title}</h3></div>
      <span className="label taupe cat">{category}</span>
      <span className="body-m taupe date">{date}</span>
    </Link>
  );
}

export function SectionHead({ label, title, link }: { label: string; title: string; link?: { href: string; text: string } }) {
  return (
    <div className="section-head">
      <div><p className="label taupe">{label}</p><Split className="h2">{title}</Split></div>
      {link && <Link href={link.href} className="link link-arrow">{link.text}</Link>}
    </div>
  );
}

export function Pagination({ base = '#' }: { base?: string }) {
  return (
    <nav className="pagination" aria-label="Pagination">
      <span>← Newer</span>
      <span aria-current="page">1</span><a href={base}>2</a><a href={base}>3</a><span>…</span><a href={base}>8</a>
      <a href={base} style={{ color: 'var(--ink)' }}>Older →</a>
    </nav>
  );
}

export function SearchForm({ defaultValue = '', placeholder = 'Search stories and picks' }: { defaultValue?: string; placeholder?: string }) {
  return (
    <form action="/search" className="line-input" role="search">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden><circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" /><path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
      <label className="visually-hidden" htmlFor="q">Search</label>
      <input id="q" name="q" defaultValue={defaultValue} placeholder={placeholder} />
    </form>
  );
}

export function Disclosure({ kind = 'post' }: { kind?: string }) {
  return <p className="disclosure">This {kind} contains affiliate links. If you buy through them I may earn a small commission, at no cost to you. <Link href="/affiliate-disclosure">Read the disclosure.</Link></p>;
}

export function Band({ tint, children, className = '' }: { tint: string; children: ReactNode; className?: string }) {
  return <section className={`tint-${tint} ${className}`}>{children}</section>;
}

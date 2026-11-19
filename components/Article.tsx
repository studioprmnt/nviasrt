import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import type { Product, Section } from '@/lib/data';
import RichText from './RichText';
import { Disclosure, ProductRow, TopPick, Takeaways, AuthorBox } from './ui';
import { Toc, ShopThisPost } from './client';
import Split from './Split';

type Props = {
  crumbs: { href: string; label: string }[]; title: string; meta: string;
  image: string; caption: string; takeaways?: string[]; sections: Section[];
  affiliate: Product[]; kind: 'post' | 'guide'; extra?: ReactNode; extraToc?: { id: string; heading: string }[];
};

export default function Article({ crumbs, title, meta, image, caption, takeaways, sections, affiliate, kind, extra, extraToc = [] }: Props) {
  const toc = [...sections.map(s => ({ id: s.id, heading: s.heading })), ...extraToc];
  return (
    <article data-article>
      <header className="wrap article-head">
        <nav aria-label="Breadcrumb" className="label taupe">
          {crumbs.map((c, n) => <span key={c.href}>{n > 0 && '  /  '}<Link href={c.href} className="link-plain">{c.label}</Link></span>)}
        </nav>
        <Split as="h1" className="display-l" load>{title}</Split>
        <p className="body-m taupe">{meta}</p>
      </header>

      <figure className="wrap" style={{ margin: 0 }}>
        <div className="media ratio-32 hero-frame" style={{ height: 'auto' }}>
          <Image src={image} alt={caption} fill priority sizes="(min-width:1024px) 1280px, 100vw" />
        </div>
        <figcaption className="caption">{caption}</figcaption>
      </figure>

      <div className="wrap article-body">
        <Toc items={toc} />
        <div className="prose">
          {affiliate.length > 0 && <Disclosure kind={kind} />}
          <details className="toc-drawer">
            <summary><span className="label">Contents</span><span className="body-m taupe">{toc.length} sections +</span></summary>
            <ol>{toc.map(t => <li key={t.id}><a href={`#${t.id}`}>{t.heading}</a></li>)}</ol>
          </details>
          {takeaways && <Takeaways items={takeaways} />}
          {sections.map(s => (
            <section key={s.id} className="prose" style={{ marginTop: 40 }}>
              <h2 id={s.id} className="h2">{s.heading}</h2>
              {s.body && <RichText data={s.body} />}
              {s.image && (
                <figure style={{ margin: 0 }} data-reveal>
                  <div className="media ratio-32"><Image src={s.image.src} alt={s.image.caption} fill sizes="(min-width:1024px) 700px, 100vw" /></div>
                  <figcaption className="caption">{s.image.caption}</figcaption>
                </figure>
              )}
              {s.products && <ProductRow items={s.products} />}
              {s.topPick && <TopPick product={s.topPick} />}
            </section>
          ))}
          {extra}
          <div style={{ marginTop: 56 }}><AuthorBox /></div>
        </div>
      </div>
      {affiliate.length > 0 && <ShopThisPost items={affiliate} />}
    </article>
  );
}

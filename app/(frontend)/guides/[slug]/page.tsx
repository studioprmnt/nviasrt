import { notFound } from 'next/navigation';
import { getContent } from '@/lib/data';
import { seoMetadata } from '@/lib/seo';
import { GuideCard, Faq } from '@/components/ui';
import { Newsletter } from '@/components/client';
import Article from '@/components/Article';

type Props = { params: Promise<{ slug: string }> };
export async function generateStaticParams() { return (await getContent()).guides.map(g => ({ slug: g.slug })); }
export async function generateMetadata({ params }: Props) {
  const { slug } = await params; const g = (await getContent()).guides.find(x => x.slug === slug);
  if (!g) return { title: 'Guide' };
  return seoMetadata(g.seo, { title: g.title, description: g.excerpt, image: g.image, path: `/guides/${g.slug}`, article: { modifiedTime: g.modifiedAt, section: 'Guides' } });
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const { guides } = await getContent();
  const g = guides.find(x => x.slug === slug); if (!g) notFound();
  const sections = [...g.sections];
  if (g.topPick || g.products) sections.push({ id: 'top-picks', heading: 'Top picks', topPick: g.topPick, products: g.products });
  const extraToc: { id: string; heading: string }[] = [];
  if (g.comparison) extraToc.push({ id: 'comparison', heading: 'Comparison' });
  if (g.checklist) extraToc.push({ id: 'checklist', heading: 'The full checklist' });
  if (g.faq) extraToc.push({ id: 'faq', heading: 'FAQ' });
  const extra = (
    <>
      {g.comparison && (<section style={{ marginTop: 40 }}><h2 id="comparison" className="h2" style={{ marginBottom: 24 }}>Comparison</h2>
        <div className="table-wrap" data-reveal><table className="compare"><thead><tr>{g.comparison.cols.map(c => <th key={c}>{c}</th>)}</tr></thead>
          <tbody>{g.comparison.rows.map(r => <tr key={r[0]}>{r.map((c, n) => <td key={n}>{c}</td>)}</tr>)}</tbody></table></div>
        <p className="caption mobile-only">Swipe to see more →</p></section>)}
      {g.checklist && (<section style={{ marginTop: 40 }}><h2 id="checklist" className="h2" style={{ marginBottom: 16 }}>The full checklist</h2>
        <ul className="checklist">{g.checklist.map(c => <li key={c} className="body-l"><label><input type="checkbox" /> {c}</label></li>)}</ul></section>)}
      {g.faq && (<section style={{ marginTop: 40 }}><h2 id="faq" className="h2" style={{ marginBottom: 8 }}>FAQ</h2><Faq items={g.faq} /></section>)}
    </>
  );
  const affiliate = [...(g.topPick ? [g.topPick] : []), ...(g.products ?? [])];
  return (
    <>
      <Article kind="guide" crumbs={[{ href: '/guides', label: 'Guides' }, { href: '/guides', label: g.type + 's' }]} title={g.title}
        meta={`By Ovi  ·  Updated ${g.updated}  ·  ${g.readMin} min read`} image={g.image} caption={g.caption} takeaways={g.takeaways}
        sections={sections} affiliate={affiliate} extra={extra} extraToc={extraToc} />
      <section className="section--m rule-top"><div className="wrap">
        <h2 className="h2" style={{ marginBottom: 48 }}>More guides</h2>
        <div className="grid grid--3">{guides.filter(x => x.slug !== g.slug).slice(0, 3).map((x, n) => <GuideCard key={x.slug} guide={x} index={n} />)}</div>
      </div></section>
      <Newsletter />
    </>
  );
}

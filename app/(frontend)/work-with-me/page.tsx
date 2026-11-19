import Link from 'next/link';
import { JournalRow } from '@/components/ui';
import { ContactForm } from '@/components/client';
import Split from '@/components/Split';

export const metadata = { title: 'Work With Me' };

const offers = [
  { tint: 'cream', label: '01  ·  Consulting', title: 'SEO & GEO', desc: 'For brands and small businesses that want to be found on Google and quoted by AI search, without chasing every trend.', items: ['Technical SEO and site-structure audits', 'Content strategy for Google and AI search', 'Schema, internal links and page speed', 'Monthly reporting in plain language'], cta: 'Book a call' },
  { tint: 'sand', label: '02  ·  Collaborations', title: 'Brand content', desc: 'For travel, home and slow-fashion brands whose products I would actually use.', items: ['Instagram and Pinterest content', 'Long-form Chronicles features', 'Natural-light product photography', 'Affiliate partnerships'], cta: 'Request the media kit' },
];

export default function Work() {
  return (
    <>
      <section className="wrap center" style={{ paddingBlock: '72px 56px', display: 'grid', justifyItems: 'center', gap: 20 }}>
        <p className="label taupe">Work With Me</p>
        <Split as="h1" className="display-l" load>Slow content, easy to find</Split>
        <p className="body-l taupe" style={{ maxWidth: 640 }}>I help brands get found on Google and in AI search, and I create calm, honest content for brands that fit.</p>
      </section>
      <section className="wrap"><div className="grid two-col--even offers">
        {offers.map((o, i) => (
          <div key={o.title} className={`offer tint-${o.tint}`} data-reveal style={{ '--i': i } as React.CSSProperties}>
            <p className="label taupe">{o.label}</p><h2 className="h2">{o.title}</h2><p className="body-l taupe">{o.desc}</p>
            <ul>{o.items.map(x => <li key={x}>{x}</li>)}</ul>
            <a href="#contact" className="btn">{o.cta}</a>
          </div>))}
      </div></section>
      <section className="section--m"><div className="wrap">
        <p className="label taupe" data-reveal>Case studies</p><Split className="h2" style={{ marginTop: 8, marginBottom: 40 }}>Selected work</Split>
        <JournalRow no="01" href="#" image="/photos/travel.jpg" title="Doubled organic traffic for a Bali villa group in six months" category="SEO & GEO" date="2026" />
        <JournalRow no="02" href="#" image="/photos/slow.jpg" title="A slow-living content series for a linen homeware brand" category="Brand content" date="2026" />
        <JournalRow no="03" href="#" image="/photos/cup.jpg" title="Getting a small ceramics studio cited in AI answers" category="SEO & GEO" date="2025" />
      </div></section>
      <section className="tint-clay"><div className="wrap media-kit">
        <div><h2 className="h3">Media kit 2026</h2><p className="body-m" style={{ marginTop: 8 }}>Audience, rates and past collaborations. PDF, 2 MB.</p></div>
        <a className="btn" href="#" download>Download media kit</a>
      </div></section>
      <section className="section" id="contact"><div className="wrap two-col">
        <div className="stack" style={{ '--gap': '16px' } as React.CSSProperties}><p className="label taupe">Get in touch</p><h2 className="h2">Tell me about your project</h2><p className="body-l taupe">I reply within two working days. Prefer email? <Link className="link" href="/contact">Write to me</Link>.</p></div>
        <ContactForm project />
      </div></section>
    </>
  );
}

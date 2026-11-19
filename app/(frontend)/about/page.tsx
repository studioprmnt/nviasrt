import { staticMetadata } from '@/lib/seo';
import Image from 'next/image';
import Link from 'next/link';
import { Signature } from '@/components/client';
import Split from '@/components/Split';

export const generateMetadata = () => staticMetadata('about');

export default function About() {
  return (
    <>
      <section className="tint-cream center" style={{ paddingBlock: 'clamp(96px, 14vw, 180px)' }}>
        <div className="wrap" style={{ display: 'grid', justifyItems: 'center', gap: 12 }}>
          <h1 className="visually-hidden">About Ovi</h1>
          <Signature size={120} />
          <p className="label taupe">Noviasari Triani</p>
          <p className="caption" style={{ fontSize: 26, marginTop: 0 }}>Slow living, travel and honest notes from Indonesia.</p>
        </div>
      </section>
      <section className="wrap" style={{ paddingTop: 96 }}>
        <div className="mosaic">
          <div className="m-main" data-reveal><div className="media ratio-45"><Image src="/photos/portrait.jpg" alt="Portrait of Ovi" fill sizes="(min-width:1024px) 520px, 100vw" /></div></div>
          <div className="m-a" data-reveal style={{ '--i': 1 } as React.CSSProperties}><div className="media ratio-45"><Image src="/photos/travel.jpg" alt="" fill sizes="(min-width:1024px) 300px, 50vw" /></div></div>
          <div className="m-b" data-reveal style={{ '--i': 2 } as React.CSSProperties}><div className="media ratio-45"><Image src="/photos/ocean.jpg" alt="" fill sizes="(min-width:1024px) 360px, 50vw" /></div></div>
        </div>
      </section>
      <section className="section"><div className="wrap two-col">
        <div data-reveal><p className="label taupe">My story</p><Split className="h2" style={{ marginTop: 16 }}>I started writing when I stopped rushing.</Split></div>
        <div className="stack" style={{ '--gap': '24px' } as React.CSSProperties} data-reveal>
          <p className="body-l">I grew up in Indonesia and spent my twenties moving fast: deadlines, flights, too many tabs open. Somewhere between a burnout and a long stay by the sea, I learned to slow down.</p>
          <p className="body-l">This site is where I keep what I learned. Stories from places worth staying longer, the few things I actually use at home and on the road, and notes on living a little softer.</p>
          <p className="body-l">By day I work as an SEO and GEO specialist, helping brands get found on Google and in AI search. The rest of the time I am probably swimming, reading or rearranging a shelf.</p>
        </div>
      </div></section>
      <section className="section--m tint-sand"><div className="wrap">
        <p className="label taupe" data-reveal>What I believe</p><Split className="h2" style={{ marginTop: 8, marginBottom: 56 }}>Three things I come back to</Split>
        <div className="grid grid--3">
          {[['01', 'Fewer, better things', 'I would rather own one linen shirt I love than five I tolerate. Everything I recommend, I use.'], ['02', 'Slow travel', 'Stay longer, see less, remember more. Three nights in one valley beats a day trip to five.'], ['03', 'Honest recommendations', 'Affiliate links help keep this site going, but they never decide what I write.']].map(([n, t, d], i) => (
            <div key={n} className="stack" style={{ '--gap': '12px', '--i': i } as React.CSSProperties} data-reveal>
              <p className="caption sage" style={{ fontSize: 40, marginTop: 0 }}>{n}</p><h3 className="h3">{t}</h3><p className="body-m taupe">{d}</p>
            </div>))}
        </div>
      </div></section>
      <section className="section"><div className="wrap">
        <Split className="h2" style={{ marginBottom: 48 }}>What you’ll find here</Split>
        <div className="grid grid--3">
          {[['Journal', 'Chronicles', 'Stories about slow mornings, the sea and places worth staying longer.', '/chronicles', 'Read Chronicles'], ['Shop', 'Shop My Picks', 'The few things I actually use, linked to Shopee.', '/shop', 'See my picks'], ['Work', 'Work With Me', 'SEO & GEO consulting, and content for brands that fit.', '/work-with-me', 'Work with me']].map(([l, t, d, h, c], i) => (
            <div key={t} className="rule-top path" style={{ '--i': i } as React.CSSProperties} data-reveal>
              <p className="label taupe">{l}</p><h3 className="h3">{t}</h3><p className="body-m taupe">{d}</p><Link href={h} className="link link-arrow">{c}</Link>
            </div>))}
        </div>
        <div className="center" style={{ marginTop: 120 }} data-reveal>
          <p className="label taupe">Brands I’ve worked with</p>
          <div className="logos">{Array.from({ length: 5 }).map((_, n) => <div key={n} className="logo-box label">Logo</div>)}</div>
        </div>
      </div></section>
      <section className="section--m tint-cream center"><div className="wrap" style={{ display: 'grid', justifyItems: 'center', gap: 20 }}>
        <h2 className="h2">Say hello</h2><p className="body-l taupe">I read every message, usually with coffee.</p>
        <div className="chips" style={{ justifyContent: 'center', gap: 32 }}><a className="link" href="https://instagram.com/nviasrt">Instagram @nviasrt</a><a className="link" href="#">Pinterest</a><a className="link" href="#">Threads</a><a className="link" href="#">LinkedIn</a></div>
        <Link href="/work-with-me" className="btn">Work with me</Link>
      </div></section>
    </>
  );
}

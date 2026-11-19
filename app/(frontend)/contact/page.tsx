import { staticMetadata } from '@/lib/seo';
import Link from 'next/link';
import { ContactForm } from '@/components/client';
import Split from '@/components/Split';

export const generateMetadata = () => staticMetadata('contact');

export default function Contact() {
  return (
    <section className="section--m"><div className="wrap two-col">
      <div className="stack" style={{ '--gap': '20px' } as React.CSSProperties}>
        <p className="label taupe">Contact</p><Split as="h1" className="display-l" load>Say hello</Split>
        <p className="body-l taupe">Questions about a story, a product or just a hello. I read everything, usually with coffee, and reply within a few days.</p>
        <dl className="details">
          {[['Email', 'hello@nviasrt.com'], ['Instagram', '@nviasrt'], ['Based in', 'Bali, Indonesia']].map(([k, v]) => <div key={k}><dt className="label taupe">{k}</dt><dd className="body-m">{v}</dd></div>)}
        </dl>
        <Link href="/work-with-me" className="link link-arrow">Brand or SEO project? See Work With Me</Link>
      </div>
      <ContactForm />
    </div></section>
  );
}

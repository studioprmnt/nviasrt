'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Category } from '@/lib/data';
import { TintBand } from './client';
import Split from './Split';

/** Masthead, category tabs and the tinted intro band. Lives in the Chronicles layout so the
 *  band colour cross-fades when you switch categories (the Delassus idea, done with colour). */
export default function ChroniclesChrome({ categories }: { categories: Category[] }) {
  const path = usePathname() || '/chronicles';
  const seg = path.split('/')[2];
  const cat = seg ? categories.find(c => c.slug === seg) : undefined;
  if (seg && !cat) return null; // a single post: no chrome

  return (
    <>
      <div className="wrap" style={{ paddingBlock: '56px 32px', textAlign: 'center' }}>
        <p className="label taupe">Chronicles</p>
        <Split as="h1" className="display-l" load style={{ marginTop: 16 }}>Stories, slowly told</Split>
      </div>
      <div className="wrap" style={{ paddingBottom: 40 }}>
        <nav className="chips scroll-x" aria-label="Categories" style={{ justifyContent: 'center' }}>
          <Link href="/chronicles" className="chip" aria-current={!cat ? 'page' : undefined}>All</Link>
          {categories.map(c => <Link key={c.slug} href={`/chronicles/${c.slug}`} className="chip" aria-current={cat?.slug === c.slug ? 'page' : undefined}>{c.name}</Link>)}
        </nav>
      </div>
      <TintBand tint={cat?.tint ?? 'cream'} k={cat?.slug ?? 'all'}>
        <div className="wrap two-col" style={{ paddingBlock: 56 }}>
          <div><p className="label taupe">{cat ? 'Category' : 'All stories'}</p><h2 className="h2" style={{ marginTop: 8 }}>{cat?.name ?? 'Everything'}</h2></div>
          <div className="stack">{(cat?.intro ?? ['Slow living, travel, the sea and short notes. Newest first.']).map(p => <p key={p} className="body-l">{p}</p>)}</div>
        </div>
      </TintBand>
    </>
  );
}

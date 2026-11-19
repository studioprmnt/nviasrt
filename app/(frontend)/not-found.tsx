import Link from 'next/link';
import { getContent } from '@/lib/data';
import { PostCard, SearchForm } from '@/components/ui';
import Split from '@/components/Split';

export default async function NotFound() {
  const { posts } = await getContent();
  return (
    <>
      <section className="tint-cream center" style={{ paddingBlock: 'clamp(80px, 12vw, 160px)' }}>
        <div className="wrap" style={{ display: 'grid', justifyItems: 'center', gap: 20 }}>
          <p className="label taupe">404</p>
          <Split as="h1" className="display-xl" load>Lost, but not in a hurry</Split>
          <p className="body-l taupe">This page has moved or never existed. Try a search, or start from home.</p>
          <SearchForm />
          <Link href="/" className="link link-arrow">Back to home</Link>
        </div>
      </section>
      <section className="section--m"><div className="wrap">
        <h2 className="h2" style={{ marginBottom: 48 }}>Popular stories</h2>
        <div className="grid grid--3">{posts.slice(0, 3).map((p, n) => <PostCard key={p.slug} post={p} index={n} />)}</div>
      </div></section>
    </>
  );
}

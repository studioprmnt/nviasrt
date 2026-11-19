import { staticMetadata } from '@/lib/seo';
import { getContent } from '@/lib/data';
import { PostCard, Pagination } from '@/components/ui';
import { Newsletter } from '@/components/client';

export const generateMetadata = () => staticMetadata('chronicles');

export default async function Chronicles() {
  const { posts } = await getContent();
  return (
    <>
      <section className="section--m"><div className="wrap">
        <div className="grid grid--3">{posts.slice(0, 9).map((p, n) => <PostCard key={p.slug} post={p} index={n % 3} />)}</div>
        <div style={{ marginTop: 80 }}><Pagination /></div>
      </div></section>
      <Newsletter />
    </>
  );
}

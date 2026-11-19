import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getContent } from '@/lib/data';
import { seoMetadata } from '@/lib/seo';
import { PostCard, Pagination } from '@/components/ui';
import { Newsletter } from '@/components/client';
import Article from '@/components/Article';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const { categories, posts } = await getContent();
  return [...categories.map(c => ({ slug: c.slug })), ...posts.map(p => ({ slug: p.slug }))];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params; const { categories, posts } = await getContent();
  const cat = categories.find(c => c.slug === slug); const post = posts.find(p => p.slug === slug);
  if (cat) return seoMetadata(cat.seo, { title: cat.name, description: cat.intro[0] ?? cat.blurb, path: `/chronicles/${cat.slug}` });
  if (post) return seoMetadata(post.seo, {
    title: post.title, description: post.excerpt, image: post.image, path: `/chronicles/${post.slug}`,
    article: { publishedTime: post.publishedAt, modifiedTime: post.modifiedAt, section: post.categoryName },
  });
  return { title: 'Chronicles' };
}

export default async function ChronicleSlug({ params }: Props) {
  const { slug } = await params;
  const { categories, posts } = await getContent();
  const cat = categories.find(c => c.slug === slug);
  if (cat) {
    const list = posts.filter(p => p.category === cat.slug);
    return (
      <>
        <section className="section--m"><div className="wrap">
          <div className="grid grid--3">{list.map((p, n) => <PostCard key={p.slug} post={p} index={n % 3} />)}</div>
          {list.length === 0 && <p className="body-l taupe center">New stories coming soon.</p>}
          {list.length > 6 && <div style={{ marginTop: 80 }}><Pagination /></div>}
        </div></section>
        <Newsletter />
      </>
    );
  }

  const post = posts.find(p => p.slug === slug);
  if (!post) notFound();
  const affiliate = post.sections.flatMap(s => [...(s.products ?? []), ...(s.topPick ? [s.topPick] : [])]);
  const related = posts.filter(p => p.slug !== post.slug && p.category === post.category).slice(0, 3);
  const more = related.length >= 3 ? related : [...related, ...posts.filter(p => p.slug !== post.slug && !related.includes(p))].slice(0, 3);

  return (
    <>
      <Article kind="post" crumbs={[{ href: '/chronicles', label: 'Chronicles' }, { href: `/chronicles/${post.category}`, label: post.categoryName }]}
        title={post.title} meta={`By Ovi  ·  ${post.date}${post.updated ? `  ·  Updated ${post.updated}` : ''}  ·  ${post.readMin} min read`}
        image={post.image} caption={post.caption} takeaways={post.takeaways} sections={post.sections} affiliate={affiliate} />
      <section className="section--m rule-top"><div className="wrap">
        <h2 className="h2" style={{ marginBottom: 48 }} data-reveal>More from {post.categoryName}</h2>
        <div className="grid grid--3">{more.map((p, n) => <PostCard key={p.slug} post={p} index={n} />)}</div>
      </div></section>
      <Newsletter />
    </>
  );
}

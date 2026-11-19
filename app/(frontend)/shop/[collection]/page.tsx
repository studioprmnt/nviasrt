import { notFound } from 'next/navigation';
import { getContent } from '@/lib/data';
import { seoMetadata } from '@/lib/seo';
import ShopPage from '@/components/ShopPage';

type Props = { params: Promise<{ collection: string }> };
export async function generateStaticParams() { return (await getContent()).collections.map(c => ({ collection: c.slug })); }
export async function generateMetadata({ params }: Props) {
  const { collection } = await params;
  const c = (await getContent()).collections.find(x => x.slug === collection);
  if (!c) return { title: 'Shop' };
  return seoMetadata(c.seo, { title: c.name, description: c.blurb, image: c.image, path: `/shop/${c.slug}` });
}
export default async function Collection({ params }: Props) {
  const { collection } = await params;
  const c = (await getContent()).collections.find(x => x.slug === collection); if (!c) notFound();
  return <ShopPage active={c} />;
}

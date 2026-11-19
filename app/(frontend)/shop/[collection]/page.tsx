import { notFound } from 'next/navigation';
import { getContent } from '@/lib/data';
import ShopPage from '@/components/ShopPage';

type Props = { params: Promise<{ collection: string }> };
export async function generateStaticParams() { return (await getContent()).collections.map(c => ({ collection: c.slug })); }
export async function generateMetadata({ params }: Props) {
  const { collection } = await params;
  return { title: (await getContent()).collections.find(c => c.slug === collection)?.name ?? 'Shop' };
}
export default async function Collection({ params }: Props) {
  const { collection } = await params;
  const c = (await getContent()).collections.find(x => x.slug === collection); if (!c) notFound();
  return <ShopPage active={c} />;
}

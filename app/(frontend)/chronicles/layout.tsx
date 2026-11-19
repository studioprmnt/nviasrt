import ChroniclesChrome from '@/components/ChroniclesChrome';
import { getContent } from '@/lib/data';

export default async function ChroniclesLayout({ children }: { children: React.ReactNode }) {
  const { categories } = await getContent();
  return (<><ChroniclesChrome categories={categories} />{children}</>);
}

import { staticMetadata } from '@/lib/seo';
import ShopPage from '@/components/ShopPage';
export const generateMetadata = () => staticMetadata('shop');
export default function Shop() { return <ShopPage />; }

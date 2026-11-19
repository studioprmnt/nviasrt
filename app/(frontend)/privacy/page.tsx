import { staticMetadata } from '@/lib/seo';
import Legal from '@/components/Legal';
export const generateMetadata = () => staticMetadata('privacy');
export default function Page() {
  return <Legal title="Privacy Policy" updated="11 Nov 2026" sections={[
    ['What I collect', 'Anonymous analytics (Google Analytics 4) after you accept cookies, and your email if you join the newsletter.'],
    ['Affiliate links', 'Shopee may set its own cookies when you click a product link.'],
    ['Your choices', 'You can unsubscribe at any time and ask me to delete your data by writing to hello@nviasrt.com.']]} />;
}

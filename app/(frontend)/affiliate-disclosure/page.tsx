import { staticMetadata } from '@/lib/seo';
import Legal from '@/components/Legal';
export const generateMetadata = () => staticMetadata('affiliateDisclosure');
export default function Page() {
  return <Legal title="Affiliate Disclosure" updated="11 Nov 2026" sections={[
    ['In short', 'Some links on this site are affiliate links. If you click one and buy something, I may earn a small commission. It costs you nothing extra.'],
    ['Which programs I use', 'Shopee Affiliate for now. Later this may include Tokopedia, Lazada, Amazon and a few brand programs. Every affiliate link goes through a /go/ address on this site so you can recognise it.'],
    ['How I choose what to recommend', 'I only link to things I own, use, or would buy again. Brands cannot pay to be included in Shop My Picks or in a guide.'],
    ['Sponsored content', 'If a brand pays me for a post, it says “In partnership with” at the top, before anything else.'],
    ['Questions', 'If something here is unclear, write to hello@nviasrt.com.']]} />;
}

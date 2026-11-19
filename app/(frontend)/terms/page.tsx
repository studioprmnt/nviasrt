import Legal from '@/components/Legal';
export const metadata = { title: 'Terms' };
export default function Page() {
  return <Legal title="Terms" updated="11 Nov 2026" sections={[
    ['Content', 'Words and photos on this site are mine unless stated. Please ask before reusing them.'],
    ['Recommendations', 'Product picks are personal opinions. Prices and availability are set by the store.'],
    ['Contact', 'Questions about these terms: hello@nviasrt.com.']]} />;
}

import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, DM_Sans, Mrs_Saint_Delafield } from 'next/font/google';
import Header from '@/components/Header';
import { getContent } from '@/lib/data';
import Footer from '@/components/Footer';
import { MotionInit, SmoothScroll } from '@/components/motion';
import Cursor from '@/components/Cursor';
import 'lenis/dist/lenis.css';
import './globals.css';

const serif = Cormorant_Garamond({ subsets: ['latin', 'latin-ext'], weight: ['400', '500'], style: ['normal', 'italic'], variable: '--font-serif', display: 'swap' });
const sans = DM_Sans({ subsets: ['latin', 'latin-ext'], weight: ['400', '500'], variable: '--font-sans', display: 'swap' });
const script = Mrs_Saint_Delafield({ subsets: ['latin'], weight: '400', variable: '--font-script', display: 'swap' });

export const metadata: Metadata = {
  title: { default: 'nviasrt — slow living, travel and the things I love', template: '%s · nviasrt' },
  description: 'Ovi’s journal of slow living, travel and honest picks.',
};
export const viewport: Viewport = { themeColor: '#FBF8F3' };

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { categories, collections, posts } = await getContent();
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} ${script.variable}`} suppressHydrationWarning>
      <head>
        {/* Enables scroll reveals only when JS runs, so content is never hidden without it */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body suppressHydrationWarning>
        <a href="#main" className="visually-hidden">Skip to content</a>
        <Header categories={categories} collections={collections} latest={posts[0]} />
        <main id="main">{children}</main>
        <Footer />
        <SmoothScroll />
        <MotionInit />
        <Cursor />
      </body>
    </html>
  );
}

// Page metadata (title, description, canonical URL, share cards, noindex) built from the CMS SEO fields,
// falling back to each page's own title, excerpt and photo, then to the site defaults in the SEO global.
import 'server-only';
import type { Metadata } from 'next';
import { STATIC_PAGES, type StaticPageKey } from '@/cms/globals/SEO';
import { getContent, type Seo } from './data';

type Base = {
  title: string; path: string; description?: string; image?: string;
  /** Use the title as written, without " · nviasrt" after it. */
  absolute?: boolean;
  article?: { publishedTime?: string; modifiedTime?: string; section?: string };
};

export async function seoMetadata(seo: Seo | undefined, base: Base): Promise<Metadata> {
  const { site } = await getContent();
  const title = seo?.title || base.title;
  const description = seo?.description || base.description || site.description;
  const image = seo?.image || base.image || site.image;
  const images = image ? [{ url: image }] : undefined;
  return {
    // A title typed into the SEO field is used exactly as written.
    title: seo?.title || base.absolute ? { absolute: title } : title,
    description,
    alternates: { canonical: base.path },
    openGraph: {
      title, description, url: base.path, siteName: site.name, locale: 'en_GB', images,
      ...(base.article ? { type: 'article', ...base.article } : { type: 'website' }),
    },
    twitter: { card: image ? 'summary_large_image' : 'summary', title, description, images: image ? [image] : undefined },
    ...(seo?.noIndex ? { robots: { index: false, follow: true } } : {}),
  };
}

export async function staticMetadata(key: StaticPageKey): Promise<Metadata> {
  const page = STATIC_PAGES.find(p => p.key === key)!;
  const seo = (await getContent()).site.pages[key];
  return seoMetadata({ ...seo, noIndex: seo?.noIndex ?? ('noIndex' in page && page.noIndex) },
    { title: page.title, description: 'description' in page ? page.description : undefined, path: page.path, absolute: key === 'home' });
}

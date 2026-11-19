import type { MetadataRoute } from 'next';
import { siteURL } from '@/cms/seo';
import { STATIC_PAGES } from '@/cms/globals/SEO';
import { getContent } from '@/lib/data';

// Every public page, minus anything marked "Hide from search engines" in the CMS.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { site, posts, categories, guides, collections } = await getContent();
  const url = (path: string) => `${siteURL()}${path === '/' ? '' : path}`;
  const latest = (dates: string[]) => dates.sort().at(-1);
  const pages = STATIC_PAGES.filter(p => !(site.pages[p.key]?.noIndex ?? ('noIndex' in p && p.noIndex))).map(p => ({
    url: url(p.path),
    lastModified: p.key === 'home' || p.key === 'chronicles' ? latest(posts.map(x => x.modifiedAt))
      : p.key === 'guides' ? latest(guides.map(x => x.modifiedAt)) : undefined,
  }));
  return [
    ...pages,
    ...categories.filter(c => !c.seo.noIndex).map(c => ({ url: url(`/chronicles/${c.slug}`), lastModified: c.modifiedAt })),
    ...posts.filter(p => !p.seo.noIndex).map(p => ({ url: url(`/chronicles/${p.slug}`), lastModified: p.modifiedAt })),
    ...guides.filter(g => !g.seo.noIndex).map(g => ({ url: url(`/guides/${g.slug}`), lastModified: g.modifiedAt })),
    ...collections.filter(c => !c.seo.noIndex).map(c => ({ url: url(`/shop/${c.slug}`), lastModified: c.modifiedAt })),
  ];
}

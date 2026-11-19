import type { MetadataRoute } from 'next';
import { siteURL } from '@/cms/seo';

export default function robots(): MetadataRoute.Robots {
  // Only the production site is indexed; Vercel preview deployments are not.
  if (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== 'production') return { rules: { userAgent: '*', disallow: '/' } };
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/admin', '/api/', '/go/'] },
    sitemap: `${siteURL()}/sitemap.xml`,
  };
}

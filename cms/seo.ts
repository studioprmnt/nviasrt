// SEO fields. Each page-type entry gets an "SEO" tab (stored as `meta`); static pages are set in the SEO global.
// The field UI (character counters, Google preview, "Auto-generate" buttons) comes from @payloadcms/plugin-seo.
import type { Field, Tab } from 'payload';
import type { SEOPluginConfig } from '@payloadcms/plugin-seo/types';
import { MetaDescriptionField, MetaImageField, MetaTitleField, OverviewField, PreviewField } from '@payloadcms/plugin-seo/fields';

/** Adjusts a plugin field, keeping its custom admin components. */
export const tweak = (field: Field, props: Record<string, unknown> = {}, admin: Record<string, unknown> = {}): Field =>
  ({ ...field, localized: false, ...props, admin: { ...(field as { admin?: object }).admin, ...admin } }) as Field;

const noIndexField: Field = {
  name: 'noIndex', type: 'checkbox', label: 'Hide from search engines',
  admin: { description: 'Adds "noindex" and leaves the page out of the sitemap. The page stays online.' },
};

const titleHelp = 'Shown as the headline in Google and when shared. Leave empty to use the page title. Around 50–60 characters.';
const descriptionHelp = 'Shown under the headline in Google and when shared. Leave empty to use the excerpt. Around 100–150 characters.';
const imageHelp = 'Shown when the link is shared (WhatsApp, Instagram, Facebook, X). Leave empty to use the main photo. Landscape works best.';

/** The SEO tab for collections that have their own page. */
export const seoTab: Tab = {
  name: 'meta', label: 'SEO',
  fields: [
    OverviewField({}),
    tweak(MetaTitleField({ hasGenerateFn: true }), {}, { description: titleHelp }),
    tweak(MetaDescriptionField({ hasGenerateFn: true }), {}, { description: descriptionHelp }),
    tweak(MetaImageField({ hasGenerateFn: true, relationTo: 'media' }), { label: 'Share image' }, { description: imageHelp }),
    PreviewField({ hasGenerateFn: true }),
    noIndexField,
  ],
};

/** Wraps a collection's main fields in Content + SEO tabs; sidebar fields stay outside so they keep their place. */
export const withSeoTab = (fields: Field[], label = 'Content'): Field[] => {
  const inSidebar = (f: Field) => 'admin' in f && (f.admin as { position?: string } | undefined)?.position === 'sidebar';
  return [{ type: 'tabs', tabs: [{ label, fields: fields.filter(f => !inSidebar(f)) }, seoTab] }, ...fields.filter(inSidebar)];
};

/** Title, description, share image and noindex, for one static page in the SEO global. */
export const pageSeoFields = (fallback: { title: string; description?: string; noIndex?: boolean }): Field[] => [
  tweak(MetaTitleField({}), {}, { description: `Leave empty to use “${fallback.title}”.` }),
  tweak(MetaDescriptionField({}), {}, { description: fallback.description ? `Leave empty to use: “${fallback.description}”` : 'Leave empty to use the site description.' }),
  tweak(MetaImageField({ relationTo: 'media' }), { label: 'Share image' }, { description: 'Leave empty to use the site share image.' }),
  { ...noIndexField, defaultValue: !!fallback.noIndex } as Field,
];

const PATHS: Record<string, (doc: { slug?: string }) => string> = {
  posts: d => `/chronicles/${d.slug ?? ''}`,
  categories: d => `/chronicles/${d.slug ?? ''}`,
  guides: d => `/guides/${d.slug ?? ''}`,
  'shop-collections': d => `/shop/${d.slug ?? ''}`,
};
export const siteURL = () =>
  process.env.NEXT_PUBLIC_SERVER_URL
  || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'https://nviasrt.vercel.app');

/** What the "Auto-generate" buttons fill in. */
export const seoGenerators: Pick<SEOPluginConfig, 'generateTitle' | 'generateDescription' | 'generateImage' | 'generateURL'> = {
  generateTitle: ({ doc }) => doc?.title ?? doc?.name ?? '',
  generateDescription: ({ doc }) => doc?.excerpt ?? doc?.blurb ?? '',
  generateImage: ({ doc }) => (typeof doc?.image === 'object' ? doc?.image?.id : doc?.image) ?? '',
  generateURL: ({ doc, collectionConfig }) => `${siteURL()}${PATHS[collectionConfig?.slug ?? '']?.(doc) ?? '/'}`,
};

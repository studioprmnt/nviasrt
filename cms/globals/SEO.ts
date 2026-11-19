import type { Field, GlobalConfig } from 'payload';
import { MetaDescriptionField, MetaImageField } from '@payloadcms/plugin-seo/fields';
import { globalAfterChange } from '../revalidate';
import { pageSeoFields, tweak } from '../seo';

/** Static pages and the text used when their SEO fields are left empty. `key` is the field name in the SEO global. */
export const STATIC_PAGES = [
  { key: 'home', path: '/', label: 'Home', title: 'nviasrt — slow living, travel and the things I love', description: 'Ovi’s journal of slow living, travel and honest picks.' },
  { key: 'chronicles', path: '/chronicles', label: 'Chronicles', title: 'Chronicles', description: 'Ovi’s stories on slow living, travel and home.' },
  { key: 'guides', path: '/guides', label: 'Guides', title: 'Guides', description: 'Packing lists, round-ups and how-tos for slower travel and living.' },
  { key: 'shop', path: '/shop', label: 'Shop My Picks', title: 'Shop My Picks', description: 'The things Ovi actually uses and loves, sorted into collections.' },
  { key: 'about', path: '/about', label: 'About', title: 'About Ovi', description: 'Who is behind nviasrt, and why slow living.' },
  { key: 'workWithMe', path: '/work-with-me', label: 'Work With Me', title: 'Work With Me', description: 'Brand partnerships and collaborations with Ovi.' },
  { key: 'contact', path: '/contact', label: 'Contact', title: 'Contact', description: 'Get in touch with Ovi.' },
  { key: 'search', path: '/search', label: 'Search', title: 'Search', noIndex: true },
  { key: 'privacy', path: '/privacy', label: 'Privacy Policy', title: 'Privacy Policy' },
  { key: 'terms', path: '/terms', label: 'Terms', title: 'Terms' },
  { key: 'affiliateDisclosure', path: '/affiliate-disclosure', label: 'Affiliate Disclosure', title: 'Affiliate Disclosure' },
] as const satisfies readonly { key: string; path: string; label: string; title: string; description?: string; noIndex?: boolean }[];
export type StaticPageKey = (typeof STATIC_PAGES)[number]['key'];

export const SEO: GlobalConfig = {
  slug: 'seo',
  label: 'SEO',
  admin: { group: 'Settings', description: 'Search and sharing settings for the whole site and its fixed pages. Chronicles, Guides, categories and shop collections each have their own SEO tab.' },
  access: { read: () => true },
  hooks: { afterChange: [globalAfterChange] },
  fields: [{ type: 'tabs', tabs: [
    { label: 'Site defaults', fields: [
      { name: 'siteName', type: 'text', defaultValue: 'nviasrt', admin: { description: 'Added after every page title, e.g. “Guides · nviasrt”, and shown as the site name when shared.' } },
      tweak(MetaDescriptionField({}), { name: 'siteDescription', label: 'Site description' }, { description: 'Used for any page without its own description.' }),
      tweak(MetaImageField({ relationTo: 'media' }), { name: 'siteImage', label: 'Site share image' }, { description: 'Used when a page has no photo of its own. Landscape, at least 1200 × 630.' }),
    ] },
    { label: 'Pages', description: 'Leave a field empty to use the text shown under it.', fields: STATIC_PAGES.map(p => ({
      type: 'collapsible', label: `${p.label}  ·  ${p.path}`, admin: { initCollapsed: true },
      fields: [{ name: p.key, type: 'group', label: false, fields: pageSeoFields(p) }],
    }) as Field) },
  ] }],
};

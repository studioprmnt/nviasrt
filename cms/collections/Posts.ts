import type { CollectionConfig } from 'payload';
import { sectionsField, slugField, takeawaysField } from '../fields';
import { revalidateHooks } from '../revalidate';
import { withSeoTab } from '../seo';
export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: { singular: 'Chronicle', plural: 'Chronicles' },
  admin: { useAsTitle: 'title', group: 'Chronicles', defaultColumns: ['title', 'category', 'publishedAt', '_status'] },
  defaultSort: '-publishedAt',
  versions: { drafts: true, maxPerDoc: 25 },
  access: { read: ({ req }) => (req.user ? true : { _status: { equals: 'published' } }) },
  hooks: revalidateHooks,
  fields: withSeoTab([
    { name: 'title', type: 'text', required: true },
    { name: 'excerpt', type: 'textarea', required: true, admin: { description: 'One sentence for cards and search engines.' } },
    { type: 'row', fields: [
      { name: 'image', type: 'upload', relationTo: 'media', required: true, admin: { width: '50%' } },
      { name: 'caption', type: 'text', required: true, admin: { width: '50%' } },
    ] },
    takeawaysField,
    sectionsField,
    slugField(),
    { name: 'category', type: 'relationship', relationTo: 'categories', required: true, admin: { position: 'sidebar' } },
    { name: 'publishedAt', type: 'date', required: true, defaultValue: () => new Date().toISOString(), admin: { position: 'sidebar', date: { pickerAppearance: 'dayOnly', displayFormat: 'd MMM yyyy' } } },
    { name: 'updated', type: 'date', label: 'Last updated (optional)', admin: { position: 'sidebar', date: { pickerAppearance: 'dayOnly', displayFormat: 'd MMM yyyy' } } },
    { name: 'readMin', type: 'number', label: 'Minutes to read', required: true, defaultValue: 5, min: 1, admin: { position: 'sidebar' } },
  ]),
};

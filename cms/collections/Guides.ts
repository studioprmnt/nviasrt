import type { CollectionConfig } from 'payload';
import { sectionsField, slugField, takeawaysField } from '../fields';
import { revalidateHooks } from '../revalidate';
import { withSeoTab } from '../seo';
export const Guides: CollectionConfig = {
  slug: 'guides',
  admin: { useAsTitle: 'title', group: 'Guides', defaultColumns: ['title', 'type', 'lastUpdated', '_status'] },
  defaultSort: '-lastUpdated',
  versions: { drafts: true, maxPerDoc: 25 },
  access: { read: ({ req }) => (req.user ? true : { _status: { equals: 'published' } }) },
  hooks: revalidateHooks,
  fields: withSeoTab([
    { name: 'title', type: 'text', required: true },
    { name: 'excerpt', type: 'textarea', required: true },
    { type: 'row', fields: [
      { name: 'image', type: 'upload', relationTo: 'media', required: true, admin: { width: '50%' } },
      { name: 'caption', type: 'text', required: true, admin: { width: '50%' } },
    ] },
    takeawaysField,
    sectionsField,
    { type: 'collapsible', label: 'Top picks', admin: { initCollapsed: true }, fields: [
      { name: 'topPick', type: 'relationship', relationTo: 'products' },
      { name: 'products', type: 'relationship', relationTo: 'products', hasMany: true, label: 'More picks' },
    ] },
    { type: 'collapsible', label: 'Comparison table', admin: { initCollapsed: true }, fields: [
      { name: 'comparisonColumns', type: 'text', label: 'Column headings', admin: { description: 'Separate with |, e.g. Item | Weight | Why I pack it' } },
      { name: 'comparisonRows', type: 'array', labels: { singular: 'Row', plural: 'Rows' }, fields: [{ name: 'cells', type: 'text', required: true, admin: { description: 'Separate cells with |' } }] },
    ] },
    { type: 'collapsible', label: 'Checklist', admin: { initCollapsed: true }, fields: [
      { name: 'checklist', type: 'array', fields: [{ name: 'item', type: 'text', required: true }] },
    ] },
    { type: 'collapsible', label: 'FAQ', admin: { initCollapsed: true }, fields: [
      { name: 'faq', type: 'array', label: 'Questions', fields: [{ name: 'question', type: 'text', required: true }, { name: 'answer', type: 'textarea', required: true }] },
    ] },
    slugField(),
    { name: 'type', type: 'select', required: true, defaultValue: 'How-to', options: ['Packing list', 'Round-up', 'How-to'], admin: { position: 'sidebar' } },
    { name: 'featured', type: 'checkbox', admin: { position: 'sidebar', description: 'Shown large at the top of Guides.' } },
    { name: 'lastUpdated', type: 'date', required: true, defaultValue: () => new Date().toISOString(), admin: { position: 'sidebar', date: { pickerAppearance: 'dayOnly', displayFormat: 'd MMM yyyy' } } },
    { name: 'readMin', type: 'number', label: 'Minutes to read', required: true, defaultValue: 5, min: 1, admin: { position: 'sidebar' } },
  ]),
};

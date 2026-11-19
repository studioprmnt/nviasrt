import type { CollectionConfig } from 'payload';
import { slugField, tintField } from '../fields';
import { revalidateHooks } from '../revalidate';
export const Categories: CollectionConfig = {
  slug: 'categories',
  labels: { singular: 'Chronicles category', plural: 'Chronicles categories' },
  admin: { useAsTitle: 'name', group: 'Chronicles', defaultColumns: ['name', 'slug', 'tint'] },
  orderable: true,
  access: { read: () => true },
  hooks: revalidateHooks,
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'blurb', type: 'text', required: true, admin: { description: 'One line, shown in the menu.' } },
    { name: 'intro', type: 'textarea', admin: { description: 'Intro on the category page. Leave a blank line between paragraphs.' } },
    slugField('name'), tintField,
  ],
};

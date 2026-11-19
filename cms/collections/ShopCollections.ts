import type { CollectionConfig } from 'payload';
import { slugField, tintField } from '../fields';
import { revalidateHooks } from '../revalidate';
export const ShopCollections: CollectionConfig = {
  slug: 'shop-collections',
  labels: { singular: 'Shop collection', plural: 'Shop collections' },
  admin: { useAsTitle: 'name', group: 'Shop My Picks', defaultColumns: ['name', 'slug', 'tint'] },
  orderable: true,
  access: { read: () => true },
  hooks: revalidateHooks,
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'blurb', type: 'text', required: true },
    { name: 'image', type: 'upload', relationTo: 'media', required: true },
    slugField('name'), tintField,
  ],
};

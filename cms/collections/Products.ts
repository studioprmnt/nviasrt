import type { CollectionConfig } from 'payload';
import { slugField } from '../fields';
import { revalidateHooks } from '../revalidate';
export const Products: CollectionConfig = {
  slug: 'products',
  labels: { singular: 'Pick', plural: 'Picks' },
  admin: { useAsTitle: 'name', group: 'Shop My Picks', defaultColumns: ['name', 'store', 'collections'] },
  orderable: true,
  access: { read: () => true },
  hooks: revalidateHooks,
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'note', type: 'text', required: true, admin: { description: 'One short, personal line.' } },
    { name: 'image', type: 'upload', relationTo: 'media', required: true },
    { type: 'row', fields: [
      { name: 'store', type: 'text', required: true, defaultValue: 'Shopee', admin: { width: '30%' } },
      { name: 'url', type: 'text', required: true, label: 'Affiliate link', admin: { width: '70%', description: 'Visitors go through /go/<slug> first, so this stays hidden.' } },
    ] },
    { name: 'collections', type: 'relationship', relationTo: 'shop-collections', hasMany: true },
    slugField('name'),
  ],
};

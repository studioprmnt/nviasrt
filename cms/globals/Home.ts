import type { GlobalConfig } from 'payload';
import { globalAfterChange } from '../revalidate';
export const Home: GlobalConfig = {
  slug: 'home',
  label: 'Home page',
  admin: { group: 'Settings' },
  access: { read: () => true },
  hooks: { afterChange: [globalAfterChange] },
  fields: [
    { name: 'moments', type: 'array', label: 'Hero moments', minRows: 1, maxRows: 5,
      admin: { description: 'The full-screen photos that cross-fade at the top of Home.' },
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
        { type: 'row', fields: [
          { name: 'place', type: 'text', required: true, admin: { width: '50%', description: 'e.g. Amed, 6 am' } },
          { name: 'post', type: 'relationship', relationTo: 'posts', admin: { width: '50%', description: 'Story the photo links to' } },
        ] },
      ] },
    { name: 'featuredCollection', type: 'relationship', relationTo: 'shop-collections', label: 'Shop collection on Home' },
  ],
};

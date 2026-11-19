import type { CollectionConfig } from 'payload';
import { revalidateHooks } from '../revalidate';
export const Media: CollectionConfig = {
  slug: 'media',
  admin: { group: 'Content' },
  access: { read: () => true },
  hooks: revalidateHooks,
  upload: { mimeTypes: ['image/*'], focalPoint: true },
  fields: [{ name: 'alt', type: 'text', required: true, admin: { description: 'Describe the photo for people who cannot see it.' } }],
};

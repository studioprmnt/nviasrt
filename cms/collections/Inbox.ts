import type { CollectionConfig } from 'payload';
const adminOnly = ({ req }: { req: { user?: unknown } }) => !!req.user;
export const Subscribers: CollectionConfig = {
  slug: 'subscribers',
  admin: { useAsTitle: 'email', group: 'Inbox', defaultColumns: ['email', 'createdAt'] },
  access: { read: adminOnly, create: adminOnly, update: adminOnly, delete: adminOnly },
  fields: [{ name: 'email', type: 'email', required: true, unique: true }],
};
export const Messages: CollectionConfig = {
  slug: 'messages',
  admin: { useAsTitle: 'name', group: 'Inbox', defaultColumns: ['name', 'email', 'topic', 'createdAt'] },
  access: { read: adminOnly, create: adminOnly, update: adminOnly, delete: adminOnly },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'topic', type: 'text' },
    { name: 'message', type: 'textarea', required: true },
    { name: 'source', type: 'select', options: ['contact', 'work-with-me'], defaultValue: 'contact' },
  ],
};

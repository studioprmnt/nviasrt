import type { Field } from 'payload';

export const slugify = (s: string) =>
  s.toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '').replace(/['’]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

/** URL slug, filled from `from` when left empty. */
export const slugField = (from = 'title'): Field => ({
  name: 'slug', type: 'text', required: true, unique: true, index: true,
  admin: { position: 'sidebar', description: 'Part of the URL. Leave empty to create it from the title.' },
  hooks: { beforeValidate: [({ value, data }) => (value ? slugify(value) : data?.[from] ? slugify(data[from]) : value)] },
});

export const tintField: Field = {
  name: 'tint', type: 'select', required: true, defaultValue: 'cream',
  options: ['sand', 'clay', 'ocean', 'cream', 'paper'].map(v => ({ label: v[0].toUpperCase() + v.slice(1), value: v })),
  admin: { position: 'sidebar', description: 'Background colour for this section of the site.' },
};

export const takeawaysField: Field = {
  name: 'takeaways', type: 'array', labels: { singular: 'Takeaway', plural: 'Key takeaways' },
  fields: [{ name: 'text', type: 'text', required: true }],
};

/** Article body: headed sections, each with text, an optional photo and optional picks. */
export const sectionsField: Field = {
  name: 'sections', type: 'array', minRows: 1, labels: { singular: 'Section', plural: 'Sections' },
  admin: { initCollapsed: true },
  fields: [
    { name: 'heading', type: 'text', required: true, admin: { description: 'Shown in the Contents list too.' } },
    { name: 'body', type: 'richText' },
    { type: 'row', fields: [
      { name: 'image', type: 'upload', relationTo: 'media', admin: { width: '50%' } },
      { name: 'imageCaption', type: 'text', admin: { width: '50%' } },
    ] },
    { name: 'products', type: 'relationship', relationTo: 'products', hasMany: true, label: 'Picks in this section' },
    { name: 'topPick', type: 'relationship', relationTo: 'products', label: 'Top pick (large card)' },
  ],
};

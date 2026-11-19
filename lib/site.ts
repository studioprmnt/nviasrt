// Client-safe helpers (no CMS access).
import type { Guide, Post } from './data';

export const postMeta = (p: Post) => `${p.categoryName} · ${p.readMin} min read`;
export const guideMeta = (g: Guide) => `${g.type} · Updated ${g.updated.split(' ').slice(1).join(' ')}`;

export const nav = [
  { label: 'Home', href: '/' },
  { label: 'Chronicles', href: '/chronicles', menu: 'chronicles' as const },
  { label: 'Shop My Picks', href: '/shop', menu: 'shop' as const },
  { label: 'Guides', href: '/guides' },
  { label: 'About Ovi', href: '/about' },
  { label: 'Work With Me', href: '/work-with-me' },
];

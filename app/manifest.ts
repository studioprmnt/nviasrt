import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'nviasrt — slow living, travel and the things I love',
    short_name: 'nviasrt',
    description: 'Ovi’s journal of slow living, travel and honest picks.',
    start_url: '/',
    display: 'standalone',
    background_color: '#FBF8F3',
    theme_color: '#FBF8F3',
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/icons/maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
}

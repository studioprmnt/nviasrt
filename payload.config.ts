import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob';
import path from 'path';
import { buildConfig } from 'payload';
import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { Users } from './cms/collections/Users';
import { Media } from './cms/collections/Media';
import { Categories } from './cms/collections/Categories';
import { Posts } from './cms/collections/Posts';
import { Guides } from './cms/collections/Guides';
import { ShopCollections } from './cms/collections/ShopCollections';
import { Products } from './cms/collections/Products';
import { Messages, Subscribers } from './cms/collections/Inbox';
import { Home } from './cms/globals/Home';
import { SEO } from './cms/globals/SEO';
import { mcpPlugin } from '@payloadcms/plugin-mcp';
import { seoPlugin } from '@payloadcms/plugin-seo';
import { seoGenerators } from './cms/seo';

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || '',
  admin: {
    user: Users.slug,
    importMap: { baseDir: dirname },
    meta: {
      titleSuffix: ' · nviasrt CMS',
      icons: [{ rel: 'icon', type: 'image/svg+xml', url: '/brand/icon.svg' }],
    },
    components: {
      graphics: {
        Logo: '/cms/admin/Branding#AdminLogo',
        Icon: '/cms/admin/Branding#AdminIcon',
      },
    },
  },
  collections: [Posts, Categories, Guides, Products, ShopCollections, Media, Subscribers, Messages, Users],
  globals: [Home, SEO],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URL || process.env.POSTGRES_URL || '' },
    push: false, // schema changes go through migrations, locally and on Vercel
  }),
  sharp,
  plugins: [
    // Only provides the SEO field UI and its Auto-generate endpoints; the fields themselves are added in cms/seo.ts
    seoPlugin({ uploadsCollection: 'media', ...seoGenerators }),
    vercelBlobStorage({
      enabled: !!process.env.BLOB_READ_WRITE_TOKEN,
      collections: { media: { disablePayloadAccessControl: true } },
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
    // Lets AI assistants (e.g. Claude) edit content over MCP at /api/mcp. Each API key (admin → MCP → API Keys)
    // picks which of these capabilities it may use. Media is read/update only: the plugin can't upload files.
    mcpPlugin({
      userCollection: 'users',
      collections: {
        posts: { enabled: true, description: 'Chronicles: blog posts/articles' },
        categories: { enabled: true, description: 'Categories that group Chronicles posts' },
        guides: { enabled: true, description: 'Long-form guides' },
        products: { enabled: true, description: 'Shop products with affiliate links' },
        'shop-collections': { enabled: true, description: 'Curated groups of shop products' },
        media: { enabled: { find: true, update: true }, description: 'Uploaded images (find existing ones to reference, edit alt text)' },
        subscribers: { enabled: { find: true }, description: 'Newsletter subscribers' },
        messages: { enabled: { find: true }, description: 'Messages sent through the contact form' },
      },
      globals: {
        home: { enabled: true, description: 'Homepage content' },
        seo: { enabled: true, description: 'SEO settings for fixed pages' },
      },
    }),
  ],
});

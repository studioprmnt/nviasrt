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

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || '',
  admin: {
    user: Users.slug,
    importMap: { baseDir: dirname },
    meta: { titleSuffix: ' · nviasrt CMS' },
  },
  collections: [Posts, Categories, Guides, Products, ShopCollections, Media, Subscribers, Messages, Users],
  globals: [Home],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URL || process.env.POSTGRES_URL || '' },
    push: false, // schema changes go through migrations, locally and on Vercel
  }),
  sharp,
  plugins: [
    vercelBlobStorage({
      enabled: !!process.env.BLOB_READ_WRITE_TOKEN,
      collections: { media: { disablePayloadAccessControl: true } },
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
  ],
});

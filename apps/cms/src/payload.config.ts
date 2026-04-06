import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'

import { Reviews } from './collections/Reviews'
import { Services } from './collections/Services'
import { BlogPosts } from './collections/BlogPosts'
import { Media } from './collections/Media'
import { Tags } from './collections/Tags'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: 'users',
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      afterDashboard: ['./components/BlogDashboard#BlogDashboard'],
    },
  },
  collections: [
    Reviews,
    Services,
    BlogPosts,
    Media,
    Tags,
    {
      slug: 'users',
      auth: true,
      admin: {
        useAsTitle: 'email',
      },
      access: {
        read: () => true,
      },
      fields: [],
    },
  ],
  cors: '*',
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'default-secret-change-me',
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  plugins: [
    ...(process.env.S3_BUCKET
      ? [
          s3Storage({
            collections: {
              media: {
                disablePayloadAccessControl: true,
                generateFileURL: ({ filename }) => {
                  return `${process.env.S3_PUBLIC_URL}/object/public/${process.env.S3_BUCKET}/${filename}`
                },
              },
            },
            bucket: process.env.S3_BUCKET,
            config: {
              credentials: {
                accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
                secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
              },
              region: process.env.S3_REGION || 'us-east-1',
              endpoint: process.env.S3_ENDPOINT,
              forcePathStyle: true,
            },
          }),
        ]
      : []),
  ],
})

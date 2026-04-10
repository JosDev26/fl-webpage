import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor, UploadFeature } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'

import { Reviews } from './collections/Reviews'
import { Services } from './collections/Services'
import { BlogPosts } from './collections/BlogPosts'
import { Media } from './collections/Media'
import { Tags } from './collections/Tags'
import { Subscribers } from './collections/Subscribers'
import { EmailCampaigns } from './collections/EmailCampaigns'
import { ContactMessages } from './collections/ContactMessages'

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
    Subscribers,
    EmailCampaigns,
    ContactMessages,
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
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,
      UploadFeature({
        collections: {
          media: {
            fields: [
              {
                name: 'width',
                type: 'number',
                label: 'Ancho (px)',
                min: 10,
                admin: {
                  description: 'Ajusta el ancho en píxeles. El alto se calcula proporcionalmente.',
                },
              },
            ],
          },
        },
      }),
    ],
  }),
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

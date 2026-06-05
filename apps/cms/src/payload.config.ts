import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Projects } from './collections/Projects'
import { Partners } from './collections/Partners'
import { News } from './collections/News'
import { Reports } from './collections/Reports'
import { ImpactMetrics } from './collections/ImpactMetrics'
import { TeamMembers } from './collections/TeamMembers'
import { Testimonials } from './collections/Testimonials'
import { Categories } from './collections/Categories'
import { Tags } from './collections/Tags'
import { MembershipRequests } from './collections/MembershipRequests'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const useS3 = !!(
  process.env.S3_BUCKET &&
  process.env.S3_ACCESS_KEY &&
  process.env.S3_SECRET_KEY
)

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET ?? 'CHANGE_ME_IN_PRODUCTION',

  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(__dirname),
    },
    meta: {
      titleSuffix: '— Jurerê Mais CMS',
    },
  },

  editor: lexicalEditor({}),

  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
  }),

  sharp,

  collections: [
    Projects,
    Partners,
    News,
    Reports,
    ImpactMetrics,
    TeamMembers,
    Testimonials,
    Categories,
    Tags,
    MembershipRequests,
    Media,
    Users,
  ],

  globals: [],

  upload: {
    limits: {
      fileSize: 52_428_800,
    },
  },

  ...(useS3
    ? {
        plugins: [
          s3Storage({
            collections: { media: true },
            bucket: process.env.S3_BUCKET!,
            config: {
              credentials: {
                accessKeyId: process.env.S3_ACCESS_KEY!,
                secretAccessKey: process.env.S3_SECRET_KEY!,
              },
              region: process.env.S3_REGION ?? 'sa-east-1',
              ...(process.env.S3_ENDPOINT ? { endpoint: process.env.S3_ENDPOINT } : {}),
            },
          }),
        ],
      }
    : {}),

  cors: [process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'],

  csrf: [process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'],

  typescript: {
    outputFile: path.resolve(__dirname, '../payload-types.ts'),
  },
})

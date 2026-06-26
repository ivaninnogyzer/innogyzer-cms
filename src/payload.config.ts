import { postgresAdapter } from '@payloadcms/db-postgres'
import { s3Storage } from '@payloadcms/storage-s3'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Posts } from './collections/Posts'
import { Testimonials } from './collections/Testimonials'
import { SiteSettings } from './globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    suppressHydrationWarning: true,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      beforeLogin: [
        {
          path: '@/components/LoginBackground',
          exportName: 'LoginBackground',
        },
      ],
      beforeDashboard: [
        {
          path: '@/components/DashboardWidgets',
          exportName: 'DashboardWidgets',
        },
      ],
      providers: [
        {
          path: '@/components/ThemeProvider',
          exportName: 'ThemeProvider',
        },
      ],
      graphics: {
        Logo: {
          path: '@/components/Logo',
          exportName: 'Logo',
        },
        Icon: {
          path: '@/components/Icon',
          exportName: 'Icon',
        },
      },
    },
  },
  cors: ['http://localhost:8082', 'http://localhost:8083', 'http://localhost:5173', 'http://localhost:3000'],
  csrf: ['http://localhost:8082', 'http://localhost:8083', 'http://localhost:5173', 'http://localhost:3000'],
  collections: [Users, Media, Posts, Testimonials],
  globals: [SiteSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  localization: {
    locales: ['en'],
    fallback: true,
    defaultLocale: 'en',
  },
  plugins: [
    s3Storage({
      collections: {
        media: true,
      },
      bucket: process.env.S3_BUCKET || '',
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
        },
        region: process.env.S3_REGION || 'auto',
        endpoint: process.env.S3_ENDPOINT || '',
        forcePathStyle: true,
      },
    }),
  ],
})

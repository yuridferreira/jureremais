import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // CMS roda na porta 3001 apenas para admin/API
}

export default withPayload(nextConfig)

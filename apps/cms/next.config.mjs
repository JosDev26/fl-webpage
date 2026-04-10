/** @type {import('next').NextConfig} */
import { withPayload } from '@payloadcms/next/withPayload'

const nextConfig = {
  output: 'standalone',
}

export default withPayload(nextConfig)

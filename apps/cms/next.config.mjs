/** @type {import('next').NextConfig} */
import { withPayload } from '@payloadcms/next/withPayload'

const nextConfig = {
  serverExternalPackages: ['sharp'],
}

export default withPayload(nextConfig)

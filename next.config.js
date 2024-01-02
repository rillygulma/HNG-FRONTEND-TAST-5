/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: [
      'dev-links-ubgnel0y7zlhj7hbmzhra.s3.amazonaws.com',
      'avatars.githubusercontent.com',
    ],
  },
}

module.exports = nextConfig

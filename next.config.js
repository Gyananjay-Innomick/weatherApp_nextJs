/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  publicRuntimeConfig: {
    backendUrl: process.env.APP_API_KEY,
  },
}

module.exports = nextConfig

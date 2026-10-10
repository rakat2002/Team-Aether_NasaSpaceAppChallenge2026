/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images-assets.nasa.gov',
      },
      {
        protocol: 'https',
        hostname: 'images-api.nasa.gov',
      },
      {
        protocol: 'https',
        hostname: '*.nasa.gov',
      },
      {
        protocol: 'http',
        hostname: 'images-assets.nasa.gov',
      }
    ],
  },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable standalone output for Docker deployment
  // This creates a minimal server build with only necessary files
  output: 'standalone',

  // Image optimization configuration
  images: {
    domains: ['localhost', 'karuniastrapi.nababancloud.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'karuniastrapi.nababancloud.com',
        port: '',
        pathname: '/uploads/**',
      },
      {
        protocol: 'http',
        hostname: 'karuniastrapi.nababancloud.com',
        port: '',
        pathname: '/uploads/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
    ],
  },
}

module.exports = nextConfig
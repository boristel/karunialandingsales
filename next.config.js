/** @type {import('next').NextConfig} */
const nextConfig = {
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
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
    ],
  },
}

module.exports = nextConfig
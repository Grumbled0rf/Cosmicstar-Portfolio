/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'uploads-ssl.webflow.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.prod.website-files.com',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/product',
        destination: '/product.html',
        permanent: false,
      },
      {
        source: '/services',
        destination: '/services.html',
        permanent: false,
      },
      {
        source: '/contact',
        destination: '/contact.html',
        permanent: false,
      },
    ]
  },
}

module.exports = nextConfig

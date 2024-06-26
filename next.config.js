/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'res.cloudinary.com',
      's.gravatar.com',
      'lh3.googleusercontent.com',
    ],
  },
  experimental: {
    swcPlugins: [['@swc-jotai/react-refresh', {}]],
  },
  async redirects() {
    return [
      {
        source: '/login',
        destination: '/api/auth/login',
        permanent: true,
      },
      {
        source: '/register',
        destination: '/api/auth/signup',
        permanent: true,
      },
      {
        source: '/signup',
        destination: '/api/auth/signup',
        permanent: true,
      },
      {
        source: '/logout',
        destination: '/api/auth/logout',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'es8h2z7slhkjgjau.public.blob.vercel-storage.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  env: {
    DRAFT_MODE: process.env.DRAFT_MODE || 'false', // Gunakan nilai dari .env
  },
};

module.exports = nextConfig;

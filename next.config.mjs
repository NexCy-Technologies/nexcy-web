/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // 👈 enables static export
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    unoptimized: true, // 👈 required for Firebase Hosting
  },

  compress: true, // Enable compression

  experimental: {
    optimizePackageImports: ['react-icons'],
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

  typescript: {
    ignoreBuildErrors: true,
  },

  // ⚠ Headers/redirects/rewrites are ignored in static export
  // So you can remove async headers() or leave as reference
}

export default nextConfig
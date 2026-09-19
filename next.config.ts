import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ['192.168.1.142'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.thum.io',
      },
    ],
  },
};

export default nextConfig;

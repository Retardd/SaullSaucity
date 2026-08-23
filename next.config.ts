import type { NextConfig } from 'next';
const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.discordapp.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
    dangerouslyAllowSVG: true,
  },
};
export default nextConfig;
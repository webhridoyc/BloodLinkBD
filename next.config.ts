
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  // output: 'export', // Removed for SSR with Firebase Functions
  trailingSlash: false, // Ensure consistency with Firebase Hosting
  /* config options here */
  typescript: {
    ignoreBuildErrors: false, // Changed to false
  },
  eslint: {
    ignoreDuringBuilds: false, // Changed to false
  },
  images: {
    // unoptimized: true, // Removed as Next.js can optimize images in SSR
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;

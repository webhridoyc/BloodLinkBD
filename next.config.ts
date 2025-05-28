import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: false,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.ibb.co', // Added for images from i.ibb.co
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Ensure build errors are not ignored
  typescript: {
    ignoreBuildErrors: false
  },
  eslint: {
    ignoreDuringBuilds: false
  },
};

export default nextConfig;
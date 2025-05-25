
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
    ],
  },
  typescript: {
    ignoreBuildErrors: false, // Ensure build errors are not ignored
  },
  eslint: {
    ignoreDuringBuilds: false, // Ensure ESLint errors are not ignored during builds
  },
};

export default nextConfig;


import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  output: 'export', // Enable static export
  trailingSlash: false, // Ensure consistency with Firebase Hosting
  /* config options here */
  typescript: {
    ignoreBuildErrors: false, // Changed to false
  },
  eslint: {
    ignoreDuringBuilds: false, // Changed to false
  },
  images: {
    unoptimized: true, // Required for static export with next/image
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Ensure experimental.typedRoutes is false or not set, as it can conflict with `output: 'export'`
  // experimental: {
  //   typedRoutes: false, 
  // },
};

export default nextConfig;


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
  // typescript: { ignoreBuildErrors: false } is the default when strict: true in tsconfig.json
  // eslint: { ignoreDuringBuilds: false } is the default
};

export default nextConfig;

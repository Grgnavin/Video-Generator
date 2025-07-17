import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  /* config options here */
   images: {
    domains: [
        'lh3.googleusercontent.com',
        'firebasestorage.googleapis.com'
    ],
    
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "kyjtswuxuyqzidnxvsax.supabase.co",
        pathname: "/storage/v1/object/**",
      },
    ],
  },
  async redirects() {
    return [
      // Common variants / old paths.
      { source: "/template/:path*", destination: "/templates/:path*", permanent: false },
      { source: "/portfolio", destination: "/templates", permanent: false },
    ];
  },
};

export default nextConfig;

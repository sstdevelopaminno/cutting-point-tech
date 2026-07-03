const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 86400,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [60, 72, 75],
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

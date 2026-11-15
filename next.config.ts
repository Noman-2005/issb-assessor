import type { NextConfig } from "next";

// Browsers keep these static images for a day and refresh them quietly after that.
const imageCache = [
  {
    key: "Cache-Control",
    value: "public, max-age=86400, stale-while-revalidate=604800",
  },
];

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async headers() {
    return [
      { source: "/nonverbal-t1/:path*", headers: imageCache },
      { source: "/nonverbal-t2/:path*", headers: imageCache },
      { source: "/logos/:path*", headers: imageCache },
    ];
  },
};

export default nextConfig;
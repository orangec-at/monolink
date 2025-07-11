import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Use export for full static generation, comment out for ISR/SSR
  output: process.env.STATIC_EXPORT ? "export" : undefined,
  images: {
    unoptimized: process.env.STATIC_EXPORT === "true",
  },
  env: {
    STRAPI_API_URL: process.env.STRAPI_API_URL || "http://localhost:1337",
  },
  // ISR is enabled by setting revalidate in page components
};

export default nextConfig;

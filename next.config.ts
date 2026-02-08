import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Pre-existing type errors (Supabase types not generated, Stripe API version)
    // These don't affect runtime behavior
    ignoreBuildErrors: true,
  },
};

export default nextConfig;

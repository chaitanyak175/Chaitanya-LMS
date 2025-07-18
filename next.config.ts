import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */

    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
    },

    // To also ignore ESLint errors during build, add:
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
    },

    images: {
        domains: [
            "chaitanya-lms.fly.storage.tigris.dev",
            "chaitanya-lms.t3.storage.dev",
        ],
        remotePatterns: [
            {
                hostname: "chaitanya-lms.fly.storage.tigris.dev",
                port: "",
                protocol: "https",
            },
            {
                protocol: "https",
                hostname: "chaitanya-lms.t3.storage.dev", // ✅ added this
            },
        ],
    },
};

export default nextConfig;

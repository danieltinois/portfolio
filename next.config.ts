import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'opengraph.githubassets.com',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'raw.githubusercontent.com',
                pathname: '/**/cover.png',
            },
        ],
    },
};

export default nextConfig;

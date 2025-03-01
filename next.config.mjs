import { withContentlayer } from 'next-contentlayer'

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '84kkseym9je8u78z.public.blob.vercel-storage.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'raw.githubusercontent.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'github.com',
                port: '',
                pathname: '/**',
            },
        ],
        domains: ['avatar.vercel.sh', 'randomuser.me'],
    },
    // Add webpack configuration for large media files
    webpack: (config, { dev, isServer }) => {
        config.performance = {
            ...config.performance,
            hints: false,
            maxAssetSize: 10000000,
            maxEntrypointSize: 10000000,
        };
        if (isServer) {
            config.externals.push('better-sqlite3')
        }
        return config;
    },
    staticPageGenerationTimeout: 1000,
    experimental: {
        serverComponentsExternalPackages: ['better-sqlite3']
    },
    async headers() {
        return [
            {
                source: "/api/:path*",
                headers: [
                    { key: "Access-Control-Allow-Origin", value: "*" },
                    { key: "Access-Control-Allow-Methods", value: "GET, POST, PUT, DELETE, OPTIONS" },
                    { key: "Access-Control-Allow-Headers", value: "Content-Type, Authorization" },
                ],
            },
        ];
    },
    poweredByHeader: false,
    generateEtags: false,
    compress: true,
    swcMinify: true,
    output: 'standalone',
    async rewrites() {
        return [
            {
                source: '/blog/:slug*',
                destination: '/blog/:slug*', // This will map to /app/blog/[slug]/page.tsx in the App Router
            },
        ];
    },
};

export default withContentlayer(nextConfig);
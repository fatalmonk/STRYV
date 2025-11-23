/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'securepay.sslcommerz.com',
            },
        ],
        unoptimized: false,
    },
    reactStrictMode: true,
}

module.exports = nextConfig

/** @type {import('next').NextConfig} */

const nextConfig = {
    output: 'standalone',
    // reactStrictMode: true,
    // images: {
    //     deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    //     imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // },
    experimental: {
        outputStandalone: true,
        outputFileTracingRoot: path.join(__dirname, '../../'),
      },
}

module.exports = nextConfig
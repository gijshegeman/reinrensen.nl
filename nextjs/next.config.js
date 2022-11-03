/** @type {import('next').NextConfig} */
const { join } = require('path')

const nextConfig = {
    output: 'standalone',
    experimental: {
        outputStandalone: true,
        outputFileTracingRoot: join(__dirname, '../../'),
        esmExternals: false,
      },
}

module.exports = nextConfig
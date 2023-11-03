/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['res.cloudinary.com'],
    },
    reactStrictMode: true,
    async headers() {
        return [{
            source: '*',
            headers: [
                {
                    key: 'Cache-Control',
                    value: 's-maxage=1, stale-while-revalidate=59',
                },
            ]
        }]
    }
}

module.exports = nextConfig

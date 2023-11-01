/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.icons8.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
}


module.exports = {
  webpack: (config, options) => {
    console.log(config); // Prints the modified webpack config

    return config;
  },
};

module.exports = nextConfig

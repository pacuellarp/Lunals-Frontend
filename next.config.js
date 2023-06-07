/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}


module.exports = {
  webpack: (config, options) => {
    console.log(config); // Prints the modified webpack config

    return config;
  },
};

module.exports = nextConfig

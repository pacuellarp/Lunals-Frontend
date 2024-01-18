/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.icons8.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "drive.google.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "t3.ftcdn.net",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = {
  webpack: (config) => {
    console.log(config); // Prints the modified webpack config

    return config;
  },
};

module.exports = nextConfig;

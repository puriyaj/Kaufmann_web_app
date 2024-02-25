/** @type {import('next').NextConfig} */
const config = {
  output: 'standalone',
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ilaman.storage.iran.liara.space',
        port: '',
        pathname: '/**',
      },{
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  domains: ['storage.iran.liara.space', 'localhost'],
  //   webpack: (config) => {
  //     config.module.rules.push({
  //       test: /\.svg$/i,
  //       // issuer: /\.[jt]sx?$/,
  //       use: ["@svgr/webpack"],
  //     });
  //     return config;
  //   },
};

module.exports = config;

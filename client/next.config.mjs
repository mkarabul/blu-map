/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // async rewrites() {
  //   return [
  //     {
  //       source: "/api/auth/:path",
  //       destination: "/api/auth/:path*",
  //     },
  //     {
  //       source: "/api/:path*",
  //       destination: `${process.env.API_URL}/api/:path*`,
  //     },
  //   ];
  // },
};

export default nextConfig;

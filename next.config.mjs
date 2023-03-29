/** @type {import('next').NextConfig} */
const config = {
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: "/api/proxy",
      },
    ];
  },
};

export default config;

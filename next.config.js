/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/auth/login",
        destination: "/api/auth/login",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;

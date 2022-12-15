const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["kellyfelder-revamp.s3.ap-southeast-1.amazonaws.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "kellyfelder-revamp.s3.ap-southeast-1.amazonaws.com",
      },
    ],
  },
};

module.exports = nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        pathname: "/wikipedia/zh/**",
      },
      {
        protocol: "https",
        hostname: "design-style-guide.freecodecamp.org",
        pathname: "/img/**",
      },
    ],
  },
};

export default nextConfig;

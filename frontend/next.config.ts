import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ui.shadcn.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.postgresql.org",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "webassets.mongodb.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.mysql.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.snowflake.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cloud.google.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "d1.awsstatic.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.gstatic.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.salesforce.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.hubspot.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.shadcnblocks.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
      protocol: "http",
      hostname: "",
        port: "3000",
        pathname: "/public/", // Adjust based on your API's file path structure
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/public/", // Adjust based on your API's file path structure
      },
      {
        protocol: "https",
        hostname: "ncrr3sx2l8kqrcqy.public.blob.vercel-storage.com", // Production or external source
      },
    ],
  },
};

module.exports = nextConfig;
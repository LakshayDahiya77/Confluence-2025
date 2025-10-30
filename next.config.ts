// next.config.ts
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // allow Cloudinary remote images
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
    // configure allowed quality values (Next.js 16+ will require this)
    qualities: [75, 90],
  },
};

export default nextConfig;

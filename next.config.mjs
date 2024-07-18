/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: true,
  optimizeFonts: true,
  images: {
    remotePatterns: [
      {
        hostname: "cdn.discordapp.com",
        protocol: "https",
      },
      {
        hostname: "nextui.org",
        protocol: "https",
      },
      {
        hostname: "i.giphy.com",
        protocol: "https",
      },
      {
        hostname: "unsplash.com",
        protocol: "https",
      },

      {
        hostname: "imgur.com",
        protocol: "https",
      },
      {
        hostname: "tenor.com",
        protocol: "https",
      },
      {
        hostname: "c.tenor.com",
        protocol: "https",
      },
      {
        hostname: "media.giphy.com",
        protocol: "https",
      },
      {
        hostname: "flickr.com",
        protocol: "https",
      },
      {
        hostname: "photobucket.com",
        protocol: "https",
      },
      {
        hostname: "pixabay.com",
        protocol: "https",
      },
      {
        hostname: "staticflickr.com",
        protocol: "https",
      },
      {
        hostname: "media.tenor.com",
        protocol: "https",
      },
      {
        hostname: "pinimg.com",
        protocol: "https",
      },
      {
        hostname: "images.unsplash.com",
        protocol: "https",
      },
      {
        hostname: "s1.imgyukle.com",
        protocol: "https",
      },
      {
        hostname: "hizliresim.com",
        protocol: "https",
      },
      {
        hostname: "upload.wikimedia.org",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;

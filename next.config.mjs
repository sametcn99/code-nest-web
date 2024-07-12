/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns:[
      {
        hostname: 'cdn.discordapp.com',
        protocol: 'https', // Removed colon
      },
      {
        hostname: 'nextui.org',
        protocol: 'https', // Removed colon
      },
    ]
  },
};

export default nextConfig;

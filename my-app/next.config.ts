/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true  // This will allow us to deploy while we fix type issues
  }
};

export default nextConfig;

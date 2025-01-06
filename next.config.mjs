/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/dashboard/bse-socket-connection/api-config',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  async redirects() {
    return [
      // The track chooser that used to sit at /guide is gone — both guides are
      // linked directly from the site header. Kept as a permanent redirect
      // because /guide is already published (footer, bookmarks, search index).
      {
        source: "/guide",
        destination: "/guide/teachers",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

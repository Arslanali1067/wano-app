/** @type {import('next').NextConfig} */
const nextConfig = {
  // The template's sample blog posts were removed (Nov 2026): send old links to the blog.
  async redirects() {
    return [
      "20-myths-about-web-design",
      "the-worst-advice-weve-ever-heard-about",
      "how-to-improve-web-design-process",
      "7-of-the-best-examples-of-beautiful-blog-design",
      "7-must-have-tools-for-web-designers",
    ].map((slug) => ({ source: `/post/${slug}`, destination: "/blog", permanent: true }));
  },
  async headers() {
    return [
      {
        source: "/.well-known/apple-app-site-association",
        headers: [{ key: "Content-Type", value: "application/json" }],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.prod.website-files.com',
      },
      {
        protocol: 'https',
        hostname: 'assets.website-files.com',
      },
      {
        protocol: 'https',
        hostname: 'wubflow-shield.nocodexport.dev',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'wano-africadev.lon1.cdn.digitaloceanspaces.com',
      },
    ],
  },
}

module.exports = nextConfig

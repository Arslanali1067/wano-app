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
    ]
      .map((slug) => ({ source: `/post/${slug}`, destination: "/blog", permanent: true }))
      // Wano TV film submissions have one address: /tv/submit.
      .concat([{ source: "/submit-film", destination: "/tv/submit", permanent: true }]);
  },
  // wanoafrica.com/@username is a creator's page; post, profile and embed links are
  // served by the Wano server's share pages under wanoafrica.com, so shared links
  // carry Wano's own address.
  async rewrites() {
    const API = process.env.WANO_API_URL || "https://devbe.wanoafrica.com";
    return [
      { source: "/@:username", destination: "/creator/:username" },
      // via=site tells the server the visitor is already on wanoafrica.com, so it
      // doesn't send them back here (old app versions still share devbe links).
      { source: "/v/:id", destination: `${API}/v/:id?via=site` },
      { source: "/u/:id", destination: `${API}/u/:id?via=site` },
      { source: "/embed/:id", destination: `${API}/embed/:id?via=site` },
      // A Wano TV share link carries the title's id; /tv/<slug> stays this site's page.
      { source: "/tv/:id([0-9a-f]{24})", destination: `${API}/tv/:id?via=site` },
      { source: "/app", destination: `${API}/app?via=site` },
    ];
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

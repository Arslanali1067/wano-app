import { MetadataRoute } from "next";

const SITE_URL = "https://wanoafrica.com";

// Static routes (video pages live in /video-sitemap.xml instead)
const STATIC_PATHS = [
  "/",
  "/tv",
  "/about",
  "/contact",
  "/creators",
  "/partnerships",
  "/platform",
  "/wano-studio",
  "/privacy",
  "/terms-of-service",
  "/kampala",
  "/blog",
  "/submit-film",
  "/post/the-new-wano",
  "/post/wano-is-light-on-your-data",
  "/post/submit-your-film-to-wano-tv",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return STATIC_PATHS.map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: path === "/" ? "daily" : "weekly",
    priority: path === "/" ? 1 : 0.7,
  }));
}


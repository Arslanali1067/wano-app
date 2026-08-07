import { MetadataRoute } from "next";
import { blogPosts } from "@/data/blogPosts";

const SITE_URL = "https://wanoafrica.com";

// Static routes (video pages live in /video-sitemap.xml instead)
const STATIC_PATHS = [
  "/",
  "/about",
  "/blog",
  "/contact",
  "/creators",
  "/partnerships",
  "/platform",
  "/wano-studio",
  "/privacy",
  "/terms-of-service",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = STATIC_PATHS.map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: path === "/" ? "daily" : "weekly",
    priority: path === "/" ? 1 : 0.7,
  }));

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${SITE_URL}/post/${post.slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...blogRoutes];
}


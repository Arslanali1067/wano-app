import { MetadataRoute } from "next";
import { publishedPosts, postTime } from "@/data/blogPosts";
import { getTvTitles } from "@/lib/tv";

export const revalidate = 3600;

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
  "/tv/submit",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = STATIC_PATHS.map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: (path === "/" ? "daily" : "weekly") as "daily" | "weekly",
    priority: path === "/" ? 1 : 0.7,
  }));
  // Every blog post, so Google finds new ones without a code change here.
  const posts = publishedPosts().map((post) => ({
    url: `${SITE_URL}/post/${post.slug}`,
    lastModified: new Date(postTime(post)),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));
  // Every Wano TV title page.
  const titles = (await getTvTitles()).map((t) => ({
    url: `${SITE_URL}/tv/${t.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));
  return [...pages, ...titles, ...posts];
}


import { MetadataRoute } from "next";
import { publishedPosts, postTime } from "@/data/blogPosts";
import { getTvTitles } from "@/lib/tv";
import { getCreatorIndex } from "@/lib/wano";

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
  "/tv/status",
  "/trending",
  "/lagos",
  "/nairobi",
  "/accra",
  "/johannesburg",
  "/london",
  "/advertise",
  "/press",
  "/help",
  "/help/delete-account",
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
  // Creator pages (wanoafrica.com/@username): adults with public posts, most followed first.
  const creators = (await getCreatorIndex()).map((c) => ({
    url: `${SITE_URL}/@${encodeURIComponent(c.username)}`,
    lastModified: new Date(c.updated),
    changeFrequency: "daily" as const,
    priority: c.followers >= 1000 ? 0.7 : 0.5,
  }));
  return [...pages, ...titles, ...posts, ...creators];
}


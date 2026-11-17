import { MetadataRoute } from "next";
import { publishedPosts, postTime } from "@/data/blogPosts";
import { getTvTitles } from "@/lib/tv";
import { getCreatorIndex, getSounds, getTags, getTopics } from "@/lib/wano";
import { COUNTRY_NAMES, countrySlug, slugify, topicSlug, TOPICS } from "@/lib/seo";

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
  "/videos",
  "/tags",
  "/sounds",
];
const TRENDING_COUNTRIES = ["ug", "ng", "ke", "gh", "za", "tz", "cd", "cm", "rw", "gb", "us"];

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
  // Topic, hashtag and sound pages: only those the Wano server says have enough real posts.
  const topics = (await getTopics()).filter((t) => TOPICS[t.topic] && (!t.country || COUNTRY_NAMES[t.country])).map((t) => ({
    url: `${SITE_URL}/videos/${topicSlug(t.topic)}${t.country ? `/${countrySlug(t.country)}` : ""}`,
    changeFrequency: "daily" as const,
    priority: 0.6,
  }));
  const tags = (await getTags()).map((t) => ({
    url: `${SITE_URL}/tag/${encodeURIComponent(t.tag)}`, changeFrequency: "daily" as const, priority: 0.5,
  }));
  const sounds = (await getSounds()).map((x) => ({
    url: `${SITE_URL}/sound/${encodeURIComponent(x.id)}`, changeFrequency: "weekly" as const, priority: 0.4,
  }));
  const trending = TRENDING_COUNTRIES.map((cc) => ({
    url: `${SITE_URL}/trending/${countrySlug(cc)}`, changeFrequency: "daily" as const, priority: 0.6,
  }));
  const genres = Array.from(new Set((await getTvTitles()).flatMap((t) => t.genres))).map((g) => ({
    url: `${SITE_URL}/tv/genre/${slugify(g)}`, changeFrequency: "weekly" as const, priority: 0.6,
  }));
  return [...pages, ...titles, ...genres, ...trending, ...topics, ...posts, ...creators, ...tags, ...sounds];
}


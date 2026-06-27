const SITE_URL = "https://wanoafrica.com";
const FEED_API = "https://devbe.wanoafrica.com/api/v1/feed/";
const PAGE_SIZE = 1000;
const MAX_PAGES = 200; // safety cap (=> up to 200k videos)

// Revalidate the generated XML hourly instead of rebuilding per request.
export const revalidate = 3600;

interface FeedUser {
  username?: string;
  display_name?: string;
}
interface FeedItem {
  id: string;
  title: string | null;
  description: string | null;
  thumbnail: string | null;
  remoteUrl_CF: string | null;
  is_ad?: boolean;
  user?: FeedUser;
}

function xmlEscape(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

// Google requires a non-empty title (<=100 chars) and description.
function buildTitle(item: FeedItem): string {
  const raw =
    item.title?.trim() ||
    item.description?.trim().split("\n")[0] ||
    `Video by ${item.user?.display_name?.trim() || "Wano creator"}`;
  return raw.length > 100 ? `${raw.slice(0, 97)}...` : raw;
}

function buildDescription(item: FeedItem): string {
  const raw =
    item.description?.trim() ||
    item.title?.trim() ||
    `Watch ${item.user?.display_name?.trim() || "this creator"} on Wano App`;
  return raw.length > 2048 ? raw.slice(0, 2048) : raw;
}

async function fetchAllVideos(): Promise<FeedItem[]> {
  const byId = new Map<string, FeedItem>();
  for (let page = 0; page < MAX_PAGES; page++) {
    const url = `${FEED_API}?skip=${page * PAGE_SIZE}&limit=${PAGE_SIZE}&authenticated=false`;
    const res = await fetch(url);
    if (!res.ok) break;
    const batch: FeedItem[] = await res.json();
    if (!Array.isArray(batch) || batch.length === 0) break;
    for (const item of batch) {
      if (item?.id && !byId.has(item.id)) byId.set(item.id, item);
    }
    if (batch.length < PAGE_SIZE) break;
  }
  return Array.from(byId.values());
}

export async function GET() {
  const videos = (await fetchAllVideos()).filter(
    (v) => !v.is_ad && v.remoteUrl_CF && v.thumbnail && v.id,
  );

  const urls = videos
    .map((v) => {
      const cfUid = String(v.remoteUrl_CF).match(
        /videodelivery\.net\/([a-f0-9]+)\//i,
      )?.[1];
      const player = cfUid
        ? `<video:player_loc>https://iframe.videodelivery.net/${cfUid}</video:player_loc>`
        : "";
      return `  <url>
    <loc>${SITE_URL}/pages/feed/${v.id}</loc>
    <video:video>
      <video:thumbnail_loc>${xmlEscape(v.thumbnail!)}</video:thumbnail_loc>
      <video:title>${xmlEscape(buildTitle(v))}</video:title>
      <video:description>${xmlEscape(buildDescription(v))}</video:description>
      <video:content_loc>${xmlEscape(v.remoteUrl_CF!)}</video:content_loc>
      ${player}
    </video:video>
  </url>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${urls}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}

const SITE = "https://wanoafrica.com";

export interface PublicVideo {
  _id: string;
  limited?: boolean;
  unlisted?: boolean;
  photo?: boolean;
  title?: string | null;
  description?: string | null;
  created_at?: string | null;
  duration?: number;
  views_count?: number;
  likes_count?: number;
  comments_count?: number;
  remoteUrl_CF?: string | null;
  urls?: { thumbnail?: string | null; hls_playlist?: string | null };
  preview_image?: string | null;
  user?: { username?: string | null; display_name?: string | null; profile_picture?: string | null };
}

export const watchPath = (id: string) => `/pages/feed/${encodeURIComponent(id)}`;

// Truncate by Unicode code point, never halfway through an emoji surrogate pair.
export const shortText = (text: string, length: number) => Array.from(text).slice(0, length).join("");

export function videoName(data: PublicVideo): string {
  return data.title?.trim() || shortText(data.description?.trim() || "", 100)
    || `${data.user?.display_name || "Creator"} on Wano`;
}

export function videoDescription(data: PublicVideo): string {
  return data.description?.trim()
    || `Watch ${videoName(data)}${data.user?.display_name ? ` by ${data.user.display_name}` : ""} on Wano.`;
}

export function creatorUrl(username?: string | null): string | undefined {
  // Public handles only: don't publish an email address or phone number as a profile URL.
  if (!username || !/^[a-zA-Z0-9_.-]+$/.test(username)
    || /\+?\d[\d\s().-]{6,}\d/.test(username) || /^\d+$/.test(username)) return undefined;
  return `${SITE}/@${encodeURIComponent(username)}`;
}

export function toIsoDate(raw?: string | null): string | undefined {
  if (!raw) return undefined;
  const text = raw.trim();
  // Backend timestamps without an offset represent UTC; date-only values need a time.
  const normalized = /^\d{4}-\d{2}-\d{2}$/.test(text) ? `${text}T00:00:00Z`
    : text.replace(/(\.\d{3})\d+/, "$1") + (/(?:z|[+-]\d{2}:?\d{2})$/i.test(text) ? "" : "Z");
  const d = new Date(normalized);
  return Number.isNaN(d.getTime()) ? undefined : d.toISOString();
}

export function videoJsonLd(data: PublicVideo) {
  const contentUrl = data.remoteUrl_CF || data.urls?.hls_playlist;
  if (data.limited || data.unlisted || data.photo || !contentUrl) return null;
  const uploadDate = toIsoDate(data.created_at);
  const url = `${SITE}${watchPath(data._id)}`;
  const personUrl = creatorUrl(data.user?.username);
  const personName = data.user?.display_name || (personUrl ? data.user?.username : undefined);
  return {
    "@context": "https://schema.org", "@type": "VideoObject",
    name: videoName(data), description: videoDescription(data), url,
    mainEntityOfPage: url,
    ...(data.urls?.thumbnail && { thumbnailUrl: [data.urls.thumbnail] }),
    ...(uploadDate && { uploadDate }),
    ...(typeof data.duration === "number" && Number.isFinite(data.duration) && data.duration > 0
      && { duration: `PT${Math.max(1, Math.round(data.duration))}S` }),
    contentUrl,
    ...(typeof data.views_count === "number" && { interactionStatistic: {
      "@type": "InteractionCounter", interactionType: { "@type": "WatchAction" },
      userInteractionCount: data.views_count,
    } }),
    ...(personName && { creator: { "@type": "Person", name: personName, ...(personUrl && { url: personUrl }) } }),
  };
}

// JSON embedded in an HTML script must not let a creator caption close the element.
export const serializeJsonLd = (value: unknown) => JSON.stringify(value).replace(/</g, "\\u003c");

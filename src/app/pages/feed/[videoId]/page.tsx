import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Feed } from "./Feed";

type Props = {
  params: Promise<{ videoId: string }>;
};

async function getVideo(videoId: string) {
  try {
    const res = await fetch(
      // The website's own endpoint: public posts by adults only (a young
      // person's post answers {limited: true}), and no view is counted.
      `https://devbe.wanoafrica.com/api/v1/public/videos/${encodeURIComponent(videoId)}`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { videoId } = await params;
  const data = await getVideo(videoId);

  if (data?.limited) {
    return {
      title: "Open this post in Wano",
      description: "Watch on the Wano app.",
      robots: { index: false, follow: false },
    };
  }

  const user = data?.user;
  const creatorTag = user
    ? (user.username ? `${user.display_name} (@${user.username})` : user.display_name)
    : null;
  const description = [creatorTag, data?.description].filter(Boolean).join(" · ") || "Watch videos on Wano App";
  const thumbnail = data?.urls?.thumbnail;

  // Each video's own name in search results and link previews, not "Wano App"
  // on every one (Search Console treats identical titles as near-duplicates).
  const name = (typeof data?.title === "string" && data.title.trim())
    || (typeof data?.description === "string" && data.description.trim().slice(0, 70))
    || (user ? `${user.display_name || user.username} on Wano` : "");
  const title = name ? `${name} · Wano` : "Wano App";
  return {
    // The site's layout adds " | WANO" to the page title.
    title: name || "Wano App",
    description,
    alternates: { canonical: `/pages/feed/${videoId}` },
    ...(data?.unlisted && { robots: { index: false, follow: false } }),
    openGraph: {
      title,
      description,
      ...(thumbnail && { images: [{ url: thumbnail }] }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(thumbnail && { images: [thumbnail] }),
    },
  };
}

// "2026-05-10T16:00:41.821000" (microseconds, no TZ) -> valid ISO 8601 UTC
function toIsoDate(raw?: string): string | undefined {
  if (!raw) return undefined;
  const normalized = /[zZ]|[+-]\d\d:?\d\d$/.test(raw)
    ? raw.replace(/(\.\d{3})\d+/, "$1")
    : raw.replace(/(\.\d{3})\d+/, "$1") + "Z";
  const d = new Date(normalized);
  return isNaN(d.getTime()) ? undefined : d.toISOString();
}

// seconds -> ISO 8601 duration, e.g. 53.706 -> "PT54S", 125 -> "PT2M5S"
function toIsoDuration(seconds?: number): string | undefined {
  if (typeof seconds !== "number" || !isFinite(seconds) || seconds <= 0)
    return undefined;
  const total = Math.round(seconds);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  return `PT${h ? `${h}H` : ""}${m ? `${m}M` : ""}${s || (!h && !m) ? `${s}S` : ""}`;
}

function buildVideoJsonLd(data: any) {
  if (!data) return null;

  const user = data.user;
  const name =
    data.title || data.description?.slice(0, 100) || "Wano Video";
  const description = data.description || "Watch videos on Wano App";
  const thumbnail = data?.urls?.thumbnail;
  const uploadDate = toIsoDate(data.created_at);
  const duration = toIsoDuration(data.duration);
  const contentUrl = data.remoteUrl_CF || data?.urls?.hls_playlist;

  // Cloudflare Stream UID -> iframe player embed
  const cfUid = String(contentUrl || "").match(
    /videodelivery\.net\/([a-f0-9]+)\//i,
  )?.[1];
  const embedUrl = cfUid
    ? `https://iframe.videodelivery.net/${cfUid}`
    : undefined;

  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name,
    description,
    ...(thumbnail && { thumbnailUrl: [thumbnail] }),
    ...(uploadDate && { uploadDate }),
    ...(duration && { duration }),
    ...(contentUrl && { contentUrl }),
    ...(embedUrl && { embedUrl }),
    ...(typeof data.views_count === "number" && {
      interactionStatistic: {
        "@type": "InteractionCounter",
        interactionType: { "@type": "WatchAction" },
        userInteractionCount: data.views_count,
      },
    }),
    ...(user && {
      creator: {
        "@type": "Person",
        name: user.display_name || user.username,
      },
    }),
  };

  return jsonLd;
}

export default async function FeedPage({ params }: Props) {
  const { videoId } = await params;
  const data = await getVideo(videoId);

  if (!data || data.detail) {
    notFound();
  }

  if (data.limited) {
    // A young person's post: nothing about it on the open web.
    return (
      <div style={{ minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", gap: 16, padding: 24, textAlign: "center" }}>
        <h1 style={{ fontSize: 22, fontWeight: 700 }}>Open this post in Wano</h1>
        <p>Watch it on the Wano app.</p>
        <a href={`/v/${videoId}`} style={{ background: "#16805A", color: "#fff", padding: "12px 20px",
          borderRadius: 999, fontWeight: 700 }}>Open in Wano</a>
      </div>
    );
  }

  const jsonLd = data.unlisted ? null : buildVideoJsonLd(data);

  return (
    <div className="h-full">
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <Feed data={data} />
    </div>
  );
}

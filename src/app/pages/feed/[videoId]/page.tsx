import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Feed } from "./Feed";

type Props = {
  params: Promise<{ videoId: string }>;
};

async function getVideo(videoId: string) {
  try {
    const res = await fetch(
      `https://devbe.wanoafrica.com/api/v1/videos/${videoId}?authenticated=false`,
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

  const user = data?.user;
  const creatorTag = user ? `${user.display_name} (@${user.username})` : null;
  const description = [creatorTag, data?.description].filter(Boolean).join(" · ") || "Watch videos on Wano App";
  const thumbnail = data?.urls?.thumbnail;

  return {
    title: "Wano App",
    description,
    openGraph: {
      title: "Wano App",
      description,
      ...(thumbnail && { images: [{ url: thumbnail }] }),
    },
    twitter: {
      card: "summary_large_image",
      title: "Wano App",
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
  const duration =
    typeof data.end === "number"
      ? toIsoDuration(data.end - (data.start || 0))
      : undefined;
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

  const jsonLd = buildVideoJsonLd(data);

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

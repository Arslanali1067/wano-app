import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Feed } from "./Feed";
import { cache } from "react";
import { API } from "@/lib/wano";
import { PublicVideo, parsePublicVideo, videoName, videoDescription, videoJsonLd, serializeJsonLd, watchPath } from "@/lib/video-seo";

type Props = {
  params: Promise<{ videoId: string }>;
};

const getVideo = cache(async (videoId: string): Promise<PublicVideo | null> => {
  if (!/^[a-f0-9]{24}$/i.test(videoId)) return null;
  // Preserve public API visibility checks. A temporary upstream failure must
  // not turn a real public post into a cacheable "not found" page.
  const res = await fetch(`${API}/api/v1/public/videos/${encodeURIComponent(videoId)}`, {
    next: { revalidate: 60 }, signal: AbortSignal.timeout(8000),
  });
  if (res.status === 404 || res.status === 410) return null;
  if (!res.ok) throw new Error(`Public video service unavailable (${res.status})`);
  return parsePublicVideo(await res.json(), videoId);
});

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

  if (!data) return { title: "Post not found", robots: { index: false, follow: false } };

  const description = videoDescription(data);
  // With the share_play switch on, the preview picture has a play button.
  const thumbnail = data?.preview_image || data?.urls?.thumbnail;

  const name = videoName(data);
  const title = `${name} · Wano`;
  return {
    // The site's layout adds " | WANO" to the page title.
    title: name || "Wano App",
    description,
    alternates: { canonical: watchPath(videoId) },
    ...(data?.unlisted && { robots: { index: false, follow: false } }),
    openGraph: {
      url: `https://wanoafrica.com${watchPath(videoId)}`,
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

export default async function FeedPage({ params }: Props) {
  const { videoId } = await params;
  const data = await getVideo(videoId);

  if (!data) {
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

  const jsonLd = data.unlisted ? null : videoJsonLd(data);

  return (
    <div className="h-full">
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
        />
      )}
      <Feed data={data} />
    </div>
  );
}

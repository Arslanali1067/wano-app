import { notFound, permanentRedirect, redirect } from "next/navigation";
import { watchPath } from "@/lib/video-seo";

export default async function FeedPage({
  searchParams,
}: {
  searchParams: Promise<{ videoId?: string }>;
}) {
  const { videoId } = await searchParams;

  if (videoId) {
    if (!/^[a-f0-9]{24}$/i.test(videoId)) notFound();
    permanentRedirect(watchPath(videoId));
  }

  redirect("/");
}

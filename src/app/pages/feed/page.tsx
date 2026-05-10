import { redirect } from "next/navigation";

export default async function FeedPage({
  searchParams,
}: {
  searchParams: Promise<{ videoId?: string }>;
}) {
  const { videoId } = await searchParams;

  if (videoId) {
    redirect(`/pages/feed/${videoId}`);
  }

  redirect("/");
}

import { Metadata } from "next";
import { Feed } from "./Feed";

type Props = {
  params: Promise<{ videoId: string }>;
};

async function getVideo(videoId: string) {
  const res = await fetch(
    `https://devbe.wanoafrica.com/api/v1/videos/${videoId}?authenticated=false`,
  );
  return res.json();
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

export default async function FeedPage({ params }: Props) {
  const { videoId } = await params;
  const data = await getVideo(videoId);

  return (
    <div className="h-full">
      <Feed data={data} />
    </div>
  );
}

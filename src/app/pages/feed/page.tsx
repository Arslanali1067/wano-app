import { Metadata } from "next";
import { Feed } from "./feed";

type Props = {
  searchParams: Promise<{ videoId?: string }>;
};

async function getVideo(videoId: string) {
  const res = await fetch(
    `https://devbe.wanoafrica.com/api/v1/videos/${videoId}?authenticated=false`,
  );
  return res.json();
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { videoId } = await searchParams;
  const data = videoId ? await getVideo(videoId) : null;

  const description = data?.description || "Watch videos on Wano App";
  const thumbnail = data?.urls?.thumbnail;

  return {
    title: "Wano App",
    description,
    openGraph: {
      title: "Wano App",
      description,
      ...(thumbnail && {
        images: [{ url: thumbnail }],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: "Wano App",
      description,
      ...(thumbnail && { images: [thumbnail] }),
    },
  };
}

export default async function FeedPage({ searchParams }: Props) {
  const { videoId } = await searchParams;
  const data = videoId ? await getVideo(videoId) : null;

  return (
    <div className="h-full">
      <Feed data={data} />
    </div>
  );
}

import PlatformHeroSection from "@/components/PlatformHeroSection";
import PlatformListFeaturesSection from "@/components/PlatformListFeaturesSection";
import CTASection from "@/components/CTASection";
import { Feed } from "./feed";

export default async function FeedPage({
  searchParams,
}: {
  searchParams: Promise<{ videoId?: string }>;
}) {
  const { videoId } = await searchParams;
  const result = await fetch(
    `https://devbe.wanoafrica.com/api/v1/videos/${videoId}?authenticated=false`,
  );

  const data = await result.json();
  return (
    <div className="h-full">
      <Feed data={data} />
    </div>
  );
}

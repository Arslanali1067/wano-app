import PlatformHeroSection from "@/components/PlatformHeroSection";
import PlatformListFeaturesSection from "@/components/PlatformListFeaturesSection";
import CTASection from "@/components/CTASection";

export default function AboutPage() {
  return (
    <main>
      <PlatformHeroSection variant="about" />
      <PlatformListFeaturesSection variant="about" hideHeader />
      <CTASection />
    </main>
  );
}

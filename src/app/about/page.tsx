import type { Metadata } from 'next'
import PlatformHeroSection from "@/components/PlatformHeroSection";
import PlatformListFeaturesSection from "@/components/PlatformListFeaturesSection";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: 'About WANO',
  description:
    'Learn about WANO — a video app born from Afrocentric culture, connecting Africa, the Diaspora, and communities worldwide.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About WANO — Connecting Culture & Community',
    description:
      'Learn about WANO — a video app born from Afrocentric culture, connecting Africa, the Diaspora, and communities worldwide.',
    url: 'https://wanoafrica.com/about',
    images: ['/images/About-bg.webp'],
  },
}

export default function AboutPage() {
  return (
    <main>
      <PlatformHeroSection variant="about" />
      <PlatformListFeaturesSection variant="about" hideHeader />
      <CTASection />
    </main>
  );
}


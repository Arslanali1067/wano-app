import type { Metadata } from 'next'
import PlatformHeroSection from '@/components/PlatformHeroSection'
import PhoneFeaturesSection from '@/components/PhoneFeaturesSection'
import PlatformListFeaturesSection from '@/components/PlatformListFeaturesSection'
import EasyAccessSection from '@/components/EasyAccessSection'
import CTASection from '@/components/CTASection'

export const metadata: Metadata = {
  title: 'WANO Platform Features',
  description:
    'Explore WANO platform features — fast HD video streaming, creative editing tools, community discovery, and cultural expression.',
  alternates: {
    canonical: '/platform',
  },
  openGraph: {
    title: 'WANO Platform Features — Built for Culture & Speed',
    description:
      'Explore WANO platform features — fast HD video streaming, creative editing tools, community discovery, and cultural expression.',
    url: 'https://wanoafrica.com/platform',
    images: ['/images/Feature1.webp'],
  },
}

export default function PlatformPage() {
  return (
    <>
      <PlatformHeroSection variant="platform" />
      <PhoneFeaturesSection variant="home" />
      <PlatformListFeaturesSection variant="about" />
      <EasyAccessSection variant="platform" />
      <CTASection />
    </>
  )
}


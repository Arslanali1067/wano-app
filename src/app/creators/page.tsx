import type { Metadata } from 'next'
import PlatformHeroSection from '@/components/PlatformHeroSection'
import PhoneFeaturesSection from '@/components/PhoneFeaturesSection'
import PlatformListFeaturesSection from '@/components/PlatformListFeaturesSection'
import EasyAccessSection from '@/components/EasyAccessSection'
import CTASection from '@/components/CTASection'

export const metadata: Metadata = {
  title: 'WANO Creators',
  description:
    'Join WANO as a music creator, video creator, or cultural storyteller. Share your vibe, grow your audience, and monetize your content.',
  alternates: {
    canonical: '/creators',
  },
  openGraph: {
    title: 'WANO Creators — Share Your Vibe With the World',
    description:
      'Join WANO as a music creator, video creator, or cultural storyteller. Share your vibe, grow your audience, and monetize your content.',
    url: 'https://wanoafrica.com/creators',
    images: ['/images/Creators-bg.webp'],
  },
}

export default function CreatorsPage() {
  return (
    <>
      <PlatformHeroSection variant="creators" />
      <PhoneFeaturesSection variant="creators" />
      <PlatformListFeaturesSection variant="creators" />
      <EasyAccessSection variant="creators" />
      <CTASection />
    </>
  )
}


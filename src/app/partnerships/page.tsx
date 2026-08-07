import type { Metadata } from 'next'
import PlatformHeroSection from '@/components/PlatformHeroSection'
import PhoneFeaturesSection from '@/components/PhoneFeaturesSection'
import PlatformListFeaturesSection from '@/components/PlatformListFeaturesSection'
import EasyAccessSection from '@/components/EasyAccessSection'
import CTASection from '@/components/CTASection'

export const metadata: Metadata = {
  title: 'WANO Partnerships',
  description:
    'Partner with WANO for brand campaigns, cultural initiatives, and strategic technology collaborations targeting global Afrocentric audiences.',
  alternates: {
    canonical: '/partnerships',
  },
  openGraph: {
    title: 'WANO Partnerships — Brand & Cultural Collaborations',
    description:
      'Partner with WANO for brand campaigns, cultural initiatives, and strategic technology collaborations targeting global Afrocentric audiences.',
    url: 'https://wanoafrica.com/partnerships',
    images: ['/images/Section.webp'],
  },
}

export default function PartnershipsPage() {
  return (
    <main>
      <PlatformHeroSection />
      <PhoneFeaturesSection variant="partnerships" />
      <PlatformListFeaturesSection />
      <EasyAccessSection variant="platform" />
      <CTASection />
    </main>
  )
}


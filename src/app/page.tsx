import type { Metadata } from 'next'
import HeroSection from '@/components/HeroSection'
import StatsSection from '@/components/StatsSection'
import PhoneFeaturesSection from '@/components/PhoneFeaturesSection'
import ListFeaturesSection from '@/components/ListFeaturesSection'
import EasyAccessSection from '@/components/EasyAccessSection'
import CTASection from '@/components/CTASection'

export const metadata: Metadata = {
  title: 'WANO — A Global Short-Form Video Platform Rooted in Culture',
  description:
    'Discover short videos celebrating Afrocentric music, storytelling, and culture. Connect from the African continent to the diaspora on WANO.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'WANO — A Global Short-Form Video Platform Rooted in Culture',
    description:
      'Discover short videos celebrating Afrocentric music, storytelling, and culture. Connect from the African continent to the diaspora on WANO.',
    url: 'https://wanoafrica.com',
  },
}

export default function Home() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <PhoneFeaturesSection />
      <ListFeaturesSection />
      <EasyAccessSection />
      <CTASection />
    </>
  )
}


import type { Metadata } from 'next'
import HeroSection from '@/components/HeroSection'
import StatsSection from '@/components/StatsSection'
import PhoneFeaturesSection from '@/components/PhoneFeaturesSection'
import ListFeaturesSection from '@/components/ListFeaturesSection'
import EasyAccessSection from '@/components/EasyAccessSection'
import CTASection from '@/components/CTASection'
import WhatsOnWanoSection from '@/components/WhatsOnWanoSection'
import AppTour from '@/components/AppTour'

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
    images: [{ url: '/images/og-wano.jpg', width: 1200, height: 630, alt: 'Wano: African videos, films and chat' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/images/og-wano.jpg'],
  },
}

export default function Home() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <AppTour />
      <WhatsOnWanoSection />
      <PhoneFeaturesSection />
      <ListFeaturesSection />
      <EasyAccessSection />
      <CTASection />
    </>
  )
}


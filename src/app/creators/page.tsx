import type { Metadata } from 'next'
import s from '@/components/Site.module.css'
import PlatformHeroSection from '@/components/PlatformHeroSection'
import PhoneFeaturesSection from '@/components/PhoneFeaturesSection'
import PlatformListFeaturesSection from '@/components/PlatformListFeaturesSection'
import EasyAccessSection from '@/components/EasyAccessSection'
import CTASection from '@/components/CTASection'

export const metadata: Metadata = {
  title: 'WANO Creators',
  description:
    'Join WANO as a music creator, video creator, or cultural storyteller. Build your community across Africa and the diaspora. Learn how creator growth and selective paid partnerships work on Wano.',
  alternates: {
    canonical: '/creators',
  },
  openGraph: {
    title: 'WANO Creators — Share Your Vibe With the World',
    description:
      'Join WANO as a music creator, video creator, or cultural storyteller. Build your community across Africa and the diaspora. Learn how creator growth and selective paid partnerships work on Wano.',
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
      <section className="section" aria-labelledby="paid-collaborations">
        <div className={`container ${s.narrow}`}>
          <h2 id="paid-collaborations" className={s.h2}>Interested in paid collaborations?</h2>
          <p className={s.text}>We consider creators with an active presence on Wano, quality content, and authentic audience engagement. Selection depends on campaign fit and available budget—not follower counts alone. Joining, posting, or reaching a milestone does not guarantee a paid partnership. Any paid work and payment terms are agreed separately before work begins.</p>
        </div>
      </section>
      <EasyAccessSection variant="creators" />
      <CTASection />
    </>
  )
}


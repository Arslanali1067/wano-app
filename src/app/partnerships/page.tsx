import type { Metadata } from 'next'
import Link from 'next/link'
import s from '@/components/Site.module.css'
import PlatformHeroSection from '@/components/PlatformHeroSection'
import PhoneFeaturesSection from '@/components/PhoneFeaturesSection'
import PlatformListFeaturesSection from '@/components/PlatformListFeaturesSection'
import EasyAccessSection from '@/components/EasyAccessSection'
import CTASection from '@/components/CTASection'
import WorkWithWanoSection from '@/components/WorkWithWanoSection'

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
    <>
      <PlatformHeroSection variant="partnerships" />
      <WorkWithWanoSection />
      <PhoneFeaturesSection variant="partnerships" />
      <PlatformListFeaturesSection variant="partnerships" />
      <section className="section" aria-labelledby="creator-partnerships">
        <div className={`container ${s.narrow}`}>
          <h2 id="creator-partnerships" className={s.h2}>Creators: build your presence on Wano first</h2>
          <p className={s.text}>For paid creator partnerships, we consider an established presence on Wano, consistent original content, and genuine audience engagement. A following elsewhere can provide context, but does not replace building a community on Wano. Opportunities depend on campaign fit and available budget. Joining, posting, applying, or reaching a milestone does not guarantee payment. Any paid collaboration is agreed separately before work begins.</p>
          <Link href="/creators" className={s.btn}>Read creator expectations</Link>
        </div>
      </section>
      <EasyAccessSection variant="platform" />
      <CTASection />
    </>
  )
}


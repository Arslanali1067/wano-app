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
    <div className={s.partnershipPage}>
      <PlatformHeroSection variant="partnerships" />
      <WorkWithWanoSection />
      <PhoneFeaturesSection variant="partnerships" />
      <PlatformListFeaturesSection variant="partnerships" />
      <section className="section" aria-labelledby="build-your-presence">
        <div className={`container ${s.narrow}`}>
          <h2 id="build-your-presence" className={s.h2}>Build your presence on Wano</h2>
          <p className={s.text}>Share your work, connect with new audiences, and bring your community into the conversation. Make Wano part of your everyday social presence through consistent, relevant content and meaningful engagement.</p>
          <p className={s.text}>Brands, organizations, event organizers, and creators can start participating without a sponsorship or partnership agreement. Building your presence can help people discover your work and connect your community across Africa, the Diaspora, and beyond.</p>
          <h3 className={s.h2}>Seeking sponsorship or paid participation from Wano?</h3>
          <p className={s.text}>Before requesting financial support or asking Wano to pay to participate in an event or project, establish an active presence on the platform. We assess proposals individually based on consistent contributions, genuine engagement, community benefit, strategic fit, and alignment with our <Link href="/community-guidelines">Community Guidelines</Link>. An audience elsewhere provides useful context, but does not replace meaningful participation on Wano.</p>
          <p className={s.text}>Participation does not guarantee audience growth, funding, promotion, or a partnership. Invitations do not imply acceptance of participation fees or paid slots. Any financial commitment must be agreed separately in writing.</p>
          <div className={s.row}>
            <Link href="/#Download" className={s.btn}>Start building on Wano</Link>
            <Link href="/advertise" className={s.btnOutline}>Advertise on Wano</Link>
          </div>
          <p className={s.text}>Want to sponsor Wano or discuss a media, investment, distribution, or technology partnership? Choose the relevant inquiry type below. An established Wano following is not required for these inquiries.</p>
        </div>
      </section>
      <EasyAccessSection variant="platform" />
      <CTASection />
    </div>
  )
}


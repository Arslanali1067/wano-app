import type { Metadata } from 'next'
import styles from './TvPage.module.css'
import TvHeroSection from './TvHeroSection'
import WhyWanoSection from './WhyWanoSection'
import InteractiveTvSections from './InteractiveTvSections'
import TvFaqSection from './TvFaqSection'
import SubmissionForm from './SubmissionForm'
import CTASection from '@/components/CTASection'

export const metadata: Metadata = {
  title: 'Submit Your Film to Wano TV | Your Story Deserves a Screen',
  description:
    'Wano TV is a curated home for films, documentaries and original stories from Africa and the global African diaspora. Submit your completed film for streaming consideration. No submission fee.',
  alternates: {
    canonical: '/tv',
  },
  openGraph: {
    title: 'Submit Your Film to Wano TV | Your Story Deserves a Screen',
    description:
      'Wano TV is a curated home for films, documentaries and original stories from Africa and the global African diaspora. Submit your completed film for consideration. No submission fee.',
    url: 'https://wanoafrica.com/tv',
    images: [
      {
        url: '/images/About-bg.webp',
        width: 1200,
        height: 630,
        alt: 'Wano TV - Call for Filmmaker Submissions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Submit Your Film to Wano TV | WANO',
    description:
      'Wano TV is a curated home for films, documentaries and original stories from Africa and the global African diaspora. Submit for consideration.',
    images: ['/images/About-bg.webp'],
  },
}

export default function WanoTvPage() {
  return (
    <div className={styles.pageContainer}>
      {/* Ambient background glows */}
      <div className={styles.heroGlowTop} />
      <div className={styles.glowMid} />
      <div className={styles.glowBottom} />

      {/* HERO SECTION WITH LOAD ANIMATIONS */}
      <TvHeroSection />

      {/* WHY WANO TV? & MANIFESTO SECTION */}
      <WhyWanoSection />

      {/* STREAMLINED CURATION CATEGORIES & 5-STEP PROCESS */}
      <InteractiveTvSections />

      {/* FILMMAKER FAQ & TECHNICAL SPECIFICATIONS */}
      <TvFaqSection />

      {/* FILMMAKER SUBMISSION FORM SECTION */}
      <section className={styles.formSection}>
        <div className="container">
          <SubmissionForm />
        </div>
      </section>

      {/* CTA SECTION */}
      <CTASection />
    </div>
  )
}


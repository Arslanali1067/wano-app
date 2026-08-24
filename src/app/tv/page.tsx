import type { Metadata } from 'next'
import styles from './TvPage.module.css'
import TvHeroSection from './TvHeroSection'
import SubmissionForm from './SubmissionForm'
import InteractiveTvSections from './InteractiveTvSections'
import CTASection from '@/components/CTASection'

export const metadata: Metadata = {
  title: 'Submit Your Film to Wano TV — Stories Worth Watching',
  description:
    'Wano TV is looking for original films, documentaries, and stories from Africa and the global diaspora. Submit your finished film for consideration for our September 2026 launch.',
  alternates: {
    canonical: '/tv',
  },
  openGraph: {
    title: 'Submit Your Film to Wano TV | Your Story Deserves a Screen',
    description:
      'Wano TV is looking for original films, documentaries, and stories from Africa and the global diaspora. Submit your completed film for consideration.',
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
      'Wano TV is looking for original films, documentaries, and stories from Africa and the global diaspora. Submit for consideration.',
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

      {/* INTERACTIVE BENTO CURATION FOCUS & LIVING PRODUCTION PIPELINE */}
      <InteractiveTvSections />

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

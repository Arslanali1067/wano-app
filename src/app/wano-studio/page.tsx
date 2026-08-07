import type { Metadata } from 'next'
import styles from '@/components/HeroSection.module.css'

export const metadata: Metadata = {
  title: 'WANO Studio',
  description:
    'WANO Studio — The upcoming creative production suite and tools for video creators on WANO.',
  alternates: {
    canonical: '/wano-studio',
  },
  openGraph: {
    title: 'WANO Studio — Creator Suite & Tools',
    description:
      'WANO Studio — The upcoming creative production suite and tools for video creators on WANO.',
    url: 'https://wanoafrica.com/wano-studio',
    images: ['/images/VideoEditScreen.webp'],
  },
}

export default function WanoStudioPage() {
  return (
    <main>
      <section className={`section ${styles.heroSection} ${styles.studioHero}`}>
        <div className="container">
          <div className={styles.studioHeroCard}>
            <h1>
              <span className={styles.studioWanoWord}>WANO</span> Studio
            </h1>
            <p>In development – coming soon.</p>
          </div>
        </div>
      </section>
    </main>
  )
}




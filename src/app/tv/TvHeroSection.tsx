'use client'

import { useState, useEffect } from 'react'
import styles from './TvPage.module.css'

export default function TvHeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className={styles.heroSection}>
      <div className="container">
        <div
          className={`${styles.heroBadge} ${styles.animateFadeIn} ${isVisible ? styles.visible : ''}`}
          style={{ transitionDelay: '0.1s' }}
        >
          <span className={styles.heroBadgePulse} />
          <span className={styles.heroBadgeText}>WANO TV • COMING SEPTEMBER 2026</span>
        </div>

        <div
          className={`${styles.animateText} ${isVisible ? styles.visible : ''}`}
          style={{ transitionDelay: '0.2s' }}
        >
          <h1 className={styles.heroTitle}>
            YOUR STORY <span className={styles.gradientText}>DESERVES A SCREEN.</span>
          </h1>
        </div>

        <div
          className={`${styles.animateFadeIn} ${isVisible ? styles.visible : ''}`}
          style={{ transitionDelay: '0.35s' }}
        >
          <p className={styles.heroSubtitle}>
            Wano TV is looking for original films, documentaries and stories from Africa and the global diaspora.
          </p>
        </div>

        <div
          className={`${styles.animateFadeIn} ${isVisible ? styles.visible : ''}`}
          style={{ transitionDelay: '0.45s' }}
        >
          <p className={styles.heroHook}>
            Have a finished film? Submit it for consideration for Wano TV.
          </p>
        </div>

        <div
          className={`${styles.heroButtons} ${styles.animateFadeIn} ${isVisible ? styles.visible : ''}`}
          style={{ transitionDelay: '0.55s' }}
        >
          <a href="#submit-film" className={styles.primaryCtaBtn}>
            <span>Submit Your Film</span>
            <span>→</span>
          </a>
          <a href="#what-we-are-looking-for" className={styles.secondaryCtaBtn}>
            <span>Explore Categories</span>
            <span>↓</span>
          </a>
        </div>

        {/* Advanced Cinematic Marquee Theater Frame */}
        <div
          className={`${styles.cinematicPreviewHolder} ${styles.animateFadeIn} ${isVisible ? styles.visible : ''}`}
          style={{ transitionDelay: '0.65s' }}
        >
          <div className={styles.cinematicFrameInner}>
            <div className={styles.frameSpotlight} />

            {/* Viewfinder Bar */}
            <div className={styles.viewfinderHeader}>
              <div className={styles.recIndicator}>
                <span className={styles.recDot} />
                <span>REC [00:09:2026]</span>
              </div>
              <div className={styles.viewfinderMeta}>
                <span>4K UHD</span>
                <span>•</span>
                <span>2.39:1 CINEMASCOPE</span>
                <span>•</span>
                <span className={styles.viewfinderTag}>CURATED SELECTION</span>
              </div>
            </div>

            {/* Brand & Tagline Header */}
            <div className={styles.theaterBrandWrapper}>
              <div className={styles.theaterBrandRow}>
                <span className={styles.teaserBrandText}>WANO</span>
                <span className={styles.teaserTvBadge}>TV</span>
              </div>
              <div>
                <h2 className={styles.theaterTagline}>
                  Stories <span className={styles.theaterTaglineHighlight}>worth watching.</span>
                </h2>
              </div>
              <p className={styles.theaterDescription}>
                A premier streaming stage celebrating authentic African cinema, groundbreaking diaspora documentaries, and visionary independent storytelling.
              </p>
            </div>

            {/* 3 Core Pillars */}
            <div className={styles.featurePillarsGrid}>
              <div className={styles.featurePillarCard}>
                <div className={styles.pillarIcon}>🎬</div>
                <h3 className={styles.pillarTitle}>Curated African Cinema</h3>
                <p className={styles.pillarText}>
                  Original feature films, compelling shorts, and bold narratives capturing the rhythm and soul of the continent.
                </p>
              </div>

              <div className={styles.featurePillarCard}>
                <div className={styles.pillarIcon}>🌍</div>
                <h3 className={styles.pillarTitle}>Global Diaspora Voices</h3>
                <p className={styles.pillarText}>
                  Connecting stories from London, Bahia, Kingston, New York, and beyond through powerful shared heritage.
                </p>
              </div>

              <div className={styles.featurePillarCard}>
                <div className={styles.pillarIcon}>🌟</div>
                <h3 className={styles.pillarTitle}>Emerging & Independent</h3>
                <p className={styles.pillarText}>
                  An open, unpretentious platform championing both rising independent directors and established filmmakers.
                </p>
              </div>
            </div>

            {/* Theater Frame Footer */}
            <div className={styles.theaterFooter}>
              <div className={styles.launchPillHolder}>
                <div className={styles.launchBadge}>
                  <span>✨</span> Coming September 2026
                </div>
                <div className={styles.statusPillLive}>
                  <span>●</span> Submissions Open Worldwide
                </div>
              </div>

              <div className={styles.theaterCtaHolder}>
                <a href="#submit-film" className={styles.theaterSubmitBtn}>
                  Submit Your Film →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

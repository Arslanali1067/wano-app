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
        {/* Top Badges */}
        <div
          className={`${styles.heroBadgeGroup} ${styles.animateFadeIn} ${isVisible ? styles.visible : ''}`}
          style={{ transitionDelay: '0.1s' }}
        >
          <div className={styles.heroBadge}>
            <span className={styles.heroBadgePulse} />
            <span className={styles.heroBadgeText}>WANO TV • COMING SOON</span>
          </div>
          <div className={styles.freeSubmissionBadge}>
            <span className={styles.freeBadgeIcon}>✦</span>
            <span>No Submission Fee • Open Worldwide</span>
          </div>
        </div>

        {/* Strengthened Opening Title */}
        <div
          className={`${styles.animateText} ${isVisible ? styles.visible : ''}`}
          style={{ transitionDelay: '0.2s' }}
        >
          <h1 className={styles.heroTitle}>
            YOUR STORY <span className={styles.gradientText}>DESERVES A SCREEN.</span>
          </h1>
        </div>

        {/* Crystal Clear Proposition */}
        <div
          className={`${styles.animateFadeIn} ${isVisible ? styles.visible : ''}`}
          style={{ transitionDelay: '0.35s' }}
        >
          <p className={styles.heroSubtitle}>
            Wano TV is a curated home for films, documentaries and original stories from Africa and the global African diaspora.
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

        {/* Action CTAs */}
        <div
          className={`${styles.heroButtons} ${styles.animateFadeIn} ${isVisible ? styles.visible : ''}`}
          style={{ transitionDelay: '0.55s' }}
        >
          <a href="#submit-film" className={styles.primaryCtaBtn}>
            <span>Submit Your Film</span>
            <span>→</span>
          </a>
          <a href="#why-wano-tv" className={styles.secondaryCtaBtn}>
            <span>Why Wano TV?</span>
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

            {/* Viewfinder Bar - Story First, No 4K Gatekeeping */}
            <div className={styles.viewfinderHeader}>
              <div className={styles.recIndicator}>
                <span className={styles.recDot} />
                <span>REC [00:00:00]</span>
              </div>
              <div className={styles.viewfinderMeta}>
                <span className={styles.hideOnMobile}>HD & CINEMA FORMATS</span>
                <span className={styles.hideOnMobile}>•</span>
                <span className={styles.hideOnMobile}>2.39:1 CINEMASCOPE</span>
                <span className={styles.hideOnMobile}>•</span>
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
                Building a new screen for African and diaspora storytelling. We invite independent filmmakers, documentarians, and visionaries to help define what appears on that screen.
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
                  An open platform championing both rising independent directors and experienced filmmakers on the merit of their story.
                </p>
              </div>
            </div>

            {/* Theater Frame Footer */}
            <div className={styles.theaterFooter}>
              <div className={styles.launchPillHolder}>
                <div className={`${styles.launchBadge} ${styles.hideOnMobile}`}>
                  <span>✨</span> Coming Soon
                </div>
                <div className={`${styles.statusPillLive} ${styles.hideOnMobile}`}>
                  <span>●</span> 100% Free Submissions Open
                </div>
              </div>

              <div className={styles.theaterCtaHolder}>
                <a href="#submit-film" className={styles.theaterSubmitBtn}>
                  Submit Your Screener →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

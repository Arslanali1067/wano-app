'use client'

import { useEffect, useState, useRef } from 'react'
import styles from './HeroSection.module.css'
import platformStyles from './PlatformHeroSection.module.css'
import listStyles from './ListFeaturesSection.module.css'

const heroListItems = [
  'Personalized "For You" and "Following" feeds',
  'Cross-regional content visibility',
  'Trending creators and sounds',
  'Real-time discovery experience',
]

export default function PlatformHeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section
      id="Hero"
      className={`section ${styles.heroSection} ${platformStyles.platformHeroSection}`}
      ref={sectionRef}
    >
      <div className="container">
        <div className={styles.heroSectionHolder}>
          <div className={styles.heroSectionContainer}>
            <div className={styles.heroSectionHeaderHolder}>
              <div
                className={`${styles.animateText} ${
                  isVisible ? styles.visible : ''
                }`}
              >
                <h1>Partnerships</h1>
              </div>
            </div>
            <div
              className={`${styles.heroSectionParagraphHolder} ${styles.animateFadeIn} ${
                isVisible ? styles.visible : ''
              }`}
              style={{ animationDelay: '0.2s' }}
            >
              <p>
                Collaborate with Wano across Africa, the Diaspora, and the
                Caribbean through culturally aligned partnerships.
              </p>
              <p className={styles.heroStats}>
                15,000+ installs and growing worldwide.
              </p>
            </div>

            {/* List-only (no check icons) */}
            <div className={platformStyles.platformHeroList}>
              <ul className={listStyles.listUnstyled}>
                {heroListItems.map((item, idx) => (
                  <li key={item}>
                    <div
                      className={`${platformStyles.platformHeroListItem} ${listStyles.fadeIn} ${
                        isVisible ? listStyles.visible : ''
                      }`}
                      style={{ animationDelay: `${0.3 + idx * 0.08}s` }}
                    >
                      <p className={listStyles.listParagraph}>{item}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

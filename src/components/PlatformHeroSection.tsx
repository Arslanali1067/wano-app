'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import styles from './HeroSection.module.css'
import platformStyles from './PlatformHeroSection.module.css'

const heroContent = {
  partnerships: {
    title: 'Partnerships',
    description: 'Wano collaborates with brands, organizations, creators, and institutions aligned with cultural growth and global expansion across Africa, the Diaspora, and the Caribbean.',
    bgImage: '/images/image3.webp',
  },
  creators: {
    title: 'Creators',
    description: 'Join Wano as a creator and share your culture with the world. From music and video to storytelling—build your audience and grow with a community that celebrates you.',
    bgImage: '/images/Creators-bg.webp',
  },
}

interface PlatformHeroSectionProps {
  variant?: 'partnerships' | 'creators'
}

export default function PlatformHeroSection({ variant = 'partnerships' }: PlatformHeroSectionProps) {
  const content = heroContent[variant]
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const joinHref = pathname === '/' ? '#Download' : '/#Download'

  return (
    <section
      id="Hero"
      className={`section ${styles.heroSection} ${platformStyles.platformHeroSection}`}
      ref={sectionRef}
    >
      <div className={`container ${platformStyles.heroOuter}`}>
        <div className={platformStyles.heroWrapper}>
          <Image
            src={content.bgImage}
            alt=""
            fill
            className={platformStyles.heroBgImage}
            priority
          />
          <div className={platformStyles.heroOverlay} />
          <div className={platformStyles.heroContent}>
            <div className={styles.heroSectionHolder}>
              <div className={styles.heroSectionContainer}>
                <div className={styles.heroSectionHeaderHolder}>
                  <div
                    className={`${styles.animateText} ${isVisible ? styles.visible : ''}`}
                  >
                    <h1>{content.title}</h1>
                  </div>
                </div>
                <div
                  className={`${styles.heroSectionParagraphHolder} ${platformStyles.heroSubtext} ${styles.animateFadeIn} ${isVisible ? styles.visible : ''}`}
                  style={{ animationDelay: '0.2s' }}
                >
                  <p>
                  {content.description}
                  </p>
                  {/* <p className={styles.heroStats}>
                    15,000+ installs and growing worldwide.
                  </p> */}
                  <div
                    className={`${styles.heroSectionButtonHolder} ${platformStyles.heroButtonHolder} ${styles.animateFadeIn} ${isVisible ? styles.visible : ''}`}
                    style={{ animationDelay: '0.3s' }}
                  >
                    <Link href={joinHref} className="button">
                      Join now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

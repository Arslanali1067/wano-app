'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from './HeroSection.module.css'
import platformStyles from './PlatformHeroSection.module.css'

const heroContent = {
  platform: {
    title: 'The WANO Platform',
    description:
      'Engineered for speed, culture, and community. Discover fast short-form video streaming, native storytelling tools, and seamless global connection.',
    bgImage: '/images/Feature1.webp',
  },
  partnerships: {
    title: 'Partnerships',
    description:
      'Wano collaborates with brands, organizations, creators, and institutions aligned with cultural growth and global expansion across Africa and the Diaspora.',
    bgImage: '/images/image3.webp',
  },
  creators: {
    title: 'Creators',
    description:
      'Join Wano as a creator and share your culture with the world. From music and video to storytelling—build your audience and grow with a community that celebrates you.',
    bgImage: '/images/Creators-bg.webp',
  },
  about: {
    title: 'About Wano',
    description:
      'Wano is a global short-form video platform rooted in Afrocentric culture, connecting Africa, the Diaspora, and communities worldwide shaped by its influence.',
    bgImage: '/images/About-bg.webp',
  },
} as const

interface PlatformHeroSectionProps {
  variant?: keyof typeof heroContent
}

export default function PlatformHeroSection({ variant = 'platform' }: PlatformHeroSectionProps) {
  const content = heroContent[variant]
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const joinHref = '#Download'

  return (
    <section
      id="Hero"
      className={`section ${styles.heroSection} ${platformStyles.platformHeroSection} ${
        variant === 'about' ? platformStyles.aboutVariant : ''
      }`}
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
                    {variant === 'about' ? (
                      <h1>
                        About{' '}
                        <span className={platformStyles.aboutWanoWord}>
                          WANO
                        </span>
                      </h1>
                    ) : (
                      <h1>{content.title}</h1>
                    )}
                  </div>
                </div>
                <div
                  className={`${styles.heroSectionParagraphHolder} ${platformStyles.heroSubtext} ${styles.animateFadeIn} ${isVisible ? styles.visible : ''}`}
                  style={{ animationDelay: '0.2s' }}
                >
                  <p>
                  {content.description}
                  </p>
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

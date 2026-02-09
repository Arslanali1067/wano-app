'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import styles from './ListFeaturesSection.module.css'
import heroStyles from './HeroSection.module.css'

const partnershipFeatures = [
  {
    title: 'Built for Culture, Not Just Reach',
    description: "Wano connects brands with a culturally active audience across Africa, the Diaspora, and the Caribbean — not just users, but people who create, share, and shape trends.",
    foregroundImage: '/images/Section.webp',
    imageFirst: false,
    checkItems: [
      "Highly engaged, creator-driven community",
      "Strong presence across multiple cultural regions",
      "Built for music, video, and cultural storytelling",
      "Discovery that travels across borders"
    ],
  },
  {
    title: 'Partner Early in a Growing Ecosystem',
    description: "Wano is an early-stage platform with global ambition. Our partners get visibility, influence, and long-term positioning as we scale.",
    foregroundImage: '/images/Section2.webp',
    imageFirst: true,
    checkItems: [
      "15,000+ installs and growing",
      "Early-stage partnership advantage",
      "Opportunity to shape product and ecosystem",
      "Cross-continental distribution potential",
    ],
  },
]

const creatorFeatures = [
  {
    title: 'A Platform Built for Creators',
    description: "Wano puts creators first. Share your content with an audience that values authenticity, culture, and community—not just views.",
    foregroundImage: '/images/Creators1.webp',
    imageFirst: false,
    checkItems: [
      "Share music, video, and cultural content",
      "Reach audiences across Africa and the diaspora",
      "Join a creator-driven community",
      "Tools designed for your language and style",
    ],
  },
  {
    title: 'Grow Your Audience With Wano',
    description: "We're building a global cultural platform. Early creators get visibility, support, and the chance to shape what comes next.",
    foregroundImage: '/images/Creators2.webp',
    imageFirst: true,
    checkItems: [
      "15,000+ installs and growing",
      "Early creator advantage",
      "Community support and feedback",
      "Cross-continental reach",
    ],
  },
]

interface PlatformListFeaturesSectionProps {
  variant?: 'partnerships' | 'creators'
}

export default function PlatformListFeaturesSection({ variant = 'partnerships' }: PlatformListFeaturesSectionProps) {
  const features = variant === 'creators' ? creatorFeatures : partnershipFeatures
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section className={`section ${styles.listFeaturesSection}`} ref={sectionRef}>
      <div id="Platform" className={styles.paddingSection}>
        <div className="container">
          {/* Header */}
          {/* <div className={styles.centerText}>
            <div className={`${styles.titleHolder} ${styles.fadeIn} ${isVisible ? styles.visible : ''}`}>
              <h2>{variant === 'creators' ? 'Why Create on Wano' : 'Why Partner With Wano'}</h2>
            </div>
            <div className={`${styles.paragraphHolder} ${styles.fadeIn} ${isVisible ? styles.visible : ''}`} style={{ animationDelay: '0.1s' }}>
              <p>
              {variant === 'creators'
                ? 'Wano is building a creator-first platform with a fast-growing community. Join creators who value cultural expression, authenticity, and meaningful connection.'
                : 'Wano is building a cultural and technology ecosystem with a fast-growing community. We work with partners who value long-term alignment and meaningful collaboration.'}
              </p>
            </div>
          </div> */}

          {/* Feature List */}
          <div className={styles.listWrapper}>
            {features.map((feature, index) => (
              <div key={index} className={styles.listFeature} style={{ flexDirection: feature.imageFirst ? 'row-reverse' : 'row' }}>
                {/* Content */}
                <div className={styles.listContent}>
                  <div className={styles.listContentWrapper}>
                    <div className={`${styles.fadeIn} ${isVisible ? styles.visible : ''}`} style={{ animationDelay: `${0.2 + index * 0.3}s` }}>
                      <h3>{feature.title}</h3>
                    </div>
                    <div className={`${styles.fadeIn} ${isVisible ? styles.visible : ''}`} style={{ animationDelay: `${0.3 + index * 0.3}s` }}>
                      <p>{feature.description}</p>
                      <p className={styles.listTagline}>
                        Experience Wano across Africa, the Diaspora, and the Caribbean.
                      </p>
                      <div className={styles.listBadgesRow}>
                        <a 
                          href="https://play.google.com/store/apps/details?id=com.wano.app&hl=en&gl=US" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className={heroStyles.storeBadge}
                        >
                          <svg viewBox="0 0 180 54" className={heroStyles.storeBadgeSvg}>
                            <rect width="180" height="54" rx="8" fill="#000"/>
                            <path d="M17.5 12.5L31.2 27l-13.7 14.5c-.4-.4-.7-1-.7-1.8V14.3c0-.8.3-1.4.7-1.8z" fill="url(#playGradient1)"/>
                            <path d="M35.2 23l-4-4-13.7 8 13.7 8 4-4c1.1-.6 1.8-1.8 1.8-3s-.7-2.4-1.8-3z" fill="url(#playGradient2)"/>
                            <path d="M17.5 41.5L31.2 27l4 4-15.9 9.2c-.6.3-1.2.4-1.8.3z" fill="url(#playGradient3)"/>
                            <path d="M17.5 12.5c.6-.1 1.2 0 1.8.3l15.9 9.2-4 4-13.7-13.5z" fill="url(#playGradient4)"/>
                            <defs>
                              <linearGradient id="playGradient1" x1="17" y1="12" x2="31" y2="27" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#00C3FF"/>
                                <stop offset="1" stopColor="#00E0A0"/>
                              </linearGradient>
                              <linearGradient id="playGradient2" x1="31" y1="19" x2="37" y2="27" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#FFD700"/>
                                <stop offset="1" stopColor="#FF9500"/>
                              </linearGradient>
                              <linearGradient id="playGradient3" x1="17" y1="41" x2="35" y2="27" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#FF3A44"/>
                                <stop offset="1" stopColor="#FF6B6B"/>
                              </linearGradient>
                              <linearGradient id="playGradient4" x1="17" y1="12" x2="35" y2="27" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#00D26A"/>
                                <stop offset="1" stopColor="#00E0A0"/>
                              </linearGradient>
                            </defs>
                            <text x="90" y="22" fill="#fff" fontSize="9" fontFamily="sans-serif" textAnchor="middle">GET IT ON</text>
                            <text x="90" y="38" fill="#fff" fontSize="16" fontWeight="500" fontFamily="sans-serif" textAnchor="middle">Google Play</text>
                          </svg>
                        </a>
                        <a 
                          href="https://apps.apple.com/pk/app/wano-app/id6753104927" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className={heroStyles.storeBadge}
                        >
                          <svg viewBox="0 0 180 54" className={heroStyles.storeBadgeSvg}>
                            <rect width="180" height="54" rx="8" fill="#000"/>
                            <path d="M32.5 27.2c0-3.8 3.1-5.6 3.2-5.7-1.8-2.6-4.5-2.9-5.5-3-2.3-.2-4.6 1.4-5.8 1.4-1.2 0-3-1.4-5-1.3-2.5 0-4.9 1.5-6.2 3.8-2.7 4.6-.7 11.5 1.9 15.2 1.3 1.8 2.8 3.9 4.8 3.8 1.9-.1 2.7-1.2 5-1.2 2.3 0 3 1.2 5 1.2 2.1 0 3.4-1.9 4.6-3.7 1.5-2.1 2.1-4.2 2.1-4.3-.1 0-4-1.5-4.1-6.2zm-3.8-11.4c1.1-1.3 1.8-3.1 1.6-4.9-1.5.1-3.4 1-4.5 2.3-1 1.1-1.8 2.9-1.6 4.7 1.7.1 3.4-.9 4.5-2.1z" fill="#fff"/>
                            <text x="90" y="22" fill="#fff" fontSize="9" fontFamily="sans-serif" textAnchor="middle">Download on the</text>
                            <text x="90" y="38" fill="#fff" fontSize="16" fontWeight="500" fontFamily="sans-serif" textAnchor="middle">App Store</text>
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Image */}
                <div className={styles.listImageHolder}>
                  <div className={styles.listBackgroundGradient} />
                  <Image
                    src={feature.foregroundImage}
                    alt={feature.title}
                    width={1692}
                    height={768}
                    className={`${styles.listImage} ${styles.fadeIn} ${isVisible ? styles.visible : ''}`}
                    style={{ animationDelay: `${0.5 + index * 0.3}s` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './PhoneFeaturesSection.module.css'

const partnershipFeatures = [
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 11l18-5v12L3 14v-3z" />
        <path d="M11.6 16.8a3 3 0 11-5.8-1.6" />
      </svg>
    ),
    title: 'Brand & Campaign Partnerships',
    description: 'Creator-led campaigns and culturally relevant activations designed for real engagement.',
    bullets: ['Sponsored creator campaigns', 'Branded challenges', 'Regional activations'],
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: 'Community & Cultural Collaborations',
    description: 'Programs and partnerships that support creators, culture, and community engagement.',
    bullets: ['Workshops and creator training', 'Events and community programs', 'Youth engagement initiatives'],
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    title: 'Strategic & Technology Partnerships',
    description: 'Long-term collaborations that strengthen distribution, tools, and platform growth.',
    bullets: ['Integrations and tooling', 'Distribution partnerships', 'Ecosystem development'],
  },
]

const creatorFeatures = [
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 11l18-5v12L3 14v-3z" />
        <path d="M11.6 16.8a3 3 0 11-5.8-1.6" />
      </svg>
    ),
    title: 'Music Creators',
    description: 'Share your sound with a global audience. From Afrobeat to dancehall—Wano connects your music with listeners who get it.',
    bullets: ['Upload and share original tracks', 'Remix and collaborate', 'Grow your following across regions'],
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="23 7 16 12 23 17 23 7" />
        <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
      </svg>
    ),
    title: 'Video Creators',
    description: 'Create short-form videos that resonate. Cultural storytelling, trends, and authenticity—all in one place.',
    bullets: ['Short-form video content', 'Trending sounds and challenges', 'Engaged community interaction'],
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: 'Cultural Storytellers',
    description: 'Share your heritage, stories, and perspective. Connect with a diaspora that values authenticity and roots.',
    bullets: ['Cultural content and storytelling', 'Community and events', 'Cross-border audience reach'],
  },
]

interface PhoneFeaturesSectionProps {
  variant?: 'partnerships' | 'creators'
}

export default function PhoneFeaturesSection({ variant = 'partnerships' }: PhoneFeaturesSectionProps) {
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
    <section className={`section light-blue ${styles.phoneFeaturesSection}`} ref={sectionRef}>
      <div id="Product" className={styles.paddingSection}>
        <div className="container">
          {/* Header */}
          <div className={styles.centerText}>
            <div className={`${styles.titleHolder} ${styles.fadeIn} ${isVisible ? styles.visible : ''}`}>
              <h2>{variant === 'creators' ? 'How Creators Grow on Wano' : 'Partnership Types'}</h2>
            </div>
            <div className={`${styles.paragraphHolder} ${styles.fadeIn} ${isVisible ? styles.visible : ''}`} style={{ animationDelay: '0.1s' }}>
              <p>
              {variant === 'creators'
                ? 'Whether you make music, create videos, or tell stories—Wano gives you the tools and community to reach audiences across Africa, the Diaspora, and the Caribbean.'
                : 'Take control of your feed with access to trending creators, sounds, and stories across regions. Wano gives you a personalized experience rooted in culture and built for discovery.'}
              </p>
            </div>
          </div>

          {/* Phone Features Grid */}
          <div className={styles.phoneFeatures}>
            {features.map((feature, index) => (
              <div key={index} className={styles.phoneFeature}>
                <div className={styles.phoneFeatureWrapper}>
                  <div className={styles.phoneFeatureContent}>
                    <div className={`${styles.cardIcon} ${styles.fadeIn} ${isVisible ? styles.visible : ''}`} style={{ animationDelay: `${0.2 + index * 0.2}s` }}>
                      {feature.icon}
                    </div>
                    <div className={`${styles.fadeIn} ${isVisible ? styles.visible : ''}`} style={{ animationDelay: `${0.25 + index * 0.2}s` }}>
                      <div className={styles.phoneFeatureTitle}>{feature.title}</div>
                    </div>
                    <div className={`${styles.fadeIn} ${isVisible ? styles.visible : ''}`} style={{ animationDelay: `${0.3 + index * 0.2}s` }}>
                      <p className={styles.phoneFeatureSubtitle}>{feature.description}</p>
                    </div>
                    <ul className={`${styles.bulletList} ${styles.fadeIn} ${isVisible ? styles.visible : ''}`} style={{ animationDelay: `${0.4 + index * 0.2}s` }}>
                      {feature.bullets.map((bullet, bulletIndex) => (
                        <li key={bulletIndex}>
                          <span className={styles.bulletDot} />
                          <span className={styles.bulletText}>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                {index === 0 && (
                  <>
                    <div className={`${styles.glow} ${styles.topLeft}`} />
                    <div className={`${styles.glow} ${styles.botRight}`} />
                  </>
                )}
                {(index === 1 || index === 2) && <div className={`${styles.glow} ${styles.botRight}`} />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

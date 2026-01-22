'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import styles from './PhoneFeaturesSection.module.css'

const features = [
  {
    title: 'Catch Trends on the Go',
    subtitle: 'Instant Feeds Anytime, Anywhere',
    screenImage: '/images/Feature1.webp',
  },
  {
    title: 'Own the Vibe',
    subtitle: 'Flow with your culture\'s beat.',
    screenImage: '/images/Feature2.webp',
  },
]

export default function PhoneFeaturesSection() {
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
              <h2>Discover the Vibe Your Way</h2>
            </div>
            <div className={`${styles.paragraphHolder} ${styles.fadeIn} ${isVisible ? styles.visible : ''}`} style={{ animationDelay: '0.1s' }}>
              <p>
              We put you in control of the feed. With instant access to trending challenges and tools to remix the hottest sounds, Wano redefines how you experience the culture.
              </p>
            </div>
          </div>

          {/* Phone Features Grid */}
          <div className={styles.phoneFeatures}>
            {features.map((feature, index) => (
              <div key={index} className={styles.phoneFeature}>
                <div className={styles.phoneFeatureWrapper}>
                  <div className={styles.phoneFeatureContent}>
                    <div className={`${styles.fadeIn} ${isVisible ? styles.visible : ''}`} style={{ animationDelay: `${0.2 + index * 0.2}s` }}>
                      <div className={styles.phoneFeatureTitle}>{feature.title}</div>
                    </div>
                    <div className={`${styles.fadeIn} ${isVisible ? styles.visible : ''}`} style={{ animationDelay: `${0.3 + index * 0.2}s` }}>
                      <p className="paragraph-xl">{feature.subtitle}</p>
                    </div>
                  </div>
                  <div className={`${styles.featurePhoneHolder} ${styles.fadeIn} ${isVisible ? styles.visible : ''}`} style={{ animationDelay: `${0.4 + index * 0.2}s` }}>
                    <Image
                      src={feature.screenImage}
                      alt={feature.title}
                      width={280}
                      height={560}
                      className={styles.featureImage}
                    />
                  </div>
                </div>
                {index === 0 && (
                  <>
                    <div className={`${styles.glow} ${styles.topLeft}`} />
                    <div className={`${styles.glow} ${styles.botRight}`} />
                  </>
                )}
                {index === 1 && <div className={`${styles.glow} ${styles.botRight}`} />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

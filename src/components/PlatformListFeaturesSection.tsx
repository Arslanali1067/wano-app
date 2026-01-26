'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import styles from './ListFeaturesSection.module.css'

// Original image URLs from HTML
const images = {
  arrowIcon: 'https://wubflow-shield.nocodexport.dev/6508308b2a1ae17b91dac2b6/65083f705fec0efcb9248de2_Arrow%20Icon.svg',
  listImage: 'https://wubflow-shield.nocodexport.dev/6508308b2a1ae17b91dac2b6/650841f620e5747d9ec17538_List%20Image.webp',
}

const features = [
  {
    title: 'Discover Without Borders',
    description: "Wano's discovery system connects creators and audiences across regions. Explore content from creators you follow and discover new voices shaping culture across continents.",
    foregroundImage: '/images/image2.webp',
    imageFirst: false,
    checkItems: [
      "Personalized \"For You\" and \"Following\" feeds",
      "Cross-regional content visibility",
      "Trending creators and sounds",
      "Real-time discovery experience"
    ],
  },
  {
    title: 'Made for Us, By Us',
    description: "Wano isn't just another video app—it's the first platform built to reflect Africa's true voice. We prioritize community over algorithms and culture over clicks. Here is how we do it:",
    foregroundImage: '/images/image1.webp',
    imageFirst: true,
    checkItems: [
      "Every feature is rooted in our tribes, languages, and traditions.",
      "See what's trending in Lagos, Kigali, or your local neighborhood.",
      "Creative tools designed to celebrate our specific rhythms and styles.",
      "It's not about being perfect or going viral; it's about being seen, being real, and being proud.",
    ],
  },
]

export default function PlatformListFeaturesSection() {
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
          <div className={styles.centerText}>
            <div className={`${styles.titleHolder} ${styles.fadeIn} ${isVisible ? styles.visible : ''}`}>
              <h2>The Wano Platform</h2>
            </div>
            <div className={`${styles.paragraphHolder} ${styles.fadeIn} ${isVisible ? styles.visible : ''}`} style={{ animationDelay: '0.1s' }}>
              <p>
                A short-form video experience built for creators and powered by scalable technology — connecting Africa, the Diaspora, the Caribbean, and beyond.
              </p>
            </div>
          </div>

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
                    </div>
                    {feature.checkItems.length > 0 && (
                      <div className={styles.list}>
                        <ul className={styles.listUnstyled}>
                          {feature.checkItems.map((item, itemIndex) => (
                            <li key={itemIndex}>
                              <div className={`${styles.listItem} ${styles.fadeIn} ${isVisible ? styles.visible : ''}`} style={{ animationDelay: `${0.4 + index * 0.3 + itemIndex * 0.1}s` }}>
                                <div className={styles.listCheck}>
                                  <Image
                                    src={images.arrowIcon}
                                    alt="Check"
                                    width={16}
                                    height={16}
                                    className={styles.listCheckIcon}
                                  />
                                </div>
                                <p className={styles.listParagraph}>{item}</p>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
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

'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import styles from './ListFeaturesSection.module.css'

// Original image URLs from HTML
const images = {
  arrowIcon: 'https://wubflow-shield.nocodexport.dev/6508308b2a1ae17b91dac2b6/65083f705fec0efcb9248de2_Arrow%20Icon.svg',
  listImage: 'https://wubflow-shield.nocodexport.dev/6508308b2a1ae17b91dac2b6/650841f620e5747d9ec17538_List%20Image.webp',
}

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
          <div className={styles.centerText}>
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

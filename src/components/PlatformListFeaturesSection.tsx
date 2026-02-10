'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import styles from './ListFeaturesSection.module.css'
import heroStyles from './HeroSection.module.css'

// Reuse the same arrow icon as the home ListFeaturesSection for list items
const images = {
  arrowIcon:
    'https://wubflow-shield.nocodexport.dev/6508308b2a1ae17b91dac2b6/65083f705fec0efcb9248de2_Arrow%20Icon.svg',
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

const aboutFeatures = [
  {
    title: 'Our Mission',
    description:
      'Wano is a global short-form video platform rooted in Afrocentric culture, connecting Africa, the Diaspora, the Caribbean, and communities worldwide shaped by its influence.',
    foregroundImage: '/images/About-1.webp',
    imageFirst: false,
    checkItems: [
      'Enable cultural discovery across Africa, the Diaspora, and the Caribbean',
      'Give creators meaningful visibility and opportunities to grow',
      'Connect communities globally through short-form video and storytelling',
      'Build a platform designed for long-term impact, not just trends',
    ],
  },
  {
    title: 'Why Wano',
    description:
      'Africa is home to the world’s youngest population, and Afrocentric culture continues to shape global trends across music, fashion, language, and everyday life.',
    foregroundImage: '/images/About-2.webp',
    imageFirst: true,
    checkItems: [
      'Put culture at the center of how content is discovered and shared',
      'Give underrepresented creators a platform built for their voices',
      'Connect Africa, the Diaspora, and the Caribbean through digital storytelling',
      'Help shape the future of global culture, not just participate in it',
    ],
  },
  {
    title: 'More Than an App',
    description:
      'Wano is building an ecosystem designed for long-term cultural exchange and creator growth. It starts with short-form video, and expands through community, partnerships, and platform development.',
    foregroundImage: '/images/About-3.webp',
    imageFirst: false,
    checkItems: [
      'A global discovery experience rooted in culture',
      'A growing creator community across continents',
      'A platform designed for long-term scale',
      'Build a platform designed for long-term impact, not just trends',
    ],
  },
  {
    title: 'What We Stand For',
    description:
      'Wano is built on a clear set of values that guide how we design, grow, and partner. These principles shape how we support creators, represent culture, and build a platform meant to last.',
    foregroundImage: '/images/About-4.webp',
    imageFirst: true,
    checkItems: [
      'Culture First — Identity and heritage are not a category; they are the foundation of everything we build.',
      'Global Inclusion — Rooted in Afrocentric influence and open to voices from around the world.',
      'Creator Growth — Designed to give creators early visibility and long-term opportunity.',
      'Built for the Future — A platform developed intentionally, sustainably, and with long-term impact in mind.',
    ],
  },
]

interface PlatformListFeaturesSectionProps {
  variant?: 'partnerships' | 'creators' | 'about'
  hideHeader?: boolean
}

export default function PlatformListFeaturesSection({
  variant = 'partnerships',
  hideHeader = false,
}: PlatformListFeaturesSectionProps) {
  const features =
    variant === 'creators'
      ? creatorFeatures
      : variant === 'about'
      ? aboutFeatures
      : partnershipFeatures
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
          {!hideHeader && (
            <div className={styles.centerText}>
              <div
                className={`${styles.titleHolder} ${styles.fadeIn} ${
                  isVisible ? styles.visible : ''
                }`}
              >
                <h2>
                  {variant === 'creators' ? 'Why Create on Wano' : 'Why Partner With Wano'}
                </h2>
              </div>
              <div
                className={`${styles.paragraphHolder} ${styles.fadeIn} ${
                  isVisible ? styles.visible : ''
                }`}
                style={{ animationDelay: '0.1s' }}
              >
                <p>
                  {variant === 'creators'
                    ? 'Wano gives creators a space built around culture, community, and real connection—so your stories travel further without losing their roots.'
                    : 'Wano connects partners to a fast-growing cultural ecosystem across Africa and the diaspora, turning authentic stories into lasting relationships with the communities that move global culture.'}
                </p>
              </div>
            </div>
          )}

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
                    <div
                      className={`${styles.fadeIn} ${isVisible ? styles.visible : ''}`}
                      style={{ animationDelay: `${0.3 + index * 0.3}s` }}
                    >
                      <p>{feature.description}</p>
                    </div>
                    {/* Match the home ListFeaturesSection content layout with check list items */}
                    <div className={styles.list}>
                      <ul className={styles.listUnstyled}>
                        {feature.checkItems?.map((item, itemIndex) => (
                          <li key={itemIndex}>
                            <div
                              className={`${styles.listItem} ${styles.fadeIn} ${isVisible ? styles.visible : ''}`}
                              style={{
                                animationDelay: `${0.4 + index * 0.3 + itemIndex * 0.1}s`,
                              }}
                            >
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

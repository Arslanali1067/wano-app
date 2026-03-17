'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './StatsSection.module.css'

const stats = [
  {
    number: 'Growing Daily',
    description: 'New videos and stories shared every day across multiple regions.',
  },
  {
    number: 'Always Active',
    description: "A cultural feed connecting creators across time zones and continents.",
  },
  {
    number: '35k+ Installs',
    description: "A fast-growing global community building from the ground up.",
  },
  {
    number: 'Cultural Sounds',
    description: 'From Afrobeats to Amapiano and beyond — discover the sounds shaping global culture.',
  },
]

export default function StatsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="Stats" className={`section ${styles.statsSection}`} ref={sectionRef}>
      <div className="container">
        {/* CTA Banner */}
        <div className={styles.ctaHolder}>
          <div className={styles.ctaContentWrapper}>
            <div className={`${styles.fadeIn} ${isVisible ? styles.visible : ''}`}>
              <h2 className={styles.heading03Style}>
              Wano is a global short-form video platform rooted in Afrocentric culture and connected across Africa, the Diaspora, and the Caribbean. Share your story, discover new voices, and grow with a community in motion.
              </h2>
            </div>
          </div>
          <div className={styles.glow02} />
          <div className={styles.glow03} />
        </div>

        {/* Stats Grid */}
        <div className={styles.statsHolder}>
          <div className={styles.statsContainer}>
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`${styles.stats} ${styles.fadeIn} ${isVisible ? styles.visible : ''}`}
                style={{ animationDelay: `${0.3 + index * 0.1}s` }}
              >
                <div className={styles.statsNumber}>{stat.number}</div>
                <div className={styles.statsParagraph}>{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

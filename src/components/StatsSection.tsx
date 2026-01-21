'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './StatsSection.module.css'

const stats = [
  {
    number: '5k+ Daily Stories',
    description: 'Over 10,000 new videos and stories shared every single day.',
  },
  {
    number: '24/7 Nonstop Vibes',
    description: "A cultural feed that never sleeps, streaming from Lagos to London.",
  },
  {
    number: '14k+ Creators',
    description: "Join a rapidly growing community of over 14k unique voices.",
  },
  {
    number: '50+ Music Genres',
    description: 'From Afrobeats to Amapiano, access a massive library of sounds.',
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
    <section className={`section ${styles.statsSection}`} ref={sectionRef}>
      <div className="container">
        {/* CTA Banner */}
        <div className={styles.ctaHolder}>
          <div className={styles.ctaContentWrapper}>
            <div className={`${styles.fadeIn} ${isVisible ? styles.visible : ''}`}>
              <h2 className={styles.heading03Style}>
              Wano is the short-form video app rooted in Afrocentric culture and built for the world.
              Share your story, remix what inspires you, and connect with creators everywhere.
              </h2>
            </div>
            <div className={`${styles.fadeIn} ${isVisible ? styles.visible : ''}`} style={{ animationDelay: '0.2s' }}>
              <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" className="button video">
                Watch Video
              </a>
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

'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './StatsSection.module.css'

const stats = [
  {
    number: '10,000+',
    description: 'Spark offers a staggering selection of over 10,000',
  },
  {
    number: '24/7',
    description: "Enjoy the thrill of live DJ mixes around the clock with Spark's 24/7 streaming service.",
  },
  {
    number: '1 Million',
    description: "Dive deep into music discovery with Spark's exclusive",
  },
  {
    number: '50 +',
    description: 'Providing instant song translations in 50 different languages',
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
                Embrace the Melody, Begin Your Extraordinary Musical Journey with Spark Today!
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

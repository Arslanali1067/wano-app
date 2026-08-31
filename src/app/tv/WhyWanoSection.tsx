'use client'

import { useState, useEffect, useRef } from 'react'
import styles from './TvPage.module.css'

interface WhyPillar {
  icon: string
  title: string
  description: string
  highlight?: string
}

const whyPillars: WhyPillar[] = [
  {
    icon: '🌍',
    title: 'Reach Audiences Across Africa & the Diaspora',
    description:
      'Connect directly with engaged cinema lovers across the African continent and diaspora hubs worldwide — from Lagos and Nairobi to London, Bahia, Paris, Toronto, and New York.',
    highlight: 'Global Reach',
  },
  {
    icon: '⚡',
    title: 'Get Discovered Inside the Wano Ecosystem',
    description:
      'Benefit from deep platform integration across Wano’s cultural network, mobile app audience, and creator community to maximize discovery and organic engagement.',
    highlight: 'High Visibility',
  },
  {
    icon: '🛡️',
    title: 'Retain 100% Ownership of Your Work',
    description:
      'You maintain full intellectual property and copyright of your film. Submitting your film for consideration never transfers your copyright to Wano.',
    highlight: 'Your IP Stays Yours',
  },
  {
    icon: '⚖️',
    title: 'Transparent Licensing & Creator Terms',
    description:
      'No surprise terms or rights grabbing. If selected, clear non-exclusive distribution and licensing terms are discussed and agreed upon with you before your film appears on Wano TV.',
    highlight: 'Agreed Upfront',
  },
  {
    icon: '📣',
    title: 'Dedicated Wano Promotional Support',
    description:
      'Selected titles receive custom promotional backing — including featured platform banners, editorial highlights, social media campaigns, and dedicated filmmaker spotlight interviews.',
    highlight: 'Marketing Backing',
  },
  {
    icon: '🚀',
    title: 'Build an Audience Beyond Traditional Distribution',
    description:
      'Break free from the constraints of traditional studio gatekeeping and festival circuit exclusivity with direct streaming access to an eager global audience.',
    highlight: 'No Bottlenecks',
  },
]

export default function WhyWanoSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="why-wano-tv" className={styles.whySection} ref={sectionRef}>
      <div className="container">
        {/* Section Header */}
        <div className={`${styles.sectionHeader} ${styles.fadeIn} ${isVisible ? styles.visible : ''}`}>
          <div className={styles.sectionBadge}>
            <span className={styles.sectionBadgeDot} />
            <span>THE FILMMAKER PROPOSITION</span>
          </div>
          <h2 className={styles.sectionTitle}>
            Why <span className={styles.gradientText}>Wano TV?</span>
          </h2>
          <p className={styles.sectionSubtitle}>
            We are building a new screen for African and diaspora storytelling — designed from the ground up to empower filmmakers with audience reach, creative respect, and transparent partnerships.
          </p>
        </div>

        {/* 6 Core Value Pillars */}
        <div className={styles.whyPillarsGrid}>
          {whyPillars.map((pillar, idx) => (
            <div
              key={pillar.title}
              className={`${styles.whyCard} ${styles.fadeIn} ${isVisible ? styles.visible : ''}`}
              style={{ animationDelay: `${0.1 + idx * 0.1}s` }}
            >
              <div className={styles.whyCardHeader}>
                <div className={styles.whyIcon}>{pillar.icon}</div>
                {pillar.highlight && (
                  <span className={styles.whyPillTag}>{pillar.highlight}</span>
                )}
              </div>
              <h3 className={styles.whyCardTitle}>{pillar.title}</h3>
              <p className={styles.whyCardDesc}>{pillar.description}</p>
            </div>
          ))}
        </div>

        {/* PROMINENT POSITIONING BANNER: No Gatekeepers */}
        <div
          className={`${styles.manifestoBanner} ${styles.fadeIn} ${isVisible ? styles.visible : ''}`}
          style={{ animationDelay: '0.4s' }}
        >
          <div className={styles.manifestoGlow} />
          <div className={styles.manifestoContent}>
            <div className={styles.manifestoTag}>
              <span>✦</span> RADICAL CREATOR ACCESS
            </div>
            <h3 className={styles.manifestoTitle}>
              No Gatekeepers. No Hollywood Pedigree Needed.
            </h3>
            <p className={styles.manifestoText}>
              Whether this is your debut independent short, an intimate grassroots documentary, or an acclaimed festival film, our programming team evaluates every single submission on story, vision, and heart — not studio pedigree or industry connections.
            </p>
            <div className={styles.manifestoMetaRow}>
              <div className={styles.manifestoMetaItem}>
                <span className={styles.metaIcon}>✓</span>
                <span>100% Free Submission</span>
              </div>
              <div className={styles.manifestoMetaItem}>
                <span className={styles.metaIcon}>✓</span>
                <span>Evaluated on Narrative Craft</span>
              </div>
              <div className={styles.manifestoMetaItem}>
                <span className={styles.metaIcon}>✓</span>
                <span>Open to All Formats & Lengths</span>
              </div>
            </div>
          </div>
        </div>

        {/* PLAIN RIGHTS & OWNERSHIP GUARANTEE */}
        <div
          className={`${styles.plainRightsCard} ${styles.fadeIn} ${isVisible ? styles.visible : ''}`}
          style={{ animationDelay: '0.5s' }}
        >
          <div className={styles.plainRightsIcon}>🛡️</div>
          <div className={styles.plainRightsText}>
            <h4 className={styles.plainRightsTitle}>Plain Rights Guarantee</h4>
            <p className={styles.plainRightsQuote}>
              &ldquo;You keep ownership of your film. Submission does not transfer copyright to Wano. If selected, distribution and licensing terms are agreed with you before your film appears on Wano TV.&rdquo;
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

'use client'

import { useState, useEffect, useRef } from 'react'
import styles from './TvPage.module.css'

interface CategoryItem {
  id: string
  title: string
  formatTag: string
  tagColor: 'green' | 'orange' | 'purple' | 'blue'
  shortSummary: string
  runtimeHint: string
  iconSvg: string
}

const categoriesData: CategoryItem[] = [
  {
    id: 'short-films',
    title: 'Short Films',
    formatTag: 'Narrative Fiction',
    tagColor: 'green',
    shortSummary:
      'Punchy, emotional, and unforgettable cinematic stories across drama, thriller, sci-fi, comedy, and artistic animation.',
    runtimeHint: '5 to 40 mins',
    iconSvg: '🎬',
  },
  {
    id: 'documentaries',
    title: 'Documentaries',
    formatTag: 'Non-Fiction & Impact',
    tagColor: 'orange',
    shortSummary:
      'Investigative portraits, grassroots impact stories, climate resilience, and chronicles of African innovators and cultural icons.',
    runtimeHint: 'Short & Feature length',
    iconSvg: '📽️',
  },
  {
    id: 'cultural-stories',
    title: 'Cultural Stories',
    formatTag: 'Heritage & Modern Folklore',
    tagColor: 'green',
    shortSummary:
      'Reimagined folklore, ancestral traditions, indigenous rites, and contemporary urban adaptations of African heritage.',
    runtimeHint: 'Shorts & Features',
    iconSvg: '🌍',
  },
  {
    id: 'human-interest',
    title: 'Human-Interest Stories',
    formatTag: 'Character Studies',
    tagColor: 'blue',
    shortSummary:
      'Intimate character-driven journeys highlighting resilience, everyday heroes, unexpected bonds, and personal triumphs.',
    runtimeHint: 'Any length',
    iconSvg: '💫',
  },
  {
    id: 'independent-films',
    title: 'Independent Films',
    formatTag: 'Visionary Cinema',
    tagColor: 'orange',
    shortSummary:
      'Boundary-pushing indie cinema unconstrained by studio formulas, driven by bold directorial voices and raw craft.',
    runtimeHint: 'Micro to Mid Budget',
    iconSvg: '🎥',
  },
  {
    id: 'music-creative',
    title: 'Music & Creative Films',
    formatTag: 'Sound & Visual Culture',
    tagColor: 'purple',
    shortSummary:
      'Visual albums, choreographic dance films, sound culture documentaries, and musical retrospectives across Afrobeats, Amapiano, Jazz, and more.',
    runtimeHint: 'Shorts & Features',
    iconSvg: '🎵',
  },
  {
    id: 'travel-place',
    title: 'Travel & Place-Based Stories',
    formatTag: 'Cities & Landscapes',
    tagColor: 'blue',
    shortSummary:
      'Atmospheric portraits exploring bustling creative scenes in African cities and vibrant diaspora link points across the world.',
    runtimeHint: 'Shorts & Series',
    iconSvg: '🗺️',
  },
]

const pipelineSteps = [
  {
    stepNumber: '01',
    phase: 'SUBMIT',
    title: 'Submit Screener Link',
    timeframe: 'Instant Receipt • 100% Free',
    icon: '🔗',
    desc: 'Share your private viewing link (Vimeo, YouTube unlisted, or Google Drive) through our clean form. No master video file upload is required at this stage.',
  },
  {
    stepNumber: '02',
    phase: 'REVIEW',
    title: 'Editorial Screening',
    timeframe: 'Private Evaluation',
    icon: '👁️',
    desc: 'Our curation committee privately watches and evaluates your film for narrative resonance, cultural nuance, and storytelling craft.',
  },
  {
    stepNumber: '03',
    phase: 'DECISION',
    title: 'Selection Decision',
    timeframe: '14–30 Days Response Window',
    icon: '📩',
    desc: 'Selected submissions will normally hear directly from our team within 14–30 days to discuss potential programming fit.',
  },
  {
    stepNumber: '04',
    phase: 'AGREEMENT',
    title: 'Rights & Licensing',
    timeframe: 'Creator-First Terms',
    icon: '📝',
    desc: 'We discuss transparent, non-exclusive distribution terms and agree on everything with you before your film ever appears on Wano TV.',
  },
  {
    stepNumber: '05',
    phase: 'RELEASE',
    title: 'Wano TV Release',
    timeframe: 'Global Launch & Push',
    icon: '🚀',
    desc: 'Your film premieres to audiences across Africa and the global diaspora, accompanied by dedicated Wano promotional support and filmmaker spotlights.',
  },
]

export default function InteractiveTvSections() {
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all')
  const [isLookingVisible, setIsLookingVisible] = useState(false)
  const [isProcessVisible, setIsProcessVisible] = useState(false)
  const lookingRef = useRef<HTMLElement>(null)
  const processRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === lookingRef.current && entry.isIntersecting) {
            setIsLookingVisible(true)
          }
          if (entry.target === processRef.current && entry.isIntersecting) {
            setIsProcessVisible(true)
          }
        })
      },
      { threshold: 0.1 }
    )

    if (lookingRef.current) observer.observe(lookingRef.current)
    if (processRef.current) observer.observe(processRef.current)

    return () => observer.disconnect()
  }, [])

  const filteredCategories = categoriesData.filter((cat) => {
    if (activeCategoryFilter === 'all') return true
    if (activeCategoryFilter === 'narrative') return cat.id === 'short-films' || cat.id === 'independent-films'
    if (activeCategoryFilter === 'doc') return cat.id === 'documentaries' || cat.id === 'human-interest'
    if (activeCategoryFilter === 'culture') return cat.id === 'cultural-stories' || cat.id === 'music-creative'
    if (activeCategoryFilter === 'place') return cat.id === 'travel-place'
    return true
  })

  return (
    <>
      {/* SECTION 1: STREAMLINED CURATION CATEGORIES & ACCEPTED LENGTHS */}
      <section id="what-we-are-looking-for" className={styles.lookingForSection} ref={lookingRef}>
        <div className="container">
          <div className={`${styles.sectionHeader} ${styles.fadeIn} ${isLookingVisible ? styles.visible : ''}`}>
            <div className={styles.sectionBadge}>
              <span className={styles.sectionBadgeDot} />
              <span>PROGRAMMING FOCUS</span>
            </div>
            <h2 className={styles.sectionTitle}>
              What We’re <span className={styles.gradientText}>Looking For</span>
            </h2>
            <p className={styles.sectionSubtitle}>
              From electric short films to expansive documentaries and creative cinema, we seek completed or near-completed stories reflecting the depth and imagination of Africa and the global diaspora.
            </p>

            {/* Clear Accepted Film Lengths Banner */}
            <div className={styles.acceptedLengthsBanner}>
              <div className={styles.lengthPill}>
                <span className={styles.lengthDot}>●</span>
                <strong>Short Films:</strong> 5 to 40 mins
              </div>
              <div className={styles.lengthDivider}>•</div>
              <div className={styles.lengthPill}>
                <span className={styles.lengthDot}>●</span>
                <strong>Feature Films & Docs:</strong> 40 to 120+ mins
              </div>
              <div className={styles.lengthDivider}>•</div>
              <div className={styles.lengthPill}>
                <span className={styles.lengthDot}>●</span>
                <strong>Docuseries:</strong> Multi-part stories
              </div>
            </div>

            {/* Filter Pills */}
            <div className={styles.categoryFilterRow}>
              {[
                { id: 'all', label: 'All Categories (7)' },
                { id: 'narrative', label: 'Shorts & Indie Cinema' },
                { id: 'doc', label: 'Docs & Real Stories' },
                { id: 'culture', label: 'Culture & Sound' },
                { id: 'place', label: 'Place & Diaspora' },
              ].map((filter) => (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => setActiveCategoryFilter(filter.id)}
                  className={`${styles.filterPillBtn} ${
                    activeCategoryFilter === filter.id ? styles.filterPillActive : ''
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* STREAMLINED COMPACT CATEGORY GRID */}
          <div className={styles.compactCategoryGrid}>
            {filteredCategories.map((cat, idx) => {
              return (
                <div
                  key={cat.id}
                  className={`${styles.compactCategoryCard} ${styles.fadeIn} ${
                    isLookingVisible ? styles.visible : ''
                  }`}
                  style={{ animationDelay: `${0.08 + (idx % 4) * 0.08}s` }}
                >
                  <div className={styles.compactCardHeader}>
                    <div className={styles.compactIconWrapper}>
                      <span>{cat.iconSvg}</span>
                    </div>
                    <span
                      className={`${styles.formatTagBadge} ${
                        cat.tagColor === 'green'
                          ? styles.tagGreen
                          : cat.tagColor === 'orange'
                          ? styles.tagOrange
                          : cat.tagColor === 'purple'
                          ? styles.tagPurple
                          : styles.tagBlue
                      }`}
                    >
                      {cat.formatTag}
                    </span>
                  </div>

                  <h3 className={styles.compactCardTitle}>{cat.title}</h3>
                  <p className={styles.compactCardPitch}>{cat.shortSummary}</p>

                  <div className={styles.compactCardFooter}>
                    <span className={styles.compactRuntime}>⏱️ {cat.runtimeHint}</span>
                    <a href="#submit-film" className={styles.compactSubmitLink}>
                      <span>Submit</span>
                      <span>→</span>
                    </a>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* SECTION 2: 5-STEP FILMMAKER JOURNEY & RESPONSE PERIOD */}
      <section className={styles.processSection} ref={processRef}>
        <div className="container">
          <div className={`${styles.sectionHeader} ${styles.fadeIn} ${isProcessVisible ? styles.visible : ''}`}>
            <span className={styles.sectionPretitle}>Simple, Transparent & Creator-First</span>
            <h2 className={styles.sectionTitle}>What Happens After Submission</h2>
            <p className={styles.sectionSubtitle}>
              Here is how your film travels from screener link to streaming release on Wano TV.
            </p>
          </div>

          {/* 5-Step Visual Pipeline */}
          <div className={styles.pipeline5Grid}>
            {pipelineSteps.map((step, sIdx) => (
              <div
                key={step.stepNumber}
                className={`${styles.pipeline5Card} ${styles.fadeIn} ${isProcessVisible ? styles.visible : ''}`}
                style={{ animationDelay: `${0.1 + sIdx * 0.1}s` }}
              >
                <div className={styles.pipelineCardTop}>
                  <span className={styles.pipelineStepNum}>{step.stepNumber}</span>
                  <span className={styles.pipelinePhaseTag}>{step.phase}</span>
                </div>
                <div className={styles.pipelineIcon}>{step.icon}</div>
                <h3 className={styles.pipelineTitle}>{step.title}</h3>
                <div className={styles.pipelineTimeframe}>
                  <span className={styles.timeframeIcon}>⏱️</span>
                  <span>{step.timeframe}</span>
                </div>
                <p className={styles.pipelineDesc}>{step.desc}</p>
              </div>
            ))}
          </div>

          {/* Response Time Guarantee Box */}
          <div
            className={`${styles.responseCommitmentBanner} ${styles.fadeIn} ${isProcessVisible ? styles.visible : ''}`}
            style={{ animationDelay: '0.6s' }}
          >
            <div className={styles.responseIcon}>📬</div>
            <div className={styles.responseText}>
              <strong>Expected Response Window:</strong> Selected submissions will normally hear from our curation team within <strong>14–30 days</strong>. If your film is shortlisted, we will reach out directly to your provided email address to discuss next steps.
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

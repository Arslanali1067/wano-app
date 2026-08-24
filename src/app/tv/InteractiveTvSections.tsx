'use client'

import { useState, useEffect, useRef } from 'react'
import styles from './TvPage.module.css'

interface CategoryItem {
  id: string
  title: string
  formatTag: string
  tagColor: 'green' | 'orange' | 'purple' | 'blue'
  shortSummary: string
  description: string
  curationHighlights: string[]
  iconSvg: string
  featured?: boolean
}

const categoriesData: CategoryItem[] = [
  {
    id: 'short-films',
    title: 'Short Films',
    formatTag: 'Narrative • 5 to 40 mins',
    tagColor: 'green',
    shortSummary: 'Punchy, emotional, and unforgettable cinematic stories.',
    description:
      'We are seeking compelling narrative fiction across all genres—drama, psychological thriller, sci-fi, comedy, and artistic animation. We love films that make powerful statements and hook audiences within the first minute.',
    curationHighlights: [
      'Original screenplays & strong character arcs',
      'Distinctive visual style and creative cinematography',
      'Completed sound design and clean dialogue mix',
    ],
    iconSvg: '🎬',
    featured: true,
  },
  {
    id: 'documentaries',
    title: 'Documentaries',
    formatTag: 'Non-Fiction • Short & Feature Length',
    tagColor: 'orange',
    shortSummary: 'Real human truths, untold histories, and grassroots impact.',
    description:
      'From investigative portraits to celebrations of African innovators, climate resilience, and artistic pioneers. We champion non-fiction films that reveal untold realities and give voice to communities across Africa and the global diaspora.',
    curationHighlights: [
      'Authentic access & ethical storytelling',
      'Compelling archival or on-the-ground footage',
      'Clear narrative point of view and cultural depth',
    ],
    iconSvg: '📽️',
    featured: true,
  },
  {
    id: 'cultural-stories',
    title: 'Cultural Stories',
    formatTag: 'Heritage & Modern Folklore',
    tagColor: 'green',
    shortSummary: 'Reimagined folklore, indigenous voices, and sacred traditions.',
    description:
      'Narratives exploring ancestral traditions, mythologies, indigenous rites of passage, linguistic heritage, and contemporary urban adaptations of African cultural heritage.',
    curationHighlights: [
      'Authentic portrayal of local languages & customs',
      'Vibrant costuming, ritual, and production design',
      'Celebration of African identity across generations',
    ],
    iconSvg: '🌍',
  },
  {
    id: 'human-interest',
    title: 'Human-Interest Stories',
    formatTag: 'Character Studies • Inspiring Journeys',
    tagColor: 'blue',
    shortSummary: 'Personal triumphs, everyday heroes, and community resilience.',
    description:
      'Deeply moving character-driven stories highlighting courage, unexpected friendships, familial bonds, artistic sacrifice, and everyday people overcoming extraordinary odds.',
    curationHighlights: [
      'Deep emotional connection and raw honesty',
      'Intimate camera work and immersive pacing',
      'Universal themes of hope, family, and perseverance',
    ],
    iconSvg: '💫',
  },
  {
    id: 'independent-films',
    title: 'Independent Films',
    formatTag: 'Visionary Cinema • Micro to Mid Budget',
    tagColor: 'orange',
    shortSummary: 'Raw, boundary-pushing cinema unconstrained by studio formulas.',
    description:
      'We love filmmakers who take creative risks. Whether shot on a cinema rig or an iPhone with an incredible script, we value visionary ambition, authentic dialogue, and raw filmmaking craft.',
    curationHighlights: [
      'Bold directorial vision and stylistic voice',
      'Smart resourcefulness and gripping performances',
      'Alternative storytelling structures and fresh perspectives',
    ],
    iconSvg: '🎥',
  },
  {
    id: 'music-creative',
    title: 'Music & Creative Films',
    formatTag: 'Visual Albums • Sound Culture',
    tagColor: 'purple',
    shortSummary: 'Visual albums, dance pieces, and music retrospectives.',
    description:
      'Afrobeats, Amapiano, Highlife, Reggae, Dancehall, Jazz, and Hip-Hop culture. Audio-visual films, choreographer showcases, and documentaries chronicling musical movements.',
    curationHighlights: [
      'Immersive audio sync and spatial sound quality',
      'Dynamic editing rhythm and color grading',
      'Celebration of musical heritage and youth culture',
    ],
    iconSvg: '🎵',
  },
  {
    id: 'travel-place',
    title: 'Travel & Place-Based Stories',
    formatTag: 'Expeditions • City Profiles • Landscapes',
    tagColor: 'blue',
    shortSummary: 'Atmospheric portraits of cities, landscapes, and diaspora links.',
    description:
      'From bustling creative scenes in Lagos, Nairobi, Dakar, and Johannesburg to Caribbean coastlines and European diaspora hubs. Films that immerse viewers in the atmosphere of a place.',
    curationHighlights: [
      'High-fidelity landscape and environmental visuals',
      'Local culinary, architectural, and community color',
      'Cross-border journeys and diasporic connections',
    ],
    iconSvg: '🗺️',
  },
]

const pipelineSteps = [
  {
    stepNumber: '01',
    phase: 'INITIAL INTAKE',
    title: 'Private Screener Link',
    timeframe: 'Instant Receipt',
    icon: '🔗',
    summary:
      'Submit your private viewing link (Vimeo, YouTube, or Google Drive) through our clean form below. No master video upload is required.',
    details: [
      'Password protection fully supported for private screeners',
      'Instant automated confirmation email with reference ID',
      'No copyright transfer—your IP remains 100% yours',
    ],
  },
  {
    stepNumber: '02',
    phase: 'EDITORIAL SCREENING',
    title: 'Private Curation Review',
    timeframe: '2–3 Weeks',
    icon: '👁️',
    summary:
      'Our dedicated programming committee watches and scores every submitted film for narrative resonance, cultural nuance, and technical quality.',
    details: [
      'Watched privately by filmmakers and industry curators',
      'Evaluated across craft, pacing, vision, and cultural impact',
      'Independent and emerging voices given equal review priority',
    ],
  },
  {
    stepNumber: '03',
    phase: 'ACQUISITION & FAIR TERMS',
    title: 'Shortlisting & Licensing',
    timeframe: 'Collaborative Dialogue',
    icon: '📝',
    summary:
      'If your film is shortlisted, our acquisitions team reaches out to discuss transparent non-exclusive licensing, promotional support, and premiere schedules.',
    details: [
      'Transparent licensing terms with zero rights grabbing',
      'Marketing collateral & promotional trailer coordination',
      'Filmmaker spotlights and interview opportunities on Wano',
    ],
  },
  {
    stepNumber: '04',
    phase: 'GLOBAL PREMIERE',
    title: 'Stream on Wano TV',
    timeframe: 'Launching Sept 2026',
    icon: '🚀',
    summary:
      'Your film premieres to an engaged audience across Africa, the diaspora, and global cinema lovers on mobile and smart TV apps.',
    details: [
      'High-bitrate HD/4K streaming delivery',
      'Global audience reach across 50+ countries',
      'Dedicated category placement and promotional push',
    ],
  },
]

export default function InteractiveTvSections() {
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all')
  const [activeStep, setActiveStep] = useState<number>(0)
  const [expandedCard, setExpandedCard] = useState<string | null>('short-films')
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
      {/* SECTION 1: ENHANCED BENTO CURATION FOCUS */}
      <section id="what-we-are-looking-for" className={styles.lookingForSection} ref={lookingRef}>
        <div className="container">
          <div className={`${styles.sectionHeader} ${styles.fadeIn} ${isLookingVisible ? styles.visible : ''}`}>
            <div className={styles.sectionBadge}>
              <span className={styles.sectionBadgeDot} />
              <span>CURATION SPECTRUM</span>
            </div>
            <h2 className={styles.sectionTitle}>
              What We’re <span className={styles.gradientText}>Looking For</span>
            </h2>
            <p className={styles.sectionSubtitle}>
              From electrifying short dramas to grand diaspora documentaries, we seek original stories that reflect the depth, rhythm, and imagination of our global community.
            </p>

            {/* Filter Pills */}
            <div className={styles.categoryFilterRow}>
              {[
                { id: 'all', label: 'All Formats (7)' },
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

          {/* BENTO GRID */}
          <div className={styles.bentoGrid}>
            {filteredCategories.map((cat, idx) => {
              const isExpanded = expandedCard === cat.id
              return (
                <div
                  key={cat.id}
                  className={`${styles.bentoCard} ${cat.featured ? styles.bentoCardFeatured : ''} ${
                    isExpanded ? styles.bentoCardActive : ''
                  } ${styles.fadeIn} ${isLookingVisible ? styles.visible : ''}`}
                  style={{ animationDelay: `${0.1 + (idx % 3) * 0.15}s` }}
                  onClick={() => setExpandedCard(isExpanded ? null : cat.id)}
                >
                  {/* Card Glow Ambient */}
                  <div
                    className={
                      cat.tagColor === 'green'
                        ? styles.bentoGlowGreen
                        : cat.tagColor === 'orange'
                        ? styles.bentoGlowOrange
                        : cat.tagColor === 'purple'
                        ? styles.bentoGlowPurple
                        : styles.bentoGlowBlue
                    }
                  />

                  {/* Card Header */}
                  <div className={styles.bentoCardHeader}>
                    <div className={styles.bentoIconWrapper}>
                      <span className={styles.bentoIcon}>{cat.iconSvg}</span>
                    </div>

                    <div className={styles.bentoTagGroup}>
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
                  </div>

                  {/* Title & Pitch */}
                  <h3 className={styles.bentoTitle}>{cat.title}</h3>
                  <p className={styles.bentoPitch}>{cat.shortSummary}</p>

                  <p className={styles.bentoDescription}>{cat.description}</p>

                  {/* Highlights List */}
                  <div className={styles.highlightsContainer}>
                    <div className={styles.highlightsHeader}>Key Elements We Look For:</div>
                    <ul className={styles.highlightsList}>
                      {cat.curationHighlights.map((hl, i) => (
                        <li key={i} className={styles.highlightItem}>
                          <span className={styles.checkMarker}>✓</span>
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Card Action Hint */}
                  <div className={styles.cardFooterBar}>
                    <a href="#submit-film" className={styles.cardSubmitLink}>
                      <span>Submit In This Category</span>
                      <span>→</span>
                    </a>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Authentic Filmmakers Welcome Banner */}
          <div className={`${styles.filmmakerLetterCard} ${styles.fadeIn} ${isLookingVisible ? styles.visible : ''}`} style={{ animationDelay: '0.3s' }}>
            <div className={styles.letterStamp}>WANO TV</div>
            <div className={styles.letterContent}>
              <div className={styles.letterHeader}>
                <span className={styles.letterBadge}>OPEN PROGRAMMING INITIATIVE</span>
                <h4 className={styles.letterTitle}>
                  No Gatekeepers. No Hollywood Pedigree Needed.
                </h4>
              </div>
              <p className={styles.letterBody}>
                We do not restrict Wano TV only to established studios or film school alumni. Whether this is your first independent short or your fifth award-winning feature, our programming committee evaluates every single entry with equal attention and respect. If your story has heart, craft, and vision, it deserves a global screen.
              </p>
              <div className={styles.letterFooter}>
                <div className={styles.curatorSign}>
                  <span className={styles.curatorAvatar}>✦</span>
                  <div>
                    <strong>Wano TV Programming Committee</strong>
                    <p className={styles.curatorMeta}>Curating for Africa & The Diaspora</p>
                  </div>
                </div>
                <a href="#submit-film" className={styles.letterCtaBtn}>
                  Submit Your Screener Link
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: HOW IT WORKS / TIMELINE */}
      <section className={styles.processSection} ref={processRef}>
        <div className="container">
          <div className={`${styles.sectionHeader} ${styles.fadeIn} ${isProcessVisible ? styles.visible : ''}`}>
            <span className={styles.sectionPretitle}>Simple & Transparent</span>
            <h2 className={styles.sectionTitle}>How Curation Works</h2>
            <p className={styles.sectionSubtitle}>
              Our streamlined consideration process ensures your film is reviewed privately and evaluated with care.
            </p>
          </div>

          <div className={styles.processGrid}>
            {[
              {
                num: '01',
                title: 'Submit Screener Link',
                desc: 'Share your secure Vimeo, YouTube, or Google Drive screener link via the form below. No master video upload needed.',
              },
              {
                num: '02',
                title: 'Editorial Review',
                desc: 'The Wano TV curation committee privately evaluates your film for narrative quality, cultural depth, and storytelling artistry.',
              },
              {
                num: '03',
                title: 'Selection & Licensing',
                desc: 'If shortlisted, our acquisition team contacts you to discuss formal licensing terms, premiere plans, and creator agreements.',
              },
              {
                num: '04',
                title: 'Launch on Wano TV',
                desc: 'Your film streams to an eager audience across Africa and worldwide diaspora communities starting September 2026.',
              },
            ].map((step, sIdx) => (
              <div key={step.num} className={`${styles.processStep} ${styles.fadeIn} ${isProcessVisible ? styles.visible : ''}`} style={{ animationDelay: `${0.15 + sIdx * 0.15}s` }}>
                <span className={styles.stepNumber}>STEP {step.num}</span>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDesc}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

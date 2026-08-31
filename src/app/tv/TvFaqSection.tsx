'use client'

import { useState, useRef, useEffect } from 'react'
import styles from './TvPage.module.css'

interface FaqItem {
  id: string
  category: 'rights' | 'submissions' | 'technical' | 'distribution'
  question: string
  answer: string
  highlights?: string[]
}

const faqData: FaqItem[] = [
  {
    id: 'free-submission',
    category: 'submissions',
    question: 'Is there any submission fee?',
    answer:
      'No. Submitting your film to Wano TV is 100% free. We do not charge submission fees, reading fees, or review fees of any kind.',
    highlights: ['Zero submission fees', 'Open to all independent filmmakers worldwide'],
  },
  {
    id: 'film-lengths',
    category: 'submissions',
    question: 'What film lengths are accepted on Wano TV?',
    answer:
      'Wano TV is dedicated to full-form cinematic storytelling, distinctly separated from short-form social video feeds. We accept:\n\n• Short Films: 5 to 40 minutes\n• Feature-Length Films: 40 to 120+ minutes\n• Documentaries: Both short form and feature length\n• Docuseries / Limited Series: Multi-part episodes (10–60 mins per episode)',
    highlights: ['Shorts: 5–40 mins', 'Features & Docs: 40–120+ mins', 'Series & Visual Albums'],
  },
  {
    id: 'youtube-web-films',
    category: 'submissions',
    question: 'Can I submit a film that is already on YouTube, Vimeo, or social media?',
    answer:
      'Yes. If you own or control the rights to your film, existing availability on YouTube or Vimeo does not disqualify your film from consideration for Wano TV. However, please inform us of existing distribution arrangements in your submission.',
  },
  {
    id: 'festival-releases',
    category: 'submissions',
    question: 'Can I submit a film that has already screened at festivals or on TV?',
    answer:
      'Yes, absolutely. We welcome festival selections, award winners, and broadcast alumni, as well as brand new independent films looking for their very first public audience.',
  },
  {
    id: 'response-time',
    category: 'submissions',
    question: 'When will I hear back about my submission?',
    answer:
      'Selected submissions will normally hear from our team within 14–30 days. You will receive an instant automated confirmation email upon submitting your screener link, and if shortlisted, our acquisitions team will reach out directly to your provided email address.',
    highlights: ['Instant confirmation receipt', 'Selected films contacted within 14–30 days'],
  },
  {
    id: 'copyright-ownership',
    category: 'rights',
    question: 'Who owns the copyright to my film after submission?',
    answer:
      'You keep 100% ownership of your film. Submitting your screener link does not transfer copyright or grant permanent rights to Wano. If selected, non-exclusive distribution and licensing terms are agreed upon in writing before your film ever appears on Wano TV.',
    highlights: ['100% creator copyright retention', 'No rights transfer upon submission'],
  },
  {
    id: 'exclusivity',
    category: 'distribution',
    question: 'Is distribution on Wano TV exclusive?',
    answer:
      'No. Our standard programming model is non-exclusive, allowing you the flexibility to continue submitting to festivals, licensing to other territories, or monetizing on additional platforms.',
  },
  {
    id: 'territories',
    category: 'distribution',
    question: 'Which geographic territories does Wano TV cover?',
    answer:
      'Wano TV serves audiences across the African continent and diaspora communities worldwide (UK, US, Canada, Caribbean, Latin America, Europe). If your film has existing territorial holdbacks or geo-restrictions, we can discuss geo-tailored distribution.',
  },
  {
    id: 'technical-specs',
    category: 'technical',
    question: 'What technical specifications are required for submission and final delivery?',
    answer:
      'For Initial Submission:\n• Secure streaming screener link (Vimeo, YouTube unlisted, or Google Drive)\n• No master video file upload is required during initial intake\n\nFor Final Delivery (Upon Official Selection):\n• Resolution: 1080p Full HD (1920×1080) or higher (4K is welcome, but 1080p is fully accepted)\n• Codecs / Containers: Apple ProRes 422 HQ, DNxHD, or high-bitrate MP4 / H.264 / H.265 (minimum 25 Mbps)\n• Aspect Ratios: 16:9, 2.39:1 Cinemascope, 1.85:1, or creator-intended cinematic aspect ratio\n• Audio: 48 kHz / 24-bit stereo (L/R) or 5.1 surround mix (clean dialogue levels)\n• Subtitles: Clean .SRT or .VTT files with timecodes',
    highlights: [
      'Initial: Vimeo / YouTube / Drive link',
      'Master: 1080p or 4K, ProRes or high-bitrate MP4',
      'Audio: 48kHz Stereo / 5.1',
    ],
  },
  {
    id: 'subtitles-requirement',
    category: 'technical',
    question: 'Are English subtitles required?',
    answer:
      'If your film contains dialogue in languages other than English (e.g. Yoruba, Swahili, French, Amharic, Portuguese, Patois, Zulu, etc.), English subtitles or an SRT file are required so our curation committee and global audience can engage fully with your story.',
  },
  {
    id: 'music-clearance',
    category: 'rights',
    question: 'Do I need music and archival footage clearances?',
    answer:
      'Yes. Filmmakers are responsible for ensuring that all music, sound recordings, and third-party archival footage included in the film are properly cleared, licensed, or original before public broadcast.',
  },
  {
    id: 'monetization-licensing',
    category: 'distribution',
    question: 'How does licensing and monetization work on Wano TV?',
    answer:
      'If your film is shortlisted for Wano TV, our acquisitions team will discuss transparent licensing agreements, promotional support, and launch scheduling. We believe in fair, filmmaker-friendly terms that respect independent creators.',
  },
  {
    id: 'unfinished-projects',
    category: 'submissions',
    question: 'Does Wano TV accept unfinished films, rough cuts, or script treatments?',
    answer:
      'Wano TV currently accepts finished films or picture-locked rough cuts for streaming consideration. We do not accept unproduced screenplays or early development pitches at this time.',
  },
]

export default function TvFaqSection() {
  const [openFaq, setOpenFaq] = useState<string | null>('free-submission')
  const [activeFaqFilter, setActiveFaqFilter] = useState<string>('all')
  const [isVisible, setIsVisible] = useState(false)
  const faqRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (faqRef.current) observer.observe(faqRef.current)
    return () => observer.disconnect()
  }, [])

  const toggleFaq = (id: string) => {
    setOpenFaq(openFaq === id ? null : id)
  }

  const filteredFaqs = faqData.filter((faq) => {
    if (activeFaqFilter === 'all') return true
    return faq.category === activeFaqFilter
  })

  return (
    <section id="faq-section" className={styles.faqSection} ref={faqRef}>
      <div className="container">
        {/* Section Header */}
        <div className={`${styles.sectionHeader} ${styles.fadeIn} ${isVisible ? styles.visible : ''}`}>
          <div className={styles.sectionBadge}>
            <span className={styles.sectionBadgeDot} />
            <span>FREQUENTLY ASKED QUESTIONS</span>
          </div>
          <h2 className={styles.sectionTitle}>
            Filmmaker <span className={styles.gradientText}>FAQ & Specs</span>
          </h2>
          <p className={styles.sectionSubtitle}>
            Everything you need to know about submissions, rights, technical specifications, and distribution on Wano TV.
          </p>

          {/* Filter tabs */}
          <div className={styles.faqFilterRow}>
            {[
              { id: 'all', label: 'All Questions (13)' },
              { id: 'submissions', label: 'Submissions & Deadlines' },
              { id: 'rights', label: 'Rights & Copyright' },
              { id: 'technical', label: 'Formats & Specs' },
              { id: 'distribution', label: 'Distribution & Reach' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveFaqFilter(tab.id)}
                className={`${styles.filterPillBtn} ${
                  activeFaqFilter === tab.id ? styles.filterPillActive : ''
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className={styles.faqAccordionHolder}>
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openFaq === faq.id
            return (
              <div
                key={faq.id}
                className={`${styles.faqAccordionItem} ${isOpen ? styles.faqItemOpen : ''} ${
                  styles.fadeIn
                } ${isVisible ? styles.visible : ''}`}
                style={{ animationDelay: `${0.05 + (idx % 6) * 0.05}s` }}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  className={styles.faqQuestionBtn}
                  aria-expanded={isOpen}
                >
                  <span className={styles.faqQuestionText}>{faq.question}</span>
                  <span className={styles.faqToggleIcon}>{isOpen ? '−' : '+'}</span>
                </button>

                {isOpen && (
                  <div className={styles.faqAnswerContainer}>
                    <div className={styles.faqAnswerText}>
                      {faq.answer.split('\n\n').map((para, pIdx) => (
                        <p key={pIdx} className={styles.faqParagraph}>
                          {para}
                        </p>
                      ))}
                    </div>

                    {faq.highlights && faq.highlights.length > 0 && (
                      <div className={styles.faqHighlightsBox}>
                        {faq.highlights.map((hl, hIdx) => (
                          <span key={hIdx} className={styles.faqHighlightPill}>
                            ✓ {hl}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Support Callout */}
        <div className={`${styles.faqSupportCallout} ${styles.fadeIn} ${isVisible ? styles.visible : ''}`}>
          <span>Have an additional question or studio inquiry?</span>
          <a href="mailto:tv@wanoafrica.com" className={styles.faqSupportEmail}>
            tv@wanoafrica.com →
          </a>
        </div>
      </div>
    </section>
  )
}

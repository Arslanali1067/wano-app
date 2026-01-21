'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import styles from './EasyAccessSection.module.css'

// Original image URLs from HTML
const images = {
  arrowIcon: 'https://wubflow-shield.nocodexport.dev/6508308b2a1ae17b91dac2b6/65083f705fec0efcb9248de2_Arrow%20Icon.svg',
  background03: 'https://wubflow-shield.nocodexport.dev/6508308b2a1ae17b91dac2b6/65085ae001679e38b3620b82_Background%20Image%2003.webp',
  phonesImage: 'https://wubflow-shield.nocodexport.dev/6508308b2a1ae17b91dac2b6/65085b030475aae5a19b4298_Phones%20Image.webp',
}

const checkItems = [
  'Link up from the continent to the diaspora.',
  'Real stories celebrating our heritage.',
  'Catch trends before they hit the mainstream.',
  'Tools built for your language and style.',
]

export default function EasyAccessSection() {
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
    <section className={`section ${styles.easyAccessSection}`} ref={sectionRef}>
      <div className="container">
        <div className={styles.divider} />
        
        <div className={styles.listFeature}>
          {/* Image Side */}
          <div className={styles.listImageHolder}>
            <Image
              src={images.background03}
              alt="Background"
              fill
              className={styles.listBackground}
            />
            <Image
              src={images.phonesImage}
              alt="App on Phones"
              width={1530}
              height={768}
              className={`${styles.listImage} ${styles.fadeIn} ${isVisible ? styles.visible : ''}`}
              style={{ animationDelay: '0.2s' }}
            />
          </div>

          {/* Content Side */}
          <div className={styles.listContent}>
            <div className={styles.listContentWrapper}>
              <div className={`${styles.fadeIn} ${isVisible ? styles.visible : ''}`}>
                <h3>Download Now</h3>
              </div>
              <div className={`${styles.fadeIn} ${isVisible ? styles.visible : ''}`} style={{ animationDelay: '0.1s' }}>
                <p>
                Culture isn't just something you watch—it's something you live. Discover new sounds, remix the beat, and share your unique vibe. On Wano, the rhythm is always in your hands.
                </p>
                <h6>Join the Global Movement. Start creating for free today.</h6>
              </div>
              <div className={styles.list}>
                <ul className={styles.listUnstyled}>
                  {checkItems.map((item, index) => (
                    <li key={index}>
                      <div 
                        className={`${styles.listItem} ${styles.fadeIn} ${isVisible ? styles.visible : ''}`} 
                        style={{ animationDelay: `${0.2 + index * 0.1}s` }}
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
              <div className={`${styles.listButtonHolder} ${styles.fadeIn} ${isVisible ? styles.visible : ''}`} style={{ animationDelay: '0.7s' }}>
                {/* Google Play Store Badge */}
                <a 
                  href="https://play.google.com/store" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={styles.storeBadge}
                >
                  <svg viewBox="0 0 180 54" className={styles.storeBadgeSvg}>
                    <rect width="180" height="54" rx="8" fill="#000"/>
                    <path d="M17.5 12.5L31.2 27l-13.7 14.5c-.4-.4-.7-1-.7-1.8V14.3c0-.8.3-1.4.7-1.8z" fill="url(#playGradient1b)"/>
                    <path d="M35.2 23l-4-4-13.7 8 13.7 8 4-4c1.1-.6 1.8-1.8 1.8-3s-.7-2.4-1.8-3z" fill="url(#playGradient2b)"/>
                    <path d="M17.5 41.5L31.2 27l4 4-15.9 9.2c-.6.3-1.2.4-1.8.3z" fill="url(#playGradient3b)"/>
                    <path d="M17.5 12.5c.6-.1 1.2 0 1.8.3l15.9 9.2-4 4-13.7-13.5z" fill="url(#playGradient4b)"/>
                    <defs>
                      <linearGradient id="playGradient1b" x1="17" y1="12" x2="31" y2="27" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#00C3FF"/>
                        <stop offset="1" stopColor="#00E0A0"/>
                      </linearGradient>
                      <linearGradient id="playGradient2b" x1="31" y1="19" x2="37" y2="27" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FFD700"/>
                        <stop offset="1" stopColor="#FF9500"/>
                      </linearGradient>
                      <linearGradient id="playGradient3b" x1="17" y1="41" x2="35" y2="27" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FF3A44"/>
                        <stop offset="1" stopColor="#FF6B6B"/>
                      </linearGradient>
                      <linearGradient id="playGradient4b" x1="17" y1="12" x2="35" y2="27" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#00D26A"/>
                        <stop offset="1" stopColor="#00E0A0"/>
                      </linearGradient>
                    </defs>
                    <text x="48" y="22" fill="#fff" fontSize="9" fontFamily="sans-serif">GET IT ON</text>
                    <text x="48" y="38" fill="#fff" fontSize="16" fontWeight="500" fontFamily="sans-serif">Google Play</text>
                  </svg>
                </a>

                {/* Apple App Store Badge */}
                <a 
                  href="https://apps.apple.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={styles.storeBadge}
                >
                  <svg viewBox="0 0 180 54" className={styles.storeBadgeSvg}>
                    <rect width="180" height="54" rx="8" fill="#000"/>
                    <path d="M32.5 27.2c0-3.8 3.1-5.6 3.2-5.7-1.8-2.6-4.5-2.9-5.5-3-2.3-.2-4.6 1.4-5.8 1.4-1.2 0-3-1.4-5-1.3-2.5 0-4.9 1.5-6.2 3.8-2.7 4.6-.7 11.5 1.9 15.2 1.3 1.8 2.8 3.9 4.8 3.8 1.9-.1 2.7-1.2 5-1.2 2.3 0 3 1.2 5 1.2 2.1 0 3.4-1.9 4.6-3.7 1.5-2.1 2.1-4.2 2.1-4.3-.1 0-4-1.5-4.1-6.2zm-3.8-11.4c1.1-1.3 1.8-3.1 1.6-4.9-1.5.1-3.4 1-4.5 2.3-1 1.1-1.8 2.9-1.6 4.7 1.7.1 3.4-.9 4.5-2.1z" fill="#fff"/>
                    <text x="48" y="22" fill="#fff" fontSize="9" fontFamily="sans-serif">Download on the</text>
                    <text x="48" y="38" fill="#fff" fontSize="16" fontWeight="500" fontFamily="sans-serif">App Store</text>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

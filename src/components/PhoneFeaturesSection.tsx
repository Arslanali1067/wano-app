'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import styles from './PhoneFeaturesSection.module.css'

// Original image URLs from HTML
const images = {
  phoneBase: 'https://wubflow-shield.nocodexport.dev/6508308b2a1ae17b91dac2b6/6508360f2037ee63e0d05cb3_Base.svg',
  phoneScreen: 'https://wubflow-shield.nocodexport.dev/6508308b2a1ae17b91dac2b6/6508360ff96fe9a3f67bdc82_Screen.svg',
  screen02: 'https://wubflow-shield.nocodexport.dev/6508308b2a1ae17b91dac2b6/650a09f609027665587a5d1f_Screen%2002.webp',
  screen03: 'https://wubflow-shield.nocodexport.dev/6508308b2a1ae17b91dac2b6/650a09f68683165aba1aa830_Screen%2003.webp',
}

const features = [
  {
    title: 'Find Playlists on the Go',
    subtitle: 'Instant Playlists Anytime, Anywhere',
    screenImage: images.screen03,
  },
  {
    title: 'Lyrics on the Screen',
    subtitle: 'Sing Along with Every Beat',
    screenImage: images.screen02,
  },
]

export default function PhoneFeaturesSection() {
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
    <section className={`section light-blue ${styles.phoneFeaturesSection}`} ref={sectionRef}>
      <div id="Product" className={styles.paddingSection}>
        <div className="container">
          {/* Header */}
          <div className={styles.centerText}>
            <div className={`${styles.titleHolder} ${styles.fadeIn} ${isVisible ? styles.visible : ''}`}>
              <h2>Discover Music Your Way</h2>
            </div>
            <div className={`${styles.paragraphHolder} ${styles.fadeIn} ${isVisible ? styles.visible : ''}`} style={{ animationDelay: '0.1s' }}>
              <p>
                Our app is designed to put you in control of your musical journey. With &quot;Instant Playlists Anytime, Anywhere&quot; 
                and &quot;Sing Along with Every Beat,&quot; we&apos;re redefining how you experience music.
              </p>
            </div>
          </div>

          {/* Phone Features Grid */}
          <div className={styles.phoneFeatures}>
            {features.map((feature, index) => (
              <div key={index} className={styles.phoneFeature}>
                <div className={styles.phoneFeatureWrapper}>
                  <div className={styles.phoneFeatureContent}>
                    <div className={`${styles.fadeIn} ${isVisible ? styles.visible : ''}`} style={{ animationDelay: `${0.2 + index * 0.2}s` }}>
                      <div className={styles.phoneFeatureTitle}>{feature.title}</div>
                    </div>
                    <div className={`${styles.fadeIn} ${isVisible ? styles.visible : ''}`} style={{ animationDelay: `${0.3 + index * 0.2}s` }}>
                      <p className="paragraph-xl">{feature.subtitle}</p>
                    </div>
                  </div>
                  <div className={`${styles.featurePhoneHolder} ${styles.fadeIn} ${isVisible ? styles.visible : ''}`} style={{ animationDelay: `${0.4 + index * 0.2}s` }}>
                    <Image
                      src={images.phoneBase}
                      alt="Phone Base"
                      width={320}
                      height={640}
                      className={styles.phoneBase}
                    />
                    <div className={styles.phoneScreen}>
                      <Image
                        src={images.phoneScreen}
                        alt="Phone Screen"
                        width={300}
                        height={600}
                        className={styles.phoneScreenImg}
                      />
                      <Image
                        src={feature.screenImage}
                        alt={feature.title}
                        width={280}
                        height={560}
                        className={styles.appImage}
                      />
                    </div>
                  </div>
                </div>
                {index === 0 && (
                  <>
                    <div className={`${styles.glow} ${styles.topLeft}`} />
                    <div className={`${styles.glow} ${styles.botRight}`} />
                  </>
                )}
                {index === 1 && <div className={`${styles.glow} ${styles.botRight}`} />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

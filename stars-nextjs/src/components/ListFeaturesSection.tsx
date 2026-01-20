'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import styles from './ListFeaturesSection.module.css'

// Original image URLs from HTML
const images = {
  arrowIcon: 'https://wubflow-shield.nocodexport.dev/6508308b2a1ae17b91dac2b6/65083f705fec0efcb9248de2_Arrow%20Icon.svg',
  background01: 'https://wubflow-shield.nocodexport.dev/6508308b2a1ae17b91dac2b6/6508589763115dc8d34d8b3d_Background%20Image%2001.webp',
  listImage: 'https://wubflow-shield.nocodexport.dev/6508308b2a1ae17b91dac2b6/650841f620e5747d9ec17538_List%20Image.webp',
  background02: 'https://wubflow-shield.nocodexport.dev/6508308b2a1ae17b91dac2b6/65085897fc474a56af87d032_Background%20Image%2002.webp',
  lyricsSvg: 'https://wubflow-shield.nocodexport.dev/6508308b2a1ae17b91dac2b6/650859b42272bf8f15b09549_Lyrics.svg',
}

const checkItems = [
  'Lorem ipsum dolor sit amet,',
  'Consectetur adipiscing elit.',
  'Mauris id nunc odio.',
]

const features = [
  {
    title: 'Our app curates playlists tailored to your preferences',
    description: 'Find Playlists on the Go" feature, your music journey becomes seamless and spontaneous. Whether you\'re commuting, working out, or simply relaxing at home, discover the perfect playlist for every moment.',
    backgroundImage: images.background01,
    foregroundImage: images.listImage,
    imageFirst: false,
  },
  {
    title: 'Spark\'s "Lyrics on the Screen" feature.',
    description: 'It\'s like having your own personal karaoke session, adding a whole new dimension to your music enjoyment. Let the lyrics guide you through the melody, and immerse yourself in the music like never before.',
    backgroundImage: images.background02,
    foregroundImage: images.lyricsSvg,
    imageFirst: true,
  },
]

export default function ListFeaturesSection() {
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
      <div id="Why-Us" className={styles.paddingSection}>
        <div className="container">
          {/* Header */}
          <div className={styles.centerText}>
            <div className={`${styles.titleHolder} ${styles.fadeIn} ${isVisible ? styles.visible : ''}`}>
              <h2>Sing Along with Every Beat</h2>
            </div>
            <div className={`${styles.paragraphHolder} ${styles.fadeIn} ${isVisible ? styles.visible : ''}`} style={{ animationDelay: '0.1s' }}>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris id nunc odio. Aliquam et tellus urna. Phasellus eget
              </p>
            </div>
          </div>

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
                    <div className={`${styles.fadeIn} ${isVisible ? styles.visible : ''}`} style={{ animationDelay: `${0.3 + index * 0.3}s` }}>
                      <p>{feature.description}</p>
                    </div>
                    <div className={styles.list}>
                      <ul className={styles.listUnstyled}>
                        {checkItems.map((item, itemIndex) => (
                          <li key={itemIndex}>
                            <div className={`${styles.listItem} ${styles.fadeIn} ${isVisible ? styles.visible : ''}`} style={{ animationDelay: `${0.4 + index * 0.3 + itemIndex * 0.1}s` }}>
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
                <div className={`${styles.listImageHolder} ${styles.fadeIn} ${isVisible ? styles.visible : ''}`} style={{ animationDelay: `${0.5 + index * 0.3}s` }}>
                  <Image
                    src={feature.backgroundImage}
                    alt="Background"
                    fill
                    className={styles.listBackground}
                  />
                  <Image
                    src={feature.foregroundImage}
                    alt={feature.title}
                    width={600}
                    height={400}
                    className={styles.listImage}
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

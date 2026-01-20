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
  'Lorem ipsum dolor sit amet,',
  'Consectetur adipiscing elit.',
  'Mauris id nunc odio.',
  'Consectetur adipiscing elit.',
  'Mauris id nunc odio.',
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
        
        <div className={styles.easyAccessGrid}>
          {/* Image Side */}
          <div className={styles.easyAccessImageHolder}>
            <div className={`${styles.fadeIn} ${isVisible ? styles.visible : ''}`}>
              <div className={styles.easyAccessHeading}>Download Now</div>
            </div>
            <div className={`${styles.listImageHolder} ${styles.fadeIn} ${isVisible ? styles.visible : ''}`} style={{ animationDelay: '0.2s' }}>
              <Image
                src={images.background03}
                alt="Background"
                fill
                className={styles.listBackground}
              />
              <Image
                src={images.phonesImage}
                alt="App on Phones"
                width={500}
                height={400}
                className={styles.listImage}
              />
            </div>
          </div>

          {/* Content Side */}
          <div className={styles.listContent}>
            <div className={styles.listContentWrapper}>
              <div className={`${styles.fadeIn} ${isVisible ? styles.visible : ''}`} style={{ animationDelay: '0.3s' }}>
                <p>
                  Spark ensures that music is not just something you listen to – it&apos;s something you live. 
                  Discover, sing, and groove your way with Spark, because music should always be your way.
                </p>
              </div>
              <div className={styles.list}>
                <ul className={styles.listUnstyled}>
                  {checkItems.map((item, index) => (
                    <li key={index}>
                      <div 
                        className={`${styles.listItem} ${styles.fadeIn} ${isVisible ? styles.visible : ''}`} 
                        style={{ animationDelay: `${0.4 + index * 0.1}s` }}
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
              <div className={`${styles.listButtonHolder} ${styles.fadeIn} ${isVisible ? styles.visible : ''}`} style={{ animationDelay: '0.9s' }}>
                <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" className="button video">
                  Watch Video
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

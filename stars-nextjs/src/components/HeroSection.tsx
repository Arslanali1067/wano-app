'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import styles from './HeroSection.module.css'

const heroWords = ['Unleash', 'Your', 'Musical', 'Spark']

// Original image URLs from HTML
const images = {
  phoneBase: 'https://wubflow-shield.nocodexport.dev/6508308b2a1ae17b91dac2b6/6508360f2037ee63e0d05cb3_Base.svg',
  phoneScreen: 'https://wubflow-shield.nocodexport.dev/6508308b2a1ae17b91dac2b6/6508360ff96fe9a3f67bdc82_Screen.svg',
  screen01: 'https://wubflow-shield.nocodexport.dev/6508308b2a1ae17b91dac2b6/650a09f6efe41df228d64825_Screen%2001.webp',
  screen02: 'https://wubflow-shield.nocodexport.dev/6508308b2a1ae17b91dac2b6/650a09f609027665587a5d1f_Screen%2002.webp',
  screen03: 'https://wubflow-shield.nocodexport.dev/6508308b2a1ae17b91dac2b6/650a09f68683165aba1aa830_Screen%2003.webp',
}

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      
      const rect = sectionRef.current.getBoundingClientRect()
      const sectionHeight = sectionRef.current.offsetHeight
      const scrolled = -rect.top
      
      // Calculate progress (0 to 1) based on how much we've scrolled through the section
      const progress = Math.min(Math.max(scrolled / (sectionHeight * 0.5), 0), 1)
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Calculate rotation based on scroll progress (starts at 3/-3 degrees, ends at 0)
  const rightPhoneRotation = 3 * (1 - scrollProgress)
  const leftPhoneRotation = -3 * (1 - scrollProgress)

  return (
    <section className={`section ${styles.heroSection}`} ref={sectionRef}>
      <div className="container">
        <div className={styles.heroSectionHolder}>
          <div className={styles.heroSectionContainer}>
            <div className={styles.heroSectionHeaderHolder}>
              {heroWords.map((word, index) => (
                <div
                  key={index}
                  className={`${styles.animateText} ${isVisible ? styles.visible : ''}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <h1>{word}</h1>
                </div>
              ))}
            </div>
            <div 
              className={`${styles.heroSectionParagraphHolder} ${styles.animateFadeIn} ${isVisible ? styles.visible : ''}`}
              style={{ animationDelay: '0.5s' }}
            >
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris id nunc odio. Aliquam et tellus urna. Phasellus eget</p>
            </div>
            <div 
              className={`${styles.heroSectionButtonHolder} ${styles.animateFadeIn} ${isVisible ? styles.visible : ''}`}
              style={{ animationDelay: '0.7s' }}
            >
              <a href="#App" className="button">Download App</a>
              <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" className="button video">Watch Video</a>
            </div>
          </div>
        </div>

        {/* Phone Mockups Section */}
        <div className={styles.heroSectionPhoneHolder}>
          <div className={styles.heroSectionPhoneContainer}>
            {/* Center Phone */}
            <div className={styles.heroPhone}>
              <div 
                className={`${styles.heroPhoneHolder} ${styles.phone01} ${styles.animatePhoneCenter} ${isVisible ? styles.visible : ''}`}
                style={{ animationDelay: '0.8s' }}
              >
                <Image
                  src={images.phoneBase}
                  alt="Phone Base"
                  width={360}
                  height={720}
                  className={styles.phoneBase}
                />
                <div className={styles.phoneScreen}>
                  <Image
                    src={images.phoneScreen}
                    alt="Phone Screen"
                    width={340}
                    height={680}
                    className={styles.phoneScreenImg}
                  />
                  <Image
                    src={images.screen03}
                    alt="App Screen"
                    width={320}
                    height={640}
                    className={styles.appImage}
                  />
                </div>
              </div>
            </div>

            {/* Right Phone */}
            <div className={`${styles.heroPhone} ${styles.phone02}`}>
              <div 
                className={`${styles.heroPhoneHolder} ${styles.phone02Holder} ${styles.animatePhoneRight} ${isVisible ? styles.visible : ''}`}
                style={{ 
                  animationDelay: '1s',
                  transform: `rotate(${rightPhoneRotation}deg)`,
                  transition: 'transform 0.1s ease-out'
                }}
              >
                <Image
                  src={images.phoneBase}
                  alt="Phone Base"
                  width={280}
                  height={560}
                  className={styles.phoneBase}
                />
                <div className={styles.phoneScreen}>
                  <Image
                    src={images.phoneScreen}
                    alt="Phone Screen"
                    width={260}
                    height={520}
                    className={styles.phoneScreenImg}
                  />
                  <Image
                    src={images.screen02}
                    alt="App Screen"
                    width={240}
                    height={480}
                    className={styles.appImage}
                  />
                </div>
              </div>
            </div>

            {/* Left Phone */}
            <div className={`${styles.heroPhone} ${styles.phone03}`}>
              <div 
                className={`${styles.heroPhoneHolder} ${styles.phone03Holder} ${styles.animatePhoneLeft} ${isVisible ? styles.visible : ''}`}
                style={{ 
                  animationDelay: '1s',
                  transform: `rotate(${leftPhoneRotation}deg)`,
                  transition: 'transform 0.1s ease-out'
                }}
              >
                <Image
                  src={images.phoneBase}
                  alt="Phone Base"
                  width={280}
                  height={560}
                  className={styles.phoneBase}
                />
                <div className={styles.phoneScreen}>
                  <Image
                    src={images.phoneScreen}
                    alt="Phone Screen"
                    width={260}
                    height={520}
                    className={styles.phoneScreenImg}
                  />
                  <Image
                    src={images.screen01}
                    alt="App Screen"
                    width={240}
                    height={480}
                    className={styles.appImage}
                  />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

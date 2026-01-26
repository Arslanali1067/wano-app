'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import styles from './HeroSection.module.css'
import platformStyles from './PlatformHeroSection.module.css'

export default function PlatformHeroSection() {
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
    <section id="Hero" className={`section ${styles.heroSection} ${platformStyles.platformHeroSection}`} ref={sectionRef}>
      <div className="container">
        <div className={styles.heroSectionHolder}>
          <div className={styles.heroSectionContainer}>
            <div className={styles.heroSectionHeaderHolder}>
              <div
                className={`${styles.animateText} ${isVisible ? styles.visible : ''}`}
              >
                <h1>The Wano Platform</h1>
              </div>
            </div>
            <div 
              className={`${styles.heroSectionParagraphHolder} ${styles.animateFadeIn} ${isVisible ? styles.visible : ''}`}
              style={{ animationDelay: '0.2s' }}
            >
              <p>A short-form video experience built for creators and powered by scalable technology — connecting Africa, the Diaspora, the Caribbean, and beyond.</p>
            </div>
          </div>
        </div>

        {/* Phone Mockups Section */}
        <div className={`${styles.heroSectionPhoneHolder} ${platformStyles.platformHeroSectionPhoneHolder}`}>
          <div className={styles.heroSectionPhoneContainer}>
            {/* Center Phone */}
            <div className={styles.heroPhone}>
              <div 
                className={`${styles.heroPhoneHolder} ${styles.phone01} ${styles.animatePhoneCenter} ${isVisible ? styles.visible : ''}`}
                style={{ animationDelay: '0.4s' }}
              >
                {/* Phone Mockup Frame - base layer */}
                <Image
                  src="/images/video-mockup.webp"
                  alt="Wano App"
                  width={360}
                  height={720}
                  className={styles.phoneFrame}
                  priority
                />
                {/* Image Container - positioned above frame, clipped to screen */}
                <div className={styles.videoContainer}>
                  <Image
                    src="/images/Image1(1).webp"
                    alt="Wano App"
                    width={360}
                    height={720}
                    className={styles.videoPoster}
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Right Phone */}
            <div className={`${styles.heroPhone} ${styles.phone02}`}>
              <div 
                className={`${styles.heroPhoneHolder} ${styles.phone02Holder} ${styles.animatePhoneRight} ${isVisible ? styles.visible : ''}`}
                style={{ 
                  animationDelay: '0.6s',
                  transform: `rotate(${rightPhoneRotation}deg)`,
                  transition: 'transform 0.1s ease-out'
                }}
              >
                <Image
                  src="/images/image3(1).webp"
                  alt="Video Edit Screen"
                  width={280}
                  height={560}
                  className={styles.splashScreenImage}
                />
              </div>
            </div>

            {/* Left Phone */}
            <div className={`${styles.heroPhone} ${styles.phone03}`}>
              <div 
                className={`${styles.heroPhoneHolder} ${styles.phone03Holder} ${styles.animatePhoneLeft} ${isVisible ? styles.visible : ''}`}
                style={{ 
                  animationDelay: '0.6s',
                  transform: `rotate(${leftPhoneRotation}deg)`,
                  transition: 'transform 0.1s ease-out'
                }}
              >
                <Image
                  src="/images/Image2(1).webp"
                  alt="Home Screen"
                  width={280}
                  height={560}
                  className={styles.splashScreenImage}
                />
              </div>
            </div>
          </div>

          {/* Center Glow Effect */}
          <div className={`${styles.glow} ${styles.heroGlow}`} />
        </div>
      </div>
    </section>
  )
}

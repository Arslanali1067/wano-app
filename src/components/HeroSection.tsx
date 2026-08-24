'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import styles from './HeroSection.module.css'

const heroWords = ['WANO', '-', 'A Global Platform', 'Rooted in Culture']

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false)
  const [useVideo, setUseVideo] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const videoContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Check connection speed and device capabilities
  useEffect(() => {
    const checkConnectionAndDevice = async () => {
      // Check if device is low-end or connection is slow
      const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection
      const isSlowConnection = connection && (
        connection.effectiveType === 'slow-2g' || 
        connection.effectiveType === '2g' ||
        (connection.downlink && connection.downlink < 1.5)
      )
      
      // Check device memory (if available)
      const isLowEndDevice = (navigator as any).deviceMemory && (navigator as any).deviceMemory < 4
      
      // Check hardware concurrency (CPU cores)
      const isLowCPU = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4
      
      // Only use video if connection is good and device is capable
      if (!isSlowConnection && !isLowEndDevice && !isLowCPU) {
        setUseVideo(true)
      }
    }

    checkConnectionAndDevice()
  }, [])

  // Intersection Observer for lazy loading video
  useEffect(() => {
    if (!videoContainerRef.current || !useVideo) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoadVideo(true)
            observer.disconnect()
          }
        })
      },
      {
        rootMargin: '50px', // Start loading slightly before visible
        threshold: 0.1
      }
    )

    observer.observe(videoContainerRef.current)

    return () => {
      observer.disconnect()
    }
  }, [useVideo])

  // Handle video load and error
  useEffect(() => {
    if (!videoRef.current || !shouldLoadVideo) return

    const video = videoRef.current
    
    // Load the video when it's ready
    video.load()

    const handleCanPlay = () => {
      video.play().catch(() => {
        // If autoplay fails, fallback to poster
        setUseVideo(false)
      })
    }

    const handleError = () => {
      // Fallback to poster image if video fails to load
      setUseVideo(false)
    }

    const handleLoadedData = () => {
      // Video data loaded, try to play
      video.play().catch(() => {
        setUseVideo(false)
      })
    }

    video.addEventListener('canplay', handleCanPlay)
    video.addEventListener('loadeddata', handleLoadedData)
    video.addEventListener('error', handleError)

    return () => {
      video.removeEventListener('canplay', handleCanPlay)
      video.removeEventListener('loadeddata', handleLoadedData)
      video.removeEventListener('error', handleError)
    }
  }, [shouldLoadVideo])

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
    <section id="Hero" className={`section ${styles.heroSection}`} ref={sectionRef}>
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
              <p>A short-form video platform connecting Africa, the Diaspora, and communities worldwide shaped by Afrocentric influence.</p>
              <p className={styles.heroStats}>50k+ installs and growing worldwide.</p>
            </div>
            <div
              className={`${styles.heroSectionButtonHolder} ${styles.animateFadeIn} ${isVisible ? styles.visible : ''}`}
              style={{ animationDelay: '0.7s' }}
            >
              {/* Google Play Store Badge */}
              <a 
                href="https://play.google.com/store/apps/details?id=com.wano.app&hl=en&gl=US" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.storeBadge}
              >
                <svg viewBox="0 0 180 54" className={styles.storeBadgeSvg}>
                  <rect width="180" height="54" rx="8" fill="#000"/>
                  <path d="M17.5 12.5L31.2 27l-13.7 14.5c-.4-.4-.7-1-.7-1.8V14.3c0-.8.3-1.4.7-1.8z" fill="url(#playGradient1)"/>
                  <path d="M35.2 23l-4-4-13.7 8 13.7 8 4-4c1.1-.6 1.8-1.8 1.8-3s-.7-2.4-1.8-3z" fill="url(#playGradient2)"/>
                  <path d="M17.5 41.5L31.2 27l4 4-15.9 9.2c-.6.3-1.2.4-1.8.3z" fill="url(#playGradient3)"/>
                  <path d="M17.5 12.5c.6-.1 1.2 0 1.8.3l15.9 9.2-4 4-13.7-13.5z" fill="url(#playGradient4)"/>
                  <defs>
                    <linearGradient id="playGradient1" x1="17" y1="12" x2="31" y2="27" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#00C3FF"/>
                      <stop offset="1" stopColor="#00E0A0"/>
                    </linearGradient>
                    <linearGradient id="playGradient2" x1="31" y1="19" x2="37" y2="27" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#FFD700"/>
                      <stop offset="1" stopColor="#FF9500"/>
                    </linearGradient>
                    <linearGradient id="playGradient3" x1="17" y1="41" x2="35" y2="27" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#FF3A44"/>
                      <stop offset="1" stopColor="#FF6B6B"/>
                    </linearGradient>
                    <linearGradient id="playGradient4" x1="17" y1="12" x2="35" y2="27" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#00D26A"/>
                      <stop offset="1" stopColor="#00E0A0"/>
                    </linearGradient>
                  </defs>
                  <text x="90" y="22" fill="#fff" fontSize="9" fontFamily="sans-serif" textAnchor="middle">GET IT ON</text>
                  <text x="90" y="38" fill="#fff" fontSize="16" fontWeight="500" fontFamily="sans-serif" textAnchor="middle">Google Play</text>
                </svg>
              </a>

              {/* Apple App Store Badge */}
              <a 
                href="https://apps.apple.com/app/wano-app/id6753104927" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.storeBadge}
              >
                <svg viewBox="0 0 180 54" className={styles.storeBadgeSvg}>
                  <rect width="180" height="54" rx="8" fill="#000"/>
                  <path d="M32.5 27.2c0-3.8 3.1-5.6 3.2-5.7-1.8-2.6-4.5-2.9-5.5-3-2.3-.2-4.6 1.4-5.8 1.4-1.2 0-3-1.4-5-1.3-2.5 0-4.9 1.5-6.2 3.8-2.7 4.6-.7 11.5 1.9 15.2 1.3 1.8 2.8 3.9 4.8 3.8 1.9-.1 2.7-1.2 5-1.2 2.3 0 3 1.2 5 1.2 2.1 0 3.4-1.9 4.6-3.7 1.5-2.1 2.1-4.2 2.1-4.3-.1 0-4-1.5-4.1-6.2zm-3.8-11.4c1.1-1.3 1.8-3.1 1.6-4.9-1.5.1-3.4 1-4.5 2.3-1 1.1-1.8 2.9-1.6 4.7 1.7.1 3.4-.9 4.5-2.1z" fill="#fff"/>
                  <text x="90" y="22" fill="#fff" fontSize="9" fontFamily="sans-serif" textAnchor="middle">Download on the</text>
                  <text x="90" y="38" fill="#fff" fontSize="16" fontWeight="500" fontFamily="sans-serif" textAnchor="middle">App Store</text>
                </svg>
              </a>
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
                {/* Phone Mockup Frame - base layer */}
                <Image
                  src="/images/video-mockup.webp"
                  alt="Wano App"
                  width={360}
                  height={720}
                  className={styles.phoneFrame}
                  priority
                />
                {/* Video/Poster Container - positioned above frame, clipped to screen */}
                <div ref={videoContainerRef} className={styles.videoContainer}>
                  {/* Always show poster first */}
                  <Image
                    src="/images/Image1(1).webp"
                    alt="Wano App"
                    width={360}
                    height={720}
                    className={styles.videoPoster}
                    priority
                  />
                  {/* Video overlays poster when ready */}
                  {useVideo && shouldLoadVideo && (
                    <video
                      ref={videoRef}
                      className={styles.heroVideo}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="none"
                      poster="/images/Image1(1).webp"
                      aria-label="Wano App Video"
                    >
                      <source src="/images/home-Video.mp4" type="video/mp4" />
                    </video>
                  )}
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
                  animationDelay: '1s',
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

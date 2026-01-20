'use client'

import { useState, FormEvent, useEffect, useRef } from 'react'
import Image from 'next/image'
import styles from './CTASection.module.css'

// Original image URL from HTML
const ctaImage = 'https://wubflow-shield.nocodexport.dev/6508308b2a1ae17b91dac2b6/6509e9449e02d3fc7f62553e_CTA%20Image%20(2).webp'

export default function CTASection() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (email) {
      // Simulate form submission
      setStatus('success')
      setEmail('')
      setTimeout(() => setStatus('idle'), 3000)
    }
  }

  return (
    <section className={`section ${styles.ctaSection}`} ref={sectionRef}>
      <div id="App" className={styles.paddingSection}>
        <div className="container">
          <div className={styles.ctaWrapper}>
            <div className={styles.ctaContent}>
              <div className={`${styles.ctaHeading} ${styles.fadeIn} ${isVisible ? styles.visible : ''}`}>
                <h1>Join the Spark Community Today</h1>
              </div>
              <form onSubmit={handleSubmit} className={`${styles.formBlock} ${styles.fadeIn} ${isVisible ? styles.visible : ''}`} style={{ animationDelay: '0.2s' }}>
                <div className={styles.form}>
                  <input
                    type="email"
                    className={styles.textField}
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button type="submit" className={styles.submitButton}>
                    Get Early Access
                  </button>
                </div>
                {status === 'success' && (
                  <div className={styles.successMessage}>
                    <div>Thank you!<br />Your submission has been received!</div>
                  </div>
                )}
                {status === 'error' && (
                  <div className={styles.errorMessage}>
                    <div>Oops!<br />Something went wrong while submitting the form.</div>
                  </div>
                )}
              </form>
            </div>
            <Image
              src={ctaImage}
              alt="CTA Background"
              fill
              className={styles.ctaImage}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}

'use client'

import { useState, FormEvent, useEffect, useRef } from 'react'
import Image from 'next/image'
import styles from './CTASection.module.css'

// CTA background image
const ctaImage = '/images/image3.webp'

export default function CTASection() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!email) return

    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: 'Newsletter Subscriber',
          email,
          message: 'User requested to subscribe to Wano updates/newsletter.',
          formSource: 'Newsletter Subscription',
        }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => null)
        setErrorMessage(data?.error || 'Failed to submit. Please try again.')
        setStatus('error')
        setTimeout(() => setStatus('idle'), 5000)
        return
      }

      setStatus('success')
      setEmail('')
      setTimeout(() => setStatus('idle'), 5000)
    } catch {
      setErrorMessage('Network error. Please try again.')
      setStatus('error')
      setTimeout(() => setStatus('idle'), 5000)
    }
  }

  return (
    <section className={`section ${styles.ctaSection}`} ref={sectionRef}>
      <div id="App" className={styles.paddingSection}>
        <div className="container">
          <div className={styles.ctaWrapper}>
            <div className={styles.ctaContent}>
              <div className={`${styles.ctaHeading} ${styles.fadeIn} ${isVisible ? styles.visible : ''}`}>
                <h2>Join the Movement</h2>
              </div>
              <div className={`${styles.ctaSubtitle} ${styles.fadeIn} ${isVisible ? styles.visible : ''}`} style={{ animationDelay: '0.1s' }}>
                <p>Wano Is Us. From every city, tribe, and language—Wano is where Africa creates, connects, and shines. Don&apos;t miss the next big thing in culture and content.</p>
              </div>
              <form onSubmit={handleSubmit} className={`${styles.formBlock} ${styles.fadeIn} ${isVisible ? styles.visible : ''}`} style={{ animationDelay: '0.2s' }}>
                <div className={styles.form}>
                  <input
                    type="email"
                    className={styles.textField}
                    placeholder="Your Email"
                    aria-label="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={status === 'loading'}
                    required
                  />
                  <button type="submit" className={styles.submitButton} disabled={status === 'loading'}>
                    {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
                  </button>
                </div>
                {status === 'success' && (
                  <div className={styles.successMessage}>
                    <div>Thank you!<br />Your submission has been received!</div>
                  </div>
                )}
                {status === 'error' && (
                  <div className={styles.errorMessage}>
                    <div>{errorMessage || 'Oops! Something went wrong while submitting the form.'}</div>
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

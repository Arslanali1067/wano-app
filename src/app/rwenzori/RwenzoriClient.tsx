'use client'

import { useEffect } from 'react'
import { track } from '@vercel/analytics'
import styles from './Rwenzori.module.css'

const IOS_URL = 'https://apps.apple.com/us/app/wano-app/id6753104927'
const ANDROID_URL = 'https://play.google.com/store/apps/details?id=com.wano.app&pcampaignid=web_share'
const FALLBACK_URL = 'https://wanoafrica.com'

function detectTarget(): { url: string; platform: 'ios' | 'android' | 'other' } {
  if (typeof window === 'undefined') {
    return { url: FALLBACK_URL, platform: 'other' }
  }

  const ua = (
    navigator.userAgent ||
    navigator.vendor ||
    (window as unknown as { opera?: string }).opera ||
    ''
  ).toLowerCase()

  // Improved iPad detection: check standard iOS UA regex OR iPadOS 13+ reporting as MacIntel with touch support
  const isIos =
    /iphone|ipad|ipod/.test(ua) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)

  if (isIos) {
    return { url: IOS_URL, platform: 'ios' }
  }

  if (/android/.test(ua)) {
    return { url: ANDROID_URL, platform: 'android' }
  }

  return { url: FALLBACK_URL, platform: 'other' }
}

export default function RwenzoriClient() {
  useEffect(() => {
    const { url, platform } = detectTarget()

    // Vercel Web Analytics Setup:
    // 1. Overall pageviews on /rwenzori are automatically tracked by <Analytics /> in layout.tsx.
    // 2. Custom event 'qr_scan' logs the device platform (ios | android | other) for OS breakdown.
    try {
      track('qr_scan', { platform })
    } catch {
      // Ignore analytics tracking failures if ad-blockers or permissions interfere
    }

    // Redirect immediately. window.location.replace() ensures the redirect
    // page does not sit in the browser's back-button history.
    window.location.replace(url)
  }, [])

  return (
    <div className={styles.wrapper}>
      <div className={styles.brand}>
        <span className={styles.wordmark}>WANO</span>
        <span className={styles.tagline}>Watch Culture Move</span>
      </div>

      <p className={styles.status}>Taking you to the app store&hellip;</p>

      <div className={styles.buttons}>
        <a href={IOS_URL} className={`${styles.btn} ${styles.btnPrimary}`}>
          Download on the App Store
        </a>
        <a href={ANDROID_URL} className={`${styles.btn} ${styles.btnSecondary}`}>
          Get it on Google Play
        </a>
      </div>

      {/* If JavaScript is disabled, send visitors to the main site */}
      <noscript>
        <meta httpEquiv="refresh" content={`0; url=${FALLBACK_URL}`} />
      </noscript>
    </div>
  )
}

'use client'

// Interactive tour of the real Wano app (real screenshots, Nov 2026).
// Tap a feature and the phone shows it; on a computer the phone tilts with the
// mouse; it moves through the screens on its own until someone touches it.
// Swipe on phones. Still for people who ask for less motion. No libraries.
import { useCallback, useEffect, useRef, useState } from 'react'
import styles from './AppTour.module.css'

const SCREENS = [
  { key: 'new', icon: '✨', title: 'New', text: 'The latest videos from creators everywhere: Lagos, Kampala, Nairobi, Accra and the diaspora.', src: '/images/screens/feed-new.webp' },
  { key: 'foryou', icon: '🎯', title: 'For You', text: 'Videos picked for you, and better the more you watch.', src: '/images/screens/feed-foryou.webp' },
  { key: 'trending', icon: '🌍', title: 'Trending by country', text: 'What Uganda, Nigeria, Kenya and the rest of the world are watching right now.', src: '/images/screens/trending-country.webp' },
  { key: 'discover', icon: '🧭', title: 'Discover', text: 'Home Ground city battles, trending sounds and creators to follow.', src: '/images/screens/discover.webp' },
  { key: 'tv', icon: '🎬', title: 'Wano TV', text: 'African films and series, free in the app. Top 10, genres and Continue watching.', src: '/images/screens/wanotv.webp' },
  { key: 'messages', icon: '💬', title: 'Messages', text: 'Chat with creators and friends, with blocking and reporting in every chat.', src: '/images/screens/messages.webp' },
  { key: 'quick', icon: '🎙️', title: 'Quick posts', text: 'A voice note or a status card on your profile picture for 24 hours.', src: '/images/screens/quick-voice.webp' },
  { key: 'stats', icon: '📊', title: 'Your stats', text: 'Views, likes, comments and your best time to post.', src: '/images/screens/stats.webp' },
]

const STEP_MS = 4500

export default function AppTour() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [seen, setSeen] = useState(false)
  const [reduced, setReduced] = useState(false)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const sectionRef = useRef<HTMLElement>(null)
  const touchX = useRef<number | null>(null)

  const go = useCallback((i: number) => setActive((i + SCREENS.length) % SCREENS.length), [])

  // Load and start only when the tour comes into view.
  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    const el = sectionRef.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setSeen(e.isIntersecting), { threshold: 0.25 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // Move on by itself while visible and untouched.
  useEffect(() => {
    if (!seen || paused || reduced) return
    const t = setTimeout(() => go(active + 1), STEP_MS)
    return () => clearTimeout(t)
  }, [active, seen, paused, reduced, go])

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduced || e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    setTilt({ x: ((e.clientX - r.left) / r.width - 0.5) * 14, y: -((e.clientY - r.top) / r.height - 0.5) * 10 })
  }

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      id="tour"
      aria-label="A tour of the Wano app"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => { setPaused(false); setTilt({ x: 0, y: 0 }) }}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); setPaused(true); go(active + 1) }
        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); setPaused(true); go(active - 1) }
      }}
    >
      <div className={styles.glowA} />
      <div className={styles.glowB} />
      <div className="container">
        <div className={styles.head}>
          <p className={styles.eyebrow}>Take the tour</p>
          <h2 className={styles.title}>This is the real Wano.</h2>
          <p className={styles.lead}>Every screen here is from the app as it is today. Tap through it.</p>
        </div>

        <div className={styles.layout}>
          <div className={styles.tabs} role="tablist" aria-label="Wano features">
            {SCREENS.map((s, i) => (
              <button
                key={s.key}
                role="tab"
                aria-selected={i === active}
                aria-controls="tour-phone"
                className={`${styles.tab} ${i === active ? styles.tabActive : ''}`}
                onClick={() => { setPaused(true); go(i) }}
                onFocus={() => setPaused(true)}
              >
                <span className={styles.tabIcon} aria-hidden="true">{s.icon}</span>
                <span className={styles.tabBody}>
                  <span className={styles.tabTitle}>{s.title}</span>
                  <span className={styles.tabText}>{s.text}</span>
                </span>
                {i === active && !paused && !reduced && seen && (
                  <span key={active} className={styles.progress} style={{ animationDuration: `${STEP_MS}ms` }} />
                )}
              </button>
            ))}
          </div>

          <div className={styles.stage} onPointerMove={onMove}>
            <div
              id="tour-phone"
              role="tabpanel"
              aria-label={SCREENS[active].title}
              className={styles.phone}
              style={{ transform: `perspective(1200px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)` }}
              onTouchStart={(e) => { touchX.current = e.touches[0].clientX; setPaused(true) }}
              onTouchEnd={(e) => {
                if (touchX.current === null) return
                const dx = e.changedTouches[0].clientX - touchX.current
                if (Math.abs(dx) > 40) go(active + (dx < 0 ? 1 : -1))
                touchX.current = null
              }}
            >
              {SCREENS.map((s, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={s.key}
                  src={seen || i === 0 ? s.src : undefined}
                  data-src={s.src}
                  alt={`Wano app: ${s.title}`}
                  className={`${styles.screen} ${i === active ? styles.screenActive : ''}`}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                  draggable={false}
                />
              ))}
              <div className={styles.shine} style={{ transform: `translateX(${tilt.x * 3}%)` }} />
            </div>
            <div className={styles.dots} aria-hidden="true">
              {SCREENS.map((s, i) => (
                <span key={s.key} className={`${styles.dot} ${i === active ? styles.dotActive : ''}`} />
              ))}
            </div>
            <p className={styles.caption} aria-live="polite">{SCREENS[active].title}: {SCREENS[active].text}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

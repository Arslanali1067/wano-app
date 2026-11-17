'use client'

// The hero's fan of real Wano TV posters. Follows the mouse on computers;
// still for people who ask for less motion.
import Link from 'next/link'
import { useEffect, useState } from 'react'
import styles from './TvCatalogue.module.css'

export default function PosterFan({ items }: { items: { slug: string; title: string; poster?: string }[] }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [reduced, setReduced] = useState(false)
  useEffect(() => setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches), [])
  const shown = items.filter((t) => t.poster).slice(0, 5)
  const mid = (shown.length - 1) / 2

  return (
    <div
      className={styles.fan}
      onPointerMove={(e) => {
        if (reduced || e.pointerType !== 'mouse') return
        const r = e.currentTarget.getBoundingClientRect()
        setTilt({ x: ((e.clientX - r.left) / r.width - 0.5) * 12, y: -((e.clientY - r.top) / r.height - 0.5) * 8 })
      }}
      onPointerLeave={() => setTilt({ x: 0, y: 0 })}
      style={{ transform: `perspective(1400px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)` }}
    >
      {shown.map((t, i) => {
        const off = i - mid
        return (
          <Link
            key={t.slug}
            href={`/tv/${t.slug}`}
            className={styles.fanCard}
            style={{
              transform: `translateX(${off * 46}%) translateY(${Math.abs(off) * 6}%) rotate(${off * 6}deg)`,
              zIndex: 10 - Math.round(Math.abs(off) * 2),
            }}
            aria-label={t.title}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={t.poster} alt={`${t.title} poster`} loading={i < 3 ? 'eager' : 'lazy'} />
          </Link>
        )
      })}
    </div>
  )
}

'use client'

// Plays a Wano TV trailer on the website. The trailers are HLS (.m3u8):
// Safari plays them itself, other browsers load hls.js only when someone
// presses play, so the page stays light for everyone else.
import { useEffect, useRef, useState } from 'react'
import styles from './TvCatalogue.module.css'

export default function TrailerPlayer({ src, poster, title }: { src: string; poster?: string; title: string }) {
  const [on, setOn] = useState(false)
  const [failed, setFailed] = useState(false)
  const video = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (!on || !video.current) return
    const v = video.current
    let hls: { destroy: () => void } | null = null
    let dead = false
    const fail = () => setFailed(true)
    if (v.canPlayType('application/vnd.apple.mpegurl')) {
      v.src = src
      v.play().catch(() => undefined)
    } else {
      import('hls.js').then(({ default: Hls }) => {
        if (dead) return
        if (!Hls.isSupported()) return fail()
        const h = new Hls({ capLevelToPlayerSize: true })
        hls = h
        h.on(Hls.Events.ERROR, (_e, data) => { if (data.fatal) fail() })
        h.loadSource(src)
        h.attachMedia(v)
        v.play().catch(() => undefined)
      }).catch(fail)
    }
    return () => { dead = true; hls?.destroy() }
  }, [on, src])

  if (failed) {
    return (
      <div className={styles.trailerBox}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {poster && <img src={poster} alt="" className={styles.trailerPoster} />}
        <p className={styles.trailerFail}>The trailer didn&rsquo;t load here. Watch it in the Wano app.</p>
      </div>
    )
  }

  return (
    <div className={styles.trailerBox}>
      {on ? (
        <video ref={video} className={styles.trailerVideo} controls playsInline poster={poster} aria-label={`${title} trailer`} />
      ) : (
        <button type="button" className={styles.trailerStart} onClick={() => setOn(true)} aria-label={`Play the ${title} trailer`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {poster && <img src={poster} alt="" className={styles.trailerPoster} />}
          <span className={styles.playRing} aria-hidden="true">
            <svg viewBox="0 0 24 24" width="30" height="30"><path d="M8 5v14l11-7z" fill="currentColor" /></svg>
          </span>
          <span className={styles.trailerLabel}>Play trailer</span>
        </button>
      )}
    </div>
  )
}

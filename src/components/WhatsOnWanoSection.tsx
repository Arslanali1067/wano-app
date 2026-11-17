import Link from 'next/link'
import styles from './WhatsOnWanoSection.module.css'

// What Wano is today (Nov 2026). Keep every line true to the live app.
const features = [
  {
    icon: '🎬',
    title: 'Wano TV',
    text: 'African films and series, free in the app. Top 10 of the week, rows by genre, Continue watching and My List.',
    link: { href: '/tv/submit', label: 'Filmmakers: submit your film' },
  },
  {
    icon: '💬',
    title: 'Messages',
    text: 'Chat with creators and friends, share videos into a chat, react and reply. Voice messages on Android, iPhone next. For people 18 and over.',
  },
  {
    icon: '🏙️',
    title: 'Home Ground',
    text: 'Represent your city and country. Weekly city and country battles, and the top local creators in each.',
  },
  {
    icon: '⭕',
    title: 'Quick posts',
    text: 'Voice notes and status cards in the ring around your profile picture. Gone after 24 hours.',
  },
  {
    icon: '📶',
    title: 'Light on data',
    text: 'Built for mobile bundles: a profile picture is about 10 KB instead of up to 2 MB, and a feed page about 7 KB instead of 34 KB.',
    link: { href: '/post/wano-is-light-on-your-data', label: 'How we did it' },
  },
  {
    icon: '🛡️',
    title: 'Safe by design',
    text: '"Made with AI" labels, easy reporting and blocking, and no account needed to start watching.',
  },
]

export default function WhatsOnWanoSection() {
  return (
    <section className={styles.section} id="whats-on-wano">
      <div className="container">
        <div className={styles.head}>
          <p className={styles.eyebrow}>What&apos;s on Wano</p>
          <h2 className={styles.title}>Short videos, African films and chat, in one app.</h2>
        </div>
        <div className={styles.grid}>
          {features.map((f) => (
            <div key={f.title} className={styles.card}>
              <div className={styles.icon} aria-hidden="true">{f.icon}</div>
              <h3 className={styles.cardTitle}>{f.title}</h3>
              <p className={styles.cardText}>{f.text}</p>
              {f.link && (
                <Link href={f.link.href} className={styles.cardLink}>{f.link.label} →</Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

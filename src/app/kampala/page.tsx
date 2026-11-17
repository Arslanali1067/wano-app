import type { Metadata } from 'next'
import Link from 'next/link'
import styles from '@/components/Landing.module.css'
import AppTour from '@/components/AppTour'

export const metadata: Metadata = {
  title: 'Wano in Kampala',
  description:
    'Kampala videos, African films and chat, light on your data. Represent Kampala on Home Ground, get featured in Wano Picks, and bring your people.',
  alternates: { canonical: '/kampala' },
  openGraph: {
    title: 'Wano in Kampala: represent your city',
    description:
      'Kampala videos, African films and chat, light on your data. Free on Android and iPhone.',
    url: 'https://wanoafrica.com/kampala',
    images: [{ url: '/images/og-wano.jpg', width: 1200, height: 630, alt: 'Wano: African videos, films and chat' }],
  },
}

const GET = '/get?by=kampala'

const cards = [
  {
    title: 'Represent Kampala',
    text: 'Pick Kampala as your Home Ground. Cities battle every week, and each city shows its top local creators.',
  },
  {
    title: 'Get featured',
    text: 'Every week our team picks the best videos on Wano for Wano Picks. Post your best: comedy, music, dance, food, faith, street life.',
  },
  {
    title: 'Light on your data',
    text: 'Small pictures and compressed pages: a profile picture is about 10 KB instead of up to 2 MB. Your bundle goes on videos.',
  },
  {
    title: 'Wano TV',
    text: 'African films and series, free in the app. Filmmakers in Uganda can submit their work.',
    link: { href: '/submit-film', label: 'Submit your film' },
  },
  {
    title: 'Chat and voice notes',
    text: 'Message creators and friends, share videos into a chat and send voice messages (Android now, iPhone next).',
  },
  {
    title: 'Bring your campus or group',
    text: 'Students, creators, crews and brands in Kampala: talk to us about campus battles, challenges and features.',
    link: { href: '/contact', label: 'Get in touch' },
  },
]

export default function KampalaPage() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.glow} />
        <div className="container">
          <p className={styles.eyebrow}>Wano · Kampala</p>
          <h1 className={styles.h1}>Kampala, represent.</h1>
          <p className={styles.lead}>
            Wano means &ldquo;here&rdquo; in Luganda. Watch and share Kampala&apos;s comedy, music, food and everyday life,
            watch African films on Wano TV, and chat with your people. Free, and light on your data.
          </p>
          <div className={styles.buttons}>
            <a className={styles.btn} href={GET}>Get Wano free</a>
            <Link className={styles.btnGhost} href="/#whats-on-wano">What&apos;s on Wano</Link>
          </div>
          <div className={styles.facts}>
            <span className={styles.fact}><strong>50K+</strong> downloads on Google Play</span>
            <span className={styles.fact}>Android and iPhone</span>
            <span className={styles.fact}>No account needed to start watching</span>
          </div>
        </div>
      </section>
      <AppTour />
      <section className={styles.block}>
        <div className="container">
          <h2 className={styles.h2}>Why Kampala is on Wano</h2>
          <div className={styles.grid}>
            {cards.map((c) => (
              <div key={c.title} className={styles.card}>
                <h3 className={styles.cardTitle}>{c.title}</h3>
                <p className={styles.cardText}>{c.text}</p>
                {c.link && <Link className={styles.cardLink} href={c.link.href}>{c.link.label} →</Link>}
              </div>
            ))}
          </div>
          <p className={styles.note}>
            Creators: ask us for your own invite link. Everyone who joins through it is counted for you.
          </p>
        </div>
      </section>
    </>
  )
}

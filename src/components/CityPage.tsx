// One page per city (wanoafrica.com/lagos, /nairobi ...): what Wano is for there,
// plus that city's top creators and the country's most-watched videos this week,
// live from the app (the Home Ground board).
import Link from 'next/link'
import styles from '@/components/Landing.module.css'
import s from '@/components/Site.module.css'
import AppTour from '@/components/AppTour'
import { PostGrid, RankList } from '@/components/SitePieces'
import Newsletter from '@/components/Newsletter'
import { getCity } from '@/lib/wano'

export type CityCopy = {
  id: string
  name: string
  country: string
  headline: string
  lead: string
  cards: { title: string; text: string; link?: { href: string; label: string } }[]
}

export default async function CityPage({ copy }: { copy: CityCopy }) {
  const live = await getCity(copy.id)
  const get = `/get?by=${copy.id}`
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.glow} />
        <div className="container">
          <p className={styles.eyebrow}>Wano · {copy.name}</p>
          <h1 className={styles.h1}>{copy.headline}</h1>
          <p className={styles.lead}>{copy.lead}</p>
          <div className={styles.buttons}>
            <a className={styles.btn} href={get}>Get Wano free</a>
            <Link className={styles.btnGhost} href="#top">See {copy.name}&apos;s top creators</Link>
          </div>
          <div className={styles.facts}>
            <span className={styles.fact}><strong>50K+</strong> downloads on Google Play</span>
            <span className={styles.fact}>Android and iPhone</span>
            <span className={styles.fact}>No account needed to start watching</span>
          </div>
        </div>
      </section>
      <AppTour />
      <section className={styles.block} id="top">
        <div className="container">
          <div className={s.two}>
            <div>
              <h2 className={styles.h2}>Top in {copy.name} this week</h2>
              <RankList rows={live?.creators ?? []} />
              <p className={s.muted} style={{ marginTop: 10 }}>
                Creators who pick {copy.name} as their Home Ground in the app. <Link href="/trending" style={{ color: '#f2b261' }}>See all charts</Link>
              </p>
            </div>
            <div>
              <h2 className={styles.h2}>Most watched in {copy.country}</h2>
              <PostGrid posts={(live?.posts ?? []).slice(0, 6)} showCreator />
            </div>
          </div>
        </div>
      </section>
      <section className={styles.block}>
        <div className="container">
          <h2 className={styles.h2}>Why {copy.name} is on Wano</h2>
          <div className={styles.grid}>
            {copy.cards.map((c) => (
              <div key={c.title} className={styles.card}>
                <h3 className={styles.cardTitle}>{c.title}</h3>
                <p className={styles.cardText}>{c.text}</p>
                {c.link && <Link className={styles.cardLink} href={c.link.href}>{c.link.label} →</Link>}
              </div>
            ))}
          </div>
          <div style={{ marginTop: 48 }}>
            <Newsletter source={`city-${copy.id}`} />
          </div>
        </div>
      </section>
    </>
  )
}

export const commonCards = (name: string) => [
  {
    title: `Represent ${name}`,
    text: `Pick ${name} as your Home Ground. Cities battle every week, and each city shows its top local creators.`,
  },
  {
    title: 'Get featured',
    text: 'Every week our team picks the best videos on Wano for Wano Picks. Post your best: comedy, music, dance, food, faith, street life.',
  },
  {
    title: 'Wano TV',
    text: 'African films and series, free in the app. Filmmakers can submit their work, and submitting is free.',
    link: { href: '/tv', label: 'See what’s on Wano TV' },
  },
  {
    title: 'Light on your data',
    text: 'Small pictures and compressed pages, so your bundle goes on videos. Watch without an account.',
  },
]

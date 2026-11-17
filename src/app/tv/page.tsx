import type { Metadata } from 'next'
import Link from 'next/link'
import CTASection from '@/components/CTASection'
import { getTvTitles, runtimeLabel, WATCH_LINK } from '@/lib/tv'
import PosterFan from './PosterFan'
import styles from './TvCatalogue.module.css'

export const revalidate = 3600

const DESCRIPTION =
  'Watch African films, documentaries and series free in the Wano app. Stories from Africa and the diaspora, with new titles added as they are selected. Filmmakers: submit your film.'

export const metadata: Metadata = {
  title: 'Wano TV | African films and series, free in the Wano app',
  description: DESCRIPTION,
  alternates: { canonical: '/tv' },
  openGraph: {
    title: 'Wano TV | African films and series, free in the Wano app',
    description: DESCRIPTION,
    url: 'https://wanoafrica.com/tv',
    images: [{ url: '/images/screens/wanotv.webp', alt: 'Wano TV in the Wano app' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wano TV | African films and series, free in the Wano app',
    description: DESCRIPTION,
    images: ['/images/screens/wanotv.webp'],
  },
}

export default async function WanoTvPage() {
  const titles = await getTvTitles()
  const lead = titles[0]
  const list = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Wano TV',
    itemListElement: titles.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `https://wanoafrica.com/tv/${t.slug}`,
      name: t.title,
    })),
  }

  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(list) }} />

      <section className={styles.hero}>
        {lead?.poster && <div className={styles.heroBg} style={{ backgroundImage: `url(${lead.poster})` }} aria-hidden="true" />}
        <div className={`container ${styles.heroGrid}`}>
          <div>
            <p className={styles.eyebrow}><span className={styles.live} />Wano TV · Streaming now</p>
            <h1 className={styles.h1}>
              African films and series, <span className={styles.grad}>free in the Wano app.</span>
            </h1>
            <p className={styles.lead}>
              Documentaries, dramas and series from Africa and the diaspora, picked by our team. Watch on Android or iPhone with no subscription.
            </p>
            <div className={styles.ctas}>
              <a href={WATCH_LINK} className={styles.btnPrimary}>Watch free on Wano →</a>
              <a href="#catalogue" className={styles.btnGhost}>See what&rsquo;s on ↓</a>
            </div>
            <ul className={styles.facts}>
              <li>Free</li>
              <li>{titles.length} titles and growing</li>
              <li>Android and iPhone</li>
            </ul>
          </div>
          <PosterFan items={titles} />
        </div>
      </section>

      <section className={styles.section} id="catalogue">
        <div className="container">
          <div className={styles.sectionHead}>
            <div>
              <h2 className={styles.h2}>Now on Wano TV</h2>
              <p className={styles.sub}>Tap a title for the trailer and the story.</p>
            </div>
          </div>
          <div className={styles.grid}>
            {titles.map((t) => (
              <Link key={t.slug} href={`/tv/${t.slug}`} className={styles.card}>
                <div className={styles.cardArt}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  {t.poster && <img src={t.poster} alt={`${t.title} poster`} loading="lazy" />}
                  <div className={styles.cardBadges}>
                    {t.type === 'series' && <span className={styles.pill}>Series</span>}
                    {t.age_rating && <span className={styles.pill}>{t.age_rating}</span>}
                    {(t.captions?.length ?? 0) > 0 && <span className={styles.pill} title="Subtitles">CC</span>}
                  </div>
                  {t.description && <div className={styles.cardHover}>{t.description}</div>}
                </div>
                <h3 className={styles.cardTitle}>{t.title}</h3>
                <p className={styles.cardMeta}>{[t.genres.slice(0, 2).join(' · '), runtimeLabel(t)].filter(Boolean).join(' · ')}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <div className={styles.appBand}>
            <div className={styles.appPhone}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/screens/wanotv.webp" alt="Wano TV in the Wano app" loading="lazy" />
            </div>
            <div>
              <h2 className={styles.h2}>Made for watching on your phone</h2>
              <ul className={styles.list}>
                <li><span>▶</span><span>Continue watching picks up where you stopped.</span></li>
                <li><span>＋</span><span>Save titles to My List for later.</span></li>
                <li><span>⏭</span><span>The next episode of a series starts on its own.</span></li>
                <li><span>↗</span><span>Share a film with friends in a tap.</span></li>
              </ul>
              <div className={styles.ctas}>
                <a href={WATCH_LINK} className={styles.btnPrimary}>Get Wano free →</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <div className={styles.makers} id="submit-film">
            <p className={styles.eyebrow}>For filmmakers</p>
            <h2 className={styles.h2}>Made a film? Put it on Wano TV.</h2>
            <p className={styles.sub}>
              Shorts, features, documentaries and docuseries from Africa and the diaspora. Submitting is free and your film stays yours.
            </p>
            <div className={styles.ctas}>
              <Link href="/tv/submit" className={styles.btnPrimary}>Submit your film →</Link>
              <Link href="/tv/submit#why-wano-tv" className={styles.btnGhost}>How it works</Link>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  )
}

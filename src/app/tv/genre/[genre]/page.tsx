// wanoafrica.com/tv/genre/<genre>: African films and series in one genre, free on Wano TV.
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import s from '@/components/Site.module.css'
import Newsletter from '@/components/Newsletter'
import { getTvTitles, runtimeLabel, WATCH_LINK } from '@/lib/tv'
import { slugify } from '@/lib/seo'
import styles from '../../TvCatalogue.module.css'

export const revalidate = 3600

type Props = { params: { genre: string } }

async function find(slug: string) {
  const titles = await getTvTitles()
  const genres = Array.from(new Set(titles.flatMap((t) => t.genres)))
  const genre = genres.find((g) => slugify(g) === slug)
  return { genre, titles: genre ? titles.filter((t) => t.genres.includes(genre)) : [], genres }
}

const phrase = (g: string) => (/documentar/i.test(g) ? 'documentaries' : `${g.toLowerCase()} films and series`)

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { genre } = await find(params.genre)
  if (!genre) return { title: 'Not found', robots: { index: false } }
  const title = `African ${phrase(genre)} to watch free | Wano TV`
  return {
    title,
    description: `Watch African ${phrase(genre)} free on Wano TV, on Android and iPhone. Trailers, stories and credits for every title.`,
    alternates: { canonical: `/tv/genre/${slugify(genre)}` },
    openGraph: { title, url: `https://wanoafrica.com/tv/genre/${slugify(genre)}`, images: ['/images/og-wano.jpg'] },
  }
}

export default async function Page({ params }: Props) {
  const { genre, titles, genres } = await find(params.genre)
  if (!genre) notFound()
  return (
    <section className={s.page}>
      <div className="container">
        <p className={s.eyebrow}>Wano TV · {genre}</p>
        <h1 className={s.h1}>African {phrase(genre)}</h1>
        <p className={s.lead}>Free to watch in the Wano app. Tap a title for its trailer and story.</p>
        <div className={styles.grid} style={{ marginTop: 26 }}>
          {titles.map((t) => (
            <Link key={t.slug} href={`/tv/${t.slug}`} className={styles.card}>
              <div className={styles.cardArt}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {t.poster && <img src={t.poster} alt={`${t.title} poster`} loading="lazy" />}
              </div>
              <h3 className={styles.cardTitle}>{t.title}</h3>
              <p className={styles.cardMeta}>{[t.genres.slice(0, 2).join(' · '), runtimeLabel(t)].filter(Boolean).join(' · ')}</p>
            </Link>
          ))}
        </div>
        <div className={s.row} style={{ marginTop: 24 }}><a className={s.btn} href={WATCH_LINK}>Watch free on Wano</a></div>
        <h2 className={s.h2}>Other genres</h2>
        <div className={s.tabs}>
          {genres.filter((g) => g !== genre).map((g) => <Link key={g} href={`/tv/genre/${slugify(g)}`} className={s.tab}>{g}</Link>)}
        </div>
        <div style={{ marginTop: 40 }}><Newsletter source={`tv-genre-${slugify(genre)}`} /></div>
      </div>
    </section>
  )
}

import type { Metadata } from 'next'
import Link from 'next/link'
import { Fragment } from 'react'
import { notFound } from 'next/navigation'
import { getTvTitle, getTvTitles, runtimeLabel, WATCH_LINK, type TvTitle } from '@/lib/tv'
import TrailerPlayer from '../TrailerPlayer'
import styles from '../TvCatalogue.module.css'

export const revalidate = 3600
export const dynamicParams = true

export async function generateStaticParams() {
  return (await getTvTitles()).map((t) => ({ slug: t.slug }))
}

function blurb(t: TvTitle): string {
  const kind = t.type === 'series' ? 'Series' : t.genres.includes('Documentary') ? 'Documentary' : 'Film'
  return `${t.description ?? ''} ${kind}, free on Wano TV in the Wano app.`.trim()
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const t = await getTvTitle(params.slug)
  if (!t) return { title: 'Not found | Wano TV' }
  const title = `${t.title} | Watch free on Wano TV`
  const image = t.trailer?.thumbnail || t.poster
  return {
    title,
    description: blurb(t),
    alternates: { canonical: `/tv/${t.slug}` },
    openGraph: { title, description: blurb(t), url: `https://wanoafrica.com/tv/${t.slug}`, type: 'video.movie', images: image ? [{ url: image, alt: t.title }] : [] },
    twitter: { card: 'summary_large_image', title, description: blurb(t), images: image ? [image] : [] },
  }
}

export default async function TvTitlePage({ params }: { params: { slug: string } }) {
  const all = await getTvTitles()
  const t = all.find((x) => x.slug === params.slug)
  if (!t) notFound()
  const more = all.filter((x) => x.slug !== t.slug)
  const people = (t.makers || []).filter((m) => m.username)
  const runtime = runtimeLabel(t)

  const ld: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': t.type === 'series' ? 'TVSeries' : 'Movie',
    name: t.title,
    description: t.synopsis || t.description,
    image: t.poster,
    url: `https://wanoafrica.com/tv/${t.slug}`,
    genre: t.genres,
    ...(t.release_date ? { datePublished: t.release_date } : {}),
    ...(t.year ? { dateCreated: String(t.year) } : {}),
    ...(t.age_rating && t.age_rating !== 'All' ? { contentRating: t.age_rating } : {}),
    ...(t.duration_minutes && t.type !== 'series' ? { duration: `PT${t.duration_minutes}M` } : {}),
    ...(t.credits?.director ? { director: { '@type': 'Person', name: t.credits.director } } : {}),
    ...(t.credits?.cast?.length ? { actor: t.credits.cast.map((name) => ({ '@type': 'Person', name })) } : {}),
    ...(t.credits?.production ? { productionCompany: { '@type': 'Organization', name: t.credits.production } } : {}),
    ...(t.captions?.length ? { subtitleLanguage: t.captions.map((c) => c.language) } : {}),
    ...(t.trailer?.video_url
      ? { trailer: { '@type': 'VideoObject', name: `${t.title} trailer`, description: t.description, thumbnailUrl: t.trailer.thumbnail || t.poster, contentUrl: t.trailer.video_url, uploadDate: t.release_date, ...(t.trailer.duration_seconds ? { duration: `PT${t.trailer.duration_seconds}S` } : {}) } }
      : {}),
  }

  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <section className={styles.titleHero}>
        {t.poster && <div className={styles.heroBg} style={{ backgroundImage: `url(${t.poster})` }} aria-hidden="true" />}
        <div className={`container ${styles.titleGrid}`}>
          <div className={styles.titlePoster}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {t.poster && <img src={t.poster} alt={`${t.title} poster`} />}
          </div>
          <div>
            <p className={styles.crumbs}><Link href="/tv">Wano TV</Link> / {t.type === 'series' ? 'Series' : 'Films'}</p>
            <h1 className={styles.titleH1}>{t.title}</h1>
            <div className={styles.metaRow}>
              {t.year && <span className={styles.pill}>{t.year}</span>}
              {runtime && <span className={styles.pill}>{runtime}</span>}
              {t.age_rating && <span className={styles.pill}>{t.age_rating === 'All' ? 'All ages' : t.age_rating}</span>}
              {t.genres.map((g) => <span key={g} className={styles.pill}>{g}</span>)}
              {(t.captions?.length ?? 0) > 0 && <span className={styles.pill}>Subtitles: {t.captions!.map((c) => c.label).join(', ')}</span>}
            </div>
            {t.description && <p className={styles.desc}>{t.description}</p>}
            <div className={styles.ctas}>
              <a href={WATCH_LINK} className={styles.btnPrimary}>Watch free on Wano →</a>
              <Link href="/tv" className={styles.btnGhost}>More on Wano TV</Link>
            </div>
            {t.trailer?.video_url && (
              <div className={styles.trailerWrap}>
                <TrailerPlayer src={t.trailer.video_url} poster={t.trailer.thumbnail || t.poster} title={t.title} />
              </div>
            )}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={`container ${styles.body}`}>
          <div>
            <h2 className={styles.h3}>The story</h2>
            <p className={styles.prose}>{t.synopsis || t.description}</p>
          </div>
          <div>
            <h2 className={styles.h3}>Credits</h2>
            <dl className={styles.credits}>
              {t.credits?.director && (<><dt>Director</dt><dd>{t.credits.director}</dd></>)}
              {!!t.credits?.cast?.length && (<><dt>With</dt><dd>{t.credits.cast.join(', ')}</dd></>)}
              {t.credits?.production && (<><dt>Production</dt><dd>{t.credits.production}</dd></>)}
              {people.map((m) => (<Fragment key={m.username}><dt>{m.role}</dt><dd>{m.display_name} on Wano (@{m.username})</dd></Fragment>))}
              <dt>Where to watch</dt><dd>Wano TV, in the Wano app (free)</dd>
            </dl>
          </div>
        </div>
      </section>

      {more.length > 0 && (
        <section className={styles.section}>
          <div className="container">
            <h2 className={styles.h2} style={{ marginBottom: 24 }}>More on Wano TV</h2>
            <div className={styles.grid}>
              {more.map((m) => (
                <Link key={m.slug} href={`/tv/${m.slug}`} className={styles.card}>
                  <div className={styles.cardArt}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    {m.poster && <img src={m.poster} alt={`${m.title} poster`} loading="lazy" />}
                    {m.description && <div className={styles.cardHover}>{m.description}</div>}
                  </div>
                  <h3 className={styles.cardTitle}>{m.title}</h3>
                  <p className={styles.cardMeta}>{[m.genres.slice(0, 2).join(' · '), runtimeLabel(m)].filter(Boolean).join(' · ')}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

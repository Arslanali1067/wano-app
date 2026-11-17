// wanoafrica.com/trending: this week's top creators, sounds and videos on Wano,
// for everyone or one country (?c=ng). Updates by itself from the app's data.
import type { Metadata } from 'next'
import Link from 'next/link'
import s from '@/components/Site.module.css'
import { PostGrid, RankList } from '@/components/SitePieces'
import { getTrending } from '@/lib/wano'

export const revalidate = 600

type Props = { searchParams: { c?: string } }

const COUNTRY = /^[a-z]{2}$/

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const c = (searchParams.c ?? '').toLowerCase()
  const t = COUNTRY.test(c) ? await getTrending(c) : null
  const where = t?.country_name ? ` in ${t.country_name}` : ''
  return {
    title: `Trending on Wano${where} this week`,
    description: `The top creators, sounds and videos on Wano${where} this week: African and diaspora comedy, music, dance, food and everyday life.`,
    alternates: { canonical: t?.country ? `/trending?c=${t.country}` : '/trending' },
    openGraph: { title: `Trending on Wano${where}`, url: 'https://wanoafrica.com/trending', images: ['/images/og-wano.jpg'] },
  }
}

export default async function TrendingPage({ searchParams }: Props) {
  const c = (searchParams.c ?? '').toLowerCase()
  const t = await getTrending(COUNTRY.test(c) ? c : undefined)
  const where = t?.country_name ? ` in ${t.country_name}` : ''
  return (
    <section className={s.page}>
      <div className="container">
        <p className={s.eyebrow}>Updated every few minutes</p>
        <h1 className={s.h1}>Trending on Wano{where}</h1>
        <p className={s.lead}>
          This week&apos;s top creators, sounds and videos, from views, likes, comments and shares in the app.
        </p>
        <nav className={s.tabs} aria-label="Choose a country">
          <Link href="/trending" className={`${s.tab} ${!t?.country ? s.tabOn : ''}`}>Everywhere</Link>
          {(t?.countries ?? []).map((x) => (
            <Link key={x.id} href={`/trending?c=${x.id}`} className={`${s.tab} ${t?.country === x.id ? s.tabOn : ''}`}>
              {x.name}
            </Link>
          ))}
        </nav>
        {!t ? (
          <p className={s.empty}>We couldn&apos;t load this week&apos;s charts just now. Please refresh in a minute.</p>
        ) : (
          <>
            <div className={s.two}>
              <div>
                <h2 className={s.h2}>Top creators this week</h2>
                <RankList rows={t.creators} />
              </div>
              <div>
                <h2 className={s.h2}>Trending sounds</h2>
                {t.sounds.length ? (
                  <ol className={s.ranks}>
                    {t.sounds.map((x, i) => (
                      <li key={`${x.title}-${i}`} className={s.rankRow}>
                        <span className={s.rankNo}>{i + 1}</span>
                        <span className={s.rankName}>
                          <strong>{x.title}</strong>
                          <span>{x.artist || 'Wano sound'}</span>
                        </span>
                        <span className={s.rankMeta}>{x.creators} creators</span>
                      </li>
                    ))}
                  </ol>
                ) : (
                  <p className={s.empty}>No sounds trending yet this week.</p>
                )}
              </div>
            </div>
            <h2 className={s.h2}>Most watched this week</h2>
            <PostGrid posts={t.posts} showCreator />
          </>
        )}
        <div className={s.band} style={{ marginTop: 56 }}>
          <h3>Want to be on this list?</h3>
          <p className={s.text}>Post on Wano. The board resets every Monday, and every creator starts the week at zero.</p>
          <a className={s.btn} href="/get?by=trending">Get Wano free</a>
        </div>
      </div>
    </section>
  )
}

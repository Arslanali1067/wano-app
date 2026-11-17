import type { Metadata } from 'next'
import Link from 'next/link'
import s from '@/components/Site.module.css'
import { getSounds } from '@/lib/wano'

export const revalidate = 3600
export const metadata: Metadata = {
  title: 'Sounds and songs used on Wano',
  description: 'African songs, beats and sounds creators use on Wano, with the videos made with each one.',
  alternates: { canonical: '/sounds' },
}

export default async function Page() {
  const list = (await getSounds()).slice(0, 300)
  return (
    <section className={s.page}>
      <div className="container">
        <p className={s.eyebrow}>Browse Wano</p>
        <h1 className={s.h1}>Sounds and songs on Wano</h1>
        <ol className={s.ranks} style={{ maxWidth: 720, marginTop: 24 }}>
          {list.map((x, i) => (
            <li key={x.id}>
              <Link href={`/sound/${encodeURIComponent(x.id)}`} className={s.rankRow}>
                <span className={s.rankNo}>{i + 1}</span>
                <span className={s.rankName}><strong>{x.title}</strong><span>{x.artist || 'Wano sound'}</span></span>
                <span className={s.rankMeta}>{x.posts} videos</span>
              </Link>
            </li>
          ))}
        </ol>
        {!list.length ? <p className={s.empty}>Couldn&apos;t load sounds just now.</p> : null}
      </div>
    </section>
  )
}

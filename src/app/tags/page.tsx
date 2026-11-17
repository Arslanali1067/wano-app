import type { Metadata } from 'next'
import Link from 'next/link'
import s from '@/components/Site.module.css'
import { getTags } from '@/lib/wano'

export const revalidate = 3600
export const metadata: Metadata = {
  title: 'Popular hashtags on Wano',
  description: 'The most used hashtags on Wano: African comedy, music, dance, food, faith and everyday life.',
  alternates: { canonical: '/tags' },
}

export default async function Page() {
  const tags = (await getTags()).slice(0, 500)
  return (
    <section className={s.page}>
      <div className="container">
        <p className={s.eyebrow}>Browse Wano</p>
        <h1 className={s.h1}>Popular hashtags</h1>
        <div className={s.tabs}>
          {tags.map((t) => <Link key={t.tag} href={`/tag/${encodeURIComponent(t.tag)}`} className={s.tab}>#{t.tag} · {t.posts}</Link>)}
        </div>
        {!tags.length ? <p className={s.empty}>Couldn&apos;t load hashtags just now.</p> : null}
      </div>
    </section>
  )
}

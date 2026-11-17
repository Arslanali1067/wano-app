import type { Metadata } from 'next'
import Link from 'next/link'
import s from '@/components/Site.module.css'
import { getTopics } from '@/lib/wano'
import { COUNTRY_NAMES, TOPICS, countrySlug, topicHeading, topicSlug } from '@/lib/seo'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'African videos by topic and country',
  description: 'Comedy, music, food, faith, sport, fashion and more from Uganda, Nigeria, Kenya, Ghana, South Africa and across Africa and the diaspora, on Wano.',
  alternates: { canonical: '/videos' },
}

export default async function Page() {
  const rows = await getTopics()
  const overall = rows.filter((r) => !r.country && TOPICS[r.topic])
  return (
    <section className={s.page}>
      <div className="container">
        <p className={s.eyebrow}>Browse Wano</p>
        <h1 className={s.h1}>African videos by topic and country</h1>
        <p className={s.lead}>Real videos from creators on Wano, grouped by what they&apos;re about and where they&apos;re from.</p>
        {overall.map((t) => {
          const byCountry = rows.filter((r) => r.topic === t.topic && r.country && COUNTRY_NAMES[r.country])
          return (
            <div key={t.topic}>
              <h2 className={s.h2}><Link href={`/videos/${topicSlug(t.topic)}`} style={{ color: '#fff' }}>{TOPICS[t.topic].title}</Link></h2>
              <div className={s.tabs}>
                <Link href={`/videos/${topicSlug(t.topic)}`} className={s.tab}>{topicHeading(t.topic)}</Link>
                {byCountry.map((r) => (
                  <Link key={r.country} href={`/videos/${topicSlug(t.topic)}/${countrySlug(r.country!)}`} className={s.tab}>
                    {topicHeading(t.topic, r.country)}
                  </Link>
                ))}
              </div>
            </div>
          )
        })}
        {!overall.length ? <p className={s.empty}>Loading the topics failed. Please refresh in a minute.</p> : null}
      </div>
    </section>
  )
}

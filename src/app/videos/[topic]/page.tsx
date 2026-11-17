import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ListingPage from '@/components/ListingPage'
import { getTopic } from '@/lib/wano'
import { COUNTRY_NAMES, TOPICS, countrySlug, topicFromSlug, topicHeading, topicSlug } from '@/lib/seo'

export const revalidate = 1800

type Props = { params: { topic: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const k = topicFromSlug(params.topic)
  if (!k) return { title: 'Not found', robots: { index: false } }
  const title = `${topicHeading(k)} | Watch free on Wano`
  return {
    title,
    description: `${TOPICS[k].blurb} from creators across Africa and the diaspora. Watch African ${TOPICS[k].phrase} free on Wano.`,
    alternates: { canonical: `/videos/${topicSlug(k)}` },
    openGraph: { title, url: `https://wanoafrica.com/videos/${topicSlug(k)}`, images: ['/images/og-wano.jpg'] },
  }
}

export default async function Page({ params }: Props) {
  const k = topicFromSlug(params.topic)
  const t = k ? await getTopic(k) : null
  if (!k || !t) notFound()
  return (
    <ListingPage
      eyebrow={`Wano · ${TOPICS[k].title}`}
      title={topicHeading(k)}
      lead={`${TOPICS[k].blurb} from creators across Africa and the diaspora: ${t.posts_count.toLocaleString()} posts on Wano so far.`}
      posts={t.posts}
      creators={t.creators}
      linksTitle="By country"
      links={t.countries.filter((c) => COUNTRY_NAMES[c.id]).map((c) => ({ href: `/videos/${topicSlug(k)}/${countrySlug(c.id)}`, label: topicHeading(k, c.id) }))}
      cta={`/get?by=topic-${topicSlug(k)}`}
    />
  )
}

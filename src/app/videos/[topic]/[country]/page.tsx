import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ListingPage from '@/components/ListingPage'
import { getTopic } from '@/lib/wano'
import { COUNTRY_NAMES, TOPICS, countryFromSlug, countrySlug, topicFromSlug, topicHeading, topicSlug } from '@/lib/seo'

export const revalidate = 1800

type Props = { params: { topic: string; country: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const k = topicFromSlug(params.topic)
  const cc = countryFromSlug(params.country)
  if (!k || !cc) return { title: 'Not found', robots: { index: false } }
  const title = `${topicHeading(k, cc)} | Watch free on Wano`
  const where = COUNTRY_NAMES[cc]
  return {
    title,
    description: `${TOPICS[k].blurb} from creators in ${where}. Watch ${topicHeading(k, cc).toLowerCase()} free on Wano, on Android and iPhone.`,
    alternates: { canonical: `/videos/${topicSlug(k)}/${countrySlug(cc)}` },
    openGraph: { title, url: `https://wanoafrica.com/videos/${topicSlug(k)}/${countrySlug(cc)}`, images: ['/images/og-wano.jpg'] },
  }
}

export default async function Page({ params }: Props) {
  const k = topicFromSlug(params.topic)
  const cc = countryFromSlug(params.country)
  const t = k && cc ? await getTopic(k, cc) : null
  if (!k || !cc || !t) notFound()
  return (
    <ListingPage
      eyebrow={`Wano · ${COUNTRY_NAMES[cc]}`}
      title={topicHeading(k, cc)}
      lead={`${TOPICS[k].blurb} from creators in ${COUNTRY_NAMES[cc]}: ${t.posts_count.toLocaleString()} posts on Wano so far.`}
      posts={t.posts}
      creators={t.creators}
      linksTitle={`More from ${COUNTRY_NAMES[cc]}`}
      links={[
        ...t.related.filter((r) => TOPICS[r.topic]).map((r) => ({ href: `/videos/${topicSlug(r.topic)}/${countrySlug(cc)}`, label: topicHeading(r.topic, cc) })),
        { href: `/videos/${topicSlug(k)}`, label: topicHeading(k) },
        { href: `/trending/${countrySlug(cc)}`, label: `Trending in ${COUNTRY_NAMES[cc]}` },
      ]}
      cta={`/get?by=topic-${topicSlug(k)}-${cc}`}
    />
  )
}

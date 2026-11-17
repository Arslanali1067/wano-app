import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ListingPage from '@/components/ListingPage'
import { getTag } from '@/lib/wano'

export const revalidate = 1800

type Props = { params: { tag: string } }
const clean = (t: string) => {
  try { return decodeURIComponent(t).replace(/^#/, '').toLowerCase() } catch { return t.toLowerCase() }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = await getTag(clean(params.tag))
  if (!t) return { title: 'Not found', robots: { index: false } }
  const title = `#${t.tag} videos on Wano`
  return {
    title,
    description: `Watch ${t.posts_count.toLocaleString()} #${t.tag} videos from creators across Africa and the diaspora, free on Wano.`,
    alternates: { canonical: `/tag/${encodeURIComponent(t.tag)}` },
    openGraph: { title, url: `https://wanoafrica.com/tag/${encodeURIComponent(t.tag)}`, images: t.posts[0]?.thumbnail ? [t.posts[0].thumbnail] : ['/images/og-wano.jpg'] },
  }
}

export default async function Page({ params }: Props) {
  const t = await getTag(clean(params.tag))
  if (!t) notFound()
  return (
    <ListingPage
      eyebrow="Hashtag on Wano"
      title={`#${t.tag}`}
      lead={`${t.posts_count.toLocaleString()} posts tagged #${t.tag} on Wano. Here are the most watched.`}
      posts={t.posts}
      creators={t.creators}
      linksTitle="Related hashtags"
      links={t.related.map((r) => ({ href: `/tag/${encodeURIComponent(r)}`, label: `#${r}` }))}
      cta={`/get?by=tag-${t.tag.replace(/[^a-z0-9]/g, '').slice(0, 30)}`}
    />
  )
}

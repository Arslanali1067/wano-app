import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ListingPage from '@/components/ListingPage'
import { getSound } from '@/lib/wano'

export const revalidate = 1800

type Props = { params: { id: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const x = await getSound(params.id)
  if (!x) return { title: 'Not found', robots: { index: false } }
  const name = x.artist ? `${x.title} by ${x.artist}` : x.title
  const title = `${name}: videos using this sound on Wano`
  return {
    title,
    description: `${x.posts_count.toLocaleString()} videos made with "${x.title}"${x.artist ? ` by ${x.artist}` : ''} on Wano. Watch them free and use the sound in your own video.`,
    alternates: { canonical: `/sound/${encodeURIComponent(x.id)}` },
    openGraph: { title, url: `https://wanoafrica.com/sound/${encodeURIComponent(x.id)}`, images: x.posts[0]?.thumbnail ? [x.posts[0].thumbnail] : ['/images/og-wano.jpg'] },
  }
}

export default async function Page({ params }: Props) {
  const x = await getSound(params.id)
  if (!x) notFound()
  return (
    <ListingPage
      eyebrow="Sound on Wano"
      title={x.title}
      lead={`${x.artist ? `By ${x.artist}. ` : ''}${x.posts_count.toLocaleString()} videos on Wano use this sound. Open Wano to make your own with it.`}
      posts={x.posts}
      creators={x.creators}
      linksTitle="More"
      links={[{ href: '/sounds', label: 'All sounds' }, { href: '/trending', label: 'Trending this week' }]}
      cta="/get?by=sound"
    />
  )
}

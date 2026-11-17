import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import TrendingView from '@/components/TrendingView'
import { COUNTRY_NAMES, countryFromSlug, countrySlug } from '@/lib/seo'

export const revalidate = 600

type Props = { params: { country: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cc = countryFromSlug(params.country)
  if (!cc) return { title: 'Not found', robots: { index: false } }
  const where = COUNTRY_NAMES[cc]
  return {
    title: `Trending in ${where} this week | Wano`,
    description: `The top creators, sounds and videos in ${where} on Wano this week: comedy, music, dance, food and everyday life.`,
    alternates: { canonical: `/trending/${countrySlug(cc)}` },
    openGraph: { title: `Trending in ${where} on Wano`, url: `https://wanoafrica.com/trending/${countrySlug(cc)}`, images: ['/images/og-wano.jpg'] },
  }
}

export default function Page({ params }: Props) {
  const cc = countryFromSlug(params.country)
  if (!cc) notFound()
  return <TrendingView country={cc} />
}

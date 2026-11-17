// wanoafrica.com/trending: this week's top creators, sounds and videos on Wano,
// for everyone or one country (?c=ng). Updates by itself from the app's data.
import type { Metadata } from 'next'
import TrendingView from '@/components/TrendingView'
import { countryFromSlug, countrySlug } from '@/lib/seo'
import { redirect } from 'next/navigation'

export const revalidate = 600

type Props = { searchParams: { c?: string } }

const COUNTRY = /^[a-z]{2}$/

export const metadata: Metadata = {
  title: 'Trending on Wano this week',
  description: 'The top creators, sounds and videos on Wano this week: African and diaspora comedy, music, dance, food and everyday life.',
  alternates: { canonical: '/trending' },
  openGraph: { title: 'Trending on Wano', url: 'https://wanoafrica.com/trending', images: ['/images/og-wano.jpg'] },
}

export default async function TrendingPage({ searchParams }: Props) {
  const c = (searchParams.c ?? '').toLowerCase()
  // Old ?c=ng links go to the country's own address.
  if (COUNTRY.test(c) && countryFromSlug(countrySlug(c)) === c) redirect(`/trending/${countrySlug(c)}`)
  return <TrendingView />
}


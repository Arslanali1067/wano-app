import type { Metadata } from 'next'
import CityPage, { commonCards } from '@/components/CityPage'

export const revalidate = 600

export const metadata: Metadata = {
  title: 'Wano in Nairobi',
  description: "Gengetone, comedy, Sheng, food and everyday Nairobi life. Watch and share it on Wano, watch African films on Wano TV, and chat with your people. Free, and light on your data.",
  alternates: { canonical: '/nairobi' },
  openGraph: {
    title: "Wano in Nairobi: Nairobi, tuko hapa.",
    description: "Gengetone, comedy, Sheng, food and everyday Nairobi life. Watch and share it on Wano, watch African films on Wano TV, and chat with your people. Free, and light on your data.",
    url: 'https://wanoafrica.com/nairobi',
    images: [{ url: '/images/og-wano.jpg', width: 1200, height: 630, alt: 'Wano: African videos, films and chat' }],
  },
}

export default function Page() {
  return (
    <CityPage
      copy={{
        id: 'nairobi',
        name: 'Nairobi',
        country: "Kenya",
        headline: "Nairobi, tuko hapa.",
        lead: "Gengetone, comedy, Sheng, food and everyday Nairobi life. Watch and share it on Wano, watch African films on Wano TV, and chat with your people. Free, and light on your data.",
        cards: [...[{"title": "Gengetone to gospel", "text": "Post your music, dance, comedy and church moments. Every sound you use can trend on Wano."}], ...commonCards('Nairobi')],
      }}
    />
  )
}

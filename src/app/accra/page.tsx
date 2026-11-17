import type { Metadata } from 'next'
import CityPage, { commonCards } from '@/components/CityPage'

export const revalidate = 600

export const metadata: Metadata = {
  title: 'Wano in Accra',
  description: "Highlife and Afrobeats, comedy, food and everyday Accra life. Watch and share it on Wano, watch African films on Wano TV, and chat with your people. Free, and light on your data.",
  alternates: { canonical: '/accra' },
  openGraph: {
    title: "Wano in Accra: Accra, we see you.",
    description: "Highlife and Afrobeats, comedy, food and everyday Accra life. Watch and share it on Wano, watch African films on Wano TV, and chat with your people. Free, and light on your data.",
    url: 'https://wanoafrica.com/accra',
    images: [{ url: '/images/og-wano.jpg', width: 1200, height: 630, alt: 'Wano: African videos, films and chat' }],
  },
}

export default function Page() {
  return (
    <CityPage
      copy={{
        id: 'accra',
        name: 'Accra',
        country: "Ghana",
        headline: "Accra, we see you.",
        lead: "Highlife and Afrobeats, comedy, food and everyday Accra life. Watch and share it on Wano, watch African films on Wano TV, and chat with your people. Free, and light on your data.",
        cards: [...[{"title": "Food, music and style", "text": "Jollof debates, highlife, fashion and street life: post what makes Accra Accra."}], ...commonCards('Accra')],
      }}
    />
  )
}

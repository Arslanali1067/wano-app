import type { Metadata } from 'next'
import CityPage, { commonCards } from '@/components/CityPage'

export const revalidate = 600

export const metadata: Metadata = {
  title: 'Wano in London',
  description: "Videos from home and from the diaspora: music, comedy, food, faith and family. Stay close to the culture, watch African films on Wano TV, and chat with your people. Free.",
  alternates: { canonical: '/london' },
  openGraph: {
    title: "Wano in London: London's African diaspora, together.",
    description: "Videos from home and from the diaspora: music, comedy, food, faith and family. Stay close to the culture, watch African films on Wano TV, and chat with your people. Free.",
    url: 'https://wanoafrica.com/london',
    images: [{ url: '/images/og-wano.jpg', width: 1200, height: 630, alt: 'Wano: African videos, films and chat' }],
  },
}

export default function Page() {
  return (
    <CityPage
      copy={{
        id: 'london',
        name: 'London',
        country: "the United Kingdom",
        headline: "London's African diaspora, together.",
        lead: "Videos from home and from the diaspora: music, comedy, food, faith and family. Stay close to the culture, watch African films on Wano TV, and chat with your people. Free.",
        cards: [...[{"title": "Close to home", "text": "Follow creators from Lagos, Accra, Nairobi, Kampala and Johannesburg, and share your own diaspora life."}], ...commonCards('London')],
      }}
    />
  )
}

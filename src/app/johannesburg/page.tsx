import type { Metadata } from 'next'
import CityPage, { commonCards } from '@/components/CityPage'

export const revalidate = 600

export const metadata: Metadata = {
  title: 'Wano in Johannesburg',
  description: "Amapiano, dance challenges, comedy and everyday Joburg life. Watch and share it on Wano, watch African films on Wano TV, and chat with your people. Free, and light on your data.",
  alternates: { canonical: '/johannesburg' },
  openGraph: {
    title: "Wano in Johannesburg: Jozi, it's your stage.",
    description: "Amapiano, dance challenges, comedy and everyday Joburg life. Watch and share it on Wano, watch African films on Wano TV, and chat with your people. Free, and light on your data.",
    url: 'https://wanoafrica.com/johannesburg',
    images: [{ url: '/images/og-wano.jpg', width: 1200, height: 630, alt: 'Wano: African videos, films and chat' }],
  },
}

export default function Page() {
  return (
    <CityPage
      copy={{
        id: 'johannesburg',
        name: 'Johannesburg',
        country: "South Africa",
        headline: "Jozi, it's your stage.",
        lead: "Amapiano, dance challenges, comedy and everyday Joburg life. Watch and share it on Wano, watch African films on Wano TV, and chat with your people. Free, and light on your data.",
        cards: [...[{"title": "Amapiano and dance", "text": "Start a dance challenge or join one. Every sound you use can trend on Wano."}], ...commonCards('Johannesburg')],
      }}
    />
  )
}

import type { Metadata } from 'next'
import CityPage, { commonCards } from '@/components/CityPage'

export const revalidate = 600

export const metadata: Metadata = {
  title: 'Wano in Lagos',
  description: "Comedy skits, Afrobeats, Nollywood moments, food and everyday Lagos life. Watch and share it on Wano, watch African films on Wano TV, and chat with your people. Free, and light on your data.",
  alternates: { canonical: '/lagos' },
  openGraph: {
    title: "Wano in Lagos: Lagos, show the world.",
    description: "Comedy skits, Afrobeats, Nollywood moments, food and everyday Lagos life. Watch and share it on Wano, watch African films on Wano TV, and chat with your people. Free, and light on your data.",
    url: 'https://wanoafrica.com/lagos',
    images: [{ url: '/images/og-wano.jpg', width: 1200, height: 630, alt: 'Wano: African videos, films and chat' }],
  },
}

export default function Page() {
  return (
    <CityPage
      copy={{
        id: 'lagos',
        name: 'Lagos',
        country: "Nigeria",
        headline: "Lagos, show the world.",
        lead: "Comedy skits, Afrobeats, Nollywood moments, food and everyday Lagos life. Watch and share it on Wano, watch African films on Wano TV, and chat with your people. Free, and light on your data.",
        cards: [...[{"title": "Skits and music", "text": "Lagos sets the pace for comedy and Afrobeats. Post your skits, covers and dance videos where African audiences are watching."}], ...commonCards('Lagos')],
      }}
    />
  )
}

import type { Metadata } from 'next'
import CityPage from '@/components/CityPage'

export const metadata: Metadata = {
  title: 'Wano in Kampala',
  description:
    'Kampala videos, African films and chat, light on your data. Represent Kampala on Home Ground, get featured in Wano Picks, and bring your people.',
  alternates: { canonical: '/kampala' },
  openGraph: {
    title: 'Wano in Kampala: represent your city',
    description:
      'Kampala videos, African films and chat, light on your data. Free on Android and iPhone.',
    url: 'https://wanoafrica.com/kampala',
    images: [{ url: '/images/og-wano.jpg', width: 1200, height: 630, alt: 'Wano: African videos, films and chat' }],
  },
}

const cards = [
  {
    title: 'Represent Kampala',
    text: 'Pick Kampala as your Home Ground. Cities battle every week, and each city shows its top local creators.',
  },
  {
    title: 'Get featured',
    text: 'Every week our team picks the best videos on Wano for Wano Picks. Post your best: comedy, music, dance, food, faith, street life.',
  },
  {
    title: 'Light on your data',
    text: 'Small pictures and compressed pages: a profile picture is about 10 KB instead of up to 2 MB. Your bundle goes on videos.',
  },
  {
    title: 'Wano TV',
    text: 'African films and series, free in the app. Filmmakers in Uganda can submit their work.',
    link: { href: '/tv/submit', label: 'Submit your film' },
  },
  {
    title: 'Chat and voice notes',
    text: 'Message creators and friends, share videos into a chat and send voice messages (Android now, iPhone next).',
  },
  {
    title: 'Bring your campus or group',
    text: 'Students, creators, crews and brands in Kampala: talk to us about campus battles, challenges and features.',
    link: { href: '/contact', label: 'Get in touch' },
  },
]

export const revalidate = 600

export default function KampalaPage() {
  return (
    <CityPage
      copy={{
        id: 'kampala',
        name: 'Kampala',
        country: 'Uganda',
        headline: 'Kampala, represent.',
        lead: 'Wano means “here” in Luganda. Watch and share Kampala’s comedy, music, food and everyday life, watch African films on Wano TV, and chat with your people. Free, and light on your data.',
        cards,
      }}
    />
  )
}

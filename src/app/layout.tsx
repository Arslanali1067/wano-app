import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Analytics } from "@vercel/analytics/next"

const SITE_URL = 'https://wanoafrica.com'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'WANO — A Global Platform Rooted in Culture',
    template: '%s | WANO',
  },
  description:
    'WANO is a short-form video platform connecting Africa, the Diaspora, and communities worldwide shaped by Afrocentric influence. Watch culture move, share your vibe, and connect.',
  keywords: [
    'WANO',
    'Wano App',
    'Afrocentric video platform',
    'African short videos',
    'Afrobeat creators',
    'African culture app',
    'Short form video Africa',
    'Watch Culture Move',
    'African diaspora video platform',
  ],
  authors: [{ name: 'WANO', url: SITE_URL }],
  creator: 'WANO',
  publisher: 'WANO',
  icons: {
    icon: '/wano-favicon.png',
    shortcut: '/wano-favicon.png',
    apple: '/wano-favicon.png',
  },
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'WANO — A Global Platform Rooted in Culture',
    description:
      'A short-form video platform connecting Africa, the Diaspora, and communities worldwide shaped by Afrocentric influence.',
    url: SITE_URL,
    siteName: 'WANO',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/images/wano-logo.png',
        width: 1200,
        height: 630,
        alt: 'WANO - Watch Culture Move',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WANO — A Global Platform Rooted in Culture',
    description:
      'A short-form video platform connecting Africa, the Diaspora, and communities worldwide shaped by Afrocentric influence.',
    site: '@Wano2025',
    creator: '@Wano2025',
    images: ['/images/wano-logo.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'WANO',
    url: SITE_URL,
    logo: `${SITE_URL}/images/wano-logo.png`,
    sameAs: [
      'https://www.instagram.com/wanoapp/',
      'https://www.tiktok.com/@wanoapp6',
      'https://x.com/Wano2025',
      'https://www.youtube.com/@wano-app',
    ],
    description:
      'A short-form video platform connecting Africa, the Diaspora, and communities worldwide shaped by Afrocentric influence.',
  }

  const webSiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'WANO',
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([organizationSchema, webSiteSchema]),
          }}
        />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Analytics />
        <Footer />
      </body>
    </html>
  )
}


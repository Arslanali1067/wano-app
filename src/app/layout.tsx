import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Analytics } from "@vercel/analytics/next"

export const metadata: Metadata = {
  title: 'WANO — A Global Platform Rooted in Culture',
  description: 'A short-form video platform connecting Africa, the Diaspora, and communities worldwide shaped by Afrocentric influence. ',
  icons: {
    icon: '/wano-favicon.png',
    shortcut: '/wano-favicon.png',
    apple: '/wano-favicon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Analytics />
        <Footer />
      </body>
    </html>
  )
}

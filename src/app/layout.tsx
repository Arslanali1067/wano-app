import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Wano - Africa to the World',
  description: 'A video app Born from Afrocentric culture, built for the world — all people, all stories, all vibes.',
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
        <Footer />
      </body>
    </html>
  )
}

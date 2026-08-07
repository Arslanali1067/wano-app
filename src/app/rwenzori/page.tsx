import type { Metadata } from 'next'
import RwenzoriClient from './RwenzoriClient'

export const metadata: Metadata = {
  title: 'Get Wano',
  description: 'Get the Wano app on the App Store or Google Play.',
  itunes: {
    appId: '6753104927',
  },
}

export default function RwenzoriPage() {
  return <RwenzoriClient />
}

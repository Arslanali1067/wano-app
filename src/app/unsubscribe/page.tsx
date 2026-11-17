import type { Metadata } from 'next'
import s from '@/components/Site.module.css'
import Unsub from './Unsub'

export const metadata: Metadata = { title: 'Unsubscribe', robots: { index: false } }

export default function Page({ searchParams }: { searchParams: { token?: string } }) {
  const token = typeof searchParams.token === 'string' ? searchParams.token.slice(0, 64) : ''
  return (
    <section className={s.page}>
      <div className={`container ${s.narrow}`}>
        <h1 className={s.h1}>Stop emails from Wano</h1>
        <p className={s.lead}>Press the button and we&apos;ll take you off the Wano TV mailing list.</p>
        <Unsub token={token} />
      </div>
    </section>
  )
}

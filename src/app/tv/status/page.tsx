import type { Metadata } from 'next'
import Link from 'next/link'
import s from '@/components/Site.module.css'
import StatusCheck from './StatusCheck'

export const metadata: Metadata = {
  title: 'Check your film submission',
  description: 'Filmmakers: see where your Wano TV submission is, from Received to On Wano TV.',
  alternates: { canonical: '/tv/status' },
}

export default function Page() {
  return (
    <section className={s.page}>
      <div className={`container ${s.narrow}`}>
        <p className={s.eyebrow}>Wano TV · For filmmakers</p>
        <h1 className={s.h1}>Where is my film?</h1>
        <p className={s.lead}>
          Type the reference from your confirmation email (it starts with WTV-) and the email address you submitted with.
        </p>
        <StatusCheck />
        <p className={s.muted} style={{ marginTop: 28 }}>
          Sent your film before 17 November 2026? Those submissions are handled by email: reply to our last message and
          we&apos;ll update you. Haven&apos;t submitted yet? <Link href="/tv/submit" style={{ color: '#f2b261' }}>Submit your film</Link>.
        </p>
      </div>
    </section>
  )
}

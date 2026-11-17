import type { Metadata } from 'next'
import Link from 'next/link'
import s from '@/components/Site.module.css'
import SiteForm from '@/components/SiteForm'

export const metadata: Metadata = {
  title: 'Press and partners',
  description: 'Wano at a glance: facts, logo, screenshots and contacts for journalists, partners and investors.',
  alternates: { canonical: '/press' },
}

const facts = [
  { n: '2025', t: 'Founded in September 2025' },
  { n: '50K+', t: 'Downloads on Google Play' },
  { n: '2', t: 'Platforms: Android and iPhone' },
  { n: 'Free', t: 'To watch, with no account needed' },
]

const screens = ['feed-foryou', 'trending-country', 'wanotv', 'discover']

export default function Page() {
  return (
    <section className={s.page}>
      <div className="container">
        <p className={s.eyebrow}>Press and partners</p>
        <h1 className={s.h1}>Wano at a glance</h1>
        <p className={s.lead} style={{ maxWidth: 780 }}>
          Wano is a short-video app and streaming service for African and diaspora culture: everyday videos from creators
          across the continent and beyond, and Wano TV, a free home for African films and series. Wano means &ldquo;here&rdquo; in Luganda.
        </p>
        <div className={s.cards} style={{ marginTop: 30 }}>
          {facts.map((f) => (
            <div key={f.t} className={s.card}><p className={s.bigNumber}>{f.n}</p><p>{f.t}</p></div>
          ))}
        </div>

        <h2 className={s.h2}>What Wano is</h2>
        <div className={s.cards}>
          <div className={s.card}><h3>Short videos</h3><p>New, For You and Trending feeds of comedy, music, dance, food, faith and street life from Africa and the diaspora.</p></div>
          <div className={s.card}><h3>Wano TV</h3><p>African films, documentaries and series, free in the app, from filmmakers who submit their work and sign a licence. <Link href="/tv" style={{ color: '#f2b261' }}>See what&apos;s on</Link></p></div>
          <div className={s.card}><h3>Home Ground</h3><p>Creators represent their city, and cities compete every week. <Link href="/trending" style={{ color: '#f2b261' }}>This week&apos;s charts</Link></p></div>
          <div className={s.card}><h3>Light on data</h3><p>Built for people who pay for every megabyte: small pictures and compressed pages, so the data goes on videos.</p></div>
        </div>

        <h2 className={s.h2}>Founder</h2>
        <p className={s.text} style={{ maxWidth: 780 }}>
          Wano was founded by Eilmer Bahri, a filmmaker and documentarian with roots in Kampala, Uganda, and founder of the
          production company Ondore Media. Wano is run by wano app LLC.
        </p>

        <h2 className={s.h2}>Logo and screenshots</h2>
        <p className={s.text}>Free to use in coverage of Wano. Please don&apos;t change the logo&apos;s colours or shape.</p>
        <div className={s.row} style={{ alignItems: 'flex-start' }}>
          <a className={s.card} href="/images/wano-logo.png" download style={{ textDecoration: 'none' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/wano-logo.png" alt="Wano logo" style={{ height: 70, display: 'block', marginBottom: 10 }} />
            <p>Logo (PNG) ↓</p>
          </a>
          {screens.map((n) => (
            <a key={n} className={s.card} href={`/images/screens/${n}.webp`} download style={{ textDecoration: 'none', padding: 10 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/images/screens/${n}.webp`} alt={`Wano app screen: ${n.replace('-', ' ')}`} style={{ height: 200, borderRadius: 10, display: 'block' }} />
            </a>
          ))}
        </div>

        <div className={s.narrow} style={{ marginTop: 50 }}>
          <h2 className={s.h2}>Get in touch</h2>
          <p className={s.text}>Journalists, partners and investors: send us a message and we&apos;ll reply by email. Want to advertise? Use <Link href="/advertise" style={{ color: '#f2b261' }}>Advertise with Wano</Link>.</p>
          <SiteForm
            endpoint="/api/enquiry"
            fixed={{ kind: 'press' }}
            submitLabel="Send"
            done="Thank you. We have your message and we'll reply by email."
            fields={[
              { name: 'name', label: 'Your name', required: true, max: 100 },
              { name: 'company', label: 'Publication or organisation', max: 120 },
              { name: 'email', label: 'Email', type: 'email', required: true, max: 254 },
              { name: 'message', label: 'Message', type: 'textarea', required: true, max: 3000 },
            ]}
          />
        </div>
      </div>
    </section>
  )
}

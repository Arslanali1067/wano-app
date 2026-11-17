import type { Metadata } from 'next'
import s from '@/components/Site.module.css'
import SiteForm from '@/components/SiteForm'

export const metadata: Metadata = {
  title: 'Advertise on Wano',
  description: 'Reach African and diaspora audiences on Wano: local sponsored cards with a WhatsApp, Call or Visit button, Wano TV sponsorships and creator campaigns.',
  alternates: { canonical: '/advertise' },
}

const ways = [
  { title: 'Local sponsored cards', text: 'A small card in the feed with your picture and one button: WhatsApp, Call or Visit. Shown to people near your business, at most a couple of times a session so it never feels like spam.' },
  { title: 'Wano TV sponsorship', text: 'Present a film or series on Wano TV: your brand on the title page and in our posts about it.' },
  { title: 'Creator campaigns', text: 'Work with Wano creators on challenges, product moments and launches, made in their own style for their own audience.' },
  { title: 'Challenges and city battles', text: 'Sponsor a weekly challenge or a city battle on Home Ground, with your sound or hashtag at the centre.' },
]

export default function Page() {
  return (
    <section className={s.page}>
      <div className="container">
        <p className={s.eyebrow}>Advertise with Wano</p>
        <h1 className={s.h1}>Reach Africa and the diaspora</h1>
        <p className={s.lead} style={{ maxWidth: 760 }}>
          Wano is a free video app for African and diaspora culture, on Android and iPhone, with 50K+ downloads on Google Play.
          Tell us what you&apos;d like to promote and we&apos;ll come back with options that fit your budget, from one local shop to a national brand.
        </p>
        <div className={s.cards} style={{ marginTop: 30 }}>
          {ways.map((w) => (
            <div key={w.title} className={s.card}><h3>{w.title}</h3><p>{w.text}</p></div>
          ))}
        </div>
        <div className={s.narrow} style={{ marginTop: 50 }}>
          <h2 className={s.h2}>Tell us about your campaign</h2>
          <p className={s.text}>We reply by email, usually within two working days.</p>
          <SiteForm
            endpoint="/api/enquiry"
            fixed={{ kind: 'advertise' }}
            submitLabel="Send"
            done="Thank you. We have your message and we'll be in touch by email soon."
            fields={[
              { name: 'name', label: 'Your name', required: true, max: 100 },
              { name: 'company', label: 'Business or brand', max: 120 },
              { name: 'email', label: 'Email', type: 'email', required: true, max: 254 },
              { name: 'phone', label: 'Phone or WhatsApp', type: 'tel', max: 40 },
              { name: 'country', label: 'Where are your customers?', placeholder: 'e.g. Kampala, Lagos, the UK', max: 60 },
              { name: 'budget', label: 'Monthly budget', type: 'select', options: ['Under $100', '$100 – $500', '$500 – $2,000', '$2,000 – $10,000', 'Over $10,000', 'Not sure yet'] },
              { name: 'message', label: 'What would you like to promote?', type: 'textarea', required: true, max: 3000 },
            ]}
          />
        </div>
      </div>
    </section>
  )
}

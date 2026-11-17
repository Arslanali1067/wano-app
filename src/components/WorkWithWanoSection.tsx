import Link from 'next/link'
import styles from './Landing.module.css'

// For brands, investors and press. Only facts that can be checked publicly.
const cards = [
  {
    title: 'Brands and advertisers',
    text: 'Reach people across Africa and the diaspora through creators they already watch: sponsored challenges, creator campaigns and Wano TV. Tell us who you want to reach and we will shape it with you.',
    link: { href: '/contact', label: 'Talk to us about a campaign' },
  },
  {
    title: 'Investors',
    text: 'Wano is a short-video, film and messaging app built for Africa and the diaspora, light on mobile data. We are happy to share where we are and where we are going.',
    link: { href: '/contact', label: 'Get in touch' },
  },
  {
    title: 'Press and partners',
    text: 'Telecoms, cultural organisations, film festivals and media: we work with partners who want African stories seen.',
    link: { href: '/contact', label: 'Contact the team' },
  },
]

export default function WorkWithWanoSection() {
  return (
    <section className={styles.block} id="work-with-wano">
      <div className="container">
        <h2 className={styles.h2}>Work with Wano</h2>
        <div className={styles.facts} style={{ marginTop: 0, marginBottom: 30 }}>
          <span className={styles.fact}><strong>50K+</strong> downloads on Google Play</span>
          <span className={styles.fact}>Short videos, Wano TV films and chat</span>
          <span className={styles.fact}>Africa and the diaspora</span>
        </div>
        <div className={styles.grid}>
          {cards.map((c) => (
            <div key={c.title} className={styles.card}>
              <h3 className={styles.cardTitle}>{c.title}</h3>
              <p className={styles.cardText}>{c.text}</p>
              <Link className={styles.cardLink} href={c.link.href}>{c.link.label} →</Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

import styles from '@/components/HeroSection.module.css'

export default function WanoStudioPage() {
  return (
    <main>
      <section className={`section ${styles.heroSection} ${styles.studioHero}`}>
        <div className="container">
          <div className={styles.studioHeroCard}>
            <h1>
              <span className={styles.studioWanoWord}>WANO</span> Studio
            </h1>
            <p>In development – coming soon.</p>
          </div>
        </div>
      </section>
    </main>
  )
}



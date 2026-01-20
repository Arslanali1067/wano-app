import Link from 'next/link'
import styles from './not-found.module.css'

export default function NotFound() {
  return (
    <section className="section">
      <div className="container">
        <div className={styles.notFoundWrapper}>
          <div className={styles.notFoundContent}>
            <h1 className={styles.notFoundTitle}>404</h1>
            <h2>Page Not Found</h2>
            <p>The page you are looking for doesn&apos;t exist or has been moved.</p>
            <Link href="/" className="button">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

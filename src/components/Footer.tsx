import Link from 'next/link'
import Image from 'next/image'
import styles from './Footer.module.css'

const companyLinks = [
  { href: '/about', label: 'About Wano' },
  { href: '/wano-studio', label: 'WANO Studio' },
  { href: '/blog', label: 'Blog' },
]

const socialLinks = [
  { href: 'https://www.instagram.com/wanoapp/', label: 'Instagram' },
  { href: 'https://www.tiktok.com/@wanoapp6', label: 'TikTok' },
  { href: 'https://x.com/Wano2025', label: 'X (Twitter)' },
  { href: 'https://www.youtube.com/@wano-app', label: 'YouTube' },
]

const supportLinks = [
  { href: '/contact', label: 'Contact Us' },
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms-of-service', label: 'Terms of Service' },
]

const downloadLinks = [
  { href: 'https://apps.apple.com/pk/app/wano-app/id6753104927', label: 'App Store' },
  { href: 'https://play.google.com', label: 'Google Play' },
]

export default function Footer() {
  return (
    <footer className="section">
      <div className="container">
        <div className={styles.footerWrapper}>
          <Link href="/" className={styles.footerBrand}>
            <Image
              src="/images/wano-logo.png"
              alt="Wano Logo"
              width={140}
              height={42}
              className={styles.footerBrandImage}
            />
            <div className={styles.footerParagraphHolder}>
              <p>A video app Born from Afrocentric culture, built for the world — all people, all stories, all vibes.</p>
            </div>
          </Link>

          <div className={styles.footerContent}>
            <div className={styles.footerBlock}>
              <div className="title-small">Company</div>
              {companyLinks.map((link) => (
                link.label === 'Blog' ? (
                  <span key={link.label} className={styles.footerLink}>
                    {link.label}
                  </span>
                ) : (
                  <Link key={link.label} href={link.href} className={styles.footerLink}>
                    {link.label}
                  </Link>
                )
              ))}
            </div>

            <div className={styles.footerBlock}>
              <div className="title-small">Follow Us</div>
              {socialLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.footerLink}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className={styles.footerBlock}>
              <div className="title-small">Support</div>
              {supportLinks.map((link) => (
                <Link key={link.label} href={link.href} className={styles.footerLink}>
                  {link.label}
                </Link>
              ))}
              <a href="/sitemap.xml" className={styles.footerLink}>
                Sitemap
              </a>
            </div>

          </div>
        </div>

        <div className={styles.footerDivider}>
          <div className={styles.footerCopyright}>
            © {new Date().getFullYear()} Wano. All rights reserved.
          </div>
          <div className={styles.footerCopyright}>
            Made with ❤️ for Africa and the World
          </div>
        </div>
      </div>
    </footer>
  )
}

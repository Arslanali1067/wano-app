import Link from 'next/link'
import Image from 'next/image'
import styles from './Footer.module.css'

const companyLinks = [
  { href: '#', label: 'What is Stars' },
  { href: '#', label: 'Why Us' },
  { href: '/blog', label: 'Blog' },
  { href: '#', label: 'Get App' },
]

const socialLinks = [
  { href: 'https://instagram.com', label: 'Instagram' },
  { href: 'https://fb.com', label: 'Facebook' },
  { href: 'https://linkedin.com', label: 'Linkedin' },
  { href: 'https://twitter.com', label: 'Twitter' },
]

const webflowLinks = [
  { href: '/template/style-guide', label: 'Style Guide' },
  { href: '/template/licensing', label: 'Licensing' },
  { href: '/template/instructions', label: 'Instructions' },
  { href: '/template/change-log', label: 'Change Log' },
]

export default function Footer() {
  return (
    <footer className="section">
      <div className="container">
        <div className={styles.footerWrapper}>
          <Link href="/" className={styles.footerBrand}>
            <Image
              src="/images/stars-logo.svg"
              alt="Stars Logo"
              width={90}
              height={27}
              className={styles.footerBrandImage}
            />
            <div className={styles.footerParagraphHolder}>
              <p>Aliquam et tellus urna. Phasellus egetadipiscing elit. Mauris id nunc odio. Aliquam et tellus urna. Phasellus eget</p>
            </div>
          </Link>

          <div className={styles.footerContent}>
            <div className={styles.footerBlock}>
              <div className="title-small">Company</div>
              {companyLinks.map((link) => (
                <Link key={link.label} href={link.href} className={styles.footerLink}>
                  {link.label}
                </Link>
              ))}
            </div>

            <div className={styles.footerBlock}>
              <div className="title-small">Social media</div>
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
              <div className="title-small">Webflow stuff</div>
              {webflowLinks.map((link) => (
                <Link key={link.label} href={link.href} className={styles.footerLink}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.footerDivider}>
          <div className={styles.footerCopyright}>
            Created by{' '}
            <a
              href="http://madebyoversight.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="white-link"
            >
              OVERSIGHT
            </a>
          </div>
          <div className={styles.footerCopyright}>
            Powered by{' '}
            <a
              href="https://webflow.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="white-link"
            >
              WEBFLOW
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

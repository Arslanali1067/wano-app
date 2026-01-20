'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from './Navbar.module.css'

const navLinks = [
  { href: '#', label: 'Product' },
  { href: '#', label: 'Why Us' },
  { href: '/blog', label: 'Blog' },
  { href: '#', label: 'Get App' },
]

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className={styles.navbar}>
      <div className={`container ${styles.navbarContainer}`}>
        <div className={styles.navbarHolder}>
          <div className={styles.navbarInner}>
            <Link href="/" className={styles.brand}>
              <Image
                src="/images/stars-logo.svg"
                alt="Stars Logo"
                width={100}
                height={30}
                className={styles.brandImage}
                priority
              />
            </Link>

            <div className={`${styles.navMenu} ${isMenuOpen ? styles.navMenuOpen : ''}`}>
              <div className={styles.navMenuLinkHolder}>
                <div className={styles.navMenuLinkContainer}>
                  <div className={styles.navLinks}>
                    {navLinks.map((link) => (
                      <Link
                        key={link.label}
                        href={link.href}
                        className={styles.navLink}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
                <div className={styles.navMenuButtonHolder}>
                  <Link href="#" className={`button navbar-button ${styles.signInButton}`}>
                    Sign In
                  </Link>
                </div>
              </div>
            </div>

            <button
              className={`${styles.menuButton} ${isMenuOpen ? styles.menuButtonOpen : ''}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <span className={styles.menuIcon}></span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

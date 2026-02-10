'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import styles from './Navbar.module.css'

const navLinks = [
  { href: '/', label: 'Home', type: 'link' as const },
  { label: 'Platform', type: 'disabled' as const },
  { href: '/creators', label: 'Creators', type: 'link' as const },
  {
    label: 'About',
    type: 'submenu' as const,
    items: [
      { label: 'About WANO', href: '/about' },
      { label: 'WANO Studio', href: '/wano-studio' },
    ],
  },
  { href: '/partnerships', label: 'Partnerships', type: 'link' as const },
  { href: '/#Download', label: 'Get App', type: 'anchor' as const },
]

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)
  const pathname = usePathname()

  return (
    <nav className={styles.navbar}>
      <div className={`container ${styles.navbarContainer}`}>
        <div className={styles.navbarHolder}>
          <div className={styles.navbarInner}>
            <Link href="/" className={styles.brand}>
              <Image
                src="/images/wano-logo.png"
                alt="Wano Logo"
                width={170}
                height={51}
                className={styles.brandImage}
                priority
              />
            </Link>

            <div className={`${styles.navMenu} ${isMenuOpen ? styles.navMenuOpen : ''}`}>
              <div className={styles.navMenuLinkHolder}>
                <div className={styles.navMenuLinkContainer}>
                  <div className={styles.navLinks}>
                    {navLinks.map((link) => {
                      const isActive =
                        (link.type === 'link' && pathname === link.href) ||
                        (link.type === 'submenu' &&
                          link.items.some((item) => item.href === pathname))

                      const baseClass = `${styles.navLink} ${
                        isActive ? styles.navLinkActive : ''
                      }`

                      if (link.type === 'link') {
                        return (
                          <Link
                            key={link.label}
                            href={link.href!}
                            className={baseClass}
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {link.label}
                          </Link>
                        )
                      }

                      if (link.type === 'anchor') {
                        const anchorHref = pathname === '/' ? '#Download' : '/#Download'
                        return (
                          <a
                            key={link.label}
                            href={anchorHref}
                            className={baseClass}
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {link.label}
                          </a>
                        )
                      }

                      if (link.type === 'submenu') {
                        const isOpen = openSubmenu === link.label
                        return (
                          <div
                            key={link.label}
                            className={`${styles.navLinkDropdown} ${
                              isOpen ? styles.navLinkDropdownOpen : ''
                            }`}
                            onMouseLeave={() => setOpenSubmenu(null)}
                          >
                            <button
                              type="button"
                              className={`${baseClass} ${styles.navLinkDropdownToggle}`}
                              onClick={() =>
                                setOpenSubmenu(isOpen ? null : link.label)
                              }
                            >
                              {link.label}
                              <span className={styles.navLinkDropdownIcon}>▾</span>
                            </button>
                            <div className={styles.navLinkDropdownMenu}>
                              {link.items.map((item) => (
                                <Link
                                  key={item.href}
                                  href={item.href}
                                  className={styles.navLinkDropdownItem}
                                  onClick={() => {
                                    setIsMenuOpen(false)
                                    setOpenSubmenu(null)
                                  }}
                                >
                                  {item.label}
                                </Link>
                              ))}
                            </div>
                          </div>
                        )
                      }

                      return (
                        <span
                          key={link.label}
                          className={`${baseClass} ${styles.navLinkDisabled}`}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {link.label}
                        </span>
                      )
                    })}
                  </div>
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

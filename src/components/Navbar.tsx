'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from './Navbar.module.css'

const navLinks = [
  { href: '#Hero', label: 'Product', sectionId: 'Product' },
  { href: '#Stats', label: 'Why Us', sectionId: 'Why-Us' },
  { href: '#Product', label: 'Features', sectionId: 'Features' },
  { href: '#Download', label: 'Get App', sectionId: 'Get-App' },
]

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string>('Hero')

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150 // Offset for navbar
      
      const heroSection = document.getElementById('Hero')
      const statsSection = document.getElementById('Stats')
      const phoneFeaturesSection = document.getElementById('Product') // PhoneFeaturesSection
      const listFeaturesSection = document.getElementById('Why-Us') // ListFeaturesSection
      const downloadSection = document.getElementById('Download') // EasyAccessSection
      const appSection = document.getElementById('App') // CTASection

      // Helper function to check if scroll position is within a section
      const isInSection = (section: HTMLElement | null) => {
        if (!section) return false
        const rect = section.getBoundingClientRect()
        const sectionTop = rect.top + window.scrollY
        const sectionBottom = sectionTop + rect.height
        return scrollPosition >= sectionTop && scrollPosition < sectionBottom
      }

      // Helper function to check if we've scrolled past a section
      const isPastSection = (section: HTMLElement | null) => {
        if (!section) return false
        const rect = section.getBoundingClientRect()
        const sectionTop = rect.top + window.scrollY
        return scrollPosition >= sectionTop
      }

      // Check sections from bottom to top (most specific first)
      // Get App Menu → CTASection (App) or EasyAccessSection (Download)
      if (isInSection(appSection)) {
        setActiveSection('App')
      } else if (isInSection(downloadSection)) {
        setActiveSection('Download')
      }
      // If we've scrolled past Download section, stay on Get App
      else if (isPastSection(downloadSection)) {
        setActiveSection('Download')
      }
      // Features Menu → ListFeaturesSection (Why-Us) - check this before Product since it comes after
      else if (isInSection(listFeaturesSection)) {
        setActiveSection('Why-Us') // This is ListFeaturesSection
      }
      // Features Menu → PhoneFeaturesSection (Product)
      else if (isInSection(phoneFeaturesSection)) {
        setActiveSection('Product') // This is PhoneFeaturesSection
      }
      // Why Us Menu → StatsSection
      else if (isInSection(statsSection)) {
        setActiveSection('Stats')
      }
      // Product Menu → HeroSection
      else if (isInSection(heroSection)) {
        setActiveSection('Hero')
      } else {
        // Default to Hero when at very top
        setActiveSection('Hero')
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
                      // Check if this link should be active
                      let isActive = false
                      
                      if (link.sectionId === 'Product') {
                        // Product Menu → Hero Section
                        isActive = activeSection === 'Hero'
                      } else if (link.sectionId === 'Why-Us') {
                        // Why Us Menu → StatsSection
                        isActive = activeSection === 'Stats'
                      } else if (link.sectionId === 'Features') {
                        // Features Menu → PhoneFeaturesSection (Product) OR ListFeaturesSection (Why-Us)
                        isActive = activeSection === 'Product' || activeSection === 'Why-Us'
                      } else if (link.sectionId === 'Get-App') {
                        // Get App Menu → EasyAccessSection (Download) OR CTASection (App)
                        isActive = activeSection === 'Download' || activeSection === 'App'
                      }
                      
                      return (
                        <Link
                          key={link.label}
                          href={link.href}
                          className={`${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {link.label}
                        </Link>
                      )
                    })}
                  </div>
                </div>
                <div className={styles.navMenuButtonHolder}>
                  <Link href="#" className={`button navbar-button ${styles.signInButton}`}>
                    Download now
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

'use client'

import { useState, useRef, useEffect, ChangeEvent, FormEvent } from 'react'
import Link from 'next/link'
import styles from './TvPage.module.css'

const categories = [
  'Documentary',
  'Short Film',
  'Cultural',
  'Human Interest',
  'Music',
  'Travel',
  'Independent Film',
  'Other',
]

const countries = [
  { name: 'Afghanistan', flag: '🇦🇫' },
  { name: 'Albania', flag: '🇦🇱' },
  { name: 'Algeria', flag: '🇩🇿' },
  { name: 'Andorra', flag: '🇦🇩' },
  { name: 'Angola', flag: '🇦🇴' },
  { name: 'Argentina', flag: '🇦🇷' },
  { name: 'Armenia', flag: '🇦🇲' },
  { name: 'Australia', flag: '🇦🇺' },
  { name: 'Austria', flag: '🇦🇹' },
  { name: 'Azerbaijan', flag: '🇦🇿' },
  { name: 'Bahamas', flag: '🇧🇸' },
  { name: 'Bahrain', flag: '🇧🇭' },
  { name: 'Bangladesh', flag: '🇧🇩' },
  { name: 'Barbados', flag: '🇧🇧' },
  { name: 'Belarus', flag: '🇧🇾' },
  { name: 'Belgium', flag: '🇧🇪' },
  { name: 'Belize', flag: '🇧🇿' },
  { name: 'Benin', flag: '🇧🇯' },
  { name: 'Bhutan', flag: '🇧🇹' },
  { name: 'Bolivia', flag: '🇧🇴' },
  { name: 'Bosnia and Herzegovina', flag: '🇧🇦' },
  { name: 'Botswana', flag: '🇧🇼' },
  { name: 'Brazil', flag: '🇧🇷' },
  { name: 'Brunei', flag: '🇧🇳' },
  { name: 'Bulgaria', flag: '🇧🇬' },
  { name: 'Burkina Faso', flag: '🇧🇫' },
  { name: 'Burundi', flag: '🇧🇮' },
  { name: 'Cambodia', flag: '🇰🇭' },
  { name: 'Cameroon', flag: '🇨🇲' },
  { name: 'Canada', flag: '🇨🇦' },
  { name: 'Cape Verde', flag: '🇨🇻' },
  { name: 'Central African Republic', flag: '🇨🇫' },
  { name: 'Chad', flag: '🇹🇩' },
  { name: 'Chile', flag: '🇨🇱' },
  { name: 'China', flag: '🇨🇳' },
  { name: 'Colombia', flag: '🇨🇴' },
  { name: 'Comoros', flag: '🇰🇲' },
  { name: 'Congo', flag: '🇨🇬' },
  { name: 'Costa Rica', flag: '🇨🇷' },
  { name: 'Croatia', flag: '🇭🇷' },
  { name: 'Cuba', flag: '🇨🇺' },
  { name: 'Cyprus', flag: '🇨🇾' },
  { name: 'Czech Republic', flag: '🇨🇿' },
  { name: 'Democratic Republic of the Congo', flag: '🇨🇩' },
  { name: 'Denmark', flag: '🇩🇰' },
  { name: 'Djibouti', flag: '🇩🇯' },
  { name: 'Dominica', flag: '🇩🇲' },
  { name: 'Dominican Republic', flag: '🇩🇴' },
  { name: 'East Timor', flag: '🇹🇱' },
  { name: 'Ecuador', flag: '🇪🇨' },
  { name: 'Egypt', flag: '🇪🇬' },
  { name: 'El Salvador', flag: '🇸🇻' },
  { name: 'Equatorial Guinea', flag: '🇬🇶' },
  { name: 'Eritrea', flag: '🇪🇷' },
  { name: 'Estonia', flag: '🇪🇪' },
  { name: 'Eswatini', flag: '🇸🇿' },
  { name: 'Ethiopia', flag: '🇪🇹' },
  { name: 'Fiji', flag: '🇫🇯' },
  { name: 'Finland', flag: '🇫🇮' },
  { name: 'France', flag: '🇫🇷' },
  { name: 'Gabon', flag: '🇬🇦' },
  { name: 'Gambia', flag: '🇬🇲' },
  { name: 'Georgia', flag: '🇬🇪' },
  { name: 'Germany', flag: '🇩🇪' },
  { name: 'Ghana', flag: '🇬🇭' },
  { name: 'Greece', flag: '🇬🇷' },
  { name: 'Grenada', flag: '🇬🇩' },
  { name: 'Guatemala', flag: '🇬🇹' },
  { name: 'Guinea', flag: '🇬🇳' },
  { name: 'Guinea-Bissau', flag: '🇬🇼' },
  { name: 'Guyana', flag: '🇬🇾' },
  { name: 'Haiti', flag: '🇭🇹' },
  { name: 'Honduras', flag: '🇭🇳' },
  { name: 'Hungary', flag: '🇭🇺' },
  { name: 'Iceland', flag: '🇮🇸' },
  { name: 'India', flag: '🇮🇳' },
  { name: 'Indonesia', flag: '🇮🇩' },
  { name: 'Iran', flag: '🇮🇷' },
  { name: 'Iraq', flag: '🇮🇶' },
  { name: 'Ireland', flag: '🇮🇪' },
  { name: 'Israel', flag: '🇮🇱' },
  { name: 'Italy', flag: '🇮🇹' },
  { name: 'Ivory Coast', flag: '🇨🇮' },
  { name: 'Jamaica', flag: '🇯🇲' },
  { name: 'Japan', flag: '🇯🇵' },
  { name: 'Jordan', flag: '🇯🇴' },
  { name: 'Kazakhstan', flag: '🇰🇿' },
  { name: 'Kenya', flag: '🇰🇪' },
  { name: 'Kiribati', flag: '🇰🇮' },
  { name: 'Kuwait', flag: '🇰🇼' },
  { name: 'Kyrgyzstan', flag: '🇰🇬' },
  { name: 'Laos', flag: '🇱🇦' },
  { name: 'Latvia', flag: '🇱🇻' },
  { name: 'Lebanon', flag: '🇱🇧' },
  { name: 'Lesotho', flag: '🇱🇸' },
  { name: 'Liberia', flag: '🇱🇷' },
  { name: 'Libya', flag: '🇱🇾' },
  { name: 'Liechtenstein', flag: '🇱🇮' },
  { name: 'Lithuania', flag: '🇱🇹' },
  { name: 'Luxembourg', flag: '🇱🇺' },
  { name: 'Madagascar', flag: '🇲🇬' },
  { name: 'Malawi', flag: '🇲🇼' },
  { name: 'Malaysia', flag: '🇲🇾' },
  { name: 'Maldives', flag: '🇲🇻' },
  { name: 'Mali', flag: '🇲🇱' },
  { name: 'Malta', flag: '🇲🇹' },
  { name: 'Marshall Islands', flag: '🇲🇭' },
  { name: 'Mauritania', flag: '🇲🇷' },
  { name: 'Mauritius', flag: '🇲🇺' },
  { name: 'Mexico', flag: '🇲🇽' },
  { name: 'Micronesia', flag: '🇫🇲' },
  { name: 'Moldova', flag: '🇲🇩' },
  { name: 'Monaco', flag: '🇲🇨' },
  { name: 'Mongolia', flag: '🇲🇳' },
  { name: 'Montenegro', flag: '🇲🇪' },
  { name: 'Morocco', flag: '🇲🇦' },
  { name: 'Mozambique', flag: '🇲🇿' },
  { name: 'Myanmar', flag: '🇲🇲' },
  { name: 'Namibia', flag: '🇳🇦' },
  { name: 'Nauru', flag: '🇳🇷' },
  { name: 'Nepal', flag: '🇳🇵' },
  { name: 'Netherlands', flag: '🇳🇱' },
  { name: 'New Zealand', flag: '🇳🇿' },
  { name: 'Nicaragua', flag: '🇳🇮' },
  { name: 'Niger', flag: '🇳🇪' },
  { name: 'Nigeria', flag: '🇳🇬' },
  { name: 'North Korea', flag: '🇰🇵' },
  { name: 'North Macedonia', flag: '🇲🇰' },
  { name: 'Norway', flag: '🇳🇴' },
  { name: 'Oman', flag: '🇴🇲' },
  { name: 'Pakistan', flag: '🇵🇰' },
  { name: 'Palau', flag: '🇵🇼' },
  { name: 'Panama', flag: '🇵🇦' },
  { name: 'Papua New Guinea', flag: '🇵🇬' },
  { name: 'Paraguay', flag: '🇵🇾' },
  { name: 'Peru', flag: '🇵🇪' },
  { name: 'Philippines', flag: '🇵🇭' },
  { name: 'Poland', flag: '🇵🇱' },
  { name: 'Portugal', flag: '🇵🇹' },
  { name: 'Qatar', flag: '🇶🇦' },
  { name: 'Romania', flag: '🇷🇴' },
  { name: 'Russia', flag: '🇷🇺' },
  { name: 'Rwanda', flag: '🇷🇼' },
  { name: 'Saint Kitts and Nevis', flag: '🇰🇳' },
  { name: 'Saint Lucia', flag: '🇱🇨' },
  { name: 'Saint Vincent and the Grenadines', flag: '🇻🇨' },
  { name: 'Samoa', flag: '🇼🇸' },
  { name: 'San Marino', flag: '🇸🇲' },
  { name: 'Saudi Arabia', flag: '🇸🇦' },
  { name: 'Senegal', flag: '🇸🇳' },
  { name: 'Serbia', flag: '🇷🇸' },
  { name: 'Seychelles', flag: '🇸🇨' },
  { name: 'Sierra Leone', flag: '🇸🇱' },
  { name: 'Singapore', flag: '🇸🇬' },
  { name: 'Slovakia', flag: '🇸🇰' },
  { name: 'Slovenia', flag: '🇸🇮' },
  { name: 'Solomon Islands', flag: '🇸🇧' },
  { name: 'Somalia', flag: '🇸🇴' },
  { name: 'South Africa', flag: '🇿🇦' },
  { name: 'South Korea', flag: '🇰🇷' },
  { name: 'South Sudan', flag: '🇸🇸' },
  { name: 'Spain', flag: '🇪🇸' },
  { name: 'Sri Lanka', flag: '🇱🇰' },
  { name: 'Sudan', flag: '🇸🇩' },
  { name: 'Suriname', flag: '🇸🇷' },
  { name: 'Sweden', flag: '🇸🇪' },
  { name: 'Switzerland', flag: '🇨🇭' },
  { name: 'Syria', flag: '🇸🇾' },
  { name: 'Taiwan', flag: '🇹🇼' },
  { name: 'Tajikistan', flag: '🇹🇯' },
  { name: 'Tanzania', flag: '🇹🇿' },
  { name: 'Thailand', flag: '🇹🇭' },
  { name: 'Togo', flag: '🇹🇬' },
  { name: 'Tonga', flag: '🇹🇴' },
  { name: 'Trinidad and Tobago', flag: '🇹🇹' },
  { name: 'Tunisia', flag: '🇹🇳' },
  { name: 'Turkey', flag: '🇹🇷' },
  { name: 'Turkmenistan', flag: '🇹🇲' },
  { name: 'Tuvalu', flag: '🇹🇻' },
  { name: 'Uganda', flag: '🇺🇬' },
  { name: 'Ukraine', flag: '🇺🇦' },
  { name: 'United Arab Emirates', flag: '🇦🇪' },
  { name: 'United Kingdom', flag: '🇬🇧' },
  { name: 'United States', flag: '🇺🇸' },
  { name: 'Uruguay', flag: '🇺🇾' },
  { name: 'Uzbekistan', flag: '🇺🇿' },
  { name: 'Vanuatu', flag: '🇻🇺' },
  { name: 'Vatican City', flag: '🇻🇦' },
  { name: 'Venezuela', flag: '🇻🇪' },
  { name: 'Vietnam', flag: '🇻🇳' },
  { name: 'Yemen', flag: '🇾🇪' },
  { name: 'Zambia', flag: '🇿🇲' },
  { name: 'Zimbabwe', flag: '🇿🇼' }
]

interface SubmittedFilmData {
  id: string
  filmTitle: string
  fullName: string
  email: string
  category: string
  runtime: string
  viewingLink: string
}

export default function SubmissionForm() {
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [submittedData, setSubmittedData] = useState<SubmittedFilmData | null>(null)

  // Form Fields
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [country, setCountry] = useState('')
  const [city, setCity] = useState('')
  const [productionCompany, setProductionCompany] = useState('')

  // Country dropdown state
  const [countrySearch, setCountrySearch] = useState('')
  const [showCountryDropdown, setShowCountryDropdown] = useState(false)
  const [filteredCountries, setFilteredCountries] = useState(countries)
  const [selectedCountry, setSelectedCountry] = useState<{ name: string; flag: string } | null>(null)
  const countryDropdownRef = useRef<HTMLDivElement>(null)

  const [filmTitle, setFilmTitle] = useState('')
  const [countryRepresented, setCountryRepresented] = useState('')
  const [yearCompleted, setYearCompleted] = useState(new Date().getFullYear().toString())
  const [runtime, setRuntime] = useState('')
  const [category, setCategory] = useState('')
  const [languages, setLanguages] = useState('')
  const [subtitles, setSubtitles] = useState('Yes')
  const [synopsis, setSynopsis] = useState('')

  const [viewingLink, setViewingLink] = useState('')
  const [viewingPassword, setViewingPassword] = useState('')
  const [trailerLink, setTrailerLink] = useState('')

  // Poster upload state
  const [posterFile, setPosterFile] = useState<{ name: string; size: string; dataUrl: string } | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Rights checkboxes
  const [right1, setRight1] = useState(false)
  const [right2, setRight2] = useState(false)
  const [right3, setRight3] = useState(false)
  const [right4, setRight4] = useState(false)

  // Animation on scroll
  const [isFormVisible, setIsFormVisible] = useState(false)
  const formCardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsFormVisible(true)
        }
      },
      { threshold: 0.05 }
    )

    if (formCardRef.current) {
      observer.observe(formCardRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Filter countries based on search
  useEffect(() => {
    if (countrySearch) {
      const filtered = countries.filter(country =>
        country.name.toLowerCase().includes(countrySearch.toLowerCase())
      )
      setFilteredCountries(filtered)
    } else {
      setFilteredCountries(countries)
    }
  }, [countrySearch])

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target as Node)) {
        setShowCountryDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Country dropdown handlers
  const handleCountryInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Only allow typing if no country is selected
    if (selectedCountry) return
    
    const value = e.target.value
    setCountrySearch(value)
    setCountry(value)
    setShowCountryDropdown(true)
  }

  const handleCountrySelect = (countryName: string) => {
    const selectedCountryObj = countries.find(c => c.name === countryName)
    if (selectedCountryObj) {
      setSelectedCountry(selectedCountryObj)
      setCountry(countryName)
      setCountrySearch(`${selectedCountryObj.flag} ${countryName}`)
      setShowCountryDropdown(false)
    }
  }

  const handleCountryFocus = () => {
    if (!selectedCountry) {
      setShowCountryDropdown(true)
    }
  }

  const clearCountrySelection = () => {
    setSelectedCountry(null)
    setCountry('')
    setCountrySearch('')
    setShowCountryDropdown(false)
  }

  // Synopsis word count
  const wordCount = synopsis.trim().length > 0 ? synopsis.trim().split(/\s+/).length : 0

  const handlePosterChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setErrorMsg('Please upload a valid image file (JPG, PNG, or WEBP).')
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      setErrorMsg('Poster image size must be under 10MB.')
      return
    }

    setErrorMsg(null)
    const reader = new FileReader()
    reader.onload = () => {
      const dataUrl = reader.result as string
      const sizeKb = (file.size / 1024).toFixed(0)
      const sizeStr = file.size > 1024 * 1024 ? `${(file.size / (1024 * 1024)).toFixed(1)} MB` : `${sizeKb} KB`
      setPosterFile({
        name: file.name,
        size: sizeStr,
        dataUrl,
      })
    }
    reader.readAsDataURL(file)
  }

  const removePoster = () => {
    setPosterFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setErrorMsg(null)

    // Validation
    if (!right1 || !right2 || !right3 || !right4) {
      setErrorMsg('Please review and confirm all rights checkboxes before submitting.')
      return
    }

    if (!category) {
      setErrorMsg('Please select a film category.')
      return
    }

    setLoading(true)

    try {
      const payload = {
        fullName,
        email,
        phone,
        country,
        city,
        productionCompany,
        filmTitle,
        countryRepresented,
        yearCompleted,
        runtime,
        category,
        languages,
        subtitles,
        synopsis,
        viewingLink,
        viewingPassword,
        trailerLink,
        posterFileName: posterFile?.name,
        posterDataUrl: posterFile?.dataUrl,
        rightsConfirmed: true,
      }

      const res = await fetch('/api/tv/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit film. Please try again.')
      }

      setSubmittedData({
        id: data.submissionId,
        filmTitle,
        fullName,
        email,
        category,
        runtime,
        viewingLink,
      })

      // Scroll smoothly to top of form card
      const formElement = document.getElementById('submit-film')
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth' })
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'An unexpected error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setSubmittedData(null)
    setFullName('')
    setEmail('')
    setPhone('')
    setCountry('')
    setCountrySearch('')
    setShowCountryDropdown(false)
    setCity('')
    setProductionCompany('')
    setFilmTitle('')
    setCountryRepresented('')
    setYearCompleted(new Date().getFullYear().toString())
    setRuntime('')
    setCategory('')
    setLanguages('')
    setSubtitles('Yes')
    setSynopsis('')
    setViewingLink('')
    setViewingPassword('')
    setTrailerLink('')
    setPosterFile(null)
    setRight1(false)
    setRight2(false)
    setRight3(false)
    setRight4(false)
    setErrorMsg(null)
  }

  // Confirmation / Success View
  if (submittedData) {
    return (
      <div className={styles.formCard} id="submit-film">
        <div className={styles.successContainer}>
          <div className={styles.successIconHolder}>✓</div>
          <h2 className={styles.successTitle}>Film Received</h2>
          <p className={styles.successSubtitle}>
            Thank you for submitting your film to <strong>Wano TV</strong>.
          </p>

          <div className={styles.successDetailCard}>
            <div className={styles.successIdRow}>
              <span className={styles.successIdLabel}>Submission Reference ID</span>
              <span className={styles.successIdValue}>{submittedData.id}</span>
            </div>
            <div className={styles.successSummaryRow}>
              <strong>Film Title:</strong> {submittedData.filmTitle}
            </div>
            <div className={styles.successSummaryRow}>
              <strong>Filmmaker:</strong> {submittedData.fullName} ({submittedData.email})
            </div>
            <div className={styles.successSummaryRow}>
              <strong>Category:</strong> {submittedData.category} &bull; <strong>Runtime:</strong> {submittedData.runtime}
            </div>

            <div className={styles.successInstructionBox}>
              <p style={{ margin: '0 0 6px 0', fontWeight: 700 }}>What happens next?</p>
              <p style={{ margin: '0 0 6px 0' }}>
                Our curation team will privately review your screener link. Selected submissions will normally hear from our team within <strong>14–30 days</strong> via <strong>{submittedData.email}</strong>.
              </p>
              <p style={{ margin: 0, color: '#fed7aa', fontSize: '12.5px' }}>
                🛡️ You retain full copyright ownership of your work. Licensing terms are agreed prior to release.
              </p>
              <p style={{ margin: '10px 0 0 0', color: '#ffedd5', fontWeight: 600, fontSize: '12.5px' }}>
                ⚠️ Please do not send master video files unless requested by Wano.
              </p>
            </div>
          </div>

          <div className={styles.successActions}>
            <button type="button" onClick={resetForm} className={styles.primaryCtaBtn}>
              Submit Another Film
            </button>
            <Link href="/" className={styles.secondaryCtaBtn}>
              Return to Homepage
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Active Form View
  return (
    <div
      className={`${styles.formCard} ${styles.fadeIn} ${isFormVisible ? styles.visible : ''}`}
      id="submit-film"
      ref={formCardRef}
    >
      <div className={styles.formHeader}>
        <div className={styles.formBadgeRow}>
          <span className={styles.formHeaderBadge}>NO SUBMISSION FEE</span>
          <span className={styles.formHeaderBadgeSecondary}>14–30 DAY RESPONSE WINDOW</span>
        </div>
        <h2 className={styles.formHeaderTitle}>Filmmaker Submission Form</h2>
        <p className={styles.formHeaderSubtitle}>
          Submit your completed film, documentary, or original story for consideration for Wano TV. Initial review requires only a private screener viewing link.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* GROUP 1: FILMMAKER INFORMATION */}
        <div className={styles.formSectionGroup}>
          <div className={styles.groupTitle}>
            <span>1. Filmmaker Information</span>
            <span className={styles.groupBadge}>Contact</span>
          </div>
          <p className={styles.groupDesc}>Tell us about yourself or your production team.</p>

          <div className={styles.formGrid2}>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                Full Name <span className={styles.requiredStar}>*</span>
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Amara Okafor"
                className={styles.customInput}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                Email Address <span className={styles.requiredStar}>*</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. amara@filmmaker.com"
                className={styles.customInput}
              />
            </div>
          </div>

          <div className={styles.formGrid2}>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Phone / WhatsApp</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. +234 801 234 5678"
                className={styles.customInput}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                Country <span className={styles.requiredStar}>*</span>
              </label>
              <div className={styles.countryDropdownContainer} ref={countryDropdownRef}>
                <div className={styles.countryInputWrapper}>
                  <input
                    type="text"
                    required
                    value={countrySearch}
                    onChange={handleCountryInputChange}
                    onFocus={handleCountryFocus}
                    placeholder="Search and select your country..."
                    className={styles.customInput}
                    autoComplete="off"
                    readOnly={selectedCountry !== null}
                  />
                  {selectedCountry && (
                    <button
                      type="button"
                      onClick={clearCountrySelection}
                      className={styles.clearCountryBtn}
                      title="Clear selection"
                    >
                      ×
                    </button>
                  )}
                </div>
                {showCountryDropdown && (
                  <div className={styles.countryDropdown}>
                    {filteredCountries.length > 0 ? (
                      filteredCountries.map((country) => (
                        <div
                          key={country.name}
                          className={styles.countryOption}
                          onClick={() => handleCountrySelect(country.name)}
                        >
                          <span className={styles.countryFlag}>{country.flag}</span>
                          <span className={styles.countryName}>{country.name}</span>
                        </div>
                      ))
                    ) : (
                      <div className={styles.countryNoResults}>
                        No countries found matching &quot;{countrySearch}&quot;
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className={styles.formGrid2}>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>City</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="e.g. Lagos, Nairobi, London"
                className={styles.customInput}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Production Company / Organization</label>
              <input
                type="text"
                value={productionCompany}
                onChange={(e) => setProductionCompany(e.target.value)}
                placeholder="Optional (if applicable)"
                className={styles.customInput}
              />
            </div>
          </div>
        </div>

        {/* GROUP 2: FILM INFORMATION */}
        <div className={styles.formSectionGroup}>
          <div className={styles.groupTitle}>
            <span>2. Film Information</span>
            <span className={styles.groupBadge}>Project</span>
          </div>
          <p className={styles.groupDesc}>Details regarding your film, runtime, language, and category.</p>

          <div className={styles.formGrid2}>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                Film Title <span className={styles.requiredStar}>*</span>
              </label>
              <input
                type="text"
                required
                value={filmTitle}
                onChange={(e) => setFilmTitle(e.target.value)}
                placeholder="e.g. Echoes of the Niger"
                className={styles.customInput}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                Country / Region Represented <span className={styles.requiredStar}>*</span>
              </label>
              <input
                type="text"
                required
                value={countryRepresented}
                onChange={(e) => setCountryRepresented(e.target.value)}
                placeholder="e.g. West Africa, Caribbean Diaspora, etc."
                className={styles.customInput}
              />
            </div>
          </div>

          <div className={styles.formGrid2}>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                Year Completed <span className={styles.requiredStar}>*</span>
              </label>
              <input
                type="text"
                required
                value={yearCompleted}
                onChange={(e) => setYearCompleted(e.target.value)}
                placeholder="e.g. 2025"
                className={styles.customInput}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                Runtime <span className={styles.requiredStar}>*</span>
              </label>
              <input
                type="text"
                required
                value={runtime}
                onChange={(e) => setRuntime(e.target.value)}
                placeholder="e.g. 18 mins (Short), 85 mins (Feature)"
                className={styles.customInput}
              />
            </div>
          </div>

          <div className={styles.formGrid2}>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                Category <span className={styles.requiredStar}>*</span>
              </label>
              <select
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={styles.customSelect}
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                Language(s) <span className={styles.requiredStar}>*</span>
              </label>
              <input
                type="text"
                required
                value={languages}
                onChange={(e) => setLanguages(e.target.value)}
                placeholder="e.g. English, Yoruba, Swahili, French"
                className={styles.customInput}
              />
            </div>
          </div>

          <div className={styles.formGrid1}>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                Are English subtitles available? <span className={styles.requiredStar}>*</span>
              </label>
              <div className={styles.radioGrid}>
                {[
                  { value: 'Yes', label: 'Yes' },
                  { value: 'No', label: 'No' },
                  { value: 'Not required, film is in English', label: 'Not required, film is in English' },
                ].map((option) => (
                  <label
                    key={option.value}
                    className={`${styles.radioOption} ${
                      subtitles === option.value ? styles.radioOptionSelected : ''
                    }`}
                  >
                    <input
                      type="radio"
                      name="subtitles"
                      value={option.value}
                      checked={subtitles === option.value}
                      onChange={(e) => setSubtitles(e.target.value)}
                      className={styles.radioInput}
                    />
                    <span className={styles.radioLabel}>{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.formGrid1}>
            <div className={styles.inputGroup}>
              <div className={styles.inputLabel}>
                <span>
                  Short Synopsis <span className={styles.requiredStar}>*</span>
                </span>
                <span className={styles.wordCount}>{wordCount} words (approx. 100–300 words recommended)</span>
              </div>
              <textarea
                required
                rows={5}
                value={synopsis}
                onChange={(e) => setSynopsis(e.target.value)}
                placeholder="Provide a compelling synopsis of your film that introduces the story, characters, and central themes..."
                className={styles.customTextarea}
              />
            </div>
          </div>
        </div>

        {/* GROUP 3: FILM SCREENING LINK */}
        <div className={styles.formSectionGroup}>
          <div className={styles.groupTitle}>
            <span>3. Film Screening Link</span>
            <span className={styles.groupBadge}>Screener</span>
          </div>
          <p className={styles.groupDesc}>
            Provide a secure online streaming link (Vimeo, YouTube unlisted/private, Google Drive, etc.).
          </p>

          <div className={styles.formGrid2}>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                Private Viewing Link <span className={styles.requiredStar}>*</span>
              </label>
              <input
                type="url"
                required
                value={viewingLink}
                onChange={(e) => setViewingLink(e.target.value)}
                placeholder="https://vimeo.com/... or https://youtube.com/..."
                className={styles.customInput}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Password (if protected)</label>
              <input
                type="text"
                value={viewingPassword}
                onChange={(e) => setViewingPassword(e.target.value)}
                placeholder="Optional password"
                className={styles.customInput}
              />
            </div>
          </div>

          <div className={styles.noticeBox}>
            <span className={styles.noticeIcon}>🔒</span>
            <p className={styles.noticeText}>
              <strong>No Master File Upload:</strong> Filmmakers should <strong>NOT</strong> upload master video files at this stage. We only require a private screener viewing link for curation review.
            </p>
          </div>
        </div>

        {/* GROUP 4: PROMOTIONAL MATERIAL */}
        <div className={styles.formSectionGroup}>
          <div className={styles.groupTitle}>
            <span>4. Promotional Material</span>
            <span className={styles.groupBadge}>Key Art</span>
          </div>
          <p className={styles.groupDesc}>Optional trailer link and film poster / key art.</p>

          <div className={styles.formGrid1}>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Trailer Link (optional)</label>
              <input
                type="url"
                value={trailerLink}
                onChange={(e) => setTrailerLink(e.target.value)}
                placeholder="https://youtube.com/... or https://vimeo.com/..."
                className={styles.customInput}
              />
            </div>
          </div>

          <div className={styles.formGrid1}>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Film Poster / Key Art Upload (optional)</label>

              {!posterFile ? (
                <div
                  className={styles.fileUploadZone}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <span className={styles.uploadIcon}>🖼️</span>
                  <p className={styles.uploadText}>Click or drop your film poster here</p>
                  <p className={styles.uploadHint}>Accepts JPG, PNG, WEBP (Max 10MB)</p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handlePosterChange}
                    className={styles.hiddenFileInput}
                  />
                </div>
              ) : (
                <div className={styles.posterPreviewHolder}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={posterFile.dataUrl}
                    alt="Poster Preview"
                    className={styles.posterThumbnail}
                  />
                  <div className={styles.posterInfo}>
                    <p className={styles.posterName}>{posterFile.name}</p>
                    <p className={styles.posterSize}>{posterFile.size}</p>
                  </div>
                  <button
                    type="button"
                    onClick={removePoster}
                    className={styles.removePosterBtn}
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* GROUP 5: RIGHTS CONFIRMATION */}
        <div className={styles.formSectionGroup}>
          <div className={styles.groupTitle}>
            <span>5. Plain Rights Confirmation</span>
            <span className={styles.groupBadge}>Agreed Terms</span>
          </div>
          <p className={styles.groupDesc}>
            Please review and confirm each statement below:
          </p>

          <div className={styles.rightsGroup}>
            <label className={styles.checkboxItem}>
              <input
                type="checkbox"
                required
                checked={right1}
                onChange={(e) => setRight1(e.target.checked)}
                className={styles.customCheckbox}
              />
              <span className={styles.checkboxLabel}>
                I confirm that I own or control the rights necessary to submit this film for consideration.
              </span>
            </label>

            <label className={styles.checkboxItem}>
              <input
                type="checkbox"
                required
                checked={right2}
                onChange={(e) => setRight2(e.target.checked)}
                className={styles.customCheckbox}
              />
              <span className={styles.checkboxLabel}>
                I understand that submission is 100% free and does not transfer copyright ownership of my film to Wano.
              </span>
            </label>

            <label className={styles.checkboxItem}>
              <input
                type="checkbox"
                required
                checked={right3}
                onChange={(e) => setRight3(e.target.checked)}
                className={styles.customCheckbox}
              />
              <span className={styles.checkboxLabel}>
                I authorize Wano to privately review the submitted film for evaluation purposes.
              </span>
            </label>

            <label className={styles.checkboxItem}>
              <input
                type="checkbox"
                required
                checked={right4}
                onChange={(e) => setRight4(e.target.checked)}
                className={styles.customCheckbox}
              />
              <span className={styles.checkboxLabel}>
                I understand that if selected, distribution and licensing terms are agreed with me before my film appears on Wano TV.
              </span>
            </label>
          </div>

          <div className={styles.termsNotice}>
            <p style={{ margin: 0 }}>
              🛡️ <strong>Plain Rights Guarantee:</strong> &ldquo;You keep ownership of your film. Submission does not transfer copyright to Wano. If selected, distribution and licensing terms are agreed with you before your film appears on Wano TV.&rdquo;
            </p>
            <p style={{ margin: '8px 0 0 0' }}>
              Read our{' '}
              <Link href="/terms-of-service" target="_blank" className={styles.termsLink}>
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" target="_blank" className={styles.termsLink}>
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>

        {/* ERROR MESSAGE BANNER */}
        {errorMsg && <div className={styles.formErrorBanner}>⚠️ {errorMsg}</div>}

        {/* SUBMIT BUTTON */}
        <div className={styles.submitBtnHolder}>
          <button
            type="submit"
            disabled={loading || !(right1 && right2 && right3 && right4)}
            className={styles.submitFilmBtn}
          >
            {loading ? 'Submitting Film...' : 'Submit Film'}
          </button>
        </div>
      </form>
    </div>
  )
}

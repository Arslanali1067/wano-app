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
              <p style={{ margin: 0 }}>
                Our editorial and curation team will privately review your screener. If your film is selected for the next stage, Wano will contact you directly via <strong>{submittedData.email}</strong>.
              </p>
              <p style={{ margin: '10px 0 0 0', color: '#ffedd5', fontWeight: 600 }}>
                ⚠️ Please do not send master film files unless requested by Wano.
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
        <h2 className={styles.formHeaderTitle}>Filmmaker Submission Form</h2>
        <p className={styles.formHeaderSubtitle}>
          Complete the details below to submit your finished film or documentary for consideration for Wano TV.
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
                placeholder="+234 ... / +1 ..."
                className={styles.customInput}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                Country <span className={styles.requiredStar}>*</span>
              </label>
              <input
                type="text"
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="e.g. Nigeria, Ghana, Kenya, UK, USA"
                className={styles.customInput}
              />
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
                placeholder="e.g. 22 mins, 1 hr 15 mins"
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
            Provide a secure online streaming link (Vimeo, YouTube, Google Drive, or other secure streaming platform).
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
              <strong>Important:</strong> Filmmakers should <strong>NOT</strong> upload full master film video files to the Wano website during initial submission. We only require a private screener viewing link at this stage for evaluation.
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
            <span>5. Rights Confirmation</span>
            <span className={styles.groupBadge}>Agreement</span>
          </div>
          <p className={styles.groupDesc}>
            Please review and confirm each of the following statements:
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
                I understand that submitting a film does not guarantee selection or distribution on Wano TV.
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
                I confirm that the information provided in this submission is accurate.
              </span>
            </label>
          </div>

          <div className={styles.termsNotice}>
            <p style={{ margin: 0 }}>
              🛡️ <strong>Rights Protection:</strong> Submitting your film does <strong>not</strong> transfer copyright ownership or grant Wano permanent distribution rights. If your film is selected, licensing and distribution terms will be agreed upon separately before publication.
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

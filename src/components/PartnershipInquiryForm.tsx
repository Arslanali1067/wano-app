'use client'
import { FormEvent, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ACKNOWLEDGMENT, INQUIRY_TYPES, LIMITS, inquiryDestination, isFinancial, validateInquiry } from '@/lib/partnershipInquiry'
import s from './Site.module.css'
import styles from './PartnershipInquiryForm.module.css'

export default function PartnershipInquiryForm() {
  const [values, setValues] = useState<Record<string, string>>({})
  const [acknowledged, setAcknowledged] = useState(false)
  const [status, setStatus] = useState<'idle' | 'busy' | 'error' | 'done'>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [notice, setNotice] = useState('')
  const [feedbackVersion, setFeedbackVersion] = useState(0)
  const lock = useRef(false)
  const resultRef = useRef<HTMLDivElement>(null)
  const type = values.inquiryType ?? ''
  const financial = isFinancial(type)
  const destination = inquiryDestination(type)
  useEffect(() => { if (status === 'done' || status === 'error') resultRef.current?.focus() }, [status, feedbackVersion])
  const showError = (fields: Record<string, string>, message: string) => {
    setErrors(fields); setNotice(message); setStatus('error'); setFeedbackVersion(old => old + 1)
  }
  const update = (key: string, value: string) => {
    setValues(old => key === 'inquiryType' ? { ...old, inquiryType: value, role: '', participation: '', communityBenefit: '' } : { ...old, [key]: value })
    if (key === 'inquiryType') { setAcknowledged(false); setErrors({}); setStatus('idle'); setNotice('') }
    else setErrors(old => { const next = { ...old }; delete next[key]; return next })
  }
  const submit = async (event: FormEvent) => {
    event.preventDefault()
    if (lock.current || destination) return
    const checked = validateInquiry({ ...values, acknowledgment: acknowledged })
    if (!checked.ok) { showError(checked.errors, 'Please check the highlighted fields.'); return }
    lock.current = true
    setStatus('busy'); setErrors({}); setNotice('')
    try {
      const response = await fetch('/api/partnership-inquiry', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(checked.value) })
      const data = await response.json().catch(() => null)
      if (!response.ok || data?.received !== true || typeof data?.ref !== 'string' || !data.ref.trim()) {
        showError(data?.errors && typeof data.errors === 'object' ? data.errors : {}, typeof data?.detail === 'string' ? data.detail : 'We could not confirm receipt. Your answers are still here; please try again.')
        return
      }
      setStatus('done')
    } catch {
      showError({}, 'We could not confirm receipt. Check your connection. Your answers are still here; please try again.')
    } finally { lock.current = false }
  }
  const field = (name: keyof typeof LIMITS, label: string, required = false, multiline = false, hint?: string) => {
    const id = `partner-${name}`
    const common = { id, name, required, value: values[name] ?? '', maxLength: LIMITS[name],
      onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => update(name, event.target.value),
      'aria-invalid': !!errors[name], 'aria-describedby': [hint ? `${id}-hint` : '', errors[name] ? `${id}-error` : ''].filter(Boolean).join(' ') || undefined }
    return <div className={s.field}>
      <label htmlFor={id}>{label}{required ? ' *' : ' (optional)'}</label>
      {hint && <p className={styles.hint} id={`${id}-hint`}>{hint}</p>}
      {multiline ? <textarea className={s.textarea} rows={4} {...common} /> : <input className={s.input} type={name === 'email' ? 'email' : 'text'} autoComplete={name === 'name' ? 'name' : name === 'email' ? 'email' : name === 'company' ? 'organization' : 'off'} {...common} />}
      {errors[name] && <p className={styles.fieldError} id={`${id}-error`}>{errors[name]}</p>}
    </div>
  }
  if (status === 'done') return <div ref={resultRef} tabIndex={-1} role="status" className={s.ok}>
    <h3>Inquiry received</h3><p>{ACKNOWLEDGMENT}</p>
    <button className={s.btn} type="button" onClick={() => { setValues({}); setAcknowledged(false); setErrors({}); setNotice(''); setStatus('idle') }}>Start another inquiry</button>
  </div>
  return <form className={`${s.form} ${styles.form}`} onSubmit={submit} aria-label="Partnership inquiry" aria-busy={status === 'busy'}>
    <fieldset disabled={status === 'busy'} className={styles.fields}>
      <legend className={styles.legend}>Tell us about your inquiry</legend>
      <div className={s.field}>
        <label htmlFor="partner-type">What would you like to discuss? *</label>
        <select id="partner-type" name="inquiryType" className={s.select} required value={type} onChange={event => update('inquiryType', event.target.value)} aria-invalid={!!errors.inquiryType} aria-describedby={errors.inquiryType ? 'partner-type-error' : undefined}>
          <option value="">Choose an inquiry type</option>
          {INQUIRY_TYPES.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
        </select>
        {errors.inquiryType && <p id="partner-type-error" className={styles.fieldError}>{errors.inquiryType}</p>}
      </div>
      {destination ? <div className={s.card} role="status">
        <p>{type === 'advertise' ? 'For advertising options and campaign budgets, use our advertising enquiry form. You do not need an established Wano following.' : type === 'press' ? 'Journalists and media partners can contact the team on our Press page. A Wano profile is not required.' : 'For technical or account assistance, visit our Help Centre. A partnership application is not required.'}</p>
        <Link className={s.btn} href={destination}>{type === 'advertise' ? 'Go to advertising enquiries' : type === 'press' ? 'Go to Press & partners' : 'Go to Help Centre'}</Link>
      </div> : type ? <>
        {financial && <div className={s.card}>
          <h3>Build your presence on Wano first</h3>
          <p>Financial requests are considered from active participants in the Wano community. A profile alone does not demonstrate meaningful participation. We review the profile and proposal together; we consider relevance and participation, rather than follower counts alone.</p>
          <p>New to Wano? <Link href="/#Download">Get the app</Link>, share your work, and build genuine community connections before submitting a financial request.</p>
        </div>}
        {type === 'sponsor-wano' && <p className={styles.hint}>Use this option if your organization wants to support Wano. You do not need an established Wano following to enquire.</p>}
        {field('name', 'Your name', true)}
        {field('email', 'Email', true)}
        {field('company', 'Organization or project')}
        {field('country', 'Country or region')}
        {field('profile', 'Wano profile for the organization, project or creator you represent', financial, false, 'Enter one primary @handle or paste a Wano profile link shared from the app or website. Never send a password or verification code.')}
        {financial && <>
          {field('role', 'Your role and authority to represent this profile', true)}
          {field('participation', 'How have you participated on Wano?', true, true, 'Describe your relevant content and genuine community engagement. Include additional Wano profiles here if needed.')}
          {field('communityBenefit', 'How would this proposal benefit the Wano community?', true, true)}
        </>}
        {field('message', financial ? 'What are you asking Wano to contribute?' : 'Tell us about your proposal', true, true, financial ? 'Describe the contribution requested. Include the amount and currency for any fee, paid slot or funding request.' : undefined)}
        {financial && <div className={s.field}>
          <label className={styles.check}><input id="partner-acknowledgment" type="checkbox" checked={acknowledged} required onChange={event => { setAcknowledged(event.target.checked); setErrors(old => { const next = { ...old }; delete next.acknowledgment; return next }) }} aria-invalid={!!errors.acknowledgment} aria-describedby={errors.acknowledgment ? 'partner-expectations partner-acknowledgment-error' : 'partner-expectations'} />
            <span>I understand that participation and submission do not guarantee funding, promotion or a partnership. *</span></label>
          <p id="partner-expectations" className={styles.hint}>Invitations do not imply acceptance of participation fees or paid slots. Any financial commitment must be agreed separately in writing.</p>
          {errors.acknowledgment && <p id="partner-acknowledgment-error" className={styles.fieldError}>{errors.acknowledgment}</p>}
        </div>}
        <div><button type="submit" className={s.btn} disabled={status === 'busy'}>{status === 'busy' ? 'Sending…' : 'Submit inquiry'}</button></div>
      </> : null}
    </fieldset>
    {status === 'error' && <div tabIndex={-1} ref={resultRef} role="alert" className={s.err}>{notice}</div>}
    {type && !destination && <p className={styles.hint}>We review proposals individually and may contact you if there is a suitable opportunity. Submitting an inquiry does not create a partnership or financial commitment.</p>}
  </form>
}

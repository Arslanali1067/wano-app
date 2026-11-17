'use client'
import { useState } from 'react'
import s from '@/components/Site.module.css'

type Status = {
  ref: string
  film_title: string
  status: string
  label: string
  text: string
  step: number | null
  steps: string[]
  submitted: string | null
  updated: string | null
}

export default function StatusCheck() {
  const [ref, setRef] = useState('')
  const [email, setEmail] = useState('')
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')
  const [res, setRes] = useState<Status | null>(null)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setBusy(true)
    setErr('')
    setRes(null)
    try {
      const r = await fetch('/api/tv/status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ref, email }),
      })
      const d = await r.json().catch(() => ({}))
      if (!r.ok) throw new Error(typeof d.detail === 'string' ? d.detail : 'Something went wrong. Please try again.')
      setRes(d)
    } catch (x) {
      setErr(x instanceof Error ? x.message : 'Something went wrong.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <>
      <form onSubmit={submit} className={s.form}>
        <label className={s.field}>
          <span>Submission reference *</span>
          <input className={s.input} required placeholder="WTV-123456" maxLength={12} value={ref}
            onChange={(e) => setRef(e.target.value.toUpperCase())} />
        </label>
        <label className={s.field}>
          <span>The email you submitted with *</span>
          <input className={s.input} type="email" required maxLength={200} value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <div><button className={s.btn} type="submit" disabled={busy}>{busy ? 'Checking…' : 'Check status'}</button></div>
      </form>
      {err ? <p className={s.err} style={{ marginTop: 16 }}>{err}</p> : null}
      {res ? (
        <div className={s.card} style={{ marginTop: 22 }}>
          <p className={s.muted}>{res.ref}{res.submitted ? ` · sent ${res.submitted}` : ''}</p>
          <h3>{res.film_title}</h3>
          <p className={s.bigNumber} style={{ fontSize: 24 }}>{res.label}</p>
          <p>{res.text}</p>
          {res.status !== 'declined' ? (
            <ol className={s.steps}>
              {res.steps.map((label, i) => (
                <li key={label} className={`${s.step} ${res.step !== null && i < res.step ? s.stepDone : ''} ${res.step === i ? s.stepNow : ''}`}>
                  <span className={s.dot} />{label}
                </li>
              ))}
            </ol>
          ) : null}
          {res.updated ? <p className={s.muted}>Last update {res.updated}</p> : null}
        </div>
      ) : null}
    </>
  )
}

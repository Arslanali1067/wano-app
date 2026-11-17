'use client'
// A plain form that POSTs JSON to one of the site's /api routes and shows the answer.
import { useState } from 'react'
import s from './Site.module.css'

export type Field = {
  name: string
  label: string
  type?: 'text' | 'email' | 'tel' | 'textarea' | 'select'
  required?: boolean
  placeholder?: string
  options?: string[]
  max?: number
}

export default function SiteForm({
  endpoint, fields, submitLabel, fixed, done,
}: {
  endpoint: string
  fields: Field[]
  submitLabel: string
  fixed?: Record<string, string>
  done: string
}) {
  const [values, setValues] = useState<Record<string, string>>({})
  const [state, setState] = useState<'idle' | 'busy' | 'done' | 'error'>('idle')
  const [msg, setMsg] = useState('')
  const [ref, setRef] = useState('')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setState('busy')
    try {
      const r = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, ...fixed }),
      })
      const d = await r.json().catch(() => ({}))
      if (!r.ok) throw new Error(typeof d.detail === 'string' ? d.detail : 'Something went wrong. Please try again.')
      setRef(typeof d.ref === 'string' && d.ref.startsWith('DEL-') ? d.ref : '')
      setState('done')
    } catch (err) {
      setMsg(err instanceof Error ? err.message : 'Something went wrong.')
      setState('error')
    }
  }

  if (state === 'done') return <p className={s.ok}>{done}{ref ? ` Your reference: ${ref}.` : ''}</p>

  return (
    <form onSubmit={submit} className={s.form}>
      {fields.map((f) => {
        const common = {
          id: f.name, name: f.name, required: f.required, placeholder: f.placeholder, maxLength: f.max ?? 300,
          value: values[f.name] ?? '',
          onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
            setValues((v) => ({ ...v, [f.name]: e.target.value })),
        }
        return (
          <label key={f.name} className={s.field} htmlFor={f.name}>
            <span>{f.label}{f.required ? ' *' : ''}</span>
            {f.type === 'textarea' ? (
              <textarea className={s.textarea} {...common} maxLength={f.max ?? 3000} />
            ) : f.type === 'select' ? (
              <select className={s.select} {...common}>
                <option value="">Choose…</option>
                {(f.options ?? []).map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            ) : (
              <input className={s.input} type={f.type ?? 'text'} {...common} />
            )}
          </label>
        )
      })}
      {state === 'error' ? <p className={s.err}>{msg}</p> : null}
      <div><button className={s.btn} type="submit" disabled={state === 'busy'}>{state === 'busy' ? 'Sending…' : submitLabel}</button></div>
    </form>
  )
}

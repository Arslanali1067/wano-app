'use client'
// "New on Wano TV" mailing list signup. Saved on the Wano server (Admin > Mailing list).
import { useState } from 'react'
import s from './Site.module.css'

export default function Newsletter({ source, title, text }: { source: string; title?: string; text?: string }) {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<'idle' | 'busy' | 'done' | 'error'>('idle')
  const [msg, setMsg] = useState('')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setState('busy')
    try {
      const r = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source, interests: ['wano_tv'] }),
      })
      const d = await r.json().catch(() => ({}))
      if (!r.ok) throw new Error(d.detail || 'Something went wrong. Please try again.')
      setState('done')
    } catch (err) {
      setMsg(err instanceof Error ? err.message : 'Something went wrong.')
      setState('error')
    }
  }

  return (
    <div className={s.band}>
      <h3>{title ?? 'New films on Wano TV, in your inbox'}</h3>
      <p className={s.text}>
        {text ?? 'One short email when new African films and series arrive on Wano TV. No spam, and you can leave any time.'}
      </p>
      {state === 'done' ? (
        <p className={s.ok}>You&apos;re on the list. Watch for our next email.</p>
      ) : (
        <form onSubmit={submit} className={s.inline}>
          <input
            className={s.input}
            type="email"
            required
            maxLength={254}
            placeholder="Your email address"
            aria-label="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className={s.btn} type="submit" disabled={state === 'busy'}>
            {state === 'busy' ? 'Adding…' : 'Keep me posted'}
          </button>
        </form>
      )}
      {state === 'error' ? <p className={s.err} style={{ marginTop: 10 }}>{msg}</p> : null}
    </div>
  )
}

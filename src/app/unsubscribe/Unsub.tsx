'use client'
import { useState } from 'react'
import s from '@/components/Site.module.css'

export default function Unsub({ token }: { token: string }) {
  const [state, setState] = useState<'idle' | 'busy' | 'done' | 'error'>('idle')
  const [msg, setMsg] = useState('')
  const go = async () => {
    setState('busy')
    const r = await fetch('/api/unsubscribe', { method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }) }).catch(() => null)
    const d = r ? await r.json().catch(() => ({})) : {}
    if (r?.ok) setState('done')
    else { setMsg(d.detail || 'Something went wrong. Please try again.'); setState('error') }
  }
  if (!token) return <p className={s.err}>This link is missing its code. Use the unsubscribe link in one of our emails.</p>
  if (state === 'done') return <p className={s.ok}>Done. You won&apos;t get any more emails from us.</p>
  return (
    <>
      <button className={s.btn} onClick={go} disabled={state === 'busy'}>{state === 'busy' ? 'One moment…' : 'Unsubscribe'}</button>
      {state === 'error' ? <p className={s.err} style={{ marginTop: 12 }}>{msg}</p> : null}
    </>
  )
}

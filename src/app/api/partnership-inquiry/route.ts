import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { forward } from '@/lib/wano'
import { inquiryMessage, validateInquiry } from '@/lib/partnershipInquiry'
export const dynamic = 'force-dynamic'
const MAX_BODY = 32_768

export async function POST(req: NextRequest) {
  if (!req.headers.get('content-type')?.toLowerCase().startsWith('application/json')) return NextResponse.json({ detail: 'Send a JSON inquiry.' }, { status: 415 })
  if (Number(req.headers.get('content-length')) > MAX_BODY) return NextResponse.json({ detail: 'The inquiry is too large.' }, { status: 413 })
  const reader = req.body?.getReader()
  if (!reader) return NextResponse.json({ detail: 'Please complete the inquiry form.' }, { status: 400 })
  let raw: unknown
  try {
    const chunks: Uint8Array[] = []
    let length = 0
    while (true) {
      const part = await reader.read()
      if (part.done) break
      length += part.value.byteLength
      if (length > MAX_BODY) { await reader.cancel(); return NextResponse.json({ detail: 'The inquiry is too large.' }, { status: 413 }) }
      chunks.push(part.value)
    }
    raw = JSON.parse(Buffer.concat(chunks).toString('utf8'))
  } catch { return NextResponse.json({ detail: 'We could not read the inquiry. Please try again.' }, { status: 400 }) }
  const result = validateInquiry(raw)
  if (!result.ok) return NextResponse.json({ detail: 'Please check the highlighted fields.', errors: result.errors }, { status: 400 })
  const value = result.value
  const message = inquiryMessage(value)
  // Existing Admin backend accepts a 3,000-character message. Keep all new
  // structured information together there, rather than silently dropping fields.
  if (message.length > 3000) return NextResponse.json({ detail: 'Please shorten your proposal.' }, { status: 400 })
  const fields = { kind: 'partner', name: value.name, email: value.email, company: value.company, country: value.country, message }
  const saved = await forward('/public/enquiries', fields, req.headers)
  if (saved.status !== 200 || typeof saved.data?.ref !== 'string' || !saved.data.ref.trim()) {
    const status = saved.status === 429 ? 429 : saved.status >= 500 || saved.status === 200 ? 503 : 400
    return NextResponse.json({ detail: status === 429 ? 'Too many inquiries. Please try again later.' : "Your inquiry could not be saved. Your answers are still here; please try again." }, { status })
  }
  // A failed notification must not misreport a successfully saved enquiry.
  if (process.env.RESEND_API_KEY) {
    try {
      await new Resend(process.env.RESEND_API_KEY).emails.send({
        from: process.env.RESEND_FROM ?? 'Wano <onboarding@resend.dev>',
        to: process.env.CONTACT_EMAIL ?? 'mailer@wanoafrica.com', replyTo: value.email,
        subject: `Partnership enquiry: ${value.company || value.name}`.replace(/[\r\n]/g, ' '),
        text: [`Name: ${value.name}`, `Organization / project: ${value.company}`, `Email: ${value.email}`, `Country: ${value.country}`, '', message, '', 'Saved in Admin > Website enquiries. Profile identity and participation require review.'].join('\n'),
      })
    } catch { console.error('Partnership inquiry saved; email notification failed.') }
  }
  return NextResponse.json({ ref: saved.data.ref, received: true })
}

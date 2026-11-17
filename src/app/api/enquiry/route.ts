// Advertising, press and partner enquiries: saved on the Wano server (Admin >
// Website enquiries) so none is lost, then emailed to the team.
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { forward } from '@/lib/wano'

export const dynamic = 'force-dynamic'
const TEAM = process.env.CONTACT_EMAIL ?? 'mailer@wanoafrica.com'
const FROM = process.env.RESEND_FROM ?? 'Wano <onboarding@resend.dev>'
const KIND: Record<string, string> = { advertise: 'Advertising', press: 'Press', partner: 'Partnership' }

export async function POST(req: NextRequest) {
  const b = await req.json().catch(() => null)
  if (!b || typeof b !== 'object') return NextResponse.json({ detail: 'Bad request' }, { status: 400 })
  const fields = { kind: b.kind, name: b.name, company: b.company, email: b.email, phone: b.phone,
    country: b.country, budget: b.budget, message: b.message }
  const { status, data } = await forward('/public/enquiries', fields, req.headers)
  if (status === 200 && process.env.RESEND_API_KEY) {
    const s = (v: unknown) => (typeof v === 'string' ? v.slice(0, 3000) : '')
    try {
      await new Resend(process.env.RESEND_API_KEY).emails.send({
        from: FROM, to: TEAM, replyTo: s(b.email) || undefined,
        subject: `${KIND[s(b.kind)] ?? 'Website'} enquiry: ${s(b.company) || s(b.name)}`,
        text: [`${KIND[s(b.kind)] ?? ''} enquiry from wanoafrica.com`, '', `Name: ${s(b.name)}`, `Company: ${s(b.company)}`,
          `Email: ${s(b.email)}`, `Phone: ${s(b.phone)}`, `Country: ${s(b.country)}`, `Budget: ${s(b.budget)}`, '', s(b.message),
          '', 'Also saved in Admin > Website enquiries.'].join('\n'),
      })
    } catch { /* saved on the server anyway */ }
  }
  return NextResponse.json(data, { status })
}

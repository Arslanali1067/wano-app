// Account deletion requests from wanoafrica.com/help/delete-account: saved on the
// Wano server (Admin > Account deletion), then the team is emailed.
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { forward } from '@/lib/wano'

export const dynamic = 'force-dynamic'
const TEAM = process.env.CONTACT_EMAIL ?? 'mailer@wanoafrica.com'
const FROM = process.env.RESEND_FROM ?? 'Wano <onboarding@resend.dev>'

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)
  const { status, data } = await forward('/public/account-deletion', {
    account: body?.account, email: body?.email, reason: body?.reason,
  }, req.headers)
  if (status === 200 && process.env.RESEND_API_KEY) {
    try {
      await new Resend(process.env.RESEND_API_KEY).emails.send({
        from: FROM, to: TEAM, subject: `Account deletion request ${data.ref}`,
        text: `A deletion request arrived from wanoafrica.com. Check it in Admin > Account deletion (${data.ref}).`,
      })
    } catch { /* saved on the server anyway */ }
  }
  return NextResponse.json(data, { status })
}

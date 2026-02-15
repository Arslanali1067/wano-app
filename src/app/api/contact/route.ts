import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

const DEFAULT_CONTACT_EMAIL = 'mailer@wanoafrica.com'
const CONTACT_EMAIL = process.env.CONTACT_EMAIL ?? DEFAULT_CONTACT_EMAIL
const FROM_EMAIL = process.env.RESEND_FROM ?? 'Wano <onboarding@resend.dev>'

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Email service is not configured (RESEND_API_KEY missing)' },
        { status: 500 }
      )
    }

    const resend = new Resend(apiKey)
    const body = await request.json()
    const {
      fullName,
      email,
      message,
      organization,
      phone,
      country,
      partnershipType,
      creatorType,
      formSource,
    } = body

    if (!fullName || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields: fullName, email, message' },
        { status: 400 }
      )
    }

    const subject = formSource
      ? `Contact Form (${formSource}): ${fullName}`
      : `Contact Form: ${fullName}`

    const htmlParts = [
      `<p><strong>Name:</strong> ${escapeHtml(fullName)}</p>`,
      `<p><strong>Email:</strong> ${escapeHtml(email)}</p>`,
    ]
    if (organization) {
      htmlParts.push(`<p><strong>Organization / Brand:</strong> ${escapeHtml(organization)}</p>`)
    }
    if (phone) {
      htmlParts.push(`<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>`)
    }
    if (country) {
      htmlParts.push(`<p><strong>Country / Region:</strong> ${escapeHtml(country)}</p>`)
    }
    if (partnershipType) {
      htmlParts.push(`<p><strong>Partnership Type:</strong> ${escapeHtml(partnershipType)}</p>`)
    }
    if (creatorType) {
      htmlParts.push(`<p><strong>Creator Type:</strong> ${escapeHtml(creatorType)}</p>`)
    }
    if (formSource) {
      htmlParts.push(`<p><strong>Form:</strong> ${escapeHtml(formSource)}</p>`)
    }
    htmlParts.push(`<p><strong>Message:</strong></p><p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>`)

    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [CONTACT_EMAIL],
      replyTo: email,
      subject,
      html: htmlParts.join(''),
    })

    if (error) {
      const errMsg = typeof error === 'object' && error !== null && 'message' in error
        ? (error as { message: string }).message
        : String(error)
      console.error('Resend error:', error)
      return NextResponse.json({ error: errMsg }, { status: 500 })
    }

    return NextResponse.json({ success: true, id: data?.id })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to send message'
    console.error('Contact API error:', err)
    return NextResponse.json(
      { error: message },
      { status: 500 }
    )
  }
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  }
  return text.replace(/[&<>"']/g, (m) => map[m])
}

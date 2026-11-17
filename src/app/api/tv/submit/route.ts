// Film submissions from wanoafrica.com/tv/submit.
// Saved on the Wano server first (Admin > Film submissions), then emailed to
// the filmmaker and the team. A submission only counts as received when it is
// saved or the team email went out, so a film is never silently lost.
import { createHash } from 'crypto'
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export const dynamic = 'force-dynamic'
export const maxDuration = 30

const API = process.env.WANO_API_URL ?? 'https://devbe.wanoafrica.com'

const DEFAULT_CONTACT_EMAIL = 'mailer@wanoafrica.com'
const CONTACT_EMAIL = process.env.CONTACT_EMAIL ?? DEFAULT_CONTACT_EMAIL
const FROM_EMAIL = process.env.RESEND_FROM ?? 'Wano TV <tv@wanoafrica.com>'

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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
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
      posterFileName,
      posterDataUrl,
      rightsConfirmed,
    } = body

    // Validate required fields
    if (
      !fullName ||
      !email ||
      !country ||
      !filmTitle ||
      !countryRepresented ||
      !yearCompleted ||
      !runtime ||
      !category ||
      !languages ||
      !subtitles ||
      !synopsis ||
      !viewingLink
    ) {
      return NextResponse.json(
        { error: 'Please fill in all required fields.' },
        { status: 400 }
      )
    }

    if (!rightsConfirmed) {
      return NextResponse.json(
        { error: 'You must confirm that you own or control the necessary rights to submit this film.' },
        { status: 400 }
      )
    }

    const t = (v: unknown) => (typeof v === 'string' ? v.trim() : '')
    const saved = {
      id: '',
      fullName: t(fullName), email: t(email), phone: t(phone), country: t(country), city: t(city),
      productionCompany: t(productionCompany), filmTitle: t(filmTitle), countryRepresented: t(countryRepresented),
      yearCompleted: t(yearCompleted), runtime: t(runtime), category: t(category), languages: t(languages),
      subtitles: t(subtitles), synopsis: t(synopsis), viewingLink: t(viewingLink), viewingPassword: t(viewingPassword),
      trailerLink: t(trailerLink),
    }

    // 1. Save on the Wano server.
    const ip = (request.headers.get('x-forwarded-for') ?? '').split(',')[0].trim()
    const who = createHash('sha256').update(`${ip}|${request.headers.get('user-agent') ?? ''}`).digest('hex').slice(0, 32)
    let stored = false
    try {
      const r = await fetch(`${API}/api/v1/film-submissions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        cache: 'no-store',
        signal: AbortSignal.timeout(15000),
        body: JSON.stringify({
          full_name: saved.fullName, email: saved.email, phone: saved.phone, country: saved.country, city: saved.city,
          production_company: saved.productionCompany, film_title: saved.filmTitle,
          country_represented: saved.countryRepresented, year_completed: saved.yearCompleted, runtime: saved.runtime,
          category: saved.category, languages: saved.languages, subtitles: saved.subtitles, synopsis: saved.synopsis,
          viewing_link: saved.viewingLink, viewing_password: saved.viewingPassword, trailer_link: saved.trailerLink,
          poster_file_name: t(posterFileName), poster_data_url: typeof posterDataUrl === 'string' ? posterDataUrl : '',
          rights_confirmed: true, who,
        }),
      })
      const out = await r.json().catch(() => ({}))
      if (r.ok && out.ref) {
        saved.id = out.ref
        stored = true
        if (out.created === false) {
          // The same film a moment ago (a double tap): it is already in, don't email again.
          return NextResponse.json({ success: true, submissionId: saved.id, filmTitle: saved.filmTitle, fullName: saved.fullName })
        }
      } else if (r.status === 400 || r.status === 429) {
        return NextResponse.json({ error: out.detail || 'Please check the form and try again.' }, { status: r.status })
      } else {
        console.error('[Wano TV] Server save failed', r.status, out)
      }
    } catch (err) {
      console.error('[Wano TV] Server save failed', err)
    }
    if (!saved.id) saved.id = `WTV-${Math.floor(100000 + Math.random() * 900000)}`

    // Trigger automated emails via Resend if API key is provided
    const apiKey = process.env.RESEND_API_KEY
    let teamEmailed = false
    if (apiKey) {
      try {
        const resend = new Resend(apiKey)

        // 1. Filmmaker Confirmation Email
        const filmmakerHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #0b0b15; color: #ffffff; margin: 0; padding: 20px; }
    .card { max-width: 600px; margin: 0 auto; background-color: #121220; border: 1px solid #232329; border-radius: 12px; padding: 32px 24px; }
    .header { text-align: center; padding-bottom: 24px; border-bottom: 1px solid #232329; }
    .logo { color: #73BD8C; font-size: 26px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; }
    .tagline { color: #E38028; font-size: 14px; font-weight: 600; margin-top: 4px; }
    .title { font-size: 22px; font-weight: 700; margin-top: 24px; color: #ffffff; }
    .content { font-size: 15px; line-height: 1.6; color: #cccccc; margin-top: 16px; }
    .highlight-box { background-color: #1a1a2e; border-left: 4px solid #73BD8C; padding: 16px; border-radius: 6px; margin: 20px 0; }
    .ref-code { font-family: monospace; font-size: 18px; color: #73BD8C; font-weight: bold; }
    .notice { font-size: 13px; color: #999999; margin-top: 24px; border-top: 1px solid #232329; padding-top: 16px; }
    .footer { text-align: center; font-size: 12px; color: #666666; margin-top: 24px; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <div class="logo">WANO TV</div>
      <div class="tagline">Stories worth watching • Now streaming in the Wano app</div>
    </div>
    
    <div class="title">Film Received — Thank you for submitting!</div>
    
    <div class="content">
      <p>Dear ${escapeHtml(saved.fullName)},</p>
      <p>Thank you for submitting <strong>${escapeHtml(saved.filmTitle)}</strong> for consideration for <strong>Wano TV</strong>.</p>
      
      <div class="highlight-box">
        <p style="margin: 0 0 6px 0;"><strong>Submission Reference ID:</strong></p>
        <span class="ref-code">${saved.id}</span>
        <p style="margin: 8px 0 0 0; font-size: 14px; color: #bbbbbb;">
          <strong>Category:</strong> ${escapeHtml(saved.category)} &bull; <strong>Runtime:</strong> ${escapeHtml(saved.runtime)}
        </p>
      </div>

      <p>Our curation and editorial team will privately review your submission. If your film is selected for the next stage, Wano will reach out to you directly via this email address.</p>

      <p>You can check where your film is at any time at <a href="https://wanoafrica.com/tv/status" style="color:#E38028;">wanoafrica.com/tv/status</a> with your reference and this email address.</p>

      <p><strong>Important reminder:</strong> Please do <em>not</em> send full master video files unless explicitly requested by the Wano TV team.</p>
    </div>

    <div class="notice">
      <p style="margin: 0;"><em>This is an automated confirmation of receipt. Submitting a film does not transfer copyright ownership. All licensing and distribution rights are handled separately upon official selection.</em></p>
    </div>

    <div class="footer">
      &copy; ${new Date().getFullYear()} Wano TV. All rights reserved.<br>
      Connecting Africa, the Diaspora, and the world through authentic cinema.
    </div>
  </div>
</body>
</html>
        `

        await resend.emails.send({
          from: FROM_EMAIL,
          to: [saved.email],
          subject: `Film Received: ${saved.filmTitle} (${saved.id}) | Wano TV`,
          html: filmmakerHtml,
        }).catch((e) => console.error('Filmmaker email failed:', e))

        // 2. Team Notification Email
        const teamHtml = `
          <h2>New Wano TV Film Submission</h2>
          <p><strong>Submission ID:</strong> ${saved.id}</p>
          <p><strong>Film Title:</strong> ${escapeHtml(saved.filmTitle)}</p>
          <p><strong>Filmmaker:</strong> ${escapeHtml(saved.fullName)} (${escapeHtml(saved.email)})</p>
          <p><strong>Country / Region:</strong> ${escapeHtml(saved.country)} (Represented: ${escapeHtml(saved.countryRepresented)})</p>
          <p><strong>Category:</strong> ${escapeHtml(saved.category)}</p>
          <p><strong>Runtime:</strong> ${escapeHtml(saved.runtime)} | <strong>Year:</strong> ${escapeHtml(saved.yearCompleted)}</p>
          <p><strong>Languages:</strong> ${escapeHtml(saved.languages)} (Subtitles: ${escapeHtml(saved.subtitles)})</p>
          <p><strong>Viewing Link:</strong> <a href="${escapeHtml(saved.viewingLink)}">${escapeHtml(saved.viewingLink)}</a></p>
          ${saved.viewingPassword ? `<p><strong>Password:</strong> ${escapeHtml(saved.viewingPassword)}</p>` : ''}
          <p><strong>Saved in Wano admin:</strong> ${stored ? 'yes (Admin &gt; Film submissions)' : 'NO, the server save failed: this email is the only copy'}</p>
          ${saved.trailerLink ? `<p><strong>Trailer:</strong> <a href="${escapeHtml(saved.trailerLink)}">${escapeHtml(saved.trailerLink)}</a></p>` : ''}
          <p><strong>Synopsis:</strong></p>
          <p>${escapeHtml(saved.synopsis).replace(/\n/g, '<br>')}</p>
        `

        const sent = await resend.emails.send({
          from: FROM_EMAIL,
          to: [CONTACT_EMAIL],
          subject: `[Wano TV Submission] ${saved.filmTitle} - ${saved.fullName} (${saved.id})`,
          html: teamHtml,
        })
        teamEmailed = !sent.error
      } catch (emailErr) {
        console.error('Failed to send Resend email:', emailErr)
      }
    }

    if (!stored && !teamEmailed) {
      return NextResponse.json(
        { error: 'We could not receive your film just now. Please try again in a few minutes, or email it to mailer@wanoafrica.com.' },
        { status: 503 },
      )
    }

    return NextResponse.json({
      success: true,
      submissionId: saved.id,
      filmTitle: saved.filmTitle,
      fullName: saved.fullName,
    })
  } catch (err) {
    console.error('Error handling TV submission:', err)
    const message = err instanceof Error ? err.message : 'An error occurred while submitting your film.'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

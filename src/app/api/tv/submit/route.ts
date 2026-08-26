import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { saveSubmission } from '@/lib/tv-submissions'

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

    // Save to persistent storage
    const saved = saveSubmission({
      fullName: String(fullName).trim(),
      email: String(email).trim(),
      phone: phone ? String(phone).trim() : undefined,
      country: String(country).trim(),
      city: city ? String(city).trim() : undefined,
      productionCompany: productionCompany ? String(productionCompany).trim() : undefined,
      filmTitle: String(filmTitle).trim(),
      countryRepresented: String(countryRepresented).trim(),
      yearCompleted: String(yearCompleted).trim(),
      runtime: String(runtime).trim(),
      category: String(category).trim(),
      languages: String(languages).trim(),
      subtitles: String(subtitles).trim(),
      synopsis: String(synopsis).trim(),
      viewingLink: String(viewingLink).trim(),
      viewingPassword: viewingPassword ? String(viewingPassword).trim() : undefined,
      trailerLink: trailerLink ? String(trailerLink).trim() : undefined,
      posterFileName: posterFileName ? String(posterFileName).trim() : undefined,
      posterDataUrl: posterDataUrl ? String(posterDataUrl) : undefined,
      rightsConfirmed: true,
    })

    // Trigger automated emails via Resend if API key is provided
    const apiKey = process.env.RESEND_API_KEY
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
      <div class="tagline">Stories worth watching • Launching Soon</div>
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
        })

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
          ${saved.trailerLink ? `<p><strong>Trailer:</strong> <a href="${escapeHtml(saved.trailerLink)}">${escapeHtml(saved.trailerLink)}</a></p>` : ''}
          <p><strong>Synopsis:</strong></p>
          <p>${escapeHtml(saved.synopsis).replace(/\n/g, '<br>')}</p>
        `

        await resend.emails.send({
          from: FROM_EMAIL,
          to: [CONTACT_EMAIL],
          subject: `[Wano TV Submission] ${saved.filmTitle} - ${saved.fullName} (${saved.id})`,
          html: teamHtml,
        })
      } catch (emailErr) {
        console.error('Failed to send Resend email:', emailErr)
        // We still return success since the submission is safely stored in our database/file
      }
    } else {
      console.log(`[Wano TV] Submission saved: ${saved.id} - ${saved.filmTitle} by ${saved.fullName} (RESEND_API_KEY not configured)`)
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

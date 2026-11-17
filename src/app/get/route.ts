// wanoafrica.com/get?by=<name>: one link for creator invites.
// Each phone goes straight to its store (no extra page to tap through), and
// the tap is counted for <name> in the Wano admin (Kampala growth). Installs
// from the link also show in Play Console (utm_campaign = name) and App Store
// Connect (campaign get_<name>).
import { createHash } from 'crypto'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const PLAY = 'https://play.google.com/store/apps/details?id=com.wano.app'
const APP_STORE = 'https://apps.apple.com/app/wano-app/id6753104927'
const API = process.env.WANO_API_URL ?? 'https://devbe.wanoafrica.com'
// Link previews (WhatsApp, Facebook, X...) open the link too: never count them.
const BOTS = /bot|crawl|spider|preview|facebookexternalhit|whatsapp|telegram|slack|discord|twitter|linkedin|skype|embedly/i

function clean(value: string | null): string {
  return (value ?? '').trim().toLowerCase().replace(/^@/, '').replace(/[^a-z0-9._-]/g, '').slice(0, 40)
}

export async function GET(req: NextRequest) {
  const by = clean(req.nextUrl.searchParams.get('by'))
  const ua = req.headers.get('user-agent') ?? ''
  const platform = /android/i.test(ua) ? 'android' : /iphone|ipad|ipod/i.test(ua) ? 'ios' : 'other'
  const campaign = by || 'invite'

  let dest: string
  if (platform === 'android') {
    dest = `${PLAY}&referrer=${encodeURIComponent(`utm_source=wano_invite&utm_medium=link&utm_campaign=${campaign}`)}`
  } else if (platform === 'ios') {
    dest = `${APP_STORE}?ct=${encodeURIComponent(`get_${campaign}`.slice(0, 40))}`
  } else {
    dest = new URL('/', req.url).toString()
  }

  if (!BOTS.test(ua)) {
    const ip = (req.headers.get('x-forwarded-for') ?? '').split(',')[0].trim()
    const who = createHash('sha256').update(`${ip}|${ua}`).digest('hex').slice(0, 32)
    // Counting must never hold the person up for long.
    await Promise.race([
      fetch(`${API}/api/v1/get-links/tap`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ by, platform, who }),
        cache: 'no-store',
      }).catch(() => undefined),
      new Promise((resolve) => setTimeout(resolve, 800)),
    ])
  }

  const res = NextResponse.redirect(dest, 302)
  res.headers.set('Cache-Control', 'no-store')
  return res
}

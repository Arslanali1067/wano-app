import { NextRequest, NextResponse } from 'next/server'
import { forward } from '@/lib/wano'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)
  if (!body || typeof body !== 'object') return NextResponse.json({ detail: 'Bad request' }, { status: 400 })
  const { status, data } = await forward('/public/newsletter', {
    email: body.email, source: body.source, interests: body.interests,
  }, req.headers)
  return NextResponse.json(data, { status })
}

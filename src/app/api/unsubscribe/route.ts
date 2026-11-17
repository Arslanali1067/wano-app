import { NextRequest, NextResponse } from 'next/server'
import { forward } from '@/lib/wano'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)
  const { status, data } = await forward('/public/newsletter/unsubscribe', { token: body?.token }, req.headers)
  return NextResponse.json(data, { status })
}

// Data for the public pages, from the Wano server (backend app/services/public_site.py).
// Pages re-check every few minutes; when the server can't be reached they show
// what they can rather than an error page.
import { createHash } from 'crypto'

export const API = process.env.WANO_API_URL ?? 'https://devbe.wanoafrica.com'
export const SITE = 'https://wanoafrica.com'

export interface Person {
  username: string
  display_name: string
  profile_picture: string | null
  url: string | null
}

export interface Post {
  id: string
  title: string
  thumbnail: string | null
  views: number
  likes: number
  photo: boolean
  url: string
  created_at: string | null
  creator?: Person
}

export interface Creator {
  id: string
  username: string
  display_name: string
  profile_picture: string | null
  bio: string
  followers: number
  following: number
  posts_count: number
  tier: string | null
  country: string | null
  country_name: string | null
  badges: { label: string; kind: string }[]
  verified: boolean
  posts: Post[]
  url: string
  app_link: string
}

export interface RankedCreator extends Person {
  rank: number
  views: number
  likes?: number
  posts?: number
}

export interface Trending {
  country: string | null
  country_name: string | null
  week_start: string
  creators: RankedCreator[]
  sounds: { title: string; artist: string; creators: number; posts: number; cover: string | null }[]
  posts: Post[]
  countries: { id: string; name: string }[]
}

export interface City {
  id: string
  name: string
  country: string
  country_name: string | null
  creators: RankedCreator[]
  posts: Post[]
}

async function get<T>(path: string, revalidate = 300): Promise<T | null> {
  try {
    const r = await fetch(`${API}/api/v1/public${path}`, {
      next: { revalidate },
      signal: AbortSignal.timeout(8000),
    })
    if (!r.ok) return null
    return (await r.json()) as T
  } catch {
    return null
  }
}

export const getCreator = (username: string) => get<Creator>(`/creators/${encodeURIComponent(username)}`, 300)
export const getTrending = (country?: string) =>
  get<Trending>(`/trending${country ? `?country=${encodeURIComponent(country)}` : ''}`, 600)
export const getCity = (id: string) => get<City>(`/cities/${encodeURIComponent(id)}`, 600)
export const getCreatorIndex = async () =>
  (await get<{ items: { username: string; followers: number; updated: string }[] }>('/creators', 3600))?.items ?? []

export const handlePath = (username: string) => `/@${encodeURIComponent(username)}`

export function compact(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(n >= 10_000_000 ? 0 : 1).replace(/\.0$/, '')}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(n >= 10_000 ? 0 : 1).replace(/\.0$/, '')}K`
  return String(n)
}

/** A stable, anonymous id for rate limits: the sender's address and browser, hashed. */
export function senderId(headers: Headers): string {
  const ip = (headers.get('x-forwarded-for') ?? '').split(',')[0].trim()
  return createHash('sha256').update(`${ip}|${headers.get('user-agent') ?? ''}`).digest('hex').slice(0, 32)
}

/** POSTs a form to the Wano server and returns its answer as the Next response body/status. */
export async function forward(path: string, body: Record<string, unknown>, headers: Headers) {
  try {
    const r = await fetch(`${API}/api/v1${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
      signal: AbortSignal.timeout(12000),
      body: JSON.stringify({ ...body, who: senderId(headers) }),
    })
    const data = await r.json().catch(() => ({}))
    return { status: r.status, data }
  } catch {
    return { status: 503, data: { detail: "We couldn't reach our server. Please try again in a minute." } }
  }
}

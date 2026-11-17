// Wano TV catalogue for the website, from the same list the app uses.
// Pages re-check every hour; if the Wano server can't be reached the last
// saved copy (src/data/tvSnapshot.json) is shown instead of an empty page.
import snapshot from '@/data/tvSnapshot.json'

export interface TvTitle {
  id: string
  slug: string
  title: string
  type: 'movie' | 'series' | string
  genres: string[]
  year?: number
  release_date?: string
  duration_minutes?: number
  age_rating?: string
  description?: string
  synopsis?: string
  trailer?: { duration_seconds?: number; thumbnail?: string; video_url?: string } | null
  credits?: { director?: string; cast?: string[]; production?: string; distributor?: string } | null
  poster?: string
  backdrop?: string
  captions?: { language: string; label: string }[]
  episode_count?: number
  makers?: { username: string; display_name: string; role: string }[]
}

const API = process.env.WANO_API_URL ?? 'https://devbe.wanoafrica.com'
// "Series" is a kind of title, not a genre; never show it as one.
const NOT_GENRES = new Set(['series', 'movie', 'film'])

function tidy(t: TvTitle): TvTitle {
  return {
    ...t,
    genres: (t.genres || []).filter((g) => !NOT_GENRES.has(String(g).toLowerCase())),
    captions: (t.captions || []).map((c) => ({ language: c.language, label: c.label })),
    makers: (t.makers || []).map((m) => ({ username: m.username, display_name: m.display_name, role: m.role })),
  }
}

export async function getTvTitles(): Promise<TvTitle[]> {
  try {
    const r = await fetch(`${API}/api/v1/tv/titles?authenticated=false`, {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(8000),
    })
    if (r.ok) {
      const list = (await r.json()) as TvTitle[]
      if (Array.isArray(list) && list.length) return list.filter((t) => t && t.slug).map(tidy)
    }
  } catch {
    // fall through to the saved copy
  }
  return (snapshot as TvTitle[]).map(tidy)
}

export async function getTvTitle(slug: string): Promise<TvTitle | undefined> {
  return (await getTvTitles()).find((t) => t.slug === slug)
}

export function runtimeLabel(t: TvTitle): string {
  const m = t.duration_minutes
  if (!m) return ''
  if (t.type === 'series') return `${m} min episodes`
  return m >= 60 ? `${Math.floor(m / 60)} h ${m % 60 ? `${m % 60} min` : ''}`.trim() : `${m} min`
}

export const WATCH_LINK = 'https://wanoafrica.com/get?by=tv'

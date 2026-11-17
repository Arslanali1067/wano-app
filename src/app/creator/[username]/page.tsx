// wanoafrica.com/@username (rewritten here by next.config.js): a creator's public
// page. Creators can use it as their link in bio; "Follow on Wano" counts as
// their invite (wanoafrica.com/get?by=<username>).
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import s from '@/components/Site.module.css'
import { Avatar, PostGrid } from '@/components/SitePieces'
import { compact, getCreator, SITE } from '@/lib/wano'

export const revalidate = 300

type Props = { params: { username: string } }

const decode = (u: string) => {
  try {
    return decodeURIComponent(u).replace(/^@/, '')
  } catch {
    return u
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = await getCreator(decode(params.username))
  if (!c) return { title: 'Creator not found', robots: { index: false } }
  const title = `${c.display_name} (@${c.username}) on Wano`
  const description = c.bio
    ? `${c.bio.slice(0, 140)} · ${compact(c.followers)} followers on Wano.`
    : `Watch ${c.display_name} on Wano: ${compact(c.posts_count)} posts, ${compact(c.followers)} followers. African videos, films and chat.`
  return {
    title,
    description,
    alternates: { canonical: c.url.replace(SITE, '') },
    robots: c.posts_count ? undefined : { index: false },
    openGraph: {
      title,
      description,
      url: c.url,
      type: 'profile',
      images: c.profile_picture ? [{ url: c.profile_picture, alt: c.display_name }] : [{ url: '/images/og-wano.jpg' }],
    },
    twitter: { card: 'summary', title, description },
  }
}

export default async function CreatorPage({ params }: Props) {
  const c = await getCreator(decode(params.username))
  if (!c) notFound()
  const invite = `/get?by=${encodeURIComponent(c.username.toLowerCase().replace(/[^a-z0-9._-]/g, ''))}`
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: {
      '@type': 'Person',
      name: c.display_name,
      alternateName: `@${c.username}`,
      description: c.bio || undefined,
      image: c.profile_picture || undefined,
      url: c.url,
      interactionStatistic: [
        { '@type': 'InteractionCounter', interactionType: 'https://schema.org/FollowAction', userInteractionCount: c.followers },
      ],
    },
  }
  return (
    <section className={s.page}>
      <div className="container">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
        <div className={s.profile}>
          <Avatar src={c.profile_picture} name={c.display_name} />
          <div>
            <h1 className={s.h1}>{c.display_name}</h1>
            <p className={s.handle}>
              @{c.username}
              {c.country_name ? ` · ${c.country_name}` : ''}
            </p>
            <div className={s.chips}>
              {c.verified ? <span className={s.chip}>Wano official</span> : null}
              {c.tier ? <span className={s.chip}>{c.tier} creator</span> : null}
              {c.badges.slice(0, 3).map((b) => (
                <span key={b.label} className={s.chip}>{b.label}</span>
              ))}
            </div>
            <div className={s.stats}>
              <div className={s.stat}><strong>{compact(c.followers)}</strong><span>Followers</span></div>
              <div className={s.stat}><strong>{compact(c.following)}</strong><span>Following</span></div>
              <div className={s.stat}><strong>{compact(c.posts_count)}</strong><span>Posts</span></div>
            </div>
            {c.bio ? <p className={s.text} style={{ maxWidth: 560, whiteSpace: 'pre-line' }}>{c.bio}</p> : null}
            <div className={s.row}>
              <a className={s.btn} href={invite}>Follow on Wano</a>
              <a className={s.btnGhost} href={`/u/${c.id}`}>Open in the app</a>
            </div>
          </div>
        </div>
        <h2 className={s.h2}>Latest on Wano</h2>
        <PostGrid posts={c.posts} />
        {c.posts_count > c.posts.length ? (
          <p className={s.muted} style={{ marginTop: 14 }}>
            {compact(c.posts_count - c.posts.length)} more in the Wano app. <a href={invite} style={{ color: '#f2b261' }}>Get Wano free</a>
          </p>
        ) : null}
      </div>
    </section>
  )
}

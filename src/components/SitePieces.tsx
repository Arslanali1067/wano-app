// Small shared pieces for the public data pages (server components).
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import s from './Site.module.css'
import { compact, handlePath, type Post, type RankedCreator } from '@/lib/wano'

export function Avatar({ src, name, className }: { src: string | null; name: string; className?: string }) {
  if (src) return <img src={src} alt={name} className={className ?? s.avatar} loading="lazy" />
  return <div className={s.avatarLetter} aria-hidden="true">{(name || '?').trim().charAt(0).toUpperCase()}</div>
}

export function PostGrid({ posts, showCreator }: { posts: Post[]; showCreator?: boolean }) {
  if (!posts.length) return <p className={s.empty}>No public posts yet.</p>
  return (
    <div className={s.posts}>
      {posts.map((p) => (
        <a key={p.id} href={`/v/${p.id}`} className={s.post}>
          {p.thumbnail ? <img src={p.thumbnail} alt={p.title || 'Wano post'} loading="lazy" /> : null}
          <div className={s.postInfo}>
            {p.title ? <div className={s.postTitle}>{p.title}</div> : null}
            <div className={s.postBy}>
              {showCreator && p.creator ? `@${p.creator.username} · ` : ''}
              {compact(p.views)} views
            </div>
          </div>
        </a>
      ))}
    </div>
  )
}

export function RankList({ rows, metric = 'views' }: { rows: RankedCreator[]; metric?: 'views' }) {
  if (!rows.length) return <p className={s.empty}>The board fills up as the week goes on. Check back soon.</p>
  return (
    <ol className={s.ranks}>
      {rows.map((r) => (
        <li key={r.username}>
          <Link href={handlePath(r.username)} className={s.rankRow}>
            <span className={s.rankNo}>{r.rank}</span>
            {r.profile_picture ? (
              <img src={r.profile_picture} alt="" className={s.rankPic} loading="lazy" />
            ) : (
              <span className={s.rankPic} />
            )}
            <span className={s.rankName}>
              <strong>{r.display_name || r.username}</strong>
              <span>@{r.username}</span>
            </span>
            <span className={s.rankMeta}>{compact(r[metric] ?? 0)}<span className={s.rankMetaLong}> views this week</span><span className={s.rankMetaShort}> views</span></span>
          </Link>
        </li>
      ))}
    </ol>
  )
}

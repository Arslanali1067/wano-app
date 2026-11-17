// The shared layout for topic, hashtag and sound pages: a heading, real posts,
// their top creators, links to related pages and a "Get Wano" band.
import Link from 'next/link'
import s from '@/components/Site.module.css'
import { PostGrid, RankList } from '@/components/SitePieces'
import type { Post, RankedCreator } from '@/lib/wano'

export default function ListingPage({
  eyebrow, title, lead, posts, creators, links, linksTitle, cta,
}: {
  eyebrow: string
  title: string
  lead: string
  posts: Post[]
  creators: RankedCreator[]
  links: { href: string; label: string }[]
  linksTitle: string
  cta: string
}) {
  return (
    <section className={s.page}>
      <div className="container">
        <p className={s.eyebrow}>{eyebrow}</p>
        <h1 className={s.h1}>{title}</h1>
        <p className={s.lead} style={{ maxWidth: 760 }}>{lead}</p>
        <div className={s.row} style={{ marginTop: 18 }}>
          <a className={s.btn} href={cta}>Watch more on Wano, free</a>
        </div>
        <h2 className={s.h2}>Most watched</h2>
        <PostGrid posts={posts} showCreator />
        {creators.length ? (
          <>
            <h2 className={s.h2}>Creators to follow</h2>
            <div style={{ maxWidth: 640 }}><RankList rows={creators} /></div>
          </>
        ) : null}
        {links.length ? (
          <>
            <h2 className={s.h2}>{linksTitle}</h2>
            <div className={s.tabs}>
              {links.map((l) => <Link key={l.href} href={l.href} className={s.tab}>{l.label}</Link>)}
            </div>
          </>
        ) : null}
      </div>
    </section>
  )
}

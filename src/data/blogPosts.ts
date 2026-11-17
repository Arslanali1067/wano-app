export interface BlogPost {
  slug: string
  date: string
  title: string
  description: string
  imageUrl: string
  content: string
}

import { batch1 } from './blogPostsBatch1'
import { batch2 } from './blogPostsBatch2'

const GET = 'https://wanoafrica.com/get?by=blog'

const launchPosts: BlogPost[] = [
  {
    slug: 'the-new-wano',
    date: 'November 17, 2026',
    title: 'The new Wano: Wano TV, voice messages and city battles',
    description: 'African films in the app, chat with voice messages, Home Ground city battles and Quick posts. Here is what changed.',
    imageUrl: '/images/Feature1.webp',
    content: `
      <p>Wano started as a place to watch and share short videos from Africa and the diaspora. It is still that, and now a lot more. Here is what is new.</p>
      <h2>Wano TV</h2>
      <p>African films and series, free inside the app. Browse the Wano TV Top 10 for the week and rows by genre, pick up where you left off with Continue watching, and let the next episode start on its own. Save titles to My List and share them with friends.</p>
      <p>Made a film? <a href="/tv/submit">Submit it to Wano TV</a>. Submission is free and you keep ownership of your work.</p>
      <h2>Messages</h2>
      <p>Chat with creators and friends right inside Wano. Share a video into a chat, react to a message, reply to it, edit it or delete it. Wrote something with no network? It sends when the network comes back. Hold the mic to send a voice message of up to 2 minutes (on Android now, and on iPhone with the next update).</p>
      <p>Messages are for people 18 and over, with blocking and reporting in every chat.</p>
      <h2>Represent your city: Home Ground</h2>
      <p>Pick your Home Ground and represent your city and your country. Cities and countries battle every week, with the top local creators shown for each. React with your city, or with an Eish or an Ayaa.</p>
      <h2>Quick posts</h2>
      <p>Voice notes and status cards in the ring around your profile picture. They disappear after 24 hours.</p>
      <h2>Also new</h2>
      <ul>
        <li>Trending by country: what Nigeria, Kenya, Ghana, Uganda or Jamaica is watching right now</li>
        <li>Wano Picks: the best videos of the week, chosen by our team</li>
        <li>Sign in with a code if you forget your password</li>
        <li>"Made with AI" labels, and easy reporting and blocking</li>
      </ul>
      <p>No account is needed to start watching. <a href="${GET}">Get Wano free on Android and iPhone</a>.</p>
    `,
  },
  {
    slug: 'wano-is-light-on-your-data',
    date: 'November 17, 2026',
    title: 'Why Wano is light on your data',
    description: 'Most of our viewers buy data in small bundles. So we made pictures and pages small, and kept videos the same.',
    imageUrl: '/images/Section.webp',
    content: `
      <p>Most people who watch Wano are on mobile data, and many buy it in small bundles. Every megabyte the app spends on something you never see is a megabyte you paid for. So we went through the app and cut what you don't need.</p>
      <h2>Smaller pictures</h2>
      <p>Profile pictures used to arrive at full size, up to 2 MB each, even though they show as a small circle. Wano now sends a small copy: about 10 KB for a profile picture.</p>
      <h2>Lighter pages</h2>
      <p>The list of videos the app loads as you scroll is now compressed. A page of the feed is about 7 KB instead of 34 KB.</p>
      <h2>The videos stay the same</h2>
      <p>None of this touches the videos you watch. It only removes the waste around them, so your bundle goes on what you came for.</p>
      <p><a href="${GET}">Get Wano free on Android and iPhone</a>.</p>
    `,
  },
  {
    slug: 'submit-your-film-to-wano-tv',
    date: 'November 17, 2026',
    title: 'Wano TV is open for films: submit yours',
    description: 'Shorts, features, documentaries and docuseries from Africa and the diaspora. Free to submit, and your film stays yours.',
    imageUrl: '/images/Feature2.webp',
    content: `
      <p>Wano TV is a curated home for films, documentaries and original stories from Africa and the global African diaspora, inside the Wano app. We are looking for filmmakers to help shape what appears on it.</p>
      <h2>What we are looking for</h2>
      <ul>
        <li>Short films: 5 to 40 minutes</li>
        <li>Feature films and documentaries: 40 to 120+ minutes</li>
        <li>Docuseries</li>
      </ul>
      <p>Debut shorts, grassroots documentaries and festival films are all welcome. Every submission is judged on story, vision and craft, not on industry connections.</p>
      <h2>Your film stays yours</h2>
      <p>Submitting is free. You keep ownership of your film, and submitting does not transfer your copyright to Wano. If your film is selected, distribution and licensing terms are agreed with you before it appears on Wano TV.</p>
      <p><a href="/tv/submit">Submit your film</a></p>
    `,
  },
]

// Every post, scheduled ones included.
const allPosts: BlogPost[] = [...batch2, ...batch1, ...launchPosts]

/**
 * Posts whose date has arrived, newest first. Scheduled posts (a future date)
 * stay hidden until their day; the blog, post pages and sitemap re-check every
 * hour, so a scheduled post goes live on its own without a new deploy.
 */
export function publishedPosts(now: Date = new Date()): BlogPost[] {
  return allPosts
    .filter((post) => postTime(post) <= now.getTime())
    .sort((a, b) => postTime(b) - postTime(a))
}

/**
 * When a post goes live: midnight East Africa Time (UTC+3) on its date, the
 * same on any server whatever its time zone. A date that can't be read counts
 * as published, so a typo never hides a post.
 */
export function postTime(post: BlogPost): number {
  const t = new Date(`${post.date} 00:00:00 GMT+0300`).getTime()
  return Number.isNaN(t) ? 0 : t
}

/** Every post including scheduled ones (for checks, not for pages). */
export function allBlogPosts(): BlogPost[] {
  return allPosts
}

export function getBlogPost(slug: string): BlogPost | undefined {
  return publishedPosts().find((post) => post.slug === slug)
}

export function getRelatedPosts(currentSlug: string, limit: number = 3): BlogPost[] {
  return publishedPosts()
    .filter((post) => post.slug !== currentSlug)
    .slice(0, limit)
}

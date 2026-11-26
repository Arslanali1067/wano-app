import type { Metadata } from 'next'
import Link from 'next/link'
import s from '@/components/Site.module.css'

export const metadata: Metadata = {
  title: 'Help centre',
  description: 'Answers about using Wano: watching, posting, Wano TV, Home Ground, badges, messages, safety, your data and deleting your account.',
  alternates: { canonical: '/help' },
}

type QA = { q: string; a: React.ReactNode }
const sections: { id: string; title: string; items: QA[] }[] = [
  {
    id: 'start', title: 'Getting started', items: [
      { q: 'Is Wano free?', a: <p>Yes. Wano is free to download and free to use, on Android and iPhone. Films and series on Wano TV are free too.</p> },
      { q: 'Do I need an account?', a: <p>No account is needed to start watching. To post, comment, follow people or send messages, create a free account in the app.</p> },
      { q: 'Where can I get the app?', a: <p>On <a href="https://play.google.com/store/apps/details?id=com.wano.app">Google Play</a> and the <a href="https://apps.apple.com/app/wano-app/id6753104927">App Store</a>, or open <Link href="/get">wanoafrica.com/get</Link> on your phone and it takes you to the right store.</p> },
      { q: 'Wano uses a lot of my data. What can I do?', a: <p>Wano loads small pictures and compressed pages so most of your data goes on videos. Watching on Wi-Fi when you can saves the most. Our blog has <Link href="/post/how-to-save-mobile-data-android-iphone">a guide to saving mobile data</Link>.</p> },
    ],
  },
  {
    id: 'posting', title: 'Posting', items: [
      { q: 'What can I post?', a: <p>Videos and photo posts (one photo or several). Give each post a title of up to 24 characters; the description is optional. You can add a sound, trim your video and schedule posts for later.</p> },
      { q: 'How do I get more people to see my posts?', a: <ul><li>Post regularly, and try trending sounds and challenges.</li><li>Pick your city as your Home Ground so local viewers find you.</li><li>Our team picks the best videos every week for Wano Picks.</li><li>Share your Wano page: <code>wanoafrica.com/@yourusername</code> works as a link in bio.</li></ul> },
      { q: 'My video won’t upload', a: <p>Check you have a steady connection, keep the app open until the upload finishes, and make sure you have the latest version from your app store. If it still fails, <Link href="/contact">contact us</Link> with your username and phone model.</p> },
    ],
  },
  {
    id: 'creator-payments', title: 'Creator payments and partnerships', items: [
      { q: 'Does Wano pay me for joining or posting?', a: <p>No. Joining Wano, uploading content, or reaching a follower milestone does not automatically qualify you for payment. Build your presence through consistent original posts and genuine engagement with your audience on Wano.</p> },
      { q: 'How does Wano choose creators for paid partnerships?', a: <p>We consider creators with an established, active presence on Wano. We look at original content, consistency, authentic engagement, and suitability for a specific campaign. Selection also depends on available opportunities and budget. These criteria do not guarantee selection or future payment. Any paid collaboration is agreed separately before work begins.</p> },
      { q: 'Do I have to apply to start creating?', a: <p>No. Create a free account in the app to start posting. The <Link href="/creators#Download">creator enquiry form</Link> is for support and potential collaborations.</p> },
      { q: 'Do rankings and creator badges qualify me for payment?', a: <p>No. Home Ground rankings and creator badges recognise activity and achievements on Wano. They do not automatically qualify you for payment or a paid partnership.</p> },
    ],
  },
  {
    id: 'tv', title: 'Wano TV', items: [
      { q: 'What is Wano TV?', a: <p>A free home for African films, documentaries and series, inside the Wano app. <Link href="/tv">See what&apos;s on</Link>.</p> },
      { q: 'How do I submit my film?', a: <p>Use the <Link href="/tv/submit">submission form</Link>. Submitting is free and your film stays yours. You&apos;ll get a reference that starts with WTV-.</p> },
      { q: 'How do I check on my submission?', a: <p>Go to <Link href="/tv/status">wanoafrica.com/tv/status</Link> and type your reference and email.</p> },
      { q: 'Can I get a reminder when new films arrive?', a: <p>Yes: join the mailing list at the bottom of the <Link href="/tv">Wano TV page</Link>.</p> },
    ],
  },
  {
    id: 'badges', title: 'Home Ground, charts and badges', items: [
      { q: 'What is Home Ground?', a: <p>The city you represent on Wano. Cities compete every week, and each city has its own board of top creators. <Link href="/trending">See this week&apos;s charts</Link>.</p> },
      { q: 'How do creator badges work?', a: <ul><li><strong>Rising</strong> at 1,000 followers, <strong>Star</strong> at 10,000, <strong>Gold</strong> at 100,000 and <strong>Legend</strong> at 1,000,000.</li><li>Weekly badges for finishing in a Top 10 and for posting streaks.</li></ul> },
      { q: 'How are the charts worked out?', a: <p>From views, likes, comments and shares on posts made that week. The board resets every Monday, so everyone starts the week at zero.</p> },
    ],
  },
  {
    id: 'messages', title: 'Messages', items: [
      { q: 'Who can message me?', a: <p>People you both follow can message each other freely. Messages from anyone else go to Requests, where you decide whether to reply. Accounts of people under 18 can&apos;t send or receive messages.</p> },
    ],
  },
  {
    id: 'safety', title: 'Safety', items: [
      { q: 'Where can I read Wano’s community rules?', a: <p>Read our <Link href="/community-guidelines">Community Guidelines</Link> for content rules, reporting and review information, and creator expectations.</p> },
      { q: 'How do I report a post, message or account?', a: <p>Tap the three dots on the post, message or profile and choose Report. Our team reviews every report. You can also block an account from its profile.</p> },
      { q: 'What isn’t allowed on Wano?', a: <ul><li>Nudity and sexual content</li><li>Hate, harassment and bullying</li><li>Violence, threats and dangerous acts</li><li>Scams, spam and impersonation</li><li>Content you don&apos;t have the rights to</li></ul> },
      { q: 'How old do I need to be?', a: <p>At least 13. Accounts of people under 18 have extra protections: no messages, and their names and faces never appear on our public web pages.</p> },
    ],
  },
  {
    id: 'account', title: 'Your account and data', items: [
      { q: 'How do I delete my account?', a: <p>In the app: <strong>Profile → Settings → Delete Account</strong>. If you can&apos;t open the app, <Link href="/help/delete-account">ask us to delete it</Link>.</p> },
      { q: 'What do you do with my data?', a: <p>See our <Link href="/privacy">Privacy Policy</Link>.</p> },
    ],
  },
]

export default function Page() {
  return (
    <section className={s.page}>
      <div className={`container ${s.narrow}`}>
        <p className={s.eyebrow}>Help centre</p>
        <h1 className={s.h1}>How can we help?</h1>
        <nav className={s.toc}>
          {sections.map((x) => <a key={x.id} href={`#${x.id}`} className={s.tab}>{x.title}</a>)}
        </nav>
        {sections.map((x) => (
          <div key={x.id} id={x.id}>
            <h2 className={s.h2}>{x.title}</h2>
            <div className={s.faq}>
              {x.items.map((i) => (
                <details key={i.q}><summary>{i.q}</summary>{i.a}</details>
              ))}
            </div>
          </div>
        ))}
        <div className={s.band} style={{ marginTop: 50 }}>
          <h3>Still stuck?</h3>
          <p className={s.text}>Send us a message and we&apos;ll reply by email.</p>
          <Link className={s.btn} href="/contact">Contact us</Link>
        </div>
      </div>
    </section>
  )
}

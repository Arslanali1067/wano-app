import type { Metadata } from 'next'
import Link from 'next/link'
import s from '@/components/Site.module.css'

export const metadata: Metadata = {
  title: 'Community Guidelines',
  description: 'Wano’s community rules for safe, respectful and authentic creation, including content rights, privacy, AI, promotions and creator partnerships.',
  alternates: { canonical: '/community-guidelines' },
}

const sections = [
  {
    "id": "rights",
    "title": "Share content you have the right to use",
    "paragraphs": [
      "Post your own work, or content you have permission or another valid right to use.",
      "You can share your own original content on Wano even if you previously posted it on another platform.",
      "Do not take someone else’s videos, photographs, music, or other work and present it as your own.",
      "Giving credit, adding a watermark, or making small edits does not by itself give you permission.",
      "For remixes, reactions, commentary, and licensed material, make sure your use respects the applicable rights and permissions.",
      "Music available for use within an app may have limits, especially for advertising or use outside that app."
    ]
  },
  {
    "id": "respect",
    "title": "Respect people and cultures",
    "paragraphs": [
      "Different opinions, languages, traditions, and experiences belong on Wano. Disagreement is welcome; abuse is not.",
      "Do not threaten, bully, sexually harass, or encourage others to target someone. Do not promote hatred or attack people because of characteristics such as ethnicity, tribe, race, nationality, religion, disability, sex, gender, or sexual orientation.",
      "Criticism, satire, and discussion of public issues should not become threats, targeted harassment, or calls for violence."
    ]
  },
  {
    "id": "privacy",
    "title": "Protect children and personal privacy",
    "paragraphs": [
      "Do not post, request, promote, or share content involving child sexual abuse, exploitation, grooming, or sexualization.",
      "Do not share intimate images without consent, threaten to share them, or create sexualized images of someone without their consent.",
      "Respect other people’s privacy. Do not expose private addresses, phone numbers, passwords, identity documents, or other sensitive information without authorization. Take particular care when sharing content involving children or vulnerable people."
    ]
  },
  {
    "id": "safety",
    "title": "Keep the community safe",
    "paragraphs": [
      "Do not use Wano to threaten violence, encourage serious harm, promote violent extremist activity, or instruct people to carry out dangerous acts that could cause serious injury.",
      "Content that encourages or glorifies suicide, self-harm, or eating disorders is not allowed. Supportive conversations and recovery stories should avoid graphic details or instructions that could put others at risk.",
      "Do not share graphic violence for shock, entertainment, or celebration of suffering. News, documentary, educational, and awareness content requires care and sufficient context; describing something as educational does not automatically make it acceptable.",
      "Sexually explicit content and sexual solicitation are not allowed. Cultural, artistic, health, or educational context will be considered, but does not excuse exploitation or abuse."
    ]
  },
  {
    "id": "authenticity",
    "title": "Be authentic and build genuine connections",
    "paragraphs": [
      "Do not use scams, deceptive offers, impersonation, or misleading claims to exploit people.",
      "Do not buy or sell fake followers, views, likes, or comments, or coordinate activity intended to manipulate Wano’s rankings or partnership decisions.",
      "Avoid repetitive spam, unwanted commercial messages, and deceptive links. Legitimate businesses and creators can promote their work when they do so honestly and respectfully.",
      "Do not organize false reports or harassment against another creator."
    ]
  },
  {
    "id": "ai",
    "title": "Use AI and editing responsibly",
    "paragraphs": [
      "Animation, visual effects, and AI-assisted storytelling can be part of creative expression on Wano. They must still follow these guidelines and respect other people’s rights.",
      "Clearly disclose realistic AI-generated or materially altered content when viewers could reasonably mistake it for a real person, statement, or event.",
      "Do not use synthetic media to deceive people, impersonate someone harmfully, create non-consensual sexual imagery, or spread false claims likely to cause serious harm. An AI label does not make prohibited content acceptable."
    ]
  },
  {
    "id": "promotions",
    "title": "Be transparent about promotions",
    "paragraphs": [
      "Make it clear when content includes a paid promotion, sponsorship, affiliate relationship, or a product or service received in exchange for coverage.",
      "Promotional claims must be honest. Do not advertise scams, illegal goods or services, or dangerous activities.",
      "A sponsorship or paid partnership does not exempt anyone from Wano’s community rules."
    ]
  },
  {
    "id": "decisions",
    "title": "Understand how content decisions work",
    "paragraphs": [
      "Wano may remove content, restrict access or features, or suspend accounts when content or behavior violates its rules. Serious violations may lead to immediate action.",
      "Context matters. Language, cultural meaning, consent, public interest, and the risk of harm can affect a decision. Being reported does not by itself establish that someone broke a rule.",
      "To report content or an account, use the reporting option in the app. You can also block accounts you do not want to interact with."
    ]
  },
  {
    "id": "partnerships",
    "title": "Build your presence before seeking a paid partnership",
    "paragraphs": [
      "Start by sharing original content and building genuine connections on Wano.",
      "For paid creator partnerships, we consider your contributions and activity on Wano, content quality, authentic audience engagement, compliance with our community rules, and suitability for an available campaign.",
      "Follower counts alone do not determine selection. An audience on another platform can provide context, but does not replace building an active presence on Wano.",
      "Joining, posting, applying, earning a badge, or reaching a follower milestone does not guarantee promotion, audience growth, a partnership, or payment. Opportunities depend on campaign needs and available budget.",
      "Any paid collaboration, deliverables, and payment terms are agreed separately before work begins. Those agreed terms govern the work and payment."
    ]
  }
]

export default function CommunityGuidelinesPage() {
  return (
    <section className={s.page}>
      <div className={`container ${s.narrow}`}>
        <h1 className={s.h1}>Wano Community Guidelines</h1>
        <p className={s.text}>Effective November 26, 2026</p>
        <p className={s.lead}><strong>Your stories. Our shared community.</strong></p>
        <p className={s.text}>Wano brings together people, cultures, and perspectives across Africa, the diaspora, and beyond. Share your creativity, express yourself, and help build a community where people feel safe and respected.</p>
        <p className={s.text}>These guidelines apply to videos, photos, sounds, profiles, comments, and messages. They apply to everyone, including creators, businesses, advertisers, and Wano’s own channels.</p>
        <nav className={s.toc} aria-label="Guidelines sections">
          {sections.map(section => <a className={s.tab} key={section.id} href={`#${section.id}`}>{section.title}</a>)}
        </nav>
        {sections.map((section, index) => (
          <section key={section.id} aria-labelledby={section.id}>
            <h2 id={section.id} className={s.h2} style={{ scrollMarginTop: 110 }}>{index + 1}. {section.title}</h2>
            {section.paragraphs.map(paragraph => <p className={s.text} key={paragraph}>{paragraph}</p>)}
            {section.id === 'decisions' && <p className={s.text}>If you believe Wano made a mistake, contact us through the <Link href="/help">Help Centre</Link> or <Link href="/contact">Contact page</Link>. Include your Wano username, the affected content or decision, and why you believe it should be reviewed. Never send your password or sign-in codes.</p>}
          </section>
        ))}
        <h2 className={s.h2}>Before you post</h2>
        <p className={s.text}><strong>Share work you have the right to use. Respect people and cultures. Protect privacy. Be honest about promotions and realistic AI content. Build genuine connections.</strong></p>
        <p className={s.text}>These guidelines may change as Wano grows. Material updates will be identified on this page.</p>
      </div>
    </section>
  )
}

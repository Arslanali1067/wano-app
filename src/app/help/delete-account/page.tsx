import type { Metadata } from 'next'
import s from '@/components/Site.module.css'
import SiteForm from '@/components/SiteForm'

export const metadata: Metadata = {
  title: 'Delete your Wano account',
  description: 'How to delete your Wano account and its data, in the app or by asking us.',
  alternates: { canonical: '/help/delete-account' },
}

export default function Page() {
  return (
    <section className={s.page}>
      <div className={`container ${s.narrow}`}>
        <p className={s.eyebrow}>Help centre</p>
        <h1 className={s.h1}>Delete your Wano account</h1>
        <h2 className={s.h3}>The quickest way: in the app</h2>
        <p className={s.text}>Open Wano, go to <strong>Profile → Settings → Delete Account</strong> and confirm.</p>
        <h2 className={s.h3}>What gets deleted</h2>
        <p className={s.text}>
          Your profile, posts, comments, likes, follows and messages are removed, and you won&apos;t be able to log back in.
          We may keep a small amount of information for a limited time where the law requires it or to prevent fraud and abuse,
          as described in our <a href="/privacy">Privacy Policy</a>.
        </p>
        <h2 className={s.h3}>Can&apos;t open the app? Ask us</h2>
        <p className={s.text}>
          Tell us which account it is. To protect you, we&apos;ll check the request comes from the account&apos;s owner by
          writing to you before we delete anything.
        </p>
        <SiteForm
          endpoint="/api/account-deletion"
          submitLabel="Request deletion"
          done="We have your request and will email you to confirm it's your account."
          fields={[
            { name: 'account', label: 'Your Wano username, or the email or phone number on the account', required: true, max: 120 },
            { name: 'email', label: 'Email we can reach you on', type: 'email', required: true, max: 254 },
            { name: 'reason', label: 'Anything you want to tell us (optional)', type: 'textarea', max: 1000 },
          ]}
        />
      </div>
    </section>
  )
}

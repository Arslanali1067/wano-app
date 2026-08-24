
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Read the WANO Privacy Policy to understand how we collect, protect, and use your personal information.',
  alternates: {
    canonical: '/privacy',
  },
}

export default function PrivacyPage() {
  return (
    <>
      {/* Page header (same style as Contact) */}
      <section className="section padding-section">
        <div className="container" style={{ textAlign: 'center' }}>
          <h1>Privacy Policy</h1>
          <p style={{ marginTop: 8, fontSize: 14, opacity: 0.8 }}>
            Last updated: February 2026
          </p>
        </div>
      </section>

      {/* Privacy policy content */}
      <section className="section padding-section" style={{ marginBottom: 150 }}>
        <div
          className="container"
          style={{
            maxWidth: 800,
            margin: '0 auto',
            lineHeight: 1.6,
          }}
        >
          <p style={{ marginBottom: 16 }}>
            Wano (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is a global short-form video
            platform rooted in Afrocentric culture, connecting Africa, the Diaspora
            and communities worldwide. Your privacy is important to us, and this Privacy Policy
            explains how we collect, use, and protect your information when you use the Wano app and
            services.
          </p>
          <p style={{ marginBottom: 24 }}>
            By using Wano, you agree to the practices described in this policy.
          </p>

          <h3 style={{ marginTop: 24, marginBottom: 8, fontSize: 18, fontWeight: 600 }}>1. Information We Collect</h3>
          <p style={{ marginBottom: 16 }}>
            We collect information to provide, improve, and protect our platform.
          </p>

          <h3 style={{ marginTop: 24, marginBottom: 8, fontSize: 16, fontWeight: 600 }}>Information You Provide</h3>
          <p style={{ marginBottom: 8 }}>
            When you create an account or use Wano, you may provide:
          </p>
          <ul
            style={{
              marginTop: 0,
              marginBottom: 16,
              paddingLeft: '1.2em',
              color: 'var(--text-secondary)',
            }}
          >
            <li style={{ padding: '4px 0' }}>Name or username</li>
            <li style={{ padding: '4px 0' }}>Email address or phone number</li>
            <li style={{ padding: '4px 0' }}>Profile photo and bio</li>
            <li style={{ padding: '4px 0' }}>Videos, photos, captions, comments, and messages</li>
            <li style={{ padding: '4px 0' }}>Any information you submit through forms or support requests</li>
          </ul>

          <h3 style={{ marginTop: 24, marginBottom: 8, fontSize: 16, fontWeight: 600 }}>Information Collected Automatically</h3>
          <p style={{ marginBottom: 8 }}>When you use Wano, we may collect:</p>
          <ul
            style={{
              marginTop: 0,
              marginBottom: 16,
              paddingLeft: '1.2em',
              color: 'var(--text-secondary)',
            }}
          >
            <li style={{ padding: '4px 0' }}>Device information (model, operating system, IP address)</li>
            <li style={{ padding: '4px 0' }}>App usage and interaction data</li>
            <li style={{ padding: '4px 0' }}>Log files and crash reports</li>
            <li style={{ padding: '4px 0' }}>
              Location (approximate, based on IP — not precise GPS unless you allow it explicitly)
            </li>
          </ul>

          <h3 style={{ marginTop: 24, marginBottom: 8, fontSize: 16, fontWeight: 600 }}>Information from Third Parties</h3>
          <p style={{ marginBottom: 24 }}>
            If you sign in using a third-party service (like Google or Apple), we may receive basic
            profile information from them.
          </p>

          <h3 style={{ marginTop: 24, marginBottom: 8, fontSize: 18, fontWeight: 600 }}>2. How We Use Your Information</h3>
          <p style={{ marginBottom: 8 }}>We use your information to:</p>
          <ul
            style={{
              marginTop: 0,
              marginBottom: 16,
              paddingLeft: '1.2em',
              color: 'var(--text-secondary)',
            }}
          >
            <li style={{ padding: '4px 0' }}>Create and manage your account</li>
            <li style={{ padding: '4px 0' }}>Deliver and personalize content</li>
            <li style={{ padding: '4px 0' }}>Enable posting, messaging, and community features</li>
            <li style={{ padding: '4px 0' }}>Improve and optimize the Wano platform</li>
            <li style={{ padding: '4px 0' }}>Provide customer support</li>
            <li style={{ padding: '4px 0' }}>Communicate updates and important notices</li>
            <li style={{ padding: '4px 0' }}>Protect against fraud, abuse, and security threats</li>
          </ul>
          <p style={{ marginBottom: 24 }}>We do not sell your personal data.</p>

          <h3 style={{ marginTop: 24, marginBottom: 8, fontSize: 18, fontWeight: 600 }}>3. How Your Content Is Used</h3>
          <p style={{ marginBottom: 8 }}>When you upload videos, photos, or other content:</p>
          <ul
            style={{
              marginTop: 0,
              marginBottom: 16,
              paddingLeft: '1.2em',
              color: 'var(--text-secondary)',
            }}
          >
            <li style={{ padding: '4px 0' }}>You keep ownership of your content.</li>
            <li style={{ padding: '4px 0' }}>
              You give Wano permission to display, distribute, and promote it within the app and on
              our platform.
            </li>
          </ul>
          <p style={{ marginBottom: 24 }}>
            This allows us to show your content to other users and help you reach a wider audience.
            You can delete your content at any time.
          </p>

          <h3 style={{ marginTop: 24, marginBottom: 8, fontSize: 18, fontWeight: 600 }}>4. Sharing of Information</h3>
          <p style={{ marginBottom: 8 }}>We may share limited information with:</p>
          <ul
            style={{
              marginTop: 0,
              marginBottom: 16,
              paddingLeft: '1.2em',
              color: 'var(--text-secondary)',
            }}
          >
            <li style={{ padding: '4px 0' }}>
              Service providers who help run the app (hosting, analytics, email, etc.).
            </li>
            <li style={{ padding: '4px 0' }}>Law enforcement if required by law.</li>
            <li style={{ padding: '4px 0' }}>Partners only when necessary for platform functionality.</li>
          </ul>
          <p style={{ marginBottom: 24 }}>We never share your private messages publicly.</p>

          <h3 style={{ marginTop: 24, marginBottom: 8, fontSize: 18, fontWeight: 600 }}>5. Data Security</h3>
          <p style={{ marginBottom: 24 }}>
            We use technical and organizational safeguards to protect your data. While no system is
            100% secure, we work hard to protect your information from unauthorized access, loss, or
            misuse.
          </p>

          <h3 style={{ marginTop: 24, marginBottom: 8, fontSize: 18, fontWeight: 600 }}>6. Your Rights</h3>
          <p style={{ marginBottom: 8 }}>Depending on where you live, you may have the right to:</p>
          <ul
            style={{
              marginTop: 0,
              marginBottom: 16,
              paddingLeft: '1.2em',
              color: 'var(--text-secondary)',
            }}
          >
            <li style={{ padding: '4px 0' }}>Access your personal data</li>
            <li style={{ padding: '4px 0' }}>Request corrections</li>
            <li style={{ padding: '4px 0' }}>Delete your account and data</li>
            <li style={{ padding: '4px 0' }}>Withdraw consent</li>
          </ul>
          <p style={{ marginBottom: 24 }}>You can request this by contacting us.</p>

          <h3 style={{ marginTop: 24, marginBottom: 8, fontSize: 18, fontWeight: 600 }}>7. Children&apos;s Privacy</h3>
          <p style={{ marginBottom: 24 }}>
            Wano is not intended for users under 13. We do not knowingly collect data from
            children. If we learn that we have, we will delete it.
          </p>

          <h3 style={{ marginTop: 24, marginBottom: 8, fontSize: 18, fontWeight: 600 }}>8. International Users</h3>
          <p style={{ marginBottom: 24 }}>
            Wano is a global platform. By using it, you agree that your data may be processed and
            stored in different countries where our servers and partners operate.
          </p>

          <h3 style={{ marginTop: 24, marginBottom: 8, fontSize: 18, fontWeight: 600 }}>9. Changes to This Policy</h3>
          <p style={{ marginBottom: 24 }}>
            We may update this Privacy Policy from time to time. When we do, we will update the
            &quot;Last updated&quot; date and notify users if required.
          </p>

          <h3 style={{ marginTop: 24, marginBottom: 8, fontSize: 18, fontWeight: 600 }}>10. Contact Us</h3>
          <p style={{ marginBottom: 0 }}>
            If you have questions about this Privacy Policy or your data, contact us at:{' '}
            <a href="mailto:privacy@wanoafrica.com">privacy@wanoafrica.com</a>.
          </p>
        </div>
      </section>
    </>
  )
}


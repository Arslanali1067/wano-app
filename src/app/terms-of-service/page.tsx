export default function TermsOfServicePage() {
  return (
    <main>
      {/* Page header (same style as Contact/Privacy) */}
      <section className="section padding-section">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2>Terms of Service</h2>
          <p style={{ marginTop: 8, fontSize: 14, opacity: 0.8 }}>
            Last updated: February 2026
          </p>
        </div>
      </section>

      {/* Terms content */}
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
            These Terms of Service (&quot;Terms&quot;) govern your use of the Wano app and related
            services. By using Wano, you agree to be bound by these Terms.
          </p>

          <h6 style={{ marginTop: 24, marginBottom: 8 }}>1. Your Account</h6>
          <p style={{ marginBottom: 16 }}>
            You are responsible for maintaining the security of your account and for all activity
            that occurs under it. You must provide accurate information and notify us if you suspect
            unauthorized use of your account.
          </p>

          <h6 style={{ marginTop: 24, marginBottom: 8 }}>2. Use of the Service</h6>
          <p style={{ marginBottom: 16 }}>
            You agree to use Wano in compliance with applicable laws and our community guidelines.
            You will not use the service to post illegal, harmful, or infringing content, or to
            harass, abuse, or harm others.
          </p>

          <h6 style={{ marginTop: 24, marginBottom: 8 }}>3. Your Content</h6>
          <p style={{ marginBottom: 8 }}>
            You retain ownership of the content you create and share on Wano. By posting content,
            you grant Wano a worldwide, non-exclusive, royalty-free license to host, display, and
            distribute your content within the app and in connection with promoting the service.
          </p>

          <h6 style={{ marginTop: 24, marginBottom: 8 }}>4. Our Rights</h6>
          <p style={{ marginBottom: 16 }}>
            We may remove or restrict access to content that violates these Terms or our policies.
            We may also suspend or terminate accounts that repeatedly violate these Terms.
          </p>

          <h6 style={{ marginTop: 24, marginBottom: 8 }}>5. Service Changes</h6>
          <p style={{ marginBottom: 16 }}>
            We may update, change, or discontinue parts of the service at any time. Where required
            by law, we will provide notice of significant changes.
          </p>

          <h6 style={{ marginTop: 24, marginBottom: 8 }}>6. Limitation of Liability</h6>
          <p style={{ marginBottom: 16 }}>
            Wano is provided &quot;as is&quot; and &quot;as available.&quot; To the maximum extent
            permitted by law, we are not liable for indirect, incidental, or consequential damages
            arising from your use of the service.
          </p>

          <h6 style={{ marginTop: 24, marginBottom: 8 }}>7. Governing Law</h6>
          <p style={{ marginBottom: 16 }}>
            These Terms are governed by the laws of the jurisdiction in which Wano operates, without
            regard to conflict of law principles.
          </p>

          <h6 style={{ marginTop: 24, marginBottom: 8 }}>8. Changes to These Terms</h6>
          <p style={{ marginBottom: 16 }}>
            We may update these Terms from time to time. When we do, we will update the &quot;Last
            updated&quot; date and, where required, notify you of material changes.
          </p>

          <h6 style={{ marginTop: 24, marginBottom: 8 }}>9. Contact Us</h6>
          <p style={{ marginBottom: 0 }}>
            If you have questions about these Terms, you can contact us at{' '}
            <a href="mailto:legal@wanoafrica.com">legal@wanoafrica.com</a>.
          </p>
        </div>
      </section>
    </main>
  )
}


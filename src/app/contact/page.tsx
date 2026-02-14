import EasyAccessSection from '@/components/EasyAccessSection'
import CTASection from '@/components/CTASection'

export default function ContactPage() {
  return (
    <main>
      {/* Page header */}
      <section className="section padding-section">
        <div className="container" style={{ textAlign: 'center' }}>
          <h1>Contact Us</h1>
          <p>
            Have a question, partnership idea, or creator inquiry? Reach out and we&apos;ll get
            back to you.
          </p>
        </div>
      </section>

      {/* Left image / right contact form (contact-specific variant) */}
      <EasyAccessSection variant="contact" />

      {/* Contact emails boxes */}
      <section className="section padding-section">
        <div className="container">
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 24,
              justifyContent: 'space-between',
            }}
          >
            <div
              style={{
                border: '1px solid var(--border-light)',
                borderRadius: 12,
                padding: '16px 20px',
                backgroundColor: 'var(--background-light)',
                flex: 1,
                minWidth: 180,
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <span
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: '999px',
                  background:
                    'linear-gradient(135deg, rgba(115,189,140,0.3), rgba(227,128,40,0.3))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <span style={{ fontSize: 14 }}>✉️</span>
              </span>
              <p style={{ margin: 0 }}>
                <strong>For general inquiries:</strong>
                <br />
                <a href="mailto:hello@wanoafrica.com">inquiries@wanoafrica.com</a>
              </p>
            </div>
            <div
              style={{
                border: '1px solid var(--border-light)',
                borderRadius: 12,
                padding: '16px 20px',
                backgroundColor: 'var(--background-light)',
                flex: 1,
                minWidth: 180,
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <span
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: '999px',
                  background:
                    'linear-gradient(135deg, rgba(115,189,140,0.3), rgba(227,128,40,0.3))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <span style={{ fontSize: 14 }}>✉️</span>
              </span>
              <p style={{ margin: 0 }}>
                <strong>For partnerships:</strong>
                <br />
                <a href="mailto:partnerships@wanoafrica.com">partnerships@wanoafrica.com</a>
              </p>
            </div>
            <div
              style={{
                border: '1px solid var(--border-light)',
                borderRadius: 12,
                padding: '16px 20px',
                backgroundColor: 'var(--background-light)',
                flex: 1,
                minWidth: 180,
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <span
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: '999px',
                  background:
                    'linear-gradient(135deg, rgba(115,189,140,0.3), rgba(227,128,40,0.3))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <span style={{ fontSize: 14 }}>✉️</span>
              </span>
              <p style={{ margin: 0 }}>
                <strong>For creators:</strong>
                <br />
                <a href="mailto:creators@wanoafrica.com">creators@wanoafrica.com</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA + footer (footer comes from layout) */}
      <CTASection />
    </main>
  )
}


import Link from 'next/link'

export default function PageFooter() {
  return (
    <footer style={{
      background: '#0f0f1a',
      padding: '60px 0 32px',
      borderTop: '1px solid rgba(255,255,255,0.08)'
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 32px'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr',
          gap: '48px',
          marginBottom: '48px'
        }}>
          {/* Brand */}
          <div>
            <img
              src="/images/cosmicstar_logo_white__Blue_Ill.avif"
              alt="Cosmicstar"
              height="40"
              style={{ marginBottom: '20px' }}
            />
            <p style={{
              color: 'rgba(255,255,255,0.6)',
              fontSize: '14px',
              lineHeight: 1.7,
              maxWidth: '280px'
            }}>
              Your trusted partner for BIM solutions, training, and digital transformation in architecture and construction.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{
              color: '#fff',
              fontSize: '14px',
              fontWeight: 600,
              marginBottom: '20px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Quick Links
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Link href="/" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '14px' }}>Home</Link>
              <Link href="/training" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '14px' }}>Training</Link>
              <Link href="/webinars" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '14px' }}>Webinars</Link>
              <Link href="/offers" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '14px' }}>Offers</Link>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 style={{
              color: '#fff',
              fontSize: '14px',
              fontWeight: 600,
              marginBottom: '20px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Services
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>BIM Consulting</span>
              <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>Software Sales</span>
              <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>Corporate Training</span>
              <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>Technical Support</span>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{
              color: '#fff',
              fontSize: '14px',
              fontWeight: 600,
              marginBottom: '20px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Contact
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <a href="tel:+919342250117" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '14px' }}>
                +91 93422 50117
              </a>
              <a href="mailto:sathish@mycosmicstar.com" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '14px' }}>
                sathish@mycosmicstar.com
              </a>
              <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>Bangalore, India</span>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.1)',
          paddingTop: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <p style={{
            color: 'rgba(255,255,255,0.4)',
            fontSize: '13px',
            margin: 0
          }}>
            © 2025 Cosmicstar Technologies. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '24px' }}>
            <a href="https://www.linkedin.com/company/cosmicstar-technologies" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none', fontSize: '13px' }}>LinkedIn</a>
            <a href="https://www.youtube.com/@mycosmicstar" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none', fontSize: '13px' }}>YouTube</a>
            <a href="https://www.instagram.com/cosmicstar_technologies/" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none', fontSize: '13px' }}>Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

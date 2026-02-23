import ContactForm from '@/components/ContactForm'
import Link from 'next/link'

export const metadata = {
  title: 'Contact Cosmicstar Technology - Get in Touch with Us',
  description: 'Get in touch with Cosmicstar Technology for inquiries about our products and services, including Archicad, DigIQC, CADMATE, BIMx, and BIMcloud.',
}

export default function ContactPage() {
  return (
    <div className="contact-page">
      <nav className="contact-nav">
        <Link href="/" className="contact-logo">
          <img src="/images/cosmic_logo_-black-2.svg" alt="Cosmicstar" width="177" height="40" />
        </Link>
        <div className="nav-links">
          <Link href="/">Home</Link>
          <Link href="/product">Products</Link>
          <Link href="/services">Services</Link>
          <Link href="/training">Training</Link>
          <Link href="/contact" className="active">Contact</Link>
        </div>
      </nav>

      <main className="contact-main">
        <div className="contact-grid">
          <div className="contact-info">
            <h1>Contact Cosmicstar.</h1>
            <p>
              Feel free to reach out to us for any inquiries, collaborations, or if you just want to chat about architecture and design. We&#39;re here to assist you!
            </p>

            <div className="contact-details">
              <h3>Address</h3>
              <p>
                Cosmicstar Technologies & Co.<br />
                #3B, 3rd Floor, Esha Arcade,<br />
                No.26, 21st Main Road, Opp. To BDA Complex,<br />
                Banashankari 2nd Stage, Bangalore – 560070.
              </p>
              <p><strong>GST Number:</strong> 29AATFC4146Q1ZJ</p>

              <h3>Contact Person</h3>
              <p>
                <strong>Sathish Mathysekaran</strong><br />
                Phone: <a href="tel:+919342250117">+91 93422 50117</a><br />
                Email: <a href="mailto:sathish@mycosmicstar.com">sathish@mycosmicstar.com</a>
              </p>
            </div>
          </div>

          <div className="contact-form-section">
            <h2>Digital Architecture & Construction begins with us.</h2>
            <p className="form-subtitle">Fill out the form below, and we&#39;ll get back to you as soon as possible.</p>
            <ContactForm />
          </div>
        </div>
      </main>

      <footer className="contact-footer">
        <div className="footer-content">
          <img src="/images/cosmicstar_logo_white__Blue_Ill.avif" alt="Cosmicstar" width="200" />
          <div className="footer-info">
            <p>© 2025 Cosmicstar Technologies. All rights reserved</p>
            <div className="social-links">
              <a href="https://www.linkedin.com/company/cosmicstar-technologies" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href="https://www.youtube.com/@mycosmicstar" target="_blank" rel="noopener noreferrer">YouTube</a>
              <a href="https://www.instagram.com/cosmicstar_technologies/" target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href="https://www.facebook.com/profile.php?id=61558184286889" target="_blank" rel="noopener noreferrer">Facebook</a>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        .contact-page {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .contact-nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 2rem;
          background: white;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .contact-logo img {
          height: 40px;
          width: auto;
        }

        .nav-links {
          display: flex;
          gap: 2rem;
        }

        .nav-links a {
          color: #333;
          text-decoration: none;
          font-weight: 500;
        }

        .nav-links a:hover,
        .nav-links a.active {
          color: #0066cc;
        }

        .contact-main {
          flex: 1;
          padding: 4rem 2rem;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
        }

        .contact-grid {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
        }

        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .nav-links {
            display: none;
          }
        }

        .contact-info h1 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          color: #1a1a2e;
        }

        .contact-info p {
          color: #555;
          line-height: 1.8;
        }

        .contact-details {
          margin-top: 2rem;
        }

        .contact-details h3 {
          color: #1a1a2e;
          margin: 1.5rem 0 0.5rem;
          font-size: 1.1rem;
        }

        .contact-details a {
          color: #0066cc;
          text-decoration: none;
        }

        .contact-form-section {
          background: white;
          padding: 2rem;
          border-radius: 16px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.1);
        }

        .contact-form-section h2 {
          color: #1a1a2e;
          margin-bottom: 0.5rem;
        }

        .form-subtitle {
          color: #666;
          margin-bottom: 2rem;
        }

        .contact-form .field-wrapper {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .contact-form .text-field {
          width: 100%;
          padding: 12px 16px;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 1rem;
          transition: border-color 0.2s;
        }

        .contact-form .text-field:focus {
          outline: none;
          border-color: #0066cc;
        }

        .contact-form .form-button {
          width: 100%;
          padding: 14px;
          background: #0066cc;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }

        .contact-form .form-button:hover {
          background: #0052a3;
        }

        .contact-form .form-button:disabled {
          background: #ccc;
          cursor: not-allowed;
        }

        .contact-footer {
          background: #1a1a2e;
          padding: 2rem;
        }

        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .footer-info {
          color: white;
          text-align: right;
        }

        .footer-info p {
          margin-bottom: 0.5rem;
        }

        .social-links {
          display: flex;
          gap: 1rem;
        }

        .social-links a {
          color: #aaa;
          text-decoration: none;
          font-size: 0.9rem;
        }

        .social-links a:hover {
          color: white;
        }
      `}</style>
    </div>
  )
}

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/training', label: 'Training' },
  { href: '/webinars', label: 'Webinars' },
  { href: '/offers', label: 'Offers' },
  { href: '/contact', label: 'Contact' },
]

interface PageNavbarProps {
  transparent?: boolean
}

export default function PageNavbar({ transparent = false }: PageNavbarProps) {
  const pathname = usePathname()

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      background: transparent ? 'rgba(26, 26, 46, 0.95)' : '#fff',
      backdropFilter: 'blur(12px)',
      borderBottom: transparent ? 'none' : '1px solid #eee',
      padding: '0',
      zIndex: 1000,
      boxShadow: transparent ? 'none' : '0 2px 20px rgba(0,0,0,0.06)'
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 32px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '72px'
      }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={transparent ? '/images/cosmicstar_logo_white__Blue_Ill.avif' : '/images/cosmic_logo_-black-2.svg'}
            alt="Cosmicstar"
            height="38"
            style={{ objectFit: 'contain' }}
          />
        </Link>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            const isContact = link.href === '/contact'

            if (isContact) {
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    padding: '10px 24px',
                    background: '#0066cc',
                    color: '#fff',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    fontSize: '14px',
                    fontWeight: 600,
                    marginLeft: '16px',
                    transition: 'background 0.2s'
                  }}
                >
                  {link.label}
                </Link>
              )
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  padding: '10px 18px',
                  color: isActive
                    ? '#0066cc'
                    : transparent
                      ? 'rgba(255,255,255,0.85)'
                      : '#444',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: isActive ? 600 : 500,
                  borderRadius: '8px',
                  background: isActive
                    ? transparent
                      ? 'rgba(0,102,204,0.15)'
                      : 'rgba(0,102,204,0.08)'
                    : 'transparent',
                  transition: 'all 0.2s'
                }}
              >
                {link.label}
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}

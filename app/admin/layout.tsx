'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import LogoutButton from '@/components/admin/LogoutButton'
import AuthGuard from '@/components/admin/AuthGuard'
import './admin.css'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isLoginPage = pathname === '/admin/login'

  return (
    <AuthGuard>
      {isLoginPage ? (
        children
      ) : (
        <div className="admin-layout">
          <aside className="admin-sidebar">
            <div className="admin-logo">
              <Link href="/admin">
                <img src="/images/cosmic_logo_-black-2.svg" alt="Cosmicstar" width="150" />
              </Link>
            </div>
            <nav className="admin-nav">
              <Link href="/admin" className="admin-nav-link">Dashboard</Link>
              <Link href="/admin/training" className="admin-nav-link">Training</Link>
              <Link href="/admin/webinars" className="admin-nav-link">Webinars</Link>
              <Link href="/admin/offers" className="admin-nav-link">Offers</Link>
              <Link href="/admin/leads" className="admin-nav-link">Leads</Link>
            </nav>
            <div className="admin-sidebar-footer">
              <Link href="/" className="admin-nav-link">View Site</Link>
              <LogoutButton />
            </div>
          </aside>
          <main className="admin-main">
            {children}
          </main>
        </div>
      )}
    </AuthGuard>
  )
}

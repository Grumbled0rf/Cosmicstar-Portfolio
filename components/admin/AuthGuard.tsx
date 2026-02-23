'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Skip auth check on login page
    if (pathname === '/admin/login') {
      setIsLoading(false)
      setIsAuthenticated(true) // Allow login page to render
      return
    }

    let isMounted = true

    const verifyAdmin = async (email: string | undefined) => {
      if (!email) return false

      try {
        const { data: adminUser, error: adminError } = await supabase
          .from('admin_users')
          .select('email, role')
          .eq('email', email)
          .single()

        console.log('Admin verification:', { adminUser, error: adminError })
        return !adminError && adminUser
      } catch (error) {
        console.error('Admin verification error:', error)
        return false
      }
    }

    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state change:', { event, hasSession: !!session, email: session?.user?.email })

      if (!isMounted) return

      if (event === 'SIGNED_OUT' || !session) {
        setIsAuthenticated(false)
        setIsLoading(false)
        if (event === 'SIGNED_OUT') {
          router.replace('/admin/login')
        }
        return
      }

      // For INITIAL_SESSION or SIGNED_IN, verify admin status
      if (event === 'INITIAL_SESSION' || event === 'SIGNED_IN') {
        const isAdmin = await verifyAdmin(session.user?.email)

        if (!isMounted) return

        if (isAdmin) {
          console.log('Auth successful - user is admin')
          setIsAuthenticated(true)
        } else {
          console.log('Not an admin, signing out')
          await supabase.auth.signOut()
          router.replace('/admin/login')
        }
        setIsLoading(false)
      }
    })

    // Get initial session
    const initAuth = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession()
        console.log('Initial session check:', { hasSession: !!session, email: session?.user?.email, error: sessionError })

        if (!isMounted) return

        if (!session) {
          console.log('No session found, redirecting to login')
          setIsLoading(false)
          router.replace('/admin/login')
          return
        }

        // Session exists, verify admin
        const isAdmin = await verifyAdmin(session.user?.email)

        if (!isMounted) return

        if (isAdmin) {
          console.log('Initial auth successful')
          setIsAuthenticated(true)
        } else {
          console.log('Initial check: Not an admin')
          await supabase.auth.signOut()
          router.replace('/admin/login')
        }
        setIsLoading(false)
      } catch (error) {
        console.error('Auth init error:', error)
        if (isMounted) {
          setIsLoading(false)
          router.replace('/admin/login')
        }
      }
    }

    initAuth()

    return () => {
      isMounted = false
      subscription.unsubscribe()
    }
  }, [pathname, router])

  // Show loading on non-login pages while checking auth
  if (pathname !== '/admin/login' && isLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: '#f5f5f5'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div>Loading...</div>
        </div>
      </div>
    )
  }

  // On login page, always render children
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  // On other admin pages, only render if authenticated
  if (!isAuthenticated) {
    return null
  }

  return <>{children}</>
}

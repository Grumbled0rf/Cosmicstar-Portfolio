'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      console.log('Attempting login for:', email)

      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      console.log('Login response:', {
        user: data?.user?.email,
        session: !!data?.session,
        error: authError
      })

      if (authError) {
        setError(authError.message)
        setLoading(false)
        return
      }

      if (data.user && data.session) {
        // Check if user is admin before redirecting
        const { data: adminUser, error: adminError } = await supabase
          .from('admin_users')
          .select('email, role')
          .eq('email', data.user.email)
          .single()

        console.log('Admin check:', { adminUser, error: adminError })

        if (adminError || !adminUser) {
          await supabase.auth.signOut()
          setError('You are not authorized to access the admin panel')
          setLoading(false)
          return
        }

        // Verify session is stored before redirecting
        const { data: sessionCheck } = await supabase.auth.getSession()
        console.log('Session verification before redirect:', {
          hasSession: !!sessionCheck?.session,
          email: sessionCheck?.session?.user?.email
        })

        // Success - redirect to admin with small delay to ensure cookie is set
        console.log('Login successful, redirecting after session verification...')
        setTimeout(() => {
          router.push('/admin')
        }, 100)
      } else {
        setError('Login failed. Please try again.')
        setLoading(false)
      }
    } catch (err) {
      console.error('Login error:', err)
      setError('An unexpected error occurred')
      setLoading(false)
    }
  }

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        <div className="admin-login-title">
          <div className="admin-login-logo">
            <img src="/images/cosmic_logo_-black-2.svg" alt="Cosmicstar" width="180" />
          </div>
          <h1>Admin Login</h1>
        </div>

        <form onSubmit={handleSubmit} className="admin-form">
          {error && (
            <div style={{
              padding: '12px',
              background: '#f8d7da',
              color: '#721c24',
              borderRadius: '8px',
              marginBottom: '20px'
            }}>
              {error}
            </div>
          )}

          <div className="admin-form-group">
            <label className="admin-form-label" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="admin-form-input"
              required
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="admin-form-input"
              required
            />
          </div>

          <button
            type="submit"
            className="admin-btn"
            style={{ width: '100%' }}
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}

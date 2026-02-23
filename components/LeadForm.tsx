'use client'

import { useState } from 'react'

interface LeadFormProps {
  formType: 'training' | 'webinar' | 'offer' | 'contact'
  sourcePage: string
  title?: string
  subtitle?: string
  buttonText?: string
  showCompany?: boolean
  showMessage?: boolean
  showIiaId?: boolean
  offerSlug?: string
  variant?: 'light' | 'dark' | 'card'
}

export default function LeadForm({
  formType,
  sourcePage,
  title = 'Get Started Today',
  subtitle = 'Fill out the form and we will get back to you shortly.',
  buttonText = 'Submit',
  showCompany = true,
  showMessage = false,
  showIiaId = false,
  offerSlug,
  variant = 'card'
}: LeadFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    iia_id: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          form_type: formType,
          source_page: sourcePage,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company || null,
          iia_id: formData.iia_id || null,
          message: formData.message || null,
          metadata: offerSlug ? { offer_slug: offerSlug } : null
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Failed to submit form')
        setLoading(false)
        return
      }

      setSuccess(true)
      setFormData({ name: '', email: '', phone: '', company: '', iia_id: '', message: '' })
    } catch (err) {
      console.error('Form submission error:', err)
      setError('Failed to submit form. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const isDark = variant === 'dark'
  const isCard = variant === 'card'

  const containerStyle: React.CSSProperties = isCard ? {
    background: '#fff',
    borderRadius: '16px',
    padding: '32px',
    boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
  } : {
    background: isDark ? 'rgba(255,255,255,0.1)' : 'transparent',
    borderRadius: '16px',
    padding: isDark ? '32px' : '0'
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '14px 16px',
    border: isDark ? '1px solid rgba(255,255,255,0.2)' : '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '15px',
    background: isDark ? 'rgba(255,255,255,0.1)' : '#fff',
    color: isDark ? '#fff' : '#333',
    transition: 'border-color 0.2s, box-shadow 0.2s'
  }

  const labelStyle: React.CSSProperties = {
    display: 'block',
    marginBottom: '6px',
    fontSize: '14px',
    fontWeight: 500,
    color: isDark ? 'rgba(255,255,255,0.9)' : '#333'
  }

  if (success) {
    return (
      <div style={containerStyle}>
        <div style={{
          textAlign: 'center',
          padding: '40px 20px'
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: '#10b981',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
            fontSize: '28px',
            color: '#fff'
          }}>
            ✓
          </div>
          <h3 style={{
            fontSize: '24px',
            marginBottom: '12px',
            color: isDark ? '#fff' : '#1a1a2e'
          }}>
            Thank You!
          </h3>
          <p style={{
            color: isDark ? 'rgba(255,255,255,0.7)' : '#666',
            marginBottom: '24px'
          }}>
            Your request has been received. We will contact you shortly.
          </p>
          <button
            onClick={() => setSuccess(false)}
            style={{
              padding: '12px 24px',
              background: '#0066cc',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 600
            }}
          >
            Submit Another
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={containerStyle}>
      {title && (
        <h3 style={{
          fontSize: '24px',
          marginBottom: '8px',
          color: isDark ? '#fff' : '#1a1a2e'
        }}>
          {title}
        </h3>
      )}
      {subtitle && (
        <p style={{
          color: isDark ? 'rgba(255,255,255,0.7)' : '#666',
          marginBottom: '24px',
          fontSize: '15px'
        }}>
          {subtitle}
        </p>
      )}

      {error && (
        <div style={{
          padding: '12px 16px',
          background: '#fee2e2',
          color: '#dc2626',
          borderRadius: '8px',
          marginBottom: '16px',
          fontSize: '14px'
        }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gap: '16px' }}>
          <div>
            <label style={labelStyle}>Full Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
              style={inputStyle}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={labelStyle}>Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Phone *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 XXXXX XXXXX"
                required
                style={inputStyle}
              />
            </div>
          </div>

          {showCompany && (
            <div>
              <label style={labelStyle}>Company / Organization</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Your company name"
                style={inputStyle}
              />
            </div>
          )}

          {showIiaId && (
            <div>
              <label style={labelStyle}>IIA Membership ID</label>
              <input
                type="text"
                name="iia_id"
                value={formData.iia_id}
                onChange={handleChange}
                placeholder="Enter your IIA ID"
                style={inputStyle}
              />
            </div>
          )}

          {showMessage && (
            <div>
              <label style={labelStyle}>Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your requirements..."
                rows={4}
                style={{ ...inputStyle, resize: 'vertical' }}
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '16px',
              background: loading ? '#94a3b8' : '#0066cc',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 600,
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background 0.2s',
              marginTop: '8px'
            }}
          >
            {loading ? 'Submitting...' : buttonText}
          </button>
        </div>
      </form>
    </div>
  )
}

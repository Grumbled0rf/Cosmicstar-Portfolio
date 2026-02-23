'use client'

import { useState } from 'react'

interface ContactFormProps {
  className?: string
  onSuccess?: () => void
}

const serviceOptions = [
  { value: 'Software Purchase', label: 'Software Purchase' },
  { value: 'Professional Design Services', label: 'Professional Design Services' },
  { value: 'Comprehensive Training Programs', label: 'Comprehensive Training Programs' },
  { value: 'Get Free Demo', label: 'Get Free Demo' },
]

export default function ContactForm({ className = '', onSuccess }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    service: 'Software Purchase',
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          form_type: 'contact',
          source_page: '/contact',
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          metadata: {
            service_interest: formData.service,
            message: formData.message,
          }
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Failed to submit form')
        setLoading(false)
        return
      }

      setSuccess(true)
      setFormData({
        name: '',
        company: '',
        phone: '',
        email: '',
        service: 'Software Purchase',
        message: '',
      })
      onSuccess?.()
    } catch (err) {
      console.error('Form submission error:', err)
      setError('Failed to submit form. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className={`contact-form-success ${className}`}>
        <div style={{
          padding: '2rem',
          textAlign: 'center',
          background: '#d4edda',
          borderRadius: '8px',
          color: '#155724'
        }}>
          <h3 style={{ marginBottom: '0.5rem' }}>Thank you!</h3>
          <p>Your submission has been received. We&#39;ll get back to you soon.</p>
          <button
            onClick={() => setSuccess(false)}
            style={{
              marginTop: '1rem',
              padding: '0.5rem 1rem',
              background: '#155724',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Submit Another
          </button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={`contact-form ${className}`}>
      {error && (
        <div style={{
          padding: '12px',
          background: '#f8d7da',
          color: '#721c24',
          borderRadius: '8px',
          marginBottom: '1rem'
        }}>
          {error}
        </div>
      )}

      <div className="field-wrapper">
        <div className="field-block">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            required
            className="text-field w-input"
          />
        </div>

        <div className="field-block">
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Company name"
            className="text-field w-input"
          />
        </div>

        <div className="field-block">
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Your mobile number"
            required
            className="text-field w-input"
          />
        </div>

        <div className="field-block">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your email ID"
            required
            className="text-field w-input"
          />
        </div>

        <select
          name="service"
          value={formData.service}
          onChange={handleChange}
          required
          className="text-field w-select"
        >
          {serviceOptions.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>

        <div className="field-block">
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your message (optional)"
            rows={4}
            className="text-field w-input"
            style={{ resize: 'vertical' }}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="form-button w-button"
      >
        {loading ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  )
}

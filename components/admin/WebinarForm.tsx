'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { Webinar, FeatureItem, FAQItem } from '@/lib/types'

interface WebinarFormProps {
  webinar?: Webinar
  action: (formData: FormData) => Promise<void>
  isEdit?: boolean
}

export default function WebinarForm({ webinar, action, isEdit = false }: WebinarFormProps) {
  const formRef = useRef<HTMLFormElement>(null)
  const [features, setFeatures] = useState<FeatureItem[]>(webinar?.features || [])
  const [faqs, setFaqs] = useState<FAQItem[]>(webinar?.faq || [])

  const addFeature = () => {
    setFeatures([...features, { title: '', description: '' }])
  }

  const updateFeature = (index: number, field: keyof FeatureItem, value: string) => {
    const updated = [...features]
    updated[index] = { ...updated[index], [field]: value }
    setFeatures(updated)
  }

  const removeFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index))
  }

  const addFaq = () => {
    setFaqs([...faqs, { question: '', answer: '' }])
  }

  const updateFaq = (index: number, field: keyof FAQItem, value: string) => {
    const updated = [...faqs]
    updated[index] = { ...updated[index], [field]: value }
    setFaqs(updated)
  }

  const removeFaq = (index: number) => {
    setFaqs(faqs.filter((_, i) => i !== index))
  }

  const handleSubmit = async (formData: FormData) => {
    formData.set('features', JSON.stringify(features.filter(f => f.title)))
    formData.set('faq', JSON.stringify(faqs.filter(f => f.question && f.answer)))
    await action(formData)
  }

  return (
    <form ref={formRef} action={handleSubmit} className="admin-form">
      <div className="admin-form-group">
        <label className="admin-form-label">Title *</label>
        <input
          type="text"
          name="title"
          defaultValue={webinar?.title || ''}
          required
          className="admin-form-input"
          placeholder="Enter webinar title"
        />
      </div>

      <div className="admin-form-group">
        <label className="admin-form-label">Subtitle</label>
        <input
          type="text"
          name="subtitle"
          defaultValue={webinar?.subtitle || ''}
          className="admin-form-input"
          placeholder="Enter subtitle"
        />
      </div>

      <div className="admin-form-group">
        <label className="admin-form-label">Description</label>
        <textarea
          name="description"
          defaultValue={webinar?.description || ''}
          className="admin-form-textarea"
          placeholder="Enter webinar description"
          rows={4}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div className="admin-form-group">
          <label className="admin-form-label">Event Date</label>
          <input
            type="date"
            name="event_date"
            defaultValue={webinar?.event_date || ''}
            className="admin-form-input"
          />
        </div>

        <div className="admin-form-group">
          <label className="admin-form-label">Event Time</label>
          <input
            type="text"
            name="event_time"
            defaultValue={webinar?.event_time || ''}
            className="admin-form-input"
            placeholder="6.00 PM Onwards"
          />
        </div>
      </div>

      <div className="admin-form-group">
        <label className="admin-form-label">Venue Name</label>
        <input
          type="text"
          name="venue_name"
          defaultValue={webinar?.venue_name || ''}
          className="admin-form-input"
          placeholder="Enter venue name"
        />
      </div>

      <div className="admin-form-group">
        <label className="admin-form-label">Venue Address</label>
        <textarea
          name="venue_address"
          defaultValue={webinar?.venue_address || ''}
          className="admin-form-textarea"
          placeholder="Enter full venue address"
          rows={2}
        />
      </div>

      <div className="admin-form-group">
        <label className="admin-form-label">Venue Map URL</label>
        <input
          type="text"
          name="venue_map_url"
          defaultValue={webinar?.venue_map_url || ''}
          className="admin-form-input"
          placeholder="https://maps.google.com/..."
        />
      </div>

      <div className="admin-form-group">
        <label className="admin-form-label">YouTube Embed URL</label>
        <input
          type="text"
          name="youtube_embed_url"
          defaultValue={webinar?.youtube_embed_url || ''}
          className="admin-form-input"
          placeholder="https://www.youtube.com/embed/..."
        />
      </div>

      {/* Features Section */}
      <div className="admin-form-group">
        <label className="admin-form-label">Features</label>
        {features.map((feature, index) => (
          <div key={index} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
            <input
              type="text"
              value={feature.title}
              onChange={(e) => updateFeature(index, 'title', e.target.value)}
              className="admin-form-input"
              placeholder="Feature title"
              style={{ flex: 1 }}
            />
            <input
              type="text"
              value={feature.description || ''}
              onChange={(e) => updateFeature(index, 'description', e.target.value)}
              className="admin-form-input"
              placeholder="Description (optional)"
              style={{ flex: 2 }}
            />
            <button
              type="button"
              onClick={() => removeFeature(index)}
              className="admin-btn admin-btn-danger admin-btn-sm"
            >
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={addFeature} className="admin-btn admin-btn-secondary admin-btn-sm">
          + Add Feature
        </button>
      </div>

      {/* FAQ Section */}
      <div className="admin-form-group">
        <label className="admin-form-label">FAQ</label>
        {faqs.map((faq, index) => (
          <div key={index} style={{ marginBottom: '15px', padding: '15px', background: '#f9f9f9', borderRadius: '8px' }}>
            <input
              type="text"
              value={faq.question}
              onChange={(e) => updateFaq(index, 'question', e.target.value)}
              className="admin-form-input"
              placeholder="Question"
              style={{ marginBottom: '10px' }}
            />
            <textarea
              value={faq.answer}
              onChange={(e) => updateFaq(index, 'answer', e.target.value)}
              className="admin-form-textarea"
              placeholder="Answer"
              rows={2}
            />
            <button
              type="button"
              onClick={() => removeFaq(index)}
              className="admin-btn admin-btn-danger admin-btn-sm"
              style={{ marginTop: '10px' }}
            >
              Remove FAQ
            </button>
          </div>
        ))}
        <button type="button" onClick={addFaq} className="admin-btn admin-btn-secondary admin-btn-sm">
          + Add FAQ
        </button>
      </div>

      <div className="admin-form-group">
        <label className="admin-form-label">
          <input
            type="checkbox"
            name="is_active"
            value="true"
            defaultChecked={webinar?.is_active ?? true}
            style={{ marginRight: '8px' }}
          />
          Active (visible on website)
        </label>
      </div>

      <div className="admin-form-actions">
        <button type="submit" className="admin-btn">
          {isEdit ? 'Update Webinar' : 'Create Webinar'}
        </button>
        <Link href="/admin/webinars" className="admin-btn admin-btn-secondary">
          Cancel
        </Link>
      </div>
    </form>
  )
}

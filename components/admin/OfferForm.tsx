'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { Offer, FeatureItem, PricingInfo } from '@/lib/types'
import ImageUpload from './ImageUpload'

interface OfferFormProps {
  offer?: Offer
  action: (formData: FormData) => Promise<void>
  isEdit?: boolean
}

export default function OfferForm({ offer, action, isEdit = false }: OfferFormProps) {
  const formRef = useRef<HTMLFormElement>(null)
  const [features, setFeatures] = useState<FeatureItem[]>(offer?.features || [])
  const [heroImageUrl, setHeroImageUrl] = useState(offer?.hero_image_url || '')
  const [pricing, setPricing] = useState<PricingInfo>(offer?.pricing_info || {
    original_price: undefined,
    offer_price: undefined,
    currency: 'INR',
    discount_percentage: undefined,
  })

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

  const updatePricing = (field: keyof PricingInfo, value: string | number) => {
    setPricing({ ...pricing, [field]: value })
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  const handleSubmit = async (formData: FormData) => {
    formData.set('features', JSON.stringify(features.filter(f => f.title)))
    formData.set('pricing_info', JSON.stringify(pricing))
    await action(formData)
  }

  return (
    <form ref={formRef} action={handleSubmit} className="admin-form">
      <div className="admin-form-group">
        <label className="admin-form-label">Title *</label>
        <input
          type="text"
          name="title"
          defaultValue={offer?.title || ''}
          required
          className="admin-form-input"
          placeholder="Enter offer title"
          onChange={(e) => {
            if (!isEdit) {
              const slugInput = document.querySelector('input[name="slug"]') as HTMLInputElement
              if (slugInput) {
                slugInput.value = generateSlug(e.target.value)
              }
            }
          }}
        />
      </div>

      <div className="admin-form-group">
        <label className="admin-form-label">Slug * (URL-friendly identifier)</label>
        <input
          type="text"
          name="slug"
          defaultValue={offer?.slug || ''}
          required
          className="admin-form-input"
          placeholder="offer-slug-here"
          pattern="[a-z0-9-]+"
          title="Only lowercase letters, numbers, and hyphens allowed"
        />
      </div>

      <div className="admin-form-group">
        <label className="admin-form-label">Subtitle</label>
        <input
          type="text"
          name="subtitle"
          defaultValue={offer?.subtitle || ''}
          className="admin-form-input"
          placeholder="Enter subtitle"
        />
      </div>

      <div className="admin-form-group">
        <label className="admin-form-label">Hero Image</label>
        <ImageUpload
          currentImage={offer?.hero_image_url}
          onImageChange={setHeroImageUrl}
          folder="offers"
        />
        <input type="hidden" name="hero_image_url" value={heroImageUrl} />
        <small style={{ color: '#666' }}>Or enter URL manually:</small>
        <input
          type="text"
          value={heroImageUrl}
          onChange={(e) => setHeroImageUrl(e.target.value)}
          className="admin-form-input"
          placeholder="/images/offer-hero.jpg"
          style={{ marginTop: '0.5rem' }}
        />
      </div>

      <div className="admin-form-group">
        <label className="admin-form-label">Product Name</label>
        <input
          type="text"
          name="product_name"
          defaultValue={offer?.product_name || ''}
          className="admin-form-input"
          placeholder="Archicad"
        />
      </div>

      <div className="admin-form-group">
        <label className="admin-form-label">Product Description</label>
        <textarea
          name="product_description"
          defaultValue={offer?.product_description || ''}
          className="admin-form-textarea"
          placeholder="Enter product description"
          rows={4}
        />
      </div>

      {/* Pricing Section */}
      <div className="admin-form-group">
        <label className="admin-form-label">Pricing Information</label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', padding: '15px', background: '#f9f9f9', borderRadius: '8px' }}>
          <div>
            <label style={{ fontSize: '12px', color: '#666' }}>Currency</label>
            <select
              value={pricing.currency || 'INR'}
              onChange={(e) => updatePricing('currency', e.target.value)}
              className="admin-form-select"
            >
              <option value="INR">INR</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
            </select>
          </div>
          <div>
            <label style={{ fontSize: '12px', color: '#666' }}>Discount %</label>
            <input
              type="number"
              value={pricing.discount_percentage || ''}
              onChange={(e) => updatePricing('discount_percentage', parseFloat(e.target.value) || 0)}
              className="admin-form-input"
              placeholder="20"
              min="0"
              max="100"
            />
          </div>
          <div>
            <label style={{ fontSize: '12px', color: '#666' }}>Original Price</label>
            <input
              type="number"
              value={pricing.original_price || ''}
              onChange={(e) => updatePricing('original_price', parseFloat(e.target.value) || 0)}
              className="admin-form-input"
              placeholder="100000"
              min="0"
            />
          </div>
          <div>
            <label style={{ fontSize: '12px', color: '#666' }}>Offer Price</label>
            <input
              type="number"
              value={pricing.offer_price || ''}
              onChange={(e) => updatePricing('offer_price', parseFloat(e.target.value) || 0)}
              className="admin-form-input"
              placeholder="80000"
              min="0"
            />
          </div>
        </div>
      </div>

      <div className="admin-form-group">
        <label className="admin-form-label">Offer Valid Until</label>
        <input
          type="date"
          name="offer_valid_until"
          defaultValue={offer?.offer_valid_until || ''}
          className="admin-form-input"
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

      <div className="admin-form-group">
        <label className="admin-form-label">
          <input
            type="checkbox"
            name="iia_exclusive"
            value="true"
            defaultChecked={offer?.iia_exclusive ?? false}
            style={{ marginRight: '8px' }}
          />
          IIA Exclusive Offer
        </label>
      </div>

      <div className="admin-form-group">
        <label className="admin-form-label">
          <input
            type="checkbox"
            name="is_active"
            value="true"
            defaultChecked={offer?.is_active ?? true}
            style={{ marginRight: '8px' }}
          />
          Active (visible on website)
        </label>
      </div>

      <div className="admin-form-actions">
        <button type="submit" className="admin-btn">
          {isEdit ? 'Update Offer' : 'Create Offer'}
        </button>
        <Link href="/admin/offers" className="admin-btn admin-btn-secondary">
          Cancel
        </Link>
      </div>
    </form>
  )
}

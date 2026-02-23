'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { Training } from '@/lib/types'
import ImageUpload from './ImageUpload'

interface TrainingFormProps {
  training?: Training
  action: (formData: FormData) => Promise<void>
  isEdit?: boolean
}

export default function TrainingForm({ training, action, isEdit = false }: TrainingFormProps) {
  const formRef = useRef<HTMLFormElement>(null)
  const [imageUrl, setImageUrl] = useState(training?.image_url || '')

  return (
    <form ref={formRef} action={action} className="admin-form">
      <div className="admin-form-group">
        <label className="admin-form-label">Title *</label>
        <input
          type="text"
          name="title"
          defaultValue={training?.title || ''}
          required
          className="admin-form-input"
          placeholder="Enter training title"
        />
      </div>

      <div className="admin-form-group">
        <label className="admin-form-label">Subtitle</label>
        <input
          type="text"
          name="subtitle"
          defaultValue={training?.subtitle || ''}
          className="admin-form-input"
          placeholder="Enter subtitle"
        />
      </div>

      <div className="admin-form-group">
        <label className="admin-form-label">Description</label>
        <textarea
          name="description"
          defaultValue={training?.description || ''}
          className="admin-form-textarea"
          placeholder="Enter training description"
          rows={4}
        />
      </div>

      <div className="admin-form-group">
        <label className="admin-form-label">Image</label>
        <ImageUpload
          currentImage={training?.image_url}
          onImageChange={setImageUrl}
          folder="training"
        />
        <input type="hidden" name="image_url" value={imageUrl} />
        <small style={{ color: '#666' }}>Or enter URL manually:</small>
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="admin-form-input"
          placeholder="/images/training.jpg"
          style={{ marginTop: '0.5rem' }}
        />
      </div>

      <div className="admin-form-group">
        <label className="admin-form-label">Link URL</label>
        <input
          type="text"
          name="link_url"
          defaultValue={training?.link_url || ''}
          className="admin-form-input"
          placeholder="https://example.com or /page"
        />
      </div>

      <div className="admin-form-group">
        <label className="admin-form-label">Link Text</label>
        <input
          type="text"
          name="link_text"
          defaultValue={training?.link_text || 'Read More'}
          className="admin-form-input"
          placeholder="Read More"
        />
      </div>

      <div className="admin-form-group">
        <label className="admin-form-label">Display Order</label>
        <input
          type="number"
          name="display_order"
          defaultValue={training?.display_order || 0}
          className="admin-form-input"
          min="0"
        />
      </div>

      <div className="admin-form-group">
        <label className="admin-form-label">
          <input
            type="checkbox"
            name="is_active"
            value="true"
            defaultChecked={training?.is_active ?? true}
            style={{ marginRight: '8px' }}
          />
          Active (visible on website)
        </label>
      </div>

      <div className="admin-form-actions">
        <button type="submit" className="admin-btn">
          {isEdit ? 'Update Training' : 'Create Training'}
        </button>
        <Link href="/admin/training" className="admin-btn admin-btn-secondary">
          Cancel
        </Link>
      </div>
    </form>
  )
}

'use client'

import { useState, useRef, useEffect } from 'react'

interface ImageUploadProps {
  currentImage?: string | null
  onImageChange: (url: string) => void
  folder?: string
}

export default function ImageUpload({ currentImage, onImageChange, folder = 'general' }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setPreview(currentImage || null)
  }, [currentImage])

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setError('Please select an image file')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Image size must be less than 5MB')
      return
    }

    setError(null)
    setUploading(true)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('folder', folder)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Failed to upload image')
        setUploading(false)
        return
      }

      setPreview(data.url)
      onImageChange(data.url)
    } catch (err) {
      console.error('Upload error:', err)
      setError('Failed to upload image')
    } finally {
      setUploading(false)
    }
  }

  const handleRemove = () => {
    setPreview(null)
    onImageChange('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const styles = {
    container: {
      marginBottom: '1rem'
    },
    previewContainer: {
      position: 'relative' as const,
      display: 'inline-block',
      maxWidth: '300px'
    },
    previewImage: {
      width: '100%',
      height: 'auto',
      borderRadius: '8px',
      border: '1px solid #ddd'
    },
    removeBtn: {
      position: 'absolute' as const,
      top: '-10px',
      right: '-10px',
      width: '28px',
      height: '28px',
      borderRadius: '50%',
      background: '#ef4444',
      color: 'white',
      border: 'none',
      cursor: 'pointer',
      fontSize: '18px',
      lineHeight: '1',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    uploadArea: {
      border: '2px dashed #ccc',
      borderRadius: '8px',
      padding: '2rem',
      textAlign: 'center' as const,
      cursor: 'pointer',
      transition: 'border-color 0.2s'
    },
    uploadInput: {
      display: 'none'
    },
    uploadLabel: {
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      gap: '0.5rem',
      cursor: 'pointer'
    },
    uploadIcon: {
      fontSize: '2rem'
    },
    uploadHint: {
      fontSize: '0.875rem',
      color: '#666'
    },
    error: {
      color: '#ef4444',
      fontSize: '0.875rem',
      marginTop: '0.5rem'
    }
  }

  return (
    <div style={styles.container}>
      {preview ? (
        <div style={styles.previewContainer}>
          <img src={preview} alt="Preview" style={styles.previewImage} />
          <button
            type="button"
            onClick={handleRemove}
            style={styles.removeBtn}
            title="Remove image"
          >
            x
          </button>
        </div>
      ) : (
        <div style={styles.uploadArea}>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={uploading}
            id="image-upload"
            style={styles.uploadInput}
          />
          <label htmlFor="image-upload" style={styles.uploadLabel}>
            {uploading ? (
              <span>Uploading...</span>
            ) : (
              <>
                <span style={styles.uploadIcon}>+</span>
                <span>Click to upload image</span>
                <span style={styles.uploadHint}>PNG, JPG, GIF up to 5MB</span>
              </>
            )}
          </label>
        </div>
      )}
      {error && <p style={styles.error}>{error}</p>}
    </div>
  )
}

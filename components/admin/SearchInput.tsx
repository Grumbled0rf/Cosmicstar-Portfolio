'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useState, useCallback } from 'react'

interface SearchInputProps {
  placeholder?: string
}

export default function SearchInput({ placeholder = 'Search...' }: SearchInputProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [value, setValue] = useState(searchParams.get('search') || '')

  const handleSearch = useCallback((term: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (term) {
      params.set('search', term)
      params.set('page', '1') // Reset to first page on new search
    } else {
      params.delete('search')
    }
    router.push(`${pathname}?${params.toString()}`)
  }, [pathname, router, searchParams])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch(value)
    }
  }

  return (
    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="admin-form-input"
        style={{ flex: 1, maxWidth: '300px' }}
      />
      <button
        onClick={() => handleSearch(value)}
        className="admin-btn admin-btn-secondary"
      >
        Search
      </button>
      {value && (
        <button
          onClick={() => {
            setValue('')
            handleSearch('')
          }}
          className="admin-btn admin-btn-secondary"
        >
          Clear
        </button>
      )}
    </div>
  )
}

'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'

interface FilterSelectProps {
  paramName: string
  options: { value: string; label: string }[]
  placeholder?: string
}

export default function FilterSelect({ paramName, options, placeholder = 'All' }: FilterSelectProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentValue = searchParams.get(paramName) || ''

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString())
    if (e.target.value) {
      params.set(paramName, e.target.value)
    } else {
      params.delete(paramName)
    }
    params.set('page', '1') // Reset to first page
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <select
      value={currentValue}
      onChange={handleChange}
      className="admin-form-select"
      style={{ minWidth: '150px' }}
    >
      <option value="">{placeholder}</option>
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  )
}

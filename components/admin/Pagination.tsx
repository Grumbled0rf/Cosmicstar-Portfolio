'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'

interface PaginationProps {
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
}

export default function Pagination({ currentPage, totalPages, totalItems, itemsPerPage }: PaginationProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', page.toString())
    router.push(`${pathname}?${params.toString()}`)
  }

  if (totalPages <= 1) return null

  const startItem = (currentPage - 1) * itemsPerPage + 1
  const endItem = Math.min(currentPage * itemsPerPage, totalItems)

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: '1rem',
      padding: '1rem 0'
    }}>
      <div style={{ color: '#666', fontSize: '0.9rem' }}>
        Showing {startItem} to {endItem} of {totalItems} items
      </div>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage <= 1}
          className="admin-btn admin-btn-secondary admin-btn-sm"
          style={{ opacity: currentPage <= 1 ? 0.5 : 1 }}
        >
          Previous
        </button>

        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          let pageNum: number
          if (totalPages <= 5) {
            pageNum = i + 1
          } else if (currentPage <= 3) {
            pageNum = i + 1
          } else if (currentPage >= totalPages - 2) {
            pageNum = totalPages - 4 + i
          } else {
            pageNum = currentPage - 2 + i
          }

          return (
            <button
              key={pageNum}
              onClick={() => goToPage(pageNum)}
              className={`admin-btn admin-btn-sm ${currentPage === pageNum ? '' : 'admin-btn-secondary'}`}
              style={{
                minWidth: '36px',
                fontWeight: currentPage === pageNum ? 'bold' : 'normal'
              }}
            >
              {pageNum}
            </button>
          )
        })}

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="admin-btn admin-btn-secondary admin-btn-sm"
          style={{ opacity: currentPage >= totalPages ? 0.5 : 1 }}
        >
          Next
        </button>
      </div>
    </div>
  )
}

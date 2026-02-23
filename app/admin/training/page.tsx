import Link from 'next/link'
import { createServerClient } from '@/lib/supabase'
import { Training } from '@/lib/types'
import SearchInput from '@/components/admin/SearchInput'
import Pagination from '@/components/admin/Pagination'

const ITEMS_PER_PAGE = 10

interface PageProps {
  searchParams: Promise<{ search?: string; page?: string }>
}

async function getTrainings(search: string = '', page: number = 1) {
  const supabase = createServerClient()
  const offset = (page - 1) * ITEMS_PER_PAGE

  let query = supabase
    .from('trainings')
    .select('*', { count: 'exact' })

  if (search) {
    query = query.or(`title.ilike.%${search}%,subtitle.ilike.%${search}%,description.ilike.%${search}%`)
  }

  const { data, error, count } = await query
    .order('display_order', { ascending: true })
    .range(offset, offset + ITEMS_PER_PAGE - 1)

  if (error) {
    console.error('Error fetching trainings:', error)
    return { trainings: [], total: 0 }
  }

  return {
    trainings: (data as Training[]) || [],
    total: count || 0
  }
}

export default async function AdminTrainingPage({ searchParams }: PageProps) {
  const params = await searchParams
  const search = params.search || ''
  const page = parseInt(params.page || '1', 10)

  const { trainings, total } = await getTrainings(search, page)
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE)

  return (
    <div>
      <div className="admin-header">
        <h1 className="admin-title">Training Programs</h1>
        <Link href="/admin/training/new" className="admin-btn">
          Add New Training
        </Link>
      </div>

      <div className="admin-card">
        <SearchInput placeholder="Search trainings..." />

        {trainings.length > 0 ? (
          <>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Subtitle</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {trainings.map((training) => (
                  <tr key={training.id}>
                    <td>{training.title}</td>
                    <td>{training.subtitle || '-'}</td>
                    <td>
                      <span className={`admin-badge ${training.is_active ? 'admin-badge-success' : 'admin-badge-warning'}`}>
                        {training.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td>
                      <Link href={`/admin/training/${training.id}`} className="admin-btn admin-btn-sm admin-btn-secondary">
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <Pagination
              currentPage={page}
              totalPages={totalPages}
              totalItems={total}
              itemsPerPage={ITEMS_PER_PAGE}
            />
          </>
        ) : (
          <div className="admin-empty-state">
            {search ? (
              <p>No trainings found matching &quot;{search}&quot;.</p>
            ) : (
              <>
                <p>No training programs yet.</p>
                <Link href="/admin/training/new" className="admin-btn" style={{ marginTop: '20px' }}>
                  Create your first training program
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export const dynamic = 'force-dynamic'

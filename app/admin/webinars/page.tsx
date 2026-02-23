import Link from 'next/link'
import { createServerClient } from '@/lib/supabase'
import { Webinar } from '@/lib/types'
import SearchInput from '@/components/admin/SearchInput'
import Pagination from '@/components/admin/Pagination'

const ITEMS_PER_PAGE = 10

interface PageProps {
  searchParams: Promise<{ search?: string; page?: string }>
}

async function getWebinars(search: string = '', page: number = 1) {
  const supabase = createServerClient()
  const offset = (page - 1) * ITEMS_PER_PAGE

  let query = supabase
    .from('webinars')
    .select('*', { count: 'exact' })

  if (search) {
    query = query.or(`title.ilike.%${search}%,subtitle.ilike.%${search}%,description.ilike.%${search}%,venue_name.ilike.%${search}%`)
  }

  const { data, error, count } = await query
    .order('created_at', { ascending: false })
    .range(offset, offset + ITEMS_PER_PAGE - 1)

  if (error) {
    console.error('Error fetching webinars:', error)
    return { webinars: [], total: 0 }
  }

  return {
    webinars: (data as Webinar[]) || [],
    total: count || 0
  }
}

export default async function AdminWebinarsPage({ searchParams }: PageProps) {
  const params = await searchParams
  const search = params.search || ''
  const page = parseInt(params.page || '1', 10)

  const { webinars, total } = await getWebinars(search, page)
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE)

  return (
    <div>
      <div className="admin-header">
        <h1 className="admin-title">Webinars</h1>
        <Link href="/admin/webinars/new" className="admin-btn">
          Add New Webinar
        </Link>
      </div>

      <div className="admin-card">
        <SearchInput placeholder="Search webinars..." />

        {webinars.length > 0 ? (
          <>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Event Date</th>
                  <th>Venue</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {webinars.map((webinar) => (
                  <tr key={webinar.id}>
                    <td>{webinar.title}</td>
                    <td>{webinar.event_date || '-'}</td>
                    <td>{webinar.venue_name || '-'}</td>
                    <td>
                      <span className={`admin-badge ${webinar.is_active ? 'admin-badge-success' : 'admin-badge-warning'}`}>
                        {webinar.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td>
                      <Link href={`/admin/webinars/${webinar.id}`} className="admin-btn admin-btn-sm admin-btn-secondary">
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
              <p>No webinars found matching &quot;{search}&quot;.</p>
            ) : (
              <>
                <p>No webinars yet.</p>
                <Link href="/admin/webinars/new" className="admin-btn" style={{ marginTop: '20px' }}>
                  Create your first webinar
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

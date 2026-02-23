import { createServerClient } from '@/lib/supabase'
import { Lead } from '@/lib/types'
import SearchInput from '@/components/admin/SearchInput'
import Pagination from '@/components/admin/Pagination'
import FilterSelect from '@/components/admin/FilterSelect'

const ITEMS_PER_PAGE = 20

interface PageProps {
  searchParams: Promise<{ search?: string; page?: string; type?: string }>
}

async function getLeads(search: string = '', page: number = 1, type?: string) {
  const supabase = createServerClient()
  const offset = (page - 1) * ITEMS_PER_PAGE

  let query = supabase
    .from('leads')
    .select('*', { count: 'exact' })

  if (search) {
    query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%,phone.ilike.%${search}%,company.ilike.%${search}%`)
  }

  if (type) {
    query = query.eq('form_type', type)
  }

  const { data, error, count } = await query
    .order('created_at', { ascending: false })
    .range(offset, offset + ITEMS_PER_PAGE - 1)

  if (error) {
    console.error('Error fetching leads:', error)
    return { leads: [], total: 0 }
  }

  return {
    leads: (data as Lead[]) || [],
    total: count || 0
  }
}

export default async function AdminLeadsPage({ searchParams }: PageProps) {
  const params = await searchParams
  const search = params.search || ''
  const page = parseInt(params.page || '1', 10)
  const type = params.type || ''

  const { leads, total } = await getLeads(search, page, type || undefined)
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE)

  return (
    <div>
      <div className="admin-header">
        <h1 className="admin-title">Leads</h1>
        <div style={{ color: '#666' }}>
          Total: {total}
        </div>
      </div>

      <div className="admin-card">
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>
          <SearchInput placeholder="Search by name, email, phone..." />
          <FilterSelect
            paramName="type"
            placeholder="All Types"
            options={[
              { value: 'contact', label: 'Contact' },
              { value: 'training', label: 'Training' },
              { value: 'webinar', label: 'Webinar' },
              { value: 'offer', label: 'Offer' },
            ]}
          />
        </div>

        {leads.length > 0 ? (
          <>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Company</th>
                  <th>Type</th>
                  <th>Source</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr key={lead.id}>
                    <td>{new Date(lead.created_at).toLocaleDateString()}</td>
                    <td>{lead.name || '-'}</td>
                    <td>
                      <a href={`mailto:${lead.email}`} style={{ color: '#0066cc' }}>
                        {lead.email}
                      </a>
                    </td>
                    <td>
                      {lead.phone ? (
                        <a href={`tel:${lead.phone}`} style={{ color: '#0066cc' }}>
                          {lead.phone}
                        </a>
                      ) : '-'}
                    </td>
                    <td>{lead.company || '-'}</td>
                    <td>
                      <span className="admin-badge admin-badge-success">
                        {lead.form_type}
                      </span>
                    </td>
                    <td>{lead.source_page || '-'}</td>
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
            {search || type ? (
              <p>No leads found matching your filters.</p>
            ) : (
              <p>No leads yet. Form submissions will appear here.</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export const dynamic = 'force-dynamic'

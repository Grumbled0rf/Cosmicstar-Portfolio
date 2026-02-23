import Link from 'next/link'
import { createServerClient } from '@/lib/supabase'
import { Offer } from '@/lib/types'
import SearchInput from '@/components/admin/SearchInput'
import Pagination from '@/components/admin/Pagination'

const ITEMS_PER_PAGE = 10

interface PageProps {
  searchParams: Promise<{ search?: string; page?: string }>
}

async function getOffers(search: string = '', page: number = 1) {
  const supabase = createServerClient()
  const offset = (page - 1) * ITEMS_PER_PAGE

  let query = supabase
    .from('offers')
    .select('*', { count: 'exact' })

  if (search) {
    query = query.or(`title.ilike.%${search}%,subtitle.ilike.%${search}%,slug.ilike.%${search}%,product_name.ilike.%${search}%`)
  }

  const { data, error, count } = await query
    .order('created_at', { ascending: false })
    .range(offset, offset + ITEMS_PER_PAGE - 1)

  if (error) {
    console.error('Error fetching offers:', error)
    return { offers: [], total: 0 }
  }

  return {
    offers: (data as Offer[]) || [],
    total: count || 0
  }
}

export default async function AdminOffersPage({ searchParams }: PageProps) {
  const params = await searchParams
  const search = params.search || ''
  const page = parseInt(params.page || '1', 10)

  const { offers, total } = await getOffers(search, page)
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE)

  return (
    <div>
      <div className="admin-header">
        <h1 className="admin-title">Offers</h1>
        <Link href="/admin/offers/new" className="admin-btn">
          Add New Offer
        </Link>
      </div>

      <div className="admin-card">
        <SearchInput placeholder="Search offers..." />

        {offers.length > 0 ? (
          <>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Slug</th>
                  <th>Valid Until</th>
                  <th>IIA Exclusive</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {offers.map((offer) => (
                  <tr key={offer.id}>
                    <td>{offer.title}</td>
                    <td><code>{offer.slug}</code></td>
                    <td>{offer.offer_valid_until || '-'}</td>
                    <td>
                      <span className={`admin-badge ${offer.iia_exclusive ? 'admin-badge-success' : 'admin-badge-secondary'}`}>
                        {offer.iia_exclusive ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td>
                      <span className={`admin-badge ${offer.is_active ? 'admin-badge-success' : 'admin-badge-warning'}`}>
                        {offer.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td>
                      <Link href={`/admin/offers/${offer.id}`} className="admin-btn admin-btn-sm admin-btn-secondary">
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
              <p>No offers found matching &quot;{search}&quot;.</p>
            ) : (
              <>
                <p>No offers yet.</p>
                <Link href="/admin/offers/new" className="admin-btn" style={{ marginTop: '20px' }}>
                  Create your first offer
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

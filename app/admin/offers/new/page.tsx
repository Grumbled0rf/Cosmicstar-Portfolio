import Link from 'next/link'
import OfferForm from '@/components/admin/OfferForm'
import { createOffer } from '@/lib/actions'

export default function NewOfferPage() {
  return (
    <div>
      <div className="admin-header">
        <h1 className="admin-title">Add New Offer</h1>
        <Link href="/admin/offers" className="admin-btn admin-btn-secondary">
          Back to Offers
        </Link>
      </div>

      <div className="admin-card">
        <OfferForm action={createOffer} />
      </div>
    </div>
  )
}

import Link from 'next/link'
import { notFound } from 'next/navigation'
import OfferForm from '@/components/admin/OfferForm'
import DeleteButton from '@/components/admin/DeleteButton'
import { getOffer, updateOffer, deleteOffer } from '@/lib/actions'

interface Props {
  params: { id: string }
}

export default async function EditOfferPage({ params }: Props) {
  const offer = await getOffer(params.id)

  if (!offer) {
    notFound()
  }

  const updateOfferWithId = updateOffer.bind(null, params.id)

  return (
    <div>
      <div className="admin-header">
        <h1 className="admin-title">Edit Offer</h1>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Link href="/admin/offers" className="admin-btn admin-btn-secondary">
            Back to Offers
          </Link>
          <DeleteButton
            id={params.id}
            deleteAction={deleteOffer}
            itemName="offer"
            redirectPath="/admin/offers"
          />
        </div>
      </div>

      <div className="admin-card">
        <OfferForm offer={offer} action={updateOfferWithId} isEdit />
      </div>
    </div>
  )
}

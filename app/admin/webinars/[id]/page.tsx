import Link from 'next/link'
import { notFound } from 'next/navigation'
import WebinarForm from '@/components/admin/WebinarForm'
import DeleteButton from '@/components/admin/DeleteButton'
import { getWebinar, updateWebinar, deleteWebinar } from '@/lib/actions'

interface Props {
  params: { id: string }
}

export default async function EditWebinarPage({ params }: Props) {
  const webinar = await getWebinar(params.id)

  if (!webinar) {
    notFound()
  }

  const updateWebinarWithId = updateWebinar.bind(null, params.id)

  return (
    <div>
      <div className="admin-header">
        <h1 className="admin-title">Edit Webinar</h1>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Link href="/admin/webinars" className="admin-btn admin-btn-secondary">
            Back to Webinars
          </Link>
          <DeleteButton
            id={params.id}
            deleteAction={deleteWebinar}
            itemName="webinar"
            redirectPath="/admin/webinars"
          />
        </div>
      </div>

      <div className="admin-card">
        <WebinarForm webinar={webinar} action={updateWebinarWithId} isEdit />
      </div>
    </div>
  )
}

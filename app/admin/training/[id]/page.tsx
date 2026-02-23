import Link from 'next/link'
import { notFound } from 'next/navigation'
import TrainingForm from '@/components/admin/TrainingForm'
import DeleteButton from '@/components/admin/DeleteButton'
import { getTraining, updateTraining, deleteTraining } from '@/lib/actions'

interface Props {
  params: { id: string }
}

export default async function EditTrainingPage({ params }: Props) {
  const training = await getTraining(params.id)

  if (!training) {
    notFound()
  }

  const updateTrainingWithId = updateTraining.bind(null, params.id)

  return (
    <div>
      <div className="admin-header">
        <h1 className="admin-title">Edit Training</h1>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Link href="/admin/training" className="admin-btn admin-btn-secondary">
            Back to Training
          </Link>
          <DeleteButton
            id={params.id}
            deleteAction={deleteTraining}
            itemName="training"
            redirectPath="/admin/training"
          />
        </div>
      </div>

      <div className="admin-card">
        <TrainingForm training={training} action={updateTrainingWithId} isEdit />
      </div>
    </div>
  )
}

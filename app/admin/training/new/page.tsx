import Link from 'next/link'
import TrainingForm from '@/components/admin/TrainingForm'
import { createTraining } from '@/lib/actions'

export default function NewTrainingPage() {
  return (
    <div>
      <div className="admin-header">
        <h1 className="admin-title">Add New Training</h1>
        <Link href="/admin/training" className="admin-btn admin-btn-secondary">
          Back to Training
        </Link>
      </div>

      <div className="admin-card">
        <TrainingForm action={createTraining} />
      </div>
    </div>
  )
}

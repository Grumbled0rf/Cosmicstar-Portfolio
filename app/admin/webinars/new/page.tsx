import Link from 'next/link'
import WebinarForm from '@/components/admin/WebinarForm'
import { createWebinar } from '@/lib/actions'

export default function NewWebinarPage() {
  return (
    <div>
      <div className="admin-header">
        <h1 className="admin-title">Add New Webinar</h1>
        <Link href="/admin/webinars" className="admin-btn admin-btn-secondary">
          Back to Webinars
        </Link>
      </div>

      <div className="admin-card">
        <WebinarForm action={createWebinar} />
      </div>
    </div>
  )
}

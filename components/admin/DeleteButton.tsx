'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface DeleteButtonProps {
  id: string
  deleteAction: (id: string) => Promise<{ error?: string; success?: boolean }>
  itemName: string
  redirectPath: string
}

export default function DeleteButton({ id, deleteAction, itemName, redirectPath }: DeleteButtonProps) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete this ${itemName}? This action cannot be undone.`)) {
      return
    }

    setIsDeleting(true)

    try {
      const result = await deleteAction(id)

      if (result.error) {
        alert(`Error: ${result.error}`)
        setIsDeleting(false)
        return
      }

      router.push(redirectPath)
      router.refresh()
    } catch (error) {
      alert('An error occurred while deleting.')
      setIsDeleting(false)
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="admin-btn admin-btn-danger"
    >
      {isDeleting ? 'Deleting...' : 'Delete'}
    </button>
  )
}

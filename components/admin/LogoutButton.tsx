'use client'

import { signOut } from '@/lib/actions'

export default function LogoutButton() {
  return (
    <form action={signOut}>
      <button type="submit" className="admin-nav-link" style={{
        width: '100%',
        textAlign: 'left',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: '#e74c3c'
      }}>
        Logout
      </button>
    </form>
  )
}

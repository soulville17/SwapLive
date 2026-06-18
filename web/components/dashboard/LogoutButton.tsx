'use client'
import { useAuth } from '@/lib/hooks/use-auth'
import { LogOut } from 'lucide-react'

export function LogoutButton() {
  const { logout } = useAuth()
  return (
    <button
      onClick={logout}
      className="flex items-center gap-2 text-xs text-[#44445a] hover:text-red-400 transition-colors px-2 py-1 rounded"
    >
      <LogOut size={12} /> Déconnexion
    </button>
  )
}

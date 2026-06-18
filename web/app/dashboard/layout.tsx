'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Video, Repeat2, Image, Laugh, LayoutDashboard,
  BarChart2, TrendingUp, CreditCard, Webhook, Settings,
  Bell, ChevronDown, Zap, Menu, X
} from 'lucide-react'
import { LogoutButton } from '@/components/dashboard/LogoutButton'

const NAV_GROUPS = [
  {
    items: [
      { icon: LayoutDashboard, label: 'Accueil', href: '/dashboard' },
    ]
  },
  {
    label: 'Studio',
    items: [
      { icon: Video, label: 'Caméra Live', href: '/dashboard/camera-live' },
      { icon: Repeat2, label: 'Live Swap', href: '/dashboard/live-swap' },
      { icon: Image, label: 'Photo en Vidéo', href: '/dashboard/photo-to-video' },
      { icon: Laugh, label: 'Mes Avatars', href: '/dashboard/avatars' },
    ]
  },
  {
    label: 'Gestion',
    items: [
      { icon: LayoutDashboard, label: 'Espaces', href: '/dashboard/workspaces' },
      { icon: BarChart2, label: 'Statistiques', href: '/dashboard/statistics' },
      { icon: TrendingUp, label: 'Analytics', href: '/dashboard/analytics' },
    ]
  },
  {
    label: 'Compte',
    items: [
      { icon: CreditCard, label: 'Plans & Tarifs', href: '/dashboard/plans' },
      { icon: Webhook, label: 'API & Webhooks', href: '/dashboard/api-webhooks' },
      { icon: Settings, label: 'Paramètres', href: '/dashboard/settings' },
    ]
  }
]

function Sidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname()
  return (
    <div className="h-full flex flex-col" style={{ background: 'var(--bg-secondary)' }}>
      {/* Logo */}
      <div className="flex items-center justify-between px-5 h-16 border-b border-white/5 flex-shrink-0">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <span className="text-[#00d4ff]">⬡</span>
          <span className="text-white">Swap</span>
          <span className="gradient-text">Live</span>
        </Link>
        {onClose && (
          <button onClick={onClose} className="text-[#8888aa] hover:text-[#f0f0ff] lg:hidden">
            <X size={18} />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {NAV_GROUPS.map((group, gi) => (
          <div key={gi} className={gi > 0 ? 'pt-4' : ''}>
            {group.label && (
              <div className="px-3 mb-1 text-[10px] font-bold text-[#44445a] uppercase tracking-widest">{group.label}</div>
            )}
            {group.items.map(item => {
              const active = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`sidebar-item ${active ? 'active' : ''}`}
                  onClick={onClose}
                >
                  <item.icon size={16} />
                  {item.label}
                </Link>
              )
            })}
          </div>
        ))}
      </nav>

      {/* User card */}
      <div className="p-3 border-t border-white/5 flex-shrink-0">
        <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 cursor-pointer transition-colors">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: 'linear-gradient(135deg, #00d4ff, #7b2fff)' }}>N</div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-semibold text-[#f0f0ff] truncate">Konan Nzi</div>
            <div className="text-[10px] text-[#00d4ff] flex items-center gap-1">
              <Zap size={10} /> 847 pts · Plan 6 Mois
            </div>
          </div>
          <ChevronDown size={14} className="text-[#44445a]" />
        </div>
        <LogoutButton />
      </div>
    </div>
  )
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  const currentLabel = NAV_GROUPS.flatMap(g => g.items).find(i => i.href === pathname)?.label || 'Dashboard'

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
      {/* Desktop sidebar */}
      <div className="hidden lg:block w-60 flex-shrink-0 border-r border-white/5">
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="w-60 flex-shrink-0 border-r border-white/5">
            <Sidebar onClose={() => setMobileOpen(false)} />
          </div>
          <div className="flex-1 bg-black/50" onClick={() => setMobileOpen(false)} />
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-white/5 flex-shrink-0" style={{ background: 'var(--bg-secondary)' }}>
          <div className="flex items-center gap-3">
            <button className="lg:hidden text-[#8888aa] hover:text-[#f0f0ff]" onClick={() => setMobileOpen(true)}>
              <Menu size={20} />
            </button>
            <span className="text-sm font-semibold text-[#f0f0ff]">{currentLabel}</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/5 text-[#8888aa] hover:text-[#f0f0ff] transition-colors relative">
              <Bell size={16} />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#ff2d78]" />
            </button>
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: 'linear-gradient(135deg, #00d4ff, #7b2fff)' }}>N</div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}

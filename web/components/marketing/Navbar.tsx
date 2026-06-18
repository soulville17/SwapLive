'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Menu, X } from 'lucide-react'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const links = [
    { label: 'Fonctionnalités', href: '#features' },
    { label: 'Tarifs', href: '#pricing' },
    { label: 'Télécharger', href: '/download' },
    { label: 'FAQ', href: '#faq' },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'backdrop-blur-xl border-b border-white/5' : ''
      }`}
      style={{ background: scrolled ? 'rgba(13,13,20,0.9)' : 'transparent' }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <span className="text-[#00d4ff]">⬡</span>
          <span className="text-white">Swap</span>
          <span className="gradient-text">Live</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <Link key={l.label} href={l.href} className="text-sm text-[#8888aa] hover:text-[#f0f0ff] transition-colors">
              {l.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link href="/login">
            <Button variant="ghost" size="sm">Connexion</Button>
          </Link>
          <Link href="/register">
            <Button variant="primary" size="sm">Essai gratuit</Button>
          </Link>
        </div>

        <button className="md:hidden text-[#8888aa]" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden glass-card mx-4 mb-4 p-4 space-y-2">
          {links.map(l => (
            <Link key={l.label} href={l.href} className="block py-2 text-sm text-[#8888aa] hover:text-[#f0f0ff]" onClick={() => setMenuOpen(false)}>
              {l.label}
            </Link>
          ))}
          <hr className="border-white/10 my-2" />
          <Link href="/register" onClick={() => setMenuOpen(false)}>
            <Button variant="primary" size="sm" className="w-full">Essai gratuit</Button>
          </Link>
        </div>
      )}
    </nav>
  )
}

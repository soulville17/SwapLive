'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

export default function RegisterPage() {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '', confirm: '' })
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) => setForm(f => ({ ...f, [k]: e.target.value }))
  const strength = form.password.length > 12 ? 3 : form.password.length > 8 ? 2 : form.password.length > 4 ? 1 : 0
  const colors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-[#00ff88]']

  return (
    <div className="min-h-screen w-full flex">
      {/* Left */}
      <div className="hidden lg:flex flex-1 flex-col justify-center px-16 py-12 grid-bg" style={{ background: 'var(--bg-void)' }}>
        <div className="max-w-md">
          <div className="text-3xl font-bold mb-2">
            <span className="text-white">Swap</span><span className="gradient-text">Live</span>
          </div>
          <p className="text-[#8888aa] text-lg mb-8">&quot;Deviens qui tu veux, en direct.&quot;</p>
          <div className="space-y-4">
            {['15 000+ créateurs nous font confiance', 'Aucune carte requise pour commencer', '100% local — vie privée garantie'].map(t => (
              <div key={t} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-[#00ff88]/20 flex items-center justify-center">
                  <span className="text-[#00ff88] text-xs">✓</span>
                </div>
                <span className="text-[#8888aa] text-sm">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Right */}
      <div className="flex-1 flex items-center justify-center px-6 py-12" style={{ background: 'var(--bg-primary)' }}>
        <div className="glass-card p-10 w-full max-w-md">
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00ff88]/10 border border-[#00ff88]/20 text-[#00ff88] text-xs font-semibold mb-4">
              <span className="badge-live" /> Essai gratuit · Aucune carte requise
            </div>
            <h1 className="text-2xl font-bold text-[#f0f0ff]">Crée ton compte SwapLive</h1>
          </div>

          <form className="space-y-4" onSubmit={e => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-[#8888aa] mb-1.5">Prénom</label>
                <Input placeholder="Konan" value={form.firstName} onChange={set('firstName')} />
              </div>
              <div>
                <label className="block text-xs text-[#8888aa] mb-1.5">Nom</label>
                <Input placeholder="Nzi" value={form.lastName} onChange={set('lastName')} />
              </div>
            </div>
            <div>
              <label className="block text-xs text-[#8888aa] mb-1.5">Email</label>
              <Input type="email" placeholder="toi@exemple.com" value={form.email} onChange={set('email')} />
            </div>
            <div>
              <label className="block text-xs text-[#8888aa] mb-1.5">Mot de passe</label>
              <Input type="password" placeholder="••••••••" value={form.password} onChange={set('password')} />
              {form.password && (
                <div className="flex gap-1 mt-2">
                  {[0,1,2].map(i => (
                    <div key={i} className={`h-1 flex-1 rounded-full transition-all ${i < strength ? colors[strength] : 'bg-white/10'}`} />
                  ))}
                </div>
              )}
            </div>
            <div>
              <label className="block text-xs text-[#8888aa] mb-1.5">Confirmer le mot de passe</label>
              <Input type="password" placeholder="••••••••" value={form.confirm} onChange={set('confirm')} />
            </div>
            <label className="flex items-start gap-2 text-xs text-[#8888aa] cursor-pointer">
              <input type="checkbox" className="mt-0.5 accent-[#00d4ff]" />
              J&apos;accepte les{' '}
              <Link href="/terms" className="text-[#00d4ff] hover:underline">Conditions d&apos;utilisation</Link>
            </label>
            <Button variant="primary" size="lg" className="w-full">Créer mon compte →</Button>
          </form>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs text-[#44445a]">ou</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>
          <Button variant="outline" size="lg" className="w-full border-white/10 text-[#f0f0ff]">
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Continuer avec Google
          </Button>
          <p className="text-center text-sm text-[#8888aa] mt-6">
            Déjà un compte ?{' '}
            <Link href="/login" className="text-[#00d4ff] hover:underline">Se connecter</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

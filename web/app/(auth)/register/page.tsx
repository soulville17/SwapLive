'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Eye, EyeOff, Loader2, Check } from 'lucide-react'

function PasswordStrength({ password }: { password: string }) {
  const checks = [
    { label: '8 caractères min', ok: password.length >= 8 },
    { label: 'Majuscule', ok: /[A-Z]/.test(password) },
    { label: 'Chiffre', ok: /[0-9]/.test(password) },
  ]
  const score = checks.filter(c => c.ok).length
  const colors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-[#00ff88]']
  return (
    <div className="mt-2 space-y-1.5">
      <div className="flex gap-1">
        {[0,1,2].map(i => (
          <div key={i} className={`h-1 flex-1 rounded-full transition-all ${i < score ? colors[score] : 'bg-white/10'}`} />
        ))}
      </div>
      <div className="flex gap-3">
        {checks.map(c => (
          <span key={c.label} className={`text-[10px] flex items-center gap-1 ${c.ok ? 'text-[#00ff88]' : 'text-[#44445a]'}`}>
            {c.ok && <Check size={10} />}{c.label}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function RegisterPage() {
  const router = useRouter()
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '', confirm: '' })
  const [showPwd, setShowPwd] = useState(false)
  const [agreed, setAgreed] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (form.password !== form.confirm) { setError('Les mots de passe ne correspondent pas'); return }
    if (!agreed) { setError('Accepte les CGU pour continuer'); return }
    setLoading(true)
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email, password: form.password, firstName: form.firstName, lastName: form.lastName }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Erreur inscription'); return }
      router.push('/dashboard')
    } catch {
      setError('Erreur réseau, réessaie.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 grid-bg" style={{ background: 'var(--bg-primary)' }}>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-2xl font-black font-display mb-4">
            <span className="text-[#00d4ff]">⬡</span>
            <span className="text-[#f0f0ff]">Swap</span>
            <span className="gradient-text">Live</span>
          </Link>
          <h1 className="text-2xl font-black font-display text-[#f0f0ff]">Crée ton compte</h1>
          <p className="text-xs text-[#00d4ff] mt-1 border border-[#00d4ff]/20 bg-[#00d4ff]/5 rounded-full px-3 py-1 inline-block">Essai gratuit · Aucune carte requise</p>
        </div>

        <div className="glass-card p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-[#44445a] block mb-1.5">Prénom</label>
                <Input placeholder="Konan" value={form.firstName} onChange={set('firstName')} required />
              </div>
              <div>
                <label className="text-xs text-[#44445a] block mb-1.5">Nom</label>
                <Input placeholder="Nzi" value={form.lastName} onChange={set('lastName')} />
              </div>
            </div>
            <div>
              <label className="text-xs text-[#44445a] block mb-1.5">Email</label>
              <Input type="email" placeholder="ton@email.com" value={form.email} onChange={set('email')} required />
            </div>
            <div>
              <label className="text-xs text-[#44445a] block mb-1.5">Mot de passe</label>
              <div className="relative">
                <Input type={showPwd ? 'text' : 'password'} placeholder="••••••••" value={form.password} onChange={set('password')} required className="pr-10" />
                <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#44445a] hover:text-[#8888aa]">
                  {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {form.password && <PasswordStrength password={form.password} />}
            </div>
            <div>
              <label className="text-xs text-[#44445a] block mb-1.5">Confirmer le mot de passe</label>
              <Input type="password" placeholder="••••••••" value={form.confirm} onChange={set('confirm')} required />
            </div>

            <label className="flex items-start gap-2 cursor-pointer">
              <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} className="mt-0.5 accent-[#00d4ff]" />
              <span className="text-xs text-[#8888aa]">J&apos;accepte les <Link href="/cgu" className="text-[#00d4ff] hover:underline">CGU</Link> et la <Link href="/privacy" className="text-[#00d4ff] hover:underline">politique de confidentialité</Link></span>
            </label>

            {error && (
              <div className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">{error}</div>
            )}

            <Button type="submit" variant="primary" size="lg" className="w-full gap-2" disabled={loading}>
              {loading ? <><Loader2 size={16} className="animate-spin" /> Création...</> : 'Créer mon compte →'}
            </Button>
          </form>

          <p className="text-center text-xs text-[#44445a] mt-6">
            Déjà un compte ?{' '}
            <Link href="/login" className="text-[#00d4ff] hover:underline">Se connecter</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

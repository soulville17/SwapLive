import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Timer, Laugh, Zap, Repeat2, CheckCircle2, Circle } from 'lucide-react'

const KPI = [
  { icon: Timer, label: 'Ce mois', value: '4h 23min', sub: 'temps de transformation', color: '#00d4ff' },
  { icon: Laugh, label: 'Avatars utilisés', value: '12', sub: 'avatars différents', color: '#7b2fff' },
  { icon: Zap, label: 'Plan actif', value: '6 MOIS', sub: 'expire dans 142 jours', color: '#00ff88' },
  { icon: Repeat2, label: 'Points restants', value: '847', sub: '~7h03min restantes', color: '#ff2d78' },
]

const SESSIONS = [
  { date: '18 Jun 2026', duration: '24:12', avatar: 'Warrior X', points: 1452 },
  { date: '17 Jun 2026', duration: '12:05', avatar: 'Anime Girl', points: 725 },
  { date: '15 Jun 2026', duration: '8:33', avatar: 'Human Pro', points: 513 },
]

const CHECKLIST = [
  { done: true, label: 'Compte créé' },
  { done: true, label: 'Application desktop téléchargée' },
  { done: true, label: 'Premier avatar sélectionné' },
  { done: false, label: 'Premier Live Swap lancé' },
  { done: false, label: 'Connecté à OBS' },
]

export default function DashboardPage() {
  return (
    <div className="space-y-6 max-w-6xl">
      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {KPI.map(k => (
          <Card key={k.label} className="p-5">
            <div className="flex items-start justify-between mb-3">
              <k.icon size={18} style={{ color: k.color }} />
              <span className="text-[10px] text-[#44445a] uppercase tracking-wider">{k.label}</span>
            </div>
            <div className="text-2xl font-black font-display text-[#f0f0ff]">{k.value}</div>
            <div className="text-xs text-[#8888aa] mt-1">{k.sub}</div>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Launch swap */}
        <Card glow className="lg:col-span-2 flex flex-col items-center justify-center py-10 text-center">
          <div className="mb-4">
            <div className="flex items-center gap-2 justify-center mb-1">
              <span className="badge-live-dot" />
              <span className="text-xs text-[#00ff88] font-semibold">App desktop connectée · v2.1.6</span>
            </div>
            <h2 className="text-2xl font-black font-display text-[#f0f0ff] mb-2">LANCER LIVE SWAP</h2>
            <p className="text-sm text-[#8888aa]">Deep-Live-Cam prêt · 60 FPS</p>
          </div>
          <Link href="/dashboard/live-swap">
            <Button variant="primary" size="lg" className="gap-2 text-base px-10 py-4">
              <Repeat2 size={20} /> Démarrer le swap
            </Button>
          </Link>
          <p className="text-xs text-[#44445a] mt-4">Points restants : <span className="text-[#00d4ff]">847 pts</span></p>
        </Card>

        {/* Checklist */}
        <Card>
          <h3 className="text-sm font-bold text-[#f0f0ff] mb-4">Guide démarrage rapide</h3>
          <ul className="space-y-3">
            {CHECKLIST.map(item => (
              <li key={item.label} className="flex items-center gap-3">
                {item.done
                  ? <CheckCircle2 size={16} className="text-[#00ff88] flex-shrink-0" />
                  : <Circle size={16} className="text-[#44445a] flex-shrink-0" />}
                <span className={`text-sm ${item.done ? 'text-[#8888aa] line-through' : 'text-[#f0f0ff]'}`}>{item.label}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Recent sessions */}
      <Card>
        <h3 className="text-sm font-bold text-[#f0f0ff] mb-4">Dernières sessions</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[10px] text-[#44445a] uppercase tracking-wider border-b border-white/5">
                <th className="text-left pb-3">Date</th>
                <th className="text-left pb-3">Durée</th>
                <th className="text-left pb-3">Avatar</th>
                <th className="text-right pb-3">Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {SESSIONS.map(s => (
                <tr key={s.date}>
                  <td className="py-3 text-[#8888aa]">{s.date}</td>
                  <td className="py-3 text-[#f0f0ff] font-mono">{s.duration}</td>
                  <td className="py-3 text-[#00d4ff]">{s.avatar}</td>
                  <td className="py-3 text-right text-[#7b2fff] font-mono">-{s.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}

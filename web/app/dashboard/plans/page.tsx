import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Zap } from 'lucide-react'

const PLANS = [
  { name: '1 MOIS', price: '20 000', points: '3 000', time: '~50 min', featured: false, badge: null },
  { name: '6 MOIS', price: '50 000', points: '10 000', time: '~2h46min', featured: true, badge: '⭐ MEILLEUR RAPPORT', economy: '-58%', current: true },
  { name: '1 AN', price: '80 000', points: '18 000', time: '~5h00min', featured: false, badge: '👑 MEILLEURE OFFRE', economy: '-67%' },
]

const PACKS = [
  { name: 'Pack S', price: '5 000', points: '1 500', time: '~25 min', featured: false },
  { name: 'Pack L', price: '7 000', points: '2 500', time: '~41 min', featured: true },
]

const HISTORY = [
  { date: '1 Jan 2026', type: 'Plan 6 Mois', amount: '50 000 FCFA', points: '+10 000', status: 'Confirmé' },
  { date: '15 Dec 2025', type: 'Pack L', amount: '7 000 FCFA', points: '+2 500', status: 'Confirmé' },
]

export default function PlansPage() {
  return (
    <div className="max-w-5xl space-y-8">
      {/* Current plan */}
      <Card glow>
        <div className="flex flex-col sm:flex-row sm:items-center gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-black text-[#f0f0ff]">Plan 6 MOIS</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#00ff88]/10 text-[#00ff88] border border-[#00ff88]/20">Actif</span>
            </div>
            <p className="text-xs text-[#8888aa] mb-3">Expire le 14 Juillet 2026</p>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-[#44445a]">847 / 10 000 pts utilisés</span>
              <span className="text-xs text-[#00d4ff] flex items-center gap-1"><Zap size={10} /> ~7h03min restantes</span>
            </div>
            <div className="h-2 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full rounded-full" style={{ width: '8.47%', background: 'linear-gradient(90deg, #00d4ff, #7b2fff)' }} />
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm">Recharger points</Button>
            <Button variant="primary" size="sm">Upgrade</Button>
          </div>
        </div>
      </Card>

      {/* Plans grid */}
      <div>
        <h2 className="text-lg font-black font-display text-[#f0f0ff] mb-4">Changer de plan</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {PLANS.map((plan) => (
            <div key={plan.name} className={`glass-card p-6 flex flex-col relative ${plan.featured ? 'neon-border' : ''} ${(plan as { current?: boolean }).current ? 'opacity-60' : ''}`}>
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-bold px-3 py-1 rounded-full" style={{ background: plan.featured ? 'linear-gradient(90deg, #00d4ff, #7b2fff)' : 'rgba(255,215,0,0.15)', color: plan.featured ? 'white' : '#ffd700' }}>
                  {plan.badge}
                </div>
              )}
              <h3 className="font-black text-[#f0f0ff] mb-2">{plan.name}</h3>
              <div className="text-2xl font-black text-[#f0f0ff] mb-1">{plan.price} <span className="text-sm text-[#8888aa] font-normal">FCFA</span></div>
              <div className="text-xs text-[#00d4ff] mb-1">{plan.points} pts · {plan.time}</div>
              {(plan as { economy?: string }).economy && <div className="text-xs text-[#00ff88] mb-4">{(plan as { economy?: string }).economy} vs mensuel</div>}
              <div className="flex-1" />
              <Button variant={(plan as { current?: boolean }).current ? 'ghost' : plan.featured ? 'primary' : 'outline'} size="sm" className="w-full mt-4" disabled={(plan as { current?: boolean }).current}>
                {(plan as { current?: boolean }).current ? 'Plan actuel' : 'Choisir'}
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Packs */}
      <div>
        <h2 className="text-lg font-black font-display text-[#f0f0ff] mb-4">⚡ Recharge de points</h2>
        <div className="grid sm:grid-cols-2 gap-4 max-w-lg">
          {PACKS.map(p => (
            <div key={p.name} className={`glass-card p-5 text-center ${p.featured ? 'neon-border' : ''}`}>
              {p.featured && <div className="text-xs font-bold text-[#00d4ff] mb-2">★ Meilleur rapport</div>}
              <div className="text-lg font-black text-[#f0f0ff]">{p.name}</div>
              <div className="text-2xl font-black text-[#f0f0ff] my-1">{p.price} <span className="text-sm text-[#8888aa] font-normal">FCFA</span></div>
              <div className="text-sm text-[#00d4ff]">{p.points} pts · {p.time}</div>
              <div className="text-xs text-[#8888aa] mt-1 mb-3">Points sans expiration</div>
              <Button variant={p.featured ? 'primary' : 'outline'} size="sm" className="w-full">Recharger</Button>
            </div>
          ))}
        </div>
      </div>

      {/* Payment methods */}
      <Card>
        <h3 className="text-sm font-bold text-[#f0f0ff] mb-3">Moyens de paiement acceptés</h3>
        <div className="flex flex-wrap gap-2 mb-2">
          {['📱 Orange Money', '📱 MTN', '📱 Wave', '📱 Moov Money', '📱 Free Money', '💳 Visa', '💳 Mastercard'].map(m => (
            <span key={m} className="text-xs px-3 py-1.5 rounded-full border border-white/10 text-[#8888aa]">{m}</span>
          ))}
        </div>
        <p className="text-xs text-[#44445a]">🔒 Paiement SSL · ✅ Confirmation instantanée · ✅ Facture PDF · ✅ Remboursement 14j</p>
      </Card>

      {/* History */}
      <Card>
        <h3 className="text-sm font-bold text-[#f0f0ff] mb-4">Historique des paiements</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-[10px] text-[#44445a] uppercase tracking-wider border-b border-white/5">
              <th className="text-left pb-3">Date</th>
              <th className="text-left pb-3">Type</th>
              <th className="text-left pb-3">Montant</th>
              <th className="text-left pb-3">Points</th>
              <th className="text-left pb-3">Statut</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {HISTORY.map(h => (
              <tr key={h.date}>
                <td className="py-3 text-[#8888aa]">{h.date}</td>
                <td className="py-3 text-[#f0f0ff]">{h.type}</td>
                <td className="py-3 text-[#f0f0ff] font-mono">{h.amount}</td>
                <td className="py-3 text-[#00ff88] font-mono">{h.points}</td>
                <td className="py-3"><span className="text-xs px-2 py-0.5 rounded-full bg-[#00ff88]/10 text-[#00ff88] border border-[#00ff88]/20">{h.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}

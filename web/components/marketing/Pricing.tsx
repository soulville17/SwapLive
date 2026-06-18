import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Check } from 'lucide-react'

const PLANS = [
  {
    name: '1 MOIS',
    price: '20 000',
    points: '3 000',
    time: '~50 min',
    featured: false,
    badge: null,
    economy: null,
    features: ['Live Swap temps réel', 'Tous les avatars', 'Qualité 1080p HD', 'Sans watermark', 'Photo en Vidéo', 'Mouth Mask + Face Enhancer', 'Support email', '1 Espace de travail'],
    ideal: 'Créateurs occasionnels',
  },
  {
    name: '6 MOIS',
    price: '50 000',
    points: '10 000',
    time: '~2h46min',
    featured: true,
    badge: '⭐ MEILLEUR RAPPORT',
    economy: '-58% vs mensuel',
    features: ['Tout du plan 1 mois', 'Qualité 4K Ultra HD', 'Upload avatar perso (5)', '3 Espaces de travail', 'Statistiques complètes', 'Support prioritaire'],
    ideal: 'Streamers réguliers, TikTokers',
  },
  {
    name: '1 AN',
    price: '80 000',
    points: '18 000',
    time: '~5h00min',
    featured: false,
    badge: '👑 MEILLEURE OFFRE',
    economy: '-67% vs mensuel',
    features: ['Tout du plan 6 mois', 'Qualité 4K 60 FPS', 'Upload avatar illimité', 'Espaces de travail illimités', 'Analytics avancées', 'Accès API (1 000 req/mois)', 'Support dédié WhatsApp', 'Accès bêta nouvelles fonctionnalités'],
    ideal: 'Influenceurs pro, agences',
  },
]

const PACKS = [
  { name: 'Pack S', price: '5 000', points: '1 500', time: '~25 min', featured: false },
  { name: 'Pack L', price: '7 000', points: '2 500', time: '~41 min', featured: true },
]

const PAYMENT_METHODS = ['📱 Orange Money', '📱 MTN', '📱 Wave', '📱 Moov', '💳 Visa/Mastercard']

export function Pricing() {
  return (
    <section id="pricing" className="py-24 px-6" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black font-display text-[#f0f0ff] uppercase mb-4">
            CHOISIS TON PLAN <span className="gradient-text">SWAPLIVE</span>
          </h2>
          <p className="text-[#8888aa]">&quot;Deviens qui tu veux, en direct.&quot; · Paiement en FCFA · Mobile Money + Carte</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {PLANS.map(plan => (
            <div
              key={plan.name}
              className={`glass-card p-8 flex flex-col relative ${plan.featured ? 'neon-border scale-105' : ''}`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-bold px-4 py-1 rounded-full" style={{ background: plan.featured ? 'linear-gradient(90deg, #00d4ff, #7b2fff)' : 'rgba(255,215,0,0.15)', color: plan.featured ? 'white' : '#ffd700', border: plan.featured ? 'none' : '1px solid rgba(255,215,0,0.3)' }}>
                  {plan.badge}
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-black text-[#f0f0ff] mb-3 font-display">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-3xl font-black text-[#f0f0ff]">{plan.price}</span>
                  <span className="text-[#8888aa] text-sm">FCFA</span>
                </div>
                <div className="text-xs text-[#8888aa] space-y-0.5">
                  <div className="text-[#00d4ff] font-semibold">{plan.points} points · {plan.time}</div>
                  {plan.economy && <div className="text-[#00ff88]">{plan.economy}</div>}
                  <div>Idéal : {plan.ideal}</div>
                </div>
              </div>

              <ul className="space-y-2.5 mb-8 flex-1">
                {plan.features.map(f => (
                  <li key={f} className="flex items-start gap-2 text-sm text-[#8888aa]">
                    <Check size={14} className="text-[#00ff88] mt-0.5 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <Link href="/register">
                <Button variant={plan.featured ? 'primary' : 'outline'} size="md" className="w-full">
                  Choisir ce plan
                </Button>
              </Link>
            </div>
          ))}
        </div>

        {/* Point packs */}
        <div className="glass-card p-8 mb-8">
          <h3 className="text-center text-xl font-black font-display text-[#f0f0ff] uppercase mb-2">
            ⚡ RECHARGE DE POINTS
          </h3>
          <p className="text-center text-sm text-[#8888aa] mb-6">Disponible à tout moment · Points sans expiration · Utilisables même sans abonnement actif</p>
          <div className="grid sm:grid-cols-2 gap-4 max-w-lg mx-auto">
            {PACKS.map(pack => (
              <div key={pack.name} className={`p-5 rounded-xl text-center ${pack.featured ? 'neon-border' : 'border border-white/10'}`} style={{ background: 'rgba(255,255,255,0.02)' }}>
                {pack.featured && <div className="text-xs font-bold text-[#00d4ff] mb-2">★ Meilleur rapport</div>}
                <div className="text-lg font-black text-[#f0f0ff] mb-1">{pack.name}</div>
                <div className="text-2xl font-black text-[#f0f0ff]">{pack.price} <span className="text-sm text-[#8888aa]">FCFA</span></div>
                <div className="text-sm text-[#00d4ff] mt-1">{pack.points} points · {pack.time}</div>
                <Link href="/register" className="block mt-4">
                  <Button variant={pack.featured ? 'primary' : 'outline'} size="sm" className="w-full">Recharger</Button>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Payment methods */}
        <div className="text-center">
          <p className="text-xs text-[#44445a] mb-3">💳 Payer avec :</p>
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {PAYMENT_METHODS.map(m => (
              <span key={m} className="text-xs px-3 py-1.5 rounded-full border border-white/10 text-[#8888aa]">{m}</span>
            ))}
          </div>
          <p className="text-xs text-[#44445a]">🔒 Paiement sécurisé SSL · ✅ Remboursement 14 jours · ✅ Confirmation instantanée</p>
        </div>
      </div>
    </section>
  )
}

import { Card } from '@/components/ui/Card'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { TrendingUp, Trophy, Target } from 'lucide-react'

const fpsData = Array.from({ length: 10 }, (_, i) => ({ session: `S${i + 1}`, fps: Math.floor(Math.random() * 20) + 45 }))
const latencyData = Array.from({ length: 10 }, (_, i) => ({ session: `S${i + 1}`, ms: Math.floor(Math.random() * 5) + 6 }))

export default function AnalyticsPage() {
  return (
    <div className="max-w-5xl space-y-6">
      <h1 className="text-xl font-black font-display text-[#f0f0ff]">Analytics avancées</h1>

      <div className="grid lg:grid-cols-3 gap-4">
        {[
          { icon: Trophy, label: 'Record session', value: '1h 42min', color: '#ffd700' },
          { icon: Target, label: 'Avatar le plus stable', value: 'Human Pro · 59.2 FPS', color: '#00ff88' },
          { icon: TrendingUp, label: 'Usage ce mois vs précédent', value: '+34%', color: '#00d4ff' },
        ].map(k => (
          <Card key={k.label} className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${k.color}15` }}>
              <k.icon size={18} style={{ color: k.color }} />
            </div>
            <div>
              <div className="text-xs text-[#44445a]">{k.label}</div>
              <div className="text-sm font-bold text-[#f0f0ff]">{k.value}</div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-sm font-bold text-[#f0f0ff] mb-4">FPS moyen par session</h3>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={fpsData}>
              <XAxis dataKey="session" tick={{ fill: '#44445a', fontSize: 10 }} />
              <YAxis domain={[30, 65]} tick={{ fill: '#44445a', fontSize: 10 }} />
              <Tooltip contentStyle={{ background: '#13131f', border: '1px solid rgba(0,212,255,0.1)', borderRadius: 8, color: '#f0f0ff', fontSize: 12 }} />
              <Line type="monotone" dataKey="fps" stroke="#00ff88" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
        <Card>
          <h3 className="text-sm font-bold text-[#f0f0ff] mb-4">Latence moyenne (ms)</h3>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={latencyData}>
              <XAxis dataKey="session" tick={{ fill: '#44445a', fontSize: 10 }} />
              <YAxis tick={{ fill: '#44445a', fontSize: 10 }} />
              <Tooltip contentStyle={{ background: '#13131f', border: '1px solid rgba(0,212,255,0.1)', borderRadius: 8, color: '#f0f0ff', fontSize: 12 }} />
              <Line type="monotone" dataKey="ms" stroke="#ff2d78" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card>
        <h3 className="text-sm font-bold text-[#f0f0ff] mb-3">Prédiction épuisement points</h3>
        <p className="text-sm text-[#8888aa]">À votre rythme actuel (≈ 15 min/jour), vos <span className="text-[#00d4ff]">847 points</span> restants seront épuisés dans environ <span className="text-[#00ff88] font-semibold">56 jours</span>.</p>
        <p className="text-xs text-[#44445a] mt-2">Recommandation : Pack L (2 500 pts · 7 000 FCFA) pour prolonger sans interruption.</p>
      </Card>
    </div>
  )
}

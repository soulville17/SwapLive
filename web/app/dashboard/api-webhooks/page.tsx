'use client'
import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Copy, Eye, EyeOff, RefreshCw } from 'lucide-react'
import { Input } from '@/components/ui/Input'

const ENDPOINTS = [
  { method: 'POST', path: '/v1/swap/start', desc: 'Démarre une session swap' },
  { method: 'POST', path: '/v1/swap/stop', desc: 'Arrête la session en cours' },
  { method: 'GET', path: '/v1/avatars', desc: 'Liste les avatars disponibles' },
  { method: 'GET', path: '/v1/points', desc: 'Retourne le solde de points' },
  { method: 'POST', path: '/v1/photo-video', desc: 'Génère une vidéo' },
]

const EVENTS = ['session.started', 'session.ended', 'points.low', 'points.depleted', 'payment.success', 'avatar.ready']

export default function ApiWebhooksPage() {
  const [showSecret, setShowSecret] = useState(false)
  const [webhookUrl, setWebhookUrl] = useState('')
  const [activeEvents, setActiveEvents] = useState(new Set(['session.started', 'session.ended', 'points.low', 'points.depleted']))
  const [activeTab, setActiveTab] = useState('REST API')

  return (
    <div className="max-w-4xl space-y-6">
      {/* API Keys */}
      <Card>
        <h2 className="text-sm font-bold text-[#f0f0ff] mb-4">Clés API</h2>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <label className="text-xs text-[#44445a] block mb-1">Clé publique</label>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-white/10 font-mono text-sm text-[#8888aa]" style={{ background: 'var(--bg-elevated)' }}>
                sl_pub_k2m9x3v7p1q8n4w6
                <button className="ml-auto text-[#44445a] hover:text-[#00d4ff]"><Copy size={14} /></button>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <label className="text-xs text-[#44445a] block mb-1">Clé secrète</label>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-white/10 font-mono text-sm text-[#8888aa]" style={{ background: 'var(--bg-elevated)' }}>
                {showSecret ? 'sl_sec_a8f3h7k2m9x1v4p6q8n3w7' : '••••••••••••••••••••••••'}
                <button className="ml-auto text-[#44445a] hover:text-[#00d4ff]" onClick={() => setShowSecret(!showSecret)}>
                  {showSecret ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
                <button className="text-[#44445a] hover:text-[#ff2d78]"><RefreshCw size={14} /></button>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Endpoints */}
      <Card>
        <div className="flex gap-2 mb-4">
          {['REST API', 'WebSocket', 'SDK JS', 'SDK Python'].map(t => (
            <button key={t} onClick={() => setActiveTab(t)} className={`text-xs px-3 py-1.5 rounded-lg transition-all ${activeTab === t ? 'bg-[#00d4ff]/10 text-[#00d4ff] border border-[#00d4ff]/20' : 'text-[#44445a] hover:text-[#8888aa]'}`}>
              {t}
            </button>
          ))}
        </div>
        <div className="space-y-2">
          {ENDPOINTS.map(ep => (
            <div key={ep.path} className="flex items-center gap-3 p-3 rounded-lg" style={{ background: 'rgba(255,255,255,0.02)' }}>
              <span className={`text-xs font-bold px-2 py-0.5 rounded font-mono ${ep.method === 'GET' ? 'bg-[#00ff88]/10 text-[#00ff88]' : 'bg-[#00d4ff]/10 text-[#00d4ff]'}`}>{ep.method}</span>
              <code className="text-xs font-mono text-[#7b2fff]">{ep.path}</code>
              <span className="text-xs text-[#8888aa] ml-auto">{ep.desc}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Webhooks */}
      <Card>
        <h2 className="text-sm font-bold text-[#f0f0ff] mb-4">Webhooks</h2>
        <div className="space-y-4">
          <div>
            <label className="text-xs text-[#44445a] block mb-1.5">URL de webhook</label>
            <Input placeholder="https://votre-app.com/webhooks/swaplive" value={webhookUrl} onChange={e => setWebhookUrl(e.target.value)} />
          </div>
          <div>
            <label className="text-xs text-[#44445a] block mb-2">Événements</label>
            <div className="grid grid-cols-2 gap-2">
              {EVENTS.map(ev => (
                <label key={ev} className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={activeEvents.has(ev)} onChange={e => setActiveEvents(s => { const n = new Set(s); e.target.checked ? n.add(ev) : n.delete(ev); return n })} className="accent-[#00d4ff]" />
                  <span className="text-xs font-mono text-[#8888aa]">{ev}</span>
                </label>
              ))}
            </div>
          </div>
          <Button variant="primary" size="sm">Enregistrer le webhook</Button>
        </div>
      </Card>

      {/* Limits */}
      <Card>
        <h3 className="text-sm font-bold text-[#f0f0ff] mb-3">Limites selon le plan</h3>
        <div className="grid grid-cols-3 gap-3 text-center text-xs">
          {[['1 Mois', '0 req', 'Pas d\'API'], ['6 Mois', '0 req', 'Pas d\'API'], ['1 An', '1 000/mois', '✅ API active']].map(([plan, limit, note]) => (
            <div key={plan} className="p-3 rounded-lg" style={{ background: 'rgba(255,255,255,0.02)' }}>
              <div className="font-bold text-[#f0f0ff] mb-1">{plan}</div>
              <div className="text-[#00d4ff]">{limit}</div>
              <div className="text-[#44445a] mt-0.5">{note}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

'use client'
import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

const TABS = ['Profil', 'Compte', 'Notifications', 'App Desktop', 'Apparence', 'Danger']

export default function SettingsPage() {
  const [tab, setTab] = useState('Profil')

  return (
    <div className="max-w-3xl space-y-6">
      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)} className={`text-xs px-4 py-2 rounded-lg border transition-all ${tab === t ? 'border-[#00d4ff] bg-[#00d4ff]/10 text-[#00d4ff]' : 'border-white/10 text-[#8888aa] hover:border-white/20'}`}>
            {t}
          </button>
        ))}
      </div>

      {tab === 'Profil' && (
        <Card className="space-y-4">
          <h2 className="text-sm font-bold text-[#f0f0ff]">Profil</h2>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold" style={{ background: 'linear-gradient(135deg, #00d4ff, #7b2fff)' }}>N</div>
            <Button variant="outline" size="sm">Changer la photo</Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="text-xs text-[#44445a] block mb-1.5">Prénom</label><Input defaultValue="Konan" /></div>
            <div><label className="text-xs text-[#44445a] block mb-1.5">Nom</label><Input defaultValue="Nzi" /></div>
          </div>
          <div><label className="text-xs text-[#44445a] block mb-1.5">Pseudo</label><Input defaultValue="@konan_streams" /></div>
          <div><label className="text-xs text-[#44445a] block mb-1.5">Bio</label><textarea className="w-full px-4 py-3 rounded-lg text-sm text-[#f0f0ff] border border-white/10 resize-none focus:outline-none" rows={3} style={{ background: 'rgba(255,255,255,0.05)' }} defaultValue="Streamer Twitch & TikToker" /></div>
          <Button variant="primary" size="md">Sauvegarder</Button>
        </Card>
      )}

      {tab === 'App Desktop' && (
        <Card className="space-y-4">
          <h2 className="text-sm font-bold text-[#f0f0ff]">Application Desktop</h2>
          <div className="flex items-center gap-3 p-3 rounded-lg" style={{ background: 'rgba(0,255,136,0.05)', border: '1px solid rgba(0,255,136,0.1)' }}>
            <span className="text-[#00ff88]">✅</span>
            <span className="text-sm text-[#f0f0ff]">App desktop connectée</span>
            <span className="text-xs text-[#44445a] ml-auto font-mono">v2.1.6</span>
          </div>
          <div className="space-y-3">
            {[
              ['Chemin installation', 'C:\\SwapLive\\'],
              ['GPU détecté', 'NVIDIA RTX 3060 ✅'],
              ['Provider', 'CUDA (GPU)'],
            ].map(([k, v]) => (
              <div key={k} className="flex items-center justify-between">
                <span className="text-xs text-[#44445a]">{k}</span>
                <span className="text-xs font-mono text-[#8888aa]">{v}</span>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[['Qualité par défaut', ['4K', '1080p', '720p']], ['FPS cible', ['60', '30', '24']]].map(([label, opts]) => (
              <div key={label as string}>
                <label className="text-xs text-[#44445a] block mb-1.5">{label as string}</label>
                <select className="w-full px-3 py-2 rounded-lg text-sm text-[#f0f0ff] border border-white/10" style={{ background: 'var(--bg-elevated)' }}>
                  {(opts as string[]).map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm">Mettre à jour l&apos;app</Button>
            <Button variant="ghost" size="sm">Réinstaller</Button>
          </div>
        </Card>
      )}

      {tab === 'Danger' && (
        <Card className="space-y-4 border border-red-500/10">
          <h2 className="text-sm font-bold text-red-400">Zone de danger</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 rounded-lg border border-red-500/10" style={{ background: 'rgba(239,68,68,0.03)' }}>
              <div>
                <div className="text-sm font-semibold text-[#f0f0ff]">Suspendre le compte</div>
                <div className="text-xs text-[#8888aa]">Désactive temporairement l&apos;accès</div>
              </div>
              <Button variant="danger" size="sm">Suspendre</Button>
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg border border-red-500/20" style={{ background: 'rgba(239,68,68,0.05)' }}>
              <div>
                <div className="text-sm font-semibold text-red-400">Supprimer le compte</div>
                <div className="text-xs text-[#8888aa]">Action irréversible — toutes les données seront perdues</div>
              </div>
              <Button variant="danger" size="sm">Supprimer</Button>
            </div>
          </div>
        </Card>
      )}

      {!['Profil', 'App Desktop', 'Danger'].includes(tab) && (
        <Card>
          <p className="text-sm text-[#44445a] text-center py-8">Section {tab} — En cours de développement</p>
        </Card>
      )}
    </div>
  )
}

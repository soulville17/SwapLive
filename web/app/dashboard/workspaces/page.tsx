'use client'
import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Plus, Settings, Trash2 } from 'lucide-react'

const WORKSPACES = [
  { name: '🎮 Stream Twitch', avatar: 'Warrior X', platform: 'OBS', quality: '4K 60fps', lastUsed: 'Il y a 2h' },
  { name: '📱 TikTok Lives', avatar: 'Anime Girl', platform: 'TikTok', quality: '1080p', lastUsed: 'Hier' },
  { name: '💼 Appels Pro', avatar: 'Human Pro', platform: 'Zoom', quality: 'HD', lastUsed: 'Il y a 3 jours' },
]

export default function WorkspacesPage() {
  const [spaces, setSpaces] = useState(WORKSPACES)

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black font-display text-[#f0f0ff]">Espaces de travail</h1>
          <p className="text-sm text-[#8888aa] mt-1">Configurations sauvegardées par projet</p>
        </div>
        <Button variant="primary" size="sm" className="gap-2">
          <Plus size={16} /> Créer un espace
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {spaces.map((ws, i) => (
          <Card key={ws.name} className="hover:neon-border transition-all">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-sm font-bold text-[#f0f0ff]">{ws.name}</h3>
              <span className="text-xs text-[#44445a]">{ws.lastUsed}</span>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-4 text-center">
              {[['Avatar', ws.avatar], ['Plateforme', ws.platform], ['Qualité', ws.quality]].map(([k, v]) => (
                <div key={k} className="rounded-lg p-2" style={{ background: 'rgba(255,255,255,0.02)' }}>
                  <div className="text-[10px] text-[#44445a] uppercase mb-1">{k}</div>
                  <div className="text-xs font-semibold text-[#f0f0ff]">{v}</div>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Button variant="primary" size="sm" className="flex-1">Ouvrir</Button>
              <Button variant="ghost" size="sm"><Settings size={14} /></Button>
              <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300" onClick={() => setSpaces(s => s.filter((_, j) => j !== i))}>
                <Trash2 size={14} />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

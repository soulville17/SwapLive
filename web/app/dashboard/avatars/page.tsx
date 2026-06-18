'use client'
import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Search, Heart, Upload } from 'lucide-react'
import { Input } from '@/components/ui/Input'

const CATEGORIES = ['Tous', 'Humains', 'Anime', 'Fantasy', 'Futuriste', 'Robots']
const AVATARS = [
  { name: 'Warrior X', cat: 'Fantasy', emoji: '⚔️', fav: true },
  { name: 'Anime Girl', cat: 'Anime', emoji: '✨', fav: false },
  { name: 'Human Pro', cat: 'Humains', emoji: '👔', fav: false },
  { name: 'Cyber Bot', cat: 'Robots', emoji: '🤖', fav: false },
  { name: 'Space Alien', cat: 'Futuriste', emoji: '👽', fav: false },
  { name: 'Dark Knight', cat: 'Fantasy', emoji: '🛡️', fav: false },
  { name: 'Neon Girl', cat: 'Futuriste', emoji: '💜', fav: true },
  { name: 'Samurai', cat: 'Anime', emoji: '🗡️', fav: false },
  { name: 'CEO Avatar', cat: 'Humains', emoji: '💼', fav: false },
  { name: 'Dragon', cat: 'Fantasy', emoji: '🐉', fav: false },
]

export default function AvatarsPage() {
  const [cat, setCat] = useState('Tous')
  const [search, setSearch] = useState('')
  const [favs, setFavs] = useState(new Set(AVATARS.filter(a => a.fav).map(a => a.name)))

  const filtered = AVATARS.filter(a =>
    (cat === 'Tous' || a.cat === cat) &&
    a.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="max-w-5xl space-y-6">
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#44445a]" />
          <Input placeholder="Rechercher..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setCat(c)} className={`text-xs px-3 py-1.5 rounded-full border transition-all ${cat === c ? 'border-[#00d4ff] bg-[#00d4ff]/10 text-[#00d4ff]' : 'border-white/10 text-[#8888aa] hover:border-white/20'}`}>
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {filtered.map(av => (
          <div key={av.name} className="glass-card p-4 text-center relative group cursor-pointer hover:neon-border transition-all">
            <button
              onClick={() => setFavs(f => { const n = new Set(f); n.has(av.name) ? n.delete(av.name) : n.add(av.name); return n })}
              className="absolute top-2 right-2 text-[#44445a] hover:text-[#ff2d78] transition-colors"
            >
              <Heart size={14} fill={favs.has(av.name) ? '#ff2d78' : 'none'} stroke={favs.has(av.name) ? '#ff2d78' : 'currentColor'} />
            </button>
            <div className="text-4xl mb-2">{av.emoji}</div>
            <div className="text-xs font-semibold text-[#f0f0ff]">{av.name}</div>
            <div className="text-[10px] text-[#44445a] mt-0.5">{av.cat}</div>
            <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button variant="primary" size="sm" className="w-full text-xs py-1.5">Utiliser</Button>
            </div>
          </div>
        ))}
      </div>

      {/* Upload */}
      <Card className="border-dashed border-2 border-white/10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#7b2fff]/10 flex items-center justify-center flex-shrink-0">
            <Upload size={20} className="text-[#7b2fff]" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-bold text-[#f0f0ff]">Upload ton avatar personnel</h3>
            <p className="text-xs text-[#8888aa] mt-0.5">1 photo JPG/PNG · Min 512×512px · Traitement ~30 secondes · Plan 6 Mois ou 1 An requis</p>
          </div>
          <Button variant="outline" size="sm">Uploader</Button>
        </div>
      </Card>
    </div>
  )
}

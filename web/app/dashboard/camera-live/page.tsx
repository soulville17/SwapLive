'use client'
import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Camera, RotateCcw, Maximize } from 'lucide-react'
import Link from 'next/link'

export default function CameraLivePage() {
  const [mirror, setMirror] = useState(false)
  const [overlays, setOverlays] = useState({ grid: false, landmarks: false, detection: true, fps: true })

  return (
    <div className="max-w-5xl space-y-6">
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Webcam preview */}
        <div className="lg:col-span-2">
          <Card className="p-0 overflow-hidden">
            <div className="relative aspect-video bg-[#050508] flex items-center justify-center" style={{ transform: mirror ? 'scaleX(-1)' : 'none' }}>
              <div className="text-center">
                <Camera size={48} className="text-[#44445a] mx-auto mb-3" />
                <p className="text-sm text-[#44445a]">Flux webcam en direct</p>
                <p className="text-xs text-[#44445a] mt-1">Autorise l&apos;accès à la caméra</p>
              </div>
              {overlays.fps && (
                <div className="absolute top-3 left-3 font-mono text-xs text-[#00ff88] bg-black/50 px-2 py-1 rounded">FPS: 60</div>
              )}
              <div className="absolute bottom-3 left-3 flex items-center gap-2">
                <span className="badge-live-dot" />
                <span className="text-xs text-[#00ff88] font-semibold">LIVE · 1080p</span>
              </div>
            </div>
            <div className="p-4 flex items-center justify-between border-t border-white/5">
              <span className="text-xs text-[#44445a] font-mono">FPS: 60 · 1080p · ● LIVE</span>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={() => setMirror(!mirror)} className="gap-1.5">
                  <RotateCcw size={14} /> Miroir
                </Button>
                <Button variant="ghost" size="sm" className="gap-1.5">
                  <Camera size={14} /> Snapshot
                </Button>
                <Button variant="ghost" size="sm"><Maximize size={14} /></Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Controls */}
        <div className="space-y-4">
          <Card>
            <h3 className="text-sm font-bold text-[#f0f0ff] mb-4">Contrôles</h3>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-[#8888aa] block mb-1.5">Caméra</label>
                <select className="w-full px-3 py-2 rounded-lg text-sm text-[#f0f0ff] border border-white/10 focus:outline-none" style={{ background: 'var(--bg-elevated)' }}>
                  <option>HD Pro Webcam</option>
                  <option>Caméra intégrée</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-[#8888aa] block mb-1.5">Résolution</label>
                <select className="w-full px-3 py-2 rounded-lg text-sm text-[#f0f0ff] border border-white/10 focus:outline-none" style={{ background: 'var(--bg-elevated)' }}>
                  <option>1080p</option><option>4K</option><option>720p</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-[#8888aa] block mb-1.5">FPS</label>
                <select className="w-full px-3 py-2 rounded-lg text-sm text-[#f0f0ff] border border-white/10 focus:outline-none" style={{ background: 'var(--bg-elevated)' }}>
                  <option>60</option><option>30</option><option>24</option>
                </select>
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="text-sm font-bold text-[#f0f0ff] mb-3">Overlays</h3>
            <div className="space-y-2">
              {(Object.keys(overlays) as Array<keyof typeof overlays>).map(key => (
                <label key={key} className="flex items-center justify-between cursor-pointer">
                  <span className="text-sm text-[#8888aa] capitalize">{key === 'fps' ? 'FPS Counter' : key === 'detection' ? 'Détection auto' : key === 'landmarks' ? 'Landmarks visage' : 'Grille'}</span>
                  <input type="checkbox" checked={overlays[key]} onChange={e => setOverlays(o => ({ ...o, [key]: e.target.checked }))} className="accent-[#00d4ff]" />
                </label>
              ))}
            </div>
          </Card>

          <Link href="/dashboard/live-swap">
            <Button variant="primary" size="md" className="w-full">→ Aller à Live Swap</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

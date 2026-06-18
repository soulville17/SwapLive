'use client'
import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Repeat2, Zap } from 'lucide-react'

export default function LiveSwapPage() {
  const [running, setRunning] = useState(false)
  const [opts, setOpts] = useState({ mouthMask: true, faceEnhancer: true, manyFaces: false, liveMirror: false })
  const points = 823
  const maxPoints = 3000
  const pct = Math.round((points / maxPoints) * 100)

  return (
    <div className="max-w-5xl space-y-6">
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Split view */}
        <div className="lg:col-span-2">
          <Card className="p-0 overflow-hidden">
            <div className="grid grid-cols-2 gap-0.5 bg-black">
              {['Webcam originale', 'Transformé IA'].map((label, i) => (
                <div key={label} className="aspect-video flex items-center justify-center relative" style={{ background: i === 1 ? 'linear-gradient(135deg, #0d1a1f, #0d0d20)' : '#050508' }}>
                  {i === 1 && <div className="absolute inset-0 opacity-10" style={{ background: 'linear-gradient(135deg, #00d4ff, #7b2fff)' }} />}
                  <div className="text-center relative z-10">
                    <div className="text-3xl mb-2">{i === 0 ? '🎥' : '🎭'}</div>
                    <div className="text-xs" style={{ color: i === 0 ? '#44445a' : '#00d4ff' }}>{label}</div>
                  </div>
                  {running && i === 1 && (
                    <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/40 rounded px-2 py-0.5">
                      <span className="badge-live-dot" />
                      <span className="text-[10px] text-[#00ff88]">LIVE</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="p-4 flex items-center justify-between border-t border-white/5">
              <span className="text-xs font-mono text-[#8888aa]">
                {running ? '● LIVE · 00:04:23 · FPS: 60 · Latence: 8ms' : 'En attente...'}
              </span>
              <span className="text-xs text-[#7b2fff] font-mono">{points} pts restants</span>
            </div>
          </Card>
        </div>

        {/* Controls */}
        <div className="space-y-4">
          <Card>
            <h3 className="text-xs font-bold text-[#44445a] uppercase tracking-wider mb-3">Avatar actuel</h3>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-[#1a1a2e] flex items-center justify-center text-xl">🎭</div>
              <div>
                <div className="text-sm font-semibold text-[#f0f0ff]">Warrior X</div>
                <div className="text-xs text-[#8888aa]">Fantasy · 4K</div>
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full">Changer d&apos;avatar →</Button>
          </Card>

          <Button
            variant={running ? 'danger' : 'primary'}
            size="lg"
            className={`w-full text-base py-4 ${running ? '' : 'gap-2'}`}
            onClick={() => setRunning(!running)}
          >
            {running ? '⏹ ARRÊTER SWAP' : <><Repeat2 size={18} /> DÉMARRER SWAP</>}
          </Button>

          <Card>
            <h3 className="text-xs font-bold text-[#44445a] uppercase tracking-wider mb-3">Options Deep-Live-Cam</h3>
            <div className="space-y-2.5">
              {(Object.keys(opts) as Array<keyof typeof opts>).map(key => (
                <label key={key} className="flex items-center justify-between cursor-pointer">
                  <span className="text-sm text-[#8888aa]">{key === 'mouthMask' ? 'Mouth Mask' : key === 'faceEnhancer' ? 'Face Enhancer' : key === 'manyFaces' ? 'Many Faces' : 'Live Mirror'}</span>
                  <input type="checkbox" checked={opts[key]} onChange={e => setOpts(o => ({ ...o, [key]: e.target.checked }))} className="accent-[#00d4ff]" />
                </label>
              ))}
            </div>
          </Card>

          <Card>
            <h3 className="text-xs font-bold text-[#44445a] uppercase tracking-wider mb-3">Caméra Virtuelle</h3>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[#00ff88]">✅</span>
              <span className="text-sm text-[#f0f0ff]">SwapLive Camera</span>
            </div>
            <p className="text-xs text-[#44445a]">Sélectionne dans OBS, Zoom ou Discord</p>
          </Card>

          <Card>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-[#44445a] uppercase tracking-wider flex items-center gap-1"><Zap size={12} /> Points</span>
              <span className="text-xs font-mono text-[#f0f0ff]">{points} pts</span>
            </div>
            <div className="h-2 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: 'linear-gradient(90deg, #00d4ff, #7b2fff)' }} />
            </div>
            <p className="text-xs text-[#44445a] mt-1.5">~{Math.floor(points / 60)}h{String(Math.floor((points % 60) / 1)).padStart(2, '0')}min restantes</p>
          </Card>
        </div>
      </div>
    </div>
  )
}

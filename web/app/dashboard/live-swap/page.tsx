'use client'
import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Repeat2, Zap, AlertTriangle, XCircle } from 'lucide-react'
import { usePoints } from '@/lib/hooks/use-points'

export default function LiveSwapPage() {
  const [opts, setOpts] = useState({ mouthMask: true, faceEnhancer: true, manyFaces: false, liveMirror: false })
  const { balance, isRunning, percentage, alertLevel, estimatedMinutes, startConsuming, stopConsuming } = usePoints(3000)

  function toggleSwap() {
    if (isRunning) stopConsuming()
    else startConsuming()
  }

  const barColor = alertLevel === 'empty' ? '#44445a' : alertLevel === 'critical' ? '#ff2d78' : alertLevel === 'low' ? '#ff9500' : 'linear-gradient(90deg, #00d4ff, #7b2fff)'

  return (
    <div className="max-w-5xl space-y-6">
      {alertLevel === 'critical' && balance > 0 && (
        <div className="flex items-center gap-3 p-3 rounded-xl border border-[#ff2d78]/30 bg-[#ff2d78]/10 text-sm text-[#ff2d78]">
          <XCircle size={16} /> <span>⚠️ Moins de 10% de points restants ! <strong>Recharge maintenant</strong></span>
        </div>
      )}
      {alertLevel === 'low' && (
        <div className="flex items-center gap-3 p-3 rounded-xl border border-orange-500/30 bg-orange-500/10 text-sm text-orange-400">
          <AlertTriangle size={16} /> <span>Points à 30% — pense à recharger bientôt.</span>
        </div>
      )}
      {alertLevel === 'empty' && (
        <div className="flex items-center gap-3 p-3 rounded-xl border border-[#44445a]/30 bg-[#44445a]/10 text-sm text-[#8888aa]">
          <XCircle size={16} /> <span>Plus de points ! Recharge pour continuer.</span>
        </div>
      )}

      <div className="grid lg:grid-cols-4 gap-6 items-start">
        {/* Split view */}
        <div className="lg:col-span-3">
          <Card className="p-0 overflow-hidden">
            <div className="grid grid-cols-2 gap-0.5 bg-black">
              {['Webcam originale', 'Transformé IA'].map((label, i) => (
                <div key={label} className="flex items-center justify-center relative" style={{ background: i === 1 ? 'linear-gradient(135deg, #0d1a1f, #0d0d20)' : '#050508', minHeight: '450px', height: '70vh' }}>
                  {i === 1 && <div className="absolute inset-0 opacity-10" style={{ background: 'linear-gradient(135deg, #00d4ff, #7b2fff)' }} />}
                  <div className="text-center relative z-10">
                    <div className="text-3xl mb-2">{i === 0 ? '🎥' : '🎭'}</div>
                    <div className="text-xs" style={{ color: i === 0 ? '#44445a' : '#00d4ff' }}>{label}</div>
                  </div>
                  {isRunning && i === 1 && (
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
                {isRunning ? '● LIVE · FPS: 60 · Latence: 8ms' : 'En attente...'}
              </span>
              <span className="text-xs font-mono" style={{ color: alertLevel === 'critical' ? '#ff2d78' : alertLevel === 'low' ? '#ff9500' : '#7b2fff' }}>
                {balance} pts restants
              </span>
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
            variant={isRunning ? 'danger' : 'primary'}
            size="lg"
            className="w-full text-base py-4"
            onClick={toggleSwap}
            disabled={alertLevel === 'empty'}
          >
            {isRunning ? '⏹ ARRÊTER SWAP' : <span className="flex items-center gap-2 justify-center"><Repeat2 size={18} /> DÉMARRER SWAP</span>}
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
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[#00ff88]">✅</span>
              <span className="text-sm text-[#f0f0ff]">SwapLive Camera</span>
            </div>
            <p className="text-xs text-[#44445a]">Sélectionne dans OBS, Zoom ou Discord</p>
          </Card>

          <Card>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-[#44445a] uppercase tracking-wider flex items-center gap-1"><Zap size={12} /> Points</span>
              <span className="text-xs font-mono text-[#f0f0ff]">{balance} pts</span>
            </div>
            <div className="h-2 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${percentage}%`, background: typeof barColor === 'string' && barColor.startsWith('linear') ? barColor : barColor }} />
            </div>
            <p className="text-xs text-[#44445a] mt-1.5">~{estimatedMinutes}min restantes</p>
          </Card>
        </div>
      </div>
    </div>
  )
}

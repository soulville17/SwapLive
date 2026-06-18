'use client'
import { useState, useEffect, useRef } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Repeat2, Settings2, ChevronDown, ChevronUp } from 'lucide-react'
import { usePoints } from '@/lib/hooks/use-points'

export default function LiveSwapPage() {
  const [opts, setOpts] = useState({ mouthMask: true, faceEnhancer: true, manyFaces: false, liveMirror: false })
  const [showOptions, setShowOptions] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const { balance, isRunning, percentage, alertLevel, startConsuming, stopConsuming } = usePoints(3000)

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => setElapsed(e => e + 1), 1000)
    } else {
      if (timerRef.current) clearInterval(timerRef.current)
      setElapsed(0)
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [isRunning])

  function fmt(s: number) {
    const m = Math.floor(s / 60)
    const sec = s % 60
    return `${m}:${sec.toString().padStart(2, '0')}`
  }

  function toggleSwap() {
    if (isRunning) stopConsuming()
    else startConsuming()
  }

  const ptsUsed = 3000 - balance

  return (
    <div className="max-w-6xl space-y-4">
      {/* Two-panel video frames */}
      <div className="grid grid-cols-2 gap-1 rounded-2xl overflow-hidden" style={{ background: '#000' }}>
        {/* Original */}
        <div className="relative flex items-center justify-center" style={{ background: '#050508', minHeight: '55vh' }}>
          <div className="text-center">
            <div className="text-4xl mb-2">🎥</div>
            <div className="text-xs" style={{ color: '#44445a' }}>Webcam originale</div>
          </div>
          <div className="absolute top-3 left-3 text-xs font-mono px-2 py-0.5 rounded" style={{ background: 'rgba(0,0,0,0.6)', color: '#8888aa' }}>
            ORIGINAL
          </div>
        </div>

        {/* Transformed */}
        <div className="relative flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0d1a1f, #0d0d20)', minHeight: '55vh' }}>
          <div className="absolute inset-0 opacity-10" style={{ background: 'linear-gradient(135deg, #00d4ff, #7b2fff)' }} />
          <div className="text-center relative z-10">
            <div className="text-4xl mb-2">🎭</div>
            <div className="text-xs" style={{ color: '#00d4ff' }}>Transformé IA</div>
          </div>
          <div className="absolute top-3 left-3 text-xs font-mono px-2 py-0.5 rounded" style={{ background: 'rgba(0,0,0,0.6)', color: '#00d4ff' }}>
            IA SWAP
          </div>
          {isRunning && (
            <div className="absolute top-3 right-3 flex items-center gap-1 rounded px-2 py-0.5" style={{ background: 'rgba(0,0,0,0.5)' }}>
              <span className="badge-live-dot" />
              <span className="text-[11px] font-bold" style={{ color: '#00ff88' }}>LIVE</span>
            </div>
          )}
        </div>
      </div>

      {/* Status bar */}
      <div className="flex items-center justify-between px-4 py-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${isRunning ? 'bg-[#00ff88]' : 'bg-[#44445a]'}`} style={isRunning ? { boxShadow: '0 0 6px #00ff88' } : {}} />
            <span className="text-sm font-semibold" style={{ color: isRunning ? '#00ff88' : '#44445a' }}>
              {isRunning ? 'En direct' : 'Arrêté'}
            </span>
          </div>
          {isRunning && (
            <>
              <span className="text-sm font-mono" style={{ color: '#f0f0ff' }}>⏱ {fmt(elapsed)}</span>
              <span className="text-sm" style={{ color: '#8888aa' }}>{ptsUsed} pts utilisés</span>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#00ff88]" style={{ boxShadow: '0 0 6px #00ff88' }} />
                <span className="text-sm" style={{ color: '#00ff88' }}>Connexion stable</span>
              </div>
            </>
          )}
          {!isRunning && (
            <span className="text-sm" style={{ color: '#44445a' }}>{balance} pts restants</span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm" style={{ color: '#8888aa' }}>Avatar : <strong style={{ color: '#f0f0ff' }}>Warrior X</strong></span>
          {isRunning && (
            <div className="h-1.5 w-24 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
              <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${percentage}%`, background: alertLevel === 'critical' ? '#ff2d78' : alertLevel === 'low' ? '#ff9500' : 'linear-gradient(90deg,#00d4ff,#7b2fff)' }} />
            </div>
          )}
        </div>
      </div>

      {/* Main action button */}
      <button
        onClick={toggleSwap}
        disabled={alertLevel === 'empty'}
        className="w-full py-5 rounded-2xl font-bold text-lg tracking-wide transition-all duration-200 active:scale-[0.99]"
        style={
          alertLevel === 'empty'
            ? { background: '#1a1a2e', color: '#44445a', cursor: 'not-allowed' }
            : isRunning
            ? { background: 'linear-gradient(135deg, #ff2d78, #ff6b00)', color: '#fff', boxShadow: '0 4px 24px rgba(255,45,120,0.35)' }
            : { background: 'linear-gradient(135deg, #00d4ff, #7b2fff)', color: '#fff', boxShadow: '0 4px 24px rgba(0,212,255,0.3)' }
        }
      >
        {isRunning
          ? '⏹  ARRÊTER LE SWAP'
          : <span className="flex items-center gap-2 justify-center"><Repeat2 size={20} /> DÉMARRER LE SWAP</span>
        }
      </button>

      {/* Options toggle */}
      <button
        onClick={() => setShowOptions(v => !v)}
        className="flex items-center gap-2 text-sm w-full justify-center py-2 rounded-xl transition-colors"
        style={{ color: '#8888aa', background: 'rgba(255,255,255,0.03)' }}
      >
        <Settings2 size={14} />
        Options avancées
        {showOptions ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>

      {showOptions && (
        <div className="grid sm:grid-cols-2 gap-4">
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
        </div>
      )}

      {alertLevel === 'empty' && (
        <div className="flex items-center gap-3 p-3 rounded-xl border border-[#44445a]/30 bg-[#44445a]/10 text-sm text-[#8888aa]">
          Plus de points ! Recharge pour continuer.
        </div>
      )}
    </div>
  )
}

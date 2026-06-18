import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Download, Play } from 'lucide-react'

const PLATFORMS = ['OBS', 'Twitch', 'YouTube', 'TikTok', 'Discord', 'Zoom', 'WhatsApp', 'Teams']
const STATS = [{ icon: '⚡', label: '<10ms latence' }, { icon: '🔒', label: '100% local' }, { icon: '🎭', label: '500+ avatars' }]

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-16 grid-bg overflow-hidden" style={{ background: 'var(--bg-void)' }}>
      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[120px] opacity-20" style={{ background: '#00d4ff' }} />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-[120px] opacity-15" style={{ background: '#7b2fff' }} />

      <div className="relative max-w-7xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <Badge variant="live" className="mb-6">DEEPFAKE EN TEMPS RÉEL · PROPULSÉ PAR IA</Badge>

            <h1 className="text-5xl lg:text-7xl font-black leading-none mb-6 font-display text-[#f0f0ff] uppercase tracking-tight">
              DEVIENS<br />
              <span className="gradient-text">QUI TU VEUX,</span><br />
              EN DIRECT.
            </h1>

            <p className="text-lg text-[#8888aa] mb-8 leading-relaxed max-w-lg">
              SwapLive transforme ton visage et ton corps entier en temps réel pendant tes streams, appels vidéo et lives. <strong className="text-[#f0f0ff]">1 seule photo. 3 clics. Résultat instantané.</strong>
            </p>

            <div className="flex items-center gap-2 mb-8 text-sm text-[#8888aa]">
              <span className="text-yellow-400">★★★★★</span>
              <span>· 15 000+ utilisateurs · #1 sur GitHub</span>
            </div>

            <div className="flex flex-wrap gap-4 mb-10">
              <Link href="/download">
                <Button variant="primary" size="lg" className="gap-2">
                  <Download size={18} /> Télécharger SwapLive — Gratuit
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="gap-2">
                <Play size={16} /> Voir la démo
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-[#44445a]">Compatible :</span>
              {PLATFORMS.map(p => (
                <span key={p} className="text-xs px-2 py-1 rounded bg-white/5 text-[#8888aa] border border-white/5">{p}</span>
              ))}
            </div>
          </div>

          {/* Right — Mockup */}
          <div className="relative">
            <div className="glass-card neon-border p-1 rounded-2xl overflow-hidden">
              <div className="bg-[#0d0d14] rounded-xl overflow-hidden">
                {/* App header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/60" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                    <div className="w-3 h-3 rounded-full bg-green-500/60" />
                  </div>
                  <span className="text-xs text-[#8888aa] font-mono">SwapLive Engine v2.1.6</span>
                  <div className="flex items-center gap-1.5 text-xs text-[#00ff88]">
                    <span className="badge-live-dot" /> LIVE
                  </div>
                </div>
                {/* Split view */}
                <div className="grid grid-cols-2 gap-0.5 p-4">
                  <div className="aspect-video bg-[#13131f] rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl mb-2">🎥</div>
                      <div className="text-xs text-[#44445a]">Webcam originale</div>
                    </div>
                  </div>
                  <div className="aspect-video rounded-lg flex items-center justify-center relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0d1a1f, #0d0d20)' }}>
                    <div className="absolute inset-0 opacity-20" style={{ background: 'linear-gradient(135deg, #00d4ff22, #7b2fff22)' }} />
                    <div className="text-center relative z-10">
                      <div className="text-4xl mb-2">🎭</div>
                      <div className="text-xs text-[#00d4ff]">Transformé IA</div>
                    </div>
                    <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/40 rounded px-2 py-0.5">
                      <span className="badge-live-dot w-1.5 h-1.5" />
                      <span className="text-[10px] text-[#00ff88]">60 FPS</span>
                    </div>
                  </div>
                </div>
                {/* Stats bar */}
                <div className="flex items-center justify-between px-4 pb-4 text-xs text-[#8888aa] font-mono">
                  <span>FPS: <span className="text-[#00ff88]">60</span></span>
                  <span>Latence: <span className="text-[#00d4ff]">8ms</span></span>
                  <span>Points: <span className="text-[#7b2fff]">823</span></span>
                  <span className="text-[#00d4ff]">● LIVE 04:23</span>
                </div>
              </div>
            </div>

            {/* Floating stats */}
            <div className="flex gap-3 mt-4 justify-center flex-wrap">
              {STATS.map(s => (
                <div key={s.label} className="glass-card px-4 py-2.5 flex items-center gap-2">
                  <span>{s.icon}</span>
                  <span className="text-xs font-semibold text-[#f0f0ff]">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

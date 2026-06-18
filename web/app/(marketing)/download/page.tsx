import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Monitor, Apple, Download, CheckCircle2, Cpu, MemoryStick, HardDrive } from 'lucide-react'

const STEPS = [
  { n: '01', title: 'Télécharge l\'installeur', desc: 'Clique sur le bouton correspondant à ton système.' },
  { n: '02', title: 'Lance l\'installation', desc: 'Double-clique sur le fichier téléchargé. L\'app installe Deep-Live-Cam et les modèles IA automatiquement (~2 min).' },
  { n: '03', title: 'Démarre SwapLive', desc: 'Lance SwapLive.bat (Windows) ou SwapLive.command (Mac). L\'API démarre sur localhost:8765.' },
  { n: '04', title: 'Ouvre le dashboard', desc: 'Va sur swaplive.io et connecte-toi. Le dashboard détecte automatiquement l\'app desktop.' },
]

const REQUIREMENTS = [
  { icon: Monitor, label: 'OS', value: 'Windows 10/11 ou macOS 12+' },
  { icon: MemoryStick, label: 'RAM', value: '8 GB minimum (16 GB recommandé)' },
  { icon: Cpu, label: 'CPU', value: 'Intel i5 / AMD Ryzen 5 ou supérieur' },
  { icon: HardDrive, label: 'Stockage', value: '5 GB espace libre (modèles IA)' },
]

export default function DownloadPage() {
  return (
    <div className="min-h-screen grid-bg" style={{ background: 'var(--bg-primary)' }}>
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-white/5">
        <Link href="/" className="flex items-center gap-2 font-black text-xl">
          <span className="text-[#00d4ff]">⬡</span>
          <span className="text-[#f0f0ff]">Swap</span><span className="gradient-text">Live</span>
        </Link>
        <Link href="/dashboard"><Button variant="primary" size="sm">Dashboard →</Button></Link>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-20 space-y-16">
        {/* Hero */}
        <div className="text-center space-y-4">
          <span className="text-xs font-bold px-3 py-1.5 rounded-full border border-[#00d4ff]/20 bg-[#00d4ff]/5 text-[#00d4ff]">APPLICATION DESKTOP v2.1.6</span>
          <h1 className="text-5xl font-black font-display text-[#f0f0ff]">Télécharge <span className="gradient-text">SwapLive</span></h1>
          <p className="text-lg text-[#8888aa] max-w-xl mx-auto">Le moteur Deep-Live-Cam tourne localement sur ton PC. Aucune vidéo envoyée sur nos serveurs.</p>
        </div>

        {/* Download buttons */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card glow className="text-center p-8 space-y-4">
            <Monitor size={40} className="text-[#00d4ff] mx-auto" />
            <h2 className="text-xl font-black text-[#f0f0ff]">Windows</h2>
            <p className="text-sm text-[#8888aa]">Windows 10 / 11 · 64-bit</p>
            <Button variant="primary" size="lg" className="w-full gap-2">
              <Download size={18} /> Télécharger pour Windows
            </Button>
            <p className="text-xs text-[#44445a]">SwapLive-Setup-2.1.6.exe · ~150 MB</p>
          </Card>

          <Card className="text-center p-8 space-y-4">
            <Apple size={40} className="text-[#8888aa] mx-auto" />
            <h2 className="text-xl font-black text-[#f0f0ff]">macOS</h2>
            <p className="text-sm text-[#8888aa]">macOS 12 Monterey ou supérieur</p>
            <Button variant="outline" size="lg" className="w-full gap-2">
              <Download size={18} /> Télécharger pour Mac
            </Button>
            <p className="text-xs text-[#44445a]">SwapLive-2.1.6.dmg · ~150 MB</p>
          </Card>
        </div>

        {/* Install steps */}
        <div>
          <h2 className="text-2xl font-black font-display text-[#f0f0ff] text-center mb-8">Installation en 4 étapes</h2>
          <div className="space-y-4">
            {STEPS.map(s => (
              <div key={s.n} className="flex gap-5 items-start">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center font-black font-mono text-lg flex-shrink-0" style={{ background: 'linear-gradient(135deg, rgba(0,212,255,0.1), rgba(123,47,255,0.1))', border: '1px solid rgba(0,212,255,0.15)' }}>
                  <span className="gradient-text">{s.n}</span>
                </div>
                <div className="pt-1">
                  <h3 className="text-sm font-bold text-[#f0f0ff]">{s.title}</h3>
                  <p className="text-sm text-[#8888aa] mt-0.5">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Requirements */}
        <Card>
          <h2 className="text-lg font-black font-display text-[#f0f0ff] mb-6">Configuration requise</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {REQUIREMENTS.map(r => (
              <div key={r.label} className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#00d4ff]/5 border border-[#00d4ff]/10 flex items-center justify-center flex-shrink-0">
                  <r.icon size={18} className="text-[#00d4ff]" />
                </div>
                <div>
                  <div className="text-xs text-[#44445a]">{r.label}</div>
                  <div className="text-sm text-[#f0f0ff]">{r.value}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 rounded-lg bg-[#00ff88]/5 border border-[#00ff88]/10 flex items-start gap-2">
            <CheckCircle2 size={16} className="text-[#00ff88] flex-shrink-0 mt-0.5" />
            <p className="text-xs text-[#8888aa]"><strong className="text-[#00ff88]">GPU optionnel</strong> — Une carte NVIDIA avec CUDA améliore la qualité et le FPS. Sans GPU, le mode CPU fonctionne parfaitement (30 FPS).</p>
          </div>
        </Card>
      </div>
    </div>
  )
}

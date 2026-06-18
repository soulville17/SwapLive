'use client'
import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Upload, Download, RefreshCw } from 'lucide-react'

const STYLES = ['Parle naturellement', 'Chante', 'Danse', 'Cligne des yeux', 'Sourit', 'Tourne la tête']
const HISTORY = [
  { style: 'Parle naturellement', duration: '10s', quality: '4K', pts: 20, status: 'done' },
  { style: 'Danse', duration: '30s', quality: '1080p', pts: 60, status: 'done' },
]

export default function PhotoToVideoPage() {
  const [step, setStep] = useState(1)
  const [selectedStyle, setSelectedStyle] = useState('')

  return (
    <div className="max-w-3xl space-y-6">
      {/* Stepper */}
      <div className="flex items-center gap-2">
        {['Upload photo', 'Choisir style', 'Télécharger'].map((s, i) => (
          <div key={s} className="flex items-center gap-2 flex-1">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${step > i ? 'bg-[#00ff88] text-black' : step === i + 1 ? 'border-2 border-[#00d4ff] text-[#00d4ff]' : 'border border-white/20 text-[#44445a]'}`}>
              {step > i + 1 ? '✓' : i + 1}
            </div>
            <span className={`text-xs ${step === i + 1 ? 'text-[#f0f0ff]' : 'text-[#44445a]'}`}>{s}</span>
            {i < 2 && <div className="flex-1 h-px bg-white/10" />}
          </div>
        ))}
      </div>

      {step === 1 && (
        <Card className="py-16 text-center border-dashed border-2 border-white/10 hover:border-[#00d4ff]/30 transition-colors cursor-pointer">
          <Upload size={40} className="text-[#44445a] mx-auto mb-4" />
          <p className="text-sm text-[#f0f0ff] mb-1">Glisse ta photo ici</p>
          <p className="text-xs text-[#44445a] mb-4">JPG, PNG · Min 512×512px</p>
          <Button variant="outline" size="sm" onClick={() => setStep(2)}>Sélectionner un fichier</Button>
        </Card>
      )}

      {step === 2 && (
        <Card className="space-y-6">
          <h3 className="text-sm font-bold text-[#f0f0ff]">Choisis le style d&apos;animation</h3>
          <div className="grid grid-cols-3 gap-3">
            {STYLES.map(s => (
              <button key={s} onClick={() => setSelectedStyle(s)} className={`p-3 rounded-xl text-xs font-medium transition-all border ${selectedStyle === s ? 'border-[#00d4ff] bg-[#00d4ff]/10 text-[#00d4ff]' : 'border-white/10 text-[#8888aa] hover:border-white/20'}`}>
                {s}
              </button>
            ))}
          </div>
          <div className="flex gap-4 flex-wrap">
            {['5s', '10s', '30s'].map(d => (
              <label key={d} className="flex items-center gap-2 text-sm text-[#8888aa] cursor-pointer">
                <input type="radio" name="duration" value={d} className="accent-[#00d4ff]" /> {d}
              </label>
            ))}
          </div>
          <div className="flex gap-3">
            <Button variant="ghost" size="sm" onClick={() => setStep(1)}>← Retour</Button>
            <Button variant="primary" size="md" onClick={() => setStep(3)} disabled={!selectedStyle}>
              Générer la vidéo (~20 pts)
            </Button>
          </div>
        </Card>
      )}

      {step === 3 && (
        <Card className="space-y-4">
          <div className="aspect-video bg-[#050508] rounded-xl flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-3">🎬</div>
              <p className="text-sm text-[#00d4ff]">Vidéo générée avec succès !</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="primary" size="md" className="gap-2 flex-1"><Download size={16} /> Télécharger MP4</Button>
            <Button variant="outline" size="md" className="gap-2" onClick={() => setStep(1)}><RefreshCw size={16} /> Regénérer</Button>
          </div>
        </Card>
      )}

      {/* History */}
      <Card>
        <h3 className="text-sm font-bold text-[#f0f0ff] mb-4">Historique</h3>
        <div className="space-y-2">
          {HISTORY.map((h, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-lg" style={{ background: 'rgba(255,255,255,0.02)' }}>
              <div>
                <div className="text-sm text-[#f0f0ff]">{h.style}</div>
                <div className="text-xs text-[#8888aa]">{h.duration} · {h.quality} · -{h.pts} pts</div>
              </div>
              <Button variant="ghost" size="sm" className="gap-1"><Download size={12} /> MP4</Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

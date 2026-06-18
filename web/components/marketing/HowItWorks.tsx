import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Download } from 'lucide-react'

const STEPS = [
  {
    num: '01',
    title: 'TÉLÉCHARGE SWAPLIVE',
    desc: "Installe l'application gratuite sur Windows ou Mac. Configuration automatique en 2 minutes.",
    cta: { label: 'Télécharger', href: '/download' },
  },
  {
    num: '02',
    title: 'CHOISIS TON AVATAR',
    desc: '1 seule photo suffit. Sélectionne parmi 500+ avatars ou uploade ton propre personnage.',
    cta: null,
  },
  {
    num: '03',
    title: 'STREAM EN DIRECT',
    desc: "Sélectionne 'SwapLive Camera' dans OBS, Zoom ou Discord. Tu apparais transformé. Ton vrai visage reste caché.",
    cta: null,
  },
]

export function HowItWorks() {
  return (
    <section className="py-24 px-6 grid-bg" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black font-display text-[#f0f0ff] uppercase mb-4">
            3 ÉTAPES POUR <span className="gradient-text">DEVENIR N&apos;IMPORTE QUI</span>
          </h2>
          <p className="text-[#8888aa]">De l&apos;installation au premier stream en moins de 5 minutes.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-8 left-1/6 right-1/6 h-px" style={{ background: 'linear-gradient(90deg, transparent, #00d4ff33, #7b2fff33, transparent)' }} />

          {STEPS.map((step) => (
            <div key={step.num} className="text-center relative">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-black font-mono text-[#00d4ff]" style={{ background: 'rgba(0,212,255,0.1)', border: '2px solid rgba(0,212,255,0.3)' }}>
                {step.num}
              </div>
              <h3 className="text-sm font-bold text-[#f0f0ff] mb-3 tracking-wider">{step.title}</h3>
              <p className="text-sm text-[#8888aa] leading-relaxed mb-6">{step.desc}</p>
              {step.cta && (
                <Link href={step.cta.href}>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Download size={14} /> {step.cta.label}
                  </Button>
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

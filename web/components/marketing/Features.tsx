import { Card } from '@/components/ui/Card'

const FEATURES = [
  { icon: '⚡', title: 'TEMPS RÉEL <10ms', desc: 'Deep-Live-Cam tourne à 30-60 FPS directement sur ton PC. Zéro délai. Zéro lag.' },
  { icon: '🎭', title: '1 SEULE PHOTO', desc: "Pas besoin d'entraîner un modèle. 1 photo = 1 avatar prêt en quelques secondes." },
  { icon: '👄', title: 'MOUTH MASK', desc: "Tes lèvres bougent naturellement avec l'avatar. Synchronisation parfaite." },
  { icon: '🧠', title: 'FACE ENHANCER IA', desc: 'Amélioration automatique de la qualité du swap grâce au Face Enhancer intégré.' },
  { icon: '📷', title: 'MANY FACES', desc: 'Transforme plusieurs visages simultanément dans la même scène.' },
  { icon: '🔒', title: '100% LOCAL', desc: 'Tout tourne sur ton PC. Aucune vidéo envoyée sur nos serveurs. Vie privée garantie.' },
]

export function Features() {
  return (
    <section id="features" className="py-24 px-6" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black font-display text-[#f0f0ff] mb-4 uppercase">
            Tout ce dont tu as besoin pour<br />
            <span className="gradient-text">streamer sans montrer ton vrai visage</span>
          </h2>
          <p className="text-[#8888aa] max-w-xl mx-auto">La technologie deepfake #1 mondial, emballée dans une interface simple et rapide.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map(f => (
            <Card key={f.title} className="hover:neon-border transition-all duration-300 group">
              <div className="text-3xl mb-4">{f.icon}</div>
              <h3 className="text-sm font-bold text-[#f0f0ff] mb-2 tracking-wide">{f.title}</h3>
              <p className="text-sm text-[#8888aa] leading-relaxed">{f.desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

'use client'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const FAQS = [
  { q: "Comment SwapLive fonctionne-t-il ?", a: "SwapLive installe Deep-Live-Cam sur ton PC. Tu fournis 1 seule photo d'avatar, et l'IA transforme ton visage en temps réel via une caméra virtuelle que toutes les apps détectent." },
  { q: "Ai-je besoin d'un GPU puissant ?", a: "Non. Un CPU suffit pour commencer (i5/Ryzen 5 minimum). Un GPU (NVIDIA/AMD) améliore la qualité et les FPS, mais n'est pas obligatoire." },
  { q: "Quelle est la configuration PC minimale ?", a: "Windows 10/11 ou macOS 12+ · 8 GB RAM · Processeur i5/Ryzen 5 ou équivalent · 4 GB d'espace disque." },
  { q: "Quelles applications sont compatibles ?", a: "Toute application qui accepte une webcam : OBS, Zoom, Discord, Teams, Twitch, TikTok, Instagram Live, WhatsApp et bien plus." },
  { q: "Mon vrai visage est-il protégé ?", a: "Oui. Tout le traitement se fait 100% localement sur ton PC. Aucune vidéo ou image n'est envoyée sur nos serveurs." },
  { q: "C'est quoi les points ?", a: "Les points sont tes crédits de transformation. 1 point = 1 seconde de Live Swap. 1 point = 0,5 seconde de Photo en Vidéo. Les packs de recharge n'expirent jamais." },
  { q: "Comment installer la caméra virtuelle ?", a: "Le guide est intégré dans l'application. OBS Virtual Cam est configuré automatiquement à l'installation." },
  { q: "Puis-je uploader mon propre avatar ?", a: "Oui, avec le plan 6 Mois (5 avatars perso) ou 1 An (illimité). Une seule photo JPG/PNG de 512x512px minimum suffit." },
  { q: "Est-ce légal ?", a: "Oui pour le streaming, le divertissement et l'anonymat. Interdit pour la fraude ou l'usurpation d'identité. SwapLive est destiné uniquement à un usage créatif et légal." },
  { q: "Comment fonctionne le remboursement ?", a: "Garantie satisfait ou remboursé 14 jours. Aucune question posée. Demande par email et remboursement sous 5 jours ouvrés." },
]

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section id="faq" className="py-24 px-6" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black font-display text-[#f0f0ff] uppercase mb-4">
            QUESTIONS <span className="gradient-text">FRÉQUENTES</span>
          </h2>
        </div>
        <div className="space-y-2">
          {FAQS.map((faq, i) => (
            <div key={i} className="glass-card overflow-hidden">
              <button
                className="w-full flex items-center justify-between p-5 text-left"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="font-semibold text-sm text-[#f0f0ff]">{faq.q}</span>
                <ChevronDown size={16} className={`text-[#00d4ff] flex-shrink-0 transition-transform ${open === i ? 'rotate-180' : ''}`} />
              </button>
              {open === i && (
                <div className="px-5 pb-5 text-sm text-[#8888aa] leading-relaxed border-t border-white/5 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

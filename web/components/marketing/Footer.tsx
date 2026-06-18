import Link from 'next/link'

const COLS = [
  {
    title: 'Produit',
    links: [{ label: 'Fonctionnalités', href: '#features' }, { label: 'Tarifs', href: '#pricing' }, { label: 'Télécharger', href: '/download' }, { label: 'Roadmap', href: '/roadmap' }],
  },
  {
    title: 'Support',
    links: [{ label: 'Documentation', href: '/docs' }, { label: 'FAQ', href: '#faq' }, { label: 'Contact', href: '/contact' }, { label: 'Statut', href: '/status' }],
  },
  {
    title: 'Légal',
    links: [{ label: 'CGU', href: '/terms' }, { label: 'Confidentialité', href: '/privacy' }, { label: 'Mentions légales', href: '/legal' }],
  },
]

export function Footer() {
  return (
    <footer className="border-t border-white/5 py-16 px-6" style={{ background: 'var(--bg-void)' }}>
      <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <div className="text-xl font-bold mb-3">
            <span className="text-white">Swap</span><span className="gradient-text">Live</span>
          </div>
          <p className="text-sm text-[#8888aa] mb-4 leading-relaxed">&quot;Deviens qui tu veux, en direct.&quot;<br />Transformation faciale IA en temps réel.</p>
          <div className="flex gap-3">
            {['TikTok', 'YouTube', 'Discord', 'Twitter'].map(s => (
              <span key={s} className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-xs text-[#8888aa] cursor-pointer hover:bg-white/10 transition-colors">{s[0]}</span>
            ))}
          </div>
        </div>
        {COLS.map(col => (
          <div key={col.title}>
            <h4 className="text-xs font-bold text-[#f0f0ff] tracking-widest uppercase mb-4">{col.title}</h4>
            <ul className="space-y-2.5">
              {col.links.map(l => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-[#8888aa] hover:text-[#00d4ff] transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
        <span className="text-xs text-[#44445a]">© 2026 SwapLive. Tous droits réservés.</span>
        <span className="text-xs text-[#44445a]">Propulsé par Deep-Live-Cam · Stack: Next.js 14 + FastAPI</span>
      </div>
    </footer>
  )
}

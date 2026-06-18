const CATEGORIES = [
  { label: 'Streaming', apps: ['OBS Studio', 'Streamlabs', 'XSplit'] },
  { label: 'Gaming', apps: ['Twitch', 'YouTube', 'Discord'] },
  { label: 'Pro', apps: ['Zoom', 'Teams', 'Google Meet'] },
  { label: 'Social', apps: ['TikTok Live', 'Instagram Live', 'Facebook Live'] },
  { label: 'Messaging', apps: ['WhatsApp', 'Telegram', 'Skype'] },
]

export function Compatibility() {
  return (
    <section className="py-24 px-6" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black font-display text-[#f0f0ff] uppercase mb-4">
            FONCTIONNE <span className="gradient-text">PARTOUT</span>
          </h2>
          <p className="text-[#8888aa] max-w-xl mx-auto">SwapLive crée une caméra virtuelle détectée par toutes les applications.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {CATEGORIES.map(cat => (
            <div key={cat.label} className="glass-card p-5 text-center">
              <div className="text-xs font-bold text-[#00d4ff] tracking-widest uppercase mb-3">{cat.label}</div>
              <div className="space-y-2">
                {cat.apps.map(app => (
                  <div key={app} className="text-sm text-[#8888aa] py-1.5 rounded-lg bg-white/5">{app}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

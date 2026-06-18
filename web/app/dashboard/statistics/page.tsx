'use client'
import { Card } from '@/components/ui/Card'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Button } from '@/components/ui/Button'
import { Download } from 'lucide-react'

const lineData = Array.from({ length: 30 }, (_, i) => ({ day: i + 1, minutes: Math.floor(Math.random() * 60) + 5 }))
const barData = [
  { session: 'S1', pts: 600 }, { session: 'S2', pts: 1800 }, { session: 'S3', pts: 450 },
  { session: 'S4', pts: 1200 }, { session: 'S5', pts: 900 },
]
const pieData = [
  { name: 'OBS/Twitch', value: 45, color: '#00d4ff' },
  { name: 'TikTok', value: 30, color: '#7b2fff' },
  { name: 'Zoom', value: 15, color: '#ff2d78' },
  { name: 'Autres', value: 10, color: '#44445a' },
]

const KPI = [
  { label: 'Temps total', value: '42h 18min', sub: 'Ce trimestre' },
  { label: 'Avatars utilisés', value: '12', sub: 'Avatars différents' },
  { label: 'Sessions', value: '89', sub: 'Ce trimestre' },
  { label: 'Points consommés', value: '31 240', sub: 'Ce trimestre' },
]

export default function StatisticsPage() {
  return (
    <div className="max-w-5xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-black font-display text-[#f0f0ff]">Statistiques</h1>
        <div className="flex gap-2">
          {['7j', '30j', '90j'].map(p => (
            <button key={p} className="text-xs px-3 py-1.5 rounded-lg border border-white/10 text-[#8888aa] hover:border-[#00d4ff]/40 hover:text-[#00d4ff] transition-all">{p}</button>
          ))}
          <Button variant="ghost" size="sm" className="gap-1.5"><Download size={14} /> CSV</Button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {KPI.map(k => (
          <Card key={k.label} className="p-5">
            <div className="text-2xl font-black text-[#f0f0ff] mb-1">{k.value}</div>
            <div className="text-xs text-[#44445a]">{k.label}</div>
            <div className="text-xs text-[#8888aa] mt-0.5">{k.sub}</div>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-sm font-bold text-[#f0f0ff] mb-4">Temps d&apos;utilisation (30 jours)</h3>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={lineData}>
              <XAxis dataKey="day" tick={{ fill: '#44445a', fontSize: 10 }} />
              <YAxis tick={{ fill: '#44445a', fontSize: 10 }} />
              <Tooltip contentStyle={{ background: '#13131f', border: '1px solid rgba(0,212,255,0.1)', borderRadius: 8, color: '#f0f0ff', fontSize: 12 }} />
              <Line type="monotone" dataKey="minutes" stroke="#00d4ff" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
        <Card>
          <h3 className="text-sm font-bold text-[#f0f0ff] mb-4">Points par session</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={barData}>
              <XAxis dataKey="session" tick={{ fill: '#44445a', fontSize: 10 }} />
              <YAxis tick={{ fill: '#44445a', fontSize: 10 }} />
              <Tooltip contentStyle={{ background: '#13131f', border: '1px solid rgba(0,212,255,0.1)', borderRadius: 8, color: '#f0f0ff', fontSize: 12 }} />
              <Bar dataKey="pts" fill="#7b2fff" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
        <Card>
          <h3 className="text-sm font-bold text-[#f0f0ff] mb-4">Répartition par plateforme</h3>
          <div className="flex items-center gap-6">
            <ResponsiveContainer width={140} height={140}>
              <PieChart>
                <Pie data={pieData} dataKey="value" cx="50%" cy="50%" innerRadius={40} outerRadius={60}>
                  {pieData.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2">
              {pieData.map(d => (
                <div key={d.name} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: d.color }} />
                  <span className="text-xs text-[#8888aa]">{d.name}</span>
                  <span className="text-xs font-mono text-[#f0f0ff] ml-auto">{d.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

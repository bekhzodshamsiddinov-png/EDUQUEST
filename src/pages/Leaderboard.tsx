import React, { useEffect, useState } from 'react'
import { Crown, ArrowUp, ArrowDown, Minus, Clock, Users, School, MapPin, Map } from 'lucide-react'
import { CLASS_8B, PARALLEL_8, SCHOOL_TOP, CLASS_COMPARE, type Student } from '../data'

const LEAGUE: Record<Student['league'], string> = { Olmos: '#67e8f9', Oltin: '#ffd43b', Kumush: '#c0c7d6', Bronza: '#cd7f32' }
const AV = ['#3b82f6', '#ff7a1a', '#22c55e', '#ec4899', '#8b5cf6', '#06b6d4', '#f59e0b', '#ef4444']

function Avatar({ name, i, size = 40 }: { name: string; i: number; size?: number }) {
  return <span className="rounded-full grid place-items-center font-display font-bold shrink-0" style={{ width: size, height: size, background: AV[i % AV.length], fontSize: size * 0.4 }}>{name[0]}</span>
}

function Podium({ list }: { list: Student[] }) {
  const order = [1, 0, 2]
  const h = ['h-28', 'h-36', 'h-24']
  return (
    <div className="flex items-end justify-center gap-2 sm:gap-4 mt-6">
      {order.map((idx, k) => {
        const s = list[idx]
        return (
          <div key={s.name} className="flex flex-col items-center w-24 sm:w-32">
            {idx === 0 && <Crown className="w-8 h-8 text-[#ffd43b] mb-1" fill="currentColor" />}
            <div className="relative"><Avatar name={s.name} i={idx} size={idx === 0 ? 72 : 58} /><span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-[#0b1033] border-2 border-white/20 grid place-items-center text-xs font-bold">{idx + 1}</span></div>
            <div className="font-bold text-sm mt-3 text-center">{s.name}</div>
            <div className="text-xs text-white/55">{s.cls} · {s.xp.toLocaleString('ru')} XP</div>
            <div className={`${h[k]} w-full mt-2 rounded-t-2xl grid place-items-start justify-center pt-3 font-display text-3xl font-bold`} style={{ background: idx === 0 ? 'linear-gradient(180deg,#ffd43b,#ff9a3d)' : idx === 1 ? 'linear-gradient(180deg,#d6dbe8,#8d96ad)' : 'linear-gradient(180deg,#e0a06a,#9a5a2a)', color: '#0b1033' }}>{idx + 1}</div>
          </div>
        )
      })}
    </div>
  )
}

function Rows({ list, showCls, start = 1 }: { list: Student[]; showCls: boolean; start?: number }) {
  return (
    <div className="space-y-2 mt-6">
      {list.map((s, i) => (
        <div key={s.name + s.cls} className={`flex items-center gap-3 rounded-2xl px-3 sm:px-4 py-3 ${s.me ? 'bg-[#c6ff3d]/15 border-2 border-[#c6ff3d]' : 'bg-white/5 border border-white/10'}`}>
          <span className="w-7 text-center font-display font-bold text-white/70">{i + start}</span>
          <Avatar name={s.name} i={i} />
          <div className="flex-1 min-w-0">
            <div className="font-bold truncate">{s.name} {s.me && <span className="text-xs px-2 py-0.5 rounded-full bg-[#c6ff3d] text-[#0b1033] ml-1">Siz</span>}</div>
            <div className="text-xs text-white/55 flex items-center gap-2">
              {showCls && <span>{s.cls}</span>}
              <span className="font-bold" style={{ color: LEAGUE[s.league] }}>● {s.league}</span>
            </div>
          </div>
          <div className="text-right hidden sm:block">
            <div className="text-[11px] text-white/45">Bilim reytingi</div>
            <div className="font-display font-bold">{s.elo}</div>
          </div>
          <div className="text-right w-20">
            <div className="text-[11px] text-white/45">XP</div>
            <div className="font-display font-bold text-[#ffd43b]">{s.xp.toLocaleString('ru')}</div>
          </div>
          <div className="w-10 flex justify-end">
            {s.delta > 0 ? <span className="flex items-center text-[#c6ff3d] text-xs font-bold"><ArrowUp className="w-4 h-4" />{s.delta}</span> : s.delta < 0 ? <span className="flex items-center text-[#ff8a8a] text-xs font-bold"><ArrowDown className="w-4 h-4" />{-s.delta}</span> : <Minus className="w-4 h-4 text-white/40" />}
          </div>
        </div>
      ))}
    </div>
  )
}

export function Leaderboard() {
  const tabs = [
    { id: 'class', label: 'Sinfim (8-B)', icon: Users },
    { id: 'parallel', label: 'Parallel sinflar', icon: Users },
    { id: 'school', label: 'Maktab', icon: School },
    { id: 'district', label: 'Tuman', icon: MapPin },
    { id: 'region', label: 'Viloyat', icon: Map },
  ] as const
  const [tab, setTab] = useState<(typeof tabs)[number]['id']>('class')
  const [secs, setSecs] = useState(2 * 86400 + 14 * 3600 + 22 * 60)
  useEffect(() => { const iv = setInterval(() => setSecs((s) => Math.max(0, s - 1)), 1000); return () => clearInterval(iv) }, [])
  const d = Math.floor(secs / 86400), h = Math.floor((secs % 86400) / 3600), m = Math.floor((secs % 3600) / 60), s = secs % 60

  const list = tab === 'class' ? CLASS_8B : tab === 'parallel' ? PARALLEL_8 : SCHOOL_TOP

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-10">
      <div className="text-center">
        <span className="text-xs font-extrabold tracking-[0.25em] uppercase text-[#c6ff3d]">Reyting</span>
        <h1 className="font-display text-4xl sm:text-6xl font-bold mt-3">Kim <span className="grad-text">eng kuchli?</span></h1>
        <div className="text-xs text-white/40 mt-2">Namuna ma’lumotlar</div>
        <div className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-full glass text-sm font-bold">
          <Clock className="w-4 h-4 text-[#ffd43b]" /> Oltin liga tugashiga: <span className="tabular-nums text-[#ffd43b]">{d} kun {String(h).padStart(2, '0')}:{String(m).padStart(2, '0')}:{String(s).padStart(2, '0')}</span>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto scrollbar-none mt-8 pb-1">
        {tabs.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)} className={`shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm ${tab === t.id ? 'bg-[#c6ff3d] text-[#0b1033]' : 'bg-white/10 hover:bg-white/20'}`}>
            <t.icon className="w-4 h-4" /> {t.label}
          </button>
        ))}
      </div>

      {(tab === 'district' || tab === 'region') ? (
        <div className="glass rounded-3xl p-5 sm:p-7 mt-6">
          <h3 className="font-display text-2xl font-bold">{tab === 'district' ? 'To‘raqo‘rg‘on tumani maktablari' : 'Namangan viloyati tumanlari'}</h3>
          <p className="text-white/55 text-sm">O‘rtacha bilim reytingi va faol o‘quvchilar ulushi bo‘yicha</p>
          <div className="space-y-3 mt-6">
            {(tab === 'district'
              ? [['3-sonli maktab', 1612, 94], ['12-sonli maktab', 1580, 88], ['7-sonli maktab', 1544, 81], ['21-sonli maktab', 1502, 76], ['1-sonli maktab', 1488, 70]]
              : [['To‘raqo‘rg‘on tumani', 1598, 90], ['Namangan shahri', 1590, 86], ['Chust tumani', 1561, 79], ['Davlatobod tumani', 1549, 82], ['Uchqo‘rg‘on tumani', 1520, 74]]
            ).map(([n, e, p]: any, i) => (
              <div key={n} className={`rounded-2xl p-4 ${i === 0 ? 'bg-[#c6ff3d]/15 border-2 border-[#c6ff3d]' : 'bg-white/5 border border-white/10'}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3"><span className="font-display font-bold w-6">{i + 1}</span><span className="font-bold">{n}</span>{i === 0 && <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-[#c6ff3d] text-[#0b1033]">PILOT</span>}</div>
                  <span className="font-display font-bold">{e}</span>
                </div>
                <div className="h-2 rounded-full bg-white/10 mt-3 overflow-hidden"><div className="h-full rounded-full bg-gradient-to-r from-[#3b82f6] to-[#22d3ee]" style={{ width: `${p}%` }} /></div>
                <div className="text-[11px] text-white/50 mt-1">Faol o‘quvchilar: {p}%</div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="glass rounded-3xl p-4 sm:p-7 mt-6">
          <Podium list={list} />
          <Rows list={list.slice(3)} showCls={tab !== 'class'} start={4} />
          {tab === 'parallel' && (
            <div className="mt-8">
              <h3 className="font-display text-xl font-bold">8-sinflar bellashuvi</h3>
              <p className="text-white/55 text-sm">Sinf reytingi = o‘rtacha natija × qatnashish. Katta sinf faqat odami ko‘pligi uchun yutmaydi.</p>
              <div className="space-y-3 mt-4">
                {CLASS_COMPARE.map((c) => (
                  <div key={c.cls} className="grid grid-cols-[48px_1fr] gap-3 items-center">
                    <span className={`font-display font-bold text-lg ${c.cls === '8-B' ? 'text-[#c6ff3d]' : ''}`}>{c.cls}</span>
                    <div>
                      <div className="h-3 rounded-full bg-white/10 overflow-hidden"><div className="h-full rounded-full" style={{ width: `${c.avg}%`, background: c.cls === '8-B' ? '#c6ff3d' : '#3b82f6' }} /></div>
                      <div className="flex justify-between text-[11px] text-white/55 mt-1"><span>O‘rtacha: {c.avg}%</span><span>Qatnashish: {c.part}%</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

import React, { useState } from 'react'
import { User, Users, ChevronLeft, ChevronRight, Play, Keyboard, Zap, Flame, Timer, ArrowLeft } from 'lucide-react'
import { CARS, type RealCar } from '../cars'
import { CarPhoto } from './CarPhoto'
import { useT } from '../lang'

export type SetupResult = { players: 1 | 2; names: string[]; cars: RealCar[]; duration: number }

const COLORS = ['#3b82f6', '#ff7a1a']

export function MatchSetup({ title, subtitle, children, onStart, onBack, defaultCar = 0 }: { title: string; subtitle?: string; children?: React.ReactNode; onStart: (r: SetupResult) => void; onBack?: () => void; defaultCar?: number }) {
  const t = useT()
  const [players, setPlayers] = useState<1 | 2>(2)
  const [names, setNames] = useState([t('1-o‘yinchi'), t('2-o‘yinchi')])
  const [cars, setCars] = useState([defaultCar, (defaultCar + 5) % CARS.length])
  const [duration, setDuration] = useState(60)
  const ids = players === 2 ? [0, 1] : [0]
  React.useEffect(() => { window.scrollTo({ top: 0 }) }, [])
  const step = (pi: number, d: number) => setCars((c) => c.map((x, i) => (i === pi ? (x + d + CARS.length) % CARS.length : x)))

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8">
      {onBack && (
        <button onClick={onBack} className="inline-flex items-center gap-2 text-sm font-bold text-white/70 hover:text-white mb-4"><ArrowLeft className="w-4 h-4" /> {t('Orqaga')}</button>
      )}
      <div className="text-center">
        <h1 className="font-display text-3xl sm:text-5xl font-bold">{title}</h1>
        {subtitle && <p className="text-white/65 mt-2">{subtitle}</p>}
      </div>

      {children && <div className="glass rounded-3xl p-4 sm:p-6 mt-8 space-y-5">{children}</div>}

      <div className="glass rounded-3xl p-4 sm:p-6 mt-4">
        <div className="text-xs font-extrabold uppercase tracking-widest text-white/50 mb-3">{t('O‘yinchilar soni')}</div>
        <div className="grid grid-cols-2 gap-3">
          {([1, 2] as const).map((n) => (
            <button key={n} onClick={() => setPlayers(n)} className={`rounded-2xl p-4 text-left border-2 transition ${players === n ? 'border-[#c6ff3d] bg-[#c6ff3d]/10' : 'border-white/10 bg-white/5 hover:border-white/30'}`}>
              <div className="flex items-center gap-2 font-display text-xl font-bold">{n === 1 ? <User /> : <Users />} {n === 1 ? t('1 kishilik') : t('2 kishilik')}</div>
              <div className="text-sm text-white/60 mt-1">{n === 1 ? t('Vaqtga qarshi yakka poyga') : t('Bitta ekranda mashina poygasi')}</div>
            </button>
          ))}
        </div>
        <div className="text-xs font-extrabold uppercase tracking-widest text-white/50 mt-6 mb-3">{t('Raund davomiyligi')}</div>
        <div className="flex gap-2">
          {[45, 60, 90].map((d) => (
            <button key={d} onClick={() => setDuration(d)} className={`px-5 py-2.5 rounded-xl font-bold ${duration === d ? 'bg-[#c6ff3d] text-[#0b1033]' : 'bg-white/10 hover:bg-white/20'}`}>{d} s</button>
          ))}
        </div>
      </div>

      <div className={`grid grid-cols-1 ${players === 2 ? 'md:grid-cols-2' : ''} gap-4 mt-4`}>
        {ids.map((pi) => {
          const car = CARS[cars[pi]]
          return (
            <div key={pi} className="glass rounded-3xl p-4 sm:p-5 border-t-4 min-w-0" style={{ borderTopColor: COLORS[pi] }}>
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl grid place-items-center font-display font-bold text-lg" style={{ background: `${COLORS[pi]}26`, color: COLORS[pi] }}>{pi + 1}</span>
                <input
                  value={names[pi]}
                  onChange={(e) => setNames((n) => n.map((x, i) => (i === pi ? e.target.value.slice(0, 16) : x)))}
                  className="flex-1 min-w-0 bg-black/25 border-2 border-white/10 focus:border-white/40 rounded-xl px-4 py-3 font-display text-xl font-bold outline-none"
                  aria-label={t('{n}-o‘yinchi ismi', { n: pi + 1 })}
                />
              </div>
              <div className="mt-4 rounded-2xl bg-black/25 p-3">
                <div className="relative rounded-xl overflow-hidden aspect-[16/9]">
                  <CarPhoto car={car} className="w-full h-full" />
                  <button onClick={() => step(pi, -1)} className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-black/60 hover:bg-black/80" aria-label={t('Oldingi mashina')}><ChevronLeft /></button>
                  <button onClick={() => step(pi, 1)} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-black/60 hover:bg-black/80" aria-label={t('Keyingi mashina')}><ChevronRight /></button>
                </div>
                <div className="flex items-start justify-between gap-2 mt-3">
                  <div className="min-w-0">
                    <div className="font-display text-lg font-bold truncate">{car.name}</div>
                    <div className="text-xs text-white/55">{t(car.type)} · {car.engine} · {car.hp} {t('o.k.')}</div>
                  </div>
                  <span className="text-xs font-bold text-white/50 shrink-0">{cars[pi] + 1}/{CARS.length}</span>
                </div>
              </div>
              <div className="flex items-center justify-center gap-2 mt-3 text-sm text-white/60">
                <Keyboard className="w-4 h-4" /> {t('Tugmalar')}:
                {(players === 1 ? ['1', '2', '3', '4'] : pi === 0 ? ['A', 'S', 'D', 'F'] : ['J', 'K', 'L', ';']).map((k) => <kbd key={k} className="px-2 py-1 rounded-lg bg-white/10 font-bold text-white">{k}</kbd>)}
              </div>
            </div>
          )
        })}
      </div>

      <div className="glass rounded-3xl p-5 mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
        <div className="flex gap-3"><Zap className="text-[#c6ff3d] shrink-0" /> <span>{t('+10 m har bir to‘g‘ri javob uchun')}</span></div>
        <div className="flex gap-3"><Flame className="text-[#ffd43b] shrink-0" /> <span>{t('3 ta ketma-ket to‘g‘ri — NITRO +4 m')}</span></div>
        <div className="flex gap-3"><Timer className="text-[#ff7a1a] shrink-0" /> <span>{t('Xato javob — 1,5 s kutish')}</span></div>
      </div>
      <p className="text-center text-xs text-white/45 mt-3">{t('Barcha mashinalar uchun qoidalar bir xil: tezlikni faqat bilim beradi.')}</p>
      <div className="text-center mt-6">
        <button onClick={() => onStart({ players, names, cars: ids.map((pi) => CARS[cars[pi]]), duration })} className="btn-game btn-lime px-10 py-5 text-xl glowpulse"><Play fill="currentColor" /> {t('Boshlash')}</button>
      </div>
    </div>
  )
}

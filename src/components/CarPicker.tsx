import React from 'react'
import { ChevronLeft, ChevronRight, Gauge, Users, Fuel, Zap } from 'lucide-react'
import { BRANDS, BRAND_LABEL, CARS, PAINTS } from '../cars'
import { Showroom } from './TopCar'
import { useT } from '../lang'

export type CarChoice = { idx: number; color: string }

/** Brand → model → paint picker with a spinning top-down showroom preview. */
export function CarPicker({ value, onChange, compact = false }: { value: CarChoice; onChange: (v: CarChoice) => void; compact?: boolean }) {
  const t = useT()
  const car = CARS[value.idx]
  const step = (d: number) => {
    const idx = (value.idx + d + CARS.length) % CARS.length
    onChange({ idx, color: CARS[idx].accent })
  }
  const pick = (idx: number) => onChange({ idx, color: CARS[idx].accent })
  const shown = { ...car, accent: value.color }

  return (
    <div className="rounded-2xl bg-black/25 p-3 min-w-0">
      {/* brands */}
      <div className="grid grid-cols-3 gap-1.5">
        {BRANDS.map((b) => (
          <button key={b} onClick={() => pick(CARS.findIndex((c) => c.brand === b))} className={`px-2 py-2 rounded-xl text-xs sm:text-sm font-extrabold truncate ${car.brand === b ? 'bg-white text-[#0b1033]' : 'bg-white/10 hover:bg-white/20'}`}>{BRAND_LABEL[b]}</button>
        ))}
      </div>
      {/* models of brand */}
      <div className="flex gap-1.5 overflow-x-auto scrollbar-none mt-2 pb-1">
        {CARS.map((c, i) => (c.brand === car.brand ? (
          <button key={c.id} onClick={() => pick(i)} className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold ${i === value.idx ? 'bg-[#c6ff3d] text-[#0b1033]' : 'bg-white/5 hover:bg-white/15 text-white/80'}`}>{c.name.replace(/^(Chevrolet|BYD|GAZ-14) /, '')}</button>
        ) : null))}
      </div>
      {/* showroom */}
      <div className="relative rounded-xl overflow-hidden mt-2">
        <Showroom car={shown} className={compact ? 'aspect-[16/10]' : 'aspect-[16/11]'} />
        <button onClick={() => step(-1)} className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-black/60 hover:bg-black/80" aria-label={t('Oldingi mashina')}><ChevronLeft /></button>
        <button onClick={() => step(1)} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-black/60 hover:bg-black/80" aria-label={t('Keyingi mashina')}><ChevronRight /></button>
        {car.ev && <span className="absolute top-2 left-2 text-[10px] font-extrabold px-2 py-1 rounded-full bg-[#22d3ee] text-[#0b1033] flex items-center gap-1"><Zap className="w-3 h-3" /> EV</span>}
        <span className="absolute top-2 right-2 text-[10px] font-bold px-2 py-1 rounded-full bg-black/50">{value.idx + 1}/{CARS.length}</span>
      </div>
      {/* paint */}
      <div className="flex items-center gap-1.5 mt-3 flex-wrap">
        <span className="text-[11px] font-bold text-white/50 mr-1">{t('Rang')}:</span>
        {PAINTS.map((p) => (
          <button key={p} onClick={() => onChange({ idx: value.idx, color: p })} className={`w-6 h-6 rounded-full border-2 transition ${value.color === p ? 'border-[#c6ff3d] scale-110' : 'border-white/20 hover:scale-110'}`} style={{ background: p }} aria-label={p} />
        ))}
      </div>
      {/* specs */}
      <div className="font-display text-lg font-bold mt-3 truncate">{car.name}</div>
      <div className="grid grid-cols-3 gap-2 mt-2 text-center">
        <div className="rounded-xl bg-white/5 p-1.5"><Fuel className="w-3.5 h-3.5 mx-auto text-white/50" /><div className="text-xs font-bold mt-0.5 truncate">{t(car.engine)}</div></div>
        <div className="rounded-xl bg-white/5 p-1.5"><Gauge className="w-3.5 h-3.5 mx-auto text-white/50" /><div className="text-xs font-bold mt-0.5">{car.hp} {t('o.k.')}</div></div>
        <div className="rounded-xl bg-white/5 p-1.5"><Users className="w-3.5 h-3.5 mx-auto text-white/50" /><div className="text-xs font-bold mt-0.5">{car.seats} {t('o‘rindiq')}</div></div>
      </div>
      <div className="text-[11px] text-white/45 mt-1.5">{t(car.type)}</div>
    </div>
  )
}

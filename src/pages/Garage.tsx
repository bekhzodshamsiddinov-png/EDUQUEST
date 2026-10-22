import React from 'react'
import { Check, Gauge, Users, Fuel, Car as CarIcon, ShieldCheck, Zap } from 'lucide-react'
import { BRANDS, BRAND_LABEL, CARS } from '../cars'
import { Showroom } from '../components/TopCar'
import { CarPicker, type CarChoice } from '../components/CarPicker'
import { useT } from '../lang'

export function Garage({ selected, onSelect }: { selected: CarChoice; onSelect: (c: CarChoice) => void }) {
  const t = useT()
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-10">
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-extrabold tracking-[0.25em] uppercase text-[#c6ff3d]">{t('Garaj')}</span>
        <h1 className="font-display text-4xl sm:text-6xl font-bold mt-3">{t('Mashinangizni')} <span className="grad-text">{t('tanlang')}</span></h1>
        <p className="text-white/65 mt-3">{t('Chevrolet, BYD yoki afsonaviy Chayka — markani, modelni va rangini tanlang. Poyga qoidalari hammasi uchun bir xil: tezlikni faqat bilim beradi.')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-4 mt-10 items-start">
        <div className="glass rounded-3xl p-4 sm:p-5">
          <div className="text-xs font-extrabold uppercase tracking-widest text-white/50 mb-3">{t('Mening mashinam')}</div>
          <CarPicker value={selected} onChange={onSelect} />
        </div>
        <div className="glass rounded-3xl p-4 sm:p-5 space-y-5">
          {BRANDS.map((b) => (
            <div key={b}>
              <div className="font-display text-xl font-bold mb-2">{BRAND_LABEL[b]}</div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {CARS.map((c, i) => (c.brand === b ? (
                  <button key={c.id} onClick={() => onSelect({ idx: i, color: c.accent })} className={`rounded-2xl overflow-hidden text-left border-2 transition ${selected.idx === i ? 'border-[#c6ff3d]' : 'border-white/10 hover:border-white/30'}`}>
                    <Showroom car={c} spin={false} flat className="aspect-[16/10]" />
                    <div className="p-2 bg-black/30">
                      <div className="text-xs font-bold truncate flex items-center gap-1">{selected.idx === i && <Check className="w-3.5 h-3.5 text-[#c6ff3d]" />}{c.name}</div>
                      <div className="text-[10px] text-white/55 flex items-center gap-1 whitespace-nowrap overflow-hidden">{c.ev ? <Zap className="w-3 h-3" /> : <Fuel className="w-3 h-3" />}{t(c.engine)} · <Gauge className="w-3 h-3" />{c.hp} · <Users className="w-3 h-3" />{c.seats}</div>
                    </div>
                  </button>
                ) : null))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="glass rounded-2xl p-4 mt-6 flex gap-3 text-sm text-white/70">
        <ShieldCheck className="w-5 h-5 text-[#c6ff3d] shrink-0" />
        <div className="flex items-center gap-2"><CarIcon className="w-4 h-4 hidden sm:block" /> {t('Mashina tanlash faqat ko‘rinish uchun: barcha mashinalar poygada bir xil tezlikda yuradi.')}</div>
      </div>
    </div>
  )
}

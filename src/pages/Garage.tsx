import React from 'react'
import { Check, Gauge, Users, Fuel, Car as CarIcon, ShieldCheck } from 'lucide-react'
import { CARS } from '../cars'
import { CarPhoto } from '../components/CarPhoto'
import { useT } from '../i18n'

export function Garage({ selected, onSelect }: { selected: number; onSelect: (i: number) => void }) {
  const t = useT()
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-10">
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-extrabold tracking-[0.25em] uppercase text-[#c6ff3d]">{t('Garaj')}</span>
        <h1 className="font-display text-4xl sm:text-6xl font-bold mt-3">{t('Mashinangizni')} <span className="grad-text">{t('tanlang')}</span></h1>
        <p className="text-white/65 mt-3">{t('O‘zbekiston yo‘llarida eng ko‘p uchraydigan haqiqiy mashinalar. Poyga qoidalari hammasi uchun bir xil: tezlikni faqat bilim beradi.')}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
        {CARS.map((c, i) => {
          const on = selected === i
          return (
            <div key={c.id} className={`rounded-3xl overflow-hidden border-2 transition ${on ? 'border-[#c6ff3d] shadow-[0_0_50px_-15px_#c6ff3d]' : 'border-white/10'} bg-white/5`}>
              <CarPhoto car={c} className="aspect-[16/10] w-full" />
              <div className="p-5">
                <div className="flex items-center justify-between gap-2">
                  <div className="font-display text-xl font-bold">{c.name}</div>
                  <span className="text-[11px] font-bold px-2 py-1 rounded-full" style={{ background: `${c.accent}33`, color: c.accent }}>{t(c.type)}</span>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-4 text-center">
                  <div className="rounded-xl bg-black/25 p-2"><Fuel className="w-4 h-4 mx-auto text-white/50" /><div className="text-sm font-bold mt-1">{c.engine}</div><div className="text-[10px] text-white/50">{t('Dvigatel')}</div></div>
                  <div className="rounded-xl bg-black/25 p-2"><Gauge className="w-4 h-4 mx-auto text-white/50" /><div className="text-sm font-bold mt-1">{c.hp}</div><div className="text-[10px] text-white/50">{t('ot kuchi')}</div></div>
                  <div className="rounded-xl bg-black/25 p-2"><Users className="w-4 h-4 mx-auto text-white/50" /><div className="text-sm font-bold mt-1">{c.seats}</div><div className="text-[10px] text-white/50">{t('o‘rindiq')}</div></div>
                </div>
                <button onClick={() => onSelect(i)} className={`btn-game w-full py-3 mt-4 ${on ? 'btn-lime' : 'btn-ghost'}`}>{on ? <><Check className="w-5 h-5" /> {t('Tanlangan')}</> : <><CarIcon className="w-5 h-5" /> {t('Tanlash')}</>}</button>
              </div>
            </div>
          )
        })}
      </div>
      <div className="glass rounded-2xl p-4 mt-6 flex gap-3 text-sm text-white/70">
        <ShieldCheck className="w-5 h-5 text-[#c6ff3d] shrink-0" />
        <div>
          {t('Mashina tanlash faqat ko‘rinish uchun: barcha mashinalar poygada bir xil tezlikda yuradi.')}{' '}
          <span className="text-white/45">{t('Rasmlar: Wikimedia Commons (CC litsenziyalari).')} {CARS.map((c, i) => <a key={c.id} href={c.page} target="_blank" rel="noreferrer" className="underline hover:text-white">{i + 1}</a>).reduce<React.ReactNode[]>((acc, el, i) => (i ? [...acc, ', ', el] : [el]), [])}</span>
        </div>
      </div>
    </div>
  )
}

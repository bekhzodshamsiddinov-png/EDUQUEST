import React, { useMemo, useState } from 'react'
import { Globe2, Languages, Brain, Leaf, Landmark, Puzzle, Bot, Laptop, BookA, Flag as FlagIcon, Building2, Shuffle, ArrowRight } from 'lucide-react'
import { GEN_SUBJECTS, makePoolFactory, poolSize, type GeoKind, type SubjectId } from '../quiz/generators'
import { MatchSetup, type SetupResult } from '../components/MatchSetup'
import { Match } from '../components/Match'
import { useLang, useT } from '../lang'

const ICONS: Record<SubjectId, any> = { geo: Globe2, eng: Languages, rus: BookA, mental: Brain, bio: Leaf, history: Landmark, logic: Puzzle, robotics: Bot, it: Laptop }

export function GeneralTest({ defaultCar = 0 }: { defaultCar?: number }) {
  const t = useT()
  const lang = useLang()
  const [subject, setSubject] = useState<SubjectId | null>(null)
  const [level, setLevel] = useState('easy')
  const [geoKind, setGeoKind] = useState<GeoKind>('mix')
  const [match, setMatch] = useState<SetupResult | null>(null)
  const subj = GEN_SUBJECTS.find((s) => s.id === subject)

  const makePool = useMemo(() => (subject ? makePoolFactory(subject, level, geoKind, lang) : () => []), [subject, level, geoKind, lang])

  if (subject && subj && match) {
    const lv = subj.levels.find((l) => l.id === level)!
    return <Match players={match.players} names={match.names} cars={match.cars} duration={match.duration} makePool={makePool} title={`${t(subj.name)} · ${t(lv.label)}`} onExit={() => setMatch(null)} />
  }

  if (subject && subj) {
    const size = poolSize(subject, level, geoKind)
    return (
      <MatchSetup defaultCar={defaultCar} title={t(subj.name)} subtitle={t('Umumiy test · sinfga bog‘liq emas')} onBack={() => setSubject(null)} onStart={setMatch}>
        {subject === 'geo' && (
          <div>
            <div className="text-xs font-extrabold uppercase tracking-widest text-white/50 mb-3">{t('Savol turi')}</div>
            <div className="grid grid-cols-3 gap-2">
              {([
                ['capital', t('Poytaxtlar'), Building2],
                ['flag', t('Bayroqlar'), FlagIcon],
                ['mix', t('Aralash'), Shuffle],
              ] as const).map(([id, label, I]) => (
                <button key={id} onClick={() => setGeoKind(id)} className={`flex items-center justify-center gap-2 px-3 py-3 rounded-xl font-bold text-sm ${geoKind === id ? 'bg-[#c6ff3d] text-[#0b1033]' : 'bg-white/10 hover:bg-white/20'}`}><I className="w-4 h-4" /> {label}</button>
              ))}
            </div>
          </div>
        )}
        <div>
          <div className="text-xs font-extrabold uppercase tracking-widest text-white/50 mb-3">{t('Daraja')}</div>
          <div className={`grid grid-cols-1 sm:grid-cols-2 ${subj.levels.length === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} gap-2`}>
            {subj.levels.map((l) => (
              <button key={l.id} onClick={() => setLevel(l.id)} className={`rounded-2xl p-4 text-left border-2 transition ${level === l.id ? 'border-[#c6ff3d] bg-[#c6ff3d]/10' : 'border-white/10 bg-white/5 hover:border-white/30'}`}>
                <div className="font-display text-lg font-bold">{t(l.label)}</div>
                <div className="text-xs text-white/60 mt-0.5">{t(l.hint)}</div>
              </button>
            ))}
          </div>
          <div className="text-xs text-white/45 mt-3">{size === Infinity ? t('Savollar har safar yangidan yaratiladi') : t('Bu darajada {n} ta savol', { n: size })}</div>
        </div>
      </MatchSetup>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-10">
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-extrabold tracking-[0.25em] uppercase text-[#c6ff3d]">{t('Umumiy test')}</span>
        <h1 className="font-display text-4xl sm:text-6xl font-bold mt-3">{t('Bilimingni')} <span className="grad-text">{t('sinab ko‘r!')}</span></h1>
        <p className="text-white/65 mt-3">{t('Bu bo‘lim sinfga bog‘liq emas: istalgan fan va darajani tanlang, yakka yoki do‘stingiz bilan mashina poygasida bellashing.')}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
        {GEN_SUBJECTS.map((s) => {
          const I = ICONS[s.id]
          return (
            <button key={s.id} onClick={() => { setSubject(s.id); setLevel(s.levels[0].id) }} className="group relative rounded-3xl p-5 sm:p-6 text-left overflow-hidden hover:-translate-y-1.5 transition shadow-[0_8px_0_rgba(0,0,0,.35)] active:translate-y-0" style={{ background: `linear-gradient(145deg, ${s.from}, ${s.to})` }}>
              <div className="absolute -right-8 -bottom-8 w-36 h-36 rounded-full bg-white/15 group-hover:scale-125 transition" />
              <I className="w-10 h-10 text-white drop-shadow" strokeWidth={2.2} />
              <div className="font-display text-2xl font-bold mt-5">{t(s.name)}</div>
              <div className="text-sm text-white/90 mt-1">{t(s.desc)}</div>
              <div className="flex flex-wrap gap-1.5 mt-4">
                {s.levels.map((l) => <span key={l.id} className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-black/20">{t(l.label)}</span>)}
              </div>
              <span className="inline-flex items-center gap-1 mt-4 text-sm font-bold">{t('Tanlash')} <ArrowRight className="w-4 h-4" /></span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

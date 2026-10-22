import React, { useEffect, useState } from 'react'
import {
  Play, School, KeyRound, BookMarked, TrendingUp, Trophy, Zap, Palette, Timer, Swords, Map, Users, Presentation, Globe2,
  ShieldCheck, BarChart3, Bell, Check, Sparkles, Flame, Medal, Crown, Star, ArrowRight, Gauge,
} from 'lucide-react'
import type { Page } from '../App'
import { CARS } from '../cars'
import { CarPhoto } from '../components/CarPhoto'
import { Mascot } from '../components/Mascot'
import { SUBJECTS } from '../data'
import { useT } from '../lang'

function Section({ eyebrow, title, sub, children }: { eyebrow: string; title: React.ReactNode; sub?: string; children: React.ReactNode }) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-24 sm:mt-32">
      <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
        <span className="inline-block text-xs font-extrabold tracking-[0.25em] uppercase text-[#c6ff3d]">{eyebrow}</span>
        <h2 className="font-display text-3xl sm:text-5xl font-bold mt-3 leading-tight">{title}</h2>
        {sub && <p className="text-white/65 mt-4 text-base sm:text-lg">{sub}</p>}
      </div>
      {children}
    </section>
  )
}

/** Looping two-car race used in the hero */
function HeroRace() {
  const t = useT()
  const [p, setP] = useState([8, 4])
  const [nitro, setNitro] = useState([false, false])
  const [pops, setPops] = useState<{ id: number; lane: number; text: string }[]>([])
  useEffect(() => {
    let n = 0
    const iv = setInterval(() => {
      n++
      setP(([a, b]) => {
        if (a >= 100 || b >= 100) return [8, 4]
        const lane = Math.random() < 0.52 ? 0 : 1
        const isNitro = n % 4 === 0
        const step = isNitro ? 18 : 10
        setNitro(lane === 0 ? [isNitro, false] : [false, isNitro])
        setPops((ps) => [...ps.slice(-4), { id: n, lane, text: isNitro ? 'NITRO +14 m' : '+10 m' }])
        return lane === 0 ? [Math.min(100, a + step), b] : [a, Math.min(100, b + step)]
      })
    }, 1100)
    return () => clearInterval(iv)
  }, [])
  const lanes = [
    { name: 'Madina · 8-B', car: CARS[0], ring: '#3b82f6' },
    { name: 'Sardor · 8-A', car: CARS[3], ring: '#ff7a1a' },
  ]
  return (
    <div className="glass rounded-[28px] p-3 sm:p-4 bg-[#0b1033]/60 relative overflow-hidden">
      <div className="flex items-center justify-between px-1 pb-3">
        <span className="text-xs font-bold text-white/70 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#ff4d4d] animate-pulse" /> {t('JONLI POYGA · 8-sinf Algebra')}</span>
        <span className="text-xs font-bold px-2 py-1 rounded-lg bg-white/10">120 m</span>
      </div>
      {lanes.map((l, i) => (
        <div key={i} className="relative h-[92px] sm:h-[100px] rounded-2xl track-lane track-moving mb-2 last:mb-0 overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-4 finish-flag opacity-90" />
          <div className="absolute left-2 top-1.5 text-[10px] font-bold text-white/60 z-10">{l.name} · {l.car.name}</div>
          <div className="absolute bottom-2 transition-[left] duration-700 ease-out" style={{ left: `calc(${p[i] * 0.74}% + 6px)` }}>
            <CarPhoto car={l.car} token ring={l.ring} number={i + 1} nitro={nitro[i]} />
            {pops.filter((x) => x.lane === i).slice(-1).map((x) => (
              <span key={x.id} className={`rise absolute -top-3 left-24 text-xs font-extrabold whitespace-nowrap ${x.text.startsWith('NITRO') ? 'text-[#ffd43b]' : 'text-[#c6ff3d]'}`}>{x.text}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export function Landing({ go, openCode }: { go: (p: Page) => void; openCode: () => void }) {
  const t = useT()
  const modes = [
    { icon: Zap, title: t('Bilim poygasi'), desc: t('Har to‘g‘ri javob +10 m, 3 ketma-ket — NITRO! 120 metrga birinchi yeting.'), color: '#3b82f6', page: 'test' as Page, tag: t('Ommabop') },
    { icon: Palette, title: t('Diqqat dueli'), desc: t('“QIZIL” ko‘k rangda yozilgan. Rangni tanlaysizmi yoki so‘zni? Qoida har 4 savolda o‘zgaradi.'), color: '#ec4899', page: 'test' as Page },
    { icon: Timer, title: t('Vaqt dueli'), desc: t('To‘g‘ri javob raqib soatidan −2 s, xato javob o‘zingizdan −2 s.'), color: '#f59e0b', page: 'test' as Page },
    { icon: Trophy, title: t('Arena turniri'), desc: t('Poyga → diqqat → vaqt. 3 raund, bitta chempion.'), color: '#c6ff3d', page: 'test' as Page },
    { icon: Map, title: t('Sarguzasht yo‘li'), desc: t('Darslik boblari — O‘zbekiston shaharlari. Bob oxirida Boss poygasi.'), color: '#22d3ee', page: 'path' as Page, tag: t('Yangi') },
    { icon: Swords, title: t('Sinf jangi'), desc: t('8-A va 8-B haftalik bellashuvi. Butun sinf bitta jamoa.'), color: '#ff7a1a', page: 'rating' as Page },
    { icon: Presentation, title: t('Jonli dars'), desc: t('Ustoz ekranda — poyga, o‘quvchilar telefondan javob beradi.'), color: '#8b5cf6', page: 'teacher' as Page },
  ]
  return (
    <div>
      {/* HERO */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-10 sm:pt-16">
        <div className="absolute inset-x-0 top-[55%] h-[420px] perspective-grid -z-0 pointer-events-none" />
        <div className="relative grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-6 items-center">
          <div>
            <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold px-3 py-1.5 rounded-full bg-white/10 border border-white/15">
              <Sparkles className="w-4 h-4 text-[#ffd43b]" /> {t('O‘zbekiston maktab darsliklari asosida · 1–11-sinf')}
            </span>
            <h1 className="font-display font-bold leading-[0.95] mt-5 text-[52px] sm:text-[76px] lg:text-[88px]">
              <span className="block">{t('O‘yna.')}</span>
              <span className="block text-[#c6ff3d] text-glow-lime">{t('O‘rgan.')}</span>
              <span className="block grad-text">{t('G‘alaba qil!')}</span>
            </h1>
            <p className="text-white/75 text-lg sm:text-xl mt-6 max-w-xl">{t('Bolalar sevadigan o‘yinlar orqali bilim: har bir to‘g‘ri javob mashinangizni marraga yaqinlashtiradi. Sinf, maktab va tuman reytingida birinchi bo‘ling!')}</p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <button onClick={() => go('test')} className="btn-game btn-lime px-7 py-4 text-lg glowpulse">
                <Play className="w-5 h-5" fill="currentColor" /> {t('O‘ynashni boshlash')}
              </button>
              <button onClick={() => go('teacher')} className="btn-game btn-ghost px-6 py-4 text-lg">
                <School className="w-5 h-5" /> {t('Ustoz sifatida sinf ochish')}
              </button>
            </div>
            <div className="flex items-center gap-3 mt-8">
              <div className="flex -space-x-2">
                {['#3b82f6', '#ff7a1a', '#22c55e', '#ec4899', '#ffd43b'].map((c, i) => (
                  <span key={i} className="w-9 h-9 rounded-full border-2 border-[#0d1440] grid place-items-center text-xs font-bold" style={{ background: c }}>
                    {['M', 'S', 'Z', 'A', 'J'][i]}
                  </span>
                ))}
              </div>
              <p className="text-sm text-white/70"><b className="text-white">{t('Birinchi pilot:')}</b> {t('To‘raqo‘rg‘on tumani 3-maktab')}</p>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -top-6 right-2 sm:right-6 z-20 floaty hidden sm:block">
              <div className="glass bg-[#121a52]/80 rounded-2xl px-4 py-2 text-sm font-bold flex items-center gap-2"><Flame className="w-4 h-4 text-[#ff7a1a]" /> {t('7 kunlik seriya!')}</div>
            </div>
            <div className="absolute top-24 -left-3 z-20 floaty hidden sm:block" style={{ animationDelay: '1.2s' }}>
              <div className="glass bg-[#121a52]/80 rounded-2xl px-4 py-2 text-sm font-bold flex items-center gap-2"><Crown className="w-4 h-4 text-[#ffd43b]" /> {t('Sinfda 1-o‘rin')}</div>
            </div>
            <div className="flex justify-center -mb-10 relative z-10">
              <Mascot size={230} className="floaty drop-shadow-[0_20px_40px_rgba(198,255,61,.25)]" />
            </div>
            <HeroRace />
          </div>
        </div>
        {/* stats */}
        <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-16">
          {[
            ['1–11', t('sinf'), '#3b82f6'],
            ['10+', t('fan'), '#c6ff3d'],
            ['4', t('til'), '#ffd43b'],
            ['195', t('davlat bayrog‘i va poytaxti'), '#ff7a1a'],
          ].map(([n, l, c]) => (
            <div key={l} className="glass rounded-2xl p-4 sm:p-5 text-center">
              <div className="font-display text-4xl sm:text-5xl font-bold" style={{ color: c }}>{n}</div>
              <div className="text-white/65 text-sm font-semibold mt-1">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW */}
      <Section eyebrow={t('Qanday ishlaydi')} title={<>{t('3 qadamda sinf o‘yinga kiradi')}</>} sub={t('Har bir o‘quvchi faqat o‘z sinfi darsligidagi va o‘tilgan mavzular bo‘yicha savollar oladi.')}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {[
            { i: KeyRound, n: '01', h: t('Ustoz sinf ochadi'), p: t('“8-B” sinfini yaratadi va o‘quvchilarga maxsus kod beradi. Begona kishi sinfga kira olmaydi.'), c: '#3b82f6' },
            { i: BookMarked, n: '02', h: t('Darslik bo‘yicha o‘ynaydi'), p: t('Mavzular chorak taqvimiga qarab ochiladi. 5-sinf 8-sinf masalasini olmaydi — adolatli va foydali.'), c: '#c6ff3d' },
            { i: TrendingUp, n: '03', h: t('Reyting o‘sadi'), p: t('Sinf, parallel sinflar, maktab, tuman va viloyat reytingi. Haftalik ligalar — har kim yuqoriga chiqa oladi.'), c: '#ff7a1a' },
          ].map(({ i: I, n, h, p, c }) => (
            <div key={n} className="glass rounded-3xl p-6 sm:p-7 relative overflow-hidden group hover:-translate-y-1 transition">
              <span className="absolute -right-2 -top-6 font-display text-[120px] font-bold text-white/5">{n}</span>
              <div className="w-14 h-14 rounded-2xl grid place-items-center mb-5" style={{ background: `${c}22`, color: c }}><I className="w-7 h-7" /></div>
              <h3 className="font-display text-2xl font-bold">{h}</h3>
              <p className="text-white/65 mt-2">{p}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* GENERAL TEST */}
      <Section eyebrow={t('Umumiy test')} title={<>{t('Sinfdan tashqari:')} <span className="grad-text">{t('umumiy bilim bellashuvi')}</span></>} sub={t('Geografiya, ingliz va rus tili, mental arifmetika, biologiya, tarix, mantiq, robototexnika va IT. Yakka yoki do‘stingiz bilan mashina poygasida.')}>
        <button onClick={() => go('test')} className="w-full rounded-[32px] overflow-hidden relative text-left p-6 sm:p-10 bg-gradient-to-br from-[#10b981] via-[#0ea5e9] to-[#6366f1] shadow-[0_10px_0_#0b4b6e] hover:-translate-y-1 transition">
          <Globe2 className="absolute -right-10 -bottom-10 w-64 h-64 text-white/15" />
          <div className="relative grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 items-center">
            <div>
              <div className="flex flex-wrap gap-2">
                {[t('1 kishilik'), t('2 kishilik'), t('Oson · O‘rta · Qiyin'), 'Beginner → Advanced'].map((x) => <span key={x} className="text-xs font-bold px-3 py-1 rounded-full bg-black/20">{x}</span>)}
              </div>
              <div className="font-display text-3xl sm:text-4xl font-bold mt-4">{t('9 ta fan, 195 ta davlat, cheksiz mantiq va mental savollar')}</div>
            </div>
            <span className="btn-game btn-lime px-7 py-4 text-lg">{t('Testni boshlash')} <ArrowRight className="w-5 h-5" /></span>
          </div>
        </button>
      </Section>

      {/* SUBJECTS */}
      <Section eyebrow={t('Darslik fanlari')} title={<>{t('Birinchi bosqichda')} <span className="grad-text">{t('10 ta fan')}</span></>} sub={t('Keyingi bosqichlarda kimyo, fizika, informatika va boshqa fanlar qo‘shiladi.')}>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {SUBJECTS.map((s) => (
            <button key={s.id} onClick={() => go('path')} className="group relative rounded-3xl p-4 sm:p-5 text-left overflow-hidden hover:-translate-y-1.5 transition shadow-[0_8px_0_rgba(0,0,0,.35)] active:translate-y-0" style={{ background: `linear-gradient(145deg, ${s.from}, ${s.to})` }}>
              <div className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full bg-white/15 group-hover:scale-125 transition" />
              <s.icon className="w-9 h-9 sm:w-10 sm:h-10 text-white drop-shadow" strokeWidth={2.2} />
              <div className="font-display text-lg sm:text-xl font-bold mt-6 leading-tight">{t(s.name)}</div>
              <div className="flex items-center justify-between mt-2 text-xs font-bold text-white/85">
                <span className="px-2 py-0.5 rounded-full bg-black/20">{t(s.grades)}</span>
                <span>{t('{n}+ mavzu', { n: s.topics })}</span>
              </div>
            </button>
          ))}
        </div>
      </Section>

      {/* MODES */}
      <Section eyebrow={t('O‘yin rejimlari')} title={<>{t('Zerikish')} <span className="text-[#ff7a1a]">{t('mumkin emas')}</span></>} sub={t('Bitta ekranda ikki kishi, butun sinf yoki yakka sarguzasht — har biri bilimga xizmat qiladi.')}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {modes.map((m) => (
            <button key={m.title} onClick={() => go(m.page)} className="glass rounded-3xl p-6 text-left relative overflow-hidden group hover:-translate-y-1 hover:border-white/30 transition">
              <div className="absolute inset-x-0 top-0 h-1" style={{ background: m.color }} />
              {m.tag && <span className="absolute top-4 right-4 text-[10px] font-extrabold uppercase px-2 py-1 rounded-full bg-[#c6ff3d] text-[#0b1033]">{m.tag}</span>}
              <div className="w-12 h-12 rounded-2xl grid place-items-center mb-4" style={{ background: `${m.color}26`, color: m.color }}><m.icon className="w-6 h-6" /></div>
              <h3 className="font-display text-xl font-bold">{m.title}</h3>
              <p className="text-white/65 text-sm mt-2">{m.desc}</p>
              <span className="inline-flex items-center gap-1 mt-4 text-sm font-bold text-white/80 group-hover:text-[#c6ff3d]">{t('O‘ynash')} <ArrowRight className="w-4 h-4" /></span>
            </button>
          ))}
          <button onClick={() => go('test')} className="rounded-3xl p-6 text-left relative overflow-hidden group hover:-translate-y-1 transition bg-gradient-to-br from-[#10b981] to-[#0ea5e9] shadow-[0_8px_0_#06606e]">
            <Globe2 className="absolute -right-6 -bottom-6 w-36 h-36 text-white/15 group-hover:rotate-12 transition" />
            <span className="text-[10px] font-extrabold uppercase px-2 py-1 rounded-full bg-white text-[#06606e]">{t('Umumiy test')}</span>
            <h3 className="font-display text-2xl font-bold mt-4">{t('Bayroqlar va poytaxtlar')}</h3>
            <p className="text-white/90 text-sm mt-2">{t('195 ta davlat: oson, o‘rta va qiyin darajalar.')}</p>
            <span className="inline-flex items-center gap-1 mt-4 text-sm font-bold">{t('Sinab ko‘rish')} <ArrowRight className="w-4 h-4" /></span>
          </button>
        </div>
      </Section>

      {/* GARAGE */}
      <Section eyebrow={t('Garaj va mukofotlar')} title={<>{t('Haqiqiy mashinalar,')} <span className="text-[#ffd43b]">{t('haqiqiy raqobat')}</span></>} sub={t('O‘zbekiston yo‘llaridagi mashinalar bilan poyga qiling. Qoidalar hammaga bir xil: tezlikni faqat bilim beradi.')}>
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-4 sm:gap-6">
          <div className="glass rounded-3xl p-4 sm:p-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {CARS.map((c) => (
                <button key={c.id} onClick={() => go('garage')} className="rounded-2xl overflow-hidden border border-white/10 bg-black/20 text-left hover:border-white/40 transition">
                  <CarPhoto car={c} className="aspect-[16/10] w-full" />
                  <div className="p-3">
                    <div className="font-display font-bold text-sm leading-tight">{c.name}</div>
                    <div className="text-[11px] text-white/55 flex items-center gap-1 mt-0.5"><Gauge className="w-3 h-3" /> {c.hp} {t('o.k.')} · {c.engine}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
          <div className="grid gap-4">
            <div className="glass rounded-3xl p-5 sm:p-6">
              <h3 className="font-display text-xl font-bold mb-4">{t('Haftalik ligalar')}</h3>
              <div className="grid grid-cols-4 gap-2">
                {[
                  [t('Bronza'), '#cd7f32'], [t('Kumush'), '#c0c7d6'], [t('Oltin'), '#ffd43b'], [t('Olmos'), '#67e8f9'],
                ].map(([n, c], i) => (
                  <div key={n} className="text-center">
                    <div className="mx-auto w-14 h-16 sm:w-16 sm:h-[72px] grid place-items-center" style={{ clipPath: 'polygon(50% 0, 100% 22%, 100% 74%, 50% 100%, 0 74%, 0 22%)', background: `linear-gradient(160deg, ${c}, ${c}55)` }}>
                      <Medal className="w-6 h-6 text-[#0b1033]" />
                    </div>
                    <div className="text-xs font-bold mt-2" style={{ color: c }}>{n}</div>
                    {i === 2 && <div className="text-[10px] text-white/50">{t('Siz shu yerda')}</div>}
                  </div>
                ))}
              </div>
            </div>
            <div className="glass rounded-3xl p-5 sm:p-6">
              <h3 className="font-display text-xl font-bold mb-4">{t('Nishonlar')}</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  [Crown, t('Matematika qiroli'), '#ffd43b'], [Flame, t('7 kunlik seriya'), '#ff7a1a'], [Globe2, t('Bayroq ustasi'), '#22d3ee'], [Star, t('Mukammal raund'), '#c6ff3d'], [Zap, t('Nitro chempioni'), '#a78bfa'],
                ].map(([I, l, c]: any) => (
                  <span key={l} className="inline-flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-bold" style={{ background: `${c}1f`, color: c }}><I className="w-4 h-4" /> {l}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* TEACHERS */}
      <Section eyebrow={t('Ustozlar va maktablar uchun')} title={<>{t('Ustoz uchun')} <span className="text-[#22d3ee]">{t('tayyor hisobot')}</span></>} sub={t('Kim qaysi mavzuda qiynalyapti — bir qarashda. Baho bo‘yicha tavsiya, yakuniy qarorni ustoz qabul qiladi.')}>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-6 items-center">
          <ul className="space-y-4">
            {[
              [KeyRound, t('Sinf kodi'), t('Faqat ustoz bergan kod bilan kiriladi — reyting ishonchli.')],
              [BarChart3, t('Mavzu bo‘yicha hisobot'), t('Har bir o‘quvchi va har bir mavzu bo‘yicha aniqlik, tezlik va o‘sish.')],
              [Bell, t('Ota-onaga haftalik xabar'), t('Farzand qancha o‘qidi, nimada qiynaldi — Telegram orqali.')],
              [ShieldCheck, t('Bolalar uchun xavfsiz'), t('Chat yo‘q, reklama yo‘q, kunlik vaqt chegarasi.')],
            ].map(([I, h, p]: any) => (
              <li key={h} className="flex gap-4 glass rounded-2xl p-4">
                <span className="w-11 h-11 shrink-0 rounded-xl grid place-items-center bg-[#22d3ee]/15 text-[#22d3ee]"><I className="w-5 h-5" /></span>
                <div><div className="font-display font-bold text-lg">{h}</div><div className="text-white/65 text-sm">{p}</div></div>
              </li>
            ))}
            <button onClick={() => go('teacher')} className="btn-game btn-blue px-6 py-3.5 mt-2">{t('Ustoz panelini ko‘rish')} <ArrowRight className="w-4 h-4" /></button>
          </ul>
          <button onClick={() => go('teacher')} className="glass rounded-3xl p-4 sm:p-6 text-left hover:-translate-y-1 transition">
            <div className="flex items-center justify-between">
              <div><div className="text-xs text-white/50 font-bold">8-B · {t('Algebra')}</div><div className="font-display text-xl font-bold">{t('Sinf natijalari')}</div></div>
              <span className="text-xs font-bold px-2 py-1 rounded-lg bg-[#c6ff3d]/15 text-[#c6ff3d]">{t('Jonli')}</span>
            </div>
            <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-4">
              {[['78%', t('O‘rtacha aniqlik')], ['24/28', t('Faol o‘quvchi')], ['412', t('Haftalik test')]].map(([v, l]) => (
                <div key={l} className="rounded-2xl bg-black/25 p-3"><div className="font-display text-2xl font-bold">{v}</div><div className="text-[11px] text-white/55">{l}</div></div>
              ))}
            </div>
            <div className="mt-4 space-y-2">
              {[[t('Chiziqli tengsizliklar'), 91], [t('Kvadrat ildiz'), 84], [t('Kvadrat tenglamalar'), 67], [t('Viyet teoremasi'), 42]].map(([n, v]: any) => (
                <div key={n}>
                  <div className="flex justify-between text-xs font-semibold"><span className="text-white/75">{n}</span><span>{v}%</span></div>
                  <div className="h-2.5 rounded-full bg-white/10 mt-1 overflow-hidden"><div className="h-full rounded-full" style={{ width: `${v}%`, background: v > 80 ? '#c6ff3d' : v > 60 ? '#ffd43b' : '#ff6b6b' }} /></div>
                </div>
              ))}
            </div>
          </button>
        </div>
      </Section>

      {/* PILOT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-24">
        <div className="relative rounded-[32px] overflow-hidden p-6 sm:p-10 bg-gradient-to-r from-[#3b2bd6] via-[#5b3bf0] to-[#ff7a1a]">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '18px 18px' }} />
          <div className="relative grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-6 items-center">
            <div className="w-20 h-20 rounded-3xl bg-white grid place-items-center text-[#3b2bd6]"><School className="w-10 h-10" /></div>
            <div>
              <div className="text-xs font-extrabold uppercase tracking-widest text-white/80">{t('Birinchi pilot maktab')}</div>
              <div className="font-display text-2xl sm:text-3xl font-bold mt-1">{t('To‘raqo‘rg‘on tumani 3-sonli umumta’lim maktabi')}</div>
              <div className="text-white/85 mt-1">{t('Namangan viloyati · 5–9-sinflar · 10 ta fan')}</div>
            </div>
            <button onClick={openCode} className="btn-game btn-lime px-6 py-4">{t('Maktabingizni qo‘shing')}</button>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <Section eyebrow={t('Narxlar')} title={<>{t('O‘quvchi uchun')} <span className="text-[#c6ff3d]">{t('bepul')}</span></>}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {[
            { n: t('O‘quvchi'), p: t('Bepul'), s: t('har doim'), f: [t('Barcha o‘yin rejimlari'), t('Sinf va maktab reytingi'), t('Garaj va nishonlar'), t('4 tilda interfeys')], btn: 'btn-ghost', cta: t('Sinf kodi bilan kirish') },
            { n: t('Maktab'), p: t('Yillik obuna'), s: t('maktab uchun'), f: [t('Cheksiz sinf va ustozlar'), t('Mavzu bo‘yicha hisobotlar'), t('Baho bo‘yicha tavsiya'), t('Maktab ichki turnirlari'), t('Jonli dars rejimi')], btn: 'btn-lime', cta: t('Bog‘lanish'), hot: true },
            { n: t('Ota-ona Premium'), p: t('Oylik'), s: t('bir oila uchun'), f: [t('Batafsil haftalik hisobot'), t('Kunlik vaqt chegarasi'), t('Zaif mavzular uchun mashqlar'), t('Telegram bildirishnomalari')], btn: 'btn-ghost', cta: t('Kutish ro‘yxati') },
          ].map((x) => (
            <div key={x.n} className={`rounded-3xl p-6 sm:p-7 relative ${x.hot ? 'bg-gradient-to-b from-[#1e2a8a] to-[#121a52] border-2 border-[#c6ff3d] shadow-[0_0_60px_-20px_#c6ff3d]' : 'glass'}`}>
              {x.hot && <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-extrabold px-3 py-1 rounded-full bg-[#c6ff3d] text-[#0b1033] whitespace-nowrap">{t('Eng mashhur')}</span>}
              <div className="font-display text-xl font-bold">{x.n}</div>
              <div className="font-display text-4xl font-bold mt-3">{x.p}</div>
              <div className="text-white/55 text-sm">{x.s}</div>
              <ul className="mt-6 space-y-3">
                {x.f.map((f) => <li key={f} className="flex gap-2 text-sm"><Check className="w-5 h-5 text-[#c6ff3d] shrink-0" /> {f}</li>)}
              </ul>
              <button onClick={openCode} className={`btn-game ${x.btn} w-full py-3.5 mt-7`}>{x.cta}</button>
            </div>
          ))}
        </div>
      </Section>

      {/* FINAL CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 mt-24 text-center">
        <div className="flex justify-center"><Mascot size={150} /></div>
        <h2 className="font-display text-4xl sm:text-6xl font-bold mt-4">{t('Bugun o‘yna —')} <span className="grad-text">{t('ertaga a’lochi bo‘l!')}</span></h2>
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          <button onClick={() => go('test')} className="btn-game btn-lime px-8 py-4 text-lg"><Play className="w-5 h-5" fill="currentColor" /> {t('Poygani boshlash')}</button>
          <button onClick={() => go('rating')} className="btn-game btn-ghost px-8 py-4 text-lg"><Users className="w-5 h-5" /> {t('Reytingni ko‘rish')}</button>
        </div>
      </section>
    </div>
  )
}

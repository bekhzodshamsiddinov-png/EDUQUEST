import React, { useState } from 'react'
import { Lock, Star, Crown, Play, MapPin, Swords, X } from 'lucide-react'
import type { Page } from '../App'
import { Mascot } from '../components/Mascot'
import { PATH_CHAPTERS, SUBJECTS } from '../data'

export function Adventure({ go }: { go: (p: Page) => void }) {
  const [grade, setGrade] = useState(8)
  const [subject, setSubject] = useState('algebra')
  const [sel, setSel] = useState<number | null>(null)
  const [warn, setWarn] = useState(false)
  const subj = SUBJECTS.find((s) => s.id === subject)!
  const myGrade = 8

  const pickGrade = (g: number) => {
    if (g > myGrade) { setWarn(true); return }
    setGrade(g)
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-10">
      <div className="text-center">
        <span className="text-xs font-extrabold tracking-[0.25em] uppercase text-[#c6ff3d]">Sarguzasht yo‘li</span>
        <h1 className="font-display text-4xl sm:text-6xl font-bold mt-3">Darslik — bu <span className="grad-text">sayohat</span></h1>
        <p className="text-white/65 mt-3 max-w-xl mx-auto">Har bir bob — O‘zbekistonning bir shahri. Bobni yakunlang, yulduz yig‘ing va Boss poygasida g‘alaba qozoning.</p>
      </div>

      {/* selectors */}
      <div className="glass rounded-3xl p-4 sm:p-5 mt-8">
        <div className="text-xs font-bold text-white/50 mb-2">Sinf (siz: {myGrade}-sinf)</div>
        <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1">
          {Array.from({ length: 11 }).map((_, i) => {
            const g = i + 1
            const locked = g > myGrade
            return (
              <button key={g} onClick={() => pickGrade(g)} className={`shrink-0 w-12 h-12 rounded-xl font-display text-lg font-bold relative ${grade === g ? 'bg-[#c6ff3d] text-[#0b1033]' : locked ? 'bg-white/5 text-white/30' : 'bg-white/10 hover:bg-white/20'}`}>
                {g}
                {locked && <Lock className="w-3 h-3 absolute top-1 right-1" />}
              </button>
            )
          })}
        </div>
        <div className="text-xs font-bold text-white/50 mt-4 mb-2">Fan</div>
        <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1">
          {SUBJECTS.map((s) => (
            <button key={s.id} onClick={() => setSubject(s.id)} className={`shrink-0 flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-bold ${subject === s.id ? 'text-[#0b1033]' : 'bg-white/10 hover:bg-white/20'}`} style={subject === s.id ? { background: `linear-gradient(135deg, ${s.from}, ${s.to})`, color: '#fff' } : undefined}>
              <s.icon className="w-4 h-4" /> {s.name}
            </button>
          ))}
        </div>
        {warn && (
          <div className="mt-4 flex items-start gap-3 rounded-2xl bg-[#ffd43b]/15 border border-[#ffd43b]/40 p-3 text-sm pop">
            <Lock className="w-5 h-5 text-[#ffd43b] shrink-0" />
            <div className="flex-1">Yuqori sinf mavzulari hali yopiq. Siz {myGrade}-sinfda o‘qiysiz — avval o‘z darsligingizni zabt eting!</div>
            <button onClick={() => setWarn(false)} aria-label="Yopish"><X className="w-4 h-4" /></button>
          </div>
        )}
      </div>

      {/* map */}
      <div className="relative mt-10">
        <div className="flex items-center justify-between mb-4">
          <div className="font-display text-2xl font-bold">{grade}-sinf · {subj.name}</div>
          <div className="flex items-center gap-1 text-[#ffd43b] font-bold"><Star className="w-5 h-5" fill="currentColor" /> 8 / 21</div>
        </div>
        <div className="relative rounded-[32px] overflow-hidden glass p-6 sm:p-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 10%, rgba(34,211,238,.15), transparent 40%), radial-gradient(circle at 80% 70%, rgba(198,255,61,.12), transparent 45%)' }}>
          <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none" viewBox="0 0 100 100">
            <path d="M50 4 C 80 12, 80 22, 50 28 S 20 44, 50 50 S 80 66, 50 72 S 20 88, 50 96" fill="none" stroke="rgba(255,255,255,.18)" strokeWidth="1.2" strokeDasharray="2 2" vectorEffect="non-scaling-stroke" />
          </svg>
          <div className="relative flex flex-col gap-8 sm:gap-10">
            {PATH_CHAPTERS.map((c, i) => {
              const offset = [0, 1, 0, -1][i % 4]
              const locked = c.state === 'locked'
              const boss = c.state === 'boss'
              const current = c.state === 'current'
              return (
                <div key={c.city} className="flex items-center justify-center" style={{ transform: `translateX(${offset * 28}%)` }}>
                  <div className="flex flex-col items-center relative">
                    {current && (
                      <div className="absolute -left-36 sm:-left-48 -top-6 hidden sm:block">
                        <div className="relative">
                          <Mascot size={110} />
                          <div className="absolute -top-8 left-16 glass bg-[#121a52]/90 rounded-2xl px-3 py-2 text-xs font-bold whitespace-nowrap">Shu yerdan davom etamiz!</div>
                        </div>
                      </div>
                    )}
                    <button
                      onClick={() => setSel(i)}
                      className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-full grid place-items-center font-display text-2xl font-bold transition hover:scale-105 ${
                        boss ? 'bg-gradient-to-br from-[#ff4d4d] to-[#ff7a1a] shadow-[0_8px_0_#8a1e00]' : locked ? 'bg-[#2a2f55] shadow-[0_8px_0_#151833] text-white/40' : current ? 'bg-gradient-to-br from-[#c6ff3d] to-[#22d3ee] text-[#0b1033] shadow-[0_8px_0_#4a7a00] glowpulse' : 'bg-gradient-to-br from-[#3b82f6] to-[#5b3bf0] shadow-[0_8px_0_#1d2a8a]'
                      }`}
                      aria-label={c.title}
                    >
                      {boss ? <Crown className="w-9 h-9" /> : locked ? <Lock className="w-8 h-8" /> : current ? <Play className="w-9 h-9" fill="currentColor" /> : i + 1}
                    </button>
                    <div className="flex gap-0.5 mt-3">
                      {[0, 1, 2].map((s) => <Star key={s} className={`w-4 h-4 ${s < c.stars ? 'text-[#ffd43b]' : 'text-white/20'}`} fill="currentColor" />)}
                    </div>
                    <div className="text-center mt-1">
                      <div className="flex items-center justify-center gap-1 text-xs font-bold text-white/60"><MapPin className="w-3 h-3" /> {c.city}</div>
                      <div className={`font-bold text-sm max-w-[200px] ${locked ? 'text-white/40' : ''}`}>{c.title}</div>
                      {locked && <div className="text-[11px] text-white/40">Hali o‘tilmagan · 2-chorak</div>}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {sel !== null && (
        <div className="fixed inset-0 z-[60] grid place-items-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setSel(null)}>
          <div className="glass bg-[#121a52]/95 rounded-3xl p-6 sm:p-8 w-full max-w-md pop" onClick={(e) => e.stopPropagation()}>
            {(() => {
              const c = PATH_CHAPTERS[sel]
              const locked = c.state === 'locked'
              return (
                <>
                  <div className="text-xs font-bold text-white/50 flex items-center gap-1"><MapPin className="w-3 h-3" /> {c.city}</div>
                  <h3 className="font-display text-2xl font-bold mt-1">{c.title}</h3>
                  {c.state === 'boss' ? (
                    <p className="text-white/70 mt-3">Yarim yillik yakuniy poyga: barcha boblardan savollar, 3 ta hayot va maxsus “Boss” mashinasi. G‘olibga <b className="text-[#ffd43b]">Oltin kubok</b> nishoni beriladi. Ochilishi uchun oldingi boblarni yakunlang.</p>
                  ) : locked ? (
                    <p className="text-white/70 mt-3">Bu mavzu darslik bo‘yicha 2-chorakda o‘tiladi. Ustozingiz ochganda yoki mavzu o‘tilgach avtomatik ochiladi.</p>
                  ) : (
                    <div className="grid grid-cols-3 gap-2 mt-4 text-center text-sm">
                      {['Oson · 10', 'O‘rta · 10', 'Qiyin · 10'].map((x, i) => (
                        <div key={x} className={`rounded-xl py-3 font-bold ${i < c.stars ? 'bg-[#c6ff3d]/15 text-[#c6ff3d]' : 'bg-white/5'}`}>{x}</div>
                      ))}
                    </div>
                  )}
                  <div className="flex gap-3 mt-6">
                    {!locked && c.state !== 'boss' && <button onClick={() => go('race')} className="btn-game btn-lime flex-1 py-3.5"><Play className="w-5 h-5" fill="currentColor" /> {c.state === 'done' ? 'Qayta o‘ynash' : 'Boshlash'}</button>}
                    {c.state === 'boss' && <button disabled className="btn-game btn-ghost flex-1 py-3.5 opacity-60 cursor-not-allowed"><Swords className="w-5 h-5" /> Hozircha yopiq</button>}
                    <button onClick={() => setSel(null)} className="btn-game btn-ghost flex-1 py-3.5">Yopish</button>
                  </div>
                </>
              )
            })()}
          </div>
        </div>
      )}
    </div>
  )
}

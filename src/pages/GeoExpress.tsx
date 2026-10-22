import React, { useEffect, useState } from 'react'
import { Flame, Timer, RotateCcw, Globe2, Flag as FlagIcon, Building2, Shuffle, Trophy } from 'lucide-react'
import { COUNTRIES, Flag } from '../components/Flags'

type Mode = 'flag' | 'capital' | 'mix'
const TOTAL = 10
const TIME = 45

function shuffle<T>(a: T[]): T[] {
  const b = [...a]
  for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]] }
  return b
}

function makeQuestions(mode: Mode) {
  return shuffle(COUNTRIES).slice(0, TOTAL).map((c, i) => {
    const kind: 'flag' | 'capital' = mode === 'mix' ? (i % 2 ? 'capital' : 'flag') : mode
    const others = shuffle(COUNTRIES.filter((x) => x.code !== c.code)).slice(0, 3)
    const opts = shuffle([c, ...others])
    return { c, kind, opts }
  })
}

export function GeoExpress() {
  const [mode, setMode] = useState<Mode>('flag')
  const [qs, setQs] = useState(() => makeQuestions('flag'))
  const [i, setI] = useState(0)
  const [chosen, setChosen] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [best, setBest] = useState(0)
  const [time, setTime] = useState(TIME)
  const [done, setDone] = useState(false)

  const restart = (m: Mode = mode) => { setMode(m); setQs(makeQuestions(m)); setI(0); setChosen(null); setScore(0); setStreak(0); setBest(0); setTime(TIME); setDone(false) }

  useEffect(() => {
    if (done) return
    const iv = setInterval(() => setTime((t) => { if (t <= 1) { setDone(true); return 0 } return t - 1 }), 1000)
    return () => clearInterval(iv)
  }, [done])

  const q = qs[i]
  const pick = (code: string) => {
    if (chosen || done) return
    setChosen(code)
    const ok = code === q.c.code
    if (ok) { setScore((s) => s + 1); setStreak((s) => { const n = s + 1; setBest((b) => Math.max(b, n)); return n }) } else setStreak(0)
    setTimeout(() => {
      if (i + 1 >= qs.length) setDone(true)
      else { setI(i + 1); setChosen(null) }
    }, ok ? 650 : 1300)
  }

  const modes: { id: Mode; label: string; icon: any }[] = [
    { id: 'flag', label: 'Bayroqlar', icon: FlagIcon },
    { id: 'capital', label: 'Poytaxtlar', icon: Building2 },
    { id: 'mix', label: 'Aralash', icon: Shuffle },
  ]

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10">
      <div className="text-center">
        <span className="text-xs font-extrabold tracking-[0.25em] uppercase text-[#c6ff3d]">Maxsus mashq</span>
        <h1 className="font-display text-4xl sm:text-6xl font-bold mt-3 flex items-center justify-center gap-3"><Globe2 className="w-10 h-10 sm:w-14 sm:h-14 text-[#22d3ee]" /> Geografiya <span className="grad-text">ekspressi</span></h1>
        <p className="text-white/65 mt-3">To‘liq versiyada 220 ta davlat va hudud. Demo: 12 ta davlat.</p>
      </div>

      <div className="flex justify-center gap-2 mt-6">
        {modes.map((m) => (
          <button key={m.id} onClick={() => restart(m.id)} className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm ${mode === m.id ? 'bg-[#c6ff3d] text-[#0b1033]' : 'bg-white/10 hover:bg-white/20'}`}>
            <m.icon className="w-4 h-4" /> {m.label}
          </button>
        ))}
      </div>

      <div className="glass rounded-[32px] p-5 sm:p-8 mt-6 relative overflow-hidden">
        <div className="flex items-center justify-between text-sm font-bold">
          <span className="px-3 py-1.5 rounded-xl bg-white/10">{Math.min(i + 1, TOTAL)} / {TOTAL}</span>
          <span className={`px-3 py-1.5 rounded-xl flex items-center gap-1 ${streak >= 2 ? 'bg-[#ffd43b]/20 text-[#ffd43b]' : 'bg-white/10'}`}><Flame className="w-4 h-4" /> {streak}</span>
          <span className={`px-3 py-1.5 rounded-xl flex items-center gap-1 tabular-nums ${time <= 10 ? 'bg-[#ff4d4d]' : 'bg-white/10'}`}><Timer className="w-4 h-4" /> {time} s</span>
        </div>
        <div className="h-2 rounded-full bg-white/10 mt-4 overflow-hidden"><div className="h-full bg-gradient-to-r from-[#22d3ee] to-[#c6ff3d] transition-all" style={{ width: `${(i / TOTAL) * 100}%` }} /></div>

        {!done ? (
          <div key={i} className="pop">
            <div className="flex flex-col items-center mt-8">
              {q.kind === 'flag' ? (
                <>
                  <Flag code={q.c.code} width={220} />
                  <div className="font-display text-2xl sm:text-3xl font-bold mt-6 text-center">Bu qaysi davlatning bayrog‘i?</div>
                </>
              ) : (
                <>
                  <div className="w-24 h-24 rounded-3xl grid place-items-center bg-[#22d3ee]/15 text-[#22d3ee]"><Building2 className="w-12 h-12" /></div>
                  <div className="font-display text-2xl sm:text-3xl font-bold mt-6 text-center"><span className="text-[#c6ff3d]">{q.c.name}</span>ning poytaxti qaysi?</div>
                </>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8">
              {q.opts.map((o, k) => {
                const label = q.kind === 'flag' ? o.name : o.capital
                const isRight = chosen && o.code === q.c.code
                const isWrong = chosen === o.code && o.code !== q.c.code
                return (
                  <button key={o.code} onClick={() => pick(o.code)} disabled={!!chosen} className={`flex items-center gap-3 rounded-2xl px-4 py-4 text-left font-bold text-lg border-2 transition ${isRight ? 'bg-[#c6ff3d] text-[#13210a] border-[#c6ff3d]' : isWrong ? 'bg-[#ff4d4d] border-[#ff4d4d] shake' : 'bg-white/5 border-white/15 hover:bg-white/10 hover:border-white/40'}`}>
                    <span className="w-8 h-8 rounded-lg grid place-items-center bg-black/25 text-sm">{['A', 'B', 'C', 'D'][k]}</span>
                    {label}
                  </button>
                )
              })}
            </div>
          </div>
        ) : (
          <div className="text-center py-10 pop">
            <Trophy className="w-16 h-16 mx-auto text-[#ffd43b]" />
            <div className="font-display text-5xl font-bold mt-4">{score} / {TOTAL}</div>
            <p className="text-white/65 mt-2">Eng uzun seriya: <b>{best}</b> · +{score * 10} XP</p>
            {score >= 8 && <div className="inline-flex mt-4 items-center gap-2 px-4 py-2 rounded-xl bg-[#22d3ee]/15 text-[#22d3ee] font-bold"><FlagIcon className="w-4 h-4" /> “Bayroq ustasi” nishoni!</div>}
            <div className="mt-6"><button onClick={() => restart()} className="btn-game btn-lime px-8 py-4"><RotateCcw className="w-5 h-5" /> Yana o‘ynash</button></div>
          </div>
        )}
      </div>
    </div>
  )
}

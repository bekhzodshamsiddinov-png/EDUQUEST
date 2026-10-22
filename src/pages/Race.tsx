import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Pause, Play, RotateCcw, Trophy, Flame, Zap, Timer, Keyboard, ChevronLeft, ChevronRight } from 'lucide-react'
import { Car, CAR_MODELS } from '../components/Car'
import { RACE_BANK } from '../data'

const GOAL = 120
const ROUND = 60
const KEYS: string[][] = [
  ['KeyA', 'KeyS', 'KeyD', 'KeyF'],
  ['KeyJ', 'KeyK', 'KeyL', 'Semicolon'],
]
const KEY_LABELS = [['A', 'S', 'D', 'F'], ['J', 'K', 'L', ';']]

type PState = {
  deck: number[]
  pos: number
  qid: number
  options: string[]
  correctIdx: number
  dist: number
  streak: number
  best: number
  correct: number
  wrong: number
  locked: boolean
  chosen: number | null
  nitro: boolean
  pop: { id: number; text: string } | null
  shake: boolean
}

function shuffle<T>(a: T[]): T[] {
  const b = [...a]
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[b[i], b[j]] = [b[j], b[i]]
  }
  return b
}

function loadQ(p: PState, pos: number): PState {
  const deck = pos >= p.deck.length ? shuffle(p.deck) : p.deck
  const idx = pos % deck.length
  const q = RACE_BANK[deck[idx]]
  const order = shuffle([0, 1, 2, 3])
  return { ...p, deck, pos: idx, qid: p.qid + 1, options: order.map((i) => q.a[i]), correctIdx: order.indexOf(0), locked: false, chosen: null, nitro: false, shake: false }
}

function freshPlayer(offset: number): PState {
  const deck = shuffle(RACE_BANK.map((_, i) => i))
  // rotate so the two players never start on the same question
  const rotated = [...deck.slice(offset), ...deck.slice(0, offset)]
  const base: PState = { deck: rotated, pos: 0, qid: 0, options: [], correctIdx: 0, dist: 0, streak: 0, best: 0, correct: 0, wrong: 0, locked: false, chosen: null, nitro: false, pop: null, shake: false }
  return loadQ(base, 0)
}

type Phase = 'setup' | 'countdown' | 'play' | 'paused' | 'over'

function Confetti() {
  const colors = ['#c6ff3d', '#ffd43b', '#ff7a1a', '#3b82f6', '#ec4899', '#22d3ee']
  return (
    <>
      {Array.from({ length: 70 }).map((_, i) => (
        <span key={i} className="confetti" style={{ left: `${Math.random() * 100}%`, background: colors[i % colors.length], animationDuration: `${2 + Math.random() * 2.5}s`, animationDelay: `${Math.random() * 0.8}s` }} />
      ))}
    </>
  )
}

export function Race() {
  const [phase, setPhase] = useState<Phase>('setup')
  const [names, setNames] = useState(['Madina', 'Sardor'])
  const [cars, setCars] = useState([0, 3])
  const [players, setPlayers] = useState<PState[]>(() => [freshPlayer(0), freshPlayer(7)])
  const [count, setCount] = useState(3)
  const [left, setLeft] = useState(ROUND)
  const elapsedRef = useRef(0)
  const lastTickRef = useRef<number | null>(null)
  const phaseRef = useRef(phase)
  phaseRef.current = phase
  const timers = useRef<number[]>([])

  const clearTimers = () => { timers.current.forEach((t) => clearTimeout(t)); timers.current = [] }

  const start = () => {
    clearTimers()
    setPlayers([freshPlayer(0), freshPlayer(7 + Math.floor(Math.random() * 8))])
    elapsedRef.current = 0
    lastTickRef.current = null
    setLeft(ROUND)
    setCount(3)
    setPhase('countdown')
  }

  // countdown
  useEffect(() => {
    if (phase !== 'countdown') return
    if (count === 0) { const t = window.setTimeout(() => setPhase('play'), 600); return () => clearTimeout(t) }
    const t = window.setTimeout(() => setCount((c) => c - 1), 800)
    return () => clearTimeout(t)
  }, [phase, count])

  // round timer based on elapsed real time
  useEffect(() => {
    if (phase !== 'play') { lastTickRef.current = null; return }
    let raf = 0
    const tick = (now: number) => {
      if (lastTickRef.current !== null) elapsedRef.current += (now - lastTickRef.current) / 1000
      lastTickRef.current = now
      const remain = Math.max(0, ROUND - elapsedRef.current)
      setLeft(remain)
      if (remain <= 0) { setPhase('over'); return }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [phase])

  // pause when tab hidden
  useEffect(() => {
    const h = () => { if (document.hidden && phaseRef.current === 'play') setPhase('paused') }
    document.addEventListener('visibilitychange', h)
    return () => document.removeEventListener('visibilitychange', h)
  }, [])

  useEffect(() => () => clearTimers(), [])

  const answer = useCallback((pi: number, choice: number) => {
    if (phaseRef.current !== 'play') return
    setPlayers((ps) => {
      const p = ps[pi]
      if (p.locked) return ps
      const ok = choice === p.correctIdx
      const qid = p.qid
      const streak = ok ? p.streak + 1 : 0
      const nitro = ok && streak % 3 === 0
      const gain = ok ? 10 + (nitro ? 4 : 0) : 0
      const dist = Math.min(GOAL, p.dist + gain)
      const np: PState = {
        ...p,
        locked: true,
        chosen: choice,
        streak,
        best: Math.max(p.best, streak),
        correct: p.correct + (ok ? 1 : 0),
        wrong: p.wrong + (ok ? 0 : 1),
        dist,
        nitro,
        shake: !ok,
        pop: ok ? { id: Date.now() + pi, text: nitro ? 'NITRO! +14 m' : '+10 m' } : { id: Date.now() + pi, text: '1.5 s kutish' },
      }
      const delay = ok ? 650 : 1500
      const t = window.setTimeout(() => {
        setPlayers((cur) => {
          const c = cur[pi]
          if (c.qid !== qid) return cur // stale
          const next = [...cur]
          next[pi] = loadQ(c, c.pos + 1)
          return next
        })
      }, delay)
      timers.current.push(t)
      const out = [...ps]
      out[pi] = np
      if (dist >= GOAL) window.setTimeout(() => setPhase('over'), 700)
      return out
    })
  }, [])

  // keyboard (physical codes → works in any layout)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === 'Space' && (phaseRef.current === 'play' || phaseRef.current === 'paused')) {
        e.preventDefault(); setPhase((p) => (p === 'play' ? 'paused' : 'play')); return
      }
      KEYS.forEach((ks, pi) => {
        const i = ks.indexOf(e.code)
        if (i >= 0) { e.preventDefault(); answer(pi, i) }
      })
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [answer])

  const winner = (() => {
    const [a, b] = players
    if (a.dist !== b.dist) return a.dist > b.dist ? 0 : 1
    if (a.correct !== b.correct) return a.correct > b.correct ? 0 : 1
    if (a.wrong !== b.wrong) return a.wrong < b.wrong ? 0 : 1
    return -1
  })()

  const colors = [
    { main: '#3b82f6', dark: '#1a4cb5', btn: 'btn-blue', soft: 'rgba(59,130,246,.15)' },
    { main: '#ff7a1a', dark: '#b84a00', btn: 'btn-orange', soft: 'rgba(255,122,26,.15)' },
  ]

  if (phase === 'setup') {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-10">
        <div className="text-center">
          <span className="text-xs font-extrabold tracking-[0.25em] uppercase text-[#c6ff3d]">Bilim poygasi · Demo</span>
          <h1 className="font-display text-4xl sm:text-6xl font-bold mt-3">Kim birinchi <span className="grad-text">120 metr</span>ga yetadi?</h1>
          <p className="text-white/65 mt-3">8-sinf · Aralash fanlar. Har bir o‘yinchiga alohida savollar beriladi.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-10">
          {[0, 1].map((pi) => {
            const m = CAR_MODELS[cars[pi]]
            return (
              <div key={pi} className="glass rounded-3xl p-5 sm:p-6 border-t-4" style={{ borderTopColor: colors[pi].main }}>
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl grid place-items-center font-display font-bold text-lg" style={{ background: colors[pi].soft, color: colors[pi].main }}>{pi + 1}</span>
                  <input
                    value={names[pi]}
                    onChange={(e) => setNames((n) => n.map((x, i) => (i === pi ? e.target.value.slice(0, 16) : x)))}
                    className="flex-1 min-w-0 bg-black/25 border-2 border-white/10 focus:border-white/40 rounded-xl px-4 py-3 font-display text-xl font-bold outline-none"
                    aria-label={`${pi + 1}-o‘yinchi ismi`}
                  />
                </div>
                <div className="mt-4 rounded-2xl bg-black/25 p-4 flex items-center gap-2">
                  <button onClick={() => setCars((c) => c.map((x, i) => (i === pi ? (x + CAR_MODELS.length - 1) % CAR_MODELS.length : x)))} className="p-2 rounded-xl bg-white/10 hover:bg-white/20" aria-label="Oldingi mashina"><ChevronLeft /></button>
                  <div className="flex-1 min-w-0 flex flex-col items-center">
                    <Car color={colors[pi].main} dark={colors[pi].dark} variant={m.variant} width={170} number={pi + 1} />
                    <div className="font-display font-bold mt-1">{m.name}</div>
                  </div>
                  <button onClick={() => setCars((c) => c.map((x, i) => (i === pi ? (x + 1) % CAR_MODELS.length : x)))} className="p-2 rounded-xl bg-white/10 hover:bg-white/20" aria-label="Keyingi mashina"><ChevronRight /></button>
                </div>
                <div className="flex items-center justify-center gap-2 mt-4 text-sm text-white/60">
                  <Keyboard className="w-4 h-4" /> Tugmalar:
                  {KEY_LABELS[pi].map((k) => <kbd key={k} className="px-2 py-1 rounded-lg bg-white/10 font-bold text-white">{k}</kbd>)}
                </div>
              </div>
            )
          })}
        </div>
        <div className="glass rounded-3xl p-5 mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
          <div className="flex gap-3"><Zap className="text-[#c6ff3d] shrink-0" /> <span><b>+10 m</b> har bir to‘g‘ri javob uchun</span></div>
          <div className="flex gap-3"><Flame className="text-[#ffd43b] shrink-0" /> <span>3 ta ketma-ket to‘g‘ri — <b>NITRO +4 m</b></span></div>
          <div className="flex gap-3"><Timer className="text-[#ff7a1a] shrink-0" /> <span>Xato javob — <b>1,5 s kutish</b>, raqib davom etadi</span></div>
        </div>
        <div className="text-center mt-8">
          <button onClick={start} className="btn-game btn-lime px-10 py-5 text-xl glowpulse"><Play fill="currentColor" /> Poygani boshlash</button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 pt-6">
      {/* top bar */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        <span className="px-3 py-2 rounded-xl bg-white/10 text-sm font-bold">8-sinf · Aralash</span>
        <span className="px-3 py-2 rounded-xl bg-white/10 text-sm font-bold">Bilim poygasi · {GOAL} m</span>
        <div className="ml-auto flex items-center gap-2">
          <div className={`px-4 py-2 rounded-xl font-display text-xl font-bold tabular-nums ${left <= 10 ? 'bg-[#ff4d4d] animate-pulse' : 'bg-[#5b3bf0]'}`}>{Math.ceil(left)} s</div>
          <button onClick={() => setPhase((p) => (p === 'play' ? 'paused' : p === 'paused' ? 'play' : p))} className="btn-game btn-ghost px-3 py-2" aria-label="Pauza">{phase === 'paused' ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}</button>
          <button onClick={() => { clearTimers(); setPhase('setup') }} className="btn-game btn-ghost px-3 py-2" aria-label="Sozlamalar"><RotateCcw className="w-5 h-5" /></button>
        </div>
      </div>
      <div className="h-2 rounded-full bg-white/10 mt-3 overflow-hidden"><div className="h-full bg-gradient-to-r from-[#c6ff3d] to-[#22d3ee]" style={{ width: `${(left / ROUND) * 100}%` }} /></div>

      {/* track */}
      <div className="glass rounded-3xl p-3 sm:p-4 mt-4 bg-[#0b1033]/60">
        {[0, 1].map((pi) => {
          const p = players[pi]
          const m = CAR_MODELS[cars[pi]]
          return (
            <div key={pi} className={`relative h-[78px] sm:h-[92px] rounded-2xl track-lane ${phase === 'play' ? 'track-moving' : ''} mb-2 last:mb-0 overflow-hidden`}>
              <div className="absolute right-0 top-0 bottom-0 w-5 finish-flag" />
              <div className="absolute left-3 top-1.5 text-[11px] font-bold" style={{ color: colors[pi].main }}>{names[pi] || `${pi + 1}-o‘yinchi`}</div>
              <div className="absolute right-8 top-1.5 text-[11px] font-bold text-white/70 tabular-nums">{p.dist} / {GOAL} m</div>
              <div className="absolute bottom-0.5 transition-[left] duration-700 ease-out" style={{ left: `calc(${(p.dist / GOAL) * 82}% - 8px)` }}>
                <Car color={colors[pi].main} dark={colors[pi].dark} variant={m.variant} spinning={phase === 'play'} nitro={p.nitro} number={pi + 1} width={120} />
                {p.pop && <span key={p.pop.id} className={`rise absolute -top-2 left-14 text-xs font-extrabold whitespace-nowrap ${p.pop.text.startsWith('NITRO') ? 'text-[#ffd43b]' : p.pop.text.startsWith('+') ? 'text-[#c6ff3d]' : 'text-[#ff8a8a]'}`}>{p.pop.text}</span>}
              </div>
            </div>
          )
        })}
      </div>

      {/* panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mt-4">
        {[0, 1].map((pi) => {
          const p = players[pi]
          const q = RACE_BANK[p.deck[p.pos]]
          const acc = p.correct + p.wrong ? Math.round((p.correct / (p.correct + p.wrong)) * 100) : 100
          return (
            <div key={pi} className={`glass rounded-3xl p-4 sm:p-5 border-t-4 ${p.shake ? 'shake' : ''}`} style={{ borderTopColor: colors[pi].main }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg grid place-items-center font-bold" style={{ background: colors[pi].soft, color: colors[pi].main }}>{pi + 1}</span>
                  <span className="font-display text-lg font-bold">{names[pi] || `${pi + 1}-o‘yinchi`}</span>
                </div>
                <span className={`text-xs font-extrabold px-2.5 py-1 rounded-full flex items-center gap-1 ${p.streak >= 2 ? 'bg-[#ffd43b]/20 text-[#ffd43b]' : 'bg-white/10 text-white/60'}`}><Flame className="w-3.5 h-3.5" /> {p.streak} ketma-ket</span>
              </div>
              <div className="text-xs font-bold text-white/50 mt-4">{q.subject}</div>
              <div className="font-display text-xl sm:text-2xl font-bold mt-1 min-h-[64px]">{q.q}</div>
              <div className="grid grid-cols-2 gap-2 sm:gap-3 mt-3">
                {p.options.map((o, i) => {
                  const isCorrect = p.locked && i === p.correctIdx
                  const isWrong = p.locked && p.chosen === i && i !== p.correctIdx
                  return (
                    <button
                      key={`${p.qid}-${i}`}
                      onPointerDown={(e) => { e.preventDefault(); answer(pi, i) }}
                      onKeyDown={(e) => { if (e.key === 'Enter') answer(pi, i) }}
                      disabled={p.locked || phase !== 'play'}
                      className={`relative flex items-center gap-3 text-left rounded-2xl px-3 py-3.5 sm:py-4 font-bold border-2 transition active:translate-y-0.5 ${
                        isCorrect ? 'bg-[#c6ff3d] text-[#13210a] border-[#c6ff3d]' : isWrong ? 'bg-[#ff4d4d] border-[#ff4d4d]' : 'bg-white/5 border-white/15 hover:border-white/40 hover:bg-white/10'
                      } ${p.locked && !isCorrect && !isWrong ? 'opacity-50' : ''}`}
                    >
                      <span className="w-8 h-8 shrink-0 rounded-lg grid place-items-center text-sm font-extrabold bg-black/25">{KEY_LABELS[pi][i]}</span>
                      <span className="text-base sm:text-lg leading-tight">{o}</span>
                    </button>
                  )
                })}
              </div>
              <div className="grid grid-cols-3 gap-2 mt-4 text-center text-xs">
                <div className="rounded-xl bg-black/20 py-2"><div className="text-white/50">To‘g‘ri</div><div className="font-display text-lg font-bold text-[#c6ff3d]">{p.correct}</div></div>
                <div className="rounded-xl bg-black/20 py-2"><div className="text-white/50">Xato</div><div className="font-display text-lg font-bold text-[#ff8a8a]">{p.wrong}</div></div>
                <div className="rounded-xl bg-black/20 py-2"><div className="text-white/50">Aniqlik</div><div className="font-display text-lg font-bold">{acc}%</div></div>
              </div>
            </div>
          )
        })}
      </div>
      <p className="text-center text-xs text-white/40 mt-4">Bo‘sh joy (Space) — pauza. Ikkala o‘yinchi bir vaqtda, mustaqil javob beradi.</p>

      {/* overlays */}
      {phase === 'countdown' && (
        <div className="fixed inset-0 z-[60] grid place-items-center bg-[#070b26]/80 backdrop-blur-sm">
          <div key={count} className="pop font-display font-bold text-[160px] sm:text-[220px] leading-none" style={{ color: count === 0 ? '#c6ff3d' : '#fff' }}>{count === 0 ? 'START!' : count}</div>
        </div>
      )}
      {phase === 'paused' && (
        <div className="fixed inset-0 z-[60] grid place-items-center bg-[#070b26]/80 backdrop-blur-sm p-4">
          <div className="glass rounded-3xl p-8 text-center pop bg-[#121a52]/90">
            <div className="font-display text-4xl font-bold">Pauza</div>
            <p className="text-white/60 mt-2">Taymerlar to‘xtatildi</p>
            <button onClick={() => setPhase('play')} className="btn-game btn-lime px-8 py-4 mt-6"><Play fill="currentColor" /> Davom etish</button>
          </div>
        </div>
      )}
      {phase === 'over' && (
        <div className="fixed inset-0 z-[60] grid place-items-center bg-[#070b26]/85 backdrop-blur-sm p-4 overflow-y-auto">
          {winner >= 0 && <Confetti />}
          <div className="glass rounded-[32px] p-6 sm:p-8 w-full max-w-2xl text-center pop bg-[#121a52]/95">
            <Trophy className="w-16 h-16 mx-auto text-[#ffd43b]" />
            <div className="font-display text-4xl sm:text-5xl font-bold mt-3">
              {winner === -1 ? 'Durang!' : <><span style={{ color: colors[winner].main }}>{names[winner] || `${winner + 1}-o‘yinchi`}</span> g‘olib!</>}
            </div>
            <p className="text-white/60 mt-2">{players.some((p) => p.dist >= GOAL) ? 'Marraga birinchi yetib keldi' : 'Vaqt tugadi — masofa bo‘yicha hisoblandi'}</p>
            <div className="grid grid-cols-2 gap-3 mt-6">
              {[0, 1].map((pi) => {
                const p = players[pi]
                const acc = p.correct + p.wrong ? Math.round((p.correct / (p.correct + p.wrong)) * 100) : 0
                return (
                  <div key={pi} className="rounded-2xl p-4 text-left" style={{ background: colors[pi].soft, border: `2px solid ${winner === pi ? colors[pi].main : 'transparent'}` }}>
                    <div className="font-display text-lg font-bold" style={{ color: colors[pi].main }}>{names[pi] || `${pi + 1}-o‘yinchi`}</div>
                    <div className="text-sm mt-2 space-y-1 text-white/85">
                      <div>Masofa: <b>{p.dist} m</b></div>
                      <div>To‘g‘ri / xato: <b>{p.correct} / {p.wrong}</b></div>
                      <div>Aniqlik: <b>{acc}%</b></div>
                      <div>Eng uzun seriya: <b>{p.best}</b></div>
                      <div className="text-[#ffd43b]">+{p.correct * 10} XP · +{p.correct * 5} 🪙</div>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-7">
              <button onClick={start} className="btn-game btn-lime px-7 py-4"><RotateCcw className="w-5 h-5" /> Yana o‘ynash</button>
              <button onClick={() => setPhase('setup')} className="btn-game btn-ghost px-7 py-4">Sozlamalar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

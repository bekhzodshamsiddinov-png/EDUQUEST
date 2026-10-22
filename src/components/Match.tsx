import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Pause, Play, RotateCcw, Trophy, Flame, LogOut, Flag as FlagIcon } from 'lucide-react'
import type { RealCar } from '../cars'
import type { QItem } from '../quiz/generators'
import { CarToken } from './TopCar'
import { FlagImg } from './FlagImg'
import { useT } from '../lang'

const GOAL = 120
const KEYS: string[][] = [
  ['KeyA', 'KeyS', 'KeyD', 'KeyF'],
  ['KeyJ', 'KeyK', 'KeyL', 'Semicolon'],
]
const KEY_LABELS = [['A', 'S', 'D', 'F'], ['J', 'K', 'L', ';']]
const SOLO_KEYS = ['Digit1', 'Digit2', 'Digit3', 'Digit4']
const COLORS = [
  { main: '#3b82f6', soft: 'rgba(59,130,246,.15)' },
  { main: '#ff7a1a', soft: 'rgba(255,122,26,.15)' },
]

type PState = {
  deck: QItem[]
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
  finishedAt: number | null
}

function shuffle<T>(a: T[]): T[] {
  const b = [...a]
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[b[i], b[j]] = [b[j], b[i]]
  }
  return b
}

function loadQ(p: PState, pos: number, refill: () => QItem[]): PState {
  let deck = p.deck
  let idx = pos
  if (idx >= deck.length) { deck = refill(); idx = 0 }
  const q = deck[idx]
  const order = shuffle([0, 1, 2, 3])
  return { ...p, deck, pos: idx, qid: p.qid + 1, options: order.map((i) => q.a[i]), correctIdx: order.indexOf(0), locked: false, chosen: null, nitro: false, shake: false }
}

function fresh(refill: () => QItem[]): PState {
  const base: PState = { deck: refill(), pos: 0, qid: 0, options: [], correctIdx: 0, dist: 0, streak: 0, best: 0, correct: 0, wrong: 0, locked: false, chosen: null, nitro: false, pop: null, shake: false, finishedAt: null }
  return loadQ(base, 0, refill)
}

type Phase = 'countdown' | 'play' | 'paused' | 'over'

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

/** Shows mental-arithmetic numbers one by one, then reports completion. */
function SeqReveal({ seq, ms, onDone, paused }: { seq: string[]; ms: number; onDone: () => void; paused: boolean }) {
  const [i, setI] = useState(0)
  useEffect(() => {
    if (paused) return
    if (i >= seq.length) { onDone(); return }
    const t = setTimeout(() => setI((x) => x + 1), ms)
    return () => clearTimeout(t)
  }, [i, paused])
  const shown = i < seq.length ? seq[i] : '?'
  return (
    <div className="flex flex-col items-center py-2">
      <div key={i} className="pop font-display text-5xl sm:text-6xl font-bold tabular-nums">{shown}</div>
      <div className="flex gap-1 mt-3">{seq.map((_, k) => <span key={k} className={`w-2 h-2 rounded-full ${k < i ? 'bg-[#c6ff3d]' : 'bg-white/20'}`} />)}</div>
    </div>
  )
}

export function Match({
  players,
  names,
  cars,
  makePool,
  title,
  duration,
  onExit,
}: {
  players: 1 | 2
  names: string[]
  cars: RealCar[]
  makePool: () => QItem[]
  title: string
  duration: number
  onExit: () => void
}) {
  const t = useT()
  const ids = players === 2 ? [0, 1] : [0]
  const [phase, setPhase] = useState<Phase>('countdown')
  const [ps, setPs] = useState<PState[]>(() => ids.map(() => fresh(makePool)))
  const [count, setCount] = useState(3)
  const [left, setLeft] = useState(duration)
  const elapsedRef = useRef(0)
  const lastTickRef = useRef<number | null>(null)
  const phaseRef = useRef(phase)
  phaseRef.current = phase
  const timers = useRef<number[]>([])
  const revealed = useRef<number[]>([-1, -1])
  const [, force] = useState(0)

  const clearTimers = () => { timers.current.forEach((x) => clearTimeout(x)); timers.current = [] }

  const restart = () => {
    clearTimers()
    revealed.current = [-1, -1]
    setPs(ids.map(() => fresh(makePool)))
    elapsedRef.current = 0
    lastTickRef.current = null
    setLeft(duration)
    setCount(3)
    setPhase('countdown')
  }

  useEffect(() => {
    if (phase !== 'countdown') return
    if (count === 0) { const x = window.setTimeout(() => setPhase('play'), 600); return () => clearTimeout(x) }
    const x = window.setTimeout(() => setCount((c) => c - 1), 800)
    return () => clearTimeout(x)
  }, [phase, count])

  useEffect(() => {
    if (phase !== 'play') { lastTickRef.current = null; return }
    let raf = 0
    const tick = (now: number) => {
      if (lastTickRef.current !== null) elapsedRef.current += (now - lastTickRef.current) / 1000
      lastTickRef.current = now
      const remain = Math.max(0, duration - elapsedRef.current)
      setLeft(remain)
      if (remain <= 0) { setPhase('over'); return }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [phase])

  useEffect(() => {
    const h = () => { if (document.hidden && phaseRef.current === 'play') setPhase('paused') }
    document.addEventListener('visibilitychange', h)
    return () => document.removeEventListener('visibilitychange', h)
  }, [])

  useEffect(() => { window.scrollTo({ top: 0 }); return () => clearTimers() }, [])

  const answer = useCallback((pi: number, choice: number) => {
    if (phaseRef.current !== 'play') return
    setPs((cur) => {
      const p = cur[pi]
      if (!p || p.locked) return cur
      const q = p.deck[p.pos]
      if (q.seq && revealed.current[pi] !== p.qid) return cur
      const ok = choice === p.correctIdx
      const qid = p.qid
      const streak = ok ? p.streak + 1 : 0
      const nitro = ok && streak % 3 === 0
      const dist = Math.min(GOAL, p.dist + (ok ? 10 + (nitro ? 4 : 0) : 0))
      const np: PState = {
        ...p, locked: true, chosen: choice, streak, best: Math.max(p.best, streak),
        correct: p.correct + (ok ? 1 : 0), wrong: p.wrong + (ok ? 0 : 1), dist, nitro, shake: !ok,
        pop: { id: Date.now() + pi, text: ok ? (nitro ? 'NITRO +14 m' : '+10 m') : t('1,5 s kutish') },
        finishedAt: dist >= GOAL && p.finishedAt === null ? elapsedRef.current : p.finishedAt,
      }
      const x = window.setTimeout(() => {
        setPs((c2) => {
          const c = c2[pi]
          if (!c || c.qid !== qid) return c2
          const next = [...c2]
          next[pi] = loadQ(c, c.pos + 1, makePool)
          return next
        })
      }, ok ? 650 : 1500)
      timers.current.push(x)
      const out = [...cur]
      out[pi] = np
      if (dist >= GOAL) window.setTimeout(() => setPhase('over'), 700)
      return out
    })
  }, [makePool])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === 'Space' && (phaseRef.current === 'play' || phaseRef.current === 'paused')) {
        e.preventDefault(); setPhase((p) => (p === 'play' ? 'paused' : 'play')); return
      }
      KEYS.forEach((ks, pi) => {
        if (pi >= players) return
        const i = ks.indexOf(e.code)
        if (i >= 0) { e.preventDefault(); answer(pi, i) }
      })
      if (players === 1) {
        const i = SOLO_KEYS.indexOf(e.code)
        if (i >= 0) { e.preventDefault(); answer(0, i) }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [answer, players])

  const winner = (() => {
    if (players === 1) return ps[0].dist >= GOAL ? 0 : -2
    const [a, b] = ps
    if (a.dist !== b.dist) return a.dist > b.dist ? 0 : 1
    if (a.correct !== b.correct) return a.correct > b.correct ? 0 : 1
    if (a.wrong !== b.wrong) return a.wrong < b.wrong ? 0 : 1
    return -1
  })()
  const nm = (pi: number) => names[pi]?.trim() || t('{n}-o‘yinchi', { n: pi + 1 })
  const keyLabel = (pi: number, i: number) => (players === 1 ? String(i + 1) : KEY_LABELS[pi][i])

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 pt-6">
      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        <span className="px-3 py-2 rounded-xl bg-white/10 text-sm font-bold">{title}</span>
        <span className="px-3 py-2 rounded-xl bg-white/10 text-sm font-bold">{players === 2 ? t('2 kishilik poyga') : t('Yakka poyga')} · {GOAL} m</span>
        <div className="ml-auto flex items-center gap-2">
          <div className={`px-4 py-2 rounded-xl font-display text-xl font-bold tabular-nums ${left <= 10 ? 'bg-[#ff4d4d] animate-pulse' : 'bg-[#5b3bf0]'}`}>{Math.ceil(left)} s</div>
          <button onClick={() => setPhase((p) => (p === 'play' ? 'paused' : p === 'paused' ? 'play' : p))} className="btn-game btn-ghost px-3 py-2" aria-label={t('Pauza')}>{phase === 'paused' ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}</button>
          <button onClick={() => { clearTimers(); onExit() }} className="btn-game btn-ghost px-3 py-2" aria-label={t('Chiqish')}><LogOut className="w-5 h-5" /></button>
        </div>
      </div>
      <div className="h-2 rounded-full bg-white/10 mt-3 overflow-hidden"><div className="h-full bg-gradient-to-r from-[#c6ff3d] to-[#22d3ee]" style={{ width: `${(left / duration) * 100}%` }} /></div>

      {/* track */}
      <div className="glass rounded-3xl p-3 sm:p-4 mt-4 bg-[#0b1033]/60">
        {ids.map((pi) => {
          const p = ps[pi]
          return (
            <div key={pi} className={`relative h-[86px] sm:h-[96px] rounded-2xl track-lane ${phase === 'play' ? 'track-moving' : ''} mb-2 last:mb-0 overflow-hidden`}>
              <div className="absolute right-0 top-0 bottom-0 w-5 finish-flag" />
              <div className="absolute left-3 top-1.5 text-[11px] font-bold z-10" style={{ color: COLORS[pi].main }}>{nm(pi)} · {cars[pi].name}</div>
              <div className="absolute right-8 top-1.5 text-[11px] font-bold text-white/70 tabular-nums z-10">{p.dist} / {GOAL} m</div>
              <div className="absolute bottom-2 transition-[left] duration-700 ease-out" style={{ left: `calc(${(p.dist / GOAL) * 84}% + 8px)` }}>
                <CarToken car={cars[pi]} ring={COLORS[pi].main} number={pi + 1} nitro={p.nitro} />
                {p.pop && <span key={p.pop.id} className={`rise absolute -top-4 left-24 text-xs font-extrabold whitespace-nowrap ${p.pop.text.startsWith('NITRO') ? 'text-[#ffd43b]' : p.pop.text.startsWith('+') ? 'text-[#c6ff3d]' : 'text-[#ff8a8a]'}`}>{p.pop.text}</span>}
              </div>
            </div>
          )
        })}
      </div>

      {/* panels */}
      <div className={`grid grid-cols-1 ${players === 2 ? 'md:grid-cols-2' : 'max-w-3xl mx-auto'} gap-3 sm:gap-4 mt-4`}>
        {ids.map((pi) => {
          const p = ps[pi]
          const q = p.deck[p.pos]
          const acc = p.correct + p.wrong ? Math.round((p.correct / (p.correct + p.wrong)) * 100) : 100
          const waiting = !!q.seq && revealed.current[pi] !== p.qid
          return (
            <div key={pi} className={`glass rounded-3xl p-4 sm:p-5 border-t-4 ${p.shake ? 'shake' : ''}`} style={{ borderTopColor: COLORS[pi].main }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg grid place-items-center font-bold" style={{ background: COLORS[pi].soft, color: COLORS[pi].main }}>{pi + 1}</span>
                  <span className="font-display text-lg font-bold">{nm(pi)}</span>
                </div>
                <span className={`text-xs font-extrabold px-2.5 py-1 rounded-full flex items-center gap-1 ${p.streak >= 2 ? 'bg-[#ffd43b]/20 text-[#ffd43b]' : 'bg-white/10 text-white/60'}`}><Flame className="w-3.5 h-3.5" /> {t('{n} ketma-ket', { n: p.streak })}</span>
              </div>
              <div className="mt-4 min-h-[64px] flex flex-col items-center text-center">
                {q.flag && <FlagImg code={q.flag} width={170} className="mb-3" />}
                {q.seq && (revealed.current[pi] !== p.qid ? (
                  <SeqReveal key={p.qid} seq={q.seq} ms={q.seqMs ?? 800} paused={phase !== 'play'} onDone={() => { revealed.current[pi] = p.qid; force((x) => x + 1) }} />
                ) : (
                  <div className="text-white/50 text-sm mb-1">{q.seq.join(' ')}</div>
                ))}
                <div className="font-display text-xl sm:text-2xl font-bold">{waiting ? t('Diqqat bilan kuzating…') : q.prompt}</div>
              </div>
              <div className={`grid grid-cols-2 gap-2 sm:gap-3 mt-4 ${waiting ? 'opacity-30 pointer-events-none' : ''}`}>
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
                      <span className="w-8 h-8 shrink-0 rounded-lg grid place-items-center text-sm font-extrabold bg-black/25">{keyLabel(pi, i)}</span>
                      <span className="text-base sm:text-lg leading-tight break-words min-w-0">{waiting ? '• • •' : o}</span>
                    </button>
                  )
                })}
              </div>
              <div className="grid grid-cols-3 gap-2 mt-4 text-center text-xs">
                <div className="rounded-xl bg-black/20 py-2"><div className="text-white/50">{t('To‘g‘ri')}</div><div className="font-display text-lg font-bold text-[#c6ff3d]">{p.correct}</div></div>
                <div className="rounded-xl bg-black/20 py-2"><div className="text-white/50">{t('Xato')}</div><div className="font-display text-lg font-bold text-[#ff8a8a]">{p.wrong}</div></div>
                <div className="rounded-xl bg-black/20 py-2"><div className="text-white/50">{t('Aniqlik')}</div><div className="font-display text-lg font-bold">{acc}%</div></div>
              </div>
            </div>
          )
        })}
      </div>
      <p className="text-center text-xs text-white/40 mt-4">{players === 2 ? t('Space — pauza. Ikkala o‘yinchi bir vaqtda, mustaqil javob beradi.') : t('Space — pauza. Javob uchun 1, 2, 3, 4 tugmalari yoki sichqoncha.')}</p>

      {phase === 'countdown' && (
        <div className="fixed inset-0 z-[60] grid place-items-center bg-[#070b26]/80 backdrop-blur-sm">
          <div key={count} className="pop font-display font-bold text-[140px] sm:text-[220px] leading-none" style={{ color: count === 0 ? '#c6ff3d' : '#fff' }}>{count === 0 ? 'START!' : count}</div>
        </div>
      )}
      {phase === 'paused' && (
        <div className="fixed inset-0 z-[60] grid place-items-center bg-[#070b26]/80 backdrop-blur-sm p-4">
          <div className="glass rounded-3xl p-8 text-center pop bg-[#121a52]/90">
            <div className="font-display text-4xl font-bold">{t('Pauza')}</div>
            <p className="text-white/60 mt-2">{t('Taymer to‘xtatildi')}</p>
            <button onClick={() => setPhase('play')} className="btn-game btn-lime px-8 py-4 mt-6"><Play fill="currentColor" /> {t('Davom etish')}</button>
          </div>
        </div>
      )}
      {phase === 'over' && (
        <div className="fixed inset-0 z-[60] grid place-items-center bg-[#070b26]/85 backdrop-blur-sm p-4 overflow-y-auto">
          {winner >= 0 && <Confetti />}
          <div className="glass rounded-[32px] p-6 sm:p-8 w-full max-w-2xl text-center pop bg-[#121a52]/95">
            {winner === -2 ? <FlagIcon className="w-14 h-14 mx-auto text-[#22d3ee]" /> : <Trophy className="w-16 h-16 mx-auto text-[#ffd43b]" />}
            <div className="font-display text-3xl sm:text-5xl font-bold mt-3">
              {players === 1
                ? winner === 0 ? t('Marraga yetdingiz!') : t('Vaqt tugadi!')
                : winner === -1 ? t('Durang!') : <><span style={{ color: COLORS[winner].main }}>{nm(winner)}</span> {t('g‘olib!')}</>}
            </div>
            <p className="text-white/60 mt-2">
              {players === 1
                ? winner === 0 ? t('{s} soniyada 120 metr!', { s: Math.round(ps[0].finishedAt ?? duration) }) : t('Bosib o‘tilgan masofa: {d} m', { d: ps[0].dist })
                : ps.some((p) => p.dist >= GOAL) ? t('Marraga birinchi yetib keldi') : t('Vaqt tugadi — masofa bo‘yicha hisoblandi')}
            </p>
            <div className={`grid ${players === 2 ? 'grid-cols-2' : 'grid-cols-1 max-w-xs mx-auto'} gap-3 mt-6`}>
              {ids.map((pi) => {
                const p = ps[pi]
                const acc = p.correct + p.wrong ? Math.round((p.correct / (p.correct + p.wrong)) * 100) : 0
                return (
                  <div key={pi} className="rounded-2xl p-4 text-left" style={{ background: COLORS[pi].soft, border: `2px solid ${winner === pi ? COLORS[pi].main : 'transparent'}` }}>
                    <div className="font-display text-lg font-bold" style={{ color: COLORS[pi].main }}>{nm(pi)}</div>
                    <div className="text-sm mt-2 space-y-1 text-white/85">
                      <div>{t('Masofa')}: <b>{p.dist} m</b></div>
                      <div>{t('To‘g‘ri / xato')}: <b>{p.correct} / {p.wrong}</b></div>
                      <div>{t('Aniqlik')}: <b>{acc}%</b></div>
                      <div>{t('Eng uzun seriya')}: <b>{p.best}</b></div>
                      <div className="text-[#ffd43b]">+{p.correct * 10} XP · +{p.correct * 5} 🪙</div>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-7">
              <button onClick={restart} className="btn-game btn-lime px-7 py-4"><RotateCcw className="w-5 h-5" /> {t('Yana o‘ynash')}</button>
              <button onClick={onExit} className="btn-game btn-ghost px-7 py-4">{t('Sozlamalarga qaytish')}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

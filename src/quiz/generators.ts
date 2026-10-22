import { COUNTRIES, type Country } from './countries'
import { ENGLISH, RUSSIAN, BIOLOGY, HISTORY, ROBOTICS, IT, type Bank } from './banks'
import { translate, LANG_INDEX, type Lang, L } from '../lang'

/** One playable question. a[0] is the correct answer; the match engine shuffles options. */
export type QItem = { prompt: string; a: [string, string, string, string]; flag?: string; seq?: string[]; seqMs?: number }

export type GeoKind = 'flag' | 'capital' | 'mix'

export type SubjectId = 'geo' | 'eng' | 'rus' | 'mental' | 'bio' | 'history' | 'logic' | 'robotics' | 'it'

export type Level = { id: string; label: string; hint: string }

const STD_LEVELS: Level[] = [
  { id: 'easy', label: L('Oson'), hint: L('Boshlovchilar uchun') },
  { id: 'medium', label: L('O‘rta'), hint: L('Bilimni mustahkamlash') },
  { id: 'hard', label: L('Qiyin'), hint: L('Haqiqiy bilimdonlar uchun') },
]

export const GEN_SUBJECTS: { id: SubjectId; name: string; desc: string; from: string; to: string; levels: Level[] }[] = [
  { id: 'geo', name: L('Geografiya'), desc: L('195 davlat: poytaxtlar va bayroqlar'), from: '#10b981', to: '#0ea5e9', levels: STD_LEVELS },
  {
    id: 'eng', name: L('Ingliz tili'), desc: L('So‘zlar, grammatika, iboralar'), from: '#ec4899', to: '#8b5cf6',
    levels: [
      { id: 'beginner', label: 'Beginner', hint: L('So‘zlar tarjimasi, to be') },
      { id: 'elementary', label: 'Elementary', hint: L('Present & Past Simple, predloglar') },
      { id: 'intermediate', label: 'Intermediate', hint: L('Present Perfect, shart gaplar, passiv') },
      { id: 'advanced', label: 'Advanced', hint: L('Inversiya, murakkab grammatika, idiomalar') },
    ],
  },
  { id: 'rus', name: L('Rus tili'), desc: L('So‘zlar, rod, kelishiklar'), from: '#3b82f6', to: '#ef4444', levels: STD_LEVELS },
  { id: 'mental', name: L('Mental arifmetika'), desc: L('Sonlarni eslab qoling, tez hisoblang'), from: '#eab308', to: '#f97316', levels: STD_LEVELS },
  { id: 'bio', name: L('Biologiya'), desc: L('Hujayra, odam, o‘simlik va hayvonlar'), from: '#22c55e', to: '#14b8a6', levels: STD_LEVELS },
  { id: 'history', name: L('Tarix'), desc: L('O‘zbekiston va jahon tarixi'), from: '#f59e0b', to: '#ef4444', levels: STD_LEVELS },
  { id: 'logic', name: L('Mantiq'), desc: L('Qonuniyatlar, ketma-ketliklar, hafta kunlari'), from: '#06b6d4', to: '#6366f1', levels: STD_LEVELS },
  { id: 'robotics', name: L('Robototexnika'), desc: L('Arduino, sensorlar, elektronika'), from: '#64748b', to: '#22d3ee', levels: STD_LEVELS },
  { id: 'it', name: L('IT'), desc: L('Kompyuter, internet, dasturlash'), from: '#0ea5e9', to: '#a855f7', levels: STD_LEVELS },
]

function shuffle<T>(a: T[]): T[] {
  const b = [...a]
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[b[i], b[j]] = [b[j], b[i]]
  }
  return b
}
const rnd = (lo: number, hi: number) => lo + Math.floor(Math.random() * (hi - lo + 1))

/* ---------------- Geography ---------------- */
function capOf(c: Country, lang: Lang) {
  if (!c.k) return ''
  return lang === 'uz' ? c.k[0] : lang === 'ru' ? c.k[1] : c.k[2] // zh → English spelling
}
function nameOf(c: Country, lang: Lang) {
  return c.n[LANG_INDEX[lang]]
}

function pickDistractors(c: Country, pool: Country[], level: string, need = 3, filter: (x: Country) => boolean = () => true) {
  const others = pool.filter((x) => x.c !== c.c && filter(x))
  const sameRegion = shuffle(others.filter((x) => x.r === c.r))
  const rest = shuffle(others.filter((x) => x.r !== c.r))
  const prefer = level === 'easy' ? shuffle(others) : [...sameRegion, ...rest]
  return prefer.slice(0, need)
}

function geoPool(level: string, kind: GeoKind, lang: Lang): QItem[] {
  const maxTier = level === 'easy' ? 1 : level === 'medium' ? 2 : 3
  const pool = COUNTRIES.filter((c) => c.t <= maxTier)
  const tr = (s: string, v?: Record<string, string | number>) => translate(lang, s, v)
  const items: QItem[] = []
  for (const c of pool) {
    const wantFlag = kind === 'flag' || kind === 'mix'
    const wantCap = (kind === 'capital' || kind === 'mix') && !!c.k
    if (wantFlag) {
      const d = pickDistractors(c, pool, level)
      items.push({ prompt: tr('Bu qaysi davlatning bayrog‘i?'), flag: c.c, a: [nameOf(c, lang), ...d.map((x) => nameOf(x, lang))] as QItem['a'] })
    }
    if (wantCap) {
      const d = pickDistractors(c, pool, level, 3, (x) => !!x.k)
      const reverse = level !== 'easy' && Math.random() < 0.35
      if (reverse) {
        items.push({ prompt: tr('{city} qaysi davlatning poytaxti?', { city: capOf(c, lang) }), a: [nameOf(c, lang), ...d.map((x) => nameOf(x, lang))] as QItem['a'] })
      } else {
        items.push({ prompt: tr('{country} poytaxti qaysi shahar?', { country: nameOf(c, lang) }), a: [capOf(c, lang), ...d.map((x) => capOf(x, lang))] as QItem['a'] })
      }
    }
  }
  return items
}

/* ---------------- Mental arithmetic ---------------- */
function mentalItem(level: string, lang: Lang): QItem {
  const cfg = level === 'easy' ? { n: 4, lo: 1, hi: 9 } : level === 'medium' ? { n: 5, lo: 2, hi: 25 } : { n: 6, lo: 11, hi: 99 }
  let total = rnd(cfg.lo, cfg.hi)
  const seq = [String(total)]
  for (let i = 1; i < cfg.n; i++) {
    const v = rnd(cfg.lo, cfg.hi)
    const sub = Math.random() < 0.45 && total - v >= 0
    total = sub ? total - v : total + v
    seq.push(`${sub ? '−' : '+'} ${v}`)
  }
  const spread = level === 'easy' ? 4 : level === 'medium' ? 8 : 15
  const ds = new Set<number>()
  while (ds.size < 3) {
    const d = total + (Math.random() < 0.5 ? -1 : 1) * rnd(1, spread)
    if (d !== total && d >= 0) ds.add(d)
  }
  return { prompt: translate(lang, 'Natija nechaga teng?'), seq, seqMs: level === 'easy' ? 1000 : level === 'medium' ? 800 : 650, a: [String(total), ...[...ds].map(String)] as QItem['a'] }
}

/* ---------------- Logic ---------------- */
const DAYS: Record<Lang, string[]> = {
  uz: ['dushanba', 'seshanba', 'chorshanba', 'payshanba', 'juma', 'shanba', 'yakshanba'],
  ru: ['понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота', 'воскресенье'],
  en: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  zh: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
}
function numOptions(correct: number, spread: number): QItem['a'] {
  const ds = new Set<number>()
  while (ds.size < 3) {
    const d = correct + (Math.random() < 0.5 ? -1 : 1) * rnd(1, spread)
    if (d !== correct) ds.add(d)
  }
  return [String(correct), ...[...ds].map(String)] as QItem['a']
}
function logicItem(level: string, lang: Lang): QItem {
  const tr = (s: string, v?: Record<string, string | number>) => translate(lang, s, v)
  const type = rnd(0, level === 'easy' ? 2 : 4)
  if (type === 0 || type === 1) {
    // arithmetic (easy) / geometric (medium+) sequence
    if (level === 'easy' || type === 0) {
      const a = rnd(1, 20), d = rnd(2, level === 'easy' ? 5 : 12)
      const s = [0, 1, 2, 3].map((i) => a + i * d)
      return { prompt: tr('Ketma-ketlikni davom ettiring: {s}, ?', { s: s.join(', ') }), a: numOptions(a + 4 * d, d + 2) }
    }
    const a = rnd(1, 5), r = rnd(2, 3)
    const s = [0, 1, 2, 3].map((i) => a * r ** i)
    return { prompt: tr('Ketma-ketlikni davom ettiring: {s}, ?', { s: s.join(', ') }), a: numOptions(a * r ** 4, a * r) }
  }
  if (type === 2) {
    const d = rnd(0, 6), n = level === 'easy' ? rnd(1, 6) : level === 'medium' ? rnd(8, 30) : rnd(40, 400)
    const ans = (d + n) % 7
    const opts = new Set<number>([ans])
    while (opts.size < 4) opts.add(rnd(0, 6))
    const arr = [...opts].map((i) => DAYS[lang][i])
    return { prompt: tr('Bugun {day}. {n} kundan keyin hafta qaysi kuni bo‘ladi?', { day: DAYS[lang][d], n }), a: arr as QItem['a'] }
  }
  if (type === 3) {
    // squares or alternating steps
    if (level === 'hard') {
      const a = rnd(1, 4)
      const s = [0, 1, 2, 3, 4].map((i) => (a + i) ** 2)
      return { prompt: tr('Ketma-ketlikni davom ettiring: {s}, ?', { s: s.join(', ') }), a: numOptions((a + 5) ** 2, 9) }
    }
    const a = rnd(1, 10), p = rnd(2, 6), m = rnd(1, p - 1)
    const s = [a]
    for (let i = 1; i < 6; i++) s.push(s[i - 1] + (i % 2 ? p : -m))
    return { prompt: tr('Ketma-ketlikni davom ettiring: {s}, ?', { s: s.join(', ') }), a: numOptions(s[5] + p, 4) }
  }
  // Fibonacci-like
  const x = rnd(1, 5), y = rnd(1, 6)
  const s = [x, y]
  for (let i = 2; i < 6; i++) s.push(s[i - 1] + s[i - 2])
  return { prompt: tr('Ketma-ketlikni davom ettiring: {s}, ?', { s: s.join(', ') }), a: numOptions(s[4] + s[5], 6) }
}

/* ---------------- Pool factory ---------------- */
const BANKS: Partial<Record<SubjectId, Bank>> = { eng: ENGLISH, rus: RUSSIAN, bio: BIOLOGY, history: HISTORY, robotics: ROBOTICS, it: IT }

/** Returns a function that produces a fresh, non-repeating pool for one player. */
export function makePoolFactory(subject: SubjectId, level: string, geoKind: GeoKind, lang: Lang): () => QItem[] {
  if (subject === 'geo') return () => shuffle(geoPool(level, geoKind, lang))
  if (subject === 'mental') return () => Array.from({ length: 40 }, () => mentalItem(level, lang))
  if (subject === 'logic') return () => Array.from({ length: 40 }, () => logicItem(level, lang))
  const bank = BANKS[subject]!
  return () => shuffle(bank[level] ?? Object.values(bank)[0]).map((b) => ({ prompt: b.q, a: b.a }))
}

export function poolSize(subject: SubjectId, level: string, geoKind: GeoKind) {
  if (subject === 'geo') {
    const maxTier = level === 'easy' ? 1 : level === 'medium' ? 2 : 3
    const n = COUNTRIES.filter((c) => c.t <= maxTier)
    const caps = n.filter((c) => c.k).length
    return geoKind === 'flag' ? n.length : geoKind === 'capital' ? caps : n.length + caps
  }
  if (subject === 'mental' || subject === 'logic') return Infinity
  return BANKS[subject]?.[level]?.length ?? 0
}

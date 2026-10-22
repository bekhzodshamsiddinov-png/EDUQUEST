import React, { useState } from 'react'
import { useT } from '../lang'
import { LayoutDashboard, Users, BookOpen, Trophy, Settings, Copy, Check, Download, Presentation, TrendingUp, Activity, Target, Send } from 'lucide-react'

const STUDENTS = [
  { n: 'Madina Rahimova', acc: 94, tests: 38, weak: '—', grade: 5 },
  { n: 'Sardor To‘xtayev', acc: 91, tests: 35, weak: 'Viyet teoremasi', grade: 5 },
  { n: 'Zarina Aliyeva', acc: 86, tests: 31, weak: 'Kvadrat tenglamalar', grade: 5 },
  { n: 'Ali Valiyev', acc: 81, tests: 29, weak: 'Viyet teoremasi', grade: 4 },
  { n: 'Jasur Mirzayev', acc: 77, tests: 26, weak: 'Kvadrat ildiz', grade: 4 },
  { n: 'Shahzoda Karimova', acc: 72, tests: 22, weak: 'Kvadrat tenglamalar', grade: 4 },
  { n: 'Bekzod Nazarov', acc: 64, tests: 18, weak: 'Viyet teoremasi', grade: 3 },
  { n: 'Otabek Yusupov', acc: 58, tests: 12, weak: 'Kvadrat ildiz', grade: 3 },
]
const TOPICS = ['Tengsizliklar', 'Kv. ildiz', 'Kv. tenglama', 'Viyet']
const HEAT = [
  [98, 95, 92, 88], [96, 93, 90, 72], [94, 88, 80, 70], [92, 85, 76, 58], [90, 70, 74, 62], [88, 76, 61, 55], [80, 66, 60, 41], [74, 52, 56, 38],
]
const heatColor = (v: number) => (v >= 85 ? '#c6ff3d' : v >= 70 ? '#ffd43b' : v >= 55 ? '#ff9a3d' : '#ff5c5c')

export function Teacher() {
  const t = useT()
  const [copied, setCopied] = useState(false)
  const [nav, setNav] = useState('dash')
  const [live, setLive] = useState(false)
  const [sent, setSent] = useState(false)
  const items = [
    { id: 'dash', l: t('Boshqaruv'), i: LayoutDashboard },
    { id: 'students', l: t('O‘quvchilar'), i: Users },
    { id: 'topics', l: t('Mavzular'), i: BookOpen },
    { id: 'tourn', l: t('Turnirlar'), i: Trophy },
    { id: 'set', l: t('Sozlamalar'), i: Settings },
  ]
  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 pt-8">
      <div className="flex items-center gap-2 text-xs font-bold text-white/50 mb-3"><span className="px-2 py-1 rounded-lg bg-white/10">{t('Namuna ma’lumotlar')}</span> {t('Ustoz paneli ko‘rinishi')}</div>
      <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-4">
        <aside className="glass rounded-3xl p-3 h-max min-w-0 lg:sticky lg:top-24">
          <div className="px-3 py-3">
            <div className="text-xs text-white/50">{t('Ustoz')}</div>
            <div className="font-display font-bold">Nodira Qodirova</div>
            <div className="text-xs text-white/50">{t('Algebra')} · {t('3-maktab')}</div>
          </div>
          <nav className="flex lg:flex-col gap-1 overflow-x-auto scrollbar-none">
            {items.map((x) => (
              <button key={x.id} onClick={() => setNav(x.id)} className={`shrink-0 flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold ${nav === x.id ? 'bg-[#c6ff3d] text-[#0b1033]' : 'hover:bg-white/10 text-white/80'}`}><x.i className="w-4 h-4" /> {x.l}</button>
            ))}
          </nav>
        </aside>

        <div className="space-y-4 min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <div>
              <h1 className="font-display text-3xl sm:text-4xl font-bold">{t('8-B sinf')} · {t('Algebra')}</h1>
              <p className="text-white/55 text-sm">{t('28 o‘quvchi · 2-chorak, 4-hafta')}</p>
            </div>
            <div className="ml-auto flex flex-wrap gap-2">
              <button onClick={() => setLive((v) => !v)} className={`btn-game ${live ? 'btn-orange' : 'btn-blue'} px-4 py-2.5 text-sm`}><Presentation className="w-4 h-4" /> {live ? t('Jonli dars davom etmoqda…') : t('Jonli darsni boshlash')}</button>
              <button disabled className="btn-game btn-ghost px-4 py-2.5 text-sm opacity-60 cursor-not-allowed" title={t('Tez kunda')}><Download className="w-4 h-4" /> {t('eMaktab’ga eksport (tez kunda)')}</button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
            <div className="rounded-3xl p-5 bg-gradient-to-br from-[#5b3bf0] to-[#3b82f6]">
              <div className="text-xs font-bold text-white/80">{t('Sinf kodi')}</div>
              <div className="flex items-center justify-between mt-1">
                <div className="font-display text-3xl font-bold tracking-widest">8B-7KQ2</div>
                <button onClick={() => { navigator.clipboard?.writeText('8B-7KQ2').catch(() => {}); setCopied(true); setTimeout(() => setCopied(false), 1500) }} className="p-2 rounded-xl bg-white/20 hover:bg-white/30" aria-label={t('Nusxalash')}>{copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}</button>
              </div>
              <div className="text-xs text-white/75 mt-1">{copied ? t('Nusxalandi!') : t('O‘quvchilarga yuboring')}</div>
            </div>
            {[
              { i: Target, l: t('O‘rtacha aniqlik'), v: '78%', d: t('+6% o‘tgan haftaga'), c: '#c6ff3d' },
              { i: Activity, l: t('Faol o‘quvchilar'), v: '24/28', d: t('86% qatnashish'), c: '#22d3ee' },
              { i: TrendingUp, l: t('Haftalik testlar'), v: '412', d: t('o‘rtacha 17 ta / o‘quvchi'), c: '#ffd43b' },
            ].map((k) => (
              <div key={k.l} className="glass rounded-3xl p-5">
                <div className="flex items-center gap-2 text-xs font-bold text-white/60"><k.i className="w-4 h-4" style={{ color: k.c }} /> {k.l}</div>
                <div className="font-display text-4xl font-bold mt-1">{k.v}</div>
                <div className="text-xs text-white/50">{k.d}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-[1fr_1.4fr] gap-4">
            <div className="glass rounded-3xl p-5">
              <h3 className="font-display text-xl font-bold">{t('Mavzular xaritasi')}</h3>
              <p className="text-xs text-white/50">{t('Har bir o‘quvchining mavzu bo‘yicha aniqligi')}</p>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-xs">
                  <thead><tr><th className="text-left font-semibold text-white/50 pb-2 pr-2">{t('O‘quvchi')}</th>{TOPICS.map((x) => <th key={x} className="font-semibold text-white/50 pb-2 px-1">{t(x)}</th>)}</tr></thead>
                  <tbody>
                    {STUDENTS.map((s, r) => (
                      <tr key={s.n}>
                        <td className="pr-2 py-1 whitespace-nowrap font-semibold">{s.n.split(' ')[0]}</td>
                        {HEAT[r].map((v, c) => (
                          <td key={c} className="px-1 py-1"><div className="h-8 rounded-lg grid place-items-center font-bold text-[#0b1033]" style={{ background: heatColor(v), opacity: 0.55 + v / 250 }}>{v}</div></td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 rounded-2xl bg-[#ff5c5c]/15 border border-[#ff5c5c]/30 p-3 text-sm">
                <b className="text-[#ff8a8a]">{t('Diqqat:')}</b> {t('“Viyet teoremasi” bo‘yicha sinf o‘rtachasi 61%. Takrorlash poygasini yuborishni tavsiya qilamiz.')}
                <button onClick={() => setSent(true)} disabled={sent} className="mt-2 flex items-center gap-2 text-xs font-bold text-[#c6ff3d]">{sent ? <><Check className="w-3.5 h-3.5" /> {t('28 o‘quvchiga yuborildi')}</> : <><Send className="w-3.5 h-3.5" /> {t('Sinfga takrorlash poygasini yuborish')}</>}</button>
              </div>
            </div>

            <div className="glass rounded-3xl p-5 min-w-0">
              <h3 className="font-display text-xl font-bold">{t('O‘quvchilar natijalari')}</h3>
              <p className="text-xs text-white/50">{t('Tavsiya etilgan baho — yakuniy qarorni ustoz qabul qiladi')}</p>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-sm min-w-[520px]">
                  <thead>
                    <tr className="text-left text-xs text-white/50">
                      <th className="pb-2 font-semibold">{t('O‘quvchi')}</th><th className="pb-2 font-semibold">{t('Aniqlik')}</th><th className="pb-2 font-semibold">{t('Testlar')}</th><th className="pb-2 font-semibold">{t('Zaif mavzu')}</th><th className="pb-2 font-semibold text-center">{t('Tavsiya baho')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {STUDENTS.map((s) => (
                      <tr key={s.n} className="border-t border-white/10">
                        <td className="py-2.5 font-semibold">{s.n}</td>
                        <td className="py-2.5">
                          <div className="flex items-center gap-2"><div className="w-16 h-1.5 rounded-full bg-white/10 overflow-hidden"><div className="h-full" style={{ width: `${s.acc}%`, background: heatColor(s.acc) }} /></div>{s.acc}%</div>
                        </td>
                        <td className="py-2.5">{s.tests}</td>
                        <td className="py-2.5 text-white/70">{t(s.weak)}</td>
                        <td className="py-2.5 text-center"><span className="inline-grid place-items-center w-8 h-8 rounded-lg font-display font-bold" style={{ background: s.grade === 5 ? '#c6ff3d' : s.grade === 4 ? '#ffd43b' : '#ff9a3d', color: '#0b1033' }}>{s.grade}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

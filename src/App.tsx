import React, { useEffect, useState } from 'react'
import { Menu, X, ChevronDown, Rocket, KeyRound } from 'lucide-react'
import { LANGS, LangProvider, translate, type Lang } from './i18n'
import { Landing } from './pages/Landing'
import { GeneralTest } from './pages/GeneralTest'
import { Adventure } from './pages/Adventure'
import { Leaderboard } from './pages/Leaderboard'
import { Garage } from './pages/Garage'
import { Teacher } from './pages/Teacher'

export type Page = 'home' | 'test' | 'path' | 'rating' | 'garage' | 'teacher'

function Logo({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button onClick={onClick} className="flex items-center gap-2 shrink-0" aria-label={label}>
      <span className="relative grid place-items-center w-10 h-10 rounded-2xl bg-gradient-to-br from-[#c6ff3d] to-[#22d3ee] shadow-[0_6px_0_#4a7a00]">
        <Rocket className="w-5 h-5 text-[#0b1033]" strokeWidth={2.6} />
      </span>
      <span className="font-display text-2xl font-bold tracking-tight">
        EDU<span className="text-[#c6ff3d]">QUEST</span>
      </span>
    </button>
  )
}

function CodeModal({ t, onClose, onJoin }: { t: (s: string) => string; onClose: () => void; onJoin: () => void }) {
  const [code, setCode] = useState('')
  const [err, setErr] = useState('')
  return (
    <div className="fixed inset-0 z-[60] grid place-items-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div className="glass rounded-3xl p-6 sm:p-8 w-full max-w-md pop bg-[#121a52]/90" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl grid place-items-center bg-[#c6ff3d] text-[#0b1033] mb-4">
              <KeyRound />
            </div>
            <h3 className="font-display text-2xl font-bold">{t('Sinf kodi bilan kirish')}</h3>
            <p className="text-white/70 mt-1 text-sm">{t('Kodni ustozingizdan oling. Masalan:')} <b className="text-[#c6ff3d]">8B-7KQ2</b></p>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-white/10" aria-label={t('Yopish')}><X /></button>
        </div>
        <form
          className="mt-6 space-y-3"
          onSubmit={(e) => {
            e.preventDefault()
            if (code.trim().length < 6) return setErr(t('Kod kamida 6 belgidan iborat bo‘lishi kerak'))
            onJoin()
          }}
        >
          <input
            value={code}
            onChange={(e) => { setCode(e.target.value.toUpperCase()); setErr('') }}
            placeholder={t('SINF KODI')}
            className="w-full text-center tracking-[0.4em] font-display text-2xl font-bold rounded-2xl bg-black/30 border-2 border-white/15 focus:border-[#c6ff3d] outline-none py-4"
            maxLength={10}
            aria-label={t('Sinf kodi')}
          />
          {err && <p className="text-[#ff8a8a] text-sm">{err}</p>}
          <button type="submit" className="btn-game btn-lime w-full py-4 text-lg">{t('Sinfga qo‘shilish')}</button>
          <button type="button" onClick={() => { setCode('8B-7KQ2'); setErr('') }} className="w-full text-sm text-white/60 hover:text-white">{t('Namuna kodni qo‘yish')}</button>
        </form>
      </div>
    </div>
  )
}

export function App() {
  const [page, setPage] = useState<Page>('home')
  const [lang, setLang] = useState<Lang>('uz')
  const [langOpen, setLangOpen] = useState(false)
  const [mobile, setMobile] = useState(false)
  const [modal, setModal] = useState(false)
  const [car, setCar] = useState(0)
  const t = (s: string, v?: Record<string, string | number>) => translate(lang, s, v)

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }) }, [page])
  useEffect(() => { document.documentElement.lang = lang }, [lang])

  const go = (p: Page) => { setPage(p); setMobile(false) }
  const links: { id: Page; label: string }[] = [
    { id: 'home', label: t('Bosh sahifa') },
    { id: 'test', label: t('Umumiy test') },
    { id: 'path', label: t('Sarguzasht yo‘li') },
    { id: 'rating', label: t('Reyting') },
    { id: 'garage', label: t('Garaj') },
    { id: 'teacher', label: t('Ustozlar uchun') },
  ]

  return (
    <LangProvider lang={lang}>
      <div className="stars relative min-h-screen overflow-x-clip">
        <header className="sticky top-0 z-50 px-3 sm:px-6 pt-3">
          <nav className="glass bg-[#0b1033]/70 max-w-7xl mx-auto rounded-2xl px-3 sm:px-4 py-2.5 flex items-center gap-3">
            <Logo onClick={() => go('home')} label={t('Bosh sahifa')} />
            <div className="hidden lg:flex items-center gap-1 mx-auto">
              {links.map((l) => (
                <button
                  key={l.id}
                  onClick={() => go(l.id)}
                  className={`px-3 py-2 rounded-xl text-sm font-semibold transition whitespace-nowrap ${page === l.id ? 'bg-white/15 text-[#c6ff3d]' : 'text-white/75 hover:text-white hover:bg-white/5'}`}
                >
                  {l.label}
                </button>
              ))}
            </div>
            <div className="ml-auto lg:ml-0 flex items-center gap-2">
              <div className="relative">
                <button onClick={() => setLangOpen((v) => !v)} className="flex items-center gap-1 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-sm font-bold" aria-haspopup="listbox" aria-expanded={langOpen}>
                  {LANGS.find((l) => l.code === lang)?.short}
                  <ChevronDown className="w-4 h-4" />
                </button>
                {langOpen && (
                  <div className="absolute right-0 mt-2 w-40 glass bg-[#121a52]/95 rounded-2xl p-1.5 pop" role="listbox">
                    {LANGS.map((l) => (
                      <button
                        key={l.code}
                        role="option"
                        aria-selected={lang === l.code}
                        onClick={() => { setLang(l.code); setLangOpen(false) }}
                        className={`w-full text-left px-3 py-2 rounded-xl text-sm font-semibold hover:bg-white/10 ${lang === l.code ? 'text-[#c6ff3d]' : ''}`}
                      >
                        {l.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <button onClick={() => go('teacher')} className="hidden sm:inline-flex px-3 py-2 rounded-xl text-sm font-semibold text-white/80 hover:text-white">{t('Kirish')}</button>
              <button onClick={() => setModal(true)} className="hidden sm:inline-flex btn-game btn-lime px-4 py-2.5 text-sm whitespace-nowrap">{t('Sinf kodi bilan kirish')}</button>
              <button onClick={() => setMobile((v) => !v)} className="lg:hidden p-2 rounded-xl bg-white/10" aria-label={t('Menyu')}>{mobile ? <X /> : <Menu />}</button>
            </div>
          </nav>
          {mobile && (
            <div className="lg:hidden glass bg-[#0b1033]/95 max-w-7xl mx-auto mt-2 rounded-2xl p-2 pop">
              {links.map((l) => (
                <button key={l.id} onClick={() => go(l.id)} className={`w-full text-left px-4 py-3 rounded-xl font-semibold ${page === l.id ? 'bg-white/10 text-[#c6ff3d]' : ''}`}>{l.label}</button>
              ))}
              <button onClick={() => { setModal(true); setMobile(false) }} className="btn-game btn-lime w-full py-3 mt-2">{t('Sinf kodi bilan kirish')}</button>
            </div>
          )}
        </header>

        <main className="relative z-10">
          {page === 'home' && <Landing go={go} openCode={() => setModal(true)} />}
          {page === 'test' && <GeneralTest key={lang} defaultCar={car} />}
          {page === 'path' && <Adventure defaultCar={car} />}
          {page === 'rating' && <Leaderboard />}
          {page === 'garage' && <Garage selected={car} onSelect={setCar} />}
          {page === 'teacher' && <Teacher />}
        </main>

        <footer className="relative z-10 mt-24 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-5 py-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <Logo onClick={() => go('home')} label={t('Bosh sahifa')} />
              <p className="text-white/60 text-sm mt-4 max-w-xs">{t('O‘zbekiston maktab darsliklari asosidagi o‘yinli ta’lim platformasi. 1–11-sinf o‘quvchilari uchun.')}</p>
              <span className="inline-flex mt-4 items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-full bg-[#c6ff3d]/15 text-[#c6ff3d] border border-[#c6ff3d]/30">{t('InnoWeek 2026 ishtirokchisi')}</span>
            </div>
            <div>
              <h4 className="font-display font-bold mb-3">{t('Platforma')}</h4>
              <ul className="space-y-2 text-sm text-white/65">
                {links.slice(1).map((l) => (
                  <li key={l.id}><button onClick={() => go(l.id)} className="hover:text-white">{l.label}</button></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-display font-bold mb-3">{t('Xavfsizlik')}</h4>
              <ul className="space-y-2 text-sm text-white/65">
                <li>{t('Bolalar o‘rtasida chat yo‘q')}</li>
                <li>{t('Reklama yo‘q')}</li>
                <li>{t('Ota-ona roziligi bilan')}</li>
                <li>{t('Kunlik vaqt chegarasi')}</li>
              </ul>
            </div>
            <div>
              <h4 className="font-display font-bold mb-3">{t('Pilot')}</h4>
              <p className="text-sm text-white/65">{t('To‘raqo‘rg‘on tumani 3-sonli umumta’lim maktabi, Namangan viloyati')}</p>
            </div>
          </div>
          <div className="text-center text-xs text-white/40 pb-8">© 2026 EDUQUEST. {t('Barcha huquqlar himoyalangan.')}</div>
        </footer>

        {modal && <CodeModal t={t} onClose={() => setModal(false)} onJoin={() => { setModal(false); go('path') }} />}
      </div>
    </LangProvider>
  )
}

import React, { createContext, useContext } from 'react'
import { DICT } from './translations'

export type Lang = 'uz' | 'ru' | 'en' | 'zh'

export const LANGS: { code: Lang; label: string; short: string }[] = [
  { code: 'uz', label: 'O‘zbekcha', short: 'UZ' },
  { code: 'ru', label: 'Русский', short: 'RU' },
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'zh', label: '中文', short: '中文' },
]

export const LangCtx = createContext<Lang>('uz')

export type TFn = (s: string, vars?: Record<string, string | number>) => string

/** Marks a string for translation where no hook is available (data files). Returns it unchanged. */
export const L = (s: string) => s

export function translate(lang: Lang, s: string, vars?: Record<string, string | number>) {
  let out = lang === 'uz' ? s : DICT[lang]?.[s] ?? s
  if (vars) for (const k of Object.keys(vars)) out = out.split(`{${k}}`).join(String(vars[k]))
  return out
}

export function useT(): TFn {
  const lang = useContext(LangCtx)
  return (s, vars) => translate(lang, s, vars)
}

export function useLang() {
  return useContext(LangCtx)
}

export const LANG_INDEX: Record<Lang, number> = { uz: 0, ru: 1, en: 2, zh: 3 }

export function LangProvider({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  return <LangCtx.Provider value={lang}>{children}</LangCtx.Provider>
}

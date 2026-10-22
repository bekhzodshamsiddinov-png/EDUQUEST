import React, { useState } from 'react'

/** Accurate country flag (flag-icons, MIT). Alt text never reveals the answer. */
export function FlagImg({ code, width = 200, className = '' }: { code: string; width?: number; className?: string }) {
  const [err, setErr] = useState(false)
  return (
    <div className={`rounded-lg overflow-hidden bg-white/10 shadow-[0_12px_30px_-10px_rgba(0,0,0,.7)] ring-1 ring-white/20 ${className}`} style={{ width, aspectRatio: '4 / 3' }}>
      {!err ? (
        <img src={`https://cdn.jsdelivr.net/npm/flag-icons@7.2.3/flags/4x3/${code}.svg`} alt="Bayroq" className="w-full h-full object-cover" onError={() => setErr(true)} draggable={false} />
      ) : (
        <div className="w-full h-full grid place-items-center text-xs text-white/60">⚑</div>
      )}
    </div>
  )
}

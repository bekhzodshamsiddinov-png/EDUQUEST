import React, { useState } from 'react'
import type { RealCar } from '../cars'

/** Real car photo with graceful fallback. `token` = compact race-track version. */
export function CarPhoto({ car, className = '', token = false, ring, number, nitro = false }: { car: RealCar; className?: string; token?: boolean; ring?: string; number?: number; nitro?: boolean }) {
  const [err, setErr] = useState(false)
  if (token) {
    return (
      <div className={`relative ${className}`}>
        {nitro && <div className="flame absolute right-full top-1/2 -translate-y-1/2 w-16 h-5 rounded-full" style={{ background: 'linear-gradient(90deg, transparent, #ff3d00, #ffb21a, #fff6a8)' }} />}
        <div className="relative w-[92px] h-[56px] sm:w-[108px] sm:h-[64px] rounded-xl overflow-hidden shadow-[0_8px_18px_-6px_rgba(0,0,0,.8)]" style={{ boxShadow: `0 0 0 3px ${ring ?? car.accent}, 0 10px 20px -8px rgba(0,0,0,.8)` }}>
          {!err ? (
            <img src={car.photo} alt={car.name} className="w-full h-full object-cover" onError={() => setErr(true)} draggable={false} />
          ) : (
            <div className="w-full h-full grid place-items-center text-[10px] font-bold text-center px-1" style={{ background: `linear-gradient(135deg, ${car.accent}, #0b1033)` }}>{car.name}</div>
          )}
        </div>
        {number !== undefined && (
          <span className="absolute -top-2 -left-2 w-6 h-6 rounded-full grid place-items-center text-xs font-extrabold text-white border-2 border-[#0b1033]" style={{ background: ring ?? car.accent }}>{number}</span>
        )}
      </div>
    )
  }
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!err ? (
        <img src={car.photo} alt={car.name} className="w-full h-full object-cover" onError={() => setErr(true)} loading="lazy" draggable={false} />
      ) : (
        <div className="w-full h-full grid place-items-center font-display font-bold text-lg" style={{ background: `linear-gradient(135deg, ${car.accent}, #0b1033)` }}>{car.name}</div>
      )}
    </div>
  )
}

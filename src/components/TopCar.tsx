import React, { useId } from 'react'
import type { Body, RealCar } from '../cars'

/* ---------- colour helpers ---------- */
function hexToRgb(h: string) {
  const n = parseInt(h.replace('#', ''), 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}
/** amt > 0 mixes towards white, amt < 0 towards black */
function shade(hex: string, amt: number) {
  const [r, g, b] = hexToRgb(hex)
  const t = amt < 0 ? 0 : 255
  const p = Math.abs(amt)
  const m = (c: number) => Math.round(c + (t - c) * p)
  return `rgb(${m(r)},${m(g)},${m(b)})`
}

/** Rounded rectangle with separate rear (left) and front (right) radii. */
function rr(x: number, y: number, w: number, h: number, rl: number, rf: number) {
  return `M${x + rl},${y} H${x + w - rf} Q${x + w},${y} ${x + w},${y + rf} V${y + h - rf} Q${x + w},${y + h} ${x + w - rf},${y + h} H${x + rl} Q${x},${y + h} ${x},${y + h - rl} V${y + rl} Q${x},${y} ${x + rl},${y} Z`
}

type Spec = { L: number; W: number; c0: number; c1: number; rw: number; ws: number; cw: number; rRear: number; rFront: number; axR: number; axF: number }
const SPECS: Record<Body, Spec> = {
  sedan: { L: 184, W: 78, c0: 0.2, c1: 0.68, rw: 0.1, ws: 0.13, cw: 0.8, rRear: 16, rFront: 22, axR: 0.2, axF: 0.79 },
  cross: { L: 178, W: 84, c0: 0.1, c1: 0.7, rw: 0.07, ws: 0.13, cw: 0.84, rRear: 16, rFront: 22, axR: 0.19, axF: 0.8 },
  bigsuv: { L: 210, W: 92, c0: 0.06, c1: 0.71, rw: 0.05, ws: 0.11, cw: 0.86, rRear: 12, rFront: 16, axR: 0.18, axF: 0.81 },
  van: { L: 150, W: 82, c0: 0.04, c1: 0.9, rw: 0.04, ws: 0.1, cw: 0.88, rRear: 10, rFront: 18, axR: 0.18, axF: 0.84 },
  sport: { L: 190, W: 80, c0: 0.22, c1: 0.66, rw: 0.15, ws: 0.15, cw: 0.76, rRear: 20, rFront: 28, axR: 0.2, axF: 0.79 },
  limo: { L: 224, W: 84, c0: 0.24, c1: 0.62, rw: 0.09, ws: 0.1, cw: 0.8, rRear: 18, rFront: 18, axR: 0.18, axF: 0.8 },
}

/** Top-down, 3D-shaded car drawn in SVG. Front faces right. */
export function TopCar({ car, color, className = '', style, lights = false }: { car: RealCar; color?: string; className?: string; style?: React.CSSProperties; lights?: boolean }) {
  const uid = useId().replace(/:/g, '')
  const c = color ?? car.accent
  const s = SPECS[car.body]
  const VW = 240, VH = 120, cx = 120, cy = 60
  const x0 = cx - s.L / 2, x1 = cx + s.L / 2, y0 = cy - s.W / 2, y1 = cy + s.W / 2
  const xc0 = x0 + s.L * s.c0, xc1 = x0 + s.L * s.c1
  const cwH = s.W * s.cw
  const rwD = s.L * s.rw, wsD = s.L * s.ws
  const roofX0 = xc0 + rwD, roofX1 = xc1 - wsD, roofH = cwH * 0.82
  const glassRoof = car.body === 'sport' || car.ev
  const tireW = s.L * (car.body === 'sport' ? 0.14 : 0.125)
  const id = (n: string) => `${n}${uid}`

  const paintStops: [number, number][] = [[0, -0.5], [0.16, -0.12], [0.42, 0.18], [0.5, 0.26], [0.58, 0.18], [0.84, -0.12], [1, -0.5]]

  return (
    <svg viewBox={`0 0 ${VW} ${VH}`} className={className} style={style} role="img" aria-label={car.name}>
      <defs>
        <linearGradient id={id('paint')} x1="0" y1="0" x2="0" y2="1">
          {paintStops.map(([o, a]) => <stop key={o} offset={o} stopColor={shade(c, a)} />)}
        </linearGradient>
        <linearGradient id={id('roof')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={shade(c, -0.3)} />
          <stop offset="0.5" stopColor={shade(c, 0.32)} />
          <stop offset="1" stopColor={shade(c, -0.3)} />
        </linearGradient>
        <linearGradient id={id('glass')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#334155" />
          <stop offset="0.5" stopColor="#0b1220" />
          <stop offset="1" stopColor="#334155" />
        </linearGradient>
        <linearGradient id={id('sheen')} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.45" stopColor="#fff" stopOpacity="0.28" />
          <stop offset="0.6" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={id('beam')} cx="0" cy="0.5" r="1">
          <stop offset="0" stopColor="#fffbe0" stopOpacity="0.55" />
          <stop offset="1" stopColor="#fffbe0" stopOpacity="0" />
        </radialGradient>
        <filter id={id('blur')} x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="5" /></filter>
        <filter id={id('soft')} x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="1.6" /></filter>
      </defs>

      {/* headlight beams */}
      {lights && (
        <>
          <ellipse cx={x1 + 22} cy={y0 + 14} rx="30" ry="12" fill={`url(#${id('beam')})`} />
          <ellipse cx={x1 + 22} cy={y1 - 14} rx="30" ry="12" fill={`url(#${id('beam')})`} />
        </>
      )}

      {/* ground shadow */}
      <path d={rr(x0 + 3, y0 + 7, s.L, s.W, s.rRear, s.rFront)} fill="#000" opacity="0.55" filter={`url(#${id('blur')})`} />

      {/* tyres */}
      {[x0 + s.L * s.axR, x0 + s.L * s.axF].map((ax) => (
        <g key={ax}>
          <rect x={ax - tireW / 2} y={y0 - 4} width={tireW} height="11" rx="3.5" fill="#0a0a0a" />
          <rect x={ax - tireW / 2} y={y1 - 7} width={tireW} height="11" rx="3.5" fill="#0a0a0a" />
          <rect x={ax - tireW / 2 + 3} y={y0 - 3} width={tireW - 6} height="2" rx="1" fill="#3f3f46" />
          <rect x={ax - tireW / 2 + 3} y={y1 + 1} width={tireW - 6} height="2" rx="1" fill="#3f3f46" />
        </g>
      ))}

      {/* body */}
      <path d={rr(x0, y0, s.L, s.W, s.rRear, s.rFront)} fill={`url(#${id('paint')})`} />
      <path d={rr(x0 + 1.5, y0 + 1.5, s.L - 3, s.W - 3, s.rRear - 1, s.rFront - 1)} fill="none" stroke="#fff" strokeOpacity="0.22" strokeWidth="1" />

      {/* sport stripes */}
      {car.body === 'sport' && !car.ev && (
        <>
          <rect x={x0 + 4} y={cy - 9} width={s.L - 8} height="6" fill="#fff" opacity="0.85" />
          <rect x={x0 + 4} y={cy + 3} width={s.L - 8} height="6" fill="#fff" opacity="0.85" />
        </>
      )}

      {/* hood creases */}
      <path d={`M${xc1 + 4},${cy - s.W * 0.22} Q${(xc1 + x1) / 2},${cy - s.W * 0.18} ${x1 - 8},${cy - s.W * 0.15}`} fill="none" stroke={shade(c, -0.35)} strokeOpacity="0.55" strokeWidth="1.3" />
      <path d={`M${xc1 + 4},${cy + s.W * 0.22} Q${(xc1 + x1) / 2},${cy + s.W * 0.18} ${x1 - 8},${cy + s.W * 0.15}`} fill="none" stroke={shade(c, -0.35)} strokeOpacity="0.55" strokeWidth="1.3" />
      {/* trunk line */}
      {car.body !== 'van' && car.body !== 'bigsuv' && car.body !== 'cross' && (
        <path d={`M${x0 + 10},${cy - s.W * 0.3} Q${x0 + 6},${cy} ${x0 + 10},${cy + s.W * 0.3}`} fill="none" stroke={shade(c, -0.35)} strokeOpacity="0.5" strokeWidth="1.2" />
      )}

      {/* chrome trim for the Chayka */}
      {car.body === 'limo' && (
        <>
          <line x1={x0 + 12} y1={y0 + 4} x2={x1 - 14} y2={y0 + 4} stroke="#e5e7eb" strokeWidth="1.5" strokeOpacity="0.85" />
          <line x1={x0 + 12} y1={y1 - 4} x2={x1 - 14} y2={y1 - 4} stroke="#e5e7eb" strokeWidth="1.5" strokeOpacity="0.85" />
          <rect x={x1 - 7} y={cy - s.W * 0.3} width="5" height={s.W * 0.6} rx="2" fill="#d1d5db" />
          {Array.from({ length: 6 }).map((_, i) => <line key={i} x1={x1 - 7} x2={x1 - 2} y1={cy - s.W * 0.25 + i * s.W * 0.1} y2={cy - s.W * 0.25 + i * s.W * 0.1} stroke="#6b7280" strokeWidth="0.8" />)}
          <circle cx={x1 - 18} cy={cy} r="3" fill="#e5e7eb" />
        </>
      )}

      {/* mirrors */}
      <ellipse cx={xc1 - wsD * 0.35} cy={cy - cwH / 2 - 5.5} rx="5.5" ry="3.6" fill={shade(c, -0.1)} stroke="#000" strokeOpacity="0.35" strokeWidth="0.6" />
      <ellipse cx={xc1 - wsD * 0.35} cy={cy + cwH / 2 + 5.5} rx="5.5" ry="3.6" fill={shade(c, -0.1)} stroke="#000" strokeOpacity="0.35" strokeWidth="0.6" />

      {/* glasshouse */}
      <path d={rr(xc0, cy - cwH / 2, xc1 - xc0, cwH, 10, 16)} fill={`url(#${id('glass')})`} />
      {/* roof */}
      {glassRoof ? (
        <>
          <path d={rr(roofX0, cy - roofH / 2, roofX1 - roofX0, roofH, 8, 8)} fill={shade(c, -0.15)} />
          <path d={rr(roofX0 + 3, cy - roofH / 2 + 3, roofX1 - roofX0 - 6, roofH - 6, 6, 6)} fill="#05080f" />
          <rect x={roofX0 + 6} y={cy - roofH / 2 + 5} width={(roofX1 - roofX0) * 0.6} height={roofH * 0.25} rx="4" fill="#fff" opacity="0.12" />
        </>
      ) : (
        <>
          <path d={rr(roofX0, cy - roofH / 2, roofX1 - roofX0, roofH, 8, 8)} fill={`url(#${id('roof')})`} />
          <ellipse cx={(roofX0 + roofX1) / 2} cy={cy - roofH * 0.12} rx={(roofX1 - roofX0) * 0.36} ry={roofH * 0.16} fill="#fff" opacity="0.22" filter={`url(#${id('soft')})`} />
        </>
      )}
      {/* roof rails */}
      {(car.body === 'cross' || car.body === 'bigsuv') && (
        <>
          <line x1={roofX0 + 4} x2={roofX1 - 4} y1={cy - roofH / 2 + 3} y2={cy - roofH / 2 + 3} stroke="#cbd5e1" strokeWidth="2.2" strokeLinecap="round" />
          <line x1={roofX0 + 4} x2={roofX1 - 4} y1={cy + roofH / 2 - 3} y2={cy + roofH / 2 - 3} stroke="#cbd5e1" strokeWidth="2.2" strokeLinecap="round" />
        </>
      )}
      {car.body === 'van' && <rect x={(roofX0 + roofX1) / 2 - 10} y={cy - 8} width="20" height="16" rx="3" fill={shade(c, -0.2)} stroke="#000" strokeOpacity="0.25" />}
      {/* windshield reflection */}
      <path d={`M${roofX1 + 3},${cy - cwH / 2 + 4} L${roofX1 + wsD * 0.55},${cy - cwH / 2 + 4} L${roofX1 + wsD * 0.25},${cy + cwH / 2 - 4} L${roofX1 + 1},${cy + cwH / 2 - 4} Z`} fill="#fff" opacity="0.14" />

      {/* lights */}
      {car.ev ? (
        <>
          <rect x={x1 - 5} y={y0 + 9} width="3" height={s.W - 18} rx="1.5" fill="#e0f2fe" />
          <rect x={x0 + 1.5} y={y0 + 8} width="3" height={s.W - 16} rx="1.5" fill="#ef4444" />
        </>
      ) : (
        <>
          <rect x={x1 - 9} y={y0 + 6} width="7" height="11" rx="3" fill="#fffbea" />
          <rect x={x1 - 9} y={y1 - 17} width="7" height="11" rx="3" fill="#fffbea" />
          <rect x={x0 + 1.5} y={y0 + 6} width="6" height="10" rx="2.5" fill="#ef4444" />
          <rect x={x0 + 1.5} y={y1 - 16} width="6" height="10" rx="2.5" fill="#ef4444" />
        </>
      )}

      {/* overall gloss */}
      <path d={rr(x0, y0, s.L, s.W, s.rRear, s.rFront)} fill={`url(#${id('sheen')})`} />
    </svg>
  )
}

/** Car token used on race tracks: top-down car + coloured player marker + nitro flame. */
export function CarToken({ car, ring, number, nitro = false, className = '' }: { car: RealCar; ring?: string; number?: number; nitro?: boolean; className?: string }) {
  return (
    <div className={`relative ${className}`}>
      {nitro && <div className="flame absolute right-[86%] top-1/2 -translate-y-1/2 w-16 h-5 rounded-full" style={{ background: 'linear-gradient(90deg, transparent, #ff3d00, #ffb21a, #fff6a8)' }} />}
      <TopCar car={car} lights className="block w-[112px] h-[56px] sm:w-[128px] sm:h-[64px]" />
      {number !== undefined && (
        <span className="absolute -top-1 left-1 w-6 h-6 rounded-full grid place-items-center text-xs font-extrabold text-white border-2 border-[#0b1033]" style={{ background: ring ?? '#3b82f6' }}>{number}</span>
      )}
    </div>
  )
}

/** Showroom turntable: the car seen from above at an angle, slowly spinning. */
export function Showroom({ car, spin = true, flat = false, className = '' }: { car: RealCar; spin?: boolean; flat?: boolean; className?: string }) {
  if (flat) {
    return (
      <div className={`relative overflow-hidden grid place-items-center ${className}`} style={{ background: 'radial-gradient(ellipse at 50% 55%, #2b3a8f 0%, #141c55 55%, #0b1033 100%)' }}>
        <div className="absolute inset-x-[8%] top-1/2 h-px bg-white/10" />
        <TopCar car={car} className="relative w-[94%]" />
      </div>
    )
  }
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ background: 'radial-gradient(ellipse at 50% 60%, #1e2a6e 0%, #0b1033 70%)' }}>
      <div className="absolute inset-0 grid place-items-center" style={{ perspective: '700px' }}>
        <div className="relative w-[78%] aspect-square" style={{ transform: 'rotateX(52deg)', transformStyle: 'preserve-3d' }}>
          <div className="absolute inset-0 rounded-full" style={{ background: 'radial-gradient(circle, #2b3a8f 0%, #1a2466 55%, #10184a 70%, transparent 71%)', boxShadow: '0 0 0 3px rgba(198,255,61,.35), 0 0 60px rgba(34,211,238,.25)' }} />
          <div className="absolute inset-[12%] rounded-full border border-white/10" />
          <div className={`absolute inset-0 grid place-items-center ${spin ? 'turntable' : ''}`}>
            <TopCar car={car} className="w-[92%]" />
          </div>
        </div>
      </div>
    </div>
  )
}

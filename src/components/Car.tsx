import React, { useId } from 'react'

export type CarVariant = 'sedan' | 'van' | 'suv' | 'sport'

const BODY: Record<CarVariant, { body: string; windows: string[]; roofY: number }> = {
  sedan: {
    body: 'M8 50 L8 41 Q9 35 19 34 L44 32 L60 18 Q64 15 72 15 L104 15 Q112 15 118 21 L129 32 L146 35 Q153 36 153 43 L153 50 Z',
    windows: ['M50 32 L63 20 Q66 18 71 18 L86 18 L86 32 Z', 'M90 18 L103 18 Q109 18 113 22 L122 32 L90 32 Z'],
    roofY: 15,
  },
  van: {
    body: 'M10 52 L10 22 Q10 11 22 11 L116 11 Q126 11 132 19 L145 35 Q151 38 151 45 L151 52 Z',
    windows: ['M18 16 L44 16 L44 31 L18 31 Z', 'M50 16 L78 16 L78 31 L50 31 Z', 'M84 16 L112 16 L112 31 L84 31 Z', 'M118 16 Q124 16 128 21 L138 33 L118 33 Z'],
    roofY: 11,
  },
  suv: {
    body: 'M8 50 L8 33 Q8 27 17 26 L40 25 L53 11 Q56 9 62 9 L114 9 Q120 9 124 15 L133 27 L147 30 Q153 31 153 39 L153 50 Z',
    windows: ['M46 25 L57 13 Q59 12 63 12 L84 12 L84 25 Z', 'M88 12 L113 12 Q118 12 121 16 L128 25 L88 25 Z'],
    roofY: 9,
  },
  sport: {
    body: 'M6 50 L6 43 Q8 38 18 37 L52 34 L72 23 Q78 20 88 20 L106 20 Q115 21 123 28 L134 34 L150 38 Q155 40 155 46 L155 50 Z',
    windows: ['M62 33 L76 25 Q80 23 87 23 L96 23 L96 33 Z', 'M100 23 L106 23 Q113 24 119 29 L124 33 L100 33 Z'],
    roofY: 20,
  },
}

function Wheel({ cx, cy, spinning }: { cx: number; cy: number; spinning: boolean }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={12} fill="#121420" />
      <circle cx={cx} cy={cy} r={12} fill="none" stroke="#2c3048" strokeWidth={2} />
      <g className={spinning ? 'wheel-spin' : 'wheel-idle'}>
        <circle cx={cx} cy={cy} r={7.2} fill="#cfd6e6" />
        <circle cx={cx} cy={cy} r={7.2} fill="none" stroke="#8b94ad" strokeWidth={1} />
        {[0, 72, 144, 216, 288].map((a) => (
          <rect key={a} x={cx - 1.1} y={cy - 6.8} width={2.2} height={6.8} rx={1} fill="#7a839c" transform={`rotate(${a} ${cx} ${cy})`} />
        ))}
        <circle cx={cx} cy={cy} r={2.2} fill="#4b5268" />
      </g>
    </g>
  )
}

export function Car({
  color = '#3b82f6',
  dark = '#1d4fb8',
  variant = 'sedan',
  spinning = false,
  number,
  nitro = false,
  className = '',
  width = 160,
}: {
  color?: string
  dark?: string
  variant?: CarVariant
  spinning?: boolean
  number?: string | number
  nitro?: boolean
  className?: string
  width?: number
}) {
  const id = useId().replace(/:/g, '')
  const v = BODY[variant]
  const rearX = variant === 'van' ? 40 : 38
  const frontX = variant === 'van' ? 122 : 124
  const wy = variant === 'van' ? 52 : 50
  return (
    <svg viewBox="-30 0 192 68" width={width} className={className} role="img" aria-label="Poyga mashinasi">
      <defs>
        <linearGradient id={`b${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={color} stopOpacity="1" />
          <stop offset=".55" stopColor={color} />
          <stop offset="1" stopColor={dark} />
        </linearGradient>
        <linearGradient id={`w${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#bfe3ff" />
          <stop offset="1" stopColor="#3a5a8a" />
        </linearGradient>
        <linearGradient id={`f${id}`} x1="1" y1="0" x2="0" y2="0">
          <stop offset="0" stopColor="#fff6a8" />
          <stop offset=".4" stopColor="#ffb21a" />
          <stop offset="1" stopColor="#ff3d00" stopOpacity="0" />
        </linearGradient>
      </defs>
      {nitro && (
        <g className="flame">
          <path d={`M8 ${wy - 9} L-28 ${wy - 13} L-12 ${wy - 6} L-26 ${wy - 1} L8 ${wy - 3} Z`} fill={`url(#f${id})`} />
        </g>
      )}
      <ellipse cx={81} cy={wy + 12} rx={74} ry={3.5} fill="#000" opacity={0.35} />
      <path d={v.body} fill={`url(#b${id})`} stroke={dark} strokeWidth={1} />
      {/* shine */}
      <path d={`M20 ${variant === 'van' ? 36 : 39} L146 ${variant === 'van' ? 38 : 40}`} stroke="#ffffff55" strokeWidth={2} strokeLinecap="round" />
      {/* sill */}
      <path d={`M10 ${wy - 4} L151 ${wy - 4}`} stroke={dark} strokeWidth={4} opacity={0.6} />
      {v.windows.map((w, i) => (
        <path key={i} d={w} fill={`url(#w${id})`} stroke="#1a2440" strokeWidth={0.8} />
      ))}
      {/* door line + handle */}
      <path d={`M88 ${v.roofY + 18} L88 ${wy - 6}`} stroke={dark} strokeWidth={1} opacity={0.7} />
      <rect x={92} y={v.roofY + 22} width={7} height={2} rx={1} fill={dark} />
      {/* lights */}
      <path d={`M147 ${wy - 14} q5 1 5 5 l-6 0 z`} fill="#fff6c2" />
      <rect x={8} y={wy - 14} width={4} height={6} rx={1.5} fill="#ff3b3b" />
      {number !== undefined && (
        <g>
          <circle cx={70} cy={wy - 13} r={6.5} fill="#fff" />
          <text x={70} y={wy - 10.4} textAnchor="middle" fontSize={8} fontWeight={800} fill={dark} fontFamily="Manrope, sans-serif">
            {number}
          </text>
        </g>
      )}
      {/* arches */}
      <circle cx={rearX} cy={wy} r={14.5} fill="#0e1130" />
      <circle cx={frontX} cy={wy} r={14.5} fill="#0e1130" />
      <Wheel cx={rearX} cy={wy} spinning={spinning} />
      <Wheel cx={frontX} cy={wy} spinning={spinning} />
    </svg>
  )
}

export const CAR_MODELS: { name: string; variant: CarVariant; color: string; dark: string; price: number; tag: string }[] = [
  { name: 'Cobalt Turbo', variant: 'sedan', color: '#3b82f6', dark: '#1a4cb5', price: 0, tag: 'Boshlang‘ich' },
  { name: 'Damas Raketa', variant: 'van', color: '#ff7a1a', dark: '#b84a00', price: 1200, tag: 'Kulgili' },
  { name: 'Tracker X', variant: 'suv', color: '#22c55e', dark: '#147a3a', price: 2500, tag: 'Kuchli' },
  { name: 'Ipak Yo‘li GT', variant: 'sport', color: '#e11d74', dark: '#8a0f45', price: 5000, tag: 'Afsonaviy' },
]

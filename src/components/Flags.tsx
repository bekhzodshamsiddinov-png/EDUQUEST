import React from 'react'

function star(cx: number, cy: number, r: number, points = 5, inner = 0.4) {
  const pts: string[] = []
  for (let i = 0; i < points * 2; i++) {
    const rad = i % 2 === 0 ? r : r * inner
    const a = (Math.PI / points) * i - Math.PI / 2
    pts.push(`${(cx + rad * Math.cos(a)).toFixed(2)},${(cy + rad * Math.sin(a)).toFixed(2)}`)
  }
  return pts.join(' ')
}

export type CountryCode = 'uz' | 'kz' | 'tr' | 'jp' | 'fr' | 'de' | 'it' | 'fi' | 'se' | 'br' | 'ca' | 'in'

export const COUNTRIES: { code: CountryCode; name: string; capital: string }[] = [
  { code: 'uz', name: 'O‘zbekiston', capital: 'Toshkent' },
  { code: 'kz', name: 'Qozog‘iston', capital: 'Astana' },
  { code: 'tr', name: 'Turkiya', capital: 'Anqara' },
  { code: 'jp', name: 'Yaponiya', capital: 'Tokio' },
  { code: 'fr', name: 'Fransiya', capital: 'Parij' },
  { code: 'de', name: 'Germaniya', capital: 'Berlin' },
  { code: 'it', name: 'Italiya', capital: 'Rim' },
  { code: 'fi', name: 'Finlandiya', capital: 'Xelsinki' },
  { code: 'se', name: 'Shvetsiya', capital: 'Stokgolm' },
  { code: 'br', name: 'Braziliya', capital: 'Braziliya' },
  { code: 'ca', name: 'Kanada', capital: 'Ottava' },
  { code: 'in', name: 'Hindiston', capital: 'Nyu-Dehli' },
]

function Inner({ code }: { code: CountryCode }) {
  switch (code) {
    case 'uz': {
      const stars: [number, number][] = []
      const rows = [[3, 1.4], [4, 3.2], [5, 5.0]] as const
      rows.forEach(([n, y]) => {
        for (let i = 0; i < n; i++) stars.push([16.2 - i * 1.8, y])
      })
      return (
        <>
          <rect width="30" height="20" fill="#fff" />
          <rect width="30" height="6.4" fill="#0099b5" />
          <rect y="13.6" width="30" height="6.4" fill="#1eb53a" />
          <rect y="6.4" width="30" height="0.5" fill="#ce1126" />
          <rect y="13.1" width="30" height="0.5" fill="#ce1126" />
          <circle cx="4.6" cy="3.2" r="2.3" fill="#fff" />
          <circle cx="5.5" cy="3.2" r="2" fill="#0099b5" />
          {stars.map(([x, y], i) => (
            <polygon key={i} points={star(x, y, 0.62)} fill="#fff" />
          ))}
        </>
      )
    }
    case 'kz':
      return (
        <>
          <rect width="30" height="20" fill="#00afca" />
          <circle cx="15" cy="9" r="3" fill="#fec50c" />
          {Array.from({ length: 16 }).map((_, i) => (
            <rect key={i} x="14.7" y="3.6" width="0.6" height="1.6" fill="#fec50c" transform={`rotate(${i * 22.5} 15 9)`} />
          ))}
          <path d="M10.5 13.5 Q15 11.5 19.5 13.5 Q15 12.6 10.5 13.5Z" fill="#fec50c" />
          <rect x="1.5" y="1" width="1.4" height="18" fill="#fec50c" opacity=".9" />
        </>
      )
    case 'tr':
      return (
        <>
          <rect width="30" height="20" fill="#e30a17" />
          <circle cx="10.6" cy="10" r="5" fill="#fff" />
          <circle cx="11.85" cy="10" r="4" fill="#e30a17" />
          <polygon points={star(16.6, 10, 2.1)} fill="#fff" transform="rotate(-18 16.6 10)" />
        </>
      )
    case 'jp':
      return (
        <>
          <rect width="30" height="20" fill="#fff" />
          <circle cx="15" cy="10" r="6" fill="#bc002d" />
        </>
      )
    case 'fr':
      return (
        <>
          <rect width="10" height="20" fill="#002395" />
          <rect x="10" width="10" height="20" fill="#fff" />
          <rect x="20" width="10" height="20" fill="#ed2939" />
        </>
      )
    case 'de':
      return (
        <>
          <rect width="30" height="6.67" fill="#000" />
          <rect y="6.67" width="30" height="6.67" fill="#dd0000" />
          <rect y="13.33" width="30" height="6.67" fill="#ffce00" />
        </>
      )
    case 'it':
      return (
        <>
          <rect width="10" height="20" fill="#009246" />
          <rect x="10" width="10" height="20" fill="#fff" />
          <rect x="20" width="10" height="20" fill="#ce2b37" />
        </>
      )
    case 'fi':
      return (
        <>
          <rect width="30" height="20" fill="#fff" />
          <rect x="8.2" width="4.9" height="20" fill="#002f6c" />
          <rect y="7.55" width="30" height="4.9" fill="#002f6c" />
        </>
      )
    case 'se':
      return (
        <>
          <rect width="30" height="20" fill="#006aa7" />
          <rect x="9.4" width="3.75" height="20" fill="#fecc00" />
          <rect y="8.1" width="30" height="3.75" fill="#fecc00" />
        </>
      )
    case 'br':
      return (
        <>
          <rect width="30" height="20" fill="#009c3b" />
          <polygon points="15,2 28,10 15,18 2,10" fill="#ffdf00" />
          <circle cx="15" cy="10" r="4.6" fill="#002776" />
          <path d="M10.6 9.2 Q15 7.8 19.4 10.6" stroke="#fff" strokeWidth=".7" fill="none" />
        </>
      )
    case 'ca':
      return (
        <>
          <rect width="30" height="20" fill="#fff" />
          <rect width="7.5" height="20" fill="#d80621" />
          <rect x="22.5" width="7.5" height="20" fill="#d80621" />
          <path
            d="M15 3.4 L16 5.4 L17.3 4.9 L16.9 8.1 L18.6 6.5 L19 7.6 L20.8 7.2 L20.1 9.3 L21 9.8 L18 12.2 L18.4 13.3 L15.4 12.9 L15.5 16.2 L14.5 16.2 L14.6 12.9 L11.6 13.3 L12 12.2 L9 9.8 L9.9 9.3 L9.2 7.2 L11 7.6 L11.4 6.5 L13.1 8.1 L12.7 4.9 L14 5.4 Z"
            fill="#d80621"
          />
        </>
      )
    case 'in':
      return (
        <>
          <rect width="30" height="6.67" fill="#ff9933" />
          <rect y="6.67" width="30" height="6.67" fill="#fff" />
          <rect y="13.33" width="30" height="6.67" fill="#138808" />
          <circle cx="15" cy="10" r="2.6" fill="none" stroke="#000080" strokeWidth=".45" />
          {Array.from({ length: 12 }).map((_, i) => (
            <rect key={i} x="14.9" y="7.5" width="0.2" height="2.5" fill="#000080" transform={`rotate(${i * 15} 15 10)`} />
          ))}
        </>
      )
  }
}

export function Flag({ code, className = '', width = 180 }: { code: CountryCode; className?: string; width?: number }) {
  return (
    <svg viewBox="0 0 30 20" width={width} className={className} role="img" aria-label="Bayroq" style={{ borderRadius: 6, boxShadow: '0 10px 30px -10px rgba(0,0,0,.6)' }}>
      <Inner code={code} />
    </svg>
  )
}

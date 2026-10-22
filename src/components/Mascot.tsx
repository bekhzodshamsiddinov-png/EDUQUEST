import React from 'react'

/** "Quest" — EDUQUEST's original mascot: a small robot racer with an atlas-pattern helmet stripe. */
export function Mascot({ size = 220, wave = true, className = '' }: { size?: number; wave?: boolean; className?: string }) {
  return (
    <svg viewBox="0 0 220 240" width={size} height={(size * 240) / 220} className={className} role="img" aria-label="EDUQUEST maskoti Quest">
      <defs>
        <linearGradient id="mq-helmet" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#d6dcf5" />
        </linearGradient>
        <linearGradient id="mq-visor" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1b2a6b" />
          <stop offset="1" stopColor="#0a1030" />
        </linearGradient>
        <linearGradient id="mq-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5b8cff" />
          <stop offset="1" stopColor="#2a52d6" />
        </linearGradient>
        <pattern id="mq-ikat" width="20" height="14" patternUnits="userSpaceOnUse">
          <rect width="20" height="14" fill="#7c3aed" />
          <path d="M0 7 Q5 0 10 7 T20 7" fill="none" stroke="#ffd43b" strokeWidth="3" />
          <path d="M0 7 Q5 14 10 7 T20 7" fill="none" stroke="#22d3ee" strokeWidth="2" />
          <circle cx="10" cy="7" r="1.6" fill="#ff5ca8" />
        </pattern>
        <radialGradient id="mq-glow" cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor="#c6ff3d" stopOpacity=".55" />
          <stop offset="1" stopColor="#c6ff3d" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="110" cy="228" rx="62" ry="8" fill="#000" opacity=".35" />
      <circle cx="110" cy="120" r="105" fill="url(#mq-glow)" />
      {/* body */}
      <rect x="62" y="140" width="96" height="70" rx="30" fill="url(#mq-body)" />
      <rect x="88" y="158" width="44" height="28" rx="10" fill="#0e1540" />
      <text x="110" y="177" textAnchor="middle" fontFamily="Fredoka, sans-serif" fontWeight="700" fontSize="14" fill="#c6ff3d">EQ</text>
      {/* left arm */}
      <rect x="40" y="150" width="26" height="16" rx="8" fill="#2a52d6" transform="rotate(25 52 158)" />
      <circle cx="40" cy="172" r="10" fill="#fff" />
      {/* right arm waving */}
      <g className={wave ? 'bob' : ''} style={{ transformOrigin: '160px 150px' }}>
        <rect x="152" y="118" width="16" height="36" rx="8" fill="#2a52d6" transform="rotate(20 160 150)" />
        <circle cx="172" cy="114" r="11" fill="#fff" />
      </g>
      {/* legs */}
      <rect x="80" y="200" width="22" height="22" rx="8" fill="#1d3fb0" />
      <rect x="118" y="200" width="22" height="22" rx="8" fill="#1d3fb0" />
      <rect x="74" y="214" width="34" height="12" rx="6" fill="#ff7a1a" />
      <rect x="112" y="214" width="34" height="12" rx="6" fill="#ff7a1a" />
      {/* helmet */}
      <circle cx="110" cy="88" r="66" fill="url(#mq-helmet)" stroke="#aab4dd" strokeWidth="2" />
      <path d="M58 52 Q110 10 162 52 L156 62 Q110 26 64 62 Z" fill="url(#mq-ikat)" />
      <path d="M48 96 Q48 140 92 150 L128 150 Q172 140 172 96 Z" fill="#e7ebfb" />
      {/* visor / face */}
      <rect x="58" y="66" width="104" height="62" rx="30" fill="url(#mq-visor)" />
      <path d="M70 76 Q90 70 104 72" stroke="#ffffff55" strokeWidth="4" strokeLinecap="round" fill="none" />
      <ellipse cx="90" cy="98" rx="10" ry="12" fill="#c6ff3d" />
      <ellipse cx="130" cy="98" rx="10" ry="12" fill="#c6ff3d" />
      <circle cx="93" cy="94" r="3.5" fill="#fff" />
      <circle cx="133" cy="94" r="3.5" fill="#fff" />
      <path d="M98 114 Q110 124 122 114" stroke="#c6ff3d" strokeWidth="4" strokeLinecap="round" fill="none" />
      <circle cx="74" cy="112" r="5" fill="#ff5ca8" opacity=".6" />
      <circle cx="146" cy="112" r="5" fill="#ff5ca8" opacity=".6" />
      {/* side ear-pods */}
      <rect x="38" y="80" width="14" height="30" rx="7" fill="#ff7a1a" />
      <rect x="168" y="80" width="14" height="30" rx="7" fill="#ff7a1a" />
      {/* helmet number */}
      <circle cx="110" cy="36" r="0" />
    </svg>
  )
}

import React from 'react'

export const DonateurIcon = ({ size = 64, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Heart */}
    <path d="M32 52C32 52 20 42 20 30C20 23.5 25.5 18 32 18C38.5 18 44 23.5 44 30C44 42 32 52 32 52Z" fill="#FF69B4" stroke="#FF1493" strokeWidth="2"/>
    {/* Ribbon bow - left loop */}
    <ellipse cx="26" cy="20" rx="4" ry="3" fill="#FFD700" stroke="#FFA500" strokeWidth="1.5"/>
    {/* Ribbon bow - right loop */}
    <ellipse cx="38" cy="20" rx="4" ry="3" fill="#FFD700" stroke="#FFA500" strokeWidth="1.5"/>
    {/* Ribbon center knot */}
    <circle cx="32" cy="20" r="2.5" fill="#FFA500"/>
    {/* Ribbon tails */}
    <path d="M24 22L24 26L32 20L24 22Z" fill="#FFD700"/>
    <path d="M40 22L40 26L32 20L40 22Z" fill="#FFD700"/>
  </svg>
)

export const VrijwilligerIcon = ({ size = 64, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Raised hand/fist */}
    <path d="M32 16C28 16 24 20 24 24V32C24 36 26 38 30 38C32 38 34 37 35 35L38 28C39 26 41 25 43 25C45 25 46 27 46 29V36C46 40 44 44 40 44H28C24 44 20 40 20 36V28C20 24 22 20 26 20H30" fill="#FFD700" stroke="#FFA500" strokeWidth="2"/>
    {/* Thumb */}
    <path d="M26 24C26 22 27 20 29 20C30 20 31 20.5 32 21L32 24L32 21C33 20.5 34 20 35 20C37 20 38 22 38 24V28C38 30 36 32 34 32H30C28 32 26 30 26 28V24Z" fill="#FFA500" stroke="#FF8C00" strokeWidth="1.5"/>
    {/* Wrist */}
    <rect x="28" y="44" width="8" height="8" rx="2" fill="#FFD700" stroke="#FFA500" strokeWidth="2"/>
  </svg>
)

export const SchoolMoskeeIcon = ({ size = 64, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Building base */}
    <rect x="12" y="32" width="40" height="20" fill="#87CEEB" stroke="#4682B4" strokeWidth="2"/>
    {/* Dome */}
    <ellipse cx="32" cy="32" rx="16" ry="12" fill="#2563EB" stroke="#1D4ED8" strokeWidth="2"/>
    {/* Door */}
    <rect x="28" y="40" width="8" height="12" fill="#1D4ED8" stroke="#1E40AF" strokeWidth="1.5"/>
    {/* Windows */}
    <ellipse cx="20" cy="38" rx="3" ry="4" fill="#FFD700" stroke="#FFA500" strokeWidth="1.5"/>
    <ellipse cx="44" cy="38" rx="3" ry="4" fill="#FFD700" stroke="#FFA500" strokeWidth="1.5"/>
    {/* Minaret */}
    <rect x="48" y="20" width="6" height="32" fill="#2563EB" stroke="#1D4ED8" strokeWidth="1.5"/>
    <ellipse cx="51" cy="20" rx="3" ry="2" fill="#2563EB" stroke="#1D4ED8" strokeWidth="1.5"/>
    {/* Crescent moon on dome */}
    <path d="M32 16C30 16 28.5 18 28.5 20.5C28.5 23 30 25 32 25C29 25 27 22.5 27 20.5C27 18.5 29 16 32 16Z" fill="#FFD700" stroke="#FFA500" strokeWidth="1"/>
  </svg>
)

export const EigenActieIcon = ({ size = 64, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Clipboard */}
    <rect x="18" y="12" width="28" height="40" rx="2" fill="#FFFACD" stroke="#DAA520" strokeWidth="2"/>
    {/* Clip */}
    <path d="M24 12C24 10 25 8 27 8H37C39 8 40 10 40 12V16H24V12Z" fill="#DAA520" stroke="#B8860B" strokeWidth="1.5"/>
    {/* Lines on clipboard */}
    <line x1="24" y1="24" x2="40" y2="24" stroke="#DAA520" strokeWidth="2" strokeLinecap="round"/>
    <line x1="24" y1="30" x2="36" y2="30" stroke="#DAA520" strokeWidth="2" strokeLinecap="round"/>
    <line x1="24" y1="36" x2="40" y2="36" stroke="#DAA520" strokeWidth="2" strokeLinecap="round"/>
    <line x1="24" y1="42" x2="34" y2="42" stroke="#DAA520" strokeWidth="2" strokeLinecap="round"/>
  </svg>
)

export const GroteGiftIcon = ({ size = 64, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Briefcase */}
    <rect x="16" y="20" width="32" height="24" rx="2" fill="#8B4513" stroke="#654321" strokeWidth="2"/>
    {/* Handle */}
    <path d="M28 20C28 18 29 16 32 16C35 16 36 18 36 20" stroke="#FF69B4" strokeWidth="3" strokeLinecap="round" fill="none"/>
    {/* Clasp */}
    <rect x="30" y="20" width="4" height="3" fill="#FF69B4"/>
    {/* Lock detail */}
    <circle cx="32" cy="22" r="1.5" fill="#654321"/>
  </svg>
)

export const NalatenIcon = ({ size = 64, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Scroll body */}
    <rect x="16" y="24" width="32" height="28" rx="1" fill="#F5DEB3" stroke="#D2B48C" strokeWidth="2"/>
    {/* Scroll rolled edges */}
    <ellipse cx="16" cy="38" rx="4" ry="14" fill="#D2B48C"/>
    <ellipse cx="48" cy="38" rx="4" ry="14" fill="#D2B48C"/>
    {/* Text lines */}
    <line x1="22" y1="30" x2="42" y2="30" stroke="#8B7355" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="22" y1="36" x2="38" y2="36" stroke="#8B7355" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="22" y1="42" x2="40" y2="42" stroke="#8B7355" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="22" y1="48" x2="36" y2="48" stroke="#8B7355" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)

// Impact Story Icons
export const OnderdakIcon = ({ size = 64, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* House base */}
    <rect x="18" y="32" width="28" height="20" fill="#D2B48C" stroke="#8B7355" strokeWidth="2"/>
    {/* Light green roof */}
    <path d="M16 32L32 16L48 32H16Z" fill="#90EE90" stroke="#6B8E6B" strokeWidth="2"/>
    {/* Door */}
    <rect x="28" y="42" width="8" height="10" fill="#8B7355" stroke="#654321" strokeWidth="1.5"/>
    <circle cx="33" cy="47" r="1" fill="#FFD700"/>
    {/* Window */}
    <rect x="22" y="36" width="6" height="6" fill="#87CEEB" stroke="#4682B4" strokeWidth="1.5"/>
    <rect x="36" y="36" width="6" height="6" fill="#87CEEB" stroke="#4682B4" strokeWidth="1.5"/>
  </svg>
)

export const WaterIcon = ({ size = 64, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Water droplet */}
    <path d="M32 16C28 16 24 20 24 26C24 32 28 40 32 48C36 40 40 32 40 26C40 20 36 16 32 16Z" fill="#87CEEB" stroke="#4682B4" strokeWidth="2"/>
    {/* Highlight */}
    <ellipse cx="30" cy="24" rx="3" ry="4" fill="#B0E0E6" opacity="0.6"/>
    {/* Small droplets */}
    <circle cx="20" cy="30" r="2" fill="#87CEEB"/>
    <circle cx="44" cy="28" r="2" fill="#87CEEB"/>
  </svg>
)

export const OnderwijsIcon = ({ size = 64, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Left monitor - light blue */}
    <rect x="14" y="20" width="18" height="24" rx="2" fill="#87CEEB" stroke="#4682B4" strokeWidth="2"/>
    <rect x="16" y="22" width="14" height="18" fill="#B0E0E6"/>
    {/* Monitor stand */}
    <rect x="20" y="44" width="6" height="4" fill="#4682B4"/>
    {/* Right monitor - light pink */}
    <rect x="32" y="20" width="18" height="24" rx="2" fill="#FFB6C1" stroke="#FF69B4" strokeWidth="2"/>
    <rect x="34" y="22" width="14" height="18" fill="#FFC0CB"/>
    {/* Monitor stand */}
    <rect x="38" y="44" width="6" height="4" fill="#FF69B4"/>
  </svg>
)

export const VoedselIcon = ({ size = 64, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Wheat/grain bundle */}
    <path d="M32 12L28 20L32 28L36 20L32 12Z" fill="#ADFF2F" stroke="#9ACD32" strokeWidth="1.5"/>
    <path d="M32 20L28 28L32 36L36 28L32 20Z" fill="#ADFF2F" stroke="#9ACD32" strokeWidth="1.5"/>
    <path d="M32 28L28 36L32 44L36 36L32 28Z" fill="#ADFF2F" stroke="#9ACD32" strokeWidth="1.5"/>
    {/* Stalk */}
    <line x1="32" y1="44" x2="32" y2="52" stroke="#9ACD32" strokeWidth="3" strokeLinecap="round"/>
    {/* Grains */}
    <circle cx="26" cy="18" r="2" fill="#FFFF00"/>
    <circle cx="38" cy="18" r="2" fill="#FFFF00"/>
    <circle cx="26" cy="26" r="2" fill="#FFFF00"/>
    <circle cx="38" cy="26" r="2" fill="#FFFF00"/>
    <circle cx="26" cy="34" r="2" fill="#FFFF00"/>
    <circle cx="38" cy="34" r="2" fill="#FFFF00"/>
  </svg>
)

export const VredeIcon = ({ size = 64, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Olive branch/sprout */}
    <path d="M32 48L28 40L24 36L20 32L24 28L28 24L32 20L36 24L40 28L44 32L40 36L36 40L32 48Z" fill="#90EE90" stroke="#6B8E6B" strokeWidth="2"/>
    {/* Leaves */}
    <ellipse cx="24" cy="30" rx="4" ry="6" fill="#98FB98" transform="rotate(-30 24 30)"/>
    <ellipse cx="40" cy="30" rx="4" ry="6" fill="#98FB98" transform="rotate(30 40 30)"/>
    <ellipse cx="28" cy="38" rx="3" ry="5" fill="#98FB98" transform="rotate(-20 28 38)"/>
    <ellipse cx="36" cy="38" rx="3" ry="5" fill="#98FB98" transform="rotate(20 36 38)"/>
    {/* Stem */}
    <line x1="32" y1="48" x2="32" y2="56" stroke="#6B8E6B" strokeWidth="3" strokeLinecap="round"/>
  </svg>
)

export const NoodhulpIcon = ({ size = 64, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Medical cross */}
    <rect x="28" y="18" width="8" height="28" fill="#87CEEB" stroke="#4682B4" strokeWidth="2" rx="1"/>
    <rect x="18" y="28" width="28" height="8" fill="#87CEEB" stroke="#4682B4" strokeWidth="2" rx="1"/>
    {/* Center circle */}
    <circle cx="32" cy="32" r="6" fill="#4682B4"/>
    {/* Plus sign detail */}
    <line x1="32" y1="28" x2="32" y2="36" stroke="#87CEEB" strokeWidth="2" strokeLinecap="round"/>
    <line x1="28" y1="32" x2="36" y2="32" stroke="#87CEEB" strokeWidth="2" strokeLinecap="round"/>
  </svg>
)

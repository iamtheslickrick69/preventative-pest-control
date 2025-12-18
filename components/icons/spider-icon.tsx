export function SpiderIcon({ className = "", inverted = false }: { className?: string; inverted?: boolean }) {
  return (
    <svg viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Black widow spider silhouette from logo */}
      <g fill={inverted ? "currentColor" : "currentColor"}>
        {/* Body */}
        <ellipse cx="65" cy="45" rx="18" ry="25" />
        {/* Head */}
        <circle cx="45" cy="55" r="12" />
        {/* Front legs */}
        <path d="M42 50 L5 15 L8 12 L48 45" strokeWidth="0" />
        <path d="M40 55 L10 35 L13 31 L45 52" strokeWidth="0" />
        {/* Back legs - left side */}
        <path d="M55 35 L25 5 L28 2 L58 32" strokeWidth="0" />
        <path d="M60 30 L45 8 L48 5 L63 28" strokeWidth="0" />
        {/* Back legs - right side */}
        <path d="M75 35 L95 10 L92 7 L72 32" strokeWidth="0" />
        <path d="M78 40 L98 25 L95 22 L75 38" strokeWidth="0" />
        {/* Front legs - right side */}
        <path d="M80 50 L98 45 L98 42 L78 47" strokeWidth="0" />
        <path d="M82 55 L95 60 L95 57 L80 52" strokeWidth="0" />
        {/* Hourglass marking (red on real spider, here just a shape) */}
        <path d="M62 40 L68 45 L62 50 L56 45 Z" fill={inverted ? "#1a1a1a" : "#fff"} opacity="0.3" />
      </g>
    </svg>
  )
}

// Simplified spider icon for smaller sizes (chat button, avatars)
export function SpiderIconSimple({ className = "", inverted = false }: { className?: string; inverted?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <g stroke={inverted ? "white" : "currentColor"} strokeWidth="1.5" strokeLinecap="round" fill="none">
        {/* Body */}
        <ellipse cx="12" cy="14" rx="4" ry="5" fill={inverted ? "white" : "currentColor"} />
        {/* Head */}
        <circle cx="12" cy="7" r="2.5" fill={inverted ? "white" : "currentColor"} />
        {/* Legs - left */}
        <path d="M9 9 L2 4" />
        <path d="M8 11 L1 9" />
        <path d="M8 14 L1 15" />
        <path d="M9 17 L3 21" />
        {/* Legs - right */}
        <path d="M15 9 L22 4" />
        <path d="M16 11 L23 9" />
        <path d="M16 14 L23 15" />
        <path d="M15 17 L21 21" />
      </g>
    </svg>
  )
}

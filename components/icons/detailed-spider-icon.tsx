export function DetailedSpiderIcon({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Spider Body */}
      <ellipse cx="50" cy="55" rx="18" ry="22" fill="currentColor" />

      {/* Spider Head */}
      <ellipse cx="50" cy="32" rx="12" ry="14" fill="currentColor" />

      {/* Eyes - Creepy red glow */}
      <circle cx="45" cy="30" r="2.5" fill="#FF5722" opacity="0.9" />
      <circle cx="55" cy="30" r="2.5" fill="#FF5722" opacity="0.9" />
      <circle cx="43" cy="33" r="1.5" fill="#FF5722" opacity="0.7" />
      <circle cx="57" cy="33" r="1.5" fill="#FF5722" opacity="0.7" />

      {/* Front Left Legs (curved, realistic) */}
      <path
        d="M 38 45 Q 15 35, 8 25"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 36 52 Q 12 50, 5 45"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Back Left Legs */}
      <path
        d="M 38 60 Q 15 65, 8 75"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 40 68 Q 18 75, 12 85"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Front Right Legs (curved, realistic) */}
      <path
        d="M 62 45 Q 85 35, 92 25"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 64 52 Q 88 50, 95 45"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Back Right Legs */}
      <path
        d="M 62 60 Q 85 65, 92 75"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 60 68 Q 82 75, 88 85"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Abdomen marking (like a black widow) */}
      <path
        d="M 50 50 L 48 60 L 52 60 Z"
        fill="#FF5722"
        opacity="0.6"
      />

      {/* Optional: Subtle texture lines on body */}
      <line x1="50" y1="48" x2="50" y2="62" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      <line x1="45" y1="52" x2="55" y2="52" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      <line x1="45" y1="58" x2="55" y2="58" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
    </svg>
  )
}

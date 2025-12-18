"use client"

import type React from "react"

import { useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface HoverCardEffectProps {
  children: React.ReactNode
  className?: string
  glowColor?: string
}

export function HoverCardEffect({ children, className, glowColor = "primary" }: HoverCardEffectProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={cn("relative overflow-hidden", className)}
    >
      {/* Glow effect */}
      <div
        className={cn(
          "pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300",
          isHovering && "opacity-100",
        )}
        style={{
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, hsl(var(--${glowColor}) / 0.15), transparent 40%)`,
        }}
      />
      {children}
    </div>
  )
}

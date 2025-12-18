"use client"

import { useEffect, useRef, useState } from "react"

interface CounterProps {
  end: number
  duration?: number
  suffix?: string
  className?: string
}

export function Counter({ end, duration = 2000, suffix = "", className = "" }: CounterProps) {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const countRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true)

          const startTime = Date.now()
          const endValue = end

          const animate = () => {
            const now = Date.now()
            const progress = Math.min((now - startTime) / duration, 1)

            // Easing function (ease-out)
            const easeOut = 1 - Math.pow(1 - progress, 3)

            setCount(Math.floor(easeOut * endValue))

            if (progress < 1) {
              requestAnimationFrame(animate)
            } else {
              setCount(endValue)
            }
          }

          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.5 }
    )

    if (countRef.current) {
      observer.observe(countRef.current)
    }

    return () => {
      if (countRef.current) {
        observer.unobserve(countRef.current)
      }
    }
  }, [end, duration, hasAnimated])

  return (
    <div ref={countRef} className={className}>
      {count}{suffix}
    </div>
  )
}

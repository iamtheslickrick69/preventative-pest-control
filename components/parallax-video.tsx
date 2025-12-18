"use client"

import { useEffect, useRef } from "react"

interface ParallaxVideoProps {
  src: string
  className?: string
}

export function ParallaxVideo({ src, className = "" }: ParallaxVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!videoRef.current) return
      const scrolled = window.scrollY
      const rate = scrolled * 0.3 // Slower than content scroll
      videoRef.current.style.transform = `translateY(${rate}px)`
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <video
      ref={videoRef}
      autoPlay
      loop
      muted
      playsInline
      className={`transition-transform duration-100 ease-out ${className}`}
    >
      <source src={src} type="video/mp4" />
    </video>
  )
}

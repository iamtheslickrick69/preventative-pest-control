"use client"

import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react"
import { cn } from "@/lib/utils"

const reviews = [
  {
    name: "Deborah Evans",
    date: "December 4, 2025",
    text: "Tyler is always so pleasant and professional. He is a very kind and patient young man. I have used Preventive Pest since I moved here in 2002 and have not had any issues with them. Their prices are very fair.",
    technician: "Tyler",
    rating: 5,
    location: "St. George, UT",
  },
  {
    name: "Lisa Farrington",
    date: "November 3, 2025",
    text: "Ronnie is, without a doubt, the best pest control guy I've ever had the pleasure of working with. His attention to detail, expertise, and friendly demeanor make him stand out from the rest.",
    technician: "Ronnie",
    rating: 5,
    location: "Hurricane, UT",
  },
  {
    name: "Mary Kay Dougherty",
    date: "December 1, 2025",
    text: "Jason is very knowledgeable about the services he provides. He is very friendly and remembers any past issues that I have had. Definitely would recommend Preventive Pest Control!",
    technician: "Jason",
    rating: 5,
    location: "Washington, UT",
  },
  {
    name: "Leanne Mieszala",
    date: "October 3, 2025",
    text: "I can't say enough great things about my technician Chris! He always does an excellent job spraying the perimeter of my home, making sure everything is covered thoroughly. Highly recommend!",
    technician: "Chris",
    rating: 5,
    location: "Cedar City, UT",
  },
  {
    name: "Noly Zambianco",
    date: "September 26, 2025",
    text: "I had a great experience with Miguel during my recent pest control service. He was professional, knowledgeable, kind, and incredibly helpful throughout the entire visit.",
    technician: "Miguel",
    rating: 5,
    location: "Mesquite, NV",
  },
  {
    name: "Tasha Nealy",
    date: "May 8, 2025",
    text: "We have been using Preventive Pest for 10+ years. In the entire time we've been using their services, we've only ever had them spray inside our home once. That's how well the spray works outside!",
    technician: "Team",
    rating: 5,
    location: "St. George, UT",
  },
]

export function ReviewCarousel() {
  const [current, setCurrent] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [direction, setDirection] = useState<"left" | "right">("right")

  const goToSlide = useCallback(
    (index: number) => {
      setDirection(index > current ? "right" : "left")
      setCurrent(index)
    },
    [current],
  )

  const prev = useCallback(() => {
    setIsAutoPlaying(false)
    setDirection("left")
    setCurrent((prev) => (prev - 1 + reviews.length) % reviews.length)
  }, [])

  const next = useCallback(() => {
    setIsAutoPlaying(false)
    setDirection("right")
    setCurrent((prev) => (prev + 1) % reviews.length)
  }, [])

  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(() => {
      setDirection("right")
      setCurrent((prev) => (prev + 1) % reviews.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [isAutoPlaying])

  return (
    <div className="relative">
      {/* Main Review Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/5 via-background to-accent/5 border border-primary/10">
        {/* Decorative quote */}
        <div className="absolute top-6 left-6 opacity-10">
          <Quote className="h-16 w-16 text-primary" />
        </div>

        <div className="relative p-8 md:p-12">
          {/* Review Content */}
          <div
            key={current}
            className={cn(
              "transition-all duration-500",
              direction === "right"
                ? "animate-in slide-in-from-right-10 fade-in"
                : "animate-in slide-in-from-left-10 fade-in",
            )}
          >
            {/* Stars */}
            <div className="flex gap-1 mb-6">
              {Array.from({ length: reviews[current].rating }).map((_, i) => (
                <Star
                  key={i}
                  className="h-6 w-6 fill-accent text-accent transition-transform hover:scale-125"
                  style={{ animationDelay: `${i * 100}ms` }}
                />
              ))}
            </div>

            {/* Quote */}
            <blockquote className="text-xl md:text-2xl text-foreground leading-relaxed mb-8 font-medium">
              &ldquo;{reviews[current].text}&rdquo;
            </blockquote>

            {/* Attribution */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-primary/10">
              <div className="flex items-center gap-4">
                {/* Avatar with initials */}
                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                  {reviews[current].name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <div className="font-semibold text-foreground text-lg">{reviews[current].name}</div>
                  <div className="text-sm text-muted-foreground flex items-center gap-2">
                    <span>{reviews[current].location}</span>
                    <span className="text-primary/30">|</span>
                    <span>{reviews[current].date}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-primary/5 rounded-full px-4 py-2">
                <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                <span className="text-sm text-muted-foreground">Serviced by</span>
                <span className="font-semibold text-primary">{reviews[current].technician}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-6 mt-8">
        <button
          onClick={prev}
          className="btn-press inline-flex h-12 w-12 items-center justify-center rounded-full border border-primary/20 bg-background hover:bg-primary/5 hover:border-primary/40 transition-all"
          aria-label="Previous review"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        {/* Progress Dots */}
        <div className="flex gap-2">
          {reviews.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setIsAutoPlaying(false)
                goToSlide(idx)
              }}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                idx === current ? "w-8 bg-primary" : "w-2 bg-primary/30 hover:bg-primary/50",
              )}
              aria-label={`Go to review ${idx + 1}`}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="btn-press inline-flex h-12 w-12 items-center justify-center rounded-full border border-primary/20 bg-background hover:bg-primary/5 hover:border-primary/40 transition-all"
          aria-label="Next review"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Google Badge */}
      <div className="mt-6 text-center">
        <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          <span>
            Verified reviews from <span className="font-semibold text-foreground">Google</span>
          </span>
          <span className="text-primary/30">|</span>
          <span className="font-semibold text-primary">4.9 rating</span>
        </div>
      </div>
    </div>
  )
}

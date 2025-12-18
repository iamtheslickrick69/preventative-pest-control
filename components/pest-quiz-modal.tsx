"use client"

import * as React from "react"
import { X, ChevronRight, ChevronLeft, Bug, Phone, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

type QuizStep = {
  question: string
  options: { label: string; value: string }[]
}

const QUIZ_STEPS: QuizStep[] = [
  {
    question: "Where did you see the pest?",
    options: [
      { label: "Kitchen", value: "kitchen" },
      { label: "Bathroom", value: "bathroom" },
      { label: "Bedroom", value: "bedroom" },
      { label: "Yard/Outside", value: "yard" },
      { label: "Multiple Areas", value: "multiple" },
    ],
  },
  {
    question: "What size is the pest?",
    options: [
      { label: "Tiny (smaller than a grain of rice)", value: "tiny" },
      { label: "Small (rice to pea size)", value: "small" },
      { label: "Medium (pea to grape size)", value: "medium" },
      { label: "Large (grape or bigger)", value: "large" },
    ],
  },
  {
    question: "How many legs does it have?",
    options: [
      { label: "No legs (worm-like)", value: "0" },
      { label: "6 legs (insect)", value: "6" },
      { label: "8 legs (spider/scorpion)", value: "8" },
      { label: "Many legs", value: "many" },
      { label: "I'm not sure", value: "unknown" },
    ],
  },
  {
    question: "What color is the pest?",
    options: [
      { label: "Black or dark brown", value: "dark" },
      { label: "Light brown or tan", value: "light" },
      { label: "Red or reddish-brown", value: "red" },
      { label: "Gray or white", value: "gray" },
      { label: "Mixed/other colors", value: "mixed" },
    ],
  },
]

type ResultType = {
  pest: string
  service: string
  description: string
  urgency: "high" | "medium" | "low"
}

function getResult(answers: Record<number, string>): ResultType {
  const legs = answers[2]
  const size = answers[1]
  const location = answers[0]
  const color = answers[3]

  // Scorpion detection
  if (
    legs === "8" &&
    (size === "medium" || size === "large") &&
    (location === "bathroom" || location === "bedroom" || location === "yard")
  ) {
    return {
      pest: "Scorpion",
      service: "Scorpion Control",
      description:
        "Based on your answers, you likely have scorpions. These are common in Southern Utah's desert climate and can be dangerous. We recommend immediate professional treatment.",
      urgency: "high",
    }
  }

  // Spider detection
  if (legs === "8" && (size === "small" || size === "medium")) {
    return {
      pest: "Spider",
      service: "Spider Control",
      description:
        "You likely have spiders in your home. Southern Utah has several spider species including black widows. We recommend professional inspection and barrier treatment.",
      urgency: "medium",
    }
  }

  // Bed bug detection
  if (location === "bedroom" && size === "tiny" && color === "red") {
    return {
      pest: "Bed Bug",
      service: "Bed Bug Control",
      description:
        "Your description matches bed bugs. These pests are difficult to eliminate without professional help. We recommend immediate inspection and treatment.",
      urgency: "high",
    }
  }

  // Cockroach detection
  if (
    (location === "kitchen" || location === "bathroom") &&
    (size === "medium" || size === "large") &&
    color === "dark"
  ) {
    return {
      pest: "Cockroach",
      service: "Cockroach Control",
      description:
        "You likely have cockroaches. These pests carry bacteria and multiply quickly. We offer 100% satisfaction guarantee on cockroach elimination.",
      urgency: "high",
    }
  }

  // Ant detection
  if (legs === "6" && size === "tiny" && location === "kitchen") {
    return {
      pest: "Ant",
      service: "Ant Control",
      description:
        "Your description matches ants, which are common in Southern Utah year-round. We can identify the species and create a customized treatment plan.",
      urgency: "medium",
    }
  }

  // Rodent detection
  if (legs === "0" || size === "large") {
    return {
      pest: "Rodent",
      service: "Rodent Control",
      description:
        "Based on your answers, you may have rodents. These pests can carry diseases and cause property damage. We offer trapping, exclusion, and baiting services.",
      urgency: "high",
    }
  }

  // Earwig detection
  if (legs === "many" || (location === "bathroom" && size === "small")) {
    return {
      pest: "Earwig",
      service: "Earwig Control",
      description:
        "Your description may indicate earwigs, which are common in moist areas. Our 25+ years of experience helps us eliminate them effectively.",
      urgency: "low",
    }
  }

  // Default
  return {
    pest: "Unknown Pest",
    service: "General Pest Control",
    description:
      "Based on your answers, we recommend a professional inspection to accurately identify the pest and create a customized treatment plan.",
    urgency: "medium",
  }
}

interface PestQuizModalProps {
  isOpen: boolean
  onClose: () => void
}

export function PestQuizModal({ isOpen, onClose }: PestQuizModalProps) {
  const [currentStep, setCurrentStep] = React.useState(0)
  const [answers, setAnswers] = React.useState<Record<number, string>>({})
  const [showResult, setShowResult] = React.useState(false)

  const handleAnswer = (value: string) => {
    setAnswers((prev) => ({ ...prev, [currentStep]: value }))
  }

  const handleNext = () => {
    if (currentStep < QUIZ_STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1)
    } else {
      setShowResult(true)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const handleReset = () => {
    setCurrentStep(0)
    setAnswers({})
    setShowResult(false)
  }

  const handleClose = () => {
    handleReset()
    onClose()
  }

  const result = showResult ? getResult(answers) : null

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose} />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-brand-green px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
              <Bug className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Pest Identifier</h3>
              <p className="text-sm text-white/80">Answer a few questions to identify your pest</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Progress */}
        {!showResult && (
          <div className="px-6 py-3 bg-brand-green/5 border-b border-brand-green/10">
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
              <span>
                Question {currentStep + 1} of {QUIZ_STEPS.length}
              </span>
              <span>{Math.round(((currentStep + 1) / QUIZ_STEPS.length) * 100)}% complete</span>
            </div>
            <div className="h-2 bg-brand-green/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-brand-green rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / QUIZ_STEPS.length) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          {!showResult ? (
            <>
              <h4 className="text-xl font-bold text-foreground mb-6">{QUIZ_STEPS[currentStep].question}</h4>
              <div className="space-y-3">
                {QUIZ_STEPS[currentStep].options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleAnswer(option.value)}
                    className={cn(
                      "w-full text-left px-4 py-3 rounded-xl border-2 transition-all",
                      answers[currentStep] === option.value
                        ? "border-brand-green bg-brand-green/5 text-brand-green"
                        : "border-gray-200 hover:border-brand-green/50 text-foreground",
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </>
          ) : (
            result && (
              <div className="text-center">
                <div
                  className={cn(
                    "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-4",
                    result.urgency === "high" && "bg-red-100 text-red-700",
                    result.urgency === "medium" && "bg-amber-100 text-amber-700",
                    result.urgency === "low" && "bg-brand-green/10 text-brand-green",
                  )}
                >
                  {result.urgency === "high" && "Urgent - Immediate Action Recommended"}
                  {result.urgency === "medium" && "Moderate - Schedule Service Soon"}
                  {result.urgency === "low" && "Low Priority - Preventive Service"}
                </div>
                <h4 className="text-2xl font-bold text-foreground mb-2">You likely have: {result.pest}</h4>
                <p className="text-muted-foreground mb-6">{result.description}</p>
                <div className="bg-brand-green/5 rounded-xl p-4 mb-6">
                  <p className="text-sm text-muted-foreground mb-1">Recommended Service</p>
                  <p className="text-lg font-bold text-brand-green">{result.service}</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/contact"
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-brand-orange text-white font-semibold px-6 py-3 rounded-xl hover:bg-brand-orange/90 transition-colors"
                    onClick={handleClose}
                  >
                    <Phone className="h-4 w-4" />
                    Get $39.95 First Service
                  </Link>
                  <button
                    onClick={handleReset}
                    className="flex-1 inline-flex items-center justify-center gap-2 border-2 border-brand-green text-brand-green font-semibold px-6 py-3 rounded-xl hover:bg-brand-green/5 transition-colors"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Retake Quiz
                  </button>
                </div>
              </div>
            )
          )}
        </div>

        {/* Footer */}
        {!showResult && (
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
            <button
              onClick={handleBack}
              disabled={currentStep === 0}
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground disabled:opacity-50 disabled:pointer-events-none transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </button>
            <button
              onClick={handleNext}
              disabled={!answers[currentStep]}
              className="inline-flex items-center gap-2 bg-brand-green text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-brand-green/90 disabled:opacity-50 disabled:pointer-events-none transition-colors"
            >
              {currentStep === QUIZ_STEPS.length - 1 ? "See Results" : "Next"}
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

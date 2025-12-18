"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { CheckCircle2, Zap, DollarSign, Phone, Loader2 } from "lucide-react"

const services = [
  "Ant Control",
  "Cockroach Control",
  "Mosquito Control",
  "Spider Control",
  "Scorpion & Stinging Insects",
  "Termite Control",
  "Rodent Control",
  "Earwig Control",
  "Bed Bug Control",
  "Commercial Pest Control",
]

const serviceAreas = [
  { value: "washington", label: "Washington County, UT (St. George, Hurricane)" },
  { value: "iron", label: "Iron County, UT (Cedar City)" },
  { value: "clark", label: "Clark County, NV (Mesquite)" },
]

interface FormData {
  firstName: string
  lastName: string
  phone: string
  email: string
  service: string
  area: string
  urgency: string
  message: string
  wantsOffer: boolean
  agreesToTerms: boolean
}

interface FieldValidation {
  firstName: boolean
  lastName: boolean
  phone: boolean
  email: boolean
  service: boolean
  area: boolean
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    service: "",
    area: "",
    urgency: "",
    message: "",
    wantsOffer: true,
    agreesToTerms: false,
  })

  const [validation, setValidation] = useState<FieldValidation>({
    firstName: false,
    lastName: false,
    phone: false,
    email: false,
    service: false,
    area: false,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const validateField = (field: keyof FieldValidation, value: string) => {
    let isValid = false
    switch (field) {
      case "firstName":
      case "lastName":
        isValid = value.trim().length >= 2
        break
      case "phone":
        isValid = /^[\d\s\-$$$$]{10,}$/.test(value.replace(/\s/g, ""))
        break
      case "email":
        isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        break
      case "service":
      case "area":
        isValid = value.length > 0
        break
    }
    setValidation((prev) => ({ ...prev, [field]: isValid }))
  }

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (typeof value === "string" && field in validation) {
      validateField(field as keyof FieldValidation, value)
    }
  }

  const calculateSavings = () => {
    const servicePrices: Record<string, number> = {
      "Ant Control": 79,
      "Cockroach Control": 89,
      "Mosquito Control": 99,
      "Spider Control": 79,
      "Scorpion & Stinging Insects": 99,
      "Termite Control": 149,
      "Rodent Control": 129,
      "Earwig Control": 69,
      "Bed Bug Control": 199,
      "Commercial Pest Control": 149,
    }
    const regularPrice = servicePrices[formData.service] || 89
    return regularPrice - 39.95
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to submit form")
      }

      setIsSubmitting(false)
      setIsSubmitted(true)
    } catch (error) {
      setIsSubmitting(false)
      alert(error instanceof Error ? error.message : "Failed to submit form. Please call (435) 256-6391.")
    }
  }

  if (isSubmitted) {
    return (
      <div className="bg-primary/5 border border-primary/20 rounded-xl p-8 text-center">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-2">Request Received!</h3>
        <p className="text-muted-foreground mb-4">
          {formData.urgency === "urgent"
            ? "Our team will call you within 15 minutes."
            : "We'll contact you within 24 hours to schedule your service."}
        </p>
        {formData.wantsOffer && (
          <p className="text-sm text-primary font-medium">Your $39.95 first service offer has been applied!</p>
        )}
        <Button
          className="mt-6 bg-accent hover:bg-accent/90 text-accent-foreground"
          onClick={() => setIsSubmitted(false)}
        >
          Submit Another Request
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name Fields */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName" className="text-foreground font-medium">
            First Name
          </Label>
          <div className="relative">
            <Input
              id="firstName"
              value={formData.firstName}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
              className="bg-background border-border pr-10"
              placeholder="John"
              required
            />
            {validation.firstName && (
              <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
            )}
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName" className="text-foreground font-medium">
            Last Name
          </Label>
          <div className="relative">
            <Input
              id="lastName"
              value={formData.lastName}
              onChange={(e) => handleInputChange("lastName", e.target.value)}
              className="bg-background border-border pr-10"
              placeholder="Doe"
              required
            />
            {validation.lastName && (
              <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
            )}
          </div>
        </div>
      </div>

      {/* Phone */}
      <div className="space-y-2">
        <Label htmlFor="phone" className="text-foreground font-medium">
          Phone Number
        </Label>
        <div className="relative">
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            className="bg-background border-border pr-10"
            placeholder="(435) 555-0123"
            required
          />
          {validation.phone && (
            <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
          )}
        </div>
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email" className="text-foreground font-medium">
          Email Address
        </Label>
        <div className="relative">
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className="bg-background border-border pr-10"
            placeholder="john@example.com"
            required
          />
          {validation.email && (
            <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
          )}
        </div>
      </div>

      {/* Service Selection */}
      <div className="space-y-2">
        <Label className="text-foreground font-medium">Service Needed</Label>
        <Select value={formData.service} onValueChange={(value) => handleInputChange("service", value)}>
          <SelectTrigger className="bg-background border-border">
            <SelectValue placeholder="Select a service" />
          </SelectTrigger>
          <SelectContent>
            {services.map((service) => (
              <SelectItem key={service} value={service}>
                {service}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Service Area */}
      <div className="space-y-2">
        <Label className="text-foreground font-medium">Service Area</Label>
        <Select value={formData.area} onValueChange={(value) => handleInputChange("area", value)}>
          <SelectTrigger className="bg-background border-border">
            <SelectValue placeholder="Select your area" />
          </SelectTrigger>
          <SelectContent>
            {serviceAreas.map((area) => (
              <SelectItem key={area.value} value={area.value}>
                {area.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Urgency */}
      <div className="space-y-3">
        <Label className="text-foreground font-medium">When do you need service?</Label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { value: "urgent", label: "Same-day/Urgent" },
            { value: "week", label: "This week" },
            { value: "flexible", label: "Flexible" },
          ].map((option) => (
            <label
              key={option.value}
              className={`flex items-center justify-center p-3 rounded-lg border cursor-pointer transition-all ${
                formData.urgency === option.value
                  ? "border-primary bg-primary/5 text-primary"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <input
                type="radio"
                name="urgency"
                value={option.value}
                checked={formData.urgency === option.value}
                onChange={(e) => handleInputChange("urgency", e.target.value)}
                className="sr-only"
              />
              <span className="text-sm font-medium">{option.label}</span>
            </label>
          ))}
        </div>

        {/* Urgency Message */}
        {formData.urgency === "urgent" && (
          <div className="flex items-center gap-2 p-3 bg-accent/10 border border-accent/20 rounded-lg text-accent">
            <Zap className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm font-medium">Urgent request! We&apos;ll call you within 15 minutes.</span>
          </div>
        )}
      </div>

      {/* Message */}
      <div className="space-y-2">
        <Label htmlFor="message" className="text-foreground font-medium">
          Describe Your Pest Problem (Optional)
        </Label>
        <Textarea
          id="message"
          value={formData.message}
          onChange={(e) => handleInputChange("message", e.target.value)}
          className="bg-background border-border min-h-[100px]"
          placeholder="Tell us about the pests you've seen, where you've seen them, and how long the problem has been going on..."
        />
      </div>

      {/* Checkboxes */}
      <div className="space-y-4">
        <label className="flex items-start gap-3 cursor-pointer">
          <Checkbox
            checked={formData.wantsOffer}
            onCheckedChange={(checked) => handleInputChange("wantsOffer", checked as boolean)}
            className="mt-0.5"
          />
          <div>
            <span className="text-foreground font-medium">I want the $39.95 first service offer</span>
            <span className="text-sm text-muted-foreground block">(with signed service agreement)</span>
          </div>
        </label>

        {/* Savings Display */}
        {formData.wantsOffer && formData.service && (
          <div className="flex items-center gap-2 p-3 bg-primary/5 border border-primary/20 rounded-lg text-primary">
            <DollarSign className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm font-medium">
              You&apos;ll save ${calculateSavings().toFixed(2)} on your first visit!
            </span>
          </div>
        )}

        <label className="flex items-start gap-3 cursor-pointer">
          <Checkbox
            checked={formData.agreesToTerms}
            onCheckedChange={(checked) => handleInputChange("agreesToTerms", checked as boolean)}
            className="mt-0.5"
            required
          />
          <span className="text-sm text-muted-foreground">
            I agree to receive communications from Preventive Pest Control and accept the{" "}
            <a href="#" className="text-primary hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-primary hover:underline">
              Privacy Policy
            </a>
          </span>
        </label>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={!formData.agreesToTerms || isSubmitting}
        className="w-full bg-accent hover:bg-accent/90 text-accent-foreground h-12 text-lg font-semibold tracking-wide uppercase"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Submitting...
          </>
        ) : (
          "Schedule My Service"
        )}
      </Button>

      {/* Alternative Phone CTA */}
      <div className="text-center pt-4 border-t border-border">
        <p className="text-sm text-muted-foreground mb-2">Prefer to talk? Call us directly:</p>
        <a
          href="tel:4352566391"
          className="inline-flex items-center gap-2 text-primary font-bold text-xl hover:text-primary/80 transition-colors"
        >
          <Phone className="w-5 h-5" />
          (435) 256-6391
        </a>
      </div>
    </form>
  )
}

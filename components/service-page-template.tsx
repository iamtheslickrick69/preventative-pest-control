"use client"

import type React from "react"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Shield, Phone, CheckCircle2, AlertTriangle, MapPin, Clock, BadgeCheck } from "lucide-react"
import Link from "next/link"

interface ServicePageProps {
  title: string
  subtitle: string
  description: string
  heroImage: string
  pestImage?: string
  signs: string[]
  approach: string[]
  additionalSections?: React.ReactNode
  urgency?: "high" | "medium" | "low"
  specialNote?: string
  heroVideo?: string
  heroVideoFilter?: "green" | "gray" | "dark" | "none"
}

export function ServicePageTemplate({
  title,
  subtitle,
  description,
  heroImage,
  pestImage,
  signs,
  approach,
  additionalSections,
  urgency = "medium",
  specialNote,
  heroVideo,
  heroVideoFilter = "none",
}: ServicePageProps) {
  const urgencyColors = {
    high: "bg-red-500/10 text-red-600 border-red-500/20",
    medium: "bg-amber-500/10 text-amber-600 border-amber-500/20",
    low: "bg-primary/10 text-primary border-primary/20",
  }

  const urgencyLabels = {
    high: "Same-Day Service Recommended",
    medium: "Schedule Within 1 Week",
    low: "Regular Service Schedule",
  }

  const filterOverlays = {
    green: "bg-gradient-to-r from-primary/80 via-primary/60 to-primary/40",
    gray: "bg-gradient-to-r from-gray-100/70 via-gray-200/50 to-transparent",
    dark: "bg-gradient-to-r from-gray-900/80 via-gray-900/60 to-gray-900/40",
    none: "bg-gradient-to-r from-background via-background/70 to-transparent",
  }

  const textColors = {
    green: {
      heading: "text-primary-foreground",
      subheading: "text-primary-foreground/90",
      body: "text-primary-foreground/80",
      badge: urgencyColors[urgency],
    },
    gray: {
      heading: "text-gray-900",
      subheading: "text-gray-800",
      body: "text-gray-700",
      badge: "bg-gray-800/10 text-gray-800 border-gray-800/20",
    },
    dark: {
      heading: "text-white",
      subheading: "text-white/90",
      body: "text-white/80",
      badge: "bg-white/10 text-white border-white/20",
    },
    none: {
      heading: "text-foreground",
      subheading: "text-foreground/90",
      body: "text-muted-foreground",
      badge: urgencyColors[urgency],
    },
  }

  const colors = textColors[heroVideoFilter]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        <div className="absolute inset-0">
          {heroVideo ? (
            <>
              <video
                autoPlay
                loop
                muted
                playsInline
                poster={heroImage}
                className="absolute inset-0 h-full w-full object-cover"
              >
                <source src={heroVideo} type="video/mp4" />
              </video>
              <div className={`absolute inset-0 ${filterOverlays[heroVideoFilter]}`} />
            </>
          ) : (
            <>
              <Image src={heroImage || "/placeholder.svg"} alt={title} fill className="object-cover !rounded-none" />
              <div className={`absolute inset-0 ${filterOverlays.none}`} />
            </>
          )}
        </div>
        <div className="relative max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="max-w-2xl">
              <div
                className={`inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full mb-6 border ${colors.badge}`}
              >
                <Clock className="h-4 w-4" />
                {urgencyLabels[urgency]}
              </div>
              <h1 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${colors.heading}`}>{title}</h1>
              <p className={`text-lg md:text-xl mb-4 ${colors.subheading}`}>{subtitle}</p>
              <p className={`text-lg mb-8 ${colors.body}`}>{description}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="btn-press inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground font-bold px-8 py-4 rounded-2xl shadow-lg shadow-accent/20 hover:bg-red-700 hover:shadow-xl hover:shadow-red-700/30 hover:-translate-y-0.5 transition-all"
                >
                  <BadgeCheck className="h-5 w-5" />
                  Get $39.95 First Service
                </Link>
                <a
                  href="tel:4352566391"
                  className="btn-press inline-flex items-center justify-center gap-2 font-bold px-8 py-4 rounded-2xl transition-colors bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <Phone className="h-5 w-5" />
                  (435) 256-6391
                </a>
              </div>
            </div>
            {pestImage && (
              <div className="hidden md:flex items-center justify-center">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full blur-3xl scale-150 bg-primary/20" />
                  <Image
                    src={pestImage || "/placeholder.svg"}
                    alt={title}
                    width={200}
                    height={200}
                    className="relative h-48 w-48 object-contain drop-shadow-2xl rounded-2xl"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Trust Bar - Updated with semantic colors */}
      <section className="py-6 px-4 bg-card border-b border-border">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-bold text-foreground text-sm">100% Satisfaction</p>
                <p className="text-xs text-muted-foreground">Guarantee</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-bold text-foreground text-sm">Free Re-Service</p>
                <p className="text-xs text-muted-foreground">Between Visits</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <BadgeCheck className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-bold text-foreground text-sm">25+ Years</p>
                <p className="text-xs text-muted-foreground">Experience</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-bold text-foreground text-sm">3 Counties</p>
                <p className="text-xs text-muted-foreground">Served</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Signs of Infestation */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <div className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-600 text-sm font-medium px-4 py-2 rounded-full mb-4">
                <AlertTriangle className="h-4 w-4" />
                Warning Signs
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Signs of Infestation</h2>
              <p className="text-muted-foreground mb-6">
                If you notice any of these signs, contact us immediately for a professional inspection.
              </p>
              <ul className="space-y-4">
                {signs.map((sign, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-amber-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <AlertTriangle className="h-3.5 w-3.5 text-amber-600" />
                    </div>
                    <span className="text-foreground">{sign}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-medium px-4 py-2 rounded-full mb-4">
                <Shield className="h-4 w-4" />
                Our Process
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Our Treatment Approach</h2>
              <p className="text-muted-foreground mb-6">
                Our proven approach eliminates infestations and prevents future problems.
              </p>
              <ol className="space-y-4">
                {approach.map((step, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-primary-foreground text-xs font-bold">{index + 1}</span>
                    </div>
                    <span className="text-foreground">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Special Note */}
      {specialNote && (
        <section className="py-8 px-4 bg-primary/5">
          <div className="max-w-4xl mx-auto">
            <div className="bg-card rounded-2xl p-6 border border-primary/20 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-2">Important Note</h3>
                  <p className="text-muted-foreground">{specialNote}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Additional Sections */}
      {additionalSections}

      {/* Service Areas */}
      <section className="py-16 px-4 bg-card">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-foreground mb-4">Service Areas</h2>
            <p className="text-muted-foreground">
              We provide {title.toLowerCase()} services throughout Southern Utah and Southeast Nevada.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/service-areas/washington-county" className="card-interactive group p-6">
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">
                      Washington County
                    </h3>
                    <p className="text-sm text-muted-foreground">Utah</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  St. George, Hurricane, Ivins, Santa Clara, Washington, LaVerkin
                </p>
              </div>
            </Link>
            <Link href="/service-areas/iron-county" className="card-interactive group p-6">
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">
                      Iron County
                    </h3>
                    <p className="text-sm text-muted-foreground">Utah</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">Cedar City, Enoch, Parowan, Brian Head</p>
              </div>
            </Link>
            <Link href="/service-areas/clark-county" className="card-interactive group p-6">
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">
                      Clark County
                    </h3>
                    <p className="text-sm text-muted-foreground">Nevada</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">Mesquite, Bunkerville, Moapa Valley</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/stgeorge-hero.jpg"
            alt="Southern Utah landscape"
            fill
            className="object-cover !rounded-none"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/85 via-primary/75 to-primary/65" />
        </div>
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 h-32 w-32 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-10 right-10 h-40 w-40 rounded-full bg-white blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
            Ready to Eliminate Your {title.replace(" Control", "")} Problem?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8">
            Get your first service for just $39.95 with a signed agreement. 100% satisfaction guaranteed.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="btn-press inline-flex items-center gap-2 bg-accent text-accent-foreground font-bold px-8 py-4 rounded-2xl shadow-lg shadow-accent/20 hover:bg-red-700 hover:shadow-xl hover:shadow-red-700/30 hover:-translate-y-0.5 transition-all"
            >
              Schedule Service
            </Link>
            <a
              href="tel:4352566391"
              className="btn-press inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm border-2 border-primary-foreground/30 text-primary-foreground font-bold px-8 py-4 rounded-2xl hover:bg-primary-foreground/20 transition-colors"
            >
              <Phone className="h-5 w-5" />
              Call (435) 256-6391
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

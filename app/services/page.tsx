"use client"

import * as React from "react"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServiceGrid } from "@/components/service-grid"
import { ServiceAccordion } from "@/components/service-accordion"
import { PestQuizModal } from "@/components/pest-quiz-modal"
import { Search, Shield, Clock, BadgeCheck, ArrowRight, Phone } from "lucide-react"
import Link from "next/link"
import { PEST_IMAGES } from "@/lib/pest-images"
import { AnimatedSection } from "@/components/ui/animated-section"

export default function ServicesPage() {
  const [quizOpen, setQuizOpen] = React.useState(false)

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-16 px-4 bg-gradient-to-b from-primary/5 to-background">
        <div className="max-w-6xl mx-auto text-center">
          <AnimatedSection animation="fade-up">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-medium px-4 py-2 rounded-full mb-6">
              <Shield className="h-4 w-4" />
              10 Professional Pest Control Services
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={100}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Complete Pest Control Solutions
            </h1>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={200}>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              From ants to termites, scorpions to bed bugs - we eliminate every pest in Southern Utah with pet-friendly
              treatments and a 100% satisfaction guarantee.
            </p>
          </AnimatedSection>

          {/* Pest Icons Row */}
          <AnimatedSection animation="fade-up" delay={300}>
            <div className="flex justify-center items-center gap-4 mb-8 flex-wrap">
              {[
                { src: PEST_IMAGES.ant, alt: "Ant" },
                { src: PEST_IMAGES.cockroach, alt: "Cockroach" },
                { src: PEST_IMAGES.spider, alt: "Spider" },
                { src: PEST_IMAGES.scorpion, alt: "Scorpion" },
                { src: PEST_IMAGES.termite, alt: "Termite" },
                { src: PEST_IMAGES.rat, alt: "Rodent" },
                { src: PEST_IMAGES.mosquito, alt: "Mosquito" },
              ].map((pest, i) => (
                <div key={pest.alt} className="group cursor-pointer" style={{ animationDelay: `${i * 50}ms` }}>
                  <Image
                    src={pest.src || "/placeholder.svg"}
                    alt={pest.alt}
                    width={48}
                    height={48}
                    className="h-12 w-12 object-contain opacity-60 group-hover:opacity-100 group-hover:scale-125 transition-all duration-300"
                  />
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* Quiz CTA */}
          <AnimatedSection animation="fade-up" delay={400}>
            <button
              onClick={() => setQuizOpen(true)}
              className="btn-press inline-flex items-center gap-3 bg-accent text-accent-foreground font-bold px-8 py-4 rounded-xl hover:opacity-90 transition-all shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/30"
            >
              <Search className="h-5 w-5" />
              Not Sure What Pest You Have? Take Our 2-Minute Quiz
            </button>
          </AnimatedSection>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-6 px-4 bg-card border-y border-primary/10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 stagger-fade-in">
            {[
              { icon: BadgeCheck, value: "$39.95", label: "First Service" },
              { icon: Shield, value: "100%", label: "Satisfaction Guarantee" },
              { icon: Clock, value: "Same-Day", label: "Service Available" },
              { icon: BadgeCheck, value: "Free", label: "Re-Service Guarantee" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-bold text-foreground">{item.value}</p>
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-10">
            <h2 className="text-3xl font-bold text-foreground mb-4">Compare Our Services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Filter by pest type, urgency level, or service area to find the right solution for your needs.
            </p>
          </AnimatedSection>
          <ServiceGrid />
        </div>
      </section>

      {/* Service Details Accordion */}
      <section className="py-16 px-4 bg-card border-y border-primary/10">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection className="text-center mb-10">
            <h2 className="text-3xl font-bold text-foreground mb-4">Service Details</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Click on any service below to learn more about our approach, signs of infestation, and treatment methods.
            </p>
          </AnimatedSection>
          <ServiceAccordion />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-accent relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 h-32 w-32 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-10 right-10 h-40 w-40 rounded-full bg-white blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold text-accent-foreground mb-4">
              Ready to Eliminate Your Pest Problem?
            </h2>
            <p className="text-xl text-accent-foreground/90 mb-8">
              Get your first service for just $39.95 with a signed agreement.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="btn-press inline-flex items-center gap-2 bg-background text-foreground font-bold px-8 py-4 rounded-xl hover:bg-background/90 transition-colors"
              >
                Schedule Service
                <ArrowRight className="h-5 w-5" />
              </Link>
              <a
                href="tel:4352566391"
                className="btn-press inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold px-8 py-4 rounded-xl hover:opacity-90 transition-colors"
              >
                <Phone className="h-5 w-5" />
                Call (435) 256-6391
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
      <PestQuizModal isOpen={quizOpen} onClose={() => setQuizOpen(false)} />
    </div>
  )
}

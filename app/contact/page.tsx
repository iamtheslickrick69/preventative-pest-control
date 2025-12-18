import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ContactForm } from "@/components/contact-form"
import { ContactInfoCard } from "@/components/contact-info-card"
import { Phone, Shield, Clock, DollarSign } from "lucide-react"

export const metadata = {
  title: "Contact Us | Preventive Pest Control",
  description:
    "Schedule your $39.95 first pest control service. Call (435) 256-6391 or fill out our contact form. Serving St. George, Cedar City, and Mesquite.",
}

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-primary text-primary-foreground py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-primary-foreground/10 border border-primary-foreground/20 rounded-full px-4 py-1.5 mb-6">
                <DollarSign className="w-4 h-4" />
                <span className="text-sm font-medium">Limited Time Offer</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
                Schedule Your $39.95 First Service Today
              </h1>
              <p className="text-xl text-primary-foreground/80 mb-8">
                Fast response times. No long-term contracts. 100% satisfaction guaranteed.
              </p>

              {/* Quick Stats */}
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-accent" />
                  <span className="text-sm">100% Satisfaction Guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-accent" />
                  <span className="text-sm">Same-Day Service Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-accent" />
                  <span className="text-sm">Call or Text Anytime</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
              {/* Form Column */}
              <div className="lg:col-span-3">
                <div className="bg-card border border-border rounded-xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-foreground mb-2">Request Your Service</h2>
                  <p className="text-muted-foreground mb-6">
                    Fill out the form below and we&apos;ll get back to you within 24 hours. For urgent pest problems,
                    call us directly.
                  </p>
                  <ContactForm />
                </div>
              </div>

              {/* Info Column */}
              <div className="lg:col-span-2">
                <ContactInfoCard />
              </div>
            </div>
          </div>
        </section>

        {/* Guarantees Section */}
        <section className="py-12 bg-muted">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-foreground text-center mb-8">Our Guarantees</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {/* 100% Satisfaction */}
              <div className="bg-card border border-border rounded-xl p-6 text-center">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-bold text-foreground text-lg mb-2">100% Satisfaction Guarantee</h3>
                <p className="text-sm text-muted-foreground">
                  Not satisfied? We&apos;ll re-treat at no additional cost or provide a full refund. Your peace of mind
                  is our priority.
                </p>
              </div>

              {/* Free Re-Service */}
              <div className="bg-card border border-border rounded-xl p-6 text-center">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                </div>
                <h3 className="font-bold text-foreground text-lg mb-2">Free Re-Service Guarantee</h3>
                <p className="text-sm text-muted-foreground">
                  Pests return between scheduled visits? We&apos;ll come back at no extra charge. That&apos;s our
                  promise to you.
                </p>
              </div>

              {/* Price Lock */}
              <div className="bg-card border border-border rounded-xl p-6 text-center">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-bold text-foreground text-lg mb-2">2-Year Price Lock Guarantee</h3>
                <p className="text-sm text-muted-foreground">
                  Your service rate is locked in for 2 years. No surprise price increases. Budget with confidence.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Service Areas Reminder */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Proudly Serving Southern Utah & Nevada</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              From St. George to Cedar City to Mesquite, our team is ready to protect your home or business from pests.
              Same-day service available in most areas.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-primary/5 border border-primary/20 rounded-lg px-4 py-2">
                <span className="font-medium text-primary">Washington County, UT</span>
                <span className="text-muted-foreground text-sm ml-2">St. George, Hurricane</span>
              </div>
              <div className="bg-primary/5 border border-primary/20 rounded-lg px-4 py-2">
                <span className="font-medium text-primary">Iron County, UT</span>
                <span className="text-muted-foreground text-sm ml-2">Cedar City</span>
              </div>
              <div className="bg-primary/5 border border-primary/20 rounded-lg px-4 py-2">
                <span className="font-medium text-primary">Clark County, NV</span>
                <span className="text-muted-foreground text-sm ml-2">Mesquite</span>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-accent text-accent-foreground py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Live Pest-Free?</h2>
            <p className="text-xl text-accent-foreground/80 mb-6">
              Don&apos;t let pests take over. Call now and get your first service for just $39.95.
            </p>
            <a
              href="tel:4352566391"
              className="inline-flex items-center gap-3 bg-white text-accent px-8 py-4 rounded-lg font-bold text-xl hover:bg-white/90 transition-colors shadow-lg"
            >
              <Phone className="w-6 h-6" />
              (435) 256-6391
            </a>
            <p className="text-sm text-accent-foreground/70 mt-4">Available Mon-Sat | Emergency services 24/7</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

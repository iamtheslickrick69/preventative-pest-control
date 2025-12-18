import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Phone, MapPin, CheckCircle2, Bug, Shield, Home, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Iron County Pest Control | Cedar City UT | Preventive Pest Control",
  description:
    "Iron County's determined pest control technicians. Serving Cedar City, Parowan, Enoch, and Brian Head for 25+ years.",
}

const cities = ["Cedar City", "Parowan", "Enoch", "Brian Head", "Kanarraville"]

const pests = ["Rodents", "Scorpions", "Spiders", "Cockroaches", "Ants", "Termites"]

export default function IronCountyPage() {
  return (
    <main className="min-h-screen bg-cream-bg">
      {/* Hero */}
      <section className="relative bg-brand-green text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm mb-6">
              <MapPin className="w-4 h-4" />
              Iron County, Utah
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Iron County's Determined Pest Control Technicians</h1>
            <p className="text-xl text-white/80 mb-8">
              Preventive Pest Control specializes in comprehensive pest control solutions for Iron County residents.
              With over 25 years of experience, we use leading techniques and highly effective technology to deliver
              results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact">
                <Button size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">
                  Get $39.95 First Service
                </Button>
              </Link>
              <a href="tel:4352566391">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-brand-green bg-transparent"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  (435) 256-6391
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Cities Served */}
      <section className="py-12 bg-white border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <span className="text-sm font-semibold text-foreground">Cities We Serve:</span>
            {cities.map((city) => (
              <span key={city} className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
                {city}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Promise Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-muted relative">
                <Image
                  src="/cedar-city-utah-mountains-landscape.jpg"
                  alt="Cedar City, Utah landscape"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-brand-green text-white p-6 rounded-xl shadow-lg">
                <p className="text-3xl font-bold">100%</p>
                <p className="text-sm">Satisfaction Guaranteed</p>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Our Promise to Iron County</h2>
              <p className="text-muted-foreground mb-6">
                We provide residential and commercial extermination services to safeguard your property from rodents,
                scorpions, spiders, cockroaches, ants, termites, and more. We've helped countless individuals experience
                a pest-free environment.
              </p>
              <p className="text-muted-foreground mb-8">
                Our team isn't afraid of anything - whether it's scary scorpions or disease-infested rodents. We deliver
                quick, lasting results for Iron County property owners with professional, customized pest control
                solutions.
              </p>
              <div className="space-y-4">
                {[
                  "Prevent property damage",
                  "Protect your food from contamination",
                  "Customized plans for every client",
                  "Quick, lasting results",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-brand-green flex-shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pests We Handle */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Common Iron County Pests We Eliminate
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our determined technicians handle every type of pest found in the Cedar City area.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {pests.map((pest) => (
              <div
                key={pest}
                className="bg-cream-bg border border-border rounded-xl p-6 text-center hover:border-brand-green/30 hover:shadow-md transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-brand-green/10 flex items-center justify-center mx-auto mb-3">
                  <Bug className="w-6 h-6 text-brand-green" />
                </div>
                <p className="font-medium text-foreground text-sm">{pest}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Why Iron County Chooses Preventive</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "Advanced Technology",
                description: "We use the latest pest control technology and leading techniques for effective results.",
              },
              {
                icon: Shield,
                title: "Eco-Friendly Options",
                description:
                  "Safe treatments for your family, pets, and the environment without compromising effectiveness.",
              },
              {
                icon: Home,
                title: "Customized Plans",
                description:
                  "Every property is different. We create personalized solutions for your specific pest problems.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-white border border-border rounded-xl p-8 text-center">
                <div className="w-14 h-14 rounded-full bg-brand-orange/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-7 h-7 text-brand-orange" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-orange py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Iron County's Trusted Pest Experts</h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Get your first service for just $39.95 with a signed agreement. Our determined technicians are ready to
            protect your property.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-white text-brand-orange hover:bg-white/90">
                Schedule Service
              </Button>
            </Link>
            <a href="tel:4352566391">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-brand-orange bg-transparent"
              >
                <Phone className="w-4 h-4 mr-2" />
                Call (435) 256-6391
              </Button>
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}

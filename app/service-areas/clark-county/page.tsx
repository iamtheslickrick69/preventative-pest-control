import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import {
  Phone,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Bug,
  Shield,
  Leaf,
  DollarSign,
  HeartHandshake,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Clark County Pest Control | Mesquite NV | Preventive Pest Control",
  description:
    "Clark County's expert pest control team. Serving Mesquite, Bunkerville, and Southern Nevada for 25+ years with eco-friendly solutions.",
}

const cities = ["Mesquite", "Bunkerville"]

const reasons = [
  { icon: Sparkles, title: "Advanced Technology", description: "State-of-the-art pest control methods" },
  { icon: Leaf, title: "Eco-Friendly Techniques", description: "Safe for family, pets, and environment" },
  { icon: DollarSign, title: "Affordable Options", description: "Competitive pricing with no hidden fees" },
  { icon: HeartHandshake, title: "Excellent Customer Service", description: "Friendly, professional technicians" },
  { icon: Shield, title: "Meticulous Attention", description: "Thorough inspections and treatments" },
  { icon: CheckCircle2, title: "Customized Plans", description: "Tailored solutions for every property" },
]

const pests = ["Scorpions", "Cockroaches", "Spiders", "Rodents", "Termites", "Ants"]

export default function ClarkCountyPage() {
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
              Clark County, Nevada
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Clark County's Expert Pest Control Team</h1>
            <p className="text-xl text-white/80 mb-8">
              For over 25 years, Preventive Pest Control has provided Clark County residents with lasting pest control
              solutions. Our centrally located St. George office is fully equipped to serve Southern Nevada residents.
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
            <span className="text-sm font-semibold text-foreground">Nevada Cities We Serve:</span>
            {cities.map((city) => (
              <span key={city} className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
                {city}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Mesquite Locals Choose Preventive
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Clark County residents choose our services for these key reasons:
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {reasons.map((reason) => (
              <div
                key={reason.title}
                className="bg-white border border-border rounded-xl p-6 hover:border-brand-green/30 hover:shadow-md transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-brand-green/10 flex items-center justify-center mb-4">
                  <reason.icon className="w-6 h-6 text-brand-green" />
                </div>
                <h3 className="font-bold text-foreground mb-2">{reason.title}</h3>
                <p className="text-sm text-muted-foreground">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pests Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Protecting Your Nevada Property From
              </h2>
              <p className="text-muted-foreground mb-8">
                The desert climate in Clark County creates ideal conditions for various pests. Our expert team is
                equipped to handle every type of infestation common to Southern Nevada.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {pests.map((pest) => (
                  <div key={pest} className="flex items-center gap-3 bg-cream-bg rounded-lg p-4">
                    <Bug className="w-5 h-5 text-brand-orange" />
                    <span className="font-medium text-foreground">{pest}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Link href="/services">
                  <Button className="bg-brand-green hover:bg-brand-green/90 text-white">
                    View All Services
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-muted relative">
                <Image
                  src="/mesquite-nevada-desert-landscape-sunset.jpg"
                  alt="Mesquite, Nevada landscape"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-brand-orange text-white p-6 rounded-xl shadow-lg">
                <p className="text-3xl font-bold">25+</p>
                <p className="text-sm">Years Serving Nevada</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guarantees */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="bg-brand-green rounded-2xl p-8 md:p-12 text-white">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Guarantees to Clark County</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "100% Satisfaction",
                  description: "Not happy? Get a full refund or credit. No questions asked.",
                },
                {
                  title: "Free Re-Service",
                  description: "Pests return between visits? We come back at no extra charge.",
                },
                {
                  title: "2-Year Price Lock",
                  description: "Your rate stays the same for 2 full years. Guaranteed.",
                },
              ].map((item) => (
                <div key={item.title} className="text-center">
                  <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-white/80">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-orange py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Protect Your Nevada Home?</h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Get your first service for just $39.95 with a signed agreement. Our expert team is ready to serve Mesquite
            and the surrounding areas.
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

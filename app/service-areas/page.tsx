import type { Metadata } from "next"
import Link from "next/link"
import { Phone, MapPin, CheckCircle2, Shield, Clock, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CountyMap } from "@/components/county-map"
import { CountyCard } from "@/components/county-card"

export const metadata: Metadata = {
  title: "Service Areas | Preventive Pest Control",
  description:
    "Preventive Pest Control serves Washington County UT, Iron County UT, and Clark County NV. Expert pest control from Cedar City to Mesquite.",
}

const counties = [
  {
    name: "Washington County",
    state: "Utah",
    cities: ["St. George", "Hurricane", "Washington", "Ivins", "Santa Clara", "LaVerkin"],
    description:
      "From St. George to Hurricane, our centrally located team provides fast, reliable pest control services to all Washington County communities.",
    href: "/service-areas/washington-county",
    pests: ["Scorpions", "Spiders", "Ants", "Rodents", "Termites"],
  },
  {
    name: "Iron County",
    state: "Utah",
    cities: ["Cedar City", "Parowan", "Enoch", "Brian Head"],
    description:
      "Our determined technicians bring 25+ years of experience to Iron County, tackling everything from scorpions to rodents.",
    href: "/service-areas/iron-county",
    pests: ["Rodents", "Spiders", "Cockroaches", "Ants", "Termites"],
  },
  {
    name: "Clark County",
    state: "Nevada",
    cities: ["Mesquite", "Bunkerville"],
    description:
      "Expert pest control for Southern Nevada residents with advanced technology, eco-friendly techniques, and customized plans.",
    href: "/service-areas/clark-county",
    pests: ["Scorpions", "Cockroaches", "Spiders", "Rodents", "Termites"],
  },
]

export default function ServiceAreasPage() {
  return (
    <main className="min-h-screen bg-cream-bg">
      {/* Hero Section */}
      <section className="bg-brand-green text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm mb-6">
              <MapPin className="w-4 h-4" />
              Southern Utah & Nevada Coverage
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Proudly Serving Southern Utah & Nevada</h1>
            <p className="text-xl text-white/80 mb-8">
              From Cedar City to Mesquite, and everywhere in between, Preventive Pest Control has the knowledge and
              resources needed to manage pest problems for both residential and commercial properties.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
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

      {/* Stats Bar */}
      <section className="bg-white border-b border-border py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-2xl md:text-3xl font-bold text-brand-green">3</p>
              <p className="text-sm text-muted-foreground">Counties Served</p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-bold text-brand-green">25+</p>
              <p className="text-sm text-muted-foreground">Years Experience</p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-bold text-brand-green">10+</p>
              <p className="text-sm text-muted-foreground">Cities Covered</p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-bold text-brand-green">24/7</p>
              <p className="text-sm text-muted-foreground">Emergency Service</p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Click Your County to Learn More</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our St. George headquarters is centrally positioned to quickly serve all communities across our
              three-county service area.
            </p>
          </div>
          <CountyMap />
        </div>
      </section>

      {/* County Cards */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {counties.map((county) => (
              <CountyCard key={county.name} {...county} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Why Southern Utah & Nevada Trust Us</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Shield,
                title: "Local Expertise",
                description: "25+ years understanding desert pests unique to our region",
              },
              {
                icon: Clock,
                title: "Fast Response",
                description: "Same-day service available for urgent pest emergencies",
              },
              {
                icon: CheckCircle2,
                title: "Guaranteed Results",
                description: "100% satisfaction guarantee with free re-service if needed",
              },
              {
                icon: Star,
                title: "Proven Track Record",
                description: "965 five-star Google reviews from satisfied customers",
              },
            ].map((item) => (
              <div key={item.title} className="bg-white border border-border rounded-xl p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-brand-green/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-brand-green" />
                </div>
                <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-brand-orange py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Protect Your Property?</h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            No matter which county you're in, our expert technicians are ready to help. Get your first service for just
            $39.95 with a signed agreement.
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

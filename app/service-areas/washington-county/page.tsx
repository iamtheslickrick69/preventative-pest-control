import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Phone, MapPin, CheckCircle2, ArrowRight, Bug, Shield, Home, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Washington County Pest Control | St. George, Hurricane UT | Preventive Pest Control",
  description:
    "Washington County's industry-leading pest control company. Serving St. George, Hurricane, and all Southern Utah communities for 25+ years.",
}

const cities = ["St. George", "Hurricane", "Washington", "Ivins", "Santa Clara", "LaVerkin", "Leeds", "Toquerville"]

const services = [
  { name: "Ant Control", icon: Bug },
  { name: "Spider Control", icon: Bug },
  { name: "Scorpion Control", icon: Bug },
  { name: "Rodent Control", icon: Bug },
  { name: "Termite Control", icon: Bug },
  { name: "Mosquito Control", icon: Bug },
]

export default function WashingtonCountyPage() {
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
              Washington County, Utah
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Washington County's Industry-Leading Pest Control Company
            </h1>
            <p className="text-xl text-white/80 mb-8">
              From St. George to Hurricane, Preventive Pest Control has the experience and resources to take charge of
              pest problems. Located in St. George, we're centrally positioned to serve all Southern Utah residents.
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

      {/* About Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                25+ Years Protecting Washington County Homes
              </h2>
              <p className="text-muted-foreground mb-6">
                Preventive Pest Control specializes in both commercial and residential extermination services across
                Washington County. With over 25 years serving Southern Utah, we understand the pests that commonly
                plague this region and deliver the highest-quality service every time.
              </p>
              <p className="text-muted-foreground mb-8">
                Our expert technicians eliminate ants, rodents, bed bugs, mosquitos, spiders, scorpions, termites, and
                more. Whether you're in downtown St. George or the outskirts of Hurricane, we've got you covered.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { icon: Home, text: "Residential Pest Control" },
                  { icon: Building2, text: "Commercial Services" },
                  { icon: Shield, text: "Preventive Treatments" },
                  { icon: CheckCircle2, text: "100% Satisfaction Guarantee" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand-green/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-brand-green" />
                    </div>
                    <span className="text-sm font-medium text-foreground">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-muted relative">
                <Image
                  src="/st-george-utah-red-rock-desert-landscape.jpg"
                  alt="St. George, Utah landscape"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-brand-orange text-white p-6 rounded-xl shadow-lg">
                <p className="text-3xl font-bold">25+</p>
                <p className="text-sm">Years in Washington County</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Washington County Services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We provide comprehensive pest control solutions for every type of infestation common to the desert
              Southwest.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Link
                key={service.name}
                href="/services"
                className="group bg-cream-bg border border-border rounded-xl p-6 hover:border-brand-green/30 hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-brand-green/10 flex items-center justify-center">
                      <service.icon className="w-6 h-6 text-brand-green" />
                    </div>
                    <h3 className="font-semibold text-foreground">{service.name}</h3>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-brand-green group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/services">
              <Button
                variant="outline"
                className="border-brand-green text-brand-green hover:bg-brand-green hover:text-white bg-transparent"
              >
                View All Services
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-orange py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Washington County's Trusted Pest Control Experts
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Get your first service for just $39.95 with a signed agreement. We guarantee your satisfaction or your money
            back.
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

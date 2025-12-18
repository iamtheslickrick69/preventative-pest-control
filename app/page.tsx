import { ArrowRight, Shield, RefreshCw, DollarSign, Star, Phone, CheckCircle, MapPin } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ReviewCarousel } from "@/components/review-carousel"
import { PEST_IMAGES } from "@/lib/pest-images"
import { AnimatedSection } from "@/components/ui/animated-section"

const services = [
  {
    name: "Ant Control",
    description: "Eliminate carpenter, pavement, and fire ants with targeted treatments.",
    icon: PEST_IMAGES.ant,
    href: "/services/ant-control",
  },
  {
    name: "Cockroach Control",
    description: "Complete eradication of German, American, and Oriental cockroaches.",
    icon: PEST_IMAGES.cockroach,
    href: "/services/cockroach-control",
  },
  {
    name: "Mosquito Control",
    description: "WHO-approved In2Care system for season-long protection.",
    icon: PEST_IMAGES.mosquito,
    href: "/services/mosquito-control",
  },
  {
    name: "Spider Control",
    description: "Black widow and brown recluse removal for your family's safety.",
    icon: PEST_IMAGES.spider,
    href: "/services/spider-control",
  },
  {
    name: "Scorpion Control",
    description: "Bark scorpion specialists for desert properties.",
    icon: PEST_IMAGES.scorpion,
    href: "/services/scorpion-control",
  },
  {
    name: "Termite Control",
    description: "Protect your investment from subterranean and drywood termites.",
    icon: PEST_IMAGES.termite,
    href: "/services/termite-control",
  },
  {
    name: "Rodent Control",
    description: "Trapping, exclusion, and baiting for complete elimination.",
    icon: PEST_IMAGES.rat,
    href: "/services/rodent-control",
  },
  {
    name: "Bed Bug Control",
    description: "Discreet, thorough treatment to restore your peace of mind.",
    icon: null,
    href: "/services/bed-bug-control",
  },
]

const stats = [
  { value: "25+", label: "Years Experience" },
  { value: "965", label: "5-Star Reviews" },
  { value: "100%", label: "Satisfaction Guaranteed" },
  { value: "24/7", label: "Emergency Response" },
]

const trustSignals = [
  {
    icon: Shield,
    title: "100% Satisfaction Guarantee",
    description: "Full refund or credit if you're not completely satisfied",
  },
  {
    icon: RefreshCw,
    title: "Free Re-Service Guarantee",
    description: "We'll return between scheduled services at no extra cost",
  },
  {
    icon: DollarSign,
    title: "2-Year Price Lock",
    description: "No rate increases for 2 years when you sign up",
  },
  {
    icon: Star,
    title: "965 5-Star Reviews",
    description: "Trusted by thousands of Southern Utah families",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />

      <main className="flex-1">
        <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-32">
          {/* Video Background */}
          <div className="absolute inset-0">
            <video
              autoPlay
              loop
              muted
              playsInline
              poster="/images/stgeorge-hero.jpg"
              className="absolute inset-0 h-full w-full object-cover"
            >
              <source src="https://pub-7824dae2ffd24193b52760c54972be1d.r2.dev/000spidey.mp4" type="video/mp4" />
            </video>
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
          </div>

          {/* Logo Banner - Top Right Corner */}
          <div className="absolute top-6 right-6 z-20 hidden lg:block">
            <div className="rounded-xl bg-white px-8 py-2 shadow-2xl border border-gray-100">
              <Image
                src="/images/officialogoprevent.png"
                alt="Preventive Pest Control Logo"
                width={300}
                height={100}
                className="w-64 h-auto"
                priority
              />
            </div>
          </div>

          <div className="container relative mx-auto px-4 md:px-6">
            <div className="max-w-3xl space-y-6">
              {/* Badge */}
              <AnimatedSection animation="fade-up" delay={0}>
                <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-foreground backdrop-blur-sm">
                  <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse" />
                  Serving Southern Utah for 25+ Years
                </div>
              </AnimatedSection>

              {/* Headline */}
              <AnimatedSection animation="fade-up" delay={100}>
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-5xl">
                  <span className="text-foreground">St. George&apos;s Top</span>
                  <br />
                  <span className="text-primary">Pest Control</span>
                  <br />
                  <span className="text-foreground">Professionals</span>
                </h1>
              </AnimatedSection>

              {/* Subheadline */}
              <AnimatedSection animation="fade-up" delay={200}>
                <p className="text-lg text-muted-foreground md:text-xl max-w-2xl leading-relaxed">
                  Protecting your family&apos;s health from scorpions, spiders, rodents, and more. Experience a
                  pest-free, stress-free space with our preventive approach.
                </p>
              </AnimatedSection>

              {/* CTAs */}
              <AnimatedSection animation="fade-up" delay={300}>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Link
                    href="/contact"
                    className="btn-press inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-accent px-8 text-base font-semibold text-accent-foreground shadow-lg shadow-accent/20 transition-all hover:bg-red-700 hover:shadow-xl hover:shadow-red-700/30 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    Get $39.95 First Service
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                  <a
                    href="tel:4352566391"
                    className="btn-press inline-flex h-14 items-center justify-center gap-2 rounded-2xl border-2 border-primary bg-primary/5 px-8 text-base font-semibold text-primary transition-all hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <Phone className="h-5 w-5" />
                    Call (435) 256-6391
                  </a>
                </div>
              </AnimatedSection>

              {/* Quick Trust */}
              <AnimatedSection animation="fade-up" delay={400}>
                <div className="flex flex-wrap items-center gap-6 pt-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    Licensed & Insured
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    Locally Owned
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    Pet & Child Safe
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="border-y border-primary/10 bg-primary/5 py-10">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4 stagger-fade-in">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col items-center justify-center space-y-1 text-center">
                  <div className="text-3xl font-bold text-primary tracking-tight md:text-4xl">{stat.value}</div>
                  <div className="text-sm text-muted-foreground uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative py-20 md:py-28 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src="/images/stgeorge-hero.jpg"
              alt="Southern Utah red rock landscape"
              fill
              priority
              className="object-cover !rounded-none"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/65 via-background/60 to-background/65" />
          </div>

          <div className="container relative mx-auto px-4 md:px-6">
            <AnimatedSection className="mb-12 md:mb-16">
              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl mb-4">
                We Eliminate Every Pest
                <br />
                <span className="text-muted-foreground">in Southern Utah</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl">
                From common household pests to desert-specific threats, our expert technicians have the knowledge and
                tools to protect your property.
              </p>
            </AnimatedSection>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 stagger-fade-in">
              {services.map((service) => (
                <Link
                  key={service.name}
                  href={service.href}
                  className="card-interactive group p-6 bg-card/80 backdrop-blur-sm"
                >
                  <div className="relative z-10">
                    <div className="mb-4 h-16 w-16 flex items-center justify-center">
                      {service.icon ? (
                        <Image
                          src={service.icon || "/placeholder.svg"}
                          alt={service.name}
                          width={64}
                          height={64}
                          className="h-16 w-16 object-contain transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 rounded-xl"
                        />
                      ) : (
                        <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center">
                          <span className="text-xl font-bold text-primary">BB</span>
                        </div>
                      )}
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
                    <div className="mt-4 inline-flex items-center text-sm font-medium text-primary opacity-0 translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                      Learn More <ArrowRight className="ml-1 h-4 w-4" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <AnimatedSection className="mt-10 text-center" delay={400}>
              <Link
                href="/services"
                className="btn-press inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-primary px-8 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 hover:shadow-lg hover:shadow-primary/25"
              >
                View All Services
                <ArrowRight className="h-4 w-4" />
              </Link>
            </AnimatedSection>
          </div>
        </section>

        {/* Trust Signals */}
        <section className="py-20 md:py-28 bg-card border-y border-primary/10">
          <div className="container mx-auto px-4 md:px-6">
            <AnimatedSection className="mb-12 text-center">
              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl mb-4">
                Why Southern Utah Trusts Preventive
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We stand behind our work with industry-leading guarantees and a commitment to your complete
                satisfaction.
              </p>
            </AnimatedSection>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 stagger-fade-in">
              {trustSignals.map((signal) => (
                <div
                  key={signal.title}
                  className="hover-lift flex flex-col items-center text-center p-6 rounded-2xl bg-background border border-primary/10"
                >
                  <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform duration-300 hover:scale-110">
                    <signal.icon className="h-7 w-7" />
                  </div>
                  <h3 className="mb-2 font-semibold text-foreground">{signal.title}</h3>
                  <p className="text-sm text-muted-foreground">{signal.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4 md:px-6">
            <AnimatedSection className="mb-12 text-center">
              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl mb-4">
                What Our Customers Say
              </h2>
              <p className="text-lg text-muted-foreground">
                Join 965+ happy customers who trust Preventive Pest Control
              </p>
            </AnimatedSection>

            <ReviewCarousel />

            <AnimatedSection className="mt-10 text-center" delay={200}>
              <a
                href="https://www.google.com/search?q=preventive+pest+control+st+george+reviews"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
              >
                Read All 965 Reviews on Google
                <ArrowRight className="h-4 w-4" />
              </a>
            </AnimatedSection>
          </div>
        </section>

        {/* Service Areas Map Section */}
        <section className="py-20 md:py-28 bg-card border-y border-primary/10">
          <div className="container mx-auto px-4 md:px-6">
            <AnimatedSection className="mb-12 text-center">
              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl mb-4">
                Proudly Serving Southern Utah & Nevada
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                One of Nevada&apos;s largest privately-held pest control companies, with local expertise across three
                counties.
              </p>
            </AnimatedSection>

            <div className="grid gap-6 md:grid-cols-3 stagger-fade-in">
              <Link href="/service-areas/washington-county" className="card-interactive group p-6">
                <div className="relative z-10">
                  <div className="mb-4 h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                    Washington County, UT
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    St. George, Hurricane, Washington, Ivins, Santa Clara, La Verkin
                  </p>
                  <span className="inline-flex items-center text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    View Coverage <ArrowRight className="ml-1 h-4 w-4" />
                  </span>
                </div>
              </Link>

              <Link href="/service-areas/iron-county" className="card-interactive group p-6">
                <div className="relative z-10">
                  <div className="mb-4 h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                    Iron County, UT
                  </h3>
                  <p className="text-muted-foreground mb-4">Cedar City, Enoch, Parowan, Brian Head</p>
                  <span className="inline-flex items-center text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    View Coverage <ArrowRight className="ml-1 h-4 w-4" />
                  </span>
                </div>
              </Link>

              <Link href="/service-areas/clark-county" className="card-interactive group p-6">
                <div className="relative z-10">
                  <div className="mb-4 h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                    Clark County, NV
                  </h3>
                  <p className="text-muted-foreground mb-4">Mesquite, Bunkerville</p>
                  <span className="inline-flex items-center text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    View Coverage <ArrowRight className="ml-1 h-4 w-4" />
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="relative py-20 md:py-28 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src="/images/stgeorge-hero.jpg"
              alt="Southern Utah landscape"
              fill
              className="object-cover !rounded-none"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/85 via-primary/75 to-primary/65" />
          </div>

          {/* Decorative elements */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-10 left-10 h-32 w-32 rounded-full bg-white blur-3xl" />
            <div className="absolute bottom-10 right-10 h-40 w-40 rounded-full bg-white blur-3xl" />
          </div>

          <div className="container relative mx-auto px-4 md:px-6">
            <AnimatedSection className="flex flex-col items-center justify-center space-y-6 text-center">
              <h2 className="text-2xl font-bold tracking-tight text-primary-foreground sm:text-3xl md:text-4xl">
                Ready to Protect Your Home?
              </h2>
              <p className="max-w-xl text-lg text-primary-foreground/90">
                Get your first service for just $39.95 with a signed agreement. 100% satisfaction guaranteed or your
                money back.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  href="/contact"
                  className="btn-press inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-accent px-8 text-base font-semibold text-accent-foreground shadow-lg shadow-accent/20 transition-all hover:bg-red-700 hover:shadow-xl hover:shadow-red-700/30 hover:-translate-y-0.5"
                >
                  Schedule Service
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <a
                  href="tel:4352566391"
                  className="btn-press inline-flex h-14 items-center justify-center gap-2 rounded-2xl border-2 border-primary-foreground/30 bg-primary-foreground/10 backdrop-blur-sm px-8 text-base font-semibold text-primary-foreground transition-all hover:bg-primary-foreground/20"
                >
                  <Phone className="h-5 w-5" />
                  Call Now: (435) 256-6391
                </a>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

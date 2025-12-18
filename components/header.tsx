"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, Phone, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const LOGO_URL = "/images/officialogoprevent.png"

const PEST_IMAGES = {
  ant: "/images/ant.png",
  cockroach: "/images/cockroach.png",
  mosquito: "/images/mosquito.png",
  spider: "/images/spider.png",
  scorpion: "/images/scorpion.png",
  termite: "/images/termite.png",
  rat: "/images/rat.png",
}

const services = [
  { name: "Ant Control", href: "/services/ant-control", icon: PEST_IMAGES.ant },
  { name: "Cockroach Control", href: "/services/cockroach-control", icon: PEST_IMAGES.cockroach },
  { name: "Mosquito Control", href: "/services/mosquito-control", icon: PEST_IMAGES.mosquito },
  { name: "Spider Control", href: "/services/spider-control", icon: PEST_IMAGES.spider },
  { name: "Scorpion Control", href: "/services/scorpion-control", icon: PEST_IMAGES.scorpion },
  { name: "Termite Control", href: "/services/termite-control", icon: PEST_IMAGES.termite },
  { name: "Rodent Control", href: "/services/rodent-control", icon: PEST_IMAGES.rat },
  { name: "Bed Bug Control", href: "/services/bed-bug-control", icon: null },
  { name: "Earwig Control", href: "/services/earwig-control", icon: null },
  { name: "Commercial", href: "/services/commercial", icon: null },
]

const serviceAreas = [
  { name: "Washington County, UT", description: "St. George, Hurricane", href: "/service-areas/washington-county" },
  { name: "Iron County, UT", description: "Cedar City", href: "/service-areas/iron-county" },
  { name: "Clark County, NV", description: "Mesquite", href: "/service-areas/clark-county" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [areasOpen, setAreasOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/10 bg-background/95 backdrop-blur-xl">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link
          href="/"
          className="flex items-center"
          onMouseEnter={() => {
            setServicesOpen(false)
            setAreasOpen(false)
          }}
        >
          <Image
            src={LOGO_URL || "/placeholder.svg"}
            alt="Preventive Pest Control"
            width={220}
            height={70}
            priority
            className="h-14 w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          <Link
            href="/"
            className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
            onMouseEnter={() => {
              setServicesOpen(false)
              setAreasOpen(false)
            }}
          >
            Home
          </Link>

          {/* Services Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setServicesOpen(!servicesOpen)
                setAreasOpen(false)
              }}
              onMouseEnter={() => {
                setServicesOpen(true)
                setAreasOpen(false)
              }}
              className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Services
              <ChevronDown className={cn("h-4 w-4 transition-transform", servicesOpen && "rotate-180")} />
            </button>
            {servicesOpen && (
              <div
                className="absolute top-full left-0 mt-2 w-[420px] rounded-xl border border-primary/10 bg-background/95 backdrop-blur-xl shadow-xl p-4"
                onMouseLeave={() => setServicesOpen(false)}
              >
                <div className="grid grid-cols-2 gap-2">
                  {services.map((service) => (
                    <Link
                      key={service.name}
                      href={service.href}
                      className="flex items-center gap-3 rounded-lg p-2 text-sm hover:bg-primary/5 transition-colors"
                    >
                      {service.icon ? (
                        <Image
                          src={service.icon || "/placeholder.svg"}
                          alt={service.name}
                          width={28}
                          height={28}
                          className="h-7 w-7 object-contain"
                        />
                      ) : (
                        <div className="h-7 w-7 rounded bg-primary/10 flex items-center justify-center">
                          <span className="text-xs font-bold text-primary">
                            {service.name === "Bed Bug Control"
                              ? "BB"
                              : service.name === "Earwig Control"
                                ? "EW"
                                : "CO"}
                          </span>
                        </div>
                      )}
                      <span className="font-medium text-foreground">{service.name}</span>
                    </Link>
                  ))}
                </div>
                <div className="mt-3 pt-3 border-t border-primary/10">
                  <Link href="/services" className="block text-center text-sm font-medium text-primary hover:underline">
                    View All Services
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Service Areas Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setAreasOpen(!areasOpen)
                setServicesOpen(false)
              }}
              onMouseEnter={() => {
                setAreasOpen(true)
                setServicesOpen(false)
              }}
              className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Service Areas
              <ChevronDown className={cn("h-4 w-4 transition-transform", areasOpen && "rotate-180")} />
            </button>
            {areasOpen && (
              <div
                className="absolute top-full left-0 mt-2 w-[280px] rounded-xl border border-primary/10 bg-background/95 backdrop-blur-xl shadow-xl p-4"
                onMouseLeave={() => setAreasOpen(false)}
              >
                <div className="space-y-2">
                  {serviceAreas.map((area) => (
                    <Link
                      key={area.name}
                      href={area.href}
                      className="block rounded-lg p-3 hover:bg-primary/5 transition-colors"
                    >
                      <div className="font-medium text-foreground">{area.name}</div>
                      <div className="text-xs text-muted-foreground">{area.description}</div>
                    </Link>
                  ))}
                </div>
                <div className="mt-3 pt-3 border-t border-primary/10">
                  <Link
                    href="/service-areas"
                    className="block text-center text-sm font-medium text-primary hover:underline"
                  >
                    View All Areas
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Link
            href="/reviews"
            className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
            onMouseEnter={() => {
              setServicesOpen(false)
              setAreasOpen(false)
            }}
          >
            Reviews
          </Link>

          <Link
            href="/blog"
            className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
            onMouseEnter={() => {
              setServicesOpen(false)
              setAreasOpen(false)
            }}
          >
            Blog
          </Link>

          <Link
            href="/contact"
            className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
            onMouseEnter={() => {
              setServicesOpen(false)
              setAreasOpen(false)
            }}
          >
            Contact
          </Link>
        </nav>

        {/* Right Side - Phone CTA */}
        <div
          className="flex items-center gap-3"
          onMouseEnter={() => {
            setServicesOpen(false)
            setAreasOpen(false)
          }}
        >
          <a
            href="tel:4352566391"
            className="hidden sm:inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Phone className="h-4 w-4" />
            <span>(435) 256-6391</span>
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border border-primary/10 hover:bg-primary/5 transition-colors"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-primary/10 bg-background/95 backdrop-blur-xl">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <Link href="/" className="block py-2 text-sm font-medium text-foreground">
              Home
            </Link>

            <div className="space-y-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Services</div>
              <div className="grid grid-cols-2 gap-2">
                {services.map((service) => (
                  <Link
                    key={service.name}
                    href={service.href}
                    className="flex items-center gap-2 rounded-lg p-2 text-sm hover:bg-primary/5"
                  >
                    {service.icon ? (
                      <Image
                        src={service.icon || "/placeholder.svg"}
                        alt={service.name}
                        width={20}
                        height={20}
                        className="h-5 w-5 object-contain"
                      />
                    ) : (
                      <div className="h-5 w-5 rounded bg-primary/10 flex items-center justify-center">
                        <span className="text-[10px] font-bold text-primary">
                          {service.name === "Bed Bug Control" ? "BB" : service.name === "Earwig Control" ? "EW" : "CO"}
                        </span>
                      </div>
                    )}
                    <span>{service.name}</span>
                  </Link>
                ))}
              </div>
              <Link href="/services" className="block py-2 text-sm font-medium text-primary">
                View All Services
              </Link>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Service Areas</div>
              {serviceAreas.map((area) => (
                <Link key={area.name} href={area.href} className="block py-2 text-sm">
                  {area.name}
                </Link>
              ))}
              <Link href="/service-areas" className="block py-2 text-sm font-medium text-primary">
                View All Areas
              </Link>
            </div>

            <Link href="/reviews" className="block py-2 text-sm font-medium text-foreground">
              Reviews
            </Link>

            <Link href="/blog" className="block py-2 text-sm font-medium text-foreground">
              Blog
            </Link>

            <Link href="/contact" className="block py-2 text-sm font-medium text-foreground">
              Contact
            </Link>

            <a
              href="tel:4352566391"
              className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary text-sm font-semibold text-primary-foreground"
            >
              <Phone className="h-4 w-4" />
              Call (435) 256-6391
            </a>
          </div>
        </div>
      )}
    </header>
  )
}

export { PEST_IMAGES, LOGO_URL }

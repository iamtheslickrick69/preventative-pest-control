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
  { name: "Bed Bug Control", href: "/services/bed-bug-control", icon: "bedbug" },
  { name: "Earwig Control", href: "/services/earwig-control", icon: "earwig" },
  { name: "Commercial", href: "/services/commercial", icon: "commercial" },
]

const serviceAreas = [
  { name: "Washington County, UT", description: "St. George, Hurricane", href: "/service-areas/washington-county" },
  { name: "Iron County, UT", description: "Cedar City", href: "/service-areas/iron-county" },
  { name: "Clark County, NV", description: "Mesquite", href: "/service-areas/clark-county" },
]

function ServiceIconSVG({ type, className = "h-7 w-7" }: { type: string; className?: string }) {
  const icons = {
    bedbug: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <ellipse cx="12" cy="13" rx="5" ry="4" fill="#8B4513" />
        <circle cx="12" cy="9" r="3" fill="#8B4513" />
        <line x1="7" y1="11" x2="4" y2="9" stroke="#8B4513" strokeWidth="1.5" />
        <line x1="17" y1="11" x2="20" y2="9" stroke="#8B4513" strokeWidth="1.5" />
        <line x1="7" y1="14" x2="4" y2="16" stroke="#8B4513" strokeWidth="1.5" />
        <line x1="17" y1="14" x2="20" y2="16" stroke="#8B4513" strokeWidth="1.5" />
      </svg>
    ),
    earwig: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <ellipse cx="12" cy="12" rx="2" ry="5" fill="#654321" />
        <circle cx="12" cy="7" r="1.5" fill="#654321" />
        <path d="M 12 17 Q 10 19, 8 20" stroke="#654321" strokeWidth="1.5" fill="none" />
        <path d="M 12 17 Q 14 19, 16 20" stroke="#654321" strokeWidth="1.5" fill="none" />
        <line x1="10" y1="9" x2="7" y2="7" stroke="#654321" strokeWidth="1" />
        <line x1="14" y1="9" x2="17" y2="7" stroke="#654321" strokeWidth="1" />
      </svg>
    ),
    commercial: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18" />
        <path d="M9 3v18" />
      </svg>
    ),
  }

  return <div className="text-primary">{icons[type as keyof typeof icons] || icons.commercial}</div>
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [areasOpen, setAreasOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full pt-4 transition-all duration-300">

      <div
        className={cn(
          "mx-auto transition-all duration-300 ease-out relative",
          "rounded-full border border-primary/10 bg-background/80 backdrop-blur-xl shadow-lg shadow-black/5"
        )}
        style={{
          maxWidth: "fit-content",
        }}
      >
        <div className="flex items-center justify-between px-3 sm:px-4 md:px-6 h-20 sm:h-24 md:h-[92px]">
          <Link
            href="/"
            className="flex items-center transition-all duration-300 mr-2"
            onMouseEnter={() => {
              setServicesOpen(false)
              setAreasOpen(false)
            }}
          >
            <Image
              src={LOGO_URL || "/placeholder.svg"}
              alt="Preventive Pest Control"
              width={280}
              height={90}
              priority
              className="w-auto h-14 sm:h-16 md:h-19"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-0.5">
            <Link
              href="/"
              className="px-4 py-3 text-base font-medium text-foreground hover:text-primary transition-colors"
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
                className="flex items-center gap-1 px-4 py-3 text-base font-medium text-foreground hover:text-primary transition-colors"
              >
                Services
                <ChevronDown className={cn("h-4 w-4 transition-transform", servicesOpen && "rotate-180")} />
              </button>
              {servicesOpen && (
                <div
                  className="absolute top-full left-0 mt-4 w-[420px] rounded-2xl border-2 border-primary/20 bg-white/98 backdrop-blur-xl shadow-2xl shadow-primary/10 p-4"
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <div className="grid grid-cols-2 gap-2">
                    {services.map((service) => (
                      <Link
                        key={service.name}
                        href={service.href}
                        className="flex items-center gap-3 rounded-xl p-2 text-sm hover:bg-primary/10 transition-all duration-200 hover:scale-[1.02]"
                      >
                        {service.icon && typeof service.icon === 'string' && !service.icon.startsWith('/') ? (
                          <ServiceIconSVG type={service.icon} />
                        ) : service.icon ? (
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
                className="flex items-center gap-1 px-4 py-3 text-base font-medium text-foreground hover:text-primary transition-colors"
              >
                Service Areas
                <ChevronDown className={cn("h-4 w-4 transition-transform", areasOpen && "rotate-180")} />
              </button>
              {areasOpen && (
                <div
                  className="absolute top-full left-0 mt-4 w-[280px] rounded-2xl border-2 border-primary/20 bg-white/98 backdrop-blur-xl shadow-2xl shadow-primary/10 p-4"
                  onMouseLeave={() => setAreasOpen(false)}
                >
                  <div className="space-y-2">
                    {serviceAreas.map((area) => (
                      <Link
                        key={area.name}
                        href={area.href}
                        className="block rounded-xl p-3 hover:bg-primary/10 transition-all duration-200 hover:scale-[1.02]"
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
              className="px-4 py-3 text-base font-medium text-foreground hover:text-primary transition-colors"
              onMouseEnter={() => {
                setServicesOpen(false)
                setAreasOpen(false)
              }}
            >
              Reviews
            </Link>

            <Link
              href="/blog"
              className="px-4 py-3 text-base font-medium text-foreground hover:text-primary transition-colors"
              onMouseEnter={() => {
                setServicesOpen(false)
                setAreasOpen(false)
              }}
            >
              Blog
            </Link>

            <Link
              href="/contact"
              className="px-4 py-3 text-base font-medium text-foreground hover:text-primary transition-colors"
              onMouseEnter={() => {
                setServicesOpen(false)
                setAreasOpen(false)
              }}
            >
              Contact
            </Link>
          </nav>

          {/* Right Side - Phone CTA & AI Bot */}
          <div
            className="flex items-center gap-3 ml-2"
            onMouseEnter={() => {
              setServicesOpen(false)
              setAreasOpen(false)
            }}
          >
            <a
              href="tel:4352566391"
              className="hidden sm:inline-flex h-11 sm:h-13 items-center justify-center gap-1.5 rounded-full bg-green-600 px-3 sm:px-4 text-xs sm:text-sm font-semibold text-white transition-all hover:bg-green-700 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="hidden md:inline">(435) 256-6391</span>
              <span className="md:hidden">Call</span>
            </a>

            {/* AI Spider Bot */}
            <button
              onClick={() => {
                if (typeof window !== 'undefined' && (window as any).openPestChat) {
                  (window as any).openPestChat()
                }
              }}
              className="hidden lg:flex items-center relative group cursor-pointer hover:scale-105 transition-transform duration-300"
              aria-label="Open AI Chat"
            >
              <div className="relative">
                {/* Black Circle */}
                <div className="rounded-full bg-black flex items-center justify-center transition-all duration-300 group-hover:bg-gray-900 w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11">
                  {/* Spider Icon */}
                  <svg
                    className="text-white transition-all duration-300 group-hover:scale-110 w-5 h-5 sm:w-5.5 sm:h-5.5 md:w-6 md:h-6"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    {/* Spider body */}
                    <ellipse cx="12" cy="12" rx="4" ry="5" />
                    {/* Spider legs */}
                    <line x1="8" y1="10" x2="4" y2="8" stroke="currentColor" strokeWidth="1.5" fill="none" />
                    <line x1="8" y1="12" x2="4" y2="12" stroke="currentColor" strokeWidth="1.5" fill="none" />
                    <line x1="8" y1="14" x2="4" y2="16" stroke="currentColor" strokeWidth="1.5" fill="none" />
                    <line x1="16" y1="10" x2="20" y2="8" stroke="currentColor" strokeWidth="1.5" fill="none" />
                    <line x1="16" y1="12" x2="20" y2="12" stroke="currentColor" strokeWidth="1.5" fill="none" />
                    <line x1="16" y1="14" x2="20" y2="16" stroke="currentColor" strokeWidth="1.5" fill="none" />
                  </svg>
                </div>
                {/* AI Label - Top Right Only */}
                <div className="absolute -top-0.5 -right-0.5 bg-green-600 rounded-full px-1.5 py-0.5 flex items-center justify-center transition-all duration-300 group-hover:bg-green-700 text-[9px]">
                  <span className="font-bold text-white leading-none">AI</span>
                </div>
              </div>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden inline-flex w-9 h-9 sm:w-10 sm:h-10 items-center justify-center rounded-full border border-primary/10 hover:bg-primary/5 transition-all"
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-4 mx-4 rounded-3xl border border-primary/10 bg-background/95 backdrop-blur-xl shadow-2xl shadow-black/10">
          <div className="px-6 py-6 space-y-4">
            <Link href="/" className="block py-2 text-sm font-medium text-foreground" onClick={() => setMobileMenuOpen(false)}>
              Home
            </Link>

            <div className="space-y-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Services</div>
              <div className="grid grid-cols-2 gap-2">
                {services.map((service) => (
                  <Link
                    key={service.name}
                    href={service.href}
                    className="flex items-center gap-2 rounded-xl p-2 text-sm hover:bg-primary/5"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {service.icon && typeof service.icon === 'string' && !service.icon.startsWith('/') ? (
                      <ServiceIconSVG type={service.icon} className="h-5 w-5" />
                    ) : service.icon ? (
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
              <Link href="/services" className="block py-2 text-sm font-medium text-primary" onClick={() => setMobileMenuOpen(false)}>
                View All Services
              </Link>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Service Areas</div>
              {serviceAreas.map((area) => (
                <Link key={area.name} href={area.href} className="block py-2 text-sm" onClick={() => setMobileMenuOpen(false)}>
                  {area.name}
                </Link>
              ))}
              <Link href="/service-areas" className="block py-2 text-sm font-medium text-primary" onClick={() => setMobileMenuOpen(false)}>
                View All Areas
              </Link>
            </div>

            <Link href="/reviews" className="block py-2 text-sm font-medium text-foreground" onClick={() => setMobileMenuOpen(false)}>
              Reviews
            </Link>

            <Link href="/blog" className="block py-2 text-sm font-medium text-foreground" onClick={() => setMobileMenuOpen(false)}>
              Blog
            </Link>

            <Link href="/contact" className="block py-2 text-sm font-medium text-foreground" onClick={() => setMobileMenuOpen(false)}>
              Contact
            </Link>

            <a
              href="tel:4352566391"
              className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-green-600 text-sm font-semibold text-white hover:bg-green-700 transition-colors"
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

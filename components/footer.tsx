import Link from "next/link"
import Image from "next/image"
import { Phone, MapPin, Mail } from "lucide-react"

const LOGO_URL = "/images/officialogoprevent.png"

export function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 md:px-6 py-10">
        <div className="grid gap-8 md:grid-cols-12 items-start">
          {/* Logo & Tagline - 3 cols */}
          <div className="md:col-span-3 space-y-3">
            <Link href="/" className="inline-block">
              <Image
                src={LOGO_URL || "/placeholder.svg"}
                alt="Preventive Pest Control"
                width={180}
                height={60}
                className="h-12 w-auto"
              />
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              25+ years protecting Southern Utah homes. Locally owned, trusted by thousands.
            </p>
          </div>

          {/* Quick Links - 2 cols */}
          <div className="md:col-span-2">
            <h4 className="font-semibold text-foreground mb-3 text-sm">Services</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/services/ant-control" className="footer-link">
                  Ant Control
                </Link>
              </li>
              <li>
                <Link href="/services/spider-control" className="footer-link">
                  Spider Control
                </Link>
              </li>
              <li>
                <Link href="/services/scorpion-control" className="footer-link">
                  Scorpion Control
                </Link>
              </li>
              <li>
                <Link href="/services/termite-control" className="footer-link">
                  Termite Control
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-sm font-medium text-primary hover:underline">
                  View All
                </Link>
              </li>
            </ul>
          </div>

          {/* Service Areas - 2 cols */}
          <div className="md:col-span-2">
            <h4 className="font-semibold text-foreground mb-3 text-sm">Service Areas</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/service-areas/washington-county" className="footer-link">
                  Washington County
                </Link>
              </li>
              <li>
                <Link href="/service-areas/iron-county" className="footer-link">
                  Iron County
                </Link>
              </li>
              <li>
                <Link href="/service-areas/clark-county" className="footer-link">
                  Clark County, NV
                </Link>
              </li>
            </ul>
          </div>

          {/* Company - 2 cols */}
          <div className="md:col-span-2">
            <h4 className="font-semibold text-foreground mb-3 text-sm">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/reviews" className="footer-link">
                  Reviews
                </Link>
              </li>
              <li>
                <Link href="/blog" className="footer-link">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/employment" className="footer-link">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="footer-link">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info - 3 cols */}
          <div className="md:col-span-3">
            <h4 className="font-semibold text-foreground mb-3 text-sm">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a href="tel:4352566391" className="flex items-center gap-2 text-sm group">
                  <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Phone className="h-4 w-4 text-primary" />
                  </div>
                  <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                    (435) 256-6391
                  </span>
                </a>
              </li>
              <li>
                <div className="flex items-center gap-2 text-sm">
                  <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <MapPin className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-muted-foreground">St. George, UT 84770</span>
                </div>
              </li>
              <li>
                <a href="mailto:info@preventivepestcontrol.com" className="flex items-center gap-2 text-sm group">
                  <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Mail className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-muted-foreground group-hover:text-primary transition-colors">Email Us</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar - Minimal */}
      <div className="border-t border-border/50">
        <div className="container mx-auto px-4 md:px-6 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
            <p>© 2025 Preventive Pest Control. All rights reserved.</p>
            <p>Nevada's Largest Privately-Held Pest Control Company</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

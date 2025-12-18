import { MapPin, Phone, Clock, Shield, Star, Award } from "lucide-react"
import Image from "next/image"

export function ContactInfoCard() {
  return (
    <div className="space-y-6">
      {/* Contact Details Card */}
      <div className="bg-card border border-border rounded-xl p-6 space-y-6">
        {/* Address */}
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <MapPin className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-1">Our Location</h3>
            <p className="text-muted-foreground">
              946 W Sunset Blvd Ste P<br />
              St. George, UT 84770
            </p>
            <a
              href="https://maps.google.com/?q=946+W+Sunset+Blvd+Ste+P+St+George+UT+84770"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary hover:underline mt-1 inline-block"
            >
              Get Directions
            </a>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <Phone className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-1">Phone</h3>
            <a href="tel:4352566391" className="text-xl font-bold text-primary hover:text-primary/80 transition-colors">
              (435) 256-6391
            </a>
            <p className="text-sm text-muted-foreground mt-1">Call or Text - We&apos;re available now!</p>
          </div>
        </div>

        {/* Hours */}
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <Clock className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-1">Business Hours</h3>
            <div className="text-muted-foreground space-y-1 text-sm">
              <p>
                <span className="font-medium text-foreground">Mon - Fri:</span> 7:00 AM - 6:00 PM
              </p>
              <p>
                <span className="font-medium text-foreground">Saturday:</span> 8:00 AM - 4:00 PM
              </p>
              <p>
                <span className="font-medium text-foreground">Sunday:</span> Closed
              </p>
              <p className="text-accent font-medium pt-1">Emergency Services: 24/7</p>
            </div>
          </div>
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="aspect-[4/3] bg-muted relative">
          <Image
            src="/map-st-george-utah-location-pin.jpg"
            alt="Map showing Preventive Pest Control location in St. George, UT"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-foreground/5">
            <a
              href="https://maps.google.com/?q=946+W+Sunset+Blvd+Ste+P+St+George+UT+84770"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-lg"
            >
              Open in Google Maps
            </a>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <Shield className="w-6 h-6 text-primary mx-auto mb-2" />
          <p className="text-xs font-medium text-foreground">Licensed & Insured</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <Award className="w-6 h-6 text-primary mx-auto mb-2" />
          <p className="text-xs font-medium text-foreground">25+ Years</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <Star className="w-6 h-6 text-accent mx-auto mb-2" />
          <p className="text-xs font-medium text-foreground">965 Reviews</p>
        </div>
      </div>

      {/* Customer Login Link */}
      <div className="bg-muted rounded-lg p-4 text-center">
        <p className="text-sm text-muted-foreground mb-2">Existing customer?</p>
        <a
          href="https://ppclv.pestportals.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary font-medium hover:underline"
        >
          Login to Customer Portal
        </a>
      </div>
    </div>
  )
}

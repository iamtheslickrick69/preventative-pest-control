import { ServicePageTemplate } from "@/components/service-page-template"
import { Building2, BadgeCheck, Shield, Users } from "lucide-react"

const industries = [
  "Restaurants",
  "Office Buildings",
  "Warehouses",
  "Multi-Family Housing",
  "Healthcare Facilities",
  "Distribution Centers",
  "Retail Stores",
  "Schools & Universities",
]

function IndustriesSection() {
  return (
    <section className="py-16 px-4 bg-brand-green/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-brand-green/10 text-brand-green text-sm font-medium px-4 py-2 rounded-full mb-4">
            <Building2 className="h-4 w-4" />
            Industries Served
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-4">We Serve All Commercial Properties</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our customized Integrated Pest Management (IPM) plans are designed for your specific needs and challenges.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {industries.map((industry) => (
            <div
              key={industry}
              className="bg-white rounded-xl p-4 border border-brand-green/10 text-center hover:border-brand-green/30 hover:shadow-md transition-all"
            >
              <p className="font-medium text-foreground">{industry}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function WhyItMattersSection() {
  return (
    <section className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-amber-50 rounded-2xl p-8 border border-amber-200">
          <h3 className="text-xl font-bold text-foreground mb-4 text-center">Why Commercial Pest Control Matters</h3>
          <p className="text-muted-foreground text-center mb-6">
            First impressions are crucial. Finding pests in an establishment ruins positive customer experience.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
              <Shield className="h-5 w-5 text-brand-green" />
              <span className="text-foreground">Maintaining reputation</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
              <Users className="h-5 w-5 text-brand-green" />
              <span className="text-foreground">Ensuring customer satisfaction</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
              <BadgeCheck className="h-5 w-5 text-brand-green" />
              <span className="text-foreground">Keeping business clean & safe</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
              <Building2 className="h-5 w-5 text-brand-green" />
              <span className="text-foreground">Professional appearance</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function CertificationsSection() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-4">Special Certifications</h2>
          <p className="text-muted-foreground">
            Our team meets the highest industry standards for commercial pest control.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-cream rounded-2xl p-6 border border-brand-green/10 text-center">
            <div className="h-12 w-12 rounded-xl bg-brand-green/10 flex items-center justify-center mx-auto mb-4">
              <BadgeCheck className="h-6 w-6 text-brand-green" />
            </div>
            <h3 className="font-bold text-foreground mb-2">Background Checked</h3>
            <p className="text-sm text-muted-foreground">
              Technicians with special background checks for sensitive accounts
            </p>
          </div>
          <div className="bg-cream rounded-2xl p-6 border border-brand-green/10 text-center">
            <div className="h-12 w-12 rounded-xl bg-brand-green/10 flex items-center justify-center mx-auto mb-4">
              <Shield className="h-6 w-6 text-brand-green" />
            </div>
            <h3 className="font-bold text-foreground mb-2">AIB Certified</h3>
            <p className="text-sm text-muted-foreground">Certified technicians for food-handling facilities</p>
          </div>
          <div className="bg-cream rounded-2xl p-6 border border-brand-green/10 text-center">
            <div className="h-12 w-12 rounded-xl bg-brand-green/10 flex items-center justify-center mx-auto mb-4">
              <Building2 className="h-6 w-6 text-brand-green" />
            </div>
            <h3 className="font-bold text-foreground mb-2">State Licensed</h3>
            <p className="text-sm text-muted-foreground">Fully licensed in Utah and Nevada</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function CommercialPestControlPage() {
  return (
    <ServicePageTemplate
      title="Commercial Pest Control"
      subtitle="One of Nevada's largest privately-held pest control companies"
      description="Over two decades of experience providing comprehensive pest management solutions. State-licensed technicians with customized Integrated Pest Management (IPM) plans."
      heroImage="/commercial-building-office-pest-control.jpg"
      urgency="medium"
      signs={[
        "Employee or customer complaints about pest sightings",
        "Evidence of droppings in storage or food preparation areas",
        "Damaged inventory or packaging",
        "Health inspection concerns or violations",
        "Pest activity near entry points or loading docks",
        "Signs of nesting in storage areas or equipment",
      ]}
      approach={[
        "Comprehensive facility assessment and risk analysis",
        "Develop customized Integrated Pest Management (IPM) plan",
        "Implement scientifically-backed pest management strategies",
        "Regular scheduled service visits",
        "Detailed documentation and reporting",
        "Year-round pest-free business protection",
      ]}
      additionalSections={
        <>
          <WhyItMattersSection />
          <IndustriesSection />
          <CertificationsSection />
        </>
      }
      specialNote="We understand the unique requirements of different industries. Our AIB certified technicians are available for food-handling facilities and sensitive accounts."
    />
  )
}

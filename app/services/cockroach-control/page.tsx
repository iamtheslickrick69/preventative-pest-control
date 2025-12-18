import { ServicePageTemplate } from "@/components/service-page-template"
import { Shield } from "lucide-react"

function GuaranteeSection() {
  return (
    <section className="py-12 px-4 bg-brand-green/5">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl p-8 border border-brand-green/20 shadow-sm text-center">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-brand-green/10 mb-4">
            <Shield className="h-8 w-8 text-brand-green" />
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-2">100% Satisfaction Guarantee</h3>
          <p className="text-lg text-muted-foreground">
            Only dead roaches will be seen after our service. If you&apos;re not completely satisfied, we&apos;ll make
            it right.
          </p>
        </div>
      </div>
    </section>
  )
}

export default function CockroachControlPage() {
  return (
    <ServicePageTemplate
      title="Cockroach Control"
      subtitle="Professional cockroach control for St. George and surrounding areas"
      description="Southern Utah's warm climate creates the perfect breeding ground for cockroaches. They carry bacteria and allergens that can negatively impact your family's health."
      heroImage="/pest-control-technician-spraying-kitchen-cockroach.jpg"
      pestImage="/images/pests/cockroach.png"
      urgency="high"
      signs={[
        "Small, dark droppings resembling coffee grounds in cabinets, under appliances, or along baseboards",
        "Musty or oily odor, especially in confined spaces",
        "Egg cases (oval-shaped and brown) in hidden corners or near food sources",
        "Smear marks or streaks along walls, floors, and baseboards",
        "Visible cockroaches scurrying when lights are turned on",
      ]}
      approach={[
        "Detailed inspection to locate hiding spots, entry points, and nesting areas",
        "Targeted treatments including safe insecticides and baits",
        "Eliminate roaches at every life stage (eggs, nymphs, adults)",
        "Post-treatment monitoring to ensure effectiveness",
        "Preventative tips for long-term roach-free environment",
      ]}
      additionalSections={<GuaranteeSection />}
      specialNote="Cockroaches are nocturnal and hide during the day. If you see cockroaches during daylight hours, it may indicate a severe infestation that requires immediate attention."
    />
  )
}

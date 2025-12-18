import { ServicePageTemplate } from "@/components/service-page-template"
import { Bug, DollarSign, FileText } from "lucide-react"

function TermiteTypesSection() {
  return (
    <section className="py-16 px-4 bg-brand-green/5">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-brand-green/10 text-brand-green text-sm font-medium px-4 py-2 rounded-full mb-4">
            <Bug className="h-4 w-4" />
            Species in Our Area
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-4">Termite Species in Southern Utah</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-brand-green/20">
            <h3 className="font-bold text-foreground text-lg mb-3">Subterranean Termites</h3>
            <p className="text-muted-foreground text-sm">
              Live underground and build mud tubes to access food sources above ground. Most common and destructive type
              in Utah.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-brand-green/20">
            <h3 className="font-bold text-foreground text-lg mb-3">Dry Wood Termites</h3>
            <p className="text-muted-foreground text-sm">
              Live directly inside wood and don&apos;t require contact with soil. Thrive year-round in our hot desert
              climate.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function CostSection() {
  return (
    <section className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-amber-50 rounded-2xl p-8 border border-amber-200">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-xl bg-amber-500/10 flex items-center justify-center flex-shrink-0">
              <DollarSign className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground mb-2">The Cost of Termite Damage</h3>
              <p className="text-muted-foreground mb-4">
                Extensive termite damage can cost <strong className="text-foreground">thousands of dollars</strong> to
                repair. Southern Utah&apos;s desert terrain has heavy termite presence, making infestations more likely.
              </p>
              <p className="text-amber-700 font-medium">
                Prevention and early treatment are essential to protect your investment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function FreeEstimateSection() {
  return (
    <section className="py-12 px-4 bg-brand-green/5">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl p-8 border border-brand-green/20 shadow-lg">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-xl bg-brand-green/10 flex items-center justify-center flex-shrink-0">
              <FileText className="h-6 w-6 text-brand-green" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground mb-2">Free Termite Estimates</h3>
              <p className="text-muted-foreground mb-4">
                If active infestation is suspected, we provide{" "}
                <strong className="text-foreground">free estimates</strong> to assess the damage and recommend
                treatment.
              </p>
              <p className="text-sm text-muted-foreground italic">
                Note: Inspections for home loans requiring State- and Government-mandated forms will have a fee.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function TermiteControlPage() {
  return (
    <ServicePageTemplate
      title="Termite Control"
      subtitle="Southern Utah's choice termite exterminators"
      description="Termites can cause severe structural damage to your home. Southern Utah's desert terrain has heavy termite presence, making professional protection essential."
      heroImage="/termite-damage-wood-wall-inspection.jpg"
      pestImage="/images/pests/termite.png"
      urgency="high"
      signs={[
        "Termite sightings in and around your home",
        "Swarm of winged termites or discarded wings near windows",
        "Mud tubes on foundation, walls, or in the ground around home",
        "Fecal pellets that are sand-like in appearance",
        "Discolored or drooping drywall",
        "Hollow-sounding wood when tapped",
        "Buckling or damaged wood floors",
      ]}
      approach={[
        "Conduct thorough inspection of entire property",
        "Devise best course of action based on termite type",
        "Check for potential points of entry",
        "Effectively seal all entry points",
        "Apply advanced treatment technology",
        "Establish prevention plan to stop future problems",
      ]}
      additionalSections={
        <>
          <TermiteTypesSection />
          <CostSection />
          <FreeEstimateSection />
        </>
      }
      specialNote="Don't wait until you see damage. Termites work silently and can cause extensive damage before you notice signs. Annual inspections are recommended for all Southern Utah homes."
    />
  )
}

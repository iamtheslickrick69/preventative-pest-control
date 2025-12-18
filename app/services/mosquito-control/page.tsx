import { ServicePageTemplate } from "@/components/service-page-template"
import { Droplets, AlertTriangle, CheckCircle2 } from "lucide-react"

function In2CareSection() {
  const features = [
    "Attraction stations that lure adult mosquitos",
    "Special fungus that covers adult mosquito, killing it within 2-3 days",
    "Female mosquito spreads fungus to other water sources",
    "Fungus kills larvae before they become adult mosquitoes",
    "WHO-approved active ingredient (derivative used in drinking water)",
    "Pet- and people-friendly formula",
    "Will not affect birds or fish",
  ]

  return (
    <section className="py-16 px-4 bg-brand-green/5">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-brand-green/10 text-brand-green text-sm font-medium px-4 py-2 rounded-full mb-4">
              <Droplets className="h-4 w-4" />
              Advanced Technology
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-4">In2Care Mosquito System</h2>
            <p className="text-muted-foreground mb-6">
              Our revolutionary mosquito control program uses cutting-edge technology approved by the World Health
              Organization to eliminate mosquitoes at every life stage.
            </p>
            <ul className="space-y-3">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-brand-green flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-2xl p-8 border border-brand-green/20 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-4">Seasonal Service (May - October)</h3>
            <div className="space-y-4">
              <div className="p-4 bg-cream rounded-xl">
                <h4 className="font-bold text-foreground mb-2">Initial Service</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Property inspection for breeding sites</li>
                  <li>• Installation of mosquito control stations</li>
                  <li>• Treatment of water features & resting areas</li>
                  <li>• Bush and shrub treatment</li>
                </ul>
              </div>
              <div className="p-4 bg-cream rounded-xl">
                <h4 className="font-bold text-foreground mb-2">Monthly Service</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Re-treatment of entire property</li>
                  <li>• Check and maintain mosquito traps</li>
                  <li>• Ensure mosquitoes don&apos;t return</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function WestNileSection() {
  const symptoms = [
    "Fever",
    "Headaches and body aches",
    "Stiff neck",
    "Muscle weakness",
    "Disorientation",
    "Brain inflammation (encephalitis)",
    "Coma (in severe cases)",
  ]

  return (
    <section className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-amber-50 rounded-2xl p-8 border border-amber-200">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-xl bg-amber-500/10 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground mb-2">Health Alert: West Nile Virus</h3>
              <p className="text-muted-foreground mb-4">
                Symptoms can occur 3-14 days after being bitten by an infected mosquito:
              </p>
              <div className="grid grid-cols-2 gap-2">
                {symptoms.map((symptom, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                    <span className="text-sm text-foreground">{symptom}</span>
                  </div>
                ))}
              </div>
              <p className="text-sm text-amber-700 mt-4 font-medium">
                Note: Death from West Nile Virus is rare but can occur. Seek medical attention if you experience these
                symptoms.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function MosquitoControlPage() {
  return (
    <ServicePageTemplate
      title="Mosquito Control"
      subtitle="Seasonal mosquito control services from May through October"
      description="Significantly reduce mosquito activity when these pests are at their worst. Our advanced In2Care system eliminates mosquitoes at every life stage."
      heroImage="/backyard-mosquito-treatment-spray-garden.jpg"
      pestImage="/images/pests/mosquito.png"
      urgency="medium"
      signs={[
        "Increased mosquito bites on family members",
        "Mosquitoes swarming around standing water",
        "Buzzing sounds near doors and windows at dusk",
        "Larvae visible in bird baths, gutters, or plant saucers",
        "Unable to enjoy outdoor spaces during evening hours",
      ]}
      approach={[
        "Property inspection to locate mosquito resting and breeding sites",
        "Installation of In2Care mosquito control stations",
        "Treatment of water features: rain barrels, troughs, koi ponds",
        "Treatment of bushes, shrubs, and non-bearing fruit trees",
        "Monthly re-treatment throughout mosquito season (May-October)",
        "Regular trap monitoring to ensure effectiveness",
      ]}
      additionalSections={
        <>
          <In2CareSection />
          <WestNileSection />
        </>
      }
      specialNote="Mosquito season in Southern Utah runs from May through October. We recommend starting service early in the season for maximum protection."
    />
  )
}

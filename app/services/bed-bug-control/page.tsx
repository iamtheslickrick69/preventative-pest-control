import { ServicePageTemplate } from "@/components/service-page-template"
import { CheckCircle2, AlertTriangle } from "lucide-react"

function PreparationSection() {
  const steps = [
    "Remove mattresses and box frames from bed frame",
    "Empty and remove dresser drawers",
    "Pull carpets for better treatment access",
    "Move furniture 3 feet from walls",
    "Empty closets and wash all clothing",
    "Seal cleaned clothes in black plastic bags",
    'Set bags outside in direct sunlight for 4 hours to "cook" bugs',
  ]

  return (
    <section className="py-16 px-4 bg-amber-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-600 text-sm font-medium px-4 py-2 rounded-full mb-4">
            <AlertTriangle className="h-4 w-4" />
            Important Preparation
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-4">Preparation Requirements</h2>
          <p className="text-muted-foreground">
            Before our initial inspection, property owners must complete these steps for effective treatment:
          </p>
        </div>
        <div className="bg-white rounded-2xl p-8 border border-amber-200">
          <ol className="space-y-4">
            {steps.map((step, index) => (
              <li key={index} className="flex items-start gap-4">
                <div className="h-8 w-8 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">{index + 1}</span>
                </div>
                <span className="text-foreground pt-1">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

function TreatmentSection() {
  const steps = [
    "Diligent inspection of every square inch",
    "Locate problem areas and entry points",
    "Thorough bed bug elimination at all life stages",
    "Seal mattresses and box springs with bed bug-resistant encasements",
    "Apply powerful solution for complete eradication",
    "Follow-up visits to ensure no return",
  ]

  return (
    <section className="py-16 px-4 bg-brand-green/5">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-4">Our Treatment Process</h2>
          <p className="text-muted-foreground">
            Our 5-star bed bug control team uses a comprehensive approach for complete elimination.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {steps.map((step, index) => (
            <div key={index} className="flex items-start gap-3 bg-white p-4 rounded-xl border border-brand-green/10">
              <CheckCircle2 className="h-5 w-5 text-brand-green flex-shrink-0 mt-0.5" />
              <span className="text-foreground">{step}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function BedBugControlPage() {
  return (
    <ServicePageTemplate
      title="Bed Bug Control"
      subtitle="5-star bed bug control team for St. George and surrounding cities"
      description="Bed bugs pose serious health risks and cause interior property damage. Our thorough approach eliminates infestations completely."
      heroImage="/bed-bug-inspection-mattress-treatment.jpg"
      urgency="high"
      signs={[
        "Itchy bites in clusters or lines on exposed skin (usually arms or shoulders)",
        "Rusty or red stains on bed sheets, mattresses, or furniture",
        "Small, white, oval eggs (size of pinhead) in mattress seams or bed frame",
        "Musty, sweet smell around bed",
        "Shed pale yellow skins in bedding or furniture",
        "Live bed bugs: reddish-brown, wingless, apple seed size",
      ]}
      approach={[
        "Diligent inspection of every square inch of affected areas",
        "Locate all problem areas and potential entry points",
        "Complete bed bug elimination at every life stage",
        "Install bed bug-resistant encasements on mattresses",
        "Apply professional-grade treatment solutions",
        "Schedule follow-up visits to ensure complete eradication",
      ]}
      additionalSections={
        <>
          <PreparationSection />
          <TreatmentSection />
        </>
      }
      specialNote="Bed bugs are excellent hitchhikers. If you've recently traveled or purchased used furniture, inspect thoroughly before bringing items into your home."
    />
  )
}

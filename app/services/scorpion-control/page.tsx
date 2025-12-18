import { ServicePageTemplate } from "@/components/service-page-template"
import { AlertTriangle } from "lucide-react"

function SymptomsSection() {
  const symptoms = [
    { symptom: "Tingling and numbness in affected area", severity: "common" },
    { symptom: "Muscle twitching", severity: "common" },
    { symptom: "Rapid eye movements", severity: "moderate" },
    { symptom: "Confusion and dizziness", severity: "moderate" },
    { symptom: "Trouble breathing", severity: "severe" },
    { symptom: "Nausea and vomiting", severity: "moderate" },
    { symptom: "Upset stomach or abdominal pain", severity: "common" },
  ]

  return (
    <section className="py-12 px-4 bg-red-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-red-100 text-red-600 text-sm font-medium px-4 py-2 rounded-full mb-4">
            <AlertTriangle className="h-4 w-4" />
            Health Warning
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-2">Symptoms of Scorpion Sting</h2>
          <p className="text-muted-foreground">
            Scorpions are dangerous to humans. Stings can cause the following symptoms:
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {symptoms.map((item, index) => (
            <div
              key={index}
              className={`flex items-center gap-3 p-4 rounded-xl bg-white border ${
                item.severity === "severe"
                  ? "border-red-300"
                  : item.severity === "moderate"
                    ? "border-amber-300"
                    : "border-gray-200"
              }`}
            >
              <div
                className={`h-3 w-3 rounded-full ${
                  item.severity === "severe"
                    ? "bg-red-500"
                    : item.severity === "moderate"
                      ? "bg-amber-500"
                      : "bg-gray-400"
                }`}
              />
              <span className="text-foreground">{item.symptom}</span>
            </div>
          ))}
        </div>
        <div className="mt-6 p-4 bg-red-100 rounded-xl border border-red-200">
          <p className="text-red-700 font-medium text-center">
            Severe symptoms may indicate an allergic reaction - seek immediate medical help.
          </p>
        </div>
      </div>
    </section>
  )
}

function HabitatSection() {
  const habitats = [
    "Dark, damp areas (bathroom, near refrigerator)",
    "Attics and garages",
    "Inside shoes or clothing",
    "Concealed regions under furniture",
    "Under potted plants",
    "In cracks and crevices of walls",
  ]

  return (
    <section className="py-16 px-4 bg-brand-green/5">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-4">Where Scorpions Hide</h2>
          <p className="text-muted-foreground">
            Southern Utah&apos;s desert-like climate creates the perfect environment for scorpions. They prefer hiding
            in:
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {habitats.map((habitat, index) => (
            <div key={index} className="bg-white rounded-xl p-4 border border-brand-green/10 text-center">
              <p className="text-foreground text-sm">{habitat}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 p-6 bg-white rounded-2xl border border-brand-green/20 text-center">
          <p className="text-lg font-medium text-foreground">
            Our goal: Year-round scorpion-free protection for your home and family.
          </p>
        </div>
      </div>
    </section>
  )
}

export default function ScorpionControlPage() {
  return (
    <ServicePageTemplate
      title="Scorpion & Stinging Insects Control"
      subtitle="Aggressive scorpion control for Southern Utah's desert climate"
      description="Scorpions are dangerous to humans with stings causing swelling, pain, numbness, and other symptoms. Our comprehensive approach eliminates scorpions and prevents their return."
      heroImage="/desert-scorpion-pest-control-arizona.jpg"
      pestImage="/images/pests/scorpion.png"
      urgency="high"
      signs={[
        "Small, dark, cylindrical droppings in attics, garages, or basements",
        "Shed exoskeletons in hidden areas",
        "Increased insect activity (scorpions follow their food source)",
        "Rustling sounds (especially at night) in basements or attics",
        "Trails or tracks in dusty areas",
        "Scorpion sightings inside or outside your home",
      ]}
      approach={[
        "Thorough property inspection inside and out",
        "Locate entry points and problem areas",
        "Apply advanced technology for complete elimination",
        "Implement preventative barrier measures",
        "Seal cracks and entry points",
        "Establish year-round scorpion-free protection plan",
      ]}
      additionalSections={
        <>
          <SymptomsSection />
          <HabitatSection />
        </>
      }
      specialNote="Always shake out shoes, clothing, and bedding before use if you suspect scorpion activity. Scorpions are most active at night."
    />
  )
}

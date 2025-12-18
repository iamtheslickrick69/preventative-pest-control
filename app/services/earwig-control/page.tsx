import { ServicePageTemplate } from "@/components/service-page-template"
import { AlertTriangle } from "lucide-react"

function ProblemsSection() {
  const problems = [
    {
      title: "Damage to Plants",
      description: "Omnivores eating various plants, grass, vegetables, flowers, and berries in your garden.",
    },
    {
      title: "Foul Odor",
      description:
        "Release a noticeable foul odor when threatened or stepped on, similar to feces or bad battery smell.",
    },
    {
      title: "Excess Numbers",
      description: "Congregate in damp areas like bathrooms and kitchens, traveling indoors seeking shelter.",
    },
    {
      title: "Pinching",
      description: "Have forceps-like pinchers used if threatened, which can cause mild discomfort and redness.",
    },
  ]

  return (
    <section className="py-16 px-4 bg-brand-green/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-600 text-sm font-medium px-4 py-2 rounded-full mb-4">
            <AlertTriangle className="h-4 w-4" />
            Problems Caused
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-4">Problems Caused by Earwigs</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {problems.map((problem) => (
            <div key={problem.title} className="bg-white rounded-2xl p-6 border border-brand-green/10 shadow-sm">
              <h3 className="font-bold text-foreground text-lg mb-2">{problem.title}</h3>
              <p className="text-muted-foreground">{problem.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CharacteristicsSection() {
  const characteristics = [
    "Fast-moving insects",
    "Lay eggs underground",
    "Prefer to hide in concealed spots",
    "Enter through tiny holes or cracks",
    "Hang around moist areas (bathroom tub or sink)",
    "Most active at night",
  ]

  return (
    <section className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl p-8 border border-brand-green/20">
          <h3 className="text-xl font-bold text-foreground mb-4 text-center">Earwig Characteristics</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {characteristics.map((char, index) => (
              <div key={index} className="flex items-center gap-2 p-3 bg-cream rounded-lg">
                <div className="h-2 w-2 rounded-full bg-brand-green" />
                <span className="text-sm text-foreground">{char}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default function EarwigControlPage() {
  return (
    <ServicePageTemplate
      title="Earwig Control"
      subtitle="Southern Utah's choice earwig control team"
      description="Earwigs are common pests that disrupt homes and commercial properties. With moderate climate year-round, Southern Utah is a hotspot for these pests."
      heroImage="/earwig-insect-pest-garden.jpg"
      urgency="low"
      signs={[
        "Earwig droppings that look like coffee or pepper grounds",
        "Chewed or damaged leaves near base of plants",
        "Yellow-brown stains on ground with foul smell",
        "Exoskeleton sheddings (small, transparent flakes)",
        "Bite marks or holes in paper, cardboard, or natural fiber textiles",
        "Pinches on skin from handling",
        "Black spots or holes in fruits and vegetables",
      ]}
      approach={[
        "Thorough inspection by St. George technicians",
        "Locate problem areas and determine best course of action",
        "Apply advanced, proven extermination techniques",
        "Implement preventative steps to prevent re-entry",
        "Leverage over 25 years of experience with local pest problems",
        "Provide friendly, affordable, and thorough service",
      ]}
      additionalSections={
        <>
          <CharacteristicsSection />
          <ProblemsSection />
        </>
      }
    />
  )
}

import { ServicePageTemplate } from "@/components/service-page-template"
import { AlertTriangle, Shield, Lock, Target } from "lucide-react"

function HealthRisksSection() {
  const diseases = [
    { name: "Hantavirus", description: "Spread through droppings, urine, and saliva" },
    { name: "Leptospirosis", description: "Bacterial infection from contaminated water" },
    { name: "Lymphocytic Choriomeningitis (LCMV)", description: "Viral infection from house mice" },
  ]

  return (
    <section className="py-12 px-4 bg-red-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-red-100 text-red-600 text-sm font-medium px-4 py-2 rounded-full mb-4">
            <AlertTriangle className="h-4 w-4" />
            Health Risks
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-2">Diseases Carried by Rodents</h2>
          <p className="text-muted-foreground">
            Rodents in structures have more pathogens than those in natural habitats.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {diseases.map((disease) => (
            <div key={disease.name} className="bg-white rounded-xl p-4 border border-red-200">
              <h3 className="font-bold text-foreground mb-2">{disease.name}</h3>
              <p className="text-sm text-muted-foreground">{disease.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ControlMethodsSection() {
  const methods = [
    {
      icon: Target,
      title: "Trapping",
      description: "For rats and mice inside home or business",
      details: [
        "Inspect property and place traps strategically",
        "Consistent checking and cleaning",
        "Ensure traps work correctly",
      ],
    },
    {
      icon: Shield,
      title: "Exclusion",
      description: "Long-term solution to keep rodents out",
      details: [
        "Seal entry points larger than ¼ inch",
        "Thorough inspection to determine problem areas",
        "Permanent solution to rodent issues",
      ],
    },
    {
      icon: Lock,
      title: "Baiting",
      description: "For rodents in yard or garden",
      details: ["Low-cost preventative measure", "Locked in tamper-proof containers", "Safe from kids and family pets"],
    },
  ]

  return (
    <section className="py-16 px-4 bg-brand-green/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-foreground mb-4">Our Control Methods</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We use a combination of methods tailored to your specific situation for complete rodent elimination.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {methods.map((method) => (
            <div key={method.title} className="bg-white rounded-2xl p-6 border border-brand-green/20 shadow-sm">
              <div className="h-12 w-12 rounded-xl bg-brand-green/10 flex items-center justify-center mb-4">
                <method.icon className="h-6 w-6 text-brand-green" />
              </div>
              <h3 className="font-bold text-foreground text-lg mb-2">{method.title}</h3>
              <p className="text-muted-foreground text-sm mb-4">{method.description}</p>
              <ul className="space-y-2">
                {method.details.map((detail, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-brand-green mt-2" />
                    <span className="text-sm text-foreground">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function DamageSection() {
  const damages = [
    "Chew through wiring in homes (fire hazard)",
    "Destroy foundation with burrows",
    "Leave dirty droppings throughout property",
    "Damage gardens and food supplies",
    "Breed efficiently and quickly",
    "Contaminate food storage areas",
  ]

  return (
    <section className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-amber-50 rounded-2xl p-8 border border-amber-200">
          <h3 className="text-xl font-bold text-foreground mb-4">Property Damage from Rodents</h3>
          <div className="grid md:grid-cols-2 gap-3">
            {damages.map((damage, index) => (
              <div key={index} className="flex items-start gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-amber-500 mt-2" />
                <span className="text-foreground text-sm">{damage}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default function RodentControlPage() {
  return (
    <ServicePageTemplate
      title="Rodent Control"
      subtitle="Comprehensive rodent control services from Southern Utah's premier exterminators"
      description="Rodents are sneaky, fast, and can fit through even the smallest holes and cracks. They carry dangerous diseases and cause significant property damage."
      heroImage="/mouse-trap-pest-control-rodent.jpg"
      pestImage="/images/pests/rat.png"
      urgency="high"
      signs={[
        "Burrows in garden or around foundation",
        "Rodent nests on property (shredded materials)",
        "Tears or tooth marks on food packages",
        "Mouse/rat droppings, trails of urine, or footprints",
        "Musky or unpleasant odors",
        "Gnaw marks on wooden surfaces (especially walls and floors)",
        "Scratching sounds in walls or ceiling at night",
      ]}
      approach={[
        "Comprehensive property inspection inside and out",
        "Identify entry points and nesting locations",
        "Determine best control method (trapping, exclusion, baiting)",
        "Implement strategic treatment plan",
        "Seal entry points to prevent return",
        "Follow-up visits to ensure complete elimination",
      ]}
      additionalSections={
        <>
          <HealthRisksSection />
          <ControlMethodsSection />
          <DamageSection />
        </>
      }
      specialNote="Rodents can fit through holes as small as ¼ inch. Our exclusion services identify and seal all potential entry points for a permanent solution."
    />
  )
}

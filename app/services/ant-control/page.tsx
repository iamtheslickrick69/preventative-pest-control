import { ServicePageTemplate } from "@/components/service-page-template"
import { Bug } from "lucide-react"

const antSpecies = [
  {
    name: "Carpenter Ants",
    size: "¼ to ½ inch long",
    color: "Black or reddish brown",
    habitat: "Damp or decaying wood, logs, trees, wooden structures",
    issue: "Found inside homes with moisture damage",
  },
  {
    name: "Pavement Ants",
    size: "⅛ inch",
    color: "Dark brown to black with parallel ridges on head and thorax",
    habitat: "Cracks in pavement, driveways, sidewalks, building foundations",
    issue: "Trail along kitchen floors or counters hunting for food",
  },
  {
    name: "Pharaoh Ants",
    size: "1/16 inch",
    color: "Yellow to light brown with slightly darker abdomen",
    habitat: "Warm, humid indoor spaces (hospitals, apartments, grocery stores)",
    issue: "Difficult to eliminate due to multiple colonies",
  },
  {
    name: "Fire Ants",
    size: "⅛–¼ inch long",
    color: "Reddish-brown body with darker abdomen",
    habitat: "Open, sunny areas like fields, parks, and lawns",
    issue: "Aggressive with painful sting",
  },
  {
    name: "Harvester Ants",
    size: "¼ to ½ inch",
    color: "Reddish, orange, or brown with large mandibles and spines",
    habitat: "Dry, open areas like deserts and grasslands",
    issue: "Painful sting, can damage crops",
  },
]

function AntSpeciesSection() {
  return (
    <section className="py-16 px-4 bg-brand-green/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-brand-green/10 text-brand-green text-sm font-medium px-4 py-2 rounded-full mb-4">
            <Bug className="h-4 w-4" />
            Species Identification
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-4">Common Ant Species in Southern Utah</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Understanding the type of ant infestation helps us create the most effective treatment plan.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {antSpecies.map((species) => (
            <div key={species.name} className="bg-white rounded-2xl p-6 border border-brand-green/10 shadow-sm">
              <h3 className="font-bold text-foreground text-lg mb-3">{species.name}</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Size:</span>
                  <span className="text-foreground font-medium">{species.size}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Color:</span>
                  <span className="text-foreground font-medium text-right max-w-[60%]">{species.color}</span>
                </div>
                <div className="pt-2 border-t border-brand-green/10">
                  <p className="text-muted-foreground mb-1">Habitat:</p>
                  <p className="text-foreground text-xs">{species.habitat}</p>
                </div>
                <div className="pt-2 border-t border-brand-green/10">
                  <p className="text-amber-600 text-xs font-medium">{species.issue}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function AntControlPage() {
  return (
    <ServicePageTemplate
      title="Ant Control"
      subtitle="Aggressive ant control services for Southern Utah properties"
      description="Ants are prevalent year-round in Southern Utah due to warm weather and easily accessible homes and businesses. Our expert technicians eliminate colonies at the source."
      heroImage="/ant-infestation-home-kitchen-trail.jpg"
      pestImage="/images/pests/ant.png"
      urgency="medium"
      signs={[
        "Ants in areas where food is stored",
        "Damage to wood or signs of sawdust (carpenter ants)",
        "Ant hills or ant trails on property or in home",
        "Regular sightings near oils, meats, fats, and sugars",
        "Small piles of dirt near cracks in pavement or foundation",
      ]}
      approach={[
        "Expert pest control specialists evaluate your situation",
        "Create customized plan of action based on ant species",
        "Utilize advanced, pet- and child-friendly technology",
        "Treat both interior and exterior problem areas",
        "Identify and address areas vulnerable to future infestations",
        "Follow-up visits to ensure complete elimination",
      ]}
      additionalSections={<AntSpeciesSection />}
    />
  )
}

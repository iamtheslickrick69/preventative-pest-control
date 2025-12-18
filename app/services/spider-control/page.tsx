import { ServicePageTemplate } from "@/components/service-page-template"
import { Bug, AlertTriangle } from "lucide-react"

const spiderTypes = [
  { name: "Black Widow Spider", danger: "high", description: "Venomous - seek medical attention if bitten" },
  { name: "Wolf Spider", danger: "low", description: "Large but not dangerous to humans" },
  { name: "Woodlouse Spider", danger: "low", description: "Reddish color, found in damp areas" },
  { name: "Jumping Spider", danger: "low", description: "Small, quick movements, harmless" },
  { name: "Large Orb Spider", danger: "low", description: "Creates large webs, not aggressive" },
]

function SpiderTypesSection() {
  return (
    <section className="py-16 px-4 bg-brand-green/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-brand-green/10 text-brand-green text-sm font-medium px-4 py-2 rounded-full mb-4">
            <Bug className="h-4 w-4" />
            Local Species
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-4">Common Spiders in St. George</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            While few spiders in our area are dangerous to humans, all are a bother. Here are the most common species we
            encounter.
          </p>
        </div>
        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
          {spiderTypes.map((spider) => (
            <div
              key={spider.name}
              className={`bg-white rounded-xl p-4 border shadow-sm ${
                spider.danger === "high" ? "border-red-200 bg-red-50" : "border-brand-green/10"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                {spider.danger === "high" && <AlertTriangle className="h-4 w-4 text-red-500" />}
                <h3 className="font-bold text-foreground text-sm">{spider.name}</h3>
              </div>
              <p className={`text-xs ${spider.danger === "high" ? "text-red-600" : "text-muted-foreground"}`}>
                {spider.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ChallengeSection() {
  return (
    <section className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-amber-50 rounded-2xl p-8 border border-amber-200">
          <h3 className="text-lg font-bold text-foreground mb-4">Why Spider Control is Challenging</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-amber-500 mt-2" />
                <span className="text-foreground text-sm">Small, fast, and difficult to treat</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-amber-500 mt-2" />
                <span className="text-foreground text-sm">Most over-the-counter pesticides are ineffective</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-amber-500 mt-2" />
                <span className="text-foreground text-sm">
                  Reproduction through egg sacks makes elimination difficult
                </span>
              </li>
            </ul>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-amber-500 mt-2" />
                <span className="text-foreground text-sm">Visible spiders are only part of the problem</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-amber-500 mt-2" />
                <span className="text-foreground text-sm">Hidden egg sacks hatch and restart infestation</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-amber-500 mt-2" />
                <span className="text-foreground text-sm">Prefer dark, moist places like basements and attics</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function SpiderControlPage() {
  return (
    <ServicePageTemplate
      title="Spider Control"
      subtitle="Expert spider control for the 4,000+ species in the United States"
      description="While few spiders are dangerous to humans, all are a bother. Spiders prefer dark, moist places like basements, attics, crawl spaces, or closets. Our barrier treatments keep them out."
      heroImage="/spider-web-corner-basement-dark.jpg"
      pestImage="/images/pests/spider.png"
      urgency="medium"
      heroVideo="https://pub-7824dae2ffd24193b52760c54972be1d.r2.dev/00spider2222.mp4"
      heroVideoFilter="none"
      signs={[
        "Spider burrows in tight spaces throughout your home",
        "Increase in cobwebs around home interior and exterior",
        "Painful spider bites showing up regularly on household members",
        "Egg sacks in corners, closets, or storage areas",
        "Multiple spider sightings in short time periods",
      ]}
      approach={[
        "Comprehensive inspection of interior and exterior",
        "Identify entry points and nesting locations",
        "Apply professional-grade barrier treatments",
        "Target egg sacks to prevent future hatching",
        "Seal problem areas vulnerable to future infestation",
        "Ongoing prevention through scheduled treatments",
      ]}
      additionalSections={
        <>
          <SpiderTypesSection />
          <ChallengeSection />
        </>
      }
      specialNote="Black Widow spiders are present in Southern Utah. If you suspect a Black Widow infestation or have been bitten, seek medical attention immediately and contact us for urgent service."
    />
  )
}

"use client"

import * as React from "react"
import { ChevronDown, Phone } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

type ServiceDetail = {
  id: string
  name: string
  headline: string
  description: string[]
  signs: string[]
  approach: string[]
}

const SERVICES_DETAILS: ServiceDetail[] = [
  {
    id: "ant",
    name: "Ant Control",
    headline: "St. George-Based Aggressive Ant Control",
    description: [
      "Aggressive ant control services for Southern Utah properties. Ants are prevalent year-round due to warm weather and easily accessible homes and businesses.",
      "We handle all species including Carpenter Ants, Pavement Ants, Pharaoh Ants, Fire Ants, and Harvester Ants using advanced, pet- and child-friendly technology.",
    ],
    signs: [
      "Ants in areas where food is stored",
      "Damage to wood or signs of sawdust",
      "Ant hills or ant trails on property or in home",
      "Regular sightings near oils, meats, fats, and sugars",
    ],
    approach: [
      "Expert pest control specialists evaluate situation",
      "Create customized plan of action",
      "Utilize advanced, pet- and child-friendly technology",
      "Identify and address problem areas vulnerable to future infestations",
    ],
  },
  {
    id: "cockroach",
    name: "Cockroach Control",
    headline: "100% Satisfaction Guarantee - Only Dead Roaches",
    description: [
      "Professional cockroach control for St. George and surrounding areas. Southern Utah's warm climate creates perfect breeding ground for cockroaches.",
      "Cockroaches carry bacteria and allergens that can negatively impact health. We eliminate roaches at every life stage.",
    ],
    signs: [
      "Small, dark droppings resembling coffee grounds",
      "Musty or oily odor, especially in confined spaces",
      "Egg cases (oval-shaped and brown) in hidden corners",
      "Visible cockroaches scurrying when lights are turned on",
    ],
    approach: [
      "Detailed inspection to locate hiding spots and entry points",
      "Targeted treatments including safe insecticides and baits",
      "Eliminate roaches at every life stage",
      "Post-treatment monitoring and preventative tips",
    ],
  },
  {
    id: "scorpion",
    name: "Scorpion Control",
    headline: "Aggressive Desert Scorpion Elimination",
    description: [
      "Aggressive scorpion control for Southern Utah's desert-like climate. Scorpions are dangerous to humans with stings causing swelling, pain, numbness, and other symptoms.",
      "We provide year-round scorpion-free protection for your home and family.",
    ],
    signs: [
      "Small, dark, cylindrical droppings in attics, garages, or basements",
      "Shed exoskeletons in hidden areas",
      "Increased insect activity (scorpion food source)",
      "Rustling sounds especially at night",
    ],
    approach: [
      "Thorough property inspection",
      "Locate entry points and problem areas",
      "Advanced technology for complete elimination",
      "Implement preventative measures for year-round protection",
    ],
  },
  {
    id: "termite",
    name: "Termite Control",
    headline: "Prevent Thousands in Structural Damage",
    description: [
      "Southern Utah's choice termite exterminators. Termites can cause severe structural damage that costs thousands to repair.",
      "Southern Utah's desert terrain has heavy termite presence, making infestations more likely. We handle both Subterranean and Drywood termites.",
    ],
    signs: [
      "Termite sightings in and around home",
      "Swarm of winged termites or discarded wings",
      "Mud tubes in structure or ground around home",
      "Discolored or drooping drywall",
    ],
    approach: [
      "Conduct thorough inspection",
      "Check for potential points of entry",
      "Effectively seal entry points",
      "Prevent future termite problems with advanced technology",
    ],
  },
  {
    id: "rodent",
    name: "Rodent Control",
    headline: "Comprehensive Trapping, Exclusion & Baiting",
    description: [
      "Comprehensive rodent control services. Rodents are sneaky, fast, and fit through even smallest holes and cracks.",
      "Rodents carry dangerous diseases including Hantavirus and Leptospirosis. They also chew through wiring and destroy foundations.",
    ],
    signs: [
      "Burrows in garden or nests on property",
      "Tears or tooth marks on food packages",
      "Mouse/rat droppings, trails of urine, or footprints",
      "Gnaw marks on wooden surfaces",
    ],
    approach: [
      "Trapping for rats and mice inside buildings",
      "Exclusion - seal entry points larger than ¼ inch",
      "Baiting in locked tamper-proof containers",
      "Permanent solution to rodent issues",
    ],
  },
  {
    id: "bedbug",
    name: "Bed Bug Control",
    headline: "5-Star Bed Bug Elimination with Follow-Up",
    description: [
      "5-star bed bug control team for St. George and surrounding cities. Bed bugs pose serious health risks and cause interior property damage.",
      "We provide diligent inspection of every square inch, thorough elimination, and mattress encasements for complete eradication.",
    ],
    signs: [
      "Itchy bites in clusters or lines on exposed skin",
      "Rusty or red stains on bed sheets or mattresses",
      "Small, white, oval eggs in mattress seams",
      "Musty, sweet smell around bed",
    ],
    approach: [
      "Diligent inspection of every square inch",
      "Locate problem areas and entry points",
      "Seal mattresses with bed bug-resistant encasements",
      "Follow-up visits to ensure no return",
    ],
  },
]

export function ServiceAccordion() {
  const [openId, setOpenId] = React.useState<string | null>(null)

  return (
    <div className="space-y-3">
      {SERVICES_DETAILS.map((service) => (
        <div key={service.id} className="rounded-xl border border-brand-green/20 bg-white overflow-hidden">
          <button
            onClick={() => setOpenId(openId === service.id ? null : service.id)}
            className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-brand-green/5 transition-colors"
          >
            <span className="font-semibold text-foreground">{service.name}</span>
            <ChevronDown
              className={cn(
                "h-5 w-5 text-brand-green transition-transform duration-200",
                openId === service.id && "rotate-180",
              )}
            />
          </button>
          <div
            className={cn(
              "overflow-hidden transition-all duration-300",
              openId === service.id ? "max-h-[800px]" : "max-h-0",
            )}
          >
            <div className="px-6 pb-6 space-y-4">
              <h4 className="text-lg font-bold text-brand-green">{service.headline}</h4>
              {service.description.map((para, i) => (
                <p key={i} className="text-muted-foreground">
                  {para}
                </p>
              ))}

              <div className="grid md:grid-cols-2 gap-4 pt-2">
                <div className="bg-red-50 rounded-lg p-4">
                  <h5 className="font-semibold text-red-700 mb-2">Signs of Infestation</h5>
                  <ul className="space-y-1">
                    {service.signs.map((sign, i) => (
                      <li key={i} className="text-sm text-red-600 flex items-start gap-2">
                        <span className="text-red-400 mt-1">•</span>
                        {sign}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-brand-green/5 rounded-lg p-4">
                  <h5 className="font-semibold text-brand-green mb-2">Our Approach</h5>
                  <ul className="space-y-1">
                    {service.approach.map((step, i) => (
                      <li key={i} className="text-sm text-foreground flex items-start gap-2">
                        <span className="text-brand-green font-bold">{i + 1}.</span>
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-brand-green text-white font-semibold px-6 py-3 rounded-xl hover:bg-brand-green/90 transition-colors"
              >
                <Phone className="h-4 w-4" />
                Book {service.name}
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

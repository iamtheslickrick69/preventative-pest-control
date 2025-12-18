import Link from "next/link"
import { MapPin, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CountyCardProps {
  name: string
  state: string
  cities: string[]
  description: string
  href: string
  pests: string[]
}

export function CountyCard({ name, state, cities, description, href, pests }: CountyCardProps) {
  return (
    <div className="bg-white border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:border-brand-green/30">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-foreground">{name}</h3>
          <p className="text-sm text-muted-foreground">{state}</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-brand-green/10 flex items-center justify-center">
          <MapPin className="w-5 h-5 text-brand-green" />
        </div>
      </div>

      <p className="text-muted-foreground text-sm mb-4">{description}</p>

      <div className="mb-4">
        <p className="text-xs font-semibold text-foreground uppercase tracking-wide mb-2">Cities Served</p>
        <p className="text-sm text-muted-foreground">{cities.join(" • ")}</p>
      </div>

      <div className="mb-6">
        <p className="text-xs font-semibold text-foreground uppercase tracking-wide mb-2">Common Pests</p>
        <div className="flex flex-wrap gap-2">
          {pests.slice(0, 4).map((pest) => (
            <span key={pest} className="text-xs bg-brand-green/10 text-brand-green px-2 py-1 rounded-full">
              {pest}
            </span>
          ))}
        </div>
      </div>

      <Link href={href}>
        <Button
          variant="outline"
          className="w-full group border-brand-green text-brand-green hover:bg-brand-green hover:text-white bg-transparent"
        >
          View Coverage
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </Link>
    </div>
  )
}

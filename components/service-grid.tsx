"use client"

import * as React from "react"
import {
  ArrowDown,
  ArrowUp,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Search,
  Bug,
  Phone,
} from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

type Service = {
  id: string
  name: string
  pestType: string
  category: "Insects" | "Rodents" | "Arachnids" | "Other"
  bestFor: string
  serviceArea: string
  urgency: "Same-Day" | "Scheduled" | "Inspection"
  startingPrice: string
  description: string
}

type SortConfig = {
  key: keyof Service
  direction: "asc" | "desc"
} | null

const SERVICES_DATA: Service[] = [
  {
    id: "ant",
    name: "Ant Control",
    pestType: "Carpenter, Pavement, Fire, Pharaoh, Harvester Ants",
    category: "Insects",
    bestFor: "Homes & Businesses",
    serviceArea: "All Counties",
    urgency: "Scheduled",
    startingPrice: "$39.95*",
    description:
      "Aggressive ant control for Southern Utah. We eliminate carpenter ants, fire ants, and more using pet-friendly technology.",
  },
  {
    id: "cockroach",
    name: "Cockroach Control",
    pestType: "All Cockroach Species",
    category: "Insects",
    bestFor: "Kitchens & Restaurants",
    serviceArea: "All Counties",
    urgency: "Same-Day",
    startingPrice: "$39.95*",
    description:
      "100% satisfaction guarantee - only dead roaches after service. Targeted treatments at every life stage.",
  },
  {
    id: "mosquito",
    name: "Mosquito Control",
    pestType: "Mosquitoes (Seasonal May-Oct)",
    category: "Insects",
    bestFor: "Outdoor Living Spaces",
    serviceArea: "All Counties",
    urgency: "Scheduled",
    startingPrice: "$49.95*",
    description:
      "Revolutionary In2Care system with WHO-approved ingredients. Pet and people-friendly mosquito elimination.",
  },
  {
    id: "spider",
    name: "Spider Control",
    pestType: "Black Widow, Wolf Spider, Jumping Spider",
    category: "Arachnids",
    bestFor: "Desert Properties",
    serviceArea: "All Counties",
    urgency: "Scheduled",
    startingPrice: "$39.95*",
    description:
      "Expert spider control including dangerous black widows. Barrier protection prevents future infestations.",
  },
  {
    id: "scorpion",
    name: "Scorpion Control",
    pestType: "Bark Scorpions, Desert Scorpions",
    category: "Arachnids",
    bestFor: "Desert Properties",
    serviceArea: "Washington/Iron",
    urgency: "Same-Day",
    startingPrice: "$59.95*",
    description: "Aggressive scorpion elimination for Southern Utah's desert climate. Year-round protection available.",
  },
  {
    id: "termite",
    name: "Termite Control",
    pestType: "Subterranean, Drywood Termites",
    category: "Insects",
    bestFor: "Older Homes",
    serviceArea: "All Counties",
    urgency: "Inspection",
    startingPrice: "Free Est*",
    description: "Prevent thousands in structural damage. Thorough inspection and sealing of all entry points.",
  },
  {
    id: "rodent",
    name: "Rodent Control",
    pestType: "Mice, Rats, Field Rodents",
    category: "Rodents",
    bestFor: "All Properties",
    serviceArea: "All Counties",
    urgency: "Same-Day",
    startingPrice: "$59.95*",
    description: "Trapping, exclusion, and baiting services. Seal entry points for permanent rodent-free living.",
  },
  {
    id: "earwig",
    name: "Earwig Control",
    pestType: "Earwigs",
    category: "Insects",
    bestFor: "Gardens & Bathrooms",
    serviceArea: "All Counties",
    urgency: "Scheduled",
    startingPrice: "$39.95*",
    description: "25+ years experience eliminating earwigs. Preventative steps to stop re-entry.",
  },
  {
    id: "bedbug",
    name: "Bed Bug Control",
    pestType: "Bed Bugs (All Life Stages)",
    category: "Insects",
    bestFor: "Bedrooms & Hotels",
    serviceArea: "All Counties",
    urgency: "Same-Day",
    startingPrice: "$99.95*",
    description: "5-star bed bug elimination with follow-up visits. Mattress encasements included.",
  },
  {
    id: "commercial",
    name: "Commercial Pest Control",
    pestType: "All Commercial Pests",
    category: "Other",
    bestFor: "Businesses & Facilities",
    serviceArea: "All Counties",
    urgency: "Scheduled",
    startingPrice: "Custom Quote",
    description: "IPM plans for restaurants, offices, warehouses, healthcare. AIB certified technicians available.",
  },
]

export function ServiceGrid() {
  const [sortConfig, setSortConfig] = React.useState<SortConfig>(null)
  const [filterText, setFilterText] = React.useState("")
  const [categoryFilter, setCategoryFilter] = React.useState<string>("All")
  const [urgencyFilter, setUrgencyFilter] = React.useState<string>("All")
  const [currentPage, setCurrentPage] = React.useState(1)
  const pageSize = 5

  // Filtering
  const filteredData = React.useMemo(() => {
    return SERVICES_DATA.filter((service) => {
      const matchesText = Object.values(service).some((value) =>
        String(value).toLowerCase().includes(filterText.toLowerCase()),
      )
      const matchesCategory = categoryFilter === "All" || service.category === categoryFilter
      const matchesUrgency = urgencyFilter === "All" || service.urgency === urgencyFilter
      return matchesText && matchesCategory && matchesUrgency
    })
  }, [filterText, categoryFilter, urgencyFilter])

  // Sorting
  const sortedData = React.useMemo(() => {
    if (!sortConfig) return filteredData
    return [...filteredData].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1
      }
      return 0
    })
  }, [filteredData, sortConfig])

  // Pagination
  const totalPages = Math.ceil(sortedData.length / pageSize)
  const paginatedData = sortedData.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  const handleSort = (key: keyof Service) => {
    setSortConfig((current) => {
      if (current?.key === key) {
        if (current.direction === "asc") return { key, direction: "desc" }
        return null
      }
      return { key, direction: "asc" }
    })
  }

  return (
    <div className="w-full space-y-4">
      {/* Filters */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search services or pests..."
            className="h-10 w-full rounded-lg border border-brand-green/20 bg-white px-10 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20"
            value={filterText}
            onChange={(e) => {
              setFilterText(e.target.value)
              setCurrentPage(1)
            }}
          />
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={categoryFilter}
            onChange={(e) => {
              setCategoryFilter(e.target.value)
              setCurrentPage(1)
            }}
            className="h-10 rounded-lg border border-brand-green/20 bg-white px-4 text-sm text-foreground focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20"
          >
            <option value="All">All Pest Types</option>
            <option value="Insects">Insects</option>
            <option value="Rodents">Rodents</option>
            <option value="Arachnids">Arachnids</option>
            <option value="Other">Other</option>
          </select>
          <select
            value={urgencyFilter}
            onChange={(e) => {
              setUrgencyFilter(e.target.value)
              setCurrentPage(1)
            }}
            className="h-10 rounded-lg border border-brand-green/20 bg-white px-4 text-sm text-foreground focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20"
          >
            <option value="All">All Urgency Levels</option>
            <option value="Same-Day">Same-Day Available</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Inspection">Inspection First</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className="rounded-xl border border-brand-green/20 bg-white overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-brand-green/5 text-foreground font-medium border-b border-brand-green/10">
              <tr>
                {[
                  { key: "name", label: "Service" },
                  { key: "pestType", label: "Pest Type" },
                  { key: "bestFor", label: "Best For" },
                  { key: "serviceArea", label: "Service Area" },
                  { key: "urgency", label: "Urgency" },
                  { key: "startingPrice", label: "Starting At" },
                ].map((col) => (
                  <th
                    key={col.key}
                    className="px-4 py-4 font-semibold cursor-pointer hover:bg-brand-green/10 transition-colors select-none"
                    onClick={() => handleSort(col.key as keyof Service)}
                  >
                    <div className="flex items-center gap-1">
                      {col.label}
                      {sortConfig?.key === col.key &&
                        (sortConfig.direction === "asc" ? (
                          <ArrowUp className="h-3 w-3 text-brand-green" />
                        ) : (
                          <ArrowDown className="h-3 w-3 text-brand-green" />
                        ))}
                    </div>
                  </th>
                ))}
                <th className="px-4 py-4 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-green/5">
              {paginatedData.map((service) => (
                <tr key={service.id} className="group transition-colors hover:bg-brand-green/5">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-brand-green/10 flex items-center justify-center">
                        <Bug className="h-5 w-5 text-brand-green" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{service.name}</p>
                        <p className="text-xs text-muted-foreground max-w-[200px] truncate">{service.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-muted-foreground text-xs max-w-[180px]">{service.pestType}</td>
                  <td className="px-4 py-4 text-muted-foreground">{service.bestFor}</td>
                  <td className="px-4 py-4 text-muted-foreground">{service.serviceArea}</td>
                  <td className="px-4 py-4">
                    <span
                      className={cn(
                        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
                        service.urgency === "Same-Day" && "bg-brand-orange/10 text-brand-orange",
                        service.urgency === "Scheduled" && "bg-brand-green/10 text-brand-green",
                        service.urgency === "Inspection" && "bg-amber-500/10 text-amber-600",
                      )}
                    >
                      {service.urgency}
                    </span>
                  </td>
                  <td className="px-4 py-4 font-semibold text-brand-green">{service.startingPrice}</td>
                  <td className="px-4 py-4">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-1.5 rounded-lg bg-brand-green px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-brand-green/90"
                    >
                      <Phone className="h-3 w-3" />
                      Book Now
                    </Link>
                  </td>
                </tr>
              ))}
              {paginatedData.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-muted-foreground">
                    No services found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-brand-green/10 bg-brand-green/5 px-4 py-3">
          <div className="text-xs text-muted-foreground">
            Showing <span className="font-medium text-foreground">{(currentPage - 1) * pageSize + 1}</span> to{" "}
            <span className="font-medium text-foreground">{Math.min(currentPage * pageSize, sortedData.length)}</span>{" "}
            of <span className="font-medium text-foreground">{sortedData.length}</span> services
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-brand-green/20 bg-white text-muted-foreground transition-colors hover:bg-brand-green/5 hover:text-foreground disabled:opacity-50 disabled:pointer-events-none"
            >
              <ChevronsLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-brand-green/20 bg-white text-muted-foreground transition-colors hover:bg-brand-green/5 hover:text-foreground disabled:opacity-50 disabled:pointer-events-none"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-sm text-muted-foreground min-w-[4rem] text-center">
              {currentPage} / {totalPages || 1}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages || totalPages === 0}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-brand-green/20 bg-white text-muted-foreground transition-colors hover:bg-brand-green/5 hover:text-foreground disabled:opacity-50 disabled:pointer-events-none"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages || totalPages === 0}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-brand-green/20 bg-white text-muted-foreground transition-colors hover:bg-brand-green/5 hover:text-foreground disabled:opacity-50 disabled:pointer-events-none"
            >
              <ChevronsRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <p className="text-xs text-muted-foreground text-center">
        *Prices shown are starting prices with a signed service agreement. Actual pricing may vary based on property
        size and infestation severity.
      </p>
    </div>
  )
}

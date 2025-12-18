"use client"

import { useState } from "react"
import Link from "next/link"

const counties = [
  {
    id: "washington",
    name: "Washington County",
    state: "Utah",
    cities: ["St. George", "Hurricane", "Washington", "Ivins", "Santa Clara", "LaVerkin"],
    path: "M 50 120 L 150 100 L 180 150 L 160 200 L 80 190 Z",
    center: { x: 115, y: 150 },
    href: "/service-areas/washington-county",
  },
  {
    id: "iron",
    name: "Iron County",
    state: "Utah",
    cities: ["Cedar City", "Parowan", "Enoch", "Brian Head"],
    path: "M 50 40 L 150 30 L 150 100 L 50 120 Z",
    center: { x: 100, y: 70 },
    href: "/service-areas/iron-county",
  },
  {
    id: "clark",
    name: "Clark County",
    state: "Nevada",
    cities: ["Mesquite", "Bunkerville"],
    path: "M 180 150 L 280 130 L 300 200 L 260 250 L 160 200 Z",
    center: { x: 230, y: 185 },
    href: "/service-areas/clark-county",
  },
]

export function CountyMap() {
  const [hoveredCounty, setHoveredCounty] = useState<string | null>(null)

  return (
    <div className="relative">
      <svg
        viewBox="0 0 350 280"
        className="w-full max-w-2xl mx-auto"
        style={{ filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.1))" }}
      >
        {/* Background */}
        <rect x="0" y="0" width="350" height="280" fill="oklch(0.96 0.01 85)" rx="12" />

        {/* State labels */}
        <text x="80" y="20" className="fill-muted-foreground text-xs font-medium">
          UTAH
        </text>
        <text x="250" y="120" className="fill-muted-foreground text-xs font-medium">
          NEVADA
        </text>

        {/* County paths */}
        {counties.map((county) => (
          <Link key={county.id} href={county.href}>
            <g
              onMouseEnter={() => setHoveredCounty(county.id)}
              onMouseLeave={() => setHoveredCounty(null)}
              className="cursor-pointer transition-all duration-300"
            >
              <path
                d={county.path}
                fill={hoveredCounty === county.id ? "oklch(0.35 0.15 150)" : "oklch(0.45 0.12 150)"}
                stroke="white"
                strokeWidth="2"
                className="transition-all duration-300"
              />
              <text
                x={county.center.x}
                y={county.center.y}
                textAnchor="middle"
                className="fill-white text-[10px] font-bold pointer-events-none"
              >
                {county.name.replace(" County", "")}
              </text>
            </g>
          </Link>
        ))}

        {/* St. George marker */}
        <g>
          <circle cx="115" cy="165" r="6" fill="oklch(0.65 0.25 35)" stroke="white" strokeWidth="2" />
          <text x="115" y="185" textAnchor="middle" className="fill-foreground text-[9px] font-semibold">
            St. George HQ
          </text>
        </g>
      </svg>

      {/* Hover tooltip */}
      {hoveredCounty && (
        <div className="absolute top-4 right-4 bg-white border border-border rounded-lg p-4 shadow-lg min-w-[200px]">
          {counties
            .filter((c) => c.id === hoveredCounty)
            .map((county) => (
              <div key={county.id}>
                <h4 className="font-bold text-foreground">{county.name}</h4>
                <p className="text-sm text-muted-foreground mb-2">{county.state}</p>
                <p className="text-xs text-muted-foreground">Cities served:</p>
                <p className="text-sm text-foreground">{county.cities.join(", ")}</p>
              </div>
            ))}
        </div>
      )}
    </div>
  )
}

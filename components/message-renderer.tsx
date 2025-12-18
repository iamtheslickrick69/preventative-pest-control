"use client"

import Link from "next/link"

// Map of keywords to service page URLs
const SERVICE_LINKS: Record<string, string> = {
  // Pests
  scorpion: "/services/scorpion-control",
  scorpions: "/services/scorpion-control",
  spider: "/services/spider-control",
  spiders: "/services/spider-control",
  "black widow": "/services/spider-control",
  "black widows": "/services/spider-control",
  ant: "/services/ant-control",
  ants: "/services/ant-control",
  carpenter: "/services/ant-control",
  "fire ant": "/services/ant-control",
  cockroach: "/services/cockroach-control",
  cockroaches: "/services/cockroach-control",
  roach: "/services/cockroach-control",
  roaches: "/services/cockroach-control",
  mosquito: "/services/mosquito-control",
  mosquitoes: "/services/mosquito-control",
  termite: "/services/termite-control",
  termites: "/services/termite-control",
  rodent: "/services/rodent-control",
  rodents: "/services/rodent-control",
  mouse: "/services/rodent-control",
  mice: "/services/rodent-control",
  rat: "/services/rodent-control",
  rats: "/services/rodent-control",
  "bed bug": "/services/bed-bug-control",
  "bed bugs": "/services/bed-bug-control",
  earwig: "/services/earwig-control",
  earwigs: "/services/earwig-control",

  // General pages
  services: "/services",
  pricing: "/contact",
  contact: "/contact",
  reviews: "/reviews",
  blog: "/blog",

  // Service areas
  "st. george": "/service-areas/washington-county",
  "st george": "/service-areas/washington-county",
  hurricane: "/service-areas/washington-county",
  ivins: "/service-areas/washington-county",
  "santa clara": "/service-areas/washington-county",
  washington: "/service-areas/washington-county",
  "cedar city": "/service-areas/iron-county",
  mesquite: "/service-areas/clark-county",
}

interface MessageRendererProps {
  content: string
}

export function MessageRenderer({ content }: MessageRendererProps) {
  // Parse the content and replace keywords with links
  const parseContent = (text: string) => {
    const parts: (string | JSX.Element)[] = []
    let lastIndex = 0

    // Sort keywords by length (longest first) to match longer phrases first
    const sortedKeywords = Object.keys(SERVICE_LINKS).sort((a, b) => b.length - a.length)

    // Find all matches
    const matches: Array<{ keyword: string; index: number; length: number }> = []

    for (const keyword of sortedKeywords) {
      const regex = new RegExp(`\\b${keyword}\\b`, "gi")
      let match

      while ((match = regex.exec(text)) !== null) {
        // Check if this position is already matched by a longer keyword
        const overlaps = matches.some(
          (m) => match.index >= m.index && match.index < m.index + m.length
        )

        if (!overlaps) {
          matches.push({
            keyword: match[0],
            index: match.index,
            length: match[0].length,
          })
        }
      }
    }

    // Sort matches by index
    matches.sort((a, b) => a.index - b.index)

    // Build the result with links
    for (const match of matches) {
      // Add text before the match
      if (match.index > lastIndex) {
        parts.push(text.slice(lastIndex, match.index))
      }

      // Add the link
      const url = SERVICE_LINKS[match.keyword.toLowerCase()]
      parts.push(
        <Link
          key={`${match.index}-${match.keyword}`}
          href={url}
          className="text-[#16a34a] hover:text-[#15803d] underline font-medium transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          {match.keyword}
        </Link>
      )

      lastIndex = match.index + match.length
    }

    // Add remaining text
    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex))
    }

    return parts.length > 0 ? parts : [text]
  }

  // Split by newlines and preserve formatting
  const lines = content.split("\n")

  return (
    <div className="text-sm leading-relaxed">
      {lines.map((line, lineIndex) => (
        <div key={lineIndex}>
          {parseContent(line)}
          {lineIndex < lines.length - 1 && <br />}
        </div>
      ))}
    </div>
  )
}

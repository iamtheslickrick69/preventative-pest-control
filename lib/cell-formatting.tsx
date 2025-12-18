"use client"

import type React from "react"

export function formatCellValue(
  value: string,
  columnType: string,
  formattedValueCache: React.MutableRefObject<Map<string, React.ReactNode>>,
  columnId: string,
): React.ReactNode {
  if (!value || value.trim() === "") return <span className="text-muted-foreground text-xs">—</span>

  const cacheKey = `${columnId}:${value}`
  if (formattedValueCache.current.has(cacheKey)) {
    return formattedValueCache.current.get(cacheKey)
  }

  let formattedValue: React.ReactNode

  switch (columnType) {
    case "number": {
      const numValue = Number.parseFloat(value.replace(/,/g, ""))
      if (!isNaN(numValue)) {
        formattedValue = (
          <span className="truncate text-sm block text-right font-mono" title={value}>
            {numValue.toLocaleString()}
          </span>
        )
      } else {
        formattedValue = (
          <span className="truncate text-sm block text-right" title={value}>
            {value}
          </span>
        )
      }
      break
    }

    case "date": {
      const dateValue = new Date(value)
      if (!isNaN(dateValue.getTime())) {
        const formatted = dateValue.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
        formattedValue = (
          <span className="truncate text-sm block" title={value}>
            {formatted}
          </span>
        )
      } else {
        formattedValue = (
          <span className="truncate text-sm block" title={value}>
            {value}
          </span>
        )
      }
      break
    }

    case "boolean": {
      const boolValue = value.toLowerCase()
      const isTrue = boolValue === "true" || boolValue === "yes" || boolValue === "1"
      formattedValue = (
        <span className="truncate text-sm block" title={value}>
          {isTrue ? "✓ Yes" : "✗ No"}
        </span>
      )
      break
    }

    case "url": {
      formattedValue = (
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 underline text-sm truncate block max-w-full"
          onClick={(e) => e.stopPropagation()}
          title={value}
        >
          {value}
        </a>
      )
      break
    }

    case "email": {
      formattedValue = (
        <a
          href={`mailto:${value}`}
          className="text-blue-600 hover:text-blue-800 underline text-sm truncate block max-w-full"
          onClick={(e) => e.stopPropagation()}
          title={value}
        >
          {value}
        </a>
      )
      break
    }

    default: {
      // Check for URL pattern
      const urlPattern = /^https?:\/\/[^\s]+$/i
      if (urlPattern.test(value.trim())) {
        formattedValue = (
          <a
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline text-sm truncate block max-w-full"
            onClick={(e) => e.stopPropagation()}
            title={value}
          >
            {value}
          </a>
        )
      }
      // Check for email pattern
      else if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
        formattedValue = (
          <a
            href={`mailto:${value}`}
            className="text-blue-600 hover:text-blue-800 underline text-sm truncate block max-w-full"
            onClick={(e) => e.stopPropagation()}
            title={value}
          >
            {value}
          </a>
        )
      } else {
        formattedValue = (
          <span className="truncate text-sm block" title={value}>
            {value}
          </span>
        )
      }
    }
  }

  // Cache the formatted value (limit cache size to prevent memory issues)
  if (formattedValueCache.current.size > 10000) {
    formattedValueCache.current.clear()
  }
  formattedValueCache.current.set(cacheKey, formattedValue)

  return formattedValue
}

"use client"

import * as React from "react"
import {
  ArrowDown,
  ArrowUp,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Download,
  Filter,
  MoreHorizontal,
  Search,
  Check,
} from "lucide-react"
import { cn } from "@/lib/utils"

// Types
type Row = {
  id: string
  name: string
  company: string
  role: string
  status: "Active" | "Pending" | "Inactive"
  lastActive: string
  usage: number
}

type SortConfig = {
  key: keyof Row
  direction: "asc" | "desc"
} | null

// Mock Data Generator
const generateData = (count: number): Row[] => {
  const statuses: Row["status"][] = ["Active", "Pending", "Inactive"]
  const roles = ["Developer", "Designer", "Product Manager", "Admin", "User"]
  const companies = ["Acme Inc", "Vercel", "Stripe", "Linear", "Raycast", "Supabase"]

  return Array.from({ length: count }).map((_, i) => ({
    id: `user_${i + 1}`,
    name: `User ${i + 1}`,
    company: companies[Math.floor(Math.random() * companies.length)],
    role: roles[Math.floor(Math.random() * roles.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    lastActive: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toLocaleDateString(),
    usage: Math.floor(Math.random() * 10000),
  }))
}

const INITIAL_DATA = generateData(100)

export function InteractiveGrid() {
  const [data] = React.useState<Row[]>(INITIAL_DATA)
  const [sortConfig, setSortConfig] = React.useState<SortConfig>(null)
  const [filterText, setFilterText] = React.useState("")
  const [selectedRows, setSelectedRows] = React.useState<Set<string>>(new Set())
  const [currentPage, setCurrentPage] = React.useState(1)
  const [pageSize, setPageSize] = React.useState(10)

  // Filtering
  const filteredData = React.useMemo(() => {
    return data.filter((row) =>
      Object.values(row).some((value) => String(value).toLowerCase().includes(filterText.toLowerCase())),
    )
  }, [data, filterText])

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

  // Handlers
  const handleSort = (key: keyof Row) => {
    setSortConfig((current) => {
      if (current?.key === key) {
        if (current.direction === "asc") return { key, direction: "desc" }
        return null
      }
      return { key, direction: "asc" }
    })
  }

  const toggleRow = (id: string) => {
    setSelectedRows((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const toggleAll = () => {
    if (selectedRows.size === paginatedData.length) {
      setSelectedRows(new Set())
    } else {
      setSelectedRows(new Set(paginatedData.map((row) => row.id)))
    }
  }

  return (
    <div className="w-full space-y-4">
      {/* Toolbar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Filter rows..."
            className="h-9 w-full rounded-md border border-black/10 bg-white px-9 py-1 text-sm text-foreground placeholder:text-muted-foreground focus:border-black/20 focus:outline-none focus:ring-1 focus:ring-black/20"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex h-9 items-center justify-center gap-2 rounded-md border border-black/10 bg-black/5 px-4 text-sm font-medium text-foreground transition-colors hover:bg-black/10">
            <Filter className="h-4 w-4" />
            Filter
          </button>
          <button className="inline-flex h-9 items-center justify-center gap-2 rounded-md border border-black/10 bg-black/5 px-4 text-sm font-medium text-foreground transition-colors hover:bg-black/10">
            <Download className="h-4 w-4" />
            Export
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="rounded-lg border border-black/10 bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-black/5 text-muted-foreground font-medium">
              <tr>
                <th className="w-[40px] px-4 py-3">
                  <div className="flex items-center">
                    <button
                      onClick={toggleAll}
                      className={cn(
                        "h-4 w-4 rounded border border-black/20 flex items-center justify-center transition-colors",
                        selectedRows.size === paginatedData.length && paginatedData.length > 0
                          ? "bg-black text-white border-black"
                          : "hover:border-black/40",
                      )}
                    >
                      {selectedRows.size === paginatedData.length && paginatedData.length > 0 && (
                        <Check className="h-3 w-3" />
                      )}
                    </button>
                  </div>
                </th>
                {[
                  { key: "name", label: "Name" },
                  { key: "company", label: "Company" },
                  { key: "role", label: "Role" },
                  { key: "status", label: "Status" },
                  { key: "usage", label: "Usage" },
                  { key: "lastActive", label: "Last Active" },
                ].map((col) => (
                  <th
                    key={col.key}
                    className="px-4 py-3 font-medium cursor-pointer hover:text-foreground transition-colors select-none"
                    onClick={() => handleSort(col.key as keyof Row)}
                  >
                    <div className="flex items-center gap-1">
                      {col.label}
                      {sortConfig?.key === col.key &&
                        (sortConfig.direction === "asc" ? (
                          <ArrowUp className="h-3 w-3" />
                        ) : (
                          <ArrowDown className="h-3 w-3" />
                        ))}
                    </div>
                  </th>
                ))}
                <th className="w-[40px] px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {paginatedData.map((row) => (
                <tr
                  key={row.id}
                  className={cn(
                    "group transition-colors hover:bg-black/5",
                    selectedRows.has(row.id) && "bg-black/[0.02]",
                  )}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      <button
                        onClick={() => toggleRow(row.id)}
                        className={cn(
                          "h-4 w-4 rounded border border-black/20 flex items-center justify-center transition-colors",
                          selectedRows.has(row.id) ? "bg-black text-white border-black" : "hover:border-black/40",
                        )}
                      >
                        {selectedRows.has(row.id) && <Check className="h-3 w-3" />}
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-medium text-foreground">{row.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.company}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.role}</td>
                  <td className="px-4 py-3">
                    <span
                      className={cn(
                        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
                        row.status === "Active" && "bg-emerald-500/10 text-emerald-600",
                        row.status === "Pending" && "bg-amber-500/10 text-amber-600",
                        row.status === "Inactive" && "bg-black/10 text-muted-foreground",
                      )}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground font-mono text-xs">
                    {row.usage.toLocaleString()} reqs
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{row.lastActive}</td>
                  <td className="px-4 py-3">
                    <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-black/10 rounded transition-all">
                      <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                    </button>
                  </td>
                </tr>
              ))}
              {paginatedData.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-muted-foreground">
                    No results found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-black/10 bg-black/5 px-4 py-3">
          <div className="text-xs text-muted-foreground">
            Showing <span className="font-medium text-foreground">{(currentPage - 1) * pageSize + 1}</span> to{" "}
            <span className="font-medium text-foreground">{Math.min(currentPage * pageSize, sortedData.length)}</span>{" "}
            of <span className="font-medium text-foreground">{sortedData.length}</span> results
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 mr-4">
              <span className="text-xs text-muted-foreground">Rows per page</span>
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value))
                  setCurrentPage(1)
                }}
                className="h-7 rounded border border-black/10 bg-white px-2 text-xs text-foreground focus:border-black/20 focus:outline-none"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className="inline-flex h-7 w-7 items-center justify-center rounded border border-black/10 bg-white text-muted-foreground transition-colors hover:bg-black/5 hover:text-foreground disabled:opacity-50 disabled:pointer-events-none"
              >
                <ChevronsLeft className="h-3 w-3" />
              </button>
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="inline-flex h-7 w-7 items-center justify-center rounded border border-black/10 bg-white text-muted-foreground transition-colors hover:bg-black/5 hover:text-foreground disabled:opacity-50 disabled:pointer-events-none"
              >
                <ChevronLeft className="h-3 w-3" />
              </button>
              <span className="text-xs text-muted-foreground min-w-[3rem] text-center">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="inline-flex h-7 w-7 items-center justify-center rounded border border-black/10 bg-white text-muted-foreground transition-colors hover:bg-black/5 hover:text-foreground disabled:opacity-50 disabled:pointer-events-none"
              >
                <ChevronRight className="h-3 w-3" />
              </button>
              <button
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                className="inline-flex h-7 w-7 items-center justify-center rounded border border-black/10 bg-white text-muted-foreground transition-colors hover:bg-black/5 hover:text-foreground disabled:opacity-50 disabled:pointer-events-none"
              >
                <ChevronsRight className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

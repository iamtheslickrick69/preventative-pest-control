import type { Table } from "@tanstack/react-table"

export function detectColumnType(
  columnName: string,
  data: Record<string, string>[],
): "string" | "number" | "date" | "boolean" | "url" | "email" {
  // Sample first 100 rows for type detection
  const sampleSize = Math.min(100, data.length)
  const samples = data
    .slice(0, sampleSize)
    .map((row) => row[columnName])
    .filter((val) => val && val.trim() !== "")

  if (samples.length === 0) return "string"

  // Check for boolean (true/false, yes/no, 1/0)
  const booleanPattern = /^(true|false|yes|no|1|0)$/i
  const booleanCount = samples.filter((val) => booleanPattern.test(val.trim())).length
  if (booleanCount / samples.length > 0.8) return "boolean"

  // Check for URL
  const urlPattern = /^https?:\/\/[^\s]+$/i
  const urlCount = samples.filter((val) => urlPattern.test(val.trim())).length
  if (urlCount / samples.length > 0.8) return "url"

  // Check for email
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const emailCount = samples.filter((val) => emailPattern.test(val.trim())).length
  if (emailCount / samples.length > 0.8) return "email"

  // Check for number
  const numberPattern = /^-?\d+\.?\d*$/
  const numberCount = samples.filter((val) => numberPattern.test(val.trim().replace(/,/g, ""))).length
  if (numberCount / samples.length > 0.8) return "number"

  // Check for date (ISO format, common formats)
  const datePattern = /^\d{4}-\d{2}-\d{2}|\d{1,2}\/\d{1,2}\/\d{2,4}|\d{1,2}-\d{1,2}-\d{2,4}/
  const dateCount = samples.filter((val) => {
    if (!datePattern.test(val.trim())) return false
    const parsed = new Date(val.trim())
    return !isNaN(parsed.getTime())
  }).length
  if (dateCount / samples.length > 0.8) return "date"

  return "string"
}

export function autoSizeColumn(columnId: string, tableInstance: Table<Record<string, string>>) {
  const column = tableInstance.getAllColumns().find((col) => col.id === columnId)
  if (!column) return

  // Calculate the max content width for this column
  const rows = tableInstance.getFilteredRowModel().rows
  let maxWidth = 100 // Minimum width

  // Measure header text
  const headerText = columnId
  maxWidth = Math.max(maxWidth, headerText.length * 8 + 60) // Approximate width

  // Measure cell content (sample first 100 rows for performance)
  const sampleSize = Math.min(100, rows.length)
  for (let i = 0; i < sampleSize; i++) {
    const value = rows[i]?.getValue(columnId) as string
    if (value) {
      const contentWidth = Math.min(value.length * 7, 500) // Cap at 500px
      maxWidth = Math.max(maxWidth, contentWidth)
    }
  }

  // Set the column size (capped between minSize and maxSize)
  const finalWidth = Math.min(Math.max(maxWidth, 100), 500)
  tableInstance.setColumnSizing((old) => ({
    ...old,
    [columnId]: finalWidth,
  }))
}

export function autoSizeAllColumns(tableInstance: Table<Record<string, string>>) {
  const visibleColumns = tableInstance.getAllColumns().filter((col) => col.getIsVisible() && col.id !== "select")
  visibleColumns.forEach((column) => {
    autoSizeColumn(column.id, tableInstance)
  })
}

export function downloadCSV(
  tableInstance: Table<Record<string, string>>,
  tableData: Record<string, string>[],
  rowSelection: Record<string, boolean>,
  fileName: string | undefined,
  selectedOnly = false,
) {
  if (!tableInstance || tableData.length === 0) return

  // Get filtered and sorted rows from the table
  const filteredRows = tableInstance.getFilteredRowModel().rows
  const rowsToExport = selectedOnly ? filteredRows.filter((row) => rowSelection[row.index]) : filteredRows

  if (selectedOnly && rowsToExport.length === 0) {
    alert("No rows selected. Please select rows to export.")
    return
  }

  // Get visible columns in their current order (including pinned columns)
  const visibleColumns = tableInstance.getAllColumns().filter((col) => col.getIsVisible() && col.id !== "select")
  const columnHeaders = visibleColumns.map((col) => col.id)

  // Build CSV with visible columns only
  const csvLines = [columnHeaders.map((h) => `"${h}"`).join(",")]
  rowsToExport.forEach((row) => {
    const rowValues = columnHeaders.map((header) => `"${row.original[header] || ""}"`)
    csvLines.push(rowValues.join(","))
  })

  const csvText = csvLines.join("\n")
  const blob = new Blob([csvText], { type: "text/csv" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = selectedOnly
    ? `selected_${rowsToExport.length}_rows_${fileName || "output.csv"}`
    : `filtered_${rowsToExport.length}_rows_${fileName || "output.csv"}`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

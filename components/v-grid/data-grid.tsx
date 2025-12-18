"use client"

import type React from "react"

import { useState, useCallback, useEffect, useMemo, useRef } from "react"
import Papa from "papaparse"
import { Button } from "@/components/ui/button"
import { ArrowUp, ArrowDown, Pin, PinOff, Filter, X, ChevronDown, Maximize2, Calendar, Hash, Type, Link, Mail, CheckSquare, FileSpreadsheet } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  type ColumnDef,
  type VisibilityState,
  type ColumnResizeMode,
  type RowSelectionState,
  type SortingState,
  type ColumnPinningState,
  type Table,
} from "@tanstack/react-table"
import { useVirtualizer } from "@tanstack/react-virtual"
import { parseCSVRow } from "@/lib/csv-utils"
import type { FilterOperator, ColumnFilterWithOperator, EditAction, UndoRedoState } from "./types"
import { TableRoot } from "./table-root"
import { autoSizeColumn, autoSizeAllColumns } from "@/lib/table-utils"
import { useToast } from "@/hooks/use-toast"
import { Skeleton } from "@/components/ui/skeleton"

const STORAGE_KEY = "v-grid-data"
const MAX_HISTORY = 50

interface DataGridProps {
  onStateChange?: (state: {
    headers: string[]
    tableData: Record<string, any>[]
    fileName: string
    columnFilters: ColumnFilterWithOperator[]
    globalFilter: string
    columnFilterOperators: Record<string, FilterOperator>
    columnTypes: Record<string, "string" | "number" | "date" | "boolean" | "url" | "email">
    sorting: SortingState
    columnPinning: ColumnPinningState
    columnVisibility: VisibilityState
    rowSelection: RowSelectionState
    totalColumns: number
    visibleColumns: number
    totalRows: number
    displayedRows: number
    actions: {
      clearData: () => void
      undo: () => void
      redo: () => void
      pasteFromClipboard: () => void
      addNewRows: (count: number) => void
      duplicateSelectedRows: () => void
      downloadCSV: (selectedOnly: boolean) => void
      downloadJSON: (selectedOnly: boolean) => void
      openSearchReplace: () => void
      openBulkEdit: () => void
      openKeyboardShortcuts: () => void
      handleFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void
      loadCSV: () => void
    }
    // Control functions
    toggleColumn: (columnId: string, visible?: boolean) => void
    setRowRange: (range: { start: number; end: number } | null) => void
    setGlobalFilter: (search: string) => void // Added setGlobalFilter
    applyFilters: (filters: Array<{ column: string; operator: string; value: string }>) => void // Added applyFilters
    applySorting: (sorts: Array<{ column: string; direction: 'asc' | 'desc' }>) => void
    canUndo: boolean
    canRedo: boolean
    hasSelection: boolean
    hasData: boolean
    hasFile: boolean
    processing: boolean
  }) => void
  scrollContainerRef?: React.RefObject<HTMLDivElement> // Added scrollContainerRef prop
}

export function DataGrid({ onStateChange, scrollContainerRef }: DataGridProps) {
  const { toast } = useToast()
  const [file, setFile] = useState<File | null>(null)
  const [fileName, setFileName] = useState<string>("")
  const [isDragging, setIsDragging] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [tableData, setTableData] = useState<{ [key: string]: any }[]>([])
  const [headers, setHeaders] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const rowsPerPage = 500
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})

  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [columnResizeMode] = useState<ColumnResizeMode>("onChange")
  const tableContainerRef = useRef<HTMLDivElement>(null)

  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState("")
  const [globalFilterInput, setGlobalFilterInput] = useState("")
  const [columnFilters, setColumnFilters] = useState<ColumnFilterWithOperator[]>([])
  const [columnFilterInputs, setColumnFilterInputs] = useState<Record<string, string>>({})
  const [columnFilterOperators, setColumnFilterOperators] = useState<Record<string, FilterOperator>>({})
  const [columnPinning, setColumnPinning] = useState<ColumnPinningState>({ left: [], right: [] })
  const [editingCell, setEditingCell] = useState<{ rowIndex: number; columnId: string } | null>(null)
  const [editValue, setEditValue] = useState("")

  const [flashingCells, setFlashingCells] = useState<Set<string>>(new Set())

  const [undoRedoState, setUndoRedoState] = useState<UndoRedoState>({ past: [], future: [] })

  const persistTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const formattedValueCache = useRef<Map<string, React.ReactNode>>(new Map())

  const [table, setTable] = useState<Table<Record<string, any>> | null>(null)

  const [columnTypes, setColumnTypes] = useState<
    Record<string, "string" | "number" | "date" | "boolean" | "url" | "email">
  >({})

  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false)

  const [showSearchReplace, setShowSearchReplace] = useState(false)
  const [searchText, setSearchText] = useState("")
  const [replaceText, setReplaceText] = useState("")
  const [searchColumn, setSearchColumn] = useState<string>("all")
  const [showBulkEdit, setShowBulkEdit] = useState(false)
  const [bulkEditValue, setBulkEditValue] = useState("")
  const [bulkEditColumn, setBulkEditColumn] = useState("")

  const [isSaving, setIsSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)

  const [rowRange, setRowRange] = useState<{ start: number; end: number } | null>(null)

  const [isLoading, setIsLoading] = useState(false)

  const detectColumnType = useCallback(
    (columnName: string, data: Record<string, any>[]): "string" | "number" | "date" | "boolean" | "url" | "email" => {
      const sampleSize = Math.min(100, data.length)
      const samples = data
        .slice(0, sampleSize)
        .map((row) => {
          const val = row[columnName]
          if (val === null || val === undefined) return ""
          if (typeof val === "object") return JSON.stringify(val)
          return String(val)
        })
        .filter((val) => val && val.trim() !== "")

      if (samples.length === 0) return "string"

      const booleanPattern = /^(true|false|yes|no|1|0)$/i
      const booleanCount = samples.filter((val) => booleanPattern.test(val.trim())).length
      if (booleanCount / samples.length > 0.8) return "boolean"

      const urlPattern = /^https?:\/\/[^\s]+$/i
      const urlCount = samples.filter((val) => urlPattern.test(val.trim())).length
      if (urlCount / samples.length > 0.8) return "url"

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      const emailCount = samples.filter((val) => emailPattern.test(val.trim())).length
      if (emailCount / samples.length > 0.8) return "email"

      const numberPattern = /^-?\d+\.?\d*$/
      const numberCount = samples.filter((val) => numberPattern.test(val.trim().replace(/,/g, ""))).length
      if (numberCount / samples.length > 0.8) return "number"

      const datePattern = /^\d{4}-\d{2}-\d{2}|\d{1,2}\/\d{1,2}\/\d{2,4}|\d{1,2}-\d{1,2}-\d{2,4}/
      const dateCount = samples.filter((val) => {
        if (!datePattern.test(val.trim())) return false
        const parsed = new Date(val.trim())
        return !isNaN(parsed.getTime())
      }).length
      if (dateCount / samples.length > 0.8) return "date"

      return "string"
    },
    [],
  )

  const clearData = useCallback(() => {
    setHeaders([])
    setTableData([])
    setFileName("")
    setColumnFilters([])
    setGlobalFilter("")
    setColumnFilterOperators({})
    localStorage.removeItem(STORAGE_KEY)
    setFile(null)
    setCurrentPage(1)
    setColumnVisibility({})
    setRowSelection({})
    setTable(null)
    setColumnTypes({})
    setGlobalFilterInput("")
    setColumnFilterInputs({})
    setUndoRedoState({ past: [], future: [] })
    setLastSaved(null)
    setIsSaving(false)
    setRowRange(null)
    toast({
      title: "Data Cleared",
      description: "All table data has been cleared",
    })
  }, [toast])

  const undo = useCallback(() => {
    if (undoRedoState.past.length === 0) return

    const action = undoRedoState.past[undoRedoState.past.length - 1]
    const newPast = undoRedoState.past.slice(0, -1)

    if (
      action.type === "edit" &&
      action.data.rowIndex !== undefined &&
      action.data.columnId &&
      action.data.oldValue !== undefined
    ) {
      const updatedData = [...tableData]
      updatedData[action.data.rowIndex][action.data.columnId] = action.data.oldValue
      setTableData(updatedData)
    } else if (action.type === "edit" && action.data.oldRows) {
      setTableData(action.data.oldRows)
    } else if (action.type === "delete" && action.data.oldRows) {
      setTableData(action.data.oldRows)
    }

    setUndoRedoState({
      past: newPast,
      future: [action, ...undoRedoState.future],
    })

    toast({
      title: "Undone",
      description: "Action has been undone",
    })
  }, [undoRedoState, tableData, toast])

  const redo = useCallback(() => {
    if (undoRedoState.future.length === 0) return

    const action = undoRedoState.future[0]
    const newFuture = undoRedoState.future.slice(1)

    if (
      action.type === "edit" &&
      action.data.rowIndex !== undefined &&
      action.data.columnId &&
      action.data.newValue !== undefined
    ) {
      const updatedData = [...tableData]
      updatedData[action.data.rowIndex][action.data.columnId] = action.data.newValue
      setTableData(updatedData)
    } else if (action.type === "edit" && action.data.newRows) {
      setTableData(action.data.newRows)
    } else if (action.type === "delete" && action.data.rowIndices) {
      const newTableData = tableData.filter((_, index) => !action.data.rowIndices?.includes(index))
      setTableData(newTableData)
    }

    setUndoRedoState({
      past: [...undoRedoState.past, action],
      future: newFuture,
    })

    toast({
      title: "Redone",
      description: "Action has been redone",
    })
  }, [undoRedoState, tableData, toast])

  const pasteFromClipboard = useCallback(async () => {
    try {
      const text = await navigator.clipboard.readText()
      const lines = text.split("\n").filter((line) => line.trim())

      if (lines.length === 0) {
        toast({
          title: "No Data",
          description: "Clipboard is empty or contains no valid data",
          variant: "destructive",
        })
        return
      }

      const firstRow = parseCSVRow(lines[0])
      const parsedHeaders = firstRow.map((h) => String(h).trim())

      const dataRows: { [key: string]: any }[] = []

      for (let i = 1; i < lines.length; i++) {
        const row = parseCSVRow(lines[i])
        const rowObject: { [key: string]: any } = {}
        parsedHeaders.forEach((header, idx) => {
          rowObject[header] = row[idx] || ""
        })
        dataRows.push(rowObject)
      }

      const detectedTypes: Record<string, "string" | "number" | "date" | "boolean" | "url" | "email"> = {}
      parsedHeaders.forEach((header) => {
        detectedTypes[header] = detectColumnType(header, dataRows)
      })
      setColumnTypes(detectedTypes)

      setHeaders(parsedHeaders)
      setTableData(dataRows)
      setCurrentPage(1)
      setRowSelection({})
      setTable(null)
      setUndoRedoState({ past: [], future: [] })
      setRowRange(null)

      toast({
        title: "Data Pasted",
        description: `${dataRows.length} rows imported from clipboard`,
      })
    } catch (error) {
      console.error("[VGrid] Error pasting from clipboard:", error)
      toast({
        title: "Paste Error",
        description: "Failed to paste data from clipboard",
        variant: "destructive",
      })
    }
  }, [detectColumnType, toast])

  const addNewRows = useCallback(
    (count = 1) => {
      const newRows: Record<string, any>[] = []
      for (let i = 0; i < count; i++) {
        const newRow: Record<string, any> = {}
        headers.forEach((header) => {
          newRow[header] = ""
        })
        newRows.push(newRow)
      }

      const updatedData = [...tableData, ...newRows]
      setTableData(updatedData)

      toast({
        title: "Rows Added",
        description: `${count} new row(s) have been added`,
      })
    },
    [headers, tableData, toast],
  )

  const duplicateSelectedRows = useCallback(() => {
    if (!table || Object.keys(rowSelection).length === 0) return

    const selectedIndices = Object.keys(rowSelection)
      .filter((key) => rowSelection[key])
      .map((key) => Number.parseInt(key))

    const rowsToDuplicate = selectedIndices.map((index) => ({ ...tableData[index] }))
    const newTableData = [...tableData, ...rowsToDuplicate]
    setTableData(newTableData)
    setRowSelection({})

    toast({
      title: "Rows Duplicated",
      description: `${rowsToDuplicate.length} row(s) have been duplicated`,
    })
  }, [table, rowSelection, tableData, toast])

  const downloadCSV = useCallback(
    (selectedOnly = false) => {
      if (!table || tableData.length === 0) return

      const filteredRows = table.getFilteredRowModel().rows
      const rowsToExport = selectedOnly ? filteredRows.filter((row) => rowSelection[row.index]) : filteredRows

      if (selectedOnly && rowsToExport.length === 0) {
        toast({
          title: "No Selection",
          description: "No rows selected. Please select rows to export.",
          variant: "destructive",
        })
        return
      }

      const visibleColumns = table.getAllColumns().filter((col) => col.getIsVisible() && col.id !== "select")
      const columnHeaders = visibleColumns.map((col) => col.id)

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
        ? `selected_${rowsToExport.length}_rows_${file?.name || "output.csv"}`
        : `filtered_${rowsToExport.length}_rows_${file?.name || "output.csv"}`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    },
    [table, tableData, file, rowSelection, toast],
  )

  const downloadJSON = useCallback(
    (selectedOnly = false) => {
      if (!table || tableData.length === 0) return

      const filteredRows = table.getFilteredRowModel().rows
      const rowsToExport = selectedOnly ? filteredRows.filter((row) => rowSelection[row.index]) : filteredRows

      if (selectedOnly && rowsToExport.length === 0) {
        toast({
          title: "No Selection",
          description: "No rows selected. Please select rows to export.",
          variant: "destructive",
        })
        return
      }

      const visibleColumns = table.getAllColumns().filter((col) => col.getIsVisible() && col.id !== "select")
      const jsonData = rowsToExport.map((row) => {
        const obj: Record<string, any> = {}
        visibleColumns.forEach((col) => {
          obj[col.id] = row.original[col.id] || ""
        })
        return obj
      })

      const jsonText = JSON.stringify(jsonData, null, 2)
      const blob = new Blob([jsonText], { type: "application/json" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = selectedOnly
        ? `selected_${rowsToExport.length}_rows_${file?.name?.replace(".csv", ".json") || "output.json"}`
        : `filtered_${rowsToExport.length}_rows_${file?.name?.replace(".csv", ".json") || "output.json"}`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      toast({
        title: "JSON Exported",
        description: `${rowsToExport.length} rows exported as JSON`,
      })
    },
    [table, tableData, file, rowSelection, toast],
  )

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file && file.type === "text/csv") {
        setFileName(file.name)
        Papa.parse(file, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const data = results.data as { [key: string]: any }[]
            const cols = results.meta.fields || []
            setHeaders(cols)
            setTableData(data)
            setColumnFilters([])
            setGlobalFilter("")
            setColumnFilterOperators({})
            setFile(file)
            setCurrentPage(1)
            setColumnVisibility({})
            setRowSelection({})
            setTable(null)
            const detectedTypes: Record<string, "string" | "number" | "date" | "boolean" | "url" | "email"> = {}
            cols.forEach((header) => {
              detectedTypes[header] = detectColumnType(header, data)
            })
            setColumnTypes(detectedTypes)
            setGlobalFilterInput("")
            setColumnFilterInputs({})
            setUndoRedoState({ past: [], future: [] })
            setRowRange(null)
            toast({
              title: "File Loaded",
              description: `${data.length} rows loaded from ${file.name}`,
            })
          },
          error: (error) => {
            console.error("PapaParse Error:", error)
            toast({
              title: "Parse Error",
              description: `Error parsing CSV: ${error.message}`,
              variant: "destructive",
            })
          },
        })
      }
    },
    [toast, detectColumnType],
  )

  const loadCSV = useCallback(async () => {
    if (!file) return

    setProcessing(true)
    setIsLoading(true)

    try {
      const text = await file.text()
      const lines = text.split("\n")
      const nonEmptyLines = lines.filter((line) => line.trim() !== "")
      if (nonEmptyLines.length === 0) {
        toast({
          title: "Empty File",
          description: "The CSV file appears to be empty",
          variant: "destructive",
        })
        setProcessing(false)
        setIsLoading(false)
        return
      }

      const firstRow = parseCSVRow(nonEmptyLines[0])
      const parsedHeaders = firstRow.map((h) => String(h).trim())

      const dataRows: { [key: string]: any }[] = []

      for (let i = 1; i < nonEmptyLines.length; i++) {
        const row = parseCSVRow(nonEmptyLines[i])
        const rowObject: { [key: string]: any } = {}
        parsedHeaders.forEach((header, idx) => {
          rowObject[header] = row[idx] || ""
        })
        dataRows.push(rowObject)
      }

      const detectedTypes: Record<string, "string" | "number" | "date" | "boolean" | "url" | "email"> = {}
      parsedHeaders.forEach((header) => {
        detectedTypes[header] = detectColumnType(header, dataRows)
      })
      setColumnTypes(detectedTypes)

      setHeaders(parsedHeaders)
      setTableData(dataRows)
      const initialVisibility: VisibilityState = {}
      parsedHeaders.forEach((h) => {
        initialVisibility[h] = true
      })
      setColumnVisibility(initialVisibility)
      setCurrentPage(1)
      setRowSelection({})
      setTable(null)
      setColumnFilterOperators({})
      setColumnFilterInputs({})
      setGlobalFilterInput("")
      setUndoRedoState({ past: [], future: [] })
      setRowRange(null)

      toast({
        title: "CSV Loaded",
        description: `Successfully loaded ${dataRows.length} rows`,
      })
    } catch (error) {
      console.error("[VGrid] Error loading CSV:", error)
      toast({
        title: "Load Error",
        description: "Error loading CSV: " + (error as Error).message,
        variant: "destructive",
      })
    } finally {
      setProcessing(false)
      setIsLoading(false)
    }
  }, [file, detectColumnType, toast])

  useEffect(() => {
    const loadInitialData = () => {
      setIsLoading(true)
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        try {
          const parsed = JSON.parse(stored)
          if (parsed.headers && parsed.tableData && parsed.tableData.length > 0) {
            setHeaders(parsed.headers)
            setTableData(parsed.tableData)
            setFileName(parsed.fileName || "")

            // Detect column types for loaded data
            const detectedTypes: Record<string, "string" | "number" | "date" | "boolean" | "url" | "email"> = {}
            parsed.headers.forEach((header: string) => {
              detectedTypes[header] = detectColumnType(header, parsed.tableData)
            })
            setColumnTypes(detectedTypes)
          }
        } catch (error) {
          console.error("Error loading from localStorage:", error)
        }
      }
      setIsLoading(false)
    }

    loadInitialData()
  }, [detectColumnType])

  const applyFiltersFromToolbar = useCallback((filters: Array<{ column: string; operator: string; value: string }>) => {
    const newColumnFilters: ColumnFilterWithOperator[] = filters.map(f => ({
      id: f.column,
      value: f.value,
      operator: f.operator as FilterOperator,
    }))

    const newOperators: Record<string, FilterOperator> = {}
    filters.forEach(f => {
      newOperators[f.column] = f.operator as FilterOperator
    })

    setColumnFilters(newColumnFilters)
    setColumnFilterOperators(newOperators)

    // Also update the column filter inputs to reflect the applied filters
    const newInputs: Record<string, string> = {}
    filters.forEach(f => {
      if (f.operator !== 'isEmpty' && f.operator !== 'isNotEmpty') {
        newInputs[f.column] = f.value
      }
    })
    setColumnFilterInputs(newInputs)
  }, [])

  const applySortingFromToolbar = useCallback((sorts: Array<{ column: string; direction: 'asc' | 'desc' }>) => {
    const newSorting = sorts.map(s => ({
      id: s.column,
      desc: s.direction === 'desc',
    }))

    setSorting(newSorting)
  }, [])


  useEffect(() => {
    const visibleCount = headers.filter((header) => {
      // If columnVisibility is empty, all columns are visible
      if (Object.keys(columnVisibility).length === 0) return true
      // Otherwise check if column is explicitly visible (true or undefined means visible)
      return columnVisibility[header] !== false
    }).length

    onStateChange?.({
      headers,
      tableData,
      fileName,
      columnFilters,
      globalFilter,
      columnFilterOperators,
      columnTypes,
      sorting,
      columnPinning,
      columnVisibility,
      rowSelection,
      totalColumns: headers.length,
      visibleColumns: visibleCount, // Use properly calculated visible count
      totalRows: tableData.length,
      displayedRows: rowRange ? Math.min(rowRange.end, tableData.length) - rowRange.start + 1 : tableData.length,
      actions: {
        clearData,
        undo,
        redo,
        pasteFromClipboard,
        addNewRows,
        duplicateSelectedRows,
        downloadCSV,
        downloadJSON,
        openSearchReplace: () => setShowSearchReplace(true),
        openBulkEdit: () => setShowBulkEdit(true),
        openKeyboardShortcuts: () => setShowKeyboardShortcuts(true),
        handleFileSelect,
        loadCSV,
      },
      // Control functions
      toggleColumn: (columnId: string, visible?: boolean) => {
        setColumnVisibility((prev) => ({
          ...prev,
          [columnId]: visible !== undefined ? visible : !prev[columnId],
        }))
      },
      setRowRange: (range: { start: number; end: number } | null) => {
        console.log("Setting row range:", range)
        setRowRange(range)
      },
      setGlobalFilter: (search: string) => {
        setGlobalFilterInput(search)
      },
      applyFilters: applyFiltersFromToolbar,
      applySorting: applySortingFromToolbar,
      canUndo: undoRedoState.past.length > 0,
      canRedo: undoRedoState.future.length > 0,
      hasSelection: Object.keys(rowSelection).length > 0,
      hasData: tableData.length > 0,
      hasFile: file !== null,
      processing,
    })
  }, [
    headers,
    tableData,
    fileName,
    columnFilters,
    globalFilter,
    columnFilterOperators,
    columnTypes,
    sorting,
    columnPinning,
    columnVisibility,
    rowSelection,
    rowRange, // Add rowRange to dependencies
    undoRedoState,
    file,
    processing,
    clearData,
    undo,
    redo,
    pasteFromClipboard,
    addNewRows,
    duplicateSelectedRows,
    downloadCSV,
    downloadJSON,
    handleFileSelect,
    loadCSV,
    onStateChange,
    applyFiltersFromToolbar, // Add to dependencies
    applySortingFromToolbar, // Added applySortingFromToolbar to dependencies
  ])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleFileDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      const file = e.dataTransfer.files[0]
      if (file && file.type === "text/csv") {
        setFileName(file.name)
        Papa.parse(file, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const data = results.data as { [key: string]: any }[] // Changed type
            const cols = results.meta.fields || []
            setHeaders(cols)
            setTableData(data)
            setColumnFilters([])
            setGlobalFilter("")
            setColumnFilterOperators({})
            setFile(file)
            setCurrentPage(1)
            setColumnVisibility({})
            setRowSelection({})
            setTable(null)
            const detectedTypes: Record<string, "string" | "number" | "date" | "boolean" | "url" | "email"> = {}
            cols.forEach((header) => {
              detectedTypes[header] = detectColumnType(header, data)
            })
            setColumnTypes(detectedTypes)
            setGlobalFilterInput("")
            setColumnFilterInputs({})
            setUndoRedoState({ past: [], future: [] })
            setRowRange(null) // Clear row range
            toast({
              title: "File Loaded",
              description: `${data.length} rows loaded from ${file.name}`,
            })
          },
          error: (error) => {
            console.error("PapaParse Error:", error)
            toast({
              title: "Parse Error",
              description: `Error parsing CSV: ${error.message}`,
              variant: "destructive",
            })
          },
        })
      }
    },
    [toast, detectColumnType],
  )

  const handleCellEdit = useCallback(
    (rowIndex: number, columnId: string, value: any) => {
      // Changed type to any
      const oldValue = tableData[rowIndex][columnId]

      // Check if the value actually changed to prevent unnecessary history entries
      if (oldValue === value) {
        return
      }

      const action: EditAction = {
        type: "edit",
        timestamp: Date.now(),
        data: {
          rowIndex,
          columnId,
          oldValue,
          newValue: value,
        },
      }

      setUndoRedoState((prev) => ({
        past: [...prev.past.slice(-MAX_HISTORY + 1), action],
        future: [],
      }))

      const updatedData = [...tableData]
      updatedData[rowIndex][columnId] = value
      setTableData(updatedData)

      const cellKey = `${rowIndex}-${columnId}`
      setFlashingCells((prev) => new Set(prev).add(cellKey))

      setTimeout(() => {
        setFlashingCells((prev) => {
          const newSet = new Set(prev)
          newSet.delete(cellKey)
          return newSet
        })
      }, 1000)
    },
    [tableData],
  )

  const customFilterFn = useCallback(
    (row: any, columnId: string, filterValue: string) => {
      // Get raw value without type assertion and handle arrays/objects
      const cellValueRaw = row.getValue(columnId)
      let cellValue = ""
      if (cellValueRaw === null || cellValueRaw === undefined) {
        cellValue = ""
      } else if (typeof cellValueRaw === "object") {
        cellValue = JSON.stringify(cellValueRaw)
      } else {
        cellValue = String(cellValueRaw)
      }

      const operator = columnFilterOperators[columnId] || "contains"
      const searchValue = filterValue.toLowerCase()

      switch (operator) {
        case "equals":
          return cellValue.toLowerCase() === searchValue
        case "startsWith":
          return cellValue.toLowerCase().startsWith(searchValue)
        case "endsWith":
          return cellValue.toLowerCase().endsWith(searchValue)
        case "notContains":
          return !cellValue.toLowerCase().includes(searchValue)
        case "isEmpty":
          return cellValue.trim() === ""
        case "isNotEmpty":
          return cellValue.trim() !== ""
        case "contains":
        default:
          return cellValue.toLowerCase().includes(searchValue)
      }
    },
    [columnFilterOperators],
  )

  const formatCellValue = useCallback(
    (value: any, columnId: string): React.ReactNode => {
      let stringValue = ""
      if (value === null || value === undefined) {
        stringValue = ""
      } else if (typeof value === "object") {
        // Handle arrays and objects by converting to JSON string
        stringValue = JSON.stringify(value)
      } else {
        stringValue = String(value)
      }

      if (!stringValue || stringValue.trim() === "") {
        return <span className="text-muted-foreground text-xs">—</span>
      }

      const cacheKey = `${columnId}:${stringValue}`
      if (formattedValueCache.current.has(cacheKey)) {
        return formattedValueCache.current.get(cacheKey)
      }

      const columnType = columnTypes[columnId] || "string"
      let formattedValue: React.ReactNode

      switch (columnType) {
        case "number": {
          const numValue = Number.parseFloat(stringValue.replace(/,/g, ""))
          if (!isNaN(numValue)) {
            formattedValue = (
              <span className="truncate text-sm block text-right font-mono" title={stringValue}>
                {numValue.toLocaleString()}
              </span>
            )
          } else {
            formattedValue = (
              <span className="truncate text-sm block text-right" title={stringValue}>
                {stringValue}
              </span>
            )
          }
          break
        }

        case "date": {
          const dateValue = new Date(stringValue)
          if (!isNaN(dateValue.getTime())) {
            const formatted = dateValue.toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })
            formattedValue = (
              <span className="truncate text-sm block" title={stringValue}>
                {formatted}
              </span>
            )
          } else {
            formattedValue = (
              <span className="truncate text-sm block" title={stringValue}>
                {stringValue}
              </span>
            )
          }
          break
        }

        case "boolean": {
          const boolValue = stringValue.toLowerCase()
          const isTrue = boolValue === "true" || boolValue === "yes" || boolValue === "1"
          formattedValue = (
            <span className="truncate text-sm block" title={stringValue}>
              {isTrue ? "✓ Yes" : "✗ No"}
            </span>
          )
          break
        }

        case "url": {
          formattedValue = (
            <a
              href={stringValue}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline text-sm truncate block max-w-full"
              onClick={(e) => e.stopPropagation()}
              title={stringValue}
            >
              {stringValue}
            </a>
          )
          break
        }

        case "email": {
          formattedValue = (
            <a
              href={`mailto:${stringValue}`}
              className="text-blue-600 hover:text-blue-800 underline text-sm truncate block max-w-full"
              onClick={(e) => e.stopPropagation()}
              title={stringValue}
            >
              {stringValue}
            </a>
          )
          break
        }

        default: {
          formattedValue = (
            <span className="truncate text-sm block" title={stringValue}>
              {stringValue}
            </span>
          )
        }
      }

      formattedValueCache.current.set(cacheKey, formattedValue)

      if (formattedValueCache.current.size > 10000) {
        const firstKey = formattedValueCache.current.keys().next().value
        if (typeof firstKey === "string") {
          formattedValueCache.current.delete(firstKey)
        }
      }

      return formattedValue
    },
    [columnTypes],
  )

  const handleCellClick = useCallback(
    (rowIndex: number, columnId: string) => {
      const currentValue = tableData[rowIndex]?.[columnId]
      setEditingCell({ rowIndex, columnId })
      // Ensure editValue is always a string
      setEditValue(currentValue === null || currentValue === undefined ? "" : String(currentValue))
    },
    [tableData],
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, rowIndex: number, columnId: string) => {
      // Added Ctrl+C, Ctrl+V for copy/paste within cell edit and between cells
      if ((e.ctrlKey || e.metaKey) && e.key === "c" && !editingCell) {
        e.preventDefault()
        const value = tableData[rowIndex]?.[columnId] || ""
        navigator.clipboard.writeText(value).catch((err) => {
          console.error("[VGrid] Failed to copy:", err)
        })
        return
      }

      if ((e.ctrlKey || e.metaKey) && e.key === "v" && !editingCell) {
        e.preventDefault()
        navigator.clipboard
          .readText()
          .then((text) => {
            handleCellEdit(rowIndex, columnId, text)
          })
          .catch((err) => {
            console.error("[VGrid] Failed to paste:", err)
          })
        return
      }

      if (editingCell?.rowIndex === rowIndex && editingCell?.columnId === columnId) {
        if (e.key === "Escape") {
          e.preventDefault()
          setEditingCell(null)
        } else if (e.key === "Tab") {
          e.preventDefault()
          handleCellEdit(editingCell.rowIndex, editingCell.columnId, editValue)
          setEditingCell(null)
          const cellElement = document.getElementById(`cell-${rowIndex}-${columnId}`)
          let nextCell: Element | null = null
          if (cellElement) {
            nextCell = cellElement.nextElementSibling
          }
          ;(nextCell?.querySelector('[tabindex="0"]') as HTMLElement | null)?.focus()
        }
      } else {
        if (e.key === "Delete" || e.key === "Backspace") {
          e.preventDefault()
          handleCellEdit(rowIndex, columnId, "")
          return
        }

        if (e.key === "Enter" || e.key === "F2") {
          e.preventDefault()
          const currentValue = tableData[rowIndex]?.[columnId]
          setEditingCell({ rowIndex, columnId })
          // Ensure editValue is always a string
          setEditValue(currentValue === null || currentValue === undefined ? "" : String(currentValue))
        } else if (e.key === "ArrowRight") {
          e.preventDefault()
          const cellElement = document.getElementById(`cell-${rowIndex}-${columnId}`)
          const nextCell: Element | null = cellElement?.nextElementSibling ?? null
          if (nextCell) {
            const focusable = nextCell.querySelector('[tabindex="0"]') as HTMLElement | null
            focusable?.focus()
          }
        } else if (e.key === "ArrowLeft") {
          e.preventDefault()
          const prevCell = document
            .getElementById(`cell-${rowIndex}-${columnId}`)
            ?.previousElementSibling?.querySelector('[tabindex="0"]') as HTMLElement | null
          if (prevCell) {
            prevCell.focus()
          }
        } else if (e.key === "ArrowDown" && rowIndex < tableData.length - 1) {
          e.preventDefault()
          document.getElementById(`cell-${rowIndex + 1}-${columnId}`)?.focus()
        } else if (e.key === "ArrowUp" && rowIndex > 0) {
          e.preventDefault()
          document.getElementById(`cell-${rowIndex - 1}-${columnId}`)?.focus()
        }
      }
    },
    [editingCell, editValue, tableData, handleCellEdit],
  )

  const columnStatsCache = useMemo(() => {
    const cache = new Map<
      string,
      {
        filled: number
        percentage: number
        min?: number
        max?: number
        avg?: number
        median?: number
        sum?: number
      }
    >()
    if (tableData.length === 0) return cache

    headers.forEach((columnName) => {
      const filled = tableData.filter((row) => {
        const val = row[columnName]
        if (val === null || val === undefined) return false
        if (typeof val === "object") return true // Arrays and objects count as filled
        return String(val).trim() !== ""
      }).length
      const percentage = Math.round((filled / tableData.length) * 100)

      const stats: any = { filled, percentage }

      if (columnTypes[columnName] === "number") {
        const numericValues = tableData
          .map((row) => {
            const val = row[columnName]
            if (val === null || val === undefined) return null
            if (typeof val === "object") return null
            const strVal = String(val).trim().replace(/,/g, "")
            return strVal ? Number.parseFloat(strVal) : null
          })
          .filter((val): val is number => val !== null && !isNaN(val))

        if (numericValues.length > 0) {
          stats.min = Math.min(...numericValues)
          stats.max = Math.max(...numericValues)
          stats.sum = numericValues.reduce((a, b) => a + b, 0)
          stats.avg = stats.sum / numericValues.length

          // Calculate median
          const sorted = [...numericValues].sort((a, b) => a - b)
          const mid = Math.floor(sorted.length / 2)
          stats.median = sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid]
        }
      }

      cache.set(columnName, stats)
    })

    return cache
  }, [tableData, headers, columnTypes])

  const getColumnStats = useCallback(
    (columnName: string) => {
      return columnStatsCache.get(columnName) || { filled: 0, percentage: 0 }
    },
    [columnStatsCache],
  )

  // The following two download functions are duplicates of ones defined earlier.
  // The earlier ones are being kept as they are used in the `useEffect` hook.
  // This is a common pattern to avoid dependency issues with `onStateChange`.

  const searchAndReplace = useCallback(() => {
    if (!searchText) {
      toast({
        title: "Search Required",
        description: "Please enter text to search for",
        variant: "destructive",
      })
      return
    }

    let replacedCount = 0
    const updatedData = tableData.map((row, rowIndex) => {
      const newRow = { ...row }
      const columnsToSearch = searchColumn === "all" ? headers : [searchColumn]

      columnsToSearch.forEach((col) => {
        const currentValue = newRow[col]
        // Check if currentValue is a string before calling includes
        if (typeof currentValue === "string" && currentValue.includes(searchText)) {
          newRow[col] = currentValue.replace(new RegExp(searchText, "g"), replaceText)
          replacedCount++
        }
      })

      return newRow
    })

    if (replacedCount > 0) {
      const action: EditAction = {
        type: "edit",
        timestamp: Date.now(),
        data: {
          oldRows: tableData,
          newRows: updatedData,
        },
      }
      setUndoRedoState((prev) => ({
        past: [...prev.past.slice(-MAX_HISTORY + 1), action],
        future: [],
      }))

      setTableData(updatedData)
      toast({
        title: "Replace Complete",
        description: `Replaced ${replacedCount} occurrence(s)`,
      })
      setShowSearchReplace(false)
      setSearchText("")
      setReplaceText("")
    } else {
      toast({
        title: "No Matches",
        description: "No matches found for the search text",
      })
    }
  }, [searchText, replaceText, searchColumn, tableData, headers, toast])

  const bulkEditSelectedCells = useCallback(() => {
    if (!table || Object.keys(rowSelection).length === 0 || !bulkEditColumn) {
      toast({
        title: "Invalid Selection",
        description: "Please select rows and a column to edit",
        variant: "destructive",
      })
      return
    }

    const selectedIndices = Object.keys(rowSelection)
      .filter((key) => rowSelection[key])
      .map((key) => Number.parseInt(key))

    const action: EditAction = {
      type: "edit",
      timestamp: Date.now(),
      data: {
        oldRows: [...tableData],
      },
    }

    const updatedData = tableData.map((row, index) => {
      if (selectedIndices.includes(index)) {
        return { ...row, [bulkEditColumn]: bulkEditValue }
      }
      return row
    })

    setUndoRedoState((prev) => ({
      past: [...prev.past.slice(-MAX_HISTORY + 1), action],
      future: [],
    }))

    setTableData(updatedData)
    toast({
      title: "Bulk Edit Complete",
      description: `Updated ${selectedIndices.length} row(s) in column "${bulkEditColumn}"`,
    })
    setShowBulkEdit(false)
    setBulkEditValue("")
    setBulkEditColumn("")
  }, [table, rowSelection, bulkEditColumn, bulkEditValue, tableData, toast])

  // This addNewRows is a duplicate of one defined earlier.
  // The earlier one is being kept as it is used in the `useEffect` hook.
  // This is a common pattern to avoid dependency issues with `onStateChange`.

  const filteredTableData = useMemo(() => {
    if (!rowRange) return tableData
    const start = Math.max(0, rowRange.start - 1) // Convert to 0-based index
    const end = Math.min(tableData.length, rowRange.end)
    return tableData.slice(start, end)
  }, [tableData, rowRange])

  const columns = useMemo<ColumnDef<Record<string, any>>[]>(() => {
    // Changed type
    if (headers.length === 0) return []

    return headers.map((header) => ({
      accessorKey: header,
      filterFn: customFilterFn,
      header: ({ column }) => {
        const stats = getColumnStats(header)
        const isPinned = (columnPinning.left ?? []).includes(header) || (columnPinning.right ?? []).includes(header)
        const filterValue = (column.getFilterValue() as string) ?? ""
        const currentOperator = columnFilterOperators[header] || "contains"
        const columnType = columnTypes[header] || "string"

        const TypeIcon = {
          string: Type,
          number: Hash,
          date: Calendar,
          boolean: CheckSquare,
          url: Link,
          email: Mail
        }[columnType] || Type

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 hover:bg-accent font-medium justify-between text-xs w-full group"
              >
                <div className="flex items-center gap-2 truncate">
                  <TypeIcon className="h-3 w-3 text-muted-foreground/70" />
                  <span className="truncate">{header}</span>
                </div>
                <ChevronDown className="ml-1 h-3 w-3 flex-shrink-0 opacity-0 group-hover:opacity-50 transition-opacity" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuLabel className="text-xs">Column Options</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => column.toggleSorting(false)} className="text-xs">
                <ArrowUp className="mr-2 h-3 w-3" />
                Sort Ascending
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => column.toggleSorting(true)} className="text-xs">
                <ArrowDown className="mr-2 h-3 w-3" />
                Sort Descending
              </DropdownMenuItem>
              {column.getIsSorted() && (
                <DropdownMenuItem onClick={() => column.clearSorting()} className="text-xs">
                  <X className="mr-2 h-3 w-3" />
                  Clear Sort
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <div className="px-2 py-2 text-xs text-muted-foreground space-y-1">
                <div className="font-medium text-foreground mb-1">Statistics</div>
                <div>
                  Filled: {stats.filled} ({stats.percentage}%)
                </div>
                {stats.min !== undefined && (
                  <>
                    <div>Min: {stats.min.toLocaleString()}</div>
                    <div>Max: {stats.max?.toLocaleString()}</div>
                    <div>Avg: {stats.avg?.toFixed(2)}</div>
                    <div>Median: {stats.median?.toFixed(2)}</div>
                    <div>Sum: {stats.sum?.toLocaleString()}</div>
                  </>
                )}
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  if (isPinned) {
                    setColumnPinning((prev) => ({
                      left: (prev.left ?? []).filter((id) => id !== header),
                      right: (prev.right ?? []).filter((id) => id !== header),
                    }))
                  } else {
                    setColumnPinning((prev) => ({
                      ...prev,
                      left: [...(prev.left ?? []), header],
                    }))
                  }
                }}
                className="text-xs"
              >
                {isPinned ? (
                  <>
                    <PinOff className="mr-2 h-3 w-3" />
                    Unpin Column
                  </>
                ) : (
                  <>
                    <Pin className="mr-2 h-3 w-3" />
                    Pin to Left
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => table && autoSizeColumn(header, table)} className="text-xs">
                <Maximize2 className="mr-2 h-3 w-3" />
                Auto-size Column
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <div className="px-2 py-2" onClick={(e) => e.stopPropagation()}>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Filter Type</label>
                <select
                  value={currentOperator}
                  onChange={(e) => {
                    const newOperator = e.target.value as FilterOperator
                    setColumnFilterOperators((prev) => ({ ...prev, [header]: newOperator }))
                    if (filterValue) {
                      column.setFilterValue(filterValue)
                    }
                  }}
                  className="w-full h-7 text-xs border rounded px-2 bg-background"
                  onClick={(e) => e.stopPropagation()}
                >
                  <option value="contains">Contains</option>
                  <option value="equals">Equals</option>
                  <option value="startsWith">Starts with</option>
                  <option value="endsWith">Ends with</option>
                  <option value="notContains">Not contains</option>
                  <option value="isEmpty">Is empty</option>
                  <option value="isNotEmpty">Is not empty</option>
                </select>
              </div>
              <div className="px-2 py-2" onClick={(e) => e.stopPropagation()}>
                <div className="relative">
                  <Filter className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground" />
                  <Input
                    placeholder="Filter value..."
                    value={columnFilterInputs[header] ?? filterValue}
                    onChange={(e) => {
                      setColumnFilterInputs((prev) => ({ ...prev, [header]: e.target.value }))
                    }}
                    className="h-7 text-xs pl-7 pr-7"
                    onClick={(e) => e.stopPropagation()}
                    disabled={currentOperator === "isEmpty" || currentOperator === "isNotEmpty"}
                  />
                  {(columnFilterInputs[header] ?? filterValue) && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
                      onClick={(e) => {
                        e.stopPropagation()
                        setColumnFilterInputs((prev) => ({ ...prev, [header]: "" }))
                        column.setFilterValue("")
                      }}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
      size: 150,
      minSize: 80,
      maxSize: 500,
      cell: ({ row, column }) => {
        const rowIndex = row.index
        const value = row.getValue(column.id)
        const isEditing = editingCell?.rowIndex === rowIndex && editingCell?.columnId === column.id
        const displayValue =
          value === null || value === undefined ? "" : typeof value === "object" ? JSON.stringify(value) : String(value)
        const cellKey = `${rowIndex}-${column.id}`
        const isFlashing = flashingCells.has(cellKey)

        return (
          <div
            id={`cell-${rowIndex}-${column.id}`}
            tabIndex={0}
            className={`w-full h-full px-2 flex items-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset transition-colors ${
              isFlashing
                ? "bg-green-100 dark:bg-green-900/30"
                : isEditing
                  ? "bg-primary/10"
                  : "cursor-pointer hover:bg-muted/50"
            }`}
            onKeyDown={(e) => handleKeyDown(e, rowIndex, column.id)}
            onClick={() => !isEditing && handleCellClick(rowIndex, column.id)}
          >
            {isEditing ? (
              <input
                type="text"
                defaultValue={editValue}
                onClick={(e) => e.stopPropagation()}
                onBlur={(e) => {
                  const currentValue = e.currentTarget.value
                  handleCellEdit(rowIndex, column.id, currentValue)
                  setEditingCell(null)
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    const currentValue = e.currentTarget.value
                    handleCellEdit(rowIndex, column.id, currentValue)
                    setEditingCell(null)

                    if (e.shiftKey) {
                      if (rowIndex > 0) {
                        setTimeout(() => {
                          document.getElementById(`cell-${rowIndex - 1}-${column.id}`)?.focus()
                        }, 0)
                      }
                    } else {
                      if (rowIndex < tableData.length - 1) {
                        setTimeout(() => {
                          document.getElementById(`cell-${rowIndex + 1}-${column.id}`)?.focus()
                        }, 0)
                      }
                    }
                  } else if (e.key === "Escape") {
                    setEditingCell(null)
                  } else if (e.key === "Tab") {
                    e.preventDefault()
                    const currentValue = e.currentTarget.value
                    handleCellEdit(rowIndex, column.id, currentValue)
                    setEditingCell(null)
                    setTimeout(() => {
                      const cellElement = document.getElementById(`cell-${rowIndex}-${column.id}`)
                      let nextCell: Element | null = null
                      if (cellElement) {
                        nextCell = e.shiftKey ? cellElement.previousElementSibling : cellElement.nextElementSibling
                      }
                      ;(nextCell?.querySelector('[tabindex="0"]') as HTMLElement | null)?.focus()
                    }, 0)
                  }
                }}
                className="w-full h-full bg-transparent border-0 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset text-sm px-0"
                autoFocus
                onFocus={(e) => e.target.select()}
              />
            ) : (
              <div className="w-full min-w-0 overflow-hidden">{formatCellValue(value, column.id)}</div> // Pass raw value to formatCellValue
            )}
          </div>
        )
      },
    }))
  }, [
    headers,
    handleCellEdit,
    getColumnStats,
    columnPinning,
    handleKeyDown,
    handleCellClick,
    formatCellValue,
    editingCell,
    editValue,
    columnFilterOperators,
    customFilterFn,
    columnFilterInputs,
    flashingCells,
    autoSizeColumn,
    tableData,
    table,
    columnTypes, // Added columnTypes dependency
  ])

  const tableInstance = useReactTable({
    data: filteredTableData, // Use filtered data
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: (updaterOrValue) => {
      setColumnFilters((prev) => {
        const newValue =
          typeof updaterOrValue === "function"
            ? updaterOrValue(prev)
            : updaterOrValue;
        return newValue.map((filter) => ({
          ...filter,
          operator: (filter as ColumnFilterWithOperator).operator || "contains", // Default operator
          value: String(filter.value), // Ensure value is a string
        }));
      });
    },
    onColumnPinningChange: setColumnPinning,
    enableRowSelection: true,
    enableColumnResizing: true,
    enableSorting: true,
    enableColumnPinning: true,
    columnResizeMode,
    state: {
      columnVisibility,
      rowSelection,
      sorting,
      globalFilter,
      columnFilters,
      columnPinning,
      pagination: {
        pageIndex: currentPage - 1,
        pageSize: rowsPerPage,
      },
    },
    manualPagination: false,
    pageCount: Math.ceil(tableData.length / rowsPerPage),
  })

  const deleteSelectedRows = useCallback(() => {
    if (!tableInstance || Object.keys(rowSelection).length === 0) {
      return
    }

    const selectedRows = tableInstance.getFilteredRowModel().rows.filter((row) => rowSelection[row.index])
    const selectedCount = selectedRows.length

    if (
      !confirm(
        `Are you sure you want to delete ${selectedCount} selected row${selectedCount > 1 ? "s" : ""}? This action cannot be undone.`,
      )
    ) {
      return
    }

    const rowsToDelete = new Set(selectedRows.map((row) => row.original))

    const action: EditAction = {
      type: "delete",
      timestamp: Date.now(),
      data: {
        oldRows: [...tableData],
        rowIndices: selectedRows.map((row) => row.index),
      },
    }
    setUndoRedoState((prev) => ({
      past: [...prev.past.slice(-MAX_HISTORY + 1), action],
      future: [],
    }))

    const newTableData = tableData.filter((row) => !rowsToDelete.has(row))
    setTableData(newTableData)

    setRowSelection({})

    toast({
      title: "Rows Deleted",
      description: `${selectedCount} row(s) have been deleted`,
    })
  }, [tableInstance, rowSelection, tableData, toast])

  useEffect(() => {
    setTable(tableInstance)

    if (tableInstance && tableData.length > 0 && headers.length > 0) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        autoSizeAllColumns(tableInstance)
      }, 100)
    }
  }, [tableInstance, tableData.length, headers.length])

  useEffect(() => {
    const handler = setTimeout(() => {
      setGlobalFilter(globalFilterInput)
    }, 300)

    return () => {
      clearTimeout(handler)
    }
  }, [globalFilterInput, setGlobalFilter])

  useEffect(() => {
    const timers: Record<string, NodeJS.Timeout> = {}

    Object.entries(columnFilterInputs).forEach(([columnId, value]) => {
      timers[columnId] = setTimeout(() => {
        setColumnFilters((prev) => {
          const existing = prev.find((f) => f.id === columnId)
          if (value === "" && existing) {
            return prev.filter((f) => f.id !== columnId)
          } else if (value !== "") {
            if (existing) {
              return prev.map((f) => (f.id === columnId ? { ...f, value } : f))
            } else {
              return [
                ...prev,
                { id: columnId, value, operator: "contains" }, // Ensure 'operator' is included
              ]
            }
          }
          return prev
        })
      }, 300)
    })

    return () => {
      Object.values(timers).forEach((timer) => clearTimeout(timer))
    }
  }, [columnFilterInputs])

  const { rows } = tableInstance.getRowModel()

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => scrollContainerRef?.current || tableContainerRef.current, // Use scrollContainerRef if provided
    estimateSize: () => 40,
    overscan: 2,
  })

  const {
    left: leftPinnedColumns,
    center: centerColumns,
    right: rightPinnedColumns,
  } = tableInstance.getVisibleLeafColumns().reduce(
    (acc: any, col: any) => {
      if ((columnPinning.left ?? []).includes(col.id)) {
        acc.left.push(col)
      } else if ((columnPinning.right ?? []).includes(col.id)) {
        acc.right.push(col)
      } else {
        acc.center.push(col)
      }
      return acc
    },
    {
      left: [] as unknown as typeof tableInstance.getVisibleLeafColumns,
      center: [] as unknown as typeof tableInstance.getVisibleLeafColumns,
      right: [] as unknown as typeof tableInstance.getVisibleLeafColumns,
    },
  )

  const columnVirtualizer = useVirtualizer({
    horizontal: true,
    count: centerColumns.length,
    getScrollElement: () => scrollContainerRef?.current || tableContainerRef.current, // Use scrollContainerRef if provided
    estimateSize: (index) => (Array.isArray(centerColumns) ? (centerColumns[index]?.getSize() ?? 200) : 200),
    overscan: 2,
  })

  const virtualRows = rowVirtualizer.getVirtualItems()
  const virtualColumns = columnVirtualizer.getVirtualItems()

  const totalSize = rowVirtualizer.getTotalSize()
  const totalColumnWidth = columnVirtualizer.getTotalSize()

  const paddingTop = virtualRows.length > 0 ? virtualRows[0]?.start || 0 : 0
  const paddingBottom = virtualRows.length > 0 ? totalSize - (virtualRows[virtualRows.length - 1]?.end || 0) : 0

  const paddingLeft = virtualColumns.length > 0 ? virtualColumns[0]?.start || 0 : 0
  const paddingRight =
    virtualColumns.length > 0 ? totalColumnWidth - (virtualColumns[virtualColumns.length - 1]?.end || 0) : 0

  const leftPinnedWidth = Array.isArray(leftPinnedColumns)
    ? leftPinnedColumns.reduce((sum, col) => sum + col.getSize(), 0)
    : 0
  const rightPinnedWidth = Array.isArray(rightPinnedColumns)
    ? rightPinnedColumns.reduce((sum, col) => sum + col.getSize(), 0)
    : 0

  const totalPages = tableInstance.getPageCount()
  const startIndex = (currentPage - 1) * rowsPerPage
  const endIndex = Math.min(startIndex + rowsPerPage, tableData.length)

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
      tableInstance.setPageIndex(currentPage)
    }
  }

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
      tableInstance.setPageIndex(currentPage - 2)
    }
  }

  const goToPage = (page: number) => {
    setCurrentPage(page)
    tableInstance.setPageIndex(page - 1)
  }

  const toggleColumn = useCallback(
    (columnName: string) => {
      tableInstance.getColumn(columnName)?.toggleVisibility()
    },
    [tableInstance],
  )

  const showAllColumns = useCallback(() => {
    tableInstance.getAllColumns().forEach((column) => {
      column.toggleVisibility(true)
    })
  }, [tableInstance])

  const hideAllColumns = useCallback(() => {
    tableInstance.getAllColumns().forEach((column) => {
      column.toggleVisibility(false)
    })
  }, [tableInstance])

  const visibleColumnsCount = tableInstance.getAllColumns().filter((col) => col.getIsVisible()).length

  useEffect(() => {
    // Store the setRowRange function so parent can call it
    if (onStateChange) {
      ;(onStateChange as any).setRowRange = setRowRange
    }
  }, [onStateChange])

  if (isLoading) {
    return (
      <div className="w-full h-[600px] border rounded-md p-4 space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-[200px]" />
          <div className="flex gap-2">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-20" />
          </div>
        </div>
        <div className="space-y-2">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="flex gap-4">
              {Array.from({ length: 5 }).map((_, j) => (
                <Skeleton key={j} className="h-10 w-full" />
              ))}
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (!isLoading && tableData.length === 0) {
    return (
      <div className="w-full h-[400px] border rounded-md flex flex-col items-center justify-center text-center p-8 bg-muted/5 border-dashed">
        <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mb-4">
          <FileSpreadsheet className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2">No Data Available</h3>
        <p className="text-muted-foreground max-w-sm mb-6">
          Get started by importing a CSV file, pasting data from your clipboard, or adding new rows manually.
        </p>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => document.getElementById('file-upload')?.click()}>
            Import CSV
          </Button>
          <Button onClick={() => addNewRows(5)}>
            Add Empty Rows
          </Button>
        </div>
        <input
          id="file-upload"
          type="file"
          accept=".csv"
          className="hidden"
          onChange={handleFileSelect}
        />
      </div>
    )
  }

  return (
    <>
      {/* Keyboard Shortcuts Dialog */}
      <Dialog open={showKeyboardShortcuts} onOpenChange={setShowKeyboardShortcuts}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Keyboard Shortcuts</DialogTitle>
            <DialogDescription>Use these shortcuts to navigate and manipulate the table efficiently.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-3 items-center gap-4">
              <p className="text-sm text-muted-foreground">Undo</p>
              <p className="text-sm col-span-2">Ctrl + Z</p>
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <p className="text-sm text-muted-foreground">Redo</p>
              <p className="text-sm col-span-2">Ctrl + Y or Ctrl + Shift + Z</p>
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <p className="text-sm text-muted-foreground">Open Help</p>
              <p className="text-sm col-span-2">Ctrl + /</p>
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <p className="text-sm text-muted-foreground">Start Editing Cell</p>
              <p className="text-sm col-span-2">Enter or F2</p>
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <p className="text-sm text-muted-foreground">Save Cell Edit</p>
              <p className="text-sm col-span-2">Enter</p>
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <p className="text-sm text-muted-foreground">Cancel Cell Edit</p>
              <p className="text-sm col-span-2">Escape</p>
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <p className="text-sm text-muted-foreground">Copy Cell Value</p>
              <p className="text-sm col-span-2">Ctrl + C</p>
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <p className="text-sm text-muted-foreground">Paste Cell Value</p>
              <p className="text-sm col-span-2">Ctrl + V</p>
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <p className="text-sm text-muted-foreground">Delete Cell Value</p>
              <p className="text-sm col-span-2">Delete or Backspace</p>
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <p className="text-sm text-muted-foreground">Navigate Cells</p>
              <p className="text-sm col-span-2">Arrow Keys</p>
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <p className="text-sm text-muted-foreground">Select Row</p>
              <p className="text-sm col-span-2">Click checkbox</p>
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <p className="text-sm text-muted-foreground">Select All Rows</p>
              <p className="text-sm col-span-2">Click header checkbox</p>
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <p className="text-sm text-muted-foreground">Delete Selected Rows</p>
              <p className="text-sm col-span-2">Click Trash Icon</p>
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <p className="text-sm text-muted-foreground">Duplicate Selected Rows</p>
              <p className="text-sm col-span-2">Click Duplicate Icon</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Search & Replace Dialog */}
      <Dialog open={showSearchReplace} onOpenChange={setShowSearchReplace}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Search and Replace</DialogTitle>
            <DialogDescription>Find and replace text across your data</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="search-text">Search for</Label>
              <Input
                id="search-text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Enter text to find..."
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="replace-text">Replace with</Label>
              <Input
                id="replace-text"
                value={replaceText}
                onChange={(e) => setReplaceText(e.target.value)}
                placeholder="Enter replacement text..."
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="search-column">Search in</Label>
              <select
                id="search-column"
                value={searchColumn}
                onChange={(e) => setSearchColumn(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="all">All Columns</option>
                {headers.map((header) => (
                  <option key={header} value={header}>
                    {header}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSearchReplace(false)}>
              Cancel
            </Button>
            <Button onClick={searchAndReplace}>Replace All</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Bulk Edit Dialog */}
      <Dialog open={showBulkEdit} onOpenChange={setShowBulkEdit}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Bulk Edit Selected Rows</DialogTitle>
            <DialogDescription>
              Edit a column value for all {Object.keys(rowSelection).length} selected row(s)
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="bulk-column">Column to edit</Label>
              <select
                id="bulk-column"
                value={bulkEditColumn}
                onChange={(e) => setBulkEditColumn(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="">Select a column...</option>
                {headers.map((header) => (
                  <option key={header} value={header}>
                    {header}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="bulk-value">New value</Label>
              <Textarea
                id="bulk-value"
                value={bulkEditValue}
                onChange={(e) => setBulkEditValue(e.target.value)}
                placeholder="Enter the new value for selected cells..."
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowBulkEdit(false)}>
              Cancel
            </Button>
            <Button onClick={bulkEditSelectedCells}>Apply to Selected</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="relative w-full h-full flex flex-col">
        {/* Mobile Card View Warning - for now we show a message on very small screens if complex */}
        <div className="md:hidden mb-4 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-md text-yellow-600 text-sm flex items-center gap-2">
          <Maximize2 className="h-4 w-4" />
          <span>For the best experience, view on a larger screen.</span>
        </div>

        {tableData.length > 0 && (
          <TableRoot
            tableInstance={tableInstance}
            tableData={tableData}
            globalFilterInput={globalFilterInput}
            setGlobalFilterInput={setGlobalFilterInput}
            currentPage={currentPage}
            totalPages={totalPages}
            goToNextPage={goToNextPage}
            goToPreviousPage={goToPreviousPage}
            goToPage={goToPage}
            rowSelection={rowSelection}
            deleteSelectedRows={deleteSelectedRows}
            visibleColumnsCount={visibleColumnsCount}
            headers={headers}
            getColumnStats={getColumnStats}
            toggleColumn={toggleColumn}
            showAllColumns={showAllColumns}
            hideAllColumns={hideAllColumns}
            leftPinnedColumns={leftPinnedColumns}
            centerColumns={centerColumns}
            rightPinnedColumns={rightPinnedColumns}
            leftPinnedWidth={leftPinnedWidth}
            rightPinnedWidth={rightPinnedWidth}
            totalColumnWidth={totalColumnWidth}
            totalSize={totalSize}
            tableContainerRef={tableContainerRef}
            rows={rows}
            virtualRows={virtualRows}
            virtualColumns={virtualColumns}
            paddingLeft={paddingLeft}
            paddingRight={paddingRight}
            paddingTop={paddingTop}
            paddingBottom={paddingBottom}
            startIndex={startIndex}
          />
        )}
      </div>
    </>
  )
}

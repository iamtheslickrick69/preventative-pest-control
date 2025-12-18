"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Table2, ChevronDown, Columns3, Rows3, Filter, ArrowDownUp, Search, MoreHorizontal, Trash2, Undo2, Redo2, Keyboard, FileText, ClipboardPaste, Copy, X, Plus, Sparkles } from 'lucide-react'
import { useState } from "react"

interface ColumnInfo {
  id: string
  isVisible: boolean
  type?: string
}

interface ToolbarProps {
  onToggleActions: () => void
  isActionsOpen: boolean
  columns?: ColumnInfo[]
  totalColumns?: number
  visibleColumns?: number
  totalRows?: number
  onColumnVisibilityChange?: (columnId: string, visible: boolean) => void
  onRowRangeChange?: (start: number, end: number) => void
  onViewChange?: (view: string) => void
  onFilterChange?: (filters: Array<{ column: string; operator: string; value: string }>) => void
  onSortChange?: (sorts: Array<{ column: string; direction: 'asc' | 'desc' }>) => void
  onSearchChange?: (search: string) => void
  tableActions?: any
  tableState?: any
}

export function Toolbar({
  onToggleActions,
  isActionsOpen,
  columns = [],
  totalColumns = 0,
  visibleColumns = 0,
  totalRows = 0,
  onColumnVisibilityChange,
  onRowRangeChange,
  onViewChange,
  onFilterChange,
  onSortChange,
  onSearchChange,
  tableActions,
  tableState,
}: ToolbarProps) {
  const [activeFilters, setActiveFilters] = useState<Array<{ column: string; operator: string; value: string }>>([])
  const [showFilterDialog, setShowFilterDialog] = useState(false)
  const [newFilterColumn, setNewFilterColumn] = useState("")
  const [newFilterOperator, setNewFilterOperator] = useState("contains")
  const [newFilterValue, setNewFilterValue] = useState("")
  const [searchInput, setSearchInput] = useState("")
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [columnSearch, setColumnSearch] = useState("")
  const [startRow, setStartRow] = useState(1)
  const [endRow, setEndRow] = useState(100)
  const [isRowRangeOpen, setIsRowRangeOpen] = useState(false)
  
  const [activeSorts, setActiveSorts] = useState<Array<{ column: string; direction: 'asc' | 'desc' }>>([])
  const [showSortDialog, setShowSortDialog] = useState(false)
  const [newSortColumn, setNewSortColumn] = useState("")
  const [newSortDirection, setNewSortDirection] = useState<'asc' | 'desc'>('asc')

  const filteredColumns = columns.filter((col) => col.id.toLowerCase().includes(columnSearch.toLowerCase()))

  const addFilter = () => {
    if (!newFilterColumn) return
    
    const newFilter = {
      column: newFilterColumn,
      operator: newFilterOperator,
      value: newFilterValue,
    }
    
    const updatedFilters = [...activeFilters, newFilter]
    setActiveFilters(updatedFilters)
    onFilterChange?.(updatedFilters)
    
    // Reset form
    setNewFilterColumn("")
    setNewFilterOperator("contains")
    setNewFilterValue("")
  }

  const removeFilter = (index: number) => {
    const updatedFilters = activeFilters.filter((_, i) => i !== index)
    setActiveFilters(updatedFilters)
    onFilterChange?.(updatedFilters)
  }

  const clearAllFilters = () => {
    setActiveFilters([])
    onFilterChange?.([])
  }

  const addSort = () => {
    if (!newSortColumn) return
    
    const newSort = {
      column: newSortColumn,
      direction: newSortDirection,
    }
    
    const updatedSorts = [...activeSorts, newSort]
    setActiveSorts(updatedSorts)
    onSortChange?.(updatedSorts)
    
    // Reset form
    setNewSortColumn("")
    setNewSortDirection('asc')
  }

  const removeSort = (index: number) => {
    const updatedSorts = activeSorts.filter((_, i) => i !== index)
    setActiveSorts(updatedSorts)
    onSortChange?.(updatedSorts)
  }

  const clearAllSorts = () => {
    setActiveSorts([])
    onSortChange?.([])
  }

  return (
    <div className="flex items-center justify-between gap-2 px-3 py-2 border-b border-white/10 bg-background/50">
      <div className="flex items-center gap-1 min-w-0 flex-1 overflow-x-auto scrollbar-hide">
        <div className="flex items-center gap-1 flex-nowrap">
          {/* Actions Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 gap-2 px-3 flex-shrink-0 text-muted-foreground hover:text-foreground hover:bg-white/5">
                <MoreHorizontal className="size-4" />
                <p className="truncate text-sm font-medium">Edit</p>
                <ChevronDown className="size-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuLabel>Table</DropdownMenuLabel>
              <DropdownMenuSeparator />

              {tableState?.hasData && (
                <DropdownMenuItem onClick={() => tableActions?.clearData?.()}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Clear Data
                </DropdownMenuItem>
              )}

              <DropdownMenuItem onClick={() => tableActions?.undo?.()} disabled={!tableState?.canUndo}>
                <Undo2 className="mr-2 h-4 w-4" />
                Undo
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => tableActions?.redo?.()} disabled={!tableState?.canRedo}>
                <Redo2 className="mr-2 h-4 w-4" />
                Redo
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => tableActions?.openKeyboardShortcuts?.()}>
                <Keyboard className="mr-2 h-4 w-4" />
                Shortcuts
              </DropdownMenuItem>

              <DropdownMenuSeparator />
              <DropdownMenuLabel>Rows</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <FileText className="mr-2 h-4 w-4" />
                  Add Rows
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem onClick={() => tableActions?.addNewRows?.(1)}>Add 1 Row</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => tableActions?.addNewRows?.(5)}>Add 5 Rows</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => tableActions?.addNewRows?.(10)}>Add 10 Rows</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => tableActions?.addNewRows?.(50)}>Add 50 Rows</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>

              <DropdownMenuItem onClick={() => tableActions?.pasteFromClipboard?.()}>
                <ClipboardPaste className="mr-2 h-4 w-4" />
                Paste from Clipboard
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => tableActions?.duplicateSelectedRows?.()}
                disabled={!tableState?.hasSelection}
              >
                <Copy className="mr-2 h-4 w-4" />
                Duplicate Selected
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => tableActions?.openSearchReplace?.()}>
                <Search className="mr-2 h-4 w-4" />
                Search & Replace
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => tableActions?.openBulkEdit?.()} disabled={!tableState?.hasSelection}>
                <Search className="mr-2 h-4 w-4" />
                Bulk Edit
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" className="h-8 gap-1.5 px-3 flex-shrink-0 text-muted-foreground hover:text-foreground hover:bg-white/5">
                <Columns3 className="size-4" />
                <span className="text-nowrap text-sm">
                  {visibleColumns}/{totalColumns} columns
                </span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-72 p-0" align="start">
              <div className="p-3 border-b">
                <Input
                  placeholder="Search columns..."
                  value={columnSearch}
                  onChange={(e) => setColumnSearch(e.target.value)}
                  className="h-8"
                />
              </div>
              <div className="max-h-80 overflow-y-auto p-2">
                {filteredColumns.length === 0 ? (
                  <div className="text-sm text-muted-foreground text-center py-4">No columns found</div>
                ) : (
                  <div className="space-y-1">
                    {filteredColumns.map((column) => (
                      <div
                        key={column.id}
                        className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-accent cursor-pointer"
                        onClick={(e) => {
                          if ((e.target as HTMLElement).tagName !== "BUTTON") {
                            onColumnVisibilityChange?.(column.id, !column.isVisible)
                          }
                        }}
                      >
                        <Checkbox
                          checked={column.isVisible}
                          onCheckedChange={(checked) => {
                            onColumnVisibilityChange?.(column.id, checked as boolean)
                          }}
                          onClick={(e) => e.stopPropagation()}
                        />
                        <span className="text-sm flex-1">{column.id}</span>
                        {column.type && <span className="text-xs text-muted-foreground">{column.type}</span>}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </PopoverContent>
          </Popover>

          <Popover open={isRowRangeOpen} onOpenChange={setIsRowRangeOpen}>
            <PopoverTrigger asChild>
              <Button variant="ghost" className="h-8 gap-1.5 px-3 flex-shrink-0 text-muted-foreground hover:text-foreground hover:bg-white/5">
                <Rows3 className="size-4" />
                <span className="text-nowrap text-sm">
                  {tableState?.displayedRows || totalRows}/{totalRows.toLocaleString()} rows
                </span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64" align="start">
              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault()
                  console.log(`Row range submitted: startRow=${startRow}, endRow=${endRow}`)
                  onRowRangeChange?.(startRow, endRow)
                  setIsRowRangeOpen(false)
                }}
              >
                <div className="space-y-2">
                  <Label htmlFor="start-row" className="text-xs">
                    Starting row
                  </Label>
                  <Input
                    id="start-row"
                    type="number"
                    min={1}
                    max={totalRows}
                    value={startRow}
                    onChange={(e) => setStartRow(Number.parseInt(e.target.value) || 1)}
                    className="h-8"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end-row" className="text-xs">
                    Ending row
                  </Label>
                  <Input
                    id="end-row"
                    type="number"
                    min={1}
                    max={totalRows}
                    value={endRow}
                    onChange={(e) => setEndRow(Number.parseInt(e.target.value) || totalRows)}
                    className="h-8"
                  />
                </div>
                <Button type="submit" className="w-full h-9">
                  Apply
                </Button>
              </form>
            </PopoverContent>
          </Popover>

          <Popover open={showFilterDialog} onOpenChange={setShowFilterDialog}>
            <PopoverTrigger asChild>
              <Button variant="ghost" className="h-8 gap-1.5 px-3 flex-shrink-0 text-muted-foreground hover:text-foreground hover:bg-white/5">
                <Filter className="size-4" />
                <span className="text-sm">Filter</span>
                {activeFilters.length > 0 && (
                  <Badge variant="secondary" className="ml-1 h-5 min-w-5 px-1 text-xs">
                    {activeFilters.length}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-96 p-0" align="start">
              <div className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold">Column Filters</h3>
                  {activeFilters.length > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 text-xs"
                      onClick={clearAllFilters}
                    >
                      Clear all
                    </Button>
                  )}
                </div>

                {/* Active filters list */}
                {activeFilters.length > 0 && (
                  <div className="space-y-2 pb-3 border-b">
                    {activeFilters.map((filter, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 p-2 bg-accent/50 rounded text-xs"
                      >
                        <span className="font-medium">{filter.column}</span>
                        <span className="text-muted-foreground">{filter.operator}</span>
                        <span className="flex-1 truncate">"{filter.value}"</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={() => removeFilter(index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Add new filter form */}
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="filter-column" className="text-xs">
                      Column
                    </Label>
                    <Select value={newFilterColumn} onValueChange={setNewFilterColumn}>
                      <SelectTrigger id="filter-column" className="h-9">
                        <SelectValue placeholder="Select column..." />
                      </SelectTrigger>
                      <SelectContent>
                        {columns.map((col) => (
                          <SelectItem key={col.id} value={col.id}>
                            {col.id}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="filter-operator" className="text-xs">
                      Operator
                    </Label>
                    <Select value={newFilterOperator} onValueChange={setNewFilterOperator}>
                      <SelectTrigger id="filter-operator" className="h-9">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="contains">Contains</SelectItem>
                        <SelectItem value="equals">Equals</SelectItem>
                        <SelectItem value="startsWith">Starts with</SelectItem>
                        <SelectItem value="endsWith">Ends with</SelectItem>
                        <SelectItem value="notContains">Does not contain</SelectItem>
                        <SelectItem value="isEmpty">Is empty</SelectItem>
                        <SelectItem value="isNotEmpty">Is not empty</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {newFilterOperator !== "isEmpty" && newFilterOperator !== "isNotEmpty" && (
                    <div className="space-y-2">
                      <Label htmlFor="filter-value" className="text-xs">
                        Value
                      </Label>
                      <Input
                        id="filter-value"
                        placeholder="Enter filter value..."
                        value={newFilterValue}
                        onChange={(e) => setNewFilterValue(e.target.value)}
                        className="h-9"
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && newFilterColumn) {
                            addFilter()
                          }
                        }}
                      />
                    </div>
                  )}

                  <Button
                    onClick={addFilter}
                    disabled={!newFilterColumn}
                    className="w-full h-9"
                    size="sm"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Filter
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <Popover open={showSortDialog} onOpenChange={setShowSortDialog}>
            <PopoverTrigger asChild>
              <Button variant="ghost" className="h-8 gap-1.5 px-3 flex-shrink-0 text-muted-foreground hover:text-foreground hover:bg-white/5">
                <ArrowDownUp className="size-4" />
                <span className="text-sm">Sort</span>
                {activeSorts.length > 0 && (
                  <Badge variant="secondary" className="ml-1 h-5 min-w-5 px-1 text-xs">
                    {activeSorts.length}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-96 p-0" align="start">
              <div className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold">Sort Columns</h3>
                  {activeSorts.length > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 text-xs"
                      onClick={clearAllSorts}
                    >
                      Clear all
                    </Button>
                  )}
                </div>

                {/* Active sorts list */}
                {activeSorts.length > 0 && (
                  <div className="space-y-2 pb-3 border-b">
                    {activeSorts.map((sort, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 p-2 bg-accent/50 rounded text-xs"
                      >
                        <span className="font-medium">{sort.column}</span>
                        <span className="text-muted-foreground">
                          {sort.direction === 'asc' ? '↑ Ascending' : '↓ Descending'}
                        </span>
                        <div className="flex-1" />
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={() => removeSort(index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Add new sort form */}
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="sort-column" className="text-xs">
                      Column
                    </Label>
                    <Select value={newSortColumn} onValueChange={setNewSortColumn}>
                      <SelectTrigger id="sort-column" className="h-9">
                        <SelectValue placeholder="Select column..." />
                      </SelectTrigger>
                      <SelectContent>
                        {columns.map((col) => (
                          <SelectItem key={col.id} value={col.id}>
                            {col.id}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sort-direction" className="text-xs">
                      Direction
                    </Label>
                    <Select value={newSortDirection} onValueChange={(val) => setNewSortDirection(val as 'asc' | 'desc')}>
                      <SelectTrigger id="sort-direction" className="h-9">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="asc">↑ Ascending (A-Z, 0-9)</SelectItem>
                        <SelectItem value="desc">↓ Descending (Z-A, 9-0)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    onClick={addSort}
                    disabled={!newSortColumn}
                    className="w-full h-9"
                    size="sm"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Sort
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <Popover open={isSearchOpen} onOpenChange={setIsSearchOpen}>
            <PopoverTrigger asChild>
              <Button variant="ghost" className="h-8 gap-1.5 px-3 flex-shrink-0 text-muted-foreground hover:text-foreground hover:bg-white/5">
                <Search className="size-4" />
                <span className="text-sm">Search</span>
                {searchInput && <span className="ml-1 text-xs text-muted-foreground">({searchInput.substring(0, 10)}...)</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="start">
              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault()
                  onSearchChange?.(searchInput)
                  setIsSearchOpen(false)
                }}
              >
                <div className="space-y-2">
                  <Label htmlFor="global-search" className="text-xs font-medium">
                    Search all columns
                  </Label>
                  <div className="relative">
                    <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="global-search"
                      type="text"
                      placeholder="Enter search term..."
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      className="h-9 pl-8 pr-8"
                    />
                    {searchInput && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-1/2 -translate-y-1/2 h-9 w-9 p-0"
                        onClick={() => {
                          setSearchInput("")
                          onSearchChange?.("")
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Search across all visible columns for matching text
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 h-8"
                    onClick={() => {
                      setSearchInput("")
                      onSearchChange?.("")
                      setIsSearchOpen(false)
                    }}
                  >
                    Clear
                  </Button>
                  <Button type="submit" className="flex-1 h-8">
                    Search
                  </Button>
                </div>
              </form>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="flex items-center gap-x-2 flex-shrink-0">
        <Button
          onClick={onToggleActions}
          className="cursor-pointer select-none h-8 gap-x-1.5 bg-foreground text-background hover:bg-foreground/90 border-0"
        >
          <span className="text-sm">Actions</span>
          <Sparkles className="size-4" />
        </Button>
      </div>
    </div>
  )
}

export interface PersistedData {
  headers: string[]
  tableData: { [key: string]: string }[]
  fileName: string
  columnFilters?: ColumnFilterWithOperator[]
  globalFilter?: string
  columnFilterOperators?: Record<string, FilterOperator>
}

export type FilterOperator =
  | "contains"
  | "equals"
  | "startsWith"
  | "endsWith"
  | "notContains"
  | "isEmpty"
  | "isNotEmpty"

export interface ColumnFilterWithOperator {
  id: string
  value: string
  operator: FilterOperator
}

export interface EditAction {
  type: "edit" | "delete" | "bulk-edit" | "search-replace"
  timestamp: number
  data: {
    // For single cell edits
    rowIndex?: number
    columnId?: string
    oldValue?: string
    newValue?: string
    // For bulk operations (delete, bulk-edit, search-replace)
    rowIndices?: number[]
    oldRows?: { [key: string]: string }[]
    newRows?: { [key: string]: string }[]
    // For search/replace tracking
    searchText?: string
    replaceText?: string
    affectedCells?: Array<{ rowIndex: number; columnId: string }>
  }
}

export interface UndoRedoState {
  past: EditAction[]
  future: EditAction[]
}

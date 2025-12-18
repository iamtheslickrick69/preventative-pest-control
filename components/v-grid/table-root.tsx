"use client"
import { ChevronLeft, ChevronRight, Search, X } from 'lucide-react'
import { Button } from "../ui/button"
import { Checkbox } from "../ui/checkbox"
import { type Column, flexRender, type Table } from "@tanstack/react-table"
import React from "react"

type TableRootProps = {
  tableInstance: Table<Record<string, string>>
  tableData: any[]
  globalFilterInput: string
  setGlobalFilterInput: (value: string) => void
  currentPage: number
  totalPages: number
  goToNextPage: () => void
  goToPreviousPage: () => void
  goToPage: (page: number) => void
  rowSelection: { [key: string]: boolean }
  deleteSelectedRows: () => void
  visibleColumnsCount: number
  headers: any[]
  getColumnStats: (columnId: string) => { percentage: number }
  toggleColumn: (columnId: string) => void
  showAllColumns: () => void
  hideAllColumns: () => void
  leftPinnedColumns: () => Column<
    {
      [key: string]: string
    },
    unknown
  >[]
  centerColumns: () => Column<
    {
      [key: string]: string
    },
    unknown
  >[]
  rightPinnedColumns: () => Column<
    {
      [key: string]: string
    },
    unknown
  >[]
  leftPinnedWidth: number
  rightPinnedWidth: number
  totalColumnWidth: number
  totalSize: number
  tableContainerRef: React.RefObject<HTMLDivElement | null>
  rows: any[]
  virtualRows: any[]
  virtualColumns: any[]
  paddingLeft: number
  paddingRight: number
  paddingTop: number
  paddingBottom: number
  startIndex: number
}

export const TableRoot = React.forwardRef<HTMLDivElement, TableRootProps>((props, ref) => {
  const {
    tableInstance,
    tableData,
    globalFilterInput,
    setGlobalFilterInput,
    currentPage,
    totalPages,
    goToNextPage,
    goToPreviousPage,
    goToPage,
    rowSelection,
    deleteSelectedRows,
    visibleColumnsCount,
    headers,
    getColumnStats,
    toggleColumn,
    showAllColumns,
    hideAllColumns,
    leftPinnedColumns,
    centerColumns,
    rightPinnedColumns,
    leftPinnedWidth,
    rightPinnedWidth,
    totalColumnWidth,
    totalSize,
    tableContainerRef,
    rows,
    virtualRows,
    virtualColumns,
    paddingLeft,
    paddingRight,
    paddingTop,
    paddingBottom,
    startIndex,
  } = props

  return (
    <>
      {/* Editable Data Table */}
      {tableData.length > 0 && (
        <div>
          {globalFilterInput && (
            <div className="flex items-center gap-2 px-3 py-2 bg-muted/50 border-b text-sm">
              <Search className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">
                Searching for: <span className="font-medium text-foreground">"{globalFilterInput}"</span>
              </span>
              <span className="text-muted-foreground">
                ({tableInstance.getFilteredRowModel().rows.length} of {tableData.length} rows match)
              </span>
              <Button
                variant="ghost"
                size="sm"
                className="ml-auto h-6 px-2"
                onClick={() => setGlobalFilterInput("")}
              >
                <X className="h-3 w-3 mr-1" />
                Clear
              </Button>
            </div>
          )}
          <div ref={tableContainerRef} className="relative w-full">
            <div style={{ width: leftPinnedWidth + totalColumnWidth + rightPinnedWidth + 120, height: totalSize }}>
              {/* Sticky Header */}
              <div className="sticky top-0 z-20 bg-background border-b flex">
                {/* Sticky checkbox column */}
                <div
                  className="sticky left-0 z-30 bg-background border-r flex items-center justify-center"
                  style={{ width: 60, minWidth: 60 }}
                >
                  <Checkbox
                    checked={tableInstance.getIsAllPageRowsSelected()}
                    onCheckedChange={(value) => tableInstance.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                  />
                </div>
                {/* Sticky row number column */}
                <div
                  className="sticky left-[60px] z-30 bg-background border-r flex items-center justify-center px-2"
                  style={{ width: 60, minWidth: 60 }}
                >
                  <span className="text-sm font-medium">#</span>
                </div>
                {Array.isArray(leftPinnedColumns) &&
                  leftPinnedColumns.map((column, index) => {
                    const header = tableInstance
                      .getHeaderGroups()[0]
                      ?.headers.find((h: any) => h.column.id === column.id)
                    if (!header) return null
                    const leftOffset =
                      120 + leftPinnedColumns.slice(0, index).reduce((sum, col) => sum + col.getSize(), 0)

                    return (
                      <div
                        key={header.id}
                        className="sticky z-30 bg-background relative border-r flex items-center group"
                        style={{ left: leftOffset, width: header.getSize(), minWidth: header.getSize() }}
                      >
                        <div className="flex-1 min-w-0">
                          {flexRender(header.column.columnDef.header, header.getContext())}
                        </div>
                        <div
                          onMouseDown={header.getResizeHandler()}
                          onTouchStart={header.getResizeHandler()}
                          className={`absolute right-0 top-0 h-full w-1 cursor-col-resize select-none touch-none bg-border opacity-0 group-hover:opacity-100 hover:bg-primary transition-opacity ${
                            header.column.getIsResizing() ? "bg-primary opacity-100" : ""
                          }`}
                        />
                      </div>
                    )
                  })}
                {/* Virtualized center columns */}
                <div className="flex" style={{ paddingLeft: `${paddingLeft}px`, paddingRight: `${paddingRight}px` }}>
                  {virtualColumns.map((virtualColumn) => {
                    const column = Array.isArray(centerColumns) && centerColumns[virtualColumn.index]
                    const header = tableInstance
                      .getHeaderGroups()[0]
                      ?.headers.find((h: any) => h.column.id === column.id)
                    if (!header) return null

                    return (
                      <div
                        key={header.id}
                        className="relative border-r flex items-center group"
                        style={{ width: header.getSize(), minWidth: header.getSize() }}
                      >
                        <div className="flex-1 min-w-0">
                          {flexRender(header.column.columnDef.header, header.getContext())}
                        </div>
                        <div
                          onMouseDown={header.getResizeHandler()}
                          onTouchStart={header.getResizeHandler()}
                          className={`absolute right-0 top-0 h-full w-1 cursor-col-resize select-none touch-none bg-border opacity-0 group-hover:opacity-100 hover:bg-primary transition-opacity ${
                            header.column.getIsResizing() ? "bg-primary opacity-100" : ""
                          }`}
                        />
                      </div>
                    )
                  })}
                </div>
                {Array.isArray(rightPinnedColumns) &&
                  rightPinnedColumns.map((column, index) => {
                    const header = tableInstance
                      .getHeaderGroups()[0]
                      ?.headers.find((h: any) => h.column.id === column.id)
                    if (!header) return null

                    return (
                      <div
                        key={header.id}
                        className="sticky z-30 bg-background right-0 relative border-r flex items-center group"
                        style={{ width: header.getSize(), minWidth: header.getSize() }}
                      >
                        <div className="flex-1 min-w-0">
                          {flexRender(header.column.columnDef.header, header.getContext())}
                        </div>
                        <div
                          onMouseDown={header.getResizeHandler()}
                          onTouchStart={header.getResizeHandler()}
                          className={`absolute right-0 top-0 h-full w-1 cursor-col-resize select-none touch-none bg-border opacity-0 group-hover:opacity-100 hover:bg-primary transition-opacity ${
                            header.column.getIsResizing() ? "bg-primary opacity-100" : ""
                          }`}
                        />
                      </div>
                    )
                  })}
              </div>

              {/* Virtualized Table Body */}
              <div style={{ position: "relative" }}>
                {paddingTop > 0 && <div style={{ height: `${paddingTop}px` }} />}
                {virtualRows.map((virtualRow) => {
                  const row = rows[virtualRow.index]
                  return (
                    <div
                      key={row.id}
                      className={`flex border-b hover:bg-muted/50 transition-colors ${
                        row.getIsSelected() ? "bg-blue-50" : ""
                      }`}
                      style={{ height: `${virtualRow.size}px` }}
                    >
                      {/* Sticky checkbox column */}
                      <div
                        className={`sticky left-0 z-10 border-r flex items-center justify-center ${
                          row.getIsSelected() ? "bg-blue-50" : "bg-background"
                        }`}
                        style={{ width: 60, minWidth: 60 }}
                      >
                        <Checkbox
                          checked={row.getIsSelected()}
                          onCheckedChange={(value) => row.toggleSelected(!!value)}
                          aria-label={`Select row ${virtualRow.index + 1}`}
                        />
                      </div>
                      {/* Sticky row number column */}
                      <div
                        className={`sticky left-[60px] z-10 border-r flex items-center justify-center px-2 ${
                          row.getIsSelected() ? "bg-blue-50" : "bg-background"
                        }`}
                        style={{ width: 60, minWidth: 60 }}
                      >
                        <span className="text-sm text-muted-foreground">{startIndex + virtualRow.index + 1}</span>
                      </div>
                      {Array.isArray(leftPinnedColumns) &&
                        leftPinnedColumns.map((column, index) => {
                          const cell = row.getVisibleCells().find((c: any) => c.column.id === column.id)
                          if (!cell) return null
                          const leftOffset =
                            120 + leftPinnedColumns.slice(0, index).reduce((sum, col) => sum + col.getSize(), 0)

                          return (
                            <div
                              key={cell.id}
                              className={`sticky z-10 border-r flex items-center ${
                                row.getIsSelected() ? "bg-blue-50" : "bg-background"
                              }`}
                              style={{
                                left: leftOffset,
                                width: cell.column.getSize(),
                                minWidth: cell.column.getSize(),
                              }}
                            >
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </div>
                          )
                        })}
                      {/* Virtualized center cells */}
                      <div
                        className="flex"
                        style={{ paddingLeft: `${paddingLeft}px`, paddingRight: `${paddingRight}px` }}
                      >
                        {virtualColumns.map((virtualColumn) => {
                          const column = Array.isArray(centerColumns) && centerColumns[virtualColumn.index]
                          const cell = row.getVisibleCells().find((c: any) => c.column.id === column.id)
                          if (!cell) return null

                          return (
                            <div
                              key={cell.id}
                              className="border-r flex items-center"
                              style={{ width: cell.column.getSize(), minWidth: cell.column.getSize() }}
                            >
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </div>
                          )
                        })}
                      </div>
                      {Array.isArray(rightPinnedColumns) &&
                        rightPinnedColumns.map((column) => {
                          const cell = row.getVisibleCells().find((c: any) => c.column.id === column.id)
                          if (!cell) return null

                          return (
                            <div
                              key={cell.id}
                              className={`sticky z-10 right-0 border-r flex items-center ${
                                row.getIsSelected() ? "bg-blue-50" : "bg-background"
                              }`}
                              style={{ width: cell.column.getSize(), minWidth: cell.column.getSize() }}
                            >
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </div>
                          )
                        })}
                    </div>
                  )
                })}
                {paddingBottom > 0 && <div style={{ height: `${paddingBottom}px` }} />}
              </div>
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-4 border-t">
              <div className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </div>
              <div className="flex items-center gap-2">
                <Button onClick={goToPreviousPage} disabled={currentPage === 1} variant="outline" size="sm">
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Button>

                <div className="flex gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum
                    if (totalPages <= 5) {
                      pageNum = i + 1
                    } else if (currentPage <= 3) {
                      pageNum = i + 1
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i
                    } else {
                      pageNum = currentPage - 2 + i
                    }

                    return (
                      <Button
                        key={pageNum}
                        onClick={() => goToPage(pageNum)}
                        variant={currentPage === pageNum ? "default" : "outline"}
                        size="sm"
                        className="w-10"
                      >
                        {pageNum}
                      </Button>
                    )
                  })}
                </div>

                <Button onClick={goToNextPage} disabled={currentPage === totalPages} variant="outline" size="sm">
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  )
})

TableRoot.displayName = "TableRoot"

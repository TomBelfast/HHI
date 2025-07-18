import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./Card"
import { Input } from "./Input"
import { Button } from "./Button"

import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight, Search } from "lucide-react"

export interface DataTableColumn<T> {
  key: keyof T
  header: string
  render?: (value: T[keyof T], row: T) => React.ReactNode
  sortable?: boolean
}

export interface DataTableProps<T> {
  data: T[]
  columns: DataTableColumn<T>[]
  title?: string
  searchable?: boolean
  pagination?: {
    pageSize: number
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
  }
  sorting?: {
    sortKey: keyof T | null
    sortDirection: "asc" | "desc" | null
    onSort: (key: keyof T) => void
  }
  className?: string
}

export function DataTable<T extends Record<string, unknown>>({
  data,
  columns,
  title,
  searchable = false,
  pagination,
  sorting,
  className,
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = React.useState("")

  const filteredData = React.useMemo(() => {
    if (!searchable || !searchTerm) return data
    return data.filter((row) =>
      Object.values(row).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
  }, [data, searchTerm, searchable])

  const renderCell = (column: DataTableColumn<T>, row: T) => {
    const value = row[column.key]
    if (column.render) {
      return column.render(value, row)
    }
    return String(value)
  }

  return (
    <Card className={cn("w-full", className)}>
      {(title || searchable) && (
        <CardHeader>
          <div className="flex items-center justify-between">
            {title && <CardTitle>{title}</CardTitle>}
            {searchable && (
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                  className="pl-8 w-64"
                />
              </div>
            )}
          </div>
        </CardHeader>
      )}
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                {columns.map((column) => (
                  <th
                    key={String(column.key)}
                    className={cn(
                      "text-left p-2 font-medium text-muted-foreground",
                      column.sortable && "cursor-pointer hover:text-foreground"
                    )}
                    onClick={() => {
                      if (column.sortable && sorting) {
                        sorting.onSort(column.key)
                      }
                    }}
                  >
                    <div className="flex items-center space-x-1">
                      <span>{column.header}</span>
                      {column.sortable && sorting && sorting.sortKey === column.key && (
                        <span className="text-xs">
                          {sorting.sortDirection === "asc" ? "↑" : "↓"}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row, index) => (
                <tr key={index} className="border-b hover:bg-muted/50">
                  {columns.map((column) => (
                    <td key={String(column.key)} className="p-2">
                      {renderCell(column, row)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {pagination && (
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">
              Page {pagination.currentPage} of {pagination.totalPages}
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => pagination.onPageChange(pagination.currentPage - 1)}
                disabled={pagination.currentPage <= 1}
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => pagination.onPageChange(pagination.currentPage + 1)}
                disabled={pagination.currentPage >= pagination.totalPages}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
} 
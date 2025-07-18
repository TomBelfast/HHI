'use client';

import { useState } from 'react';

interface TableRow {
  [key: string]: string | number | boolean | null | undefined;
  id?: string | number;
}

interface Column {
  key: string;
  label: string;
  render?: (value: string | number | boolean | null | undefined, row?: TableRow) => React.ReactNode;
}

interface DataTableProps {
  data: TableRow[];
  columns: Column[];
  itemsPerPage?: number;
  showPagination?: boolean;
  onRowClick?: (item: TableRow) => void;
}

export function DataTable({ data, columns, itemsPerPage = 10, showPagination = true, onRowClick }: DataTableProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  const formatValue = (value: string | number | boolean | null | undefined, key: string) => {
    if (key === 'value' || key === 'totalValue') {
      return `£${Number(value).toLocaleString()}`;
    }
    if (key === 'rating') {
      return `${value}/5`;
    }
    if (key === 'customerId') {
      const customer = data.find(item => item.id === value);
      return customer?.name || String(value);
    }
    return String(value);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-card divide-y divide-gray-200 dark:divide-border">
          {currentData.map((item, index) => (
            <tr 
              key={index} 
              className={`hover:bg-gray-200 dark:hover:bg-gray-700 ${onRowClick ? 'cursor-pointer' : ''}`}
              onClick={() => onRowClick && onRowClick(item)}
            >
              {columns.map((column) => (
                <td
                  key={column.key}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                >
                  {column.render ? column.render(item[column.key], item) : formatValue(item[column.key], column.key)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {showPagination && totalPages > 1 && (
        <div className="bg-white dark:bg-card px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-border sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Poprzednia
            </button>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Następna
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Pokazuję <span className="font-medium">{startIndex + 1}</span> do{' '}
                <span className="font-medium">{Math.min(endIndex, data.length)}</span> z{' '}
                <span className="font-medium">{data.length}</span> wyników
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ←
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                      page === currentPage
                        ? 'z-10 bg-primary border-primary text-primary-foreground'
                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  →
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 
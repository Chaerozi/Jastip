'use client';

import type { ReactNode } from 'react';
import { ChevronLeft, ChevronRight, ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { EmptyState } from '@/components/shared';
import { Skeleton } from '@/components/ui/skeleton';
import type { PaginationMeta } from '@/constants/pagination';

export interface DataTableColumn<T> {
  key: string;
  header: string;
  cell: (row: T) => ReactNode;
  sortable?: boolean;
}
interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  data: T[];
  getRowKey: (row: T) => string;
  isLoading?: boolean;
  meta?: PaginationMeta;
  onPageChange?: (page: number) => void;
  onSort?: (key: string) => void;
  emptyTitle?: string;
}

export function DataTable<T>({
  columns,
  data,
  getRowKey,
  isLoading,
  meta,
  onPageChange,
  onSort,
  emptyTitle = 'Belum ada data',
}: DataTableProps<T>) {
  return (
    <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40">
              {columns.map((column) => (
                <TableHead key={column.key}>
                  {column.sortable ? (
                    <button
                      className="flex items-center gap-2 font-medium hover:text-foreground"
                      onClick={() => onSort?.(column.key)}
                    >
                      {column.header}
                      <ArrowUpDown className="h-3.5 w-3.5" />
                    </button>
                  ) : (
                    column.header
                  )}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  {columns.map((column) => (
                    <TableCell key={column.key}>
                      <Skeleton className="h-4 w-24" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length}>
                  <EmptyState
                    title={emptyTitle}
                    description="Data akan muncul setelah tersedia dari sistem."
                  />
                </TableCell>
              </TableRow>
            ) : (
              data.map((row) => (
                <TableRow key={getRowKey(row)}>
                  {columns.map((column) => (
                    <TableCell key={column.key}>{column.cell(row)}</TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      {meta && (
        <div className="flex items-center justify-between border-t px-4 py-3 text-sm text-muted-foreground">
          <span>
            Menampilkan {meta.totalItems === 0 ? 0 : (meta.currentPage - 1) * meta.perPage + 1}–
            {Math.min(meta.currentPage * meta.perPage, meta.totalItems)} dari {meta.totalItems}
          </span>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              disabled={!meta.hasPreviousPage}
              onClick={() => onPageChange?.(meta.currentPage - 1)}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span>
              Halaman {meta.currentPage} dari {meta.totalPages || 1}
            </span>
            <Button
              variant="outline"
              size="icon"
              disabled={!meta.hasNextPage}
              onClick={() => onPageChange?.(meta.currentPage + 1)}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

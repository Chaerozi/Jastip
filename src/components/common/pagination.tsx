'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
  siblingCount?: number;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
  siblingCount = 1,
}: PaginationProps) {
  const pages = generatePagination(currentPage, totalPages, siblingCount);

  if (totalPages <= 1) return null;

  return (
    <nav
      className={cn('flex items-center justify-center gap-1', className)}
      aria-label="Pagination"
    >
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Halaman sebelumnya"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {pages.map((page, index) =>
        page === '...' ? (
          <span key={`ellipsis-${index}`} className="px-2 text-muted-foreground">
            ...
          </span>
        ) : (
          <Button
            key={page}
            variant={currentPage === page ? 'default' : 'outline'}
            size="icon"
            onClick={() => onPageChange(page as number)}
            aria-current={currentPage === page ? 'page' : undefined}
          >
            {page}
          </Button>
        )
      )}

      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Halaman berikutnya"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </nav>
  );
}

function generatePagination(
  currentPage: number,
  totalPages: number,
  siblingCount: number
): (number | string)[] {
  const totalNumbers = siblingCount * 2 + 3;

  if (totalNumbers >= totalPages) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

  const showLeftDots = leftSiblingIndex > 2;
  const showRightDots = rightSiblingIndex < totalPages - 1;

  if (!showLeftDots && showRightDots) {
    const leftItemCount = 3 + siblingCount;
    const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
    return [...leftRange, '...', totalPages];
  }

  if (showLeftDots && !showRightDots) {
    const rightItemCount = 3 + siblingCount;
    const rightRange = Array.from(
      { length: rightItemCount },
      (_, i) => totalPages - rightItemCount + 1 + i
    );
    return [1, '...', ...rightRange];
  }

  if (showLeftDots && showRightDots) {
    const middleRange = Array.from(
      { length: rightSiblingIndex - leftSiblingIndex + 1 },
      (_, i) => leftSiblingIndex + i
    );
    return [1, '...', ...middleRange, '...', totalPages];
  }

  return Array.from({ length: totalPages }, (_, i) => i + 1);
}

interface PaginationInfoProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  className?: string;
}

export function PaginationInfo({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  className,
}: PaginationInfoProps) {
  const start = (currentPage - 1) * itemsPerPage + 1;
  const end = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <p className={cn('text-sm text-muted-foreground', className)}>
      Menampilkan {start} - {end} dari {totalItems} produk
    </p>
  );
}

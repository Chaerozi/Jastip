export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 12,
  MAX_LIMIT: 100,
  LIMITS: [12, 24, 36, 48, 60],
} as const;

export type PaginationLimit = (typeof PAGINATION.LIMITS)[number];

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginationMeta {
  currentPage: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export function calculateOffset(page: number, limit: number): number {
  return (page - 1) * limit;
}

export function calculateTotalPages(totalItems: number, limit: number): number {
  return Math.ceil(totalItems / limit);
}

export function isValidPage(page: number, totalPages: number): boolean {
  return page > 0 && page <= totalPages;
}

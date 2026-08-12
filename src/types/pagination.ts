export interface PaginationState {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginationActions {
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  nextPage: () => void;
  previousPage: () => void;
  firstPage: () => void;
  lastPage: () => void;
  reset: () => void;
}

export type PaginationStore = PaginationState & PaginationActions;

export interface PaginationConfig {
  initialPage?: number;
  initialLimit?: number;
  maxLimit?: number;
}

export interface CursorPagination {
  cursor: string | null;
  limit: number;
}

export interface CursorPaginationMeta {
  nextCursor: string | null;
  previousCursor: string | null;
  hasMore: boolean;
}

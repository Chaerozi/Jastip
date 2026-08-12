import type { PaginationMeta } from '@/constants/pagination';

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
  statusCode: number;
}

export interface ApiListResponse<T> {
  success: boolean;
  data: T[];
  message: string;
  meta: PaginationMeta;
}

export interface ApiPaginatedParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export type ApiResult<T> = ApiResponse<T> | ApiErrorResponse;

export interface ApiError {
  message: string;
  statusCode: number;
  errors?: Record<string, string[]>;
}

export function isApiError(response: unknown): response is ApiErrorResponse {
  return (
    typeof response === 'object' &&
    response !== null &&
    'success' in response &&
    response.success === false
  );
}

export function isApiSuccess<T>(response: unknown): response is ApiResponse<T> {
  return (
    typeof response === 'object' &&
    response !== null &&
    'success' in response &&
    response.success === true
  );
}

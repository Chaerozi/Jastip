const API_BASE = '/api/v1';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_BASE}/auth/login`,
    REGISTER: `${API_BASE}/auth/register`,
    LOGOUT: `${API_BASE}/auth/logout`,
    REFRESH: `${API_BASE}/auth/refresh`,
    ME: `${API_BASE}/auth/me`,
    FORGOT_PASSWORD: `${API_BASE}/auth/forgot-password`,
    RESET_PASSWORD: `${API_BASE}/auth/reset-password`,
    VERIFY_EMAIL: `${API_BASE}/auth/verify-email`,
  },
  PRODUCTS: {
    LIST: `${API_BASE}/products`,
    DETAIL: (id: string) => `${API_BASE}/products/${id}`,
    CATEGORIES: `${API_BASE}/products/categories`,
    CATEGORY: (slug: string) => `${API_BASE}/products/category/${slug}`,
    SEARCH: `${API_BASE}/products/search`,
    FEATURED: `${API_BASE}/products/featured`,
  },
  CATEGORIES: {
    LIST: `${API_BASE}/categories`,
    DETAIL: (id: string) => `${API_BASE}/categories/${id}`,
    PRODUCTS: (id: string) => `${API_BASE}/categories/${id}/products`,
  },
  CART: {
    BASE: `${API_BASE}/cart`,
    ITEM: (id: string) => `${API_BASE}/cart/${id}`,
    CLEAR: `${API_BASE}/cart/clear`,
  },
  ORDERS: {
    LIST: `${API_BASE}/orders`,
    CREATE: `${API_BASE}/orders`,
    DETAIL: (id: string) => `${API_BASE}/orders/${id}`,
    CANCEL: (id: string) => `${API_BASE}/orders/${id}/cancel`,
    TRACK: (id: string) => `${API_BASE}/orders/${id}/track`,
    STATUS: (id: string) => `${API_BASE}/orders/${id}/status`,
  },
  USERS: {
    PROFILE: `${API_BASE}/users/profile`,
    ADDRESSES: `${API_BASE}/users/addresses`,
    ADDRESS: (id: string) => `${API_BASE}/users/addresses/${id}`,
    CHANGE_PASSWORD: `${API_BASE}/users/change-password`,
  },
  JASTIP: {
    LIST: `${API_BASE}/jastip`,
    CREATE: `${API_BASE}/jastip`,
    DETAIL: (id: string) => `${API_BASE}/jastip/${id}`,
    UPDATE: (id: string) => `${API_BASE}/jastip/${id}`,
    DELETE: (id: string) => `${API_BASE}/jastip/${id}`,
  },
  UPLOAD: {
    IMAGE: `${API_BASE}/upload/image`,
    FILE: `${API_BASE}/upload/file`,
  },
} as const;

export type ApiEndpoint = typeof API_ENDPOINTS;

export function getEndpointByKey(key: string): string | undefined {
  const keys = key.split('.');
  let result: unknown = API_ENDPOINTS;
  for (const k of keys) {
    if (typeof result !== 'object' || result === null) {
      return undefined;
    }
    result = (result as Record<string, unknown>)[k];
    if (result === undefined) {
      return undefined;
    }
  }
  return typeof result === 'function' ? undefined : (result as string);
}
